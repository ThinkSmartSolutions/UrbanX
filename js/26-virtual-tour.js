/* ═══════════════════════════════════════════════════════════════════════════
   UrbanX · Tur Virtual 3D · Sesiunea Curată #1
   ──────────────────────────────────────────────────────────────────────────
   DOLLHOUSE ORBITAL — vizualizare Matterport casa-păpușii
   ──────────────────────────────────────────────────────────────────────────
   Stack minimal: Three.js r128, MeshStandardMaterial, BoxGeometry,
   OrbitControls. ZERO post-processing, ZERO Reflector, ZERO CubeCamera.
   ═══════════════════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  const VERSION = '20260603-S1-DOLLHOUSE';
  console.log('[VTour S1] încărcat versiune', VERSION);

  const STATE = {
    active: false,
    overlay: null,
    canvas: null,
    renderer: null,
    scene: null,
    camera: null,
    controls: null,
    dollhouseGroup: null,
    floorOffsets: [],
    explodeAmount: 0,
    targetExplode: 1,
    raf: null,
  };

  // ═════════════════════════════════════════════════════════════════════════
  // INJECT BUTON
  // ═════════════════════════════════════════════════════════════════════════
  function _injectButtons(){
    const tryInject = () => {
      if(document.getElementById('vtour-launch-btn')) return true;
      const topbar = document.getElementById('v3d-topbar');
      if(!topbar) return false;
      const rows = topbar.querySelectorAll(':scope > div');
      const targetRow = rows[1] || topbar;

      const btn = document.createElement('button');
      btn.id = 'vtour-launch-btn';
      btn.title = 'Vizualizare Dollhouse (casa păpușii)';
      btn.innerHTML = '🏠 Dollhouse';
      btn.style.cssText = `
        background:linear-gradient(90deg,rgba(0,255,136,.15),rgba(59,130,246,.12));
        color:#00ff88;border:1px solid rgba(0,255,136,.5);border-radius:8px;
        padding:5px 13px;font-size:11px;font-weight:700;cursor:pointer;
        flex-shrink:0;min-height:36px;letter-spacing:.3px;white-space:nowrap;
      `;
      btn.addEventListener('click', () => start());
      targetRow.appendChild(btn);
      console.log('[VTour S1] Buton injectat');
      return true;
    };
    if(tryInject()) return;
    const observer = new MutationObserver(() => { tryInject(); });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CITIRE AEDIS
  // ═════════════════════════════════════════════════════════════════════════
  function _readAedisFloors(){
    const A = window.AEDIS;
    if(!A) return null;
    const fnMap = (window.AEDIS_FN || {});
    const fnData = fnMap[A.fn || 'rezidential_colectiv'] || { hParter: 3.0, hEtaj: 2.8 };
    const niv = parseInt(A.niv) || parseInt(A.nivAedis) || 1;
    const nivCount = Math.max(1, niv);
    const floors = [];
    let cumulativeY = 0;
    for(let i = 0; i < nivCount; i++){
      const h = (i === 0) ? fnData.hParter : fnData.hEtaj;
      floors.push({ idx: i, baseY: cumulativeY, height: h, top: cumulativeY + h });
      cumulativeY += h;
    }
    return { floors, totalHeight: cumulativeY };
  }

  function _computeAnchor(){
    const THREE = window.THREE;
    const V3D = window.V3D;
    const bbox = new THREE.Box3();
    if(V3D && Array.isArray(V3D.aedis) && V3D.aedis.length){
      V3D.aedis.forEach(m => {
        if(m && m.isObject3D){
          try {
            const sub = new THREE.Box3().setFromObject(m);
            if(isFinite(sub.min.x)) bbox.union(sub);
          } catch(e){}
        }
      });
    }
    if(!isFinite(bbox.min.x)){
      return { cx:0, cz:0, baseY:0, bW:18, bD:14, topY:12 };
    }
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    let bW = Math.max(size.x, 5), bD = Math.max(size.z, 5);
    if(window._RV && window._RV.building){
      if(window._RV.building.bW) bW = window._RV.building.bW;
      if(window._RV.building.bD) bD = window._RV.building.bD;
    }
    return {
      cx: center.x, cz: center.z, baseY: bbox.min.y,
      bW, bD, topY: bbox.max.y,
    };
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CONSTRUIRE DOLLHOUSE
  // ═════════════════════════════════════════════════════════════════════════
  function _buildDollhouse(){
    const THREE = window.THREE;
    const anchor = _computeAnchor();
    const aedisFloors = _readAedisFloors();
    if(!aedisFloors){ console.warn('[VTour S1] AEDIS lipsește'); return null; }
    const RV = window._RV;
    const hasRelevee = RV && Array.isArray(RV.floors) && RV.floors.length > 0;

    const group = new THREE.Group();
    group.name = 'VTourDollhouse';

    const matFloor     = new THREE.MeshStandardMaterial({ color: 0xc9a373, roughness: 0.7, metalness: 0 });
    const matFloorBath = new THREE.MeshStandardMaterial({ color: 0xeaf2f8, roughness: 0.4, metalness: 0 });
    const matFloorKit  = new THREE.MeshStandardMaterial({ color: 0x9aa0a8, roughness: 0.45, metalness: 0.1 });
    const matRoof      = new THREE.MeshStandardMaterial({ color: 0x5a4636, roughness: 0.78, metalness: 0 });
    const matBalcony   = new THREE.MeshStandardMaterial({ color: 0x9ba4b0, roughness: 0.4, metalness: 0.3, transparent: true, opacity: 0.55 });

    const wallThickExt = 0.25;
    const wallThickInt = 0.12;
    const wallH        = 2.7;
    const bW = anchor.bW, bD = anchor.bD;
    const ox = anchor.cx - bW / 2;
    const oz = anchor.cz - bD / 2;

    aedisFloors.floors.forEach((floor, fIdx) => {
      const floorGroup = new THREE.Group();
      floorGroup.name = `Floor_${fIdx}`;
      floorGroup.userData.baseY = anchor.baseY + floor.baseY;
      floorGroup.userData.fIdx = fIdx;

      const slab = new THREE.Mesh(new THREE.BoxGeometry(bW + 0.1, 0.2, bD + 0.1), matFloor);
      slab.position.set(anchor.cx, -0.1, anchor.cz);
      slab.castShadow = true; slab.receiveShadow = true;
      floorGroup.add(slab);

      const wallMat = new THREE.MeshStandardMaterial({
        color: 0xf0ebe2, roughness: 0.85, metalness: 0,
        transparent: true, opacity: 0.45, side: THREE.DoubleSide,
      });
      const wS = new THREE.Mesh(new THREE.BoxGeometry(bW, wallH, wallThickExt), wallMat);
      wS.position.set(anchor.cx, wallH/2, anchor.cz + bD/2);
      wS.castShadow = true; wS.receiveShadow = true;
      floorGroup.add(wS);
      const wN = wS.clone();
      wN.position.set(anchor.cx, wallH/2, anchor.cz - bD/2);
      floorGroup.add(wN);
      const wE = new THREE.Mesh(new THREE.BoxGeometry(wallThickExt, wallH, bD), wallMat);
      wE.position.set(anchor.cx + bW/2, wallH/2, anchor.cz);
      wE.castShadow = true; wE.receiveShadow = true;
      floorGroup.add(wE);
      const wW = wE.clone();
      wW.position.set(anchor.cx - bW/2, wallH/2, anchor.cz);
      floorGroup.add(wW);

      if(hasRelevee){
        const rvFloor = RV.floors[Math.min(fIdx, RV.floors.length - 1)];
        if(rvFloor && Array.isArray(rvFloor.rects)){
          rvFloor.rects.forEach(r => {
            if(!isFinite(r.w) || !isFinite(r.h) || r.w <= 0.1 || r.h <= 0.1) return;
            if(r.bal){
              const bal = new THREE.Mesh(new THREE.BoxGeometry(r.w, 0.1, r.h), matFloor);
              bal.position.set(ox + r.x + r.w/2, 0.05, oz + r.y + r.h/2);
              bal.castShadow = true; bal.receiveShadow = true;
              floorGroup.add(bal);
              const balRail = new THREE.Mesh(new THREE.BoxGeometry(r.w, 1.0, 0.04), matBalcony);
              balRail.position.set(ox + r.x + r.w/2, 0.5, oz + r.y + r.h);
              floorGroup.add(balRail);
              return;
            }
            let floorMat = matFloor;
            if(r.t === 'bath' || r.t === 'wc') floorMat = matFloorBath;
            else if(r.t === 'kitchen' || r.t === 'core') floorMat = matFloorKit;
            const cFloor = new THREE.Mesh(new THREE.BoxGeometry(r.w * 0.96, 0.02, r.h * 0.96), floorMat);
            cFloor.position.set(ox + r.x + r.w/2, 0.011, oz + r.y + r.h/2);
            cFloor.receiveShadow = true;
            floorGroup.add(cFloor);

            const intWallMat = new THREE.MeshStandardMaterial({ color: 0xe8e4dc, roughness: 0.9, metalness: 0 });
            const halfH = wallH * 0.55;
            const sw = new THREE.Mesh(new THREE.BoxGeometry(r.w, halfH, wallThickInt), intWallMat);
            sw.position.set(ox + r.x + r.w/2, halfH/2, oz + r.y + r.h);
            sw.castShadow = true; sw.receiveShadow = true;
            floorGroup.add(sw);
            const nw = sw.clone();
            nw.position.set(ox + r.x + r.w/2, halfH/2, oz + r.y);
            floorGroup.add(nw);
            const ew = new THREE.Mesh(new THREE.BoxGeometry(wallThickInt, halfH, r.h), intWallMat);
            ew.position.set(ox + r.x + r.w, halfH/2, oz + r.y + r.h/2);
            ew.castShadow = true; ew.receiveShadow = true;
            floorGroup.add(ew);
            const vw = ew.clone();
            vw.position.set(ox + r.x, halfH/2, oz + r.y + r.h/2);
            floorGroup.add(vw);

            _addRoomFurniture(floorGroup, r, ox, oz);
          });
        }
      }

      group.add(floorGroup);
      STATE.floorOffsets.push(floorGroup);
    });

    const roofGroup = new THREE.Group();
    roofGroup.name = 'Roof';
    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(bW + 0.3, 0.4, bD + 0.3), matRoof);
    roofSlab.position.set(anchor.cx, 0.2, anchor.cz);
    roofSlab.castShadow = true; roofSlab.receiveShadow = true;
    roofGroup.add(roofSlab);
    const chimneyMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
    const ch1 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.6), chimneyMat);
    ch1.position.set(anchor.cx + bW*0.25, 0.8, anchor.cz - bD*0.2);
    ch1.castShadow = true;
    roofGroup.add(ch1);
    const ch2 = ch1.clone();
    ch2.position.set(anchor.cx - bW*0.25, 0.8, anchor.cz + bD*0.2);
    roofGroup.add(ch2);
    roofGroup.userData.baseY = anchor.baseY + aedisFloors.totalHeight + 0.1;
    group.add(roofGroup);
    STATE.floorOffsets.push(roofGroup);

    STATE.scene.add(group);
    STATE.dollhouseGroup = group;
    STATE._anchor = anchor;
    STATE._aedisFloors = aedisFloors;
    console.log(`[VTour S1] Dollhouse: ${aedisFloors.floors.length} etaje + acoperiș, ${group.children.length} groups`);
    return group;
  }

  function _addRoomFurniture(group, r, ox, oz){
    const THREE = window.THREE;
    const cx = ox + r.x + r.w/2;
    const cz = oz + r.y + r.h/2;
    if(r.w < 1.5 || r.h < 1.5) return;

    const matSofa  = new THREE.MeshStandardMaterial({ color: 0x4a5568, roughness: 0.85 });
    const matBed   = new THREE.MeshStandardMaterial({ color: 0xf0ebe2, roughness: 0.85 });
    const matWood  = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.65 });
    const matWhite = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.5 });

    if(r.t === 'living'){
      const sw = Math.min(r.w * 0.6, 2.2);
      const s = new THREE.Mesh(new THREE.BoxGeometry(sw, 0.45, 0.85), matSofa);
      s.position.set(cx, 0.235, cz - r.h/2 + 0.725);
      s.castShadow = true; s.receiveShadow = true;
      group.add(s);
      const sb = new THREE.Mesh(new THREE.BoxGeometry(sw, 0.5, 0.15), matSofa);
      sb.position.set(cx, 0.7, cz - r.h/2 + 0.3);
      sb.castShadow = true;
      group.add(sb);
      const t = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.42, 0.5), matWood);
      t.position.set(cx, 0.21, cz);
      t.castShadow = true;
      group.add(t);
    } else if(r.t === 'bedroom' || r.t === 'bedroom2' || r.t === 'bedroom3'){
      const bw = Math.min(r.w * 0.5, 1.6);
      const bd = Math.min(2.0, r.h * 0.7);
      const b = new THREE.Mesh(new THREE.BoxGeometry(bw, 0.45, bd), matBed);
      b.position.set(cx, 0.225, cz);
      b.castShadow = true; b.receiveShadow = true;
      group.add(b);
      const hb = new THREE.Mesh(new THREE.BoxGeometry(bw + 0.1, 0.9, 0.08), matWood);
      hb.position.set(cx, 0.45, cz - bd/2 - 0.05);
      hb.castShadow = true;
      group.add(hb);
    } else if(r.t === 'kitchen'){
      const kw = Math.min(r.w * 0.8, 2.5);
      const k = new THREE.Mesh(new THREE.BoxGeometry(kw, 0.9, 0.6), matWood);
      k.position.set(cx, 0.45, cz - r.h/2 + 0.35);
      k.castShadow = true; k.receiveShadow = true;
      group.add(k);
      const f = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.8, 0.65), matWhite);
      f.position.set(cx + r.w/2 - 0.4, 0.9, cz - r.h/2 + 0.4);
      f.castShadow = true;
      group.add(f);
    } else if(r.t === 'bath' || r.t === 'wc'){
      const wc = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.45, 0.65), matWhite);
      wc.position.set(cx - r.w/2 + 0.3, 0.225, cz);
      wc.castShadow = true;
      group.add(wc);
      if(r.t === 'bath' && r.w > 1.8){
        const bath = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.55, 0.75), matWhite);
        bath.position.set(cx, 0.275, cz + r.h/2 - 0.4);
        bath.castShadow = true; bath.receiveShadow = true;
        group.add(bath);
      }
    } else if(r.t === 'office'){
      const d = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.75, 0.7), matWood);
      d.position.set(cx, 0.375, cz - r.h/2 + 0.4);
      d.castShadow = true;
      group.add(d);
      const ch = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), matSofa);
      ch.position.set(cx, 0.25, cz - r.h/2 + 1.0);
      ch.castShadow = true;
      group.add(ch);
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // LIGHTING
  // ═════════════════════════════════════════════════════════════════════════
  function _setupLighting(){
    const THREE = window.THREE;
    const scene = STATE.scene;

    const sun = new THREE.DirectionalLight(0xfff4e0, 2.2);
    sun.position.set(40, 80, 30);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 200;
    sun.shadow.camera.left = -60;
    sun.shadow.camera.right = 60;
    sun.shadow.camera.top = 60;
    sun.shadow.camera.bottom = -60;
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.02;
    sun.shadow.radius = 4;
    scene.add(sun);

    const hemi = new THREE.HemisphereLight(0x88bbff, 0x4a4030, 0.45);
    scene.add(hemi);

    const fill = new THREE.DirectionalLight(0xb8d0ff, 0.25);
    fill.position.set(-30, 40, -20);
    scene.add(fill);

    if(THREE.RGBELoader){
      try {
        new THREE.RGBELoader().load('assets/tur3d/hdri/exterior.hdr',
          (tex) => {
            try {
              tex.mapping = THREE.EquirectangularReflectionMapping;
              if(STATE.scene){
                STATE.scene.environment = tex;
                console.log('[VTour S1] ✅ HDRI încărcat');
              }
            } catch(e){}
          },
          undefined,
          () => { /* silent fallback */ }
        );
      } catch(e){}
    }
  }

  function _updateExplode(){
    if(!STATE.dollhouseGroup || !STATE._aedisFloors) return;
    STATE.explodeAmount += (STATE.targetExplode - STATE.explodeAmount) * 0.08;
    const EXPLODE_GAP = 1.5;
    STATE.floorOffsets.forEach((floorGroup, idx) => {
      const baseY = floorGroup.userData.baseY || 0;
      const extraY = idx * EXPLODE_GAP * STATE.explodeAmount;
      floorGroup.position.y = baseY + extraY - STATE._anchor.baseY;
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INLINE ORBIT CONTROLS — fallback robust fără dependențe externe
  // mouse drag pentru rotire, scroll pentru zoom, touch pentru mobile
  // ═════════════════════════════════════════════════════════════════════════
  function _createInlineOrbit(camera, dom, opts){
    opts = opts || {};
    const THREE = window.THREE;
    const target = new THREE.Vector3(
      opts.target ? opts.target.x : 0,
      opts.target ? opts.target.y : 0,
      opts.target ? opts.target.z : 0
    );
    const minDist = opts.minDistance || 2;
    const maxDist = opts.maxDistance || 200;

    // Coordonate sferice (azimut + polar) calculate din poziția curentă camera
    const offset = new THREE.Vector3();
    offset.copy(camera.position).sub(target);
    let radius = offset.length();
    let theta = Math.atan2(offset.x, offset.z);          // azimut (orizontal)
    let phi = Math.acos(Math.max(-1, Math.min(1, offset.y / radius))); // polar (vertical, 0=sus, PI=jos)

    let targetTheta = theta, targetPhi = phi, targetRadius = radius;

    let dragging = false;
    let lastX = 0, lastY = 0;
    let activeTouches = []; // pentru pinch-zoom

    function onDown(x, y){
      dragging = true;
      lastX = x; lastY = y;
    }
    function onMove(x, y){
      if(!dragging) return;
      const dx = x - lastX;
      const dy = y - lastY;
      lastX = x; lastY = y;
      // Sensibilitate
      targetTheta -= dx * 0.005;
      targetPhi = Math.max(0.1, Math.min(Math.PI * 0.49, targetPhi - dy * 0.005));
    }
    function onUp(){ dragging = false; }
    function onWheel(deltaY){
      // Scroll wheel: zoom in/out exponențial
      const factor = Math.exp(deltaY * 0.001);
      targetRadius = Math.max(minDist, Math.min(maxDist, targetRadius * factor));
    }

    // MOUSE
    dom.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onUp);
    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      onWheel(e.deltaY);
    }, { passive: false });

    // TOUCH
    dom.addEventListener('touchstart', (e) => {
      e.preventDefault();
      activeTouches = Array.from(e.touches);
      if(e.touches.length === 1){
        onDown(e.touches[0].clientX, e.touches[0].clientY);
      } else if(e.touches.length === 2){
        dragging = false; // pinch, nu rotire
      }
    }, { passive: false });

    dom.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if(e.touches.length === 1 && dragging){
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if(e.touches.length === 2 && activeTouches.length === 2){
        // Pinch-zoom
        const d1 = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const d0 = Math.hypot(
          activeTouches[0].clientX - activeTouches[1].clientX,
          activeTouches[0].clientY - activeTouches[1].clientY
        );
        if(d0 > 0){
          const factor = d0 / d1;
          targetRadius = Math.max(minDist, Math.min(maxDist, targetRadius * factor));
        }
        activeTouches = Array.from(e.touches);
      }
    }, { passive: false });

    dom.addEventListener('touchend', (e) => {
      activeTouches = Array.from(e.touches);
      if(e.touches.length === 0) onUp();
    });

    // Update — lerp soft între current și target
    function update(){
      theta += (targetTheta - theta) * 0.12;
      phi += (targetPhi - phi) * 0.12;
      radius += (targetRadius - radius) * 0.12;
      const sinPhi = Math.sin(phi);
      camera.position.x = target.x + radius * sinPhi * Math.sin(theta);
      camera.position.y = target.y + radius * Math.cos(phi);
      camera.position.z = target.z + radius * sinPhi * Math.cos(theta);
      camera.lookAt(target);
    }

    function dispose(){
      // remove listeners — păstrăm referințele pentru cleanup
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }

    return { update, dispose, target };
  }

  // ═════════════════════════════════════════════════════════════════════════
  // OVERLAY
  // ═════════════════════════════════════════════════════════════════════════
  function _createOverlay(){
    if(STATE.overlay) return null;
    const overlay = document.createElement('div');
    overlay.id = 'vtour-s1-overlay';
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(8,12,20,.85);z-index:99998;
      display:flex;flex-direction:column;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    `;

    const top = document.createElement('div');
    top.style.cssText = `
      display:flex;align-items:center;justify-content:space-between;
      padding:14px 20px;background:rgba(0,0,0,.5);
      border-bottom:1px solid rgba(0,255,136,.2);
    `;
    top.innerHTML = `
      <div style="color:#fff;font-size:14px;font-weight:700">
        🏠 Dollhouse Orbital · <span style="color:#00ff88;font-size:11px;font-weight:500">drag pentru rotire, scroll pentru zoom</span>
      </div>
    `;
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕ Închide';
    closeBtn.style.cssText = `
      background:rgba(239,68,68,.18);color:#fca5a5;
      border:1px solid rgba(239,68,68,.45);border-radius:8px;
      padding:8px 16px;font-size:12px;font-weight:700;cursor:pointer;
      touch-action:manipulation;
    `;
    closeBtn.onclick = () => stop();
    top.appendChild(closeBtn);
    overlay.appendChild(top);

    const canvasCtn = document.createElement('div');
    canvasCtn.id = 'vtour-s1-canvas-ctn';
    canvasCtn.style.cssText = 'flex:1;position:relative;overflow:hidden;';
    overlay.appendChild(canvasCtn);

    const bottom = document.createElement('div');
    bottom.style.cssText = `
      padding:14px 20px;background:rgba(0,0,0,.6);
      border-top:1px solid rgba(0,255,136,.2);
      display:flex;align-items:center;gap:14px;flex-wrap:wrap;
    `;
    bottom.innerHTML = `
      <div style="color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:.3px">EXPLODE ETAJE:</div>
      <input type="range" id="vtour-s1-explode" min="0" max="100" value="100"
        style="flex:1;min-width:200px;max-width:400px;accent-color:#00ff88">
      <div id="vtour-s1-explode-val" style="color:#00ff88;font-size:11px;font-weight:700;min-width:40px">100%</div>
    `;
    overlay.appendChild(bottom);

    document.body.appendChild(overlay);
    STATE.overlay = overlay;

    const slider = document.getElementById('vtour-s1-explode');
    const val = document.getElementById('vtour-s1-explode-val');
    slider.addEventListener('input', () => {
      STATE.targetExplode = parseFloat(slider.value) / 100;
      val.textContent = slider.value + '%';
    });

    return canvasCtn;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // START / STOP
  // ═════════════════════════════════════════════════════════════════════════
  function start(){
    if(STATE.active){ console.warn('[VTour S1] deja activ'); return; }
    const V3D = window.V3D;
    if(!V3D || !V3D.scene || !V3D.r){
      alert('Deschide întâi viewer-ul 3D și apasă "Generează AEDIS".');
      return;
    }
    if(!Array.isArray(V3D.aedis) || V3D.aedis.length === 0){
      alert('Generează întâi volumul AEDIS din panoul stânga.');
      return;
    }
    const THREE = window.THREE;

    STATE.active = true;
    STATE.floorOffsets = [];
    STATE.explodeAmount = 0;
    STATE.targetExplode = 1;

    const canvasCtn = _createOverlay();
    if(!canvasCtn){ STATE.active = false; return; }

    STATE.scene = new THREE.Scene();
    STATE.scene.background = new THREE.Color(0x1a1f2e);
    STATE.scene.fog = new THREE.Fog(0x1a1f2e, 80, 250);

    STATE.canvas = document.createElement('canvas');
    STATE.canvas.style.cssText = 'width:100%;height:100%;display:block;';
    canvasCtn.appendChild(STATE.canvas);

    STATE.renderer = new THREE.WebGLRenderer({ canvas: STATE.canvas, antialias: true });
    STATE.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const w = canvasCtn.clientWidth;
    const h = canvasCtn.clientHeight;
    STATE.renderer.setSize(w, h);
    STATE.renderer.shadowMap.enabled = true;
    STATE.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    STATE.renderer.outputEncoding = THREE.sRGBEncoding;
    STATE.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    STATE.renderer.toneMappingExposure = 1.05;

    const aspect = w / h;
    STATE.camera = new THREE.PerspectiveCamera(45, aspect, 0.5, 500);
    const anchor = _computeAnchor();
    const dist = Math.max(anchor.bW, anchor.bD) * 2.2;
    STATE.camera.position.set(anchor.cx + dist*0.7, anchor.baseY + dist*0.65, anchor.cz + dist*0.7);

    const targetY = anchor.baseY + (anchor.topY - anchor.baseY)/2;
    if(THREE.OrbitControls){
      STATE.controls = new THREE.OrbitControls(STATE.camera, STATE.canvas);
      STATE.controls.target.set(anchor.cx, targetY, anchor.cz);
      STATE.controls.enableDamping = true;
      STATE.controls.dampingFactor = 0.08;
      STATE.controls.minDistance = 5;
      STATE.controls.maxDistance = 150;
      STATE.controls.maxPolarAngle = Math.PI * 0.49;
      console.log('[VTour S1] ✅ OrbitControls activ');
    } else {
      // FALLBACK INLINE — mouse drag + scroll + touch (fără dependențe externe)
      console.warn('[VTour S1] OrbitControls lipsește — folosesc fallback inline');
      STATE.controls = _createInlineOrbit(STATE.camera, STATE.canvas, {
        target: { x: anchor.cx, y: targetY, z: anchor.cz },
        minDistance: 5,
        maxDistance: 150,
      });
    }

    _setupLighting();
    _buildDollhouse();

    STATE._resize = () => {
      if(!STATE.renderer || !canvasCtn) return;
      const w = canvasCtn.clientWidth;
      const h = canvasCtn.clientHeight;
      STATE.renderer.setSize(w, h);
      STATE.camera.aspect = w / h;
      STATE.camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', STATE._resize);

    let errCount = 0;
    const loop = () => {
      if(!STATE.active) return;
      try {
        _updateExplode();
        if(STATE.controls) STATE.controls.update();
        STATE.renderer.render(STATE.scene, STATE.camera);
        STATE.raf = requestAnimationFrame(loop);
      } catch(err){
        errCount++;
        if(errCount <= 3) console.error('[VTour S1] eroare loop:', err);
        if(errCount > 5){
          console.error('[VTour S1] prea multe erori — opresc');
          stop();
        } else {
          STATE.raf = requestAnimationFrame(loop);
        }
      }
    };
    STATE.raf = requestAnimationFrame(loop);
    console.log('[VTour S1] ✅ Dollhouse start complet');
  }

  function stop(){
    STATE.active = false;
    if(STATE.raf){ cancelAnimationFrame(STATE.raf); STATE.raf = null; }
    if(STATE._resize){ window.removeEventListener('resize', STATE._resize); }
    if(STATE.scene){
      STATE.scene.traverse(o => {
        if(o.geometry) o.geometry.dispose();
        if(o.material){
          if(Array.isArray(o.material)) o.material.forEach(m => m.dispose());
          else o.material.dispose();
        }
      });
      STATE.scene = null;
    }
    if(STATE.controls){ STATE.controls.dispose(); STATE.controls = null; }
    if(STATE.renderer){ STATE.renderer.dispose(); STATE.renderer = null; }
    if(STATE.overlay){ STATE.overlay.remove(); STATE.overlay = null; }
    STATE.canvas = null;
    STATE.dollhouseGroup = null;
    STATE.floorOffsets = [];
    console.log('[VTour S1] stop complet');
  }

  window.VTour = { start, stop, _state: STATE };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', _injectButtons);
  } else {
    _injectButtons();
  }
})();
