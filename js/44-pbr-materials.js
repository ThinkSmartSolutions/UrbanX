// ═══════════════════════════════════════════════════════════════════════════
// 44-pbr-materials.js — Materiale PBR cu texturi REALE din assets/tur3d/pbr/
// UrbanX TSS·FG | v2.0 | Sesiunea 9
//
// TEXTURI REALE 2048×2048px (deja în repo):
//   assets/tur3d/pbr/parchet_stejar/    → podea living/dormitor
//   assets/tur3d/pbr/marble_white/      → podea baie/hol premium
//   assets/tur3d/pbr/blat_bucatarie/    → suprafețe bucătărie
//   assets/tur3d/pbr/tencuiala_interior/→ pereți interiori
//   assets/tur3d/pbr/fabric_canapea/    → mobilier tapițat
//   assets/tur3d/pbr/metal_finish/      → elemente metalice
//   assets/tur3d/pbr/caramida_aparenta/ → accent decorativ
//
// HDRI REALE (deja în repo):
//   assets/tur3d/hdri/interior.hdr      → iluminare zi interioară
//   assets/tur3d/hdri/golden.hdr        → iluminare golden hour
//   assets/tur3d/hdri/exterior.hdr      → iluminare exterioară
//
// MODELE GLTF:
//   assets/models/chair.glb             → SheenChair Khronos (CC BY 4.0)
//   assets/models/lamp.glb              → Lantern Khronos
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var PBR_BASE = 'assets/tur3d/pbr/';
  var HDRI_BASE = 'assets/tur3d/hdri/';
  var MODEL_BASE = 'assets/models/';

  // ── Cache texturi și materiale ─────────────────────────────────────────
  var _texCache = {};
  var _matCache = {};
  var _envMap   = null;

  // ── Loader textură cu cache ────────────────────────────────────────────
  function _loadTex(THREE, path, repeat) {
    repeat = repeat || 4;
    if (_texCache[path]) return _texCache[path];
    var tex = new THREE.TextureLoader().load(
      path,
      function(t) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); t.needsUpdate = true; },
      undefined,
      function(e) { console.warn('[PBR] Textură lipsă:', path); }
    );
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat, repeat);
    _texCache[path] = tex;
    return tex;
  }

  // ── Încărcare HDRI pentru environment map ────────────────────────────────
  function _loadHDRI(THREE, renderer, hdriName, cb) {
    var key = HDRI_BASE + hdriName;
    if (_envMap) { cb(_envMap); return; }

    var pmremGen = new THREE.PMREMGenerator(renderer);
    pmremGen.compileEquirectangularShader();

    var rgbeLoader = new THREE.RGBELoader
      ? new THREE.RGBELoader()
      : null;

    if (!rgbeLoader) {
      // Fallback: gradient env map
      cb(_makeFallbackEnvMap(THREE, renderer, pmremGen));
      return;
    }

    rgbeLoader.load(
      key,
      function(hdrTex) {
        var envMap = pmremGen.fromEquirectangular(hdrTex).texture;
        pmremGen.dispose();
        hdrTex.dispose();
        _envMap = envMap;
        cb(envMap);
      },
      undefined,
      function() {
        console.warn('[PBR] HDRI nu s-a putut încărca, folosim fallback');
        cb(_makeFallbackEnvMap(THREE, renderer, pmremGen));
      }
    );
  }

  function _makeFallbackEnvMap(THREE, renderer, pmremGen) {
    // Env map procedural dacă HDRI nu se încarcă
    var W = 256;
    var cv = document.createElement('canvas');
    cv.width = W * 2; cv.height = W;
    var ctx = cv.getContext('2d');
    var sky = ctx.createLinearGradient(0, 0, 0, W * 0.6);
    sky.addColorStop(0, '#2A4A7F'); sky.addColorStop(1, '#C8DFF0');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W*2, W*0.6);
    // Sol warm
    ctx.fillStyle = '#8A7A60'; ctx.fillRect(0, W*0.6, W*2, W*0.4);
    // Soare
    var sunG = ctx.createRadialGradient(W*1.4, W*0.2, 0, W*1.4, W*0.2, 60);
    sunG.addColorStop(0, 'rgba(255,240,180,1)');
    sunG.addColorStop(1, 'rgba(255,220,100,0)');
    ctx.fillStyle = sunG; ctx.fillRect(0, 0, W*2, W);

    var tex = new THREE.CanvasTexture(cv);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    return pmremGen.fromEquirectangular(tex).texture;
  }

  // ── Creăm materialele PBR complete ────────────────────────────────────
  window._PBR = window._PBR || {};

  window._PBR.createMaterials = function(THREE, renderer) {
    var envMap = _envMap;
    var envIntensity = 1.0;

    function mat(opts) {
      var m = new THREE.MeshPhysicalMaterial(Object.assign({
        envMap: envMap,
        envMapIntensity: envIntensity,
      }, opts));
      return m;
    }

    return {
      // Parchet stejar — living, dormitor, hol
      parchet: mat({
        map:          _loadTex(THREE, PBR_BASE + 'parchet_stejar/diff.jpg', 5),
        normalMap:    _loadTex(THREE, PBR_BASE + 'parchet_stejar/nor_gl.jpg', 5),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'parchet_stejar/rough.jpg', 5),
        aoMap:        _loadTex(THREE, PBR_BASE + 'parchet_stejar/ao.jpg', 5),
        roughness: 0.65, metalness: 0.0,
        clearcoat: 0.35, clearcoatRoughness: 0.15,
      }),

      // Marmură albă — baie, hol premium
      marble: mat({
        map:          _loadTex(THREE, PBR_BASE + 'marble_white/diff.jpg', 3),
        normalMap:    _loadTex(THREE, PBR_BASE + 'marble_white/nor_gl.jpg', 3),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'marble_white/rough.jpg', 3),
        aoMap:        _loadTex(THREE, PBR_BASE + 'marble_white/ao.jpg', 3),
        roughness: 0.12, metalness: 0.05,
        clearcoat: 0.9, clearcoatRoughness: 0.05,
        envMapIntensity: 1.5,
      }),

      // Tencuială interior — pereți
      tencuiala: mat({
        map:          _loadTex(THREE, PBR_BASE + 'tencuiala_interior/diff.jpg', 6),
        normalMap:    _loadTex(THREE, PBR_BASE + 'tencuiala_interior/nor_gl.jpg', 6),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'tencuiala_interior/rough.jpg', 6),
        aoMap:        _loadTex(THREE, PBR_BASE + 'tencuiala_interior/ao.jpg', 6),
        roughness: 0.88, metalness: 0.0,
      }),

      // Tapițerie canapea/scaune
      fabric: mat({
        normalMap:    _loadTex(THREE, PBR_BASE + 'fabric_canapea/nor_gl.jpg', 4),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'fabric_canapea/rough.jpg', 4),
        aoMap:        _loadTex(THREE, PBR_BASE + 'fabric_canapea/ao.jpg', 4),
        color: 0xC8A880, roughness: 0.82, metalness: 0.0,
        sheen: 1.0,
        sheenColor: 0xE0C090,
        sheenRoughness: 0.6,
      }),

      // Metal finisaj — picioare mobilier, mânere
      metal: mat({
        map:          _loadTex(THREE, PBR_BASE + 'metal_finish/diff.jpg', 2),
        normalMap:    _loadTex(THREE, PBR_BASE + 'metal_finish/nor_gl.jpg', 2),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'metal_finish/rough.jpg', 2),
        aoMap:        _loadTex(THREE, PBR_BASE + 'metal_finish/ao.jpg', 2),
        roughness: 0.15, metalness: 0.95,
        clearcoat: 1.0, clearcoatRoughness: 0.05,
        envMapIntensity: 2.0,
      }),

      // Blat bucătărie
      kitchen: mat({
        map:          _loadTex(THREE, PBR_BASE + 'blat_bucatarie/diff.jpg', 3),
        normalMap:    _loadTex(THREE, PBR_BASE + 'blat_bucatarie/nor_gl.jpg', 3),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'blat_bucatarie/rough.jpg', 3),
        aoMap:        _loadTex(THREE, PBR_BASE + 'blat_bucatarie/ao.jpg', 3),
        roughness: 0.2, metalness: 0.1,
        clearcoat: 0.8, clearcoatRoughness: 0.1,
      }),

      // Sticlă — ferestre, balcoane
      glass: new THREE.MeshPhysicalMaterial({
        color: 0xC8E0F0,
        transparent: true, opacity: 0.18,
        roughness: 0.0, metalness: 0.0,
        transmission: 0.96, thickness: 0.5,
        ior: 1.52,
        envMap: envMap, envMapIntensity: 2.0,
        side: THREE.DoubleSide,
      }),

      // Caramidă decorativă
      brick: mat({
        map:          _loadTex(THREE, PBR_BASE + 'caramida_aparenta/diff.jpg', 4),
        normalMap:    _loadTex(THREE, PBR_BASE + 'caramida_aparenta/nor_gl.jpg', 4),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'caramida_aparenta/rough.jpg', 4),
        aoMap:        _loadTex(THREE, PBR_BASE + 'caramida_aparenta/ao.jpg', 4),
        roughness: 0.85, metalness: 0.0,
      }),

      // Plafon alb
      ceiling: mat({
        color: 0xFBFAF8, roughness: 0.92, metalness: 0.0,
        envMapIntensity: 0.3,
      }),

      // Lemn închis pentru mobilier (uși dulap, tv console)
      darkWood: mat({
        map:          _loadTex(THREE, PBR_BASE + 'parchet_stejar/diff.jpg', 2),
        normalMap:    _loadTex(THREE, PBR_BASE + 'parchet_stejar/nor_gl.jpg', 2),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'parchet_stejar/rough.jpg', 2),
        color: 0x3A2010,
        roughness: 0.2, metalness: 0.0,
        clearcoat: 0.9, clearcoatRoughness: 0.05,
      }),
    };
  };

  // ── Inițializare HDRI și materiale ────────────────────────────────────
  window._PBR.init = function(THREE, renderer, cb) {
    // Refolosim env map din 33-photorealism dacă deja e încărcat
    if (window._urbanxEnvMap) {
      _envMap = window._urbanxEnvMap;
      cb(window._PBR.createMaterials(THREE, renderer), _envMap);
      return;
    }
    _loadHDRI(THREE, renderer, 'interior.hdr', function(envMap) {
      _envMap = envMap;
      window._urbanxEnvMap = envMap; // setăm și noi cache-ul
      var mats = window._PBR.createMaterials(THREE, renderer);
      cb(mats, envMap);
    });
  };

  // ── Patch pe VTour.start și startFP ────────────────────────────────────
  function _hookPBR(obj, method) {
    if (!obj || !obj[method] || obj[method]._pbrV2Hooked) return false;
    obj[method]._pbrV2Hooked = true;
    var orig = obj[method];
    obj[method] = function() {
      var result = orig.apply(this, arguments);
      setTimeout(_applyPBR, 1800);
      return result;
    };
    return true;
  }

  function _applyPBR() {
    var state = window.VTour && window.VTour._state;
    if (!state || !state.scene || !state.renderer || state._pbrV2Applied) return;
    // Dacă 33-photorealism deja a upgrat scena, nu facem din nou
    if (state._studioUpgraded) return;
    state._pbrV2Applied = true;

    var THREE = window.THREE;
    if (!THREE) return;

    window._PBR.init(THREE, state.renderer, function(mats, envMap) {
      // Setăm env map pe scenă
      state.scene.environment = envMap;
      state.scene.background = envMap;

      // Upgradăm materialele existente
      var replaced = 0;
      state.scene.traverse(function(obj) {
        if (!obj.isMesh || !obj.material) return;
        var geo = obj.geometry;
        if (!geo) return;
        if (!geo.boundingBox) geo.computeBoundingBox();
        var size = new THREE.Vector3();
        geo.boundingBox.getSize(size);

        var wp = new THREE.Vector3();
        obj.getWorldPosition(wp);

        var isFloor  = size.y < 0.15 && size.x > 0.4;
        var isWall   = size.y > 1.0 && (size.x < 0.25 || size.z < 0.25);
        var isCeiling = size.y < 0.12 && size.x > 0.4 && wp.y > 2.0;

        // Detectăm tipul camerei
        var roomType = _getRoomType(wp);

        if (isFloor) {
          if (roomType === 'bath' || roomType === 'wc') {
            obj.material = mats.marble;
          } else if (roomType === 'kitchen') {
            obj.material = mats.kitchen;
          } else {
            obj.material = mats.parchet;
          }
          replaced++;
        } else if (isWall) {
          obj.material = mats.tencuiala;
          replaced++;
        } else if (isCeiling) {
          obj.material = mats.ceiling;
          replaced++;
        } else {
          // Updatăm env map pe materialele existente
          if (obj.material.isMeshStandardMaterial || obj.material.isMeshPhysicalMaterial) {
            obj.material.envMap = envMap;
            obj.material.envMapIntensity = 0.8;
            obj.material.needsUpdate = true;
          }
        }
      });

      // Adăugăm lumini fotorealiste per cameră
      _addPhotoLights(state, THREE, mats);

      console.log('[PBR v2] ✅ ' + replaced + ' suprafețe cu texturi reale 2048px');
      if (typeof ss === 'function') ss('✅ Materiale PBR reale 2048px aplicate');
    });
  }

  function _getRoomType(wp) {
    var RV = window._RV;
    if (!RV || !RV.floors || !RV.floors[0] || !RV.floors[0].rects) return 'living';
    var state = window.VTour && window.VTour._state;
    var anchor = state && state._anchor;
    if (!anchor) return 'living';
    var ox = anchor.cx - anchor.bW / 2;
    var oz = anchor.cz - anchor.bD / 2;
    var rects = RV.floors[0].rects;
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      var lx = wp.x - ox, lz = wp.z - oz;
      if (lx >= r.x - 0.5 && lx <= r.x + r.w + 0.5 &&
          lz >= r.y - 0.5 && lz <= r.y + r.h + 0.5) {
        return r.t;
      }
    }
    return 'living';
  }

  function _addPhotoLights(state, THREE, mats) {
    var RV = window._RV;
    var anchor = state._anchor;
    if (!RV || !RV.floors || !anchor) return;

    var b = RV.building || {};
    var hNiv = (b.P && b.P.hn) || 3.0;
    var ox = anchor.cx - anchor.bW / 2;
    var oz = anchor.cz - anchor.bD / 2;

    RV.floors.forEach(function(fl, fIdx) {
      if (!fl || !fl.rects || fIdx > 2) return;
      fl.rects.forEach(function(r) {
        if (r.bal || r.w * r.h < 5) return;
        var cx = ox + r.x + r.w / 2;
        var cz = oz + r.y + r.h / 2;
        var baseY = anchor.baseY + fIdx * hNiv;

        // PointLight cald per cameră
        var intensity = r.t === 'bath' ? 0.5 : r.t === 'hall' ? 0.35 : 0.85;
        var color = r.t === 'bath' ? 0xE8F4FF : 0xFFE8C0;
        var pl = new THREE.PointLight(color, intensity, hNiv * 3.2);
        pl.position.set(cx, baseY + hNiv - 0.28, cz);
        pl.castShadow = false; // fără shadow per room (perf)
        state.scene.add(pl);

        // Glob lampă vizibil
        var globe = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 8, 6),
          new THREE.MeshPhysicalMaterial({
            color: 0xFFF8E0, roughness: 0.05,
            emissive: 0xFFE890, emissiveIntensity: 2.0,
            transparent: true, opacity: 0.9,
          })
        );
        globe.position.set(cx, baseY + hNiv - 0.3, cz);
        state.scene.add(globe);
      });
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────
  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (window.THREE && window.VTour) { cb(); return; }
    setTimeout(function() { waitReady(cb, n+1); }, 250);
  }

  waitReady(function() {
    var done = { vt: false, fp: false };
    var obs = new MutationObserver(function() {
      if (!done.vt) done.vt = _hookPBR(window.VTour, 'start');
      if (!done.fp) done.fp = _hookPBR(window.VTourFP, 'startFP');
      if (done.vt && done.fp) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    _hookPBR(window.VTour, 'start');
    _hookPBR(window.VTourFP, 'startFP');
    console.log('[PBR v2] ✅ Texturi reale 2048px + HDRI real activ');
  });

})();
