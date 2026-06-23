/* ============================================================================
 * UrbanX — Superbloc (model Barcelona / Salvador Rueda) — FUNCȚIE INTEGRATĂ.
 * Nu e doar un calculator izolat: e un instrument de regenerare reflectat în
 *   • CINEMATIC  — SE._addSuperbloc(map) desenează transformarea pe hartă
 *   • SIDU       — proiect-tip în domeniul „regenerare urbană"
 *   • Masterplan — capitol „spațiu public recâștigat + climă"
 *   • PMUD       — capitol „tranzit pe perimetru + calmarea traficului"
 * Grupează ~9 cvartale (~400×400m), deviază tranzitul pe perimetru, eliberează
 * interiorul pentru pietoni/verde. Vizualizare ÎNAINTE/DUPĂ pe hartă (grilă sintetică).
 * window.Superbloc: compute · geometry · drawTransform · openPanel · chapter
 * Surse: Agència d'Ecologia Urbana Barcelona · ISGlobal · plan Cerdà · superilles.
 * ========================================================================== */
(function (G) {
  'use strict';
  function N(x) { try { return Math.round(x).toLocaleString('ro-RO'); } catch (e) { return String(Math.round(x)); } }

  function compute(inp) {
    inp = inp || {};
    var side = +inp.side_m || 400;
    var area = side * side;                       // m²
    var streetPct = inp.street_pct == null ? 0.20 : +inp.street_pct;  // % carosabil din superbloc
    var freePct = inp.free_pct == null ? 0.65 : +inp.free_pct;        // % interior eliberat
    var dens = +inp.density_loc_ha || 200;        // loc/ha (urban dens)
    var streetArea = area * streetPct;
    var freed = Math.round(streetArea * freePct);            // m² spațiu public recâștigat
    var green = Math.round(freed * 0.55), playSquare = Math.round(freed * 0.45);
    var pop = Math.round(area / 10000 * dens);
    // răcire: tratăm spațiul verde nou ca parc (folosim logica UHI dacă există)
    var cooling = null;
    try { if (G.UHI) { var c = G.UHI.calculateCooling('parc_urban', green); cooling = c ? c.cooling_c : null; } } catch (e) {}
    if (cooling == null) cooling = Math.round(Math.min(3, 0.0004 * green) * 100) / 100;
    var co2 = Math.round(green / 10000 * 5.5 * 10) / 10;
    // mobilitate: transfer modal estimat (interior eliberat de tranzit)
    var traffic_reduction_pct = 25; // ordin de mărime din studii superilles/zone 30
    return {
      side_m: side, area_ha: Math.round(area / 10000 * 10) / 10,
      freed_m2: freed, green_m2: green, play_square_m2: playSquare,
      population: pop, cooling_c: cooling, co2_t_year: co2,
      traffic_reduction_pct: traffic_reduction_pct,
      transit_note: 'tranzitul auto → perimetru; interior 10 km/h, prioritate pieton/biciclist; acces doar rezidenți, livrări, urgențe'
    };
  }

  // ── GEOMETRIE (grilă sintetică 3×3) — folosită de hartă + cinematic ──
  function geometry(c, side) {
    side = side || 400; var half = side / 2;
    var kLat = 1 / 111320, kLon = 1 / (111320 * Math.cos((c[1] || 45) * Math.PI / 180));
    var dLat = half * kLat, dLon = half * kLon;
    var x0 = c[0] - dLon, x1 = c[0] + dLon, y0 = c[1] - dLat, y1 = c[1] + dLat;
    var boundary = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
    var t = side / 6; // linii interioare la treimi (3×3 cvartale)
    var ixA = c[0] - t * kLon, ixB = c[0] + t * kLon, iyA = c[1] - t * kLat, iyB = c[1] + t * kLat;
    var streets = [
      [[ixA, y0], [ixA, y1]], [[ixB, y0], [ixB, y1]],   // verticale interioare
      [[x0, iyA], [x1, iyA]], [[x0, iyB], [x1, iyB]]     // orizontale interioare
    ];
    var plazas = [[ixA, iyA], [ixB, iyA], [ixA, iyB], [ixB, iyB]]; // 4 intersecții interioare = piațete
    return { boundary: boundary, streets: streets, plazas: plazas };
  }
  function fc(arr) { return { type: 'FeatureCollection', features: arr }; }
  function lineFeat(coords) { return { type: 'Feature', geometry: { type: 'LineString', coordinates: coords }, properties: {} }; }
  function ptFeat(co) { return { type: 'Feature', geometry: { type: 'Point', coordinates: co }, properties: {} }; }

  // ════════════════ HARTĂ STANDALONE — ÎNAINTE/DUPĂ ════════════════
  var IDS = { fill: 'superbloc-fill', perim: 'superbloc-perim', street: 'superbloc-street', plaza: 'superbloc-plaza', local: 'superbloc-local' };
  function _clear(map) { [IDS.plaza, IDS.local, IDS.street, IDS.perim, IDS.fill].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} try { if (map.getSource(id)) map.removeSource(id); } catch (e) {} }); }

  // ── SUPERBLOC PE STRĂZI REALE (OSM) — interior pietonal vs perimetru tranzit ──
  function drawReal(side) {
    var map = G.map; var c = centroid(); if (!map || !c) { G.ss && G.ss('Harta nu e pregătită'); return; }
    if (!G.OSMStreets) { drawTransform(side || 400, true); return; } // fallback grilă sintetică
    side = side || 400; _clear(map);
    G.ss && G.ss('🟧 Aduc rețeaua reală de străzi (OSM)…');
    var radius = Math.max(220, side / 2 + 60);
    G.OSMStreets.fetch(c, radius).then(function (net) {
      var g = geometry(c, side);
      var box = G.turf.polygon([g.boundary]);
      // clasifică străzile REALE: arteră = perimetru (tranzit) · locală = interior (pietonal/verde)
      var arter = [], local = [], localLen = 0;
      net.ways.forEach(function (w) {
        var ls; try { ls = G.turf.lineString(w.coords); } catch (e) { return; }
        var f = { type: 'Feature', geometry: ls.geometry, properties: { hw: w.hw, name: w.name } };
        if (w.klass === 'arterial') { arter.push(f); }
        else if (w.klass === 'local') {
          // doar segmentele din interiorul superblocului devin pietonale
          var mid = w.coords[Math.floor(w.coords.length / 2)];
          var inside = false; try { inside = G.turf.booleanPointInPolygon(G.turf.point(mid), box); } catch (e) {}
          if (inside) { local.push(f); localLen += w.len_m; }
        }
      });
      // umplere + perimetru
      map.addSource(IDS.fill, { type: 'geojson', data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [g.boundary] }, properties: {} } });
      map.addLayer({ id: IDS.fill, type: 'fill', source: IDS.fill, paint: { 'fill-color': '#639922', 'fill-opacity': 0.10 } });
      map.addLayer({ id: IDS.perim, type: 'line', source: IDS.fill, paint: { 'line-color': '#fb923c', 'line-width': 3.5, 'line-dasharray': [2, 1] } });
      // artere = tranzit (portocaliu)
      map.addSource(IDS.street, { type: 'geojson', data: fc(arter) });
      map.addLayer({ id: IDS.street, type: 'line', source: IDS.street, paint: { 'line-color': '#fb923c', 'line-width': 3, 'line-opacity': 0.85 } });
      // străzi locale interioare = pietonal/verde (recâștigate)
      map.addSource(IDS.local, { type: 'geojson', data: fc(local) });
      map.addLayer({ id: IDS.local, type: 'line', source: IDS.local, paint: { 'line-color': '#22c55e', 'line-width': ['interpolate', ['linear'], ['zoom'], 13, 5, 17, 14], 'line-opacity': 0.9 } });
      try { map.flyTo({ center: c, zoom: Math.max(map.getZoom(), 15.4) }); } catch (e) {}
      // METRICI REALE din rețea
      var reclaimed = Math.round(localLen * 7 * 0.65); // lungime locală reală × 7m carosabil × 65% eliberat
      var green = Math.round(reclaimed * 0.55);
      var cooling = null; try { if (G.UHI) { var cc = G.UHI.calculateCooling('parc_urban', green); cooling = cc && cc.cooling_c; } } catch (e) {}
      _real = { interior_streets: local.length, interior_len_m: Math.round(localLen), perimeter_streets: arter.length, reclaimed_m2: reclaimed, green_m2: green, cooling_c: cooling };
      _mountBarReal(map, side, _real);
      G.ss && G.ss('🟧 Superbloc REAL: ' + local.length + ' străzi interioare (' + Math.round(localLen) + 'm) → pietonal/verde · ' + reclaimed.toLocaleString('ro-RO') + ' mp recâștigați · perimetru: ' + arter.length + ' artere');
    }).catch(function (e) {
      console.warn('[Superbloc] OSM', e); G.ss && G.ss('OSM indisponibil — folosesc grila sintetică'); drawTransform(side, true);
    });
  }
  var _real = null;
  function _mountBarReal(map, side, r) {
    var old = document.getElementById('superbloc-bar'); if (old) old.remove();
    var bar = document.createElement('div'); bar.id = 'superbloc-bar';
    bar.style.cssText = 'position:fixed;bottom:130px;right:10px;z-index:3200;background:rgba(8,15,35,.95);color:#e6edf7;border:1px solid rgba(251,146,60,.5);border-radius:11px;padding:10px 12px;font-size:11px;font-family:system-ui;max-width:230px;line-height:1.5';
    bar.innerHTML = '<div style="font-weight:800;color:#fdba74;margin-bottom:4px">🟧 Superbloc (date reale OSM)</div>' +
      '<div><span style="color:#22c55e">●</span> ' + r.interior_streets + ' străzi interioare → pietonal/verde</div>' +
      '<div><span style="color:#fb923c">●</span> ' + r.perimeter_streets + ' artere → tranzit pe perimetru</div>' +
      '<div style="margin-top:4px;color:#94a3b8">Spațiu recâștigat: <b style="color:#e6edf7">' + r.reclaimed_m2.toLocaleString('ro-RO') + ' mp</b></div>' +
      (r.cooling_c ? '<div style="color:#94a3b8">Răcire estimată: <b style="color:#34d399">−' + r.cooling_c + '°C</b></div>' : '') +
      '<button id="superbloc-hide2" style="margin-top:7px;background:rgba(255,255,255,.08);color:#cbd5e1;border:1px solid rgba(255,255,255,.15);border-radius:7px;padding:5px 9px;cursor:pointer;font-size:11px">✕ Ascunde</button>';
    document.body.appendChild(bar);
    document.getElementById('superbloc-hide2').onclick = function () { _clear(map); bar.remove(); };
  }
  function centroid() { try { var m = G.map; if (m) return [m.getCenter().lng, m.getCenter().lat]; } catch (e) {} return null; }

  function drawTransform(side, showAfter) {
    var map = G.map; var c = centroid(); if (!map || !c) { G.ss && G.ss('Harta nu e pregătită'); return; }
    _clear(map);
    var g = geometry(c, side || 400);
    map.addSource(IDS.fill, { type: 'geojson', data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [g.boundary] }, properties: {} } });
    map.addLayer({ id: IDS.fill, type: 'fill', source: IDS.fill, paint: { 'fill-color': showAfter ? '#639922' : '#94a3b8', 'fill-opacity': showAfter ? 0.16 : 0.10 } });
    map.addLayer({ id: IDS.perim, type: 'line', source: IDS.fill, paint: { 'line-color': '#fb923c', 'line-width': 4, 'line-dasharray': [2, 1] } });
    map.addSource(IDS.street, { type: 'geojson', data: fc(g.streets.map(lineFeat)) });
    map.addLayer({ id: IDS.street, type: 'line', source: IDS.street, paint: { 'line-color': showAfter ? '#639922' : '#555555', 'line-width': showAfter ? 9 : 2.5, 'line-opacity': 0.9 } });
    map.addSource(IDS.plaza, { type: 'geojson', data: fc(g.plazas.map(ptFeat)) });
    map.addLayer({ id: IDS.plaza, type: 'circle', source: IDS.plaza, paint: { 'circle-radius': showAfter ? 13 : 0, 'circle-color': '#97C459', 'circle-opacity': 0.92, 'circle-stroke-width': 2, 'circle-stroke-color': '#ecfdf5' } });
    try { map.flyTo({ center: c, zoom: Math.max(map.getZoom(), 15.2) }); } catch (e) {}
    _mountBar(map, side || 400, showAfter);
  }
  function _mountBar(map, side, showAfter) {
    var old = document.getElementById('superbloc-bar'); if (old) old.remove();
    var bar = document.createElement('div'); bar.id = 'superbloc-bar';
    bar.style.cssText = 'position:fixed;bottom:130px;right:10px;z-index:3200;background:rgba(8,15,35,.94);color:#e6edf7;border:1px solid rgba(251,146,60,.5);border-radius:11px;padding:9px 11px;font-size:12px;font-family:system-ui;display:flex;gap:8px;align-items:center';
    var lbl = document.createElement('span'); lbl.style.cssText = 'color:#94a3b8'; lbl.textContent = '← Actual';
    var sw = document.createElement('button'); sw.style.cssText = 'background:linear-gradient(180deg,#fb923c,#ea580c);color:#06101f;border:0;border-radius:8px;padding:6px 11px;font-weight:700;cursor:pointer';
    var lbl2 = document.createElement('span'); lbl2.style.cssText = 'color:#86efac'; lbl2.textContent = 'Superbloc →';
    var hide = document.createElement('button'); hide.style.cssText = 'background:rgba(255,255,255,.08);color:#cbd5e1;border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:6px 9px;cursor:pointer'; hide.textContent = '✕';
    var state = { after: !!showAfter };
    function sync() { sw.textContent = state.after ? '◉ DUPĂ' : '○ ÎNAINTE'; }
    sw.onclick = function () { state.after = !state.after; sync(); drawTransform(side, state.after); };
    hide.onclick = function () { _clear(map); bar.remove(); };
    sync(); bar.appendChild(lbl); bar.appendChild(sw); bar.appendChild(lbl2); bar.appendChild(hide); document.body.appendChild(bar);
  }
  function drawOverlay(side) { drawTransform(side, true); } // back-compat

  // ════════════════ CINEMATIC — date pentru SE._addSuperbloc ════════════════
  // SE desenează cu _safeAdd (cleanup integrat). Aici expunem doar geometria + etichete.
  function cinematicData(center, side) {
    var g = geometry(center, side || 420);
    var r = compute({ side_m: side || 420 });
    return {
      geo: g, stats: r,
      labels: [
        { lon: center[0], lat: center[1], color: '#fb923c', icon: '🟧', title: 'SUPERBLOC — model Barcelona', sub: '~9 cvartale · tranzit pe perimetru' },
        { lon: g.plazas[0][0], lat: g.plazas[0][1], color: '#22c55e', icon: '🌳', title: 'Interior pietonal/verde', sub: N(r.freed_m2) + ' mp spațiu public recâștigat' },
        { lon: g.plazas[3][0], lat: g.plazas[3][1], color: '#34d399', icon: '🍃', title: '−' + r.cooling_c + '°C local', sub: 'piațete de cartier · regula 3-30-300' }
      ]
    };
  }

  // ════════════════ CAPITOL pentru Masterplan + PMUD ════════════════
  function chapter(D) {
    if (!D || !D.chapter) return;
    var c = compute({ side_m: 400 });
    D.chapter('Instrument de regenerare — Superbloc (model Barcelona)');
    D.P('Superbloc-ul (Salvador Rueda, Agència d\'Ecologia Urbana Barcelona) grupează ~9 cvartale (~400×400m), ' +
      'deviază tranzitul auto pe perimetru și eliberează interiorul pentru pietoni, biciclete și verde — fără demolări. ' +
      'Direct aplicabil în orașele RO cu tramă în grilă (centre istorice, cartiere de blocuri).');
    D.kpis([
      { label: 'Spațiu public recâștigat', val: N(c.freed_m2) + ' mp', sub: 'din carosabil, per superbloc' },
      { label: 'Răcire locală', val: '−' + c.cooling_c + '°C', sub: 'verde nou (legat UHI)' },
      { label: 'Locuitori deserviți', val: N(c.population), sub: 'per superbloc (200 loc/ha)' }
    ]);
    D.callout('Componenta de mobilitate (PMUD)',
      'Tranzitul de pasaj se mută pe arterele de perimetru; interiorul devine zonă 10 km/h cu prioritate pieton/biciclist ' +
      '(acces doar rezidenți, livrări, urgențe). Efect estimat: trafic de pasaj interior ~−' + c.traffic_reduction_pct + '%, viteze reduse, ' +
      'transfer modal spre mers pe jos și velo. Necesită studiu de rerutare a perimetrului (vezi modulul UrbanX Flux).', [96, 130, 200]);
    D.callout('Componenta de spațiu public & climă (Masterplan)',
      'Carosabilul eliberat devine verde + piațete de cartier (regula 3-30-300: 3 arbori vizibili, 30% canopy, 300 m la un parc). ' +
      'Contribuie la ținta Legea 24/2007 (mp spațiu verde/locuitor) și la reducerea insulei de căldură urbană.', [16, 150, 80]);
    if (D.source) D.source('Agència d\'Ecologia Urbana Barcelona (Salvador Rueda) · ISGlobal (studiu sănătate superilles) · plan Cerdà 1859 · ghid „superilles".');
  }
  function patchReports() {
    ['_StratMasterplanContent', '_StratPMUDContent'].forEach(function (name) {
      var obj = G[name]; if (!obj || typeof obj.build !== 'function' || obj.__superblocPatched) return;
      var orig = obj.build.bind(obj);
      obj.build = function (D, ctx) { orig(D, ctx); try { chapter(D); } catch (e) { console.warn('[Superbloc chapter]', e); } };
      obj.__superblocPatched = true;
    });
  }
  var _t = 0, _iv = setInterval(function () { _t++; patchReports(); if (_t > 40) clearInterval(_iv); }, 300); patchReports();

  // ════════════════ UI (panel) ════════════════
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(620px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(251,146,60,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#fb923c,#ea580c);color:#06101f;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#fdba74;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700'
  };
  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🟧 Superbloc (model Barcelona)</div><div style="font-size:11px;color:#94a3b8">Tranzit pe perimetru · interior pentru oameni · reflectat în SIDU, Masterplan, PMUD & cinematic</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    body.appendChild(el('div', { style: 'font-size:12px;color:#cbd5e1;margin-bottom:6px' }, 'Grupează ~9 cvartale într-o zonă de ~400×400m. Mașinile de tranzit ocolesc pe perimetru; interiorul devine zonă cu 10 km/h unde pietonii și bicicliștii au prioritate, iar carosabilul eliberat devine verde + piațete.'));
    body.appendChild(el('div', { style: ST.label }, 'Parametri'));
    var g = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px' });
    var side = el('input', { style: ST.inp, type: 'number', value: '400' });
    var dens = el('input', { style: ST.inp, type: 'number', value: '200' });
    var freep = el('input', { style: ST.inp, type: 'number', value: '65' });
    [['Latură superbloc (m)', side], ['Densitate (loc/ha)', dens], ['% carosabil eliberat', freep]].forEach(function (o) { var w = el('div'); w.appendChild(el('div', { style: 'font-size:11px;color:#cbd5e1;margin-bottom:3px' }, o[0])); w.appendChild(o[1]); g.appendChild(w); });
    body.appendChild(g);
    var run = el('button', { style: ST.btn + ';margin-top:12px' }, '▶ Calculează'); body.appendChild(run);
    var mapBtn = el('button', { style: ST.ghost + ';margin-top:12px;margin-left:8px' }, '🗺 Aplică pe străzile reale (OSM)'); body.appendChild(mapBtn);
    var out = el('div', { style: 'margin-top:12px' }); body.appendChild(out);
    run.onclick = function () {
      var r = compute({ side_m: +side.value, density_loc_ha: +dens.value, free_pct: (+freep.value || 65) / 100 });
      function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;text-align:center"><div style="font-size:17px;font-weight:800;color:' + (c || '#fdba74') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
      out.innerHTML = '<div style="display:flex;gap:8px;margin-bottom:8px">' + card(N(r.freed_m2) + ' mp', 'spațiu public recâștigat', '#22c55e') + card(N(r.population), 'locuitori deserviți') + card('−' + r.cooling_c + '°C', 'răcire (verde nou)', '#34d399') + '</div>' +
        '<div style="display:flex;gap:8px;margin-bottom:8px">' + card(N(r.green_m2) + ' mp', 'verde') + card(N(r.play_square_m2) + ' mp', 'piațete/joacă') + card('−' + r.traffic_reduction_pct + '%', 'trafic pasaj interior') + '</div>' +
        '<div style="font-size:11px;color:#94a3b8">' + r.transit_note + '</div>' +
        '<div style="font-size:10px;color:#64748b;margin-top:8px">Model Barcelona (S. Rueda). Apare automat ca instrument în SIDU (regenerare), capitol în Masterplan + PMUD, și ca scenă în prezentarea cinematică. Rerutarea de perimetru necesită studiu de trafic (UrbanX Flux).</div>';
    };
    mapBtn.onclick = function () { drawReal(+side.value || 400); ov.remove(); };
    // 003: calculator parametric standardizat + before/after + export documente (SIDU/MP/PMUD)
    var calcBtn = el('button', { style: ST.btn + ';margin-top:12px;background:linear-gradient(180deg,#F97316,#ea580c)' }, '📐 Calculator parametric + export documente');
    calcBtn.onclick = function () { ov.remove(); if (G.renderSuperblocDialog) G.renderSuperblocDialog(); };
    body.appendChild(calcBtn);
    ov.appendChild(m); document.body.appendChild(ov);
  }

  G.Superbloc = { compute: compute, geometry: geometry, cinematicData: cinematicData, drawReal: drawReal, drawTransform: drawTransform, drawOverlay: drawOverlay, openPanel: openPanel, chapter: chapter };
  console.log('[Superbloc] model Barcelona — funcție integrată (cinematic+SIDU+MP+PMUD) încărcată');
})(window);
