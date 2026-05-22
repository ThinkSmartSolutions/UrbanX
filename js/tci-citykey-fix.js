/**
 * UrbanX — TCI cityKey Fix v20260522
 *
 * Problemă 1: TCI Cinematic pornește mereu pe Iași indiferent de UAT selectat
 * Cauza: tci-cinematic-scenes.js / _SceneEngine.launch() citește cityKey la init
 *        din cache intern, nu din localStorage live
 *
 * Problemă 2: Pe mobil, de la scena 4 ecranul devine roșu și blochează
 * Cauza: Three.js r128 WebGL context nu se resetează între scene 3D
 *        Canvas-ul rămâne cu ultima culoare de fundal (roșu din heatmap)
 *
 * Soluție:
 *  1. Interceptăm TCI.open / openTCI / _SceneEngine.launch și injectăm cityKey corect
 *  2. Forțăm _SceneEngine._cityData refresh la fiecare launch
 *  3. Resetăm WebGL canvas la finalul scenelor 3D
 *  4. Patch defensiv pe _getCityKey pentru citire live din localStorage
 */
(function () {
  'use strict';

  function _getCurrentCityKey() {
    return (window.TCI && window.TCI.cityKey) ||
           localStorage.getItem('ux_last_city') ||
           'RO-IS-01';
  }

  // ── 1. Patch _SceneEngine.launch — forțează cityKey corect ───────────────
  function _patchSceneEngine(tries) {
    if (++tries > 60) return;
    const SE = window._SceneEngine;
    if (!SE) return setTimeout(function () { _patchSceneEngine(tries); }, 300);
    if (SE._cityKeyFixed) return;
    SE._cityKeyFixed = true;

    // Patch launch
    const origLaunch = SE.launch;
    if (origLaunch) {
      SE.launch = function (cityKeyArg) {
        // Ignorăm cityKeyArg dacă e hardcodat Iași și există altul în localStorage
        const lsKey = _getCurrentCityKey();
        const useKey = (cityKeyArg && cityKeyArg !== 'RO-IS-01') ? cityKeyArg : lsKey;

        // Resetăm _cityData ca să forțăm re-fetch pe UAT corect
        if (SE._cityData && SE._cityData._cityKey !== useKey) {
          SE._cityData = null;
          console.log('[TCI-Fix] Reset _cityData pentru UAT:', useKey);
        }

        // Setăm cityKey peste tot
        if (window.TCI) window.TCI.cityKey = useKey;
        localStorage.setItem('ux_last_city', useKey);
        if (SE._cityKey !== undefined) SE._cityKey = useKey;

        try {
          return origLaunch.call(this, useKey);
        } catch (e) {
          console.warn('[TCI-Fix] launch error:', e.message);
          // Skip la scena 1 la eroare critică
          if (SE._currentScene != null && SE._scenes) {
            SE._currentScene = 0;
          }
        }
      };
    }

    // Patch getCityKey / _getCityKey
    ['_getCityKey', 'getCityKey'].forEach(function (m) {
      if (typeof SE[m] === 'function' && !SE['_fixed_' + m]) {
        SE['_fixed_' + m] = true;
        SE[m] = function () { return _getCurrentCityKey(); };
      }
    });

    console.log('[TCI-Fix] ✅ _SceneEngine.launch patched pentru UAT dinamic');
  }

  // ── 2. Patch openTCI global ───────────────────────────────────────────────
  function _patchOpenTCI(tries) {
    if (++tries > 40) return;
    if (typeof window.openTCI !== 'function') {
      return setTimeout(function () { _patchOpenTCI(tries); }, 250);
    }
    if (window.openTCI._cityKeyFixed) return;
    window.openTCI._cityKeyFixed = true;

    const origOpen = window.openTCI;
    window.openTCI = function (opts) {
      const k = _getCurrentCityKey();
      if (window.TCI) window.TCI.cityKey = k;
      // Asigurăm că _SceneEngine are cityKey corect înainte de open
      if (window._SceneEngine) {
        window._SceneEngine._cityKey = k;
        if (window._SceneEngine._cityData && window._SceneEngine._cityData._cityKey !== k) {
          window._SceneEngine._cityData = null;
        }
      }
      return origOpen.call(this, opts);
    };
    console.log('[TCI-Fix] ✅ openTCI wrapped pentru cityKey dinamic');
  }

  // ── 3. Fix WebGL / Three.js canvas roșu pe mobil ─────────────────────────
  // Problema: scena 3D (presiune construire - barele roșii) setează
  // clearColor la roșu și nu îl resetează la finalul scenei
  function _patchWebGLReset(tries) {
    if (++tries > 40) return;
    const SE = window._SceneEngine;
    if (!SE) return setTimeout(function () { _patchWebGLReset(tries); }, 300);
    if (SE._webglFixed) return;
    SE._webglFixed = true;

    // Patch _nextScene / nextScene pentru reset canvas după scene 3D
    ['_nextScene', 'nextScene', '_endScene'].forEach(function (m) {
      if (typeof SE[m] === 'function' && !SE['_wgl_' + m]) {
        SE['_wgl_' + m] = true;
        const orig = SE[m];
        SE[m] = function () {
          _resetWebGLCanvas();
          try { return orig.apply(this, arguments); } catch (e) {
            console.warn('[TCI-Fix] ' + m + ' error:', e.message);
          }
        };
      }
    });

    console.log('[TCI-Fix] ✅ WebGL canvas reset patched pentru mobile');
  }

  function _resetWebGLCanvas() {
    try {
      // Three.js renderer
      if (window._renderer && window._renderer.setClearColor) {
        window._renderer.setClearColor(0x0b0f1a, 0); // fundal transparent/dark
        window._renderer.clear();
      }
      // Canvas direct
      const canvases = document.querySelectorAll('canvas');
      canvases.forEach(function (c) {
        if (c.style.zIndex > 5) return; // skip harta Mapbox
        const gl = c.getContext('webgl') || c.getContext('webgl2');
        if (gl) {
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        // 2D fallback
        const ctx2d = c.getContext('2d');
        if (ctx2d) {
          ctx2d.clearRect(0, 0, c.width, c.height);
        }
      });
    } catch (_) {}
  }

  // ── 4. Patch TCI.cityKey setter — sincronizare bidirectionala ────────────
  function _hookCityKey(tries) {
    if (++tries > 40) return;
    if (!window.TCI) return setTimeout(function () { _hookCityKey(tries); }, 250);
    if (window.TCI._cityKeyHooked) return;
    window.TCI._cityKeyHooked = true;

    let _cityKeyVal = window.TCI.cityKey || _getCurrentCityKey();

    try {
      Object.defineProperty(window.TCI, 'cityKey', {
        get: function () {
          return _cityKeyVal || localStorage.getItem('ux_last_city') || 'RO-IS-01';
        },
        set: function (v) {
          if (!v) return;
          _cityKeyVal = v;
          localStorage.setItem('ux_last_city', v);
          // Sync _SceneEngine
          if (window._SceneEngine) {
            window._SceneEngine._cityKey = v;
            if (window._SceneEngine._cityData &&
                window._SceneEngine._cityData._cityKey !== v) {
              window._SceneEngine._cityData = null;
            }
          }
          console.log('[TCI-Fix] cityKey setat:', v);
        },
        configurable: true,
      });
      console.log('[TCI-Fix] ✅ TCI.cityKey getter/setter activ');
    } catch (e) {
      console.warn('[TCI-Fix] defineProperty failed (deja definit):', e.message);
    }
  }

  // ── Aplicare ─────────────────────────────────────────────────────────────
  _patchOpenTCI(0);
  _hookCityKey(0);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(function () {
        _patchSceneEngine(0);
        _patchWebGLReset(0);
      }, 600);
    });
  } else {
    setTimeout(function () {
      _patchSceneEngine(0);
      _patchWebGLReset(0);
    }, 600);
  }

  window.addEventListener('load', function () {
    setTimeout(function () {
      _patchSceneEngine(0);
      _patchWebGLReset(0);
    }, 1000);
  });

  console.log('[TCI-Fix] v20260522 încărcat — UAT dinamic + WebGL reset');
})();
