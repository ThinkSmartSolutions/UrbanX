/* ============================================================================
 * UrbanX — DEVIZ GENERAL HG 907/2016 (js/urbanx-deviz-engine.js)
 * Reproduce STANDARDIZAT „Anexa nr. 3 (Anexa nr. 7 la HG 907/2016) — DEVIZ
 * GENERAL, conținut-cadru" (versiunea cu Cap. 7 marja de buget). Structură 1:1:
 * Cap.1–7 + subcapitole exacte + coloane Valoare fără TVA / TVA / cu TVA +
 * TOTAL GENERAL + „Din care C+M" + defalcare surse. Prețuri editabile din UI.
 *
 * window.UXDevize: computeDeviz(D) · devizGeneralHtml(D,v) · PRETURI · loadPreturi
 * ========================================================================== */
(function (G) {
  'use strict';
  var PROXY = G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
  var LSKEY = 'ux_preturi_constructii_v1';
  var P = null; // prețuri + coeficienți (din JSON / localStorage)

  function loadPreturi(cb) {
    try { var ls = localStorage.getItem(LSKEY); if (ls) { P = JSON.parse(ls); if (cb) cb(P); return; } } catch (e) {}
    fetch('data/preturi-constructii.json?v=' + Date.now()).then(function (r) { return r.json(); }).then(function (j) { P = j; if (cb) cb(P); }).catch(function () { P = _fallback(); if (cb) cb(P); });
  }
  function _fallback() { return { _meta: { curs_eur: 5.05, cota_tva: 0.21 }, cost_mp_functiune: { _default: 3000 }, coeficienti: { amenajare_teren_pct: 0.015, utilitati_pct: 0.03, proiectare_pct: 0.03, studii_pct: 0.006, avize_pct: 0.004, asistenta_dirigentie_pct: 0.01, org_santier_pct: 0.015, isc_calitate_pct: 0.005, isc_urbanism_pct: 0.001, csc_pct: 0.005, diverse_neprevazute_pct: 0.07, publicitate_pct: 0.001, probe_pct: 0.003, marja_buget_pct: 0.25 } }; }
  function savePreturi() { try { localStorage.setItem(LSKEY, JSON.stringify(P)); } catch (e) {} }
  loadPreturi();

  function _cm(D) { P = P || _fallback(); var c = P.cost_mp_functiune || {}; return c[D.functiune] || c._default || 3000; }

  // ── Calcul deviz (valori fără TVA, LEI) ───────────────────────────────────
  function computeDeviz(D) {
    P = P || _fallback(); var K = P.coeficienti, tva = (P._meta && P._meta.cota_tva) || 0.21;
    var Sc = +D.Sc || 0; var costMp = _cm(D);
    var c41 = Math.round((D.deviz && D.deviz.c41) != null ? D.deviz.c41 : Sc * costMp); // Construcții și instalații
    var c42 = Math.round((D.deviz && D.deviz.c42) || 0); // montaj utilaje
    var c43 = Math.round((D.deviz && D.deviz.c43) || 0), c44 = Math.round((D.deviz && D.deviz.c44) || 0), c45 = Math.round((D.deviz && D.deviz.c45) || 0), c46 = Math.round((D.deviz && D.deviz.c46) || 0);
    // Cap 1
    var c11 = Math.round((D.deviz && D.deviz.c11) || 0); // obținere teren
    var c12 = Math.round(c41 * K.amenajare_teren_pct); var c13 = 0, c14 = 0;
    // Cap 2
    var c2 = Math.round(c41 * K.utilitati_pct);
    // Cap 3
    var c31 = Math.round(c41 * K.studii_pct); var c32 = Math.round(c41 * K.avize_pct); var c33 = 0, c34 = 0;
    var c35 = Math.round(c41 * K.proiectare_pct); var c36 = 0, c37 = 0; var c38 = Math.round(c41 * K.asistenta_dirigentie_pct);
    // Cap 4 total investiție de bază
    var cap4 = c41 + c42 + c43 + c44 + c45 + c46;
    var cap1 = c11 + c12 + c13 + c14, cap2 = c2, cap3 = c31 + c32 + c33 + c34 + c35 + c36 + c37 + c38;
    // C+M = 1.2+1.3+1.4+2+4.1+4.2+5.1.1
    var c511 = Math.round((c41 + c42) * K.org_santier_pct); var c512 = 0;
    var CM = c12 + c13 + c14 + c2 + c41 + c42 + c511;
    // Cap 5
    var c521 = 0; var c522 = Math.round(CM * K.isc_calitate_pct); var c523 = Math.round(CM * K.isc_urbanism_pct); var c524 = Math.round(CM * K.csc_pct); var c525 = Math.round(c41 * 0.005);
    var c52 = c521 + c522 + c523 + c524 + c525;
    var bazaDiverse = cap1 + cap2 + cap3 + cap4; var c53 = Math.round(bazaDiverse * K.diverse_neprevazute_pct);
    var c54 = Math.round(c41 * K.publicitate_pct);
    var cap5 = c511 + c512 + c52 + c53 + c54;
    // Cap 6
    var c61 = 0, c62 = Math.round(c41 * K.probe_pct); var cap6 = c61 + c62;
    // Cap 7 — marja de buget 25% din (1+2+3+4+5.1.1)
    var c71 = Math.round((cap1 + cap2 + cap3 + cap4 + c511) * K.marja_buget_pct); var cap7 = c71;
    var total = cap1 + cap2 + cap3 + cap4 + cap5 + cap6 + cap7;
    return {
      tva: tva, costMp: costMp, curs: (P._meta && P._meta.curs_eur) || 5.05,
      v: { c11: c11, c12: c12, c13: c13, c14: c14, cap1: cap1, cap2: cap2, c31: c31, c32: c32, c33: c33, c34: c34, c35: c35, c36: c36, c37: c37, c38: c38, cap3: cap3, c41: c41, c42: c42, c43: c43, c44: c44, c45: c45, c46: c46, cap4: cap4, c511: c511, c512: c512, c521: c521, c522: c522, c523: c523, c524: c524, c525: c525, c52: c52, c53: c53, c54: c54, cap5: cap5, c61: c61, c62: c62, cap6: cap6, c71: c71, cap7: cap7, total: total, CM: CM }
    };
  }

  // Structura exactă HG 907 Anexa 7 (cod, denumire, cheie valoare, nivel)
  var STRUCT = [
    ['', 'Capitolul 1 — Cheltuieli pentru obținerea și amenajarea terenului', null, 0],
    ['1.1', 'Obținerea terenului', 'c11', 1], ['1.2', 'Amenajarea terenului', 'c12', 1], ['1.3', 'Amenajări pentru protecția mediului și aducerea la starea inițială', 'c13', 1], ['1.4', 'Cheltuieli pentru relocarea/protecția utilităților', 'c14', 1],
    ['', 'TOTAL CAPITOL 1', 'cap1', 2],
    ['', 'Capitolul 2 — Cheltuieli pentru asigurarea utilităților necesare obiectivului', 'cap2', 0], ['', 'TOTAL CAPITOL 2', 'cap2', 2],
    ['', 'Capitolul 3 — Cheltuieli pentru proiectare și asistență tehnică', null, 0],
    ['3.1', 'Studii', 'c31', 1], ['3.2', 'Documentații-suport și cheltuieli pentru obținerea de avize, acorduri și autorizații', 'c32', 1], ['3.3', 'Expertizare tehnică', 'c33', 1], ['3.4', 'Certificarea performanței energetice și auditul energetic al clădirilor', 'c34', 1],
    ['3.5', 'Proiectare', 'c35', 1], ['3.6', 'Organizarea procedurilor de achiziție', 'c36', 1], ['3.7', 'Consultanță', 'c37', 1], ['3.8', 'Asistență tehnică', 'c38', 1],
    ['', 'TOTAL CAPITOL 3', 'cap3', 2],
    ['', 'Capitolul 4 — Cheltuieli pentru investiția de bază', null, 0],
    ['4.1', 'Construcții și instalații', 'c41', 1], ['4.2', 'Montaj utilaje, echipamente tehnologice și funcționale', 'c42', 1], ['4.3', 'Utilaje, echipamente tehnologice și funcționale care necesită montaj', 'c43', 1], ['4.4', 'Utilaje, echipamente care nu necesită montaj și echipamente de transport', 'c44', 1], ['4.5', 'Dotări', 'c45', 1], ['4.6', 'Active necorporale', 'c46', 1],
    ['', 'TOTAL CAPITOL 4', 'cap4', 2],
    ['', 'Capitolul 5 — Alte cheltuieli', null, 0],
    ['5.1', 'Organizare de șantier', null, 1], ['5.1.1', 'Lucrări de construcții și instalații aferente organizării de șantier', 'c511', 1], ['5.1.2', 'Cheltuieli conexe organizării șantierului', 'c512', 1],
    ['5.2', 'Comisioane, cote, taxe, costul creditului', 'c52', 1], ['5.2.1', 'Comisioanele și dobânzile aferente creditului băncii finanțatoare', 'c521', 1], ['5.2.2', 'Cota aferentă ISC pentru controlul calității lucrărilor de construcții', 'c522', 1], ['5.2.3', 'Cota aferentă ISC pentru controlul statului în amenajarea teritoriului, urbanism', 'c523', 1], ['5.2.4', 'Cota aferentă Casei Sociale a Constructorilor - CSC', 'c524', 1], ['5.2.5', 'Taxe pentru acorduri, avize conforme și autorizația de construire/desființare', 'c525', 1],
    ['5.3', 'Cheltuieli diverse și neprevăzute', 'c53', 1], ['5.4', 'Cheltuieli pentru informare și publicitate', 'c54', 1],
    ['', 'TOTAL CAPITOL 5', 'cap5', 2],
    ['', 'Capitolul 6 — Cheltuieli pentru probe tehnologice și teste', null, 0],
    ['6.1', 'Pregătirea personalului de exploatare', 'c61', 1], ['6.2', 'Probe tehnologice și teste', 'c62', 1], ['', 'TOTAL CAPITOL 6', 'cap6', 2],
    ['', 'Capitolul 7 — Cheltuieli aferente marjei de buget', null, 0],
    ['7.1', 'Cheltuieli aferente marjei de buget (25% din 1+2+3+4+5.1.1)', 'c71', 1], ['', 'TOTAL CAPITOL 7', 'cap7', 2],
    ['', 'TOTAL GENERAL', 'total', 3],
    ['', 'Din care C + M (1.2+1.3+1.4+2+4.1+4.2+5.1.1)', 'CM', 3]
  ];

  function _lei(n) { return (n || 0).toLocaleString('ro-RO'); }
  function devizGeneralHtml(D, v) {
    var dz = computeDeviz(D); var val = dz.v, tva = dz.tva;
    var rows = STRUCT.map(function (r) {
      var cod = r[0], den = r[1], key = r[2], lvl = r[3];
      var fara = key != null ? val[key] : null;
      var t = fara != null ? Math.round(fara * tva) : null;
      var cu = fara != null ? fara + t : null;
      var bold = lvl >= 2 ? 'font-weight:bold;' : ''; var bg = lvl === 0 ? 'background:#DCE6F1;' : lvl === 3 ? 'background:#1F3864;color:#fff;' : lvl === 2 ? 'background:#F2F2F2;' : '';
      return '<tr style="' + bold + bg + '"><td style="text-align:center">' + cod + '</td><td>' + den + '</td>' +
        '<td style="text-align:right">' + (fara != null ? _lei(fara) : '') + '</td>' +
        '<td style="text-align:right">' + (t != null ? _lei(t) : '') + '</td>' +
        '<td style="text-align:right">' + (cu != null ? _lei(cu) : '') + '</td></tr>';
    }).join('');
    var totalCu = val.total + Math.round(val.total * tva);
    return '<p style="text-align:center;font-weight:bold">DEVIZ GENERAL al obiectivului de investiție<br>' + (D.nume || '—') + '</p>' +
      '<p style="text-indent:0;font-size:10pt">conform HG 907/2016, Anexa nr. 7 · prețuri la data de ' + ((P._meta && P._meta.actualizat) || '2026') + ', 1 euro = ' + dz.curs + ' lei · cotă TVA ' + Math.round(tva * 100) + '%</p>' +
      '<table><tr><th style="width:8%">Nr. crt.</th><th>Denumirea capitolelor și subcapitolelor de cheltuieli</th><th style="width:16%">Valoare fără TVA (lei)</th><th style="width:14%">TVA (lei)</th><th style="width:16%">Valoare cu TVA (lei)</th></tr>' + rows + '</table>' +
      '<p style="text-indent:0;margin-top:8pt"><b>TOTAL GENERAL cu TVA: ' + _lei(totalCu) + ' lei</b> (≈ ' + _lei(Math.round(totalCu / dz.curs)) + ' euro).</p>' +
      '<p style="text-indent:0;font-size:10pt">Defalcarea pe surse de finanțare (buget local / buget de stat / alte surse) se completează de beneficiar. Cost construcții+instalații (cap. 4.1): ' + _lei(val.c41) + ' lei (' + _lei(dz.costMp) + ' lei/mp × ' + _lei(+D.Sc || 0) + ' mp).</p>' +
      '<p style="text-indent:0;font-size:9pt;color:#888">Valorile subcapitolelor neevaluate (utilaje, dotări, teren) se completează de proiectant/beneficiar; coeficienții (proiectare, diverse, organizare șantier, cote ISC/CSC) sunt orientativi și editabili din baza de prețuri UrbanX.</p>';
  }

  G.UXDevize = { computeDeviz: computeDeviz, devizGeneralHtml: devizGeneralHtml, loadPreturi: loadPreturi, savePreturi: savePreturi, get PRETURI() { return P; }, set PRETURI(x) { P = x; } };
  console.log('[UXDevize] deviz general HG 907/2016 (standardizat, Cap.1–7) încărcat');
})(window);
