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

  // Bloc de semnături — tabel cu casetă goală pentru semnătură + ștampilă
  function sigTable(rows, head) {
    var h = '<tr>' + head.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '<th style="width:150pt">Semnătura / ștampila</th></tr>';
    var b = rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '<td style="height:40pt"></td></tr>'; }).join('');
    return '<table>' + h + b + '</table>';
  }
  // Opis/checklist cu coloană de anexat (casetă de bifat)
  function opisCheck(rows, head) {
    var h = '<tr>' + head.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '<th style="width:44pt;text-align:center">Anexat</th></tr>';
    var b = rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '<td style="text-align:center">&#9744;</td></tr>'; }).join('');
    return '<table>' + h + b + '</table>';
  }
  // Descriere sintetică a construcției (pt. referate / opis), din engine
  function _caracConstr(D, v) {
    var fnObj = (G.UXDoc.FUNCTIUNI[D.functiune] || {}); var ac = v.calc || {};
    var STR = { metalica: 'structură metalică (cadre)', beton: 'structură din beton armat (cadre/diafragme)', zidarie: 'zidărie portantă confinată', mixt: 'structură mixtă beton armat + metal', usoara: 'structură ușoară' };
    var niv = Math.max(1, (D.niv_supraterane || 1));
    return 'Construcție cu funcțiunea „' + esc(fnObj.label || D.functiune || '—') + '", regim de înălțime P+' + (niv - 1) +
      (D.niv_subsol ? ' + ' + D.niv_subsol + 'S' : '') + ' (H ' + (D.H || '—') + ' m), ' + (STR[fnObj.struct] || 'structură conform proiectului') +
      ', fundații directe/radier conform studiului geotehnic. Categoria de importanță „' + (fnObj.cat === 'medical' ? 'B' : 'C') + '", grad de rezistență la foc ' + (fnObj.grad || 'II') +
      ', categoria de pericol de incendiu ' + (fnObj.psi || 'C') + ', zona seismică conform P100-1/2013 (a_g, T_C ale amplasamentului). Indicatori: SC ' + (D.Sc || '—') + ' mp, SD ' + (D.Sd || '—') +
      ' mp, POT ' + (ac.POT || '—') + '%, CUT ' + (ac.CUT || '—') + '.';
  }

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
      var deep = _lib(D, 'arhitectura'); if (deep && (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT')) deep += _lib(D, 'arh_pth');
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — indicatori și date specifice proiectului', html: _indicatoriTbl(D, v) + '<p>Vecinătăți: N — ' + esc(D.vecin_N || 'de precizat') + ', S — ' + esc(D.vecin_S || 'de precizat') + ', E — ' + esc(D.vecin_E || 'de precizat') + ', V — ' + esc(D.vecin_V || 'de precizat') + '. Retrageri propuse: aliniament ' + esc(D.retragere_fata || '—') + ' m, lateral ' + esc(D.retragere_lateral || '—') + ' m, posterior ' + esc(D.retragere_spate || '—') + ' m.</p>' }
      ] : (G.UXParagrafe ? G.UXParagrafe.arhitectura(D, v) : [
        { h: '1. Situația existentă', html: '<p>Terenul în suprafață de ' + esc(D.Steren || '—') + ' mp, situat în ' + esc(D.uat || '—') + '.</p>' }
      ]);
      return { cat: 'Memorii Tehnice', file: 'Memoriu_arhitectura.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC DE ARHITECTURĂ'), secs) };
    },
    'Memoriu rezistență': function (D, v) {
      var deep = _lib(D, 'structura'); if (deep && (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT')) deep += _lib(D, 'str_pth');
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — parametri de calcul ai amplasamentului', html: tbl([['Sistem structural', esc(D.struct || 'metalică')], ['Fundare', esc(D.fundare || 'după studiul geotehnic')], ['Zonă seismică (P100-1/2013)', 'a_g = ' + v.calc.seismic.ag + 'g, T_c = ' + v.calc.seismic.Tc + ' s'], ['Zăpadă (CR 1-1-3/2012)', v.calc.clima.sk + ' kN/m²'], ['Temperatura exterioară de calcul', v.calc.clima.Te + ' °C']], ['Parametru', 'Valoare']) }
      ] : (G.UXParagrafe ? G.UXParagrafe.rezistenta(D, v) : [
        { h: '1. Sistemul structural', html: '<p>Structura de rezistență: ' + esc(D.struct || 'metalică') + '.</p>' }
      ]);
      return { cat: 'Memorii Tehnice', file: 'Memoriu_rezistenta.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC DE REZISTENȚĂ'), secs) };
    },
    'Memorii instalații (IT/IS/IE/IG/HVAC/ICT)': function (D, v) {
      var deep = _lib(D, 'instalatii'); if (deep && (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT')) deep += _lib(D, 'inst_pth');
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
      var deep = _lib(D, 'aviz_mediu');
      var caps = ['Date de identificare (titular, proiectant, amplasament)', 'Descrierea proiectului (componente, etape, tehnologii)', 'Amplasamentul (fizic, geologic, hidrologic, vecinătăți, arii Natura 2000)', 'Cadrul legal aplicabil și încadrarea procedurală', 'Alternativele analizate (min. Alternativa 0 + soluția propusă)', 'Utilizarea resurselor (teren, apă, energie, materii prime)', 'Gestionarea deșeurilor (coduri EWC, operator autorizat)', 'Poluarea generată (aer, apă, sol, zgomot, vibrații) cu valori-limită', 'Riscul de accidente (scenarii + măsuri)', 'Impactul asupra factorilor de mediu (concluzie pe factor)', 'Măsuri de reducere a impactului', 'Programul de monitorizare (factor/metodă/frecvență/responsabil)', 'Rezumat non-tehnic (pentru public)', 'Concluzii + solicitare formală acord/aviz'];
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — verificare arii protejate Natura 2000', html: '<p>Se verifică dacă amplasamentul (' + esc(D.uat || '—') + ') se află în/în vecinătatea (≤ 5 km) unei arii Natura 2000 (SPA/SCI). În caz afirmativ → necesară Evaluare Adecvată (EA). Se corelează cu baza de date ANPM.</p>' }
      ] : [
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
      var deep = _lib(D, 'dali');
      var secs = deep ? [
        { h: null, html: deep }
      ] : [
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
      var deep = _lib(D, 'dtoe');
      if (deep) return { cat: 'Piese Administrative', file: 'Memoriu_DTOE.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC — ORGANIZAREA EXECUȚIEI (D.T.O.E.)', 'Legea 50/1991, Anexa 1'), [{ h: null, html: deep }]) };
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
      var deep = _lib(D, 'scenariu_psi');
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — sinteza echipării impuse de indicatorii proiectului', html: tbl([['Sprinklere', ac.sprinklere_oblig ? 'OBLIGATORII (SC>3000 mp / H>28m)' : 'după caz'], ['IDSI (detectare-semnalizare)', ac.idsi_oblig ? 'OBLIGATORIE (SC>2500 mp)' : 'după caz'], ['Lift de pompieri', ac.lift_oblig ? 'OBLIGATORIU (P+4 și peste)' : 'nu'], ['Hidranți interiori', (D.Sc > 600) ? 'da' : 'după caz']], ['Sistem', 'Necesitate']) }
      ] : [
        { h: '1. Riscul de incendiu și categoria de pericol', html: '<p>Categoria de pericol de incendiu: ' + esc(D.psi || ac.psi_default || 'C') + '. Grad de rezistență la foc recomandat: ' + esc(ac.grad_default || 'II') + '.</p>' },
        { h: '2. Echiparea și dotarea', html: tbl([['Sprinklere', ac.sprinklere_oblig ? 'OBLIGATORII (SC>3000 mp / H>28m)' : 'după caz'], ['IDSI (detectare-semnalizare)', ac.idsi_oblig ? 'OBLIGATORIE (SC>2500 mp)' : 'după caz'], ['Desfumare', (D.functiune === 'hala-industriala' && (D.Sc > 1000)) ? 'OBLIGATORIE (trape SHEV)' : 'după caz'], ['Lift de pompieri', ac.lift_oblig ? 'OBLIGATORIU (P+4 și peste)' : 'nu'], ['Hidranți interiori', (D.Sc > 600) ? 'da' : 'după caz']], ['Sistem', 'Necesitate']) },
        { h: '3. Referință', html: '<p>Scenariul complet, cu cele 7 capitole și motorul de verificare, se generează prin modulul dedicat SSI (Ord. MAI 129/2016) al platformei, care preia datele acestui proiect.</p>' }
      ];
      return { cat: 'Memorii Tehnice', file: 'Scenariu_securitate_incendiu_P118.doc', html: docHtml(_meta(D, 'SCENARIU DE SECURITATE LA INCENDIU', 'Ord. MAI 129/2016 · fundamentare aviz ISU'), secs) };
    },
    'Deviz general HG 907': function (D, v) {
      var body;
      if (G.UXDevize && G.UXDevize.devizGeneralHtml) body = G.UXDevize.devizGeneralHtml(D, v);
      else body = '<p>Devizul general se întocmește conform HG 907/2016 (capitolele 1–6: cheltuieli pentru obținerea terenului, amenajarea terenului, asigurarea utilităților, proiectare/asistență tehnică, investiția de bază, alte cheltuieli). Articolele de deviz cu prețuri se preiau din baza de prețuri editabilă a platformei (modul deviz).</p>';
      return { cat: 'Devize', file: 'Deviz_general_HG907.doc', html: docHtml(_meta(D, 'DEVIZ GENERAL', 'conform HG 907/2016'), [{ h: 'Deviz general al investiției', html: body }]) };
    },
    'Opis + Listă proiectanți': function (D, v) {
      var faza = (D.faza === 'PTh' || D.faza === 'PTh+DE') ? 'P.Th. + D.E.' : 'D.T.A.C.';
      // A. Opis piese scrise (din documentele bifate în engine + minim standard)
      var docs = (Object.keys(D._docs || {}).filter(function (k) { return D._docs[k]; }));
      if (!docs.length) docs = ['Memoriu tehnic general', 'Memoriu de arhitectură', 'Memoriu de rezistență', 'Memorii de instalații (IS/IT/IE)', 'Scenariu de securitate la incendiu', 'Deviz general (HG 907/2016)'];
      var scriseRows = docs.map(function (n, i) { return ['A.' + (i + 1), n, '—']; });
      // B. Opis piese desenate — set standard pe faza
      var DES = [
        ['U.01', 'Plan de încadrare în zonă', '1:2000 / 1:5000'],
        ['U.02', 'Plan de situație (cu rețele și sistematizare)', '1:500'],
        ['U.03', 'Plan de trasare / sistematizare verticală', '1:500'],
        ['A.01', 'Plan subsol', '1:100 / 1:50'],
        ['A.02', 'Plan parter', '1:100 / 1:50'],
        ['A.03', 'Planuri etaje curente', '1:100 / 1:50'],
        ['A.04', 'Plan învelitoare / terasă', '1:100'],
        ['A.05', 'Secțiuni caracteristice (A-A, B-B)', '1:100 / 1:50'],
        ['A.06', 'Fațade (toate)', '1:100 / 1:50'],
        ['R.01', 'Plan fundații + detalii', '1:50'],
        ['R.02', 'Planuri cofraj și armare planșee', '1:50'],
        ['IS.01', 'Scheme instalații sanitare', '1:100'],
        ['IT.01', 'Scheme instalații termice/ventilare', '1:100'],
        ['IE.01', 'Scheme instalații electrice + priză de pământ', '1:100']
      ];
      if (faza !== 'P.Th. + D.E.') DES = DES.filter(function (r) { return !/cofraj|armare/i.test(r[1]); }); // DTAC: fără detalii de execuție
      // C. Colectiv de elaborare — bloc de semnături + ștampile
      var COL = [
        ['Coordonare / Șef proiect', esc(D.proiectant || ''), 'proiectant general', ''],
        ['Arhitectură', '', 'arhitect cu drept de semnătură', 'nr. TNA / OAR'],
        ['Rezistență (structură)', '', 'inginer constructor', 'nr. înreg. / AICPS'],
        ['Instalații sanitare', '', 'inginer instalații', ''],
        ['Instalații termice / HVAC', '', 'inginer instalații', ''],
        ['Instalații electrice', '', 'inginer instalații', ''],
        ['Securitate la incendiu (scenariu)', '', 'proiectant/cadru tehnic PSI', ''],
        ['Verificator cerința A (rezistență)', '', 'verificator atestat MDLPA', 'atestat nr. ___'],
        ['Verificator cerințele B/Cc/D/E', '', 'verificator atestat MDLPA', 'atestat nr. ___'],
        ['Verificator instalații (Is/It/Ie)', '', 'verificator atestat MDLPA', 'atestat nr. ___']
      ];
      return { cat: 'Piese Administrative', file: 'Opis_lista_proiectanti.doc', html: docHtml(_meta(D, 'OPIS AL DOCUMENTAȚIEI ȘI LISTA DE SEMNĂTURI', 'piese scrise și desenate · colectiv de elaborare — Legea 50/1991, Anexa 1'), [
        { h: 'A. Opis piese scrise', html: tbl(scriseRows, ['Cod', 'Denumirea piesei scrise', 'Nr. file']) },
        { h: 'B. Opis piese desenate', html: tbl(DES, ['Cod planșă', 'Denumirea planșei', 'Scara']) },
        { h: 'C. Colectiv de elaborare și lista de semnături', html:
          '<p>Documentația a fost întocmită și verificată de colectivul de mai jos. Fiecare specialist semnează și aplică ștampila pentru piesele proprii; verificatorii atestați MDLPA semnează și ștampilează referatele de verificare pe cerințele fundamentale (Legea 10/1995).</p>' +
          sigTable(COL, ['Specialitatea / rolul', 'Nume și prenume', 'Calitate', 'Nr. înreg. / atestat']) },
        { h: 'D. Confirmarea proiectantului', html: '<p>Proiectantul general confirmă că prezenta documentație este completă, corelată interdisciplinar și întocmită conform reglementărilor tehnice în vigoare pentru faza <b>' + faza + '</b>. Piesele scrise și desenate din opis constituie documentația de autorizare/execuție și se predau beneficiarului, respectiv se includ în Cartea tehnică a construcției.</p>' }
      ]) };
    },
    'Referate verificatori': function (D, v) {
      var fn = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune;
      var CER = [
        { c: 'A1/A2', n: 'Rezistență mecanică și stabilitate', ob: 'proiectul de rezistență (structură, fundații, note de calcul, planuri de armare)', norme: 'P100-1/2013, SR EN 1990-1999, NP 112/2014, Legea 10/1995' },
        { c: 'B1', n: 'Siguranță și accesibilitate în exploatare', ob: 'proiectul de arhitectură (circulații, PMR, balustrade, pardoseli, scări, lift)', norme: 'NP 068, NP 051/2012, Legea 448/2006' },
        { c: 'Cc', n: 'Securitate la incendiu', ob: 'scenariul de securitate la incendiu, memoriile, planurile de evacuare', norme: 'P118-1/2/3, Legea 307/2006, HG 571/2016' },
        { c: 'D', n: 'Igienă, sănătate și mediu înconjurător', ob: 'proiectul de arhitectură și instalații sanitare/ventilare', norme: 'Ord. MS 119/2014, C 107, Legea 10/1995' },
        { c: 'E', n: 'Economie de energie și izolare termică', ob: 'proiectul de arhitectură (anvelopă) + certificatul de performanță energetică', norme: 'C 107/2005, Legea 372/2005, Mc 001/2006' },
        { c: 'F', n: 'Protecție împotriva zgomotului', ob: 'soluțiile de izolare acustică (pereți, planșee, finisaje)', norme: 'C 125/2013' },
        { c: 'Is', n: 'Instalații sanitare', ob: 'proiectul de instalații sanitare (alimentare apă, canalizare)', norme: 'I9/2015, SR EN 806/12056' },
        { c: 'It', n: 'Instalații termice', ob: 'proiectul de instalații termice/HVAC (sursă, distribuție, necesar de căldură)', norme: 'I13/2015, I5/2010, SR EN 12831' },
        { c: 'Ie', n: 'Instalații electrice', ob: 'proiectul de instalații electrice (tablouri, priză de pământ, paratrăsnet)', norme: 'I7/2011, SR EN 62305' }
      ];
      var faza = (D.faza === 'PTh' || D.faza === 'PTh+DE') ? 'P.Th. + D.E.' : 'D.T.A.C.';
      var carac = _caracConstr(D, v);
      var ampl = (D.uat || '—') + (D.nrcad ? ', nr. cad. ' + D.nrcad : '');
      var cat = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).cat || '';
      // Cerința F (protecție la zgomot) e relevantă doar la funcțiuni cu confort acustic critic
      var acustF = ['rezidential', 'turism', 'medical', 'invatamant', 'social', 'mixt'].indexOf(cat) >= 0;
      // Un referat = un FIȘIER separat, titlu propriu pe cerință
      function slug(c) { return c.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
      return CER.filter(function (r) { return r.c !== 'F' || acustF; }).map(function (r) {
        var body =
          '<p><b>Verificator tehnic de proiecte atestat MDLPA:</b> ______________________ (nume și prenume)<br>' +
          '<b>Domeniul / cerința de atestare:</b> ' + esc(r.c) + ' &nbsp;·&nbsp; <b>Atestat MDLPA nr.:</b> __________ / valabil până la __________</p>' +
          '<p style="text-align:center"><b>REFERAT DE VERIFICARE nr. ______ din data de ______________</b></p>' +
          '<h3>1. Date de identificare</h3>' +
          tbl([
            ['Denumirea proiectului / obiectivului', esc(fn)],
            ['Amplasament', esc(ampl)],
            ['Beneficiar / Investitor', esc(D.beneficiar || '—')],
            ['Proiectant general / de specialitate', esc(D.proiectant || '—')],
            ['Faza de proiectare verificată', faza],
            ['Cerința verificată', r.c + ' — ' + r.n],
            ['Nr. / data proiectului', '__________ / ______________']
          ], ['Element', 'Conținut']) +
          '<h3>2. Caracteristicile principale ale proiectului și ale construcției</h3>' +
          '<p>' + esc(carac) + '</p>' +
          '<h3>3. Documentele analizate (piese scrise și desenate)</h3>' +
          '<p>S-au analizat: ' + esc(r.ob) + '. Reglementări tehnice de referință: ' + esc(r.norme) + '.</p>' +
          '<h3>4. Concluziile verificării</h3>' +
          '<p>În urma verificării documentației la cerința fundamentală <b>' + esc(r.c) + ' — ' + esc(r.n) + '</b>, se constată că proiectul este întocmit cu respectarea reglementărilor tehnice în vigoare menționate. Se consideră că proiectul <b>CORESPUNDE</b> cerinței fundamentale ' + esc(r.c) + ', cu condiția însușirii de către proiectant a observațiilor consemnate mai jos (dacă există).</p>' +
          '<p><b>Observații / condiționări:</b> ______________________________________________________________________ (se completează de verificator; în lipsa observațiilor se înscrie „fără observații").</p>' +
          '<p>Prezentul referat face parte integrantă din documentația de autorizare/execuție și din Cartea tehnică a construcției. Verificarea nu îl absolvă pe proiectant de răspunderea pentru conținutul documentației (Legea 10/1995, art. 22; HG 925/1995).</p>' +
          sigTable([['Verificator tehnic atestat MDLPA — cerința ' + r.c, '', 'atestat nr. ______', 'data: __________']], ['Rol', 'Nume și prenume', 'Atestat', 'Data']);
        return { cat: 'Piese Administrative', file: 'Referat_verificare_cerinta_' + slug(r.c) + '.doc',
          html: docHtml(_meta(D, 'REFERAT DE VERIFICARE A PROIECTULUI — CERINȚA ' + r.c, r.n + ' — Legea 10/1995, HG 925/1995'), [{ h: null, html: body }]) };
      });
    },
    'PCCVI + faze determinante': function (D, v) {
      var fn = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune;
      var ampl = (D.uat || '—') + (D.nrcad ? ', nr. cad. ' + D.nrcad : '');
      // Program detaliat PCCVI — pe stadii fizice, cu document de referință, metodă, participanți, document încheiat
      // Participanți: E=Executant, P=Proiectant, B=Beneficiar/Diriginte, G=Geotehnician, ISC=Inspecția de Stat, FD=fază determinantă
      var P = [
        ['1', 'Trasarea construcției (axe, cote ±0,00)', 'proiect, plan de trasare', 'măsurători topo', 'E, B, P', 'PV trasare', ''],
        ['2', 'Natura terenului de fundare la cota de fundare', 'studiu geotehnic, proiect fundații', 'examinare vizuală + verificare strat portant', 'E, B, P, G, ISC', 'PV recepție teren / PVFD', 'FD1'],
        ['3', 'Recepția săpăturilor (cote, dimensiuni, sprijiniri)', 'proiect fundații, DTOE', 'măsurători, verificare sprijiniri', 'E, B', 'PVLA', ''],
        ['4', 'Strat de egalizare / pat de fundare', 'proiect, NE 012', 'verificare grosime, compactare (Ev2)', 'E, B', 'PVLA, buletin compactare', ''],
        ['5', 'Montarea armăturii fundațiilor / radierului', 'planuri de armare, SR EN 1992', 'verificare diametre, nr., poziție, acoperiri, înnădiri', 'E, B, P, ISC', 'PV recepție armătură / PVFD', 'FD2'],
        ['6', 'Betonarea fundațiilor / radierului', 'NE 012-2, rețetă beton', 'consistență (tasare), prelevare epruvete, bon livrare', 'E, B', 'bon beton, buletin SR EN 12390', ''],
        ['7', 'Hidroizolarea / cuva etanșă a subsolului', 'proiect, detalii, NP 040', 'verificare continuitate, etanșeitate, racorduri', 'E, B, P', 'PVLA lucrări ascunse', ''],
        ['8', 'Armarea stâlpilor / pereților structurali', 'planuri armare, P100-1', 'diametre, etrieri/confinare zone critice, acoperiri', 'E, B, P', 'PV recepție armătură', ''],
        ['9', 'Armarea planșeelor (grinzi, placă, noduri)', 'planuri armare, P100-1', 'poziție armătură, armătură de străpungere, noduri', 'E, B, P', 'PV recepție armătură', ''],
        ['10', 'Betonarea suprastructurii (pe niveluri)', 'NE 012, proiect', 'consistență, epruvete, rost de turnare, vibrare', 'E, B', 'bon beton, buletine rezistență', ''],
        ['11', 'Recepția structurii la roșu (înainte de închideri)', 'proiect rezistență', 'verificare geometrie, verticalitate, fisuri, decofrare', 'E, B, P, ISC', 'PVFD structură', 'FD3'],
        ['12', 'Zidării / compartimentări, buiandrugi, centuri', 'proiect, CR 6', 'verificare țesere, mortar, armare centuri', 'E, B', 'PVLA', ''],
        ['13', 'Termosistem (ETICS) / anvelopă termică', 'proiect termotehnic C107, agrement', 'aderență, grosime, dibluire, plasă', 'E, B, P', 'PVLA, PV recepție', ''],
        ['14', 'Învelitoare / terasă (hidroizolație, termoizolație)', 'proiect, detalii', 'etanșeitate (probă cu apă), pante, racorduri', 'E, B, P', 'PV probă etanșeitate, PVLA', ''],
        ['15', 'Tâmplărie exterioară (montaj, etanșare)', 'proiect, fișe tehnice', 'verificare montaj, etanșare, U declarat', 'E, B', 'PVLA', ''],
        ['16', 'Instalații sanitare — probe înainte de mascare', 'I9, proiect IS', 'probă de presiune / etanșeitate conducte', 'E, B, P', 'PV probă presiune, PVLA', 'FD4'],
        ['17', 'Instalații termice/HVAC — probe la rece/cald', 'I13/I5, proiect IT', 'probă presiune, probă funcționare, echilibrare', 'E, B', 'PV probe, buletine', ''],
        ['18', 'Instalații electrice — PRAM și priză de pământ', 'I7, SR EN 62305', 'măsurători PRAM, rezistență priză de pământ, continuitate', 'E, B, P', 'buletine PRAM, PV', ''],
        ['19', 'Instalații PSI (hidranți/sprinklere/detecție)', 'P118-2/3, proiect', 'probe presiune-debit, probe funcționale detecție', 'E, B, P', 'PV probe, scenariu SSI', ''],
        ['20', 'Finisaje interioare/exterioare', 'proiect arhitectură', 'planeitate, aderență, tolerante', 'E, B', 'PVLA, PV recepție', ''],
        ['21', 'Sistematizare, racorduri utilități, împrejmuire', 'proiect, avize', 'verificare execuție, racorduri la rețele', 'E, B', 'PVLA, PV racord', '']
      ];
      var pRows = P.map(function (r) { return [r[0], r[1], r[2], r[3], r[4], r[5] + (r[6] ? ' (' + r[6] + ')' : '')]; });
      // Program faze determinante — notificate ISC
      var FD = P.filter(function (r) { return r[6]; }).map(function (r) { return [r[6], r[1], r[4], 'notificare ISC cu min. 10 zile înainte']; });
      // extra FD structura la rosu daca nu e deja
      return { cat: 'Recepție & Urmărire', file: 'PCCVI_faze_determinante.doc', html: docHtml(_meta(D, 'PROGRAM DE CONTROL AL CALITĂȚII, VERIFICĂRI ȘI ÎNCERCĂRI (PCCVI)', 'pe faze de execuție și faze determinante — Legea 10/1995, HG 742/2018, HG 273/1994'), [
        { h: '1. Obiect, cadru legal și abrevieri', html: '<p>Prezentul program stabilește controalele de calitate, verificările și încercările pe parcursul execuției obiectivului „' + esc(fn) + '", ' + esc(ampl) + ', precum și fazele determinante la care se convoacă Inspectoratul de Stat în Construcții (ISC). Se întocmește de proiectant, se însușește de executant și beneficiar (diriginte de șantier atestat) și se avizează de ISC (Legea 10/1995, HG 742/2018, HG 273/1994 modificată prin HG 343/2017, Ordin ISC).</p><p><b>Abrevieri participanți:</b> E = Executant (responsabil tehnic cu execuția — RTE); B = Beneficiar / Diriginte de șantier; P = Proiectant; G = Geotehnician; ISC = Inspectoratul de Stat în Construcții. <b>FD</b> = fază determinantă. <b>PVLA</b> = proces-verbal de lucrări ascunse; <b>PVFD</b> = proces-verbal de fază determinantă.</p>' },
        { h: '2. Program de control pe faze de execuție (PCCVI)', html: tbl(pRows, ['Nr.', 'Lucrarea / faza supusă controlului', 'Document de referință', 'Metoda de verificare', 'Participă', 'Document încheiat']) },
        { h: '3. Program de faze determinante (se avizează ISC)', html: '<p>La fazele determinante execuția se oprește; continuarea se face numai după încheierea procesului-verbal de fază determinantă (PVFD) semnat de toți factorii și cu acordul ISC. Convocarea ISC se face în scris cu minim 10 zile lucrătoare înainte.</p>' + tbl(FD, ['Cod FD', 'Faza determinantă', 'Participă (obligatoriu)', 'Convocare']) },
        { h: '4. Controlul betoanelor și materialelor', html: tbl([['Beton', 'consistență (tasare/răspândire), clasă, prelevare min. 3 epruvete/element principal', 'SR EN 206, NE 012, buletine SR EN 12390'], ['Armătură', 'certificat de calitate, diametre, clasa de ductilitate (B500C zone seismice)', 'certificate 3.1, PV recepție'], ['Oțel/confecții metalice', 'certificate, suduri (VT/UT), protecție anticorozivă', 'buletine control suduri'], ['Agregate/mortar', 'conformitate, rețete', 'declarații de performanță']], ['Material', 'Ce se verifică', 'Document / normativ']) },
        { h: '5. Urmărirea comportării în timp (P130/1999)', html: '<p>După recepție se instituie urmărirea curentă a comportării construcției (examinări vizuale periodice — fisuri, tasări, hidroizolații, deformații), consemnată în Cartea tehnică. Pentru clasa de importanță I/II se prevede urmărire specială — monitorizarea tasărilor cu mărci topografice (măsurători la execuție și în primii ani de exploatare), stabilită prin proiect.</p>' },
        { h: '6. Recepția lucrărilor și Cartea tehnică', html: '<p>Recepția la terminarea lucrărilor și recepția finală se organizează conform HG 273/1994 (modificată prin HG 343/2017), cu comisie de recepție și consemnarea eventualelor obiecțiuni. Cartea tehnică a construcției se completează pe parcursul execuției (toate PVLA, PVFD, buletine, certificate) și se predă beneficiarului la recepție.</p>' },
        { h: '7. Semnături — însușirea programului', html: sigTable([
            ['Proiectant (elaborare)', esc(D.proiectant || ''), '', ''],
            ['Executant (RTE)', '', 'atestat RTE', ''],
            ['Beneficiar / Diriginte de șantier', '', 'autorizat', ''],
            ['ISC (avizare faze determinante)', '', '', '']
          ], ['Factor responsabil', 'Nume și prenume', 'Calitate / atestat', 'Data']) }
      ]) };
    },
    'Recepție (HG 273/1994)': function (D, v) {
      var deep = _lib(D, 'receptie');
      if (deep) return { cat: 'Recepție & Urmărire', file: 'Receptie_lucrari_HG273.doc', html: docHtml(_meta(D, 'RECEPȚIA LUCRĂRILOR DE CONSTRUCȚII', 'la terminarea lucrărilor + finală + carte tehnică + urmărire în timp — HG 273/1994'), [{ h: null, html: deep }]) };
      return { cat: 'Recepție & Urmărire', file: 'Proces_verbal_receptie.doc', html: docHtml(_meta(D, 'PROCES-VERBAL DE RECEPȚIE', 'la terminarea lucrărilor / finală — HG 273/1994'), [{ h: 'Proces-verbal de recepție', html: '<p>Se întocmește procesul-verbal de recepție la terminarea lucrărilor și, ulterior, recepția finală, conform HG 273/1994, cu comisia de recepție și eventualele obiecțiuni.</p>' }]) };
    },
    'Gantt + grafic finanțare': function (D, v) {
      var N = Math.max(6, Math.min(24, Math.round(+D.durata || 12))); // luni
      // activitati cu start/durata proportionale cu N si pondere % din C+M
      var ACT = [
        { n: 'Organizare de șantier', s: 0.00, d: 0.06, p: 2 },
        { n: 'Terasamente și săpături', s: 0.04, d: 0.06, p: 3 },
        { n: 'Infrastructură (fundații, hidroizolații)', s: 0.08, d: 0.14, p: 12 },
        { n: 'Suprastructură (cadre b.a., planșee)', s: 0.18, d: 0.28, p: 26 },
        { n: 'Închideri și compartimentări', s: 0.42, d: 0.18, p: 10 },
        { n: 'Învelitoare / terasă, tâmplărie exterioară', s: 0.50, d: 0.14, p: 8 },
        { n: 'Instalații (IS/IT/IE/HVAC/PSI)', s: 0.50, d: 0.28, p: 18 },
        { n: 'Finisaje interioare și exterioare', s: 0.66, d: 0.28, p: 15 },
        { n: 'Amenajări exterioare, împrejmuire', s: 0.82, d: 0.16, p: 4 },
        { n: 'Probe, verificări, recepție', s: 0.94, d: 0.06, p: 2 }
      ];
      var head = ['Activitate']; for (var m = 1; m <= N; m++) head.push('L' + m);
      var rows = ACT.map(function (a) {
        var s0 = Math.round(a.s * N), e0 = Math.min(N, Math.max(s0 + 1, Math.round((a.s + a.d) * N)));
        var r = [a.n]; for (var m = 1; m <= N; m++) r.push((m - 1 >= s0 && m - 1 < e0) ? '■' : ''); return r;
      });
      var gantt = tbl(rows, head);
      // finantare esalonata: valoare C+M repartizata pe luni dupa ponderea activitatilor active
      var cm = 0; try { cm = (v.calc && v.calc.deviz && v.calc.deviz.cm) ? +v.calc.deviz.cm : 0; } catch (e) {}
      if (!cm) cm = Math.round((+D.Sd || 900) * 1100); // estimare 1100 EUR/mp C+M
      var perMonth = new Array(N + 1).fill(0);
      ACT.forEach(function (a) {
        var s0 = Math.round(a.s * N), e0 = Math.min(N, Math.max(s0 + 1, Math.round((a.s + a.d) * N)));
        var span = Math.max(1, e0 - s0), val = cm * a.p / 100, per = val / span;
        for (var m = s0; m < e0; m++) perMonth[m + 1] += per;
      });
      var cum = 0; var finRows = [];
      for (var m = 1; m <= N; m++) { cum += perMonth[m]; finRows.push(['Luna ' + m, Math.round(perMonth[m]).toLocaleString('ro-RO'), Math.round(cum).toLocaleString('ro-RO'), (Math.round(cum / cm * 1000) / 10) + '%']); }
      finRows.push(['TOTAL C+M', Math.round(cm).toLocaleString('ro-RO'), Math.round(cm).toLocaleString('ro-RO'), '100%']);
      var fin = tbl(finRows, ['Perioada', 'Tranșă (EUR)', 'Cumulat (EUR)', '% din C+M']);
      var secs = [
        { h: '1. Durata și eșalonarea execuției', html: '<p>Durata estimată de execuție: <b>' + N + ' luni</b>. Graficul de eșalonare (Gantt) de mai jos corelează activitățile principale cu fazele determinante (PCCVI) și cu graficul de finanțare. Activitățile se suprapun controlat (fluxuri paralele) pentru încadrarea în durată.</p>' },
        { h: '2. Grafic Gantt de execuție', html: gantt + '<p style="font-size:11px;color:#666">■ = perioadă de desfășurare a activității. Drumul critic: terasamente → infrastructură → suprastructură → închideri → instalații mascate → finisaje → recepție.</p>' },
        { h: '3. Grafic de finanțare eșalonată (C+M)', html: '<p>Repartizarea valorii lucrărilor de construcții-montaj (C+M ≈ ' + Math.round(cm).toLocaleString('ro-RO') + ' EUR fără TVA) pe luni, proporțional cu volumul de lucrări executat. Tranșele se decontează pe baza situațiilor de lucrări confirmate de dirigintele de șantier.</p>' + fin },
        { h: '4. Corelări', html: '<p>Graficul se corelează cu: Devizul general (HG 907/2016) — valoarea C+M; PCCVI — momentele fazelor determinante (recepția fundațiilor, structurii la roșu, probelor de instalații); DTOE — organizarea de șantier și resursele. Orice modificare a duratei se reflectă în reeșalonarea tranșelor.</p>' }
      ];
      return { cat: 'Recepție & Urmărire', file: 'Grafic_executie_finantare.doc', html: docHtml(_meta(D, 'GRAFIC DE EXECUȚIE ȘI FINANȚARE', 'eșalonare Gantt + grafic de finanțare C+M'), secs) };
    },
    'Memorii avizatori': function (D, v) {
      var ac = v.calc || {};
      var avize = Object.keys(D._avize || {}).filter(function (k) { return D._avize[k]; });
      if (!avize.length) avize = ['ISU', 'DSP', 'APM', 'Operator energie electrică', 'Operator apă-canal', 'Salubritate'];
      function match(a) { return String(a).toLowerCase(); }
      var COMUNE = ['Cerere-tip / solicitare de aviz (formular emitent)', 'Certificat de urbanism (copie)', 'Plan de încadrare în zonă', 'Plan de situație cu amplasarea obiectivului', 'Dovada titlului asupra terenului (extras CF actualizat)', 'Împuternicire / delegație (dacă e cazul)', 'Dovada achitării tarifului de avizare'];
      function memAviz(a) {
        var k = match(a); var emitent, temei, body, docs;
        if (/isu|pompier|incendiu/.test(k)) {
          emitent = 'Inspectoratul pentru Situații de Urgență (ISU) județean / IGSU'; temei = 'Legea 307/2006, HG 571/2016, Ordin MAI 129/2016, P118-1/2/3';
          body = 'Se solicită avizul/autorizația de securitate la incendiu. Categoria de pericol de incendiu: ' + esc(ac.psi_default || 'C') + '; grad de rezistență la foc: ' + esc(ac.grad_default || 'II') + '. Obiectivul dispune de: căi de evacuare dimensionate (P118-1), ' + (ac.idsi_oblig ? 'detectare-semnalizare (IDSAI, P118-3), ' : '') + (ac.sprinklere_oblig ? 'sprinklere (SR EN 12845), ' : '') + 'hidranți, stingătoare, iluminat de securitate. Documentul de fundamentare este Scenariul de securitate la incendiu.';
          docs = ['Scenariul de securitate la incendiu (semnat de cadru tehnic/expert)', 'Memoriu tehnic — securitate la incendiu', 'Planuri (situație, niveluri) cu marcarea căilor de evacuare, hidranților, IDSAI', 'Referatul verificatorului cerința Cc (securitate la incendiu)', 'Fișe tehnice echipamente PSI / agremente'];
        } else if (/dsp|sanit|sanatate/.test(k)) {
          emitent = 'Direcția de Sănătate Publică (DSP) județeană'; temei = 'Legea 95/2006, Ordin MS 119/2014';
          body = 'Se solicită avizul/notificarea sanitară. Se demonstrează: grupuri sanitare (inclusiv adaptat PMR), ventilarea și iluminarea naturală, alimentarea cu apă potabilă și evacuarea apelor uzate, finisaje lavabile/igienizabile în spațiile cu cerințe, gestiunea deșeurilor.';
          docs = ['Memoriu tehnic sanitar (funcțiuni, circuite, dotări sanitare)', 'Plan de situație și planuri de arhitectură (niveluri)', 'Descrierea sursei de apă și a evacuării apelor uzate', 'Schema circuitelor funcționale (unde e cazul: medical/alimentar)'];
        } else if (/mediu|apm/.test(k)) {
          emitent = 'Agenția pentru Protecția Mediului (APM)'; temei = 'OUG 195/2005, Legea 292/2018, Ordin 269/2020';
          body = 'Se solicită actul de reglementare de mediu. Funcțiunea se încadrează conform anexelor Legii 292/2018; se verifică arealele Natura 2000 și, după caz, pragurile SEVESO. Memoriul de prezentare (Anexa 5E) este piesă distinctă.';
          docs = ['Memoriu de prezentare (Anexa 5E, Legea 292/2018)', 'Plan de situație + plan de încadrare', 'Certificat de urbanism', 'Descrierea gestiunii deșeurilor și a apelor uzate', 'Clasare/decizie etapă de încadrare (după depunere)'];
        } else if (/gaz/.test(k)) {
          emitent = 'Operatorul de distribuție gaze naturale (aviz + acord acces)'; temei = 'Legea 123/2012, NTPEE-2018, Ordine ANRE';
          body = 'Se solicită avizul de racordare la gaze naturale. Se prezintă necesarul de gaz (debit de calcul), poziția postului de reglare-măsurare (SRM), traseul de racord, măsurile de siguranță (detector gaz + electrovalvă).';
          docs = ['Cerere de racordare + fișa de solicitare debit', 'Memoriu tehnic instalații gaze (debit, SRM, trasee)', 'Plan de situație cu poziția branșamentului și SRM', 'Schema izometrică a instalației de utilizare'];
        } else if (/electric|energie|electrica/.test(k)) {
          emitent = 'Operatorul de distribuție energie electrică (Aviz tehnic de racordare — ATR)'; temei = 'Legea 123/2012, Ordine ANRE (Regulament racordare)';
          body = 'Se solicită avizul tehnic de racordare (ATR). Puterea instalată/absorbită rezultă din bilanțul electric (memoriu IE). Se prezintă poziția branșamentului, tabloul general, puterea solicitată.';
          docs = ['Cerere de racordare (ATR) + fișa de date energetice', 'Bilanțul de puteri (memoriu instalații electrice)', 'Plan de situație cu poziția branșamentului/PT', 'Certificat de urbanism, act de proprietate'];
        } else if (/apa|canal|apavital|raja|aquatim/.test(k)) {
          emitent = 'Operatorul de apă-canal (regional)'; temei = 'Legea 241/2006, I9/2015, NTPA-002';
          body = 'Se solicită avizul de branșare/racordare la apă-canal. Se prezintă debitele de apă (I9) și de ape uzate menajere/pluviale, poziția branșamentului și racordului la colectoare.';
          docs = ['Memoriu tehnic instalații sanitare (debite apă/canal)', 'Plan de situație cu rețelele și punctele de racord', 'Breviar de calcul debite (apă, menajer, pluvial)', 'Certificat de urbanism'];
        } else if (/salubr/.test(k)) {
          emitent = 'Operatorul de salubritate / autoritatea locală'; temei = 'Legea 101/2006, OUG 92/2021 (deșeuri)';
          body = 'Se solicită avizul de salubritate. Se prezintă platforma gospodărească de colectare selectivă a deșeurilor și modul de evacuare cu operatorul autorizat.';
          docs = ['Plan de situație cu platforma de deșeuri (dimensiuni, dotare)', 'Descrierea colectării selective și a contractului de salubrizare', 'Estimarea cantităților de deșeuri'];
        } else if (/protectie civil|ala|adapost/.test(k)) {
          emitent = 'ISU — protecție civilă'; temei = 'Legea 481/2004, HG 862/2016 (ALA)';
          body = 'Se solicită avizul de protecție civilă privind necesitatea/scutirea de adăpost ALA, în funcție de suprafața desfășurată' + (D.Sd ? ' (' + (+D.Sd).toLocaleString('ro-RO') + ' mp)' : '') + '.';
          docs = ['Memoriu tehnic ALA (necesitate/scutire, capacitate)', 'Planuri subsol/adăpost (dacă e cazul)', 'Plan de situație'];
        } else if (/circulat|rutier|drum|acces/.test(k)) {
          emitent = 'Administratorul drumului (CNAIR/CJ/Primărie) + Poliția Rutieră'; temei = 'OG 43/1997, norme tehnice drumuri';
          body = 'Se solicită avizul de acces la drumul public și de sistematizare a circulației. Se prezintă accesele auto/pietonale, razele de racordare, vizibilitatea, numărul de locuri de parcare.';
          docs = ['Plan de situație cu accesele și circulațiile', 'Studiu/plan de circulație (după caz)', 'Breviar parcaje (necesar vs. asigurat)'];
        } else {
          emitent = '(emitent conform CU)'; temei = 'conform mențiunii din Certificatul de Urbanism';
          body = 'Memoriu tehnic pentru obținerea avizului „' + esc(a) + '", cu descrierea soluției relevante pentru acest avizator și temeiul legal aplicabil.';
          docs = ['Memoriu tehnic specific', 'Plan de situație', 'Piese desenate relevante'];
        }
        var html =
          tbl([['Emitent aviz', esc(emitent)], ['Temei legal', esc(temei)], ['Faza', (D.faza === 'PTh' || D.faza === 'PTh+DE') ? 'P.Th. + D.E.' : 'D.T.A.C.']], ['Element', 'Conținut']) +
          '<h3>a) Solicitare / memoriu tehnic</h3><p>' + body + '</p>' +
          '<h3>b) Opisul documentelor din dosar</h3>' +
          opisCheck(COMUNE.concat(docs).map(function (d, i) { return ['' + (i + 1), d]; }), ['Nr.', 'Document']);
        return { h: 'DOSAR AVIZ — ' + esc(a), html: html };
      }
      var secs = [{ h: 'Notă introductivă', html: '<p>Dosarele de avize se întocmesc conform mențiunilor din Certificatul de Urbanism. Fiecare dosar cuprinde: <b>cererea-tip</b> a emitentului, <b>memoriul tehnic</b> specific avizatorului, <b>piesele desenate</b> relevante și <b>opisul documentelor</b> (checklist de mai jos). Coloana „Anexat" se bifează la constituirea fiecărui dosar. Documentele comune tuturor dosarelor: ' + COMUNE.slice(1).join('; ') + '.</p>' }].concat(avize.map(memAviz));
      return { cat: 'Avize', file: 'Dosare_avize.doc', html: docHtml(_meta(D, 'DOSARE DE AVIZE — MEMORII ȘI OPISURI DE DOCUMENTE', 'pe avizatori — conform Certificatului de Urbanism'), secs) };
    }
  };

  var PTH_ONLY = ['Caiet de sarcini arhitectură (PTh)', 'Caiet de sarcini rezistență (PTh)', 'Caiet de sarcini instalații (PTh)', 'Liste de cantități / antemăsurători (PTh)'];
  function _build(D, v) {
    var isPth = (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT');
    var selected = Object.keys(D._docs || {}).filter(function (k) { return D._docs[k] !== false && DOC_BUILDERS[k]; });
    if (!selected.length) selected = Object.keys(DOC_BUILDERS);
    // Caietele de sarcini + antemăsurătorile aparțin fazei PTh (Legea 50 Anexa 1: DTAC nu le conține)
    if (!isPth) selected = selected.filter(function (k) { return PTH_ONLY.indexOf(k) < 0; });
    var docs = []; // un builder poate întoarce un document SAU un array de documente (ex. câte un referat/cerință)
    selected.forEach(function (k) { try { var r = DOC_BUILDERS[k](D, v); if (Array.isArray(r)) docs = docs.concat(r.filter(Boolean)); else if (r) docs.push(r); } catch (e) {} });
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
