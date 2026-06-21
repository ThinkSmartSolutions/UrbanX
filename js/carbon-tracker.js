/* ============================================================================
 * UrbanX Carbon Tracker (Modul 14) — engine + UI + PDF, client-side.
 * Amprenta de carbon a deciziilor urbanistice: înglobat (construcție) + operațional
 * (utilizare) + transport (din Flux) + buget EU 2030. Etichetă verde A+..D.
 * Model: C40, EU Taxonomy, RICS embodied carbon, IPCC.
 *
 * window.Carbon.compute(input) · openPanel() · generatePDF()
 * ONEST: factori estimativi (kg CO2/m², kWh/m²/an, grid RO ~0.28); orientativ pt ESG.
 * ========================================================================== */
(function (G) {
  'use strict';
  var EMBODIED = { masonry_rc: 400, steel: 500, timber: 150, prefab: 340 }; // kg CO2/m² GBA
  var OPERATIONAL = { locuire: 50, birouri: 90, comercial: 120, mixt: 75, industrial: 80 }; // kWh/m²/an
  var GRID_RO = 0.28; // kg CO2/kWh (ENTSO-E ~2024)
  var TRANSPORT_KG_PER_TRIP_KM = 0.12; // blended (modal mix), kg CO2/deplasare-km
  var AVG_TRIP_KM = 4.2, HORIZON = 30;

  function greenLabel(perM2Lifetime) {
    if (perM2Lifetime < 400) return 'A+'; if (perM2Lifetime < 700) return 'A';
    if (perM2Lifetime < 1100) return 'B'; if (perM2Lifetime < 1600) return 'C'; return 'D';
  }
  function compute(inp) {
    var area = +inp.built_area_m2 || 0, use = inp.use || 'locuire', strc = inp.structural_type || 'masonry_rc';
    var embodied = area * (EMBODIED[strc] || 400) / 1000; // tone
    var operational = area * (OPERATIONAL[use] || 60) * GRID_RO / 1000; // tone/an
    // transport: deplasări/zi estimate (Flux logic), apoi anual
    var tripsDaily = use === 'locuire' ? (area / 75 * 7.2) : (area * 0.07);
    var transport = tripsDaily * AVG_TRIP_KM * TRANSPORT_KG_PER_TRIP_KM * 365 / 1000; // tone/an
    var lifetime = embodied + (operational + transport) * HORIZON;
    var perM2 = area > 0 ? lifetime * 1000 / area : 0;
    return {
      embodied_t: Math.round(embodied), operational_t_yr: Math.round(operational), transport_t_yr: Math.round(transport),
      annual_t: Math.round(operational + transport), lifetime_t: Math.round(lifetime),
      per_m2_lifetime_kg: Math.round(perM2), green_label: greenLabel(perM2),
      trips_daily: Math.round(tripsDaily), structural_type: strc, use: use, area: area,
      timber_saving_t: Math.round((embodied - area * EMBODIED.timber / 1000)) // cât s-ar economisi cu lemn
    };
  }

  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(620px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(34,197,94,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#16a34a,#15803d);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#86efac;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  function prefill() { try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; var reg = (G.REGULI && G.REGULI[ap.utr]) || {}; return { area: ap.area || 0, cut: (ap.params && ap.params.cut) || reg.cut || 1.0, nrcad: ap.nrcad }; } } catch (e) {} return null; }
  function openPanel() {
    var pre = prefill();
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🌍 Carbon Tracker</div><div style="font-size:11px;color:#94a3b8">Amprenta CO₂ a dezvoltării · țintă EU 2030 · etichetă verde</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    body.appendChild(el('div', { style: ST.label }, 'Construcție'));
    var g = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px' });
    var area = el('input', { style: ST.inp, type: 'number', placeholder: 'mp ADC' }); area.value = pre ? Math.round(pre.area * pre.cut) : '';
    var useSel = el('select', { style: ST.inp }); [['locuire', 'Locuire'], ['birouri', 'Birouri'], ['comercial', 'Comerț'], ['mixt', 'Mixt'], ['industrial', 'Industrial']].forEach(function (o) { useSel.appendChild(el('option', { value: o[0] }, o[1])); });
    var strc = el('select', { style: ST.inp }); [['masonry_rc', 'Beton armat/zidărie'], ['steel', 'Cadru metalic'], ['prefab', 'Prefabricate'], ['timber', 'Lemn (eco)']].forEach(function (o) { strc.appendChild(el('option', { value: o[0] }, o[1])); });
    g.appendChild(area); g.appendChild(useSel); g.appendChild(strc); body.appendChild(g);
    var run = el('button', { style: ST.btn + ';margin-top:12px' }, '▶ Calculează amprenta'); body.appendChild(run);
    var out = el('div', { style: 'margin-top:14px' }); body.appendChild(out);
    var pdfBtn = el('button', { style: ST.btn + ';display:none;margin-top:10px;background:linear-gradient(180deg,#2563eb,#1d4ed8)' }, '⬇ Raport carbon (PDF)'); body.appendChild(pdfBtn);
    var last = null;
    run.onclick = function () {
      if (!(+area.value > 0)) { out.innerHTML = '<div style="color:#fca5a5;font-size:13px">Completează suprafața ADC.</div>'; return; }
      var r = compute({ built_area_m2: +area.value, use: useSel.value, structural_type: strc.value }); last = r;
      var N = function (x) { return Math.round(x).toLocaleString('ro-RO'); };
      var lc = r.green_label[0] === 'A' ? '#22c55e' : r.green_label === 'B' ? '#84cc16' : r.green_label === 'C' ? '#f59e0b' : '#ef4444';
      function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;text-align:center"><div style="font-size:18px;font-weight:800;color:' + (c || '#86efac') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
      out.innerHTML = '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">' +
        '<div style="width:64px;height:64px;border-radius:12px;background:' + lc + ';display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:#06101f">' + r.green_label + '</div>' +
        '<div><div style="font-size:13px;color:#94a3b8">Etichetă verde · ' + N(r.per_m2_lifetime_kg) + ' kg CO₂/mp pe 30 ani</div>' +
        '<div style="font-size:11px;color:#86efac">cu structură din lemn ai economisi ~' + N(r.timber_saving_t) + ' t CO₂</div></div></div>' +
        '<div style="display:flex;gap:8px;margin-bottom:8px">' + card(N(r.embodied_t) + ' t', 'înglobat (construcție)') + card(N(r.annual_t) + ' t/an', 'operațional+transport', '#fbbf24') + card(N(r.lifetime_t) + ' t', 'total 30 ani', '#f87171') + '</div>' +
        '<div style="font-size:11px;color:#94a3b8">Operațional ' + N(r.operational_t_yr) + ' t/an · transport ' + N(r.transport_t_yr) + ' t/an (' + N(r.trips_daily) + ' deplasări/zi). Țintă EU 2030: -55% vs 1990.</div>' +
        '<div style="font-size:10px;color:#64748b;margin-top:6px">⚠ Factori estimativi (RICS/IPCC/grid RO 0.28). Orientativ pt raportare ESG/EU Taxonomy.</div>';
      pdfBtn.style.display = '';
    };
    pdfBtn.onclick = function () { if (last) generatePDF(last, { nrcad: pre && pre.nrcad }); };
    ov.appendChild(m); document.body.appendChild(ov);
  }
  function generatePDF(r, meta) {
    meta = meta || {}; var Jc = (typeof jsPDF !== 'undefined') ? jsPDF : (window.jspdf && window.jspdf.jsPDF) || window.jsPDF; if (!Jc) return;
    var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' }); try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var F = 'DejaVuRO', W = 210, H = 297, today = new Date().toLocaleDateString('ro-RO'); var N = function (x) { return Math.round(x).toLocaleString('ro-RO'); };
    pdf.setFillColor(8, 15, 35); pdf.rect(0, 0, W, 26, 'F'); pdf.setFillColor(34, 197, 94); pdf.rect(0, 0, W, 3, 'F');
    pdf.setTextColor(134, 239, 172); pdf.setFont(F, 'bold'); pdf.setFontSize(8); pdf.text('URBANX · CARBON TRACKER', W / 2, 10, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(14); pdf.text('Amprenta de carbon a dezvoltării', W / 2, 19, { align: 'center' });
    pdf.setTextColor(150, 200, 170); pdf.setFontSize(8); pdf.text((meta.nrcad ? 'CF ' + meta.nrcad + ' · ' : '') + today, W / 2, 24, { align: 'center' });
    var lc = r.green_label[0] === 'A' ? [34, 160, 90] : r.green_label === 'B' ? [132, 204, 22] : r.green_label === 'C' ? [200, 130, 20] : [200, 60, 40];
    pdf.setFillColor.apply(pdf, lc); pdf.roundedRect(W - 44, 32, 30, 18, 3, 3, 'F'); pdf.setTextColor(255, 255, 255); pdf.setFont(F, 'bold'); pdf.setFontSize(20); pdf.text(r.green_label, W - 29, 44, { align: 'center' });
    var y = 40; function kv(l, v) { pdf.setTextColor(90, 100, 120); pdf.setFont(F, 'normal'); pdf.setFontSize(9.5); pdf.text(l, 16, y); pdf.setTextColor(20, 30, 50); pdf.setFont(F, 'bold'); pdf.text(String(v), 110, y); y += 8; }
    kv('Suprafață / funcțiune', N(r.area) + ' mp · ' + r.use);
    kv('Carbon înglobat', N(r.embodied_t) + ' t CO₂ (' + r.structural_type + ')');
    kv('Operațional', N(r.operational_t_yr) + ' t CO₂/an');
    kv('Transport indus', N(r.transport_t_yr) + ' t CO₂/an');
    kv('TOTAL 30 ani', N(r.lifetime_t) + ' t CO₂ (' + N(r.per_m2_lifetime_kg) + ' kg/mp)');
    kv('Economie cu lemn', '~' + N(r.timber_saving_t) + ' t CO₂');
    y += 4; pdf.setFillColor(12, 40, 24); pdf.rect(12, y, W - 24, 20, 'F'); pdf.setTextColor(134, 239, 172); pdf.setFont(F, 'normal'); pdf.setFontSize(7.5);
    pdf.text(pdf.splitTextToSize('Factori estimativi (RICS embodied carbon, IPCC, grid RO ~0.28 kg CO₂/kWh ENTSO-E). Orientativ pentru raportare ESG / EU Taxonomy / Covenant of Mayors. Țintă EU 2030: -55% vs 1990. NU înlocuiește un audit de carbon certificat.', W - 30), W / 2, y + 7, { align: 'center' });
    pdf.save(('Carbon_' + (meta.nrcad || 'sit') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_'));
    G.ss && ss('✅ Raport carbon generat');
  }
  G.Carbon = { compute: compute, openPanel: openPanel, generatePDF: generatePDF };
  console.log('[Carbon] modul Carbon Tracker încărcat (window.Carbon)');
})(window);
