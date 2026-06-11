// rlu-galati.js — Municipiul Galați
// Sursa: RLU PUG Galați REV05 / Decembrie 2025
// Genererat: 2026-06-11
// Format: window._PUG_REGULI['RO-GL-01'].utrs[utrNr]

(function() {
'use strict';

window._PUG_REGULI = window._PUG_REGULI || {};

window._PUG_REGULI['RO-GL-01'] = window._PUG_REGULI['RO-GL-01'] || {};

// Inject utrs into existing or future reguli object
var _inject = function(d) {
  if (!d) return;
  d.utrs = {
    // ── ZF07 — Zona Centrala ─────────────────────────────────────────────
    '15': { denumire:'UTR 15 — Zona Centrală', fn_dominanta:'ZF07',
      subzone_admise:['ZF08.1','ZF08.5','ZF08.6','ZF08.10','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04','ZF13'] },

    // ── ZF08.1 — Pol Agrement-Servicii ───────────────────────────────────
    '7': { denumire:'UTR 7 — Pol Agrement-Servicii', fn_dominanta:'ZF08.1',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1','ZF14.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },

    // ── ZF08.2 — Poli Urbani Principali ──────────────────────────────────
    '14': { denumire:'UTR 14 — Pol Urban Principal', fn_dominanta:'ZF08.2',
      subzone_admise:['ZF08.1','ZF08.5','ZF08.6','ZF08.10','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '26': { denumire:'UTR 26 — Pol Urban Principal Brăilei', fn_dominanta:'ZF08.2',
      subzone_admise:['ZF08.1','ZF08.5','ZF08.6','ZF08.10','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '31': { denumire:'UTR 31 — Pol Urban Principal Siderurgiștilor', fn_dominanta:'ZF08.2',
      subzone_admise:['ZF08.1','ZF08.5','ZF08.6','ZF08.10','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },

    // ── ZF08.3 — Agrement Faleza Dunarii ─────────────────────────────────
    '38': { denumire:'UTR 38 — Agrement Faleza Dunării', fn_dominanta:'ZF08.3',
      subzone_admise:['ZF08.4','ZF14.1','ZF14_V2','ZF09.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04','ZF13'] },

    // ── ZF08.4 — Agrement/Loisir ─────────────────────────────────────────
    '20': { denumire:'UTR 20 — Agrement/Loisir', fn_dominanta:'ZF08.4',
      subzone_admise:['ZF08.3','ZF14.1','ZF08.5'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },

    // ── ZF08.5 — Mixte Locuinte/Comert/Servicii ──────────────────────────
    '1':  { denumire:'UTR 1 — Zonă Mixtă', fn_dominanta:'ZF08.5',
      subzone_admise:['ZF08.6','ZF09.1','ZF10.1','ZF11.2'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '21': { denumire:'UTR 21 — Zonă Mixtă Loc.Individuale/Comerț', fn_dominanta:'ZF08.5',
      subzone_admise:['ZF08.6','ZF09.1','ZF10.1','ZF11.2'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '45': { denumire:'UTR 45 — Zonă Mixtă', fn_dominanta:'ZF08.5',
      subzone_admise:['ZF08.6','ZF09.1','ZF10.1','ZF11.2'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '55': { denumire:'UTR 55 — Zonă Mixtă', fn_dominanta:'ZF08.5',
      subzone_admise:['ZF08.6','ZF09.1','ZF10.1','ZF11.2'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },

    // ── ZF08.6 — Mixte Loc.Colective/Comert/Servicii ─────────────────────
    '8':  { denumire:'UTR 8 — Mixtă Colective/Comerț', fn_dominanta:'ZF08.6',
      subzone_admise:['ZF08.5','ZF09.1','ZF10.1','ZF11.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '9':  { denumire:'UTR 9 — Mixtă Colective/Comerț', fn_dominanta:'ZF08.6',
      subzone_admise:['ZF08.5','ZF09.1','ZF10.1','ZF11.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '23': { denumire:'UTR 23 — Mixtă Siderurgiștilor/Basarabiei', fn_dominanta:'ZF08.6',
      subzone_admise:['ZF08.5','ZF09.1','ZF10.1','ZF11.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '33': { denumire:'UTR 33 — Mixtă Colective/Comerț', fn_dominanta:'ZF08.6',
      subzone_admise:['ZF08.5','ZF09.1','ZF10.1','ZF11.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },

    // ── ZF08.7 — Universitara/Cercetare/Birouri ───────────────────────────
    '43': { denumire:'UTR 43 — Universitar/Cercetare/Birouri', fn_dominanta:'ZF08.7',
      subzone_admise:['ZF08.5','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04','ZF11.1'] },

    // ── ZF08.8 — Functiuni Complexe (Faleza) ─────────────────────────────
    '32': { denumire:'UTR 32 — Pol Agrement Principal Faleza', fn_dominanta:'ZF08.8',
      subzone_admise:['ZF08.3','ZF08.4','ZF14.1','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },

    // ── ZF08.9 — Mixte Locuinte/Servicii/Agrement ────────────────────────
    '52': { denumire:'UTR 52 — Mixtă Locuințe/Servicii/Agrement', fn_dominanta:'ZF08.9',
      subzone_admise:['ZF08.5','ZF11.2','ZF09.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '53': { denumire:'UTR 53 — Mixtă Locuințe/Servicii/Agrement', fn_dominanta:'ZF08.9',
      subzone_admise:['ZF08.5','ZF11.2','ZF09.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },

    // ── ZF08.10 — Pol Urban Secundar ─────────────────────────────────────
    '12': { denumire:'UTR 12 — Pol Urban Secundar Traian', fn_dominanta:'ZF08.10',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1','ZF11.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },

    // ── ZF11.1 — Locuinte Colective ───────────────────────────────────────
    '16': { denumire:'UTR 16 — Loc.Colective', fn_dominanta:'ZF11.1',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '17': { denumire:'UTR 17 — Loc.Colective', fn_dominanta:'ZF11.1',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '18': { denumire:'UTR 18 — Loc.Colective', fn_dominanta:'ZF11.1',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '22': { denumire:'UTR 22 — Loc.Colective Micro 16', fn_dominanta:'ZF11.1',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '27': { denumire:'UTR 27 — Loc.Colective Mazepa', fn_dominanta:'ZF11.1',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '29': { denumire:'UTR 29 — Loc.Colective Tiglina II', fn_dominanta:'ZF11.1',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '30': { denumire:'UTR 30 — Loc.Colective', fn_dominanta:'ZF11.1',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '34': { denumire:'UTR 34 — Loc.Colective', fn_dominanta:'ZF11.1',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '35': { denumire:'UTR 35 — Loc.Colective', fn_dominanta:'ZF11.1',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },
    '36': { denumire:'UTR 36 — Loc.Colective Micro 19-21', fn_dominanta:'ZF11.1',
      subzone_admise:['ZF08.5','ZF08.6','ZF09.1','ZF10.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04'] },

    // ── ZF11.2 — Locuinte Individuale ────────────────────────────────────
    '3':  { denumire:'UTR 3 — Loc.Individuale', fn_dominanta:'ZF11.2',
      subzone_admise:['ZF08.5','ZF09.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04','ZF11.1'] },
    '4':  { denumire:'UTR 4 — Loc.Individuale', fn_dominanta:'ZF11.2',
      subzone_admise:['ZF08.5','ZF09.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04','ZF11.1'] },
    '5':  { denumire:'UTR 5 — Loc.Individuale', fn_dominanta:'ZF11.2',
      subzone_admise:['ZF08.5','ZF09.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04','ZF11.1'] },
    '10': { denumire:'UTR 10 — Loc.Individuale', fn_dominanta:'ZF11.2',
      subzone_admise:['ZF08.5','ZF09.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04','ZF11.1'] },
    '13': { denumire:'UTR 13 — Loc.Individuale', fn_dominanta:'ZF11.2',
      subzone_admise:['ZF08.5','ZF09.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04','ZF11.1'] },
    '19': { denumire:'UTR 19 — Loc.Individuale', fn_dominanta:'ZF11.2',
      subzone_admise:['ZF08.5','ZF09.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04','ZF11.1'] },
    '25': { denumire:'UTR 25 — Loc.Individuale', fn_dominanta:'ZF11.2',
      subzone_admise:['ZF08.5','ZF09.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04','ZF11.1'] },
    '39': { denumire:'UTR 39 — Loc.Individuale', fn_dominanta:'ZF11.2',
      subzone_admise:['ZF08.5','ZF09.1'],
      fn_interzise:['ZF12.1','ZF12.2','ZF04','ZF11.1'] },

    // ── ZF12.1 — Activitati Productive si Servicii ───────────────────────
    '11': { denumire:'UTR 11 — Activitati Productive/Servicii', fn_dominanta:'ZF12.1',
      subzone_admise:['ZF10.1'],
      fn_interzise:['ZF11.1','ZF11.2','ZF07','ZF08.1','ZF08.2'] },
    '24': { denumire:'UTR 24 — Activitati Productive', fn_dominanta:'ZF12.1',
      subzone_admise:['ZF10.1'],
      fn_interzise:['ZF11.1','ZF11.2','ZF07','ZF08.1','ZF08.2'] },
    '37': { denumire:'UTR 37 — Activitati Productive/Servicii/Loc.Ind.', fn_dominanta:'ZF12.1',
      subzone_admise:['ZF11.2','ZF10.1'],
      fn_interzise:['ZF11.1','ZF07','ZF08.1','ZF08.2'] },
    '40': { denumire:'UTR 40 — Activitati Productive', fn_dominanta:'ZF12.1',
      subzone_admise:['ZF10.1'],
      fn_interzise:['ZF11.1','ZF11.2','ZF07','ZF08.1','ZF08.2'] },
    '46': { denumire:'UTR 46 — Activitati Productive', fn_dominanta:'ZF12.1',
      subzone_admise:['ZF10.1'],
      fn_interzise:['ZF11.1','ZF11.2','ZF07','ZF08.1','ZF08.2'] },
    '51': { denumire:'UTR 51 — Activitati Productive', fn_dominanta:'ZF12.1',
      subzone_admise:['ZF10.1'],
      fn_interzise:['ZF11.1','ZF11.2','ZF07','ZF08.1','ZF08.2'] },
    '54': { denumire:'UTR 54 — Activitati Productive', fn_dominanta:'ZF12.1',
      subzone_admise:['ZF10.1'],
      fn_interzise:['ZF11.1','ZF11.2','ZF07','ZF08.1','ZF08.2'] },

    // ── ZF12.2 — Activitati Productive si Depozitare ─────────────────────
    '41': { denumire:'UTR 41 — Activitati Productive/Depozitare', fn_dominanta:'ZF12.2',
      subzone_admise:['ZF12.1'],
      fn_interzise:['ZF11.1','ZF11.2','ZF07','ZF08.1','ZF08.2','ZF08.3'] },
    '47': { denumire:'UTR 47 — Activitati Productive/Depozitare', fn_dominanta:'ZF12.2',
      subzone_admise:['ZF12.1'],
      fn_interzise:['ZF11.1','ZF11.2','ZF07','ZF08.1','ZF08.2','ZF08.3'] },
    '49': { denumire:'UTR 49 — Activitati Productive/Depozitare', fn_dominanta:'ZF12.2',
      subzone_admise:['ZF12.1'],
      fn_interzise:['ZF11.1','ZF11.2','ZF07','ZF08.1','ZF08.2','ZF08.3'] },
    '50': { denumire:'UTR 50 — Unitati Industriale/Depozitare', fn_dominanta:'ZF12.2',
      subzone_admise:['ZF12.1'],
      fn_interzise:['ZF11.1','ZF11.2','ZF07','ZF08.1','ZF08.2','ZF08.3'] },

    // ── ZF13 — Gospodarie Comunala/Cimitire ──────────────────────────────
    'G': { denumire:'UTR G — Gospodărie Comunală / Cimitire', fn_dominanta:'ZF13',
      subzone_admise:['ZF14.1'],
      fn_interzise:['ZF11.1','ZF11.2','ZF12.1','ZF12.2'] },

    // ── ZF14.1 — Spatii Verzi/Agrement/Sport ─────────────────────────────
    '6':  { denumire:'UTR 6 — Spații Verzi', fn_dominanta:'ZF14.1',
      subzone_admise:['ZF14_V1','ZF14_PV'],
      fn_interzise:['ZF11.1','ZF11.2','ZF12.1','ZF12.2'] },
    '28': { denumire:'UTR 28 — Parc Spații Verzi', fn_dominanta:'ZF14.1',
      subzone_admise:['ZF14_V1','ZF14_PV'],
      fn_interzise:['ZF11.1','ZF11.2','ZF12.1','ZF12.2'] },
    '42': { denumire:'UTR 42 — Spații Verzi', fn_dominanta:'ZF14.1',
      subzone_admise:['ZF14_V1','ZF14_PV'],
      fn_interzise:['ZF11.1','ZF11.2','ZF12.1','ZF12.2'] },
    'V':  { denumire:'UTR V — Spații Verzi', fn_dominanta:'ZF14_V1',
      subzone_admise:['ZF14.1','ZF14_PV'],
      fn_interzise:['ZF11.1','ZF11.2','ZF12.1','ZF12.2'] },

    // ── ZF15 — Destinatie Speciala ────────────────────────────────────────
    '2':  { denumire:'UTR 2 — TDS Cazarma 530', fn_dominanta:'ZF15',
      subzone_admise:[],
      fn_interzise:['ZF11.1','ZF11.2','ZF12.1','ZF08.1','ZF08.2','ZF08.3'] },
    'TDS':{ denumire:'UTR TDS — Destinație Specială', fn_dominanta:'ZF15',
      subzone_admise:[],
      fn_interzise:['ZF11.1','ZF11.2','ZF12.1','ZF08.1','ZF08.2','ZF08.3'] },

    // ── ZF06.3 — Port ─────────────────────────────────────────────────────
    '44': { denumire:'UTR 44 — Port Galați', fn_dominanta:'ZF06.3',
      subzone_admise:['ZF12.1','ZF12.2'],
      fn_interzise:['ZF11.1','ZF11.2','ZF07','ZF08.5'] },

    // ── ZF04 — Agrozootehnic (Trupuri) ────────────────────────────────────
    'Trup 5':  { denumire:'Trup 5 — Agrozootehnic', fn_dominanta:'ZF04', subzone_admise:[], fn_interzise:['ZF11.1','ZF11.2'] },
    'Trup 14': { denumire:'Trup 14 — Agrozootehnic', fn_dominanta:'ZF04', subzone_admise:[], fn_interzise:['ZF11.1','ZF11.2'] },
    'Trup 15': { denumire:'Trup 15 — Agrozootehnic', fn_dominanta:'ZF04', subzone_admise:[], fn_interzise:['ZF11.1','ZF11.2'] },
    'Trup 16': { denumire:'Trup 16 — Agrozootehnic', fn_dominanta:'ZF04', subzone_admise:[], fn_interzise:['ZF11.1','ZF11.2'] },
    'Trup 21': { denumire:'Trup 21 — Agrozootehnic', fn_dominanta:'ZF04', subzone_admise:[], fn_interzise:['ZF11.1','ZF11.2'] },
    'Trup 22': { denumire:'Trup 22 — Agrozootehnic', fn_dominanta:'ZF04', subzone_admise:[], fn_interzise:['ZF11.1','ZF11.2'] },
    'Trup 23': { denumire:'Trup 23 — Agrozootehnic', fn_dominanta:'ZF04', subzone_admise:[], fn_interzise:['ZF11.1','ZF11.2'] },
    'Trup 24': { denumire:'Trup 24 — Agrozootehnic', fn_dominanta:'ZF04', subzone_admise:[], fn_interzise:['ZF11.1','ZF11.2'] },

    // ── ZF05 — Echipare Tehnico-Edilitara ────────────────────────────────
    '48':      { denumire:'UTR 48 — Echipare Tehnico-Edilitară', fn_dominanta:'ZF05', subzone_admise:[], fn_interzise:['ZF11.1','ZF11.2','ZF12.1','ZF12.2'] },
    'Trup 6':  { denumire:'Trup 6 — Echipare Tehnico-Edilitară', fn_dominanta:'ZF05', subzone_admise:[], fn_interzise:['ZF11.1','ZF11.2'] },
    'Trup 17': { denumire:'Trup 17 — Activitati Productive', fn_dominanta:'ZF12.1', subzone_admise:['ZF10.1'], fn_interzise:['ZF11.1','ZF11.2'] },
    'Trup 18': { denumire:'Trup 18 — Agrement/Loisir', fn_dominanta:'ZF08.4', subzone_admise:['ZF14.1'], fn_interzise:['ZF12.1','ZF12.2'] },
    'Trup 19': { denumire:'Trup 19 — Agrement/Loisir', fn_dominanta:'ZF08.4', subzone_admise:['ZF14.1'], fn_interzise:['ZF12.1','ZF12.2'] },
    'Trup 20': { denumire:'Trup 20 — Statie Transformare LEA', fn_dominanta:'ZF05', subzone_admise:[], fn_interzise:['ZF11.1','ZF11.2','ZF12.1','ZF12.2'] },
  };
};

// Apply immediately if already loaded, or wait for fetch
if (window._PUG_REGULI['RO-GL-01'] && window._PUG_REGULI['RO-GL-01'].subzone) {
  _inject(window._PUG_REGULI['RO-GL-01']);
} else {
  // Will be injected after reguli.json is fetched via _loadReguli
  var _orig = window._PUG_REGULI['RO-GL-01'];
  Object.defineProperty(window._PUG_REGULI, 'RO-GL-01', {
    set: function(v) { _orig = v; if (v && v.subzone) _inject(v); },
    get: function() { return _orig; },
    configurable: true
  });
}

console.log('[rlu-galati] v1.0 — UTRs Galati injectate');
})();
