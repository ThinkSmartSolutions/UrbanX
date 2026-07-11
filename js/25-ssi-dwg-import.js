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
    cote_nivel: ['COTE', 'COTA_TEREN', 'NIVELMENT']
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

  function parseDXF(text) {
    var pairs = _tokenizeDXF(text);
    var entities = [];
    var i = 0, n = pairs.length;
    // gaseste sectiunea ENTITIES
    var inEntities = false;
    var cur = null; // entitate curenta in constructie
    var curVerts = null; // pentru LWPOLYLINE: acumulare {x,y}
    var pendingVertex = null; // pentru POLYLINE/VERTEX clasic

    function flushLW() {
      if (cur && cur.type === 'LWPOLYLINE') { cur.puncte = curVerts || []; entities.push(cur); }
      cur = null; curVerts = null;
    }

    while (i < n) {
      var p = pairs[i];
      if (p.code === 0) {
        if (p.value === 'SECTION') { /* urmeaza code 2 cu numele */ }
        if (p.value === 'ENDSEC') { inEntities = false; flushLW(); }
        if (p.value === 'ENTITIES') { /* de fapt code 2 confirma, tratam simplificat: activam de la primul entity type cunoscut */ }
        // orice "0 <TYPE>" nou incheie entitatea anterioara LWPOLYLINE
        if (cur && cur.type === 'LWPOLYLINE' && p.value !== 'LWPOLYLINE') flushLW();
        if (['LINE', 'LWPOLYLINE', 'POLYLINE', 'INSERT', 'TEXT', 'MTEXT', 'CIRCLE'].indexOf(p.value) !== -1) {
          inEntities = true;
          cur = { type: p.value, layer: null };
          if (p.value === 'LWPOLYLINE') curVerts = [];
        } else if (p.value === 'VERTEX' && cur && cur.type === 'POLYLINE') {
          pendingVertex = { x: null, y: null };
        } else if (p.value === 'SEQEND' && cur && cur.type === 'POLYLINE') {
          entities.push(cur); cur = null;
        }
        i++; continue;
      }
      if (cur) {
        if (p.code === 8) cur.layer = p.value;
        if (cur.type === 'LINE') {
          if (p.code === 10) cur.x1 = parseFloat(p.value);
          if (p.code === 20) cur.y1 = parseFloat(p.value);
          if (p.code === 11) cur.x2 = parseFloat(p.value);
          if (p.code === 21) cur.y2 = parseFloat(p.value);
        } else if (cur.type === 'LWPOLYLINE') {
          if (p.code === 70) cur.closed = (parseInt(p.value, 10) & 1) === 1;
          if (p.code === 10) curVerts.push({ x: parseFloat(p.value), y: null });
          if (p.code === 20 && curVerts.length) curVerts[curVerts.length - 1].y = parseFloat(p.value);
        } else if (cur.type === 'POLYLINE') {
          if (p.code === 70) cur.closed = (parseInt(p.value, 10) & 1) === 1;
          if (!cur.puncte) cur.puncte = [];
          if (pendingVertex) {
            if (p.code === 10) pendingVertex.x = parseFloat(p.value);
            if (p.code === 20) pendingVertex.y = parseFloat(p.value);
          }
        } else if (cur.type === 'INSERT') {
          if (p.code === 2) cur.blockName = p.value;
          if (p.code === 10) cur.x = parseFloat(p.value);
          if (p.code === 20) cur.y = parseFloat(p.value);
        } else if (cur.type === 'TEXT' || cur.type === 'MTEXT') {
          if (p.code === 1) cur.text = p.value;
          if (p.code === 10) cur.x = parseFloat(p.value);
          if (p.code === 20) cur.y = parseFloat(p.value);
        } else if (cur.type === 'CIRCLE') {
          if (p.code === 10) cur.x = parseFloat(p.value);
          if (p.code === 20) cur.y = parseFloat(p.value);
          if (p.code === 40) cur.raza = parseFloat(p.value);
        }
        // finalizare vertex clasic POLYLINE la urmatorul VERTEX/SEQEND (gestionat prin code 0 mai sus);
        // aici doar acumulam pendingVertex in cur.puncte cand avem ambele coordonate:
        if (cur.type === 'POLYLINE' && pendingVertex && pendingVertex.x != null && pendingVertex.y != null) {
          cur.puncte.push({ x: pendingVertex.x, y: pendingVertex.y }); pendingVertex = null;
        }
      }
      i++;
    }
    flushLW();

    var layers = {};
    entities.forEach(function (e) { var l = e.layer || '0'; layers[l] = (layers[l] || 0) + 1; });
    return { entities: entities, layers: Object.keys(layers), layerCounts: layers, nrEntitati: entities.length };
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

    var out = { limita_proprietate: null, volum_existent: null, volum_propus: null, vecinatati_geometrie: [], sursa: 'dwg' };

    var limitaPol = limitaLayer && primulPoligon(limitaLayer);
    if (limitaPol) out.limita_proprietate = { poligon: limitaPol.puncte, sursa: 'dwg' };

    var propusPol = propusLayer && primulPoligon(propusLayer);
    if (propusPol) out.volum_propus = { poligon: propusPol.puncte, arie_mp: Math.round(ariePoligonShoelace(propusPol.puncte)), sursa: 'dwg' };

    var existentPol = existentLayer && primulPoligon(existentLayer);
    if (existentPol) out.volum_existent = { poligon: existentPol.puncte, arie_mp: Math.round(ariePoligonShoelace(existentPol.puncte)), sursa: 'dwg' };

    if (vecinLayer) {
      var vecini = _entitatiPePoligon(ents, vecinLayer);
      var refPol = (propusPol || existentPol);
      out.vecinatati_geometrie = vecini.map(function (v, idx) {
        var dist = refPol ? calculeazaDistantaMinima(refPol.puncte, v.puncte) : null;
        return { id: 'V' + (idx + 1), poligon: v.puncte, arie_mp: Math.round(ariePoligonShoelace(v.puncte)),
          distanta_min_la_propriu_m: dist != null ? Math.round(dist * 100) / 100 : null };
      });
    }
    return out;
  }

  G.SSI_DWG_IMPORT = {
    LAYERE_ASTEPTATE: LAYERE_ASTEPTATE,
    detectFormat: detectFormat, parseDXF: parseDXF, parseDXFFile: parseDXFFile,
    mapLayers: mapLayers, extractGeometrie: extractGeometrie,
    ariePoligonShoelace: ariePoligonShoelace, calculeazaDistantaMinima: calculeazaDistantaMinima
  };
  console.log('[SSI] import DXF incarcat (window.SSI_DWG_IMPORT) — parser vanilla JS, fara dependinte externe');
})(window);
