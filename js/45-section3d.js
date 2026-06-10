// ═══════════════════════════════════════════════════════════════════════════
// 45-section3d.js — Secțiune 3D interactivă (ca Coohom)
// UrbanX TSS·FG | v1.0 | Sesiunea 9
// ClippingPlane pe renderer Three.js — tăie clădirea frontal
// Toate etajele vizibile simultan cu interioare
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  window._Section3D = {
    active: false,
    axis: 'Z',       // 'Z' = frontal, 'X' = lateral
    position: 0.5,   // 0..1 — unde e tăietura
    plane: null,
  };

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (window.THREE && window.VTour) { cb(); return; }
    setTimeout(function() { waitReady(cb, n + 1); }, 250);
  }

  waitReady(function() {
    _injectSectionButton();
    console.log('[Section3D v1] ✅ Secțiune 3D activă');
  });

  // ── Injectăm butonul în dropdown Explorare ────────────────────────────
  function _injectSectionButton() {
    var _try = function() {
      var menu = document.getElementById('ts-explore-menu');
      if (!menu || document.getElementById('btn-section3d')) return false;

      var btn = document.createElement('div');
      btn.id = 'btn-section3d';
      btn.className = 'ts-explore-item';
      btn.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 14px;' +
        'cursor:pointer;border-radius:6px;transition:background .15s;';
      btn.innerHTML = '<span style="font-size:16px">✂</span>' +
        '<div><div style="font-size:12px;font-weight:700;color:#E2E8F0">Secțiune 3D</div>' +
        '<div style="font-size:10px;color:#64748B">Interior vizibil complet</div></div>';
      btn.onmouseover = function() { btn.style.background = 'rgba(255,255,255,.06)'; };
      btn.onmouseout  = function() { btn.style.background = ''; };
      btn.onclick = function() {
        menu.style.display = 'none';
        _launchSection3D();
      };
      menu.appendChild(btn);
      return true;
    };

    if (!_try()) {
      var obs = new MutationObserver(function() { if (_try()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  // ── Lansare Secțiune 3D ───────────────────────────────────────────────
  function _launchSection3D() {
    var state = window.VTour && window.VTour._state;
    if (!state || !state.renderer) {
      // Pornim Dollhouse dacă nu e activ
      if (typeof window.VTour?.start === 'function') {
        window.VTour.start();
        setTimeout(_launchSection3D, 1500);
      }
      return;
    }

    window._Section3D.active = true;
    _buildSectionUI(state);
    _activateClipping(state);
  }

  // ── Activare ClippingPlane ────────────────────────────────────────────
  function _activateClipping(state) {
    var THREE = window.THREE;
    var anchor = window._rvGetAnchor && window._rvGetAnchor() || state._anchor;
    if (!THREE || !anchor) return;

    // Activăm clipping pe renderer
    state.renderer.localClippingEnabled = true;

    // Planul de tăiere (frontal, pe axa Z)
    var clipZ = anchor.cz; // centrul clădirii
    window._Section3D.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -clipZ);

    // Aplicăm pe toate mesh-urile
    state.scene.traverse(function(obj) {
      if (!obj.isMesh) return;
      if (!obj.material) return;
      var mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach(function(m) {
        m.clippingPlanes = [window._Section3D.plane];
        m.clipShadows = true;
        m.needsUpdate = true;
      });
    });

    // Rotim camera pentru vedere frontală
    _setCameraFrontal(state, anchor, THREE);

    console.log('[Section3D] ✅ Clipping activ la Z=' + clipZ.toFixed(2));
  }

  // ── Camera frontală izometrică ────────────────────────────────────────
  function _setCameraFrontal(state, anchor, THREE) {
    var bW = anchor.bW, bD = anchor.bD;
    var b = window._RV && window._RV.building;
    var niv = (b && b.niv) || 3;
    var hNiv = (b && b.P && b.P.hn) || 3.0;
    var H = niv * hNiv;

    // Distanță pentru a vedea toată clădirea
    var dist = Math.max(bW, H) * 1.8;
    var targetY = anchor.baseY + H * 0.5;

    // Animație smooth spre poziție frontală
    var startPos = state.camera.position.clone();
    var endPos = new THREE.Vector3(anchor.cx, targetY, anchor.cz + dist);
    var startTarget = state.controls && state.controls.target
      ? state.controls.target.clone() : new THREE.Vector3(anchor.cx, targetY, anchor.cz);
    var endTarget = new THREE.Vector3(anchor.cx, targetY, anchor.cz);

    var t = 0;
    var animInterval = setInterval(function() {
      t += 0.04;
      if (t >= 1) { t = 1; clearInterval(animInterval); }
      var ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t; // ease in-out

      state.camera.position.lerpVectors(startPos, endPos, ease);
      if (state.controls && state.controls.target) {
        state.controls.target.lerpVectors(startTarget, endTarget, ease);
        state.controls.update && state.controls.update();
      } else {
        state.camera.lookAt(endTarget);
      }
    }, 16);
  }

  // ── UI Secțiune 3D ───────────────────────────────────────────────────
  function _buildSectionUI(state) {
    // Ștergem UI vechi dacă există
    var old = document.getElementById('section3d-ui');
    if (old) old.remove();

    var anchor = window._rvGetAnchor && window._rvGetAnchor() || state._anchor;
    if (!anchor) return;

    var b = window._RV && window._RV.building;
    var niv = (b && b.niv) || 3;
    var hNiv = (b && b.P && b.P.hn) || 3.0;
    var H = niv * hNiv;

    var ui = document.createElement('div');
    ui.id = 'section3d-ui';
    ui.style.cssText = [
      'position:fixed;bottom:80px;left:50%;transform:translateX(-50%)',
      'z-index:999999;background:rgba(8,14,30,.95)',
      'border:1px solid rgba(168,85,247,.3);border-radius:14px',
      'padding:14px 20px;display:flex;align-items:center;gap:16px',
      'box-shadow:0 8px 32px rgba(0,0,0,.5);min-width:380px',
    ].join(';');

    ui.innerHTML = [
      '<span style="font-size:18px">✂</span>',
      '<div style="flex:1">',
        '<div style="font-size:11px;font-weight:700;color:#C084FC;margin-bottom:6px">',
          'SECȚIUNE 3D — plan de tăiere',
        '</div>',
        '<input type="range" id="section3d-slider" min="0" max="100" value="50"',
          ' style="width:100%;accent-color:#A855F7">',
        '<div style="display:flex;justify-content:space-between;font-size:9px;color:#475569;margin-top:2px">',
          '<span>Față</span><span>Mijloc</span><span>Spate</span>',
        '</div>',
      '</div>',
      '<div style="display:flex;gap:6px">',
        '<button id="section3d-axis-z" onclick="_section3dSetAxis(\'Z\')"',
          ' style="padding:4px 8px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;',
          'background:rgba(168,85,247,.4);color:#C084FC;border:1px solid rgba(168,85,247,.5)">Frontal</button>',
        '<button id="section3d-axis-x" onclick="_section3dSetAxis(\'X\')"',
          ' style="padding:4px 8px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;',
          'background:rgba(255,255,255,.05);color:#94A3B8;border:1px solid rgba(255,255,255,.1)">Lateral</button>',
        '<button onclick="_section3dClose()"',
          ' style="padding:4px 10px;border-radius:6px;font-size:10px;cursor:pointer;',
          'background:rgba(239,68,68,.15);color:#FCA5A5;border:1px solid rgba(239,68,68,.3)">✕</button>',
      '</div>',
    ].join('');

    document.body.appendChild(ui);

    // Slider listener
    var slider = document.getElementById('section3d-slider');
    if (slider) {
      slider.addEventListener('input', function() {
        var val = parseInt(slider.value) / 100;
        _updateClipPosition(state, val);
      });
    }
  }

  // ── Update poziție clipping ───────────────────────────────────────────
  window._section3dSetAxis = function(axis) {
    var state = window.VTour && window.VTour._state;
    if (!state) return;
    window._Section3D.axis = axis;

    // Update butoane
    document.getElementById('section3d-axis-z').style.background =
      axis === 'Z' ? 'rgba(168,85,247,.4)' : 'rgba(255,255,255,.05)';
    document.getElementById('section3d-axis-z').style.color =
      axis === 'Z' ? '#C084FC' : '#94A3B8';
    document.getElementById('section3d-axis-x').style.background =
      axis === 'X' ? 'rgba(168,85,247,.4)' : 'rgba(255,255,255,.05)';
    document.getElementById('section3d-axis-x').style.color =
      axis === 'X' ? '#C084FC' : '#94A3B8';

    // Recalculăm planul
    var slider = document.getElementById('section3d-slider');
    var val = slider ? parseInt(slider.value) / 100 : 0.5;
    _updateClipPosition(state, val);

    // Rotim camera
    var anchor = window._rvGetAnchor && window._rvGetAnchor() || state._anchor;
    if (anchor) {
      _setCameraFrontal(state, anchor, window.THREE);
    }
  };

  function _updateClipPosition(state, val) {
    var THREE = window.THREE;
    var anchor = window._rvGetAnchor && window._rvGetAnchor() || state._anchor;
    if (!anchor || !window._Section3D.plane) return;

    var axis = window._Section3D.axis;
    var bW = anchor.bW, bD = anchor.bD;
    var clipPos;

    if (axis === 'Z') {
      // Tăiem de la față (cz + bD/2) spre spate (cz - bD/2)
      clipPos = (anchor.cz + bD / 2) - val * bD * 1.1;
      window._Section3D.plane.normal.set(0, 0, 1);
      window._Section3D.plane.constant = -clipPos;
    } else {
      // Tăiem de la dreapta spre stânga
      clipPos = (anchor.cx + bW / 2) - val * bW * 1.1;
      window._Section3D.plane.normal.set(1, 0, 0);
      window._Section3D.plane.constant = -clipPos;
    }

    window._Section3D.position = val;
  }

  window._section3dClose = function() {
    var state = window.VTour && window.VTour._state;
    if (state) {
      // Dezactivăm clipping
      if (state.renderer) state.renderer.localClippingEnabled = false;
      state.scene && state.scene.traverse(function(obj) {
        if (!obj.isMesh || !obj.material) return;
        var mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach(function(m) {
          m.clippingPlanes = [];
          m.needsUpdate = true;
        });
      });
    }
    window._Section3D.active = false;
    var ui = document.getElementById('section3d-ui');
    if (ui) ui.remove();
  };

})();
