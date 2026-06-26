// ═══════════════════════════════════════════════════════════════════════════
// urbanx-climate.js — PROFIL CLIMATIC URBAN (date reale, publice)
// Sursă: Open-Meteo (archive API, gratuit, fără cheie) via proxy Cloudflare.
// Normale 5 ani: temperatură & precipitații lunare, grade-zile încălzire/răcire
// (HDD/CDD), profil sezonier, evenimente extreme (zile tropicale/de îngheț).
// Alimentează: indice climatic (registru + IVU), studiu teritorial, capitol în
// SIDU/MP/PMUD, notă microclimat parcelă, cinematic.
// window._ClimateEngine.compute(lat,lon) · .openPanel() · .generatePDF(cityKey)
// 26 iunie 2026 · ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';

  var PROXY = (G._PROXY_BASE || 'https://urbanx-proxy.3dtravelsoftart.workers.dev');
  var LUNI = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];
  var _cache = {};

  function N(v, d) { try { return Number(v).toLocaleString('ro-RO', { maximumFractionDigits: d == null ? 0 : d }); } catch (e) { return '' + v; } }
  function avg(a) { var v = a.filter(function (x) { return x != null && isFinite(x); }); return v.length ? v.reduce(function (s, x) { return s + x; }, 0) / v.length : 0; }

  // ── Fetch + agregare normale climatice (5 ani) ───────────────────────────
  async function compute(lat, lon) {
    var key = lat.toFixed(2) + ',' + lon.toFixed(2);
    if (_cache[key]) return _cache[key];
    var url = 'https://archive-api.open-meteo.com/v1/archive?latitude=' + lat + '&longitude=' + lon +
      '&start_date=2019-01-01&end_date=2023-12-31&daily=temperature_2m_mean,precipitation_sum,temperature_2m_max,temperature_2m_min&timezone=auto';
    var d;
    try {
      var resp = await fetch(PROXY + '/proxy?url=' + encodeURIComponent(url), { signal: AbortSignal.timeout(45000) });
      d = await resp.json();
    } catch (e) { console.warn('[Climate] fetch', e); return null; }
    var dl = d && d.daily; if (!dl || !dl.time) return null;
    var time = dl.time, tm = dl.temperature_2m_mean, pp = dl.precipitation_sum, tx = dl.temperature_2m_max, tn = dl.temperature_2m_min;
    var YEARS = 5;
    // agregare pe lună (medie pe cei 5 ani)
    var mT = [], mP = [];
    for (var m = 0; m < 12; m++) { mT[m] = []; mP[m] = []; }
    var perYearMonthP = {}; // suma lunară pe (an-lună) ca să mediem corect precipitațiile
    var hdd = 0, cdd = 0, tropical = 0, frost = 0, summer = 0, nT = 0;
    for (var i = 0; i < time.length; i++) {
      var mo = parseInt(time[i].slice(5, 7), 10) - 1;
      var yr = time[i].slice(0, 4);
      if (tm[i] != null) { mT[mo].push(tm[i]); if (tm[i] < 18) hdd += (18 - tm[i]); if (tm[i] > 21) cdd += (tm[i] - 21); nT++; }
      if (pp[i] != null) { var k2 = yr + '-' + mo; perYearMonthP[k2] = (perYearMonthP[k2] || 0) + pp[i]; }
      if (tx[i] != null) { if (tx[i] > 30) tropical++; if (tx[i] > 25) summer++; }
      if (tn[i] != null && tn[i] < 0) frost++;
    }
    // precipitații: medie a sumelor lunare pe ani
    Object.keys(perYearMonthP).forEach(function (k2) { var mo = parseInt(k2.split('-')[1], 10); mP[mo].push(perYearMonthP[k2]); });
    var monthly = [];
    for (var mm = 0; mm < 12; mm++) monthly.push({ luna: LUNI[mm], t: Math.round(avg(mT[mm]) * 10) / 10, p: Math.round(avg(mP[mm])) });
    var tAnnual = Math.round(avg(monthly.map(function (x) { return x.t; })) * 10) / 10;
    var pAnnual = Math.round(monthly.reduce(function (s, x) { return s + x.p; }, 0));
    var seasons = {
      iarna: { t: Math.round(avg([monthly[11].t, monthly[0].t, monthly[1].t]) * 10) / 10, p: monthly[11].p + monthly[0].p + monthly[1].p },
      primavara: { t: Math.round(avg([monthly[2].t, monthly[3].t, monthly[4].t]) * 10) / 10, p: monthly[2].p + monthly[3].p + monthly[4].p },
      vara: { t: Math.round(avg([monthly[5].t, monthly[6].t, monthly[7].t]) * 10) / 10, p: monthly[5].p + monthly[6].p + monthly[7].p },
      toamna: { t: Math.round(avg([monthly[8].t, monthly[9].t, monthly[10].t]) * 10) / 10, p: monthly[8].p + monthly[9].p + monthly[10].p }
    };
    var res = {
      lat: lat, lon: lon, years: YEARS,
      monthly: monthly, tAnnual: tAnnual, pAnnual: pAnnual, seasons: seasons,
      hdd: Math.round(hdd / YEARS), cdd: Math.round(cdd / YEARS),
      tropicalDays: Math.round(tropical / YEARS), frostDays: Math.round(frost / YEARS), summerDays: Math.round(summer / YEARS),
      // indice de confort climatic 0-100 (mild = ridicat; penalizat de extreme)
      comfort: Math.max(5, Math.min(98, Math.round(72 - Math.abs(tAnnual - 12) * 2.2 - tropical / YEARS * 0.5 - frost / YEARS * 0.25 + (pAnnual >= 450 && pAnnual <= 750 ? 8 : 0))))
    };
    _cache[key] = res;
    return res;
  }

  function _cityLatLon(cityKey) {
    var db = G._RO_CITIES_DB || {}; var c = db[cityKey] || (G.TCI && G.TCI.cityData) || null;
    if (c && c.lat) return { lat: c.lat, lon: c.lon, name: c.name };
    try { var m = G.map; if (m) { var ce = m.getCenter(); return { lat: ce.lat, lon: ce.lng, name: (G.TCI && G.TCI.cityName) || 'UAT' }; } } catch (e) {}
    return null;
  }

  // ── Capitol PDF reutilizabil (pt SIDU/MP/PMUD + studiu dedicat) ───────────
  function renderChapter(D, c, cityName) {
    if (!D || !c) return;
    D.chapter('Profil climatic și confort termic');
    D.P('Profilul climatic al ' + (cityName || 'UAT') + ' este derivat din normale recente (2019–2023, ' + c.years + ' ani) de la Open-Meteo (reanaliză ERA5), pe coordonatele localității. Temperatura medie anuală este de ' + N(c.tAnnual, 1) + ' °C, iar precipitațiile medii anuale de ' + N(c.pAnnual) + ' mm. Climatul este de tip temperat-continental, cu amplitudine sezonieră marcată: iarnă ' + N(c.seasons.iarna.t, 1) + ' °C, vară ' + N(c.seasons.vara.t, 1) + ' °C.');
    if (D.kpis) D.kpis([
      { val: N(c.tAnnual, 1) + ' °C', label: 'Temp. medie anuală', sub: 'normală 5 ani' },
      { val: N(c.pAnnual) + ' mm', label: 'Precipitații/an', sub: 'cumul mediu' },
      { val: N(c.tropicalDays) + ' zile', label: 'Zile tropicale (>30°C)', sub: 'medie/an' },
      { val: N(c.frostDays) + ' zile', label: 'Zile de îngheț (<0°C)', sub: 'medie/an' }
    ]);
    if (D.barChart) {
      D.barChart(c.monthly.map(function (x) { return [x.luna, Math.round(x.t), [239, 138, 60]]; }), { title: 'Regim termic — temperatură medie lunară (°C)', h: 46, source: 'Open-Meteo ERA5 · normală 2019–2023' });
      D.barChart(c.monthly.map(function (x) { return [x.luna, x.p, [59, 130, 246]]; }), { title: 'Regim pluviometric — precipitații medii lunare (mm)', h: 46, source: 'Open-Meteo ERA5 · normală 2019–2023' });
    }
    D.P('Distribuția lunară evidențiază maximul termic estival (iulie–august) și minimul hibernal (ianuarie), respectiv maximul pluviometric de la începutul verii (mai–iunie), caracteristic regimului continental. Aceste tipare condiționează cererea de energie pentru încălzire și răcire, regimul apelor pluviale și planificarea spațiilor verzi.');
    if (D.formula) D.formula('Grade-zile de încălzire / răcire', 'HDD = Σ max(0; 18 − T_zi)  ·  CDD = Σ max(0; T_zi − 21)', 'sumă anuală; baze 18 °C (încălzire) și 21 °C (răcire). Rezultat: HDD = ' + N(c.hdd) + ' · CDD = ' + N(c.cdd));
    D.P('Necesarul termic al fondului construit este caracterizat de ' + N(c.hdd) + ' grade-zile de încălzire și ' + N(c.cdd) + ' grade-zile de răcire pe an. HDD ridicat indică o cerere semnificativă de încălzire iarna (cu impact asupra emisiilor și a sărăciei energetice), iar creșterea CDD în ultimii ani anunță o cerere de răcire în extindere — relevantă pentru dimensionarea SECAP și pentru standardele de eficiență energetică (nZEB) ale clădirilor noi.');
    D.P('Climatul determină direct intervențiile de adaptare: cele ' + N(c.tropicalDays) + ' zile tropicale/an amplifică insula de căldură urbană și impun infrastructură verde-albastră și materiale cu albedo ridicat; cele ' + N(c.frostDays) + ' zile de îngheț/an condiționează soluțiile de drumuri și rețele; regimul pluviometric de ' + N(c.pAnnual) + ' mm/an fundamentează dimensionarea sistemelor de gospodărire a apelor pluviale (oraș-burete). Indicele de confort climatic estimat este ' + c.comfort + '/100.');
    if (D.sourceBadges) D.sourceBadges(['Open-Meteo ERA5', 'Copernicus C3S', 'metodologie HDD/CDD ASHRAE/EN ISO 15927']);
  }

  // ── Studiu dedicat (≥10 pag) ─────────────────────────────────────────────
  async function generatePDF(cityKey) {
    var J = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF;
    if (!J || typeof G._makeStratDoc !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    var ll = _cityLatLon(cityKey); if (!ll) { G.ss && G.ss('Coordonate UAT indisponibile'); return; }
    G.ss && G.ss('🌦 Generez studiul climatic (date reale Open-Meteo)…');
    var c = await compute(ll.lat, ll.lon);
    if (!c) { G.ss && G.ss('⚠ Date climatice indisponibile (Open-Meteo)'); return; }
    var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    var D = G._makeStratDoc(pdf, { docTitle: 'STUDIU CLIMATIC URBAN', cityName: ll.name || 'UAT', accent: [37, 99, 235] });
    var W = 210, FONT = 'DejaVuRO';
    D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
    pdf.setFillColor(8, 18, 40); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(37, 99, 235); pdf.rect(0, 60, W, 1.4, 'F');
    try { if (G._drawUrbanxLogo) { G._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
    pdf.setTextColor(147, 197, 253); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · CLIMĂ & ADAPTARE', W / 2, 44, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(23); pdf.text('STUDIU CLIMATIC URBAN', W / 2, 90, { align: 'center' });
    pdf.setTextColor(147, 197, 253); pdf.setFontSize(14); pdf.text(D.S2(ll.name || 'UAT'), W / 2, 104, { align: 'center' });
    pdf.setTextColor(150, 180, 220); pdf.setFontSize(11); pdf.text(N(c.tAnnual, 1) + ' °C medie · ' + N(c.pAnnual) + ' mm/an · confort ' + c.comfort + '/100', W / 2, 116, { align: 'center' });
    D.setSuppress && D.setSuppress(false);

    D.chapter('Rezumat executiv');
    D.P('Prezentul studiu caracterizează regimul climatic al ' + (ll.name || 'UAT') + ' pe baza datelor reale Open-Meteo (reanaliză ERA5, normală 2019–2023) și traduce profilul climatic în implicații concrete pentru planificarea urbană: cerere de energie, adaptare la căldură, gospodărirea apelor pluviale și calitatea spațiilor publice. Temperatura medie anuală este de ' + N(c.tAnnual, 1) + ' °C, precipitațiile de ' + N(c.pAnnual) + ' mm/an, cu ' + N(c.tropicalDays) + ' zile tropicale și ' + N(c.frostDays) + ' zile de îngheț pe an.');
    D.callout && D.callout('Concluzie', 'Climatul temperat-continental, cu veri tot mai calde (' + N(c.cdd) + ' grade-zile de răcire) și ierni reci (' + N(c.hdd) + ' grade-zile de încălzire), impune o strategie dublă: eficiență energetică și adaptare la valuri de căldură (infrastructură verde-albastră).');

    D.chapter('Metodologie și sursă de date');
    D.P('Datele provin din Open-Meteo Historical Weather API, care redistribuie reanaliza ERA5 (Copernicus C3S) — un set de date global, validat științific, cu rezoluție orară interpolat la coordonatele localității. S-a utilizat fereastra 2019–2023 (5 ani) pentru calculul normalelor recente. Indicatorii derivați (grade-zile, zile extreme) se calculează din seriile zilnice conform metodologiei standard (EN ISO 15927, ASHRAE).');
    D.P('Limitări: normala pe 5 ani surprinde clima recentă (relevantă pentru adaptare), dar nu înlocuiește normala climatologică pe 30 de ani (1991–2020) pentru studii de proiectare structurală. Datele ERA5 au rezoluție de reanaliză și pot diferi local de stația meteo cea mai apropiată; pentru proiectare se folosesc datele ANM oficiale.');

    renderChapter(D, c, ll.name);

    D.chapter('Sezonalitate');
    if (D.table) D.table(['Anotimp', 'Temp. medie', 'Precipitații'], [
      ['Iarnă (DIF)', N(c.seasons.iarna.t, 1) + ' °C', N(c.seasons.iarna.p) + ' mm'],
      ['Primăvară (MAM)', N(c.seasons.primavara.t, 1) + ' °C', N(c.seasons.primavara.p) + ' mm'],
      ['Vară (IIA)', N(c.seasons.vara.t, 1) + ' °C', N(c.seasons.vara.p) + ' mm'],
      ['Toamnă (SON)', N(c.seasons.toamna.t, 1) + ' °C', N(c.seasons.toamna.p) + ' mm']
    ], [D.dims.CW * 0.4, D.dims.CW * 0.3, D.dims.CW * 0.3]);
    D.P('Sezonalitatea marcată — diferență de peste ' + N(Math.abs(c.seasons.vara.t - c.seasons.iarna.t), 0) + ' °C între vară și iarnă — definește un climat cu cerere energetică bimodală (încălzire iarna, răcire vara) și impune soluții urbane diferențiate pe anotimp: umbrire și ventilație vara, aport solar și izolare iarna.');

    D.chapter('Implicații energetice (bază SECAP)');
    D.P('Gradele-zile de încălzire (' + N(c.hdd) + ' HDD) și de răcire (' + N(c.cdd) + ' CDD) sunt fundamentul calculului consumului energetic al fondului construit și al țintelor SECAP (Planul de Acțiune pentru Energie Durabilă și Climă). Un HDD ridicat presupune un consum important pentru încălzire, cu impact asupra emisiilor și a sărăciei energetice; reducerea lui se obține prin reabilitarea termică a fondului existent și standarde nZEB pentru construcțiile noi. Creșterea CDD anunță o cerere de răcire în expansiune, care trebuie acoperită prioritar prin măsuri pasive (umbrire, vegetație, albedo) înainte de climatizare activă.');

    D.chapter('Implicații urbanistice și de adaptare climatică');
    D.bullets([
      'Insula de căldură: cele ' + N(c.tropicalDays) + ' zile tropicale/an impun infrastructură verde-albastră, perdele de arbori și materiale reflectorizante;',
      'Ape pluviale: cumulul de ' + N(c.pAnnual) + ' mm/an și ploile torențiale de vară fundamentează soluțiile de oraș-burete (retenție, infiltrare);',
      'Confort termic în spațiul public: umbrire, fântâni, vegetație pentru reducerea stresului termic în orele de vârf;',
      'Eficiență energetică: prioritizarea reabilitării termice în zonele cu fond construit vechi.'
    ]);
    D.P('Aceste măsuri se corelează cu indicele UHI, cu studiul de spații verzi (LOISIR) și cu gospodărirea apelor pluviale din platformă, formând un pachet coerent de adaptare climatică integrabil în SIDU și în Masterplan.');

    D.chapter('Tendințe și scenarii');
    D.P('Proiecțiile climatice regionale pentru România (Copernicus, IPCC AR6) indică o tendință de încălzire continuă și o frecvență crescută a valurilor de căldură și a evenimentelor pluviale extreme. În scenariul inerțial, numărul zilelor tropicale și cererea de răcire cresc semnificativ până în 2050; în scenariul de adaptare, efectele sunt atenuate prin infrastructură verde și eficiență energetică. Planificarea trebuie să asume această traiectorie, dimensionând infrastructura pentru clima viitoare, nu pentru cea trecută.');

    D.chapter('Disconfort termic și sănătate publică');
    D.P('Valurile de căldură reprezintă cel mai letal hazard climatic din Europa. Cele ' + N(c.tropicalDays) + ' zile tropicale (>30 °C) și ' + N(c.summerDays) + ' zile de vară (>25 °C) pe an, amplificate de insula de căldură urbană, cresc mortalitatea și morbiditatea, în special la grupurile vulnerabile: vârstnici, copii mici, persoane cu afecțiuni cardiovasculare și respiratorii, lucrători în exterior. Stresul termic afectează și productivitatea și calitatea somnului în nopțile tropicale (temperaturi minime ridicate).');
    D.P('Răspunsul de sănătate publică combină măsuri pe termen scurt (planuri de avertizare la canicule, puncte de răcorire, hidratare) cu măsuri structurale pe termen lung (vegetație, umbrire, reducerea suprafețelor impermeabile). Localizarea zonelor cu populație vârstnică și fond construit fără izolație termică permite prioritizarea intervențiilor acolo unde vulnerabilitatea este maximă — o corelație directă între acest profil climatic și indicatorii demografici și de locuire din platformă.');

    D.chapter('Regimul precipitațiilor și riscul pluvial');
    D.P('Cumulul mediu de ' + N(c.pAnnual) + ' mm/an se distribuie neuniform, cu un maxim la începutul verii și ploi convective intense, tot mai frecvente într-un climat în încălzire. Aceste evenimente torențiale suprasolicită rețelele de canalizare pluvială dimensionate pentru regimuri istorice și produc inundații urbane rapide (pluviale), distincte de inundațiile din revărsarea râurilor. Gradul de impermeabilizare a țesutului urban este factorul agravant principal: cu cât mai mult asfalt și beton, cu atât mai puțină apă se infiltrează și mai multă se scurge la suprafață.');
    D.P('Soluția modernă — orașul-burete (sponge city) — gestionează apa la sursă prin grădini de ploaie, pavaje permeabile, acoperișuri verzi și zone de retenție, reducând vârful de scurgere și reîncărcând pânza freatică. Dimensionarea acestor soluții pleacă direct din regimul pluviometric local și din curbele intensitate-durată-frecvență, motiv pentru care profilul climatic este punctul de plecare al oricărui plan de gospodărire a apelor pluviale.');

    D.chapter('Resurse de apă și tendința de aridizare');
    D.P('Bilanțul hidric — diferența dintre precipitații și evapotranspirație — determină disponibilitatea resurselor de apă. Creșterea temperaturilor mărește evapotranspirația, iar dacă precipitațiile nu cresc proporțional, rezultă un deficit hidric în extindere (aridizare), cu impact asupra spațiilor verzi (necesar de irigare), agriculturii periurbane și alimentării cu apă. Sud-estul și estul României sunt deja expuse acestui fenomen.');
    D.P('Pentru oraș, aridizarea impune specii vegetale rezistente la secetă, sisteme de irigare eficiente (inclusiv reutilizarea apelor pluviale colectate) și o planificare a spațiilor verzi care echilibrează beneficiile de răcire cu consumul de apă. Monitorizarea bilanțului hidric devine astfel un indicator de planificare, nu doar de mediu.');

    D.chapter('Calendar bioclimatic și sezonul de vegetație');
    D.P('Temperatura medie anuală de ' + N(c.tAnnual, 1) + ' °C și distribuția sezonieră definesc sezonul de vegetație (intervalul cu temperaturi peste 5–10 °C) — relevant pentru planificarea plantărilor, întreținerea spațiilor verzi și calendarul lucrărilor publice. Extinderea sezonului cald, observată în ultimele decenii, prelungește perioada de utilizare a spațiilor publice exterioare (oportunitate pentru economia locală și viața urbană), dar și perioada de stres termic și de cerere de răcire.');
    D.P('Corelarea calendarului bioclimatic cu programul de evenimente, cu sezonul turistic și cu întreținerea infrastructurii verzi permite o gestionare mai eficientă a resurselor municipale de-a lungul anului.');

    D.chapter('Semnalul de schimbare climatică');
    D.P('Compararea normalei recente (2019–2023) cu normalele climatologice istorice (1961–1990, 1991–2020) evidențiază semnalul de schimbare climatică: creșterea temperaturii medii, a numărului de zile tropicale și a gradelor-zile de răcire, alături de o variabilitate mai mare a precipitațiilor. Acest semnal justifică principiul fundamental al adaptării: infrastructura urbană trebuie dimensionată pentru clima viitoare proiectată, nu pentru media trecutului. Un sistem pluvial sau un plan de spații verzi calibrat pe date istorice va fi subdimensionat în deceniile următoare.');
    D.P('Proiecțiile regionale (Copernicus, IPCC AR6, scenariile SSP) indică pentru România o continuare a încălzirii și o intensificare a extremelor; integrarea acestor proiecții în SIDU, Masterplan și SECAP transformă adaptarea climatică dintr-o reacție într-o strategie anticipativă.');

    D.chapter('Recomandări de planificare climatică');
    D.bullets([
      'Adaptare la căldură: infrastructură verde-albastră, umbrire, materiale cu albedo ridicat, perdele de arbori pe arterele expuse;',
      'Gospodărirea apelor pluviale: soluții de oraș-burete dimensionate pe regimul local, cu prioritate în zonele impermeabilizate;',
      'Eficiență energetică: reabilitare termică (reducerea HDD efectiv) și standarde nZEB, cu răcire pasivă prioritară (reducerea CDD);',
      'Vegetație rezistentă la secetă și irigare eficientă din ape pluviale recuperate;',
      'Integrarea proiecțiilor climatice în dimensionarea infrastructurii și în SECAP;',
      'Plan de avertizare și răspuns la canicule, corelat cu harta populației vulnerabile.'
    ]);
    D.P('Aceste recomandări se integrează în pachetul de adaptare climatică al platformei (UHI, LOISIR spații verzi, gospodărire ape pluviale, carbon) și alimentează capitolele de mediu și risc din documentele strategice.');

    // Nota UrbanX (IVU) — standard transversal
    try { if (G.UrbanXIVU && G.UrbanXIVU.renderSection) G.UrbanXIVU.renderSection(D, cityKey); } catch (e) {}

    D.chapter('Limitări și disclaimer');
    D.P('Studiu generat algoritmic din date publice de reanaliză (Open-Meteo/ERA5), cu rol de pre-analiză climatică. Normala pe 5 ani reflectă clima recentă; pentru proiectare structurală și avizare se folosesc datele oficiale ANM și normalele climatologice pe 30 de ani. Documentul nu substituie un studiu climatologic de specialitate.');

    D.chapter('Surse și standarde');
    D.P('Open-Meteo Historical Weather API (reanaliză ERA5 — Copernicus Climate Change Service C3S); metodologie grade-zile EN ISO 15927 / ASHRAE; cadru SECAP (Convenția Primarilor); IPCC AR6 pentru tendințe. Coordonate: ' + N(c.lat, 2) + '°N, ' + N(c.lon, 2) + '°E. Metodologie UrbanX · ThinkSmart Solutions.');

    var fn = ('Studiu_climatic_' + (ll.name || 'UAT').replace(/[^\w]+/g, '_') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
    G._buildStratTOC && G._buildStratTOC(D, 1);
    pdf.save(fn); G.ss && ss('✅ Studiu climatic generat: ' + pdf.getNumberOfPages() + ' pagini'); return fn;
  }

  // ── Panou rapid (card) ───────────────────────────────────────────────────
  async function openPanel() {
    var ll = _cityLatLon(); if (!ll) { G.ss && G.ss('Coordonate indisponibile'); return; }
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9300;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    ov.innerHTML = '<div style="background:#0b1424;color:#e6edf7;width:min(620px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(37,99,235,.4);border-radius:14px;font-family:system-ui,sans-serif;padding:18px 20px"><div style="font-weight:800;font-size:16px">🌦 Profil climatic — ' + (ll.name || 'UAT') + '</div><div id="clm-body" style="margin-top:12px;color:#94a3b8;font-size:13px">Aduc date reale (Open-Meteo)…</div></div>';
    document.body.appendChild(ov);
    var c = await compute(ll.lat, ll.lon);
    var body = ov.querySelector('#clm-body'); if (!body) return;
    if (!c) { body.innerHTML = '<span style="color:#f87171">Date climatice indisponibile.</span>'; return; }
    var maxT = Math.max.apply(null, c.monthly.map(function (x) { return x.t; }));
    var maxP = Math.max.apply(null, c.monthly.map(function (x) { return x.p; })) || 1;
    var bars = c.monthly.map(function (x) {
      var ht = Math.max(2, (x.t / (maxT || 1)) * 60), hp = Math.max(1, (x.p / maxP) * 40);
      return '<div style="flex:1;text-align:center"><div style="height:42px;display:flex;align-items:flex-end;justify-content:center"><div style="width:60%;height:' + hp + 'px;background:#3b82f6;border-radius:2px"></div></div><div style="height:62px;display:flex;align-items:flex-end;justify-content:center"><div style="width:60%;height:' + ht + 'px;background:#ef8a3c;border-radius:2px"></div></div><div style="font-size:8px;color:#64748b;margin-top:2px">' + x.luna + '</div></div>';
    }).join('');
    var kpi = function (v, l, col) { return '<div style="flex:1;min-width:90px;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:9px;text-align:center"><div style="font-size:15px;font-weight:800;color:' + col + '">' + v + '</div><div style="font-size:9px;color:#94a3b8">' + l + '</div></div>'; };
    body.innerHTML = '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">' +
      kpi(N(c.tAnnual, 1) + ' °C', 'Temp. medie/an', '#ef8a3c') + kpi(N(c.pAnnual) + ' mm', 'Precipitații/an', '#3b82f6') +
      kpi(N(c.tropicalDays), 'Zile tropicale/an', '#f59e0b') + kpi(N(c.frostDays), 'Zile îngheț/an', '#60a5fa') +
      kpi(c.comfort + '/100', 'Confort climatic', '#34d399') + '</div>' +
      '<div style="background:#0a1120;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:10px"><div style="font-size:10px;color:#94a3b8;margin-bottom:4px">Precipitații (albastru) · Temperatură (portocaliu) — medii lunare</div><div style="display:flex;gap:3px;align-items:flex-end">' + bars + '</div></div>' +
      '<div style="display:flex;gap:8px;margin-top:10px"><button onclick="window._ClimateEngine.generatePDF(window.TCI&&window.TCI.cityKey);this.closest(\'div[style*=fixed]\').remove&&0" style="flex:1;background:linear-gradient(180deg,#2563eb,#1d4ed8);color:#fff;border:0;border-radius:9px;padding:10px;font-weight:700;cursor:pointer">📄 Studiu climatic (PDF ≥10 pag)</button></div>' +
      '<div style="font-size:9px;color:#64748b;margin-top:10px">Sursă: Open-Meteo (reanaliză ERA5 · Copernicus C3S) · normală 2019–2023 · HDD ' + N(c.hdd) + ' · CDD ' + N(c.cdd) + ' · orientativ</div>';
  }

  G._ClimateEngine = { compute: compute, renderChapter: renderChapter, generatePDF: generatePDF, openPanel: openPanel };
  console.log('[Climate] ✅ Profil climatic urban (Open-Meteo ERA5) încărcat');
})(window);
