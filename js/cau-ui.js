/* ============================================================================
 * UrbanX CAU — UI (modal): cerere CU din parcela selectată -> avize -> CU PDF +
 * registru cu tracking „aviz tacit favorabil" la 30 zile. window.CAU.openPanel()
 * ========================================================================== */
(function (G) {
  'use strict';
  var USES = [['locuire', 'Locuire'], ['comercial', 'Comerț'], ['birouri', 'Birouri'], ['mixt', 'Mixt'],
    ['industrial', 'Industrial'], ['depozitare', 'Depozitare'], ['hotelier', 'Hotelier'],
    ['gradinita', 'Grădiniță'], ['scoala', 'Școală'], ['cresa', 'Creșă'], ['spital', 'Spital'], ['clinica', 'Clinică'], ['centru_social', 'Centru social']];
  var QCOL = { verified: '#22c55e', regula: '#22c55e', estimat: '#f59e0b', no_data: '#ef4444' };
  var QLAB = { verified: 'verificat', regula: 'regulă', estimat: 'estimat', no_data: 'verif. manuală' };
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(740px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(96,165,250,.4);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px',
    inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:7px 9px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#2563eb,#1d4ed8);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#93c5fd;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700'
  };

  function cityName() { try { var c = G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]; if (c) return c.name; } catch (e) {} return ''; }
  function prefillParcel() {
    try {
      var S = G.S; if (!S || !S.parcels || S.parcels[S.activeParcel == null ? 0 : S.activeParcel] == null) return null;
      var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel];
      var centroid = null; try { if (ap.geo && G.turf) centroid = G.turf.centerOfMass(ap.geo).geometry.coordinates; } catch (e) {}
      var reg = (G.REGULI && G.REGULI[ap.utr]) || {};
      return { nrcad: ap.nrcad, area_m2: ap.area || 0, utr: ap.utr, zone_label: reg.d || ap.zoneLabel || '', pot: (ap.params && ap.params.pot) || reg.pot, cut: (ap.params && ap.params.cut) || reg.cut, centroid: centroid };
    } catch (e) { return null; }
  }

  function openPanel(tab) {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head });
    head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">📋 UrbanX CAU — Acorduri Unice</div><div style="font-size:11px;color:#94a3b8">Determină avizele necesare pentru Certificatul de Urbanism · pre-analiză</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x);
    m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);

    // tabs
    var tabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:6px' });
    var tNew = el('button', { style: ST.ghost }, '➕ Cerere CU nouă');
    var tReg = el('button', { style: ST.ghost }, '📂 Registru & Tracking');
    tabs.appendChild(tNew); tabs.appendChild(tReg); body.appendChild(tabs);
    var paneNew = el('div'); var paneReg = el('div', { style: 'display:none' });
    body.appendChild(paneNew); body.appendChild(paneReg);
    tNew.onclick = function () { paneNew.style.display = ''; paneReg.style.display = 'none'; };
    tReg.onclick = function () { paneNew.style.display = 'none'; paneReg.style.display = ''; renderRegistry(); };

    // ── PANE: cerere nouă ──
    var pre = prefillParcel();
    paneNew.appendChild(el('div', { style: ST.label }, 'Imobil & solicitant'));
    var applicant = el('input', { style: ST.inp, placeholder: 'Nume solicitant' });
    paneNew.appendChild(applicant);
    if (pre) paneNew.appendChild(el('div', { style: 'font-size:11px;color:#34d399;margin-top:6px' }, '✓ Parcelă: CF ' + (pre.nrcad || '—') + ' · ' + Math.round(pre.area_m2).toLocaleString('ro-RO') + ' mp · UTR ' + (pre.utr || '—') + (pre.zone_label ? (' · ' + pre.zone_label) : '')));
    else paneNew.appendChild(el('div', { style: 'font-size:11px;color:#fbbf24;margin-top:6px' }, '⚠ Nicio parcelă selectată — selectează o parcelă pe hartă pentru localizare + rețele.'));

    paneNew.appendChild(el('div', { style: ST.label }, 'Lucrarea propusă'));
    var grid = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px' });
    var useSel = el('select', { style: ST.inp }); USES.forEach(function (u) { useSel.appendChild(el('option', { value: u[0] }, u[1])); });
    var areaInp = el('input', { style: ST.inp, type: 'number', placeholder: 'mp ADC' });
    var floorsInp = el('input', { style: ST.inp, type: 'number', placeholder: 'nr. niveluri' });
    grid.appendChild(useSel); grid.appendChild(areaInp); grid.appendChild(floorsInp); paneNew.appendChild(grid);
    var protWrap = el('label', { style: 'display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;margin-top:8px' });
    var protChk = el('input', { type: 'checkbox' }); protWrap.appendChild(protChk); protWrap.appendChild(document.createTextNode('Parcela e în zonă protejată / monument istoric (LMI)'));
    paneNew.appendChild(protWrap);

    var det = el('button', { style: ST.btn + ';margin-top:14px' }, '🔎 Determină avize necesare'); paneNew.appendChild(det);
    var out = el('div', { style: 'margin-top:14px' }); paneNew.appendChild(out);
    var actions = el('div', { style: 'display:flex;gap:10px;margin-top:12px' });
    var pdfBtn = el('button', { style: ST.btn + ';display:none;background:linear-gradient(180deg,#16a34a,#0f7a37)' }, '⬇ Generează CU (PDF)');
    var saveBtn = el('button', { style: ST.ghost + ';display:none' }, '💾 Salvează în registru');
    actions.appendChild(pdfBtn); actions.appendChild(saveBtn); paneNew.appendChild(actions);

    var lastCU = null;
    det.onclick = function () {
      out.innerHTML = '<div style="font-size:12px;color:#94a3b8">⏳ Caut rețele în jurul parcelei (OSM)...</div>';
      var ctx = { work: { use: useSel.value, area_m2: +areaInp.value || 0, floors: +floorsInp.value || 0 }, pug: { utr: pre && pre.utr, zone_label: pre && pre.zone_label, pot: pre && pre.pot, cut: pre && pre.cut, in_protected_zone: protChk.checked }, risks: {}, networks: [], parcel_centroid: pre && pre.centroid };
      var done = function (netinfo) {
        if (netinfo) { ctx.networks = netinfo.networks || []; ctx.railway_m = netinfo.railway_m; ctx.road_m = netinfo.road_m; ctx.water_m = netinfo.water_m; }
        var res = G.CAU.computeNotices(ctx);
        lastCU = {
          applicant: applicant.value, city_name: cityName(),
          parcel: { nrcad: pre && pre.nrcad, area_m2: pre && pre.area_m2, centroid: pre && pre.centroid, address: cityName() },
          work: ctx.work, pug: ctx.pug, notices: res.notices.map(function (n) { return Object.assign({ status: 'in_asteptare' }, n); }),
          _meta: { has_estimated: res.has_estimated, has_no_data: res.has_no_data }
        };
        out.innerHTML = renderNotices(res);
        pdfBtn.style.display = ''; saveBtn.style.display = pre ? '' : 'none';
      };
      if (pre && pre.centroid && G.CAU.fetchNetworks) {
        G.CAU.fetchNetworks(pre.centroid).then(done).catch(function () { out.innerHTML = '<div style="font-size:11px;color:#fbbf24;margin-bottom:6px">⚠ Rețelele OSM n-au putut fi citite — avizele de rețea necesită verificare manuală.</div>'; done(null); });
      } else done(null);
    };
    pdfBtn.onclick = function () { if (lastCU) { if (!lastCU.registration_number) lastCU.registration_number = 'CU-draft'; G.CAU.generateCU(lastCU); } };
    saveBtn.onclick = function () { if (lastCU) { G.CAU.registry.add(lastCU); window.ss && ss('💾 CU salvat în registru'); tReg.onclick(); } };

    var ST_LABELS = { cerere_depusa: ['Cerere depusă', '#60a5fa'], cu_emis: ['CU emis', '#f59e0b'], avize_in_curs: ['Avize în curs', '#22d3ee'], acord_unic: ['Acord Unic emis', '#22c55e'], depus: ['Cerere depusă', '#60a5fa'], avize_trimise: ['Avize în curs', '#22d3ee'] };
    function renderRegistry() {
      var list = G.CAU.registry.list();
      if (!list.length) { paneReg.innerHTML = '<div style="font-size:12px;color:#64748b;padding:10px 0">Niciun dosar. Creează o cerere în „Cerere CU nouă".</div>'; return; }
      paneReg.innerHTML = '';
      list.slice().reverse().forEach(function (cu) {
        var card = el('div', { style: 'background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:12px;margin-bottom:10px' });
        var stl = ST_LABELS[cu.status] || [cu.status, '#94a3b8'];
        var fee = cu.fee || (G.CAU.registry.feeBreakdown ? G.CAU.registry.feeBreakdown(cu) : null);
        card.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:4px' },
          '<span style="font-weight:800">' + (cu.registration_number || cu.id) + ' · ' + (cu.applicant || '—') + '</span>' +
          '<span style="background:' + stl[1] + ';color:#06101f;padding:2px 9px;border-radius:20px;font-size:10px;font-weight:800">' + stl[0] + '</span>'));
        if (fee) card.appendChild(el('div', { style: 'font-size:10px;color:#94a3b8;margin-bottom:6px' }, '💳 Taxe: CU ' + fee.taxa_cu + ' + serviciu CAU ' + fee.taxa_serviciu_cau + ' + tarife avize ' + fee.avize_tarife + ' = <b style="color:#fbbf24">' + fee.total + ' RON</b> (' + fee.n_avize + ' avize obligatorii)'));
        (cu.notices || []).forEach(function (n, idx) {
          if (!n.is_mandatory && cu.status !== 'cerere_depusa') return; // în flux arătăm obligatoriile
          var dl = G.CAU.daysLeft(n);
          var stCol = (n.status === 'favorabil_tacit' || n.status === 'favorabil') ? '#22c55e' : n.status === 'nefavorabil' ? '#ef4444' : n.status === 'trimis' ? '#60a5fa' : '#94a3b8';
          var dlTxt = n.deadline ? (dl >= 0 ? (dl + ' zile' + (dl < 5 ? ' ⚠' : '')) : 'expirat → tacit') : '';
          var row = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;font-size:11px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.05)' });
          row.appendChild(el('span', null, (n.is_mandatory ? '<b style="color:#f87171">●</b> ' : '○ ') + (n.label || n.notice_type) + ' <span style="color:#64748b">· ' + (n.channel || 'email') + ' · ' + (n.tarif || 0) + ' RON</span>'));
          var st = el('span', { style: 'color:' + stCol + ';font-weight:700;white-space:nowrap' }, (n.status || '').replace(/_/g, ' ') + (dlTxt ? (' · ' + dlTxt) : ''));
          row.appendChild(st);
          card.appendChild(row);
          // AVIZATOR: răspunde (când avizele sunt în curs)
          if (cu.status === 'avize_in_curs' && n.status === 'trimis') {
            var rb = el('div', { style: 'display:flex;gap:5px;margin:3px 0 6px' });
            ['favorabil', 'nefavorabil'].forEach(function (s) { var b = el('button', { style: ST.ghost + ';padding:2px 8px;font-size:10px;color:' + (s === 'favorabil' ? '#34d399' : '#f87171') }, 'avizator: ' + s); b.onclick = function () { G.CAU.registry.setNotice(cu.id, idx, s); renderRegistry(); }; rb.appendChild(b); });
            card.appendChild(rb);
          }
        });
        // ── ACȚIUNI pe ROL/STARE ──
        var ca = el('div', { style: 'display:flex;gap:6px;margin-top:8px;flex-wrap:wrap' });
        function btn(txt, fn, col) { var b = el('button', { style: ST.ghost + (col ? (';color:' + col) : '') }, txt); b.onclick = fn; ca.appendChild(b); }
        if (cu.status === 'cerere_depusa') btn('🏛️ Primăria: emite CU', function () { G.CAU.registry.issueCU(cu.id); renderRegistry(); }, '#f59e0b');
        if (cu.status === 'cu_emis') btn('💳 Solicitant: comandă avizele' + (fee ? ' (' + (fee.taxa_serviciu_cau + fee.avize_tarife) + ' RON)' : ''), function () { G.CAU.registry.comandaAvize(cu.id); renderRegistry(); }, '#22d3ee');
        if (cu.status === 'avize_in_curs' && G.CAU.registry.canIssueAcord(cu)) btn('🏛️ Emite Acord Unic', function () { var r = G.CAU.registry.emiteAcordUnic(cu.id); if (r && r.error) { window.ss && ss(r.error); } renderRegistry(); }, '#34d399');
        if (cu.status === 'acord_unic') { card.appendChild(el('div', { style: 'font-size:12px;color:#34d399;font-weight:700;margin-top:6px' }, '✅ ' + (cu.acord_number || 'Acord Unic') + ' emis — toate avizele obligatorii favorabile/tacite')); btn('⬇ Acord Unic PDF', function () { G.CAU.generateCU(cu, { acord: true }); }); }
        btn('⬇ CU PDF', function () { G.CAU.generateCU(cu); });
        btn('🗑', function () { G.CAU.registry.remove(cu.id); renderRegistry(); });
        card.appendChild(ca);
        paneReg.appendChild(card);
      });
      paneReg.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:6px;line-height:1.5' }, '<b>Fluxul real (Legea 169/2026 (CATUC), Legea 169/2026 (CATUC)):</b> solicitantul depune cererea → primăria emite CU → solicitantul COMANDĂ obținerea avizelor (plătește) → PRIMĂRIA le obține de la avizatori ÎN NUMELE lui → la 30 zile fără răspuns = aviz tacit favorabil → primăria emite Acordul Unic. ⚠ Dispecerizarea reală (email/API către avizatori) + portalul avizatorilor + plata online = Faza 2 (server).'));
    }

    if (tab === 'reg') tReg.onclick();
    ov.appendChild(m); document.body.appendChild(ov);
  }

  function renderNotices(res) {
    var byMand = res.notices.slice().sort(function (a, b) { return (b.is_mandatory ? 1 : 0) - (a.is_mandatory ? 1 : 0); });
    var rows = byMand.map(function (n) {
      var qc = QCOL[n.data_quality_flag] || '#94a3b8', ql = QLAB[n.data_quality_flag] || n.data_quality_flag;
      return '<div style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,.06)">' +
        '<div style="display:flex;justify-content:space-between;align-items:center">' +
        '<span style="font-size:13px;font-weight:700;color:' + (n.is_mandatory ? '#f87171' : '#cbd5e1') + '">' + (n.is_mandatory ? '● OBLIGATORIU' : '○ recomandat') + '</span>' +
        '<span style="font-size:10px;color:' + qc + ';font-weight:700;text-transform:uppercase">' + ql + (n.network_proximity_m != null ? (' · ' + n.network_proximity_m + 'm') : '') + '</span></div>' +
        '<div style="font-size:13px;margin:2px 0">' + (n.label || n.notice_type) + '</div>' +
        '<div style="font-size:11px;color:#94a3b8">' + (n.holder_name || '') + ' · ' + (n.legal_basis || '') + '</div></div>';
    }).join('');
    return '<div style="background:#0a1120;border:1px solid rgba(96,165,250,.3);border-radius:10px;padding:12px">' +
      '<div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-weight:800">' + res.count + ' avize necesare</span>' +
      '<span style="font-size:12px"><b style="color:#f87171">' + res.mandatory_count + ' obligatorii</b> · ' + res.recommended_count + ' recomandate</span></div>' +
      rows +
      (res.has_no_data ? '<div style="font-size:11px;color:#f87171;margin-top:8px">⚠ Unele verificări (patrimoniu/ape) necesită confirmare manuală — date indisponibile în zonă.</div>' : '') +
      '<div style="font-size:10px;color:#64748b;margin-top:6px">Pre-analiză orientativă (Legea 169/2026 (CATUC)). Lista finală se confirmă de arhitectul șef.</div></div>';
  }

  G.CAU = G.CAU || {}; G.CAU.openPanel = openPanel;
  console.log('[CAU] UI încărcat (meniu: window.CAU.openPanel)');
})(window);
