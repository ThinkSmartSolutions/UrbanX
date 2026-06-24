/* ============================================================================
 * UrbanX — risk-sim-shelters.js — Inventar adăposturi ALA (protecție civilă)
 * window.RiskShelters. ONEST: registrul oficial ALA este deținut de ISU /
 * protecția civilă locală și NU e public. Aici producem un INVENTAR DE
 * CANDIDAȚI prin aplicarea criteriilor legale (NP-073/2002, Legea 481/2004)
 * peste clădirile din OpenStreetMap:
 *   - blocuri (apartments/residential) cu regim ridicat → ALA obligatoriu la subsol
 *   - instituții publice (școli, spitale, universități) → puncte de adăpostire
 * Fiecare marcat „de verificat oficial". Capacitate estimată: amprenta×0,4 / 2,5
 * m²/pers (NP-073). MAP_VAR = window.map.
 * ========================================================================== */
(function (G) {
  'use strict';

  var STYLE = {
    bloc: { col: '#ef4444', lbl: 'Bloc cu ALA obligatoriu (subsol)' },
    public: { col: '#3b82f6', lbl: 'Instituție publică — punct de adăpostire' }
  };

  function _curCenter() { var m = G.map; if (!m) return null; var c = m.getCenter(); return { lat: c.lat, lon: c.lng }; }
  function _polyArea(coords) { try { return G.turf ? G.turf.area({ type: 'Polygon', coordinates: [coords] }) : 0; } catch (e) { return 0; } }
  function _centroid(coords) {
    var x = 0, y = 0, n = coords.length; for (var i = 0; i < n; i++) { x += coords[i][0]; y += coords[i][1]; } return [x / n, y / n];
  }

  function classify(t) {
    if (!t) return null;
    if (/apartments|residential|dormitory/.test(t.building || '')) {
      var lv = parseInt(t['building:levels'] || t.levels || '0', 10);
      if (lv >= 4 || /apartments|dormitory/.test(t.building)) return 'bloc';   // P+3 sau mai mult ⇒ probabil subsol+ALA
      return null;
    }
    if (/school|hospital|university|college|community_centre/.test(t.amenity || '')) return 'public';
    if (/school|hospital|university/.test(t.building || '')) return 'public';
    return null;
  }

  function fetchAndDraw(map, center, radiusM) {
    radiusM = radiusM || 1200;
    var proxy = G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
    var q = '[out:json][timeout:25];(' +
      'way(around:' + radiusM + ',' + center.lat + ',' + center.lon + ')[building~"apartments|residential|dormitory"];' +
      'way(around:' + radiusM + ',' + center.lat + ',' + center.lon + ')[amenity~"school|hospital|university|college|community_centre"];' +
      ');out geom;';
    return fetch(proxy + '/osm?q=' + encodeURIComponent(q))
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (j) {
        var feats = [], totCap = 0, nBloc = 0, nPub = 0;
        (j.elements || []).forEach(function (e) {
          if (!e.geometry || e.geometry.length < 3) return;
          var cat = classify(e.tags || {}); if (!cat) return;
          var coords = e.geometry.map(function (p) { return [p.lon, p.lat]; });
          if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) coords.push(coords[0]);
          var area = _polyArea(coords);
          if (area < 120) return;                         // ignoră amprente mici
          var cap = Math.round(area * 0.4 / 2.5);          // 40% subsol amenajabil, 2,5 m²/pers (NP-073)
          var c = _centroid(coords);
          var name = (e.tags && (e.tags.name || (cat === 'public' ? 'Instituție publică' : 'Bloc locuințe'))) || '';
          feats.push({ type: 'Feature', properties: { cat: cat, cap: cap, name: name, area: Math.round(area) }, geometry: { type: 'Point', coordinates: c } });
          totCap += cap; if (cat === 'bloc') nBloc++; else nPub++;
        });
        var fc = { type: 'FeatureCollection', features: feats };
        try { if (map.getSource('ala-src')) map.getSource('ala-src').setData(fc); else map.addSource('ala-src', { type: 'geojson', data: fc }); } catch (e) {}
        try {
          if (!map.getLayer('ala-pts')) map.addLayer({ id: 'ala-pts', type: 'circle', source: 'ala-src',
            paint: { 'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 4, 16, 9], 'circle-color': ['match', ['get', 'cat'], 'bloc', STYLE.bloc.col, 'public', STYLE.public.col, '#999'], 'circle-opacity': 0.85, 'circle-stroke-color': '#fff', 'circle-stroke-width': 1 } });
          if (!map.getLayer('ala-lbl')) map.addLayer({ id: 'ala-lbl', type: 'symbol', source: 'ala-src', minzoom: 14,
            layout: { 'text-field': ['concat', '🛡 ', ['to-string', ['get', 'cap']], ' pers'], 'text-size': 10, 'text-offset': [0, 1.2], 'text-anchor': 'top' },
            paint: { 'text-color': '#e6edf7', 'text-halo-color': '#0b1424', 'text-halo-width': 1.4 } });
        } catch (e) {}
        _popup(map);
        _legend(nBloc, nPub, totCap);
        return { n: feats.length, nBloc: nBloc, nPub: nPub, totCap: totCap };
      });
  }
  var _popupBound = false;
  function _popup(map) {
    if (_popupBound || !G.mapboxgl) return; _popupBound = true;
    map.on('click', 'ala-pts', function (ev) {
      var f = ev.features && ev.features[0]; if (!f) return;
      var p = f.properties, s = STYLE[p.cat] || {};
      new G.mapboxgl.Popup({ offset: 10 }).setLngLat(ev.lngLat)
        .setHTML('<div style="font-family:system-ui;font-size:12px;color:#0b1424"><b>' + (p.name || '—') + '</b><br>' + (s.lbl || '') + '<br>Amprentă ~' + p.area + ' m² · capacitate estimată <b>' + p.cap + ' pers</b><br><span style="font-size:10px;opacity:.7">Candidat — de verificat la ISU/protecție civilă</span></div>').addTo(map);
    });
    map.on('mouseenter', 'ala-pts', function () { map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseleave', 'ala-pts', function () { map.getCanvas().style.cursor = ''; });
  }
  function _legend(nBloc, nPub, totCap) {
    _legendClear();
    var el = document.createElement('div'); el.id = 'ala-legend';
    el.style.cssText = 'position:fixed;bottom:90px;right:14px;z-index:8000;background:rgba(11,20,36,.92);color:#e6edf7;border:1px solid rgba(239,68,68,.3);border-radius:10px;padding:10px 12px;font-family:system-ui,sans-serif;font-size:11px;max-width:250px;box-shadow:0 6px 24px rgba(0,0,0,.4)';
    el.innerHTML = '<div style="font-weight:700;margin-bottom:6px;display:flex;justify-content:space-between">🛡 Adăposturi ALA (candidați)<span onclick="RiskShelters.clear()" style="cursor:pointer;opacity:.6">×</span></div>' +
      '<div style="display:flex;align-items:center;gap:7px;margin:3px 0"><span style="width:11px;height:11px;border-radius:50%;background:' + STYLE.bloc.col + ';display:inline-block"></span>Blocuri cu ALA obligatoriu: <b>' + nBloc + '</b></div>' +
      '<div style="display:flex;align-items:center;gap:7px;margin:3px 0"><span style="width:11px;height:11px;border-radius:50%;background:' + STYLE.public.col + ';display:inline-block"></span>Instituții publice: <b>' + nPub + '</b></div>' +
      '<div style="margin-top:5px;padding-top:5px;border-top:1px solid rgba(255,255,255,.1)">Capacitate estimată total: <b>' + totCap.toLocaleString('ro') + ' pers</b></div>' +
      '<div style="margin-top:7px;font-size:9px;opacity:.55;line-height:1.45">Inventar de candidați derivat din OSM + criterii NP-073/2002. NU este registrul oficial ALA (deținut de ISU). Capacitate = amprentă×0,4 ÷ 2,5 m²/pers.</div>';
    document.body.appendChild(el);
  }
  function _legendClear() { var e = document.getElementById('ala-legend'); if (e) try { e.remove(); } catch (x) {} }
  function clearMap() {
    _legendClear(); var map = G.map; if (!map) return;
    ['ala-pts', 'ala-lbl'].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} });
    try { if (map.getSource('ala-src')) map.removeSource('ala-src'); } catch (e) {}
  }

  function toggle() {
    var map = G.map; if (!map) { if (G.ss) G.ss('Harta nu este pregătită.'); return; }
    if (map.getLayer && map.getLayer('ala-pts')) { clearMap(); return; }
    var c = _curCenter(); if (!c) return;
    if (G.ss) G.ss('🛡 Identific adăposturile ALA candidate (OSM + NP-073)…');
    fetchAndDraw(map, c, 1300).then(function (r) { if (G.ss) G.ss(r.n ? ('🛡 ' + r.n + ' clădiri-candidat · ~' + r.totCap.toLocaleString('ro') + ' pers capacitate estimată.') : 'Nicio clădire-candidat în OSM pe această zonă.'); })
      .catch(function (e) { if (G.ss) G.ss('Eroare inventar ALA: ' + e.message); });
  }

  G.RiskShelters = { toggle: toggle, openPanel: toggle, open: toggle, clear: clearMap, fetchAndDraw: fetchAndDraw };
})(window);
