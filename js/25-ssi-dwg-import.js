/* ============================================================================
 * UrbanX — SSI: IMPORT DWG/DXF (js/25-ssi-dwg-import.js)
 * Parser DXF ASCII vanilla JS (fara dependinte externe / CDN — vezi capcana
 * Three.js CDN din memorie: nu ne bazam pe librarii externe nesigure).
 * DWG e binar proprietar Autodesk; utilizatorul exporta DXF din CAD-ul lui
 * (ASCII, orice versiune >= 2000) — cea mai fiabila cale, zero conversie.
 * Daca incarca .dwg direct, semnalam explicit necesitatea exportului DXF
 * (NU incercam sa parsam binarul — risc de coordonate gresite).
 *
 * IMPORTANT (regula critica v2.1 #8): DXF-ul da DOAR geometrie (poligoane,
 * distante), NU clasificare normativa (destinatie/grad rezistenta vecin) —
 * asta ramane input uman validat, afisat explicit in UI (Sectiunea C, 25-ssi-ui.js).
 *
 * window.SSI_DWG_IMPORT: detectFormat() · parseDXF() · mapLayers() ·
 * extractGeometrie() · calculeazaDistantaMinima() · ariePoligonShoelace()
 * ========================================================================== */
(function (G) {
  'use strict';

  var LAYERE_ASTEPTATE = {
    limita_proprietate: ['LIMITA_PROPRIETATE', 'CADASTRU', 'LOT', 'PARCELA'],
    vecinatati: ['VECINATATI', 'CLADIRI_VECINE', 'CONSTRUCTII_INVECINATE'],
    constructie_existenta: ['EXISTENT', 'CONSTRUCTIE_EXISTENTA', 'C_EXIST'],
    constructie_propusa: ['PROPUS', 'CONSTRUCTIE_PROPUSA', 'C_PROP', 'VOLUM_PROIECTAT'],
    acces_auto_speciale: ['ACCES_POMPIERI', 'ACCES_AUTOSPECIALE', 'DRUM_INTERVENTIE'],
    cote_nivel: ['COTE', 'COTA_TEREN', 'NIVELMENT'],
    // ADAUGAT (18 iul, gap real gasit prin audit dedicat: "aliniamente" nu avea NICIUN cod de extractie,
    // doar camp manual). Linia de aliniament (frontul stradal fata de care se masoara retragerea min.
    // impusa de PUG/RLU) e desenata uzual ca o linie/polilinie deschisa distincta de limita de proprietate
    // (care e un poligon inchis al INTREGII parcele) — layer separat, cautat generic.
    aliniament: ['ALINIAMENT', 'LINIE_ALINIAMENT', 'ALINIAMENT_STRADAL', 'ALINIERE']
  };

  function detectFormat(file) {
    var name = (file && file.name || '').toLowerCase();
    if (name.slice(-4) === '.dxf') return { format: 'dxf', ok: true };
    if (name.slice(-4) === '.dwg') return { format: 'dwg', ok: false, mesaj: 'Fișier .dwg detectat — DWG e format binar proprietar, nu poate fi parsat sigur în browser. Exportă din CAD ca DXF (ASCII, orice versiune AutoCAD ≥ 2000: File → Save As → AutoCAD DXF) și încarcă acel fișier.' };
    return { format: 'necunoscut', ok: false, mesaj: 'Format neacceptat — încarcă un fișier .dxf.' };
  }

  // ── Tokenizare DXF: perechi (cod, valoare) ──
  function _tokenizeDXF(text) {
    var lines = text.split(/\r\n|\r|\n/);
    var pairs = [];
    for (var i = 0; i + 1 < lines.length; i += 2) {
      var code = parseInt(lines[i].trim(), 10);
      var val = lines[i + 1] != null ? lines[i + 1].replace(/\r$/, '') : '';
      if (isNaN(code)) continue;
      pairs.push({ code: code, value: val.trim ? val.trim() : val });
    }
    return pairs;
  }

  // Tipuri de entitate pe care le intelegem/pastram. ORICE alt tip (HATCH, DIMENSION, ATTRIB,
  // WIPEOUT, VIEWPORT, IMAGE, 3DFACE, SOLID, SPLINE etc.) e ignorat explicit — dar TREBUIE sa
  // incheie corect entitatea curenta la intalnirea marcajului "0 <TIP>", altfel codurile 10/20
  // ale acelui tip necunoscut (ex. varfuri de frontiera HATCH) se scriu peste entitatea anterioara
  // ramasa "deschisa" (LINE/INSERT/TEXT/CIRCLE nu erau niciodata inchise explicit in varianta veche
  // -> coordonate GARBAGE atribuite gresit unor entitati/layere care nu le apartin, verificat pe
  // fisier real de proiect: poligoane "fantoma" cu arii de ordinul miliardelor de mp).
  var _TIPURI_CUNOSCUTE = { LINE: 1, LWPOLYLINE: 1, POLYLINE: 1, INSERT: 1, TEXT: 1, MTEXT: 1, CIRCLE: 1, ARC: 1 };

  // Unitatea de desenare a fisierului ($INSUNITS din HEADER) NU e intotdeauna metri — planurile
  // arhitecturale sunt frecvent desenate in milimetri (INSUNITS=4). Fara conversie, ariile ies
  // de ordinul miliardelor de "mp" (mm^2 confundat cu m^2) — verificat pe fisier real de proiect.
  var _SCARA_LA_METRI = { 0: 1, 1: 0.0254, 2: 0.3048, 3: 1609.344, 4: 0.001, 5: 0.01, 6: 1, 8: 1e-6, 9: 1e-3, 10: 0.9144, 11: 1852, 14: 10 };
  function _detecteazaScaraMetri(pairs) {
    for (var i = 0; i + 1 < pairs.length; i++) {
      if (pairs[i].code === 9 && pairs[i].value === '$INSUNITS' && pairs[i + 1].code === 70) {
        var u = parseInt(pairs[i + 1].value, 10);
        return { scara: _SCARA_LA_METRI[u] != null ? _SCARA_LA_METRI[u] : 1, insunits: u };
      }
    }
    return { scara: 1, insunits: null }; // necunoscut -> presupunem metri (uzual pt planuri de situatie RO), fara conversie
  }

  function parseDXF(text) {
    var pairs = _tokenizeDXF(text);
    var scaraInfo = _detecteazaScaraMetri(pairs);
    var SC = scaraInfo.scara;
    var entities = [];
    // FIX BUG REAL (18 iul, gasit prin audit dedicat: "block/BLOCK-definition entities are not
    // excluded... o entitate care exista DOAR in definitia unui bloc (sectiunea BLOCKS) era parsata
    // ca geometrie reala plasata in desen" — parserul vechi nu urmarea in ce SECTIUNE se afla).
    // Acum: entitatile din sectiunea BLOCKS se colecteaza SEPARAT (per nume de bloc), NU in lista
    // principala "entities" — elimina geometria fantoma. Entitatile INSERT raman in lista principala
    // (asa cum erau si inainte), acum insa cu rotatie/scara capturate, pt rezolvarea reala a blocului
    // (vezi rezolvaTamplarieDinBlocuri mai jos) — comportamentul vechi (entities/layers/nrEntitati din
    // ENTITIES) ramane IDENTIC pt tot codul existent (rezistenta la regresii).
    var blocuri = {}; // nume_bloc -> { entitati: [...], bazaX, bazaY }
    var sectiuneCurenta = null; // 'ENTITIES' | 'BLOCKS' | alta | null
    var blocCurent = null; // numele blocului in curs de definire (intre "0 BLOCK" si "0 ENDBLK")
    var i = 0, n = pairs.length;
    var cur = null; // entitate curenta in constructie
    var curVerts = null; // pentru LWPOLYLINE: acumulare {x,y}
    var pendingVertex = null; // pentru POLYLINE/VERTEX clasic (format vechi)

    function _listaTinta() {
      // in BLOCKS, cu un bloc curent activ -> lista PROPRIE a blocului (nu geometrie reala plasata);
      // altfel (ENTITIES sau necunoscut) -> lista principala, comportament neschimbat.
      if (sectiuneCurenta === 'BLOCKS' && blocCurent) return blocuri[blocCurent].entitati;
      return entities;
    }

    // Inchide ORICE entitate curenta (cunoscuta sau nu) — se apeleaza la FIECARE marcaj "0 <TIP>"
    // nou intalnit, nu doar cand tipul nou e recunoscut. Aceasta e reparatia critica.
    function flushCur() {
      if (cur && cur.type === 'LWPOLYLINE') { cur.puncte = curVerts || []; _listaTinta().push(cur); }
      else if (cur && _TIPURI_CUNOSCUTE[cur.type] && cur.type !== 'POLYLINE') { _listaTinta().push(cur); }
      cur = null; curVerts = null; pendingVertex = null;
    }

    while (i < n) {
      var p = pairs[i];
      if (p.code === 0) {
        var v = p.value;
        if (v === 'SECTION') {
          flushCur();
          // urmatoarea pereche ar trebui sa fie "2 <NUME_SECTIUNE>" (HEADER/TABLES/BLOCKS/ENTITIES/OBJECTS)
          if (i + 1 < n && pairs[i + 1].code === 2) sectiuneCurenta = pairs[i + 1].value;
          i++; continue;
        }
        if (v === 'ENDSEC') { flushCur(); sectiuneCurenta = null; i++; continue; }
        if (v === 'BLOCK') {
          flushCur();
          // "0 BLOCK" e urmat de codurile proprii ale definitiei (2=nume, 10/20=punct de baza) —
          // le citim direct aici (nu prin _TIPURI_CUNOSCUTE, BLOCK nu e o entitate desenabila).
          var numeBloc = null, bazaX = 0, bazaY = 0;
          var j = i + 1;
          while (j < n && pairs[j].code !== 0) {
            if (pairs[j].code === 2 && numeBloc == null) numeBloc = pairs[j].value;
            if (pairs[j].code === 10) bazaX = parseFloat(pairs[j].value) * SC;
            if (pairs[j].code === 20) bazaY = parseFloat(pairs[j].value) * SC;
            j++;
          }
          if (numeBloc) { blocuri[numeBloc] = { entitati: [], bazaX: bazaX, bazaY: bazaY }; blocCurent = numeBloc; }
          i = j; continue; // sarim direct la urmatorul marcaj "0 <TIP>" (am consumat coduri proprii BLOCK)
        }
        if (v === 'ENDBLK') { flushCur(); blocCurent = null; i++; continue; }
        // POLYLINE clasic (format vechi, cu sub-entitati VERTEX/SEQEND) — nu se inchide la VERTEX
        if (v === 'VERTEX' && cur && cur.type === 'POLYLINE') { pendingVertex = { x: null, y: null }; i++; continue; }
        if (v === 'SEQEND' && cur && cur.type === 'POLYLINE') { _listaTinta().push(cur); cur = null; i++; continue; }
        // orice alt marcaj "0 <TIP>" (cunoscut SAU necunoscut, ex. HATCH/DIMENSION/ATTRIB/WIPEOUT/
        // VIEWPORT/IMAGE/SEQEND-ul unui INSERT cu atribute) incheie ferm entitatea anterioara —
        // altfel codurile 10/20 ale tipului necunoscut ar corupe entitatea deja "deschisa".
        flushCur();
        if (_TIPURI_CUNOSCUTE[v]) {
          cur = { type: v, layer: null };
          if (v === 'LWPOLYLINE') curVerts = [];
          if (v === 'POLYLINE') cur.puncte = [];
        }
        // tip necunoscut -> cur ramane null, codurile lui (inclusiv 10/20) sunt ignorate mai jos.
        i++; continue;
      }
      if (cur) {
        if (p.code === 8 && cur.layer == null) cur.layer = p.value; // primul code 8 = layerul real; nu se suprascrie din sub-grupuri
        if (cur.type === 'LINE') {
          if (p.code === 10) cur.x1 = parseFloat(p.value) * SC;
          if (p.code === 20) cur.y1 = parseFloat(p.value) * SC;
          if (p.code === 11) cur.x2 = parseFloat(p.value) * SC;
          if (p.code === 21) cur.y2 = parseFloat(p.value) * SC;
        } else if (cur.type === 'LWPOLYLINE') {
          if (p.code === 70) cur.closed = (parseInt(p.value, 10) & 1) === 1;
          if (p.code === 10) curVerts.push({ x: parseFloat(p.value) * SC, y: null });
          if (p.code === 20 && curVerts.length) curVerts[curVerts.length - 1].y = parseFloat(p.value) * SC;
        } else if (cur.type === 'POLYLINE') {
          if (p.code === 70) cur.closed = (parseInt(p.value, 10) & 1) === 1;
          if (pendingVertex) {
            if (p.code === 10) pendingVertex.x = parseFloat(p.value) * SC;
            if (p.code === 20) pendingVertex.y = parseFloat(p.value) * SC;
          }
        } else if (cur.type === 'INSERT') {
          if (p.code === 2) cur.blockName = p.value;
          if (p.code === 10) cur.x = parseFloat(p.value) * SC;
          if (p.code === 20) cur.y = parseFloat(p.value) * SC;
          if (p.code === 41) cur.scaleX = parseFloat(p.value);
          if (p.code === 42) cur.scaleY = parseFloat(p.value);
          if (p.code === 50) cur.rotatieGrade = parseFloat(p.value);
        } else if (cur.type === 'TEXT' || cur.type === 'MTEXT') {
          // MTEXT: continutul lung vine in bucati de cod 3 (in ordine), apoi bucata finala in cod 1 —
          // varianta veche pastra DOAR ultimul cod 1, taind textul (ex. "Locuinta P+1E Sc=64 mp
          // Sd=150 mp POT=... CUT=..." aparea trunchiat la cateva caractere finale).
          if (p.code === 3) cur.text = (cur.text || '') + p.value;
          if (p.code === 1) cur.text = (cur.text || '') + p.value;
          if (p.code === 10) cur.x = parseFloat(p.value) * SC;
          if (p.code === 20) cur.y = parseFloat(p.value) * SC;
        } else if (cur.type === 'CIRCLE' || cur.type === 'ARC') {
          if (p.code === 10) cur.x = parseFloat(p.value) * SC;
          if (p.code === 20) cur.y = parseFloat(p.value) * SC;
          if (p.code === 40) cur.raza = parseFloat(p.value) * SC;
        }
        if (cur.type === 'POLYLINE' && pendingVertex && pendingVertex.x != null && pendingVertex.y != null) {
          cur.puncte.push({ x: pendingVertex.x, y: pendingVertex.y }); pendingVertex = null;
        }
      }
      i++;
    }
    flushCur();

    var layers = {};
    entities.forEach(function (e) { var l = e.layer || '0'; layers[l] = (layers[l] || 0) + 1; });
    return { entities: entities, layers: Object.keys(layers), layerCounts: layers, nrEntitati: entities.length, unitateDetectata: scaraInfo.insunits, scaraLaMetri: SC, blocuri: blocuri };
  }

  async function parseDXFFile(file) {
    var text = await file.text();
    return parseDXF(text);
  }

  // Mapare layere reale -> categorii functionale asteptate. Daca nu se potrivesc automat,
  // apelantul (UI) trebuie sa ceara maparea manuala (dropdown per layer real -> categorie).
  function mapLayers(parsedDXF, mappingConfirmatUtilizator) {
    if (mappingConfirmatUtilizator) return mappingConfirmatUtilizator;
    var auto = {};
    var layersUpper = (parsedDXF.layers || []).map(function (l) { return l.toUpperCase(); });
    Object.keys(LAYERE_ASTEPTATE).forEach(function (categorie) {
      var candidati = LAYERE_ASTEPTATE[categorie];
      var gasit = null;
      for (var i = 0; i < candidati.length; i++) {
        var idx = layersUpper.indexOf(candidati[i]);
        if (idx !== -1) { gasit = parsedDXF.layers[idx]; break; }
      }
      auto[categorie] = gasit; // null daca nu s-a gasit -> UI trebuie sa ceara mapare manuala
    });
    var toateGasite = Object.keys(auto).every(function (k) { return !!auto[k]; });
    return { mapare: auto, automata_completa: toateGasite,
      nemapate: Object.keys(auto).filter(function (k) { return !auto[k]; }) };
  }

  function _entitatiPePoligon(entities, layerName) {
    return entities.filter(function (e) { return e.layer === layerName && (e.type === 'LWPOLYLINE' || e.type === 'POLYLINE') && e.puncte && e.puncte.length >= 3; });
  }

  // Curata textul MTEXT de codurile de formatare AutoCAD (font/inaltime/stacking) —
  // pastreaza continutul util (cifre, litere, %), \P devine separator de linie.
  function _cleanMText(t) {
    if (!t) return '';
    var s = String(t);
    s = s.replace(/\\P/g, ' ').replace(/\\A\d;/g, '');
    s = s.replace(/\{\\[^;{}]*;/g, '').replace(/[{}]/g, '');
    s = s.replace(/\\[A-Za-z][^;\\]*;/g, '');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }

  // Extrage din TOATE entitatile TEXT/MTEXT ale planului adnotarile reale de suprafata
  // parcela / POT / CUT deja calculate de proiectant in desen (nu se recalculeaza, se citeaza).
  function extrageAdnotariUrbanism(entities) {
    var out = [];
    (entities || []).forEach(function (e) {
      if (e.type !== 'TEXT' && e.type !== 'MTEXT') return;
      var raw = e.text || ''; var clean = _cleanMText(raw);
      var mS = clean.match(/S\.?\s*parcel[aă]\D{0,12}?([\d]+[.,]\d+|\d+)\s*m/i);
      var mPot = clean.match(/POT\s*=\s*([\d]+[.,]?\d*)\s*%/i);
      var mCut = clean.match(/CUT\s*=\s*([\d]+[.,]?\d*)/i);
      var mSc = clean.match(/\bSc\s*=\s*([\d]+[.,]?\d*)\s*mp/i);
      var mSd = clean.match(/\bSd\s*=\s*([\d]+[.,]?\d*)\s*mp/i);
      var mRegim = clean.match(/\bP(\+\d+)?E?\b/);
      var mLocuinta = /locuin[țt][aă]/i.test(clean);
      if (mS || mPot || mCut || mSc || mSd) {
        out.push({
          x: e.x, y: e.y,
          suprafata_parcela_mp: mS ? parseFloat(mS[1].replace(',', '.')) : null,
          pot_pct: mPot ? parseFloat(mPot[1].replace(',', '.')) : null,
          cut: mCut ? parseFloat(mCut[1].replace(',', '.')) : null,
          sc_mp: mSc ? parseFloat(mSc[1].replace(',', '.')) : null,
          sd_mp: mSd ? parseFloat(mSd[1].replace(',', '.')) : null,
          regim: mRegim ? mRegim[0] : null,
          e_locuinta: mLocuinta,
          text_brut: clean
        });
      }
    });
    return out;
  }

  // Citeste faza proiectului din titlul/cartusul DWG (ex. "faza\nCU", "faza\nD.T.A.C.") — NU se
  // presupune faza implicit; un scenariu SSI complet are sens abia la D.T.A.C., nu la un plan de
  // Certificat de Urbanism (CU), etapa anterioara — semnaleaza explicit neconcordanta, nu o ignora.
  var FAZE_CUNOSCUTE = ['CU', 'DTAC', 'D.T.A.C.', 'PTh', 'P.Th.', 'DE', 'D.E.', 'PAC', 'P.A.C.', 'PT', 'P.T.'];
  function extrageFazaDinDXF(entities) {
    var gasit = null;
    (entities || []).forEach(function (e) {
      if (gasit || (e.type !== 'TEXT' && e.type !== 'MTEXT')) return;
      var clean = _cleanMText(e.text || '');
      var m = clean.match(/\bfaza\b\s*[:\-]?\s*([A-Za-z.\+]{2,10})/i);
      if (m) gasit = m[1].toUpperCase().replace(/\.+$/, '');
    });
    var recunoscuta = gasit && FAZE_CUNOSCUTE.some(function (f) { return f.toUpperCase().replace(/\./g, '') === gasit.replace(/\./g, ''); });
    return { faza_din_dwg: gasit, recunoscuta: !!recunoscuta };
  }

  function _centroid(puncte) {
    var s = 0, cx = 0, cy = 0, n = puncte.length;
    for (var i = 0; i < n; i++) {
      var a = puncte[i], b = puncte[(i + 1) % n];
      var cr = a.x * b.y - b.x * a.y;
      s += cr; cx += (a.x + b.x) * cr; cy += (a.y + b.y) * cr;
    }
    if (Math.abs(s) < 1e-9) { // poligon degenerat -> centroid simplu
      for (var i2 = 0; i2 < n; i2++) { cx += puncte[i2].x; cy += puncte[i2].y; }
      return { x: cx / n, y: cy / n };
    }
    s *= 0.5;
    return { x: cx / (6 * s), y: cy / (6 * s) };
  }

  function _pointInPoly(pt, poly) {
    var inside = false, n = poly.length;
    for (var i = 0, j = n - 1; i < n; j = i++) {
      var xi = poly[i].x, yi = poly[i].y, xj = poly[j].x, yj = poly[j].y;
      var intersect = ((yi > pt.y) !== (yj > pt.y)) && (pt.x < (xj - xi) * (pt.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // Extrage TOATE poligoanele inchise de pe un layer (o cladire = un poligon) —
  // NU doar primul (planul de situatie al unui ansamblu poate avea zeci de cladiri).
  // Pentru fiecare, asociaza cea mai apropiata adnotare de urbanism (S.parcela/POT/CUT),
  // daca centrul ei cade in interiorul poligonului sau e cea mai apropiata dintre adnotari.
  function extrageCladiriDePeLayer(entities, layerName, adnotari, filtruArie) {
    var poligoane = _entitatiPePoligon(entities, layerName);
    var arieMin = filtruArie && filtruArie.min != null ? filtruArie.min : null;
    var arieMax = filtruArie && filtruArie.max != null ? filtruArie.max : null;
    var MAX_DIST_FALLBACK_M = 20; // fallback pe distanta centroid: doar daca adnotarea e rezonabil de aproape
    var rezultate = [];
    poligoane.forEach(function (p) {
      var arie = ariePoligonShoelace(p.puncte);
      if (arieMin != null && arie < arieMin) return;
      if (arieMax != null && arie > arieMax) return;
      var c = _centroid(p.puncte);
      // Preferinta: o adnotare "Locuinta" (Sc/Sd/POT/regim, per-unitate) al carei punct de insertie
      // cade IN INTERIORUL poligonului; abia apoi orice alta adnotare in interior; abia apoi cea mai
      // apropiata adnotare "Locuinta" intr-o raza rezonabila (evita asocieri gresite pe planuri dense).
      var potrivireLocuintaInterior = null, potrivireOricareInterior = null;
      var potrivireLocuintaApropiata = null, dMinLocuinta = Infinity;
      (adnotari || []).forEach(function (a) {
        if (a.x == null || a.y == null) return;
        var inside = _pointInPoly({ x: a.x, y: a.y }, p.puncte);
        if (inside) {
          if (a.e_locuinta && !potrivireLocuintaInterior) potrivireLocuintaInterior = a;
          if (!potrivireOricareInterior) potrivireOricareInterior = a;
        }
        if (a.e_locuinta) {
          var d = Math.hypot(a.x - c.x, a.y - c.y);
          if (d < dMinLocuinta) { dMinLocuinta = d; potrivireLocuintaApropiata = a; }
        }
      });
      var adnotarePotrivita = potrivireLocuintaInterior || potrivireOricareInterior ||
        (dMinLocuinta <= MAX_DIST_FALLBACK_M ? potrivireLocuintaApropiata : null);
      // Dedup geometric grosier: multe exporturi ArchiCAD deseneaza acelasi contur de doua ori (o data
      // ca umplere/hasura vizuala, o data ca linie de contur) — daca centrul cade practic peste un
      // poligon deja retinut SI aria e aproape identica, e ACELASI element. Nu prinde insa cazul unde
      // a doua reprezentare are o forma mai detaliata (ex. cu treaptă/verandă la intrare, 8-10 varfuri
      // in loc de 4) — aria ei difera prea mult ca sa treaca acest test, desi e tot acelasi contur;
      // vezi dedup-ul pe adnotare identica mai jos, care prinde exact acest caz.
      var duplicat = rezultate.some(function (r) {
        return Math.hypot(r.centroid.x - c.x, r.centroid.y - c.y) < 0.5 && Math.abs(r.arie_mp - Math.round(arie)) <= Math.max(1, arie * 0.05);
      });
      if (duplicat) return;
      rezultate.push({
        poligon: p.puncte, centroid: c,
        arie_mp: Math.round(arie),
        urbanism_adnotat: adnotarePotrivita
      });
    });

    // Dedup pe IDENTITATEA adnotarii asociate: daca DOUA poligoane diferite (chiar cu arii diferite —
    // ex. un contur simplu 4 varfuri vs unul detaliat 8-10 varfuri, cu verandă/treaptă) se leaga de
    // ACEEASI eticheta "Locuinta" din plan (acelasi x,y), sunt DOUA DESENE ale ACELEIASI cladiri, nu
    // doua cladiri distincte — o cladire reala are o SINGURA eticheta proprie, nu una impartita cu
    // alta. Confirmat pe fisier real (Cătămărăști): planul desena fiecare casă și ca dreptunghi simplu
    // și ca contur detaliat, ambele asociate aceleiași etichete — dubla numărătoare (70 în loc de 66).
    // Pastram varianta a carei arie se potriveste cel mai bine cu Sc declarat in eticheta (cea mai
    // de incredere sursa a ariei reale).
    var pePrimaAdnotare = {};
    rezultate.forEach(function (r) {
      if (!r.urbanism_adnotat) return;
      var cheie = r.urbanism_adnotat.x + '_' + r.urbanism_adnotat.y;
      (pePrimaAdnotare[cheie] = pePrimaAdnotare[cheie] || []).push(r);
    });
    Object.keys(pePrimaAdnotare).forEach(function (cheie) {
      var grup = pePrimaAdnotare[cheie];
      if (grup.length < 2) return;
      var scDeclarat = grup[0].urbanism_adnotat.sc_mp;
      var pastrat = grup[0];
      if (scDeclarat != null) {
        pastrat = grup.reduce(function (best, r) { return Math.abs(r.arie_mp - scDeclarat) < Math.abs(best.arie_mp - scDeclarat) ? r : best; }, grup[0]);
      }
      grup.forEach(function (r) { r._exclusDuplicatEticheta = (r !== pastrat); });
    });

    var finale = rezultate.filter(function (r) { return !r._exclusDuplicatEticheta; });
    finale.forEach(function (r, idx) { r.id = 'C' + (idx + 1); delete r._exclusDuplicatEticheta; });
    return finale;
  }

  // Aria unui poligon (shoelace) — returneaza mp daca unitatile DXF sunt metri (uzual pt planuri RO)
  function ariePoligonShoelace(puncte) {
    var s = 0, n = puncte.length;
    for (var i = 0; i < n; i++) { var a = puncte[i], b = puncte[(i + 1) % n]; s += (a.x * b.y - b.x * a.y); }
    return Math.abs(s / 2);
  }

  function _distSegmentSegment(p1, p2, p3, p4) {
    function distPtSeg(px, py, ax, ay, bx, by) {
      var dx = bx - ax, dy = by - ay; var len2 = dx * dx + dy * dy;
      var t = len2 > 0 ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2)) : 0;
      var cx = ax + t * dx, cy = ay + t * dy;
      return Math.sqrt((px - cx) * (px - cx) + (py - cy) * (py - cy));
    }
    // daca segmentele se intersecteaza, distanta e 0 (verificare simpla via orientari)
    function ccw(ax, ay, bx, by, cx, cy) { return (cy - ay) * (bx - ax) - (by - ay) * (cx - ax); }
    var d1 = ccw(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y), d2 = ccw(p1.x, p1.y, p2.x, p2.y, p4.x, p4.y);
    var d3 = ccw(p3.x, p3.y, p4.x, p4.y, p1.x, p1.y), d4 = ccw(p3.x, p3.y, p4.x, p4.y, p2.x, p2.y);
    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) return 0;
    return Math.min(
      distPtSeg(p3.x, p3.y, p1.x, p1.y, p2.x, p2.y), distPtSeg(p4.x, p4.y, p1.x, p1.y, p2.x, p2.y),
      distPtSeg(p1.x, p1.y, p3.x, p3.y, p4.x, p4.y), distPtSeg(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
    );
  }

  // Distanta minima REALA (muchie-la-muchie, nu centroid-la-centroid) intre doua poligoane
  function calculeazaDistantaMinima(poligonA, poligonB) {
    var min = Infinity;
    var na = poligonA.length, nb = poligonB.length;
    for (var i = 0; i < na; i++) {
      var a1 = poligonA[i], a2 = poligonA[(i + 1) % na];
      for (var j = 0; j < nb; j++) {
        var b1 = poligonB[j], b2 = poligonB[(j + 1) % nb];
        var d = _distSegmentSegment(a1, a2, b1, b2);
        if (d < min) min = d;
      }
    }
    return isFinite(min) ? min : null;
  }

  // Extragere geometrie utila din entitatile mapate pe layere
  function extractGeometrie(parsedDXF, mapare) {
    var ents = parsedDXF.entities || [];
    var m = mapare.mapare || mapare; // accepta atat rezultatul mapLayers cat si o mapare bruta
    var limitaLayer = m.limita_proprietate, existentLayer = m.constructie_existenta,
      propusLayer = m.constructie_propusa, vecinLayer = m.vecinatati;

    function primulPoligon(layerName) { var arr = _entitatiPePoligon(ents, layerName); return arr[0] || null; }

    var out = { limita_proprietate: null, volum_existent: null, volum_propus: null, cladiri_propuse: [], adnotari_urbanism: [], vecinatati_geometrie: [], sursa: 'dwg' };

    var limitaPol = limitaLayer && primulPoligon(limitaLayer);
    if (limitaPol) out.limita_proprietate = { poligon: limitaPol.puncte, arie_mp: Math.round(ariePoligonShoelace(limitaPol.puncte)), sursa: 'dwg' };

    // Adnotari reale de urbanism deja calculate de proiectant in desen (S.parcela/POT/CUT) —
    // citate, NU recalculate — punctul de plecare pt sectiunea urbanism a scenariului.
    out.adnotari_urbanism = extrageAdnotariUrbanism(ents);

    // Faza proiectului asa cum e scrisa in titlul/cartusul DWG — NU se presupune D.T.A.C./P.Th.
    // implicit; un plan de faza CU (Certificat de Urbanism) e o etapa anterioara oricarui scenariu
    // SSI propriu-zis (care se elaboreaza la D.T.A.C.) — neconcordanta se semnaleaza, nu se ignora.
    out.faza_dwg = extrageFazaDinDXF(ents);

    // TOATE poligoanele inchise de pe layerul de constructie propusa = TOATE cladirile din
    // planul de situatie (un ansamblu poate avea zeci de cladiri individuale/duplex) —
    // NU doar prima (regula veche, gresita pt planuri de ansamblu).
    var propusPol = null;
    if (propusLayer) {
      // Layerul mapat de utilizator poate contine, pe langa amprentele cladirilor, si alte elemente
      // desenate cu acelasi "pen"/culoare (detalii mici sub 20mp, sau elemente mari de sit — drumuri,
      // limita ansamblului — peste 500mp) — filtram la scara plauzibila unei cladiri rezidentiale/mici.
      // Daca filtrul elimina TOT (ex. o hala industriala unica, mai mare de 500mp), renuntam la filtru.
      out.cladiri_propuse = extrageCladiriDePeLayer(ents, propusLayer, out.adnotari_urbanism, { min: 35, max: 250 });
      if (!out.cladiri_propuse.length) out.cladiri_propuse = extrageCladiriDePeLayer(ents, propusLayer, out.adnotari_urbanism);
      propusPol = out.cladiri_propuse[0] ? { puncte: out.cladiri_propuse[0].poligon } : null;
      if (out.cladiri_propuse.length) {
        var arieTotala = out.cladiri_propuse.reduce(function (s, c) { return s + c.arie_mp; }, 0);
        out.volum_propus = { poligon: out.cladiri_propuse[0].poligon, arie_mp: arieTotala, nr_cladiri: out.cladiri_propuse.length, sursa: 'dwg' };
      }
      // Cladiri detectate geometric dar fara niciun cartus text asociat (Sc/Sd/POT/CUT) — NU se
      // presupun valorile, se raporteaza explicit ca exceptie de completat manual (regula v4.3 #21).
      out.nrCladiriFaraCartus = out.cladiri_propuse.filter(function (c) { return !c.urbanism_adnotat; }).length;
    }

    var existentPol = existentLayer && primulPoligon(existentLayer);
    if (existentPol) out.volum_existent = { poligon: existentPol.puncte, arie_mp: Math.round(ariePoligonShoelace(existentPol.puncte)), sursa: 'dwg' };

    if (vecinLayer) {
      var vecini = _entitatiPePoligon(ents, vecinLayer);
      var refPol = (propusPol || existentPol);
      var identificariProprietati = extrageIdentificareProprietati(ents);
      out.vecinatati_geometrie = vecini.map(function (v, idx) {
        var dist = refPol ? calculeazaDistantaMinima(refPol.puncte, v.puncte) : null;
        var c = _centroid(v.puncte);
        // CF/proprietar reale (daca sunt scrise in desen, ex. ridicare topografica) — mult mai de
        // incredere decat o estimare OSM; se cauta identificarea cea mai apropiata de conturul vecinului.
        var identPotrivita = null, dMinIdent = Infinity;
        identificariProprietati.forEach(function (idf) {
          if (idf.x == null || idf.y == null) return;
          var d = Math.hypot(idf.x - c.x, idf.y - c.y);
          if (d < dMinIdent) { dMinIdent = d; identPotrivita = idf; }
        });
        var identConfirmata = identPotrivita && dMinIdent <= 40 ? identPotrivita : null;
        return { id: 'V' + (idx + 1), poligon: v.puncte, arie_mp: Math.round(ariePoligonShoelace(v.puncte)),
          distanta_min_la_propriu_m: dist != null ? Math.round(dist * 100) / 100 : null,
          cf_numar: identConfirmata ? identConfirmata.cf : null,
          identificare_text: identConfirmata ? identConfirmata.text_brut : null };
      });
    }

    // Distante MINIME reale intre fiecare pereche de cladiri proprii detectate (nu doar fata
    // de vecini externi) — Tabelul 4/145 se aplica intre ORICE doua constructii/compartimente.
    // Prag de siguranta generos (400 cladiri = ~80.000 perechi) — un ansamblu real rar depaseste asta;
    // daca totusi il depaseste, semnalam explicit (NU calculam tacit doar un subset, ar da o falsa
    // impresie de "verificat complet" cand nu e).
    if (out.cladiri_propuse.length > 400) {
      out.distante_intre_cladiri = [];
      out.distante_intre_cladiri_omise = out.cladiri_propuse.length;
    } else if (out.cladiri_propuse.length > 1) {
      out.distante_intre_cladiri = [];
      // Prag "alipite" (perete comun): sub 30cm intre contururi = practic in contact — tipologia
      // individual/cuplat-duplex NU se deduce din eticheta text (arhitectul a scris generic "Locuinta"
      // peste tot), ci geometric — doua amprente alipite pe o latura comuna sunt, cel mai probabil,
      // un duplex/cuplare, indiferent ce scrie eticheta (regula v4.3 #3).
      var PRAG_ALIPIT_M = 0.3;
      for (var i = 0; i < out.cladiri_propuse.length; i++) {
        for (var j = i + 1; j < out.cladiri_propuse.length; j++) {
          var d2 = calculeazaDistantaMinima(out.cladiri_propuse[i].poligon, out.cladiri_propuse[j].poligon);
          out.distante_intre_cladiri.push({
            a: out.cladiri_propuse[i].id, b: out.cladiri_propuse[j].id,
            distanta_m: d2 != null ? Math.round(d2 * 100) / 100 : null,
            posibil_alipite: d2 != null && d2 < PRAG_ALIPIT_M
          });
        }
      }
      out.nrPerechiAlipite = out.distante_intre_cladiri.filter(function (p) { return p.posibil_alipite; }).length;
    }

    // FIX BUG REAL (18 iul, gasit prin audit dedicat: "acces_auto_speciale" era declarat ca layer
    // asteptat + afisat in UI, dar extractGeometrie() nu-l citea NICIODATA — utilizatorul putea
    // mapa un layer la "Acces autospeciale" si nu se intampla nimic cu maparea, silentios).
    var accesLayer = m.acces_auto_speciale;
    if (accesLayer) {
      var refPolAcces = (propusPol || existentPol);
      var linii = ents.filter(function (e) { return e.layer === accesLayer && e.type === 'LINE'; });
      var poligoaneAcces = _entitatiPePoligon(ents, accesLayer);
      out.acces_auto_speciale = [];
      poligoaneAcces.forEach(function (p, idx) {
        var arie = ariePoligonShoelace(p.puncte);
        var perimetru = 0;
        for (var k = 0; k < p.puncte.length; k++) { var a2 = p.puncte[k], b2 = p.puncte[(k + 1) % p.puncte.length]; perimetru += Math.hypot(b2.x - a2.x, b2.y - a2.y); }
        var latimeAprox = perimetru > 0 ? Math.round((arie / (perimetru / 2)) * 100) / 100 : null; // aproximare grosiera (drum ~dreptunghiular)
        out.acces_auto_speciale.push({
          id: 'ACC' + (idx + 1), tip: 'suprafata_carosabila', arie_mp: Math.round(arie),
          latime_aproximativa_m: latimeAprox,
          distanta_la_constructie_m: refPolAcces ? (function () { var d = calculeazaDistantaMinima(refPolAcces.puncte, p.puncte); return d != null ? Math.round(d * 100) / 100 : null; })() : null,
          distanta_la_limita_proprietate_m: limitaPol ? (function () { var d = calculeazaDistantaMinima(limitaPol.puncte, p.puncte); return d != null ? Math.round(d * 100) / 100 : null; })() : null
        });
      });
      if (linii.length) {
        var lungimeTotala = 0; linii.forEach(function (l) { lungimeTotala += Math.hypot(l.x2 - l.x1, l.y2 - l.y1); });
        out.acces_auto_speciale.push({ id: 'ACC_linii', tip: 'traseu_liniar', lungime_totala_m: Math.round(lungimeTotala * 100) / 100, nr_segmente: linii.length });
      }
      if (!out.acces_auto_speciale.length) out.acces_auto_speciale = null; // layer mapat dar gol -> nu se preface ca exista date
    }

    // ADAUGAT (18 iul, gap real gasit prin audit: "aliniamente" nu avea niciun cod de extractie).
    // Linia de aliniament = segmente LINE si/sau muchii de LWPOLYLINE (inchisa sau deschisa, nu conteaza —
    // se foloseste ca poli-linie de segmente, indiferent) pe layerul mapat. Distanta fata de constructie
    // = minimul intre orice muchie a cladirii (propuse/existente) si orice segment de aliniament.
    var aliniamentLayer = m.aliniament;
    if (aliniamentLayer) {
      var refPolAliniament = (propusPol || existentPol);
      var segmenteAliniament = [];
      ents.filter(function (e) { return e.layer === aliniamentLayer; }).forEach(function (e) {
        if (e.type === 'LINE') segmenteAliniament.push([{ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 }]);
        else if ((e.type === 'LWPOLYLINE' || e.type === 'POLYLINE') && e.puncte && e.puncte.length >= 2) {
          for (var k2 = 0; k2 < e.puncte.length - 1; k2++) segmenteAliniament.push([e.puncte[k2], e.puncte[k2 + 1]]);
          if (e.closed) segmenteAliniament.push([e.puncte[e.puncte.length - 1], e.puncte[0]]);
        }
      });
      if (segmenteAliniament.length && refPolAliniament) {
        var minDistAliniament = Infinity;
        var nEdges = refPolAliniament.puncte.length;
        for (var ei = 0; ei < nEdges; ei++) {
          var edgeA = refPolAliniament.puncte[ei], edgeB = refPolAliniament.puncte[(ei + 1) % nEdges];
          segmenteAliniament.forEach(function (seg) {
            var d = _distSegmentSegment(edgeA, edgeB, seg[0], seg[1]);
            if (d < minDistAliniament) minDistAliniament = d;
          });
        }
        out.aliniament = { distanta_la_constructie_m: isFinite(minDistAliniament) ? Math.round(minDistAliniament * 100) / 100 : null, nr_segmente: segmenteAliniament.length };
      } else if (segmenteAliniament.length) {
        out.aliniament = { distanta_la_constructie_m: null, nr_segmente: segmenteAliniament.length, nota: 'linia de aliniament a fost citită, dar lipsește conturul construcției (propuse/existente) pentru a calcula distanța' };
      }
    }

    // Grupare in componente conexe pe graful de adiacenta (muchie = pereche "posibil_alipite") —
    // generalizeaza dincolo de perechi: 3 cladiri lipite una de alta = un singur grup "triplex",
    // tratat ca un volum construit continuu, nu ca perechi separate (regula v4.4 #25).
    out.grupuri_constructive = _grupeazaInComponenteConexe(out.cladiri_propuse, out.distante_intre_cladiri || []);
    return out;
  }

  // Ridicarile topografice reale (ex. export Eterra) marcheaza proprietatile vecine cu identificarea
  // lor REALA — nr. de Carte Funciara si/sau numele proprietarului — mult mai de incredere decat o
  // estimare din OSM. Cautam generic acest pattern in TEXT/MTEXT (nu doar pe layere numite "Eterra",
  // orice software de cadastru poate scrie "CF. XXXXX" langa conturul unui vecin).
  function extrageIdentificareProprietati(entities) {
    var out = [];
    (entities || []).forEach(function (e) {
      if (e.type !== 'TEXT' && e.type !== 'MTEXT') return;
      var clean = _cleanMText(e.text || '');
      var mCF = clean.match(/C\.?F\.?\s*(\d{3,7})/i);
      if (mCF || /^[A-ZĂÂÎȘȚ][A-ZĂÂÎȘȚ ]{4,40}$/.test(clean)) {
        out.push({ x: e.x, y: e.y, cf: mCF ? mCF[1] : null, text_brut: clean });
      }
    });
    return out;
  }

  // Uniune-gasire simpla pe id-uri de cladiri, cu muchii = perechile "posibil_alipite" — o componenta
  // conexa cu 1 element = casa individuala; cu 2 = cuplat/duplex; cu 3+ = triplex/cuplat_N (v4.4 #25).
  function _grupeazaInComponenteConexe(cladiri, distante) {
    if (!cladiri || !cladiri.length) return [];
    var parinte = {};
    cladiri.forEach(function (c) { parinte[c.id] = c.id; });
    function gaseste(x) { while (parinte[x] !== x) { parinte[x] = parinte[parinte[x]]; x = parinte[x]; } return x; }
    function uneste(a, b) { var ra = gaseste(a), rb = gaseste(b); if (ra !== rb) parinte[ra] = rb; }
    (distante || []).forEach(function (p) { if (p.posibil_alipite) uneste(p.a, p.b); });
    var pe_grup = {};
    cladiri.forEach(function (c) { var r = gaseste(c.id); (pe_grup[r] = pe_grup[r] || []).push(c.id); });
    return Object.keys(pe_grup).map(function (r) {
      var idsGrup = pe_grup[r];
      return {
        id_grup: idsGrup.join('-'), cladiri_incluse: idsGrup,
        tip: idsGrup.length === 1 ? 'INDIVIDUAL' : (idsGrup.length === 2 ? 'CUPLAT_DUPLEX' : ('CUPLAT_' + idsGrup.length + '_UNITATI')),
        volum_continuu: idsGrup.length > 1
      };
    });
  }

  // FIX GAP REAL (18 iul, gasit prin audit dedicat: "geometria blocurilor CAD ale usilor NU se
  // parseaza — ar necesita definitii BLOCK, mult mai fragil", citat explicit ca limitare cunoscuta).
  // Acum ca parseDXF() separa entitatile din BLOCKS pe nume de bloc (parsedDXF.blocuri), putem
  // REZOLVA fiecare INSERT al carui nume de bloc arata a usa/fereastra (tipar de denumire, nu
  // geometrie universala — biblioteci CAD diferite numesc blocurile diferit, e o eristica, nu o
  // certitudine) — latimea REALA rezulta din bounding-box-ul propriu al blocului (relativ la punctul
  // sau de baza) x scara INSERT-ului (cod 41/42), NU doar dintr-o eticheta text.
  // FIX BUG REAL (gasit prin test propriu, 18 iul): "_" e caracter de cuvant in regex (\w include
  // underscore), deci \bUSA\b NU se potriveste in "USA_90" (nu exista granita de cuvant intre "A" si
  // "_"). Tiparul de mai jos cere ca litera-cheie sa fie delimitata de INCEPUT/SFARSIT DE SIR sau de
  // un caracter care NU e litera (underscore, cifra, spatiu) — acopera "USA_90", "USA90", "USA-90" etc.
  var TIPARE_BLOC_TAMPLARIE = [
    { tip: 'usa', re: /(^|[^A-Za-z])(USA|DOOR|DR)([^A-Za-z]|$)/i },
    { tip: 'fereastra', re: /(^|[^A-Za-z])(FEREASTRA|FER|WINDOW|WIN|GEAM)([^A-Za-z]|$)/i }
  ];
  function _bboxLocalBloc(entitatiBloc, bazaX, bazaY) {
    var xs = [], ys = [];
    entitatiBloc.forEach(function (e) {
      if (e.type === 'LINE') { xs.push(e.x1, e.x2); ys.push(e.y1, e.y2); }
      else if ((e.type === 'LWPOLYLINE' || e.type === 'POLYLINE') && e.puncte) { e.puncte.forEach(function (pt) { xs.push(pt.x); ys.push(pt.y); }); }
      else if (e.x != null && e.y != null) { xs.push(e.x); ys.push(e.y); }
    });
    if (!xs.length) return null;
    return { xmin: Math.min.apply(null, xs) - bazaX, xmax: Math.max.apply(null, xs) - bazaX, ymin: Math.min.apply(null, ys) - bazaY, ymax: Math.max.apply(null, ys) - bazaY };
  }
  function rezolvaTamplarieDinBlocuri(parsedDXF) {
    var blocuri = parsedDXF.blocuri || {};
    var inserturi = (parsedDXF.entities || []).filter(function (e) { return e.type === 'INSERT' && e.blockName; });
    var rezultate = [];
    inserturi.forEach(function (ins) {
      var tipGasit = null;
      for (var i = 0; i < TIPARE_BLOC_TAMPLARIE.length; i++) { if (TIPARE_BLOC_TAMPLARIE[i].re.test(ins.blockName)) { tipGasit = TIPARE_BLOC_TAMPLARIE[i].tip; break; } }
      if (!tipGasit) return;
      var bloc = blocuri[ins.blockName];
      if (!bloc) { rezultate.push({ tip: tipGasit, blockName: ins.blockName, latime_m: null, nota: 'blocul „' + ins.blockName + '" a fost referit (INSERT) dar definiția lui nu a fost găsită în fișier — poate fi un bloc extern (XREF)' }); return; }
      var bbox = _bboxLocalBloc(bloc.entitati, bloc.bazaX, bloc.bazaY);
      if (!bbox) return;
      var latimeLocala = bbox.xmax - bbox.xmin;
      var inaltimeLocala = bbox.ymax - bbox.ymin;
      var scaleX = ins.scaleX != null ? ins.scaleX : 1, scaleY = ins.scaleY != null ? ins.scaleY : 1;
      // latimea reala = dimensiunea mai mare a bbox-ului local (usile/ferestrele sunt uzual mult mai
      // late decat groase in vederea de plan) x scara corespunzatoare acelei axe
      var latimeReala = latimeLocala >= inaltimeLocala ? latimeLocala * scaleX : inaltimeLocala * scaleY;
      rezultate.push({
        tip: tipGasit, blockName: ins.blockName, layer: ins.layer,
        latime_m: Math.round(latimeReala * 100) / 100,
        pozitie: { x: ins.x, y: ins.y }, rotatie_grade: ins.rotatieGrade || 0
      });
    });
    return rezultate;
  }

  // Statistici pe layer (nr. poligoane inchise + aria min/med/max) — ajuta proiectantul sa
  // aleaga layerul corect dintr-o lista de nume criptice (ex. ArchiCAD "131_REF_Topo_Pen_No__241"),
  // vazand cate poligoane inchise are si ce arie au, in loc sa ghiceasca dupa nume.
  // Interval de arie plauzibil pt o amprenta de cladire rezidentiala/mica (folosit si la ghicirea
  // layerului "constructie propusa" — vezi 25-ssi-ui.js _ghicesteConstructiePropusa).
  var ARIE_CLADIRE_MIN = 20, ARIE_CLADIRE_MAX = 500;
  function analizeazaLayerePoligoane(parsedDXF) {
    var ents = parsedDXF.entities || [];
    var stats = {};
    ents.forEach(function (e) {
      if ((e.type !== 'LWPOLYLINE' && e.type !== 'POLYLINE') || !e.puncte || e.puncte.length < 3) return;
      var l = e.layer || '0';
      var arie = ariePoligonShoelace(e.puncte);
      if (!stats[l]) stats[l] = { n: 0, arieMin: Infinity, arieMax: 0, arieSum: 0, nInRangeCladire: 0 };
      stats[l].n++; stats[l].arieSum += arie;
      if (arie < stats[l].arieMin) stats[l].arieMin = arie;
      if (arie > stats[l].arieMax) stats[l].arieMax = arie;
      // Numaram POLIGOANE individuale in intervalul plauzibil de cladire — NU media pe layer, care
      // e distorsionata daca layerul mixeaza detalii mici (mobilier) cu elemente mari de sit (drumuri,
      // limita ansamblului) pe langa amprentele reale de cladire (verificat pe fisier real de proiect).
      if (arie >= ARIE_CLADIRE_MIN && arie <= ARIE_CLADIRE_MAX) stats[l].nInRangeCladire++;
    });
    var out = {};
    Object.keys(stats).forEach(function (l) {
      var s = stats[l];
      out[l] = { n: s.n, arieMin: Math.round(s.arieMin), arieMax: Math.round(s.arieMax), arieMed: Math.round(s.arieSum / s.n), nInRangeCladire: s.nInRangeCladire };
    });
    return out;
  }

  G.SSI_DWG_IMPORT = {
    LAYERE_ASTEPTATE: LAYERE_ASTEPTATE,
    detectFormat: detectFormat, parseDXF: parseDXF, parseDXFFile: parseDXFFile,
    mapLayers: mapLayers, extractGeometrie: extractGeometrie,
    ariePoligonShoelace: ariePoligonShoelace, calculeazaDistantaMinima: calculeazaDistantaMinima,
    extrageAdnotariUrbanism: extrageAdnotariUrbanism, extrageCladiriDePeLayer: extrageCladiriDePeLayer,
    extrageIdentificareProprietati: extrageIdentificareProprietati,
    analizeazaLayerePoligoane: analizeazaLayerePoligoane, extrageFazaDinDXF: extrageFazaDinDXF,
    grupeazaInComponenteConexe: _grupeazaInComponenteConexe, rezolvaTamplarieDinBlocuri: rezolvaTamplarieDinBlocuri
  };
  console.log('[SSI] import DXF incarcat (window.SSI_DWG_IMPORT) — parser vanilla JS, fara dependinte externe');
})(window);
