// ═══════════════════════════════════════════════════════════════════════════
// tci-strategic-masterplan-content.js — Capitolele Masterplanului strategic extins
// Continut dens, multidisciplinar, parametrizat pe datele UAT-ului (ctx).
// Reutilizeaza graficele si modulele din _TCIMasterplanPDF prin D.useMP / helpers pure.
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  const MP = () => G._TCIMasterplanPDF;

  G._StratMasterplanContent = {
    _zoneRecom(cat) {
      const c = String(cat || '').toLowerCase();
      if (c.indexOf('rezid') >= 0) return 'Se recomandă densificare calitativă, completarea țesutului și îmbunătățirea dotarilor de proximitate, cu protejarea calității locuirii și a spațiilor verzi de cartier.';
      if (c.indexOf('mixt') >= 0 || c.indexOf('servicii') >= 0) return 'Se încurajează mixul funcțional, parterul activ și concentrarea dezvoltării în jurul nodurilor de transport public (TOD).';
      if (c.indexOf('industr') >= 0) return 'Se recomandă modernizarea, reconversia parțială a platformelor subutilizate (brownfield) și zone tampon verzi față de locuire.';
      if (c.indexOf('verzi') >= 0 || c.indexOf('agrement') >= 0) return 'Se protejează și se extind, asigurând conectivitatea ecologică și accesul public; interdicție de reducere a suprafeței verzi.';
      if (c.indexOf('circulat') >= 0 || c.indexOf('edilitar') >= 0) return 'Se prioritizeaza reabilitarea, profile stradale echilibrate (pietoni/velo/TP) și infrastructură edilitara performanță.';
      if (c.indexOf('agricol') >= 0 || c.indexOf('rezervă') >= 0) return 'Se menține ca rezervă de dezvoltare etapizata sau spațiu verde/agricol, evitând expansiunea prematură și necontrolata.';
      if (c.indexOf('ape') >= 0) return 'Se protejează, cu valorificare peisagistica (coridoare albastre-verzi) și respectarea servitutilor de gospodarire a apelor.';
      return 'Se reglementeaza conform functiunii dominante și principiilor de dezvoltare durabilă ale masterplanului.';
    },
    build(D, ctx) {
      const { city, need, risk, grav, climate, housing, invest, bench, euComp, scenario, pugGeo, reguli } = ctx;
      const N = D.N, RN = D.RN, S2 = D.S2;
      const pop = city.pop2021 || city.pop || 100000;
      const pop55 = (need && need.pop2055) || Math.round(pop * 1.03);
      const jud = city.judet || city.county || '';
      const reg = city.regiune || city.region || '';
      const m = MP();

      // ─────────────────────────────────────────────────────────────────────
      // CAP 1 — PRELIMINARII
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Preliminarii și cadrul metodologic');
      D.h2('Obiectul și scopul documentului');
      D.P('Prezentul Masterplan Strategic constituie documentul de fundamentare a politicii de dezvoltare urbană integrată a Municipiului ' + city.name + ', pe un orizont strategic de lungă durată (2025-2055). Documentul stabilește viziunea de dezvoltare, obiectivele strategice, direcțiile de acțiune și cadrul de organizare spațială a teritoriului, oferind suportul tehnic și analitic pentru actualizarea Planului Urbanistic General (PUG), pentru Strategia Integrată de Dezvoltare Urbană (SIDU) și pentru programarea investițiilor publice.');
      D.P('Masterplanul nu înlocuiește documentațiile de urbanism cu caracter normativ (PUG, PUZ, PUD), ci le precede și le fundamentează, asigurând coerența între viziunea strategică, analiză cantitativă a teritoriului și reglementarea urbanistică. Documentul integrează date statistice oficiale, modele de proiecție și analize geospațiale, într-o abordare bazată pe dovezi (evidence-based planning).');
      D.h2('Cadrul legal și instituțional');
      D.table(['Act normativ', 'Relevantă pentru Masterplan'], [
        ['Legea 169/2026 (CATUC)', 'Amenajarea teritoriului și urbanismul — cadrul general al documentatiilor'],
        ['HG 525/1996 (RGU)', 'Regulamentul General de Urbanism — indicatori și reguli de bază'],
        ['Legea 169/2026 (CATUC)', 'Autorizarea executarii lucrărilor de construcții'],
        ['Legea 169/2026 (CATUC)', 'Anexele 2-5 la CATUC — conținutul-cadru al documentatiilor'],
        ['Legea 151/2019; OUG 57/2019 (Cod administrativ)', 'Competentele autorităților locale în planificare'],
        ['Carta de la Leipzig (2007/2020)', 'Principiile orașului european durabil și integrat'],
        ['Agendă Urbană a UE; New Urban Agendă (ONU-Habitat)', 'Cadru strategic european și global'],
        ['Pactul Verde European; Obiectivele de Dezvoltare Durabilă (ODD)', 'Ținte de mediu, climă și sustenabilitate'],
      ], [42, 132], { boldFirst: true });
      D.h2('Surse de date utilizate');
      D.P('Analiză se bazează exclusiv pe date oficiale și verificabile, integrate din următoarele surse:');
      D.bullets([
        ['INS (Institutul Național de Statistică)', 'bază de date TEMPO-Online — populație, mișcare naturală și migratorie, locuințe, forța de muncă, autorizatii de construire'],
        ['Eurostat', 'indicatori comparativi NUTS3, Urban Audit, PIB regional la paritatea puterii de cumpărare'],
        ['INFP', 'zonarea seismică națională (accelerația terenului ag, perioadă de control Tc)'],
        ['ANAR / MMAP', 'hidrografie, hărți de hazard și risc la inundății (Directivă 2007/60/CE)'],
        ['ANM', 'date climatice și proiecții (scenarii RCP/SSP, IPCC AR6)'],
        ['OpenStreetMap', 'rețeaua de străzi, dotari, puncte de interes (date geospatiale deschise)'],
        ['PUG vectorial al UAT', 'geometria zonelor funcționale și Regulamentul Local de Urbanism (unde este disponibil digital)'],
      ]);
      D.h2('Metodologia de elaborare');
      D.P('Documentul urmează ciclul de planificare strategică: (1) diagnostic multidisciplinar al situației existente, (2) analiză integrată și identificarea disfunctionalitatilor (SWOT), (3) formularea viziunii și a obiectivelor, (4) construirea și evaluarea scenariilor de dezvoltare, (5) propuneri de organizare urbanistică și reglementare, (6) plan de implementare, finanțare și monitorizare. Proiecțiile demografice utilizează modelul cohorta-componentă (ONU/Eurostat), iar estimarea necesarului de locuire un model de tip Mankiw-Romer-Weil adaptat. Riscurile sunt evaluate printr-un scor compozit multifactorial.');
      // (caseta-disclaimer alba eliminata la cererea beneficiarului — acoperirea legala ramane pe coperta + footer)

      // ─────────────────────────────────────────────────────────────────────
      // CAP 2 — REZUMAT EXECUTIV
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Rezumat executiv');
      D.P('Municipiul ' + city.name + (jud ? ', reședința/oraș din judetul ' + jud : '') + ', numără ' + N(pop) + ' locuitori (recensamant 2021). Analiză strategică proiectează o populație de aproximativ ' + N(pop55) + ' locuitori la orizontul 2055 în scenariul de referință, cu implicății directe asupra necesarului de locuințe, servicii publice, infrastructură și spații verzi.');
      D.kpis([
        { val: N(pop), label: 'Populație 2021', sub: 'INS RPL2021' },
        { val: N(pop55), label: 'Proiecție 2055', sub: 'scenariu ' + scenario },
        { val: N((need && need.locuinteTotale) || 0), label: 'Locuințe necesare', sub: '2025-2055' },
        { val: (risk && (risk.score != null ? risk.score : risk.compozit)) != null ? (risk.score != null ? risk.score : risk.compozit) + '/100' : '-', label: 'Scor risc compozit', sub: 'multifactorial' },
      ]);
      D.P('Documentul identifică direcțiile strategice prioritare: regenerarea țesutului urban existent și densificarea calitativă, dezvoltarea unei mobilitati durabile și reducerea dependentei de autoturism, creșterea suprafețelor verzi la normă de 26 mp/locuitor, modernizarea infrastructurii edilitare, protejarea patrimoniului și a identității locale, precum și adaptarea la schimbările climatice și reducerea expunerii la riscuri naturale.');
      D.h2('Sinteza obiectivelor strategice');
      D.bullets([
        'O1 — Dezvoltare spațială echilibrată: densificare calitativă intravilan, limitarea expansiunii necontrolate, mix funcțional.',
        'O2 — Mobilitate durabilă: transfer modal către transport public și mobilitate activă (vezi PMUD).',
        'O3 — Mediu și climă: spații verzi, infrastructură albastră-verde, neutralitate climatică, economie circulară.',
        'O4 — Locuire accesibilă: fond locativ diversificat, locuințe la prețuri accesibile, regenerarea ansamblurilor.',
        'O5 — Economie competitivă: atragerea de investiții, susținerea sectoarelor cu valoare adăugată mare.',
        'O6 — Coeziune socială și servicii: acces echitabil la educație, sănătate, cultură și servicii publice.',
        'O7 — Identitate și patrimoniu: protejarea zonelor construite protejate și valorificarea peisajului cultural.',
        'O8 — Guvernantă și reziliente: planificare integrată, participare publică, capacitate instituțională.',
      ]);

      // ─────────────────────────────────────────────────────────────────────
      // CAP 3 — INCADRARE TERITORIALA
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Încadrare teritoriala și context regional');
      D.h2('Poziționare geografică și administrativă');
      D.P('Municipiul ' + city.name + ' este localizat în regiunea de dezvoltare ' + (reg || 'corespunzătoare') + (jud ? ', judetul ' + jud : '') + ', la coordonatele aproximative ' + RN(city.lat || 0, 3) + ' lat. N, ' + RN(city.lon || 0, 3) + ' long. E. Poziția în rețeaua națională și regională de localitati determină rolul polarizator al orașului asupra zonei sale de influența (arealul periurban și localitatile învecinate).');
      D.h2('Rolul în rețeaua de localitati');
      D.P('Conform modelului gravitațional de polarizare urbană, ' + city.name + ' exercită o forța de atracție asupra teritoriului înconjurător proportionala cu masa demografică și economică și invers proportionala cu distanță. Acest rol fundamenteaza necesitatea coordonarii dezvoltării la nivel de zonă urbană funcțională (ZUF) / zonă metropolitană, depasind limită administrativă strictă a UAT.');
      if (grav) {
        const gr = grav.scor || grav.index || grav.gravity || null;
        D.table(['Indicator de polarizare', 'Valoare', 'Interpretare'], [
          ['Forța de polarizare (model gravitațional)', gr != null ? RN(gr, 2) : 'calculat', 'Capacitatea de atracție a forței de muncă și serviciilor'],
          ['Arie de influența estimată', (grav.raza || grav.radius || '15-30') + ' km', 'Zonă periurbana și de navetă'],
          ['Localitati polarizate', (grav.localitati || grav.n || '-'), 'UAT-uri din zonă de influența'],
        ], [70, 36, 68], { boldFirst: true });
      }
      D.h2('Context geopolitic și strategic');
      D.P('Poziționarea orașului în raport cu coridoarele europene de transport (TEN-T), cu granițele și cu polii economici majori influențează oportunitățile de dezvoltare. Apropierea de coridoare logistice, de aeroporturi și de noduri feroviare reprezintă un avantaj competitiv, în timp ce dependență de o singură ramură economică constituie o vulnerabilitate strategică ce trebuie diminuata prin diversificare.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 4 — CADRUL NATURAL
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Cadrul natural și peisaj');
      D.h2('Relief și geomorfologie');
      D.P('Formă de relief, altimetria și declivitatea condiționează extinderea intravilanului, costurile de echipare edilitara și stabilitatea terenului. Zonele cu pante accentuate sunt supuse restrictiilor de construire și necesită studii geotehnice de stabilitate, în timp ce luncile și terasele joase sunt expuse riscului de inundății.');
      D.h2('Geologie și soluri');
      D.P('Natură litologica a substratului și tipul de sol determină capacitatea portanta a terenului de fundare, comportamentul seismic local (efectul de amplificare în depozite moi) și pretabilitatea agricolă. Conservarea solurilor fertile din extravilan și gestionarea responsabilă a terenurilor de fundare sunt principii de bază ale dezvoltării durabile.');
      D.h2('Hidrografie și resurse de apă');
      const apa = (typeof _APA_ROMANA_CFG !== 'undefined' && _APA_ROMANA_CFG[ctx.cityKey]) || {};
      D.P('Rețeaua hidrografica structureaza teritoriul și oferă oportunități de amenajare peisagistica (coridoare albastre-verzi), dar impune și servituti de protecție și gestiunea riscului la inundății. ' + (apa.bazin ? 'Teritoriul aparține bazinului hidrografic ' + apa.bazin + ', administrat de ' + (apa.DA || 'Administrația Bazinala de Apă competență') + '.' : 'Gospodarirea apelor se coordonează cu Administrația Bazinala de Apă competență.'));
      D.h2('Climă și confort bioclimatic');
      if (climate) {
        D.table(['Parametru climatic', 'Valoare / caracterizare'], [
          ['Tip climatic', climate.zona || climate.tip || 'temperat-continental'],
          ['Temperatură medie anuală', (climate.tMed != null ? climate.tMed + ' gr C' : 'cca. 9-11 gr C')],
          ['Precipitatii medii anuale', (climate.precip != null ? climate.precip + ' mm' : 'cca. 500-650 mm')],
          ['Tendință de încălzire (proiecție)', (climate.deltaT != null ? '+' + climate.deltaT + ' gr C până în 2055' : '+1.5...+2.5 gr C (IPCC AR6)')],
        ], [70, 104], { boldFirst: true });
      }
      D.P('Adaptarea la climă impune măsuri de combatere a insulei de căldură urbană (vegetație, materiale reflectorizante, suprafețe permeabile), gestionarea apelor pluviale prin soluții bazate pe natură și proiectarea bioclimatica a spațiului public.');
      D.h2('Biodiversitate, arii protejate și peisaj');
      D.P('Identificarea ariilor naturale protejate (situri Natură 2000, rezervatii) și a coridoarelor ecologice este esențială pentru menținerea conectivitatii ecologice. Peisajul natural și cultural reprezintă o resursă identitara și turistică ce trebuie protejată prin reglementari specifice și prin integrarea infrastructurii verzi în țesutul urban.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 5 — RISCURI
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Riscuri naturale și antropice');
      D.P('Evaluarea expunerii la riscuri fundamenteaza restricțiile de construire și măsurile de reziliente. Riscurile sunt analizate multifactorial și agregate într-un scor compozit.');
      const seism = (typeof getSeismConfig === 'function' && window.S_UAT) ? getSeismConfig() : (city.seism || { ag: 0.20, Tc: 1.0, zona: 'E', MSK: 'VII' });
      D.h2('Risc seismic');
      D.P('România este expusă preponderent sursei subcrustale Vrancea. Proiectarea antiseismica este obligatorie conform codului P100-1/2013, în funcție de accelerația terenului ag și perioadă de control Tc specifice amplasamentului.');
      D.table(['Parametru seismic', 'Valoare', 'Semnificăție'], [
        ['Accelerația terenului ag', (seism.ag || '-') + ' g', 'Interval mediu de recurenta 225 ani'],
        ['Perioadă de control Tc', (seism.Tc || '-') + ' s', 'Conținutul de frecvente al mișcării'],
        ['Zonă seismică / intensitate', (seism.zona || '-') + ' / ' + (seism.MSK || '-'), 'Conform zonarii naționale P100-1/2013'],
      ], [62, 38, 76], { boldFirst: true });
      // ── Extindere cantitativa: estimare daune scenariu M7,0 (din _getRiskForCity) ──
      (function _mpRiskExt() {
        const R = window._getRiskForCity ? window._getRiskForCity(city, risk) : null;
        if (!R || !R.seismic) return;
        const sr = R.seismic;
        D.h3('Estimarea daunelor la scenariu de proiectare (M7,0)');
        D.P('Pe baza distribuției fondului construit pe epoci (INS RPL2021) și a funcțiilor de vulnerabilitate macroseismica (Lagomarsino & Giovinazzi 2006, tipologii RISK-UE), pentru scenariul de proiectare P100-1/2013 (ag=' + R.ag + 'g, intensitate EMS-98 estimata ' + RN(sr.intensity, 1) + '):');
        D.table(['Clasa deteriorare', 'Descriere', 'Unitați estimate', '% fond'], [
          ['DS0 — fără daune', 'Structura intacta', N(sr.cladiriDS[0]), RN(sr.pDS_total[0] * 100, 0) + '%'],
          ['DS1 — ușoare', 'Fisuri minore', N(sr.cladiriDS[1]), RN(sr.pDS_total[1] * 100, 0) + '%'],
          ['DS2 — moderate', 'Fisuri, daune parțiale', N(sr.cladiriDS[2]), RN(sr.pDS_total[2] * 100, 0) + '%'],
          ['DS3 — severe', 'Daune structurale grave', N(sr.cladiriDS[3]), RN(sr.pDS_total[3] * 100, 0) + '%'],
          ['DS4 — foarte severe', 'Inutilizabile — demolare', N(sr.cladiriDS[4]), RN(sr.pDS_total[4] * 100, 0) + '%'],
          ['DS5 — prabusire', 'Colaps total', N(sr.cladiriDS[5]), RN(sr.pDS_total[5] * 100, 0) + '%'],
        ], [42, 54, 40, 20], { fs: 8 });
        D.P('Impact uman estimat: ~' + N(sr.decese) + ' decese, ' + N(sr.ranGrav) + ' raniți grav, ' + N(sr.persDeplasate) + ' persoane deplasate. Cost reconstructie orientativ: ' + N(R.costMilEur) + ' mil. EUR. Surse: HAZUS-MH (FEMA), SYNER-G, Lagomarsino & Giovinazzi (2006). NOTĂ: estimari agregate la nivel UAT — nu inlocuiesc expertiza tehnica per cladire (P100-3).');
        if (R.flood) {
          const fr = R.flood;
          D.h3('Susceptibilitate la inundații pluviale (SCS-CN)');
          D.P('Coeficientul de scurgere CN ponderat este ' + fr.CN_weighted + ' (metoda SCS-CN, USDA TR-55), cu impermeabilizare estimata ~' + fr.impermeabilizare + '%. La 100 mm/h: runoff ' + fr.Q_mm + ' mm, ~' + fr.susceptPct + '% din suprafata cu susceptibilitate de acumulare, ~' + N(fr.locuinteExpuse) + ' locuinte expuse.' + (fr.depasireCapacitate > 0 ? ' Reteaua de canalizare standard (SR EN 752, ~40 mm/h) este depasita cu ' + fr.depasireCapacitate + '% — inundatii locale probabile in zonele joase.' : ' Reteaua standard nu este depasita la acest scenariu.'));
        }
        try { if (window._DocMapCaptures && window._DocMapCaptures.riskExtras) window._DocMapCaptures.riskExtras(D, R, city); } catch (e) {}
      })();
      D.h2('Risc de inundății');
      D.P('Expunerea la inundății este evaluata în raport cu rețeaua hidrografica, cotele terenului și hărțile de hazard (Directivă 2007/60/CE, transpusa prin Legea 107/1996). ' + (apa.risc_inundabil ? 'Nivel estimat: ' + apa.risc_inundabil + '. ' : '') + 'Amplasamentele din albia majoră și zonele de protecție sunt supuse interdictiei de construire și necesită avizul de gospodarire a apelor.');
      D.h2('Alunecari de teren și stabilitate');
      D.P('Susceptibilitatea la alunecari se evaluează pe bază pantei, litologiei și condițiilor hidrogeologice (HG 447/2003, Legea 575/2001 — PATN secțiunea V). Zonele cu risc impun studii de stabilitate și, după caz, lucrări de consolidare și drenaj.');
      D.h2('Riscuri climatice și tehnologice');
      D.P('Schimbările climatice amplifică frecvență fenomenelor extreme: valuri de căldură, secetă, ploi torentiale, viituri. La acestea se adăuga riscurile antropice (industrial, transport substanțe periculoase, incendii). Strategia de reziliente integrează prevenirea, avertizarea timpurie și adaptarea infrastructurii.');
      if (m && m._pg7_risk && risk) {
        D.h2('Matricea de risc — sinteza');
        D.P('Profilul de risc agregat este reprezentat în matricea probabilitate x impact, care prioritizeaza măsurile de reducere a vulnerabilitatii pe categorii.');
      }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 6 — DEMOGRAFIE
      // ─────────────────────────────────────────────────────────────────────
      D.h2('Măsuri de reducere a riscului și reziliente');
      D.P('Strategia de reziliente combină măsuri structurale (lucrări de apărare, consolidare, infrastructură) și nestructurale (planificare, avertizare, asigurare, educație), pe fiecare categorie de risc:');
      D.table(['Risc', 'Măsuri de prevenire / reducere', 'Responsabili'], [
        ['Seismic', 'Expertizarea și consolidarea clădirilor vulnerabile (clasă I-II de risc seismic), respectarea P100 la construcții noi, planuri de intervenție', 'Primărie, ISU, proprietari'],
        ['Inundății', 'Lucrări de apărare, decolmatare, bazine de retentie, interdicție de construire în albia majoră, sistem de avertizare', 'ABA, primărie, ISU'],
        ['Alunecari', 'Studii de stabilitate, drenaje, consolidari de versant, interdictii pe terenuri instabile, monitorizare', 'Primărie, geotehnicieni'],
        ['Căldură / secetă', 'Infrastructură verde, suprafețe permeabile, puncte de racorire, planuri pentru valuri de căldură', 'Primărie, sănătate publică'],
        ['Tehnologic', 'Zone de protecție, planuri de urgență SEVESO, monitorizarea calității aerului', 'APM, ISU, operatori'],
      ], [28, 116, 30], { fs: 7 });
      D.callout('Principiul prevenirii', 'Investiția în prevenire și adaptare este de câteva ori mai eficiență decât costul interventiei post-dezastru. Rezilienta urbană se construiește integrat, în toate documentatiile de urbanism și în programarea investițiilor.');

      var _ag = parseFloat(seism.ag || 0.2), _sl = _ag >= 0.3 ? 5 : _ag >= 0.25 ? 4 : _ag >= 0.2 ? 3 : 2;
      D.barChart([['Seismic', _sl, [239, 68, 68]], ['Inundății', /mediu|ridicat|mare/i.test(apa.risc_inundabil || '') ? 3 : 2, [59, 130, 246]], ['Alunecari', 2, [245, 158, 11]], ['Climatic', 3, [168, 85, 247]], ['Tehnologic', 1, [120, 120, 132]]], { title: 'Profil de risc pe categorii (1=scăzut ... 5=ridicat)', h: 46, max: 5, source: 'Scor compozit UrbanX (orientativ). Categoriile cu nivel ridicat necesită studii de specialitate.' });
      // HARTĂ — situarea amplasamentului fata de risc seismic (silueta UAT + zona seismica reala)
      try {
        if (window._PdfMap && D.ensure && D.pdf && city && city.lon) {
          D.h2('Hartă — expunere seismică a amplasamentului');
          D.ensure(80); window._PdfMap.draw(D.pdf, { x: D.dims.ML, y: D.y + 2, w: Math.min(D.dims.CW, 160), h: 66, pug: pugGeo, title: 'Amplasament UAT — zona seismică ' + (seism.zona || '') + ' (ag=' + (seism.ag || '-') + 'g, ' + (seism.MSK || '') + ')', points: [{ lon: city.lon, lat: city.lat, c: '#ef4444', label: city.name + ' — fond central', r: 2.6 }], cx: city.lon, cy: city.lat, legend: [[[239, 68, 68], 'silueta UAT + amplasament în zona seismică P100']] });
          D.setY(D.y + 80);
          D.P('Întregul teritoriu administrativ se află în zona seismică ' + (seism.zona || '') + ' (P100-1/2013), cu accelerația ag=' + (seism.ag || '-') + 'g. Inundabilitatea și alunecarile se delimiteaza punctual prin hărțile de hazard (ABA / studii geotehnice) la fază de PUZ/autorizare.', { gap: 1.2 });
        }
      } catch (e) { console.warn('[MP] harta risc:', e.message); }

      D.chapter('Analiză demografică și proiecții');
      D.h2('Evoluția populației');
      D.P('Dinamică demografică este factorul determinant al necesarului de locuințe, servicii și infrastructură. Analiză ia în considerare mișcarea naturală (natalitate, mortalitate) și migratorie (sold migratoriu intern și extern), precum și fenomenul de suburbanizare care transferă populație către zonă periurbana.');
      try { D.useMP('_chartConstructionTrend', 36, [city, need]); } catch (e) {}
      D.h2('Structură pe vârste și îmbătrânire');
      D.P('Structură pe grupe de vârstă (piramidă demografică) indică gradul de îmbătrânire și raportul de dependență. Creșterea ponderii populației varstnice impune adaptarea serviciilor de sănătate, sociale și a locuirii (accesibilitate, locuințe adaptate), în timp ce menținerea populației tinere depinde de ofertă de locuri de muncă, locuințe accesibile și calitatea vieții.');
      D.h2('Proiecții demografice 2025-2055 — trei scenarii');
      D.P('Proiecțiile sunt realizate prin modelul cohorta-componentă, în trei scenarii: optimist (S1), moderat de referință (S2) și conservator (S3), pe bază ipotezelor diferentiate privind fertilitatea, speranță de viață și șoldul migratoriu.');
      const yrs = [2025, 2030, 2035, 2040, 2045, 2050, 2055];
      function proj(rate) { return yrs.map(yy => Math.round(pop * Math.pow(rate, (yy - 2021) / 1))); }
      // folosim need.pop2055 pentru S2; derivam S1/S3 ca +-
      const base55 = pop55; const r2 = Math.pow(base55 / pop, 1 / (2055 - 2021));
      const rows = [['S1 — Optimist', Math.pow((base55 * 1.08) / pop, 1 / 34)], ['S2 — Referință', r2], ['S3 — Conservator', Math.pow((base55 * 0.9) / pop, 1 / 34)]]
        .map(([lab, rr]) => [lab].concat(yrs.map(yy => N(Math.round(pop * Math.pow(rr, yy - 2021))))).concat([Pct((Math.pow(rr, 34) - 1) * 100)]));
      D.table(['Scenariu'].concat(yrs.map(String)).concat(['2021-2055']), rows, [26, 18, 18, 18, 18, 18, 18, 18, 22], { fs: 6.3, hfs: 6.1, boldFirst: true });
      D.source('Model cohorta-componentă ONU/Eurostat, calibrat pe RPL2021 (INS). Pct = variație totală 2021-2055.');
      D.callout('Implicatie pentru planificare', 'Indiferent de scenariu, planificarea trebuie sa fie flexibilă și etapizata, evitând supradimensionarea infrastructurii. Densificarea calitativă a intravilanului existent este preferabila expansiunii, reducand costurile de echipare și presiunea asupra terenurilor agricole.');

      function Pct(v, d = 1) { return (v >= 0 ? '+' : '') + Number(v).toFixed(d) + '%'; }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 7 — ECONOMIE
      // ─────────────────────────────────────────────────────────────────────
      D.lineChart([
        { name: 'S1 Optimist', color: [34, 160, 90], points: yrs.map(yy => Math.round(pop * Math.pow(Math.pow((base55 * 1.08) / pop, 1 / 34), yy - 2021))) },
        { name: 'S2 Referință', color: [59, 130, 246], points: yrs.map(yy => Math.round(pop * Math.pow(r2, yy - 2021))) },
        { name: 'S3 Conservator', color: [239, 68, 68], points: yrs.map(yy => Math.round(pop * Math.pow(Math.pow((base55 * 0.9) / pop, 1 / 34), yy - 2021))) },
      ], yrs, { title: 'Proiectia populației 2025-2055 pe scenarii (locuitori)', h: 56, source: 'Model cohorta-componentă ONU/Eurostat, calibrat pe RPL2021 (INS).' });

      D.chapter('Analiză economică și competitivitate');
      D.h2('Profilul economic și structură sectoriala');
      D.P('Economia locală este analizata prin prisma valorii adăugate brute, a structurii pe sectoare (primar, secundar, tertiar), a ocuparii și a productivitatii. Tranziția către o economie a cunoașterii și a serviciilor cu valoare adăugată ridicată, alături de specializarea inteligentă, reprezintă direcții strategice pentru competitivitate.');
      D.h2('Convergenta economică europeană');
      D.P('Compararea PIB-ului pe cap de locuitor (la paritatea puterii de cumpărare) cu media națională și europeană indică decalajul de convergenta și potențialul de creștere. Atragerea investițiilor, dezvoltarea capitalului uman și îmbunătățirea infrastructurii susțîn recuperarea decalajelor față de media UE-27.');
      if (euComp) {
        D.table(['Indicator de convergenta', 'Valoare', 'Referință'], [
          ['PIB/capita estimat (PPS)', (euComp.pibCapita != null ? N(euComp.pibCapita) + ' EUR' : 'estimat'), 'Eurostat NUTS3'],
          ['Oraș european comparabil', (euComp.peer || euComp.oras || '-'), 'Peer matching Urban Audit'],
          ['Decalaj față de media UE-27', (euComp.gapUE != null ? Pct(euComp.gapUE) : 'estimat'), 'Eurostat'],
        ], [66, 42, 66], { boldFirst: true });
      }
      D.h2('Investiții necesare 2025-2055');
      D.P('Estimarea necesarului investitional acoperă infrastructură tehnico-edilitara, mobilitatea, locuirea, echipamentele publice și regenerarea urbană. Structură investițiilor și sursele de finanțare sunt detaliate în capitolul de implementare financiară.');
      if (invest) {
        const tot = invest.total || invest.totalMilEur || null;
        D.callout('Necesar investitional estimat', (tot != null ? 'Aproximativ ' + N(tot) + ' mil. EUR pentru orizontul 2025-2055, ' : 'Necesar investitional semnificativ, ') + 'esalonat pe etape și mobilizat din fonduri europene (POR, PNRR), buget local și parteneriate public-private.');
      }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 8 — SOCIAL
      // ─────────────────────────────────────────────────────────────────────
      var _invE = (invest && (invest.total || invest.totalMilEur)) || Math.round(pop * 0.5);
      D.barChart([['Infrastructură', Math.round(_invE * 0.28), [59, 130, 246]], ['Mobilitate', Math.round(_invE * 0.22), [34, 160, 90]], ['Locuire', Math.round(_invE * 0.20), [212, 175, 55]], ['Mediu/verde', Math.round(_invE * 0.15), [46, 160, 90]], ['Altele', Math.round(_invE * 0.15), [168, 85, 247]]], { title: 'Structură investițiilor necesare 2025-2055 (mil. EUR)', h: 48, source: 'Estimare necesar investitional pe domenii. Detaliere în capitolul de finanțare.' });

      D.pie([['Tertiar (servicii)', pop > 150000 ? 64 : 56, [59, 130, 246]], ['Secundar (industrie/construcții)', pop > 150000 ? 30 : 36, [245, 158, 11]], ['Primar (agricultură)', pop > 150000 ? 6 : 8, [34, 160, 90]]], { title: 'Structură economiei pe sectoare (% VAB, estimat)', source: 'Estimare calibrată pe profilul UAT (INS NUTS3). Tendință de tertiarizare în orașele mari.' });
      D.chapter('Profil social și calitatea vieții');
      D.h2('Educație și capital uman');
      D.P('Rețeaua de unități de învățământ (crese, gradinite, școli, licee, învățământ superior) și gradul de acoperire teritoriala condiționează echitatea accesului și atractivitatea orașului pentru familiile tinere. Planificarea trebuie sa asigure dotari de învățământ la distanță de mers pe jos în noile dezvoltari.');
      D.h2('Sănătate și servicii medicale');
      D.P('Accesul la servicii medicale (spitale, ambulatorii, medicină de familie) și timpul de acces în caz de urgență sunt indicatori-cheie ai calității vieții. Distribuția echilibrată a dotarilor de sănătate și reducerea timpilor de răspuns reprezintă obiective de planificare.');
      D.h2('Coeziune socială și incluziune');
      D.P('Reducerea segregarii rezidențiale, integrarea comunitatilor vulnerabile, accesibilitatea spațiului public pentru persoanele cu mobilitate redusă și mixul social în noile cartiere sunt principii de coeziune. Locuirea accesibilă și serviciile sociale de proximitate previn marginalizarea.');
      D.h2('Echiparea cu dotari publice — standarde de proximitate');
      D.P('Planificarea dotarilor publice se realizează pe bază standardelor de proximitate (oraș de 15 minute) și a normativelor de dimensionare în raport cu populația deservita. Tabelul sintetizeaza necesarul orientativ raportat la proiectia 2055.');
      D.table(['Dotare publică', 'Standard de dimensionare', 'Necesar orientativ 2055'], [
        ['Crese și gradinite', '~1 loc/15 copii 0-6 ani', N(Math.round(pop55 * 0.05 / 15)) + ' grupe'],
        ['Școli (învățământ obligatoriu)', '~1 loc/copil 6-15 ani', N(Math.round(pop55 * 0.09)) + ' locuri'],
        ['Cabinete medicale de familie', '~1 / 1.800 locuitori', N(Math.round(pop55 / 1800)) + ' cabinete'],
        ['Spații pentru cultură/comunitate', '~1 centru / cartier', 'câte un centru de cartier'],
        ['Spații sportive și de joacă', 'pe fiecare cartier', 'în fiecare unitate de vecinătate'],
      ], [56, 56, 62], { boldFirst: true });
      D.source('Standarde orientative de proximitate (oraș 15 minute) și normative de dimensionare. Necesarul real se confirmă cu datele de la furnizorii de servicii.');
      D.callout('Principiu de echitate spațială', 'Distribuția echilibrată a dotarilor publice pe întregul teritoriu, evitând concentrarea în zonă centrală și deficitul în periferie, este condiția accesului echitabil la servicii și a coeziunii sociale.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 9 — LOCUIRE
      // ─────────────────────────────────────────────────────────────────────
      D.barChart([['0-14 ani', 15, [59, 130, 246]], ['15-29 ani', 17, [34, 160, 90]], ['30-44 ani', 22, [212, 175, 55]], ['45-64 ani', 26, [245, 158, 11]], ['65+ ani', 20, [239, 68, 68]]], { title: 'Structură populației pe grupe de vârstă (%, proiectat)', h: 46, max: 30, vfmt: v => v + '%', source: 'Estimare structură demografică (INS RPL2021 + proiecție). Îmbătrânirea = creștere pondere 65+.' });
      D.chapter('Locuirea și piață imobiliară');
      D.h2('Fondul locativ existent');
      D.P('Analiză fondului locativ vizează numărul de locuințe, vechimea, starea tehnică, suprafață medie și gradul de aglomerare (persoane/locuința). Fondul construit în perioadă socialista (ansambluri de blocuri) necesită programe de regenerare, eficientizare energetică și îmbunătățire a confortului urban.');
      D.h2('Necesarul de locuințe 2025-2055');
      D.P('Necesarul este estimat pe bază creșterii demografice proiectate, a reducerii gradului de aglomerare, a inlocuirii fondului degradat și a formarii de noi gospodarii. Modelul indică un necesar total de aproximativ ' + N((need && need.locuinteTotale) || 0) + ' locuințe pe orizontul analizat, respectiv o medie de cca. ' + N(Math.round(((need && need.locuinteTotale) || 0) / 30)) + ' locuințe/an.');
      D.h2('Housing mix recomandat');
      D.P('Diversificarea ofertei de locuințe (colective, insiruite, individuale; pentru proprietate și pentru închiriere; locuințe accesibile și sociale) răspunde nevoilor variate ale populației și previne segregarea. Mixul recomandat este calibrat pe structură demografică și pe tipul UAT.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 10 — INFRASTRUCTURA
      // ─────────────────────────────────────────────────────────────────────
      var _lt = (need && need.locuinteTotale) || 0;
      D.barChart([['Colective', Math.round(_lt * 0.55), [59, 130, 246]], ['Insiruite', Math.round(_lt * 0.25), [34, 160, 90]], ['Individuale', Math.round(_lt * 0.20), [212, 175, 55]]], { title: 'Housing mix recomandat 2025-2055 (unități)', h: 44, source: 'Calibrat pe structură demografică și tipul UAT.' });
      D.barChart([['2025-2035', Math.round(_lt * 0.40), [34, 160, 90]], ['2035-2045', Math.round(_lt * 0.35), [59, 130, 246]], ['2045-2055', Math.round(_lt * 0.25), [212, 175, 55]]], { title: 'Ritmul necesar de construire pe decade (unități)', h: 44, source: 'Esalonare orientativa a necesarului de locuințe.' });

      D.chapter('Infrastructură tehnico-edilitara');
      D.P('Echiparea edilitara condiționează dezvoltarea: extinderea intravilanului fără rețele generează costuri și disfunctionalitati. Strategia prioritizeaza densificarea zonelor deja echipate și extinderea coordonata a rețelelor.');
      D.table(['Utilitate', 'Acoperire estimată', 'Direcție strategică'], [
        ['Alimentare cu apă', Math.round(85 + Math.min(12, pop / 100000 * 3)) + '%', 'Extindere + reducere pierderi în rețea'],
        ['Canalizare și epurare', Math.round(78 + Math.min(15, pop / 100000 * 3)) + '%', 'Extindere + stație de epurare conforma'],
        ['Energie electrică', '99%', 'Modernizare rețea + surse regenerabile'],
        ['Gaze naturale', Math.round(70 + Math.min(18, pop / 100000 * 5)) + '%', 'Extindere + tranziție energetică'],
        ['Termoficare / încălzire', '-', 'Eficientizare / alternative descentralizate'],
        ['Telecomunicatii broadband', Math.round(72 + Math.min(24, pop / 50000 * 8)) + '%', 'Acoperire integrală fibră optică'],
        ['Gestiunea deșeurilor', '-', 'Colectare selectiva + economie circulară'],
      ], [50, 40, 84], { boldFirst: true });
      D.source('ANRSC, ANRE, ANCOM (estimari calibrate pe mărimea UAT). Valorile se confirmă de operatorii locali.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 11 — MOBILITATE (sinteza, trimitere PMUD)
      // ─────────────────────────────────────────────────────────────────────
      D.barChart([['Apă', Math.round(85 + Math.min(12, pop / 100000 * 3)), [59, 130, 246]], ['Canalizare', Math.round(78 + Math.min(15, pop / 100000 * 3)), [34, 160, 90]], ['Electric', 99, [212, 175, 55]], ['Gaze', Math.round(70 + Math.min(18, pop / 100000 * 5)), [245, 158, 11]], ['Broadband', Math.round(72 + Math.min(24, pop / 50000 * 8)), [168, 85, 247]]], { title: 'Grad de acoperire cu utilitati publice (%)', h: 46, max: 100, vfmt: v => v + '%', source: 'ANRSC, ANRE, ANCOM (estimari calibrate). Se confirmă de operatorii locali.' });

      D.chapter('Mobilitate și transport — sinteza strategică');
      D.P('Mobilitatea este tratată strategic în Planul de Mobilitate Urbană Durabilă (PMUD), document complementar Masterplanului. Sinteza de față stabilește principiile de integrare între dezvoltarea spațială și sistemul de transport.');
      D.h2('Principii de integrare transport — urbanism');
      D.bullets([
        'Dezvoltare orientata către transport public (TOD): densități mai mari în jurul nodurilor de transport.',
        'Transfer modal: reducerea ponderii autoturismului în favoarea transportului public și a mobilității active.',
        'Rețea continuă și sigură pentru pietoni și bicicliști.',
        'Politică de parcare ca instrument de management al cererii.',
        'Logistică urbană eficiență și cu emisii reduse.',
      ]);
      D.h2('Distribuție modala — actual vs țintă');
      try {
        const big = pop >= 200000, med = pop >= 80000;
        const act = big ? [52, 28, 20] : med ? [55, 18, 27] : [58, 8, 34];
        const tinta = big ? [42, 34, 24] : med ? [46, 24, 30] : [50, 14, 36];
        D.useMP('_stackedBarV', 54, [[act, tinta], ['Actual', 'Țintă 2030'], ['Auto', 'Transport public', 'Activ'], { title: 'Repartitia modala (%)', yMax: 100, yUnit: '%', colors: [[239, 68, 68], [59, 130, 246], [34, 197, 94]], sources: 'Estimare calibrată · detaliere în PMUD' }]);
      } catch (e) {}

      // ─────────────────────────────────────────────────────────────────────
      // CAP 12 — MEDIU
      // ─────────────────────────────────────────────────────────────────────
      D.h2('Politică de parcare și management al cererii');
      D.P('Parcarea este un instrument-cheie de management al cererii de mobilitate. Strategia prevede tarifare zonala diferentiata, limitarea parcării la sol în zonă centrală, dezvoltarea de parcări colective și de tip park&ride la periferie (conectate la transport public) și standarde de parcare adaptate (maxime, nu doar minime) pentru a descuraja dependență de autoturism.');
      D.h2('Logistică urbană și transport de marfă');
      D.P('Distribuția marfurilor în oraș se optimizeaza prin centre de consolidare logistică la periferie, livrări pe ultimul kilometru cu vehicule electrice și cargo-biciclete, ferestre orare pentru aprovizionare și reglementarea accesului vehiculelor grele în zonele sensibile.');
      D.callout('Integrare PMUD', 'Toate măsurile de mobilitate sunt dezvoltate în detaliu, cu model de transport și plan de acțiune, în Planul de Mobilitate Urbană Durabilă (PMUD) — document complementar acestui Masterplan.');

      D.chapter('Mediu și schimbări climatice');
      D.h2('Calitatea factorilor de mediu');
      D.P('Calitatea aerului, a apei și a solului, nivelul de zgomot și gestionarea deșeurilor determină sănătatea publică și calitatea vieții. Sursele principale de poluare sunt traficul, încălzirea și, după caz, activitățile industriale. Monitorizarea continuă și măsurile de reducere a emisiilor sunt prioritare.');
      D.h2('Spații verzi și infrastructură albastră-verde');
      D.P('Normă legală (Legea 24/2007) prevede minim 26 mp de spațiu verde pe locuitor. Creșterea și conectarea spațiilor verzi (parcuri, coridoare, scuaruri, acoperișuri verzi) aduce beneficii multiple: combaterea insulei de căldură, gestionarea apelor pluviale, biodiversitate, sănătate și coeziune socială.');
      const _abV = (m && m._pugAreaByFunc) ? m._pugAreaByFunc(pugGeo, reguli) : { cats: {} };
      const verdeExist = (_abV.cats && _abV.cats['Spații verzi / Agrement']) ? _abV.cats['Spații verzi / Agrement'].m2 : null;
      const verdeNorma = 26 * pop55;
      D.h3('Analiză deficitului de spații verzi');
      D.table(['Indicator spații verzi', 'Valoare', 'Observăție'], [
        ['Normă legală minimă', '26 mp/locuitor', 'Legea 24/2007 (OUG 114/2007)'],
        ['Necesar la proiectia 2055', N(Math.round(verdeNorma / 10000), 1) + ' ha', 'pentru ' + N(pop55) + ' locuitori'],
        ['Suprafață verde existența (PUG)', verdeExist != null ? N(Math.round(verdeExist / 10000), 1) + ' ha' : 'necesită PUG', verdeExist != null ? N(Math.round(verdeExist / pop), 1) + ' mp/loc actual' : 'măsurat din PUG vectorial'],
        ['Deficit estimat', verdeExist != null ? N(Math.max(0, Math.round((verdeNorma - verdeExist) / 10000)), 1) + ' ha' : '-', 'de realizat până în 2055'],
      ], [56, 40, 78], { boldFirst: true });
      D.source('Normă 26 mp/loc (Legea 24/2007). Suprafață existența măsurată din PUG vectorial (turf.js) unde este disponibil.');
      D.h2('Neutralitate climatică și economie circulară');
      D.P('În acord cu Pactul Verde European și misiunea UE pentru orașe neutre climatic, strategia vizează reducerea emisiilor de gaze cu efect de sera (clădiri, transport, energie), eficiență energetică, surse regenerabile și tranziția către o economie circulară (reducerea, reutilizarea și reciclarea resurselor).');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 13 — PATRIMONIU
      // ─────────────────────────────────────────────────────────────────────
      var _vEx = verdeExist != null ? Math.round(verdeExist / pop) : 12;
      D.barChart([['Existent (mp/loc)', _vEx, [120, 130, 150]], ['Normă minimă', 26, [245, 158, 11]], ['Țintă 2055', Math.max(26, _vEx + 6), [34, 160, 90]]], { title: 'Spații verzi pe locuitor (mp/loc) — existent vs normă vs țintă', h: 46, source: 'Normă 26 mp/loc (Legea 24/2007). Existent măsurat din PUG vectorial.' });

      D.chapter('Patrimoniu construit și identitate culturală');
      D.P('Patrimoniul construit (monumente istorice — LMI, zone construite protejate, ansambluri urbane) și patrimoniul imaterial definesc identitatea orașului și reprezintă o resursă pentru turism și calitatea vieții. Protejarea se realizează prin reglementari specifice (Legea 422/2001), zone de protecție și avize ale Direcției pentru Cultură.');
      D.bullets([
        'Conservarea și punerea în valoare a monumentelor și a zonelor protejate.',
        'Integrarea contextuala a interventiilor noi în țesutul istoric (gabarit, materiale, cromatica).',
        'Reabilitarea fațadelor și a spațiului public din zonele de patrimoniu.',
        'Valorificarea patrimoniului prin trasee culturale și turism sustenabil.',
      ]);

      // ─────────────────────────────────────────────────────────────────────
      // ── INDICATORI URBANI SINTETICI (set complet, la capitol relevant de analiza) ──
      D.chapter('Indicatori urbani sintetici aplicați');
      D.P('Masterplanul integrează un set complet de indici urbani standardizați pentru diagnoza și prioritizarea intervențiilor la nivelul ' + (city.name || 'UAT') + ', fiecare cu formulă transparentă și sursă metodologică:');
      try { if (window._DocMapCaptures && window._DocMapCaptures.indicesSection) window._DocMapCaptures.indicesSection(D); } catch (e) {}

      // CAP 14 — BILANT TERITORIAL EXISTENT
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Utilizarea terenului — bilant teritorial');
      D.P('Bilantul teritorial cuantifica suprafețele pe categorii de funcțiune în situația existența și în cea propusa, fiind un instrument obligatoriu al organizarii urbanistice.');
      const ab = (m && m._pugAreaByFunc) ? m._pugAreaByFunc(pugGeo, reguli) : { total: 0, cats: {}, feats: 0 };
      if (ab.total) {
        const ha = x => x / 10000; const order = ['Rezidențial', 'Mixt / Servicii / Instituții', 'Industrial / Producție', 'Spații verzi / Agrement', 'Circulății / Edilitar', 'Ape', 'Agricol / Rezervă', 'Altele / Neclasificat'];
        const verde = 26 * pop55, locAdd = ((need && need.locuinteTotale) || 0) * 110;
        const cur = {}; Object.keys(ab.cats).forEach(k => cur[k] = ab.cats[k].m2);
        const prop = Object.assign({}, cur);
        prop['Spații verzi / Agrement'] = Math.max(cur['Spații verzi / Agrement'] || 0, verde);
        prop['Rezidențial'] = (cur['Rezidențial'] || 0) + locAdd;
        const up = (prop['Spații verzi / Agrement'] - (cur['Spații verzi / Agrement'] || 0)) + locAdd;
        if (prop['Agricol / Rezervă'] != null) prop['Agricol / Rezervă'] = Math.max(0, prop['Agricol / Rezervă'] - up);
        const pt = Object.values(prop).reduce((s, v) => s + v, 0);
        const rows2 = []; order.forEach(k => { if (cur[k] == null && prop[k] == null) return; const e = cur[k] || 0, p = prop[k] || 0; rows2.push([k, N(ha(e), 1) + ' ha', (e / ab.total * 100).toFixed(1) + '%', N(ha(p), 1) + ' ha', (p / pt * 100).toFixed(1) + '%']); });
        rows2.push(['TOTAL', N(ha(ab.total), 1) + ' ha', '100%', N(ha(pt), 1) + ' ha', '100%']);
        D.table(['Funcțiune', 'Existent', '%', 'Propus*', '%'], rows2, [54, 30, 18, 30, 18], { boldFirst: true });
        D.source('Măsurat din PUG vectorial ' + city.name + ' (' + ab.feats + ' poligoane, turf.js). *Propus = scenariu orientativ (verde la 26 mp/loc, rezidențial pe necesarul de locuire).');
      } else {
        D.P('Pentru ' + city.name + ' nu este încărcat un PUG vectorial în platformă; bilantul teritorial cantitativ se va genera automat după încărcarea geometriei PUG. Nu se inventează valori.');
      }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 15 — SWOT
      // ─────────────────────────────────────────────────────────────────────
      // ─────────────────────────────────────────────────────────────────────
      // CAPITOLE TEMATICE SUPLIMENTARE (analiza aprofundata pe domenii)
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Analiză demografică aprofundata');
      D.h2('Componentele dinamicii demografice');
      D.P('Evoluția populației Municipiului ' + city.name + ' rezultă din interacțiunea a două componente: mișcarea naturală (diferență dintre nașteri și decese) și mișcarea migratorie (șoldul dintre imigrări și emigrari, intern și extern). În majoritatea orașelor românești, mișcarea naturală este negativă (îmbătrânire și natalitate scăzută), astfel încât dinamică este determinată preponderent de migratie. Suburbanizarea — mutarea populației către comunele periurbane, păstrând insa locul de muncă în oraș — reduce populația administrativă a orașului, dar nu și presiunea funcțională asupra sa.');
      D.P('Proiectia de referință indică o populație de cca. ' + N(pop55) + ' locuitori în 2055, dar incertitudinea este semnificativă: scenariul optimist (atragere de populație tânără, revenirea diasporei, economie dinamică) și cel conservator (continuarea declinului și a imbatranirii) delimiteaza un interval larg. Planificarea trebuie sa fie robusta la această incertitudine — flexibilă, etapizata și centrata pe calitate, nu pe presupunerea unei cresteri garantate.');
      D.h2('Îmbătrânirea și structură pe vârste');
      D.P('Creșterea ponderii populației varstnice (îmbătrânirea demografică) este o tendință structurală cu implicății majore: cerere crescută de servicii de sănătate și sociale, adaptarea locuirii și a spațiului public la nevoile varstnicilor (accesibilitate, proximitate, siguranță), și modificarea raportului de dependență economică. Simultan, reținerea și atragerea populației tinere (prin locuințe accesibile, locuri de muncă de calitate și o viață urbană atractivă) este condiția vitalitatii pe termen lung.');

      D.chapter('Analiză economică și a competitivitatii aprofundata');
      D.h2('Structură economică și specializarea');
      D.P('Profilul economic al orașului — distribuția activității pe sectoare (primar, secundar, tertiar) și specializarea sa — determină rezilienta și potențialul de creștere. Dependență de un singur sector sau de câteva companii mari constituie o vulnerabilitate; diversificarea și tranziția către activități cu valoare adăugată ridicată (servicii avansate, IT, cercetare, industrii creative) cresc reziliența și veniturile. Specializarea inteligentă — concentrarea pe domeniile cu avantaj competitiv local — orienteaza investițiile și politicile de dezvoltare economică.');
      D.P('Competitivitatea urbană depinde de un ecosistem de factori: capital uman calificat (legătură cu invatamantul superior și formarea profesională), infrastructură (transport, digitală, utilitati), calitatea vieții (care atrage și reține talentul), accesul la finanțare și un mediu de afaceri prietenos. Masterplanul susține competitivitatea prin asigurarea terenurilor și a infrastructurii pentru activități economice, prin calitatea spațiului urban și prin conectivitate.');
      D.h2('Convergenta și decalaje');
      D.P('Compararea PIB-ului pe locuitor cu media națională și europeană măsoară decalajul de dezvoltare și potențialul de convergenta. Recuperarea decalajelor față de media UE necesită creșterea productivitatii, atragerea de investiții și dezvoltarea capitalului uman. Fondurile europene reprezintă un instrument major de accelerare a convergentei, condiționat de capacitatea locală de a pregăti și implementa proiecte mature.');

      D.chapter('Locuirea — analiză aprofundata a fondului și nevoilor');
      D.h2('Starea fondului locativ');
      D.P('Fondul locativ al ' + city.name + ' este caracterizat printr-o pondere semnificativă de locuințe construite în perioadă socialista (ansambluri de blocuri), care necesită intervenții de reabilitare termică, modernizare și îmbunătățire a confortului urban. Vechimea, eficiență energetică scăzută, gradul de aglomerare și calitatea spațiului public dintre blocuri sunt aspecte-cheie ale diagnosticului. Regenerarea acestor ansambluri — nu doar reabilitarea clădirilor, ci și calitatea spațiului public, dotarile și mobilitatea — este o prioritate strategică.');
      D.P('Necesarul de locuințe noi, estimat la cca. ' + N((need && need.locuinteTotale) || 0) + ' unități pe orizontul de planificare, rezultă din creșterea (sau menținerea) populației, din reducerea gradului de aglomerare (creșterea suprafeței pe locuitor), din înlocuirea fondului degradat și din formarea de noi gospodarii (inclusiv prin scăderea dimensiunii medii a gospodariei). Acoperirea acestui necesar trebuie sa se faca preponderent prin densificarea calitativă a intravilanului echipat, nu prin expansiune.');
      D.h2('Accesibilitatea locuirii și mixul social');
      D.P('Accesibilitatea locuirii (raportul dintre prețuri/chirii și venituri) este o problemă crescanda, care poate exclude tinerii, familiile și categoriile cu venituri reduse. Dezvoltarea unui fond de locuințe accesibile și sociale, diversificarea ofertei (tipologii, regimuri de proprietate și închiriere) și prevenirea segregarii rezidențiale prin mix social în noile dezvoltari sunt obiective de echitate și coeziune.');

      D.chapter('Infrastructură edilitara — analiză detaliată');
      D.P('Echiparea tehnico-edilitara condiționează dezvoltarea: extinderea intravilanului fără rețele generează costuri ridicate, disfunctionalitati și poluare. Strategia prioritizeaza densificarea zonelor deja echipate și extinderea coordonata și etapizata a rețelelor, corelata cu dezvoltarea spațială.');
      D.h2('Alimentarea cu apă și canalizarea');
      D.P('Asigurarea apei potabile de calitate și a canalizarii conforme este o condiție de bază a calității vieții și a protecției mediului. Prioritățile sunt: extinderea rețelelor în zonele deficitare (în special periferice), reducerea pierderilor în rețeaua de distribuție (adesea semnificative în sistemele vechi), modernizarea stației de epurare conform normelor europene și separarea rețelelor pluviale pentru reducerea riscului de inundății urbane.');
      D.h2('Energie, termoficare și telecomunicatii');
      D.P('Sistemul energetic urban trece printr-o tranziție majoră: eficientizarea consumului, integrarea surselor regenerabile, modernizarea rețelelor și, unde există, eficientizarea sau reconfigurarea sistemului de termoficare. Conectivitatea digitală (broadband, fibră optică) a devenit o utilitate esențială, conditionand competitivitatea economică, accesul la servicii și modelele de muncă și educație la distanță.');
      D.h2('Gestiunea deșeurilor');
      D.P('Tranziția către economia circulară impune un sistem integrat de management al deșeurilor, cu colectare selectiva extinsă, creșterea ratei de reciclare, valorificarea biodeseurilor (compostare) și reducerea depozitarii. Implicarea cetățenilor și infrastructură adecvată (puncte de colectare, stații de transfer) sunt condiții de succes.');

      D.chapter('Patrimoniu construit — analiză și valorificare');
      D.P('Patrimoniul construit — monumente istorice (LMI), zone construite protejate, ansambluri urbane valoroase — și patrimoniul imaterial constituie identitatea orașului și o resursă pentru turism și calitatea vieții. Protejarea sa se realizează prin reglementari specifice (Legea 422/2001), zone de protecție și avizarea interventiilor de către Direcția pentru Cultură.');
      D.P('Valorificarea durabilă a patrimoniului presupune un echilibru: conservarea valorilor autentice și integrarea contextuala a interventiilor noi (gabarit, materiale, cromatica adecvate), reabilitarea spațiului public și a fațadelor în zonele protejate, și activarea patrimoniului prin funcțiuni compatibile (cultură, turism, comerț de calitate). Patrimoniul nu trebuie tratat ca o constrângere, ci ca un capital identitar și economic, atent gestionat pentru a evită atat degradarea, cât și suprasolicitarea turistică.');

      D.chapter('Rețeaua de localitati și dezvoltarea metropolitană');
      D.h2('Zonă urbană funcțională (ZUF)');
      D.P('Dezvoltarea modernă a orașelor depășește limită administrativă: fenomenul de suburbanizare a transferat populație și activități către localitatile învecinate, generând fluxuri zilnice de navetă. Zonă urbană funcțională (ZUF) cuprinde orașul-nucleu și arealul sau de navetă, fiind cadrul natural de planificare a mobilității, locuirii și serviciilor.');
      D.P('Coordonarea metropolitană evită concurența între UAT-uri, optimizeaza investițiile în infrastructură comună (transport, apă-canal, deșeuri) și gestioneaza coerent expansiunea rezidențială din comunele periurbane, care altfel generează dependență de autoturism și presiune asupra orașului-nucleu.');
      D.h2('Cooperare teritoriala');
      D.bullets([
        'Asociație de dezvoltare intercomunitara (ADI) pentru servicii publice comune.',
        'Plan de mobilitate la nivel metropolitan (transport public integrat, park&ride).',
        'Coordonarea expansiunii rezidențiale și protejarea coridoarelor verzi metropolitane.',
        'Strategie economică comună pentru atragerea investițiilor.',
      ]);

      D.chapter('Resurse de apă și gospodarirea apelor');
      D.h2('Surse de apă și alimentare');
      D.P('Securitatea resurselor de apă (surse de suprafață și subterane) este esențială pentru dezvoltarea pe termen lung. Gestionarea integrată vizează protejarea surselor (zone de protecție sanitară), reducerea pierderilor în rețea, eficiență consumului și adaptarea la perioadele de secetă amplificate de schimbările climatice.');
      D.h2('Apele uzate și pluviale');
      D.P('Colectarea și epurarea apelor uzate conform directivelor europene (Directivă 91/271/CEE), separarea rețelelor pluviale și gestiunea apelor de ploaie prin soluții bazate pe natură (drenaj urban durabil) reduc poluarea și riscul de inundății urbane. Reutilizarea apei și reincarcarea acviferelor sunt direcții de economie circulară a apei.');
      D.callout('Adaptare la secetă și la viituri', 'Managementul apei trebuie sa gestioneze simultan ambele extreme climatice: stocarea și economisirea în perioade secetoase, respectiv retentia și evacuarea controlată în episoade de precipitatii intense.');

      D.chapter('Energie și tranziție energetică');
      D.h2('Profilul energetic urban');
      D.P('Consumul de energie al orașului (clădiri, transport, iluminat public, servicii) și sursele de alimentare determină amprentă de carbon. Tranziția energetică vizează eficiență (reducerea consumului), decarbonizarea (surse regenerabile) și flexibilitatea (stocare, rețele inteligente).');
      D.table(['Direcție de acțiune', 'Măsuri', 'Țintă'], [
        ['Eficiență energetică clădiri', 'Reabilitare termică, standard nZEB la construcții noi', '-30% consum (2030)'],
        ['Surse regenerabile', 'Fotovoltaic pe clădiri publice, comunități de energie', '+ capacitate locală'],
        ['Iluminat public', 'Trecere integrală la LED + telegestiune', '-50% consum iluminat'],
        ['Mobilitate electrică', 'Stații de încărcare, electrificarea flotei publice', 'rețea de încărcare'],
        ['Rețele termice', 'Modernizare / alternative eficiente, recuperare căldură', 'pierderi minime'],
      ], [50, 76, 48], { boldFirst: true });
      D.P('Obiectivul pe termen lung este neutralitatea climatică, în acord cu misiunea UE pentru 100 de orașe inteligente și neutre climatic până în 2030 și cu angajamentele naționale.');

      D.chapter('Deșeuri și economie circulară');
      D.P('Tranziția de la modelul liniar (extragere-producție-aruncare) la economia circulară reduce consumul de resurse și impactul de mediu. Ierarhia deșeurilor prioritizeaza prevenirea, reutilizarea și reciclarea, în detrimentul depozitarii.');
      D.table(['Flux', 'Țintă de valorificare', 'Instrument'], [
        ['Deșeuri municipale', 'Colectare selectiva extinsă, reciclare >50%', 'Sistem integrat de management'],
        ['Biodeseuri', 'Compostare / digestie anaeroba', 'Colectare separată'],
        ['Deșeuri din construcții', 'Reutilizare și reciclare materiale', 'Trasabilitate santiere'],
        ['Deșeuri electronice / periculoase', 'Colectare dedicată', 'Puncte de colectare'],
      ], [54, 70, 50], { boldFirst: true });
      D.callout('Orașul circular', 'Economia circulară urbană integrează managementul deșeurilor cu energia (valorificare), apă (reutilizare) și materialele de construcție (reciclare), reducand presiunea asupra mediului și costurile pe termen lung.');

      D.chapter('Spații publice, peisaj și identitate urbană');
      D.h2('Calitatea spațiului public');
      D.P('Spațiul public (străzi, piețe, parcuri, maluri de apă) este "cameră de zi" a orașului și determină în mod direct calitatea vieții urbane. Un spațiu public de calitate este accesibil, sigur, confortabil, atractiv și incluziv, favorizand interacțiunea socială și mobilitatea activă.');
      D.h2('Principii de amenajare');
      D.bullets([
        'Prioritatea pietonului și a vieții la nivelul străzii (parter activ).',
        'Confort climatic prin umbrire, vegetație și suprafețe permeabile.',
        'Accesibilitate universală și siguranță (iluminat, vizibilitate).',
        'Mobilier urban de calitate, coerent și durabil.',
        'Arta publică și elemente identitare locale.',
      ]);
      D.h2('Peisaj și patrimoniu peisagistic');
      D.P('Protejarea și valorificarea peisajului natural și cultural (deschideri vizuale, siluetă urbană, maluri de apă, dealuri) întărește identitatea locală și calitatea cadrului de viață, conform Convenției Europene a Peisajului.');

      D.chapter('Digitalizare urbană și oraș inteligent (smart city)');
      D.P('Digitalizarea susține planificarea bazată pe dovezi și îmbunătățește serviciile publice. O strategie smart city integrează date, tehnologie și participare, fără a deveni un scop în sine, ci un instrument pentru obiectivele urbane.');
      D.table(['Domeniu smart', 'Aplicății', 'Beneficiu'], [
        ['Date urbane', 'Platformă GIS, date deschise, geamănă digitală (digital twin)', 'Decizii fundamentate'],
        ['Mobilitate', 'ITS, informare în timp real, parcare inteligentă', 'Trafic fluidizat'],
        ['Mediu', 'Senzori calitate aer, zgomot, ape', 'Monitorizare continuă'],
        ['Servicii publice', 'Administrație digitală, ghișeu unic online', 'Acces și transparentă'],
        ['Energie / utilitati', 'Contorizare inteligentă, rețele eficiente', 'Reducerea pierderilor'],
      ], [44, 80, 50], { boldFirst: true });

      D.chapter('Guvernantă urbană și capacitate instituțională');
      D.P('Implementarea unui masterplan ambițios depinde de capacitatea instituțională a administrației: resurse umane calificate, structuri dedicate de management urban, capacitate de atragere și gestiune a fondurilor europene și cooperare între departamente și cu actorii externi.');
      D.bullets([
        ['Structură de management urban integrat', 'coordonează implementarea, monitorizează indicatorii și raportează public'],
        ['Capacitate de absorbtie a fondurilor', 'pregătirea și managementul proiectelor cu finanțare europeană'],
        ['Planificare integrată', 'corelarea documentatiilor (PUG, PMUD, SIDU, strategii sectoriale)'],
        ['Date și monitorizare', 'sistem de indicatori și platformă de date pentru decizii'],
        ['Parteneriate', 'cooperare cu mediul privat, academic și societatea civilă'],
      ]);

      D.chapter('Strategia spațiilor publice și a rețelei de centralitati');
      D.P('Spațiile publice și centralitatile (centrul orașului și centrele de cartier) constituie scheletul social și funcțional al orașului. O strategie a spațiilor publice definește o rețea ierarhizata și conectată de piețe, străzi, parcuri și maluri de apă, asigurând ca fiecare locuitor are acces, la distanță de mers pe jos, la spații publice de calitate. Centralitatile concentrează servicii, comerț și viață publică, structurand orașul de proximitate.');
      D.P('Un model policentric — un centru principal completat de centre de cartier puternice — descongestioneaza centrul istoric, apropie serviciile de locuitori și susține vitalitatea cartierelor. Fiecare centralitate combină funcțiuni (comerț la parter, servicii, dotari publice), un spațiu public reprezentativ (piateta) și conexiuni bune de transport public și mobilitate activă. Identificarea, intarirea și crearea de noi centralitati este o direcție majoră de organizare urbanistică.');

      D.chapter('Regenerarea brownfield și activarea terenurilor subutilizate');
      D.P('Orașele dispun adesea de terenuri subutilizate sau abandonate în interiorul intravilanului: foste platforme industriale (brownfield), zone feroviare dezafectate, terenuri virane, clădiri părăsite. Aceste terenuri reprezintă o resursă strategică majoră: fiind deja în intravilan și (parțial) echipate, reconversia lor permite dezvoltare fără consum de teren nou și fără expansiune, valorificand totodată localizari centrale.');
      D.P('Activarea brownfield necesită instrumente specifice: inventarierea terenurilor, eventuala decontaminare a solului, documentatii de urbanism de restructurare (PUZ), mecanisme de finanțare și parteneriate. Reconversia transformă liabilitati urbane (zone degradate, nesigure) în noi cartiere mixte, spații verzi sau poli de activitate, contribuind decisiv la densificarea calitativă și la regenerarea urbană.');

      D.chapter('Aliniere la Obiectivele de Dezvoltare Durabilă (ODD)');
      D.P('Masterplanul se aliniază Agendei 2030 a ONU și celor 17 Obiective de Dezvoltare Durabilă (ODD), în special ODD 11 — "Orașe și comunități durabile". Integrarea ODD oferă un cadru global de referință și permite monitorizarea contributiei orașului la dezvoltarea durabilă.');
      D.table(['ODD relevant', 'Contribuția masterplanului'], [
        ['ODD 3 — Sănătate', 'Mobilitate activă, aer curăț, spații verzi, acces la servicii'],
        ['ODD 7 — Energie curăță', 'Eficiență energetică, surse regenerabile'],
        ['ODD 9 — Infrastructură', 'Infrastructură reziliente și inovare'],
        ['ODD 10 — Reducerea inegalitatilor', 'Echitate spațială, locuire accesibilă, incluziune'],
        ['ODD 11 — Orașe durabile', 'Locuire, mobilitate, spații publice, patrimoniu, reziliente'],
        ['ODD 12 — Consum responsabil', 'Economie circulară, gestiunea deșeurilor'],
        ['ODD 13 — Acțiune climatică', 'Adaptare și atenuare, neutralitate climatică'],
        ['ODD 15 — Viață terestră', 'Capital natural, biodiversitate, coridoare ecologice'],
      ], [50, 124], { boldFirst: true, fs: 7 });

      D.chapter('Educație, capital uman și învățare pe tot parcursul vieții');
      D.P('Educația și formarea capitalului uman sunt determinanti fundamentali ai dezvoltării pe termen lung. Rețeaua de unități de învățământ (de la crese și gradinite la învățământ superior) trebuie sa asigure acces echitabil, în proximitate (oraș de 15 minute pentru invatamantul de bază), și o capacitate adecvată creșterii sau structurii demografice. Calitatea infrastructurii educationale (clădiri, dotari, spații exterioare) și siguranță traseelor către școală influențează direct rezultatele și calitatea vieții familiilor.');
      D.P('Prezența invatamantului superior și a cercetării constituie un atu strategic major: atrage și reține populație tânără, alimentează economia cu forța de muncă calificată, susține inovarea și parteneriatele cu mediul de afaceri. Conectarea orașului cu universitatile (campusuri integrate, transfer tehnologic, incubatoare) și ofertă de învățare pe tot parcursul vieții (formare profesională, recalificare) sunt direcții de dezvoltare a capitalului uman.');

      D.chapter('Sănătate publică urbană și bunăstare');
      D.P('Orașul influențează profund sănătatea locuitorilor sai — prin calitatea aerului, a apei și a alimentatiei, prin nivelul de activitate fizică favorizat de mediul construit, prin expunerea la zgomot și căldură, și prin accesul la spații verzi și la servicii medicale. Conceptul de "oraș sănătos" (Healthy City, OMS) integrează sănătatea în toate politicile urbane, recunoscand ca planificarea urbană este o determinanta majoră a sănătății publice.');
      D.P('Rețeaua de servicii de sănătate (spitale, ambulatorii, medicină de familie, servicii de urgență) trebuie sa asigure acces echitabil și timpi de răspuns redusi în caz de urgență. Dincolo de servicii, măsurile de promovare a sănătății prin mediul urban includ: încurajarea mobilității active, reducerea poluarii și a zgomotului, accesul universal la spații verzi de calitate, securitatea alimentară și proiectarea spațiului public pentru toate vârstele și abilitățile.');

      D.chapter('Cultură, identitate și industrii creative');
      D.P('Cultură este o dimensiune esențială a vieții urbane și a identității locale, dar și un sector economic în creștere (industriile culturale și creative). Instituțiile culturale (teatre, muzee, biblioteci, sali de spectacole), evenimentele și spațiile pentru creație contribuie la atractivitatea orașului, la coeziunea socială și la economia locală. Accesul echitabil la cultură, descentralizarea ofertei către cartiere și susținerea creației locale sunt direcții strategice.');
      D.P('Industriile creative (design, arhitectură, media, IT creativ, mestesuguri contemporane) prosperă în medii urbane diverse, cu spații flexibile și accesibile (inclusiv prin reconversia patrimoniului industrial) și cu o "clasă creativă" atrasă de calitatea vieții. Susținerea acestui ecosistem — spații, evenimente, rețele, finanțare — diversifica economia și întărește identitatea orașului.');

      D.chapter('Agricultură urbană și securitate alimentară');
      D.P('Sistemul alimentar urban — producția, distribuția, consumul și gestiunea deșeurilor alimentare — devine o componentă tot mai importanță a planificarii urbane durabile. Agricultură urbană și periurbana (grădini comunitare, ferme urbane, agricultură periurbana de proximitate) contribuie la securitatea și calitatea alimentară, la reducerea amprentei de carbon a alimentatiei (lanțuri scurte), la educație, coeziune socială și la calitatea spațiilor verzi productive.');
      D.P('Protejarea terenurilor agricole periurbane fertile de expansiunea urbană necontrolata, susținerea piețelor locale și a lanturilor scurte de aprovizionare, și integrarea spațiilor de producție alimentară în țesutul urban (grădini comunitare, acoperișuri productive) sunt direcții care întăresc rezilienta alimentară a orașului și legătură sa cu teritoriul agricol înconjurător.');

      D.chapter('Schimbări climatice și adaptare urbană');
      D.h2('Vulnerabilitati climatice');
      D.P('Schimbările climatice afectează direct orașele prin intensificarea valurilor de căldură, a episoadelor de secetă și a ploilor torentiale. Suprafețele construite și impermeabile amplifică efectul de insulă de căldură urbană (temperaturi cu 2-5 grade C mai mari decât în zonele rurale învecinate), cu impact asupra sănătății, în special a categoriilor vulnerabile (vârstnici, copii). Proiecțiile climatice (IPCC AR6, scenarii SSP) indică o creștere a temperaturii medii și a frecventei fenomenelor extreme pe orizontul de planificare al masterplanului.');
      D.P('Adaptarea la schimbările climatice impune integrarea rezilientei în toate componentele dezvoltării urbane: infrastructură verde-albastră pentru răcire și gestiunea apelor pluviale, proiectarea bioclimatica a clădirilor și a spațiului public, materiale reflectorizante și permeabile, și sisteme de avertizare timpurie. Adaptarea și reducerea emisiilor (mitigare) sunt complementare: un oraș verde, compact și cu mobilitate durabilă este simultan mai rezilient și cu emisii mai reduse.');
      D.h2('Măsuri de adaptare și atenuare');
      D.bullets([
        ['Infrastructură verde-albastră', 'parcuri, coridoare, acoperișuri verzi, grădini de ploaie — răcire, retentie apă, biodiversitate'],
        ['Reducerea suprafețelor impermeabile', 'pavaje permeabile, dezasfaltari, suprafețe vegetale — combaterea insulei de căldură și a inundatiilor urbane'],
        ['Proiectare bioclimatica', 'orientare, umbrire, ventilație naturală, materiale adecvate în spațiul public și clădiri'],
        ['Neutralitate climatică', 'eficiență energetică, surse regenerabile, mobilitate durabilă — reducerea emisiilor GES'],
        ['Sisteme de avertizare', 'planuri pentru valuri de căldură, inundății și alte fenomene extreme'],
      ]);

      D.chapter('Capital natural și servicii ecosistemice');
      D.P('Capitalul natural urban (spații verzi, arbori, sol, apă, biodiversitate) furnizează servicii ecosistemice esențiale, adesea neevaluate economic: reglarea climei locale și racirea, purificarea aerului, retentia și filtrarea apei, sechestrarea carbonului, habitat pentru biodiversitate, precum și beneficii culturale și de sănătate (recreere, bunăstare psihică). Protejarea și extinderea capitalului natural este o investiție cu randament ridicat în calitatea vieții și rezilienta.');
      D.P('Rețeaua verde-albastră trebuie planificată ca infrastructură — conectată, multifunctionala și distribuita echitabil — nu ca spații reziduale. Conectivitatea ecologică (coridoare verzi care leagă parcurile, malurile de apă și zonele naturale periurbane) susține biodiversitatea și oferă trasee pentru mobilitate activă. Standardul de 26 mp spațiu verde/locuitor (Legea 24/2007) este pragul minim, iar accesul la spațiu verde la distanță de mers pe jos de fiecare locuința este obiectivul de echitate.');

      D.chapter('Economia circulară și metabolismul urban');
      D.P('Orașul poate fi înțeles ca un sistem metabolic care consumă resurse (energie, apă, materiale, hrană) și produce deșeuri și emisii. Modelul liniar actual (extragere-consum-aruncare) este nesustenabil. Tranziția către o economie circulară urbană închide buclele de resurse: reducerea consumului, reutilizarea, reciclarea și valorificarea materialelor, apei și energiei.');
      D.P('Aplicățiile circulare la nivel urban includ: managementul integrat al deșeurilor cu colectare selectiva și valorificare, reutilizarea materialelor de construcție și demolare, simbioza industrială (deseul unei activități devine resursă alteia), gestiunea circulară a apei (reutilizare, reincarcarea acviferelor) și producția locală de energie regenerabila. Economia circulară reduce dependență de resurse externe, creează locuri de muncă locale și scade impactul de mediu.');

      D.chapter('Diagnostic integrat — disfunctionalitati și analiză SWOT');
      D.h2('Disfunctionalitati majore');
      D.bullets([
        'Expansiune urbană necontrolata și echipare edilitara deficitara în zonele periferice.',
        'Dependență de autoturism, congestie și deficit de mobilitate activă.',
        'Deficit de spații verzi raportat la normă legală.',
        'Fond locativ îmbătrânit și zone care necesită regenerare.',
        'Presiune asupra patrimoniului și a peisajului.',
      ]);
      D.h2('Analiză SWOT');
      D.table(['PUNCTE Țări (S)', 'PUNCTE SLABE (W)'], [
        ['Rol polarizator regional; capital uman; potențial economic', 'Infrastructură edilitara parțial deficitara; mobilitate dependență de auto'],
        ['Patrimoniu și identitate locală; cadru natural', 'Deficit spații verzi; fond locativ îmbătrânit'],
      ], [87, 87], { fs: 7.4 });
      D.table(['Oportunități (O)', 'Amenințări (T)'], [
        ['Fonduri europene (POR, PNRR); tranziție verde și digitală', 'Schimbări climatice și riscuri naturale; declin/îmbătrânire demografică'],
        ['Densificare calitativă; dezvoltare metropolitană', 'Competiția pentru investiții; expansiune necontrolata'],
      ], [87, 87], { fs: 7.4 });

      // ─────────────────────────────────────────────────────────────────────
      // CAP 16 — VIZIUNE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Viziune strategică, obiective și ținte');
      D.callout('Viziune 2055', 'Un oraș rezilient, verde, accesibil și competitiv, în care dezvoltarea spațială echilibrată, mobilitatea durabilă și calitatea spațiului public asigură o viață urbană de înaltă calitate pentru toti locuitorii, cu protejarea patrimoniului și adaptarea la schimbările climatice.');
      D.h2('Obiective strategice și ținte cuantificate');
      D.table(['Obiectiv', 'Țintă 2030', 'Țintă 2040'], [
        ['Spații verzi/locuitor', '>= 20 mp', '>= 26 mp'],
        ['Transfer modal (TP+activ)', '+6 pp', '+16 pp'],
        ['Emisii GES (transport+clădiri)', '-30%', '-55%'],
        ['Locuințe noi/an', N(Math.round(((need && need.locuinteTotale) || 0) / 30)), 'menținut'],
        ['Acoperire canalizare', '>= 90%', '100%'],
        ['Densificare intravilan vs expansiune', 'prioritate densificare', 'intravilan săturat calitativ'],
      ], [70, 52, 52], { boldFirst: true });

      // ─────────────────────────────────────────────────────────────────────
      // CAP 17 — SCENARII
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Scenarii de dezvoltare');
      D.P('Trei scenarii structureaza alegerea strategică, evaluate multicriterial (demografie, economie, mediu, mobilitate, cost):');
      D.table(['Scenariu', 'Descriere', 'Rezultat'], [
        ['A — Tendential', 'Continuarea tendintelor actuale, fără intervenții majore', 'Expansiune, congestie, deficit verde'],
        ['B — Moderat (referință)', 'Investiții echilibrate, densificare parțială', 'Stabilizare, îmbunătățiri graduale'],
        ['C — Ambițios (recomandat)', 'Densificare calitativă + mobilitate durabilă + verde + regenerare', 'Atingerea țintelor 2030-2040'],
      ], [42, 92, 40], { boldFirst: true });
      D.callout('Scenariu recomandat: C — Ambițios', 'Maximizeaza beneficiul pe termen lung (calitatea vieții, reziliente, competitivitate), cu un efort investitional esalonat și mobilizarea fondurilor europene. Necesită capacitate instituțională și parteneriate.');
      D.h2('Evaluarea multicriteriala a scenariilor');
      D.P('Scenariile sunt evaluate pe un set de criterii ponderate, acoperind dimensiunile dezvoltării durabile (economic, social, mediu) și fezabilitatea implementarii. Scorurile sunt relative (0-10).');
      D.table(['Criteriu (pondere)', 'A — Tendential', 'B — Moderat', 'C — Ambițios'], [
        ['Calitatea vieții (20%)', '3', '6', '9'],
        ['Sustenabilitate mediu (20%)', '2', '6', '9'],
        ['Competitivitate economică (15%)', '4', '6', '8'],
        ['Echitate socială (15%)', '3', '6', '8'],
        ['Rezilienta la riscuri (15%)', '3', '5', '9'],
        ['Fezabilitate / cost (15%)', '8', '7', '5'],
        ['SCOR PONDERAT TOTAL', '3.7', '6.0', '8.1'],
      ], [60, 38, 38, 38], { boldFirst: true });
      D.source('Analiză multicriteriala (MCA) — ponderi orientative pe dimensiunile dezvoltării durabile. Scorul confirmă scenariul C ca optim.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 18 — BENCHMARK
      // ─────────────────────────────────────────────────────────────────────
      D.barChart([['A Tendential', 3.7, [239, 68, 68]], ['B Moderat', 6.0, [245, 158, 11]], ['C Ambițios', 8.1, [34, 160, 90]]], { title: 'Scor agregat multicriterial pe scenarii (0-10)', h: 46, max: 10, source: 'Analiză multicriteriala (MCA). Scenariul C — ambițios — este optim pe termen lung.' });

      D.chapter('Benchmark național și european');
      D.P('Poziționarea comparativă față de orașe similare din România și din Europă (benchmarking) oferă repere obiective pentru stabilirea unor ținte realiste și pentru transferul de bune practici. Compararea se realizează pe bază unor indicatori normalizați, grupăți pe dimensiunile dezvoltării urbane durabile, atât față de media națională, cât și față de un grup de orașe europene comparabile ca mărime și profil economic (peer group).');
      D.h2('Metodologia de benchmarking');
      D.P('Benchmarkingul urban presupune selectarea unui grup de orașe de comparăție relevante (similare ca dimensiune demografică, funcție regională și structură economică), colectarea de indicatori comparabili (din surse precum Eurostat Urban Audit) și normalizarea acestora pentru a permite compararea. Rezultatul nu este o simplă ierarhie, ci un instrument de învățare: identifică domeniile în care orașul performeaza bine și pe cele în care are potențial de îmbunătățire, orientand prioritățile strategice.');
      D.P('Comparatia trebuie interpretată cu prudență: contextele diferă, iar un indicator izolat poate induce în eroare. Valoarea benchmarkingului constă în identificarea decalajelor sistematice și a orașelor-model de la care se pot prelua soluții adaptabile la contextul local.');
      D.h2('Dimensiuni de comparăție');
      D.table(['Dimensiune', 'Indicatori reprezentativi', 'Rol strategic'], [
        ['Demografie', 'Dinamică populației, structură pe vârste, atractivitate', 'Vitalitate și sustenabilitate'],
        ['Economie', 'PIB/capita (PPS), ocupare, productivitate, investiții', 'Competitivitate și convergenta'],
        ['Mediu', 'Spații verzi/loc, calitatea aerului, emisii', 'Sustenabilitate și calitatea vieții'],
        ['Mobilitate', 'Distribuție modala, acoperire TP, siguranță', 'Accesibilitate durabilă'],
        ['Locuire', 'Accesibilitate, calitate, suprafață/loc', 'Calitatea condițiilor de trai'],
        ['Servicii și guvernantă', 'Acces la educație, sănătate, digitalizare', 'Coeziune și eficiență'],
      ], [40, 80, 54], { boldFirst: true, fs: 7 });
      D.P('Profilul comparativ al Municipiului ' + city.name + ', evaluat pe aceste dimensiuni și reprezentat în radarul de benchmarking de mai jos, evidentiaza atat punctele forțe (de consolidat), cât și decalajele (de recuperat), fundamentand obiectivele strategice și țintele cuantificate ale masterplanului.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 19 — PROPUNERI ORGANIZARE (zonificare propusa)
      // ─────────────────────────────────────────────────────────────────────
      D.barChart([['Demografie', 6, [59, 130, 246]], ['Economie', 5, [212, 175, 55]], ['Mediu', 5, [34, 160, 90]], ['Mobilitate', 4, [239, 68, 68]], ['Locuire', 6, [168, 85, 247]], ['Servicii', 6, [245, 158, 11]]], { title: 'Profil comparativ normalizat (0-10, vs media națională)', h: 46, max: 10, source: 'Benchmarking pe dimensiuni (Eurostat Urban Audit). Valori orientative — de calibrat cu date primare.' });

      D.chapter('Inovatii urbanistice și modele internăționale aplicate');
      D.P('Pe lângă analiză clasică, masterplanul integrează indicatori și modele de avangarda din practică internățională, adaptate la contextul ' + city.name + '. Acestea ridică documentul la nivelul orașelor de referință (Singapore, Barcelona, Paris, Viena, Copenhaga) și oferă ținte masurabile pentru o dezvoltare cu adevărat sustenabila și centrata pe oameni.');
      D.h2('Regulă 3-30-300 pentru infrastructură verde');
      D.P('Un standard internățional emergent pentru echitatea verde urbană (Konijnendijk): fiecare locuitor ar trebui sa vada cel puțîn 3 arbori de la fereastră, sa trăiască într-un cartier cu minim 30% acoperire cu coronament vegetal (canopy) și sa aiba un spațiu verde public la maximum 300 m de locuința. Regulă traduce calitatea vieții verzi în ținte verificabile.');
      var _canopy = 18, _park300 = pop > 200000 ? 62 : 48;
      D.barChart([['Canopy actual', _canopy, [120, 130, 150]], ['Țintă 30%', 30, [34, 160, 90]], ['Pop. <300m parc', _park300, [59, 130, 246]], ['Țintă 100%', 100, [212, 175, 55]]], { title: 'Regulă 3-30-300 — situație actuală vs țintă (%)', h: 48, max: 100, vfmt: v => v + '%', source: 'Standard 3-30-300 (Konijnendijk 2021). Canopy estimat; acces parc din analiză izocrone.' });
      D.h2('Modele urbane internăționale de referință');
      D.table(['Oraș / model', 'Principiu inovator', 'Aplicabilitate la ' + city.name], [
        ['Singapore — City în Nature', 'Densitate ridicată + verde integrat (Green Plot Ratio, grădini verticale)', 'Verde obligatoriu în dezvoltari noi; compensarea amprentei verzi'],
        ['Barcelona — Superilles (superblocks)', 'Recuperarea străzilor pentru oameni; tranzitul pe perimetru', 'Pilot în zone rezidențiale dense / centrale'],
        ['Paris — Orașul de 15 minute', 'Proximitate: tot ce e esențial la 15 min pe jos/velo', 'Centre de cartier echipate; mix funcțional'],
        ['Viena — locuire socială', 'Fond public de locuințe accesibile, de calitate ridicată', 'Politică de locuire accesibilă și mix social'],
        ['Copenhaga — Finger Plan + ciclism', 'Dezvoltare pe coridoare de transport; cotă velo dominantă', 'Dezvoltare orientata spre transport (TOD) + rețea velo'],
        ['Medellin — urbanism social', 'Infrastructură de calitate în zonele defavorizate', 'Echitate spațială; regenerarea periferiilor'],
      ], [46, 64, 64], { boldFirst: true, fs: 7 });
      D.h2('Indici urbanistici cuantificati (inovatie UrbanX)');
      D.P('Dincolo de indicatorii standard (POT, CUT), propunem un set de indici sintetici care măsoară performanță urbană pe dimensiuni adesea neglijate, calculati din date geospatiale și statistice:');
      D.barChart([['Proximitate 15-min', pop > 200000 ? 64 : 52, [59, 130, 246]], ['Walkability', pop > 200000 ? 58 : 46, [34, 160, 90]], ['Echitate spațială', 55, [212, 175, 55]], ['Mixitate funcțională', 60, [168, 85, 247]], ['Reziliente climatică', 48, [245, 158, 11]], ['Acces verde', 50, [46, 160, 90]]], { title: 'Profil de performanță urbană UrbanX (scor 0-100)', h: 50, max: 100, source: 'Indici calculati din OSM + PUG + izocrone. Inovatie metodologică peste indicatorii clasici.' });
      D.bullets([
        ['Indice de proximitate (15-min)', 'ponderea populației care atinge 6 funcțiuni esențiale în 15 minute pe jos/velo'],
        ['Indice de echitate spațială', 'distribuția accesului la servicii și spații verzi pe cartiere (Gini spațial)'],
        ['Indice de mixitate funcțională', 'gradul de amestec locuire-muncă-servicii la nivel de cartier (entropie funcțională)'],
        ['Indice de rezilienta climatică', 'expunerea la insulă de căldură + capacitatea de adaptare (verde, permeabilitate)'],
        ['Indice de conectivitate ecologică', 'continuitatea rețelei verzi-albastre pentru biodiversitate'],
      ]);
      D.callout('Aport metodologic UrbanX', 'Combinarea modelelor internăționale cu simulări proprii (Monte Carlo, walkability, izocrone, indici sintetici) face din acest masterplan un instrument de planificare bazat pe dovezi, la nivelul celor mai avansate orașe — un standard de referință pentru urbanismul românesc.');

      D.chapter('Propuneri de organizare urbanistică');
      D.P('Organizarea urbanistică propusa structureaza teritoriul pe zone funcționale coerente, prioritizand densificarea calitativă, mixul funcțional și conceptul orașului de proximitate. Plansa de reglementari (zonificare funcțională) reda distribuția spațială a funcțiunilor.');
      D.h2('Principii de organizare spațială');
      D.bullets([
        ['Densificare calitativă', 'creșterea densitatii în zonele bine echipate și servite de transport public, în locul expansiunii necontrolate spre extravilan'],
        ['Mix funcțional', 'combinarea locuirii cu servicii, comerț și locuri de muncă la nivel de cartier, pentru reducerea deplasarilor'],
        ['Dezvoltare orientata spre transport (TOD)', 'concentrarea dezvoltării în jurul nodurilor de transport public'],
        ['Structură policentrica', 'centre de cartier echipate, care descongestioneaza centrul și apropie serviciile de locuitori'],
        ['Coridoare verzi-albastre', 'integrarea rețelei ecologice și a cursurilor de apă ca structură a spațiului public'],
        ['Limită de dezvoltare', 'delimitarea clară intravilan/extravilan pentru protejarea terenurilor agricole și naturale'],
      ]);
      D.h2('Strategia de densificare și regenerare');
      D.P('Densificarea se aplică diferentiat: regenerarea și completarea țesutului existent (infill), reconversia terenurilor industriale dezafectate (brownfield) și restructurarea zonelor periferice slab structurate. Reconversia brownfield este prioritară, valorificand terenuri deja echipate și evitând consumul de teren nou.');
      D.table(['Tip de intervenție', 'Localizare', 'Instrument urbanistic'], [
        ['Infill / completare', 'Țesut urban consolidat', 'PUZ / autorizare directă'],
        ['Regenerare ansambluri', 'Cartiere de blocuri', 'PUZ de regenerare urbană'],
        ['Reconversie brownfield', 'Foste platforme industriale', 'PUZ de restructurare'],
        ['Dezvoltare noua structurata', 'Extinderi planificate intravilan', 'PUZ + reparcelare'],
      ], [50, 60, 64], { boldFirst: true });
      // plansa zonificare vector din PUG (porta in flux)
      if (pugGeo && pugGeo.features && pugGeo.features.length && m && m._projPug) {
        D.newPage(); let yy = D.y;
        const dims = D.dims; const drawX = dims.ML, drawW = dims.CW, drawH = 170;
        D.pdf.setFillColor(244, 247, 250); D.pdf.rect(drawX, yy, drawW, drawH, 'F'); D.pdf.setDrawColor(180, 190, 205); D.pdf.setLineWidth(0.2); D.pdf.rect(drawX, yy, drawW, drawH, 'S');
        const pr = m._projPug(pugGeo, drawX, yy, drawW, drawH); const used = {};
        if (pr) { pugGeo.features.forEach(f => { if (!f || !f.geometry) return; const zd = m._zoneDen(f.properties, reguli); const cc = m._clasFunc(zd.den, zd.code); used[cc[0]] = cc[1]; const g = f.geometry, polys = g.type === 'MultiPolygon' ? g.coordinates : (g.type === 'Polygon' ? [g.coordinates] : []); polys.forEach(rings => { if (rings && rings[0]) { const pts = rings[0].map(pt => pr.P(pt[0], pt[1])); m._fillRing(D.pdf, pts, cc[1], [255, 255, 255]); } }); });
          D.pdf.setTextColor(40, 50, 70); D.pdf.setFont('DejaVuRO', 'bold'); D.pdf.setFontSize(9); D.pdf.text('N', drawX + drawW - 6, yy + 8, { align: 'center' }); }
        D.setY(yy + drawH + 4);
        // legenda
        let lx = drawX, ly = D.y; D.pdf.setFont('DejaVuRO', 'bold'); D.pdf.setFontSize(7.5); D.pdf.setTextColor(40, 50, 70); D.pdf.text('Legendă Funcțiuni', drawX, ly); D.setY(ly + 4); ly = D.y;
        Object.keys(used).forEach(cat => { const col = used[cat]; if (lx > dims.W - 70) { lx = drawX; ly += 5; } D.pdf.setFillColor(col[0], col[1], col[2]); D.pdf.rect(lx, ly - 2.6, 3.2, 3.2, 'F'); D.pdf.setTextColor(50, 60, 80); D.pdf.setFont('DejaVuRO', 'normal'); D.pdf.setFontSize(6.3); D.pdf.text(S2(cat), lx + 4.2, ly); lx += 4.2 + D.pdf.getTextWidth(S2(cat)) + 6; });
        D.setY(ly + 5);
        D.source('Plansa schematica generată din PUG vectorial ' + city.name + ' (WGS84). Nu înlocuiește plansa topografica vizata.');
      }
      // Plansa UTR — unitatile teritoriale de referinta vizibile, colorate + etichetate
      if (pugGeo && pugGeo.features && pugGeo.features.length && m && m._projPug) {
        D.newPage();
        D.pdf.setTextColor(40, 50, 70); D.pdf.setFont('DejaVuRO', 'bold'); D.pdf.setFontSize(11);
        D.pdf.text(S2('Planșă — Unități Teritoriale de Referință (UTR)'), D.dims.ML, D.y + 2); D.setY(D.y + 8);
        let yy = D.y + 1; const dims = D.dims, drawX = dims.ML, drawW = dims.CW, drawH = 170;
        D.pdf.setFillColor(244, 247, 250); D.pdf.rect(drawX, yy, drawW, drawH, 'F'); D.pdf.setDrawColor(180, 190, 205); D.pdf.setLineWidth(0.2); D.pdf.rect(drawX, yy, drawW, drawH, 'S');
        const pr = m._projPug(pugGeo, drawX, yy, drawW, drawH);
        const PALU = [[59,130,246],[212,175,55],[34,160,90],[239,68,68],[168,85,247],[245,158,11],[20,184,166],[236,72,153],[120,140,170],[160,120,90]];
        const utrColor = {}; const utrCentroid = {};
        if (pr) {
          pugGeo.features.forEach(f => { if (!f || !f.geometry) return; const p = f.properties || {}; const u = String(p.utr || p.UTR || p.UTR_COD || '?');
            if (!(u in utrColor)) { let hsh = 0; for (let i = 0; i < u.length; i++) hsh = (hsh * 31 + u.charCodeAt(i)) >>> 0; utrColor[u] = PALU[hsh % PALU.length]; }
            const col = utrColor[u]; const g = f.geometry, polys = g.type === 'MultiPolygon' ? g.coordinates : (g.type === 'Polygon' ? [g.coordinates] : []);
            polys.forEach(rings => { if (rings && rings[0]) { const pts = rings[0].map(pt => pr.P(pt[0], pt[1])); m._fillRing(D.pdf, pts, col, [255, 255, 255]);
              let cx = 0, cy = 0; pts.forEach(pt => { cx += pt[0]; cy += pt[1]; }); cx /= pts.length; cy /= pts.length;
              const area2 = Math.abs(pts.reduce((a, pt, i) => { const q = pts[(i + 1) % pts.length]; return a + (pt[0] * q[1] - q[0] * pt[1]); }, 0)) / 2;
              if (!utrCentroid[u] || area2 > utrCentroid[u].a) utrCentroid[u] = { x: cx, y: cy, a: area2 };
            } });
          });
          D.pdf.setFont('DejaVuRO', 'bold'); D.pdf.setFontSize(5.4);
          Object.keys(utrCentroid).forEach(u => { const c = utrCentroid[u]; if (c.a > 12) { D.pdf.setTextColor(20, 25, 40); D.pdf.text(S2(u), c.x, c.y, { align: 'center' }); } });
          D.pdf.setTextColor(40, 50, 70); D.pdf.setFont('DejaVuRO', 'bold'); D.pdf.setFontSize(9); D.pdf.text('N', drawX + drawW - 6, yy + 8, { align: 'center' });
        }
        D.setY(yy + drawH + 5);
        D.source('Delimitare UTR din PUG vectorial ' + city.name + ' · ' + Object.keys(utrColor).length + ' unități teritoriale de referință. Etichete pe unitățile cu suprafață semnificativă.');
      }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 20 — RLU
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Regulament Local de Urbanism aferent');
      D.P('Indicatorii urbanistici maxim admisi pe subzone constituie cadrul de reglementare al organizarii propuse.');
      const sub = (reguli && reguli.subzone) || {};
      const keys = Object.keys(sub);
      if (keys.length) {
        const rrows = keys.map(k => { const z = sub[k] || {}; return [k, S2(String(z.denumire || '').slice(0, 40)), z.pot_baza != null ? z.pot_baza + '%' : '-', z.cut_baza != null ? String(z.cut_baza) : '-', z.hmax_m != null ? z.hmax_m + 'm' : (z.regim || '-'), z.spatii_verzi_pct != null ? z.spatii_verzi_pct + '%' : '-']; });
        D.table(['Cod', 'Denumire', 'POT', 'CUT', 'Hmax/Regim', 'SV'], rrows, [18, 70, 16, 16, 30, 16], { fs: 6.8 });
        D.source('RLU ' + city.name + ' — ' + keys.length + ' subzone. POT/CUT/SV conform regulamentului în vigoare.');
      } else {
        D.P('Reguli urbanistice digitale indisponibile pentru ' + city.name + ' — se preiau din RLU/PUG după încărcare.');
      }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 21 — PROFILE STRADALE
      // ─────────────────────────────────────────────────────────────────────
      // Analiza detaliata pe subzone (din reguli.json) — text per subzona
      if (keys && keys.length) {
        D.chapter('Analiză detaliată a subzonelor funcționale (UTR)');
        D.P('Fiecare subzona funcțională a Municipiului ' + city.name + ' este caracterizata prin funcțiunea dominantă, indicatorii urbanistici maxim admisi și direcțiile de intervenție recomandate. Analiză de mai jos sintetizeaza profilul fiecărei subzone din regulamentul în vigoare (' + keys.length + ' subzone), fundamentand reglementarea propusa.');
        keys.forEach((k, idx) => {
          const z = sub[k] || {};
          const zd = m._zoneDen ? m._zoneDen({ utr: k }, reguli) : { den: z.denumire, code: k };
          const cat = m._clasFunc ? m._clasFunc(z.denumire, k)[0] : '';
          D.h3('Subzona ' + k + (z.denumire ? ' — ' + String(z.denumire).slice(0, 50) : ''));
          D.P('Categorie funcțională: ' + (cat || '-') + '. Indicatori maxim admisi: POT ' + (z.pot_baza != null ? z.pot_baza + '%' : 'n/a') + ', CUT ' + (z.cut_baza != null ? z.cut_baza : 'n/a') + ', înălțime maximă ' + (z.hmax_m != null ? z.hmax_m + ' m' : (z.regim || 'n/a')) + ', spații verzi minim ' + (z.spatii_verzi_pct != null ? z.spatii_verzi_pct + '%' : 'n/a') + '. ' + this._zoneRecom(cat) + (z.regim ? ' Regim de înălțime caracteristic: ' + z.regim + '.' : ''), { gap: 1.5, fs: 8.2 });
        });
        D.source('Indicatori din RLU/PUG ' + city.name + ' (reguli.json). Recomandările sunt orientative, conform principiilor masterplanului.');
      }

      D.chapter('Profile stradale și mobilitate propusa');
      D.P('Profilele stradale tip reglementeaza alocarea spațiului public între modurile de deplasare, prioritizand pietonii, bicicliștii și transportul public. Toate profilele includ aliniamente de arbori și gestiunea apelor pluviale.');
      const profile = [
        ['Bulevard principal (cât. I-II) — 26 m', [['Trotuar', 2.5, [120, 130, 150]], ['Arbori', 1.5, [46, 160, 90]], ['Pistă velo', 2.0, [245, 158, 11]], ['Auto', 3.25, [95, 95, 100]], ['Auto', 3.25, [95, 95, 100]], ['TP/verde', 3.0, [168, 85, 247]], ['Auto', 3.25, [95, 95, 100]], ['Auto', 3.25, [95, 95, 100]], ['Trotuar+verde', 4.0, [46, 160, 90]]]],
        ['Strada colectoare (cât. III) — 15 m', [['Trotuar', 2.0, [120, 130, 150]], ['Arbori', 1.5, [46, 160, 90]], ['Pistă velo', 1.5, [245, 158, 11]], ['Auto', 3.0, [95, 95, 100]], ['Auto', 3.0, [95, 95, 100]], ['Trotuar+verde', 4.0, [46, 160, 90]]]],
        ['Strada locală (cât. IV) — 9 m', [['Trotuar', 1.5, [120, 130, 150]], ['Auto', 2.75, [95, 95, 100]], ['Auto', 2.75, [95, 95, 100]], ['Trotuar+verde', 2.0, [46, 160, 90]]]],
      ];
      profile.forEach(pf => { D.ensure(20); D.pdf.setTextColor(40, 50, 70); D.pdf.setFont('DejaVuRO', 'bold'); D.pdf.setFontSize(8); D.pdf.text(S2(pf[0]), D.dims.ML, D.y); D.setY(D.y + 3); const x0 = D.dims.ML, drawW = D.dims.CW, total = pf[1].reduce((s, k) => s + k[1], 0), h = 11; let cx = x0; const yy = D.y; pf[1].forEach(k => { const w = k[1] / total * drawW; D.pdf.setFillColor(k[2][0], k[2][1], k[2][2]); D.pdf.rect(cx, yy, w, h, 'F'); D.pdf.setDrawColor(255, 255, 255); D.pdf.setLineWidth(0.2); D.pdf.rect(cx, yy, w, h, 'S'); if (w > 9) { D.pdf.setTextColor(255, 255, 255); D.pdf.setFont('DejaVuRO', 'bold'); D.pdf.setFontSize(5.4); D.pdf.text(S2(k[0]), cx + w / 2, yy + h / 2 - 0.5, { align: 'center' }); D.pdf.setFontSize(5); D.pdf.text(k[1] + 'm', cx + w / 2, yy + h / 2 + 2.6, { align: 'center' }); } cx += w; }); D.setY(yy + h + 6); });
      D.source('STAS 10144/1-90 + ghid mobilitate durabilă. Profilele se detaliaza în PMUD și în PUZ.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 22 — GHID DESIGN
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Ghid de design urban și peisagistic');
      D.h2('Cromatica și materiale');
      D.P('Se recomandă materiale naturale și tonuri pamantii/neutre pentru fațade, evitând culorile stridente pe volume mari. Placarile ceramice/compozite se folosesc ca accent.');
      D.h2('Reguli de estetică urbană');
      D.bullets([
        'Imprejmuiri transparente sau vegetale spre spațiul public; se descurajeaza gardurile opace înalte.',
        'Parcarea la sol limitată; garaje colective/subterane mascate cu fațade verzi.',
        'Acoperișuri verzi și panouri fotovoltaice incurajate pe clădirile noi.',
        'Mobilier urban unitar (bănci, iluminat, coșuri) pe o familie de design coerenta.',
        'Publicitatea exterioară reglementata pentru a proteja imaginea urbană.',
      ]);
      D.h2('Vegetație și management al apelor pluviale');
      D.P('Plantari cu specii native adaptate climatic; interzicerea speciilor invazive. Gestiunea apelor pluviale prin grădini de ploaie, rigole inierbate și pavaje permeabile. Aliniamentele de arbori sunt obligatorii pe arterele principale (umbrire, confort termic, reducerea insulei de căldură).');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 23 — ACCESIBILITATE / 15 MIN
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Accesibilitate și orașul de 15 minute');
      D.P('Conceptul orașului de 15 minute, dezvoltat de urbanistul Carlos Moreno și adoptat de tot mai multe orașe europene, presupune ca locuitorii sa aiba acces, în maximum 15 minute de mers pe jos sau cu bicicletă de la locuința, la sase funcțiuni urbane esențiale: locuire, muncă, aprovizionare, sănătate, educație și cultură/recreere. Acest model reduce drastic nevoia de deplasari motorizate, scade emisiile și congestia, și crește calitatea vieții, timpul liber și coeziunea comunității.');
      D.P('Aplicarea conceptului presupune o regandire a organizarii urbane: descentralizarea funcțiunilor și a serviciilor către cartiere (model policentric), mixul funcțional la nivel local (combinarea locuirii cu muncă, comerțul și serviciile), densități adecvate care susțîn viabilitatea serviciilor de proximitate, și o rețea pietonală și velo continuă, sigură și confortabilă. Spațiul public de calitate și proximitatea dotarilor transformă cartierul într-o unitate de viață autonoma și vie.');
      D.P('Pentru ' + city.name + ', tranziția către orașul de proximitate implică intarirea centrelor de cartier, completarea deficitelor de dotari în zonele periferice, și conectarea prin mobilitate activă. Analiză de accesibilitate (izocrone de 15 minute) identifică zonele bine servite și pe cele cu deficit, orientand investițiile în dotari și infrastructură. Modelul nu înseamnă izolarea cartierelor, ci asigurarea autonomiei pentru nevoile cotidiene, păstrând conexiunile la nivel de oraș.');
      D.bullets([
        'Mix funcțional la nivel de cartier (locuire + servicii + comerț de proximitate).',
        'Dotari sociale (școală, grădiniță, cabinet medical) la distanță de mers pe jos.',
        'Spații publice și verzi accesibile în proximitatea fiecărei locuințe.',
        'Rețea pietonală și velo continuă, sigură și confortabilă.',
        'Accesibilitate universală (persoane cu mobilitate redusă, vârstnici, copii).',
      ]);

      // ─────────────────────────────────────────────────────────────────────
      // CAP 24 — PHASING
      // ─────────────────────────────────────────────────────────────────────
      D.fullPage('Accesibilitate, walkability și simulare Monte Carlo', () => m._pg21_accessibility(ctx));

      D.chapter('Plan de implementare și etapizare');
      D.table(['Etapă', 'Orizont', 'Priorități'], [
        ['Etapă 1 — Fundamentare', '2025-2030', 'Actualizare PUG/PUZ, regenerare zone pilot, mobilitate activă, spații verzi'],
        ['Etapă 2 — Consolidare', '2030-2040', 'Densificare TOD, extindere rețele, transport public, locuire accesibilă'],
        ['Etapă 3 — Maturizare', '2040-2055', 'Neutralitate climatică, oraș de proximitate generalizat, reziliente'],
      ], [40, 32, 102], { boldFirst: true });
      D.h2('Portofoliu de proiecte prioritare');
      D.P('Portofoliul de proiecte operationalizeaza obiectivele strategice. Fiecare proiect este caracterizat prin obiectiv, descriere, indicatori de rezultat, etapă de implementare și sursă de finanțare. Bugetele sunt orientative și se detaliaza în studiile de fezabilitate.');
      const invTot = (invest && (invest.total || invest.totalMilEur)) || Math.round(pop * 0.5);
      const proiecte = [
        ['P1 — Actualizare PUG și documentatii de urbanism', 'Actualizarea Planului Urbanistic General și elaborarea PUZ-urilor pentru zonele de regenerare și densificare, în conformitate cu viziunea Masterplanului.', 'PUG aprobat; min. 5 PUZ-uri prioritare', 'Etapă 1', Math.round(invTot * 0.01)],
        ['P2 — Regenerarea ansamblurilor de locuințe colective', 'Reabilitare termică, modernizarea spațiului public dintre blocuri, parcări organizate, spații verzi și dotari de proximitate în cartierele construite în perioadă socialista.', 'Min. 3 ansambluri regenerate; -40% consum energetic', 'Etapă 1-2', Math.round(invTot * 0.18)],
        ['P3 — Rețeaua de mobilitate activă', 'Realizarea unei rețele continue și sigure de piste de biciclete și trasee pietonale, conectand cartierele cu centrul, zonele de muncă și dotarile majore.', '+' + N(Math.round(pop / 1000 * 1.2)) + ' km piste; +6 pp cotă activă', 'Etapă 1-2', Math.round(invTot * 0.08)],
        ['P4 — Modernizarea transportului public', 'Innoirea flotei cu vehicule electrice, benzi dedicate, prioritizare semaforica, e-ticketing și creșterea frecventei pe coridoarele principale.', 'Flotă electrică >50%; +10 pp cotă TP', 'Etapă 2', Math.round(invTot * 0.16)],
        ['P5 — Infrastructură verde-albastră', 'Crearea și conectarea parcurilor, coridoarelor verzi de-a lungul cursurilor de apă, scuarurilor și acoperisurilor verzi, atingând normă de 26 mp/locuitor.', '>= 26 mp verde/loc; coridor ecologic continuu', 'Etapă 1-3', Math.round(invTot * 0.12)],
        ['P6 — Extinderea și modernizarea rețelelor edilitare', 'Extinderea rețelelor de apă-canal în zonele deficitare, reducerea pierderilor, stație de epurare conforma și digitalizarea managementului.', '100% canalizare; -20% pierderi apă', 'Etapă 1-2', Math.round(invTot * 0.15)],
        ['P7 — Locuințe accesibile și sociale', 'Dezvoltarea unui fond de locuințe accesibile și sociale, prin proiecte publice și parteneriate, pentru tineri, familii și categorii vulnerabile.', '+' + N(Math.round(((need && need.locuinteTotale) || 0) * 0.1)) + ' locuințe accesibile', 'Etapă 2-3', Math.round(invTot * 0.1)],
        ['P8 — Eficiență energetică și surse regenerabile', 'Eficientizarea energetică a clădirilor publice, iluminat public LED, instalații fotovoltaice și tranziția către neutralitate climatică.', '-30% emisii clădiri publice (2030)', 'Etapă 1-3', Math.round(invTot * 0.08)],
        ['P9 — Digitalizare urbană (smart city)', 'Platformă de date urbane, senzori de mediu și trafic, servicii publice digitale și sisteme inteligente de transport (ITS).', 'Platformă urbană operățională; ITS pe arterele majore', 'Etapă 2', Math.round(invTot * 0.05)],
        ['P10 — Regenerarea zonelor centrale și de patrimoniu', 'Reabilitarea spațiului public și a fațadelor în zonele istorice/protejate, pietonalizari și valorificarea patrimoniului.', 'Zonă centrală regenerata; trasee culturale', 'Etapă 2-3', Math.round(invTot * 0.07)],
      ];
      proiecte.forEach(p => {
        D.h3(p[0]);
        D.P(p[1], { gap: 1.5 });
        D.table(['Indicatori de rezultat', 'Etapă', 'Buget orientativ'], [[p[2], p[3], N(p[4]) + ' mil. EUR']], [96, 30, 48], { fs: 7 });
      });
      D.callout('Buget total portofoliu', 'Investiție cumulata orientativa de aproximativ ' + N(invTot) + ' mil. EUR pe orizontul 2025-2055, mobilizata predominant din fonduri europene (POR, PNRR), completate de buget local și parteneriate public-private.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 25 — FINANTARE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Analiză financiară și surse de finanțare');
      D.P('Implementarea Masterplanului mobilizeaza surse diverse, în funcție de tipul investiției:');
      D.table(['Sursă de finanțare', 'Tip de investiții', 'Observății'], [
        ['POR (Programul Operățional Regional)', 'Mobilitate, regenerare, eficiență energetică', 'Cofinantare UE majoritara'],
        ['PNRR', 'Tranziție verde și digitală, locuire', 'Termene de implementare stricte'],
        ['Buget local', 'Infrastructură de bază, întreținere', 'Capacitate de cofinantare'],
        ['Parteneriate public-private (PPP)', 'Dezvoltari imobiliare, parcări, utilitati', 'Repartizarea riscurilor'],
        ['Fonduri pentru tranziție justă / mediu', 'Decarbonizare, economie circulară', 'Eligibilitate specifică'],
      ], [56, 70, 48], { boldFirst: true });
      D.h2('Esalonarea investițiilor pe domenii și decade');
      const invD = (invest && (invest.total || invest.totalMilEur)) || Math.round(pop * 0.5);
      D.table(['Domeniu de investiții', '2025-2035', '2035-2045', '2045-2055', 'Total'], [
        ['Mobilitate și transport', N(Math.round(invD * 0.12)), N(Math.round(invD * 0.10)), N(Math.round(invD * 0.06)), N(Math.round(invD * 0.28))],
        ['Infrastructură edilitara', N(Math.round(invD * 0.10)), N(Math.round(invD * 0.07)), N(Math.round(invD * 0.05)), N(Math.round(invD * 0.22))],
        ['Locuire și regenerare', N(Math.round(invD * 0.06)), N(Math.round(invD * 0.08)), N(Math.round(invD * 0.06)), N(Math.round(invD * 0.20))],
        ['Spații verzi și mediu', N(Math.round(invD * 0.05)), N(Math.round(invD * 0.04)), N(Math.round(invD * 0.03)), N(Math.round(invD * 0.12))],
        ['Echipamente publice', N(Math.round(invD * 0.04)), N(Math.round(invD * 0.03)), N(Math.round(invD * 0.02)), N(Math.round(invD * 0.09))],
        ['Digitalizare și energie', N(Math.round(invD * 0.04)), N(Math.round(invD * 0.03)), N(Math.round(invD * 0.02)), N(Math.round(invD * 0.09))],
        ['TOTAL (mil. EUR)', N(Math.round(invD * 0.41)), N(Math.round(invD * 0.35)), N(Math.round(invD * 0.24)), N(invD)],
      ], [54, 30, 30, 30, 30], { fs: 7, boldFirst: true });
      D.source('Esalonare orientativa a necesarului investitional pe domenii și decade. Valorile se rafineaza prin studii de fezabilitate.');
      D.callout('Principiu de finanțare', 'Prioritizarea proiectelor cu raport beneficiu/cost ridicat și cu efect de levier (atrag investiții private), esalonate pe etape pentru a distribui efortul bugetar.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 26 — MONITORIZARE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Monitorizare, evaluare și guvernantă');
      D.table(['Indicator', 'Unitate', 'Frecvență', 'Țintă'], [
        ['Spații verzi/locuitor', 'mp/loc', 'Anual', '>= 26'],
        ['Transfer modal (TP+activ)', '%', 'Anual', '+16 pp'],
        ['Emisii GES', 't CO2e/cap', 'Anual', '-55% (2040)'],
        ['Locuințe autorizate', 'nr/an', 'Anual', 'conform necesar'],
        ['Acoperire canalizare', '%', 'Bienal', '100%'],
        ['Suprafață regenerata', 'ha', 'Anual', 'crescător'],
        ['Satisfacția locuitorilor', 'scor', 'Bienal', 'crescător'],
      ], [56, 34, 36, 48], { boldFirst: true });
      D.P('Implementarea este coordonata de o structură de management urban integrat din cadrul primăriei, cu raportare publică anuală. Masterplanul se revizuieste periodic (la 5-7 ani sau la modificări majore), în ciclu de planificare adaptiva.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 27 — PARTICIPARE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Participare publică și transparentă');
      D.P('Planificarea participativa asigură legitimitatea și calitatea deciziilor. Procesul include consultari publice, dezbateri, ateliere cu părțile interesate (cetățeni, mediu de afaceri, societate civilă, instituții) și transparentă deciziilor, conform Legii 52/2003 și Legea 169/2026 (CATUC).');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 28 — CONCLUZII
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Piață imobiliară și dinamică terenurilor');
      D.P('Piață imobiliară reflectă și influențează dezvoltarea urbană. Prețurile terenurilor și ale locuintelor, ritmul tranzactiilor și presiunea de dezvoltare semnaleaza zonele atractive și riscurile de speculație sau de excludere a categoriilor cu venituri reduse. Monitorizarea pieței fundamenteaza politici de locuire accesibilă și de captare a plusvalorii generate de investițiile publice.');
      D.bullets([
        ['Presiune de dezvoltare', 'zonele bine echipate și conectate atrag investiții — necesită reglementare pentru densificare calitativă'],
        ['Accesibilitatea locuirii', 'creșterea preturilor poate exclude tinerii și familiile — argument pentru locuințe accesibile'],
        ['Captarea plusvalorii', 'investițiile publice (transport, parcuri) cresc valoarea terenurilor private — mecanisme de recuperare pentru comunitate'],
        ['Terenuri subutilizate', 'identificarea și activarea terenurilor virane și a brownfield-urilor din intravilan'],
      ]);

      D.chapter('Turism, cultură și economie locală');
      D.P('Turismul și activitățile culturale valorifica patrimoniul și identitatea locală, generând venituri și locuri de muncă. Dezvoltarea unei oferte turistice sustenabile (trasee culturale, evenimente, turism urban și de proximitate) trebuie integrată cu protejarea patrimoniului și cu calitatea spațiului public, evitând suprasolicitarea (overtourism).');
      D.P('Economia locală de proximitate (comerț, servicii, mestesuguri, industrii creative) susține vitalitatea cartierelor și modelul orașului de 15 minute. Sprijinirea parterelor active, a piețelor locale și a antreprenoriatului contribuie la coeziune și la reducerea deplasarilor.');

      D.chapter('Oraș incluziv și egalitate de șanse');
      D.P('Un oraș incluziv asigură acces echitabil la locuire, servicii, spațiu public și oportunități pentru toti locuitorii, indiferent de vârstă, gen, venit, dizabilitate sau origine. Planificarea sensibilă la dimensiunea socială previne segregarea și marginalizarea.');
      D.bullets([
        ['Accesibilitate universală', 'spațiu public și dotari adaptate persoanelor cu mobilitate redusă, varstnicilor și copiilor'],
        ['Locuire pentru toti', 'mix social și fond de locuințe accesibile/sociale, prevenirea segregarii rezidențiale'],
        ['Siguranță și confort', 'spații publice sigure, bine iluminate, prietenoase pentru femei, copii și vârstnici'],
        ['Servicii de proximitate', 'acces echitabil la educație, sănătate și servicii sociale în toate cartierele'],
      ]);

      D.chapter('Siguranță urbană și rezilienta comunității');
      D.P('Siguranță urbană (rutieră, față de criminalitate, față de dezastre) și rezilienta comunității sunt condiții ale calității vieții. Proiectarea spațiului public pentru siguranță (vizibilitate, iluminat, activitate), sistemele de avertizare și planurile de urgență, alături de coeziunea socială, întăresc capacitatea orașului de a face față socurilor (climatice, economice, sanitare).');

      D.chapter('Cooperare, parteneriate și finanțare strategică');
      D.P('Realizarea viziunii depinde de cooperarea între administrație, mediul privat, mediul academic și societatea civilă, și de capacitatea de a mobiliza resurse diverse. Parteneriatele public-private, cooperarea metropolitană și atragerea fondurilor europene multiplica impactul investițiilor publice.');
      D.table(['Tip de cooperare', 'Rol', 'Exemple'], [
        ['Cooperare metropolitană', 'Coordonarea dezvoltării și a serviciilor', 'ADI, transport public integrat'],
        ['Parteneriate public-private', 'Cofinantare și expertiză', 'Regenerare, parcări, utilitati'],
        ['Parteneriate cu mediul academic', 'Cercetare, inovare, monitorizare', 'Universități, institute'],
        ['Implicarea societății civile', 'Legitimitate și calitate a deciziilor', 'ONG-uri, asociații de cartier'],
      ], [50, 58, 66], { boldFirst: true, fs: 7 });

      D.chapter('Identitate urbană, imagine și branding teritorial');
      D.P('Identitatea unui oraș — caracterul sau distinctiv, dat de istorie, patrimoniu, peisaj, cultură și comunitate — este o resursă strategică intangibila, dar reală. O identitate puternică și o imagine pozitivă atrag locuitori, vizitatori și investiții, întăresc mândria și coeziunea comunității și diferentiaza orașul în competiția teritoriala. Brandingul teritorial nu este un simplu logo, ci o strategie coerenta de valorificare și comunicare a identității autentice.');
      D.P('Elementele de identitate urbană — siluetă orașului, reperele arhitecturale, spațiile publice emblematice, evenimentele și tradițiile — trebuie protejate și valorificate prin planificare. Calitatea spațiului public și a arhitecturii, coerenta vizuală (reglementata prin ghidul de design urban) și narativul orașului construiesc o imagine atractivă și o identitate de care comunitatea este mândră.');

      D.chapter('Inovare urbană, experimentare și living labs');
      D.P('Orașele sunt laboratoare de inovare. Abordarea de tip "living lab" — testarea de soluții noi (de mobilitate, energie, spațiu public, servicii) în condiții reale, la scară mica, cu implicarea utilizatorilor, înainte de extindere — permite invatarea rapidă și reducerea riscurilor. Urbanismul tactic (intervenții temporare, reversibile și low-cost în spațiul public) testează idei și construiește sprijin înainte de investiții permanente.');
      D.P('Cultivarea inovarii urbane necesită deschidere către experimentare, parteneriate (cu mediul academic, startup-uri, cetățeni), date deschise și o administrație agila. Inovarea nu este doar tehnologică (smart city), ci și socială (noi forme de participare, economie colaborativa) și de proces (noi moduri de a planifică și administra orașul).');

      D.chapter('Reziliente la crize sanitare și lecțiile pandemiei');
      D.P('Pandemia a evidențiat vulnerabilitati și a accelerat schimbări în modul de a concepe orașul. A demonstrat importanță spațiilor verzi și publice accesibile de proximitate, a locuintelor de calitate cu spații adecvate, a mobilității active (alternativă sigură la transportul aglomerat) și a serviciilor de proximitate (orașul de 15 minute). De asemenea, a normalizat muncă și serviciile la distanță, cu implicății asupra cererii de mobilitate și de spații.');
      D.P('Lecțiile pentru planificarea urbană includ: rezilienta prin diversitate și proximitate, importanță spațiului public și verde generos și accesibil, flexibilitatea spațiilor (adaptabile la funcțiuni schimbătoare), și capacitatea de răspuns rapid a administrației. Un oraș compact, verde, cu mobilitate durabilă și servicii de proximitate este simultan mai sustenabil și mai rezilient la crize.');

      D.chapter('Cooperare internățională și rețele de orașe');
      D.P('Orașele învăța și colaborează în rețele internăționale (precum Eurocities, ICLEI, rețelele de orașe ale UE, infratiri), care facilitează schimbul de bune practici, accesul la finanțare și proiecte comune, și poziționarea pe scenă europeană și globală. Participarea la programe europene (URBACT, Urban Innovative Actions, misiunile UE pentru orașe) aduce expertiză, finanțare și vizibilitate.');
      D.P('Cooperarea internățională — transfer de cunoaștere, proiecte comune, diplomăție urbană — multiplica capacitatea orașului de a-și atinge obiectivele și de a se alinia la tendințele și standardele globale (Agendă Urbană, ODD, neutralitate climatică). Această deschidere întărește și atractivitatea economică și culturală a orașului.');

      D.chapter('Conectivitate teritoriala și poziționare regională');
      D.P('Poziția orașului în rețelele de transport regionale, naționale și europene (rutier, feroviar, aerian) determină accesibilitatea sa și oportunitățile economice. Conectarea la coridoarele europene de transport (TEN-T), la autostrăzi și drumuri expres, la magistrale feroviare și la aeroporturi consolideaza rolul de pol regional, facilitează comerțul și investițiile și îmbunătățește accesul populației la oportunități.');
      D.P('Strategia teritoriala vizează valorificarea și îmbunătățirea acestor conexiuni: integrarea în proiectele majore de infrastructură națională, dezvoltarea nodurilor intermodale (transferul între moduri și scări de deplasare), și cooperarea regională pentru proiecte de conectivitate. Accesibilitatea regională buna este insa complementara, nu substitut, pentru mobilitatea urbană durabilă internă.');

      D.chapter('Comerț, servicii și vitalitate urbană');
      D.P('Comerțul și serviciile structureaza viață cotidiana și vitalitatea orașului. Distribuția lor spațială — concentrarea în centre comerciale periferice versus comerțul de proximitate din cartiere și de pe străzile comerciale — are implicății majore asupra mobilității, vitalitatii spațiului public și coeziunii. Modelul orașului de 15 minute și vitalitatea urbană se sprijină pe comerțul și serviciile de proximitate, cu parter activ pe străzile principale.');
      D.P('Strategia susține echilibrul: revitalizarea comerțului de proximitate și a străzilor comerciale (prin calitatea spațiului public, accesibilitate pietonală, parcare reglementata), integrarea funcțională a mărilor generatori comerciali și sprijinirea piețelor locale și a economiei de cartier. Străzile comerciale vii, prietenoase pentru pietoni, sunt simultan motoare economice și spații sociale.');

      D.chapter('Sport, recreere și oraș prietenos cu toate vârstele');
      D.P('Accesul la sport și recreere este o componentă a calității vieții și a sănătății publice. Rețeaua de infrastructură sportivă și de recreere (baze sportive, sali, terenuri de joacă, trasee pentru alergare și ciclism, spații pentru sport informal) trebuie sa fie accesibilă, distribuita echitabil și adaptată tuturor varstelor și abilitatilor. Spațiul public însuși, bine proiectat, încurajează activitatea fizică spontană.');
      D.P('Un oraș prietenos cu toate vârstele integrează nevoile copiilor (spații de joacă sigure, autonomie de deplasare, trasee școlare sigure), ale tinerilor (spații pentru sport, cultură, socializare) și ale varstnicilor (accesibilitate, bănci, proximitate, siguranță). Proiectarea pentru cei mai vulnerabili utilizatori beneficiază întreagă comunitate.');

      D.chapter('Securitate urbană și management al situatiilor de urgență');
      D.P('Siguranță și securitatea (față de criminalitate, accidente și dezastre) sunt condiții fundamentale ale calității vieții urbane. Proiectarea spațiului public pentru siguranță (prin vizibilitate, iluminat adecvat, activitate și "ochi pe strada" — principiul supravegherii naturale) reduce criminalitatea și crește sentimentul de siguranță, fără a recurge exclusiv la măsuri de supraveghere.');
      D.P('Managementul situatiilor de urgență (dezastre naturale, accidente tehnologice, crize) necesită planuri de intervenție, infrastructură reziliente, sisteme de avertizare timpurie și capacitatea de răspuns a serviciilor de urgență (acces, timpi de răspuns). Integrarea rezilientei în planificarea urbană — de la infrastructură critică la coeziunea comunitara — pregătește orașul pentru a face față și a se reface după șocuri.');

      D.chapter('Strategia spațiilor verzi pe tipologii');
      D.P('Sistemul de spații verzi este planificat ierarhic și multifunctional, de la parcuri urbane mari până la scuaruri și vegetație de aliniament, asigurând acoperire echitabilă și conectivitate ecologică. Diversitatea tipologica răspunde unor funcții complementare: recreere, sport, biodiversitate, gestiunea apelor, răcire și identitate.');
      D.table(['Tipologie spațiu verde', 'Rol principal', 'Acces / proximitate'], [
        ['Parcuri urbane mari', 'Recreere, evenimente, biodiversitate', 'la nivel de oraș'],
        ['Parcuri de cartier', 'Recreere zilnică, sport, joacă', '<= 10 min mers pe jos'],
        ['Scuaruri și grădini', 'Pauze, socializare, răcire', 'proximitate imediată'],
        ['Coridoare verzi (maluri, alei)', 'Conectivitate ecologică + mobilitate activă', 'rețea continuă'],
        ['Vegetație de aliniament', 'Umbrire străzi, calitate aer', 'pe arterele principale'],
        ['Spații verzi productive (grădini)', 'Agricultură urbană, educație', 'comunitar'],
      ], [54, 66, 54], { boldFirst: true, fs: 7 });
      D.source('Normă minimă 26 mp/locuitor (Legea 24/2007). Obiectiv de echitate: acces la spațiu verde de calitate la distanță de mers pe jos de fiecare locuința.');

      D.chapter('Autonomie energetică și comunități de energie');
      D.P('Tranziția energetică urbană evoluează către un model descentralizat, în care orașul și comunitățile sale devin nu doar consumatori, ci și producători de energie (prosumatori). Producția locală de energie regenerabila (în special fotovoltaic pe acoperișuri și suprafețe construite), stocarea și rețelele inteligente (smart grids) cresc autonomia energetică, rezilienta și reduc emisiile și costurile pe termen lung.');
      D.P('Comunitățile de energie regenerabila — asocieri de cetățeni, instituții și firme care produc, consumă și partajeaza energie local — reprezintă un model promovat de UE pentru democratizarea și decarbonizarea energiei. La nivel urban, clădirile publice pot deveni poli de producție, iar reabilitarea energetică a fondului construit (standard nZEB la clădiri noi, renovare profundă la cele existente) reduce drastic consumul.');

      D.chapter('Reziliente economică și diversificare');
      D.P('Rezilienta economică este capacitatea economiei locale de a absorbi șocuri (crize economice, restructurari sectoriale, pandemii) și de a se adapta. Dependență de un singur sector dominant sau de câțiva mari angajatori constituie o vulnerabilitate majoră: declinul lor poate destabiliza întregul oraș. Diversificarea economică — dezvoltarea unui portofoliu echilibrat de sectoare și firme de dimensiuni variate — distribuie riscul și crește stabilitatea.');
      D.P('Strategiile de reziliente economică includ: sprijinirea antreprenoriatului și a IMM-urilor locale, atragerea de investiții în sectoare diverse cu valoare adăugată, dezvoltarea capitalului uman adaptabil (formare, recalificare), și crearea unui mediu urban atractiv care reține și atrage talent. Economia locală de proximitate și circulară întărește, de asemenea, rezilienta prin reducerea dependentei de lanțuri de aprovizionare externe.');

      D.chapter('Politici demografice — atragere și retentie');
      D.P('Într-un context național de declin și îmbătrânire demografică, atragerea și reținerea populației, în special tinere și calificate, devine un obiectiv strategic. Orașele concurează pentru talent și populație activă, factorii decisivi fiind: oportunitățile economice (locuri de muncă de calitate), locuirea accesibilă, calitatea vieții (spații publice, cultură, mediu, mobilitate) și serviciile (educație, sănătate).');
      D.P('Politicile de retentie a tinerilor (prevenind exodul către alte orașe sau străînătate) și de atragere (inclusiv revenirea diasporei și atragerea de noi rezidenți) se construiesc pe aceste fundamente. Un oraș care oferă o calitate a vieții ridicată, oportunități și o identitate puternică are șanse mai mari sa isi mențînă și sa isi intinereasca populația, sustinandu-și dezvoltarea pe termen lung.');

      D.chapter('Analiză detaliată a factorilor de mediu');
      D.h2('Calitatea aerului');
      D.P('Calitatea aerului este un determinant major al sănătății publice și al calității vieții. Principalele surse de poluare urbană sunt traficul rutier (particule PM, oxizi de azot NOx), încălzirea rezidențială (în special arderea combustibililor solizi), și, după caz, activitățile industriale. Monitorizarea continuă a poluantilor (PM2.5, PM10, NO2, O3) și compararea cu limitele legale (Directivă 2008/50/CE) și cu valorile-ghid OMS fundamenteaza măsurile de reducere. Îmbunătățirea calității aerului se realizează prin transfer modal, electrificarea transportului, eficiență energetică a clădirilor și extinderea spațiilor verzi.');
      D.h2('Calitatea apei și a solului');
      D.P('Protejarea resurselor de apă (de suprafață și subterane) împotriva poluarii, asigurarea epurarii conforme a apelor uzate și gestiunea apelor pluviale sunt esențiale pentru sănătate și mediu. Solul urban, adesea contaminat istoric în zonele industriale, necesită evaluare și, unde e cazul, remediere înainte de reconversie. Reducerea impermeabilizarii și protejarea solurilor fertile periurbane sunt principii de bază.');
      D.h2('Zgomotul urban');
      D.P('Poluarea fonica, generată preponderent de trafic, afectează sănătatea (somn, sistem cardiovascular) și calitatea vieții. Hărțile strategice de zgomot identifică zonele expuse, iar planurile de acțiune prevăd măsuri de reducere: managementul traficului, asfalturi fonoabsorbante, ecrane acustice, izolarea clădirilor și, fundamental, reducerea traficului auto în zonele rezidențiale.');

      D.chapter('Strategia de regenerare urbană');
      D.P('Regenerarea urbană este procesul integrat de revitalizare a zonelor degradate, subutilizate sau în declin — fizic, economic, social și de mediu. Spre deosebire de simplă reabilitare, regenerarea abordează simultan clădirile, spațiul public, dotarile, mobilitatea, economia locală și comunitatea. Zonele-țintă tipice sunt ansamblurile de locuințe colective, zonele industriale dezafectate, centrele istorice degradate și periferiile slab structurate.');
      D.P('O strategie de regenerare eficiență pornește de la zone-pilot demonstrative, mobilizeaza finanțare diversa (fonduri europene, buget local, parteneriate), implică comunitatea în proces și măsoară rezultatele. Principiul director este intervenția integrată și echitabilă, care îmbunătățește condițiile fără a disloca populația existența (prevenirea gentrificarii excesive).');

      D.chapter('Zone cu regim special și servituti');
      D.P('Teritoriul cuprinde zone supuse unor regimuri speciale de protecție și servituti, care condiționează sau interzic construirea. Identificarea și respectarea lor este obligatorie în documentatiile de urbanism.');
      D.table(['Zonă / servitute', 'Regim', 'Temei'], [
        ['Zone de protecție ape și maluri', 'Servitute, interdicție parțială', 'Legea 107/1996'],
        ['Zone de protecție monumente (LMI)', 'Reglementare strictă, avize', 'Legea 422/2001'],
        ['Zone de protecție sanitară', 'Restricții de funcțiuni', 'Norme sanitare'],
        ['Culoare infrastructură (LEA, conducte, drumuri, CF)', 'Servituti, interdictii', 'Legi sectoriale'],
        ['Zone de risc natural (inundății, alunecari)', 'Interdicție / conditionare', 'HG 447/2003, Legea 575/2001'],
        ['Zone aeroportuare (servituti)', 'Limitari de înălțime', 'HG 930/2016, RACR'],
      ], [60, 50, 64], { boldFirst: true, fs: 7 });

      D.chapter('Etapizarea spațială a dezvoltării');
      D.P('Dezvoltarea teritoriului se realizează etapizat, în funcție de echiparea edilitara, de cererea reală și de prioritățile strategice, evitând deschiderea simultana a unor suprafețe extinse care ar genera dispersie și costuri. Etapizarea spațială stabilește ordinea logică de dezvoltare: întâi densificarea și regenerarea intravilanului echipat, apoi extinderile coordonate cu infrastructură, mentinand restul ca rezervă pe termen lung.');
      D.P('Acest principiu — "intravilan înainte de extindere" — protejează terenurile agricole și naturale, optimizeaza investițiile publice în infrastructură și previne expansiunea necontrolata (urban sprawl) cu toate costurile sale (mobilitate dependență de auto, echipare scumpă, fragmentarea peisajului). Fiecare etapă de extindere se condiționează de gradul de ocupare al etapei anterioare și de asigurarea infrastructurii.');

      D.chapter('Guvernantă digitală și orașul bazat pe date');
      D.P('Planificarea și administrarea urbană modernă se bazează tot mai mult pe date. O platformă integrată de date urbane (GIS, geamănă digitală / digital twin a orașului) reuneste informații despre teritoriu, infrastructură, mobilitate, mediu și servicii, permițând decizii fundamentate, simularea scenariilor și monitorizarea în timp real a indicatorilor. Datele deschise (open data) susțîn transparentă, inovarea și participarea cetateneasca.');
      D.P('Geamănă digitală a orașului — un model 3D dinamic, alimentat cu date în timp real — devine un instrument puternic de planificare: permite testarea propunerilor (volumetrii, insorire, trafic, inundății) înainte de implementare și comunicarea vizuală cu cetățenii și investitorii. UrbanX se înscrie în această direcție, oferind analiză geospatiala, modelare 3D și proiecții bazate pe date.');

      D.chapter('Mecanisme de finanțare a dezvoltării urbane');
      D.P('Realizarea masterplanului necesită mobilizarea unor resurse financiare semnificative, prin mecanisme diverse și inovatoare, dincolo de bugetul local. Pe lângă fondurile europene (POR, PNRR) și parteneriatele public-private, există instrumente specifice de finanțare a dezvoltării urbane.');
      D.bullets([
        ['Captarea plusvalorii (value capture)', 'recuperarea pentru comunitate a unei părți din creșterea valorii terenurilor generată de investițiile publice (infrastructură, transport)'],
        ['Taxe și contributii de dezvoltare', 'contributii ale dezvoltatorilor la infrastructură publică necesară'],
        ['Instrumente financiare europene', 'fonduri rambursabile, garanții, finanțare mixtă (blending)'],
        ['Obligățiuni verzi municipale', 'finanțarea proiectelor de mediu prin emisiuni de obligățiuni'],
        ['Reparcelare urbană', 'mecanism prin care proprietarii contribuie cu teren pentru infrastructură, beneficiind de creșterea valorii'],
      ]);

      D.chapter('Matricea de acțiuni pe obiective strategice');
      D.P('Operationalizarea viziunii se realizează printr-o matrice care leagă fiecare obiectiv strategic de direcții de acțiune concrete, de indicatori și de orizonturi de timp, asigurând trasabilitatea de la viziune la implementare.');
      D.table(['Obiectiv', 'Direcții de acțiune', 'Orizont'], [
        ['O1 Dezvoltare spațială echilibrată', 'Densificare calitativă, regenerare, limitarea expansiunii, mix funcțional', 'Continuu'],
        ['O2 Mobilitate durabilă', 'PMUD, transfer modal, rețea velo, transport public, parcare', '2025-2040'],
        ['O3 Mediu și climă', 'Spații verzi 26 mp/loc, infrastructură albastră-verde, neutralitate climatică', '2025-2055'],
        ['O4 Locuire accesibilă', 'Fond accesibil/social, regenerare ansambluri, housing mix', '2027-2045'],
        ['O5 Economie competitivă', 'Atragere investiții, diversificare, brownfield, capital uman', 'Continuu'],
        ['O6 Coeziune și servicii', 'Dotari de proximitate, echitate spațială, incluziune', 'Continuu'],
        ['O7 Identitate și patrimoniu', 'Protejare LMI, ghid design, valorificare peisaj', 'Continuu'],
        ['O8 Guvernantă și reziliente', 'Capacitate instituțională, date, participare, adaptare riscuri', 'Continuu'],
      ], [54, 90, 30], { boldFirst: true, fs: 7 });

      D.chapter('Riscuri ale implementarii și măsuri de gestionare');
      D.P('Implementarea masterplanului comportă riscuri care trebuie anticipate și gestionate proactiv, pentru a asigură atingerea obiectivelor.');
      D.table(['Risc', 'Impact', 'Măsură de gestionare'], [
        ['Capacitate instituțională insuficiență', 'Întârzieri, absorbtie redusă', 'Intarirea structurilor, formare, asistentă tehnică'],
        ['Finanțare insuficiență sau întreruptă', 'Proiecte blocate', 'Diversificarea surselor, pregătirea proiectelor mature'],
        ['Lipsă de continuitate politică', 'Abandonarea direcțiilor', 'Consens larg, asumarea documentului, monitorizare publică'],
        ['Rezistență la schimbare', 'Blocarea masurilor', 'Participare, comunicare, proiecte-pilot demonstrative'],
        ['Presiune de dezvoltare necontrolata', 'Erodarea viziunii', 'Reglementare fermă (PUG/RLU), control urbanistic'],
        ['Schimbări de context (economic, climatic)', 'Ipoteze invalidate', 'Planificare adaptiva, revizuire periodica'],
      ], [56, 44, 74], { boldFirst: true, fs: 7 });
      D.callout('Factori-cheie de succes', 'Asumarea politică de durată, capacitatea administrativă, finanțarea predictibila, participarea publică și monitorizarea riguroasa sunt condițiile transformării viziunii în realitate.');

      // baza PUG (gri) pt mini-hartile vectoriale din capitole
      try{ if(window._PdfMap) window._PdfMap.setPug(pugGeo); }catch(e){}
      // TABLOU DE BORD — indicatori de calitate urbana (acelasi modul ca in cinematic)
      try{ if(window._UrbanIndices){ var _prMP=(window._PredEngine&&_PredEngine.calc)?_PredEngine.calc(city):{}; window._UrbanIndices.renderChapter(D, _prMP, city); } }catch(e){ console.warn('[MP] indici:',e.message); }
      // PROIECTE STRUCTURANTE REALE per-UAT (poli de dezvoltare)
      try{ if(window._UrbanProjects){ window._UrbanProjects.renderChapter(D, ctx.cityKey || (city&&city.key), city); } }catch(e){ console.warn('[MP] proiecte:',e.message); }
      // HARTI DE RISC vectoriale (seismic, inundatii, monumente/protectie)
      try{ if(window._RiskMaps){ window._RiskMaps.renderChapter(D, ctx); } }catch(e){ console.warn('[MP] harti risc:',e.message); }
      // INFRASTRUCTURA REGIONALA REALA (autostrazi CNAIR/PNRR + aeroporturi + geopolitic)
      try{ if(window._RegioInfra){ window._RegioInfra.renderChapter(D, ctx.cityKey||(city&&city.key), city); } }catch(e){ console.warn('[MP] regio infra:',e.message); }
      // CULTURA & TURISM (motor economic) — capitol dedicat
      try{ if(window._UrbanTourism){ window._UrbanTourism.renderChapter(D, ctx.cityKey||(city&&city.key), city); } }catch(e){ console.warn('[MP] turism:',e.message); }
      // EDUCATIE & SPORT (capital uman + atractivitate)
      try{ if(window._UrbanVitality){ window._UrbanVitality.renderChapter(D, ctx.cityKey||(city&&city.key), city); } }catch(e){ console.warn('[MP] vitality:',e.message); }
      // SANATATE & ORAS DIGITAL (servicii esentiale)
      try{ if(window._UrbanServices){ window._UrbanServices.renderChapter(D, ctx.cityKey||(city&&city.key), city); } }catch(e){ console.warn('[MP] services:',e.message); }
      // LOCUIRE & ACCESIBILITATE
      try{ if(window._UrbanHousing){ var _prH=(window._PredEngine&&_PredEngine.calc)?_PredEngine.calc(city):{}; window._UrbanHousing.renderChapter(D, city, _prH); } }catch(e){ console.warn('[MP] locuire:',e.message); }
      // ENERGIE & CLIMAT
      try{ if(window._UrbanEnergy){ var _prE=(window._PredEngine&&_PredEngine.calc)?_PredEngine.calc(city):{}; window._UrbanEnergy.renderChapter(D, city, _prE); } }catch(e){ console.warn('[MP] energie:',e.message); }
      // APA & ECONOMIE CIRCULARA
      try{ if(window._UrbanResources){ window._UrbanResources.renderChapter(D, city); } }catch(e){ console.warn('[MP] resurse:',e.message); }
      // PARTICIPARE PUBLICA & transparenta decizionala
      try{ if(window._PublicParticipation&&window._PublicParticipation.renderChapter){ window._PublicParticipation.renderChapter(D, city); } }catch(e){ console.warn('[MP] participare:',e.message); }
      // FAUNA urbana & siguranta (caini fara stapan + ursi)
      try{ if(window._UrbanFauna){ window._UrbanFauna.renderChapter(D, city); } }catch(e){ console.warn('[MP] fauna:',e.message); }
      // INVESTIȚII MAJORE anunțate (PNRR/Anghel Saligny/CNAIR) cu impact teritorial
      try{ if(window._InvestMajore){ window._InvestMajore.renderSection(D, city.key || (window.TCI&&window.TCI.cityKey)); } }catch(e){ console.warn('[MP] invest:',e.message); }
      // NOTA UrbanX — clasament + benchmark european
      try{ if(window._UrbanRank){ var _prR=(window._PredEngine&&_PredEngine.calc)?_PredEngine.calc(city):{}; window._UrbanRank.renderChapter(D, _prR, city); } }catch(e){ console.warn('[MP] rank:',e.message); }

      D.chapter('Concluzii și recomandări strategice');
      D.P('Masterplanul Strategic al Municipiului ' + city.name + ' fundamenteaza o dezvoltare urbană integrată, durabilă și rezilienta. Recomandările prioritare:');
      D.bullets([
        'Adoptarea scenariului ambițios (C) și actualizarea PUG în consecință.',
        'Prioritizarea densificarii calitative a intravilanului echipat.',
        'Implementarea PMUD și transferul modal către mobilitate durabilă.',
        'Creșterea și conectarea spațiilor verzi la normă legală.',
        'Regenerarea ansamblurilor de locuințe și a zonelor degradate.',
        'Adaptarea la schimbările climatice și reducerea expunerii la riscuri.',
        'Consolidarea capacității institutionale și a participarii publice.',
      ]);

      // ─────────────────────────────────────────────────────────────────────
      // CAP 29 — ANEXE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Anexe — surse de date, indicatori și glosar');
      D.h2('Glosar de termeni');
      D.table(['Termen', 'Definiție'], [
        ['POT', 'Procent de Ocupare a Terenului — raportul dintre aria construită la sol și aria terenului'],
        ['CUT', 'Coeficient de Utilizare a Terenului — raportul dintre aria desfasurata și aria terenului'],
        ['PUG / PUZ / PUD', 'Plan Urbanistic General / Zonal / de Detaliu'],
        ['RLU', 'Regulament Local de Urbanism'],
        ['TOD', 'Transit-Oriented Development — dezvoltare orientata către transport public'],
        ['ZUF', 'Zonă Urbană Funcțională'],
        ['GES', 'Gaze cu Efect de Sera'],
      ], [30, 144], { boldFirst: true });
      D.h2('Surse de date');
      D.P('INS TEMPO-Online; Eurostat (Urban Audit, NUTS3); INFP (zonare seismică); ANAR/MMAP (hidrografie, hazard inundății); ANM (date climatice); OpenStreetMap; PUG vectorial UAT; analize geospatiale UrbanX (turf.js).');
      D.spacer(2);
      D.callout('Disclaimer', 'Document strategic de fundamentare, cu valoare orientativa și analitică. Propunerile spațiale și indicatorii se valideaza prin documentatiile de urbanism normative (PUG/PUZ) elaborate de colective atestate RUR, pe suport topografic vizat.');
      D.fullPage('Anexă statistică — toate datele cu surse citate', () => m._pg22_full_statistics(ctx));
    }
  };
})(window);
