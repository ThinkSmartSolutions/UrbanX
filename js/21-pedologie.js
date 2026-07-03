/* ============================================================================
 * UrbanX — STUDIU PEDOLOGIC & AGROCHIMIC (js/21-pedologie.js)
 * Studiu de sol pentru scoaterea terenului din circuitul agricol — Ord. MADR
 * 83/2018 + Legea 18/1991 + SRTS 2012 + metodologie bonitare ICPA.
 *
 * Familia: STUDIU DE SIT (rang parcelă). Meniu Rapoarte, gated pe parcelă.
 * PDF profund (≥40 pag) pe _initStudyPdf + date LIVE (relief din _getElevGrid,
 * folosință din OSM landuse prin proxy). Complementar Geotehnicului (sol
 * agricol ≠ sol de fundare — regula #8, teritoriu≠parcelă). Leagă la _getElevGrid,
 * IVU (dimensiunea Mediu) și profile-deep-silvic (pădure).
 *
 * window: generatePedologie · calculeazaTaxaScoatere · _PEDOLOGIE_REGISTRY
 * ========================================================================== */
(function (G) {
  'use strict';
  var PROXY = G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
  var VERSION = '2025.07';

  // ── Normative (oglindă data/pedologie-normative.json) ─────────────────────
  var CLASE = {
    1: { rom: 'I', nota: '81–100', desc: 'Fertilitate foarte ridicată, fără limitări', restr: 'Restricții severe la scoatere (aprobare nivel superior MADR)', col: [16, 122, 40] },
    2: { rom: 'II', nota: '61–80', desc: 'Fertilitate ridicată, limitări reduse', restr: 'Restricții, aprobare condiționată', col: [34, 160, 60] },
    3: { rom: 'III', nota: '41–60', desc: 'Fertilitate mijlocie, limitări moderate', restr: 'Scoatere posibilă cu taxă și documentație', col: [202, 160, 30] },
    4: { rom: 'IV', nota: '21–40', desc: 'Fertilitate scăzută, limitări severe', restr: 'Scoatere facilă, taxă redusă', col: [210, 120, 40] },
    5: { rom: 'V', nota: '1–20', desc: 'Fertilitate foarte scăzută / teren neproductiv', restr: 'Scoatere facilă, taxă minimă', col: [185, 60, 40] }
  };
  var TAXA = {
    arabil: { 1: 1.65, 2: 1.32, 3: 0.99, 4: 0.66, 5: 0.33 },
    pasune: { 1: 0.83, 2: 0.66, 3: 0.50, 4: 0.33, 5: 0.17 },
    faneta: { 1: 0.83, 2: 0.66, 3: 0.50, 4: 0.33, 5: 0.17 },
    vie: { 1: 2.48, 2: 1.98, 3: 1.49, 4: 0.99, 5: 0.50 },
    livada: { 1: 2.48, 2: 1.98, 3: 1.49, 4: 0.99, 5: 0.50 },
    padure: { 1: 1.24, 2: 0.99, 3: 0.74, 4: 0.50, 5: 0.25 }
  };
  var SOLURI = [
    ['CZ', 'Cernoziom', 'Cernisol', 'foarte ridicată', 'Cel mai fertil sol; humus 3–6%, structură glomerulară, orizont Am molic gros'],
    ['FZ', 'Faeoziom', 'Cernisol', 'ridicată', 'Orizont Am închis; silvostepă; fertilitate bună'],
    ['EL', 'Preluvosol', 'Luvisol', 'medie-ridicată', 'Orizont Bt argic; păduri de foioase; drenaj bun'],
    ['LV', 'Luvosol', 'Luvisol', 'medie', 'Eluvionare accentuată; aciditate moderată; tasare'],
    ['AS', 'Aluviosol', 'Protisol', 'variabilă', 'Lunci; depuneri aluviale recente; risc de inundație'],
    ['GS', 'Gleiosol', 'Hidrisol', 'scăzută', 'Exces de umiditate freatică; gleizare; necesită drenaj'],
    ['SN', 'Solonceac', 'Salsodisol', 'foarte scăzută', 'Salinizare; restricție majoră pentru agricultură'],
    ['RS', 'Regosol', 'Protisol', 'scăzută', 'Sol slab dezvoltat pe versanți; eroziune activă']
  ];
  var AGRO = {
    pH: { opt: '6.0 – 7.5', u: '' }, humus: { opt: '2.5 – 5.0', u: '%' }, azotTotal: { opt: '0.15 – 0.30', u: '%' },
    fosforMobil: { opt: '20 – 80', u: 'ppm' }, potasiuMobil: { opt: '100 – 250', u: 'ppm' }, CaCO3: { opt: '0.5 – 5.0', u: '%' }
  };
  var LEGAL = [
    ['Ordinul MADR nr. 83/2018', 'Coeficienți de echivalent valoric pentru scoaterea terenurilor din circuitul agricol; se actualizează anual prin HG.'],
    ['Legea nr. 18/1991 (fondul funciar)', 'Protecția terenurilor agricole; categoriile de folosință; regimul scoaterii din circuit; competențe de aprobare.'],
    ['SRTS 2012 (ICPA)', 'Sistemul Român de Taxonomie a Solurilor — clasificarea tipurilor și subtipurilor de sol pe orizonturi diagnostice.'],
    ['OUG nr. 195/2005 (mediu)', 'Aviz de mediu (APM) obligatoriu pentru schimbarea folosinței; evaluarea impactului.'],
    ['Legea nr. 107/1996 (apele)', 'Zone de protecție ale cursurilor de apă; relevante pentru terenuri din luncă (aluviosoluri).'],
    ['Metodologie bonitare ICPA', 'Nota de bonitare 0–100 pe baza a 17 indicatori (climă, sol, relief); baza încadrării în clase I–V.']
  ];

  // ── Interpretări agrochimice ──────────────────────────────────────────────
  function iPH(v) { if (v == null) return '—'; v = +v; return v < 5.5 ? 'Puternic acid' : v < 6 ? 'Moderat acid' : v <= 7.5 ? 'Favorabil' : v <= 8.5 ? 'Alcalin' : 'Puternic alcalin'; }
  function iHum(v) { if (v == null) return '—'; v = +v; return v < 1.5 ? 'Foarte scăzut' : v < 2.5 ? 'Scăzut' : v <= 4 ? 'Moderat' : v <= 6 ? 'Ridicat' : 'Foarte ridicat'; }
  function iN(v) { if (v == null) return '—'; v = +v; return v < 0.1 ? 'Foarte scăzut' : v < 0.15 ? 'Scăzut' : v <= 0.25 ? 'Mediu' : 'Ridicat'; }
  function iP(v) { if (v == null) return '—'; v = +v; return v < 10 ? 'Foarte scăzut' : v < 20 ? 'Scăzut' : v <= 50 ? 'Mediu' : v <= 100 ? 'Ridicat' : 'Excesiv'; }
  function iK(v) { if (v == null) return '—'; v = +v; return v < 60 ? 'Foarte scăzut' : v < 100 ? 'Scăzut' : v <= 200 ? 'Mediu' : 'Ridicat'; }
  function iCaCO3(v) { if (v == null) return '—'; v = +v; return v === 0 ? 'Necalcaros' : v <= 1 ? 'Slab calcaros' : v <= 5 ? 'Moderat calcaros' : v <= 15 ? 'Calcaros' : 'Puternic calcaros'; }

  // ── Registry + persistență ────────────────────────────────────────────────
  G._PEDOLOGIE_REGISTRY = G._PEDOLOGIE_REGISTRY || {};
  function _key(uat) { return 'ux_pedologie_' + (uat || 'RO'); }
  function pedLoad(uat) { try { var r = localStorage.getItem(_key(uat)); if (r) Object.assign(G._PEDOLOGIE_REGISTRY, JSON.parse(r)); } catch (e) {} }
  function pedSave(uat) { try { var o = {}; Object.keys(G._PEDOLOGIE_REGISTRY).forEach(function (k) { if (G._PEDOLOGIE_REGISTRY[k].uat === uat) o[k] = G._PEDOLOGIE_REGISTRY[k]; }); localStorage.setItem(_key(uat), JSON.stringify(o)); } catch (e) {} }

  // ── Calcul taxă Ord. 83/2018 ──────────────────────────────────────────────
  function calculeazaTaxaScoatere(nrCad, suprafataMP, categorie, clasaOverride) {
    var st = G._PEDOLOGIE_REGISTRY[nrCad] || {};
    var clasa = clasaOverride || (st.claseCalitate && st.claseCalitate[categorie]) || st.clasaCalitateEfectiva || 3;
    var tarif = (TAXA[categorie] && TAXA[categorie][clasa]) || 0;
    var ha = (suprafataMP || 0) / 10000;
    var brut = tarif * ha;
    return { clasa: clasa, categorie: categorie, suprafataMP: suprafataMP, suprafataHa: ha.toFixed(4), tarifLeiHa: tarif, taxaLei: brut.toFixed(2), baza: 'Ord. MADR 83/2018' };
  }
  G.calculeazaTaxaScoatere = calculeazaTaxaScoatere;

  // ── Analiza LIVE a sitului (relief + folosință OSM) ───────────────────────
  function _slopePct(elevMin, elevMax, radiusM) { if (elevMax == null || elevMin == null) return null; return +((elevMax - elevMin) / (2 * (radiusM || 300)) * 100).toFixed(1); }
  function _erozRisc(slope) { if (slope == null) return { r: 'nedeterminat', col: [120, 120, 120] }; if (slope < 5) return { r: 'redus', col: [16, 122, 40] }; if (slope < 12) return { r: 'moderat', col: [202, 160, 30] }; if (slope < 25) return { r: 'ridicat', col: [210, 120, 40] }; return { r: 'foarte ridicat', col: [185, 60, 40] }; }
  async function _siteAnalysis(lat, lon) {
    var out = { elevMed: null, elevMin: null, elevMax: null, slope: null, folosinta: null, sursaFol: 'necunoscută' };
    try {
      if (G._getElevGrid) { var g = await G._getElevGrid(lat, lon, 300, 16); if (g) { out.elevMed = g.elevMed; out.elevMin = g.elevMin; out.elevMax = g.elevMax; out.slope = _slopePct(g.elevMin, g.elevMax, g.radiusM || 300); } }
    } catch (e) {}
    try {
      var q = '[out:json][timeout:20];(way(around:200,' + lat + ',' + lon + ')[landuse~"farmland|orchard|vineyard|meadow|forest|farmyard|greenhouse_horticulture"];);out tags 20;';
      var r = await fetch(PROXY + '/osm?q=' + encodeURIComponent(q), { signal: AbortSignal.timeout ? AbortSignal.timeout(20000) : undefined }).then(function (x) { return x.ok ? x.json() : null; });
      if (r && r.elements && r.elements.length) {
        var lu = {}; r.elements.forEach(function (e) { var l = e.tags && e.tags.landuse; if (l) lu[l] = (lu[l] || 0) + 1; });
        var top = Object.keys(lu).sort(function (a, b) { return lu[b] - lu[a]; })[0];
        var map = { farmland: 'arabil', orchard: 'livada', vineyard: 'vie', meadow: 'faneta', forest: 'padure', farmyard: 'arabil', greenhouse_horticulture: 'arabil' };
        out.folosinta = map[top] || 'arabil'; out.sursaFol = 'OSM landuse=' + top;
      }
    } catch (e) {}
    return out;
  }

  // freshness normative
  function _normNote() {
    return 'Bază normativă: versiunea ' + VERSION + '. Tarifele Ord. MADR 83/2018 se actualizează anual prin HG — verificați la monitoruloficial.ro / madr.ro înainte de utilizare oficială.';
  }

  // ══════════════════════════════════════════════════════════════════════
  // GENERATOR PDF — STUDIU PEDOLOGIC PROFUND (≥40 pag)
  // ══════════════════════════════════════════════════════════════════════
  async function generatePedologie() {
    var S = G.S;
    if (!S || !S.parcels || !S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { if (G.ss) G.ss('Selectați o parcelă pentru studiul pedologic.'); return; }
    var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel];
    if (!ap.geo || !ap.geo.geometry) { if (G.ss) G.ss('Parcela nu are geometrie.'); return; }
    if (!G._initStudyPdf) { if (G.ss) G.ss('Motorul PDF nu e încărcat.'); return; }
    if (G.ss) G.ss('Se generează Studiul Pedologic & Agrochimic…');

    var lat = ap.lat || (ap.geo.properties && ap.geo.properties.lat) || 47.16;
    var lon = ap.lon || (ap.geo.properties && ap.geo.properties.lon) || 27.6;
    try { if (G.turf && ap.geo) { var c = G.turf.centerOfMass(ap.geo).geometry.coordinates; lon = c[0]; lat = c[1]; } } catch (e) {}
    var site = await _siteAnalysis(lat, lon);

    var d = G._initStudyPdf('Studiu Pedologic si Agrochimic', 'Studiu de sol · scoatere din circuitul agricol', 46);
    var pdf = d.pdf, W = d.W, H = d.H, hdr = d.hdr, ftr = d.ftr, sec = d.sec, body = d.body, tblRow = d.tblRow, newPage = d.newPage, checkY = d.checkY, miniChart = d.miniChart, cover = d.cover, bullet = d.bullet, kv = d.kv;
    var nrcad = d.nrcad || ap.nrcad || '—', area = d.area || ap.area || 0, uat = d.uat || ap.uat || '', judet = d.judet || '';
    var categorie = site.folosinta || 'arabil';
    // date din registry (dacă există) + estimări marcate
    var st = G._PEDOLOGIE_REGISTRY[nrcad] || {};
    var agro = st.agrochimie || {};
    var clasa = st.clasaCalitateEfectiva || 3;
    var solIdx = 0; // implicit — se rafinează dacă avem tip în registry
    var TITLE = 'STUDIU PEDOLOGIC';
    var pg = 1, cy;
    function page(t) { pg++; cy = newPage(t || TITLE, pg); }
    function P(txt) { cy = checkY(cy, 26, TITLE, pg); cy = body(txt, 14, cy) + 2.5; }
    function SEC(t) { cy = checkY(cy, 30, TITLE, pg); cy = sec(t, cy) + 2; }

    // ── PAG 1: COPERTĂ ──
    var cm = CLASE[clasa];
    cover('Studiu pedologic pentru scoaterea terenului din circuitul agricol\nconform Ordinului MADR nr. 83/2018 · SRTS 2012 · Legea 18/1991',
      null,
      [['Nr. cadastral', nrcad], ['UAT / localitate', uat || '—'], ['Suprafață studiată', (area ? area.toLocaleString('ro-RO') : '—') + ' mp'],
       ['Categoria de folosință', categorie.charAt(0).toUpperCase() + categorie.slice(1) + (site.sursaFol !== 'necunoscută' ? ' (' + site.sursaFol + ')' : '')],
       ['Clasă de calitate (estimare)', 'Clasa ' + cm.rom + ' — ' + cm.desc]],
      clasa >= 3, 'Clasa ' + cm.rom + ' · notă bonitare ' + cm.nota);

    // ── PAG 2: CUPRINS + REZUMAT ──
    page('CUPRINS ȘI REZUMAT EXECUTIV');
    cy = sec('CUPRINS', cy) + 1;
    ['1. Cadrul legal și normativ', '2. Metodologia studiului pedologic', '3. Localizarea și caracterizarea sitului',
     '4. Analiza reliefului și hidrologiei (date live)', '5. Clasificarea solului (SRTS 2012)', '6. Textura și proprietățile fizice',
     '7. Indicatorii agrochimici', '8. Bonitarea terenului', '9. Clasele de calitate I–V', '10. Încadrarea parcelei și favorabilitatea',
     '11. Taxa de scoatere din circuitul agricol (Ord. 83/2018)', '12. Protecția terenurilor agricole (Legea 18/1991)',
     '13. Restricții pedologice și măsuri de conservare', '14. Impact și scenarii', '15. Documentele dosarului de scoatere',
     '16. Concluzii', 'Anexe: referințe, surse, disclaimer'].forEach(function (t) { cy = body(t, 16, cy) + 0.5; });
    cy += 3; SEC('REZUMAT EXECUTIV');
    P('Prezentul studiu pedologic și agrochimic analizează terenul cu numărul cadastral ' + nrcad + ', în suprafață de ' + (area ? area.toLocaleString('ro-RO') : '—') + ' mp, situat în ' + (uat || 'UAT') + ', în vederea fundamentării procedurii de scoatere (temporară sau definitivă) din circuitul agricol, conform Ordinului MADR nr. 83/2018 și Legii fondului funciar nr. 18/1991. Studiul integrează clasificarea taxonomică a solului (SRTS 2012), caracterizarea agrochimică, bonitarea terenului și analiza reliefului pe baza modelului digital de elevație.');
    P('Pe baza analizei automate a reliefului (sursă Mapbox Terrain-RGB), terenul prezintă o altitudine medie de ' + (site.elevMed != null ? site.elevMed + ' m' : 'nedeterminată') + ' și o pantă medie de ' + (site.slope != null ? site.slope + '%' : 'nedeterminată') + ', ceea ce corespunde unui risc de eroziune ' + _erozRisc(site.slope).r + '. Categoria de folosință identificată este „' + categorie + '". Încadrarea preliminară în clasa de calitate este Clasa ' + cm.rom + '; determinarea exactă a clasei și a notei de bonitare se realizează prin analize de laborator de către OSPA sau o persoană atestată MADR.');

    // ── CAP 1: CADRU LEGAL ──
    page('CADRU LEGAL'); SEC('1. CADRUL LEGAL ȘI NORMATIV');
    P('Scoaterea terenurilor din circuitul agricol este un act reglementat strict, întrucât solul fertil este o resursă naturală neregenerabilă la scară umană. Legislația română condiționează schimbarea folosinței de existența unui studiu pedologic întocmit de un specialist atestat și de plata unei taxe proporționale cu valoarea agricolă a terenului. Cadrul aplicabil este:');
    cy = tblRow(['Act normativ', 'Obiect'], cy, true, [58, 124]);
    LEGAL.forEach(function (r) { cy = checkY(cy, 16, TITLE, pg); cy = tblRow(r, cy, false, [58, 124]); });
    cy += 3;
    P('Ordinul MADR nr. 83/2018 stabilește coeficienții de echivalent valoric (lei/mp, respectiv lei/ha) diferențiați pe categorii de folosință (arabil, pășune, fâneață, vie, livadă, pădure) și pe clase de calitate (I–V). Aceste valori se actualizează periodic prin hotărâre de guvern; ' + _normNote());
    P('Legea nr. 18/1991 instituie principiul protecției terenurilor agricole de clasă superioară (I și II), pentru care scoaterea din circuit este permisă doar cu aprobare la nivel superior (Ministerul Agriculturii) și în situații justificate. Terenurile de clasă inferioară (IV–V) beneficiază de o procedură simplificată și de taxe reduse. Schimbarea categoriei de folosință fără aprobare constituie contravenție sau, după caz, infracțiune.');

    // ── CAP 2: METODOLOGIE ──
    page('METODOLOGIE'); SEC('2. METODOLOGIA STUDIULUI PEDOLOGIC');
    P('Studiul pedologic se realizează în trei faze: (a) faza de teren — deschiderea de profile de sol, descrierea morfologică a orizonturilor și prelevarea de probe; (b) faza de laborator — determinarea proprietăților fizice, chimice și agrochimice; (c) faza de birou — interpretarea rezultatelor, clasificarea taxonomică, bonitarea și redactarea documentației.');
    P('Profilul de sol reprezintă o secțiune verticală prin sol, de la suprafață până la roca-mamă, care evidențiază succesiunea orizonturilor genetice. Orizonturile principale sunt: orizontul A (de suprafață, bogat în humus), orizontul B (de acumulare — argilic Bt, cambic Bv etc.), orizontul C (materialul parental) și, unde există, orizontul R (roca dură). Grosimea și caracteristicile orizontului A determină în mare măsură fertilitatea.');
    cy = tblRow(['Orizont', 'Denumire', 'Semnificație agronomică'], cy, true, [26, 60, 96]);
    [['A / Am', 'Orizont humifer / molic', 'Rezervorul principal de humus și nutrienți; determină fertilitatea'],
     ['E', 'Orizont eluvial', 'Sărăcit prin levigare; indică soluri evoluate (luvosoluri)'],
     ['Bt', 'Orizont argic', 'Acumulare de argilă; reduce permeabilitatea; risc de tasare'],
     ['Bv', 'Orizont cambic', 'Alterare in situ; soluri cambice (eutricambosol)'],
     ['C', 'Material parental', 'Roca de solificare (loess, aluviuni, marne)'],
     ['G / Gr', 'Orizont gleic', 'Exces de umiditate freatică; culori reduse (albăstrui-verzui)']
    ].forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [26, 60, 96]); });
    cy += 3;
    P('Prelevarea probelor agrochimice se face pe adâncimea de interes agronomic (0–20 cm pentru culturi anuale, 0–40 cm pentru plantații), din minimum 3–5 puncte reprezentative pe parcelă, omogenizate într-o probă medie. Analizele de laborator urmează metode standardizate (pH potențiometric, humus prin metoda Walkley-Black, azot Kjeldahl, fosfor și potasiu mobil prin metoda Egner-Riehm-Domingo).');

    // ── CAP 3: LOCALIZARE ──
    page('LOCALIZARE'); SEC('3. LOCALIZAREA ȘI CARACTERIZAREA SITULUI');
    cy = tblRow(['Element', 'Valoare'], cy, true, [70, 112]);
    [['Nr. cadastral', String(nrcad)], ['UAT / localitate', uat || '—'], ['Județ', judet || '—'],
     ['Coordonate (centroid, WGS84)', lat.toFixed(5) + ', ' + lon.toFixed(5)], ['Suprafață', (area ? area.toLocaleString('ro-RO') : '—') + ' mp (' + (area / 10000).toFixed(4) + ' ha)'],
     ['Categoria de folosință', categorie], ['Sursa folosinței', site.sursaFol]
    ].forEach(function (r) { cy = tblRow(r, cy, false, [70, 112]); });
    cy += 3;
    P('Parcela este localizată în arealul UAT ' + (uat || '—') + '. Din punct de vedere pedoclimatic, România se împarte în mai multe zone (stepă, silvostepă, zonă forestieră de deal și munte), fiecare cu asociații caracteristice de soluri. Poziția geografică a parcelei condiționează tipul dominant de sol, regimul hidric și potențialul agricol, aspecte detaliate în capitolele următoare.');
    P('Contextul de folosință al vecinătăților, identificat automat din baza OpenStreetMap (' + site.sursaFol + '), indică o utilizare predominant „' + categorie + '" în perimetrul analizat. Acest context confirmă caracterul agricol al zonei și fundamentează categoria de folosință utilizată în calculul taxei de scoatere. Amplasarea față de intravilanul localității, față de rețeaua de drumuri și față de cursurile de apă se stabilește pe planul cadastral și influențează atât procedura de introducere în intravilan, cât și restricțiile de construire.');
    P('Delimitarea juridică a parcelei se realizează pe baza planului de amplasament și a extrasului de carte funciară; suprafața studiată de ' + (area ? area.toLocaleString('ro-RO') : '—') + ' mp corespunde întregului imobil sau porțiunii pentru care se solicită scoaterea. În cazul scoaterii parțiale, se întocmește documentație de dezmembrare, iar studiul pedologic se referă strict la suprafața afectată de investiție.');

    // ── CAP 4: RELIEF (LIVE) ──
    page('RELIEF ȘI HIDROLOGIE'); SEC('4. ANALIZA RELIEFULUI ȘI HIDROLOGIEI (date live)');
    P('Analiza reliefului s-a realizat automat pe baza modelului digital de elevație Mapbox Terrain-RGB, printr-o grilă de eșantionare de 16×16 puncte pe o rază de 300 m în jurul centroidului parcelei. Relieful influențează direct eroziunea, drenajul, expunerea și, implicit, clasa de calitate a solului.');
    var er = _erozRisc(site.slope);
    cy = tblRow(['Parametru', 'Valoare', 'Interpretare'], cy, true, [64, 44, 74]);
    [['Altitudine medie', site.elevMed != null ? site.elevMed + ' m' : '—', site.elevMed != null ? (site.elevMed < 200 ? 'Câmpie/luncă' : site.elevMed < 500 ? 'Deal jos' : 'Deal înalt/munte') : '—'],
     ['Altitudine min–max', (site.elevMin != null ? site.elevMin : '—') + ' – ' + (site.elevMax != null ? site.elevMax : '—') + ' m', 'Amplitudine relief local'],
     ['Pantă medie', site.slope != null ? site.slope + '%' : '—', 'Determină scurgerea și eroziunea'],
     ['Risc de eroziune', er.r, site.slope != null && site.slope >= 12 ? 'Necesită măsuri antierozionale' : 'Compatibil cu folosința agricolă']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [64, 44, 74]); });
    cy += 3;
    if (site.elevMin != null && site.elevMax != null && site.elevMax !== site.elevMin) {
      cy = miniChart(['Cotă', 'm'], [['Minimă', site.elevMin], ['Medie', site.elevMed], ['Maximă', site.elevMax]], 'Profil altimetric local (m)', cy) || cy;
    }
    P('Panta terenului este un factor determinant în bonitare: pantele sub 5% sunt favorabile mecanizării și prezintă risc redus de eroziune, în timp ce pantele peste 12–15% impun măsuri antierozionale (terasare, culturi în benzi, împăduriri de protecție) și pot reduce clasa de calitate. Regimul hidric (exces sau deficit de umiditate) se evaluează în corelație cu poziția geomorfologică și cu tipul de sol.');

    // ── CAP 5: CLASIFICARE SRTS ──
    page('CLASIFICARE SOL'); SEC('5. CLASIFICAREA SOLULUI (SRTS 2012)');
    P('Sistemul Român de Taxonomie a Solurilor (SRTS 2012), elaborat de Institutul Național de Cercetare-Dezvoltare pentru Pedologie, Agrochimie și Protecția Mediului (ICPA), clasifică solurile pe baza orizonturilor diagnostice și a proprietăților morfologice. Principalele tipuri de sol întâlnite în România, cu relevanță pentru încadrarea parcelei, sunt:');
    cy = tblRow(['Cod', 'Tip sol', 'Clasă SRTS', 'Fertilitate'], cy, true, [18, 44, 44, 76]);
    SOLURI.forEach(function (s) { cy = checkY(cy, 14, TITLE, pg); cy = tblRow([s[0], s[1], s[2], s[3]], cy, false, [18, 44, 44, 76]); });
    cy += 3;
    P('Tipul de sol al parcelei se stabilește prin deschiderea profilului pedologic pe teren. ' + (st.tipSol ? 'Conform datelor înregistrate, solul parcelei este: ' + st.tipSol + '.' : 'În lipsa unui profil deschis, tipul se estimează pe baza zonei pedoclimatice și a hărților pedologice ICPA/SIGSTAR; determinarea definitivă rămâne în sarcina studiului de teren OSPA.'));
    SOLURI.forEach(function (s) { P('• ' + s[1] + ' (' + s[0] + ', ' + s[2] + '): ' + s[4] + '.'); });

    // ── CAP 6: TEXTURA ──
    page('PROPRIETĂȚI FIZICE'); SEC('6. TEXTURA ȘI PROPRIETĂȚILE FIZICE');
    P('Textura solului (proporția de nisip, praf și argilă) determină regimul de apă, aer și nutrienți. Solurile luto-argiloase și lutoase sunt cele mai favorabile agriculturii, oferind un echilibru între capacitatea de reținere a apei și drenaj. Solurile nisipoase drenează excesiv și rețin puțini nutrienți, iar cele argiloase se compactează și au drenaj deficitar.');
    cy = tblRow(['Clasă textură', 'Argilă (%)', 'Comportament agronomic'], cy, true, [54, 34, 94]);
    [['Nisipoasă', '< 12', 'Drenaj excesiv, fertilitate scăzută, se lucrează ușor'],
     ['Luto-nisipoasă', '12–20', 'Bună aerare, necesită irigare în secetă'],
     ['Lutoasă', '20–32', 'Echilibrată — optimă pentru majoritatea culturilor'],
     ['Luto-argiloasă', '32–45', 'Fertilă, reține bine apa și nutrienții'],
     ['Argiloasă', '> 45', 'Compactare, drenaj slab, se lucrează greu']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [54, 34, 94]); });
    cy += 3;
    P('Alte proprietăți fizice relevante: densitatea aparentă (indicator de tasare — valori peste 1.5 g/cm³ indică compactare), porozitatea totală (optim 45–55%), permeabilitatea și stabilitatea structurală. Structura glomerulară (specifică cernoziomurilor) este ideală, favorizând infiltrația și dezvoltarea radiculară.' + (agro.textura ? ' Textura înregistrată pentru parcelă: ' + agro.textura + '.' : ''));
    SEC('Constante hidrofizice ale solului');
    P('Capacitatea solului de a reține și ceda apă plantelor se exprimă prin constantele hidrofizice, determinante pentru necesarul de irigare și pentru regimul aerohidric:');
    cy = tblRow(['Constantă', 'Semnificație', 'Valori tipice'], cy, true, [50, 74, 58]);
    [['Capacitatea de câmp (CC)', 'Apa reținută după drenajul gravitațional', '18–32% (funcție de textură)'],
     ['Coeficient de ofilire (CO)', 'Apa inaccesibilă plantelor', '6–16%'],
     ['Apa utilă (CC−CO)', 'Rezerva disponibilă pentru plante', '10–18% — cu cât mai mare, cu atât mai bun'],
     ['Densitate aparentă', 'Grad de tasare', '1.1–1.4 g/cm³ (optim); >1.5 = compactat'],
     ['Porozitate totală', 'Volum de goluri (apă+aer)', '45–55% optim']
    ].forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [50, 74, 58]); });
    cy += 3;
    P('Solurile lutoase și luto-argiloase, cu apă utilă ridicată și porozitate echilibrată, susțin cel mai bine producția agricolă și obțin note de bonitare superioare. Solurile nisipoase (apă utilă redusă) și cele argiloase compactate (porozitate de aerare deficitară) primesc corecții negative la bonitare.');

    // ── CAP 7: AGROCHIMIE ──
    page('INDICATORI AGROCHIMICI'); SEC('7. INDICATORII AGROCHIMICI');
    P('Indicatorii agrochimici caracterizează starea de fertilitate chimică a solului și fundamentează recomandările de fertilizare și amendare. Valorile de mai jos provin din analize de laborator; unde lipsesc, se marchează „de determinat" și se completează de OSPA.');
    cy = tblRow(['Indicator', 'Valoare', 'Interval optim', 'Interpretare'], cy, true, [52, 30, 40, 60]);
    [['pH (H₂O)', agro.pH != null ? agro.pH : 'de determinat', AGRO.pH.opt, iPH(agro.pH)],
     ['Humus (%)', agro.humus != null ? agro.humus : 'de determinat', AGRO.humus.opt, iHum(agro.humus)],
     ['Azot total N (%)', agro.azotTotal != null ? agro.azotTotal : 'de determinat', AGRO.azotTotal.opt, iN(agro.azotTotal)],
     ['Fosfor mobil P (ppm)', agro.fosforMobil != null ? agro.fosforMobil : 'de determinat', AGRO.fosforMobil.opt, iP(agro.fosforMobil)],
     ['Potasiu mobil K (ppm)', agro.potasiuMobil != null ? agro.potasiuMobil : 'de determinat', AGRO.potasiuMobil.opt, iK(agro.potasiuMobil)],
     ['CaCO₃ (%)', agro.CaCO3 != null ? agro.CaCO3 : 'de determinat', AGRO.CaCO3.opt, iCaCO3(agro.CaCO3)]
    ].forEach(function (r) { cy = tblRow(r, cy, false, [52, 30, 40, 60]); });
    cy += 3;
    P('pH-ul solului controlează disponibilitatea nutrienților: la pH sub 5.5 (soluri acide) se blochează fosforul și apar toxicități de aluminiu, necesitând amendare calcică; la pH peste 8.5 (soluri alcaline) devin deficitare microelementele (Fe, Mn, Zn). Humusul este rezervorul de azot organic și cimentul structurii solului — un conținut sub 2% indică soluri sărăcite, necesitând aport de materie organică.');
    P('Azotul, fosforul și potasiul (N-P-K) sunt macroelementele principale. Deficitul de azot limitează creșterea vegetativă; fosforul mobil sub 20 ppm impune fertilizare fosfatică; potasiul sub 100 ppm reduce rezistența plantelor la secetă și boli. Aceste valori, corelate cu textura și pH-ul, stau la baza planului de fertilizare și a evaluării potențialului productiv.');

    // ── CAP 8: BONITARE ──
    page('BONITARE'); SEC('8. BONITAREA TERENULUI');
    P('Bonitarea terenurilor agricole (metodologie ICPA) atribuie fiecărei unități de teren o notă de la 0 la 100, care exprimă favorabilitatea pentru o anumită folosință. Nota se calculează prin produsul coeficienților a 17 indicatori (temperatură, precipitații, textură, pantă, drenaj, gleizare, salinizare, rezervă de humus etc.), fiecare cu valori între 0 și 1, raportat la condiții optime.');
    P('Formula generală: Nota = 100 × ∏(Ci), unde Ci sunt coeficienții de corecție ai celor 17 indicatori. Nota de bonitare determină direct încadrarea în clasele de calitate I–V. Corecțiile pentru pantă, eroziune și exces de umiditate pot reduce substanțial nota față de potențialul climatic al zonei.');
    var notaEst = st.notaBonitare || (clasa === 1 ? 90 : clasa === 2 ? 70 : clasa === 3 ? 50 : clasa === 4 ? 30 : 12);
    cy = tblRow(['Grup de factori', 'Contribuție', 'Observație'], cy, true, [58, 40, 84]);
    [['Factori climatici', 'temperatură, precipitații', 'Determină plafonul zonal al notei'],
     ['Factori edafici', 'textură, humus, pH, adâncime', 'Proprietățile intrinseci ale solului'],
     ['Factori de relief', 'pantă ' + (site.slope != null ? site.slope + '%' : '—') + ', expoziție', 'Corecție ' + (site.slope != null && site.slope >= 12 ? 'semnificativă (pantă)' : 'redusă')],
     ['Factori hidrici', 'drenaj, gleizare, inundabilitate', 'Excesul reduce nota'],
     ['Notă bonitare (estimare)', notaEst + '/100', 'Corespunde Clasei ' + cm.rom]
    ].forEach(function (r) { cy = checkY(cy, 14, TITLE, pg); cy = tblRow(r, cy, false, [58, 40, 84]); });
    cy += 3;
    P('Nota de bonitare estimată pentru parcelă este de aproximativ ' + notaEst + '/100, corespunzând Clasei ' + cm.rom + ' de calitate. Valoarea definitivă se stabilește prin studiul pedologic de teren, care cuantifică precis fiecare dintre cei 17 coeficienți.');

    // ── CAP 9: CLASE CALITATE ──
    page('CLASE DE CALITATE'); SEC('9. CLASELE DE CALITATE I–V');
    P('Încadrarea terenurilor agricole în clase de calitate se face pe baza notei de bonitare, conform metodologiei ICPA și Ordinului MADR 83/2018. Clasele reflectă gradul de fertilitate și, implicit, valoarea economică și nivelul de protecție legală:');
    cy = tblRow(['Clasa', 'Notă', 'Descriere', 'Regim scoatere'], cy, true, [18, 26, 74, 64]);
    [1, 2, 3, 4, 5].forEach(function (c) { var m = CLASE[c]; cy = checkY(cy, 16, TITLE, pg); cy = tblRow([m.rom, m.nota, m.desc, m.restr], cy, false, [18, 26, 74, 64]); });
    cy += 3;
    cy = miniChart(['Clasa', 'Notă medie'], [['I', 90], ['II', 70], ['III', 50], ['IV', 30], ['V', 10]], 'Note medii de bonitare pe clase de calitate', cy) || cy;
    P('Terenurile de Clasa I și II reprezintă fondul agricol de cea mai mare valoare al țării; protejarea lor este de interes național, iar scoaterea din circuit este descurajată prin proceduri de aprobare la nivel superior și prin taxe ridicate. Terenurile de Clasa IV și V, cu potențial agricol limitat, sunt candidate preferate pentru dezvoltări urbane și industriale.');

    // ── CAP 10: ÎNCADRARE + FAVORABILITATE ──
    page('ÎNCADRARE'); SEC('10. ÎNCADRAREA PARCELEI ȘI FAVORABILITATEA');
    var favor = clasa <= 2 ? 'NEFAVORABIL scoaterii (teren agricol valoros — necesită aprobare superioară)' : clasa === 3 ? 'FAVORABIL CU RESTRICȚII (scoatere posibilă cu taxă și documentație completă)' : 'FAVORABIL scoaterii (potențial agricol limitat)';
    pdf.setFillColor(cm.col[0], cm.col[1], cm.col[2]); pdf.rect(14, cy, W - 28, 16, 'F');
    pdf.setTextColor(255, 255, 255); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(13);
    pdf.text('Clasa ' + cm.rom + ' de calitate · notă bonitare ' + cm.nota, W / 2, cy + 10, { align: 'center' });
    cy += 22; pdf.setTextColor(20, 30, 50); pdf.setFont('DejaVuRO', 'normal');
    P('Pe baza analizei integrate (relief, tip de sol estimat, agrochimie și bonitare), parcela cu nr. cadastral ' + nrcad + ' se încadrează preliminar în Clasa ' + cm.rom + ' de calitate. Din perspectiva scoaterii din circuitul agricol, terenul este: ' + favor + '.');
    P('Această încadrare are caracter orientativ și se fundamentează definitiv prin studiul pedologic de teren, executat de OSPA sau de o persoană atestată MADR. Studiul de față oferă cadrul metodologic, analiza reliefului pe date reale și estimarea preliminară necesară pregătirii dosarului.');
    P('Favorabilitatea pentru scoatere trebuie interpretată în dublu sens: agronomic (cât de valoros este solul pierdut) și procedural (cât de complexă este aprobarea). Un teren de Clasa IV–V este „favorabil" scoaterii în ambele sensuri — pierdere agricolă mică și procedură simplă. Un teren de Clasa I–II este „nefavorabil": chiar dacă din punct de vedere tehnic construcția este posibilă, pierderea unei resurse agricole valoroase impune justificare temeinică și aprobare la nivel superior, iar taxa este maximă. Recomandarea urbanistică generală este orientarea dezvoltărilor către terenuri de clasă inferioară, conservând fondul agricol de clasă superioară.');

    // ── CAP 11: TAXA ──
    page('TAXA DE SCOATERE'); SEC('11. TAXA DE SCOATERE (Ord. MADR 83/2018)');
    P('Taxa de scoatere din circuitul agricol se calculează prin înmulțirea tarifului corespunzător categoriei de folosință și clasei de calitate (în lei/ha, conform Ord. 83/2018) cu suprafața exprimată în hectare, ajustată eventual cu multiplicatori de zonă. Formula: Taxa = Tarif(categorie, clasă) × Suprafață(ha) × Multiplicator_zonă.');
    var tx = calculeazaTaxaScoatere(nrcad, area, categorie, clasa);
    P('Exemplu de calcul pentru parcela analizată — categoria „' + categorie + '", Clasa ' + cm.rom + ':');
    cy = tblRow(['Element', 'Valoare'], cy, true, [90, 92]);
    [['Categorie de folosință', categorie], ['Clasă de calitate', 'Clasa ' + cm.rom], ['Tarif (Ord. 83/2018)', tx.tarifLeiHa + ' lei/ha'],
     ['Suprafață', area.toLocaleString('ro-RO') + ' mp = ' + tx.suprafataHa + ' ha'], ['Multiplicator zonă', '1.00 (implicit — de ajustat)'],
     ['TAXĂ ESTIMATĂ', tx.taxaLei + ' lei']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [90, 92]); });
    cy += 3;
    SEC('Tarife pe categorii și clase (lei/ha)');
    cy = tblRow(['Categorie', 'Cl. I', 'Cl. II', 'Cl. III', 'Cl. IV', 'Cl. V'], cy, true, [42, 28, 28, 28, 28, 28]);
    Object.keys(TAXA).forEach(function (cat) { var t = TAXA[cat]; cy = tblRow([cat, '' + t[1], '' + t[2], '' + t[3], '' + t[4], '' + t[5]], cy, false, [42, 28, 28, 28, 28, 28]); });
    cy += 3;
    cy = miniChart(['Categorie', 'Tarif Cl.I'], Object.keys(TAXA).map(function (c) { return [c, TAXA[c][1]]; }), 'Tarif de scoatere Clasa I pe categorii (lei/ha)', cy) || cy;
    P('Notă importantă: valorile de mai sus sunt cele din Ord. 83/2018 și se actualizează anual prin hotărâre de guvern. Pentru dosarul oficial se utilizează tariful în vigoare la data depunerii, publicat în Monitorul Oficial. ' + _normNote());

    // ── CAP 12: PROTECȚIE L.18/1991 ──
    page('PROTECȚIA TERENURILOR'); SEC('12. PROTECȚIA TERENURILOR AGRICOLE (Legea 18/1991)');
    P('Legea fondului funciar instituie regimul de protecție a terenurilor agricole și procedura de scoatere din circuit. Procedura, în sinteză, cuprinde următorii pași:');
    ['1. Întocmirea studiului pedologic de teren de către OSPA / persoană atestată MADR (determinarea clasei de calitate și a notei de bonitare).',
     '2. Obținerea avizelor: Direcția pentru Agricultură Județeană (DAJ), aviz de mediu (APM) și, după caz, avizul Apelor Române pentru terenuri din luncă.',
     '3. Pentru terenuri de Clasa I–II: aprobare la nivelul Ministerului Agriculturii (MADR); pentru Clasa III–V: aprobare la nivel județean.',
     '4. Achitarea taxei de scoatere (Ord. 83/2018), calculată pe categorie și clasă.',
     '5. Emiterea deciziei de scoatere (temporară sau definitivă) și actualizarea categoriei de folosință în cartea funciară.'
    ].forEach(function (t) { P(t); });
    P('Scoaterea temporară (de regulă până la 2 ani, cu posibilitate de prelungire) obligă la redarea terenului în circuitul agricol la finalul lucrărilor, cu refacerea stratului fertil. Scoaterea definitivă schimbă permanent categoria de folosință și este condiția prealabilă pentru autorizarea construcțiilor pe teren extravilan agricol.');

    // ── CAP 13: RESTRICȚII + CONSERVARE ──
    page('RESTRICȚII PEDOLOGICE'); SEC('13. RESTRICȚII PEDOLOGICE ȘI MĂSURI DE CONSERVARE');
    cy = tblRow(['Restricție', 'Cauză', 'Măsură de remediere'], cy, true, [50, 56, 76]);
    [['Eroziune', 'pantă > 12%, ploi torențiale', 'Terasare, culturi în benzi, împăduriri de protecție'],
     ['Exces de umiditate', 'nivel freatic ridicat, gleizare', 'Drenaj, canale de desecare, culturi tolerante'],
     ['Aciditate', 'pH < 5.5, levigare', 'Amendare calcică (var, dolomit)'],
     ['Alcalinitate/salinizare', 'sodiu, evaporație intensă', 'Amendare cu gips, spălarea sărurilor, drenaj'],
     ['Sărăcire în humus', 'agricultură intensivă, eroziune', 'Aport de gunoi, îngrășăminte verzi, rotații'],
     ['Compactare', 'trafic agricol, argilă mare', 'Afânare adâncă, evitarea lucrărilor pe sol umed']
    ].forEach(function (r) { cy = checkY(cy, 16, TITLE, pg); cy = tblRow(r, cy, false, [50, 56, 76]); });
    cy += 3;
    P('Conservarea solului este o obligație legală (OUG 195/2005) și o necesitate economică. Chiar și în cazul scoaterii din circuit, decopertarea și depozitarea separată a stratului vegetal fertil (orizontul A) este obligatorie, pentru a permite reutilizarea acestuia în amenajări peisagistice sau redarea în agricultură a altor terenuri.');

    // ── CAP 13b: ZONELE PEDOCLIMATICE ──
    page('ZONE PEDOCLIMATICE'); SEC('13b. ZONELE PEDOCLIMATICE ALE ROMÂNIEI');
    P('Repartiția solurilor pe teritoriul României urmează zonalitatea climatică și altitudinală. Cunoașterea zonei pedoclimatice în care se află parcela permite estimarea tipului dominant de sol și a plafonului de bonitare atins în condiții de relief favorabil. Principalele zone sunt:');
    cy = tblRow(['Zonă pedoclimatică', 'Soluri dominante', 'Potențial agricol'], cy, true, [52, 62, 68]);
    [['Stepă (Bărăgan, Dobrogea)', 'Cernoziomuri, kastanoziomuri', 'Foarte ridicat (cl. I–II) — deficit hidric'],
     ['Silvostepă (Moldova, Câmpia de Vest)', 'Cernoziomuri cambice, faeoziomuri', 'Ridicat (cl. I–III)'],
     ['Zonă forestieră de câmpie/deal', 'Preluvosoluri, luvosoluri', 'Mediu (cl. III–IV) — aciditate'],
     ['Zonă montană', 'Districambosoluri, podzoluri', 'Scăzut (cl. IV–V) — pantă, aciditate'],
     ['Lunci și delte', 'Aluviosoluri, gleiosoluri', 'Variabil — risc inundație/exces umiditate']
    ].forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [52, 62, 68]); });
    cy += 3;
    P('Parcela analizată, cu altitudinea medie de ' + (site.elevMed != null ? site.elevMed + ' m' : 'nedeterminată') + ', se plasează cel mai probabil în zona ' + (site.elevMed == null ? 'de câmpie/silvostepă' : site.elevMed < 200 ? 'de câmpie / luncă (stepă–silvostepă)' : site.elevMed < 500 ? 'de deal (silvostepă / forestieră)' : 'de deal înalt / montană') + ', ceea ce orientează estimarea tipului de sol și a potențialului. Determinarea exactă rămâne obiectul studiului de teren.');

    // ── CAP 13c: PLAN DE FERTILIZARE ȘI AMENDARE ──
    page('FERTILIZARE ȘI AMENDARE'); SEC('13c. PLAN DE FERTILIZARE ȘI AMENDARE');
    P('Pe baza indicatorilor agrochimici se stabilește planul de fertilizare (aport de N-P-K) și de amendare (corecția reacției solului). Deși scopul principal al studiului este scoaterea din circuit, evaluarea stării de fertilitate este obligatorie pentru bonitare și pentru eventuala redare în circuit după o scoatere temporară.');
    cy = tblRow(['Situație agrochimică', 'Măsură recomandată', 'Doză orientativă'], cy, true, [56, 62, 64]);
    [['pH < 5.5 (sol acid)', 'Amendare calcică (CaCO₃ / dolomit)', '2–6 t/ha, funcție de aciditate'],
     ['pH > 8.5 (sol alcalin/sodic)', 'Amendare cu gips (CaSO₄) + spălare', '3–8 t/ha gips'],
     ['Humus < 2%', 'Aport materie organică (gunoi, îngrășăminte verzi)', '20–40 t/ha gunoi'],
     ['Fosfor mobil < 20 ppm', 'Fertilizare fosfatică (superfosfat)', '40–80 kg P₂O₅/ha'],
     ['Potasiu mobil < 100 ppm', 'Fertilizare potasică (sare potasică)', '60–120 kg K₂O/ha'],
     ['Azot scăzut', 'Fertilizare azotată fracționată', '80–150 kg N/ha']
    ].forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [56, 62, 64]); });
    cy += 3;
    P('Amendarea și fertilizarea se corelează cu textura (solurile argiloase rețin mai bine nutrienții, cele nisipoase necesită aplicări fracționate) și cu asolamentul practicat. Aplicarea rațională a îngrășămintelor este reglementată și de directiva privind nitrații (protecția apelor împotriva poluării cu nitrați din surse agricole), relevantă în zonele vulnerabile.');

    // ── CAP 13d: REGIMUL CONSTRUIRII PE TEREN AGRICOL EXTRAVILAN ──
    page('REGIM CONSTRUIRE EXTRAVILAN'); SEC('13d. REGIMUL CONSTRUIRII PE TEREN AGRICOL EXTRAVILAN');
    P('Construirea pe teren agricol situat în extravilan este condiționată, de regulă, de două operațiuni prealabile: (a) introducerea terenului în intravilan printr-o documentație de urbanism (PUZ/PUG) aprobată și (b) scoaterea din circuitul agricol. Excepțiile (construcții agricole, anexe gospodărești, utilități) sunt limitate și reglementate specific.');
    P('Fluxul tipic pentru dezvoltarea unui teren agricol extravilan: (1) certificat de urbanism care stabilește necesitatea PUZ; (2) elaborare și aprobare PUZ (cu avizele aferente); (3) studiu pedologic + scoatere din circuitul agricol; (4) introducere în intravilan; (5) autorizație de construire. Studiul pedologic (documentul de față) se plasează la pasul 3 și este condiție pentru pașii următori.');
    P('Corelarea cu celelalte studii ale platformei: Studiul de Amplasament stabilește contextul teritorial și utilitățile; Studiul Geotehnic evaluează terenul de fundare (distinct de solul agricol); studiile de management al apelor pluviale tratează impermeabilizarea. Prezentul studiu pedologic acoperă exclusiv componenta de sol agricol și taxa de scoatere, fără a le duplica.');

    // ── CAP 13e: CONTEXT NAȚIONAL FOND FUNCIAR ──
    page('CONTEXT NAȚIONAL'); SEC('13e. STAREA FONDULUI FUNCIAR ȘI PROTECȚIA SOLULUI');
    P('România dispune de un fond funciar agricol de circa 14,6 milioane hectare (aproximativ 61% din suprafața țării), din care terenul arabil reprezintă aproximativ 9,4 milioane hectare — una dintre cele mai mari resurse agricole din Uniunea Europeană raportat la populație. Această resursă este însă supusă unor procese de degradare care justifică regimul strict de protecție și necesitatea studiilor pedologice la scoaterea din circuit.');
    cy = tblRow(['Proces de degradare', 'Suprafață afectată (estimativ)', 'Efect'], cy, true, [56, 56, 70]);
    [['Eroziune de suprafață și adâncime', '~6,3 mil. ha (versanți)', 'Pierdere de sol fertil, reducerea notei de bonitare'],
     ['Aciditate excesivă', '~2,4 mil. ha', 'Blocarea nutrienților, necesită amendare calcică'],
     ['Exces de umiditate / gleizare', '~3,8 mil. ha', 'Restricții de folosință, necesită drenaj'],
     ['Sărăturare / salinizare', '~0,6 mil. ha', 'Toxicitate, fertilitate foarte scăzută'],
     ['Compactare (tasare)', 'larg răspândită', 'Reducerea porozității și a productivității']
    ].forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [56, 56, 70]); });
    cy += 3;
    P('Monitorizarea și cartarea solurilor sunt asigurate de rețeaua Oficiilor de Studii Pedologice și Agrochimice (OSPA) coordonate de ICPA, care întocmesc studiile pedologice și agrochimice periodice. Protejarea terenurilor de clasă superioară de la conversia neagricolă este un obiectiv de securitate alimentară și de mediu; de aceea taxa de scoatere și procedura de aprobare cresc proporțional cu clasa de calitate.');

    // ── CAP 13f: POLUARE ȘI CALITATEA CHIMICĂ ──
    page('POLUARE SOL'); SEC('13f. POLUAREA ȘI CALITATEA CHIMICĂ A SOLULUI');
    P('La schimbarea folosinței, în special către utilizări sensibile (rezidențial, spații verzi, agricultură ecologică), se evaluează gradul de poluare a solului. Ordinul MAPPM nr. 756/1997 stabilește valori de referință (normale), praguri de alertă și praguri de intervenție pentru poluanți, diferențiate pe tipuri de folosință sensibilă / mai puțin sensibilă. Metalele grele sunt principalii poluanți urmăriți:');
    cy = tblRow(['Poluant', 'Prag alertă (sensibil, mg/kg)', 'Prag intervenție (sensibil, mg/kg)'], cy, true, [40, 70, 72]);
    [['Cupru (Cu)', '100', '200'], ['Plumb (Pb)', '50', '100'], ['Zinc (Zn)', '300', '600'],
     ['Cadmiu (Cd)', '3', '5'], ['Nichel (Ni)', '75', '150'], ['Crom total (Cr)', '100', '300']
    ].forEach(function (r) { cy = checkY(cy, 14, TITLE, pg); cy = tblRow(r, cy, false, [40, 70, 72]); });
    cy += 3;
    P('Depășirea pragului de alertă impune investigații suplimentare, iar depășirea pragului de intervenție obligă la măsuri de remediere (decontaminare, decopertare, restricționarea folosinței). Pentru terenurile agricole îndepărtate de surse industriale, riscul de poluare cu metale grele este de regulă redus; totuși, evaluarea este recomandată la conversia către folosințe sensibile, în corelare cu Studiul de Impact asupra Mediului.');

    // ── CAP 14: IMPACT + SCENARII ──
    page('IMPACT ȘI SCENARII'); SEC('14. IMPACT ȘI SCENARII');
    P('Scoaterea unui teren din circuitul agricol are impact pe trei planuri: pierderea capacității de producție alimentară, modificarea regimului hidrologic local (impermeabilizare, scurgere accelerată) și efecte asupra microclimatului. Cu cât clasa de calitate este mai bună, cu atât impactul este mai semnificativ, ceea ce justifică protecția legală sporită a claselor I–II.');
    P('Scenariul recomandat pentru parcelă, dat fiind clasa estimată ' + cm.rom + ': ' + (clasa <= 2 ? 'evitarea scoaterii sau limitarea la strictul necesar, cu compensare prin ameliorarea altor terenuri; dezvoltarea se orientează, dacă e posibil, către terenuri de clasă inferioară din vecinătate.' : 'scoaterea este acceptabilă din perspectiva agronomică; se recomandă totuși decopertarea și valorificarea stratului fertil, precum și limitarea impermeabilizării prin soluții de tip suprafețe permeabile și spații verzi.'));
    P('Măsuri compensatorii posibile: reconstrucția ecologică a unor terenuri degradate, contribuția la fonduri de ameliorare funciară, integrarea de spații verzi permeabile în proiectul de dezvoltare pentru a atenua efectul de impermeabilizare (corelat cu studiile de management al apelor pluviale din platformă).');

    // ── CAP 15: DOCUMENTE ──
    page('DOSARUL DE SCOATERE'); SEC('15. DOCUMENTELE DOSARULUI DE SCOATERE');
    ['Cerere de scoatere din circuitul agricol (temporară / definitivă).',
     'Studiul pedologic de teren (OSPA / atestat MADR) — cu clasa de calitate și nota de bonitare.',
     'Extras de carte funciară actualizat + plan de amplasament și delimitare (cadastral).',
     'Memoriu tehnic privind necesitatea și oportunitatea scoaterii.',
     'Aviz de mediu (APM) conform OUG 195/2005; aviz Apele Române (dacă e cazul).',
     'Certificat de urbanism și, după caz, documentația de urbanism (PUZ/PUD) aprobată.',
     'Dovada achitării taxei de scoatere (Ord. 83/2018).'
    ].forEach(function (t) { P('• ' + t); });
    cy += 2;
    P('Detalierea pieselor principale: studiul pedologic de teren se întocmește de OSPA județean sau de o persoană atestată MADR și cuprinde profilele de sol, buletinele de analiză de laborator, nota de bonitare și încadrarea în clasa de calitate. Memoriul tehnic justifică necesitatea și oportunitatea scoaterii, argumentând, unde e cazul, imposibilitatea utilizării unui teren de clasă inferioară.');
    P('Avizul de mediu se obține de la Agenția pentru Protecția Mediului pe baza evaluării impactului schimbării folosinței; pentru terenurile din luncă sau din vecinătatea cursurilor de apă este necesar și avizul Administrației Naționale „Apele Române". Documentația cadastrală (plan de amplasament și delimitare + extras CF actualizat) asigură identificarea juridică exactă a imobilului.');

    // ── CAP 16: CONCLUZII ──
    page('CONCLUZII'); SEC('16. CONCLUZII');
    P('Terenul cu nr. cadastral ' + nrcad + ', în suprafață de ' + (area ? area.toLocaleString('ro-RO') : '—') + ' mp, situat în ' + (uat || 'UAT') + ', categoria de folosință „' + categorie + '", se încadrează preliminar în Clasa ' + cm.rom + ' de calitate (notă de bonitare estimată ' + notaEst + '/100).');
    P('Din perspectiva reliefului (altitudine medie ' + (site.elevMed != null ? site.elevMed + ' m' : '—') + ', pantă ' + (site.slope != null ? site.slope + '%' : '—') + ', risc de eroziune ' + er.r + '), terenul este ' + (site.slope != null && site.slope >= 12 ? 'expus proceselor de versant, necesitând măsuri antierozionale.' : 'stabil, fără restricții majore de relief.'));
    P('Favorabilitate pentru scoaterea din circuitul agricol: ' + favor + '. Taxa estimată de scoatere: ' + tx.taxaLei + ' lei (tarif ' + tx.tarifLeiHa + ' lei/ha, Ord. 83/2018).');
    P('Prezentul studiu are caracter orientativ și preliminar; fundamentarea oficială a procedurii de scoatere necesită studiul pedologic de teren, executat și semnat de OSPA sau de o persoană atestată MADR, și avizele legale aferente.');

    // ── ANEXE ──
    page('ANEXE'); SEC('ANEXE — REFERINȚE, SURSE, DISCLAIMER');
    cy = tblRow(['Referință normativă', 'Obiect'], cy, true, [58, 124]);
    LEGAL.forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [58, 124]); });
    cy += 3;
    P('Surse de date: relief — Mapbox Terrain-RGB (model digital de elevație); folosința terenului — OpenStreetMap (landuse), prin proxy; clasificare sol — SRTS 2012 / ICPA; tarife — Ord. MADR 83/2018. ' + _normNote());
    P('DISCLAIMER: Document orientativ și preliminar, generat automat de platforma UrbanX pe baza datelor publice disponibile. NU înlocuiește studiul pedologic de teren și documentațiile de specialitate atestate MADR/OSPA. Valorile de bonitare, clasa de calitate și indicatorii agrochimici necesită determinare în laborator. Taxele se calculează cu tariful în vigoare la data depunerii dosarului.');

    var fn = (G._stratFileName ? G._stratFileName('StudiuPedologic', { mode: 'parcela', nrcad: nrcad, localitate: uat }) : ('StudiuPedologic_' + nrcad)) + '.pdf';
    try { pdf.save(fn); } catch (e) { pdf.save('StudiuPedologic_' + nrcad + '.pdf'); }
    if (G.ss) G.ss('✅ Studiu Pedologic generat (' + pdf.getNumberOfPages() + ' pag).');
  }

  G.generatePedologie = generatePedologie;
  G.pedologie_load = pedLoad; G.pedologie_save = pedSave;
  console.log('[Pedologie] modul încărcat (window.generatePedologie)');
})(window);
