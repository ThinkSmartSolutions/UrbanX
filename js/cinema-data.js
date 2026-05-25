// cinema-data.js — UrbanX Date Reale Statice
// Zonare seismica P100-1/2013, HG 525/1996, Ordin 839/2009
// Se actualizeaza manual cand se modifica legislatia
// (c) ThinkSmart Solutions SRL 2026

(function(){
'use strict';

// ── ZONARE SEISMICA P100-1/2013 ───────────────────────────────────────────
// ag = acceleratia terenului pentru proiectare (g)
// Tc = perioada de colt (s)
// Sursa: Harta de zonare seismica P100-1/2013, Fig. 3.1 si 3.2
window._SEISMIC_ZONES = {
  // Zone cu ag = 0.35g (Vrancea — zona critica)
  'VN': {ag:0.40, Tc:1.6, zona:'E', risc:'EXTREM'},
  'BZ': {ag:0.40, Tc:1.6, zona:'E', risc:'EXTREM'},
  'PH': {ag:0.35, Tc:1.6, zona:'E', risc:'FOARTE RIDICAT'},

  // Zone cu ag = 0.30g
  'GR': {ag:0.30, Tc:1.6, zona:'D', risc:'RIDICAT'},
  'IL': {ag:0.30, Tc:1.6, zona:'D', risc:'RIDICAT'},
  'CL': {ag:0.30, Tc:1.6, zona:'D', risc:'RIDICAT'},
  'BR': {ag:0.30, Tc:1.6, zona:'D', risc:'RIDICAT'},
  'GL': {ag:0.35, Tc:1.6, zona:'D', risc:'RIDICAT'},
  'TL': {ag:0.30, Tc:0.7, zona:'D', risc:'RIDICAT'},
  'B':  {ag:0.35, Tc:1.6, zona:'D', risc:'RIDICAT'}, // Bucuresti

  // Zone cu ag = 0.25g
  'BC': {ag:0.25, Tc:1.0, zona:'C', risc:'MODERAT-RIDICAT'},
  'NT': {ag:0.25, Tc:1.0, zona:'C', risc:'MODERAT-RIDICAT'},
  'VS': {ag:0.25, Tc:1.0, zona:'C', risc:'MODERAT-RIDICAT'},
  'VL': {ag:0.25, Tc:1.0, zona:'C', risc:'MODERAT-RIDICAT'},
  'AG': {ag:0.25, Tc:1.0, zona:'C', risc:'MODERAT-RIDICAT'},
  'DB': {ag:0.25, Tc:1.0, zona:'C', risc:'MODERAT-RIDICAT'},
  'IF': {ag:0.25, Tc:1.0, zona:'C', risc:'MODERAT-RIDICAT'},
  'CT': {ag:0.25, Tc:0.7, zona:'C', risc:'MODERAT-RIDICAT'},

  // Zone cu ag = 0.20g — IASI ESTE AICI
  'IS': {ag:0.20, Tc:1.0, zona:'B', risc:'MODERAT'},
  'BT': {ag:0.20, Tc:1.0, zona:'B', risc:'MODERAT'},
  'SV': {ag:0.20, Tc:1.0, zona:'B', risc:'MODERAT'},
  'TR': {ag:0.20, Tc:1.0, zona:'B', risc:'MODERAT'},
  'OT': {ag:0.20, Tc:1.0, zona:'B', risc:'MODERAT'},
  'DJ': {ag:0.20, Tc:1.0, zona:'B', risc:'MODERAT'},
  'MH': {ag:0.20, Tc:1.0, zona:'B', risc:'MODERAT'},

  // Zone cu ag = 0.15g
  'HR': {ag:0.15, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'CV': {ag:0.15, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'MS': {ag:0.15, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'AB': {ag:0.15, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'HD': {ag:0.15, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'CS': {ag:0.15, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'GJ': {ag:0.15, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'MM': {ag:0.15, Tc:0.7, zona:'A', risc:'SCAZUT'},

  // Zone cu ag = 0.10g
  'CJ': {ag:0.10, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'BH': {ag:0.10, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'SJ': {ag:0.10, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'BN': {ag:0.10, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'TM': {ag:0.10, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'AR': {ag:0.10, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'SM': {ag:0.10, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'SB': {ag:0.10, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'BV': {ag:0.10, Tc:0.7, zona:'A', risc:'SCAZUT'},
  'PH': {ag:0.35, Tc:1.6, zona:'D', risc:'RIDICAT'}, // zona nord
};

// Getter principal — folosit in cinematicul v9 si in calculatorul PUG/PUZ
window._getSeismic = function(judet_code) {
  var j = (judet_code||'').toUpperCase().replace('RO-','').split('-')[0];
  return window._SEISMIC_ZONES[j] || {ag:0.15, Tc:1.0, zona:'A', risc:'NECUNOSCUT'};
};

// ── HG 525/1996 — REGULAMENT GENERAL DE URBANISM ─────────────────────────
// POT si CUT maxime pe zone functionale
// Sursa: HG 525/1996 republicata, Art. 23-31
window._RGU_ZONES = {
  // Zona L — Locuinte
  'L1': { // Locuinte individuale mici
    POT_max: 0.35, CUT_max: 0.9,
    RH_rec: 'P+2',
    desc: 'Locuinte individuale mici — parcele sub 500mp'
  },
  'L2': { // Locuinte individuale medii
    POT_max: 0.35, CUT_max: 1.2,
    RH_rec: 'P+2',
    desc: 'Locuinte individuale medii'
  },
  'L3': { // Locuinte colective mici
    POT_max: 0.40, CUT_max: 1.6,
    RH_rec: 'P+4',
    desc: 'Locuinte colective mici (max P+4)'
  },
  'L4': { // Locuinte colective mari
    POT_max: 0.40, CUT_max: 2.5,
    RH_rec: 'P+8',
    desc: 'Locuinte colective mari'
  },

  // Zona M — Mixta
  'M1': {
    POT_max: 0.50, CUT_max: 2.0,
    RH_rec: 'P+4',
    desc: 'Zona mixta mica — servicii+locuire'
  },
  'M2': {
    POT_max: 0.60, CUT_max: 3.0,
    RH_rec: 'P+8',
    desc: 'Zona mixta medie'
  },
  'M3': {
    POT_max: 0.70, CUT_max: 4.0,
    RH_rec: 'P+12',
    desc: 'Zona mixta mare — centru urban'
  },

  // Zona C — Comerciala/Servicii
  'C1': {
    POT_max: 0.60, CUT_max: 2.4,
    RH_rec: 'P+4',
    desc: 'Comercial mic'
  },
  'C2': {
    POT_max: 0.70, CUT_max: 3.5,
    RH_rec: 'P+8',
    desc: 'Comercial mare / centru comercial'
  },

  // Zona A — Administrativ/Institutii
  'A1': {
    POT_max: 0.60, CUT_max: 3.0,
    RH_rec: 'P+6',
    desc: 'Institutii publice si servicii'
  },

  // Zona IS — Invatamant/Sanatate
  'IS1': {
    POT_max: 0.40, CUT_max: 1.6,
    RH_rec: 'P+4',
    desc: 'Invatamant si sanatate'
  },

  // Zona V — Spatii verzi
  'V1': {
    POT_max: 0.05, CUT_max: 0.05,
    RH_rec: 'P',
    desc: 'Spatii verzi publice — constructii minime'
  },

  // Zona SP — Sport
  'SP1': {
    POT_max: 0.30, CUT_max: 0.90,
    RH_rec: 'P+2',
    desc: 'Baze sportive'
  },

  // Zona ID — Industrie
  'ID1': {
    POT_max: 0.50, CUT_max: 1.5,
    RH_rec: 'variabil',
    desc: 'Industrie mica si depozitare'
  },
  'ID2': {
    POT_max: 0.60, CUT_max: 2.0,
    RH_rec: 'variabil',
    desc: 'Industrie medie'
  },
};

// ── ORDIN 839/2009 — REGULI DE MODIFICARE PRIN PUZ ───────────────────────
window._PUZ_RULES = {
  // CUT: se poate majora prin PUZ cu max 20% fata de PUG
  CUT_majorare_max_pct: 0.20,

  // POT: se poate propune orice valoare pana la plafonul RGU (HG 525)
  // NU exista limita de +20% pentru POT — se poate merge direct la plafonul HG
  POT_limita: 'RGU_max', // nu +20%, ci plafonul HG 525

  // Inaltimi: max +2 niveluri fata de cladirile invecinate (regula vecinatatii)
  RH_max_supliment_niveluri: 2,

  // Retrageri minime prin PUZ (nu pot fi mai mici decat acestea)
  retrageri_minime: {
    fata_strada: 3.0,    // m
    spate:       5.0,    // m
    lateral:     3.0,    // m
  },

  // Distanta minima intre cladiri = H/2 (jumatate din inaltimea cladirii mai inalte)
  distanta_min_intre_cladiri: 'H/2',
};

// ── CALCULATOR PUG vs PUZ ─────────────────────────────────────────────────
// Calculeaza ce se poate face prin PUZ fata de ce spune PUG-ul
window._calcPUZ = function(params) {
  // params: {
  //   POT_pug, CUT_pug, RH_pug (string ex "P+2"),
  //   zona_functionala (ex "L3"),
  //   judet_code,
  //   suprafata_mp,
  //   tip_teren: 'intravilan' | 'extravilan'
  // }

  var zona = window._RGU_ZONES[params.zona_functionala] || window._RGU_ZONES['L2'];
  var seismic = window._getSeismic(params.judet_code);
  var rules = window._PUZ_RULES;

  var result = {
    // Date intrare
    input: params,

    // CF PUG (actual)
    pug: {
      POT: params.POT_pug || null,
      CUT: params.CUT_pug || null,
      RH:  params.RH_pug  || null,
    },

    // CF PUZ (maxim legal)
    puz: {},

    // CF RGU (plafon absolut HG 525)
    rgu: {
      POT_max: zona.POT_max,
      CUT_max: zona.CUT_max,
      RH_rec:  zona.RH_rec,
      desc:    zona.desc,
    },

    // Seismic
    seismic: seismic,

    // Calculat
    calc: {},
  };

  if(params.tip_teren === 'extravilan') {
    // Extravilan: se aplica direct RGU + Ordin 839
    result.puz.POT = zona.POT_max;
    result.puz.CUT = Math.min(zona.CUT_max, 4.0); // Ordin 839: max CUT=4
    result.puz.RH  = zona.RH_rec;
    result.puz.sursa = 'RGU direct (extravilan)';
  } else {
    // Intravilan: PUG + reguli modificare

    // POT prin PUZ = merge pana la plafonul RGU (fara limita +20%)
    result.puz.POT = zona.POT_max;

    // CUT prin PUZ = max +20% fata de PUG, dar nu depaseste RGU
    if(params.CUT_pug) {
      var CUT_puz_calc = params.CUT_pug * (1 + rules.CUT_majorare_max_pct);
      result.puz.CUT = Math.min(CUT_puz_calc, zona.CUT_max);
      result.puz.CUT_delta_pct = Math.round((result.puz.CUT / params.CUT_pug - 1) * 100);
    } else {
      result.puz.CUT = zona.CUT_max;
    }

    result.puz.sursa = 'Intravilan: POT cf RGU, CUT max +20% (Ordin 839)';
  }

  // Calcul inaltime din CUT si POT
  // Formula: H = (CUT / POT) * 3m (nivel mediu = 3m)
  if(result.puz.CUT && result.puz.POT) {
    var niveluri_calc = result.puz.CUT / result.puz.POT;
    result.calc.niveluri_max = Math.floor(niveluri_calc);
    result.calc.H_max_m = Math.round(niveluri_calc * 3.0 * 10) / 10;
    result.calc.RH_calc = 'P+' + (result.calc.niveluri_max - 1);
  }

  // Suprafata construibila
  if(params.suprafata_mp) {
    result.calc.S_construita_max_mp = Math.round(params.suprafata_mp * result.puz.POT);
    result.calc.S_desfasurata_max_mp = Math.round(params.suprafata_mp * result.puz.CUT);
  }

  // Factor seismic — atentionare daca zona ridicata
  if(seismic.ag >= 0.25) {
    result.calc.atentionare_seismica =
      'ZONA ag=' + seismic.ag + 'g — verificare obligatorie expertiza tehnica inainte de PUZ';
  }

  return result;
};

// ── SALARII MEDII NETE pe judete (INSE 2024) ─────────────────────────────
// Sursa: INSE Buletin Statistic Lunar, date 2024
// NU se calculeaza, sunt valori reale
window._SALARII_JUDETE = {
  'B':  5800, // Bucuresti
  'CJ': 4900, // Cluj
  'TM': 4600, // Timis
  'CT': 4200, // Constanta
  'IS': 4100, // Iasi — NU 615 RON!
  'BV': 4400, // Brasov
  'SB': 4300, // Sibiu
  'AR': 4000, // Arad
  'BH': 3900, // Bihor
  'GL': 3700, // Galati
  'BC': 3600, // Bacau
  'PH': 3800, // Prahova
  'DJ': 3700, // Dolj
  'GR': 3400, // Giurgiu
  'VN': 3300, // Vrancea
  'BT': 3200, // Botosani
  'VS': 3100, // Vaslui
  // Default pentru judete fara date specifice
  '_default': 3500,
};

window._getSalariu = function(judet_code) {
  var j = (judet_code||'').toUpperCase().replace('RO-','').split('-')[0];
  return window._SALARII_JUDETE[j] || window._SALARII_JUDETE['_default'];
};

// ── BENCHMARK NATIONAL — UAT-uri similare ────────────────────────────────
// Categorii: metropolitan (>200k), regional (50-200k), mic (10-50k), rural
window._BENCHMARK_NATIONAL = {
  metropolitan: [
    {n:'Cluj-Napoca', pop:320000, pib_pct_ue:72, tp:68, coef_hub:1.35},
    {n:'Timisoara',   pop:319000, pib_pct_ue:68, tp:65, coef_hub:1.32},
    {n:'Iasi',        pop:361000, pib_pct_ue:45, tp:62, coef_hub:1.28},
    {n:'Constanta',   pop:303000, pib_pct_ue:52, tp:55, coef_hub:1.20},
    {n:'Craiova',     pop:270000, pib_pct_ue:41, tp:58, coef_hub:1.18},
    {n:'Brasov',      pop:253000, pib_pct_ue:62, tp:61, coef_hub:1.22},
    {n:'Galati',      pop:249000, pib_pct_ue:38, tp:52, coef_hub:1.10},
  ],
  regional: [
    {n:'Oradea',      pop:196000, pib_pct_ue:55, tp:64, coef_hub:1.05},
    {n:'Bacau',       pop:144000, pib_pct_ue:36, tp:55, coef_hub:0.92},
    {n:'Arad',        pop:159000, pib_pct_ue:58, tp:58, coef_hub:0.98},
    {n:'Pitesti',     pop:155000, pib_pct_ue:48, tp:52, coef_hub:0.95},
    {n:'Sibiu',       pop:147000, pib_pct_ue:65, tp:60, coef_hub:1.02},
    {n:'Targu Mures', pop:134000, pib_pct_ue:42, tp:56, coef_hub:0.90},
    {n:'Baia Mare',   pop:122000, pib_pct_ue:38, tp:50, coef_hub:0.88},
    {n:'Buzau',       pop:115000, pib_pct_ue:35, tp:48, coef_hub:0.85},
    {n:'Botosani',    pop:106000, pib_pct_ue:30, tp:45, coef_hub:0.80},
    {n:'Suceava',     pop:106000, pib_pct_ue:32, tp:48, coef_hub:0.82},
    {n:'Piatra Neamt',pop:85000,  pib_pct_ue:32, tp:44, coef_hub:0.78},
    {n:'Ramnicu Valcea',pop:98000,pib_pct_ue:38, tp:46, coef_hub:0.80},
  ],
};

// Getter peer group per UAT
window._getPeerGroup = function(city) {
  var pop = city.pop2021 || city.pop || 100000;
  var hub = city.coef_hub || 0.78;
  var name = city.name || '';

  var list = pop >= 200000
    ? window._BENCHMARK_NATIONAL.metropolitan
    : window._BENCHMARK_NATIONAL.regional;

  // Exclude UAT-ul curent din comparatie
  return list.filter(function(p){ return p.n !== name; }).slice(0, 5);
};

// ── SCORING URBAN HEALTH INDEX ────────────────────────────────────────────
// Calculeaza scorul per UAT pe baza indicatorilor disponibili
// 100 puncte total
window._calcUrbanScore = function(pred, city) {
  var score = 0;
  var details = {};

  // A. Demografie (0-20p)
  var r10 = pred.r10 || 0;
  var demo_score = r10 >= 1 ? 20 : r10 >= 0 ? 15 : r10 >= -0.5 ? 10 : r10 >= -1 ? 5 : 0;
  score += demo_score;
  details.demografie = {scor: demo_score, max: 20, label: r10 >= 0 ? 'crestere' : 'declin'};

  // B. Economic (0-20p)
  var pUE = pred.pctUE || 38;
  var eco_score = pUE >= 75 ? 20 : pUE >= 60 ? 16 : pUE >= 50 ? 12 : pUE >= 40 ? 8 : 4;
  score += eco_score;
  details.economic = {scor: eco_score, max: 20, label: pUE + '% UE27'};

  // C. Infrastructura (0-20p)
  var tp = pred.tp || 62;
  var infra_score = tp >= 75 ? 20 : tp >= 65 ? 15 : tp >= 55 ? 10 : tp >= 45 ? 6 : 3;
  score += infra_score;
  details.infrastructura = {scor: infra_score, max: 20, label: tp + '% acoperire TP'};

  // D. Riscuri (0-20p) — scor invers (risc mai mic = scor mai mare
  var ag = pred.ag || 0.20;
  var risc_score = ag <= 0.10 ? 20 : ag <= 0.15 ? 17 : ag <= 0.20 ? 14 : ag <= 0.25 ? 10 : ag <= 0.30 ? 6 : 2;
  score += risc_score;
  details.riscuri = {scor: risc_score, max: 20, label: 'ag=' + ag + 'g'};

  // E. Calitate viata (0-20p)
  var sdg = pred.sdgTotal || 6.4;
  var sv = pred.svM2 || 11;
  var qv_score = (sdg >= 8 ? 12 : sdg >= 7 ? 9 : sdg >= 6 ? 6 : 3)
               + (sv >= 15 ? 8 : sv >= 9 ? 6 : sv >= 6 ? 3 : 1);
  score += qv_score;
  details.calitate_viata = {scor: qv_score, max: 20, label: 'SDG ' + sdg + '/10'};

  // Scor potential (cu investitii pe 30 ani)
  var potential = Math.min(100, score + 25);

  var label_actual = score >= 75 ? 'EXCELENT' : score >= 60 ? 'BUN' : score >= 45 ? 'MEDIU' : score >= 30 ? 'SLAB' : 'CRITIC';
  var color_actual = score >= 75 ? '#22c55e' : score >= 60 ? '#60a5fa' : score >= 45 ? '#f59e0b' : score >= 30 ? '#f97316' : '#ef4444';

  return {
    scor_actual: score,
    scor_potential: potential,
    label: label_actual,
    color: color_actual,
    detalii: details,
    nota_actual: (score / 10).toFixed(1),
    nota_potential: (potential / 10).toFixed(1),
  };
};

console.log('[cinema-data.js] LOADED — seismic P100/2013, HG 525/1996, Ordin 839/2009, salarii INSE 2024, scoring UAT');

})();
