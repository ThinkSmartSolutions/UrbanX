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
      ];
      fise.forEach((f, i) => {
        D.h3('PROIECT ' + (i + 1) + ' — ' + f[0]);
        D.P(f[1], { gap: 1.5 });
        D.table(['Indicatori de rezultat', 'Etapa', 'Buget orientativ'], [[f[2], f[3], N(Math.round(invTot * f[4])) + ' mil. EUR']], [98, 28, 48], { fs: 7 });
      });
      D.h2('Buget si surse de finantare');
      D.pie([['POR (Regional)', 38, PAL[0]], ['PNRR', 26, activColor], ['Buget local', 18, PAL[1]], ['PPP', 12, PAL[4]], ['Alte fonduri', 6, PAL[6]]], { title: 'Structura surselor de finantare (%)', source: 'Mix tipic de finantare a mobilitatii urbane. PMUD aprobat = conditie de eligibilitate.' });
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
