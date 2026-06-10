// ═══════════════════════════════════════════════════════════════════════════
// 46-postprocessing.js — EffectComposer: SSAO + Bloom + FXAA + Tone Mapping
// UrbanX TSS·FG | v1.0 | Sesiunea 9
// 100% Three.js built-in, zero dependențe externe
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // Three.js r128 CDN paths pentru post-processing
  var CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/';

  // Încărcăm EffectComposer și passes din jsDelivr (Three.js examples)
  var DREI_CDN = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/';

  function loadScript(url, cb) {
    if (document.querySelector('script[src="' + url + '"]')) { cb && cb(); return; }
    var s = document.createElement('script');
    s.src = url;
    s.onload = cb || function(){};
    s.onerror = function() { console.warn('[PP] Nu s-a putut încărca:', url); cb && cb(); };
    document.head.appendChild(s);
  }

  var _ppLoaded = false;
  function _loadPostProcessing(cb) {
    if (_ppLoaded) { cb(); return; }
    // Timeout 6s — dacă CDN e lent, continuăm fără post-processing
    var timeout = setTimeout(function() {
      console.warn('[PP] CDN timeout — continuăm fără post-processing');
      cb();
    }, 6000);
    // Încărcăm în ordine
    loadScript(DREI_CDN + 'postprocessing/EffectComposer.js', function() {
    loadScript(DREI_CDN + 'postprocessing/RenderPass.js', function() {
    loadScript(DREI_CDN + 'postprocessing/ShaderPass.js', function() {
    loadScript(DREI_CDN + 'postprocessing/UnrealBloomPass.js', function() {
    loadScript(DREI_CDN + 'shaders/FXAAShader.js', function() {
    loadScript(DREI_CDN + 'shaders/GammaCorrectionShader.js', function() {
      clearTimeout(timeout);
      _ppLoaded = true;
      cb();
    }); }); }); }); }); });
  }

  function _setupComposer(state) {
    if (state._composer || state._composerAttempted) return;
    state._composerAttempted = true;

    var THREE = window.THREE;
    if (!THREE || !THREE.EffectComposer) {
      console.warn('[PP] EffectComposer indisponibil — skip post-processing');
      return;
    }

    var renderer = state.renderer;
    var scene    = state.scene;
    var camera   = state.camera;
    var canvas   = state.canvas;
    if (!renderer || !scene || !camera) return;

    try {
      var W = canvas.clientWidth  || canvas.width  || 1200;
      var H = canvas.clientHeight || canvas.height || 800;

      // EffectComposer
      var composer = new THREE.EffectComposer(renderer);

      // 1. Render normal
      var renderPass = new THREE.RenderPass(scene, camera);
      composer.addPass(renderPass);

      // 2. SSAO — umbre în colțuri (ambient occlusion)
      if (THREE.SSAOPass) {
        var ssaoPass = new THREE.SSAOPass(scene, camera, W, H);
        ssaoPass.kernelRadius = 8;
        ssaoPass.minDistance  = 0.001;
        ssaoPass.maxDistance  = 0.15;
        ssaoPass.output = THREE.SSAOPass.OUTPUT.Default;
        composer.addPass(ssaoPass);
      }

      // 3. Bloom — lumini care strălucesc
      if (THREE.UnrealBloomPass) {
        var bloomPass = new THREE.UnrealBloomPass(
          new THREE.Vector2(W, H),
          0.35,  // strength — subtil
          0.5,   // radius
          0.82   // threshold — doar luminile strălucesc
        );
        composer.addPass(bloomPass);
      }

      // 4. FXAA — anti-aliasing
      if (THREE.ShaderPass && THREE.FXAAShader) {
        var fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
        fxaaPass.uniforms['resolution'].value.set(1/W, 1/H);
        composer.addPass(fxaaPass);
      }

      // 5. Gamma correction
      if (THREE.ShaderPass && THREE.GammaCorrectionShader) {
        var gammPass = new THREE.ShaderPass(THREE.GammaCorrectionShader);
        gammPass.renderToScreen = true;
        composer.addPass(gammPass);
      } else {
        // Setăm renderToScreen pe ultimul pass
        var lastPass = composer.passes[composer.passes.length - 1];
        if (lastPass) lastPass.renderToScreen = true;
      }

      state._composer = composer;

      // Hook pe render loop — înlocuim renderer.render cu composer.render
      var origAnimate = state._animate;
      if (origAnimate && !origAnimate._composerHooked) {
        origAnimate._composerHooked = true;
        // Patch-ul e indirect prin THREE.WebGLRenderer.render
        var origRender = renderer.render.bind(renderer);
        renderer.render = function(sc, cam) {
          if (state._composer && state._composerActive !== false) {
            state._composer.render();
          } else {
            origRender(sc, cam);
          }
        };
      }

      // Resize handler
      window.addEventListener('resize', function() {
        var nW = canvas.clientWidth, nH = canvas.clientHeight;
        if (!nW || !nH) return;
        composer.setSize(nW, nH);
        if (THREE.SSAOPass && ssaoPass) ssaoPass.setSize(nW, nH);
        if (THREE.UnrealBloomPass && bloomPass) bloomPass.setSize(nW, nH);
      });

      console.log('[PP] ✅ EffectComposer activ: SSAO + Bloom + FXAA + Gamma');
      if (typeof ss === 'function') ss('✨ Post-processing activat: SSAO + Bloom + FXAA');

    } catch(e) {
      console.warn('[PP] Eroare EffectComposer:', e.message);
    }
  }

  function _patchViewerForPP() {
    // Hook pe VTour.start
    var _hookVTour = function() {
      var vt = window.VTour;
      if (!vt || !vt.start || vt.start._ppHooked) return false;
      vt.start._ppHooked = true;
      var orig = vt.start;
      vt.start = function() {
        var r = orig.apply(this, arguments);
        setTimeout(function() {
          _loadPostProcessing(function() {
            _setupComposer(window.VTour._state);
          });
        }, 1800);
        return r;
      };
      return true;
    };

    // Hook pe startFP (Floor Plan)
    var _hookFP = function() {
      var fp = window.VTourFP;
      if (!fp || !fp.startFP || fp.startFP._ppHooked) return false;
      fp.startFP._ppHooked = true;
      var orig = fp.startFP;
      fp.startFP = function() {
        var r = orig.apply(this, arguments);
        setTimeout(function() {
          _loadPostProcessing(function() {
            _setupComposer(window.VTour._state);
          });
        }, 1800);
        return r;
      };
      return true;
    };

    var done = { vt: _hookVTour(), fp: _hookFP() };
    if (!done.vt || !done.fp) {
      var obs = new MutationObserver(function() {
        if (!done.vt) done.vt = _hookVTour();
        if (!done.fp) done.fp = _hookFP();
        if (done.vt && done.fp) obs.disconnect();
      });
      obs.observe(document.body, { childList: true, subtree: true });
      setTimeout(function() { obs.disconnect(); }, 20000);
    }
  }

  // Toggle PP din topbar (buton HD)
  window._togglePostProcessing = function() {
    var state = window.VTour && window.VTour._state;
    if (!state) return;
    state._composerActive = !state._composerActive;
    if (typeof ss === 'function') {
      ss(state._composerActive ? '✨ Post-processing ON' : '⬜ Post-processing OFF');
    }
  };

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (window.THREE && window.VTour) { cb(); return; }
    setTimeout(function() { waitReady(cb, n + 1); }, 250);
  }

  waitReady(function() {
    _patchViewerForPP();
    console.log('[PostProcessing v1] ✅ Hook activ — se va activa la lansarea viewer-ului');
  });

})();
