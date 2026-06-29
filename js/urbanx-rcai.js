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
  // delegă la PICKER-ul UNIC din motorul de documente (stil identic în toate studiile/rapoartele)
  function _autoChart(D, headers, rows, title) { try { return window._pickChart && window._pickChart(D, headers, rows, title); } catch (e) {} }

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

  // cursuri de apă REALE (OSM) lângă amplasament — relevant arheologic (locuirea pe terase deasupra apei)
  async function _fetchWaterways(lat, lon, radius) {
    var q = '[out:json][timeout:25];(way(around:' + radius + ',' + lat + ',' + lon + ')[waterway~"^(river|stream|canal)$"];);out tags center 80;';
    try {
      var resp = await fetch(PROXY + '/osm?q=' + encodeURIComponent(q), { signal: AbortSignal.timeout(30000) });
      var j = await resp.json(); var els = (j && j.elements) || [];
      var seen = {}, out = [];
      els.forEach(function (el) {
        var t = el.tags || {}; var nm = t.name || t['name:ro']; if (!nm || seen[nm]) return; seen[nm] = 1;
        var la = el.lat != null ? el.lat : (el.center && el.center.lat), lo = el.lon != null ? el.lon : (el.center && el.center.lon);
        var dist = (la != null && G.turf) ? Math.round(G.turf.distance([lon, lat], [lo, la], { units: 'meters' })) : null;
        out.push({ name: nm, tip: t.waterway, dist: dist });
      });
      out.sort(function (a, b) { return (a.dist || 1e9) - (b.dist || 1e9); });
      return out;
    } catch (e) { return []; }
  }

  // SITURI ARHEOLOGICE REALE din RAN (CIMEC) — serviciul ArcGIS oficial eism.geo-spatial.ro,
  // confirmat funcțional 28 iun 2026 (layer 0 + 6 = Repertoriul Arheologic Național). Via /proxy.
  async function _fetchRAN(lat, lon, radius) {
    var dLat = radius / 111320, dLon = radius / (111320 * Math.cos(lat * Math.PI / 180));
    var bbox = (lon - dLon) + ',' + (lat - dLat) + ',' + (lon + dLon) + ',' + (lat + dLat);
    var base = 'https://eism.geo-spatial.ro/eismgeo/rest/services/Patrimoniu/PatrimoniuWM/MapServer';
    var qs = '/query?where=1%3D1&geometry=' + bbox + '&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=true&outSR=4326&f=json';
    var out = [];
    var layers = [0, 6];
    for (var i = 0; i < layers.length; i++) {
      try {
        var resp = await fetch(PROXY + '/proxy?url=' + encodeURIComponent(base + '/' + layers[i] + qs), { signal: AbortSignal.timeout(30000) });
        var j = await resp.json(); var feats = (j && j.features) || [];
        feats.forEach(function (f) {
          var a = f.attributes || {}, g = f.geometry || {};
          var nm = a.NUMESIT || a.Nume || a.Toponim; var cod = a.CODSIT || a.CodRAN || '';
          if (!nm) return;
          var la = g.y, lo = g.x;
          var dist = (la != null && G.turf) ? Math.round(G.turf.distance([lon, lat], [lo, la], { units: 'meters' })) : null;
          out.push({ cod: cod, nume: nm, dist: dist });
        });
      } catch (e) {}
    }
    var seen = {}, dd = [];
    out.forEach(function (s) { var k = s.cod || s.nume; if (seen[k]) return; seen[k] = 1; dd.push(s); });
    dd.sort(function (a, b) { return (a.dist || 1e9) - (b.dist || 1e9); });
    return dd;
  }

  async function generatePDF(cityKey, mode) {
    var J = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF;
    if (!J || typeof G._makeStratDoc !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    var x = _ctx(cityKey, mode);
    G.ss && G.ss('🏺 Aduc monumentele reale (OSM) și generez RCAI…');
    var heritage = await _fetchHeritage(x.lat, x.lon, mode === 'T' ? 12000 : 2500);
    var mapImg = null; try { mapImg = await _captureMap(x.lat, x.lon, heritage); } catch (e) {}
    // capturi DIACRONICE — amplasamentul peste hărți istorice reale (geo-spatial.org / RNGD)
    var histImgs = [];
    try {
      if (G._HartiIstorice && G._HartiIstorice.captureOver && G.map && x.lat != null) {
        G.ss && G.ss('🗺️ Capturez amplasamentul peste hărțile istorice…');
        var _hz = (mode === 'T') ? 10.5 : 14.2, _HLS = G._HartiIstorice.LAYERS;
        for (var _hi = 0; _hi < _HLS.length; _hi++) {
          try { var _img = await G._HartiIstorice.captureOver(x.lat, x.lon, _HLS[_hi].id, { zoom: _hz, opacity: 1 }); if (_img) histImgs.push({ img: _img, L: _HLS[_hi] }); } catch (e) {}
        }
      }
    } catch (e) { console.warn('[RCAI hist]', e); }
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
    if (D) D.__cityKey = cityKey; // pt nota IVU pe copertă (stampilată universal în _buildStratTOC)
    D.setSuppress && D.setSuppress(false);

    D.chapter('Rezumat executiv');
    D.P('Prezentul Raport de Cercetare Arheologică și de Evaluare a Potențialului Arheologic ' + (x.hasParcel ? 'pentru amplasamentul analizat din ' : 'pentru teritoriul administrativ al ') + x.name + (x.judet ? ', județul ' + x.judet : '') + ', sintetizează cercetarea documentară, cartografică și arheologică disponibilă public, în scopul evaluării potențialului arheologic și a riscului pe care patrimoniul îngropat îl poate genera pentru o investiție. Raportul are caracter de pre-cercetare și orientează beneficiarul, proiectantul și autoritatea de avizare asupra demersurilor necesare conform legislației în vigoare (OG 43/2000, Legea 422/2001).');
    D.callout && D.callout('Statut', 'Document de PRE-CERCETARE generat algoritmic. NU înlocuiește raportul de cercetare arheologică întocmit de un arheolog autorizat MCIN și nu are valoare juridică în procedurile de avizare ale DJC sau MCIN.');
    // NB: „Metodologia cercetării" a fost MUTATĂ după datele reale (RAN/geomorfologie/LMI),
    // ca un RCAI clasic — datele în față, metodologia+cadrul legal ca anexă (cerut de Florin).

    // ── SECȚIUNE PUNCTUALĂ: amplasamentul analizat + avize pe parcelă (doar raportul de parcelă) ──
    if (mode !== 'T') {
      if (typeof G._loadReguli === 'function') { try { await G._loadReguli(cityKey); } catch (e) {} }
      var PC = G._ParcelCtx ? G._ParcelCtx.get(cityKey) : null;
      D.chapter('Amplasamentul analizat');
      D.P('Acest raport este PUNCTUAL: evaluează potențialul arheologic pentru amplasamentul (parcela) selectat și zona imediată din care face parte, nu pentru întregul teritoriu administrativ. Concluziile și recomandările de avizare privesc strict acest sit.');
      if (PC && PC.hasParcel) {
        if (D.table) D.table(['Atribut amplasament', 'Valoare'], [
          ['Identificator cadastral (CF/nr. cad.)', PC.nrcad || 'neidentificat'],
          ['Suprafață', PC.area ? N(PC.area) + ' mp' : '—'],
          ['Coordonate (centroid)', PC.lat != null ? N(PC.lat, 5) + '°N, ' + N(PC.lon, 5) + '°E' : '—'],
          ['UTR / zonă', (PC.zone && PC.zone.utrNr || '—') + (PC.zone && PC.zone.denumire ? ' — ' + PC.zone.denumire : '')]
        ], [CW * 0.5, CW * 0.5]);
      } else {
        D.P('Nu a fost selectată o parcelă; analiza se raportează la zona centrală/coordonatele indicate. Pentru un raport pe parcelă, selectați amplasamentul pe hartă.');
      }
      // avize pe ACEST amplasament (zona de protecție a monumentelor)
      if (G._LMI && G._LMI.avizForParcel && x.lat != null) {
        try {
          var av = await G._LMI.avizForParcel(x.lat, x.lon);
          if (av && av.nota) {
            D.P(av.nota);
            if (av.nivel && D.callout) D.callout('Nivel de avizare necesar', av.nivel);
          }
        } catch (e) {}
      }
      // ── GEOMORFOLOGIE REALĂ din DEM (Terrain-RGB) — terase/relief/poziție vs vale,
      // calculată pe amplasament (NU narativ generic). Relevant arheologic: locuirea
      // istorică preferă terasele uscate lângă apă. Cerut de Florin (date dinamice).
      if (x.lat != null && typeof G._getElevGrid === 'function') {
        try {
          var eg = await G._getElevGrid(x.lat, x.lon, 800, 16);
          if (eg && eg.grid && eg.grid.length) {
            var gN = eg.gridN || eg.grid.length, mid = Math.floor(gN / 2);
            var cElev = eg.grid[mid][mid];
            var relief = +(eg.elevMax - eg.elevMin).toFixed(1);
            var relPos = relief > 0 ? Math.round((cElev - eg.elevMin) / relief * 100) : 50;
            var cell_m = (2 * 800) / (gN - 1);
            var dzx = Math.abs(eg.grid[mid][Math.min(gN - 1, mid + 1)] - eg.grid[mid][Math.max(0, mid - 1)]);
            var dzy = Math.abs(eg.grid[Math.min(gN - 1, mid + 1)][mid] - eg.grid[Math.max(0, mid - 1)][mid]);
            var slopePct = +(Math.max(dzx, dzy) / (2 * cell_m) * 100).toFixed(1);
            var lo = { v: 1e9, gy: mid, gx: mid };
            for (var yy = 0; yy < gN; yy++) for (var xx = 0; xx < gN; xx++) { if (eg.grid[yy][xx] < lo.v) lo = { v: eg.grid[yy][xx], gy: yy, gx: xx }; }
            var dValeM = Math.round(Math.hypot(lo.gx - mid, lo.gy - mid) * cell_m);
            var poz = relPos >= 66 ? 'terasă/versant înalt' : relPos >= 33 ? 'terasă medie / pantă' : 'zonă joasă / luncă';
            var potClass = (relPos >= 40 && relPos <= 90 && dValeM >= 60 && dValeM <= 700) ? 'RIDICAT' : (relPos < 25 ? 'MODERAT (zonă joasă, umedă)' : 'MEDIU');
            D.chapter('Analiză geomorfologică a amplasamentului (model digital de elevație)');
            D.P('Relieful și hidrografia condiționează direct locuirea istorică: așezările preistorice și antice preferau terasele înalte, uscate și apărate, în proximitatea unei surse de apă (pâraie, izvoare la baza teraselor). Analiza de mai jos este CALCULATĂ din modelul digital de elevație (Mapbox Terrain-RGB), pe o rază de ~800 m în jurul amplasamentului — nu este un text generic.');
            if (D.table) D.table(['Parametru geomorfologic (din DEM)', 'Valoare'], [
              ['Cotă teren amplasament (AMSL)', N(cElev, 1) + ' m'],
              ['Relief local (max−min, rază 800 m)', N(relief, 1) + ' m (' + N(eg.elevMin, 1) + '–' + N(eg.elevMax, 1) + ' m)'],
              ['Poziție relativă în relief', relPos + '% → ' + poz],
              ['Pantă locală estimată', slopePct + '%'],
              ['Distanță estimată la firul de vale', '~' + N(dValeM) + ' m']
            ], [CW * 0.6, CW * 0.4]);
            D.P('Interpretare arheologică: amplasamentul se află pe ' + poz + ' (poziție relativă ' + relPos + '% în relieful local), la cca. ' + N(dValeM) + ' m de cel mai jos punct din zonă (probabil firul de vale / curs de apă istoric). ' + (potClass === 'RIDICAT' ? 'Această configurație — terasă uscată în apropierea apei — este TIPICĂ pentru locuirea preistorică și antică; potențialul arheologic din perspectivă geomorfologică este RIDICAT.' : potClass.indexOf('MODERAT') === 0 ? 'Zona joasă/umedă este mai puțin favorabilă locuirii continue, dar nu o exclude (așezări de luncă, vaduri, poduri); potențialul este moderat, condiționat de cota apei istorice.' : 'Configurația indică un potențial geomorfologic MEDIU pentru locuirea istorică.'));
            if (D.callout) D.callout('Potențial arheologic (criteriu geomorfologic)', potClass);
            if (D.source) D.source('Model digital de elevație Mapbox Terrain-RGB · analiză UrbanX (rază 800 m, grilă ' + gN + '×' + gN + ')');
            // Hidrografie REALĂ (OSM) — cursurile de apă din proximitate, numite + distanță
            try {
              var wways = await _fetchWaterways(x.lat, x.lon, 2000);
              if (wways && wways.length) {
                var top = wways.slice(0, 4).map(function (w) { return w.name + (w.dist != null ? ' (~' + N(w.dist) + ' m, ' + w.tip + ')' : ''); });
                D.h2 && D.h2('Rețeaua hidrografică în proximitate (date reale OSM)');
                D.P('Cursuri de apă identificate în jurul amplasamentului: ' + top.join('; ') + '. Hidrografia este determinantă pentru locuirea istorică — așezările preistorice și antice se dezvoltau pe terasele de deasupra văilor, în apropierea surselor de apă. Coroborat cu poziția geomorfologică de mai sus, proximitatea unui curs de apă susține interpretarea potențialului arheologic al sitului.');
              }
            } catch (e) { console.warn('[RCAI hidro]', e.message); }
          }
        } catch (e) { console.warn('[RCAI geomorf]', e.message); }
      }
      // ── SITURI ARHEOLOGICE REALE din RAN/CIMEC (serviciul oficial eism.geo-spatial.ro) ──
      try {
        var ran = await _fetchRAN(x.lat, x.lon, 2500);
        D.chapter('Situri arheologice RAN în proximitate (Repertoriul Arheologic Național)');
        if (ran && ran.length) {
          D.P('Interogarea Repertoriului Arheologic Național (RAN) prin serviciul oficial CIMEC (eism.geo-spatial.ro) a returnat ' + ran.length + ' situri arheologice înregistrate în proximitatea amplasamentului (rază ~2,5 km). Sunt date OFICIALE, cu cod RAN, și constituie cel mai direct indicator al potențialului arheologic al sitului.');
          if (D.table) D.table(['Cod RAN', 'Denumire sit', 'Distanță'], ran.slice(0, 22).map(function (s) { return [s.cod || '—', String(s.nume || '').slice(0, 72), s.dist != null ? N(s.dist) + ' m' : '—']; }), [CW * 0.18, CW * 0.62, CW * 0.20]);
          if (ran.length > 22) D.P('… și încă ' + (ran.length - 22) + ' situri RAN în zonă (lista completă în RAN/CIMEC).');
          var near = ran.filter(function (s) { return s.dist != null && s.dist < 300; }).length;
          if (D.callout) D.callout('Implicație pentru investiție', near ? near + ' sit(uri) RAN la sub 300 m de amplasament — potențial arheologic RIDICAT; cercetare arheologică preventivă foarte probabil necesară (OG 43/2000).' : 'Situri RAN înregistrate în zonă — potențial arheologic real; descărcare de sarcină arheologică recomandată înainte de autorizare.');
          if (D.source) D.source('Repertoriul Arheologic Național (RAN) · CIMEC / eism.geo-spatial.ro — date oficiale, interogare live');
        } else {
          D.P('Interogarea RAN/CIMEC (eism.geo-spatial.ro) nu a returnat situri înregistrate în raza analizată la momentul generării. Aceasta NU exclude existența vestigiilor neînregistrate — se impune diagnostic arheologic conform OG 43/2000 și consultarea Direcției Județene pentru Cultură.');
        }
      } catch (e) { console.warn('[RCAI RAN]', e.message); }
    }

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

    // ── ANALIZĂ CARTOGRAFICĂ DIACRONICĂ — amplasamentul peste hărți istorice REALE ──
    D.chapter('Analiză cartografică diacronică (hărți istorice)');
    D.P('Suprapunerea amplasamentului peste cartografia istorică georeferențiată permite reconstituirea folosinței terenului și a structurii așezării în epoci succesive — element-cheie în evaluarea potențialului arheologic. Continuitatea locuirii, vechile vetre de sat, drumurile istorice, cursurile de apă modificate și parcelarul agricol vechi sunt indicii directe ale probabilității de a întâlni vestigii. Planșele de mai jos marchează poziția amplasamentului (● roșu) pe hărți militare și topografice de epocă.');
    if (histImgs.length) {
      histImgs.forEach(function (h) {
        if (D.subsec) D.subsec(h.L.label + ' · ' + h.L.epoca); else if (D.h2) D.h2(h.L.label + ' · ' + h.L.epoca);
        D.P(h.L.note);
        try {
          var iw = CW, ih = Math.round(iw * 0.62); if (D.ensure) D.ensure(ih + 14);
          var yy = (D.y != null ? D.y : 60);
          pdf.addImage(h.img, 'PNG', D.dims.ML, yy, iw, ih);
          pdf.setDrawColor(180, 83, 9); pdf.setLineWidth(0.4); pdf.rect(D.dims.ML, yy, iw, ih, 'S');
          if (D.setY) D.setY(yy + ih + 2);
          if (D.source) D.source('Amplasament (● roșu) peste ' + h.L.label + ' (' + h.L.epoca + ') · sursă: geo-spatial.org / RNGD (WMS georeferențiat)');
        } catch (e) {}
      });
      D.P('Interpretarea comparativă a planșelor (de la cea mai veche la cea mai recentă) evidențiază transformarea amplasamentului: extinderea/retragerea vetrei construite, modificarea rețelei de drumuri și a hidrografiei, schimbarea folosinței (agricol → construit). Zonele cu locuire istorică atestată cartografic, precum și vecinătatea unor vechi drumuri, vaduri sau biserici, ridică nivelul de prudență arheologică.');
    } else {
      D.P('Hărțile istorice georeferențiate (Planuri Directoare de Tragere 1:20.000 interbelice, ridicări militare austro-ungare ~1882–1918, topografie sovietică ~1975–1985) sunt disponibile în platformă ca straturi de suprapunere (modulul „Hărți istorice"). Pentru includerea automată a planșelor de epocă în acest raport, generați-l cu harta activă (live), centrată pe amplasament. Sursă: geo-spatial.org / RNGD.');
    }

    // dotări urbane (POI OSM) la nivel teritorial — reutilizarea capturilor din carduri (#14)
    if (mode === 'T') { try { if (G._DocMapCaptures && G._DocMapCaptures.poiSection) await G._DocMapCaptures.poiSection(D, cityKey, 'Context urban — dotări și repere (OSM)'); } catch (e) {} }

    // ── Metodologie + cadru (DUPĂ datele reale, ca anexă metodologică — RCAI clasic) ──
    D.chapter('Metodologia cercetării');
    D.P('Cercetarea integrează patru paliere de analiză: (1) documentară — bibliografie istorică și arheologică, repertorii, cronici; (2) cartografică — interpretarea și suprapunerea planurilor istorice (planuri de încartiruire, ridicări militare, planuri cadastrale) pe situația actuală; (3) arheologică — analiza siturilor din Repertoriul Arheologic Național (RAN), a monumentelor din Lista Monumentelor Istorice (LMI) și a cercetărilor anterioare din Cronica Cercetărilor Arheologice; (4) geomorfologică — relieful, terasele, hidrografia istorică și implicațiile lor pentru locuirea istorică și conservarea vestigiilor. Datele factuale (situri RAN, monumente LMI, geomorfologie, hidrografie) sunt prezentate în capitolele anterioare; capitolele care urmează detaliază metodologia, cadrul legal și procedurile de cercetare/avizare.');

    // ── Corpul dezvoltat (metodologie + proceduri, ca anexă): teritorial (_RCAI_DEEP) sau parcelă (_RCAI_DEEP_PARCEL) ──
    try {
      var deep = (mode === 'T') ? (G._RCAI_DEEP || []) : (G._RCAI_DEEP_PARCEL || G._RCAI_DEEP || []);
      deep.forEach(function (ch, _ci) {
        if (!ch || !ch.title) return;
        D.chapter(ch.title); var _vis = false;
        (ch.blocks || []).forEach(function (bl) {
          try {
            if (bl.type === 'p' && bl.text) D.P(bl.text);
            else if (bl.type === 'bullets' && bl.items && bl.items.length && D.bullets) D.bullets(bl.items);
            else if (bl.type === 'table' && bl.headers && bl.rows && bl.rows.length && D.table) { var nc = bl.headers.length || 1; D.table(bl.headers, bl.rows, bl.headers.map(function () { return CW / nc; })); _autoChart(D, bl.headers, bl.rows); _vis = true; }
          } catch (e) {}
        });
        if (!_vis) { try { if (G._chapterGraphic) G._chapterGraphic(D, _ci); } catch (e) {} }
      });
    } catch (e) {}

    // Nota UrbanX (IVU)
    try { if (G.UrbanXIVU && G.UrbanXIVU.renderSection) G.UrbanXIVU.renderSection(D, cityKey); } catch (e) {}

    D.chapter('Limitări și disclaimer');
    D.P('Document de pre-cercetare generat algoritmic de UrbanX, pe baza surselor publice (RAN/CIMEC, LMI/MCIN, OSM, hărți istorice, date geomorfologice). NU înlocuiește raportul de cercetare arheologică realizat de un arheolog autorizat de MCIN, nu are valoare juridică în procedurile de avizare ale DJC sau MCIN și nu substituie diagnosticul sau cercetarea preventivă de teren. Estimările de potențial și stratigrafie au caracter orientativ. Validarea revine specialiștilor și instituțiilor abilitate.');

    D.chapter('Surse și standarde');
    D.P('OG 43/2000 (protejarea patrimoniului arheologic) · Legea 422/2001 (monumente istorice) · norme metodologice MCIN · Repertoriul Arheologic Național (RAN/CIMEC) · Lista Monumentelor Istorice (LMI) · Cronica Cercetărilor Arheologice · OpenStreetMap (situri istorice) · hărți istorice georeferențiate · date geomorfologice și hidrografice. Metodologie UrbanX · ThinkSmart Solutions.');

    var fn = (G._stratFileName ? G._stratFileName('RCAI', { mode: mode, territorial: mode === 'T', localitate: x.name, nrcad: (PC && PC.nrcad) }) : ('RCAI_' + (x.name || 'UAT') + '.pdf'));
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
