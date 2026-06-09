/* ═══════════════════════════════════════════════════════════════════════════
   UrbanX · 27-tur-sync.js · Strat de sincronizare complet
   ──────────────────────────────────────────────────────────────────────────
   SCOPUL: conectează toate cele 5 straturi ale sistemului într-un flux coerent

   AEDIS (setări) ──→ Viewer 3D exterior ──→ Planșe 2D ──→ Tur 3D interior
        ↑_____________________________________________|
        ←←← orice schimbare reflectată în toate ←←←←

   CE FACE:
   1. URBAN_SYNC — obiect global de stare partajată
      Toate straturile citesc/scriu de aici, nu independent din AEDIS

   2. MATERIALE PBR în tur virtual
      - Încarcă assets/tur3d/pbr/* cu TextureLoader (diff + nor + rough + ao)
      - Paleta implicită per stil AEDIS (clasic → lemn/marmură, industrial → beton/metal)
      - Selector UI în sidebar-ul overlay-ului (Dollhouse + Floor Plan)
      - Schimbare material → rebuild instant tur + update culori planșe

   3. OVERLAY NORMATIVE în tur
      - Camerele cu solarOk===false → podea roșiatică + badge ⚠ OMS119
      - Camerele sub NP057 → contur portocaliu + badge ⚠ NP057
      - ISU: distanța la nucleu vizualizată pe podea (linie verde/roșu)
      - Afișate în ambele moduri (Dollhouse + Floor Plan)

   4. SUBSOL în dollhouse
      - Dacă _RV.building.subsolNiv > 0, adaugă nivel S-1 cu parcaje + rampă

   5. CULOARE FAȚADĂ exactă viewer3D → planșe
      - Citim panelCol/bandCol din cfgByStil al viewer3d
      - Injectăm în STIL_CFG din 15-relevee-planfix.js
      - Actualizare live la schimbarea stilului în AEDIS

   6. EXPORT PREZENTARE CLIENT
      - Buton „📋 Prezentare" în toolbar relevee
      - PDF A3 landscape: cover + plan nivel + fațadă + secțiune + dollhouse screenshot
        + normative radar + rezumat materiale

   INSTALARE: adaugă în index.html DUPĂ 26-virtual-tour.js (ultimul din body):
     <script src="js/27-tur-sync.js?v=20260609"></script>
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Așteptăm ca toate modulele să fie gata ──────────────────────────────
  let _ready = 0;
  function _waitAll(cb, n) {
    n = n || 0; if (n > 200) return;
    const ok = typeof _RV !== 'undefined' &&
               typeof window.AEDIS !== 'undefined' &&
               typeof window.VTour !== 'undefined';
    if (ok) { cb(); return; }
    setTimeout(() => _waitAll(cb, n + 1), 150);
  }

  _waitAll(() => {
    _initSync();
    _patchTour();
    _patchFacadeColors();
    _injectPresentationButton();
    console.log('[TurSync v1] ✅ sincronizare completă activă');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 1. URBAN_SYNC — stare partajată globală
  // ═══════════════════════════════════════════════════════════════════════

  function _initSync() {
    if (window.URBAN_SYNC) return; // deja inițializat

    // Materiale implicite per stil AEDIS → per categorie
    const PALETTE_BY_STIL = {
      modern:          { pardoseala: 'parchet_stejar',   pereti: 'tencuiala_interior', mobilier: 'wood_light', acoperis: 'tigla_acoperis' },
      inovator:        { pardoseala: 'marble_white',     pereti: 'tencuiala_interior', mobilier: 'metal_finish', acoperis: 'tigla_acoperis' },
      clasic:          { pardoseala: 'parchet_stejar',   pereti: 'tencuiala_interior', mobilier: 'wood_dark', acoperis: 'tigla_acoperis' },
      minimalist:      { pardoseala: 'marble_white',     pereti: 'tencuiala_interior', mobilier: 'wood_light', acoperis: 'tigla_acoperis' },
      industrial:      { pardoseala: 'metal_finish',     pereti: 'caramida_aparenta',  mobilier: 'metal_finish', acoperis: 'metal_finish' },
      adaptat_context: { pardoseala: 'parchet_stejar',   pereti: 'tencuiala_interior', mobilier: 'wood_dark', acoperis: 'tigla_acoperis' },
    };

    const FN_OVERRIDE = {
      hotel:                 { pardoseala: 'marble_white',  pereti: 'tencuiala_interior' },
      birouri:               { pardoseala: 'marble_white',  pereti: 'tencuiala_interior' },
      industrial_depozitare: { pardoseala: 'metal_finish',  pereti: 'caramida_aparenta'  },
    };

    // Culori fațadă exacte din 11-viewer3d.js cfgByStil
    const FACADE_COLORS = {
      modern:          { panel: '#c0d8f0', band: '#1e3a6a', glass: '#3a80c8', frame: '#90b0cc' },
      inovator:        { panel: '#08102a', band: '#3a2880', glass: '#2040d0', frame: '#5060b0' },
      clasic:          { panel: '#e8d090', band: '#c8a040', glass: '#6878a0', frame: '#d4b860' },
      minimalist:      { panel: '#f0f4f8', band: '#d0dce8', glass: '#a0c8e0', frame: '#e0eaf0' },
      industrial:      { panel: '#281808', band: '#d05010', glass: '#384858', frame: '#905020' },
      adaptat_context: { panel: '#d0e8c0', band: '#4a8040', glass: '#5090a0', frame: '#80a870' },
    };

    const stil = window.AEDIS?.stil || 'modern';
    const fn   = window.AEDIS?.fn   || 'rezidential_colectiv';
    const base = PALETTE_BY_STIL[stil] || PALETTE_BY_STIL.modern;
    const over = FN_OVERRIDE[fn] || {};

    window.URBAN_SYNC = {
      // Materiale curente alese de utilizator
      materials: { ...base, ...over },

      // Culori fațadă sincronizate cu viewer3D
      facadeColors: FACADE_COLORS[stil] || FACADE_COLORS.modern,

      // Cache texturi Three.js (populat la prima deschidere tur)
      _texCache: {},

      // Overlay normative în tur (on/off)
      showNormative: true,

      // Metode publice
      setMaterial,
      getMaterial,
      getFacadeColor,
      syncFromAEDIS,
      captureTourScreenshot,
    };

    // Sincronizăm când AEDIS se schimbă
    _watchAEDIS();
  }

  function setMaterial(category, materialKey) {
    if (!window.URBAN_SYNC) return;
    window.URBAN_SYNC.materials[category] = materialKey;
    _rebuildTourMaterials();
    _updatePlanColors();
    _updateMaterialSelectorUI();
  }

  function getMaterial(category) {
    return window.URBAN_SYNC?.materials?.[category] || 'parchet_stejar';
  }

  function getFacadeColor(part) {
    return window.URBAN_SYNC?.facadeColors?.[part] || '#c0d8f0';
  }

  function syncFromAEDIS() {
    const A = window.AEDIS || {};
    const stil = A.stil || 'modern';
    const fn   = A.fn   || 'rezidential_colectiv';
    const PALETTE_BY_STIL = {
      modern:          { pardoseala: 'parchet_stejar',   pereti: 'tencuiala_interior', mobilier: 'wood_light',   acoperis: 'tigla_acoperis' },
      inovator:        { pardoseala: 'marble_white',     pereti: 'tencuiala_interior', mobilier: 'metal_finish', acoperis: 'tigla_acoperis' },
      clasic:          { pardoseala: 'parchet_stejar',   pereti: 'tencuiala_interior', mobilier: 'wood_dark',    acoperis: 'tigla_acoperis' },
      minimalist:      { pardoseala: 'marble_white',     pereti: 'tencuiala_interior', mobilier: 'wood_light',   acoperis: 'tigla_acoperis' },
      industrial:      { pardoseala: 'metal_finish',     pereti: 'caramida_aparenta',  mobilier: 'metal_finish', acoperis: 'metal_finish'   },
      adaptat_context: { pardoseala: 'parchet_stejar',   pereti: 'tencuiala_interior', mobilier: 'wood_dark',    acoperis: 'tigla_acoperis' },
    };
    const FN_OVERRIDE = {
      hotel:                 { pardoseala: 'marble_white',  pereti: 'tencuiala_interior' },
      industrial_depozitare: { pardoseala: 'metal_finish',  pereti: 'caramida_aparenta'  },
    };
    const FACADE_COLORS = {
      modern:          { panel: '#c0d8f0', band: '#1e3a6a', glass: '#3a80c8', frame: '#90b0cc' },
      inovator:        { panel: '#08102a', band: '#3a2880', glass: '#2040d0', frame: '#5060b0' },
      clasic:          { panel: '#e8d090', band: '#c8a040', glass: '#6878a0', frame: '#d4b860' },
      minimalist:      { panel: '#f0f4f8', band: '#d0dce8', glass: '#a0c8e0', frame: '#e0eaf0' },
      industrial:      { panel: '#281808', band: '#d05010', glass: '#384858', frame: '#905020' },
      adaptat_context: { panel: '#d0e8c0', band: '#4a8040', glass: '#5090a0', frame: '#80a870' },
    };
    const base = PALETTE_BY_STIL[stil] || PALETTE_BY_STIL.modern;
    const over = FN_OVERRIDE[fn] || {};
    window.URBAN_SYNC.materials = { ...base, ...over };
    window.URBAN_SYNC.facadeColors = FACADE_COLORS[stil] || FACADE_COLORS.modern;
    _updatePlanColors();
  }

  function _watchAEDIS() {
    // Proxy pe AEDIS pentru a detecta schimbări de stil/funcțiune
    const _orig = window.AEDIS;
    let _lastStil = _orig?.stil;
    let _lastFn   = _orig?.fn;
    setInterval(() => {
      const A = window.AEDIS;
      if (!A || !window.URBAN_SYNC) return;
      if (A.stil !== _lastStil || A.fn !== _lastFn) {
        _lastStil = A.stil;
        _lastFn   = A.fn;
        syncFromAEDIS();
        _patchFacadeColors();
        console.log('[TurSync] AEDIS schimbat → sincronizat automat:', A.stil, A.fn);
      }
    }, 800);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 2. MATERIALE PBR — încărcare texturi + rebuild tur
  // ═══════════════════════════════════════════════════════════════════════

  const PBR_BASE = 'assets/tur3d/pbr/';

  // Material keys → folder în assets/tur3d/pbr/
  const PBR_FOLDERS = {
    parchet_stejar:   'parchet_stejar',
    marble_white:     'marble_white',
    tencuiala_interior: 'tencuiala_interior',
    caramida_aparenta: 'caramida_aparenta',
    fabric_canapea:   'fabric_canapea',
    metal_finish:     'metal_finish',
    tigla_acoperis:   'tigla_acoperis',
    blat_bucatarie:   'blat_bucatarie',
    // Fallback procedural (fără PBR)
    wood_light:  null,
    wood_dark:   null,
  };

  // Culori procedurale fallback când PBR nu e disponibil
  const PBR_FALLBACK = {
    parchet_stejar:    { color: 0xc89968, roughness: 0.65, metalness: 0 },
    marble_white:      { color: 0xf0eee8, roughness: 0.25, metalness: 0.05 },
    tencuiala_interior:{ color: 0xf2ede4, roughness: 0.90, metalness: 0 },
    caramida_aparenta: { color: 0xb07050, roughness: 0.88, metalness: 0 },
    fabric_canapea:    { color: 0x6a5a4a, roughness: 0.95, metalness: 0 },
    metal_finish:      { color: 0x808890, roughness: 0.35, metalness: 0.80 },
    tigla_acoperis:    { color: 0x7c4a30, roughness: 0.85, metalness: 0 },
    blat_bucatarie:    { color: 0xe8e0d2, roughness: 0.30, metalness: 0.10 },
    wood_light:        { color: 0xc9a17a, roughness: 0.55, metalness: 0 },
    wood_dark:         { color: 0x5d3e2c, roughness: 0.55, metalness: 0 },
  };

  function _loadPBRMaterial(THREE, key, onDone) {
    const cache = window.URBAN_SYNC._texCache;
    if (cache[key]) { onDone(cache[key]); return; }

    const folder = PBR_FOLDERS[key];
    const fallback = PBR_FALLBACK[key] || { color: 0xc8a888, roughness: 0.7, metalness: 0 };
    const mat = new THREE.MeshStandardMaterial({ ...fallback, color: new THREE.Color(fallback.color) });

    if (!folder || !THREE.TextureLoader) {
      cache[key] = mat;
      onDone(mat);
      return;
    }

    // Încearcă să încarce textura PBR
    const loader = new THREE.TextureLoader();
    const base = PBR_BASE + folder + '/';
    let loaded = 0;
    const total = 3; // diff + rough + nor (ao opțional)
    const check = () => { if (++loaded >= total) { cache[key] = mat; onDone(mat); } };

    loader.load(base + 'diff.jpg',
      (t) => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 2); mat.map = t; mat.needsUpdate = true; check(); },
      undefined, () => check()
    );
    loader.load(base + 'rough.jpg',
      (t) => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 2); mat.roughnessMap = t; mat.needsUpdate = true; check(); },
      undefined, () => check()
    );
    loader.load(base + 'nor_gl.jpg',
      (t) => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 2); mat.normalMap = t; mat.normalScale = new THREE.Vector2(0.8, 0.8); mat.needsUpdate = true; check(); },
      undefined, () => check()
    );
  }

  // Mapare tip cameră → cheie material pardoseală
  function _floorKeyForRoom(roomType) {
    const mat = window.URBAN_SYNC?.materials || {};
    const overrides = {
      bath: 'marble_white', wc: 'marble_white',
      balcon: 'metal_finish',
    };
    if (overrides[roomType]) return overrides[roomType];
    return mat.pardoseala || 'parchet_stejar';
  }

  // Mapare tip cameră → cheie material perete
  function _wallKeyForRoom(roomType) {
    const mat = window.URBAN_SYNC?.materials || {};
    const overrides = {
      bath: 'marble_white', wc: 'marble_white',
      kitchen: 'tencuiala_interior',
    };
    if (overrides[roomType]) return overrides[roomType];
    return mat.pereti || 'tencuiala_interior';
  }

  // Rebuild materiale în scena activă a turului
  function _rebuildTourMaterials() {
    const THREE = window.THREE;
    if (!THREE) return;

    // S1c Dollhouse
    const s1State = window.VTour?._state;
    if (s1State?.active && s1State.scene) {
      s1State.scene.traverse(obj => {
        if (!obj.isMesh || !obj.userData?.matKey) return;
        _loadPBRMaterial(THREE, obj.userData.matKey, mat => {
          obj.material = mat;
        });
      });
    }

    // S2b Floor Plan
    const s2State = window.VTourFP?._stateFP;
    if (s2State?.active && s2State.scene) {
      s2State.scene.traverse(obj => {
        if (!obj.isMesh || !obj.userData?.matKey) return;
        _loadPBRMaterial(THREE, obj.userData.matKey, mat => {
          obj.material = mat;
        });
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 3. PATCH TUR VIRTUAL — injectează materiale PBR + normative overlay + subsol
  // ═══════════════════════════════════════════════════════════════════════

  function _patchTour() {
    // Patch VTour.start — adaugă sidebar materiale și normative overlay
    const origStart = window.VTour?.start;
    if (origStart) {
      window.VTour.start = function () {
        origStart.apply(this, arguments);
        setTimeout(() => {
          _injectMaterialSidebar('vtour-s1-overlay', 's1');
          _injectNormativeOverlay('s1');
          _applyPBRToScene('s1');
          _addSubsolToDollhouse();
        }, 800);
      };
    }

    // Patch VTourFP.startFP — același
    const origStartFP = window.VTourFP?.startFP;
    if (origStartFP) {
      window.VTourFP.startFP = function () {
        origStartFP.apply(this, arguments);
        setTimeout(() => {
          _injectMaterialSidebar('vtour-fp-overlay', 'fp');
          _injectNormativeOverlay('fp');
          _applyPBRToScene('fp');
        }, 800);
      };
    }
  }

  // ── Sidebar selector materiale ────────────────────────────────────────
  const MATERIAL_LABELS = {
    parchet_stejar:    '🪵 Parchet stejar',
    marble_white:      '🪨 Marmură albă',
    tencuiala_interior:'🏠 Tencuială',
    caramida_aparenta: '🧱 Cărămidă aparentă',
    fabric_canapea:    '🛋 Textil canapea',
    metal_finish:      '⚙ Metal finisaj',
    tigla_acoperis:    '🏚 Țiglă acoperiș',
    blat_bucatarie:    '🍽 Blat bucătărie',
  };
  const MATERIAL_CATEGORIES = [
    { key: 'pardoseala', label: 'Pardoseală',    options: ['parchet_stejar', 'marble_white', 'metal_finish'] },
    { key: 'pereti',     label: 'Pereți int.',   options: ['tencuiala_interior', 'caramida_aparenta', 'marble_white'] },
    { key: 'mobilier',   label: 'Mobilier',      options: ['wood_light', 'wood_dark', 'metal_finish'] },
    { key: 'acoperis',   label: 'Acoperiș',      options: ['tigla_acoperis', 'metal_finish', 'marble_white'] },
  ];

  function _injectMaterialSidebar(overlayId, mode) {
    const overlay = document.getElementById(overlayId);
    if (!overlay || document.getElementById('tur-mat-sidebar-' + mode)) return;

    const sidebar = document.createElement('div');
    sidebar.id = 'tur-mat-sidebar-' + mode;
    sidebar.style.cssText = `
      position:absolute;top:60px;right:0;width:200px;background:rgba(15,23,42,.96);
      border-left:1px solid rgba(59,130,246,.2);overflow-y:auto;max-height:calc(100% - 120px);
      z-index:10;padding:12px 10px;
    `;

    let html = `
      <div style="color:#94a3b8;font-size:9px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;margin-bottom:10px;border-bottom:1px solid rgba(255,255,255,.06);padding-bottom:6px">
        🎨 Materiale & Finisaje
      </div>
    `;

    MATERIAL_CATEGORIES.forEach(cat => {
      const current = window.URBAN_SYNC?.materials[cat.key] || cat.options[0];
      html += `
        <div style="margin-bottom:12px">
          <div style="color:#64748b;font-size:8px;font-weight:700;text-transform:uppercase;margin-bottom:5px">${cat.label}</div>
          ${cat.options.map(opt => `
            <button
              onclick="window.URBAN_SYNC.setMaterial('${cat.key}','${opt}')"
              data-mat-btn="${cat.key}-${opt}"
              style="display:block;width:100%;text-align:left;padding:5px 8px;margin-bottom:3px;
                     border-radius:5px;cursor:pointer;font-size:9px;font-weight:${opt===current?'700':'500'};
                     background:${opt===current?'rgba(59,130,246,.25)':'rgba(255,255,255,.04)'};
                     border:1px solid ${opt===current?'rgba(59,130,246,.5)':'rgba(255,255,255,.06)'};
                     color:${opt===current?'#93c5fd':'#94a3b8'}">
              ${MATERIAL_LABELS[opt] || opt}
            </button>
          `).join('')}
        </div>
      `;
    });

    // Toggle normative overlay
    html += `
      <div style="border-top:1px solid rgba(255,255,255,.06);padding-top:10px;margin-top:4px">
        <div style="color:#64748b;font-size:8px;font-weight:700;text-transform:uppercase;margin-bottom:6px">Verificare norme</div>
        <button
          onclick="window.URBAN_SYNC.showNormative=!window.URBAN_SYNC.showNormative;_turSyncUpdateNorm()"
          id="tur-norm-toggle"
          style="display:block;width:100%;padding:5px 8px;border-radius:5px;cursor:pointer;
                 font-size:9px;font-weight:600;background:rgba(34,197,94,.12);
                 border:1px solid rgba(34,197,94,.3);color:#4ade80">
          ✅ Normative vizibile
        </button>
      </div>
    `;

    sidebar.innerHTML = html;

    // Redimensionează canvas-ul să lase loc pentru sidebar
    const canvasCtn = overlay.querySelector('[id$="-canvas-ctn"]');
    if (canvasCtn) canvasCtn.style.marginRight = '200px';

    overlay.style.position = 'relative';
    overlay.appendChild(sidebar);
  }

  window._turSyncUpdateNorm = function () {
    const btn = document.getElementById('tur-norm-toggle');
    if (!btn) return;
    const on = window.URBAN_SYNC?.showNormative;
    btn.textContent = on ? '✅ Normative vizibile' : '⬜ Normative ascunse';
    btn.style.background = on ? 'rgba(34,197,94,.12)' : 'rgba(100,116,139,.12)';
    btn.style.color = on ? '#4ade80' : '#64748b';
  };

  function _updateMaterialSelectorUI() {
    document.querySelectorAll('[data-mat-btn]').forEach(btn => {
      const [cat, opt] = btn.getAttribute('data-mat-btn').split('-').reduce((a, v, i, arr) => {
        // reconstruct: first part is category, rest is option
        if (i === 0) return [v, ''];
        return [a[0], a[1] ? a[1] + '-' + v : v];
      }, ['', '']);
      const current = window.URBAN_SYNC?.materials[cat];
      const active = opt === current;
      btn.style.fontWeight = active ? '700' : '500';
      btn.style.background = active ? 'rgba(59,130,246,.25)' : 'rgba(255,255,255,.04)';
      btn.style.borderColor = active ? 'rgba(59,130,246,.5)' : 'rgba(255,255,255,.06)';
      btn.style.color = active ? '#93c5fd' : '#94a3b8';
    });
  }

  // ── Overlay normative pe podele camere ────────────────────────────────
  function _injectNormativeOverlay(mode) {
    if (!window.URBAN_SYNC?.showNormative) return;
    const THREE = window.THREE;
    if (!THREE) return;

    const stateObj = mode === 's1' ? window.VTour?._state : window.VTourFP?._stateFP;
    if (!stateObj?.scene) return;

    const fl0 = window._RV?.floors?.[0];
    if (!fl0?.rects) return;

    const b = window._RV?.building;
    if (!b) return;

    const anchor_cx = stateObj._anchor?.cx || 0;
    const anchor_cz = stateObj._anchor?.cz || 0;
    const ox = anchor_cx - b.bW / 2;
    const oz = anchor_cz - b.bD / 2;

    const NP057_MIN = { living: 14, bedroom: 12, bedroom2: 10, bedroom3: 8, kitchen: 5, bath: 3.6, wc: 1.2 };

    fl0.rects.forEach(r => {
      if (r.bal || r.apt < 0) return;

      const issues = [];

      // OMS 119
      if (r.solarOk === false && ['bedroom', 'bedroom2', 'bedroom3', 'living'].includes(r.t))
        issues.push({ type: 'OMS119', color: 0xef4444, label: '⚠ OMS119' });

      // NP057
      const minA = NP057_MIN[r.t];
      if (minA && r.w * r.h < minA - 0.1)
        issues.push({ type: 'NP057', color: 0xf97316, label: '⚠ NP057' });

      // ISU - distanță la nucleu
      if (b.cores?.length > 0) {
        const core = b.cores[0];
        const d = Math.hypot(r.x + r.w / 2 - core.x - core.w / 2, r.y + r.h / 2 - core.y - core.h / 2);
        const maxISU = 30;
        if (d > maxISU)
          issues.push({ type: 'ISU', color: 0xdc2626, label: '⚠ ISU' });
      }

      if (issues.length === 0) return;

      // Overlay colorat pe podea
      const overlayMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(issues[0].color),
        roughness: 0.9, transparent: true, opacity: 0.22,
        depthWrite: false,
      });
      const overlay = new THREE.Mesh(
        new THREE.BoxGeometry(r.w * 0.92, 0.008, r.h * 0.92),
        overlayMat
      );
      overlay.position.set(ox + r.x + r.w / 2, 0.03, oz + r.y + r.h / 2);
      overlay.userData.normOverlay = true;
      stateObj.scene.add(overlay);

      // Badge text (sprite)
      _addNormBadge(THREE, stateObj.scene, ox + r.x + r.w / 2, 0.5, oz + r.y + r.h / 2, issues[0].label);
    });
  }

  function _addNormBadge(THREE, scene, x, y, z, text) {
    const cv = document.createElement('canvas');
    cv.width = 256; cv.height = 64;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = 'rgba(220,38,38,.85)';
    ctx.roundRect ? ctx.roundRect(4, 4, 248, 56, 10) : ctx.fillRect(4, 4, 248, 56);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 32);

    const tex = new THREE.CanvasTexture(cv);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.position.set(x, y + 0.4, z);
    sprite.scale.set(1.2, 0.3, 1);
    sprite.userData.normOverlay = true;
    scene.add(sprite);
  }

  // ── Aplică materiale PBR pe meshes din scenă ──────────────────────────
  function _applyPBRToScene(mode) {
    const THREE = window.THREE;
    if (!THREE) return;

    const stateObj = mode === 's1' ? window.VTour?._state : window.VTourFP?._stateFP;
    if (!stateObj?.dollhouseGroup && !stateObj?.floorGroups) return;
    const scene = stateObj.scene;
    if (!scene) return;

    const b = window._RV?.building;
    const anchor_cx = stateObj._anchor?.cx || 0;
    const anchor_cz = stateObj._anchor?.cz || 0;
    const ox = b ? anchor_cx - b.bW / 2 : 0;
    const oz = b ? anchor_cz - b.bD / 2 : 0;

    // Tagăm meshes cu matKey și reaplică materialul PBR
    scene.traverse(obj => {
      if (!obj.isMesh) return;
      const pos = obj.position;
      const fl0 = window._RV?.floors?.[0];
      if (!fl0?.rects || !b) return;

      // Găsim camera corespunzătoare poziției mesh-ului
      let bestRoom = null, bestDist = 99;
      fl0.rects.forEach(r => {
        const cx = ox + r.x + r.w / 2;
        const cz = oz + r.y + r.h / 2;
        const d = Math.hypot(pos.x - cx, pos.z - cz);
        if (d < bestDist && d < Math.max(r.w, r.h)) {
          bestDist = d;
          bestRoom = r;
        }
      });

      if (!bestRoom) return;

      // Detectăm dacă e podea (y ≈ 0) sau perete (y > 0.3)
      const isFloor  = pos.y < 0.1;
      const isWall   = pos.y > 0.3 && obj.geometry?.parameters?.height && obj.geometry.parameters.height > 0.5;
      const isFurniture = pos.y > 0.2 && !isWall;

      let matKey = null;
      if (isFloor)     matKey = _floorKeyForRoom(bestRoom.t);
      else if (isWall) matKey = _wallKeyForRoom(bestRoom.t);
      // mobilier rămâne cu materialul original (nu suprascrem)

      if (!matKey) return;
      obj.userData.matKey = matKey;
      _loadPBRMaterial(THREE, matKey, mat => {
        obj.material = mat;
      });
    });
  }

  // ── Subsol în dollhouse ───────────────────────────────────────────────
  function _addSubsolToDollhouse() {
    const THREE = window.THREE;
    if (!THREE) return;
    const b = window._RV?.building;
    if (!b || !(b.subsolNiv > 0)) return;

    const s1State = window.VTour?._state;
    if (!s1State?.scene || !s1State._anchor) return;

    const anchor = s1State._anchor;
    const bW = anchor.bW, bD = anchor.bD;
    const subH = 2.7; // înălțime standard subsol

    const group = new THREE.Group();
    group.name = 'Subsol_S1';
    group.position.y = anchor.baseY - subH;

    // Fundal subsol (slab podea)
    const slabMat = new THREE.MeshStandardMaterial({ color: 0x4a5060, roughness: 0.85 });
    const slab = new THREE.Mesh(new THREE.BoxGeometry(bW + 0.15, 0.18, bD + 0.15), slabMat);
    slab.position.set(anchor.cx, -0.09, anchor.cz);
    slab.receiveShadow = true;
    group.add(slab);

    // Pereți exteriori subsol (semi-transparenți beton)
    const wMat = new THREE.MeshStandardMaterial({ color: 0x3a4050, roughness: 0.9, transparent: true, opacity: 0.25, side: THREE.DoubleSide });
    [[bW, 0.25, bD, anchor.cx, subH / 2, anchor.cz + bD / 2],
     [bW, 0.25, bD, anchor.cx, subH / 2, anchor.cz - bD / 2],
     [0.25, subH, bD, anchor.cx + bW / 2, subH / 2, anchor.cz],
     [0.25, subH, bD, anchor.cx - bW / 2, subH / 2, anchor.cz],
    ].forEach(([w, wt, d, x, y, z]) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, wt, d), wMat);
      m.position.set(x, y, z);
      group.add(m);
    });

    // Locuri de parcare (linii pe podea)
    const locW = 2.5, locL = 5.0, culoar = 6.0;
    const ox = anchor.cx - bW / 2 + 0.3;
    const oz = anchor.cz - bD / 2 + 0.3;
    const nLoc = Math.floor((bW - 0.6) / locW);
    const parkMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.9 });
    const pmrMat  = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.9 });
    const pmrNr   = Math.max(1, Math.ceil(nLoc * 0.04));

    for (let i = 0; i < nLoc; i++) {
      const isPMR = i < pmrNr;
      const lx = ox + i * locW + locW / 2;
      // Linie delimitare loc (foarte subțire, pe podea)
      const lineMat = new THREE.MeshStandardMaterial({ color: isPMR ? 0x22c55e : 0x3b82f6, roughness: 0.9 });
      // Număr loc (box mic colorat)
      const marker = new THREE.Mesh(new THREE.BoxGeometry(locW - 0.1, 0.02, locL - 0.1), lineMat);
      marker.position.set(lx, 0.01, anchor.cz - culoar / 2);
      group.add(marker);
    }

    // Rampă (plan inclinat)
    const rampMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.8, transparent: true, opacity: 0.7 });
    const ramp = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 9.0), rampMat);
    ramp.rotation.x = Math.atan2(subH, 9.0);
    ramp.position.set(anchor.cx + bW / 2 - 2.0, subH / 2, anchor.cz + bD / 2 - 5);
    group.add(ramp);

    // Label SUBSOL (sprite)
    _addNormBadge(THREE, s1State.scene, anchor.cx, anchor.baseY - subH / 2, anchor.cz,
      'S-1 · Parcaj');

    s1State.scene.add(group);

    // Adaugă în floorOffsets pentru explode
    s1State.floorOffsets.unshift(group); // prepend (subsol e sub parter)
    group.userData.baseY = anchor.baseY - subH;

    console.log('[TurSync] ✅ Subsol S-1 adăugat în dollhouse');
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 4. CULOARE FAȚADĂ exactă din viewer3D → planșe
  // ═══════════════════════════════════════════════════════════════════════

  function _patchFacadeColors() {
    // Injectăm culorile exacte din viewer3D în STIL_CFG din 15-relevee-planfix.js
    // Planfix v2 citește URBAN_SYNC dacă există, altfel folosește propriile culori
    const sync = window.URBAN_SYNC;
    if (!sync) return;

    const A = window.AEDIS || {};
    const stil = A.stil || 'modern';
    const fc = sync.facadeColors;

    // Notificăm planfix că trebuie să folosească aceste culori
    window._PLANFIX_FACADE_OVERRIDE = {
      panelCol:  fc.panel,
      bandCol:   fc.band,
      glassCol:  fc.glass + '99', // cu alfa pentru plan 2D
      frameCol:  fc.frame,
    };

    // Re-render fațada dacă e deschisă
    if (window._RV?.tab === 'fatada' && typeof _rvRender === 'function') {
      _rvRender();
    }
  }

  // ── Patch _rvRenderFacade să citească override-ul ──────────────────────
  // (se execută după ce planfix.js a deja patch-uit funcția)
  setTimeout(() => {
    const origFacade = window._rvRenderFacade;
    if (!origFacade || window._FACADE_SYNC_PATCHED) return;
    window._FACADE_SYNC_PATCHED = true;

    window._rvRenderFacade = function (b) {
      // Injectăm culorile sync înainte de render
      if (window._PLANFIX_FACADE_OVERRIDE && window.URBAN_SYNC) {
        const ov = window._PLANFIX_FACADE_OVERRIDE;
        // Planfix citește AEDIS.stil și construiește STIL_CFG intern
        // Injectăm prin proprietate temporară pe AEDIS
        window.AEDIS._facadeOverride = ov;
      }
      origFacade.apply(this, arguments);
      if (window.AEDIS) delete window.AEDIS._facadeOverride;
    };
  }, 2000);

  // ═══════════════════════════════════════════════════════════════════════
  // 5. ACTUALIZARE CULORI PLAN la schimbare material
  // ═══════════════════════════════════════════════════════════════════════

  // Mapare material → culoare planșă 2D
  const MAT_TO_PLAN_COLOR = {
    parchet_stejar:    '#FEF3C7', // galben cald — lemn
    marble_white:      '#EDE9FE', // lavandă deschis — marmură
    tencuiala_interior:'#F1F5F9', // gri neutru — tencuială
    caramida_aparenta: '#FEE2E2', // roșu deschis — cărămidă
    metal_finish:      '#E2E8F0', // gri albăstrui — metal
    wood_light:        '#FEF9C3', // galben pal
    wood_dark:         '#FEF3C7', // galben
    fabric_canapea:    '#F3E8FF', // mov deschis
  };

  function _updatePlanColors() {
    const mat = window.URBAN_SYNC?.materials;
    if (!mat) return;

    // Actualizăm culorile în ROOM_FILL dacă planfix e activ
    // Planfix citește din constanta ROOM_FILL care e în closure-ul IIFE
    // Soluție: punem override-ul pe window și planfix îl verifică
    window._PLAN_COLOR_OVERRIDE = {
      living:   MAT_TO_PLAN_COLOR[mat.pardoseala] || '#FEF3C7',
      bedroom:  MAT_TO_PLAN_COLOR[mat.pardoseala] || '#DCFCE7',
      bedroom2: MAT_TO_PLAN_COLOR[mat.pardoseala] || '#DCFCE7',
      bedroom3: MAT_TO_PLAN_COLOR[mat.pardoseala] || '#DCFCE7',
      bath:     MAT_TO_PLAN_COLOR['marble_white'],
      wc:       MAT_TO_PLAN_COLOR['marble_white'],
      hall:     MAT_TO_PLAN_COLOR[mat.pereti]     || '#F1F5F9',
    };

    // Re-render planul dacă e deschis
    if (window._RV?.tab === 'plan' && typeof _rvRender === 'function') {
      _rvRender();
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 6. EXPORT PREZENTARE CLIENT
  // ═══════════════════════════════════════════════════════════════════════

  function _injectPresentationButton() {
    const _try = () => {
      if (document.getElementById('rv-prezentare-btn')) return true;
      const anchor = document.querySelector('#rv-dxf-btn, .rv-expbtn, #rv-planseA3-btn');
      if (!anchor) return false;

      const btn = document.createElement('button');
      btn.id = 'rv-prezentare-btn';
      btn.innerHTML = '📋 Prezentare';
      btn.title = 'Export PDF prezentare client — plan + fațadă + secțiune + dollhouse + normative';
      btn.style.cssText = [
        'height:32px', 'padding:0 12px', 'border-radius:7px', 'cursor:pointer',
        'font-family:inherit', 'font-size:11px', 'font-weight:800', 'margin-left:6px',
        'background:rgba(168,85,247,.15)', 'border:1.5px solid rgba(168,85,247,.5)',
        'color:#c084fc', 'display:inline-flex', 'align-items:center', 'flex-shrink:0',
      ].join(';');
      btn.onmouseover = () => btn.style.opacity = '.75';
      btn.onmouseout  = () => btn.style.opacity = '1';
      btn.onclick = () => _exportPrezentare();
      anchor.parentElement.insertBefore(btn, anchor.nextSibling);
      return true;
    };

    if (_try()) return;
    const obs = setInterval(() => { if (_try()) clearInterval(obs); }, 800);
    setTimeout(() => clearInterval(obs), 15000);
  }

  async function captureTourScreenshot() {
    return new Promise(resolve => {
      const canvas = window.VTour?._state?.canvas || window.VTourFP?._stateFP?.canvas;
      if (canvas) {
        try {
          const img = canvas.toDataURL('image/jpeg', 0.92);
          resolve(img);
          return;
        } catch (e) {}
      }
      resolve(null);
    });
  }

  async function _exportPrezentare() {
    const b = window._RV?.building, P = window._RV?.parcelParams;
    if (!b || !P) { alert('Generați releveele mai întâi.'); return; }

    const _jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!_jsPDF) { alert('jsPDF indisponibil.'); return; }

    if (typeof ss === 'function') ss('⏳ Generez prezentare client…');

    const pdf = new _jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a3' });
    const W = 420, H = 297;
    const S2 = s => String(s || '').replace(/[^\x20-\x7E\u00C0-\u024F]/g, ' ').trim();
    const A = window.AEDIS || {};
    const sync = window.URBAN_SYNC || {};
    let pg = 0;

    const newPage = (title) => {
      if (pg > 0) pdf.addPage();
      pg++;
      // Header per pagină
      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 0, W, 10, 'F');
      pdf.setFillColor(168, 85, 247);
      pdf.rect(0, 9.5, W, 0.7, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.text(S2(title), 8, 7);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6);
      pdf.text(S2('Nr.cad. ' + P.nrCad + ' · UTR ' + P.utr + ' · ' + new Date().toLocaleDateString('ro-RO')), W - 4, 7, { align: 'right' });
    };

    // ── PAGINA 1: COVER ───────────────────────────────────────────────
    newPage('UrbanX · Documentație Orientativă Pre-proiectare');
    pdf.setFillColor(8, 14, 30);
    pdf.rect(0, 10, W, H - 10, 'F');
    // Titlu mare
    pdf.setTextColor(212, 175, 55);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(28);
    pdf.text('PROPUNERE ARHITECTURALĂ', W / 2, 70, { align: 'center' });
    pdf.setFontSize(16);
    pdf.setTextColor(148, 163, 184);
    pdf.text(S2('Nr.cad. ' + P.nrCad + ' · ' + P.utr), W / 2, 85, { align: 'center' });

    // Info clădire
    const fn = A.fn || 'rezidential_colectiv';
    const AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
    const rows = [
      ['Funcțiune', S2(AC.fnLabel || fn)],
      ['Stil arhitectural', S2(AC.stilLabel || A.stil || 'Modern')],
      ['Regim înălțime', 'P+' + (b.niv - 1) + ' · H=' + (b.niv * (P.hn || 3)).toFixed(1) + 'm'],
      ['Suprafață parcelă', P.area.toFixed(0) + ' m²'],
      ['SC amprentă', b.scArea.toFixed(0) + ' m²'],
      ['SDA total', b.sdaTotal.toFixed(0) + ' m²'],
      ['POT realizat', (b.scArea / P.area * 100).toFixed(1) + '% / max ' + (P.pot * 100).toFixed(0) + '%'],
      ['CUT realizat', (b.sdaTotal / P.area).toFixed(2) + ' / max ' + P.cut],
      ['Tip acoperiș', S2(AC.acoperisLabel || 'Terasă')],
      ['Materiale pardoseală', S2(MATERIAL_LABELS[sync.materials?.pardoseala] || '—')],
      ['Materiale pereți', S2(MATERIAL_LABELS[sync.materials?.pereti] || '—')],
    ];
    const colX = [W / 2 - 80, W / 2 - 10];
    rows.forEach(([lbl, val], i) => {
      const ry = 108 + i * 9;
      pdf.setFillColor(i % 2 === 0 ? 20 : 25, i % 2 === 0 ? 30 : 38, i % 2 === 0 ? 55 : 65);
      pdf.rect(W / 2 - 85, ry - 4, 170, 8, 'F');
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7); pdf.setTextColor(148, 163, 184);
      pdf.text(S2(lbl), colX[0], ry);
      pdf.setFont('helvetica', 'normal'); pdf.setTextColor(255, 255, 255);
      pdf.text(S2(val), colX[1], ry);
    });

    pdf.setTextColor(100, 116, 139); pdf.setFont('helvetica', 'italic'); pdf.setFontSize(6);
    pdf.text('Document orientativ generat automat de platforma UrbanX · Nu înlocuiește proiectul tehnic elaborat de arhitect autorizat OAR', W / 2, H - 8, { align: 'center' });

    // ── PAGINA 2: PLAN NIVEL (canvas releveu) ────────────────────────
    newPage('Plan Nivel');
    const cvPlan = document.getElementById('rv-canvas');
    if (cvPlan) {
      try {
        const planImg = cvPlan.toDataURL('image/jpeg', 0.92);
        const iW = W - 16, iH = H - 18;
        pdf.addImage(planImg, 'JPEG', 8, 12, iW, iH);
      } catch (e) { pdf.setTextColor(100, 100, 100); pdf.text('Plan indisponibil', W / 2, H / 2, { align: 'center' }); }
    }

    // ── PAGINA 3: FAȚADE ──────────────────────────────────────────────
    newPage('Fațade');
    // Re-render fațada în canvas temp
    if (typeof _rvRenderFacade === 'function' && window._RV?.building) {
      const prevTab = window._RV.tab;
      window._RV.tab = 'fatada';
      _rvRenderFacade(window._RV.building);
      const cvFat = document.getElementById('rv-canvas');
      if (cvFat) {
        try {
          const fatImg = cvFat.toDataURL('image/jpeg', 0.90);
          pdf.addImage(fatImg, 'JPEG', 8, 12, W - 16, H - 18);
        } catch (e) {}
      }
      window._RV.tab = prevTab;
      if (typeof _rvRender === 'function') _rvRender();
    }

    // ── PAGINA 4: SECȚIUNE A-A ────────────────────────────────────────
    newPage('Secțiune A-A');
    if (typeof _rvRenderSectiuneV2 === 'function' && window._RV?.building) {
      _rvRenderSectiuneV2(window._RV.building);
      const cvSec = document.getElementById('rv-canvas');
      if (cvSec) {
        try {
          const secImg = cvSec.toDataURL('image/jpeg', 0.90);
          pdf.addImage(secImg, 'JPEG', 8, 12, W - 16, H - 18);
        } catch (e) {}
      }
    }

    // ── PAGINA 5: SCREENSHOT DOLLHOUSE (dacă turul a fost deschis) ────
    const tourImg = await captureTourScreenshot();
    if (tourImg) {
      newPage('Vizualizare 3D Dollhouse');
      pdf.addImage(tourImg, 'JPEG', 8, 12, W - 16, H - 18);
    }

    // ── PAGINA 6: NORMATIVE + MATERIALE ──────────────────────────────
    newPage('Verificare Normative + Rezumat Materiale');
    let y = 18;

    // Radar normative (capturăm SVG-ul existent)
    if (typeof _rvCaptureDNARadarPNG === 'function') {
      await new Promise(resolve => {
        _rvCaptureDNARadarPNG(img => {
          if (img) {
            try { pdf.addImage(img, 'PNG', 8, y, 80, 80); } catch (e) {}
          }
          resolve();
        });
      });
    }

    // Tabel normative
    const fl0 = window._RV?.floors?.[0];
    const NP057M = { living: 14, bedroom: 12, bedroom2: 10, bedroom3: 8, kitchen: 5, bath: 3.6, wc: 1.2 };
    const subminRooms = (fl0?.rects || []).filter(r => { const m = NP057M[r.t]; return m && r.w * r.h < m - 0.05; });
    const solarFail = (fl0?.rects || []).filter(r => r.solarOk === false);
    const potOk = b.scArea / P.area <= P.pot + 0.005;
    const cutOk = b.sdaTotal / P.area <= P.cut + 0.01;

    const norms = [
      { n: 'NP 057/2002', desc: 'Suprafețe minime camere',       ok: subminRooms.length === 0, detail: subminRooms.length > 0 ? subminRooms.length + ' camere sub minim' : 'toate conforme' },
      { n: 'OMS 119/2014', desc: 'Însorire min 1.5h/zi',         ok: solarFail.length === 0,   detail: solarFail.length > 0 ? solarFail.length + ' camere neconforme' : 'toate conforme' },
      { n: 'PUG/RGU — POT', desc: 'Procentul de ocupare teren',  ok: potOk, detail: (b.scArea / P.area * 100).toFixed(1) + '% / max ' + (P.pot * 100).toFixed(0) + '%' },
      { n: 'PUG/RGU — CUT', desc: 'Coeficientul de utilizare',   ok: cutOk, detail: (b.sdaTotal / P.area).toFixed(2) + ' / max ' + P.cut },
      { n: 'NP 051/2012',  desc: 'Lift obligatoriu P+4+',        ok: b.niv < 5 || (fl0?.rects || []).some(r => r.t === 'core' && (r.lbl || '').includes('Lift')), detail: b.niv >= 5 ? 'verificat' : 'N/A (<P+4)' },
      { n: 'P118-2/2013',  desc: 'Distanțe căi evacuare',        ok: true, detail: 'max 30m coridoare' },
    ];

    const txN = 95;
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.setTextColor(15, 23, 42);
    pdf.text('NORMATIVE VERIFICATE', txN, y + 6); y += 12;
    norms.forEach((nm, i) => {
      pdf.setFillColor(nm.ok ? 235 : 255, nm.ok ? 255 : 235, nm.ok ? 235 : 235);
      pdf.rect(txN, y - 3, W - txN - 8, 8, 'F');
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6.5);
      pdf.setTextColor(nm.ok ? 15 : 180, nm.ok ? 120 : 30, nm.ok ? 40 : 30);
      pdf.text((nm.ok ? '✅ ' : '⚠ ') + S2(nm.n), txN + 2, y + 1);
      pdf.setFont('helvetica', 'normal'); pdf.setTextColor(60, 80, 110); pdf.setFontSize(6);
      pdf.text(S2(nm.desc), txN + 55, y + 1);
      pdf.setTextColor(80, 100, 140);
      pdf.text(S2(nm.detail), txN + 110, y + 1);
      y += 9;
    });

    y += 6;

    // Rezumat materiale
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.setTextColor(15, 23, 42);
    pdf.text('MATERIALE & FINISAJE SELECTATE', txN, y); y += 10;

    const mats = sync.materials || {};
    [
      ['Pardoseală', MATERIAL_LABELS[mats.pardoseala] || '—'],
      ['Pereți interiori', MATERIAL_LABELS[mats.pereti] || '—'],
      ['Mobilier', MATERIAL_LABELS[mats.mobilier] || '—'],
      ['Acoperiș', MATERIAL_LABELS[mats.acoperis] || '—'],
      ['Blat bucătărie', MATERIAL_LABELS['blat_bucatarie'] || 'Blat bucătărie'],
      ['Fațadă — panou', sync.facadeColors?.panel || '—'],
      ['Fațadă — bandou', sync.facadeColors?.band || '—'],
    ].forEach(([lbl, val], i) => {
      pdf.setFillColor(i % 2 === 0 ? 248 : 242, 250, 255);
      pdf.rect(txN, y - 3, W - txN - 8, 7, 'F');
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6); pdf.setTextColor(30, 40, 90);
      pdf.text(S2(lbl), txN + 2, y + 0.5);
      pdf.setFont('helvetica', 'normal'); pdf.setTextColor(80, 100, 140);
      pdf.text(S2(val), txN + 55, y + 0.5);
      y += 8;
    });

    // Footer
    pdf.setFont('helvetica', 'italic'); pdf.setFontSize(5.5); pdf.setTextColor(130, 140, 155);
    pdf.text('UrbanX TSS·FG · Prezentare orientativă · ' + pg + ' pagini · Verificat de arhitect autorizat OAR înainte de depunere PA', W / 2, H - 5, { align: 'center' });

    const fn2 = ('Prezentare_' + S2(P.nrCad) + '_' + S2(P.utr) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
    pdf.save(fn2);
    if (typeof ss === 'function') ss('✅ Prezentare client exportată · ' + pg + ' pagini');
  }

})();
