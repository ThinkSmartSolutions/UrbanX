/* ============================================================================
 * UrbanX — infra-map.js (#9)
 * Click pe un card de infrastructură (Școli / Spitale / Stații TP / Universități /
 * Parcuri / Supermarketuri) -> aduce POI-urile REALE din OSM (prin proxy /osm?q=) si le
 * deseneaza pe harta ca markere, cu zoom pe ele. Re-click -> ascunde.
 * Folosit din dashboard-ul UAT si (optional) din docuri.
 * ========================================================================== */
(function (G) {
  'use strict';

  var PROXY = function () { return G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev'; };

  // cheie card -> { f: [filtre Overpass — union], color, label }
  var TYPES = {
    scoli:          { f: ['[amenity=school]'],                 c: '#f59e0b', l: 'Școli' },
    spitale:        { f: ['[amenity~"^(hospital|clinic)$"]'],  c: '#ef4444', l: 'Spitale/Clinici' },
    transport:      { f: ['[highway=bus_stop]', '[public_transport=platform]', '[public_transport=stop_position]', '[railway~"^(tram_stop|station|halt)$"]', '[amenity=bus_station]'], c: '#60a5fa', l: 'Stații transport' },
    universitati:   { f: ['[amenity~"^(university|college)$"]'], c: '#a78bfa', l: 'Universități' },
    parcuri:        { f: ['[leisure=park]'],                   c: '#22c55e', l: 'Parcuri' },
    supermarketuri: { f: ['[shop=supermarket]'],               c: '#06b6d4', l: 'Supermarketuri' },
    monumente:      { f: ['[historic]', '[tourism=attraction]', '[heritage]'], c: '#eab308', l: 'Monumente & patrimoniu' },
    turism:         { f: ['[amenity=theatre]', '[amenity=cinema]', '[tourism=museum]', '[amenity=arts_centre]', '[tourism~"^(hotel|gallery|viewpoint|artwork)$"]', '[amenity~"^(restaurant|cafe)$"]'], c: '#f472b6', l: 'Turism & agrement' },
    muzee:          { f: ['[tourism=museum]', '[tourism=gallery]'], c: '#c084fc', l: 'Muzee & galerii' },
    caini:          { f: ['[leisure=dog_park]'], c: '#84cc16', l: 'Parcuri pentru câini' },
    ciclism:        { f: ['[highway=cycleway]', '[bicycle=designated]', '[cycleway~"^(lane|track)$"]'], c: '#14b8a6', l: 'Piste de biciclete', geom: 'line' },
  };

  var _active = null; // cheia tipului afisat curent

  function _center() {
    try {
      var m = G.map; if (m && m.getCenter) { var c = m.getCenter(); return { lat: c.lat, lon: c.lng }; }
    } catch (e) {}
    return null;
  }

  function _ids(key) { return { src: 'infra-' + key, pt: 'infra-' + key + '-pt', lb: 'infra-' + key + '-lb' }; }

  function _clear(map, key) {
    var id = _ids(key);
    try { if (map.getLayer(id.lb)) map.removeLayer(id.lb); } catch (e) {}
    try { if (map.getLayer(id.pt)) map.removeLayer(id.pt); } catch (e) {}
    try { if (map.getSource(id.src)) map.removeSource(id.src); } catch (e) {}
  }

  function clearAll(map) {
    map = map || G.map; if (!map) return;
    Object.keys(TYPES).forEach(function (k) { _clear(map, k); });
    _active = null;
  }

  async function show(key) {
    var map = G.map; var T = TYPES[key];
    if (!map || !T) return;
    // re-click pe acelasi tip -> ascunde
    if (_active === key) { clearAll(map); G.ss && G.ss('Strat infrastructură ascuns'); return; }
    clearAll(map);
    var c = _center(); if (!c) { G.ss && G.ss('Harta indisponibilă'); return; }
    G.ss && G.ss('🔎 Aduc ' + T.l + ' din OSM…');
    var r = 2500; // raza ~2km (ca eticheta cardului)
    var isLine = T.geom === 'line';
    var filters = Array.isArray(T.f) ? T.f : [T.f];
    var parts = filters.map(function (fl) { return (isLine ? 'way' : 'nwr') + '(around:' + r + ',' + c.lat + ',' + c.lon + ')' + fl + ';'; }).join('');
    var q = '[out:json][timeout:25];(' + parts + ');out ' + (isLine ? 'geom' : 'center') + ' tags;';
    var data = null;
    try {
      var resp = await fetch(PROXY() + '/osm?q=' + encodeURIComponent(q), { signal: AbortSignal.timeout(30000) });
      if (resp.ok) { var j = await resp.json(); if (j && j.elements) data = j; }
    } catch (e) {}
    if (!data || !data.elements.length) { G.ss && G.ss('⚠ Nu am găsit ' + T.l + ' în zonă (OSM).'); return; }
    var feats = [];
    data.elements.forEach(function (el) {
      if (isLine) {
        if (el.geometry && el.geometry.length > 1) {
          feats.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: el.geometry.map(function (p) { return [p.lon, p.lat]; }) },
            properties: { name: (el.tags && (el.tags.name || el.tags['name:ro'])) || T.l } });
        }
        return;
      }
      var lat = el.lat != null ? el.lat : (el.center && el.center.lat);
      var lon = el.lon != null ? el.lon : (el.center && el.center.lon);
      if (lat == null || lon == null) return;
      feats.push({ type: 'Feature', geometry: { type: 'Point', coordinates: [lon, lat] },
        properties: { name: (el.tags && (el.tags.name || el.tags['name:ro'])) || T.l } });
    });
    if (!feats.length) { G.ss && G.ss('⚠ Fără coordonate pentru ' + T.l); return; }
    var fc = { type: 'FeatureCollection', features: feats };
    var id = _ids(key);
    try { if (map.getSource(id.src)) map.getSource(id.src).setData(fc); else map.addSource(id.src, { type: 'geojson', data: fc }); } catch (e) {}
    try {
      if (!map.getLayer(id.pt)) {
        if (isLine) map.addLayer({ id: id.pt, type: 'line', source: id.src,
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: { 'line-color': T.c, 'line-width': ['interpolate', ['linear'], ['zoom'], 11, 2, 16, 5], 'line-opacity': 0.9 } });
        else map.addLayer({ id: id.pt, type: 'circle', source: id.src,
          paint: { 'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 4, 16, 9], 'circle-color': T.c,
            'circle-stroke-color': '#0a0e1f', 'circle-stroke-width': 1.5, 'circle-opacity': 0.92 } });
      }
    } catch (e) {}
    try {
      if (!map.getLayer(id.lb)) map.addLayer({ id: id.lb, type: 'symbol', source: id.src,
        layout: { 'text-field': ['get', 'name'], 'text-size': 10, 'text-offset': [0, 1.1], 'text-anchor': 'top', 'text-allow-overlap': false },
        paint: { 'text-color': T.c, 'text-halo-color': 'rgba(4,10,24,0.95)', 'text-halo-width': 1.5 }, minzoom: 13 });
    } catch (e) {}
    _active = key;
    // zoom pe ansamblul POI-urilor
    try {
      if (G.turf && feats.length > 1) {
        var bb = turf.bbox(fc);
        map.fitBounds([[bb[0], bb[1]], [bb[2], bb[3]]], { padding: 80, maxZoom: 15, duration: 900 });
      }
    } catch (e) {}
    G.ss && G.ss('✅ ' + feats.length + ' ' + T.l + ' pe hartă (OSM, raza 2km) · click din nou = ascunde');
  }

  G._InfraMap = { show: show, clearAll: clearAll, TYPES: TYPES };
  window._InfraMap = G._InfraMap;
  console.log('[InfraMap] ✅ click card infrastructură -> hartă (window._InfraMap)');
})(window);
