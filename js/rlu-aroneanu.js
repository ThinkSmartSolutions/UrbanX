/**
 * rlu-aroneanu.js — UrbanX RLU Comuna Aroneanu v1.0
 * UAT: RO-IS-COM-ARONEANU
 * Sursa: PUG nr. 14275/1997 — S.C. Habitat Proiect S.A. Iași (arh. Cristina Andrei)
 * 42 UTR-uri (12 Aroneanu + 10 Dorobanț + 7 Rediu Aldei + 13 Șorogari)
 * ATENȚIE: Aroneanu și Dorobanț — zona I/II aeroport Iași (restricții înălțime)
 * Autor: UrbanX Platform — 2026
 */
(function () {
  'use strict';

  const UAT_KEY    = 'RO-IS-94889';
  const REGULI_URL = 'data/comuna-aroneanu/reguli.json';
  const AUDIT_KEY  = 'ux_aroneanu_subzona_audit';

  /* ── State ─────────────────────────────────────────────────────────── */
  let _reguli = null;
  let _audit  = {};
  let _ready  = false;

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
        if (!r.ok) throw new Error('[RLU-ARO] reguli.json nu s-a putut încărca: ' + r.status);
        return r.json();
      })
      .then(data => {
        _reguli = data;
        _ready  = true;
        _patchDataBus();
        console.log('[RLU-ARO] ✅ Reguli Aroneanu încărcate —', Object.keys(data.utrs || {}).length, 'UTR-uri');
      })
      .catch(err => console.warn('[RLU-ARO]', err));
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
      console.warn('[RLU-ARO] Nu s-a putut salva auditul:', e);
    }
  }

  /* ── Lookup ──────────────────────────────────────────────────────────── */
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
      subzona_cod:  cod,
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
    a.download = 'audit-aroneanu-' + new Date().toISOString().slice(0, 10) + '.json';
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
        console.log('[RLU-ARO] Audit importat —', Object.keys(imported).length, 'înregistrări');
      } catch (err) {
        console.warn('[RLU-ARO] Eroare import audit:', err);
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
    if (!origCompute || origCompute._aroPatched) return;

    DB._compute = function (parcelData, opts) {
      const result = origCompute.call(this, parcelData, opts);

      const activeKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city');
      if (activeKey !== UAT_KEY) return result;
      if (result._aro_patched) return result;

      const utrCod = parcelData?.utr_cod || parcelData?.utr || null;
      const nrCad  = parcelData?.nr_cad  || parcelData?.nrCad || null;
      const meta   = _reguli._meta || {};

      const utr    = utrCod ? getUTR(utrCod) : null;
      const sz     = utrCod && nrCad ? getSubzonaParcelei(nrCad, utrCod) : null;
      const szObj  = sz?.subzona_cod ? getSubzona(sz.subzona_cod) : null;
      const zprot  = _reguli.zone_protectie || {};
      const aero   = _reguli.restrictii_aeroport || {};

      Object.assign(result, {
        uat:              meta.uat        || 'Comuna Aroneanu',
        uat_key:          UAT_KEY,
        ag:               meta.seismic?.ag || 0.2,
        Tc:               meta.seismic?.Tc || 1.0,
        zonaSeism:        meta.seismic?.zona || 'C',
        hdd:              meta.hdd || 2900,
        judet:            meta.judet || 'Iași',
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
        cut_max:          szObj?.cut_max   ?? utr?.cut_max   ?? 0.60,
        hmax_m:           szObj?.hmax_m    ?? utr?.hmax_m    ?? 5,
        niv_max:          szObj?.niv_max   ?? utr?.niv_max   ?? 2,
        sup_min_parcela:  szObj?.sup_min_mp ?? utr?.sup_min_mp ?? 150,
        front_min_m:      szObj?.front_min_m ?? utr?.front_min_m ?? 8,
        aliniament_note:  utr?.aliniament_note || '',
        regim_constructie: szObj?.regim || '',

        restrictii_aeroport: aero.nota || '',
        zona_aeroport_panta:  (utr?.sat === 'Aroneanu' || utr?.sat === 'Dorobanț')
          ? aero.zona_I_pantamax_pct + '% pantă max (zona I)'
          : aero.zona_II_pantamax_pct + '% pantă max (zona II)',

        subzone_posibile: utrCod ? getSubzonePosibile(utrCod) : [],

        _aro_patched: true
      });

      return result;
    };
    DB._compute._aroPatched = true;
    console.log('[RLU-ARO] DataBus patch aplicat');
  }

  /* ── UI panel UTR ────────────────────────────────────────────────────── */
  function _renderUTRPanel (utrCod, nrCad) {
    const container = document.getElementById('tc-utr');
    if (!container || !_reguli) return;

    const utr = getUTR(utrCod);
    if (!utr) return;

    const szActuala  = nrCad ? getSubzonaParcelei(nrCad, utrCod) : null;
    const szPosibile = getSubzonePosibile(utrCod);
    const szCod      = szActuala?.subzona_cod;
    const esteAeroport = (utr.sat === 'Aroneanu' || utr.sat === 'Dorobanț');

    container.innerHTML = `
      <div style="padding:12px;font-family:sans-serif;font-size:13px">
        <div style="font-weight:700;font-size:14px;margin-bottom:6px">
          ${utr.sat} — UTR ${utr.nr_utr}: ${utr.denumire}
        </div>

        ${esteAeroport ? `
          <div style="background:#fef3c7;border:1px solid #f59e0b;padding:5px 8px;border-radius:6px;font-size:11px;color:#92400e;margin-bottom:8px">
            ✈️ <b>Zona aeroport Iași</b> — aviz obligatoriu. Pantă max: ${utr.sat === 'Aroneanu' ? '2%' : '2.5%'} față de originea pistei.
          </div>` : ''}

        <div style="margin-bottom:8px">
          ${szPosibile.map(s => `
            <span style="display:inline-block;margin:2px;padding:3px 8px;border-radius:12px;
              background:${s.cod === szCod ? '#7c3aed' : s.dominanta ? '#ede9fe' : '#f3f4f6'};
              color:${s.cod === szCod ? '#fff' : '#4c1d95'};font-size:11px;cursor:pointer"
              onclick="window._RLU_ARO?.selectSubzona?.('${nrCad}','${utrCod}','${s.cod}')">
              ${s.dominanta ? '★ ' : ''}${s.cod}
            </span>
          `).join('')}
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:12px">
          <tr><td style="color:#666;padding:3px 6px">POT max</td><td style="font-weight:600">${utr.pot_max ?? '—'}%</td></tr>
          <tr><td style="color:#666;padding:3px 6px">CUT max</td><td style="font-weight:600">${utr.cut_max ?? '—'}</td></tr>
          <tr><td style="color:#666;padding:3px 6px">H max</td><td style="font-weight:600">${utr.hmax_m || '—'}m (${utr.niv_max || '—'} niv.)</td></tr>
          ${utr.sup_min_mp ? `<tr><td style="color:#666;padding:3px 6px">Sc. min parcelă</td><td>${utr.sup_min_mp} mp</td></tr>` : ''}
          ${utr.front_min_m ? `<tr><td style="color:#666;padding:3px 6px">Front min</td><td>${utr.front_min_m} m</td></tr>` : ''}
          ${utr.aliniament_note ? `<tr><td style="color:#666;padding:3px 6px">Aliniere</td><td style="font-size:11px">${utr.aliniament_note}</td></tr>` : ''}
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
          <select id="aro-sz-select" style="width:100%;margin:4px 0;padding:4px">
            ${szPosibile.map(s => `<option value="${s.cod}" ${s.cod===szCod?'selected':''}>${s.cod} — ${s.denumire||'—'}</option>`).join('')}
          </select>
          <input id="aro-sz-sursa"    placeholder="Sursă (ex: PUZ, HCL)" style="width:100%;padding:4px;margin:2px 0">
          <input id="aro-sz-urbanist" placeholder="Urbanist" style="width:100%;padding:4px;margin:2px 0">
          <input id="aro-sz-nota"     placeholder="Notă" style="width:100%;padding:4px;margin:2px 0">
          <button onclick="window._RLU_ARO?.saveAtribuire?.('${nrCad}','${utrCod}')"
            style="background:#7c3aed;color:#fff;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;width:100%;margin-top:4px">
            Salvează atribuire
          </button>
          <button onclick="window._RLU_ARO?.exportAudit?.()"
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
    if (typeof origHook !== 'function' || origHook._aroHooked) return;

    window._onParcelaSelected = function (data) {
      origHook.call(this, data);
      const activeKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city');
      if (activeKey !== UAT_KEY || !_ready) return;

      const utrCod = data?.utr_cod || data?.utr || null;
      const nrCad  = data?.nr_cad  || data?.nrCad || null;
      if (utrCod) _renderUTRPanel(utrCod, nrCad);
    };
    window._onParcelaSelected._aroHooked = true;
  }

  /* ── Public API ─────────────────────────────────────────────────────── */
  function selectSubzona (nrCad, utrCod, cod) {
    _renderUTRPanel(utrCod, nrCad);
  }

  function saveAtribuire (nrCad, utrCod) {
    const cod      = document.getElementById('aro-sz-select')?.value;
    const sursa    = document.getElementById('aro-sz-sursa')?.value;
    const urbanist = document.getElementById('aro-sz-urbanist')?.value;
    const nota     = document.getElementById('aro-sz-nota')?.value;
    if (!cod) return;
    atribuieSubzona(nrCad, cod, { sursa, urbanist, nota });
    _renderUTRPanel(utrCod, nrCad);
  }

  window._RLU_ARO = {
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

  console.log('[RLU-ARO] Module Aroneanu v1.0 încărcat');
})();
