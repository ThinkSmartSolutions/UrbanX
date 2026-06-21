/* ============================================================================
 * UrbanX Feasibility — UI. window.Feaz.openPanel()
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(720px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(124,58,237,.4);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:7px 9px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#7c3aed,#6d28d9);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#c4b5fd;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700'
  };
  function prefill() { try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; var reg = (G.REGULI && G.REGULI[ap.utr]) || {}; return { nrcad: ap.nrcad, area: ap.area || 0, cut: (ap.params && ap.params.cut) || reg.cut || 1.0, pot: (ap.params && ap.params.pot) || reg.pot || 40, utr: ap.utr }; } } catch (e) {} return null; }
  function cityName() { try { var c = G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]; if (c) return c.name; } catch (e) {} return ''; }

  function openPanel() {
    var pre = prefill();
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">💰 Pro-formă investițional</div><div style="font-size:11px;color:#94a3b8">Randament dezvoltare din PUG live · ≠ Studiul de Fezabilitate/DALI (Rapoarte) · orientativ</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);

    if (pre) body.appendChild(el('div', { style: 'font-size:11px;color:#34d399;margin-bottom:4px' }, '✓ Din parcela selectată: ' + Math.round(pre.area).toLocaleString('ro-RO') + ' mp · CUT ' + pre.cut + ' · POT ' + pre.pot + '% · UTR ' + (pre.utr || '—')));
    else body.appendChild(el('div', { style: 'font-size:11px;color:#fbbf24;margin-bottom:4px' }, '⚠ Nicio parcelă selectată — introdu manual suprafața/CUT/POT.'));

    body.appendChild(el('div', { style: ST.label }, 'Teren & reglementări'));
    var g1 = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px' });
    var area = el('input', { style: ST.inp, type: 'number', placeholder: 'mp teren' }); area.value = pre ? Math.round(pre.area) : '';
    var cut = el('input', { style: ST.inp, type: 'number', step: '0.1', placeholder: 'CUT' }); cut.value = pre ? pre.cut : '';
    var pot = el('input', { style: ST.inp, type: 'number', placeholder: 'POT %' }); pot.value = pre ? pre.pot : '';
    [area, cut, pot].forEach(function (e) { g1.appendChild(e); }); body.appendChild(g1);

    body.appendChild(el('div', { style: ST.label }, 'Program & standard'));
    var g2 = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px' });
    var useSel = el('select', { style: ST.inp }); [['locuire', 'Locuire'], ['birouri', 'Birouri'], ['comercial', 'Comerț'], ['mixt', 'Mixt'], ['industrial', 'Industrial']].forEach(function (o) { useSel.appendChild(el('option', { value: o[0] }, o[1])); });
    var stdSel = el('select', { style: ST.inp }); [['economy', 'Economy'], ['standard', 'Standard'], ['premium', 'Premium'], ['luxury', 'Lux']].forEach(function (o) { stdSel.appendChild(el('option', { value: o[0] }, o[1])); }); stdSel.value = 'standard';
    g2.appendChild(useSel); g2.appendChild(stdSel); body.appendChild(g2);

    body.appendChild(el('div', { style: ST.label }, 'Asumpții financiare (EUR)'));
    var g3 = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px' });
    var price = el('input', { style: ST.inp, type: 'number', placeholder: 'preț vânzare EUR/mp' });
    var land = el('input', { style: ST.inp, type: 'number', placeholder: 'cost teren total EUR' });
    g3.appendChild(wrap('Preț vânzare EUR/mp (gol = estimat)', price)); g3.appendChild(wrap('Cost teren total EUR', land)); body.appendChild(g3);
    var g4 = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px' });
    var lev = el('input', { style: ST.inp, type: 'number', step: '0.1', value: '0.6' });
    var intr = el('input', { style: ST.inp, type: 'number', step: '0.01', value: '0.08' });
    var months = el('input', { style: ST.inp, type: 'number', value: '24' });
    g4.appendChild(wrap('Leverage (0-1)', lev)); g4.appendChild(wrap('Dobândă /an', intr)); g4.appendChild(wrap('Durată (luni)', months)); body.appendChild(g4);

    var run = el('button', { style: ST.btn + ';margin-top:14px' }, '▶ Calculează fezabilitatea'); body.appendChild(run);
    var out = el('div', { style: 'margin-top:14px' }); body.appendChild(out);
    var pdfBtn = el('button', { style: ST.btn + ';display:none;margin-top:10px;background:linear-gradient(180deg,#2563eb,#1d4ed8)' }, '⬇ Studiu PDF'); body.appendChild(pdfBtn);
    function wrap(lab, inp) { var w = el('div'); w.appendChild(el('div', { style: 'font-size:11px;color:#cbd5e1;margin-bottom:3px' }, lab)); w.appendChild(inp); return w; }

    var last = null;
    run.onclick = function () {
      if (!(+area.value > 0 && +cut.value > 0)) { out.innerHTML = '<div style="color:#fca5a5;font-size:13px">Completează suprafața și CUT.</div>'; return; }
      var res = G.Feaz.compute({ area_m2: +area.value, cut: +cut.value, pot: +pot.value, use: useSel.value, standard: stdSel.value, price_per_m2: +price.value || null, land_cost_total: +land.value || 0, leverage: +lev.value, interest_rate: +intr.value, dev_months: +months.value });
      last = res; out.innerHTML = renderResult(res); pdfBtn.style.display = '';
    };
    pdfBtn.onclick = function () { if (last) G.Feaz.generatePDF(last, { site_name: 'PUZ ' + (pre && pre.nrcad ? 'CF ' + pre.nrcad : ''), city: cityName() }); };

    ov.appendChild(m); document.body.appendChild(ov);
  }

  function renderResult(res) {
    var N = function (x) { return Math.round(x).toLocaleString('ro-RO'); };
    var vc = res.verdict === 'favorabil' ? '#22c55e' : res.verdict === 'marginal' ? '#f59e0b' : '#ef4444';
    function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;text-align:center"><div style="font-size:18px;font-weight:800;color:' + (c || '#c4b5fd') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
    var matrix = '<table style="width:100%;border-collapse:collapse;font-size:11px;margin-top:6px"><tr><td style="color:#94a3b8;padding:3px">preț↓/cost→</td>' +
      res.sensitivity.cost_var.map(function (cv) { return '<td style="text-align:center;color:#94a3b8;padding:3px">' + (cv > 0 ? '+' : '') + (cv * 100) + '%</td>'; }).join('') + '</tr>' +
      res.sensitivity.matrix.map(function (row) { return '<tr><td style="color:#94a3b8;padding:3px">' + (row.price_delta > 0 ? '+' : '') + (row.price_delta * 100) + '%</td>' + row.cells.map(function (mm) { var c = mm >= 20 ? '#22c55e' : mm >= 12 ? '#f59e0b' : '#ef4444'; return '<td style="text-align:center;padding:3px;color:' + c + ';font-weight:600">' + mm + '%</td>'; }).join('') + '</tr>'; }).join('') + '</table>';
    return '<div style="display:flex;gap:8px;margin-bottom:8px">' +
      card(N(res.result.profit) + ' €', 'profit', vc) + card(res.result.margin_pct + '%', 'marjă', vc) + card(res.result.irr_pct != null ? res.result.irr_pct + '%' : '—', 'IRR') + '</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:8px">' +
      card(N(res.urbanistic.net_sellable) + ' mp', 'vandabil') + card(N(res.costs.total) + ' €', 'cost total', '#f87171') + card(N(res.result.residual_land) + ' €', 'val. teren max', '#34d399') + '</div>' +
      '<div style="font-size:11px;color:#c4b5fd;font-weight:700;margin-top:8px">SENZITIVITATE — marjă %</div>' + matrix +
      '<div style="font-size:10px;color:#64748b;margin-top:8px">⚠ Orientativ. Costuri/prețuri estimative EUR/mp 2024. Nu înlocuiește studiul de fezabilitate al unui specialist.</div>';
  }

  G.Feaz = G.Feaz || {}; G.Feaz.openPanel = openPanel;
  console.log('[Feaz] UI încărcat (window.Feaz.openPanel)');
})(window);
