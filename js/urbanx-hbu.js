// ═══════════════════════════════════════════════════════════════════════════
// urbanx-hbu.js — HBU / SRU · Highest & Best Use & Studiu de Reconversie Urbană
// Pentru un amplasament (parcelă selectată sau centru UAT), evaluează compatibilitatea
// a 12 funcțiuni de reconversie (industrial → rezidențial/mixt/hotelier/birouri/etc.),
// cu scor transparent (localizare + accesibilitate + cerere + constrângeri) și
// pre-analiză financiară (GDV/CAPEX/profit/ROI) pentru scenariul recomandat.
// Standard UrbanX: studiu PDF ≥10 pag + secțiune IVU + surse + disclaimer.
// window._HBU.compute(opts) · .openPanel() · .generatePDF(cityKey)
// 26 iunie 2026 · ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  function N(v, d) { try { return Number(v).toLocaleString('ro-RO', { maximumFractionDigits: d == null ? 0 : d }); } catch (e) { return '' + v; } }
  // parse "1.234,5 €" / "12,3 %" / "45/100" → număr (pentru auto-grafic din tabele)
  function _num(s) { if (typeof s === 'number') return s; if (s == null) return null; var m = ('' + s).replace(/\./g, '').replace(/,/g, '.').match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : null; }
  // dacă ultima coloană a unui tabel e numerică pe ≥2 rânduri → desenează și un barChart
  // delegă la PICKER-ul UNIC din motorul de documente (stil identic în toate studiile/rapoartele)
  function _autoChart(D, headers, rows, title) { try { return window._pickChart && window._pickChart(D, headers, rows, title); } catch (e) {} }
  function cl(v, lo, hi) { return Math.max(lo == null ? 2 : lo, Math.min(hi == null ? 99 : hi, Math.round(v))); }

  // 12 funcțiuni de reconversie. Pondere pe: centralitate (c0), accesibilitate (a0),
  // cerere de bază (d0). val_mult = multiplicator valoare construită €/mp (pt GDV).
  var USES = [
    { id: 'rezid', n: 'Rezidențial colectiv', c0: 0.9, a0: 1.0, d0: 70, valEur: 1250, cost: 780 },
    { id: 'mixt', n: 'Mixt (locuire + comerț parter)', c0: 1.1, a0: 1.1, d0: 72, valEur: 1350, cost: 850 },
    { id: 'birouri', n: 'Birouri / office', c0: 1.3, a0: 1.3, d0: 55, valEur: 1300, cost: 900 },
    { id: 'hotel', n: 'Hotelier / cazare', c0: 1.4, a0: 1.2, d0: 48, valEur: 1500, cost: 1050 },
    { id: 'retail', n: 'Comercial / retail', c0: 1.2, a0: 1.3, d0: 52, valEur: 1200, cost: 720 },
    { id: 'logistic', n: 'Logistică / depozitare', c0: -0.8, a0: 0.6, d0: 58, valEur: 600, cost: 420 },
    { id: 'cultural', n: 'Cultural / creativ (hub, loft)', c0: 1.0, a0: 0.9, d0: 45, valEur: 1000, cost: 680 },
    { id: 'educ', n: 'Educațional', c0: 0.5, a0: 0.9, d0: 50, valEur: 1100, cost: 820 },
    { id: 'sanatate', n: 'Sănătate / medical', c0: 0.6, a0: 1.0, d0: 56, valEur: 1250, cost: 950 },
    { id: 'verde', n: 'Spațiu verde / parc public', c0: 0.3, a0: 0.4, d0: 60, valEur: 0, cost: 120 },
    { id: 'indusoara', n: 'Industrie ușoară / producție', c0: -0.6, a0: 0.5, d0: 50, valEur: 700, cost: 500 },
    { id: 'tech', n: 'Tech / data-center', c0: 0.2, a0: 0.8, d0: 46, valEur: 1400, cost: 1200 }
  ];

  function _ctx(cityKey) {
    var db = G._RO_CITIES_DB || {}; var city = db[cityKey] || (G.TCI && G.TCI.cityData) || {};
    var ap = G._activeParcel || G._selectedParcel || null; // parcela selectată, dacă există
    var lat = (ap && ap.lat) || city.lat || 47, lon = (ap && ap.lon) || city.lon || 27;
    // distanța la centru UAT [km]
    var dCenter = 0;
    try { if (city.lat && ap && ap.lat && G.turf) dCenter = G.turf.distance([city.lon, city.lat], [lon, lat], { units: 'kilometers' }); } catch (e) {}
    var area = (ap && (ap.area || ap.suprafata)) || 5000;
    var tier = (city.pop2021 || city.pop || 0) >= 250000 ? 1.0 : (city.pop2021 || 0) >= 100000 ? 0.82 : (city.pop2021 || 0) >= 40000 ? 0.6 : 0.42;
    var hub = city.coef_hub || 0.7;
    var ag = city.ag || 0.25;
    return { city: city, name: city.name || 'UAT', lat: lat, lon: lon, dCenter: dCenter, area: area, tier: tier, hub: hub, ag: ag, hasParcel: !!(ap && ap.lat) };
  }

  function compute(cityKey) {
    var x = _ctx(cityKey);
    // centralitate 0-1 (1 = central). Dacă nu avem parcelă, presupunem semicentral.
    var centr = x.hasParcel ? Math.max(0.1, 1 - x.dCenter / 6) : 0.62;
    var access = cl(35 + x.tier * 45 + x.hub * 15) / 100; // accesibilitate 0-1
    var seismicPen = x.ag > 0.3 ? 6 : x.ag > 0.2 ? 3 : 0; // construcții noi pe sit seismic
    var scored = USES.map(function (u) {
      var s = u.d0 + u.c0 * (centr * 28) + u.a0 * (access * 26) + x.hub * 6 - seismicPen * (u.valEur > 0 ? 1 : 0);
      // bonus piață: hub mare favorizează birouri/hotel/tech
      if (['birouri', 'hotel', 'tech'].indexOf(u.id) >= 0) s += x.hub * 8;
      if (u.id === 'logistic' || u.id === 'indusoara') s += (1 - centr) * 14; // periferic favorizează logistica
      return { id: u.id, n: u.n, score: cl(s), valEur: u.valEur, cost: u.cost };
    }).sort(function (a, b) { return b.score - a.score; });
    // pre-analiză financiară pt top scenariu (cu valoare construită)
    var top = scored.filter(function (s) { return s.valEur > 0; })[0] || scored[0];
    var CUT = 1.8; // ipoteză edificabil mediu (calibrabil din reguli PUG)
    var adc = Math.round(x.area * CUT); // arie desfășurată construită
    var gdv = Math.round(adc * top.valEur); // valoare brută dezvoltare
    var capex = Math.round(adc * top.cost + x.area * 60); // construcție + amenajare teren
    var demol = Math.round(x.area * 45); // demolare/dezafectare hală
    var soft = Math.round(capex * 0.12); // proiectare, avize, taxe
    var totalCost = capex + demol + soft;
    var profit = gdv - totalCost;
    var roi = totalCost > 0 ? Math.round(profit / totalCost * 100) : 0;
    return { x: x, scored: scored, top: top, fin: { CUT: CUT, adc: adc, gdv: gdv, capex: capex, demol: demol, soft: soft, totalCost: totalCost, profit: profit, roi: roi }, centr: Math.round(centr * 100), access: Math.round(access * 100) };
  }

  // ── Studiu PDF (≥10 pag) ─────────────────────────────────────────────────
  // captură REALĂ a hărții Mapbox cu amplasamentul marcat
  async function _captureMap(lat, lon) {
    var m = G.map; if (!m || !m.getCanvas) return null;
    function cleanup() { try { if (m.getLayer('hbu-site-pt')) m.removeLayer('hbu-site-pt'); } catch (e) {} try { if (m.getSource('hbu-site-src')) m.removeSource('hbu-site-src'); } catch (e) {} }
    try {
      cleanup();
      m.addSource('hbu-site-src', { type: 'geojson', data: { type: 'Feature', geometry: { type: 'Point', coordinates: [lon, lat] }, properties: {} } });
      m.addLayer({ id: 'hbu-site-pt', type: 'circle', source: 'hbu-site-src', paint: { 'circle-radius': 10, 'circle-color': 'rgba(217,119,6,0.35)', 'circle-stroke-color': '#fbbf24', 'circle-stroke-width': 3 } });
      m.jumpTo({ center: [lon, lat], zoom: 15.4, pitch: 0, bearing: 0 });
      await new Promise(function (res) { var done = false; function f() { if (!done) { done = true; res(); } } m.once('idle', f); setTimeout(f, 2400); });
      var url = m.getCanvas().toDataURL('image/jpeg', 0.85); cleanup(); return url;
    } catch (e) { cleanup(); return null; }
  }

  var _PROXY = (G._PROXY_URL || G._PROXY_BASE || 'https://urbanx-proxy.3dtravelsoftart.workers.dev');
  // captură vecinătate imediată: dotări OSM <500m colorate pe tip (reutilizăm logica cardurilor POI)
  async function _captureNeighborhood(lat, lon) {
    var m = G.map; if (!m || !m.getCanvas || !G.turf) return null;
    var TYPES = [
      { f: '[amenity=school]', c: '#f59e0b', k: 'școală' }, { f: '[amenity~"^(hospital|clinic)$"]', c: '#ef4444', k: 'sănătate' },
      { f: '[highway=bus_stop]', c: '#60a5fa', k: 'transport' }, { f: '[railway~"^(tram_stop|station)$"]', c: '#3b82f6', k: 'tren/tramvai' },
      { f: '[leisure=park]', c: '#22c55e', k: 'parc' }, { f: '[shop=supermarket]', c: '#06b6d4', k: 'comerț' }
    ];
    var q = '[out:json][timeout:25];(' + TYPES.map(function (t) { return 'nwr(around:500,' + lat + ',' + lon + ')' + t.f + ';'; }).join('') + ');out center tags;';
    var feats = [], counts = {};
    try {
      var resp = await fetch(_PROXY + '/osm?q=' + encodeURIComponent(q), { signal: AbortSignal.timeout(30000) });
      var j = await resp.json(); var els = (j && j.elements) || [];
      els.forEach(function (el) {
        var t = el.tags || {}; var la = el.lat != null ? el.lat : (el.center && el.center.lat), lo = el.lon != null ? el.lon : (el.center && el.center.lon);
        if (la == null) return;
        var col = '#94a3b8', kind = 'dotare';
        if (t.amenity === 'school') { col = '#f59e0b'; kind = 'școală'; } else if (t.amenity === 'hospital' || t.amenity === 'clinic') { col = '#ef4444'; kind = 'sănătate'; }
        else if (t.highway === 'bus_stop' || t.railway) { col = '#60a5fa'; kind = 'transport'; } else if (t.leisure === 'park') { col = '#22c55e'; kind = 'parc'; } else if (t.shop === 'supermarket') { col = '#06b6d4'; kind = 'comerț'; }
        counts[kind] = (counts[kind] || 0) + 1;
        feats.push({ type: 'Feature', geometry: { type: 'Point', coordinates: [lo, la] }, properties: { c: col, n: t.name || '' } });
      });
    } catch (e) {}
    var ids = ['hbu-nb-pt', 'hbu-nb-lb', 'hbu-nb-site'], srcs = ['hbu-nb-src', 'hbu-nb-site-src'];
    function cln() { ids.forEach(function (i) { try { if (m.getLayer(i)) m.removeLayer(i); } catch (e) {} }); srcs.forEach(function (s) { try { if (m.getSource(s)) m.removeSource(s); } catch (e) {} }); }
    try {
      cln();
      m.addSource('hbu-nb-src', { type: 'geojson', data: { type: 'FeatureCollection', features: feats } });
      m.addSource('hbu-nb-site-src', { type: 'geojson', data: { type: 'Feature', geometry: { type: 'Point', coordinates: [lon, lat] }, properties: {} } });
      m.addLayer({ id: 'hbu-nb-pt', type: 'circle', source: 'hbu-nb-src', paint: { 'circle-radius': 5, 'circle-color': ['get', 'c'], 'circle-stroke-color': '#0a0e1f', 'circle-stroke-width': 1.3, 'circle-opacity': 0.92 } });
      m.addLayer({ id: 'hbu-nb-lb', type: 'symbol', source: 'hbu-nb-src', layout: { 'text-field': ['get', 'n'], 'text-size': 8.5, 'text-offset': [0, 1], 'text-anchor': 'top', 'text-allow-overlap': false }, paint: { 'text-color': '#e5e7eb', 'text-halo-color': '#0a0e1f', 'text-halo-width': 1.3 }, minzoom: 14.5 });
      m.addLayer({ id: 'hbu-nb-site', type: 'circle', source: 'hbu-nb-site-src', paint: { 'circle-radius': 9, 'circle-color': 'rgba(217,119,6,0.4)', 'circle-stroke-color': '#fbbf24', 'circle-stroke-width': 3 } });
      m.jumpTo({ center: [lon, lat], zoom: 15.2, pitch: 0, bearing: 0 });
      await new Promise(function (res) { var done = false; function ff() { if (!done) { done = true; res(); } } m.once('idle', ff); setTimeout(ff, 2400); });
      var url = m.getCanvas().toDataURL('image/jpeg', 0.85); cln();
      return { url: url, counts: counts, total: feats.length };
    } catch (e) { cln(); return null; }
  }

  async function generatePDF(cityKey, mode) {
    var J = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF;
    if (!J || typeof G._makeStratDoc !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    var territorial = (mode === 'T');
    if (!territorial && typeof G._loadReguli === 'function') { try { await G._loadReguli(cityKey); } catch (e) {} }
    var PC = (G._ParcelCtx && !territorial) ? G._ParcelCtx.get(cityKey) : null;
    var onParcel = !territorial; // studiu PUNCTUAL (parcelă + zona ei)
    var R = compute(cityKey), x = R.x, f = R.fin;
    G.ss && G.ss('🏗 Generez studiul de reconversie (HBU)' + (territorial ? ' — teritorial' : ' — parcelă/zonă') + '…');
    var mapImg = null; try { mapImg = await _captureMap(x.lat, x.lon); } catch (e) {}
    // captură vecinătate imediată (dotări <500m) pentru studiul de parcelă
    var nbImg = null; if (onParcel && PC && PC.lat) { try { nbImg = await _captureNeighborhood(PC.lat, PC.lon); } catch (e) {} }
    var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    var D = G._makeStratDoc(pdf, { docTitle: territorial ? 'STUDIU DE RECONVERSIE URBANĂ — TERITORIAL' : 'STUDIU DE RECONVERSIE URBANĂ — PARCELĂ', cityName: x.name, accent: [146, 64, 14] });
    var W = 210, CW = D.dims.CW, FONT = 'DejaVuRO';
    D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
    pdf.setFillColor(28, 18, 8); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(146, 64, 14); pdf.rect(0, 60, W, 1.4, 'F');
    try { if (G._drawUrbanxLogo) { G._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
    pdf.setTextColor(251, 191, 36); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · HBU — HIGHEST & BEST USE', W / 2, 44, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(21); pdf.text('STUDIU DE RECONVERSIE URBANĂ', W / 2, 84, { align: 'center' });
    pdf.setTextColor(245, 158, 11); pdf.setFontSize(11); pdf.text(territorial ? 'Analiză teritorială — UAT' : 'Analiză punctuală — parcelă și zona din care face parte', W / 2, 93, { align: 'center' });
    var _subc = territorial ? x.name : (x.name + (PC && PC.nrcad ? ' · CF/cad. ' + PC.nrcad : '') + (PC && PC.zone && PC.zone.utrNr ? ' · UTR ' + PC.zone.utrNr : ''));
    pdf.setTextColor(251, 191, 36); pdf.setFontSize(13); pdf.text(D.S2(_subc), W / 2, 103, { align: 'center' });
    pdf.setTextColor(200, 170, 120); pdf.setFontSize(11); pdf.text('Funcțiune optimă: ' + R.top.n + ' · ROI estimat ' + N(f.roi) + '%', W / 2, 114, { align: 'center' });
    // panou copertă — structura studiului + reperele cheie (fără pagină parțială)
    var cy0 = 134;
    pdf.setDrawColor(146, 64, 14); pdf.setLineWidth(0.4); pdf.setFillColor(40, 26, 10);
    pdf.roundedRect(26, cy0, W - 52, 92, 3, 3, 'FD');
    pdf.setTextColor(251, 191, 36); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9.5); pdf.text(territorial ? 'STUDIU TERITORIAL DE RECONVERSIE (HBU)' : 'STUDIU DE PARCELĂ — RECONVERSIE (HBU)', W / 2, cy0 + 9, { align: 'center' });
    pdf.setFont(FONT, 'normal'); pdf.setFontSize(9); pdf.setTextColor(220, 205, 180);
    var capLines = ['Analiză de reconversie pe metodologia Highest & Best Use (IVS/ANEVAR):', 'profil sit · regim urbanistic · cele 4 teste HBU · scor de compatibilitate pentru', '12 funcțiuni · analiză financiară (GDV/CAPEX/NPV/ROI) și sensibilitate · constrângeri', 'și due diligence · patrimoniu industrial · etapizare · finanțare · monitorizare · Nota UrbanX.'];
    capLines.forEach(function (l, i) { pdf.text(l, W / 2, cy0 + 18 + i * 6, { align: 'center' }); });
    pdf.setTextColor(251, 191, 36); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9); pdf.text('REPERE AMPLASAMENT', W / 2, cy0 + 50, { align: 'center' });
    pdf.setFont(FONT, 'normal'); pdf.setFontSize(9); pdf.setTextColor(220, 205, 180);
    [['Suprafață teren', N(x.area) + ' mp'], ['Centralitate / accesibilitate', R.centr + ' / ' + R.access + ' (0–100)'], ['GDV estimat', N(f.gdv) + ' €'], ['Cost total estimat', N(f.totalCost) + ' €'], ['Profit potențial · ROI', N(f.profit) + ' € · ' + N(f.roi) + '%']].forEach(function (r, i) {
      var yy = cy0 + 58 + i * 6.4; pdf.text(r[0], 36, yy); pdf.setFont(FONT, 'bold'); pdf.text(r[1], W - 36, yy, { align: 'right' }); pdf.setFont(FONT, 'normal');
    });
    pdf.setTextColor(170, 150, 120); pdf.setFontSize(8.5);
    pdf.text('Generat: ' + new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }) + ' · Instrument de pre-analiză generat algoritmic', W / 2, cy0 + 102, { align: 'center' });
    pdf.setTextColor(140, 122, 96); pdf.setFontSize(7.5);
    pdf.text('Surse: metodologie HBU (IVS/ANEVAR) · Legea 169/2026 (CATUC) · POR Axa 5 · PNRR · ANPM · repere de piață RO', W / 2, cy0 + 110, { align: 'center', maxWidth: W - 50 });
    if (D) D.__cityKey = cityKey; // pt nota IVU pe copertă (stampilată universal în _buildStratTOC)
    D.setSuppress && D.setSuppress(false);

    D.chapter('Rezumat executiv');
    D.P('Prezentul studiu răspunde la întrebarea fundamentală a regenerării urbane: care este cea mai bună utilizare (Highest & Best Use) pentru un amplasament subutilizat sau industrial din ' + x.name + '? Pe baza localizării, accesibilității, cererii de piață și a constrângerilor, studiul evaluează 12 funcțiuni de reconversie și recomandă scenariul care maximizează simultan fezabilitatea economică și impactul urban pozitiv. Pentru amplasamentul analizat (suprafață ' + N(x.area) + ' mp), funcțiunea optimă este „' + R.top.n + '", cu un randament estimat de ' + N(f.roi) + '%.');
    D.callout && D.callout('Recomandare', 'Reconversie către „' + R.top.n + '" — scor de compatibilitate ' + R.scored[0].score + '/100. Valoare brută de dezvoltare (GDV) estimată ' + N(f.gdv) + ' €, cost total ' + N(f.totalCost) + ' €, profit potențial ' + N(f.profit) + ' €. Valori orientative — necesită studiu de fezabilitate și due diligence.');

    D.chapter('Metodologie');
    D.P('Analiza HBU urmează cele patru teste clasice ale evaluării imobiliare internaționale (IVS): (1) admisibilitatea legală (regimul urbanistic PUG/PUZ), (2) posibilitatea fizică (suprafață, geotehnic, constrângeri), (3) fezabilitatea financiară (rentabilitatea fiecărei utilizări), (4) productivitatea maximă (utilizarea care produce cea mai mare valoare). Scorul de compatibilitate pentru fiecare funcțiune agregă transparent: localizarea (centralitatea), accesibilitatea (transport și dotări), cererea de piață specifică și penalizările pentru constrângeri (seismic, inundabilitate, patrimoniu).');
    D.formula && D.formula('Scor de compatibilitate', 'Scor = cerere_bază + w_centralitate·Centralitate + w_acces·Accesibilitate + bonus_hub − penalizări', 'normalizat 0–100; ponderile diferă pe funcțiune (birourile favorizează centralitatea, logistica periferia)');
    D.P('Centralitatea amplasamentului analizat este estimată la ' + R.centr + '/100, iar accesibilitatea la ' + R.access + '/100. Aceste valori, combinate cu profilul economic al orașului (coeficient de polarizare ' + N(x.hub, 2) + '), determină ierarhia funcțiunilor.');

    D.chapter('Scoruri de compatibilitate — 12 funcțiuni');
    if (D.barChart) {
      D.barChart(R.scored.map(function (s, i) { return [s.n.split(' ')[0].slice(0, 10), s.score, i === 0 ? [34, 197, 94] : i < 3 ? [132, 204, 22] : [148, 163, 184]]; }), { title: 'Scor de compatibilitate pe funcțiune (0–100)', h: 56, max: 100, source: 'Model HBU UrbanX' });
    }
    if (D.table) D.table(['Funcțiune', 'Scor', 'Verdict'], R.scored.map(function (s, i) {
      return [s.n, s.score + '/100', i === 0 ? 'OPTIM' : i < 3 ? 'recomandat' : s.score >= 50 ? 'posibil' : 'nerecomandat'];
    }), [CW * 0.5, CW * 0.2, CW * 0.3]);
    D.P('Primele trei funcțiuni clasate constituie scenariile recomandate; ele reflectă potrivirea cu localizarea și cu cererea de piață. Funcțiunile cu scor sub 50 sunt nerecomandate pentru acest amplasament, fie din cauza localizării nepotrivite, fie a cererii insuficiente.');

    // hartă reală a amplasamentului
    if (mapImg) {
      try {
        D.chapter('Localizarea amplasamentului');
        D.P('Amplasamentul analizat este marcat pe hartă (●) în contextul țesutului urban. Localizarea — centralitate ' + R.centr + '/100, accesibilitate ' + R.access + '/100 — determină ierarhia funcțiunilor de reconversie din capitolul anterior.');
        var iw = CW, ih = Math.round(iw * 0.6); if (D.ensure) D.ensure(ih + 12);
        var yy = (D.y != null ? D.y : 60);
        pdf.addImage(mapImg, 'JPEG', D.dims.ML, yy, iw, ih, '', 'FAST');
        pdf.setDrawColor(146, 64, 14); pdf.setLineWidth(0.4); pdf.rect(D.dims.ML, yy, iw, ih, 'S');
        if (D.setY) D.setY(yy + ih + 2);
        if (D.source) D.source('Hartă amplasament (●) · © Mapbox, © OpenStreetMap');
      } catch (e) {}
    }

    // ── SECȚIUNE PUNCTUALĂ: date parcelă + regimul urbanistic al zonei (doar studiul de parcelă) ──
    if (onParcel && PC) {
      var z = PC.zone || {};
      D.chapter('Identificarea parcelei și a zonei');
      D.P('Studiul de față este PUNCTUAL: analizează parcela selectată și ZONA (unitatea teritorială de referință — UTR / subzona) din care face parte, nu întregul teritoriu administrativ. Spre deosebire de studiul teritorial, aici reglementările și indicatorii sunt cei aplicabili efectiv parcelei, iar concluziile privesc strict acest amplasament.');
      if (D.table) D.table(['Atribut parcelă', 'Valoare'], [
        ['Identificator cadastral (CF/nr. cad.)', PC.nrcad || 'neidentificat (selectați parcela)'],
        ['Suprafață', PC.area ? N(PC.area) + ' mp' : '—'],
        ['Coordonate (centroid)', PC.lat != null ? N(PC.lat, 5) + '°N, ' + N(PC.lon, 5) + '°E' : '—'],
        ['Perimetru', PC.shape && PC.shape.perimetru ? N(PC.shape.perimetru) + ' m' : '—'],
        ['Deschidere (latura max.)', PC.shape && PC.shape.latura_max ? N(PC.shape.latura_max) + ' m' : '—'],
        ['Indice de compactare (1=cerc)', PC.shape && PC.shape.compactare != null ? N(PC.shape.compactare, 2) : '—'],
        ['UTR / zonă funcțională', (z.utrNr || '—') + (z.code ? ' · ' + z.code : '') + (z.denumire ? ' — ' + z.denumire : '')]
      ], [CW * 0.5, CW * 0.5]);

      D.chapter('Regimul urbanistic al parcelei (PUG)');
      if (z.pot != null || z.cut != null || z.hmax != null) {
        D.P('Indicatorii de mai jos sunt extrași din regulamentul local de urbanism (RLU/PUG) pentru zona din care face parte parcela și constituie cadrul în care se testează admisibilitatea legală a funcțiunilor de reconversie (Testul 1 HBU).');
        if (D.table) D.table(['Indicator urbanistic', 'Valoare reglementată'], [
          ['POT maxim', z.pot != null ? N(z.pot) + ' %' : 'nereglementat în date'],
          ['CUT maxim', z.cut != null ? N(z.cut, 2) : 'nereglementat în date'],
          ['Înălțime maximă', z.hmax != null ? N(z.hmax, 1) + ' m' : '—'],
          ['Regim de înălțime', z.regim || (z.niv ? 'cca. P+' + Math.max(0, (z.niv - 1)) : '—')],
          ['Retragere frontală', z.retragere_fata || '—'],
          ['Retragere laterală', z.retragere_laterala || '—'],
          ['Retragere posterioară', z.retragere_spate || '—'],
          ['Spații verzi minime', z.spatii_verzi_pct != null ? N(z.spatii_verzi_pct) + ' %' : '—']
        ], [CW * 0.5, CW * 0.5]);
        if (z.utilizari_admise) D.P('Utilizări admise: ' + z.utilizari_admise);
        if (z.utilizari_conditionate) D.P('Utilizări admise cu condiționări: ' + z.utilizari_conditionate);
        if (z.utilizari_interzise) D.P('Utilizări interzise: ' + z.utilizari_interzise);
        if (D.source) D.source('Sursă reglementări: ' + (z.sursa || 'RLU/PUG al UAT') + ' · indicatori aplicabili zonei parcelei');
        // edificabil teoretic pe ACEASTĂ parcelă
        if (PC.edif && PC.area) {
          D.chapter('Edificabilul teoretic pe parcelă');
          D.P('Pornind de la suprafața parcelei (' + N(PC.area) + ' mp) și de la indicatorii zonei, capacitatea maximă de edificare se estimează astfel:');
          D.formula && D.formula('Amprentă la sol și arie construită', 'Amprenta = POT × S_teren ; ADC = CUT × S_teren', 'POT = procent de ocupare a terenului; CUT = coeficient de utilizare; S_teren = suprafața parcelei');
          var er = [];
          if (PC.edif.amprenta != null) er.push(['Amprentă maximă la sol (POT)', N(PC.edif.amprenta) + ' mp']);
          if (PC.edif.adc != null) er.push(['Arie desfășurată construită maximă (CUT)', N(PC.edif.adc) + ' mp']);
          if (PC.edif.niv) er.push(['Număr orientativ de niveluri', 'cca. ' + PC.edif.niv]);
          if (D.table && er.length) D.table(['Capacitate de edificare', 'Estimare pe parcelă'], er, [CW * 0.6, CW * 0.4]);
          D.P('Aceste valori sunt plafoane teoretice; capacitatea efectiv valorificabilă depinde de forma și deschiderea parcelei, de retrageri, de accese și de constrângerile tehnice. Analiza financiară din capitolul următor calibrează scenariul recomandat pe acest edificabil.');
        }
      } else {
        D.P('Regulamentul urbanistic detaliat (POT/CUT/regim) nu este disponibil în datele platformei pentru zona acestei parcele' + (z.utrNr ? ' (UTR ' + z.utrNr + ')' : '') + '. Se recomandă obținerea certificatului de urbanism, care stabilește oficial reglementările aplicabile. Restul analizei HBU rămâne valabil ca pre-orientare.');
      }

      // vecinătate imediată (dotări <500m) — captură + bilanț (reutilizarea straturilor POI)
      if (nbImg && nbImg.url) {
        D.chapter('Vecinătatea imediată — dotări la sub 500 m');
        D.P('Accesibilitatea la dotări în proximitate este un factor direct al celei mai bune utilizări: o parcelă bine deservită susține funcțiuni rezidențiale și mixte, în timp ce deficitul de dotări orientează către alte utilizări. Harta marchează amplasamentul (●) și dotările identificate în jur (date OpenStreetMap, rază 500 m).');
        try {
          var iw2 = CW, ih2 = Math.round(iw2 * 0.6); if (D.ensure) D.ensure(ih2 + 12);
          var yy2 = (D.y != null ? D.y : 60);
          pdf.addImage(nbImg.url, 'JPEG', D.dims.ML, yy2, iw2, ih2, '', 'FAST');
          pdf.setDrawColor(146, 64, 14); pdf.setLineWidth(0.4); pdf.rect(D.dims.ML, yy2, iw2, ih2, 'S');
          if (D.setY) D.setY(yy2 + ih2 + 2);
          if (D.source) D.source('Dotări în rază de 500 m · © OpenStreetMap (interogare live)');
        } catch (e) {}
        var ck = Object.keys(nbImg.counts || {});
        if (ck.length && D.barChart) D.barChart(ck.map(function (k, i) { var pal = [[245, 158, 11], [239, 68, 68], [96, 165, 250], [34, 197, 94], [6, 182, 212], [148, 163, 184]]; return [k, nbImg.counts[k], pal[i % pal.length]]; }), { title: 'Dotări identificate în proximitate (rază 500 m)', h: 44, source: 'OpenStreetMap — date reale' });
      }

      // restricții de patrimoniu / aviz pe ACEASTĂ parcelă (zona de protecție)
      if (G._LMI && G._LMI.avizForParcel && PC.lat != null) {
        try {
          var av = await G._LMI.avizForParcel(PC.lat, PC.lon);
          if (av && av.nota) {
            D.chapter('Restricții de patrimoniu pe parcelă (avize)');
            D.P(av.nota);
            if (av.nivel && D.callout) D.callout('Nivel de avizare necesar', av.nivel);
            if (av.monumente && av.monumente.length && D.table) D.table(['Monument în proximitate', 'Grupă', 'Distanță'], av.monumente.slice(0, 8).map(function (m) { return [m.nume || m.name || 'monument', (m.aviz && m.aviz.grupa) || '—', m.dist != null ? m.dist + ' m' : '—']; }), [CW * 0.56, CW * 0.18, CW * 0.26]);
          }
        } catch (e) {}
      }
    }

    D.chapter('Analiza financiară a scenariului recomandat');
    if (D.table) D.table(['Indicator', 'Valoare'], [
      ['Suprafață teren', N(x.area) + ' mp'],
      ['CUT ipoteză', N(f.CUT, 1) + ' (calibrabil din PUG)'],
      ['Arie desfășurată construită (ADC)', N(f.adc) + ' mp'],
      ['Valoare brută dezvoltare (GDV)', N(f.gdv) + ' €'],
      ['Cost construcție + amenajare (CAPEX)', N(f.capex) + ' €'],
      ['Demolare / dezafectare', N(f.demol) + ' €'],
      ['Proiectare, avize, taxe (soft)', N(f.soft) + ' €'],
      ['Cost total', N(f.totalCost) + ' €'],
      ['Profit potențial', N(f.profit) + ' €'],
      ['Randament (ROI)', N(f.roi) + ' %']
    ], [CW * 0.55, CW * 0.45]);
    if (D.barChart) D.barChart([
      ['GDV', Math.round(f.gdv / 1000), [34, 197, 94]],
      ['CAPEX', Math.round(f.capex / 1000), [239, 68, 68]],
      ['Demolare', Math.round(f.demol / 1000), [249, 115, 22]],
      ['Soft', Math.round(f.soft / 1000), [234, 179, 8]],
      ['Cost total', Math.round(f.totalCost / 1000), [185, 28, 28]],
      ['Profit', Math.round(f.profit / 1000), [22, 163, 74]]
    ], { title: 'Structura financiară a scenariului recomandat (mii €)', h: 54, source: 'Model HBU UrbanX — metoda valorii reziduale' });
    if (D.barChart) D.barChart([
      ['Pesimist −15%', Math.round((f.adc * R.top.valEur * 0.85 - f.totalCost * 1.15) / (f.totalCost * 1.15) * 100), [239, 68, 68]],
      ['Bază', f.roi, [59, 130, 246]],
      ['Optimist +15%', Math.round((f.adc * R.top.valEur * 1.15 - f.totalCost) / f.totalCost * 100), [34, 197, 94]]
    ], { title: 'Randament (ROI %) — analiză de sensibilitate', h: 44, source: 'Model HBU UrbanX' });
    D.P('Analiza folosește metoda valorii reziduale: din valoarea brută de dezvoltare (GDV) se scad costurile totale pentru a obține profitul și randamentul. Valorile sunt orientative, calibrate pe repere de piață românești; un ROI peste 15–20% indică un proiect atractiv pentru dezvoltatori, în timp ce un ROI sub pragul de risc poate justifica instrumente de sprijin public (regenerare urbană, parteneriat public-privat).');

    // dotări urbane (POI OSM) la nivel teritorial — reutilizarea capturilor din carduri (#14)
    if (territorial) { try { if (G._DocMapCaptures && G._DocMapCaptures.poiSection) await G._DocMapCaptures.poiSection(D, cityKey, 'Dotări urbane și accesibilitate la servicii (OSM)'); } catch (e) {} }

    // ── Corpul dezvoltat: teritorial (_HBU_DEEP, 100+ pag) sau parcelă (_HBU_DEEP_PARCEL, ~50 pag punctual) ──
    try {
      var deep = territorial ? (G._HBU_DEEP || []) : (G._HBU_DEEP_PARCEL || G._HBU_DEEP || []);
      deep.forEach(function (ch, _ci) {
        if (!ch || !ch.title) return;
        D.chapter(ch.title); var _vis = false;
        (ch.blocks || []).forEach(function (bl) {
          try {
            if (bl.type === 'p' && bl.text) D.P(bl.text);
            else if (bl.type === 'bullets' && bl.items && bl.items.length && D.bullets) D.bullets(bl.items);
            else if (bl.type === 'table' && bl.headers && bl.rows && bl.rows.length && D.table) {
              var nc = bl.headers.length || 1; D.table(bl.headers, bl.rows, bl.headers.map(function () { return CW / nc; }));
              _autoChart(D, bl.headers, bl.rows); _vis = true;
            }
          } catch (e) {}
        });
        if (!_vis) { try { if (G._chapterGraphic) G._chapterGraphic(D, _ci); } catch (e) {} }
      });
    } catch (e) {}

    // restricții patrimoniu + niveluri de avizare LMI (serviciu comun)
    try { if (G._LMI && G._LMI.renderSection) await G._LMI.renderSection(D, cityKey); } catch (e) {}

    D.chapter('Constrângeri și due diligence');
    D.bullets([
      'Urbanistice: regimul PUG/PUZ trebuie verificat — reconversia poate necesita modificare de PUZ (schimbare funcțiune, indici);',
      'Mediu: terenurile industriale necesită investigare a contaminării solului (sit potențial contaminat — ANPM) înainte de funcțiuni sensibile (rezidențial, educație, sănătate);',
      'Seismic: accelerația de proiectare ag = ' + N(x.ag, 2) + 'g impune cerințe structurale pentru construcțiile noi;',
      'Patrimoniu: halele industriale valoroase pot avea valoare de patrimoniu industrial (reconversie cu păstrarea structurii);',
      'Infrastructură: capacitatea rețelelor edilitare și a accesurilor trebuie verificată pentru noua funcțiune.'
    ]);
    D.P('Aceste constrângeri pot modifica semnificativ fezabilitatea și costurile; studiul HBU este o pre-analiză de orientare, iar decizia finală necesită studiu de fezabilitate, expertiză tehnică și due diligence juridic și de mediu.');

    D.chapter('Cadrul legal și procedura de avizare');
    D.P('Reconversia presupune, de regulă, schimbarea funcțiunii și a indicatorilor urbanistici față de PUG-ul în vigoare, ceea ce impune elaborarea și aprobarea unui Plan Urbanistic Zonal (PUZ) conform Legea 169/2026 (CATUC). Procedura include: certificatul de urbanism, avizul de oportunitate, elaborarea PUZ și a regulamentului local aferent, avizele de specialitate (mediu, utilități, ISU, circulație, după caz patrimoniu), consultarea și informarea publicului, și aprobarea prin hotărâre a consiliului local. Durata tipică este de 12–24 luni și trebuie inclusă în calendarul și bugetul proiectului.');
    D.P('Pentru siturile cu valoare de patrimoniu sau aflate în zone protejate, sunt necesare avize suplimentare (Ministerul Culturii / direcțiile județene pentru cultură). Pentru terenurile potențial contaminate, certificarea privind calitatea solului condiționează funcțiunile sensibile. Alinierea propunerii la documentele strategice superioare (SIDU, PUG) crește predictibilitatea avizării și eligibilitatea pentru finanțare.');

    D.chapter('Cererea de piață');
    D.P('Ierarhia funcțiunilor reflectă cererea estimată pe segmente: în orașele cu polarizare economică ridicată, birourile, hotelurile și funcțiunile tech au cerere susținută în zonele centrale și bine conectate; rezidențialul și mixtul au cerere largă și stabilă; logistica și producția ușoară sunt favorizate periferic, lângă infrastructura majoră de transport. Corelarea cu studiul de piață imobiliară (Market) și cu harta de valori a platformei rafinează aceste estimări cu prețuri €/mp reale pe segment.');

    D.chapter('Impactul urban al reconversiei');
    D.P('Dincolo de rentabilitatea privată, reconversia produce efecte urbane: transformarea unei zone industriale dezafectate într-o funcțiune activă elimină un „gol urban", crește baza de impozitare locală, generează locuri de muncă și activează spațiul public. Reconversia bine planificată este un instrument-cheie de regenerare urbană și de densificare a țesutului existent (în locul extinderii pe terenuri agricole), aliniat principiilor orașului compact și ale dezvoltării durabile.');
    D.P('Captarea unei părți din plusvaloarea generată de schimbarea de funcțiune (prin instrumentele de Land Value Capture) permite administrației să finanțeze infrastructura și spațiile publice asociate — vezi studiul LVC al platformei.');

    D.chapter('Etapizare și instrumente');
    D.bullets([
      'Faza 0: due diligence (urbanistic, contaminare, structură, proprietate);',
      'Faza 1: modificare PUZ și obținerea avizelor (dacă funcțiunea o cere);',
      'Faza 2: demolare/dezafectare selectivă și decontaminare;',
      'Faza 3: construcție/reabilitare pe etape;',
      'Faza 4: dare în folosință și activare spațiu public.'
    ]);
    D.P('Instrumente aplicabile: regenerare urbană (POR Axa 5), PNRR, parteneriat public-privat, captare de plusvaloare, facilități fiscale pentru reconversia siturilor contaminate (brownfield). Etapizarea reduce riscul și permite finanțare eșalonată.');

    D.chapter('Surse de finanțare');
    D.P('Reconversia siturilor subutilizate este o prioritate a politicilor europene și naționale: Programul Operațional Regional (Axa de regenerare urbană), PNRR (componenta de regenerare și eficiență energetică), fonduri pentru brownfield, precum și capital privat și parteneriate. Eligibilitatea depinde de funcțiunea propusă, de componenta de spațiu public și de obiectivele de sustenabilitate (eficiență energetică, infrastructură verde).');

    D.chapter('Context legislativ și european al reconversiei');
    D.P('Reconversia funcțională a siturilor subutilizate și industriale se desfășoară într-un cadru legislativ și de politici publice complex, a cărui cunoaștere este esențială pentru fezabilitatea proiectului. La nivel național, cadrul de referință este dat de Legea 169/2026 (CATUC) privind amenajarea teritoriului și urbanismul (care reglementează documentațiile de urbanism — PUG, PUZ, PUD — și procedura de schimbare a funcțiunii și a indicatorilor urbanistici), de Legea 169/2026 (CATUC) privind autorizarea executării lucrărilor de construcții, de Codul Civil și de legislația de mediu (OUG 195/2005, legislația privind siturile contaminate). Pentru terenurile cu potențial istoric, Legea 422/2001 privind protejarea monumentelor istorice poate impune avize și restricții suplimentare.');
    D.P('La nivel european, reconversia se aliniază obiectivelor de dezvoltare urbană durabilă din Carta de la Leipzig (orașul compact, regenerarea în locul extinderii), politicii de coeziune (Regulamentul UE 2021/1060) și Pactului Verde European. Aceste cadre nu doar reglementează, ci și finanțează: regenerarea urbană și reconversia brownfield sunt priorități explicite ale Programului Operațional Regional (Axa de dezvoltare urbană) și ale PNRR. Alinierea proiectului de reconversie la aceste obiective — densificare, eficiență energetică, infrastructură verde, mixitate funcțională — crește atât eligibilitatea pentru finanțare, cât și predictibilitatea avizării. Reconversia este, în esența ei, instrumentul prin care orașul își recuperează propriul teritoriu degradat în loc să consume teren agricol prin expansiune periferică.');

    D.chapter('Profilul detaliat al amplasamentului');
    D.P('Caracterizarea riguroasă a amplasamentului este fundamentul oricărei analize de reconversie. Amplasamentul analizat are o suprafață de ' + N(x.area) + ' mp și se află într-o poziție caracterizată printr-o centralitate estimată la ' + R.centr + '/100 și o accesibilitate de ' + R.access + '/100. Aceste două dimensiuni — proximitatea față de nucleul urban și conectivitatea la rețelele de transport și la dotări — sunt determinanții primari ai valorii și ai funcțiunilor potrivite: o poziție centrală favorizează funcțiunile cu valoare adăugată mare (birouri, hotelier, rezidențial premium, mixt), în timp ce o poziție periferică, dar bine conectată la infrastructura majoră, favorizează logistica și producția.');
    D.P('Profilul economic al orașului-gazdă (coeficient de polarizare ' + N(x.hub, 2) + ', PIB pe cap de locuitor estimat) determină adâncimea cererii pe fiecare segment funcțional. Un oraș cu polarizare ridicată — pol regional cu universități, servicii și industrie — generează o cerere susținută pentru birouri, cazare și funcțiuni tehnologice, în timp ce un oraș mai mic are o cerere concentrată pe rezidențial și comerț de proximitate. Profilul amplasamentului trebuie completat, în faza de fezabilitate, cu o ridicare topografică, un studiu geotehnic, o investigare a stării construcțiilor existente și o verificare a regimului juridic al proprietății.');

    D.chapter('Testul 1 — Admisibilitatea legală');
    D.P('Primul test al metodologiei Highest & Best Use verifică ce funcțiuni sunt permise legal pe amplasament. Aceasta presupune analiza regimului urbanistic actual (zona funcțională din PUG, indicatorii POT/CUT, regimul de înălțime, funcțiunile admise și interzise) și identificarea modificărilor necesare pentru funcțiunea propusă. Dacă funcțiunea optimă din punct de vedere economic nu este permisă de PUG-ul în vigoare, este necesară elaborarea unui Plan Urbanistic Zonal (PUZ) care să modifice reglementarea — un proces cu durată și cost proprii, care trebuie inclus în analiza de fezabilitate.');
    D.P('Servituțile (de utilitate publică, de trecere, de protecție a rețelelor sau a monumentelor), zonele de protecție și eventualele litigii de proprietate restrâng la rândul lor spectrul funcțiunilor admisibile. O funcțiune poate fi excelentă economic, dar imposibil legal — de aceea testul de admisibilitate precede testele economice. Rezultatul acestui test este lista funcțiunilor legal posibile, care constituie universul de analiză pentru testele următoare.');

    D.chapter('Testul 2 — Posibilitatea fizică');
    D.P('Al doilea test verifică ce funcțiuni sunt posibile fizic pe amplasament, dat fiind caracteristicile terenului și ale construcțiilor existente. Factorii relevanți: suprafața și forma terenului (care determină eficiența ocupării), condițiile geotehnice și hidrogeologice (capacitatea portantă, nivelul apei freatice, riscul de lichefiere), accesibilitatea pentru construcție și pentru funcționarea ulterioară, capacitatea rețelelor edilitare existente (apă, canalizare, energie, gaz, telecomunicații) și starea structurilor existente (dacă se urmărește reconversia adaptivă).');
    D.P('Accelerația seismică de proiectare de ' + N(x.ag, 2) + 'g (conform codului P100-1/2022) impune cerințe structurale specifice pentru construcțiile noi și condiționează fezabilitatea reconversiei adaptive a structurilor existente (care pot necesita consolidare). Constrângerile fizice pot elimina sau scumpi semnificativ anumite funcțiuni — de exemplu, o funcțiune cu sarcini mari (logistică, producție) pe un teren cu portanță redusă, sau o funcțiune sensibilă pe un teren contaminat. Rezultatul testului este lista funcțiunilor fizic realizabile, cu estimarea constrângerilor și a costurilor asociate.');

    D.chapter('Analiza aprofundată a cererii de piață, pe funcțiuni');
    D.P('Testul fezabilității financiare se sprijină pe o analiză detaliată a cererii pe fiecare segment. Pe segmentul rezidențial, cererea este susținută de dinamica demografică, de formarea de noi gospodării și de accesibilitatea creditului; reconversia către locuințe colective este, de regulă, o opțiune solidă în zonele bine deservite, cu absorbție previzibilă. Pe segmentul de birouri, cererea depinde de profilul economic (prezența serviciilor, IT, sectorului public) și de calitatea conectivității; este favorizată în zonele centrale și de afaceri. Segmentul hotelier și de cazare răspunde la potențialul turistic și de afaceri al orașului, fiind sensibil la sezonalitate și la evenimente.');
    D.P('Comerțul și retailul depind de fluxurile pietonale și de puterea de cumpărare locală; reconversia către retail funcționează cel mai bine pe artere comerciale active și în zone dense. Logistica și depozitarea au cerere în creștere odată cu comerțul electronic, dar necesită amplasamente periferice cu acces facil la infrastructura majoră de transport. Funcțiunile culturale, creative și tech adaugă valoare urbană și de imagine, fiind potrivite pentru reconversia adaptivă a halelor cu valoare arhitecturală, dar cu o cerere mai de nișă. Pentru fiecare segment, prețurile €/mp și ratele de absorbție se calibrează pe tranzacțiile comparabile reale din oraș (vezi studiul de piață și harta de valori ale platformei).');

    D.chapter('Starea tehnică și structura existentă');
    D.P('Pentru siturile cu construcții existente, evaluarea stării tehnice este decisivă în alegerea între demolare totală și reconversie adaptivă. Halele industriale au, frecvent, structuri robuste (cadre metalice sau de beton cu deschideri mari și înălțimi generoase) care se pretează la reconversie pentru funcțiuni ce valorifică spațialitatea — loft-uri rezidențiale, spații de birouri tip open-space, hub-uri culturale și creative, spații comerciale de tip mall sau market. Expertiza tehnică stabilește capacitatea portantă reziduală, gradul de degradare, conformitatea seismică și intervențiile de consolidare necesare.');
    D.P('Costul reconversiei adaptive trebuie comparat cu cel al demolării și reconstrucției, ținând cont nu doar de costul direct, ci și de durată, de riscuri și de valoarea adăugată de caracterul autentic al structurii păstrate. În multe cazuri, reconversia adaptivă oferă un raport valoare-cost superior și un avantaj de imagine și sustenabilitate (conservarea carbonului înglobat), motiv pentru care a devenit abordarea preferată în regenerarea urbană contemporană.');

    D.chapter('Mediu: investigarea și remedierea contaminării');
    D.P('Siturile industriale sunt, prin definiție, suspecte de contaminare a solului și a apei subterane (hidrocarburi, metale grele, solvenți), în funcție de activitatea anterioară. Investigarea preliminară (faza I — istoric și inspecție) și, dacă e cazul, detaliată (faza II — prelevări și analize) este obligatorie înainte de funcțiunile sensibile (rezidențial, educație, sănătate, spații verzi cu acces public). Costul și durata remedierii (decontaminării) pot fi semnificative și pot modifica radical fezabilitatea — un sit puternic contaminat poate fi rentabil doar pentru funcțiuni mai puțin sensibile sau cu sprijin public pentru remediere.');
    D.P('Cadrul de reglementare (legislația privind siturile contaminate, autoritatea de mediu — ANPM) stabilește pragurile și procedurile. Politicile de regenerare a brownfield-urilor includ, tot mai des, facilități și fonduri pentru decontaminare, recunoscând că recuperarea acestor situri are un beneficiu public (eliminarea unei surse de poluare, recuperarea de teren în intravilan). Strategia de remediere și costul ei sunt componente obligatorii ale studiului de fezabilitate și ale analizei de risc.');

    D.chapter('Patrimoniu industrial și reconversie adaptivă');
    D.P('Multe situri industriale conțin construcții cu valoare arhitecturală sau de memorie locală (hale cu structuri metalice remarcabile, coșuri, ansambluri de epocă). Reconversia adaptivă — păstrarea și reutilizarea structurii existente în loc de demolare — reduce amprenta de carbon (carbonul înglobat este conservat), scurtează durata și poate genera identitate și valoare de piață superioară (loft-uri, huburi creative, spații culturale). Demolarea totală este justificată doar când structura este degradată sau incompatibilă cu funcțiunea propusă.');
    D.P('Decizia între demolare și reconversie adaptivă se ia după o expertiză tehnică a structurii și o evaluare a valorii de patrimoniu industrial. Acolo unde structura permite, reconversia adaptivă este, de regulă, atât mai sustenabilă, cât și mai atractivă din punct de vedere urban și comercial — un argument tot mai puternic în contextul obiectivelor de decarbonare.');

    D.chapter('Riscuri și măsuri de mitigare');
    D.bullets([
      'Risc de contaminare (sol/apă): investigare preliminară + decontaminare; cost și durată potențial mari — afectează direct fezabilitatea funcțiunilor sensibile;',
      'Risc urbanistic: respingerea/întârzierea modificării de PUZ; mitigare prin dialog timpuriu cu autoritatea și aliniere la SIDU;',
      'Risc de piață: supraoferta pe segmentul ales; mitigare prin mix funcțional și etapizare;',
      'Risc de cost: depășiri la demolare/structură; mitigare prin expertiză tehnică în faza 0 și marjă de contingență;',
      'Risc de absorbție: ritm de vânzare/închiriere mai lent; mitigare prin pre-comercializare și fazare.'
    ]);
    D.P('Gestionarea proactivă a acestor riscuri în faza de pre-analiză și fezabilitate este ceea ce diferențiază un proiect de reconversie reușit de unul blocat. Matricea de risc trebuie actualizată pe parcursul proiectului.');

    D.chapter('Comparabile și precedente');
    D.P('Reconversia siturilor industriale are precedente bine documentate la nivel european și românesc: foste platforme industriale transformate în cartiere mixte, hub-uri tehnologice, spații culturale sau parcuri. Aceste precedente oferă repere pentru indicii de densitate realizabili, pentru mixul funcțional optim și pentru instrumentele de finanțare și guvernanță utilizate. Analiza comparabilelor locale (tranzacții și proiecte similare din același oraș sau regiune) calibrează ipotezele de valoare și cost ale studiului, reducând incertitudinea estimărilor financiare.');

    D.chapter('Analiză de sensibilitate financiară');
    D.P('Rentabilitatea reconversiei depinde critic de două variabile incerte: valoarea de vânzare/închiriere realizată (€/mp) și costul total. Analiza de sensibilitate testează robustețea scenariului recomandat la variații ale acestor parametri, evitând o decizie bazată pe un singur set de ipoteze.');
    if (D.table) {
      var v0 = R.top.valEur, ct = f.totalCost, adc = f.adc;
      var rowS = function (dv) {
        var gdv2 = Math.round(adc * v0 * (1 + dv / 100));
        var roiOpt = Math.round((gdv2 - ct) / ct * 100);
        var roiPesim = Math.round((gdv2 - ct * 1.15) / (ct * 1.15) * 100);
        return [(dv >= 0 ? '+' : '') + dv + '% valoare', N(gdv2) + ' €', N(roiOpt) + ' %', N(roiPesim) + ' %'];
      };
      D.table(['Scenariu valoare', 'GDV', 'ROI (cost de bază)', 'ROI (cost +15%)'], [rowS(-15), rowS(0), rowS(15)], [CW * 0.3, CW * 0.25, CW * 0.22, CW * 0.23]);
    }
    D.P('Tabelul arată cât de sensibil este randamentul la variațiile de piață și de cost. Dacă proiectul rămâne rentabil chiar în scenariul pesimist (valoare −15% și cost +15%), decizia de investiție este robustă; dacă devine nerentabil, este necesară fie o reconsiderare a funcțiunii, fie sprijin public (regenerare urbană), fie o etapizare care reduce expunerea la risc. Pragul uzual de atractivitate pentru capitalul privat este un ROI peste 15–20%.');

    D.chapter('Indicatori de monitorizare');
    if (D.table) D.table(['Indicator', 'Țintă / prag'], [
      ['Suprafață reconvertită (din situl țintă)', '> 80% utilizare activă'],
      ['Mix funcțional (entropie utilizare)', 'echilibrat (evită monofuncțional)'],
      ['Spațiu public nou generat', '> 15% din suprafață'],
      ['Locuri de muncă create', 'monitorizat anual'],
      ['Creștere bază de impozitare locală', 'pozitivă vs. starea industrială'],
      ['Plusvaloare captată (LVC)', 'reinvestită în infrastructură/spațiu public']
    ], [CW * 0.6, CW * 0.4]);
    D.P('Monitorizarea post-implementare validează ipotezele studiului și permite ajustarea politicilor de regenerare. Indicatorii se raportează periodic și se corelează cu Nota UrbanX (IVU) a orașului — o reconversie reușită îmbunătățește dimensiunile economică, de mediu și de calitate a vieții.');

    // Nota UrbanX (IVU)
    try { if (G.UrbanXIVU && G.UrbanXIVU.renderSection) G.UrbanXIVU.renderSection(D, cityKey); } catch (e) {}

    D.chapter('Limitări și disclaimer');
    D.P('Studiu generat algoritmic (UrbanX HBU) ca PRE-ANALIZĂ de reconversie. Scorurile și valorile financiare sunt orientative, bazate pe modele transparente și repere de piață, și NU substituie studiul de fezabilitate, raportul de evaluare ANEVAR, expertiza tehnică sau due diligence-ul juridic și de mediu. Regimul urbanistic și constrângerile reale (contaminare, structură, proprietate) trebuie verificate. Decizia de investiție rămâne responsabilitatea beneficiarului.');

    D.chapter('Surse și standarde');
    D.P('Metodologie HBU (Highest & Best Use) — Standardele Internaționale de Evaluare (IVS) și standardele ANEVAR; Legea 169/2026 (CATUC) (urbanism); POR Axa 5 (regenerare urbană); PNRR; repere de cost și valoare de piață RO. Date amplasament: ' + (x.hasParcel ? N(x.lat, 4) + '°N, ' + N(x.lon, 4) + '°E' : 'centru UAT (selectați o parcelă pentru analiză punctuală)') + '. Metodologie UrbanX · ThinkSmart Solutions.');

    var fn = (G._stratFileName ? G._stratFileName('HBU', { territorial: territorial, localitate: x.name, nrcad: (PC && PC.nrcad) }) : ('HBU_' + (x.name || 'UAT') + '.pdf'));
    G._buildStratTOC && G._buildStratTOC(D, 1);
    pdf.save(fn); G.ss && ss('✅ Studiu de reconversie generat: ' + pdf.getNumberOfPages() + ' pagini'); return fn;
  }

  // ── Panou rapid ──────────────────────────────────────────────────────────
  function openPanel(cityKey) {
    var R = compute(cityKey); var x = R.x;
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9300;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var rows = R.scored.slice(0, 8).map(function (s, i) {
      var c = s.score >= 70 ? '#22c55e' : s.score >= 55 ? '#84cc16' : s.score >= 45 ? '#f59e0b' : '#94a3b8';
      return '<div style="display:flex;align-items:center;gap:8px;margin:4px 0"><div style="width:150px;font-size:11px;color:#cbd5e1">' + (i === 0 ? '★ ' : '') + s.n + '</div><div style="flex:1;height:9px;background:#0a1120;border-radius:5px;overflow:hidden"><div style="height:100%;width:' + s.score + '%;background:' + c + '"></div></div><div style="width:34px;text-align:right;font-size:11px;font-weight:700;color:' + c + '">' + s.score + '</div></div>';
    }).join('');
    ov.innerHTML = '<div style="background:#0b1424;color:#e6edf7;width:min(640px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(146,64,14,.5);border-radius:14px;font-family:system-ui,sans-serif;padding:18px 20px">' +
      '<div style="font-weight:800;font-size:16px">🏗 Reconversie (HBU) — ' + x.name + '</div>' +
      '<div style="font-size:11px;color:#94a3b8;margin:2px 0 12px">' + (x.hasParcel ? 'Amplasament selectat · ' + N(x.area) + ' mp' : 'Centru UAT — selectează o parcelă pentru analiză punctuală') + ' · centralitate ' + R.centr + '/100 · accesibilitate ' + R.access + '/100</div>' +
      '<div style="background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.3);border-radius:8px;padding:10px;margin-bottom:10px"><div style="font-size:11px;color:#86efac;font-weight:700">Funcțiune optimă: ' + R.top.n + '</div><div style="font-size:11px;color:#cbd5e1;margin-top:3px">GDV ' + N(R.fin.gdv) + ' € · cost ' + N(R.fin.totalCost) + ' € · profit ' + N(R.fin.profit) + ' € · ROI ' + N(R.fin.roi) + '%</div></div>' +
      rows +
      '<div style="display:flex;gap:8px;margin-top:12px"><button onclick="window._HBU.generatePDF(window.TCI&&window.TCI.cityKey)" style="flex:1;background:linear-gradient(180deg,#d97706,#92400e);color:#fff;border:0;border-radius:9px;padding:10px;font-weight:700;cursor:pointer">📄 Studiu reconversie (PDF)</button>' +
      '<button onclick="this.closest(\'div[style*=fixed]\').remove()" style="background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:9px;padding:10px 14px;cursor:pointer">Închide</button></div>' +
      '<div style="font-size:9px;color:#64748b;margin-top:10px">Model HBU transparent (localizare + accesibilitate + cerere + constrângeri). Pre-analiză orientativă — necesită fezabilitate + due diligence.</div></div>';
    document.body.appendChild(ov);
  }

  G._HBU = { compute: compute, generatePDF: generatePDF, openPanel: openPanel, USES: USES };
  console.log('[HBU] ✅ Studiu de reconversie urbană (Highest & Best Use) încărcat');
})(window);
