/* ============================================================================
 * UrbanX Flux — Generator PDF "Studiu preliminar de impact de trafic"
 * window.Flux.generatePDF(result, meta) -> salvează PDF (jsPDF + font RO).
 * Disciplina de integritate: disclaimer proeminent (pre-analiză, nu substituie
 * studiu de trafic / PMUD elaborat de proiectant atestat).
 * ========================================================================== */
(function (G) {
  'use strict';
  G.Flux = G.Flux || {};

  function jsPDFctor() {
    if (typeof jsPDF !== 'undefined') return jsPDF;
    if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
    if (typeof window.jsPDF !== 'undefined') return window.jsPDF;
    return null;
  }

  var GREEN = [34, 160, 90], DARK = [8, 15, 35], GRAY = [120, 140, 160], WHITE = [255, 255, 255];

  function N(x) { return (Math.round(x)).toLocaleString('ro-RO'); }

  G.Flux.generatePDF = function (res, meta) {
    meta = meta || {};
    var J = jsPDFctor();
    if (!J) { window.ss && ss('❌ jsPDF indisponibil'); return; }
    var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var FONT = 'DejaVuRO';
    var W = 210, H = 297, today = new Date().toLocaleDateString('ro-RO');
    var siteName = meta.site_name || 'Sit propus';
    var cityName = meta.city_name || '';

    // ── ANTET ────────────────────────────────────────────────────────────
    pdf.setFillColor.apply(pdf, DARK); pdf.rect(0, 0, W, 30, 'F');
    pdf.setFillColor.apply(pdf, GREEN); pdf.rect(0, 0, W, 3, 'F');
    pdf.setTextColor(120, 230, 170); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8);
    pdf.text('URBANX FLUX · INTELIGENȚA MOBILITĂȚII URBANE', W / 2, 12, { align: 'center' });
    pdf.setTextColor.apply(pdf, WHITE); pdf.setFontSize(15);
    pdf.text('Studiu preliminar de impact de trafic', W / 2, 21, { align: 'center' });
    pdf.setTextColor(150, 190, 170); pdf.setFontSize(8);
    pdf.text(siteName + (cityName ? ('  ·  ' + cityName) : '') + '  ·  ' + today, W / 2, 27, { align: 'center' });

    var y = 40;
    function h(t) {
      pdf.setFillColor(238, 244, 240); pdf.rect(12, y - 4, W - 24, 7, 'F');
      pdf.setTextColor.apply(pdf, GREEN); pdf.setFont(FONT, 'bold'); pdf.setFontSize(10);
      pdf.text(t, 14, y + 1); y += 11;
    }
    function kv(label, val, color) {
      pdf.setTextColor(90, 100, 120); pdf.setFont(FONT, 'normal'); pdf.setFontSize(9);
      pdf.text(label, 16, y);
      pdf.setTextColor.apply(pdf, color || [20, 30, 50]); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9.5);
      pdf.text(String(val), 110, y); y += 6.5;
    }

    // ── 1. FUNCȚIUNI PROPUSE ────────────────────────────────────────────
    h('1. Funcțiuni propuse pe sit');
    (meta.land_uses || []).forEach(function (lu) {
      var label = (G.Flux.LAND_USE_LABELS[lu.land_use] || lu.land_use);
      var qty = lu.units ? (N(lu.units) + ' unități') : (N(lu.gross_floor_area_sqm) + ' mp ADC');
      kv((lu.label || label), qty);
    });

    // ── 2. GENERARE DEPLASĂRI ───────────────────────────────────────────
    var g = res.trips_detail;
    h('2. Generare deplasări (ITE adaptat RO)');
    kv('Ora de vârf AM (total)', N(g.am_total) + ' depl/h  (intrări ' + N(g.am_in) + ' / ieșiri ' + N(g.am_out) + ')');
    kv('Ora de vârf PM (total)', N(g.pm_total) + ' depl/h  (intrări ' + N(g.pm_in) + ' / ieșiri ' + N(g.pm_out) + ')', GREEN);
    kv('Total zilnic estimat', N(g.daily) + ' deplasări');

    // ── 3. REPARTIȚIE MODALĂ ────────────────────────────────────────────
    h('3. Repartiție modală (ora de vârf PM)');
    var ms = res.modal_split, c = res.trips_by_mode_pm;
    kv('Autoturism', Math.round(ms.auto * 100) + '%  (' + N(c.auto) + ' depl)');
    kv('Transport public', Math.round(ms.pt * 100) + '%  (' + N(c.pt) + ' depl)');
    kv('Bicicletă / Pietonal', Math.round(ms.bicycle * 100) + '% / ' + Math.round(ms.pedestrian * 100) + '%');

    // ── 4. ÎNCĂRCARE INTERSECȚII ────────────────────────────────────────
    if (res.intersections && res.intersections.length) {
      h('4. Încărcare intersecții adiacente (v/c · LOS · STAS 10144)');
      res.intersections.forEach(function (i) {
        var col = i.over_capacity ? [200, 40, 40] : (i.vc_ratio > 0.75 ? [200, 130, 20] : [30, 140, 60]);
        var flag = i.over_capacity ? '  ⚠ peste capacitate' : '';
        kv(i.name, 'v/c ' + i.vc_ratio.toFixed(2) + ' · LOS ' + i.los + ' · +' + N(i.added_veh_hr) + ' veh/h' + flag, col);
      });
    }

    // ── 5. PARCARE ──────────────────────────────────────────────────────
    h('5. Necesar parcare (GD 525/1996)');
    var p = res.parking_demand;
    kv('Necesar normativ', N(p.required_normative) + ' locuri');
    kv('După reducere proximitate TP', N(p.required_after_reduction) + ' locuri  (-' + p.pt_reduction_pct + '%)', GREEN);

    // ── 6. EMISII ───────────────────────────────────────────────────────
    h('6. Emisii CO2 (IPCC 2023 + mix RO)');
    kv('Emisii zilnice', N(res.emissions.total_kg_day) + ' kg CO2/zi');
    kv('Echivalent anual', N(res.emissions.total_tonnes_year) + ' t CO2/an');

    // ── 7. CONFORMITATE ─────────────────────────────────────────────────
    h('7. Verificare conformitate');
    (res.compliance || []).forEach(function (ch) {
      var col = ch.status === 'FAIL' ? [200, 40, 40] : ch.status === 'PASS' ? [30, 140, 60] : [90, 100, 120];
      pdf.setTextColor.apply(pdf, col); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9);
      pdf.text('[' + ch.status + '] ' + ch.ref, 16, y);
      pdf.setTextColor(70, 80, 100); pdf.setFont(FONT, 'normal'); pdf.setFontSize(8);
      var lines = pdf.splitTextToSize(ch.detail, W - 32);
      pdf.text(lines, 16, y + 4.5); y += 5 + lines.length * 4.2 + 2;
    });

    // ── DISCLAIMER LEGAL PROEMINENT (jos) ───────────────────────────────
    var dy = H - 34;
    pdf.setFillColor(60, 20, 18); pdf.rect(12, dy, W - 24, 22, 'F');
    pdf.setDrawColor(220, 80, 60); pdf.setLineWidth(0.5); pdf.rect(12, dy, W - 24, 22, 'S');
    pdf.setFillColor(220, 80, 60); pdf.rect(12, dy, W - 24, 6, 'F');
    pdf.setTextColor.apply(pdf, WHITE); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8);
    pdf.text('⚠ INSTRUMENT DE PRE-ANALIZĂ', W / 2, dy + 4.2, { align: 'center' });
    pdf.setTextColor(245, 225, 225); pdf.setFont(FONT, 'normal'); pdf.setFontSize(7);
    var disc = 'Studiu generat algoritmic (UrbanX Flux) pe rate ITE adaptate RO. Are rol de PRE-ANALIZĂ și nu substituie ' +
      'studiul de trafic / PMUD elaborat de proiectant atestat și avizat conform NP 068/2002, STAS 10144 și Legii 350/2001. ' +
      'Cifrele sunt orientative și necesită validare profesională și măsurători de teren.';
    pdf.text(pdf.splitTextToSize(disc, W - 30), W / 2, dy + 10, { align: 'center' });

    pdf.setTextColor.apply(pdf, GRAY); pdf.setFontSize(6.5);
    pdf.text('Surse: ITE Trip Generation 10th/11th · NP 068/2002 · GD 525/1996 · STAS 10144 · HG 874/2019 · IPCC 2023 · Generat ' + today,
      W / 2, H - 5, { align: 'center' });

    var fn = ('Studiu_trafic_Flux_' + (meta.site_name || 'sit') + '_' + new Date().toISOString().slice(0, 10) + '.pdf')
      .replace(/[^a-zA-Z0-9._-]/g, '_');
    pdf.save(fn);
    window.ss && ss('✅ Studiu de trafic generat: ' + fn);
    return fn;
  };
  console.log('[Flux] generator PDF încărcat (window.Flux.generatePDF)');
})(window);
