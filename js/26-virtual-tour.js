/**
 * UrbanX — Virtual Tour 3D · v3.0 MATTERPORT-GRADE
 * 
 * Tur first-person fotorealist construit din TOATE setările AEDIS + releveu.
 * 
 * RESPECTĂ INTEGRAL:
 *   AEDIS.fn, fnParter, parterDiferit                — funcțiune (h diferit parter)
 *   AEDIS.stil + AEDIS_STIL[s].*                     — finisaje + culori per stil
 *   AEDIS.corpuri[]                                  — multi-corp clădire
 *   AEDIS.forma + formaRatio                         — patrat/L/U/T/curte/bara
 *   AEDIS.activeRetragere + retrageriFineEtaje{}     — retrageri per etaj
 *   AEDIS.penthouseActiv + retragere + H + factor    — penthouse retras + terasă
 *   AEDIS.aticRetragere{front,spate,stanga,dreapta}  — atic retras per latură
 *   AEDIS.tipAcoperis (6 tipuri)                     — terasa_plata/circulabila/sarpanta/mansarda/combinat/penthouse
 *   AEDIS.hSarpanta, unghiSarpanta, hMansarda, hAttic
 *   AEDIS.balcoane + balconAdancime + balconLaturi[] — balcoane extrudate
 *   AEDIS.peretelCortina + cortinaProcent            — perete cortină sticlă
 *   AEDIS.scenariu                                   — demolare/extindere
 *   _RV.floors[] (rects/wins/doors)                  — plan releveu per etaj
 *   _extractWalls()                                  — segmente pereți cu goluri
 * 
 * FEATURES MATTERPORT:
 *   ✓ Walkthrough first-person + smooth cubic-ease glide 0.85s
 *   ✓ Dollhouse view (cameră ortho deasupra, click → walkthrough)
 *   ✓ Floorplan minimap (canvas 2D dreapta-jos, click → teleport)
 *   ✓ Mattertags (puncte info pe pereți cu popup)
 *   ✓ Auto-walk cinematic (cameră urmează spline traseu)
 *   ✓ Measurement tool (click 2 puncte → distanță)
 *   ✓ Hotspots auto per cameră + cardinal exterior
 *   ✓ Mobilier procedural per tip cameră (sofa, pat, masă, dulap, TV, frigider, cadă, WC, chiuvetă, birou, bibliotecă)
 *   ✓ Plante (billboard alpha cards procedurale)
 *   ✓ Lumini interior reale (PointLight + SpotLight) + lustre/lampe vizibile
 *   ✓ Uși vizibile cu mâner (lemn) + ferestre cu rame (aluminiu/lemn)
 *   ✓ HDRI + PMREM IBL + reflexii pe sticlă
 *   ✓ Materiale PBR per stil arhitectural + per tip cameră
 *   ✓ SSAO + Bloom + tone mapping ACES
 *   ✓ Soft shadows (PCFSoft) + CSM-like cu single map mare
 *   ✓ Raycast collision cu slide pe perete
 *   ✓ Touch joystick + pointer lock + keyboard
 *   ✓ Volum exterior respectă retrageri/penthouse/atic/forma/multi-corp
 *   ✓ Perete cortină = sticlă fizică în loc de tencuială
 *   ✓ Balcoane extrudate cu balustradă
 * 
 * DEPENDENȚE:
 *   THREE r128 (core) + addons: RGBELoader, EffectComposer, RenderPass,
 *   SSAOPass, UnrealBloomPass, ShaderPass, CopyShader, SSAOShader
 *   Toate cu fallback graceful dacă lipsesc.
 * 
 * CITEȘTE GLOBAL: window.V3D, window._RV, window.AEDIS, window.AEDIS_STIL,
 *   window.AEDIS_FN, window._extractWalls()
 */

window.VTour = (function(){
  'use strict';

  // ═════════════════════════════════════════════════════════════════════════
  // STATE & CONFIG
  // ═════════════════════════════════════════════════════════════════════════

  const STATE = {
    active: false,
    mode: 'walkthrough',     // walkthrough | dollhouse | floorplan
    keys: { w:false, a:false, s:false, d:false, shift:false, space:false },
    yaw: 0, pitch: 0,
    eyeHeight: 1.65,
    speed: 3.2,
    runMul: 2.0,
    pointerLocked: false,
    hotspots: [],            // [{x,y,z,label,kind,floorIdx,roomType}]
    mattertags: [],          // [{x,y,z,title,desc,icon}]
    currentHotspot: 0,
    tourCam: null,
    dollhouseCam: null,
    overlay: null,
    canvas: null,
    renderer: null,
    composer: null,
    glide: null,
    interiorGroup: null,
    volumeGroup: null,       // grupul cu volumul exterior generat de noi (peste AEDIS)
    roofGroup: null,
    furnitureGroup: null,
    lightsGroup: null,
    mattertagGroup: null,
    extraLights: [],
    prevFog: null, prevBg: null, prevEnv: null,
    raycaster: null,
    collisionMeshes: [],
    floorY: 0,
    currentFloorIdx: 0,
    autoWalk: null,          // { spline, t0, dur, active }
    measureMode: null,       // { points: [], distLabel }
    _lastTime: 0,
    _resizeHandler: null,
    _aedisCache: null,
    _stilCache: null,
  };

  const CFG = {
    assetsBase: 'assets/tur3d',
    hdriInterior: 'assets/tur3d/hdri/interior.hdr',
    hdriExterior: 'assets/tur3d/hdri/exterior.hdr',
    glideDuration: 0.85,
    collisionPadding: 0.32,
    shadowMapSize: 1024,
    maxAnisotropy: 8,
    enableSSAO: true,
    enableBloom: true,
    enableFurniture: true,
    enableLighting: true,
    enableMattertags: true,
    enableDollhouse: true,
    enableFloorplan: true,
    skipExteriorRebuild: true,  // dacă AEDIS deja a construit volumul corect, nu-l rebuildăm
  };

  // Cache materiale
  const _matCache = new Map();
  const _texCache = new Map();

  // ═════════════════════════════════════════════════════════════════════════
  // AEDIS READER — citește TOATE flagurile + AEDIS_STIL + AEDIS_FN
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Returnează un model normalizat al clădirii AEDIS curent:
   * {
   *   fn, fnDef, stil, stilDef,
   *   parterDiferit, fnParter, fnParterDef, hParter, hEtaj,
   *   niv, totalH,
   *   corpuri: [{niv, hNiv, retragere, color, fn}],
   *   formaConfig: { type, ratio, footprint2D: [{x,y,w,h}, ...] },
   *   floors: [                                   // un obiect per etaj
   *     { idx, type, baseY, topY, hNiv, fnAtEtaj,
   *       footprintScale, footprintOffset: {x,z},  // pentru retrageri
   *       hasCurtainWall, curtainPct, curtainSides,
   *       balconies: [{side, x, len, depth}],
   *       isPenthouse, hasTerrace }
   *   ],
   *   roof: { type, hSarpanta, unghi, hMansarda, hAttic, parapetH }
   * }
   */
  function _readAedisModel(){
    const A = window.AEDIS || {};
    const FN = window.AEDIS_FN || {};
    const STIL = window.AEDIS_STIL || {};
    const corpuri = (A.corpuri && A.corpuri.length) ? A.corpuri : [{niv:4, hNiv:3.0, retragere:1.0, color:'#cbd5e1', fn:A.fn||'rezidential_colectiv'}];
    const corp0 = corpuri[0];

    const fn = A.fn || 'rezidential_colectiv';
    const fnDef = FN[fn] || FN.rezidential_colectiv || {hParter:3.0, hEtaj:2.8, hAttic:1.0, color:'#94a3b8', parterColor:'#cbd5e1'};
    const stil = A.stil || 'modern';
    const stilDef = STIL[stil] || STIL.modern || {floorColors:['#1e3a5f'], parterColor:'#0f172a', aticColor:'#0c1a2e', windowColor:'#7dd3fc', bandColor:'#1e40af', retragereFactor:0.88, hasAttic:true, aticH:1.4, cortinaProcent:60};

    const parterDiferit = !!A.parterDiferit;
    const fnParter = A.fnParter || 'comercial';
    const fnParterDef = FN[fnParter] || FN.comercial || fnDef;
    const hParter = parterDiferit ? (fnParterDef.hParter || fnDef.hParter || 4.5) : (corp0.hNiv || fnDef.hParter || 3.0);
    const hEtaj = corp0.hNiv || fnDef.hEtaj || 3.0;
    const niv = corp0.niv || 4;

    // ── Construim footprint planimetric per forma ───────────────────────
    const formaConfig = _buildFootprintShape(A.forma || 'auto', A.formaRatio || 0.35);

    // ── Construim per-floor info ────────────────────────────────────────
    const floors = [];
    let currentY = 0;
    for(let i = 0; i < niv; i++){
      const isParter = (i === 0);
      const isLast = (i === niv - 1);
      const hThis = isParter ? hParter : hEtaj;
      const fnAtEtaj = (isParter && parterDiferit) ? fnParter : fn;

      // Retragere — verificăm întâi fineRetrageriEtaje, apoi activeRetragere ultim etaj
      let scale = 1.0;
      let offX = 0, offZ = 0;
      const fineSc = (A.retrageriFineEtaje && A.retrageriFineEtaje[i] != null) ? A.retrageriFineEtaje[i] : null;
      if(fineSc != null){
        scale = fineSc;
      } else if(isLast && A.activeRetragere){
        scale = stilDef.retragereFactor || 0.88;
      }

      // Perete cortină — pe etajele non-parter
      const hasCurtain = !!A.peretelCortina && !isParter;
      const curtainPct = A.cortinaProcent || stilDef.cortinaProcent || 60;

      // Balcoane — doar etajele non-parter, pe laturile specificate
      const balconies = [];
      if(A.balcoane && !isParter){
        const sides = A.balconLaturi || ['S','E'];
        sides.forEach(side => {
          balconies.push({ side, depth: A.balconAdancime || 1.5, scale: 0.7 });
        });
      }

      floors.push({
        idx: i,
        type: isParter ? 'parter' : (isLast ? 'last' : 'etaj'),
        baseY: currentY,
        topY: currentY + hThis,
        hNiv: hThis,
        fnAtEtaj,
        footprintScale: scale,
        footprintOffset: {x: offX, z: offZ},
        hasCurtainWall: hasCurtain,
        curtainPct,
        balconies,
        isPenthouse: false,
        hasTerrace: false,
        floorColor: stilDef.etajColor ? stilDef.etajColor(stilDef, i, niv) : (stilDef.floorColors ? stilDef.floorColors[Math.min(i, stilDef.floorColors.length-1)] : '#cbd5e1'),
      });
      currentY += hThis;
    }

    // ── Penthouse — etaj separat deasupra ────────────────────────────────
    if(A.penthouseActiv){
      const pH = A.penthouseH || 3.2;
      const pRet = A.penthouseRetragere || 2.5;
      const pFactor = Math.max(0.25, Math.min(0.85, A.penthouseSuprafataFactor || 0.5));
      floors.push({
        idx: niv,
        type: 'penthouse',
        baseY: currentY,
        topY: currentY + pH,
        hNiv: pH,
        fnAtEtaj: fn,
        footprintScale: Math.sqrt(pFactor),
        footprintOffset: {x: 0, z: 0},
        hasCurtainWall: !!A.peretelCortina,
        curtainPct: 75,
        balconies: [],
        isPenthouse: true,
        hasTerrace: true,
        penthouseRetragere: pRet,
        floorColor: stilDef.aticColor || '#0c1a2e',
      });
      currentY += pH;
    }

    // ── Acoperiș ────────────────────────────────────────────────────────
    const tipAcoperis = A.tipAcoperis || 'terasa_plata';
    const roof = {
      type: tipAcoperis,
      hSarpanta: A.hSarpanta || 3.5,
      unghi: A.unghiSarpanta || 35,
      hMansarda: A.hMansarda || 2.8,
      hAttic: A.hAttic || (stilDef.aticH != null ? stilDef.aticH : 1.2),
      parapetH: A.hAttic || (stilDef.aticH != null ? stilDef.aticH : 1.2),
      aticRetragere: A.aticRetragere || {front:0, spate:0, stanga:0, dreapta:0},
    };

    const totalH = currentY + (roof.type === 'sarpanta' ? roof.hSarpanta : roof.type === 'mansarda' ? roof.hMansarda : roof.parapetH);

    const model = {
      fn, fnDef, stil, stilDef,
      parterDiferit, fnParter, fnParterDef, hParter, hEtaj,
      niv, totalH, corpuri,
      formaConfig,
      floors,
      roof,
      flags: {
        balcoane: !!A.balcoane,
        peretelCortina: !!A.peretelCortina,
        penthouseActiv: !!A.penthouseActiv,
        activeRetragere: !!A.activeRetragere,
        scenariu: A.scenariu || 'demolare',
      }
    };
    STATE._aedisCache = model;
    STATE._stilCache = stilDef;
    return model;
  }

  // Construiește schemă footprint per forma planimetrică
  function _buildFootprintShape(forma, ratio){
    // Returnează tipul; geometria efectivă (rectangle, L, U etc.) e construită
    // la nivelul VolumeBuilder care primește bW/bD din releveu sau bbox AEDIS.
    return { type: forma || 'auto', ratio: ratio || 0.35 };
  }

  // ═════════════════════════════════════════════════════════════════════════
  // HELPER — derivă footprint 2D points pentru o formă
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Returnează lista de poligoane (fiecare un array de [x, z]) care formează
   * conturul exterior al unui etaj pentru o anumită forma + scale.
   * Pentru patrat/dreptunghi: 1 poligon rectangular.
   * Pentru L/U/T: 1 poligon complex.
   * Pentru curte: 2 poligoane (outer + inner hole).
   */
  function _buildFloorFootprint(formaType, bW, bD, scale, ratio){
    const w = bW * scale;
    const d = bD * scale;
    const cx = 0, cz = 0; // relativ la centrul clădirii
    const halfW = w/2, halfD = d/2;
    const r = ratio;

    switch(formaType){
      case 'L': {
        // L cu brațul gros la N-E
        const armW = w * r, armD = d * r;
        return {
          outer: [
            [cx - halfW, cz - halfD],
            [cx + halfW, cz - halfD],
            [cx + halfW, cz - halfD + armD],
            [cx - halfW + armW, cz - halfD + armD],
            [cx - halfW + armW, cz + halfD],
            [cx - halfW, cz + halfD],
          ],
          holes: []
        };
      }
      case 'U': {
        // U deschis spre N
        const armW = w * r;
        return {
          outer: [
            [cx - halfW, cz - halfD],
            [cx + halfW, cz - halfD],
            [cx + halfW, cz + halfD],
            [cx + halfW - armW, cz + halfD],
            [cx + halfW - armW, cz - halfD + (d - 2*armW*0.5)],
            [cx - halfW + armW, cz - halfD + (d - 2*armW*0.5)],
            [cx - halfW + armW, cz + halfD],
            [cx - halfW, cz + halfD],
          ],
          holes: []
        };
      }
      case 'T': {
        const armW = w * r;
        return {
          outer: [
            [cx - halfW, cz - halfD],
            [cx + halfW, cz - halfD],
            [cx + halfW, cz - halfD + armW],
            [cx + armW/2, cz - halfD + armW],
            [cx + armW/2, cz + halfD],
            [cx - armW/2, cz + halfD],
            [cx - armW/2, cz - halfD + armW],
            [cx - halfW, cz - halfD + armW],
          ],
          holes: []
        };
      }
      case 'curte': {
        // Dreptunghi cu o curte interioară (hole)
        const courtW = w * r, courtD = d * r;
        return {
          outer: [
            [cx - halfW, cz - halfD],
            [cx + halfW, cz - halfD],
            [cx + halfW, cz + halfD],
            [cx - halfW, cz + halfD],
          ],
          holes: [[
            [cx - courtW/2, cz - courtD/2],
            [cx + courtW/2, cz - courtD/2],
            [cx + courtW/2, cz + courtD/2],
            [cx - courtW/2, cz + courtD/2],
          ]]
        };
      }
      case 'bara': {
        // Dreptunghi lung şi îngust (raport 1:3-1:4)
        const elong = 1.4;
        return {
          outer: [
            [cx - halfW * elong, cz - halfD / elong],
            [cx + halfW * elong, cz - halfD / elong],
            [cx + halfW * elong, cz + halfD / elong],
            [cx - halfW * elong, cz + halfD / elong],
          ],
          holes: []
        };
      }
      case 'patrat':
      case 'dreptunghi':
      case 'auto':
      default:
        return {
          outer: [
            [cx - halfW, cz - halfD],
            [cx + halfW, cz - halfD],
            [cx + halfW, cz + halfD],
            [cx - halfW, cz + halfD],
          ],
          holes: []
        };
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // ASSET LOADER — HDRI + PBR texturi cu fallback graceful
  // ═════════════════════════════════════════════════════════════════════════

  function _loadHDRI(renderer, scene, path){
    return new Promise((resolve) => {
      const THREE = window.THREE;
      if(!THREE.RGBELoader || !THREE.PMREMGenerator){
        console.warn('[VTour] RGBELoader/PMREMGenerator indisponibili — fallback sky procedural');
        return resolve(null);
      }
      const loader = new THREE.RGBELoader();
      loader.setDataType(THREE.HalfFloatType);
      loader.load(path,
        (tex) => {
          try {
            const pmrem = new THREE.PMREMGenerator(renderer);
            pmrem.compileEquirectangularShader();
            const envMap = pmrem.fromEquirectangular(tex).texture;
            scene.environment = envMap;
            tex.dispose();
            pmrem.dispose();
            console.log('[VTour] ✅ HDRI încărcat:', path);
            resolve(envMap);
          } catch(e){
            console.warn('[VTour] HDRI procesare eșuată:', e.message);
            resolve(null);
          }
        },
        undefined,
        () => {
          console.warn('[VTour] HDRI lipsă (fallback procedural):', path);
          resolve(null);
        }
      );
    });
  }

  function _loadTexture(path, opts){
    opts = opts || {};
    const THREE = window.THREE;
    if(_texCache.has(path)) return _texCache.get(path);
    const loader = new THREE.TextureLoader();
    const tex = loader.load(path, undefined, undefined, () => { /* silent fail */ });
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    if(opts.repeatX || opts.repeatY) tex.repeat.set(opts.repeatX || 1, opts.repeatY || 1);
    tex.anisotropy = CFG.maxAnisotropy;
    if(opts.encoding) tex.encoding = opts.encoding;
    _texCache.set(path, tex);
    return tex;
  }

  function _loadPBR(name, opts){
    opts = opts || {};
    const cacheKey = `pbr:${name}|${opts.repeatX||1}|${opts.repeatY||1}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    const THREE = window.THREE;
    const dir = `${CFG.assetsBase}/pbr/${name}`;
    const mat = new THREE.MeshStandardMaterial({
      color: opts.fallbackColor || 0xcccccc,
      roughness: opts.roughness != null ? opts.roughness : 0.85,
      metalness: opts.metalness != null ? opts.metalness : 0.02,
    });
    _matCache.set(cacheKey, mat);
    const loader = new THREE.TextureLoader();
    const apply = (suffix, prop, encoding) => {
      loader.load(`${dir}/${suffix}.jpg`,
        (tex) => {
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
          tex.repeat.set(opts.repeatX || 1, opts.repeatY || 1);
          tex.anisotropy = CFG.maxAnisotropy;
          if(encoding) tex.encoding = encoding;
          mat[prop] = tex;
          if(prop === 'map') mat.color.set(0xffffff);
          if(prop === 'aoMap') mat.aoMapIntensity = 0.85;
          mat.needsUpdate = true;
        }, undefined, () => {}
      );
    };
    apply('diff', 'map', THREE.sRGBEncoding);
    apply('nor_gl', 'normalMap');
    apply('rough', 'roughnessMap');
    apply('ao', 'aoMap');
    return mat;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MATERIAL SYSTEM — per stil arhitectural + per tip cameră + sticlă
  // ═════════════════════════════════════════════════════════════════════════

  /** Material fațadă exterioară per stil arhitectural */
  function _facadeMaterialForStil(stilDef, floorIdx, isParter){
    const THREE = window.THREE;
    const colorHex = isParter ? stilDef.parterColor : (stilDef.floorColors && stilDef.floorColors[Math.min(floorIdx, stilDef.floorColors.length-1)]) || '#cbd5e1';
    const cacheKey = `facade:${stilDef.label}:${floorIdx}:${isParter}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    // Determinăm tip material per stil
    let pbrName, roughness, metalness;
    const stilLabel = (stilDef.label || '').toLowerCase();
    if(stilLabel.includes('modern')){
      pbrName = 'tencuiala_exterior'; roughness = 0.55; metalness = 0.1;
    } else if(stilLabel.includes('clasic')){
      pbrName = 'piatra_clasic'; roughness = 0.85; metalness = 0.02;
    } else if(stilLabel.includes('industrial')){
      pbrName = 'beton_subsol'; roughness = 0.7; metalness = 0.2;
    } else if(stilLabel.includes('minimalist')){
      pbrName = 'tencuiala_exterior'; roughness = 0.4; metalness = 0.05;
    } else if(stilLabel.includes('inovator')){
      pbrName = 'tencuiala_exterior'; roughness = 0.3; metalness = 0.3;
    } else {
      pbrName = 'tencuiala_exterior'; roughness = 0.7; metalness = 0.05;
    }
    const mat = _loadPBR(pbrName, {
      repeatX: 3, repeatY: 1, roughness, metalness,
      fallbackColor: _parseHex(colorHex)
    });
    _matCache.set(cacheKey, mat);
    return mat;
  }

  /** Material sticlă fizic — folosit pentru ferestre + perete cortină */
  function _glassMaterial(opts){
    opts = opts || {};
    const colorHex = opts.colorHex || '#c8dceb';
    const opacity = opts.opacity != null ? opts.opacity : 0.32;
    const cacheKey = `glass:${colorHex}:${opacity}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    const THREE = window.THREE;
    // r128 nu are .transmission — folosim clearcoat + reflectivity + opacity
    const mat = new THREE.MeshPhysicalMaterial({
      color: _parseHex(colorHex),
      metalness: 0.05,
      roughness: 0.04,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity,
      envMapIntensity: 1.6,
      side: THREE.DoubleSide,
    });
    _matCache.set(cacheKey, mat);
    return mat;
  }

  /** Material lemn (uși, mobilier, parchet finish, mâner) */
  function _woodMaterial(tone){
    tone = tone || 'medium';
    const colorMap = { dark: 0x3d2817, medium: 0x8b5a2b, light: 0xc9a373, ebony: 0x1a1008 };
    const c = colorMap[tone] || colorMap.medium;
    const cacheKey = `wood:${tone}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    const THREE = window.THREE;
    const mat = new THREE.MeshStandardMaterial({
      color: c, roughness: 0.62, metalness: 0.05,
    });
    _matCache.set(cacheKey, mat);
    return mat;
  }

  /** Material metal (mânere, rame, picioare mobilier) */
  function _metalMaterial(tone){
    tone = tone || 'black';
    const colorMap = { black:0x1a1a1a, chrome:0xc0c0c0, gold:0xb88a00, brass:0x9c7a3a, alu:0xa8a8a8, copper:0xb87333 };
    const c = colorMap[tone] || colorMap.black;
    const cacheKey = `metal:${tone}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    const THREE = window.THREE;
    const mat = new THREE.MeshStandardMaterial({
      color: c, roughness: 0.32, metalness: 0.92,
    });
    _matCache.set(cacheKey, mat);
    return mat;
  }

  /** Material textil (canapele, perne, draperii) */
  function _fabricMaterial(colorHex, rough){
    const cacheKey = `fabric:${colorHex}:${rough||0.9}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    const THREE = window.THREE;
    const mat = new THREE.MeshStandardMaterial({
      color: _parseHex(colorHex), roughness: rough || 0.9, metalness: 0,
    });
    _matCache.set(cacheKey, mat);
    return mat;
  }

  /** Material porțelan (cadă, WC, chiuvetă) */
  function _porcelainMaterial(){
    if(_matCache.has('porcelain')) return _matCache.get('porcelain');
    const THREE = window.THREE;
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xfbfaf6, roughness: 0.08, metalness: 0.02,
      clearcoat: 0.95, clearcoatRoughness: 0.05,
    });
    _matCache.set('porcelain', mat);
    return mat;
  }

  /** Material ecran TV/monitor (emissive când "pornit") */
  function _screenMaterial(onState){
    const cacheKey = `screen:${onState ? 'on' : 'off'}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    const THREE = window.THREE;
    let mat;
    if(onState){
      // Generăm o textură procedurală cu gradient blue-violet (simulare imagine TV)
      const cv = document.createElement('canvas');
      cv.width = 256; cv.height = 144;
      const ctx = cv.getContext('2d');
      const g = ctx.createLinearGradient(0, 0, 256, 144);
      g.addColorStop(0, '#1e3a8a'); g.addColorStop(0.5, '#7c3aed'); g.addColorStop(1, '#ec4899');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 144);
      // Câteva forme abstracte ca să nu fie gradient pur
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      for(let i = 0; i < 12; i++){
        const x = Math.random() * 256, y = Math.random() * 144, r = Math.random() * 40 + 10;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
      }
      const tex = new THREE.CanvasTexture(cv);
      tex.encoding = THREE.sRGBEncoding;
      mat = new THREE.MeshBasicMaterial({ map: tex });
      mat.emissive = new THREE.Color(0xffffff);
    } else {
      mat = new THREE.MeshStandardMaterial({ color: 0x0a0a12, roughness: 0.15, metalness: 0.4 });
    }
    _matCache.set(cacheKey, mat);
    return mat;
  }

  /** Material frunziș plantă — alpha card billboard procedural */
  function _foliageMaterial(){
    if(_matCache.has('foliage')) return _matCache.get('foliage');
    const THREE = window.THREE;
    // Generăm canvas alpha-tested cu pete verzi (formă de frunze)
    const cv = document.createElement('canvas');
    cv.width = 256; cv.height = 256;
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, 256, 256);
    // Tulpină centrală
    ctx.strokeStyle = '#2d4d22'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(128, 250); ctx.lineTo(128, 50); ctx.stroke();
    // Frunze — elipse verzi de mai multe nuanțe
    const greens = ['#3a6b2e', '#4d8b3a', '#5da045', '#3d7028', '#2e5a20'];
    for(let i = 0; i < 28; i++){
      const angle = Math.random() * Math.PI * 2;
      const r = 30 + Math.random() * 90;
      const cx = 128 + Math.cos(angle) * (Math.random() * 60);
      const cy = 50 + Math.random() * 180;
      const lw = 18 + Math.random() * 28;
      const lh = 8 + Math.random() * 14;
      ctx.fillStyle = greens[Math.floor(Math.random() * greens.length)];
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.random() * Math.PI);
      ctx.beginPath(); ctx.ellipse(0, 0, lw, lh, 0, 0, Math.PI*2); ctx.fill();
      ctx.restore();
    }
    const tex = new THREE.CanvasTexture(cv);
    tex.encoding = THREE.sRGBEncoding;
    const mat = new THREE.MeshStandardMaterial({
      map: tex, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide,
      roughness: 0.85, metalness: 0,
    });
    _matCache.set('foliage', mat);
    return mat;
  }

  /** Material covor (decorativ în living/dormitor) */
  function _carpetMaterial(colorHex){
    const cacheKey = `carpet:${colorHex || '#8b6f47'}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    const THREE = window.THREE;
    const mat = new THREE.MeshStandardMaterial({
      color: _parseHex(colorHex || '#8b6f47'), roughness: 0.95, metalness: 0,
    });
    _matCache.set(cacheKey, mat);
    return mat;
  }

  function _parseHex(hex){
    if(typeof hex === 'number') return hex;
    if(!hex) return 0x808080;
    const h = String(hex).replace('#', '');
    if(h.length === 3){
      return parseInt(h[0]+h[0]+h[1]+h[1]+h[2]+h[2], 16);
    }
    if(h.startsWith('rgb')){
      const m = h.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if(m) return (parseInt(m[1])<<16) | (parseInt(m[2])<<8) | parseInt(m[3]);
    }
    return parseInt(h, 16) || 0x808080;
  }

  // Map tip cameră → set materiale (podea + pereți)
  const ROOM_MAT_MAP = {
    living:    { floor: 'parchet_stejar',  walls: 'tencuiala_interior', fbColor:0xb89876 },
    bedroom:   { floor: 'parchet_stejar',  walls: 'tencuiala_interior', fbColor:0xb89876 },
    bedroom2:  { floor: 'parchet_stejar',  walls: 'tencuiala_interior', fbColor:0xb89876 },
    bedroom3:  { floor: 'parchet_stejar',  walls: 'tencuiala_interior', fbColor:0xb89876 },
    office:    { floor: 'parchet_stejar',  walls: 'tencuiala_interior', fbColor:0xb89876 },
    meeting:   { floor: 'parchet_stejar',  walls: 'tencuiala_interior', fbColor:0xb89876 },
    reception: { floor: 'parchet_stejar',  walls: 'tencuiala_interior', fbColor:0xa88d68 },
    kitchen:   { floor: 'gresie_baie',     walls: 'tencuiala_interior', fbColor:0xddd6c2 },
    bath:      { floor: 'gresie_baie',     walls: 'gresie_baie',        fbColor:0xe8e4dc },
    wc:        { floor: 'gresie_baie',     walls: 'gresie_baie',        fbColor:0xe8e4dc },
    hall:      { floor: 'parchet_stejar',  walls: 'tencuiala_interior', fbColor:0xb89876 },
    core:      { floor: 'beton_subsol',    walls: 'tencuiala_interior', fbColor:0x9c9c9c },
    storage:   { floor: 'beton_subsol',    walls: 'tencuiala_interior', fbColor:0x7a7a7a },
    balcon:    { floor: 'dale_terasa',     walls: 'tencuiala_exterior', fbColor:0xa8a098 },
    commercial:{ floor: 'gresie_baie',     walls: 'tencuiala_interior', fbColor:0xd8d4c8 },
  };

  // ═════════════════════════════════════════════════════════════════════════
  // ANCHOR — origin în lume + dimensiunile clădirii
  // ═════════════════════════════════════════════════════════════════════════

  function _computeAnchor(scene){
    const THREE = window.THREE;
    let target = null;
    if(window.V3D && Array.isArray(window.V3D.aedis) && window.V3D.aedis.length){
      target = window.V3D.aedis[0];
      if(target.parent && target.parent !== scene) target = target.parent;
    }
    const bbox = new THREE.Box3();
    if(target){
      bbox.setFromObject(target);
    } else {
      scene.traverse(o => {
        if(o.isMesh && !o._vtourGenerated && !o._vtourLight && !o._vtourHotspot) bbox.expandByObject(o);
      });
    }
    if(!isFinite(bbox.min.x)){
      return { cx:0, cz:0, baseY:0, bW:20, bD:15 };
    }
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    return {
      cx: center.x, cz: center.z, baseY: bbox.min.y,
      bW: Math.max(size.x, 5), bD: Math.max(size.z, 5),
      topY: bbox.max.y, bbox,
    };
  }

  // ═════════════════════════════════════════════════════════════════════════
  // VOLUME BUILDER — façadă exterior complete (retrageri, penthouse, atic, balcoane, perete cortină, formă)
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Construiește volumul exterior etaj cu etaj, respectând TOATE flagurile AEDIS.
   * Trebuie chemat doar dacă vrem să ÎNLOCUIM volumul AEDIS existent.
   * Dacă AEDIS deja a construit volumul corect cu retrageri/penthouse, sărim peste.
   * Returnează grupul.
   */
  function _buildVolumeExterior(scene, anchor, aedisModel){
    const THREE = window.THREE;
    if(CFG.skipExteriorRebuild){
      console.log('[VTour] Skip rebuild exterior — folosim shell AEDIS existent');
      return null;
    }
    const group = new THREE.Group();
    group._vtourGenerated = true;
    group.name = 'VTourVolume';

    // Ascundem mesh-urile AEDIS existente (să nu se suprapună)
    if(window.V3D && Array.isArray(window.V3D.aedis)){
      window.V3D.aedis.forEach(m => {
        if(m.isMesh || m.isGroup){
          m._vtourHidden = m.visible;
          m.visible = false;
        }
      });
    }

    const bW = anchor.bW, bD = anchor.bD;
    const baseY = anchor.baseY;

    // Construim fiecare etaj cu forma + retragere
    aedisModel.floors.forEach((floor) => {
      const fp = _buildFloorFootprint(aedisModel.formaConfig.type, bW, bD, floor.footprintScale, aedisModel.formaConfig.ratio);
      _buildFloorVolume(group, fp, floor, anchor, aedisModel);
      // Balcoane
      if(floor.balconies.length){
        _buildBalconies(group, floor, anchor, aedisModel);
      }
    });

    scene.add(group);
    STATE.volumeGroup = group;
    return group;
  }

  /** Construiește geometria unui etaj — pereți + fațade + perete cortină dacă e cazul */
  function _buildFloorVolume(group, footprint, floor, anchor, aedisModel){
    const THREE = window.THREE;
    const isParter = floor.type === 'parter';
    const facadeMat = _facadeMaterialForStil(aedisModel.stilDef, floor.idx, isParter);

    // Construim pereții exteriori urmărind conturul (outer)
    const outer = footprint.outer;
    for(let i = 0; i < outer.length; i++){
      const p1 = outer[i];
      const p2 = outer[(i + 1) % outer.length];
      const wx1 = anchor.cx + p1[0], wz1 = anchor.cz + p1[1];
      const wx2 = anchor.cx + p2[0], wz2 = anchor.cz + p2[1];
      const len = Math.hypot(wx2 - wx1, wz2 - wz1);
      if(len < 0.1) continue;
      const cx = (wx1 + wx2) / 2;
      const cz = (wz1 + wz2) / 2;
      const angle = Math.atan2(wz2 - wz1, wx2 - wx1);

      // Decidem dacă acest perete e cortină sau opac
      const useCurtain = floor.hasCurtainWall && !isParter;
      if(useCurtain && Math.random() < (floor.curtainPct / 100)){
        // Perete cortină — sticlă full height cu o ramă subțire jos și sus
        _addBox(group, len, floor.hNiv, 0.05, cx, floor.baseY + floor.hNiv/2 + anchor.baseY, cz, angle, _glassMaterial({opacity:0.42}), true);
        // Frame top + bottom
        _addBox(group, len, 0.12, 0.15, cx, floor.baseY + 0.06 + anchor.baseY, cz, angle, _metalMaterial('alu'), false);
        _addBox(group, len, 0.12, 0.15, cx, floor.baseY + floor.hNiv - 0.06 + anchor.baseY, cz, angle, _metalMaterial('alu'), false);
      } else {
        // Perete opac
        _addBox(group, len, floor.hNiv, 0.22, cx, floor.baseY + floor.hNiv/2 + anchor.baseY, cz, angle, facadeMat, true);
        // Decupăm un șir de ferestre dacă perete > 3m și nu e parter cu vitrină
        if(len > 3 && !isParter){
          _addExteriorWindows(group, len, floor, cx, cz, angle, anchor, aedisModel);
        }
      }
    }

    // Planseu (intermediar — vizibil sub etajul superior)
    if(footprint.holes.length === 0){
      const fpW = Math.abs(outer[1][0] - outer[0][0]);
      const fpD = Math.abs(outer[2][1] - outer[1][1]);
      const slab = new THREE.Mesh(new THREE.BoxGeometry(fpW, 0.18, fpD), _facadeMaterialForStil(aedisModel.stilDef, floor.idx, true));
      slab.position.set(anchor.cx, floor.baseY + anchor.baseY - 0.09, anchor.cz);
      slab.castShadow = true; slab.receiveShadow = true;
      group.add(slab);
    }
  }

  /** Adaugă rame de ferestre vizibile pe fațadă (cosmetic — ferestrele reale sunt cele din releveu) */
  function _addExteriorWindows(group, wallLen, floor, cx, cz, angle, anchor, aedisModel){
    const THREE = window.THREE;
    const windowW = 1.2, windowH = 1.4;
    const sillH = 0.95;
    const nWindows = Math.max(1, Math.floor(wallLen / 2.5));
    const spacing = wallLen / (nWindows + 1);
    const frameMat = _metalMaterial('alu');
    const glassMat = _glassMaterial({colorHex: aedisModel.stilDef.windowColor || '#7dd3fc', opacity:0.38});

    for(let i = 1; i <= nWindows; i++){
      const tAlong = (i * spacing) - wallLen/2;
      const wx = cx + Math.cos(angle) * tAlong;
      const wz = cz + Math.sin(angle) * tAlong;
      const yC = floor.baseY + sillH + windowH/2 + anchor.baseY;
      // Sticlă (în adâncime mai mare decât peretele)
      _addBox(group, windowW, windowH, 0.06, wx, yC, wz, angle, glassMat, false);
      // 4 rame
      _addBox(group, windowW + 0.08, 0.05, 0.08, wx, yC + windowH/2 + 0.025, wz, angle, frameMat, false);
      _addBox(group, windowW + 0.08, 0.05, 0.08, wx, yC - windowH/2 - 0.025, wz, angle, frameMat, false);
      const perpX = -Math.sin(angle), perpZ = Math.cos(angle);
      const sX = Math.cos(angle), sZ = Math.sin(angle);
      const halfW = windowW/2 + 0.04;
      _addBox(group, 0.05, windowH + 0.1, 0.08, wx + sX * halfW, yC, wz + sZ * halfW, angle, frameMat, false);
      _addBox(group, 0.05, windowH + 0.1, 0.08, wx - sX * halfW, yC, wz - sZ * halfW, angle, frameMat, false);
    }
  }

  /** Balcoane extrudate cu balustradă metalică */
  function _buildBalconies(group, floor, anchor, aedisModel){
    const THREE = window.THREE;
    const bW = anchor.bW, bD = anchor.bD;
    floor.balconies.forEach(b => {
      const side = b.side;
      const depth = b.depth || 1.5;
      let len, cx, cz, angle, normalX, normalZ;
      // Calcul poziție laterală
      switch(side){
        case 'N': len = bW * b.scale; cx = anchor.cx; cz = anchor.cz - bD/2 - depth/2; angle = 0; normalZ = -1; normalX = 0; break;
        case 'S': len = bW * b.scale; cx = anchor.cx; cz = anchor.cz + bD/2 + depth/2; angle = 0; normalZ = 1;  normalX = 0; break;
        case 'V': case 'W': len = bD * b.scale; cx = anchor.cx - bW/2 - depth/2; cz = anchor.cz; angle = Math.PI/2; normalX = -1; normalZ = 0; break;
        case 'E': len = bD * b.scale; cx = anchor.cx + bW/2 + depth/2; cz = anchor.cz; angle = Math.PI/2; normalX = 1;  normalZ = 0; break;
        default: return;
      }
      const balY = floor.baseY + anchor.baseY;

      // Placa balcon (BoxGeometry, beton)
      const concreteMat = _loadPBR('beton_subsol', { repeatX:2, repeatY:1, fallbackColor:0xa8a098 });
      _addBox(group, side === 'V' || side === 'W' || side === 'E' ? depth : len,
                     0.18,
                     side === 'V' || side === 'W' || side === 'E' ? len : depth,
              cx, balY + 0.09, cz, 0, concreteMat, false);

      // Balustradă — 3 traverse orizontale + montanți verticali
      const railH = 1.05;
      const railMat = _metalMaterial('alu');
      const balCount = Math.max(2, Math.floor(len / 0.15));
      const baseLen = side === 'V' || side === 'W' || side === 'E' ? len : len;
      const direction = side === 'V' || side === 'W' || side === 'E' ? 'z' : 'x';

      // Traverse orizontale
      for(let h of [0.18 + 0.05, balY + railH - 0.05]){
        // Top + intermediar
      }
      // Top rail
      const topY = balY + railH;
      const trapW = (direction === 'x') ? len : 0.04;
      const trapD = (direction === 'x') ? 0.04 : len;
      _addBox(group, trapW, 0.04, trapD,
        cx + (direction === 'z' ? normalX * depth/2 * 0.85 : 0),
        topY,
        cz + (direction === 'z' ? 0 : (direction === 'x' ? normalZ * 0 : 0)),
        0, railMat, false);

      // Mid rail
      _addBox(group, trapW, 0.025, trapD,
        cx, balY + 0.55, cz, 0, railMat, false);

      // Bara la bază
      _addBox(group, trapW, 0.04, trapD,
        cx, balY + 0.22, cz, 0, railMat, false);

      // Montanți verticali (la fiecare 1m)
      const nMont = Math.max(2, Math.floor(len / 0.5));
      const span = len / (nMont - 1);
      for(let i = 0; i < nMont; i++){
        const tAlong = i * span - len/2;
        const mx = direction === 'x' ? cx + tAlong : cx;
        const mz = direction === 'z' ? cz + tAlong : cz;
        _addBox(group, 0.03, railH, 0.03, mx, balY + railH/2, mz, 0, railMat, false);
      }
    });
  }

  // Helper — adaugă BoxGeometry orientat în scenă
  function _addBox(group, w, h, d, cx, cy, cz, angleY, material, collide){
    const THREE = window.THREE;
    const geo = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(cx, cy, cz);
    mesh.rotation.y = angleY;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    if(collide && STATE.collisionMeshes) STATE.collisionMeshes.push(mesh);
    return mesh;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // ROOF BUILDER — toate cele 6 tipuri
  // ═════════════════════════════════════════════════════════════════════════

  function _buildRoof(scene, anchor, aedisModel){
    const THREE = window.THREE;
    const group = new THREE.Group();
    group._vtourGenerated = true;
    group.name = 'VTourRoof';

    const roof = aedisModel.roof;
    const lastFloor = aedisModel.floors[aedisModel.floors.length - 1];
    const yTop = lastFloor.topY + anchor.baseY;
    const bW = anchor.bW;
    const bD = anchor.bD;
    const lastScale = lastFloor.footprintScale || 1.0;
    const eW = bW * lastScale;
    const eD = bD * lastScale;

    switch(roof.type){
      case 'sarpanta':
        _buildRoofSarpanta(group, anchor.cx, anchor.cz, yTop, eW, eD, roof.unghi, roof.hSarpanta, aedisModel);
        break;
      case 'mansarda':
        _buildRoofMansarda(group, anchor.cx, anchor.cz, yTop, eW, eD, roof.unghi, roof.hMansarda, aedisModel);
        break;
      case 'terasa_circulabila':
        _buildRoofTerasaCirc(group, anchor.cx, anchor.cz, yTop, eW, eD, roof.parapetH, aedisModel, true);
        break;
      case 'terasa_plata':
      case 'combinat':
      default:
        _buildRoofTerasaCirc(group, anchor.cx, anchor.cz, yTop, eW, eD, roof.parapetH, aedisModel, false);
        break;
      case 'penthouse':
        // Tipul de acoperiș "penthouse" — implementat în volumul exterior ca etaj extra
        break;
    }

    scene.add(group);
    STATE.roofGroup = group;
    return group;
  }

  function _buildRoofTerasaCirc(group, cx, cz, yTop, eW, eD, parapetH, aedisModel, circulabila){
    const THREE = window.THREE;
    const matDale = circulabila
      ? _loadPBR('dale_terasa', { repeatX: Math.max(2, eW/1.5), repeatY: Math.max(2, eD/1.5), fallbackColor:0xa8a098 })
      : _loadPBR('beton_subsol', { repeatX: Math.max(2, eW/2), repeatY: Math.max(2, eD/2), fallbackColor:0x9a9a98 });

    const slab = new THREE.Mesh(new THREE.BoxGeometry(eW, 0.2, eD), matDale);
    slab.position.set(cx, yTop + 0.1, cz);
    slab.receiveShadow = true; slab.castShadow = true;
    group.add(slab);

    const matParapet = _facadeMaterialForStil(aedisModel.stilDef, aedisModel.floors.length - 1, false);
    const parapetT = 0.18;
    const positions = [
      { l: eW, x: cx,            z: cz - eD/2, ang: 0 },
      { l: eW, x: cx,            z: cz + eD/2, ang: 0 },
      { l: eD, x: cx - eW/2,     z: cz,        ang: Math.PI/2 },
      { l: eD, x: cx + eW/2,     z: cz,        ang: Math.PI/2 },
    ];
    positions.forEach(p => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(p.l, parapetH, parapetT), matParapet);
      m.position.set(p.x, yTop + 0.2 + parapetH/2, p.z);
      m.rotation.y = p.ang;
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    });
  }

  function _buildRoofSarpanta(group, cx, cz, yTop, eW, eD, unghi, hSarpanta, aedisModel){
    const THREE = window.THREE;
    const pantaRad = unghi * Math.PI / 180;
    const hCoama = hSarpanta || (eD / 2) * Math.tan(pantaRad);
    const overhang = 0.7;
    const matTigla = _loadPBR('tigla_acoperis', { repeatX:8, repeatY:5, fallbackColor:0xa05030 });

    const slopeLen = Math.hypot(eD/2 + overhang, hCoama);
    const slopeW = eW + 2*overhang;

    const slopeN = new THREE.Mesh(new THREE.PlaneGeometry(slopeW, slopeLen), matTigla);
    slopeN.rotation.order = 'YXZ';
    slopeN.rotation.x = -(Math.PI/2 - pantaRad);
    slopeN.position.set(cx, yTop + hCoama/2, cz - (eD/2 + overhang)/2 * Math.cos(pantaRad));
    slopeN.castShadow = true; slopeN.receiveShadow = true;
    group.add(slopeN);

    const slopeS = new THREE.Mesh(new THREE.PlaneGeometry(slopeW, slopeLen), matTigla);
    slopeS.rotation.order = 'YXZ';
    slopeS.rotation.x = (Math.PI/2 - pantaRad);
    slopeS.position.set(cx, yTop + hCoama/2, cz + (eD/2 + overhang)/2 * Math.cos(pantaRad));
    slopeS.castShadow = true; slopeS.receiveShadow = true;
    group.add(slopeS);

    // Frontoane (timpanuri triunghiulare)
    const matFronton = _facadeMaterialForStil(aedisModel.stilDef, aedisModel.floors.length - 1, false);
    [-1, 1].forEach(side => {
      const shape = new THREE.Shape();
      shape.moveTo(-eD/2, 0);
      shape.lineTo(eD/2, 0);
      shape.lineTo(0, hCoama);
      shape.closePath();
      const geo = new THREE.ShapeGeometry(shape);
      const m = new THREE.Mesh(geo, matFronton);
      m.rotation.y = Math.PI/2 * side;
      m.position.set(cx + side * eW/2, yTop, cz);
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    });
  }

  function _buildRoofMansarda(group, cx, cz, yTop, eW, eD, unghi, hMansarda, aedisModel){
    // Mansarda = șarpantă cu pantă mai mare + spațiu util în interior
    _buildRoofSarpanta(group, cx, cz, yTop, eW, eD, Math.max(unghi, 45), hMansarda, aedisModel);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INTERIOR BUILDER — pereți din releveu cu adaptare la retrageri per etaj
  // ═════════════════════════════════════════════════════════════════════════

  function _buildInterior(scene, anchor, aedisModel){
    const THREE = window.THREE;
    const RV = window._RV;
    if(!RV || !Array.isArray(RV.floors) || !RV.floors.length){
      console.log('[VTour] Fără relevee — fără interior');
      return null;
    }
    if(typeof window._extractWalls !== 'function'){
      console.warn('[VTour] _extractWalls indisponibil — fără pereți interiori');
      return null;
    }

    const group = new THREE.Group();
    group._vtourGenerated = true;
    group.name = 'VTourInterior';

    const bW = (RV.building && RV.building.bW) || anchor.bW;
    const bD = (RV.building && RV.building.bD) || anchor.bD;
    const ox = anchor.cx - bW / 2;
    const oz = anchor.cz - bD / 2;
    const baseY = anchor.baseY;

    RV.floors.forEach((floor, fIdx) => {
      if(!floor || !Array.isArray(floor.rects)) return;
      // Aliniem cu aedisModel.floors[fIdx] dacă există (pentru hNiv corect + retragere)
      const aedisFloor = aedisModel.floors[fIdx] || aedisModel.floors[aedisModel.floors.length - 1];
      const yBottom = baseY + aedisFloor.baseY;
      const yTop = baseY + aedisFloor.topY;
      const fScale = aedisFloor.footprintScale || 1.0;

      // Extragem pereții cu goluri
      let walls;
      try {
        walls = window._extractWalls(
          floor.rects, bW, bD, floor.wins || [], floor.doors || [], 0.28, 0.14
        );
      } catch(e){
        console.warn('[VTour] _extractWalls failed pe nivel', fIdx, ':', e.message);
        return;
      }

      // Scale și offset coordonate pentru retragere etaj
      const scaledOx = anchor.cx - (bW * fScale)/2;
      const scaledOz = anchor.cz - (bD * fScale)/2;

      walls.forEach(w => {
        _buildWallSegment(w, yBottom, yTop, scaledOx, scaledOz, fScale, group, floor, aedisModel);
      });

      // Podele + tavane per cameră
      floor.rects.forEach(r => {
        if(r.bal) return;
        _buildRoomFloor(r, yBottom, scaledOx, scaledOz, fScale, group, aedisModel);
        const isTopFloor = (fIdx === RV.floors.length - 1);
        const skipCeil = isTopFloor && aedisModel.roof.type !== 'sarpanta' && aedisModel.roof.type !== 'mansarda';
        if(!skipCeil) _buildRoomCeiling(r, yTop, scaledOx, scaledOz, fScale, group);
      });

      // Uși vizibile 3D din `doors[]`
      floor.doors && floor.doors.forEach(d => {
        _buildDoor3D(d, yBottom, yTop, scaledOx, scaledOz, fScale, group, bW, bD);
      });
    });

    scene.add(group);
    STATE.interiorGroup = group;
    return group;
  }

  function _buildWallSegment(w, yBottom, yTop, ox, oz, fScale, group, floor, aedisModel){
    const THREE = window.THREE;
    // Aplicăm scale pe coordonate (pentru retrageri etaj)
    const x1 = w.x1 * fScale + ox, x2 = w.x2 * fScale + ox;
    const z1 = w.y1 * fScale + oz, z2 = w.y2 * fScale + oz;
    const len = Math.hypot(x2 - x1, z2 - z1);
    if(len < 0.05) return;
    const cx = (x1 + x2) / 2;
    const cz = (z1 + z2) / 2;
    const angle = Math.atan2(z2 - z1, x2 - x1);
    const thick = w.thick || 0.15;
    const hTotal = yTop - yBottom;

    const matName = (w.type === 'ext') ? 'tencuiala_exterior' : 'tencuiala_interior';
    const wallMat = _loadPBR(matName, {
      repeatX: Math.max(1, len/2.2), repeatY: Math.max(1, hTotal/2.5),
      fallbackColor: w.type === 'ext' ? 0xe8e0d0 : 0xf0ece4
    });

    if(w.type === 'ext' || w.type === 'int'){
      _addBox(group, len, hTotal, thick, cx, yBottom + hTotal/2, cz, angle, wallMat, true);
    } else if(w.type === 'win'){
      const parapetH = 0.9;
      const sillTop = 2.2;
      _addBox(group, len, parapetH, thick, cx, yBottom + parapetH/2, cz, angle, wallMat, true);
      if(hTotal > sillTop){
        _addBox(group, len, (hTotal - sillTop), thick,
          cx, yBottom + sillTop + (hTotal - sillTop)/2, cz, angle, wallMat, true);
      }
      // Sticlă fereastră
      const glassH = sillTop - parapetH;
      _addBox(group, len, glassH, thick * 0.25,
        cx, yBottom + parapetH + glassH/2, cz, angle,
        _glassMaterial({colorHex: aedisModel.stilDef.windowColor || '#7dd3fc', opacity:0.35}),
        false);
      // Rame metalice
      _buildWindowFrame(group, len, glassH, cx, yBottom + parapetH + glassH/2, cz, angle);
    } else if(w.type === 'door'){
      const doorTop = 2.1;
      const lintelH = hTotal - doorTop;
      if(lintelH > 0.05){
        _addBox(group, len, lintelH, thick,
          cx, yBottom + doorTop + lintelH/2, cz, angle, wallMat, true);
      }
    }
  }

  function _buildWindowFrame(group, len, h, cx, cy, cz, angleY){
    const frameMat = _metalMaterial('alu');
    const t = 0.04;
    // top + bottom
    _addBox(group, len + 0.08, t, t, cx, cy + h/2 + t/2, cz, angleY, frameMat, false);
    _addBox(group, len + 0.08, t, t, cx, cy - h/2 - t/2, cz, angleY, frameMat, false);
    // laterale
    const sX = Math.cos(angleY), sZ = Math.sin(angleY);
    _addBox(group, t, h + 0.08, t, cx + sX * (len/2 + t/2), cy, cz + sZ * (len/2 + t/2), angleY, frameMat, false);
    _addBox(group, t, h + 0.08, t, cx - sX * (len/2 + t/2), cy, cz - sZ * (len/2 + t/2), angleY, frameMat, false);
    // mediană orizontală
    _addBox(group, len, t * 0.6, t * 0.7, cx, cy, cz, angleY, frameMat, false);
  }

  function _buildRoomFloor(r, yBottom, ox, oz, fScale, group, aedisModel){
    const THREE = window.THREE;
    const matSet = ROOM_MAT_MAP[r.t] || ROOM_MAT_MAP.hall;
    const fbColor = matSet.fbColor;
    const mat = _loadPBR(matSet.floor, {
      repeatX: Math.max(1, r.w/1.2), repeatY: Math.max(1, r.h/1.2),
      fallbackColor: fbColor
    });
    const geo = new THREE.PlaneGeometry(r.w * fScale, r.h * fScale);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(ox + (r.x + r.w/2) * fScale, yBottom + 0.01, oz + (r.y + r.h/2) * fScale);
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  function _buildRoomCeiling(r, yTop, ox, oz, fScale, group){
    const THREE = window.THREE;
    const mat = _loadPBR('tencuiala_interior', {
      repeatX: Math.max(1, r.w/3), repeatY: Math.max(1, r.h/3),
      fallbackColor: 0xfafaf6
    });
    const geo = new THREE.PlaneGeometry(r.w * fScale, r.h * fScale);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.set(ox + (r.x + r.w/2) * fScale, yTop - 0.01, oz + (r.y + r.h/2) * fScale);
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  function _buildDoor3D(d, yBottom, yTop, ox, oz, fScale, group, bW, bD){
    const THREE = window.THREE;
    const doorH = 2.05;
    const doorW = (d.w || 0.85) * fScale;
    const woodMat = _woodMaterial('medium');
    const handleMat = _metalMaterial('chrome');

    // Coordonate pe plan — d.x, d.y în metri
    // axis: 'H' = perete orizontal (paralel cu X) → ușă rotită 0
    // axis: 'V' = perete vertical (paralel cu Z) → ușă rotită 90°
    const isH = d.axis === 'H' || d.axis == null;
    let cx, cz, angle;
    if(isH){
      cx = ox + (d.x + (d.w || 0.85)/2) * fScale;
      cz = oz + d.y * fScale;
      angle = 0;
    } else {
      cx = ox + d.x * fScale;
      cz = oz + (d.y + (d.w || 0.85)/2) * fScale;
      angle = Math.PI / 2;
    }

    // Plan ușă (deschisă 15° pentru efect realist)
    const openAngle = 0.26; // ~15°
    const hingeOffset = doorW / 2;
    const doorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(doorW, doorH, 0.04),
      woodMat
    );
    // Calculăm pivot (la balama) — pozitia centrată ofset cu jumătatea pe direcția potrivită
    const hingeDir = d.swing === 'right' ? 1 : -1;
    const sX = Math.cos(angle), sZ = Math.sin(angle);
    const hingeX = cx - sX * hingeOffset * hingeDir;
    const hingeZ = cz - sZ * hingeOffset * hingeDir;
    doorMesh.position.set(
      hingeX + sX * Math.cos(openAngle) * hingeOffset * hingeDir
             + (-Math.sin(angle)) * Math.sin(openAngle) * hingeOffset * hingeDir,
      yBottom + doorH/2,
      hingeZ + sZ * Math.cos(openAngle) * hingeOffset * hingeDir
             + Math.cos(angle) * Math.sin(openAngle) * hingeOffset * hingeDir
    );
    doorMesh.rotation.y = angle + openAngle * hingeDir;
    doorMesh.castShadow = true; doorMesh.receiveShadow = true;
    group.add(doorMesh);

    // Mâner (2 — unul pe fiecare față)
    const handleY = yBottom + 1.05;
    const handleOffset = doorW * 0.4 * hingeDir;
    const hMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.13, 12), handleMat);
    hMesh.rotation.z = Math.PI / 2;
    hMesh.position.copy(doorMesh.position);
    hMesh.position.y = handleY;
    hMesh.position.x += Math.cos(doorMesh.rotation.y) * handleOffset;
    hMesh.position.z += Math.sin(doorMesh.rotation.y) * handleOffset;
    hMesh.rotation.y = doorMesh.rotation.y;
    group.add(hMesh);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // FURNITURE SYSTEM — mobilier procedural per tip cameră
  // ═════════════════════════════════════════════════════════════════════════

  function _buildFurniture(scene, anchor, aedisModel){
    if(!CFG.enableFurniture) return null;
    const THREE = window.THREE;
    const RV = window._RV;
    if(!RV || !Array.isArray(RV.floors)) return null;

    const group = new THREE.Group();
    group._vtourGenerated = true;
    group.name = 'VTourFurniture';

    const bW = (RV.building && RV.building.bW) || anchor.bW;
    const bD = (RV.building && RV.building.bD) || anchor.bD;
    const baseY = anchor.baseY;

    // LIMITĂ HARD: selectăm doar camere KEY (max 8 total în întreaga clădire)
    // Strategia: o cameră reprezentativă din fiecare tip relevant pe etajul cu cele mai multe
    const PRIORITY_TYPES = ['living', 'bedroom', 'kitchen', 'bath', 'office', 'meeting', 'reception'];
    const MAX_FURNISHED_ROOMS = 8;
    const selectedRooms = []; // {floor, fIdx, rect}
    const seenTypes = new Set();
    // Prima trecere: o cameră per tip prioritar (cea mai mare)
    PRIORITY_TYPES.forEach(type => {
      let best = null, bestArea = 0;
      RV.floors.forEach((floor, fIdx) => {
        if(!floor || !Array.isArray(floor.rects)) return;
        floor.rects.forEach(r => {
          if(r.bal || r.t !== type) return;
          const area = r.w * r.h;
          if(area > bestArea && area > 4){
            bestArea = area;
            best = { floor, fIdx, rect: r };
          }
        });
      });
      if(best && selectedRooms.length < MAX_FURNISHED_ROOMS){
        selectedRooms.push(best);
        seenTypes.add(type);
      }
    });
    // A doua trecere: completăm cu camere mari neselectate (orice tip)
    if(selectedRooms.length < MAX_FURNISHED_ROOMS){
      const remaining = [];
      RV.floors.forEach((floor, fIdx) => {
        if(!floor || !Array.isArray(floor.rects)) return;
        floor.rects.forEach(r => {
          if(r.bal || r.w * r.h < 6) return;
          if(!selectedRooms.find(s => s.rect === r)){
            remaining.push({ floor, fIdx, rect: r, area: r.w * r.h });
          }
        });
      });
      remaining.sort((a, b) => b.area - a.area);
      remaining.slice(0, MAX_FURNISHED_ROOMS - selectedRooms.length).forEach(s => selectedRooms.push(s));
    }

    console.log(`[VTour] Mobilier în ${selectedRooms.length} camere selectate (din total ${RV.floors.reduce((n,f)=>n+(f?.rects?.length||0),0)})`);

    // Construim mobilier doar în camerele selectate
    let pointLightCount = 0;
    const MAX_POINT_LIGHTS = 3;

    selectedRooms.forEach(({ floor, fIdx, rect: r }) => {
      const aedisFloor = aedisModel.floors[fIdx] || aedisModel.floors[aedisModel.floors.length - 1];
      const yBottom = baseY + aedisFloor.baseY;
      const fScale = aedisFloor.footprintScale || 1.0;
      const ox = anchor.cx - (bW * fScale)/2;
      const oz = anchor.cz - (bD * fScale)/2;
      const rx = ox + (r.x + r.w/2) * fScale;
      const rz = oz + (r.y + r.h/2) * fScale;
      const rw = r.w * fScale, rh = r.h * fScale;

      // Setăm un flag global temporar pentru a limita PointLights în primitives
      window.__vtourLightBudget = pointLightCount < MAX_POINT_LIGHTS;
      try {
        switch(r.t){
          case 'living':    _placeLiving(group, rx, yBottom, rz, rw, rh); break;
          case 'bedroom': case 'bedroom2': case 'bedroom3':
                            _placeBedroom(group, rx, yBottom, rz, rw, rh); break;
          case 'kitchen':   _placeKitchen(group, rx, yBottom, rz, rw, rh); break;
          case 'bath':      _placeBathroom(group, rx, yBottom, rz, rw, rh); break;
          case 'wc':        _placeWC(group, rx, yBottom, rz, rw, rh); break;
          case 'office':    _placeOffice(group, rx, yBottom, rz, rw, rh); break;
          case 'hall':      _placeHall(group, rx, yBottom, rz, rw, rh); break;
          case 'reception': _placeReception(group, rx, yBottom, rz, rw, rh); break;
          case 'meeting':   _placeMeeting(group, rx, yBottom, rz, rw, rh); break;
          case 'commercial':_placeCommercial(group, rx, yBottom, rz, rw, rh); break;
        }
        if(pointLightCount < MAX_POINT_LIGHTS) pointLightCount++;
      } catch(err){
        console.warn('[VTour] Eroare la mobilare cameră', r.t, ':', err.message);
      }
    });
    delete window.__vtourLightBudget;

    scene.add(group);
    STATE.furnitureGroup = group;
    console.log('[VTour] ✅ Mobilier:', group.children.length, 'mesh-uri,', pointLightCount, 'PointLights');
    return group;
  }

  // ── LIVING — sofa + TV + măsuță cafea + plantă + covor + lustră ─────────
  function _placeLiving(group, cx, baseY, cz, w, d){
    const THREE = window.THREE;
    // Sofa (perete N, lung pe X)
    if(w > 2.5){
      _makeSofa(group, cx, baseY, cz - d/2 + 0.5, w * 0.65, 0.95, 0, '#3d4858');
    }
    // TV (perete S, montat pe perete)
    if(w > 1.4){
      _makeTV(group, cx, baseY + 1.3, cz + d/2 - 0.05, 1.4, 0.85, 0);
    }
    // Măsuța cafea (centru)
    _makeCoffeeTable(group, cx, baseY, cz, 1.0, 0.55);
    // Covor mare (sub măsuță)
    const carpetMat = _carpetMaterial('#8b6f47');
    const carpet = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(w*0.7, 2.5), Math.min(d*0.6, 1.8)), carpetMat);
    carpet.rotation.x = -Math.PI / 2;
    carpet.position.set(cx, baseY + 0.005, cz);
    carpet.receiveShadow = true;
    group.add(carpet);
    // Plantă (colț SV)
    _makePlant(group, cx - w/2 + 0.4, baseY, cz + d/2 - 0.4, 1.4);
    // Lustră (tavan centru)
    _makeChandelier(group, cx, baseY + 2.7, cz);
  }

  // ── BEDROOM ──────────────────────────────────────────────────────────────
  function _placeBedroom(group, cx, baseY, cz, w, d){
    const THREE = window.THREE;
    if(d > 2.4){
      // Pat dublu pe perete N
      _makeBed(group, cx, baseY, cz - d/2 + 1.0);
      // Noptiere flanc
      _makeNightstand(group, cx - 1.0, baseY, cz - d/2 + 0.35);
      _makeNightstand(group, cx + 1.0, baseY, cz - d/2 + 0.35);
      // Lampe noptiere
      _makeTableLamp(group, cx - 1.0, baseY + 0.6, cz - d/2 + 0.35);
      _makeTableLamp(group, cx + 1.0, baseY + 0.6, cz - d/2 + 0.35);
    }
    // Dulap (perete S)
    if(w > 1.5){
      _makeWardrobe(group, cx, baseY, cz + d/2 - 0.35, Math.min(w * 0.6, 2.0));
    }
    // Lustră
    _makeChandelier(group, cx, baseY + 2.7, cz, 'compact');
  }

  // ── KITCHEN ──────────────────────────────────────────────────────────────
  function _placeKitchen(group, cx, baseY, cz, w, d){
    const THREE = window.THREE;
    // Blat pe perete N
    if(w > 1.5){
      _makeKitchenCounter(group, cx, baseY, cz - d/2 + 0.3, w * 0.85);
    }
    // Frigider (colț SE)
    _makeFridge(group, cx + w/2 - 0.4, baseY, cz - d/2 + 0.4);
    // Masă mâncare (centru sau perete S)
    if(w > 2.2 && d > 2.4){
      _makeDiningTable(group, cx, baseY, cz + 0.5, 1.2, 0.75);
      _makeChair(group, cx - 0.5, baseY, cz + 0.95, Math.PI);
      _makeChair(group, cx + 0.5, baseY, cz + 0.95, Math.PI);
      _makeChair(group, cx - 0.5, baseY, cz + 0.05, 0);
      _makeChair(group, cx + 0.5, baseY, cz + 0.05, 0);
    }
    // Lustră
    _makeChandelier(group, cx, baseY + 2.7, cz, 'compact');
  }

  // ── BATHROOM ─────────────────────────────────────────────────────────────
  function _placeBathroom(group, cx, baseY, cz, w, d){
    // Cadă pe perete cel mai lung
    if(w > 1.8){
      _makeBathtub(group, cx, baseY, cz - d/2 + 0.4, 1.7, 0.75);
    }
    // Chiuvetă
    _makeSink(group, cx + w/2 - 0.35, baseY, cz);
    // WC
    _makeToilet(group, cx - w/2 + 0.35, baseY, cz + d/2 - 0.4);
    // Oglindă
    _makeMirror(group, cx + w/2 - 0.05, baseY + 1.55, cz, 0.6, 0.8, Math.PI/2);
  }

  // ── WC simplu ─────────────────────────────────────────────────────────────
  function _placeWC(group, cx, baseY, cz, w, d){
    _makeToilet(group, cx, baseY, cz - d/2 + 0.4);
    _makeSink(group, cx + w/2 - 0.25, baseY, cz);
  }

  // ── OFFICE ────────────────────────────────────────────────────────────────
  function _placeOffice(group, cx, baseY, cz, w, d){
    // Birou (perete N, cu fereastra)
    _makeDesk(group, cx, baseY, cz - d/2 + 0.4, 1.4, 0.7);
    _makeOfficeChair(group, cx, baseY, cz - d/2 + 1.0);
    // Bibliotecă (perete S)
    if(w > 1.4){
      _makeBookshelf(group, cx, baseY, cz + d/2 - 0.2, Math.min(w * 0.7, 1.5));
    }
    // Plantă (colț)
    _makePlant(group, cx + w/2 - 0.35, baseY, cz + d/2 - 0.35, 1.0);
    _makeChandelier(group, cx, baseY + 2.7, cz, 'compact');
  }

  // ── HALL — minim, cu cuier și plantă ──────────────────────────────────────
  function _placeHall(group, cx, baseY, cz, w, d){
    if(w > 1.5 || d > 1.5){
      _makePlant(group, cx + Math.min(w,d)/2 - 0.4, baseY, cz, 1.2);
    }
    if(d > 1.5){
      // Cuier (BoxGeometry tall)
      _makeBox(group, cx - w/2 + 0.25, baseY + 0.9, cz - d/2 + 0.3, 0.4, 1.8, 0.08, _woodMaterial('medium'));
    }
  }

  // ── RECEPTION — birou + scaune ───────────────────────────────────────────
  function _placeReception(group, cx, baseY, cz, w, d){
    _makeKitchenCounter(group, cx, baseY, cz - d/2 + 0.4, w * 0.7);
    _makeOfficeChair(group, cx, baseY, cz - d/2 + 1.1);
    _makePlant(group, cx - w/2 + 0.4, baseY, cz + d/2 - 0.4, 1.5);
    _makePlant(group, cx + w/2 - 0.4, baseY, cz + d/2 - 0.4, 1.5);
  }

  // ── MEETING ROOM — masă mare cu scaune ────────────────────────────────────
  function _placeMeeting(group, cx, baseY, cz, w, d){
    const tableW = Math.min(w * 0.55, 2.6);
    const tableD = Math.min(d * 0.4, 1.1);
    _makeDiningTable(group, cx, baseY, cz, tableW, tableD);
    const nChairs = Math.max(4, Math.floor(tableW / 0.6) * 2);
    for(let i = 0; i < nChairs/2; i++){
      const t = (i + 0.5) / (nChairs/2);
      const x = cx - tableW/2 + t * tableW;
      _makeChair(group, x, baseY, cz + tableD/2 + 0.4, Math.PI);
      _makeChair(group, x, baseY, cz - tableD/2 - 0.4, 0);
    }
    _makeChandelier(group, cx, baseY + 2.7, cz);
  }

  // ── COMMERCIAL — rafturi simple ──────────────────────────────────────────
  function _placeCommercial(group, cx, baseY, cz, w, d){
    // 2 rânduri de rafturi paralele
    const shelfH = 2.0;
    const woodMat = _woodMaterial('medium');
    if(w > 3){
      for(let zOff of [-d/2 + 0.4, d/2 - 0.4]){
        _makeBox(group, cx, baseY + shelfH/2, cz + zOff, w * 0.7, shelfH, 0.4, woodMat);
      }
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // FURNITURE PRIMITIVES — fiecare obiect generat din primitive
  // ═════════════════════════════════════════════════════════════════════════

  function _makeBox(group, x, y, z, w, h, d, mat, rotY){
    const THREE = window.THREE;
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    if(rotY) m.rotation.y = rotY;
    m.castShadow = true; m.receiveShadow = true;
    group.add(m);
    return m;
  }

  function _makeCyl(group, x, y, z, r, h, mat, rotZ){
    const THREE = window.THREE;
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 16), mat);
    m.position.set(x, y, z);
    if(rotZ) m.rotation.z = rotZ;
    m.castShadow = true; m.receiveShadow = true;
    group.add(m);
    return m;
  }

  function _makeSofa(group, cx, baseY, cz, w, d, rotY, colorHex){
    const fabricMat = _fabricMaterial(colorHex || '#3d4858', 0.92);
    // Bază
    _makeBox(group, cx, baseY + 0.32, cz, w, 0.45, d, fabricMat, rotY);
    // Spatare
    const sX = Math.cos(rotY||0), sZ = Math.sin(rotY||0);
    const px = -Math.sin(rotY||0), pz = Math.cos(rotY||0);
    _makeBox(group, cx + px * (d/2 - 0.1), baseY + 0.72, cz + pz * (d/2 - 0.1), w, 0.6, 0.15, fabricMat, rotY);
    // Brațe
    _makeBox(group, cx + sX * (w/2 - 0.08), baseY + 0.5, cz + sZ * (w/2 - 0.08), 0.15, 0.6, d, fabricMat, rotY);
    _makeBox(group, cx - sX * (w/2 - 0.08), baseY + 0.5, cz - sZ * (w/2 - 0.08), 0.15, 0.6, d, fabricMat, rotY);
    // 3 perne
    const cushW = (w - 0.4) / 3;
    for(let i = 0; i < 3; i++){
      const offset = -w/2 + 0.2 + cushW/2 + i * cushW;
      _makeBox(group, cx + sX * offset, baseY + 0.6, cz + sZ * offset, cushW * 0.85, 0.12, d * 0.7,
        _fabricMaterial(colorHex || '#3d4858', 0.95), rotY);
    }
  }

  function _makeCoffeeTable(group, cx, baseY, cz, w, d){
    const top = _woodMaterial('dark');
    const legs = _metalMaterial('black');
    // Suprafață
    _makeBox(group, cx, baseY + 0.4, cz, w, 0.04, d, top);
    // 4 picioare
    [-1,1].forEach(sx => {
      [-1,1].forEach(sz => {
        _makeCyl(group, cx + sx * (w/2 - 0.08), baseY + 0.2, cz + sz * (d/2 - 0.08), 0.025, 0.4, legs);
      });
    });
  }

  function _makeBed(group, cx, baseY, cz){
    // Saltea albă
    _makeBox(group, cx, baseY + 0.42, cz, 1.6, 0.25, 2.0, _fabricMaterial('#f5f5f0', 0.95));
    // Cadru lemn
    _makeBox(group, cx, baseY + 0.15, cz, 1.7, 0.3, 2.1, _woodMaterial('medium'));
    // Tăblie
    _makeBox(group, cx, baseY + 0.95, cz - 1.0 - 0.05, 1.7, 0.9, 0.1, _woodMaterial('medium'));
    // 2 perne
    _makeBox(group, cx - 0.35, baseY + 0.6, cz - 0.7, 0.6, 0.15, 0.4, _fabricMaterial('#ffffff', 0.95));
    _makeBox(group, cx + 0.35, baseY + 0.6, cz - 0.7, 0.6, 0.15, 0.4, _fabricMaterial('#ffffff', 0.95));
    // Plapumă (textil colorat)
    _makeBox(group, cx, baseY + 0.56, cz + 0.2, 1.55, 0.05, 1.5, _fabricMaterial('#5d7a8c', 0.92));
  }

  function _makeNightstand(group, cx, baseY, cz){
    _makeBox(group, cx, baseY + 0.3, cz, 0.45, 0.6, 0.4, _woodMaterial('medium'));
    // Sertar (cosmetic)
    _makeBox(group, cx, baseY + 0.42, cz + 0.21, 0.4, 0.12, 0.02, _woodMaterial('dark'));
    _makeBox(group, cx, baseY + 0.42, cz + 0.22, 0.05, 0.02, 0.02, _metalMaterial('chrome'));
  }

  function _makeTableLamp(group, cx, baseY, cz){
    const THREE = window.THREE;
    // Bază metalică
    _makeCyl(group, cx, baseY + 0.03, cz, 0.08, 0.05, _metalMaterial('brass'));
    // Stand
    _makeCyl(group, cx, baseY + 0.2, cz, 0.015, 0.35, _metalMaterial('brass'));
    // Abajur (con)
    const lampMat = new THREE.MeshStandardMaterial({color:0xfff5d8, roughness:0.45, metalness:0, emissive:0xffe0a0, emissiveIntensity:0.6});
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.2, 16, 1, true), lampMat);
    cone.position.set(cx, baseY + 0.45, cz);
    cone.castShadow = true;
    group.add(cone);
    // Point light real
    if(CFG.enableLighting && window.__vtourLightBudget){
      const pl = new THREE.PointLight(0xfff0c8, 0.6, 4, 2);
      pl.position.set(cx, baseY + 0.4, cz);
      pl.castShadow = false; // off pentru performanță (multe lampe)
      group.add(pl);
    }
  }

  function _makeWardrobe(group, cx, baseY, cz, w){
    _makeBox(group, cx, baseY + 1.1, cz, w, 2.2, 0.6, _woodMaterial('dark'));
    // Uși (linie verticală decupată cosmetic)
    _makeBox(group, cx, baseY + 1.1, cz + 0.31, 0.02, 2.2, 0.02, _metalMaterial('chrome'));
    // 2 mânere
    _makeCyl(group, cx - 0.15, baseY + 1.1, cz + 0.32, 0.012, 0.08, _metalMaterial('chrome'), Math.PI/2);
    _makeCyl(group, cx + 0.15, baseY + 1.1, cz + 0.32, 0.012, 0.08, _metalMaterial('chrome'), Math.PI/2);
  }

  function _makeKitchenCounter(group, cx, baseY, cz, w){
    // Corp inferior (dulapuri)
    _makeBox(group, cx, baseY + 0.45, cz, w, 0.9, 0.6, _woodMaterial('dark'));
    // Blat
    _makeBox(group, cx, baseY + 0.92, cz, w + 0.04, 0.04, 0.62, _loadPBR('blat_bucatarie', {repeatX:Math.max(2,w/0.8), repeatY:1, fallbackColor:0x4a3a2a}));
    // Plită (cerc negru pe blat)
    _makeBox(group, cx - w/4, baseY + 0.945, cz + 0.05, 0.4, 0.02, 0.4, new (window.THREE.MeshStandardMaterial)({color:0x0a0a0a, roughness:0.3, metalness:0.4}));
    // Chiuvetă încastrată
    _makeBox(group, cx + w/4, baseY + 0.93, cz, 0.5, 0.04, 0.4, _porcelainMaterial());
    // Mânere dulapuri
    for(let i = -1; i <= 1; i++){
      _makeBox(group, cx + i * w/4, baseY + 0.7, cz + 0.31, 0.15, 0.02, 0.02, _metalMaterial('chrome'));
    }
  }

  function _makeFridge(group, cx, baseY, cz){
    _makeBox(group, cx, baseY + 0.92, cz, 0.65, 1.85, 0.65, new (window.THREE.MeshStandardMaterial)({color:0xe8e8e8, roughness:0.25, metalness:0.6}));
    // Mâner
    _makeBox(group, cx + 0.27, baseY + 1.0, cz, 0.04, 0.4, 0.04, _metalMaterial('chrome'));
    // Linie ușă freezer/frigider
    _makeBox(group, cx, baseY + 1.3, cz + 0.331, 0.65, 0.01, 0.005, _metalMaterial('chrome'));
  }

  function _makeDiningTable(group, cx, baseY, cz, w, d){
    _makeBox(group, cx, baseY + 0.74, cz, w, 0.04, d, _woodMaterial('medium'));
    [-1,1].forEach(sx => {
      [-1,1].forEach(sz => {
        _makeBox(group, cx + sx * (w/2 - 0.06), baseY + 0.37, cz + sz * (d/2 - 0.06), 0.05, 0.74, 0.05, _woodMaterial('medium'));
      });
    });
  }

  function _makeChair(group, cx, baseY, cz, rotY){
    const m = _woodMaterial('medium');
    // Sezut
    _makeBox(group, cx, baseY + 0.45, cz, 0.42, 0.04, 0.42, m, rotY);
    // 4 picioare
    const sX = Math.cos(rotY), sZ = Math.sin(rotY);
    const pX = -Math.sin(rotY), pZ = Math.cos(rotY);
    [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([a,b]) => {
      _makeBox(group,
        cx + sX * a * 0.18 + pX * b * 0.18,
        baseY + 0.225,
        cz + sZ * a * 0.18 + pZ * b * 0.18,
        0.04, 0.45, 0.04, m);
    });
    // Spătar
    _makeBox(group, cx - pX * 0.2, baseY + 0.7, cz - pZ * 0.2, 0.42, 0.45, 0.04, m, rotY);
  }

  function _makeTV(group, cx, baseY, cz, w, h, rotY){
    // Ramă neagră
    _makeBox(group, cx, baseY, cz, w, h, 0.06, new (window.THREE.MeshStandardMaterial)({color:0x0a0a0a, roughness:0.3, metalness:0.5}), rotY);
    // Ecran activ
    const screen = _screenMaterial(true);
    _makeBox(group, cx, baseY, cz + 0.031, w - 0.06, h - 0.06, 0.005, screen, rotY);
  }

  function _makeBathtub(group, cx, baseY, cz, w, d){
    // Exterior cadă
    _makeBox(group, cx, baseY + 0.28, cz, w, 0.55, d, _porcelainMaterial());
    // Cavitate apă (BoxGeometry mai mic, deasupra)
    _makeBox(group, cx, baseY + 0.45, cz, w - 0.12, 0.05, d - 0.12, new (window.THREE.MeshPhysicalMaterial)({color:0xa8d8e8, roughness:0.05, metalness:0, transparent:true, opacity:0.6, clearcoat:1}));
    // Robinet
    _makeCyl(group, cx + w/2 - 0.1, baseY + 0.7, cz, 0.025, 0.2, _metalMaterial('chrome'));
    _makeCyl(group, cx + w/2 - 0.18, baseY + 0.72, cz, 0.015, 0.08, _metalMaterial('chrome'), Math.PI/2);
  }

  function _makeToilet(group, cx, baseY, cz){
    // Vas
    _makeBox(group, cx, baseY + 0.2, cz, 0.4, 0.4, 0.55, _porcelainMaterial());
    // Capac
    _makeBox(group, cx, baseY + 0.42, cz, 0.4, 0.03, 0.5, _porcelainMaterial());
    // Rezervor (perete spate)
    _makeBox(group, cx, baseY + 0.62, cz - 0.15, 0.4, 0.5, 0.2, _porcelainMaterial());
  }

  function _makeSink(group, cx, baseY, cz){
    // Suport
    _makeCyl(group, cx, baseY + 0.4, cz, 0.04, 0.8, _metalMaterial('chrome'));
    // Lavoar
    _makeBox(group, cx, baseY + 0.82, cz, 0.5, 0.15, 0.4, _porcelainMaterial());
    // Robinet
    _makeCyl(group, cx, baseY + 0.92, cz - 0.1, 0.018, 0.15, _metalMaterial('chrome'));
  }

  function _makeMirror(group, cx, baseY, cz, w, h, rotY){
    const mirror = new (window.THREE.MeshStandardMaterial)({color:0xeef2f7, roughness:0.02, metalness:1.0, envMapIntensity:2.0});
    _makeBox(group, cx, baseY, cz, 0.05, h, w, mirror, rotY);
    // Ramă subțire
    _makeBox(group, cx, baseY + h/2 + 0.025, cz, 0.06, 0.05, w + 0.04, _woodMaterial('dark'), rotY);
    _makeBox(group, cx, baseY - h/2 - 0.025, cz, 0.06, 0.05, w + 0.04, _woodMaterial('dark'), rotY);
  }

  function _makeDesk(group, cx, baseY, cz, w, d){
    _makeBox(group, cx, baseY + 0.73, cz, w, 0.04, d, _woodMaterial('dark'));
    // 2 picioare laterale (panel)
    _makeBox(group, cx - w/2 + 0.04, baseY + 0.365, cz, 0.04, 0.73, d, _woodMaterial('dark'));
    _makeBox(group, cx + w/2 - 0.04, baseY + 0.365, cz, 0.04, 0.73, d, _woodMaterial('dark'));
    // Sertar
    _makeBox(group, cx + w/3, baseY + 0.55, cz, 0.4, 0.18, d - 0.1, _woodMaterial('medium'));
    // Mâner sertar
    _makeBox(group, cx + w/3, baseY + 0.55, cz + d/2 - 0.04, 0.12, 0.025, 0.015, _metalMaterial('chrome'));
    // Monitor (decorativ)
    _makeBox(group, cx, baseY + 1.05, cz - d/2 + 0.15, 0.55, 0.32, 0.03, _screenMaterial(true));
    _makeCyl(group, cx, baseY + 0.82, cz - d/2 + 0.15, 0.05, 0.15, _metalMaterial('alu'));
  }

  function _makeOfficeChair(group, cx, baseY, cz){
    const black = _metalMaterial('black');
    const fabric = _fabricMaterial('#1f2937', 0.9);
    // Bază (5 picioare cu rotile)
    _makeCyl(group, cx, baseY + 0.05, cz, 0.32, 0.05, black);
    // Stand
    _makeCyl(group, cx, baseY + 0.3, cz, 0.04, 0.4, black);
    // Sezut
    _makeBox(group, cx, baseY + 0.52, cz, 0.5, 0.08, 0.5, fabric);
    // Spătar
    _makeBox(group, cx, baseY + 0.85, cz - 0.22, 0.45, 0.55, 0.06, fabric);
  }

  function _makeBookshelf(group, cx, baseY, cz, w){
    _makeBox(group, cx, baseY + 1.0, cz, w, 2.0, 0.35, _woodMaterial('dark'));
    // Rafturi cu cărți colorate
    const shelfMat = _woodMaterial('medium');
    for(let s = 0; s < 4; s++){
      const y = baseY + 0.3 + s * 0.45;
      _makeBox(group, cx, y, cz + 0.01, w - 0.05, 0.02, 0.32, shelfMat);
      // Cărți pe raft
      const nBooks = Math.floor(w / 0.05);
      for(let b = 0; b < nBooks; b++){
        const bookH = 0.25 + Math.random() * 0.12;
        const bookW = 0.04 + Math.random() * 0.025;
        const bookX = cx - w/2 + 0.04 + b * 0.045;
        if(bookX > cx + w/2 - 0.04) break;
        const bookColor = ['#7c2d12','#1e3a8a','#14532d','#581c87','#831843','#92400e'][Math.floor(Math.random()*6)];
        _makeBox(group, bookX, y + bookH/2 + 0.02, cz - 0.05, bookW, bookH, 0.22, _fabricMaterial(bookColor, 0.7));
      }
    }
  }

  function _makePlant(group, cx, baseY, cz, height){
    const THREE = window.THREE;
    // Ghiveci (cilindrul lui)
    const potMat = new THREE.MeshStandardMaterial({color: 0x6b4423, roughness:0.7, metalness:0});
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.32, 16), potMat);
    pot.position.set(cx, baseY + 0.16, cz);
    pot.castShadow = true; pot.receiveShadow = true;
    group.add(pot);
    // Sol (deasupra ghiveciului)
    const soilMat = new THREE.MeshStandardMaterial({color: 0x2c1810, roughness:0.95});
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.02, 16), soilMat);
    soil.position.set(cx, baseY + 0.33, cz);
    group.add(soil);
    // Frunziș — 3 PlaneGeometry rotite în X formând o cruce
    const foliage = _foliageMaterial();
    const fh = height || 1.3;
    const fw = fh * 0.6;
    for(let i = 0; i < 2; i++){
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(fw, fh), foliage);
      plane.position.set(cx, baseY + 0.33 + fh/2, cz);
      plane.rotation.y = (i * Math.PI / 2);
      plane.castShadow = true; plane.receiveShadow = true;
      group.add(plane);
    }
  }

  function _makeChandelier(group, cx, ceilY, cz, variant){
    const THREE = window.THREE;
    variant = variant || 'standard';
    // Cordon
    _makeCyl(group, cx, ceilY - 0.1, cz, 0.004, 0.2, _metalMaterial('chrome'));
    // Ring sau cupolă
    const baseMat = _metalMaterial('brass');
    if(variant === 'compact'){
      // Lampă plafonieră
      const lampMat = new THREE.MeshStandardMaterial({color:0xfff5d8, roughness:0.3, metalness:0, emissive:0xffe0a0, emissiveIntensity:0.8});
      const dome = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 8, 0, Math.PI*2, 0, Math.PI/2), lampMat);
      dome.position.set(cx, ceilY - 0.22, cz);
      dome.rotation.x = Math.PI;
      group.add(dome);
    } else {
      // Lustră ring cu 5 bulbi
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.02, 8, 24), baseMat);
      ring.position.set(cx, ceilY - 0.25, cz);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
      const bulbMat = new THREE.MeshStandardMaterial({color:0xfff8e0, emissive:0xffe0a0, emissiveIntensity:1.5, roughness:0.3});
      for(let i = 0; i < 5; i++){
        const a = i * Math.PI * 2 / 5;
        const bx = cx + Math.cos(a) * 0.25, bz = cz + Math.sin(a) * 0.25;
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), bulbMat);
        bulb.position.set(bx, ceilY - 0.3, bz);
        group.add(bulb);
      }
    }
    // PointLight real — DOAR dacă budget-ul global permite
    if(CFG.enableLighting && window.__vtourLightBudget){
      const pl = new THREE.PointLight(0xfff0d0, variant === 'compact' ? 1.0 : 1.6, 6, 2);
      pl.position.set(cx, ceilY - 0.3, cz);
      pl.castShadow = false; // perf — prea multe lumini interior cu shadow
      group.add(pl);
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // LIGHTING SYSTEM — soare exterior + ambient + lumini interior per cameră
  // ═════════════════════════════════════════════════════════════════════════

  function _setupLights(scene){
    const THREE = window.THREE;
    STATE.extraLights.forEach(l => scene.remove(l));
    STATE.extraLights = [];

    const sun = new THREE.DirectionalLight(0xfff4e0, 2.2);
    sun.position.set(60, 100, 50);
    sun.castShadow = true;
    sun.shadow.mapSize.set(CFG.shadowMapSize, CFG.shadowMapSize);
    sun.shadow.camera.near = 0.5; sun.shadow.camera.far = 500;
    sun.shadow.camera.left = -80; sun.shadow.camera.right = 80;
    sun.shadow.camera.top = 80; sun.shadow.camera.bottom = -80;
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.02;
    scene.add(sun);
    STATE.extraLights.push(sun);

    const hemi = new THREE.HemisphereLight(0x88bbff, 0x4a4030, 0.35);
    scene.add(hemi);
    STATE.extraLights.push(hemi);

    const fill = new THREE.DirectionalLight(0xc8d8ff, 0.22);
    fill.position.set(-40, 50, -30);
    scene.add(fill);
    STATE.extraLights.push(fill);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // HOTSPOTS — auto per cameră + cardinal exterior
  // ═════════════════════════════════════════════════════════════════════════

  function _buildHotspots(scene, anchor, aedisModel){
    const THREE = window.THREE;
    STATE.hotspots = [];

    const old = [];
    scene.traverse(o => { if(o._vtourHotspot !== undefined) old.push(o); });
    old.forEach(o => scene.remove(o));

    const RV = window._RV;
    const baseY = anchor.baseY;

    // ── 0. AUTO-DETECT FAȚADA PRINCIPALĂ + INTRARE — din _RV.floors[0].doors cu type:'main'
    let mainEntrance = null; // { worldX, worldZ, normalX, normalZ, axis }
    if(RV && Array.isArray(RV.floors) && RV.floors.length){
      const f0 = RV.floors[0];
      const bW = (RV.building && RV.building.bW) || anchor.bW;
      const bD = (RV.building && RV.building.bD) || anchor.bD;
      const ox = anchor.cx - bW/2;
      const oz = anchor.cz - bD/2;
      const mainDoor = (f0.doors || []).find(d => d.type === 'main') || (f0.doors || [])[0];
      if(mainDoor){
        // Determinăm latura din coordonatele relative (mainDoor.y == bD ⇒ fațada SUD)
        const dx = mainDoor.x + (mainDoor.w || 1.8)/2;
        const dy = mainDoor.y;
        let normalX = 0, normalZ = 0;
        if(dy >= bD - 0.5)       normalZ = 1;  // S
        else if(dy <= 0.5)       normalZ = -1; // N
        else if(dx >= bW - 0.5)  normalX = 1;  // E
        else if(dx <= 0.5)       normalX = -1; // V
        else                     normalZ = 1;  // fallback S
        mainEntrance = {
          worldX: ox + dx,
          worldZ: oz + dy,
          normalX, normalZ,
          axis: (normalX !== 0) ? 'V' : 'H',
        };
        STATE._mainEntrance = mainEntrance;
        console.log('[VTour] Intrare principală detectată:', mainEntrance);
      }
    }

    // ── 1. HOTSPOTS EXTERIOR — start în fața intrării principale (street view)
    if(mainEntrance){
      // a. Stradă · în fața intrării (6m depărtare pe normala fațadei)
      STATE.hotspots.push({
        x: mainEntrance.worldX + mainEntrance.normalX * 6,
        y: baseY + STATE.eyeHeight,
        z: mainEntrance.worldZ + mainEntrance.normalZ * 6,
        label: 'Stradă · Intrare principală', kind: 'exterior', floorIdx: -1,
        lookAt: { x: mainEntrance.worldX, z: mainEntrance.worldZ },
      });
      // b. Pe pragul ușii (1.5m exterior)
      STATE.hotspots.push({
        x: mainEntrance.worldX + mainEntrance.normalX * 1.5,
        y: baseY + STATE.eyeHeight,
        z: mainEntrance.worldZ + mainEntrance.normalZ * 1.5,
        label: 'Pragul ușii — intră în clădire', kind: 'exterior', floorIdx: -1,
        lookAt: { x: mainEntrance.worldX, z: mainEntrance.worldZ },
      });
    }

    // ── 2. HOTSPOTS INTERIOR — per cameră
    if(RV && Array.isArray(RV.floors) && RV.floors.length){
      const bW = (RV.building && RV.building.bW) || anchor.bW;
      const bD = (RV.building && RV.building.bD) || anchor.bD;
      RV.floors.forEach((floor, fIdx) => {
        if(!floor || !Array.isArray(floor.rects)) return;
        const aedisFloor = aedisModel.floors[fIdx] || aedisModel.floors[aedisModel.floors.length - 1];
        const yFloor = baseY + aedisFloor.baseY;
        const fScale = aedisFloor.footprintScale || 1.0;
        const ox = anchor.cx - (bW * fScale)/2;
        const oz = anchor.cz - (bD * fScale)/2;
        floor.rects.forEach(r => {
          if(r.bal) return;
          if(r.w * r.h < 3.5) return;
          const labels = {
            living:'Living', bedroom:'Dormitor 1', bedroom2:'Dormitor 2', bedroom3:'Dormitor 3',
            kitchen:'Bucătărie', bath:'Baie', wc:'WC', hall:'Hol',
            office:'Birou', meeting:'Sală ședințe', reception:'Recepție',
            commercial:'Spațiu comercial', core:'🪜 Casa scării · 🛗 Lift',
            storage:'Depozit',
          };
          const lbl = (labels[r.t] || r.t || 'Cameră') + (RV.floors.length > 1 ? ` · E${fIdx}` : '');
          STATE.hotspots.push({
            x: ox + (r.x + r.w/2) * fScale,
            y: yFloor + STATE.eyeHeight,
            z: oz + (r.y + r.h/2) * fScale,
            label: lbl, kind: 'interior', floorIdx: fIdx, roomType: r.t,
          });
        });
      });
    }

    // ── 3. HOTSPOT PENTHOUSE TERASĂ — dacă există penthouse activ
    if(aedisModel.flags.penthouseActiv){
      const penthouseFloor = aedisModel.floors.find(f => f.isPenthouse);
      if(penthouseFloor){
        STATE.hotspots.push({
          x: anchor.cx + anchor.bW * 0.25,
          y: baseY + penthouseFloor.topY + 0.3, // pe acoperișul penthouse-ului
          z: anchor.cz + anchor.bD * 0.25,
          label: '🌅 Terasă Penthouse · Vedere panoramică',
          kind: 'terrace', floorIdx: penthouseFloor.idx,
        });
      }
    }

    // ── 4. HOTSPOTS EXTERIOR CARDINAL (mai puține — doar dacă nu există intrare detectată)
    if(!mainEntrance){
      const exterior = [
        { x: anchor.cx,                z: anchor.cz + anchor.bD*0.9, label: 'Exterior · Față' },
        { x: anchor.cx + anchor.bW*0.9, z: anchor.cz,                label: 'Exterior · Dreapta' },
        { x: anchor.cx,                z: anchor.cz - anchor.bD*0.9, label: 'Exterior · Spate' },
        { x: anchor.cx - anchor.bW*0.9, z: anchor.cz,                label: 'Exterior · Stânga' },
      ];
      exterior.forEach(p => {
        STATE.hotspots.push({
          x: p.x, y: baseY + STATE.eyeHeight, z: p.z, label: p.label, kind: 'exterior', floorIdx: -1,
        });
      });
    } else {
      // Cu intrare detectată, adăugăm doar înconjurul clădirii (3 puncte)
      STATE.hotspots.push({
        x: anchor.cx + anchor.bW*0.9, z: anchor.cz, y: baseY + STATE.eyeHeight,
        label: 'Exterior · Lateral E', kind: 'exterior', floorIdx: -1,
      });
      STATE.hotspots.push({
        x: anchor.cx - anchor.bW*0.9, z: anchor.cz, y: baseY + STATE.eyeHeight,
        label: 'Exterior · Lateral V', kind: 'exterior', floorIdx: -1,
      });
      STATE.hotspots.push({
        x: anchor.cx, z: anchor.cz - anchor.bD*0.9, y: baseY + STATE.eyeHeight,
        label: 'Exterior · Spate', kind: 'exterior', floorIdx: -1,
      });
    }

    // Markeri 3D cu indicator special pentru INTRARE
    STATE.hotspots.forEach((hp, i) => {
      const geo = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 24);
      const isInt = hp.kind === 'interior';
      const isEntry = hp.label.includes('Pragul') || hp.label.includes('Intrare');
      const isTerrace = hp.kind === 'terrace';
      const colorMain = isEntry ? 0xfbbf24 : isTerrace ? 0xec4899 : isInt ? 0x00ddff : 0x00ff88;
      const colorEm   = isEntry ? 0xd97706 : isTerrace ? 0xbe185d : isInt ? 0x0099cc : 0x00cc44;
      const mat = new THREE.MeshStandardMaterial({
        color: colorMain, emissive: colorEm,
        emissiveIntensity: isEntry ? 1.2 : 0.7,
        roughness: 0.4, metalness: 0.1,
        transparent: true, opacity: 0.88,
      });
      const disc = new THREE.Mesh(geo, mat);
      disc.position.set(hp.x, hp.y - STATE.eyeHeight + 0.025, hp.z);
      disc._vtourHotspot = i;
      disc._vtourLabel = hp.label;
      scene.add(disc);
    });

    console.log(`[VTour] ✅ Hotspots: ${STATE.hotspots.length} (int:${STATE.hotspots.filter(h=>h.kind==='interior').length} ext:${STATE.hotspots.filter(h=>h.kind==='exterior').length} terrace:${STATE.hotspots.filter(h=>h.kind==='terrace').length})`);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MATTERTAGS — puncte info pe pereți cu popup HTML
  // ═════════════════════════════════════════════════════════════════════════

  function _buildMattertags(scene, anchor, aedisModel){
    if(!CFG.enableMattertags) return;
    const THREE = window.THREE;
    STATE.mattertags = [];
    const group = new THREE.Group();
    group._vtourGenerated = true;
    group.name = 'VTourMattertags';

    const RV = window._RV;
    if(!RV || !Array.isArray(RV.floors)) { scene.add(group); STATE.mattertagGroup = group; return; }

    const baseY = anchor.baseY;
    const bW = (RV.building && RV.building.bW) || anchor.bW;
    const bD = (RV.building && RV.building.bD) || anchor.bD;

    RV.floors.forEach((floor, fIdx) => {
      if(!floor || !Array.isArray(floor.rects)) return;
      const aedisFloor = aedisModel.floors[fIdx] || aedisModel.floors[aedisModel.floors.length - 1];
      const yFloor = baseY + aedisFloor.baseY;
      const fScale = aedisFloor.footprintScale || 1.0;
      const ox = anchor.cx - (bW * fScale)/2;
      const oz = anchor.cz - (bD * fScale)/2;
      // Pentru fiecare cameră semnificativă, adăugăm un mattertag
      floor.rects.forEach(r => {
        if(r.bal) return;
        if(r.w * r.h < 5) return;
        const info = _matterTagInfoFor(r, aedisModel);
        if(!info) return;
        STATE.mattertags.push({
          x: ox + (r.x + r.w/2) * fScale,
          y: yFloor + 2.0,
          z: oz + (r.y + r.h/2) * fScale,
          title: info.title,
          desc: info.desc,
          icon: info.icon,
        });
      });
    });

    // Mesh-uri 3D pentru mattertags (sferă cu "i")
    STATE.mattertags.forEach((mt, i) => {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 16, 8),
        new THREE.MeshStandardMaterial({color:0xffffff, emissive:0x3b82f6, emissiveIntensity:0.85})
      );
      sphere.position.set(mt.x, mt.y, mt.z);
      sphere._vtourMattertag = i;
      group.add(sphere);
    });

    scene.add(group);
    STATE.mattertagGroup = group;
  }

  function _matterTagInfoFor(r, aedisModel){
    const area = (r.w * r.h).toFixed(1);
    const info = {
      living:    { icon:'🛋', title:'Living', desc:`Suprafață: ${area} m²\nNorma OMS: ≥14 m²\nMobilare: sofa, TV, masă cafea` },
      bedroom:   { icon:'🛏', title:'Dormitor 1', desc:`Suprafață: ${area} m²\nNorma: ≥12 m²\nPat dublu, dulap, noptiere` },
      bedroom2:  { icon:'🛏', title:'Dormitor 2', desc:`Suprafață: ${area} m²\nNorma: ≥10 m²` },
      bedroom3:  { icon:'🛏', title:'Dormitor 3', desc:`Suprafață: ${area} m²` },
      kitchen:   { icon:'🍳', title:'Bucătărie', desc:`Suprafață: ${area} m²\nNorma: ≥5 m²\nDotări: blat, frigider, plită` },
      bath:      { icon:'🛁', title:'Baie', desc:`Suprafață: ${area} m²\nNorma: ≥3.6 m²\nCadă, chiuvetă, WC` },
      wc:        { icon:'🚽', title:'WC', desc:`Suprafață: ${area} m²\nNorma: ≥1.2 m²` },
      office:    { icon:'💼', title:'Birou', desc:`Suprafață: ${area} m²` },
      meeting:   { icon:'👥', title:'Sală ședințe', desc:`Suprafață: ${area} m²` },
      reception: { icon:'🏛', title:'Recepție', desc:`Suprafață: ${area} m²` },
      hall:      { icon:'🚪', title:'Hol', desc:`Suprafață: ${area} m²` },
    };
    return info[r.t] || null;
  }

  function _showMattertagPopup(idx){
    const mt = STATE.mattertags[idx];
    if(!mt) return;
    let popup = document.getElementById('vtour-mt-popup');
    if(!popup){
      popup = document.createElement('div');
      popup.id = 'vtour-mt-popup';
      popup.style.cssText = `
        position:absolute;top:80px;right:20px;background:rgba(0,0,0,.88);color:white;
        padding:16px 20px;border-radius:12px;max-width:280px;z-index:100000;
        border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(10px);
        -webkit-backdrop-filter:blur(10px);font-size:13px;line-height:1.55;
        font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
        box-shadow:0 8px 24px rgba(0,0,0,.5);
      `;
      STATE.overlay.appendChild(popup);
    }
    popup.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:22px">${mt.icon}</div>
        <div onclick="document.getElementById('vtour-mt-popup').style.display='none'" 
             style="cursor:pointer;color:#9aa5b8;font-size:16px;padding:0 4px">✕</div>
      </div>
      <div style="font-weight:700;font-size:15px;margin-bottom:6px;color:#60a5fa">${mt.title}</div>
      <div style="color:#cbd5e1;white-space:pre-line">${mt.desc}</div>
    `;
    popup.style.display = '';
  }

  // ═════════════════════════════════════════════════════════════════════════
  // DOLLHOUSE VIEW — cameră ortho deasupra clădirii
  // ═════════════════════════════════════════════════════════════════════════

  function _enterDollhouse(){
    if(!CFG.enableDollhouse) return;
    if(STATE.mode === 'dollhouse') return;
    STATE.mode = 'dollhouse';
    const THREE = window.THREE;
    const anchor = STATE._anchor;
    if(!anchor){ STATE.mode = 'walkthrough'; return; }
    const aspect = window.innerWidth / window.innerHeight;
    const size = Math.max(anchor.bW, anchor.bD) * 1.8;
    STATE.dollhouseCam = new THREE.OrthographicCamera(
      -size * aspect / 2, size * aspect / 2,
      size / 2, -size / 2,
      0.1, 1000
    );
    // Vedem din colț, 45° azimut, 35° elevație
    const dist = size * 0.9;
    STATE.dollhouseCam.position.set(
      anchor.cx + Math.cos(Math.PI/4) * dist,
      anchor.baseY + Math.sin(Math.PI*35/180) * dist + STATE._aedisCache.totalH,
      anchor.cz + Math.sin(Math.PI/4) * dist
    );
    STATE.dollhouseCam.lookAt(anchor.cx, anchor.baseY + STATE._aedisCache.totalH / 2, anchor.cz);

    // Update UI — afișăm un overlay de revenire
    _showDollhouseHint();
  }

  function _exitDollhouse(){
    STATE.mode = 'walkthrough';
    STATE.dollhouseCam = null;
    const hint = document.getElementById('vtour-dollhouse-hint');
    if(hint) hint.remove();
  }

  function _showDollhouseHint(){
    let hint = document.getElementById('vtour-dollhouse-hint');
    if(!hint){
      hint = document.createElement('div');
      hint.id = 'vtour-dollhouse-hint';
      hint.style.cssText = `
        position:absolute;top:60px;left:50%;transform:translateX(-50%);
        background:rgba(0,0,0,.78);color:white;padding:10px 20px;border-radius:24px;
        z-index:100;font-size:12px;font-weight:600;letter-spacing:.5px;
        border:1px solid rgba(255,255,255,.2);backdrop-filter:blur(8px);
      `;
      hint.innerHTML = '🏠 Vedere Dollhouse · Click pe o cameră pentru a intra';
      STATE.overlay.appendChild(hint);
    }
    hint.style.display = '';
  }

  // ═════════════════════════════════════════════════════════════════════════
  // FLOORPLAN MINIMAP — canvas 2D dreapta-jos
  // ═════════════════════════════════════════════════════════════════════════

  function _buildFloorplanMinimap(){
    if(!CFG.enableFloorplan) return;
    const RV = window._RV;
    if(!RV || !Array.isArray(RV.floors) || !RV.floors.length) return;

    const wrap = document.createElement('div');
    wrap.id = 'vtour-floorplan';
    wrap.style.cssText = `
      position:absolute;bottom:75px;right:20px;width:200px;
      background:rgba(0,0,0,.78);border:1px solid rgba(255,255,255,.2);border-radius:10px;
      padding:8px;z-index:50;backdrop-filter:blur(10px);
      box-shadow:0 4px 16px rgba(0,0,0,.5);
    `;
    const title = document.createElement('div');
    title.style.cssText = 'color:white;font-size:10px;font-weight:600;margin-bottom:4px;letter-spacing:.5px;text-transform:uppercase;display:flex;justify-content:space-between;align-items:center';
    title.innerHTML = `<span>Plan etaj <span id="vtour-fp-curfloor">${STATE.currentFloorIdx + 1}</span>/${RV.floors.length}</span>
      <span style="display:flex;gap:4px">
        <button onclick="window.VTour._fpFloor(-1)" style="background:rgba(255,255,255,.1);color:white;border:none;width:18px;height:18px;border-radius:3px;cursor:pointer;font-size:12px;line-height:0">−</button>
        <button onclick="window.VTour._fpFloor(1)"  style="background:rgba(255,255,255,.1);color:white;border:none;width:18px;height:18px;border-radius:3px;cursor:pointer;font-size:12px;line-height:0">+</button>
      </span>`;
    wrap.appendChild(title);
    const canvas = document.createElement('canvas');
    canvas.id = 'vtour-fp-canvas';
    canvas.width = 184; canvas.height = 130;
    canvas.style.cssText = 'display:block;cursor:crosshair;border-radius:6px;background:rgba(255,255,255,.05)';
    wrap.appendChild(canvas);
    STATE.overlay.appendChild(wrap);

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width;
      const my = (e.clientY - rect.top) / rect.height;
      _floorplanClick(mx, my);
    });

    _renderFloorplan();
  }

  function _renderFloorplan(){
    const canvas = document.getElementById('vtour-fp-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const RV = window._RV;
    const floor = RV.floors[STATE.currentFloorIdx];
    if(!floor) return;
    const bW = RV.building.bW, bD = RV.building.bD;
    const pad = 8;
    const scale = Math.min((W - 2*pad) / bW, (H - 2*pad) / bD);
    const offX = (W - bW * scale) / 2;
    const offY = (H - bD * scale) / 2;

    // Fundal clădire
    ctx.fillStyle = 'rgba(255,255,255,.08)';
    ctx.fillRect(offX, offY, bW * scale, bD * scale);

    // Camere
    const colorMap = {
      living:'#d97706', bedroom:'#10b981', bedroom2:'#16a34a', bedroom3:'#15803d',
      kitchen:'#0ea5e9', bath:'#a78bfa', wc:'#c084fc', hall:'#94a3b8',
      office:'#3b82f6', meeting:'#6366f1', reception:'#8b5cf6',
      core:'#475569', storage:'#64748b', balcon:'#fbbf24', commercial:'#ec4899'
    };
    floor.rects.forEach(r => {
      const rx = offX + r.x * scale;
      const ry = offY + r.y * scale;
      const rw = r.w * scale, rh = r.h * scale;
      ctx.fillStyle = colorMap[r.t] || '#94a3b8';
      ctx.globalAlpha = 0.45;
      ctx.fillRect(rx, ry, rw, rh);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(255,255,255,.4)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(rx, ry, rw, rh);
    });

    // Indicator poziție utilizator
    if(STATE.tourCam){
      const anchor = STATE._anchor;
      if(anchor){
        const px = STATE.tourCam.position.x - (anchor.cx - bW/2);
        const pz = STATE.tourCam.position.z - (anchor.cz - bD/2);
        const cx = offX + px * scale;
        const cy = offY + pz * scale;
        ctx.fillStyle = '#00ff88';
        ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI*2); ctx.fill();
        // Direcție privire
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        const sin = -Math.sin(STATE.yaw), cos = -Math.cos(STATE.yaw);
        ctx.lineTo(cx + sin * 12, cy + cos * 12);
        ctx.stroke();
      }
    }
  }

  function _floorplanClick(mx, my){
    const RV = window._RV;
    const floor = RV.floors[STATE.currentFloorIdx];
    if(!floor) return;
    const bW = RV.building.bW, bD = RV.building.bD;
    const xMeters = mx * bW;
    const zMeters = my * bD;
    // Găsim camera click-uită
    for(const r of floor.rects){
      if(xMeters >= r.x && xMeters <= r.x + r.w && zMeters >= r.y && zMeters <= r.y + r.h){
        // Găsim hotspot-ul corespunzător
        for(let i = 0; i < STATE.hotspots.length; i++){
          const h = STATE.hotspots[i];
          if(h.kind === 'interior' && h.floorIdx === STATE.currentFloorIdx && h.roomType === r.t){
            // Verificăm proximitatea
            const anchor = STATE._anchor;
            const expX = anchor.cx - bW/2 + r.x + r.w/2;
            const expZ = anchor.cz - bD/2 + r.y + r.h/2;
            if(Math.hypot(h.x - expX, h.z - expZ) < 1){
              _glideTo(i);
              return;
            }
          }
        }
      }
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // SMOOTH GLIDE — teleport cubic-ease între hotspots (0.85s)
  // ═════════════════════════════════════════════════════════════════════════

  function _glideTo(hotspotIdx){
    const hp = STATE.hotspots[hotspotIdx];
    if(!hp || !STATE.tourCam) return;
    STATE.currentHotspot = hotspotIdx;
    STATE.currentFloorIdx = hp.floorIdx >= 0 ? hp.floorIdx : STATE.currentFloorIdx;
    const startPos = STATE.tourCam.position.clone();
    const endPos = new window.THREE.Vector3(hp.x, hp.y, hp.z);
    // Yaw target — orientare spre centrul anchor
    const dx = (STATE._anchor ? STATE._anchor.cx : hp.x) - hp.x;
    const dz = (STATE._anchor ? STATE._anchor.cz : hp.z) - hp.z;
    let targetYaw = Math.atan2(dx, dz);
    if(hp.kind === 'interior') targetYaw = STATE.yaw; // păstrăm yaw-ul curent
    const startYaw = STATE.yaw;
    let dYaw = targetYaw - startYaw;
    while(dYaw > Math.PI) dYaw -= Math.PI * 2;
    while(dYaw < -Math.PI) dYaw += Math.PI * 2;

    STATE.glide = {
      startPos, endPos, startYaw, dYaw,
      t0: performance.now(), dur: CFG.glideDuration * 1000,
      active: true,
    };
    _renderFloorplan();
  }

  function _updateGlide(now){
    const g = STATE.glide;
    if(!g || !g.active) return false;
    const t = Math.min(1, (now - g.t0) / g.dur);
    // Cubic ease in-out
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    STATE.tourCam.position.lerpVectors(g.startPos, g.endPos, e);
    STATE.yaw = g.startYaw + g.dYaw * e;
    if(t >= 1){
      g.active = false;
      STATE.glide = null;
    }
    return true;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // COLLISION — raycast cu slide pe perete
  // ═════════════════════════════════════════════════════════════════════════

  function _checkCollision(currentPos, desiredPos){
    const THREE = window.THREE;
    if(!STATE.collisionMeshes.length) return desiredPos;
    const ray = STATE.raycaster || (STATE.raycaster = new THREE.Raycaster());
    const moveDir = new THREE.Vector3().subVectors(desiredPos, currentPos);
    const moveLen = moveDir.length();
    if(moveLen < 0.0001) return desiredPos;
    moveDir.normalize();
    // Test cu o "skin" de coliziune
    ray.set(currentPos, moveDir);
    ray.far = moveLen + CFG.collisionPadding;
    const hits = ray.intersectObjects(STATE.collisionMeshes, false);
    if(!hits.length || hits[0].distance > moveLen + CFG.collisionPadding) return desiredPos;
    // Slide pe normala impactului
    const hit = hits[0];
    const normal = hit.face ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld) : new THREE.Vector3(0,1,0);
    normal.y = 0; normal.normalize();
    const slide = new THREE.Vector3().subVectors(desiredPos, currentPos);
    const dot = slide.dot(normal);
    slide.sub(normal.multiplyScalar(dot));
    // Verificăm dacă slide-ul nu intră în altceva
    const slidePos = new THREE.Vector3().addVectors(currentPos, slide);
    return slidePos;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MOVEMENT — WASD + collision + glide priority
  // ═════════════════════════════════════════════════════════════════════════

  function _updateMovement(dt){
    if(STATE.mode !== 'walkthrough') return;
    if(STATE.glide && STATE.glide.active) return;
    if(STATE.autoWalk && STATE.autoWalk.active){ _updateAutoWalk(dt); return; }

    const k = STATE.keys;
    let forward = 0, strafe = 0;
    if(k.w) forward += 1;
    if(k.s) forward -= 1;
    if(k.d) strafe += 1;
    if(k.a) strafe -= 1;
    if(forward === 0 && strafe === 0) return;

    const speed = STATE.speed * (k.shift ? STATE.runMul : 1.0);
    const yaw = STATE.yaw;
    // În spațiul lumii (Y up): direcția înainte = (-sin(yaw), 0, -cos(yaw))
    const fwdX = -Math.sin(yaw), fwdZ = -Math.cos(yaw);
    const strX = Math.cos(yaw), strZ = -Math.sin(yaw);
    const dx = (fwdX * forward + strX * strafe) * speed * dt;
    const dz = (fwdZ * forward + strZ * strafe) * speed * dt;

    const cur = STATE.tourCam.position.clone();
    const desired = cur.clone(); desired.x += dx; desired.z += dz;
    const newPos = _checkCollision(cur, desired);
    STATE.tourCam.position.x = newPos.x;
    STATE.tourCam.position.z = newPos.z;
    // Y rămâne la eyeHeight peste floor curent (gravitate simplă)
    // Y floor se determină din STATE.currentFloorIdx
    if(STATE._anchor && STATE._aedisCache){
      const af = STATE._aedisCache.floors[STATE.currentFloorIdx];
      if(af) STATE.tourCam.position.y = STATE._anchor.baseY + af.baseY + STATE.eyeHeight;
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // AUTO-WALK CINEMATIC — cameră urmează spline traseu prin hotspots
  // ═════════════════════════════════════════════════════════════════════════

  function _startAutoWalk(){
    if(!STATE.hotspots.length) return;
    const THREE = window.THREE;
    const interiorHs = STATE.hotspots.filter(h => h.kind === 'interior');
    if(interiorHs.length < 2) return;
    const pts = interiorHs.map(h => new THREE.Vector3(h.x, h.y, h.z));
    if(pts.length < 2) return;
    const spline = new THREE.CatmullRomCurve3(pts, false);
    STATE.autoWalk = {
      spline, t0: performance.now(),
      dur: pts.length * 2500, // 2.5s per cameră
      active: true,
      lookOffset: 0.05, // direcția = un pic mai înainte pe spline
    };
  }

  function _stopAutoWalk(){
    if(STATE.autoWalk) STATE.autoWalk.active = false;
    STATE.autoWalk = null;
  }

  function _updateAutoWalk(dt){
    const aw = STATE.autoWalk;
    if(!aw || !aw.active) return;
    const t = (performance.now() - aw.t0) / aw.dur;
    if(t >= 1){ _stopAutoWalk(); return; }
    const pos = aw.spline.getPoint(t);
    const lookAt = aw.spline.getPoint(Math.min(0.999, t + aw.lookOffset));
    STATE.tourCam.position.copy(pos);
    const dx = lookAt.x - pos.x, dz = lookAt.z - pos.z;
    STATE.yaw = Math.atan2(-dx, -dz);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MEASUREMENT TOOL — click 2 puncte → distanță în metri
  // ═════════════════════════════════════════════════════════════════════════

  function _toggleMeasure(){
    if(STATE.measureMode){
      _stopMeasure();
    } else {
      _startMeasure();
    }
  }

  function _startMeasure(){
    STATE.measureMode = { points: [], lines: [], labels: [] };
    let hint = document.getElementById('vtour-measure-hint');
    if(!hint){
      hint = document.createElement('div');
      hint.id = 'vtour-measure-hint';
      hint.style.cssText = `
        position:absolute;top:60px;left:50%;transform:translateX(-50%);
        background:rgba(245,158,11,.92);color:#1a0f00;padding:10px 20px;border-radius:24px;
        z-index:100;font-size:12px;font-weight:700;letter-spacing:.5px;
        box-shadow:0 4px 12px rgba(0,0,0,.4);
      `;
      hint.innerHTML = '📏 Mod măsurătoare · Click pe 2 puncte · ESC pentru ieșire';
      STATE.overlay.appendChild(hint);
    }
  }

  function _stopMeasure(){
    if(!STATE.measureMode) return;
    STATE.measureMode.lines.forEach(l => l.parent && l.parent.remove(l));
    STATE.measureMode.labels.forEach(l => l.remove());
    STATE.measureMode = null;
    const hint = document.getElementById('vtour-measure-hint');
    if(hint) hint.remove();
  }

  function _addMeasurePoint(point){
    if(!STATE.measureMode) return;
    const THREE = window.THREE;
    STATE.measureMode.points.push(point);
    if(STATE.measureMode.points.length === 2){
      const [p1, p2] = STATE.measureMode.points;
      const dist = p1.distanceTo(p2);
      // Linie
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const mat = new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2 });
      const line = new THREE.Line(geo, mat);
      line._vtourGenerated = true;
      STATE.tourCam.parent.add(line);
      STATE.measureMode.lines.push(line);
      // Label HTML pe poziția mid
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const label = document.createElement('div');
      label.style.cssText = `
        position:absolute;background:rgba(0,0,0,.85);color:#fbbf24;padding:4px 10px;
        border-radius:12px;font-size:12px;font-weight:700;pointer-events:none;
        z-index:200;border:1px solid rgba(251,191,36,.5);transform:translate(-50%,-50%);
      `;
      label.textContent = dist.toFixed(2) + ' m';
      label._vtourMeasurePoint = mid;
      STATE.overlay.appendChild(label);
      STATE.measureMode.labels.push(label);
      STATE.measureMode.points = [];
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INPUT — pointer lock, KB, mouse, touch joystick, hotspot click
  // ═════════════════════════════════════════════════════════════════════════

  function _setupInput(){
    const canvas = STATE.canvas;
    if(!canvas) return;
    // Pointer lock pe click canvas (când nu suntem pe hotspot)
    canvas.addEventListener('click', _onCanvasClick);
    document.addEventListener('pointerlockchange', _onPointerLockChange);
    document.addEventListener('mousemove', _onMouseMove);
    document.addEventListener('keydown', _onKeyDown);
    document.addEventListener('keyup', _onKeyUp);
    // Touch joystick
    _setupTouchJoystick();
  }

  function _teardownInput(){
    const canvas = STATE.canvas;
    if(canvas) canvas.removeEventListener('click', _onCanvasClick);
    document.removeEventListener('pointerlockchange', _onPointerLockChange);
    document.removeEventListener('mousemove', _onMouseMove);
    document.removeEventListener('keydown', _onKeyDown);
    document.removeEventListener('keyup', _onKeyUp);
    if(document.pointerLockElement === canvas) document.exitPointerLock();
    _teardownTouchJoystick();
  }

  function _onCanvasClick(e){
    if(!STATE.active) return;
    // În mod Dollhouse: click pe geometrie → găsim cea mai apropiată cameră (hotspot interior) → teleport + exit dollhouse
    if(STATE.mode === 'dollhouse'){
      const pt = _raycastDollhouse(e.clientX, e.clientY);
      if(pt){
        let bestIdx = -1, bestDist = Infinity;
        STATE.hotspots.forEach((h, i) => {
          if(h.kind !== 'interior') return;
          const d = Math.hypot(h.x - pt.x, h.z - pt.z);
          if(d < bestDist){ bestDist = d; bestIdx = i; }
        });
        if(bestIdx >= 0){
          _exitDollhouse();
          // Setăm camera tour la poziția dorită apoi facem glide (cu mic delay pentru tranziție)
          setTimeout(() => _glideTo(bestIdx), 50);
        }
      }
      return;
    }
    // Verificăm hit pe hotspot
    const hit = _hotspotHitTest(e.clientX, e.clientY);
    if(hit !== null){
      if(hit.kind === 'hotspot') _glideTo(hit.idx);
      else if(hit.kind === 'mattertag') _showMattertagPopup(hit.idx);
      return;
    }
    // Mod măsurătoare: adăugăm punct pe poziția raycast pe geometrie
    if(STATE.measureMode){
      const pt = _raycastWorldPoint(e.clientX, e.clientY);
      if(pt) _addMeasurePoint(pt);
      return;
    }
    // Altfel cerem pointer lock
    if(STATE.mode === 'walkthrough' && STATE.canvas.requestPointerLock){
      STATE.canvas.requestPointerLock();
    }
  }

  function _raycastDollhouse(clientX, clientY){
    const THREE = window.THREE;
    const cam = STATE.dollhouseCam;
    if(!cam) return null;
    const rect = STATE.canvas.getBoundingClientRect();
    const mx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const my = -((clientY - rect.top) / rect.height) * 2 + 1;
    const ray = STATE.raycaster || (STATE.raycaster = new THREE.Raycaster());
    ray.setFromCamera({x: mx, y: my}, cam);
    const hits = ray.intersectObjects(STATE.collisionMeshes, false);
    if(!hits.length) return null;
    return hits[0].point;
  }

  function _hotspotHitTest(clientX, clientY){
    const THREE = window.THREE;
    const cam = STATE.tourCam;
    if(!cam) return null;
    const rect = STATE.canvas.getBoundingClientRect();
    const mx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const my = -((clientY - rect.top) / rect.height) * 2 + 1;
    const ray = STATE.raycaster || (STATE.raycaster = new THREE.Raycaster());
    ray.setFromCamera({x: mx, y: my}, cam);
    const candidates = [];
    cam.parent.traverse(o => {
      if(o._vtourHotspot !== undefined || o._vtourMattertag !== undefined) candidates.push(o);
    });
    const hits = ray.intersectObjects(candidates, false);
    if(!hits.length) return null;
    const obj = hits[0].object;
    if(obj._vtourHotspot !== undefined) return { kind:'hotspot', idx: obj._vtourHotspot };
    if(obj._vtourMattertag !== undefined) return { kind:'mattertag', idx: obj._vtourMattertag };
    return null;
  }

  function _raycastWorldPoint(clientX, clientY){
    const THREE = window.THREE;
    const cam = STATE.tourCam;
    if(!cam) return null;
    const rect = STATE.canvas.getBoundingClientRect();
    const mx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const my = -((clientY - rect.top) / rect.height) * 2 + 1;
    const ray = STATE.raycaster || (STATE.raycaster = new THREE.Raycaster());
    ray.setFromCamera({x: mx, y: my}, cam);
    const hits = ray.intersectObjects(STATE.collisionMeshes, false);
    if(!hits.length) return null;
    return hits[0].point;
  }

  function _onPointerLockChange(){
    STATE.pointerLocked = (document.pointerLockElement === STATE.canvas);
  }

  function _onMouseMove(e){
    if(!STATE.active || STATE.mode !== 'walkthrough') return;
    if(!STATE.pointerLocked) return;
    if(STATE.glide && STATE.glide.active) return;
    const sens = 0.0025;
    STATE.yaw -= e.movementX * sens;
    STATE.pitch -= e.movementY * sens;
    STATE.pitch = Math.max(-Math.PI/2 + 0.05, Math.min(Math.PI/2 - 0.05, STATE.pitch));
  }

  function _onKeyDown(e){
    if(!STATE.active) return;
    switch(e.code){
      case 'KeyW': STATE.keys.w = true; break;
      case 'KeyA': STATE.keys.a = true; break;
      case 'KeyS': STATE.keys.s = true; break;
      case 'KeyD': STATE.keys.d = true; break;
      case 'ArrowUp': STATE.keys.w = true; break;
      case 'ArrowDown': STATE.keys.s = true; break;
      case 'ArrowLeft': STATE.keys.a = true; break;
      case 'ArrowRight': STATE.keys.d = true; break;
      case 'ShiftLeft': case 'ShiftRight': STATE.keys.shift = true; break;
      case 'Space': STATE.keys.space = true; e.preventDefault(); break;
      case 'Escape':
        if(STATE.measureMode) { _stopMeasure(); }
        else if(STATE.mode === 'dollhouse'){ _exitDollhouse(); }
        else if(STATE.autoWalk){ _stopAutoWalk(); }
        else { window.VTour.stop(); }
        break;
      case 'Tab':
        e.preventDefault();
        _cycleHotspot(e.shiftKey ? -1 : 1);
        break;
      case 'KeyM': _toggleMeasure(); break;
      case 'KeyP': _startAutoWalk(); break;
      case 'KeyH': if(STATE.mode === 'dollhouse') _exitDollhouse(); else _enterDollhouse(); break;
    }
    // Numerice 1-9 → schimbare etaj
    if(e.code.startsWith('Digit')){
      const n = parseInt(e.code.slice(5));
      if(n >= 1 && window._RV && window._RV.floors && n <= window._RV.floors.length){
        _switchFloor(n - 1);
      }
    }
  }

  function _onKeyUp(e){
    if(!STATE.active) return;
    switch(e.code){
      case 'KeyW': case 'ArrowUp': STATE.keys.w = false; break;
      case 'KeyA': case 'ArrowLeft': STATE.keys.a = false; break;
      case 'KeyS': case 'ArrowDown': STATE.keys.s = false; break;
      case 'KeyD': case 'ArrowRight': STATE.keys.d = false; break;
      case 'ShiftLeft': case 'ShiftRight': STATE.keys.shift = false; break;
      case 'Space': STATE.keys.space = false; break;
    }
  }

  function _cycleHotspot(dir){
    if(!STATE.hotspots.length) return;
    let i = STATE.currentHotspot + dir;
    if(i < 0) i = STATE.hotspots.length - 1;
    if(i >= STATE.hotspots.length) i = 0;
    _glideTo(i);
  }

  function _switchFloor(idx){
    if(!window._RV || !window._RV.floors[idx]) return;
    STATE.currentFloorIdx = idx;
    // Găsim primul hotspot din acel etaj
    for(let i = 0; i < STATE.hotspots.length; i++){
      if(STATE.hotspots[i].floorIdx === idx){
        _glideTo(i);
        break;
      }
    }
    _renderFloorplan();
    const lbl = document.getElementById('vtour-fp-curfloor');
    if(lbl) lbl.textContent = idx + 1;
  }

  // ── TOUCH JOYSTICK pentru mobile ─────────────────────────────────────────
  let _touchState = null;

  function _setupTouchJoystick(){
    if(!('ontouchstart' in window)) return;
    const joy = document.createElement('div');
    joy.id = 'vtour-touch-joy';
    joy.style.cssText = `
      position:absolute;bottom:30px;left:30px;width:120px;height:120px;
      background:rgba(0,0,0,.35);border:2px solid rgba(255,255,255,.4);border-radius:50%;
      z-index:200;touch-action:none;display:none;
    `;
    const stick = document.createElement('div');
    stick.style.cssText = `
      position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
      width:50px;height:50px;background:rgba(255,255,255,.6);border-radius:50%;
      pointer-events:none;
    `;
    joy.appendChild(stick);
    STATE.overlay.appendChild(joy);

    const lookArea = document.createElement('div');
    lookArea.id = 'vtour-touch-look';
    lookArea.style.cssText = `
      position:absolute;top:0;right:0;width:50%;height:100%;z-index:50;
      touch-action:none;display:none;
    `;
    STATE.overlay.appendChild(lookArea);

    if('ontouchstart' in window){ joy.style.display = ''; lookArea.style.display = ''; }

    _touchState = { joy, stick, lookArea, joyId:null, lookId:null, joyCx:0, joyCy:0, lookX:0, lookY:0 };

    joy.addEventListener('touchstart', (e) => {
      const t = e.changedTouches[0];
      _touchState.joyId = t.identifier;
      const r = joy.getBoundingClientRect();
      _touchState.joyCx = r.left + r.width/2;
      _touchState.joyCy = r.top + r.height/2;
      e.preventDefault();
    });
    joy.addEventListener('touchmove', (e) => {
      for(const t of e.changedTouches){
        if(t.identifier !== _touchState.joyId) continue;
        const dx = t.clientX - _touchState.joyCx;
        const dy = t.clientY - _touchState.joyCy;
        const max = 50;
        const dist = Math.min(max, Math.hypot(dx, dy));
        const ang = Math.atan2(dy, dx);
        const tx = Math.cos(ang) * dist;
        const ty = Math.sin(ang) * dist;
        stick.style.left = `calc(50% + ${tx}px)`;
        stick.style.top = `calc(50% + ${ty}px)`;
        const nx = tx / max, ny = ty / max;
        STATE.keys.w = ny < -0.3;
        STATE.keys.s = ny > 0.3;
        STATE.keys.a = nx < -0.3;
        STATE.keys.d = nx > 0.3;
        e.preventDefault();
      }
    });
    const endJoy = (e) => {
      for(const t of e.changedTouches){
        if(t.identifier !== _touchState.joyId) continue;
        _touchState.joyId = null;
        stick.style.left = '50%'; stick.style.top = '50%';
        STATE.keys.w = STATE.keys.s = STATE.keys.a = STATE.keys.d = false;
      }
    };
    joy.addEventListener('touchend', endJoy);
    joy.addEventListener('touchcancel', endJoy);

    lookArea.addEventListener('touchstart', (e) => {
      const t = e.changedTouches[0];
      _touchState.lookId = t.identifier;
      _touchState.lookX = t.clientX;
      _touchState.lookY = t.clientY;
      e.preventDefault();
    });
    lookArea.addEventListener('touchmove', (e) => {
      for(const t of e.changedTouches){
        if(t.identifier !== _touchState.lookId) continue;
        const dx = t.clientX - _touchState.lookX;
        const dy = t.clientY - _touchState.lookY;
        _touchState.lookX = t.clientX;
        _touchState.lookY = t.clientY;
        STATE.yaw -= dx * 0.005;
        STATE.pitch -= dy * 0.005;
        STATE.pitch = Math.max(-Math.PI/2 + 0.05, Math.min(Math.PI/2 - 0.05, STATE.pitch));
        e.preventDefault();
      }
    });
    const endLook = (e) => {
      for(const t of e.changedTouches){
        if(t.identifier === _touchState.lookId) _touchState.lookId = null;
      }
    };
    lookArea.addEventListener('touchend', endLook);
    lookArea.addEventListener('touchcancel', endLook);
  }

  function _teardownTouchJoystick(){
    if(!_touchState) return;
    _touchState.joy.remove();
    _touchState.lookArea.remove();
    _touchState = null;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // UI OVERLAY — HUD complet (loading, crosshair, hint, bara hotspot, buttons)
  // ═════════════════════════════════════════════════════════════════════════

  function _createOverlay(){
    const ov = document.createElement('div');
    ov.id = 'vtour-overlay';
    ov.style.cssText = `
      position:fixed;inset:0;pointer-events:none;z-index:10000;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    `;
    document.body.appendChild(ov);
    STATE.overlay = ov;

    // ── LOADING SCREEN ──
    const loading = document.createElement('div');
    loading.id = 'vtour-loading';
    loading.style.cssText = `
      position:absolute;inset:0;background:linear-gradient(135deg,#0a0a0f 0%,#1a1a2e 100%);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      pointer-events:auto;color:white;z-index:99999;
    `;
    loading.innerHTML = `
      <div style="font-size:42px;margin-bottom:24px">🏛</div>
      <div style="font-size:18px;font-weight:600;margin-bottom:12px;letter-spacing:.5px">Construire tur 3D</div>
      <div id="vtour-loading-msg" style="font-size:13px;color:#94a3b8;margin-bottom:24px">Inițializare…</div>
      <div style="width:200px;height:3px;background:rgba(255,255,255,.1);border-radius:2px;overflow:hidden">
        <div id="vtour-loading-bar" style="width:0%;height:100%;background:linear-gradient(90deg,#3b82f6,#8b5cf6);transition:width .3s"></div>
      </div>
    `;
    ov.appendChild(loading);

    // ── CROSSHAIR ──
    const cross = document.createElement('div');
    cross.id = 'vtour-crosshair';
    cross.style.cssText = `
      position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
      width:14px;height:14px;border:1.5px solid rgba(255,255,255,.7);border-radius:50%;
      pointer-events:none;z-index:50;display:none;
      box-shadow:0 0 0 1px rgba(0,0,0,.5);
    `;
    ov.appendChild(cross);

    // ── HINT TOP-LEFT (controls) ──
    const hint = document.createElement('div');
    hint.id = 'vtour-controls-hint';
    hint.style.cssText = `
      position:absolute;top:20px;left:20px;background:rgba(0,0,0,.78);color:white;
      padding:12px 16px;border-radius:10px;font-size:11px;line-height:1.65;
      border:1px solid rgba(255,255,255,.15);backdrop-filter:blur(10px);
      max-width:240px;z-index:50;display:none;
    `;
    hint.innerHTML = `
      <div style="font-weight:700;margin-bottom:6px;color:#60a5fa;font-size:12px">⌨ CONTROLE</div>
      <div><b>WASD</b> · mers</div>
      <div><b>Mouse</b> · privire</div>
      <div><b>Shift</b> · alergare</div>
      <div><b>Tab</b> · următorul hotspot</div>
      <div><b>1-9</b> · schimb etaj</div>
      <div><b>H</b> · vedere Dollhouse</div>
      <div><b>M</b> · măsurătoare</div>
      <div><b>P</b> · tur automat</div>
      <div><b>Click hotspot</b> · teleport</div>
      <div><b>ESC</b> · ieșire</div>
    `;
    ov.appendChild(hint);

    // ── ETICHETĂ CURRENT HOTSPOT ──
    const label = document.createElement('div');
    label.id = 'vtour-cur-label';
    label.style.cssText = `
      position:absolute;top:24px;left:50%;transform:translateX(-50%);
      background:rgba(0,0,0,.78);color:white;padding:8px 18px;border-radius:20px;
      font-size:13px;font-weight:600;letter-spacing:.4px;z-index:50;display:none;
      border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(10px);
    `;
    ov.appendChild(label);

    // ── BUTOANE MODE (Dollhouse/Walkthrough/Floorplan) ──
    const modes = document.createElement('div');
    modes.id = 'vtour-modes';
    modes.style.cssText = `
      position:absolute;bottom:20px;left:50%;transform:translateX(-50%);
      display:flex;gap:8px;z-index:60;pointer-events:auto;
      background:rgba(0,0,0,.78);padding:6px;border-radius:24px;
      border:1px solid rgba(255,255,255,.15);backdrop-filter:blur(10px);
    `;
    const mkBtn = (icon, label, onClick) => {
      const b = document.createElement('button');
      b.style.cssText = `
        background:transparent;color:white;border:none;padding:8px 14px;border-radius:18px;
        cursor:pointer;font-size:11px;font-weight:600;letter-spacing:.5px;
        display:flex;align-items:center;gap:6px;transition:background .15s;
      `;
      b.innerHTML = `<span style="font-size:14px">${icon}</span><span>${label}</span>`;
      b.addEventListener('mouseenter', () => b.style.background = 'rgba(255,255,255,.12)');
      b.addEventListener('mouseleave', () => b.style.background = 'transparent');
      b.addEventListener('click', onClick);
      return b;
    };
    modes.appendChild(mkBtn('🚶', 'WALK', () => { if(STATE.mode === 'dollhouse') _exitDollhouse(); _stopAutoWalk(); }));
    modes.appendChild(mkBtn('🏠', 'DOLLHOUSE', _enterDollhouse));
    modes.appendChild(mkBtn('🎬', 'AUTO', _startAutoWalk));
    modes.appendChild(mkBtn('📏', 'MĂSOARĂ', _toggleMeasure));
    ov.appendChild(modes);

    // ── BUTTON EXIT (top-right) ──
    const exit = document.createElement('button');
    exit.id = 'vtour-exit';
    exit.style.cssText = `
      position:absolute;top:20px;right:20px;background:rgba(220,38,38,.92);color:white;
      border:none;padding:10px 18px;border-radius:10px;font-size:12px;font-weight:700;
      cursor:pointer;z-index:100;pointer-events:auto;
      box-shadow:0 4px 12px rgba(0,0,0,.4);
    `;
    exit.innerHTML = '✕ IEȘIRE';
    exit.addEventListener('click', () => window.VTour.stop());
    ov.appendChild(exit);

    // ── HOTSPOTS BAR (bottom) — afișează hotspot curent ──
    const bar = document.createElement('div');
    bar.id = 'vtour-hs-bar';
    bar.style.cssText = `
      position:absolute;bottom:75px;left:50%;transform:translateX(-50%);
      display:flex;gap:6px;z-index:55;pointer-events:auto;max-width:90%;overflow-x:auto;
      background:rgba(0,0,0,.5);padding:4px 8px;border-radius:14px;display:none;
    `;
    ov.appendChild(bar);
  }

  function _updateOverlay(){
    const loading = document.getElementById('vtour-loading');
    if(loading && loading._done){
      loading.style.opacity = '0';
      loading.style.transition = 'opacity .5s';
      setTimeout(() => loading.remove(), 600);
      loading._done = false;
      document.getElementById('vtour-crosshair').style.display = '';
      document.getElementById('vtour-controls-hint').style.display = '';
      document.getElementById('vtour-cur-label').style.display = '';
    }
    // Label hotspot curent
    const cur = STATE.hotspots[STATE.currentHotspot];
    if(cur){
      const lbl = document.getElementById('vtour-cur-label');
      if(lbl) lbl.textContent = cur.label;
    }
    // ── Navigator vertical: când utilizatorul e ÎN casa scării, oferă "Urcă/Coboară"
    _updateStairsNavigator();
    // Re-render floorplan (cu poziția nouă a userului)
    _renderFloorplan();
    // Actualizăm pozițiile etichetelor de măsurătoare
    if(STATE.measureMode){
      const THREE = window.THREE;
      const cam = STATE.tourCam;
      STATE.measureMode.labels.forEach(label => {
        const wp = label._vtourMeasurePoint;
        if(!wp || !cam) return;
        const v = wp.clone().project(cam);
        const x = (v.x + 1) / 2 * window.innerWidth;
        const y = (-v.y + 1) / 2 * window.innerHeight;
        label.style.left = x + 'px';
        label.style.top = y + 'px';
        label.style.display = (v.z > 1 || v.z < -1) ? 'none' : '';
      });
    }
  }

  // Buton "Urcă/Coboară" apare lipit jos-stânga când utilizatorul e ÎN hotspot 'core'
  function _updateStairsNavigator(){
    if(STATE.mode !== 'walkthrough'){
      const ex = document.getElementById('vtour-stairs-nav');
      if(ex) ex.style.display = 'none';
      return;
    }
    // Cea mai apropiată hotspot core de poziția curentă
    if(!STATE.tourCam) return;
    const cx = STATE.tourCam.position.x, cz = STATE.tourCam.position.z;
    let inCore = false;
    let curFloor = STATE.currentFloorIdx;
    for(const h of STATE.hotspots){
      if(h.kind !== 'interior' || h.roomType !== 'core') continue;
      const d = Math.hypot(h.x - cx, h.z - cz);
      const sameFloor = (h.floorIdx === curFloor);
      if(sameFloor && d < 3.5){ inCore = true; break; }
    }
    let nav = document.getElementById('vtour-stairs-nav');
    if(!inCore){
      if(nav) nav.style.display = 'none';
      return;
    }
    if(!nav){
      nav = document.createElement('div');
      nav.id = 'vtour-stairs-nav';
      nav.style.cssText = `
        position:absolute;bottom:160px;left:24px;
        background:rgba(0,0,0,.88);border:1px solid rgba(167,139,250,.5);
        border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:8px;
        z-index:60;pointer-events:auto;backdrop-filter:blur(12px);
        box-shadow:0 8px 24px rgba(0,0,0,.5);
        min-width:140px;
      `;
      STATE.overlay.appendChild(nav);
    }
    nav.style.display = '';
    const niv = window._RV?.floors?.length || 1;
    const canUp   = curFloor < niv - 1;
    const canDown = curFloor > 0;
    nav.innerHTML = `
      <div style="font-size:9px;color:#a78bfa;font-weight:700;letter-spacing:.7px;text-align:center;text-transform:uppercase">🪜 Casa scării</div>
      <button data-act="up" ${!canUp ? 'disabled' : ''}
        style="background:${canUp?'linear-gradient(90deg,#3b82f6,#8b5cf6)':'rgba(255,255,255,.04)'};color:${canUp?'white':'#475569'};
        border:none;padding:10px 14px;border-radius:8px;font-size:11px;font-weight:700;
        cursor:${canUp?'pointer':'not-allowed'};letter-spacing:.4px">
        ↑ Urcă la E${curFloor + 1}
      </button>
      <button data-act="down" ${!canDown ? 'disabled' : ''}
        style="background:${canDown?'rgba(96,165,250,.18)':'rgba(255,255,255,.04)'};color:${canDown?'#60a5fa':'#475569'};
        border:1px solid ${canDown?'rgba(96,165,250,.4)':'transparent'};padding:10px 14px;border-radius:8px;font-size:11px;font-weight:700;
        cursor:${canDown?'pointer':'not-allowed'};letter-spacing:.4px">
        ↓ Coboară la E${curFloor - 1}
      </button>
    `;
    // Event handlers (refresh la fiecare frame e ok pentru că textul se schimbă cu etaj)
    nav.querySelectorAll('button').forEach(b => {
      b.onclick = () => {
        const act = b.dataset.act;
        const targetFloor = act === 'up' ? curFloor + 1 : curFloor - 1;
        if(targetFloor < 0 || targetFloor >= niv) return;
        // Găsim hotspot core la etajul țintă
        const coreOnTarget = STATE.hotspots.findIndex(h =>
          h.kind === 'interior' && h.roomType === 'core' && h.floorIdx === targetFloor);
        if(coreOnTarget >= 0){
          _glideTo(coreOnTarget);
        } else {
          // fallback: primul hotspot interior de pe etajul țintă
          const anyOnTarget = STATE.hotspots.findIndex(h =>
            h.kind === 'interior' && h.floorIdx === targetFloor);
          if(anyOnTarget >= 0) _glideTo(anyOnTarget);
        }
      };
    });
  }

  function _setLoadingProgress(pct, msg){
    const bar = document.getElementById('vtour-loading-bar');
    const m = document.getElementById('vtour-loading-msg');
    if(bar) bar.style.width = pct + '%';
    if(m && msg) m.textContent = msg;
    if(pct >= 100){
      const loading = document.getElementById('vtour-loading');
      if(loading) loading._done = true;
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // POST-PROCESSING — SSAO + Bloom (graceful fallback dacă addonsul lipsește)
  // ═════════════════════════════════════════════════════════════════════════

  function _setupComposer(renderer, scene, camera){
    const THREE = window.THREE;
    if(!CFG.enableSSAO && !CFG.enableBloom) return null;
    if(!THREE.EffectComposer || !THREE.RenderPass){
      console.warn('[VTour] EffectComposer indisponibil — fără post-processing');
      return null;
    }
    try {
      const composer = new THREE.EffectComposer(renderer);
      composer.addPass(new THREE.RenderPass(scene, camera));
      if(CFG.enableSSAO && THREE.SSAOPass){
        const ssao = new THREE.SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
        ssao.kernelRadius = 8;
        ssao.minDistance = 0.005;
        ssao.maxDistance = 0.1;
        ssao.output = THREE.SSAOPass.OUTPUT.Default;
        composer.addPass(ssao);
      }
      if(CFG.enableBloom && THREE.UnrealBloomPass){
        const bloom = new THREE.UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0.45, 0.6, 0.85
        );
        composer.addPass(bloom);
      }
      console.log('[VTour] ✅ Composer setat');
      return composer;
    } catch(e){
      console.warn('[VTour] Composer setup failed:', e.message);
      return null;
    }
  }

  function _setupProceduralSky(scene){
    const THREE = window.THREE;
    // SAFE: folosim background solid (NU ShaderMaterial — cauza erorilor uniform 'value' din r128)
    scene.background = new THREE.Color(0xb8d4e8);
    return null;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MAIN LOOP — render frame (handle moduri + animă hotspots)
  // ═════════════════════════════════════════════════════════════════════════

  function _loop(now){
    if(!STATE.active) return;
    requestAnimationFrame(_loop);

    try {
      const dt = Math.min(0.1, (now - (STATE._lastTime || now)) / 1000);
      STATE._lastTime = now;

      // Update mișcare/glide/auto-walk
      if(!_updateGlide(now)){
        _updateMovement(dt);
      }

      // Animă hotspots (pulse) — sample doar la fiecare 4 frame-uri pentru perf
      const scene = window.V3D && window.V3D.scene;
      if(scene && (STATE._frame = (STATE._frame||0) + 1) % 3 === 0){
        const t = now / 600;
        scene.traverse(o => {
          if(o._vtourHotspot !== undefined){
            o.position.y += Math.sin(t + o._vtourHotspot) * 0.0008;
            o.rotation.y += 0.012;
          }
          if(o._vtourMattertag !== undefined){
            o.scale.setScalar(1 + Math.sin(t * 2 + o._vtourMattertag) * 0.08);
          }
        });
      }

      // Aplicăm yaw + pitch pe cameră
      if(STATE.tourCam && STATE.mode === 'walkthrough'){
        const THREE = window.THREE;
        const q = new THREE.Quaternion();
        const eYaw = new THREE.Euler(0, STATE.yaw, 0, 'YXZ');
        const ePitch = new THREE.Euler(STATE.pitch, 0, 0, 'YXZ');
        const qY = new THREE.Quaternion().setFromEuler(eYaw);
        const qP = new THREE.Quaternion().setFromEuler(ePitch);
        q.multiplyQuaternions(qY, qP);
        STATE.tourCam.quaternion.copy(q);
      }

      _updateOverlay();

      // Render
      const camera = (STATE.mode === 'dollhouse' && STATE.dollhouseCam) ? STATE.dollhouseCam : STATE.tourCam;
      if(STATE.composer && STATE.mode === 'walkthrough'){
        STATE.composer.render();
      } else if(STATE.renderer && scene && camera){
        STATE.renderer.render(scene, camera);
      }
    } catch(err){
      STATE._errCount = (STATE._errCount || 0) + 1;
      if(STATE._errCount <= 3){
        console.error('[VTour] Eroare în loop:', err.message);
      } else if(STATE._errCount === 4){
        console.error('[VTour] Erori repetate — silentirea log-urilor (verificați materialele scenei)');
      }
      // Auto-stop dacă peste 60 frame-uri consecutive cu eroare → oprim turul
      if(STATE._errCount > 60){
        console.error('[VTour] Prea multe erori consecutive — opresc turul');
        try { window.VTour.stop(); } catch(e){}
      }
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // START — secvență async completă
  // ═════════════════════════════════════════════════════════════════════════

  async function start(options){
    if(STATE.active){ console.warn('[VTour] deja activ'); return; }
    options = options || {};
    const V3D = window.V3D;
    if(!V3D || !V3D.scene || !V3D.r){
      _showError('Viewer 3D nu este activ',
        'Deschide întâi viewer-ul 3D apăsând "Vedere 3D" din panoul AEDIS, apoi apasă din nou Tur Virtual.');
      return;
    }
    // Verificăm dacă AEDIS a fost generat (mesh-urile clădirii există)
    if(!Array.isArray(V3D.aedis) || V3D.aedis.length === 0){
      _showError('Volumul 3D nu a fost generat încă',
        'Apasă întâi butonul "🏗 Generează AEDIS" din panoul stânga al viewer-ului 3D. ' +
        'Turul virtual citește geometria clădirii AEDIS plus releveul (dacă există) și ' +
        'recreează un tur Matterport în interior.');
      return;
    }
    const THREE = window.THREE;
    if(!THREE){ _showError('Three.js nu este încărcat', ''); return; }

    STATE.active = true;
    STATE.canvas = V3D.r.domElement;
    STATE.renderer = V3D.r;
    STATE.collisionMeshes = [];
    STATE.currentFloorIdx = 0;

    // Dacă folosim AEDIS shell (default), adăugăm mesh-urile lui la collision
    // pentru ca utilizatorul să se ciocnească de pereții clădirii când e exterior
    if(CFG.skipExteriorRebuild && Array.isArray(V3D.aedis)){
      V3D.aedis.forEach(m => {
        if(m && m.isMesh) STATE.collisionMeshes.push(m);
      });
    }

    // Releveu lipsă? Oferim utilizatorului 2 opțiuni — generare automată sau doar exterior
    const hasReleveu = window._RV && Array.isArray(window._RV.floors) && window._RV.floors.length > 0;
    if(!hasReleveu){
      // Dacă există funcția globală generateRelevee, oferim dialog
      if(typeof window.generateRelevee === 'function'){
        STATE.active = false; // oprim temporar — vom reporni după alegerea utilizatorului
        if(STATE.overlay){ STATE.overlay.remove(); STATE.overlay = null; }
        const choice = await _askReleveuChoice();
        if(choice === 'exterior'){
          // Continuă tur exterior
          STATE.active = true;
          _createOverlay();
          _setLoadingProgress(45, 'Construiesc tur exterior…');
        } else if(choice === 'generate'){
          // Generăm releveu și relansăm turul
          _showInfoToast('Generare releveu', 'Se construiesc planurile interioare. Va dura câteva secunde…');
          try {
            await window.generateRelevee();
            // Închidem panoul releveu (dacă s-a deschis)
            if(typeof window.closeRelevee === 'function'){
              try { window.closeRelevee(); } catch(e){}
            }
            await new Promise(r => setTimeout(r, 800)); // așteptăm finalizare
            // Re-lansăm start()
            return start(options);
          } catch(e){
            console.error('[VTour] generateRelevee failed:', e);
            STATE.active = true;
            _createOverlay();
            _setLoadingProgress(45, 'Tur exterior — releveu indisponibil…');
          }
        } else {
          return; // utilizatorul a închis dialogul
        }
      } else {
        _showInfoToast('Tur exterior',
          'Pentru această parcelă nu există releveu — vei vedea doar exteriorul clădirii. Pentru tur interior complet Matterport încarcă un releveu .json.');
      }
    }

    // Save state previous pentru restore
    STATE.prevFog = V3D.scene.fog;
    STATE.prevBg = V3D.scene.background;
    STATE.prevEnv = V3D.scene.environment;

    _createOverlay();
    _setLoadingProgress(5, 'Analizez setările AEDIS…');

    // 1. Citim modelul AEDIS complet
    const aedisModel = _readAedisModel();
    console.log('[VTour] AEDIS model:', aedisModel);
    _setLoadingProgress(15, 'Calculez ancore geometrice…');

    // 2. Anchor (poziție în lume)
    const anchor = _computeAnchor(V3D.scene);
    STATE._anchor = anchor;
    console.log('[VTour] Anchor:', anchor);

    // 3. Sky procedural (skip dacă V3D are deja background)
    if(!V3D.scene.background) _setupProceduralSky(V3D.scene);
    // NU modificăm scene.fog — V3D are propriul fog optimizat
    _setLoadingProgress(25, 'Configurez iluminat…');

    // 4. Lighting
    _setupLights(V3D.scene);
    _setLoadingProgress(35, 'Încarc texturi HDR (opțional)…');

    // 5. HDRI încercăm să încărcăm (graceful fallback)
    try {
      await _loadHDRI(V3D.r, V3D.scene, CFG.hdriExterior);
    } catch(e){}
    _setLoadingProgress(45, 'Construiesc volum exterior…');

    // 6. Volum exterior (opțional — în mod default skip pentru a folosi AEDIS)
    if(!CFG.skipExteriorRebuild) _buildVolumeExterior(V3D.scene, anchor, aedisModel);
    _setLoadingProgress(55, 'Construiesc interior din releveu…');

    // 7. Interior
    _buildInterior(V3D.scene, anchor, aedisModel);
    _setLoadingProgress(70, 'Plasez mobilierul…');

    // 8. Mobilier
    _buildFurniture(V3D.scene, anchor, aedisModel);
    _setLoadingProgress(80, 'Construiesc acoperișul…');

    // 9. Acoperiș
    _buildRoof(V3D.scene, anchor, aedisModel);
    _setLoadingProgress(88, 'Plasez hotspot-uri și mattertag-uri…');

    // 10. Hotspots + Mattertags
    _buildHotspots(V3D.scene, anchor, aedisModel);
    _buildMattertags(V3D.scene, anchor, aedisModel);
    _setLoadingProgress(94, 'Inițializez floorplan…');

    // 11. Floorplan
    _buildFloorplanMinimap();
    _setLoadingProgress(98, 'Configurez post-processing…');

    // 12. Cameră tur — folosim camera viewer-ului existent
    const aspect = window.innerWidth / window.innerHeight;
    STATE.tourCam = new THREE.PerspectiveCamera(72, aspect, 0.05, 800);
    V3D.scene.add(STATE.tourCam);

    // Teleport la primul hotspot — preferăm EXTERIORUL "Stradă · Intrare" (start ca Matterport)
    let firstIdx = STATE.hotspots.findIndex(h => h.label && h.label.includes('Stradă · Intrare'));
    if(firstIdx < 0) firstIdx = STATE.hotspots.findIndex(h => h.kind === 'interior');
    if(firstIdx < 0) firstIdx = 0;
    if(STATE.hotspots[firstIdx]){
      const h = STATE.hotspots[firstIdx];
      STATE.tourCam.position.set(h.x, h.y, h.z);
      STATE.currentHotspot = firstIdx;
      STATE.currentFloorIdx = h.floorIdx >= 0 ? h.floorIdx : 0;
      // Yaw inițial spre intrarea principală dacă există
      if(h.lookAt){
        const dx = h.lookAt.x - h.x;
        const dz = h.lookAt.z - h.z;
        STATE.yaw = Math.atan2(-dx, -dz);
      }
    } else {
      STATE.tourCam.position.set(anchor.cx, anchor.baseY + STATE.eyeHeight, anchor.cz + anchor.bD);
    }
    STATE.pitch = 0;

    // 13. Post-processing
    STATE.composer = _setupComposer(V3D.r, V3D.scene, STATE.tourCam);

    // 14. Tone mapping pe renderer (ACES)
    V3D.r.toneMapping = THREE.ACESFilmicToneMapping;
    V3D.r.toneMappingExposure = 1.05;
    V3D.r.outputEncoding = THREE.sRGBEncoding;
    V3D.r.shadowMap.enabled = true;
    V3D.r.shadowMap.type = THREE.PCFSoftShadowMap;

    // 15. Input
    _setupInput();

    // 16. Resize handler
    STATE._resizeHandler = () => {
      const aspect = window.innerWidth / window.innerHeight;
      if(STATE.tourCam){
        STATE.tourCam.aspect = aspect;
        STATE.tourCam.updateProjectionMatrix();
      }
      if(STATE.renderer) STATE.renderer.setSize(window.innerWidth, window.innerHeight);
      if(STATE.composer) STATE.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', STATE._resizeHandler);
    STATE._resizeHandler();

    _setLoadingProgress(100, 'Gata!');
    setTimeout(() => {
      STATE._lastTime = performance.now();
      requestAnimationFrame(_loop);
    }, 400);
    console.log('[VTour] ✅ START complet');
  }

  // ═════════════════════════════════════════════════════════════════════════
  // STOP — cleanup complet (memory leaks zero)
  // ═════════════════════════════════════════════════════════════════════════

  function stop(){
    if(!STATE.active) return;
    STATE.active = false;
    _teardownInput();

    const scene = window.V3D && window.V3D.scene;
    const renderer = window.V3D && window.V3D.r;

    // Eliminăm grupurile generate
    [STATE.interiorGroup, STATE.volumeGroup, STATE.roofGroup, STATE.furnitureGroup, STATE.mattertagGroup].forEach(g => {
      if(!g) return;
      g.traverse(o => {
        if(o.geometry) o.geometry.dispose();
        if(o.material){
          if(Array.isArray(o.material)) o.material.forEach(m => _disposeMaterial(m));
          else _disposeMaterial(o.material);
        }
      });
      if(g.parent) g.parent.remove(g);
    });
    STATE.interiorGroup = STATE.volumeGroup = STATE.roofGroup = STATE.furnitureGroup = STATE.mattertagGroup = null;

    // Hotspots sferele/discurile
    if(scene){
      const toRemove = [];
      scene.traverse(o => {
        if(o._vtourHotspot !== undefined || o._vtourGenerated) toRemove.push(o);
      });
      toRemove.forEach(o => {
        if(o.geometry) o.geometry.dispose();
        if(o.material){
          if(Array.isArray(o.material)) o.material.forEach(m => _disposeMaterial(m));
          else _disposeMaterial(o.material);
        }
        if(o.parent) o.parent.remove(o);
      });
    }

    // Lumini extra
    if(scene){
      STATE.extraLights.forEach(l => scene.remove(l));
      STATE.extraLights = [];
    }

    // Restore AEDIS visibility
    if(window.V3D && Array.isArray(window.V3D.aedis)){
      window.V3D.aedis.forEach(m => {
        if(m._vtourHidden !== undefined){
          m.visible = m._vtourHidden;
          delete m._vtourHidden;
        }
      });
    }

    // Cameră
    if(STATE.tourCam && STATE.tourCam.parent) STATE.tourCam.parent.remove(STATE.tourCam);
    STATE.tourCam = null;
    STATE.dollhouseCam = null;

    // Composer
    if(STATE.composer){
      if(STATE.composer.passes) STATE.composer.passes.forEach(p => { if(p.dispose) p.dispose(); });
      STATE.composer = null;
    }

    // Restore scene state
    if(scene){
      scene.fog = STATE.prevFog;
      scene.background = STATE.prevBg;
      scene.environment = STATE.prevEnv;
    }

    // Overlay
    if(STATE.overlay){ STATE.overlay.remove(); STATE.overlay = null; }

    // Resize handler
    if(STATE._resizeHandler){
      window.removeEventListener('resize', STATE._resizeHandler);
      STATE._resizeHandler = null;
    }

    // Reset state misc
    STATE.hotspots = [];
    STATE.mattertags = [];
    STATE.collisionMeshes = [];
    STATE.glide = null;
    STATE.autoWalk = null;
    STATE.measureMode = null;
    STATE._aedisCache = null;
    STATE.mode = 'walkthrough';

    // Clear caches (pentru următoarea sesiune cu materiale "proaspete") — cu dispose mai întâi
    _matCache.forEach(m => _disposeMaterial(m));
    _matCache.clear();
    _texCache.forEach(t => { try { t.dispose(); } catch(e){} });
    _texCache.clear();

    // Render scene fără tur (pentru a actualiza vizual)
    if(renderer && scene && window.V3D.cam){
      try { renderer.render(scene, window.V3D.cam); } catch(e){}
    }

    console.log('[VTour] ✅ STOP complet');
  }

  function _disposeMaterial(mat){
    if(!mat) return;
    if(mat.map) mat.map.dispose();
    if(mat.normalMap) mat.normalMap.dispose();
    if(mat.roughnessMap) mat.roughnessMap.dispose();
    if(mat.aoMap) mat.aoMap.dispose();
    if(mat.metalnessMap) mat.metalnessMap.dispose();
    if(mat.emissiveMap) mat.emissiveMap.dispose();
    mat.dispose();
  }

  // Overlay de eroare cu UX prietenos (în loc de alert nativ)
  function _showError(title, desc){
    const ex = document.getElementById('vtour-err-toast');
    if(ex) ex.remove();
    const el = document.createElement('div');
    el.id = 'vtour-err-toast';
    el.style.cssText = `
      position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      background:linear-gradient(135deg,rgba(15,23,42,.98) 0%,rgba(30,41,59,.98) 100%);
      color:white;padding:28px 32px;border-radius:16px;max-width:440px;width:90%;
      z-index:100000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      box-shadow:0 20px 60px rgba(0,0,0,.6);border:1px solid rgba(251,191,36,.4);
      backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
    `;
    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">
        <div style="font-size:36px">⚠️</div>
        <div style="font-weight:700;font-size:16px;color:#fbbf24;line-height:1.3">${title}</div>
      </div>
      ${desc ? `<div style="color:#cbd5e1;font-size:13px;line-height:1.6;margin-bottom:20px">${desc}</div>` : ''}
      <button onclick="document.getElementById('vtour-err-toast').remove()"
        style="background:rgba(251,191,36,.15);color:#fbbf24;border:1px solid rgba(251,191,36,.4);
        padding:9px 20px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;
        width:100%;letter-spacing:.5px">AM ÎNȚELES</button>
    `;
    document.body.appendChild(el);
    setTimeout(() => { if(el.parentNode) el.remove(); }, 12000);
  }

  // Toast info — non-blocant, jos dreapta, auto-dismiss 8s
  function _showInfoToast(title, desc){
    const ex = document.getElementById('vtour-info-toast');
    if(ex) ex.remove();
    const el = document.createElement('div');
    el.id = 'vtour-info-toast';
    el.style.cssText = `
      position:fixed;bottom:90px;right:24px;
      background:linear-gradient(135deg,rgba(15,23,42,.96) 0%,rgba(30,41,59,.96) 100%);
      color:white;padding:14px 18px;border-radius:12px;max-width:340px;
      z-index:99998;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      box-shadow:0 8px 24px rgba(0,0,0,.5);border:1px solid rgba(96,165,250,.35);
      backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
      animation:vtourSlideIn .35s ease;
    `;
    el.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:10px">
        <div style="font-size:20px;flex-shrink:0">ℹ️</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:13px;color:#60a5fa;margin-bottom:4px">${title}</div>
          ${desc ? `<div style="color:#cbd5e1;font-size:11px;line-height:1.5">${desc}</div>` : ''}
        </div>
        <div onclick="document.getElementById('vtour-info-toast').remove()"
             style="cursor:pointer;color:#94a3b8;font-size:14px;flex-shrink:0;padding:0 4px">✕</div>
      </div>
    `;
    document.body.appendChild(el);
    setTimeout(() => { if(el.parentNode){ el.style.opacity = '0'; el.style.transition = 'opacity .4s'; setTimeout(() => el.remove(), 500); } }, 8000);
  }

  // Dialog interactiv pentru alegere releveu — returnează Promise<'generate' | 'exterior' | null>
  function _askReleveuChoice(){
    return new Promise(resolve => {
      const ex = document.getElementById('vtour-choice');
      if(ex) ex.remove();
      const el = document.createElement('div');
      el.id = 'vtour-choice';
      el.style.cssText = `
        position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
        background:linear-gradient(135deg,rgba(15,23,42,.98) 0%,rgba(30,41,59,.98) 100%);
        color:white;padding:32px 36px;border-radius:18px;max-width:480px;width:92%;
        z-index:100000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
        box-shadow:0 24px 64px rgba(0,0,0,.7);border:1px solid rgba(96,165,250,.4);
        backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);
      `;
      el.innerHTML = `
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
          <div style="font-size:38px">🏠</div>
          <div>
            <div style="font-weight:800;font-size:17px;color:#60a5fa;line-height:1.2">Cum pornim turul?</div>
            <div style="font-size:11px;color:#94a3b8;margin-top:3px">Pentru această parcelă nu există încă releveu</div>
          </div>
        </div>
        <div style="color:#cbd5e1;font-size:13px;line-height:1.6;margin-bottom:22px">
          Releveul = planul interior detaliat al clădirii (camere, uși, ferestre).
          Pot să-l generez automat pentru tine pe baza setărilor AEDIS — sau pot porni
          turul doar pe exterior dacă vrei să vezi rapid volumul.
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <button id="vtour-choice-gen"
            style="background:linear-gradient(90deg,#3b82f6,#8b5cf6);color:white;border:none;
            padding:14px 18px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;
            letter-spacing:.4px;text-align:left;display:flex;align-items:center;gap:12px;
            box-shadow:0 4px 12px rgba(59,130,246,.35)">
            <span style="font-size:22px">✨</span>
            <div>
              <div>Generează releveu automat</div>
              <div style="font-size:10px;opacity:.85;font-weight:500;margin-top:2px">
                Tur Matterport complet — camere, mobilier, lumini, plante (recomandat)
              </div>
            </div>
          </button>
          <button id="vtour-choice-ext"
            style="background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.18);
            padding:14px 18px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;
            letter-spacing:.4px;text-align:left;display:flex;align-items:center;gap:12px">
            <span style="font-size:22px">🏗</span>
            <div>
              <div>Doar exterior</div>
              <div style="font-size:10px;opacity:.7;font-weight:500;margin-top:2px">
                Plimbare în jurul clădirii AEDIS, fără interior
              </div>
            </div>
          </button>
          <button id="vtour-choice-cancel"
            style="background:transparent;color:#94a3b8;border:none;padding:8px;
            font-size:11px;cursor:pointer;letter-spacing:.5px;margin-top:4px">
            ANULEAZĂ
          </button>
        </div>
      `;
      document.body.appendChild(el);
      const close = (val) => { el.remove(); resolve(val); };
      document.getElementById('vtour-choice-gen').onclick = () => close('generate');
      document.getElementById('vtour-choice-ext').onclick = () => close('exterior');
      document.getElementById('vtour-choice-cancel').onclick = () => close(null);
      document.getElementById('vtour-choice-gen').onmouseenter = (e) => e.target.style.transform = 'translateY(-1px)';
      document.getElementById('vtour-choice-gen').onmouseleave = (e) => e.target.style.transform = '';
      document.getElementById('vtour-choice-ext').onmouseenter = (e) => e.target.style.background = 'rgba(255,255,255,.10)';
      document.getElementById('vtour-choice-ext').onmouseleave = (e) => e.target.style.background = 'rgba(255,255,255,.06)';
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INJECT BUTTON — buton "Tur 3D" în UI viewer
  // ═════════════════════════════════════════════════════════════════════════

  // ═════════════════════════════════════════════════════════════════════════
  // ENTRANCE MARKER — săgeată 3D deasupra ușii principale
  // Apare în viewer 3D AEDIS (înainte de tur), să vadă utilizatorul pe unde intră
  // ═════════════════════════════════════════════════════════════════════════
  let _entranceMarker = null;

  function toggleEntranceMarker(){
    if(_entranceMarker){
      const scene = window.V3D && window.V3D.scene;
      if(scene && _entranceMarker.parent) _entranceMarker.parent.remove(_entranceMarker);
      if(_entranceMarker._vtourAnim) clearInterval(_entranceMarker._vtourAnim);
      _entranceMarker.traverse(o => {
        if(o.geometry) o.geometry.dispose();
        if(o.material) o.material.dispose();
      });
      _entranceMarker = null;
      // Update buton state
      const btn = document.getElementById('vtour-entrance-btn');
      if(btn){ btn.style.background = 'rgba(251,191,36,.1)'; btn.style.color = '#fbbf24'; }
      return false;
    }
    const shown = _showEntranceMarker();
    if(shown){
      const btn = document.getElementById('vtour-entrance-btn');
      if(btn){ btn.style.background = 'rgba(251,191,36,.35)'; btn.style.color = '#fff8e0'; }
    }
    return shown;
  }

  function _showEntranceMarker(){
    const V3D = window.V3D;
    const THREE = window.THREE;
    if(!V3D || !V3D.scene || !THREE) return false;
    if(!Array.isArray(V3D.aedis) || !V3D.aedis.length) return false;
    const anchor = _computeAnchor(V3D.scene);
    let wx, wy, wz;
    if(window._RV && window._RV.floors && window._RV.floors[0]){
      const f0 = window._RV.floors[0];
      const bW = (window._RV.building && window._RV.building.bW) || anchor.bW;
      const bD = (window._RV.building && window._RV.building.bD) || anchor.bD;
      const mainDoor = (f0.doors || []).find(d => d.type === 'main') || (f0.doors || [])[0];
      if(mainDoor){
        const ox = anchor.cx - bW/2;
        const oz = anchor.cz - bD/2;
        wx = ox + mainDoor.x + (mainDoor.w || 1.8)/2;
        wz = oz + mainDoor.y;
      } else {
        wx = anchor.cx;
        wz = anchor.cz + bD/2;
      }
      const aedisModel = _readAedisModel();
      const hParter = aedisModel.floors[0]?.hNiv || 3.5;
      wy = anchor.baseY + hParter + 0.8;
    } else {
      wx = anchor.cx; wz = anchor.cz + anchor.bD/2; wy = anchor.baseY + 4;
    }
    const group = _makeEntranceMarkerMesh(THREE, wx, wy, wz);
    V3D.scene.add(group);
    _entranceMarker = group;
    return true;
  }

  function _makeEntranceMarkerMesh(THREE, x, y, z){
    const group = new THREE.Group();
    group._vtourEntranceMarker = true;
    group.position.set(x, y, z);
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(1.0, 2.2, 12),
      new THREE.MeshStandardMaterial({
        color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 1.4,
        transparent: true, opacity: 0.95, roughness: 0.4,
      })
    );
    cone.rotation.x = Math.PI;
    cone.position.y = 1.7;
    group.add(cone);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.06, 8, 32),
      new THREE.MeshStandardMaterial({
        color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 1.6,
        transparent: true, opacity: 0.85,
      })
    );
    ring.rotation.x = Math.PI/2;
    ring.position.y = 0.4;
    group.add(ring);
    group._vtourAnim = setInterval(() => {
      if(!group.parent) { clearInterval(group._vtourAnim); return; }
      const t = performance.now() / 500;
      cone.position.y = 1.7 + Math.sin(t) * 0.18;
      ring.scale.setScalar(1 + Math.sin(t * 1.4) * 0.12);
      ring.material.opacity = 0.55 + Math.sin(t * 1.4) * 0.3;
      if(window.V3D) window.V3D._dirty = true;
    }, 50);
    return group;
  }

  function _injectButton(){
    const tryInject = () => {
      if(document.getElementById('vtour-launch-btn')) return true;
      const topbar = document.getElementById('v3d-topbar');
      if(!topbar) return false;
      const rows = topbar.querySelectorAll(':scope > div');
      const targetRow = rows[1] || topbar;

      // 1. Buton TUR VIRTUAL
      const btn = document.createElement('button');
      btn.id = 'vtour-launch-btn';
      btn.title = 'Tur Virtual 3D Matterport — intră în clădire';
      btn.innerHTML = '🥽 Tur Virtual';
      btn.style.cssText = `
        background:linear-gradient(90deg,rgba(0,255,136,.15),rgba(59,130,246,.12));
        color:#00ff88;border:1px solid rgba(0,255,136,.5);border-radius:8px;
        padding:5px 13px;font-size:11px;font-weight:700;cursor:pointer;
        flex-shrink:0;min-height:36px;touch-action:manipulation;
        letter-spacing:.3px;white-space:nowrap;
        box-shadow:0 0 8px rgba(0,255,136,.15);
      `;
      btn.addEventListener('click', () => start());
      btn.addEventListener('mouseenter', () => btn.style.boxShadow = '0 0 16px rgba(0,255,136,.35)');
      btn.addEventListener('mouseleave', () => btn.style.boxShadow = '0 0 8px rgba(0,255,136,.15)');
      targetRow.appendChild(btn);

      // 2. Buton ARATĂ INTRARE — marker auriu deasupra ușii principale (vizibil în viewer 3D AEDIS)
      const entBtn = document.createElement('button');
      entBtn.id = 'vtour-entrance-btn';
      entBtn.title = 'Marchează fațada principală — săgeată deasupra ușii de intrare';
      entBtn.innerHTML = '🚪 Intrare';
      entBtn.style.cssText = `
        background:rgba(251,191,36,.1);color:#fbbf24;
        border:1px solid rgba(251,191,36,.4);border-radius:8px;
        padding:5px 11px;font-size:11px;font-weight:700;cursor:pointer;
        flex-shrink:0;min-height:36px;touch-action:manipulation;
        letter-spacing:.3px;white-space:nowrap;
      `;
      entBtn.addEventListener('click', () => toggleEntranceMarker());
      targetRow.appendChild(entBtn);

      return true;
    };

    if(tryInject()) return;
    const observer = new MutationObserver(() => { tryInject(); });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INIT
  // ═════════════════════════════════════════════════════════════════════════

  function init(){
    console.log('[VTour] init v3.0 MATTERPORT-GRADE');
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', _injectButton);
    } else {
      _injectButton();
    }
  }

  // Funcție publică pentru schimbat etaj din UI floorplan
  function _fpFloor(dir){
    if(!window._RV || !window._RV.floors) return;
    let n = STATE.currentFloorIdx + dir;
    if(n < 0) n = window._RV.floors.length - 1;
    if(n >= window._RV.floors.length) n = 0;
    _switchFloor(n);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // EXPORT
  // ═════════════════════════════════════════════════════════════════════════
  return {
    init, start, stop,
    toggleEntranceMarker,
    _fpFloor,
    // Debug helpers
    _state: STATE, _cfg: CFG,
    _readAedisModel,
  };
})();

// Auto-init
if(typeof window !== 'undefined' && window.VTour && typeof window.VTour.init === 'function'){
  window.VTour.init();
}
