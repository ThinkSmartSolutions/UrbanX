// ═══════════════════════════════════════════════════════════════════════════
// harti-istorice.js — HĂRȚI ISTORICE ca straturi pe hartă (window._HartiIstorice)
// Sursă: geo-spatial.org (RNGD · GeoServer WMS) — hărți militare/topografice istorice
// georeferențiate. Permite suprapunerea amprentei actuale peste cartografia de epocă
// (analiză DIACRONICĂ): util pentru RCAI (potențial arheologic), istoricul amplasamentului,
// evoluția folosinței terenului. Straturile sunt servite ca raster WMS (EPSG:3857).
// API: _HartiIstorice.LAYERS · addLayer(id) · removeLayer(id) · clearAll() · openPanel()
//      · captureOver(lat,lon,id,opts) → dataURL (folosit de RCAI pt planșe de epocă)
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  var WMS = 'https://services.geo-spatial.org/geoserver/eharta/wms';
  // construiește template-ul de tile WMS (Mapbox înlocuiește {bbox-epsg-3857})
  function _tpl(layer) {
    return WMS + '?service=WMS&version=1.1.1&request=GetMap&layers=' + encodeURIComponent(layer) +
      '&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&format=image/png&transparent=true';
  }
  // straturile istorice disponibile, în ordine cronologică
  var LAYERS = [
    { id: 'austrian200k', wms: 'eharta:mozaic_austrian_200k', label: 'Hartă austro-ungară (1:200.000)', epoca: '~1882–1918', note: 'Generalkarte — acoperă Transilvania, Banat, Bucovina, Dobrogea de nord.' },
    { id: 'pdt20k', wms: 'eharta:mozaic_planuri_tragere_20k', label: 'Planuri Directoare de Tragere (1:20.000)', epoca: 'interbelic · ~1916–1959', note: 'Cartografia românească de mare detaliu — parcele, drumuri, toponime, folosință interbelică.' },
    { id: 'soviet50k', wms: 'eharta:mozaic_soviet_50k', label: 'Hărți militare sovietice (1:50.000)', epoca: '~1975–1985', note: 'Topografie din perioada comunistă — sistematizare, CAP-uri, industrializare.' }
  ];
  function _get(id) { for (var i = 0; i < LAYERS.length; i++) if (LAYERS[i].id === id) return LAYERS[i]; return null; }

  var _active = {}; // id → opacity
  function _sid(id) { return 'hist-src-' + id; }
  function _lid(id) { return 'hist-lyr-' + id; }

  function addLayer(id, opacity) {
    var map = G.map, L = _get(id); if (!map || !L) return;
    opacity = (opacity == null ? 0.85 : opacity);
    try {
      if (!map.getSource(_sid(id))) map.addSource(_sid(id), { type: 'raster', tiles: [_tpl(L.wms)], tileSize: 256, attribution: 'geo-spatial.org · RNGD' });
      if (!map.getLayer(_lid(id))) {
        // inserează sub etichete (dacă există un strat simbol), altfel deasupra
        var before = null; try { var ly = map.getStyle().layers || []; for (var i = 0; i < ly.length; i++) { if (ly[i].type === 'symbol') { before = ly[i].id; break; } } } catch (e) {}
        map.addLayer({ id: _lid(id), type: 'raster', source: _sid(id), paint: { 'raster-opacity': opacity } }, before);
      }
      _active[id] = opacity;
    } catch (e) { console.warn('[HartiIstorice] addLayer', id, e); }
  }
  function removeLayer(id) {
    var map = G.map; if (!map) return;
    try { if (map.getLayer(_lid(id))) map.removeLayer(_lid(id)); } catch (e) {}
    try { if (map.getSource(_sid(id))) map.removeSource(_sid(id)); } catch (e) {}
    delete _active[id];
  }
  function clearAll() { LAYERS.forEach(function (L) { removeLayer(L.id); }); }
  function setOpacity(id, v) { var map = G.map; if (map && map.getLayer(_lid(id))) { try { map.setPaintProperty(_lid(id), 'raster-opacity', +v); _active[id] = +v; } catch (e) {} } }
  function toggle(id) { if (_active[id] != null) removeLayer(id); else addLayer(id); if (G._HartiIstorice._panelOpen) _renderPanel(); }
  function isActive(id) { return _active[id] != null; }

  // ── CAPTURĂ amprentă peste o hartă istorică (pt RCAI) ──────────────────────
  // adaugă temporar stratul, sare la amplasament, marchează parcela, așteaptă idle,
  // capturează canvasul. Returnează dataURL (PNG) sau null.
  async function captureOver(lat, lon, id, opts) {
    opts = opts || {};
    var map = G.map; if (!map || !map.getCanvas) return null;
    var L = _get(id); if (!L) return null;
    var hadBase = isActive(id);
    var markSrc = 'hist-cap-mark', markLyr = 'hist-cap-mark-pt', markLyr2 = 'hist-cap-mark-rg';
    function cleanup() {
      [markLyr, markLyr2].forEach(function (i) { try { if (map.getLayer(i)) map.removeLayer(i); } catch (e) {} });
      try { if (map.getSource(markSrc)) map.removeSource(markSrc); } catch (e) {}
      if (!hadBase) removeLayer(id);
    }
    try {
      var prevCenter = map.getCenter(), prevZoom = map.getZoom(), prevPitch = map.getPitch(), prevBearing = map.getBearing();
      addLayer(id, opts.opacity == null ? 1 : opts.opacity);
      // marker amplasament (cerc + halou) — vizibil peste cartografia de epocă
      map.addSource(markSrc, { type: 'geojson', data: { type: 'Feature', geometry: { type: 'Point', coordinates: [lon, lat] }, properties: {} } });
      map.addLayer({ id: markLyr2, type: 'circle', source: markSrc, paint: { 'circle-radius': 26, 'circle-color': '#dc2626', 'circle-opacity': 0.12, 'circle-stroke-color': '#dc2626', 'circle-stroke-width': 1 } });
      map.addLayer({ id: markLyr, type: 'circle', source: markSrc, paint: { 'circle-radius': 7, 'circle-color': '#dc2626', 'circle-stroke-color': '#fff', 'circle-stroke-width': 2 } });
      map.jumpTo({ center: [lon, lat], zoom: opts.zoom || 14.2, pitch: 0, bearing: 0 });
      await new Promise(function (res) { var done = false; function f() { if (!done) { done = true; res(); } } map.once('idle', f); setTimeout(f, 4200); });
      var url = null; try { url = map.getCanvas().toDataURL('image/png'); } catch (e) { console.warn('[HartiIstorice] toDataURL', e); }
      cleanup();
      try { map.jumpTo({ center: prevCenter, zoom: prevZoom, pitch: prevPitch, bearing: prevBearing }); } catch (e) {}
      return url;
    } catch (e) { cleanup(); console.warn('[HartiIstorice] captureOver', e); return null; }
  }

  // ── PANOU UI ───────────────────────────────────────────────────────────────
  function _renderPanel() {
    var old = document.getElementById('hist-panel'); if (!old) return;
    old.querySelector('#hist-rows').innerHTML = LAYERS.map(function (L) {
      var on = isActive(L.id), op = _active[L.id] == null ? 0.85 : _active[L.id];
      return '<div style="border:1px solid ' + (on ? 'rgba(180,83,9,.5)' : 'rgba(255,255,255,.08)') + ';background:' + (on ? 'rgba(180,83,9,.08)' : 'rgba(255,255,255,.02)') + ';border-radius:9px;padding:9px 11px;margin-bottom:7px">' +
        '<div onclick="_HartiIstorice.toggle(\'' + L.id + '\')" style="cursor:pointer;display:flex;justify-content:space-between;align-items:center">' +
        '<span style="color:' + (on ? '#fbbf24' : '#e2e8f0') + ';font-weight:700;font-size:12.5px">' + (on ? '☑ ' : '☐ ') + L.label + '</span>' +
        '<span style="color:#94a3b8;font-size:10px">' + L.epoca + '</span></div>' +
        '<div style="font-size:9.5px;color:#7c8aa0;margin-top:3px">' + L.note + '</div>' +
        (on ? '<div style="margin-top:6px;display:flex;align-items:center;gap:7px"><span style="font-size:9px;color:#94a3b8">opacitate</span><input type="range" min="0.2" max="1" step="0.05" value="' + op + '" oninput="_HartiIstorice.setOpacity(\'' + L.id + '\',this.value)" style="flex:1"></div>' : '') +
        '</div>';
    }).join('');
  }
  function openPanel() {
    var ex = document.getElementById('hist-panel'); if (ex) { ex.remove(); G._HartiIstorice._panelOpen = false; return; }
    var mob = window.innerWidth < 841;
    var div = document.createElement('div'); div.id = 'hist-panel';
    div.style.cssText = 'position:fixed;' + (mob ? 'inset:0;border-radius:0' : 'top:54px;right:14px;width:380px;max-height:88vh;border-radius:14px') + ';z-index:9300;background:rgba(8,13,26,.98);border:1px solid rgba(180,83,9,.35);overflow-y:auto;box-shadow:0 16px 50px rgba(0,0,0,.7);backdrop-filter:blur(14px);font-family:system-ui,sans-serif';
    div.innerHTML =
      '<div style="position:sticky;top:0;background:rgba(8,13,26,.98);padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;align-items:center">' +
      '<div><div style="color:#fbbf24;font-weight:800;font-size:14px">🗺️ Hărți istorice</div><div style="color:#94a3b8;font-size:10px">suprapune cartografia de epocă peste teritoriul actual</div></div>' +
      '<button onclick="_HartiIstorice.openPanel()" style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:8px;padding:6px 12px;cursor:pointer;font-weight:700">✕</button></div>' +
      '<div style="padding:12px 16px"><div id="hist-rows"></div>' +
      '<button onclick="_HartiIstorice.clearAll();(function(){var p=document.getElementById(\'hist-panel\');if(p)p.querySelector(\'#hist-rows\')&&_HartiIstorice._rerender()})()" style="width:100%;margin-top:4px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#cbd5e1;border-radius:8px;padding:8px;cursor:pointer;font-size:12px">Ascunde toate</button>' +
      '<div style="font-size:9px;color:#475569;margin-top:10px;line-height:1.5">Surse georeferențiate: <b>geo-spatial.org</b> (Rețeaua Națională de Geodezie / RNGD) prin GeoServer WMS. Hărțile istorice pot avea erori de georeferențiere de zeci de metri — folosire orientativă pentru analiză diacronică, nu pentru delimitări cadastrale.</div></div>';
    document.body.appendChild(div); G._HartiIstorice._panelOpen = true; _renderPanel();
  }

  G._HartiIstorice = {
    LAYERS: LAYERS, addLayer: addLayer, removeLayer: removeLayer, clearAll: clearAll,
    setOpacity: setOpacity, toggle: toggle, isActive: isActive, captureOver: captureOver,
    openPanel: openPanel, _rerender: _renderPanel, _panelOpen: false
  };
  window._HartiIstorice = G._HartiIstorice;
  console.log('[HartiIstorice] ✅ hărți istorice (geo-spatial.org WMS) · window._HartiIstorice · ' + LAYERS.length + ' straturi');
})(window);
