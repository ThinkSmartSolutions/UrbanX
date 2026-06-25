// ═══════════════════════════════════════════════════════════════════════════
// 48-render-gallery.js — Galerie Render 4K per cameră
// UrbanX TSS·FG | v1.0 | 10 Iunie 2026
//
// Construiește scena fotorealistă INDEPENDENT de viewer — garantat PBR.
// Generează câte un render 4K (4096×4096px) per cameră din proiect.
// Afișează galerie navigabilă în UrbanX cu zoom și download.
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var PBR  = 'assets/tur3d/pbr/';
  var HDRI = 'assets/tur3d/hdri/';
  var MDL  = 'assets/models/';

  // Tipuri de camere de randat
  var ROOM_TYPES = ['living','bedroom','bedroom2','kitchen','bath','office'];
  var ROOM_LABELS = {
    living:'Living', bedroom:'Dormitor', bedroom2:'Dormitor 2',
    kitchen:'Bucătărie', bath:'Baie', office:'Birou',
    hall:'Hol', wc:'WC'
  };

  // ── Injectare buton ──────────────────────────────────────────────────
  function _inject() {
    var _try = function() {
      var bar = document.getElementById('ts-nav-bar') ||
                document.querySelector('.ts-bottombar');
      if (!bar || document.getElementById('btn-gallery-4k')) return false;

      var btn = document.createElement('button');
      btn.id = 'btn-gallery-4k';
      btn.className = 'ts-nb-btn';
      btn.innerHTML = '🎨 Galerie 4K';
      btn.title = 'Renders fotorealiste 4K per cameră';
      btn.style.cssText = 'border-color:rgba(168,85,247,.5);color:#A855F7;background:rgba(168,85,247,.1);font-weight:700';
      btn.onclick = _launchGallery;
      bar.appendChild(btn);
      return true;
    };
    if (!_try()) {
      var obs = new MutationObserver(function() { if (_try()) obs.disconnect(); });
      obs.observe(document.body, { childList:true, subtree:true });
    }
  }

  // ── Launcher ─────────────────────────────────────────────────────────
  // Date locale ale galeriei — copiate la launch, independente de _RV global
  var _galleryData = null; // { building, floors }

  function _buildGalleryData() {
    // Încearcă _RV mai întâi
    var RV = window._RV;
    if (RV && RV.building && Array.isArray(RV.floors) && RV.floors[0]) {
      return { building: RV.building, floors: RV.floors };
    }
    // Fallback: construim din AEDIS
    var A = window.AEDIS;
    var corp = (A && Array.isArray(A.corpuri) && A.corpuri[0]) || (A || {});
    var niv  = parseInt(corp.niv) || parseInt((A||{}).niv) || 3;
    var bW   = parseFloat(corp.bW) || 18;
    var bD   = parseFloat(corp.bD) || 14;
    var hNiv = parseFloat(corp.hNiv) || 3.0;
    var fn   = (A && A.fn) || 'rezidential_colectiv';

    var building = {
      bW: bW, bD: bD, niv: niv, scArea: bW * bD,
      P: { hn: hNiv, W: bW + 6, D: bD + 6 },
      cores: [{ x: bW * 0.4, y: bD * 0.32, w: bW * 0.18, h: bD * 0.28 }],
    };
    var floors = [];
    for (var f = 0; f < niv; f++) floors.push(_syntheticFloor(f, bW, bD, fn));
    console.log('[Gallery4K] Date sintetice din AEDIS: ' + niv + ' etaje ' + bW.toFixed(1) + 'x' + bD.toFixed(1) + 'm');
    return { building: building, floors: floors };
  }

  function _launchGallery() {
    var THREE = window.THREE;
    if (!THREE) {
      if (typeof ss === 'function') ss('⚠ Deschide Viewer 3D înainte de render');
      return;
    }
    var A = window.AEDIS;
    if (!A && (!window._RV || !window._RV.building)) {
      if (typeof ss === 'function') ss('⚠ Generează mai întâi o clădire în AEDIS');
      return;
    }
    // Construim și stocăm datele LOCAL — nu mai depindem de _RV global
    _galleryData = _buildGalleryData();
    _showGalleryUI();
  }

  function _syntheticFloor(fIdx, bW, bD, fn) {
    // Plan minimal: living + dormitor + baie + bucătărie + hol
    var rects = [
      { t:'living',   x:0,        y:0,      w:bW*0.45, h:bD*0.55, apt:0 },
      { t:'bedroom',  x:bW*0.45,  y:0,      w:bW*0.35, h:bD*0.5,  apt:0 },
      { t:'kitchen',  x:0,        y:bD*0.55,w:bW*0.35, h:bD*0.45, apt:0 },
      { t:'bath',     x:bW*0.45,  y:bD*0.5, w:bW*0.2,  h:bD*0.25, apt:0 },
      { t:'hall',     x:bW*0.35,  y:bD*0.55,w:bW*0.1,  h:bD*0.45, apt:0 },
    ];
    return { floorIdx: fIdx, rects: rects, doors: [], wins: [] };
  }

  // ── UI Galerie ────────────────────────────────────────────────────────
  var _galleryImages = {}; // { roomKey: { label, dataURL, done } }
  var _currentRoom = null;

  function _showGalleryUI() {
    document.getElementById('gallery-4k-ui')?.remove();

    var ui = document.createElement('div');
    ui.id = 'gallery-4k-ui';
    ui.style.cssText = [
      'position:fixed;inset:0;z-index:9999999',
      'background:#060C1A',
      'display:flex;flex-direction:column',
      'font-family:IBM Plex Mono,monospace',
    ].join(';');

    // Headerul
    ui.innerHTML = [
      '<div style="display:flex;align-items:center;justify-content:space-between;',
        'padding:10px 16px;background:rgba(168,85,247,.08);',
        'border-bottom:1px solid rgba(168,85,247,.2)">',
        '<div>',
          '<span style="color:#A855F7;font-size:14px;font-weight:800">🎨 Galerie Render 4K</span>',
          '<span style="color:#475569;font-size:10px;margin-left:10px">',
            '4096×4096px · PBR 2048px · HDRI · ACESFilmic',
          '</span>',
        '</div>',
        '<div style="display:flex;gap:8px">',
          '<button id="btn-render-all" onclick="_galleryRenderAll()"',
            ' style="padding:6px 14px;border-radius:7px;cursor:pointer;font-size:11px;',
            'font-weight:800;background:linear-gradient(135deg,#A855F7,#7C3AED);',
            'color:#fff;border:none;font-family:inherit">▶ Render Toate</button>',
          '<button onclick="document.getElementById(\'gallery-4k-ui\').remove()"',
            ' style="padding:6px 14px;border-radius:7px;cursor:pointer;font-size:11px;',
            'background:rgba(239,68,68,.15);color:#FCA5A5;border:1px solid rgba(239,68,68,.3);',
            'font-family:inherit">✕</button>',
        '</div>',
      '</div>',

      // Layout principal: tabs stânga + viewport dreapta
      '<div style="flex:1;display:flex;overflow:hidden">',

        // Tabs camere
        '<div id="gallery-tabs" style="width:160px;min-width:160px;',
          'background:rgba(168,85,247,.04);border-right:1px solid rgba(168,85,247,.15);',
          'overflow-y:auto;padding:8px 0">',
        '</div>',

        // Viewport imagine
        '<div style="flex:1;display:flex;flex-direction:column;overflow:hidden">',

          // Progress / status
          '<div id="gallery-progress" style="padding:8px 14px;',
            'border-bottom:1px solid rgba(255,255,255,.05);',
            'display:none">',
            '<div style="display:flex;justify-content:space-between;margin-bottom:4px">',
              '<span id="gallery-prog-label" style="font-size:10px;color:#A855F7"></span>',
              '<span id="gallery-prog-pct" style="font-size:10px;color:#A855F7;font-weight:700">0%</span>',
            '</div>',
            '<div style="background:rgba(255,255,255,.07);border-radius:3px;height:5px">',
              '<div id="gallery-prog-bar" style="height:5px;border-radius:3px;width:0%;',
                'background:linear-gradient(90deg,#A855F7,#7C3AED);transition:width .2s"></div>',
            '</div>',
          '</div>',

          // Imaginea principală
          '<div id="gallery-main-wrap" style="flex:1;display:flex;align-items:center;',
            'justify-content:center;overflow:hidden;position:relative;background:#030810">',
            '<div style="color:#475569;font-size:13px;text-align:center" id="gallery-placeholder">',
              '<div style="font-size:40px;margin-bottom:12px">🎨</div>',
              'Apasă ▶ Render Toate sau selectează o cameră',
            '</div>',
            '<img id="gallery-main-img" style="display:none;max-width:100%;max-height:100%;',
              'object-fit:contain;cursor:zoom-in" onclick="_galleryZoom(this)">',
          '</div>',

          // Toolbar imagine
          '<div id="gallery-toolbar" style="display:none;padding:8px 14px;',
            'border-top:1px solid rgba(255,255,255,.05);',
            'display:none;gap:8px;align-items:center">',
            '<span id="gallery-room-name" style="color:#E2E8F0;font-size:12px;font-weight:700;flex:1"></span>',
            '<span style="color:#475569;font-size:10px">4096×4096px</span>',
            '<button id="gallery-dl-btn" style="padding:5px 14px;border-radius:6px;cursor:pointer;',
              'font-size:11px;font-weight:700;background:linear-gradient(135deg,#A855F7,#7C3AED);',
              'color:#fff;border:none;font-family:inherit">⬇ PNG 4K</button>',
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    document.body.appendChild(ui);

    // Construim tabs pentru camere
    _buildRoomTabs();
  }

  function _buildRoomTabs() {
    var tabs = document.getElementById('gallery-tabs');
    if (!tabs) return;
    var GD = _galleryData;
    if (!GD || !GD.floors || !GD.floors[0]) return;
    var fl = GD.floors[0];
    if (!fl || !fl.rects) return;

    // Camere unice (by type, skip core/hall/wc)
    var rooms = [];
    var seen = {};
    fl.rects.forEach(function(r) {
      if (r.bal || r.apt < 0) return;
      var key = r.t + '_' + r.apt;
      if (seen[key]) return;
      seen[key] = true;
      rooms.push({ key: key, t: r.t, apt: r.apt, r: r, lbl: r.lbl || ROOM_LABELS[r.t] || r.t });
    });

    // Adăugăm și exteriorul
    rooms.push({ key: 'exterior', t: 'exterior', lbl: 'Exterior' });
    rooms.push({ key: 'section',  t: 'section',  lbl: 'Secțiune' });

    tabs.innerHTML = '';
    rooms.forEach(function(room, idx) {
      var tab = document.createElement('div');
      tab.id = 'gallery-tab-' + room.key;
      tab.style.cssText = [
        'padding:10px 12px;cursor:pointer;border-left:3px solid transparent;',
        'transition:all .15s;font-size:11px;',
      ].join('');
      tab.innerHTML = [
        '<div style="color:#E2E8F0;font-weight:700;margin-bottom:3px">' + room.lbl + '</div>',
        '<div id="gallery-tab-status-' + room.key + '" style="font-size:9px;color:#475569">',
          '⏳ în așteptare',
        '</div>',
      ].join('');
      tab.onmouseover = function() { tab.style.background = 'rgba(168,85,247,.08)'; };
      tab.onmouseout  = function() {
        tab.style.background = _currentRoom === room.key ? 'rgba(168,85,247,.12)' : '';
      };
      tab.onclick = function() { _selectRoom(room.key); };
      tabs.appendChild(tab);

      // Setăm prima cameră ca activă
      if (idx === 0) setTimeout(function() { _selectRoom(room.key); }, 100);
    });

    // Salvăm lista de camere
    window._galleryRooms = rooms;
  }

  function _selectRoom(key) {
    _currentRoom = key;

    // Update tabs
    document.querySelectorAll('#gallery-tabs > div').forEach(function(t) {
      t.style.borderLeftColor = 'transparent';
      t.style.background = '';
    });
    var activeTab = document.getElementById('gallery-tab-' + key);
    if (activeTab) {
      activeTab.style.borderLeftColor = '#A855F7';
      activeTab.style.background = 'rgba(168,85,247,.12)';
    }

    // Afișăm imaginea dacă există
    var img = _galleryImages[key];
    var mainImg = document.getElementById('gallery-main-img');
    var placeholder = document.getElementById('gallery-placeholder');
    var toolbar = document.getElementById('gallery-toolbar');
    var roomName = document.getElementById('gallery-room-name');

    if (img && img.done) {
      if (mainImg) { mainImg.src = img.dataURL; mainImg.style.display = 'block'; }
      if (placeholder) placeholder.style.display = 'none';
      if (toolbar) toolbar.style.display = 'flex';
      if (roomName) roomName.textContent = img.label;

      // Download handler
      var dlBtn = document.getElementById('gallery-dl-btn');
      if (dlBtn) {
        dlBtn.onclick = function() {
          var a = document.createElement('a');
          a.href = img.dataURL;
          a.download = 'UrbanX_' + img.label.replace(/\s/g,'_') + '_4K.png';
          a.click();
        };
      }
    } else {
      if (mainImg) mainImg.style.display = 'none';
      if (toolbar) toolbar.style.display = 'none';
      if (placeholder) {
        placeholder.style.display = 'block';
        placeholder.innerHTML = img && img.rendering
          ? '<div style="color:#A855F7;font-size:13px">⏳ Se randează...</div>'
          : '<div style="color:#475569;font-size:13px">Apasă ▶ Render Toate</div>';
      }
    }
  }

  // ── Render TOATE camerele ─────────────────────────────────────────────
  window._galleryRenderAll = async function() {
    var rooms = window._galleryRooms;
    if (!rooms) return;

    var btn = document.getElementById('btn-render-all');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Randez...'; }

    var prog = document.getElementById('gallery-progress');
    if (prog) prog.style.display = 'block';

    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      _setTabStatus(room.key, '🔄 randez...');
      _galleryImages[room.key] = { label: room.lbl, rendering: true };
      _selectRoom(room.key);

      try {
        var dataURL = await _renderRoom(room, i, rooms.length);
        _galleryImages[room.key] = { label: room.lbl, dataURL: dataURL, done: true };
        _setTabStatus(room.key, '✅ gata');
        _selectRoom(room.key);
      } catch(err) {
        _setTabStatus(room.key, '❌ eroare');
        console.warn('[Gallery4K]', room.key, err.message);
      }
    }

    if (btn) { btn.disabled = false; btn.textContent = '🔄 Re-render'; }
    var progEl = document.getElementById('gallery-progress');
    if (progEl) progEl.style.display = 'none';
  };

  function _setTabStatus(key, text) {
    var el = document.getElementById('gallery-tab-status-' + key);
    if (el) el.textContent = text;
  }

  function _setProgress(pct, label) {
    var bar = document.getElementById('gallery-prog-bar');
    var pctEl = document.getElementById('gallery-prog-pct');
    var lbl = document.getElementById('gallery-prog-label');
    if (bar) bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = Math.round(pct) + '%';
    if (lbl && label) lbl.textContent = label;
  }

  // ── Render o cameră ────────────────────────────────────────────────────
  async function _renderRoom(room, roomIdx, roomTotal) {
    var THREE = window.THREE;
    // Folosim datele locale ale galeriei — NICIODATĂ window._RV direct
    var GD = _galleryData;
    if (!GD) { throw new Error('_galleryData lipsă'); }

    var TILE = 1024, NX = 4, NY = 4, SSAA = 2;
    var OUT_W = TILE * NX, OUT_H = TILE * NY;

    _setProgress(0, 'Construiesc scena pentru ' + room.lbl + '...');

    // ── RENDERER DEDICAT ──────────────────────────────────────────────
    var offCv = document.createElement('canvas');
    offCv.width = offCv.height = TILE * SSAA;

    var r4k = new THREE.WebGLRenderer({
      canvas: offCv, antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    r4k.setSize(TILE * SSAA, TILE * SSAA, false);
    r4k.shadowMap.enabled = true;
    r4k.shadowMap.type = THREE.PCFSoftShadowMap;
    r4k.toneMapping = THREE.ACESFilmicToneMapping;
    r4k.toneMappingExposure = 1.15;
    // physicallyCorrectLights=true interpreta intensitatile (sun 3.0, point 1.0) ca unitati
    // fizice (candela/lux) => scena ~neagra. Luminile din _buildRoomScene sunt ne-fizice => OFF.
    r4k.physicallyCorrectLights = false;
    if (THREE.sRGBEncoding) r4k.outputEncoding = THREE.sRGBEncoding;

    // ── SCENA FOTOREALISTĂ ────────────────────────────────────────────
    var scene = await _buildRoomScene(THREE, r4k, room, GD);
    _setProgress(20, 'Scenă gata. Start render tiled...');

    // ── CAMERA ────────────────────────────────────────────────────────
    var camera = new THREE.PerspectiveCamera(58, OUT_W / OUT_H, 0.1, 500);
    _positionCamera(camera, room, GD, THREE);

    // ── TILED RENDER 4×4 ──────────────────────────────────────────────
    var finalCv = document.createElement('canvas');
    finalCv.width = OUT_W; finalCv.height = OUT_H;
    var fCtx = finalCv.getContext('2d');

    var tileIdx = 0;
    var totalTiles = NX * NY;

    for (var ty = 0; ty < NY; ty++) {
      for (var tx = 0; tx < NX; tx++) {
        tileIdx++;
        var basePct = (roomIdx / roomTotal) * 100;
        var roomPct = (tileIdx / totalTiles) * 70;
        _setProgress(
          20 + roomPct,
          room.lbl + ' — tile ' + tileIdx + '/' + totalTiles
        );

        camera.setViewOffset(
          OUT_W * SSAA, OUT_H * SSAA,
          tx * TILE * SSAA, ty * TILE * SSAA,
          TILE * SSAA, TILE * SSAA
        );
        camera.aspect = OUT_W / OUT_H;
        camera.updateProjectionMatrix();

        r4k.render(scene, camera);

        // Downsample SSAA
        var dc = document.createElement('canvas');
        dc.width = TILE; dc.height = TILE;
        var dCtx = dc.getContext('2d');
        dCtx.imageSmoothingEnabled = true;
        dCtx.imageSmoothingQuality = 'high';
        dCtx.drawImage(offCv, 0, 0, TILE, TILE);
        fCtx.drawImage(dc, tx * TILE, ty * TILE);

        await new Promise(function(res) { setTimeout(res, 6); });
      }
    }

    camera.clearViewOffset();

    // Post-processing: vignette + grain
    _setProgress(92, 'Post-processing...');
    _postProcess(fCtx, OUT_W, OUT_H);
    await new Promise(function(res) { setTimeout(res, 30); });

    // Cleanup
    r4k.dispose();
    scene.traverse(function(obj) {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        var mts = Array.isArray(obj.material) ? obj.material : [obj.material];
        mts.forEach(function(m) { if (m.map) m.map.dispose(); m.dispose(); });
      }
    });

    _setProgress(100, '✅ ' + room.lbl + ' complet!');
    return finalCv.toDataURL('image/png');
  }

  // ── Construiește scena fotorealistă per cameră ─────────────────────────
  async function _buildRoomScene(THREE, renderer, room, GD) {
    var scene = new THREE.Scene();

    var envMap = await _getEnvMap(THREE, renderer);
    scene.environment = envMap;
    scene.background  = envMap;

    var b    = GD.building;
    var hNiv = (b.P && b.P.hn) || 3.0;
    var stil = (window.AEDIS && window.AEDIS.stil) || 'modern';

    var M = _buildMaterials(THREE, envMap, stil);

    if (room.t === 'exterior') {
      _buildExteriorScene(scene, THREE, M, b, GD);
    } else if (room.t === 'section') {
      _buildSectionScene(scene, THREE, M, b, GD, hNiv);
    } else {
      _buildInteriorRoom(scene, THREE, M, room, b, GD, hNiv);
    }

    return scene;
  }

  // ── Environment map ───────────────────────────────────────────────────
  function _getEnvMap(THREE, renderer) {
    return new Promise(function(resolve) {
      if (window._urbanxEnvMap) { resolve(window._urbanxEnvMap); return; }

      var pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();

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
        function() {
          resolve(_fallbackEnvMap(THREE, renderer, pmrem));
        }
      );
    });
  }

  function _fallbackEnvMap(THREE, renderer, pmrem) {
    var cv = document.createElement('canvas');
    cv.width = 512; cv.height = 256;
    var ctx = cv.getContext('2d');
    var g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, '#1A3060'); g.addColorStop(0.6, '#87CEEB'); g.addColorStop(1, '#7A8070');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 256);
    var sunG = ctx.createRadialGradient(380, 60, 0, 380, 60, 70);
    sunG.addColorStop(0, 'rgba(255,250,200,1)'); sunG.addColorStop(1, 'rgba(255,220,100,0)');
    ctx.fillStyle = sunG; ctx.fillRect(0, 0, 512, 256);
    var tex = new THREE.CanvasTexture(cv);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    return pmrem.fromEquirectangular(tex).texture;
  }

  // ── Materiale PBR complete ────────────────────────────────────────────
  function _loadTex(THREE, path, repeat) {
    var t = new THREE.TextureLoader().load(path);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat || 4, repeat || 4);
    t.anisotropy = 16;
    return t;
  }

  function _buildMaterials(THREE, envMap, stil) {
    var isClassic = stil === 'clasic';
    var isMini    = stil === 'minimalist';
    var isIndu    = stil === 'industrial';

    // Wrapper compatibil THREE r128 — elimină proprietăți din r130+
    function mp(o) {
      var safe = {};
      var skip = ['envI','sheenColor','sheenRoughness','transmission','thickness','ior'];
      var envIntensity = o.envI || 1.0;
      Object.keys(o).forEach(function(k) {
        if (skip.indexOf(k) === -1) safe[k] = o[k];
      });
      safe.envMap = envMap;
      safe.envMapIntensity = envIntensity;
      // sheenColor → aproximăm prin color dacă e material cu sheen
      if (o.sheenColor && !safe.color) {
        // nu setăm color pe materiale cu map
      }
      return new THREE.MeshPhysicalMaterial(safe);
    }

    // Sticlă: r128 nu are transmission — folosim transparent simplu
    var glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xD0E8F5,
      transparent: true, opacity: 0.18,
      roughness: 0.0, metalness: 0.0,
      envMap: envMap, envMapIntensity: 1.8,
      side: THREE.DoubleSide,
    });

    return {
      floorLiving: mp({
        map:          _loadTex(THREE, PBR+'parchet_stejar/diff.jpg', 5),
        normalMap:    _loadTex(THREE, PBR+'parchet_stejar/nor_gl.jpg', 5),
        roughnessMap: _loadTex(THREE, PBR+'parchet_stejar/rough.jpg', 5),
        aoMap:        _loadTex(THREE, PBR+'parchet_stejar/ao.jpg', 5),
        roughness:.50, metalness:.01,
        clearcoat:.30, clearcoatRoughness:.18, envI:1.4,
        aoMapIntensity: 1.0,
      }),
      floorBath: mp({
        map:          _loadTex(THREE, PBR+'marble_white/diff.jpg', 2),
        normalMap:    _loadTex(THREE, PBR+'marble_white/nor_gl.jpg', 2),
        roughnessMap: _loadTex(THREE, PBR+'marble_white/rough.jpg', 2),
        aoMap:        _loadTex(THREE, PBR+'marble_white/ao.jpg', 2),
        roughness:.10, metalness:.05,
        clearcoat:.95, clearcoatRoughness:.04, envI:2.0,
      }),
      floorKitchen: mp({
        map:          _loadTex(THREE, PBR+(isClassic?'marble_white':'blat_bucatarie')+'/diff.jpg', 3),
        normalMap:    _loadTex(THREE, PBR+(isClassic?'marble_white':'blat_bucatarie')+'/nor_gl.jpg', 3),
        roughnessMap: _loadTex(THREE, PBR+(isClassic?'marble_white':'blat_bucatarie')+'/rough.jpg', 3),
        roughness: isClassic?.12:.30, metalness:.05,
        clearcoat: isClassic?.9:.4, clearcoatRoughness:.06, envI:1.5,
      }),
      wall: mp({
        map:          _loadTex(THREE, PBR+(isIndu?'caramida_aparenta':'tencuiala_interior')+'/diff.jpg', 6),
        normalMap:    _loadTex(THREE, PBR+(isIndu?'caramida_aparenta':'tencuiala_interior')+'/nor_gl.jpg', 6),
        roughnessMap: _loadTex(THREE, PBR+(isIndu?'caramida_aparenta':'tencuiala_interior')+'/rough.jpg', 6),
        aoMap:        _loadTex(THREE, PBR+(isIndu?'caramida_aparenta':'tencuiala_interior')+'/ao.jpg', 6),
        roughness: isIndu?.85:.82, metalness:0,
        aoMapIntensity:.7, envI:.3,
        normalScale: new THREE.Vector2(isIndu?.9:.35, isIndu?.9:.35),
      }),
      ceiling: mp({ color:0xFBFAF8, roughness:.93, metalness:0, envI:.2 }),
      sofa: mp({
        normalMap:    _loadTex(THREE, PBR+'fabric_canapea/nor_gl.jpg', 2),
        roughnessMap: _loadTex(THREE, PBR+'fabric_canapea/rough.jpg', 2),
        color: isClassic?0x6B4030:isMini?0xC0B8B0:0x3A4A5E,
        roughness:.85, metalness:0,
        sheen: 1.0, envI:.5,
      }),
      metal: mp({
        map:          _loadTex(THREE, PBR+'metal_finish/diff.jpg', 1),
        roughnessMap: _loadTex(THREE, PBR+'metal_finish/rough.jpg', 1),
        color:0xC8A020, roughness:.12, metalness:.97,
        clearcoat:1.0, clearcoatRoughness:.04, envI:2.5,
      }),
      darkWood: mp({
        map:          _loadTex(THREE, PBR+'parchet_stejar/diff.jpg', 2),
        normalMap:    _loadTex(THREE, PBR+'parchet_stejar/nor_gl.jpg', 2),
        color:0x2A1508, roughness:.18, metalness:0,
        clearcoat:.95, clearcoatRoughness:.05, envI:1.5,
      }),
      glass: glassMat,
    };
  }

  // ── Camera positioning ────────────────────────────────────────────────
  function _positionCamera(camera, room, RV, THREE) {
    var b = RV.building;
    var hNiv = (b.P && b.P.hn) || 3.0;
    var niv  = b.niv || 3;

    if (room.t === 'exterior') {
      var dist = Math.max(b.bW || 18, b.bD || 14, niv * hNiv) * 1.75;
      camera.position.set(dist*.6, dist*.7, dist*.9);
      camera.lookAt(0, niv * hNiv * .4, 0);
      camera.fov = 35;
    } else if (room.t === 'section') {
      var distS = Math.max(b.bW || 18, niv * hNiv) * 1.85;
      camera.position.set(0, niv * hNiv * .5, distS);
      camera.lookAt(0, niv * hNiv * .45, 0);
      camera.fov = 38;
    } else {
      // Scena interioară e construită de la (0,0) la (rW, rD)
      // Camera la înălțimea ochilor, în treimea din spate, privind spre fereastră (z=0)
      var r = room.r;
      var rW = r.w, rD = r.h;
      camera.position.set(rW * 0.5, 1.55, rD * 0.72);
      camera.lookAt(rW * 0.5, 1.25, 0);
      camera.fov = 65;
      camera.near = 0.05;
      camera.far  = 200;
    }
    camera.updateProjectionMatrix();
  }

  // ── Scena interioară per cameră ───────────────────────────────────────
  function _buildInteriorRoom(scene, THREE, M, room, b, RV, hNiv) {
    var r = room.r;
    var rW = r.w, rD = r.h;

    // Iluminare studio
    var sun = new THREE.DirectionalLight(0xFFF5E0, 3.0);
    sun.position.set(rW * 2, hNiv * 3, rD * 2);
    sun.castShadow = true;
    sun.shadow.mapSize.width = sun.shadow.mapSize.height = 2048;
    sun.shadow.bias = -.0003; sun.shadow.normalBias = .04;
    scene.add(sun);

    scene.add(new THREE.HemisphereLight(0xD8E8F8, 0x806040, 0.7));

    var fill = new THREE.DirectionalLight(0xC8E0FF, 0.8);
    fill.position.set(-rW, hNiv * 2, -rD);
    scene.add(fill);

    // Lampă de tavan
    var pl = new THREE.PointLight(0xFFE8C0, 1.0, hNiv * 4);
    pl.position.set(rW / 2, hNiv - 0.25, rD / 2);
    scene.add(pl);
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(.055, 10, 8),
      new THREE.MeshPhysicalMaterial({
        color:0xFFF8E0, emissive:0xFFE890, emissiveIntensity:2.0,
        transparent:true, opacity:.88
      })
    )).position.set(rW / 2, hNiv - 0.28, rD / 2);

    // SpotLight lumina solară prin fereastră
    var sp = new THREE.SpotLight(0xFFF8E0, 2.5, hNiv * 4, Math.PI / 7, 0.35);
    sp.position.set(rW * 0.3, hNiv - 0.3, 0.3);
    sp.target.position.set(rW * 0.5, 0.05, rD * 0.6);
    sp.castShadow = true;
    sp.shadow.mapSize.width = sp.shadow.mapSize.height = 1024;
    scene.add(sp); scene.add(sp.target);

    // Podea
    var floorMat = (r.t === 'bath' || r.t === 'wc') ? M.floorBath :
                   r.t === 'kitchen' ? M.floorKitchen : M.floorLiving;
    var floor = new THREE.Mesh(new THREE.BoxGeometry(rW, 0.10, rD), floorMat);
    floor.position.set(rW/2, 0.05, rD/2);
    floor.receiveShadow = true;
    // UV2 pentru aoMap
    floor.geometry.setAttribute('uv2', floor.geometry.attributes.uv);
    scene.add(floor);

    // Tavan
    var ceil = new THREE.Mesh(new THREE.BoxGeometry(rW, 0.08, rD), M.ceiling);
    ceil.position.set(rW/2, hNiv - 0.04, rD/2);
    scene.add(ceil);

    // Pereți (4)
    var wT = 0.12, wH = hNiv - 0.18;
    [
      [rW + wT*2, wT, rW/2, hNiv/2, -wT/2],           // față
      [rW + wT*2, wT, rW/2, hNiv/2, rD + wT/2],         // spate
      [wT, rD, -wT/2, hNiv/2, rD/2],                    // stânga
      [wT, rD, rW + wT/2, hNiv/2, rD/2],                // dreapta
    ].forEach(function(w) {
      var wall = new THREE.Mesh(new THREE.BoxGeometry(w[0], wH, w[1]), M.wall);
      wall.position.set(w[2], w[3], w[4]);
      wall.geometry.setAttribute('uv2', wall.geometry.attributes.uv);
      wall.castShadow = true; wall.receiveShadow = true;
      scene.add(wall);
    });

    // Fereastră pe peretele din față
    var winW = Math.min(rW * 0.55, 1.6), winH = hNiv * 0.52;
    var win = new THREE.Mesh(new THREE.BoxGeometry(winW, winH, 0.05), M.glass);
    win.position.set(rW * 0.5, hNiv * 0.55, 0.04);
    scene.add(win);

    // Draperii
    _addCurtainsRoom(scene, THREE, M, rW, rD, hNiv);

    // Mobilier per tip cameră
    _addRoomFurniture(scene, THREE, M, room, rW, rD, hNiv, b);
  }

  // ── Draperii ─────────────────────────────────────────────────────────
  function _addCurtainsRoom(scene, THREE, M, rW, rD, hNiv) {
    var curtMat = new THREE.MeshPhysicalMaterial({
      color:0xC8D8E0, roughness:.88, metalness:0,
      sheen: 0.6,
      transparent:true, opacity:.85, side:THREE.DoubleSide,
    });
    var rodMat = M.metal;
    var cW = Math.min(rW * 0.20, 0.65), cH = hNiv * 0.70;
    var cGeo = new THREE.PlaneGeometry(cW, cH, 8, 14);
    var pos = cGeo.attributes.position;
    for (var vi = 0; vi < pos.count; vi++) {
      var u = pos.getX(vi) / cW + 0.5;
      pos.setZ(vi, Math.sin(u * Math.PI * 5) * 0.038);
    }
    pos.needsUpdate = true; cGeo.computeVertexNormals();

    [[rW*.15, hNiv*.55, 0.05], [rW*.85, hNiv*.55, 0.05]].forEach(function(p) {
      var c2 = new THREE.Mesh(cGeo.clone(), curtMat);
      c2.position.set(p[0], p[1], p[2]);
      c2.castShadow = true; scene.add(c2);
    });

    var rod = new THREE.Mesh(new THREE.CylinderGeometry(.011,.011,rW+.08,8), rodMat);
    rod.rotation.z = Math.PI/2;
    rod.position.set(rW/2, hNiv-.20, .05);
    scene.add(rod);
  }

  // ── Mobilier per tip cameră ───────────────────────────────────────────
  function _addRoomFurniture(scene, THREE, M, room, rW, rD, hNiv, b) {
    var t = room.t;

    if (t === 'living') {
      // Canapea
      _sofa(scene, THREE, M, rW*.5, 0.08, rD*.62, rW);
      // Masă cafea
      _coffeeTable(scene, THREE, M, rW*.5, 0.08, rD*.42);
      // TV
      _tv(scene, THREE, M, rW*.5, 0.08, rD*.9, rW);
      // Plantă
      _plant(scene, THREE, rW*.85, 0.08, rD*.15, 1.4);
      // Tablou
      _painting(scene, THREE, rW*.25, hNiv*.55, .05, .9, .65);

    } else if (t === 'bedroom' || t === 'bedroom2') {
      // Pat
      _bed(scene, THREE, M, rW*.5, 0.08, rD*.45, rW);
      // Noptiere
      _nightstand(scene, THREE, M, rW*.5 - Math.min(rW*.38, 1.1), 0.08, rD*.55);
      _nightstand(scene, THREE, M, rW*.5 + Math.min(rW*.38, 1.1), 0.08, rD*.55);
      // Plantă
      _plant(scene, THREE, rW*.12, 0.08, rD*.15, 1.0);
      // Oglindă
      _mirror(scene, THREE, M, rW*.85, hNiv*.5, .05, .60, .90);

    } else if (t === 'kitchen') {
      // Masă dining
      _diningTable(scene, THREE, M, rW*.5, 0.08, rD*.5, rW);
      // Scaune
      for (var ci = 0; ci < 4; ci++) {
        var ang = ci * Math.PI / 2;
        _chair(scene, THREE, M,
          rW*.5 + Math.sin(ang) * Math.min(rW*.28, 0.75),
          0.08,
          rD*.5 + Math.cos(ang) * Math.min(rD*.28, 0.55),
          ang + Math.PI
        );
      }
      // Plantă mică
      _plant(scene, THREE, rW*.1, 0.08, rD*.1, 0.7);

    } else if (t === 'bath' || t === 'wc') {
      // Oglindă mare
      _mirror(scene, THREE, M, rW*.5, hNiv*.5, .05, Math.min(rW*.65, 1.2), Math.min(hNiv*.5, 0.9));
      // Lavoar (box simplu)
      var lavoar = new THREE.Mesh(
        new THREE.BoxGeometry(Math.min(rW*.5,.6), .12, .38),
        new THREE.MeshPhysicalMaterial({color:0xF2F0EE,roughness:.06,metalness:.02,clearcoat:1.0,envMapIntensity:2.2})
      );
      lavoar.position.set(rW*.5, .76, .25);
      lavoar.castShadow = true; scene.add(lavoar);
    }
  }

  // ── Geometrii mobilier ─────────────────────────────────────────────────
  function _sofa(scene, THREE, M, x, y, z, rW) {
    var W = Math.min(rW*.72, 2.5), D = .95, g = new THREE.Group();
    var base = new THREE.Mesh(new THREE.BoxGeometry(W,.10,D),
      new THREE.MeshPhysicalMaterial({color:0x1A1008,roughness:.9}));
    base.position.y=.05; base.castShadow=true; g.add(base);
    var seat = new THREE.Mesh(new THREE.BoxGeometry(W,.22,D*.62),M.sofa);
    seat.position.set(0,.22,D*.07); seat.castShadow=true; g.add(seat);
    var back = new THREE.Mesh(new THREE.BoxGeometry(W,.60,.14),M.sofa);
    back.position.set(0,.55,-D*.40); back.rotation.x=-.07; back.castShadow=true; g.add(back);
    [-W/2+.10,W/2-.10].forEach(function(ax){
      var arm=new THREE.Mesh(new THREE.BoxGeometry(.18,.30,D*.78),M.sofa);
      arm.position.set(ax,.34,-D*.03); arm.castShadow=true; g.add(arm);
    });
    var nC=Math.round(W/.88);
    for(var i=0;i<nC;i++){
      var cush=new THREE.Mesh(new THREE.BoxGeometry(.70,.42,.48),M.sofa);
      cush.position.set(-W/2+.44+i*(W-.76)/Math.max(nC-1,1),.63,-D*.15);
      cush.rotation.x=-.08; cush.castShadow=true; g.add(cush);
    }
    [[-W/2+.12,-D/2+.10],[W/2-.12,-D/2+.10],[-W/2+.12,D/2-.10],[W/2-.12,D/2-.10]].forEach(function(p){
      var leg=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,.11,8),M.metal);
      leg.position.set(p[0],.055,p[1]); g.add(leg);
    });
    g.position.set(x,y,z); scene.add(g);
  }

  function _coffeeTable(scene, THREE, M, x, y, z) {
    var g = new THREE.Group();
    var top = new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.04,32), M.glass);
    top.position.y=.42; top.castShadow=true; g.add(top);
    var sup = new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.38,8),M.metal);
    sup.position.y=.19; g.add(sup);
    var base = new THREE.Mesh(new THREE.CylinderGeometry(.28,.28,.04,32),M.metal);
    base.position.y=.02; g.add(base);
    g.position.set(x,y,z); scene.add(g);
  }

  function _tv(scene, THREE, M, x, y, z, rW) {
    var W=Math.min(rW*.52,1.5), g=new THREE.Group();
    var con=new THREE.Mesh(new THREE.BoxGeometry(W,.48,.38),M.darkWood);
    con.position.y=.24; con.castShadow=true; g.add(con);
    var scr=new THREE.Mesh(new THREE.BoxGeometry(W*.88,W*.50,.05),
      new THREE.MeshPhysicalMaterial({color:0x030508,roughness:.02,metalness:.4,emissive:0x010820,emissiveIntensity:.8}));
    scr.position.set(0,.48+W*.25,-.17); g.add(scr);
    g.position.set(x,y,z); scene.add(g);
  }

  function _bed(scene, THREE, M, x, y, z, rW) {
    var W=Math.min(rW*.72,1.8), D=2.05, g=new THREE.Group();
    var frame=new THREE.Mesh(new THREE.BoxGeometry(W+.12,.30,D+.06),M.darkWood);
    frame.position.y=.15; frame.castShadow=true; g.add(frame);
    var matt=new THREE.Mesh(new THREE.BoxGeometry(W,.24,D-.04),
      new THREE.MeshPhysicalMaterial({color:0xF0EDE5,roughness:.90}));
    matt.position.y=.42; g.add(matt);
    var duvet=new THREE.Mesh(new THREE.BoxGeometry(W-.06,.10,D*.62),
      new THREE.MeshPhysicalMaterial({color:0x607090,roughness:.90,sheen:.7}));
    duvet.position.set(0,.58,D*.10); duvet.castShadow=true; g.add(duvet);
    [-W/4,W/4].forEach(function(px){
      var p=new THREE.Mesh(new THREE.BoxGeometry(.68,.16,.48),
        new THREE.MeshPhysicalMaterial({color:0xFFFDF8,roughness:.90}));
      p.position.set(px,.60,-D*.35); g.add(p);
    });
    var head=new THREE.Mesh(new THREE.BoxGeometry(W+.10,1.0,.12),
      new THREE.MeshPhysicalMaterial({color:0x8B7355,roughness:.78,sheen:.9}));
    head.position.set(0,.80,-D/2-.04); head.castShadow=true; g.add(head);
    g.position.set(x,y,z); scene.add(g);
  }

  function _nightstand(scene, THREE, M, x, y, z) {
    var g=new THREE.Group();
    var body=new THREE.Mesh(new THREE.BoxGeometry(.45,.52,.40),M.darkWood);
    body.position.y=.26; body.castShadow=true; g.add(body);
    var lamp=new THREE.Mesh(new THREE.SphereGeometry(.055,10,8),
      new THREE.MeshPhysicalMaterial({color:0xFFF8E0,emissive:0xFFE890,emissiveIntensity:1.8,transparent:true,opacity:.88}));
    lamp.position.set(0,.62,0); g.add(lamp);
    g.position.set(x,y,z); scene.add(g);
  }

  function _diningTable(scene, THREE, M, x, y, z, rW) {
    var W=Math.min(rW*.58,1.6), g=new THREE.Group();
    var top=new THREE.Mesh(new THREE.CylinderGeometry(W/2,W/2,.05,32),M.darkWood);
    top.position.y=.76; top.castShadow=true; g.add(top);
    var leg=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.73,8),M.metal);
    leg.position.y=.365; g.add(leg);
    var foot=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.03,8),M.metal);
    foot.position.y=.015; g.add(foot);
    g.position.set(x,y,z); scene.add(g);
  }

  function _chair(scene, THREE, M, x, y, z, rotY) {
    var g=new THREE.Group();
    var seat=new THREE.Mesh(new THREE.BoxGeometry(.44,.06,.42),M.sofa);
    seat.position.y=.44; g.add(seat);
    var back=new THREE.Mesh(new THREE.BoxGeometry(.40,.40,.05),M.sofa);
    back.position.set(0,.68,-.19); g.add(back);
    [[-0.17,-0.17],[0.17,-0.17],[-0.17,0.17],[0.17,0.17]].forEach(function(p){
      var leg=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.44,6),M.metal);
      leg.position.set(p[0],.22,p[1]); g.add(leg);
    });
    g.position.set(x,y,z); if(rotY) g.rotation.y=rotY;
    scene.add(g);
  }

  function _plant(scene, THREE, x, y, z, h) {
    var g=new THREE.Group();
    var pot=new THREE.Mesh(new THREE.CylinderGeometry(.13,.09,.28,12),
      new THREE.MeshPhysicalMaterial({color:0x1E1510,roughness:.75}));
    pot.position.y=.14; pot.castShadow=true; g.add(pot);
    var cv2=document.createElement('canvas'); cv2.width=cv2.height=256;
    var lctx=cv2.getContext('2d');
    var grd=lctx.createRadialGradient(128,180,0,128,128,110);
    grd.addColorStop(0,'rgba(25,110,30,.97)'); grd.addColorStop(.7,'rgba(15,80,18,.85)'); grd.addColorStop(1,'rgba(5,40,8,0)');
    lctx.fillStyle=grd; lctx.beginPath(); lctx.ellipse(128,180,105,130,0,0,Math.PI*2); lctx.fill();
    var ltex=new THREE.CanvasTexture(cv2);
    var lmat=new THREE.MeshStandardMaterial({map:ltex,transparent:true,alphaTest:.05,roughness:.8,side:THREE.DoubleSide,emissive:0x042008,emissiveIntensity:.18});
    for(var j=0;j<5;j++){var a=j*Math.PI/2.5+.3;var lf=new THREE.Mesh(new THREE.PlaneGeometry(h*.48,h),lmat);lf.position.set(Math.sin(a)*.07,.28+h*.42,Math.cos(a)*.07);lf.rotation.y=a;lf.rotation.x=-.22;scene.add(lf);}
    g.position.set(x,y,z); scene.add(g);
  }

  function _mirror(scene, THREE, M, x, y, z, W, H) {
    var g=new THREE.Group();
    var frame=new THREE.Mesh(new THREE.BoxGeometry(W+.06,H+.06,.04),M.metal);
    frame.position.z=-.01; g.add(frame);
    var mir=new THREE.Mesh(new THREE.BoxGeometry(W,H,.02),
      new THREE.MeshPhysicalMaterial({color:0xFFFFFF,roughness:0,metalness:.98,envMapIntensity:3.5}));
    g.add(mir);
    g.position.set(x,y,z); scene.add(g);
  }

  function _painting(scene, THREE, x, y, z, W, H) {
    var cv3=document.createElement('canvas'); cv3.width=cv3.height=256;
    var c3=cv3.getContext('2d');
    var gr=c3.createLinearGradient(0,0,256,256);
    gr.addColorStop(0,'#1a2040'); gr.addColorStop(1,'#402010');
    c3.fillStyle=gr; c3.fillRect(0,0,256,256);
    c3.globalAlpha=.4;
    [[60,80,28],[140,60,35],[200,150,20],[80,200,25],[180,100,30]].forEach(function(p){
      c3.fillStyle='rgba(255,255,255,.5)';
      c3.beginPath(); c3.arc(p[0],p[1],p[2],0,Math.PI*2); c3.fill();
    });
    var g=new THREE.Group();
    var frame=new THREE.Mesh(new THREE.BoxGeometry(W+.05,H+.05,.03),
      new THREE.MeshPhysicalMaterial({color:0x2A1808,roughness:.2,clearcoat:.6}));
    frame.position.z=-.01; g.add(frame);
    var canvas=new THREE.Mesh(new THREE.BoxGeometry(W,H,.02),
      new THREE.MeshStandardMaterial({map:new THREE.CanvasTexture(cv3),roughness:.8}));
    g.add(canvas);
    g.position.set(x,y,z); scene.add(g);
  }

  // ── Scena exterior ────────────────────────────────────────────────────
  function _buildExteriorScene(scene, THREE, M, b, RV) {
    scene.add(new THREE.HemisphereLight(0xC8E0F0, 0x886050, 0.7));
    var sun=new THREE.DirectionalLight(0xFFF5E0, 3.5);
    sun.position.set(b.bW*2, b.bW*3, b.bD*2);
    sun.castShadow=true;
    sun.shadow.mapSize.width=sun.shadow.mapSize.height=4096;
    sun.shadow.bias=-.0003;
    scene.add(sun);
    scene.add(new THREE.DirectionalLight(0xC8E0FF,.8)).position.set(-b.bW,b.bW*2,-b.bD);

    // Teren
    var ground=new THREE.Mesh(new THREE.PlaneGeometry(b.bW*6,b.bD*6),
      new THREE.MeshPhysicalMaterial({color:0x8A9870,roughness:.95}));
    ground.rotation.x=-Math.PI/2; ground.receiveShadow=true; scene.add(ground);

    // Construim etaje din _RV.floors
    if (RV.floors) {
      var hNiv = (b.P && b.P.hn) || 3.0;
      RV.floors.forEach(function(fl, fIdx) {
        if (!fl || !fl.rects) return;
        var baseY = fIdx * hNiv;
        fl.rects.forEach(function(r) {
          if (r.apt < 0) return;
          var wall=new THREE.Mesh(new THREE.BoxGeometry(r.w,hNiv,r.h),M.wall);
          wall.position.set(r.x+r.w/2, baseY+hNiv/2, r.y+r.h/2);
          wall.castShadow=true; wall.receiveShadow=true; scene.add(wall);
        });
      });
    }
  }

  // ── Scena secțiune ────────────────────────────────────────────────────
  function _buildSectionScene(scene, THREE, M, b, RV, hNiv) {
    scene.add(new THREE.HemisphereLight(0xD8E8F8, 0x806040, 0.6));
    var sun=new THREE.DirectionalLight(0xFFF5E0,3.2);
    sun.position.set(b.bW*1.5,b.bW*2.5,b.bD*3);
    sun.castShadow=true; sun.shadow.mapSize.width=sun.shadow.mapSize.height=4096;
    scene.add(sun);
    scene.add(new THREE.DirectionalLight(0xC8E0FF,.7)).position.set(-b.bW,b.bW*2,-b.bD);

    // ClippingPlane — tăiem clădirea frontal
    var clipPlane=new THREE.Plane(new THREE.Vector3(0,0,1), b.bD*.05);

    if (RV.floors) {
      RV.floors.forEach(function(fl, fIdx) {
        if (!fl || !fl.rects) return;
        var baseY = fIdx * hNiv;
        fl.rects.forEach(function(r) {
          if (r.apt < 0) return;
          var floorMat = (r.t==='bath'||r.t==='wc') ? M.floorBath :
                         r.t==='kitchen' ? M.floorKitchen : M.floorLiving;
          var f=new THREE.Mesh(new THREE.BoxGeometry(r.w,.10,r.h),floorMat);
          f.position.set(r.x+r.w/2,baseY+.05,r.y+r.h/2); f.receiveShadow=true; scene.add(f);
          var wm=M.wall.clone(); wm.clippingPlanes=[clipPlane]; wm.clipShadows=true;
          var wall=new THREE.Mesh(new THREE.BoxGeometry(r.w,hNiv-.18,r.h),wm);
          wall.position.set(r.x+r.w/2,baseY+hNiv/2,r.y+r.h/2);
          wall.castShadow=true; wall.receiveShadow=true; scene.add(wall);
        });
      });
    }

    // Teren
    var gr=new THREE.Mesh(new THREE.PlaneGeometry(b.bW*4,b.bD*4),
      new THREE.MeshPhysicalMaterial({color:0x8A9870,roughness:.95}));
    gr.rotation.x=-Math.PI/2; gr.receiveShadow=true; scene.add(gr);
  }

  // ── Post-processing pe canvas ─────────────────────────────────────────
  function _postProcess(ctx, W, H) {
    // Vignette
    var vg=ctx.createRadialGradient(W/2,H/2,H*.28,W/2,H/2,H*.78);
    vg.addColorStop(0,'rgba(0,0,0,0)');
    vg.addColorStop(.6,'rgba(0,0,0,0.05)');
    vg.addColorStop(1,'rgba(0,0,0,0.32)');
    ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
    // Film grain
    var id=ctx.getImageData(0,0,W,H); var d=id.data;
    for(var i=0;i<d.length;i+=4){var g=(Math.random()-.5)*5;d[i]=Math.min(255,Math.max(0,d[i]+g));d[i+1]=Math.min(255,Math.max(0,d[i+1]+g));d[i+2]=Math.min(255,Math.max(0,d[i+2]+g));}
    ctx.putImageData(id,0,0);
    // Warm grade
    ctx.fillStyle='rgba(255,240,200,0.022)'; ctx.fillRect(0,0,W,H);
  }

  // ── Zoom imagine ──────────────────────────────────────────────────────
  window._galleryZoom = function(img) {
    var ov=document.createElement('div');
    ov.style.cssText='position:fixed;inset:0;z-index:99999999;background:rgba(0,0,0,.95);cursor:zoom-out;display:flex;align-items:center;justify-content:center';
    ov.onclick=function(){ov.remove();};
    var i2=document.createElement('img');
    i2.src=img.src; i2.style.cssText='max-width:98vw;max-height:98vh;object-fit:contain';
    ov.appendChild(i2); document.body.appendChild(ov);
  };

  // ── Init ──────────────────────────────────────────────────────────────
  function waitReady(cb,n){n=n||0;if(n>200)return;if(window.THREE){cb();return;}setTimeout(function(){waitReady(cb,n+1);},250);}
  waitReady(function(){
    _inject();
    // Expunem global pentru butonul Render HD din 27-tur-sync.js
    window._launchGallery4K = _launchGallery;
    console.log('[Gallery4K v1.3] ✅ r128 compatibil + camera fix');
  });

})();
