/* ============================================================================
 * UrbanX — GENERATOR DOCX (js/urbanx-docx-builder.js)
 * Asamblează dosarul de documentații: fiecare document = HTML editabil în Word
 * (application/msword, tiparul deja folosit în platformă), formatare profesională
 * (Times New Roman 12pt justified, copertă, headings, tabele). Bundle ZIP (JSZip)
 * pe categorii. Reutilizează datele engine-ului (UXDoc) + studiile existente.
 *
 * window.UXDocBuilder: genereazaDosar(D, v) · docHtml
 * ========================================================================== */
(function (G) {
  'use strict';
  var STYLE = '<style>' +
    'body{font-family:"Times New Roman",serif;font-size:12pt;line-height:1.5;text-align:justify;margin:0}' +
    'h1{font-size:16pt;font-weight:bold;color:#1F3864;text-align:center;margin:0 0 6pt}' +
    'h2{font-size:14pt;font-weight:bold;color:#1F3864;border-bottom:1px solid #1F3864;text-transform:uppercase;margin:14pt 0 6pt}' +
    'h3{font-size:13pt;font-weight:bold;color:#2F5496;margin:10pt 0 4pt}' +
    'p{margin:0 0 6pt;text-indent:1.27cm}' +
    'table{border-collapse:collapse;width:100%;margin:6pt 0}' +
    'th{background:#1F3864;color:#fff;border:0.5pt solid #999;padding:4pt;font-size:10pt;text-align:left}' +
    'td{border:0.5pt solid #999;padding:4pt;font-size:10pt}' +
    'tr:nth-child(even) td{background:#F2F2F2}' +
    '.cover{text-align:center;margin-top:120pt}.cover .t{font-size:22pt;font-weight:bold;color:#1F3864}.cover .m{font-size:13pt;margin-top:18pt}' +
    '.foot{color:#888;font-size:9pt;border-top:0.5pt solid #ccc;margin-top:24pt;padding-top:4pt}' +
    '</style>';

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function tbl(rows, head) { var h = ''; if (head) h = '<tr>' + head.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>'; var b = rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join(''); return '<table>' + h + b + '</table>'; }

  // meta: {titlu, subtitlu, proiect, beneficiar, amplasament, faza}
  // sections: [{h, html}]
  function docHtml(meta, sections) {
    var cover = '<div class="cover"><div class="t">' + esc(meta.titlu) + '</div>' +
      (meta.subtitlu ? '<div class="m">' + esc(meta.subtitlu) + '</div>' : '') +
      '<div class="m">Proiect: ' + esc(meta.proiect || '—') + '</div>' +
      '<div class="m">Beneficiar: ' + esc(meta.beneficiar || '—') + '</div>' +
      '<div class="m">Amplasament: ' + esc(meta.amplasament || '—') + '</div>' +
      '<div class="m">Faza: ' + esc(meta.faza || 'DTAC') + '</div></div>' +
      '<br style="page-break-after:always">';
    var body = sections.map(function (s) { return (s.h ? '<h2>' + esc(s.h) + '</h2>' : '') + (s.html || ''); }).join('');
    var foot = '<div class="foot">Document generat de UrbanX (ThinkSmart Solutions) — orientativ, se verifică și se semnează de proiectanții atestați.</div>';
    return '<html><head><meta charset="utf-8">' + STYLE + '</head><body>' + cover + body + foot + '</body></html>';
  }
  function docBlob(html) { return new Blob(['﻿', html], { type: 'application/msword' }); }

  // ── Conținut per document (real, din datele engine) ───────────────────────
  var FAZA_LBL = { DTAC: 'D.T.A.C. (extras pentru autorizare)', PTh: 'P.Th. + D.E. (proiect complet de execuție)', 'PTh+DE': 'P.Th. + D.E. (proiect complet de execuție)' };
  function _meta(D, titlu, subtitlu) {
    return { titlu: titlu, subtitlu: subtitlu || '', proiect: D.nume || '—', beneficiar: D.beneficiar || '—', amplasament: (D.uat || '') + (D.nrcad ? ', nr. cad. ' + D.nrcad : ''), faza: FAZA_LBL[D.faza] || D.faza || 'D.T.A.C.' };
  }
  function _indicatoriTbl(D, v) {
    var ac = v.calc;
    return tbl([
      ['Suprafață teren', (D.Steren || '—') + ' mp'], ['Suprafață construită (SC)', (D.Sc || '—') + ' mp'], ['Suprafață desfășurată (SD)', (D.Sd || '—') + ' mp'],
      ['POT propus / max', (ac.POT || 0) + '% / ' + (D.POT_max != null ? D.POT_max + '%' : '—')], ['CUT propus / max', (ac.CUT || 0) + ' / ' + (D.CUT_max != null ? D.CUT_max : '—')],
      ['Regim de înălțime', 'P+' + Math.max(0, (D.niv_supraterane || 1) - 1) + ' (H ' + (D.H || '—') + ' m)'], ['Parcaje propuse / necesare', (D.parcaje_propuse || 0) + ' / ' + ac.parcaje_necesare],
      ['Spații verzi minime', ac.sv_min_pct + '% (' + (ac.sv_min_mp || 0) + ' mp)']
    ], ['Indicator urbanistic', 'Valoare']);
  }
  function _verificariTbl(v) {
    return tbl(v.checks.map(function (c) { return [c.status === 'conform' ? 'CONFORM' : c.status === 'neconform' ? 'NECONFORM' : 'ATENȚIE', c.text, c.norma]; }), ['Stare', 'Verificare', 'Temei legal']);
  }
  // Conținut profund din bibliotecă (per funcțiune + specialitate). Întoarce HTML sau '' .
  function _lib(D, key) {
    try { var L = G.UXLibrary && G.UXLibrary[D.functiune]; return (L && L[key] && L[key].html) ? L[key].html : ''; } catch (e) { return ''; }
  }

  var DOC_BUILDERS = {
    'Memoriu general DTAC': function (D, v) {
      var fn = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune;
      var deep = _lib(D, 'general');
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Indicatori urbanistici ai proiectului', html: _indicatoriTbl(D, v) },
        { h: 'Verificarea conformității urbanistice', html: _verificariTbl(v) + (v.neconformitati ? '<p><b>Atenție:</b> există ' + v.neconformitati + ' neconformitate(ăți) de rezolvat înainte de depunere.</p>' : '<p>Nu s-au identificat neconformități critice.</p>') }
      ] : (G.UXParagrafe ? G.UXParagrafe.general(D, v).concat([{ h: 'Verificarea conformității urbanistice', html: _verificariTbl(v) + (v.neconformitati ? '<p><b>Atenție:</b> există ' + v.neconformitati + ' neconformitate(ăți) de rezolvat înainte de depunere.</p>' : '<p>Nu s-au identificat neconformități critice.</p>') }]) : [
        { h: '1. Date de identificare', html: '<p>Autorizarea obiectivului „' + esc(fn) + '", ' + esc(D.uat || '—') + '.</p>' }, { h: '2. Indicatori', html: _indicatoriTbl(D, v) }
      ]);
      return { cat: 'Memorii Tehnice', file: 'Memoriu_general_DTAC.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC GENERAL', 'Documentație tehnică pentru autorizarea executării lucrărilor de construire (DTAC)'), secs) };
    },
    'Memoriu arhitectură': function (D, v) {
      var deep = _lib(D, 'arhitectura');
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — indicatori și date specifice proiectului', html: _indicatoriTbl(D, v) + '<p>Vecinătăți: N — ' + esc(D.vecin_N || 'de precizat') + ', S — ' + esc(D.vecin_S || 'de precizat') + ', E — ' + esc(D.vecin_E || 'de precizat') + ', V — ' + esc(D.vecin_V || 'de precizat') + '. Retrageri propuse: aliniament ' + esc(D.retragere_fata || '—') + ' m, lateral ' + esc(D.retragere_lateral || '—') + ' m, posterior ' + esc(D.retragere_spate || '—') + ' m.</p>' }
      ] : (G.UXParagrafe ? G.UXParagrafe.arhitectura(D, v) : [
        { h: '1. Situația existentă', html: '<p>Terenul în suprafață de ' + esc(D.Steren || '—') + ' mp, situat în ' + esc(D.uat || '—') + '.</p>' }
      ]);
      return { cat: 'Memorii Tehnice', file: 'Memoriu_arhitectura.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC DE ARHITECTURĂ'), secs) };
    },
    'Memoriu rezistență': function (D, v) {
      var deep = _lib(D, 'structura');
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — parametri de calcul ai amplasamentului', html: tbl([['Sistem structural', esc(D.struct || 'metalică')], ['Fundare', esc(D.fundare || 'după studiul geotehnic')], ['Zonă seismică (P100-1/2013)', 'a_g = ' + v.calc.seismic.ag + 'g, T_c = ' + v.calc.seismic.Tc + ' s'], ['Zăpadă (CR 1-1-3/2012)', v.calc.clima.sk + ' kN/m²'], ['Temperatura exterioară de calcul', v.calc.clima.Te + ' °C']], ['Parametru', 'Valoare']) }
      ] : (G.UXParagrafe ? G.UXParagrafe.rezistenta(D, v) : [
        { h: '1. Sistemul structural', html: '<p>Structura de rezistență: ' + esc(D.struct || 'metalică') + '.</p>' }
      ]);
      return { cat: 'Memorii Tehnice', file: 'Memoriu_rezistenta.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC DE REZISTENȚĂ'), secs) };
    },
    'Memorii instalații (IT/IS/IE/IG/HVAC/ICT)': function (D, v) {
      var deep = _lib(D, 'instalatii');
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — soluții alese pentru proiect', html: tbl([['Încălzire', esc(({ ct_gaz: 'centrală termică pe gaz', pompa: 'pompă de căldură', vrf: 'sistem VRF', termoficare: 'racord termoficare', electric: 'încălzire electrică', radiant: 'radiant infraroșu' })[D.incalzire] || D.incalzire || 'de stabilit')], ['Alimentare cu apă', esc(({ retea: 'rețea publică', put: 'puț forat', rezervor: 'rezervor propriu' })[D.apa] || 'de stabilit')]], ['Instalație', 'Soluție']) }
      ] : (G.UXParagrafe ? G.UXParagrafe.instalatii(D, v) : [
        { h: 'Instalații', html: '<p>Instalații termice, sanitare, electrice, ventilare și PSI conform destinației și normativelor I13/I9/I7/I5/P118.</p>' }
      ]);
      return { cat: 'Memorii Tehnice', file: 'Memorii_instalatii.doc', html: docHtml(_meta(D, 'MEMORII TEHNICE — INSTALAȚII'), secs) };
    },
    'Caiet de sarcini arhitectură (PTh)': function (D, v) {
      var deep = _lib(D, 'caiet_arh');
      var body = deep || '<p>Caietul de sarcini pe specialitatea arhitectură (faza PTh) descrie, pe categorii de lucrări (zidării, tencuieli, pardoseli, placaje, tâmplărie, zugrăveli, tavane, termosistem, hidroizolații, accesibilizări), obiectul, standardele de referință, materialele și condițiile de recepție, tehnologia de execuție, verificările și controlul calității, recepția și modul de măsurare/decontare. Conținutul detaliat se generează pentru funcțiunile cu bibliotecă tehnică dedicată.</p>';
      return { cat: 'Caiete de sarcini', file: 'Caiet_sarcini_arhitectura.doc', html: docHtml(_meta(D, 'CAIET DE SARCINI — ARHITECTURĂ', 'Proiect tehnic de execuție (PTh) · HG 907/2016'), [{ h: deep ? null : 'Caiet de sarcini — lucrări de arhitectură', html: body }]) };
    },
    'Caiet de sarcini rezistență (PTh)': function (D, v) {
      var deep = _lib(D, 'caiet_str');
      var body = deep || '<p>Caietul de sarcini pe specialitatea rezistență (faza PTh) descrie, pe categorii de lucrări (terasamente, cofraje, armături, betoane, hidroizolarea fundațiilor, elemente structurale), obiectul, standardele (SR EN 1992, SR EN 206, SR EN 13670, NP 112, P100-1), materialele și recepția lor, tehnologia și toleranțele de execuție, probele și controlul calității, fazele determinante, măsurarea și decontarea.</p>';
      return { cat: 'Caiete de sarcini', file: 'Caiet_sarcini_rezistenta.doc', html: docHtml(_meta(D, 'CAIET DE SARCINI — REZISTENȚĂ', 'Proiect tehnic de execuție (PTh) · HG 907/2016'), [{ h: deep ? null : 'Caiet de sarcini — lucrări de rezistență', html: body }]) };
    },
    'Caiet de sarcini instalații (PTh)': function (D, v) {
      var deep = _lib(D, 'caiet_inst');
      var body = deep || '<p>Caietul de sarcini pe specialitatea instalații (faza PTh) descrie, pe fiecare instalație (sanitare, termice, ventilare-climatizare, electrice, IDSAI P118-3, stingere P118-2, gaze, curenți slabi), obiectul, standardele de referință, materialele și echipamentele cu condiții de recepție, montajul, probele și verificările (presiune, etanșeitate, funcționale, PRAM, debite), recepția și decontarea.</p>';
      return { cat: 'Caiete de sarcini', file: 'Caiet_sarcini_instalatii.doc', html: docHtml(_meta(D, 'CAIET DE SARCINI — INSTALAȚII', 'Proiect tehnic de execuție (PTh) · HG 907/2016'), [{ h: deep ? null : 'Caiet de sarcini — lucrări de instalații', html: body }]) };
    },
    'Liste de cantități / antemăsurători (PTh)': function (D, v) {
      var ac = v.calc || {};
      var sc = +D.Sc || 0, sd = +D.Sd || 0, st = +D.Steren || 0;
      var amp = st && sc ? (st - sc) : 0;
      var rows = [
        ['Terasamente — săpătură generală + fundații', 'mc', st ? Math.round(sc * 1.2) : '—', 'estimare: amprentă × adâncime medie fundare'],
        ['Beton în fundații și infrastructură', 'mc', sc ? Math.round(sc * 0.35) : '—', 'fundații + placă pe sol'],
        ['Beton în suprastructură (stâlpi/grinzi/plăci)', 'mc', sd ? Math.round(sd * 0.28) : '—', 'niveluri supraterane'],
        ['Armătură (oțel B500B)', 'kg', sd ? Math.round(sd * 0.28 * 105) : '—', '≈105 kg/mc beton (medie)'],
        ['Cofraje', 'mp', sd ? Math.round(sd * 2.2) : '—', 'raport cofraj/suprafață'],
        ['Zidărie de compartimentare', 'mp', sd ? Math.round(sd * 0.9) : '—', 'pereți neportanți'],
        ['Termosistem fațadă (ETICS)', 'mp', sc ? Math.round((sc * 4) * 0.75) : '—', 'anvelopă opacă'],
        ['Tâmplărie exterioară', 'mp', sd ? Math.round(sd * 0.18) : '—', 'ferestre + uși ext.'],
        ['Finisaje pardoseli', 'mp', sd ? Math.round(sd * 0.85) : '—', 'gresie/PVC/mochetă'],
        ['Finisaje pereți (tencuieli + zugrăveli)', 'mp', sd ? Math.round(sd * 2.6) : '—', 'ambele fețe'],
        ['Tavane suspendate', 'mp', sd ? Math.round(sd * 0.6) : '—', 'zone cu tavan casetat'],
        ['Hidroizolație terasă', 'mp', sc ? Math.round(sc * 0.55) : '—', 'suprafață terasă'],
        ['Instalații (global, procent din C+M)', '%', 25, 'sanitare+termice+HVAC+electrice+PSI'],
        ['Amenajări exterioare + spații verzi', 'mp', amp || '—', 'teren − amprentă']
      ];
      var note = '<p><b>Antemăsurători orientative</b>, generate parametric din datele proiectului (Sc=' + (sc || '—') + ' mp, Sd=' + (sd || '—') + ' mp). Cantitățile exacte se extrag din planșele PTh și din breviarul de calcul; listele de mai jos fundamentează devizul pe obiect și oferta de execuție. Prețurile unitare se preiau din baza de prețuri a platformei (deviz HG 907).</p>';
      return { cat: 'Caiete de sarcini', file: 'Liste_cantitati_antemasuratori.doc', html: docHtml(_meta(D, 'LISTE DE CANTITĂȚI (ANTEMĂSURĂTORI)', 'Proiect tehnic de execuție (PTh) · HG 907/2016'), [{ h: 'Antemăsurători pe categorii de lucrări', html: note + tbl(rows, ['Categorie de lucrări', 'U.M.', 'Cantitate', 'Bază de estimare']) }]) };
    },
    'Scoatere teren din circuitul agricol (Ord. 83/2018)': function (D, v) {
      var st = +D.Steren || 0;
      var secs = [
        { h: '1. Descrierea obiectivului', html: '<p>Documentație pentru scoaterea definitivă/temporară din circuitul agricol a terenului în suprafață de <b>' + (st ? st.toLocaleString('ro-RO') + ' mp' : '—') + '</b>, ' + esc(D.uat || '—') + (D.nrcad ? ', nr. cad. ' + esc(D.nrcad) : '') + ', necesar realizării obiectivului „' + esc((G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune) + '". Se întocmește conform Ord. MADR 83/2018 și Legii 18/1991.</p>' },
        { h: '2. Necesitatea și oportunitatea', html: '<p>Terenul este necesar edificării investiției conform Certificatului de Urbanism' + (D.nrCU ? ' nr. ' + esc(D.nrCU) : '') + '; scoaterea din circuitul agricol este condiție prealabilă autorizării, întrucât terenul are folosință agricolă în evidențele cadastrale.</p>' },
        { h: '3. Amplasament, suprafață afectată, situație juridică', html: tbl([['Suprafață totală teren', (st ? st.toLocaleString('ro-RO') : '—') + ' mp'], ['Suprafață scoasă din circuit', (D.Sc ? (+D.Sc + Math.round((st - D.Sc) * 0.3)).toLocaleString('ro-RO') : '—') + ' mp (amprentă + amenajări)'], ['Categorie de folosință actuală', esc(D.folosinta || 'arabil / de precizat')], ['Situare', 'intravilan / extravilan — conform CF']], ['Element', 'Valoare']) },
        { h: '4. Încadrarea în categorii de bonitate și taxele', html: '<p>Taxa de scoatere din circuitul agricol se calculează în funcție de <b>clasa de calitate/bonitate</b> a solului (I-V) și de categoria de folosință, conform Legii 18/1991 (Anexă) și HG 890/2005 actualizat. Terenurile de clasă superioară (I-II) au taxe mai mari. Valoarea exactă se stabilește pe baza studiului pedologic (OSPA) și a încadrării de bonitate.</p>' + tbl([['Clasa I (foarte bună)', 'taxă maximă'], ['Clasa II-III (bună/mijlocie)', 'taxă medie'], ['Clasa IV-V (slabă/foarte slabă)', 'taxă redusă']], ['Clasa bonitate', 'Nivel taxă']) },
        { h: '5. Documente necesare + avize', html: '<p>Documentație cadastrală, extras CF, CU, studiu pedologic (OSPA), aviz APM (după caz), plan de amplasament. Pentru extravilan: aviz DADR/APIA. Actul de scoatere se emite de autoritatea competentă (APIA/MADR/consiliul județean, funcție de suprafață).</p>' }
      ];
      return { cat: 'Avize', file: 'Scoatere_circuit_agricol.doc', html: docHtml(_meta(D, 'SCOATERE DIN CIRCUITUL AGRICOL', 'Ord. MADR 83/2018 · Legea 18/1991'), secs) };
    },
    'Memoriu tehnic aviz de mediu (Ord. 863/2002)': function (D, v) {
      var caps = ['Date de identificare (titular, proiectant, amplasament)', 'Descrierea proiectului (componente, etape, tehnologii)', 'Amplasamentul (fizic, geologic, hidrologic, vecinătăți, arii Natura 2000)', 'Cadrul legal aplicabil și încadrarea procedurală', 'Alternativele analizate (min. Alternativa 0 + soluția propusă)', 'Utilizarea resurselor (teren, apă, energie, materii prime)', 'Gestionarea deșeurilor (coduri EWC, operator autorizat)', 'Poluarea generată (aer, apă, sol, zgomot, vibrații) cu valori-limită', 'Riscul de accidente (scenarii + măsuri)', 'Impactul asupra factorilor de mediu (concluzie pe factor)', 'Măsuri de reducere a impactului', 'Programul de monitorizare (factor/metodă/frecvență/responsabil)', 'Rezumat non-tehnic (pentru public)', 'Concluzii + solicitare formală acord/aviz'];
      var secs = [
        { h: 'Structura memoriului (14 capitole — Ord. 863/2002 + Legea 292/2018)', html: tbl(caps.map(function (c, i) { return ['' + (i + 1), c]; }), ['Cap.', 'Conținut']) },
        { h: 'Verificare arii protejate Natura 2000', html: '<p>Se verifică dacă amplasamentul (' + esc(D.uat || '—') + ') se află în/în vecinătatea (≤ 5 km) unei arii Natura 2000 (SPA/SCI). În caz afirmativ → necesară Evaluare Adecvată (EA). Se corelează cu baza de date ANPM.</p>' },
        { h: 'Praguri SEVESO (HG 804/2007)', html: '<p>Dacă proiectul implică substanțe periculoase (ex. GPL, hidrogen), se verifică cantitatea față de pragurile din Anexa I a Directivei 2012/18/UE (HG 804/2007). Sub prag → confirmare explicită; peste prag → necesară autorizare SEVESO (nivel inferior/superior).</p>' },
        { h: 'Procedura', html: '<p>Se depune la APM notificarea + memoriul; APM stabilește etapa de încadrare (aviz/acord de mediu, cu sau fără evaluare de impact — Legea 292/2018).</p>' }
      ];
      return { cat: 'Avize', file: 'Memoriu_aviz_mediu.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC — AVIZ DE MEDIU', 'Ord. 863/2002 · Legea 292/2018 · HG 445/2009'), secs) };
    },
    'DALI — construcție existentă / intervenție': function (D, v) {
      var tip = D.tip_interventie || 'reabilitare_termica';
      var TIPURI = {
        reabilitare_termica: { t: 'Reabilitare termică', cap: ['Starea actuală (audit energetic)', 'Soluții de intervenție (izolare fațade + acoperiș + tâmplărie)', 'Indicatori energetici actuali vs. propuși (kWh/mp·an)', 'Reducerea emisiilor CO₂', 'Analiza cost-eficiență (lei/kWh economisit)', 'Certificat energetic ante/post'], norma: 'Legea 372/2005 · Ord. MDRT 2641/2012 · Mc 001/2006' },
        consolidare: { t: 'Consolidare structurală', cap: ['Expertiza tehnică (expert atestat MLPAT)', 'Clasa de risc seismic (Rs I → Rs IV)', 'Descrierea degradărilor și cauzelor', 'Soluția de consolidare propusă', 'Gradul de asigurare seismică post-intervenție (R3)'], norma: 'P100-3/2008 · P100-1/2013 · Legea 10/1995' },
        schimbare_destinatie: { t: 'Schimbare de destinație', cap: ['Destinația actuală vs. propusă', 'Cerințe normative ale noii funcțiuni', 'Verificarea capacității structurale la noile încărcări', 'Adaptări (evacuare, PSI, accesibilitate, igienă)'], norma: 'Legea 50/1991 · Legea 10/1995' },
        extindere: { t: 'Extindere', cap: ['Corp existent + corp nou (rost / conlucrare)', 'Racordarea structurală și funcțională', 'Indicatori rezultați (POT/CUT cumulat)'], norma: 'P100-1/2013 · Legea 50/1991' },
        mansardare: { t: 'Mansardare', cap: ['Verificarea capacității structurii existente la suprasarcină', 'Soluția de șarpantă/planșeu', 'Încadrarea în regimul de înălțime admis'], norma: 'P100-1/2013 · C 107/2005' }
      };
      var ti = TIPURI[tip] || TIPURI.reabilitare_termica;
      var secs = [
        { h: '1. Tipul intervenției', html: '<p>Intervenție asupra unei construcții existente — tip: <b>' + esc(ti.t) + '</b>. Se întocmește D.A.L.I. conform HG 907/2016. Normative aplicabile: ' + esc(ti.norma) + '.</p>' },
        { h: '2. Capitole specifice (HG 907/2016)', html: tbl(ti.cap.map(function (c, i) { return ['' + (i + 1), c]; }), ['Nr.', 'Capitol']) },
        { h: '3. Relația cu vecinătățile (construcție existentă)', html: '<p>Fiind vorba despre o construcție existentă, nu se pune problema modificării relației cu vecinătățile, aceasta fiind cea proiectată inițial sau rezultată din modificările realizate de-a lungul perioadei de exploatare, conform planșelor desenate.</p>' },
        { h: '4. Expertiză și verificare', html: '<p>Intervențiile la construcții existente se fundamentează pe expertiză tehnică (elaborată de expert atestat) și, după caz, audit energetic. Proiectul se verifică de verificatori atestați pe cerințele aplicabile (Legea 10/1995).</p>' }
      ];
      return { cat: 'Memorii Tehnice', file: 'DALI_constructie_existenta.doc', html: docHtml(_meta(D, 'D.A.L.I. — CONSTRUCȚIE EXISTENTĂ', esc(ti.t) + ' · HG 907/2016'), secs) };
    },
    'Clădire mixtă — separări funcțiuni (P118)': function (D, v) {
      var secs = [
        { h: '1. Funcțiuni combinate', html: '<p>Obiectivul cuprinde funcțiuni mixte' + (D.corpuri && D.corpuri.length ? ' (' + D.corpuri.map(function (c) { return esc(c.functiune || c.nume); }).join(', ') + ')' : '') + '. Conform P118-1/2013, între funcțiuni cu risc/destinație diferită se prevăd separări la foc și accese independente.</p>' },
        { h: '2. Separări la foc obligatorii (P118-1)', html: tbl([['Comercial / rezidențial', 'planșeu + pereți', 'REI 120', 'P118-1 art. 3.3.2'], ['Parcare / rezidențial', 'planșeu', 'REI 180', 'P118-1 art. 3.5.1'], ['Producție / rezidențial', 'perete antifoc', 'REI 180', 'P118-1'], ['Spații tehnice / public', 'pereți + uși EI', 'REI 60-120 + uși EI', 'P118-1'], ['Casă de scări / niveluri', 'pereți + uși EI-C', 'REI 150 + EI 30-C', 'P118-2']], ['Între funcțiuni', 'Element', 'Rezistență la foc', 'Temei']) },
        { h: '3. Accese separate', html: tbl([['Rezidențial', 'intrare separată de funcțiunile comerciale/publice'], ['Comercial', 'acces direct din stradă/spațiu public'], ['Parcare', 'acces auto separat de accesul pietonal'], ['Servicii / aprovizionare', 'acces de serviciu dedicat']], ['Funcțiune', 'Acces']) },
        { h: '4. Indicatori și evacuare', html: '<p>POT/CUT se pot calcula separat pe funcțiune, dacă RLU/PUG impune (unele UTR-uri o cer). Căile de evacuare se dimensionează independent pe fiecare funcțiune, iar timpii de evacuare se verifică separat conform P118-1. Se corelează cu scenariul de securitate la incendiu.</p>' }
      ];
      return { cat: 'Memorii Tehnice', file: 'Cladire_mixta_separari.doc', html: docHtml(_meta(D, 'CLĂDIRE MIXTĂ — SEPARĂRI ÎNTRE FUNCȚIUNI', 'P118-1/2013 · separări la foc + accese'), secs) };
    },
    'Memoriu DTOE (organizare execuție)': function (D, v) {
      var sc = +D.Sc || 0;
      var secs = [
        { h: '1. Obiectul documentației', html: '<p>Prezenta documentație tehnică de organizare a execuției (D.T.O.E.) însoțește documentația pentru autorizarea executării lucrărilor la obiectivul „' + esc((G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune) + '", ' + esc(D.uat || '—') + '. Se întocmește conform Legii 50/1991 (Anexa 1) și stabilește măsurile de organizare a șantierului pe durata execuției.</p>' },
        { h: '2. Componentele organizării de șantier', html: tbl([['Împrejmuire', 'gard opac perimetral H≥2,0 m, poartă acces auto/pietonal, panou de identificare a investiției (Legea 50/1991 art. 7)'], ['Accese și circulații', 'drum provizoriu, platformă de manevră/staționare, spălarea roților la ieșire'], ['Baracamente', 'birou șantier/pază, vestiar muncitori, grup sanitar ecologic, magazie materiale'], ['Depozitare materiale', 'platforme amenajate pe categorii; materiale sensibile la adăpost'], ['Utilități provizorii', 'branșament provizoriu energie și apă, tablou de șantier, evacuare ape'], ['Managementul deșeurilor', 'containere selective, evacuare cu operator autorizat (Legea 211/2011)']], ['Componentă', 'Descriere']) },
        { h: '3. Suprafața ocupată temporar', html: '<p>Organizarea de șantier se amplasează, de regulă, în incinta proprie (pe suprafața neconstruită, ' + (D.Steren && sc ? '≈ ' + Math.round((+D.Steren - sc)).toLocaleString('ro-RO') + ' mp disponibili' : 'de precizat') + '), fără ocuparea domeniului public. Ocuparea temporară a domeniului public (ex. racorduri în stradă) necesită autorizație de la administratorul domeniului public.</p>' },
        { h: '4. Securitate și sănătate în muncă (SSM)', html: '<p>Se respectă Legea 319/2006 și HG 300/2006 (cerințe minime SSM pe șantiere temporare/mobile): plan de securitate și sănătate (dacă se depășesc pragurile HG 300/2006), planul propriu al fiecărui executant, coordonator SSM desemnat, semnalizare de avertizare, echipament individual de protecție.</p>' },
        { h: '5. Apărarea împotriva incendiilor pe durata execuției', html: '<p>Se aplică măsurile de prevenire (Legea 307/2006, normativ C 300): permis de lucru cu foc, dotare PSI provizorie (stingătoare), căi de acces pentru intervenție, depozitarea controlată a materialelor combustibile.</p>' },
        { h: '6. Protecția vecinătăților și a mediului', html: '<p>Limitarea programului de lucru (ore de liniște), stropirea pentru reducerea prafului, protejarea arborilor menținuți, refacerea căilor de acces și a terenurilor afectate temporar la finalizarea lucrărilor.</p>' }
      ];
      return { cat: 'Piese Administrative', file: 'Memoriu_DTOE.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC — ORGANIZAREA EXECUȚIEI (D.T.O.E.)', 'Legea 50/1991, Anexa 1'), secs) };
    },
    'Borderou piese scrise și desenate': function (D, v) {
      var niv = Math.max(1, +D.niv_supraterane || 1);
      var hasSub = (+D.niv_subterane || 0) > 0 || /subsol|demisol|s\s*\+\s*p|d\s*\+\s*p/i.test(D.regim || '');
      var isPth = (D.faza === 'PTh' || D.faza === 'ambele' || D.faza === 'PTh+DE');
      var i = 0, PD = []; function ad(t, sc) { PD.push(['A.' + ('0' + (i++)).slice(-2), t, sc]); }
      ad('Plan de încadrare în zonă', '1:2000 / 1:5000');
      ad('Plan de situație', '1:500');
      if (hasSub) ad('Plan subsol / demisol', '1:50');
      ad('Plan parter (cota ±0,00)', '1:50');
      for (var k = 1; k < niv; k++) ad('Plan etaj ' + k, '1:50');
      ad('Plan învelitoare / terasă', '1:100');
      ad('Secțiune transversală', '1:50');
      ad('Secțiune longitudinală', '1:50');
      ad('Fațada principală', '1:50');
      ad('Fațada posterioară', '1:50');
      ad('Fațada laterală stânga', '1:50');
      ad('Fațada laterală dreapta', '1:50');
      var PR = []; var j = 0;
      if (isPth) { PR.push(['R.01', 'Plan de fundații', '1:50']); PR.push(['R.02', 'Detalii fundații', '1:20']); PR.push(['R.03', 'Plan cofraj + armare planșee', '1:50']); PR.push(['IS.01', 'Scheme instalații sanitare', '1:100']); PR.push(['IT.01', 'Scheme instalații termice / HVAC', '1:100']); PR.push(['IE.01', 'Scheme instalații electrice + monofilară', '1:100']); }
      var scrise = Object.keys(D._docs || {}).filter(function (dc) { return D._docs[dc]; });
      var secs = [
        { h: 'A. Piese scrise', html: tbl(scrise.map(function (t, n) { return ['' + (n + 1), t]; }), ['Nr.', 'Piesă scrisă']) || '<p>Selectați documentele în secțiunea Documente.</p>' },
        { h: 'B. Piese desenate — arhitectură', html: tbl(PD.map(function (r) { return r; }), ['Cod', 'Denumire planșă', 'Scara']) },
      ];
      if (PR.length) secs.push({ h: 'C. Piese desenate — rezistență și instalații (PTh)', html: tbl(PR, ['Cod', 'Denumire planșă', 'Scara']) });
      secs.push({ h: 'D. Notă', html: '<p>Lista pieselor desenate este generată automat din regimul de înălțime (' + esc(D.regim || ('P+' + (niv - 1))) + ') și faza de proiectare. Fiecare planșă poartă cartuș conform Legii 50/1991, Anexa 1 (firmă/proiectant, nr. autorizație, titlu, scară, dată, semnături). Planurile se elaborează/finalizează de proiectant; planul funcțional schematic se poate genera din modelul de spații (SVG/PDF/DXF).</p>' });
      return { cat: 'Piese Administrative', file: 'Borderou_piese.doc', html: docHtml(_meta(D, 'BORDEROU / OPIS PIESE', 'piese scrise și desenate — Legea 50/1991 Anexa 1'), secs) };
    },
    'Program funcțional (breviar spații)': function (D, v) {
      var sp = D._spatii || [];
      if (!sp.length) return { cat: 'Memorii Tehnice', file: 'Program_functional.doc', html: docHtml(_meta(D, 'PROGRAM FUNCȚIONAL', 'breviar de spații'), [{ h: 'Program funcțional', html: '<p>Programul funcțional nu a fost generat. Deschideți „🧩 Program funcțional", introduceți parametrii de program (capacitate), generați și aplicați la proiect — spațiile vor fi listate aici automat, cu proveniența și temeiul normativ.</p>' }]) };
      var suP = 0, suE = 0, ocup = 0, instSet = {}, avizSet = {}, psiRows = [];
      sp.forEach(function (r) { var st = (+r.buc || 0) * (+r.mp_unit || 0); if (r.niv === 'E') suE += st; else suP += st; ocup += (+r.ocup || 0) * (+r.buc || 0); (r.inst || []).forEach(function (x) { instSet[x] = 1; }); (r.avize || []).forEach(function (x) { avizSet[x] = 1; }); if (r.psi) psiRows.push([r.nume, (r.psi.cat || '—'), (r.psi.detector || r.psi.sting || '—')]); });
      var su = Math.round(suP + suE), sd = su ? Math.round(su / 0.82) : 0;
      var tblSpatii = tbl(sp.map(function (r) { return [r.nume + (r.ob ? ' *' : ''), r.cat || '—', r.niv || 'P', '' + (r.buc || 1), '' + (r.mp_unit || 0), '' + Math.round((r.buc || 0) * (r.mp_unit || 0)), (r.prov || '') + (r.normativ ? ' — ' + r.normativ : '')]; }), ['Spațiu', 'Categorie', 'Niv', 'Buc', 'Su/buc (mp)', 'Su tot (mp)', 'Proveniență / temei normativ']);
      var secs = [
        { h: '1. Programul de spații (model funcțional confirmat)', html: '<p>Programul de spații de mai jos a fost generat parametric din capacitatea proiectului și din regulile de dependență codificate pe normative, apoi confirmat de proiectant. Spațiile marcate cu <b>*</b> sunt obligatorii (generate din normativ). Toate documentațiile (memorii, deviz, scenariu PSI) derivă din acest model unic.</p>' + tblSpatii },
        { h: '2. Bilanț de suprafețe', html: tbl([['Nr. spații', '' + sp.length], ['Su parter', suP.toLocaleString('ro-RO') + ' mp'], ['Su etaj', suE.toLocaleString('ro-RO') + ' mp'], ['Su totală', su.toLocaleString('ro-RO') + ' mp'], ['Sd (Su/0,82)', sd.toLocaleString('ro-RO') + ' mp'], ['Ocupanți estimați', '' + ocup]], ['Indicator', 'Valoare']) }
      ];
      if (Object.keys(instSet).length) secs.push({ h: '3. Instalații implicate (din spații)', html: '<p>' + Object.keys(instSet).join(', ') + '</p>' });
      if (psiRows.length) secs.push({ h: '4. Cerințe PSI pe spații', html: tbl(psiRows, ['Spațiu', 'Categorie pericol', 'Detectare / stingere']) });
      if (Object.keys(avizSet).length) secs.push({ h: '5. Avizatori implicați (din spații)', html: '<p>' + Object.keys(avizSet).join(', ') + '</p>' });
      return { cat: 'Memorii Tehnice', file: 'Program_functional.doc', html: docHtml(_meta(D, 'PROGRAM FUNCȚIONAL', 'breviar de spații — model unic al investiției'), secs) };
    },
    'Scenariu securitate incendiu (P118)': function (D, v) {
      var ac = v.calc;
      return { cat: 'Memorii Tehnice', file: 'Scenariu_securitate_incendiu_P118.doc', html: docHtml(_meta(D, 'SCENARIU DE SECURITATE LA INCENDIU', 'Ord. MAI 129/2016 · fundamentare aviz ISU'), [
        { h: '1. Riscul de incendiu și categoria de pericol', html: '<p>Categoria de pericol de incendiu: ' + esc(D.psi || ac.psi_default || 'C') + '. Grad de rezistență la foc recomandat: ' + esc(ac.grad_default || 'II') + '.</p>' },
        { h: '2. Echiparea și dotarea', html: tbl([['Sprinklere', ac.sprinklere_oblig ? 'OBLIGATORII (SC>3000 mp / H>28m)' : 'după caz'], ['IDSI (detectare-semnalizare)', ac.idsi_oblig ? 'OBLIGATORIE (SC>2500 mp)' : 'după caz'], ['Desfumare', (D.functiune === 'hala-industriala' && (D.Sc > 1000)) ? 'OBLIGATORIE (trape SHEV)' : 'după caz'], ['Lift de pompieri', ac.lift_oblig ? 'OBLIGATORIU (P+4 și peste)' : 'nu'], ['Hidranți interiori', (D.Sc > 600) ? 'da' : 'după caz']], ['Sistem', 'Necesitate']) },
        { h: '3. Referință', html: '<p>Scenariul complet, cu cele 7 capitole și motorul de verificare, se generează prin modulul dedicat SSI (Ord. MAI 129/2016) al platformei, care preia datele acestui proiect.</p>' }
      ]) };
    },
    'Deviz general HG 907': function (D, v) {
      var body;
      if (G.UXDevize && G.UXDevize.devizGeneralHtml) body = G.UXDevize.devizGeneralHtml(D, v);
      else body = '<p>Devizul general se întocmește conform HG 907/2016 (capitolele 1–6: cheltuieli pentru obținerea terenului, amenajarea terenului, asigurarea utilităților, proiectare/asistență tehnică, investiția de bază, alte cheltuieli). Articolele de deviz cu prețuri se preiau din baza de prețuri editabilă a platformei (modul deviz).</p>';
      return { cat: 'Devize', file: 'Deviz_general_HG907.doc', html: docHtml(_meta(D, 'DEVIZ GENERAL', 'conform HG 907/2016'), [{ h: 'Deviz general al investiției', html: body }]) };
    },
    'Opis + Listă proiectanți': function (D, v) {
      return { cat: 'Piese Administrative', file: 'Opis_lista_proiectanti.doc', html: docHtml(_meta(D, 'OPIS ȘI LISTA PROIECTANȚILOR'), [
        { h: 'Opis documentație', html: tbl((Object.keys(D._docs || {}).filter(function (k) { return D._docs[k]; })).map(function (n, i) { return ['' + (i + 1), n]; }), ['Nr.', 'Document']) },
        { h: 'Lista proiectanților', html: '<p>Proiectant general: ' + esc(D.proiectant || '—') + '. Arhitect (nr. OAR), inginer rezistență (AICPS), inginer instalații, verificatori atestați — de completat.</p>' }
      ]) };
    },
    'Referate verificatori': function (D, v) {
      return { cat: 'Piese Administrative', file: 'Referate_verificatori.doc', html: docHtml(_meta(D, 'REFERATE ALE VERIFICATORILOR DE PROIECTE'), [{ h: 'Referate pe cerințe (Legea 10/1995)', html: '<p>Referate de verificare pe cerințele esențiale: A (rezistență-stabilitate), B (siguranță în exploatare), C (securitate la incendiu), D (igienă/sănătate/mediu), E (izolație termică/economie energie), F (protecție împotriva zgomotului), Ie/It/Is (instalații). Verificatori atestați MDLPA — de completat.</p>' }]) };
    },
    'PCCVI + faze determinante': function (D, v) {
      return { cat: 'Recepție & Urmărire', file: 'PCCVI_faze_determinante.doc', html: docHtml(_meta(D, 'PROGRAM PENTRU CONTROLUL CALITĂȚII (PCCVI)'), [{ h: 'Faze determinante și controale', html: '<p>Program de control al calității pe faze determinante (infrastructură, structură, închideri, finisaje, instalații, recepție), cu prezența ISC conform Legii 10/1995 și HG 273/1994. Fazele determinante se stabilesc de proiectant și se anunță la ISC.</p>' }]) };
    },
    'Recepție (HG 273/1994)': function (D, v) {
      return { cat: 'Recepție & Urmărire', file: 'Proces_verbal_receptie.doc', html: docHtml(_meta(D, 'PROCES-VERBAL DE RECEPȚIE', 'la terminarea lucrărilor / finală — HG 273/1994'), [{ h: 'Proces-verbal de recepție', html: '<p>Se întocmește procesul-verbal de recepție la terminarea lucrărilor și, ulterior, recepția finală, conform HG 273/1994, cu comisia de recepție și eventualele obiecțiuni.</p>' }]) };
    },
    'Gantt + grafic finanțare': function (D, v) {
      return { cat: 'Recepție & Urmărire', file: 'Grafic_executie_finantare.doc', html: docHtml(_meta(D, 'GRAFIC DE EXECUȚIE ȘI FINANȚARE'), [{ h: 'Eșalonarea execuției', html: '<p>Durata estimată de execuție: ' + esc(D.durata || '—') + ' luni. Graficul Gantt și graficul de finanțare eșalonată se corelează cu devizul general și cu fazele determinante.</p>' }]) };
    },
    'Memorii avizatori': function (D, v) {
      var avize = Object.keys(D._avize || {}).filter(function (k) { return D._avize[k]; });
      var secs = avize.length ? avize.map(function (a) { return { h: 'Memoriu pentru ' + a, html: '<p>Memoriu tehnic pentru obținerea avizului ' + esc(a) + ', cu descrierea soluției relevante pentru acest avizator și documentele necesare.</p>' }; }) : [{ h: 'Memorii avizatori', html: '<p>Bifați avizatorii din secțiunea 13 pentru a genera memoriile aferente.</p>' }];
      return { cat: 'Avize', file: 'Memorii_avizatori.doc', html: docHtml(_meta(D, 'MEMORII PENTRU AVIZATORI'), secs) };
    }
  };

  var PTH_ONLY = ['Caiet de sarcini arhitectură (PTh)', 'Caiet de sarcini rezistență (PTh)', 'Caiet de sarcini instalații (PTh)', 'Liste de cantități / antemăsurători (PTh)'];
  function _build(D, v) {
    var isPth = (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT');
    var selected = Object.keys(D._docs || {}).filter(function (k) { return D._docs[k] !== false && DOC_BUILDERS[k]; });
    if (!selected.length) selected = Object.keys(DOC_BUILDERS);
    // Caietele de sarcini + antemăsurătorile aparțin fazei PTh (Legea 50 Anexa 1: DTAC nu le conține)
    if (!isPth) selected = selected.filter(function (k) { return PTH_ONLY.indexOf(k) < 0; });
    var docs = selected.map(function (k) { try { return DOC_BUILDERS[k](D, v); } catch (e) { return null; } }).filter(Boolean);
    var base = 'Documentatie_' + (D.nrcad || (D.uat || 'proiect').replace(/\s+/g, '_'));
    if (G.JSZip) {
      var zip = new G.JSZip();
      docs.forEach(function (dc) { zip.folder(dc.cat).file(dc.file, docBlob(dc.html)); });
      // index
      zip.file('OPIS.txt', 'Dosar documentații UrbanX\n' + docs.length + ' documente\n\n' + docs.map(function (d) { return '· ' + d.cat + '/' + d.file; }).join('\n'));
      zip.generateAsync({ type: 'blob' }).then(function (blob) { _save(blob, base + '.zip'); if (G.ss) G.ss('✅ ' + docs.length + ' documente generate (ZIP)' + (v.neconformitati ? ' · ' + v.neconformitati + ' neconformități' : '')); });
    } else {
      // fallback fără JSZip — salvează individual primul + PDF
      docs.forEach(function (dc) { _save(docBlob(dc.html), dc.file); });
      if (G.ss) G.ss('✅ ' + docs.length + ' documente Word generate (JSZip indisponibil — salvate individual).');
    }
  }
  function genereazaDosar(D, v) {
    v = v || (G.UXDoc && G.UXDoc.valideaza(D)) || { calc: {}, checks: [], neconformitati: 0 };
    // Așteaptă conținutul profund din bibliotecă (dacă funcțiunea are), apoi construiește.
    var ready = (G.UXLibraryReady && D.functiune) ? G.UXLibraryReady(D.functiune) : Promise.resolve(null);
    if (G.ss && G.UXLibrary && !G.UXLibrary[D.functiune] && ready !== Promise.resolve(null)) G.ss('⏳ Se încarcă conținutul detaliat…');
    return Promise.resolve(ready).then(function () { _build(D, v); }).catch(function () { _build(D, v); });
  }
  function _save(blob, name) { try { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); } catch (e) {} }

  G.UXDocBuilder = { genereazaDosar: genereazaDosar, docHtml: docHtml, DOC_BUILDERS: DOC_BUILDERS };
  console.log('[UXDocBuilder] generator DOCX încărcat (' + Object.keys(DOC_BUILDERS).length + ' tipuri documente)');
})(window);
