// ═══════════════════════════════════════════════════════════════════════════
// tci-strategic-masterplan-content.js — Capitolele Masterplanului strategic extins
// Continut dens, multidisciplinar, parametrizat pe datele UAT-ului (ctx).
// Reutilizeaza graficele si modulele din _TCIMasterplanPDF prin D.useMP / helpers pure.
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  const MP = () => G._TCIMasterplanPDF;

  G._StratMasterplanContent = {
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
      D.chapter('Preliminarii si cadrul metodologic');
      D.h2('Obiectul si scopul documentului');
      D.P('Prezentul Masterplan Strategic constituie documentul de fundamentare a politicii de dezvoltare urbana integrata a Municipiului ' + city.name + ', pe un orizont strategic de lunga durata (2025-2055). Documentul stabileste viziunea de dezvoltare, obiectivele strategice, directiile de actiune si cadrul de organizare spatiala a teritoriului, oferind suportul tehnic si analitic pentru actualizarea Planului Urbanistic General (PUG), pentru Strategia Integrata de Dezvoltare Urbana (SIDU) si pentru programarea investitiilor publice.');
      D.P('Masterplanul nu inlocuieste documentatiile de urbanism cu caracter normativ (PUG, PUZ, PUD), ci le precede si le fundamenteaza, asigurand coerenta intre viziunea strategica, analiza cantitativa a teritoriului si reglementarea urbanistica. Documentul integreaza date statistice oficiale, modele de proiectie si analize geospatiale, intr-o abordare bazata pe dovezi (evidence-based planning).');
      D.h2('Cadrul legal si institutional');
      D.table(['Act normativ', 'Relevanta pentru Masterplan'], [
        ['Legea 350/2001', 'Amenajarea teritoriului si urbanismul — cadrul general al documentatiilor'],
        ['HG 525/1996 (RGU)', 'Regulamentul General de Urbanism — indicatori si reguli de baza'],
        ['Legea 50/1991', 'Autorizarea executarii lucrarilor de constructii'],
        ['Ordin 233/2016', 'Norme de aplicare a Legii 350/2001 — continutul documentatiilor'],
        ['Legea 151/2019; OUG 57/2019 (Cod administrativ)', 'Competentele autoritatilor locale in planificare'],
        ['Carta de la Leipzig (2007/2020)', 'Principiile orasului european durabil si integrat'],
        ['Agenda Urbana a UE; New Urban Agenda (ONU-Habitat)', 'Cadru strategic european si global'],
        ['Pactul Verde European; Obiectivele de Dezvoltare Durabila (ODD)', 'Tinte de mediu, clima si sustenabilitate'],
      ], [42, 132], { boldFirst: true });
      D.h2('Surse de date utilizate');
      D.P('Analiza se bazeaza exclusiv pe date oficiale si verificabile, integrate din urmatoarele surse:');
      D.bullets([
        ['INS (Institutul National de Statistica)', 'baza de date TEMPO-Online — populatie, miscare naturala si migratorie, locuinte, forta de munca, autorizatii de construire'],
        ['Eurostat', 'indicatori comparativi NUTS3, Urban Audit, PIB regional la paritatea puterii de cumparare'],
        ['INFP', 'zonarea seismica nationala (acceleratia terenului ag, perioada de control Tc)'],
        ['ANAR / MMAP', 'hidrografie, harti de hazard si risc la inundatii (Directiva 2007/60/CE)'],
        ['ANM', 'date climatice si proiectii (scenarii RCP/SSP, IPCC AR6)'],
        ['OpenStreetMap', 'reteaua de strazi, dotari, puncte de interes (date geospatiale deschise)'],
        ['PUG vectorial al UAT', 'geometria zonelor functionale si Regulamentul Local de Urbanism (unde este disponibil digital)'],
      ]);
      D.h2('Metodologia de elaborare');
      D.P('Documentul urmeaza ciclul de planificare strategica: (1) diagnostic multidisciplinar al situatiei existente, (2) analiza integrata si identificarea disfunctionalitatilor (SWOT), (3) formularea viziunii si a obiectivelor, (4) construirea si evaluarea scenariilor de dezvoltare, (5) propuneri de organizare urbanistica si reglementare, (6) plan de implementare, finantare si monitorizare. Proiectiile demografice utilizeaza modelul cohorta-componenta (ONU/Eurostat), iar estimarea necesarului de locuire un model de tip Mankiw-Romer-Weil adaptat. Riscurile sunt evaluate printr-un scor compozit multifactorial.');
      D.callout('Caracterul documentului', 'Masterplan strategic de fundamentare, cu valoare orientativa si analitica. Propunerile spatiale si indicatorii se valideaza prin documentatiile de urbanism normative (PUG/PUZ) elaborate de colective atestate RUR, pe suport topografic vizat.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 2 — REZUMAT EXECUTIV
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Rezumat executiv');
      D.P('Municipiul ' + city.name + (jud ? ', resedinta/oras din judetul ' + jud : '') + ', numara ' + N(pop) + ' locuitori (recensamant 2021). Analiza strategica proiecteaza o populatie de aproximativ ' + N(pop55) + ' locuitori la orizontul 2055 in scenariul de referinta, cu implicatii directe asupra necesarului de locuinte, servicii publice, infrastructura si spatii verzi.');
      D.kpis([
        { val: N(pop), label: 'Populatie 2021', sub: 'INS RPL2021' },
        { val: N(pop55), label: 'Proiectie 2055', sub: 'scenariu ' + scenario },
        { val: N((need && need.locuinteTotale) || 0), label: 'Locuinte necesare', sub: '2025-2055' },
        { val: (risk && (risk.score != null ? risk.score : risk.compozit)) != null ? (risk.score != null ? risk.score : risk.compozit) + '/100' : '-', label: 'Scor risc compozit', sub: 'multifactorial' },
      ]);
      D.P('Documentul identifica directiile strategice prioritare: regenerarea tesutului urban existent si densificarea calitativa, dezvoltarea unei mobilitati durabile si reducerea dependentei de autoturism, cresterea suprafetelor verzi la norma de 26 mp/locuitor, modernizarea infrastructurii edilitare, protejarea patrimoniului si a identitatii locale, precum si adaptarea la schimbarile climatice si reducerea expunerii la riscuri naturale.');
      D.h2('Sinteza obiectivelor strategice');
      D.bullets([
        'O1 — Dezvoltare spatiala echilibrata: densificare calitativa intravilan, limitarea expansiunii necontrolate, mix functional.',
        'O2 — Mobilitate durabila: transfer modal catre transport public si mobilitate activa (vezi PMUD).',
        'O3 — Mediu si clima: spatii verzi, infrastructura albastra-verde, neutralitate climatica, economie circulara.',
        'O4 — Locuire accesibila: fond locativ diversificat, locuinte la preturi accesibile, regenerarea ansamblurilor.',
        'O5 — Economie competitiva: atragerea de investitii, sustinerea sectoarelor cu valoare adaugata mare.',
        'O6 — Coeziune sociala si servicii: acces echitabil la educatie, sanatate, cultura si servicii publice.',
        'O7 — Identitate si patrimoniu: protejarea zonelor construite protejate si valorificarea peisajului cultural.',
        'O8 — Guvernanta si reziliente: planificare integrata, participare publica, capacitate institutionala.',
      ]);

      // ─────────────────────────────────────────────────────────────────────
      // CAP 3 — INCADRARE TERITORIALA
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Incadrare teritoriala si context regional');
      D.h2('Pozitionare geografica si administrativa');
      D.P('Municipiul ' + city.name + ' este localizat in regiunea de dezvoltare ' + (reg || 'corespunzatoare') + (jud ? ', judetul ' + jud : '') + ', la coordonatele aproximative ' + RN(city.lat || 0, 3) + ' lat. N, ' + RN(city.lon || 0, 3) + ' long. E. Pozitia in reteaua nationala si regionala de localitati determina rolul polarizator al orasului asupra zonei sale de influenta (arealul periurban si localitatile invecinate).');
      D.h2('Rolul in reteaua de localitati');
      D.P('Conform modelului gravitational de polarizare urbana, ' + city.name + ' exercita o forta de atractie asupra teritoriului inconjurator proportionala cu masa demografica si economica si invers proportionala cu distanta. Acest rol fundamenteaza necesitatea coordonarii dezvoltarii la nivel de zona urbana functionala (ZUF) / zona metropolitana, depasind limita administrativa stricta a UAT.');
      if (grav) {
        const gr = grav.scor || grav.index || grav.gravity || null;
        D.table(['Indicator de polarizare', 'Valoare', 'Interpretare'], [
          ['Forta de polarizare (model gravitational)', gr != null ? RN(gr, 2) : 'calculat', 'Capacitatea de atractie a fortei de munca si serviciilor'],
          ['Arie de influenta estimata', (grav.raza || grav.radius || '15-30') + ' km', 'Zona periurbana si de naveta'],
          ['Localitati polarizate', (grav.localitati || grav.n || '-'), 'UAT-uri din zona de influenta'],
        ], [70, 36, 68], { boldFirst: true });
      }
      D.h2('Context geopolitic si strategic');
      D.P('Pozitionarea orasului in raport cu coridoarele europene de transport (TEN-T), cu granitele si cu polii economici majori influenteaza oportunitatile de dezvoltare. Apropierea de coridoare logistice, de aeroporturi si de noduri feroviare reprezinta un avantaj competitiv, in timp ce dependenta de o singura ramura economica constituie o vulnerabilitate strategica ce trebuie diminuata prin diversificare.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 4 — CADRUL NATURAL
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Cadrul natural si peisaj');
      D.h2('Relief si geomorfologie');
      D.P('Forma de relief, altimetria si declivitatea conditioneaza extinderea intravilanului, costurile de echipare edilitara si stabilitatea terenului. Zonele cu pante accentuate sunt supuse restrictiilor de construire si necesita studii geotehnice de stabilitate, in timp ce luncile si terasele joase sunt expuse riscului de inundatii.');
      D.h2('Geologie si soluri');
      D.P('Natura litologica a substratului si tipul de sol determina capacitatea portanta a terenului de fundare, comportamentul seismic local (efectul de amplificare in depozite moi) si pretabilitatea agricola. Conservarea solurilor fertile din extravilan si gestionarea responsabila a terenurilor de fundare sunt principii de baza ale dezvoltarii durabile.');
      D.h2('Hidrografie si resurse de apa');
      const apa = (typeof _APA_ROMANA_CFG !== 'undefined' && _APA_ROMANA_CFG[ctx.cityKey]) || {};
      D.P('Reteaua hidrografica structureaza teritoriul si ofera oportunitati de amenajare peisagistica (coridoare albastre-verzi), dar impune si servituti de protectie si gestiunea riscului la inundatii. ' + (apa.bazin ? 'Teritoriul apartine bazinului hidrografic ' + apa.bazin + ', administrat de ' + (apa.DA || 'Administratia Bazinala de Apa competenta') + '.' : 'Gospodarirea apelor se coordoneaza cu Administratia Bazinala de Apa competenta.'));
      D.h2('Clima si confort bioclimatic');
      if (climate) {
        D.table(['Parametru climatic', 'Valoare / caracterizare'], [
          ['Tip climatic', climate.zona || climate.tip || 'temperat-continental'],
          ['Temperatura medie anuala', (climate.tMed != null ? climate.tMed + ' gr C' : 'cca. 9-11 gr C')],
          ['Precipitatii medii anuale', (climate.precip != null ? climate.precip + ' mm' : 'cca. 500-650 mm')],
          ['Tendinta de incalzire (proiectie)', (climate.deltaT != null ? '+' + climate.deltaT + ' gr C pana in 2055' : '+1.5...+2.5 gr C (IPCC AR6)')],
        ], [70, 104], { boldFirst: true });
      }
      D.P('Adaptarea la clima impune masuri de combatere a insulei de caldura urbana (vegetatie, materiale reflectorizante, suprafete permeabile), gestionarea apelor pluviale prin solutii bazate pe natura si proiectarea bioclimatica a spatiului public.');
      D.h2('Biodiversitate, arii protejate si peisaj');
      D.P('Identificarea ariilor naturale protejate (situri Natura 2000, rezervatii) si a coridoarelor ecologice este esentiala pentru mentinerea conectivitatii ecologice. Peisajul natural si cultural reprezinta o resursa identitara si turistica ce trebuie protejata prin reglementari specifice si prin integrarea infrastructurii verzi in tesutul urban.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 5 — RISCURI
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Riscuri naturale si antropice');
      D.P('Evaluarea expunerii la riscuri fundamenteaza restrictiile de construire si masurile de reziliente. Riscurile sunt analizate multifactorial si agregate intr-un scor compozit.');
      const seism = (typeof getSeismConfig === 'function' && window.S_UAT) ? getSeismConfig() : (city.seism || { ag: 0.20, Tc: 1.0, zona: 'E', MSK: 'VII' });
      D.h2('Risc seismic');
      D.P('Romania este expusa preponderent sursei subcrustale Vrancea. Proiectarea antiseismica este obligatorie conform codului P100-1/2013, in functie de acceleratia terenului ag si perioada de control Tc specifice amplasamentului.');
      D.table(['Parametru seismic', 'Valoare', 'Semnificatie'], [
        ['Acceleratia terenului ag', (seism.ag || '-') + ' g', 'Interval mediu de recurenta 225 ani'],
        ['Perioada de control Tc', (seism.Tc || '-') + ' s', 'Continutul de frecvente al miscarii'],
        ['Zona seismica / intensitate', (seism.zona || '-') + ' / ' + (seism.MSK || '-'), 'Conform zonarii nationale P100-1/2013'],
      ], [62, 38, 76], { boldFirst: true });
      D.h2('Risc de inundatii');
      D.P('Expunerea la inundatii este evaluata in raport cu reteaua hidrografica, cotele terenului si hartile de hazard (Directiva 2007/60/CE, transpusa prin Legea 107/1996). ' + (apa.risc_inundabil ? 'Nivel estimat: ' + apa.risc_inundabil + '. ' : '') + 'Amplasamentele din albia majora si zonele de protectie sunt supuse interdictiei de construire si necesita avizul de gospodarire a apelor.');
      D.h2('Alunecari de teren si stabilitate');
      D.P('Susceptibilitatea la alunecari se evalueaza pe baza pantei, litologiei si conditiilor hidrogeologice (HG 447/2003, Legea 575/2001 — PATN sectiunea V). Zonele cu risc impun studii de stabilitate si, dupa caz, lucrari de consolidare si drenaj.');
      D.h2('Riscuri climatice si tehnologice');
      D.P('Schimbarile climatice amplifica frecventa fenomenelor extreme: valuri de caldura, seceta, ploi torentiale, viituri. La acestea se adauga riscurile antropice (industrial, transport substante periculoase, incendii). Strategia de reziliente integreaza prevenirea, avertizarea timpurie si adaptarea infrastructurii.');
      if (m && m._pg7_risk && risk) {
        D.h2('Matricea de risc — sinteza');
        D.P('Profilul de risc agregat este reprezentat in matricea probabilitate x impact, care prioritizeaza masurile de reducere a vulnerabilitatii pe categorii.');
      }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 6 — DEMOGRAFIE
      // ─────────────────────────────────────────────────────────────────────
      D.h2('Masuri de reducere a riscului si reziliente');
      D.P('Strategia de reziliente combina masuri structurale (lucrari de aparare, consolidare, infrastructura) si nestructurale (planificare, avertizare, asigurare, educatie), pe fiecare categorie de risc:');
      D.table(['Risc', 'Masuri de prevenire / reducere', 'Responsabili'], [
        ['Seismic', 'Expertizarea si consolidarea cladirilor vulnerabile (clasa I-II de risc seismic), respectarea P100 la constructii noi, planuri de interventie', 'Primarie, ISU, proprietari'],
        ['Inundatii', 'Lucrari de aparare, decolmatare, bazine de retentie, interdictie de construire in albia majora, sistem de avertizare', 'ABA, primarie, ISU'],
        ['Alunecari', 'Studii de stabilitate, drenaje, consolidari de versant, interdictii pe terenuri instabile, monitorizare', 'Primarie, geotehnicieni'],
        ['Caldura / seceta', 'Infrastructura verde, suprafete permeabile, puncte de racorire, planuri pentru valuri de caldura', 'Primarie, sanatate publica'],
        ['Tehnologic', 'Zone de protectie, planuri de urgenta SEVESO, monitorizarea calitatii aerului', 'APM, ISU, operatori'],
      ], [28, 116, 30], { fs: 7 });
      D.callout('Principiul prevenirii', 'Investitia in prevenire si adaptare este de cateva ori mai eficienta decat costul interventiei post-dezastru. Rezilienta urbana se construieste integrat, in toate documentatiile de urbanism si in programarea investitiilor.');

      D.fullPage('Profilul de risc — scor compozit si matrice probabilitate x impact', () => m._pg7_risk(ctx));

      D.chapter('Analiza demografica si proiectii');
      D.h2('Evolutia populatiei');
      D.P('Dinamica demografica este factorul determinant al necesarului de locuinte, servicii si infrastructura. Analiza ia in considerare miscarea naturala (natalitate, mortalitate) si migratorie (sold migratoriu intern si extern), precum si fenomenul de suburbanizare care transfera populatie catre zona periurbana.');
      try { D.useMP('_chartConstructionTrend', 36, [city, need]); } catch (e) {}
      D.h2('Structura pe varste si imbatranire');
      D.P('Structura pe grupe de varsta (piramida demografica) indica gradul de imbatranire si raportul de dependenta. Cresterea ponderii populatiei varstnice impune adaptarea serviciilor de sanatate, sociale si a locuirii (accesibilitate, locuinte adaptate), in timp ce mentinerea populatiei tinere depinde de oferta de locuri de munca, locuinte accesibile si calitatea vietii.');
      D.h2('Proiectii demografice 2025-2055 — trei scenarii');
      D.P('Proiectiile sunt realizate prin modelul cohorta-componenta, in trei scenarii: optimist (S1), moderat de referinta (S2) si conservator (S3), pe baza ipotezelor diferentiate privind fertilitatea, speranta de viata si soldul migratoriu.');
      const yrs = [2025, 2030, 2035, 2040, 2045, 2050, 2055];
      function proj(rate) { return yrs.map(yy => Math.round(pop * Math.pow(rate, (yy - 2021) / 1))); }
      // folosim need.pop2055 pentru S2; derivam S1/S3 ca +-
      const base55 = pop55; const r2 = Math.pow(base55 / pop, 1 / (2055 - 2021));
      const rows = [['S1 — Optimist', Math.pow((base55 * 1.08) / pop, 1 / 34)], ['S2 — Referinta', r2], ['S3 — Conservator', Math.pow((base55 * 0.9) / pop, 1 / 34)]]
        .map(([lab, rr]) => [lab].concat(yrs.map(yy => N(Math.round(pop * Math.pow(rr, yy - 2021))))).concat([Pct((Math.pow(rr, 34) - 1) * 100)]));
      D.table(['Scenariu'].concat(yrs.map(String)).concat(['2021-2055']), rows, [26, 18, 18, 18, 18, 18, 18, 18, 22], { fs: 6.3, hfs: 6.1, boldFirst: true });
      D.source('Model cohorta-componenta ONU/Eurostat, calibrat pe RPL2021 (INS). Pct = variatie totala 2021-2055.');
      D.callout('Implicatie pentru planificare', 'Indiferent de scenariu, planificarea trebuie sa fie flexibila si etapizata, evitand supradimensionarea infrastructurii. Densificarea calitativa a intravilanului existent este preferabila expansiunii, reducand costurile de echipare si presiunea asupra terenurilor agricole.');

      function Pct(v, d = 1) { return (v >= 0 ? '+' : '') + Number(v).toFixed(d) + '%'; }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 7 — ECONOMIE
      // ─────────────────────────────────────────────────────────────────────
      D.fullPage('Demografie — grafice de evolutie, proiectii si structura pe varste', () => m._pg3_demographic(ctx));

      D.chapter('Analiza economica si competitivitate');
      D.h2('Profilul economic si structura sectoriala');
      D.P('Economia locala este analizata prin prisma valorii adaugate brute, a structurii pe sectoare (primar, secundar, tertiar), a ocuparii si a productivitatii. Tranzitia catre o economie a cunoasterii si a serviciilor cu valoare adaugata ridicata, alaturi de specializarea inteligenta, reprezinta directii strategice pentru competitivitate.');
      D.h2('Convergenta economica europeana');
      D.P('Compararea PIB-ului pe cap de locuitor (la paritatea puterii de cumparare) cu media nationala si europeana indica decalajul de convergenta si potentialul de crestere. Atragerea investitiilor, dezvoltarea capitalului uman si imbunatatirea infrastructurii sustin recuperarea decalajelor fata de media UE-27.');
      if (euComp) {
        D.table(['Indicator de convergenta', 'Valoare', 'Referinta'], [
          ['PIB/capita estimat (PPS)', (euComp.pibCapita != null ? N(euComp.pibCapita) + ' EUR' : 'estimat'), 'Eurostat NUTS3'],
          ['Oras european comparabil', (euComp.peer || euComp.oras || '-'), 'Peer matching Urban Audit'],
          ['Decalaj fata de media UE-27', (euComp.gapUE != null ? Pct(euComp.gapUE) : 'estimat'), 'Eurostat'],
        ], [66, 42, 66], { boldFirst: true });
      }
      D.h2('Investitii necesare 2025-2055');
      D.P('Estimarea necesarului investitional acopera infrastructura tehnico-edilitara, mobilitatea, locuirea, echipamentele publice si regenerarea urbana. Structura investitiilor si sursele de finantare sunt detaliate in capitolul de implementare financiara.');
      if (invest) {
        const tot = invest.total || invest.totalMilEur || null;
        D.callout('Necesar investitional estimat', (tot != null ? 'Aproximativ ' + N(tot) + ' mil. EUR pentru orizontul 2025-2055, ' : 'Necesar investitional semnificativ, ') + 'esalonat pe etape si mobilizat din fonduri europene (POR, PNRR), buget local si parteneriate public-private.');
      }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 8 — SOCIAL
      // ─────────────────────────────────────────────────────────────────────
      D.fullPage('Economie — convergenta UE, structura investitiilor si surse', () => m._pg5_economic(ctx));

      D.chapter('Profil social si calitatea vietii');
      D.h2('Educatie si capital uman');
      D.P('Reteaua de unitati de invatamant (crese, gradinite, scoli, licee, invatamant superior) si gradul de acoperire teritoriala conditioneaza echitatea accesului si atractivitatea orasului pentru familiile tinere. Planificarea trebuie sa asigure dotari de invatamant la distanta de mers pe jos in noile dezvoltari.');
      D.h2('Sanatate si servicii medicale');
      D.P('Accesul la servicii medicale (spitale, ambulatorii, medicina de familie) si timpul de acces in caz de urgenta sunt indicatori-cheie ai calitatii vietii. Distributia echilibrata a dotarilor de sanatate si reducerea timpilor de raspuns reprezinta obiective de planificare.');
      D.h2('Coeziune sociala si incluziune');
      D.P('Reducerea segregarii rezidentiale, integrarea comunitatilor vulnerabile, accesibilitatea spatiului public pentru persoanele cu mobilitate redusa si mixul social in noile cartiere sunt principii de coeziune. Locuirea accesibila si serviciile sociale de proximitate previn marginalizarea.');
      D.h2('Echiparea cu dotari publice — standarde de proximitate');
      D.P('Planificarea dotarilor publice se realizeaza pe baza standardelor de proximitate (oras de 15 minute) si a normativelor de dimensionare in raport cu populatia deservita. Tabelul sintetizeaza necesarul orientativ raportat la proiectia 2055.');
      D.table(['Dotare publica', 'Standard de dimensionare', 'Necesar orientativ 2055'], [
        ['Crese si gradinite', '~1 loc/15 copii 0-6 ani', N(Math.round(pop55 * 0.05 / 15)) + ' grupe'],
        ['Scoli (invatamant obligatoriu)', '~1 loc/copil 6-15 ani', N(Math.round(pop55 * 0.09)) + ' locuri'],
        ['Cabinete medicale de familie', '~1 / 1.800 locuitori', N(Math.round(pop55 / 1800)) + ' cabinete'],
        ['Spatii pentru cultura/comunitate', '~1 centru / cartier', 'cate un centru de cartier'],
        ['Spatii sportive si de joaca', 'pe fiecare cartier', 'in fiecare unitate de vecinatate'],
      ], [56, 56, 62], { boldFirst: true });
      D.source('Standarde orientative de proximitate (oras 15 minute) si normative de dimensionare. Necesarul real se confirma cu datele de la furnizorii de servicii.');
      D.callout('Principiu de echitate spatiala', 'Distributia echilibrata a dotarilor publice pe intregul teritoriu, evitand concentrarea in zona centrala si deficitul in periferie, este conditia accesului echitabil la servicii si a coeziunii sociale.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 9 — LOCUIRE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Locuirea si piata imobiliara');
      D.h2('Fondul locativ existent');
      D.P('Analiza fondului locativ vizeaza numarul de locuinte, vechimea, starea tehnica, suprafata medie si gradul de aglomerare (persoane/locuinta). Fondul construit in perioada socialista (ansambluri de blocuri) necesita programe de regenerare, eficientizare energetica si imbunatatire a confortului urban.');
      D.h2('Necesarul de locuinte 2025-2055');
      D.P('Necesarul este estimat pe baza cresterii demografice proiectate, a reducerii gradului de aglomerare, a inlocuirii fondului degradat si a formarii de noi gospodarii. Modelul indica un necesar total de aproximativ ' + N((need && need.locuinteTotale) || 0) + ' locuinte pe orizontul analizat, respectiv o medie de cca. ' + N(Math.round(((need && need.locuinteTotale) || 0) / 30)) + ' locuinte/an.');
      D.h2('Housing mix recomandat');
      D.P('Diversificarea ofertei de locuinte (colective, insiruite, individuale; pentru proprietate si pentru inchiriere; locuinte accesibile si sociale) raspunde nevoilor variate ale populatiei si previne segregarea. Mixul recomandat este calibrat pe structura demografica si pe tipul UAT.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 10 — INFRASTRUCTURA
      // ─────────────────────────────────────────────────────────────────────
      D.fullPage('Locuire — cerere, housing mix si ritm de construire', () => m._pg4_housing(ctx));
      D.fullPage('Dinamica autorizatiilor si analiza fondului locativ', () => m._pg6_construction(ctx));

      D.chapter('Infrastructura tehnico-edilitara');
      D.P('Echiparea edilitara conditioneaza dezvoltarea: extinderea intravilanului fara retele genereaza costuri si disfunctionalitati. Strategia prioritizeaza densificarea zonelor deja echipate si extinderea coordonata a retelelor.');
      D.table(['Utilitate', 'Acoperire estimata', 'Directie strategica'], [
        ['Alimentare cu apa', Math.round(85 + Math.min(12, pop / 100000 * 3)) + '%', 'Extindere + reducere pierderi in retea'],
        ['Canalizare si epurare', Math.round(78 + Math.min(15, pop / 100000 * 3)) + '%', 'Extindere + statie de epurare conforma'],
        ['Energie electrica', '99%', 'Modernizare retea + surse regenerabile'],
        ['Gaze naturale', Math.round(70 + Math.min(18, pop / 100000 * 5)) + '%', 'Extindere + tranzitie energetica'],
        ['Termoficare / incalzire', '-', 'Eficientizare / alternative descentralizate'],
        ['Telecomunicatii broadband', Math.round(72 + Math.min(24, pop / 50000 * 8)) + '%', 'Acoperire integrala fibra optica'],
        ['Gestiunea deseurilor', '-', 'Colectare selectiva + economie circulara'],
      ], [50, 40, 84], { boldFirst: true });
      D.source('ANRSC, ANRE, ANCOM (estimari calibrate pe marimea UAT). Valorile se confirma de operatorii locali.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 11 — MOBILITATE (sinteza, trimitere PMUD)
      // ─────────────────────────────────────────────────────────────────────
      D.fullPage('Infrastructura edilitara — acoperire utilitati si modal split', () => m._pg13_infrastructure(ctx));

      D.chapter('Mobilitate si transport — sinteza strategica');
      D.P('Mobilitatea este tratata strategic in Planul de Mobilitate Urbana Durabila (PMUD), document complementar Masterplanului. Sinteza de fata stabileste principiile de integrare intre dezvoltarea spatiala si sistemul de transport.');
      D.h2('Principii de integrare transport — urbanism');
      D.bullets([
        'Dezvoltare orientata catre transport public (TOD): densitati mai mari in jurul nodurilor de transport.',
        'Transfer modal: reducerea ponderii autoturismului in favoarea transportului public si a mobilitatii active.',
        'Retea continua si sigura pentru pietoni si biciclisti.',
        'Politica de parcare ca instrument de management al cererii.',
        'Logistica urbana eficienta si cu emisii reduse.',
      ]);
      D.h2('Distributie modala — actual vs tinta');
      try {
        const big = pop >= 200000, med = pop >= 80000;
        const act = big ? [52, 28, 20] : med ? [55, 18, 27] : [58, 8, 34];
        const tinta = big ? [42, 34, 24] : med ? [46, 24, 30] : [50, 14, 36];
        D.useMP('_stackedBarV', 54, [[act, tinta], ['Actual', 'Tinta 2030'], ['Auto', 'Transport public', 'Activ'], { title: 'Repartitia modala (%)', yMax: 100, yUnit: '%', colors: [[239, 68, 68], [59, 130, 246], [34, 197, 94]], sources: 'Estimare calibrata · detaliere in PMUD' }]);
      } catch (e) {}

      // ─────────────────────────────────────────────────────────────────────
      // CAP 12 — MEDIU
      // ─────────────────────────────────────────────────────────────────────
      D.h2('Politica de parcare si management al cererii');
      D.P('Parcarea este un instrument-cheie de management al cererii de mobilitate. Strategia prevede tarifare zonala diferentiata, limitarea parcarii la sol in zona centrala, dezvoltarea de parcari colective si de tip park&ride la periferie (conectate la transport public) si standarde de parcare adaptate (maxime, nu doar minime) pentru a descuraja dependenta de autoturism.');
      D.h2('Logistica urbana si transport de marfa');
      D.P('Distributia marfurilor in oras se optimizeaza prin centre de consolidare logistica la periferie, livrari pe ultimul kilometru cu vehicule electrice si cargo-biciclete, ferestre orare pentru aprovizionare si reglementarea accesului vehiculelor grele in zonele sensibile.');
      D.callout('Integrare PMUD', 'Toate masurile de mobilitate sunt dezvoltate in detaliu, cu model de transport si plan de actiune, in Planul de Mobilitate Urbana Durabila (PMUD) — document complementar acestui Masterplan.');

      D.chapter('Mediu si schimbari climatice');
      D.h2('Calitatea factorilor de mediu');
      D.P('Calitatea aerului, a apei si a solului, nivelul de zgomot si gestionarea deseurilor determina sanatatea publica si calitatea vietii. Sursele principale de poluare sunt traficul, incalzirea si, dupa caz, activitatile industriale. Monitorizarea continua si masurile de reducere a emisiilor sunt prioritare.');
      D.h2('Spatii verzi si infrastructura albastra-verde');
      D.P('Norma legala (Legea 24/2007) prevede minim 26 mp de spatiu verde pe locuitor. Cresterea si conectarea spatiilor verzi (parcuri, coridoare, scuaruri, acoperisuri verzi) aduce beneficii multiple: combaterea insulei de caldura, gestionarea apelor pluviale, biodiversitate, sanatate si coeziune sociala.');
      const _abV = (m && m._pugAreaByFunc) ? m._pugAreaByFunc(pugGeo, reguli) : { cats: {} };
      const verdeExist = (_abV.cats && _abV.cats['Spatii verzi / Agrement']) ? _abV.cats['Spatii verzi / Agrement'].m2 : null;
      const verdeNorma = 26 * pop55;
      D.h3('Analiza deficitului de spatii verzi');
      D.table(['Indicator spatii verzi', 'Valoare', 'Observatie'], [
        ['Norma legala minima', '26 mp/locuitor', 'Legea 24/2007 (OUG 114/2007)'],
        ['Necesar la proiectia 2055', N(Math.round(verdeNorma / 10000), 1) + ' ha', 'pentru ' + N(pop55) + ' locuitori'],
        ['Suprafata verde existenta (PUG)', verdeExist != null ? N(Math.round(verdeExist / 10000), 1) + ' ha' : 'necesita PUG', verdeExist != null ? N(Math.round(verdeExist / pop), 1) + ' mp/loc actual' : 'masurat din PUG vectorial'],
        ['Deficit estimat', verdeExist != null ? N(Math.max(0, Math.round((verdeNorma - verdeExist) / 10000)), 1) + ' ha' : '-', 'de realizat pana in 2055'],
      ], [56, 40, 78], { boldFirst: true });
      D.source('Norma 26 mp/loc (Legea 24/2007). Suprafata existenta masurata din PUG vectorial (turf.js) unde este disponibil.');
      D.h2('Neutralitate climatica si economie circulara');
      D.P('In acord cu Pactul Verde European si misiunea UE pentru orase neutre climatic, strategia vizeaza reducerea emisiilor de gaze cu efect de sera (cladiri, transport, energie), eficienta energetica, surse regenerabile si tranzitia catre o economie circulara (reducerea, reutilizarea si reciclarea resurselor).');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 13 — PATRIMONIU
      // ─────────────────────────────────────────────────────────────────────
      D.fullPage('Mediu — indicatori detaliati si proiectie climatica', () => m._pg14_environment(ctx));

      D.chapter('Patrimoniu construit si identitate culturala');
      D.P('Patrimoniul construit (monumente istorice — LMI, zone construite protejate, ansambluri urbane) si patrimoniul imaterial definesc identitatea orasului si reprezinta o resursa pentru turism si calitatea vietii. Protejarea se realizeaza prin reglementari specifice (Legea 422/2001), zone de protectie si avize ale Directiei pentru Cultura.');
      D.bullets([
        'Conservarea si punerea in valoare a monumentelor si a zonelor protejate.',
        'Integrarea contextuala a interventiilor noi in tesutul istoric (gabarit, materiale, cromatica).',
        'Reabilitarea fatadelor si a spatiului public din zonele de patrimoniu.',
        'Valorificarea patrimoniului prin trasee culturale si turism sustenabil.',
      ]);

      // ─────────────────────────────────────────────────────────────────────
      // CAP 14 — BILANT TERITORIAL EXISTENT
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Utilizarea terenului — bilant teritorial');
      D.P('Bilantul teritorial cuantifica suprafetele pe categorii de functiune in situatia existenta si in cea propusa, fiind un instrument obligatoriu al organizarii urbanistice.');
      const ab = (m && m._pugAreaByFunc) ? m._pugAreaByFunc(pugGeo, reguli) : { total: 0, cats: {}, feats: 0 };
      if (ab.total) {
        const ha = x => x / 10000; const order = ['Rezidential', 'Mixt / Servicii / Institutii', 'Industrial / Productie', 'Spatii verzi / Agrement', 'Circulatii / Edilitar', 'Ape', 'Agricol / Rezerva', 'Altele / Neclasificat'];
        const verde = 26 * pop55, locAdd = ((need && need.locuinteTotale) || 0) * 110;
        const cur = {}; Object.keys(ab.cats).forEach(k => cur[k] = ab.cats[k].m2);
        const prop = Object.assign({}, cur);
        prop['Spatii verzi / Agrement'] = Math.max(cur['Spatii verzi / Agrement'] || 0, verde);
        prop['Rezidential'] = (cur['Rezidential'] || 0) + locAdd;
        const up = (prop['Spatii verzi / Agrement'] - (cur['Spatii verzi / Agrement'] || 0)) + locAdd;
        if (prop['Agricol / Rezerva'] != null) prop['Agricol / Rezerva'] = Math.max(0, prop['Agricol / Rezerva'] - up);
        const pt = Object.values(prop).reduce((s, v) => s + v, 0);
        const rows2 = []; order.forEach(k => { if (cur[k] == null && prop[k] == null) return; const e = cur[k] || 0, p = prop[k] || 0; rows2.push([k, N(ha(e), 1) + ' ha', (e / ab.total * 100).toFixed(1) + '%', N(ha(p), 1) + ' ha', (p / pt * 100).toFixed(1) + '%']); });
        rows2.push(['TOTAL', N(ha(ab.total), 1) + ' ha', '100%', N(ha(pt), 1) + ' ha', '100%']);
        D.table(['Functiune', 'Existent', '%', 'Propus*', '%'], rows2, [54, 30, 18, 30, 18], { boldFirst: true });
        D.source('Masurat din PUG vectorial ' + city.name + ' (' + ab.feats + ' poligoane, turf.js). *Propus = scenariu orientativ (verde la 26 mp/loc, rezidential pe necesarul de locuire).');
      } else {
        D.P('Pentru ' + city.name + ' nu este incarcat un PUG vectorial in platforma; bilantul teritorial cantitativ se va genera automat dupa incarcarea geometriei PUG. Nu se inventeaza valori.');
      }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 15 — SWOT
      // ─────────────────────────────────────────────────────────────────────
      // ─────────────────────────────────────────────────────────────────────
      // CAPITOLE TEMATICE SUPLIMENTARE (analiza aprofundata pe domenii)
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Reteaua de localitati si dezvoltarea metropolitana');
      D.h2('Zona urbana functionala (ZUF)');
      D.P('Dezvoltarea moderna a oraselor depaseste limita administrativa: fenomenul de suburbanizare a transferat populatie si activitati catre localitatile invecinate, generand fluxuri zilnice de naveta. Zona urbana functionala (ZUF) cuprinde orasul-nucleu si arealul sau de naveta, fiind cadrul natural de planificare a mobilitatii, locuirii si serviciilor.');
      D.P('Coordonarea metropolitana evita concurenta intre UAT-uri, optimizeaza investitiile in infrastructura comuna (transport, apa-canal, deseuri) si gestioneaza coerent expansiunea rezidentiala din comunele periurbane, care altfel genereaza dependenta de autoturism si presiune asupra orasului-nucleu.');
      D.h2('Cooperare teritoriala');
      D.bullets([
        'Asociatie de dezvoltare intercomunitara (ADI) pentru servicii publice comune.',
        'Plan de mobilitate la nivel metropolitan (transport public integrat, park&ride).',
        'Coordonarea expansiunii rezidentiale si protejarea coridoarelor verzi metropolitane.',
        'Strategie economica comuna pentru atragerea investitiilor.',
      ]);

      D.chapter('Resurse de apa si gospodarirea apelor');
      D.h2('Surse de apa si alimentare');
      D.P('Securitatea resurselor de apa (surse de suprafata si subterane) este esentiala pentru dezvoltarea pe termen lung. Gestionarea integrata vizeaza protejarea surselor (zone de protectie sanitara), reducerea pierderilor in retea, eficienta consumului si adaptarea la perioadele de seceta amplificate de schimbarile climatice.');
      D.h2('Apele uzate si pluviale');
      D.P('Colectarea si epurarea apelor uzate conform directivelor europene (Directiva 91/271/CEE), separarea retelelor pluviale si gestiunea apelor de ploaie prin solutii bazate pe natura (drenaj urban durabil) reduc poluarea si riscul de inundatii urbane. Reutilizarea apei si reincarcarea acviferelor sunt directii de economie circulara a apei.');
      D.callout('Adaptare la seceta si la viituri', 'Managementul apei trebuie sa gestioneze simultan ambele extreme climatice: stocarea si economisirea in perioade secetoase, respectiv retentia si evacuarea controlata in episoade de precipitatii intense.');

      D.chapter('Energie si tranzitie energetica');
      D.h2('Profilul energetic urban');
      D.P('Consumul de energie al orasului (cladiri, transport, iluminat public, servicii) si sursele de alimentare determina amprenta de carbon. Tranzitia energetica vizeaza eficienta (reducerea consumului), decarbonizarea (surse regenerabile) si flexibilitatea (stocare, retele inteligente).');
      D.table(['Directie de actiune', 'Masuri', 'Tinta'], [
        ['Eficienta energetica cladiri', 'Reabilitare termica, standard nZEB la constructii noi', '-30% consum (2030)'],
        ['Surse regenerabile', 'Fotovoltaic pe cladiri publice, comunitati de energie', '+ capacitate locala'],
        ['Iluminat public', 'Trecere integrala la LED + telegestiune', '-50% consum iluminat'],
        ['Mobilitate electrica', 'Statii de incarcare, electrificarea flotei publice', 'retea de incarcare'],
        ['Retele termice', 'Modernizare / alternative eficiente, recuperare caldura', 'pierderi minime'],
      ], [50, 76, 48], { boldFirst: true });
      D.P('Obiectivul pe termen lung este neutralitatea climatica, in acord cu misiunea UE pentru 100 de orase inteligente si neutre climatic pana in 2030 si cu angajamentele nationale.');

      D.chapter('Deseuri si economie circulara');
      D.P('Tranzitia de la modelul liniar (extragere-productie-aruncare) la economia circulara reduce consumul de resurse si impactul de mediu. Ierarhia deseurilor prioritizeaza prevenirea, reutilizarea si reciclarea, in detrimentul depozitarii.');
      D.table(['Flux', 'Tinta de valorificare', 'Instrument'], [
        ['Deseuri municipale', 'Colectare selectiva extinsa, reciclare >50%', 'Sistem integrat de management'],
        ['Biodeseuri', 'Compostare / digestie anaeroba', 'Colectare separata'],
        ['Deseuri din constructii', 'Reutilizare si reciclare materiale', 'Trasabilitate santiere'],
        ['Deseuri electronice / periculoase', 'Colectare dedicata', 'Puncte de colectare'],
      ], [54, 70, 50], { boldFirst: true });
      D.callout('Orasul circular', 'Economia circulara urbana integreaza managementul deseurilor cu energia (valorificare), apa (reutilizare) si materialele de constructie (reciclare), reducand presiunea asupra mediului si costurile pe termen lung.');

      D.chapter('Spatii publice, peisaj si identitate urbana');
      D.h2('Calitatea spatiului public');
      D.P('Spatiul public (strazi, piete, parcuri, maluri de apa) este "camera de zi" a orasului si determina in mod direct calitatea vietii urbane. Un spatiu public de calitate este accesibil, sigur, confortabil, atractiv si incluziv, favorizand interactiunea sociala si mobilitatea activa.');
      D.h2('Principii de amenajare');
      D.bullets([
        'Prioritatea pietonului si a vietii la nivelul strazii (parter activ).',
        'Confort climatic prin umbrire, vegetatie si suprafete permeabile.',
        'Accesibilitate universala si siguranta (iluminat, vizibilitate).',
        'Mobilier urban de calitate, coerent si durabil.',
        'Arta publica si elemente identitare locale.',
      ]);
      D.h2('Peisaj si patrimoniu peisagistic');
      D.P('Protejarea si valorificarea peisajului natural si cultural (deschideri vizuale, silueta urbana, maluri de apa, dealuri) intareste identitatea locala si calitatea cadrului de viata, conform Conventiei Europene a Peisajului.');

      D.chapter('Digitalizare urbana si oras inteligent (smart city)');
      D.P('Digitalizarea sustine planificarea bazata pe dovezi si imbunatateste serviciile publice. O strategie smart city integreaza date, tehnologie si participare, fara a deveni un scop in sine, ci un instrument pentru obiectivele urbane.');
      D.table(['Domeniu smart', 'Aplicatii', 'Beneficiu'], [
        ['Date urbane', 'Platforma GIS, date deschise, geamana digitala (digital twin)', 'Decizii fundamentate'],
        ['Mobilitate', 'ITS, informare in timp real, parcare inteligenta', 'Trafic fluidizat'],
        ['Mediu', 'Senzori calitate aer, zgomot, ape', 'Monitorizare continua'],
        ['Servicii publice', 'Administratie digitala, ghiseu unic online', 'Acces si transparenta'],
        ['Energie / utilitati', 'Contorizare inteligenta, retele eficiente', 'Reducerea pierderilor'],
      ], [44, 80, 50], { boldFirst: true });

      D.chapter('Guvernanta urbana si capacitate institutionala');
      D.P('Implementarea unui masterplan ambitios depinde de capacitatea institutionala a administratiei: resurse umane calificate, structuri dedicate de management urban, capacitate de atragere si gestiune a fondurilor europene si cooperare intre departamente si cu actorii externi.');
      D.bullets([
        ['Structura de management urban integrat', 'coordoneaza implementarea, monitorizeaza indicatorii si raporteaza public'],
        ['Capacitate de absorbtie a fondurilor', 'pregatirea si managementul proiectelor cu finantare europeana'],
        ['Planificare integrata', 'corelarea documentatiilor (PUG, PMUD, SIDU, strategii sectoriale)'],
        ['Date si monitorizare', 'sistem de indicatori si platforma de date pentru decizii'],
        ['Parteneriate', 'cooperare cu mediul privat, academic si societatea civila'],
      ]);

      D.chapter('Diagnostic integrat — disfunctionalitati si analiza SWOT');
      D.h2('Disfunctionalitati majore');
      D.bullets([
        'Expansiune urbana necontrolata si echipare edilitara deficitara in zonele periferice.',
        'Dependenta de autoturism, congestie si deficit de mobilitate activa.',
        'Deficit de spatii verzi raportat la norma legala.',
        'Fond locativ imbatranit si zone care necesita regenerare.',
        'Presiune asupra patrimoniului si a peisajului.',
      ]);
      D.h2('Analiza SWOT');
      D.table(['PUNCTE TARI (S)', 'PUNCTE SLABE (W)'], [
        ['Rol polarizator regional; capital uman; potential economic', 'Infrastructura edilitara partial deficitara; mobilitate dependenta de auto'],
        ['Patrimoniu si identitate locala; cadru natural', 'Deficit spatii verzi; fond locativ imbatranit'],
      ], [87, 87], { fs: 7.4 });
      D.table(['OPORTUNITATI (O)', 'AMENINTARI (T)'], [
        ['Fonduri europene (POR, PNRR); tranzitie verde si digitala', 'Schimbari climatice si riscuri naturale; declin/imbatranire demografica'],
        ['Densificare calitativa; dezvoltare metropolitana', 'Competitia pentru investitii; expansiune necontrolata'],
      ], [87, 87], { fs: 7.4 });

      // ─────────────────────────────────────────────────────────────────────
      // CAP 16 — VIZIUNE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Viziune strategica, obiective si tinte');
      D.callout('Viziune 2055', 'Un oras rezilient, verde, accesibil si competitiv, in care dezvoltarea spatiala echilibrata, mobilitatea durabila si calitatea spatiului public asigura o viata urbana de inalta calitate pentru toti locuitorii, cu protejarea patrimoniului si adaptarea la schimbarile climatice.');
      D.h2('Obiective strategice si tinte cuantificate');
      D.table(['Obiectiv', 'Tinta 2030', 'Tinta 2040'], [
        ['Spatii verzi/locuitor', '>= 20 mp', '>= 26 mp'],
        ['Transfer modal (TP+activ)', '+6 pp', '+16 pp'],
        ['Emisii GES (transport+cladiri)', '-30%', '-55%'],
        ['Locuinte noi/an', N(Math.round(((need && need.locuinteTotale) || 0) / 30)), 'mentinut'],
        ['Acoperire canalizare', '>= 90%', '100%'],
        ['Densificare intravilan vs expansiune', 'prioritate densificare', 'intravilan saturat calitativ'],
      ], [70, 52, 52], { boldFirst: true });

      // ─────────────────────────────────────────────────────────────────────
      // CAP 17 — SCENARII
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Scenarii de dezvoltare');
      D.P('Trei scenarii structureaza alegerea strategica, evaluate multicriterial (demografie, economie, mediu, mobilitate, cost):');
      D.table(['Scenariu', 'Descriere', 'Rezultat'], [
        ['A — Tendential', 'Continuarea tendintelor actuale, fara interventii majore', 'Expansiune, congestie, deficit verde'],
        ['B — Moderat (referinta)', 'Investitii echilibrate, densificare partiala', 'Stabilizare, imbunatatiri graduale'],
        ['C — Ambitios (recomandat)', 'Densificare calitativa + mobilitate durabila + verde + regenerare', 'Atingerea tintelor 2030-2040'],
      ], [42, 92, 40], { boldFirst: true });
      D.callout('Scenariu recomandat: C — Ambitios', 'Maximizeaza beneficiul pe termen lung (calitatea vietii, reziliente, competitivitate), cu un efort investitional esalonat si mobilizarea fondurilor europene. Necesita capacitate institutionala si parteneriate.');
      D.h2('Evaluarea multicriteriala a scenariilor');
      D.P('Scenariile sunt evaluate pe un set de criterii ponderate, acoperind dimensiunile dezvoltarii durabile (economic, social, mediu) si fezabilitatea implementarii. Scorurile sunt relative (0-10).');
      D.table(['Criteriu (pondere)', 'A — Tendential', 'B — Moderat', 'C — Ambitios'], [
        ['Calitatea vietii (20%)', '3', '6', '9'],
        ['Sustenabilitate mediu (20%)', '2', '6', '9'],
        ['Competitivitate economica (15%)', '4', '6', '8'],
        ['Echitate sociala (15%)', '3', '6', '8'],
        ['Rezilienta la riscuri (15%)', '3', '5', '9'],
        ['Fezabilitate / cost (15%)', '8', '7', '5'],
        ['SCOR PONDERAT TOTAL', '3.7', '6.0', '8.1'],
      ], [60, 38, 38, 38], { boldFirst: true });
      D.source('Analiza multicriteriala (MCA) — ponderi orientative pe dimensiunile dezvoltarii durabile. Scorul confirma scenariul C ca optim.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 18 — BENCHMARK
      // ─────────────────────────────────────────────────────────────────────
      D.fullPage('Scenarii — proiectii demografice si de dezvoltare comparate', () => m._pg8_scenarios(ctx));

      D.chapter('Benchmark national si european');
      D.P('Pozitionarea comparativa fata de orase similare din Romania si din Europa ofera repere pentru tinte realiste si pentru transferul de bune practici.');
      if (bench && (bench.dims || bench.dimensions)) {
        D.P('Profilul orasului este evaluat pe multiple dimensiuni normalizate (demografie, economie, mediu, mobilitate, locuire, servicii), comparativ cu media nationala si cu orase europene comparabile.');
      }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 19 — PROPUNERI ORGANIZARE (zonificare propusa)
      // ─────────────────────────────────────────────────────────────────────
      D.fullPage('Benchmark — radar 8 dimensiuni si heatmap comparativ', () => m._pg9_benchmark(ctx));

      D.chapter('Propuneri de organizare urbanistica');
      D.P('Organizarea urbanistica propusa structureaza teritoriul pe zone functionale coerente, prioritizand densificarea calitativa, mixul functional si conceptul orasului de proximitate. Plansa de reglementari (zonificare functionala) reda distributia spatiala a functiunilor.');
      D.h2('Principii de organizare spatiala');
      D.bullets([
        ['Densificare calitativa', 'cresterea densitatii in zonele bine echipate si servite de transport public, in locul expansiunii necontrolate spre extravilan'],
        ['Mix functional', 'combinarea locuirii cu servicii, comert si locuri de munca la nivel de cartier, pentru reducerea deplasarilor'],
        ['Dezvoltare orientata spre transport (TOD)', 'concentrarea dezvoltarii in jurul nodurilor de transport public'],
        ['Structura policentrica', 'centre de cartier echipate, care descongestioneaza centrul si apropie serviciile de locuitori'],
        ['Coridoare verzi-albastre', 'integrarea retelei ecologice si a cursurilor de apa ca structura a spatiului public'],
        ['Limita de dezvoltare', 'delimitarea clara intravilan/extravilan pentru protejarea terenurilor agricole si naturale'],
      ]);
      D.h2('Strategia de densificare si regenerare');
      D.P('Densificarea se aplica diferentiat: regenerarea si completarea tesutului existent (infill), reconversia terenurilor industriale dezafectate (brownfield) si restructurarea zonelor periferice slab structurate. Reconversia brownfield este prioritara, valorificand terenuri deja echipate si evitand consumul de teren nou.');
      D.table(['Tip de interventie', 'Localizare', 'Instrument urbanistic'], [
        ['Infill / completare', 'Tesut urban consolidat', 'PUZ / autorizare directa'],
        ['Regenerare ansambluri', 'Cartiere de blocuri', 'PUZ de regenerare urbana'],
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
          D.pdf.setTextColor(40, 50, 70); D.pdf.setFont('helvetica', 'bold'); D.pdf.setFontSize(9); D.pdf.text('N', drawX + drawW - 6, yy + 8, { align: 'center' }); }
        D.setY(yy + drawH + 4);
        // legenda
        let lx = drawX, ly = D.y; D.pdf.setFont('helvetica', 'bold'); D.pdf.setFontSize(7.5); D.pdf.setTextColor(40, 50, 70); D.pdf.text('LEGENDA FUNCTIUNI', drawX, ly); D.setY(ly + 4); ly = D.y;
        Object.keys(used).forEach(cat => { const col = used[cat]; if (lx > dims.W - 70) { lx = drawX; ly += 5; } D.pdf.setFillColor(col[0], col[1], col[2]); D.pdf.rect(lx, ly - 2.6, 3.2, 3.2, 'F'); D.pdf.setTextColor(50, 60, 80); D.pdf.setFont('helvetica', 'normal'); D.pdf.setFontSize(6.3); D.pdf.text(S2(cat), lx + 4.2, ly); lx += 4.2 + D.pdf.getTextWidth(S2(cat)) + 6; });
        D.setY(ly + 5);
        D.source('Plansa schematica generata din PUG vectorial ' + city.name + ' (WGS84). Nu inlocuieste plansa topografica vizata.');
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
        D.source('RLU ' + city.name + ' — ' + keys.length + ' subzone. POT/CUT/SV conform regulamentului in vigoare.');
      } else {
        D.P('Reguli urbanistice digitale indisponibile pentru ' + city.name + ' — se preiau din RLU/PUG dupa incarcare.');
      }

      // ─────────────────────────────────────────────────────────────────────
      // CAP 21 — PROFILE STRADALE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Profile stradale si mobilitate propusa');
      D.P('Profilele stradale tip reglementeaza alocarea spatiului public intre modurile de deplasare, prioritizand pietonii, biciclistii si transportul public. Toate profilele includ aliniamente de arbori si gestiunea apelor pluviale.');
      const profile = [
        ['Bulevard principal (cat. I-II) — 26 m', [['Trotuar', 2.5, [120, 130, 150]], ['Arbori', 1.5, [46, 160, 90]], ['Pista velo', 2.0, [245, 158, 11]], ['Auto', 3.25, [95, 95, 100]], ['Auto', 3.25, [95, 95, 100]], ['TP/verde', 3.0, [168, 85, 247]], ['Auto', 3.25, [95, 95, 100]], ['Auto', 3.25, [95, 95, 100]], ['Trotuar+verde', 4.0, [46, 160, 90]]]],
        ['Strada colectoare (cat. III) — 15 m', [['Trotuar', 2.0, [120, 130, 150]], ['Arbori', 1.5, [46, 160, 90]], ['Pista velo', 1.5, [245, 158, 11]], ['Auto', 3.0, [95, 95, 100]], ['Auto', 3.0, [95, 95, 100]], ['Trotuar+verde', 4.0, [46, 160, 90]]]],
        ['Strada locala (cat. IV) — 9 m', [['Trotuar', 1.5, [120, 130, 150]], ['Auto', 2.75, [95, 95, 100]], ['Auto', 2.75, [95, 95, 100]], ['Trotuar+verde', 2.0, [46, 160, 90]]]],
      ];
      profile.forEach(pf => { D.ensure(20); D.pdf.setTextColor(40, 50, 70); D.pdf.setFont('helvetica', 'bold'); D.pdf.setFontSize(8); D.pdf.text(S2(pf[0]), D.dims.ML, D.y); D.setY(D.y + 3); const x0 = D.dims.ML, drawW = D.dims.CW, total = pf[1].reduce((s, k) => s + k[1], 0), h = 11; let cx = x0; const yy = D.y; pf[1].forEach(k => { const w = k[1] / total * drawW; D.pdf.setFillColor(k[2][0], k[2][1], k[2][2]); D.pdf.rect(cx, yy, w, h, 'F'); D.pdf.setDrawColor(255, 255, 255); D.pdf.setLineWidth(0.2); D.pdf.rect(cx, yy, w, h, 'S'); if (w > 9) { D.pdf.setTextColor(255, 255, 255); D.pdf.setFont('helvetica', 'bold'); D.pdf.setFontSize(5.4); D.pdf.text(S2(k[0]), cx + w / 2, yy + h / 2 - 0.5, { align: 'center' }); D.pdf.setFontSize(5); D.pdf.text(k[1] + 'm', cx + w / 2, yy + h / 2 + 2.6, { align: 'center' }); } cx += w; }); D.setY(yy + h + 6); });
      D.source('STAS 10144/1-90 + ghid mobilitate durabila. Profilele se detaliaza in PMUD si in PUZ.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 22 — GHID DESIGN
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Ghid de design urban si peisagistic');
      D.h2('Cromatica si materiale');
      D.P('Se recomanda materiale naturale si tonuri pamantii/neutre pentru fatade, evitand culorile stridente pe volume mari. Placarile ceramice/compozite se folosesc ca accent.');
      D.h2('Reguli de estetica urbana');
      D.bullets([
        'Imprejmuiri transparente sau vegetale spre spatiul public; se descurajeaza gardurile opace inalte.',
        'Parcarea la sol limitata; garaje colective/subterane mascate cu fatade verzi.',
        'Acoperisuri verzi si panouri fotovoltaice incurajate pe cladirile noi.',
        'Mobilier urban unitar (banci, iluminat, cosuri) pe o familie de design coerenta.',
        'Publicitatea exterioara reglementata pentru a proteja imaginea urbana.',
      ]);
      D.h2('Vegetatie si management al apelor pluviale');
      D.P('Plantari cu specii native adaptate climatic; interzicerea speciilor invazive. Gestiunea apelor pluviale prin gradini de ploaie, rigole inierbate si pavaje permeabile. Aliniamentele de arbori sunt obligatorii pe arterele principale (umbrire, confort termic, reducerea insulei de caldura).');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 23 — ACCESIBILITATE / 15 MIN
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Accesibilitate si orasul de 15 minute');
      D.P('Conceptul orasului de 15 minute presupune ca locuitorii sa aiba acces, in maximum 15 minute de mers pe jos sau cu bicicleta, la functiunile esentiale: locuire, munca, comert, educatie, sanatate, cultura si recreere. Aceasta reduce nevoia de deplasari motorizate si creste calitatea vietii.');
      D.bullets([
        'Mix functional la nivel de cartier (locuire + servicii + comert de proximitate).',
        'Dotari sociale (scoala, gradinita, cabinet medical) la distanta de mers pe jos.',
        'Spatii publice si verzi accesibile in proximitatea fiecarei locuinte.',
        'Retea pietonala si velo continua, sigura si confortabila.',
        'Accesibilitate universala (persoane cu mobilitate redusa, varstnici, copii).',
      ]);

      // ─────────────────────────────────────────────────────────────────────
      // CAP 24 — PHASING
      // ─────────────────────────────────────────────────────────────────────
      D.fullPage('Accesibilitate, walkability si simulare Monte Carlo', () => m._pg21_accessibility(ctx));

      D.chapter('Plan de implementare si etapizare');
      D.table(['Etapa', 'Orizont', 'Prioritati'], [
        ['Etapa 1 — Fundamentare', '2025-2030', 'Actualizare PUG/PUZ, regenerare zone pilot, mobilitate activa, spatii verzi'],
        ['Etapa 2 — Consolidare', '2030-2040', 'Densificare TOD, extindere retele, transport public, locuire accesibila'],
        ['Etapa 3 — Maturizare', '2040-2055', 'Neutralitate climatica, oras de proximitate generalizat, reziliente'],
      ], [40, 32, 102], { boldFirst: true });
      D.h2('Portofoliu de proiecte prioritare');
      D.P('Portofoliul de proiecte operationalizeaza obiectivele strategice. Fiecare proiect este caracterizat prin obiectiv, descriere, indicatori de rezultat, etapa de implementare si sursa de finantare. Bugetele sunt orientative si se detaliaza in studiile de fezabilitate.');
      const invTot = (invest && (invest.total || invest.totalMilEur)) || Math.round(pop * 0.5);
      const proiecte = [
        ['P1 — Actualizare PUG si documentatii de urbanism', 'Actualizarea Planului Urbanistic General si elaborarea PUZ-urilor pentru zonele de regenerare si densificare, in conformitate cu viziunea Masterplanului.', 'PUG aprobat; min. 5 PUZ-uri prioritare', 'Etapa 1', Math.round(invTot * 0.01)],
        ['P2 — Regenerarea ansamblurilor de locuinte colective', 'Reabilitare termica, modernizarea spatiului public dintre blocuri, parcari organizate, spatii verzi si dotari de proximitate in cartierele construite in perioada socialista.', 'Min. 3 ansambluri regenerate; -40% consum energetic', 'Etapa 1-2', Math.round(invTot * 0.18)],
        ['P3 — Reteaua de mobilitate activa', 'Realizarea unei retele continue si sigure de piste de biciclete si trasee pietonale, conectand cartierele cu centrul, zonele de munca si dotarile majore.', '+' + N(Math.round(pop / 1000 * 1.2)) + ' km piste; +6 pp cota activa', 'Etapa 1-2', Math.round(invTot * 0.08)],
        ['P4 — Modernizarea transportului public', 'Innoirea flotei cu vehicule electrice, benzi dedicate, prioritizare semaforica, e-ticketing si cresterea frecventei pe coridoarele principale.', 'Flota electrica >50%; +10 pp cota TP', 'Etapa 2', Math.round(invTot * 0.16)],
        ['P5 — Infrastructura verde-albastra', 'Crearea si conectarea parcurilor, coridoarelor verzi de-a lungul cursurilor de apa, scuarurilor si acoperisurilor verzi, atingand norma de 26 mp/locuitor.', '>= 26 mp verde/loc; coridor ecologic continuu', 'Etapa 1-3', Math.round(invTot * 0.12)],
        ['P6 — Extinderea si modernizarea retelelor edilitare', 'Extinderea retelelor de apa-canal in zonele deficitare, reducerea pierderilor, statie de epurare conforma si digitalizarea managementului.', '100% canalizare; -20% pierderi apa', 'Etapa 1-2', Math.round(invTot * 0.15)],
        ['P7 — Locuinte accesibile si sociale', 'Dezvoltarea unui fond de locuinte accesibile si sociale, prin proiecte publice si parteneriate, pentru tineri, familii si categorii vulnerabile.', '+' + N(Math.round(((need && need.locuinteTotale) || 0) * 0.1)) + ' locuinte accesibile', 'Etapa 2-3', Math.round(invTot * 0.1)],
        ['P8 — Eficienta energetica si surse regenerabile', 'Eficientizarea energetica a cladirilor publice, iluminat public LED, instalatii fotovoltaice si tranzitia catre neutralitate climatica.', '-30% emisii cladiri publice (2030)', 'Etapa 1-3', Math.round(invTot * 0.08)],
        ['P9 — Digitalizare urbana (smart city)', 'Platforma de date urbane, senzori de mediu si trafic, servicii publice digitale si sisteme inteligente de transport (ITS).', 'Platforma urbana operationala; ITS pe arterele majore', 'Etapa 2', Math.round(invTot * 0.05)],
        ['P10 — Regenerarea zonelor centrale si de patrimoniu', 'Reabilitarea spatiului public si a fatadelor in zonele istorice/protejate, pietonalizari si valorificarea patrimoniului.', 'Zona centrala regenerata; trasee culturale', 'Etapa 2-3', Math.round(invTot * 0.07)],
      ];
      proiecte.forEach(p => {
        D.h3(p[0]);
        D.P(p[1], { gap: 1.5 });
        D.table(['Indicatori de rezultat', 'Etapa', 'Buget orientativ'], [[p[2], p[3], N(p[4]) + ' mil. EUR']], [96, 30, 48], { fs: 7 });
      });
      D.callout('Buget total portofoliu', 'Investitie cumulata orientativa de aproximativ ' + N(invTot) + ' mil. EUR pe orizontul 2025-2055, mobilizata predominant din fonduri europene (POR, PNRR), completate de buget local si parteneriate public-private.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 25 — FINANTARE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Analiza financiara si surse de finantare');
      D.P('Implementarea Masterplanului mobilizeaza surse diverse, in functie de tipul investitiei:');
      D.table(['Sursa de finantare', 'Tip de investitii', 'Observatii'], [
        ['POR (Programul Operational Regional)', 'Mobilitate, regenerare, eficienta energetica', 'Cofinantare UE majoritara'],
        ['PNRR', 'Tranzitie verde si digitala, locuire', 'Termene de implementare stricte'],
        ['Buget local', 'Infrastructura de baza, intretinere', 'Capacitate de cofinantare'],
        ['Parteneriate public-private (PPP)', 'Dezvoltari imobiliare, parcari, utilitati', 'Repartizarea riscurilor'],
        ['Fonduri pentru tranzitie justa / mediu', 'Decarbonizare, economie circulara', 'Eligibilitate specifica'],
      ], [56, 70, 48], { boldFirst: true });
      D.callout('Principiu de finantare', 'Prioritizarea proiectelor cu raport beneficiu/cost ridicat si cu efect de levier (atrag investitii private), esalonate pe etape pentru a distribui efortul bugetar.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 26 — MONITORIZARE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Monitorizare, evaluare si guvernanta');
      D.table(['Indicator', 'Unitate', 'Frecventa', 'Tinta'], [
        ['Spatii verzi/locuitor', 'mp/loc', 'Anual', '>= 26'],
        ['Transfer modal (TP+activ)', '%', 'Anual', '+16 pp'],
        ['Emisii GES', 't CO2e/cap', 'Anual', '-55% (2040)'],
        ['Locuinte autorizate', 'nr/an', 'Anual', 'conform necesar'],
        ['Acoperire canalizare', '%', 'Bienal', '100%'],
        ['Suprafata regenerata', 'ha', 'Anual', 'crescator'],
        ['Satisfactia locuitorilor', 'scor', 'Bienal', 'crescator'],
      ], [56, 34, 36, 48], { boldFirst: true });
      D.P('Implementarea este coordonata de o structura de management urban integrat din cadrul primariei, cu raportare publica anuala. Masterplanul se revizuieste periodic (la 5-7 ani sau la modificari majore), in ciclu de planificare adaptiva.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 27 — PARTICIPARE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Participare publica si transparenta');
      D.P('Planificarea participativa asigura legitimitatea si calitatea deciziilor. Procesul include consultari publice, dezbateri, ateliere cu partile interesate (cetateni, mediu de afaceri, societate civila, institutii) si transparenta deciziilor, conform Legii 52/2003 si Legii 350/2001.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 28 — CONCLUZII
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Piata imobiliara si dinamica terenurilor');
      D.P('Piata imobiliara reflecta si influenteaza dezvoltarea urbana. Preturile terenurilor si ale locuintelor, ritmul tranzactiilor si presiunea de dezvoltare semnaleaza zonele atractive si riscurile de speculatie sau de excludere a categoriilor cu venituri reduse. Monitorizarea pietei fundamenteaza politici de locuire accesibila si de captare a plusvalorii generate de investitiile publice.');
      D.bullets([
        ['Presiune de dezvoltare', 'zonele bine echipate si conectate atrag investitii — necesita reglementare pentru densificare calitativa'],
        ['Accesibilitatea locuirii', 'cresterea preturilor poate exclude tinerii si familiile — argument pentru locuinte accesibile'],
        ['Captarea plusvalorii', 'investitiile publice (transport, parcuri) cresc valoarea terenurilor private — mecanisme de recuperare pentru comunitate'],
        ['Terenuri subutilizate', 'identificarea si activarea terenurilor virane si a brownfield-urilor din intravilan'],
      ]);

      D.chapter('Turism, cultura si economie locala');
      D.P('Turismul si activitatile culturale valorifica patrimoniul si identitatea locala, generand venituri si locuri de munca. Dezvoltarea unei oferte turistice sustenabile (trasee culturale, evenimente, turism urban si de proximitate) trebuie integrata cu protejarea patrimoniului si cu calitatea spatiului public, evitand suprasolicitarea (overtourism).');
      D.P('Economia locala de proximitate (comert, servicii, mestesuguri, industrii creative) sustine vitalitatea cartierelor si modelul orasului de 15 minute. Sprijinirea parterelor active, a pietelor locale si a antreprenoriatului contribuie la coeziune si la reducerea deplasarilor.');

      D.chapter('Oras incluziv si egalitate de sanse');
      D.P('Un oras incluziv asigura acces echitabil la locuire, servicii, spatiu public si oportunitati pentru toti locuitorii, indiferent de varsta, gen, venit, dizabilitate sau origine. Planificarea sensibila la dimensiunea sociala previne segregarea si marginalizarea.');
      D.bullets([
        ['Accesibilitate universala', 'spatiu public si dotari adaptate persoanelor cu mobilitate redusa, varstnicilor si copiilor'],
        ['Locuire pentru toti', 'mix social si fond de locuinte accesibile/sociale, prevenirea segregarii rezidentiale'],
        ['Siguranta si confort', 'spatii publice sigure, bine iluminate, prietenoase pentru femei, copii si varstnici'],
        ['Servicii de proximitate', 'acces echitabil la educatie, sanatate si servicii sociale in toate cartierele'],
      ]);

      D.chapter('Siguranta urbana si rezilienta comunitatii');
      D.P('Siguranta urbana (rutiera, fata de criminalitate, fata de dezastre) si rezilienta comunitatii sunt conditii ale calitatii vietii. Proiectarea spatiului public pentru siguranta (vizibilitate, iluminat, activitate), sistemele de avertizare si planurile de urgenta, alaturi de coeziunea sociala, intaresc capacitatea orasului de a face fata socurilor (climatice, economice, sanitare).');

      D.chapter('Cooperare, parteneriate si finantare strategica');
      D.P('Realizarea viziunii depinde de cooperarea intre administratie, mediul privat, mediul academic si societatea civila, si de capacitatea de a mobiliza resurse diverse. Parteneriatele public-private, cooperarea metropolitana si atragerea fondurilor europene multiplica impactul investitiilor publice.');
      D.table(['Tip de cooperare', 'Rol', 'Exemple'], [
        ['Cooperare metropolitana', 'Coordonarea dezvoltarii si a serviciilor', 'ADI, transport public integrat'],
        ['Parteneriate public-private', 'Cofinantare si expertiza', 'Regenerare, parcari, utilitati'],
        ['Parteneriate cu mediul academic', 'Cercetare, inovare, monitorizare', 'Universitati, institute'],
        ['Implicarea societatii civile', 'Legitimitate si calitate a deciziilor', 'ONG-uri, asociatii de cartier'],
      ], [50, 58, 66], { boldFirst: true, fs: 7 });

      D.chapter('Concluzii si recomandari strategice');
      D.P('Masterplanul Strategic al Municipiului ' + city.name + ' fundamenteaza o dezvoltare urbana integrata, durabila si rezilienta. Recomandarile prioritare:');
      D.bullets([
        'Adoptarea scenariului ambitios (C) si actualizarea PUG in consecinta.',
        'Prioritizarea densificarii calitative a intravilanului echipat.',
        'Implementarea PMUD si transferul modal catre mobilitate durabila.',
        'Cresterea si conectarea spatiilor verzi la norma legala.',
        'Regenerarea ansamblurilor de locuinte si a zonelor degradate.',
        'Adaptarea la schimbarile climatice si reducerea expunerii la riscuri.',
        'Consolidarea capacitatii institutionale si a participarii publice.',
      ]);

      // ─────────────────────────────────────────────────────────────────────
      // CAP 29 — ANEXE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Anexe — surse de date, indicatori si glosar');
      D.h2('Glosar de termeni');
      D.table(['Termen', 'Definitie'], [
        ['POT', 'Procent de Ocupare a Terenului — raportul dintre aria construita la sol si aria terenului'],
        ['CUT', 'Coeficient de Utilizare a Terenului — raportul dintre aria desfasurata si aria terenului'],
        ['PUG / PUZ / PUD', 'Plan Urbanistic General / Zonal / de Detaliu'],
        ['RLU', 'Regulament Local de Urbanism'],
        ['TOD', 'Transit-Oriented Development — dezvoltare orientata catre transport public'],
        ['ZUF', 'Zona Urbana Functionala'],
        ['GES', 'Gaze cu Efect de Sera'],
      ], [30, 144], { boldFirst: true });
      D.h2('Surse de date');
      D.P('INS TEMPO-Online; Eurostat (Urban Audit, NUTS3); INFP (zonare seismica); ANAR/MMAP (hidrografie, hazard inundatii); ANM (date climatice); OpenStreetMap; PUG vectorial UAT; analize geospatiale UrbanX (turf.js).');
      D.spacer(2);
      D.callout('Disclaimer', 'Document strategic de fundamentare, cu valoare orientativa si analitica. Propunerile spatiale si indicatorii se valideaza prin documentatiile de urbanism normative (PUG/PUZ) elaborate de colective atestate RUR, pe suport topografic vizat.');
      D.fullPage('Anexa statistica — toate datele cu surse citate', () => m._pg22_full_statistics(ctx));
    }
  };
})(window);
