/* ============================================================================
 * UrbanX — SSI: DETECTARE PLANSE MULTIPLE INTR-UN SINGUR DXF/DWG (js/25-ssi-dwg-multisheet.js)
 *
 * GAP REAL gasit prin audit (18 iul, cerere Florin — a aratat un DWG real cu 6 planse in
 * ACELASI fisier: plan de situatie, 2 fatade, 2 sectiuni, 2 planuri de nivel): motorul vechi
 * (js/25-ssi-dwg-import.js) NU are niciun concept de "planse separate" — trateaza TOATE
 * entitatile fisierului ca apartinand unui SINGUR desen (planul de situatie). Daca fisierul
 * are mai multe planse desenate una langa alta in modelspace (tipar foarte comun la
 * proiectantii romani — fiecare plansa cu chenar+cartus propriu, asezate in grid, FARA sa
 * foloseasca layout-uri/paperspace pt continut), geometria tuturor planselor se amesteca.
 *
 * Aceasta extensie ADAUGA (nu inlocuieste) motorul existent:
 * 1. detecteazaPlanse() — clusterizeaza entitatile in "insule" spatiale (o insula = o plansa),
 *    prin uniune-gasire pe bounding-box-uri extinse (2 entitati sunt in aceeasi insula daca
 *    bbox-urile lor, extinse cu un margin, se suprapun).
 *2. clasificaPlansa() — cauta in textul (TEXT/MTEXT) din insula cuvinte-cheie tipice cartusului
 *    romanesc de arhitectura ("PLAN PARTER", "PLAN ETAJ 2", "FATADA", "SECTIUNE", "PLAN DE
 *    SITUATIE" etc) pt a determina TIPUL plansei si, daca e plan de nivel, NIVELUL exact.
 * 3. extrageCamereDinPlansaNivel() — pt o insula clasificata ca plan de nivel: extrage
 *    poligoanele inchise de marime plauzibila pt o incapere (nu chenarul plansei insesi) +
 *    eticheta de nume/arie cea mai apropiata — acelasi tipar ca extrageCladiriDePeLayer, dar
 *    pt camere in loc de cladiri, TAGUIT cu nivelul plansei (gap explicit semnalat de audit:
 *    "niciun camp de nivel/etaj" in extractorul PDF existent).
 *
 * window.SSI_DWG_MULTISHEET: detecteazaPlanse() · clasificaPlansa() · extrageCamereDinPlansaNivel()
 * ========================================================================== */
(function (G) {
  'use strict';

  // Cuvinte-cheie de clasificare, cautate in textul CURATAT (fara diacritice, uppercase) al
  // fiecarei insule — ordinea conteaza (cea mai specifica varianta se verifica prima).
  var TIPARE_CLASIFICARE = [
    { tip: 'plan_situatie', re: /PLAN\s+DE?\s*SITUA[TȚ]IE|PLAN\s+DE?\s*INCADRARE|PLAN\s+AMPLASAMENT/ },
    { tip: 'plan_acoperis', re: /PLAN\s+ACOPERI[SȘ]|PLAN\s+[IÎ]NVELITOARE|PLAN\s+POD\b/ },
    { tip: 'plan_fundatii', re: /PLAN\s+FUNDA[TȚ]II/ },
    { tip: 'fatada', re: /FA[TȚ]AD[AĂ]/ },
    { tip: 'sectiune', re: /SEC[TȚ]IUNE/ },
    { tip: 'plan_nivel', re: /PLAN\s+PARTER/, nivel: 'Parter' },
    { tip: 'plan_nivel', re: /PLAN\s+DEMISOL/, nivel: 'Demisol' },
    { tip: 'plan_nivel', re: /PLAN\s+MANSARD[AĂ]/, nivel: 'Mansardă' },
    { tip: 'plan_nivel', re: /PLAN\s+SUBSOL\s*(\d*)/, nivelDinGrup: 1, nivelPrefix: 'Subsol ' },
    { tip: 'plan_nivel', re: /PLAN\s+ETAJ\s*(\d+)/, nivelDinGrup: 1, nivelPrefix: 'Etaj ' }
  ];

  function _fara_diacritice(s) {
    return String(s || '').toUpperCase()
      .replace(/[ĂÂ]/g, 'A').replace(/[Î]/g, 'I').replace(/[ȘŞ]/g, 'S').replace(/[ȚŢ]/g, 'T');
  }
  // MTEXT vine des cu coduri de formatare AutoCAD brute ("{\fVerdana|b0|i0|c0;PLAN PARTER}") care
  // ar rupe potrivirea cuvintelor-cheie daca nu sunt curatate mai intai (bug real gasit pe fisier
  // real Cresa Pogana — titlurile de plansa erau in MTEXT needecodat, cascada de clasificare pica).
  function _textCurat(t) {
    return G.SSI_DWG_IMPORT && typeof G.SSI_DWG_IMPORT.cleanMText === 'function' ? G.SSI_DWG_IMPORT.cleanMText(t) : String(t || '');
  }

  // Bounding box al unei entitati (LINE/LWPOLYLINE/POLYLINE/TEXT/MTEXT/INSERT/CIRCLE/ARC) —
  // reutilizeaza campurile deja populate de parseDXF() din 25-ssi-dwg-import.js.
  function _bboxEntitate(e) {
    if (e.type === 'LINE') return { xmin: Math.min(e.x1, e.x2), xmax: Math.max(e.x1, e.x2), ymin: Math.min(e.y1, e.y2), ymax: Math.max(e.y1, e.y2) };
    if ((e.type === 'LWPOLYLINE' || e.type === 'POLYLINE') && e.puncte && e.puncte.length) {
      var xs = e.puncte.map(function (p) { return p.x; }), ys = e.puncte.map(function (p) { return p.y; });
      return { xmin: Math.min.apply(null, xs), xmax: Math.max.apply(null, xs), ymin: Math.min.apply(null, ys), ymax: Math.max.apply(null, ys) };
    }
    if (e.type === 'CIRCLE' || e.type === 'ARC') { var r = e.raza || 0; return { xmin: e.x - r, xmax: e.x + r, ymin: e.y - r, ymax: e.y + r }; }
    if (e.x != null && e.y != null) return { xmin: e.x, xmax: e.x, ymin: e.y, ymax: e.y }; // TEXT/MTEXT/INSERT (punct de insertie)
    return null;
  }

  function _bboxSeSuprapun(a, b, margin) {
    return !(a.xmax + margin < b.xmin || b.xmax + margin < a.xmin || a.ymax + margin < b.ymin || b.ymax + margin < a.ymin);
  }
  function _uniuneBbox(a, b) { return { xmin: Math.min(a.xmin, b.xmin), xmax: Math.max(a.xmax, b.xmax), ymin: Math.min(a.ymin, b.ymin), ymax: Math.max(a.ymax, b.ymax) }; }

  // Clusterizare spatiala prin uniune-gasire pe bbox-uri extinse cu un margin. Marginul e
  // proportional cu extinderea TIPICA a unei entitati individuale (mediana ariilor bbox), NU
  // o valoare fixa — un plan de situatie la scara 1:500 si o sectiune la 1:50 din ACELASI fisier
  // au dimensiuni fizice foarte diferite in unitati de desen, un prag fix ar gresi pe unul din ele.
  // Doua treceri: (1) grupare initiala grosiera, (2) fuziune a grupurilor ale caror bbox-uri
  // (dupa prima trecere) se ating — prinde cazul in care o insula a fost initial impartita in 2.
  function detecteazaPlanse(parsedDXF) {
    var ents = (parsedDXF.entities || []).filter(function (e) { return _bboxEntitate(e); });
    if (!ents.length) return [];
    var bboxuri = ents.map(_bboxEntitate);
    // Margin adaptiv: 3x diagonala mediana a bbox-urilor individuale (entitati mici -> margin mic;
    // daca fisierul are putine entitati foarte mari, cade pe un fallback rezonabil).
    var diagonale = bboxuri.map(function (b) { return Math.hypot(b.xmax - b.xmin, b.ymax - b.ymin); }).filter(function (d) { return d > 0; }).sort(function (a, b) { return a - b; });
    var medianaD = diagonale.length ? diagonale[Math.floor(diagonale.length / 2)] : 1;
    var margin = Math.max(medianaD * 3, 0.5);

    var parinte = ents.map(function (_, i) { return i; });
    function gaseste(x) { while (parinte[x] !== x) { parinte[x] = parinte[parinte[x]]; x = parinte[x]; } return x; }
    function uneste(a, b) { var ra = gaseste(a), rb = gaseste(b); if (ra !== rb) parinte[ra] = rb; }

    // Grid spatial (bucketing) ca sa evitam O(n^2) pe fisiere mari: latura celulei = margin.
    var celule = {};
    function cheieCelula(cx, cy) { return cx + '_' + cy; }
    bboxuri.forEach(function (b, i) {
      var cx0 = Math.floor(b.xmin / margin), cx1 = Math.floor(b.xmax / margin);
      var cy0 = Math.floor(b.ymin / margin), cy1 = Math.floor(b.ymax / margin);
      for (var cx = cx0; cx <= cx1; cx++) for (var cy = cy0; cy <= cy1; cy++) {
        var k = cheieCelula(cx, cy); (celule[k] = celule[k] || []).push(i);
      }
    });
    Object.keys(celule).forEach(function (k) {
      var idxs = celule[k];
      for (var a = 0; a < idxs.length; a++) for (var b2 = a + 1; b2 < idxs.length; b2++) {
        if (_bboxSeSuprapun(bboxuri[idxs[a]], bboxuri[idxs[b2]], margin)) uneste(idxs[a], idxs[b2]);
      }
    });

    var grupuri = {};
    ents.forEach(function (e, i) { var r = gaseste(i); (grupuri[r] = grupuri[r] || { entitati: [], bbox: null }); grupuri[r].entitati.push(e); grupuri[r].bbox = grupuri[r].bbox ? _uniuneBbox(grupuri[r].bbox, bboxuri[i]) : bboxuri[i]; });

    var insule = Object.keys(grupuri).map(function (r) { return grupuri[r]; });
    // Filtreaza insule derizorii (un singur TEXT ratacit, sub 3 entitati) — nu reprezinta o plansa reala.
    insule = insule.filter(function (ins) { return ins.entitati.length >= 3; });
    insule.forEach(function (ins, idx) { ins.id = 'PLANSA_' + (idx + 1); ins.arie_bbox = (ins.bbox.xmax - ins.bbox.xmin) * (ins.bbox.ymax - ins.bbox.ymin); });
    // Sortare dupa pozitie (stanga-sus -> dreapta-jos) pt afisare predictibila utilizatorului.
    insule.sort(function (a, b) { return (b.bbox.ymax - a.bbox.ymax) || (a.bbox.xmin - b.bbox.xmin); });
    return insule;
  }

  // Clasificare: cauta in tot textul insulei (TEXT/MTEXT) tiparele cunoscute. Daca gaseste mai
  // multe potriviri (rar, dar posibil daca cartusul mentioneaza alte plansa in note), ia prima
  // din TIPARE_CLASIFICARE (ordine = specificitate descrescatoare).
  function clasificaPlansa(insula) {
    var texte = insula.entitati.filter(function (e) { return e.type === 'TEXT' || e.type === 'MTEXT'; }).map(function (e) { return _fara_diacritice(_textCurat(e.text)); });
    var tot = texte.join(' | ');
    for (var i = 0; i < TIPARE_CLASIFICARE.length; i++) {
      var t = TIPARE_CLASIFICARE[i];
      var m = tot.match(t.re);
      if (m) {
        var rezultat = { tip: t.tip, sursa_text: m[0] };
        if (t.nivel) rezultat.nivel = t.nivel;
        else if (t.nivelDinGrup && m[t.nivelDinGrup]) rezultat.nivel = t.nivelPrefix + m[t.nivelDinGrup];
        else if (t.tip === 'plan_nivel' && t.nivelPrefix && !m[1]) rezultat.nivel = t.nivelPrefix.trim(); // "PLAN SUBSOL" fara numar = subsol unic
        return rezultat;
      }
    }
    return { tip: 'necunoscut', sursa_text: null };
  }

  // GAP REAL gasit pe fisier real (Cresa Pogana, 20 iul, cerere Florin): cand planșele sunt asezate
  // COMPACT in acelasi modelspace (foarte comun la o cladire mica, tot proiectul pe o singura
  // "pagina" de desen), clusterizarea spatiala (detecteazaPlanse) le uneste intr-o SINGURA insula
  // uriasa (69.033 entitati aici) — clasificaPlansa ia doar PRIMA potrivire de cuvant-cheie gasita
  // in tot textul insulei si eticheteaza GRESIT tot blocul cu un singur tip, desi contine de fapt
  // plan parter + fatada + sectiune + plan invelitoare deodata (verificat: toate 4 cuvintele-cheie
  // erau prezente in text, dar clasificaPlansa raporta doar "plan_acoperis").
  // Gaseste TOATE entitatile text ce se potrivesc cu un tip cunoscut (nu doar prima ca la
  // clasificaPlansa) — devin "ancore" pt re-separarea insulelor suprapuse.
  function _gasesteAncore(insula) {
    var ancore = [];
    insula.entitati.forEach(function (e) {
      if (e.type !== 'TEXT' && e.type !== 'MTEXT') return;
      if (e.x == null || e.y == null) return;
      var txt = _fara_diacritice(_textCurat(e.text));
      for (var i = 0; i < TIPARE_CLASIFICARE.length; i++) {
        var t = TIPARE_CLASIFICARE[i];
        var m = txt.match(t.re);
        if (m) {
          var rezultat = { tip: t.tip, sursa_text: m[0], x: e.x, y: e.y };
          if (t.nivel) rezultat.nivel = t.nivel;
          else if (t.nivelDinGrup && m[t.nivelDinGrup]) rezultat.nivel = t.nivelPrefix + m[t.nivelDinGrup];
          else if (t.tip === 'plan_nivel' && t.nivelPrefix && !m[1]) rezultat.nivel = t.nivelPrefix.trim();
          ancore.push(rezultat);
          break;
        }
      }
    });
    return ancore;
  }
  function _centruEntitate(e) { var b = _bboxEntitate(e); return b ? { x: (b.xmin + b.xmax) / 2, y: (b.ymin + b.ymax) / 2 } : null; }

  // Daca o insula contine ancore de MAI MULTE tipuri distincte, o desparte in sub-insule prin
  // atribuire "cel mai apropiat vecin" (fiecare entitate merge la titlul de plansa cel mai apropiat
  // spatial) — aproximare rezonabila cand plansele sunt asezate compact in grid, fara sa necesite
  // detectarea explicita a chenarului/cartusului fiecarei planse (motor separat, mai robust, de
  // adaugat ulterior daca aceasta aproximare nu separa suficient de curat pe fisiere viitoare).
  function _separaInsulaMultipla(insula) {
    var ancore = _gasesteAncore(insula);
    var tipuriDistincte = {}; ancore.forEach(function (a) { tipuriDistincte[a.tip] = 1; });
    if (Object.keys(tipuriDistincte).length < 2) return [insula]; // un singur tip real gasit -> nu desparte
    var grupuri = ancore.map(function (a) { return { entitati: [], ancora: a }; });
    insula.entitati.forEach(function (e) {
      var c = _centruEntitate(e); if (!c) return;
      var best = 0, bestD = Infinity;
      for (var i = 0; i < ancore.length; i++) {
        var d = Math.hypot(c.x - ancore[i].x, c.y - ancore[i].y);
        if (d < bestD) { bestD = d; best = i; }
      }
      grupuri[best].entitati.push(e);
    });
    return grupuri.filter(function (g) { return g.entitati.length >= 3; }).map(function (g, idx) {
      var bboxuri = g.entitati.map(_bboxEntitate).filter(Boolean);
      var bbox = bboxuri.reduce(function (acc, b) { return acc ? _uniuneBbox(acc, b) : b; }, null);
      return {
        id: insula.id + '.' + (idx + 1), entitati: g.entitati, bbox: bbox || insula.bbox,
        arie_bbox: bbox ? (bbox.xmax - bbox.xmin) * (bbox.ymax - bbox.ymin) : 0, _ancoraDeSeparare: g.ancora
      };
    });
  }

  // Aplica separarea pe toate insulele detectate — de apelat DUPA detecteazaPlanse() si INAINTE de
  // clasificarea finala a fiecarei (sub-)insule. Insulele cu un singur tip (sau fara niciun titlu
  // recunoscut) raman neschimbate.
  function separaPlanseSuprapuse(insule) {
    var rezultat = [];
    (insule || []).forEach(function (ins) { rezultat = rezultat.concat(_separaInsulaMultipla(ins)); });
    return rezultat;
  }

  // Extrage camere dintr-o insula clasificata ca plan_nivel: poligoane inchise de arie plauzibila
  // pt o incapere (2-150 mp — exclude chenarul plansei, care e mult mai mare), cu eticheta de
  // nume/arie cea mai apropiata gasita in text. Fara eticheta explicita, numele ramane generic
  // ("Încăpere N") si aria vine STRICT din poligon (nu se inventeaza un nume de camera).
  var ARIE_CAMERA_MIN = 2, ARIE_CAMERA_MAX = 150;
  function extrageCamereDinPlansaNivel(insula, DWG) {
    var poligoane = insula.entitati.filter(function (e) { return (e.type === 'LWPOLYLINE' || e.type === 'POLYLINE') && e.puncte && e.puncte.length >= 3; });
    var texte = insula.entitati.filter(function (e) { return (e.type === 'TEXT' || e.type === 'MTEXT') && e.x != null && e.y != null; });
    var arieFn = DWG.ariePoligonShoelace;
    var camereRaw = [];
    poligoane.forEach(function (p, idx) {
      var arie = arieFn(p.puncte);
      if (arie < ARIE_CAMERA_MIN || arie > ARIE_CAMERA_MAX) return;
      var cx = 0, cy = 0; p.puncte.forEach(function (pt) { cx += pt.x; cy += pt.y; }); cx /= p.puncte.length; cy /= p.puncte.length;
      var diag = Math.hypot((Math.max.apply(null, p.puncte.map(function (pt) { return pt.x; })) - Math.min.apply(null, p.puncte.map(function (pt) { return pt.x; }))), (Math.max.apply(null, p.puncte.map(function (pt) { return pt.y; })) - Math.min.apply(null, p.puncte.map(function (pt) { return pt.y; }))));
      camereRaw.push({ idx: idx, poligon: p.puncte, arie: arie, cx: cx, cy: cy, razaMax: Math.max(diag, 3) });
    });
    // FIX BUG REAL (gasit prin test sintetic, 18 iul): potrivirea initiala "eticheta cea mai apropiata
    // de FIECARE camera, independent" lasa aceeasi eticheta sa fie revendicata de MAI MULTE camere
    // (doua camere alaturate, o singura eticheta intre ele -> ambele o "fura"). Fix: potrivire GREEDY
    // pe distanta globala minima (toate perechile camera-eticheta candidate, sortate crescator, fiecare
    // eticheta si fiecare camera se aloca o SINGURA data) — un algoritm de asignare bipartita simpla,
    // suficient de bun pt acest caz (nu e nevoie de solutia optima Hungarian, doar sa nu duplice).
    var perechi = [];
    camereRaw.forEach(function (c, ci) {
      texte.forEach(function (t, ti) {
        var d = Math.hypot(t.x - c.cx, t.y - c.cy);
        if (d <= c.razaMax) perechi.push({ ci: ci, ti: ti, d: d });
      });
    });
    perechi.sort(function (a, b) { return a.d - b.d; });
    var camerauFolosita = {}, textFolosit = {};
    var etichetaPtCamera = {};
    perechi.forEach(function (pr) {
      if (camerauFolosita[pr.ci] || textFolosit[pr.ti]) return;
      camerauFolosita[pr.ci] = true; textFolosit[pr.ti] = true;
      etichetaPtCamera[pr.ci] = texte[pr.ti];
    });
    var camere = camereRaw.map(function (c, ci) {
      var eticheta = etichetaPtCamera[ci];
      var nume = null, arieEticheta = null;
      if (eticheta) {
        var txt = (eticheta.text || '').replace(/\\P/g, ' ');
        var mArie = txt.match(/([\d]+[.,]\d+|\d+)\s*m(?:p|²)/i);
        if (mArie) arieEticheta = parseFloat(mArie[1].replace(',', '.'));
        nume = txt.replace(/[\d]+[.,]?\d*\s*m(?:p|²)/i, '').trim() || null;
      }
      return {
        nume: nume || ('Încăpere ' + (ci + 1)), arie_mp: Math.round((arieEticheta || c.arie) * 100) / 100,
        arie_sursa: arieEticheta ? 'etichetă text (mai fiabilă decât poligonul dacă diferă)' : 'poligon DXF',
        nivel: insula.clasificare && insula.clasificare.nivel || null,
        poligon: c.poligon
      };
    });
    return camere;
  }

  G.SSI_DWG_MULTISHEET = {
    detecteazaPlanse: detecteazaPlanse, clasificaPlansa: clasificaPlansa,
    extrageCamereDinPlansaNivel: extrageCamereDinPlansaNivel, separaPlanseSuprapuse: separaPlanseSuprapuse
  };
  console.log('[SSI] detectare planse multiple in DXF incarcata (window.SSI_DWG_MULTISHEET)');
})(window);
