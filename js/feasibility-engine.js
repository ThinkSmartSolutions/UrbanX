/* ============================================================================
 * UrbanX Feasibility — calculator de fezabilitate pentru dezvoltatori (Modul 12).
 * Pro-forma din PUG-ul LIVE: parcelă + CUT/POT → GBA → cost → venit → profit → IRR
 * + valoare reziduală teren + analiză de senzitivitate. Unic pt că folosește
 * indicatorii PUG reali (nu Excel cu date vechi). Model: Argus Developer.
 *
 * window.Feaz.compute(input) · generatePDF(res) · DEFAULTS
 * ONEST: costuri/prețuri = estimative (EUR/m²), suprascriptibile; preț piață real
 * = Market Intelligence (Modul 11). Rol de ORIENTARE, nu decizie de investiție.
 * ========================================================================== */
(function (G) {
  'use strict';
  // EUR/m² ADC — estimativ 2024 (suprascriptibil). Sursă orientativă: practică piață RO.
  var CONSTR = {
    locuire: { economy: 900, standard: 1150, premium: 1600, luxury: 2100 },
    birouri: { economy: 950, standard: 1150, premium: 1500, luxury: 1900 },
    comercial: { economy: 800, standard: 1000, premium: 1350, luxury: 1700 },
    mixt: { economy: 950, standard: 1200, premium: 1600, luxury: 2000 },
    industrial: { economy: 550, standard: 700, premium: 900, luxury: 1100 }
  };
  var EFFICIENCY = { locuire: 0.82, birouri: 0.75, comercial: 0.70, mixt: 0.78, industrial: 0.85 };
  var SOFT = { proiectare: 0.10, avize_taxe: 0.025, management: 0.04, marketing: 0.03, contingenta: 0.07 };
  var PARKING_PER_SLOT_EUR = 8000; // loc parcare subsol
  var DEFAULT_PRICE = { locuire: 1600, birouri: 1500, comercial: 1700, mixt: 1650, industrial: 700 }; // EUR/m² vânzare

  function softTotal() { return Object.keys(SOFT).reduce(function (s, k) { return s + SOFT[k]; }, 0); }

  function compute(inp) {
    var area = +inp.area_m2 || 0, cut = +inp.cut || 0, pot = +inp.pot || 0;
    var use = inp.use || 'locuire', std = inp.standard || 'standard';
    var maxGBA = area * cut;
    var maxFootprint = area * pot / 100;
    var eff = EFFICIENCY[use] || 0.78;
    var netSellable = maxGBA * eff;

    var constrRate = (CONSTR[use] && CONSTR[use][std]) || 1150;
    var constrCost = maxGBA * constrRate;
    // parcare: ~1 loc/100mp ADC pt birouri/comercial, 1.2/locuință (≈/75mp) locuire
    var slots = use === 'locuire' ? Math.ceil(netSellable / 75 * 1.2) : Math.ceil(maxGBA / 100);
    var parkingCost = slots * PARKING_PER_SLOT_EUR;
    var soft = (constrCost + parkingCost) * softTotal();
    var landCost = +inp.land_cost_total || 0;

    var dev_months = +inp.dev_months || 24;
    var leverage = inp.leverage == null ? 0.6 : +inp.leverage;
    var rate = inp.interest_rate == null ? 0.08 : +inp.interest_rate;
    var preFinance = constrCost + parkingCost + soft + landCost;
    var financing = preFinance * leverage * rate * (dev_months / 12);
    var totalCost = preFinance + financing;

    var price = +inp.price_per_m2 || DEFAULT_PRICE[use] || 1500;
    var gdv = netSellable * price;
    var profit = gdv - totalCost;
    var margin = gdv > 0 ? profit / gdv : 0;
    var devYield = totalCost > 0 ? profit / totalCost : 0;
    var irr = (totalCost > 0 && profit > -totalCost) ? Math.pow(1 + profit / totalCost, 12 / dev_months) - 1 : null;

    // valoare reziduală teren la marjă-țintă (cât poate plăti pe teren pt o marjă dorită)
    var targetMargin = inp.target_margin == null ? 0.20 : +inp.target_margin;
    var residualLand = gdv * (1 - targetMargin) - (constrCost + parkingCost + soft + financing);

    return {
      urbanistic: { area_m2: area, cut: cut, pot: pot, max_gba: Math.round(maxGBA), max_footprint: Math.round(maxFootprint), net_sellable: Math.round(netSellable), parking_slots: slots },
      costs: { construction: Math.round(constrCost), parking: Math.round(parkingCost), soft: Math.round(soft), land: Math.round(landCost), financing: Math.round(financing), total: Math.round(totalCost), constr_rate: constrRate },
      revenue: { price_per_m2: price, gdv: Math.round(gdv) },
      result: { profit: Math.round(profit), margin_pct: Math.round(margin * 1000) / 10, dev_yield_pct: Math.round(devYield * 1000) / 10, irr_pct: irr != null ? Math.round(irr * 1000) / 10 : null, residual_land: Math.round(residualLand) },
      sensitivity: sensitivity(inp, netSellable, constrCost, parkingCost, soft, landCost, financing, price),
      verdict: margin >= 0.20 ? 'favorabil' : margin >= 0.12 ? 'marginal' : 'nefavorabil',
      inputs: inp
    };
  }

  // matrice senzitivitate: marjă la variații cost construcție × preț vânzare
  function sensitivity(inp, netSellable, constrCost, parkingCost, soft, landCost, financing, price) {
    var costVar = [-0.2, -0.1, 0, 0.1, 0.2], priceVar = [-0.15, -0.1, 0, 0.1, 0.15];
    var rows = priceVar.map(function (pv) {
      return {
        price_delta: pv, cells: costVar.map(function (cv) {
          var c = (constrCost * (1 + cv)) + parkingCost + soft + landCost + financing;
          var g = netSellable * price * (1 + pv);
          var m = g > 0 ? (g - c) / g : 0;
          return Math.round(m * 1000) / 10;
        })
      };
    });
    return { cost_var: costVar, price_var: priceVar, matrix: rows };
  }

  function generatePDF(res, meta) {
    meta = meta || {};
    var Jc = (typeof jsPDF !== 'undefined') ? jsPDF : (window.jspdf && window.jspdf.jsPDF) || window.jsPDF; if (!Jc) { G.ss && ss('❌ jsPDF indisponibil'); return; }
    var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var F = 'DejaVuRO', W = 210, H = 297, today = new Date().toLocaleDateString('ro-RO');
    var N = function (x) { try { return Math.round(x).toLocaleString('ro-RO'); } catch (e) { return String(x); } };
    var PURP = [124, 58, 237];
    pdf.setFillColor(8, 15, 35); pdf.rect(0, 0, W, 28, 'F'); pdf.setFillColor.apply(pdf, PURP); pdf.rect(0, 0, W, 3, 'F');
    pdf.setTextColor(196, 181, 253); pdf.setFont(F, 'bold'); pdf.setFontSize(8); pdf.text('URBANX FEASIBILITY · STUDIU DE FEZABILITATE', W / 2, 11, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(15); pdf.text('Pro-forma dezvoltare imobiliară', W / 2, 20, { align: 'center' });
    pdf.setTextColor(180, 170, 210); pdf.setFontSize(8); pdf.text((meta.site_name || 'Sit') + ' · ' + (meta.city || '') + ' · ' + today, W / 2, 25.5, { align: 'center' });

    var vc = res.verdict === 'favorabil' ? [34, 160, 90] : res.verdict === 'marginal' ? [200, 130, 20] : [200, 60, 40];
    pdf.setFillColor.apply(pdf, vc); pdf.roundedRect(W - 56, 33, 44, 16, 2, 2, 'F'); pdf.setTextColor(255, 255, 255); pdf.setFont(F, 'bold'); pdf.setFontSize(13); pdf.text(res.result.margin_pct + '%', W - 34, 41, { align: 'center' }); pdf.setFontSize(6.5); pdf.text('marjă · ' + res.verdict, W - 34, 46, { align: 'center' });

    var y = 40;
    function h(t) { pdf.setFillColor(243, 240, 252); pdf.rect(12, y - 4, W - 70, 7, 'F'); pdf.setTextColor.apply(pdf, PURP); pdf.setFont(F, 'bold'); pdf.setFontSize(10); pdf.text(t, 14, y + 1); y += 10; }
    function kv(l, v) { pdf.setTextColor(90, 100, 120); pdf.setFont(F, 'normal'); pdf.setFontSize(9); pdf.text(l, 16, y); pdf.setTextColor(20, 30, 50); pdf.setFont(F, 'bold'); pdf.text(String(v), 110, y); y += 6; }
    h('1. Capacitate edificabilă (din PUG)'); y = Math.max(y, 54);
    kv('Suprafață teren', N(res.urbanistic.area_m2) + ' mp · CUT ' + res.urbanistic.cut + ' · POT ' + res.urbanistic.pot + '%');
    kv('GBA maximă', N(res.urbanistic.max_gba) + ' mp · vandabil ' + N(res.urbanistic.net_sellable) + ' mp');
    kv('Parcaje necesare', N(res.urbanistic.parking_slots) + ' locuri');
    h('2. Costuri (EUR)');
    kv('Construcție', N(res.costs.construction) + ' (' + res.costs.constr_rate + ' EUR/mp)');
    kv('Parcaje + Soft costs', N(res.costs.parking) + ' + ' + N(res.costs.soft));
    kv('Teren + Finanțare', N(res.costs.land) + ' + ' + N(res.costs.financing));
    kv('COST TOTAL', N(res.costs.total) + ' EUR');
    h('3. Venituri & rezultat (EUR)');
    kv('Valoare dezvoltare (GDV)', N(res.revenue.gdv) + ' (' + N(res.revenue.price_per_m2) + ' EUR/mp)');
    kv('PROFIT', N(res.result.profit) + ' EUR');
    kv('Marjă / Randament', res.result.margin_pct + '% / ' + res.result.dev_yield_pct + '%');
    kv('IRR (simplificat)', (res.result.irr_pct != null ? res.result.irr_pct + '%' : '—') + ' · valoare reziduală teren: ' + N(res.result.residual_land) + ' EUR');

    h('4. Analiză de senzitivitate (marjă %)');
    var ws = (W - 24) / 6;
    pdf.setFillColor(14, 26, 54); pdf.rect(12, y, W - 24, 6, 'F'); pdf.setTextColor(196, 181, 253); pdf.setFont(F, 'bold'); pdf.setFontSize(6.6);
    pdf.text('preț ↓ / cost →', 14, y + 4);
    res.sensitivity.cost_var.forEach(function (cv, i) { pdf.text((cv > 0 ? '+' : '') + (cv * 100) + '%', 12 + ws * (i + 1) + 2, y + 4); }); y += 6;
    res.sensitivity.matrix.forEach(function (row, ri) {
      if (ri % 2 === 0) { pdf.setFillColor(244, 247, 251); pdf.rect(12, y, W - 24, 6, 'F'); }
      pdf.setTextColor(60, 72, 94); pdf.setFont(F, 'bold'); pdf.setFontSize(6.6); pdf.text((row.price_delta > 0 ? '+' : '') + (row.price_delta * 100) + '%', 14, y + 4);
      row.cells.forEach(function (m, ci) { pdf.setTextColor.apply(pdf, m >= 20 ? [30, 140, 60] : m >= 12 ? [200, 130, 20] : [200, 60, 40]); pdf.setFont(F, 'normal'); pdf.text(m + '%', 12 + ws * (ci + 1) + 2, y + 4); });
      y += 6;
    });
    y += 4;

    var dy = H - 24;
    pdf.setFillColor(40, 24, 60); pdf.rect(12, dy, W - 24, 16, 'F'); pdf.setDrawColor.apply(pdf, PURP); pdf.setLineWidth(0.4); pdf.rect(12, dy, W - 24, 16, 'S');
    pdf.setTextColor(196, 181, 253); pdf.setFont(F, 'bold'); pdf.setFontSize(8); pdf.text('⚠ Studiu de ORIENTARE — estimativ', W / 2, dy + 5, { align: 'center' });
    pdf.setTextColor(210, 200, 225); pdf.setFont(F, 'normal'); pdf.setFontSize(7);
    pdf.text(pdf.splitTextToSize('Costurile și prețurile sunt estimative (EUR/mp, 2024) și se învechesc rapid. Rezultatele NU înlocuiesc consultanța unui specialist imobiliar autorizat sau un studiu de fezabilitate detaliat. Prețul de piață real necesită date de tranzacții (ANCPI).', W - 30), W / 2, dy + 9.5, { align: 'center' });

    var fn = ('Feasibility_' + (meta.site_name || 'sit') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
    pdf.save(fn); G.ss && ss('✅ Studiu de fezabilitate generat'); return fn;
  }

  G.Feaz = { compute: compute, generatePDF: generatePDF, CONSTR: CONSTR, DEFAULT_PRICE: DEFAULT_PRICE, EFFICIENCY: EFFICIENCY };
  console.log('[Feaz] motor fezabilitate încărcat (window.Feaz)');
})(window);
