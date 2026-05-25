/**
 * rlu-popricani.js — RLU Comuna Popricani, jud. Iași
 * Sursă: PUG Popricani, Proiect nr. 12/2011, SC TESS CONEX SA
 * Integrat în UrbanX: 2026-05-25
 */
(function () {
  'use strict';

  // ── Mapare sat → UTR-uri aplicabile ─────────────────────────────────────
  var SAT_UTR = {
    'popricani':          ['UTR-LI', 'UTR-CM', 'UTR-A1', 'UTR-G1', 'UTR-P1'],
    'moimești':           ['UTR-LI', 'UTR-LV1', 'UTR-CM'],
    'țipilești':          ['UTR-LI', 'UTR-LV1'],
    'rediu mitropoliei':  ['UTR-LI', 'UTR-LV1', 'UTR-CPLI'],
    'cotu morii':         ['UTR-LI', 'UTR-LV1'],
    'vânători':           ['UTR-LI', 'UTR-LV1'],
    'vulturi':            ['UTR-LI', 'UTR-LV2'],
    'cârlig':             ['UTR-LI', 'UTR-LV1'],
    'cuza vodă':          ['UTR-LI', 'UTR-CM', 'UTR-CPLI'],
    'stăuceni':           ['UTR-LI', 'UTR-LV1'],
    'valea ursului':      ['UTR-LI', 'UTR-LV1'],
    'ursărești':          ['UTR-LI', 'UTR-LV1'],
  };

  // ── Culori per cod zonă funcțională ─────────────────────────────────────
  var UTR_COLORS = {
    'CM':    { fill: 'rgba(251,191,36,0.22)',  border: '#d4af37' },
    'CMV':   { fill: 'rgba(251,191,36,0.15)',  border: '#b8960c' },
    'LI':    { fill: 'rgba(255,230,140,0.22)', border: '#fbbf24' },
    'LV1':   { fill: 'rgba(255,215,100,0.20)', border: '#f59e0b' },
    'LV2':   { fill: 'rgba(255,200,80,0.18)',  border: '#d97706' },
    'LP1':   { fill: 'rgba(255,235,150,0.18)', border: '#fbbf24' },
    'LP2':   { fill: 'rgba(255,220,120,0.18)', border: '#f59e0b' },
    'A1':    { fill: 'rgba(163,230,53,0.22)',  border: '#84cc16' },
    'G1':    { fill: 'rgba(96,165,250,0.15)',  border: '#60a5fa' },
    'G2':    { fill: 'rgba(59,130,246,0.15)',  border: '#3b82f6' },
    'P1':    { fill: 'rgba(74,222,128,0.22)',  border: '#22c55e' },
    'P2':    { fill: 'rgba(34,197,94,0.20)',   border: '#16a34a' },
    'P3':    { fill: 'rgba(20,184,96,0.18)',   border: '#059669' },
    'P4':    { fill: 'rgba(52,211,153,0.18)',  border: '#10b981' },
    'CPCM':  { fill: 'rgba(251,146,60,0.20)',  border: '#f97316' },
    'CPLI':  { fill: 'rgba(253,186,116,0.20)', border: '#fb923c' },
    'CPLV1': { fill: 'rgba(252,165,165,0.18)', border: '#f87171' },
    'CPLV2': { fill: 'rgba(248,113,113,0.15)', border: '#ef4444' },
    'CPA1':  { fill: 'rgba(239,68,68,0.18)',   border: '#dc2626' },
    'TR':    { fill: 'rgba(148,163,184,0.15)', border: '#94a3b8' },
    'TF':    { fill: 'rgba(100,116,139,0.15)', border: '#64748b' },
  };

  // ── Date complete per UTR ─────────────────────────────────────────────────
  var UTR_DATA = {

    'UTR-CM': {
      id: 'UTR-CM', cod: 'CM',
      tip: 'Zona Funcțiunilor Mixte',
      descriere: 'Clădiri individuale în general publice, regim mic de înălțime, construire discontinuă. Instituții, servicii, comerț, hoteluri, activități manufacturiere nepoluante.',
      pot: 50, cut: 1.50,
      hmax: '9.00 m (max. P+2)',
      regim: 'P, P+1E, P+2E',
      retrageri: 'Față: min. 5 m; Lateral: H/2, min. 3 m; Spate: H/2, min. 5 m',
      parcela: 'Min. 500 mp, front min. 12 m',
      utilizari_admise: 'Instituții publice, servicii, comerț cu amănuntul, hoteluri, pensiuni, restaurante, lăcașuri de cult, activități manufacturiere nepoluante, recreere, sport',
      utilizari_interzise: 'Activități productive poluante, construcții provizorii, creșterea animalelor, depozitare en-gros, stații de betoane',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona CM'
    },

    'UTR-CMV': {
      id: 'UTR-CMV', cod: 'CMV',
      tip: 'Zona Funcțiunilor Mixte pe Versanți',
      descriere: 'Funcțiuni mixte situate în zone de versanți. Studii geotehnice verificate Af obligatorii pentru toate lucrările.',
      pot: 30, cut: 0.60,
      hmax: '6.00 m (max. P+1)',
      regim: 'P, P+1E',
      retrageri: 'Față: min. 5 m; Lateral: H/2, min. 3 m; Spate: H/2, min. 5 m',
      parcela: 'Min. 500 mp, front min. 12 m',
      utilizari_admise: 'Instituții publice, servicii, comerț, activități manufacturiere nepoluante',
      utilizari_interzise: 'Activități productive poluante, construcții provizorii, depozitare en-gros',
      nota: '⚠️ Studii geotehnice și de stabilitate verificate Af obligatorii',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona CMV'
    },

    'UTR-LI': {
      id: 'UTR-LI', cod: 'LI',
      tip: 'Zona Locuințe și Funcțiuni Complementare',
      descriere: 'Locuințe individuale mici, regim de construire izolat, cuplat sau înșiruit. Zona rezidențială predominantă în toate satele comunei.',
      pot: 30, cut: 0.90,
      hmax: '9.00 m (max. P+2)',
      regim: 'P, P+1E, P+2E',
      retrageri: 'Față: min. 5 m; Lateral: H/2, min. 3 m; Spate: H/2, min. 5 m',
      parcela: 'Izolat/cuplat: min. 350 mp, front 12 m; Înșiruit: min. 150 mp, front 6 m',
      utilizari_admise: 'Locuințe individuale și colective mici, anexe gospodărești, garaje, conversie parter în spații comerciale (max. 100 mp ADC), pensiuni agroturistice',
      utilizari_interzise: 'Funcțiuni productive poluante, stații de betoane, depozitare substanțe inflamabile/toxice, creșterea animalelor pentru producție (peste 5 capete)',
      nota: 'Mansardare: CUT se calculează cu +60% din aria ultimului nivel construit',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona LI'
    },

    'UTR-LV1': {
      id: 'UTR-LV1', cod: 'LV1',
      tip: 'Zona Locuințe pe Versanți — Densitate Normală',
      descriere: 'Locuințe individuale mici situate în zone de versanți, regim izolat, realizabile pe baza studiilor geotehnice verificate Af.',
      pot: 30, cut: 0.60,
      hmax: '6.00 m (max. P+1)',
      regim: 'P, P+1E',
      retrageri: 'Față: min. 5 m; Lateral: H/2, min. 3 m; Spate: H/2, min. 5 m',
      parcela: 'Min. 350 mp, front min. 12 m',
      utilizari_admise: 'Locuințe individuale în regim izolat, anexe gospodărești, garaje, pensiuni agroturistice',
      utilizari_interzise: 'Funcțiuni productive poluante, stații de betoane, depozitare substanțe inflamabile/toxice',
      nota: '⚠️ Studii geotehnice și de stabilitate verificate Af obligatorii',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona LV1'
    },

    'UTR-LV2': {
      id: 'UTR-LV2', cod: 'LV2',
      tip: 'Zona Locuințe pe Versanți — Densitate Redusă',
      descriere: 'Locuințe individuale în condiții de densitate foarte redusă, realizabile punctual pe baza studiilor geotehnice verificate Af.',
      pot: 15, cut: 0.30,
      hmax: '6.00 m (max. P+1)',
      regim: 'P, P+1E',
      retrageri: 'Față: min. 5 m; Lateral: H/2, min. 3 m; Spate: H/2, min. 5 m',
      parcela: 'Min. 350 mp, front min. 12 m',
      utilizari_admise: 'Locuințe individuale izolate, pensiuni agroturistice',
      utilizari_interzise: 'Orice construcție fără studii geotehnice, funcțiuni productive poluante',
      nota: '⚠️ Studii geotehnice verificate Af obligatorii. Autorizare punctuală.',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona LV2'
    },

    'UTR-A1': {
      id: 'UTR-A1', cod: 'A1',
      tip: 'Zona Activităților Productive și Funcțiunilor Economice Mixte',
      descriere: 'Activități productive nepoluante, depozitare, servicii, comerț, activități agro-industriale. Mare flexibilitate în acceptarea funcțiunilor cu profil economic.',
      pot: 50, cut: 0.60,
      hmax: 'Nelimitată (conform specificului construcției)',
      regim: 'Conform necesități funcționale',
      retrageri: 'Față: min. 6 m; Lateral: H/2, min. 6 m; Spate: min. 6 m',
      parcela: 'Min. 500 mp, front min. 20 m',
      utilizari_admise: 'Activități productive nepoluante, activități agro-industriale, comerț en-gros și en-detail, alimentație publică, diverse servicii, depozitare și distribuție, sedii de firme/birouri, stații de benzină, locuințe de serviciu pentru pază/conducere',
      utilizari_interzise: 'Unități de învățământ și servicii de interes general, activități poluante cu risc tehnologic, locuințe permanente',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona A1'
    },

    'UTR-G1': {
      id: 'UTR-G1', cod: 'G1',
      tip: 'Zona Gospodărie Comunală — Cimitire Active',
      descriere: 'Subzona cimitirelor active. Distanța minimă de protecție sanitară față de zonele locuibile: 50 m.',
      pot_special: '1% construcții + 15% circulații + 5% plantații',
      cut: 0.15,
      hmax: '3.00 m (excepție: instalații, coșuri, turle capele)',
      regim: 'Construcții accesorii',
      retrageri: 'Față: min. 5 m; Față de limite parcele: H/2, min. 6 m',
      utilizari_admise: 'Cimitire, capele mortuare, mausoleu-osuar, spații administrație, circulații pietonale și carosabile, plantații',
      utilizari_interzise: 'Densificarea cimitirelor prin ocuparea aleilor, locuințe la mai puțin de 50 m de cimitir',
      nota: '⚠️ Distanță minimă de protecție sanitară față de zone locuibile: 50 m',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona G1'
    },

    'UTR-G2': {
      id: 'UTR-G2', cod: 'G2',
      tip: 'Zona Gospodărie Comunală — Construcții Tehnice',
      descriere: 'Construcții și amenajări pentru gospodărie comunală: alimentare cu apă, canalizare, energie electrică, gaz, salubritate.',
      pot: 50, cut: 0.50,
      hmax: '3.00 m (excepție: instalații tehnice)',
      regim: 'Construcții tehnice',
      retrageri: 'Față: min. 5 m; Față de limite parcele: H/2, min. 6 m',
      utilizari_admise: 'Birouri autonome, incinte tehnice (apă, canalizare, energie electrică, gaz, salubritate)',
      utilizari_interzise: 'Activități cu risc tehnologic în zone rezidențiale, activități poluante',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona G2'
    },

    'UTR-P1': {
      id: 'UTR-P1', cod: 'P1',
      tip: 'Zona Spații Verzi — Parcuri și Spații Plantate Publice',
      descriere: 'Parcuri publice, scuaruri, grădini cu acces nelimitat. Construcțiile (expoziții, alimentație publică, etc.) nu pot depăși 15% din suprafața totală.',
      pot: 15, cut: 0.20,
      hmax: 'P+M (excepție: instalații)',
      regim: 'Construcții accesorii parc',
      retrageri: 'Față: min. 5 m; Lateral și spate: min. 5 m',
      utilizari_admise: 'Spații plantate, parcuri, scuaruri, spații de joacă, circulații pietonale și pentru bicicliști, construcții culturale/sportive/alimentație publică max 15% din suprafață',
      utilizari_interzise: 'Construcții care limitează libera circulație, tăierea arborilor fără autorizație',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona P1'
    },

    'UTR-P2': {
      id: 'UTR-P2', cod: 'P2',
      tip: 'Zona Spații Verzi — Amenajări Sportive',
      descriere: 'Construcții și amenajări pentru practicarea sportului, facilități pentru sportivi și spectatori.',
      pot: 50, cut: 0.60,
      hmax: 'Nelimitată (conform specificului)',
      regim: 'Conform necesități sportive',
      retrageri: 'Față: min. 5 m; Lateral și spate: min. 5 m',
      utilizari_admise: 'Construcții și amenajări sportive acoperite și descoperite, facilități pentru sportivi și spectatori',
      utilizari_interzise: 'Construcții incompatibile cu funcțiunea sportivă',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona P2'
    },

    'UTR-P3': {
      id: 'UTR-P3', cod: 'P3',
      tip: 'Zona Spații Verzi — Protecție Versanți și Cursuri de Apă',
      descriere: 'Spații plantate pentru protecția versanților și a cursurilor de apă. Conform studiilor de specialitate avizate.',
      utilizari_admise: 'Spații plantate, circulații pietonale ocazional carosabile pentru întreținere, mobilier urban',
      utilizari_interzise: 'Amenajări care atrag locuitorii în spațiile de protecție față de infrastructura tehnică',
      nota: 'Conform studiilor de specialitate avizate conform legii',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona P3'
    },

    'UTR-CPCM': {
      id: 'UTR-CPCM', cod: 'CPCM',
      tip: 'Protecție Situri Arheologice — Funcțiuni Mixte',
      descriere: 'Funcțiuni mixte situate în interiorul perimetrelor de protecție a siturilor arheologice. Aviz obligatoriu Ministerul Culturii.',
      pot: 50, cut: 1.50,
      hmax: '12.00 m (max. P+2)',
      regim: 'P+2',
      retrageri: 'Față: min. 5 m; Lateral: H/2, min. 3 m; Spate: H/2, min. 5 m',
      parcela: 'Min. 500 mp, front min. 12 m',
      utilizari_admise: 'Instituții publice, servicii, comerț, lăcașuri de cult, activități manufacturiere nepoluante',
      utilizari_interzise: 'Activități productive poluante, construcții provizorii',
      nota: '⚠️ Construirea permisă DOAR cu avizul Ministerului Culturii, Cultelor și Patrimoniului Național Iași',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona CP-CPCM'
    },

    'UTR-CPLI': {
      id: 'UTR-CPLI', cod: 'CPLI',
      tip: 'Protecție Situri Arheologice — Locuințe Individuale',
      descriere: 'Locuințe individuale mici situate în zona de protecție a siturilor arheologice. Aviz obligatoriu Ministerul Culturii.',
      pot: 30, cut: 0.90,
      hmax: '9.00 m (max. P+2)',
      regim: 'P, P+1E, P+2E',
      retrageri: 'Față: min. 5 m; Lateral: H/2, min. 3 m; Spate: H/2, min. 5 m',
      parcela: 'Min. 350 mp, front min. 12 m',
      utilizari_admise: 'Locuințe individuale, anexe gospodărești, garaje, pensiuni agroturistice',
      utilizari_interzise: 'Funcțiuni productive poluante, stații de betoane',
      nota: '⚠️ Construirea permisă DOAR cu avizul Ministerului Culturii. Studii geotehnice obligatorii.',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona CP-CPLI'
    },

    'UTR-CPA1': {
      id: 'UTR-CPA1', cod: 'CPA1',
      tip: 'Protecție Situri Arheologice — Activități Productive',
      descriere: 'Activități productive, depozitare, servicii, comerț agro-industrial în zona de protecție a siturilor arheologice.',
      pot: 50, cut: 0.60,
      hmax: 'Nelimitată (conform specificului)',
      regim: 'Conform necesități funcționale',
      retrageri: 'Față: min. 6 m; Lateral: H/2, min. 6 m; Spate: min. 6 m',
      parcela: 'Min. 500 mp, front min. 20 m',
      utilizari_admise: 'Activități productive nepoluante, activități agro-industriale, comerț, servicii diverse, depozitare și distribuție',
      utilizari_interzise: 'Unități de învățământ, activități poluante, locuințe permanente',
      nota: '⚠️ Construirea permisă DOAR cu avizul Ministerului Culturii, Cultelor și Patrimoniului Național Iași',
      sursa: 'RLU Popricani 2011 — Cap. IV, zona CP-CPA1'
    },

  };

  // ── Export în window._RLU ────────────────────────────────────────────────
  window._RLU = window._RLU || {};
  window._RLU['RO-IS-95424'] = {
    uat:      'Comuna Popricani',
    judet:    'Iași',
    siruta:   'RO-IS-95424',
    sursa:    'PUG Popricani — Proiect nr. 12/2011, SC TESS CONEX SA',
    satUtr:   SAT_UTR,
    culori:   UTR_COLORS,
    utrData:  UTR_DATA,
    localitati: [
      'Popricani', 'Moimești', 'Țipilești', 'Rediu Mitropoliei',
      'Cotu Morii', 'Vânători', 'Vulturi', 'Cârlig',
      'Cuza Vodă', 'Stăuceni', 'Valea Ursului', 'Ursărești'
    ]
  };

  console.log('[UrbanX] RLU Popricani (RO-IS-95424) încărcat —',
    Object.keys(UTR_DATA).length, 'UTR-uri definite');

})();
