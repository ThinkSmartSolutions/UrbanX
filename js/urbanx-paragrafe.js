/* ============================================================================
 * UrbanX — Paragrafe TEHNICE PARAMETRIZATE (generice, pt ORICE funcțiune).
 * NU texte pre-scrise per funcțiune: fiecare secțiune se compune din datele LIVE
 * ale proiectului (D), calculele auto (v.calc: seismic/climă/parcaje/PSI), modelul
 * funcțional (D._spatii) și metadatele funcțiunii (UXDoc.FUNCTIUNI). Adaptiv pe
 * categoria de funcțiune (medical/alimentar/industrial/rezidențial/educațional...).
 * window.UXParagrafe.{arhitectura,rezistenta,instalatii,general}(D, v) → [{h,html}]
 * ========================================================================== */
(function (G) {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function n(x) { return (x == null || x === '') ? '—' : (typeof x === 'number' ? x.toLocaleString('ro-RO') : esc(x)); }
  function tbl(rows, head) { var h = head ? '<tr>' + head.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>' : ''; return '<table>' + h + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + (c == null ? '' : c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>'; }
  function fnMeta(D) { try { return (G.UXDoc && G.UXDoc.FUNCTIUNI && G.UXDoc.FUNCTIUNI[D.functiune]) || {}; } catch (e) { return {}; } }
  function fnLabel(D) { var m = fnMeta(D); return m.label || D.functiune || 'obiectiv'; }
  function regim(D) { return 'P+' + Math.max(0, (+D.niv_supraterane || 1) - 1); }
  function spatiiTbl(D) {
    var sp = D._spatii || []; if (!sp.length) return '';
    var su = 0; sp.forEach(function (r) { su += (+r.buc || 0) * (+r.mp_unit || 0); });
    return '<p>Programul de spații de mai jos derivă din modelul funcțional confirmat (capacitate → reguli normative de dependență). Suprafață utilă totală: <b>' + Math.round(su).toLocaleString('ro-RO') + ' mp</b>.</p>' +
      tbl(sp.map(function (r) { return [esc(r.nume) + (r.ob ? ' *' : ''), esc(r.cat || '—'), esc(r.niv || 'P'), '' + (r.buc || 1), '' + (r.mp_unit || 0), '' + Math.round((r.buc || 0) * (r.mp_unit || 0))]; }), ['Spațiu', 'Categorie', 'Niv', 'Buc', 'Su/buc (mp)', 'Su tot (mp)']);
  }
  // note adaptive pe categoria funcțiunii
  function catNote(cat, tip) {
    var C = {
      medical: { finisaj: 'suprafețe lavabile, dezinfectabile, fără rosturi (racorduri cu scafă), conform Ord. MS 914/2006; pardoseli PVC omogen sudat termic în zonele de îngrijire', ventil: 'ventilare/climatizare cu filtrare și controlul presiunilor (suprapresiune zone sterile, depresiune laboratoare)' },
      alimentar: { finisaj: 'suprafețe impermeabile, netede, lavabile și rezistente la dezinfectanți, cu scafă rotunjită la racorduri, circuite separate curat/murdar conform HG 924/2005 (HACCP)', ventil: 'ventilare forțată cu hotă de captare și aport de aer compensator; separarea circuitelor de aer' },
      industrial: { finisaj: 'pardoseală industrială din beton sclivisit clasa de portanță conform sarcinilor de exploatare; finisaje rezistente la trafic și abraziune', ventil: 'ventilare industrială / desfumare conform proces; hidranți și dotări PSI' },
      social: { finisaj: 'finisaje calde, antiderapante (R10-R11 în zone umede), fără praguri, cu contrast cromatic pentru orientare — adecvate persoanelor vulnerabile', ventil: 'ventilare cu aport de aer proaspăt sporit pentru confortul ocupanților' },
      educational: { finisaj: 'finisaje ușor de întreținut, iluminat natural generos, confort acustic în sălile de activitate (C 125)', ventil: 'ventilare cu aer proaspăt conform densității de ocupare (NP 010)' },
      rezidential: { finisaj: 'finisaje de confort rezidențial, izolare fonică între unități, tâmplărie performantă termic', ventil: 'ventilare naturală + mecanică în băi/bucătării' },
      comercial: { finisaj: 'finisaje comerciale rezistente la trafic intens, semnalistică, accesibilitate PMR', ventil: 'climatizare de confort și ventilare conform aglomerării' }
    };
    return (C[cat] || {})[tip] || (tip === 'finisaj' ? 'finisaje adecvate destinației, durabile și ușor de întreținut' : 'ventilare adecvată destinației');
  }

  function arhitectura(D, v) {
    var ac = (v && v.calc) || {}; var m = fnMeta(D); var cat = m.cat || '';
    var ocup = 0; (D._spatii || []).forEach(function (r) { ocup += (+r.ocup || 0) * (+r.buc || 0); });
    var fluxuri = Math.max(1, Math.ceil((ocup || 50) / 90)); // P118: C=90 pers/flux, flux=0,60m
    var secs = [];
    secs.push({ h: '1. Amplasament și situația existentă', html: '<p>Obiectivul „' + esc(fnLabel(D)) + '" se amplasează pe terenul în suprafață de <b>' + n(D.Steren) + ' mp</b> situat în ' + n(D.uat) + (D.judet ? ', județul ' + n(D.judet) : '') + (D.nrcad ? ', nr. cadastral ' + n(D.nrcad) : '') + '. Vecinătăți: Nord — ' + n(D.vecin_N) + '; Sud — ' + n(D.vecin_S) + '; Est — ' + n(D.vecin_E) + '; Vest — ' + n(D.vecin_V) + '. Terenul beneficiază de acces din drumul public și de posibilitatea racordării la utilitățile edilitare.</p>' });
    secs.push({ h: '2. Reglementări urbanistice și încadrare', html: '<p>Conform Certificatului de Urbanism' + (D.nrCU ? ' nr. ' + n(D.nrCU) : '') + ', parcela admite funcțiunea propusă. Indicatorii maximi admiși: POT max ' + n(D.POT_max) + '%, CUT max ' + n(D.CUT_max) + (D.H_max ? ', înălțime maximă ' + n(D.H_max) + ' m' : '') + (D.niv_max ? ', regim maxim ' + n(D.niv_max) + ' niveluri' : '') + '. Soluția propusă se încadrează în acești parametri (POT propus ' + n(ac.POT) + '%, CUT propus ' + n(ac.CUT) + ').</p>' + tbl([['Suprafață teren', n(D.Steren) + ' mp'], ['Suprafață construită (SC)', n(D.Sc) + ' mp'], ['Suprafață desfășurată (SD)', n(D.Sd) + ' mp'], ['Regim de înălțime', regim(D) + (D.H ? ' (H = ' + n(D.H) + ' m)' : '')], ['POT propus / max', n(ac.POT) + '% / ' + n(D.POT_max) + '%'], ['CUT propus / max', n(ac.CUT) + ' / ' + n(D.CUT_max)]], ['Indicator', 'Valoare']) });
    secs.push({ h: '3. Programul funcțional și de spații', html: (spatiiTbl(D) || '<p>Programul de spații se stabilește din tema de proiectare și capacitatea obiectivului. Se recomandă generarea programului funcțional din modulul dedicat, pentru dimensionarea normativă a fiecărui spațiu.</p>') });
    secs.push({ h: '4. Soluția arhitecturală și de compartimentare', html: '<p>Soluția propune un regim de înălțime ' + regim(D) + ', cu o suprafață construită de ' + n(D.Sc) + ' mp și desfășurată de ' + n(D.Sd) + ' mp. Compartimentarea urmează fluxurile funcționale specifice destinației, cu separarea zonelor publice de cele tehnice/de serviciu și cu asigurarea circulațiilor accesibile. Înălțimile libere respectă cerințele destinației.</p>' });
    secs.push({ h: '5. Accesibilitatea persoanelor cu dizabilități (NP 051/2012)', html: '<p>Se asigură accesibilitatea integrală conform NP 051/2012 și Legii 448/2006: acces fără trepte (rampă cu pantă max. 8%, mână curentă bilaterală), uși cu lumina liberă min. 0,90 m pe traseele accesibile, grup sanitar adaptat cu spațiu de manevră Ø1,50 m și bare de sprijin' + ((+D.niv_supraterane || 1) > 1 ? ', ascensor accesibil (cabină min. 1,10×1,40 m) pentru accesul la etaj' : '') + '. Pardoseli antiderapante, praguri ≤ 2 cm teșite.</p>' });
    secs.push({ h: '6. Finisaje', html: '<p>Finisajele se aleg în raport cu destinația: ' + catNote(cat, 'finisaj') + '. Toate materialele poartă marcaj CE și declarație de performanță; pe căile de evacuare se respectă clasele de reacție la foc impuse de P118-1.</p>' });
    secs.push({ h: '7. Anvelopă și performanță energetică (C 107/2005)', html: '<p>Anvelopa termică se dimensionează conform C 107/2005 și Legii 372/2005: pereți exteriori, planșeu peste ultimul nivel și placă pe sol cu rezistențe termice peste minimele normate, tâmplărie termoizolantă (Uw ≤ 1,3 W/m²K). Pentru clădire publică nouă se urmărește standardul nZEB, cu aport din surse regenerabile. Temperatura exterioară de calcul: ' + n(ac.clima && ac.clima.Te) + ' °C.</p>' });
    secs.push({ h: '8. Evacuarea și securitatea la incendiu (arhitectură)', html: '<p>Numărul de ocupanți de calcul: <b>' + (ocup || '—') + '</b> persoane. Capacitatea de evacuare (P118-1, C = 90 pers/flux, un flux = 0,60 m) necesită min. <b>' + fluxuri + ' fluxuri</b> (lățime ≈ ' + (fluxuri * 0.60).toFixed(2) + ' m), asigurate prin cel puțin două căi de evacuare independente. Gradul de rezistență la foc recomandat: ' + n(ac.grad_default || 'II') + '; categoria de pericol: ' + n(ac.psi_default) + '. Detalierea se face în Scenariul de securitate la incendiu.</p>' });
    secs.push({ h: '9. Amenajări exterioare și sistematizare', html: '<p>Se asigură spații verzi de min. ' + n(ac.sv_min_pct) + '% (' + n(ac.sv_min_mp) + ' mp), ' + n(ac.parcaje_necesare) + ' locuri de parcare necesare (din care min. 4% adaptate PMR), alei accesibile, sistematizare verticală cu pante de scurgere a apelor pluviale dinspre construcție și racord la cotele domeniului public.</p>' });
    secs.push({ h: '10. Concluzii', html: '<p>Soluția de arhitectură răspunde temei de proiectare și se încadrează în reglementările urbanistice și în cerințele fundamentale ale Legii 10/1995. Documentația se corelează cu memoriile de rezistență și instalații și cu scenariul de securitate la incendiu.</p>' });
    return secs;
  }

  function rezistenta(D, v) {
    var ac = (v && v.calc) || {}; var s = ac.seismic || {}; var cl = ac.clima || {};
    var struct = ({ beton: 'cadre din beton armat monolit', metalica: 'structură metalică (cadre)', prefabricat: 'beton armat prefabricat', lemn: 'structură din lemn (CLT/glulam)', zidarie: 'zidărie portantă cu centuri și planșee din beton armat', lsf: 'structură metalică ușoară (LSF)', mixt: 'structură mixtă metal-beton' })[D.struct] || (D.struct || 'cadre din beton armat');
    var secs = [];
    secs.push({ h: '1. Sistemul structural', html: '<p>Structura de rezistență a obiectivului „' + esc(fnLabel(D)) + '" (regim ' + regim(D) + ', SC ' + n(D.Sc) + ' mp) este de tip <b>' + esc(struct) + '</b>. Infrastructura: fundare ' + n(D.fundare || 'directă (izolată/continuă), stabilită prin studiul geotehnic') + '. Suprastructura asigură preluarea încărcărilor gravitaționale și seismice și transmiterea lor la teren.</p>' });
    secs.push({ h: '2. Cadrul normativ', html: '<p>Proiectarea respectă: SR EN 1990 (bazele proiectării), SR EN 1991 (acțiuni), SR EN 1992/1993/1995 (beton/oțel/lemn) cu anexele naționale, P100-1/2013 (proiectare seismică), NP 112/2014 (fundații), CR 1-1-3/2012 (zăpadă), CR 1-1-4/2012 (vânt), Legea 10/1995.</p>' });
    secs.push({ h: '3. Evaluarea acțiunilor', html: tbl([['Permanente (G)', 'greutatea proprie + finisaje + instalații'], ['Utile (Q) — SR EN 1991-1-1', 'conform categoriei de folosință a destinației'], ['Zăpadă (CR 1-1-3/2012)', 's<sub>k</sub> = ' + n(cl.sk) + ' kN/m²'], ['Vânt (CR 1-1-4/2012)', 'conform zonei de vânt a amplasamentului'], ['Temperatură (SR EN 1991-1-5)', 'T<sub>e</sub> = ' + n(cl.Te) + ' °C']], ['Acțiune', 'Valoare / referință']) });
    secs.push({ h: '4. Acțiunea seismică (P100-1/2013)', html: '<p>Parametrii de hazard seismic ai amplasamentului (' + n(D.judet) + '): accelerația de proiectare <b>a<sub>g</sub> = ' + n(s.ag) + 'g</b>, perioada de control <b>T<sub>c</sub> = ' + n(s.Tc) + ' s</b>' + (s.zona ? ' (zona ' + esc(s.zona) + ')' : '') + '. Clasa de importanță-expunere se stabilește conform destinației (uzual II-III), cu factorul de importanță aferent. Se adoptă o clasă de ductilitate corespunzătoare, cu regulile de armare/detaliere seismică specifice.</p>' });
    secs.push({ h: '5. Combinații de încărcări', html: '<p>Se consideră combinațiile de la stările limită ultime (SLU: 1,35G + 1,5Q; gruparea seismică G + ψ₂Q ± E) și de serviciu (SLS), conform SR EN 1990. Verificările acoperă capacitatea portantă, stabilitatea, deformațiile și fisurarea.</p>' });
    secs.push({ h: '6. Infrastructura și fundarea', html: '<p>Sistemul de fundare și adâncimea de fundare se stabilesc pe baza studiului geotehnic (NP 074/2014), în funcție de presiunea convențională a stratului portant și de nivelul apei subterane. Fundațiile se leagă în ambele direcții pentru conlucrare la acțiunea seismică (P100-1). Se prevede hidroizolarea infrastructurii.</p>' });
    secs.push({ h: '7. Materiale și durabilitate', html: '<p>Materialele (clase de beton, oțel de armare/structural, clase de expunere SR EN 206) se aleg în funcție de solicitări și de mediul de expunere, cu acoperiri nominale corespunzătoare. Toate produsele poartă marcaj CE / agrement tehnic.</p>' });
    secs.push({ h: '8. Concluzii', html: '<p>Soluția structurală asigură cerința fundamentală A — rezistență mecanică și stabilitate (Legea 10/1995). Dimensionarea de detaliu și verificările complete se realizează în faza de proiect tehnic, pe model de calcul spațial, și se verifică de verificator atestat pe cerința A.</p>' });
    return secs;
  }

  function instalatii(D, v) {
    var ac = (v && v.calc) || {}; var cat = (fnMeta(D).cat) || '';
    var inc = ({ ct_gaz: 'centrală termică pe gaz (condensație)', pompa: 'pompă de căldură', vrf: 'sistem VRF', termoficare: 'racord la termoficare', electric: 'încălzire electrică', radiant: 'panouri radiante infraroșu' })[D.incalzire] || (D.incalzire || 'sursă termică de stabilit');
    var apa = ({ retea: 'rețea publică', put: 'puț forat propriu', rezervor: 'rezervor propriu' })[D.apa] || 'de stabilit';
    var secs = [];
    secs.push({ h: 'A. Instalații termice (I13)', html: '<p>Încălzire asigurată prin ' + esc(inc) + '. Necesarul de căldură se determină conform SR EN 12831 / C 107, pe încăperi, cu temperaturi interioare de calcul specifice destinației. ' + esc(catNote(cat, 'ventil')) + '. Distribuție cu izolare termică a conductelor.</p>' });
    secs.push({ h: 'B. Instalații sanitare (I9)', html: '<p>Alimentare cu apă din ' + esc(apa) + '; debitele de calcul se determină prin metoda echivalenților (I9). Canalizare menajeră și pluvială separate, cu dimensionare pe tronsoane și ventilarea coloanelor (SR EN 12056). Obiecte sanitare conform destinației și normelor de igienă, cu grup sanitar adaptat PMR.</p>' });
    secs.push({ h: 'C. Instalații electrice (I7/2011)', html: '<p>Bilanț de puteri pe receptoare (iluminat, prize, forță, HVAC), racord de joasă tensiune, tablou general și tablouri secundare, protecții diferențiale, priză de pământ (schema TN-S) și protecție împotriva trăsnetului (SR EN 62305, în funcție de evaluarea riscului). Iluminat conform NP 061 / SR EN 12464-1 și iluminat de securitate (SR EN 1838, autonomie ≥ 1 h).</p>' });
    secs.push({ h: 'D. Ventilare / climatizare (I5)', html: '<p>' + esc(catNote(cat, 'ventil')) + '. Debitele de aer proaspăt se dimensionează pe ocupare; pentru clădiri noi se prevede recuperare de căldură (η ≥ 75%). Clapete antifoc la traversarea elementelor de compartimentare, comandate de la centrala de semnalizare.</p>' });
    secs.push({ h: 'E. Securitate la incendiu — instalații (P118-2/3)', html: '<p>Categoria de pericol: ' + n(ac.psi_default) + '. Detectare-semnalizare (IDSAI, P118-3)' + (ac.idsi_oblig ? ' <b>obligatorie</b> (SC > 2500 mp)' : ' după caz') + '; stingere cu hidranți interiori' + (D.Sc > 600 ? ' (necesari)' : ' după caz') + '; sprinklere' + (ac.sprinklere_oblig ? ' <b>obligatorii</b> (SC > 3000 mp / H > 28 m)' : ' după caz') + '; desfumare după caz. Stingătoare portabile amplasate conform ariei.</p>' });
    if (D.gaze) secs.push({ h: 'F. Instalații de gaze naturale (NTPEE)', html: '<p>Racord la rețeaua de gaze prin post de reglare-măsurare, cu detector de gaz și electrovalvă de siguranță; ventilarea încăperii sursei și evacuarea etanșă a gazelor arse.</p>' });
    secs.push({ h: 'G. Curenți slabi (ICT)', html: '<p>Rețea structurată voce-date, control acces, CCTV (cu respectarea GDPR), BMS pentru monitorizarea instalațiilor' + (cat === 'social' || cat === 'medical' ? ', sistem de apelare/asistență (nurse-call) în grupurile sanitare și spațiile de îngrijire' : '') + '. Alimentare de rezervă (UPS) pentru circuitele vitale.</p>' });
    return secs;
  }

  function general(D, v) {
    var ac = (v && v.calc) || {};
    var secs = [];
    secs.push({ h: '1. Date de identificare', html: '<p>Prezenta documentație fundamentează autorizarea obiectivului „' + esc(fnLabel(D)) + '", ' + esc(D.faza === 'ambele' ? 'fazele DTAC + PTh' : (D.faza || 'DTAC')) + ', amplasat în ' + n(D.uat) + (D.judet ? ', jud. ' + n(D.judet) : '') + (D.nrcad ? ', nr. cad. ' + n(D.nrcad) : '') + '. Beneficiar: ' + n(D.beneficiar) + '. Proiectant: ' + n(D.proiectant) + '.' + (D.nrCU ? ' Certificat de Urbanism nr. ' + n(D.nrCU) + '.' : '') + '</p>' });
    secs.push({ h: '2. Descrierea investiției', html: '<p>Se propune realizarea unui obiectiv cu funcțiunea „' + esc(fnLabel(D)) + '", regim de înălțime ' + regim(D) + ', suprafață construită ' + n(D.Sc) + ' mp și desfășurată ' + n(D.Sd) + ' mp. Soluția respectă reglementările urbanistice, normativele tehnice specifice destinației și cerințele fundamentale de calitate.</p>' + (spatiiTbl(D) ? '<p>Programul funcțional (din modelul confirmat):</p>' + spatiiTbl(D) : '') });
    secs.push({ h: '3. Indicatori urbanistici', html: tbl([['Suprafață teren', n(D.Steren) + ' mp'], ['POT propus / max', n(ac.POT) + '% / ' + n(D.POT_max) + '%'], ['CUT propus / max', n(ac.CUT) + ' / ' + n(D.CUT_max)], ['Regim înălțime', regim(D)], ['Parcaje propuse / necesare', n(D.parcaje_propuse) + ' / ' + n(ac.parcaje_necesare)], ['Spații verzi min.', n(ac.sv_min_pct) + '% (' + n(ac.sv_min_mp) + ' mp)']], ['Indicator', 'Valoare']) });
    secs.push({ h: '4. Date seismice și climatice', html: '<p>Amplasament (' + n(D.judet) + '): a<sub>g</sub> = ' + n(ac.seismic && ac.seismic.ag) + 'g, T<sub>c</sub> = ' + n(ac.seismic && ac.seismic.Tc) + ' s (P100-1/2013); zăpadă s<sub>k</sub> = ' + n(ac.clima && ac.clima.sk) + ' kN/m² (CR 1-1-3); temperatura exterioară de calcul ' + n(ac.clima && ac.clima.Te) + ' °C.</p>' });
    secs.push({ h: '5. Cerințele fundamentale (Legea 10/1995)', html: tbl([['A — Rezistență și stabilitate', 'memoriu rezistență + verificator cerința A'], ['B — Siguranță și accesibilitate în exploatare', 'circulații, PMR (NP 051), balustrade, pardoseli antiderapante'], ['C — Securitate la incendiu', 'scenariu P118 + aviz ISU'], ['D — Igienă, sănătate, mediu', 'ventilare, apă/canalizare, gestiune deșeuri, aviz DSP/APM'], ['E — Economie de energie', 'anvelopă C 107, nZEB, certificat energetic'], ['F — Protecție la zgomot', 'izolări acustice C 125']], ['Cerință', 'Mod de tratare']) });
    secs.push({ h: '6. Avize și acorduri', html: '<p>Se solicită avizele înscrise în Certificatul de Urbanism (uzual: ISU, DSP, APM, operatori utilități — energie/gaze/apă-canal, salubritate; după caz protecție civilă, ANIF, Apele Române). Devizul general se întocmește conform HG 907/2016.</p>' });
    secs.push({ h: '7. Concluzii', html: '<p>Investiția este fezabilă tehnic și se încadrează în reglementările în vigoare. Documentația se completează cu memoriile pe specialități, scenariul de securitate la incendiu, devizul general și piesele desenate.</p>' });
    return secs;
  }

  G.UXParagrafe = { arhitectura: arhitectura, rezistenta: rezistenta, instalatii: instalatii, general: general };
  console.log('[UXParagrafe] paragrafe tehnice parametrizate încărcate (generice pt orice funcțiune)');
})(window);
