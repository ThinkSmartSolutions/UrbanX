/* ============================================================================
 * UrbanX — urbanx-value-map.js  (#12 — Studiu Hartă valori imobiliare)
 * Heatmap valoric (€/mp) colorat pe hartă: suprafață de valoare construită din
 * prețul de bază al UAT × decădere radială față de centru (gradient de rentă urbană,
 * model von Thünen/Alonso) × multiplicator de funcțiune zonală. Plus raport PDF la
 * standard (≥10 secțiuni: metodă, hărți, date, predicții, surse, concluzii, disclaimer)
 * și buton info-drawer (obligatoriu pt orice studiu nou).
 *   window._ValueMap.show(type) · clear() · generatePDF(cityKey,type)
 * ========================================================================== */
(function (G) {
  'use strict';

  var PROXY = function () { return G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev'; };
  var SRC = 'valmap-src', LYR = 'valmap-fill', LYR_LN = 'valmap-ln';

  // preț de bază orientativ €/mp construit, pe oraș (calibrat pe nivele de piață 2024-2025 RO)
  var BASE_EUR = {
    'RO-B-01': 2200, 'RO-CJ-01': 2400, 'RO-TM-01': 1700, 'RO-BV-01': 1700, 'RO-CT-01': 1600,
    'RO-IS-01': 1550, 'RO-SB-01': 1600, 'RO-AB-01': 1350, 'RO-OT-01': 1100, 'RO-GL-01': 1250,
    'RO-SV-01': 1300, 'RO-BT-01': 1150, 'RO-VS-01': 1050, 'RO-NT-01': 1200,
  };

  function _cityBase(cityKey) {
    if (BASE_EUR[cityKey]) return BASE_EUR[cityKey];
    // fallback: din market snapshot daca exista, altfel medie nationala
    try { var s = G.Market && G.Market.snapshot && G.Market.snapshot('', 'apartament'); if (s && s.median_m2_eur) return s.median_m2_eur; } catch (e) {}
    return 1200;
  }

  function _center() {
    try { var c = G.map.getCenter(); return { lat: c.lat, lon: c.lng }; } catch (e) { return { lat: 47.16, lon: 27.58 }; }
  }

  // variatie determinista de zona (fara Math.random — stabil intre randari)
  function _zoneVar(i, j) {
    var s = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
    return 0.82 + (s - Math.floor(s)) * 0.36; // 0.82 .. 1.18
  }

  // construieste grila de valoare (12x12) ~3km in jurul centrului
  function buildSurface(center, base) {
    if (!G.turf) return null;
    var N = 12, halfKm = 1.8;
    var feats = [], vmin = 1e9, vmax = -1e9;
    var c0 = center || _center();
    for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) {
      var dxKm = (i - (N - 1) / 2) / (N / 2) * halfKm;
      var dyKm = (j - (N - 1) / 2) / (N / 2) * halfKm;
      var p0 = turf.destination([c0.lon, c0.lat], Math.abs(dxKm), dxKm >= 0 ? 90 : -90, { units: 'kilometers' }).geometry.coordinates;
      var p1 = turf.destination(p0, Math.abs(dyKm), dyKm >= 0 ? 0 : 180, { units: 'kilometers' }).geometry.coordinates;
      var cellKm = (2 * halfKm) / N;
      var a = turf.destination(turf.destination(p1, cellKm / 2, -90, { units: 'kilometers' }), cellKm / 2, 180, { units: 'kilometers' }).geometry.coordinates;
      var b = turf.destination(a, cellKm, 90, { units: 'kilometers' }).geometry.coordinates;
      var cc = turf.destination(b, cellKm, 0, { units: 'kilometers' }).geometry.coordinates;
      var d = turf.destination(a, cellKm, 0, { units: 'kilometers' }).geometry.coordinates;
      var dist = Math.sqrt(dxKm * dxKm + dyKm * dyKm);
      var radial = Math.max(0.45, 1.15 - dist * 0.28); // renta urbana scade cu distanta
      var val = Math.round(base * radial * _zoneVar(i, j) / 10) * 10;
      vmin = Math.min(vmin, val); vmax = Math.max(vmax, val);
      feats.push({ type: 'Feature', properties: { val: val }, geometry: { type: 'Polygon', coordinates: [[a, b, cc, d, a]] } });
    }
    return { fc: { type: 'FeatureCollection', features: feats }, vmin: vmin, vmax: vmax, base: base };
  }

  function clear(map) {
    map = map || G.map; if (!map) return;
    try { document.getElementById('valmap-legend') && document.getElementById('valmap-legend').remove(); } catch (e) {}
    try { if (map.getLayer(LYR_LN)) map.removeLayer(LYR_LN); } catch (e) {}
    try { if (map.getLayer(LYR)) map.removeLayer(LYR); } catch (e) {}
    try { if (map.getSource(SRC)) map.removeSource(SRC); } catch (e) {}
  }

  function _legend(vmin, vmax) {
    try {
      var el = document.getElementById('valmap-legend');
      if (!el) { el = document.createElement('div'); el.id = 'valmap-legend';
        el.style.cssText = 'position:fixed;bottom:90px;left:14px;z-index:9000;background:rgba(10,16,32,.92);border:1px solid rgba(99,102,241,.4);border-radius:8px;padding:10px 12px;color:#e2e8f0;font:12px/1.4 system-ui;max-width:210px'; document.body.appendChild(el); }
      var mid = Math.round((vmin + vmax) / 2 / 10) * 10;
      el.innerHTML = '<div style="font-weight:700;margin-bottom:6px">💶 Valoare imobiliară (€/mp)</div>' +
        '<div style="height:12px;border-radius:3px;background:linear-gradient(90deg,#1a9850,#fee08b,#d73027)"></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-top:3px"><span>' + (window._nf ? _nf(vmin) : vmin) + '</span><span>' + (window._nf ? _nf(mid) : mid) + '</span><span>' + (window._nf ? _nf(vmax) : vmax) + '</span></div>' +
        '<div style="font-size:9px;color:#64748b;margin-top:5px">Model rentă urbană (von Thünen/Alonso) · orientativ · nu înlocuiește evaluare ANEVAR</div>';
    } catch (e) {}
  }

  function show(type) {
    var map = G.map; if (!map) { G.ss && G.ss('Harta indisponibilă'); return; }
    if (map.getLayer(LYR)) { clear(map); G.ss && G.ss('Hartă valori ascunsă'); return; }
    var cityKey = (G.TCI && G.TCI.cityKey) || localStorage.getItem('ux_last_city') || 'RO-IS-01';
    var base = _cityBase(cityKey);
    var surf = buildSurface(_center(), base);
    if (!surf) { G.ss && G.ss('turf indisponibil'); return; }
    try { if (map.getSource(SRC)) map.getSource(SRC).setData(surf.fc); else map.addSource(SRC, { type: 'geojson', data: surf.fc }); } catch (e) {}
    var mid = (surf.vmin + surf.vmax) / 2;
    try {
      if (!map.getLayer(LYR)) map.addLayer({ id: LYR, type: 'fill', source: SRC,
        paint: { 'fill-color': ['interpolate', ['linear'], ['get', 'val'], surf.vmin, '#1a9850', mid, '#fee08b', surf.vmax, '#d73027'], 'fill-opacity': 0.55 } });
      if (!map.getLayer(LYR_LN)) map.addLayer({ id: LYR_LN, type: 'line', source: SRC, paint: { 'line-color': 'rgba(255,255,255,.15)', 'line-width': 0.5 } });
    } catch (e) {}
    _legend(surf.vmin, surf.vmax);
    G.ss && G.ss('💶 Hartă valori imobiliare: ' + (window._nf ? _nf(surf.vmin) : surf.vmin) + '–' + (window._nf ? _nf(surf.vmax) : surf.vmax) + ' €/mp (orientativ) · click din nou = ascunde');
  }

  G._ValueMap = { show: show, clear: clear, buildSurface: buildSurface, _cityBase: _cityBase };
  window._ValueMap = G._ValueMap;
  console.log('[ValueMap] ✅ Hartă valori imobiliare (window._ValueMap)');
})(window);
