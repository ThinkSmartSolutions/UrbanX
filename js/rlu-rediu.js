/**
 * rlu-rediu.js — UrbanX RLU Comuna Rediu v1.0
 * UAT key (din _EXTRA_UATS în 17-tci-cinema.js): RO-IS-95087
 * Sursa: PUG Reactualizat nr.20/2006, finalizat 25.06.2011 — SC ATD Proiect SRL
 * 48 UTR-uri: 20 Rediu + 8 Breazu + 13 Horleșți + 7 Tăutești
 * ATENȚIE: Risc semnificativ alunecări teren (ZA1/ZA2) și inundabilitate (ZI)
 * Autor: UrbanX Platform — 2026
 */
(function () {
  'use strict';

  const UAT_KEY    = 'RO-IS-95087';
  const REGULI_URL = 'data/comuna-rediu/reguli.json';
  const AUDIT_KEY  = 'ux_rediu_subzona_audit';

  // Culori pentru categorii de risc — vizualizare în panel
  const RISC_COLORS = {
    ZA1: '#dc2626', ZA2: '#f59e0b', ZI: '#3b82f6', PU: '#8b5cf6'
  };

  let _reguli = null;
  let _audit  = {};
  let _ready  = false;

  /* ── Init ───────────────────────────────────────────────────────────── */
  function _init() {
    const activeKey = window.TCI?.cityKey
      || localStorage.getItem('ux_last_city')
      || window._ProjectionEngine?.currentCity;
    if (activeKey !== UAT_KEY) return;

    _loadAudit();
    _fetchReguli();
  }

  function _fetchReguli() {
    fetch(REGULI_URL)
      .then(r => {
        if (!r.ok) throw new Error('[RLU-RED] reguli.json: ' + r.status);
        return r.json();
      })
      .then(data => {
        _reguli = data;
        _ready  = true;
        _patchDataBus();
        console.log('[RLU-RED] ✅ Reguli Rediu încărcate —', Object.keys(data.utrs || {}).length, 'UTR-uri');
      })
      .catch(err => console.warn('[RLU-RED]', err));
  }

  /* ── Audit ──────────────────────────────────────────────────────────── */
  function _loadAudit() {
    try { _audit = JSON.parse(localStorage.getItem(AUDIT_KEY) || '{}'); }
    catch (e) { _audit = {}; }
  }

  function _saveAudit() {
    try { localStorage.setItem(AUDIT_KEY, JSON.stringify(_audit)); }
    catch (e) { console.warn('[RLU-RED] Eroare audit:', e); }
  }

  /* ── Lookup ─────────────────────────────────────────────────────────── */
  function getUTR(utrCod) {
    if (!_reguli) return null;
    return _reguli.utrs?.[String(utrCod)] || null;
  }

  function getSubzona(cod) {
    if (!_reguli) return null;
    return _reguli.subzone?.[cod] || null;
  }

  function getSubzonePosibile(utrCod) {
    const utr = getUTR(utrCod);
    if (!utr) return [];
    return (utr.subzone_admise || [utr.fn_dominanta]).map(cod => ({
      cod,
      ...(getSubzona(cod) || {}),
      dominanta: cod === utr.fn_dominanta
    }));
  }

  function getSubzonaParcelei(nrCad, utrCod) {
    if (_audit[nrCad]) return _audit[nrCad];
    const utr = getUTR(utrCod);
    if (!utr) return null;
    return { subzona_cod: utr.fn_dominanta, subzona_sursa: 'auto', ...(getSubzona(utr.fn_dominanta) || {}) };
  }

  function atribuieSubzona(nrCad, cod, opts = {}) {
    _audit[nrCad] = {
      subzona_cod: cod, urbanist: opts.urbanist || '', sursa: opts.sursa || 'manual',
      nota: opts.nota || '', ts: new Date().toISOString(), ...(getSubzona(cod) || {})
    };
    _saveAudit();
    return _audit[nrCad];
  }

  function stergeAtribuire(nrCad) { delete _audit[nrCad]; _saveAudit(); }

  function exportAudit() {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(_audit, null, 2)], { type: 'application/json' }));
    a.download = 'audit-rediu-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click(); URL.revokeObjectURL(a.href);
  }

  function importAudit(file) {
    const r = new FileReader();
    r.onload = e => {
      try { _audit = Object.assign({}, _audit, JSON.parse(e.target.result)); _saveAudit(); }
      catch (err) { console.warn('[RLU-RED] Import audit error:', err); }
    };
    r.readAsText(file);
  }

  /* ── DataBus patch ──────────────────────────────────────────────────── */
  function _patchDataBus() {
    if (!_reguli) return;
    const DB = window._DataBus || window.DataBus;
    if (!DB) return;
    const origCompute = DB._compute || DB.compute;
    if (!origCompute || origCompute._redPatched) return;

    DB._compute = function (parcelData, opts) {
      const result = origCompute.call(this, parcelData, opts);
      const activeKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city');
      if (activeKey !== UAT_KEY || result._red_patched) return result;

      const utrCod = parcelData?.utr_cod || parcelData?.utr || null;
      const nrCad  = parcelData?.nr_cad  || parcelData?.nrCad || null;
      const meta   = _reguli._meta || {};
      const utr    = utrCod ? getUTR(utrCod) : null;
      const sz     = utrCod && nrCad ? getSubzonaParcelei(nrCad, utrCod) : null;
      const szObj  = sz?.subzona_cod ? getSubzona(sz.subzona_cod) : null;
      const zrisc  = _reguli.zone_risc || {};

      // Detectăm zona de risc din interdic
      const interdictii = utr?.interdictii || '';
      const riscZA1 = interdictii.includes('ZA1');
      const riscZA2 = interdictii.includes('ZA2');
      const riscZI  = interdictii.includes('ZI');

      Object.assign(result, {
        uat:              meta.uat || 'Comuna Rediu',
        uat_key:          UAT_KEY,
        ag:               meta.seismic?.ag || 0.2,
        Tc:               meta.seismic?.Tc || 1.0,
        zonaSeism:        meta.seismic?.zona || 'C',
        hdd:              meta.hdd || 2900,
        judet:            meta.judet || 'Iași',
        sate:             (meta.sate || []).join(', '),

        utr_cod:          utrCod,
        utr_sat:          utr?.sat || '',
        utr_denumire:     utr?.denumire || '',
        fn_dominanta:     utr?.fn_dominanta || '',
        avize_necesare:   utr?.avize || [],
        interdictii:      utr?.interdictii || '',
        utr_ref:          utr?.ref || '',

        subzona_cod:      sz?.subzona_cod || '',
        subzona_sursa:    sz?.sursa || '',
        subzona_urbanist: sz?.urbanist || '',
        subzona_ts:       sz?.ts || '',

        pot_max:          szObj?.pot_max  ?? utr?.pot_max  ?? 30,
        cut_max:          szObj?.cut_max  ?? utr?.cut_max  ?? 0.90,
        hmax_m:           szObj?.hmax_m   ?? utr?.hmax_m   ?? 9,
        niv_max:          szObj?.niv_max  ?? utr?.niv_max  ?? 2,
        sup_min_parcela:  szObj?.sup_min_mp ?? utr?.sup_min_mp ?? 150,
        front_min_m:      szObj?.front_min_m ?? utr?.front_min_m ?? 8,
        aliniament_note:  utr?.aliniament_note || '',
        regim_constructie: szObj?.regim || '',

        risc_ZA1:         riscZA1,
        risc_ZA2:         riscZA2,
        risc_ZI:          riscZI,
        risc_nota:        riscZA1 ? zrisc.ZA1 : riscZA2 ? zrisc.ZA2 : riscZI ? zrisc.ZI : '',

        subzone_posibile: utrCod ? getSubzonePosibile(utrCod) : [],
        _red_patched: true
      });
      return result;
    };
    DB._compute._redPatched = true;
    console.log('[RLU-RED] DataBus patch aplicat');
  }

  /* ── UI panel UTR ───────────────────────────────────────────────────── */
  function _renderUTRPanel(utrCod, nrCad) {
    const container = document.getElementById('tc-utr');
    if (!container || !_reguli) return;
    const utr = getUTR(utrCod);
    if (!utr) return;

    const szActuala  = nrCad ? getSubzonaParcelei(nrCad, utrCod) : null;
    const szPosibile = getSubzonePosibile(utrCod);
    const szCod      = szActuala?.subzona_cod;
    const interdictii = utr.interdictii || '';
    const riscZA1 = interdictii.includes('ZA1');
    const riscZA2 = interdictii.includes('ZA2');
    const riscZI  = interdictii.includes('ZI');

    container.innerHTML = `
      <div style="padding:12px;font-family:sans-serif;font-size:13px">
        <div style="font-weight:700;font-size:14px;margin-bottom:6px">
          ${utr.sat} — UTR ${utr.nr_utr}: ${utr.denumire}
        </div>

        ${riscZA1 ? `<div style="background:#fee2e2;border:1px solid #dc2626;padding:5px 8px;border-radius:6px;font-size:11px;color:#991b1b;margin-bottom:6px">
          🚫 <b>ZA1 — INTERDICȚIE DEFINITIVĂ</b> de construire în zona cu alunecări active
        </div>` : ''}
        ${riscZA2 ? `<div style="background:#fef3c7;border:1px solid #f59e0b;padding:5px 8px;border-radius:6px;font-size:11px;color:#92400e;margin-bottom:6px">
          ⚠️ <b>ZA2 — Interdicție temporară</b> — Necesită studiu geotehnic + aviz Comisia de Versanți
        </div>` : ''}
        ${riscZI ? `<div style="background:#dbeafe;border:1px solid #3b82f6;padding:5px 8px;border-radius:6px;font-size:11px;color:#1e40af;margin-bottom:6px">
          💧 <b>ZI — Risc inundabilitate</b> — Necesită lucrări regularizare + aviz Apele Române
        </div>` : ''}

        <div style="margin-bottom:8px">
          ${szPosibile.map(s => `
            <span style="display:inline-block;margin:2px;padding:3px 8px;border-radius:12px;
              background:${s.cod === szCod ? '#059669' : s.dominanta ? '#d1fae5' : '#f3f4f6'};
              color:${s.cod === szCod ? '#fff' : '#065f46'};font-size:11px;cursor:pointer"
              onclick="window._RLU_RED?.selectSubzona?.('${nrCad}','${utrCod}','${s.cod}')">
              ${s.dominanta ? '★ ' : ''}${s.cod}
            </span>
          `).join('')}
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:12px">
          <tr><td style="color:#666;padding:3px 6px">POT max</td><td style="font-weight:600">${utr.pot_max}%</td></tr>
          <tr><td style="color:#666;padding:3px 6px">CUT max</td><td style="font-weight:600">${utr.cut_max}</td></tr>
          <tr><td style="color:#666;padding:3px 6px">H max</td><td style="font-weight:600">${utr.hmax_m}m (${utr.niv_max} niv.)</td></tr>
          ${utr.sup_min_mp ? `<tr><td style="color:#666;padding:3px 6px">Sc. min parcelă</td><td>${utr.sup_min_mp} mp</td></tr>` : ''}
          ${utr.front_min_m ? `<tr><td style="color:#666;padding:3px 6px">Front min stradă</td><td>${utr.front_min_m} m</td></tr>` : ''}
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

        <div style="margin-top:10px;font-size:10px;color:#9ca3af">${utr.ref || ''}</div>

        <div style="margin-top:10px;border-top:1px solid #e5e7eb;padding-top:8px;font-size:11px">
          <b>Atribuire manuală subzonă:</b><br>
          <select id="red-sz-select" style="width:100%;margin:4px 0;padding:4px">
            ${szPosibile.map(s => `<option value="${s.cod}" ${s.cod===szCod?'selected':''}>${s.cod} — ${s.denumire||'—'}</option>`).join('')}
          </select>
          <input id="red-sz-sursa"    placeholder="Sursă (PUZ, HCL etc.)" style="width:100%;padding:4px;margin:2px 0">
          <input id="red-sz-urbanist" placeholder="Urbanist"              style="width:100%;padding:4px;margin:2px 0">
          <input id="red-sz-nota"     placeholder="Notă"                  style="width:100%;padding:4px;margin:2px 0">
          <button onclick="window._RLU_RED?.saveAtribuire?.('${nrCad}','${utrCod}')"
            style="background:#059669;color:#fff;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;width:100%;margin-top:4px">
            Salvează atribuire
          </button>
          <button onclick="window._RLU_RED?.exportAudit?.()"
            style="background:#f3f4f6;border:1px solid #d1d5db;padding:4px 8px;border-radius:6px;cursor:pointer;width:100%;margin-top:4px;font-size:11px">
            📥 Export audit JSON
          </button>
        </div>
      </div>`;
  }

  /* ── Hook parcelă ───────────────────────────────────────────────────── */
  function _hookParcela() {
    const origHook = window._onParcelaSelected;
    if (typeof origHook !== 'function' || origHook._redHooked) return;
    window._onParcelaSelected = function (data) {
      origHook.call(this, data);
      const activeKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city');
      if (activeKey !== UAT_KEY || !_ready) return;
      const utrCod = data?.utr_cod || data?.utr || null;
      const nrCad  = data?.nr_cad  || data?.nrCad || null;
      if (utrCod) _renderUTRPanel(utrCod, nrCad);
    };
    window._onParcelaSelected._redHooked = true;
  }

  /* ── Public API ─────────────────────────────────────────────────────── */
  function selectSubzona(nrCad, utrCod) { _renderUTRPanel(utrCod, nrCad); }

  function saveAtribuire(nrCad, utrCod) {
    const cod = document.getElementById('red-sz-select')?.value;
    if (!cod) return;
    atribuieSubzona(nrCad, cod, {
      sursa:    document.getElementById('red-sz-sursa')?.value,
      urbanist: document.getElementById('red-sz-urbanist')?.value,
      nota:     document.getElementById('red-sz-nota')?.value
    });
    _renderUTRPanel(utrCod, nrCad);
  }

  window._RLU_RED = {
    getUTR, getSubzona, getSubzonePosibile, getSubzonaParcelei,
    atribuieSubzona, stergeAtribuire, exportAudit, importAudit,
    selectSubzona, saveAtribuire,
    isReady: () => _ready
  };

  /* ── Bootstrap ──────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { _init(); setTimeout(_hookParcela, 1200); });
  } else {
    _init(); setTimeout(_hookParcela, 1200);
  }
  window.addEventListener('ux:city_changed', _init);
  console.log('[RLU-RED] Module Rediu v1.0 încărcat');
})();
