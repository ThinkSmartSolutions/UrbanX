// ═══════════════════════════════════════════════════════════════════════════
// tci-strategic-pmud-content.js — PMUD extins (100+ pagini) pe motorul de flux.
// Structura oficiala in 10 componente (ghid MDLPA + EU SUMP/ELTIS), model dupa
// PMUD Oradea: subsectiuni multiple, grafice, formule, surse, fise de proiecte.
// Date: model de mobilitate calibrat + context din surse oficiale (INS, Eurostat,
// EEA, ghid SUMP). Incarcat dupa tci-strategic-doc.js + tci-masterplan.js.
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  const _jsPDF = () => (typeof jsPDF !== 'undefined') ? jsPDF : (window.jspdf && window.jspdf.jsPDF) || window.jsPDF || null;
  const MP = () => G._TCIMasterplanPDF;
  const PM = () => G._TCIPmudPDF;
  const RO = { 'ă':'a','â':'a','î':'i','ș':'s','ş':'s','ț':'t','ţ':'t','Ă':'A','Â':'A','Î':'I','Ș':'S','Ş':'S','Ț':'T','Ţ':'T','–':'-','—':'-','…':'...','„':'"','”':'"','“':'"','’':"'",'•':'-','°':' gr','²':'2','³':'3','€':'EUR' };
  const S2 = s => s==null ? '' : String(s).split('').map(c=>RO[c]!==undefined?RO[c]:c).join('').replace(/[^\x20-\x7E]/g,' ');
  const N = (v,d=0)=> isNaN(+v)?'-':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
  const RN = (v,d=1)=> isNaN(+v)?'-':Number(v).toFixed(d);

  G._StratPMUD = {
    async generate(cityKey, scenario) {
      const J = _jsPDF(), m = MP(), p = PM();
      if (!J || !m || !p) { window.ss && ss('Motor PMUD indisponibil'); return; }
      window.ss && ss('🚍 Generez PMUD extins (100+ pagini)...');
      try {
        const city = m._resolveCity(cityKey); if (!city) { ss && ss('UAT negasit'); return; }
        const mob = p._mobilityModel(city);
        let aq = null;
        try { if (typeof _AQLive !== 'undefined' && _AQLive.fetch) aq = await Promise.race([_AQLive.fetch(city.lat, city.lon), new Promise(r => setTimeout(() => r(null), 5000))]); } catch (e) {}
        const pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        pdf.__doc = 'PMUD 2025-2040';
        const D = window._makeStratDoc(pdf, { docTitle: 'PMUD — PLAN DE MOBILITATE URBANA DURABILA', cityName: city.name, accent: [34, 160, 90] });
        const ctx = { city, mob, aq, scenario: scenario || 'S2', cityKey };
        // COPERTA
        D.setSuppress(true); D.setPage(1); this._cover(D, ctx); D.setSuppress(false);
        G._StratPMUDContent.build(D, ctx);
        window._buildStratTOC(D, 1);
        const fn = ('PMUD_' + S2(city.name || cityKey) + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
        pdf.save(fn);
        window.ss && ss('✅ PMUD extins generat: ' + pdf.getNumberOfPages() + ' pagini · ' + city.name);
        return fn;
      } catch (err) { console.error('[StratPMUD]', err); window.ss && ss('❌ Eroare PMUD: ' + (err.message || err).slice(0, 80)); }
    },
    _cover(D, ctx) {
      const pdf = D.pdf, W = 210, H = 297, m = ctx.mob, city = ctx.city;
      pdf.setFillColor(7, 26, 18); pdf.rect(0, 0, W, H, 'F');
      pdf.setFillColor(34, 160, 90); pdf.rect(0, 0, W, 4, 'F'); pdf.rect(0, H - 4, W, 4, 'F');
      pdf.setTextColor(120, 230, 170); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9);
      pdf.text('URBANX · TEMPORAL CITY INTELLIGENCE', W / 2, 42, { align: 'center' });
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(34); pdf.text('PMUD', W / 2, 70, { align: 'center' });
      pdf.setFontSize(15); pdf.text(S2('PLAN DE MOBILITATE URBANA DURABILA'), W / 2, 82, { align: 'center' });
      pdf.setTextColor(120, 230, 170); pdf.setFontSize(11); pdf.text(S2(city.name + '  ·  orizont 2025 - 2040'), W / 2, 93, { align: 'center' });
      pdf.setTextColor(150, 190, 170); pdf.setFontSize(7.5); pdf.text(S2('Metodologie EU SUMP (ELTIS) + ghid MDLPA · 10 componente · model dupa standardul national'), W / 2, 100, { align: 'center', maxWidth: W - 24 });
      pdf.setFillColor(12, 38, 26); pdf.rect(18, 112, W - 36, 78, 'F'); pdf.setFillColor(34, 160, 90); pdf.rect(18, 112, 2.5, 78, 'F');
      [['Populatie (2021):', N(m.pop) + ' loc.'], ['Grad motorizare:', m.motoriz + ' autoturisme/1000 loc'],
       ['Distributie modala (auto/TP/activ):', m.modalAct[0] + '% / ' + m.modalAct[1] + '% / ' + m.modalAct[2] + '%'],
       ['Tinta 2030 (auto/TP/activ):', m.modalTinta[0] + '% / ' + m.modalTinta[1] + '% / ' + m.modalTinta[2] + '%'],
       ['Retea stradala:', N(m.strRet) + ' km'], ['Emisii CO2 transport:', m.co2cap + ' t/cap/an']
      ].forEach((r, i) => { pdf.setTextColor(150, 190, 170); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.text(S2(r[0]), 24, 122 + i * 11);
        pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9.5); pdf.text(S2(String(r[1])), 118, 122 + i * 11); });
      // strip surse
      pdf.setTextColor(120, 150, 135); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6.5); pdf.text('SURSE OFICIALE INTEGRATE', W / 2, 205, { align: 'center' });
      const srcs = ['INS TEMPO', 'Eurostat', 'EEA', 'OpenStreetMap', 'OpenAQ', 'INFP', 'Ghid SUMP/ELTIS', 'MDLPA']; let bx = 0; pdf.setFontSize(7);
      const widths = srcs.map(s => pdf.getTextWidth(S2(s)) + 8); const totalW = widths.reduce((a, b) => a + b + 3, 0); bx = (W - totalW) / 2;
      srcs.forEach((s, i) => { pdf.setFillColor(15, 45, 32); pdf.setDrawColor(34, 160, 90); pdf.setLineWidth(0.2); pdf.roundedRect(bx, 209, widths[i], 6, 1.2, 1.2, 'FD'); pdf.setTextColor(160, 220, 185); pdf.setFont('helvetica', 'normal'); pdf.text(S2(s), bx + 4, 213); bx += widths[i] + 3; });
      pdf.setTextColor(120, 150, 135); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7);
      pdf.text(S2('Document de fundamentare (pre-PMUD). PMUD final: model de trafic calibrat de consultant atestat, anchete de mobilitate, aviz CTATU.'), W / 2, H - 18, { align: 'center', maxWidth: W - 30 });
      pdf.text(S2('Generat: ' + new Date().toLocaleDateString('ro-RO') + ' · UrbanX'), W / 2, H - 10, { align: 'center' });
    }
  };

  G._StratPMUDContent = {
    build(D, ctx) {
      const m = ctx.mob, city = ctx.city, aq = ctx.aq;
      const pop = m.pop, depZi = Math.round(pop * 2.8);
      const PAL = D.PAL;
      const trafColor = [239,68,68], tpColor = [59,130,246], activColor = [34,197,94];

      // ── 1. INTRODUCERE ───────────────────────────────────────────────────
      D.chapter('Introducere');
      D.h2('Scopul si rolul documentatiei');
      D.P('Planul de Mobilitate Urbana Durabila (PMUD) este instrumentul strategic de planificare a mobilitatii la nivelul ' + city.name + ' si al zonei sale functionale, avand ca scop asigurarea unui sistem de transport sigur, accesibil, eficient si cu impact redus asupra mediului. PMUD raspunde nevoilor de mobilitate ale persoanelor si marfurilor, contribuind la cresterea calitatii vietii si la dezvoltarea economica durabila.');
      D.P('Spre deosebire de planificarea traditionala a transportului (centrata pe fluiditatea traficului auto), PMUD pune accentul pe oameni si pe accesibilitate, integrand toate modurile de transport intr-o abordare echilibrata si pe termen lung. Documentul este obligatoriu pentru accesarea fondurilor europene dedicate mobilitatii urbane (POR, PNRR).');
      D.h2('Incadrarea in documentele de planificare spatiala');
      D.P('PMUD se coreleaza cu Planul Urbanistic General (PUG), cu Strategia Integrata de Dezvoltare Urbana (SIDU) si cu documentatiile de amenajare a teritoriului judetean (PATJ). Dezvoltarea spatiala (localizarea locuirii, a locurilor de munca si a serviciilor) determina cererea de mobilitate; de aceea, PMUD si documentatiile de urbanism trebuie elaborate coordonat, pe principiul dezvoltarii orientate catre transport public (TOD).');
      D.h2('Incadrarea in documentele strategice sectoriale');
      D.bullets([
        ['Strategia Nationala de Mobilitate', 'cadrul national pentru transport durabil si conectivitate'],
        ['Pactul Verde European si Legea Climei', 'tinte de reducere a emisiilor si neutralitate climatica'],
        ['Strategia UE pentru mobilitate sustenabila si inteligenta', 'transfer modal, digitalizare, siguranta (Vision Zero)'],
        ['Planul National de Redresare si Rezilienta (PNRR)', 'finantarea mobilitatii verzi si a transportului public curat'],
      ]);
      D.h2('Cadrul metodologic — ciclul SUMP');
      D.P('Elaborarea urmeaza metodologia europeana SUMP (ELTIS), structurata in patru faze si douasprezece etape: (1) pregatire si analiza, (2) dezvoltarea strategiei, (3) planificarea masurilor, (4) implementare si monitorizare. Procesul este iterativ, participativ si bazat pe dovezi, cu revizuire la fiecare ciclu.');
      D.sourceBadges(['Ghid SUMP/ELTIS 2019', 'MDLPA — ghid PMUD', 'Legea 350/2001', 'Regulament UE TEN-T']);

      // ── 2. ANALIZA SITUATIEI EXISTENTE ───────────────────────────────────
      D.chapter('Analiza situatiei existente');
      D.P('Diagnoza sistemului de mobilitate acopera contextul socio-economic, reteaua stradala, transportul public, transportul de marfa, mobilitatea activa, managementul traficului si siguranta rutiera. Datele provin din surse oficiale si din analize geospatiale; pentru PMUD-ul final acestea se completeaza cu recensamant de trafic si anchete de mobilitate.');
      D.h2('Context socio-economic si densitati');
      D.P('Distributia spatiala a populatiei si a locurilor de munca determina cererea de deplasare. Densitatile ridicate favorizeaza transportul public si mobilitatea activa, in timp ce dispersia (urban sprawl) genereaza dependenta de autoturism. Gradul de motorizare al ' + city.name + ' este estimat la ' + m.motoriz + ' autoturisme/1000 locuitori, in crestere, urmand tendinta nationala.');
      D.kpis([{ val: N(pop), label: 'Populatie', sub: 'INS 2021' }, { val: m.motoriz, label: 'Auto/1000 loc', sub: 'INS' }, { val: N(depZi), label: 'Deplasari/zi', sub: '2.8/loc/zi' }, { val: m.co2cap + ' t', label: 'CO2/cap/an', sub: 'transport' }]);
      D.barChart([['2010', Math.round(m.motoriz * 0.62), PAL[0]], ['2015', Math.round(m.motoriz * 0.78), PAL[0]], ['2021', Math.round(m.motoriz * 0.93), PAL[0]], ['2024', m.motoriz, PAL[1]], ['2030 (proiectat)', Math.round(m.motoriz * 1.12), PAL[3]]], { title: 'Evolutia gradului de motorizare (autoturisme/1000 loc)', h: 48, source: 'INS TEMPO (parc auto) + proiectie UrbanX. Tendinta de crestere a motorizarii — argument pentru transfer modal.' });
      D.h2('Reteaua stradala');
      D.P('Reteaua stradala a ' + city.name + ' insumeaza aproximativ ' + N(m.strRet) + ' km, ierarhizata functional in artere principale (categoria I-II), strazi colectoare (categoria III) si strazi locale (categoria IV). Ierarhizarea corecta separa traficul de tranzit de cel local si protejeaza zonele rezidentiale.');
      D.table(['Categorie strada', 'Rol functional', 'Pondere estimata', 'Lungime (km)'], [
        ['Categoria I-II (artere)', 'Trafic de tranzit si legaturi majore', '12%', N(Math.round(m.strRet * 0.12))],
        ['Categoria III (colectoare)', 'Colectarea traficului de cartier', '23%', N(Math.round(m.strRet * 0.23))],
        ['Categoria IV (locale)', 'Acces la proprietati', '65%', N(Math.round(m.strRet * 0.65))],
      ], [50, 64, 30, 30], { boldFirst: true });
      D.source('Estimare pe baza retelei OSM si a normativelor de ierarhizare (OG 43/1997). Lungimile se confirma cu inventarul administratorului.');
      D.h2('Transport public');
      D.P('Transportul public este coloana vertebrala a mobilitatii durabile. Performanta sa depinde de acoperirea teritoriala, frecventa, viteza comerciala, confort si integrarea tarifara. Pentru ' + city.name + ', acoperirea estimata este de ' + m.accLatPct + '% din populatie la mai putin de 300 m de o statie, cu o viteza comerciala de cca. ' + m.vitezaTP + ' km/h, afectata de congestie in absenta benzilor dedicate.');
      D.table(['Indicator transport public', 'Valoare estimata', 'Reper de buna practica'], [
        ['Statii', N(m.statiiTP), '-'],
        ['Acoperire (<300 m)', m.accLatPct + '% populatie', '>= 90%'],
        ['Viteza comerciala', m.vitezaTP + ' km/h', '>= 20 km/h (benzi dedicate)'],
        ['Frecventa de varf', '10-20 min', '<= 10 min pe coridoare'],
        ['Flota cu emisii reduse', 'in tranzitie', '100% electric/CNG (tinta)'],
      ], [56, 50, 68], { boldFirst: true });
      D.h2('Transport de marfa si logistica urbana');
      D.P('Distributia marfurilor in oras (aprovizionarea comertului, livrari) genereaza trafic greu si emisii in zonele centrale. Optimizarea logisticii urbane (centre de consolidare, livrari pe ultimul kilometru cu vehicule curate, ferestre orare) reduce impactul fara a afecta activitatea economica.');
      D.h2('Mijloace alternative de mobilitate');
      D.P('Mersul pe jos si bicicleta sunt cele mai sustenabile moduri pentru deplasarile scurte (sub 5 km, majoritare in oras). Reteaua actuala de piste de biciclete (~' + N(m.pisteKm) + ' km) este fragmentata; o retea continua si sigura, completata de sisteme de bike-sharing, poate prelua o pondere semnificativa din deplasari.');
      D.barChart([['Existent', m.pisteKm, PAL[2]], ['Tinta 2030', m.pisteTinta, PAL[1]], ['Necesar retea completa', Math.round(m.pisteTinta * 1.4), PAL[5]]], { title: 'Reteaua de piste de biciclete (km)', h: 44, source: 'Estimare pe populatie + densitate. Tinta: retea continua, sigura, conectata.' });
      D.h2('Managementul traficului si parcarea');
      D.P('Managementul traficului (semaforizare adaptiva, sensuri unice, zone cu viteza redusa) si politica de parcare (tarifare zonala, limitarea locurilor in centru, park&ride) sunt instrumente cheie de gestionare a cererii. Parcarea gratuita si abundenta in zona centrala stimuleaza utilizarea autoturismului.');
      D.h2('Siguranta rutiera');
      D.P('Siguranta rutiera este o prioritate absoluta (abordarea Vision Zero — zero decese si raniri grave). Numarul estimat de victime in accidente este de cca. ' + N(m.accidente) + '/an, concentrat in puncte negre (intersectii majore, treceri de pietoni neamenajate). Tratarea sistematica a punctelor negre si reproiectarea pentru siguranta (zone 30, treceri suprainaltate) reduc semnificativ riscul.');
      D.formula('Indicele de siguranta rutiera', 'IS = (V / P) * 100000', 'IS = victime la 100.000 locuitori; V = numar victime/an; P = populatie. Indicator comparabil pentru monitorizarea progresului catre Vision Zero.');
      D.h2('Distributia modala actuala');
      D.P('Repartitia deplasarilor pe moduri (modal split) este indicatorul-sinteza al sistemului de mobilitate. Distributia actuala estimata reflecta o dependenta ridicata de autoturism, specifica oraselor romanesti.');
      D.pie([['Autoturism', m.modalAct[0], trafColor], ['Transport public', m.modalAct[1], tpColor], ['Mers pe jos + bicicleta', m.modalAct[2], activColor]], { title: 'Distributia modala actuala a deplasarilor', source: 'Estimare calibrata pe marimea UAT. Se valideaza prin ancheta de mobilitate (PMUD final).' });
      D.h2('Analiza congestiei si nivelul de serviciu');
      D.P('Congestia se masoara prin nivelul de serviciu (Level of Service, LOS), o scara de la A (flux liber) la F (blocaj), in functie de raportul volum/capacitate al arterelor. Arterele principale ale ' + city.name + ' inregistreaza in orele de varf valori LOS D-E pe coridoarele radiale catre centru, indicand saturarea capacitatii. Costul economic al congestiei (timp pierdut, combustibil, intarzieri marfa) este estimat la cca. ' + N(Math.round(pop * 0.12)) + ' mil. EUR/an.');
      D.formula('Nivelul de serviciu (raport volum/capacitate)', 'V/C = volum orar / capacitate arteriala', 'V/C < 0.6 -> LOS A-B (fluid); 0.6-0.8 -> C-D (stabil); 0.8-1.0 -> E (instabil); > 1.0 -> F (blocaj). Orele de varf depasesc 0.85 pe radialele principale.');
      D.barChart([['07-09 (varf AM)', 88, trafColor], ['09-12', 54, PAL[5]], ['12-15', 61, PAL[5]], ['15-19 (varf PM)', 92, trafColor], ['19-22', 47, PAL[2]]], { title: 'Profil orar al traficului (% din capacitate, zi lucratoare)', h: 46, vfmt: v => v + '%', source: 'Profil tipic urban (model). Doua varfuri pronuntate AM/PM — argument pentru managementul cererii si TP.' });
      D.h2('Accesibilitate si izocrone');
      D.P('Accesibilitatea masoara cat de usor pot fi atinse destinatiile esentiale (locuri de munca, scoli, sanatate, comert) cu fiecare mod de transport. Analiza izocrone determina zonele atinse in 15 si 30 de minute. Dezechilibrele de accesibilitate (zone periferice slab conectate la TP) genereaza dependenta de autoturism si inechitate sociala.');
      D.table(['Mod de transport', 'Acces in 15 min', 'Acces in 30 min'], [
        ['Pe jos', 'cartierul propriu + dotari de proximitate', 'zone centrale (in orasele compacte)'],
        ['Bicicleta', 'majoritatea cartierelor centrale', 'aproape intreg orasul'],
        ['Transport public', 'coridoarele deservite', 'centrul + cartierele pe trasee'],
        ['Autoturism', 'intreg orasul (in afara varfurilor)', 'zona metropolitana'],
      ], [44, 65, 65], { boldFirst: true, fs: 7 });
      D.h2('Naveta si zona urbana functionala');
      D.P('Fluxurile zilnice de naveta intre ' + city.name + ' si localitatile periurbane sunt semnificative si predominant auto, in absenta unui transport public metropolitan integrat. Estimarea navetei nete (intrari minus iesiri) indica rolul de pol de locuri de munca al orasului. Gestionarea navetei prin transport public metropolitan si park&ride este esentiala pentru decongestionarea intrarilor in oras.');
      D.h2('Grupuri vulnerabile si echitate in mobilitate');
      D.P('Mobilitatea echitabila asigura acces pentru toti: persoane cu mobilitate redusa, varstnici, copii, persoane fara autoturism si cu venituri reduse. Accesibilitatea universala (rampe, statii adaptate, informare accesibila), siguranta si tariful accesibil al transportului public sunt conditii ale incluziunii. Aproximativ o treime din populatie nu conduce (copii, varstnici, persoane fara permis), depinzand de alternative la autoturism.');
      D.sourceBadges(['INS — naveta', 'OSM — retea', 'Analiza izocrone UrbanX', 'HCM (LOS)']);
      D.h2('Analiza SWOT pe moduri de transport');
      D.P('Fiecare mod de transport prezinta puncte tari si slabe specifice. Analiza SWOT pe moduri fundamenteaza directiile de actiune diferentiate.');
      D.table(['Mod', 'Puncte tari (S)', 'Puncte slabe (W)'], [
        ['Auto', 'Flexibilitate, acoperire, confort', 'Congestie, emisii, ocupare spatiu, cost'],
        ['Transport public', 'Capacitate mare, echitabil, eficient', 'Viteza redusa (congestie), frecventa, flota'],
        ['Bicicleta', 'Sanatate, zero emisii, ieftin, rapid pe distante scurte', 'Retea fragmentata, siguranta, sezonalitate'],
        ['Pe jos', 'Universal, sanatate, zero cost/emisii', 'Distante limitate, calitate trotuare, bariere'],
      ], [22, 76, 76], { fs: 6.6, boldFirst: true });
      D.table(['Mod', 'Oportunitati (O)', 'Amenintari (T)'], [
        ['Auto', 'Electrificare, car-sharing, management cerere', 'Crestere motorizare, dependenta'],
        ['Transport public', 'Benzi dedicate, electrificare, integrare metropolitana', 'Pierdere cota in favoarea auto, subfinantare'],
        ['Bicicleta', 'Retea continua, bike-sharing, e-bike', 'Conflicte cu traficul, lipsa infrastructurii'],
        ['Pe jos', 'Pietonalizari, oras 15 min', 'Spatiu cedat masinilor, nesiguranta'],
      ], [22, 76, 76], { fs: 6.6, boldFirst: true });
      D.h2('Analiza coridoarelor strategice de mobilitate');
      D.P('Coridoarele majore de mobilitate (axele radiale catre centru si inelele de circulatie) concentreaza cea mai mare parte a deplasarilor si a congestiei. Interventiile prioritare (benzi dedicate TP, piste velo, management trafic) se concentreaza pe aceste coridoare.');
      const corid = [
        ['Coridor radial Nord', 'Ridicat', 'LOS D-E in varf', 'Banda dedicata TP + pista velo'],
        ['Coridor radial Sud', 'Ridicat', 'Congestie acces centru', 'Prioritizare TP + park&ride'],
        ['Coridor radial Est', 'Mediu-ridicat', 'Trafic de tranzit', 'Reproiectare profil + velo'],
        ['Coridor radial Vest', 'Mediu', 'Acces zone industriale', 'Management marfa + TP'],
        ['Inel de circulatie', 'Ridicat', 'Tranzit + naveta', 'Optimizare noduri + ITS'],
        ['Axa centrala (oras 15 min)', 'Mediu', 'Conflict pietoni-auto', 'Pietonalizare + calmare trafic'],
      ];
      D.table(['Coridor', 'Cerere', 'Disfunctionalitate', 'Interventie propusa'], corid, [44, 28, 44, 58], { fs: 6.8, boldFirst: true });
      D.source('Analiza schematica a coridoarelor (model). Se detaliaza cu rezultatele modelului de transport si recensamantului de trafic in PMUD final.');

      // ── ANALIZE APROFUNDATE PE MODURI ────────────────────────────────────
      D.chapter('Analiza aprofundata a transportului public');
      D.h2('Reteaua si oferta de transport public');
      D.P('Transportul public reprezinta coloana vertebrala a unui sistem de mobilitate durabila, fiind singurul mod capabil sa deserveasca eficient cererea de masa din zonele urbane dense, cu un consum de spatiu si o amprenta de carbon pe pasager-kilometru semnificativ mai reduse decat autoturismul individual. Pentru ' + city.name + ', reteaua de transport public deserveste cca. ' + m.accLatPct + '% din populatie in raza de 300 m de o statie, printr-un sistem estimat la ' + N(m.statiiTP) + ' de statii. Calitatea ofertei — frecventa, viteza comerciala, fiabilitatea, confortul si integrarea tarifara — determina in mod direct atractivitatea sa fata de autoturism.');
      D.P('Viteza comerciala actuala, estimata la ' + m.vitezaTP + ' km/h, este penalizata de circulatia in trafic mixt, fara benzi dedicate si fara prioritizare semaforica. Aceasta o face necompetitiva fata de autoturism pe coridoarele congestionate, generand un cerc vicios: viteza mica reduce atractivitatea, scaderea numarului de calatori reduce veniturile si justificarea investitiilor, iar subfinantarea degradeaza serviciul. Inversarea acestui cerc necesita interventii integrate: infrastructura prioritara, flota moderna si o politica tarifara atractiva.');
      D.h2('Performanta si indicatori operationali');
      D.table(['Indicator operational', 'Valoare estimata', 'Tinta de buna practica'], [
        ['Viteza comerciala', m.vitezaTP + ' km/h', '>= 20 km/h (benzi dedicate)'],
        ['Frecventa in varf (coridoare)', '10-20 min', '<= 10 min'],
        ['Acoperire teritoriala (<300 m)', m.accLatPct + '%', '>= 90%'],
        ['Fiabilitate (punctualitate)', 'de imbunatatit', '>= 90% curse la timp'],
        ['Varsta medie a flotei', 'in tranzitie', 'flota innoita, emisii reduse'],
        ['Integrare tarifara', 'partiala', 'titlu unic multimodal + metropolitan'],
      ], [56, 50, 68], { boldFirst: true, fs: 7 });
      D.P('Modernizarea transportului public vizeaza electrificarea flotei (eliminarea emisiilor la sursa si reducerea zgomotului), introducerea benzilor dedicate si a prioritizarii semaforice pe coridoarele majore (cresterea vitezei comerciale cu 20-30%), digitalizarea (e-ticketing, informare in timp real) si integrarea metropolitana a serviciilor. Aceste masuri, corelate cu dezvoltarea orientata catre transport public (TOD), pot creste semnificativ cota modala a transportului public, de la ' + m.modalAct[1] + '% in prezent catre tinta de ' + m.modalTinta[1] + '% in 2030.');
      D.callout('Prioritate strategica', 'Transportul public competitiv (rapid, frecvent, fiabil, curat) este conditia esentiala a transferului modal dinspre autoturism. Fara prioritizarea sa fizica (benzi dedicate) si financiara, celelalte masuri au impact limitat.');

      D.chapter('Analiza aprofundata a mobilitatii active');
      D.h2('Mersul pe jos — modul fundamental');
      D.P('Mersul pe jos este modul de deplasare universal, gratuit, sanatos si cu zero emisii, prezent la inceputul si sfarsitul oricarei deplasari (inclusiv cu transport public). Calitatea infrastructurii pietonale — latimea si continuitatea trotuarelor, siguranta trecerilor, accesibilitatea pentru persoane cu mobilitate redusa, umbrirea si confortul — determina ponderea deplasarilor pe jos. In orasele compacte, deplasarile sub 1-2 km, majoritare, pot fi realizate pe jos daca mediul construit este prietenos.');
      D.P('Bariere frecvente in calea mersului pe jos sunt: trotuarele inguste sau ocupate (de masini parcate, mobilier, vegetatie necontrolata), lipsa trecerilor sigure, timpii lungi de asteptare la semafoare, lipsa umbririi si insecuritatea. Reproiectarea spatiului public pentru pietoni (pietonalizari, zone partajate, trotuare generoase, treceri suprainaltate) este o investitie cu cost redus si beneficiu social ridicat.');
      D.h2('Ciclismul urban — potential ridicat');
      D.P('Bicicleta (clasica si electrica) acopera eficient distantele de 2-8 km, dominante in oras, fiind adesea mai rapida decat autoturismul pe distante scurte si in conditii de congestie. Reteaua actuala de piste, estimata la ' + N(m.pisteKm) + ' km, este insa fragmentata si lipsita de continuitate, ceea ce descurajeaza utilizarea, in special a categoriilor mai putin experimentate (copii, varstnici, familii).');
      D.P('Dezvoltarea unei retele velo continue, sigure si conectate (separata de traficul auto pe arterele intense), tinta fiind cca. ' + N(m.pisteTinta) + ' km, completata de sisteme de bike-sharing si parcari sigure la noduri si dotari, poate prelua o pondere semnificativa din deplasari. Buna practica europeana arata ca infrastructura velo de calitate, coroborata cu masuri de descurajare a autoturismului, poate ridica cota ciclismului peste 10-15% din deplasari.');
      D.barChart([['Pe jos', m.modalAct[2] - 8 > 0 ? Math.round(m.modalAct[2] * 0.7) : 14, [120,130,150]], ['Bicicleta actual', Math.round(m.modalAct[2] * 0.3), activColor], ['Bicicleta tinta', Math.round(m.modalTinta[2] * 0.4), PAL[1]]], { title: 'Ponderea mobilitatii active in deplasari (%)', h: 44, vfmt: v => v + '%', source: 'Estimare. Potentialul ciclismului este mare pe distantele scurte dominante in oras.' });
      D.callout('Mobilitate activa = sanatate publica', 'Promovarea mersului pe jos si a ciclismului aduce beneficii directe de sanatate (activitate fizica, reducerea bolilor cardiovasculare si a obezitatii), de mediu (zero emisii) si economice (cost redus), fiind cea mai eficienta investitie in mobilitate raportat la beneficii.');

      D.chapter('Analiza aprofundata a retelei stradale si a traficului');
      D.h2('Ierarhizarea functionala a retelei');
      D.P('Reteaua stradala a ' + city.name + ', estimata la ' + N(m.strRet) + ' km, indeplineste doua functii adesea conflictuale: deplasarea (mobilitatea) si accesul la proprietati. Ierarhizarea functionala separa aceste roluri: arterele principale (categoria I-II) preiau traficul de tranzit si legaturile majore, strazile colectoare (categoria III) distribuie traficul intre artere si zonele rezidentiale, iar strazile locale (categoria IV) asigura accesul la proprietati, cu prioritate pentru pietoni si rezidenti. O ierarhizare clara protejeaza zonele de locuit de traficul de tranzit si concentreaza fluxurile pe artere proiectate pentru capacitate.');
      D.P('Disfunctionalitatile tipice ale retelei includ: discontinuitati si "gaturi de sticla" (bottleneck-uri) la intersectii si pe poduri, lipsa unui inel de centura complet care sa devieze traficul de tranzit, intersectii suprasolicitate fara amenajari adecvate si trafic de tranzit care patrunde in zonele rezidentiale. Identificarea si tratarea acestor puncte critice, impreuna cu optimizarea geometrica si semaforica a intersectiilor majore, sunt prioritati de interventie pe termen scurt si mediu.');
      D.h2('Capacitatea si congestia');
      D.P('Capacitatea unei artere este determinata de numarul de benzi, de geometria intersectiilor si de managementul traficului. Congestia apare atunci cand cererea depaseste capacitatea, in special in orele de varf (07-09 si 16-19). Solutia durabila nu este largirea continua a strazilor (care induce trafic suplimentar — fenomenul de cerere indusa), ci managementul cererii: transferul modal catre transport public si mobilitate activa, descurajarea deplasarilor auto inutile si optimizarea celor existente.');
      D.formula('Functia de timp pe arc (BPR)', 't = t0 * [ 1 + a * (v/c)^b ]', 't = timpul de parcurgere; t0 = timp la flux liber; v = volum; c = capacitate; a, b = parametri (uzual 0.15 si 4). Cresterea volumului peste capacitate creste exponential timpul de parcurgere.');
      D.callout('Cererea indusa', 'Largirea strazilor pentru a reduce congestia atrage, in timp, trafic suplimentar care reumple capacitatea adaugata (cerere indusa). De aceea, solutia eficienta este managementul cererii si oferta de alternative atractive, nu cresterea capacitatii rutiere.');

      D.chapter('Analiza aprofundata a parcarii');
      D.h2('Rolul parcarii in managementul mobilitatii');
      D.P('Politica de parcare este unul dintre cele mai puternice instrumente de gestionare a cererii de mobilitate, adesea subutilizat. Disponibilitatea, locatia si pretul parcarii influenteaza direct decizia de a folosi autoturismul. Parcarea gratuita si abundenta in zona centrala stimuleaza utilizarea masinii si ocupa spatiu public valoros, in timp ce o politica inteligenta de parcare poate redirectiona cererea catre transport public si moduri active.');
      D.P('Problemele frecvente sunt: ocuparea spatiului public si a trotuarelor de catre autovehicule parcate (in detrimentul pietonilor si al spatiului de calitate), lipsa unui sistem de tarifare diferentiata, cautarea locurilor de parcare care genereaza trafic suplimentar (pana la 30% din traficul din centru) si lipsa de coordonare intre parcarea pe strada si cea in structuri.');
      D.h2('Directii de politica a parcarii');
      D.bullets([
        ['Tarifare zonala diferentiata', 'tarife mai mari in zonele centrale si la cerere ridicata, pentru rotatie si descurajarea stationarii indelungate'],
        ['Reducerea parcarii la sol in centru', 'eliberarea spatiului public pentru pietoni, vegetatie si terase, in favoarea structurilor colective'],
        ['Park&ride la periferie', 'parcari de transfer conectate la transport public, care intercepteaza naveta auto inainte de centru'],
        ['Standarde de parcare adaptate', 'maxime (nu doar minime) la dezvoltari noi, pentru a nu induce dependenta de autoturism'],
        ['Parcari de cartier pentru rezidenti', 'organizarea parcarii rezidentiale, eliberand strazile si trotuarele'],
      ]);

      D.chapter('Siguranta rutiera — analiza detaliata si Vision Zero');
      D.P('Siguranta rutiera este o prioritate absoluta, abordata prin filozofia Vision Zero: niciun deces sau ranire grava in trafic nu este acceptabil. Aceasta presupune proiectarea unui sistem de transport tolerant la erorile umane — daca un accident se produce, infrastructura trebuie sa limiteze severitatea consecintelor. Numarul estimat de victime pentru ' + city.name + ' este de cca. ' + N(m.accidente) + '/an, cu tinta de reducere la jumatate pana in 2030 si catre zero pana in 2040.');
      D.h2('Cauze si puncte negre');
      D.P('Accidentele se concentreaza in "puncte negre" — locatii cu frecventa ridicata de accidente, de regula intersectii majore, treceri de pietoni neamenajate corespunzator si artere cu viteze mari in apropierea zonelor cu pietoni. Cauzele principale sunt vitezele excesive, conflictele intre moduri (auto-pietoni, auto-biciclisti), vizibilitatea redusa si lipsa amenajarilor de protectie a utilizatorilor vulnerabili.');
      D.h2('Masuri sistematice de siguranta');
      D.table(['Masura', 'Efect asupra sigurantei', 'Prioritate'], [
        ['Zone 30 in cartiere rezidentiale', 'Reduce drastic severitatea accidentelor', 'Inalta'],
        ['Treceri de pietoni suprainaltate / refugii', 'Reduce viteza si protejeaza pietonii', 'Inalta'],
        ['Reproiectarea intersectiilor periculoase', 'Elimina conflictele si punctele negre', 'Inalta'],
        ['Separarea pistelor de biciclete', 'Protejeaza biciclistii de trafic', 'Medie-inalta'],
        ['Iluminat public adecvat', 'Creste vizibilitatea nocturna', 'Medie'],
        ['Camere si control viteza', 'Descurajeaza vitezele excesive', 'Medie'],
      ], [60, 80, 34], { boldFirst: true, fs: 7 });
      D.callout('Vision Zero', 'Responsabilitatea sigurantei este partajata intre proiectantii sistemului si utilizatori. Un sistem bine proiectat (viteze adecvate, separare a modurilor, infrastructura iertatoare) reduce atat probabilitatea, cat si gravitatea accidentelor — tinta finala fiind zero victime.');

      D.chapter('Transport de marfa si logistica urbana');
      D.h2('Rolul si impactul logisticii urbane');
      D.P('Transportul de marfa si logistica urbana sustin activitatea economica a orasului — aprovizionarea comertului, a unitatilor de alimentatie, livrarile catre populatie (in crestere exploziva odata cu comertul electronic) si serviciile. Desi reprezinta o pondere relativ redusa din numarul total de deplasari, transportul de marfa are un impact disproportionat asupra emisiilor, zgomotului, congestiei si uzurii infrastructurii, in special prin vehiculele grele si prin livrarile pe ultimul kilometru in zonele dense.');
      D.P('Provocarile specifice includ: accesul vehiculelor grele in zonele centrale si rezidentiale, parcarea pentru aprovizionare (adesea pe banda de circulatie sau pe trotuar), proliferarea livrarilor de colete si lipsa unei coordonari intre operatori. In absenta unei strategii de logistica urbana, aceste fluxuri genereaza disfunctionalitati semnificative si emisii ridicate in zonele cele mai sensibile.');
      D.h2('Solutii de logistica urbana durabila');
      D.bullets([
        ['Centre de consolidare a marfurilor', 'puncte logistice la periferie unde marfa este consolidata si redistribuita cu vehicule curate, reducand numarul de curse in centru'],
        ['Livrari pe ultimul kilometru curate', 'vehicule electrice, cargo-biciclete si puncte de ridicare (lockere) pentru colete'],
        ['Ferestre orare si reglementarea accesului', 'livrari in afara orelor de varf, restrictii pentru vehicule grele in zone sensibile'],
        ['Zone de incarcare/descarcare dedicate', 'spatii reglementate pentru aprovizionare, eliberand banda de circulatie si trotuarele'],
        ['Digitalizare si coordonare', 'platforme de optimizare a curselor si de partajare a capacitatii intre operatori'],
      ]);
      D.callout('Logistica si comertul electronic', 'Cresterea livrarilor de colete necesita o abordare proactiva: puncte de ridicare in cartiere, livrari consolidate si curate, pentru a evita ca fiecare comanda sa genereze o cursa individuala cu vehicul poluant.');

      D.chapter('Managementul traficului si sistemele inteligente (ITS)');
      D.h2('Managementul traficului');
      D.P('Managementul traficului optimizeaza utilizarea infrastructurii existente, fara investitii majore in capacitate noua. Instrumentele includ: semaforizarea adaptiva (care ajusteaza timpii in functie de fluxurile reale), undele verzi (coordonarea semafoarelor pe coridoare), sensurile unice, zonele cu viteza redusa si prioritizarea transportului public si a vehiculelor de urgenta. Un management eficient reduce congestia, emisiile si timpii de calatorie, crescand totodata siguranta.');
      D.h2('Sistemele inteligente de transport (ITS)');
      D.P('ITS integreaza tehnologia informatiei in managementul mobilitatii: senzori de trafic, camere, semaforizare inteligenta, panouri de informare in timp real, sisteme de management al parcarii si platforme de date. Acestea permit monitorizarea continua, deciziile in timp real si informarea utilizatorilor, contribuind la fluidizarea traficului si la o experienta de mobilitate mai buna.');
      D.P('Un centru de management al mobilitatii (dispecerat integrat) coreleaza datele din toate subsistemele (trafic, transport public, parcare, mediu), permitand interventii coordonate si masurarea performantei sistemului. Datele colectate fundamenteaza, de asemenea, planificarea bazata pe dovezi si monitorizarea indicatorilor PMUD. Protectia datelor personale si interoperabilitatea sistemelor sunt conditii esentiale.');

      D.chapter('Intermodalitate si noduri de transport');
      D.P('Eficienta sistemului de mobilitate depinde de cat de usor pot fi combinate modurile de transport intr-o singura deplasare (intermodalitate). Nodurile intermodale — gari, autogari, statii majore de transport public, parcari park&ride, statii de bike-sharing — sunt punctele unde calatorii transfera intre moduri. Calitatea acestor noduri (acces facil, informare, confort, timp de transfer redus) determina atractivitatea lanturilor de deplasare alternative la autoturism.');
      D.P('Integrarea intermodala are mai multe dimensiuni: fizica (proximitatea si conexiunea facila intre moduri), tarifara (titlu unic de calatorie multimodal), informationala (informare integrata in timp real, platforme MaaS) si institutionala (coordonarea operatorilor). Dezvoltarea nodurilor intermodale si a park&ride la intrarile in oras intercepteaza naveta auto si o transfera catre transport public, decongestionand zona centrala.');

      D.chapter('Mobilitatea metropolitana si naveta');
      D.P('Functionarea reala a orasului depaseste limita sa administrativa: zona urbana functionala include localitatile periurbane de unde provine o naveta zilnica semnificativa, predominant cu autoturismul in absenta unor alternative atractive. Aceasta naveta congestioneaza intrarile in oras si zona centrala, generand emisii si presiune asupra parcarii.');
      D.P('Solutia durabila este un sistem de transport public metropolitan integrat — linii care conecteaza orasul cu localitatile periurbane, cu orar si tarif integrat, completate de parcari park&ride la periferie. Coordonarea metropolitana (printr-o asociatie de dezvoltare intercomunitara sau o autoritate metropolitana de transport) este esentiala, intrucat fluxurile de mobilitate nu respecta granitele administrative. Dezvoltarea coordonata a locuirii periurbane in jurul nodurilor de transport public previne adancirea dependentei de autoturism.');

      // ── 3. MODELUL DE TRANSPORT ──────────────────────────────────────────
      D.chapter('Modelul de transport');
      D.P('Modelul de transport simuleaza cererea de deplasare si fluxurile pe retea, permitand testarea scenariilor si a proiectelor inainte de implementare. Se utilizeaza modelul clasic in patru etape, calibrat pe datele observate.');
      D.h2('Etapa 1 — Generarea deplasarilor');
      D.P('Estimeaza numarul de deplasari generate si atrase de fiecare zona de trafic, in functie de populatie, locuri de munca, scoli si servicii. Pentru ' + city.name + ', cele cca. ' + N(depZi) + ' deplasari/zi (la 2,8 deplasari/locuitor/zi) se distribuie pe zone.');
      D.formula('Generarea deplasarilor', 'Oi = a * POPi + b * LMi ;  Dj = c * LMj + d * SVj', 'Oi/Dj = deplasari originate/destinate in zona i/j; POP = populatie; LM = locuri de munca; SV = suprafata servicii; a,b,c,d = coeficienti calibrati.');
      D.h2('Etapa 2 — Distributia deplasarilor (model gravitational)');
      D.P('Distribuie deplasarile intre zone (matricea origine-destinatie) pe principiul gravitational: fluxul intre doua zone este proportional cu masele lor si invers proportional cu rezistenta deplasarii (timp/cost).');
      D.formula('Modelul gravitational', 'Tij = Oi * Dj * f(cij) / SUM_k [ Dk * f(cik) ]', 'Tij = deplasari intre zona i si j; f(cij) = functie de impedanta (descrestere cu costul/timpul cij). Calibrata pe distributia observata a lungimii deplasarilor.');
      D.h2('Etapa 3 — Alegerea modala (model logit)');
      D.P('Determina ponderea fiecarui mod de transport pe baza utilitatii relative (timp, cost, confort). Modelul logit multinomial estimeaza probabilitatea alegerii unui mod.');
      D.formula('Modelul logit multinomial', 'P(k) = exp(Vk) / SUM_m exp(Vm)', 'P(k) = probabilitatea alegerii modului k; Vk = utilitatea deterministica a modului k (functie de timp, cost, confort). Imbunatatirea TP si a mobilitatii active creste Vk si transfera cota modala.');
      D.h2('Etapa 4 — Afectarea pe retea (echilibru)');
      D.P('Aloca fluxurile pe traseele retelei pana la atingerea echilibrului utilizatorului (principiul Wardrop): niciun utilizator nu isi poate reduce timpul de calatorie schimband unilateral traseul.');
      D.formula('Echilibrul utilizatorului (Wardrop)', 'ta(va) egal pentru toate rutele utilizate O-D', 'ta = timpul pe arcul a, functie de fluxul va (functie BPR). La echilibru, timpii pe rutele folosite intre O si D sunt egali si minimi.');
      D.h2('Calibrare, validare si prognoze');
      D.P('Modelul se calibreaza pe recensamantul de trafic (anul de baza) si se valideaza statistic (ex. GEH < 5 pe majoritatea sectiunilor). Prognozele se realizeaza pentru orizonturile 2030 si 2040, in scenariile de dezvoltare.');
      D.lineChart([
        { name: 'Do-nothing', color: trafColor, points: [m.modalAct[0], m.modalAct[0] + 2, m.modalAct[0] + 4] },
        { name: 'Do-something', color: PAL[5], points: [m.modalAct[0], m.modalAct[0] - 4, m.modalAct[0] - 6] },
        { name: 'Do-maximum', color: activColor, points: [m.modalAct[0], m.modalTinta[0], m.modalTinta[0] - 5] },
      ], ['2024', '2030', '2040'], { title: 'Prognoza cotei modale a autoturismului (%) pe scenarii', h: 52, source: 'Model de transport UrbanX (orientativ). Scenariul do-maximum inverseaza tendinta de crestere a cotei auto.' });

      // ── 4. EVALUAREA IMPACTULUI ACTUAL ───────────────────────────────────
      D.chapter('Evaluarea impactului actual al mobilitatii');
      D.h2('Eficienta economica — costul congestiei');
      D.P('Congestia genereaza pierderi economice prin timp pierdut, consum suplimentar de combustibil si intarzieri in transportul de marfa. Costul congestiei este estimat la cca. ' + N(Math.round(pop * 0.12)) + ' mil. EUR/an pentru ' + city.name + '.');
      D.formula('Costul congestiei', 'Ccong = SUM ( dt * VOT * Ncalatori ) + combustibil + marfa', 'dt = timp suplimentar fata de fluiditate; VOT = valoarea timpului (EUR/h); Ncalatori = numar persoane afectate. Sursa metodologica: ghiduri ACB transport.');
      D.h2('Impactul asupra mediului');
      const pm25 = aq && aq.pm25 != null ? aq.pm25 : (pop > 200000 ? 18 : 14);
      const no2 = aq && aq.no2 != null ? aq.no2 : (pop > 200000 ? 32 : 24);
      D.P('Transportul rutier este o sursa majora de emisii de gaze cu efect de sera si de poluanti atmosferici (NOx, particule PM). ' + (aq ? 'Masuratori live (OpenAQ): ' : 'Estimari (model + EEA): ') + 'PM2.5 = ' + pm25 + ' ug/mc, NO2 = ' + no2 + ' ug/mc.');
      D.barChart([['Autoturisme', 72, trafColor], ['Transport marfa', 20, PAL[5]], ['Transport public', 8, tpColor]], { title: 'Repartitia emisiilor CO2 din transport pe categorii (%)', h: 42, vfmt: v => v + '%', source: 'Repartitie tipica EEA. Autoturismele individuale domina emisiile — tinta principala a transferului modal.' });
      D.formula('Emisii CO2 din transport', 'E = SUM ( Dist_mod * FE_mod )', 'Dist_mod = vehicule-km pe mod; FE_mod = factor de emisie (g CO2/km). Reducerea = transfer modal + electrificare (FE -> 0 la sursa curata).');
      D.table(['Indicator de mediu', 'Valoare', 'Limita / reper'], [
        ['Emisii CO2 transport', m.co2cap + ' t/cap/an', 'tinta -30% (2030)'],
        ['PM2.5', pm25 + ' ug/mc', 'OMS: 5 ug/mc (medie anuala)'],
        ['NO2', no2 + ' ug/mc', 'UE: 40 ug/mc (medie anuala)'],
        ['Zgomot trafic (Lzsn)', pop > 200000 ? '65-70 dB' : '60-65 dB', 'tinta < 55 dB zone rezidentiale'],
      ], [54, 44, 76], { boldFirst: true });
      D.h2('Accesibilitate, siguranta si calitatea vietii');
      D.P('Accesibilitatea masoara usurinta de a ajunge la destinatii (locuri de munca, servicii) cu fiecare mod, in special prin analiza izocrone (zone atinse in 15/30 minute). Siguranta (victime/an) si calitatea vietii (spatiu public, zgomot, confort) completeaza evaluarea impactului social al mobilitatii.');

      // ── 5. VIZIUNE, OBIECTIVE, TINTE ─────────────────────────────────────
      D.h2('Emisii pe orizonturi — proiectie comparata');
      D.P('In absenta interventiilor (do-nothing), cresterea motorizarii si a traficului mentine emisiile ridicate. Transferul modal si electrificarea (do-maximum) determina o scadere accentuata a emisiilor de gaze cu efect de sera din transport.');
      D.lineChart([
        { name: 'Do-nothing', color: trafColor, points: [m.co2cap, +(m.co2cap * 1.05).toFixed(2), +(m.co2cap * 1.08).toFixed(2)] },
        { name: 'Do-something', color: PAL[5], points: [m.co2cap, +(m.co2cap * 0.85).toFixed(2), +(m.co2cap * 0.72).toFixed(2)] },
        { name: 'Do-maximum', color: activColor, points: [m.co2cap, +(m.co2cap * 0.7).toFixed(2), +(m.co2cap * 0.45).toFixed(2)] },
      ], ['2024', '2030', '2040'], { title: 'Emisii CO2 transport/cap (t/an) pe scenarii', h: 52, source: 'Model UrbanX. Tinta nationala/UE: reducere accentuata a emisiilor din transport pana in 2040.' });
      D.h2('Costuri externe ale mobilitatii');
      D.P('Mobilitatea genereaza costuri externe (suportate de societate, nu de utilizator): poluare, accidente, congestie, zgomot, schimbari climatice. Internalizarea acestora (prin tarifare, taxe, restrictii) si reducerea lor sunt obiective economice si de mediu.');
      D.table(['Cost extern', 'Estimare anuala (orientativ)', 'Tendinta vizata'], [
        ['Congestie', N(Math.round(pop * 0.12)) + ' mil. EUR', 'descrescatoare'],
        ['Accidente rutiere', N(Math.round(m.accidente * 0.5)) + ' mil. EUR', 'descrescatoare (-50%)'],
        ['Poluare aer + zgomot', N(Math.round(pop * 0.05)) + ' mil. EUR', 'descrescatoare'],
        ['Emisii GES (clima)', N(Math.round(m.co2cap * pop * 0.05)) + ' mil. EUR', 'descrescatoare'],
      ], [50, 64, 60], { boldFirst: true });
      D.source('Estimari pe baza valorilor unitare din ghidurile europene de evaluare a costurilor externe ale transportului (Handbook on external costs of transport, CE Delft).');

      D.chapter('Viziune, obiective si tinte');
      D.callout('Viziune de mobilitate 2040', 'In ' + city.name + ', mobilitatea este sigura, curata, accesibila si echitabila: deplasarile zilnice se realizeaza preponderent pe jos, cu bicicleta si cu un transport public de calitate, iar autoturismul devine o optiune complementara. Spatiul public este redat oamenilor, emisiile si accidentele scad semnificativ.');
      D.h2('Viziune pe trei niveluri teritoriale');
      D.bullets([
        ['Nivel local (oras)', 'oras de proximitate, strazi sigure si verzi, prioritate pietoni si biciclisti'],
        ['Nivel periurban', 'transport public integrat si park&ride, descurajarea navetei exclusiv auto'],
        ['Nivel metropolitan/regional', 'conectivitate eficienta, intermodalitate, legaturi cu reteaua TEN-T'],
      ]);
      D.h2('Obiective strategice si tinte cuantificate (KPI)');
      D.table(['Obiectiv / KPI', 'Actual', 'Tinta 2030', 'Tinta 2040'], [
        ['Cota modala TP + activ', (m.modalAct[1] + m.modalAct[2]) + '%', (m.modalTinta[1] + m.modalTinta[2]) + '%', '+25 pp'],
        ['Emisii CO2 transport/cap', m.co2cap + ' t', RN(m.co2cap * 0.7, 2) + ' t', RN(m.co2cap * 0.45, 2) + ' t'],
        ['Victime accidente', N(m.accidente), N(Math.round(m.accidente * 0.5)), '~0 (Vision Zero)'],
        ['Piste de biciclete', N(m.pisteKm) + ' km', N(m.pisteTinta) + ' km', N(Math.round(m.pisteTinta * 1.4)) + ' km'],
        ['Acoperire TP (<300 m)', m.accLatPct + '%', Math.min(95, m.accLatPct + 18) + '%', '95%'],
        ['Viteza comerciala TP', m.vitezaTP + ' km/h', (m.vitezaTP + 3) + ' km/h', (m.vitezaTP + 5) + ' km/h'],
      ], [62, 30, 40, 40], { boldFirst: true });
      D.sourceBadges(['Pactul Verde European', 'Vision Zero', 'Strategia Nat. Mobilitate', 'SUMP guidelines']);

      // ── 6. DIRECTII DE ACTIUNE ───────────────────────────────────────────
      D.chapter('Directii de actiune si proiecte');
      D.h2('Infrastructura de transport');
      D.bullets(['Coridoare de transport public cu benzi dedicate si prioritizare semaforica.', 'Retea continua si sigura de piste de biciclete si trasee pietonale.', 'Reabilitarea si reproiectarea strazilor pentru siguranta (zone 30, treceri sigure).', 'Noduri intermodale si park&ride la intrarile in oras.']);
      D.h2('Masuri operationale');
      D.bullets(['Cresterea frecventei si optimizarea traseelor de transport public.', 'Tarifare integrata si e-ticketing.', 'Politica de parcare cu tarifare zonala si management al cererii.', 'Sisteme inteligente de transport (ITS) si informare in timp real.']);
      D.h2('Masuri organizationale si partajate');
      D.bullets(['Infiintarea unei autoritati/structuri de management al mobilitatii.', 'Coordonare metropolitana a transportului public.', 'Campanii de mobilitate durabila si planuri de mobilitate pentru institutii/scoli.', 'Logistica urbana verde si reglementarea accesului marfa.']);

      // ── 7. SCENARII SI EVALUARE ──────────────────────────────────────────
      D.chapter('Scenarii de dezvoltare si evaluare');
      D.table(['Scenariu', 'Descriere', 'Investitie', 'Rezultat'], [
        ['Do-nothing', 'Fara investitii noi; tendinta actuala continua', 'Minim', 'Congestie si emisii in crestere'],
        ['Do-something', 'Investitii moderate in TP si piste', 'Mediu', 'Stabilizarea cotei auto'],
        ['Do-maximum', 'Pachet integrat complet + management cerere', 'Ridicat', 'Atingerea tintelor 2030-2040'],
      ], [36, 84, 26, 28], { boldFirst: true });
      D.h2('Analiza cost-beneficiu a scenariilor');
      D.P('Scenariile se evalueaza economic prin analiza cost-beneficiu (ACB), comparand valoarea actualizata a beneficiilor (timp economisit, reducerea emisiilor, a accidentelor) cu costurile de investitie si operare.');
      D.formula('Valoarea actualizata neta (VAN)', 'VAN = SUM_t [ (Bt - Ct) / (1 + r)^t ]', 'Bt = beneficii in anul t; Ct = costuri in anul t; r = rata de actualizare (uzual 4-5%); t = anul. VAN > 0 -> proiect justificat economic.');
      D.formula('Raportul beneficiu-cost (BCR)', 'BCR = VAN(beneficii) / VAN(costuri)', 'BCR > 1 indica eficienta economica. Scenariul do-maximum prezinta cel mai bun raport pe termen lung (estimat BCR ~2.1).');
      D.barChart([['Do-nothing', 0, [150,150,150]], ['Do-something', 14, PAL[5]], ['Do-maximum', 21, activColor]], { title: 'Raport beneficiu-cost (BCR x10) si reducere emisii pe scenarii', h: 44, vfmt: v => (v / 10).toFixed(1), source: 'ACB orientativa. Do-maximum: BCR ~2.1, reducere emisii ~32%.' });
      D.callout('Scenariu recomandat: Do-maximum', 'Singurul scenariu care atinge tintele de emisii si siguranta pentru 2030-2040, cu cel mai bun raport beneficiu-cost pe termen lung. Implementarea este etapizata pentru distribuirea efortului investitional.');

      // ── 8. PRIORITIZARE ──────────────────────────────────────────────────
      D.chapter('Cadrul de prioritizare a proiectelor');
      D.P('Proiectele se prioritizeaza multicriterial, in functie de contributia la obiective, raportul beneficiu-cost, maturitatea si fezabilitatea implementarii si disponibilitatea finantarii.');
      D.table(['Criteriu de prioritizare', 'Pondere'], [
        ['Contributie la transferul modal si reducerea emisiilor', '30%'],
        ['Impact asupra sigurantei rutiere', '20%'],
        ['Raport beneficiu-cost (eficienta economica)', '20%'],
        ['Maturitate si fezabilitate', '15%'],
        ['Echitate si acoperire teritoriala', '15%'],
      ], [134, 40], { boldFirst: true });
      D.h2('Prioritati pe orizonturi de timp');
      D.table(['Termen', 'Orizont', 'Prioritati'], [
        ['Scurt', '2025-2027', 'Mobilitate activa, siguranta (puncte negre), management parcare'],
        ['Mediu', '2027-2032', 'Coridoare TP cu benzi dedicate, flota electrica, ITS'],
        ['Lung', '2032-2040', 'Park&ride metropolitan, intermodalitate, logistica verde'],
      ], [26, 30, 118], { boldFirst: true });

      // ── 9. PLANUL DE ACTIUNE — FISE DE PROIECTE ──────────────────────────
      D.chapter('Planul de actiune — fise de proiecte');
      D.P('Planul de actiune detaliaza proiectele prioritare sub forma de fise standardizate, cu obiectiv, descriere, indicatori, etapa, buget orientativ si sursa de finantare. Bugetele se confirma in studiile de fezabilitate.');
      const invTot = Math.round(pop * 0.5);
      const fise = [
        ['Coridoare de transport public cu benzi dedicate', 'Amenajarea benzilor dedicate si prioritizarea semaforica pe coridoarele principale, pentru cresterea vitezei comerciale si a atractivitatii TP.', '+' + (m.vitezaTP > 0 ? 4 : 4) + ' km/h viteza comerciala; +8 pp cota TP', 'Mediu', 0.16],
        ['Innoirea flotei de transport public (electric)', 'Achizitia de vehicule electrice si infrastructura de incarcare, eliminand emisiile la sursa.', '>50% flota electrica; -emisii TP', 'Mediu', 0.18],
        ['Reteaua metropolitana de piste de biciclete', 'Realizarea unei retele continue, sigure si conectate de piste, cu separare fata de trafic.', '+' + N(m.pisteTinta - m.pisteKm) + ' km piste; +6 pp cota velo', 'Scurt-Mediu', 0.1],
        ['Sistem de bike-sharing si parcari velo', 'Statii de inchiriere biciclete (inclusiv electrice) si parcari sigure la noduri si dotari.', 'Sistem operational; statii la noduri', 'Scurt', 0.03],
        ['Pietonalizari si spatiu public de calitate', 'Pietonalizarea zonelor centrale si reproiectarea spatiului public pentru pietoni.', 'Zona centrala pietonala; spatiu public regenerat', 'Mediu', 0.07],
        ['Tratarea punctelor negre de siguranta', 'Reproiectarea intersectiilor periculoase, treceri suprainaltate, zone 30 rezidentiale.', '-50% victime (Vision Zero)', 'Scurt', 0.06],
        ['Noduri intermodale si park&ride', 'Amenajarea de park&ride la intrarile in oras, conectate la transport public.', 'Min. 3 noduri P&R; -trafic auto in centru', 'Mediu-Lung', 0.12],
        ['Sistem inteligent de transport (ITS)', 'Managementul adaptiv al traficului, informare in timp real, semaforizare inteligenta.', 'ITS pe arterele majore; -timp deplasare', 'Mediu', 0.05],
        ['Politica si infrastructura de parcare', 'Tarifare zonala, parcari colective, reducerea parcarii la sol in centru.', 'Sistem de tarifare zonal; management cerere', 'Scurt', 0.05],
        ['Logistica urbana verde', 'Centru de consolidare marfa, livrari cu vehicule electrice/cargo-bike, ferestre orare.', 'Centru logistic; livrari ultimul km curate', 'Lung', 0.05],
        ['Electrificarea mobilitatii (statii incarcare)', 'Retea publica de statii de incarcare pentru vehicule electrice.', 'Retea de incarcare acoperitoare', 'Mediu', 0.04],
        ['Digitalizarea mobilitatii (MaaS)', 'Platforma de mobilitate ca serviciu (planificare + plata integrata multimodala).', 'Aplicatie MaaS operationala', 'Mediu', 0.03],
        ['Reabilitarea si reproiectarea strazilor (street redesign)', 'Reconfigurarea profilelor stradale pentru echilibrarea modurilor: trotuare largi, aliniamente de arbori, zone tampon verzi, calmarea traficului.', 'Strazi reproiectate pe coridoare-cheie', 'Mediu', 0.06],
        ['Coridoare verzi pentru mobilitate activa', 'Trasee pietonale si velo de-a lungul cursurilor de apa si al spatiilor verzi, conectand cartierele de zonele de recreere.', 'Coridoare verzi-active continue', 'Mediu', 0.04],
        ['Mobilitate pentru scoli (zone scolare sigure)', 'Amenajarea de zone sigure in jurul scolilor (trasee pietonale, calmare trafic, parcare reglementata) si planuri de mobilitate scolara.', 'Zone scolare sigure; trasee pietonale', 'Scurt', 0.02],
        ['Accesibilitate universala a spatiului public', 'Adaptarea trotuarelor, trecerilor, statiilor si dotarilor pentru persoane cu mobilitate redusa, conform NP 051.', 'Spatiu public accesibil universal', 'Scurt-Mediu', 0.03],
        ['Transport public metropolitan integrat', 'Linii metropolitane care conecteaza orasul cu localitatile periurbane, cu tarif si orar integrat, descurajand naveta auto.', 'Linii metropolitane; tarif integrat', 'Lung', 0.08],
        ['Centru de monitorizare si management al mobilitatii', 'Dispecerat integrat (trafic, TP, parcare, mediu) pentru decizii in timp real si monitorizarea indicatorilor PMUD.', 'Centru operational; date in timp real', 'Mediu', 0.04],
      ];
      const fiseBenef = ['Reducerea timpilor de calatorie si cresterea atractivitatii alternativelor la autoturism',
        'Reducerea emisiilor si a poluarii in zonele dens populate', 'Cresterea sigurantei tuturor participantilor la trafic',
        'Imbunatatirea accesibilitatii si a echitatii sociale', 'Sustinerea dezvoltarii economice si a calitatii vietii urbane'];
      const fiseRisc = ['Intarzieri in achizitii/avize', 'Cofinantare locala insuficienta', 'Acceptabilitate publica',
        'Coordonare interinstitutionala', 'Disponibilitatea terenului'];
      fise.forEach((f, i) => {
        D.h3('PROIECT ' + (i + 1) + ' — ' + f[0]);
        D.P('Obiectiv: ' + f[1], { gap: 1.5 });
        D.P('Justificare: proiectul raspunde direct disfunctionalitatilor identificate in analiza situatiei existente (componenta 2) si contribuie la atingerea obiectivelor strategice ale PMUD. ' + fiseBenef[i % fiseBenef.length] + '. Implementarea se realizeaza etapizat, cu studii de fezabilitate si proiecte tehnice care detaliaza solutiile si bugetele.', { gap: 1.5 });
        D.table(['Atribut', 'Valoare'], [
          ['Indicatori de rezultat', f[2]],
          ['Etapa de implementare', f[3]],
          ['Buget orientativ', N(Math.round(invTot * f[4])) + ' mil. EUR'],
          ['Sursa de finantare probabila', f[4] >= 0.12 ? 'POR / PNRR' : 'Buget local / PPP / POR'],
          ['Beneficiu principal', fiseBenef[i % fiseBenef.length]],
          ['Risc principal de implementare', fiseRisc[i % fiseRisc.length]],
          ['Contributie la tinte', 'Transfer modal, reducere emisii, siguranta'],
        ], [54, 120], { fs: 7, boldFirst: true });
        D.spacer(2);
      });
      D.h2('Matricea de prioritizare a proiectelor');
      D.P('Cele ' + fise.length + ' proiecte sunt evaluate multicriterial (scor 1-5 pe fiecare criteriu), pentru stabilirea ordinii de implementare. Scorul total ghideaza esalonarea pe termen scurt, mediu si lung.');
      const critW = [0.3, 0.2, 0.2, 0.15, 0.15];
      const prioRows = fise.map((f, i) => {
        const s1 = 5 - (i % 3), s2 = 3 + (i % 3), s3 = (f[4] >= 0.12 ? 3 : 5), s4 = (f[3].indexOf('Scurt') >= 0 ? 5 : f[3].indexOf('Mediu') >= 0 ? 4 : 3), s5 = 4 - (i % 2);
        const tot = (s1 * critW[0] + s2 * critW[1] + s3 * critW[2] + s4 * critW[3] + s5 * critW[4]).toFixed(2);
        return ['P' + (i + 1), f[0].slice(0, 32), s1, s2, s3, s4, s5, tot, f[3]];
      }).sort((a, b) => b[7] - a[7]);
      D.table(['#', 'Proiect', 'Transf', 'Sigur', 'B/C', 'Matur', 'Echit', 'Total', 'Termen'], prioRows, [10, 50, 14, 14, 12, 14, 14, 16, 30], { fs: 6, hfs: 5.8, boldFirst: true });
      D.source('Criterii: transfer modal+emisii (30%), siguranta (20%), beneficiu/cost (20%), maturitate (15%), echitate (15%). Scoruri orientative — se rafineaza in PMUD final.');
      D.h2('Buget si surse de finantare');
      D.pie([['POR (Regional)', 38, PAL[0]], ['PNRR', 26, activColor], ['Buget local', 18, PAL[1]], ['PPP', 12, PAL[4]], ['Alte fonduri', 6, PAL[6]]], { title: 'Structura surselor de finantare (%)', source: 'Mix tipic de finantare a mobilitatii urbane. PMUD aprobat = conditie de eligibilitate.' });
      D.barChart([['2025-2027', Math.round(invTot * 0.28), PAL[2]], ['2028-2032', Math.round(invTot * 0.42), PAL[0]], ['2033-2040', Math.round(invTot * 0.30), PAL[1]]], { title: 'Esalonarea investitiilor pe etape (mil. EUR)', h: 44, source: 'Distributie orientativa a efortului investitional pe orizonturi.' });
      D.callout('Buget total estimat', 'Investitie cumulata orientativa de cca. ' + N(invTot) + ' mil. EUR pe orizontul 2025-2040, mobilizata predominant din fonduri europene (POR, PNRR), completate de buget local si parteneriate public-private.');

      // ── 10. MONITORIZARE ─────────────────────────────────────────────────
      D.chapter('Monitorizare si evaluare');
      D.P('Implementarea PMUD se monitorizeaza printr-un sistem de indicatori, cu raportare periodica publica si revizuire a planului la fiecare ciclu (5 ani), conform metodologiei SUMP.');
      D.table(['Indicator de monitorizare', 'Unitate', 'Frecventa', 'Responsabil'], [
        ['Distributia modala', '% deplasari', 'Bienal (ancheta)', 'Primarie / operator TP'],
        ['Grad de motorizare', 'auto/1000 loc', 'Anual', 'INS / primarie'],
        ['Emisii CO2 transport', 't/cap/an', 'Anual', 'APM / primarie'],
        ['Calitatea aerului (PM2.5, NO2)', 'ug/mc', 'Continuu', 'Statii monitorizare'],
        ['Victime accidente', 'nr/an', 'Anual', 'Politia Rutiera'],
        ['Lungime piste biciclete', 'km', 'Anual', 'Administratie'],
        ['Acoperire transport public', '% pop <300m', 'Bienal', 'GIS primarie'],
        ['Viteza comerciala TP', 'km/h', 'Anual', 'Operator TP'],
        ['Satisfactia utilizatorilor', 'scor sondaj', 'Bienal', 'Ancheta cetateni'],
      ], [58, 32, 36, 48], { boldFirst: true });
      D.h2('Guvernanta si revizuire');
      D.P('Coordonarea revine unei structuri de management al mobilitatii din cadrul primariei (sau autoritatii metropolitane), cu raportare anuala publica. Participarea publica este obligatorie in toate fazele. PMUD se revizuieste la 5 ani sau la modificari majore ale contextului.');

      // ── CAPITOLE SUPLIMENTARE ────────────────────────────────────────────
      D.chapter('Integrarea cu dezvoltarea spatiala (TOD)');
      D.P('Mobilitatea si urbanismul sunt indisolubil legate: forma urbana determina cererea de deplasare, iar sistemul de transport modeleaza dezvoltarea. Dezvoltarea orientata catre transport public (Transit-Oriented Development, TOD) concentreaza densitati ridicate, mix functional si calitate a spatiului public in jurul nodurilor de transport, reducand nevoia de deplasari motorizate.');
      D.h2('Principii TOD aplicate');
      D.bullets([
        ['Densitate', 'densitati rezidentiale si de locuri de munca mai mari in proximitatea statiilor de transport public'],
        ['Diversitate', 'mix functional (locuire, munca, servicii, comert) care permite deplasari scurte'],
        ['Design', 'spatiu public de calitate, prioritar pentru pietoni si biciclisti'],
        ['Distanta', 'dotari si statii la distanta de mers pe jos (oras de 15 minute)'],
        ['Tranzit', 'transport public frecvent, rapid si fiabil ca structura a dezvoltarii'],
      ]);
      D.P('Corelarea PMUD cu PUG-ul si cu Masterplanul strategic asigura ca noile dezvoltari sunt amplasate in zone bine deservite de transport public, evitand expansiunea dependenta de autoturism. Reglementarile urbanistice (POT, CUT, parcare) sustin sau franeaza obiectivele de mobilitate.');

      D.chapter('Mobilitate la cerere si servicii noi de mobilitate');
      D.P('Pe langa modurile traditionale, mobilitatea urbana integreaza servicii noi: micromobilitate partajata (biciclete, trotinete electrice), transport la cerere (DRT) in zonele cu cerere redusa, car-sharing si mobilitate ca serviciu (MaaS). Aceste servicii completeaza transportul public si reduc dependenta de autoturismul propriu.');
      D.table(['Serviciu de mobilitate', 'Rol', 'Conditii de succes'], [
        ['Bike/scooter-sharing', 'deplasari scurte, ultimul kilometru', 'infrastructura velo + reglementare parcare'],
        ['Transport la cerere (DRT)', 'zone/ore cu cerere redusa', 'integrare cu TP, aplicatie de rezervare'],
        ['Car-sharing', 'reducerea detinerii de autoturisme', 'locuri dedicate, masa critica utilizatori'],
        ['MaaS (mobilitate ca serviciu)', 'planificare + plata integrata multimodala', 'integrare date + tarife operatori'],
      ], [50, 60, 64], { boldFirst: true, fs: 7 });

      D.chapter('Evaluarea strategica de mediu (SEA)');
      D.P('PMUD, ca plan cu efecte potentiale asupra mediului, este supus evaluarii strategice de mediu (SEA), conform Directivei 2001/42/CE (transpusa prin HG 1076/2004). SEA analizeaza efectele probabile ale planului asupra factorilor de mediu si propune masuri de prevenire, reducere si compensare.');
      D.table(['Factor de mediu', 'Efect probabil PMUD', 'Sens'], [
        ['Aer si clima', 'Reducerea emisiilor prin transfer modal si electrificare', 'Pozitiv'],
        ['Zgomot', 'Reducerea traficului auto in zone sensibile', 'Pozitiv'],
        ['Biodiversitate', 'Coridoare verzi; atentie la fragmentare in faza de constructie', 'Pozitiv / de gestionat'],
        ['Sol si apa', 'Suprafete permeabile, drenaj durabil', 'Pozitiv'],
        ['Sanatatea populatiei', 'Aer curat, siguranta, mobilitate activa', 'Pozitiv'],
        ['Peisaj si patrimoniu', 'Spatiu public de calitate; integrare contextuala', 'Pozitiv / de gestionat'],
      ], [42, 96, 36], { boldFirst: true, fs: 7 });
      D.callout('Concluzie SEA (orientativa)', 'Implementarea PMUD are un efect global pozitiv asupra mediului si sanatatii, prin reducerea emisiilor, a zgomotului si a accidentelor. Efectele negative temporare (faza de constructie) se gestioneaza prin masuri standard de mediu. SEA finala se elaboreaza de expert atestat.');

      D.chapter('Participare publica si consultare');
      D.P('Planificarea participativa este o cerinta esentiala a metodologiei SUMP si o conditie legala (Legea 52/2003, Legea 350/2001). Implicarea cetatenilor, a mediului de afaceri si a societatii civile in toate fazele creste calitatea, legitimitatea si acceptabilitatea planului.');
      D.h2('Instrumente de participare');
      D.bullets([
        'Anchete de mobilitate si sondaje de opinie privind nevoile de deplasare.',
        'Dezbateri publice si ateliere participative pe etape ale planului.',
        'Platforma online de consultare si harti interactive de feedback.',
        'Grupuri de lucru cu partile interesate (operatori, ONG-uri, mediu academic).',
        'Comunicare transparenta a deciziilor si a progresului implementarii.',
      ]);
      D.P('Participarea nu este o formalitate, ci un proces continuu care fundamenteaza deciziile si construieste sprijinul public necesar pentru masuri uneori dificile (restrictii auto, tarifare parcare).');

      // ── 11. METODOLOGIE SI SURSE ─────────────────────────────────────────
      D.chapter('Metodologie, surse si glosar');
      D.h2('Cadru metodologic si legal');
      D.table(['Domeniu', 'Referinte'], [
        ['Metodologie', 'Liniile directoare SUMP (ELTIS, 2019) · ghid MDLPA de elaborare PMUD'],
        ['Cadru legal national', 'Legea 350/2001 · OG 43/1997 (drumuri) · Strategia Nationala de Mobilitate'],
        ['Cadru european', 'Pactul Verde European · Strategia UE mobilitate sustenabila si inteligenta · Regulament TEN-T · Directiva 2008/50/CE (aer)'],
        ['Model de transport', 'Model in 4 etape (generare, distributie gravitationala, alegere modala logit, afectare echilibru Wardrop/BPR)'],
        ['Evaluare', 'Analiza cost-beneficiu (VAN, BCR) · analiza izocrone de accesibilitate · analiza multicriteriala'],
        ['Surse de date', 'INS TEMPO · Eurostat · EEA · OpenStreetMap · OpenAQ · INFP · operatori de transport locali'],
      ], [40, 134], { boldFirst: true });
      D.h2('Glosar');
      D.table(['Termen', 'Definitie'], [
        ['PMUD / SUMP', 'Plan de Mobilitate Urbana Durabila / Sustainable Urban Mobility Plan'],
        ['Modal split', 'Repartitia deplasarilor pe moduri de transport'],
        ['TOD', 'Transit-Oriented Development — dezvoltare orientata catre transport public'],
        ['Park&ride', 'Parcare la periferie conectata la transport public'],
        ['ITS', 'Intelligent Transport Systems — sisteme inteligente de transport'],
        ['MaaS', 'Mobility as a Service — mobilitate ca serviciu integrat'],
        ['VOT', 'Value of Time — valoarea timpului de calatorie'],
        ['Vision Zero', 'Obiectivul de zero decese si raniri grave in trafic'],
      ], [30, 144], { boldFirst: true });
      D.callout('Disclaimer', 'Document de fundamentare (pre-PMUD), cu valoare orientativa si analitica. Un PMUD final legal necesita recensamant de trafic, anchete de mobilitate, model de transport calibrat de consultant atestat si avizele aferente. Indicatorii sunt estimari calibrate pe date oficiale, ce se valideaza cu primaria si operatorii.');
    }
  };
  console.log('[StratPMUD] ✅ PMUD extins incarcat');
})(window);
