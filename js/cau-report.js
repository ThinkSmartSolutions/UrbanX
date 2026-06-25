/* ============================================================================
 * UrbanX CAU — generator PDF „Certificat de Urbanism" (draft/pre-analiză).
 * window.CAU.generateCU(cu) — structura Ord. 233/2016 (7 secțiuni) + disclaimer.
 * ========================================================================== */
(function (G) {
  'use strict';
  G.CAU = G.CAU || {};
  function J() { if (typeof jsPDF !== 'undefined') return jsPDF; if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF; return window.jsPDF || null; }
  function N(x) { try { return Math.round(x).toLocaleString('ro-RO'); } catch (e) { return String(x); } }

  var DARK = [8, 15, 35], BLUE = [37, 99, 235], GRAY = [120, 140, 160], WHITE = [255, 255, 255];

  G.CAU.generateCU = function (cu, opts) {
    opts = opts || {};
    var Jc = J(); if (!Jc) { window.ss && ss('❌ jsPDF indisponibil'); return; }
    var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var F = 'DejaVuRO', W = 210, H = 297, today = new Date().toLocaleDateString('ro-RO');
    var p = cu.parcel || {}, w = cu.work || {}, pug = cu.pug || {};

    // antet
    pdf.setFillColor.apply(pdf, DARK); pdf.rect(0, 0, W, 28, 'F');
    pdf.setFillColor.apply(pdf, BLUE); pdf.rect(0, 0, W, 3, 'F');
    try { window._pdfStampLogo && window._pdfStampLogo(pdf, 7, 6, 17); } catch (e) {}
    pdf.setTextColor(150, 190, 255); pdf.setFont(F, 'bold'); pdf.setFontSize(8);
    pdf.text('URBANX CAU · COMISIA DE ACORDURI UNICE', W / 2, 11, { align: 'center' });
    pdf.setTextColor.apply(pdf, WHITE); pdf.setFontSize(15);
    pdf.text(opts.acord ? 'ACORD UNIC (draft)' : 'CERTIFICAT DE URBANISM (draft)', W / 2, 20, { align: 'center' });
    pdf.setTextColor(150, 190, 170); pdf.setFontSize(8);
    pdf.text((opts.acord ? (cu.acord_number || 'AU') : (cu.registration_number || '—')) + ' · ' + (cu.city_name || '') + ' · ' + today, W / 2, 25.5, { align: 'center' });

    var y = 38;
    function h(t) { pdf.setFillColor(238, 244, 252); pdf.rect(12, y - 4, W - 24, 7, 'F'); pdf.setTextColor.apply(pdf, BLUE); pdf.setFont(F, 'bold'); pdf.setFontSize(10); pdf.text(t, 14, y + 1); y += 10; }
    function kv(l, v) { pdf.setTextColor(90, 100, 120); pdf.setFont(F, 'normal'); pdf.setFontSize(9); pdf.text(l, 16, y); pdf.setTextColor(20, 30, 50); pdf.setFont(F, 'bold'); pdf.text(String(v), 95, y); y += 6; }

    h('1. Date solicitant');
    kv('Solicitant', cu.applicant || '—');
    h('2. Date imobil');
    kv('Adresă / localizare', p.address || cu.city_name || '—');
    kv('Nr. cadastral', p.nrcad || '—');
    kv('Suprafață teren', (p.area_m2 ? N(p.area_m2) + ' mp' : '—'));
    if (p.centroid) kv('Coordonate', p.centroid[1].toFixed(5) + '°N · ' + p.centroid[0].toFixed(5) + '°E');

    h('3. Reglementări urbanistice (PUG)');
    kv('Zonă / UTR', (pug.utr || '—') + (pug.zone_label ? (' · ' + pug.zone_label) : ''));
    kv('POT max', (pug.pot != null ? pug.pot + '%' : '—') + '   ·   CUT max ' + (pug.cut != null ? pug.cut : '—'));
    kv('Lucrare propusă', (G.CAU.USE_LABELS[w.use] || w.use || '—') + ' · ' + (w.area_m2 ? N(w.area_m2) + ' mp' : '—') + ' · ' + (w.floors ? 'P+' + (w.floors - 1) : '—'));

    h('4. Avize și acorduri necesare');
    var rows = (cu.notices || []).map(function (n, i) {
      var tip = n.is_mandatory ? 'OBLIGATORIU' : 'recomandat';
      var dl = G.CAU.daysLeft ? G.CAU.daysLeft(n) : null;
      var st = n.status === 'favorabil_tacit' ? 'FAVORABIL TACIT' : (n.status || 'de solicitat');
      var term = n.deadline ? (dl != null ? (dl >= 0 ? dl + ' zile' : 'expirat') : '30 zile') : '30 zile';
      return [(n.label || n.notice_type), n.holder_name, tip, term, st];
    });
    drawTable(pdf, F, 12, y, W - 24, ['Aviz', 'Deținător', 'Tip', 'Termen', 'Status'], rows, [52, 50, 26, 22, 32]);
    y = pdf.__cauY || (y + 8);

    // calitate date
    var qnote = [];
    if (cu._meta && cu._meta.has_estimated) qnote.push('Rețele din OSM (estimat) — confirmați cu operatorii.');
    if (cu._meta && cu._meta.has_no_data) qnote.push('Lipsă date pt unele verificări (patrimoniu/ape) — verificare manuală necesară.');
    if (qnote.length) { pdf.setTextColor(180, 90, 20); pdf.setFont(F, 'italic'); pdf.setFontSize(7.5); pdf.text(pdf.splitTextToSize('⚠ Calitate date: ' + qnote.join(' '), W - 28), 14, y + 2); y += qnote.length * 4 + 4; }

    if (y > H - 70) { pdf.addPage(); y = 20; }
    h('5. Obligații la proiectare');
    pdf.setTextColor(60, 72, 94); pdf.setFont(F, 'normal'); pdf.setFontSize(8.5);
    pdf.text(pdf.splitTextToSize('Documentația tehnică (DTAC) va respecta condițiile din avizele favorabile obținute și reglementările PUG. Toate avizele OBLIGATORII de mai sus sunt condiție pentru depunerea Autorizației de Construire (Legea 50/1991).', W - 28), 14, y); y += 16;
    h('6. Valabilitate & 7. Taxă');
    kv('Termen valabilitate CU', '12 luni (stabilit de arhitectul șef)');
    var taxa = Math.round(((w.area_m2 || 0) * 1100 * 0.005));
    kv('Taxă avizare estimată', N(taxa) + ' lei (0.5% din valoarea estimată a construcției)');

    // disclaimer
    var dy = H - 30;
    pdf.setFillColor(60, 20, 18); pdf.rect(12, dy, W - 24, 20, 'F'); pdf.setDrawColor(220, 80, 60); pdf.setLineWidth(0.5); pdf.rect(12, dy, W - 24, 20, 'S');
    pdf.setFillColor(220, 80, 60); pdf.rect(12, dy, W - 24, 6, 'F'); pdf.setTextColor.apply(pdf, WHITE); pdf.setFont(F, 'bold'); pdf.setFontSize(8);
    pdf.text('⚠ DRAFT — INSTRUMENT DE PRE-ANALIZĂ', W / 2, dy + 4.2, { align: 'center' });
    pdf.setTextColor(245, 225, 225); pdf.setFont(F, 'normal'); pdf.setFontSize(7);
    pdf.text(pdf.splitTextToSize('Acest document este generat algoritmic (UrbanX CAU) ca PRE-ANALIZĂ a avizelor necesare. NU este Certificatul de Urbanism oficial — acela se emite de primărie prin arhitectul șef (Legea 50/1991, Ord. 233/2016). Lista avizelor (mai ales cele din rețele OSM) necesită confirmare cu operatorii și autoritățile.', W - 30), W / 2, dy + 9.5, { align: 'center' });

    var fn = ((opts.acord ? 'Acord_unic_' + (cu.acord_number || 'AU') : 'CU_draft_' + (cu.registration_number || 'nou')) + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
    pdf.save(fn); window.ss && ss('✅ ' + (opts.acord ? 'Acord Unic' : 'CU (draft)') + ' generat: ' + fn); return fn;
  };

  function drawTable(pdf, F, x, y, w, headers, rows, ws) {
    var RH = 6;
    pdf.setFillColor(14, 26, 54); pdf.rect(x, y, w, RH, 'F'); pdf.setTextColor(150, 190, 255); pdf.setFont(F, 'bold'); pdf.setFontSize(6.8);
    var cx = x; headers.forEach(function (hh, i) { pdf.text(hh, cx + 1.6, y + 4, { maxWidth: ws[i] - 3 }); cx += ws[i]; });
    y += RH;
    rows.forEach(function (r, ri) {
      pdf.setFont(F, 'normal'); pdf.setFontSize(6.6);
      var maxL = 1; var cells = r.map(function (c, i) { var ls = pdf.splitTextToSize(String(c == null ? '-' : c), ws[i] - 3); maxL = Math.max(maxL, ls.length); return ls; });
      var rh = Math.max(RH, maxL * 3.3 + 2);
      if (ri % 2 === 0) { pdf.setFillColor(244, 247, 252); pdf.rect(x, y, w, rh, 'F'); }
      var cx2 = x; cells.forEach(function (ls, i) {
        var mand = (i === 2 && r[2] === 'OBLIGATORIU'), tacit = (i === 4 && /TACIT/.test(r[4]));
        pdf.setTextColor.apply(pdf, mand ? [200, 60, 40] : tacit ? [30, 140, 60] : (i === 0 ? [20, 30, 50] : [70, 80, 100]));
        pdf.setFont(F, (i === 0 || mand) ? 'bold' : 'normal');
        ls.forEach(function (ln, li) { pdf.text(ln, cx2 + 1.6, y + 3.6 + li * 3.3); }); cx2 += ws[i];
      });
      pdf.setDrawColor(224, 228, 236); pdf.setLineWidth(0.1); pdf.line(x, y + rh, x + w, y + rh);
      y += rh;
    });
    pdf.__cauY = y + 6;
  }
  console.log('[CAU] generator CU PDF încărcat');
})(window);
