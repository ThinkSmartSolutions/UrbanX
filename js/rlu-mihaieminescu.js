// ============================================================
//  RLU — Comuna Mihai Eminescu, Județul Botoșani
//  PR.NR.236/2020 — Vol.1 + Vol.2 integrate
//  Versiune: v=20260525c
// ============================================================

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 1. MAP SAT → UTR-uri aplicabile
  // ----------------------------------------------------------
  var SAT_UTR = {
    'ipotești':         ['UTR-1a', 'UTR-1b'],
    'ipotesti':         ['UTR-1a', 'UTR-1b'],
    'stâncești':        ['UTR-2a', 'UTR-2b'],
    'stancesti':        ['UTR-2a', 'UTR-2b'],
    'cătămărești':      ['UTR-3a', 'UTR-3b'],
    'catamărești':      ['UTR-3a', 'UTR-3b'],
    'catamarest':       ['UTR-3a', 'UTR-3b'],
    'cervicești':       ['UTR-4'],
    'cervicesti':       ['UTR-4'],
    'manolești':        ['UTR-5'],
    'manolesti':        ['UTR-5'],
    'mânăiești':        ['UTR-5'],   // confirmat Vol.2 — același regim
    'manaiesti':        ['UTR-5'],
    'cucorăni':         ['UTR-6a', 'UTR-6b'],
    'cucorани':         ['UTR-6a', 'UTR-6b'],
    'cucorани':         ['UTR-6a', 'UTR-6b'],
    'baișa':            ['UTR-7'],
    'baisa':            ['UTR-7'],
    'cătămărești-deal': ['UTR-8a', 'UTR-8b', 'UTR-8c', 'UTR-8d', 'UTR-8e'],
    'catamărești-deal': ['UTR-8a', 'UTR-8b', 'UTR-8c', 'UTR-8d', 'UTR-8e'],
    'catamarest-deal':  ['UTR-8a', 'UTR-8b', 'UTR-8c', 'UTR-8d', 'UTR-8e'],
    // Bâlseni — nu are UTR distinct în RLU PR.236/2020; se aplică regulile generale L
    'bâlseni':          [],
    'balseni':          []
  };

  // ----------------------------------------------------------
  // 2. CULORI UTR (mapate pe zona funcțională)
  // ----------------------------------------------------------
  var UTR_COLORS = {
    // Locuire rezidențială
    'UTR-1b': { fill: 'rgba(255,220,120,0.25)', border: '#f59e0b' },
    'UTR-2a': { fill: 'rgba(255,220,120,0.25)', border: '#f59e0b' },
    'UTR-3a': { fill: 'rgba(255,220,120,0.25)', border: '#f59e0b' },
    'UTR-4':  { fill: 'rgba(255,220,120,0.25)', border: '#f59e0b' },
    'UTR-5':  { fill: 'rgba(255,220,120,0.25)', border: '#f59e0b' },
    'UTR-6a': { fill: 'rgba(255,220,120,0.25)', border: '#f59e0b' },
    'UTR-7':  { fill: 'rgba(255,220,120,0.25)', border: '#f59e0b' },
    'UTR-8a': { fill: 'rgba(255,220,120,0.25)', border: '#f59e0b' },
    // Zona Centrală / Mixte
    'UTR-1a': { fill: 'rgba(249,115,22,0.20)',  border: '#ea580c' },
    // Industriale / Depozite
    'UTR-2b': { fill: 'rgba(148,163,184,0.25)', border: '#94a3b8' },
    'UTR-8b': { fill: 'rgba(148,163,184,0.25)', border: '#94a3b8' },
    'UTR-8c': { fill: 'rgba(148,163,184,0.25)', border: '#94a3b8' },
    // Producție agricolă
    'UTR-6b': { fill: 'rgba(163,230,53,0.20)',  border: '#84cc16' },
    'UTR-8d': { fill: 'rgba(163,230,53,0.20)',  border: '#84cc16' },
    // Spații verzi / Agrement
    'UTR-3b': { fill: 'rgba(74,222,128,0.22)',  border: '#22c55e' },
    'UTR-8e': { fill: 'rgba(74,222,128,0.22)',  border: '#22c55e' },
    // Default
    'DEFAULT': { fill: 'rgba(255,220,120,0.18)', border: '#f59e0b' }
  };

  // ----------------------------------------------------------
  // 3. DATE COMPLETE UTR (pentru popup / panou RLU)
  // ----------------------------------------------------------
  var UTR_DATA = {
    'UTR-1a': {
      id: 'UTR-1a', sat: 'Ipotești',
      tip: 'Zonă Centrală cu Funcțiuni Mixte',
      zona: 'C', pot: 50, cut: 1.50,
      hmax: '9m (streaș. sau atic)',
      regim: 'P, P+1E, P+2E',
      note: 'Centru Civic Ipotești. Include monumente: Casa Memorială Mihai Eminescu, Memorialul Ipotești, Biserica Sf. Arhangheli. Construire în zona de protecție monument (200m) cu aviz DJCPN.'
    },
    'UTR-1b': {
      id: 'UTR-1b', sat: 'Ipotești',
      tip: 'Locuințe și Funcțiuni Complementare',
      zona: 'L', pot: 30, cut: 0.60,
      hmax: '12m (streaș. sau atic)',
      regim: 'P, P+1E',
      note: 'Locuințe individuale și colective mici. Parcelă min. 300 mp, front min. 12m (înșiruite) / 10m (izolate). Acces carosabil min. 4m.'
    },
    'UTR-2a': {
      id: 'UTR-2a', sat: 'Stâncești',
      tip: 'Locuințe și Funcțiuni Complementare',
      zona: 'L', pot: 30, cut: 0.60,
      hmax: '12m (streaș. sau atic)',
      regim: 'P, P+1E',
      note: 'Locuințe individuale și colective mici. Parcelă min. 300 mp. Monument în zonă: Așezare fortificată Stâncești (BT-I-s-A-01832), Capela Sf. Teodor. Protecție 200m cu aviz DJCPN.'
    },
    'UTR-2b': {
      id: 'UTR-2b', sat: 'Stâncești',
      tip: 'Unități Industriale, Depozite și Prestări Servicii',
      zona: 'ID', pot: 50, cut: 1.00,
      hmax: '9m (min. 4m)',
      regim: 'parter funcțional',
      note: 'Zonă industrială/depozitare. Parcelă min. 1000 mp, front min. 20m. Interzisă amplasarea locuințelor și unităților de învățământ.'
    },
    'UTR-3a': {
      id: 'UTR-3a', sat: 'Cătămărești',
      tip: 'Locuințe și Funcțiuni Complementare',
      zona: 'L', pot: 30, cut: 0.60,
      hmax: '12m (streaș. sau atic)',
      regim: 'P, P+1E',
      note: 'Trupul principal Cătămărești (≠ Cătămărești-Deal). Parcelă min. 300 mp, front min. 12m. Acces carosabil min. 4m.'
    },
    'UTR-3b': {
      id: 'UTR-3b', sat: 'Cătămărești',
      tip: 'Spații Verzi Amenajate și Agrement — Lacul cu Nuferi',
      zona: 'SP', pot: 30, cut: 0.60,
      hmax: '9m',
      regim: 'parter',
      note: 'Agrement, relaxare meditativă, turism. Dom. public 90%, privat 10%. Pe proprietate privată se admit: servicii, turism, cazare, agrement. Parcelă min. 1000 mp.'
    },
    'UTR-4': {
      id: 'UTR-4', sat: 'Cervicești',
      tip: 'Locuințe și Funcțiuni Complementare',
      zona: 'L', pot: 30, cut: 0.60,
      hmax: '12m (streaș. sau atic)',
      regim: 'P, P+1E',
      note: 'Locuințe individuale și colective mici. Parcelă min. 300 mp. Monument: Biserica de lemn Adormirea Maicii Domnului (BT-II-m-B-01954). Protecție 200m cu aviz DJCPN.'
    },
    'UTR-5': {
      id: 'UTR-5', sat: 'Manolești',
      tip: 'Locuințe și Funcțiuni Complementare',
      zona: 'L', pot: 30, cut: 0.60,
      hmax: '12m', regim: 'P, P+1E',
      note: 'Locuințe individuale. Același regim aplicabil localității Mânăiești.'
    },
    'UTR-6a': {
      id: 'UTR-6a', sat: 'Cucorăni',
      tip: 'Locuințe și Funcțiuni Complementare',
      zona: 'L', pot: 30, cut: 0.60,
      hmax: '12m', regim: 'P, P+1E',
      note: 'Cel mai mare trup de intravilan din UAT (~302 ha conform pug.geojson).'
    },
    'UTR-6b': {
      id: 'UTR-6b', sat: 'Cucorăni',
      tip: 'Producție Agricolă',
      zona: 'A', pot: 50, cut: 1.00,
      hmax: '9m', regim: 'parter funcțional',
      note: 'Zonă de producție agricolă.'
    },
    'UTR-7': {
      id: 'UTR-7', sat: 'Baișa',
      tip: 'Locuințe și Funcțiuni Complementare',
      zona: 'L', pot: 30, cut: 0.60,
      hmax: '12m', regim: 'P, P+1E',
      note: 'Locuințe individuale.'
    },
    'UTR-8a': {
      id: 'UTR-8a', sat: 'Cătămărești-Deal',
      tip: 'Locuințe și Funcțiuni Complementare',
      zona: 'L', pot: 30, cut: 0.60,
      hmax: '12m', regim: 'P, P+1E',
      note: 'Suburb de facto al mun. Botoșani. Densitate mare de locuire.'
    },
    'UTR-8b': {
      id: 'UTR-8b', sat: 'Cătămărești-Deal',
      tip: 'Unități Industriale — EMAGROCOM',
      zona: 'ID', pot: 50, cut: 1.50,
      hmax: '9m', regim: 'parter funcțional',
      note: 'Zonă industrială EMAGROCOM.'
    },
    'UTR-8c': {
      id: 'UTR-8c', sat: 'Cătămărești-Deal',
      tip: 'Unități Industriale și Servicii — VAMA',
      zona: 'ID', pot: 50, cut: 1.50,
      hmax: '9m', regim: 'parter funcțional',
      note: 'Zonă industrială și servicii VAMA.'
    },
    'UTR-8d': {
      id: 'UTR-8d', sat: 'Cătămărești-Deal',
      tip: 'Producție Agricolă DN29B',
      zona: 'A', pot: 50, cut: 1.50,
      hmax: '9m', regim: 'parter funcțional',
      note: 'Producție agricolă pe axa DN29B.'
    },
    'UTR-8e': {
      id: 'UTR-8e', sat: 'Cătămărești-Deal',
      tip: 'Spații Verzi și Agrement — Iazul Pulberăriei',
      zona: 'SP', pot: 30, cut: 0.60,
      hmax: '9m', regim: 'parter',
      note: 'Spații verzi amenajate și agrement la Iazul Pulberăriei.'
    }
  };

  // ----------------------------------------------------------
  // 4. FUNCȚII HELPER
  // ----------------------------------------------------------

  function _normalizeSat(s) {
    if (!s) return '';
    return s.toLowerCase()
      .replace(/ș/g, 'ș').replace(/ț/g, 'ț')
      .trim();
  }

  function _getUTRsForSat(satName) {
    var key = _normalizeSat(satName);
    // match exact
    if (SAT_UTR[key]) return SAT_UTR[key];
    // match fuzzy (starts with)
    var keys = Object.keys(SAT_UTR);
    for (var i = 0; i < keys.length; i++) {
      if (key.indexOf(keys[i]) === 0 || keys[i].indexOf(key) === 0) {
        return SAT_UTR[keys[i]];
      }
    }
    return [];
  }

  function _getColorForUTR(utrId) {
    return UTR_COLORS[utrId] || UTR_COLORS['DEFAULT'];
  }

  function _getDataForUTR(utrId) {
    return UTR_DATA[utrId] || null;
  }

  // ----------------------------------------------------------
  // 5. EXPORT PUBLIC
  // ----------------------------------------------------------
  window._RLU = window._RLU || {};
  window._RLU['RO-BT-38063'] = {
    uat:       'Comuna Mihai Eminescu',
    judet:     'Botoșani',
    sursa:     'PR.NR.236/2020 (Vol.1 + Vol.2)',
    satUtr:    SAT_UTR,
    utrColors: UTR_COLORS,
    utrData:   UTR_DATA,
    getUTRsForSat:    _getUTRsForSat,
    getColorForUTR:   _getColorForUTR,
    getDataForUTR:    _getDataForUTR
  };

  // Compatibilitate cu apelurile existente din rlu-engine
  if (typeof window._registerRLU === 'function') {
    window._registerRLU('RO-BT-38063', window._RLU['RO-BT-38063']);
  }

  console.log('[RLU] Mihai Eminescu loaded — ' +
    Object.keys(UTR_DATA).length + ' UTR-uri (Vol.1 + Vol.2)');

})();
