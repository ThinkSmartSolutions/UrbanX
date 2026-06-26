/* ============================================================================
 * UrbanX — Registru / Audit de Indicatori Urbani (50+)
 * Document unic care enumeră TOȚI indicatorii monitorizați de platformă, grupați
 * pe domenii, fiecare cu definiție, formulă/metodă și sursă oficială. Demonstrează
 * acoperirea de 50+ indicatori (cerința #1). Asamblat din sursele REALE ale
 * platformei: urbanx-indices (compoziti), indices-report INDICI (modele spațiale),
 * cinema-live-sources (date live), infra POI, risc, imobiliar.
 * window.IndicatorsRegistry.generate(cityKey) → PDF ≥10 pag pe _makeStratDoc.
 * ========================================================================== */
(function (G) {
  'use strict';

  // Registru curat pe domenii. Fiecare: [nume, metodă/formulă scurtă, sursă].
  // Indicatorii dinamici se calculează per-UAT în modulele/rapoartele dedicate;
  // aici se documentează CE se monitorizează, CUM și DE UNDE (sursa).
  var DOMENII = [
    { d: 'A. Demografie și economie', src: 'INS TEMPO · Eurostat · _RO_CITIES_DB',
      note: 'Demografia și economia sunt fundamentul oricărei analize urbane: ele determină cererea de locuințe, servicii și infrastructură și condiționează sustenabilitatea financiară a orașului. Rata reală de creștere și proiecțiile semnalează dacă orașul este în expansiune sau contracție, iar nivelul veniturilor (raportat la media UE) măsoară puterea de cumpărare și atractivitatea pentru forța de muncă. Indicele de îmbătrânire anticipează presiunea viitoare pe serviciile medicale și sociale.', items: [
      ['Populație rezidentă', 'recensământ 2021 + actualizare INS', 'INS / Eurostat'],
      ['Rata reală de creștere 2011–2021', '(pop2021 − pop2011) / pop2011', 'INS RPL'],
      ['Proiecție populație 2030/2055', 'model logistic pe rata reală + coef. hub', 'metodologie UrbanX'],
      ['Salariu mediu net (% din media UE)', 'salariu_local / salariu_UE × 100', 'INS · Eurostat SES'],
      ['Grad de motorizare', 'autoturisme / 1000 locuitori', 'DRPCIV / INS'],
      ['Densitate populație', 'populație / suprafață intravilan [loc/ha]', 'INS + PUG'],
      ['Coeficient de hub regional', 'index atractivitate (universități, industrie, logistică)', 'model UrbanX'],
      ['Indice de îmbătrânire', 'pop. 65+ / pop. 0–14 × 100', 'INS structură pe vârste'],
    ]},
    { d: 'B. Indici compoziți de calitate urbană', src: 'urbanx-indices.js · ISO 37120/37122 · OECD · WHO',
      note: 'Indicii compoziți sintetizează mai multe dimensiuni într-un scor unic, ușor de comunicat și de comparat în timp — analog modului în care PIB-ul rezumă economia. Ei traduc complexitatea urbană în limbaj de decizie: City DNA descrie profilul orașului pe șase axe, Urban Health Index oferă un „semn vital" agregat, iar indicii tematici (Happiness, Stress, Silver, Child) surprind calitatea vieții resimțite de grupuri specifice. Fiind agregate, au caracter orientativ și se citesc împreună cu indicatorii de bază care îi compun.', items: [
      ['Amprenta Orașului (City DNA)', 'media(6 axe: capital uman, economie, accesibilitate, inovare, natură, reziliență)', 'ISO 37120 + Eurostat + INFP'],
      ['Urban Health Index', 'media(demografie, economie, mobilitate, mediu, locuire, reziliență)', 'OECD Better Life + ISO 37120'],
      ['Happiness Index', 'media(verde, mobilitate, venit, siguranță, sănătate, cultură)', 'World Happiness Report + OECD'],
      ['City Stress Index', '28 + autoturisme/12 + ag×55 + (declin?18:0)', 'EEA + INFP + INS'],
      ['Gravitația Oportunităților', '40 + coef_hub×40 + (universitate?12:0)', 'model gravitațional UrbanX'],
      ['Economia de Noapte', '40 + (univ?18:6) + %UE×0,2 + (oraș mare?12:4)', 'night-time economy (London/Berlin)'],
      ['Oraș Prietenos Seniori (Silver)', 'media(acces medical, transport adaptat, spații publice, locuire)', 'WHO Age-Friendly Cities'],
      ['Oraș pentru Copii', '45 + mp_verde/loc + acoperire_TP×0,2 [%]', 'UNICEF Child Friendly Cities'],
      ['Carbon Pathway', 'traiectorie CO2/cap 2025→2055 (decarbonare)', 'EEA + IPCC + EU Green Deal'],
    ]},
    { d: 'C. Modele spațiale de planificare (desenate pe hartă)', src: 'indices-report.js · urban-models',
      note: 'Spre deosebire de indicatorii sintetici, modelele spațiale se desenează direct pe hartă, pe rețeaua și geometria reală a orașului, transformând un principiu de planificare într-o evaluare concretă a teritoriului. Orașul-15-minute și Walk Score măsoară proximitatea funcțiunilor; TOD și coridorul mixt orientează densificarea spre transport; 3-30-300, SDG 11.7 și GVI cuantifică verdele și spațiul public; Space Syntax și mixul funcțional descriu configurația rețelei. Ele fundamentează propunerile din SIDU și PUZ cu argumente măsurabile.', items: [
      ['Orașul 15 minute', 'acoperire = min(95; 45 + servicii_lipsă×6) [%]', 'C. Moreno (Sorbonne, 2020)'],
      ['TOD — dezvoltare orientată pe transport', 'locuințe = arie_ha×densitate/2,3; transfer modal', 'P. Calthorpe'],
      ['Coridor urban mixt', 'front activ = lungime×2×%/100; locuri muncă', 'practică mixed-use'],
      ['Oraș-burete (Sponge City)', 'permeabil_nou = S×max(0; țintă−(100−imperm))/100', 'K. Yu / Turenscape (NbS)'],
      ['Regula 3-30-300', 'conformitate = criterii_îndeplinite/3×100 [%]', 'C. Konijnendijk · OMS/IUCN'],
      ['SDG 11.7 — spațiu public', 'share = spațiu_public/construit×100; mp/loc', 'UN-Habitat SDG 11.7.1'],
      ['Walk Score (pietonabilitate)', 'min(60; amenități×3,2) + decay distanță + intersecții', 'metodologie Walk Score'],
      ['Green View Index (verde perceput)', 'deficit = max(0; 25 − GVI) [pp]', 'literatura GVI street-level'],
      ['Space Syntax — integrare', 'integrare = f(conectivitate, intersecții/lungime) [0–1]', 'B. Hillier (UCL)'],
      ['Mix funcțional (entropie)', 'entropie = −Σ(p_i·ln p_i)/ln(n) × 100', 'Frank et al. (walkability)'],
    ]},
    { d: 'D. Mediu, climă și calitatea aerului', src: 'OpenAQ · EEA · IPCC · Copernicus · Directiva END',
      note: 'Domeniul de mediu măsoară presiunea orașului asupra climei (carbon) și presiunea climei asupra orașului (căldură, inundații pluviale), alături de factorii care afectează direct sănătatea — calitatea aerului și zgomotul. Acești indicatori sunt din ce în ce mai relevanți juridic și financiar: respectarea pragurilor OMS și a directivelor europene (calitatea aerului, zgomot) condiționează conformitatea, iar traiectoria de decarbonare este cerută de Pactul Verde și de finanțările europene. Multe valori provin din senzori live (OpenAQ) sau din teledetecție satelitară.', items: [
      ['CO2 pe locuitor', 't CO2 echiv. / locuitor / an', 'EEA + IPCC AR6'],
      ['Acoperire coronament (canopy)', '% suprafață cartier acoperită de coronament', 'OMS/IUCN · LST satelitar'],
      ['Insula de căldură urbană (LST/UHI)', 'ΔT oraș−rural; răcire = f(verde, albedo)', 'Landsat/Sentinel · IPCC AR6'],
      ['Expunere zgomot (Lden)', '38 + 10·log10(trafic) + 0,18·(v−30) − 12·log10(d/10) dB', 'Directiva 2002/49/CE · L121/2019'],
      ['PM2.5 (pulberi fine)', 'concentrație medie µg/m³ (senzori live)', 'OpenAQ · prag OMS 2021'],
      ['PM10', 'concentrație medie µg/m³', 'OpenAQ · Directiva 2008/50/CE'],
      ['NO2 (dioxid de azot)', 'concentrație medie µg/m³', 'OpenAQ · EEA'],
      ['Spațiu verde pe locuitor', 'mp spațiu verde public / locuitor', 'INS + OSM · țintă OMS 26 mp/loc'],
      ['Permeabilitate teritoriu', '% suprafață permeabilă (anti-inundație pluvială)', 'model Sponge City'],
    ]},
    { d: 'E. Mobilitate și trafic', src: 'CNAIR · GTFS · OpenSky · OSM Overpass',
      note: 'Mobilitatea determină accesibilitatea — condiția de bază a vieții urbane — și este, simultan, principala sursă de emisii și de zgomot. Indicatorii de aici măsoară atât oferta (acoperirea transportului public, rețeaua ciclabilă), cât și cererea și performanța (generare de deplasări, repartiție modală, nivel de serviciu la intersecții, necesar de parcare). Repartiția modală este pârghia-cheie: transferul dinspre auto spre transport public și mobilitate activă reduce simultan congestia, emisiile și consumul de spațiu, fiind obiectivul central al PMUD.', items: [
      ['Acoperire transport public', '% populație la ≤400 m de stație TP', 'GTFS + OSM'],
      ['Repartiție modală (modal split)', '% auto / TP / bicicletă / pietonal', 'model Flux (ITE adaptat RO)'],
      ['Generare deplasări (trip generation)', 'rate ITE pe funcțiune × suprafață/unități', 'ITE Trip Generation 10/11'],
      ['Nivel de serviciu intersecții (LOS)', 'raport volum/capacitate v/c → LOS A–F', 'STAS 10144 · HCM'],
      ['Trafic mediu zilnic (TMA)', 'vehicule/zi pe arterele principale', 'CNAIR (live)'],
      ['Trafic aerian (zboruri live)', 'nr. aeronave în zonă (stare live)', 'OpenSky Network'],
      ['Necesar parcare', 'normativ GD 525/1996 − reducere proximitate TP', 'GD 525/1996'],
      ['Lungime rețea ciclabilă', 'km piste din rețeaua OSM', 'OSM Overpass'],
    ]},
    { d: 'F. Infrastructură și dotări (POI live)', src: 'infra-map.js · OSM Overpass (via proxy)',
      note: 'Dotările publice (educație, sănătate, comerț, recreere, transport) sunt cele care fac un oraș locuibil; distribuția lor spațială determină echitatea accesului între cartiere. Acești indicatori se extrag live din OpenStreetMap, cu numărare și localizare reală pe hartă, și se interpretează prin raportare la populație și la timpul de acces (criteriul 15 minute). Concentrarea dotărilor în centru și deficitul la periferie este un semnal clasic de inechitate teritorială, pe care densificarea orientată și investițiile țintite îl pot corecta.', items: [
      ['Unități de învățământ (școli)', 'nr. + densitate la 1000 loc (OSM amenity=school)', 'OSM Overpass'],
      ['Unități sanitare (spitale/clinici)', 'nr. + acoperire spațială', 'OSM amenity=hospital'],
      ['Universități / învățământ superior', 'nr. instituții', 'OSM amenity=university'],
      ['Parcuri și spații verzi', 'nr. + suprafață (OSM leisure=park)', 'OSM Overpass'],
      ['Comerț alimentar (supermarket)', 'nr. + acoperire la 15 min', 'OSM shop=supermarket'],
      ['Noduri transport (stații/transit)', 'nr. stații TP / intermodalitate', 'OSM public_transport'],
    ]},
    { d: 'G. Risc și reziliență', src: 'INFP · ANAR · P100-1/2022',
      note: 'Reziliența la hazarduri condiționează siguranța vieții și continuitatea funcțiilor urbane. În România, riscul seismic este determinant — accelerația de proiectare (ag) din codul P100-1/2022 fundamentează cerințele structurale și prioritizarea consolidărilor. Hazardul la inundații și insulele de căldură completează profilul de risc, cu impact direct asupra populației vulnerabile. Acești indicatori orientează zonele de restricție din PUG, programele de reducere a riscului și măsurile de adaptare climatică, fiind tot mai importanți în autorizare și asigurare.', items: [
      ['Accelerație seismică de proiectare (ag)', 'valoare ag pe județ, P100-1/2022', 'INFP · cod P100-1/2022'],
      ['Hazard la inundații', 'zone inundabile + adâncime (model DEM + ANAR WMS)', 'ANAR · DEM Copernicus'],
      ['Reziliență compozită', '82 − ag×120 (axă din City DNA)', 'INFP + metodologie UrbanX'],
      ['Populație vulnerabilă la caniculă', 'pop. în zone UHI peste prag', 'LST + structură demografică'],
    ]},
    { d: 'H. Imobiliar și economie urbană', src: 'market-engine · value-map · ANCPI · IVS',
      note: 'Piața imobiliară este barometrul economic al orașului și, totodată, baza impozitării locale: valoarea terenului și a construcțiilor reflectă atractivitatea localizării și finanțează, prin impozite, serviciile publice. Indicatorii măsoară nivelul și dinamica prețurilor, randamentul investițional (yield), accesibilitatea locuirii și plusvaloarea generată de reglementarea urbanistică (LVC). Corelarea hărții de valoare cu zonarea PUG identifică terenurile subutilizate — oportunități de densificare cu dublu beneficiu: regenerare urbană și lărgirea bazei fiscale locale.', items: [
      ['Preț median €/mp', 'mediana prețului unitar pe segment/UAT', 'ANCPI (L7/1996) · agregat GDPR'],
      ['Variație preț 3 / 12 luni', 'Δ% = (Med_recent − Med_anterior)/Med_anterior', 'serie temporală tranzacții'],
      ['Randament locativ brut (yield)', '(chirie_lunară×12)/preț × 100', 'piață chirii · IVS'],
      ['Hartă valori (rentă urbană)', 'V(d) = V_baza × radial(d) × m_zonă', 'von Thünen/Alonso · UrbanX'],
      ['Indice accesibilitate locuire (PIR)', 'preț_locuință / venit_anual_gospodărie', 'Eurostat · INS'],
      ['Plusvaloare urbanistică (LVC)', 'Δvaloare din modificare CUT/POT', 'L350/2001 art.56 · model LVC'],
    ]},
  ];

  function _count() { return DOMENII.reduce(function (n, g) { return n + g.items.length; }, 0); }

  function generate(cityKey) {
    var J = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF;
    if (!J || typeof G._makeStratDoc !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    var city = (G._TCIMasterplanPDF && G._TCIMasterplanPDF._resolveCity) ? G._TCIMasterplanPDF._resolveCity(cityKey) : { name: (G.TCI && G.TCI.cityName) || 'UAT' };
    var uat = (city && city.name) || 'UAT';
    var total = _count();
    G.ss && G.ss('📋 Generez registrul de indicatori (' + total + ')...');
    try {
      var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      var D = G._makeStratDoc(pdf, { docTitle: 'REGISTRU DE INDICATORI URBANI', cityName: uat, accent: [124, 58, 237] });
      var W = 210, ML = D.dims.ML, CW = D.dims.CW, FONT = 'DejaVuRO';

      // ── COPERTĂ ──
      D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
      pdf.setFillColor(18, 12, 34); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(124, 58, 237); pdf.rect(0, 60, W, 1.4, 'F');
      try { if (G._drawUrbanxLogo) { G._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
      pdf.setTextColor(196, 181, 253); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · AUDIT DE INDICATORI', W / 2, 44, { align: 'center' });
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(22); pdf.text('REGISTRU DE INDICATORI URBANI', W / 2, 88, { align: 'center' });
      pdf.setTextColor(196, 181, 253); pdf.setFontSize(14); pdf.text(D.S2(total + ' indicatori monitorizați · ' + uat), W / 2, 102, { align: 'center' });
      pdf.setTextColor(170, 160, 200); pdf.setFontSize(11); pdf.text('8 domenii · definiție, metodă și sursă pentru fiecare indicator', W / 2, 114, { align: 'center' });
      D.setSuppress && D.setSuppress(false);

      D.chapter('1. Scopul registrului');
      D.P('Prezentul registru documentează ansamblul de ' + total + ' indicatori urbani pe care platforma UrbanX îi monitorizează și îi calculează pentru ' + uat + '. Rolul documentului este dublu: (1) AUDIT — demonstrează acoperirea completă, peste pragul de 50 de indicatori, pe toate domeniile relevante ale dezvoltării urbane; (2) TRANSPARENȚĂ METODOLOGICĂ — pentru fiecare indicator se prezintă definiția, formula/metoda de calcul și sursa oficială de date sau standardul de referință.');
      D.callout && D.callout('Acoperire', 'Platforma monitorizează ' + total + ' indicatori, organizați în 8 domenii. Indicatorii dinamici se calculează per-UAT în modulele și rapoartele dedicate (Flux, Market, Hartă valori, indici spațiali); registrul descrie ce se măsoară, cum și din ce sursă.');

      D.chapter('2. Cadrul de referință și standardele');
      D.P('Sistemul de indicatori este aliniat cadrelor internaționale și naționale recunoscute: ISO 37120/37122 (indicatori pentru orașe sustenabile și inteligente), obiectivele de dezvoltare durabilă ale ONU (SDG 11 — orașe durabile, UN-Habitat), Agenda Urbană a UE și Pactul Verde European (EEA, Green Deal), recomandările OMS (spații verzi, calitatea aerului, orașe prietenoase cu vârstnicii) și OECD Better Life. La nivel național, indicatorii respectă cadrul INS TEMPO, codul seismic P100-1/2022 (INFP), normativele de trafic (STAS 10144, GD 525/1996) și legislația urbanistică (Legea 350/2001).');
      D.P('Această aliniere asigură comparabilitatea cu alte orașe și credibilitatea în fața autorităților și a finanțatorilor. Fiecare indicator indică explicit standardul sau sursa pe care se sprijină, evitând valorile „de autor" nefundamentate.');

      D.chapter('3. Principii metodologice');
      D.bullets([
        'Transparență: fiecare indicator are formulă/metodă publică și sursă declarată;',
        'Trasabilitate: datele provin din surse oficiale (INS, Eurostat, OSM, ANCPI, INFP, OpenAQ) sau modele documentate;',
        'Onestitate privind incertitudinea: indicatorii orientativi/proxy sunt marcați ca atare;',
        'Comparabilitate temporală și inter-UAT: aceeași metodă aplicată consecvent;',
        'Date live unde e posibil: aer, trafic, POI și zboruri se interoghează în timp real (via proxy).'
      ]);
      D.P('Indicatorii se împart în trei categorii după sursă: (a) MĂSURAȚI direct din date oficiale sau senzori (populație, calitatea aerului, POI); (b) DERIVAȚI prin formule din mărimi măsurate (densitate, modal split, yield); (c) COMPOZIȚI — scoruri agregate din mai mulți factori (City DNA, Urban Health Index). Categoria este vizibilă din formula fiecărui indicator.');

      // ── Capitole pe domenii (tabel per domeniu) ──
      var chapN = 4;
      DOMENII.forEach(function (g) {
        D.chapter(chapN + '. ' + g.d + '  (' + g.items.length + ')');
        D.P('Domeniul cuprinde ' + g.items.length + ' indicatori. Sursă principală: ' + g.src + '.');
        if (D.table) {
          D.table(['Indicator', 'Metodă / formulă', 'Sursă'], g.items.map(function (it) { return [it[0], it[1], it[2]]; }), [CW * 0.30, CW * 0.45, CW * 0.25]);
        }
        if (g.note) D.P(g.note);
        chapN++;
      });

      // ── Citire integrată ──
      D.chapter(chapN + '. Interdependența indicatorilor și citirea integrată'); chapN++;
      D.P('Indicatorii nu trebuie citiți izolat: puterea diagnostică reală apare din citirea lor încrucișată, întrucât domeniile se condiționează reciproc. Un preț imobiliar în creștere accelerată (domeniul H) corelat cu o accesibilitate a locuirii în deteriorare (PIR ridicat) și cu venituri stagnante (domeniul A) semnalează o piață care se îndepărtează de fundamentul ei — un risc pe care niciun indicator singur nu îl arată. Tot astfel, un grad ridicat de motorizare (A) coroborat cu o acoperire slabă a transportului public (E) și cu o calitate a aerului degradată (D) conturează un cerc vicios auto-dependență → poluare, a cărui rupere ține de politica de mobilitate.');
      D.P('Exemple de citiri integrate utile în decizie: (1) verde redus (D) + insulă de căldură intensă (D) + populație vârstnică (A) = vulnerabilitate ridicată la caniculă, prioritate pentru infrastructură verde; (2) dotări concentrate central (F) + Walk Score periferic scăzut (C) = inechitate teritorială, prioritate pentru descentralizarea serviciilor; (3) CUT subutilizat semicentral (H) + acces bun la transport (E) = oportunitate de densificare orientată pe transit (TOD). Această logică de citire transversală este ceea ce transformă un set de indicatori într-un instrument de diagnoză urbană.');
      D.callout && D.callout('Principiu', 'Valoarea unui sistem de indicatori nu stă în numărul lor, ci în capacitatea de a fi citiți împreună. Cele 8 domenii sunt proiectate să se completeze, oferind o imagine integrată a orașului.');

      // ── Sinteză + grafic distribuție pe domenii ──
      D.chapter(chapN + '. Sinteza acoperirii pe domenii'); chapN++;
      if (D.barChart) {
        D.barChart(DOMENII.map(function (g, i) {
          var pal = [[124, 58, 237], [34, 197, 94], [59, 130, 246], [16, 185, 129], [245, 158, 11], [236, 72, 153], [239, 68, 68], [168, 85, 247]];
          return [g.d.split('.')[0], g.items.length, pal[i % pal.length]];
        }), { title: 'Număr de indicatori pe domeniu (total ' + total + ')', h: 50, source: 'Registru UrbanX' });
      }
      D.P('Distribuția pe domenii reflectă o acoperire echilibrată: dimensiunile demografică-economică, de calitate a vieții, spațială, de mediu, de mobilitate, de infrastructură, de risc și imobiliară sunt toate reprezentate. Această amploare permite o evaluare integrată a orașului — de la sănătatea economică la reziliența climatică și accesibilitatea locuirii — și susține documentele strategice (SIDU, Masterplan, PMUD) cu o bază cantitativă coerentă.');

      D.chapter(chapN + '. Utilizarea indicatorilor în deciziile urbane'); chapN++;
      D.P('Indicatorii nu sunt un scop în sine, ci un instrument de decizie. Ei alimentează: (1) diagnoza din SIDU și din studiile de fundamentare; (2) calibrarea modelelor spațiale (Orașul-15-minute, TOD, Walk Score) desenate pe hartă; (3) rapoartele tematice (trafic — Flux, piață — Market, valori — Hartă valori, carbon, fezabilitate); (4) monitorizarea post-implementare, prin comparație în timp. Pragurile și țintele asociate (ex. 26 mp verde/loc OMS, 30% canopy, LOS ≤ D) transformă indicatorii în criterii operaționale de evaluare a proiectelor.');
      D.P('Pentru administrația locală, registrul oferă un tablou de bord care poate fundamenta bugetarea pe priorități și raportarea către cetățeni și finanțatori. Pentru investitori și dezvoltatori, el clarifică contextul cantitativ al unui amplasament. Pentru proiectanți, oferă reperele și sursele pentru studiile de specialitate.');

      D.chapter(chapN + '. Frecvența de actualizare și guvernanța datelor'); chapN++;
      D.P('Indicatorii au ritmuri de actualizare diferite, în funcție de sursă. Datele live — calitatea aerului (OpenAQ), traficul (CNAIR), punctele de interes (OSM) și traficul aerian (OpenSky) — se interoghează în timp real la fiecare analiză, prin proxy-ul platformei, reflectând starea curentă. Datele statistice oficiale (populație, salarii, structură demografică) se actualizează la ciclul publicării sursei (anual sau la recensământ). Indicatorii derivați și compoziți se recalculează automat ori de câte ori se modifică o mărime de intrare.');
      D.bullets([
        'Live (la cerere): aer (OpenAQ), trafic (CNAIR), POI (OSM), zboruri (OpenSky);',
        'Periodic oficial: populație și demografie (INS/recensământ), salarii (INS/Eurostat);',
        'Derivat (la recalcul): densitate, modal split, yield, scoruri spațiale;',
        'Satelitar/model: canopy, LST/UHI, hazard inundații (Copernicus, DEM, ANAR).'
      ]);
      D.P('Guvernanța datelor respectă două principii: trasabilitatea (fiecare valoare poate fi urmărită până la sursa ei) și protecția datelor personale (indicatorii imobiliari și demografici se publică agregat, fără identificarea persoanelor, conform GDPR / Legii 190/2018). Acolo unde o sursă deschisă are acoperire teritorială incompletă (frecvent în orașele mici pentru OpenAQ sau OSM), indicatorul respectiv este marcat ca orientativ, evitând concluziile false bazate pe date lacunare.');

      D.chapter(chapN + '. Praguri, ținte și benchmarking'); chapN++;
      D.P('Valoarea unui indicator devine operațională doar prin raportare la un prag sau o țintă. Registrul asociază, acolo unde există, repere recunoscute: 26 mp spațiu verde/locuitor (OMS) pentru spațiile verzi; minimum 30% acoperire cu coronament (regula 3-30-300); nivel de serviciu LOS ≤ D la intersecții (STAS 10144 / HCM); praguri de calitate a aerului OMS 2021 (PM2.5, PM10, NO2); acces la spațiu public la ≤400 m (SDG 11.7); acoperire transport public la ≤400 m. Aceste praguri transformă indicatorii din simple măsurători în criterii de conformitate și de prioritizare a investițiilor.');
      D.P('Benchmarkingul — compararea cu alte UAT-uri și cu orașe-pereche europene — adaugă perspectivă: un indicator „bun" în absolut poate fi sub media regională, semnalând un decalaj de recuperat; invers, o valoare modestă în context de resurse limitate poate reprezenta o performanță relativă remarcabilă. Platforma permite comparația inter-UAT pe același indicator (vezi modulul de comparare și rapoartele tematice), iar alinierea la ISO 37120 asigură comparabilitatea metodologică la nivel internațional.');
      D.callout && D.callout('Țintă vs. valoare', 'Monitorizarea fără țintă este descriptivă; monitorizarea cu prag/țintă devine instrument de management. Registrul leagă, unde există, fiecare domeniu de reperele OMS, ONU (SDG), UE și naționale aplicabile.');

      D.chapter(chapN + '. Limitări și disclaimer'); chapN++;
      D.P('Registrul documentează metodologia și sursele; valorile per-UAT se calculează în modulele dedicate și au, după caz, caracter orientativ (în special indicatorii compoziți și proxy, marcați ca atare). Datele live (aer, trafic, POI) depind de disponibilitatea și acoperirea surselor deschise (OpenAQ, OSM), care variază teritorial. Indicatorii nu substituie studiile de specialitate avizate de proiectanți atestați; au rol de pre-analiză și de tablou de bord pentru decizie. Validarea oficială revine documentațiilor de urbanism și studiilor de fundamentare elaborate conform Legii 350/2001.');

      D.chapter(chapN + '. Surse și standarde');
      D.P('ISO 37120/37122 · UN-Habitat SDG 11 · EEA / EU Green Deal · OECD Better Life · OMS (aer, verde, age-friendly) · INS TEMPO · Eurostat · ANCPI (L7/1996) · INFP / P100-1/2022 · ANAR · Copernicus / Landsat-Sentinel · OpenAQ · OpenSky · OSM Overpass · CNAIR · ITE Trip Generation · STAS 10144 · GD 525/1996 · Legea 350/2001. Metodologie UrbanX · ThinkSmart Solutions.');

      var fn = ('Registru_indicatori_' + uat.replace(/[^\w]+/g, '_') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
      G._buildStratTOC && G._buildStratTOC(D, 1);
      pdf.save(fn);
      G.ss && G.ss('✅ Registru de indicatori generat: ' + total + ' indicatori · ' + pdf.getNumberOfPages() + ' pagini');
      return fn;
    } catch (e) { console.error('[IndicatorsRegistry]', e); G.ss && G.ss('Eroare registru: ' + e.message); }
  }

  G.IndicatorsRegistry = { generate: generate, count: _count, DOMENII: DOMENII };
  console.log('[IndicatorsRegistry] ✅ registru indicatori (' + _count() + ') încărcat (window.IndicatorsRegistry.generate)');
})(window);
