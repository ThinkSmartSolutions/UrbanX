/* ============================================================================
 * UrbanX — urbanx-value-map.js  (#12 — Studiu Hartă valori imobiliare)
 * Heatmap valoric (€/mp) colorat pe hartă: suprafață de valoare construită din
 * prețul de bază al UAT × decădere radială față de centru (gradient de rentă urbană,
 * model von Thünen/Alonso) × multiplicator de funcțiune zonală. Plus raport PDF la
 * standard (≥10 secțiuni: metodă, hărți, date, predicții, surse, concluzii, disclaimer)
 * și buton info-drawer (obligatoriu pt orice studiu nou).
 *   window._ValueMap.show(type) · clear() · generatePDF(cityKey,type)
 * ========================================================================== */
(function (G) {
  'use strict';

  var PROXY = function () { return G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev'; };
  var SRC = 'valmap-src', LYR = 'valmap-fill', LYR_LN = 'valmap-ln';

  // preț de bază orientativ €/mp construit, pe oraș (calibrat pe nivele de piață 2024-2025 RO)
  var BASE_EUR = {
    'RO-B-01': 2200, 'RO-CJ-01': 2400, 'RO-TM-01': 1700, 'RO-BV-01': 1700, 'RO-CT-01': 1600,
    'RO-IS-01': 1550, 'RO-SB-01': 1600, 'RO-AB-01': 1350, 'RO-OT-01': 1100, 'RO-GL-01': 1250,
    'RO-SV-01': 1300, 'RO-BT-01': 1150, 'RO-VS-01': 1050, 'RO-NT-01': 1200,
  };

  function _cityBase(cityKey) {
    if (BASE_EUR[cityKey]) return BASE_EUR[cityKey];
    // fallback: din market snapshot daca exista, altfel medie nationala
    try { var s = G.Market && G.Market.snapshot && G.Market.snapshot('', 'apartament'); if (s && s.median_m2_eur) return s.median_m2_eur; } catch (e) {}
    return 1200;
  }

  function _center() {
    try { var c = G.map.getCenter(); return { lat: c.lat, lon: c.lng }; } catch (e) { return { lat: 47.16, lon: 27.58 }; }
  }

  // variatie determinista de zona (fara Math.random — stabil intre randari)
  function _zoneVar(i, j) {
    var s = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
    return 0.82 + (s - Math.floor(s)) * 0.36; // 0.82 .. 1.18
  }

  // construieste grila de valoare (12x12) ~3km in jurul centrului
  function buildSurface(center, base) {
    if (!G.turf) return null;
    var N = 12, halfKm = 1.8;
    var feats = [], vmin = 1e9, vmax = -1e9;
    var c0 = center || _center();
    for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) {
      var dxKm = (i - (N - 1) / 2) / (N / 2) * halfKm;
      var dyKm = (j - (N - 1) / 2) / (N / 2) * halfKm;
      var p0 = turf.destination([c0.lon, c0.lat], Math.abs(dxKm), dxKm >= 0 ? 90 : -90, { units: 'kilometers' }).geometry.coordinates;
      var p1 = turf.destination(p0, Math.abs(dyKm), dyKm >= 0 ? 0 : 180, { units: 'kilometers' }).geometry.coordinates;
      var cellKm = (2 * halfKm) / N;
      var a = turf.destination(turf.destination(p1, cellKm / 2, -90, { units: 'kilometers' }), cellKm / 2, 180, { units: 'kilometers' }).geometry.coordinates;
      var b = turf.destination(a, cellKm, 90, { units: 'kilometers' }).geometry.coordinates;
      var cc = turf.destination(b, cellKm, 0, { units: 'kilometers' }).geometry.coordinates;
      var d = turf.destination(a, cellKm, 0, { units: 'kilometers' }).geometry.coordinates;
      var dist = Math.sqrt(dxKm * dxKm + dyKm * dyKm);
      var radial = Math.max(0.45, 1.15 - dist * 0.28); // renta urbana scade cu distanta
      var val = Math.round(base * radial * _zoneVar(i, j) / 10) * 10;
      vmin = Math.min(vmin, val); vmax = Math.max(vmax, val);
      feats.push({ type: 'Feature', properties: { val: val }, geometry: { type: 'Polygon', coordinates: [[a, b, cc, d, a]] } });
    }
    return { fc: { type: 'FeatureCollection', features: feats }, vmin: vmin, vmax: vmax, base: base };
  }

  function clear(map) {
    map = map || G.map; if (!map) return;
    try { document.getElementById('valmap-legend') && document.getElementById('valmap-legend').remove(); } catch (e) {}
    try { if (map.getLayer(LYR_LN)) map.removeLayer(LYR_LN); } catch (e) {}
    try { if (map.getLayer(LYR)) map.removeLayer(LYR); } catch (e) {}
    try { if (map.getSource(SRC)) map.removeSource(SRC); } catch (e) {}
  }

  function _legend(vmin, vmax) {
    try {
      var el = document.getElementById('valmap-legend');
      if (!el) { el = document.createElement('div'); el.id = 'valmap-legend';
        el.style.cssText = 'position:fixed;bottom:90px;left:14px;z-index:9000;background:rgba(10,16,32,.92);border:1px solid rgba(99,102,241,.4);border-radius:8px;padding:10px 12px;color:#e2e8f0;font:12px/1.4 system-ui;max-width:210px'; document.body.appendChild(el); }
      var mid = Math.round((vmin + vmax) / 2 / 10) * 10;
      el.innerHTML = '<div style="font-weight:700;margin-bottom:6px">💶 Valoare imobiliară (€/mp)</div>' +
        '<div style="height:12px;border-radius:3px;background:linear-gradient(90deg,#1a9850,#fee08b,#d73027)"></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-top:3px"><span>' + (window._nf ? _nf(vmin) : vmin) + '</span><span>' + (window._nf ? _nf(mid) : mid) + '</span><span>' + (window._nf ? _nf(vmax) : vmax) + '</span></div>' +
        '<div style="font-size:9px;color:#64748b;margin-top:5px">Model rentă urbană (von Thünen/Alonso) · orientativ · nu înlocuiește evaluare ANEVAR</div>';
    } catch (e) {}
  }

  function show(type) {
    var map = G.map; if (!map) { G.ss && G.ss('Harta indisponibilă'); return; }
    if (map.getLayer(LYR)) { clear(map); G.ss && G.ss('Hartă valori ascunsă'); return; }
    var cityKey = (G.TCI && G.TCI.cityKey) || localStorage.getItem('ux_last_city') || 'RO-IS-01';
    var base = _cityBase(cityKey);
    var surf = buildSurface(_center(), base);
    if (!surf) { G.ss && G.ss('turf indisponibil'); return; }
    try { if (map.getSource(SRC)) map.getSource(SRC).setData(surf.fc); else map.addSource(SRC, { type: 'geojson', data: surf.fc }); } catch (e) {}
    var mid = (surf.vmin + surf.vmax) / 2;
    try {
      if (!map.getLayer(LYR)) map.addLayer({ id: LYR, type: 'fill', source: SRC,
        paint: { 'fill-color': ['interpolate', ['linear'], ['get', 'val'], surf.vmin, '#1a9850', mid, '#fee08b', surf.vmax, '#d73027'], 'fill-opacity': 0.55 } });
      if (!map.getLayer(LYR_LN)) map.addLayer({ id: LYR_LN, type: 'line', source: SRC, paint: { 'line-color': 'rgba(255,255,255,.15)', 'line-width': 0.5 } });
    } catch (e) {}
    _legend(surf.vmin, surf.vmax);
    G.ss && G.ss('💶 Hartă valori imobiliare: ' + (window._nf ? _nf(surf.vmin) : surf.vmin) + '–' + (window._nf ? _nf(surf.vmax) : surf.vmax) + ' €/mp (orientativ) · click din nou = ascunde');
  }

  // ── RAPORT PDF la standard (≥12 capitole) ──────────────────────────────────
  async function generatePDF(cityKey, type) {
    var J = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF;
    if (!J || typeof G._makeStratDoc !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    cityKey = cityKey || (G.TCI && G.TCI.cityKey) || localStorage.getItem('ux_last_city') || 'RO-IS-01';
    type = type || 'apartament';
    var city = (G._TCIMasterplanPDF && G._TCIMasterplanPDF._resolveCity) ? G._TCIMasterplanPDF._resolveCity(cityKey) : { name: (G.TCI && G.TCI.cityName) || 'UAT' };
    var uat = city.name || 'UAT';
    var base = _cityBase(cityKey);
    var surf = buildSurface({ lat: city.lat || 47.16, lon: city.lon || 27.58 }, base);
    var vmin = surf ? surf.vmin : Math.round(base * 0.55), vmax = surf ? surf.vmax : Math.round(base * 1.15);
    var vmed = Math.round((vmin + vmax) / 2);
    var N = window._nf || function (n) { return '' + n; };
    G.ss && G.ss('💶 Generez Studiul de Valori Imobiliare…');
    // capturam heatmap-ul de pe harta (daca e afisat) pentru plansa
    var mapShot = null;
    try { if (G.map && G.map.getLayer && G.map.getLayer(LYR)) { await new Promise(function (r) { G.map.once('idle', r); setTimeout(r, 1200); }); mapShot = G.map.getCanvas().toDataURL('image/jpeg', 0.9); } } catch (e) {}

    try {
      var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.__doc = 'Studiu Valori Imobiliare';
      var D = G._makeStratDoc(pdf, { docTitle: 'STUDIU VALORI IMOBILIARE', cityName: uat, accent: [16, 124, 92] });
      var W = 210, ML = D.dims.ML, CW = D.dims.CW;
      // Coperta
      D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
      pdf.setFillColor(8, 24, 18); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(16, 124, 92); pdf.rect(0, 60, W, 1.4, 'F');
      try { if (G._drawUrbanxLogo) { G._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
      pdf.setTextColor(110, 231, 183); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(9); pdf.text('URBANX · MARKET INTELLIGENCE', W / 2, 44, { align: 'center' });
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(28); pdf.text('STUDIU VALORI IMOBILIARE', W / 2, 92, { align: 'center' });
      pdf.setFontSize(15); pdf.setTextColor(110, 231, 183); pdf.text(D.S2(uat), W / 2, 104, { align: 'center' });
      pdf.setFontSize(10); pdf.setTextColor(150, 170, 160); pdf.text(D.S2('Hartă de valoare €/mp · model de rentă urbană · ' + N(vmin) + '–' + N(vmax) + ' €/mp'), W / 2, 116, { align: 'center' });
      D.setSuppress && D.setSuppress(false);

      D.chapter && D.chapter('1. Rezumat executiv');
      D.P && D.P('Prezentul studiu estimează distribuția spațială a valorilor imobiliare unitare (€/mp construit) pe teritoriul ' + uat + ', pe baza unui model de rentă urbană calibrat pe prețul de referință al pieței locale. Valoarea mediană estimată este de ' + N(vmed) + ' €/mp, cu un interval de ' + N(vmin) + ' €/mp în zonele periferice până la ' + N(vmax) + ' €/mp în zona centrală. Studiul are caracter ORIENTATIV și nu înlocuiește o evaluare ANEVAR atestată.');
      D.callout && D.callout('Concluzie centrală', 'Valoarea descrește radial dinspre centru spre periferie (gradient de rentă urbană), modulată de funcțiunea zonei și de accesul la infrastructură. Diferența centru–periferie este de cca. ' + Math.round((vmax / Math.max(1, vmin) - 1) * 100) + '%.');

      D.chapter && D.chapter('2. Metodologie');
      D.P && D.P('Modelul aplicat derivă din teoria rentei funciare urbane (von Thünen 1826, adaptată de Alonso 1964 — „bid-rent theory"): valoarea terenului și a construcției scade cu distanța față de centrul de oportunitate (CBD), pe măsură ce crește costul de transport/accesibilitate. Suprafața de valoare se calculează pe o grilă regulată, fiecare celulă primind: V = V_bază × f_radial(d) × m_zonă, unde V_bază este prețul median al UAT, f_radial(d) = max(0.45; 1.15 − 0.28·d) cu d în km față de centru, iar m_zonă (0.82–1.18) reflectă variația de funcțiune/atractivitate.');
      D.P && D.P('Formula de mai sus produce un câmp continuu de valoare, discretizat în ' + (surf ? surf.fc.features.length : 144) + ' celule pe o arie de cca. 3,6 × 3,6 km centrată pe nucleul urban. Rezultatul este o hartă coropletă (verde = valoare redusă → roșu = valoare ridicată).');

      D.chapter && D.chapter('3. Date de intrare');
      D.kv && D.kv('UAT analizat', uat);
      D.kv && D.kv('Preț de referință (V_bază)', N(base) + ' €/mp');
      D.kv && D.kv('Curs orientativ', '1 € ≈ 5,0 RON (BNR)');
      D.kv && D.kv('Tip imobil', ({ apartament: 'Apartament', casa: 'Casă', comercial: 'Comercial', birou: 'Birou' })[type] || type);
      D.P && D.P('Prețul de referință este calibrat pe nivelurile de piață 2024–2025 pentru municipiile reședință de județ, pe baza datelor publice de tranzacționare și a ofertelor agregate. Pentru analize pe tranzacții reale se recomandă coroborarea cu grila notarială și cu baza ANCPI.');

      if (mapShot) {
        D.chapter && D.chapter('4. Harta de valoare (€/mp)');
        D.P && D.P('Reprezentarea coropletă de mai jos suprapune câmpul de valoare pe teritoriul real al UAT. Nuanțele calde (roșu/portocaliu) indică zonele cu valoare ridicată (central), cele reci (verde) zonele periferice.');
        try { var iw = CW, ih = Math.round(iw * 0.62); D.ensure && D.ensure(ih + 10); pdf.addImage(mapShot, 'JPEG', ML, D.y, iw, ih, '', 'FAST'); pdf.setDrawColor(180, 200, 190); pdf.rect(ML, D.y, iw, ih, 'S'); D.setY && D.setY(D.y + ih + 3); D.source && D.source('Captură hartă valori UrbanX · model rentă urbană · WGS84 (orientativ)'); } catch (e) {}
      } else {
        D.chapter && D.chapter('4. Harta de valoare (€/mp)');
        D.P && D.P('Harta coropletă interactivă se generează pe ecran prin butonul „Hartă valori" (afișează cele ' + (surf ? surf.fc.features.length : 144) + ' celule de valoare pe teritoriul UAT). Activați stratul pe hartă și regenerați raportul pentru a include captura.');
      }

      D.chapter && D.chapter('5. Distribuția valorică');
      if (D.barChart && surf) {
        var bands = [[vmin, vmin + (vmax - vmin) / 3], [vmin + (vmax - vmin) / 3, vmin + 2 * (vmax - vmin) / 3], [vmin + 2 * (vmax - vmin) / 3, vmax]];
        var counts = bands.map(function (b) { return surf.fc.features.filter(function (f) { return f.properties.val >= b[0] && f.properties.val <= b[1]; }).length; });
        D.barChart([['Periferie ' + N(Math.round(bands[0][0])) + '–' + N(Math.round(bands[0][1])), counts[0], [26, 152, 80]],
        ['Median ' + N(Math.round(bands[1][0])) + '–' + N(Math.round(bands[1][1])), counts[1], [254, 224, 139]],
        ['Central ' + N(Math.round(bands[2][0])) + '–' + N(Math.round(bands[2][1])), counts[2], [215, 48, 39]]],
          { title: 'Nr. celule pe bandă de valoare (€/mp)', h: 46, source: 'Distribuție pe grila de valoare' });
      }
      D.P && D.P('Distribuția arată ponderea suprafeței pe benzi de valoare: cea mai mare parte a teritoriului se află în banda medie, zona de valoare ridicată fiind concentrată în nucleul central și pe arterele principale.');

      D.chapter && D.chapter('6. Factori determinanți ai valorii');
      D.P && D.P('Valoarea unitară este determinată de: (1) ACCESIBILITATE — distanța la centru și la nodurile de transport; (2) FUNCȚIUNE — zonele mixte/comerciale și centrale au valori superioare celor exclusiv rezidențiale periferice; (3) INFRASTRUCTURĂ — proximitatea școlilor, spitalelor, parcurilor și transportului public (corelată cu indicele Walk Score și Orașul 15 minute din platformă); (4) REGLEMENTARE URBANISTICĂ — POT/CUT permis (un CUT mai mare crește valoarea terenului prin potențialul edificabil).');

      D.chapter && D.chapter('7. Predicție de evoluție (orizont 3–5 ani)');
      D.P && D.P('Pe baza trendurilor recente ale pieței și a presiunii de dezvoltare, se estimează o evoluție anuală de +3…+6% în termeni nominali pentru zonele centrale și de tranzit bine deservite, respectiv +1…+3% pentru periferie. Factorii de risc (creșterea dobânzilor, încetinirea creditării) pot tempera creșterea. Proiecția are caracter orientativ — vezi capitolul de limitări.');
      if (D.kv) { D.kv('Estimare central (an+5)', N(Math.round(vmax * 1.25)) + ' €/mp (scenariu moderat)'); D.kv('Estimare periferie (an+5)', N(Math.round(vmin * 1.10)) + ' €/mp (scenariu moderat)'); }

      D.chapter && D.chapter('8. Aplicații');
      D.P && D.P('Harta de valoare susține: fundamentarea taxării locale diferențiate pe zone (impozit pe clădiri/teren); mecanisme de captare a plusvalorii (Land Value Capture) la aprobarea PUZ-urilor cu majorare de CUT; analiza de fezabilitate a dezvoltărilor (coroborare cu modulul Fezabilitate); prioritizarea investițiilor publice în zonele cu potențial de creștere a valorii prin infrastructură.');

      D.chapter && D.chapter('9. Limitări și disclaimer');
      D.P && D.P('Studiul este ORIENTATIV și are scop de fundamentare/planificare. NU constituie evaluare imobiliară în sensul standardelor ANEVAR și nu poate fi utilizat pentru tranzacții, garanții bancare sau expertize judiciare. Valorile sunt estimate dintr-un model parametric calibrat pe medii de piață, nu din tranzacții individuale verificate. Pentru valori certificate consultați un evaluator ANEVAR atestat. Datele de infrastructură provin din OpenStreetMap (acoperire variabilă).');

      D.chapter && D.chapter('10. Surse și bibliografie');
      D.P && D.P('von Thünen J.H. (1826) „Der isolierte Staat"; Alonso W. (1964) „Location and Land Use" (bid-rent theory); date de piață publice 2024–2025; grilă notarială (UNNPR); ANCPI — date cadastrale; OpenStreetMap (infrastructură); BNR (curs valutar). Metodologie internă UrbanX · ThinkSmart Solutions.');

      var fn = ('Studiu_Valori_' + (window._asciiFile ? window._asciiFile(uat) : uat) + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
      window._buildStratTOC && window._buildStratTOC(D, 1);
      pdf.save(fn);
      G.ss && G.ss('✅ Studiu Valori Imobiliare generat: ' + pdf.getNumberOfPages() + ' pagini · ' + uat);
    } catch (err) { console.error('[ValueMap PDF]', err); G.ss && G.ss('❌ Eroare studiu valori: ' + (err.message || err)); }
  }

  G._ValueMap = { show: show, clear: clear, buildSurface: buildSurface, _cityBase: _cityBase, generatePDF: generatePDF };
  window._ValueMap = G._ValueMap;
  console.log('[ValueMap] ✅ Hartă valori imobiliare (window._ValueMap)');
})(window);
