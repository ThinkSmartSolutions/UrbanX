// ═══════════════════════════════════════════════════════════════════════════
// 36-vtour-fixes.js — Fix-uri critice VTour
// UrbanX TSS·FG | v2.0 | 10 Iunie 2026
//
// FIX 1 — Anchor fallback pentru Tur Foto din orice context
// FIX 2 — Uși în 3D: fl.doors → r.doors ÎNAINTE de _buildDollhouse
//          + refresh forțat după mapare
// FIX 3 — Culori per apartament: fiecare apt are o culoare distinctă
//          pe podea + accent pe pereți → știi clar unde se termină un apt
// FIX 4 — Ușa principală vizibilă: arc 3D + marker INTRARE la parter
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // Paleta de culori per apartament — 12 culori distincte, niciuna nu se repetă
  const APT_COLORS = [
    0xFFF3CD, // galben crem
    0xD4EDDA, // verde menta
    0xCCE5FF, // albastru deschis
    0xF8D7DA, // roz pal
    0xD1ECF1, // turcoaz pal
    0xFFE5D0, // portocaliu pal
    0xE2D9F3, // lila pal
    0xD6F5D6, // verde lime pal
    0xFFF0E6, // piersică
    0xE6F4FA, // albastru gheata
    0xF5E6FA, // mov pal
    0xFAF5E4, // crem galben
  ];

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (window.VTour && window._RV !== undefined) { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 200);
  }

  waitReady(() => {
    _fix1_TurFotoAnchor();
    _fix2_DoorsBeforeBuild();
    _fix3_AptColors();
    _fixV3dCleanup();
    console.log('[VTour-Fixes v2] ✅ anchor + uși + culori + fix re-open dollhouse');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // FIX 1 — Anchor universal
  // ═══════════════════════════════════════════════════════════════════════


  // ── Fix: _v3dCleanup nu apelează VTour.stop → state rămâne blocat ────────
  function _fixV3dCleanup() {
    if (window._V3D_CLEANUP_PATCHED) return;
    window._V3D_CLEANUP_PATCHED = true;

    // Patch _v3dCleanup să oprească și VTour
    const origCleanup = window._v3dCleanup;
    if (origCleanup) {
      window._v3dCleanup = function () {
        // Oprim VTour înainte de cleanup
        if (window.VTour?.stop) {
          try { window.VTour.stop(); } catch(e) {}
        }
        // Și orice overlay tur foto
        document.getElementById('tf-tour-overlay')?.remove();
        document.getElementById('tf-launcher-overlay')?.remove();
        document.getElementById('gs-launcher')?.remove();
        document.getElementById('gs-viewer-overlay')?.remove();
        document.getElementById('pt-overlay')?.remove();
        return origCleanup.apply(this, arguments);
      };
    }

    // Patch VTour.start — verificăm că STATE.overlay e EFECTIV în DOM
    // (poate fi setat dar overlay-ul să fi fost șters din DOM)
    const origStart = window.VTour?.start;
    if (origStart && !window._VTOUR_START_DOM_PATCHED) {
      window._VTOUR_START_DOM_PATCHED = true;
      window.VTour.start = function () {
        const STATE = window.VTour._state;
        // Dacă overlay e setat dar nu mai e în DOM → resetăm
        if (STATE?.overlay && !document.body.contains(STATE.overlay)) {
          STATE.overlay = null;
          STATE.active = false;
          STATE.scene = null;
          STATE.renderer = null;
          STATE.canvas = null;
          STATE.controls = null;
          STATE.dollhouseGroup = null;
          STATE.floorOffsets = [];
          if (window.PAL !== undefined) window.PAL = null;
          console.log('[VTour-Fixes] STATE resetat — overlay nu mai era în DOM');
        }
        return origStart.apply(this, arguments);
      };
    }
  }

  function _fix1_TurFotoAnchor() {
    window._rvGetAnchor = function () {
      const vtAnchor = window.VTour?._state?._anchor;
      if (vtAnchor && isFinite(vtAnchor.cx)) return vtAnchor;

      const THREE = window.THREE;
      const V3D = window.V3D;
      if (THREE && V3D?.aedis?.length) {
        const bbox = new THREE.Box3();
        V3D.aedis.forEach(m => {
          if (m?.isObject3D) try { bbox.union(new THREE.Box3().setFromObject(m)); } catch(e) {}
        });
        if (isFinite(bbox.min.x)) {
          const center = new THREE.Vector3();
          bbox.getCenter(center);
          const size = new THREE.Vector3();
          bbox.getSize(size);
          const b = window._RV?.building;
          return { cx: center.x, cz: center.z, baseY: bbox.min.y,
                   bW: b?.bW || Math.max(size.x, 5), bD: b?.bD || Math.max(size.z, 5) };
        }
      }

      const b = window._RV?.building;
      if (b) return { cx: b.bW/2, cz: b.bD/2, baseY: 0, bW: b.bW, bD: b.bD };
      return null;
    };

    window._buildTurFotoScene = function () {
      const THREE = window.THREE;
      if (!THREE) return null;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xc5dff0);
      const V3D = window.V3D;
      if (V3D?.aedis?.length > 0) {
        V3D.aedis.forEach(m => {
          if (m?.isObject3D) try { scene.add(m.clone()); } catch(e) {}
        });
      }
      const vtState = window.VTour?._state;
      if (vtState?.dollhouseGroup) try { scene.add(vtState.dollhouseGroup.clone()); } catch(e) {}
      scene.add(new THREE.AmbientLight(0xfff5e4, 0.65));
      const sun = new THREE.DirectionalLight(0xfff0d8, 2.2);
      sun.position.set(50, 80, 30); sun.castShadow = true; scene.add(sun);
      scene.add(new THREE.HemisphereLight(0xcce4f5, 0x8a9466, 0.5));
      if (vtState && !vtState.scene) { vtState.scene = scene; vtState.active = true; }
      return scene;
    };

    const origTfSelect = window._tfSelectLevel;
    if (origTfSelect && !window._TF_ANCHOR_PATCHED) {
      window._TF_ANCHOR_PATCHED = true;
      window._tfSelectLevel = async function (level) {
        if (!window.VTour?._state?.active && !window.VTour?._state?._anchor) {
          const anchor = window._rvGetAnchor();
          if (anchor && window.VTour?._state) window.VTour._state._anchor = anchor;
        }
        return origTfSelect.apply(this, arguments);
      };
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // FIX 2 — Uși: mapare fl.doors → r.doors ÎNAINTE de build
  // ═══════════════════════════════════════════════════════════════════════

  function _fix2_DoorsBeforeBuild() {
    if (window._DOORS_MAPPING_PATCHED) return;
    window._DOORS_MAPPING_PATCHED = true;

    // Patch VTour.start — mapăm ușile ÎNAINTE de build
    const origStart = window.VTour.start;
    window.VTour.start = function () {
      // Mapăm ușile ÎNAINTE să construim scena 3D
      _mapDoorsToRects();
      return origStart.apply(this, arguments);
    };

    // Hook pe _rvRegenFloors — remapăm după regenerare și rebuild
    const origRegen = window._rvRegenFloors;
    if (origRegen && !window._DOORS_REGEN_PATCHED) {
      window._DOORS_REGEN_PATCHED = true;
      window._rvRegenFloors = function () {
        const result = origRegen?.apply(this, arguments);
        _mapDoorsToRects();
        return result;
      };
    }

    setTimeout(_mapDoorsToRects, 300);

    // Hook pe startFP (3D Floor Plan) — același tratament ca VTour.start
    var _hookStartFP = function() {
      var fp = window.VTourFP;
      if (!fp || !fp.startFP || fp.startFP._doorsFPHooked) return false;
      fp.startFP._doorsFPHooked = true;
      var origFP = fp.startFP;
      fp.startFP = function() {
        _mapDoorsToRects();
        return origFP.apply(this, arguments);
      };
      return true;
    };
    if (!_hookStartFP()) {
      var fpObs = new MutationObserver(function() {
        if (_hookStartFP()) fpObs.disconnect();
      });
      fpObs.observe(document.body, { childList: true, subtree: true });
      setTimeout(function() { fpObs.disconnect(); }, 15000);
    }
  }

  function _mapDoorsToRects() {
    const floors = window._RV?.floors;
    if (!Array.isArray(floors)) return;
    let total = 0;

    floors.forEach(fl => {
      if (!fl?.rects || !fl?.doors) return;
      fl.rects.forEach(r => { r.doors = []; });

      fl.doors.forEach(door => {
        const { x: dx, y: dy, w: dw, axis, type } = door;
        const EPS = 0.4;

        fl.rects.forEach(r => {
          if (r.bal) return;

          if (axis === 'H') {
            const xOvlp = dx >= r.x - EPS && dx <= r.x + r.w + EPS;
            if (Math.abs(dy - r.y) < EPS && xOvlp) {
              const pos = (dx + dw/2) - r.x;
              r.doors.push({ side:'n', pos, w: dw || 0.9 });
              total++;
            }
            if (Math.abs(dy - (r.y + r.h)) < EPS && xOvlp) {
              const pos = (dx + dw/2) - r.x;
              r.doors.push({ side:'s', pos, w: dw || 0.9 });
              total++;
            }
          } else if (axis === 'V') {
            const yOvlp = dy >= r.y - EPS && dy <= r.y + r.h + EPS;
            if (Math.abs(dx - r.x) < EPS && yOvlp) {
              const pos = (dy + dw/2) - r.y;
              r.doors.push({ side:'v', pos, w: dw || 0.9 });
              total++;
            }
            if (Math.abs(dx - (r.x + r.w)) < EPS && yOvlp) {
              const pos = (dy + dw/2) - r.y;
              r.doors.push({ side:'e', pos, w: dw || 0.9 });
              total++;
            }
          } else if (type === 'main') {
            const bD = window._RV?.building?.bD || 20;
            if (Math.abs((r.y + r.h) - bD) < EPS) {
              const pos = (dx + dw/2) - r.x;
              if (pos > 0 && pos < r.w) {
                r.doors.push({ side:'s', pos, w: dw || 1.8, isMain: true });
                total++;
              }
            }
          }
        });
      });
    });

    window._DOORS_READY = total > 0;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // FIX 3 — Culori distincte per apartament + ușa principală vizibilă
  // ═══════════════════════════════════════════════════════════════════════

  function _fix3_AptColors() {
    if (window._APT_COLORS_PATCHED) return;
    window._APT_COLORS_PATCHED = true;

    // Hook pe VTour.start — post-procesăm scena după build
    const origStart = window.VTour.start;
    window.VTour.start = function () {
      const result = origStart.apply(this, arguments);
      setTimeout(() => {
        _colorFloorsByApt();
        _addEntryMarker();
      }, 1200);
      return result;
    };
  }

  function _colorFloorsByApt() {
    const state = window.VTour?._state;
    if (!state?.dollhouseGroup) return;
    const THREE = window.THREE;
    const b = window._RV?.building;
    const floors = window._RV?.floors;
    if (!b || !floors?.length) return;

    const anchor = window._rvGetAnchor?.();
    if (!anchor) return;

    const ox = anchor.cx - b.bW/2;
    const oz = anchor.cz - b.bD/2;
    const hNiv = window._RV?.parcelParams?.hn || 3;

    let painted = 0;

    floors.forEach((fl, fIdx) => {
      if (!fl?.rects) return;
      const baseY = anchor.baseY + fIdx * hNiv;

      // Map aptIdx → culoare
      const aptColorMap = {};
      fl.rects.forEach(r => {
        if (r.apt >= 0 && aptColorMap[r.apt] === undefined) {
          aptColorMap[r.apt] = APT_COLORS[r.apt % APT_COLORS.length];
        }
      });

      // Găsim mesh-urile de podea din dollhouseGroup și le recolorăm
      state.dollhouseGroup.traverse(obj => {
        if (!obj.isMesh || !obj.userData?.floorIdx && obj.userData?.floorIdx !== 0) return;
        if (obj.userData.floorIdx !== fIdx) return;
        if (!obj.userData.rectIdx && obj.userData.rectIdx !== 0) return;

        const r = fl.rects[obj.userData.rectIdx];
        if (!r || r.bal || r.apt < 0) return;

        const col = aptColorMap[r.apt];
        if (col) {
          obj.material = new THREE.MeshStandardMaterial({
            color: col, roughness: 0.65, metalness: 0,
          });
          painted++;
        }
      });
    });

    // Alternativa: recolorim pe baza poziției (dacă userData nu e setat)
    if (painted === 0) {
      _colorByPosition(state, floors, anchor, b, ox, oz, hNiv, THREE);
    }
  }

  function _colorByPosition(state, floors, anchor, b, ox, oz, hNiv, THREE) {
    // Construim map: (x,z) → aptColor per etaj
    const floorMaps = floors.map((fl, fIdx) => {
      const map = [];
      if (!fl?.rects) return map;
      fl.rects.forEach(r => {
        if (r.bal || r.apt < 0) return;
        const col = APT_COLORS[r.apt % APT_COLORS.length];
        map.push({
          minX: ox + r.x, maxX: ox + r.x + r.w,
          minZ: oz + r.y, maxZ: oz + r.y + r.h,
          y: anchor.baseY + fIdx * hNiv,
          col,
        });
      });
      return map;
    });

    let painted = 0;
    state.dollhouseGroup.traverse(obj => {
      if (!obj.isMesh) return;
      // Căutăm mesh-urile plate (grosime < 0.1) = podele
      const geo = obj.geometry;
      if (!geo?.boundingBox) geo?.computeBoundingBox();
      const bbox = geo?.boundingBox;
      if (!bbox) return;
      const size = new THREE.Vector3();
      bbox.getSize(size);
      if (size.y > 0.15) return; // nu e podea (pereți au h > 0.15)

      const wp = obj.getWorldPosition(new THREE.Vector3());
      const fIdx = Math.round((wp.y - anchor.baseY) / hNiv);
      const map = floorMaps[fIdx];
      if (!map?.length) return;

      const match = map.find(m =>
        wp.x >= m.minX - 0.3 && wp.x <= m.maxX + 0.3 &&
        wp.z >= m.minZ - 0.3 && wp.z <= m.maxZ + 0.3
      );
      if (match) {
        obj.material = new THREE.MeshStandardMaterial({
          color: match.col, roughness: 0.65, metalness: 0,
        });
        painted++;
      }
    });

    if (painted > 0 && typeof ss === 'function') {
      ss(`✅ ${painted} suprafețe colorate per apartament`);
    }
  }


  // ── Culori per apartament pe 3D Floor Plan ────────────────────────────
  function _applyAptColorsFP() {
    const state = window.VTour?._state;
    if (!state?.scene) return;
    const THREE = window.THREE;
    const floors = window._RV?.floors;
    const anchor = window._rvGetAnchor?.() || state._anchor;
    if (!floors || !anchor) return;

    const b = window._RV?.building;
    const ox = anchor.cx - (anchor.bW || b?.bW || 18) / 2;
    const oz = anchor.cz - (anchor.bD || b?.bD || 14) / 2;
    const hNiv = b?.P?.hn || 3;
    let painted = 0;

    floors.forEach((fl, fIdx) => {
      if (!fl?.rects) return;
      const baseY = anchor.baseY + fIdx * hNiv;

      // Map aptIdx → culoare
      const aptColorMap = {};
      fl.rects.forEach(r => {
        if (r.apt > 0 && aptColorMap[r.apt] === undefined) {
          aptColorMap[r.apt] = APT_COLORS[r.apt % APT_COLORS.length];
        }
      });

      // Recolorăm mesh-urile de podea din scenă
      state.scene.traverse(obj => {
        if (!obj.isMesh) return;
        const wp = new THREE.Vector3();
        obj.getWorldPosition(wp);
        if (Math.abs(wp.y - baseY) > hNiv * 0.3) return; // nu e la acest etaj

        const rx = wp.x - ox, rz = wp.z - oz;
        const match = fl.rects.find(r =>
          !r.bal && r.apt > 0 &&
          rx >= r.x - 0.4 && rx <= r.x + r.w + 0.4 &&
          rz >= r.y - 0.4 && rz <= r.y + r.h + 0.4
        );
        if (match) {
          const col = aptColorMap[match.apt];
          if (col && obj.material?.color) {
            obj.material = new THREE.MeshStandardMaterial({
              color: col, roughness: 0.7, metalness: 0,
            });
            painted++;
          }
        }
      });
    });
    if (painted > 0 && typeof ss === 'function') {
      ss('✅ ' + painted + ' suprafețe colorate per apartament (FP)');
    }
  }

  // ── Marker vizual INTRARE bloc la parter ──────────────────────────────
  function _addEntryMarker() {
    const state = window.VTour?._state;
    if (!state?.scene) return;
    const THREE = window.THREE;
    const anchor = window._rvGetAnchor?.();
    if (!anchor) return;

    const b = window._RV?.building;
    const fl = window._RV?.floors?.[0];
    if (!b || !fl) return;

    const mainDoor = fl.doors?.find(d => d.type === 'main');
    if (!mainDoor) return;

    const ox = anchor.cx - b.bW/2;
    const oz = anchor.cz - b.bD/2;

    const doorX = ox + mainDoor.x + mainDoor.w/2;
    const doorZ = oz + b.bD + 0.3; // ușor în afara clădirii
    const doorY = anchor.baseY;

    // Arc de ușă (cadrul)
    const archMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37, roughness: 0.4, metalness: 0.6,
      emissive: 0x8B6914, emissiveIntensity: 0.3,
    });

    // Stâlp stâng
    const pillarL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.2, 0.1), archMat);
    pillarL.position.set(doorX - mainDoor.w/2, doorY + 1.1, doorZ);
    state.scene.add(pillarL);

    // Stâlp drept
    const pillarR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.2, 0.1), archMat);
    pillarR.position.set(doorX + mainDoor.w/2, doorY + 1.1, doorZ);
    state.scene.add(pillarR);

    // Grindă orizontală deasupra
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(mainDoor.w + 0.1, 0.12, 0.1), archMat);
    lintel.position.set(doorX, doorY + 2.2, doorZ);
    state.scene.add(lintel);

    // Săgeată/semn INTRARE — plan vertical cu text simulat
    const signMat = new THREE.MeshStandardMaterial({
      color: 0x22C55E, roughness: 0.7, metalness: 0,
      emissive: 0x16A34A, emissiveIntensity: 0.4,
    });
    const sign = new THREE.Mesh(new THREE.BoxGeometry(mainDoor.w * 0.8, 0.35, 0.04), signMat);
    sign.position.set(doorX, doorY + 2.55, doorZ);
    state.scene.add(sign);

    // Luminiță de marcaj (point light galben-auriu)
    const entryLight = new THREE.PointLight(0xD4AF37, 1.2, 8);
    entryLight.position.set(doorX, doorY + 2.8, doorZ + 0.5);
    state.scene.add(entryLight);
  }

  // ── Debug ────────────────────────────────────────────────────────────────
  window._doorsDebug = function () {
    const fl0 = window._RV?.floors?.[0];
    if (!fl0) { console.log('No floor 0'); return; }
    console.log('fl.doors total:', fl0.doors?.length);
    let withDoors = 0;
    fl0.rects?.forEach(r => {
      if (r.doors?.length) {
        withDoors++;
        console.log(`  ${r.t} apt${r.apt}: ${r.doors.length} uși →`, r.doors);
      }
    });
    console.log(`Camere cu uși: ${withDoors}/${fl0.rects?.length}`);
  };

})();
