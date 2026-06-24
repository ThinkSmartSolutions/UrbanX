/* ═══════════════════════════════════════════════════════════════════════════
   UrbanX · Tur Virtual 3D · Sesiunea Curată S1c
   ──────────────────────────────────────────────────────────────────────────
   DOLLHOUSE ORBITAL — vizualizare Matterport casa-păpușii
   Fix-uri S1c (post-screenshot Florin):
   • AEDIS.corpuri[0].niv (era citit greșit din AEDIS.niv = string)
   • Paletă mobilier DIVERSĂ (12 materiale cu culori distincte)
   • Material podea specific per tip cameră (vizual identitate)
   • Cer gradient + grass plane (nu fundal negru)
   • Camera mai aproape de start + zoom min 2m
   • Mobilier complet: noptiere, dulap, scaune, chiuvetă, hol
   • Uși din releveu — deschideri în pereți + prag pe podea
   ═══════════════════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  const VERSION = '20260604-S1c-DOLLHOUSE';
  console.log('[VTour S1c] versiune', VERSION);

  const STATE = {
    active: false, overlay: null, canvas: null,
    renderer: null, scene: null, camera: null, controls: null,
    dollhouseGroup: null, floorOffsets: [],
    explodeAmount: 0, targetExplode: 1,
    raf: null, _anchor: null, _aedisFloors: null,
  };

  // ═════════════════════════════════════════════════════════════════════════
  // PALETĂ MATERIALE — culori distincte pentru identitate vizuală clară
  // ═════════════════════════════════════════════════════════════════════════
  let PAL = null;
  function _palette(){
    if(PAL) return PAL;
    const THREE = window.THREE;
    PAL = {
      // ── Podele per tip cameră ──
      floorLiving:    new THREE.MeshStandardMaterial({ color: 0xd4a574, roughness: 0.65 }), // lemn cald
      floorBedroom:   new THREE.MeshStandardMaterial({ color: 0xc89968, roughness: 0.7  }), // lemn natural
      floorKitchen:   new THREE.MeshStandardMaterial({ color: 0x4a5160, roughness: 0.4, metalness: 0.15 }), // gri închis marmură
      floorBath:      new THREE.MeshStandardMaterial({ color: 0xb8d4e3, roughness: 0.3, metalness: 0.1 }),  // gresie albastră
      floorHall:      new THREE.MeshStandardMaterial({ color: 0xe6d4b8, roughness: 0.6  }), // bej deschis
      floorOffice:    new THREE.MeshStandardMaterial({ color: 0x8b5a3c, roughness: 0.5  }), // lemn închis
      floorBalcony:   new THREE.MeshStandardMaterial({ color: 0x6b6b6b, roughness: 0.85 }), // beton

      // ── Mobilier — diversificat ──
      sofa:           new THREE.MeshStandardMaterial({ color: 0x3a4a5e, roughness: 0.9  }), // gri-albastru închis
      sofaCushion:    new THREE.MeshStandardMaterial({ color: 0xc97862, roughness: 0.9  }), // perne portocaliu
      mattress:       new THREE.MeshStandardMaterial({ color: 0xf5f1e8, roughness: 0.85 }), // saltea crem
      blanket:        new THREE.MeshStandardMaterial({ color: 0x2d6b75, roughness: 0.9  }), // pătură verde-petrol
      pillow:         new THREE.MeshStandardMaterial({ color: 0xe2a172, roughness: 0.85 }), // pernă portocaliu
      bedFrame:       new THREE.MeshStandardMaterial({ color: 0x4a3829, roughness: 0.55 }), // lemn maro închis
      woodDark:       new THREE.MeshStandardMaterial({ color: 0x5d3e2c, roughness: 0.55 }), // mobilier lemn închis
      woodLight:      new THREE.MeshStandardMaterial({ color: 0xc9a17a, roughness: 0.55 }), // lemn deschis
      countertop:     new THREE.MeshStandardMaterial({ color: 0xe8e4dc, roughness: 0.3, metalness: 0.2 }), // marmură deschisă
      appliance:      new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.4, metalness: 0.5 }), // inox
      sanitar:        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.1 }), // alb strălucitor
      glass:          new THREE.MeshStandardMaterial({ color: 0xb0d4e8, roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.4 }),
      metal:          new THREE.MeshStandardMaterial({ color: 0x8a8e94, roughness: 0.4, metalness: 0.7 }),
      green:          new THREE.MeshStandardMaterial({ color: 0x4a7c4a, roughness: 0.85 }), // plante

      // ── Pereți ──
      wallExt:        new THREE.MeshStandardMaterial({ color: 0xeae3d8, roughness: 0.92, transparent: true, opacity: 0.18, side: THREE.DoubleSide }),
      wallInt:        new THREE.MeshStandardMaterial({ color: 0xf2ede4, roughness: 0.92, side: THREE.DoubleSide }),

      // ── Acoperiș ──
      roof:           new THREE.MeshStandardMaterial({ color: 0x6b4d3a, roughness: 0.85 }),
      chimney:        new THREE.MeshStandardMaterial({ color: 0x8b5a3c, roughness: 0.85 }),

      // ── Context ──
      grass:          new THREE.MeshStandardMaterial({ color: 0x7fa860, roughness: 0.95 }),
    };
    return PAL;
  }

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
      console.log('[VTour S1c] Buton injectat');
      return true;
    };
    if(tryInject()) return;
    const observer = new MutationObserver(() => { tryInject(); });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CITIRE AEDIS — FIX: citesc din corpuri[0].niv (locul corect)
  // ═════════════════════════════════════════════════════════════════════════
  function _readAedisFloors(){
    const A = window.AEDIS;
    if(!A) return null;
    const fnMap = (window.AEDIS_FN || {});
    const corp = (Array.isArray(A.corpuri) && A.corpuri[0]) ? A.corpuri[0] : {};
    const niv = parseInt(corp.niv) || parseInt(A.niv) || 1;
    const hNiv = parseFloat(corp.hNiv) || 3.0;

    const fnNormal = A.fn || 'rezidential_colectiv';
    const fnDataNormal = fnMap[fnNormal] || {};

    // Parter diferit?
    let hParter = hNiv;
    if(A.parterDiferit){
      const fnParter = A.fnParter || fnNormal;
      const fnDataParter = fnMap[fnParter] || {};
      hParter = parseFloat(fnDataParter.hParter) || 4.5;
    } else if(fnDataNormal.hParter){
      hParter = parseFloat(fnDataNormal.hParter);
    }

    const floors = [];
    let cumY = 0;
    for(let i = 0; i < niv; i++){
      const h = (i === 0) ? hParter : hNiv;
      floors.push({ idx: i, baseY: cumY, height: h });
      cumY += h;
    }
    // Penthouse activ?
    let penthouse = null;
    if(A.penthouseActiv){
      penthouse = { idx: niv, baseY: cumY, height: 2.7, isPenthouse: true };
      floors.push(penthouse);
      cumY += penthouse.height;
    }
    console.log(`[VTour S1c] AEDIS: niv=${niv}, total floors=${floors.length}, totalH=${cumY.toFixed(1)}m, parterDif=${!!A.parterDiferit}`);
    return { floors, totalHeight: cumY, niv, tipAcoperis: A.tipAcoperis || 'terasa_plata' };
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
    return { cx: center.x, cz: center.z, baseY: bbox.min.y, bW, bD, topY: bbox.max.y };
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CONSTRUIRE DOLLHOUSE
  // ═════════════════════════════════════════════════════════════════════════
  function _buildDollhouse(){
    const THREE = window.THREE;
    const pal = _palette();
    const anchor = _computeAnchor();
    const aedisFloors = _readAedisFloors();
    if(!aedisFloors){ console.warn('[VTour S1c] AEDIS lipsește'); return null; }
    const RV = window._RV;
    const hasRelevee = RV && Array.isArray(RV.floors) && RV.floors.length > 0;

    const group = new THREE.Group();
    group.name = 'VTourDollhouse';

    const wallThickExt = 0.22;
    const wallThickInt = 0.10;
    const bW = anchor.bW, bD = anchor.bD;
    const ox = anchor.cx - bW / 2;
    const oz = anchor.cz - bD / 2;

    aedisFloors.floors.forEach((floor, fIdx) => {
      const wallH = floor.height * 0.95; // pereți puțin mai joși decât plafonul
      const floorGroup = new THREE.Group();
      floorGroup.name = `Floor_${fIdx}`;
      floorGroup.userData.baseY = anchor.baseY + floor.baseY;
      floorGroup.userData.fIdx = fIdx;

      // ── Plafon/podea exterioară a etajului (placă) ──
      const slabMat = (fIdx === 0) ? pal.floorHall : pal.floorBedroom;
      const slab = new THREE.Mesh(new THREE.BoxGeometry(bW + 0.15, 0.18, bD + 0.15), slabMat);
      slab.position.set(anchor.cx, -0.09, anchor.cz);
      slab.castShadow = true; slab.receiveShadow = true;
      floorGroup.add(slab);

      // ── Pereți exteriori semi-transparenți ──
      // Sud (z+)
      const wS = new THREE.Mesh(new THREE.BoxGeometry(bW, wallH, wallThickExt), pal.wallExt);
      wS.position.set(anchor.cx, wallH/2, anchor.cz + bD/2);
      floorGroup.add(wS);
      const wN = wS.clone();
      wN.position.set(anchor.cx, wallH/2, anchor.cz - bD/2);
      floorGroup.add(wN);
      const wE = new THREE.Mesh(new THREE.BoxGeometry(wallThickExt, wallH, bD), pal.wallExt);
      wE.position.set(anchor.cx + bW/2, wallH/2, anchor.cz);
      floorGroup.add(wE);
      const wW = wE.clone();
      wW.position.set(anchor.cx - bW/2, wallH/2, anchor.cz);
      floorGroup.add(wW);

      // ── Camere din releveu ──
      if(hasRelevee){
        const rvFloor = RV.floors[Math.min(fIdx, RV.floors.length - 1)];
        if(rvFloor && Array.isArray(rvFloor.rects)){
          rvFloor.rects.forEach(r => {
            if(!isFinite(r.w) || !isFinite(r.h) || r.w <= 0.1 || r.h <= 0.1) return;

            if(r.bal){
              const bal = new THREE.Mesh(new THREE.BoxGeometry(r.w, 0.08, r.h), pal.floorBalcony);
              bal.position.set(ox + r.x + r.w/2, 0.04, oz + r.y + r.h/2);
              bal.castShadow = true; bal.receiveShadow = true;
              floorGroup.add(bal);
              // Balustradă
              const rail = new THREE.Mesh(new THREE.BoxGeometry(r.w, 0.95, 0.04), pal.glass);
              rail.position.set(ox + r.x + r.w/2, 0.48, oz + r.y + r.h);
              floorGroup.add(rail);
              return;
            }

            // Podea cu material distinct per tip cameră
            const floorMat = _floorMatFor(r.t, pal);
            const cFloor = new THREE.Mesh(
              new THREE.BoxGeometry(r.w * 0.97, 0.025, r.h * 0.97),
              floorMat
            );
            cFloor.position.set(ox + r.x + r.w/2, 0.014, oz + r.y + r.h/2);
            cFloor.receiveShadow = true;
            floorGroup.add(cFloor);

            // Pereți interiori — la jumătate înălțime ca să vezi peste
            const halfH = wallH * 0.6;
            // Pereți cu deschideri pentru uși
            _buildRoomWalls(floorGroup, r, ox, oz, halfH, pal, wallThickInt);

            // Mobilier
            _addRoomFurniture(floorGroup, r, ox, oz, pal);
          });
        }
      }

      group.add(floorGroup);
      STATE.floorOffsets.push(floorGroup);
    });

    // ── Acoperiș ──
    const roofGroup = new THREE.Group();
    roofGroup.name = 'Roof';
    const tipAc = aedisFloors.tipAcoperis;
    if(tipAc === 'sarpanta' || tipAc === 'mansarda'){
      // Acoperiș cu pantă (piramidal simplu)
      const roofH = Math.min(bW, bD) * 0.18;
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(Math.max(bW, bD) * 0.65, roofH * 2, 4, 1),
        pal.roof
      );
      roof.rotation.y = Math.PI / 4;
      roof.position.set(anchor.cx, roofH, anchor.cz);
      roof.scale.set(bW / Math.max(bW,bD), 1, bD / Math.max(bW,bD));
      roof.castShadow = true; roof.receiveShadow = true;
      roofGroup.add(roof);
    } else {
      // Terasă plată
      const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(bW + 0.25, 0.3, bD + 0.25), pal.roof);
      roofSlab.position.set(anchor.cx, 0.15, anchor.cz);
      roofSlab.castShadow = true; roofSlab.receiveShadow = true;
      roofGroup.add(roofSlab);
      // Coșuri (2)
      const ch1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.8, 0.5), pal.chimney);
      ch1.position.set(anchor.cx + bW*0.25, 0.7, anchor.cz - bD*0.2);
      ch1.castShadow = true;
      roofGroup.add(ch1);
      const ch2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 0.5), pal.chimney);
      ch2.position.set(anchor.cx - bW*0.25, 0.575, anchor.cz + bD*0.2);
      ch2.castShadow = true;
      roofGroup.add(ch2);
    }
    roofGroup.userData.baseY = anchor.baseY + aedisFloors.totalHeight + 0.15;
    group.add(roofGroup);
    STATE.floorOffsets.push(roofGroup);

    STATE.scene.add(group);
    STATE.dollhouseGroup = group;
    STATE._anchor = anchor;
    STATE._aedisFloors = aedisFloors;
    console.log(`[VTour S1c] Dollhouse: ${aedisFloors.floors.length} etaje + acoperiș`);
    return group;
  }

  function _floorMatFor(type, pal){
    switch(type){
      case 'bath': case 'wc': return pal.floorBath;
      case 'kitchen':         return pal.floorKitchen;
      case 'living': case 'dining': return pal.floorLiving;
      case 'bedroom': case 'bedroom2': case 'bedroom3': return pal.floorBedroom;
      case 'office':          return pal.floorOffice;
      case 'hall': case 'corridor': case 'core': return pal.floorHall;
      default: return pal.floorLiving;
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // PEREȚI CAMERĂ — cu deschideri pentru uși (dacă releveul are r.doors[])
  // ═════════════════════════════════════════════════════════════════════════
  function _buildRoomWalls(group, r, ox, oz, h, pal, t){
    const THREE = window.THREE;
    const cx = ox + r.x;
    const cz = oz + r.y;
    const w = r.w, d = r.h;
    // Pentru fiecare din 4 laturi, dacă nu există ușă, fac perete plin.
    // Detectare ușă: r.doors poate fi array cu { side: 's'|'n'|'e'|'v', pos: x relativ, w: lățime }
    const doors = Array.isArray(r.doors) ? r.doors : [];

    const sideHasDoor = (side) => doors.find(dd => dd.side === side);

    // Funcție pentru a construi perete cu eventuală deschidere
    const wall = (x, y, z, ww, hh, dd, hasDoor, doorPos, doorW) => {
      if(!hasDoor){
        const m = new THREE.Mesh(new THREE.BoxGeometry(ww, hh, dd), pal.wallInt);
        m.position.set(x, y, z);
        m.castShadow = true; m.receiveShadow = true;
        group.add(m);
        return;
      }
      // Cu ușă: 2 segmente + buiandrug deasupra
      const isHorizontal = ww > dd;
      if(isHorizontal){
        // Pe X — segmente stânga + dreapta
        const halfW = ww / 2;
        const dx = doorPos - halfW; // dx în sistemul perete
        const seg1W = Math.max(0.1, halfW + dx - doorW/2);
        const seg2W = Math.max(0.1, halfW - dx - doorW/2);
        if(seg1W > 0.1){
          const s1 = new THREE.Mesh(new THREE.BoxGeometry(seg1W, hh, dd), pal.wallInt);
          s1.position.set(x - halfW + seg1W/2, y, z);
          s1.castShadow = true; s1.receiveShadow = true;
          group.add(s1);
        }
        if(seg2W > 0.1){
          const s2 = new THREE.Mesh(new THREE.BoxGeometry(seg2W, hh, dd), pal.wallInt);
          s2.position.set(x + halfW - seg2W/2, y, z);
          s2.castShadow = true; s2.receiveShadow = true;
          group.add(s2);
        }
      } else {
        // Pe Z — segmente sud + nord
        const halfD = dd / 2;
        const dz = doorPos - halfD;
        const seg1D = Math.max(0.1, halfD + dz - doorW/2);
        const seg2D = Math.max(0.1, halfD - dz - doorW/2);
        if(seg1D > 0.1){
          const s1 = new THREE.Mesh(new THREE.BoxGeometry(ww, hh, seg1D), pal.wallInt);
          s1.position.set(x, y, z - halfD + seg1D/2);
          s1.castShadow = true; s1.receiveShadow = true;
          group.add(s1);
        }
        if(seg2D > 0.1){
          const s2 = new THREE.Mesh(new THREE.BoxGeometry(ww, hh, seg2D), pal.wallInt);
          s2.position.set(x, y, z + halfD - seg2D/2);
          s2.castShadow = true; s2.receiveShadow = true;
          group.add(s2);
        }
      }
    };

    // 4 laturi
    const dS = sideHasDoor('s');
    wall(cx + w/2, h/2, cz + d, w, h, t, !!dS, dS ? dS.pos : 0, dS ? (dS.w || 0.9) : 0);
    const dN = sideHasDoor('n');
    wall(cx + w/2, h/2, cz, w, h, t, !!dN, dN ? dN.pos : 0, dN ? (dN.w || 0.9) : 0);
    const dE = sideHasDoor('e');
    wall(cx + w, h/2, cz + d/2, t, h, d, !!dE, dE ? dE.pos : 0, dE ? (dE.w || 0.9) : 0);
    const dV = sideHasDoor('v');
    wall(cx, h/2, cz + d/2, t, h, d, !!dV, dV ? dV.pos : 0, dV ? (dV.w || 0.9) : 0);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MOBILIER COMPLET — culori distincte, mai multe piese per cameră
  // ═════════════════════════════════════════════════════════════════════════
  function _addRoomFurniture(group, r, ox, oz, pal){
    const THREE = window.THREE;
    const cx = ox + r.x + r.w/2;
    const cz = oz + r.y + r.h/2;
    if(r.w < 1.5 || r.h < 1.5) return;
    const box = (x,y,z,w,h,d,mat) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), mat);
      m.position.set(x,y,z); m.castShadow = true; m.receiveShadow = true;
      group.add(m); return m;
    };

    if(r.t === 'living' || r.t === 'dining'){
      // SOFA cu spătar + perne
      const sw = Math.min(r.w * 0.55, 2.4);
      box(cx, 0.25, cz - r.h/2 + 0.45, sw, 0.45, 0.85, pal.sofa);          // bază
      box(cx, 0.65, cz - r.h/2 + 0.12, sw, 0.5, 0.18, pal.sofa);            // spătar
      box(cx - sw*0.3, 0.55, cz - r.h/2 + 0.4, 0.4, 0.2, 0.3, pal.sofaCushion); // pernă 1
      box(cx + sw*0.3, 0.55, cz - r.h/2 + 0.4, 0.4, 0.2, 0.3, pal.sofaCushion); // pernă 2
      // Măsuță cafea
      box(cx, 0.22, cz + 0.1, 1.0, 0.4, 0.55, pal.woodDark);
      // TV pe perete opus
      box(cx, 1.3, cz + r.h/2 - 0.12, 1.6, 0.9, 0.06, pal.sofa);
      // Plantă într-un colț
      box(cx + r.w/2 - 0.35, 0.5, cz - r.h/2 + 0.35, 0.5, 0.9, 0.5, pal.green);
      box(cx + r.w/2 - 0.35, 0.1, cz - r.h/2 + 0.35, 0.5, 0.2, 0.5, pal.woodDark);
      // Covor decorativ (placă subțire colorată)
      box(cx, 0.026, cz - 0.1, sw * 0.9, 0.005, 1.3, pal.sofaCushion);
    }
    else if(r.t === 'bedroom' || r.t === 'bedroom2' || r.t === 'bedroom3'){
      // PAT — saltea + tăblie + așternut + perne
      const bw = Math.min(r.w * 0.45, 1.8);
      const bd = Math.min(r.h * 0.65, 2.0);
      const bedCx = cx;
      const bedCz = cz + 0.15;
      // Rama pat (înălțată)
      box(bedCx, 0.15, bedCz, bw + 0.15, 0.3, bd + 0.15, pal.bedFrame);
      // Salteaua (mai mică, deasupra)
      box(bedCx, 0.35, bedCz, bw, 0.18, bd, pal.mattress);
      // Pătură verde-petrol
      box(bedCx, 0.46, bedCz + 0.1, bw - 0.05, 0.02, bd - 0.4, pal.blanket);
      // 2 perne portocaliu/crem la cap
      box(bedCx - bw*0.22, 0.49, bedCz - bd/2 + 0.25, bw*0.35, 0.1, 0.35, pal.pillow);
      box(bedCx + bw*0.22, 0.49, bedCz - bd/2 + 0.25, bw*0.35, 0.1, 0.35, pal.pillow);
      // Tăblie (lemn închis)
      box(bedCx, 0.75, bedCz - bd/2 - 0.05, bw + 0.2, 1.1, 0.08, pal.bedFrame);
      // 2 NOPTIERE pe părți
      if(bedCx - bw/2 - 0.5 > cx - r.w/2 + 0.3){
        box(bedCx - bw/2 - 0.3, 0.3, bedCz - bd/2 + 0.25, 0.45, 0.55, 0.4, pal.woodDark);
        box(bedCx - bw/2 - 0.3, 0.62, bedCz - bd/2 + 0.25, 0.2, 0.05, 0.2, pal.sanitar); // lampă
      }
      if(bedCx + bw/2 + 0.5 < cx + r.w/2 - 0.3){
        box(bedCx + bw/2 + 0.3, 0.3, bedCz - bd/2 + 0.25, 0.45, 0.55, 0.4, pal.woodDark);
        box(bedCx + bw/2 + 0.3, 0.62, bedCz - bd/2 + 0.25, 0.2, 0.05, 0.2, pal.sanitar);
      }
      // DULAP pe peretele opus
      if(r.h > 3){
        box(cx, 1.05, cz + r.h/2 - 0.35, Math.min(r.w * 0.7, 2.2), 2.05, 0.55, pal.woodLight);
      }
    }
    else if(r.t === 'kitchen'){
      // BLAT continuu pe latura nordică
      const kw = Math.min(r.w * 0.85, 3.5);
      box(cx, 0.45, cz - r.h/2 + 0.35, kw, 0.05, 0.6, pal.countertop);  // blat marmură
      box(cx, 0.22, cz - r.h/2 + 0.35, kw, 0.43, 0.6, pal.woodLight);    // dulapuri jos
      // FRIGIDER inox
      const fX = cx + r.w/2 - 0.45;
      box(fX, 0.9, cz - r.h/2 + 0.4, 0.7, 1.8, 0.65, pal.appliance);
      // Aragaz pe blat
      box(cx, 0.49, cz - r.h/2 + 0.35, 0.6, 0.04, 0.55, pal.metal);
      // Hota
      box(cx, 1.45, cz - r.h/2 + 0.3, 0.7, 0.4, 0.4, pal.metal);
      // Insulă mică în mijloc (dacă încape)
      if(r.w > 3 && r.h > 3){
        box(cx, 0.42, cz + 0.2, 1.4, 0.04, 0.7, pal.countertop);
        box(cx, 0.21, cz + 0.2, 1.4, 0.42, 0.7, pal.woodDark);
      }
      // Dulapuri sus (placa orizontală)
      box(cx, 1.65, cz - r.h/2 + 0.25, kw, 0.55, 0.4, pal.woodLight);
    }
    else if(r.t === 'bath' || r.t === 'wc'){
      // CADĂ albă (doar baie mare)
      if(r.t === 'bath' && r.w > 1.8 && r.h > 2.0){
        box(cx, 0.27, cz + r.h/2 - 0.4, 1.7, 0.55, 0.75, pal.sanitar);
      }
      // WC
      const wX = cx - r.w/2 + 0.32;
      box(wX, 0.22, cz - 0.2, 0.4, 0.43, 0.55, pal.sanitar); // bază
      box(wX, 0.5, cz - 0.4, 0.4, 0.15, 0.15, pal.sanitar); // rezervor
      // Chiuvetă (lavoar) cu suport
      const sX = cx + r.w/2 - 0.35;
      box(sX, 0.7, cz - r.h/2 + 0.3, 0.65, 0.05, 0.45, pal.sanitar); // blat
      box(sX, 0.4, cz - r.h/2 + 0.3, 0.65, 0.6, 0.45, pal.woodLight); // mobilier
      // Oglindă
      box(sX, 1.4, cz - r.h/2 + 0.12, 0.6, 0.6, 0.04, pal.glass);
    }
    else if(r.t === 'office'){
      // Birou
      box(cx, 0.39, cz - r.h/2 + 0.4, 1.5, 0.05, 0.75, pal.woodDark);
      box(cx - 0.6, 0.2, cz - r.h/2 + 0.4, 0.05, 0.4, 0.7, pal.woodDark);
      box(cx + 0.6, 0.2, cz - r.h/2 + 0.4, 0.05, 0.4, 0.7, pal.woodDark);
      // Scaun office
      box(cx, 0.25, cz - r.h/2 + 1.1, 0.55, 0.5, 0.55, pal.sofa);
      box(cx, 0.6, cz - r.h/2 + 1.32, 0.55, 0.5, 0.07, pal.sofa);
      // Monitor pe birou
      box(cx, 0.65, cz - r.h/2 + 0.3, 0.6, 0.4, 0.04, pal.sofa);
      // Bibliotecă pe perete opus
      if(r.h > 3){
        box(cx, 1.0, cz + r.h/2 - 0.2, Math.min(r.w * 0.6, 2.0), 1.9, 0.35, pal.woodDark);
      }
    }
    else if(r.t === 'hall' || r.t === 'corridor'){
      // Dulap hol (cuier)
      if(r.w > 2){
        box(cx, 0.95, cz + r.h/2 - 0.2, Math.min(r.w * 0.5, 1.4), 1.85, 0.4, pal.woodLight);
      }
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // LIGHTING + CER GRADIENT + GRASS
  // ═════════════════════════════════════════════════════════════════════════
  function _setupSceneAtmosphere(){
    const THREE = window.THREE;
    const scene = STATE.scene;
    const anchor = _computeAnchor();

    // CER gradient — folosim o sferă mare cu shader simplu
    const skyGeom = new THREE.SphereGeometry(500, 32, 16);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor:    { value: new THREE.Color(0x7fb8d9) },
        bottomColor: { value: new THREE.Color(0xe8f4fa) },
        offset:      { value: 33 },
        exponent:    { value: 0.6 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
    });
    const sky = new THREE.Mesh(skyGeom, skyMat);
    scene.add(sky);

    // GRASS plane (sub clădire)
    const pal = _palette();
    const grass = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      pal.grass
    );
    grass.rotation.x = -Math.PI / 2;
    grass.position.set(anchor.cx, anchor.baseY - 0.1, anchor.cz);
    grass.receiveShadow = true;
    scene.add(grass);

    // SOARE direcțional cu shadow 2K
    const sun = new THREE.DirectionalLight(0xfff4e0, 2.4);
    sun.position.set(anchor.cx + 40, anchor.baseY + 80, anchor.cz + 30);
    sun.target.position.set(anchor.cx, anchor.baseY, anchor.cz);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 200;
    const shadowExtent = Math.max(anchor.bW, anchor.bD) * 1.5;
    sun.shadow.camera.left = -shadowExtent;
    sun.shadow.camera.right = shadowExtent;
    sun.shadow.camera.top = shadowExtent;
    sun.shadow.camera.bottom = -shadowExtent;
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.02;
    sun.shadow.radius = 4;
    scene.add(sun);
    scene.add(sun.target);

    // Hemi pentru ambient cer/sol
    const hemi = new THREE.HemisphereLight(0xcce4f5, 0x7a8466, 0.55);
    scene.add(hemi);

    // Fill rece opus
    const fill = new THREE.DirectionalLight(0xc8d8ee, 0.3);
    fill.position.set(anchor.cx - 30, anchor.baseY + 40, anchor.cz - 20);
    scene.add(fill);

    // HDRI opțional dacă există
    if(THREE.RGBELoader){
      try {
        new THREE.RGBELoader().load('assets/tur3d/hdri/exterior.hdr',
          (tex) => {
            try {
              tex.mapping = THREE.EquirectangularReflectionMapping;
              if(STATE.scene){
                STATE.scene.environment = tex;
                console.log('[VTour S1c] ✅ HDRI încărcat');
              }
            } catch(e){}
          }, undefined, () => {}
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
  // INLINE ORBIT CONTROLS — fallback robust
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
    const offset = new THREE.Vector3();
    offset.copy(camera.position).sub(target);
    let radius = offset.length();
    let theta = Math.atan2(offset.x, offset.z);
    let phi = Math.acos(Math.max(-1, Math.min(1, offset.y / radius)));
    let targetTheta = theta, targetPhi = phi, targetRadius = radius;
    let dragging = false, lastX = 0, lastY = 0;
    let activeTouches = [];

    const onDown = (x,y) => { dragging = true; lastX = x; lastY = y; };
    const onMove = (x,y) => {
      if(!dragging) return;
      const dx = x - lastX, dy = y - lastY;
      lastX = x; lastY = y;
      targetTheta -= dx * 0.005;
      targetPhi = Math.max(0.1, Math.min(Math.PI * 0.49, targetPhi - dy * 0.005));
    };
    const onUp = () => { dragging = false; };
    const onWheel = (deltaY) => {
      const factor = Math.exp(deltaY * 0.001);
      targetRadius = Math.max(minDist, Math.min(maxDist, targetRadius * factor));
    };

    const mouseMoveHandler = (e) => onMove(e.clientX, e.clientY);
    const mouseUpHandler = () => onUp();
    dom.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
    dom.addEventListener('wheel', (e) => { e.preventDefault(); onWheel(e.deltaY); }, { passive: false });
    dom.addEventListener('touchstart', (e) => {
      e.preventDefault();
      activeTouches = Array.from(e.touches);
      if(e.touches.length === 1) onDown(e.touches[0].clientX, e.touches[0].clientY);
      else if(e.touches.length === 2) dragging = false;
    }, { passive: false });
    dom.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if(e.touches.length === 1 && dragging){
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if(e.touches.length === 2 && activeTouches.length === 2){
        const d1 = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        const d0 = Math.hypot(activeTouches[0].clientX - activeTouches[1].clientX, activeTouches[0].clientY - activeTouches[1].clientY);
        if(d0 > 0){
          targetRadius = Math.max(minDist, Math.min(maxDist, targetRadius * (d0/d1)));
        }
        activeTouches = Array.from(e.touches);
      }
    }, { passive: false });
    dom.addEventListener('touchend', (e) => {
      activeTouches = Array.from(e.touches);
      if(e.touches.length === 0) onUp();
    });

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
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
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
      position:fixed;inset:0;background:rgba(8,12,20,.92);z-index:99998;
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
        🏠 Dollhouse Orbital · <span style="color:#00ff88;font-size:11px;font-weight:500">drag = rotire · scroll = zoom · pinch = mobile zoom</span>
      </div>
    `;
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕ Închide';
    closeBtn.style.cssText = `
      background:rgba(239,68,68,.18);color:#fca5a5;
      border:1px solid rgba(239,68,68,.45);border-radius:8px;
      padding:8px 16px;font-size:12px;font-weight:700;cursor:pointer;touch-action:manipulation;
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
    if(STATE.active){ console.warn('[VTour S1c] deja activ'); return; }
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
    PAL = null; // reset palette

    STATE.active = true;
    STATE.floorOffsets = [];
    STATE.explodeAmount = 0;
    STATE.targetExplode = 1;

    const canvasCtn = _createOverlay();
    if(!canvasCtn){ STATE.active = false; return; }

    STATE.scene = new THREE.Scene();
    STATE.scene.fog = new THREE.Fog(0xc5dff0, 80, 300);

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
    STATE.renderer.toneMappingExposure = 1.1;

    const aspect = w / h;
    STATE.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    const anchor = _computeAnchor();
    const aedisFloors = _readAedisFloors();
    const buildingH = aedisFloors ? aedisFloors.totalHeight : 12;
    // Distanță mai mică (1.5x în loc de 2.2x) ca să vezi de aproape de la început
    const dist = Math.max(anchor.bW, anchor.bD) * 1.5;
    STATE.camera.position.set(
      anchor.cx + dist*0.85,
      anchor.baseY + buildingH * 1.4,  // sus, vezi de sus interiorul
      anchor.cz + dist*0.85
    );

    const targetY = anchor.baseY + buildingH/2;
    if(THREE.OrbitControls){
      STATE.controls = new THREE.OrbitControls(STATE.camera, STATE.canvas);
      STATE.controls.target.set(anchor.cx, targetY, anchor.cz);
      STATE.controls.enableDamping = true;
      STATE.controls.dampingFactor = 0.08;
      STATE.controls.minDistance = 2;
      STATE.controls.maxDistance = 250;
      STATE.controls.maxPolarAngle = Math.PI * 0.49;
      console.log('[VTour S1c] ✅ OrbitControls activ');
    } else {
      console.warn('[VTour S1c] OrbitControls lipsește — fallback inline');
      STATE.controls = _createInlineOrbit(STATE.camera, STATE.canvas, {
        target: { x: anchor.cx, y: targetY, z: anchor.cz },
        minDistance: 2,
        maxDistance: 250,
      });
    }

    _setupSceneAtmosphere();
    _buildDollhouse();

    // ── 007: pipeline post-procesare (finisaj fotorealist) ──
    // Captează render-ul pristin ÎNAINTE ca 46-postprocessing să-l monkeypatcheze
    // (+1.8s). Loop-ul îl repune în fiecare cadru → fără recursie cu vechiul patch.
    STATE._origRender = STATE.renderer.render.bind(STATE.renderer);
    STATE._composer = _setupComposer(w, h);

    STATE._resize = () => {
      if(!STATE.renderer || !canvasCtn) return;
      const w = canvasCtn.clientWidth;
      const h = canvasCtn.clientHeight;
      STATE.renderer.setSize(w, h);
      STATE.camera.aspect = w / h;
      STATE.camera.updateProjectionMatrix();
      if(STATE._composer){ try {
        STATE._composer.setSize(w, h);
        if(STATE._ssao){ STATE._ssao.setSize(w, h); }
      } catch(e){} }
    };
    window.addEventListener('resize', STATE._resize);

    let errCount = 0;
    const loop = () => {
      if(!STATE.active) return;
      try {
        _updateExplode();
        if(STATE.controls) STATE.controls.update();
        if(STATE._composer){
          // repune render-ul pristin (neutralizează patch-ul 46 → evită recursia
          // RenderPass → renderer.render → composer.render → …)
          STATE.renderer.render = STATE._origRender;
          STATE._composer.render();
        } else {
          STATE.renderer.render(STATE.scene, STATE.camera);
        }
        STATE.raf = requestAnimationFrame(loop);
      } catch(err){
        errCount++;
        if(errCount <= 3) console.error('[VTour S1c] eroare loop:', err);
        if(errCount > 5){ console.error('[VTour S1c] prea multe erori — opresc'); stop(); }
        else STATE.raf = requestAnimationFrame(loop);
      }
    };
    STATE.raf = requestAnimationFrame(loop);
    console.log('[VTour S1c] ✅ Dollhouse start complet');
  }

  // ── 007: construiește EffectComposer rezilient (adaugă DOAR pass-urile ce se
  // construiesc fără eroare; SSAO depinde de SimplexNoise — poate lipsi). ──
  function _setupComposer(w, h){
    try {
      if(!THREE.EffectComposer || !THREE.RenderPass){ console.warn('[VTour PP] EffectComposer indisponibil — fallback render direct'); return null; }
      var pr = Math.min(window.devicePixelRatio, 2);
      var composer = new THREE.EffectComposer(STATE.renderer);
      composer.setPixelRatio(pr);
      composer.setSize(w, h);
      composer.addPass(new THREE.RenderPass(STATE.scene, STATE.camera));
      var added = ['render'];
      // SSAO — ocluziune ambientală în colțuri/contacte (realismul „contact")
      try {
        if(THREE.SSAOPass && THREE.SimplexNoise){
          var ssao = new THREE.SSAOPass(STATE.scene, STATE.camera, w, h);
          ssao.kernelRadius = 8; ssao.minDistance = 0.002; ssao.maxDistance = 0.1;
          composer.addPass(ssao); STATE._ssao = ssao; added.push('ssao');
        }
      } catch(e){ console.warn('[VTour PP] SSAO skip:', e.message); }
      // Bloom — strălucire pe ferestre/corpuri de iluminat (finisaj cinematic)
      try {
        if(THREE.UnrealBloomPass && THREE.LuminosityHighPassShader){
          var bloom = new THREE.UnrealBloomPass(new THREE.Vector2(w, h), 0.45, 0.6, 0.85);
          composer.addPass(bloom); STATE._bloom = bloom; added.push('bloom');
        }
      } catch(e){ console.warn('[VTour PP] Bloom skip:', e.message); }
      // ultimul pass face renderToScreen (EffectComposer setează automat pe ultimul)
      STATE.renderer.toneMappingExposure = 1.25;
      console.log('[VTour PP] ✅ composer activ:', added.join(' + '));
      STATE._ppPasses = added;
      // dacă DOAR RenderPass (niciun efect real), nu merită overhead-ul → fallback
      if(added.length === 1){ try { composer.dispose && composer.dispose(); } catch(e){} return null; }
      return composer;
    } catch(e){ console.warn('[VTour PP] setup eșuat — fallback:', e.message); return null; }
  }

  function stop(){
    STATE.active = false;
    if(STATE.raf){ cancelAnimationFrame(STATE.raf); STATE.raf = null; }
    if(STATE._composer){ try { STATE._composer.dispose && STATE._composer.dispose(); } catch(e){} STATE._composer = null; STATE._ssao = null; STATE._bloom = null; }
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
    if(STATE.controls && STATE.controls.dispose){ STATE.controls.dispose(); }
    STATE.controls = null;
    if(STATE.renderer){ try{STATE.renderer.forceContextLoss&&STATE.renderer.forceContextLoss();}catch(e){} STATE.renderer.dispose(); STATE.renderer = null; }
    if(STATE.overlay){ STATE.overlay.remove(); STATE.overlay = null; }
    STATE.canvas = null;
    STATE.dollhouseGroup = null;
    STATE.floorOffsets = [];
    PAL = null;
    console.log('[VTour S1c] stop complet');
  }

  window.VTour = { start, stop, _state: STATE };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', _injectButtons);
  } else {
    _injectButtons();
  }
})();

/* ═══════════════════════════════════════════════════════════════════════════
   UrbanX · Tur Virtual 3D · Sesiunea Curată S2b
   ──────────────────────────────────────────────────────────────────────────
   3D FLOOR PLAN — match cu imaginea referință (RoomSketcher style)
   • Podea cu textură procedurală de scânduri lemn
   • Pereți negri subțiri (#1f2937) doar perimetrul + separatoare
   • Mobilier cu siluetă recognoscibilă (pat cu pătură verde, sofa în L galben)
   • ZERO etichete text — geometria vorbește
   • Fără acoperiș — vezi direct interior la nivelul ales
   • Panouri verticale lemn slats pe perete dormitor
   • Decupaj per nivel — fiecare nivel se vede izolat
   ═══════════════════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  const VERSION = '20260604-S2b-FLOORPLAN';
  console.log('[VTour S2b] versiune', VERSION);

  const STATE = {
    active: false, overlay: null, canvas: null,
    renderer: null, scene: null, camera: null, controls: null,
    floorGroups: [], currentFloor: 0,
    raf: null, _anchor: null, _aedisFloors: null,
    _woodTex: null, _marbleTex: null, _carpetTex: null,
  };

  // ═════════════════════════════════════════════════════════════════════════
  // TEXTURI PROCEDURALE (Canvas2D → CanvasTexture)
  // ═════════════════════════════════════════════════════════════════════════
  function _makeWoodTexture(){
    const THREE = window.THREE;
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    // Fundal lemn natural cald
    ctx.fillStyle = '#c89968';
    ctx.fillRect(0,0,1024,1024);
    // Scânduri verticale (linii orizontale între scânduri)
    const plankH = 110;
    for(let y = 0; y < 1024; y += plankH){
      // Variație culoare per scândură
      const variation = Math.floor(Math.random() * 35 - 17);
      const r = Math.max(100, Math.min(230, 200 + variation));
      const g = Math.max(80, Math.min(180, 153 + variation - 5));
      const b = Math.max(60, Math.min(140, 104 + variation - 8));
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, y, 1024, plankH);
      // Linia despărțitoare scânduri (umbră închisă)
      ctx.fillStyle = 'rgba(40,25,15,0.6)';
      ctx.fillRect(0, y + plankH - 3, 1024, 3);
    }
    // Noduri lemn ovale
    for(let i = 0; i < 50; i++){
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const r = 6 + Math.random() * 12;
      ctx.fillStyle = `rgba(60,30,10,${0.15 + Math.random() * 0.15})`;
      ctx.beginPath();
      ctx.ellipse(x, y, r, r*0.6, 0, 0, Math.PI*2);
      ctx.fill();
    }
    // Liniuțe granulare lungimea scândurilor
    ctx.strokeStyle = 'rgba(40,20,10,0.12)';
    ctx.lineWidth = 0.6;
    for(let i = 0; i < 400; i++){
      const y = Math.random() * 1024;
      const x1 = Math.random() * 1024;
      const x2 = x1 + 40 + Math.random() * 200;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  function _makeMarbleTexture(){
    const THREE = window.THREE;
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    // Fundal marmură deschisă
    ctx.fillStyle = '#f0eee8';
    ctx.fillRect(0,0,512,512);
    // Vinete marmură (linii subțiri vinerice)
    ctx.strokeStyle = 'rgba(100,90,80,0.25)';
    ctx.lineWidth = 1.2;
    for(let i = 0; i < 25; i++){
      ctx.beginPath();
      const x1 = Math.random() * 512;
      const y1 = Math.random() * 512;
      ctx.moveTo(x1, y1);
      // Curbe random
      for(let j = 0; j < 5; j++){
        const cx = Math.random() * 512;
        const cy = Math.random() * 512;
        const ex = Math.random() * 512;
        const ey = Math.random() * 512;
        ctx.quadraticCurveTo(cx, cy, ex, ey);
      }
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  function _makeCarpetTexture(color){
    const THREE = window.THREE;
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color || '#d4d0c4';
    ctx.fillRect(0,0,256,256);
    // Pattern textil — puncte mici
    for(let i = 0; i < 2000; i++){
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      ctx.fillStyle = `rgba(0,0,0,${0.04 + Math.random() * 0.06})`;
      ctx.fillRect(x, y, 1, 1);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INJECT BUTON
  // ═════════════════════════════════════════════════════════════════════════
  function _injectButton(){
    const tryInject = () => {
      if(document.getElementById('vtour-fp-btn')) return true;
      const topbar = document.getElementById('v3d-topbar');
      if(!topbar) return false;
      const rows = topbar.querySelectorAll(':scope > div');
      const targetRow = rows[1] || topbar;
      const btn = document.createElement('button');
      btn.id = 'vtour-fp-btn';
      btn.title = '3D Floor Plan — stil RoomSketcher';
      btn.innerHTML = '📐 3D Plan';
      btn.style.cssText = `
        background:linear-gradient(90deg,rgba(59,130,246,.18),rgba(167,139,250,.15));
        color:#93c5fd;border:1px solid rgba(59,130,246,.5);border-radius:8px;
        padding:5px 13px;font-size:11px;font-weight:700;cursor:pointer;
        flex-shrink:0;min-height:36px;letter-spacing:.3px;white-space:nowrap;
      `;
      btn.addEventListener('click', () => startFP());
      targetRow.appendChild(btn);
      console.log('[VTour S2b] Buton 3D Plan injectat');
      return true;
    };
    if(tryInject()) return;
    const observer = new MutationObserver(() => { tryInject(); });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CITIRE AEDIS
  // ═════════════════════════════════════════════════════════════════════════
  function _readAedis(){
    const A = window.AEDIS;
    if(!A) return null;
    const fnMap = (window.AEDIS_FN || {});
    const corp = (Array.isArray(A.corpuri) && A.corpuri[0]) ? A.corpuri[0] : {};
    const niv = parseInt(corp.niv) || parseInt(A.niv) || 1;
    const hNiv = parseFloat(corp.hNiv) || 3.0;
    const fnNormal = A.fn || 'rezidential_colectiv';
    const fnDataNormal = fnMap[fnNormal] || {};
    let hParter = hNiv;
    if(A.parterDiferit){
      const fnParter = A.fnParter || fnNormal;
      const fnDataParter = fnMap[fnParter] || {};
      hParter = parseFloat(fnDataParter.hParter) || 4.5;
    } else if(fnDataNormal.hParter){
      hParter = parseFloat(fnDataNormal.hParter);
    }
    const floors = [];
    let cumY = 0;
    for(let i = 0; i < niv; i++){
      const h = (i === 0) ? hParter : hNiv;
      floors.push({ idx: i, baseY: cumY, height: h });
      cumY += h;
    }
    console.log(`[VTour S2b] AEDIS: niv=${niv}, parter=${hParter}m, etaj=${hNiv}m`);
    return { floors, totalHeight: cumY, niv };
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
      return { cx:0, cz:0, baseY:0, bW:18, bD:14 };
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
    return { cx: center.x, cz: center.z, baseY: bbox.min.y, bW, bD };
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MOBILIER DETALIAT — siluete recognoscibile (referință RoomSketcher)
  // ═════════════════════════════════════════════════════════════════════════
  function _addFurniture(group, r, ox, oz){
    const THREE = window.THREE;
    const cx = ox + r.x + r.w/2;
    const cz = oz + r.y + r.h/2;
    if(r.w < 1.2 || r.h < 1.2) return;

    const box = (x,y,z,w,h,d,color,opts) => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.7, metalness: 0, ...(opts || {})
      });
      const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), mat);
      m.position.set(x,y,z);
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
      return m;
    };
    const cyl = (x,y,z,radius,h,color,segs) => {
      const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.6 });
      const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, h, segs||16), mat);
      m.position.set(x,y,z);
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
      return m;
    };

    if(r.t === 'living'){
      // SOFA în L galben deschis (3 module aliniate pe latura lungă)
      const sofaColor = '#e8d8a8'; // galben crem ca în referință
      const sofaCushColor = '#d4c190';
      // Orientare: pe latura cea mai lungă
      const longSide = (r.w >= r.h) ? 'x' : 'z';
      if(longSide === 'x'){
        const sw = Math.min(r.w * 0.6, 2.5);
        const sd = 0.9;
        // 3 module bază
        const modW = sw / 3;
        for(let i = 0; i < 3; i++){
          const mx = cx - sw/2 + modW*(i + 0.5);
          box(mx, 0.25, cz - r.h/2 + sd/2 + 0.3, modW * 0.95, 0.4, sd, sofaColor);
          // Pernă deasupra (puțin mai mică, maro)
          box(mx, 0.5, cz - r.h/2 + sd/2 + 0.3, modW * 0.85, 0.15, sd * 0.85, '#a08060');
        }
        // Spătar continuu
        box(cx, 0.6, cz - r.h/2 + 0.15, sw, 0.5, 0.2, sofaColor);
        // 2 perne portocaliu deasupra spătar
        box(cx - sw*0.25, 0.7, cz - r.h/2 + 0.35, 0.35, 0.3, 0.3, '#c47850');
        box(cx + sw*0.25, 0.7, cz - r.h/2 + 0.35, 0.35, 0.3, 0.3, '#c47850');
      } else {
        const sd = Math.min(r.h * 0.6, 2.5);
        const sw = 0.9;
        const modD = sd / 3;
        for(let i = 0; i < 3; i++){
          const mz = cz - sd/2 + modD*(i + 0.5);
          box(cx - r.w/2 + sw/2 + 0.3, 0.25, mz, sw, 0.4, modD * 0.95, sofaColor);
          box(cx - r.w/2 + sw/2 + 0.3, 0.5, mz, sw * 0.85, 0.15, modD * 0.85, '#a08060');
        }
        box(cx - r.w/2 + 0.15, 0.6, cz, 0.2, 0.5, sd, sofaColor);
      }

      // Masă cafea alungită lemn maro închis
      box(cx, 0.21, cz, 1.2, 0.4, 0.55, '#5d3920');
      // Vază sau cărți deasupra masă (cilindru mic)
      cyl(cx - 0.3, 0.5, cz, 0.08, 0.18, '#2d2017');
      // Carte mică pe masă
      box(cx + 0.25, 0.43, cz - 0.1, 0.25, 0.04, 0.18, '#f5e9d3');

      // Covor sub măsuță (textil colorat)
      const carpet = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.012, 1.8),
        new THREE.MeshStandardMaterial({
          map: _makeCarpetTexture('#d4d0c4'),
          roughness: 0.95
        })
      );
      carpet.position.set(cx, 0.025, cz);
      carpet.receiveShadow = true;
      group.add(carpet);

      // 3 tablouri pe perete (sus, opus sofei)
      const wallZ = cz + r.h/2 - 0.04;
      box(cx - 0.7, 1.5, wallZ, 0.5, 0.6, 0.03, '#4a7c4a'); // verde palmier
      box(cx, 1.5, wallZ, 0.4, 0.6, 0.03, '#f0eee0');     // alb cu text
      box(cx + 0.6, 1.5, wallZ, 0.45, 0.6, 0.03, '#c4b896'); // bej deschis

      // Plantă mică în ghiveci
      if(r.w > 3){
        cyl(cx + r.w/2 - 0.4, 0.2, cz - r.h/2 + 0.4, 0.15, 0.35, '#5d3920');
        cyl(cx + r.w/2 - 0.4, 0.55, cz - r.h/2 + 0.4, 0.22, 0.4, '#4a7c4a', 8);
      }
    }
    else if(r.t === 'bedroom'){
      // PAT KING — saltea + pătură verde-petrol + perne portocaliu
      const longSide = (r.w >= r.h) ? 'x' : 'z';
      let bw, bd, bedCx, bedCz, headSide;
      if(longSide === 'x'){
        bw = Math.min(r.w * 0.6, 2.0);
        bd = Math.min(r.h * 0.65, 1.95);
        bedCx = cx; bedCz = cz + 0.1;
        headSide = 'z-';
      } else {
        bw = Math.min(r.h * 0.6, 2.0);
        bd = Math.min(r.w * 0.65, 1.95);
        bedCx = cx; bedCz = cz + 0.1;
        headSide = 'z-';
      }
      // Ramă pat lemn maro închis
      box(bedCx, 0.18, bedCz, bw + 0.15, 0.35, bd + 0.15, '#3d2918');
      // Saltea albă crem
      box(bedCx, 0.4, bedCz, bw, 0.2, bd, '#faf6ed');
      // Pătură verde-petrol (vizibil mai mică decât salteaua — vezi salteaua pe lateral)
      box(bedCx, 0.51, bedCz + 0.15, bw - 0.1, 0.025, bd - 0.55, '#2d6b6e');
      // 2 perne portocaliu sus
      box(bedCx - bw*0.22, 0.52, bedCz - bd/2 + 0.25, bw*0.32, 0.12, 0.32, '#d99060');
      box(bedCx + bw*0.22, 0.52, bedCz - bd/2 + 0.25, bw*0.32, 0.12, 0.32, '#d99060');
      // Tăblie pat (panou înalt cu fâșii lemn)
      const headboardZ = bedCz - bd/2 - 0.06;
      box(bedCx, 0.85, headboardZ, bw + 0.25, 1.3, 0.1, '#3d2918');
      // 5 fâșii lemn deschis pe tăblie (slats decorative)
      for(let i = 0; i < 5; i++){
        const sx = bedCx - bw*0.4 + (bw*0.8) * (i / 4);
        box(sx, 0.85, headboardZ + 0.06, 0.08, 1.1, 0.04, '#a07850');
      }
      // 2 noptiere — cuburi simple cu lampă
      if(bw + 0.7 < r.w - 0.4 || longSide === 'z'){
        box(bedCx - bw/2 - 0.25, 0.3, bedCz - bd/2 + 0.2, 0.4, 0.55, 0.4, '#3d2918');
        cyl(bedCx - bw/2 - 0.25, 0.7, bedCz - bd/2 + 0.2, 0.12, 0.18, '#f5e9d3');
        box(bedCx + bw/2 + 0.25, 0.3, bedCz - bd/2 + 0.2, 0.4, 0.55, 0.4, '#3d2918');
        cyl(bedCx + bw/2 + 0.25, 0.7, bedCz - bd/2 + 0.2, 0.12, 0.18, '#f5e9d3');
      }
      // Covor sub pat (puțin mai mare decât patul)
      const carpet = new THREE.Mesh(
        new THREE.BoxGeometry(bw + 0.6, 0.01, bd + 0.6),
        new THREE.MeshStandardMaterial({
          map: _makeCarpetTexture('#bcb3a3'),
          roughness: 0.95
        })
      );
      carpet.position.set(bedCx, 0.025, bedCz);
      carpet.receiveShadow = true;
      group.add(carpet);

      // PANOURI VERTICALE LEMN (slats) pe peretele de la cap pat (semn marcant referință)
      const wallZ = bedCz - bd/2 - 0.15;
      const slatCount = 7;
      for(let i = 0; i < slatCount; i++){
        const sx = bedCx - (bw + 0.6)/2 + ((bw + 0.6) / (slatCount - 1)) * i;
        box(sx, 1.5, wallZ + 0.04, 0.08, 1.6, 0.04, '#a07850');
      }
      // Cadru tablou mic deasupra patului (peretele dintre slats)
      box(bedCx, 1.7, wallZ + 0.06, 0.55, 0.4, 0.03, '#f5e9d3');

      // Dulap pe peretele opus (dacă încape)
      if(r.h > 3.5){
        box(cx, 0.95, cz + r.h/2 - 0.35, Math.min(r.w * 0.55, 2.0), 1.85, 0.55, '#a07850');
      }
    }
    else if(r.t === 'kitchen'){
      // Blat L-shape lemn deschis
      const kw = Math.min(r.w * 0.85, 3.0);
      box(cx, 0.42, cz - r.h/2 + 0.32, kw, 0.05, 0.6, '#e8e0d2');
      box(cx, 0.21, cz - r.h/2 + 0.32, kw, 0.4, 0.6, '#a07850');
      // Chiuvetă (cerc gri)
      cyl(cx - kw*0.25, 0.46, cz - r.h/2 + 0.35, 0.2, 0.04, '#8a8a8a');
      // Aragaz negru cu 4 cercuri
      box(cx + kw*0.05, 0.46, cz - r.h/2 + 0.35, 0.55, 0.04, 0.55, '#1a1a1a');
      cyl(cx + kw*0.05 - 0.12, 0.49, cz - r.h/2 + 0.22, 0.06, 0.01, '#4a4a4a', 12);
      cyl(cx + kw*0.05 + 0.12, 0.49, cz - r.h/2 + 0.22, 0.06, 0.01, '#4a4a4a', 12);
      cyl(cx + kw*0.05 - 0.12, 0.49, cz - r.h/2 + 0.48, 0.06, 0.01, '#4a4a4a', 12);
      cyl(cx + kw*0.05 + 0.12, 0.49, cz - r.h/2 + 0.48, 0.06, 0.01, '#4a4a4a', 12);
      // Frigider inox cu mâner
      const fX = cx + r.w/2 - 0.4;
      box(fX, 0.85, cz - r.h/2 + 0.38, 0.65, 1.7, 0.6, '#e0e0e0');
      box(fX + 0.32, 0.85, cz - r.h/2 + 0.4, 0.04, 0.5, 0.04, '#707070');
      // Hotă
      box(cx + kw*0.05, 1.35, cz - r.h/2 + 0.3, 0.7, 0.3, 0.45, '#5a5a5a');
      // Masă dining (dacă încape) — marmură neagră + 4 scaune albe
      if(r.w > 2.5 && r.h > 3.5){
        const tableZ = cz + 0.3;
        // Blat masă marmură (textura procedurală)
        const tableMat = new THREE.MeshStandardMaterial({
          color: 0x2a2a2a, roughness: 0.3, metalness: 0.15,
          map: _makeMarbleTexture(),
        });
        tableMat.map.repeat.set(2, 1);
        const table = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.05, 0.85), tableMat);
        table.position.set(cx, 0.78, tableZ);
        table.castShadow = true; table.receiveShadow = true;
        group.add(table);
        // 4 picioare metalice
        for(let dx of [-0.65, 0.65]){
          for(let dz of [-0.35, 0.35]){
            box(cx + dx, 0.39, tableZ + dz, 0.04, 0.78, 0.04, '#4a4a4a');
          }
        }
        // 4 scaune albe (cuburi)
        for(let i = 0; i < 4; i++){
          const angles = [
            { dx: -0.7, dz: -0.55, side: 'left' },
            { dx: 0.7, dz: -0.55, side: 'right' },
            { dx: -0.7, dz: 0.55, side: 'left' },
            { dx: 0.7, dz: 0.55, side: 'right' },
          ];
          const a = angles[i];
          box(cx + a.dx, 0.25, tableZ + a.dz, 0.45, 0.5, 0.45, '#f0eee0');
          // Spătar mic
          const spZ = a.dz < 0 ? a.dz - 0.2 : a.dz + 0.2;
          box(cx + a.dx, 0.65, tableZ + spZ, 0.45, 0.5, 0.05, '#f0eee0');
        }
      }
    }
    else if(r.t === 'bath'){
      // Cadă albă alungită
      const bathDir = r.w >= r.h ? 'x' : 'z';
      if(bathDir === 'x' && r.w > 1.6){
        // Pe latura lungă X
        box(cx, 0.25, cz + r.h/2 - 0.4, Math.min(r.w * 0.8, 1.7), 0.5, 0.7, '#f8f8f8');
        // "Apă" în cadă (placă albastră deasupra)
        box(cx, 0.42, cz + r.h/2 - 0.4, Math.min(r.w * 0.75, 1.6), 0.04, 0.6, '#c8e0f0');
      } else if(r.h > 1.6){
        box(cx + r.w/2 - 0.4, 0.25, cz, 0.7, 0.5, Math.min(r.h * 0.8, 1.7), '#f8f8f8');
        box(cx + r.w/2 - 0.4, 0.42, cz, 0.6, 0.04, Math.min(r.h * 0.75, 1.6), '#c8e0f0');
      }
      // WC
      const wX = cx - r.w/2 + 0.3;
      box(wX, 0.2, cz - 0.2, 0.4, 0.4, 0.55, '#f8f8f8');
      box(wX, 0.55, cz - 0.4, 0.4, 0.4, 0.18, '#f8f8f8');
      // Chiuvetă cu mobilier
      const sX = cx + r.w/2 - 0.4;
      box(sX, 0.42, cz - r.h/2 + 0.3, 0.55, 0.04, 0.45, '#e8e0d2');
      box(sX, 0.22, cz - r.h/2 + 0.3, 0.55, 0.4, 0.45, '#a07850');
      cyl(sX, 0.46, cz - r.h/2 + 0.3, 0.14, 0.04, '#f8f8f8');
      // Oglindă pe perete
      box(sX, 1.1, cz - r.h/2 + 0.08, 0.55, 0.55, 0.03, '#c5d8e8');
    }
    else if(r.t === 'wc'){
      box(cx - 0.1, 0.2, cz, 0.4, 0.4, 0.55, '#f8f8f8');
      box(cx - 0.1, 0.55, cz - 0.18, 0.4, 0.4, 0.18, '#f8f8f8');
    }
    else if(r.t === 'office'){
      box(cx, 0.37, cz - r.h/2 + 0.4, 1.4, 0.05, 0.7, '#5d3920');
      box(cx, 0.25, cz - r.h/2 + 1.05, 0.55, 0.5, 0.5, '#3d2918');
      box(cx, 0.62, cz - r.h/2 + 1.3, 0.55, 0.5, 0.05, '#3d2918');
      box(cx, 0.6, cz - r.h/2 + 0.3, 0.55, 0.35, 0.04, '#1a1a1a');
    }
    else if(r.t === 'hall' || r.t === 'corridor'){
      // Cuier dulap dacă încape
      if(r.w > 2 && r.h > 1.5){
        box(cx, 0.9, cz + r.h/2 - 0.18, Math.min(r.w * 0.45, 1.2), 1.75, 0.35, '#a07850');
      }
      // Covor lung pe centru
      const carpet = new THREE.Mesh(
        new THREE.BoxGeometry(r.w * 0.55, 0.012, r.h * 0.78),
        new THREE.MeshStandardMaterial({
          map: _makeCarpetTexture('#c8b896'),
          roughness: 0.95
        })
      );
      carpet.position.set(cx, 0.025, cz);
      carpet.receiveShadow = true;
      group.add(carpet);
    }
    else if(r.t === 'storage'){
      box(cx, 0.9, cz, r.w * 0.6, 1.7, 0.4, '#a07850');
    }
    else if(r.t === 'core'){
      // Scări — Z pattern de trepte
      const steps = 10;
      const stepW = Math.min(r.w * 0.8, 1.4);
      for(let i = 0; i < steps; i++){
        box(cx - r.w*0.15, 0.05 + i*0.16, cz - r.h/2 + 0.3 + i*0.25, stepW, 0.16, 0.25, '#a0a0a0');
      }
      // Lift
      box(cx + r.w*0.2, 1.0, cz, 0.9, 2.0, 1.1, '#5a5a5a');
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CONSTRUIRE FLOOR PLAN per nivel
  // ═════════════════════════════════════════════════════════════════════════
  function _buildFloorPlan(){
    const THREE = window.THREE;
    const anchor = _computeAnchor();
    const aedisFloors = _readAedis();
    if(!aedisFloors){ console.warn('[VTour S2b] AEDIS lipsește'); return; }
    const RV = window._RV;

    STATE._anchor = anchor;
    STATE._aedisFloors = aedisFloors;
    const bW = anchor.bW, bD = anchor.bD;
    const ox = anchor.cx - bW / 2;
    const oz = anchor.cz - bD / 2;

    // Pre-cache texturi
    STATE._woodTex = _makeWoodTexture();

    aedisFloors.floors.forEach((floor, fIdx) => {
      const fg = new THREE.Group();
      fg.name = `FP_Floor_${fIdx}`;
      fg.userData.fIdx = fIdx;
      fg.position.y = anchor.baseY + floor.baseY;

      // ── PODEA cu textură de lemn procedurală ──
      const woodTex = STATE._woodTex.clone();
      woodTex.needsUpdate = true;
      woodTex.repeat.set(bW * 0.15, bD * 0.15);
      const floorMat = new THREE.MeshStandardMaterial({
        map: woodTex, roughness: 0.85, metalness: 0,
      });
      const floorMesh = new THREE.Mesh(
        new THREE.BoxGeometry(bW, 0.08, bD),
        floorMat
      );
      floorMesh.position.set(anchor.cx, -0.04, anchor.cz);
      floorMesh.receiveShadow = true;
      fg.add(floorMesh);

      // ── PEREȚI EXTERIORI negri subțiri ──
      const wallH = 1.8;
      const wallT = 0.08;
      const wallMat = new THREE.MeshStandardMaterial({
        color: 0x1f2937, roughness: 0.85,
      });
      // 4 pereți perimetrici
      const wS = new THREE.Mesh(new THREE.BoxGeometry(bW + wallT*2, wallH, wallT), wallMat);
      wS.position.set(anchor.cx, wallH/2, anchor.cz + bD/2 + wallT/2);
      wS.castShadow = true; wS.receiveShadow = true;
      fg.add(wS);
      const wN = wS.clone();
      wN.position.set(anchor.cx, wallH/2, anchor.cz - bD/2 - wallT/2);
      fg.add(wN);
      const wE = new THREE.Mesh(new THREE.BoxGeometry(wallT, wallH, bD), wallMat);
      wE.position.set(anchor.cx + bW/2 + wallT/2, wallH/2, anchor.cz);
      wE.castShadow = true; wE.receiveShadow = true;
      fg.add(wE);
      const wW = wE.clone();
      wW.position.set(anchor.cx - bW/2 - wallT/2, wallH/2, anchor.cz);
      fg.add(wW);

      // ── PEREȚII CAMERELOR INTERIOR + MOBILIER ──
      if(RV && Array.isArray(RV.floors) && RV.floors[fIdx]){
        const rvFloor = RV.floors[fIdx];
        if(Array.isArray(rvFloor.rects)){
          // Wall material interior - albe ca în referință
          const intWallMat = new THREE.MeshStandardMaterial({
            color: 0xfafaf8, roughness: 0.9, side: THREE.DoubleSide,
          });
          const intWallT = 0.06;
          const intWallH = 1.5; // puțin mai joși ca exteriorii

          rvFloor.rects.forEach(r => {
            if(!r || !isFinite(r.w) || !isFinite(r.h) || r.w <= 0.1 || r.h <= 0.1) return;

            if(r.bal){
              // Balcon — placă deschisă + balustradă
              const bal = new THREE.Mesh(
                new THREE.BoxGeometry(r.w, 0.05, r.h),
                new THREE.MeshStandardMaterial({ color: 0x6a5a4a, roughness: 0.9 })
              );
              bal.position.set(ox + r.x + r.w/2, 0.06, oz + r.y + r.h/2);
              bal.receiveShadow = true;
              fg.add(bal);
              // Balustradă metal subțire
              const rail = new THREE.Mesh(
                new THREE.BoxGeometry(r.w, 0.95, 0.04),
                new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.5, metalness: 0.7 })
              );
              rail.position.set(ox + r.x + r.w/2, 0.5, oz + r.y + r.h);
              fg.add(rail);
              return;
            }

            // Pereții camerei (4 muchii) — exclud părți care se suprapun cu perete exterior
            const rx1 = ox + r.x;
            const rx2 = ox + r.x + r.w;
            const rz1 = oz + r.y;
            const rz2 = oz + r.y + r.h;
            // Sud (z+) — doar dacă nu e pe marginea exterioară
            if(Math.abs(rz2 - (anchor.cz + bD/2)) > 0.05){
              const ws = new THREE.Mesh(new THREE.BoxGeometry(r.w, intWallH, intWallT), intWallMat);
              ws.position.set(ox + r.x + r.w/2, intWallH/2, rz2);
              ws.castShadow = true; ws.receiveShadow = true;
              fg.add(ws);
            }
            // Nord (z-)
            if(Math.abs(rz1 - (anchor.cz - bD/2)) > 0.05){
              const wn = new THREE.Mesh(new THREE.BoxGeometry(r.w, intWallH, intWallT), intWallMat);
              wn.position.set(ox + r.x + r.w/2, intWallH/2, rz1);
              wn.castShadow = true; wn.receiveShadow = true;
              fg.add(wn);
            }
            // Est (x+)
            if(Math.abs(rx2 - (anchor.cx + bW/2)) > 0.05){
              const we = new THREE.Mesh(new THREE.BoxGeometry(intWallT, intWallH, r.h), intWallMat);
              we.position.set(rx2, intWallH/2, oz + r.y + r.h/2);
              we.castShadow = true; we.receiveShadow = true;
              fg.add(we);
            }
            // Vest (x-)
            if(Math.abs(rx1 - (anchor.cx - bW/2)) > 0.05){
              const ww = new THREE.Mesh(new THREE.BoxGeometry(intWallT, intWallH, r.h), intWallMat);
              ww.position.set(rx1, intWallH/2, oz + r.y + r.h/2);
              ww.castShadow = true; ww.receiveShadow = true;
              fg.add(ww);
            }

            // Mobilier specific
            _addFurniture(fg, r, ox, oz);
          });
        }
      }

      STATE.scene.add(fg);
      STATE.floorGroups.push(fg);
    });

    _showFloor(0);
    console.log(`[VTour S2b] FloorPlan: ${aedisFloors.floors.length} etaje construite`);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // SHOW FLOOR — afișează DOAR nivelul ales (ca în referință)
  // ═════════════════════════════════════════════════════════════════════════
  function _showFloor(idx){
    STATE.currentFloor = idx;
    STATE.floorGroups.forEach((g, i) => {
      g.visible = (i === idx);
    });
    document.querySelectorAll('[data-fp-floor]').forEach(b => {
      const isActive = parseInt(b.dataset.fpFloor) === idx;
      b.style.background = isActive ? 'rgba(59,130,246,.5)' : 'rgba(15,23,42,.5)';
      b.style.color = isActive ? '#fff' : '#94a3b8';
      b.style.borderColor = isActive ? '#3b82f6' : 'rgba(148,163,184,.3)';
    });
    console.log(`[VTour S2b] Vizualizez doar nivelul ${idx}`);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // LIGHTING
  // ═════════════════════════════════════════════════════════════════════════
  function _setupLighting(){
    const THREE = window.THREE;
    const scene = STATE.scene;
    const anchor = _computeAnchor();
    const sun = new THREE.DirectionalLight(0xfff4e0, 2.0);
    sun.position.set(anchor.cx + 30, anchor.baseY + 60, anchor.cz + 20);
    sun.target.position.set(anchor.cx, anchor.baseY, anchor.cz);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 200;
    const ex = Math.max(anchor.bW, anchor.bD) * 1.5;
    sun.shadow.camera.left = -ex;
    sun.shadow.camera.right = ex;
    sun.shadow.camera.top = ex;
    sun.shadow.camera.bottom = -ex;
    sun.shadow.bias = -0.0005;
    sun.shadow.radius = 4;
    scene.add(sun);
    scene.add(sun.target);
    const hemi = new THREE.HemisphereLight(0xfff0d8, 0xa8a090, 0.6);
    scene.add(hemi);
    const fill = new THREE.DirectionalLight(0xe8d8c0, 0.35);
    fill.position.set(anchor.cx - 25, anchor.baseY + 35, anchor.cz - 15);
    scene.add(fill);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INLINE ORBIT CONTROLS — fallback robust
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
    const offset = new THREE.Vector3();
    offset.copy(camera.position).sub(target);
    let radius = offset.length();
    let theta = Math.atan2(offset.x, offset.z);
    let phi = Math.acos(Math.max(-1, Math.min(1, offset.y / radius)));
    let targetTheta = theta, targetPhi = phi, targetRadius = radius;
    let dragging = false, lastX = 0, lastY = 0;
    let activeTouches = [];
    const onDown = (x,y) => { dragging = true; lastX = x; lastY = y; };
    const onMove = (x,y) => {
      if(!dragging) return;
      const dx = x - lastX, dy = y - lastY;
      lastX = x; lastY = y;
      targetTheta -= dx * 0.005;
      targetPhi = Math.max(0.15, Math.min(Math.PI * 0.48, targetPhi - dy * 0.005));
    };
    const onUp = () => { dragging = false; };
    const onWheel = (deltaY) => {
      const factor = Math.exp(deltaY * 0.001);
      targetRadius = Math.max(minDist, Math.min(maxDist, targetRadius * factor));
    };
    const mouseMoveHandler = (e) => onMove(e.clientX, e.clientY);
    const mouseUpHandler = () => onUp();
    dom.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
    dom.addEventListener('wheel', (e) => { e.preventDefault(); onWheel(e.deltaY); }, { passive: false });
    dom.addEventListener('touchstart', (e) => {
      e.preventDefault();
      activeTouches = Array.from(e.touches);
      if(e.touches.length === 1) onDown(e.touches[0].clientX, e.touches[0].clientY);
      else if(e.touches.length === 2) dragging = false;
    }, { passive: false });
    dom.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if(e.touches.length === 1 && dragging){
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if(e.touches.length === 2 && activeTouches.length === 2){
        const d1 = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        const d0 = Math.hypot(activeTouches[0].clientX - activeTouches[1].clientX, activeTouches[0].clientY - activeTouches[1].clientY);
        if(d0 > 0){
          targetRadius = Math.max(minDist, Math.min(maxDist, targetRadius * (d0/d1)));
        }
        activeTouches = Array.from(e.touches);
      }
    }, { passive: false });
    dom.addEventListener('touchend', (e) => {
      activeTouches = Array.from(e.touches);
      if(e.touches.length === 0) onUp();
    });
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
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    }
    return { update, dispose, target };
  }

  // ═════════════════════════════════════════════════════════════════════════
  // OVERLAY
  // ═════════════════════════════════════════════════════════════════════════
  function _createOverlay(){
    if(STATE.overlay) return null;
    const overlay = document.createElement('div');
    overlay.id = 'vtour-fp-overlay';
    overlay.style.cssText = `
      position:fixed;inset:0;background:#fafaf6;z-index:99998;
      display:flex;flex-direction:column;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    `;
    const top = document.createElement('div');
    top.style.cssText = `
      display:flex;align-items:center;justify-content:space-between;
      padding:14px 20px;background:rgba(30,41,59,.95);
      border-bottom:1px solid rgba(59,130,246,.3);
    `;
    top.innerHTML = `
      <div style="color:#fff;font-size:14px;font-weight:700">
        📐 3D Floor Plan · <span style="color:#93c5fd;font-size:11px;font-weight:500">drag = rotire · scroll = zoom · pinch = mobile</span>
      </div>
    `;
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕ Închide';
    closeBtn.style.cssText = `
      background:rgba(239,68,68,.18);color:#fca5a5;
      border:1px solid rgba(239,68,68,.45);border-radius:8px;
      padding:8px 16px;font-size:12px;font-weight:700;cursor:pointer;touch-action:manipulation;
    `;
    closeBtn.onclick = () => stopFP();
    top.appendChild(closeBtn);
    overlay.appendChild(top);

    const floorBar = document.createElement('div');
    floorBar.id = 'vtour-fp-floorbar';
    floorBar.style.cssText = `
      display:flex;align-items:center;gap:8px;
      padding:10px 20px;background:rgba(30,41,59,.85);
      border-bottom:1px solid rgba(255,255,255,.05);
    `;
    floorBar.innerHTML = `<div style="color:#94a3b8;font-size:10px;font-weight:700;letter-spacing:.3px;margin-right:4px">NIVEL:</div>`;
    overlay.appendChild(floorBar);

    const canvasCtn = document.createElement('div');
    canvasCtn.id = 'vtour-fp-canvas-ctn';
    canvasCtn.style.cssText = 'flex:1;position:relative;overflow:hidden;';
    overlay.appendChild(canvasCtn);

    document.body.appendChild(overlay);
    STATE.overlay = overlay;
    return { canvasCtn, floorBar };
  }

  function _populateFloorButtons(floorBar, aedisFloors){
    aedisFloors.floors.forEach((fl, idx) => {
      const lbl = (idx === 0) ? 'P' : `E${idx}`;
      const b = document.createElement('button');
      b.innerHTML = lbl;
      b.dataset.fpFloor = String(idx);
      b.style.cssText = `
        background:rgba(15,23,42,.5);color:#94a3b8;
        border:1px solid rgba(148,163,184,.3);border-radius:6px;
        padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;
        min-width:42px;letter-spacing:.5px;touch-action:manipulation;transition:all .15s;
      `;
      b.addEventListener('click', () => _showFloor(idx));
      floorBar.appendChild(b);
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // START / STOP
  // ═════════════════════════════════════════════════════════════════════════
  function startFP(){
    if(STATE.active){ console.warn('[VTour S2b] deja activ'); return; }
    const V3D = window.V3D;
    if(!V3D || !V3D.scene){
      alert('Deschide întâi viewer-ul 3D și apasă "Generează AEDIS".');
      return;
    }
    if(!Array.isArray(V3D.aedis) || V3D.aedis.length === 0){
      alert('Generează întâi volumul AEDIS din panoul stânga.');
      return;
    }
    const THREE = window.THREE;
    STATE.active = true;
    STATE.floorGroups = [];

    const ov = _createOverlay();
    if(!ov){ STATE.active = false; return; }
    const canvasCtn = ov.canvasCtn;

    STATE.scene = new THREE.Scene();
    STATE.scene.background = new THREE.Color(0xfafaf6); // alb-crem ca în referință

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
    STATE.renderer.toneMappingExposure = 1.0;

    const aspect = w / h;
    STATE.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    const anchor = _computeAnchor();
    // Distanță și unghi pentru a vedea tot etajul ca în referință (~50° de la zenith)
    const dist = Math.max(anchor.bW, anchor.bD) * 1.1;
    const angle = Math.PI * 0.38; // ~68° de la verticală = 22° de la zenith ridicat
    STATE.camera.position.set(
      anchor.cx + dist * Math.sin(angle) * 0.3,
      anchor.baseY + dist * Math.cos(angle * 0.7),
      anchor.cz + dist * Math.sin(angle) * 0.9
    );

    if(THREE.OrbitControls){
      STATE.controls = new THREE.OrbitControls(STATE.camera, STATE.canvas);
      STATE.controls.target.set(anchor.cx, anchor.baseY + 0.5, anchor.cz);
      STATE.controls.enableDamping = true;
      STATE.controls.dampingFactor = 0.08;
      STATE.controls.minDistance = 3;
      STATE.controls.maxDistance = 300;
      STATE.controls.maxPolarAngle = Math.PI * 0.48;
      STATE.controls.minPolarAngle = Math.PI * 0.08;
      console.log('[VTour S2b] ✅ OrbitControls activ');
    } else {
      console.warn('[VTour S2b] OrbitControls lipsește — fallback inline');
      STATE.controls = _createInlineOrbit(STATE.camera, STATE.canvas, {
        target: { x: anchor.cx, y: anchor.baseY + 0.5, z: anchor.cz },
        minDistance: 3, maxDistance: 300,
      });
    }

    _setupLighting();
    _buildFloorPlan();
    _populateFloorButtons(ov.floorBar, STATE._aedisFloors);
    _showFloor(0);

    STATE._resize = () => {
      if(!STATE.renderer || !canvasCtn) return;
      const w = canvasCtn.clientWidth, h = canvasCtn.clientHeight;
      STATE.renderer.setSize(w, h);
      STATE.camera.aspect = w / h;
      STATE.camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', STATE._resize);

    let errCount = 0;
    const loop = () => {
      if(!STATE.active) return;
      try {
        if(STATE.controls) STATE.controls.update();
        STATE.renderer.render(STATE.scene, STATE.camera);
        STATE.raf = requestAnimationFrame(loop);
      } catch(err){
        errCount++;
        if(errCount <= 3) console.error('[VTour S2b]:', err);
        if(errCount > 5){ stopFP(); }
        else STATE.raf = requestAnimationFrame(loop);
      }
    };
    STATE.raf = requestAnimationFrame(loop);
    console.log('[VTour S2b] ✅ FloorPlan start complet');
  }

  function stopFP(){
    STATE.active = false;
    if(STATE.raf){ cancelAnimationFrame(STATE.raf); STATE.raf = null; }
    if(STATE._resize){ window.removeEventListener('resize', STATE._resize); }
    if(STATE.scene){
      STATE.scene.traverse(o => {
        if(o.geometry) o.geometry.dispose();
        if(o.material){
          if(Array.isArray(o.material)) o.material.forEach(m => {
            if(m.map) m.map.dispose();
            m.dispose();
          });
          else {
            if(o.material.map) o.material.map.dispose();
            o.material.dispose();
          }
        }
      });
      STATE.scene = null;
    }
    if(STATE.controls && STATE.controls.dispose){ STATE.controls.dispose(); }
    STATE.controls = null;
    if(STATE.renderer){ try{STATE.renderer.forceContextLoss&&STATE.renderer.forceContextLoss();}catch(e){} STATE.renderer.dispose(); STATE.renderer = null; }
    if(STATE.overlay){ STATE.overlay.remove(); STATE.overlay = null; }
    STATE.canvas = null;
    STATE.floorGroups = [];
    if(STATE._woodTex){ STATE._woodTex.dispose(); STATE._woodTex = null; }
    console.log('[VTour S2b] stop complet');
  }

  window.VTourFP = { startFP, stopFP };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', _injectButton);
  } else {
    _injectButton();
  }
})();
