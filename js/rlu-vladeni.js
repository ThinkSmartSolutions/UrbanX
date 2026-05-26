/**
 * rlu-vladeni.js — RLU Comuna Vlădeni, jud. Iași
 * Sursă: PUG Vlădeni, Proiect nr. 74/2017-2021, Birou Arhitectura3
 * GeoPackage: IS_Vladeni_100148_PUG_20240222.gpkg
 * Integrat în UrbanX: 2026-05-25
 */
(function () {
  'use strict';

  // ── Mapare sat → UTR-uri aplicabile ─────────────────────────────────────
  var SAT_UTR = {
    'vlădeni':        ['UTR-Li1', 'UTR-Lc', 'UTR-CM1', 'UTR-IS', 'UTR-GC', 'UTR-SV'],
    'hărmăneasa':     ['UTR-Li1', 'UTR-Li2', 'UTR-Lc'],
    'satu nou':       ['UTR-Li1', 'UTR-Li2'],
    'trei fântâni':   ['UTR-Li1', 'UTR-Li2'],
    'vișan':          ['UTR-Li1', 'UTR-Li2'],
  };

  // ── Culori per cod zonă funcțională ─────────────────────────────────────
  var UTR_COLORS = {
    'Li1':   { fill: 'rgba(255,230,140,0.25)', border: '#fbbf24' },
    'Li2':   { fill: 'rgba(255,200,80,0.20)',  border: '#f59e0b' },
    'Lc':    { fill: 'rgba(255,215,100,0.22)', border: '#fbbf24' },
    'CM1':   { fill: 'rgba(251,191,36,0.22)',  border: '#d4af37' },
    'IS':    { fill: 'rgba(147,197,253,0.25)', border: '#60a5fa' },
    'AI':    { fill: 'rgba(163,230,53,0.22)',  border: '#84cc16' },
    'GC':    { fill: 'rgba(96,165,250,0.18)',  border: '#3b82f6' },
    'SV':    { fill: 'rgba(74,222,128,0.25)',  border: '#22c55e' },
    'CR':    { fill: 'rgba(148,163,184,0.18)', border: '#94a3b8' },
    'CF':    { fill: 'rgba(100,116,139,0.18)', border: '#64748b' },
    'TE':    { fill: 'rgba(167,139,250,0.18)', border: '#8b5cf6' },
    'D':     { fill: 'rgba(239,68,68,0.18)',   border: '#dc2626' },
    'TA':    { fill: 'rgba(56,189,248,0.22)',  border: '#0ea5e9' },
    'TFF':   { fill: 'rgba(34,197,94,0.18)',   border: '#16a34a' },
    'AR':    { fill: 'rgba(217,249,157,0.20)', border: '#84cc16' },
    'TN':    { fill: 'rgba(156,163,175,0.15)', border: '#6b7280' },
  };

  // ── Date complete per UTR ─────────────────────────────────────────────────
  var UTR_DATA = {

    'UTR-Li1': {
      id: 'UTR-Li1', cod: 'Li1',
      tip: 'Zona Locuințe Individuale — Țesut Tradițional',
      descriere: 'Locuire individuală în țesut tradițional, regim continuu și discontinuu, maxim P+2E.',
      pot: 40, cut: 1.20,
      hmax: 'P+2E',
      regim: 'P, P+1E, P+2E',
      retrageri: 'La aliniamentul clădirilor existente; retragere permisă cu respectarea coerenței fronturilor',
      utilizari_admise: 'Locuințe, anexe gospodărești, modernizări, profesiuni liberale, mici unități nepoluante',
      utilizari_interzise: 'Construcții incompatibile cu locuirea, microferme porcine în afara zonelor special amenajate',
      spatii_verzi: 'Min. 30% din suprafața terenului',
      sursa: 'RLU Vlădeni 2021 — zona Li1'
    },

    'UTR-Li2': {
      id: 'UTR-Li2', cod: 'Li2',
      tip: 'Zona Locuințe Individuale pe Versanți',
      descriere: 'Locuire individuală pe versanți, maxim P+1E. Studii geotehnice locale obligatorii.',
      pot: 30, cut: 0.60,
      hmax: 'P+1E',
      regim: 'P, P+1E',
      retrageri: 'La aliniamentul clădirilor existente',
      utilizari_admise: 'Locuințe individuale izolate, anexe gospodărești, modernizări',
      utilizari_interzise: 'Construcții noi pe terenuri cu alunecări (ZA1), construcții în zone de protecție LEA',
      spatii_verzi: 'Min. 30% din suprafața terenului',
      nota: '⚠️ Studii geotehnice locale obligatorii pentru versanți',
      sursa: 'RLU Vlădeni 2021 — zona Li2'
    },

    'UTR-Lc': {
      id: 'UTR-Lc', cod: 'Lc',
      tip: 'Zona Locuințe Individuale și Colective Mici',
      descriere: 'Locuire individuală și colectivă mică, regim continuu și discontinuu, maxim P+2E+M.',
      pot: 35, cut: 1.05,
      hmax: 'P+2E+M',
      regim: 'P, P+1E, P+2E, P+2E+M',
      retrageri: 'La aliniamentul clădirilor existente',
      utilizari_admise: 'Locuințe individuale și colective mici, anexe, profesiuni liberale, mici unități nepoluante',
      utilizari_interzise: 'Construcții incompatibile cu locuirea',
      spatii_verzi: 'Min. 30% din suprafața terenului',
      sursa: 'RLU Vlădeni 2021 — zona Lc'
    },

    'UTR-CM1': {
      id: 'UTR-CM1', cod: 'CM1',
      tip: 'Zona Mixtă',
      descriere: 'Subzonă mixtă cu regim mic de înălțime. Nucleu secundar de servicii și comerț de-a lungul arterelor principale.',
      pot: 50, cut: 1.50,
      hmax: 'Conform regulii H ≤ distanța față de aliniamentul opus',
      regim: 'P+2 (orientativ)',
      retrageri: 'La aliniamentul existent sau retras cu respectarea coerenței; H/2 față de limitele parcelei',
      utilizari_admise: 'Servicii publice, comerț, hoteluri, restaurante, birouri, loisir, locuințe, mici unități nepoluante',
      utilizari_interzise: 'Restaurante cu băuturi alcoolice la <100m de servicii publice/biserici, activități productive poluante',
      spatii_verzi: 'Min. 30% pe fiecare parcelă',
      gard: 'Transparent H max 2.00m, soclu 0.60–0.80m opac + gard viu; vecini: opac H max 2.20m',
      sursa: 'RLU Vlădeni 2021 — zona CM1'
    },

    'UTR-IS': {
      id: 'UTR-IS', cod: 'IS',
      tip: 'Zona Instituții Publice și Servicii',
      descriere: 'Instituții publice, dotări de învățământ, sănătate, cultură, administrație.',
      pot: 50, cut: null,
      pot_invatamant: '25% construcții + 75% teren amenajat',
      pot_sanatate: '20% construcții',
      hmax: 'Conform regulii H ≤ distanța față de aliniamentul opus',
      regim: 'Conform necesități funcționale',
      utilizari_admise: 'Instituții publice, servicii de interes general, dotări publice',
      utilizari_interzise: 'Activități incompatibile cu funcțiunea publică',
      spatii_verzi: 'Min. 20% (învățământ), aliniamente de protecție (sănătate)',
      sursa: 'RLU Vlădeni 2021 — zona IS'
    },

    'UTR-AI': {
      id: 'UTR-AI', cod: 'AI',
      tip: 'Zona Unități Agro-Industriale',
      descriere: 'Activități productive agro-industriale, depozitare, servicii pentru agricultură.',
      pot: 50, cut: 0.60,
      hmax: 'Nelimitată (conform specificului)',
      regim: 'Conform necesități funcționale',
      utilizari_admise: 'Unități de producție agricolă, servicii pentru agricultură, panouri fotovoltaice, pompe de căldură, geotermale, locuințe de serviciu în microferme',
      utilizari_interzise: 'Microferme porcine în afara zonelor special amenajate, construcții din zona de locuire',
      nota: 'Spre drumurile publice — construcții reprezentative, nu anexe',
      sursa: 'RLU Vlădeni 2021 — zona AI'
    },

    'UTR-GC': {
      id: 'UTR-GC', cod: 'GC',
      tip: 'Zona Gospodărie Comunală și Cimitire',
      descriere: 'G1 — construcții și instalații gospodărie comunală; G2 — cimitire.',
      pot: 50, cut: null,
      hmax: 'Conform necesități',
      regim: 'Construcții accesorii și tehnice',
      utilizari_admise: 'Cimitire, construcții tehnico-edilitare comunale, rampe transfer gunoi, construcții de cult',
      utilizari_interzise: 'Construcții incompatibile cu funcțiunea zonei',
      nota: '⚠️ Distanță sanitară: 50m față de zone locuibile (cimitire); 200m (rampe deșeuri)',
      sursa: 'RLU Vlădeni 2021 — zona G'
    },

    'UTR-SV': {
      id: 'UTR-SV', cod: 'SV',
      tip: 'Zona Spații Verzi, Sport și Agrement',
      descriere: 'P1 — parcuri, scuaruri, agrement, sport; P2 — culoare de protecție infrastructură.',
      pot: 15, cut: null,
      hmax: 'Construcțiile max 15% din suprafață totală (cu PUD)',
      regim: 'Construcții accesorii zonei verzi',
      utilizari_admise: 'Parcuri, scuaruri, zone de agrement, amenajări sportive, perdele de protecție, plantații',
      utilizari_interzise: 'Construcții ce degradează peisajul, exploatări ce distrug vegetația, depozitare deșeuri',
      sursa: 'RLU Vlădeni 2021 — zona P/SV'
    },

    'UTR-CR': {
      id: 'UTR-CR', cod: 'CR',
      tip: 'Zona Căi de Comunicație Rutieră',
      descriere: 'Drumuri județene, comunale și propuse pe trasee noi.',
      utilizari_admise: 'Căi de comunicație, parcaje publice, trotuare, zone verzi, lucrări de modernizare',
      utilizari_interzise: 'Intervenții ce depreciază circulația, depozitare deșeuri în zona drumului',
      sursa: 'RLU Vlădeni 2021 — zona TCr'
    },

    'UTR-CF': {
      id: 'UTR-CF', cod: 'CF',
      tip: 'Zona Căi de Comunicație Feroviară',
      descriere: 'Infrastructura feroviară.',
      utilizari_admise: 'Infrastructura feroviară și construcții aferente',
      utilizari_interzise: 'Construcții incompatibile cu zona feroviară',
      sursa: 'RLU Vlădeni 2021 — zona TCf'
    },

    'UTR-TE': {
      id: 'UTR-TE', cod: 'TE',
      tip: 'Zona Unități Tehnico-Edilitare',
      descriere: 'TEa — gospodărire ape/canalizare; TEg — stații gaz.',
      utilizari_admise: 'Construcții și instalații tehnico-edilitare',
      utilizari_interzise: 'Locuințe permanente, funcțiuni incompatibile',
      sursa: 'RLU Vlădeni 2021 — zona TE'
    },

    'UTR-D': {
      id: 'UTR-D', cod: 'D',
      tip: 'Zona cu Destinație Specială',
      descriere: 'Obiective MApN, MI, SRI.',
      utilizari_admise: 'Conform reglementărilor specifice',
      utilizari_interzise: 'Orice lucrare fără avizul MApN/MI/SRI',
      nota: '⚠️ Aviz obligatoriu MApN/MI/SRI pentru orice lucrare în vecinătate (Ord. 34/N/1995)',
      sursa: 'RLU Vlădeni 2021 — zona S/D'
    },

    'UTR-TA': {
      id: 'UTR-TA', cod: 'TA',
      tip: 'Zone Aflate Permanent sub Ape',
      descriere: 'Albii pârâuri, lacuri, bălți.',
      utilizari_admise: 'Lucrări de gospodărire a apelor, platforme meteorologice, captări',
      utilizari_interzise: 'Construcții în albiile minore',
      nota: '⚠️ Min. 15m față de albie — nu se autorizează locuințe noi',
      sursa: 'RLU Vlădeni 2021 — zona TA'
    },

    'UTR-TFF': {
      id: 'UTR-TFF', cod: 'TFF',
      tip: 'Fond Forestier',
      utilizari_admise: 'Construcții silvice (excepțional, cu aviz)',
      utilizari_interzise: 'Orice construcții cu excepția celor silvice',
      sursa: 'RLU Vlădeni 2021 — Extravilan'
    },

    'UTR-AR': {
      id: 'UTR-AR', cod: 'AR',
      tip: 'Terenuri Agricole',
      utilizari_admise: 'Construcții care servesc activității agricole (Legea 50/1991)',
      utilizari_interzise: 'Garaje, locuințe, amenajări cu caracter permanent; construcții pe terenuri clasa I și II',
      sursa: 'RLU Vlădeni 2021 — Extravilan'
    },

    'UTR-TN': {
      id: 'UTR-TN', cod: 'TN',
      tip: 'Terenuri Neproductive',
      utilizari_admise: 'Lucrări de aducere în circuit agricol/silvic',
      utilizari_interzise: 'Orice construcție pe terenuri cu riscuri naturale',
      sursa: 'RLU Vlădeni 2021 — Extravilan'
    },
  };

  // ── Export în window._RLU ────────────────────────────────────────────────
  window._RLU = window._RLU || {};
  window._RLU['RO-IS-100148'] = {
    uat:      'Comuna Vlădeni',
    judet:    'Iași',
    siruta:   'RO-IS-100148',
    sursa:    'PUG Vlădeni — Proiect nr. 74/2017-2021, Birou Arhitectura3',
    satUtr:   SAT_UTR,
    culori:   UTR_COLORS,
    utrData:  UTR_DATA,
    localitati: ['Vlădeni', 'Hărmăneasa', 'Satu Nou', 'Trei Fântâni', 'Vișan']
  };

  console.log('[UrbanX] RLU Vlădeni (RO-IS-100148) încărcat —',
    Object.keys(UTR_DATA).length, 'UTR-uri definite');

})();
