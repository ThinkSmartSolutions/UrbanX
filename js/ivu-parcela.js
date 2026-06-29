// ═══════════════════════════════════════════════════════════════════════════
// ivu-parcela.js — iVU pe PARCELĂ (window._IVUParcela) — NATIV în UrbanX
// Indice de Valoare Urbană pe amplasament. Formula:
//   iVU = S⁺ × (1 − P⁻/100) × Kf × Kr × Ka × Kql
//   S⁺ = Σ(Vᵢ·Pᵢ)/ΣPᵢ × 100  (factori 0–10, ponderi sumă 100)
//   P⁻ = min(80, Σ Aᵢ·Sᵢ)     (restricții; severitate 0.30/0.60/1.00)
//   Kf formă parcelă · Kr rețele · Ka accesibilitate UAT · Kql calitate viață UAT (din IVU UAT)
// Factorii se AUTO-SCOREAZĂ din proximitatea reală OSM în jurul parcelei selectate.
// Export PDF pe standardul UrbanX (_initStudyPdf). Cerere Florin 29 iun 2026. · TSS
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  var PROXY = (G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev');
  var N = function (v, d) { return isNaN(+v) ? '-' : Number(v).toLocaleString('ro-RO', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };

  // ── FACTORI POZITIVI (ponderi sumă = 100) + maparea OSM pt auto-scor ──────
  var FACTORI = [
    { id: 'acc', label: 'Accesibilitate & Mobilitate', col: '#4f8ef7', f: [
      { id: 'acc_drum', ico: '🛣️', name: 'Calitate stradă de acces', pond: 8, osm: 'highway', mode: 'street' },
      { id: 'acc_tpub', ico: '🚌', name: 'Transport public', pond: 7, osm: '["public_transport"~"stop_position|platform|station"],["highway"="bus_stop"],["railway"~"station|tram_stop"]', mode: 'dist' },
      { id: 'acc_auto', ico: '🚗', name: 'Acces auto & parcare', pond: 4, osm: '["amenity"="parking"]', mode: 'distcount' },
      { id: 'acc_velo', ico: '🚲', name: 'Mobilitate activă / ciclism', pond: 3, osm: '["highway"="cycleway"],["cycleway"]', mode: 'dist' } ] },
    { id: 'com', label: 'Comerț & Servicii cotidiene', col: '#f0b429', f: [
      { id: 'com_alim', ico: '🛒', name: 'Acces alimente & piețe', pond: 6, osm: '["shop"~"supermarket|convenience|grocery|greengrocer"],["amenity"="marketplace"]', mode: 'dist' },
      { id: 'com_rest', ico: '🍽️', name: 'Restaurante & HoReCa', pond: 5, osm: '["amenity"~"restaurant|cafe|fast_food"]', mode: 'distcount' },
      { id: 'com_serv', ico: '🏪', name: 'Servicii & comerț general', pond: 4, osm: '["shop"]', mode: 'count' } ] },
    { id: 'cult', label: 'Cultură & Timp liber', col: '#7c5cfc', f: [
      { id: 'cult_muze', ico: '🏛️', name: 'Muzee, galerii, patrimoniu', pond: 4, osm: '["tourism"~"museum|gallery|artwork"],["historic"]', mode: 'distcount' },
      { id: 'cult_spect', ico: '🎬', name: 'Cinema, teatru, filarmonică', pond: 4, osm: '["amenity"~"cinema|theatre|arts_centre"]', mode: 'distcount' },
      { id: 'cult_noapte', ico: '🌙', name: 'Viață de noapte & animație', pond: 3, osm: '["amenity"~"bar|pub|nightclub"]', mode: 'count' },
      { id: 'cult_sport', ico: '⚽', name: 'Sport & wellness', pond: 4, osm: '["leisure"~"sports_centre|fitness_centre|pitch|stadium|swimming_pool"]', mode: 'distcount' } ] },
    { id: 'verde', label: 'Spații verzi & Mediu', col: '#2dd4a0', f: [
      { id: 'verde_parc', ico: '🌳', name: 'Parcuri & spații verzi publice', pond: 7, osm: '["leisure"~"park|garden"],["landuse"~"recreation_ground|grass"]', mode: 'dist' },
      { id: 'verde_joaca', ico: '🛝', name: 'Locuri de joacă & infrastructură copii', pond: 5, osm: '["leisure"="playground"]', mode: 'dist' },
      { id: 'verde_calitate', ico: '🌿', name: 'Calitate mediu / aer / fonic', pond: 5, mode: 'derived' } ] },
    { id: 'edu', label: 'Educație & Sănătate', col: '#f05c5c', f: [
      { id: 'edu_sc', ico: '🎓', name: 'Școli & grădinițe', pond: 7, osm: '["amenity"~"school|kindergarten|college|university"]', mode: 'dist' },
      { id: 'edu_san', ico: '🏥', name: 'Sănătate & asistență medicală', pond: 7, osm: '["amenity"~"hospital|clinic|doctors|pharmacy"]', mode: 'dist' } ] },
    { id: 'inf', label: 'Infrastructură & Utilități', col: '#6b789a', f: [
      { id: 'inf_util', ico: '⚡', name: 'Completitudine rețele edilitare', pond: 8, mode: 'derived' },
      { id: 'inf_risc', ico: '🌊', name: 'Absența riscurilor naturale', pond: 6, mode: 'risk' } ] }
  ];
  // ── RESTRICȚII (amplitudine max + categorie) ──────────────────────────────
  var RESTRICTII = [
    { id: 'r_lmi_a', cat: 'Patrimoniu', name: 'LMI clasa A — monument de interes național', amp: 25, legal: 'Legea 422/2001' },
    { id: 'r_lmi_b', cat: 'Patrimoniu', name: 'LMI clasa B — monument de interes local', amp: 15, legal: 'Legea 422/2001' },
    { id: 'r_zcp', cat: 'Patrimoniu', name: 'Zonă construită protejată (ZCP)', amp: 12, legal: 'Legea 350/2001' },
    { id: 'r_n2000', cat: 'Mediu', name: 'Sit Natura 2000 (SCI/SPA)', amp: 30, legal: 'OUG 57/2007' },
    { id: 'r_arii', cat: 'Mediu', name: 'Arie naturală protejată', amp: 25, legal: 'OUG 57/2007' },
    { id: 'r_fond_forestier', cat: 'Mediu', name: 'Fond forestier național', amp: 20, legal: 'Legea 46/2008' },
    { id: 'r_inund', cat: 'Riscuri', name: 'Zonă inundabilă (Hq 1%/0,1%)', amp: 20, legal: 'Directiva 2007/60/CE' },
    { id: 'r_alun', cat: 'Riscuri', name: 'Risc la alunecare / instabilitate', amp: 18, legal: 'HG 447/2003' },
    { id: 'r_seism', cat: 'Riscuri', name: 'Zonă seismică Vrancea (ag > 0,25g)', amp: 10, legal: 'P100-1/2013' },
    { id: 'r_radon', cat: 'Riscuri', name: 'Teren cu emanații radon ridicat', amp: 8, legal: 'OMS/IFIN-HH' },
    { id: 'r_retras', cat: 'Servituți', name: 'Servitute coridoare tehnice (LEA/gaze)', amp: 12, legal: 'Legea 123/2012' },
    { id: 'r_drum', cat: 'Servituți', name: 'Servitute drum național / autostradă', amp: 10, legal: 'OG 43/1997' },
    { id: 'r_curs_apa', cat: 'Servituți', name: 'Culoar de protecție cursuri de apă', amp: 12, legal: 'Legea 107/1996' },
    { id: 'r_airport', cat: 'Servituți', name: 'Zonă servituți aeronautice', amp: 12, legal: 'RACR-CHG' },
    { id: 'r_sapaturi', cat: 'Patrimoniu', name: 'Zonă cu potențial arheologic', amp: 14, legal: 'OG 43/2000' },
    { id: 'r_exprop', cat: 'Utilitate publică', name: 'Grevare utilitate publică / expropriere', amp: 30, legal: 'Legea 255/2010' }
  ];
  var KF = { regulata: 1.00, trapez: 0.92, neregulata: 0.85, unghi_mort: 0.70 };
  var KR = { toate: 1.00, fara_gaze: 0.95, fara_canal: 0.90, fara_apa: 0.82, fara_retele: 0.80 };
  var SEV = { usor: 0.30, mediu: 0.60, grav: 1.00 };

  function _grade(v) { return v >= 85 ? 'A+' : v >= 75 ? 'A' : v >= 65 ? 'B+' : v >= 55 ? 'B' : v >= 45 ? 'C+' : v >= 35 ? 'C' : v >= 25 ? 'D' : 'E'; }

  // ── distanță haversine (m) ────────────────────────────────────────────────
  function _distM(la1, lo1, la2, lo2) { var R = 6371000, d = Math.PI / 180, dla = (la2 - la1) * d, dlo = (lo2 - lo1) * d; var a = Math.sin(dla / 2) * Math.sin(dla / 2) + Math.cos(la1 * d) * Math.cos(la2 * d) * Math.sin(dlo / 2) * Math.sin(dlo / 2); return 2 * R * Math.asin(Math.min(1, Math.sqrt(a))); }
  // scor 0–10 din distanța la cel mai apropiat POI (m)
  function _scoreDist(d) { if (d == null) return 2; return d <= 150 ? 10 : d <= 300 ? 9 : d <= 500 ? 7.5 : d <= 800 ? 6 : d <= 1200 ? 4.5 : d <= 1800 ? 3 : 2; }
  function _scoreCount(c) { return c <= 0 ? 2 : c <= 2 ? 4.5 : c <= 5 ? 6.5 : c <= 12 ? 8 : c <= 30 ? 9 : 10; }

  // ── interogare OSM (Overpass via proxy) pt toate categoriile, o singură dată ──
  async function _fetchOSM(lat, lon, radius) {
    var sels = [];
    FACTORI.forEach(function (g) { g.f.forEach(function (fc) { if (fc.osm) { fc.osm.split('],[').forEach(function (s) { s = s.replace(/^\[|\]$/g, ''); sels.push('nwr[' + s + '](around:' + radius + ',' + lat + ',' + lon + ');'); }); } }); });
    var q = '[out:json][timeout:25];(' + sels.join('') + ');out center tags;';
    try {
      var url = PROXY + '/osm?q=' + encodeURIComponent(q);
      var r = await fetch(url); if (!r.ok) { url = PROXY + '/proxy?url=' + encodeURIComponent('https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(q)); r = await fetch(url); }
      var j = await r.json(); return (j && j.elements) || [];
    } catch (e) { return []; }
  }
  // distribuie elementele OSM pe factori → calculează scoruri reale
  function _scoreFactorsFromOSM(els, lat, lon) {
    var out = {};
    function matches(tags, sel) {
      // sel ex: '["amenity"~"restaurant|cafe"]' → cheie+regex sau '["shop"]' → cheie există
      var m = sel.match(/"([^"]+)"(~"([^"]+)")?/); if (!m) return false;
      var key = m[1], rx = m[3]; var val = tags[key]; if (val == null) return false;
      return rx ? new RegExp('^(' + rx + ')$').test(val) || new RegExp(rx).test(val) : true;
    }
    FACTORI.forEach(function (g) { g.f.forEach(function (fc) {
      if (!fc.osm) return;
      var subs = fc.osm.split('],[').map(function (s) { return '[' + s.replace(/^\[|\]$/g, '') + ']'; });
      var nearest = null, count = 0;
      els.forEach(function (el) {
        var tg = el.tags || {}; var hit = subs.some(function (s) { return matches(tg, s); }); if (!hit) return;
        var elat = el.lat != null ? el.lat : (el.center && el.center.lat), elon = el.lon != null ? el.lon : (el.center && el.center.lon);
        if (elat == null) return; count++;
        var d = _distM(lat, lon, elat, elon); if (nearest == null || d < nearest) nearest = d;
      });
      var sc;
      if (fc.mode === 'dist') sc = _scoreDist(nearest);
      else if (fc.mode === 'count') sc = _scoreCount(count);
      else if (fc.mode === 'distcount') sc = Math.min(10, (_scoreDist(nearest) * 0.6 + _scoreCount(count) * 0.4));
      else sc = null;
      if (sc != null) out[fc.id] = { score: +sc.toFixed(1), nearest: nearest != null ? Math.round(nearest) : null, count: count };
    }); });
    return out;
  }

  // ── calcul iVU ─────────────────────────────────────────────────────────────
  function compute(vals, restr, kfKey, krKey, ka, kql) {
    var sumVP = 0, sumP = 0;
    FACTORI.forEach(function (g) { g.f.forEach(function (fc) { var v = vals[fc.id]; if (v == null) v = 5; sumVP += v * fc.pond; sumP += fc.pond; }); });
    var Splus = sumP > 0 ? (sumVP / sumP / 10) * 100 : 50;
    var Pminus = 0; RESTRICTII.forEach(function (r) { var st = restr[r.id]; if (st && st.activ) Pminus += r.amp * (SEV[st.sev] || 0.6); }); Pminus = Math.min(80, Pminus);
    var Kf = KF[kfKey] || 1.0, Kr = KR[krKey] || 1.0, Ka = ka || 1.0, Kql = kql || 1.0;
    var ivu = Splus * (1 - Pminus / 100) * Kf * Kr * Ka * Kql;
    ivu = Math.max(0, Math.min(100, ivu));
    return { Splus: +Splus.toFixed(1), Pminus: +Pminus.toFixed(1), Kf: Kf, Kr: Kr, Ka: Ka, Kql: Kql, iVU: Math.round(ivu), grade: _grade(ivu) };
  }

  // coeficienți Ka (accesibilitate UAT) + Kql (calitate viață UAT) din IVU UAT
  function _uatCoefs(cityKey) {
    var ka = 1.0, kql = 1.0, uat = null;
    try {
      if (G.UrbanXIVU && G.UrbanXIVU.scoreFor) {
        var s = G.UrbanXIVU.scoreFor(cityKey); if (s && s.R) {
          uat = s;
          var conn = (s.R.dims || []).filter(function (d) { return d.label.indexOf('Conectivitate') === 0; })[0];
          var qual = (s.R.dims || []).filter(function (d) { return d.label.indexOf('Calitate') === 0; })[0];
          if (conn) ka = conn.score >= 80 ? 1.10 : conn.score >= 60 ? 1.05 : conn.score >= 45 ? 1.0 : conn.score >= 30 ? 0.95 : 0.90;
          if (qual) kql = qual.score >= 75 ? 1.10 : qual.score >= 60 ? 1.05 : qual.score >= 45 ? 1.0 : qual.score >= 30 ? 0.95 : 0.90;
        }
      }
    } catch (e) {}
    return { ka: ka, kql: kql, uat: uat };
  }

  // ── parcela selectată ───────────────────────────────────────────────────────
  function _activeParcel() {
    var S = window.S; if (!S || !S.parcels) return null;
    var ap = S.parcels[(S.activeParcel == null ? 0 : S.activeParcel)];
    if (!ap || !ap.geo || !ap.geo.geometry) return null;
    var ctr = null; try { ctr = G.turf ? G.turf.centroid(ap.geo).geometry.coordinates : null; } catch (e) {}
    if (!ctr && ap.center) ctr = ap.center;
    var area = null; try { area = G.turf ? G.turf.area(ap.geo) : null; } catch (e) {}
    return { ap: ap, lat: ctr ? ctr[1] : null, lon: ctr ? ctr[0] : null, area: area, nrcad: ap.nrcad || (ap.properties && ap.properties.nrcad), zone: ap.zone };
  }

  // ── deschide fișa iVU pe parcela selectată (auto-scor OSM) ───────────────────
  async function open() {
    var P = _activeParcel();
    if (!P) { G.ss && G.ss('⚠️ Selectează o parcelă pe hartă pentru fișa iVU pe amplasament.'); return; }
    G.ss && G.ss('🔎 Calculez iVU pe amplasament (proximitate reală OSM)...');
    var cityKey = (G.TCI && G.TCI.cityKey) || 'RO-IS-01';
    var coefs = _uatCoefs(cityKey);
    var els = await _fetchOSM(P.lat, P.lon, 1500);
    var osmScores = _scoreFactorsFromOSM(els, P.lat, P.lon);
    // valori factori: din OSM unde există; derived/risk → din context
    var vals = {}, evidence = {};
    FACTORI.forEach(function (g) { g.f.forEach(function (fc) {
      if (osmScores[fc.id]) { vals[fc.id] = osmScores[fc.id].score; evidence[fc.id] = osmScores[fc.id]; }
      else if (fc.mode === 'risk') { var ag = _seismAg(cityKey); vals[fc.id] = ag >= 0.30 ? 4 : ag >= 0.20 ? 6.5 : 8.5; evidence[fc.id] = { note: 'ag=' + ag + 'g' }; }
      else if (fc.id === 'inf_util') { vals[fc.id] = (P.zone && P.zone.utrNr) ? 8.5 : 6.5; evidence[fc.id] = { note: 'estimat din regim urban' }; }
      else { vals[fc.id] = 6; evidence[fc.id] = { note: 'estimare' }; }
    }); });
    // restricții auto-detectate
    var restr = await _autoRestrictii(P, cityKey);
    // formă + rețele (default; editabile în panou)
    var state = { vals: vals, evidence: evidence, restr: restr, kf: 'regulata', kr: 'toate', P: P, cityKey: cityKey, coefs: coefs };
    state.result = compute(vals, restr, state.kf, state.kr, coefs.ka, coefs.kql);
    G._IVUParcela._state = state;
    if (G._IVUParcela._renderPanel) G._IVUParcela._renderPanel(state);
    else G.ss && G.ss('iVU calculat: ' + state.result.iVU + '/100 (' + state.result.grade + ')');
  }

  function _seismAg(cityKey) { try { var c = G.UrbanXIVU && G.UrbanXIVU.scoreFor && G.UrbanXIVU.scoreFor(cityKey); var jud = c && c.city && c.city.judet; if (G._getSeismic && jud) return G._getSeismic(jud).ag || 0.2; } catch (e) {} return 0.2; }

  async function _autoRestrictii(P, cityKey) {
    var restr = {};
    // seismic
    try { if (_seismAg(cityKey) > 0.25) restr.r_seism = { activ: true, sev: 'mediu' }; } catch (e) {}
    // patrimoniu (LMI) — dacă există monument în proximitate
    try { if (G._LMI && G._LMI.avizForParcel && P.lat != null) { var av = await G._LMI.avizForParcel(P.lat, P.lon); if (av && av.nivel) { if (/A|national/i.test(av.nivel)) restr.r_lmi_a = { activ: true, sev: 'mediu' }; else restr.r_lmi_b = { activ: true, sev: 'usor' }; } } } catch (e) {}
    // profil teritorial → deltă/litoral implică Natura 2000 / arii protejate
    try { if (G._UATProfile && G._UATProfile.detect) { var city = G.UrbanXIVU && G.UrbanXIVU.scoreFor && G.UrbanXIVU.scoreFor(cityKey); city = city && city.city; var det = city ? G._UATProfile.detect(city) : []; if (det.some(function (d) { return d.id === 'delta'; })) restr.r_n2000 = { activ: true, sev: 'grav' }; if (det.some(function (d) { return d.id === 'silvic'; })) restr.r_fond_forestier = { activ: true, sev: 'mediu' }; } } catch (e) {}
    return restr;
  }

  G._IVUParcela = { open: open, compute: compute, FACTORI: FACTORI, RESTRICTII: RESTRICTII, KF: KF, KR: KR, exportPDF: null, _state: null };
  window._IVUParcela = G._IVUParcela;
  console.log('[IVUParcela] ✅ iVU pe parcelă încărcat (window._IVUParcela.open)');

  // panoul + PDF sunt în partea 2 (ivu-parcela-ui.js) ca să rămână fișierul lizibil
})(window);
