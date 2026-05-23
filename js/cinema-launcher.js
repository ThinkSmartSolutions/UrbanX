// cinema-launcher.js — UrbanX Cinema Launcher v1.0
// Acest fisier porneste cinematicul corect, independent de _SceneEngine
(function(){
'use strict';

window._startCinema = function(cityKey) {
  cityKey = cityKey || window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';

  var SE = window._CinemaEngine;
  if (!SE) { console.error('[Cinema] _CinemaEngine lipsa'); return; }

  var map = window.map;
  if (!map) { console.error('[Cinema] map lipsa'); return; }

  // 1. Opreste orice cinematic activ
  SE._playing = false;
  if (SE._raf) cancelAnimationFrame(SE._raf);
  if (SE._rotInt) { clearInterval(SE._rotInt); SE._rotInt = null; }

  // 2. Ascunde UI
  var hidden = [];
  ['#panel','#panel-tabs','#panel-body','#topbar','#mob-sheet',
   '#search-panel','#utr-drawer','#info-drawer','#ux-gdpr-footer',
   '.mapboxgl-ctrl-bottom-left','.mapboxgl-ctrl-bottom-right',
   'nav','#tci-adv-menu','#viz-menu','#rapoarte-menu'
  ].forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(el) {
      if (!el._c_saved) { el._c_saved = el.style.cssText; }
      el.style.setProperty('display', 'none', 'important');
      hidden.push(el);
    });
  });

  // 3. Curata canvas vechi
  document.querySelectorAll('#tci-c8,#tci-c6,#tci-c7').forEach(function(e){ e.remove(); });

  // 4. Creeaza canvas nou
  var c = document.createElement('canvas');
  c.id = 'tci-c8';
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  c.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;pointer-events:none;';
  document.body.appendChild(c);

  // 5. Setup SE
  SE._map = map;
  SE._city = (window._RO_CITIES_DB || {})[cityKey] || Object.values(window._RO_CITIES_DB||{})[0];
  SE._pred = window._PredEngine.calc(SE._city);
  SE._canvas = c;
  SE._ctx = c.getContext('2d');
  SE._playing = true;
  SE._si = 0;
  SE._gf = null;
  SE._gfTr = null;

  // 6. Butoane control
  document.getElementById('tci-c8-ctrl')?.remove();
  var ctrl = document.createElement('div');
  ctrl.id = 'tci-c8-ctrl';
  ctrl.style.cssText = 'position:fixed;bottom:28px;right:20px;z-index:1000000;display:flex;gap:8px;';
  ctrl.innerHTML = '<button id="c8p" style="background:rgba(0,0,0,.7);border:1px solid rgba(255,255,255,.2);color:#fff;padding:10px 18px;border-radius:10px;cursor:pointer;font:700 14px monospace">◀</button>' +
    '<button id="c8n" style="background:rgba(0,0,0,.7);border:1px solid rgba(255,255,255,.2);color:#fff;padding:10px 18px;border-radius:10px;cursor:pointer;font:700 14px monospace">▶</button>' +
    '<button id="c8s" style="background:rgba(180,0,0,.7);border:1px solid rgba(255,80,80,.3);color:#ff9999;padding:10px 14px;border-radius:10px;cursor:pointer;font:700 14px monospace">✕</button>';
  document.body.appendChild(ctrl);

  // Stop function
  function stopCinema() {
    SE._playing = false;
    if (SE._raf) cancelAnimationFrame(SE._raf);
    if (SE._rotInt) { clearInterval(SE._rotInt); SE._rotInt = null; }
    document.getElementById('tci-c8')?.remove();
    document.getElementById('tci-c8-ctrl')?.remove();
    hidden.forEach(function(el){ el.style.cssText = el._c_saved || ''; delete el._c_saved; });
    try { map.flyTo({zoom:13,pitch:0,bearing:0,duration:1500,essential:true}); } catch(e) {}
    try { map.setConfigProperty('basemap','lightPreset','day'); } catch(e) {}
    console.log('[Cinema] Stop');
  }

  document.getElementById('c8s').onclick = stopCinema;
  document.getElementById('c8n').onclick = function() {
    if (SE._si < SE.SCENES.length - 1) {
      SE._playing = false;
      if (SE._raf) cancelAnimationFrame(SE._raf);
      SE._cleanLayers.call(SE);
      setTimeout(function(){ SE._playing = true; runScene(SE._si + 1); }, 50);
    }
  };
  document.getElementById('c8p').onclick = function() {
    if (SE._si > 0) {
      SE._playing = false;
      if (SE._raf) cancelAnimationFrame(SE._raf);
      SE._cleanLayers.call(SE);
      setTimeout(function(){ SE._playing = true; runScene(SE._si - 1); }, 50);
    }
  };

  // 7. Run scene engine
  function runScene(idx) {
    if (!SE._playing || idx >= SE.SCENES.length) {
      // Fade out si stop
      var canvas = document.getElementById('tci-c8');
      if (canvas) { canvas.style.transition='opacity 1.5s'; canvas.style.opacity='0'; setTimeout(stopCinema, 1600); }
      return;
    }
    var scene = SE.SCENES[idx];
    SE._si = idx;
    SE._startT = performance.now();

    // Setup harta
    try { SE._setupMap.call(SE, scene.id); } catch(e) { console.warn('[Cinema] setupMap err:', e.message); }

    // Render loop
    var loop = function() {
      if (!SE._playing) return;
      var t = Math.min(1, Math.max(0.001, (performance.now() - SE._startT) / scene.dur));
      SE._ctx.clearRect(0, 0, c.width, c.height);
      try { SE._draw.call(SE, scene.id, t); } catch(e) { console.warn('[Cinema] draw err:', scene.id, e.message); }
      if (t < 1) {
        SE._raf = requestAnimationFrame(loop);
      } else {
        try { SE._cleanLayers.call(SE); } catch(e) {}
        runScene(idx + 1);
      }
    };
    SE._raf = requestAnimationFrame(loop);
    console.log('[Cinema] Scena', idx, scene.id, SE._city.name);
  }

  runScene(0);
  console.log('[Cinema] START —', SE._city.name);
};

// Expune si pe butonul TCI din platforma
window._openTCICinema = window._startCinema;

console.log('[Cinema Launcher v1.0] ✅ _startCinema() disponibil');
})();
