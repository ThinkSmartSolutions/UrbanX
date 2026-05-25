// ═══════════════════════════════════════════════════════════════════════════════
// UrbanX — RLU Municipiul Botoșani
// Logica completă pentru: lookup UTR, atribuire subzonă, audit, UI, DataBus patch
//
// Fișiere necesare (de încărcat în js/data/municipiul-botosani/):
//   • pug.geojson       — geometria celor 62 UTR-uri (vectorizat din planșele RLUB)
//   • cadastru.geojson  — parcele ANCPI cu geometrie completă
//   • reguli.json       — acest fișier JSON cu toate regulile (generat automat)
//
// Integrare în index.html (adaugă ÎNAINTE de </body>):
//   <script src="js/rlu-botosani.js?v=20260525a"></script>
//
// Versiune: 1.0.0 | Data: 2026-05-25 | UrbanX / TSS
// ═══════════════════════════════════════════════════════════════════════════════

(function () {
'use strict';

// ── Constante ────────────────────────────────────────────────────────────────
const UAT_KEY      = 'RO-BT-01';
const REGULI_URL   = 'js/data/municipiul-botosani/reguli.json';
const PUG_URL      = 'js/data/municipiul-botosani/pug.geojson';
const CADASTRU_URL = 'js/data/municipiul-botosani/cadastru.geojson';
const AUDIT_KEY    = 'ux_bt_subzona_audit';   // localStorage key
const VERSION      = '1.0.0';

// ── State intern ─────────────────────────────────────────────────────────────
let _reguli        = null;   // obiectul reguli.json după fetch
let _cadastruIdx   = {};     // { nr_cad → feature } după încărcare cadastru
let _pugIdx        = [];     // [{ utr_cod, geom, bb }] pentru lookup spațial
let _audit         = {};     // audit trail { nr_cad → { subzona_cod, urbanist, ts, sursa, nota } }
let _ready         = false;

// ── 1. INIȚIALIZARE ──────────────────────────────────────────────────────────

async function _init() {
  // Verifică dacă UAT-ul activ e Botoșani
  const activeKey = window.TCI?.cityKey
    || localStorage.getItem('ux_last_city')
    || 'RO-IS-01';
  if (activeKey !== UAT_KEY) return;

  console.log('[RLU-BT] Init pentru', UAT_KEY);

  // Încarcă regulile
  try {
    const resp = await fetch(REGULI_URL);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    _reguli = await resp.json();
    console.log('[RLU-BT] ✅ reguli.json încărcat —',
      Object.keys(_reguli.utrs).length, 'UTR-uri,',
      Object.keys(_reguli.subzone).length, 'subzone');
  } catch (e) {
    console.warn('[RLU-BT] ⚠ reguli.json lipsă sau invalid:', e.message);
    return;
  }

  // Restaurează audit din localStorage
  try {
    const saved = localStorage.getItem(AUDIT_KEY);
    if (saved) _audit = JSON.parse(saved);
  } catch (e) { _audit = {}; }

  // Patch DataBus pentru Botoșani (adaugă câmpuri subzonă + corectează UAT/seismic)
  _patchDataBus();

  // Hookează evenimentul de selectare parcelă
  _hookParcelSelect();

  // Hookează schimbarea UAT (când utilizatorul navighează la alt oraș și revine)
  _hookUATChange();

  _ready = true;
  console.log('[RLU-BT] ✅ Ready. Audit în cache:', Object.keys(_audit).length, 'parcele');

  // Emite eveniment pentru alte module care ar putea asculta
  document.dispatchEvent(new CustomEvent('rlu-bt:ready', { detail: { version: VERSION } }));
}


// ── 2. LOOKUP SPAȚIAL — parcelă → UTR ────────────────────────────────────────
//
// Ray-casting simplu pentru point-in-polygon.
// Folosește S.pugIdx (construit de _loadPUGOnMap din index.html)
// sau _pugIdx local (construit la încărcarea cadastru.geojson).

function _pointInPolygon(pt, ring) {
  // pt = [lon, lat], ring = [[lon, lat], ...]
  let inside = false;
  const x = pt[0], y = pt[1];
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1];
    const xj = ring[j][0], yj = ring[j][1];
    if (((yi > y) !== (yj > y)) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function _centroid(geometry) {
  // Returnează centrul aproximativ al unui Polygon/MultiPolygon
  let ring;
  if (geometry.type === 'Polygon') {
    ring = geometry.coordinates[0];
  } else if (geometry.type === 'MultiPolygon') {
    ring = geometry.coordinates[0][0];
  } else if (geometry.type === 'Point') {
    return geometry.coordinates;
  } else {
    return null;
  }
  if (!ring || !ring.length) return null;
  const lon = ring.reduce((s, c) => s + c[0], 0) / ring.length;
  const lat = ring.reduce((s, c) => s + c[1], 0) / ring.length;
  return [lon, lat];
}

function _lookupUTR(pt) {
  // pt = [lon, lat]
  // Folosește S.pugIdx (construit de _loadPUGOnMap) sau _pugIdx local
  const idx = (window.S && window.S.pugIdx && window.S.pugIdx.length > 0)
    ? window.S.pugIdx
    : _pugIdx;

  if (!idx || !idx.length) return null;

  // 1. Filtrare rapidă prin bounding box
  const candidates = idx.filter(item => {
    const bb = item.bb; // [minLon, minLat, maxLon, maxLat]
    return pt[0] >= bb[0] && pt[0] <= bb[2] && pt[1] >= bb[1] && pt[1] <= bb[3];
  });

  // 2. Ray-casting precis
  for (const item of candidates) {
    const g = item.geom;
    let rings = [];
    if (g.type === 'Polygon') {
      rings = [g.coordinates[0]];
    } else if (g.type === 'MultiPolygon') {
      rings = g.coordinates.map(poly => poly[0]);
    }
    for (const ring of rings) {
      if (_pointInPolygon(pt, ring)) return item.utr;
    }
  }
  return null;
}


// ── 3. LOGICA SUBZONĂ — UTR + parcelă → parametri ───────────────────────────

/**
 * Returnează toate subzonele posibile pentru un UTR.
 * @param {string} utrCod  — e.g. "1", "32"
 * @returns {Array} — [{ cod, denumire, fn_dominanta, pot_baza, cut_baza, hmax_m, ... }]
 */
function getSubzonePosibile(utrCod) {
  if (!_reguli) return [];
  const utr = _reguli.utrs[String(utrCod)];
  if (!utr) return [];

  return (utr.subzone_admise || []).map(cod => {
    const sz = _reguli.subzone[cod] || {};
    return { cod, ...sz, _este_dominanta: cod === utr.fn_dominanta };
  }).sort((a, b) => {
    // Funcțiunea dominantă prima
    if (a._este_dominanta && !b._este_dominanta) return -1;
    if (!a._este_dominanta && b._este_dominanta) return 1;
    return 0;
  });
}

/**
 * Returnează parametrii pentru o subzonă specifică.
 * @param {string} subzonaCod — e.g. "LMu1"
 * @returns {Object|null}
 */
function getSubzona(subzonaCod) {
  if (!_reguli) return null;
  return _reguli.subzone[subzonaCod] || null;
}

/**
 * Returnează datele complete ale unui UTR.
 * @param {string} utrCod
 * @returns {Object|null}
 */
function getUTR(utrCod) {
  if (!_reguli) return null;
  return _reguli.utrs[String(utrCod)] || null;
}

/**
 * Returnează subzona atribuită unei parcele (din audit sau auto).
 * Dacă nu există atribuire, returnează funcțiunea dominantă a UTR-ului.
 * @param {string} nrCad
 * @param {string} utrCod
 * @returns {{ cod, sursa, urbanist, ts, nota, params }}
 */
function getSubzonaParcelei(nrCad, utrCod) {
  // 1. Din audit (atribuire manuală sau ZCAD/PUZ)
  if (nrCad && _audit[nrCad]) {
    const a = _audit[nrCad];
    const params = getSubzona(a.subzona_cod);
    return { cod: a.subzona_cod, sursa: a.sursa, urbanist: a.urbanist, ts: a.ts, nota: a.nota, params };
  }

  // 2. Auto: funcțiunea dominantă a UTR-ului
  if (!_reguli || !utrCod) return null;
  const utr = _reguli.utrs[String(utrCod)];
  if (!utr) return null;
  const cod = utr.fn_dominanta;
  const params = getSubzona(cod);
  return { cod, sursa: 'auto_dominanta', urbanist: null, ts: null, nota: null, params };
}


// ── 4. AUDIT TRAIL ───────────────────────────────────────────────────────────

/**
 * Salvează atribuirea manuală a subzonei pentru o parcelă.
 * @param {string} nrCad
 * @param {string} subzonaCod
 * @param {Object} opts — { urbanist, sursa, nota }
 */
function atribuieSubzona(nrCad, subzonaCod, opts = {}) {
  if (!nrCad || !subzonaCod) return false;

  const entry = {
    subzona_cod: subzonaCod,
    urbanist:    opts.urbanist || localStorage.getItem('ux_user') || 'Urbanist UrbanX',
    sursa:       opts.sursa    || 'manual',
    nota:        opts.nota     || '',
    ts:          new Date().toISOString(),
    uat:         UAT_KEY,
    utr_cod:     opts.utr_cod  || null,
  };

  _audit[nrCad] = entry;

  try {
    localStorage.setItem(AUDIT_KEY, JSON.stringify(_audit));
  } catch (e) {
    console.warn('[RLU-BT] localStorage write error:', e.message);
  }

  console.log('[RLU-BT] ✅ Atribuire salvată:', nrCad, '→', subzonaCod, '|', entry.sursa, '|', entry.urbanist);

  // Notifică DataBus cu noile date
  _updateDataBusForParcel(nrCad);

  // Emite eveniment pentru UI
  document.dispatchEvent(new CustomEvent('rlu-bt:subzona-atribuita', {
    detail: { nrCad, subzonaCod, ...entry }
  }));

  return true;
}

/**
 * Șterge atribuirea pentru o parcelă (revenire la auto).
 */
function stergeAtribuire(nrCad) {
  if (!nrCad || !_audit[nrCad]) return;
  delete _audit[nrCad];
  try {
    localStorage.setItem(AUDIT_KEY, JSON.stringify(_audit));
  } catch (e) {}
  _updateDataBusForParcel(nrCad);
  document.dispatchEvent(new CustomEvent('rlu-bt:subzona-stearsa', { detail: { nrCad } }));
}

/**
 * Exportă tot auditul ca JSON (pentru backup/transfer).
 */
function exportAudit() {
  const data = {
    _meta: { uat: UAT_KEY, ts_export: new Date().toISOString(), nr_inregistrari: Object.keys(_audit).length },
    inregistrari: _audit
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `rlu-bt-audit-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  console.log('[RLU-BT] Export audit:', Object.keys(_audit).length, 'înregistrări');
}

/**
 * Importă audit dintr-un fișier JSON (merge cu cel existent).
 */
function importAudit(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const inreg = data.inregistrari || data;
        Object.assign(_audit, inreg);
        localStorage.setItem(AUDIT_KEY, JSON.stringify(_audit));
        console.log('[RLU-BT] Import audit:', Object.keys(inreg).length, 'înregistrări');
        resolve(Object.keys(inreg).length);
      } catch (err) { reject(err); }
    };
    reader.readAsText(file);
  });
}


// ── 5. PATCH DATABUS ─────────────────────────────────────────────────────────
//
// Extinde _RV_DataBus.update() pentru a adăuga câmpurile RLU Botoșani.
// Se apelează o singură dată la init.

function _patchDataBus() {
  if (!window._RV_DataBus) return;
  if (window._RV_DataBus._bt_patched) return;

  const _origUpdate = window._RV_DataBus.update.bind(window._RV_DataBus);

  window._RV_DataBus.update = function (building, P) {
    // Rulăm update-ul original
    _origUpdate(building, P);

    // Dacă nu e Botoșani, nu adăugăm nimic
    const activeKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
    if (activeKey !== UAT_KEY) return;
    if (!_reguli) return;

    const computed = window._RV_DataBus.get();
    if (!computed) return;

    // Determinăm subzona
    const utrCod   = P.utr || computed.utr || null;
    const nrCad    = P.nrCad || computed.nrCad || null;
    const subzInfo = getSubzonaParcelei(nrCad, utrCod);
    const sz       = subzInfo?.params || {};
    const utrData  = getUTR(utrCod) || {};

    // Injectăm câmpuri suplimentare direct în _computed
    // (acces intern prin referința obiectului)
    Object.assign(computed, {
      // ─ Identificare UAT ────────────────────────────────────────────
      uat:              'Municipiul Botoșani',
      uat_key:          UAT_KEY,
      // ─ Seismic Botoșani (P100-1/2013 zona D) ──────────────────────
      ag:               0.20,
      Tc:               1.4,
      zonaSeism:        'D',
      // ─ Termici Botoșani ────────────────────────────────────────────
      hddIasi:          2900,  // HDD Botoșani (câmpul reutilizat, denumit HDD generic)
      hdd:              2900,
      // ─ Date UTR ────────────────────────────────────────────────────
      utr_denumire:     utrData.denumire || '',
      utr_sup_ha:       utrData.sup_ha   || null,
      fn_dominanta:     utrData.fn_dominanta || '',
      avize_necesare:   utrData.avize    || [],
      interdictii:      utrData.interdictii || '',
      utr_ref:          utrData.ref      || '',
      // ─ Subzonă atribuită ───────────────────────────────────────────
      subzona_cod:      subzInfo?.cod    || null,
      subzona_denumire: sz.denumire      || '',
      subzona_sursa:    subzInfo?.sursa  || 'necunoscut',
      subzona_urbanist: subzInfo?.urbanist || null,
      subzona_ts:       subzInfo?.ts     || null,
      subzona_nota:     subzInfo?.nota   || '',
      // ─ Parametri urbanistici din RLU (înlocuiesc P.pot/P.cut flat) ─
      pot_max:          sz.pot_baza      || P.pot || null,
      pot_max_cum:      sz.pot_cumulat   || null,
      cut_max:          sz.cut_baza      || P.cut || null,
      cut_max_cum:      sz.cut_cumulat   || null,
      hmax_m:           sz.hmax_m        || null,
      niv_max:          sz.niv_max       || null,
      regim_constructie:sz.regim         || '',
      sv_pct_min:       sz.spatii_verzi_pct || 10,
      parcaje_min_rlu:  sz.parcaje_min   || '1 loc/apart.',
      sup_min_parcela:  sz.suprafata_min_mp || null,
      lung_min_alin:    sz.lung_min_aliniament_m || null,
      adanc_min:        sz.adancime_min_m || null,
      aliniament_note:  sz.aliniament_note || 'prin PA/PUZ+R',
      cut_note:         sz.cut_note      || '',
      // ─ Subzone posibile în UTR (pentru selector UI) ─────────────────
      subzone_posibile: getSubzonePosibile(utrCod),
      // ─ Conformitate ────────────────────────────────────────────────
      pot_conform:      sz.pot_baza ? (computed.potReal || 0) <= sz.pot_baza : null,
      cut_conform:      sz.cut_baza ? (computed.cutReal || 0) <= sz.cut_baza : null,
      h_conform:        sz.hmax_m   ? computed.H <= sz.hmax_m : null,
    });

    // Re-notifică abonații cu datele extinse
    document.dispatchEvent(new CustomEvent('urbanx:building-updated', { detail: computed }));
    console.log('[RLU-BT] DataBus extins — subzonă:', subzInfo?.cod, '| POT max:', computed.pot_max, '| CUT max:', computed.cut_max);
  };

  window._RV_DataBus._bt_patched = true;
  console.log('[RLU-BT] DataBus patched ✅');
}


// ── 6. HOOK PARCELĂ SELECTATĂ ────────────────────────────────────────────────

function _hookParcelSelect() {
  // _onParcelSelectedHook e definit în index.html și apelat la click pe parcelă
  const _origHook = window._onParcelSelectedHook;

  window._onParcelSelectedHook = function (parcel) {
    // Apelăm hook-ul original (pentru discover panel etc.)
    if (typeof _origHook === 'function') _origHook(parcel);

    // Procesăm pentru RLU dacă e Botoșani
    const activeKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
    if (activeKey !== UAT_KEY || !_reguli) return;

    _processParcelForRLU(parcel);
  };
}

function _processParcelForRLU(parcel) {
  if (!parcel) return;

  // Extrage nr. cadastral din properties (mai multe formate posibile)
  const p = parcel.properties || parcel.params || parcel || {};
  const nrCad = p.nr_cad || p.nrCad || p.NR_CAD || p.id || p.ID || null;

  // Centroidul parcelei pentru lookup UTR
  let pt = null;
  if (parcel.geometry) {
    pt = _centroid(parcel.geometry);
  } else if (p.lat && p.lon) {
    pt = [p.lon, p.lat];
  } else if (p.lng && p.lat) {
    pt = [p.lng, p.lat];
  }

  // Lookup UTR din geometrie
  const utrCod = pt ? _lookupUTR(pt) : (p.utr || window.S?.utr || null);

  if (!utrCod) {
    console.warn('[RLU-BT] Nu s-a putut determina UTR-ul pentru parcela', nrCad);
  }

  // Obținem subzona
  const subzInfo = getSubzonaParcelei(nrCad, utrCod);
  const utrData  = getUTR(utrCod) || {};

  // Actualizăm S cu datele RLU
  if (window.S) {
    window.S.utr              = utrCod || window.S.utr;
    window.S.bt_nrCad         = nrCad;
    window.S.bt_utrCod        = utrCod;
    window.S.bt_subzona       = subzInfo;
    window.S.bt_utrData       = utrData;
    window.S.bt_subzonePosib  = getSubzonePosibile(utrCod);
  }

  // Redăm panoul UTR în panel
  _renderUTRPanel(nrCad, utrCod, utrData, subzInfo, parcel);

  console.log('[RLU-BT] Parcelă procesată:', nrCad, '| UTR:', utrCod, '| Subzonă:', subzInfo?.cod);
}


// ── 7. RENDER UI — panoul #tc-utr ────────────────────────────────────────────

function _renderUTRPanel(nrCad, utrCod, utrData, subzInfo, parcel) {
  const panel = document.getElementById('tc-utr');
  if (!panel) return;

  const sz = subzInfo?.params || {};
  const subzonePosib = getSubzonePosibile(utrCod);
  const parcelArea = parcel?.properties?.suprafata_mp
    || parcel?.properties?.area
    || parcel?.properties?.AREA
    || window.S?.parcels?.[0]?.params?.area
    || 0;

  // ── badge conformitate ──
  const _badge = (ok, txt) => ok === null
    ? `<span style="background:rgba(100,116,139,.2);color:#94a3b8;padding:2px 7px;border-radius:10px;font-size:10px">${txt}</span>`
    : ok
      ? `<span style="background:rgba(34,197,94,.15);color:#4ade80;padding:2px 7px;border-radius:10px;font-size:10px">✓ ${txt}</span>`
      : `<span style="background:rgba(239,68,68,.15);color:#f87171;padding:2px 7px;border-radius:10px;font-size:10px">✗ ${txt}</span>`;

  const pot_ok = sz.pot_baza && parcelArea ? null : null; // calculat la DataBus update

  // ── chips subzone ──
  const chipsHTML = subzonePosib.map(s => {
    const isActive = s.cod === subzInfo?.cod;
    const isDom    = s._este_dominanta;
    const bg = isActive
      ? 'background:rgba(212,175,55,.2);border-color:#d4af37;color:#d4af37'
      : isDom
        ? 'background:rgba(59,130,246,.1);border-color:rgba(59,130,246,.4);color:#60a5fa'
        : 'background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.12);color:#64748b';
    const dot = isDom ? '★ ' : '';
    return `<button
      style="padding:4px 9px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;margin:2px;border:1.5px solid;transition:all .15s;${bg}"
      title="${s.denumire || s.cod}"
      onclick="window._RLU_BT?.selectSubzona('${s.cod}')"
    >${dot}${s.cod}</button>`;
  }).join('');

  // ── tabel parametri ──
  const row = (label, val, note) => val == null ? '' : `
    <div style="display:flex;justify-content:space-between;align-items:baseline;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.04)">
      <span style="font-size:11px;color:#64748b">${label}</span>
      <span style="font-size:12px;color:#e2e8f0;font-weight:600">${val}${note ? `<span style="font-size:10px;color:#475569;font-weight:400;margin-left:4px">${note}</span>` : ''}</span>
    </div>`;

  // ── sursa atribuire ──
  const _sursa = (s) => ({
    'auto_dominanta': '<span style="color:#64748b;font-size:10px">◌ auto (funcțiune dominantă)</span>',
    'ZCAD':           '<span style="color:#4ade80;font-size:10px">● ZCAD (autorizare directă)</span>',
    'PUZ':            '<span style="color:#60a5fa;font-size:10px">● PUZ aprobat</span>',
    'PUG_plansa':     '<span style="color:#a78bfa;font-size:10px">● PUG — planșă</span>',
    'manual':         `<span style="color:#d4af37;font-size:10px">✎ manual — ${subzInfo?.urbanist || ''} · ${subzInfo?.ts ? subzInfo.ts.slice(0,10) : ''}</span>`,
  })[s] || `<span style="color:#64748b;font-size:10px">${s}</span>`;

  // ── formular atribuire ──
  const formHTML = `
    <div id="bt-subzona-form" style="margin-top:10px;padding:10px;background:#080f1c;border-radius:9px;border:1px solid rgba(212,175,55,.2)">
      <div style="font-size:10px;font-weight:700;color:#d4af37;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Atribuie subzonă manual</div>
      <div style="margin-bottom:6px">
        <label style="font-size:10px;color:#64748b;display:block;margin-bottom:3px">Subzonă</label>
        <select id="bt-sel-subzona" style="width:100%;background:#0b1220;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:6px;padding:5px 8px;font-size:11px">
          ${subzonePosib.map(s => `<option value="${s.cod}" ${s.cod===subzInfo?.cod?'selected':''}>${s.cod} — ${(s.denumire||'').slice(0,55)}</option>`).join('')}
        </select>
      </div>
      <div style="margin-bottom:6px">
        <label style="font-size:10px;color:#64748b;display:block;margin-bottom:3px">Sursă atribuire</label>
        <select id="bt-sel-sursa" style="width:100%;background:#0b1220;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:6px;padding:5px 8px;font-size:11px">
          <option value="manual">Manual (urbanist)</option>
          <option value="ZCAD">ZCAD (autorizare directă)</option>
          <option value="PUZ">PUZ aprobat</option>
          <option value="PUG_plansa">PUG — planșă</option>
        </select>
      </div>
      <div style="margin-bottom:6px">
        <label style="font-size:10px;color:#64748b;display:block;margin-bottom:3px">Urbanist / Operator</label>
        <input id="bt-inp-urbanist" type="text" placeholder="Nume urbanist…"
          value="${subzInfo?.urbanist || localStorage.getItem('ux_user') || ''}"
          style="width:100%;background:#0b1220;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:6px;padding:5px 8px;font-size:11px;box-sizing:border-box"/>
      </div>
      <div style="margin-bottom:8px">
        <label style="font-size:10px;color:#64748b;display:block;margin-bottom:3px">Notă (opțional)</label>
        <input id="bt-inp-nota" type="text" placeholder="e.g. HCL nr. 45/2026, PUZ aprobat…"
          value="${subzInfo?.nota || ''}"
          style="width:100%;background:#0b1220;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:6px;padding:5px 8px;font-size:11px;box-sizing:border-box"/>
      </div>
      <div style="display:flex;gap:6px">
        <button onclick="window._RLU_BT?.saveAtribuire('${nrCad}','${utrCod}')"
          style="flex:1;padding:7px;background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.4);color:#d4af37;border-radius:7px;cursor:pointer;font-size:11px;font-weight:700">
          💾 Salvează
        </button>
        ${subzInfo?.sursa !== 'auto_dominanta' ? `<button onclick="window._RLU_BT?.stergeAtribuire('${nrCad}')"
          style="padding:7px 10px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:7px;cursor:pointer;font-size:11px">
          ✕ Șterge
        </button>` : ''}
      </div>
    </div>`;

  panel.innerHTML = `
    <!-- ── Header UTR ── -->
    <div style="padding:10px 12px 8px;border-bottom:1px solid rgba(255,255,255,.06)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <div style="font-size:13px;font-weight:700;color:#d4af37">UTR ${utrCod || '—'}</div>
        <div style="font-size:10px;color:#475569">${utrData.sup_ha || '—'} ha</div>
      </div>
      <div style="font-size:11px;color:#94a3b8;line-height:1.4">${utrData.denumire || '—'}</div>
      ${nrCad ? `<div style="font-size:10px;color:#475569;margin-top:3px">Nr. cad: <span style="color:#64748b">${nrCad}</span></div>` : ''}
    </div>

    <!-- ── Subzone posibile ── -->
    <div style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06)">
      <div style="font-size:10px;font-weight:700;color:#64748b;letter-spacing:.06em;text-transform:uppercase;margin-bottom:5px">
        Subzone admise în UTR <span style="font-weight:400;color:#475569">(★ = dominantă)</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:2px">${chipsHTML}</div>
    </div>

    <!-- ── Subzonă selectată ── -->
    <div style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <div style="font-size:10px;font-weight:700;color:#d4af37;letter-spacing:.06em;text-transform:uppercase">
          Subzonă curentă: <span style="font-size:12px;letter-spacing:0">${subzInfo?.cod || '—'}</span>
        </div>
        ${_sursa(subzInfo?.sursa || '')}
      </div>
      <div style="font-size:11px;color:#64748b;margin-bottom:8px;line-height:1.4">${sz.denumire || '—'}</div>

      <!-- Parametri urbanistici -->
      <div style="background:#080f1c;border-radius:8px;padding:8px 10px">
        ${row('POT max',    sz.pot_baza    != null ? sz.pot_baza + '%'  : null, sz.pot_cumulat ? `(max cumulat ${sz.pot_cumulat}%)` : null)}
        ${row('CUT max',    sz.cut_baza    != null ? sz.cut_baza        : null, sz.cut_cumulat ? `(max cumulat ${sz.cut_cumulat})` : null)}
        ${row('H max',      sz.hmax_m      != null ? sz.hmax_m + ' m'  : null, sz.regim ? `— ${sz.regim}` : null)}
        ${row('Niv. max',   sz.niv_max     != null ? sz.niv_max        : null, null)}
        ${row('Spații verzi min', sz.spatii_verzi_pct != null ? sz.spatii_verzi_pct + '% din ST' : null, null)}
        ${row('Parcaje min', sz.parcaje_min || null, null)}
        ${row('Suprafață min parcelă', sz.suprafata_min_mp != null ? sz.suprafata_min_mp + ' mp' : null,
              sz.lung_min_aliniament_m ? `(lung. front min ${sz.lung_min_aliniament_m}m, adânc. min ${sz.adancime_min_m}m)` : null)}
        ${row('Aliniament', sz.aliniament_note || 'prin PA/PUZ+R', null)}
        ${sz.cut_note ? `<div style="font-size:10px;color:#475569;margin-top:4px;line-height:1.4">${sz.cut_note}</div>` : ''}
        ${sz.spatii_verzi_note ? `<div style="font-size:10px;color:#475569;margin-top:2px">${sz.spatii_verzi_note}</div>` : ''}
      </div>
    </div>

    <!-- ── Avize necesare ── -->
    ${utrData.avize && utrData.avize.length ? `
    <div style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06)">
      <div style="font-size:10px;font-weight:700;color:#64748b;letter-spacing:.06em;text-transform:uppercase;margin-bottom:5px">Avize necesare</div>
      <ul style="margin:0;padding-left:14px;list-style-type:disc">
        ${utrData.avize.map(a => `<li style="font-size:10px;color:#94a3b8;line-height:1.6">${a}</li>`).join('')}
      </ul>
    </div>` : ''}

    <!-- ── Interdicții ── -->
    ${utrData.interdictii ? `
    <div style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06)">
      <div style="font-size:10px;font-weight:700;color:#f59e0b;letter-spacing:.06em;text-transform:uppercase;margin-bottom:4px">⚠ Interdicții temporare de construire</div>
      <div style="font-size:10px;color:#94a3b8;line-height:1.5">${utrData.interdictii}</div>
    </div>` : ''}

    <!-- ── Formular atribuire ── -->
    <div style="padding:8px 12px">
      ${utrCod && subzonePosib.length > 0 ? formHTML : '<div style="font-size:11px;color:#475569;padding:4px 0">Selectați o parcelă cu UTR identificat pentru a atribui subzona.</div>'}

      <!-- Referință RLUB -->
      <div style="margin-top:8px;font-size:10px;color:#334155;line-height:1.4">${utrData.ref || ''}</div>

      <!-- Export audit -->
      <button onclick="window._RLU_BT?.exportAudit()"
        style="margin-top:8px;width:100%;padding:5px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:#475569;border-radius:6px;cursor:pointer;font-size:10px">
        ↓ Export audit (JSON)
      </button>
    </div>
  `;
}

// Selectare rapidă subzonă din chips (fără formular complet)
function _selectSubzonaFromChip(cod) {
  const sel = document.getElementById('bt-sel-subzona');
  if (sel) {
    sel.value = cod;
    // Scroll la formular
    document.getElementById('bt-subzona-form')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Salvare din formular
function _saveAtribuire(nrCad, utrCod) {
  const subzonaCod = document.getElementById('bt-sel-subzona')?.value;
  const sursa      = document.getElementById('bt-sel-sursa')?.value || 'manual';
  const urbanist   = document.getElementById('bt-inp-urbanist')?.value?.trim() || 'Urbanist UrbanX';
  const nota       = document.getElementById('bt-inp-nota')?.value?.trim() || '';

  if (!subzonaCod) {
    window.ss?.('⚠ Selectați o subzonă mai întâi');
    return;
  }

  atribuieSubzona(nrCad, subzonaCod, { sursa, urbanist, nota, utr_cod: utrCod });

  // Salvăm urbanistul în localStorage pentru precompletare ulterioară
  localStorage.setItem('ux_user', urbanist);

  window.ss?.(`✅ Subzonă ${subzonaCod} atribuită parcelei ${nrCad}`);

  // Re-randăm panoul cu noile date
  const subzInfo = getSubzonaParcelei(nrCad, utrCod);
  const utrData  = getUTR(utrCod) || {};
  _renderUTRPanel(nrCad, utrCod, utrData, subzInfo, null);
}


// ── 8. ACTUALIZARE DATABUS PENTRU O PARCELĂ ──────────────────────────────────

function _updateDataBusForParcel(nrCad) {
  // Re-triggerăm DataBus dacă parcela curentă e cea actualizată
  const bus = window._RV_DataBus;
  if (!bus || !bus.isReady()) return;
  const d = bus.get();
  if (!d || d.nrCad !== nrCad) return;

  // Re-apelăm update cu building și P din starea curentă
  // (building vine din AEDIS, P din S.parcels[activeParcel])
  const ap = window.S?.parcels?.[window.S.activeParcel ?? 0];
  const building = window.AEDIS?.lastBuilding || window.S?.vol;
  const P = ap?.params;
  if (building && P) {
    bus.update(building, P);
  }
}


// ── 9. HOOK SCHIMBARE UAT ────────────────────────────────────────────────────

function _hookUATChange() {
  // Ascultă pentru schimbarea UAT-ului
  document.addEventListener('urbanx:uat-changed', (e) => {
    const newKey = e.detail?.cityKey;
    if (newKey === UAT_KEY && !_ready) {
      _init();
    }
  });

  // Ascultă și pentru TCI city change
  const _origTCISel = window.TCI?._selPick;
  if (window.TCI && typeof _origTCISel === 'function') {
    window.TCI._selPick = function (...args) {
      const result = _origTCISel.apply(this, args);
      setTimeout(() => {
        const key = localStorage.getItem('ux_last_city');
        if (key === UAT_KEY && !_ready) _init();
      }, 500);
      return result;
    };
  }
}


// ── 10. API PUBLIC ───────────────────────────────────────────────────────────

window._RLU_BT = {
  version:             VERSION,
  // Date
  getReguli:           ()        => _reguli,
  getUTR:              (cod)     => getUTR(cod),
  getSubzona:          (cod)     => getSubzona(cod),
  getSubzonePosibile:  (utrCod)  => getSubzonePosibile(utrCod),
  getSubzonaParcelei:  (nrCad, utrCod) => getSubzonaParcelei(nrCad, utrCod),
  // Lookup spațial
  lookupUTR:           (pt)      => _lookupUTR(pt),
  // Audit
  atribuieSubzona,
  stergeAtribuire,
  exportAudit,
  importAudit,
  getAudit:            ()        => ({ ..._audit }),
  // UI
  selectSubzona:       (cod)     => _selectSubzonaFromChip(cod),
  saveAtribuire:       (nrCad, utrCod) => _saveAtribuire(nrCad, utrCod),
  renderUTRPanel:      (nrCad, utrCod) => {
    const utrData  = getUTR(utrCod) || {};
    const subzInfo = getSubzonaParcelei(nrCad, utrCod);
    _renderUTRPanel(nrCad, utrCod, utrData, subzInfo, null);
  },
  // Stare
  isReady:             ()        => _ready,
  // Util
  refreshParcel:       (nrCad)   => _updateDataBusForParcel(nrCad),
  processParcel:       (parcel)  => _processParcelForRLU(parcel),
};

console.log('[RLU-BT] Module loaded v' + VERSION + ' — apelează _RLU_BT.isReady() după încărcarea UAT Botoșani');


// ── START ────────────────────────────────────────────────────────────────────

// Inițializare automată dacă Botoșani e deja activ
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(_init, 800));
} else {
  setTimeout(_init, 800);
}

// Re-încearcă și după load complet (pentru cazuri de race condition)
window.addEventListener('load', () => setTimeout(_init, 1500));

})();
