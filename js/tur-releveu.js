/* ============================================================================
 * UrbanX — tur-releveu.js — Mod RELEVEU (plan de sectiune orizontal) pe viewer 3D
 * Taie cladirea generata (V3D) cu un plan orizontal reglabil din slider — vezi
 * planul/relevee la orice cota. Spec 007 FAZA 5 adaptat la arhitectura reala
 * (clipping global pe renderer-ul existent, fara material swap → reversibil).
 * window.VTourReleveu.toggle(). Buton injectat in #v3d-topbar.
 * ========================================================================== */
(function (G) {
  'use strict';
  var _on = false, _plane = null, _range = null;

  function _V3D() { return G.V3D || null; }
  function _THREE() { return G.THREE || window.THREE; }

  function _sceneBounds() {
    var V = _V3D(), THREE = _THREE();
    if (!V || !V.scene || !THREE) return null;
    try {
      var box = new THREE.Box3().setFromObject(V.scene);
      if (!isFinite(box.min.y) || !isFinite(box.max.y)) return null;
      return { min: box.min.y, max: box.max.y };
    } catch (e) { return null; }
  }

  function enable() {
    var V = _V3D(), THREE = _THREE();
    if (!V || !V.r || !V.scene || !THREE) { if (G.ss) G.ss('⚠️ Viewer 3D nu e activ — genereaza intai cladirea (Urban3D).'); return false; }
    _range = _sceneBounds(); if (!_range) { if (G.ss) G.ss('⚠️ Nu pot calcula inaltimea cladirii.'); return false; }
    // plan orizontal: pastreaza ce e SUB cota (normal in jos)
    var startY = _range.min + (_range.max - _range.min) * 0.7;
    _plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), startY);
    V.r.localClippingEnabled = true;
    V.r.clippingPlanes = [_plane];
    _slider(startY);
    _on = true;
    if (G.ss) G.ss('📐 Mod releveu — sectiune orizontala. Misca slider-ul pentru cota.');
    return true;
  }
  function disable() {
    var V = _V3D();
    if (V && V.r) { try { V.r.clippingPlanes = []; V.r.localClippingEnabled = false; } catch (e) {} }
    _plane = null; _on = false;
    var s = document.getElementById('rlv-slider'); if (s) try { s.remove(); } catch (e) {}
    _btnState();
  }
  function toggle() { _on ? disable() : enable(); _btnState(); }

  function _slider(startY) {
    var old = document.getElementById('rlv-slider'); if (old) try { old.remove(); } catch (e) {}
    var wrap = document.createElement('div');
    wrap.id = 'rlv-slider';
    wrap.style.cssText = 'position:fixed;right:16px;top:50%;transform:translateY(-50%);z-index:8200;background:rgba(11,20,36,.92);border:1px solid rgba(0,255,136,.3);border-radius:10px;padding:12px 10px;display:flex;flex-direction:column;align-items:center;gap:8px;font-family:system-ui,sans-serif;color:#e6edf7;box-shadow:0 6px 24px rgba(0,0,0,.4)';
    wrap.innerHTML =
      '<div style="font-size:10px;font-weight:700;color:#00ff88;writing-mode:vertical-rl;letter-spacing:1px">COTA SECTIUNE</div>' +
      '<input id="rlv-range" type="range" min="0" max="100" value="70" ' +
      'style="writing-mode:vertical-lr;direction:rtl;width:8px;height:180px;accent-color:#00ff88" oninput="VTourReleveu._move(this.value)">' +
      '<div id="rlv-val" style="font-size:10px;color:#9fb3c8;min-width:34px;text-align:center">' + (startY).toFixed(1) + 'm</div>' +
      '<div onclick="VTourReleveu.toggle()" style="cursor:pointer;font-size:11px;color:#94a3b8;border-top:1px solid rgba(255,255,255,.1);padding-top:6px">✕ iesi</div>';
    document.body.appendChild(wrap);
  }
  function _move(pct) {
    if (!_plane || !_range) return;
    var y = _range.min + (_range.max - _range.min) * (pct / 100);
    _plane.constant = y;
    var v = document.getElementById('rlv-val'); if (v) v.textContent = y.toFixed(1) + 'm';
  }

  function _btnState() {
    var b = document.getElementById('rlv-launch-btn'); if (!b) return;
    b.style.background = _on ? 'rgba(0,255,136,.28)' : 'linear-gradient(90deg,rgba(0,255,136,.12),rgba(59,130,246,.1))';
  }
  function _injectBtn() {
    var topbar = document.getElementById('v3d-topbar'); if (!topbar) return false;
    if (document.getElementById('rlv-launch-btn')) return true;
    var rows = topbar.querySelectorAll(':scope > div'); var row = rows[1] || topbar;
    var btn = document.createElement('button');
    btn.id = 'rlv-launch-btn';
    btn.title = 'Mod releveu — plan de sectiune orizontal reglabil';
    btn.innerHTML = '📐 Secțiune';
    btn.style.cssText = 'background:linear-gradient(90deg,rgba(0,255,136,.12),rgba(59,130,246,.1));color:#7CFFC4;border:1px solid rgba(0,255,136,.4);border-radius:8px;padding:5px 13px;font-size:11px;font-weight:700;cursor:pointer;flex-shrink:0;min-height:36px;letter-spacing:.3px;white-space:nowrap;';
    btn.addEventListener('click', toggle);
    row.appendChild(btn);
    return true;
  }
  // injecteaza butonul cand apare topbar-ul
  if (!_injectBtn()) {
    var obs = new MutationObserver(function () { if (_injectBtn()) obs.disconnect(); });
    try { obs.observe(document.body, { childList: true, subtree: true }); } catch (e) {}
    setTimeout(function () { try { obs.disconnect(); } catch (e) {} }, 30000);
  }

  G.VTourReleveu = { toggle: toggle, enable: enable, disable: disable, _move: _move };
})(window);
