/* ============================================================================
 * UrbanX Land Value Capture (Modul 09) — engine + UI + PDF, client-side.
 * Cât valoare adaugă infrastructura publică / rezonarea terenului privat și ce
 * contribuție e corect de negociat cu dezvoltatorul. Model: ZAC (Franța),
 * reparcelación (Spania), CIL (UK), TIF (SUA).
 *
 * window.LVC.compute(input) · openPanel() · generatePDF()
 * ONEST: România NU are mecanism LVC în lege (2025). Contribuția = VOLUNTARĂ,
 * negociată în acordul PUZ (Legea 350/2001 Art. 56). Valori manuale (ANCPI = Faza 2).
 * ========================================================================== */
(function (G) {
  'use strict';
  function compute(inp) {
    var baseline = +inp.baseline_eur_m2 || 0;       // valoare teren înainte (EUR/mp teren)
    var after = +inp.value_after_eur_m2 || 0;        // valoare teren după (EUR/mp teren)
    var landArea = +inp.land_area_m2 || 0;
    var builtArea = +inp.built_area_m2 || 0;
    var recovery = inp.recovery_rate == null ? 0.20 : +inp.recovery_rate; // 10-30%
    var upliftPerM2 = Math.max(0, after - baseline);
    var totalUplift = upliftPerM2 * landArea;
    var totalContribution = totalUplift * recovery;
    var contribPerBuilt = builtArea > 0 ? totalContribution / builtArea : 0;
    var upliftPct = baseline > 0 ? (upliftPerM2 / baseline) * 100 : 0;
    return {
      baseline_eur_m2: baseline, value_after_eur_m2: after, uplift_eur_m2: Math.round(upliftPerM2),
      uplift_pct: Math.round(upliftPct), total_uplift_eur: Math.round(totalUplift),
      recovery_rate_pct: Math.round(recovery * 100), total_contribution_eur: Math.round(totalContribution),
      contribution_per_built_m2: Math.round(contribPerBuilt), land_area_m2: landArea, built_area_m2: builtArea,
      confidence: inp.confidence || 'medie', inputs: inp
    };
  }

  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(640px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(124,58,237,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#7c3aed,#6d28d9);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#c4b5fd;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  function prefill() { try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; var reg = (G.REGULI && G.REGULI[ap.utr]) || {}; return { area: ap.area || 0, cut: (ap.params && ap.params.cut) || reg.cut || 1.0, nrcad: ap.nrcad }; } } catch (e) {} return null; }
  function cityName() { try { var c = G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]; if (c) return c.name; } catch (e) {} return ''; }

  function openPanel() {
    var pre = prefill();
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">📈 Land Value Capture</div><div style="font-size:11px;color:#94a3b8">Plusvaloarea din infrastructură publică · contribuție de negociat</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    if (pre) body.appendChild(el('div', { style: 'font-size:11px;color:#34d399;margin-bottom:4px' }, '✓ Parcelă: ' + Math.round(pre.area).toLocaleString('ro-RO') + ' mp · ADC estimat ' + Math.round(pre.area * pre.cut).toLocaleString('ro-RO') + ' mp'));

    body.appendChild(el('div', { style: ST.label }, 'Valoare teren (EUR/mp)'));
    var g = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px' });
    var base = el('input', { style: ST.inp, type: 'number', placeholder: 'înainte (baseline)' });
    var after = el('input', { style: ST.inp, type: 'number', placeholder: 'după infrastructură/rezonare' });
    g.appendChild(wrap('Înainte EUR/mp', base)); g.appendChild(wrap('După EUR/mp', after)); body.appendChild(g);
    body.appendChild(el('div', { style: ST.label }, 'Suprafețe & rată recuperare'));
    var g2 = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px' });
    var land = el('input', { style: ST.inp, type: 'number' }); land.value = pre ? Math.round(pre.area) : '';
    var built = el('input', { style: ST.inp, type: 'number' }); built.value = pre ? Math.round(pre.area * pre.cut) : '';
    var rec = el('input', { style: ST.inp, type: 'number', value: '20' });
    g2.appendChild(wrap('Teren mp', land)); g2.appendChild(wrap('ADC mp', built)); g2.appendChild(wrap('Recuperare %', rec)); body.appendChild(g2);
    function wrap(l, i) { var w = el('div'); w.appendChild(el('div', { style: 'font-size:11px;color:#cbd5e1;margin-bottom:3px' }, l)); w.appendChild(i); return w; }

    var run = el('button', { style: ST.btn + ';margin-top:12px' }, '▶ Calculează contribuția'); body.appendChild(run);
    var out = el('div', { style: 'margin-top:14px' }); body.appendChild(out);
    var pdfBtn = el('button', { style: ST.btn + ';display:none;margin-top:10px;background:linear-gradient(180deg,#2563eb,#1d4ed8)' }, '⬇ Notă negociere (PDF)'); body.appendChild(pdfBtn);
    var last = null;
    run.onclick = function () {
      var r = compute({ baseline_eur_m2: +base.value, value_after_eur_m2: +after.value, land_area_m2: +land.value, built_area_m2: +built.value, recovery_rate: (+rec.value || 20) / 100 });
      last = r;
      var N = function (x) { return Math.round(x).toLocaleString('ro-RO'); };
      function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;text-align:center"><div style="font-size:18px;font-weight:800;color:' + (c || '#c4b5fd') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
      out.innerHTML = '<div style="display:flex;gap:8px;margin-bottom:8px">' +
        card('+' + r.uplift_pct + '%', 'plusvaloare teren', '#34d399') + card(N(r.total_uplift_eur) + ' €', 'plusvaloare totală') + '</div>' +
        '<div style="display:flex;gap:8px">' + card(N(r.total_contribution_eur) + ' €', 'contribuție (' + r.recovery_rate_pct + '%)', '#fbbf24') + card(N(r.contribution_per_built_m2) + ' €/mp', 'per mp ADC', '#fbbf24') + '</div>' +
        '<div style="font-size:11px;color:#94a3b8;margin-top:8px">Comparabile: UK CIL ~100-400 €/mp · Franța ZAC variabil. </div>' +
        '<div style="font-size:10px;color:#64748b;margin-top:6px">⚠ România NU are mecanism LVC în lege. Contribuția e VOLUNTARĂ, negociată în acordul PUZ (L.350/2001 Art.56). Orientativ.</div>';
      pdfBtn.style.display = '';
    };
    pdfBtn.onclick = function () { if (last) generatePDF(last, { site_name: pre && pre.nrcad ? 'CF ' + pre.nrcad : 'Sit', city: cityName() }); };
    ov.appendChild(m); document.body.appendChild(ov);
  }

  function generatePDF(r, meta) {
    meta = meta || {};
    var Jc = (typeof jsPDF !== 'undefined') ? jsPDF : (window.jspdf && window.jspdf.jsPDF) || window.jsPDF; if (!Jc) return;
    var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' }); try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var F = 'DejaVuRO', W = 210, H = 297, today = new Date().toLocaleDateString('ro-RO'); var N = function (x) { return Math.round(x).toLocaleString('ro-RO'); };
    pdf.setFillColor(8, 15, 35); pdf.rect(0, 0, W, 26, 'F'); pdf.setFillColor(124, 58, 237); pdf.rect(0, 0, W, 3, 'F');
    pdf.setTextColor(196, 181, 253); pdf.setFont(F, 'bold'); pdf.setFontSize(8); pdf.text('URBANX · LAND VALUE CAPTURE', W / 2, 10, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(14); pdf.text('Notă de negociere — contribuție dezvoltator', W / 2, 19, { align: 'center' });
    pdf.setTextColor(180, 170, 210); pdf.setFontSize(8); pdf.text((meta.site_name || '') + ' · ' + (meta.city || '') + ' · ' + today, W / 2, 24, { align: 'center' });
    var y = 38; function kv(l, v) { pdf.setTextColor(90, 100, 120); pdf.setFont(F, 'normal'); pdf.setFontSize(9.5); pdf.text(l, 16, y); pdf.setTextColor(20, 30, 50); pdf.setFont(F, 'bold'); pdf.text(String(v), 120, y); y += 8; }
    kv('Valoare teren înainte', N(r.baseline_eur_m2) + ' EUR/mp');
    kv('Valoare teren după', N(r.value_after_eur_m2) + ' EUR/mp');
    kv('Plusvaloare', '+' + r.uplift_pct + '% (' + N(r.uplift_eur_m2) + ' EUR/mp)');
    kv('Plusvaloare totală', N(r.total_uplift_eur) + ' EUR (pe ' + N(r.land_area_m2) + ' mp teren)');
    kv('Rată recuperare', r.recovery_rate_pct + '%');
    kv('CONTRIBUȚIE PROPUSĂ', N(r.total_contribution_eur) + ' EUR (' + N(r.contribution_per_built_m2) + ' EUR/mp ADC)');
    y += 4; pdf.setFillColor(40, 24, 60); pdf.rect(12, y, W - 24, 26, 'F'); pdf.setDrawColor(124, 58, 237); pdf.setLineWidth(0.4); pdf.rect(12, y, W - 24, 26, 'S');
    pdf.setTextColor(196, 181, 253); pdf.setFont(F, 'bold'); pdf.setFontSize(8.5); pdf.text('Cadru legal & avertisment', W / 2, y + 6, { align: 'center' });
    pdf.setTextColor(210, 200, 225); pdf.setFont(F, 'normal'); pdf.setFontSize(7.5);
    pdf.text(pdf.splitTextToSize('România nu are un mecanism legal direct de Land Value Capture (CIL/ZAC) la nivel de 2025. Contribuția propusă este VOLUNTARĂ și se poate negocia în cadrul acordului de mediere la aprobarea PUZ (Legea 350/2001, Art. 56). Valorile sunt estimative; recomandăm evaluare ANEVAR + consultanță juridică. Comparabile internaționale: UK CIL ~100-400 EUR/mp, Franța ZAC.', W - 30), W / 2, y + 11, { align: 'center' });
    pdf.save(('LVC_' + (meta.site_name || 'sit') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_'));
    G.ss && ss('✅ Notă LVC generată');
  }

  G.LVC = { compute: compute, openPanel: openPanel, generatePDF: generatePDF };
  console.log('[LVC] modul Land Value Capture încărcat (window.LVC)');
})(window);
