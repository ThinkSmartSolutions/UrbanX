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
  const _glbCache = new Map();  // cache pentru modele GLB încărcate

  // ═════════════════════════════════════════════════════════════════════════
  // GLB LOADER — încarcă modele 3D fotorealiste din assets/tur3d/models/
  // Cache de promise pentru reutilizare. Fallback graceful dacă fișierul lipsește.
  // ═════════════════════════════════════════════════════════════════════════

  function _loadGLB(modelKey){
    const url = `${CFG.assetsBase}/models/${modelKey}.glb`;
    if(_glbCache.has(url)) return _glbCache.get(url);
    const THREE = window.THREE;
    const promise = new Promise((resolve) => {
      if(!THREE.GLTFLoader){
        resolve(null);
        return;
      }
      const loader = new THREE.GLTFLoader();
      loader.load(url,
        (gltf) => {
          const root = gltf.scene || (gltf.scenes && gltf.scenes[0]);
          if(!root){ resolve(null); return; }
          // Configurăm shadows + envMapIntensity pe toate mesh-urile
          root.traverse(o => {
            if(o.isMesh){
              o.castShadow = true;
              o.receiveShadow = true;
              if(o.material){
                if(Array.isArray(o.material)){
                  o.material.forEach(m => { m.envMapIntensity = 1.0; });
                } else {
                  o.material.envMapIntensity = 1.0;
                }
              }
            }
          });
          console.log('[VTour] ✅ GLB:', modelKey);
          resolve(root);
        },
        undefined,
        () => { resolve(null); /* silent fail — fallback la procedural */ }
      );
    });
    _glbCache.set(url, promise);
    return promise;
  }

  // Plasează un GLB cu scale + rotație. Async — promisul e înregistrat în
  // STATE._pendingGLB pentru a putea fi awaited în bulk de _buildFurniture.
  // Dacă lipsește GLB-ul, apelează fallbackFn (procedural) imediat sincron.
  function _placeGLB(group, modelKey, x, y, z, scale, rotY, fallbackFn){
    const promise = (async () => {
      const model = await _loadGLB(modelKey);
      if(!model){
        if(fallbackFn){
          try { fallbackFn(); } catch(e){ console.warn('[VTour] fallback fail:', modelKey, e.message); }
        }
        return null;
      }
      const clone = model.clone(true);
      clone.position.set(x, y, z);
      clone.scale.setScalar(scale || 1);
      if(rotY) clone.rotation.y = rotY;
      group.add(clone);
      return clone;
    })();
    if(STATE._pendingGLB) STATE._pendingGLB.push(promise);
    return promise;
  }

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

  /** Material lemn (uși, mobilier, parchet finish, mâner) — lemn lăcuit cu clearcoat */
  function _woodMaterial(tone){
    tone = tone || 'medium';
    const colorMap = { dark: 0x3d2817, medium: 0x8b5a2b, light: 0xc9a373, ebony: 0x1a1008 };
    const c = colorMap[tone] || colorMap.medium;
    const cacheKey = `wood:${tone}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    const THREE = window.THREE;
    // MeshPhysicalMaterial cu clearcoat — lemn cu lac protector (parchet, mobilier lustruit)
    const mat = new THREE.MeshPhysicalMaterial({
      color: c, roughness: 0.55, metalness: 0.0,
      clearcoat: 0.45, clearcoatRoughness: 0.18,
      reflectivity: 0.35,
    });
    _matCache.set(cacheKey, mat);
    return mat;
  }

  /** Material metal (mânere, rame, picioare mobilier) — cu anisotropy pentru periat */
  function _metalMaterial(tone){
    tone = tone || 'black';
    const colorMap = { black:0x1a1a1a, chrome:0xc8c8c8, gold:0xb88a00, brass:0x9c7a3a, alu:0xa8a8a8, copper:0xb87333 };
    const c = colorMap[tone] || colorMap.black;
    const cacheKey = `metal:${tone}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    const THREE = window.THREE;
    // Metal lustruit cu un strop de clearcoat pentru reflexii extra
    const mat = new THREE.MeshPhysicalMaterial({
      color: c, roughness: tone === 'chrome' ? 0.08 : 0.28, metalness: 0.95,
      clearcoat: 0.3, clearcoatRoughness: 0.1,
      envMapIntensity: 1.4,
    });
    _matCache.set(cacheKey, mat);
    return mat;
  }

  /** Material textil (canapele, perne, draperii) — cu sheen pentru reflexie microfibrilară */
  function _fabricMaterial(colorHex, rough){
    const cacheKey = `fabric:${colorHex}:${rough||0.9}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    const THREE = window.THREE;
    // MeshPhysicalMaterial cu sheen — efect velvet/textile real (vizibil pe muchii)
    const mat = new THREE.MeshPhysicalMaterial({
      color: _parseHex(colorHex),
      roughness: rough || 0.9, metalness: 0,
      sheen: 0.6,
      sheenRoughness: 0.45,
      sheenColor: new THREE.Color(0xffffff).multiplyScalar(0.4),
    });
    _matCache.set(cacheKey, mat);
    return mat;
  }

  /** Material piele (sofa premium opțional, accente) */
  function _leatherMaterial(colorHex){
    const cacheKey = `leather:${colorHex || '#2a1a14'}`;
    if(_matCache.has(cacheKey)) return _matCache.get(cacheKey);
    const THREE = window.THREE;
    const mat = new THREE.MeshPhysicalMaterial({
      color: _parseHex(colorHex || '#2a1a14'),
      roughness: 0.42, metalness: 0,
      clearcoat: 0.3, clearcoatRoughness: 0.5,
      sheen: 0.2, sheenRoughness: 0.6,
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
    const bbox = new THREE.Box3();
    // Strategia 1: bbox unit peste TOATE mesh-urile AEDIS (clădirea curentă)
    if(window.V3D && Array.isArray(window.V3D.aedis) && window.V3D.aedis.length){
      window.V3D.aedis.forEach(m => {
        if(m && m.isObject3D){
          try {
            const sub = new THREE.Box3().setFromObject(m);
            if(isFinite(sub.min.x)) bbox.union(sub);
          } catch(e){}
        }
      });
    }
    // Fallback: scanăm scena pentru orice mesh AEDIS-like
    if(!isFinite(bbox.min.x)){
      scene.traverse(o => {
        if(o.isMesh && !o._vtourGenerated && !o._vtourLight && !o._vtourHotspot && !o._vtourEntranceMarker){
          try { bbox.expandByObject(o); } catch(e){}
        }
      });
    }
    if(!isFinite(bbox.min.x)){
      return { cx:0, cz:0, baseY:0, bW:20, bD:15, topY:12 };
    }
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    // Suprascriem cu bW/bD din releveu dacă există (mai precise — în metri reali)
    let bW = Math.max(size.x, 5), bD = Math.max(size.z, 5);
    if(window._RV && window._RV.building){
      if(window._RV.building.bW) bW = window._RV.building.bW;
      if(window._RV.building.bD) bD = window._RV.building.bD;
    }
    console.log(`[VTour] Anchor: center=(${center.x.toFixed(1)}, ${bbox.min.y.toFixed(1)}, ${center.z.toFixed(1)}) dim=${bW.toFixed(1)}×${bD.toFixed(1)}m`);
    return {
      cx: center.x, cz: center.z, baseY: bbox.min.y,
      bW, bD,
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

  async function _buildFurniture(scene, anchor, aedisModel){
    if(!CFG.enableFurniture) return null;
    const THREE = window.THREE;
    const RV = window._RV;
    if(!RV || !Array.isArray(RV.floors)) return null;

    // Pornim înregistrarea promiselor GLB (fiecare _placeGLB se adaugă aici)
    STATE._pendingGLB = [];

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
    const selectedRooms = []; // {floor, fIdx, rect, worldX, worldZ, worldY (centru-cameră), w, d}
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

    // Calculăm coordonatele world ale fiecărei camere (pentru CubeCamera ulterior)
    selectedRooms.forEach(s => {
      const aedisFloor = aedisModel.floors[s.fIdx] || aedisModel.floors[aedisModel.floors.length - 1];
      s.yBottom = baseY + aedisFloor.baseY;
      const fScale = aedisFloor.footprintScale || 1.0;
      const ox = anchor.cx - (bW * fScale)/2;
      const oz = anchor.cz - (bD * fScale)/2;
      s.worldX = ox + (s.rect.x + s.rect.w/2) * fScale;
      s.worldZ = oz + (s.rect.y + s.rect.h/2) * fScale;
      s.worldW = s.rect.w * fScale;
      s.worldD = s.rect.h * fScale;
    });

    // Salvăm pentru _setupCubeCameras (pasul 2)
    STATE._selectedRooms = selectedRooms;

    selectedRooms.forEach(s => {
      const r = s.rect;
      const yBottom = s.yBottom;
      const rx = s.worldX, rz = s.worldZ;
      const rw = s.worldW, rh = s.worldD;

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

    // Așteaptă încărcarea TUTUROR modelelor GLB înainte de a continua
    const pending = STATE._pendingGLB;
    console.log(`[VTour] Aștept încărcare ${pending.length} modele GLB...`);
    if(pending.length > 0){
      _setLoadingProgress(72, `Încarc ${pending.length} modele 3D...`);
      await Promise.all(pending);
    }
    STATE._pendingGLB = null;

    console.log('[VTour] ✅ Mobilier:', group.children.length, 'mesh-uri,', pointLightCount, 'PointLights');
    return group;
  }

  // ── LIVING — sofa + TV + măsuță cafea + plantă + covor + lustră ─────────
  function _placeLiving(group, cx, baseY, cz, w, d){
    const THREE = window.THREE;
    // Sofa GLB (fallback la procedural)
    if(w > 2.5){
      _placeGLB(group, 'sofa', cx, baseY, cz - d/2 + 0.5, 1.0, 0, () => {
        _makeSofa(group, cx, baseY, cz - d/2 + 0.5, w * 0.65, 0.95, 0, '#3d4858');
      });
    }
    // TV GLB (montat pe perete S)
    if(w > 1.4){
      _placeGLB(group, 'tv', cx, baseY + 1.0, cz + d/2 - 0.15, 1.0, Math.PI, () => {
        _makeTV(group, cx, baseY + 1.3, cz + d/2 - 0.05, 1.4, 0.85, 0);
      });
    }
    // Măsuță cafea GLB
    _placeGLB(group, 'coffee_table', cx, baseY, cz, 1.0, 0, () => {
      _makeCoffeeTable(group, cx, baseY, cz, 1.0, 0.55);
    });
    // Covor mare (sub măsuță) — procedural (e doar un plan)
    const carpetMat = _carpetMaterial('#8b6f47');
    const carpet = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(w*0.7, 2.5), Math.min(d*0.6, 1.8)), carpetMat);
    carpet.rotation.x = -Math.PI / 2;
    carpet.position.set(cx, baseY + 0.005, cz);
    carpet.receiveShadow = true;
    group.add(carpet);
    // Plantă GLB (colț)
    _placeGLB(group, 'plant_potted', cx - w/2 + 0.4, baseY, cz + d/2 - 0.4, 1.0, 0, () => {
      _makePlant(group, cx - w/2 + 0.4, baseY, cz + d/2 - 0.4, 1.4);
    });
    // Lustră GLB (tavan centru)
    _placeGLB(group, 'chandelier', cx, baseY + 2.8, cz, 1.0, 0, () => {
      _makeChandelier(group, cx, baseY + 2.7, cz);
    });
  }

  // ── BEDROOM ──────────────────────────────────────────────────────────────
  function _placeBedroom(group, cx, baseY, cz, w, d){
    if(d > 2.4){
      // Pat dublu GLB pe perete N
      _placeGLB(group, 'bed', cx, baseY, cz - d/2 + 1.0, 1.0, 0, () => {
        _makeBed(group, cx, baseY, cz - d/2 + 1.0);
      });
      // Noptiere GLB flanc
      _placeGLB(group, 'nightstand', cx - 1.0, baseY, cz - d/2 + 0.35, 1.0, 0, () => {
        _makeNightstand(group, cx - 1.0, baseY, cz - d/2 + 0.35);
      });
      _placeGLB(group, 'nightstand', cx + 1.0, baseY, cz - d/2 + 0.35, 1.0, 0, () => {
        _makeNightstand(group, cx + 1.0, baseY, cz - d/2 + 0.35);
      });
      // Lampe noptiere — procedural (au PointLight)
      _makeTableLamp(group, cx - 1.0, baseY + 0.6, cz - d/2 + 0.35);
      _makeTableLamp(group, cx + 1.0, baseY + 0.6, cz - d/2 + 0.35);
    }
    // Dulap GLB
    if(w > 1.5){
      _placeGLB(group, 'wardrobe', cx, baseY, cz + d/2 - 0.35, 1.0, Math.PI, () => {
        _makeWardrobe(group, cx, baseY, cz + d/2 - 0.35, Math.min(w * 0.6, 2.0));
      });
    }
    // Lustră (procedural, are PointLight)
    _makeChandelier(group, cx, baseY + 2.7, cz, 'compact');
  }

  // ── KITCHEN ──────────────────────────────────────────────────────────────
  function _placeKitchen(group, cx, baseY, cz, w, d){
    // Blat (procedural — adaptat la lățime variabilă)
    if(w > 1.5){
      _makeKitchenCounter(group, cx, baseY, cz - d/2 + 0.3, w * 0.85);
    }
    // Frigider GLB
    _placeGLB(group, 'fridge', cx + w/2 - 0.4, baseY, cz - d/2 + 0.4, 1.0, 0, () => {
      _makeFridge(group, cx + w/2 - 0.4, baseY, cz - d/2 + 0.4);
    });
    // Masă mâncare GLB + scaune
    if(w > 2.2 && d > 2.4){
      _placeGLB(group, 'dining_table', cx, baseY, cz + 0.5, 1.0, 0, () => {
        _makeDiningTable(group, cx, baseY, cz + 0.5, 1.2, 0.75);
      });
      // 4 scaune GLB
      [[-0.5, 0.95, Math.PI], [0.5, 0.95, Math.PI], [-0.5, 0.05, 0], [0.5, 0.05, 0]].forEach(([dx, dz, rot]) => {
        _placeGLB(group, 'chair', cx + dx, baseY, cz + dz, 1.0, rot, () => {
          _makeChair(group, cx + dx, baseY, cz + dz, rot);
        });
      });
    }
    _makeChandelier(group, cx, baseY + 2.7, cz, 'compact');
  }

  // ── BATHROOM ─────────────────────────────────────────────────────────────
  function _placeBathroom(group, cx, baseY, cz, w, d){
    if(w > 1.8){
      _placeGLB(group, 'bathtub', cx, baseY, cz - d/2 + 0.4, 1.0, 0, () => {
        _makeBathtub(group, cx, baseY, cz - d/2 + 0.4, 1.7, 0.75);
      });
    }
    _placeGLB(group, 'sink', cx + w/2 - 0.35, baseY, cz, 1.0, -Math.PI/2, () => {
      _makeSink(group, cx + w/2 - 0.35, baseY, cz);
    });
    _placeGLB(group, 'toilet', cx - w/2 + 0.35, baseY, cz + d/2 - 0.4, 1.0, Math.PI/2, () => {
      _makeToilet(group, cx - w/2 + 0.35, baseY, cz + d/2 - 0.4);
    });
    _makeMirror(group, cx + w/2 - 0.05, baseY + 1.55, cz, 0.6, 0.8, Math.PI/2);
  }

  // ── WC simplu ─────────────────────────────────────────────────────────────
  function _placeWC(group, cx, baseY, cz, w, d){
    _placeGLB(group, 'toilet', cx, baseY, cz - d/2 + 0.4, 1.0, 0, () => {
      _makeToilet(group, cx, baseY, cz - d/2 + 0.4);
    });
    _placeGLB(group, 'sink', cx + w/2 - 0.25, baseY, cz, 1.0, -Math.PI/2, () => {
      _makeSink(group, cx + w/2 - 0.25, baseY, cz);
    });
  }

  // ── OFFICE ────────────────────────────────────────────────────────────────
  function _placeOffice(group, cx, baseY, cz, w, d){
    _placeGLB(group, 'desk', cx, baseY, cz - d/2 + 0.4, 1.0, 0, () => {
      _makeDesk(group, cx, baseY, cz - d/2 + 0.4, 1.4, 0.7);
    });
    _placeGLB(group, 'office_chair', cx, baseY, cz - d/2 + 1.0, 1.0, 0, () => {
      _makeOfficeChair(group, cx, baseY, cz - d/2 + 1.0);
    });
    if(w > 1.4){
      _placeGLB(group, 'bookshelf', cx, baseY, cz + d/2 - 0.2, 1.0, Math.PI, () => {
        _makeBookshelf(group, cx, baseY, cz + d/2 - 0.2, Math.min(w * 0.7, 1.5));
      });
    }
    _placeGLB(group, 'plant_potted', cx + w/2 - 0.35, baseY, cz + d/2 - 0.35, 0.8, 0, () => {
      _makePlant(group, cx + w/2 - 0.35, baseY, cz + d/2 - 0.35, 1.0);
    });
    _makeChandelier(group, cx, baseY + 2.7, cz, 'compact');
  }

  // ── HALL — minim, cu cuier și plantă ──────────────────────────────────────
  function _placeHall(group, cx, baseY, cz, w, d){
    if(w > 1.5 || d > 1.5){
      _placeGLB(group, 'plant_potted', cx + Math.min(w,d)/2 - 0.4, baseY, cz, 1.0, 0, () => {
        _makePlant(group, cx + Math.min(w,d)/2 - 0.4, baseY, cz, 1.2);
      });
    }
    if(d > 1.5){
      _makeBox(group, cx - w/2 + 0.25, baseY + 0.9, cz - d/2 + 0.3, 0.4, 1.8, 0.08, _woodMaterial('medium'));
    }
  }

  // ── RECEPTION — birou + scaune ───────────────────────────────────────────
  function _placeReception(group, cx, baseY, cz, w, d){
    _makeKitchenCounter(group, cx, baseY, cz - d/2 + 0.4, w * 0.7);
    _placeGLB(group, 'office_chair', cx, baseY, cz - d/2 + 1.1, 1.0, 0, () => {
      _makeOfficeChair(group, cx, baseY, cz - d/2 + 1.1);
    });
    _placeGLB(group, 'plant_potted', cx - w/2 + 0.4, baseY, cz + d/2 - 0.4, 1.1, 0, () => {
      _makePlant(group, cx - w/2 + 0.4, baseY, cz + d/2 - 0.4, 1.5);
    });
    _placeGLB(group, 'plant_potted', cx + w/2 - 0.4, baseY, cz + d/2 - 0.4, 1.1, 0, () => {
      _makePlant(group, cx + w/2 - 0.4, baseY, cz + d/2 - 0.4, 1.5);
    });
  }

  // ── MEETING ROOM — masă mare cu scaune ────────────────────────────────────
  function _placeMeeting(group, cx, baseY, cz, w, d){
    const tableW = Math.min(w * 0.55, 2.6);
    const tableD = Math.min(d * 0.4, 1.1);
    _placeGLB(group, 'dining_table', cx, baseY, cz, tableW/1.2, 0, () => {
      _makeDiningTable(group, cx, baseY, cz, tableW, tableD);
    });
    const nChairs = Math.max(4, Math.floor(tableW / 0.6) * 2);
    for(let i = 0; i < nChairs/2; i++){
      const t = (i + 0.5) / (nChairs/2);
      const x = cx - tableW/2 + t * tableW;
      _placeGLB(group, 'chair', x, baseY, cz + tableD/2 + 0.4, 1.0, Math.PI, () => {
        _makeChair(group, x, baseY, cz + tableD/2 + 0.4, Math.PI);
      });
      _placeGLB(group, 'chair', x, baseY, cz - tableD/2 - 0.4, 1.0, 0, () => {
        _makeChair(group, x, baseY, cz - tableD/2 - 0.4, 0);
      });
    }
    _makeChandelier(group, cx, baseY + 2.7, cz);
  }

  // ── COMMERCIAL — rafturi simple ──────────────────────────────────────────
  function _placeCommercial(group, cx, baseY, cz, w, d){
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

  // Cuboid cu muchii rotunjite (bevel) — diferența vizibilă față de BoxGeometry plat
  // este enormă; orice piesă de mobilier reală are muchii cu raza de cel puțin 2-3mm
  function _makeRoundedBox(group, x, y, z, w, h, d, radius, mat, rotY){
    const THREE = window.THREE;
    radius = Math.min(radius, w/2 - 0.001, h/2 - 0.001, d/2 - 0.001);
    if(radius <= 0.005){
      return _makeBox(group, x, y, z, w, h, d, mat, rotY);
    }
    // Shape 2D dreptunghi cu colțuri rotunjite (în planul XY)
    const shape = new THREE.Shape();
    const hw = w/2 - radius, hh = h/2 - radius;
    shape.moveTo(-hw, -h/2);
    shape.lineTo(hw, -h/2);
    shape.quadraticCurveTo(w/2, -h/2, w/2, -hh);
    shape.lineTo(w/2, hh);
    shape.quadraticCurveTo(w/2, h/2, hw, h/2);
    shape.lineTo(-hw, h/2);
    shape.quadraticCurveTo(-w/2, h/2, -w/2, hh);
    shape.lineTo(-w/2, -hh);
    shape.quadraticCurveTo(-w/2, -h/2, -hw, -h/2);
    // Extrudăm pe Z cu bevel ușor pentru muchiile din față/spate
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      bevelEnabled: true,
      bevelThickness: radius * 0.6,
      bevelSize: radius * 0.6,
      bevelOffset: 0,
      bevelSegments: 3,
      curveSegments: 6,
    });
    // Centrăm pe Z
    geo.translate(0, 0, -d/2);
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, mat);
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

  function _makeSofa(parentGroup, cx, baseY, cz, w, d, rotY, colorHex){
    const THREE = window.THREE;
    // Construim sofa în spațiu LOCAL (centrată la origin), apoi aplicăm transform pe group
    const sofa = new THREE.Group();
    sofa._vtourGenerated = true;
    const color = colorHex || '#3d4858';
    const fabricMain = _fabricMaterial(color, 0.92);
    const fabricCushion = _fabricMaterial(color, 0.95);
    const legMat = _metalMaterial('black');

    const baseH = 0.28;     // înălțime bază
    const seatH = 0.18;     // perne sezut
    const backH = 0.58;     // spătar
    const armH = 0.66;      // brațe
    const armW = 0.16;

    // 1. Bază (sub perne) — roundedBox lung cu bevel
    _makeRoundedBox(sofa, 0, baseH/2, 0, w, baseH, d, 0.04, fabricMain, 0);

    // 2. Spătar — usor tiltat înapoi (~3.4°)
    const back = _makeRoundedBox(sofa, 0, baseH + backH/2, -(d/2 - 0.09), w - 0.02, backH, 0.16, 0.05, fabricMain, 0);
    back.rotation.x = -0.06;

    // 3. Brațe — 2 boxe rotunjite, mai înalte decât spătarul
    _makeRoundedBox(sofa, -(w/2 - armW/2), baseH + armH/2, 0, armW, armH, d, 0.05, fabricMain, 0);
    _makeRoundedBox(sofa,  (w/2 - armW/2), baseH + armH/2, 0, armW, armH, d, 0.05, fabricMain, 0);

    // 4. Perne sezut — 3 separate cu variație organică
    const cushSpace = (w - 2*armW - 0.06);
    const cushW = cushSpace / 3;
    for(let i = 0; i < 3; i++){
      const x = -cushSpace/2 + cushW/2 + i*cushW;
      const yRot = (i - 1) * 0.03; // variație ușoară
      _makeRoundedBox(sofa, x, baseH + seatH/2 + 0.01, 0.06, cushW * 0.93, seatH, d * 0.78, 0.045, fabricCushion, yRot);
    }

    // 5. Perne spătar — 3 înclinate ușor înainte
    for(let i = 0; i < 3; i++){
      const x = -cushSpace/2 + cushW/2 + i*cushW;
      const cm = _makeRoundedBox(sofa, x, baseH + seatH + 0.22, -(d/2 - 0.22), cushW * 0.88, 0.34, 0.18, 0.05, fabricCushion, (i-1)*0.04);
      cm.rotation.x = 0.12; // top înclinat înainte
    }

    // 6. Pernă decorativă accent (colț stânga)
    const accentMat = _fabricMaterial('#a06a4a', 0.85);
    _makeRoundedBox(sofa, -cushSpace/3, baseH + seatH + 0.09, -0.05, 0.32, 0.12, 0.32, 0.06, accentMat, 0.4);

    // 7. Picioare metalice (4 colțuri, mici)
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx, sz]) => {
      _makeRoundedBox(sofa, sx * (w/2 - 0.12), 0.05, sz * (d/2 - 0.12), 0.07, 0.1, 0.07, 0.015, legMat, 0);
    });

    sofa.position.set(cx, baseY, cz);
    sofa.rotation.y = rotY || 0;
    parentGroup.add(sofa);
    return sofa;
  }

  function _makeCoffeeTable(parentGroup, cx, baseY, cz, w, d){
    const THREE = window.THREE;
    const table = new THREE.Group();
    table._vtourGenerated = true;
    const topMat = _woodMaterial('dark');         // lemn lăcuit cu clearcoat
    const legs = _metalMaterial('black');
    const shelfMat = _woodMaterial('medium');

    // 1. Suprafață top cu chamfer pronunțat
    _makeRoundedBox(table, 0, 0.40, 0, w, 0.045, d, 0.025, topMat, 0);

    // 2. Raft inferior (caracteristic mesei moderne) — mai mic, sub blat
    _makeRoundedBox(table, 0, 0.13, 0, w * 0.85, 0.03, d * 0.85, 0.02, shelfMat, 0);

    // 3. Picioare metalice — cu un mic chamfer pe muchii
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx, sz]) => {
      _makeRoundedBox(table, sx * (w/2 - 0.06), 0.2, sz * (d/2 - 0.06), 0.035, 0.4, 0.035, 0.005, legs, 0);
    });

    // 4. Detaliu decorativ pe blat — vază mică
    _makeRoundedBox(table, w*0.25, 0.46, 0, 0.06, 0.12, 0.06, 0.015, _metalMaterial('brass'), 0);

    table.position.set(cx, baseY, cz);
    parentGroup.add(table);
    return table;
  }

  function _makeChair(parentGroup, cx, baseY, cz, rotY){
    const THREE = window.THREE;
    const ch = new THREE.Group();
    ch._vtourGenerated = true;
    const wood = _woodMaterial('medium');
    const seatPad = _fabricMaterial('#5d4e3e', 0.92);

    // 1. Sezut cu chamfer
    _makeRoundedBox(ch, 0, 0.46, 0, 0.44, 0.05, 0.44, 0.025, wood, 0);

    // 2. Pernă subțire pe sezut (decorativ)
    _makeRoundedBox(ch, 0, 0.495, 0, 0.40, 0.025, 0.40, 0.04, seatPad, 0);

    // 3. Spătar — usor tiltat înapoi, cu o curbură ușoară (ExtrudeGeometry shape)
    // Folosim un dreptunghi cu colțuri rotunjite, plasat și înclinat
    const back = _makeRoundedBox(ch, 0, 0.78, -0.21, 0.40, 0.5, 0.04, 0.04, wood, 0);
    back.rotation.x = -0.08; // tilt back ~5°

    // 4. Picioare — ușor înclinate spre exterior (Splay) — frumusețea designului modern
    const legSplay = 0.025;
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx, sz]) => {
      const leg = _makeRoundedBox(ch, sx * (0.2 - legSplay*sx*0.5), 0.225, sz * (0.2 - legSplay*sz*0.5), 0.035, 0.45, 0.035, 0.006, wood, 0);
      leg.rotation.z = -sx * 0.05; // tilt outward
      leg.rotation.x = -sz * 0.05;
    });

    ch.position.set(cx, baseY, cz);
    ch.rotation.y = rotY || 0;
    parentGroup.add(ch);
    return ch;
  }

  function _makeNightstand(parentGroup, cx, baseY, cz){
    const THREE = window.THREE;
    const ns = new THREE.Group();
    ns._vtourGenerated = true;
    const wood = _woodMaterial('medium');
    const woodDark = _woodMaterial('dark');
    const handle = _metalMaterial('chrome');

    // 1. Corp principal cu chamfer
    _makeRoundedBox(ns, 0, 0.3, 0, 0.45, 0.6, 0.4, 0.02, wood, 0);

    // 2. Sertar — față proeminentă cu chamfer mai mare (efect de relief)
    _makeRoundedBox(ns, 0, 0.42, 0.205, 0.4, 0.14, 0.015, 0.018, woodDark, 0);

    // 3. Sertar inferior (al doilea)
    _makeRoundedBox(ns, 0, 0.22, 0.205, 0.4, 0.14, 0.015, 0.018, woodDark, 0);

    // 4. Mânere — 2 cilindre orizontale proeminente
    const h1 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.10, 12), handle);
    h1.rotation.z = Math.PI / 2;
    h1.position.set(0, 0.42, 0.225);
    h1.castShadow = true; h1.receiveShadow = true;
    ns.add(h1);
    const h2 = h1.clone();
    h2.position.y = 0.22;
    ns.add(h2);

    // 5. Picioare scurte
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx, sz]) => {
      _makeRoundedBox(ns, sx * 0.18, 0.025, sz * 0.16, 0.035, 0.05, 0.035, 0.008, wood, 0);
    });

    // 6. Decorativ pe top — carte
    _makeRoundedBox(ns, 0.1, 0.625, 0, 0.16, 0.025, 0.22, 0.005, _fabricMaterial('#7c2d12', 0.7), 0.2);

    ns.position.set(cx, baseY, cz);
    parentGroup.add(ns);
    return ns;
  }

  function _makeWardrobe(parentGroup, cx, baseY, cz, w){
    const THREE = window.THREE;
    const wd = new THREE.Group();
    wd._vtourGenerated = true;
    const wood = _woodMaterial('dark');
    const woodTrim = _woodMaterial('medium');
    const handle = _metalMaterial('chrome');
    const H = 2.2, D = 0.6;

    // 1. Corp principal
    _makeRoundedBox(wd, 0, H/2, 0, w, H, D, 0.015, wood, 0);

    // 2. Top trim (ornament sus)
    _makeRoundedBox(wd, 0, H + 0.025, 0, w + 0.06, 0.05, D + 0.04, 0.015, woodTrim, 0);

    // 3. Plinth (bază decorativă)
    _makeRoundedBox(wd, 0, 0.04, 0, w + 0.04, 0.08, D + 0.02, 0.012, woodTrim, 0);

    // 4. Uși — 2 sau 3 panele proeminente cu chamfer
    const nDoors = w > 1.4 ? 2 : 1;
    const doorW = (w - 0.04) / nDoors;
    for(let i = 0; i < nDoors; i++){
      const x = -w/2 + 0.02 + doorW/2 + i * doorW;
      // Ușă proeminentă spre exterior (2cm peste corp)
      _makeRoundedBox(wd, x, H/2, D/2 + 0.012, doorW - 0.02, H - 0.16, 0.024, 0.012, wood, 0);
      // Panel decorativ interior pe ușă (un dreptunghi rotunjit ușor mai în interior)
      _makeRoundedBox(wd, x, H/2, D/2 + 0.025, doorW - 0.14, H - 0.36, 0.005, 0.04, woodTrim, 0);
      // Mâner vertical (cilindru lung)
      const handleSide = (i === 0) ? doorW/2 - 0.05 : -doorW/2 + 0.05;
      const hMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 12), handle);
      hMesh.position.set(x + handleSide, H/2, D/2 + 0.045);
      hMesh.castShadow = true; hMesh.receiveShadow = true;
      wd.add(hMesh);
    }

    wd.position.set(cx, baseY, cz);
    parentGroup.add(wd);
    return wd;
  }

  function _makeTableLamp(group, cx, baseY, cz){
    const THREE = window.THREE;
    // Bază metalică (cilindru jos cu chamfer)
    const baseMat = _metalMaterial('brass');
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.04, 16), baseMat);
    base.position.set(cx, baseY + 0.02, cz);
    base.castShadow = true; base.receiveShadow = true;
    group.add(base);
    // Stand (cilindru subțire)
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.38, 12), baseMat);
    stand.position.set(cx, baseY + 0.22, cz);
    stand.castShadow = true; stand.receiveShadow = true;
    group.add(stand);
    // Abajur — emissive când e aprinsă
    const lampMat = new THREE.MeshPhysicalMaterial({
      color: 0xfff5d8, roughness: 0.4, metalness: 0,
      emissive: 0xffe0a0, emissiveIntensity: 0.75,
      transparent: true, opacity: 0.92,
    });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.22, 20, 1, true), lampMat);
    cone.position.set(cx, baseY + 0.47, cz);
    cone.castShadow = true; cone.receiveShadow = true;
    group.add(cone);
    // Point light real (dacă bugetul permite)
    if(CFG.enableLighting && window.__vtourLightBudget){
      const pl = new THREE.PointLight(0xfff0c8, 0.55, 4, 2);
      pl.position.set(cx, baseY + 0.42, cz);
      pl.castShadow = false;
      group.add(pl);
    }
  }

  function _makeBed(parentGroup, cx, baseY, cz){
    const THREE = window.THREE;
    const bed = new THREE.Group();
    bed._vtourGenerated = true;
    const wood = _woodMaterial('medium');
    const sheets = _fabricMaterial('#f8f6ef', 0.95);
    const comforter = _fabricMaterial('#4a6b85', 0.88);
    const pillowMat = _fabricMaterial('#ffffff', 0.92);
    const accentPillow = _fabricMaterial('#c8946b', 0.82);

    // Dimensiuni (pat dublu standard)
    const W = 1.6, D = 2.0;

    // 1. Cadru lemn (boxă rotunjită jos)
    _makeRoundedBox(bed, 0, 0.18, 0, W + 0.12, 0.34, D + 0.12, 0.03, wood, 0);

    // 2. Picioare (4 mici cuburi rotunjite jos)
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx, sz]) => {
      _makeRoundedBox(bed, sx * (W/2 + 0.04), 0.02, sz * (D/2 + 0.04), 0.07, 0.06, 0.07, 0.012, wood, 0);
    });

    // 3. Saltea (rounded — vizibil deasupra cadrului)
    _makeRoundedBox(bed, 0, 0.5, 0, W, 0.22, D, 0.025, sheets, 0);

    // 4. Cearșaf (puțin mai mic, deasupra saltelei)
    _makeRoundedBox(bed, 0, 0.62, 0.04, W * 0.98, 0.025, D * 0.96, 0.015, sheets, 0);

    // 5. Plapumă (tilted la capătul de jos — pliată în jos)
    const blanket = _makeRoundedBox(bed, 0, 0.64, 0.3, W * 0.95, 0.05, D * 0.55, 0.03, comforter, 0);
    blanket.rotation.x = -0.05;

    // 6. Tăblie pat — cu panouri verticale decorative (3 panouri proeminente)
    _makeRoundedBox(bed, 0, 1.05, -(D/2 + 0.08), W + 0.12, 1.05, 0.08, 0.04, wood, 0);
    // Panouri verticale ușor proeminente
    const panelMat = _woodMaterial('dark');
    for(let i = -1; i <= 1; i++){
      _makeRoundedBox(bed, i * (W/3.2), 1.0, -(D/2 + 0.13), W/4.5, 0.85, 0.02, 0.01, panelMat, 0);
    }

    // 7. Footboard (mai jos, decorativ)
    _makeRoundedBox(bed, 0, 0.5, (D/2 + 0.08), W + 0.12, 0.4, 0.08, 0.03, wood, 0);

    // 8. Perne dormit (2 mari, înclinate sprijinit pe tăblie)
    [-0.36, 0.36].forEach(xOff => {
      const p = _makeRoundedBox(bed, xOff, 0.78, -(D/2 - 0.32), 0.62, 0.18, 0.42, 0.08, pillowMat, 0);
      p.rotation.x = -0.45; // înclinate sprijinit
    });

    // 9. Perne decorative (2 mai mici, accent color, în față)
    [-0.32, 0.32].forEach(xOff => {
      _makeRoundedBox(bed, xOff, 0.74, -(D/2 - 0.6), 0.42, 0.14, 0.28, 0.06, accentPillow, xOff > 0 ? 0.1 : -0.1);
    });

    // 10. Pătură împăturită (la picioare, accent decorativ)
    _makeRoundedBox(bed, -0.2, 0.7, (D/2 - 0.42), 0.7, 0.06, 0.32, 0.02, accentPillow, 0.05);

    bed.position.set(cx, baseY, cz);
    parentGroup.add(bed);
    return bed;
  }

  function _makeKitchenCounter(group, cx, baseY, cz, w){
    const THREE = window.THREE;
    const wcab = _woodMaterial('dark');
    const wTrim = _woodMaterial('medium');
    const chr = _metalMaterial('chrome');
    // Corp inferior (dulapuri) cu chamfer
    _makeRoundedBox(group, cx, baseY + 0.45, cz, w, 0.9, 0.6, 0.012, wcab, 0);
    // Blat marmură (cu PBR) — proeminent peste corpus, chamfer pronunțat
    const blatMat = _loadPBR('blat_bucatarie', {repeatX:Math.max(2,w/0.8), repeatY:1, fallbackColor:0xe8e0d0});
    _makeRoundedBox(group, cx, baseY + 0.92, cz, w + 0.06, 0.045, 0.65, 0.018, blatMat, 0);
    // Plită inducție (sticla neagră)
    const plitaMat = new THREE.MeshPhysicalMaterial({color:0x0a0a0a, roughness:0.08, metalness:0.1, clearcoat:1, clearcoatRoughness:0.05});
    _makeRoundedBox(group, cx - w/4, baseY + 0.945, cz + 0.05, 0.45, 0.015, 0.45, 0.025, plitaMat, 0);
    // Cercuri plita (4)
    const plitaRing = new THREE.MeshStandardMaterial({color:0x1a1a1a, roughness:0.4, metalness:0.7});
    [[-0.09,-0.09],[0.09,-0.09],[-0.09,0.09],[0.09,0.09]].forEach(([dx,dz]) => {
      const r = new THREE.Mesh(new THREE.RingGeometry(0.06, 0.08, 24), plitaRing);
      r.rotation.x = -Math.PI/2;
      r.position.set(cx - w/4 + dx, baseY + 0.953, cz + 0.05 + dz);
      group.add(r);
    });
    // Chiuvetă încastrată (porțelan)
    _makeRoundedBox(group, cx + w/4, baseY + 0.93, cz, 0.5, 0.04, 0.42, 0.04, _porcelainMaterial(), 0);
    // Cuvă chiuvetă (deeper)
    _makeRoundedBox(group, cx + w/4, baseY + 0.88, cz, 0.42, 0.1, 0.32, 0.025, _porcelainMaterial(), 0);
    // Robinet
    const tap = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.22, 12), chr);
    tap.position.set(cx + w/4 + 0.16, baseY + 1.05, cz);
    group.add(tap);
    const tapHead = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.022, 0.10, 12), chr);
    tapHead.rotation.z = Math.PI / 2;
    tapHead.position.set(cx + w/4 + 0.11, baseY + 1.15, cz);
    group.add(tapHead);
    // Mânere dulapuri (cilindre orizontale, vizibile)
    for(let i = -1; i <= 1; i++){
      const h = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.13, 12), chr);
      h.rotation.z = Math.PI / 2;
      h.position.set(cx + i * w/4, baseY + 0.65, cz + 0.31);
      h.castShadow = true; h.receiveShadow = true;
      group.add(h);
    }
    // Plinth bază
    _makeRoundedBox(group, cx, baseY + 0.04, cz, w + 0.04, 0.08, 0.55, 0.012, wTrim, 0);
  }

  function _makeFridge(parentGroup, cx, baseY, cz){
    const THREE = window.THREE;
    const fr = new THREE.Group();
    fr._vtourGenerated = true;
    // Corp inox cu finisaj periat (anisotropy efect via roughness mai mare)
    const inox = new THREE.MeshPhysicalMaterial({
      color: 0xd5d8db, roughness: 0.35, metalness: 0.9,
      clearcoat: 0.2, clearcoatRoughness: 0.4,
    });
    const handleMat = _metalMaterial('chrome');
    // Corp
    _makeRoundedBox(fr, 0, 0.92, 0, 0.65, 1.85, 0.65, 0.025, inox, 0);
    // Linie despărțitoare congelator/frigider (relief)
    _makeRoundedBox(fr, 0, 1.32, 0.331, 0.65, 0.012, 0.008, 0.002, _metalMaterial('chrome'), 0);
    // Ușa congelator (mai mică, sus) — proeminentă
    _makeRoundedBox(fr, 0, 1.62, 0.328, 0.62, 0.50, 0.012, 0.012, inox, 0);
    // Ușa frigider (jos)
    _makeRoundedBox(fr, 0, 0.78, 0.328, 0.62, 1.18, 0.012, 0.012, inox, 0);
    // Mâner congelator (vertical, lateral)
    const hF = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.35, 12), handleMat);
    hF.position.set(0.26, 1.62, 0.345);
    fr.add(hF);
    // Mâner frigider (vertical mai lung)
    const hR = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.9, 12), handleMat);
    hR.position.set(0.26, 0.78, 0.345);
    fr.add(hR);
    // Display digital pe ușa congelator (mic dreptunghi emissive)
    const dispMat = new THREE.MeshStandardMaterial({color:0x0a1a2a, emissive:0x4080ff, emissiveIntensity:0.4});
    _makeRoundedBox(fr, -0.18, 1.78, 0.336, 0.18, 0.07, 0.003, 0.008, dispMat, 0);
    fr.position.set(cx, baseY, cz);
    parentGroup.add(fr);
    return fr;
  }

  function _makeDiningTable(parentGroup, cx, baseY, cz, w, d){
    const THREE = window.THREE;
    const tb = new THREE.Group();
    tb._vtourGenerated = true;
    const top = _woodMaterial('medium');
    const legs = _woodMaterial('dark');
    // Suprafață cu chamfer (lemn lăcuit, mai gros)
    _makeRoundedBox(tb, 0, 0.74, 0, w, 0.05, d, 0.02, top, 0);
    // 4 picioare îngroșate, fără chamfer mic (lemn solid)
    [-1,1].forEach(sx => {
      [-1,1].forEach(sz => {
        _makeRoundedBox(tb, sx * (w/2 - 0.08), 0.37, sz * (d/2 - 0.08), 0.07, 0.74, 0.07, 0.008, legs, 0);
      });
    });
    // Cross-brace (caracteristic mese moderne)
    _makeRoundedBox(tb, 0, 0.4, 0, w - 0.3, 0.04, 0.04, 0.008, legs, 0);
    _makeRoundedBox(tb, 0, 0.4, 0, 0.04, 0.04, d - 0.3, 0.008, legs, 0);
    tb.position.set(cx, baseY, cz);
    parentGroup.add(tb);
    return tb;
  }

  function _makeTV(parentGroup, cx, baseY, cz, w, h, rotY){
    const THREE = window.THREE;
    const tv = new THREE.Group();
    tv._vtourGenerated = true;
    const frameMat = new THREE.MeshPhysicalMaterial({color:0x0a0a0a, roughness:0.25, metalness:0.4, clearcoat:0.5, clearcoatRoughness:0.2});
    // Ramă subțire foarte modernă
    _makeRoundedBox(tv, 0, 0, 0, w, h, 0.05, 0.008, frameMat, 0);
    // Ecran activ (cu textura procedurală emissive)
    const screen = _screenMaterial(true);
    _makeBox(tv, 0, 0, 0.028, w - 0.04, h - 0.04, 0.003, screen, 0);
    // Logo brand subtil jos
    _makeBox(tv, 0, -h/2 + 0.02, 0.03, 0.06, 0.012, 0.001, _metalMaterial('chrome'), 0);
    tv.position.set(cx, baseY, cz);
    tv.rotation.y = rotY || 0;
    parentGroup.add(tv);
    return tv;
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
    // Cordon de tavan
    const cordMat = _metalMaterial('chrome');
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.25, 8), cordMat);
    cord.position.set(cx, ceilY - 0.12, cz);
    group.add(cord);

    if(variant === 'compact'){
      // Plafonieră modernă — cupolă cu material emissive stratificat
      const lampMat = new THREE.MeshPhysicalMaterial({
        color: 0xfff5d8, roughness: 0.3, metalness: 0,
        emissive: 0xffe0a0, emissiveIntensity: 0.95,
        transparent: true, opacity: 0.85,
        clearcoat: 0.5, clearcoatRoughness: 0.2,
      });
      const dome = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 10, 0, Math.PI*2, 0, Math.PI/2), lampMat);
      dome.position.set(cx, ceilY - 0.25, cz);
      dome.rotation.x = Math.PI;
      group.add(dome);
      // Ring metalic ambient sub cupolă
      const ringC = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.012, 8, 32), cordMat);
      ringC.position.set(cx, ceilY - 0.04, cz);
      ringC.rotation.x = Math.PI / 2;
      group.add(ringC);
    } else {
      // Lustră clasică — ring + 6 brațe + cristale + cristale centrale
      const brassMat = _metalMaterial('brass');
      // Ring central
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.025, 12, 32), brassMat);
      ring.position.set(cx, ceilY - 0.32, cz);
      ring.rotation.x = Math.PI / 2;
      ring.castShadow = true; ring.receiveShadow = true;
      group.add(ring);
      // Hub central (disc de unde pleacă brațele)
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.08, 12), brassMat);
      hub.position.set(cx, ceilY - 0.28, cz);
      hub.castShadow = true;
      group.add(hub);

      const bulbMat = new THREE.MeshPhysicalMaterial({
        color: 0xfff8e0, emissive: 0xffe0a0, emissiveIntensity: 1.6,
        roughness: 0.2, metalness: 0,
        clearcoat: 0.8, clearcoatRoughness: 0.1,
        transparent: true, opacity: 0.95,
      });
      // Cristal — material transparent reflectiv
      const crystalMat = new THREE.MeshPhysicalMaterial({
        color: 0xeef4fa, roughness: 0.02, metalness: 0,
        clearcoat: 1.0, clearcoatRoughness: 0.02,
        transparent: true, opacity: 0.55,
        envMapIntensity: 1.8,
      });

      const nArms = 6;
      for(let i = 0; i < nArms; i++){
        const a = i * Math.PI * 2 / nArms;
        const bx = cx + Math.cos(a) * 0.32;
        const bz = cz + Math.sin(a) * 0.32;
        const by = ceilY - 0.34;
        // Braț orizontal
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.32, 8), brassMat);
        arm.position.set(cx + Math.cos(a) * 0.18, ceilY - 0.3, cz + Math.sin(a) * 0.18);
        arm.rotation.z = Math.PI/2;
        arm.rotation.y = -a;
        arm.castShadow = true;
        group.add(arm);
        // Cupă suport bulb
        const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.025, 0.04, 12), brassMat);
        cup.position.set(bx, by + 0.01, bz);
        group.add(cup);
        // Bulb emisiv
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), bulbMat);
        bulb.position.set(bx, by + 0.04, bz);
        group.add(bulb);
        // Cristal pendant sub fiecare bulb
        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.04, 0), crystalMat);
        crystal.position.set(bx, by - 0.08, bz);
        crystal.rotation.y = (i * 0.6) % Math.PI;
        crystal.castShadow = true;
        group.add(crystal);
      }
      // Cristale centrale (3 mai mari în șir vertical)
      for(let j = 0; j < 3; j++){
        const cr = new THREE.Mesh(new THREE.OctahedronGeometry(0.055 - j*0.01, 0), crystalMat);
        cr.position.set(cx, ceilY - 0.44 - j * 0.1, cz);
        cr.rotation.y = (j * 0.7) % Math.PI;
        cr.castShadow = true;
        group.add(cr);
      }
    }
    // PointLight real DOAR dacă bugetul permite
    if(CFG.enableLighting && window.__vtourLightBudget){
      const pl = new THREE.PointLight(0xfff0d0, variant === 'compact' ? 1.0 : 1.8, 7, 2);
      pl.position.set(cx, ceilY - 0.35, cz);
      pl.castShadow = false;
      group.add(pl);
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // VERTEX AO PROXIMITY — darkening pe muchii/colțuri/sub mobilier
  // Folosește distanța la bbox-urile altor mesh-uri în loc de raycast (rapid).
  // Aplică ca vertex colors → MeshPhysicalMaterial modulează diffuse natural.
  // ═════════════════════════════════════════════════════════════════════════
  function _bakeProximityAO(){
    if(!STATE.furnitureGroup) return;
    const THREE = window.THREE;
    const t0 = performance.now();

    // Pre-calc bbox-uri pentru toate mesh-urile relevante (interior + furniture + roof)
    const allBoxes = [];
    [STATE.interiorGroup, STATE.furnitureGroup, STATE.roofGroup].forEach(g => {
      if(!g) return;
      g.traverse(o => {
        if(o.isMesh && o.geometry){
          try {
            const box = new THREE.Box3().setFromObject(o);
            if(isFinite(box.min.x)){
              allBoxes.push({ mesh: o, box });
            }
          } catch(e){}
        }
      });
    });
    if(!allBoxes.length) return;

    const AO_MAX_DIST = 0.35;       // sub această distanță vertexii devin întunecați
    const AO_MIN_BRIGHTNESS = 0.55; // cât de întunecat poate ajunge AO (0.5 = 50% lumină)
    const tempV = new THREE.Vector3();
    let processedMeshes = 0, processedVerts = 0;

    // Pentru fiecare mesh din mobilier, calculăm vertex AO
    STATE.furnitureGroup.traverse(mesh => {
      if(!mesh.isMesh || !mesh.geometry) return;
      const geo = mesh.geometry;
      const positions = geo.attributes.position;
      if(!positions) return;
      // Limită hard: vertice > 5000 → sărim (geometrii prea mari, GLB-uri cu mult detail)
      if(positions.count > 5000) return;

      const colors = new Float32Array(positions.count * 3);
      // Update world matrix pentru localToWorld corect
      mesh.updateWorldMatrix(true, false);
      for(let i = 0; i < positions.count; i++){
        tempV.fromBufferAttribute(positions, i);
        tempV.applyMatrix4(mesh.matrixWorld);

        let minDist = AO_MAX_DIST;
        for(let j = 0; j < allBoxes.length; j++){
          const entry = allBoxes[j];
          if(entry.mesh === mesh) continue;
          const dist = entry.box.distanceToPoint(tempV);
          if(dist < minDist){
            minDist = dist;
            if(minDist < 0.005) break; // foarte aproape — gata
          }
        }

        // AO mapping: dist=0 → AO_MIN_BRIGHTNESS; dist=AO_MAX_DIST → 1.0
        const t = Math.min(1, minDist / AO_MAX_DIST);
        // Curve mai natural — t² accentuează tranziția în colțuri
        const ao = AO_MIN_BRIGHTNESS + (1 - AO_MIN_BRIGHTNESS) * (t * t);
        colors[i*3+0] = ao;
        colors[i*3+1] = ao;
        colors[i*3+2] = ao;
        processedVerts++;
      }

      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const applyVColors = (m) => {
        if(!m) return;
        m.vertexColors = true;
        m.needsUpdate = true;
      };
      if(Array.isArray(mesh.material)) mesh.material.forEach(applyVColors);
      else applyVColors(mesh.material);
      processedMeshes++;
    });

    const dt = (performance.now() - t0).toFixed(0);
    console.log(`[VTour] ✅ Vertex AO baked: ${processedMeshes} mesh-uri, ${processedVerts} vertices (${dt}ms)`);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CONTACT SHADOWS — planuri soft sub fiecare piesă de mobilier
  // Efect "ground shadow" Matterport — mobilierul nu mai pare că plutește
  // ═════════════════════════════════════════════════════════════════════════
  function _addContactShadows(scene){
    if(!STATE.furnitureGroup) return;
    const THREE = window.THREE;
    if(STATE._shadowsGroup){
      if(STATE._shadowsGroup.parent) STATE._shadowsGroup.parent.remove(STATE._shadowsGroup);
      STATE._shadowsGroup = null;
    }
    // Generăm textura radial gradient o singură dată (cache)
    if(!STATE._shadowTexture){
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
      gradient.addColorStop(0, 'rgba(0,0,0,0.55)');
      gradient.addColorStop(0.4, 'rgba(0,0,0,0.3)');
      gradient.addColorStop(0.85, 'rgba(0,0,0,0.05)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      STATE._shadowTexture = new THREE.CanvasTexture(canvas);
      STATE._shadowTexture.needsUpdate = true;
    }
    const shadowMat = new THREE.MeshBasicMaterial({
      map: STATE._shadowTexture,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    STATE._shadowMat = shadowMat;

    const shadowsGroup = new THREE.Group();
    shadowsGroup._vtourGenerated = true;
    shadowsGroup.name = 'VTourContactShadows';

    const tempBox = new THREE.Box3();
    const tempSize = new THREE.Vector3();
    const tempCenter = new THREE.Vector3();
    let count = 0;

    // Pentru fiecare TOP-LEVEL child al furnitureGroup (sofa, pat, masă, etc.)
    STATE.furnitureGroup.children.forEach(child => {
      if(!child || !child.isObject3D) return;
      try {
        tempBox.setFromObject(child);
        if(!isFinite(tempBox.min.x)) return;
        tempBox.getSize(tempSize);
        // Sărim peste obiecte foarte mici sau foarte mari (planuri/podele/covorașe)
        if(tempSize.y < 0.15 || tempSize.y > 4) return;
        if(tempSize.x * tempSize.z < 0.05) return;
        tempBox.getCenter(tempCenter);
        const planeW = tempSize.x * 1.35;
        const planeD = tempSize.z * 1.35;
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(planeW, planeD), shadowMat);
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(tempCenter.x, tempBox.min.y + 0.003, tempCenter.z);
        plane.renderOrder = 1;
        shadowsGroup.add(plane);
        count++;
      } catch(e){}
    });

    scene.add(shadowsGroup);
    STATE._shadowsGroup = shadowsGroup;
    console.log(`[VTour] ✅ Contact shadows: ${count} piese mobilier`);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CUBECAMERA REFLECTION PROBES — reflexii reale per cameră (oglinzi, sticlă, metal)
  // Plasate la centrul fiecărei camere selectate, randate o singură dată la build.
  // Diferența vizibilă: oglinda din baie reflectă camera baiei, nu HDRI global.
  // ═════════════════════════════════════════════════════════════════════════
  function _setupCubeCameras(renderer, scene){
    if(!STATE._selectedRooms || !STATE._selectedRooms.length) return;
    if(!renderer || !scene) return;
    const THREE = window.THREE;
    if(!THREE.WebGLCubeRenderTarget || !THREE.CubeCamera) return;

    const probes = []; // pentru dispose la stop()
    const t0 = performance.now();

    // PMREM generator pentru a prefilter cubemap-urile (envMap corect pe toate roughness)
    let pmrem = null;
    if(THREE.PMREMGenerator){
      try {
        pmrem = new THREE.PMREMGenerator(renderer);
        pmrem.compileCubemapShader();
      } catch(e){
        console.warn('[VTour] PMREM cubemap compile fail:', e.message);
        pmrem = null;
      }
    }

    // Pasul 1: temporar ascundem elemente care nu trebuie capturate în reflexii
    const hidden = [];
    scene.traverse(o => {
      if(o._vtourHotspot !== undefined || o._vtourEntranceMarker || o._vtourLight){
        if(o.visible){ hidden.push(o); o.visible = false; }
      }
    });
    // Ascundem și contact shadows group (umbrele au depthWrite:false → artifact în reflexii)
    if(STATE._shadowsGroup && STATE._shadowsGroup.visible){
      STATE._shadowsGroup.visible = false;
      hidden.push(STATE._shadowsGroup);
    }

    // Pasul 2: pentru fiecare cameră, generăm un cubemap (apoi PMREM-filter)
    STATE._selectedRooms.forEach((room, i) => {
      try {
        const renderTarget = new THREE.WebGLCubeRenderTarget(256, {
          format: THREE.RGBAFormat,
          generateMipmaps: true,
          minFilter: THREE.LinearMipmapLinearFilter,
        });
        const cam = new THREE.CubeCamera(0.1, 100, renderTarget);
        cam.position.set(room.worldX, room.yBottom + 1.5, room.worldZ);
        scene.add(cam);
        cam.update(renderer, scene);
        scene.remove(cam);

        // PMREM pe cubemap → envMap care răspunde corect la roughness
        if(pmrem){
          const prefiltered = pmrem.fromCubemap(renderTarget.texture);
          room._envMap = prefiltered.texture;
          probes.push({ cam, renderTarget, prefilteredRT: prefiltered });
        } else {
          room._envMap = renderTarget.texture;
          probes.push({ cam, renderTarget });
        }
      } catch(e){
        console.warn('[VTour] CubeCamera fail room', i, ':', e.message);
      }
    });

    if(pmrem) pmrem.dispose();

    // Pasul 3: restaurăm vizibilitatea
    hidden.forEach(o => o.visible = true);

    // Pasul 4: aplicăm envMap pe materialele din fiecare cameră
    const furniture = STATE.furnitureGroup;
    if(furniture){
      const worldPos = new THREE.Vector3();
      let appliedCount = 0;
      furniture.traverse(mesh => {
        if(!mesh.isMesh) return;
        mesh.getWorldPosition(worldPos);
        for(const room of STATE._selectedRooms){
          if(!room._envMap) continue;
          const dx = Math.abs(worldPos.x - room.worldX);
          const dz = Math.abs(worldPos.z - room.worldZ);
          if(dx <= room.worldW/2 + 0.2 && dz <= room.worldD/2 + 0.2){
            const apply = (m) => {
              if(m && (m.isMeshStandardMaterial || m.isMeshPhysicalMaterial)){
                m.envMap = room._envMap;
                if(!m.envMapIntensity) m.envMapIntensity = 1.0;
                m.needsUpdate = true;
                appliedCount++;
              }
            };
            if(Array.isArray(mesh.material)) mesh.material.forEach(apply);
            else apply(mesh.material);
            break;
          }
        }
      });
      console.log(`[VTour] EnvMap aplicat pe ${appliedCount} materiale din mobilier`);
    }

    STATE._cubeCameraProbes = probes;
    const dt = (performance.now() - t0).toFixed(0);
    console.log(`[VTour] ✅ ${probes.length} CubeCamera reflection probes ${pmrem ? '(PMREM prefiltered)' : '(raw)'} — ${dt}ms`);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // LIGHTING SYSTEM — soare exterior + ambient + lumini interior per cameră
  // ═════════════════════════════════════════════════════════════════════════

  function _setupLights(scene){
    const THREE = window.THREE;
    STATE.extraLights.forEach(l => scene.remove(l));
    STATE.extraLights = [];

    // ── SOARE PRINCIPAL — direcțional, intens, shadow 4K
    const sun = new THREE.DirectionalLight(0xfff8e8, 3.0);
    sun.position.set(45, 80, 35);
    sun.castShadow = true;
    sun.shadow.mapSize.set(CFG.shadowMapSize, CFG.shadowMapSize);
    sun.shadow.camera.near = 0.5; sun.shadow.camera.far = 500;
    sun.shadow.camera.left = -80; sun.shadow.camera.right = 80;
    sun.shadow.camera.top = 80; sun.shadow.camera.bottom = -80;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;
    sun.shadow.radius = 4; // soft edges (PCFSoft)
    scene.add(sun);
    STATE.extraLights.push(sun);

    // ── HEMISFERIC — lumină ambient gradient cer/pământ (simulează GI)
    const hemi = new THREE.HemisphereLight(0x88bbff, 0x5a4838, 0.55);
    hemi.position.set(0, 50, 0);
    scene.add(hemi);
    STATE.extraLights.push(hemi);

    // ── FILL LIGHT (opus soarelui) — pentru umbre nu prea negre
    const fillCool = new THREE.DirectionalLight(0xb8d0ff, 0.35);
    fillCool.position.set(-40, 35, -30);
    scene.add(fillCool);
    STATE.extraLights.push(fillCool);

    // ── RIM LIGHT (top down) — accentuează muchiile, simulează sky dome
    const rim = new THREE.DirectionalLight(0xffffff, 0.18);
    rim.position.set(0, 60, 0);
    scene.add(rim);
    STATE.extraLights.push(rim);

    // Sync cu slider-ul "Ora soarelui" din UrbanX dacă există —
    // _v3dSetSunHour recalculează poziție/culoare/intensitate pe TOATE
    // DirectionalLights cu castShadow=true (inclusiv soarele meu)
    try {
      const slider = document.getElementById('v3d-sun-slider');
      if(slider && typeof window._v3dSetSunHour === 'function'){
        window._v3dSetSunHour(parseFloat(slider.value || '12'));
        console.log('[VTour] ✅ Soare sincronizat cu slider (ora:', slider.value, ')');
      }
    } catch(e){ /* slider-ul lipsește — ok, folosesc default */ }
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
      // Cu intrare detectată: 11 hotspots exterior pentru plimbare completă în jurul clădirii
      const r = Math.max(anchor.bW, anchor.bD) * 0.75; // raza de plimbare
      const ring = [
        { ang: 0,            label: 'Exterior · Față (S)' },
        { ang: Math.PI/4,    label: 'Exterior · Colț SE' },
        { ang: Math.PI/2,    label: 'Exterior · Lateral E' },
        { ang: 3*Math.PI/4,  label: 'Exterior · Colț NE' },
        { ang: Math.PI,      label: 'Exterior · Spate (N)' },
        { ang: 5*Math.PI/4,  label: 'Exterior · Colț NV' },
        { ang: 3*Math.PI/2,  label: 'Exterior · Lateral V' },
        { ang: 7*Math.PI/4,  label: 'Exterior · Colț SV' },
      ];
      ring.forEach(p => {
        const px = anchor.cx + Math.sin(p.ang) * r;
        const pz = anchor.cz + Math.cos(p.ang) * r;
        // Sărim dacă e prea aproape de "Stradă · Intrare" (deja are hotspot acolo)
        const distEntry = mainEntrance
          ? Math.hypot(px - (mainEntrance.worldX + mainEntrance.normalX * 6), pz - (mainEntrance.worldZ + mainEntrance.normalZ * 6))
          : 999;
        if(distEntry < 3) return;
        STATE.hotspots.push({
          x: px, y: baseY + STATE.eyeHeight, z: pz,
          label: p.label, kind: 'exterior', floorIdx: -1,
          lookAt: { x: anchor.cx, z: anchor.cz },
        });
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
    const prevFloor = STATE.currentFloorIdx;
    STATE.currentHotspot = hotspotIdx;
    STATE.currentFloorIdx = hp.floorIdx >= 0 ? hp.floorIdx : STATE.currentFloorIdx;
    const startPos = STATE.tourCam.position.clone();
    const endPos = new window.THREE.Vector3(hp.x, hp.y, hp.z);
    // Detectăm dacă schimbăm etajul → folosim arc pentru urcare/coborâre
    const floorChange = (hp.floorIdx >= 0 && hp.floorIdx !== prevFloor);
    // Yaw target — orientare spre lookAt dacă există (exterior cardinal) sau spre centru
    let targetYaw = STATE.yaw;
    if(hp.lookAt){
      const dx = hp.lookAt.x - hp.x;
      const dz = hp.lookAt.z - hp.z;
      targetYaw = Math.atan2(-dx, -dz);
    }
    const startYaw = STATE.yaw;
    let dYaw = targetYaw - startYaw;
    while(dYaw > Math.PI) dYaw -= Math.PI * 2;
    while(dYaw < -Math.PI) dYaw += Math.PI * 2;

    STATE.glide = {
      startPos, endPos, startYaw, dYaw,
      t0: performance.now(),
      dur: (floorChange ? 1.6 : CFG.glideDuration) * 1000, // mai lent la schimb etaj
      active: true,
      floorChange,
      arcHeight: floorChange ? Math.abs(endPos.y - startPos.y) * 0.35 : 0,
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
    // Arc parabolic pentru schimb etaj (simulează urcare/coborâre)
    if(g.floorChange && g.arcHeight > 0){
      const arc = Math.sin(e * Math.PI) * g.arcHeight;
      STATE.tourCam.position.y += arc;
    }
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

    // Detectăm dacă utilizatorul e în exterior (departe de orice perete) → speed boost
    const cur = STATE.tourCam.position.clone();
    const isExterior = (STATE.currentHotspot >= 0 &&
                       STATE.hotspots[STATE.currentHotspot] &&
                       STATE.hotspots[STATE.currentHotspot].kind === 'exterior');
    const speedMul = isExterior ? 2.0 : 1.0; // 2x mai rapid în exterior
    const speed = STATE.speed * speedMul * (k.shift ? STATE.runMul : 1.0);
    const yaw = STATE.yaw;
    const fwdX = -Math.sin(yaw), fwdZ = -Math.cos(yaw);
    const strX = Math.cos(yaw), strZ = -Math.sin(yaw);
    const dx = (fwdX * forward + strX * strafe) * speed * dt;
    const dz = (fwdZ * forward + strZ * strafe) * speed * dt;

    const desired = cur.clone(); desired.x += dx; desired.z += dz;
    const newPos = _checkCollision(cur, desired);
    STATE.tourCam.position.x = newPos.x;
    STATE.tourCam.position.z = newPos.z;
    // Y rămâne la eyeHeight peste floor curent
    if(STATE._anchor && STATE._aedisCache && !isExterior){
      const af = STATE._aedisCache.floors[STATE.currentFloorIdx];
      if(af) STATE.tourCam.position.y = STATE._anchor.baseY + af.baseY + STATE.eyeHeight;
    } else if(STATE._anchor && isExterior){
      // În exterior: rămâne la nivel sol
      STATE.tourCam.position.y = STATE._anchor.baseY + STATE.eyeHeight;
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
      // SSAO — soft ambient occlusion pentru detalii în colțuri/sub mobilier
      if(CFG.enableSSAO && THREE.SSAOPass){
        const ssao = new THREE.SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
        ssao.kernelRadius = 16;           // raza mai mare → AO mai vizibil în interior
        ssao.minDistance = 0.001;
        ssao.maxDistance = 0.15;
        ssao.output = THREE.SSAOPass.OUTPUT.Default;
        composer.addPass(ssao);
      }
      // Bloom — glow subtil pe emisive (lustre, TV, lampe) — efect cinematic
      if(CFG.enableBloom && THREE.UnrealBloomPass){
        const bloom = new THREE.UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0.25,  // intensity (sub 0.3 = subtil, nu spalat)
          0.7,   // radius
          0.92,  // threshold (numai cele mai luminoase pixeli intră în bloom)
        );
        composer.addPass(bloom);
      }
      // BokehPass DOF — focus dinamic pe direcția de privire (efect Matterport real)
      if(THREE.BokehPass){
        try {
          const bokeh = new THREE.BokehPass(scene, camera, {
            focus: 3.5,           // distanța inițială focus (update dinamic în loop)
            aperture: 0.00025,    // aperture mic = blur subtil (0.0001=foarte subtil, 0.001=blur evident)
            maxblur: 0.012,       // limita blur maxim
            width: window.innerWidth,
            height: window.innerHeight,
          });
          composer.addPass(bokeh);
          STATE._bokehPass = bokeh;
          console.log('[VTour] ✅ BokehPass DOF activat (focus dinamic)');
        } catch(e){
          console.warn('[VTour] BokehPass setup failed:', e.message);
        }
      }
      // Vignette + film grain — touch cinematic final (după bloom)
      if(THREE.ShaderPass){
        const cinematicShader = {
          uniforms: {
            tDiffuse:        { value: null },
            time:            { value: 0.0 },
            vignetteAmount:  { value: 1.15 },
            vignetteOffset:  { value: 1.0 },
            grainAmount:     { value: 0.045 },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float time;
            uniform float vignetteAmount;
            uniform float vignetteOffset;
            uniform float grainAmount;
            varying vec2 vUv;
            float rand(vec2 co){
              return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
            }
            void main() {
              vec4 color = texture2D(tDiffuse, vUv);
              // Vignette — darken corners (smoothstep pentru tranziție soft)
              vec2 centered = vUv - 0.5;
              float dist = length(centered);
              float vignette = smoothstep(0.85, 0.35 / vignetteAmount, dist) * vignetteOffset
                             + (1.0 - vignetteOffset);
              color.rgb *= vignette;
              // Film grain — noise per frame
              float grain = (rand(vUv + fract(time * 0.001)) - 0.5) * grainAmount;
              color.rgb += grain;
              // ușor lift pe negre (efect cinematic)
              color.rgb = color.rgb * 0.98 + 0.012;
              gl_FragColor = color;
            }
          `,
        };
        const cinematicPass = new THREE.ShaderPass(cinematicShader);
        cinematicPass._isCinematic = true;
        composer.addPass(cinematicPass);
        STATE._cinematicPass = cinematicPass; // pentru update time în loop
      }
      console.log('[VTour] ✅ Composer cu SSAO + Bloom + Vignette/Grain activate');
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
        // Update time pe ShaderPass cinematic pentru grain animat
        if(STATE._cinematicPass && STATE._cinematicPass.uniforms.time){
          STATE._cinematicPass.uniforms.time.value = now;
        }
        // Update focus DOF dinamic (throttle la 4Hz pentru performanță — raycast e scump)
        if(STATE._bokehPass && (!STATE._lastFocusUpdate || now - STATE._lastFocusUpdate > 250)){
          STATE._lastFocusUpdate = now;
          try {
            const THREE = window.THREE;
            if(!STATE._focusRay) STATE._focusRay = new THREE.Raycaster();
            const ray = STATE._focusRay;
            const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(STATE.tourCam.quaternion);
            ray.set(STATE.tourCam.position, dir);
            ray.far = 50;
            // Intersect cu mesh-urile relevante (interior + furniture)
            const targets = [];
            if(STATE.interiorGroup) targets.push(STATE.interiorGroup);
            if(STATE.furnitureGroup) targets.push(STATE.furnitureGroup);
            if(STATE.roofGroup) targets.push(STATE.roofGroup);
            if(targets.length){
              const hits = ray.intersectObjects(targets, true);
              if(hits.length){
                // Focus la prima intersecție vizibilă (ignoră hotspots)
                const hit = hits.find(h => !h.object._vtourHotspot && !h.object._vtourLight);
                if(hit && STATE._bokehPass.uniforms.focus){
                  // Lerp pentru tranziție smooth (10% per update)
                  const current = STATE._bokehPass.uniforms.focus.value;
                  STATE._bokehPass.uniforms.focus.value = current * 0.85 + hit.distance * 0.15;
                }
              }
            }
          } catch(e){ /* silent */ }
        }
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
            await new Promise(r => setTimeout(r, 1200)); // așteptăm finalizare + render
            // Verificăm dacă releveul s-a generat MĂCAR PARȚIAL OK
            const goodReleveu = window._RV && Array.isArray(window._RV.floors) &&
                                window._RV.floors.length > 0 &&
                                window._RV.floors[0] && Array.isArray(window._RV.floors[0].rects) &&
                                window._RV.floors[0].rects.length > 2;
            if(!goodReleveu){
              _showInfoToast('⚠ Releveu incomplet',
                'Generarea automată a întâmpinat probleme (vezi consola). Continuăm cu tur exterior + interior parțial.');
              await new Promise(r => setTimeout(r, 1500));
            }
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

    // 8. Mobilier (await — așteaptă încărcarea modelelor GLB)
    await _buildFurniture(V3D.scene, anchor, aedisModel);
    _setLoadingProgress(76, 'Calculez vertex AO…');

    // 8.4 Vertex AO proximity — darkening în colțuri/sub mobilier
    _bakeProximityAO();
    _setLoadingProgress(78, 'Adaug umbre contact…');

    // 8.5 Contact shadows sub mobilier (efect Matterport ground shadow)
    _addContactShadows(V3D.scene);
    _setLoadingProgress(80, 'Construiesc acoperișul…');

    // 9. Acoperiș
    _buildRoof(V3D.scene, anchor, aedisModel);
    _setLoadingProgress(85, 'Calculez reflexii fotorealiste…');

    // 9.5 CubeCamera reflection probes — reflexii reale per cameră (oglinzi, sticlă, metal)
    _setupCubeCameras(V3D.r, V3D.scene);
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

    // 14. Tone mapping pe renderer (ACES Filmic — standard cinematic)
    V3D.r.toneMapping = THREE.ACESFilmicToneMapping;
    V3D.r.toneMappingExposure = 1.15;
    V3D.r.outputEncoding = THREE.sRGBEncoding;
    V3D.r.shadowMap.enabled = true;
    V3D.r.shadowMap.type = THREE.PCFSoftShadowMap;
    V3D.r.physicallyCorrectLights = true; // intensitate fizic corectă
    // Salvăm stat-ul anterior ca să restaurăm la stop()
    STATE._rendererState = {
      toneMapping: V3D.r.toneMapping,
      toneMappingExposure: V3D.r.toneMappingExposure,
      outputEncoding: V3D.r.outputEncoding,
      shadowEnabled: V3D.r.shadowMap.enabled,
      physicallyCorrectLights: V3D.r.physicallyCorrectLights,
    };

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
      _showStartHint();
    }, 400);
    console.log('[VTour] ✅ START complet');
  }

  // Hint mare în centrul ecranului — "Click pentru a începe"
  function _showStartHint(){
    if(document.getElementById('vtour-start-hint')) return;
    const hint = document.createElement('div');
    hint.id = 'vtour-start-hint';
    hint.style.cssText = `
      position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
      background:rgba(0,0,0,.85);color:white;padding:18px 30px;border-radius:50px;
      z-index:99;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      font-size:15px;font-weight:700;letter-spacing:.5px;pointer-events:none;
      border:1px solid rgba(0,255,136,.4);backdrop-filter:blur(12px);
      box-shadow:0 8px 32px rgba(0,0,0,.6);
      animation:vtourPulse 1.6s ease-in-out infinite;
    `;
    hint.innerHTML = '🖱️ Click pe scenă pentru a începe navigarea (WASD + Mouse)';
    STATE.overlay.appendChild(hint);
    // Adăugăm și keyframe animation
    if(!document.getElementById('vtour-styles')){
      const style = document.createElement('style');
      style.id = 'vtour-styles';
      style.textContent = `
        @keyframes vtourPulse {
          0%,100% { opacity: 0.85; transform: translate(-50%,-50%) scale(1); }
          50%     { opacity: 1; transform: translate(-50%,-50%) scale(1.03); }
        }
      `;
      document.head.appendChild(style);
    }
    // Auto-dismiss la primul click sau după 8s
    const dismiss = () => {
      hint.style.opacity = '0';
      hint.style.transition = 'opacity .4s';
      setTimeout(() => hint.remove(), 500);
      document.removeEventListener('click', dismiss);
    };
    document.addEventListener('click', dismiss, { once: true });
    setTimeout(dismiss, 8000);
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

    // CubeCamera reflection probes — dispose render targets + PMREM prefiltered
    if(STATE._cubeCameraProbes){
      STATE._cubeCameraProbes.forEach(p => {
        try {
          if(p.renderTarget) p.renderTarget.dispose();
          if(p.prefilteredRT) p.prefilteredRT.dispose();
        } catch(e){}
      });
      STATE._cubeCameraProbes = null;
    }
    if(STATE._selectedRooms){
      STATE._selectedRooms.forEach(r => { r._envMap = null; });
      STATE._selectedRooms = null;
    }

    // Contact shadows — dispose group + texture + material
    if(STATE._shadowsGroup){
      if(STATE._shadowsGroup.parent) STATE._shadowsGroup.parent.remove(STATE._shadowsGroup);
      STATE._shadowsGroup.traverse(o => {
        if(o.geometry) o.geometry.dispose();
      });
      STATE._shadowsGroup = null;
    }
    if(STATE._shadowMat){
      STATE._shadowMat.dispose();
      STATE._shadowMat = null;
    }
    if(STATE._shadowTexture){
      STATE._shadowTexture.dispose();
      STATE._shadowTexture = null;
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
    STATE._cinematicPass = null;
    STATE._bokehPass = null;
    STATE._focusRay = null;

    // Restore renderer state (tone mapping etc.)
    if(renderer && STATE._rendererState){
      try {
        renderer.toneMapping = STATE._rendererState.toneMapping;
        renderer.toneMappingExposure = STATE._rendererState.toneMappingExposure;
        renderer.outputEncoding = STATE._rendererState.outputEncoding;
        renderer.physicallyCorrectLights = STATE._rendererState.physicallyCorrectLights;
      } catch(e){}
      STATE._rendererState = null;
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
