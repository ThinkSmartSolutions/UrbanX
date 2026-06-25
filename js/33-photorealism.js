// ═══════════════════════════════════════════════════════════════════════════
// 33-photorealism.js — Studio Render: PBR complet + HDRI + Iluminare realistă
// UrbanX TSS·FG | v3.0 | 10 Iunie 2026
//
// Diferențe față de v2:
//   • MeshPhysicalMaterial pe toate suprafețele (clearcoat + transmission + sheen)
//   • Normal maps cu intensitate corectă per suprafață
//   • AO maps cu intensity 1.0 (colțuri realiste)
//   • Lumina solară DirectionalLight cu shadow 4096px + SpotLight pe podea
//   • Ferestre cu transmission + ior (sticlă reală)
//   • Draperii/perdele procedurale per cameră
//   • Reflexii pe podea (clearcoat 0.3 pe parchet)
//   • Tone mapping ACESFilmic, exposure 1.35
//   • Film grain + vignette în post-processing
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const PBR  = 'assets/tur3d/pbr/';
  const HDRI = 'assets/tur3d/hdri/';

  // ── Cache ─────────────────────────────────────────────────────────────
  const _TC = {};

  // ── TextureLoader cu cache + repeat ──────────────────────────────────
  function _tex(THREE, path, repeat) {
    if (_TC[path]) return _TC[path];
    const t = new THREE.TextureLoader().load(path);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat || 4, repeat || 4);
    t.anisotropy = 16;
    return (_TC[path] = t);
  }

  // ── MeshPhysicalMaterial cu toate PBR maps ────────────────────────────
  function _mat(THREE, opts) {
    const dir = opts.dir;
    const rep = opts.repeat || 4;

    const m = new THREE.MeshPhysicalMaterial({
      // Texturi PBR reale 2048px
      map:          dir ? _tex(THREE, PBR+dir+'/diff.jpg', rep)     : undefined,
      normalMap:    dir ? _tex(THREE, PBR+dir+'/nor_gl.jpg', rep)   : undefined,
      roughnessMap: dir ? _tex(THREE, PBR+dir+'/rough.jpg', rep)    : undefined,
      aoMap:        dir ? _tex(THREE, PBR+dir+'/ao.jpg', rep)       : undefined,

      // Proprietăți fizice
      color:        opts.color     !== undefined ? new THREE.Color(opts.color)     : undefined,
      roughness:    opts.roughness !== undefined ? opts.roughness : 0.7,
      metalness:    opts.metalness !== undefined ? opts.metalness : 0.0,
      normalScale:  new THREE.Vector2(opts.normalScale || 0.8, opts.normalScale || 0.8),
      aoMapIntensity: opts.ao !== undefined ? opts.ao : 1.0,
      envMapIntensity: opts.envI !== undefined ? opts.envI : 1.2,

      // MeshPhysical extras (doar cele suportate cert de THREE r128)
      clearcoat:            opts.cc    !== undefined ? opts.cc    : 0,
      clearcoatRoughness:   opts.ccR   !== undefined ? opts.ccR   : 0.1,
      transmission:         opts.trans !== undefined ? opts.trans : 0,
      ior:                  opts.ior   !== undefined ? opts.ior   : 1.5,
    });

    // THREE r128 NU are thickness/sheen/sheenColor/sheenRoughness pe MeshPhysicalMaterial
    // → setate doar daca proprietatea exista pe instanta (elimina 556 warning-uri "is not a property")
    if (opts.thick  !== undefined && 'thickness'      in m) m.thickness      = opts.thick;
    if (opts.sheen  !== undefined && 'sheen'          in m) m.sheen          = opts.sheen;
    if (opts.sheenR !== undefined && 'sheenRoughness' in m) m.sheenRoughness = opts.sheenR;
    if (opts.sheenC && 'sheenColor' in m) { try { m.sheenColor = new THREE.Color(opts.sheenC); } catch (e) {} }

    // Curățăm undefined
    Object.keys(m).forEach(k => { if (m[k] === undefined) delete m[k]; });
    return m;
  }

  // ── Materiale studio per suprafață + stil ─────────────────────────────
  function _getMats(THREE, stil) {
    const isClasic = stil === 'clasic';
    const isMini   = stil === 'minimalist';
    const isIndu   = stil === 'industrial';
    const isInov   = stil === 'inovator';

    return {
      // ── PODELE ──────────────────────────────────────────────────────
      floor_living: _mat(THREE, {
        dir: 'parchet_stejar', repeat: 5,
        roughness: 0.50, metalness: 0.01,
        normalScale: 0.55, ao: 0.9,
        cc: 0.30, ccR: 0.20,          // reflexie pe parchet lustruit
        envI: 1.4,
      }),
      floor_bedroom: _mat(THREE, {
        dir: 'parchet_stejar', repeat: 5,
        roughness: 0.62, metalness: 0.01,
        normalScale: 0.45, ao: 0.9,
        cc: 0.15, ccR: 0.25, envI: 1.1,
      }),
      floor_bath: _mat(THREE, {
        dir: 'marble_white', repeat: 2,
        roughness: 0.10, metalness: 0.05,
        normalScale: 0.7, ao: 1.0,
        cc: 1.0, ccR: 0.04, envI: 2.0,
      }),
      floor_kitchen: _mat(THREE, {
        dir: isClasic ? 'marble_white' : 'blat_bucatarie', repeat: 3,
        roughness: isClasic ? 0.12 : 0.35, metalness: 0.05,
        normalScale: 0.6, ao: 0.95,
        cc: isClasic ? 0.9 : 0.3, ccR: 0.06, envI: 1.5,
      }),
      floor_hall: _mat(THREE, {
        dir: isMini ? 'marble_white' : 'parchet_stejar', repeat: 4,
        roughness: isMini ? 0.12 : 0.48, metalness: 0.02,
        normalScale: 0.5, ao: 0.9, cc: isMini ? 0.8 : 0.2, envI: 1.3,
      }),

      // ── PEREȚI ──────────────────────────────────────────────────────
      wall: _mat(THREE, {
        dir: isIndu ? 'caramida_aparenta' : 'tencuiala_interior', repeat: isIndu ? 3 : 6,
        roughness: isIndu ? 0.85 : (isMini ? 0.92 : 0.82),
        metalness: isInov ? 0.08 : 0.0,
        normalScale: isIndu ? 0.9 : 0.35, ao: 0.7,
        envI: 0.5,
      }),
      wall_accent: _mat(THREE, {
        dir: isClasic ? 'caramida_aparenta' : 'tencuiala_interior', repeat: 3,
        roughness: 0.88, metalness: 0.0, normalScale: 0.6,
        color: isClasic ? '#D4C4A0' : isInov ? '#2A3040' : '#F0EDE6',
        envI: 0.4,
      }),

      // ── PLAFON ──────────────────────────────────────────────────────
      ceiling: _mat(THREE, {
        color: isMini ? '#FBFBFB' : '#F6F2EA',
        roughness: 0.94, metalness: 0.0, envI: 0.2, ao: 0.8,
      }),

      // ── MOBILIER ────────────────────────────────────────────────────
      sofa: _mat(THREE, {
        dir: 'fabric_canapea', repeat: 2,
        color: isClasic ? '#6B5040' : isMini ? '#C0B8B0' : isInov ? '#1A1A2A' : '#3A4A5E',
        roughness: 0.88, metalness: 0.0,
        sheen: 1.0, sheenR: 0.55,
        sheenC: isClasic ? '#A08060' : isMini ? '#D8D0C8' : '#607090',
        ao: 1.0, normalScale: 0.5, envI: 0.6,
      }),
      cushion: _mat(THREE, {
        dir: 'fabric_canapea', repeat: 1.5,
        color: isClasic ? '#C8A060' : isMini ? '#D8D0C8' : '#C97862',
        roughness: 0.85, metalness: 0.0,
        sheen: 0.8, sheenR: 0.6, sheenC: '#E0C090',
        ao: 1.0, envI: 0.5,
      }),
      bed_headboard: _mat(THREE, {
        dir: 'fabric_canapea', repeat: 1,
        color: '#8B7355', roughness: 0.78,
        sheen: 0.9, sheenR: 0.55, sheenC: '#AA9070',
        envI: 0.5,
      }),
      mattress: _mat(THREE, {
        dir: 'fabric_canapea', repeat: 2,
        color: '#F0EDE8', roughness: 0.93,
        sheen: 0.3, sheenR: 0.8, envI: 0.3,
      }),
      blanket: _mat(THREE, {
        dir: 'fabric_canapea', repeat: 1.5,
        color: isClasic ? '#8080A0' : '#607090',
        roughness: 0.90, metalness: 0.0,
        sheen: 0.7, sheenR: 0.65, envI: 0.4,
      }),
      pillow: _mat(THREE, {
        dir: 'fabric_canapea', repeat: 1,
        color: '#FEFCF8', roughness: 0.92, metalness: 0.0,
        sheen: 0.4, sheenR: 0.8, envI: 0.3,
      }),

      // ── LEMN / MOBILIER CORP ─────────────────────────────────────────
      wood_dark: _mat(THREE, {
        dir: 'parchet_stejar', repeat: 1.5,
        color: isClasic ? '#2A1808' : '#1A0A04',
        roughness: 0.18, metalness: 0.01,
        normalScale: 0.7, cc: 0.95, ccR: 0.05, envI: 1.5,
      }),
      wood_light: _mat(THREE, {
        dir: 'parchet_stejar', repeat: 2,
        color: '#C8946A', roughness: 0.55, metalness: 0.01,
        normalScale: 0.5, cc: 0.3, ccR: 0.2, envI: 1.0,
      }),

      // ── METAL ────────────────────────────────────────────────────────
      metal_gold: _mat(THREE, {
        dir: 'metal_finish', repeat: 1,
        color: '#C8A020', roughness: 0.12, metalness: 0.97,
        cc: 1.0, ccR: 0.04, envI: 2.5,
      }),
      metal_chrome: _mat(THREE, {
        dir: 'metal_finish', repeat: 1,
        color: '#C8C8C8', roughness: 0.08, metalness: 0.98,
        cc: 1.0, ccR: 0.03, envI: 2.8,
      }),
      metal_black: _mat(THREE, {
        color: '#1A1A1A', roughness: 0.25, metalness: 0.92,
        cc: 0.8, ccR: 0.08, envI: 2.0,
      }),

      // ── STICLĂ ──────────────────────────────────────────────────────
      glass_window: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#C8E8F8'),
        transparent: true, opacity: 0.14,
        roughness: 0.0, metalness: 0.0,
        transmission: 0.97, thickness: 0.5, ior: 1.52,
        envMapIntensity: 2.5,
        side: THREE.DoubleSide,
      }),
      glass_table: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#D8F0F8'),
        transparent: true, opacity: 0.12,
        roughness: 0.0, metalness: 0.0,
        transmission: 0.98, thickness: 0.4, ior: 1.52,
        envMapIntensity: 3.0,
      }),
      glass_mirror: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FFFFFF'),
        roughness: 0.0, metalness: 0.98,
        envMapIntensity: 3.5,
      }),

      // ── SANITAR ──────────────────────────────────────────────────────
      sanitar: _mat(THREE, {
        color: '#F2F0EE', roughness: 0.06, metalness: 0.03,
        cc: 1.0, ccR: 0.02, envI: 2.2,
      }),

      // ── DRAPERIE ─────────────────────────────────────────────────────
      curtain: _mat(THREE, {
        dir: 'fabric_canapea', repeat: 2,
        color: isClasic ? '#D8C8A0' : isMini ? '#F0EDE8' : '#C8D8E0',
        roughness: 0.88, metalness: 0.0,
        sheen: 0.6, sheenR: 0.7, envI: 0.3,
        trans: 0.15, // semitransparent
      }),
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // UPGRADE SCENĂ — aplică toate materialele studio
  // ═══════════════════════════════════════════════════════════════════════

  function _upgradeScene() {
    const state = window.VTour?._state;
    if (!state?.scene || state._studioUpgraded) return;
    state._studioUpgraded = true;

    const THREE = window.THREE;
    const stil  = window.AEDIS?.stil || 'modern';
    const MATS  = _getMats(THREE, stil);

    // 1. HDRI real
    _applyHDRI(THREE, state, MATS);

    // 2. Renderer studio settings
    _configRenderer(state.renderer);

    // 3. Upgrade materiale
    _upgradeMaterials(THREE, state, MATS);

    // 4. Iluminare studio
    _applyLighting(THREE, state);

    // 5. Draperii
    _addCurtains(THREE, state, MATS);

    // 6. Reflexii podea
    _addFloorReflection(THREE, state);

    console.log('[Studio v3] ✅ Render studio aplicat complet');
    if (typeof ss === 'function') ss('✨ Materiale studio PBR aplicate');
  }

  // ── Renderer settings studio ─────────────────────────────────────────
  function _configRenderer(renderer) {
    if (!renderer || renderer._studioConfig) return;
    renderer._studioConfig = true;
    const THREE = window.THREE;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = true;
    renderer.physicallyCorrectLights = true;
  }

  // ── HDRI cu PMREMGenerator ────────────────────────────────────────────
  function _applyHDRI(THREE, state, MATS) {
    if (!THREE.RGBELoader) return;
    const isNight = window._v3dNight || false;
    const hdriFile = isNight ? 'golden.hdr' : 'interior.hdr';

    new THREE.RGBELoader().load(
      HDRI + hdriFile,
      function(hdr) {
        const pmrem = new THREE.PMREMGenerator(state.renderer);
        pmrem.compileEquirectangularShader();
        const envMap = pmrem.fromEquirectangular(hdr).texture;
        hdr.dispose(); pmrem.dispose();

        state.scene.environment = envMap;
          window._urbanxEnvMap = envMap; // cache global
        state.scene.environmentIntensity = isNight ? 0.5 : 1.2;

        // Propagăm envMap pe toate materialele
        state.scene.traverse(obj => {
          if (!obj.isMesh || !obj.material) return;
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach(m => {
            m.envMap = envMap;
            m.needsUpdate = true;
          });
        });

        // Propagăm și pe materialele studio
        Object.values(MATS).forEach(m => {
          if (m && m.isMaterial) { m.envMap = envMap; m.needsUpdate = true; }
        });
      }
    );
  }

  // ── Upgrade materiale → PBR studio ───────────────────────────────────
  function _upgradeMaterials(THREE, state, MATS) {
    const COLOR_MAP = {
      // Podele (culorile din VTour _genFloor)
      '#e8e0d0': MATS.floor_living,  '#d8d0c0': MATS.floor_living,
      '#c8c0b0': MATS.floor_bedroom, '#d0c8b8': MATS.floor_hall,
      '#b8d4e3': MATS.floor_bath,    '#4a5160': MATS.floor_kitchen,
      '#b8ccd8': MATS.floor_bath,    '#d4a574': MATS.floor_living,
      '#c89968': MATS.floor_bedroom, '#e6d4b8': MATS.floor_hall,

      // Pereți
      '#f5f0e8': MATS.wall, '#ede8e0': MATS.wall,
      '#e0dcd4': MATS.wall, '#f0e8d8': MATS.wall,
      '#f8f6f0': MATS.wall, '#f0ece4': MATS.wall,

      // Sofa/canapea
      '#3a4a5e': MATS.sofa,  '#4a3829': MATS.sofa,
      '#1a1a2a': MATS.sofa,  '#6b5040': MATS.sofa,

      // Perne/cushion
      '#c97862': MATS.cushion, '#d08070': MATS.cushion,
      '#c8b89a': MATS.cushion, '#d4a574': MATS.cushion,

      // Pat/bed
      '#f0ede5': MATS.mattress, '#f5f0e8': MATS.pillow,
      '#607090': MATS.blanket,  '#8080a0': MATS.blanket,

      // Lemn
      '#2a1808': MATS.wood_dark, '#1a0a04': MATS.wood_dark,
      '#3a220a': MATS.wood_dark, '#5c3d1e': MATS.wood_light,
      '#c8946a': MATS.wood_light,

      // Metal/gold
      '#c8a030': MATS.metal_gold, '#c0a040': MATS.metal_gold,
      '#d4af37': MATS.metal_gold, '#b08830': MATS.metal_gold,
      '#888888': MATS.metal_chrome,'#c0c0c0': MATS.metal_chrome,
      '#1a1a1a': MATS.metal_black,

      // Sanitar
      '#e0eef5': MATS.sanitar, '#b8d4e3': MATS.sanitar,
      '#f0f0f0': MATS.sanitar,

      // Sticlă
      '#add8e6': MATS.glass_window, '#87ceeb': MATS.glass_window,
      '#c8e8f8': MATS.glass_window, '#b8d8e8': MATS.glass_window,
    };

    let n = 0;
    state.scene.traverse(obj => {
      if (!obj.isMesh || !obj.material || obj.userData?.skipPBR) return;
      const mat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
      if (!mat?.color) return;

      const hex = '#' + mat.color.getHexString();
      const newMat = COLOR_MAP[hex] || COLOR_MAP[hex.toLowerCase()];
      if (newMat) {
        obj.material = newMat;
        // aoMap2 channel fix
        if (obj.geometry && !obj.geometry.attributes.uv2) {
          obj.geometry.setAttribute('uv2', obj.geometry.attributes.uv);
        }
        n++;
      }

      // Plafoane (albe, sus, plane)
      if (!newMat) {
        const geo = obj.geometry;
        if (geo) {
          if (!geo.boundingBox) geo.computeBoundingBox();
          const h = geo.boundingBox.max.y - geo.boundingBox.min.y;
          if (h < 0.15 && obj.position.y > 2.5) {
            obj.material = MATS.ceiling;
            n++;
          }
        }
      }
    });

    console.log('[Studio v3] ' + n + ' materiale PBR aplicate');
  }

  // ── Iluminare studio realistă ─────────────────────────────────────────
  function _applyLighting(THREE, state) {
    const anchor = state._anchor;
    const b = window._RV?.building;
    if (!anchor || !b) return;

    // Ștergem luminile generice existente
    const toRemove = [];
    state.scene.traverse(obj => {
      if (obj.isLight && !obj.userData?.keepLight) toRemove.push(obj);
    });
    toRemove.forEach(l => state.scene.remove(l));

    const hNiv = b.P?.hn || 3.0;
    const niv  = b.niv || 3;
    const bW   = anchor.bW, bD = anchor.bD;

    // 1. Soare principal — DirectionalLight cu shadow 4096px
    const sun = new THREE.DirectionalLight(0xFFF5E0, 3.5);
    sun.position.set(anchor.cx + 40, anchor.baseY + 80, anchor.cz + 25);
    sun.castShadow = true;
    sun.shadow.mapSize.width  = 4096;
    sun.shadow.mapSize.height = 4096;
    const ext = Math.max(bW, bD) * 2;
    sun.shadow.camera.left   = -ext; sun.shadow.camera.right  =  ext;
    sun.shadow.camera.top    =  ext; sun.shadow.camera.bottom = -ext;
    sun.shadow.camera.near   = 1;    sun.shadow.camera.far    = 400;
    sun.shadow.bias          = -0.0003;
    sun.shadow.normalBias    = 0.04;
    sun.shadow.radius        = 3; // soft shadows
    state.scene.add(sun);

    // 2. Fill light (din direcție opusă, fără shadow)
    const fill = new THREE.DirectionalLight(0xC8E0FF, 0.9);
    fill.position.set(anchor.cx - 30, anchor.baseY + 50, anchor.cz - 35);
    state.scene.add(fill);

    // 3. Ambient hemisferic cald
    const hemi = new THREE.HemisphereLight(0xD8E8F8, 0x806040, 0.6);
    state.scene.add(hemi);

    // 4. Lumini per cameră + SpotLight lumina solară pe podea
    const fl = window._RV?.floors?.[0];
    if (!fl?.rects) return;

    const ox = anchor.cx - bW / 2;
    const oz = anchor.cz - bD / 2;

    fl.rects.forEach(r => {
      if (r.bal || r.apt < 0) return;
      const cx = ox + r.x + r.w / 2;
      const cz = oz + r.y + r.h / 2;
      const baseY = anchor.baseY;

      // Lampă de tavan
      const col = r.t === 'bath'   ? 0xE8F4FF :
                  r.t === 'kitchen'? 0xFFFAF0 : 0xFFE8C0;
      const inten = r.t === 'living' ? 0.85 : r.t === 'bedroom' ? 0.55 : 0.45;
      const pl = new THREE.PointLight(col, inten, hNiv * 3.5);
      pl.position.set(cx, baseY + hNiv - 0.28, cz);
      state.scene.add(pl);

      // Glob lampă emissiv
      const globe = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 10, 8),
        new THREE.MeshPhysicalMaterial({
          color: 0xFFF8E0, emissive: 0xFFE890, emissiveIntensity: 2.0,
          transparent: true, opacity: 0.88,
        })
      );
      globe.position.set(cx, baseY + hNiv - 0.30, cz);
      state.scene.add(globe);

      // SpotLight lumina solară prin fereastră (living + dormitor)
      if (r.t === 'living' || r.t === 'bedroom' || r.t === 'bedroom2') {
        const winZ = oz + r.y + 0.3; // peretele cu fereastră
        const sp = new THREE.SpotLight(0xFFF8E0, 2.8, hNiv * 4, Math.PI / 7, 0.35, 1.5);
        sp.position.set(cx + r.w * 0.2, baseY + hNiv - 0.3, winZ + 0.3);
        sp.target.position.set(cx - r.w * 0.1, baseY + 0.05, cz);
        sp.castShadow = true;
        sp.shadow.mapSize.width = sp.shadow.mapSize.height = 1024;
        sp.shadow.bias = -0.001;
        sp.userData = { keepLight: true };
        state.scene.add(sp);
        state.scene.add(sp.target);
      }
    });
  }

  // ── Draperii/perdele ──────────────────────────────────────────────────
  function _addCurtains(THREE, state, MATS) {
    const anchor = state._anchor;
    const b = window._RV?.building;
    if (!anchor || !b || state._curtainsAdded) return;
    state._curtainsAdded = true;

    const fl = window._RV?.floors?.[0];
    if (!fl?.rects) return;

    const ox    = anchor.cx - anchor.bW / 2;
    const oz    = anchor.cz - anchor.bD / 2;
    const hNiv  = b.P?.hn || 3.0;

    fl.rects.forEach(r => {
      if (r.bal || r.apt < 0) return;
      if (r.t !== 'living' && r.t !== 'bedroom' && r.t !== 'bedroom2') return;

      const cz0 = oz + r.y + 0.08; // peretele frontal cu fereastră
      const cy  = anchor.baseY + hNiv * 0.55; // centrul ferestrei

      // Draperie stânga
      const curtainMat = MATS.curtain.clone();
      curtainMat.transparent = true;
      curtainMat.opacity = 0.85;
      curtainMat.side = THREE.DoubleSide;

      const curtainW = Math.min(r.w * 0.22, 0.7);
      const curtainH = hNiv * 0.72;

      // Creem geometrie cu cute (wave)
      const CW = 8, CH = 12;
      const cGeo = new THREE.PlaneGeometry(curtainW, curtainH, CW, CH);
      const pos = cGeo.attributes.position;
      for (let vi = 0; vi < pos.count; vi++) {
        const u = (pos.getX(vi) / curtainW + 0.5);
        const v = (pos.getY(vi) / curtainH + 0.5);
        // Cute verticale ondulate
        const wave = Math.sin(u * Math.PI * 6) * 0.04 + Math.sin(u * Math.PI * 3) * 0.025;
        pos.setZ(vi, wave);
        // Îngroșare jos (greutate)
        const sag = (1 - v) * 0.015;
        pos.setX(vi, pos.getX(vi) + sag * Math.sin(u * Math.PI));
      }
      pos.needsUpdate = true;
      cGeo.computeVertexNormals();

      const cxLeft  = ox + r.x + curtainW * 0.5;
      const cxRight = ox + r.x + r.w - curtainW * 0.5;

      [cxLeft, cxRight].forEach(cx => {
        const curtain = new THREE.Mesh(cGeo.clone(), curtainMat);
        curtain.position.set(cx, cy, cz0 + 0.04);
        curtain.castShadow = true;
        state.scene.add(curtain);
      });

      // Bară metalică
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, r.w + 0.1, 8),
        MATS.metal_chrome
      );
      rod.rotation.z = Math.PI / 2;
      rod.position.set(ox + r.x + r.w / 2, anchor.baseY + hNiv - 0.22, cz0 + 0.04);
      state.scene.add(rod);
    });
  }

  // ── Reflexie pe podea (plane reflector simplu) ────────────────────────
  function _addFloorReflection(THREE, state) {
    // Reflexia e deja dată de clearcoat pe materialele de podea.
    // Adăugăm un extra EnvMapIntensity boost pe podelele de living.
    state.scene.traverse(obj => {
      if (!obj.isMesh) return;
      const mat = obj.material;
      if (!mat) return;
      const geo = obj.geometry;
      if (!geo) return;
      if (!geo.boundingBox) geo.computeBoundingBox();
      const size = geo.boundingBox.max.y - geo.boundingBox.min.y;
      // Mesh plat (podea) jos
      if (size < 0.15 && obj.position.y < 0.3) {
        if (mat.isMeshPhysicalMaterial) {
          mat.clearcoat = Math.max(mat.clearcoat || 0, 0.25);
          mat.clearcoatRoughness = 0.15;
          mat.needsUpdate = true;
        }
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER 4K — Tiled 4×4 cu post-processing
  // ═══════════════════════════════════════════════════════════════════════

  function _injectRenderBtn() {
    const _try = () => {
      const bar = document.getElementById('ts-nav-bar') ||
                  document.getElementById('ux-tour-bottombar');
      if (!bar || document.getElementById('pt-render-btn')) return false;

      const btn = document.createElement('button');
      btn.id = 'pt-render-btn';
      btn.className = 'ts-nb-btn';
      btn.style.cssText += ';border-color:rgba(212,175,55,.5);color:#D4AF37;background:rgba(212,175,55,.1);font-weight:700';
      btn.innerHTML = '⭐ Render HD';
      btn.title = 'Render fotorealist 4K — 4096×4096px';
      btn.onclick = _launchRender;
      bar.appendChild(btn);
      return true;
    };
    if (!_try()) {
      const obs = new MutationObserver(() => { if (_try()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  function _launchRender() {
    const state = window.VTour?._state;
    if (!state?.scene) {
      if (typeof ss === 'function') ss('⚠ Deschide turul 3D înainte de render');
      return;
    }

    // Asigurăm că scena e upgradată
    if (!state._studioUpgraded) {
      _upgradeScene();
      setTimeout(_launchRender, 2000);
      return;
    }

    _showRenderUI();
  }

  // ── UI render ─────────────────────────────────────────────────────────
  function _showRenderUI() {
    document.getElementById('pt-overlay')?.remove();

    const ov = document.createElement('div');
    ov.id = 'pt-overlay';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(4,8,18,.97);z-index:99999;' +
      'display:flex;flex-direction:column;font-family:IBM Plex Mono,monospace';

    ov.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;
        padding:12px 18px;background:rgba(255,255,255,.03);border-bottom:1px solid rgba(212,175,55,.15)">
        <div>
          <span style="color:#D4AF37;font-size:14px;font-weight:700">⭐ Render Studio HD</span>
          <span style="color:#475569;font-size:11px;margin-left:10px">
            4096×4096px · PBR 2048px · HDRI · ACESFilmic
          </span>
        </div>
        <button onclick="document.getElementById('pt-overlay').remove()"
          style="background:rgba(239,68,68,.15);color:#FCA5A5;border:1px solid rgba(239,68,68,.3);
                 border-radius:7px;padding:6px 14px;font-size:11px;cursor:pointer">✕</button>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:20px">
        <div id="pt-status" style="font-size:15px;color:#DDE6F5;font-weight:600;text-align:center">
          Pregătesc render studio...
        </div>
        <div style="width:100%;max-width:500px">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px">
            <span id="pt-label" style="font-size:11px;color:#64748B"></span>
            <span id="pt-pct"   style="font-size:11px;font-weight:700;color:#D4AF37">0%</span>
          </div>
          <div style="background:rgba(255,255,255,.07);border-radius:4px;height:8px">
            <div id="pt-bar" style="height:8px;border-radius:4px;width:0%;
              background:linear-gradient(90deg,#D4AF37,#F0C040);transition:width .3s"></div>
          </div>
        </div>
        <div id="pt-camera-btns" style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
          <div style="font-size:10px;color:#64748B;width:100%;text-align:center;margin-bottom:4px">
            Alege camera pentru render:
          </div>
        </div>
        <div id="pt-quality" style="display:flex;gap:6px">
          <button onclick="window._ptCam='interior';_ptStartRender()" id="btn-interior"
            style="padding:7px 18px;border-radius:7px;cursor:pointer;font-size:11px;font-weight:700;
                   border:1px solid rgba(212,175,55,.4);background:rgba(212,175,55,.15);color:#D4AF37;font-family:inherit">
            🏠 Interior (living)
          </button>
          <button onclick="window._ptCam='section';_ptStartRender()" id="btn-section"
            style="padding:7px 18px;border-radius:7px;cursor:pointer;font-size:11px;font-weight:700;
                   border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#94A3B8;font-family:inherit">
            ✂ Secțiune
          </button>
          <button onclick="window._ptCam='exterior';_ptStartRender()" id="btn-exterior"
            style="padding:7px 18px;border-radius:7px;cursor:pointer;font-size:11px;font-weight:700;
                   border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#94A3B8;font-family:inherit">
            🌆 Exterior
          </button>
        </div>
        <canvas id="pt-canvas" style="display:none;border-radius:10px;border:1px solid rgba(212,175,55,.2);
          max-width:100%;max-height:380px;box-shadow:0 20px 60px rgba(0,0,0,.8)"></canvas>
        <div id="pt-result" style="display:none;gap:10px;justify-content:center">
          <button id="pt-dl" style="padding:9px 24px;border-radius:8px;cursor:pointer;font-size:12px;
            font-weight:800;background:linear-gradient(135deg,#D4AF37,#F0C040);color:#000;border:none;
            font-family:inherit">⬇ Descarcă PNG 4K</button>
        </div>
      </div>
    `;
    document.body.appendChild(ov);
  }

  function _ptProg(pct, label) {
    const bar = document.getElementById('pt-bar');
    const pctEl = document.getElementById('pt-pct');
    const lbl = document.getElementById('pt-label');
    if (bar) bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = Math.round(pct) + '%';
    if (lbl && label) lbl.textContent = label;
  }

  window._ptStartRender = async function () {
    const state = window.VTour?._state;
    if (!state?.scene) return;
    const THREE = window.THREE;

    // Ascundem butoanele
    document.querySelectorAll('#pt-quality button').forEach(b => b.style.display = 'none');

    const TILE = 1024, NX = 4, NY = 4, SSAA = 2;
    const OUT_W = TILE * NX, OUT_H = TILE * NY;

    _ptProg(2, 'Inițializare renderer 4K...');

    // Renderer dedicat
    const offCv = document.createElement('canvas');
    offCv.width = offCv.height = TILE * SSAA;

    const r4k = new THREE.WebGLRenderer({
      canvas: offCv, antialias: true, preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    r4k.setSize(TILE * SSAA, TILE * SSAA, false);
    r4k.shadowMap.enabled = true;
    r4k.shadowMap.type = THREE.PCFSoftShadowMap;
    r4k.toneMapping = THREE.ACESFilmicToneMapping;
    r4k.toneMappingExposure = 1.35;
    if (THREE.sRGBEncoding) r4k.outputEncoding = THREE.sRGBEncoding;
    r4k.physicallyCorrectLights = true;

    _ptProg(5, 'Configurez camera...');

    // Camera în funcție de tip
    const anchor = state._anchor;
    const b = window._RV?.building || {};
    const hNiv = b.P?.hn || 3.0;
    const niv  = b.niv || 3;
    const bW = anchor?.bW || 20, bD = anchor?.bD || 15;
    const cx = anchor?.cx || 0, cz = anchor?.cz || 0;
    const baseY = anchor?.baseY || 0;

    const camera = new THREE.PerspectiveCamera(38, OUT_W / OUT_H, 0.1, 800);
    const camType = window._ptCam || 'interior';

    if (camType === 'interior') {
      // Camera în interiorul livingului, privind spre fereastră
      const fl = window._RV?.floors?.[0];
      const living = fl?.rects?.find(r => r.t === 'living') ||
                     fl?.rects?.find(r => r.w * r.h > 10);
      if (living && anchor) {
        const ox = anchor.cx - bW / 2, oz2 = anchor.cz - bD / 2;
        const lcx = ox + living.x + living.w / 2;
        const lcz2 = oz2 + living.y + living.h / 2;
        // Camera în spatele camerei, la înălțimea ochilor
        camera.position.set(lcx, baseY + 1.55, lcz2 + living.h * 0.38);
        camera.lookAt(lcx, baseY + 1.35, lcz2 - living.h * 0.35);
        camera.fov = 58;
      } else {
        camera.position.set(cx, baseY + 1.55, cz + bD * 0.4);
        camera.lookAt(cx, baseY + 1.35, cz - bD * 0.1);
        camera.fov = 58;
      }
    } else if (camType === 'section') {
      // Vedere frontală secțiune
      const dist = Math.max(bW, niv * hNiv) * 1.85;
      camera.position.set(cx, baseY + niv * hNiv * 0.5, cz + dist);
      camera.lookAt(cx, baseY + niv * hNiv * 0.45, cz);
      camera.fov = 38;
    } else {
      // Exterior izometric
      const dist = Math.max(bW, bD, niv * hNiv) * 1.75;
      camera.position.set(cx + dist * 0.6, baseY + dist * 0.7, cz + dist * 0.9);
      camera.lookAt(cx, baseY + niv * hNiv * 0.4, cz);
      camera.fov = 35;
    }
    camera.updateProjectionMatrix();

    _ptProg(10, 'Render tiled 4×4 (16 tiles)...');

    const finalCv = document.createElement('canvas');
    finalCv.width = OUT_W; finalCv.height = OUT_H;
    const fCtx = finalCv.getContext('2d');
    fCtx.fillStyle = '#070D1A'; fCtx.fillRect(0, 0, OUT_W, OUT_H);

    const origAspect = camera.aspect;
    let tileIdx = 0;

    for (let ty = 0; ty < NY; ty++) {
      for (let tx = 0; tx < NX; tx++) {
        tileIdx++;
        const pct = 10 + (tileIdx / (NX * NY)) * 78;
        _ptProg(pct, `Tile ${tileIdx}/${NX*NY} — ${(tx+1)*TILE}×${(ty+1)*TILE}px`);

        camera.setViewOffset(
          OUT_W * SSAA, OUT_H * SSAA,
          tx * TILE * SSAA, ty * TILE * SSAA,
          TILE * SSAA, TILE * SSAA
        );
        camera.aspect = OUT_W / OUT_H;
        camera.updateProjectionMatrix();

        r4k.render(state.scene, camera);

        // Downsample SSAA
        const downCv = document.createElement('canvas');
        downCv.width = TILE; downCv.height = TILE;
        const dc = downCv.getContext('2d');
        dc.imageSmoothingEnabled = true;
        dc.imageSmoothingQuality = 'high';
        dc.drawImage(offCv, 0, 0, TILE, TILE);
        fCtx.drawImage(downCv, tx * TILE, ty * TILE);

        await new Promise(r => setTimeout(r, 6));
      }
    }

    camera.clearViewOffset();
    camera.aspect = origAspect;
    camera.updateProjectionMatrix();

    _ptProg(90, 'Post-processing: vignette + grain...');
    await new Promise(r => setTimeout(r, 50));

    // Post-processing: vignette + film grain
    _applyPostProcess(fCtx, OUT_W, OUT_H);

    _ptProg(97, 'Finalizez...');
    await new Promise(r => setTimeout(r, 50));

    // Afișăm preview
    const pCv = document.getElementById('pt-canvas');
    if (pCv) {
      pCv.width = 1024; pCv.height = 1024;
      pCv.style.display = 'block';
      const pc = pCv.getContext('2d');
      pc.imageSmoothingQuality = 'high';
      pc.drawImage(finalCv, 0, 0, 1024, 1024);
    }

    const dl = document.getElementById('pt-dl');
    const res = document.getElementById('pt-result');
    if (dl) {
      dl.onclick = () => {
        finalCv.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'UrbanX_Studio_4K_' + Date.now() + '.png';
          a.click(); URL.revokeObjectURL(url);
        }, 'image/png');
      };
    }
    if (res) res.style.display = 'flex';

    const status = document.getElementById('pt-status');
    if (status) status.innerHTML =
      '<span style="color:#4ADE80;font-weight:800">✅ Render studio complet — 4096×4096px</span>';

    try{r4k.forceContextLoss&&r4k.forceContextLoss();}catch(e){} r4k.dispose();
    _ptProg(100, '✅ ' + OUT_W + '×' + OUT_H + 'px · PNG gata de descărcare');
  };

  // ── Post-processing canvas: vignette + grain cinematografic ──────────
  function _applyPostProcess(ctx, W, H) {
    // Vignette (cerc de umbră la margini)
    const vg = ctx.createRadialGradient(W/2, H/2, H*0.28, W/2, H/2, H*0.78);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(0.6, 'rgba(0,0,0,0.06)');
    vg.addColorStop(1, 'rgba(0,0,0,0.35)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    // Film grain subtil
    const id = ctx.getImageData(0, 0, W, H);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      const g = (Math.random() - 0.5) * 6;
      d[i]   = Math.min(255, Math.max(0, d[i]   + g));
      d[i+1] = Math.min(255, Math.max(0, d[i+1] + g));
      d[i+2] = Math.min(255, Math.max(0, d[i+2] + g));
    }
    ctx.putImageData(id, 0, 0);

    // Slight warm grade (color grading)
    ctx.fillStyle = 'rgba(255,240,200,0.025)';
    ctx.fillRect(0, 0, W, H);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // HOOKS
  // ═══════════════════════════════════════════════════════════════════════

  function _hook(obj, method, delay) {
    if (!obj || !obj[method] || obj[method]._studioV3) return false;
    obj[method]._studioV3 = true;
    const orig = obj[method];
    obj[method] = function () {
      const r = orig.apply(this, arguments);
      setTimeout(_upgradeScene, delay || 1800);
      return r;
    };
    return true;
  }

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (window.THREE && window.VTour) { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 250);
  }

  waitReady(() => {
    const obs = new MutationObserver(() => {
      _hook(window.VTour,   'start',   1800);
      _hook(window.VTourFP, 'startFP', 2000);
    });
    obs.observe(document.body, { childList: true, subtree: true });
    _hook(window.VTour,   'start',   1800);
    _hook(window.VTourFP, 'startFP', 2000);
    _injectRenderBtn();
    console.log('[Studio v3] ✅ Render studio PBR complet activ');
  });

})();
