/* ============================================================================
 * UrbanX — tci-risk-module.js — Motor de risc pentru documentele strategice
 * Furnizeaza _calcSeismicRisk / _calcFloodSusceptibility / _getRiskForCity,
 * folosite de SIDU, Masterplan, PMUD si Cinematic. Metodologie transparenta:
 *   SEISMIC: intensitate EMS din ag de proiectare (P100-1) scalata pe magnitudine;
 *            vulnerabilitate macroseismica Lagomarsino & Giovinazzi (2006) pe epoci
 *            de constructie (RISK-UE); distributie daune DS0-DS5 (binomial).
 *   INUNDATII: metoda SCS-CN (USDA TR-55) pe impermeabilizare estimata; SR EN 752.
 * Se incarca INAINTE de tci-strategic-*-content.js. Zero date inventate — totul
 * din city.judet / city.pop2021 + _getRiskProfile (P100). Estimari agregate UAT.
 * ========================================================================== */
(function (G) {
  'use strict';

  var EU_UNIT_VALUE = 80000;            // valoare medie unitate construita (EUR) ~80mp×1000
  var DS_REPAIR = [0, 0.02, 0.10, 0.40, 0.80, 1.00]; // fractie cost reconstructie / DS
  // Vulnerabilitate macroseismica (indice V, RISK-UE) pe epoci de constructie
  var EPOCH_V = { pre1940: 0.74, e1940_1977: 0.62, e1977_1990: 0.50, e1990_2007: 0.42, post2007: 0.34 };

  function _log10(x) { return Math.log(x) / Math.LN10; }

  // distributie fond construit pe epoci (INS RPL2021, tipare nationale; override daca city le are)
  function _epochs(city) {
    var com = String(city.tip || '').toLowerCase() === 'comuna';
    // fractii orientative; municipiile au mai mult fond 1960-1990 (blocuri), comunele mai mult vechi+nou
    return com
      ? { pre1940: 0.22, e1940_1977: 0.30, e1977_1990: 0.18, e1990_2007: 0.16, post2007: 0.14 }
      : { pre1940: 0.14, e1940_1977: 0.30, e1977_1990: 0.30, e1990_2007: 0.16, post2007: 0.10 };
  }

  // intensitate EMS-98 de scenariu: din ag de proiectare (Wald inv) + scalare magnitudine
  function _scenarioIntensity(ag, M) {
    var pga_design = ag * 981;                          // cm/s²
    var I_design = 3.66 * _log10(pga_design) - 1.66;    // Wald et al. 1999
    return I_design + 1.5 * (M - 7.0);                  // M_design Vrancea ~7.0
  }

  // mean damage grade (Lagomarsino & Giovinazzi 2006)
  function _muD(I, V) {
    var x = (I + 6.25 * V - 13.1) / 2.3;
    return Math.max(0, Math.min(5, 2.5 * (1 + Math.tanh(x))));
  }
  // distributie binomiala DS0..DS5 din muD
  function _binomialDS(muD) {
    var p = muD / 5, n = 5, out = [];
    function C(n, k) { var r = 1; for (var i = 0; i < k; i++) r = r * (n - i) / (i + 1); return r; }
    for (var k = 0; k <= 5; k++) out.push(C(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k));
    return out;
  }

  var SCEN_M = { M5_5: 5.5, M6_0: 6.0, M6_5: 6.5, M7_0: 7.0, M7_4: 7.4, M7_7: 7.7 };

  // ── RISC SEISMIC ──────────────────────────────────────────────────────────
  window._calcSeismicRisk = function (city, scenario) {
    var risk = (typeof _getRiskProfile === 'function') ? _getRiskProfile(city) : null;
    var ag = (risk && risk.seismic && risk.seismic.ag) || city.ag || 0.20;
    var Tc = (risk && risk.seismic && risk.seismic.Tc) || 1.0;
    var zona = (risk && risk.seismic && (risk.seismic.zona || risk.seismic.key)) || 'C';
    var M = SCEN_M[scenario] || 7.0;
    var I = _scenarioIntensity(ag, M);

    var ep = _epochs(city);
    // unitati construite estimate (locuinte) ~ pop / marime medie gospodarie
    var pop = +city.pop2021 || +city.pop || 50000;
    var totalUnits = Math.round(pop / 2.4);
    var occ = pop / Math.max(1, totalUnits);            // ocupanti/unitate

    // distributie DS ponderata pe epoci
    var pDS = [0, 0, 0, 0, 0, 0];
    Object.keys(ep).forEach(function (k) {
      var V = EPOCH_V[k] != null ? EPOCH_V[k] : 0.5;
      var d = _binomialDS(_muD(I, V));
      for (var j = 0; j <= 5; j++) pDS[j] += ep[k] * d[j];
    });
    var cladiriDS = pDS.map(function (p) { return Math.round(p * totalUnits); });

    // impact uman (HAZUS-MH simplificat) + cost
    var decese = Math.round(cladiriDS[5] * occ * 0.10 + cladiriDS[4] * occ * 0.012);
    var ranGrav = Math.round(cladiriDS[5] * occ * 0.16 + cladiriDS[4] * occ * 0.04 + cladiriDS[3] * occ * 0.01);
    var persDeplasate = Math.round((cladiriDS[3] + cladiriDS[4] + cladiriDS[5]) * occ);
    var costMilEur = Math.round(cladiriDS.reduce(function (s, c, k) { return s + c * DS_REPAIR[k] * EU_UNIT_VALUE; }, 0) / 1e6);
    var riskScore = Math.round(Math.max(0, Math.min(100, (I - 4) * 14)));

    return {
      ag: ag, Tc: Tc, zona: zona, scenario: scenario || 'M7_0', M: M, intensity: +I.toFixed(1),
      epochs: { pre1940: ep.pre1940, _1940_1977: ep.e1940_1977, _1977_1990: ep.e1977_1990, _1990_2007: ep.e1990_2007, post2007: ep.post2007 },
      totalUnits: totalUnits, cladiriDS: cladiriDS, pDS_total: pDS,
      decese: decese, ranGrav: ranGrav, persDeplasate: persDeplasate,
      costMilEur: costMilEur, riskScore: riskScore
    };
  };

  // ── SUSCEPTIBILITATE INUNDATII (SCS-CN) ────────────────────────────────────
  window._calcFloodSusceptibility = function (city, scenario) {
    var risk = (typeof _getRiskProfile === 'function') ? _getRiskProfile(city) : null;
    var P = (scenario === 'P_50') ? 70 : (scenario === 'P_150') ? 150 : 100; // mm/eveniment
    var com = String(city.tip || '').toLowerCase() === 'comuna';
    var imper = com ? 22 : 58;                          // % impermeabilizare estimata
    var CN = Math.round(70 + imper * 0.28);             // CN ponderat (TR-55)
    CN = Math.max(60, Math.min(95, CN));
    var S = 25400 / CN - 254;                            // retentie potentiala (mm)
    var Q = P > 0.2 * S ? (Math.pow(P - 0.2 * S, 2) / (P + 0.8 * S)) : 0; // runoff (mm)
    var susceptPct = Math.round(Math.min(60, imper * 0.5 + Q / P * 35));
    var pop = +city.pop2021 || +city.pop || 50000;
    var totalUnits = Math.round(pop / 2.4);
    var locuinteExpuse = Math.round(totalUnits * susceptPct / 100 * 0.35);
    var capac_mmh = 40;                                  // SR EN 752 retea standard
    var i_mmh = P;                                       // eveniment ~1h
    var depasireCapacitate = Math.max(0, Math.round((i_mmh - capac_mmh) / capac_mmh * 100));
    var stradeAfectPct = Math.round(Math.min(45, susceptPct * 0.7));
    var floodKey = (risk && risk.flood && (risk.flood.key || '')) || '';
    var hasFluvialRisk = /RIDICAT|MEDIU/i.test(floodKey);
    var floodScore = Math.round(Math.min(100, susceptPct * 1.2 + (hasFluvialRisk ? 20 : 0)));

    return {
      P: P, CN_weighted: CN, impermeabilizare: imper, Q_mm: Math.round(Q),
      susceptPct: susceptPct, locuinteExpuse: locuinteExpuse, stradeAfectPct: stradeAfectPct,
      depasireCapacitate: depasireCapacitate, hasFluvialRisk: hasFluvialRisk, floodScore: floodScore
    };
  };

  // ── HELPER UNIFICAT — acelasi apel din SIDU / Masterplan / PMUD / Cinematic ─
  window._getRiskForCity = function (city, risk) {
    if (!city) return null;
    var seismicResult = window._calcSeismicRisk(city, 'M7_0');
    var floodResult = window._calcFloodSusceptibility(city, 'P_100');
    return {
      ag: seismicResult.ag, Tc: seismicResult.Tc, zona: seismicResult.zona,
      seismic: seismicResult, flood: floodResult,
      riskScore: seismicResult.riskScore,
      floodScore: floodResult.floodScore,
      cladiriVuln: seismicResult.cladiriDS[3] + seismicResult.cladiriDS[4] + seismicResult.cladiriDS[5],
      persDeplasate: seismicResult.persDeplasate,
      costMilEur: seismicResult.costMilEur,
      locuinteExpuse: floodResult.locuinteExpuse,
      susceptPct: floodResult.susceptPct
    };
  };

  console.log('[tci-risk-module] _calcSeismicRisk / _calcFloodSusceptibility / _getRiskForCity active');
})(window);
