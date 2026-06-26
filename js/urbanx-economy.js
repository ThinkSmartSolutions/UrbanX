// ═══════════════════════════════════════════════════════════════════════════
// urbanx-economy.js — ANALIZA ECONOMICĂ A UAT (micro + macro)
// Buget local: structura veniturilor (venituri proprii · cote IPV · sume TVA ·
// subvenții · fonduri UE), dependența de bugetul de stat, cheltuieli funcționare
// vs. dezvoltare, capacitate de investiție. Model transparent calibrat pe structura
// finanțelor publice locale RO (Legea 273/2006), din date _RO_CITIES_DB + repere MFP/INS.
// Standard UrbanX: studiu PDF ≥10 pag + secțiune IVU + surse + disclaimer.
// window._Economy.compute(cityKey) · .openPanel() · .generatePDF(cityKey) · .renderChapter(D,e,name)
// 26 iunie 2026 · ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  function N(v, d) { try { return Number(v).toLocaleString('ro-RO', { maximumFractionDigits: d == null ? 0 : d }); } catch (e) { return '' + v; } }
  function cl(v, lo, hi) { return Math.max(lo == null ? 0 : lo, Math.min(hi == null ? 100 : hi, v)); }

  // model transparent al bugetului local (orientativ, calibrat pe structura RO)
  function compute(cityKey) {
    var db = G._RO_CITIES_DB || {}; var c = db[cityKey] || (G.TCI && G.TCI.cityData) || {};
    var pop = c.pop2021 || c.pop || 50000;
    var pib = c.pib_eur_cap || 9000;            // PIB/cap (€)
    var hub = c.coef_hub || 0.7;
    var tier = pop >= 250000 ? 1 : pop >= 100000 ? 0.8 : pop >= 40000 ? 0.6 : 0.42;
    var salariuNet = Math.round((c.salariu_net_2023 || (1800 + pib * 0.12)));  // lei/lună orientativ
    // buget total/locuitor (lei/an) — scalează cu dezvoltarea economică
    var bugCap = Math.round(2200 + pib * 0.22 + hub * 600);
    var bugTotal = Math.round(bugCap * pop);     // lei/an
    // structura veniturilor (procente) — orașele dezvoltate au pondere mai mare de venituri proprii + cote IPV
    var pVenituriProprii = cl(14 + tier * 16 + hub * 8);        // impozite/taxe locale
    var pCoteIPV = cl(20 + tier * 18 + (pib > 10000 ? 6 : 0));  // cote defalcate din impozitul pe venit
    var pSumeTVA = cl(34 - tier * 20 - hub * 6, 4);             // sume defalcate din TVA (echilibrare) — mai mari la UAT sărace
    var pSubventii = cl(12 - tier * 4, 2);                       // subvenții de la stat
    var pFonduriUE = cl(100 - pVenituriProprii - pCoteIPV - pSumeTVA - pSubventii, 2);
    // normalizare la 100
    var sum = pVenituriProprii + pCoteIPV + pSumeTVA + pSubventii + pFonduriUE;
    var k = 100 / sum;
    var P = {
      proprii: Math.round(pVenituriProprii * k), cote: Math.round(pCoteIPV * k),
      tva: Math.round(pSumeTVA * k), subv: Math.round(pSubventii * k), ue: Math.round(pFonduriUE * k)
    };
    // dependența de bugetul de stat = sume TVA + subvenții (transferuri necondiționate de la centru)
    var dependenta = P.tva + P.subv;
    // autonomie fiscală = venituri proprii + cote IPV (generate local)
    var autonomie = P.proprii + P.cote;
    // cheltuieli: funcționare vs dezvoltare
    var pDezvoltare = cl(12 + tier * 18 + (P.ue) * 0.4);
    var pFunctionare = 100 - pDezvoltare;
    // venituri proprii detaliate (€)
    var venProprii_eur = Math.round(bugTotal * P.proprii / 100 / 5);  // lei→€ ~5
    var det = {
      cladiri: Math.round(venProprii_eur * 0.34), teren: Math.round(venProprii_eur * 0.16),
      auto: Math.round(venProprii_eur * 0.22), taxe: Math.round(venProprii_eur * 0.18), alte: Math.round(venProprii_eur * 0.10)
    };
    // județ (estimare la nivel de județ — orientativ): buget județean ~ pondere din total UAT-uri
    var bugJudetCap = Math.round(bugCap * 0.45);
    return {
      city: c, name: c.name || 'UAT', pop: pop, pib: pib, hub: hub, tier: tier, salariuNet: salariuNet,
      bugCap: bugCap, bugTotal: bugTotal, bugTotalEur: Math.round(bugTotal / 5),
      P: P, dependenta: dependenta, autonomie: autonomie,
      pFunctionare: pFunctionare, pDezvoltare: pDezvoltare,
      detVenProprii: det, bugJudetCap: bugJudetCap,
      gradAutonomie: autonomie >= 60 ? 'ridicată' : autonomie >= 45 ? 'medie' : 'redusă'
    };
  }

  function renderChapter(D, e, name) {
    if (!D || !e) return;
    D.chapter('Profil economic și financiar al UAT');
    D.P('Analiza economică a ' + (name || 'UAT') + ' îmbină perspectiva micro (profilul economic local: PIB/cap ' + N(e.pib) + ' €, salariu net ~' + N(e.salariuNet) + ' lei/lună) cu cea macro (structura bugetului local și dependența de bugetul de stat). Bugetul local total este estimat la ' + N(e.bugTotalEur) + ' € (' + N(e.bugCap) + ' lei/locuitor/an), iar gradul de autonomie fiscală este ' + e.gradAutonomie + ' (' + N(e.autonomie) + '% venituri generate local).');
    if (D.kpis) D.kpis([
      { val: N(e.bugCap) + ' lei', label: 'Buget local/locuitor', sub: 'pe an (orientativ)' },
      { val: N(e.autonomie) + '%', label: 'Autonomie fiscală', sub: 'venituri proprii + cote IPV' },
      { val: N(e.dependenta) + '%', label: 'Dependență buget stat', sub: 'sume TVA + subvenții' },
      { val: N(e.P.ue) + '%', label: 'Fonduri UE', sub: 'pondere în venituri' }
    ]);
    if (D.barChart) D.barChart([
      ['Venituri proprii', e.P.proprii, [34, 197, 94]],
      ['Cote IPV', e.P.cote, [132, 204, 22]],
      ['Sume TVA', e.P.tva, [245, 158, 11]],
      ['Subvenții', e.P.subv, [239, 68, 68]],
      ['Fonduri UE', e.P.ue, [59, 130, 246]]
    ], { title: 'Structura veniturilor bugetului local (%)', h: 48, max: Math.max(e.P.proprii, e.P.cote, e.P.tva) + 8, source: 'Model UrbanX · structura Legea 273/2006' });
    D.P('Dependența de bugetul de stat (' + N(e.dependenta) + '%) reprezintă ponderea transferurilor necondiționate de la centru (sume defalcate din TVA pentru echilibrare + subvenții). O dependență ridicată indică o capacitate fiscală proprie limitată și o vulnerabilitate la deciziile de la nivel central; reducerea ei se obține prin creșterea bazei de impozitare locale (dezvoltare economică, valorificarea fondului imobiliar, captarea plusvalorii urbanistice).');
    if (D.sourceBadges) D.sourceBadges(['MFP — execuții bugetare', 'Legea 273/2006', 'INS', 'Eurostat']);
  }

  function generatePDF(cityKey) {
    var J = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF;
    if (!J || typeof G._makeStratDoc !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    var e = compute(cityKey);
    G.ss && G.ss('💰 Generez analiza economică a UAT…');
    var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    var D = G._makeStratDoc(pdf, { docTitle: 'ANALIZĂ ECONOMICĂ A UAT', cityName: e.name, accent: [13, 148, 136] });
    var W = 210, CW = D.dims.CW, FONT = 'DejaVuRO';
    D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
    pdf.setFillColor(6, 26, 24); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(13, 148, 136); pdf.rect(0, 60, W, 1.4, 'F');
    try { if (G._drawUrbanxLogo) { G._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (ex) {}
    pdf.setTextColor(94, 234, 212); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · ECONOMIE URBANĂ & FINANȚE LOCALE', W / 2, 44, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(22); pdf.text('ANALIZĂ ECONOMICĂ A UAT', W / 2, 88, { align: 'center' });
    pdf.setTextColor(94, 234, 212); pdf.setFontSize(13); pdf.text(D.S2(e.name), W / 2, 102, { align: 'center' });
    pdf.setTextColor(150, 200, 190); pdf.setFontSize(11); pdf.text('Autonomie fiscală ' + N(e.autonomie) + '% · dependență buget stat ' + N(e.dependenta) + '%', W / 2, 114, { align: 'center' });
    D.setSuppress && D.setSuppress(false);

    D.chapter('Rezumat executiv');
    D.P('Prezentul studiu analizează situația economică și financiară a ' + e.name + ', îmbinând analiza microeconomică (profilul economiei locale) cu cea macroeconomică (structura bugetului local, relația cu bugetul județean și cu bugetul de stat). Bugetul local total este estimat la ' + N(e.bugTotalEur) + ' € pe an, cu o autonomie fiscală ' + e.gradAutonomie + ' (' + N(e.autonomie) + '% venituri generate local) și o dependență de transferurile de la stat de ' + N(e.dependenta) + '%.');
    D.callout && D.callout('Concluzie', 'Gradul de autonomie fiscală (' + N(e.autonomie) + '%) determină capacitatea reală a administrației de a-și finanța prioritățile. Consolidarea bazei fiscale locale — prin dezvoltare economică, valorificarea fondului imobiliar și captarea plusvalorii — este pârghia centrală de reducere a dependenței de centru.');

    D.chapter('Metodologie și surse');
    D.P('Analiza folosește structura finanțelor publice locale din România reglementată de Legea 273/2006 privind finanțele publice locale. Veniturile bugetelor locale se compun din: (1) venituri proprii (impozite și taxe locale — clădiri, teren, mijloace de transport, taxe); (2) cote defalcate din impozitul pe venit (IPV) — principala sursă pentru municipii; (3) sume defalcate din TVA (pentru echilibrarea bugetelor și destinații speciale); (4) subvenții de la bugetul de stat; (5) fonduri europene și alte surse. Datele exacte provin din execuțiile bugetare publicate de Ministerul Finanțelor (MFP).');
    D.P('Valorile din acest studiu sunt estimări orientative, calibrate pe structura tipică a UAT-urilor românești în funcție de mărime și nivel de dezvoltare economică (PIB/cap, polarizare). Pentru cifre oficiale exacte se consultă execuția bugetară a UAT publicată de MFP și bugetul local aprobat de consiliul local/județean.');

    renderChapter(D, e, e.name);

    D.chapter('Structura detaliată a veniturilor proprii');
    if (D.table) D.table(['Sursă venit propriu', 'Estimare (€/an)', 'Pondere'], [
      ['Impozit pe clădiri', N(e.detVenProprii.cladiri) + ' €', '34%'],
      ['Impozit pe teren', N(e.detVenProprii.teren) + ' €', '16%'],
      ['Impozit mijloace de transport', N(e.detVenProprii.auto) + ' €', '22%'],
      ['Taxe și tarife locale', N(e.detVenProprii.taxe) + ' €', '18%'],
      ['Alte venituri proprii', N(e.detVenProprii.alte) + ' €', '10%']
    ], [CW * 0.45, CW * 0.3, CW * 0.25]);
    D.P('Veniturile proprii sunt cele asupra cărora administrația locală are cel mai mare control (cote, scutiri, eficiența colectării). Impozitul pe clădiri și teren — legat direct de valoarea și utilizarea fondului imobiliar — este componenta cu cel mai mare potențial de creștere prin actualizarea valorilor impozabile și prin densificarea/valorificarea terenurilor subutilizate (vezi studiile Hartă valori și Reconversie HBU).');

    D.chapter('Dependența de bugetul de stat și bugetul județean');
    D.P('Dependența de bugetul de stat (' + N(e.dependenta) + '%) măsoară cât din veniturile UAT provin din transferuri necondiționate de la centru. Acest indicator are implicații strategice: un UAT cu dependență ridicată are o marjă de manevră bugetară redusă și o expunere mare la deciziile de politică fiscală națională, în timp ce un UAT cu autonomie ridicată își poate finanța prioritățile și poate co-finanța proiecte europene cu mai multă predictibilitate.');
    D.P('La nivel județean, bugetul consiliului județean (estimat la ~' + N(e.bugJudetCap) + ' lei/locuitor/an) finanțează infrastructura de interes județean (drumuri județene, spitale, servicii sociale, cultură) și redistribuie sume către UAT-urile componente prin mecanismul de echilibrare. Relația UAT–județ–stat formează un sistem de vase comunicante în care echilibrarea urmărește reducerea disparităților teritoriale, dar poate diminua stimulentul pentru dezvoltarea bazei proprii.');

    D.chapter('Cheltuieli: funcționare vs. dezvoltare');
    if (D.barChart) D.barChart([
      ['Funcționare', e.pFunctionare, [148, 163, 184]],
      ['Dezvoltare / investiții', e.pDezvoltare, [34, 197, 94]]
    ], { title: 'Structura cheltuielilor bugetare (%)', h: 40, max: 100, source: 'Model UrbanX' });
    D.P('Raportul dintre cheltuielile de funcționare (salarii, utilități, întreținere) și cele de dezvoltare (investiții) reflectă capacitatea UAT de a-și transforma resursele în infrastructură și servicii noi. O pondere de dezvoltare de ' + N(e.pDezvoltare) + '% indică ' + (e.pDezvoltare >= 30 ? 'o capacitate investițională solidă' : e.pDezvoltare >= 20 ? 'o capacitate investițională moderată' : 'o marjă investițională limitată, dominată de cheltuielile de funcționare') + '. Fondurile europene amplifică semnificativ componenta de dezvoltare, motiv pentru care capacitatea de absorbție este critică.');

    D.chapter('Capacitatea de investiții și absorbția fondurilor UE');
    D.P('Fondurile europene (estimate la ' + N(e.P.ue) + '% din venituri) sunt principalul motor al investițiilor publice locale în România. Capacitatea de a le accesa și cheltui depinde de: capacitatea administrativă (pregătirea proiectelor), co-finanțarea disponibilă (legată de autonomia fiscală), maturitatea documentelor strategice (SIDU, PMUD — condiție de eligibilitate POR) și calitatea portofoliului de proiecte. Un UAT cu autonomie fiscală ridicată și documente strategice actualizate are un avantaj structural în atragerea fondurilor.');
    D.P('Recomandare: prioritizarea proiectelor cu raport beneficiu-cost ridicat (vezi studiul de fezabilitate) și corelarea portofoliului de investiții cu obiectivele SIDU asigură atât eligibilitatea, cât și impactul maxim al resurselor limitate.');

    D.chapter('Context macroeconomic și convergență');
    D.P('La nivel macro, PIB/cap de ' + N(e.pib) + ' € plasează ' + e.name + ' pe o anumită poziție în procesul de convergență cu media europeană. Veniturile locale sunt corelate cu dinamismul economic (firme active, ocupare, salarii), astfel încât dezvoltarea economică și creșterea bazei fiscale se susțin reciproc. Politica de atragere a investițiilor (parcuri industriale, facilități, infrastructură) și calitatea vieții (care reține și atrage forță de muncă calificată) sunt determinanți pe termen lung ai sănătății bugetare.');

    D.chapter('Sustenabilitate fiscală și îndatorare');
    D.P('Sustenabilitatea fiscală presupune un echilibru pe termen lung între venituri și cheltuieli, un grad de îndatorare în limitele legale (Legea 273/2006 plafonează serviciul datoriei la 30% din veniturile proprii medii) și absența arieratelor. Îndatorarea poate fi un instrument sănătos pentru finanțarea investițiilor cu randament ridicat, atât timp cât serviciul datoriei rămâne acoperit confortabil de veniturile proprii. Monitorizarea gradului de îndatorare și a arieratelor este esențială pentru menținerea capacității de co-finanțare europeană.');

    D.chapter('Benchmark și recomandări de consolidare fiscală');
    D.bullets([
      'Creșterea veniturilor proprii: actualizarea valorilor impozabile, eficientizarea colectării, reducerea evaziunii;',
      'Valorificarea fondului imobiliar: densificare, reconversia terenurilor subutilizate (HBU), captarea plusvalorii (LVC);',
      'Dezvoltare economică: atragerea de investiții care lărgesc baza de impozitare și cotele IPV;',
      'Maturizarea documentelor strategice (SIDU/PMUD) pentru eligibilitate și absorbție UE;',
      'Disciplina cheltuielilor de funcționare pentru a elibera spațiu fiscal de dezvoltare.'
    ]);
    D.P('Aceste măsuri reduc dependența de bugetul de stat și cresc autonomia — obiectivul strategic central al sănătății financiare a oricărui UAT. Ele se corelează direct cu celelalte module ale platformei (valoare imobiliară, reconversie, LVC, fezabilitate).');

    D.chapter('Mecanismul de echilibrare și redistribuire');
    D.P('Sistemul de finanțe publice locale din România include un mecanism de echilibrare prin care sume defalcate din TVA și cote din impozitul pe venit sunt redistribuite către UAT-uri în funcție de capacitatea fiscală și de nevoile lor. Scopul este reducerea disparităților teritoriale: UAT-urile cu venituri proprii reduse primesc transferuri mai mari. Acest mecanism este esențial pentru coeziune, dar are un efect secundar — poate diminua stimulentul pentru dezvoltarea bazei fiscale proprii, întrucât o parte din creșterea veniturilor locale este compensată prin reducerea sumelor de echilibrare.');
    D.P('Pentru ' + e.name + ', cu o dependență de ' + N(e.dependenta) + '%, înțelegerea acestui mecanism este strategică: politicile de creștere a veniturilor proprii trebuie corelate cu regulile de echilibrare pentru a maximiza câștigul net. Predictibilitatea transferurilor de la centru (stabilite anual prin legea bugetului de stat) este un factor de risc pe care administrația locală trebuie să îl gestioneze în planificarea multianuală.');

    D.chapter('Riscuri fiscale și scenarii');
    D.bullets([
      'Risc de transfer: reducerea sumelor de echilibrare prin decizii la nivel central — afectează direct UAT-urile dependente;',
      'Risc de venituri proprii: subevaluarea fondului impozabil și colectarea deficitară erodează autonomia;',
      'Risc de cheltuieli: creșterea cheltuielilor de funcționare (salarii, utilități) reduce spațiul de dezvoltare;',
      'Risc de absorbție: incapacitatea de a cheltui fondurile UE alocate (co-finanțare insuficientă, proiecte nepregătite);',
      'Risc macroeconomic: recesiunea reduce cotele IPV (legate de ocupare și salarii) și veniturile proprii.'
    ]);
    D.P('Într-un scenariu prudent, administrația își consolidează veniturile proprii și menține o rezervă, reducând expunerea la deciziile de la centru. Într-un scenariu de creștere, dezvoltarea economică și valorificarea fondului imobiliar lărgesc baza fiscală, crescând autonomia. Planificarea bugetară multianuală cu scenarii alternative este instrumentul de gestionare a acestor riscuri.');

    D.chapter('Transparență bugetară și buget participativ');
    D.P('Transparența finanțelor publice locale este atât o obligație legală (publicarea bugetului, a execuției și a achizițiilor), cât și un instrument de încredere civică și de bună guvernanță. Portalurile de date deschise (open budget) și platformele de buget participativ — prin care cetățenii propun și votează proiecte finanțate dintr-o cotă a bugetului de investiții — cresc legitimitatea deciziilor și implicarea comunității. Această dimensiune se corelează cu modulul de participare publică al platformei și cu axa de satisfacție a cetățenilor.');
    D.P('Pentru ' + e.name + ', integrarea datelor bugetare reale (din execuțiile MFP) într-un tablou de bord public ar permite monitorizarea în timp a indicatorilor de autonomie și dependență prezentați în acest studiu, transformând analiza dintr-un instantaneu într-un proces continuu de raportare și ajustare.');

    D.chapter('Indicatori de monitorizare a sănătății financiare');
    if (D.table) D.table(['Indicator', 'Prag / țintă sănătoasă'], [
      ['Grad de autonomie fiscală', '> 50% (venituri proprii + cote IPV)'],
      ['Dependență de transferuri', 'în scădere de la an la an'],
      ['Pondere cheltuieli de dezvoltare', '> 25% din total'],
      ['Grad de îndatorare (serviciul datoriei)', '< 30% din veniturile proprii (L.273/2006)'],
      ['Arierate', '0 (fără plăți restante)'],
      ['Rata de absorbție fonduri UE', '> 70% din alocare']
    ], [CW * 0.55, CW * 0.45]);
    D.P('Acești indicatori, urmăriți anual, oferă un tablou de bord al sănătății financiare a UAT și se corelează cu dimensiunea economică a Notei UrbanX (IVU). O administrație care își îmbunătățește acești indicatori demonstrează o guvernanță fiscală solidă — un criteriu tot mai important pentru finanțatori și pentru încrederea investitorilor.');

    // Nota UrbanX (IVU)
    try { if (G.UrbanXIVU && G.UrbanXIVU.renderSection) G.UrbanXIVU.renderSection(D, cityKey); } catch (ex) {}

    D.chapter('Limitări și disclaimer');
    D.P('Studiu generat algoritmic (UrbanX) ca PRE-ANALIZĂ economică. Valorile bugetare sunt estimări orientative, calibrate pe structura tipică a finanțelor publice locale RO; ele NU reprezintă execuția bugetară reală a UAT. Pentru cifre oficiale se consultă bugetul local/județean aprobat și execuțiile bugetare publicate de Ministerul Finanțelor. Documentul nu substituie analiza unui expert în finanțe publice.');

    D.chapter('Surse și standarde');
    D.P('Legea 273/2006 privind finanțele publice locale; Ministerul Finanțelor (execuții bugetare, transferuri); INS (PIB regional, ocupare, salarii); Eurostat (convergență, PIB/cap NUTS). Metodologie UrbanX · ThinkSmart Solutions.');

    var fn = ('Analiza_economica_' + e.name.replace(/[^\w]+/g, '_') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
    G._buildStratTOC && G._buildStratTOC(D, 1);
    pdf.save(fn); G.ss && ss('✅ Analiză economică generată: ' + pdf.getNumberOfPages() + ' pagini'); return fn;
  }

  function openPanel(cityKey) {
    var e = compute(cityKey);
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9300;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
    ov.onclick = function (ev) { if (ev.target === ov) ov.remove(); };
    var seg = [['Venituri proprii', e.P.proprii, '#22c55e'], ['Cote IPV', e.P.cote, '#84cc16'], ['Sume TVA', e.P.tva, '#f59e0b'], ['Subvenții', e.P.subv, '#ef4444'], ['Fonduri UE', e.P.ue, '#3b82f6']];
    var bars = seg.map(function (s) { return '<div style="display:flex;align-items:center;gap:8px;margin:4px 0"><div style="width:120px;font-size:11px;color:#cbd5e1">' + s[0] + '</div><div style="flex:1;height:10px;background:#0a1120;border-radius:5px;overflow:hidden"><div style="height:100%;width:' + s[1] + '%;background:' + s[2] + '"></div></div><div style="width:34px;text-align:right;font-size:11px;font-weight:700;color:' + s[2] + '">' + s[1] + '%</div></div>'; }).join('');
    var kpi = function (v, l, col) { return '<div style="flex:1;min-width:100px;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:9px;text-align:center"><div style="font-size:15px;font-weight:800;color:' + col + '">' + v + '</div><div style="font-size:9px;color:#94a3b8">' + l + '</div></div>'; };
    ov.innerHTML = '<div style="background:#0b1424;color:#e6edf7;width:min(620px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(13,148,136,.5);border-radius:14px;font-family:system-ui,sans-serif;padding:18px 20px">' +
      '<div style="font-weight:800;font-size:16px">💰 Analiză economică — ' + e.name + '</div>' +
      '<div style="font-size:11px;color:#94a3b8;margin:2px 0 12px">Buget local ~' + N(e.bugTotalEur) + ' € · ' + N(e.bugCap) + ' lei/loc/an · model orientativ (structura L.273/2006)</div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">' + kpi(N(e.autonomie) + '%', 'Autonomie fiscală', '#34d399') + kpi(N(e.dependenta) + '%', 'Dependență buget stat', '#f59e0b') + kpi(N(e.pDezvoltare) + '%', 'Cheltuieli dezvoltare', '#60a5fa') + '</div>' +
      '<div style="font-size:11px;color:#94a3b8;margin-bottom:4px">Structura veniturilor bugetului local</div>' + bars +
      '<div style="display:flex;gap:8px;margin-top:12px"><button onclick="window._Economy.generatePDF(window.TCI&&window.TCI.cityKey)" style="flex:1;background:linear-gradient(180deg,#0d9488,#0f766e);color:#fff;border:0;border-radius:9px;padding:10px;font-weight:700;cursor:pointer">📄 Analiză economică (PDF ≥10 pag)</button>' +
      '<button onclick="this.closest(\'div[style*=fixed]\').remove()" style="background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:9px;padding:10px 14px;cursor:pointer">Închide</button></div>' +
      '<div style="font-size:9px;color:#64748b;margin-top:10px">Estimări orientative — pentru cifre oficiale: execuția bugetară MFP + bugetul local aprobat.</div></div>';
    document.body.appendChild(ov);
  }

  G._Economy = { compute: compute, renderChapter: renderChapter, generatePDF: generatePDF, openPanel: openPanel };
  console.log('[Economy] ✅ Analiză economică UAT (buget local + dependență stat) încărcat');
})(window);
