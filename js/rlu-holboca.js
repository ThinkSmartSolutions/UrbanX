/**
 * rlu-holboca.js — UrbanX RLU Comuna Holboca v1.0
 * UAT key: RO-IS-94951  (din TCI._EXTRA_UATS în 17-tci-cinema.js)
 * Sursa: PUG digital aprobat HCL 30.01.2025, valabil 30.01.2035
 *        SC Landschaft Consulting SRL + SC Arhitectis Trust SRL
 * Date vectorizate: IS_Holboca_95159_PUG_20250130.gpkg (MDLPA)
 * UTR-uri: 28 intravilane pe 7 sate
 * Sate: Holboca, Dancu, Orzeni, Bogonos, Lunca Cetățuii, Cogeasca, Rusenii Noi
 */
(function () {
  'use strict';

  const UAT_KEY    = 'RO-IS-94951';
  const REGULI_URL = 'data/comuna-holboca/reguli.json';
  const AUDIT_KEY  = 'ux_holboca_audit';

  let _reguli = null;
  let _audit  = {};
  let _ready  = false;

  /* ── Bootstrap ──────────────────────────────────────────────── */
  function _init() {
    const k = window.TCI?.cityKey
      || localStorage.getItem('ux_last_city')
      || window._ProjectionEngine?.currentCity;
    if (k !== UAT_KEY) return;
    _loadAudit();
    _fetchReguli();
  }

  function _fetchReguli() {
    fetch(REGULI_URL)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(data => {
        _reguli = data;
        _ready  = true;
        _patchDataBus();
        console.log('[RLU-HOL] ✅ Reguli Holboca —', Object.keys(data.utrs || {}).length,
          'UTR-uri | PUG aprobat 30.01.2025');
      })
      .catch(e => console.warn('[RLU-HOL] Eroare încărcare reguli:', e));
  }

  /* ── Audit ──────────────────────────────────────────────────── */
  function _loadAudit() {
    try { _audit = JSON.parse(localStorage.getItem(AUDIT_KEY) || '{}'); }
    catch (e) { _audit = {}; }
  }
  function _saveAudit() {
    try { localStorage.setItem(AUDIT_KEY, JSON.stringify(_audit)); }
    catch (e) {}
  }

  /* ── Lookup API ─────────────────────────────────────────────── */
  function getUTR(cod) {
    if (!_reguli) return null;
    // Cod poate fi exact (UTR2_L1) sau număr simplu (2)
    if (_reguli.utrs[cod]) return _reguli.utrs[cod];
    // Fallback: căutare după nr_utr
    return Object.values(_reguli.utrs).find(u => u.nr_utr === String(cod)) || null;
  }

  function getSubzona(cod) {
    return _reguli?.subzone?.[cod] || null;
  }

  function getParcelInfo(nrCad, utrCod) {
    if (_audit[nrCad]) return { ..._audit[nrCad], sursa: 'audit' };
    const utr = getUTR(utrCod);
    if (!utr) return null;
    return {
      utr_cod: utrCod,
      pot_max: utr.pot_max,
      cut_max: utr.cut_max,
      hmax_m:  utr.hmax_m,
      rh_max:  utr.rh_max,
      fn:      utr.fn_dominanta,
      sat:     utr.sat,
      sursa:   'auto'
    };
  }

  function setAudit(nrCad, data) {
    _audit[nrCad] = { ...data, ts: new Date().toISOString() };
    _saveAudit();
  }

  function exportAudit() {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(
      [JSON.stringify(_audit, null, 2)], { type: 'application/json' }
    ));
    a.download = 'audit-holboca-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /* ── DataBus patch ──────────────────────────────────────────── */
  function _patchDataBus() {
    if (!_reguli) return;
    const DB = window._DataBus || window.DataBus;
    if (!DB) return;
    const orig = DB._compute || DB.compute;
    if (!orig || orig._holPatched) return;

    DB._compute = function (parcel, opts) {
      const res = orig.call(this, parcel, opts);
      const active = window.TCI?.cityKey || localStorage.getItem('ux_last_city');
      if (active !== UAT_KEY || res._hol_patched) return res;

      const utrCod = parcel?.utr || parcel?.utr_cod || null;
      const nrCad  = parcel?.nr_cad || parcel?.nrCad || null;
      const meta   = _reguli._meta || {};
      const utr    = utrCod ? getUTR(utrCod) : null;
      const info   = (utrCod && nrCad) ? getParcelInfo(nrCad, utrCod) : null;

      // Avertizare aeroport
      const lngLat = parcel?.lngLat || parcel?.coordinates;
      const aeroport_zona = utr && (utrCod.includes('T3') || utr.note?.includes('Aeroport'));

      Object.assign(res, {
        uat:            meta.uat || 'Comuna Holboca',
        uat_key:        UAT_KEY,
        ag:             meta.seismic?.ag || 0.2,
        Tc:             meta.seismic?.Tc || 1.0,
        zonaSeism:      meta.seismic?.zona || 'C',
        hdd:            meta.hdd || 2900,
        judet:          'Iași',
        sate:           (meta.sate || []).join(', '),
        pug_valabil:    meta.pug_valabil_pana || '2035-01-30',

        utr_cod:        utrCod,
        utr_sat:        utr?.sat || '',
        utr_denumire:   utr?.denumire || '',
        fn_dominanta:   utr?.fn_dominanta || '',
        nr_utr:         utr?.nr_utr || '',
        avize:          utr?.avize || [],
        note_utr:       utr?.note || '',

        pot_max:        info?.pot_max ?? utr?.pot_max ?? null,
        cut_max:        info?.cut_max ?? utr?.cut_max ?? null,
        hmax_m:         info?.hmax_m  ?? utr?.hmax_m  ?? null,
        rh_max:         utr?.rh_max || '',
        parc_min_mp:    utr?.parc_min_mp || null,
        front_min_m:    utr?.front_min_m || null,

        aeroport_restrictie: aeroport_zona,
        aeroport_nota: aeroport_zona
          ? 'Zonă aeroport Iași — aviz obligatoriu; restricții de înălțime conform PATA'
          : '',

        sursa_date:     'GeoPackage oficial MDLPA (IS_Holboca_95159_PUG_20250130.gpkg)',
        _hol_patched:   true
      });
      return res;
    };
    DB._compute._holPatched = true;
    console.log('[RLU-HOL] DataBus patch aplicat');
  }

  /* ── Panel UTR ──────────────────────────────────────────────── */
  function _renderPanel(utrCod, nrCad) {
    const el = document.getElementById('tc-utr');
    if (!el || !_reguli) return;
    const utr = getUTR(utrCod);
    if (!utr) {
      el.innerHTML = `<div style="padding:12px;color:#9ca3af;font-size:12px">
        UTR <b>${utrCod}</b> — extravilan sau fără reglementări specifice</div>`;
      return;
    }

    const isInd  = utr.fn_dominanta === 'ID';
    const isZona = utr.fn_dominanta === 'V' || utr.fn_dominanta === 'G';
    const hasAer = utr.note?.includes('Aeroport') || utrCod.includes('T3');
    const hasSpec= utr.fn_dominanta === 'S';

    el.innerHTML = `
      <div style="padding:12px;font-family:sans-serif;font-size:13px">
        <div style="font-weight:700;font-size:14px;color:#1e293b;margin-bottom:6px">
          ${utr.sat} · UTR ${utr.nr_utr}: ${utr.denumire.slice(0,80)}
        </div>

        ${hasAer ? `<div style="background:#fef3c7;border:1px solid #f59e0b;padding:6px 10px;
          border-radius:6px;font-size:11px;color:#92400e;margin-bottom:8px">
          ✈️ <b>Zonă aeroport Iași</b> — Aviz obligatoriu; restricții de înălțime conform PATA
        </div>` : ''}
        ${hasSpec ? `<div style="background:#ede9fe;border:1px solid #7c3aed;padding:6px 10px;
          border-radius:6px;font-size:11px;color:#5b21b6;margin-bottom:8px">
          🔒 <b>Destinație specială</b> — ${utr.avize.join('; ')}
        </div>` : ''}

        <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:10px">
          ${utr.pot_max != null ? `
          <tr style="border-bottom:1px solid #f1f5f9">
            <td style="color:#64748b;padding:4px 8px;width:45%">POT max</td>
            <td style="font-weight:700;padding:4px 8px;color:${utr.pot_max>50?'#dc2626':'#059669'}">${utr.pot_max}%</td>
          </tr>` : ''}
          ${utr.cut_max != null ? `
          <tr style="border-bottom:1px solid #f1f5f9">
            <td style="color:#64748b;padding:4px 8px">CUT max</td>
            <td style="font-weight:700;padding:4px 8px">${utr.cut_max}</td>
          </tr>` : ''}
          ${utr.hmax_m != null ? `
          <tr style="border-bottom:1px solid #f1f5f9">
            <td style="color:#64748b;padding:4px 8px">H max</td>
            <td style="font-weight:700;padding:4px 8px">${utr.hmax_m}m ${utr.rh_max ? '('+utr.rh_max+')' : ''}</td>
          </tr>` : ''}
          ${utr.parc_min_mp ? `
          <tr style="border-bottom:1px solid #f1f5f9">
            <td style="color:#64748b;padding:4px 8px">Suprafață min parcelă</td>
            <td style="padding:4px 8px">${utr.parc_min_mp} mp</td>
          </tr>` : ''}
          ${utr.front_min_m ? `
          <tr style="border-bottom:1px solid #f1f5f9">
            <td style="color:#64748b;padding:4px 8px">Front minim stradă</td>
            <td style="padding:4px 8px">${utr.front_min_m} m</td>
          </tr>` : ''}
        </table>

        ${utr.avize?.length && !hasSpec ? `
        <div style="background:#fef3c7;border:1px solid #fbbf24;padding:6px 10px;border-radius:6px;font-size:11px;color:#92400e;margin-bottom:8px">
          <b>Avize necesare:</b> ${utr.avize.join(' · ')}
        </div>` : ''}

        ${utr.note ? `
        <div style="font-size:11px;color:#64748b;margin-bottom:8px;padding:4px 0;border-top:1px solid #f1f5f9">
          ${utr.note}
        </div>` : ''}

        <div style="font-size:10px;color:#94a3b8;padding-top:6px;border-top:1px solid #f1f5f9">
          📋 Sursă: PUG digital Holboca, aprobat HCL 30.01.2025 · Valabil până 30.01.2035
        </div>

        ${nrCad ? `
        <div style="margin-top:10px;border-top:1px solid #e5e7eb;padding-top:8px">
          <div style="font-size:11px;font-weight:600;margin-bottom:6px">Notă parcelă ${nrCad}:</div>
          <textarea id="hol-nota" rows="2" placeholder="Observații, derogări, PUZ aprobat..."
            style="width:100%;padding:5px;font-size:11px;border:1px solid #d1d5db;border-radius:5px;box-sizing:border-box"
          >${_audit[nrCad]?.nota || ''}</textarea>
          <button onclick="window._RLU_HOL?.saveNota?.('${nrCad}','${utrCod}')"
            style="margin-top:4px;background:#2563eb;color:#fff;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-size:11px;width:100%">
            Salvează notă
          </button>
          <button onclick="window._RLU_HOL?.exportAudit?.()"
            style="margin-top:3px;background:#f8fafc;border:1px solid #e2e8f0;padding:4px 12px;border-radius:5px;cursor:pointer;font-size:10px;width:100%;color:#475569">
            📥 Export audit JSON
          </button>
        </div>` : ''}
      </div>`;
  }

  /* ── Hook parcelă ───────────────────────────────────────────── */
  function _hookParcela() {
    const orig = window._onParcelaSelected;
    if (typeof orig !== 'function' || orig._holHooked) return;
    window._onParcelaSelected = function (data) {
      orig.call(this, data);
      const active = window.TCI?.cityKey || localStorage.getItem('ux_last_city');
      if (active !== UAT_KEY || !_ready) return;
      const utr   = data?.utr || data?.utr_cod || null;
      const nrCad = data?.nr_cad || data?.nrCad || null;
      if (utr) _renderPanel(utr, nrCad);
    };
    window._onParcelaSelected._holHooked = true;
  }

  /* ── Public API ─────────────────────────────────────────────── */
  function saveNota(nrCad, utrCod) {
    const nota = document.getElementById('hol-nota')?.value || '';
    setAudit(nrCad, { utr: utrCod, nota });
    console.log('[RLU-HOL] Notă salvată pentru', nrCad);
  }

  window._RLU_HOL = {
    getUTR, getSubzona, getParcelInfo, setAudit, exportAudit, saveNota,
    isReady: () => _ready,
    getReguli: () => _reguli
  };

  /* ── Start ──────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      _init();
      setTimeout(_hookParcela, 1500);
    });
  } else {
    _init();
    setTimeout(_hookParcela, 1500);
  }
  
  // ── Export window._RLU pentru compatibilitate cu platforma ──────────────
  window._RLU = window._RLU || {};
  window._RLU['RO-IS-94951'] = {
    getUTR:    typeof getUTR === 'function' ? getUTR : null,
    getSubzona:typeof getSubzona === 'function' ? getSubzona : null,
    isReady:   () => _ready,
    getReguli: () => _reguli,
    uat_key:   'RO-IS-94951'
  };
  window.addEventListener('ux:city_changed', _init);

  console.log('[RLU-HOL] Module Holboca v1.0 încărcat — PUG digital 2025');
})();
