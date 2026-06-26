// ═══════════════════════════════════════════════════════════════════════════
// urbanx-rcai.js — RCAI · Raport de Cercetare Arheologică și Evaluarea
// Potențialului Arheologic. Document de RANG SUPERIOR (țintă 100+ pag), pe parcelă
// → meniul Rapoarte. Conținut profund din workflow (_RCAI_DEEP) + date OSM historic.
// window._RCAI.generatePDF(cityKey) · .openPanel() · 26 iunie 2026 · ThinkSmart Solutions
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  function N(v, d) { try { return Number(v).toLocaleString('ro-RO', { maximumFractionDigits: d == null ? 0 : d }); } catch (e) { return '' + v; } }
  function _num(s) { if (typeof s === 'number') return s; if (s == null) return null; var m = ('' + s).replace(/\./g, '').replace(/,/g, '.').match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : null; }
  function _autoChart(D, headers, rows, title) {
    try {
      if (!D.barChart || !rows || rows.length < 2 || rows.length > 14) return;
      var li = (headers ? headers.length : (rows[0] ? rows[0].length : 0)) - 1; if (li < 1) return;
      var vals = rows.map(function (r) { return _num(r[li]); });
      var ok = vals.filter(function (v) { return v != null; }).length;
      if (ok < rows.length || ok < 2) return;
      var uniq = {}; vals.forEach(function (v) { uniq[v] = 1; }); if (Object.keys(uniq).length < 2) return;
      var pal = [[180, 83, 9], [245, 158, 11], [217, 119, 6], [168, 85, 247], [59, 130, 246], [22, 163, 74]];
      var data = rows.map(function (r, i) { var lb = ('' + (r[0] || ('#' + (i + 1)))).replace(/\s+/g, ' ').trim().slice(0, 16); return [lb, vals[i], pal[i % pal.length]]; });
      D.barChart(data, { title: title || ((headers && headers[li]) || 'Valori') + ' — reprezentare grafică', h: Math.min(58, 26 + data.length * 4), source: 'Date din tabelul de mai sus' });
    } catch (e) {}
  }

  function _ctx(cityKey, mode) {
    var db = G._RO_CITIES_DB || {}; var c = db[cityKey] || (G.TCI && G.TCI.cityData) || {};
    var ap = (mode === 'T') ? null : (G._activeParcel || G._selectedParcel || null); // mode T = teritorial (ignoră parcela)
    var lat = (ap && ap.lat) || c.lat || 47, lon = (ap && ap.lon) || c.lon || 27;
    return { city: c, name: c.name || 'UAT', judet: c.judet || '', lat: lat, lon: lon, hasParcel: !!(ap && ap.lat), area: (ap && (ap.area || ap.suprafata)) || null };
  }

  var PROXY = (G._PROXY_BASE || 'https://urbanx-proxy.3dtravelsoftart.workers.dev');
  // fetch monumente/situri REALE din OSM (historic/heritage/biserici) lângă amplasament/UAT
  async function _fetchHeritage(lat, lon, radius) {
    var q = '[out:json][timeout:25];(' +
      'nwr(around:' + radius + ',' + lat + ',' + lon + ')[historic];' +
      'nwr(around:' + radius + ',' + lat + ',' + lon + ')[heritage];' +
      'nwr(around:' + radius + ',' + lat + ',' + lon + ')[tourism=attraction];' +
      ');out center tags;'; // fără [name] (al doilea filtru returna 0); numele se filtrează în cod
    try {
      var resp = await fetch(PROXY + '/osm?q=' + encodeURIComponent(q), { signal: AbortSignal.timeout(35000) });
      var j = await resp.json(); var els = (j && j.elements) || [];
      var seen = {}, out = [];
      els.forEach(function (el) {
        var t = el.tags || {}; var nm = t.name || t['name:ro']; if (!nm || seen[nm]) return; seen[nm] = 1;
        var la = el.lat != null ? el.lat : (el.center && el.center.lat), lo = el.lon != null ? el.lon : (el.center && el.center.lon);
        var dist = (la != null && G.turf) ? Math.round(G.turf.distance([lon, lat], [lo, la], { units: 'meters' })) : null;
        var tip = t.historic || (t.amenity === 'place_of_worship' ? (t.religion ? 'lăcaș de cult (' + t.religion + ')' : 'lăcaș de cult') : '') || t.tourism || t.heritage || 'obiectiv';
        out.push({ name: nm, tip: tip, dist: dist, lat: la, lon: lo, heritage: t.heritage || (t['ref:ro:lmi'] ? 'LMI ' + t['ref:ro:lmi'] : '') });
      });
      out.sort(function (a, b) { return (a.dist || 1e9) - (b.dist || 1e9); });
      return out;
    } catch (e) { console.warn('[RCAI heritage]', e); return []; }
  }

  // captură REALĂ a hărții Mapbox cu monumentele și amplasamentul desenate
  async function _captureMap(lat, lon, heritage) {
    var m = G.map; if (!m || !m.getCanvas || !G.turf) return null;
    var ids = ['rcai-her-pt', 'rcai-her-lb', 'rcai-site-pt'], srcs = ['rcai-her-src', 'rcai-site-src'];
    function cleanup() { ids.forEach(function (i) { try { if (m.getLayer(i)) m.removeLayer(i); } catch (e) {} }); srcs.forEach(function (s) { try { if (m.getSource(s)) m.removeSource(s); } catch (e) {} }); }
    try {
      cleanup();
      var pts = heritage.filter(function (h) { return h.lat; }).slice(0, 60).map(function (h) { return { type: 'Feature', geometry: { type: 'Point', coordinates: [h.lon, h.lat] }, properties: { n: h.name } }; });
      var fc = { type: 'FeatureCollection', features: pts };
      var site = { type: 'FeatureCollection', features: [{ type: 'Feature', geometry: { type: 'Point', coordinates: [lon, lat] }, properties: {} }] };
      m.addSource('rcai-her-src', { type: 'geojson', data: fc });
      m.addSource('rcai-site-src', { type: 'geojson', data: site });
      m.addLayer({ id: 'rcai-her-pt', type: 'circle', source: 'rcai-her-src', paint: { 'circle-radius': 5, 'circle-color': '#f59e0b', 'circle-stroke-color': '#1a1206', 'circle-stroke-width': 1.5, 'circle-opacity': 0.95 } });
      m.addLayer({ id: 'rcai-her-lb', type: 'symbol', source: 'rcai-her-src', layout: { 'text-field': ['get', 'n'], 'text-size': 9, 'text-offset': [0, 1], 'text-anchor': 'top', 'text-allow-overlap': false }, paint: { 'text-color': '#fde68a', 'text-halo-color': '#0a0e1f', 'text-halo-width': 1.4 }, minzoom: 12.5 });
      m.addLayer({ id: 'rcai-site-pt', type: 'circle', source: 'rcai-site-src', paint: { 'circle-radius': 8, 'circle-color': '#ef4444', 'circle-stroke-color': '#fff', 'circle-stroke-width': 2.5 } });
      var all = pts.concat([{ geometry: { coordinates: [lon, lat] } }]);
      try { var bb = G.turf.bbox({ type: 'FeatureCollection', features: pts.length ? pts.concat([site.features[0]]) : [site.features[0]] }); m.fitBounds([[bb[0], bb[1]], [bb[2], bb[3]]], { padding: 70, maxZoom: 15.5, duration: 0 }); } catch (e) { m.jumpTo({ center: [lon, lat], zoom: 13.5 }); }
      await new Promise(function (res) { var done = false; function f() { if (!done) { done = true; res(); } } m.once('idle', f); setTimeout(f, 2600); });
      var url = m.getCanvas().toDataURL('image/jpeg', 0.85);
      cleanup();
      return url;
    } catch (e) { cleanup(); console.warn('[RCAI map]', e); return null; }
  }

  async function generatePDF(cityKey, mode) {
    var J = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF;
    if (!J || typeof G._makeStratDoc !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    var x = _ctx(cityKey, mode);
    G.ss && G.ss('🏺 Aduc monumentele reale (OSM) și generez RCAI…');
    var heritage = await _fetchHeritage(x.lat, x.lon, mode === 'T' ? 12000 : 2500);
    var mapImg = null; try { mapImg = await _captureMap(x.lat, x.lon, heritage); } catch (e) {}
    // LMI OFICIAL (INP) per județ — date reale (cod + denumire)
    var lmi = []; try {
      var jud = (cityKey || '').split('-')[1] || (x.judet || '').slice(0, 2).toUpperCase();
      if (jud) { var lr = await fetch('./data/lmi/' + jud + '.json', { signal: AbortSignal.timeout(15000) }); if (lr.ok) lmi = await lr.json(); }
    } catch (e) {}
    var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    var D = G._makeStratDoc(pdf, { docTitle: 'RAPORT DE CERCETARE ARHEOLOGICĂ', cityName: x.name, accent: [180, 83, 9] });
    var W = 210, CW = D.dims.CW, FONT = 'DejaVuRO';
    var tip = (mode === 'T') ? 'RAPORT TERITORIAL — UAT' : (x.hasParcel ? 'RAPORT SIT / PARCELĂ' : 'RAPORT ZONĂ / PARCELĂ');
    // ── COPERTĂ completă ──
    D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
    pdf.setFillColor(24, 16, 6); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(180, 83, 9); pdf.rect(0, 60, W, 1.4, 'F');
    try { if (G._drawUrbanxLogo) { G._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
    pdf.setTextColor(251, 191, 36); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · PATRIMONIU & ARHEOLOGIE', W / 2, 44, { align: 'center' });
    pdf.setTextColor(245, 158, 11); pdf.setFontSize(10); pdf.text(tip, W / 2, 72, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(20); pdf.text('RAPORT DE CERCETARE', W / 2, 90, { align: 'center' }); pdf.text('ARHEOLOGICĂ', W / 2, 100, { align: 'center' });
    pdf.setFont(FONT, 'normal'); pdf.setFontSize(12); pdf.setTextColor(230, 215, 190); pdf.text('și Evaluarea Potențialului Arheologic', W / 2, 110, { align: 'center' });
    pdf.setFont(FONT, 'bold'); pdf.setTextColor(251, 191, 36); pdf.setFontSize(15); pdf.text(D.S2(x.name + (x.judet ? ' · jud. ' + x.judet : '')), W / 2, 124, { align: 'center' });
    var cyr = 142;
    pdf.setDrawColor(180, 83, 9); pdf.setLineWidth(0.4); pdf.setFillColor(38, 24, 8);
    pdf.roundedRect(26, cyr, W - 52, 96, 3, 3, 'FD');
    pdf.setTextColor(251, 191, 36); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9.5); pdf.text('STRUCTURA RAPORTULUI', W / 2, cyr + 9, { align: 'center' });
    pdf.setFont(FONT, 'normal'); pdf.setFontSize(8.7); pdf.setTextColor(220, 205, 180);
    ['Obiectivul studiului · cadru legislativ (OG 43/2000, Legea 422/2001, norme MCIN)', 'metodologia cercetării · amplasament · analiză geomorfologică (terase, izvoare, pâraie)', 'evoluția istorică pe perioade (preistorie → antichitate → medieval → modern → comunist)', 'analiză cartografică (planuri istorice) · context arheologic (situri RAN, monumente LMI)', 'cercetări anterioare · stratigrafie estimativă · evaluarea potențialului arheologic', 'analiza riscului pentru investiție (scenarii) · recomandări și avize · concluzii', 'Nota UrbanX Patrimoniu · bibliografie · anexe'].forEach(function (l, i) { pdf.text(l, W / 2, cyr + 18 + i * 6.2, { align: 'center' }); });
    pdf.setTextColor(170, 150, 120); pdf.setFontSize(8.5);
    pdf.text('Generat: ' + new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }) + ' · Document de pre-cercetare · UrbanX TSS-FG', W / 2, cyr + 104, { align: 'center', maxWidth: W - 50 });
    D.setSuppress && D.setSuppress(false);

    D.chapter('Rezumat executiv');
    D.P('Prezentul Raport de Cercetare Arheologică și de Evaluare a Potențialului Arheologic ' + (x.hasParcel ? 'pentru amplasamentul analizat din ' : 'pentru teritoriul administrativ al ') + x.name + (x.judet ? ', județul ' + x.judet : '') + ', sintetizează cercetarea documentară, cartografică și arheologică disponibilă public, în scopul evaluării potențialului arheologic și a riscului pe care patrimoniul îngropat îl poate genera pentru o investiție. Raportul are caracter de pre-cercetare și orientează beneficiarul, proiectantul și autoritatea de avizare asupra demersurilor necesare conform legislației în vigoare (OG 43/2000, Legea 422/2001).');
    D.callout && D.callout('Statut', 'Document de PRE-CERCETARE generat algoritmic. NU înlocuiește raportul de cercetare arheologică întocmit de un arheolog autorizat MCIN și nu are valoare juridică în procedurile de avizare ale DJC sau MCIN.');

    D.chapter('Metodologia cercetării');
    D.P('Cercetarea integrează patru paliere de analiză: (1) documentară — bibliografie istorică și arheologică, repertorii, cronici; (2) cartografică — interpretarea și suprapunerea planurilor istorice (planuri de încartiruire, ridicări militare, planuri cadastrale) pe situația actuală; (3) arheologică — analiza siturilor din Repertoriul Arheologic Național (RAN), a monumentelor din Lista Monumentelor Istorice (LMI) și a cercetărilor anterioare din Cronica Cercetărilor Arheologice; (4) geomorfologică — relieful, terasele, hidrografia istorică și implicațiile lor pentru locuirea istorică și conservarea vestigiilor. Limitările sunt explicitate: accesul la unele surse poate fi parțial, iar estimările (în special stratigrafia) au caracter orientativ, prin analogie cu situri cercetate în proximitate.');

    // ── DATE REALE: monumente și situri identificate (OSM heritage / LMI) ──
    D.chapter('Monumente și situri istorice identificate (date reale)');
    if (heritage && heritage.length) {
      D.P('În urma interogării surselor cartografice deschise (OpenStreetMap — straturile historic/heritage, lăcașe de cult, obiective de patrimoniu), în ' + (mode === 'T' ? 'teritoriul ' + x.name : 'proximitatea amplasamentului (rază ~2,5 km)') + ' au fost identificate ' + heritage.length + ' obiective de patrimoniu și repere istorice. Acestea constituie contextul concret de patrimoniu al zonei și fundamentează evaluarea potențialului arheologic. Lista include monumente, lăcașe de cult istorice și obiective de interes, ordonate după distanță.');
      var rows = heritage.slice(0, 40).map(function (m) { return [m.name, m.tip, m.dist != null ? (m.dist >= 1000 ? (m.dist / 1000).toFixed(1) + ' km' : m.dist + ' m') : '—']; });
      // hartă reală cu monumentele + amplasamentul marcat
      if (mapImg) {
        try {
          var iw = CW, ih = Math.round(iw * 0.62); if (D.ensure) D.ensure(ih + 14);
          var yy = (D.y != null ? D.y : 60);
          pdf.addImage(mapImg, 'JPEG', D.dims.ML, yy, iw, ih, '', 'FAST');
          pdf.setDrawColor(180, 83, 9); pdf.setLineWidth(0.4); pdf.rect(D.dims.ML, yy, iw, ih, 'S');
          if (D.setY) D.setY(yy + ih + 2);
          if (D.source) D.source('Hartă: amplasament (●roșu) și monumente/situri identificate (●galben) · © Mapbox, © OpenStreetMap');
        } catch (e) {}
      }
      if (D.table) D.table(['Denumire', 'Tip', 'Distanță'], rows, [CW * 0.5, CW * 0.32, CW * 0.18]);
      // grafic: distribuția obiectivelor pe tip
      try {
        var byTip = {}; heritage.forEach(function (m) { var t = (m.tip || 'obiectiv').split(' (')[0]; byTip[t] = (byTip[t] || 0) + 1; });
        var tipArr = Object.keys(byTip).map(function (k) { return [k, byTip[k]]; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 10);
        if (D.barChart && tipArr.length >= 2) { var pal = [[180, 83, 9], [245, 158, 11], [217, 119, 6], [168, 85, 247], [59, 130, 246], [22, 163, 74], [236, 72, 153], [14, 165, 233]]; D.barChart(tipArr.map(function (t, i) { return [('' + t[0]).slice(0, 16), t[1], pal[i % pal.length]]; }), { title: 'Obiective de patrimoniu identificate, pe tip', h: Math.min(56, 26 + tipArr.length * 4), source: 'OpenStreetMap (historic/heritage) — date reale' }); }
      } catch (e) {}
      D.P('Notă: lista provine din date deschise (OSM) și are caracter orientativ; pentru inventarul oficial complet se consultă Lista Monumentelor Istorice (LMI/MCIN) și Repertoriul Arheologic Național (RAN/CIMEC). Proximitatea acestor obiective față de amplasament este un indicator direct al potențialului arheologic — cu cât densitatea reperelor istorice este mai mare, cu atât probabilitatea descoperirii de vestigii crește.');
      if (heritage.length > 40) D.P('(Au fost listate primele 40 de obiective din cele ' + heritage.length + ' identificate, în ordinea distanței.)');
    } else {
      D.P('Interogarea surselor deschise (OSM) nu a returnat obiective de patrimoniu denumite în raza analizată la momentul generării. Aceasta NU exclude existența unor situri sau monumente — multe nu sunt cartografiate în sursele deschise. Se impune consultarea inventarelor oficiale: Lista Monumentelor Istorice (LMI/MCIN) și Repertoriul Arheologic Național (RAN/CIMEC), precum și a Direcției Județene pentru Cultură.');
    }

    // ── DATE OFICIALE: Lista Monumentelor Istorice (LMI / INP) pe județ ──
    if (lmi && lmi.length) {
      D.chapter('Monumente istorice clasate — LMI oficial (INP)');
      D.P('Conform Listei Monumentelor Istorice (LMI) — sursă oficială Institutul Național al Patrimoniului (INP) / Ministerul Culturii — pe județul de referință sunt înregistrate ' + lmi.length + ' poziții de monumente clasate (extras din setul deschis INP). Fiecare monument are un cod LMI oficial (format JJ-categorie-tip-grupă-număr) care îi atestă regimul de protecție și impune restricții și avize specifice pentru intervenții în monument sau în zona sa de protecție (Legea 422/2001).');
      // grafic: monumente clasate pe grupă de interes (A naţional / B local) + pe categorie
      try {
        var gA = 0, gB = 0, byCat = {};
        lmi.forEach(function (m) {
          var c = m.cod || ''; var pg = (c.match(/-[IVX]+-[a-z]-([AB])-/) || [])[1];
          if (pg === 'A') gA++; else if (pg === 'B') gB++;
          var cat = (c.match(/-([IVX]+)-/) || [])[1]; if (cat) { var lbl = { 'I': 'I arheologie', 'II': 'II arhitectură', 'III': 'III for public', 'IV': 'IV memorial' }[cat] || cat; byCat[lbl] = (byCat[lbl] || 0) + 1; }
        });
        if (D.barChart && (gA + gB) >= 2) D.barChart([['Grupa A (naţional)', gA, [185, 28, 28]], ['Grupa B (local)', gB, [217, 119, 6]]], { title: 'Monumente clasate pe grupă de interes — județ', h: 40, source: 'LMI / INP — Ministerul Culturii (avize: A→Minister, B→DJC)' });
        var catArr = Object.keys(byCat).map(function (k) { return [k, byCat[k]]; }).sort(function (a, b) { return b[1] - a[1]; });
        if (D.barChart && catArr.length >= 2) { var palc = [[180, 83, 9], [245, 158, 11], [168, 85, 247], [59, 130, 246]]; D.barChart(catArr.map(function (t, i) { return [t[0], t[1], palc[i % palc.length]]; }), { title: 'Monumente clasate pe categorie LMI', h: 44, source: 'LMI / INP — categorii: I arheologie, II arhitectură, III artă for public, IV memorial' }); }
      } catch (e) {}
      var lrows = lmi.slice(0, 60).map(function (m) { return [m.cod, m.nume]; });
      if (D.table) D.table(['Cod LMI', 'Denumire monument'], lrows, [CW * 0.28, CW * 0.72]);
      if (lmi.length > 60) D.P('(Sunt listate primele 60 din ' + lmi.length + ' poziții LMI ale județului; lista completă se consultă în LMI oficial publicat de Ministerul Culturii.)');
      D.P('Sursă: Lista Monumentelor Istorice (LMI), Institutul Național al Patrimoniului — set de date deschise (data.gov.ro / cultura.ro). Codurile de grupă „A" indică monumente de interes național, iar „B" de interes local. Prezența unor monumente clasate în proximitatea amplasamentului ridică nivelul de prudență și poate impune avize suplimentare de la Direcția Județeană pentru Cultură.');
    }

    // restricții și niveluri de avizare LMI (serviciu comun _LMI)
    try { if (G._LMI && G._LMI.renderSection) await G._LMI.renderSection(D, cityKey); } catch (e) {}

    // ── Corpul dezvoltat (capitole generate, calitate SIDU) — rang superior 100+ pag ──
    try {
      var deep = G._RCAI_DEEP || [];
      deep.forEach(function (ch) {
        if (!ch || !ch.title) return;
        D.chapter(ch.title);
        (ch.blocks || []).forEach(function (bl) {
          try {
            if (bl.type === 'p' && bl.text) D.P(bl.text);
            else if (bl.type === 'bullets' && bl.items && bl.items.length && D.bullets) D.bullets(bl.items);
            else if (bl.type === 'table' && bl.headers && bl.rows && bl.rows.length && D.table) { var nc = bl.headers.length || 1; D.table(bl.headers, bl.rows, bl.headers.map(function () { return CW / nc; })); _autoChart(D, bl.headers, bl.rows); }
          } catch (e) {}
        });
      });
    } catch (e) {}

    // Nota UrbanX (IVU)
    try { if (G.UrbanXIVU && G.UrbanXIVU.renderSection) G.UrbanXIVU.renderSection(D, cityKey); } catch (e) {}

    D.chapter('Limitări și disclaimer');
    D.P('Document de pre-cercetare generat algoritmic de UrbanX, pe baza surselor publice (RAN/CIMEC, LMI/MCIN, OSM, hărți istorice, date geomorfologice). NU înlocuiește raportul de cercetare arheologică realizat de un arheolog autorizat de MCIN, nu are valoare juridică în procedurile de avizare ale DJC sau MCIN și nu substituie diagnosticul sau cercetarea preventivă de teren. Estimările de potențial și stratigrafie au caracter orientativ. Validarea revine specialiștilor și instituțiilor abilitate.');

    D.chapter('Surse și standarde');
    D.P('OG 43/2000 (protejarea patrimoniului arheologic) · Legea 422/2001 (monumente istorice) · norme metodologice MCIN · Repertoriul Arheologic Național (RAN/CIMEC) · Lista Monumentelor Istorice (LMI) · Cronica Cercetărilor Arheologice · OpenStreetMap (situri istorice) · hărți istorice georeferențiate · date geomorfologice și hidrografice. Metodologie UrbanX · ThinkSmart Solutions.');

    var fn = ('Raport_arheologic_RCAI_' + x.name.replace(/[ăĂâÂîÎșȘşŞțȚţŢ]/g,function(c){return {'ă':'a','Ă':'A','â':'a','Â':'A','î':'i','Î':'I','ș':'s','Ș':'S','ş':'s','Ş':'S','ț':'t','Ț':'T','ţ':'t','Ţ':'T'}[c]||c;}).replace(/[^\w]+/g,'_') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[ăĂâÂîÎșȘşŞțȚţŢ]/g,function(c){return {'ă':'a','Ă':'A','â':'a','Â':'A','î':'i','Î':'I','ș':'s','Ș':'S','ş':'s','Ş':'S','ț':'t','Ț':'T','ţ':'t','Ţ':'T'}[c]||c;}).replace(/[^a-zA-Z0-9._-]/g,'_');
    G._buildStratTOC && G._buildStratTOC(D, 1);
    pdf.save(fn); G.ss && ss('✅ Raport arheologic generat: ' + pdf.getNumberOfPages() + ' pagini'); return fn;
  }

  function openPanel(cityKey) {
    var x = _ctx(cityKey); var n = (G._RCAI_DEEP || []).length;
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,16,.78);z-index:9300;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    ov.innerHTML = '<div style="background:#0b1424;color:#e6edf7;width:min(560px,94vw);border:1px solid rgba(180,83,9,.5);border-radius:14px;font-family:system-ui,sans-serif;padding:18px 20px">' +
      '<div style="font-weight:800;font-size:16px">🏺 Raport de Cercetare Arheologică (RCAI) — ' + x.name + '</div>' +
      '<div style="font-size:11px;color:#94a3b8;margin:4px 0 12px">' + (x.hasParcel ? 'Raport sit/parcelă' : 'Raport teritorial UAT') + ' · evaluarea potențialului arheologic și a riscului pentru investiție</div>' +
      '<div style="font-size:11.5px;color:#cbd5e1;line-height:1.5">Sinteză a cercetării documentare, cartografice și arheologice publice (RAN, LMI, hărți istorice, geomorfologie). Generează un raport PDF amplu, cu evoluție istorică pe perioade, context arheologic, stratigrafie estimativă, evaluarea potențialului și recomandări de avizare (DJC/MCIN).</div>' +
      '<div style="display:flex;gap:8px;margin-top:14px"><button onclick="window._RCAI.generatePDF(window.TCI&&window.TCI.cityKey)" style="flex:1;background:linear-gradient(180deg,#d97706,#92400e);color:#fff;border:0;border-radius:9px;padding:10px;font-weight:700;cursor:pointer">📄 Generează Raport Arheologic (PDF)</button>' +
      '<button onclick="this.closest(\'div[style*=fixed]\').remove()" style="background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:9px;padding:10px 14px;cursor:pointer">Închide</button></div>' +
      '<div style="font-size:9px;color:#64748b;margin-top:10px">Pre-cercetare — nu înlocuiește raportul unui arheolog autorizat MCIN.' + (n ? '' : ' (conținut profund în curs de generare)') + '</div></div>';
    document.body.appendChild(ov);
  }

  G._RCAI = { generatePDF: generatePDF, openPanel: openPanel };
  console.log('[RCAI] ✅ Raport de Cercetare Arheologică încărcat');
})(window);
