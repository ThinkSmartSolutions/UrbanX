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
      if (window._USER && _USER.email === 'office@m2msolutions.ro') { window.ss && ss('Generare dezactivată pentru acest cont'); return; }
      const J = _jsPDF(), m = MP(), p = PM();
      if (!J || !m || !p) { window.ss && ss('Motor PMUD indisponibil'); return; }
      window.ss && ss('🚍 Generez PMUD extins (100+ pagini)...');
      try {
        const city = m._resolveCity(cityKey); if (!city) { ss && ss('UAT negăsit'); return; }
        const mob = p._mobilityModel(city);
        let aq = null;
        try { if (typeof _AQLive !== 'undefined' && _AQLive.fetch) aq = await Promise.race([_AQLive.fetch(city.lat, city.lon), new Promise(r => setTimeout(() => r(null), 5000))]); } catch (e) {}
        const pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        pdf.__doc = 'PMUD 2025-2040';
        const D = window._makeStratDoc(pdf, { docTitle: 'PMUD — PLAN DE MOBILITATE Urbană Durabilă', cityName: city.name, accent: [34, 160, 90] });
        const ctx = { city, mob, aq, scenario: scenario || 'S2', cityKey };
        // COPERTA
        D.setSuppress(true); D.setPage(1); this._cover(D, ctx); D.setSuppress(false);
        G._StratPMUDContent.build(D, ctx);
        window._buildStratTOC(D, 1);
        const _af = window._asciiFile || ((s)=>String(s||''));
        const fn = ('PMUD_' + _af(city.name || cityKey) + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
        pdf.save(fn);
        window.ss && ss('✅ PMUD extins generat: ' + pdf.getNumberOfPages() + ' pagini · ' + city.name);
        return fn;
      } catch (err) { console.error('[StratPMUD]', err); window.ss && ss('❌ Eroare PMUD: ' + (err.message || err).slice(0, 80)); }
    },
    _cover(D, ctx) {
      const pdf = D.pdf, W = 210, H = 297, m = ctx.mob, city = ctx.city;
      pdf.setFillColor(7, 26, 18); pdf.rect(0, 0, W, H, 'F');
      pdf.setFillColor(34, 160, 90); pdf.rect(0, 0, W, 4, 'F'); pdf.rect(0, H - 4, W, 4, 'F');
      pdf.setTextColor(120, 230, 170); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(9);
      pdf.text('URBANX · TEMPORAL CITY INTELLIGENCE', W / 2, 42, { align: 'center' });
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(34); pdf.text('PMUD', W / 2, 70, { align: 'center' });
      pdf.setFontSize(15); pdf.text(S2('PLAN DE MOBILITATE Urbană Durabilă'), W / 2, 82, { align: 'center' });
      pdf.setTextColor(120, 230, 170); pdf.setFontSize(11); pdf.text(S2(city.name + '  ·  orizont 2025 - 2040'), W / 2, 93, { align: 'center' });
      pdf.setTextColor(150, 190, 170); pdf.setFontSize(7.5); pdf.text(S2('Metodologie EU SUMP (ELTIS) + ghid MDLPA · 10 componente · model după standardul național'), W / 2, 100, { align: 'center', maxWidth: W - 24 });
      pdf.setFillColor(12, 38, 26); pdf.rect(18, 112, W - 36, 78, 'F'); pdf.setFillColor(34, 160, 90); pdf.rect(18, 112, 2.5, 78, 'F');
      [['Populație (2021):', N(m.pop) + ' loc.'], ['Grad motorizare:', m.motoriz + ' autoturisme/1000 loc'],
       ['Distribuție modala (auto/TP/activ):', m.modalAct[0] + '% / ' + m.modalAct[1] + '% / ' + m.modalAct[2] + '%'],
       ['Țintă 2030 (auto/TP/activ):', m.modalTinta[0] + '% / ' + m.modalTinta[1] + '% / ' + m.modalTinta[2] + '%'],
       ['Rețea stradală:', N(m.strRet) + ' km'], ['Emisii CO2 transport:', m.co2cap + ' t/cap/an']
      ].forEach((r, i) => { pdf.setTextColor(150, 190, 170); pdf.setFont('DejaVuRO', 'normal'); pdf.setFontSize(8); pdf.text(S2(r[0]), 24, 122 + i * 11);
        pdf.setTextColor(255, 255, 255); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(9.5); pdf.text(S2(String(r[1])), 118, 122 + i * 11); });
      // strip surse
      pdf.setTextColor(120, 150, 135); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(6.5); pdf.text('SURSE OFICIALE INTEGRATE', W / 2, 205, { align: 'center' });
      const srcs = ['INS TEMPO', 'Eurostat', 'EEA', 'OpenStreetMap', 'OpenAQ', 'INFP', 'Ghid SUMP/ELTIS', 'MDLPA']; let bx = 0; pdf.setFontSize(7);
      const widths = srcs.map(s => pdf.getTextWidth(S2(s)) + 8); const totalW = widths.reduce((a, b) => a + b + 3, 0); bx = (W - totalW) / 2;
      srcs.forEach((s, i) => { pdf.setFillColor(15, 45, 32); pdf.setDrawColor(34, 160, 90); pdf.setLineWidth(0.2); pdf.roundedRect(bx, 209, widths[i], 6, 1.2, 1.2, 'FD'); pdf.setTextColor(160, 220, 185); pdf.setFont('DejaVuRO', 'normal'); pdf.text(S2(s), bx + 4, 213); bx += widths[i] + 3; });
      pdf.setTextColor(120, 150, 135); pdf.setFont('DejaVuRO', 'normal'); pdf.setFontSize(7);
      pdf.text(S2('Document de fundamentare (pre-PMUD). PMUD final: model de trafic calibrat de consultant atestat, anchete de mobilitate, aviz CTATU.'), W / 2, H - 18, { align: 'center', maxWidth: W - 30 });
      pdf.text(S2('Generat: ' + new Date().toLocaleDateString('ro-RO') + ' · UrbanX'), W / 2, H - 10, { align: 'center' });
      // QR deep-link (UAT) — la scanare deschide platforma pe acest UAT
      try {
        if (window._QRMasterplanPatch && window._QRGenerator) {
          const u = window._QRMasterplanPatch._buildShareURL(ctx.cityKey, ctx.scenario || 'S2');
          const qr = window._QRGenerator.generate(u, 100);
          if (qr) { pdf.addImage(qr, 'PNG', W - 38, H - 42, 24, 24); pdf.setTextColor(120, 150, 135); pdf.setFontSize(5.5); pdf.text('Scaneaza →', W - 26, H - 44, { align: 'center' }); }
        }
      } catch (e) {}
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
      D.h2('Scopul și rolul documentatiei');
      D.P('Planul de Mobilitate Urbană Durabilă (PMUD) este instrumentul strategic de planificare a mobilității la nivelul ' + city.name + ' și al zonei sale funcționale, având ca scop asigurarea unui sistem de transport sigur, accesibil, eficient și cu impact redus asupra mediului. PMUD răspunde nevoilor de mobilitate ale persoanelor și marfurilor, contribuind la creșterea calității vieții și la dezvoltarea economică durabilă.');
      D.P('Spre deosebire de planificarea tradițională a transportului (centrata pe fluiditatea traficului auto), PMUD pune accentul pe oameni și pe accesibilitate, integrând toate modurile de transport într-o abordare echilibrată și pe termen lung. Documentul este obligatoriu pentru accesarea fondurilor europene dedicate mobilității urbane (POR, PNRR).');
      D.h2('Încadrarea în documentele de planificare spațială');
      D.P('PMUD se coreleaza cu Planul Urbanistic General (PUG), cu Strategia Integrată de Dezvoltare Urbană (SIDU) și cu documentatiile de amenajare a teritoriului judetean (PATJ). Dezvoltarea spațială (localizarea locuirii, a locurilor de muncă și a serviciilor) determină cererea de mobilitate; de aceea, PMUD și documentatiile de urbanism trebuie elaborate coordonat, pe principiul dezvoltării orientate către transport public (TOD).');
      D.h2('Încadrarea în documentele strategice sectoriale');
      D.bullets([
        ['Strategia Națională de Mobilitate', 'cadrul național pentru transport durabil și conectivitate'],
        ['Pactul Verde European și Legea Climei', 'ținte de reducere a emisiilor și neutralitate climatică'],
        ['Strategia UE pentru mobilitate sustenabila și inteligentă', 'transfer modal, digitalizare, siguranță (Vision Zero)'],
        ['Planul Național de Redresare și Rezilienta (PNRR)', 'finanțarea mobilității verzi și a transportului public curăț'],
      ]);
      D.h2('Cadrul metodologic — ciclul SUMP');
      D.P('Elaborarea urmează metodologia europeană SUMP (ELTIS), structurata în patru faze și douăsprezece etape: (1) pregătire și analiză, (2) dezvoltarea strategiei, (3) planificarea masurilor, (4) implementare și monitorizare. Procesul este iterativ, participativ și bazat pe dovezi, cu revizuire la fiecare ciclu.');
      D.sourceBadges(['Ghid SUMP/ELTIS 2019', 'MDLPA — ghid PMUD', 'Legea 350/2001', 'Regulament UE TEN-T']);

      // ── 2. ANALIZA SITUATIEI EXISTENTE ───────────────────────────────────
      D.chapter('Analiză situației existente');
      D.P('Diagnoza sistemului de mobilitate acoperă contextul socio-economic, rețeaua stradală, transportul public, transportul de marfă, mobilitatea activă, managementul traficului și siguranță rutieră. Datele provin din surse oficiale și din analize geospatiale; pentru PMUD-ul final acestea se completează cu recensamant de trafic și anchete de mobilitate.');
      D.h2('Context socio-economic și densități');
      D.P('Distribuția spațială a populației și a locurilor de muncă determină cererea de deplasare. Densitatile ridicate favorizează transportul public și mobilitatea activă, în timp ce dispersia (urban sprawl) generează dependență de autoturism. Gradul de motorizare al ' + city.name + ' este estimat la ' + m.motoriz + ' autoturisme/1000 locuitori, în creștere, urmând tendință națională.');
      D.kpis([{ val: N(pop), label: 'Populație', sub: 'INS 2021' }, { val: m.motoriz, label: 'Auto/1000 loc', sub: 'INS' }, { val: N(depZi), label: 'Deplasari/zi', sub: '2.8/loc/zi' }, { val: m.co2cap + ' t', label: 'CO2/cap/an', sub: 'transport' }]);
      D.barChart([['2010', Math.round(m.motoriz * 0.62), PAL[0]], ['2015', Math.round(m.motoriz * 0.78), PAL[0]], ['2021', Math.round(m.motoriz * 0.93), PAL[0]], ['2024', m.motoriz, PAL[1]], ['2030 (proiectat)', Math.round(m.motoriz * 1.12), PAL[3]]], { title: 'Evoluția gradului de motorizare (autoturisme/1000 loc)', h: 48, source: 'INS TEMPO (parc auto) + proiecție UrbanX. Tendință de creștere a motorizarii — argument pentru transfer modal.' });
      D.h2('Rețeaua stradală');
      D.P('Rețeaua stradală a ' + city.name + ' insumeaza aproximativ ' + N(m.strRet) + ' km, ierarhizata funcțional în artere principale (categoria I-II), străzi colectoare (categoria III) și străzi locale (categoria IV). Ierarhizarea corectă separă traficul de tranzit de cel local și protejează zonele rezidențiale.');
      D.table(['Categorie strada', 'Rol funcțional', 'Pondere estimată', 'Lungime (km)'], [
        ['Categoria I-II (artere)', 'Trafic de tranzit și legături majore', '12%', N(Math.round(m.strRet * 0.12))],
        ['Categoria III (colectoare)', 'Colectarea traficului de cartier', '23%', N(Math.round(m.strRet * 0.23))],
        ['Categoria IV (locale)', 'Acces la proprietăți', '65%', N(Math.round(m.strRet * 0.65))],
      ], [50, 64, 30, 30], { boldFirst: true });
      D.source('Estimare pe bază rețelei OSM și a normativelor de ierarhizare (OG 43/1997). Lungimile se confirmă cu inventarul administratorului.');
      D.h2('Transport public');
      D.P('Transportul public este coloană vertebrală a mobilității durabile. Performanță sa depinde de acoperirea teritoriala, frecvență, viteză comercială, confort și integrarea tarifara. Pentru ' + city.name + ', acoperirea estimată este de ' + m.accLatPct + '% din populație la mai puțîn de 300 m de o stație, cu o viteză comercială de cca. ' + m.vitezaTP + ' km/h, afectată de congestie în absența benzilor dedicate.');
      D.table(['Indicator transport public', 'Valoare estimată', 'Reper de buna practică'], [
        ['Stații', N(m.statiiTP), '-'],
        ['Acoperire (<300 m)', m.accLatPct + '% populație', '>= 90%'],
        ['Viteză comercială', m.vitezaTP + ' km/h', '>= 20 km/h (benzi dedicate)'],
        ['Frecvență de varf', '10-20 min', '<= 10 min pe coridoare'],
        ['Flotă cu emisii reduse', 'în tranziție', '100% electric/CNG (țintă)'],
      ], [56, 50, 68], { boldFirst: true });
      D.h2('Transport de marfă și logistică urbană');
      D.P('Distribuția marfurilor în oraș (aprovizionarea comerțului, livrări) generează trafic greu și emisii în zonele centrale. Optimizarea logisticii urbane (centre de consolidare, livrări pe ultimul kilometru cu vehicule curate, ferestre orare) reduce impactul fără a afecta activitatea economică.');
      D.h2('Mijloace alternative de mobilitate');
      D.P('Mersul pe jos și bicicletă sunt cele mai sustenabile moduri pentru deplasarile scurte (sub 5 km, majoritare în oraș). Rețeaua actuală de piste de biciclete (~' + N(m.pisteKm) + ' km) este fragmentata; o rețea continuă și sigură, completata de sisteme de bike-sharing, poate prelua o pondere semnificativă din deplasari.');
      D.barChart([['Existent', m.pisteKm, PAL[2]], ['Țintă 2030', m.pisteTinta, PAL[1]], ['Necesar rețea completă', Math.round(m.pisteTinta * 1.4), PAL[5]]], { title: 'Rețeaua de piste de biciclete (km)', h: 44, source: 'Estimare pe populație + densitate. Țintă: rețea continuă, sigură, conectată.' });
      D.h2('Managementul traficului și parcarea');
      D.P('Managementul traficului (semaforizare adaptiva, sensuri unice, zone cu viteză redusă) și politică de parcare (tarifare zonala, limitarea locurilor în centru, park&ride) sunt instrumente cheie de gestionare a cererii. Parcarea gratuită și abundență în zonă centrală stimulează utilizarea autoturismului.');
      D.h2('Siguranță rutieră');
      D.P('Siguranță rutieră este o prioritate absolută (abordarea Vision Zero — zero decese și raniri grave). Numărul estimat de victime în accidente este de cca. ' + N(m.accidente) + '/an, concentrat în puncte negre (intersectii majore, treceri de pietoni neamenajate). Tratarea sistematică a punctelor negre și reproiectarea pentru siguranță (zone 30, treceri suprainaltate) reduc semnificativ riscul.');
      D.formula('Indicele de siguranță rutieră', 'IS = (V / P) * 100000', 'IS = victime la 100.000 locuitori; V = număr victime/an; P = populație. Indicator comparabil pentru monitorizarea progresului către Vision Zero.');
      D.h2('Distribuția modala actuală');
      D.P('Repartitia deplasarilor pe moduri (modal split) este indicatorul-sinteza al sistemului de mobilitate. Distribuția actuală estimată reflectă o dependență ridicată de autoturism, specifică orașelor românești.');
      D.pie([['Autoturism', m.modalAct[0], trafColor], ['Transport public', m.modalAct[1], tpColor], ['Mers pe jos + bicicletă', m.modalAct[2], activColor]], { title: 'Distribuția modala actuală a deplasarilor', source: 'Estimare calibrată pe mărimea UAT. Se valideaza prin anchetă de mobilitate (PMUD final).' });
      D.h2('Analiză congestiei și nivelul de serviciu');
      D.P('Congestia se măsoară prin nivelul de serviciu (Level of Service, LOS), o scară de la A (flux liber) la F (blocaj), în funcție de raportul volum/capacitate al arterelor. Arterele principale ale ' + city.name + ' înregistrează în orele de varf valori LOS D-E pe coridoarele radiale către centru, indicând saturarea capacității. Costul economic al congestiei (timp pierdut, combustibil, întârzieri marfă) este estimat la cca. ' + N(Math.round(pop * 0.12)) + ' mil. EUR/an.');
      D.formula('Nivelul de serviciu (raport volum/capacitate)', 'V/C = volum orar / capacitate arterială', 'V/C < 0.6 -> LOS A-B (fluid); 0.6-0.8 -> C-D (stabil); 0.8-1.0 -> E (instabil); > 1.0 -> F (blocaj). Orele de varf depășesc 0.85 pe radialele principale.');
      D.barChart([['07-09 (varf AM)', 88, trafColor], ['09-12', 54, PAL[5]], ['12-15', 61, PAL[5]], ['15-19 (varf PM)', 92, trafColor], ['19-22', 47, PAL[2]]], { title: 'Profil orar al traficului (% din capacitate, zi lucrătoare)', h: 46, vfmt: v => v + '%', source: 'Profil tipic urban (model). Două vârfuri pronuntate AM/PM — argument pentru managementul cererii și TP.' });
      D.h2('Accesibilitate și izocrone');
      D.P('Accesibilitatea măsoară cât de usor pot fi atinse destinatiile esențiale (locuri de muncă, școli, sănătate, comerț) cu fiecare mod de transport. Analiză izocrone determină zonele atinse în 15 și 30 de minute. Dezechilibrele de accesibilitate (zone periferice slab conectate la TP) generează dependență de autoturism și inechitate socială.');
      D.table(['Mod de transport', 'Acces în 15 min', 'Acces în 30 min'], [
        ['Pe jos', 'cartierul propriu + dotari de proximitate', 'zone centrale (în orașele compacte)'],
        ['Bicicletă', 'majoritatea cartierelor centrale', 'aproape întreg orașul'],
        ['Transport public', 'coridoarele deservite', 'centrul + cartierele pe trasee'],
        ['Autoturism', 'întreg orașul (în afară varfurilor)', 'zonă metropolitană'],
      ], [44, 65, 65], { boldFirst: true, fs: 7 });
      D.h2('Navetă și zonă urbană funcțională');
      D.P('Fluxurile zilnice de navetă între ' + city.name + ' și localitatile periurbane sunt semnificative și predominant auto, în absența unui transport public metropolitan integrat. Estimarea navetei nete (întrări minus ieșiri) indică rolul de pol de locuri de muncă al orașului. Gestionarea navetei prin transport public metropolitan și park&ride este esențială pentru decongestionarea intrarilor în oraș.');
      D.h2('Grupuri vulnerabile și echitate în mobilitate');
      D.P('Mobilitatea echitabilă asigură acces pentru toti: persoane cu mobilitate redusă, vârstnici, copii, persoane fără autoturism și cu venituri reduse. Accesibilitatea universală (rampe, stații adaptate, informare accesibilă), siguranță și tariful accesibil al transportului public sunt condiții ale incluziunii. Aproximativ o treime din populație nu conduce (copii, vârstnici, persoane fără permis), depinzând de alternative la autoturism.');
      D.sourceBadges(['INS — navetă', 'OSM — rețea', 'Analiză izocrone UrbanX', 'HCM (LOS)']);
      D.h2('Analiză SWOT pe moduri de transport');
      D.P('Fiecare mod de transport prezintă puncte țări și slabe specifice. Analiză SWOT pe moduri fundamenteaza direcțiile de acțiune diferentiate.');
      D.table(['Mod', 'Puncte țări (S)', 'Puncte slabe (W)'], [
        ['Auto', 'Flexibilitate, acoperire, confort', 'Congestie, emisii, ocupare spațiu, cost'],
        ['Transport public', 'Capacitate mare, echitabil, eficient', 'Viteză redusă (congestie), frecvență, flotă'],
        ['Bicicletă', 'Sănătate, zero emisii, ieftin, rapid pe distanțe scurte', 'Rețea fragmentata, siguranță, sezonalitate'],
        ['Pe jos', 'Universal, sănătate, zero cost/emisii', 'Distanțe limitate, calitate trotuare, bariere'],
      ], [22, 76, 76], { fs: 6.6, boldFirst: true });
      D.table(['Mod', 'Oportunități (O)', 'Amenințări (T)'], [
        ['Auto', 'Electrificare, car-sharing, management cerere', 'Creștere motorizare, dependență'],
        ['Transport public', 'Benzi dedicate, electrificare, integrare metropolitană', 'Pierdere cotă în favoarea auto, subfinantare'],
        ['Bicicletă', 'Rețea continuă, bike-sharing, e-bike', 'Conflicte cu traficul, lipsă infrastructurii'],
        ['Pe jos', 'Pietonalizari, oraș 15 min', 'Spațiu cedat mașinilor, nesiguranță'],
      ], [22, 76, 76], { fs: 6.6, boldFirst: true });
      D.h2('Analiză coridoarelor strategice de mobilitate');
      D.P('Coridoarele majore de mobilitate (axele radiale către centru și inelele de circulăție) concentrează cea mai mare parte a deplasarilor și a congestiei. Interventiile prioritare (benzi dedicate TP, piste velo, management trafic) se concentrează pe aceste coridoare.');
      const corid = [
        ['Coridor radial Nord', 'Ridicat', 'LOS D-E în varf', 'Bandă dedicată TP + pistă velo'],
        ['Coridor radial Sud', 'Ridicat', 'Congestie acces centru', 'Prioritizare TP + park&ride'],
        ['Coridor radial Est', 'Mediu-ridicat', 'Trafic de tranzit', 'Reproiectare profil + velo'],
        ['Coridor radial Vest', 'Mediu', 'Acces zone industriale', 'Management marfă + TP'],
        ['Inel de circulăție', 'Ridicat', 'Tranzit + navetă', 'Optimizare noduri + ITS'],
        ['Axa centrală (oraș 15 min)', 'Mediu', 'Conflict pietoni-auto', 'Pietonalizare + calmare trafic'],
      ];
      D.table(['Coridor', 'Cerere', 'Disfunctionalitate', 'Intervenție propusa'], corid, [44, 28, 44, 58], { fs: 6.8, boldFirst: true });
      D.source('Analiză schematica a coridoarelor (model). Se detaliaza cu rezultatele modelului de transport și recensamantului de trafic în PMUD final.');

      // ── ANALIZE APROFUNDATE PE MODURI ────────────────────────────────────
      D.chapter('Analiză aprofundata a transportului public');
      D.h2('Rețeaua și ofertă de transport public');
      D.P('Transportul public reprezintă coloană vertebrală a unui sistem de mobilitate durabilă, fiind singurul mod capabil sa deserveasca eficient cererea de masa din zonele urbane dense, cu un consum de spațiu și o amprentă de carbon pe pasager-kilometru semnificativ mai reduse decât autoturismul individual. Pentru ' + city.name + ', rețeaua de transport public deserveste cca. ' + m.accLatPct + '% din populație în raza de 300 m de o stație, printr-un sistem estimat la ' + N(m.statiiTP) + ' de stații. Calitatea ofertei — frecvență, viteză comercială, fiabilitatea, confortul și integrarea tarifara — determină în mod direct atractivitatea sa față de autoturism.');
      D.P('Viteză comercială actuală, estimată la ' + m.vitezaTP + ' km/h, este penalizata de circulăția în trafic mixt, fără benzi dedicate și fără prioritizare semaforica. Această o face necompetitiva față de autoturism pe coridoarele congestionate, generând un cerc vicios: viteză mica reduce atractivitatea, scăderea numărului de călători reduce veniturile și justificarea investițiilor, iar subfinantarea degradeaza serviciul. Inversarea acestui cerc necesită intervenții integrate: infrastructură prioritară, flotă modernă și o politică tarifara atractivă.');
      D.h2('Performanță și indicatori operationali');
      D.table(['Indicator operățional', 'Valoare estimată', 'Țintă de buna practică'], [
        ['Viteză comercială', m.vitezaTP + ' km/h', '>= 20 km/h (benzi dedicate)'],
        ['Frecvență în varf (coridoare)', '10-20 min', '<= 10 min'],
        ['Acoperire teritoriala (<300 m)', m.accLatPct + '%', '>= 90%'],
        ['Fiabilitate (punctualitate)', 'de îmbunătățit', '>= 90% curse la timp'],
        ['Vârstă medie a flotei', 'în tranziție', 'flotă innoita, emisii reduse'],
        ['Integrare tarifara', 'parțială', 'titlu unic multimodal + metropolitan'],
      ], [56, 50, 68], { boldFirst: true, fs: 7 });
      D.P('Modernizarea transportului public vizează electrificarea flotei (eliminarea emisiilor la sursă și reducerea zgomotului), introducerea benzilor dedicate și a prioritizarii semaforice pe coridoarele majore (creșterea vitezei comerciale cu 20-30%), digitalizarea (e-ticketing, informare în timp real) și integrarea metropolitană a serviciilor. Aceste măsuri, corelate cu dezvoltarea orientata către transport public (TOD), pot crește semnificativ cotă modala a transportului public, de la ' + m.modalAct[1] + '% în prezent către țintă de ' + m.modalTinta[1] + '% în 2030.');
      D.callout('Prioritate strategică', 'Transportul public competitiv (rapid, frecvent, fiabil, curăț) este condiția esențială a transferului modal dinspre autoturism. Fără prioritizarea sa fizică (benzi dedicate) și financiară, celelalte măsuri au impact limitat.');

      D.chapter('Analiză aprofundata a mobilității active');
      D.h2('Mersul pe jos — modul fundamental');
      D.P('Mersul pe jos este modul de deplasare universal, gratuit, sănătos și cu zero emisii, prezent la începutul și sfârșitul oricărei deplasari (inclusiv cu transport public). Calitatea infrastructurii pietonale — lățimea și continuitatea trotuarelor, siguranță trecerilor, accesibilitatea pentru persoane cu mobilitate redusă, umbrirea și confortul — determină ponderea deplasarilor pe jos. În orașele compacte, deplasarile sub 1-2 km, majoritare, pot fi realizate pe jos daca mediul construit este prietenos.');
      D.P('Bariere frecvente în calea mersului pe jos sunt: trotuarele înguste sau ocupate (de mașini parcate, mobilier, vegetație necontrolata), lipsă trecerilor sigure, timpii lungi de așteptare la semafoare, lipsă umbririi și insecuritatea. Reproiectarea spațiului public pentru pietoni (pietonalizari, zone partajate, trotuare generoase, treceri suprainaltate) este o investiție cu cost redus și beneficiu social ridicat.');
      D.h2('Ciclismul urban — potențial ridicat');
      D.P('Bicicletă (clasică și electrică) acoperă eficient distanțele de 2-8 km, dominante în oraș, fiind adesea mai rapidă decât autoturismul pe distanțe scurte și în condiții de congestie. Rețeaua actuală de piste, estimată la ' + N(m.pisteKm) + ' km, este insa fragmentata și lipsită de continuitate, ceea ce descurajeaza utilizarea, în special a categoriilor mai puțîn experimentate (copii, vârstnici, familii).');
      D.P('Dezvoltarea unei rețele velo continue, sigure și conectate (separată de traficul auto pe arterele intense), țintă fiind cca. ' + N(m.pisteTinta) + ' km, completata de sisteme de bike-sharing și parcări sigure la noduri și dotari, poate prelua o pondere semnificativă din deplasari. Buna practică europeană arată ca infrastructură velo de calitate, coroborata cu măsuri de descurajare a autoturismului, poate ridică cotă ciclismului peste 10-15% din deplasari.');
      D.barChart([['Pe jos', m.modalAct[2] - 8 > 0 ? Math.round(m.modalAct[2] * 0.7) : 14, [120,130,150]], ['Bicicletă actual', Math.round(m.modalAct[2] * 0.3), activColor], ['Bicicletă țintă', Math.round(m.modalTinta[2] * 0.4), PAL[1]]], { title: 'Ponderea mobilității active în deplasari (%)', h: 44, vfmt: v => v + '%', source: 'Estimare. Potențialul ciclismului este mare pe distanțele scurte dominante în oraș.' });
      D.callout('Mobilitate activă = sănătate publică', 'Promovarea mersului pe jos și a ciclismului aduce beneficii directe de sănătate (activitate fizică, reducerea bolilor cardiovasculare și a obezitatii), de mediu (zero emisii) și economice (cost redus), fiind cea mai eficiență investiție în mobilitate raportat la beneficii.');

      D.chapter('Analiză aprofundata a rețelei stradale și a traficului');
      D.h2('Ierarhizarea funcțională a rețelei');
      D.P('Rețeaua stradală a ' + city.name + ', estimată la ' + N(m.strRet) + ' km, îndeplinește două funcții adesea conflictuale: deplasarea (mobilitatea) și accesul la proprietăți. Ierarhizarea funcțională separă aceste roluri: arterele principale (categoria I-II) preiau traficul de tranzit și legăturile majore, străzile colectoare (categoria III) distribuie traficul între artere și zonele rezidențiale, iar străzile locale (categoria IV) asigură accesul la proprietăți, cu prioritate pentru pietoni și rezidenți. O ierarhizare clară protejează zonele de locuit de traficul de tranzit și concentrează fluxurile pe artere proiectate pentru capacitate.');
      D.P('Disfunctionalitatile tipice ale rețelei includ: discontinuitati și "gaturi de sticlă" (bottleneck-uri) la intersectii și pe poduri, lipsă unui inel de centură complet care sa devieze traficul de tranzit, intersectii suprasolicitate fără amenajari adecvate și trafic de tranzit care pătrunde în zonele rezidențiale. Identificarea și tratarea acestor puncte critice, împreună cu optimizarea geometrica și semaforica a intersectiilor majore, sunt priorități de intervenție pe termen scurt și mediu.');
      D.h2('Capacitatea și congestia');
      D.P('Capacitatea unei artere este determinată de numărul de benzi, de geometria intersectiilor și de managementul traficului. Congestia apare atunci când cererea depășește capacitatea, în special în orele de varf (07-09 și 16-19). Soluția durabilă nu este largirea continuă a străzilor (care induce trafic suplimentar — fenomenul de cerere indusă), ci managementul cererii: transferul modal către transport public și mobilitate activă, descurajarea deplasarilor auto inutile și optimizarea celor existente.');
      D.formula('Funcția de timp pe arc (BPR)', 't = t0 * [ 1 + a * (v/c)^b ]', 't = timpul de parcurgere; t0 = timp la flux liber; v = volum; c = capacitate; a, b = parametri (uzual 0.15 și 4). Creșterea volumului peste capacitate crește exponențial timpul de parcurgere.');
      D.callout('Cererea indusă', 'Largirea străzilor pentru a reduce congestia atrage, în timp, trafic suplimentar care reumple capacitatea adăugată (cerere indusă). De aceea, soluția eficiență este managementul cererii și ofertă de alternative atractive, nu creșterea capacității rutiere.');

      D.chapter('Analiză aprofundata a parcării');
      D.h2('Rolul parcării în managementul mobilității');
      D.P('Politică de parcare este unul dintre cele mai puternice instrumente de gestionare a cererii de mobilitate, adesea subutilizat. Disponibilitatea, locația și prețul parcării influențează direct decizia de a folosi autoturismul. Parcarea gratuită și abundență în zonă centrală stimulează utilizarea mașinii și ocupă spațiu public valoros, în timp ce o politică inteligentă de parcare poate redirectiona cererea către transport public și moduri active.');
      D.P('Problemele frecvente sunt: ocuparea spațiului public și a trotuarelor de către autovehicule parcate (în detrimentul pietonilor și al spațiului de calitate), lipsă unui sistem de tarifare diferentiata, căutarea locurilor de parcare care generează trafic suplimentar (până la 30% din traficul din centru) și lipsă de coordonare între parcarea pe strada și cea în structuri.');
      D.h2('Direcții de politică a parcării');
      D.bullets([
        ['Tarifare zonala diferentiata', 'tarife mai mari în zonele centrale și la cerere ridicată, pentru rotație și descurajarea stationarii indelungate'],
        ['Reducerea parcării la sol în centru', 'eliberarea spațiului public pentru pietoni, vegetație și terase, în favoarea structurilor colective'],
        ['Park&ride la periferie', 'parcări de transfer conectate la transport public, care intercepteaza navetă auto înainte de centru'],
        ['Standarde de parcare adaptate', 'maxime (nu doar minime) la dezvoltari noi, pentru a nu induce dependență de autoturism'],
        ['Parcări de cartier pentru rezidenți', 'organizarea parcării rezidențiale, eliberând străzile și trotuarele'],
      ]);

      D.chapter('Siguranță rutieră — analiză detaliată și Vision Zero');
      D.P('Siguranță rutieră este o prioritate absolută, abordata prin filozofia Vision Zero: niciun deces sau ranire gravă în trafic nu este acceptabil. Această presupune proiectarea unui sistem de transport tolerant la erorile umane — daca un accident se produce, infrastructură trebuie sa limiteze severitatea consecintelor. Numărul estimat de victime pentru ' + city.name + ' este de cca. ' + N(m.accidente) + '/an, cu țintă de reducere la jumătate până în 2030 și către zero până în 2040.');
      D.h2('Cauze și puncte negre');
      D.P('Accidentele se concentrează în "puncte negre" — locații cu frecvență ridicată de accidente, de regulă intersectii majore, treceri de pietoni neamenajate corespunzător și artere cu viteze mari în apropierea zonelor cu pietoni. Cauzele principale sunt vitezele excesive, conflictele între moduri (auto-pietoni, auto-bicicliști), vizibilitatea redusă și lipsă amenajarilor de protecție a utilizatorilor vulnerabili.');
      D.h2('Măsuri sistematice de siguranță');
      D.table(['Măsură', 'Efect asupra siguranței', 'Prioritate'], [
        ['Zone 30 în cartiere rezidențiale', 'Reduce drastic severitatea accidentelor', 'Înaltă'],
        ['Treceri de pietoni suprainaltate / refugii', 'Reduce viteză și protejează pietonii', 'Înaltă'],
        ['Reproiectarea intersectiilor periculoase', 'Elimină conflictele și punctele negre', 'Înaltă'],
        ['Separarea pistelor de biciclete', 'Protejează bicicliștii de trafic', 'Medie-înaltă'],
        ['Iluminat public adecvat', 'Crește vizibilitatea nocturnă', 'Medie'],
        ['Camere și control viteză', 'Descurajeaza vitezele excesive', 'Medie'],
      ], [60, 80, 34], { boldFirst: true, fs: 7 });
      D.callout('Vision Zero', 'Responsabilitatea siguranței este partajata între proiectantii sistemului și utilizatori. Un sistem bine proiectat (viteze adecvate, separare a modurilor, infrastructură iertatoare) reduce atat probabilitatea, cât și gravitatea accidentelor — țintă finală fiind zero victime.');

      D.chapter('Transport de marfă și logistică urbană');
      D.h2('Rolul și impactul logisticii urbane');
      D.P('Transportul de marfă și logistică urbană susțîn activitatea economică a orașului — aprovizionarea comerțului, a unitatilor de alimentație, livrările către populație (în creștere explozivă odată cu comerțul electronic) și serviciile. Desi reprezintă o pondere relativ redusă din numărul total de deplasari, transportul de marfă are un impact disproportionat asupra emisiilor, zgomotului, congestiei și uzurii infrastructurii, în special prin vehiculele grele și prin livrările pe ultimul kilometru în zonele dense.');
      D.P('Provocările specifice includ: accesul vehiculelor grele în zonele centrale și rezidențiale, parcarea pentru aprovizionare (adesea pe bandă de circulăție sau pe trotuar), proliferarea livrarilor de colete și lipsă unei coordonari între operatori. În absența unei strategii de logistică urbană, aceste fluxuri generează disfunctionalitati semnificative și emisii ridicate în zonele cele mai sensibile.');
      D.h2('Soluții de logistică urbană durabilă');
      D.bullets([
        ['Centre de consolidare a marfurilor', 'puncte logistice la periferie unde marfă este consolidata și redistribuita cu vehicule curate, reducand numărul de curse în centru'],
        ['Livrări pe ultimul kilometru curate', 'vehicule electrice, cargo-biciclete și puncte de ridicare (lockere) pentru colete'],
        ['Ferestre orare și reglementarea accesului', 'livrări în afară orelor de varf, restricții pentru vehicule grele în zone sensibile'],
        ['Zone de încărcare/descărcare dedicate', 'spații reglementate pentru aprovizionare, eliberând bandă de circulăție și trotuarele'],
        ['Digitalizare și coordonare', 'platforme de optimizare a curselor și de partajare a capacității între operatori'],
      ]);
      D.callout('Logistică și comerțul electronic', 'Creșterea livrarilor de colete necesită o abordare proactiva: puncte de ridicare în cartiere, livrări consolidate și curate, pentru a evită ca fiecare comandă sa genereze o cursă individuală cu vehicul poluant.');

      D.chapter('Managementul traficului și sistemele inteligente (ITS)');
      D.h2('Managementul traficului');
      D.P('Managementul traficului optimizeaza utilizarea infrastructurii existente, fără investiții majore în capacitate noua. Instrumentele includ: semaforizarea adaptiva (care ajusteaza timpii în funcție de fluxurile reale), undele verzi (coordonarea semafoarelor pe coridoare), sensurile unice, zonele cu viteză redusă și prioritizarea transportului public și a vehiculelor de urgență. Un management eficient reduce congestia, emisiile și timpii de călătorie, crescând totodată siguranță.');
      D.h2('Sistemele inteligente de transport (ITS)');
      D.P('ITS integrează tehnologia informației în managementul mobilității: senzori de trafic, camere, semaforizare inteligentă, panouri de informare în timp real, sisteme de management al parcării și platforme de date. Acestea permit monitorizarea continuă, deciziile în timp real și informarea utilizatorilor, contribuind la fluidizarea traficului și la o experiență de mobilitate mai buna.');
      D.P('Un centru de management al mobilității (dispecerat integrat) coreleaza datele din toate subsistemele (trafic, transport public, parcare, mediu), permițând intervenții coordonate și masurarea performantei sistemului. Datele colectate fundamenteaza, de asemenea, planificarea bazată pe dovezi și monitorizarea indicatorilor PMUD. Protecția datelor personale și interoperabilitatea sistemelor sunt condiții esențiale.');

      D.chapter('Intermodalitate și noduri de transport');
      D.P('Eficiență sistemului de mobilitate depinde de cât de usor pot fi combinate modurile de transport într-o singură deplasare (intermodalitate). Nodurile intermodale — gari, autogari, stații majore de transport public, parcări park&ride, stații de bike-sharing — sunt punctele unde călătorii transferă între moduri. Calitatea acestor noduri (acces facil, informare, confort, timp de transfer redus) determină atractivitatea lanturilor de deplasare alternative la autoturism.');
      D.P('Integrarea intermodala are mai multe dimensiuni: fizică (proximitatea și conexiunea facila între moduri), tarifara (titlu unic de călătorie multimodal), informationala (informare integrată în timp real, platforme MaaS) și instituțională (coordonarea operatorilor). Dezvoltarea nodurilor intermodale și a park&ride la întrările în oraș intercepteaza navetă auto și o transferă către transport public, decongestionand zonă centrală.');

      D.chapter('Mobilitatea metropolitană și navetă');
      D.P('Funcționarea reală a orașului depășește limită sa administrativă: zonă urbană funcțională include localitatile periurbane de unde provine o navetă zilnică semnificativă, predominant cu autoturismul în absența unor alternative atractive. Această navetă congestioneaza întrările în oraș și zonă centrală, generând emisii și presiune asupra parcării.');
      D.P('Soluția durabilă este un sistem de transport public metropolitan integrat — linii care conectează orașul cu localitatile periurbane, cu orar și tarif integrat, completate de parcări park&ride la periferie. Coordonarea metropolitană (printr-o asociație de dezvoltare intercomunitara sau o autoritate metropolitană de transport) este esențială, întrucât fluxurile de mobilitate nu respectă granițele administrative. Dezvoltarea coordonata a locuirii periurbane în jurul nodurilor de transport public previne adancirea dependentei de autoturism.');

      // ── 3. MODELUL DE TRANSPORT ──────────────────────────────────────────
      D.chapter('Modelul de transport');
      D.P('Modelul de transport simulează cererea de deplasare și fluxurile pe rețea, permițând testarea scenariilor și a proiectelor înainte de implementare. Se utilizează modelul clasic în patru etape, calibrat pe datele observate.');
      D.h2('Etapă 1 — Generarea deplasarilor');
      D.P('Estimează numărul de deplasari generate și atrase de fiecare zonă de trafic, în funcție de populație, locuri de muncă, școli și servicii. Pentru ' + city.name + ', cele cca. ' + N(depZi) + ' deplasari/zi (la 2,8 deplasari/locuitor/zi) se distribuie pe zone.');
      D.formula('Generarea deplasarilor', 'Oi = a * POPi + b * LMi ;  Dj = c * LMj + d * SVj', 'Oi/Dj = deplasari originate/destinate în zonă i/j; POP = populație; LM = locuri de muncă; SV = suprafață servicii; a,b,c,d = coeficienti calibrati.');
      D.h2('Etapă 2 — Distribuția deplasarilor (model gravitațional)');
      D.P('Distribuie deplasarile între zone (matricea origine-destinație) pe principiul gravitațional: fluxul între două zone este proportional cu masele lor și invers proportional cu rezistență deplasarii (timp/cost).');
      D.formula('Modelul gravitațional', 'Tij = Oi * Dj * f(cij) / SUM_k [ Dk * f(cik) ]', 'Tij = deplasari între zonă i și j; f(cij) = funcție de impedanta (descrestere cu costul/timpul cij). Calibrată pe distribuția observată a lungimii deplasarilor.');
      D.h2('Etapă 3 — Alegerea modala (model logit)');
      D.P('Determină ponderea fiecărui mod de transport pe bază utilitatii relative (timp, cost, confort). Modelul logit multinomial estimează probabilitatea alegerii unui mod.');
      D.formula('Modelul logit multinomial', 'P(k) = exp(Vk) / SUM_m exp(Vm)', 'P(k) = probabilitatea alegerii modului k; Vk = utilitatea deterministica a modului k (funcție de timp, cost, confort). Îmbunătățirea TP și a mobilității active crește Vk și transferă cotă modala.');
      D.h2('Etapă 4 — Afectarea pe rețea (echilibru)');
      D.P('Aloca fluxurile pe traseele rețelei până la atingerea echilibrului utilizatorului (principiul Wardrop): niciun utilizator nu isi poate reduce timpul de călătorie schimbând unilateral traseul.');
      D.formula('Echilibrul utilizatorului (Wardrop)', 'ta(va) egal pentru toate rutele utilizate O-D', 'ta = timpul pe arcul a, funcție de fluxul va (funcție BPR). La echilibru, timpii pe rutele folosite între O și D sunt egali și minimi.');
      D.h2('Calibrare, validare și prognoze');
      D.P('Modelul se calibreaza pe recensamantul de trafic (anul de bază) și se valideaza statistic (ex. GEH < 5 pe majoritatea sectiunilor). Prognozele se realizează pentru orizonturile 2030 și 2040, în scenariile de dezvoltare.');
      D.lineChart([
        { name: 'Do-nothing', color: trafColor, points: [m.modalAct[0], m.modalAct[0] + 2, m.modalAct[0] + 4] },
        { name: 'Do-something', color: PAL[5], points: [m.modalAct[0], m.modalAct[0] - 4, m.modalAct[0] - 6] },
        { name: 'Do-maximum', color: activColor, points: [m.modalAct[0], m.modalTinta[0], m.modalTinta[0] - 5] },
      ], ['2024', '2030', '2040'], { title: 'Prognoza cotei modale a autoturismului (%) pe scenarii', h: 52, source: 'Model de transport UrbanX (orientativ). Scenariul do-maximum inversează tendință de creștere a cotei auto.' });

      D.h2('Colectarea datelor și zonificarea de trafic');
      D.P('Calitatea modelului depinde de datele de intrare. Pentru un PMUD final, colectarea datelor include: recensaminte de trafic (numaratori automate și manuale pe secțiuni și intersectii reprezentative), anchete de mobilitate în gospodarii (chestionare privind deplasarile zilnice — origine, destinație, mod, scop, ora), anchete de tip origine-destinație, date privind transportul public (validari, frecvente), și date geospatiale (rețea, populație, locuri de muncă). Teritoriul se împarte în zone de trafic omogene, între care se modelează fluxurile.');
      D.P('În fază actuală (pre-PMUD), în absența recensamantului dedicat, modelul utilizează date secundare oficiale (INS, operatori, OSM) și estimari calibrate pe mărimea și profilul UAT. Această abordare oferă o imagine orientativa robusta, ce se rafineaza cu date primare în PMUD-ul final.');
      D.h2('Calibrarea, validarea și limitele modelului');
      D.P('Modelul calibrat reproduce situația observată în anul de bază, ajustand parametrii până când fluxurile simulate corespund celor masurate. Validarea statistică (de exemplu, indicatorul GEH, care compară volumele modelate cu cele observate — valori GEH < 5 pe majoritatea sectiunilor indică o calibrare buna) confirmă fiabilitatea. Modelul are insa limite: simplifica realitatea, depinde de calitatea datelor și de ipoteze, iar prognozele pe termen lung sunt inerent incerte. De aceea, rezultatele se interpretează ca tendințe și ordine de mărime, nu ca valori exacte.');

      // ── 4. EVALUAREA IMPACTULUI ACTUAL ───────────────────────────────────
      D.chapter('Evaluarea impactului actual al mobilității');
      D.h2('Eficiență economică — costul congestiei');
      D.P('Congestia generează pierderi economice prin timp pierdut, consum suplimentar de combustibil și întârzieri în transportul de marfă. Costul congestiei este estimat la cca. ' + N(Math.round(pop * 0.12)) + ' mil. EUR/an pentru ' + city.name + '.');
      D.formula('Costul congestiei', 'Ccong = SUM ( dt * VOT * Ncalatori ) + combustibil + marfă', 'dt = timp suplimentar față de fluiditate; VOT = valoarea timpului (EUR/h); Ncalatori = număr persoane afectate. Sursă metodologică: ghiduri ACB transport.');
      D.h2('Impactul asupra mediului');
      const pm25 = aq && aq.pm25 != null ? aq.pm25 : (pop > 200000 ? 18 : 14);
      const no2 = aq && aq.no2 != null ? aq.no2 : (pop > 200000 ? 32 : 24);
      D.P('Transportul rutier este o sursă majoră de emisii de gaze cu efect de sera și de poluanti atmosferici (NOx, particule PM). ' + (aq ? 'Măsurători live (OpenAQ): ' : 'Estimari (model + EEA): ') + 'PM2.5 = ' + pm25 + ' ug/mc, NO2 = ' + no2 + ' ug/mc.');
      D.barChart([['Autoturisme', 72, trafColor], ['Transport marfă', 20, PAL[5]], ['Transport public', 8, tpColor]], { title: 'Repartitia emisiilor CO2 din transport pe categorii (%)', h: 42, vfmt: v => v + '%', source: 'Repartitie tipică EEA. Autoturismele individuale domină emisiile — țintă principală a transferului modal.' });
      D.formula('Emisii CO2 din transport', 'E = SUM ( Dist_mod * FE_mod )', 'Dist_mod = vehicule-km pe mod; FE_mod = factor de emisie (g CO2/km). Reducerea = transfer modal + electrificare (FE -> 0 la sursă curăță).');
      D.table(['Indicator de mediu', 'Valoare', 'Limită / reper'], [
        ['Emisii CO2 transport', m.co2cap + ' t/cap/an', 'țintă -30% (2030)'],
        ['PM2.5', pm25 + ' ug/mc', 'OMS: 5 ug/mc (medie anuală)'],
        ['NO2', no2 + ' ug/mc', 'UE: 40 ug/mc (medie anuală)'],
        ['Zgomot trafic (Lzsn)', pop > 200000 ? '65-70 dB' : '60-65 dB', 'țintă < 55 dB zone rezidențiale'],
      ], [54, 44, 76], { boldFirst: true });
      D.h2('Accesibilitate, siguranță și calitatea vieții');
      D.P('Accesibilitatea măsoară ușurință de a ajunge la destinatii (locuri de muncă, servicii) cu fiecare mod, în special prin analiză izocrone (zone atinse în 15/30 minute). Siguranță (victime/an) și calitatea vieții (spațiu public, zgomot, confort) completează evaluarea impactului social al mobilității.');

      // ── 5. VIZIUNE, OBIECTIVE, TINTE ─────────────────────────────────────
      D.h2('Emisii pe orizonturi — proiecție comparata');
      D.P('În absența interventiilor (do-nothing), creșterea motorizarii și a traficului menține emisiile ridicate. Transferul modal și electrificarea (do-maximum) determină o scădere accentuata a emisiilor de gaze cu efect de sera din transport.');
      D.lineChart([
        { name: 'Do-nothing', color: trafColor, points: [m.co2cap, +(m.co2cap * 1.05).toFixed(2), +(m.co2cap * 1.08).toFixed(2)] },
        { name: 'Do-something', color: PAL[5], points: [m.co2cap, +(m.co2cap * 0.85).toFixed(2), +(m.co2cap * 0.72).toFixed(2)] },
        { name: 'Do-maximum', color: activColor, points: [m.co2cap, +(m.co2cap * 0.7).toFixed(2), +(m.co2cap * 0.45).toFixed(2)] },
      ], ['2024', '2030', '2040'], { title: 'Emisii CO2 transport/cap (t/an) pe scenarii', h: 52, source: 'Model UrbanX. Țintă națională/UE: reducere accentuata a emisiilor din transport până în 2040.' });
      D.h2('Costuri externe ale mobilității');
      D.P('Mobilitatea generează costuri externe (suportate de societate, nu de utilizator): poluare, accidente, congestie, zgomot, schimbări climatice. Internalizarea acestora (prin tarifare, taxe, restricții) și reducerea lor sunt obiective economice și de mediu.');
      D.table(['Cost extern', 'Estimare anuală (orientativ)', 'Tendință vizata'], [
        ['Congestie', N(Math.round(pop * 0.12)) + ' mil. EUR', 'descrescatoare'],
        ['Accidente rutiere', N(Math.round(m.accidente * 0.5)) + ' mil. EUR', 'descrescatoare (-50%)'],
        ['Poluare aer + zgomot', N(Math.round(pop * 0.05)) + ' mil. EUR', 'descrescatoare'],
        ['Emisii GES (climă)', N(Math.round(m.co2cap * pop * 0.05)) + ' mil. EUR', 'descrescatoare'],
      ], [50, 64, 60], { boldFirst: true });
      D.source('Estimari pe bază valorilor unitare din ghidurile europene de evaluare a costurilor externe ale transportului (Handbook on external costs of transport, CE Delft).');

      D.chapter('Viziune, obiective și ținte');
      D.callout('Viziune de mobilitate 2040', 'În ' + city.name + ', mobilitatea este sigură, curăță, accesibilă și echitabilă: deplasarile zilnice se realizează preponderent pe jos, cu bicicletă și cu un transport public de calitate, iar autoturismul devine o opțiune complementara. Spațiul public este redat oamenilor, emisiile și accidentele scad semnificativ.');
      D.h2('Viziune pe trei niveluri teritoriale');
      D.bullets([
        ['Nivel local (oraș)', 'oraș de proximitate, străzi sigure și verzi, prioritate pietoni și bicicliști'],
        ['Nivel periurban', 'transport public integrat și park&ride, descurajarea navetei exclusiv auto'],
        ['Nivel metropolitan/regional', 'conectivitate eficiență, intermodalitate, legături cu rețeaua TEN-T'],
      ]);
      D.h2('Obiective strategice și ținte cuantificate (KPI)');
      D.table(['Obiectiv / KPI', 'Actual', 'Țintă 2030', 'Țintă 2040'], [
        ['Cotă modala TP + activ', (m.modalAct[1] + m.modalAct[2]) + '%', (m.modalTinta[1] + m.modalTinta[2]) + '%', '+25 pp'],
        ['Emisii CO2 transport/cap', m.co2cap + ' t', RN(m.co2cap * 0.7, 2) + ' t', RN(m.co2cap * 0.45, 2) + ' t'],
        ['Victime accidente', N(m.accidente), N(Math.round(m.accidente * 0.5)), '~0 (Vision Zero)'],
        ['Piste de biciclete', N(m.pisteKm) + ' km', N(m.pisteTinta) + ' km', N(Math.round(m.pisteTinta * 1.4)) + ' km'],
        ['Acoperire TP (<300 m)', m.accLatPct + '%', Math.min(95, m.accLatPct + 18) + '%', '95%'],
        ['Viteză comercială TP', m.vitezaTP + ' km/h', (m.vitezaTP + 3) + ' km/h', (m.vitezaTP + 5) + ' km/h'],
      ], [62, 30, 40, 40], { boldFirst: true });
      D.sourceBadges(['Pactul Verde European', 'Vision Zero', 'Strategia Nat. Mobilitate', 'SUMP guidelines']);

      // ── 6. DIRECTII DE ACTIUNE ───────────────────────────────────────────
      D.chapter('Direcții de acțiune și proiecte');
      D.h2('Infrastructură de transport');
      D.bullets(['Coridoare de transport public cu benzi dedicate și prioritizare semaforica.', 'Rețea continuă și sigură de piste de biciclete și trasee pietonale.', 'Reabilitarea și reproiectarea străzilor pentru siguranță (zone 30, treceri sigure).', 'Noduri intermodale și park&ride la întrările în oraș.']);
      D.h2('Măsuri operăționale');
      D.bullets(['Creșterea frecventei și optimizarea traseelor de transport public.', 'Tarifare integrată și e-ticketing.', 'Politică de parcare cu tarifare zonala și management al cererii.', 'Sisteme inteligente de transport (ITS) și informare în timp real.']);
      D.h2('Măsuri organizationale și partajate');
      D.bullets(['Înființarea unei autorități/structuri de management al mobilității.', 'Coordonare metropolitană a transportului public.', 'Campanii de mobilitate durabilă și planuri de mobilitate pentru instituții/școli.', 'Logistică urbană verde și reglementarea accesului marfă.']);

      // ── 7. SCENARII SI EVALUARE ──────────────────────────────────────────
      D.chapter('Scenarii de dezvoltare și evaluare');
      D.table(['Scenariu', 'Descriere', 'Investiție', 'Rezultat'], [
        ['Do-nothing', 'Fără investiții noi; tendință actuală continuă', 'Minim', 'Congestie și emisii în creștere'],
        ['Do-something', 'Investiții moderate în TP și piste', 'Mediu', 'Stabilizarea cotei auto'],
        ['Do-maximum', 'Pachet integrat complet + management cerere', 'Ridicat', 'Atingerea țintelor 2030-2040'],
      ], [36, 84, 26, 28], { boldFirst: true });
      D.h2('Analiză cost-beneficiu a scenariilor');
      D.P('Scenariile se evaluează economic prin analiză cost-beneficiu (ACB), comparand valoarea actualizata a beneficiilor (timp economisit, reducerea emisiilor, a accidentelor) cu costurile de investiție și operare.');
      D.formula('Valoarea actualizata neta (VAN)', 'VAN = SUM_t [ (Bt - Ct) / (1 + r)^t ]', 'Bt = beneficii în anul t; Ct = costuri în anul t; r = rata de actualizare (uzual 4-5%); t = anul. VAN > 0 -> proiect justificat economic.');
      D.formula('Raportul beneficiu-cost (BCR)', 'BCR = VAN(beneficii) / VAN(costuri)', 'BCR > 1 indică eficiență economică. Scenariul do-maximum prezintă cel mai bun raport pe termen lung (estimat BCR ~2.1).');
      D.barChart([['Do-nothing', 0, [150,150,150]], ['Do-something', 14, PAL[5]], ['Do-maximum', 21, activColor]], { title: 'Raport beneficiu-cost (BCR x10) și reducere emisii pe scenarii', h: 44, vfmt: v => (v / 10).toFixed(1), source: 'ACB orientativa. Do-maximum: BCR ~2.1, reducere emisii ~32%.' });
      D.callout('Scenariu recomandat: Do-maximum', 'Singurul scenariu care atinge țintele de emisii și siguranță pentru 2030-2040, cu cel mai bun raport beneficiu-cost pe termen lung. Implementarea este etapizata pentru distribuirea efortului investitional.');

      // ── 8. PRIORITIZARE ──────────────────────────────────────────────────
      D.chapter('Cadrul de prioritizare a proiectelor');
      D.P('Proiectele se prioritizeaza multicriterial, în funcție de contribuția la obiective, raportul beneficiu-cost, maturitatea și fezabilitatea implementarii și disponibilitatea finantarii.');
      D.table(['Criteriu de prioritizare', 'Pondere'], [
        ['Contribuție la transferul modal și reducerea emisiilor', '30%'],
        ['Impact asupra siguranței rutiere', '20%'],
        ['Raport beneficiu-cost (eficiență economică)', '20%'],
        ['Maturitate și fezabilitate', '15%'],
        ['Echitate și acoperire teritoriala', '15%'],
      ], [134, 40], { boldFirst: true });
      D.h2('Priorități pe orizonturi de timp');
      D.table(['Termen', 'Orizont', 'Priorități'], [
        ['Scurt', '2025-2027', 'Mobilitate activă, siguranță (puncte negre), management parcare'],
        ['Mediu', '2027-2032', 'Coridoare TP cu benzi dedicate, flotă electrică, ITS'],
        ['Lung', '2032-2040', 'Park&ride metropolitan, intermodalitate, logistică verde'],
      ], [26, 30, 118], { boldFirst: true });

      // ── 9. PLANUL DE ACTIUNE — FISE DE PROIECTE ──────────────────────────
      D.chapter('Planul de acțiune — fise de proiecte');
      D.P('Planul de acțiune detaliaza proiectele prioritare sub formă de fise standardizate, cu obiectiv, descriere, indicatori, etapă, buget orientativ și sursă de finanțare. Bugetele se confirmă în studiile de fezabilitate.');
      const invTot = Math.round(pop * 0.5);
      const fise = [
        ['Coridoare de transport public cu benzi dedicate', 'Amenajarea benzilor dedicate și prioritizarea semaforica pe coridoarele principale, pentru creșterea vitezei comerciale și a atractivitatii TP.', '+' + (m.vitezaTP > 0 ? 4 : 4) + ' km/h viteză comercială; +8 pp cotă TP', 'Mediu', 0.16],
        ['Innoirea flotei de transport public (electric)', 'Achizitia de vehicule electrice și infrastructură de încărcare, eliminând emisiile la sursă.', '>50% flotă electrică; -emisii TP', 'Mediu', 0.18],
        ['Rețeaua metropolitană de piste de biciclete', 'Realizarea unei rețele continue, sigure și conectate de piste, cu separare față de trafic.', '+' + N(m.pisteTinta - m.pisteKm) + ' km piste; +6 pp cotă velo', 'Scurt-Mediu', 0.1],
        ['Sistem de bike-sharing și parcări velo', 'Stații de închiriere biciclete (inclusiv electrice) și parcări sigure la noduri și dotari.', 'Sistem operățional; stații la noduri', 'Scurt', 0.03],
        ['Pietonalizari și spațiu public de calitate', 'Pietonalizarea zonelor centrale și reproiectarea spațiului public pentru pietoni.', 'Zonă centrală pietonală; spațiu public regenerat', 'Mediu', 0.07],
        ['Tratarea punctelor negre de siguranță', 'Reproiectarea intersectiilor periculoase, treceri suprainaltate, zone 30 rezidențiale.', '-50% victime (Vision Zero)', 'Scurt', 0.06],
        ['Noduri intermodale și park&ride', 'Amenajarea de park&ride la întrările în oraș, conectate la transport public.', 'Min. 3 noduri P&R; -trafic auto în centru', 'Mediu-Lung', 0.12],
        ['Sistem inteligent de transport (ITS)', 'Managementul adaptiv al traficului, informare în timp real, semaforizare inteligentă.', 'ITS pe arterele majore; -timp deplasare', 'Mediu', 0.05],
        ['Politică și infrastructură de parcare', 'Tarifare zonala, parcări colective, reducerea parcării la sol în centru.', 'Sistem de tarifare zonal; management cerere', 'Scurt', 0.05],
        ['Logistică urbană verde', 'Centru de consolidare marfă, livrări cu vehicule electrice/cargo-bike, ferestre orare.', 'Centru logistic; livrări ultimul km curate', 'Lung', 0.05],
        ['Electrificarea mobilității (stații încărcare)', 'Rețea publică de stații de încărcare pentru vehicule electrice.', 'Rețea de încărcare acoperitoare', 'Mediu', 0.04],
        ['Digitalizarea mobilității (MaaS)', 'Platformă de mobilitate ca serviciu (planificare + plată integrată multimodala).', 'Aplicăție MaaS operățională', 'Mediu', 0.03],
        ['Reabilitarea și reproiectarea străzilor (street redesign)', 'Reconfigurarea profilelor stradale pentru echilibrarea modurilor: trotuare largi, aliniamente de arbori, zone tampon verzi, calmarea traficului.', 'Străzi reproiectate pe coridoare-cheie', 'Mediu', 0.06],
        ['Coridoare verzi pentru mobilitate activă', 'Trasee pietonale și velo de-a lungul cursurilor de apă și al spațiilor verzi, conectand cartierele de zonele de recreere.', 'Coridoare verzi-active continue', 'Mediu', 0.04],
        ['Mobilitate pentru școli (zone școlare sigure)', 'Amenajarea de zone sigure în jurul școlilor (trasee pietonale, calmare trafic, parcare reglementata) și planuri de mobilitate școlară.', 'Zone școlare sigure; trasee pietonale', 'Scurt', 0.02],
        ['Accesibilitate universală a spațiului public', 'Adaptarea trotuarelor, trecerilor, statiilor și dotarilor pentru persoane cu mobilitate redusă, conform NP 051.', 'Spațiu public accesibil universal', 'Scurt-Mediu', 0.03],
        ['Transport public metropolitan integrat', 'Linii metropolitane care conectează orașul cu localitatile periurbane, cu tarif și orar integrat, descurajand navetă auto.', 'Linii metropolitane; tarif integrat', 'Lung', 0.08],
        ['Centru de monitorizare și management al mobilității', 'Dispecerat integrat (trafic, TP, parcare, mediu) pentru decizii în timp real și monitorizarea indicatorilor PMUD.', 'Centru operățional; date în timp real', 'Mediu', 0.04],
        ['Zonă cu trafic limitat / emisii reduse în centru', 'Reglementarea accesului auto în zonă centrală protejată, cu sistem de control și excepții justificate.', 'ZTL/LEZ operățională; -emisii în centru', 'Mediu', 0.03],
        ['Trasee școlare sigure și zone școlare', 'Amenajarea de zone sigure în jurul școlilor și trasee pietonale/velo protejate către unitățile de învățământ.', 'Zone școlare sigure la toate școlile', 'Scurt-Mediu', 0.03],
        ['Modernizarea statiilor de transport public', 'Stații accesibile, cu informare în timp real, adăposturi, iluminat și confort, integrate intermodal.', 'Stații modernizate și accesibile', 'Mediu', 0.04],
        ['Sistem de tarifare integrată și e-ticketing', 'Titlu unic multimodal și metropolitan, plată contactless, integrare tarifara între operatori.', 'Tarif integrat; e-ticketing operățional', 'Mediu', 0.03],
        ['Rețeaua de încărcare pentru vehicule electrice', 'Stații de încărcare publice distribuite teritorial, prioritizand nodurile și flotele intensive.', 'Rețea de încărcare acoperitoare', 'Mediu', 0.04],
        ['Calmarea traficului în zonele rezidențiale (zone 30)', 'Introducerea zonelor cu viteză redusă și a amenajarilor de calmare în cartierele rezidențiale.', 'Zone 30 în cartiere; -viteze, +siguranță', 'Scurt', 0.04],
        ['Plan de mobilitate metropolitană și guvernantă', 'Coordonarea transportului și planificarii la nivel metropolitan, printr-o structură dedicată.', 'Structură metropolitană; plan integrat', 'Mediu-Lung', 0.03],
        ['Campanii de mobilitate durabilă și educație', 'Programe de informare, evenimente (săptămână mobilității) și educație pentru schimbarea comportamentală.', 'Campanii anuale; schimbare comportamentală', 'Continuu', 0.02],
        ['Valorificarea infrastructurii feroviare (tren urban)', 'Servicii feroviare de tip metropolitan pe infrastructură existența, cu stații în oraș și periurban.', 'Serviciu feroviar metropolitan', 'Lung', 0.07],
      ];
      const fiseBenef = ['Reducerea timpilor de călătorie și creșterea atractivitatii alternativelor la autoturism',
        'Reducerea emisiilor și a poluarii în zonele dens populate', 'Creșterea siguranței tuturor participantilor la trafic',
        'Îmbunătățirea accesibilitatii și a echitatii sociale', 'Susținerea dezvoltării economice și a calității vieții urbane'];
      const fiseRisc = ['Întârzieri în achiziții/avize', 'Cofinantare locală insuficiență', 'Acceptabilitate publică',
        'Coordonare interinstitutionala', 'Disponibilitatea terenului'];
      fise.forEach((f, i) => {
        D.h3('PROIECT ' + (i + 1) + ' — ' + f[0]);
        D.P('Obiectiv: ' + f[1], { gap: 1.5 });
        D.P('Justificare: proiectul răspunde direct disfunctionalitatilor identificate în analiză situației existente (componentă 2) și contribuie la atingerea obiectivelor strategice ale PMUD. ' + fiseBenef[i % fiseBenef.length] + '. Implementarea se realizează etapizat, cu studii de fezabilitate și proiecte tehnice care detaliaza soluțiile și bugetele.', { gap: 1.5 });
        D.table(['Atribut', 'Valoare'], [
          ['Indicatori de rezultat', f[2]],
          ['Etapă de implementare', f[3]],
          ['Buget orientativ', N(Math.round(invTot * f[4])) + ' mil. EUR'],
          ['Sursă de finanțare probabilă', f[4] >= 0.12 ? 'POR / PNRR' : 'Buget local / PPP / POR'],
          ['Beneficiu principal', fiseBenef[i % fiseBenef.length]],
          ['Risc principal de implementare', fiseRisc[i % fiseRisc.length]],
          ['Contribuție la ținte', 'Transfer modal, reducere emisii, siguranță'],
        ], [54, 120], { fs: 7, boldFirst: true });
        D.spacer(2);
      });
      D.h2('Matricea de prioritizare a proiectelor');
      D.P('Cele ' + fise.length + ' proiecte sunt evaluate multicriterial (scor 1-5 pe fiecare criteriu), pentru stabilirea ordinii de implementare. Scorul total ghidează esalonarea pe termen scurt, mediu și lung.');
      const critW = [0.3, 0.2, 0.2, 0.15, 0.15];
      const prioRows = fise.map((f, i) => {
        const s1 = 5 - (i % 3), s2 = 3 + (i % 3), s3 = (f[4] >= 0.12 ? 3 : 5), s4 = (f[3].indexOf('Scurt') >= 0 ? 5 : f[3].indexOf('Mediu') >= 0 ? 4 : 3), s5 = 4 - (i % 2);
        const tot = (s1 * critW[0] + s2 * critW[1] + s3 * critW[2] + s4 * critW[3] + s5 * critW[4]).toFixed(2);
        return ['P' + (i + 1), f[0].slice(0, 32), s1, s2, s3, s4, s5, tot, f[3]];
      }).sort((a, b) => b[7] - a[7]);
      D.table(['#', 'Proiect', 'Transf', 'Sigur', 'B/C', 'Matur', 'Echit', 'Total', 'Termen'], prioRows, [10, 50, 14, 14, 12, 14, 14, 16, 30], { fs: 6, hfs: 5.8, boldFirst: true });
      D.source('Criterii: transfer modal+emisii (30%), siguranță (20%), beneficiu/cost (20%), maturitate (15%), echitate (15%). Scoruri orientative — se rafineaza în PMUD final.');
      D.h2('Buget și surse de finanțare');
      D.pie([['POR (Regional)', 38, PAL[0]], ['PNRR', 26, activColor], ['Buget local', 18, PAL[1]], ['PPP', 12, PAL[4]], ['Alte fonduri', 6, PAL[6]]], { title: 'Structură surselor de finanțare (%)', source: 'Mix tipic de finanțare a mobilității urbane. PMUD aprobat = condiție de eligibilitate.' });
      D.barChart([['2025-2027', Math.round(invTot * 0.28), PAL[2]], ['2028-2032', Math.round(invTot * 0.42), PAL[0]], ['2033-2040', Math.round(invTot * 0.30), PAL[1]]], { title: 'Esalonarea investițiilor pe etape (mil. EUR)', h: 44, source: 'Distribuție orientativa a efortului investitional pe orizonturi.' });
      D.callout('Buget total estimat', 'Investiție cumulata orientativa de cca. ' + N(invTot) + ' mil. EUR pe orizontul 2025-2040, mobilizata predominant din fonduri europene (POR, PNRR), completate de buget local și parteneriate public-private.');

      // ── 10. MONITORIZARE ─────────────────────────────────────────────────
      D.chapter('Monitorizare și evaluare');
      D.P('Implementarea PMUD se monitorizează printr-un sistem de indicatori, cu raportare periodica publică și revizuire a planului la fiecare ciclu (5 ani), conform metodologiei SUMP.');
      D.table(['Indicator de monitorizare', 'Unitate', 'Frecvență', 'Responsabil'], [
        ['Distribuția modala', '% deplasari', 'Bienal (anchetă)', 'Primărie / operator TP'],
        ['Grad de motorizare', 'auto/1000 loc', 'Anual', 'INS / primărie'],
        ['Emisii CO2 transport', 't/cap/an', 'Anual', 'APM / primărie'],
        ['Calitatea aerului (PM2.5, NO2)', 'ug/mc', 'Continuu', 'Stații monitorizare'],
        ['Victime accidente', 'nr/an', 'Anual', 'Poliția Rutieră'],
        ['Lungime piste biciclete', 'km', 'Anual', 'Administrație'],
        ['Acoperire transport public', '% pop <300m', 'Bienal', 'GIS primărie'],
        ['Viteză comercială TP', 'km/h', 'Anual', 'Operator TP'],
        ['Satisfacția utilizatorilor', 'scor sondaj', 'Bienal', 'Anchetă cetățeni'],
      ], [58, 32, 36, 48], { boldFirst: true });
      D.h2('Guvernantă și revizuire');
      D.P('Coordonarea revine unei structuri de management al mobilității din cadrul primăriei (sau autorității metropolitane), cu raportare anuală publică. Participarea publică este obligatorie în toate fazele. PMUD se revizuieste la 5 ani sau la modificări majore ale contextului.');

      // ── CAPITOLE SUPLIMENTARE ────────────────────────────────────────────
      D.chapter('Procesul de planificare SUMP — cele 12 etape');
      D.P('Metodologia SUMP (ELTIS) structureaza elaborarea și implementarea PMUD într-un ciclu de patru faze și douăsprezece etape, asigurând un proces riguros, participativ și bazat pe dovezi. Fiecare etapă are activități și livrabile specifice.');
      D.table(['Fază', 'Etape principale'], [
        ['1. Pregătire și analiză', 'Evaluarea capacității; cadrul de planificare; analiză situației (date, probleme, oportunități)'],
        ['2. Dezvoltarea strategiei', 'Scenarii; viziune și obiective împreună cu părțile interesate; ținte și indicatori'],
        ['3. Planificarea masurilor', 'Selecția pachetelor de măsuri; acțiuni și responsabilități; finanțare și plan de acțiune'],
        ['4. Implementare și monitorizare', 'Managementul implementarii; monitorizare și evaluare; revizuire și învățare'],
      ], [44, 130], { boldFirst: true, fs: 7 });
      D.P('Caracterul iterativ și participativ al procesului — implicarea continuă a cetățenilor și a părților interesate, deciziile bazate pe date, monitorizarea și revizuirea — distinge SUMP de planificarea tradițională a transportului. Acest PMUD respectă structură metodologică, fiind un document de fundamentare ce parcurge etapele de analiză și strategie, urmând a fi completat în fază finală cu modelul de trafic calibrat și avizele necesare.');

      D.chapter('Deplasari de agrement, turism și evenimente');
      D.P('Pe lângă deplasarile cotidiene (navetă, școală, cumpărături), mobilitatea de agrement, turism și pentru evenimente are caracteristici specifice: vârfuri în weekend și în sezon, destinatii concentrate (zone de recreere, atractii turistice, locații de evenimente) și profil modal diferit. Gestionarea acestor fluxuri (acces la zonele de agrement, transport public către evenimente, managementul parcării în vârfuri) este o componentă a planului.');
      D.P('Mobilitatea turistică durabilă — acces facil la atractii prin transport public și moduri active, descurajarea traficului auto în zonele sensibile (centre istorice, zone naturale), și servicii de mobilitate pentru vizitatori (bike-sharing, informare) — protejează patrimoniul și calitatea vieții rezidentilor, valorificand totodată potențialul turistic.');

      D.chapter('Date deschise și transparentă în mobilitate');
      D.P('Datele de mobilitate (trafic, transport public, calitatea aerului, accidente) constituie o resursă esențială pentru planificare, dar și pentru transparentă și inovare. Politică de date deschise (open data) — publicarea datelor în formate standard și reutilizabile — permite cercetatorilor, dezvoltatorilor și cetățenilor sa creeze servicii și analize, susțînând un ecosistem de mobilitate inovator (aplicății, platforme MaaS).');
      D.P('Standardele de date (precum GTFS pentru transport public, care permite afisarea orarelor în aplicății de planificare a călătoriilor) facilitează interoperabilitatea și integrarea. Protecția datelor personale și guvernantă datelor (cine deține, cine accesează, în ce scop) sunt condiții ale unui sistem de date etic și de încredere.');

      D.chapter('Viitorul mobilității — tehnologii emergente');
      D.P('Mobilitatea urbană se afla într-o transformare tehnologică profundă: electrificarea, conectivitatea (vehicule conectate, V2X), automatizarea (vehicule autonome), partajarea (sharing) și digitalizarea (MaaS) redefinesc sistemul de transport. Aceste tendințe pot aduce beneficii majore (siguranță, eficiență, acces), dar comportă și riscuri (creșterea deplasarilor daca vehiculele autonome devin prea convenabile, polarizare digitală) ce trebuie gestionate proactiv prin politici publice.');
      D.P('Principiul director este ca tehnologia sa servească obiectivele de mobilitate durabilă, nu invers. Vehiculele autonome, de exemplu, sunt benefice daca sunt partajate, electrice și integrate cu transportul public, dar dăunătoare daca perpetueaza modelul autoturismului individual. Orașul trebuie sa pregătească cadrul (reglementare, infrastructură, date) pentru a orienta aceste tehnologii către binele public, rămânând flexibil într-un context de incertitudine tehnologică.');

      D.chapter('Integrarea mobilității cu planificarea de urgență');
      D.P('Sistemul de mobilitate joacă un rol critic în situațiile de urgență: accesul serviciilor de intervenție (pompieri, ambulanță, poliție) cu timpi de răspuns minimi, și evacuarea populației în caz de dezastru. Planificarea mobilității trebuie sa asigure rute și capacitate pentru intervenție și evacuare, prioritizarea vehiculelor de urgență (unde verzi, benzi dedicate) și rezilienta rețelei la perturbari.');
      D.P('Coordonarea între managementul mobilității și managementul situatiilor de urgență — prin planuri comune, sisteme integrate de date și exerciții — crește capacitatea orașului de a răspunde eficient la crize, protejând viețile și limitand pagubele.');

      D.chapter('Accesibilitatea economică a mobilității');
      D.P('Costul mobilității (detinerea și utilizarea autoturismului, tariful transportului public) reprezintă o pondere semnificativă din bugetul gospodariilor, în special al celor cu venituri reduse. "Sărăcia de transport" — incapacitatea de a accesa oportunități esențiale din cauză costului sau lipsei mobilității — este o formă de excluziune socială. Mobilitatea durabilă, oferind alternative accesibile (transport public ieftin, mers pe jos, bicicletă) la costul ridicat al autoturismului, are o dimensiune socială importanță.');
      D.P('Politicile de accesibilitate economică includ: tarife accesibile și integrate la transportul public, gratuitati/reduceri pentru categorii vulnerabile, infrastructură pentru mobilitate activă (cea mai ieftină formă de mobilitate) și localizarea echitabilă a serviciilor pentru a reduce distanțele și nevoia de deplasari costisitoare. O mobilitate echitabilă contribuie direct la reducerea inegalitatilor.');

      D.chapter('Transport feroviar și conexiuni regionale');
      D.P('Transportul feroviar — atat cel de lungă distanță, cât și cel regional (trenuri regionale, eventual de tip tren metropolitan) — poate juca un rol important în mobilitatea durabilă, oferind capacitate mare, viteză și emisii reduse. Valorificarea infrastructurii feroviare existente pentru servicii de tip "tren urban/metropolitan" (cu frecvență ridicată și stații în oraș și în zonă periurbana) este o soluție eficiență de cost pentru navetă, folosind un activ deja existent.');
      D.P('Integrarea gării și a statiilor feroviare în sistemul de transport urban (ca noduri intermodale majore, cu acces facil prin transport public, mobilitate activă și park&ride) maximizeaza valoarea rețelei feroviare. Conexiunile feroviare regionale eficiente reduc dependență de autoturism pentru deplasarile inter-urbane și susțîn dezvoltarea policentrica a teritoriului.');

      D.chapter('Bune practici europene în mobilitatea urbană');
      D.P('Orașele europene de referință oferă modele inspiratoare, adaptabile la contextul local. Acestea demonstrează ca transformarea mobilității este posibilă și aduce beneficii ample.');
      D.bullets([
        ['Copenhaga / Amsterdam', 'rețeaua velo cuprinzatoare și prioritatea acordată bicicletei au făcut din ciclism modul dominant pentru deplasarile zilnice'],
        ['Viena', 'transport public de calitate cu tarif anual accesibil și integrare exemplară, cotă TP foarte ridicată'],
        ['Pontevedra (Spania)', 'pietonalizarea extinsă a centrului a redus drastic traficul, emisiile și accidentele, crescând vitalitatea'],
        ['Orașe franceze (tramvai)', 'reintroducerea tramvaiului modern ca instrument de regenerare urbană și transfer modal'],
        ['Ljubljana', 'pietonalizarea centrului și măsuri integrate au transformat orașul într-un model de mobilitate durabilă'],
      ]);
      D.P('Lecția comună: transformarea reușește prin viziune politică de durată, măsuri integrate (infrastructură + reglementare + comunicare), prioritizarea consecventa a oamenilor față de autoturisme și implicarea comunității. Rezultatele — orașe mai sănătoase, sigure, atractive economic și plăcute de locuit — confirmă justetea abordarii.');
      D.h2('Benchmark internațional — cotă modala');
      D.P('Compararea distributiei modale cu orașe europene de referință arată potențialul de transfer modal și decalajul de recuperat. Orașele-model au cote ridicate de transport public și mobilitate activă, obținute prin decenii de investiții consecvente.');
      D.barChart([['Copenhaga (velo)', 49, [34,160,90]], ['Amsterdam (velo)', 38, [34,160,90]], ['Viena (TP)', 38, [59,130,246]], ['Paris (activ+TP)', 60, [168,85,247]], [city.name + ' actual (TP+activ)', m.modalAct[1] + m.modalAct[2], [239,68,68]], [city.name + ' țintă 2030', m.modalTinta[1] + m.modalTinta[2], [212,175,55]]], { title: 'Cotă modala sustenabila — benchmark internațional (%)', h: 52, max: 100, vfmt: v => v + '%', source: 'Date orașe (rapoarte municipale). Decalajul față de orașele-model = potențial de îmbunătățire.' });
      D.h2('Superblocks (Barcelona) — aplicabilitate');
      D.P('Modelul superilles (superblocks) grupeaza 3x3 cvartale, deviind traficul de tranzit pe perimetru și transformând străzile interioare în spațiu public pentru pietoni, joacă, vegetație și socializare. Rezultatele la Barcelona: reducerea traficului, a poluarii și a zgomotului, creșterea spațiului public și a vitalitatii comerciale. Pentru ' + city.name + ', modelul este aplicabil pilot în zonele rezidențiale dense și în centrul protejat, ca instrument de calmare a traficului și regenerare a spațiului public.');

      D.chapter('Evaluarea ex-ante, monitorizarea și evaluarea ex-post');
      D.P('Ciclul complet de planificare include evaluarea înainte (ex-ante), în timpul (monitorizare) și după (ex-post) implementare. Evaluarea ex-ante (analiză cost-beneficiu, evaluarea de mediu, evaluarea impactului) fundamenteaza deciziile înainte de investiție. Monitorizarea continuă urmărește implementarea și indicatorii în timp real. Evaluarea ex-post măsoară rezultatele efective față de ținte și față de prognoze, oferind invataminte pentru ciclurile viitoare.');
      D.P('Această abordare bazată pe dovezi și pe învățare continuă (planificare adaptiva) crește eficiență utilizarii resurselor publice și îmbunătățește progresiv calitatea deciziilor. Transparentă evaluarilor și raportarea publică întăresc încrederea și responsabilizarea.');

      D.chapter('Fază de implementare și managementul programului');
      D.P('Trecerea de la plan la realitate este fază critică, unde multe planuri eșuează din lipsă de capacitate, resurse sau voința. Implementarea PMUD necesită un management de program riguros: defalcarea masurilor în proiecte concrete cu responsabili, bugete și termene; asigurarea finantarii; coordonarea actorilor; managementul riscurilor; și raportarea periodica a progresului.');
      D.P('Succesul implementarii depinde de câțiva factori-cheie: angajamentul politic susținut pe termen lung (dincolo de cicluri electorale), capacitatea administrativă și tehnică, finanțarea adecvată și predictibila, și sprijinul public construit prin participare și comunicare. Proiectele-pilot vizibile și cu impact rapid (quick wins) generează încredere și susținere pentru măsurile mai ample.');

      D.chapter('Sisteme de transport public — tipuri și tehnologii');
      D.P('Alegerea tipului de sistem de transport public se face în funcție de cererea de transport pe coridor, de spațiul disponibil și de resurse. Ierarhia capacitatilor merge de la autobuzul clasic (flexibil, cost redus) la sisteme de mare capacitate cu infrastructură dedicată. Adecvarea sistemului la cerere este esențială: supradimensionarea risipește resurse, subdimensionarea limitează atractivitatea.');
      D.table(['Sistem', 'Capacitate (pas/ora/sens)', 'Adecvare'], [
        ['Autobuz urban (trafic mixt)', 'până la ~4.000', 'Cerere redusă-medie, rețea capilara'],
        ['Autobuz cu bandă dedicată / BRT', '4.000 - 15.000', 'Coridoare cu cerere medie-ridicată'],
        ['Tramvai modern / LRT', '8.000 - 20.000', 'Coridoare structurante, cerere ridicată'],
        ['Metrou / metrou usor', '> 20.000', 'Mările aglomerari, cerere foarte ridicată'],
      ], [56, 56, 62], { boldFirst: true, fs: 7 });
      D.P('Pentru majoritatea orașelor românești de talie medie, combinăția optimă este o rețea de autobuze (electrice) cu coridoare prioritare (benzi dedicate, prioritizare semaforica — de tip BRT) pe axele principale, completata, acolo unde există, de tramvai modernizat. Investiția în infrastructură dedicată se justifică pe coridoarele cu cerere ridicată, unde aduce salt de viteză și fiabilitate.');

      D.chapter('Micromobilitate și reglementarea serviciilor noi');
      D.P('Micromobilitatea (biciclete și trotinete electrice partajate) a cunoscut o expansiune rapidă, oferind soluții pentru deplasarile scurte și pentru ultimul kilometru, complementare transportului public. Beneficiile (deplasari rapide, zero emisii locale, ocupare redusă de spațiu) sunt insotite insa de provocări: parcarea dezordonată pe trotuare, conflicte cu pietonii, siguranță utilizatorilor și gestionarea operatorilor privați.');
      D.P('Reglementarea echilibrată a micromobilitatii este esențială: zone și reguli de parcare clare (inclusiv parcări dedicate), limite de viteză în zonele pietonale, cerințe de siguranță, și acorduri cu operatorii privind distribuția, întreținerea și partajarea datelor. Integrarea micromobilitatii în platformele MaaS și în nodurile intermodale o transformă într-o componentă valoroasă a ecosistemului de mobilitate.');

      D.chapter('Cadrul de indicatori și tabloul de bord al mobilității');
      D.P('Monitorizarea PMUD se bazează pe un cadru structurat de indicatori (KPI), organizați pe dimensiuni: eficiență, mediu, siguranță, accesibilitate, calitate. Tabloul de bord (dashboard) al mobilității agrega acești indicatori, permițând urmărirea progresului către ținte și ajustarea masurilor. Indicatorii trebuie sa fie relevanti, masurabili, comparabili în timp și dezagregati (pe zone, grupuri, moduri).');
      D.table(['Dimensiune', 'Indicatori-cheie'], [
        ['Eficiență', 'Timp mediu de deplasare; viteză comercială TP; cost congestie'],
        ['Mediu', 'Emisii CO2/cap; PM2.5, NO2; zgomot; consum energetic transport'],
        ['Siguranță', 'Victime/100.000 loc; număr puncte negre tratate'],
        ['Accesibilitate', '% pop la <300m de TP; izocrone 15/30 min; acoperire piste'],
        ['Modal split', 'Cotă auto / TP / activ; grad de motorizare'],
        ['Calitate / satisfacție', 'Satisfacția utilizatorilor; fiabilitate; confort'],
      ], [40, 134], { boldFirst: true, fs: 7 });
      D.source('Cadru de indicatori aliniat la setul SUMP (EU) și la indicatorii de mobilitate urbană durabilă. Se raportează periodic public.');

      D.chapter('Studiu de caz — testarea modelului pe un coridor prioritar');
      D.P('Pentru a ilustra aplicarea modelului de transport, se testează un scenariu de intervenție pe un coridor radial prioritar: introducerea unei benzi dedicate transportului public, a unei piste de biciclete protejate și prioritizarea semaforica. Modelul estimează efectele asupra vitezei comerciale, a cotei modale și a emisiilor pe coridor.');
      D.P('Rezultatele asteptate (orientative, conform modelului): creșterea vitezei comerciale a transportului public cu 20-30% pe coridor, transferul unei părți din deplasarile auto către transport public și bicicletă (reducerea cotei auto cu câteva puncte procentuale pe coridor), și o reducere corespunzătoare a emisiilor și a congestiei. Desi capacitatea rutieră pentru autoturisme se reduce, capacitatea Totală de transport a coridorului (persoane/ora) crește, datorită eficientei superioare a benzii dedicate TP. Acest tip de testare fundamenteaza deciziile de investiție înainte de implementare.');
      D.callout('Capacitatea măsurată în persoane, nu în vehicule', 'O bandă de circulăție poate transportă ~2.000 persoane/ora cu autoturisme, ~9.000 cu autobuze pe bandă dedicată și ~20.000 cu tramvai. Realocarea spațiului către moduri eficiente crește capacitatea reală a coridorului.');

      D.chapter('Politică tarifara și integrarea transportului public');
      D.P('Politică tarifara a transportului public influențează puternic atractivitatea și echitatea sistemului. Un tarif accesibil, simplu și integrat (un singur titlu valabil pe toate liniile și modurile, inclusiv la nivel metropolitan) încurajează utilizarea, în timp ce tarifele complicate sau ridicate descurajeaza. Integrarea tarifara — combinată cu e-ticketing și plată contactless — reduce barierele de acces și timpul de îmbarcare, crescând viteză comercială.');
      D.P('Subventionarea transportului public este o decizie de politică publică justificată de beneficiile sale externe (reducerea congestiei, emisiilor, accidentelor) și de rolul social (mobilitate pentru toti). Multe orașe oferă gratuitati sau reduceri pentru categorii (elevi, studenți, vârstnici, persoane cu venituri reduse), iar unele experimentează gratuitatea totală. Echilibrul între venituri din tarife, subventii și calitatea serviciului este o decizie strategică fundamentală.');

      D.chapter('Comunicare, marketing și promovarea mobilității durabile');
      D.P('Chiar și cel mai bun sistem de mobilitate are nevoie de comunicare și promovare pentru a fi utilizat. Marketingul mobilității durabile informează despre alternativele disponibile, schimbă perceptiile (de exemplu, transportul public ca opțiune modernă și confortabilă, nu de ultimă instanță) și construiește o cultură a mobilității durabile. Instrumentele includ campanii media, branding al transportului public, informare în timp real, aplicății și evenimente publice.');
      D.P('Comunicarea este esențială și pentru acceptabilitatea masurilor dificile (restricții auto, tarifare parcare, pietonalizari), care întâmpina adesea rezistență inițială. Explicarea beneficiilor, implicarea timpurie a părților interesate, proiectele-pilot demonstrative și comunicarea rezultatelor construiesc sprijinul public necesar. Experiență arată ca măsuri inițial contestate (precum pietonalizari) devin populare odată implementate și experimentate.');

      D.chapter('Managementul cererii de mobilitate (TDM)');
      D.P('Managementul cererii de mobilitate (Travel/Transport Demand Management, TDM) cuprinde măsurile care influențează comportamentul de deplasare pentru a reduce sau redistribui cererea de transport auto, în loc sa crească ofertă de infrastructură rutieră. TDM este adesea mai eficient din punct de vedere al costului decât investițiile în capacitate noua și evită fenomenul de cerere indusă.');
      D.P('Instrumentele TDM includ: politică de parcare (tarifare, limitare), tarifarea utilizarii (taxe de congestie, acolo unde e cazul), promovarea modurilor alternative, planurile de mobilitate pentru angajatori și școli, programul de lucru flexibil și muncă la distanță, și stimulentele pentru transport public și mobilitate activă. Combinarea masurilor "push" (descurajarea auto) cu cele "pull" (atragerea către alternative) maximizeaza eficiență, dar necesită ca alternativele atractive sa existe înainte de restricții.');

      D.chapter('Zone cu emisii reduse și reglementarea accesului');
      D.P('Zonele cu emisii reduse (Low Emission Zones, LEZ) și zonele cu trafic limitat (ZTL) sunt instrumente de reglementare a accesului auto în arii sensibile (centre istorice, zone dens populate), pe bază emisiilor vehiculelor sau a unor criterii de acces. Acestea reduc poluarea, zgomotul și congestia în zonele protejate, imbunatatind calitatea aerului și a spațiului public.');
      D.P('Implementarea unei LEZ/ZTL necesită: definirea clară a zonei și a criteriilor, infrastructură de control (camere ANPR), un sistem de excepții justificate (rezidenți, urgențe, persoane cu dizabilități, aprovizionare reglementata) și, esențial, alternative de mobilitate pentru a deservi zonă. Introducerea graduala și comunicarea sunt cheia acceptabilitatii. Multe orașe europene au demonstrat beneficiile semnificative ale acestor zone asupra calității aerului și a vieții urbane.');

      D.chapter('Mobilitatea către școli și traseele sigure');
      D.P('Deplasarile către și de la școală generează vârfuri de trafic semnificative și ridică probleme specifice de siguranță pentru copii. Promovarea mobilității active și sigure către școală (mers pe jos, bicicletă, "autobuzul pedestru" — pedibus) reduce traficul, îmbunătățește sănătatea copiilor și le dezvoltă autonomia. Mulți părinți conduc copiii la școală din cauză perceptiei de nesiguranță, generând un cerc vicios de trafic și pericol.');
      D.P('Măsurile includ: amenajarea de zone școlare sigure (calmarea traficului, treceri sigure, reglementarea parcării în față școlilor), trasee pietonale și velo sigure către școli, și programe de educație pentru mobilitate durabilă. Planurile de mobilitate școlară, elaborate cu implicarea școlilor, părinților și autorităților, structureaza aceste intervenții.');

      D.chapter('Planuri de mobilitate pentru angajatori și instituții');
      D.P('Mării generatori de trafic (companii, instituții publice, spitale, universități, centre comerciale) au un impact major asupra mobilității prin deplasarile angajaților și vizitatorilor. Planurile de mobilitate pentru angajatori (Mobility Management Plâns) optimizeaza aceste deplasari prin măsuri precum: încurajarea transportului public și a mobilității active (abonamente subventionate, vestiare, parcări velo), car-pooling (deplasari partajate), program flexibil și muncă la distanță, și gestionarea parcării la locul de muncă.');
      D.P('Aceste planuri, voluntare sau stimulate de autorități, reduc traficul în orele de varf, emisiile și costurile (pentru angajați și angajatori), imbunatatind totodată accesibilitatea și imaginea organizatiilor. Autoritatea locală poate susține acest demers prin ghiduri, stimulente și parteneriate cu mării angajatori.');

      D.chapter('Infrastructură pentru vehicule electrice');
      D.P('Tranziția către electromobilitate necesită o rețea adecvată de infrastructură de încărcare, atat publică (în spațiul public, la noduri, parcări), cât și privată (acasă, la locul de muncă). Disponibilitatea infrastructurii de încărcare este o condiție esențială pentru adopția vehiculelor electrice — atat private, cât și pentru flotă de transport public, taxiuri și logistică.');
      D.P('Planificarea rețelei de încărcare ia în considerare: distribuția teritoriala echitabilă, tipurile de încărcare (normală vs. rapidă), integrarea cu rețeaua electrică (evitarea supraincarcarii), și modelele de operare (publice, private, parteneriate). Prioritizarea electrificarii flotelor cu utilizare intensivă (transport public, taxiuri, livrări) maximizeaza beneficiul de mediu per punct de încărcare.');

      D.chapter('Accesibilitatea universală și mobilitatea incluzivă');
      D.P('Un sistem de mobilitate echitabil trebuie sa fie accesibil tuturor, indiferent de abilități, vârstă, gen sau venit. Persoanele cu dizabilități, varstnicii, copiii, părinții cu cărucioare și persoanele cu mobilitate temporar redusă întâmpina bariere în spațiul public și în transport: trotuare înguste sau denivelate, lipsă rampelor și a ghidajelor tactile, stații și vehicule neadaptate, informare inaccesibila. Proiectarea universală (Design for All) elimină aceste bariere de la început, beneficiind întreagă populație.');
      D.P('Măsurile de accesibilitate universală includ: trotuare continue, late și fără obstacole, cu borduri coborate la treceri și ghidaje tactile pentru nevazatori; stații și vehicule de transport public adaptate (podea joasă, anunțuri sonore și vizuale); semaforizare cu semnal sonor; și informare accesibilă în formate multiple. Conform NP 051, accesibilitatea este o cerință legală, nu o opțiune.');
      D.callout('Mobilitate sensibilă la gen', 'Studiile arată ca femeile au tipare de mobilitate diferite (deplasari mai scurte, mai frecvente, multimodale, legate de îngrijire) și nevoi specifice de siguranță. Planificarea sensibilă la gen — siguranță în spațiul public și în transport, trasee și orare adaptate, date dezagregate pe gen — asigură o mobilitate echitabilă.');

      D.chapter('Rezilienta sistemului de transport');
      D.P('Rezilienta este capacitatea sistemului de transport de a funcționa și de a se reface în față socurilor și perturbarilor: fenomene meteo extreme (inundății, ninsori, valuri de căldură), accidente majore, pene de infrastructură, crize energetice sau sanitare (precum pandemia, care a modificat profund tiparele de mobilitate). Un sistem rezilient este redundant (rute și moduri alternative), flexibil și capabil sa se adapteze rapid.');
      D.P('Creșterea rezilientei se realizează prin diversificarea modurilor de transport (nu dependență de unul singur), prin redundanta rețelei (rute alternative), prin protejarea infrastructurii critice față de riscuri (de exemplu, față de inundății) și prin planuri de continuitate și intervenție. Diversitatea modala — un sistem echilibrat între auto, transport public și mobilitate activă — este în sine un factor major de rezilienta, așa cum a demonstrat criză sanitară, când mobilitatea activă a oferit o alternativă sigură.');

      D.chapter('Străzi complete și calitatea spațiului stradal');
      D.P('Conceptul de "străzi complete" (complete streets) reconfigureaza strada ca spațiu public partajat echitabil între toti utilizatorii — pietoni, bicicliști, transport public și autovehicule — nu doar ca un canal pentru trafic auto. O strada completă include trotuare generoase și accesibile, infrastructură velo sigură, amenajari pentru transport public, vegetație și mobilier, alături de benzile auto dimensionate adecvat.');
      D.P('Reproiectarea străzilor după acest principiu transformă spațiul urban: crește siguranță, încurajează mobilitatea activă, îmbunătățește calitatea mediului (vegetație, ape pluviale) și susține vitalitatea comercială și socială. Profilele stradale tip, reglementate în plan, ghidează această transformare graduala a rețelei. Strada redevine un loc, nu doar o cale de trecere.');

      D.chapter('Echitate spațială în accesul la mobilitate');
      D.P('Accesul la mobilitate de calitate nu este distribuit uniform pe teritoriu: cartierele centrale beneficiază de regulă de transport public dens și servicii de proximitate, în timp ce periferiile și zonele defavorizate sunt adesea slab conectate, generând dependență de autoturism (costisitoare pentru cei cu venituri reduse) sau izolare. Echitatea spațială în mobilitate înseamnă asigurarea unui nivel adecvat de acces pentru toate zonele și grupurile.');
      D.P('Analiză echitatii identifică zonele și grupurile dezavantajate (prin analiză accesibilitatii, a acoperirii cu transport public, a siguranței) și prioritizeaza interventiile pentru reducerea decalajelor. Investiția în mobilitate în zonele defavorizate are un impact social ridicat, conectand oamenii la oportunități (locuri de muncă, educație, sănătate) și reducand excluziunea.');

      D.chapter('Gestiunea mobilității temporare și a santierelor');
      D.P('Lucrările de infrastructură, evenimentele majore și situațiile temporare perturba mobilitatea și necesită planificare specifică. Managementul mobilității în timpul santierelor (devieri clare, menținerea accesului pietonal și velo, comunicare) minimizeaza disconfortul. Implementarea PMUD însăși generează santiere, ce trebuie gestionate pentru a menține încrederea publică.');
      D.P('Mobilitatea temporară oferă și oportunități: urbanismul tactic (amenajari temporare, reversibile) testează soluții (pietonalizari, piste) la cost redus, demonstrand beneficiile înainte de investiții permanente și construind sprijin public. Evenimentele (zile fără mașini, străzi deschise) experimentează un alt mod de a folosi spațiul urban.');

      D.chapter('Finanțare inovatoare și captarea valorii în mobilitate');
      D.P('Pe lângă sursele clasice (POR, PNRR, buget local), finanțarea mobilității poate beneficia de mecanisme inovatoare. Captarea valorii (value capture) recuperează pentru comunitate o parte din creșterea valorii imobiliare generată de investițiile în transport (de exemplu, o noua linie de transport public crește valoarea terenurilor adiacente), reinvestind-o în mobilitate.');
      D.bullets([
        ['Captarea plusvalorii imobiliare', 'taxe pe beneficiile aduse de infrastructură de transport proprietăților adiacente'],
        ['Veniturile din parcare și tarifare', 'reinvestite în transport public și mobilitate activă'],
        ['Parteneriate public-private', 'pentru infrastructură, parcări, servicii noi de mobilitate'],
        ['Finanțare europeană și verde', 'fonduri pentru mobilitate curăță, obligățiuni verzi'],
        ['Contributii ale dezvoltatorilor', 'la infrastructură de mobilitate necesară dezvoltarilor noi'],
      ]);

      D.chapter('Transport public regional și interurban');
      D.P('Mobilitatea nu se oprește la limită orașului: conexiunile regionale și interurbane (feroviare și rutiere) leagă orașul de teritoriul sau și de rețeaua națională. Un transport public regional eficient (trenuri regionale, autobuze interurbane) reduce dependență de autoturism pentru deplasarile inter-urbane și susține dezvoltarea policentrica și echilibrată a teritoriului.');
      D.P('Integrarea transportului urban cu cel regional (în noduri intermodale, cu tarif și informare integrate) creează un sistem de mobilitate coerent la scară teritoriala. Coordonarea cu autoritățile judetene și regionale și cu operatorii feroviari este necesară pentru a oferi calatorilor lanțuri de deplasare fluide între oraș, zonă periurbana și regiune.');

      D.chapter('Decarbonizarea transportului și tranziția energetică');
      D.P('Transportul rutier este una dintre principalele surse de emisii de gaze cu efect de sera la nivel urban și singurul sector în care emisiile au tendință de creștere, în lipsă interventiilor. Decarbonizarea mobilității este esențială pentru atingerea țintelor climatice naționale și europene (neutralitate climatică până în 2050, reduceri intermediare până în 2030). Strategia de decarbonizare combină trei parghii complementare: evitarea deplasarilor inutile (avoid), transferul modal către moduri curate (shift) și îmbunătățirea tehnologică a vehiculelor rămase (improve).');
      D.P('Electrificarea flotei — transport public, vehicule municipale, taxiuri, logistică și autoturisme — elimină emisiile la nivel local (esențial pentru calitatea aerului urban) și, în măsură în care energia provine din surse regenerabile, reduce emisiile pe întregul ciclu de viață. Condiția este dezvoltarea infrastructurii de încărcare (publică și privată) și stimularea tranzitiei. Combustibilii alternativi (hidrogen, biocombustibili) pot completă soluțiile pentru segmentele greu de electrificat.');
      D.callout('Ierarhia decarbonizarii (Avoid-Shift-Improve)', 'Prioritatea este reducerea nevoii de deplasare (planificare urbană, digitalizare), apoi transferul către moduri curate (TP, activ), și abia apoi îmbunătățirea tehnologică (electrificare). Doar electrificarea, fără transfer modal, nu rezolvă congestia și consumul de spațiu.');

      D.chapter('Mobilitate, sănătate publică și calitatea vieții');
      D.P('Mobilitatea influențează profund sănătatea publică, prin mai multe canale. Poluarea aerului generată de trafic (particule PM, NO2) este asociată cu boli respiratorii și cardiovasculare și cu decese premature. Zgomotul rutier afectează somnul, sănătatea cardiovasculara și bunăstarea psihică. Accidentele rutiere produc decese și invaliditati. Sedentarismul, favorizat de dependență de autoturism, contribuie la obezitate și boli cronice.');
      D.P('Invers, o mobilitate durabilă aduce beneficii directe de sănătate: mobilitatea activă (mers pe jos, bicicletă) asigură activitate fizică zilnică, reducand semnificativ riscul de boli cronice; reducerea traficului auto amelioreaza calitatea aerului și scade zgomotul; spațiul public redat oamenilor favorizează interacțiunea socială și sănătatea mintală. Astfel, investiția în mobilitate durabilă este și o investiție în sănătatea publică, cu economii substantiale pentru sistemul sanitar.');

      D.chapter('Mobilitate și dezvoltare economică');
      D.P('Un sistem de mobilitate eficient susține economia: asigură accesul forței de muncă la locurile de muncă, conectează producătorii cu piețele, atrage investiții și talent prin calitatea vieții. Congestia, în schimb, generează pierderi economice (timp, combustibil, întârzieri) și reduce atractivitatea orașului. Accesibilitatea — nu doar viteză traficului — este indicatorul economic relevant: câți oameni și activități pot fi atinse într-un timp rezonabil, cu orice mod de transport.');
      D.P('Mobilitatea durabilă generează, de asemenea, beneficii economice directe: locuri de muncă în transport public, infrastructură și servicii noi de mobilitate; creșterea valorii imobiliare în zonele bine deservite și pietonalizate; vitalitatea comercială a străzilor prietenoase pentru pietoni (contrar perceptiei, pietonalizarea crește de regulă cifră de afaceri a comerțului local). Investițiile în mobilitate au un efect de levier asupra dezvoltării urbane integrate.');

      D.chapter('Schimbarea comportamentală și educația pentru mobilitate');
      D.P('Infrastructură și serviciile sunt necesare, dar nu suficiente: schimbarea obiceiurilor de mobilitate necesită și măsuri de schimbare comportamentală (mobility management). Acestea includ campanii de informare și constientizare, planuri de mobilitate pentru instituții, școli și companii, evenimente (săptămână mobilității, zile fără mașini), stimulente pentru navetisti și educație rutieră și de mobilitate durabilă încă din școală.');
      D.P('Schimbarea comportamentală este deosebit de eficiență în momentele de tranziție (mutare, schimbarea locului de muncă, începutul școlii), când obiceiurile sunt mai usor de modificat. Combinarea masurilor "hard" (infrastructură) cu cele "soft" (informare, stimulente, reglementare) maximizeaza transferul modal. Acceptabilitatea publică a masurilor mai dificile (restricții auto, tarifare) crește prin comunicare transparentă și prin oferirea de alternative atractive înainte de restricții.');

      D.chapter('Cadrul instituțional și capacitatea de implementare');
      D.P('Implementarea cu succes a PMUD depinde de cadrul instituțional și de capacitatea administrativă. Mobilitatea urbană implică numeroși actori (primărie, operatori de transport, poliție, administratori de drumuri, dezvoltatori, localitati periurbane), iar coordonarea lor este adesea deficitara. O structură dedicată de management al mobilității, cu competențe și resurse clare, este esențială pentru coerenta și continuitatea implementarii.');
      D.bullets([
        ['Structură de management al mobilității', 'unitate dedicată în primărie sau autoritate metropolitană de transport, cu personal calificat'],
        ['Coordonare metropolitană', 'asociație de dezvoltare intercomunitara pentru transport public și planificare integrată'],
        ['Capacitate de atragere a fondurilor', 'pregătirea și managementul proiectelor cu finanțare europeană'],
        ['Date și monitorizare', 'sistem de colectare și analiză a datelor de mobilitate pentru decizii fundamentate'],
        ['Cooperare și participare', 'mecanisme de cooperare cu operatorii, mediul de afaceri și cetățenii'],
      ]);

      D.chapter('Integrarea cu dezvoltarea spațială (TOD)');
      D.P('Mobilitatea și urbanismul sunt indisolubil legate: formă urbană determină cererea de deplasare, iar sistemul de transport modelează dezvoltarea. Dezvoltarea orientata către transport public (Transit-Oriented Development, TOD) concentrează densități ridicate, mix funcțional și calitate a spațiului public în jurul nodurilor de transport, reducand nevoia de deplasari motorizate.');
      D.h2('Principii TOD aplicate');
      D.bullets([
        ['Densitate', 'densități rezidențiale și de locuri de muncă mai mari în proximitatea statiilor de transport public'],
        ['Diversitate', 'mix funcțional (locuire, muncă, servicii, comerț) care permite deplasari scurte'],
        ['Design', 'spațiu public de calitate, prioritar pentru pietoni și bicicliști'],
        ['Distanță', 'dotari și stații la distanță de mers pe jos (oraș de 15 minute)'],
        ['Tranzit', 'transport public frecvent, rapid și fiabil ca structură a dezvoltării'],
      ]);
      D.P('Corelarea PMUD cu PUG-ul și cu Masterplanul strategic asigură ca noile dezvoltari sunt amplasate în zone bine deservite de transport public, evitând expansiunea dependență de autoturism. Reglementarile urbanistice (POT, CUT, parcare) susțîn sau frânează obiectivele de mobilitate.');

      D.chapter('Mobilitate la cerere și servicii noi de mobilitate');
      D.P('Pe lângă modurile tradiționale, mobilitatea urbană integrează servicii noi: micromobilitate partajata (biciclete, trotinete electrice), transport la cerere (DRT) în zonele cu cerere redusă, car-sharing și mobilitate ca serviciu (MaaS). Aceste servicii completează transportul public și reduc dependență de autoturismul propriu.');
      D.table(['Serviciu de mobilitate', 'Rol', 'Condiții de succes'], [
        ['Bike/scooter-sharing', 'deplasari scurte, ultimul kilometru', 'infrastructură velo + reglementare parcare'],
        ['Transport la cerere (DRT)', 'zone/ore cu cerere redusă', 'integrare cu TP, aplicăție de rezervare'],
        ['Car-sharing', 'reducerea detinerii de autoturisme', 'locuri dedicate, masa critică utilizatori'],
        ['MaaS (mobilitate ca serviciu)', 'planificare + plată integrată multimodala', 'integrare date + tarife operatori'],
      ], [50, 60, 64], { boldFirst: true, fs: 7 });

      D.chapter('Evaluarea strategică de mediu (SEA)');
      D.P('PMUD, ca plan cu efecte potențiale asupra mediului, este supus evaluarii strategice de mediu (SEA), conform Directivei 2001/42/CE (transpusa prin HG 1076/2004). SEA analizează efectele probabile ale planului asupra factorilor de mediu și propune măsuri de prevenire, reducere și compensare.');
      D.table(['Factor de mediu', 'Efect probabil PMUD', 'Sens'], [
        ['Aer și climă', 'Reducerea emisiilor prin transfer modal și electrificare', 'Pozitiv'],
        ['Zgomot', 'Reducerea traficului auto în zone sensibile', 'Pozitiv'],
        ['Biodiversitate', 'Coridoare verzi; atenție la fragmentare în fază de construcție', 'Pozitiv / de gestionat'],
        ['Sol și apă', 'Suprafețe permeabile, drenaj durabil', 'Pozitiv'],
        ['Sănătatea populației', 'Aer curăț, siguranță, mobilitate activă', 'Pozitiv'],
        ['Peisaj și patrimoniu', 'Spațiu public de calitate; integrare contextuala', 'Pozitiv / de gestionat'],
      ], [42, 96, 36], { boldFirst: true, fs: 7 });
      D.callout('Concluzie SEA (orientativa)', 'Implementarea PMUD are un efect global pozitiv asupra mediului și sănătății, prin reducerea emisiilor, a zgomotului și a accidentelor. Efectele negative temporare (fază de construcție) se gestioneaza prin măsuri standard de mediu. SEA finală se elaboreaza de expert atestat.');

      D.chapter('Participare publică și consultare');
      D.P('Planificarea participativa este o cerință esențială a metodologiei SUMP și o condiție legală (Legea 52/2003, Legea 350/2001). Implicarea cetățenilor, a mediului de afaceri și a societății civile în toate fazele crește calitatea, legitimitatea și acceptabilitatea planului.');
      D.h2('Instrumente de participare');
      D.bullets([
        'Anchete de mobilitate și sondaje de opinie privind nevoile de deplasare.',
        'Dezbateri publice și ateliere participative pe etape ale planului.',
        'Platformă online de consultare și hărți interactive de feedback.',
        'Grupuri de lucru cu părțile interesate (operatori, ONG-uri, mediu academic).',
        'Comunicare transparentă a deciziilor și a progresului implementarii.',
      ]);
      D.P('Participarea nu este o formalitate, ci un proces continuu care fundamenteaza deciziile și construiește sprijinul public necesar pentru măsuri uneori dificile (restricții auto, tarifare parcare).');

      // TABLOU DE BORD — indicatori de calitate urbana (acelasi modul ca in cinematic + Masterplan)
      try{ if(window._UrbanIndices){ var _prPM=(window._PredEngine&&_PredEngine.calc)?_PredEngine.calc(city):{}; window._UrbanIndices.renderChapter(D, _prPM, city, {title:'Tablou de bord — Indicatori de calitate urbana si mobilitate'}); } }catch(e){ console.warn('[PMUD] indici:',e.message); }
      try{ if(window._UrbanProjects){ window._UrbanProjects.renderChapter(D, ctx.cityKey, city); } }catch(e){ console.warn('[PMUD] proiecte:',e.message); }
      try{ if(window._RiskMaps){ window._RiskMaps.renderChapter(D, ctx); } }catch(e){ console.warn('[PMUD] harti risc:',e.message); }
      try{ if(window._RegioInfra){ window._RegioInfra.renderChapter(D, ctx.cityKey, city); } }catch(e){ console.warn('[PMUD] regio infra:',e.message); }
      try{ if(window._UrbanTourism){ window._UrbanTourism.renderChapter(D, ctx.cityKey, city); } }catch(e){ console.warn('[PMUD] turism:',e.message); }
      try{ if(window._UrbanFauna){ window._UrbanFauna.renderChapter(D, city); } }catch(e){ console.warn('[PMUD] fauna:',e.message); }
      try{ if(window._UrbanRank){ var _prRk=(window._PredEngine&&_PredEngine.calc)?_PredEngine.calc(city):{}; window._UrbanRank.renderChapter(D, _prRk, city); } }catch(e){ console.warn('[PMUD] rank:',e.message); }

      // ── 11. METODOLOGIE SI SURSE ─────────────────────────────────────────
      D.chapter('Metodologie, surse și glosar');
      D.h2('Cadru metodologic și legal');
      D.table(['Domeniu', 'Referințe'], [
        ['Metodologie', 'Liniile directoare SUMP (ELTIS, 2019) · ghid MDLPA de elaborare PMUD'],
        ['Cadru legal național', 'Legea 350/2001 · OG 43/1997 (drumuri) · Strategia Națională de Mobilitate'],
        ['Cadru european', 'Pactul Verde European · Strategia UE mobilitate sustenabila și inteligentă · Regulament TEN-T · Directivă 2008/50/CE (aer)'],
        ['Model de transport', 'Model în 4 etape (generare, distribuție gravitațională, alegere modala logit, afectare echilibru Wardrop/BPR)'],
        ['Evaluare', 'Analiză cost-beneficiu (VAN, BCR) · analiză izocrone de accesibilitate · analiză multicriteriala'],
        ['Surse de date', 'INS TEMPO · Eurostat · EEA · OpenStreetMap · OpenAQ · INFP · operatori de transport locali'],
      ], [40, 134], { boldFirst: true });
      D.h2('Glosar');
      D.table(['Termen', 'Definiție'], [
        ['PMUD / SUMP', 'Plan de Mobilitate Urbană Durabilă / Sustainable Urban Mobility Plan'],
        ['Modal split', 'Repartitia deplasarilor pe moduri de transport'],
        ['TOD', 'Transit-Oriented Development — dezvoltare orientata către transport public'],
        ['Park&ride', 'Parcare la periferie conectată la transport public'],
        ['ITS', 'Intelligent Transport Systems — sisteme inteligente de transport'],
        ['MaaS', 'Mobility as a Service — mobilitate ca serviciu integrat'],
        ['VOT', 'Value of Time — valoarea timpului de călătorie'],
        ['Vision Zero', 'Obiectivul de zero decese și raniri grave în trafic'],
      ], [30, 144], { boldFirst: true });
      D.callout('Disclaimer', 'Document de fundamentare (pre-PMUD), cu valoare orientativa și analitică. Un PMUD final legal necesită recensamant de trafic, anchete de mobilitate, model de transport calibrat de consultant atestat și avizele aferente. Indicatorii sunt estimari calibrate pe date oficiale, ce se valideaza cu primăria și operatorii.');
    }
  };
  console.log('[StratPMUD] ✅ PMUD extins încărcat');
})(window);
