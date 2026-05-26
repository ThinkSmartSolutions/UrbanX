/**
 * UrbanX — RLU Comuna Miroslava, Județul Iași
 * UAT Key: RO-IS-COM-MIROSLAVA
 * Bazat pe: Regulament Local de Urbanism, Reactualizare PUG, Proiect 10/15.02.2010
 * Elaborat: Blom Romania
 * Generat: 2026-05-25
 *
 * Structura identică cu rlu-botosani.js (DataBus patch non-distructiv)
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────── */
  const UAT_KEY    = 'RO-IS-95042';
  const UAT_NAME   = 'Comuna Miroslava';
  const JUDET      = 'Iași';
  const REGULI_URL = 'data/comuna-miroslava/reguli.json';
  const AUDIT_KEY  = 'ux_miroslava_subzona_audit';

  /* ─────────────────────────────────────────────
     STATE
  ───────────────────────────────────────────── */
  let _reguli  = null;   // datele din reguli.json
  let _audit   = {};     // { nrCad: { subzona_cod, urbanist, sursa, nota, ts } }
  let _patched = false;  // DataBus patch aplicat o singură dată
  let _ready   = false;

  /* ─────────────────────────────────────────────
     INIT — pornit automat dacă UAT activ = RO-IS-COM-MIROSLAVA
  ───────────────────────────────────────────── */
  function _init() {
    // Verificăm dacă suntem pe UAT-ul potrivit
    const S = window.UrbanX || window._S || {};
    const activeUAT = (S.activeUAT || S.uat_key || '');
    if (activeUAT && activeUAT !== UAT_KEY) return;

    _loadReguli().then(() => {
      _loadAudit();
      _patchDataBus();
      _hookParcela();
      _ready = true;
      console.info(`[RLU Miroslava] Ready. ${Object.keys(_reguli.subzone || {}).length} subzone.`);
    }).catch(e => {
      console.error('[RLU Miroslava] Eroare încărcare reguli.json:', e);
    });
  }

  /* ─────────────────────────────────────────────
     FETCH reguli.json
  ───────────────────────────────────────────── */
  async function _loadReguli() {
    const resp = await fetch(REGULI_URL);
    if (!resp.ok) throw new Error(`HTTP ${resp.status} la ${REGULI_URL}`);
    _reguli = await resp.json();
  }

  /* ─────────────────────────────────────────────
     AUDIT — localStorage
  ───────────────────────────────────────────── */
  function _loadAudit() {
    try {
      const raw = localStorage.getItem(AUDIT_KEY);
      _audit = raw ? JSON.parse(raw) : {};
    } catch (e) {
      _audit = {};
    }
  }

  function _saveAudit() {
    try {
      localStorage.setItem(AUDIT_KEY, JSON.stringify(_audit));
    } catch (e) {
      console.warn('[RLU Miroslava] Nu s-a putut salva auditul:', e);
    }
  }

  /* ─────────────────────────────────────────────
     LOOKUP SPAȚIAL — parcelă → subzonă
     Folosește pugIdx din DataBus / _loadPUGOnMap()
  ───────────────────────────────────────────── */
  function _pointInPolygon(pt, poly) {
    let inside = false;
    const [x, y] = pt;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i];
      const [xj, yj] = poly[j];
      if (((yi > y) !== (yj > y)) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
    return inside;
  }

  function _lookupSubzona(lngLat) {
    const S = window.UrbanX || window._S || {};
    const idx = S.pugIdx || S._pugIdx || null;
    if (!idx || !lngLat) return null;

    const pt = [lngLat[0], lngLat[1]];
    for (const feature of idx) {
      const geom = feature.geometry;
      if (!geom) continue;
      const props = feature.properties || {};
      const subzonaCod = props.subzona || props.subzona_cod || props.zona || null;

      let rings = [];
      if (geom.type === 'Polygon') rings = [geom.coordinates[0]];
      else if (geom.type === 'MultiPolygon') rings = geom.coordinates.map(p => p[0]);

      for (const ring of rings) {
        if (_pointInPolygon(pt, ring)) return subzonaCod;
      }
    }
    return null;
  }

  /* ─────────────────────────────────────────────
     API CORE
  ───────────────────────────────────────────── */

  /** Returnează obiectul subzonă din reguli.json */
  function getSubzona(cod) {
    if (!_reguli) return null;
    return (_reguli.subzone || {})[cod] || null;
  }

  /** Returnează lista subzonelor posibile pentru un cod de subzonă dat
   *  (în Miroslava nu avem UTR-uri cu subzone multiple ca la Botoșani —
   *   structura e flat per subzonă, deci returnăm subzona singulară) */
  function getSubzonePosibile(subzonaCod) {
    if (!subzonaCod || !_reguli) return [];
    const sz = getSubzona(subzonaCod);
    if (!sz) return [];
    return [{ cod: subzonaCod, ...sz, dominanta: true }];
  }

  /** Returnează subzona atribuită unei parcele (din audit sau auto din PUG) */
  function getSubzonaParcelei(nrCad, lngLat) {
    if (_audit[nrCad]) {
      return { ..._audit[nrCad], sursa_tip: 'audit' };
    }
    if (lngLat) {
      const cod = _lookupSubzona(lngLat);
      if (cod) return { subzona_cod: cod, sursa: 'PUG-auto', sursa_tip: 'auto' };
    }
    return null;
  }

  /** Atribuie manual subzona unei parcele */
  function atribuieSubzona(nrCad, cod, opts = {}) {
    if (!nrCad || !cod) return false;
    _audit[nrCad] = {
      subzona_cod: cod,
      urbanist:   opts.urbanist || '',
      sursa:      opts.sursa    || 'manual',
      nota:       opts.nota     || '',
      ts:         new Date().toISOString()
    };
    _saveAudit();
    return true;
  }

  /** Șterge atribuirea manuală a unei parcele */
  function stergeAtribuire(nrCad) {
    delete _audit[nrCad];
    _saveAudit();
  }

  /** Export audit JSON */
  function exportAudit() {
    const blob = new Blob([JSON.stringify(_audit, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `audit-miroslava-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /** Import audit JSON (merge cu cel existent) */
  async function importAudit(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          _audit = { ..._audit, ...data };
          _saveAudit();
          resolve(Object.keys(data).length);
        } catch (err) { reject(err); }
      };
      fr.onerror = reject;
      fr.readAsText(file);
    });
  }

  /* ─────────────────────────────────────────────
     DATABUS PATCH — adaugă câmpuri în _computed
  ───────────────────────────────────────────── */
  function _patchDataBus() {
    if (_patched) return;
    const S = window.UrbanX || window._S;
    if (!S || typeof S.on !== 'function') return;

    S.on('parcela:selected', (parcela) => {
      if ((S.activeUAT || S.uat_key) !== UAT_KEY) return;

      const nrCad  = parcela.nr_cad || parcela.NR_CAD || parcela.nrCad || '';
      const lngLat = parcela._lngLat || parcela.centroid || null;
      const subzInfo = getSubzonaParcelei(nrCad, lngLat);
      const subzonaCod = subzInfo ? subzInfo.subzona_cod : (_lookupSubzona(lngLat) || '');
      const sz = getSubzona(subzonaCod);

      const computed = {
        // Meta UAT
        uat:            UAT_NAME,
        uat_key:        UAT_KEY,
        judet:          JUDET,
        ag:             (_reguli._meta || {}).seismic?.ag    || 0.20,
        Tc:             (_reguli._meta || {}).seismic?.Tc    || 1.0,
        zonaSeism:      (_reguli._meta || {}).seismic?.zona  || 'E',
        hdd:            (_reguli._meta || {}).hdd            || 3000,

        // Subzonă
        subzona_cod:      subzonaCod,
        subzona_denumire: sz ? sz.denumire       : '',
        subzona_sursa:    subzInfo ? subzInfo.sursa    : '',
        subzona_urbanist: subzInfo ? subzInfo.urbanist : '',
        subzona_ts:       subzInfo ? subzInfo.ts       : '',

        // Indicatori urbanistici
        pot_max:          sz ? (sz.pot_max           || sz.pot_max_p3m  || null) : null,
        cut_max:          sz ? (sz.cut_max           || sz.cut_max_p3m  || null) : null,
        hmax_m:           sz ? sz.hmax_m             : null,
        niv_max:          sz ? sz.niv_max            : '',
        regim_constructie: sz ? sz.regim_constructie : '',

        // Parcele minime
        sup_min_parcela_insiruit:  sz ? (sz.sup_min_insiruit_mp || sz.sup_min_mp || null) : null,
        front_min_insiruit:        sz ? (sz.front_min_insiruit_m || sz.front_min_m || null) : null,
        sup_min_parcela_cuplat:    sz ? sz.sup_min_cuplat_mp  : null,
        front_min_cuplat:          sz ? sz.front_min_cuplat_m : null,
        sup_min_parcela_izolat:    sz ? sz.sup_min_izolat_mp  : null,
        front_min_izolat:          sz ? sz.front_min_izolat_m : null,

        // Retrageri
        retragere_aliniament_min_m:   sz ? sz.retragere_aliniament_min_m   : null,
        retragere_laterala_min_m:     sz ? sz.retragere_laterala_min_m     : null,
        retragere_posterioara_min_m:  sz ? sz.retragere_posterioara_min_m  : null,

        // Spații verzi și parcaje
        sv_min_pct:        sz ? (sz.sv_min_pct || 30) : 30,
        parcaje_locuinte:  (_reguli.conditii_generale || {}).parcaje_locuinte  || '1 loc / 80mp sup. locuibila',
        parcaje_institutii: (_reguli.conditii_generale || {}).parcaje_institutii || '1 loc / 60mp ADC',

        // Funcțiuni
        fn_admise:   sz ? (sz.fn_admise   || []) : [],
        fn_interzise: sz ? (sz.fn_interzise || []) : [],

        // Avize și restricții
        avize_necesare: sz ? (sz.avize || []) : [],
        interdictii:    sz ? (sz.interdictii || sz.note || '') : '',

        // Subzone posibile (în Miroslava = subzona curentă)
        subzone_posibile: subzonaCod ? getSubzonePosibile(subzonaCod) : []
      };

      // Injectăm în DataBus._computed
      if (S._computed) {
        Object.assign(S._computed, computed);
      } else if (typeof S.setComputed === 'function') {
        S.setComputed(computed);
      }

      // Randăm UI în panoul de parcelă
      _renderUI(parcela, subzonaCod, sz, subzInfo);
    });

    _patched = true;
  }

  /* ─────────────────────────────────────────────
     HOOK PARCELĂ — interceptăm click pe hartă
  ───────────────────────────────────────────── */
  function _hookParcela() {
    const S = window.UrbanX || window._S;
    if (!S) return;
    const orig = S._onParcelaClick;
    S._onParcelaClick = function (parcela) {
      if (typeof orig === 'function') orig.call(S, parcela);
      // Emitem evenimentul pentru DataBus patch
      if (typeof S.emit === 'function') S.emit('parcela:selected', parcela);
    };
  }

  /* ─────────────────────────────────────────────
     UI RENDER — #tc-utr sau #tc-parcela
  ───────────────────────────────────────────── */
  function _renderUI(parcela, subzonaCod, sz, subzInfo) {
    const panel = document.getElementById('tc-utr') || document.getElementById('tc-parcela');
    if (!panel) return;

    const nrCad = parcela.nr_cad || parcela.NR_CAD || parcela.nrCad || '—';
    const adresa = parcela.adresa || '';
    const supMp = parcela.suprafata_mp || parcela.sup_mp || '—';

    panel.innerHTML = `
      <div class="rlu-miroslava" style="font-family:sans-serif;font-size:13px;padding:8px;">

        <!-- HEADER PARCELĂ -->
        <div style="background:#2d6a4f;color:#fff;padding:8px 10px;border-radius:4px 4px 0 0;margin-bottom:8px;">
          <strong>📍 ${nrCad}</strong>${adresa ? ` — ${adresa}` : ''}
          ${supMp !== '—' ? `<br><span style="font-size:11px;">Suprafață: ${supMp} mp</span>` : ''}
        </div>

        <!-- SUBZONĂ -->
        ${subzonaCod ? `
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:4px;padding:8px;margin-bottom:8px;">
          <strong>Subzonă:</strong>
          <span style="background:#16a34a;color:#fff;padding:2px 8px;border-radius:12px;margin-left:6px;font-size:12px;">
            ${subzonaCod}
          </span>
          ${sz ? `<div style="font-size:11px;color:#555;margin-top:3px;">${sz.denumire}</div>` : ''}
          ${subzInfo && subzInfo.sursa_tip === 'audit' ? `
            <div style="font-size:11px;color:#166534;margin-top:4px;">
              ✅ Atribuită manual | Sursa: ${subzInfo.sursa} | ${subzInfo.urbanist ? 'Urb: ' + subzInfo.urbanist : ''}
              ${subzInfo.nota ? `<br>Notă: ${subzInfo.nota}` : ''}
            </div>
          ` : subzInfo && subzInfo.sursa_tip === 'auto' ? `
            <div style="font-size:11px;color:#9a3412;margin-top:4px;">⚠️ Subzonă determinată automat din PUG — verificați și atribuiți manual</div>
          ` : ''}
        </div>
        ` : `
        <div style="background:#fef9c3;border:1px solid #fde047;border-radius:4px;padding:8px;margin-bottom:8px;">
          ⚠️ Subzonă nedeterminată. Utilizați formularul de mai jos pentru atribuire manuală.
        </div>
        `}

        <!-- INDICATORI URBANISTICI -->
        ${sz ? `
        <div style="margin-bottom:8px;">
          <strong>Indicatori urbanistici</strong>
          <table style="width:100%;border-collapse:collapse;margin-top:4px;font-size:12px;">
            <tr style="background:#f9fafb;">
              <td style="padding:4px 6px;border:1px solid #e5e7eb;">POT max</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;font-weight:bold;">${sz.pot_max !== null && sz.pot_max !== undefined ? sz.pot_max + '%' : '—'}</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;">CUT max</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;font-weight:bold;">${sz.cut_max !== null && sz.cut_max !== undefined ? sz.cut_max : '—'}</td>
            </tr>
            <tr>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;">H max</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;font-weight:bold;">${sz.hmax_m !== null && sz.hmax_m !== undefined ? sz.hmax_m + 'm' : '—'}</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;">Regim</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;font-weight:bold;">${sz.niv_max || '—'}</td>
            </tr>
            <tr style="background:#f9fafb;">
              <td style="padding:4px 6px;border:1px solid #e5e7eb;">Sv min</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;font-weight:bold;">${sz.sv_min_pct !== undefined ? sz.sv_min_pct + '%' : '30%'}</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;">Retragere post.</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;font-weight:bold;">${sz.retragere_posterioara_min_m !== undefined ? sz.retragere_posterioara_min_m + 'm' : '—'}</td>
            </tr>
            ${sz.sup_min_insiruit_mp || sz.sup_min_mp ? `
            <tr>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;">Sup. min înș.</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;font-weight:bold;">${sz.sup_min_insiruit_mp || sz.sup_min_mp} mp</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;">Front min înș.</td>
              <td style="padding:4px 6px;border:1px solid #e5e7eb;font-weight:bold;">${sz.front_min_insiruit_m || sz.front_min_m || '—'} m</td>
            </tr>
            ` : ''}
          </table>
        </div>
        ` : ''}

        <!-- FUNCȚIUNI ADMISE / INTERZISE -->
        ${sz && sz.fn_admise && sz.fn_admise.length > 0 ? `
        <div style="margin-bottom:8px;">
          <strong>✅ Funcțiuni admise</strong>
          <div style="font-size:11px;color:#166534;margin-top:2px;line-height:1.5;">
            ${sz.fn_admise.slice(0, 6).map(f => `• ${f}`).join('<br>')}
            ${sz.fn_admise.length > 6 ? `<br><em>...și altele (${sz.fn_admise.length - 6} mai mult)</em>` : ''}
          </div>
        </div>
        ` : ''}

        ${sz && sz.fn_interzise && sz.fn_interzise.length > 0 ? `
        <div style="margin-bottom:8px;">
          <strong>🚫 Funcțiuni interzise</strong>
          <div style="font-size:11px;color:#9a3412;margin-top:2px;line-height:1.5;">
            ${sz.fn_interzise.slice(0, 4).map(f => `• ${f}`).join('<br>')}
            ${sz.fn_interzise.length > 4 ? `<br><em>...și altele (${sz.fn_interzise.length - 4} mai mult)</em>` : ''}
          </div>
        </div>
        ` : ''}

        <!-- AVIZE -->
        ${sz && sz.avize && sz.avize.length > 0 ? `
        <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:4px;padding:8px;margin-bottom:8px;">
          <strong>📋 Avize necesare</strong>
          <div style="font-size:11px;color:#c2410c;margin-top:2px;line-height:1.5;">
            ${sz.avize.map(a => `• ${a}`).join('<br>')}
          </div>
        </div>
        ` : ''}

        <!-- INTERDICȚII / NOTE -->
        ${sz && (sz.interdictii || sz.note) ? `
        <div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:4px;padding:8px;margin-bottom:8px;font-size:11px;color:#7f1d1d;">
          ⛔ ${sz.interdictii || sz.note}
        </div>
        ` : ''}

        <!-- FORMULAR ATRIBUIRE MANUALĂ -->
        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:4px;padding:8px;margin-bottom:8px;">
          <strong>✏️ Atribuire manuală subzonă</strong>
          <div style="margin-top:6px;">
            <label style="font-size:11px;display:block;margin-bottom:2px;">Subzonă</label>
            <select id="rlu-miro-subzona-sel" style="width:100%;padding:4px;font-size:12px;margin-bottom:6px;">
              <option value="">— selectați —</option>
              ${Object.keys(_reguli.subzone || {}).map(k => `
                <option value="${k}" ${k === subzonaCod ? 'selected' : ''}>${k} — ${(_reguli.subzone[k].denumire || '').slice(0,40)}</option>
              `).join('')}
            </select>
            <label style="font-size:11px;display:block;margin-bottom:2px;">Sursă (ex: PUZ HCL 12/2025)</label>
            <input id="rlu-miro-sursa" type="text" placeholder="Sursă" style="width:100%;padding:4px;font-size:12px;margin-bottom:6px;box-sizing:border-box;">
            <label style="font-size:11px;display:block;margin-bottom:2px;">Urbanist responsabil</label>
            <input id="rlu-miro-urbanist" type="text" placeholder="Urbanist" style="width:100%;padding:4px;font-size:12px;margin-bottom:6px;box-sizing:border-box;">
            <label style="font-size:11px;display:block;margin-bottom:2px;">Notă</label>
            <input id="rlu-miro-nota" type="text" placeholder="Notă" style="width:100%;padding:4px;font-size:12px;margin-bottom:6px;box-sizing:border-box;">
            <button id="rlu-miro-btn-save" style="background:#2d6a4f;color:#fff;border:none;padding:6px 14px;border-radius:4px;cursor:pointer;font-size:12px;margin-right:6px;">Salvează</button>
            ${subzInfo && subzInfo.sursa_tip === 'audit' ? `
              <button id="rlu-miro-btn-del" style="background:#dc2626;color:#fff;border:none;padding:6px 14px;border-radius:4px;cursor:pointer;font-size:12px;">Șterge atribuire</button>
            ` : ''}
          </div>
        </div>

        <!-- EXPORT AUDIT -->
        <div style="text-align:right;">
          <button id="rlu-miro-btn-export" style="background:#1e40af;color:#fff;border:none;padding:5px 12px;border-radius:4px;cursor:pointer;font-size:11px;">
            📥 Export Audit JSON
          </button>
        </div>

      </div>
    `;

    // Events
    const btnSave = document.getElementById('rlu-miro-btn-save');
    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const cod = document.getElementById('rlu-miro-subzona-sel').value;
        if (!cod) { alert('Selectați o subzonă!'); return; }
        atribuieSubzona(nrCad, cod, {
          sursa:    document.getElementById('rlu-miro-sursa').value,
          urbanist: document.getElementById('rlu-miro-urbanist').value,
          nota:     document.getElementById('rlu-miro-nota').value
        });
        alert(`Subzona ${cod} atribuită parcelei ${nrCad} ✓`);
        // Re-render
        const S = window.UrbanX || window._S;
        if (S && typeof S.emit === 'function') S.emit('parcela:selected', parcela);
      });
    }

    const btnDel = document.getElementById('rlu-miro-btn-del');
    if (btnDel) {
      btnDel.addEventListener('click', () => {
        if (confirm(`Ștergeți atribuirea subzonei pentru parcela ${nrCad}?`)) {
          stergeAtribuire(nrCad);
          const S = window.UrbanX || window._S;
          if (S && typeof S.emit === 'function') S.emit('parcela:selected', parcela);
        }
      });
    }

    const btnExport = document.getElementById('rlu-miro-btn-export');
    if (btnExport) {
      btnExport.addEventListener('click', exportAudit);
    }
  }

  /* ─────────────────────────────────────────────
     API PUBLIC window._RLU_MIROSLAVA
  ───────────────────────────────────────────── */
  window._RLU_MIROSLAVA = {
    getSubzona,
    getSubzonePosibile,
    getSubzonaParcelei,
    lookupSubzona:   _lookupSubzona,
    atribuieSubzona,
    stergeAtribuire,
    exportAudit,
    importAudit,
    isReady:         () => _ready,
    getReguli:       () => _reguli,
    getAudit:        () => ({ ..._audit }),
    UAT_KEY,
    UAT_NAME
  };

  /* ─────────────────────────────────────────────
     PORNIRE
  ───────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _init);
  } else {
    _init();
  }


  // ── Export window._RLU pentru compatibilitate cu platforma ──────────────
  window._RLU = window._RLU || {};
  window._RLU['RO-IS-95042'] = {
    getUTR:    typeof getUTR === 'function' ? getUTR : null,
    getSubzona:typeof getSubzona === 'function' ? getSubzona : null,
    isReady:   () => _ready,
    getReguli: () => _reguli,
    uat_key:   'RO-IS-95042'
  };

})();
