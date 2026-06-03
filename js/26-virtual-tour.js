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
        if(errCount <= 3) console.error('[VTour S1c] eroare loop:', err);
        if(errCount > 5){ console.error('[VTour S1c] prea multe erori — opresc'); stop(); }
        else STATE.raf = requestAnimationFrame(loop);
      }
    };
    STATE.raf = requestAnimationFrame(loop);
    console.log('[VTour S1c] ✅ Dollhouse start complet');
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
    if(STATE.controls && STATE.controls.dispose){ STATE.controls.dispose(); }
    STATE.controls = null;
    if(STATE.renderer){ STATE.renderer.dispose(); STATE.renderer = null; }
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
   UrbanX · Tur Virtual 3D · Sesiunea Curată S2
   ──────────────────────────────────────────────────────────────────────────
   3D FLOOR PLAN — vedere axonometric 45° per nivel, cu mobilier identificabil
   • Paletă oficială UrbanX (Living=albastru, Dormitor=verde, etc.)
   • Etichete text 3D plutind deasupra fiecărei camere
   • Buton P/E1/E2 pentru switch nivel
   • "Decupaj" — ascund etajele DEASUPRA nivelului selectat
   • Mobilier identificabil din top-down: paturi cu pătură, sofa în L, cadă cu margini
   ═══════════════════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  const VERSION = '20260604-S2-FLOORPLAN';
  console.log('[VTour S2] versiune', VERSION);

  const STATE = {
    active: false, overlay: null, canvas: null,
    renderer: null, scene: null, camera: null, controls: null,
    floorGroups: [],         // câte un group per etaj
    currentFloor: 0,         // nivelul afișat curent
    raf: null, _anchor: null, _aedisFloors: null,
    _labels: [],             // sprite-uri text pentru etichete
  };

  // ═════════════════════════════════════════════════════════════════════════
  // PALETĂ OFICIALĂ UrbanX (din 15-relevee.js linia 7952)
  // ═════════════════════════════════════════════════════════════════════════
  const PAL = {
    living:     '#3B82F6',  // albastru
    bedroom:    '#34D399',  // verde mentă
    kitchen:    '#F59E0B',  // galben/portocaliu
    bath:       '#A78BFA',  // mov
    wc:         '#A78BFA',  // mov
    hall:       '#94A3B8',  // gri deschis
    corridor:   '#94A3B8',
    storage:    '#6B7280',  // gri închis
    core:       '#2563EB',  // albastru închis (scări/lift)
    balcon:     '#D4AF37',  // auriu
    office:     '#0EA5E9',  // cyan
    commercial: '#F97316',  // portocaliu
    meeting:    '#EC4899',  // roz
    reception:  '#06B6D4',  // turcoaz
    default:    '#CBD5E1',  // gri foarte deschis
  };

  function _matFor(type, opts){
    const THREE = window.THREE;
    const hex = PAL[type] || PAL.default;
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(hex),
      roughness: 0.85,
      metalness: 0,
      ...(opts || {}),
    });
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
      btn.title = '3D Floor Plan — vedere axonometric per nivel cu mobilier';
      btn.innerHTML = '📐 3D Plan';
      btn.style.cssText = `
        background:linear-gradient(90deg,rgba(59,130,246,.18),rgba(167,139,250,.15));
        color:#93c5fd;border:1px solid rgba(59,130,246,.5);border-radius:8px;
        padding:5px 13px;font-size:11px;font-weight:700;cursor:pointer;
        flex-shrink:0;min-height:36px;letter-spacing:.3px;white-space:nowrap;
      `;
      btn.addEventListener('click', () => startFP());
      targetRow.appendChild(btn);
      console.log('[VTour S2] Buton 3D Plan injectat');
      return true;
    };
    if(tryInject()) return;
    const observer = new MutationObserver(() => { tryInject(); });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CITIRE AEDIS — corp + niv corect
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
    console.log(`[VTour S2] AEDIS: niv=${niv}, parter=${hParter}m, etaj=${hNiv}m`);
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
  // ETICHETĂ TEXT 3D — Canvas2D → CanvasTexture → Sprite (always face camera)
  // ═════════════════════════════════════════════════════════════════════════
  function _makeLabel(text, area){
    const THREE = window.THREE;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 96;
    const ctx = canvas.getContext('2d');
    // fundal alb cu border subțire
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.strokeStyle = 'rgba(15,23,42,0.4)';
    ctx.lineWidth = 2;
    const r = 12;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(2,2,252,92,r) : ctx.rect(2,2,252,92);
    ctx.fill(); ctx.stroke();
    // text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(text, 128, 38);
    if(area){
      ctx.font = '20px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText(area, 128, 68);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    const mat = new THREE.SpriteMaterial({ map: tex, depthTest: false, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(2.4, 0.9, 1);
    return sprite;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MOBILIER IDENTIFICABIL DIN TOP-DOWN (folosim convenții Imagine 3 referință)
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
    const cyl = (x,y,z,radius,h,color) => {
      const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.6 });
      const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, h, 16), mat);
      m.position.set(x,y,z);
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
      return m;
    };

    if(r.t === 'living'){
      // Sofa în L (3 segmente)
      const sw = Math.min(r.w * 0.5, 2.2), sd = 0.85;
      box(cx - sw*0.15, 0.25, cz - r.h/2 + sd/2 + 0.3, sw, 0.4, sd, '#374151'); // bază
      box(cx - sw*0.15, 0.6, cz - r.h/2 + 0.2, sw, 0.45, 0.18, '#374151');       // spătar
      // 2 perne portocaliu
      box(cx - sw*0.3, 0.5, cz - r.h/2 + 0.5, 0.35, 0.15, 0.3, '#FB923C');
      box(cx + sw*0.1, 0.5, cz - r.h/2 + 0.5, 0.35, 0.15, 0.3, '#FB923C');
      // Măsuță cafea rotundă (cilindru)
      cyl(cx, 0.22, cz + 0.1, 0.45, 0.4, '#78350F');
      // Covor pătrat sub măsuță
      box(cx, 0.04, cz + 0.1, sw * 0.85, 0.005, 1.3, '#FB923C');
      // TV plat pe perete opus (sus)
      box(cx, 1.0, cz + r.h/2 - 0.08, 1.5, 0.7, 0.05, '#1F2937');
    }
    else if(r.t === 'bedroom'){
      const bw = Math.min(r.w * 0.55, 1.7), bd = Math.min(r.h * 0.6, 1.95);
      const bedZ = cz + 0.1;
      // Pat — ramă închisă
      box(cx, 0.15, bedZ, bw + 0.12, 0.3, bd + 0.12, '#451A03');
      // Saltea
      box(cx, 0.34, bedZ, bw, 0.18, bd, '#FAFAF9');
      // Pătură verde-petrol distinctă
      box(cx, 0.44, bedZ + 0.15, bw - 0.05, 0.025, bd - 0.5, '#0F766E');
      // 2 perne portocaliu sus
      box(cx - bw*0.22, 0.46, bedZ - bd/2 + 0.22, bw*0.32, 0.1, 0.32, '#FB923C');
      box(cx + bw*0.22, 0.46, bedZ - bd/2 + 0.22, bw*0.32, 0.1, 0.32, '#FB923C');
      // Tăblie
      box(cx, 0.7, bedZ - bd/2 - 0.04, bw + 0.2, 1.0, 0.07, '#451A03');
      // 2 noptiere
      if(bw + 0.7 < r.w - 0.4){
        box(cx - bw/2 - 0.25, 0.3, bedZ - bd/2 + 0.2, 0.4, 0.55, 0.4, '#78350F');
        box(cx + bw/2 + 0.25, 0.3, bedZ - bd/2 + 0.2, 0.4, 0.55, 0.4, '#78350F');
      }
      // Dulap pe peretele opus (dacă încape)
      if(r.h > 3){
        box(cx, 0.95, cz + r.h/2 - 0.3, Math.min(r.w * 0.6, 1.8), 1.85, 0.5, '#D6BFA1');
      }
    }
    else if(r.t === 'kitchen'){
      // Blat L-shape (2 segmente)
      const kw = Math.min(r.w * 0.85, 3.0);
      box(cx, 0.43, cz - r.h/2 + 0.32, kw, 0.05, 0.6, '#E7E5E4'); // blat
      box(cx, 0.22, cz - r.h/2 + 0.32, kw, 0.4, 0.6, '#D6BFA1');  // dulapuri lemn deschis
      // Chiuvetă (cerc gri)
      cyl(cx - kw*0.25, 0.46, cz - r.h/2 + 0.35, 0.25, 0.04, '#9CA3AF');
      // Aragaz (placă neagră cu 4 cercuri)
      box(cx + kw*0.05, 0.46, cz - r.h/2 + 0.35, 0.55, 0.04, 0.55, '#1F2937');
      cyl(cx + kw*0.05 - 0.12, 0.49, cz - r.h/2 + 0.22, 0.06, 0.01, '#4B5563');
      cyl(cx + kw*0.05 + 0.12, 0.49, cz - r.h/2 + 0.22, 0.06, 0.01, '#4B5563');
      cyl(cx + kw*0.05 - 0.12, 0.49, cz - r.h/2 + 0.48, 0.06, 0.01, '#4B5563');
      cyl(cx + kw*0.05 + 0.12, 0.49, cz - r.h/2 + 0.48, 0.06, 0.01, '#4B5563');
      // Frigider inox cu mâner
      const fX = cx + r.w/2 - 0.4;
      box(fX, 0.85, cz - r.h/2 + 0.38, 0.65, 1.7, 0.6, '#E5E7EB');
      box(fX + 0.32, 0.85, cz - r.h/2 + 0.4, 0.04, 0.4, 0.04, '#9CA3AF'); // mâner
      // Hotă
      box(cx + kw*0.05, 1.35, cz - r.h/2 + 0.3, 0.7, 0.3, 0.45, '#6B7280');
    }
    else if(r.t === 'bath'){
      // Cadă albă alungită cu margini ridicate
      if(r.w > 1.6 || r.h > 1.6){
        const bathDir = r.w >= r.h ? 'x' : 'z';
        if(bathDir === 'x'){
          box(cx, 0.25, cz + r.h/2 - 0.4, 1.6, 0.5, 0.7, '#FAFAFA');     // corp
          box(cx, 0.42, cz + r.h/2 - 0.4, 1.5, 0.04, 0.6, '#DBEAFE');    // apă (placă albastră deasupra)
        } else {
          box(cx + r.w/2 - 0.4, 0.25, cz, 0.7, 0.5, 1.6, '#FAFAFA');
          box(cx + r.w/2 - 0.4, 0.42, cz, 0.6, 0.04, 1.5, '#DBEAFE');
        }
      }
      // WC cu rezervor sus
      const wX = cx - r.w/2 + 0.3;
      box(wX, 0.2, cz - 0.2, 0.4, 0.4, 0.55, '#FAFAFA');                  // bază
      box(wX, 0.55, cz - 0.4, 0.4, 0.4, 0.18, '#FAFAFA');                  // rezervor
      // Chiuvetă cilindrică pe blat
      const sX = cx + r.w/2 - 0.4;
      box(sX, 0.42, cz - r.h/2 + 0.3, 0.55, 0.04, 0.45, '#E5E7EB');       // blat
      box(sX, 0.22, cz - r.h/2 + 0.3, 0.55, 0.4, 0.45, '#D6BFA1');         // dulap jos
      cyl(sX, 0.46, cz - r.h/2 + 0.3, 0.16, 0.04, '#FAFAFA');              // chiuvetă
      // Oglindă (placă albastră reflectorizantă)
      box(sX, 1.0, cz - r.h/2 + 0.08, 0.5, 0.5, 0.03, '#BFDBFE');
    }
    else if(r.t === 'wc'){
      // WC cu rezervor
      box(cx - 0.1, 0.2, cz, 0.4, 0.4, 0.55, '#FAFAFA');
      box(cx - 0.1, 0.55, cz - 0.18, 0.4, 0.4, 0.18, '#FAFAFA');
    }
    else if(r.t === 'office'){
      // Birou
      box(cx, 0.37, cz - r.h/2 + 0.4, 1.4, 0.05, 0.7, '#78350F');
      // Scaun office cu spătar
      box(cx, 0.25, cz - r.h/2 + 1.05, 0.55, 0.5, 0.5, '#374151');
      box(cx, 0.62, cz - r.h/2 + 1.3, 0.55, 0.5, 0.05, '#374151');
      // Monitor pe birou
      box(cx, 0.6, cz - r.h/2 + 0.3, 0.55, 0.35, 0.04, '#1F2937');
      // Bibliotecă pe perete
      if(r.h > 3){
        box(cx, 0.9, cz + r.h/2 - 0.2, Math.min(r.w * 0.6, 1.8), 1.7, 0.3, '#451A03');
      }
    }
    else if(r.t === 'hall' || r.t === 'corridor'){
      // Cuier dulap dacă încape
      if(r.w > 2 && r.h > 1.5){
        box(cx, 0.9, cz + r.h/2 - 0.18, Math.min(r.w * 0.45, 1.2), 1.75, 0.35, '#D6BFA1');
      }
      // Covor lung pe centru
      box(cx, 0.025, cz, r.w * 0.5, 0.005, r.h * 0.75, '#FB923C');
    }
    else if(r.t === 'storage'){
      // Rafturi
      box(cx, 0.9, cz, r.w * 0.6, 1.7, 0.4, '#6B7280');
    }
    else if(r.t === 'core'){
      // Scări — Z-pattern de trepte
      const steps = 8;
      const stepW = Math.min(r.w * 0.8, 1.2);
      for(let i = 0; i < steps; i++){
        box(cx - r.w*0.15, 0.05 + i*0.18, cz - r.h/2 + 0.3 + i*0.28, stepW, 0.18, 0.28, '#94A3B8');
      }
      // Lift (cub gri închis)
      box(cx + r.w*0.2, 1.0, cz, 0.9, 2.0, 1.2, '#475569');
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CONSTRUIRE FLOOR PLAN COMPLET
  // ═════════════════════════════════════════════════════════════════════════
  function _buildFloorPlan(){
    const THREE = window.THREE;
    const anchor = _computeAnchor();
    const aedisFloors = _readAedis();
    if(!aedisFloors){ console.warn('[VTour S2] AEDIS lipsește'); return; }
    const RV = window._RV;

    STATE._anchor = anchor;
    STATE._aedisFloors = aedisFloors;
    const bW = anchor.bW, bD = anchor.bD;
    const ox = anchor.cx - bW / 2;
    const oz = anchor.cz - bD / 2;

    aedisFloors.floors.forEach((floor, fIdx) => {
      const wallH = 1.2; // pereți joși ca să vezi mobilier deasupra
      const fg = new THREE.Group();
      fg.name = `FP_Floor_${fIdx}`;
      fg.userData.fIdx = fIdx;
      fg.userData.baseY = anchor.baseY + floor.baseY;
      fg.position.y = fg.userData.baseY;

      // Podea de bază (placă albă-bej)
      const baseSlab = new THREE.Mesh(
        new THREE.BoxGeometry(bW + 0.2, 0.1, bD + 0.2),
        new THREE.MeshStandardMaterial({ color: 0xfaf8f3, roughness: 0.9 })
      );
      baseSlab.position.set(anchor.cx, -0.05, anchor.cz);
      baseSlab.receiveShadow = true;
      fg.add(baseSlab);

      // Conturul exterior al clădirii (margine subțire)
      const outline = new THREE.Mesh(
        new THREE.BoxGeometry(bW + 0.25, 0.04, bD + 0.25),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 })
      );
      outline.position.set(anchor.cx, 0.03, anchor.cz);
      fg.add(outline);
      // Goluri interior conturului (placă mai mică deasupra)
      const innerCutout = new THREE.Mesh(
        new THREE.BoxGeometry(bW + 0.15, 0.05, bD + 0.15),
        new THREE.MeshStandardMaterial({ color: 0xfaf8f3, roughness: 0.9 })
      );
      innerCutout.position.set(anchor.cx, 0.05, anchor.cz);
      fg.add(innerCutout);

      // ── Camerele din releveu ──
      if(RV && Array.isArray(RV.floors) && RV.floors[fIdx]){
        const rvFloor = RV.floors[fIdx];
        if(Array.isArray(rvFloor.rects)){
          rvFloor.rects.forEach(r => {
            if(!r || !isFinite(r.w) || !isFinite(r.h) || r.w <= 0.1 || r.h <= 0.1) return;
            const type = r.t || 'default';

            if(r.bal){
              // Balcon — placă aurie deschisă cu balustradă transparentă
              const bal = new THREE.Mesh(
                new THREE.BoxGeometry(r.w * 0.96, 0.04, r.h * 0.96),
                _matFor('balcon', { opacity: 0.7, transparent: true })
              );
              bal.position.set(ox + r.x + r.w/2, 0.07, oz + r.y + r.h/2);
              bal.receiveShadow = true;
              fg.add(bal);
              const rail = new THREE.Mesh(
                new THREE.BoxGeometry(r.w, 0.7, 0.04),
                new THREE.MeshStandardMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.4 })
              );
              rail.position.set(ox + r.x + r.w/2, 0.35, oz + r.y + r.h);
              fg.add(rail);
              return;
            }

            // Podea cameră (colorată conform tip)
            const cFloor = new THREE.Mesh(
              new THREE.BoxGeometry(r.w * 0.97, 0.03, r.h * 0.97),
              _matFor(type, { opacity: 0.55, transparent: true })
            );
            cFloor.position.set(ox + r.x + r.w/2, 0.07, oz + r.y + r.h/2);
            cFloor.receiveShadow = true;
            fg.add(cFloor);

            // Pereți joși (1.2m) — albi opaci, ușor să vezi peste
            const wallMat = new THREE.MeshStandardMaterial({ color: 0xf5f1ea, roughness: 0.9, side: THREE.DoubleSide });
            const t = 0.08;
            // 4 pereți (fără goluri pentru uși deocamdată — simplificare)
            const wS = new THREE.Mesh(new THREE.BoxGeometry(r.w, wallH, t), wallMat);
            wS.position.set(ox + r.x + r.w/2, 0.1 + wallH/2, oz + r.y + r.h);
            wS.castShadow = true;
            fg.add(wS);
            const wN = wS.clone();
            wN.position.set(ox + r.x + r.w/2, 0.1 + wallH/2, oz + r.y);
            fg.add(wN);
            const wE = new THREE.Mesh(new THREE.BoxGeometry(t, wallH, r.h), wallMat);
            wE.position.set(ox + r.x + r.w, 0.1 + wallH/2, oz + r.y + r.h/2);
            wE.castShadow = true;
            fg.add(wE);
            const wW = wE.clone();
            wW.position.set(ox + r.x, 0.1 + wallH/2, oz + r.y + r.h/2);
            fg.add(wW);

            // Mobilier identificabil de sus
            _addFurniture(fg, r, ox, oz);

            // Etichetă text (Sprite) plutind deasupra
            const labelText = r.lbl || _labelFor(type);
            const area = (r.w * r.h > 4) ? `${(r.w * r.h).toFixed(1)} m²` : null;
            const sprite = _makeLabel(labelText, area);
            sprite.position.set(ox + r.x + r.w/2, 2.0, oz + r.y + r.h/2);
            fg.add(sprite);
            STATE._labels.push(sprite);
          });
        }
      }

      STATE.scene.add(fg);
      STATE.floorGroups.push(fg);
    });

    // ── Acoperiș wireframe ──
    const roofW = new THREE.Mesh(
      new THREE.BoxGeometry(bW + 0.4, 0.15, bD + 0.4),
      new THREE.MeshBasicMaterial({
        color: 0x64748b, wireframe: true, transparent: true, opacity: 0.35,
      })
    );
    roofW.position.set(anchor.cx, anchor.baseY + aedisFloors.totalHeight + 0.3, anchor.cz);
    roofW.userData.isRoof = true;
    STATE.scene.add(roofW);
    STATE.floorGroups.push(roofW);

    _showFloor(0);
    console.log(`[VTour S2] FloorPlan: ${aedisFloors.floors.length} etaje, ${STATE._labels.length} etichete`);
  }

  function _labelFor(type){
    const map = {
      living: 'Living', bedroom: 'Dormitor', kitchen: 'Bucătărie',
      bath: 'Baie', wc: 'WC', hall: 'Hol', corridor: 'Coridor',
      storage: 'Depozit', core: 'Scări/Lift', balcon: 'Balcon',
      office: 'Birou', commercial: 'Comercial', meeting: 'Sală', reception: 'Recepție',
    };
    return map[type] || 'Cameră';
  }

  // ═════════════════════════════════════════════════════════════════════════
  // SHOW FLOOR — ascunde etajele deasupra nivelului selectat
  // ═════════════════════════════════════════════════════════════════════════
  function _showFloor(idx){
    STATE.currentFloor = idx;
    STATE.floorGroups.forEach((g, i) => {
      // i == idx: vizibil
      // i < idx: vizibil (etajele de sub)
      // i > idx: invizibil
      // ultimul (acoperișul wireframe): vizibil DOAR la ultimul etaj
      const isRoof = g.userData && g.userData.isRoof;
      if(isRoof){
        g.visible = (idx === STATE._aedisFloors.floors.length - 1);
      } else {
        g.visible = (i <= idx);
      }
    });
    // Update butoane UI
    document.querySelectorAll('[data-fp-floor]').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.fpFloor) === idx);
      if(parseInt(b.dataset.fpFloor) === idx){
        b.style.background = 'rgba(59,130,246,.4)';
        b.style.color = '#fff';
        b.style.borderColor = '#3b82f6';
      } else {
        b.style.background = 'rgba(15,23,42,.5)';
        b.style.color = '#94a3b8';
        b.style.borderColor = 'rgba(148,163,184,.3)';
      }
    });
    console.log(`[VTour S2] Vizualizez nivel ${idx}`);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // LIGHTING
  // ═════════════════════════════════════════════════════════════════════════
  function _setupLighting(){
    const THREE = window.THREE;
    const scene = STATE.scene;
    const anchor = _computeAnchor();
    // Soare direcțional
    const sun = new THREE.DirectionalLight(0xfff8e8, 1.8);
    sun.position.set(anchor.cx + 40, anchor.baseY + 60, anchor.cz + 30);
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
    // Hemi
    const hemi = new THREE.HemisphereLight(0xcfe8ff, 0xb0aa90, 0.55);
    scene.add(hemi);
    // Fill
    const fill = new THREE.DirectionalLight(0xc8d8ee, 0.3);
    fill.position.set(anchor.cx - 30, anchor.baseY + 40, anchor.cz - 20);
    scene.add(fill);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // OVERLAY — UI cu butoane P/E1/E2
  // ═════════════════════════════════════════════════════════════════════════
  function _createOverlay(){
    if(STATE.overlay) return null;
    const overlay = document.createElement('div');
    overlay.id = 'vtour-fp-overlay';
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(8,12,20,.92);z-index:99998;
      display:flex;flex-direction:column;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    `;
    const top = document.createElement('div');
    top.style.cssText = `
      display:flex;align-items:center;justify-content:space-between;
      padding:14px 20px;background:rgba(0,0,0,.55);
      border-bottom:1px solid rgba(59,130,246,.3);
    `;
    top.innerHTML = `
      <div style="color:#fff;font-size:14px;font-weight:700">
        📐 3D Floor Plan · <span style="color:#93c5fd;font-size:11px;font-weight:500">drag = rotire · scroll = zoom</span>
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

    // Bara cu butoane P/E1/E2 sub topbar
    const floorBar = document.createElement('div');
    floorBar.id = 'vtour-fp-floorbar';
    floorBar.style.cssText = `
      display:flex;align-items:center;gap:8px;
      padding:10px 20px;background:rgba(0,0,0,.4);
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
    const niv = aedisFloors.floors.length;
    aedisFloors.floors.forEach((fl, idx) => {
      const lbl = (idx === 0) ? 'P' : `E${idx}`;
      const b = document.createElement('button');
      b.innerHTML = lbl;
      b.dataset.fpFloor = String(idx);
      b.style.cssText = `
        background:rgba(15,23,42,.5);color:#94a3b8;
        border:1px solid rgba(148,163,184,.3);border-radius:6px;
        padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;
        min-width:42px;letter-spacing:.5px;touch-action:manipulation;
        transition:all .15s;
      `;
      b.addEventListener('click', () => _showFloor(idx));
      floorBar.appendChild(b);
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // START / STOP
  // ═════════════════════════════════════════════════════════════════════════
  function startFP(){
    if(STATE.active){ console.warn('[VTour S2] deja activ'); return; }
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
    STATE._labels = [];

    const ov = _createOverlay();
    if(!ov){ STATE.active = false; return; }
    const canvasCtn = ov.canvasCtn;

    STATE.scene = new THREE.Scene();
    STATE.scene.background = new THREE.Color(0xeef4fb); // alb-albastru curat
    STATE.scene.fog = new THREE.Fog(0xeef4fb, 80, 300);

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
    STATE.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    const anchor = _computeAnchor();
    // Distanță pentru a vedea tot etajul + înclinare 45° de la zenith
    const dist = Math.max(anchor.bW, anchor.bD) * 1.0;
    // Înclinare 45° = camera la 45° peste planul orizontal
    const angle = Math.PI / 4; // 45°
    STATE.camera.position.set(
      anchor.cx,
      anchor.baseY + dist * Math.cos(angle),
      anchor.cz + dist * Math.sin(angle)
    );

    if(THREE.OrbitControls){
      STATE.controls = new THREE.OrbitControls(STATE.camera, STATE.canvas);
      STATE.controls.target.set(anchor.cx, anchor.baseY + 0.5, anchor.cz);
      STATE.controls.enableDamping = true;
      STATE.controls.dampingFactor = 0.08;
      STATE.controls.minDistance = 3;
      STATE.controls.maxDistance = 300;
      STATE.controls.maxPolarAngle = Math.PI * 0.45; // nu coboară sub clădire
      STATE.controls.minPolarAngle = Math.PI * 0.05; // nu urcă pură verticală
    } else {
      console.warn('[VTour S2] OrbitControls lipsește');
      STATE.camera.lookAt(anchor.cx, anchor.baseY + 0.5, anchor.cz);
    }

    _setupLighting();
    _buildFloorPlan();

    // Populez butoanele de niveluri
    _populateFloorButtons(ov.floorBar, STATE._aedisFloors);
    _showFloor(0); // încep cu parterul

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
        if(errCount <= 3) console.error('[VTour S2] eroare:', err);
        if(errCount > 5){ stopFP(); }
        else STATE.raf = requestAnimationFrame(loop);
      }
    };
    STATE.raf = requestAnimationFrame(loop);
    console.log('[VTour S2] ✅ FloorPlan start complet');
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
    if(STATE.renderer){ STATE.renderer.dispose(); STATE.renderer = null; }
    if(STATE.overlay){ STATE.overlay.remove(); STATE.overlay = null; }
    STATE.canvas = null;
    STATE.floorGroups = [];
    STATE._labels = [];
    console.log('[VTour S2] stop complet');
  }

  // Expun ca window.VTourFP — separat de window.VTour
  window.VTourFP = { startFP, stopFP };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', _injectButton);
  } else {
    _injectButton();
  }
})();
