/* ============================================================================
 * UrbanX — HALE INDUSTRIALE (js/23-hale.js)
 * Pre-proiectare hale/depozite: dimensionare automată + planșe desenate
 * (plan parter, secțiune, fațadă — vector nativ jsPDF) + verificări normative
 * + indicatori urbanistici. NP 008-97 + P118/1-2015 + Eurocod + L.319/2006 + RGU.
 *
 * Familia: DOCUMENTAȚIE DE OBIECT (rang parcelă). Meniu Rapoarte, gated parcelă.
 * Interconectat: SSI (js/25 — importă riscul/volumul compartiment prin referință),
 * SKID (instalații gaz în hală), UtilitatiRO (branșamente — nearestLine/pipeline),
 * Silvic (banda 20 m dacă lângă pădure), Viewer3D/AEDIS (hooks 3D).
 *
 * window: generateHala · hale_calc · hale_genViewer3DParams · _HALE_PROIECTE
 * ========================================================================== */
(function (G) {
  'use strict';

  var HALE_NORMATIVE = {
    inaltimiFunctiune: {
      depozitare_manuala: { label: 'Depozitare manuală', H_lib_min: 4.5, H_lib_rec: 5.5, risc: 'mic', pod: false },
      depozitare_stivuitor_3m: { label: 'Depozitare stivuitor H=3m', H_lib_min: 5.5, H_lib_rec: 6.5, risc: 'mic', pod: false },
      depozitare_stivuitor_4m: { label: 'Depozitare stivuitor H=4m', H_lib_min: 6.5, H_lib_rec: 7.5, risc: 'mic', pod: false },
      depozitare_rafturi_inalte: { label: 'Depozitare rafturi înalte (>8m)', H_lib_min: 10, H_lib_rec: 12, risc: 'mediu', pod: false, sprinklere: true },
      productie_usoara: { label: 'Producție ușoară', H_lib_min: 4.5, H_lib_rec: 5.5, risc: 'mediu', pod: false },
      productie_medie: { label: 'Producție medie', H_lib_min: 6, H_lib_rec: 7, risc: 'mediu', pod: false },
      productie_grea: { label: 'Producție grea', H_lib_min: 8, H_lib_rec: 10, risc: 'mare', pod: true },
      pod_rulant_5t: { label: 'Pod rulant 5t', H_lib_min: 7, H_lib_rec: 8, risc: 'mediu', pod: true },
      pod_rulant_10t: { label: 'Pod rulant 10t', H_lib_min: 8, H_lib_rec: 9, risc: 'mediu', pod: true },
      pod_rulant_20t: { label: 'Pod rulant 20t', H_lib_min: 9, H_lib_rec: 11, risc: 'mare', pod: true },
      logistica_tir: { label: 'Logistică TIR', H_lib_min: 5.5, H_lib_rec: 6.5, risc: 'mediu', pod: false, usa: 4.5 }
    },
    mezanin: { procentMax: 30, H_sub_min: 2.5, H_pe_min: 2.7, rezFoc: 'REI 60', nota: 'NP 008-97 art. 3.2.4: mezanin ≤ 30% din Sc; L.319/2006 min. 2,5m sub; GP 114-2006 min. 2,7m birouri' },
    compartiment: {
      fara: { mic: { vol: 12000, sc: 2500 }, mediu: { vol: 6000, sc: 1500 }, mare: { vol: 3000, sc: 750 } },
      cu: { mic: { vol: 36000, sc: 7500 }, mediu: { vol: 18000, sc: 4500 }, mare: { vol: 9000, sc: 2250 } }
    },
    structuri: [
      ['cadre_metalice', 'Cadre metalice rigide', '5–16', 30, 'Rapid, economic, flexibil (Eurocod 3, SR EN 1993)'],
      ['ferme_metalice', 'Ferme metalice + stâlpi', '6–20', 60, 'Deschideri mari, lumini polare (optim > 18m)'],
      ['beton_prefabricat', 'Beton prefabricat', '5–12', 24, 'Rezistență foc nativă, durabil (Eurocod 2, SR EN 1992)'],
      ['arce_metalice', 'Arce metalice (tip tunel)', '4–10', 40, 'Fără stâlpi interiori, economic (hale mici-medii)']
    ],
    acoperisuri: [
      ['doua_pante', 'Două pante', '5–20°', 'Universal — cel mai frecvent în România'],
      ['o_panta', 'O pantă (mono-pitch)', '3–15°', 'Depozitare, logistică, anexe'],
      ['shed', 'Shed (dinți de fierăstrău)', '15–30°', 'Iluminat natural fără soare direct (orientare N)'],
      ['curb', 'Curbat (arced)', 'variabil', 'Hale agricole, deschideri medii-mari'],
      ['plat', 'Plat (terasă)', '1–3%', 'Instalații pe acoperiș, context urban'],
      ['lanterna', 'Cu lanternă', 'variabil', 'Iluminat + ventilare naturală zenitală']
    ],
    pasStalpi: { depozitare: [12, 6], productie: [15, 7.5], pod_rulant: [18, 6], logistica_tir: [15, 12], default: [12, 6] }
  };
  var LEGAL = [
    ['NP 008-97', 'Normativ privind igiena compoziției aerului / spații de producție — înălțimi minime'],
    ['P 118/1-2015', 'Securitatea la incendiu a construcțiilor — compartimentare, evacuare (→ SSI)'],
    ['Legea 319/2006', 'Securitatea și sănătatea în muncă — spații de lucru min. 2,5m'],
    ['GP 114-2006', 'Ghid birouri — înălțime liberă min. 2,7m'],
    ['SR EN 1993-1-1 (Eurocod 3)', 'Proiectarea structurilor de oțel'],
    ['SR EN 1992-1-1 (Eurocod 2)', 'Proiectarea structurilor de beton'],
    ['SR EN 1991-1/-3 (Eurocod 1)', 'Acțiuni: încărcări gravitaționale, zăpadă, vânt, pod rulant'],
    ['HG 525/1996 (RGU)', 'Regulament General de Urbanism — POT, CUT, regim înălțime'],
    ['GT 035-02', 'Ghid logistică — rampe și uși de acces TIR']
  ];

  G._HALE_PROIECTE = G._HALE_PROIECTE || {};

  // ── Dimensionare automată ─────────────────────────────────────────────────
  function hale_calc(params) {
    params = params || {};
    var fn = HALE_NORMATIVE.inaltimiFunctiune[params.functiune] || HALE_NORMATIVE.inaltimiFunctiune.depozitare_stivuitor_4m;
    var L = params.L || 60, W = params.W || 30;
    var Sc = L * W;
    var H_lib = params.H_lib || fn.H_lib_rec;
    var H_grinda = params.H_grinda || (H_lib > 8 ? 1.4 : 1.0);
    var H_streasina = +(H_lib + H_grinda).toFixed(2);
    var panta = params.panta != null ? params.panta : 10; // % pt două pante
    var acoperis = params.acoperis || 'doua_pante';
    var H_coama = acoperis === 'plat' || acoperis === 'o_panta' ? +(H_streasina + W * (panta / 100) * (acoperis === 'o_panta' ? 1 : 0)).toFixed(2) : +(H_streasina + (W / 2) * (panta / 100)).toFixed(2);
    var H_med = +((H_streasina + H_coama) / 2).toFixed(2);
    var risc = params.risc || fn.risc || 'mediu';
    var sprinklere = params.sprinklere != null ? params.sprinklere : !!fn.sprinklere;
    var V = Math.round(Sc * H_med);
    var lim = (sprinklere ? HALE_NORMATIVE.compartiment.cu : HALE_NORMATIVE.compartiment.fara)[risc];
    var comp_ok = V <= lim.vol && Sc <= lim.sc;
    var sprinklere_necesare = !sprinklere && V > HALE_NORMATIVE.compartiment.fara[risc].vol;
    // mezanin
    var mez = null;
    if (params.are_mezanin) {
      var mezL = params.mezL || Math.min(L * 0.4, L), mezW = params.mezW || W;
      var Sc_mez = Math.min(mezL * mezW, Sc * 0.30);
      mez = { L: mezL, W: mezW, Sc: Math.round(Sc_mez), procent: +(Sc_mez / Sc * 100).toFixed(1), procent_ok: Sc_mez <= Sc * 0.30, H_sub: params.mez_H_sub || 2.7, H_pe: params.mez_H_pe || 2.8 };
    }
    var Sd = Sc + (mez ? mez.Sc : 0);
    var area = params.area || Sc / 0.5;
    var POT = +(Sc / area * 100).toFixed(1);
    var CUT = +(Sd / area).toFixed(2);
    // pas stâlpi
    var grp = params.functiune && params.functiune.indexOf('pod_rulant') >= 0 ? 'pod_rulant' : params.functiune && params.functiune.indexOf('logistica') >= 0 ? 'logistica_tir' : params.functiune && params.functiune.indexOf('productie') >= 0 ? 'productie' : 'depozitare';
    var pas = HALE_NORMATIVE.pasStalpi[grp] || HALE_NORMATIVE.pasStalpi.default;
    var traveeL = Math.max(1, Math.round(W / pas[0])), traveeT = Math.max(1, Math.round(L / pas[1]));
    return { L: L, W: W, Sc: Sc, H_lib: H_lib, H_grinda: H_grinda, H_streasina: H_streasina, H_coama: H_coama, H_med: H_med, panta: panta, acoperis: acoperis, risc: risc, sprinklere: sprinklere, V: V, comp_ok: comp_ok, comp_lim: lim, sprinklere_necesare: sprinklere_necesare, mez: mez, Sd: Sd, area: area, POT: POT, CUT: CUT, pasL: pas[0], pasT: pas[1], traveeL: traveeL, traveeT: traveeT, fn: fn, functiune: params.functiune || 'depozitare_stivuitor_4m' };
  }
  G.hale_calc = hale_calc;
  G.hale_genViewer3DParams = function (c) { return { type: 'industrial_hall', footprint: { L: c.L, W: c.W }, H_streasina: c.H_streasina, H_coama: c.H_coama, roof: c.acoperis, structure: 'metal', mezanin: c.mez }; };
  G.hale_genPromptAEDIS = function (c) { return 'Industrial hall, ' + c.L + 'x' + c.W + 'm footprint, eave height ' + c.H_streasina + 'm, ridge ' + c.H_coama + 'm, ' + c.acoperis + ' roof, steel frame structure, sandwich panel walls, sectional loading doors, photorealistic, daylight'; };

  // ── Desen vector nativ (jsPDF) ────────────────────────────────────────────
  function _fit(L, W, boxW, boxH) { var s = Math.min(boxW / L, boxH / W); return { s: s, w: L * s, h: W * s }; }
  function _dimText(pdf, x1, y1, x2, y2, label) { pdf.setDrawColor(120, 120, 120); pdf.setLineWidth(0.2); pdf.line(x1, y1, x2, y2); pdf.setFontSize(7); pdf.setTextColor(90, 90, 90); var mx = (x1 + x2) / 2, my = (y1 + y2) / 2; pdf.text(label, mx, my - 1, { align: 'center' }); }

  function drawPlanParter(pdf, ox, oy, boxW, boxH, c, GOLD, NAVY) {
    var f = _fit(c.L, c.W, boxW, boxH); var w = f.w, h = f.h; var x0 = ox + (boxW - w) / 2, y0 = oy;
    // conturul halei
    pdf.setDrawColor(NAVY[0], NAVY[1], NAVY[2]); pdf.setLineWidth(0.6); pdf.setFillColor(245, 247, 250); pdf.rect(x0, y0, w, h, 'FD');
    // grila de stâlpi (travee)
    pdf.setDrawColor(180, 190, 205); pdf.setLineWidth(0.15);
    var nx = c.traveeT, ny = c.traveeL;
    for (var i = 0; i <= nx; i++) { var xx = x0 + w * i / nx; pdf.line(xx, y0, xx, y0 + h); }
    for (var j = 0; j <= ny; j++) { var yy = y0 + h * j / ny; pdf.line(x0, yy, x0 + w, yy); }
    // stâlpi (puncte la intersecții)
    pdf.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
    for (var a = 0; a <= nx; a++) for (var b = 0; b <= ny; b++) { pdf.rect(x0 + w * a / nx - 0.7, y0 + h * b / ny - 0.7, 1.4, 1.4, 'F'); }
    // ușă acces (jos, centru)
    pdf.setFillColor(GOLD[0], GOLD[1], GOLD[2]); pdf.rect(x0 + w / 2 - 6, y0 + h - 1, 12, 2, 'F');
    pdf.setFontSize(7); pdf.setTextColor(120, 90, 20); pdf.text('acces', x0 + w / 2, y0 + h + 4, { align: 'center' });
    // cote
    _dimText(pdf, x0, y0 - 3, x0 + w, y0 - 3, c.L.toFixed(0) + ' m (' + c.traveeT + '×' + c.pasT + 'm)');
    pdf.setFontSize(7); pdf.setTextColor(90, 90, 90); pdf.text(c.W.toFixed(0) + ' m', x0 - 4, y0 + h / 2, { align: 'center', angle: 90 });
    return y0 + h + 8;
  }

  function drawSectiune(pdf, ox, oy, boxW, boxH, c, GOLD, NAVY) {
    var margin = 12; var availW = boxW - margin; var f = _fit(c.W, c.H_coama * 1.4, availW, boxH);
    var s = f.s; var w = c.W * s; var groundY = oy + boxH - 8; var x0 = ox + (boxW - w) / 2;
    var hStr = c.H_streasina * s, hCoama = c.H_coama * s;
    // sol
    pdf.setDrawColor(120, 100, 70); pdf.setLineWidth(0.5); pdf.line(x0 - 6, groundY, x0 + w + 6, groundY);
    pdf.setFillColor(225, 216, 200); for (var i = 0; i < w + 10; i += 3) { pdf.line(x0 - 6 + i, groundY, x0 - 9 + i, groundY + 3); }
    // stâlpi (2)
    pdf.setDrawColor(NAVY[0], NAVY[1], NAVY[2]); pdf.setLineWidth(1.2);
    pdf.line(x0, groundY, x0, groundY - hStr); pdf.line(x0 + w, groundY, x0 + w, groundY - hStr);
    // acoperiș
    pdf.setLineWidth(0.9);
    if (c.acoperis === 'plat') { pdf.line(x0, groundY - hStr, x0 + w, groundY - hStr); }
    else if (c.acoperis === 'o_panta') { pdf.line(x0, groundY - hStr, x0 + w, groundY - hCoama); }
    else { pdf.line(x0, groundY - hStr, x0 + w / 2, groundY - hCoama); pdf.line(x0 + w / 2, groundY - hCoama, x0 + w, groundY - hStr); }
    // cote înălțimi
    pdf.setDrawColor(150, 150, 150); pdf.setLineWidth(0.2); pdf.setFontSize(7); pdf.setTextColor(90, 90, 90);
    pdf.line(x0 - 7, groundY, x0 - 7, groundY - hStr); pdf.text('H streașină ' + c.H_streasina + 'm', x0 - 9, groundY - hStr / 2, { align: 'center', angle: 90 });
    pdf.line(x0 + w + 7, groundY, x0 + w + 7, groundY - hCoama); pdf.text('H coamă ' + c.H_coama + 'm', x0 + w + 9, groundY - hCoama / 2, { align: 'center', angle: 90 });
    // H liberă (interior)
    pdf.setDrawColor(GOLD[0], GOLD[1], GOLD[2]); pdf.line(x0 + 4, groundY, x0 + 4, groundY - c.H_lib * s); pdf.setTextColor(150, 110, 20); pdf.text('H liberă ' + c.H_lib + 'm', x0 + 7, groundY - c.H_lib * s / 2, { align: 'left', angle: 90 });
    // latime
    _dimText(pdf, x0, groundY + 5, x0 + w, groundY + 5, 'deschidere ' + c.W.toFixed(0) + ' m');
    return groundY + 10;
  }

  function drawFatada(pdf, ox, oy, boxW, boxH, c, GOLD, NAVY) {
    var f = _fit(c.L, c.H_coama * 1.3, boxW, boxH); var s = f.s; var w = c.L * s; var groundY = oy + boxH - 8; var x0 = ox + (boxW - w) / 2;
    var hStr = c.H_streasina * s, hCoama = c.H_coama * s;
    pdf.setDrawColor(120, 100, 70); pdf.setLineWidth(0.5); pdf.line(x0 - 6, groundY, x0 + w + 6, groundY);
    // corp hală (perete)
    pdf.setFillColor(238, 241, 245); pdf.setDrawColor(NAVY[0], NAVY[1], NAVY[2]); pdf.setLineWidth(0.6); pdf.rect(x0, groundY - hStr, w, hStr, 'FD');
    // linii panouri sandwich
    pdf.setDrawColor(200, 208, 218); pdf.setLineWidth(0.1); for (var i = 1; i < 6; i++) { pdf.line(x0, groundY - hStr * i / 6, x0 + w, groundY - hStr * i / 6); }
    // fronton acoperiș (triunghi pt două pante, vedere din lateral = dreptunghi cu vârf) — reprezentăm banda de coamă
    pdf.setFillColor(NAVY[0], NAVY[1], NAVY[2]); pdf.rect(x0, groundY - hCoama, w, Math.max(1, hCoama - hStr), 'F');
    // uși TIR
    pdf.setFillColor(GOLD[0], GOLD[1], GOLD[2]); var dw = Math.min(w * 0.12, 8); pdf.rect(x0 + w * 0.15, groundY - hStr * 0.55, dw, hStr * 0.55, 'F'); pdf.rect(x0 + w * 0.7, groundY - hStr * 0.55, dw, hStr * 0.55, 'F');
    _dimText(pdf, x0, groundY + 5, x0 + w, groundY + 5, 'lungime ' + c.L.toFixed(0) + ' m');
    return groundY + 10;
  }

  // ══════════════════════════════════════════════════════════════════════
  async function generateHala() {
    var S = G.S;
    if (!S || !S.parcels || !S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { if (G.ss) G.ss('Selectați o parcelă pentru fișa de hală.'); return; }
    var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel];
    if (!ap.geo || !ap.geo.geometry) { if (G.ss) G.ss('Parcela nu are geometrie.'); return; }
    if (!G._initStudyPdf) { if (G.ss) G.ss('Motorul PDF nu e încărcat.'); return; }
    if (G.ss) G.ss('Se generează Fișa tehnică de hală…');

    var lat = 47.16, lon = 27.6;
    try { if (G.turf && ap.geo) { var ct = G.turf.centerOfMass(ap.geo).geometry.coordinates; lon = ct[0]; lat = ct[1]; } } catch (e) {}
    var area = ap.area || 5000;
    // hală reprezentativă din parcelă (POT industrial ~50%, aspect 2:1)
    var Sc_target = area * 0.5; var W0 = Math.max(15, Math.round(Math.sqrt(Sc_target / 2))); var L0 = Math.round(W0 * 2);
    var c = hale_calc({ functiune: 'depozitare_stivuitor_4m', L: L0, W: W0, area: area, are_mezanin: area > 2000 });
    // branșamente (UtilitatiRO) — best-effort
    var util = null; try { if (G.UtilitatiRO && G.UtilitatiRO.fetchGrid) { var dLat = 0.02, dLon = 0.02; var bbox = [lat - dLat, lon - dLon, lat + dLat, lon + dLon]; var gr = await G.UtilitatiRO.fetchGrid(bbox); if (gr && G.turf) { util = { line: null, pipe: null }; var pt = G.turf.point([lon, lat]); function near(fs) { var best = null; (fs || []).forEach(function (fe) { try { var dd = G.turf.pointToLineDistance(pt, fe, { units: 'meters' }); if (best == null || dd < best) best = Math.round(dd); } catch (e) {} }); return best; } util.line = near(gr.lines); util.pipe = near(gr.gas); } } } catch (e) {}

    var d = G._initStudyPdf('Fisa Tehnica Hala Industriala', 'Pre-proiectare · dimensionare + planșe', 40);
    var pdf = d.pdf, W = d.W, H = d.H, sec = d.sec, body = d.body, tblRow = d.tblRow, newPage = d.newPage, checkY = d.checkY, miniChart = d.miniChart, cover = d.cover;
    var nrcad = d.nrcad || ap.nrcad || '—', uat = d.uat || ap.uat || '', judet = d.judet || '';
    var GOLD = d.GOLD || [212, 175, 55], NAVY = d.NAVY || [10, 25, 65];
    var TITLE = 'FIȘĂ HALĂ'; var pg = 1, cy;
    function page(t) { pg++; cy = newPage(t || TITLE, pg); }
    function P(txt) { cy = checkY(cy, 26, TITLE, pg); cy = body(txt, 14, cy) + 2.5; }
    function SEC(t) { cy = checkY(cy, 30, TITLE, pg); cy = sec(t, cy) + 2; }

    // COPERTĂ
    cover('Fișă tehnică de pre-proiectare — hală industrială / depozit\nDimensionare automată · planșe · verificări NP 008-97 + P118 + Eurocod',
      null,
      [['Nr. cadastral', nrcad], ['UAT / localitate', uat || '—'], ['Suprafață parcelă', area.toLocaleString('ro-RO') + ' mp'],
       ['Amprentă hală (Sc)', c.Sc.toLocaleString('ro-RO') + ' mp (' + c.L + '×' + c.W + ' m)'],
       ['Funcțiune / H liberă', c.fn.label + ' · ' + c.H_lib + ' m']],
      c.comp_ok, c.comp_ok ? 'Compartiment incendiu conform' : 'Compartiment: necesită sprinklere/pereți antifoc');

    // CUPRINS + REZUMAT
    page('CUPRINS ȘI REZUMAT');
    cy = sec('CUPRINS', cy) + 1;
    ['1. Cadrul legal și normativ', '2. Programul funcțional', '3. Dimensionarea în înălțime', '4. PLAN PARTER (planșă)', '5. SECȚIUNE TRANSVERSALĂ (planșă)', '6. FAȚADĂ (planșă)',
     '7. Sistemul structural', '8. Acoperișul', '9. Compartimentarea la incendiu (P118)', '10. Mezaninul', '11. Indicatori urbanistici (POT/CUT)',
     '12. Utilități și branșamente', '13. Legături în ecosistem (SSI/SKID/3D)', '14. Concluzii', 'Anexe'].forEach(function (t) { cy = body(t, 16, cy) + 0.5; });
    cy += 3; SEC('REZUMAT EXECUTIV');
    P('Fișa de față propune o pre-dimensionare a unei hale industriale/depozit pe parcela cu nr. cadastral ' + nrcad + ' (' + area.toLocaleString('ro-RO') + ' mp), în ' + (uat || 'UAT') + '. Soluția-tip: amprentă ' + c.L + '×' + c.W + ' m (Sc = ' + c.Sc.toLocaleString('ro-RO') + ' mp), funcțiune „' + c.fn.label + '", înălțime liberă ' + c.H_lib + ' m, streașină ' + c.H_streasina + ' m, coamă ' + c.H_coama + ' m, acoperiș în două pante. Parametrii sunt orientativi și editabili — fișa oferă cadrul de dimensionare și verificările normative pentru faza de temă/anteproiect.');
    P('Verificări cheie: volumul compartimentului de incendiu este ' + c.V.toLocaleString('ro-RO') + ' mc (' + (c.comp_ok ? 'CONFORM' : 'DEPĂȘEȘTE') + ' limita de ' + c.comp_lim.vol.toLocaleString('ro-RO') + ' mc pentru risc ' + c.risc + (c.sprinklere ? ' cu' : ' fără') + ' sprinklere)' + (c.sprinklere_necesare ? ' — sunt NECESARE sprinklere sau compartimentare' : '') + '. POT = ' + c.POT + '%, CUT = ' + c.CUT + '. Aceste rezultate se corelează cu Scenariul de Securitate la Incendiu (SSI).');

    // 1. CADRU LEGAL
    page('CADRU LEGAL'); SEC('1. CADRUL LEGAL ȘI NORMATIV');
    P('Proiectarea halelor industriale și a depozitelor este guvernată de normative de igienă și securitate a muncii (înălțimi minime), de securitate la incendiu (compartimentare, evacuare) și de codurile de proiectare structurală (Eurocoduri). Cadrul aplicabil:');
    cy = tblRow(['Normativ', 'Obiect'], cy, true, [58, 124]);
    LEGAL.forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [58, 124]); });
    cy += 3;
    P('Înălțimea liberă minimă este impusă de funcțiune (NP 008-97 și normele specifice de activitate). Volumul compartimentului de incendiu și necesitatea sprinklerelor derivă din P118/1-2015, aspecte detaliate în capitolul 9 și preluate integral în Scenariul de Securitate la Incendiu.');

    // 2. PROGRAM FUNCȚIONAL
    page('PROGRAM FUNCȚIONAL'); SEC('2. PROGRAMUL FUNCȚIONAL');
    P('Funcțiunea halei determină înălțimea liberă minimă, sistemul structural și necesitatea unui pod rulant. Tabelul de mai jos sintetizează cerințele de înălțime pe funcțiuni uzuale:');
    cy = tblRow(['Funcțiune', 'H liberă min.', 'H recomandată', 'Risc / pod rulant'], cy, true, [66, 36, 40, 40]);
    Object.keys(HALE_NORMATIVE.inaltimiFunctiune).forEach(function (k) { var f = HALE_NORMATIVE.inaltimiFunctiune[k]; if (f.H_lib_min) { cy = checkY(cy, 13, TITLE, pg); cy = tblRow([f.label, f.H_lib_min + ' m', (f.H_lib_rec || '—') + ' m', (f.risc || '—') + (f.pod ? ' · pod rulant' : '')], cy, false, [66, 36, 40, 40]); } });
    cy += 3;
    P('Pentru parcela analizată s-a considerat funcțiunea „' + c.fn.label + '" (' + c.functiune + '), reprezentativă pentru dezvoltările logistice/de depozitare. Modificarea funcțiunii recalculează automat toate cotele și verificările.');

    // 3. DIMENSIONARE ÎNĂLȚIME
    page('DIMENSIONARE'); SEC('3. DIMENSIONAREA ÎN ÎNĂLȚIME');
    P('Înălțimea construcției se compune din înălțimea liberă utilă (impusă de funcțiune), înălțimea structurii de acoperire (grindă/fermă) și supraînălțarea dată de panta acoperișului. Formule: H streașină = H liberă + H grindă; H coamă = H streașină + (deschidere/2) × pantă.');
    cy = tblRow(['Parametru', 'Valoare', 'Sursă / formulă'], cy, true, [56, 40, 86]);
    [['Înălțime liberă (H_lib)', c.H_lib + ' m', 'NP 008-97 — funcțiune ' + c.fn.label],
     ['Înălțime grindă/fermă', c.H_grinda + ' m', 'Estimare structurală'],
     ['H streașină', c.H_streasina + ' m', 'H_lib + H_grindă'],
     ['Pantă acoperiș', c.panta + '%', 'Două pante'],
     ['H coamă', c.H_coama + ' m', 'H_streașină + (W/2)×pantă'],
     ['H medie (calcul volum)', c.H_med + ' m', '(streașină + coamă)/2']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [56, 40, 86]); });
    cy += 3;
    cy = miniChart(['Cotă', 'm'], [['H liberă', c.H_lib], ['Streașină', c.H_streasina], ['Coamă', c.H_coama]], 'Cotele de înălțime ale halei (m)', cy) || cy;
    P('Cotele rezultate respectă înălțimea liberă minimă impusă de funcțiune. Pentru funcțiuni cu pod rulant, înălțimea se recalculează pornind de la cota capului podului rulant (SR EN 1991-3).');

    // 4. PLAN PARTER (planșă)
    page('PLAN PARTER'); SEC('4. PLAN PARTER (planșă schematică)');
    P('Planul parter prezintă amprenta halei (' + c.L + '×' + c.W + ' m), trama structurală (travee) și accesul principal. Modulul structural recomandat: ' + c.pasT + '×' + c.pasL + ' m (' + c.traveeT + '×' + c.traveeL + ' travee).');
    cy = drawPlanParter(pdf, 14, cy + 2, W - 28, 90, c, GOLD, NAVY);
    cy += 2;
    P('Trama de stâlpi optimizează raportul dintre costul structurii și flexibilitatea spațiului. Deschiderile mari reduc numărul de stâlpi interiori (avantaj pentru depozitare cu stivuitor și logistică), dar cresc dimensiunea grinzilor.');

    // 5. SECȚIUNE
    page('SECȚIUNE TRANSVERSALĂ'); SEC('5. SECȚIUNE TRANSVERSALĂ (planșă schematică)');
    P('Secțiunea transversală evidențiază înălțimile caracteristice (liberă, streașină, coamă) și geometria acoperișului în două pante.');
    cy = drawSectiune(pdf, 14, cy + 2, W - 28, 95, c, GOLD, NAVY);
    cy += 2;
    P('Cotele desenate: înălțime liberă ' + c.H_lib + ' m (gabaritul util interior), streașină ' + c.H_streasina + ' m, coamă ' + c.H_coama + ' m. Structura verticală (stâlpi) și șarpanta se dimensionează conform Eurocod, în funcție de deschidere, încărcări de zăpadă și vânt.');

    // 6. FAȚADĂ
    page('FAȚADĂ'); SEC('6. FAȚADĂ LONGITUDINALĂ (planșă schematică)');
    P('Fațada longitudinală (lungime ' + c.L + ' m) indică anvelopa din panouri sandwich și pozițiile ușilor de acces (secționale / TIR).');
    cy = drawFatada(pdf, 14, cy + 2, W - 28, 85, c, GOLD, NAVY);
    cy += 2;
    P('Anvelopa uzuală: panouri sandwich termoizolante (perete și acoperiș), cu grosimi de 80–150 mm în funcție de cerințele termice. Ușile secționale pentru TIR au dimensiuni min. 4,0×4,5 m (GT 035-02).');

    // 7. STRUCTURĂ
    page('SISTEM STRUCTURAL'); SEC('7. SISTEMUL STRUCTURAL');
    cy = tblRow(['Sistem', 'H rec. (m)', 'Deschidere max.', 'Caracteristici'], cy, true, [42, 26, 34, 80]);
    HALE_NORMATIVE.structuri.forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow([r[1], r[2], r[3] + ' m', r[4]], cy, false, [42, 26, 34, 80]); });
    cy += 3;
    var recStruct = c.W > 30 ? 'ferme_metalice' : c.W > 24 ? 'cadre_metalice' : 'cadre_metalice';
    P('Pentru deschiderea de ' + c.W + ' m, sistemul recomandat este „' + (recStruct === 'ferme_metalice' ? 'Ferme metalice + stâlpi' : 'Cadre metalice rigide') + '". Cadrele metalice sunt cele mai economice și rapide pentru deschideri până la 30 m; peste această valoare, fermele metalice devin soluția optimă. Betonul prefabricat oferă rezistență la foc nativă (avantaj pentru compartimentare), iar arcele elimină stâlpii interiori la deschideri medii.');

    // 8. ACOPERIȘ
    page('ACOPERIȘ'); SEC('8. ACOPERIȘUL');
    cy = tblRow(['Tip', 'Pantă', 'Utilizare'], cy, true, [40, 34, 108]);
    HALE_NORMATIVE.acoperisuri.forEach(function (r) { cy = checkY(cy, 14, TITLE, pg); cy = tblRow([r[1], r[2], r[3]], cy, false, [40, 34, 108]); });
    cy += 3;
    P('Soluția considerată: acoperiș în două pante (cel mai frecvent în România), cu pantă de ' + c.panta + '% și scurgere spre streașini. Pentru hale cu nevoi mari de iluminat natural fără însorire directă (ateliere, textile) se recomandă acoperișul tip shed cu orientare nord. Panta și tipul de acoperiș influențează încărcarea din zăpadă și soluția de hidroizolație.');

    // 9. COMPARTIMENT INCENDIU
    page('COMPARTIMENT INCENDIU'); SEC('9. COMPARTIMENTAREA LA INCENDIU (P118/1-2015)');
    P('Volumul compartimentului de incendiu (V = Sc × H medie) se compară cu limitele maxime admise de P118/1-2015, diferențiate pe riscul de incendiu și pe prezența sprinklerelor. Depășirea limitelor impune sprinklere automate sau împărțirea în compartimente cu pereți antifoc.');
    cy = tblRow(['Element', 'Valoare'], cy, true, [90, 92]);
    [['Suprafață compartiment (Sc)', c.Sc.toLocaleString('ro-RO') + ' mp'], ['H medie', c.H_med + ' m'], ['Volum compartiment (V)', c.V.toLocaleString('ro-RO') + ' mc'],
     ['Risc de incendiu', c.risc], ['Sprinklere', c.sprinklere ? 'prevăzute' : 'neprevăzute'], ['Limită volum (P118)', c.comp_lim.vol.toLocaleString('ro-RO') + ' mc'], ['Limită suprafață (P118)', c.comp_lim.sc.toLocaleString('ro-RO') + ' mp'],
     ['VERIFICARE', c.comp_ok ? 'CONFORM' : 'DEPĂȘIT — necesită măsuri']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [90, 92]); });
    cy += 3;
    P((c.comp_ok ? 'Volumul se încadrează în limitele admise pentru configurația considerată.' : 'Volumul depășește limita admisă: se impun ' + (c.sprinklere ? 'compartimentare cu pereți antifoc EI 120/180' : 'sprinklere automate (care măresc limita de ~3×) sau compartimentare') + '.') + ' Analiza completă a securității la incendiu (evacuare, detectare, hidranți, acces ISU) face obiectul Scenariului de Securitate la Incendiu (SSI), care preia acești parametri prin referință, fără a-i recalcula.');

    // 10. MEZANIN
    page('MEZANIN'); SEC('10. MEZANINUL');
    if (c.mez) {
      P('Proiectul include un mezanin (birouri/tehnic) cu suprafața de ' + c.mez.Sc.toLocaleString('ro-RO') + ' mp (' + c.mez.procent + '% din Sc). ' + HALE_NORMATIVE.mezanin.nota + '.');
      cy = tblRow(['Parametru', 'Valoare', 'Cerință'], cy, true, [60, 44, 78]);
      [['Suprafață mezanin', c.mez.Sc.toLocaleString('ro-RO') + ' mp', '≤ 30% din Sc (NP 008-97)'], ['Procent din Sc', c.mez.procent + '%', c.mez.procent_ok ? 'CONFORM' : 'DEPĂȘIT'],
       ['H liberă sub planșeu', c.mez.H_sub + ' m', '≥ 2,50 m (L.319/2006)'], ['H liberă pe mezanin', c.mez.H_pe + ' m', '≥ 2,70 m (GP 114-2006)'], ['Rezistență foc planșeu', HALE_NORMATIVE.mezanin.rezFoc, 'element portant']
      ].forEach(function (r) { cy = tblRow(r, cy, false, [60, 44, 78]); });
      cy += 3;
      P('Mezaninul intră în calculul suprafeței desfășurate (Sd) și al CUT. Dacă depășește 30% din Sc, este considerat etaj și modifică regimul de înălțime și indicatorii urbanistici. Necesită minimum 2 ieșiri dacă suprafața > 50 mp sau > 50 persoane.');
    } else {
      P('Configurația considerată nu include mezanin. Un mezanin de birouri/tehnic poate fi adăugat pe maximum 30% din suprafața construită (NP 008-97 art. 3.2.4), cu înălțimi libere de minimum 2,50 m sub planșeu și 2,70 m la nivelul birourilor, planșeu cu rezistență la foc REI 60. Adăugarea unui mezanin crește suprafața desfășurată și CUT-ul.');
    }

    // 11. INDICATORI URBANISTICI
    page('INDICATORI URBANISTICI'); SEC('11. INDICATORI URBANISTICI (POT / CUT / RH)');
    cy = tblRow(['Indicator', 'Valoare', 'Observație'], cy, true, [56, 40, 86]);
    [['Suprafață parcelă', area.toLocaleString('ro-RO') + ' mp', 'Din cadastru'], ['Suprafață construită (Sc)', c.Sc.toLocaleString('ro-RO') + ' mp', 'Amprenta halei'],
     ['Suprafață desfășurată (Sd)', c.Sd.toLocaleString('ro-RO') + ' mp', 'Parter' + (c.mez ? ' + mezanin' : '')], ['POT', c.POT + '%', 'Sc / parcelă × 100'], ['CUT', c.CUT, 'Sd / parcelă'],
     ['Regim de înălțime', c.mez ? 'P + mezanin' : 'P (parter înalt)', 'H max ' + c.H_coama + ' m']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [56, 40, 86]); });
    cy += 3;
    P('POT și CUT rezultate trebuie verificate față de valorile maxime admise prin regulamentul de urbanism (PUG/PUZ) al zonei. Zonele industriale/logistice admit uzual POT ridicat (50–70%) și CUT corelat cu regimul de înălțime. Depășirea necesită documentație de urbanism (PUZ).');

    // 12. UTILITĂȚI
    page('UTILITĂȚI'); SEC('12. UTILITĂȚI ȘI BRANȘAMENTE');
    P('Halele industriale necesită branșamente de energie electrică (adesea de medie tensiune, cu post de transformare propriu), apă, canalizare și, frecvent, gaze naturale pentru procese sau încălzire. Proximitatea rețelelor de transport influențează costul racordării.');
    cy = tblRow(['Rețea', 'Distanță estimată (OSM)', 'Observație'], cy, true, [50, 56, 76]);
    [['Linie electrică (transport)', util && util.line != null ? util.line + ' m' : 'de verificat', 'Racord MT → post trafo propriu'],
     ['Conductă gaz', util && util.pipe != null ? util.pipe + ' m' : 'de verificat', 'Racord pt proces/încălzire'],
     ['Apă / canalizare', 'de verificat operator local', 'Aviz operator (ex. avizul de amplasament)']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [50, 56, 76]); });
    cy += 3;
    P('Distanțele electric/gaz sunt estimate automat din rețelele de transport (OpenStreetMap), prin modulul Utilități Naționale al platformei. Pentru branșamentele efective (medie/joasă tensiune, gaz de distribuție) se solicită avize de la operatorii de distribuție. Dacă hala include instalații GPL, se corelează cu studiul SKID și cu banda de protecție de 20 m față de pădure (studiul silvic).');

    // 13. INTERCONECTĂRI
    page('LEGĂTURI ECOSISTEM'); SEC('13. LEGĂTURI ÎN ECOSISTEMUL UrbanX');
    P('Fișa de hală se corelează cu celelalte componente ale platformei, fără a le duplica:');
    P('• Scenariul de Securitate la Incendiu (SSI): preia prin referință riscul de incendiu, suprafața și volumul compartimentului, necesitatea sprinklerelor și geometria pentru calculul căilor de evacuare — parametri calculați aici o singură dată.');
    P('• Studiul SKID (instalații GPL): dacă hala folosește GPL pentru proces/încălzire, dimensionarea rezervorului și zonarea ATEX se preiau din modulul SKID; distanțele de siguranță se corelează.');
    P('• Utilități Naționale: proximitatea la rețelele de transport (electric/gaz) alimentează evaluarea branșamentelor din capitolul 12.');
    P('• Viewer 3D / AEDIS: parametrii geometrici (amprentă, streașină, coamă, tip acoperiș) sunt exportați către vizualizarea 3D și către generarea de randări fotorealiste (funcții hale_genViewer3DParams / hale_genPromptAEDIS).');
    P('• Studiul de Amplasament și indicatorii urbanistici: POT/CUT rezultate se verifică față de reglementările PUG/PUZ tratate în modulele de urbanism.');

    // 14. CONCLUZII
    page('CONCLUZII'); SEC('14. CONCLUZII');
    P('Soluția-tip de hală pentru parcela cu nr. cadastral ' + nrcad + ': amprentă ' + c.L + '×' + c.W + ' m (Sc = ' + c.Sc.toLocaleString('ro-RO') + ' mp), funcțiune „' + c.fn.label + '", H liberă ' + c.H_lib + ' m, streașină ' + c.H_streasina + ' m, coamă ' + c.H_coama + ' m, acoperiș în două pante, structură metalică, tramă ' + c.pasT + '×' + c.pasL + ' m.');
    P('Indicatori: POT ' + c.POT + '%, CUT ' + c.CUT + '. Compartiment incendiu ' + c.V.toLocaleString('ro-RO') + ' mc — ' + (c.comp_ok ? 'conform' : 'necesită sprinklere/compartimentare') + '. ' + (c.sprinklere_necesare ? 'Se recomandă prevederea de sprinklere automate.' : ''));
    P('Fișa are caracter de pre-proiectare (temă/anteproiect); proiectul tehnic necesită calcul structural complet (Eurocod), scenariu SSI avizat ISU și verificarea față de regulamentul de urbanism al zonei.');

    // ANEXE
    page('ANEXE'); SEC('ANEXE — REFERINȚE ȘI DISCLAIMER');
    cy = tblRow(['Normativ', 'Obiect'], cy, true, [58, 124]);
    LEGAL.forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [58, 124]); });
    cy += 3;
    P('DISCLAIMER: Document orientativ de pre-proiectare, generat automat de platforma UrbanX. Parametrii sunt reprezentativi și editabili. NU înlocuiește proiectul tehnic, calculul structural (Eurocod), scenariul de securitate la incendiu avizat ISU și verificările de conformitate urbanistică. Planșele sunt schematice, la scară aproximativă, pentru faza de temă.');

    var fn = (G._stratFileName ? G._stratFileName('FisaHala', { mode: 'parcela', nrcad: nrcad, localitate: uat }) : ('FisaHala_' + nrcad)) + '.pdf';
    try { pdf.save(fn); } catch (e) { pdf.save('FisaHala_' + nrcad + '.pdf'); }
    if (G.ss) G.ss('✅ Fișă tehnică hală generată (' + pdf.getNumberOfPages() + ' pag).');
  }

  G.generateHala = generateHala;
  console.log('[Hale] modul încărcat (window.generateHala)');
})(window);
