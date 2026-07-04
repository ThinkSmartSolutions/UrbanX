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
    var body = sections.map(function (s) { return '<h2>' + esc(s.h) + '</h2>' + (s.html || ''); }).join('');
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

  var DOC_BUILDERS = {
    'Memoriu general DTAC': function (D, v) {
      var fn = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune;
      return { cat: 'Memorii Tehnice', file: 'Memoriu_general_DTAC.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC GENERAL', 'Documentație tehnică pentru autorizarea executării lucrărilor de construire (DTAC)'), [
        { h: '1. Date de identificare', html: '<p>Prezenta documentație tehnică fundamentează autorizarea construirii obiectivului „' + esc(fn) + '", situat în ' + esc(D.uat || '—') + (D.nrcad ? ', nr. cadastral ' + esc(D.nrcad) : '') + ', beneficiar ' + esc(D.beneficiar || '—') + '.</p>' + (D.nrCU ? '<p>Certificat de urbanism nr. ' + esc(D.nrCU) + '.</p>' : '') },
        { h: '2. Descrierea funcțiunii și a soluției', html: '<p>Obiectivul are funcțiunea „' + esc(fn) + '". Soluția propusă respectă reglementările urbanistice și normativele tehnice specifice funcțiunii.</p>' },
        { h: '3. Indicatori urbanistici', html: _indicatoriTbl(D, v) },
        { h: '4. Sistem constructiv și date seismice', html: '<p>Structura de rezistență: ' + esc(D.struct || 'metalică') + '. Zonă seismică: a<sub>g</sub> = ' + v.calc.seismic.ag + 'g, T<sub>c</sub> = ' + v.calc.seismic.Tc + ' s (P100-1/2013). Zăpadă s<sub>k</sub> = ' + v.calc.clima.sk + ' kN/m² (CR 1-1-3), temperatura exterioară de calcul ' + v.calc.clima.Te + ' °C.</p>' },
        { h: '5. Verificarea conformității', html: _verificariTbl(v) + (v.neconformitati ? '<p><b>Atenție:</b> există ' + v.neconformitati + ' neconformitate(ăți) de rezolvat înainte de depunere.</p>' : '<p>Nu s-au identificat neconformități critice.</p>') }
      ]) };
    },
    'Memoriu arhitectură': function (D, v) {
      return { cat: 'Memorii Tehnice', file: 'Memoriu_arhitectura.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC DE ARHITECTURĂ'), [
        { h: '1. Situația existentă', html: '<p>Terenul în suprafață de ' + esc(D.Steren || '—') + ' mp, situat în ' + esc(D.uat || '—') + '. Vecinătăți: N — ' + esc(D.vecin_N || 'de precizat') + ', S — ' + esc(D.vecin_S || 'de precizat') + ', E — ' + esc(D.vecin_E || 'de precizat') + ', V — ' + esc(D.vecin_V || 'de precizat') + '.</p>' },
        { h: '2. Soluția arhitecturală', html: '<p>Regim de înălțime P+' + Math.max(0, (D.niv_supraterane || 1) - 1) + ', suprafață construită ' + esc(D.Sc || '—') + ' mp, desfășurată ' + esc(D.Sd || '—') + ' mp. Retragerea față de limita posterioară: ' + esc(D.retragere_spate || '—') + ' m.</p>' },
        { h: '3. Finisaje și accesibilitate PMR', html: '<p>Finisaje conform destinației. Se asigură accesibilitatea persoanelor cu dizabilități conform NP 051/2012 (rampe, uși min. 0,90 m, grupuri sanitare adaptate).</p>' }
      ]) };
    },
    'Memoriu rezistență': function (D, v) {
      return { cat: 'Memorii Tehnice', file: 'Memoriu_rezistenta.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC DE REZISTENȚĂ'), [
        { h: '1. Sistemul structural', html: '<p>Structura de rezistență: ' + esc(D.struct || 'metalică') + ', fundare ' + esc(D.fundare || 'izolată/continuă după studiul geotehnic') + '.</p>' },
        { h: '2. Încărcări', html: '<p>Încărcări permanente și utile conform SR EN 1991. Zăpadă: s<sub>k</sub> = ' + v.calc.clima.sk + ' kN/m² (CR 1-1-3/2012). Vânt conform CR 1-1-4. Temperatura exterioară de calcul: ' + v.calc.clima.Te + ' °C.</p>' },
        { h: '3. Acțiunea seismică', html: '<p>Conform P100-1/2013: a<sub>g</sub> = ' + v.calc.seismic.ag + 'g, T<sub>c</sub> = ' + v.calc.seismic.Tc + ' s. Clasa de importanță se stabilește conform destinației.</p>' },
        { h: '4. Fundații', html: '<p>Tipul și adâncimea de fundare se stabilesc pe baza studiului geotehnic (presiunea convențională a stratului portant). A se corela cu Pre-Studiul Geotehnic din platformă.</p>' }
      ]) };
    },
    'Memorii instalații (IT/IS/IE/IG/HVAC/ICT)': function (D, v) {
      return { cat: 'Memorii Tehnice', file: 'Memorii_instalatii.doc', html: docHtml(_meta(D, 'MEMORII TEHNICE — INSTALAȚII'), [
        { h: 'Instalații termice (IT)', html: '<p>Încălzire: ' + esc(({ ct_gaz: 'centrală termică pe gaz', pompa: 'pompă de căldură', vrf: 'sistem VRF', termoficare: 'racord termoficare', electric: 'încălzire electrică', radiant: 'radiant infraroșu' })[D.incalzire] || D.incalzire || 'de stabilit') + '. Necesarul de căldură se calculează conform C 107/2005.</p>' },
        { h: 'Instalații sanitare (IS)', html: '<p>Alimentare cu apă: ' + esc(({ retea: 'rețea publică', put: 'puț forat', rezervor: 'rezervor propriu' })[D.apa] || 'de stabilit') + '. Canalizare menajeră și pluvială conform I9 și SR 1846.</p>' },
        { h: 'Instalații electrice (IE)', html: '<p>Racord electric, tablouri, iluminat, prize, priză de pământ și paratrăsnet (SR EN 62305) conform I7/2011.</p>' },
        { h: 'Ventilație / HVAC + curenți slabi (ICT)', html: '<p>Ventilație conform destinației; curenți slabi (CCTV, control acces, date-voce, BMS) după caz.</p>' }
      ]) };
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

  function genereazaDosar(D, v) {
    v = v || (G.UXDoc && G.UXDoc.valideaza(D)) || { calc: {}, checks: [], neconformitati: 0 };
    var selected = Object.keys(D._docs || {}).filter(function (k) { return D._docs[k] !== false && DOC_BUILDERS[k]; });
    if (!selected.length) selected = Object.keys(DOC_BUILDERS);
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
  function _save(blob, name) { try { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); } catch (e) {} }

  G.UXDocBuilder = { genereazaDosar: genereazaDosar, docHtml: docHtml, DOC_BUILDERS: DOC_BUILDERS };
  console.log('[UXDocBuilder] generator DOCX încărcat (' + Object.keys(DOC_BUILDERS).length + ' tipuri documente)');
})(window);
