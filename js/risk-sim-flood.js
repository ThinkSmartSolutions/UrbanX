/* ============================================================================
 * UrbanX — risk-sim-flood.js — Predicție inundații urbane la precipitații extreme
 * pentru ORICE UAT. Model fizic transparent, fără invenții:
 *   - Scurgere: metoda rațională Q = C·i·A (SR 1846/2007, STAS 9470)
 *   - Volum scurs: V = (P·C/1000)·A_bazin (minus capacitate canalizare)
 *   - Extindere inundație: băltire prin BILANȚ DE VOLUM (bathtub) pe relief real
 *     (Mapbox Terrain-RGB via window._getElevGrid) — ridică nivelul L peste
 *     punctul minim până când volumul stocat = volumul scurs.
 * MAP_VAR = window.map. Pattern overlay identic cu risk-sim-seismic.js.
 * ========================================================================== */
(function (G) {
  'use strict';

  // Presetări ploaie (depth mm pe eveniment ~1–3h) cu perioadă de revenire
  // orientativă pentru câmpia română (STAS 9470-73 — ploi maxime).
  var RAIN_PRESETS = [
    { p: 25, rp: '~2 ani', lbl: 'Ploaie intensă' },
    { p: 45, rp: '~10 ani', lbl: 'Torențială' },
    { p: 70, rp: '~50 ani', lbl: 'Extremă' },
    { p: 100, rp: '~100 ani', lbl: 'Catastrofală' }
  ];

  var _st = { P: 45, C: 0.70, drain: 10, dur: 1, R: 1500, N: 36 };

  function _curCenter() { var m = G.map; if (!m) return null; var c = m.getCenter(); return { lat: c.lat, lon: c.lng }; }

  function depthColor(d) {
    return d < 0.15 ? '#bae6fd' : d < 0.3 ? '#7dd3fc' : d < 0.6 ? '#38bdf8' :
      d < 1.0 ? '#0ea5e9' : d < 1.8 ? '#0369a1' : '#1e3a8a';
  }

  // ── MODEL: bilanț de volum pe grila de elevații ──
  function computeFlood(grid) {
    var P = _st.P, C = _st.C;
    var R_eff_m = P * C / 1000;                          // scurgere efectivă (m)
    var sideM = _st.R * 2;
    var A_catch = sideM * sideM;                         // m²
    var cellM = sideM / _st.N;
    var cellArea = cellM * cellM;
    // capacitate canalizare evacuată în timpul evenimentului
    var drained_m = Math.min(R_eff_m, (_st.drain * _st.dur) / 1000);
    var R_net_m = Math.max(0, R_eff_m - drained_m);
    var V = R_net_m * A_catch;                            // m³ de scurgere reziduală
    // intensitate medie (mm/h) și Q de vârf rațional
    var i_mmh = P / _st.dur;
    var i_ms = i_mmh / 3.6e6;
    var Q = C * i_ms * A_catch;                           // m³/s

    // celule plate (elev) într-un vector cu coordonate
    var cells = [];
    var g = grid.grid, lat = grid.latGrid, lon = grid.lonGrid;
    for (var y = 0; y < g.length; y++)
      for (var x = 0; x < g[y].length; x++)
        cells.push({ e: g[y][x], lat: lat[y][x], lon: lon[y][x] });
    cells.sort(function (a, b) { return a.e - b.e; });
    var eMin = cells[0].e;

    // bathtub: ridicăm L peste eMin până când Σ(L−e)·cellArea = V
    var L = eMin, stored = 0, step = 0.05, guard = 0;
    while (stored < V && guard < 2000) {
      L += step; guard++;
      stored = 0;
      for (var k = 0; k < cells.length; k++) {
        if (cells[k].e >= L) break;                       // sortat crescător
        stored += (L - cells[k].e) * cellArea;
      }
    }
    // celule inundate + adâncime
    var flooded = [];
    var maxD = 0, area = 0;
    for (var j = 0; j < cells.length; j++) {
      if (cells[j].e >= L) break;
      var d = L - cells[j].e;
      if (d < 0.05) continue;
      flooded.push({ lat: cells[j].lat, lon: cells[j].lon, d: d });
      area += cellArea; if (d > maxD) maxD = d;
    }
    return {
      P: P, C: C, i_mmh: i_mmh, Q: Q, V: V, R_eff_mm: R_eff_m * 1000, drained_mm: drained_m * 1000,
      level: L, eMin: eMin, maxD: maxD, area_ha: area / 10000, A_catch_ha: A_catch / 10000,
      pct: (area / A_catch) * 100, flooded: flooded, cellM: cellM, source: grid.source
    };
  }

  // ── HARTĂ ──
  function drawOnMap(map, res, centerLat) {
    if (!map) return;
    // Celule la latura DEM (NU extinse — extinderea le unea in pete plate care
    // acopereau cladirile, nelizibil la zoom). Opacitate redusa => se vad cladirile
    // SUB apa (ca pe hartile de hazard reale), iar culoarea da adancimea.
    var halfM = (res.cellM / 2) * 0.98;
    var dLat = halfM / 111320, dLon = halfM / (111320 * Math.cos(centerLat * Math.PI / 180));
    var feats = res.flooded.map(function (c) {
      return { type: 'Feature', properties: { d: +c.d.toFixed(2) }, geometry: { type: 'Polygon', coordinates: [[
        [c.lon - dLon, c.lat - dLat], [c.lon + dLon, c.lat - dLat],
        [c.lon + dLon, c.lat + dLat], [c.lon - dLon, c.lat + dLat], [c.lon - dLon, c.lat - dLat]]] } };
    });
    var fc = { type: 'FeatureCollection', features: feats };
    try { if (map.getSource('flood-src')) map.getSource('flood-src').setData(fc); else map.addSource('flood-src', { type: 'geojson', data: fc }); } catch (e) {}
    try {
      if (!map.getLayer('flood-fill')) map.addLayer({ id: 'flood-fill', type: 'fill', source: 'flood-src',
        paint: {
          'fill-color': ['interpolate', ['linear'], ['get', 'd'], 0.1, '#7dd3fc', 0.3, '#38bdf8', 0.6, '#0ea5e9', 1.0, '#0284c7', 1.8, '#1d4ed8', 2.5, '#1e3a8a'],
          // mai transparent la adancime mica (se vede ce e dedesubt), mai opac in zone adanci
          'fill-opacity': ['interpolate', ['linear'], ['get', 'd'], 0.1, 0.34, 0.6, 0.5, 1.5, 0.62],
          'fill-outline-color': 'rgba(125,211,252,0.55)'
        } });
    } catch (e) {}
    // legenda de adancime (mica, jos-stanga) — ca sa fie analizabil
    try {
      var lg = document.getElementById('flood-depth-legend');
      if (!lg) { lg = document.createElement('div'); lg.id = 'flood-depth-legend'; document.body.appendChild(lg); }
      lg.style.cssText = 'position:fixed;left:14px;bottom:18px;z-index:9200;background:rgba(8,14,30,.92);border:1px solid rgba(14,165,233,.4);border-radius:9px;padding:9px 12px;font-family:system-ui,sans-serif;color:#e6edf7;font-size:11px;box-shadow:0 8px 28px rgba(0,0,0,.5)';
      lg.innerHTML = '<div style="font-weight:700;margin-bottom:6px;color:#7dd3fc">🌊 Adâncime băltire</div>' +
        '<div style="display:flex;align-items:center;gap:6px;margin:2px 0"><span style="width:16px;height:10px;background:#7dd3fc;display:inline-block;border-radius:2px"></span> &lt; 0,3 m</div>' +
        '<div style="display:flex;align-items:center;gap:6px;margin:2px 0"><span style="width:16px;height:10px;background:#0ea5e9;display:inline-block;border-radius:2px"></span> 0,3–1 m</div>' +
        '<div style="display:flex;align-items:center;gap:6px;margin:2px 0"><span style="width:16px;height:10px;background:#1d4ed8;display:inline-block;border-radius:2px"></span> 1–2 m</div>' +
        '<div style="display:flex;align-items:center;gap:6px;margin:2px 0"><span style="width:16px;height:10px;background:#1e3a8a;display:inline-block;border-radius:2px"></span> &gt; 2 m</div>' +
        '<div style="font-size:9px;color:#7b88a0;margin-top:5px;max-width:150px;line-height:1.35">Screening DEM ' + Math.round(res.cellM) + ' m/celulă · orientativ</div>';
    } catch (e) {}
  }
  function clearMap(map) {
    try { var lg = document.getElementById('flood-depth-legend'); if (lg) lg.remove(); } catch (e) {}
    if (!map) return;
    try { if (map.getLayer('flood-fill')) map.removeLayer('flood-fill'); } catch (e) {}
    try { if (map.getSource('flood-src')) map.removeSource('flood-src'); } catch (e) {}
  }

  // ── DIALOG ──
  var _ov = null;
  function openPanel() {
    closePanel();
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,16,.7);z-index:9100;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
    ov.onclick = function (e) { if (e.target === ov) closePanel(); };
    var box = document.createElement('div');
    box.id = 'flood-dialog';
    box.style.cssText = 'position:relative;background:#0b1424;color:#e6edf7;width:min(560px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(14,165,233,.4);border-radius:14px;font-family:system-ui,sans-serif;padding:18px 20px';
    ov.appendChild(box); document.body.appendChild(ov); _ov = ov;
    var c = _curCenter();
    var loc = c ? (c.lat.toFixed(3) + '°N, ' + c.lon.toFixed(3) + '°E') : '— deschideți pe un UAT —';
    box.innerHTML =
      '<button onclick="RiskFlood.close();if(window.SimLab&&SimLab.openDashboard)SimLab.openDashboard()" title="Înapoi la SimLab" style="position:absolute;top:12px;right:44px;background:rgba(212,175,55,.14);border:1px solid rgba(212,175,55,.35);color:#e9d08a;font-size:10px;font-weight:700;border-radius:7px;padding:4px 8px;cursor:pointer">← SimLab</button>' +
      '<div style="display:flex;align-items:center;gap:8px"><span style="font-size:22px">🌊</span>' +
      '<h3 style="margin:0;font-size:17px;font-weight:700">Predicție inundație urbană (pluvială)</h3></div>' +
      '<p style="margin:4px 0 12px;font-size:12px;opacity:0.6">UAT curent: ' + loc + ' · băltire pe relief real (Terrain-RGB) prin bilanț de volum</p>' +
      '<div style="font-size:11px;font-weight:700;color:#0ea5e9;letter-spacing:1px;margin-bottom:8px">EVENIMENT DE PLOAIE</div>' +
      '<div id="flood-presets" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">' +
      RAIN_PRESETS.map(function (r, i) { return '<button onclick="RiskFlood._preset(' + i + ')" id="flood-pr-' + i + '" style="flex:1;min-width:110px;padding:8px 6px;border-radius:8px;border:1px solid ' + (_st.P === r.p ? '#0ea5e9' : 'rgba(255,255,255,.12)') + ';background:' + (_st.P === r.p ? 'rgba(14,165,233,.15)' : 'rgba(255,255,255,.04)') + ';color:inherit;cursor:pointer;font-size:11px"><b>' + r.p + ' mm</b><br><span style="opacity:.6;font-size:10px">' + r.lbl + ' · ' + r.rp + '</span></button>'; }).join('') + '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">' +
      _inp('Impermeabilizare (coef. C)', 'C', _st.C, '0–1; urban dens ≈0,7–0,9') +
      _inp('Capac. canalizare (mm/h)', 'drain', _st.drain, 'evacuare rețea') +
      '</div>' +
      '<button class="uxc-btn uxc-btn--primary" style="width:100%;background:#0284c7;border:0" onclick="RiskFlood.run()">▶ Simulează inundația pe hartă</button>' +
      '<div id="flood-results" style="display:none;margin-top:16px"></div>' +
      '<p style="font-size:10px;opacity:0.4;margin-top:14px;line-height:1.5">Model: metoda rațională Q=C·i·A (SR 1846/2007) + băltire prin bilanț de volum pe DEM Mapbox. ⚠ Screening rapid orientativ — NU înlocuiește harta de hazard ANAR (PGRA) sau studiul hidrotehnic. Nu modelează canalizarea reală, viiturile fluviale sau infiltrația în detaliu.</p>';
  }
  function _inp(label, key, val, hint) {
    return '<div><label style="font-size:11px;opacity:0.65;display:block;margin-bottom:4px">' + label + '</label>' +
      '<input type="number" step="0.05" value="' + val + '" oninput="RiskFlood._set(\'' + key + '\',this.value)" style="width:100%;padding:8px 12px;border-radius:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:inherit;font-size:14px;box-sizing:border-box">' +
      '<div style="font-size:9.5px;opacity:0.45;margin-top:2px">' + hint + '</div></div>';
  }
  function _preset(i) { _st.P = RAIN_PRESETS[i].p; RAIN_PRESETS.forEach(function (r, k) { var b = document.getElementById('flood-pr-' + k); if (b) { var on = k === i; b.style.borderColor = on ? '#0ea5e9' : 'rgba(255,255,255,.12)'; b.style.background = on ? 'rgba(14,165,233,.15)' : 'rgba(255,255,255,.04)'; } }); }
  function _set(k, v) { _st[k] = parseFloat(v) || 0; }

  function run() {
    var c = _curCenter(); if (!c) { alert('Centrați harta pe un UAT.'); return; }
    var rd = document.getElementById('flood-results');
    if (rd) { rd.style.display = 'block'; rd.innerHTML = '<div style="text-align:center;opacity:.6;font-size:12px;padding:10px">⏳ Citesc relieful (Terrain-RGB) și calculez băltirea…</div>'; }
    if (typeof G._getElevGrid !== 'function') { if (rd) rd.innerHTML = '<div style="color:#f59e0b;font-size:12px">Modulul de relief nu este disponibil.</div>'; return; }
    G._getElevGrid(c.lat, c.lon, _st.R, _st.N).then(function (grid) {
      var res = computeFlood(grid);
      drawOnMap(G.map, res, c.lat);
      var html =
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
        _kpi('Suprafață inundată', res.area_ha.toFixed(1) + ' ha', '#0ea5e9') +
        _kpi('% din zonă', res.pct.toFixed(1) + '%', '#38bdf8') +
        _kpi('Adâncime max.', res.maxD.toFixed(2) + ' m', '#0369a1') +
        _kpi('Debit vârf Q', res.Q.toFixed(1) + ' m³/s', '#7dd3fc') +
        '</div>' +
        '<div style="background:rgba(14,165,233,0.1);border-left:3px solid #0ea5e9;border-radius:6px;padding:10px 12px;margin-top:10px;font-size:12px;line-height:1.55">' +
        'La <b>' + res.P + ' mm</b> ploaie, cu impermeabilizare C=' + res.C + ', se scurg <b>' + Math.round(res.R_eff_mm) + ' mm</b> (din care rețeaua evacuează ~' + Math.round(res.drained_mm) + ' mm). Volumul rezidual de <b>' + Math.round(res.V).toLocaleString('ro') + ' m³</b> se acumulează în zonele joase, atingând cota ' + res.level.toFixed(1) + ' m (peste minimul ' + res.eMin.toFixed(1) + ' m).</div>' +
        '<div style="font-size:10.5px;opacity:0.55;margin-top:10px;line-height:1.6"><b>Metodă:</b> Q = C·i·A (i=' + res.i_mmh.toFixed(0) + ' mm/h, A=' + res.A_catch_ha.toFixed(0) + ' ha) · V=(P·C/1000−evacuat)·A · băltire bathtub pe ' + (res.cellM | 0) + ' m/celulă. Sursă relief: ' + res.source + '.</div>';
      if (rd) rd.innerHTML = html;
      _dock();
    }).catch(function (e) { if (rd) rd.innerHTML = '<div style="color:#f59e0b;font-size:12px">Eroare citire relief: ' + e.message + '</div>'; });
  }
  // dupa simulare: dialog non-blocant + mutat in colt ca sa vezi inundatia desenata pe harta
  function _dock() {
    try {
      if (!_ov) return;
      _ov.style.background = 'transparent'; _ov.style.pointerEvents = 'none';
      _ov.style.alignItems = 'flex-start'; _ov.style.justifyContent = 'flex-start';
      var box = document.getElementById('flood-dialog');
      if (box) { box.style.pointerEvents = 'auto'; box.style.width = 'min(380px,94vw)'; box.style.maxHeight = '86vh'; box.style.margin = '58px 0 0 12px'; box.style.boxShadow = '0 12px 44px rgba(0,0,0,.7)'; }
    } catch (e) {}
  }
  function _kpi(label, val, col) {
    return '<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:10px 12px;text-align:center">' +
      '<div style="font-size:19px;font-weight:800;color:' + col + '">' + val + '</div>' +
      '<div style="font-size:10.5px;opacity:0.6;margin-top:2px">' + label + '</div></div>';
  }
  function closePanel() { if (_ov) { try { _ov.remove(); } catch (e) {} _ov = null; } try { clearMap(G.map); } catch (e) {} }

  G.RiskFlood = { openPanel: openPanel, open: openPanel, run: run, close: closePanel, clear: function () { clearMap(G.map); }, _preset: _preset, _set: _set, compute: computeFlood };
})(window);
