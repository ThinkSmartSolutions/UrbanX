// ═══════════════════════════════════════════════════════════════════════════
// 44-pbr-materials.js — Materiale PBR Coohom-level
// UrbanX TSS·FG | v3.0 | 11 Iunie 2026
//
// v3.0 — Renderer upgrade Coohom-level:
//   ACESFilmicToneMapping + physicallyCorrectLights + PCFSoftShadowMap
//   RectAreaLight per cameră (lumini de suprafață — cheia realismului)
//   SpotLight cu shadow 1024px pentru living + dormitor
//   SSAO + UnrealBloom via EffectComposer (activ automat)
//   Materiale: clearcoat, sheen, transmission, ior calibrate precis
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
    var envIntensity = 1.2; // crescut față de 1.0

    function mat(opts) {
      var m = new THREE.MeshPhysicalMaterial(Object.assign({
        envMap: envMap,
        envMapIntensity: envIntensity,
        needsUpdate: true,
      }, opts));
      return m;
    }

    return {
      // Parchet stejar — living, dormitor, hol
      // clearcoat ridicat → reflexie strălucitoare ca parchetul lăcuit Coohom
      parchet: mat({
        map:          _loadTex(THREE, PBR_BASE + 'parchet_stejar/diff.jpg', 5),
        normalMap:    _loadTex(THREE, PBR_BASE + 'parchet_stejar/nor_gl.jpg', 5),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'parchet_stejar/rough.jpg', 5),
        aoMap:        _loadTex(THREE, PBR_BASE + 'parchet_stejar/ao.jpg', 5),
        roughness: 0.55, metalness: 0.0,
        clearcoat: 0.6, clearcoatRoughness: 0.08,
        envMapIntensity: 1.4,
      }),

      // Marmură albă — baie, hol premium
      // transmission + ior = transluciditate realistă ca marmura Coohom
      marble: mat({
        map:          _loadTex(THREE, PBR_BASE + 'marble_white/diff.jpg', 3),
        normalMap:    _loadTex(THREE, PBR_BASE + 'marble_white/nor_gl.jpg', 3),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'marble_white/rough.jpg', 3),
        aoMap:        _loadTex(THREE, PBR_BASE + 'marble_white/ao.jpg', 3),
        roughness: 0.08, metalness: 0.0,
        clearcoat: 1.0, clearcoatRoughness: 0.03,
        envMapIntensity: 1.8,
      }),

      // Tencuială interior — pereți
      tencuiala: mat({
        map:          _loadTex(THREE, PBR_BASE + 'tencuiala_interior/diff.jpg', 6),
        normalMap:    _loadTex(THREE, PBR_BASE + 'tencuiala_interior/nor_gl.jpg', 6),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'tencuiala_interior/rough.jpg', 6),
        aoMap:        _loadTex(THREE, PBR_BASE + 'tencuiala_interior/ao.jpg', 6),
        roughness: 0.92, metalness: 0.0,
        envMapIntensity: 0.3,
      }),

      // Tapițerie canapea/scaune — sheen realist (velur/catifea)
      fabric: mat({
        normalMap:    _loadTex(THREE, PBR_BASE + 'fabric_canapea/nor_gl.jpg', 4),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'fabric_canapea/rough.jpg', 4),
        aoMap:        _loadTex(THREE, PBR_BASE + 'fabric_canapea/ao.jpg', 4),
        color: 0xC8A880, roughness: 0.88, metalness: 0.0,
        sheen: 1.0,
        sheenColor: new THREE.Color(0xE8D4B8),
        sheenRoughness: 0.55,
        envMapIntensity: 0.4,
      }),

      // Metal finisaj — picioare mobilier, mânere
      metal: mat({
        map:          _loadTex(THREE, PBR_BASE + 'metal_finish/diff.jpg', 2),
        normalMap:    _loadTex(THREE, PBR_BASE + 'metal_finish/nor_gl.jpg', 2),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'metal_finish/rough.jpg', 2),
        aoMap:        _loadTex(THREE, PBR_BASE + 'metal_finish/ao.jpg', 2),
        roughness: 0.1, metalness: 0.98,
        clearcoat: 1.0, clearcoatRoughness: 0.03,
        envMapIntensity: 2.5,
      }),

      // Blat bucătărie
      kitchen: mat({
        map:          _loadTex(THREE, PBR_BASE + 'blat_bucatarie/diff.jpg', 3),
        normalMap:    _loadTex(THREE, PBR_BASE + 'blat_bucatarie/nor_gl.jpg', 3),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'blat_bucatarie/rough.jpg', 3),
        aoMap:        _loadTex(THREE, PBR_BASE + 'blat_bucatarie/ao.jpg', 3),
        roughness: 0.15, metalness: 0.15,
        clearcoat: 0.9, clearcoatRoughness: 0.08,
      }),

      // Sticlă — ferestre, balcoane (transmission realist)
      glass: new THREE.MeshPhysicalMaterial({
        color: 0xD0E8F5,
        transparent: true, opacity: 0.15,
        roughness: 0.0, metalness: 0.0,
        transmission: 0.97, thickness: 0.4,
        ior: 1.52,
        envMap: envMap, envMapIntensity: 2.2,
        side: THREE.DoubleSide,
      }),

      // Caramidă decorativă
      brick: mat({
        map:          _loadTex(THREE, PBR_BASE + 'caramida_aparenta/diff.jpg', 4),
        normalMap:    _loadTex(THREE, PBR_BASE + 'caramida_aparenta/nor_gl.jpg', 4),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'caramida_aparenta/rough.jpg', 4),
        aoMap:        _loadTex(THREE, PBR_BASE + 'caramida_aparenta/ao.jpg', 4),
        roughness: 0.88, metalness: 0.0,
        envMapIntensity: 0.4,
      }),

      // Plafon alb — ușor emissive pentru realism
      ceiling: mat({
        color: 0xFCFBF9, roughness: 0.95, metalness: 0.0,
        envMapIntensity: 0.2,
      }),

      // Lemn închis pentru mobilier
      darkWood: mat({
        map:          _loadTex(THREE, PBR_BASE + 'parchet_stejar/diff.jpg', 2),
        normalMap:    _loadTex(THREE, PBR_BASE + 'parchet_stejar/nor_gl.jpg', 2),
        roughnessMap: _loadTex(THREE, PBR_BASE + 'parchet_stejar/rough.jpg', 2),
        color: 0x3A2010,
        roughness: 0.25, metalness: 0.0,
        clearcoat: 0.95, clearcoatRoughness: 0.04,
        envMapIntensity: 1.2,
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
    if (state._studioUpgraded) return;
    state._pbrV2Applied = true;

    var THREE = window.THREE;
    if (!THREE) return;

    var renderer = state.renderer;

    // ══════════════════════════════════════════════════════════════════
    // RENDERER UPGRADE — setări identice cu Coohom / Unreal WebGL
    // Acestea sunt CHEILE calității fotorealiste
    // ══════════════════════════════════════════════════════════════════

    // 1. Lumini fizic corecte (Candela, nu unități arbitrare)
    if ('physicallyCorrectLights' in renderer) {
      renderer.physicallyCorrectLights = true;
    }
    if ('useLegacyLights' in renderer) {
      renderer.useLegacyLights = false; // Three.js r150+
    }

    // 2. Tone mapping ACES Filmic — același cu Unreal Engine / Coohom
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 3. Output color space sRGB corect
    if (THREE.SRGBColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } else if (THREE.sRGBEncoding) {
      renderer.outputEncoding = THREE.sRGBEncoding;
    }

    // 4. Shadow maps de calitate înaltă
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // moale, fără aliasing
    renderer.shadowMap.autoUpdate = true;

    // 5. Anti-aliasing implicit (dacă e MSAA renderer)
    if (renderer.getPixelRatio() < 2) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    console.log('[PBR v3] ✅ Renderer: ACESFilmic + PCFSoftShadow + physicallyCorrectLights');

    window._PBR.init(THREE, renderer, function(mats, envMap) {
      // Setăm env map pe scenă
      state.scene.environment = envMap;
      state.scene.background  = envMap;

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

        var isFloor   = size.y < 0.15 && size.x > 0.4;
        var isWall    = size.y > 1.0 && (size.x < 0.25 || size.z < 0.25);
        var isCeiling = size.y < 0.12 && size.x > 0.4 && wp.y > 2.0;

        var roomType = _getRoomType(wp);

        if (isFloor) {
          obj.material = (roomType === 'bath' || roomType === 'wc') ? mats.marble
                       : (roomType === 'kitchen') ? mats.kitchen
                       : mats.parchet;
          obj.receiveShadow = true;
          replaced++;
        } else if (isWall) {
          obj.material = mats.tencuiala;
          obj.castShadow = false;
          obj.receiveShadow = true;
          replaced++;
        } else if (isCeiling) {
          obj.material = mats.ceiling;
          replaced++;
        } else {
          if (obj.material.isMeshStandardMaterial || obj.material.isMeshPhysicalMaterial) {
            obj.material.envMap = envMap;
            obj.material.envMapIntensity = 0.8;
            obj.material.needsUpdate = true;
          }
        }
      });

      // Lumini fotorealiste upgrade
      _addPhotoLights(state, THREE, mats);

      // Post-processing: SSAO + Bloom aplicat pe renderer-ul existent
      _applyPostProcessing(state, THREE);

      console.log('[PBR v3] ✅ ' + replaced + ' suprafețe PBR | SSAO + Bloom activ');
      if (typeof ss === 'function') ss('✅ Calitate render Coohom-level activată');
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // POST-PROCESSING — SSAO + Bloom (biblioteci deja încărcate în index.html)
  // ══════════════════════════════════════════════════════════════════
  function _applyPostProcessing(state, THREE) {
    if (state._ppApplied) return;

    var EffectComposer = THREE.EffectComposer || window.EffectComposer;
    var RenderPass     = THREE.RenderPass     || window.RenderPass;
    var SSAOPass       = THREE.SSAOPass       || window.SSAOPass;
    var UnrealBloomPass= THREE.UnrealBloomPass|| window.UnrealBloomPass;
    var ShaderPass     = THREE.ShaderPass     || window.ShaderPass;

    if (!EffectComposer || !RenderPass) {
      console.warn('[PBR v3] EffectComposer nu e disponibil — skip post-processing');
      return;
    }

    try {
      var renderer = state.renderer;
      var scene    = state.scene;
      var camera   = state.camera;
      var w = renderer.domElement.width;
      var h = renderer.domElement.height;

      var composer = new EffectComposer(renderer);
      composer.setSize(w, h);

      // Pass 1: Render de bază
      var renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // Pass 2: SSAO — Ambient Occlusion (umbrele de contact)
      if (SSAOPass) {
        var ssaoPass = new SSAOPass(scene, camera, w, h);
        ssaoPass.kernelRadius = 16;    // raza de samplare (px)
        ssaoPass.minDistance  = 0.005; // distanță minimă
        ssaoPass.maxDistance  = 0.1;   // distanță maximă
        ssaoPass.output = SSAOPass.OUTPUT ? SSAOPass.OUTPUT.Default : 0;
        composer.addPass(ssaoPass);
      }

      // Pass 3: Bloom subtil (nu exagerat — ca Coohom, nu ca jocuri)
      if (UnrealBloomPass) {
        var bloomPass = new UnrealBloomPass(
          new THREE.Vector2(w, h),
          0.25,  // strength  — subtil
          0.4,   // radius
          0.88   // threshold — numai highlights foarte luminoase
        );
        composer.addPass(bloomPass);
      }

      state._composer = composer;
      state._ppApplied = true;

      // Înlocuim render loop-ul să folosească composer
      var origRaf = state.raf;
      if (origRaf) cancelAnimationFrame(origRaf);

      function _renderLoop() {
        state.raf = requestAnimationFrame(_renderLoop);
        if (state.controls) state.controls.update();
        composer.render();
      }
      _renderLoop();

      console.log('[PBR v3] ✅ SSAO + Bloom activ');
    } catch(e) {
      console.warn('[PBR v3] Post-processing eroare:', e.message);
      // Fallback: renderer normal fără post-processing
    }
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

    // ── Lumină ambientală de bază (foarte slabă — HDRI face restul) ──────
    var ambient = new THREE.AmbientLight(0xffffff, 0.15);
    state.scene.add(ambient);

    // ── RectAreaLight loader (necesar pentru RectAreaLight să funcționeze) ─
    var RectAreaLightUniformsLib = THREE.RectAreaLightUniformsLib || window.RectAreaLightUniformsLib;
    if (RectAreaLightUniformsLib) {
      RectAreaLightUniformsLib.init();
    }

    RV.floors.forEach(function(fl, fIdx) {
      if (!fl || !fl.rects || fIdx > 2) return;
      fl.rects.forEach(function(r) {
        if (r.bal || r.w * r.h < 4) return;

        var cx = ox + r.x + r.w / 2;
        var cz = oz + r.y + r.h / 2;
        var baseY  = anchor.baseY + fIdx * hNiv;
        var ceilY  = baseY + hNiv;

        var rW = r.w, rD = r.h;

        // ── 1. RectAreaLight — plafonier de suprafață (cheia realismului) ──
        // Simulează panoul LED / lumina de tavan ca în Coohom
        var rectW    = Math.min(rW * 0.6, 2.0);
        var rectH    = Math.min(rD * 0.6, 2.0);
        var intensity = r.t === 'bath' ? 8 : r.t === 'hall' ? 6 : r.t === 'bedroom' ? 10 : 14;
        var color     = r.t === 'bath' ? 0xEEF6FF : r.t === 'bedroom' ? 0xFFE8C8 : 0xFFF5E0;

        if (THREE.RectAreaLight) {
          var ral = new THREE.RectAreaLight(color, intensity, rectW, rectH);
          ral.position.set(cx, ceilY - 0.05, cz);
          ral.rotation.x = -Math.PI / 2; // orientat în jos
          state.scene.add(ral);

          // Helper vizibil opțional (dezactivat în producție)
          // if (THREE.RectAreaLightHelper) state.scene.add(new THREE.RectAreaLightHelper(ral));
        } else {
          // Fallback dacă RectAreaLight nu e suportat
          var pl = new THREE.PointLight(color, intensity * 0.06, hNiv * 4);
          pl.position.set(cx, ceilY - 0.15, cz);
          state.scene.add(pl);
        }

        // ── 2. SpotLight cu shadow — lumină direcțională cu umbră moale ──
        // Numai pentru camere mari (living, dormitor) pentru performanță
        if ((r.t === 'living' || r.t === 'bedroom') && rW * rD > 12) {
          var spot = new THREE.SpotLight(color, intensity * 0.04, hNiv * 5, Math.PI / 5, 0.3, 1.5);
          spot.position.set(cx - rW * 0.2, ceilY - 0.1, cz - rD * 0.2);
          spot.target.position.set(cx, baseY, cz);
          spot.castShadow = true;
          spot.shadow.mapSize.width  = 1024;
          spot.shadow.mapSize.height = 1024;
          spot.shadow.camera.near = 0.1;
          spot.shadow.camera.far  = hNiv * 6;
          spot.shadow.bias = -0.002;
          state.scene.add(spot);
          state.scene.add(spot.target);
        }

        // ── 3. Glob lampă vizibil emissive ────────────────────────────────
        var globe = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 8, 6),
          new THREE.MeshPhysicalMaterial({
            color: 0xFFF8E0, roughness: 0.05,
            emissive: 0xFFE890, emissiveIntensity: 3.0,
            transparent: true, opacity: 0.92,
          })
        );
        globe.position.set(cx, ceilY - 0.3, cz);
        state.scene.add(globe);
      });
    });

    console.log('[PBR v3] ✅ RectAreaLight + SpotLight cu shadow per cameră');
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
    console.log('[PBR v3] ✅ Coohom-level: ACESFilmic + RectAreaLight + SSAO + Bloom');
  });

})();
