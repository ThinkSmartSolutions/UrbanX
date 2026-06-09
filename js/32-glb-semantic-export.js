// ═══════════════════════════════════════════════════════════════════════════
// 32-glb-semantic-export.js — Export GLB Semantic pentru BIM
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// CE FACE:
//   Exportă scena V3D (viewer3D AEDIS) ca fișier GLB cu userData semantic
//   pe fiecare mesh — astfel arhitectul importă în Blender/FreeCAD/Revit
//   și are geometria exactă din vizualizarea 3D, identificată BIM.
//
// PIPELINE:
//   V3D.scene (Three.js r128)
//     → tagăm fiecare mesh cu userData.ifcType, userData.floor,
//       userData.material, userData.storey, userData.function
//     → GLTFExporter (CDN r128) → GLB binar
//     → JSON metadata sidecar (mapare mesh → element BIM)
//     → ZIP cu GLB + JSON + IFC summary (JSZip CDN)
//
// CE PRIMEȘTE ARHITECTUL:
//   model_NrCad.glb          — geometrie 3D completă cu materiale PBR
//   model_NrCad_meta.json    — mapare mesh ID → {ifcType, material, floor, etc}
//   model_NrCad_summary.txt  — rezumat cantități (mp pereți, planșee, ferestre)
//
// IMPORT ÎN INSTRUMENTE:
//   Blender 3.x+:   File → Import → glTF 2.0 (.glb) → are userData în proprietăți
//   FreeCAD 0.20+:  File → Import → glTF → convertibil în IFC via BIM workbench
//   Revit 2024+:    Insert → Import CAD → glTF (via Autodesk plugin)
//   ArchiCAD 27+:   File → Interoperability → IFC → import după conversie
//   Speckle:        upload direct .glb → viewer colaborativ
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const GLTFE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/exporters/GLTFExporter.js';
  const JSZIP_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';

  // ── Mapare culoare mesh → tip IFC (din viewer3D) ──────────────────────────
  // Folosim culoarea + poziția Z pentru a deduce tipul elementului
  const IFC_BY_COLOR = {
    // Pereți exteriori per stil (din COLS_V)
    '#c8dff8': 'IfcWall',       // modern etaj
    '#0d2040': 'IfcWall',       // modern parter
    '#a0a8f0': 'IfcWall',       // inovator
    '#f0d8a0': 'IfcWall',       // clasic
    '#f4f8fc': 'IfcWall',       // minimalist
    '#c09870': 'IfcWall',       // industrial
    '#c8e0b8': 'IfcWall',       // adaptat_context
    // Acoperiș
    '#c8d0d8': 'IfcRoof',
    '#2a3a50': 'IfcRoof',
    '#7c3512': 'IfcRoof',
    // Ferestre
    '#4888b8': 'IfcWindow',
    '#3a80c8': 'IfcWindow',
    '#2040d0': 'IfcWindow',
    '#6878a0': 'IfcWindow',
    '#a0c8e0': 'IfcWindow',
    '#384858': 'IfcWindow',
    // Subsol
    'rgba(0.22,0.28,0.38)': 'IfcSpace', // subsol semi-transparent
  };

  // Materiale PBR → material BIM
  const BIM_MATERIAL = {
    roughness_high_dark:   'Beton aparent C25/30',
    roughness_high_light:  'BCA + EPS 15cm + tencuiala',
    roughness_low_glass:   'Vitraj triplu low-E',
    roughness_roof:        'Invelitoare acoperis',
    roughness_floor:       'Planșeu beton armat C25/30',
  };

  function waitReady(cb, n) {
    n = n || 0; if (n > 150) return;
    if (typeof _RV !== 'undefined' && typeof window.V3D !== 'undefined') { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 300);
  }

  waitReady(() => {
    _injectButton();
    console.log('[GLB-Semantic v1] ✅ loaded — export GLB cu userData IFC');
  });

  // ── Injectare buton ────────────────────────────────────────────────────────
  function _injectButton() {
    const _try = () => {
      const menu = document.getElementById('ux-export-menu');
      if (!menu || document.getElementById('glb-sem-item')) return false;

      // În dropdown export
      const grp = document.createElement('div');
      grp.style.cssText = 'font-size:8px;color:#4A6080;font-weight:700;padding:4px 10px 2px;text-transform:uppercase;letter-spacing:.4px';
      grp.textContent = 'GLB + Metadate BIM';
      menu.appendChild(grp);

      const btn = document.createElement('button');
      btn.id = 'glb-sem-exp-item'; btn.className = 'ux-exp-item';
      btn.innerHTML = '<span style="font-size:14px">📦</span>GLB Semantic (Blender / Revit / Speckle)';
      btn.title = 'Export GLB cu userData IFC pe fiecare mesh + JSON metadate + rezumat cantități';
      btn.onclick = () => { menu.classList.remove('open'); window._rvExportGLBSemantic(); };
      menu.appendChild(btn);

      // Buton și în toolbar 3D viewer direct
      const topbar = document.getElementById('v3d-topbar');
      if (topbar && !document.getElementById('glb-sem-v3d-btn')) {
        const tbBtn = document.createElement('button');
        tbBtn.id = 'glb-sem-v3d-btn';
        tbBtn.innerHTML = '📦 GLB+BIM';
        tbBtn.title = 'Export GLB semantic — Blender, Revit, FreeCAD, Speckle';
        tbBtn.style.cssText = [
          'background:linear-gradient(135deg,rgba(99,102,241,.18),rgba(168,85,247,.12))',
          'color:#818CF8', 'border:1.5px solid rgba(99,102,241,.45)',
          'border-radius:8px', 'padding:5px 13px', 'font-size:11px', 'font-weight:700',
          'cursor:pointer', 'flex-shrink:0', 'min-height:34px', 'letter-spacing:.3px',
          'white-space:nowrap', 'font-family:inherit'
        ].join(';');
        tbBtn.onclick = () => window._rvExportGLBSemantic();
        topbar.appendChild(tbBtn);
      }
      return true;
    };
    if (_try()) return;
    const obs = setInterval(() => { if (_try()) clearInterval(obs); }, 1000);
    setTimeout(() => clearInterval(obs), 20000);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // MAIN — tagare semantică + export
  // ═══════════════════════════════════════════════════════════════════════

  window._rvExportGLBSemantic = async function () {
    const b = window._RV?.building;
    const P = window._RV?.parcelParams;

    if (!window.V3D?.scene && !b) {
      alert('Deschideți Viewer 3D mai întâi (click pe parcelă → butonul 3D).'); return;
    }
    if (typeof ss === 'function') ss('⏳ Tagare semantică meshuri + export GLB…');

    try {
      // ── 1. Tagare semantică a scenei ────────────────────────────────────
      const meta = _tagSceneSemantic();

      // ── 2. Load GLTFExporter ────────────────────────────────────────────
      await _loadGLTFExporter();

      // ── 3. Export GLB ───────────────────────────────────────────────────
      const glbBlob = await _exportGLB();

      // ── 4. JSON metadata sidecar ───────────────────────────────────────
      const metaJSON = JSON.stringify(meta, null, 2);
      const metaBlob = new Blob([metaJSON], { type: 'application/json' });

      // ── 5. Summary TXT ─────────────────────────────────────────────────
      const summary = _buildSummary(meta, b, P);
      const summaryBlob = new Blob([summary], { type: 'text/plain' });

      // ── 6. ZIP sau download individual ─────────────────────────────────
      const nrCad = P?.nrCad || 'urbanx';
      const ts = new Date().toISOString().slice(0, 10);

      const hasZip = await _loadJSZip();
      if (hasZip && window.JSZip) {
        const zip = new window.JSZip();
        zip.file(`urbanx_model_${nrCad}.glb`, glbBlob);
        zip.file(`urbanx_model_${nrCad}_meta.json`, metaBlob);
        zip.file(`urbanx_model_${nrCad}_summary.txt`, summaryBlob);
        zip.file('README.txt', _buildReadme(nrCad));

        const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
        _download(zipBlob, `urbanx_bim_${nrCad}_${ts}.zip`, 'application/zip');
        if (typeof ss === 'function') ss(`✅ ZIP exportat: GLB + JSON metadata + rezumat cantități`);
      } else {
        // Fără JSZip — descarcă individual
        _download(glbBlob, `urbanx_model_${nrCad}.glb`, 'model/gltf-binary');
        await new Promise(r => setTimeout(r, 500));
        _download(metaBlob, `urbanx_model_${nrCad}_meta.json`, 'application/json');
        await new Promise(r => setTimeout(r, 500));
        _download(summaryBlob, `urbanx_model_${nrCad}_summary.txt`, 'text/plain');
        if (typeof ss === 'function') ss(`✅ GLB + JSON + TXT exportate (3 fișiere separate)`);
      }

    } catch (e) {
      console.error('[GLB-Semantic]', e);
      if (typeof ss === 'function') ss('⚠ Eroare export GLB: ' + e.message);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // TAGARE SEMANTICĂ — adaugă userData IFC pe fiecare mesh
  // ═══════════════════════════════════════════════════════════════════════

  function _tagSceneSemantic() {
    const scene = window.V3D?.scene;
    const b = window._RV?.building;
    const P = window._RV?.parcelParams;
    const A = window.AEDIS || {};
    const _AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
    const fl0 = window._RV?.floors?.[0];

    const metadata = {
      generator: 'UrbanX TSS·FG v1.0',
      date: new Date().toISOString(),
      project: {
        nrCad: P?.nrCad || '—',
        utr: P?.utr || '—',
        fn: _AC.fnLabel || A.fn || '—',
        stil: _AC.stilLabel || A.stil || '—',
        niv: b?.niv || 0,
        bW: b?.bW || 0,
        bD: b?.bD || 0,
        SC: (b?.scArea || 0).toFixed(1),
        SDA: (b?.sdaTotal || 0).toFixed(1),
      },
      elements: [],
      stats: { walls: 0, slabs: 0, windows: 0, roof: 0, other: 0 },
    };

    if (!scene) return metadata;

    // Bbox clădire pentru deducere floor index
    const hNiv = P?.hn || 3.0;
    const totalH = (b?.niv || 1) * hNiv;

    let meshIdx = 0;
    scene.traverse(obj => {
      if (!obj.isMesh && !obj.isGroup) return;

      // Deducem tipul IFC din poziție + culoare + bbox
      const semantic = _deduceSemantic(obj, b, P, hNiv, totalH, A, fl0);
      if (!semantic) return;

      // Setăm userData pe mesh
      obj.userData = obj.userData || {};
      obj.userData.ifcType     = semantic.ifcType;
      obj.userData.ifcGUID     = _generateGUID();
      obj.userData.storey      = semantic.storey;
      obj.userData.floor       = semantic.floor;
      obj.userData.material    = semantic.material;
      obj.userData.function    = semantic.function || _AC.fn || 'rezidential_colectiv';
      obj.userData.stil        = A.stil || 'modern';
      obj.userData.nrCad       = P?.nrCad || '—';
      obj.userData.isExternal  = semantic.isExternal;
      obj.userData.description = semantic.description;
      obj.userData.meshIndex   = meshIdx;

      // Dacă e grup, propagăm și pe copii
      if (obj.isGroup) {
        obj.children.forEach((child, ci) => {
          if (!child.isMesh) return;
          child.userData = { ...obj.userData, meshIndex: meshIdx + '_' + ci };
        });
      }

      // Adăugăm în metadata
      const bbox = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3();
      bbox.getSize(size);

      metadata.elements.push({
        meshIndex: meshIdx,
        name: obj.name || semantic.ifcType + '_' + meshIdx,
        ifcType: semantic.ifcType,
        ifcGUID: obj.userData.ifcGUID,
        storey: semantic.storey,
        floor: semantic.floor,
        material: semantic.material,
        isExternal: semantic.isExternal,
        description: semantic.description,
        bbox: {
          min: { x: +bbox.min.x.toFixed(3), y: +bbox.min.y.toFixed(3), z: +bbox.min.z.toFixed(3) },
          max: { x: +bbox.max.x.toFixed(3), y: +bbox.max.y.toFixed(3), z: +bbox.max.z.toFixed(3) },
        },
        size: {
          x: +size.x.toFixed(3),
          y: +size.y.toFixed(3),
          z: +size.z.toFixed(3),
        },
        volume_m3: +(size.x * size.y * size.z).toFixed(3),
        area_m2:   +(size.x * size.z).toFixed(3),
      });

      // Stats
      if (semantic.ifcType === 'IfcWall')   metadata.stats.walls++;
      else if (semantic.ifcType === 'IfcSlab')   metadata.stats.slabs++;
      else if (semantic.ifcType === 'IfcWindow') metadata.stats.windows++;
      else if (semantic.ifcType === 'IfcRoof')   metadata.stats.roof++;
      else metadata.stats.other++;

      meshIdx++;
    });

    return metadata;
  }

  function _deduceSemantic(obj, b, P, hNiv, totalH, A, fl0) {
    if (!obj || (!obj.isMesh && !obj.isGroup)) return null;

    const pos = obj.position;
    const bbox = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3(); bbox.getSize(size);

    // Floor index din înălțimea Y
    const floorIdx = Math.max(0, Math.min(
      (b?.niv || 1) - 1,
      Math.round(bbox.min.y / (hNiv || 3))
    ));
    const storeyLabel = floorIdx === 0 ? 'Parter' : 'Etaj_' + floorIdx;

    // Acoperiș — y > 90% din înălțimea totală sau dimensiuni plate
    if (bbox.min.y >= totalH * 0.85 || (size.y < 0.4 && bbox.min.y >= totalH * 0.7)) {
      return {
        ifcType: 'IfcRoof',
        storey: 'Acoperis',
        floor: b?.niv || 0,
        material: 'Invelitoare acoperiș — ' + (_AC?.acoperisLabel || A.tipAcoperis || 'Terasă'),
        isExternal: true,
        description: 'Acoperiș — ' + (_AC?.acoperisLabel || A.tipAcoperis || 'Terasă plată'),
      };
    }

    // Slab/planșeu — plat pe Y (înălțime mică), acoperă toată lățimea
    if (size.y < 0.35 && size.x > (b?.bW || 10) * 0.5) {
      return {
        ifcType: 'IfcSlab',
        storey: storeyLabel,
        floor: floorIdx,
        material: 'Planșeu BA C25/30 22cm',
        isExternal: false,
        description: 'Planșeu beton armat — ' + storeyLabel,
      };
    }

    // Ferestre — dimensiuni mici, material cu roughness scăzut (sticla)
    const mat = obj.material || obj.children?.[0]?.material;
    const isGlass = mat && (
      (mat.roughness !== undefined && mat.roughness < 0.25) ||
      (mat.transparent && mat.opacity < 0.9) ||
      (mat.color && _colorToHex(mat.color).match(/#[3-6][5-9a-f][89a-f]/i))
    );
    if (isGlass && size.x < 3 && size.z < 3) {
      return {
        ifcType: 'IfcWindow',
        storey: storeyLabel,
        floor: floorIdx,
        material: 'Tâmplărie PVC 5 camere triplu vitrat low-E',
        isExternal: true,
        description: 'Fereastră — ' + storeyLabel + ' — ' + (size.x || size.z).toFixed(1) + '×' + size.y.toFixed(1) + 'm',
      };
    }

    // Subsol — y < 0
    if (bbox.max.y <= 0.1 && size.y > 1) {
      return {
        ifcType: 'IfcSpace',
        storey: 'Subsol_S1',
        floor: -1,
        material: 'Beton C30/37 impermeabilizat',
        isExternal: false,
        description: 'Subsol parcare S-1',
      };
    }

    // Pereți — înalt, lat, nu e acoperis
    if (size.y > hNiv * 0.5) {
      const isExt = (
        bbox.min.x < -(b?.bW || 10) * 0.02 ||
        bbox.max.x > (b?.bW || 10) * 1.02 ||
        bbox.min.z < -(b?.bD || 10) * 0.02 ||
        bbox.max.z > (b?.bD || 10) * 1.02
      );
      return {
        ifcType: 'IfcWall',
        storey: storeyLabel,
        floor: floorIdx,
        material: isExt
          ? 'Perete exterior BCA25cm + EPS15cm + tencuiala (R=5.73 m²K/W)'
          : 'Perete interior BCA10cm / GKF 10cm',
        isExternal: isExt,
        description: (isExt ? 'Perete exterior' : 'Perete interior') + ' — ' + storeyLabel,
      };
    }

    // Generic
    return {
      ifcType: 'IfcBuildingElement',
      storey: storeyLabel,
      floor: floorIdx,
      material: 'Necunoscut',
      isExternal: false,
      description: 'Element constructiv — ' + storeyLabel,
    };
  }

  function _colorToHex(color) {
    if (!color) return '#000000';
    if (typeof color.getHexString === 'function') return '#' + color.getHexString();
    return '#000000';
  }

  function _generateGUID() {
    const c = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$';
    let g = '';
    for (let i = 0; i < 22; i++) g += c[Math.floor(Math.random() * 64)];
    return g;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // EXPORT GLB
  // ═══════════════════════════════════════════════════════════════════════

  function _exportGLB() {
    return new Promise((resolve, reject) => {
      const scene = window.V3D?.scene;
      if (!scene) {
        reject(new Error('V3D.scene indisponibil'));
        return;
      }

      const GLTFE = window.THREE?.GLTFExporter;
      if (!GLTFE) {
        reject(new Error('GLTFExporter indisponibil'));
        return;
      }

      // Clonăm scena pentru export (să nu modificăm originala)
      const exportScene = new THREE.Scene();
      exportScene.name = 'UrbanX_BIM_Export';

      scene.traverse(obj => {
        if (!obj.isMesh) return;
        if (obj.userData?.nightLight) return; // skip lumini speciale
        // Include doar mesh-urile cu userData IFC
        if (obj.userData?.ifcType) {
          try {
            const cloned = obj.clone();
            cloned.name = obj.userData.ifcType + '_' + (obj.userData.floor || 0) + '_' + (obj.userData.meshIndex || 0);
            exportScene.add(cloned);
          } catch (e) {}
        }
      });

      const exporter = new GLTFE();
      exporter.parse(
        exportScene,
        (glb) => {
          resolve(new Blob([glb], { type: 'model/gltf-binary' }));
        },
        {
          binary: true,
          maxTextureSize: 2048,
          embedImages: true,
          animations: [],
        }
      );
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SUMMARY TEXT
  // ═══════════════════════════════════════════════════════════════════════

  function _buildSummary(meta, b, P) {
    const A = window.AEDIS || {};
    const _AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
    const lines = [];

    lines.push('═══════════════════════════════════════════════════════');
    lines.push('  URBANX — REZUMAT CANTITĂȚI BIM');
    lines.push('  Generat: ' + new Date().toLocaleDateString('ro-RO'));
    lines.push('═══════════════════════════════════════════════════════');
    lines.push('');
    lines.push('PROIECT');
    lines.push('  Nr. cadastral:     ' + (P?.nrCad || '—'));
    lines.push('  UTR / Zonă:        ' + (P?.utr || '—'));
    lines.push('  Funcțiune:         ' + (_AC.fnLabel || A.fn || '—'));
    lines.push('  Stil arhitectural: ' + (_AC.stilLabel || A.stil || '—'));
    lines.push('  Tip acoperiș:      ' + (_AC.acoperisLabel || A.tipAcoperis || '—'));
    lines.push('  Nr. niveluri:      ' + (b?.niv || '—'));
    lines.push('  Dimensiuni:        ' + (b?.bW?.toFixed(2) || '—') + 'm × ' + (b?.bD?.toFixed(2) || '—') + 'm');
    lines.push('');
    lines.push('SUPRAFEȚE');
    lines.push('  SC amprentă:       ' + (b?.scArea?.toFixed(1) || '—') + ' m²');
    lines.push('  SDA total:         ' + (b?.sdaTotal?.toFixed(1) || '—') + ' m²');
    lines.push('  POT realizat:      ' + (b && P ? (b.scArea / P.area * 100).toFixed(1) : '—') + '%');
    lines.push('  CUT realizat:      ' + (b && P ? (b.sdaTotal / P.area).toFixed(2) : '—'));
    lines.push('');
    lines.push('ELEMENTE BIM (din tagare semantică)');
    lines.push('  Pereți (IfcWall):          ' + meta.stats.walls);
    lines.push('  Planșee (IfcSlab):         ' + meta.stats.slabs);
    lines.push('  Ferestre (IfcWindow):      ' + meta.stats.windows);
    lines.push('  Acoperiș (IfcRoof):        ' + meta.stats.roof);
    lines.push('  Alte elemente:             ' + meta.stats.other);
    lines.push('  TOTAL meshuri tagiate:     ' + meta.elements.length);
    lines.push('');

    // Cantități estimate per tip
    const walls   = meta.elements.filter(e => e.ifcType === 'IfcWall');
    const extWalls = walls.filter(e => e.isExternal);
    const intWalls = walls.filter(e => !e.isExternal);
    const slabs   = meta.elements.filter(e => e.ifcType === 'IfcSlab');
    const wins    = meta.elements.filter(e => e.ifcType === 'IfcWindow');

    const totalExtArea = extWalls.reduce((s, e) => s + (e.size.x * e.size.y + e.size.z * e.size.y), 0);
    const totalIntArea = intWalls.reduce((s, e) => s + (e.size.x * e.size.y + e.size.z * e.size.y), 0);
    const totalSlabArea = slabs.reduce((s, e) => s + e.area_m2, 0);
    const totalWinArea  = wins.reduce((s, e) => s + (e.size.x * e.size.y + e.size.z * e.size.y), 0);

    lines.push('CANTITĂȚI ESTIMATE (din bbox meshuri)');
    lines.push('  Pereți exteriori:          ~' + totalExtArea.toFixed(0) + ' m²');
    lines.push('  Pereți interiori:          ~' + totalIntArea.toFixed(0) + ' m²');
    lines.push('  Planșee BA:                ~' + totalSlabArea.toFixed(0) + ' m²');
    lines.push('  Tâmplărie ferestre:        ~' + totalWinArea.toFixed(0) + ' m²');
    lines.push('');
    lines.push('ALCĂTUIRI PRINCIPALE');
    lines.push('  Perete exterior:   Tencuiala ext.2cm + EPS15cm + BCA25cm + Tencuiala int.1.5cm');
    lines.push('                     R=5.73 m²K/W  U=0.17 W/m²K  (NZEB conform GT019/2019)');
    lines.push('  Perete interior:   Tencuiala 1.5cm + GKF/BCA 10cm + Tencuiala 1.5cm');
    lines.push('  Planșeu BA:        Planșeu C25/30 22cm + izolatie fonică 10cm + sapă 5cm');
    lines.push('  Ferestre:          PVC 5 camere, geam triplu low-E 4/16/4/16/4mm, Uw≤1.3W/m²K');
    lines.push('');
    lines.push('IMPORT ÎN INSTRUMENTE BIM');
    lines.push('  Blender 3.x+:    File → Import → glTF 2.0 (.glb)');
    lines.push('                   userData.ifcType accesibil în Properties → Object Properties');
    lines.push('  FreeCAD 0.20+:   File → Import → glTF → BIM Workbench → Convert to IFC');
    lines.push('  Revit 2024+:     Insert → Import CAD → .glb (via Autodesk glTF plugin)');
    lines.push('  Speckle:         speckle.systems → upload .glb → viewer colaborativ cu metadate');
    lines.push('  Navisworks:      Append .glb → Clash Detection cu IFC din 31-ifc-bim-structural');
    lines.push('');
    lines.push('NOTĂ: Document orientativ pre-proiectare. Verificat de arhitect autorizat OAR');
    lines.push('      înainte de elaborarea proiectului tehnic (Legea 10/1995).');
    lines.push('');
    lines.push('UrbanX TSS·FG · ' + new Date().toISOString().slice(0, 10));

    return lines.join('\n');
  }

  function _buildReadme(nrCad) {
    return `URBANX BIM EXPORT — ${nrCad}
Generated: ${new Date().toLocaleDateString('ro-RO')}

FIȘIERE INCLUSE:
  urbanx_model_${nrCad}.glb         — Model 3D cu materiale PBR + userData IFC semantic
  urbanx_model_${nrCad}_meta.json   — Mapare mesh ID → {ifcType, material, floor, bbox}
  urbanx_model_${nrCad}_summary.txt — Rezumat cantități + alcătuiri + ghid import

WORKFLOW RECOMANDAT PENTRU ARHITECT:
  1. Deschide .glb în Blender → verifică geometria și tagurile IFC
  2. Exportă din Blender ca IFC via BlenderBIM (addon gratuit: blenderbim.org)
  3. Completează în ArchiCAD/Revit: armare structurală, instalații, detalii
  4. Combină cu IFC structural din UrbanX (31-ifc-bim-structural) în BIMcollab/Navisworks

userData DISPONIBIL PE FIECARE MESH:
  ifcType      — IfcWall / IfcSlab / IfcWindow / IfcRoof / IfcSpace etc.
  ifcGUID      — GUID unic per element (format IFC)
  storey       — Parter / Etaj_1 / Etaj_2 / Acoperis
  floor        — Index numeric nivel (0 = parter)
  material     — Descriere alcătuire (ex: "Perete exterior BCA25cm + EPS15cm")
  isExternal   — true/false
  function     — funcțiunea clădirii (din AEDIS)
  stil         — stilul arhitectural (din AEDIS)
  nrCad        — număr cadastral parcela

Document orientativ — UrbanX TSS·FG`;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // LOADERS
  // ═══════════════════════════════════════════════════════════════════════

  function _loadGLTFExporter() {
    return new Promise((resolve) => {
      if (window.THREE?.GLTFExporter) { resolve(); return; }
      if (document.getElementById('gltfe-script')) {
        const check = setInterval(() => {
          if (window.THREE?.GLTFExporter) { clearInterval(check); resolve(); }
        }, 100);
        setTimeout(() => { clearInterval(check); resolve(); }, 8000);
        return;
      }
      const s = document.createElement('script');
      s.id = 'gltfe-script';
      s.src = GLTFE_CDN;
      s.onload = () => { setTimeout(resolve, 200); };
      s.onerror = () => { console.warn('[GLB] GLTFExporter CDN failed'); resolve(); };
      document.head.appendChild(s);
    });
  }

  function _loadJSZip() {
    return new Promise((resolve) => {
      if (window.JSZip) { resolve(true); return; }
      const s = document.createElement('script');
      s.src = JSZIP_CDN;
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
  }

  function _download(blob, filename, type) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  }

})();
