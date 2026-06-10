// ═══════════════════════════════════════════════════════════════════════════
// 47-render4k.js — Render 4K Fotorealist cu texturi REALE
// UrbanX TSS·FG | v2.0 | Sesiunea 9
//
// Folosește:
//   assets/tur3d/pbr/     — texturi 2048×2048px reale
//   assets/tur3d/hdri/    — HDRI reale pentru iluminare globală
//   assets/models/        — modele GLTF pentru mobilier
//
// Tehnică: Tiled Progressive Rendering 4K
//   16 tiles × 1024px → 4096×4096 output final
//   MeshPhysicalMaterial: clearcoat + transmission + sheen
//   Shadows PCFSoft 4096px
//   SSAA 2× supersampling
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var CFG = {
    tileSize: 1024,
    tilesX: 4, tilesY: 4,
    ssaa: 2,
    shadowSize: 4096,
    fov: 38,
  };

  var PBR  = 'assets/tur3d/pbr/';
  var HDRI = 'assets/tur3d/hdri/';
  var MDL  = 'assets/models/';

  // ── Butonul render HD este în 33-photorealism.js — nu duplicăm ────────
  // function _inject() — DEZACTIVAT (33-photorealism are butonul)
  function _inject() { return; // dezactivat
    var _try = function() {
      var menu = document.getElementById('ts-explore-menu');
      if (!menu || document.getElementById('btn-render4k-v2')) return false;
      var btn = document.createElement('div');
      btn.id = 'btn-render4k-v2';
      btn.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 14px;cursor:pointer;border-radius:6px;transition:background .15s;';
      btn.innerHTML = '<span style="font-size:16px">⭐</span><div>' +
        '<div style="font-size:12px;font-weight:700;color:#E2E8F0">Render HD 4K</div>' +
        '<div style="font-size:10px;color:#64748B">Fotorealist · Texturi reale · Export PNG</div></div>';
      btn.onmouseover = function() { btn.style.background='rgba(255,255,255,.06)'; };
      btn.onmouseout  = function() { btn.style.background=''; };
      btn.onclick = function() { menu.style.display='none'; _launch4K(); };
      menu.appendChild(btn);
      return true;
    };
    if (!_try()) {
      var obs = new MutationObserver(function() { if(_try()) obs.disconnect(); });
      obs.observe(document.body, { childList:true, subtree:true });
    }
  }

  // ── UI ───────────────────────────────────────────────────────────────
  function _showUI() {
    var old = document.getElementById('render4k-v2-ui');
    if (old) old.remove();
    var ui = document.createElement('div');
    ui.id = 'render4k-v2-ui';
    ui.style.cssText = [
      'position:fixed;inset:0;z-index:9999999',
      'background:rgba(4,8,18,.98)',
      'display:flex;flex-direction:column;align-items:center;justify-content:center',
      'font-family:IBM Plex Mono,monospace',
    ].join(';');
    ui.innerHTML = [
      '<div style="text-align:center;max-width:520px;padding:40px;width:100%">',
        '<div style="font-size:48px;margin-bottom:12px">⭐</div>',
        '<div style="font-size:24px;font-weight:800;color:#F5C518;margin-bottom:6px">Render HD 4K</div>',
        '<div style="font-size:11px;color:#475569;margin-bottom:8px">',
          'Texturi PBR reale 2048px · HDRI · MeshPhysical · 4096×4096px',
        '</div>',
        '<div id="r4k-stage" style="font-size:10px;color:#F5C518;margin-bottom:20px;min-height:16px"></div>',
        '<div style="width:100%;background:rgba(255,255,255,.07);border-radius:8px;overflow:hidden;margin-bottom:8px">',
          '<div id="r4k-bar" style="height:10px;width:0%;background:linear-gradient(90deg,#F5C518,#FF8C00);border-radius:8px;transition:width .25s"></div>',
        '</div>',
        '<div id="r4k-pct" style="font-size:11px;color:#64748B;margin-bottom:24px">0%</div>',
        '<div id="r4k-preview" style="display:none;margin-bottom:20px;border-radius:12px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.8)">',
          '<img id="r4k-img" style="max-width:100%;display:block">',
        '</div>',
        '<div id="r4k-btns" style="display:none;gap:10px;justify-content:center">',
          '<button id="r4k-dl" style="padding:11px 26px;border-radius:8px;background:linear-gradient(135deg,#F5C518,#FF8C00);',
            'color:#000;border:none;font-weight:800;font-size:13px;cursor:pointer;font-family:inherit">',
            '⬇ Descarcă PNG 4K',
          '</button>',
          '<button onclick="document.getElementById(\'render4k-v2-ui\').remove()" ',
            'style="padding:11px 20px;border-radius:8px;background:rgba(255,255,255,.07);',
            'color:#94A3B8;border:none;cursor:pointer;font-size:13px;font-family:inherit">✕ Închide</button>',
        '</div>',
      '</div>',
    ].join('');
    document.body.appendChild(ui);
    return ui;
  }

  function _progress(pct, stage) {
    var bar = document.getElementById('r4k-bar');
    var pctEl = document.getElementById('r4k-pct');
    var stEl = document.getElementById('r4k-stage');
    if (bar) bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = Math.round(pct) + '%';
    if (stEl && stage) stEl.textContent = stage;
  }

  // ── Launch ────────────────────────────────────────────────────────────
  async function _launch4K() {
    var THREE = window.THREE;
    if (!THREE) { alert('Three.js indisponibil'); return; }

    _showUI();
    _progress(2, 'Inițializare renderer...');

    try {
      // ── RENDERER DEDICAT 4K ─────────────────────────────────────────
      var tW = CFG.tileSize * CFG.ssaa;
      var tH = CFG.tileSize * CFG.ssaa;
      var offCanvas = document.createElement('canvas');
      offCanvas.width = tW; offCanvas.height = tH;

      var renderer = new THREE.WebGLRenderer({
        canvas: offCanvas,
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(1);
      renderer.setSize(tW, tH, false);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
      else if (THREE.LinearSRGBColorSpace !== undefined) renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.localClippingEnabled = true;

      _progress(5, 'Construiesc scena fotorealistă...');

      // ── SCENĂ ────────────────────────────────────────────────────────
      var scene = new THREE.Scene();

      // HDRI real
      var pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      var envMap = await _loadHDRI(THREE, renderer, pmrem);
      scene.environment = envMap;
      scene.background  = envMap;
      _progress(15, 'HDRI încărcat...');

      // Materiale cu texturi reale
      var mats = _buildMaterials(THREE, envMap);
      _progress(20, 'Materiale PBR 2048px...');

      // Structura clădirii
      var anchor = (window.VTour && window.VTour._state && window.VTour._state._anchor) ||
                   window._rvGetAnchor && window._rvGetAnchor();
      var RV = window._RV;
      _buildBuilding(scene, THREE, mats, anchor, RV);
      _progress(35, 'Clădire construită...');

      // Iluminare
      _buildLighting(scene, THREE, anchor, RV);
      _progress(42, 'Iluminare configurată...');

      // Mobilier GLTF
      await _loadFurniture(scene, THREE, mats, anchor, RV);
      _progress(55, 'Mobilier GLTF încărcat...');

      // Exterior
      _buildExterior(scene, THREE, mats, anchor, RV);
      _progress(60, 'Exterior construit...');

      // ── CAMERA ───────────────────────────────────────────────────────
      var b = (RV && RV.building) || {};
      var niv = b.niv || 3;
      var hNiv = (b.P && b.P.hn) || 3.0;
      var H = niv * hNiv;
      var bW = (anchor && anchor.bW) || b.bW || 20;
      var bD = (anchor && anchor.bD) || b.bD || 15;
      var cx = (anchor && anchor.cx) || 0;
      var cy = (anchor && anchor.baseY) || 0;
      var cz = (anchor && anchor.cz) || 0;

      var totalW = CFG.tileSize * CFG.tilesX;
      var totalH = CFG.tileSize * CFG.tilesY;
      var camera = new THREE.PerspectiveCamera(CFG.fov, totalW/totalH, 0.1, 800);
      var dist = Math.max(bW, H) * 1.9;
      camera.position.set(cx, cy + H * 0.5, cz + dist);
      camera.lookAt(cx, cy + H * 0.45, cz);

      // ── TILED RENDER 4×4 ─────────────────────────────────────────────
      var finalCanvas = document.createElement('canvas');
      finalCanvas.width  = totalW;
      finalCanvas.height = totalH;
      var finalCtx = finalCanvas.getContext('2d');

      var tilesDone = 0;
      var tilesTotal = CFG.tilesX * CFG.tilesY;

      for (var ty = 0; ty < CFG.tilesY; ty++) {
        for (var tx = 0; tx < CFG.tilesX; tx++) {
          tilesDone++;
          var tilePct = 60 + (tilesDone / tilesTotal) * 35;
          _progress(tilePct,
            'Tile ' + tilesDone + '/' + tilesTotal +
            ' [' + (tx+1) + ',' + (ty+1) + '] — ' +
            (CFG.tileSize * (tx+1)) + '×' + (CFG.tileSize * (ty+1)) + 'px'
          );

          // ViewOffset per tile
          camera.setViewOffset(
            totalW * CFG.ssaa, totalH * CFG.ssaa,
            tx * CFG.tileSize * CFG.ssaa,
            ty * CFG.tileSize * CFG.ssaa,
            CFG.tileSize * CFG.ssaa, CFG.tileSize * CFG.ssaa
          );
          renderer.render(scene, camera);

          // Downsample SSAA
          var downCanvas = document.createElement('canvas');
          downCanvas.width = CFG.tileSize; downCanvas.height = CFG.tileSize;
          var dCtx = downCanvas.getContext('2d');
          dCtx.drawImage(offCanvas, 0, 0, CFG.tileSize, CFG.tileSize);

          finalCtx.drawImage(downCanvas, tx * CFG.tileSize, ty * CFG.tileSize);
          await new Promise(function(r) { setTimeout(r, 8); });
        }
      }

      camera.clearViewOffset();

      _progress(96, 'Finalizez...');

      // Afișăm rezultatul
      var dataURL = finalCanvas.toDataURL('image/png');
      var img = document.getElementById('r4k-img');
      if (img) img.src = dataURL;
      var prev = document.getElementById('r4k-preview');
      if (prev) prev.style.display = 'block';
      var btns = document.getElementById('r4k-btns');
      if (btns) btns.style.display = 'flex';
      var dlBtn = document.getElementById('r4k-dl');
      if (dlBtn) dlBtn.onclick = function() {
        var a = document.createElement('a');
        a.href = dataURL;
        a.download = 'UrbanX_Render4K_' + Date.now() + '.png';
        a.click();
      };

      _progress(100, '✅ Render complet — ' + totalW + '×' + totalH + 'px');

      // Cleanup
      renderer.dispose();
      scene.traverse(function(obj) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          var mts = Array.isArray(obj.material) ? obj.material : [obj.material];
          mts.forEach(function(m) { m.dispose(); });
        }
      });

    } catch(err) {
      _progress(0, '❌ ' + err.message);
      console.error('[Render4K v2]', err);
    }
  }

  // ── HDRI ─────────────────────────────────────────────────────────────
  function _loadHDRI(THREE, renderer, pmrem) {
    return new Promise(function(resolve) {
      // Refolosim env map din 33-photorealism dacă deja e încărcat
      if (window._urbanxEnvMap) { resolve(window._urbanxEnvMap); return; }
      var RGBELoader = THREE.RGBELoader;
      if (!RGBELoader) {
        resolve(_fallbackEnvMap(THREE, renderer, pmrem));
        return;
      }
      new RGBELoader().load(
        HDRI + 'interior.hdr',
        function(hdr) {
          var env = pmrem.fromEquirectangular(hdr).texture;
          pmrem.dispose(); hdr.dispose();
          window._urbanxEnvMap = env;
          resolve(env);
        },
        undefined,
        function() { resolve(_fallbackEnvMap(THREE, renderer, pmrem)); }
      );
    });
  }

  function _fallbackEnvMap(THREE, renderer, pmrem) {
    var cv = document.createElement('canvas');
    cv.width = 512; cv.height = 256;
    var ctx = cv.getContext('2d');
    var sky = ctx.createLinearGradient(0,0,0,256*.6);
    sky.addColorStop(0,'#253560'); sky.addColorStop(1,'#8AB4D0');
    ctx.fillStyle=sky; ctx.fillRect(0,0,512,256*.6);
    ctx.fillStyle='#7A8070'; ctx.fillRect(0,256*.6,512,256*.4);
    var sunG=ctx.createRadialGradient(380,60,0,380,60,80);
    sunG.addColorStop(0,'rgba(255,240,200,0.9)'); sunG.addColorStop(1,'rgba(255,220,100,0)');
    ctx.fillStyle=sunG; ctx.fillRect(0,0,512,256);
    var tex=new THREE.CanvasTexture(cv);
    tex.mapping=THREE.EquirectangularReflectionMapping;
    return pmrem.fromEquirectangular(tex).texture;
  }

  // ── MATERIALE ──────────────────────────────────────────────────────────
  function _loadTex(THREE, path, repeat) {
    var t = new THREE.TextureLoader().load(path, function(tx) {
      tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
      tx.repeat.set(repeat||4, repeat||4);
      tx.needsUpdate = true;
    });
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat||4, repeat||4);
    return t;
  }

  function _buildMaterials(THREE, envMap) {
    var env = envMap;
    function mp(o) {
      return new THREE.MeshPhysicalMaterial(
        Object.assign({ envMap: env, envMapIntensity: 1.0 }, o)
      );
    }
    return {
      parchet: mp({
        map:          _loadTex(THREE, PBR+'parchet_stejar/diff.jpg', 5),
        normalMap:    _loadTex(THREE, PBR+'parchet_stejar/nor_gl.jpg', 5),
        roughnessMap: _loadTex(THREE, PBR+'parchet_stejar/rough.jpg', 5),
        aoMap:        _loadTex(THREE, PBR+'parchet_stejar/ao.jpg', 5),
        roughness:.6, metalness:0,
        clearcoat:.3, clearcoatRoughness:.12,
      }),
      marble: mp({
        map:          _loadTex(THREE, PBR+'marble_white/diff.jpg', 3),
        normalMap:    _loadTex(THREE, PBR+'marble_white/nor_gl.jpg', 3),
        roughnessMap: _loadTex(THREE, PBR+'marble_white/rough.jpg', 3),
        aoMap:        _loadTex(THREE, PBR+'marble_white/ao.jpg', 3),
        roughness:.1, metalness:.05,
        clearcoat:1.0, clearcoatRoughness:.04,
        envMapIntensity: 1.8,
      }),
      tencuiala: mp({
        map:          _loadTex(THREE, PBR+'tencuiala_interior/diff.jpg', 6),
        normalMap:    _loadTex(THREE, PBR+'tencuiala_interior/nor_gl.jpg', 6),
        roughnessMap: _loadTex(THREE, PBR+'tencuiala_interior/rough.jpg', 6),
        roughness:.88, metalness:0,
      }),
      fabric: mp({
        normalMap:    _loadTex(THREE, PBR+'fabric_canapea/nor_gl.jpg', 4),
        roughnessMap: _loadTex(THREE, PBR+'fabric_canapea/rough.jpg', 4),
        color: 0xC8A070, roughness:.82, metalness:0,
        sheen:1.0, sheenColor: 0xE0C080, sheenRoughness:.55,
      }),
      metal: mp({
        map:          _loadTex(THREE, PBR+'metal_finish/diff.jpg', 2),
        normalMap:    _loadTex(THREE, PBR+'metal_finish/nor_gl.jpg', 2),
        roughnessMap: _loadTex(THREE, PBR+'metal_finish/rough.jpg', 2),
        roughness:.12, metalness:.98,
        clearcoat:1.0, clearcoatRoughness:.04,
        envMapIntensity: 2.5,
      }),
      kitchen: mp({
        map:          _loadTex(THREE, PBR+'blat_bucatarie/diff.jpg', 3),
        normalMap:    _loadTex(THREE, PBR+'blat_bucatarie/nor_gl.jpg', 3),
        roughnessMap: _loadTex(THREE, PBR+'blat_bucatarie/rough.jpg', 3),
        roughness:.18, metalness:.12,
        clearcoat:.85, clearcoatRoughness:.08,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color:0xC8E8F8, transparent:true, opacity:.15,
        roughness:0, metalness:0,
        transmission:.97, thickness:.5, ior:1.52,
        envMap: envMap, envMapIntensity:2.2,
        side: THREE.DoubleSide,
      }),
      ceiling: mp({ color:0xFCFBF8, roughness:.9, metalness:0, envMapIntensity:.2 }),
      darkWood: mp({
        map: _loadTex(THREE, PBR+'parchet_stejar/diff.jpg', 2),
        normalMap: _loadTex(THREE, PBR+'parchet_stejar/nor_gl.jpg', 2),
        roughnessMap: _loadTex(THREE, PBR+'parchet_stejar/rough.jpg', 2),
        color:0x3A2010, roughness:.18, metalness:0,
        clearcoat:.95, clearcoatRoughness:.04,
      }),
    };
  }

  // ── CLĂDIRE ────────────────────────────────────────────────────────────
  function _buildBuilding(scene, THREE, mats, anchor, RV) {
    if (!anchor || !RV || !RV.building) return;
    var b = RV.building;
    var hNiv = (b.P && b.P.hn) || 3.0;
    var niv  = b.niv || 3;
    var ox = anchor.cx - anchor.bW / 2;
    var oz = anchor.cz - anchor.bD / 2;

    if (!RV.floors) return;
    RV.floors.forEach(function(fl, fIdx) {
      if (!fl || !fl.rects || fIdx > niv-1) return;
      var baseY = anchor.baseY + fIdx * hNiv;

      fl.rects.forEach(function(r) {
        var cx2 = ox + r.x + r.w / 2;
        var cz2 = oz + r.y + r.h / 2;

        if (r.bal) {
          // Balcon
          var bf = new THREE.Mesh(new THREE.BoxGeometry(r.w, 0.16, r.h),
            new THREE.MeshPhysicalMaterial({ color:0xCCD8E0, roughness:.6, envMap: mats.marble.envMap }));
          bf.position.set(cx2, baseY+.08, cz2); bf.receiveShadow=true; scene.add(bf);
          var par = new THREE.Mesh(new THREE.BoxGeometry(r.w, 1.1, .05), mats.glass);
          par.position.set(cx2, baseY+.55, cz2-r.h/2); scene.add(par);
          return;
        }

        // Podea
        var floorMat = (r.t==='bath'||r.t==='wc') ? mats.marble :
                       (r.t==='kitchen' ? mats.kitchen : mats.parchet);
        var floor = new THREE.Mesh(new THREE.BoxGeometry(r.w, .12, r.h), floorMat);
        floor.position.set(cx2, baseY+.06, cz2);
        floor.receiveShadow = true; scene.add(floor);

        // Tavan
        var ceil = new THREE.Mesh(new THREE.BoxGeometry(r.w, .08, r.h), mats.ceiling);
        ceil.position.set(cx2, baseY+hNiv-.04, cz2); scene.add(ceil);

        // Pereți
        var wT=.12, wH=hNiv-.2;
        [[r.w+wT*2, wT, cx2, cz2-r.h/2-wT/2],
         [r.w+wT*2, wT, cx2, cz2+r.h/2+wT/2],
         [wT, r.h, cx2-r.w/2-wT/2, cz2],
         [wT, r.h, cx2+r.w/2+wT/2, cz2]].forEach(function(w) {
          var wall = new THREE.Mesh(new THREE.BoxGeometry(w[0], wH, w[1]), mats.tencuiala);
          wall.position.set(w[2], baseY+.1+wH/2, w[3]);
          wall.castShadow=true; wall.receiveShadow=true; scene.add(wall);
        });

        // Fereastră
        if (r.t!=='hall' && r.t!=='core' && r.t!=='storage') {
          var wW=Math.min(r.w*.5,1.55), wH2=hNiv*.5;
          var win = new THREE.Mesh(new THREE.BoxGeometry(wW, wH2, .05), mats.glass);
          win.position.set(cx2, baseY+hNiv*.55, cz2+r.h/2+.04);
          scene.add(win);
          // SpotLight lumina naturală prin fereastră
          if (fIdx===0 && (r.t==='living'||r.t==='bedroom')) {
            var sp = new THREE.SpotLight(0xFFF5E0, 2.2, hNiv*4, Math.PI/7, .35);
            sp.position.set(cx2+r.w*.3, baseY+hNiv-.4, cz2+r.h/2+.5);
            sp.target.position.set(cx2, baseY+.15, cz2);
            sp.castShadow=true; sp.shadow.mapSize.width=sp.shadow.mapSize.height=1024;
            scene.add(sp); scene.add(sp.target);
          }
        }
      });
    });

    // Planșee vizibile
    for (var i=1; i<niv; i++) {
      var slab = new THREE.Mesh(
        new THREE.BoxGeometry(b.bW, .22, b.bD),
        new THREE.MeshPhysicalMaterial({ color:0xD0C8BE, roughness:.9 })
      );
      slab.position.set(anchor.cx, anchor.baseY+i*hNiv-.11, anchor.cz);
      slab.receiveShadow=true; scene.add(slab);
    }
  }

  // ── ILUMINARE ─────────────────────────────────────────────────────────
  function _buildLighting(scene, THREE, anchor, RV) {
    if (!anchor) return;
    var b = (RV && RV.building) || {};

    // Soare principal
    var sun = new THREE.DirectionalLight(0xFFF5E0, 3.8);
    sun.position.set(anchor.cx+35, anchor.baseY+70, anchor.cz+25);
    sun.castShadow=true;
    sun.shadow.mapSize.width = sun.shadow.mapSize.height = CFG.shadowSize;
    var ext = Math.max(b.bW||20, b.bD||15)*1.8;
    sun.shadow.camera.left=-ext; sun.shadow.camera.right=ext;
    sun.shadow.camera.top=ext; sun.shadow.camera.bottom=-ext;
    sun.shadow.camera.far=300; sun.shadow.bias=-.0003; sun.shadow.normalBias=.04;
    scene.add(sun);

    // Fill light
    var fill = new THREE.DirectionalLight(0xC8E0FF, 1.0);
    fill.position.set(anchor.cx-25, anchor.baseY+40, anchor.cz-30);
    scene.add(fill);

    // Ambient hemi
    scene.add(new THREE.HemisphereLight(0xC8E0F0, 0x886050, 0.7));

    // Lumini per cameră
    if (RV && RV.floors) {
      var hNiv=(b.P&&b.P.hn)||3;
      var ox=anchor.cx-anchor.bW/2, oz=anchor.cz-anchor.bD/2;
      RV.floors.forEach(function(fl,fIdx) {
        if (!fl||!fl.rects||fIdx>2) return;
        fl.rects.forEach(function(r) {
          if (r.bal||r.w*r.h<5) return;
          var baseY=anchor.baseY+fIdx*hNiv;
          var pl=new THREE.PointLight(r.t==='bath'?0xE8F4FF:0xFFE8C0,
            r.t==='bath'?.5:.8, hNiv*3);
          pl.position.set(ox+r.x+r.w/2, baseY+hNiv-.25, oz+r.y+r.h/2);
          scene.add(pl);
          // Glob lampă
          var g=new THREE.Mesh(new THREE.SphereGeometry(.055,8,6),
            new THREE.MeshPhysicalMaterial({
              color:0xFFF8E0, emissive:0xFFE880, emissiveIntensity:2.2,
              transparent:true, opacity:.88
            }));
          g.position.copy(pl.position); g.position.y-=.05;
          scene.add(g);
        });
      });
    }
  }

  // ── MOBILIER GLTF ────────────────────────────────────────────────────
  function _loadFurniture(scene, THREE, mats, anchor, RV) {
    return new Promise(function(resolve) {
      var GLTFLoader = THREE.GLTFLoader;
      if (!GLTFLoader || !anchor || !RV || !RV.floors) { resolve(); return; }

      var b  = RV.building || {};
      var hNiv = (b.P && b.P.hn) || 3.0;
      var ox = anchor.cx - anchor.bW / 2;
      var oz = anchor.cz - anchor.bD / 2;
      var loaded = 0, total = 0;

      RV.floors.forEach(function(fl, fIdx) {
        if (!fl||!fl.rects||fIdx>1) return;
        fl.rects.forEach(function(r) {
          if (r.bal||r.w*r.h<6) return;
          if (r.t==='living'||r.t==='bedroom'||r.t==='kitchen') total++;
        });
      });

      if (total===0) { resolve(); return; }

      function check() { if (++loaded >= total) resolve(); }

      RV.floors.forEach(function(fl, fIdx) {
        if (!fl||!fl.rects||fIdx>1) return;
        var baseY = anchor.baseY + fIdx * hNiv;
        fl.rects.forEach(function(r) {
          if (r.bal||r.w*r.h<6) return;
          var cx2=ox+r.x+r.w/2, cz2=oz+r.y+r.h/2;

          if (r.t==='living') {
            // Canapea GLTF (SheenChair ca proxy)
            new GLTFLoader().load(MDL+'chair.glb', function(gltf) {
              var obj=gltf.scene;
              obj.scale.set(.8,.8,.8);
              obj.position.set(cx2, baseY+.1, cz2+r.h*.1);
              // Aplicăm material fabric pe toate mesh-urile
              obj.traverse(function(child) {
                if (child.isMesh) {
                  child.material = mats.fabric;
                  child.castShadow=true; child.receiveShadow=true;
                }
              });
              scene.add(obj);
              check();
            }, undefined, function() {
              // Fallback geometrie
              _addSofaFallback(scene, THREE, mats, cx2, baseY, cz2, r.w);
              check();
            });
          } else if (r.t==='bedroom') {
            // Pat fallback
            _addBedFallback(scene, THREE, mats, cx2, baseY, cz2, r.w);
            check();
          } else if (r.t==='kitchen') {
            _addTableFallback(scene, THREE, mats, cx2, baseY, cz2, r.w);
            check();
          }
        });
      });
    });
  }

  function _addSofaFallback(scene, THREE, mats, x, baseY, z, maxW) {
    var W=Math.min(maxW*.7,2.4), D=.95, g=new THREE.Group();
    var base=new THREE.Mesh(new THREE.BoxGeometry(W,.1,D),
      new THREE.MeshPhysicalMaterial({color:0x1A1008,roughness:.9}));
    base.position.y=.05; base.castShadow=true; g.add(base);
    var seat=new THREE.Mesh(new THREE.BoxGeometry(W,.22,D*.62),mats.fabric);
    seat.position.set(0,.22,D*.07); seat.castShadow=true; g.add(seat);
    var back=new THREE.Mesh(new THREE.BoxGeometry(W,.58,.14),mats.fabric);
    back.position.set(0,.54,-D*.41); back.rotation.x=-.07; back.castShadow=true; g.add(back);
    [-W/2+.1, W/2-.1].forEach(function(ax) {
      var arm=new THREE.Mesh(new THREE.BoxGeometry(.18,.3,D*.8),mats.fabric);
      arm.position.set(ax,.34,-D*.03); arm.castShadow=true; g.add(arm);
    });
    var nC=Math.round(W/.9);
    for (var i=0;i<nC;i++) {
      var cx3=-W/2+.45+i*(W-.8)/Math.max(nC-1,1);
      var c=new THREE.Mesh(new THREE.BoxGeometry(.68,.4,.46),mats.fabric);
      c.position.set(cx3,.62,-D*.16); c.rotation.x=-.08; c.castShadow=true; g.add(c);
    }
    var legMat=mats.metal;
    [[-W/2+.12,-D/2+.1],[W/2-.12,-D/2+.1],[-W/2+.12,D/2-.1],[W/2-.12,D/2-.1]].forEach(function(p) {
      var leg=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,.12,8),legMat);
      leg.position.set(p[0],.06,p[1]); g.add(leg);
    });
    g.position.set(x,baseY+.1,z); scene.add(g);
  }

  function _addBedFallback(scene, THREE, mats, x, baseY, z, maxW) {
    var W=Math.min(maxW*.72,1.8), D=2.0, g=new THREE.Group();
    var frame=new THREE.Mesh(new THREE.BoxGeometry(W+.1,.28,D+.05),mats.darkWood);
    frame.position.y=.14; frame.castShadow=true; g.add(frame);
    var matt=new THREE.Mesh(new THREE.BoxGeometry(W,.22,D-.04),
      new THREE.MeshPhysicalMaterial({color:0xF0EDE5,roughness:.9}));
    matt.position.y=.39; g.add(matt);
    var duvet=new THREE.Mesh(new THREE.BoxGeometry(W-.06,.1,D*.62),
      new THREE.MeshPhysicalMaterial({
        color:0xF5F0E8, roughness:.95,
        sheen:.5, sheenColor: 0xFFFFFF, sheenRoughness:.8
      }));
    duvet.position.set(0,.55,D*.1); duvet.castShadow=true; g.add(duvet);
    [-W/4,W/4].forEach(function(px2) {
      var p2=new THREE.Mesh(new THREE.BoxGeometry(.66,.16,.46),
        new THREE.MeshPhysicalMaterial({color:0xFFFDF8,roughness:.9}));
      p2.position.set(px2,.58,-D*.34); g.add(p2);
    });
    var head=new THREE.Mesh(new THREE.BoxGeometry(W+.08,.95,.12),mats.fabric);
    head.position.set(0,.75,-D/2-.04); head.castShadow=true; g.add(head);
    g.position.set(x,baseY+.1,z); scene.add(g);
  }

  function _addTableFallback(scene, THREE, mats, x, baseY, z, maxW) {
    var W=Math.min(maxW*.62,1.6), g=new THREE.Group();
    var top=new THREE.Mesh(new THREE.BoxGeometry(W,.05,W*.55),mats.darkWood);
    top.position.y=.75; top.castShadow=true; g.add(top);
    [[-W/2+.09,-W*.22],[W/2-.09,-W*.22],[-W/2+.09,W*.22],[W/2-.09,W*.22]].forEach(function(p) {
      var leg=new THREE.Mesh(new THREE.CylinderGeometry(.024,.024,.72,8),mats.metal);
      leg.position.set(p[0],.36,p[1]); g.add(leg);
    });
    g.position.set(x,baseY+.1,z); scene.add(g);
  }

  // ── EXTERIOR ─────────────────────────────────────────────────────────
  function _buildExterior(scene, THREE, mats, anchor, RV) {
    if (!anchor) return;
    var b=(RV&&RV.building)||{};
    var bW=anchor.bW||b.bW||20, bD=anchor.bD||b.bD||15;

    // Teren
    var ground=new THREE.Mesh(new THREE.PlaneGeometry(bW*7,bD*7),
      new THREE.MeshPhysicalMaterial({color:0x8A9870,roughness:.95}));
    ground.rotation.x=-Math.PI/2;
    ground.position.set(anchor.cx,anchor.baseY-.01,anchor.cz);
    ground.receiveShadow=true; scene.add(ground);

    // Trotuar
    var sw=new THREE.Mesh(new THREE.BoxGeometry(bW+8,.07,2.8),
      new THREE.MeshPhysicalMaterial({color:0xCDD5DE,roughness:.82}));
    sw.position.set(anchor.cx,anchor.baseY+.02,anchor.cz+bD/2+1.8);
    sw.receiveShadow=true; scene.add(sw);

    // Copaci billboard (3 piani incrociati per realismo)
    [
      {x:anchor.cx-bW/2-5, z:anchor.cz+bD*.3, h:6.0},
      {x:anchor.cx-bW/2-5, z:anchor.cz-bD*.3, h:5.5},
      {x:anchor.cx+bW/2+5, z:anchor.cz+bD*.2, h:5.0},
      {x:anchor.cx+bW/2+9, z:anchor.cz-bD*.25,h:5.8},
    ].forEach(function(tp) { _addTree(scene,THREE,tp.x,anchor.baseY,tp.z,tp.h); });
  }

  function _addTree(scene, THREE, x, baseY, z, h) {
    // Tronco
    var tr=new THREE.Mesh(new THREE.CylinderGeometry(.12,.18,h*.38,8),
      new THREE.MeshPhysicalMaterial({color:0x5C3A15,roughness:.9}));
    tr.position.set(x,baseY+h*.19,z); tr.castShadow=true; scene.add(tr);
    // Chioma canvas billboard
    var cv2=document.createElement('canvas'); cv2.width=cv2.height=512;
    var ctx=cv2.getContext('2d');
    var grd=ctx.createRadialGradient(256,320,0,256,256,220);
    grd.addColorStop(0,'rgba(25,110,30,.97)');
    grd.addColorStop(.6,'rgba(18,85,22,.92)');
    grd.addColorStop(1,'rgba(5,40,8,0)');
    ctx.fillStyle=grd;
    ctx.beginPath(); ctx.ellipse(256,290,210,240,0,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=.35; ctx.fillStyle='rgba(45,160,45,.5)';
    ctx.beginPath(); ctx.ellipse(190,230,130,160,-0.3,0,Math.PI*2); ctx.fill();
    var ttex=new THREE.CanvasTexture(cv2);
    var tmat=new THREE.MeshStandardMaterial({
      map:ttex, transparent:true, alphaTest:.05,
      roughness:.9, side:THREE.DoubleSide,
      emissive:0x042008, emissiveIntensity:.18
    });
    [0,Math.PI/3,Math.PI*2/3].forEach(function(ang) {
      var pl=new THREE.Mesh(new THREE.PlaneGeometry(h*.95,h*1.1),tmat);
      pl.position.set(x,baseY+h*.58,z); pl.rotation.y=ang;
      pl.castShadow=true; scene.add(pl);
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────
  function waitReady(cb,n) {
    n=n||0; if(n>200)return;
    if(window.THREE&&window.VTour){cb();return;}
    setTimeout(function(){waitReady(cb,n+1);},250);
  }

  waitReady(function() {
    _inject();
    console.log('[Render4K v2] ✅ Texturi reale 2048px + HDRI + GLTF activ');
  });

})();
