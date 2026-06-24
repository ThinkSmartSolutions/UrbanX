/* ============================================================================
 * UrbanX CAU — Comisia de Acorduri Unice (motor client-side, Faza 1 funcțională)
 * Determină automat avizele necesare pentru un Certificat de Urbanism, din:
 * parcela selectată + tipul lucrării + zona PUG + rețelele din jur (OSM).
 * Include: motor de reguli (9 reguli, Legea 50/1991), registru CU persistent,
 * calcul „aviz tacit favorabil" la 30 zile, fetch rețele OSM (best-effort).
 *
 * window.CAU.computeNotices(ctx) · fetchNetworks(centroid) · registry · tacitCheck
 *
 * ONEST: rețelele din OSM = data_quality 'estimat'; unde lipsesc date → 'verificare
 * manuală'. NU substituie avizarea oficială — vezi disclaimerul din CU.
 * Backend (Faza 2): dispecerizare email către deținători + portal deținători + multi-user.
 * ========================================================================== */
(function (G) {
  'use strict';

  // ── Zone de protecție rețele (m) — legislație RO ─────────────────────────
  var PROTECTION = {
    gaz_redusa: { prot: 1, safety: 3, holder: 'Operator distribuție gaze (Delgaz/Distrigaz)', label: 'Gaze presiune redusă' },
    gaz_medie: { prot: 3, safety: 10, holder: 'Operator distribuție gaze', label: 'Gaze presiune medie' },
    gaz_inalta: { prot: 5, safety: 20, holder: 'Transgaz', label: 'Gaze presiune înaltă' },
    electric_jt: { prot: 0.6, safety: 1, holder: 'Operator distribuție energie (Delgaz/E-Distribuție)', label: 'Electric JT 0.4kV' },
    electric_mt: { prot: 1, safety: 3, holder: 'Operator distribuție energie', label: 'Electric MT 6-20kV' },
    electric_it: { prot: 6, safety: 20, holder: 'Transelectrica / operator', label: 'Electric ÎT 110kV' },
    apa: { prot: 3, safety: 10, holder: 'Operator apă-canal (RAJA/ApaVital/etc.)', label: 'Apă potabilă' },
    canal: { prot: 3, safety: 3, holder: 'Operator apă-canal', label: 'Canalizare' },
    termoficare: { prot: 2, safety: 5, holder: 'Operator termoficare', label: 'Termoficare' },
    telecom: { prot: 0.5, safety: 0.5, holder: 'Operator telecomunicații', label: 'Telecomunicații' }
  };

  // ── Mapare tag OSM -> tip rețea CAU ───────────────────────────────────────
  function osmToType(tags) {
    if (!tags) return null;
    if (tags.power === 'line') return 'electric_it';
    if (tags.power === 'minor_line') return 'electric_mt';
    if (tags.power === 'cable') return 'electric_jt';
    if (tags.man_made === 'pipeline' && /gas/i.test(tags.substance || tags.type || '')) return 'gaz_medie';
    if (tags.man_made === 'pipeline' && /water/i.test(tags.substance || '')) return 'apa';
    if (tags.pipeline === 'substation' || tags.power === 'substation') return 'electric_it';
    return null;
  }

  // ── Fetch rețele OSM în jurul parcelei (best-effort, prin proxy Overpass) ──
  function fetchNetworks(centroid, radiusM) {
    radiusM = radiusM || 120;
    var proxy = G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
    var lat = centroid[1], lon = centroid[0];
    var q = '[out:json][timeout:20];(' +
      'way(around:' + radiusM + ',' + lat + ',' + lon + ')[power];' +
      'way(around:' + radiusM + ',' + lat + ',' + lon + ')[man_made=pipeline];' +
      'way(around:' + radiusM + ',' + lat + ',' + lon + ')[railway~"rail|light_rail|tram"];' +
      'way(around:' + radiusM + ',' + lat + ',' + lon + ')[highway~"motorway|trunk|primary|secondary|tertiary|residential|unclassified"];' +
      'way(around:200,' + lat + ',' + lon + ')[waterway~"river|stream|canal"];' +
      ');out geom;';
    return fetch(proxy + '/osm?q=' + encodeURIComponent(q), { signal: AbortSignal.timeout ? AbortSignal.timeout(22000) : undefined })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (j) { return parseOsm(j, centroid); });
  }

  function parseOsm(j, centroid) {
    var out = { networks: [], railway_m: null, road_m: null, water_m: null };
    var pt = G.turf && G.turf.point(centroid);
    (j.elements || []).forEach(function (e) {
      if (!e.geometry || !e.geometry.length || !pt) return;
      var line = G.turf.lineString(e.geometry.map(function (p) { return [p.lon, p.lat]; }));
      var d = G.turf.pointToLineDistance(pt, line, { units: 'meters' });
      var t = e.tags || {};
      var nt = osmToType(t);
      if (nt) out.networks.push({ type: nt, distance_m: Math.round(d), operator: PROTECTION[nt].holder, data_quality: 'estimat' });
      else if (t.railway) out.railway_m = out.railway_m == null ? Math.round(d) : Math.min(out.railway_m, Math.round(d));
      else if (t.highway) out.road_m = out.road_m == null ? Math.round(d) : Math.min(out.road_m, Math.round(d));
      else if (t.waterway) out.water_m = out.water_m == null ? Math.round(d) : Math.min(out.water_m, Math.round(d));
    });
    out.networks.sort(function (a, b) { return a.distance_m - b.distance_m; });
    return out;
  }

  // ── Tipuri de utilizare ────────────────────────────────────────────────────
  var USE_LABELS = {
    locuire: 'Locuire', comercial: 'Comerț', birouri: 'Birouri', industrial: 'Industrial',
    hotelier: 'Hotelier', depozitare: 'Depozitare', gradinita: 'Grădiniță', scoala: 'Școală',
    spital: 'Spital', clinica: 'Clinică', cresa: 'Creșă', centru_social: 'Centru social', mixt: 'Mixt'
  };

  // ── MOTORUL DE REGULI (9 reguli, Legea 50/1991) ───────────────────────────
  function computeNotices(ctx) {
    var w = ctx.work || {}, pug = ctx.pug || {}, risks = ctx.risks || {};
    var nets = ctx.networks || [];
    var area = +w.area_m2 || 0, floors = +w.floors || 0, use = w.use || 'locuire';
    var notices = [];
    function add(n) { notices.push(Object.assign({ is_mandatory: false, recommended: false, data_quality_flag: 'regula', network_proximity_m: null }, n)); }

    // Regula 1 — proximitate rețele (din OSM)
    nets.forEach(function (n) {
      var p = PROTECTION[n.type]; if (!p) return;
      if (n.distance_m <= p.prot) add({ notice_type: 'retea_' + n.type, holder_name: p.holder, is_mandatory: true, legal_basis: 'Legea 50/1991 · zona de protecție ' + p.label + ' (' + p.prot + 'm)', data_quality_flag: n.data_quality, network_proximity_m: n.distance_m, label: 'Aviz ' + p.label + ' — rețea la ' + n.distance_m + 'm (în zona de protecție)' });
      else if (n.distance_m <= 50) add({ notice_type: 'retea_' + n.type, holder_name: p.holder, recommended: true, legal_basis: 'Legea 50/1991 · racordare posibilă ' + p.label, data_quality_flag: n.data_quality, network_proximity_m: n.distance_m, label: 'Aviz ' + p.label + ' — rețea la ' + n.distance_m + 'm (probabil necesar la racordare)' });
    });

    // Regula 2 — ISU
    var isu = floors >= 2 || area >= 600 || ['comercial', 'birouri', 'industrial', 'hotelier'].indexOf(use) >= 0 || (use === 'locuire' && area >= 2000);
    if (isu) add({ notice_type: 'isu', holder_name: 'Inspectoratul pentru Situații de Urgență (ISU)', is_mandatory: true, legal_basis: 'Legea 307/2006 · HG 571/2016 (securitate la incendiu)', label: 'Aviz/Autorizație securitate la incendiu (ISU)' });

    // Regula 3 — Cultura (patrimoniu) — integrare cu modulul Heritage (10)
    var heritage = (ctx.parcel_centroid && G.Heritage && G.Heritage.checkProximity) ? G.Heritage.checkProximity(ctx.parcel_centroid, 100) : [];
    if (pug.in_protected_zone || heritage.length) {
      var hn = heritage.length ? (' — ' + heritage[0].name + ' (' + heritage[0].level + ') la ' + heritage[0].distance_m + 'm' + (heritage[0].lmi_code ? ', LMI ' + heritage[0].lmi_code : '')) : '';
      add({ notice_type: 'cultura', holder_name: 'Direcția Județeană pentru Cultură', is_mandatory: true, legal_basis: 'Legea 422/2001 (monumente istorice)', data_quality_flag: heritage.length ? 'verified' : 'regula', network_proximity_m: heritage.length ? heritage[0].distance_m : null, label: 'Aviz Cultură — monument/zonă protejată' + hn });
    } else add({ notice_type: 'cultura', holder_name: 'Direcția Județeană pentru Cultură', recommended: true, data_quality_flag: 'no_data', legal_basis: 'Legea 422/2001', label: 'Verificare manuală — proximitate monumente/zonă protejată (LMI)' });

    // Regula 4 — Apele Române
    var flood = risks.flood_q1 || risks.flood_q10 || risks.flood_q100;
    var nearWater = (risks.near_water_m != null && risks.near_water_m <= 200) || (ctx.water_m != null && ctx.water_m <= 200);
    if (flood || nearWater) add({ notice_type: 'apele', holder_name: 'Administrația Bazinală de Apă (ANAR)', is_mandatory: true, legal_basis: 'Legea 107/1996 (legea apelor)', data_quality_flag: flood ? 'estimat' : 'estimat', network_proximity_m: ctx.water_m || risks.near_water_m || null, label: 'Aviz de gospodărire a apelor (ANAR)' });
    else add({ notice_type: 'apele', holder_name: 'Administrația Bazinală de Apă (ANAR)', recommended: true, data_quality_flag: 'no_data', legal_basis: 'Legea 107/1996', label: 'Verificare manuală — risc inundații / proximitate ape' });

    // Regula 5 — Drumuri
    if (ctx.road_m != null && ctx.road_m <= 8) add({ notice_type: 'drumuri', holder_name: 'Administratorul drumului (CNAIR/CJ/Primărie)', is_mandatory: true, legal_basis: 'OG 43/1997 (regimul drumurilor)', data_quality_flag: 'estimat', network_proximity_m: ctx.road_m, label: 'Aviz acces la drumul public (la ' + ctx.road_m + 'm)' });

    // Regula 6 — CFR
    if (ctx.railway_m != null && ctx.railway_m <= 100) add({ notice_type: 'cfr', holder_name: 'CNCF CFR SA', is_mandatory: true, legal_basis: 'OUG 12/1998 (zona de siguranță CF, 100m)', data_quality_flag: 'estimat', network_proximity_m: ctx.railway_m, label: 'Aviz CFR — cale ferată la ' + ctx.railway_m + 'm' });

    // Regula 7 — Mediu
    var mediu = area > 5000 || (['industrial', 'depozitare'].indexOf(use) >= 0 && area > 1000) || risks.natura2000;
    if (mediu) add({ notice_type: 'mediu', holder_name: 'Agenția pentru Protecția Mediului (APM)', is_mandatory: true, legal_basis: 'Legea 292/2018 (evaluarea impactului asupra mediului)', label: 'Aviz/Acord de mediu (APM)' });

    // Regula 8 — DSP
    if (['gradinita', 'scoala', 'spital', 'clinica', 'cresa', 'centru_social'].indexOf(use) >= 0) add({ notice_type: 'dsp', holder_name: 'Direcția de Sănătate Publică (DSP)', is_mandatory: true, legal_basis: 'Legea 95/2006 · Ord. MS 119/2014', label: 'Aviz/Notificare sanitară (DSP)' });

    // Regula 9 — ANRE electric (stație/LEA ÎT < 500m)
    var hv = nets.some(function (n) { return n.type === 'electric_it' && n.distance_m <= 500; });
    if (hv && !notices.some(function (x) { return x.notice_type === 'retea_electric_it'; })) add({ notice_type: 'anre_electric', holder_name: 'Operator transport energie / ANRE', recommended: true, data_quality_flag: 'estimat', legal_basis: 'Legea 123/2012 (energiei electrice)', label: 'Aviz energetic — LEA ÎT / stație în zonă' });

    var mandatory = notices.filter(function (n) { return n.is_mandatory; });
    return {
      notices: notices, count: notices.length,
      mandatory_count: mandatory.length,
      recommended_count: notices.length - mandatory.length,
      has_estimated: notices.some(function (n) { return n.data_quality_flag === 'estimat'; }),
      has_no_data: notices.some(function (n) { return n.data_quality_flag === 'no_data'; })
    };
  }

  // ── REGISTRU CU + aviz tacit favorabil (Legea 50/1991, Art. 7) ─────────────
  var RKEY = 'cau_registry_v1';
  var DAY = 86400000;
  function regAll() { try { return JSON.parse(localStorage.getItem(RKEY) || '[]'); } catch (e) { return []; } }
  function regSave(a) { try { localStorage.setItem(RKEY, JSON.stringify(a)); } catch (e) {} }

  function tacitCheck(cu) {
    // marchează avizele „trimise" cu termen depășit ca favorabil_tacit (calcul, nu cron)
    var now = Date.now(), changed = false;
    (cu.notices || []).forEach(function (n) {
      if (n.status === 'trimis' && n.deadline && now > n.deadline && !n.tacit) {
        n.status = 'favorabil_tacit'; n.tacit = true;
        n.tacit_log = 'Aviz tacit favorabil conform Legii 50/1991, Art. 7, alin. (2): termenul de 30 zile a expirat fără răspuns';
        changed = true;
      }
    });
    return changed;
  }
  function daysLeft(n) {
    if (!n.deadline) return null;
    return Math.ceil((n.deadline - Date.now()) / DAY);
  }

  // ── TARIFE (RON, orientative) — taxa CU + serviciul CAU + tarifele avizatorilor ──
  var AVIZ_TARIFE = { retea_gaz_redusa: 150, retea_gaz_medie: 200, retea_gaz_inalta: 300, retea_electric_jt: 120, retea_electric_mt: 180, retea_electric_it: 300, retea_apa: 150, retea_canal: 150, isu: 0, cultura: 100, apele: 250, drumuri: 200, cfr: 300, mediu: 500, dsp: 150, anre_electric: 200 };
  var TAXA_CU_FIX = 100, TAXA_SERVICIU_CAU_FIX = 200, TAXA_SERVICIU_CAU_PER_AVIZ = 50;
  // canalul de comunicare cu avizatorul (cum legăm tehnic) — Faza 2 server pt API/email real
  var CHANNELS = { isu: 'email', cultura: 'email', apele: 'email', drumuri: 'email', cfr: 'email', mediu: 'portal', dsp: 'email', anre_electric: 'email' };
  function channelFor(nt) { if (/^retea_/.test(nt)) return 'api'; return CHANNELS[nt] || 'email'; }
  function avizTarif(t) { return AVIZ_TARIFE[t] != null ? AVIZ_TARIFE[t] : 150; }
  function feeBreakdown(cu) {
    var mand = (cu.notices || []).filter(function (x) { return x.is_mandatory; });
    var avize = mand.reduce(function (s, x) { return s + avizTarif(x.notice_type); }, 0);
    var serviciu = TAXA_SERVICIU_CAU_FIX + TAXA_SERVICIU_CAU_PER_AVIZ * mand.length;
    return { taxa_cu: TAXA_CU_FIX, taxa_serviciu_cau: serviciu, avize_tarife: avize, total: TAXA_CU_FIX + serviciu + avize, n_avize: mand.length };
  }
  function canIssueAcord(cu) {
    var mand = (cu.notices || []).filter(function (x) { return x.is_mandatory; });
    if (!mand.length) return false;
    return mand.every(function (n) { return n.status === 'favorabil' || n.status === 'favorabil_tacit'; });
  }

  // ── CICLU DE VIAȚĂ (3 roluri): cerere_depusa → cu_emis → avize_in_curs → acord_unic ──
  var registry = {
    list: function () { var a = regAll(); var ch = false; a.forEach(function (cu) { if (tacitCheck(cu)) ch = true; }); if (ch) regSave(a); return a; },
    // SOLICITANT: depune cererea de CU
    add: function (cu) {
      var a = regAll();
      cu.id = 'cu' + Date.now() + '_' + Math.round(Math.random() * 1e4);
      cu.registration_number = 'CU-' + new Date().getFullYear() + '-' + (a.length + 1);
      cu.created_at = Date.now(); cu.status = 'cerere_depusa'; cu.fee = feeBreakdown(cu);
      (cu.notices || []).forEach(function (n) { n.channel = channelFor(n.notice_type); n.tarif = avizTarif(n.notice_type); n.status = 'neinitiat'; });
      a.push(cu); regSave(a); return cu;
    },
    // PRIMĂRIA: emite Certificatul de Urbanism
    issueCU: function (id) { var a = regAll(); var cu = a.filter(function (c) { return c.id === id; })[0]; if (!cu) return null; cu.status = 'cu_emis'; cu.cu_emis_at = Date.now(); regSave(a); return cu; },
    // SOLICITANTUL comandă obținerea avizelor → PRIMĂRIA le obține ÎN NUMELE lui (contra-cost)
    comandaAvize: function (id) {
      var a = regAll(); var cu = a.filter(function (c) { return c.id === id; })[0]; if (!cu) return null;
      if (cu.status === 'cerere_depusa') cu.status = 'cu_emis';
      var dl = Date.now() + 30 * DAY;
      (cu.notices || []).forEach(function (n) { if (n.status === 'neinitiat' || n.status === 'in_asteptare') { n.status = 'trimis'; n.sent_at = Date.now(); n.deadline = dl; } });
      cu.status = 'avize_in_curs'; cu.avize_comandate_at = Date.now(); cu.fee = feeBreakdown(cu); regSave(a); return cu;
    },
    // AVIZATORUL răspunde (favorabil / cu_conditii / nefavorabil)
    setNotice: function (id, idx, status, note) {
      var a = regAll(); var cu = a.filter(function (c) { return c.id === id; })[0]; if (!cu || !cu.notices[idx]) return null;
      cu.notices[idx].status = status; if (note) cu.notices[idx].response_note = note; regSave(a); return cu;
    },
    // PRIMĂRIA emite Acordul Unic când toate avizele obligatorii sunt favorabile/tacite
    emiteAcordUnic: function (id) {
      var a = regAll(); var cu = a.filter(function (c) { return c.id === id; })[0]; if (!cu) return null;
      if (!canIssueAcord(cu)) return { error: 'Nu toate avizele obligatorii sunt favorabile/tacite.' };
      cu.status = 'acord_unic'; cu.acord_number = 'AU-' + new Date().getFullYear() + '-' + (a.length); cu.acord_emis_at = Date.now(); regSave(a); return cu;
    },
    remove: function (id) { regSave(regAll().filter(function (c) { return c.id !== id; })); },
    daysLeft: daysLeft, feeBreakdown: feeBreakdown, canIssueAcord: canIssueAcord, channelFor: channelFor
  };

  // ── DESEN REȚELE EDILITARE PE HARTĂ (subterane + supraterane) ─────────────
  // Trasează liniile reale din OSM, colorate pe categorie, cu legendă.
  var NET_STYLE = {
    electric_it: { col: '#ef4444', w: 3, lbl: 'Electric ÎT 110kV (suprateran)' },
    electric_mt: { col: '#f97316', w: 2.2, lbl: 'Electric MT 6–20kV' },
    electric_jt: { col: '#fbbf24', w: 1.6, lbl: 'Electric JT 0,4kV (subteran)' },
    gaz: { col: '#a78bfa', w: 2.4, lbl: 'Gaze (subteran)' },
    apa: { col: '#38bdf8', w: 2.4, lbl: 'Apă/conductă (subteran)' },
    pipeline: { col: '#c084fc', w: 2, lbl: 'Conductă (subteran)' },
    rail: { col: '#94a3b8', w: 2, lbl: 'Cale ferată' },
    water: { col: '#22d3ee', w: 2.4, lbl: 'Curs de apă' }
  };
  function classifyDraw(t) {
    if (!t) return null;
    if (t.power === 'line') return 'electric_it';
    if (t.power === 'minor_line') return 'electric_mt';
    if (t.power === 'cable') return 'electric_jt';
    if (t.man_made === 'pipeline') return /gas/i.test(t.substance || t.type || '') ? 'gaz' : (/water/i.test(t.substance || '') ? 'apa' : 'pipeline');
    if (t.railway) return 'rail';
    if (t.waterway) return 'water';
    return null;
  }
  function drawNetworks(map, centroid, radiusM) {
    if (!map) return Promise.resolve(0);
    radiusM = radiusM || 350;
    var proxy = G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
    var lat = centroid[1], lon = centroid[0];
    var q = '[out:json][timeout:25];(' +
      'way(around:' + radiusM + ',' + lat + ',' + lon + ')[power~"line|minor_line|cable"];' +
      'way(around:' + radiusM + ',' + lat + ',' + lon + ')[man_made=pipeline];' +
      'way(around:' + radiusM + ',' + lat + ',' + lon + ')[railway~"rail|light_rail|tram"];' +
      'way(around:' + radiusM + ',' + lat + ',' + lon + ')[waterway~"river|stream|canal"];' +
      ');out geom;';
    return fetch(proxy + '/osm?q=' + encodeURIComponent(q))
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (j) {
        var feats = [];
        (j.elements || []).forEach(function (e) {
          if (!e.geometry || e.geometry.length < 2) return;
          var cat = classifyDraw(e.tags || {}); if (!cat) return;
          feats.push({ type: 'Feature', properties: { cat: cat }, geometry: { type: 'LineString', coordinates: e.geometry.map(function (p) { return [p.lon, p.lat]; }) } });
        });
        var fc = { type: 'FeatureCollection', features: feats };
        try { if (map.getSource('cau-net-src')) map.getSource('cau-net-src').setData(fc); else map.addSource('cau-net-src', { type: 'geojson', data: fc }); } catch (e) {}
        var colorExpr = ['match', ['get', 'cat']];
        var widthExpr = ['match', ['get', 'cat']];
        Object.keys(NET_STYLE).forEach(function (k) { colorExpr.push(k, NET_STYLE[k].col); widthExpr.push(k, NET_STYLE[k].w); });
        colorExpr.push('#999'); widthExpr.push(1.5);
        try {
          if (!map.getLayer('cau-net')) map.addLayer({ id: 'cau-net', type: 'line', source: 'cau-net-src', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': colorExpr, 'line-width': widthExpr, 'line-opacity': 0.9 } });
        } catch (e) {}
        _netLegend(feats);
        return feats.length;
      });
  }
  function _netLegend(feats) {
    _netLegendClear();
    var present = {}; feats.forEach(function (f) { present[f.properties.cat] = true; });
    var el = document.createElement('div');
    el.id = 'cau-net-legend';
    el.style.cssText = 'position:fixed;bottom:90px;right:14px;z-index:8000;background:rgba(11,20,36,.92);color:#e6edf7;border:1px solid rgba(56,189,248,.3);border-radius:10px;padding:10px 12px;font-family:system-ui,sans-serif;font-size:11px;max-width:230px;box-shadow:0 6px 24px rgba(0,0,0,.4)';
    var rows = Object.keys(NET_STYLE).filter(function (k) { return present[k]; }).map(function (k) {
      return '<div style="display:flex;align-items:center;gap:7px;margin:3px 0"><span style="width:18px;height:3px;background:' + NET_STYLE[k].col + ';display:inline-block;border-radius:2px"></span>' + NET_STYLE[k].lbl + '</div>';
    }).join('') || '<div style="opacity:.6">Nicio rețea în OSM pe această zonă.</div>';
    el.innerHTML = '<div style="font-weight:700;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">🔌 Rețele edilitare (OSM)<span onclick="CAU.clearNetworks(window.map)" style="cursor:pointer;opacity:.6">×</span></div>' + rows +
      '<div style="margin-top:7px;font-size:9px;opacity:.5;line-height:1.4">Sursă: OpenStreetMap (estimativ). NU înlocuiește planurile de coordonare ale deținătorilor de rețea.</div>';
    document.body.appendChild(el);
  }
  function _netLegendClear() { var e = document.getElementById('cau-net-legend'); if (e) try { e.remove(); } catch (x) {} }
  function clearNetworks(map) {
    _netLegendClear();
    if (!map) return;
    try { if (map.getLayer('cau-net')) map.removeLayer('cau-net'); } catch (e) {}
    try { if (map.getSource('cau-net-src')) map.removeSource('cau-net-src'); } catch (e) {}
  }
  // deschidere ca acțiune standalone din launcher (centru = parcelă selectată sau centrul hărții)
  function showNetworksPanel() {
    var map = G.map; if (!map) { if (G.ss) G.ss('Harta nu este pregătită.'); return; }
    if (map.getLayer && map.getLayer('cau-net')) { clearNetworks(map); return; }
    var ctr = null;
    try { if (G.TCI && G.TCI.selectedParcelCentroid) ctr = G.TCI.selectedParcelCentroid; } catch (e) {}
    if (!ctr) { var c = map.getCenter(); ctr = [c.lng, c.lat]; }
    if (G.ss) G.ss('🔌 Caut rețelele edilitare (OSM)…');
    drawNetworks(map, ctr, 400).then(function (n) { if (G.ss) G.ss(n ? ('🔌 ' + n + ' tronsoane de rețea afișate.') : 'Nicio rețea găsită în OSM pe această zonă.'); })
      .catch(function (e) { if (G.ss) G.ss('Eroare rețele: ' + e.message); });
  }

  G.CAU = {
    computeNotices: computeNotices, fetchNetworks: fetchNetworks,
    drawNetworks: drawNetworks, clearNetworks: clearNetworks, showNetworksPanel: showNetworksPanel, NET_STYLE: NET_STYLE,
    registry: registry, PROTECTION: PROTECTION, USE_LABELS: USE_LABELS, tacitCheck: tacitCheck, daysLeft: daysLeft
  };
  console.log('[CAU] motor Acorduri Unice încărcat (window.CAU)');
})(window);
