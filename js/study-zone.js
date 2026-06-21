/* ============================================================================
 * UrbanX — StudyZone (Zonă de studiu flexibilă).
 * Definește o zonă de studiu (poligon) FĂRĂ număr cadastral, prin 5 metode:
 * desen pe hartă · buffer pe linie (râu/CF) · feature OSM (Nominatim) · adresă+rază
 * · combinare parcele. Rezultatul = un poligon GeoJSON, sursa comună pentru TOATE
 * modulele (LOISIR, UHI, Superbloc, Flux, Intelligence). Ex.: coridorul Bahlui.
 * window.StudyZone: registry · fromX(...) · active()/setActive() · drawOnMap()
 * Surse: Nominatim (OSM) prin proxy · turf (buffer/area). Persistat localStorage.
 * ========================================================================== */
(function (G) {
  'use strict';
  var KEY = 'urbanx_studyzone_v1', AKEY = 'urbanx_studyzone_active';
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function save(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  function proxy() { return (window._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev'); }

  function metrics(poly) {
    var ha = 0, per = 0;
    try { ha = G.turf.area(poly) / 10000; } catch (e) {}
    try { var ln = G.turf.polygonToLine(poly); per = G.turf.length(ln, { units: 'meters' }); } catch (e) {}
    return { area_ha: Math.round(ha * 100) / 100, perimeter_m: Math.round(per) };
  }
  function feat(geom) { return geom.type === 'Feature' ? geom : { type: 'Feature', geometry: geom, properties: {} }; }

  var registry = {
    list: function () { return load(); },
    add: function (z) { var a = load(); z.id = 'z' + Date.now() + '_' + Math.round(Math.random() * 1e4); z.created_at = Date.now(); var mm = metrics(z.geo); z.area_ha = mm.area_ha; z.perimeter_m = mm.perimeter_m; a.push(z); save(a); registry.setActive(z.id); return z; },
    remove: function (id) { save(load().filter(function (z) { return z.id !== id; })); if (registry.activeId() === id) localStorage.removeItem(AKEY); },
    get: function (id) { return load().filter(function (z) { return z.id === id; })[0]; },
    activeId: function () { try { return localStorage.getItem(AKEY); } catch (e) { return null; } },
    setActive: function (id) { try { localStorage.setItem(AKEY, id); } catch (e) {} },
    active: function () { var id = registry.activeId(); return id ? registry.get(id) : null; }
  };

  // ── BUILDERS (toate produc un Feature poligon) ──
  function fromDraw(coords, name) { // coords = [[lng,lat],...]
    if (!coords || coords.length < 3) return null;
    var ring = coords.slice(); if (JSON.stringify(ring[0]) !== JSON.stringify(ring[ring.length - 1])) ring.push(ring[0]);
    return registry.add({ name: name || 'Zonă desenată', type: 'desen_manual', geo: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties: {} } });
  }
  function fromBufferLine(lineCoords, bufferM, name) {
    try { var ln = G.turf.lineString(lineCoords); var poly = G.turf.buffer(ln, bufferM || 100, { units: 'meters' }); return registry.add({ name: name || 'Coridor (buffer ' + (bufferM || 100) + 'm)', type: 'buffer_linie', buffer_distance_m: bufferM || 100, geo: feat(poly) }); } catch (e) { return null; }
  }
  function fromAddressRadius(query, radiusM) {
    var url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ro&q=' + encodeURIComponent(query);
    return fetch(proxy() + '/proxy?url=' + encodeURIComponent(url), { signal: AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined })
      .then(function (r) { return r.json(); }).then(function (j) {
        if (!j || !j.length) throw new Error('adresă negăsită');
        var lon = +j[0].lon, lat = +j[0].lat;
        var circ = G.turf.circle([lon, lat], (radiusM || 300) / 1000, { units: 'kilometers', steps: 48 });
        return registry.add({ name: (query.length > 40 ? query.slice(0, 40) : query) + ' (' + (radiusM || 300) + 'm)', type: 'punct_raza', center: [lon, lat], buffer_distance_m: radiusM || 300, geo: feat(circ) });
      });
  }
  function fromOSM(query, bufferM) {
    var url = 'https://nominatim.openstreetmap.org/search?format=geojson&polygon_geojson=1&limit=1&countrycodes=ro&q=' + encodeURIComponent(query);
    return fetch(proxy() + '/proxy?url=' + encodeURIComponent(url), { signal: AbortSignal.timeout ? AbortSignal.timeout(18000) : undefined })
      .then(function (r) { return r.json(); }).then(function (j) {
        var f = j && j.features && j.features[0]; if (!f) throw new Error('feature OSM negăsit');
        var g = f.geometry, poly;
        if (/Polygon/.test(g.type)) poly = feat(g);
        else if (/LineString/.test(g.type)) { var ln = g.type === 'MultiLineString' ? G.turf.multiLineString(g.coordinates) : G.turf.lineString(g.coordinates); poly = G.turf.buffer(ln, bufferM || 100, { units: 'meters' }); }
        else { poly = G.turf.circle([g.coordinates[0], g.coordinates[1]], (bufferM || 150) / 1000, { units: 'kilometers', steps: 48 }); }
        return registry.add({ name: (f.properties && f.properties.display_name ? f.properties.display_name.split(',')[0] : query) + (bufferM ? (' · buffer ' + bufferM + 'm') : ''), type: 'osm_feature', buffer_distance_m: bufferM || 0, osm: (f.properties && f.properties.osm_type) || '', geo: poly });
      });
  }
  function fromParcel(bufferM) {
    try { var S = G.S; var ap = S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; if (!ap || !ap.geo) return null;
      var g = ap.geo; if (bufferM) g = G.turf.buffer(g, bufferM, { units: 'meters' });
      return registry.add({ name: 'Parcelă CF ' + (ap.nrcad || '—') + (bufferM ? (' +' + bufferM + 'm') : ''), type: 'parcele_cadastrale', parcel_ids: [ap.nrcad], geo: feat(g) }); } catch (e) { return null; }
  }

  // ── desen pe hartă (mod simplu click-to-vertex) ──
  var SRC = 'studyzone-src', LY = 'studyzone-fill', LN = 'studyzone-line', DRAW = 'studyzone-draw';
  var drawPts = [], drawing = false, clickH = null;
  function drawOnMap(zone) {
    var map = G.map; if (!map || !zone || !zone.geo) return;
    clearMap();
    map.addSource(SRC, { type: 'geojson', data: zone.geo });
    map.addLayer({ id: LY, type: 'fill', source: SRC, paint: { 'fill-color': '#22d3ee', 'fill-opacity': 0.15 } });
    map.addLayer({ id: LN, type: 'line', source: SRC, paint: { 'line-color': '#22d3ee', 'line-width': 2.5 } });
    try { map.fitBounds(G.turf.bbox(zone.geo), { padding: 60, duration: 800 }); } catch (e) {}
  }
  function clearMap() { var map = G.map; if (!map) return; [LN, LY, DRAW].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} }); [SRC, DRAW + '-src'].forEach(function (id) { try { if (map.getSource(id)) map.removeSource(id); } catch (e) {} }); }
  function startDraw(onDone) {
    var map = G.map; if (!map) { G.ss && ss('Harta nu e pregătită'); return; }
    drawPts = []; drawing = true;
    if (!map.getSource(DRAW + '-src')) map.addSource(DRAW + '-src', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    if (!map.getLayer(DRAW)) map.addLayer({ id: DRAW, type: 'line', source: DRAW + '-src', paint: { 'line-color': '#fbbf24', 'line-width': 2, 'line-dasharray': [2, 1] } });
    clickH = function (e) { drawPts.push([e.lngLat.lng, e.lngLat.lat]); var s = map.getSource(DRAW + '-src'); if (s && drawPts.length >= 2) s.setData({ type: 'Feature', geometry: { type: 'LineString', coordinates: drawPts }, properties: {} }); G.ss && ss('Punct ' + drawPts.length + ' · dublu-click/Finalizează pt închidere'); };
    map.on('click', clickH);
    map.getCanvas().style.cursor = 'crosshair';
    G.StudyZone._finishDraw = function (name) { map.off('click', clickH); map.getCanvas().style.cursor = ''; drawing = false; try { if (map.getLayer(DRAW)) map.removeLayer(DRAW); if (map.getSource(DRAW + '-src')) map.removeSource(DRAW + '-src'); } catch (e) {} var z = fromDraw(drawPts, name); if (z) drawOnMap(z); if (onDone) onDone(z); return z; };
  }

  G.StudyZone = {
    registry: registry, fromDraw: fromDraw, fromBufferLine: fromBufferLine, fromAddressRadius: fromAddressRadius,
    fromOSM: fromOSM, fromParcel: fromParcel, drawOnMap: drawOnMap, clearMap: clearMap, startDraw: startDraw,
    active: function () { return registry.active(); }, metrics: metrics
  };
  console.log('[StudyZone] zonă de studiu flexibilă încărcată (window.StudyZone)');
})(window);
