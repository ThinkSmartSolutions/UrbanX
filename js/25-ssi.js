/* ============================================================================
 * UrbanX — SCENARIU DE SECURITATE LA INCENDIU (js/25-ssi.js)
 * Documentul autoritar conform Ordinului MAI nr. 129/2016 (metodologia de
 * elaborare a scenariilor de securitate la incendiu) — 7 capitole obligatorii +
 * motor de verificare automată. Fundamentează avizul ISU.
 *
 * IMPORTĂ prin referință proiectele Hala (js/23) și SKID (js/24) din
 * window._HALE_PROIECTE / _SKID_PROIECTE (risc, volum compartiment, sprinklere,
 * ATEX) — NU recalculează (regula #8). Înlocuiește vechiul SSF (10-studies).
 *
 * window: generateSSI · ssi_verifica · SSI_NORMATIVE · SSI_TIPOLOGII
 * ========================================================================== */
(function (G) {
  'use strict';

  var SSI_NORMATIVE = {
    risc: {
      mic: { q: '≤ 420 MJ/mp', ex: 'depozite incombustibile, birouri cu mobilier redus' },
      mediu: { q: '420–840 MJ/mp', ex: 'birouri, hoteluri, restaurante, hale producție ușoară' },
      mare: { q: '840–1680 MJ/mp', ex: 'hale producție medie, depozite combustibile, ateliere' },
      foarte_mare: { q: '> 1680 MJ/mp sau lichide/gaze inflamabile', ex: 'stații GPL, benzinării, vopsitorii' }
    },
    grade: { I: 'R 120 (beton/metal protejat) — H nelimitat', II: 'R 90 — H nelimitat', III: 'R 45 — max P+4E', IV: 'R 15 — max P+1E', V: 'neimpus — P' },
    rezistenta: { structura: { I: 'R 120', II: 'R 90', III: 'R 45', IV: 'R 15', V: 'neimpus' }, plansee: { I: 'REI 120', II: 'REI 90', III: 'REI 60', IV: 'REI 30', V: 'neimpus' }, pereti_antifoc: { principal: 'EI 180', secundar: 'EI 120', compartimentare: 'EI 60' } },
    compartiment: { fara: { mic: 12000, mediu: 6000, mare: 3000 }, cu: { mic: 36000, mediu: 18000, mare: 9000 } },
    evacuare: { lungimi: { mic: 60, mediu: 50, mare: 40, foarte_mare: 30 }, latimi: { usa: 0.90, usa_industriala: 1.20, culoar: 1.20, scara: 1.00 }, flux: { usa: 80, scara: 60, culoar: 90 } },
    hidranti: { int_debit: 2.1, int_presiune: 2.5, int_nr_simultan: 2, ext_autonomie: 180, ext_dist_max: 120, ext_debit: { mic: 15, mediu: 20, mare: 25, foarte_mare: 30 } },
    stingatoare: { mic: 200, mediu: 150, mare: 100, foarte_mare: 50 },
    acces_isu: { latime: 4.0, H_libera: 4.5, portanta: 17, raza: 12.5, dist_max: 18 },
    reactie_foc: { cai_evacuare: 'min. C-s2,d1', spatii_publice: 'min. C-s1,d0', hale: 'min. D', depozite: 'min. C' }
  };
  var SSI_TIPOLOGII = {
    birouri: { label: '🏢 Birouri', risc: 'mediu', grad: 'II', dens: 10 },
    restaurant: { label: '🍽 Restaurant', risc: 'mediu', grad: 'II', dens: 1.5 },
    hala_industriala: { label: '🏭 Hală industrială', risc: 'mediu', grad: 'II', dens: 20 },
    statie_GPL: { label: '⛽ Stație GPL', risc: 'foarte_mare', grad: 'I', dens: 30 },
    skid_GPL: { label: '🛢 SKID GPL', risc: 'foarte_mare', grad: 'I', dens: 50 },
    hotel: { label: '🏨 Hotel', risc: 'mediu', grad: 'II', dens: 16 },
    parcare: { label: '🚗 Parcare', risc: 'mediu', grad: 'I', dens: 30 }
  };
  var LEGAL = [
    ['Ordinul MAI nr. 129/2016', 'Metodologia de elaborare a scenariilor de securitate la incendiu'],
    ['Legea nr. 307/2006 (rep.)', 'Apărarea împotriva incendiilor (mod. L.180/2021, L.291/2023)'],
    ['P 118/1-2015', 'Securitatea la incendiu a construcțiilor (completare Ord. MAI 87/2019)'],
    ['P 118/2-2013', 'Instalații de stingere cu apă'],
    ['P 118/3-2015', 'Instalații de detectare, semnalizare, alarmare'],
    ['Ord. MAI nr. 163/2007', 'Norme generale de apărare împotriva incendiilor'],
    ['HG nr. 571/2016', 'Cerințe esențiale de securitate la incendiu'],
    ['SR EN 13501-1:2018', 'Clasificarea la foc a produselor pentru construcții'],
    ['SR EN 1838 / I7-2011', 'Iluminat de urgență / instalații electrice'],
    ['SR EN 12101', 'Sisteme de control al fumului și gazelor fierbinți']
  ];

  // importă proiectul Hala/SKID de pe parcela activă (prin referință)
  function _importObiect(nrcad) {
    try { if (G._SKID_PROIECTE && G._SKID_PROIECTE[nrcad]) return { tip: 'skid_GPL', src: G._SKID_PROIECTE[nrcad] }; } catch (e) {}
    try { if (G._SKID_PROIECTE && G._SKID_PROIECTE['x']) return { tip: 'skid_GPL', src: G._SKID_PROIECTE['x'] }; } catch (e) {}
    try { if (G._HALE_PROIECTE && G._HALE_PROIECTE[nrcad]) return { tip: 'hala_industriala', src: G._HALE_PROIECTE[nrcad] }; } catch (e) {}
    try { if (G._HALE_PROIECTE && G._HALE_PROIECTE['x']) return { tip: 'hala_industriala', src: G._HALE_PROIECTE['x'] }; } catch (e) {}
    return null;
  }

  function ssi_calc(params) {
    params = params || {};
    var imp = params.imp || null;
    var tip = params.tipologie || (imp && imp.tip) || 'hala_industriala';
    var T = SSI_TIPOLOGII[tip] || SSI_TIPOLOGII.hala_industriala;
    var Sc = params.Sc || (imp && imp.src && imp.src.Sc) || 1500;
    var H = params.H || (imp && imp.src && (imp.src.H_coama || imp.src.H_streasina)) || 8;
    var risc = params.risc || (imp && imp.src && imp.src.risc) || T.risc;
    var sprinklere = params.sprinklere != null ? params.sprinklere : (imp && imp.src && imp.src.sprinklere) || false;
    var V = (imp && imp.src && imp.src.V) || Math.round(Sc * H);
    var nrPers = Math.max(1, Math.round(Sc / (T.dens || 20)));
    var grad = params.grad || T.grad;
    // verificări
    var erori = [], avert = [], oblig = [];
    var limC = (sprinklere ? SSI_NORMATIVE.compartiment.cu : SSI_NORMATIVE.compartiment.fara)[risc === 'foarte_mare' ? 'mare' : risc] || 6000;
    if (V > limC) erori.push({ cap: 'Cap.3', cod: 'CI_VOL', msg: 'Volum compartiment ' + V.toLocaleString('ro-RO') + ' mc > limita P118 de ' + limC.toLocaleString('ro-RO') + ' mc (risc ' + risc + (sprinklere ? ' cu' : ' fără') + ' sprinklere) → pereți antifoc sau sprinklere', norma: 'P118/1-2015 Tab.2.2' });
    if (H > 28 && !sprinklere) erori.push({ cap: 'Cap.4', cod: 'SPR_H28', msg: 'H > 28 m → sprinklere obligatorii', norma: 'P118/2-2013 art.3.1' });
    if (H > 28) oblig.push({ cap: 'Cap.4', cod: 'DET_H28', msg: 'H > 28 m → detectare automată + sistem vocal + scară de pompieri', norma: 'P118/3-2015' });
    if (tip === 'skid_GPL' || tip === 'statie_GPL' || risc === 'foarte_mare') oblig.push({ cap: 'Cap.4', cod: 'ATEX', msg: 'Risc foarte mare / GPL → zonare ATEX + detectoare gaz Ex + electrovană + Document Protecție Explozie (HG 1058/2006)', norma: 'PT C8-2010 + ATEX' });
    var nrIesiri = nrPers < 50 && Sc <= 300 ? 1 : nrPers < 200 ? 2 : nrPers < 500 ? 3 : 4;
    if (Sc > 500 && nrIesiri < 2) nrIesiri = 2;
    if (Sc > 1000 && tip === 'hala_industriala') oblig.push({ cap: 'Cap.4', cod: 'DESFUM', msg: 'Hală Sc > 1000 mp → desfumare naturală (trape ≥ 2% Sc)', norma: 'P118/1-2015 art.8.2' });
    var nrSting = Math.ceil(Sc / (SSI_NORMATIVE.stingatoare[risc] || 150));
    var hidrantiInt = Sc > 600;
    var hidrantiExtDebit = SSI_NORMATIVE.hidranti.ext_debit[risc] || 20;
    var rezervaMc = Math.round(hidrantiExtDebit * SSI_NORMATIVE.hidranti.ext_autonomie * 60 / 1000);
    return {
      tip: tip, T: T, Sc: Sc, H: H, risc: risc, sprinklere: sprinklere, V: V, limC: limC, grad: grad, nrPers: nrPers,
      lungMax: SSI_NORMATIVE.evacuare.lungimi[risc] || 50, nrIesiri: nrIesiri, latimeUsa: tip === 'hala_industriala' ? 1.2 : 0.9,
      nrSting: nrSting, hidrantiInt: hidrantiInt, hidrantiExtDebit: hidrantiExtDebit, rezervaMc: rezervaMc,
      erori: erori, avert: avert, oblig: oblig, imp: imp
    };
  }
  G.ssi_verifica = ssi_calc; G.SSI_NORMATIVE = SSI_NORMATIVE; G.SSI_TIPOLOGII = SSI_TIPOLOGII;

  async function generateSSI() {
    var S = G.S;
    if (!S || !S.parcels || !S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { if (G.ss) G.ss('Selectați o parcelă pentru scenariul SSI.'); return; }
    var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel];
    if (!G._initStudyPdf) { if (G.ss) G.ss('Motorul PDF nu e încărcat.'); return; }
    if (G.ss) G.ss('Se generează Scenariul de Securitate la Incendiu…');
    var nrcad = ap.nrcad || '—';
    var imp = _importObiect(nrcad);
    var c = ssi_calc({ imp: imp, Sc: ap.area ? Math.round(ap.area * 0.5) : null });

    var d = G._initStudyPdf('Scenariu de Securitate la Incendiu', 'Ord. MAI 129/2016 · fundamentare aviz ISU', 24);
    var pdf = d.pdf, W = d.W, H = d.H, sec = d.sec, body = d.body, tblRow = d.tblRow, newPage = d.newPage, checkY = d.checkY, cover = d.cover;
    nrcad = d.nrcad || nrcad; var uat = d.uat || ap.uat || '';
    var TITLE = 'SCENARIU SSI'; var pg = 1, cy;
    function page(t) { pg++; cy = newPage(t || TITLE, pg); }
    function P(txt) { cy = checkY(cy, 26, TITLE, pg); cy = body(txt, 14, cy) + 2.5; }
    function SEC(t) { cy = checkY(cy, 30, TITLE, pg); cy = sec(t, cy) + 2; }
    var totalProbleme = c.erori.length + c.oblig.length;

    cover('Scenariu de securitate la incendiu conform Ordinului MAI nr. 129/2016\nDocument tehnic de fundamentare a avizului ISU',
      null,
      [['Nr. cadastral', nrcad], ['Tipologie', c.T.label], ['Suprafață compartiment', c.Sc.toLocaleString('ro-RO') + ' mp'],
       ['Risc de incendiu', c.risc + (c.imp ? ' (importat din ' + (c.tip === 'skid_GPL' ? 'proiect SKID' : 'proiect Hală') + ')' : '')],
       ['Grad rezistență foc', 'Gradul ' + c.grad]],
      c.erori.length === 0, c.erori.length === 0 ? 'Fără erori critice de conformitate' : c.erori.length + ' neconformități critice de rezolvat');

    page('CUPRINS'); cy = sec('CUPRINS · Ord. MAI 129/2016', cy) + 1;
    ['Cadru legal și metodologic', 'Cap.1 — Caracteristici construcție și risc', 'Cap.2 — Riscul de incendiu', 'Cap.3 — Nivelul de performanță (rezistență la foc)',
     'Cap.4 — Echiparea și dotarea cu mijloace tehnice', 'Cap.5 — Căile de evacuare', 'Cap.6 — Alimentarea cu apă pentru stingere', 'Cap.7 — Forțe și mijloace de intervenție',
     'Verificări automate de conformitate', 'Concluzii și interconectare'].forEach(function (t) { cy = body(t, 16, cy) + 0.6; });
    cy += 3; SEC('CADRU LEGAL ȘI METODOLOGIC');
    P('Scenariul de securitate la incendiu este documentul tehnic care fundamentează avizul/autorizația ISU, elaborat conform Ordinului MAI nr. 129/2016. Structura celor 7 capitole este impusă de metodologie; orice deviere atrage respingerea. Documentul se semnează de un proiectant atestat (cerință legală — software-ul NU semnează).');
    cy = tblRow(['Act normativ', 'Obiect'], cy, true, [58, 124]);
    LEGAL.forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [58, 124]); });
    cy += 2;
    if (c.imp) P('Acest scenariu IMPORTĂ prin referință datele obiectului proiectat pe parcelă (' + (c.tip === 'skid_GPL' ? 'instalație SKID GPL' : 'hală industrială') + '): riscul de incendiu, suprafața și volumul compartimentului, necesitatea sprinklerelor' + (c.tip === 'skid_GPL' ? ', zonarea ATEX' : '') + ' — calculate în modulul dedicat, fără a fi recalculate aici (evitarea duplicării).');

    page('CAP.1 CARACTERISTICI'); SEC('CAPITOLUL 1 — CARACTERISTICI ȘI RISC');
    cy = tblRow(['Element', 'Valoare'], cy, true, [70, 112]);
    [['Destinație / tipologie', c.T.label], ['Nr. cadastral', String(nrcad)], ['UAT', uat || '—'], ['Suprafață compartiment (Sc)', c.Sc.toLocaleString('ro-RO') + ' mp'], ['Înălțime (H)', c.H + ' m'], ['Volum compartiment (V)', c.V.toLocaleString('ro-RO') + ' mc'], ['Nr. persoane estimat', '' + c.nrPers], ['Grad rezistență foc', 'Gradul ' + c.grad + ' — ' + SSI_NORMATIVE.grade[c.grad]]
    ].forEach(function (r) { cy = tblRow(r, cy, false, [70, 112]); });
    cy += 3;
    P('Construcția se încadrează în tipologia „' + c.T.label + '", cu gradul ' + c.grad + ' de rezistență la foc. Materialele structurale și de închidere trebuie să respecte clasele de reacție la foc impuse pe categorii de spații (căi de evacuare: min. ' + SSI_NORMATIVE.reactie_foc.cai_evacuare + ').');

    page('CAP.2 RISC'); SEC('CAPITOLUL 2 — RISCUL DE INCENDIU');
    var R = SSI_NORMATIVE.risc[c.risc] || SSI_NORMATIVE.risc.mediu;
    P('Nivelul de risc de incendiu: „' + c.risc.replace('_', ' ') + '", densitate sarcină termică ' + R.q + '. Exemple de destinații în această categorie: ' + R.ex + '.');
    if (c.risc === 'foarte_mare') P('ATENȚIE: risc foarte mare (lichide/gaze inflamabile). Se impun măsuri speciale: zonare ATEX, detectoare de gaz, sisteme de stingere adaptate, distanțe de siguranță. Aceste aspecte se detaliază în proiectul instalației GPL (SKID/stație) importat.');
    cy = tblRow(['Aspect', 'Descriere'], cy, true, [50, 132]);
    [['Surse potențiale de aprindere', c.risc === 'foarte_mare' ? 'scântei, electricitate statică, echipamente' : 'instalații electrice, echipamente, surse termice'], ['Substanțe combustibile', c.tip === 'skid_GPL' ? 'GPL (propan/butan) — gaz inflamabil' : 'materiale de construcție, mărfuri depozitate, mobilier'], ['Condiții agravante', 'ventilație, aglomerare, depozitare pe verticală']
    ].forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [50, 132]); });

    page('CAP.3 PERFORMANȚĂ'); SEC('CAPITOLUL 3 — NIVELUL DE PERFORMANȚĂ');
    P('Nivelul de performanță al securității la incendiu se exprimă prin rezistența la foc a elementelor de construcție (R — rezistență mecanică, E — etanșeitate, I — izolare termică) și prin compartimentarea antifoc.');
    cy = tblRow(['Element', 'Rezistență cerută (Gradul ' + c.grad + ')'], cy, true, [90, 92]);
    [['Structură portantă', SSI_NORMATIVE.rezistenta.structura[c.grad]], ['Planșee de separare', SSI_NORMATIVE.rezistenta.plansee[c.grad]], ['Pereți antifoc principali', SSI_NORMATIVE.rezistenta.pereti_antifoc.principal], ['Pereți de compartimentare', SSI_NORMATIVE.rezistenta.pereti_antifoc.compartimentare], ['Uși antifoc (casa scării)', 'EI2 30–120 după caz']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [90, 92]); });
    cy += 3;
    P('Volumul compartimentului de incendiu este ' + c.V.toLocaleString('ro-RO') + ' mc, față de limita de ' + c.limC.toLocaleString('ro-RO') + ' mc (P118/1-2015 Tab. 2.2, risc ' + c.risc + (c.sprinklere ? ' cu' : ' fără') + ' sprinklere). ' + (c.V > c.limC ? 'DEPĂȘIT → sunt necesari pereți antifoc de compartimentare sau sprinklere automate.' : 'Se încadrează în limită.'));

    page('CAP.4 ECHIPARE'); SEC('CAPITOLUL 4 — ECHIPAREA ȘI DOTAREA');
    cy = tblRow(['Mijloc tehnic', 'Necesar / parametri'], cy, true, [70, 112]);
    [['Stingătoare portabile', 'min. ' + c.nrSting + ' buc. (1 la ' + (SSI_NORMATIVE.stingatoare[c.risc] || 150) + ' mp, risc ' + c.risc + ')'], ['Hidranți interiori', c.hidrantiInt ? 'DA (Sc > 600 mp) — debit 2,1 l/s, 2 simultan' : 'nu (sub prag)'], ['Hidranți exteriori', 'debit ' + c.hidrantiExtDebit + ' l/s, autonomie 180 min'], ['Sprinklere', c.sprinklere ? 'prevăzute' : (c.V > SSI_NORMATIVE.compartiment.fara[c.risc === 'foarte_mare' ? 'mare' : c.risc] ? 'NECESARE (compartiment mare)' : 'nu obligatorii')], ['Detectare + semnalizare', c.H > 28 || c.risc === 'foarte_mare' ? 'obligatorie (centrală + detectoare + sirene)' : 'recomandată'], ['Iluminat de siguranță', 'evacuare (1 lx, 60 min) + antipanic'], ['Desfumare', c.tip === 'hala_industriala' && c.Sc > 1000 ? 'trape naturale ≥ 2% Sc' : (c.tip === 'parcare' ? 'mecanică 10 vol/h' : 'după caz')]
    ].forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [70, 112]); });
    cy += 3;
    if (c.tip === 'skid_GPL' || c.risc === 'foarte_mare') P('Instalația GPL impune suplimentar: detectoare de gaz Ex-d cu electrovană de siguranță, sistem drencher (unde e cazul), stingătoare CO₂ în zonele ATEX + stingător carosabil praf ABC.');

    page('CAP.5 EVACUARE'); SEC('CAPITOLUL 5 — CĂILE DE EVACUARE');
    cy = tblRow(['Parametru', 'Valoare', 'Normă'], cy, true, [56, 42, 84]);
    [['Nr. persoane', '' + c.nrPers, 'densitate ocupare'], ['Nr. minim ieșiri', '' + c.nrIesiri, 'P118 art. 6.4'], ['Lungime max. traseu', c.lungMax + ' m', 'risc ' + c.risc + ' (Tab. 6.1)'], ['Lățime minimă ușă', c.latimeUsa + ' m', 'flux 80 pers/min/m'], ['Iluminat evacuare', 'obligatoriu', 'SR EN 1838'], ['Semnalizare + plan evacuare', 'obligatorii', 'afișate']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [56, 42, 84]); });
    cy += 3;
    P('Timpul de evacuare se estimează din lungimea traseului și capacitatea de flux a ieșirilor. Sunt necesare min. ' + c.nrIesiri + ' ieșiri, cu trasee de max. ' + c.lungMax + ' m, marcate și iluminate.');

    page('CAP.6 APĂ'); SEC('CAPITOLUL 6 — ALIMENTAREA CU APĂ');
    cy = tblRow(['Element', 'Valoare'], cy, true, [90, 92]);
    [['Sursă', 'rețea publică / rezervor propriu / mixt'], ['Debit incendiu (hidranți ext.)', c.hidrantiExtDebit + ' l/s'], ['Autonomie', '180 min (3 ore)'], ['Rezervă intangibilă estimată', c.rezervaMc.toLocaleString('ro-RO') + ' mc'], ['Pompe', 'pompă principală + 1 pompă diesel de rezervă'], ['Distanță max. hidrant–clădire', SSI_NORMATIVE.hidranti.ext_dist_max + ' m']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [90, 92]); });
    cy += 3;
    P('Rezerva de apă pentru incendiu se dimensionează pentru debitul de calcul × autonomia de 3 ore (~' + c.rezervaMc.toLocaleString('ro-RO') + ' mc). Dacă rețeaua publică nu asigură debitul/presiunea, se prevede rezervor propriu + stație de pompare cu sursă de rezervă.');

    page('CAP.7 INTERVENȚIE'); SEC('CAPITOLUL 7 — FORȚE ȘI MIJLOACE DE INTERVENȚIE');
    cy = tblRow(['Element', 'Valoare / cerință'], cy, true, [70, 112]);
    [['ISU teritorial', 'Detașamentul/garda cel mai apropiat'], ['Acces autospeciale — lățime', SSI_NORMATIVE.acces_isu.latime + ' m'], ['Înălțime liberă acces', SSI_NORMATIVE.acces_isu.H_libera + ' m'], ['Capacitate portantă', SSI_NORMATIVE.acces_isu.portanta + ' t/osie'], ['Rază de viraj', SSI_NORMATIVE.acces_isu.raza + ' m'], ['Distanță max. față de fațadă', SSI_NORMATIVE.acces_isu.dist_max + ' m'], ['Responsabil PSI + instruire', 'obligatoriu (L.307/2006)']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [70, 112]); });
    cy += 3;
    P('Accesul autospecialelor ISU se asigură pe min. o fațadă (două pentru Sc > 2000 mp sau H > 30 m), cu platformă de manevră. Se întocmește plan de intervenție și se asigură personal instruit PSI.');

    page('VERIFICĂRI'); SEC('VERIFICĂRI AUTOMATE DE CONFORMITATE');
    P('Motorul de verificare a analizat parametrii scenariului. Rezultat: ' + c.erori.length + ' erori critice, ' + c.oblig.length + ' obligații, ' + c.avert.length + ' avertizări.');
    function listVerif(arr, tag, col) { if (!arr.length) return; cy = checkY(cy, 20, TITLE, pg); pdf.setFont('DejaVuRO', 'bold'); pdf.setTextColor(col[0], col[1], col[2]); pdf.setFontSize(11); pdf.text(tag, 14, cy); cy += 5; pdf.setFont('DejaVuRO', 'normal'); pdf.setTextColor(30, 40, 60); arr.forEach(function (e) { cy = checkY(cy, 16, TITLE, pg); cy = body('• [' + e.cap + '] ' + e.msg + ' (' + e.norma + ')', 16, cy) + 1; }); cy += 2; }
    listVerif(c.erori, '⛔ ERORI CRITICE', [185, 28, 28]);
    listVerif(c.oblig, '⚠ OBLIGAȚII', [200, 120, 30]);
    listVerif(c.avert, 'ℹ AVERTIZĂRI', [20, 50, 98]);
    if (totalProbleme === 0) P('Nu s-au identificat neconformități critice pentru parametrii introduși. Verificarea automată nu înlocuiește avizarea de către proiectantul atestat și ISU.');

    page('CONCLUZII'); SEC('CONCLUZII ȘI INTERCONECTARE');
    P('Scenariul de securitate la incendiu pentru „' + c.T.label + '" (nr. cadastral ' + nrcad + '), risc ' + c.risc.replace('_', ' ') + ', gradul ' + c.grad + ' de rezistență la foc, cuprinde cele 7 capitole obligatorii conform Ord. MAI 129/2016. ' + (c.erori.length ? 'Există ' + c.erori.length + ' neconformități critice de rezolvat înainte de avizare.' : 'Nu s-au identificat neconformități critice.'));
    P('Interconectare: acest scenariu preia prin referință datele obiectului proiectat (' + (c.imp ? (c.tip === 'skid_GPL' ? 'instalația SKID GPL' : 'hala industrială') + ' de pe parcelă' : 'valori implicite — asociați un proiect de hală/SKID pentru date exacte') + '), evitând duplicarea. Înlocuiește vechiul Scenariu de Siguranță la Foc (SSF).');
    P('DISCLAIMER: Document orientativ generat automat de UrbanX. Scenariul oficial se elaborează și se semnează de un proiectant atestat conform Ord. MAI 129/2016 și se avizează de ISU. Verificarea automată acoperă principalele reguli, nu toate situațiile specifice.');
    cy += 2; SEC('Semnături');
    pdf.setFontSize(9); pdf.setTextColor(90, 100, 120);
    pdf.text('ÎNTOCMIT (proiectant atestat): _______________________', 14, cy + 6);
    pdf.text('BENEFICIAR: _______________________', 14, cy + 16);
    pdf.text('Aviz ISU: _______________________', 14, cy + 26);

    var fn = (G._stratFileName ? G._stratFileName('ScenariuSSI', { mode: 'parcela', nrcad: nrcad, localitate: uat }) : ('ScenariuSSI_' + nrcad)) + '.pdf';
    try { pdf.save(fn); } catch (e) { pdf.save('ScenariuSSI_' + nrcad + '.pdf'); }
    if (G.ss) G.ss('✅ Scenariu SSI generat (' + pdf.getNumberOfPages() + ' pag' + (c.erori.length ? ', ' + c.erori.length + ' erori critice' : '') + ').');
  }
  G.generateSSI = generateSSI;
  console.log('[SSI] modul încărcat (window.generateSSI) — înlocuiește SSF');
})(window);
