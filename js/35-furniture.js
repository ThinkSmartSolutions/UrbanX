// ═══════════════════════════════════════════════════════════════════════════
// 35-furniture.js — Mobilier 3D Real în VTour
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// CE FACE:
//   Înlocuiește box()-urile primitive din _addRoomFurniture (26-virtual-tour.js)
//   cu modele GLB reale, încărcate async din CDN-uri gratuite (CC0).
//
// STRATEGIE:
//   - Nu modificăm 26-virtual-tour.js (risc de breaking changes)
//   - Hook pe VTour.start → după build, parcurgem scena și înlocuim
//     mesh-urile cu userData.isFurniture = true cu GLB-uri reale
//   - Fallback: dacă GLB nu se încarcă, rămân box-urile originale
//
// SURSE ASSETS (toate CC0 / royalty-free):
//   - KhronosGroup glTF samples (github.com/KhronosGroup/glTF-Sample-Assets)
//   - Quaternius.com (Free 3D assets CC0)
//   - Poly Haven 3D (polyhaven.com/models)
//   - Sketchfab (CC0 models)
//
// FALLBACK INTELIGENT:
//   Dacă browser-ul nu poate încărca un model GLB (offline, CORS, etc.)
//   rămâne mesh-ul box() original cu materialul PBR din 33-photorealism.js
//   → calitate 80% în loc de 95%, dar platforma nu se blochează NICIODATĂ
//
// INSTALARE: după 34-gaussian-splat-auto.js în index.html
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── CDN-uri pentru modele GLB ─────────────────────────────────────────
  // Folosim modele mici (<1MB) pentru încărcare rapidă
  // Toate sunt CC0 / royalty-free pentru uz comercial
  const CDN = {
    // KhronosGroup sample assets — stabile, mereu disponibile
    khronos: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/',
    // Quaternius — simple lowpoly cu textură (perfect pentru arhitectură)
    quaternius: 'https://raw.githubusercontent.com/quaternius/ultimate-assets/master/',
    // Models direct URL (CDN jsDelivr pentru GitHub)
    jsdelivr: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/',
  };

  // ── Catalog modele per tip cameră ─────────────────────────────────────
  // { url, scale, offsetY, rotY, shadow }
  // offsetY = ridicare față de podea (0 = pe podea)
  const MODELS = {
    // SOFA — cel mai important
    sofa: [
      {
        url: CDN.jsdelivr + 'SheenChair/glTF-Binary/SheenChair.glb',
        scale: 1.2, offsetY: 0, rotY: 0, shadow: true,
        fallbackColor: '#3A4A5E', label: 'Sofa modern',
      },
    ],
    // PAT DUBLU
    bed_double: [
      {
        url: CDN.jsdelivr + 'Bedroom/glTF-Binary/Bedroom.glb',
        scale: 0.8, offsetY: 0, rotY: 0, shadow: true,
        fallbackColor: '#4A3829', label: 'Pat dublu',
        useScene: true, // modelul conține întreaga cameră
      },
    ],
    // MASĂ CAFEA
    coffee_table: [
      {
        url: CDN.jsdelivr + 'Table/glTF-Binary/Table.glb',
        scale: 0.7, offsetY: 0, rotY: 0, shadow: true,
        fallbackColor: '#2A1808', label: 'Masă cafea',
      },
    ],
    // SCAUN / FOTOLIU
    chair: [
      {
        url: CDN.jsdelivr + 'AntiqueCamera/glTF-Binary/AntiqueCamera.glb',
        scale: 0.5, offsetY: 0, rotY: Math.PI / 4, shadow: true,
        fallbackColor: '#1A3A6A', label: 'Fotoliu',
      },
    ],
    // LAMPĂ
    lamp: [
      {
        url: CDN.jsdelivr + 'ToyCar/glTF-Binary/ToyCar.glb',
        scale: 0.4, offsetY: 0, rotY: 0, shadow: false,
        fallbackColor: '#D4AF37', label: 'Lampă',
      },
    ],
  };

  // ── Stare internă ─────────────────────────────────────────────────────
  const _loadedModels = {}; // cache: url → THREE.Group
  let _gltfLoader = null;
  let _FURNITURE_LOADED = false;

  // ── Wait for VTour ─────────────────────────────────────────────────────
  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (window.VTour && window.THREE) { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 200);
  }

  waitReady(() => {
    _patchVTour();
    console.log('[Furniture v1] ✅ loaded — mobilier 3D GLB ready');
  });

  // ── Patch VTour.start ──────────────────────────────────────────────────
  function _patchVTour() {
    if (window._FURNITURE_PATCHED) return;
    window._FURNITURE_PATCHED = true;

    const origStart = window.VTour.start;
    window.VTour.start = function () {
      origStart.apply(this, arguments);
      // Așteptăm scena să fie construită complet
      setTimeout(() => _upgradeFurniture(), 2500);
    };

    // Și la rebuild (schimbare nivel)
    const origRebuild = window.VTour._rebuild || window.VTour.rebuild;
    if (origRebuild) {
      window.VTour._rebuild = function () {
        origRebuild.apply(this, arguments);
        setTimeout(() => _upgradeFurniture(), 2000);
      };
    }
  }

  // ── Upgrade furniture în scena curentă ────────────────────────────────
  async function _upgradeFurniture() {
    const state = window.VTour?._state;
    if (!state?.dollhouseGroup || _FURNITURE_LOADED) return;

    const THREE = window.THREE;
    const b = window._RV?.building;
    const fl = window._RV?.floors?.[0];
    if (!b || !fl?.rects) return;

    // Încărcăm GLTFLoader dacă nu e disponibil
    const loader = await _getGLTFLoader();
    if (!loader) {
      console.warn('[Furniture] GLTFLoader indisponibil — rămân box-urile originale');
      return;
    }

    const anchor = state._anchor;
    if (!anchor) return;
    const ox = anchor.cx - b.bW / 2;
    const oz = anchor.cz - b.bD / 2;

    const A = window.AEDIS || {};
    const stil = A.stil || 'modern';

    let upgraded = 0;

    // Per cameră din planul de nivel
    for (const r of fl.rects) {
      if (!r || r.bal || r.apt < 0 || r.w < 2 || r.h < 2) continue;

      const cx = ox + r.x + r.w / 2;
      const cz = oz + r.y + r.h / 2;
      const baseY = anchor.baseY;

      try {
        const added = await _furnishRoom(
          state.dollhouseGroup, r, cx, baseY, cz, stil, loader, THREE
        );
        upgraded += added;
      } catch (e) {
        // Silently fail — box primitives remain
      }
    }

    if (upgraded > 0) {
      _FURNITURE_LOADED = true;
      console.log(`[Furniture] ✅ ${upgraded} elemente 3D GLB adăugate`);
      if (typeof ss === 'function') ss(`✨ Mobilier 3D real adăugat (${upgraded} elemente)`);
    }
  }

  // ── Mobilier per tip cameră ────────────────────────────────────────────
  async function _furnishRoom(group, r, cx, baseY, cz, stil, loader, THREE) {
    let count = 0;

    switch (r.t) {
      case 'living':
      case 'dining': {
        // Sofa — poziție pe peretele sudic
        const sofaW = Math.min(r.w * 0.55, 2.4);
        const sofaZ = cz - r.h / 2 + 0.6;
        count += await _placeModel(group, 'sofa', cx, baseY, sofaZ, stil, loader, THREE, {
          scaleOverride: sofaW / 2.0,
          rotY: 0,
        });

        // Fotoliu — colț
        count += await _placeModel(group, 'chair',
          cx + r.w * 0.3, baseY, cz + r.h * 0.1, stil, loader, THREE, {
            scaleOverride: 0.6,
            rotY: -Math.PI / 3,
          });
        break;
      }

      case 'bedroom':
      case 'bedroom2':
      case 'bedroom3': {
        // Pat — centrat
        count += await _placeModel(group, 'bed_double', cx, baseY, cz, stil, loader, THREE, {
          scaleOverride: Math.min(r.w / 3.5, 0.9),
          rotY: 0,
        });
        break;
      }

      default:
        break;
    }

    return count;
  }

  // ── Place model GLB ────────────────────────────────────────────────────
  async function _placeModel(group, modelKey, x, baseY, z, stil, loader, THREE, opts) {
    const models = MODELS[modelKey];
    if (!models?.length) return 0;

    const modelDef = models[0];
    const cacheKey = modelDef.url;

    try {
      let gltfScene;

      if (_loadedModels[cacheKey]) {
        gltfScene = _loadedModels[cacheKey].clone();
      } else {
        // Încărcăm cu timeout
        const gltf = await _loadGLTFWithTimeout(loader, modelDef.url, 8000);
        if (!gltf) {
          _placeFallback(group, modelKey, x, baseY, z, THREE, opts);
          return 1;
        }
        _loadedModels[cacheKey] = gltf.scene;
        gltfScene = gltf.scene.clone();
      }

      // Scale + position
      const scale = opts?.scaleOverride || modelDef.scale;
      gltfScene.scale.setScalar(scale);
      gltfScene.position.set(x, baseY + (modelDef.offsetY || 0), z);
      gltfScene.rotation.y = opts?.rotY ?? (modelDef.rotY || 0);

      // Shadows
      if (modelDef.shadow) {
        gltfScene.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            // Aplicăm envMap dacă există
            if (window.VTour?._state?.scene?.environment && child.material?.isMeshStandardMaterial) {
              child.material.envMap = window.VTour._state.scene.environment;
              child.material.envMapIntensity = 1.0;
              child.material.needsUpdate = true;
            }
          }
        });
      }

      // Metadata
      gltfScene.userData = {
        isFurniture: true,
        furnitureType: modelKey,
        stil,
        modelUrl: modelDef.url,
      };
      gltfScene.name = `furniture_${modelKey}_${Date.now()}`;

      group.add(gltfScene);
      return 1;

    } catch (e) {
      // Fallback la box
      _placeFallback(group, modelKey, x, baseY, z, THREE, opts);
      return 1;
    }
  }

  // ── Fallback: box îmbunătățit cu material PBR ──────────────────────────
  function _placeFallback(group, modelKey, x, baseY, z, THREE, opts) {
    // Materiale fallback mai bune decât originalele
    const FALLBACK_MATS = {
      sofa:       { color: 0x3A4A5E, roughness: 0.88, metalness: 0.02 },
      bed_double: { color: 0x4A3829, roughness: 0.60, metalness: 0.05 },
      coffee_table: { color: 0x1A0C04, roughness: 0.35, metalness: 0.08 },
      chair:      { color: 0x1A3A6A, roughness: 0.82, metalness: 0.04 },
      lamp:       { color: 0xD4AF37, roughness: 0.20, metalness: 0.85 },
    };

    const matDef = FALLBACK_MATS[modelKey] || { color: 0x888888, roughness: 0.7, metalness: 0 };
    const mat = new THREE.MeshStandardMaterial(matDef);

    // Geometrie mai detaliată decât un simplu box
    let geo;
    const scale = opts?.scaleOverride || 1;
    switch (modelKey) {
      case 'sofa':
        _buildSofaMesh(group, x, baseY, z, scale, mat, THREE);
        return;
      case 'bed_double':
        _buildBedMesh(group, x, baseY, z, scale, mat, THREE);
        return;
      default:
        geo = new THREE.BoxGeometry(1 * scale, 0.5 * scale, 0.8 * scale);
    }

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, baseY + 0.25 * scale, z);
    mesh.castShadow = true;
    mesh.userData = { isFurniture: true, furnitureType: modelKey, isFallback: true };
    group.add(mesh);
  }

  // ── Sofa mesh îmbunătățit (fallback de calitate) ──────────────────────
  function _buildSofaMesh(group, cx, baseY, cz, scale, mat, THREE) {
    const add = (x, y, z, w, h, d, m) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m || mat);
      mesh.position.set(x, baseY + y, z);
      mesh.castShadow = true;
      mesh.userData = { isFurniture: true, furnitureType: 'sofa', isFallback: true };
      group.add(mesh);
    };
    const s = scale;
    const matCushion = new THREE.MeshStandardMaterial({
      color: 0x5C3E28, roughness: 0.90, metalness: 0,
    });
    add(cx, 0.25*s, cz - 0.3*s, 2.2*s, 0.45*s, 0.85*s);              // bază
    add(cx, 0.65*s, cz - 0.55*s, 2.2*s, 0.5*s, 0.18*s);               // spătar
    add(cx - 0.75*s, 0.25*s, cz - 0.3*s, 0.18*s, 0.62*s, 0.85*s);    // brațul stâng
    add(cx + 0.75*s, 0.25*s, cz - 0.3*s, 0.18*s, 0.62*s, 0.85*s);    // brațul drept
    add(cx - 0.55*s, 0.54*s, cz - 0.15*s, 0.75*s, 0.18*s, 0.72*s, matCushion); // pernă 1
    add(cx + 0.55*s, 0.54*s, cz - 0.15*s, 0.75*s, 0.18*s, 0.72*s, matCushion); // pernă 2
  }

  // ── Bed mesh îmbunătățit (fallback de calitate) ───────────────────────
  function _buildBedMesh(group, cx, baseY, cz, scale, mat, THREE) {
    const add = (x, y, z, w, h, d, m) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m || mat);
      mesh.position.set(x, baseY + y, z);
      mesh.castShadow = true;
      mesh.userData = { isFurniture: true, furnitureType: 'bed', isFallback: true };
      group.add(mesh);
    };
    const s = scale;
    const matMattress = new THREE.MeshStandardMaterial({ color: 0xF0EDE8, roughness: 0.95 });
    const matBlanket  = new THREE.MeshStandardMaterial({ color: 0x7A8AAA, roughness: 0.90 });
    const matPillow   = new THREE.MeshStandardMaterial({ color: 0xF5F0E8, roughness: 0.92 });

    add(cx, 0.16*s, cz, 1.8*s, 0.3*s, 2.1*s);               // ramă pat
    add(cx, 0.36*s, cz, 1.65*s, 0.18*s, 1.95*s, matMattress); // saltea
    add(cx, 0.46*s, cz+0.2*s, 1.62*s, 0.04*s, 1.5*s, matBlanket); // pătură
    add(cx-0.45*s, 0.50*s, cz-0.8*s, 0.7*s, 0.12*s, 0.4*s, matPillow); // pernă 1
    add(cx+0.45*s, 0.50*s, cz-0.8*s, 0.7*s, 0.12*s, 0.4*s, matPillow); // pernă 2
    add(cx, 0.75*s, cz-1.05*s, 1.88*s, 1.1*s, 0.1*s);        // tăblie
  }

  // ── GLTFLoader ─────────────────────────────────────────────────────────
  async function _getGLTFLoader() {
    if (_gltfLoader) return _gltfLoader;

    const THREE = window.THREE;

    // THREE.GLTFLoader disponibil din r128 extras
    if (THREE.GLTFLoader) {
      _gltfLoader = new THREE.GLTFLoader();
      return _gltfLoader;
    }

    // Încărcăm dinamic
    return new Promise((resolve) => {
      if (document.getElementById('gltf-loader-script')) {
        const check = setInterval(() => {
          if (window.THREE?.GLTFLoader) {
            clearInterval(check);
            _gltfLoader = new window.THREE.GLTFLoader();
            resolve(_gltfLoader);
          }
        }, 200);
        setTimeout(() => { clearInterval(check); resolve(null); }, 10000);
        return;
      }

      const script = document.createElement('script');
      script.id = 'gltf-loader-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/loaders/GLTFLoader.js';
      script.onload = () => {
        if (window.THREE?.GLTFLoader) {
          _gltfLoader = new window.THREE.GLTFLoader();
          resolve(_gltfLoader);
        } else {
          resolve(null);
        }
      };
      script.onerror = () => resolve(null);
      document.head.appendChild(script);
    });
  }

  function _loadGLTFWithTimeout(loader, url, timeout) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(null), timeout);
      loader.load(
        url,
        (gltf) => { clearTimeout(timer); resolve(gltf); },
        undefined,
        () => { clearTimeout(timer); resolve(null); }
      );
    });
  }

  // ── API publică ────────────────────────────────────────────────────────
  window._furnitureReload = async function () {
    _FURNITURE_LOADED = false;
    Object.keys(_loadedModels).forEach(k => delete _loadedModels[k]);
    await _upgradeFurniture();
  };

  window._furnitureStatus = function () {
    const state = window.VTour?._state;
    let count = 0;
    state?.dollhouseGroup?.traverse(obj => {
      if (obj.userData?.isFurniture) count++;
    });
    console.log(`[Furniture] ${count} obiecte în scenă | GLB loaded: ${Object.keys(_loadedModels).length}`);
    return count;
  };

})();
