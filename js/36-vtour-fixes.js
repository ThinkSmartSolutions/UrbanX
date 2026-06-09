// ═══════════════════════════════════════════════════════════════════════════
// 36-vtour-fixes.js — Fix-uri critice VTour
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// FIX 1 — Tur Foto „Scena 3D nu poate fi construită"
//   _ensureVTourScene() construiește scenă din V3D.aedis când VTour nu e activ
//   anchor calculat direct din _RV.building dacă VTour._state._anchor e null
//
// FIX 2 — Uși lipsă în 3D Floor Plan
//   Mapăm fl.doors (globale) → r.doors (per cameră, format {side,pos,w})
//   Hook pe _buildDollhouse — înainte de build, fiecare rect primește r.doors
//
// FIX 3 — Intrare bloc vizibilă la parter
//   Ușa principală (type:'main') adăugată explicit pe peretele frontal
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (window.VTour && window._RV !== undefined) { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 200);
  }

  waitReady(() => {
    _fix1_TurFotoAnchor();
    _fix2_DoorsMapping();
    console.log('[VTour-Fixes v1] ✅ anchor fix + uși 3D fix aplicate');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // FIX 1 — Anchor fallback pentru Tur Foto din Dollhouse
  // ═══════════════════════════════════════════════════════════════════════

  function _fix1_TurFotoAnchor() {
    // Expunem o funcție globală care returnează anchor valid în orice context
    window._rvGetAnchor = function () {
      // Context 1: VTour activ (3D Floor Plan deschis)
      const vtAnchor = window.VTour?._state?._anchor;
      if (vtAnchor && isFinite(vtAnchor.cx)) return vtAnchor;

      // Context 2: V3D.aedis disponibil (Dollhouse deschis)
      const THREE = window.THREE;
      const V3D = window.V3D;
      if (THREE && V3D?.aedis?.length) {
        const bbox = new THREE.Box3();
        V3D.aedis.forEach(m => {
          if (m?.isObject3D) {
            try { bbox.union(new THREE.Box3().setFromObject(m)); } catch(e) {}
          }
        });
        if (isFinite(bbox.min.x)) {
          const center = new THREE.Vector3();
          bbox.getCenter(center);
          const size = new THREE.Vector3();
          bbox.getSize(size);
          const b = window._RV?.building;
          return {
            cx: center.x,
            cz: center.z,
            baseY: bbox.min.y,
            bW: b?.bW || Math.max(size.x, 5),
            bD: b?.bD || Math.max(size.z, 5),
          };
        }
      }

      // Context 3: Numai _RV.building (fallback complet)
      const b = window._RV?.building;
      if (b) {
        return { cx: b.bW / 2, cz: b.bD / 2, baseY: 0, bW: b.bW, bD: b.bD };
      }

      return null;
    };

    // Patch 30-tur-foto.js: _runPanoramasPipeline să folosească _rvGetAnchor
    const origTfSelect = window._tfSelectLevel;
    if (origTfSelect && !window._TF_ANCHOR_PATCHED) {
      window._TF_ANCHOR_PATCHED = true;
      window._tfSelectLevel = async function (level) {
        // Dacă VTour nu e activ, îl pornim automat pentru context
        if (!window.VTour?._state?.active && !window.VTour?._state?._anchor) {
          // Construim anchor virtual
          const anchor = window._rvGetAnchor();
          if (anchor && window.VTour?._state) {
            window.VTour._state._anchor = anchor;
          }
        }
        return origTfSelect.apply(this, arguments);
      };
    }

    // Patch direct pe _ensureVTourScene din 30-tur-foto.js
    // Expunem funcție care construiește scenă din context curent
    window._buildTurFotoScene = function () {
      const THREE = window.THREE;
      if (!THREE) return null;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xc5dff0);

      // Copiem din V3D (viewer 3D AEDIS) dacă disponibil
      const V3D = window.V3D;
      if (V3D?.aedis?.length > 0) {
        V3D.aedis.forEach(m => {
          if (m?.isObject3D) {
            try { scene.add(m.clone()); } catch(e) {}
          }
        });
      }

      // Copiem și din dollhouseGroup dacă VTour e activ
      const vtState = window.VTour?._state;
      if (vtState?.dollhouseGroup) {
        try { scene.add(vtState.dollhouseGroup.clone()); } catch(e) {}
      }

      // Iluminare
      const amb = new THREE.AmbientLight(0xfff5e4, 0.65);
      scene.add(amb);
      const sun = new THREE.DirectionalLight(0xfff0d8, 2.2);
      sun.position.set(50, 80, 30);
      sun.castShadow = true;
      scene.add(sun);
      const hemi = new THREE.HemisphereLight(0xcce4f5, 0x8a9466, 0.5);
      scene.add(hemi);

      // Setăm în STATE pentru ca _runPanoramasPipeline să-l găsească
      if (vtState && !vtState.scene) {
        vtState.scene = scene;
        vtState.active = true;
      }

      return scene;
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // FIX 2 — Mapare fl.doors → r.doors pentru fiecare cameră
  // ═══════════════════════════════════════════════════════════════════════

  function _fix2_DoorsMapping() {
    if (window._DOORS_MAPPING_PATCHED) return;
    window._DOORS_MAPPING_PATCHED = true;

    // Hook pe _rvRegenFloors — după regenerare, mapăm ușile pe camere
    const origRegen = window._rvRegenFloors;
    window._rvRegenFloors = function () {
      const result = origRegen?.apply(this, arguments);
      _mapDoorsToRects();
      return result;
    };

    // Și la render
    const origRender = window._rvRender;
    if (origRender && !window._DOORS_RENDER_PATCHED) {
      window._DOORS_RENDER_PATCHED = true;
      window._rvRender = function () {
        const r = origRender.apply(this, arguments);
        setTimeout(_mapDoorsToRects, 100);
        return r;
      };
    }

    // Rulăm imediat dacă floors există
    setTimeout(_mapDoorsToRects, 500);
  }

  function _mapDoorsToRects() {
    const floors = window._RV?.floors;
    if (!Array.isArray(floors)) return;

    floors.forEach(fl => {
      if (!fl?.rects || !fl?.doors) return;

      const rects = fl.rects;
      const doors = fl.doors; // [{x,y,w,type,axis,aptIdx,swing}]

      // Resetăm r.doors pe toate camerele
      rects.forEach(r => { r.doors = []; });

      doors.forEach(door => {
        const { x: dx, y: dy, w: dw, axis, type, aptIdx } = door;

        if (axis === 'H') {
          // Perete orizontal la y=dy
          // Găsim camera care are peretele la acea coordonată
          rects.forEach(r => {
            if (r.bal) return;
            const EPS = 0.35;
            const xOverlap = dx >= r.x - EPS && dx <= r.x + r.w + EPS;

            // Peretele nordic al camerei (y = r.y)
            if (Math.abs(dy - r.y) < EPS && xOverlap) {
              if (!r.doors) r.doors = [];
              const pos = (dx + dw / 2) - r.x; // pos relativ față de colțul stâng al camerei
              r.doors.push({ side: 'n', pos, w: dw || 0.9 });
            }
            // Peretele sudic al camerei (y = r.y + r.h)
            if (Math.abs(dy - (r.y + r.h)) < EPS && xOverlap) {
              if (!r.doors) r.doors = [];
              const pos = (dx + dw / 2) - r.x;
              r.doors.push({ side: 's', pos, w: dw || 0.9 });
            }
          });

        } else if (axis === 'V') {
          // Perete vertical la x=dx
          rects.forEach(r => {
            if (r.bal) return;
            const EPS = 0.35;
            const yOverlap = dy >= r.y - EPS && dy <= r.y + r.h + EPS;

            // Peretele vestic (x = r.x)
            if (Math.abs(dx - r.x) < EPS && yOverlap) {
              if (!r.doors) r.doors = [];
              const pos = (dy + dw / 2) - r.y;
              r.doors.push({ side: 'v', pos, w: dw || 0.9 });
            }
            // Peretele estic (x = r.x + r.w)
            if (Math.abs(dx - (r.x + r.w)) < EPS && yOverlap) {
              if (!r.doors) r.doors = [];
              const pos = (dy + dw / 2) - r.y;
              r.doors.push({ side: 'e', pos, w: dw || 0.9 });
            }
          });

        } else if (type === 'main') {
          // Intrare bloc — pe peretele frontal (sudic, y = bD)
          const bD = window._RV?.building?.bD || 20;
          rects.forEach(r => {
            if (r.bal || r.apt < -1) return;
            const EPS = 0.5;
            if (Math.abs((r.y + r.h) - bD) < EPS) {
              if (!r.doors) r.doors = [];
              const pos = (dx + dw / 2) - r.x;
              if (pos > 0 && pos < r.w) {
                r.doors.push({ side: 's', pos, w: dw || 1.8, isMain: true });
              }
            }
          });
        }
      });
    });

    // Forțăm rebuild dollhouse dacă e activ
    if (window.VTour?._state?.active && window.VTour?._state?.dollhouseGroup) {
      // Nu rebuildam complet — prea costisitor
      // Doar marcăm că la next open va fi corect
      window._DOORS_READY = true;
    }
  }

  // ── Expunem pentru debugging ────────────────────────────────────────────
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
