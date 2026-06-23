/* ============================================================================
 * UrbanX — 003: Animația layerelor before/after pe hartă.
 * MAP_VAR = window.map (Mapbox GL JS v3 — setPaintProperty/getLayer compatibile).
 * ========================================================================== */
(function (G) {
  'use strict';
  function interpolateHex(from, to, t) {
    var f = parseInt(from.replace('#', ''), 16), ti = parseInt(to.replace('#', ''), 16);
    var r = Math.round(((f >> 16) & 0xff) * (1 - t) + ((ti >> 16) & 0xff) * t);
    var g = Math.round(((f >> 8) & 0xff) * (1 - t) + ((ti >> 8) & 0xff) * t);
    var b = Math.round((f & 0xff) * (1 - t) + (ti & 0xff) * t);
    return '#' + [r, g, b].map(function (x) { return x.toString(16).padStart(2, '0'); }).join('');
  }
  function applyMapTransition(mapInstance, layers, progress) {
    if (!mapInstance) { console.error('003: applyMapTransition — mapInstance null'); return; }
    var t = progress / 100;
    (layers || []).forEach(function (layer) {
      if (!mapInstance.getLayer(layer.id)) return;
      Object.keys(layer.afterPaint).forEach(function (prop) {
        var before = layer.beforePaint[prop], after = layer.afterPaint[prop];
        try {
          if (typeof before === 'string' && before.charAt(0) === '#') mapInstance.setPaintProperty(layer.id, prop, interpolateHex(before, after, t));
          else if (typeof before === 'number') mapInstance.setPaintProperty(layer.id, prop, before + (after - before) * t);
        } catch (e) {}
      });
    });
  }
  var _wired = false;
  function initMapTransitionListener(mapInstance) {
    if (_wired) return; _wired = true;
    G.UrbanModelsStore.onChange(function (type) {
      if (type !== 'transition') return;
      var r = G.UrbanModelsStore.activeResult;
      if (r) applyMapTransition(mapInstance, r.mapLayers, G.UrbanModelsStore.transitionProgress);
    });
  }
  G.interpolateHex = interpolateHex; G.applyMapTransition = applyMapTransition; G.initMapTransitionListener = initMapTransitionListener;
})(window);
