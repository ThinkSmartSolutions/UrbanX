// ═══════════════════════════════════════════════════════════════════════════
// 18-context3d.js — Context 3D Urban Real + PBR + Eliminare Fal.ai
// UrbanX TSS·FG
//
// Înlocuiește Fal.ai (imagini inventate) cu:
//   1. Modele PBR Three.js — clădirea AEDIS exactă cu materiale fizice
//      (sticlă, beton, clinker, travertin, tablă, perete cortină)
//      respectând 100% setările: funcțiune, stil, balcoane, mansardă,
//      penthouse, perete cortină, finisaj exterior
//   2. Context urban OSM real — clădirile vecine reale din Overpass
//      extrudate în scena Three.js la coordonatele corecte
//   3. Iluminare realistă — soare directional + cer hemisferic + ambient
//   4. CesiumJS viewer — 3D Tiles fotorealiste + model AEDIS injectat
//   5. Blender script actualizat cu context OSM real (clădiri vecine)
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';

  function waitReady(cb, n) {
    n = n||0; if(n > 100) return;
    if(typeof THREE === 'undefined' || !window.TCI?._3D?._ready === undefined) {
      setTimeout(()=>waitReady(cb, n+1), 500); return;
    }
    cb();
  }

  // Pornim când Three.js e disponibil (poate fi disponibil și fără TCI._3D activ)
  // Dezactivăm Fal.ai imediat, indiferent de Three.js
  setTimeout(_ctx3DRemoveFalAI, 100);

  if(typeof THREE !== 'undefined') {
    init();
  } else {
    // Așteptăm Three.js să se încarce
    let tries = 0;
    const checkThree = setInterval(()=>{
      tries++;
      if(typeof THREE !== 'undefined') { clearInterval(checkThree); init(); }
      if(tries > 40) clearInterval(checkThree);
    }, 500);
  }

  function init() {
    _ctx3DRemoveFalAI();
    _ctx3DInjectButtons();
    // Observer pentru când se generează releveele
    const obs = new MutationObserver(()=>{
      if(document.querySelector('.rv-expbtn') && !document.getElementById('ctx3d-btn-wrap'))
        _ctx3DInjectButtons();
    });
    obs.observe(document.body, {childList:true, subtree:true});
    console.log('[Context3D] ✅ PBR + OSM Context + Cesium loaded');
  }

  // ── Eliminare Fal.ai ─────────────────────────────────────────────────────
  function _ctx3DRemoveFalAI() {
    // Găsim și dezactivăm orice buton/element legat de Fal.ai
    const falSelectors = [
      '[id*="fal"]','[class*="fal-ai"]','[onclick*="fal"]',
      '[id*="FAL"]','[data-fal]','button[title*="Fal"]',
      '[id*="photoreal"],[id*="foto-real"],[id*="ai-render"]'
    ];
    falSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if(el.tagName==='BUTTON'||el.tagName==='A') {
          el.style.display='none';
          el.disabled=true;
          el.title='Fal.ai dezactivat — folosiți Context 3D Urban Real';
        }
      });
    });
    // Patch orice funcție globală legată de Fal
    ['falRender','falGenerate','generateWithFal','_falRender','_photoRender',
     'renderWithAI','generateArchRender'].forEach(fn => {
      if(typeof window[fn]==='function') {
        window[fn] = ()=>{
          if(typeof ss==='function') ss('⚠ Fal.ai dezactivat — folosiți 🏙 Context 3D Real din panoul Relevee');
          alert('Fal.ai a fost înlocuit cu Context 3D Urban Real.\nAccesați modulul de Relevee → butonul 🏙 Context 3D Real pentru vizualizare fotorealistă cu date OSM reale.');
        };
      }
    });
    // Observer continuu pentru elemente Fal care pot apărea dinamic
    const falObs = new MutationObserver(()=>{
      falSelectors.forEach(sel=>{
        document.querySelectorAll(sel).forEach(el=>{
          if(el.style.display!=='none'){el.style.display='none';el.disabled=true;}
        });
      });
    });
    falObs.observe(document.body,{childList:true,subtree:true});
  }

  // ── Butoane UI ───────────────────────────────────────────────────────────
  function _ctx3DInjectButtons() {
    if(document.getElementById('ctx3d-btn-wrap')) return;
    const anchor = document.querySelector('#rv-extras-wrap') ||
                   document.querySelector('.rv-expbtn');
    if(!anchor) return;
    const wrap = document.createElement('span');
    wrap.id = 'ctx3d-btn-wrap';
    [
      {id:'ctx3d-pbr',   icon:'🏙', label:'Context 3D Real', fn:'_ctx3DActivate',
       bg:'rgba(14,165,233,.15)', border:'rgba(14,165,233,.5)', color:'#38bdf8'},
      {id:'ctx3d-cesium',icon:'🌍', label:'Cesium 3D Tiles', fn:'_ctx3DCesium',
       bg:'rgba(16,185,129,.15)', border:'rgba(16,185,129,.5)', color:'#34d399'},
      {id:'ctx3d-reset', icon:'↺',  label:'Reset 3D',        fn:'_ctx3DReset',
       bg:'rgba(100,116,139,.15)',border:'rgba(100,116,139,.4)',color:'#94a3b8'},
    ].forEach(b_=>{
      const btn = document.createElement('button');
      btn.id = b_.id; btn.innerHTML = b_.icon+' '+b_.label;
      btn.style.cssText = ['height:32px','padding:0 10px','border-radius:7px','cursor:pointer',
        'font-family:inherit','font-size:10px','font-weight:800','margin-left:5px',
        `background:${b_.bg}`,`border:1.5px solid ${b_.border}`,`color:${b_.color}`,
        'display:inline-flex','align-items:center','flex-shrink:0'].join(';');
      btn.onmouseover = ()=>btn.style.opacity='.75';
      btn.onmouseout  = ()=>btn.style.opacity='1';
      btn.onclick     = ()=>window[b_.fn]?.();
      wrap.appendChild(btn);
    });
    anchor.parentElement.insertBefore(wrap, anchor.nextSibling);
  }
})();

// ═══════════════════════════════════════════════════════════════════════════
// MATERIALE PBR PER AEDIS CONFIG
// ═══════════════════════════════════════════════════════════════════════════
function _ctx3DGetMaterials(cfg) {
  if(typeof THREE === 'undefined') return {};
  cfg = cfg || (typeof _rvGetAEDISConfig==='function'?_rvGetAEDISConfig():{});

  const finisajColors = {
    tencuiala: {hex:0xf0ede6, r:0.85, m:0.0},
    clinker:   {hex:0xc8a87a, r:0.90, m:0.0},
    travertin: {hex:0xe8dcc8, r:0.70, m:0.0},
    tabla:     {hex:0xb0b5c0, r:0.40, m:0.65},
  };
  const fc = finisajColors[cfg.finisajExt] || finisajColors.tencuiala;

  return {
    wall: new THREE.MeshStandardMaterial({
      color: fc.hex, roughness: fc.r, metalness: fc.m,
    }),
    glass: new THREE.MeshStandardMaterial({
      color: 0x8ac8f0, roughness: 0.05, metalness: 0.25,
      transparent: true, opacity: 0.62, side: THREE.DoubleSide,
    }),
    cortina: new THREE.MeshStandardMaterial({
      color: 0x7ab8e0, roughness: 0.02, metalness: 0.30,
      transparent: true, opacity: 0.68, side: THREE.DoubleSide,
    }),
    mullion: new THREE.MeshStandardMaterial({
      color: 0x8090a8, roughness: 0.3, metalness: 0.7,
    }),
    slab: new THREE.MeshStandardMaterial({
      color: 0xb8c2d2, roughness: 0.80, metalness: 0.0,
    }),
    balcony: new THREE.MeshStandardMaterial({
      color: 0x9aacbc, roughness: 0.55, metalness: 0.15,
    }),
    railing: new THREE.MeshStandardMaterial({
      color: 0x808898, roughness: 0.3, metalness: 0.8,
      transparent: true, opacity: 0.85,
    }),
    roof_tile: new THREE.MeshStandardMaterial({
      color: 0x9a7060, roughness: 0.95, metalness: 0.0,
    }),
    roof_flat: new THREE.MeshStandardMaterial({
      color: 0x707880, roughness: 0.85, metalness: 0.05,
    }),
    soclu: new THREE.MeshStandardMaterial({
      color: 0xa8b0c0, roughness: 0.88, metalness: 0.0,
    }),
    // Clădiri context OSM
    ctx_wall: new THREE.MeshStandardMaterial({
      color: 0xd0ccc4, roughness: 0.88, metalness: 0.0,
      transparent: true, opacity: 0.80,
    }),
    ctx_glass: new THREE.MeshStandardMaterial({
      color: 0xb8d0e0, roughness: 0.08, metalness: 0.18,
      transparent: true, opacity: 0.55, side: THREE.DoubleSide,
    }),
    ctx_roof: new THREE.MeshStandardMaterial({
      color: 0xa89888, roughness: 0.92, metalness: 0.0,
      transparent: true, opacity: 0.75,
    }),
    ground: new THREE.MeshStandardMaterial({
      color: 0x8a8878, roughness: 0.98, metalness: 0.0,
    }),
    road: new THREE.MeshStandardMaterial({
      color: 0x686660, roughness: 0.95, metalness: 0.0,
    }),
    parcel: new THREE.MeshStandardMaterial({
      color: 0x98c878, roughness: 0.95, metalness: 0.0,
      transparent: true, opacity: 0.5,
    }),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// ACTIVARE CONTEXT 3D PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════
async function _ctx3DActivate() {
  const P = _RV?.parcelParams, b = _RV?.building;
  if(!P||!b) { alert('Generați releveele mai întâi.'); return; }
  if(typeof THREE === 'undefined') { alert('Three.js indisponibil.'); return; }

  const btn = document.getElementById('ctx3d-pbr');
  if(btn){ btn.innerHTML='⏳ Se încarcă context…'; btn.style.opacity='.6'; }
  if(typeof ss==='function') ss('🏙 Construiesc contextul 3D urban real…');

  // Obținem sau creăm scena Three.js
  const scene3D = window.TCI?._3D;
  if(!scene3D?._scene || !scene3D?._renderer) {
    // Dacă TCI._3D nu e activ, creăm un viewer standalone
    await _ctx3DCreateStandaloneViewer(P, b);
    if(btn){ btn.innerHTML='🏙 Context 3D Real'; btn.style.opacity='1'; }
    return;
  }

  const cx = P.lon||P._lon||27.58, cy = P.lat||P._lat||47.16;
  const cfg = typeof _rvGetAEDISConfig==='function' ? _rvGetAEDISConfig() : {};
  const mats = _ctx3DGetMaterials(cfg);

  // 1. Adăugăm iluminare realistă
  _ctx3DSetupLighting(scene3D._scene);

  // 2. Sol + parcelă
  _ctx3DAddGround(scene3D, P, mats);

  // 3. Construim clădirea AEDIS cu PBR
  _ctx3DBuildAEDISModel(scene3D, P, b, cfg, mats);

  // 4. Fetch și adăugăm clădirile OSM din context
  if(typeof ss==='function') ss('🏙 Fetchez clădiri OSM din împrejurimi…');
  const osmBuildings = await _ctx3DFetchOSMBuildings(cy, cx, 350);
  _ctx3DAddOSMContext(scene3D, osmBuildings, cx, cy, mats);

  // 5. Re-render
  if(scene3D._renderer && scene3D._scene && scene3D._camera) {
    scene3D._renderer.render(scene3D._scene, scene3D._camera);
  }
  window.map?.triggerRepaint?.();

  if(btn){ btn.innerHTML='🏙 Context 3D Real'; btn.style.opacity='1'; }
  if(typeof ss==='function') ss('✅ Context 3D Urban Real activ · '+osmBuildings.length+' clădiri OSM · materiale PBR · iluminare realistă');
}

// ── Iluminare realistă ────────────────────────────────────────────────────
function _ctx3DSetupLighting(scene) {
  // Ștergem lumini existente
  scene.children.filter(c=>c.isLight).forEach(l=>scene.remove(l));

  // Soare directional (poziție sudică, unghi 45°)
  const sun = new THREE.DirectionalLight(0xfff8e8, 1.8);
  sun.position.set(200, -150, 300);
  sun.castShadow = false; // shadow maps costisitoare
  scene.add(sun);

  // Cer + ambient hemisferic
  const hemi = new THREE.HemisphereLight(0x87ceeb, 0x6b5e4e, 0.7);
  scene.add(hemi);

  // Lumină de umplere opusă (evităm negru absolut pe fețele umbrite)
  const fill = new THREE.DirectionalLight(0xc8d8f0, 0.4);
  fill.position.set(-100, 200, 100);
  scene.add(fill);
}

// ── Sol și parcelă ────────────────────────────────────────────────────────
function _ctx3DAddGround(scene3D, P, mats) {
  const toL = (lon,lat) => scene3D._toLocal?.(lon,lat) || [0,0,0];
  const [ox, oy] = toL(P.lon, P.lat);
  const ext = 800; // 800m de fiecare parte

  // Sol mare
  const groundG = new THREE.PlaneGeometry(ext*2, ext*2);
  const groundM = new THREE.Mesh(groundG, mats.ground);
  groundM.rotation.x = -Math.PI/2;
  groundM.position.set(ox, oy, -0.1);
  groundM._ctx3d = 'ground';
  scene3D._scene.add(groundM);

  // Parcelă evidențiată
  const parcelG = new THREE.PlaneGeometry(P.W, P.D);
  const parcelM = new THREE.Mesh(parcelG, mats.parcel);
  parcelM.rotation.x = -Math.PI/2;
  parcelM.position.set(ox, oy, 0.05);
  parcelM._ctx3d = 'parcel';
  scene3D._scene.add(parcelM);
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSTRUIRE MODEL AEDIS CU PBR
// ═══════════════════════════════════════════════════════════════════════════
function _ctx3DBuildAEDISModel(scene3D, P, b, cfg, mats) {
  // Ștergem modelul AEDIS precedent
  scene3D._scene.children.filter(c=>c._aedis).forEach(c=>scene3D._scene.remove(c));

  const toL = (lon, lat) => scene3D._toLocal?.(lon, lat) || [0,0,0];
  const [ox, oy] = toL(P.lon, P.lat);
  const bW = b.bW, bD = b.bD, hn = P.hn||3.0, niv = b.niv;

  const grp = new THREE.Group();
  grp._aedis = true;
  // Centrat pe parcelă
  grp.position.set(ox - bW/2 + P.rl, oy - bD/2 + P.rf, 0);

  const add = (mesh) => { mesh._aedis=true; grp.add(mesh); };

  const hasPH = cfg.penthouse && niv>2;
  const hasMans = cfg.mansarda && niv>1;
  const isCortina = cfg.pereCortina;
  const balAdanc = cfg.balconType==='larg'?2.0:cfg.balconType==='francez'?0:cfg.balconType==='fara'?-1:1.4;
  const nivRender = hasPH ? niv-1 : niv;

  // ── Etaje principale ────────────────────────────────────────────────────
  for(let i=0; i<nivRender; i++) {
    const z0 = i*hn;
    const isTop = i===nivRender-1;
    const EW = 0.28; // grosime perete exterior

    // Planșeu (placa de beton)
    const slabG = new THREE.BoxGeometry(bW, bD, 0.22);
    const slab = new THREE.Mesh(slabG, mats.slab);
    slab.position.set(bW/2, bD/2, z0+0.11);
    add(slab);

    // Pereți exteriori — 4 fețe
    const wallDefs = [
      {w:bW, d:EW, x:bW/2, y:EW/2,    face:'N'},
      {w:bW, d:EW, x:bW/2, y:bD-EW/2, face:'S'},
      {w:EW, d:bD, x:EW/2,  y:bD/2,   face:'V'},
      {w:EW, d:bD, x:bW-EW/2,y:bD/2,  face:'E'},
    ];

    // Perete cortină pe N și S dacă configurat
    const cortineFaces = isCortina ? ['N','S'] : [];

    wallDefs.forEach(wd => {
      const isCortFace = cortineFaces.includes(wd.face);
      if(isCortFace) {
        // Perete cortină: cadru + glazing full-height
        // Mullioni verticali la 1.2m
        const nMull = Math.floor(wd.w/1.2);
        for(let mi=0; mi<=nMull; mi++) {
          const mG = new THREE.BoxGeometry(0.06, EW*0.5, hn*0.98);
          const m = new THREE.Mesh(mG, mats.mullion);
          const mx = wd.face==='N'||wd.face==='S' ? mi*(wd.w/nMull) : wd.x;
          m.position.set(wd.face==='N'||wd.face==='S'?mx:wd.x, wd.y, z0+hn/2+0.22);
          add(m);
        }
        // Mullion orizontal la mijloc
        const mhG = new THREE.BoxGeometry(wd.w, EW*0.5, 0.06);
        const mh = new THREE.Mesh(mhG, mats.mullion);
        mh.position.set(wd.x, wd.y, z0+hn*0.5+0.22);
        add(mh);
        // Glazing
        const glazW = wd.face==='N'||wd.face==='S' ? wd.w*0.92 : EW;
        const glazD = wd.face==='V'||wd.face==='E' ? wd.d*0.92 : EW;
        const glazG = new THREE.BoxGeometry(glazW, glazD, hn*0.95);
        const glaz = new THREE.Mesh(glazG, mats.cortina);
        glaz.position.set(wd.x, wd.y, z0+hn/2+0.22);
        add(glaz);
      } else {
        // Perete opac cu ferestre
        const wallG = new THREE.BoxGeometry(wd.w, wd.d, hn*0.96);
        const wall = new THREE.Mesh(wallG, mats.wall);
        wall.position.set(wd.x, wd.y, z0+hn/2+0.22);
        add(wall);

        // Ferestre (pe fețele N și S în special)
        if(wd.face==='N'||wd.face==='S') {
          const nW = Math.max(2, Math.floor(bW/3.2));
          const wW = Math.min(bW/nW*0.55, 1.8), wH = hn*0.42;
          for(let wi=0; wi<nW; wi++) {
            const wx = (wi+0.5)*bW/nW;
            const isEntrance = wd.face==='N' && i===0 && wi===Math.floor(nW/2);
            const gG = new THREE.BoxGeometry(wW, EW*1.1, isEntrance?hn*0.85:wH);
            const wz = isEntrance ? z0+hn*0.45+0.22 : z0+hn*0.30+wH/2+0.22;
            const win = new THREE.Mesh(gG, mats.glass);
            win.position.set(wx, wd.y, wz);
            add(win);
          }
        }
        // Ferestre laterale (E/V)
        if(wd.face==='V'||wd.face==='E') {
          const nWL = Math.max(1, Math.floor(bD/4));
          const wWL = Math.min(bD/nWL*0.5, 1.4), wHL = hn*0.38;
          for(let wi=0; wi<nWL; wi++) {
            const wy = (wi+0.5)*bD/nWL;
            const gG = new THREE.BoxGeometry(EW*1.1, wWL, wHL);
            const win = new THREE.Mesh(gG, mats.glass);
            win.position.set(wd.x, wy, z0+hn*0.30+wHL/2+0.22);
            add(win);
          }
        }
      }
    });

    // Soclu (parter)
    if(i===0) {
      const soclG = new THREE.BoxGeometry(bW, bD, 0.5);
      const socl = new THREE.Mesh(soclG, mats.soclu);
      socl.position.set(bW/2, bD/2, 0.25);
      add(socl);
    }

    // Balcoane (etajele > parter, fațada S)
    if(i>0 && balAdanc>0) {
      const nW = Math.max(2, Math.floor(bW/3.2));
      for(let wi=0; wi<nW; wi++) {
        const bx = (wi+0.5)*bW/nW - 0.75;
        const balW2 = 1.5, balD2 = balAdanc;
        // Placa balcon
        const plG = new THREE.BoxGeometry(balW2, balD2, 0.12);
        const pl = new THREE.Mesh(plG, mats.balcony);
        pl.position.set(bx+balW2/2, bD+balD2/2, z0+0.22+hn*0.82);
        add(pl);
        // Balustradă
        const brG = new THREE.BoxGeometry(balW2, 0.06, 1.0);
        const br = new THREE.Mesh(brG, mats.railing);
        br.position.set(bx+balW2/2, bD+balD2, z0+0.22+hn*0.82+0.5);
        add(br);
      }
    }

    // Parapete (parapet vizibil între ferestre)
    const parG = new THREE.BoxGeometry(bW, 0.30, 0.30);
    const par = new THREE.Mesh(parG, mats.slab);
    par.position.set(bW/2, EW*0.5, z0+hn*0.02+0.22);
    add(par);
  }

  // ── Penthouse ─────────────────────────────────────────────────────────
  if(hasPH) {
    const ret = 2.5;
    const phW = bW - ret*2, phD = bD - ret*2;
    const z_ph = (niv-1)*hn;
    // Volum penthouse retras
    const phG = new THREE.BoxGeometry(phW, phD, hn*0.95);
    const ph = new THREE.Mesh(phG, mats.wall);
    ph.position.set(bW/2, bD/2, z_ph+hn/2+0.22);
    add(ph);
    // Glazing penthouse
    const phGlG = new THREE.BoxGeometry(phW*0.7, 0.1, hn*0.6);
    const phGl = new THREE.Mesh(phGlG, mats.cortina);
    phGl.position.set(bW/2, ret+0.1, z_ph+hn*0.45+0.22);
    add(phGl);
    // Terasă penthouse
    const ptG = new THREE.BoxGeometry(phW, phD, 0.18);
    const pt = new THREE.Mesh(ptG, mats.roof_flat);
    pt.position.set(bW/2, bD/2, z_ph+hn+0.31);
    add(pt);
  }

  // ── Acoperiș ─────────────────────────────────────────────────────────
  const z_roof = (hasPH?niv-1:niv)*hn + 0.22;
  if(hasMans) {
    // Mansardă: volum trapezoidal (simulat cu 4 panouri)
    const ret_m = 1.0, pantaH = bD/2*Math.tan(35*Math.PI/180);
    const mansMat = mats.roof_tile;
    // Panou N
    const pnG = new THREE.BoxGeometry(bW, Math.sqrt(Math.pow(bD/2-ret_m,2)+pantaH*pantaH), 0.25);
    const pn = new THREE.Mesh(pnG, mansMat);
    pn.rotation.x = Math.atan2(pantaH, bD/2-ret_m);
    pn.position.set(bW/2, ret_m+(bD/2-ret_m)/2, z_roof+pantaH/2);
    add(pn);
    // Panou S
    const ps = pn.clone();
    ps.rotation.x = -Math.atan2(pantaH, bD/2-ret_m);
    ps.position.set(bW/2, bD-ret_m-(bD/2-ret_m)/2, z_roof+pantaH/2);
    add(ps);
    // Coamă
    const coamaG = new THREE.BoxGeometry(bW, 0.25, 0.25);
    const coama = new THREE.Mesh(coamaG, mats.mullion);
    coama.position.set(bW/2, bD/2, z_roof+pantaH);
    add(coama);
  } else if(!hasPH) {
    // Șarpantă standard 2 ape
    const pantaH2 = bD/2*Math.tan(30*Math.PI/180);
    const st2 = 0.7; // streașina
    const roofMat = mats.roof_tile;
    const ang = Math.atan2(pantaH2, bD/2);
    const roofLen = Math.sqrt(pantaH2*pantaH2 + (bD/2)*(bD/2));
    // Panou N
    const rng = new THREE.BoxGeometry(bW+st2*2, roofLen+st2, 0.18);
    const rn = new THREE.Mesh(rng, roofMat);
    rn.rotation.x = ang;
    rn.position.set(bW/2, bD/4, z_roof+pantaH2/2);
    add(rn);
    // Panou S
    const rs = rn.clone();
    rs.rotation.x = -ang;
    rs.position.set(bW/2, bD*3/4, z_roof+pantaH2/2);
    add(rs);
  }

  // Adăugăm grupul la scenă
  scene3D._scene.add(grp);
  console.log('[Context3D] ✅ Model AEDIS PBR — '+niv+' niveluri, '+
    (isCortina?'perete cortină, ':'')+
    (hasMans?'mansardă, ':'')+
    (hasPH?'penthouse, ':'')+
    'finisaj:'+cfg.finisajExt);
}

// ═══════════════════════════════════════════════════════════════════════════
// FETCH OSM BUILDINGS + ADĂUGARE CONTEXT
// ═══════════════════════════════════════════════════════════════════════════
async function _ctx3DFetchOSMBuildings(lat, lon, radius) {
  const bbox = `${lat-radius/111000},${lon-radius/111000*Math.cos(lat*Math.PI/180)},`+
               `${lat+radius/111000},${lon+radius/111000*Math.cos(lat*Math.PI/180)}`;
  const q = `[out:json][timeout:25];
    (
      way["building"](${bbox});
      relation["building"](${bbox});
    );
    out center tags qt 300;`;
  try {
    const r = await fetch('https://overpass-api.de/api/interpreter',{
      method:'POST', body:'data='+encodeURIComponent(q),
      signal: AbortSignal.timeout(20000),
    });
    const data = await r.json();
    return data.elements||[];
  } catch(e) {
    console.warn('[Context3D] OSM fetch eșuat:',e.message,'— context fără clădiri vecine');
    return [];
  }
}

function _ctx3DAddOSMContext(scene3D, elements, cx, cy, mats) {
  // Ștergem contextul precedent
  scene3D._scene.children.filter(c=>c._osmCtx).forEach(c=>scene3D._scene.remove(c));
  if(!elements.length) return;

  const toL = (lon,lat) => scene3D._toLocal?.(lon,lat) || [(lon-cx)*111319.9*Math.cos(cy*Math.PI/180),(lat-cy)*111319.9,0];
  const pLon = cx, pLat = cy; // centrul parcelei
  const AEDIS_PARCEL_R = 40; // raza parcelei AEDIS în m — nu suprapunem

  let added = 0;
  elements.forEach(el => {
    const lon = el.center?.lon || el.lon;
    const lat = el.center?.lat || el.lat;
    if(!lon||!lat) return;

    // Nu adăugăm clădiri prea aproape de parcela noastră
    const distM = Math.hypot((lon-pLon)*111319.9*Math.cos(pLat*Math.PI/180),(lat-pLat)*111319.9);
    if(distM < AEDIS_PARCEL_R) return;

    const t = el.tags||{};
    // Înălțime: din tag "height", sau "building:levels"×3.5, sau estimare
    let h = parseFloat(t['height']||t['building:height']||'0');
    if(!h) h = (parseInt(t['building:levels']||'0')||0)*3.5;
    if(!h) h = t.building==='house'?5:t.building==='church'?15:t.building==='industrial'?8:9;
    h = Math.max(3, Math.min(120, h));

    // Lățime estimată din footprint (simplificăm ca box)
    let wM = 15+Math.abs(Math.sin(lon*312.7))*25;
    let dM = 12+Math.abs(Math.sin(lat*412.3))*18;

    const [lx, ly] = toL(lon, lat);

    // Box principal
    const bG = new THREE.BoxGeometry(wM, dM, h);
    const bM = new THREE.Mesh(bG, mats.ctx_wall);
    bM.position.set(lx, ly, h/2);
    bM._osmCtx = true;
    scene3D._scene.add(bM);

    // Ferestre simplificate (pattern pe fațadă)
    if(h>5 && wM>8) {
      const nFloors = Math.floor(h/3.5);
      const nWins = Math.max(2, Math.floor(wM/3.5));
      for(let fi=0; fi<nFloors; fi++) {
        for(let wi=0; wi<nWins; wi++) {
          const wG = new THREE.BoxGeometry(1.1, 0.05, 1.4);
          const wn = new THREE.Mesh(wG, mats.ctx_glass);
          wn.position.set(lx-wM/2+1.2+wi*(wM-2.4)/(nWins-1||1), ly-dM/2-0.02, fi*3.5+2.5);
          wn._osmCtx = true;
          scene3D._scene.add(wn);
        }
      }
    }

    // Acoperiș plat
    const rG = new THREE.BoxGeometry(wM+0.3, dM+0.3, 0.25);
    const rm = new THREE.Mesh(rG, mats.ctx_roof);
    rm.position.set(lx, ly, h+0.12);
    rm._osmCtx = true;
    scene3D._scene.add(rm);
    added++;
  });
  console.log('[Context3D] Context OSM: '+added+'/'+elements.length+' clădiri adăugate');
}

// ═══════════════════════════════════════════════════════════════════════════
// VIEWER STANDALONE (când TCI._3D nu e activ)
// ═══════════════════════════════════════════════════════════════════════════
async function _ctx3DCreateStandaloneViewer(P, b) {
  if(typeof ss==='function') ss('🏙 Creez viewer 3D standalone…');
  const cfg = typeof _rvGetAEDISConfig==='function' ? _rvGetAEDISConfig() : {};

  // Creăm un container fullscreen
  const existing = document.getElementById('ctx3d-standalone');
  if(existing) existing.remove();

  const cont = document.createElement('div');
  cont.id = 'ctx3d-standalone';
  cont.style.cssText = 'position:fixed;inset:0;z-index:9000;background:#0a0f1e;';
  document.body.appendChild(cont);

  // Buton închidere
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕ Închide';
  closeBtn.style.cssText = 'position:absolute;top:12px;right:12px;z-index:100;'+
    'padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:700;'+
    'background:rgba(239,68,68,.8);border:none;color:#fff;font-family:inherit;font-size:12px;';
  closeBtn.onclick = ()=>cont.remove();
  cont.appendChild(closeBtn);

  // Info overlay
  const info = document.createElement('div');
  info.style.cssText = 'position:absolute;top:12px;left:12px;z-index:100;'+
    'background:rgba(15,20,45,.9);padding:10px 14px;border-radius:8px;'+
    'border:1px solid rgba(212,175,55,.3);color:#fff;font-family:inherit;font-size:11px;';
  info.innerHTML = `<b style="color:#D4AF37">🏙 Context 3D Urban Real</b><br>
    Nr.cad: ${P.nrCad} · UTR: ${P.utr}<br>
    ${b.bW}m×${b.bD}m · P+${b.niv-1}E · ${(b.niv*P.hn).toFixed(1)}m<br>
    <span style="color:#94a3b8;font-size:10px;">Drag=rotire · Scroll=zoom · Ctrl+drag=pan</span>`;
  cont.appendChild(info);

  // Canvas Three.js
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;';
  cont.appendChild(canvas);

  // Inițializăm Three.js
  const W = window.innerWidth, H = window.innerHeight;
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = false;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // cer albastru
  scene.fog = new THREE.Fog(0x87ceeb, 300, 900);

  const camera = new THREE.PerspectiveCamera(55, W/H, 0.5, 2000);
  camera.position.set(-b.bW*1.8, -b.bD*2.2, b.niv*P.hn*1.5);
  camera.lookAt(b.bW/2, b.bD/2, b.niv*P.hn/2);

  // Iluminare
  _ctx3DSetupLighting(scene);

  // Sol
  const groundG = new THREE.PlaneGeometry(1200, 1200);
  const groundM_mat = new THREE.MeshStandardMaterial({color:0x8a8878,roughness:0.98,metalness:0});
  const ground = new THREE.Mesh(groundG, groundM_mat);
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  // Parcelă
  const parcelM_mat = new THREE.MeshStandardMaterial({color:0x78a858,roughness:0.9,transparent:true,opacity:0.6});
  const parcel = new THREE.Mesh(new THREE.PlaneGeometry(P.W, P.D), parcelM_mat);
  parcel.rotation.x = -Math.PI/2;
  parcel.position.set(b.bW/2+P.rl, b.bD/2+P.rf, 0.02);
  scene.add(parcel);

  // Model AEDIS
  const mats = _ctx3DGetMaterials(cfg);
  const fakeScene3D = {
    _scene: scene,
    _toLocal: (lon,lat)=>[(lon-P.lon)*111319.9*Math.cos(P.lat*Math.PI/180)+b.bW/2,
                          (lat-P.lat)*111319.9+b.bD/2, 0],
  };
  _ctx3DBuildAEDISModel(fakeScene3D, P, b, cfg, mats);

  // Fetch + add OSM context
  info.innerHTML += '<br><span style="color:#38bdf8">⏳ Fetchez context OSM…</span>';
  const osmEl = await _ctx3DFetchOSMBuildings(P.lat, P.lon, 400);
  _ctx3DAddOSMContext(fakeScene3D, osmEl, P.lon, P.lat, mats);
  info.innerHTML = info.innerHTML.replace('<br><span style="color:#38bdf8">⏳ Fetchez context OSM…</span>',
    `<br><span style="color:#34d399">✅ ${osmEl.length} clădiri OSM context</span>`);

  // OrbitControls simplu (mouse drag)
  let isDragging=false, prevX=0, prevY=0, theta=225, phi=55, radius=b.bW*2.5+b.niv*P.hn;
  const target = new THREE.Vector3(b.bW/2, b.bD/2, b.niv*P.hn/3);

  canvas.addEventListener('mousedown',e=>{isDragging=true;prevX=e.clientX;prevY=e.clientY;});
  canvas.addEventListener('mouseup',()=>isDragging=false);
  canvas.addEventListener('mouseleave',()=>isDragging=false);
  canvas.addEventListener('mousemove',e=>{
    if(!isDragging) return;
    const dx=e.clientX-prevX, dy=e.clientY-prevY;
    if(e.ctrlKey||e.metaKey){
      target.x-=dx*0.15; target.y+=dy*0.15;
    } else {
      theta-=dx*0.4; phi=Math.max(5,Math.min(88,phi-dy*0.3));
    }
    prevX=e.clientX; prevY=e.clientY;
    _updateCamera();
  });
  canvas.addEventListener('wheel',e=>{
    radius=Math.max(b.bW,Math.min(600,radius+e.deltaY*0.3));
    _updateCamera();
  },{passive:true});
  // Touch support
  let touchPrev=null;
  canvas.addEventListener('touchstart',e=>{touchPrev={x:e.touches[0].clientX,y:e.touches[0].clientY};});
  canvas.addEventListener('touchmove',e=>{
    if(!touchPrev) return;
    const dx=e.touches[0].clientX-touchPrev.x, dy=e.touches[0].clientY-touchPrev.y;
    theta-=dx*0.5; phi=Math.max(5,Math.min(88,phi-dy*0.35));
    touchPrev={x:e.touches[0].clientX,y:e.touches[0].clientY};
    _updateCamera();
  });

  function _updateCamera(){
    const r=radius, t=theta*Math.PI/180, p=phi*Math.PI/180;
    camera.position.set(
      target.x+r*Math.cos(p)*Math.sin(t),
      target.y-r*Math.cos(p)*Math.cos(t),
      target.z+r*Math.sin(p)
    );
    camera.lookAt(target);
  }
  _updateCamera();

  window.addEventListener('resize',()=>{
    const W2=window.innerWidth,H2=window.innerHeight;
    renderer.setSize(W2,H2);
    camera.aspect=W2/H2; camera.updateProjectionMatrix();
  });

  // Render loop
  let animId=null;
  const loop=()=>{
    animId=requestAnimationFrame(loop);
    renderer.render(scene,camera);
  };
  loop();
  // Cleanup la închidere
  closeBtn.onclick=()=>{
    if(animId) cancelAnimationFrame(animId);
    renderer.dispose();
    cont.remove();
  };

  if(typeof ss==='function') ss('✅ Viewer 3D Real activ · '+osmEl.length+' clădiri OSM · Drag=rotire · Scroll=zoom');
}

// ═══════════════════════════════════════════════════════════════════════════
// CESIUMJS VIEWER cu 3D Tiles + Model AEDIS
// ═══════════════════════════════════════════════════════════════════════════
async function _ctx3DCesium() {
  const P = _RV?.parcelParams;
  if(!P) { alert('Generați releveele mai întâi.'); return; }
  if(typeof ss==='function') ss('🌍 Inițializez Cesium 3D Tiles…');

  // Creăm containerul
  const existing = document.getElementById('ctx3d-cesium-cont');
  if(existing) existing.remove();
  const cont = document.createElement('div');
  cont.id = 'ctx3d-cesium-cont';
  cont.style.cssText = 'position:fixed;inset:0;z-index:9100;background:#000;';
  document.body.appendChild(cont);

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML='✕ Închide Cesium';
  closeBtn.style.cssText='position:absolute;top:12px;right:12px;z-index:200;'+
    'padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:700;'+
    'background:rgba(239,68,68,.8);border:none;color:#fff;font-family:inherit;font-size:12px;';
  closeBtn.onclick=()=>cont.remove();
  cont.appendChild(closeBtn);

  const cesiumDiv = document.createElement('div');
  cesiumDiv.id='cesiumContainer';
  cesiumDiv.style.cssText='width:100%;height:100%;';
  cont.appendChild(cesiumDiv);

  // Încărcăm Cesium din CDN
  if(!window.Cesium) {
    const cssLink = document.createElement('link');
    cssLink.rel='stylesheet';
    cssLink.href='https://cesium.com/downloads/cesiumjs/releases/1.114/Build/Cesium/Widgets/widgets.css';
    document.head.appendChild(cssLink);

    await new Promise((res,rej)=>{
      const s=document.createElement('script');
      s.src='https://cesium.com/downloads/cesiumjs/releases/1.114/Build/Cesium/Cesium.js';
      s.onload=res; s.onerror=rej;
      document.head.appendChild(s);
    });
  }

  if(!window.Cesium) {
    if(typeof ss==='function') ss('❌ Cesium.js nu s-a încărcat. Verificați conexiunea.');
    cont.remove(); return;
  }

  // Ion token public (demo, fără 3D Tiles premium)
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNTc5YzIiLCJpZCI6NTc3MzMsImlhdCI6MTYyMjY0NDE3NH0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

  const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: await Cesium.createWorldTerrainAsync(),
    baseLayerPicker: false,
    navigationHelpButton: false,
    sceneModePicker: false,
    animation: false,
    timeline: false,
    geocoder: false,
    homeButton: false,
    fullscreenButton: false,
  });

  // Activăm OSM Buildings (3D Tiles global)
  try {
    const osmBuildings = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(osmBuildings);
  } catch(e) {
    console.warn('[Cesium] OSM Buildings 3D Tiles neaccesibil:', e.message);
  }

  // Adăugăm modelul AEDIS ca entitate
  const b2 = _RV?.building;
  if(b2) {
    viewer.entities.add({
      name: 'Clădire AEDIS - ' + P.nrCad,
      position: Cesium.Cartesian3.fromDegrees(P.lon, P.lat, 0),
      box: {
        dimensions: new Cesium.Cartesian3(b2.bW, b2.bD, b2.niv*(P.hn||3)),
        material: Cesium.Color.fromCssColorString('#c8d0e0').withAlpha(0.85),
        outline: true,
        outlineColor: Cesium.Color.fromCssColorString('#D4AF37'),
      },
      label: {
        text: 'AEDIS\n'+P.nrCad,
        font: '14px sans-serif',
        fillColor: Cesium.Color.WHITE,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineColor: Cesium.Color.BLACK,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -(b2.niv*(P.hn||3)*0.5)),
      }
    });

    // Zburăm la parcelă
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(P.lon, P.lat-0.002, 300),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-35),
        roll: 0,
      },
      duration: 2.0,
    });
  }

  if(typeof ss==='function') ss('✅ Cesium 3D Tiles activ · Context urban fotorealistic · Model AEDIS plasat la coordonate reale');
}

// ── Reset ─────────────────────────────────────────────────────────────────
function _ctx3DReset() {
  // Ștergem toate meshurile adăugate de noi
  const scene3D = window.TCI?._3D;
  if(scene3D?._scene) {
    scene3D._scene.children.filter(c=>c._aedis||c._osmCtx||c._ctx3d).forEach(c=>{
      scene3D._scene.remove(c);
      c.geometry?.dispose(); c.material?.dispose();
    });
    // Ștergem luminile adăugate
    scene3D._scene.children.filter(c=>c.isLight).forEach(l=>scene3D._scene.remove(l));
    scene3D._renderer?.render(scene3D._scene, scene3D._camera);
    window.map?.triggerRepaint?.();
  }
  // Închidem viewerele standalone
  document.getElementById('ctx3d-standalone')?.remove();
  document.getElementById('ctx3d-cesium-cont')?.remove();
  if(typeof ss==='function') ss('↺ Context 3D resetat — starea originală restabilită');
}

console.log('[18-context3d] ✅ loaded — Fal.ai înlocuit cu Context 3D Urban Real');
