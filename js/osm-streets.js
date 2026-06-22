/* ============================================================================
 * UrbanX — OSM Streets (fetcher comun, real, prin proxy Overpass).
 * Aduce rețeaua REALĂ de străzi dintr-o rază + le clasifică (arteră vs locală).
 * Folosit de: Superbloc (interior pietonal vs perimetru tranzit pe străzi reale)
 * și Flux (heatmap LOS pe rețeaua reală). Cache pe rază+centru.
 * window.OSMStreets.fetch(center[lon,lat], radiusM) → Promise<{ways:[...]}>
 *    way = {coords[[lon,lat]], hw, klass:'arterial'|'local'|'other', len_m, name}
 * ========================================================================== */
(function (G) {
  'use strict';
  var ARTERIAL = /^(motorway|trunk|primary|secondary|tertiary)/;
  var LOCAL = /^(residential|living_street|unclassified|service|pedestrian)/;
  // capacitate orientativă veh/oră/sens pe tip (pt LOS în Flux)
  var CAP = { motorway: 2000, trunk: 1600, primary: 1200, secondary: 900, tertiary: 700, residential: 400, living_street: 200, unclassified: 400, service: 200 };

  var _cache = {};
  function fetchStreets(center, radiusM) {
    radiusM = radiusM || 300;
    if (!center || center.length < 2) return Promise.reject(new Error('centru invalid'));
    if (!G.turf) return Promise.reject(new Error('turf indisponibil'));
    var lat = +center[1], lon = +center[0];
    var key = lat.toFixed(4) + ',' + lon.toFixed(4) + ',' + radiusM;
    if (_cache[key]) return Promise.resolve(_cache[key]);
    var proxy = G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
    var q = '[out:json][timeout:25];(way(around:' + radiusM + ',' + lat + ',' + lon + ')[highway];);out geom;';
    var url = proxy + '/osm?q=' + encodeURIComponent(q);
    var opt = (typeof AbortSignal !== 'undefined' && AbortSignal.timeout) ? { signal: AbortSignal.timeout(24000) } : {};
    return fetch(url, opt)
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (j) {
        var ways = [];
        (j.elements || []).forEach(function (e) {
          if (!e.geometry || e.geometry.length < 2) return;
          var hw = (e.tags && e.tags.highway) || 'unclassified';
          if (hw === 'footway' || hw === 'cycleway' || hw === 'path' || hw === 'steps' || hw === 'track') return;
          var coords = e.geometry.map(function (p) { return [p.lon, p.lat]; });
          var len = 0; try { len = G.turf.length(G.turf.lineString(coords), { units: 'meters' }); } catch (er) {}
          ways.push({ coords: coords, hw: hw, klass: ARTERIAL.test(hw) ? 'arterial' : LOCAL.test(hw) ? 'local' : 'other', len_m: Math.round(len), cap: CAP[hw] || 500, name: (e.tags && e.tags.name) || '' });
        });
        var res = { ways: ways, center: center, radius: radiusM,
          arterial_m: ways.filter(function (w) { return w.klass === 'arterial'; }).reduce(function (s, w) { return s + w.len_m; }, 0),
          local_m: ways.filter(function (w) { return w.klass === 'local'; }).reduce(function (s, w) { return s + w.len_m; }, 0) };
        _cache[key] = res; return res;
      });
  }

  G.OSMStreets = { fetch: fetchStreets, ARTERIAL: ARTERIAL, LOCAL: LOCAL, CAP: CAP };
  console.log('[OSMStreets] fetcher rețea reală încărcat (window.OSMStreets.fetch)');
})(window);
