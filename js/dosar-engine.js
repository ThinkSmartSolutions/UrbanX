/* ============================================================================
 * UrbanX Dosar Digital — pașaportul digital al imobilului (Modul 05, client-side).
 * STRAT DE AGREGARE (nu DB nou): adună per-parcelă tot ce UrbanX are deja —
 * cadastru, PUG, CU/AC (CAU), sesizări (06), risc — + scor conformitate (indicativ).
 * Modele: UK Land Registry, Estonia e-Kinnisvar, Olanda Kadaster.
 *
 * window.Dosar.aggregate(parcel) -> {sections, score, ...} · generatePDF(dosar)
 * ========================================================================== */
(function (G) {
  'use strict';

  function cityName() { try { var c = G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]; if (c) return c.name; } catch (e) {} return ''; }

  function aggregate(parcel) {
    parcel = parcel || {};
    var reg = (G.REGULI && parcel.utr && G.REGULI[parcel.utr]) || {};
    var dataAvail = [], dataMissing = [];

    // 1. Identitate
    var identitate = { nrcad: parcel.nrcad || '—', area_m2: parcel.area || null, utr: parcel.utr || '—', source: parcel.source || 'cadastru', city: cityName() };
    if (parcel.nrcad) dataAvail.push('cadastru'); else dataMissing.push('cadastru');

    // 2. Reglementări urbanistice
    var urbanistic = { utr: parcel.utr || '—', zona: reg.d || parcel.zoneLabel || '—', pot: (parcel.params && parcel.params.pot) || reg.pot || null, cut: (parcel.params && parcel.params.cut) || reg.cut || null, hmax: reg.h || (parcel.params && parcel.params.h) || null };
    if (urbanistic.pot || urbanistic.cut) dataAvail.push('PUG'); else dataMissing.push('PUG');

    // 3. Istoricul autorizațiilor (din CAU)
    var autorizatii = [];
    try {
      if (G.CAU && G.CAU.registry) {
        G.CAU.registry.list().forEach(function (cu) {
          if (cu.parcel && parcel.nrcad && String(cu.parcel.nrcad) === String(parcel.nrcad)) {
            autorizatii.push({ type: 'CU', number: cu.registration_number, date: cu.created_at, status: cu.status, scope: (G.CAU.USE_LABELS && cu.work && G.CAU.USE_LABELS[cu.work.use]) || (cu.work && cu.work.use) || '' });
          }
        });
      }
    } catch (e) {}
    if (autorizatii.length) dataAvail.push('CAU (CU/AC)');

    // 4. Tranzacții (ANCPI eTranzacții — indisponibil client-side)
    dataMissing.push('tranzacții ANCPI');

    // 5. Sesizări (din modulul 06)
    var sesizari = [];
    try { if (G.Sesizari) sesizari = G.Sesizari.registry.forParcel(parcel); } catch (e) {}
    if (sesizari.length) dataAvail.push('sesizări');
    var openSesizari = sesizari.filter(function (s) { return s.status !== 'rezolvata' && s.status !== 'respinsa'; });

    // 6. Indicatori tehnici (risc per-parcelă — indisponibil fără layer)
    dataMissing.push('risc climatic per-parcelă');

    // ── Scor conformitate (0-100, INDICATIV) ──
    var score = 100, deductions = [];
    if (openSesizari.length) { score -= 20; deductions.push('-20 sesizare deschisă'); }
    if (sesizari.some(function (s) { return s.flag_no_permit; })) { score -= 25; deductions.push('-25 construire semnalată fără autorizație'); }
    // CU expirat fără urmărire (>12 luni de la emitere, status încă „depus")
    try {
      autorizatii.forEach(function (a) {
        if (a.type === 'CU' && a.date && (Date.now() - a.date) > 365 * 86400000 && a.status === 'depus') { score -= 10; deductions.push('-10 CU expirat fără continuare'); }
      });
    } catch (e) {}
    score = Math.max(0, Math.min(100, score));
    var scoreStatus = score >= 80 ? 'bun' : score >= 50 ? 'mediu' : 'slab';

    return {
      parcel: parcel, identitate: identitate, urbanistic: urbanistic,
      autorizatii: autorizatii.sort(function (a, b) { return (a.date || 0) - (b.date || 0); }),
      sesizari: sesizari, open_sesizari: openSesizari.length,
      score: score, score_status: scoreStatus, deductions: deductions,
      data_available: dataAvail, data_missing: dataMissing,
      generated_at: Date.now()
    };
  }

  // ── PDF „Extras din Dosarul Digital" ──
  function generatePDF(d) {
    var Jc = (typeof jsPDF !== 'undefined') ? jsPDF : (window.jspdf && window.jspdf.jsPDF) || window.jsPDF; if (!Jc) { G.ss && ss('❌ jsPDF indisponibil'); return; }
    var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var F = 'DejaVuRO', W = 210, H = 297, today = new Date().toLocaleDateString('ro-RO');
    var N = function (x) { try { return Math.round(x).toLocaleString('ro-RO'); } catch (e) { return String(x); } };
    var TEAL = [13, 148, 136];
    pdf.setFillColor(8, 15, 35); pdf.rect(0, 0, W, 28, 'F'); pdf.setFillColor.apply(pdf, TEAL); pdf.rect(0, 0, W, 3, 'F');
    try { window._pdfStampLogo && window._pdfStampLogo(pdf, 7, 6, 17); } catch (e) {}
    pdf.setTextColor(120, 230, 210); pdf.setFont(F, 'bold'); pdf.setFontSize(8); pdf.text('URBANX · DOSAR DIGITAL AL IMOBILULUI', W / 2, 11, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(15); pdf.text('Extras din Dosarul Digital', W / 2, 20, { align: 'center' });
    pdf.setTextColor(150, 190, 180); pdf.setFontSize(8); pdf.text('CF ' + (d.identitate.nrcad || '—') + ' · ' + (d.identitate.city || '') + ' · ' + today, W / 2, 25.5, { align: 'center' });

    // scor badge
    var sc = d.score >= 80 ? [34, 160, 90] : d.score >= 50 ? [200, 130, 20] : [200, 60, 40];
    pdf.setFillColor.apply(pdf, sc); pdf.roundedRect(W - 52, 33, 40, 16, 2, 2, 'F');
    pdf.setTextColor(255, 255, 255); pdf.setFont(F, 'bold'); pdf.setFontSize(15); pdf.text(d.score + '/100', W - 32, 41, { align: 'center' });
    pdf.setFontSize(6.5); pdf.text('scor conformitate', W - 32, 46, { align: 'center' });

    var y = 40;
    function h(t) { pdf.setFillColor(236, 248, 246); pdf.rect(12, y - 4, W - 70, 7, 'F'); pdf.setTextColor.apply(pdf, TEAL); pdf.setFont(F, 'bold'); pdf.setFontSize(10); pdf.text(t, 14, y + 1); y += 10; }
    function kv(l, v) { pdf.setTextColor(90, 100, 120); pdf.setFont(F, 'normal'); pdf.setFontSize(9); pdf.text(l, 16, y); pdf.setTextColor(20, 30, 50); pdf.setFont(F, 'bold'); pdf.text(String(v), 90, y); y += 6; }
    h('1. Identitate imobil'); y = Math.max(y, 54);
    kv('Nr. cadastral', d.identitate.nrcad); kv('Suprafață teren', d.identitate.area_m2 ? N(d.identitate.area_m2) + ' mp' : '—'); kv('UAT', d.identitate.city || '—');
    h('2. Reglementări urbanistice');
    kv('Zonă / UTR', (d.urbanistic.utr || '—') + (d.urbanistic.zona && d.urbanistic.zona !== '—' ? (' · ' + d.urbanistic.zona) : ''));
    kv('POT / CUT', (d.urbanistic.pot != null ? d.urbanistic.pot + '%' : '—') + ' / ' + (d.urbanistic.cut != null ? d.urbanistic.cut : '—'));
    h('3. Istoric autorizații (' + d.autorizatii.length + ')');
    if (d.autorizatii.length) d.autorizatii.forEach(function (a) { kv(a.type + ' ' + (a.number || ''), (a.date ? new Date(a.date).toLocaleDateString('ro-RO') : '') + ' · ' + (a.scope || '') + ' · ' + (a.status || '')); });
    else { pdf.setTextColor(120, 130, 150); pdf.setFont(F, 'italic'); pdf.setFontSize(8.5); pdf.text('Nicio autorizație în sistemul UrbanX pentru această parcelă.', 16, y); y += 8; }
    h('4. Sesizări (' + d.sesizari.length + ', deschise: ' + d.open_sesizari + ')');
    if (d.sesizari.length) d.sesizari.forEach(function (s) { var c = (G.Sesizari && G.Sesizari.CATEGORIES[s.category]) || {}; kv((c.label || s.category), (s.status || '') + (s.flag_no_permit ? ' · ⚠ fără autorizație' : '')); });
    else { pdf.setTextColor(120, 130, 150); pdf.setFont(F, 'italic'); pdf.setFontSize(8.5); pdf.text('Nicio sesizare înregistrată.', 16, y); y += 8; }

    if (d.deductions.length) { h('Scor conformitate — detaliu'); pdf.setTextColor(180, 60, 40); pdf.setFont(F, 'normal'); pdf.setFontSize(8.5); pdf.text(pdf.splitTextToSize(d.deductions.join(' · '), W - 28), 16, y); y += d.deductions.length * 4 + 4; }

    // date disponibile vs lipsă
    pdf.setTextColor(90, 110, 100); pdf.setFont(F, 'italic'); pdf.setFontSize(7.5);
    pdf.text(pdf.splitTextToSize('Date din sistem: ' + (d.data_available.join(', ') || '—') + '. Indisponibile (necesită surse externe): ' + d.data_missing.join(', ') + '.', W - 28), 14, y); y += 8;

    var dy = H - 26;
    pdf.setFillColor(40, 30, 12); pdf.rect(12, dy, W - 24, 17, 'F'); pdf.setDrawColor(200, 150, 40); pdf.setLineWidth(0.4); pdf.rect(12, dy, W - 24, 17, 'S');
    pdf.setTextColor(230, 190, 120); pdf.setFont(F, 'bold'); pdf.setFontSize(8); pdf.text('⚠ Document informativ — scor INDICATIV', W / 2, dy + 5, { align: 'center' });
    pdf.setTextColor(210, 200, 180); pdf.setFont(F, 'normal'); pdf.setFontSize(7);
    pdf.text(pdf.splitTextToSize('Agregare din datele UrbanX. Scorul de conformitate este orientativ, NU are valoare legală. Datele cadastrale și de carte funciară cu valoare juridică se obțin de la ANCPI/OCPI. Actualizat: ' + today + '.', W - 30), W / 2, dy + 10, { align: 'center' });

    var fn = ('Dosar_digital_' + (d.identitate.nrcad || 'parcela') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
    pdf.save(fn); G.ss && ss('✅ Extras dosar digital generat'); return fn;
  }

  G.Dosar = { aggregate: aggregate, generatePDF: generatePDF };
  console.log('[Dosar] motor agregare încărcat (window.Dosar)');
})(window);
