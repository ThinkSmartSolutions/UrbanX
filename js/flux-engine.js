/* ============================================================================
 * UrbanX Flux — Motor Faza 1 (Impact de trafic) · port JS al four_step_model.py
 * Inteligența mobilității urbane. Rulează 100% în browser (serverless), oglindă
 * 1:1 a motorului Python din urbanx-mobility/backend/app/core.
 *
 * window.Flux.compute(scenario, params) -> rezultat complet (trips, modal, intersecții,
 * parcare, emisii, conformitate). Vezi flux-report.js pt PDF.
 *
 * Referințe: NP 068/2002 · GD 525/1996 · STAS 10144 · HG 874/2019 · ITE 10th/11th · IPCC 2023
 * ========================================================================== */
(function (G) {
  'use strict';

  // ── 1. RATE ITE direcționale (am_in, am_out, pm_in, pm_out) ──────────────
  // basis: "unit" = per locuință; "100sqm" = per 100 mp ADC
  var TRIP_RATES = {
    residential: { am_in: 0.11, am_out: 0.51, pm_in: 0.62, pm_out: 0.31, basis: 'unit',   ite: 'ITE 220 Multifamily' },
    office:      { am_in: 1.56, am_out: 0.20, pm_in: 0.29, pm_out: 1.38, basis: '100sqm', ite: 'ITE 710 General Office' },
    retail:      { am_in: 0.96, am_out: 0.78, pm_in: 3.81, pm_out: 3.71, basis: '100sqm', ite: 'ITE 820 Shopping Center' },
    supermarket: { am_in: 5.82, am_out: 5.31, pm_in: 8.10, pm_out: 7.95, basis: '100sqm', ite: 'ITE 850 Supermarket' },
    school:      { am_in: 1.21, am_out: 0.05, pm_in: 0.07, pm_out: 1.15, basis: '100sqm', ite: 'ITE 520 School (proxy mp)' },
    hospital:    { am_in: 1.14, am_out: 0.48, pm_in: 0.53, pm_out: 1.02, basis: '100sqm', ite: 'ITE 610 Hospital' },
    industrial:  { am_in: 0.73, am_out: 0.14, pm_in: 0.17, pm_out: 0.68, basis: '100sqm', ite: 'ITE 110 Light Industrial' },
    mixed_use:   { am_in: 1.00, am_out: 0.50, pm_in: 1.00, pm_out: 1.00, basis: '100sqm', ite: 'compozit' }
  };

  // ── 2. Parcare (GD 525/1996) — [rată, basis] ─────────────────────────────
  var PARKING_RATES = {
    residential: [1.20, 'unit'],
    office:      [1 / 35, 'sqm'],
    retail:      [1 / 25, 'sqm'],
    supermarket: [1 / 20, 'sqm'],
    school:      [1 / 100, 'sqm'],
    hospital:    [1 / 40, 'sqm'],
    industrial:  [1 / 100, 'sqm'],
    mixed_use:   [1 / 35, 'sqm']
  };

  // ── 3. Factori emisie (g CO₂/km/pasager) — IPCC 2023 + mix RO ────────────
  var EMISSION_G_KM = { auto: 180, pt: 68, bicycle: 0, pedestrian: 0 };
  var AVG_TRIP_KM   = { auto: 4.2, pt: 6.1, bicycle: 1.8, pedestrian: 0.6 };

  // ── 4. LOS (v/c) ─────────────────────────────────────────────────────────
  var LOS_THRESHOLDS = { A: 0.35, B: 0.55, C: 0.75, D: 0.85, E: 0.95, F: 1.0 };
  var LOS_D_VC = 0.85;

  // ── 5. Repartiție modală implicită pe mărime oraș (INS/ANCPI) ────────────
  var MODAL_BY_SIZE = {
    metropolis: { auto: 0.50, pt: 0.34, bicycle: 0.05, pedestrian: 0.11 },
    city:       { auto: 0.58, pt: 0.28, bicycle: 0.04, pedestrian: 0.10 },
    town:       { auto: 0.55, pt: 0.15, bicycle: 0.06, pedestrian: 0.24 },
    commune:    { auto: 0.62, pt: 0.10, bicycle: 0.05, pedestrian: 0.23 }
  };

  function defaultParams() {
    return {
      beta_gravity: 0.15,
      peak_hour_factor: 0.088,
      city_size: 'city',
      parking_pt_reduction_max: 0.30,
      default_lane_capacity_vph: 1800
    };
  }

  // ── PASUL 1: generarea deplasărilor ──────────────────────────────────────
  function tripGeneration(components, params) {
    var am_in = 0, am_out = 0, pm_in = 0, pm_out = 0;
    components.forEach(function (c) {
      var r = TRIP_RATES[c.land_use]; if (!r) return;
      var q = (r.basis === 'unit') ? (c.units || 0) : ((c.gross_floor_area_sqm || 0) / 100);
      am_in += q * r.am_in; am_out += q * r.am_out;
      pm_in += q * r.pm_in; pm_out += q * r.pm_out;
    });
    var am_total = am_in + am_out, pm_total = pm_in + pm_out;
    var daily = params.peak_hour_factor > 0 ? ((am_total + pm_total) / 2) / params.peak_hour_factor : 0;
    return {
      am_in: r1(am_in), am_out: r1(am_out), pm_in: r1(pm_in), pm_out: r1(pm_out),
      am_total: r1(am_total), pm_total: r1(pm_total), daily: Math.round(daily)
    };
  }

  // ── PASUL 2: distribuție gravitațională ──────────────────────────────────
  function gravityDistribution(totalTrips, zones, params) {
    if (!zones || !zones.length || totalTrips <= 0) return [];
    var weights = zones.map(function (z) {
      return Math.max(z.attraction || 0, 0) * Math.exp(-params.beta_gravity * Math.max(z.distance_km || 0, 0));
    });
    var denom = weights.reduce(function (a, b) { return a + b; }, 0);
    return zones.map(function (z, i) {
      var share = denom > 0 ? weights[i] / denom : 0;
      return { zone_id: z.zone_id, trips: r1(totalTrips * share), share: r4(share), distance_km: z.distance_km };
    });
  }

  // ── PASUL 3: repartiție modală (implicit RO ajustat pe scor TP) ──────────
  function modalSplit(trips, params, ptScore) {
    var base = MODAL_BY_SIZE[params.city_size] || MODAL_BY_SIZE.city;
    var shift = ((ptScore == null ? 0.5 : ptScore) - 0.5) * 0.16;
    var split = {
      auto: Math.max(0.05, base.auto - shift),
      pt:   Math.max(0.02, base.pt + shift),
      bicycle: base.bicycle, pedestrian: base.pedestrian
    };
    var s = split.auto + split.pt + split.bicycle + split.pedestrian;
    var shares = {}, counts = {};
    ['auto', 'pt', 'bicycle', 'pedestrian'].forEach(function (m) {
      shares[m] = r4(split[m] / s);
      counts[m] = r1(trips * (split[m] / s));
    });
    return { shares: shares, counts: counts };
  }

  // ── PASUL 4: încărcarea intersecțiilor ───────────────────────────────────
  function losForVc(vc) {
    var grades = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < grades.length; i++) if (vc <= LOS_THRESHOLDS[grades[i]]) return grades[i];
    return 'F';
  }
  function intersectionLoading(autoPeak, intersections, params) {
    return (intersections || []).map(function (ix) {
      var added = autoPeak * Math.max(0, Math.min(ix.assignment_share || 0, 1));
      var cap = ix.capacity_veh_hr > 0 ? ix.capacity_veh_hr : params.default_lane_capacity_vph;
      var total = (ix.existing_volume_veh_hr || 0) + added;
      var vc = cap > 0 ? total / cap : 0;
      return {
        intersection_id: ix.intersection_id, name: ix.name,
        added_veh_hr: r1(added), total_volume_veh_hr: r1(total),
        capacity_veh_hr: r1(cap), vc_ratio: r3(vc), los: losForVc(vc),
        over_capacity: vc > LOS_D_VC, lon: ix.lon, lat: ix.lat
      };
    });
  }

  // ── Parcare ──────────────────────────────────────────────────────────────
  function parkingDemand(components, params, ptScore) {
    var byUse = {}, total = 0;
    components.forEach(function (c) {
      var pr = PARKING_RATES[c.land_use]; if (!pr) return;
      var qty = (pr[1] === 'unit') ? (c.units || 0) : (c.gross_floor_area_sqm || 0);
      var need = pr[0] * qty;
      byUse[c.label || c.land_use] = r1(need);
      total += need;
    });
    var reduction = params.parking_pt_reduction_max * Math.max(0, ((ptScore == null ? 0.5 : ptScore) - 0.4) / 0.6);
    reduction = Math.max(0, Math.min(reduction, params.parking_pt_reduction_max));
    return {
      required_normative: Math.round(total),
      pt_reduction_pct: r1(reduction * 100),
      required_after_reduction: Math.round(total * (1 - reduction)),
      by_use: byUse
    };
  }

  // ── Emisii ─────────────────────────────────────────────────────────────
  function emissions(dailyTrips, shares) {
    var byMode = {}, totalG = 0;
    ['auto', 'pt', 'bicycle', 'pedestrian'].forEach(function (m) {
      var g = dailyTrips * (shares[m] || 0) * AVG_TRIP_KM[m] * EMISSION_G_KM[m];
      byMode[m] = r1(g / 1000);
      totalG += g;
    });
    byMode.total_kg_day = r1(totalG / 1000);
    byMode.total_tonnes_year = r1(totalG / 1e6 * 365);
    return byMode;
  }

  // ── Conformitate ─────────────────────────────────────────────────────────
  function complianceChecks(ix, parking) {
    var congested = ix.filter(function (i) { return i.over_capacity; });
    return [
      {
        ref: 'STAS 10144 / NP 068',
        item: 'Nivel de serviciu intersecții (v/c ≤ 0.85, LOS D)',
        status: congested.length ? 'FAIL' : 'PASS',
        detail: congested.length
          ? (congested.length + ' intersecții peste LOS D: ' + congested.map(function (i) { return i.name; }).join(', '))
          : 'Toate intersecțiile rămân la/peste LOS D.'
      },
      {
        ref: 'GD 525/1996',
        item: 'Asigurare locuri de parcare în incintă',
        status: 'INFO',
        detail: 'Necesar normativ: ' + parking.required_normative + ' locuri (după reducere TP: ' + parking.required_after_reduction + ').'
      }
    ];
  }

  // ── Orchestrare ───────────────────────────────────────────────────────────
  function compute(scenario, params) {
    params = Object.assign(defaultParams(), params || {});
    var components = scenario.land_uses || [];
    var zones = scenario.zones || [];
    var intersections = scenario.intersections || [];
    var ptScore = scenario.pt_accessibility_score == null ? 0.5 : scenario.pt_accessibility_score;

    var gen = tripGeneration(components, params);
    var peak = gen.pm_total;                       // ora de proiectare = vârf PM
    var ms = modalSplit(peak, params, ptScore);
    var autoPeak = ms.counts.auto;

    var distribution = gravityDistribution(autoPeak, zones, params);
    var ix = intersectionLoading(autoPeak, intersections, params);
    var parking = parkingDemand(components, params, ptScore);
    var dailyMs = modalSplit(gen.daily, params, ptScore);
    var emis = emissions(gen.daily, dailyMs.shares);
    var compliance = complianceChecks(ix, parking);

    return {
      trips: { am: gen.am_total, pm: gen.pm_total, daily: gen.daily },
      trips_detail: gen,
      modal_split: ms.shares,
      trips_by_mode_pm: ms.counts,
      distribution: distribution,
      intersections: ix,
      parking_demand: parking,
      emissions: emis,
      compliance: compliance,
      params: params
    };
  }

  function r1(x) { return Math.round(x * 10) / 10; }
  function r3(x) { return Math.round(x * 1000) / 1000; }
  function r4(x) { return Math.round(x * 10000) / 10000; }

  // ── comparare scenarii (delta schema PMUD) ──
  function _crit(res) { return (res.intersections || []).filter(function (i) { return i.over_capacity; }).length; }
  function _sustain(res) { var s = res.modal_split || {}; return (s.pt || 0) + (s.bicycle || 0) + (s.pedestrian || 0); }
  function compareScenarios(a, b) {
    if (!a || !b) return null;
    var tA = a.trips.daily || 1, tB = b.trips.daily || 0;
    var co2A = (a.emissions.total_kg_day || 0) / 1000, co2B = (b.emissions.total_kg_day || 0) / 1000;
    return {
      trips_pct: r1((tB - tA) / tA * 100),
      modal_auto_pct_change: r1(((b.modal_split.auto || 0) - (a.modal_split.auto || 0)) * 100),
      pkm_sustainable_pct_change: r1((_sustain(b) - _sustain(a)) * 100),
      new_critical_intersections: _crit(b) - _crit(a),
      co2_delta_tonnes_day: r1(co2B - co2A),
      a: { trips: a.trips.daily, auto_pct: r1((a.modal_split.auto || 0) * 100), critical: _crit(a), co2_t_day: r1(co2A) },
      b: { trips: b.trips.daily, auto_pct: r1((b.modal_split.auto || 0) * 100), critical: _crit(b), co2_t_day: r1(co2B) }
    };
  }

  // ── LOS pe rețeaua REALĂ (OSM) — v/c per segment cu sarcina dezvoltării ──
  function networkLOS(net, autoPeak) {
    var ways = (net && net.ways) || [];
    var arter = ways.filter(function (w) { return w.klass === 'arterial'; });
    var totalCap = arter.reduce(function (s, w) { return s + (w.cap || 500); }, 0) || 1;
    var baseUtil = { arterial: 0.55, local: 0.35, other: 0.45 };
    return ways.map(function (w) {
      var cap = w.cap || 500;
      var base = cap * (baseUtil[w.klass] || 0.45);
      // traficul auto al dezvoltării se distribuie pe artere proporțional cu capacitatea
      var added = (w.klass === 'arterial') ? (autoPeak * (cap / totalCap)) : 0;
      var vc = Math.min(1.4, (base + added) / cap);
      return { coords: w.coords, hw: w.hw, name: w.name, klass: w.klass, vc: Math.round(vc * 100) / 100, los: losForVc(vc), added: Math.round(added), critical: vc > LOS_THRESHOLDS.D };
    });
  }
  function vcColor(vc) { return vc <= 0.55 ? '#22c55e' : vc <= 0.75 ? '#a3e635' : vc <= 0.85 ? '#f59e0b' : vc <= 0.95 ? '#f97316' : '#ef4444'; }

  var LOS_IDS = { line: 'flux-los-line', crit: 'flux-los-crit' };
  function clearNetworkLOS(map) { map = map || G.map; if (!map) return; [LOS_IDS.line, LOS_IDS.crit].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} try { if (map.getSource(id)) map.removeSource(id); } catch (e) {} }); var b = document.getElementById('flux-los-bar'); if (b) b.remove(); }
  function drawNetworkLOS(centroid, result) {
    var map = G.map; if (!map || !centroid) { G.ss && G.ss('Harta/parcela indisponibilă'); return; }
    if (!G.OSMStreets) { G.ss && G.ss('Modulul OSM se inițializează'); return; }
    var autoPeak = Math.round(((result && result.trips && result.trips.am) || 0) * ((result && result.modal_split && result.modal_split.auto) || 0.5));
    G.ss && G.ss('🚦 Aduc rețeaua reală + calculez LOS (' + autoPeak + ' veh/h auto vârf)…');
    clearNetworkLOS(map);
    G.OSMStreets.fetch(centroid, 650).then(function (net) {
      var links = networkLOS(net, autoPeak);
      var feats = links.map(function (l) { return { type: 'Feature', geometry: { type: 'LineString', coordinates: l.coords }, properties: { vc: l.vc, color: vcColor(l.vc), los: l.los, hw: l.hw } }; });
      var crit = links.filter(function (l) { return l.critical; });
      map.addSource(LOS_IDS.line, { type: 'geojson', data: { type: 'FeatureCollection', features: feats } });
      map.addLayer({ id: LOS_IDS.line, type: 'line', source: LOS_IDS.line, paint: { 'line-color': ['get', 'color'], 'line-width': ['interpolate', ['linear'], ['zoom'], 12, 2.5, 16, 7], 'line-opacity': 0.9 } });
      try { map.flyTo({ center: centroid, zoom: Math.max(map.getZoom(), 14.5) }); } catch (e) {}
      // bară legendă + nr intersecții/segmente critice
      var b = document.getElementById('flux-los-bar'); if (b) b.remove();
      b = document.createElement('div'); b.id = 'flux-los-bar';
      b.style.cssText = 'position:fixed;bottom:130px;right:10px;z-index:3200;background:rgba(8,15,35,.95);color:#e6edf7;border:1px solid rgba(52,211,153,.5);border-radius:11px;padding:10px 12px;font-size:11px;font-family:system-ui;max-width:230px;line-height:1.5';
      b.innerHTML = '<div style="font-weight:800;color:#34d399;margin-bottom:4px">🚦 LOS rețea reală (OSM)</div>' +
        '<div style="color:#94a3b8">+' + autoPeak + ' veh/h auto din dezvoltare, distribuiți pe artere</div>' +
        '<div style="margin-top:5px"><span style="color:#22c55e">▬</span> liber <span style="color:#f59e0b">▬</span> aglomerat <span style="color:#ef4444">▬</span> saturat (v/c>0.95)</div>' +
        '<div style="margin-top:4px"><b style="color:' + (crit.length ? '#f87171' : '#34d399') + '">' + crit.length + '</b> segmente critice (LOS E/F)</div>' +
        '<div style="font-size:9px;color:#64748b;margin-top:5px">Estimativ — distribuire simplificată pe capacitate (fără atribuire completă de rețea = Faza 2).</div>' +
        '<button id="flux-los-hide" style="margin-top:7px;background:rgba(255,255,255,.08);color:#cbd5e1;border:1px solid rgba(255,255,255,.15);border-radius:7px;padding:5px 9px;cursor:pointer;font-size:11px">✕ Ascunde</button>';
      document.body.appendChild(b);
      document.getElementById('flux-los-hide').onclick = function () { clearNetworkLOS(map); };
      G.ss && G.ss('🚦 LOS pe ' + links.length + ' segmente reale · ' + crit.length + ' critice (LOS E/F)');
    }).catch(function (e) { console.warn('[Flux LOS]', e); G.ss && G.ss('OSM indisponibil pentru LOS'); });
  }

  G.Flux = G.Flux || {};
  G.Flux.compute = compute;
  G.Flux.compareScenarios = compareScenarios;
  G.Flux.networkLOS = networkLOS;
  G.Flux.drawNetworkLOS = drawNetworkLOS;
  G.Flux.clearNetworkLOS = clearNetworkLOS;
  G.Flux._scenarios = G.Flux._scenarios || [];
  G.Flux.TRIP_RATES = TRIP_RATES;
  G.Flux.MODAL_BY_SIZE = MODAL_BY_SIZE;
  G.Flux.defaultParams = defaultParams;
  G.Flux.LAND_USE_LABELS = {
    residential: 'Locuințe (unități)', office: 'Birouri (mp ADC)', retail: 'Comerț (mp ADC)',
    supermarket: 'Supermarket (mp ADC)', school: 'Învățământ (mp ADC)', hospital: 'Sănătate (mp ADC)',
    industrial: 'Producție/logistică (mp ADC)', mixed_use: 'Mixt (mp ADC)'
  };
  console.log('[Flux] motor Faza 1 încărcat (window.Flux.compute)');
})(window);
