// ═══════════════════════════════════════════════════════════════════════════
// 38-dollhouse-context.js — Clădiri vecine OSM + Subsol în Dollhouse
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// CLĂDIRI VECINE:
//   Citim clădirile din Mapbox (map.queryRenderedFeatures)
//   Le transformăm în mesh-uri Three.js gri-neutru
//   Le adăugăm în scena Dollhouse la pozițiile geografice corecte
//
// SUBSOL S-1:
//   Dacă există subsol (DNA Optimizare a propus parcaj subsol)
//   Adăugăm un etaj S-1 sub clădire cu:
//     - Planul de parcaj din _rvFloorSubsol()
//     - Rampa auto
//     - Culoare distinctivă albastru-gri
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (window.VTour && window.THREE) { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 200);
  }

  waitReady(() => {
    _patchDollhouse();
    console.log('[DollhouseContext v1] ✅ clădiri vecine + subsol ready');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // PATCH VTour.start — adăugăm context după build
  // ═══════════════════════════════════════════════════════════════════════

  function _patchDollhouse() {
    if (window._DOLLHOUSE_CTX_PATCHED) return;
    window._DOLLHOUSE_CTX_PATCHED = true;

    const origStart = window.VTour.start;
    window.VTour.start = function () {
      origStart.apply(this, arguments);
      // Așteptăm dollhouse să fie construit
      setTimeout(() => {
        _addNeighborBuildings();
        _addSubsol();
      }, 1200);
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // CLĂDIRI VECINE din Mapbox
  // ═══════════════════════════════════════════════════════════════════════

  function _addNeighborBuildings() {
    const state = window.VTour?._state;
    if (!state?.scene) return;

    const THREE = window.THREE;
    const anchor = window._rvGetAnchor?.() || state._anchor;
    if (!anchor) return;

    const P = window._RV?.parcelParams;
    const buildings = _getNeighborData(P, anchor);
    if (!buildings.length) return;

    const group = new THREE.Group();
    group.name = 'NeighborBuildings';

    buildings.forEach((bld, i) => {
      try {
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(bld.color || '#8A9AB0'),
          roughness: 0.85,
          metalness: 0.05,
          transparent: true,
          opacity: 0.72,
        });

        const geo = new THREE.BoxGeometry(
          Math.max(bld.w, 2),
          Math.max(bld.h, 3),
          Math.max(bld.d, 2)
        );

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          bld.cx,
          anchor.baseY + bld.h / 2,
          bld.cz
        );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = {
          isNeighbor: true,
          buildingType: bld.type,
          height: bld.h,
        };

        // Acoperiș plat (ușor mai întunecat)
        const roofMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(bld.roofColor || '#5A6A7A'),
          roughness: 0.9,
          transparent: true,
          opacity: 0.7,
        });
        const roofGeo = new THREE.BoxGeometry(
          Math.max(bld.w, 2) + 0.1,
          0.2,
          Math.max(bld.d, 2) + 0.1
        );
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.copy(mesh.position);
        roof.position.y = anchor.baseY + bld.h + 0.1;

        group.add(mesh);
        group.add(roof);
      } catch(e) {}
    });

    state.scene.add(group);
    state._neighborGroup = group;
    console.log(`[DollhouseContext] ✅ ${buildings.length} clădiri vecine adăugate`);
  }

  // ── Obținem datele clădirilor vecine ────────────────────────────────
  function _getNeighborData(P, anchor) {
    const buildings = [];

    // Sursa 1: Mapbox queryRenderedFeatures
    const map = window.map;
    if (map && typeof map.queryRenderedFeatures === 'function') {
      try {
        const layers = ['building-extrusion', 'building', '3d-buildings']
          .filter(l => { try { return !!map.getLayer(l); } catch { return false; } });

        const feats = map.queryRenderedFeatures(undefined, { layers });
        const cent = P ? { lon: P.lon, lat: P.lat } : null;

        if (cent && feats.length) {
          const mPerLon = 111320 * Math.cos(cent.lat * Math.PI / 180);
          const mPerLat = 111320;

          feats.slice(0, 50).forEach(f => {
            if (!f.geometry) return;
            const coords = f.geometry.type === 'Polygon'
              ? f.geometry.coordinates[0]
              : f.geometry.coordinates?.[0]?.[0];
            if (!coords?.length) return;

            const lons = coords.map(c => c[0]);
            const lats = coords.map(c => c[1]);
            const cLon = (Math.min(...lons) + Math.max(...lons)) / 2;
            const cLat = (Math.min(...lats) + Math.max(...lats)) / 2;

            // Distanță față de centrul parcelei noastre
            const dx = (cLon - cent.lon) * mPerLon;
            const dz = (cent.lat - cLat) * mPerLat;
            const dist = Math.sqrt(dx * dx + dz * dz);

            // Includem numai clădirile în raza de 150m, excludem clădirea proprie
            if (dist < 3 || dist > 150) return;

            const bW = (Math.max(...lons) - Math.min(...lons)) * mPerLon;
            const bD = (Math.max(...lats) - Math.min(...lats)) * mPerLat;
            const h  = parseFloat(f.properties?.height || f.properties?.render_height || 0) ||
                       (parseInt(f.properties?.building_levels || f.properties?.levels || 2)) * 3;

            const bldType = f.properties?.building || 'yes';
            const color = _getBuildingColor(bldType, dist);

            buildings.push({
              cx: anchor.cx + dx,
              cz: anchor.cz + dz,
              w: Math.max(bW, 4),
              d: Math.max(bD, 4),
              h: Math.max(h, 3),
              type: bldType,
              color,
              roofColor: _darken(color, 0.3),
            });
          });

          if (buildings.length > 0) return buildings;
        }
      } catch(e) {
        console.warn('[DollhouseContext] Mapbox features error:', e.message);
      }
    }

    // Sursa 2: Fallback schematic — clădiri generice în jurul parcelei
    return _schematicNeighbors(anchor);
  }

  function _getBuildingColor(type, dist) {
    const fade = Math.max(0.5, 1 - dist / 200);
    const colors = {
      residential: '#7A8A9A', apartments: '#7A8A9A',
      commercial: '#9A8A6A', retail: '#9A8A6A',
      office: '#6A7A9A', industrial: '#7A6A5A',
      school: '#8A7A9A', hospital: '#9A7A8A',
      yes: '#8A9AB0',
    };
    return colors[type] || colors.yes;
  }

  function _darken(hex, amount) {
    try {
      const n = parseInt(hex.slice(1), 16);
      const r = Math.max(0, ((n >> 16) & 255) * (1 - amount));
      const g = Math.max(0, ((n >> 8) & 255) * (1 - amount));
      const b = Math.max(0, (n & 255) * (1 - amount));
      return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
    } catch { return '#5A6A7A'; }
  }

  function _schematicNeighbors(anchor) {
    // Clădiri schematice plasate în cele 4 direcții
    const d = 22; // distanță față de clădire
    const b = window._RV?.building;
    const cx = anchor.cx, cz = anchor.cz;
    const bW = b?.bW || 18, bD = b?.bD || 14;

    return [
      { cx: cx - bW/2 - d - 8, cz: cz, w: 16, d: bD*0.8, h: 9, type:'residential', color:'#8A9AB0', roofColor:'#6A7A90' },
      { cx: cx + bW/2 + d + 8, cz: cz, w: 14, d: bD*0.9, h: 12, type:'residential', color:'#8A9AB0', roofColor:'#6A7A90' },
      { cx: cx, cz: cz - bD/2 - d - 7, w: bW*0.7, d: 14, h: 7, type:'commercial', color:'#9A8A6A', roofColor:'#7A6A4A' },
      { cx: cx + bW*0.4, cz: cz + bD/2 + d + 9, w: bW*0.5, d: 12, h: 15, type:'apartments', color:'#7A8A9A', roofColor:'#5A6A7A' },
      { cx: cx - bW*0.3, cz: cz + bD/2 + d + 8, w: 18, d: 11, h: 6, type:'residential', color:'#8A9AB0', roofColor:'#6A7A90' },
    ];
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SUBSOL S-1 în Dollhouse
  // ═══════════════════════════════════════════════════════════════════════

  function _addSubsol() {
    const state = window.VTour?._state;
    if (!state?.scene) return;

    const THREE = window.THREE;
    const anchor = window._rvGetAnchor?.() || state._anchor;
    if (!anchor) return;

    const b = window._RV?.building;
    const P = window._RV?.parcelParams;
    if (!b || !P) return;

    // Verificăm dacă avem subsol
    // Sursa 1: DNA Optimizare a propus subsol
    const hasSubsolDNA = (b.subsolNiv || 0) > 0;
    // Sursa 2: Parcaje insuficiente → subsol necesar
    const nrApt = Math.max(1, Math.round((b.sdaTotal || b.scArea * b.niv) / 70));
    const parcNec = Math.ceil(nrApt * 1.0);
    const parcExist = 0; // în mod normal 0 la sol
    const hasSubsolParcaj = parcNec > parcExist;
    // Sursa 3: _rvFloorSubsol există
    const hasSubsolFn = typeof window._rvFloorSubsol === 'function' ||
                        typeof window._rvFloorParcaj === 'function';

    if (!hasSubsolDNA && !hasSubsolParcaj) return;

    const hSubsol = 2.8; // înălțimea subsolului
    const bW = anchor.bW, bD = anchor.bD;
    const ox = anchor.cx - bW / 2;
    const oz = anchor.cz - bD / 2;
    const baseY = anchor.baseY - hSubsol;

    const group = new THREE.Group();
    group.name = 'Subsol_S1';
    group.userData.isSubsol = true;
    group.userData.baseY = baseY;

    // ── Pardoseală subsol ──────────────────────────────────────────────
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x3A4A5A, roughness: 0.9, metalness: 0.05,
    });
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(bW, 0.15, bD),
      floorMat
    );
    floor.position.set(anchor.cx, baseY + 0.075, anchor.cz);
    floor.receiveShadow = true;
    group.add(floor);

    // ── Pereți exteriori subsol ────────────────────────────────────────
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x2A3A4A, roughness: 0.92, metalness: 0.02,
      transparent: true, opacity: 0.85,
    });
    const wallThick = 0.3;

    [ // [x, y, z, w, h, d]
      [anchor.cx, baseY + hSubsol/2, oz,             bW, hSubsol, wallThick], // Nord
      [anchor.cx, baseY + hSubsol/2, oz + bD,        bW, hSubsol, wallThick], // Sud
      [ox,        baseY + hSubsol/2, anchor.cz,       wallThick, hSubsol, bD], // Vest
      [ox + bW,   baseY + hSubsol/2, anchor.cz,       wallThick, hSubsol, bD], // Est
    ].forEach(([x, y, z, w, h, d]) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
      wall.position.set(x, y, z);
      group.add(wall);
    });

    // ── Plafon subsol (= pardoseala parterului) ─────────────────────────
    const ceilMat = new THREE.MeshStandardMaterial({
      color: 0x4A5A6A, roughness: 0.85,
    });
    const ceil = new THREE.Mesh(
      new THREE.BoxGeometry(bW, 0.25, bD),
      ceilMat
    );
    ceil.position.set(anchor.cx, anchor.baseY - 0.125, anchor.cz);
    ceil.receiveShadow = true;
    group.add(ceil);

    // ── Locuri de parcare ──────────────────────────────────────────────
    _addParkingSpots(group, anchor, bW, bD, ox, oz, baseY, THREE);

    // ── Rampă auto ─────────────────────────────────────────────────────
    _addRamp(group, anchor, bW, bD, ox, oz, baseY, hSubsol, THREE);

    // ── Stâlpi structurali ─────────────────────────────────────────────
    _addColumns(group, anchor, bW, bD, ox, oz, baseY, hSubsol, THREE);

    // ── Label S-1 ──────────────────────────────────────────────────────
    const nrLoc = Math.floor((bW - 6) / 2.7) * 2;
    group.userData.label = `S-1 Parcaj · ${nrLoc} locuri`;

    state.scene.add(group);
    state._subsolGroup = group;

    // Adăugăm S-1 în bara de navigare niveluri
    _addSubsolNavButton(baseY);

    console.log('[DollhouseContext] ✅ Subsol S-1 adăugat —', nrLoc, 'locuri parcaj');
    if (typeof ss === 'function') ss(`✅ Subsol S-1 adăugat în dollhouse (${nrLoc} locuri parcaj)`);
  }

  function _addParkingSpots(group, anchor, bW, bD, ox, oz, baseY, THREE) {
    const spotW = 2.5, spotD = 5.0;
    const culoarD = 6.0;
    const wallOffset = 0.5;

    // Rândul Nord (y = wallOffset)
    const nNord = Math.floor((bW - wallOffset * 2 - 3.6) / (spotW + 0.1)); // -3.6 pentru rampă
    for (let i = 0; i < nNord; i++) {
      const x = ox + wallOffset + i * (spotW + 0.1) + spotW / 2;
      const z = oz + wallOffset + spotD / 2;
      _addSpot(group, x, baseY, z, spotW, spotD, THREE, i);
    }

    // Rândul Sud (y = bD - wallOffset - spotD)
    const nSud = Math.floor((bW - wallOffset * 2) / (spotW + 0.1));
    for (let i = 0; i < nSud; i++) {
      const x = ox + wallOffset + i * (spotW + 0.1) + spotW / 2;
      const z = oz + bD - wallOffset - spotD / 2;
      _addSpot(group, x, baseY, z, spotW, spotD, THREE, nNord + i);
    }

    // Marcaj culoar central
    const culoarMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF, roughness: 0.8, transparent: true, opacity: 0.3,
    });
    const culoar = new THREE.Mesh(
      new THREE.BoxGeometry(bW - 1, 0.02, culoarD),
      culoarMat
    );
    culoar.position.set(anchor.cx, baseY + 0.16, oz + wallOffset + spotD + culoarD / 2);
    group.add(culoar);
  }

  function _addSpot(group, x, baseY, z, w, d, THREE, idx) {
    // Marcaj loc parcare (linie subțire)
    const lineMat = new THREE.MeshStandardMaterial({
      color: idx === 0 ? 0x4488FF : 0xFFFFFF, // primul loc = PMR (albastru)
      roughness: 0.7, transparent: true, opacity: 0.5,
    });
    // Linie stângă
    const lineL = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.02, d),
      lineMat
    );
    lineL.position.set(x - w / 2, baseY + 0.155, z);
    group.add(lineL);
    // Linie dreaptă
    const lineR = lineL.clone();
    lineR.position.set(x + w / 2, baseY + 0.155, z);
    group.add(lineR);
  }

  function _addRamp(group, anchor, bW, bD, ox, oz, baseY, hSubsol, THREE) {
    const rampW = 3.6, rampL = 9.0;
    const rampMat = new THREE.MeshStandardMaterial({
      color: 0x5A6A7A, roughness: 0.9,
    });

    // Rampă în colțul NE (față de front stradal)
    const rampX = ox + bW - rampW / 2 - 0.5;
    const rampZ = oz + bD - rampL / 2;

    // Geometrie rampă — plană înclinată
    const rampGeo = new THREE.BoxGeometry(rampW, 0.15, rampL);
    const ramp = new THREE.Mesh(rampGeo, rampMat);
    ramp.position.set(rampX, baseY + hSubsol / 2, rampZ);
    ramp.rotation.x = -Math.atan(hSubsol / rampL); // panta 15° ≈ 2.8/9

    group.add(ramp);

    // Marcaj săgeți rampă
    const arrowMat = new THREE.MeshStandardMaterial({
      color: 0xFFFF00, roughness: 0.7, transparent: true, opacity: 0.6,
    });
    const arrow = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.02, rampL * 0.7), arrowMat);
    arrow.position.set(rampX, baseY + hSubsol / 2 + 0.1, rampZ);
    arrow.rotation.x = ramp.rotation.x;
    group.add(arrow);
  }

  function _addColumns(group, anchor, bW, bD, ox, oz, baseY, hSubsol, THREE) {
    const colMat = new THREE.MeshStandardMaterial({
      color: 0x3A4A4A, roughness: 0.8, metalness: 0.1,
    });
    const colSize = 0.4;

    // Grilă stâlpi 5×5m
    const nX = Math.floor(bW / 5), nZ = Math.floor(bD / 5);
    const stepX = bW / nX, stepZ = bD / nZ;

    for (let i = 1; i < nX; i++) {
      for (let j = 1; j < nZ; j++) {
        const col = new THREE.Mesh(
          new THREE.BoxGeometry(colSize, hSubsol, colSize),
          colMat
        );
        col.position.set(
          ox + i * stepX,
          baseY + hSubsol / 2,
          oz + j * stepZ
        );
        col.castShadow = true;
        group.add(col);
      }
    }
  }

  // ── Buton S-1 în bara de navigare ─────────────────────────────────────
  function _addSubsolNavButton(baseY) {
    const bar = document.getElementById('ts-nav-bar');
    if (!bar || document.getElementById('ts-nav-s1')) return;

    const btn = document.createElement('button');
    btn.id = 'ts-nav-s1';
    btn.className = 'ts-nb-btn';
    btn.style.cssText += ';border-color:rgba(56,189,248,.4);color:#38BDF8;background:rgba(56,189,248,.08)';
    btn.textContent = 'S-1';
    btn.title = 'Subsol S-1 — Parcaj';

    btn.onclick = () => {
      const state = window.VTour?._state;
      const orbit = state?.controls || state?.orbit;
      if (!orbit) return;

      // Navigăm la nivelul subsolului
      const targetY = baseY + 1.4;
      const startY = orbit.target?.y || 0;
      const t0 = performance.now();
      const anim = (now) => {
        const t = Math.min(1, (now - t0) / 500);
        const e = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
        if (orbit.target) orbit.target.y = startY + (targetY - startY) * e;
        if (t < 1) requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);

      document.querySelectorAll('.ts-nb-btn[data-floor-idx]').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      if (typeof ss === 'function') ss('🅿 Subsol S-1 — Parcaj');
    };

    // Inserăm înaintea butonului P (primul etaj)
    bar.insertBefore(btn, bar.firstChild);
  }

})();
