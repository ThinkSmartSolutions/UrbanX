/* ============================================================================
 * UrbanX Intelligence — Motor de capacitate cumulativă (port JS client-side)
 * „Un singur adevăr per UAT": bilanțul infrastructurii față de TOT ce e aprobat
 * (nu față de populația curentă). Rezolvă problema Florești: 38 PUZ-uri „ok"
 * izolat = 47.000 locuitori pe infrastructură de 12.000.
 *
 * window.UXI.capacity(uat, puzList) — bilanț per indicator + status
 * window.UXI.cumulativeImpact(uat, puzList, newPuz) — impact marginal + recomandare
 * window.UXI.fiscal(newPuz, opts) — ROI fiscal pt UAT
 *
 * Determinist (formule normative). Surse: NTPA 013/2002, MEN, Legea 24/2007,
 * Legea 169/2026 (CATUC), INS 2021. Rol de PRE-ANALIZĂ — vezi disclaimerul din raport.
 * ========================================================================== */
(function (G) {
  'use strict';

  // ── Constante normative ──────────────────────────────────────────────────
  var HOUSEHOLD = 2.4;            // locuitori/locuință (INS 2021)
  var WATER_LPD = 0.15;           // m³/persoană/zi (NTPA 013/2002, 150 l)
  var SEWER_FACTOR = 0.85;        // canal = 85% din apă
  var SCHOOL_PER_DWELL = 1 / 4;   // 1 loc școală / 4 locuințe (MEN)
  var KINDER_PER_DWELL = 1 / 8;   // 1 loc grădiniță / 8 locuințe
  var GREEN_PER_CAP = 8;          // mp spațiu verde / locuitor (Legea 24/2007)
  var TRIPS_PER_DWELL = 7.2;      // deplasări/zi/locuință (ITE adaptat RO)
  var IMPERM_FACTOR = 0.7;        // factor impermeabilizare amprentă
  var IMPERM_THRESHOLD = 65;      // % din suprafața UAT (standard UE)

  var TH = { warning: 70, critical: 90, blocked: 100 };

  function statusOf(pct) {
    if (pct > TH.blocked) return 'blocat';
    if (pct > TH.critical) return 'critic';
    if (pct >= TH.warning) return 'avertizare';
    return 'ok';
  }
  function worst(a, b) {
    var order = { ok: 0, avertizare: 1, critic: 2, blocat: 3 };
    return order[a] >= order[b] ? a : b;
  }

  // sumă pe PUZ-uri filtrate după status
  function sumPuz(puzList, field, statuses) {
    return (puzList || []).reduce(function (s, p) {
      if (statuses && statuses.indexOf(p.status) < 0) return s;
      return s + (+p[field] || 0);
    }, 0);
  }

  // ── ESTIMATOR CAPACITĂȚI INFRA (bootstrap onest) ──────────────────────────
  // UrbanX nu are capacitățile reale de infrastructură per UAT (apă/școli/verde).
  // Le ESTIMĂM din populația curentă + norme, presupunând că infrastructura actuală
  // deservește populația curentă cu o marjă de proiectare. TOATE marcate quality:'estimat'
  // — trebuie înlocuite cu date verificate de la operatori (RAJA, Electrica, ISJ...).
  function estimateInfra(uat) {
    var pop = +uat.population_current || +uat.pop2021 || +uat.pop || 0;
    var margin = uat.design_margin || 1.2;   // marjă de proiectare presupusă
    var dwell = pop / HOUSEHOLD;
    return {
      population_current: Math.round(pop),
      infra_water_m3day: Math.round(pop * WATER_LPD * margin),
      infra_sewer_m3day: Math.round(pop * WATER_LPD * SEWER_FACTOR * margin),
      infra_schools_seats: Math.round(dwell * SCHOOL_PER_DWELL * 1.1),
      infra_kinder_seats: Math.round(dwell * KINDER_PER_DWELL * 1.1),
      infra_green_m2: Math.round(pop * GREEN_PER_CAP * 1.0),
      area_ha: +uat.area_ha || +uat.suprafata_ha || 0,
      quality: 'estimat',
      note: 'Capacități estimate din populația curentă + norme (marjă ' + margin + '). Înlocuiți cu date verificate de la operatori.'
    };
  }

  // ── CAPACITY ENGINE ──────────────────────────────────────────────────────
  // uat: { area_ha, infra_water_m3day, infra_schools_seats, infra_kinder_seats,
  //        infra_green_m2, population_current }
  // puzList: [{ dwelling_units, built_footprint_m2, status }]
  function capacity(uat, puzList, opts) {
    opts = opts || {};
    var statuses = opts.include || ['aprobat'];          // implicit doar aprobate
    var dwell = sumPuz(puzList, 'dwelling_units', statuses);
    var footprint = sumPuz(puzList, 'built_footprint_m2', statuses);
    var pop = dwell * HOUSEHOLD;

    var ind = {};
    function add(key, label, needed, capacity_, unit, invert) {
      var pct = capacity_ > 0 ? (needed / capacity_) * 100 : (needed > 0 ? 999 : 0);
      ind[key] = {
        label: label, needed: Math.round(needed), capacity: Math.round(capacity_),
        utilization_pct: Math.round(pct * 10) / 10, unit: unit,
        status: statusOf(pct), deficit: invert ? Math.round(needed - capacity_) : null
      };
    }
    add('water', 'Apă potabilă', pop * WATER_LPD, uat.infra_water_m3day, 'm³/zi');
    add('sewer', 'Canalizare', pop * WATER_LPD * SEWER_FACTOR, uat.infra_sewer_m3day || uat.infra_water_m3day, 'm³/zi');
    add('schools', 'Locuri școală', dwell * SCHOOL_PER_DWELL, uat.infra_schools_seats, 'locuri');
    add('kindergarten', 'Locuri grădiniță', dwell * KINDER_PER_DWELL, uat.infra_kinder_seats, 'locuri');
    add('green', 'Spații verzi', pop * GREEN_PER_CAP, uat.infra_green_m2, 'mp', true);

    var area_m2 = (uat.area_ha || 0) * 10000;
    var imperm = area_m2 > 0 ? (footprint / area_m2 * 100) * IMPERM_FACTOR : 0;
    ind.impermeability = {
      label: 'Impermeabilizare', needed: Math.round(imperm * 10) / 10, capacity: IMPERM_THRESHOLD,
      utilization_pct: Math.round(imperm / IMPERM_THRESHOLD * 1000) / 10, unit: '%', status: statusOf(imperm / IMPERM_THRESHOLD * 100)
    };

    var overall = Object.keys(ind).reduce(function (s, k) { return worst(s, ind[k].status); }, 'ok');
    return {
      population_approved: Math.round(pop), dwelling_units: dwell,
      indicators: ind, overall_status: overall,
      trips_daily: Math.round(dwell * TRIPS_PER_DWELL)
    };
  }

  // ── CUMULATIVE IMPACT ENGINE ───────────────────────────────────────────────
  // Impactul marginal al unui PUZ nou + recomandare (conformitate/in_analiza/blocat)
  function cumulativeImpact(uat, puzList, newPuz, opts) {
    var before = capacity(uat, puzList, opts);
    var after = capacity(uat, (puzList || []).concat([Object.assign({ status: 'aprobat' }, newPuz)]), opts);

    var pug = newPuz.pug || {};   // {pot_max, cut_max, pot_proposed, cut_proposed}
    var pugFail = [];
    if (pug.pot_max != null && pug.pot_proposed > pug.pot_max) pugFail.push('POT ' + pug.pot_proposed + '% > ' + pug.pot_max + '%');
    if (pug.cut_max != null && pug.cut_proposed > pug.cut_max) pugFail.push('CUT ' + pug.cut_proposed + ' > ' + pug.cut_max);

    var flood = +newPuz.flood_q1_overlap_pct || 0;
    var exceeded = Object.keys(after.indicators).filter(function (k) { return after.indicators[k].utilization_pct > 100; });

    var recommendation;
    if (exceeded.length || flood > 30 || pugFail.length) recommendation = 'blocat';
    else if (Object.keys(after.indicators).some(function (k) { var p = after.indicators[k].utilization_pct; return p >= 90 && p <= 100; }) || flood > 20) recommendation = 'in_analiza';
    else recommendation = 'conformitate_preliminara';

    // delta per indicator
    var delta = {};
    Object.keys(after.indicators).forEach(function (k) {
      delta[k] = {
        label: after.indicators[k].label,
        before_pct: before.indicators[k].utilization_pct,
        after_pct: after.indicators[k].utilization_pct,
        crosses_critical: before.indicators[k].utilization_pct <= 90 && after.indicators[k].utilization_pct > 90
      };
    });

    return {
      recommendation: recommendation, before: before, after: after, delta: delta,
      pug_fail: pugFail, flood_q1_overlap_pct: flood, exceeded_indicators: exceeded,
      marginal: {
        population: Math.round((+newPuz.dwelling_units || 0) * HOUSEHOLD),
        water_m3day: Math.round((+newPuz.dwelling_units || 0) * HOUSEHOLD * WATER_LPD),
        school_seats: Math.ceil((+newPuz.dwelling_units || 0) * SCHOOL_PER_DWELL),
        green_m2: Math.round((+newPuz.dwelling_units || 0) * HOUSEHOLD * GREEN_PER_CAP),
        trips_daily: Math.round((+newPuz.dwelling_units || 0) * TRIPS_PER_DWELL)
      }
    };
  }

  // ── FISCAL SIMULATOR ───────────────────────────────────────────────────────
  function fiscal(newPuz, opts) {
    opts = opts || {};
    var dwell = +newPuz.dwelling_units || 0;
    var pop = dwell * HOUSEHOLD;
    var costM2 = opts.construction_cost_eur_m2 || 1100;
    var landVal = opts.land_value_eur_m2 || 45;

    var buildingValue = dwell * 65 * costM2;
    var annualBuildingTax = buildingValue * 0.001 * 0.80;
    var landTax = dwell * 120 * landVal * 0.002 * 0.80;
    var otherTaxes = (annualBuildingTax + landTax) * 0.3;
    var revenue = annualBuildingTax + landTax + otherTaxes;

    var perCap = { salubritate: 120, apa_canal: 80, transport: opts.has_transit ? 150 : 0, drumuri: 40, iluminat: 30, administratie: 100 };
    var costPerCap = Object.keys(perCap).reduce(function (s, k) { return s + perCap[k]; }, 0);
    var annualCost = pop * costPerCap;

    var investment = pop * 2500 + Math.ceil(dwell * SCHOOL_PER_DWELL) * 25000 + (pop * GREEN_PER_CAP) * 150;
    var net = revenue - annualCost;
    var breakeven = net > 0 ? investment / net : null;
    var rec = (net <= 0 || (breakeven && breakeven > 30)) ? 'nefavorabil' : (breakeven < 15 ? 'favorabil' : 'neutru');

    return {
      annual_revenue_eur: Math.round(revenue), annual_cost_eur: Math.round(annualCost),
      annual_net_eur: Math.round(net), investment_eur: Math.round(investment),
      breakeven_years: breakeven ? Math.round(breakeven * 10) / 10 : null,
      recommendation: rec, population_est: Math.round(pop)
    };
  }

  // ── DEMO Florești (cazul-erou din spec) ──────────────────────────────────
  function demoFloresti() {
    var uat = {
      name: 'Florești (CJ)', area_ha: 3500, population_current: 12400,
      infra_water_m3day: 6000, infra_sewer_m3day: 5200,
      infra_schools_seats: 2800, infra_kinder_seats: 1100, infra_green_m2: 280000
    };
    // 38 PUZ-uri aprobate ~ 19.700 locuințe cumulat
    var puz = [];
    for (var i = 0; i < 38; i++) puz.push({ dwelling_units: 518, built_footprint_m2: 9000, status: 'aprobat' });
    var cap = capacity(uat, puz);
    var impact = cumulativeImpact(uat, puz, { dwelling_units: 600, built_footprint_m2: 11000, pug: { pot_max: 40, pot_proposed: 45, cut_max: 1.2, cut_proposed: 1.4 } });
    var fisc = fiscal({ dwelling_units: 600 }, { has_transit: false });
    return { uat: uat, capacity: cap, impact: impact, fiscal: fisc };
  }

  // ── REGISTRU PUZ (persistent local) + ALERTE ─────────────────────────────
  // Trackingul cumulativ real: arhitectul înregistrează fiecare PUZ; sistemul
  // urmărește agregatul per UAT. Persistat în localStorage (fără backend).
  var RKEY = 'uxi_puz_registry_v1';
  function regAll() { try { return JSON.parse(localStorage.getItem(RKEY) || '{}'); } catch (e) { return {}; } }
  function regSave(a) { try { localStorage.setItem(RKEY, JSON.stringify(a)); } catch (e) {} }
  var registry = {
    list: function (uat) { return regAll()[uat] || []; },
    add: function (uat, puz) {
      var a = regAll(); a[uat] = a[uat] || [];
      puz.id = 'p' + Date.now() + '_' + Math.round(Math.random() * 1e4);
      a[uat].push(puz); regSave(a); return puz;
    },
    remove: function (uat, id) { var a = regAll(); a[uat] = (a[uat] || []).filter(function (p) { return p.id !== id; }); regSave(a); },
    clear: function (uat) { var a = regAll(); delete a[uat]; regSave(a); }
  };
  // Alerte din bilanțul de capacitate (indicatori la/peste prag)
  function alerts(cap) {
    var out = [];
    if (!cap || !cap.indicators) return out;
    Object.keys(cap.indicators).forEach(function (k) {
      var ind = cap.indicators[k];
      if (ind.status === 'ok') return;
      var sev = ind.status, msg;
      if (ind.utilization_pct > 100) msg = ind.label + ' DEPĂȘIT — utilizare ' + ind.utilization_pct + '% (infrastructură fizic insuficientă)';
      else if (ind.status === 'critic') msg = ind.label + ' la limită — ' + ind.utilization_pct + '% (peste pragul critic 90%)';
      else msg = ind.label + ' în avertizare — ' + ind.utilization_pct + '%';
      out.push({ indicator: k, label: ind.label, severity: sev, utilization_pct: ind.utilization_pct, message: msg });
    });
    var sevOrder = { blocat: 3, critic: 2, avertizare: 1 };
    out.sort(function (a, b) { return (sevOrder[b.severity] || 0) - (sevOrder[a.severity] || 0); });
    return out;
  }

  G.UXI = {
    capacity: capacity, cumulativeImpact: cumulativeImpact, fiscal: fiscal,
    estimateInfra: estimateInfra, demoFloresti: demoFloresti, statusOf: statusOf,
    registry: registry, alerts: alerts,
    CONST: { HOUSEHOLD: HOUSEHOLD, WATER_LPD: WATER_LPD, SCHOOL_PER_DWELL: SCHOOL_PER_DWELL, GREEN_PER_CAP: GREEN_PER_CAP }
  };
  console.log('[UXI] motor Intelligence încărcat (window.UXI)');
})(window);
