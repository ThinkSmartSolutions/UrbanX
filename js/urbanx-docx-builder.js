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
  function _meta(D, titlu, subtitlu) {
    return { titlu: titlu, subtitlu: subtitlu || '', proiect: D.nume || '—', beneficiar: D.beneficiar || '—', amplasament: (D.uat || '') + (D.nrcad ? ', nr. cad. ' + D.nrcad : ''), faza: D.faza || 'DTAC' };
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
      ] : [
        { h: '1. Date de identificare', html: '<p>Prezenta documentație tehnică fundamentează autorizarea construirii obiectivului „' + esc(fn) + '", situat în ' + esc(D.uat || '—') + (D.nrcad ? ', nr. cadastral ' + esc(D.nrcad) : '') + ', beneficiar ' + esc(D.beneficiar || '—') + '.</p>' + (D.nrCU ? '<p>Certificat de urbanism nr. ' + esc(D.nrCU) + '.</p>' : '') },
        { h: '2. Descrierea funcțiunii și a soluției', html: '<p>Obiectivul are funcțiunea „' + esc(fn) + '". Soluția propusă respectă reglementările urbanistice și normativele tehnice specifice funcțiunii.</p>' },
        { h: '3. Indicatori urbanistici', html: _indicatoriTbl(D, v) },
        { h: '4. Sistem constructiv și date seismice', html: '<p>Structura de rezistență: ' + esc(D.struct || 'metalică') + '. Zonă seismică: a<sub>g</sub> = ' + v.calc.seismic.ag + 'g, T<sub>c</sub> = ' + v.calc.seismic.Tc + ' s (P100-1/2013). Zăpadă s<sub>k</sub> = ' + v.calc.clima.sk + ' kN/m² (CR 1-1-3), temperatura exterioară de calcul ' + v.calc.clima.Te + ' °C.</p>' },
        { h: '5. Verificarea conformității', html: _verificariTbl(v) + (v.neconformitati ? '<p><b>Atenție:</b> există ' + v.neconformitati + ' neconformitate(ăți) de rezolvat înainte de depunere.</p>' : '<p>Nu s-au identificat neconformități critice.</p>') }
      ];
      return { cat: 'Memorii Tehnice', file: 'Memoriu_general_DTAC.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC GENERAL', 'Documentație tehnică pentru autorizarea executării lucrărilor de construire (DTAC)'), secs) };
    },
    'Memoriu arhitectură': function (D, v) {
      var deep = _lib(D, 'arhitectura');
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — indicatori și date specifice proiectului', html: _indicatoriTbl(D, v) + '<p>Vecinătăți: N — ' + esc(D.vecin_N || 'de precizat') + ', S — ' + esc(D.vecin_S || 'de precizat') + ', E — ' + esc(D.vecin_E || 'de precizat') + ', V — ' + esc(D.vecin_V || 'de precizat') + '. Retrageri propuse: aliniament ' + esc(D.retragere_fata || '—') + ' m, lateral ' + esc(D.retragere_lateral || '—') + ' m, posterior ' + esc(D.retragere_spate || '—') + ' m.</p>' }
      ] : [
        { h: '1. Situația existentă', html: '<p>Terenul în suprafață de ' + esc(D.Steren || '—') + ' mp, situat în ' + esc(D.uat || '—') + '. Vecinătăți: N — ' + esc(D.vecin_N || 'de precizat') + ', S — ' + esc(D.vecin_S || 'de precizat') + ', E — ' + esc(D.vecin_E || 'de precizat') + ', V — ' + esc(D.vecin_V || 'de precizat') + '.</p>' },
        { h: '2. Soluția arhitecturală', html: '<p>Regim de înălțime P+' + Math.max(0, (D.niv_supraterane || 1) - 1) + ', suprafață construită ' + esc(D.Sc || '—') + ' mp, desfășurată ' + esc(D.Sd || '—') + ' mp. Retragerea față de limita posterioară: ' + esc(D.retragere_spate || '—') + ' m.</p>' },
        { h: '3. Finisaje și accesibilitate PMR', html: '<p>Finisaje conform destinației. Se asigură accesibilitatea persoanelor cu dizabilități conform NP 051/2012 (rampe, uși min. 0,90 m, grupuri sanitare adaptate).</p>' }
      ];
      return { cat: 'Memorii Tehnice', file: 'Memoriu_arhitectura.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC DE ARHITECTURĂ'), secs) };
    },
    'Memoriu rezistență': function (D, v) {
      var deep = _lib(D, 'structura');
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — parametri de calcul ai amplasamentului', html: tbl([['Sistem structural', esc(D.struct || 'metalică')], ['Fundare', esc(D.fundare || 'după studiul geotehnic')], ['Zonă seismică (P100-1/2013)', 'a_g = ' + v.calc.seismic.ag + 'g, T_c = ' + v.calc.seismic.Tc + ' s'], ['Zăpadă (CR 1-1-3/2012)', v.calc.clima.sk + ' kN/m²'], ['Temperatura exterioară de calcul', v.calc.clima.Te + ' °C']], ['Parametru', 'Valoare']) }
      ] : [
        { h: '1. Sistemul structural', html: '<p>Structura de rezistență: ' + esc(D.struct || 'metalică') + ', fundare ' + esc(D.fundare || 'izolată/continuă după studiul geotehnic') + '.</p>' },
        { h: '2. Încărcări', html: '<p>Încărcări permanente și utile conform SR EN 1991. Zăpadă: s<sub>k</sub> = ' + v.calc.clima.sk + ' kN/m² (CR 1-1-3/2012). Vânt conform CR 1-1-4. Temperatura exterioară de calcul: ' + v.calc.clima.Te + ' °C.</p>' },
        { h: '3. Acțiunea seismică', html: '<p>Conform P100-1/2013: a<sub>g</sub> = ' + v.calc.seismic.ag + 'g, T<sub>c</sub> = ' + v.calc.seismic.Tc + ' s. Clasa de importanță se stabilește conform destinației.</p>' },
        { h: '4. Fundații', html: '<p>Tipul și adâncimea de fundare se stabilesc pe baza studiului geotehnic (presiunea convențională a stratului portant). A se corela cu Pre-Studiul Geotehnic din platformă.</p>' }
      ];
      return { cat: 'Memorii Tehnice', file: 'Memoriu_rezistenta.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC DE REZISTENȚĂ'), secs) };
    },
    'Memorii instalații (IT/IS/IE/IG/HVAC/ICT)': function (D, v) {
      var deep = _lib(D, 'instalatii');
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — soluții alese pentru proiect', html: tbl([['Încălzire', esc(({ ct_gaz: 'centrală termică pe gaz', pompa: 'pompă de căldură', vrf: 'sistem VRF', termoficare: 'racord termoficare', electric: 'încălzire electrică', radiant: 'radiant infraroșu' })[D.incalzire] || D.incalzire || 'de stabilit')], ['Alimentare cu apă', esc(({ retea: 'rețea publică', put: 'puț forat', rezervor: 'rezervor propriu' })[D.apa] || 'de stabilit')]], ['Instalație', 'Soluție']) }
      ] : [
        { h: 'Instalații termice (IT)', html: '<p>Încălzire: ' + esc(({ ct_gaz: 'centrală termică pe gaz', pompa: 'pompă de căldură', vrf: 'sistem VRF', termoficare: 'racord termoficare', electric: 'încălzire electrică', radiant: 'radiant infraroșu' })[D.incalzire] || D.incalzire || 'de stabilit') + '. Necesarul de căldură se calculează conform C 107/2005.</p>' },
        { h: 'Instalații sanitare (IS)', html: '<p>Alimentare cu apă: ' + esc(({ retea: 'rețea publică', put: 'puț forat', rezervor: 'rezervor propriu' })[D.apa] || 'de stabilit') + '. Canalizare menajeră și pluvială conform I9 și SR 1846.</p>' },
        { h: 'Instalații electrice (IE)', html: '<p>Racord electric, tablouri, iluminat, prize, priză de pământ și paratrăsnet (SR EN 62305) conform I7/2011.</p>' },
        { h: 'Ventilație / HVAC + curenți slabi (ICT)', html: '<p>Ventilație conform destinației; curenți slabi (CCTV, control acces, date-voce, BMS) după caz.</p>' }
      ];
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
    var isPth = (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT' || D.faza === 'ambele');
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
