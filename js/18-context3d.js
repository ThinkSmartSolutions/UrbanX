// ═══════════════════════════════════════════════════════════════════════════
// 18-context3d.js — Context 3D Real · UrbanX TSS·FG
//
// STRATEGIE CORECTĂ:
//   Viewer-ul 3D existent (TCI._3D) = Mapbox GL + Three.js overlay
//   Are: strazi reale, cladiri OSM, terrain, rotire, zoom — LA SUPERLATIV
//   Noi NU cream un viewer nou. NU înlocuim nimic.
//
//   Ce facem:
//   1. _ctx3DActivate() → verifică dacă TCI._3D e activ (ready)
//      Dacă nu → afișează mesaj "Activați viewer-ul 3D din hartă mai întâi"
//      Dacă da → adaugă modelul AEDIS cu materiale PBR în scena existentă
//   2. _ctx3DBuildAEDISModel() → construiește volumul din datele AEDIS
//   3. _ctx3DGetMaterials() → materiale PBR per finisaj
//   4. _ctx3DClear() → șterge modelul adăugat de noi (nu atinge restul scenei)
//
//   ELIMINAT: standalone viewer, Cesium, OrbitControls proprii, WebGLRenderer
// ═══════════════════════════════════════════════════════════════════════════

'use strict';

// ─── ID-ul grupului nostru în scena TCI ────────────────────────────────────
const _CTX3D_GROUP_ID = 'urbanx-aedis-model';

// ─── Injectăm butonul în toolbar după ce relevee e activ ──────────────────
(function(){
  function init(){
    if(typeof _rvExportPDF === 'undefined') { setTimeout(init, 400); return; }
    _ctx3DInjectButton();
    console.log('[Context3D] ✅ integrat cu TCI._3D existent');
  }
  setTimeout(init, 1200);
})();

function _ctx3DInjectButton(){
  if(document.getElementById('ctx3d-btn-wrap')) return;
  const anchor = document.querySelector('#rv-extras-wrap') ||
                 document.querySelector('.rv-expbtn:last-child') ||
                 document.querySelector('.rv-zoombar');
  if(!anchor) return;

  const wrap = document.createElement('span');
  wrap.id = 'ctx3d-btn-wrap';
  wrap.style.cssText = 'display:inline-flex;gap:5px;align-items:center;flex-shrink:0;';

  const btnActivate = document.createElement('button');
  btnActivate.id = 'ctx3d-activate-btn';
  btnActivate.innerHTML = '🌍 Context 3D';
  btnActivate.title = 'Adaugă modelul AEDIS cu materiale PBR în viewer-ul 3D al hărții';
  btnActivate.style.cssText = _ctx3DBtnStyle('#a78bfa','rgba(167,139,250,.15)');
  btnActivate.onclick = _ctx3DActivate;

  const btnClear = document.createElement('button');
  btnClear.id = 'ctx3d-clear-btn';
  btnClear.innerHTML = '✕ Clear 3D';
  btnClear.title = 'Șterge modelul AEDIS din scena 3D';
  btnClear.style.cssText = _ctx3DBtnStyle('#94a3b8','rgba(148,163,184,.08)');
  btnClear.onclick = _ctx3DClear;

  wrap.appendChild(btnActivate);
  wrap.appendChild(btnClear);
  anchor.parentElement?.insertBefore(wrap, anchor.nextSibling);
}

function _ctx3DBtnStyle(color, bg){
  return ['height:30px','padding:0 10px','border-radius:7px','cursor:pointer',
    'font-family:inherit','font-size:10px','font-weight:700','flex-shrink:0',
    `color:${color}`,`border:1.5px solid ${color}55`,`background:${bg}`,
    'transition:opacity .15s'].join(';');
}

// ═══════════════════════════════════════════════════════════════════════════
// ACTIVARE — adaugă modelul AEDIS în scena TCI._3D existentă
// ═══════════════════════════════════════════════════════════════════════════
function _ctx3DActivate(){
  const btn = document.getElementById('ctx3d-activate-btn');

  // ── 1. Verificăm că TCI._3D e activ ────────────────────────────────────
  const tci3d = window.TCI?._3D;
  if(!tci3d?._ready || !tci3d?._scene){
    const msg = '⚠️ Viewer-ul 3D nu este activ.\n\nActivați butonul "3D" din harta principală, '+
                'așteptați să se încarce contextul urban (clădiri OSM + strazi), '+
                'apoi apăsați din nou Context 3D.';
    alert(msg);
    if(typeof ss === 'function') ss('⚠ Activați viewer-ul 3D din hartă mai întâi');
    return;
  }

  const P = _RV?.parcelParams;
  const b = _RV?.building;
  if(!P || !b){
    alert('Generați releveele mai întâi (apăsați Analizează pe o parcelă).');
    return;
  }
  if(typeof THREE === 'undefined'){
    if(typeof ss === 'function') ss('⚠ Three.js indisponibil');
    return;
  }

  if(btn){ btn.innerHTML='⏳ Se adaugă…'; btn.style.opacity='.6'; }
  if(typeof ss === 'function') ss('⏳ Adaug modelul AEDIS în viewer-ul 3D…');

  // ── 2. Șterge modelul anterior al nostru ──────────────────────────────
  _ctx3DRemoveGroup(tci3d._scene);

  // ── 3. Construiește modelul AEDIS cu PBR ──────────────────────────────
  const cfg  = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
  const mats = _ctx3DGetMaterials(cfg);
  const group = _ctx3DBuildAEDISModel(tci3d, P, b, cfg, mats);

  if(!group){
    if(btn){ btn.innerHTML='🌍 Context 3D'; btn.style.opacity='1'; }
    if(typeof ss === 'function') ss('⚠ Nu s-a putut construi modelul');
    return;
  }

  group.userData.isUrbanXModel = true;
  tci3d._scene.add(group);

  // ── 4. Trigger repaint Mapbox ──────────────────────────────────────────
  const map = tci3d._map || window.map || window._map;
  if(map?.triggerRepaint) map.triggerRepaint();

  if(btn){ btn.innerHTML='✅ Context 3D'; btn.style.opacity='1'; }
  if(typeof ss === 'function')
    ss('✅ Model AEDIS adăugat în viewer-ul 3D · '+b.niv+'niv · h='+(b.niv*(P.hn||3)).toFixed(1)+'m · rotire/zoom cu mouse');
}

// ═══════════════════════════════════════════════════════════════════════════
// CLEAR — șterge DOAR modelul nostru, nu atinge restul scenei
// ═══════════════════════════════════════════════════════════════════════════
function _ctx3DClear(){
  const tci3d = window.TCI?._3D;
  if(!tci3d?._scene) return;
  const removed = _ctx3DRemoveGroup(tci3d._scene);
  const map = tci3d._map || window.map || window._map;
  if(map?.triggerRepaint) map.triggerRepaint();
  const btn = document.getElementById('ctx3d-activate-btn');
  if(btn) btn.innerHTML = '🌍 Context 3D';
  if(typeof ss === 'function')
    ss(removed ? '✅ Model AEDIS eliminat din viewer' : '— Nimic de eliminat');
}

function _ctx3DRemoveGroup(scene){
  let removed = false;
  const toRemove = [];
  scene.traverse(obj => {
    if(obj.userData?.isUrbanXModel) toRemove.push(obj);
  });
  toRemove.forEach(obj => {
    if(obj.parent) { obj.parent.remove(obj); removed = true; }
    // Dispose geometrii și materiale
    if(obj.geometry) obj.geometry.dispose();
    if(obj.material){
      if(Array.isArray(obj.material)) obj.material.forEach(m=>m.dispose());
      else obj.material.dispose();
    }
  });
  return removed;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONVERSIE COORDONATE — lon/lat → poziție Three.js în scena TCI
//
// TCI._3D folosește un sistem Mercator cu origine în centrul orașului.
// Funcția _toLocal(lon, lat) returnează {x, y, z} în metri față de origine.
// ═══════════════════════════════════════════════════════════════════════════
function _ctx3DWorldPos(tci3d, lon, lat, elevM){
  // Dacă TCI expune _toLocal, îl folosim direct
  if(typeof tci3d._toLocal === 'function'){
    const pos = tci3d._toLocal(lon, lat);
    return new THREE.Vector3(pos.x || pos[0] || 0, elevM || 0, pos.z || pos.y || pos[1] || 0);
  }
  // Fallback: offset simplu față de centrul TCI în metri
  const cx  = tci3d._cx || lon;
  const cy  = tci3d._cy || lat;
  const cos = Math.cos(cy * Math.PI / 180);
  const dx  = (lon - cx) * 111319.9 * cos;
  const dy  = (lat - cy) * 111319.9;
  return new THREE.Vector3(dx, elevM || 0, -dy);
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSTRUIEȘTE MODELUL AEDIS — geometrie din datele reale
// ═══════════════════════════════════════════════════════════════════════════
function _ctx3DBuildAEDISModel(tci3d, P, b, cfg, mats){
  if(typeof THREE === 'undefined') return null;

  const group    = new THREE.Group();
  group.userData.isUrbanXModel = true;

  const bW  = b.bW || P.W * 0.7;
  const bD  = b.bD || P.D * 0.65;
  const hn  = P.hn  || 3.0;
  const niv = b.niv || P.niv || 4;
  const lon = P.lon;
  const lat = P.lat;

  const origin = _ctx3DWorldPos(tci3d, lon, lat, 0);

  // ── Corp principal ────────────────────────────────────────────────────
  const totalH = niv * hn;
  const bodyGeo = new THREE.BoxGeometry(bW, totalH, bD);
  const bodyMat = mats.wall;
  const body    = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.set(origin.x, totalH / 2, origin.z);
  body.userData.isUrbanXModel = true;
  group.add(body);

  // ── Ferestre pe fațade ────────────────────────────────────────────────
  const winMat   = mats.glass;
  const winW = 1.2, winH = 1.4, winDepth = 0.05;
  const facades = [
    { axis: 'x', sign:  1, len: bW, rot: 0 },
    { axis: 'x', sign: -1, len: bW, rot: Math.PI },
    { axis: 'z', sign:  1, len: bD, rot: -Math.PI/2 },
    { axis: 'z', sign: -1, len: bD, rot:  Math.PI/2 },
  ];
  facades.forEach(({ axis, sign, len, rot }) => {
    const nWins = Math.max(1, Math.floor(len / 3.5));
    const spacing = len / (nWins + 1);
    for(let floor = 0; floor < niv; floor++){
      for(let wi = 0; wi < nWins; wi++){
        const wGeo = new THREE.BoxGeometry(winW, winH, winDepth);
        const win  = new THREE.Mesh(wGeo, winMat);
        const ox = axis === 'x' ? (-len/2 + spacing*(wi+1)) : 0;
        const oz = axis === 'z' ? (-len/2 + spacing*(wi+1)) : 0;
        const faceOffset = (axis === 'x' ? bD : bW) / 2 + winDepth/2;
        win.position.set(
          origin.x + (axis === 'x' ? ox : sign * faceOffset),
          floor * hn + hn * 0.55,
          origin.z + (axis === 'z' ? oz : -sign * faceOffset)
        );
        if(axis === 'z') win.rotation.y = Math.PI/2;
        win.userData.isUrbanXModel = true;
        group.add(win);
      }
    }
  });

  // ── Acoperiș ──────────────────────────────────────────────────────────
  const hasTerasa = cfg.terasa || b._terasa;
  if(hasTerasa){
    // Terasă plată cu parapet
    const terGeo = new THREE.BoxGeometry(bW + 0.4, 0.3, bD + 0.4);
    const ter    = new THREE.Mesh(terGeo, mats.roof_flat || mats.wall);
    ter.position.set(origin.x, totalH + 0.15, origin.z);
    ter.userData.isUrbanXModel = true;
    group.add(ter);
  } else {
    // Șarpantă simplă
    const ridgeH  = Math.min(bW * 0.25, 3.0);
    const pts = [
      new THREE.Vector2(-bW/2, 0),
      new THREE.Vector2( bW/2, 0),
      new THREE.Vector2( 0,    ridgeH),
    ];
    const roofShape  = new THREE.Shape(pts);
    const extSettings = { depth: bD, bevelEnabled: false };
    const roofGeo    = new THREE.ExtrudeGeometry(roofShape, extSettings);
    const roof       = new THREE.Mesh(roofGeo, mats.roof_tile || mats.wall);
    roof.position.set(origin.x, totalH, origin.z - bD/2);
    roof.userData.isUrbanXModel = true;
    group.add(roof);
  }

  // ── Soclu ──────────────────────────────────────────────────────────────
  const soclGeo = new THREE.BoxGeometry(bW + 0.3, 0.6, bD + 0.3);
  const socl    = new THREE.Mesh(soclGeo, mats.soclu || mats.wall);
  socl.position.set(origin.x, 0.3, origin.z);
  socl.userData.isUrbanXModel = true;
  group.add(socl);

  // ── Balcoane (dacă AEDIS are) ─────────────────────────────────────────
  const hasBalcon = cfg.balconAdancime > 0 || b._balconAdancime > 0;
  if(hasBalcon){
    const bAdanc = cfg.balconAdancime || b._balconAdancime || 1.2;
    const balMat = mats.balcony || mats.wall;
    for(let floor = 1; floor < niv; floor++){
      const bGeo = new THREE.BoxGeometry(bW * 0.7, 0.12, bAdanc);
      const bal  = new THREE.Mesh(bGeo, balMat);
      bal.position.set(origin.x, floor * hn - 0.06, origin.z + bD/2 + bAdanc/2);
      bal.userData.isUrbanXModel = true;
      group.add(bal);
    }
  }

  // ── Lumini punctuale lângă model ──────────────────────────────────────
  const pl = new THREE.PointLight(0xfff8e7, 0.4, totalH * 4);
  pl.position.set(origin.x, totalH + 5, origin.z);
  pl.userData.isUrbanXModel = true;
  group.add(pl);

  return group;
}

// ═══════════════════════════════════════════════════════════════════════════
// MATERIALE PBR — per finisaj AEDIS
// ═══════════════════════════════════════════════════════════════════════════
function _ctx3DGetMaterials(cfg){
  if(typeof THREE === 'undefined') return {};
  const fin = cfg?.finisajExt || 'tencuiala';
  const perCortina = cfg?.pereCortina;

  const wallProps = perCortina
    ? { color:0x8aafc0, metalness:0.4, roughness:0.15 }  // sticlă reflectantă
    : fin === 'caramida'
      ? { color:0xc87941, metalness:0.0, roughness:0.95 }
      : fin === 'piatra'
        ? { color:0xa0947a, metalness:0.0, roughness:0.88 }
        : fin === 'lemn'
          ? { color:0xb07040, metalness:0.0, roughness:0.85 }
          : fin === 'metal'
            ? { color:0x8899aa, metalness:0.7, roughness:0.25 }
            : { color:0xdce3e8, metalness:0.0, roughness:0.80 }; // tencuiala default

  const make = (props) => new THREE.MeshStandardMaterial(props);

  return {
    wall:      make(wallProps),
    glass:     make({ color:0xa8d4f5, metalness:0.1, roughness:0.05, transparent:true, opacity:0.55 }),
    cortina:   make({ color:0x7ab2d4, metalness:0.4, roughness:0.10, transparent:true, opacity:0.65 }),
    slab:      make({ color:0xcccccc, metalness:0.0, roughness:0.70 }),
    balcony:   make({ color:0xbbbbcc, metalness:0.1, roughness:0.60 }),
    railing:   make({ color:0xaaaaaa, metalness:0.5, roughness:0.30 }),
    roof_tile: make({ color:0x884433, metalness:0.0, roughness:0.90 }),
    roof_flat: make({ color:0x555566, metalness:0.1, roughness:0.80 }),
    soclu:     make({ color:0xb0afa8, metalness:0.0, roughness:0.85 }),
    mullion:   make({ color:0x888899, metalness:0.6, roughness:0.20 }),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// _ctx3DCesium — eliminat, dar păstrăm funcția goală pt. toolbar compatibilitate
// ═══════════════════════════════════════════════════════════════════════════
function _ctx3DCesium(){
  if(typeof ss === 'function') ss('ℹ Cesium a fost eliminat — folosiți butonul "3D" din hartă pentru contextul urban real');
  alert('Viewer-ul Cesium a fost eliminat.\n\nViewer-ul 3D integrat al platformei are strazi reale, cladiri OSM și terrain — activați-l din butonul "3D" din bara principală a hărții.');
}

console.log('[Context3D] ✅ v2 — integrat cu TCI._3D existent · fără standalone viewer');
