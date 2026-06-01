/**
 * UrbanX — Virtual Tour 3D
 * First-person walkthrough din scena existentă Urban3D
 * Zero server, zero CDN extern, rulează pe GitHub Pages
 * 
 * Integrare: adaugă buton "Tur 3D" în panoul Urban3D
 * Folosește V3D.scene (deja construit de 06-aedis.js + 11-viewer3d.js)
 */

window.VTour = (function(){
  'use strict';

  const STATE = {
    active: false,
    keys: { w:false, a:false, s:false, d:false, shift:false },
    yaw: 0,
    pitch: 0,
    velocity: { x:0, z:0 },
    groundY: 1.7,            // inaltimea ochilor in metri
    speed: 8,                // m/s
    friction: 0.85,
    pointerLocked: false,
    hotspots: [],            // pozitii predefinite navigare
    currentHotspot: 0,
    animFrame: null,
    clock: null,
    tourCam: null,
    prevCam: null,
    prevRenderer: null,
    overlay: null,
    canvas: null,
    renderer: null,
    prevBgColor: null,
    prevFog: null,
  };

  // ─── Creare renderer dedicat pentru tur ───────────────────────────────────
  function _createRenderer(canvas){
    const THREE = window.THREE;
    const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.setSize(window.innerWidth, window.innerHeight);
    // Fotorealism: tone mapping + shadows
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.0;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    r.outputEncoding = THREE.sRGBEncoding;
    return r;
  }

  // ─── Setup iluminare fotorealista ─────────────────────────────────────────
  function _setupLighting(scene){
    const THREE = window.THREE;

    // Sterge lumini temporare vechi
    const toRemove = [];
    scene.traverse(o => { if(o._vtourLight) toRemove.push(o); });
    toRemove.forEach(o => scene.remove(o));

    // Lumina principala (soare)
    const sun = new THREE.DirectionalLight(0xfff5e4, 2.2);
    sun.position.set(50, 80, 40);
    sun.castShadow = true;
    sun.shadow.mapSize.width  = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near   = 0.5;
    sun.shadow.camera.far    = 500;
    sun.shadow.camera.left   = -80;
    sun.shadow.camera.right  =  80;
    sun.shadow.camera.top    =  80;
    sun.shadow.camera.bottom = -80;
    sun.shadow.bias = -0.001;
    sun._vtourLight = true;
    scene.add(sun);

    // Lumina ambientala (cer)
    const amb = new THREE.HemisphereLight(0x87ceeb, 0x557755, 0.8);
    amb._vtourLight = true;
    scene.add(amb);

    // Fill light (umbra moale)
    const fill = new THREE.DirectionalLight(0xc8d8ff, 0.4);
    fill.position.set(-30, 40, -20);
    fill._vtourLight = true;
    scene.add(fill);

    // Activam umbre pe toate meshele existente
    scene.traverse(o => {
      if(o.isMesh){
        o.castShadow    = true;
        o.receiveShadow = true;
      }
    });
  }

  // ─── Plan sol cu material realist ────────────────────────────────────────
  function _addGround(scene, cx, cz){
    const THREE = window.THREE;
    if(scene._vtourGround){ scene.remove(scene._vtourGround); }

    const geo = new THREE.PlaneGeometry(400, 400, 20, 20);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x556644,
      roughness: 0.95,
      metalness: 0.0,
    });
    const ground = new THREE.Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(cx, -0.05, cz);
    ground.receiveShadow = true;
    ground._vtourGround = true;
    scene._vtourGround = ground;
    scene.add(ground);
  }

  // ─── Cer gradient (sky dome) ──────────────────────────────────────────────
  function _addSky(scene){
    const THREE = window.THREE;
    if(scene._vtourSky){ scene.remove(scene._vtourSky); }

    const geo = new THREE.SphereGeometry(300, 32, 16);
    // Gradient albastru manual via vertex colors
    const colors = [];
    const posArr = geo.attributes.position.array;
    for(let i=0; i<posArr.length; i+=3){
      const y = posArr[i+1];
      const t = Math.max(0, Math.min(1, (y + 100) / 200));
      // Horizon galben-portocaliu → zenith albastru
      const r = 0.52 + (1-t)*0.3;
      const g = 0.72 + (1-t)*0.1;
      const b = 0.98 - (1-t)*0.4;
      colors.push(r,g,b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const mat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide });
    const sky = new THREE.Mesh(geo, mat);
    sky._vtourSky = true;
    scene._vtourSky = sky;
    scene.add(sky);
    scene._vtourBgColor = scene.background;
    scene.background = new THREE.Color(0x87ceeb);
  }

  // ─── Camera first person ──────────────────────────────────────────────────
  function _createFPCam(cx, cz){
    const THREE = window.THREE;
    const cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 500);
    cam.position.set(cx, STATE.groundY, cz + 15);
    return cam;
  }

  // ─── Pointer Lock API ─────────────────────────────────────────────────────
  function _initPointerLock(canvas){
    canvas.addEventListener('click', ()=>{
      if(!STATE.pointerLocked) canvas.requestPointerLock();
    });
    document.addEventListener('pointerlockchange', ()=>{
      STATE.pointerLocked = document.pointerLockElement === canvas;
      const hint = document.getElementById('vtour-hint');
      if(hint) hint.style.display = STATE.pointerLocked ? 'none' : 'flex';
    });
    document.addEventListener('mousemove', e => {
      if(!STATE.pointerLocked) return;
      const sens = 0.002;
      STATE.yaw   -= e.movementX * sens;
      STATE.pitch -= e.movementY * sens;
      STATE.pitch = Math.max(-Math.PI/2.2, Math.min(Math.PI/2.2, STATE.pitch));
    });
  }

  // ─── Keyboard controls ────────────────────────────────────────────────────
  function _initKeys(){
    document.addEventListener('keydown', e => {
      if(!STATE.active) return;
      switch(e.code){
        case 'KeyW': case 'ArrowUp':    STATE.keys.w = true; break;
        case 'KeyS': case 'ArrowDown':  STATE.keys.s = true; break;
        case 'KeyA': case 'ArrowLeft':  STATE.keys.a = true; break;
        case 'KeyD': case 'ArrowRight': STATE.keys.d = true; break;
        case 'ShiftLeft': case 'ShiftRight': STATE.keys.shift = true; break;
        case 'Escape': stop(); break;
      }
    });
    document.addEventListener('keyup', e => {
      switch(e.code){
        case 'KeyW': case 'ArrowUp':    STATE.keys.w = false; break;
        case 'KeyS': case 'ArrowDown':  STATE.keys.s = false; break;
        case 'KeyA': case 'ArrowLeft':  STATE.keys.a = false; break;
        case 'KeyD': case 'ArrowRight': STATE.keys.d = false; break;
        case 'ShiftLeft': case 'ShiftRight': STATE.keys.shift = false; break;
      }
    });
  }

  // ─── Movement update ──────────────────────────────────────────────────────
  function _updateMovement(dt){
    const THREE = window.THREE;
    const cam = STATE.tourCam;
    if(!cam) return;

    const speed = STATE.speed * (STATE.keys.shift ? 2.5 : 1) * dt;
    const sinY = Math.sin(STATE.yaw);
    const cosY = Math.cos(STATE.yaw);

    let dx = 0, dz = 0;
    if(STATE.keys.w){ dx -= sinY; dz -= cosY; }
    if(STATE.keys.s){ dx += sinY; dz += cosY; }
    if(STATE.keys.a){ dx -= cosY; dz += sinY; }
    if(STATE.keys.d){ dx += cosY; dz -= sinY; }

    if(dx !== 0 || dz !== 0){
      const len = Math.sqrt(dx*dx + dz*dz);
      cam.position.x += (dx/len) * speed;
      cam.position.z += (dz/len) * speed;
    }

    // Pastrare la inaltimea solului
    cam.position.y = STATE.groundY;

    // Aplicare rotatie camera
    const euler = new THREE.Euler(STATE.pitch, STATE.yaw, 0, 'YXZ');
    cam.quaternion.setFromEuler(euler);
  }

  // ─── Hotspots navigare Matterport-style ───────────────────────────────────
  function _buildHotspots(scene){
    const THREE = window.THREE;
    STATE.hotspots = [];

    // Colectez pozitiile cladirilor din scena
    const buildings = [];
    scene.traverse(o => {
      if(o.isMesh && o._vtourGround === undefined && !o._vtourSky){
        buildings.push(o);
      }
    });

    if(buildings.length === 0) return;

    // Calculez bounding box al intregii scene
    const bbox = new THREE.Box3();
    buildings.forEach(b => bbox.expandByObject(b));
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    const size = new THREE.Vector3();
    bbox.getSize(size);

    // Genereaza hotspot-uri in jurul cladirii + interior
    const hotspotPositions = [
      { x: center.x,              z: center.z + size.z*0.7,  label: 'Exterior Față' },
      { x: center.x + size.x*0.7, z: center.z,               label: 'Exterior Dreapta' },
      { x: center.x,              z: center.z - size.z*0.7,  label: 'Exterior Spate' },
      { x: center.x - size.x*0.7, z: center.z,               label: 'Exterior Stânga' },
      { x: center.x,              z: center.z,                label: 'Centru Parcelă' },
      { x: center.x,              z: center.z + size.z*1.5,  label: 'Stradă Față' },
    ];

    hotspotPositions.forEach((hp, i) => {
      STATE.hotspots.push({ x: hp.x, y: STATE.groundY, z: hp.z, label: hp.label });
      // Marker vizual (disc pe sol)
      const geo = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16);
      const mat = new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00cc44, emissiveIntensity:0.5 });
      const disc = new THREE.Mesh(geo, mat);
      disc.position.set(hp.x, 0.025, hp.z);
      disc._vtourHotspot = i;
      disc._vtourLabel = hp.label;
      scene.add(disc);
    });

    return center;
  }

  // ─── Overlay HTML ─────────────────────────────────────────────────────────
  function _createOverlay(){
    const ov = document.createElement('div');
    ov.id = 'vtour-overlay';
    ov.style.cssText = `
      position:fixed; top:0; left:0; width:100%; height:100%;
      z-index:99999; background:#000; display:flex; flex-direction:column;
    `;
    ov.innerHTML = `
      <canvas id="vtour-canvas" style="width:100%;height:100%;display:block;outline:none;"></canvas>

      <!-- Crosshair -->
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                  width:18px;height:18px;pointer-events:none;">
        <div style="position:absolute;top:8px;left:0;width:18px;height:2px;background:rgba(255,255,255,.8);border-radius:1px;"></div>
        <div style="position:absolute;left:8px;top:0;width:2px;height:18px;background:rgba(255,255,255,.8);border-radius:1px;"></div>
      </div>

      <!-- Hint click -->
      <div id="vtour-hint" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
           background:rgba(0,0,0,.7);color:white;padding:16px 24px;border-radius:12px;
           font-size:15px;text-align:center;border:1px solid rgba(255,255,255,.2);">
        <div style="font-size:28px;margin-bottom:8px;">👆</div>
        <div><b>Click</b> pentru a intra în tur</div>
        <div style="font-size:12px;color:#aaa;margin-top:6px;">WASD = mișcare · Mouse = privire · ESC = ieșire</div>
      </div>

      <!-- UI top -->
      <div style="position:absolute;top:0;left:0;right:0;padding:12px 16px;
           background:linear-gradient(rgba(0,0,0,.6),transparent);
           display:flex;justify-content:space-between;align-items:center;pointer-events:none;">
        <div style="color:white;font-weight:bold;font-size:14px;">
          <span style="color:#00ff88;">▶</span> TUR VIRTUAL 3D — UrbanX
        </div>
        <div id="vtour-pos" style="color:rgba(255,255,255,.7);font-size:11px;font-family:monospace;"></div>
      </div>

      <!-- Hotspot bar -->
      <div id="vtour-hotspot-bar" style="position:absolute;bottom:60px;left:50%;transform:translateX(-50%);
           display:flex;gap:8px;pointer-events:all;"></div>

      <!-- Controls bottom -->
      <div style="position:absolute;bottom:0;left:0;right:0;padding:10px 16px;
           background:linear-gradient(transparent,rgba(0,0,0,.7));
           display:flex;justify-content:space-between;align-items:center;">
        <div style="color:rgba(255,255,255,.6);font-size:11px;">
          W A S D = mișcare &nbsp;·&nbsp; SHIFT = alergat &nbsp;·&nbsp; Mouse = privire
        </div>
        <button onclick="window.VTour.stop()" style="
          background:rgba(239,68,68,.85);color:white;border:none;padding:8px 20px;
          border-radius:8px;cursor:pointer;font-size:13px;font-weight:bold;">
          ✕ Ieșire Tur
        </button>
      </div>
    `;
    document.body.appendChild(ov);
    STATE.overlay = ov;
    return ov;
  }

  // ─── Populate hotspot bar ─────────────────────────────────────────────────
  function _populateHotspotBar(){
    const bar = document.getElementById('vtour-hotspot-bar');
    if(!bar) return;
    bar.innerHTML = '';
    STATE.hotspots.forEach((hp, i) => {
      const btn = document.createElement('button');
      btn.textContent = hp.label;
      btn.style.cssText = `
        background:rgba(0,0,0,.7);color:white;border:1px solid rgba(255,255,255,.3);
        padding:6px 12px;border-radius:20px;cursor:pointer;font-size:11px;
        transition:all .2s;
      `;
      btn.onmouseover = () => btn.style.background = 'rgba(0,255,136,.3)';
      btn.onmouseout  = () => btn.style.background = 'rgba(0,0,0,.7)';
      btn.onclick = () => teleportTo(i);
      bar.appendChild(btn);
    });
  }

  // ─── Teleport la hotspot ──────────────────────────────────────────────────
  function teleportTo(idx){
    if(!STATE.tourCam || !STATE.hotspots[idx]) return;
    const hp = STATE.hotspots[idx];
    STATE.tourCam.position.set(hp.x, hp.y, hp.z);
    STATE.currentHotspot = idx;
    // Priveste spre centrul scenei
    if(STATE.hotspots.length > 0){
      const cx = STATE.hotspots.reduce((s,h)=>s+h.x,0)/STATE.hotspots.length;
      const cz = STATE.hotspots.reduce((s,h)=>s+h.z,0)/STATE.hotspots.length;
      const dx = cx - hp.x, dz = cz - hp.z;
      STATE.yaw = -Math.atan2(dx, dz);
      STATE.pitch = 0;
    }
  }

  // ─── Loop principal ───────────────────────────────────────────────────────
  function _loop(){
    if(!STATE.active) return;
    STATE.animFrame = requestAnimationFrame(_loop);

    const now = performance.now() / 1000;
    const dt  = Math.min(now - (STATE._lastTime || now), 0.05);
    STATE._lastTime = now;

    _updateMovement(dt);

    // Rotire hotspot-uri (animatie)
    const scene = V3D.scene;
    if(scene){
      scene.traverse(o => {
        if(o._vtourHotspot !== undefined) o.rotation.y += dt * 1.5;
      });
    }

    // Update pozitie HUD
    const posEl = document.getElementById('vtour-pos');
    if(posEl && STATE.tourCam){
      const p = STATE.tourCam.position;
      posEl.textContent = `X:${p.x.toFixed(1)} Z:${p.z.toFixed(1)}`;
    }

    // Render
    if(STATE.renderer && V3D.scene && STATE.tourCam){
      STATE.renderer.render(V3D.scene, STATE.tourCam);
    }
  }

  // ─── START ────────────────────────────────────────────────────────────────
  function start(){
    if(STATE.active) return;

    const THREE = window.THREE;
    if(!THREE){ alert('Three.js nu e încărcat.'); return; }

    const scene = window.V3D && window.V3D.scene;
    if(!scene){ 
      alert('Deschide mai întâi Urban3D și generează o clădire 3D.\nApoi apasă Tur Virtual.'); 
      return; 
    }

    // Verifica ca exista geometrie
    let hasBuilding = false;
    scene.traverse(o => { if(o.isMesh) hasBuilding = true; });
    if(!hasBuilding){
      alert('Nu există geometrie 3D. Generează o clădire în Urban3D mai întâi.'); 
      return; 
    }

    STATE.active = true;

    // Overlay
    _createOverlay();
    const canvas = document.getElementById('vtour-canvas');
    STATE.canvas = canvas;

    // Renderer
    STATE.renderer = _createRenderer(canvas);

    // Iluminare fotorealista
    _setupLighting(scene);

    // Calcul centru scena
    const bbox = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    bbox.getCenter(center);

    // Sol + cer
    _addGround(scene, center.x, center.z);
    _addSky(scene);

    // Camera first-person
    STATE.tourCam = _createFPCam(center.x, center.z);
    STATE.yaw = 0;
    STATE.pitch = 0;

    // Hotspot-uri
    _buildHotspots(scene);
    _populateHotspotBar();

    // Teleport la primul hotspot
    if(STATE.hotspots.length > 0) teleportTo(0);

    // Fog (adancime atmosferica)
    STATE.prevFog = scene.fog;
    scene.fog = new THREE.FogExp2(0x87ceeb, 0.003);

    // Controls
    _initPointerLock(canvas);
    _initKeys();

    // Resize handler
    STATE._resizeHandler = () => {
      if(!STATE.renderer || !STATE.tourCam) return;
      STATE.tourCam.aspect = window.innerWidth / window.innerHeight;
      STATE.tourCam.updateProjectionMatrix();
      STATE.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', STATE._resizeHandler);

    // Start loop
    STATE._lastTime = performance.now() / 1000;
    _loop();

    // Touch controls pentru mobile
    _initTouchControls(canvas);

    console.log('[VTour] Started. Buildings:', scene.children.filter(c=>c.isMesh).length);
  }

  // ─── Touch controls mobile ────────────────────────────────────────────────
  function _initTouchControls(canvas){
    let lastTouch = null;
    canvas.addEventListener('touchstart', e => { lastTouch = e.touches[0]; }, {passive:true});
    canvas.addEventListener('touchmove', e => {
      if(!lastTouch) return;
      const t = e.touches[0];
      const dx = t.clientX - lastTouch.clientX;
      const dy = t.clientY - lastTouch.clientY;
      STATE.yaw   -= dx * 0.005;
      STATE.pitch -= dy * 0.005;
      STATE.pitch  = Math.max(-Math.PI/2.2, Math.min(Math.PI/2.2, STATE.pitch));
      lastTouch = t;
    }, {passive:true});

    // Joystick virtual pentru miscare
    const joyDiv = document.createElement('div');
    joyDiv.style.cssText = `
      position:absolute;bottom:80px;left:20px;width:100px;height:100px;
      background:rgba(255,255,255,.15);border-radius:50%;border:2px solid rgba(255,255,255,.3);
      touch-action:none;
    `;
    const joyKnob = document.createElement('div');
    joyKnob.style.cssText = `
      position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
      width:40px;height:40px;background:rgba(255,255,255,.5);border-radius:50%;
    `;
    joyDiv.appendChild(joyKnob);
    STATE.overlay.appendChild(joyDiv);

    let joyActive = false;
    let joyCenter = {x:0, y:0};

    joyDiv.addEventListener('touchstart', e => {
      joyActive = true;
      const r = joyDiv.getBoundingClientRect();
      joyCenter = {x: r.left + r.width/2, y: r.top + r.height/2};
    }, {passive:true});
    joyDiv.addEventListener('touchmove', e => {
      if(!joyActive) return;
      const t = e.touches[0];
      const dx = t.clientX - joyCenter.x;
      const dy = t.clientY - joyCenter.y;
      const dist = Math.min(35, Math.sqrt(dx*dx+dy*dy));
      const angle = Math.atan2(dy, dx);
      joyKnob.style.left = (50 + Math.cos(angle)*dist/100*100) + '%';
      joyKnob.style.top  = (50 + Math.sin(angle)*dist/100*100) + '%';
      // Map la WASD
      const nx = dx/35, ny = dy/35;
      STATE.keys.w = ny < -0.3;
      STATE.keys.s = ny >  0.3;
      STATE.keys.a = nx < -0.3;
      STATE.keys.d = nx >  0.3;
    }, {passive:true});
    joyDiv.addEventListener('touchend', () => {
      joyActive = false;
      joyKnob.style.left = '50%'; joyKnob.style.top = '50%';
      STATE.keys.w = STATE.keys.s = STATE.keys.a = STATE.keys.d = false;
    }, {passive:true});
  }

  // ─── STOP ─────────────────────────────────────────────────────────────────
  function stop(){
    if(!STATE.active) return;
    STATE.active = false;

    // Opreste loop
    if(STATE.animFrame){ cancelAnimationFrame(STATE.animFrame); STATE.animFrame = null; }

    // Elibereaza pointer lock
    if(document.pointerLockElement) document.exitPointerLock();
    STATE.pointerLocked = false;

    // Curata scena
    const scene = window.V3D && window.V3D.scene;
    if(scene){
      // Sterge elemente tur
      const toRemove = [];
      scene.traverse(o => {
        if(o._vtourLight || o._vtourHotspot !== undefined) toRemove.push(o);
      });
      toRemove.forEach(o => scene.remove(o));
      if(scene._vtourGround){ scene.remove(scene._vtourGround); delete scene._vtourGround; }
      if(scene._vtourSky){ scene.remove(scene._vtourSky); delete scene._vtourSky; }
      // Restaureaza fog
      scene.fog = STATE.prevFog || null;
    }

    // Dispose renderer
    if(STATE.renderer){ STATE.renderer.dispose(); STATE.renderer = null; }

    // Sterge overlay
    if(STATE.overlay){ STATE.overlay.remove(); STATE.overlay = null; }

    // Resize handler
    if(STATE._resizeHandler){ window.removeEventListener('resize', STATE._resizeHandler); }

    // Re-render V3D normal
    if(window.V3D && window.V3D.r && window.V3D.scene && window.V3D.cam){
      setTimeout(()=>{
        try{ window.V3D.r.render(window.V3D.scene, window.V3D.cam); }catch(e){}
      }, 100);
    }

    console.log('[VTour] Stopped.');
  }

  // ─── Buton în UI Urban3D ──────────────────────────────────────────────────
  function _injectButton(){
    // Injecteaza butonul dupa ce DOM e gata
    const tryInject = () => {
      // Cauta bara de butoane din panoul Urban3D / 3D Aedis
      const targets = [
        document.querySelector('.aedis-dim-btn-row'),
        document.querySelector('#aedis-modal .aedis-header'),
        document.querySelector('[data-tab="urban3d"]'),
      ].filter(Boolean);

      if(targets.length === 0){
        setTimeout(tryInject, 1000);
        return;
      }

      targets.forEach(target => {
        if(target.querySelector('#vtour-launch-btn')) return;
        const btn = document.createElement('button');
        btn.id = 'vtour-launch-btn';
        btn.innerHTML = '🥽 Tur Virtual';
        btn.title = 'Tur 3D first-person fotorealist';
        btn.className = 'aedis-dim-btn';
        btn.style.cssText = `
          background: linear-gradient(135deg, #1a1a2e, #16213e) !important;
          border: 1px solid #00ff88 !important;
          color: #00ff88 !important;
          font-weight: bold;
        `;
        btn.onclick = () => start();
        target.appendChild(btn);
      });
    };
    setTimeout(tryInject, 500);
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  function init(){
    _injectButton();
    // Expune global
    window.VTour = { start, stop, teleportTo, STATE };
    console.log('[VTour] Initialized. Buton "Tur Virtual" injectat în Urban3D.');
  }

  // Auto-init dupa DOM
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 500);
  }

  return { start, stop, teleportTo, STATE, init };

})();
