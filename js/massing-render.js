// ═══════════════════════════════════════════════════════════════════════════
// massing-render.js — Massing + Render Engine v2.0
// UrbanX TSS·FG
//
// FIXES față de v139 original:
//   - Renderer folosește sistemul de coordonate TCI._3D (nu spațiu abstract)
//   - _positionEntity din TCI convertește WGS84 → Mercator → Three.js
//   - Loturi cu coordonate reale → mesh-uri poziționate corect pe hartă
//   - Culorile reflectă tipologia UDRE (nu hardcodat 0x3366ff)
// ═══════════════════════════════════════════════════════════════════════════

window.UrbanXMassing = {

  // ── Construiește clădiri din loturi + reguli UDRE ─────────────────────
  build(lots, rules, parcel) {
    if (!lots?.length) return [];

    const hMax   = rules?._base?.hMaxFloors || rules?.hMax?.value || rules?.Hmax || 6;
    const hMaxM  = hMax * 3.2; // FLOOR_H = 3.2m (din TCI)
    const pot    = (rules?._base?.pot || rules?.pot?.value || 40) / 100;
    const tipol  = rules?._base?.tip || rules?.tipologie?.value || 'rezidential-colectiv';
    const isGeo  = parcel && Math.abs(parcel.center[0]) < 180;

    return lots.map(lot => ({
      id:        lot.id,
      center:    lot.center,
      footprint: lot.area * pot,
      height:    hMaxM,
      hMaxFloors: hMax,
      volume:    lot.area * pot * hMaxM,
      tipologie: tipol,
      color:     this._colorForTipologie(tipol),
      lot,
      isGeo,
    }));
  },

  // ── Render în scena TCI._3D ───────────────────────────────────────────
  // Folosește _positionEntity (WGS84 → Mercator → Three.js)
  render(buildings, scene3D) {
    if (!buildings?.length) return 0;
    if (typeof THREE === 'undefined') {
      console.warn('[Massing] THREE.js nu e disponibil');
      return 0;
    }

    // Folosim scena TCI dacă nu e specificată explicit
    const scene = scene3D || window.TCI?._3D?._scene;
    if (!scene) {
      console.warn('[Massing] Scenă Three.js nu e disponibilă');
      return 0;
    }

    // Curățăm mesh-urile anterioare ale pipeline-ului
    const toRemove = scene.children.filter(c => c.userData?.pipelineBuilding);
    toRemove.forEach(m => scene.remove(m));

    let count = 0;
    buildings.forEach(b => {
      try {
        // Dimensiunile clădirii (footprint pătrat aproximativ)
        const sideM = Math.sqrt(b.footprint); // m
        const heightM = b.height;             // m

        const geometry = new THREE.BoxGeometry(sideM, heightM, sideM);
        const material = new THREE.MeshPhongMaterial({
          color: b.color,
          opacity: 0.85,
          transparent: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData.pipelineBuilding = true;
        mesh.userData.buildingId = b.id;

        if (b.isGeo && window.TCI?._3D?._positionEntity) {
          // Coordonate WGS84 → sistemul TCI
          window.TCI._3D._positionEntity(
            mesh,
            b.center[0],   // lon
            b.center[1],   // lat
            heightM / 2,   // baseH (centrul cutiei)
            sideM,         // scaleX
            heightM,       // scaleY
            sideM          // scaleZ
          );
        } else {
          // Coordonate locale în metri
          const sM = window.TCI?._3D?._scale || 1e-6;
          mesh.position.set(
            b.center[0] * sM,
            heightM / 2 * sM,
            b.center[1] * sM
          );
          mesh.scale.set(sideM * sM, heightM * sM, sideM * sM);
        }

        scene.add(mesh);
        count++;
      } catch(e) {
        console.warn('[Massing] Render lot', b.id, ':', e.message);
      }
    });

    console.log('[Massing] ✅ Rendered', count, '/', buildings.length, 'clădiri în scenă');
    return count;
  },

  // ── Elimină toate clădirile pipeline din scenă ────────────────────────
  clear(scene3D) {
    const scene = scene3D || window.TCI?._3D?._scene;
    if (!scene) return;
    const toRemove = scene.children.filter(c => c.userData?.pipelineBuilding);
    toRemove.forEach(m => scene.remove(m));
    console.log('[Massing] Cleared', toRemove.length, 'mesh-uri pipeline');
  },

  // ── Culori per tipologie UDRE ─────────────────────────────────────────
  _colorForTipologie(tip) {
    const map = {
      'centru-mixt':           0x7c3aed,
      'rezidential-colectiv':  0x2563eb,
      'rezidential-colectiv-mare': 0x1d4ed8,
      'rezidential-colectiv-mediu': 0x3b82f6,
      'coridor-bulevardar':    0xd97706,
      'reconversie-industriala': 0xea580c,
      'reconversie':           0xea580c,
      'institutii-servicii':   0x0ea5e9,
      'institutii':            0x0ea5e9,
      'logistica':             0x78716c,
      'rezidential-periurban': 0x16a34a,
      'mixt-rezidential-comercial': 0xf59e0b,
    };
    return map[tip] || 0x60a5fa;
  },
};

console.log('[Massing-Render] ✅ v2.0 loaded — TCI._3D coordinate system + tipologie colors');
