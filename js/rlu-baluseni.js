/**
 * rlu-baluseni.js — UrbanX RLU Comuna Bălușeni v1.0
 * UAT: RO-BT-COM-BALUSENI
 * Sursa: PUG nr. 283/2008 — S.C. Pro Activ Consulting S.R.L. Iași
 * 40 UTR-uri (10 Bălușeni + 7 Draxini + 2 Bălușeni Noi + 9 Zăicești + 9 Buzeni + 3 Coșuleni)
 * Autor: UrbanX Platform — 2026
 */
(function () {
  'use strict';

  const UAT_KEY    = 'RO-BT-18073';
  const REGULI_URL = 'data/comuna-baluseni/reguli.json';
  const AUDIT_KEY  = 'ux_baluseni_subzona_audit';

  /* ── State ─────────────────────────────────────────────────────────── */
  let _reguli  = null;
  let _audit   = {};
  let _ready   = false;

  /* ── Init ───────────────────────────────────────────────────────────── */
  function _init () {
    const activeKey = window.TCI?.cityKey
      || localStorage.getItem('ux_last_city')
      || window._ProjectionEngine?.currentCity;

    if (activeKey !== UAT_KEY) return;

    _loadAudit();
    _fetchReguli();
  }

  function _fetchReguli () {
    fetch(REGULI_URL)
      .then(r => {
        if (!r.ok) throw new Error('[RLU-BAL] reguli.json nu s-a putut încărca: ' + r.status);
        return r.json();
      })
      .then(data => {
        _reguli = data;
        _ready  = true;
        _patchDataBus();
        console.log('[RLU-BAL] ✅ Reguli Bălușeni încărcate —', Object.keys(data.utrs || {}).length, 'UTR-uri');
      })
      .catch(err => console.warn('[RLU-BAL]', err));
  }

  /* ── Audit localStorage ─────────────────────────────────────────────── */
  function _loadAudit () {
    try {
      const raw = localStorage.getItem(AUDIT_KEY);
      _audit = raw ? JSON.parse(raw) : {};
    } catch (e) {
      _audit = {};
    }
  }

  function _saveAudit () {
    try {
      localStorage.setItem(AUDIT_KEY, JSON.stringify(_audit));
    } catch (e) {
      console.warn('[RLU-BAL] Nu s-a putut salva auditul:', e);
    }
  }

  /* ── Lookup UTR după sat + nr ────────────────────────────────────────── */
  function getUTR (utrCod) {
    if (!_reguli) return null;
    return _reguli.utrs?.[utrCod] || null;
  }

  function getSubzona (cod) {
    if (!_reguli) return null;
    return _reguli.subzone?.[cod] || null;
  }

  function getSubzonePosibile (utrCod) {
    const utr = getUTR(utrCod);
    if (!utr) return [];
    const lista = utr.subzone_admise || [utr.fn_dominanta];
    return lista.map(cod => ({
      cod,
      ...(getSubzona(cod) || {}),
      dominanta: cod === utr.fn_dominanta
    }));
  }

  function getSubzonaParcelei (nrCad, utrCod) {
    if (_audit[nrCad]) return _audit[nrCad];
    const utr = getUTR(utrCod);
    if (!utr) return null;
    const cod = utr.fn_dominanta;
    return {
      subzona_cod: cod,
      subzona_sursa: 'auto',
      ...(getSubzona(cod) || {})
    };
  }

  function atribuieSubzona (nrCad, cod, opts = {}) {
    _audit[nrCad] = {
      subzona_cod:      cod,
      urbanist:         opts.urbanist  || '',
      sursa:            opts.sursa     || 'manual',
      nota:             opts.nota      || '',
      ts:               new Date().toISOString(),
      ...(getSubzona(cod) || {})
    };
    _saveAudit();
    return _audit[nrCad];
  }

  function stergeAtribuire (nrCad) {
    delete _audit[nrCad];
    _saveAudit();
  }

  /* ── Export / import audit ───────────────────────────────────────────── */
  function exportAudit () {
    const blob = new Blob([JSON.stringify(_audit, null, 2)], { type: 'application/json' });
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = 'audit-baluseni-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importAudit (file) {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const imported = JSON.parse(e.target.result);
        _audit = Object.assign({}, _audit, imported);
        _saveAudit();
        console.log('[RLU-BAL] Audit importat —', Object.keys(imported).length, 'înregistrări');
      } catch (err) {
        console.warn('[RLU-BAL] Eroare import audit:', err);
      }
    };
    reader.readAsText(file);
  }

  /* ── DataBus patch ───────────────────────────────────────────────────── */
  function _patchDataBus () {
    if (!_reguli) return;
    const DB = window._DataBus || window.DataBus;
    if (!DB) return;

    const origCompute = DB._compute || DB.compute;
    if (!origCompute || origCompute._balPatched) return;

    DB._compute = function (parcelData, opts) {
      const result = origCompute.call(this, parcelData, opts);

      const activeKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city');
      if (activeKey !== UAT_KEY) return result;
      if (result._bal_patched) return result;

      const utrCod = parcelData?.utr_cod || parcelData?.utr || null;
      const nrCad  = parcelData?.nr_cad  || parcelData?.nrCad || null;
      const meta   = _reguli._meta || {};

      const utr    = utrCod ? getUTR(utrCod) : null;
      const sz     = utrCod && nrCad ? getSubzonaParcelei(nrCad, utrCod) : null;
      const szObj  = sz?.subzona_cod ? getSubzona(sz.subzona_cod) : null;

      Object.assign(result, {
        uat:              meta.uat        || 'Comuna Bălușeni',
        uat_key:          UAT_KEY,
        ag:               meta.seismic?.ag || 0.2,
        Tc:               meta.seismic?.Tc || 1.4,
        zonaSeism:        meta.seismic?.zona || 'D',
        hdd:              meta.hdd || 2900,
        judet:            meta.judet || 'Botoșani',
        sate:             (meta.sate || []).join(', '),

        utr_cod:          utrCod,
        utr_sat:          utr?.sat        || '',
        utr_denumire:     utr?.denumire   || '',
        fn_dominanta:     utr?.fn_dominanta || '',
        avize_necesare:   utr?.avize      || [],
        interdictii:      utr?.interdictii || '',
        utr_ref:          utr?.ref        || '',

        subzona_cod:      sz?.subzona_cod  || '',
        subzona_sursa:    sz?.sursa        || '',
        subzona_urbanist: sz?.urbanist     || '',
        subzona_ts:       sz?.ts           || '',

        pot_max:          szObj?.pot_max   ?? utr?.pot_max   ?? 30,
        cut_max:          szObj?.cut_max   ?? utr?.cut_max   ?? 0.90,
        hmax_m:           szObj?.hmax_m    ?? utr?.hmax_m    ?? 9,
        niv_max:          szObj?.niv_max   ?? utr?.niv_max   ?? 3,
        sup_min_parcela:  szObj?.sup_min_mp ?? utr?.sup_min_mp ?? 300,
        front_min_m:      szObj?.front_min_m ?? utr?.front_min_m ?? 12,
        aliniament_note:  utr?.aliniament_note || '',
        regim_constructie: szObj?.regim || '',

        subzone_posibile: utrCod ? getSubzonePosibile(utrCod) : [],

        _bal_patched: true
      });

      return result;
    };
    DB._compute._balPatched = true;
    console.log('[RLU-BAL] DataBus patch aplicat');
  }

  /* ── UI în panel UTR ─────────────────────────────────────────────────── */
  function _renderUTRPanel (utrCod, nrCad) {
    const container = document.getElementById('tc-utr');
    if (!container || !_reguli) return;

    const utr = getUTR(utrCod);
    if (!utr) return;

    const szActuala  = nrCad ? getSubzonaParcelei(nrCad, utrCod) : null;
    const szPosibile = getSubzonePosibile(utrCod);
    const szCod      = szActuala?.subzona_cod;

    container.innerHTML = `
      <div style="padding:12px;font-family:sans-serif;font-size:13px">
        <div style="font-weight:700;font-size:14px;margin-bottom:6px">
          ${utr.sat} — UTR ${utr.nr_utr}: ${utr.denumire}
        </div>

        <div style="margin-bottom:8px">
          ${szPosibile.map(s => `
            <span style="display:inline-block;margin:2px;padding:3px 8px;border-radius:12px;
              background:${s.cod === szCod ? '#2563eb' : s.dominanta ? '#dbeafe' : '#f3f4f6'};
              color:${s.cod === szCod ? '#fff' : '#1e40af'};font-size:11px;cursor:pointer"
              onclick="window._RLU_BAL?.selectSubzona?.('${nrCad}','${utrCod}','${s.cod}')">
              ${s.dominanta ? '★ ' : ''}${s.cod}
            </span>
          `).join('')}
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:12px">
          <tr><td style="color:#666;padding:3px 6px">POT max</td><td style="font-weight:600">${utr.pot_max}%</td></tr>
          <tr><td style="color:#666;padding:3px 6px">CUT max</td><td style="font-weight:600">${utr.cut_max}</td></tr>
          <tr><td style="color:#666;padding:3px 6px">H max</td><td style="font-weight:600">${utr.hmax_m}m (${utr.niv_max} niv.)</td></tr>
          ${utr.sup_min_mp ? `<tr><td style="color:#666;padding:3px 6px">Sc. min parcelă</td><td>${utr.sup_min_mp} mp</td></tr>` : ''}
          ${utr.front_min_m ? `<tr><td style="color:#666;padding:3px 6px">Front min</td><td>${utr.front_min_m} m</td></tr>` : ''}
          ${utr.aliniament_note ? `<tr><td style="color:#666;padding:3px 6px">Aliniere</td><td>${utr.aliniament_note}</td></tr>` : ''}
        </table>

        ${utr.avize?.length ? `
          <div style="margin-top:8px;font-size:11px;color:#b45309;background:#fef3c7;padding:6px;border-radius:6px">
            <b>Avize necesare:</b> ${utr.avize.join('; ')}
          </div>` : ''}

        ${utr.interdictii ? `
          <div style="margin-top:6px;font-size:11px;color:#991b1b;background:#fee2e2;padding:6px;border-radius:6px">
            <b>Interdicții:</b> ${utr.interdictii}
          </div>` : ''}

        <div style="margin-top:10px;font-size:10px;color:#9ca3af">
          Ref: ${utr.ref || '—'}
        </div>

        <div style="margin-top:10px;border-top:1px solid #e5e7eb;padding-top:8px;font-size:11px">
          <b>Atribuire manuală subzonă:</b><br>
          <select id="bal-sz-select" style="width:100%;margin:4px 0;padding:4px">
            ${szPosibile.map(s => `<option value="${s.cod}" ${s.cod===szCod?'selected':''}>${s.cod} — ${s.denumire||'—'}</option>`).join('')}
          </select>
          <input id="bal-sz-sursa"    placeholder="Sursă (ex: PUZ, HCL)" style="width:100%;padding:4px;margin:2px 0">
          <input id="bal-sz-urbanist" placeholder="Urbanist" style="width:100%;padding:4px;margin:2px 0">
          <input id="bal-sz-nota"     placeholder="Notă" style="width:100%;padding:4px;margin:2px 0">
          <button onclick="window._RLU_BAL?.saveAtribuire?.('${nrCad}','${utrCod}')"
            style="background:#2563eb;color:#fff;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;width:100%;margin-top:4px">
            Salvează atribuire
          </button>
          <button onclick="window._RLU_BAL?.exportAudit?.()"
            style="background:#f3f4f6;border:1px solid #d1d5db;padding:4px 8px;border-radius:6px;cursor:pointer;width:100%;margin-top:4px;font-size:11px">
            📥 Export audit JSON
          </button>
        </div>
      </div>
    `;
  }

  /* ── Hook parcelă click ─────────────────────────────────────────────── */
  function _hookParcela () {
    const origHook = window._onParcelaSelected;
    if (typeof origHook !== 'function' || origHook._balHooked) return;

    window._onParcelaSelected = function (data) {
      origHook.call(this, data);
      const activeKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city');
      if (activeKey !== UAT_KEY || !_ready) return;

      const utrCod = data?.utr_cod || data?.utr || null;
      const nrCad  = data?.nr_cad  || data?.nrCad || null;
      if (utrCod) _renderUTRPanel(utrCod, nrCad);
    };
    window._onParcelaSelected._balHooked = true;
  }

  /* ── Public API ─────────────────────────────────────────────────────── */
  function selectSubzona (nrCad, utrCod, cod) {
    // Actualizează chip-ul vizual
    _renderUTRPanel(utrCod, nrCad);
  }

  function saveAtribuire (nrCad, utrCod) {
    const cod      = document.getElementById('bal-sz-select')?.value;
    const sursa    = document.getElementById('bal-sz-sursa')?.value;
    const urbanist = document.getElementById('bal-sz-urbanist')?.value;
    const nota     = document.getElementById('bal-sz-nota')?.value;
    if (!cod) return;
    atribuieSubzona(nrCad, cod, { sursa, urbanist, nota });
    _renderUTRPanel(utrCod, nrCad);
  }

  window._RLU_BAL = {
    getUTR,
    getSubzona,
    getSubzonePosibile,
    getSubzonaParcelei,
    atribuieSubzona,
    stergeAtribuire,
    exportAudit,
    importAudit,
    selectSubzona,
    saveAtribuire,
    isReady: () => _ready
  };

  /* ── Bootstrap ──────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { _init(); setTimeout(_hookParcela, 1200); });
  } else {
    _init();
    setTimeout(_hookParcela, 1200);
  }

  window.addEventListener('ux:city_changed', () => { _init(); });

  console.log('[RLU-BAL] Module Bălușeni v1.0 încărcat');
})();
