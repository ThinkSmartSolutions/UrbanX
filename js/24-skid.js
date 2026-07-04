/* ============================================================================
 * UrbanX — SKID GPL (js/24-skid.js)
 * Instalație GPL (recipient(e) + grup reglare) PROIECTATĂ ca OBIECT 3D REAL în
 * Viewer 3D (rezervor cilindric + platformă + cabinet + gard, prin _v3dAddSkid)
 * + calcul (debit/autonomie/vaporizare/SEVESO) + planșe (amplasare, zonare ATEX,
 * schemă tehnologică) + verificări distanțe. PT C8-2010 + I 31/1999 + NTPGN +
 * Ord. ANRE 32/2021 + HG 804/2007 (SEVESO) + HG 1058/2006 (ATEX).
 *
 * Interconectat: UtilitatiRO (proximitate conductă gaz), Silvic (banda 20 m),
 * SSI (importă riscul foarte_mare/ATEX prin referință), AEDIS/Viewer3D (3D).
 *
 * window: proiecteazaSkid · skid_calc · generateSkidPDF · _SKID_PROIECTE
 * ========================================================================== */
(function (G) {
  'use strict';
  var PROXY = G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
  var RHO = 0.51; // kg/L propan lichid

  var DEST = {
    incalzire_cladiri: { label: 'Încălzire clădiri', cap_rec: 5000, norme: ['PT C8-2010', 'I 31/1999', 'GT 125-02'], atex: false, target_kW: 200 },
    distributie_auto: { label: 'Stație distribuție auto', cap_rec: 15000, norme: ['PT C8-2010', 'NTPGN-2008', 'Ord. ANRE 32/2021'], atex: true, target_kW: 0 },
    industrial: { label: 'Industrial (proces)', cap_rec: 10000, norme: ['PT C8-2010', 'PT C6-2010', 'HG 1058/2006 (ATEX)'], atex: true, target_kW: 500 }
  };
  var DIST = { drumuri: 3, surse_foc: 5, canalizare: 2, linii_electrice: 5, descarcare_autocisterna: 7.5, perimetru_periculos: 15 };
  var DIST_CLADIRI = [ // [maxL, tip_I, tip_II, tip_III]
    [500, 3, 5, 5], [1000, 5, 5, 10], [3000, 5, 8, 10], [6000, 8, 10, 15], [14000, 10, 15, 20], [Infinity, 15, 20, 30]
  ];
  var LEGAL = [
    ['PT C8-2010 (ISCIR)', 'Prescripții tehnice — instalații de distribuție/utilizare GPL; aviz ISCIR obligatoriu'],
    ['I 31/1999', 'Normativ de proiectare a sistemelor de alimentare cu GPL'],
    ['NTPGN-2008', 'Norme tehnice — stații de distribuție GPL auto'],
    ['Ord. ANRE 32/2021', 'Autorizarea stațiilor de distribuție GPL'],
    ['HG 804/2007 (SEVESO III)', 'Controlul accidentelor majore — Politică Prevenire Accident Major (PPAM) dacă > 50 t'],
    ['HG 1058/2006 (ATEX)', 'Securitate în atmosfere potențial explozive — Document de Protecție la Explozie'],
    ['SR EN 60079', 'Echipamente electrice pentru zone ATEX'],
    ['P118/1-2015', 'Securitate la incendiu — risc foarte mare (→ SSI)']
  ];

  G._SKID_PROIECTE = G._SKID_PROIECTE || {};

  function _dimRec(cap) { return cap <= 1000 ? { L: 1.5, W: 0.8 } : cap <= 3000 ? { L: 2.5, W: 1.0 } : cap <= 5000 ? { L: 3.2, W: 1.1 } : cap <= 7000 ? { L: 3.8, W: 1.2 } : { L: 4.5, W: 1.3 }; }
  function _distCladiri(capTot) { for (var i = 0; i < DIST_CLADIRI.length; i++) if (capTot <= DIST_CLADIRI[i][0]) return { tip_I: DIST_CLADIRI[i][1], tip_II: DIST_CLADIRI[i][2], tip_III: DIST_CLADIRI[i][3] }; return { tip_I: 15, tip_II: 20, tip_III: 30 }; }

  function skid_calc(params) {
    params = params || {};
    var dest = params.destinatie || 'incalzire_cladiri'; var D = DEST[dest] || DEST.incalzire_cladiri;
    var nrRec = params.nrRec || 1; var capRec = params.capRec || D.cap_rec; var capTot = nrRec * capRec;
    var totalKW = params.totalKW != null ? params.totalKW : D.target_kW;
    var debit = +(totalKW * 0.08).toFixed(1); // kg/h
    var capKg = capTot * RHO; var util = capKg * 0.85;
    var oreZi = params.oreZi || 10;
    var autonomieZile = debit > 0 ? +(util / (debit * oreZi)).toFixed(1) : null;
    var tone = +(capTot * RHO / 1000).toFixed(2); var seveso = tone >= 50;
    var dim = _dimRec(capRec); var distCl = _distCladiri(capTot);
    var pW = +(nrRec * (dim.W + 1.2) + 2).toFixed(1), pL = +(dim.L + 4).toFixed(1);
    return { dest: dest, label: D.label, nrRec: nrRec, capRec: capRec, capTot: capTot, totalKW: totalKW, debit: debit, capKg: Math.round(capKg), util: Math.round(util), oreZi: oreZi, autonomieZile: autonomieZile, tone: tone, seveso: seveso, atex: D.atex, dim: dim, distCladiri: distCl, dist: DIST, pW: pW, pL: pL, norme: D.norme };
  }
  G.skid_calc = skid_calc;
  G.skid_genPromptAEDIS = function (c) { return 'GPL skid installation: ' + c.nrRec + ' horizontal cylindrical LPG tank(s) ' + c.dim.L + 'x' + c.dim.W + 'm on concrete platform, pressure regulation cabinet, safety fence, warning signage, photorealistic, industrial'; };

  // ── PROIECTARE — obiect 3D real în Viewer 3D ──────────────────────────────
  function proiecteazaSkid(opts) {
    opts = opts || {};
    var S = G.S;
    if (!S || !S.parcels || !S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { if (G.ss) G.ss('Selectați o parcelă pentru proiectarea SKID-ului.'); return; }
    var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel];
    if (!ap.geo || !ap.geo.geometry) { if (G.ss) G.ss('Parcela nu are geometrie.'); return; }
    var c = skid_calc(opts); G._SKID_PROIECTE[ap.nrcad || 'x'] = c;
    // centroid parcelă
    var lat = 47.16, lon = 27.6;
    try { if (G.turf) { var ct = G.turf.centerOfMass(ap.geo).geometry.coordinates; lon = ct[0]; lat = ct[1]; } } catch (e) {}
    // placeholder minim în S.vol._lastFeats (ca viewer-ul să se deschidă) — pad mic sub platformă
    var dd = 0.00002;
    S.vol = S.vol || {};
    S.vol._lastFeats = [{ type: 'Feature', properties: { base: 0, top: 0.1, color: '#b8bcc2', floor: 0 }, geometry: { type: 'Polygon', coordinates: [[[lon - dd, lat - dd], [lon + dd, lat - dd], [lon + dd, lat + dd], [lon - dd, lat + dd], [lon - dd, lat - dd]]] } }];
    S.vol.fn = 'industrie'; S.vol.genDone = true;
    // parametri pentru _v3dAddSkid
    window._SKID_VIEW = { nTanks: c.nrRec, tankLen: c.dim.L, tankDia: c.dim.W, pW: c.pW, pL: c.pL };
    // deschide Viewer 3D → _v3dAddSkid desenează SKID-ul
    try {
      if (typeof G.aedisOpen3DViewer === 'function') G.aedisOpen3DViewer();
      else if (typeof G.open3DViewer === 'function') G.open3DViewer();
      else if (G.ss) G.ss('Viewer 3D indisponibil — încărcați harta.');
    } catch (e) { if (G.ss) G.ss('Eroare viewer: ' + e.message); }
    if (G.ss) G.ss('🛢 SKID GPL proiectat 3D: ' + c.nrRec + '×' + c.capRec.toLocaleString('ro-RO') + 'L (' + c.tone + 't). Fișa tehnică + planșe din Rapoarte.');
    return c;
  }
  G.proiecteazaSkid = proiecteazaSkid;
  // curăță SKID-ul din viewer
  G.skid_clearView = function () { window._SKID_VIEW = null; };

  // ── Desen planșe (vector jsPDF) ───────────────────────────────────────────
  function drawAmplasare(pdf, ox, oy, boxW, boxH, c, GOLD, NAVY) {
    var s = Math.min(boxW / (c.pW + 30), boxH / (c.pL + 30)); var w = c.pW * s, h = c.pL * s; var x0 = ox + boxW / 2 - w / 2, y0 = oy + 10;
    // zona periculoasă (perimetru 15m) — cerc pericol
    pdf.setDrawColor(220, 60, 60); pdf.setLineWidth(0.3); pdf.setFillColor(250, 235, 235);
    var rz = c.dist.perimetru_periculos * s; pdf.circle(x0 + w / 2, y0 + h / 2, Math.max(rz, w), 'FD');
    // platformă
    pdf.setFillColor(200, 205, 212); pdf.setDrawColor(NAVY[0], NAVY[1], NAVY[2]); pdf.setLineWidth(0.5); pdf.rect(x0, y0, w, h, 'FD');
    // rezervoare (cerc = secțiune)
    pdf.setFillColor(242, 244, 247); pdf.setDrawColor(90, 90, 100);
    for (var i = 0; i < c.nrRec; i++) { var cxr = x0 + w * (i + 1) / (c.nrRec + 1); pdf.rect(cxr - c.dim.W * s / 2, y0 + h / 2 - c.dim.L * s / 2, c.dim.W * s, c.dim.L * s, 'FD'); }
    // punct descărcare autocisternă
    pdf.setFillColor(GOLD[0], GOLD[1], GOLD[2]); pdf.circle(x0 + w + c.dist.descarcare_autocisterna * s * 0.3, y0 + h / 2, 2, 'F');
    pdf.setFontSize(7); pdf.setTextColor(90, 90, 90);
    pdf.text('platformă ' + c.pW + '×' + c.pL + ' m', x0 + w / 2, y0 - 2, { align: 'center' });
    pdf.setTextColor(200, 60, 60); pdf.text('zonă periculoasă ' + c.dist.perimetru_periculos + ' m', x0 + w / 2, y0 + h + rz * 0.5, { align: 'center' });
    return y0 + h + Math.max(rz, 20) + 6;
  }
  function drawATEX(pdf, ox, oy, boxW, boxH, c) {
    var cx = ox + boxW / 2, cy0 = oy + 30; var u = 8;
    // Zona 0 (interior recipient) / Zona 1 (4.5m) / Zona 2 (rezerva)
    pdf.setFillColor(255, 210, 0); pdf.setDrawColor(180, 150, 0); pdf.circle(cx, cy0, 4.5 * u * 0.4, 'FD');
    pdf.setFillColor(255, 235, 120); pdf.circle(cx, cy0, 3.0 * u * 0.4, 'FD');
    pdf.setFillColor(200, 60, 60); pdf.circle(cx, cy0, 0.6 * u, 'F');
    pdf.setFontSize(8); pdf.setTextColor(60, 60, 60);
    pdf.text('Zona 0 (interior recipient)', cx, cy0 + 5.0 * u * 0.4 + 4, { align: 'center' });
    pdf.text('Zona 1 — 3,0 m (electrovane, gât)', cx, cy0 + 3.6 * u * 0.4 + 2, { align: 'center' });
    pdf.text('Zona 2 — 4,5 m (dispenser/racord)', cx, cy0 - 4.5 * u * 0.4 - 2, { align: 'center' });
    return cy0 + 5.0 * u * 0.4 + 10;
  }

  // ── PDF tehnic (secundar) ─────────────────────────────────────────────────
  async function generateSkidPDF() {
    var S = G.S;
    if (!S || !S.parcels || !S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { if (G.ss) G.ss('Selectați o parcelă.'); return; }
    var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel];
    if (!G._initStudyPdf) { if (G.ss) G.ss('Motorul PDF nu e încărcat.'); return; }
    if (G.ss) G.ss('Se generează Documentația SKID GPL…');
    var lat = 47.16, lon = 27.6; try { if (G.turf && ap.geo) { var ct = G.turf.centerOfMass(ap.geo).geometry.coordinates; lon = ct[0]; lat = ct[1]; } } catch (e) {}
    var c = G._SKID_PROIECTE[ap.nrcad || 'x'] || skid_calc({});
    // proximitate gaz (UtilitatiRO)
    var gaz = null; try { if (G.UtilitatiRO && G.UtilitatiRO.fetchGrid && G.turf) { var g = await G.UtilitatiRO.fetchGrid([lat - 0.02, lon - 0.02, lat + 0.02, lon + 0.02]); if (g) { var pt = G.turf.point([lon, lat]); var best = null; (g.gas || []).forEach(function (fe) { try { var db = G.turf.pointToLineDistance(pt, fe, { units: 'meters' }); if (best == null || db < best) best = Math.round(db); } catch (e) {} }); gaz = best; } } } catch (e) {}

    var d = G._initStudyPdf('Documentatie SKID GPL', 'Instalație GPL · proiectare + planșe', 24);
    var pdf = d.pdf, W = d.W, H = d.H, sec = d.sec, body = d.body, tblRow = d.tblRow, newPage = d.newPage, checkY = d.checkY, cover = d.cover;
    var nrcad = d.nrcad || ap.nrcad || '—', uat = d.uat || ap.uat || '';
    var GOLD = d.GOLD || [212, 175, 55], NAVY = d.NAVY || [10, 25, 65];
    var TITLE = 'SKID GPL'; var pg = 1, cy;
    function page(t) { pg++; cy = newPage(t || TITLE, pg); }
    function P(txt) { cy = checkY(cy, 26, TITLE, pg); cy = body(txt, 14, cy) + 2.5; }
    function SEC(t) { cy = checkY(cy, 30, TITLE, pg); cy = sec(t, cy) + 2; }

    cover('Documentație de pre-proiectare instalație SKID GPL\n' + c.label + ' · PT C8-2010 · I 31/1999' + (c.atex ? ' · ATEX' : ''),
      null,
      [['Nr. cadastral', nrcad], ['Destinație', c.label], ['Capacitate', c.nrRec + ' × ' + c.capRec.toLocaleString('ro-RO') + ' L = ' + c.capTot.toLocaleString('ro-RO') + ' L'],
       ['Echivalent GPL', c.tone + ' tone'], ['Regim', c.seveso ? 'SEVESO III (PPAM obligatorie)' : 'sub prag SEVESO']],
      !c.seveso, c.seveso ? 'SEVESO III — accident major' : 'Sub prag SEVESO (' + c.tone + ' t < 50 t)');

    page('DATE TEHNICE'); SEC('1. DATE TEHNICE ȘI CALCUL');
    P('Instalația SKID GPL propusă pentru „' + c.label + '" cuprinde ' + c.nrRec + ' recipient(e) de ' + c.capRec.toLocaleString('ro-RO') + ' L, cu grup de reglare a presiunii, pe platformă betonată împrejmuită. Calculul urmează PT C8-2010 și I 31/1999.');
    cy = tblRow(['Parametru', 'Valoare', 'Bază'], cy, true, [58, 44, 80]);
    [['Capacitate totală', c.capTot.toLocaleString('ro-RO') + ' L', 'nr × cap. recipient'],
     ['Masă GPL utilă (85%)', c.util.toLocaleString('ro-RO') + ' kg', 'cap × 0,51 × 0,85'],
     ['Debit maxim consumatori', c.debit + ' kg/h', 'putere ' + c.totalKW + ' kW × 0,08'],
     ['Autonomie', (c.autonomieZile != null ? c.autonomieZile + ' zile' : '—'), 'la ' + c.oreZi + ' h/zi funcționare'],
     ['Echivalent tone GPL', c.tone + ' t', 'cap × 0,51 / 1000'],
     ['Prag SEVESO III (50 t)', c.seveso ? 'DEPĂȘIT' : 'sub prag', 'HG 804/2007'],
     ['Dimensiuni recipient', c.dim.L + ' × ' + c.dim.W + ' m', 'standard pe capacitate'],
     ['Platformă betonată', c.pW + ' × ' + c.pL + ' m', 'calcul amplasare']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [58, 44, 80]); });
    cy += 3;
    P('Vaporizarea naturală scade la temperaturi joase; dacă debitul necesar (' + c.debit + ' kg/h) depășește capacitatea de vaporizare naturală a recipientului la −15 °C, se prevede vaporizator electric (PT C8-2010, I 31/1999).');

    page('DISTANȚE'); SEC('2. DISTANȚE DE SIGURANȚĂ (PT C8-2010 / I 31/1999)');
    P('Amplasarea recipientelor respectă distanțe minime față de clădiri (diferențiate pe gradul de rezistență la foc), drumuri, surse de foc și rețele. Pentru capacitatea totală de ' + c.capTot.toLocaleString('ro-RO') + ' L:');
    cy = tblRow(['Față de', 'Distanță minimă'], cy, true, [120, 62]);
    [['Clădiri grad I–II rezistență foc', c.distCladiri.tip_I + ' m'], ['Clădiri grad III–IV', c.distCladiri.tip_II + ' m'], ['Clădiri grad V / risc mare', c.distCladiri.tip_III + ' m'],
     ['Drumuri publice', c.dist.drumuri + ' m'], ['Surse de foc deschis', c.dist.surse_foc + ' m'], ['Linii electrice', c.dist.linii_electrice + ' m'], ['Canalizare', c.dist.canalizare + ' m'],
     ['Punct descărcare autocisternă', c.dist.descarcare_autocisterna + ' m'], ['Perimetru zonă periculoasă (curat)', c.dist.perimetru_periculos + ' m'],
     ['Fond forestier (Cod Silvic art.60)', '20 m']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [120, 62]); });
    cy += 3;
    P('Distanța față de fondul forestier (20 m) se corelează cu Studiul de Regim Silvic; proximitatea conductelor de gaz se verifică din modulul Utilități Naționale' + (gaz != null ? ' — conductă gaz detectată la ~' + gaz + ' m' : '') + '.');

    page('PLAN AMPLASARE'); SEC('3. PLAN DE AMPLASARE (planșă schematică)');
    P('Planul de amplasare prezintă platforma, recipientele, punctul de descărcare a autocisternei și perimetrul zonei periculoase.');
    cy = drawAmplasare(pdf, 14, cy + 2, W - 28, 100, c, GOLD, NAVY); cy += 2;
    P('Recipientele se amplasează pe platformă betonată cu pantă spre un cămin colector; împrejmuirea și placa de avertizare sunt obligatorii (PT C8-2010).');

    page('ZONARE ATEX'); SEC('4. ZONAREA ATEX (HG 1058/2006)');
    if (c.atex) {
      P('Instalația necesită clasificare ATEX (atmosfere potențial explozive), cu Document de Protecție la Explozie. Zonele definite:');
      cy = drawATEX(pdf, 14, cy + 2, W - 28, 70, c); cy += 2;
      P('Zona 0 — interiorul recipientului (permanent exploziv); Zona 1 — în jurul supapelor/gâtului (~3,0 m); Zona 2 — în jurul racordurilor/dispenserului (~4,5 m). Echipamentele electrice din zone ATEX trebuie certificate Ex (SR EN 60079).');
    } else {
      P('Pentru destinația „' + c.label + '" cu capacitatea propusă, clasificarea ATEX completă nu este, de regulă, obligatorie, însă zonele de siguranță în jurul supapelor și racordurilor se tratează cu echipamente adecvate. La depășirea pragurilor sau pentru distribuție auto/industrial, Documentul de Protecție la Explozie devine obligatoriu (HG 1058/2006).');
    }

    page('AVIZE ȘI INTERCONECTARE'); SEC('5. AVIZE, SEVESO ȘI LEGĂTURI');
    P('Avize obligatorii: ISCIR (instalare + funcționare, PT C8-2010), ISU (aviz/autorizație securitate la incendiu — risc foarte mare), APM (mediu)' + (c.dest === 'distributie_auto' ? ', ANRE (autorizare stație)' : '') + '. ' + (c.seveso ? 'Capacitatea depășește 50 t GPL → obligatorie Politica de Prevenire a Accidentelor Majore (PPAM), HG 804/2007.' : 'Capacitatea este sub pragul SEVESO de 50 t.'));
    P('Legături în ecosistem: riscul de incendiu „foarte mare" și zonarea ATEX se preiau prin referință în Scenariul de Securitate la Incendiu (SSI); distanțele față de pădure (20 m) în Studiul Silvic; proximitatea conductelor de gaz în Utilități Naționale. Volumul 3D al instalației este generat în Viewer 3D (rezervor + platformă + cabinet + gard).');
    cy = tblRow(['Normativ', 'Obiect'], cy, true, [58, 124]);
    LEGAL.forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [58, 124]); });
    cy += 3;
    P('DISCLAIMER: Document orientativ de pre-proiectare, generat automat de UrbanX. NU înlocuiește proiectul tehnic autorizat ISCIR, Documentul de Protecție la Explozie și avizele legale. Planșele sunt schematice.');

    var fn = (G._stratFileName ? G._stratFileName('SkidGPL', { mode: 'parcela', nrcad: nrcad, localitate: uat }) : ('SkidGPL_' + nrcad)) + '.pdf';
    try { pdf.save(fn); } catch (e) { pdf.save('SkidGPL_' + nrcad + '.pdf'); }
    if (G.ss) G.ss('✅ Documentație SKID generată (' + pdf.getNumberOfPages() + ' pag).');
  }
  G.generateSkidPDF = generateSkidPDF;
  console.log('[SKID] modul încărcat (window.proiecteazaSkid + generateSkidPDF)');
})(window);
