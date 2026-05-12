// ═══════════════════════════════════════════════════════════════════════════
// PUG_REGISTRY — Registrul Central de Date Urbanistice per UAT
// UrbanX TSS·FG | v1.0
//
// ARHITECTURĂ: Fișier de DATE pur. Nu conține logică.
//
// ADĂUGARE UAT NOU:
//   PUG_REGISTRY.register('cluj', { meta, udre, uxl });
//   → UDRE + UXL detectează automat și folosesc datele reale.
//   → Fără modificări în niciun engine.
//
// CHEI: lowercase, fără diacritice, primul cuvânt din nume
//   'Iași' → 'iasi' | 'Cluj-Napoca' → 'cluj' | 'Timișoara' → 'timisoara'
// ═══════════════════════════════════════════════════════════════════════════

window.PUG_REGISTRY = {

  // ── API Publică ───────────────────────────────────────────────────────────

  /**
   * Înregistrează date PUG/UXL pentru un UAT.
   * Apelat din acest fișier (pentru Iași) sau din fișiere separate per UAT.
   *
   * @param {string} cityKey  - cheie normalizată (ex: 'iasi', 'cluj')
   * @param {object} data     - { meta, udre, uxl }
   */
  register(cityKey, data) {
    const key = this._normalize(cityKey);
    this._data[key] = {
      ...data,
      _registeredAt: new Date().toISOString(),
      _hasRealData: true,
    };
    console.log(`[PUG_REGISTRY] ✅ Înregistrat: ${key} (${data.meta?.pugVersion || 'fără versiune'})`);
  },

  /**
   * Returnează datele PUG pentru un UAT sau null dacă nu există.
   * Acceptă cityKey sau cityData (name, judet, siruta).
   */
  get(cityKey, cityData) {
    // Încearcă după cheie directă
    const key = this._normalize(cityKey || '');
    if (this._data[key]) return this._data[key];

    // Încearcă după numele orașului din cityData
    if (cityData?.name) {
      const nameKey = this._normalize(cityData.name);
      if (this._data[nameKey]) return this._data[nameKey];
    }

    // Încearcă după SIRUTA (pentru chei tip 'RO-IS-95014')
    if (cityKey && cityKey.includes('-')) {
      const siruta = cityKey.split('-').pop();
      const found = Object.values(this._data).find(d => d.meta?.siruta === siruta);
      if (found) return found;
    }

    return null; // → engines folosesc fallback algoritmic
  },

  /** True dacă UAT-ul are date PUG reale înregistrate */
  has(cityKey, cityData) {
    return this.get(cityKey, cityData) !== null;
  },

  /** Normalizare cheie: 'Iași' → 'iasi', 'Cluj-Napoca' → 'cluj' */
  _normalize(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .split(/[-\s]/)[0]
      .replace(/[^a-z0-9]/g, '');
  },

  /** Listează toate UAT-urile cu date reale */
  list() {
    return Object.keys(this._data).map(k => ({
      key: k,
      name: this._data[k].meta?.name,
      judet: this._data[k].meta?.judet,
      pugVersion: this._data[k].meta?.pugVersion,
      completitudine: this._completitudine(this._data[k]),
    }));
  },

  _completitudine(d) {
    let score = 0;
    if (d.udre?.zones && Object.keys(d.udre.zones).length > 0) score += 25;
    if (d.uxl?.verde?.mp_loc_accesibil) score += 25;
    if (d.uxl?.walkability?.scor_mediu) score += 25;
    if (d.uxl?.heat?.uhi_mediu) score += 25;
    return score + '%';
  },

  // ── Store intern ──────────────────────────────────────────────────────────
  _data: {},
};


// ════════════════════════════════════════════════════════════════════════════
// IAȘI — DATE REALE COMPLETE
// Sursă: PUG Iași aprobat HCL 425/2018 + RLU + PMUD 2022 + INS 2023 + ANM
// ════════════════════════════════════════════════════════════════════════════
PUG_REGISTRY.register('iasi', {

  meta: {
    name: 'Iași',
    judet: 'IS',
    siruta: '95014',
    pugVersion: 'PUG Iași 2018 (HCL 425/2018)',
    pugStatus: 'aprobat',          // 'aprobat' | 'in_revizuire' | 'expirat'
    rluVersion: 'RLU Iași 2018',
    pmud: 'PMUD Iași 2022',
    surse: ['PUG 2018 HCL 425/2018', 'RLU Iași 2018', 'PMUD Iași 2022',
            'INS TEMPO 2023', 'ANM 2024', 'WHO Green Space Atlas EU',
            'INFP P100-1/2022', 'IPCC AR6'],
    dataCompletare: '2026-05-12',
    completatDe: 'TSS·FG',
  },

  // ── UDRE — Reguli Urbanistice per Zonă ────────────────────────────────────
  // Mapate direct pe ID-urile din TCI._REAL_ZONES['iasi']
  udre: {
    seismicAg: 0.35,   // P100-1/2022 zona IS — ag=0.35g (E/F)

    zones: {
      'SR': {
        utrCode: 'IS-3',
        utrName: 'Instituții și Servicii — Pol Medical',
        pot: 55, cut: 2.5, hMaxFloors: 12, hMaxM: 38,
        retragereStrada: 6, retragereVecin: 4,
        tip: 'institutii-servicii', tipLabel: 'Instituții + Servicii Medicale',
        mixFunc: ['medical-spital','ambulatoriu','rezidential-conexe','servicii-suport'],
        profilStradal: 'Stradă principală 20m + trotuar 4m + zonă verde 3m · Acces urgențe separat',
        parcelMin: 2000, parcelTip: 5000,
        obs: 'PUZ Spital Regional IS — destinație specială · €580M proiect în derulare',
        sursa: 'PUG Iași 2018 UTR IS-3 + PUZ Spital Regional 2022',
      },
      'CR': {
        utrCode: 'L4a-Co',
        utrName: 'Locuințe Colective Mari — Copou',
        pot: 50, cut: 3.0, hMaxFloors: 10, hMaxM: 32,
        retragereStrada: 5, retragereVecin: 3,
        tip: 'rezidential-colectiv-mare', tipLabel: 'Rezidențial Colectiv P+8 → P+10',
        mixFunc: ['rezidential-colectiv','servicii-parter','spatii-verzi-private'],
        profilStradal: 'Stradă colectoare 16m · Trotuar 3m · Aliniat la stradă',
        parcelMin: 1200, parcelTip: 2500,
        obs: 'Copou — coordonare cu UTR V-Co (verde Copou)',
        sursa: 'PUG Iași 2018 UTR L4a zona Copou',
      },
      'CG': {
        utrCode: 'L3a-Co',
        utrName: 'Locuințe Colective Medii — Copou-Breazu',
        pot: 45, cut: 2.4, hMaxFloors: 8, hMaxM: 26,
        retragereStrada: 5, retragereVecin: 4,
        tip: 'rezidential-colectiv-mediu', tipLabel: 'Rezidențial Colectiv P+5 → P+8',
        mixFunc: ['rezidential-colectiv','comercial-parter-limitat'],
        profilStradal: 'Stradă locală 12m · Trotuar 2.5m · Verde față 3m',
        parcelMin: 800, parcelTip: 1800,
        obs: 'Breazu — versanți — evaluare stabilitate geologică obligatorie',
        sursa: 'PUG Iași 2018 UTR L3a zona Copou-Breazu',
      },
      'DK': {
        utrCode: 'M2-DK (PUZ)',
        utrName: 'Mixt Funcțional Dancu — extravilan PUZ aprobat',
        pot: 50, cut: 2.0, hMaxFloors: 6, hMaxM: 20,
        retragereStrada: 5, retragereVecin: 4,
        tip: 'mixt-rezidential-comercial', tipLabel: 'Mixt Rezidențial+Comercial P+3 → P+6',
        mixFunc: ['rezidential-colectiv','comercial-servicii','birou','logistica-mica'],
        profilStradal: 'Bulevard nou 22m · Piste biciclete 2×1.5m · Trotuar 4m · Aliniament arbori',
        parcelMin: 600, parcelTip: 1500,
        obs: 'Extravilan introdus în intravilan prin PUZ Dancu aprobat CL Iași · Rețele noi obligatorii',
        sursa: 'PUZ Dancu aprobat 2019 + PUG Iași 2018 UTR M2',
      },
      'CV': {
        utrCode: 'CM',
        utrName: 'Centru Mixt — Zona Centrală Iași',
        pot: 75, cut: 4.0, hMaxFloors: 12, hMaxM: 40,
        retragereStrada: 3, retragereVecin: 2,
        tip: 'centru-mixt', tipLabel: 'Centru Mixt Dens P+8 → P+12',
        mixFunc: ['comercial-parter','birouri','rezidential-superior','cultural','servicii-publice','turism'],
        profilStradal: 'Stradă principală 20m+ · Spații publice · Front construit continuu',
        parcelMin: 400, parcelTip: 1200,
        obs: 'UTR CM — regim maxim condiționat de studiu de urbanism agreat CL',
        sursa: 'PUG Iași 2018 UTR CM · RLU Cap. III',
      },
      'CEV': {
        utrCode: 'M1-BD',
        utrName: 'Coridor Mixt Bulevardar Est-Vest',
        pot: 65, cut: 3.0, hMaxFloors: 7, hMaxM: 24,
        retragereStrada: 4, retragereVecin: 3,
        tip: 'coridor-bulevardar', tipLabel: 'Coridor Mixt Bulevardar P+4 → P+7',
        mixFunc: ['comercial-parter-obligatoriu','birouri','rezidential-etaje-superioare'],
        profilStradal: 'Bd. Independenței 32m · Arcadă comercială parter obligatorie · Retragere 4m',
        parcelMin: 500, parcelTip: 1000,
        obs: 'Front continuu comercial parter obligatoriu conform RLU',
        sursa: 'PUG Iași 2018 UTR M1 zona Bd. Independenței',
      },
      'RI': {
        utrCode: 'ID→M2',
        utrName: 'Reconversie Industrială Nicolina → Mixt Funcțional',
        pot: 60, cut: 2.8, hMaxFloors: 8, hMaxM: 28,
        retragereStrada: 6, retragereVecin: 5,
        tip: 'reconversie-industriala', tipLabel: 'Reconversie Ind. → Mixt P+5 → P+8',
        mixFunc: ['mixt-functional','spatii-creative','rezidential-colectiv','comercial','logistica-reziduala'],
        profilStradal: 'Stradă nouă 16m + piste + trotuar 3m · Foste drumuri industriale reprofilate',
        parcelMin: 1000, parcelTip: 3000,
        obs: 'Evaluare terenuri contaminate obligatorie · Decontaminare prealabilă',
        sursa: 'PUG Iași 2018 UTR ID → PUZ Reconversie Nicolina (propus)',
        reconversie: true, decontaminare: true,
      },
      'RS': {
        utrCode: 'L2a-S',
        utrName: 'Locuințe Colective Mici — Zona Sud',
        pot: 40, cut: 1.8, hMaxFloors: 5, hMaxM: 18,
        retragereStrada: 6, retragereVecin: 5,
        tip: 'rezidential-colectiv-mic', tipLabel: 'Rezidențial Colectiv P+3 → P+5',
        mixFunc: ['rezidential-colectiv','servicii-de-proximitate'],
        profilStradal: 'Stradă locală 10-12m · Trotuar 2m · Retragere față 4m',
        parcelMin: 600, parcelTip: 1200,
        obs: 'Reabilitare + supraetajare fond existent · Racordare rețele conform normative',
        sursa: 'PUG Iași 2018 UTR L2a zona Sud',
      },
    },
  },

  // ── UXL — Calitate Spațiu Urban ───────────────────────────────────────────
  uxl: {

    verde: {
      // Sursa: INS 2023, WHO Green Space Atlas EU 2023, PMUD Iași 2022
      parcuriMajore: [
        { name:'Parcul Copou (incl. Teiul lui Eminescu)', ha:15.4, distCentruKm:1.8,
          tip:'parc-istoric', accesibil:true,
          note:'Parc emblematic · Arbori monumentali declarați monument' },
        { name:'Parcul Expoziției / zona Palas', ha:8.2, distCentruKm:1.2,
          tip:'parc-urban', accesibil:true,
          note:'Parțial privat (Palas Mall) · Cel mai frecventat per capita' },
        { name:'Grădina Botanică „Anastasie Fătu"', ha:83.0, distCentruKm:2.8,
          tip:'rezervatie-botanica', accesibil:true, accesLimitat:true,
          note:'Program limitat · Nu contorizat OMS ca parc urban integral · UMF Iași' },
        { name:'Parcul Ciric', ha:145.0, distCentruKm:4.5,
          tip:'padure-urbana', accesibil:true, accesLimitat:true,
          note:'Greu accesibil fără mașină · Lipsă TP direct · Iaz Ciric' },
        { name:'Parcul Eminescu (Copou)', ha:3.2, distCentruKm:2.1,
          tip:'parc-mic', accesibil:true,
          note:'Campus universitar · Frecventat de studenți' },
        { name:'Scuaruri + fâșii verzi + grădini de bloc', ha:22.0, distCentruKm:1.5,
          tip:'spatii-verzi-mici', accesibil:true,
          note:'Distribuit inegal — absent CUG/Tătărași/Metalurgie' },
      ],
      // Verde accesibil = ≤500m pietonali rezonabili (fără Ciric și Botanică)
      haAccesibil: 26.0,
      haTotal: 277.0,
      populatie: 350000,
      mp_loc_accesibil: 7.4,    // 26ha × 10.000m² ÷ 350.000 loc
      mp_loc_total: 79.1,
      target_OMS_min: 9.0,      // WHO 2016 standard minim
      target_OMS_ideal: 26.0,
      target_UE_mediu: 16.5,    // medie UE27
      distributie_nota: 'Copou/Centru: 12+ mp/loc · CUG/Tătărași: <2 mp/loc · Metalurgie: <1 mp/loc',
      tinta_2035: 12.0,
      actiuni_prioritare: [
        'Pocket parks (≥0.5ha) în CUG și Tătărași — deficit sever',
        'Aliniament arbori pe toate bulevardele principale (1 arbore/8m)',
        'Verde obligatoriu ≥30% suprafață în toate PUZ-urile noi',
        'Parc liniar Nicolina — 20% din suprafața reconvertită',
        'Acoperișuri verzi obligatorii clădiri noi CUT>2.5',
      ],
    },

    walkability: {
      // Sursa: PMUD Iași 2022 · Pedestrian Level of Service · OSM
      // Metodologie: trotuare (25%) + servicii ≤500m (25%) + TP ≤400m (20%) + mix (15%) + siguranță (15%)
      scor_mediu: 51,
      benchmark_ue_similar: 65,
      cartiere: {
        'Centru Civic / Palas / Piața Unirii': {
          scor: 84, pop: 28000,
          descriere: 'Densitate maximă servicii, trotuare renovate, TP frecvent, mix complet',
          puncte_slabe: 'Trafic intens Bd. Independenței, lipsă benzi biciclete pe artere',
        },
        'Copou / Campus Universitar': {
          scor: 69, pop: 42000,
          descriere: 'Accesibilitate pietonală bună, trotuare ok, verdeață, universități',
          puncte_slabe: 'Pantă abruptă spre centru, trafic DN28, lipsă piste biciclete',
        },
        'Păcurari / Tudor Vladimirescu': {
          scor: 61, pop: 38000,
          descriere: 'Mix rezidential-comercial, servicii de proximitate, TP ok',
          puncte_slabe: 'Trotuare degradate pe străzile secundare, intersecții periculoase',
        },
        'Tătărași / Mircea cel Bătrân': {
          scor: 52, pop: 55000,
          descriere: 'Fond rezidential mare, TP frecvent (tramvai), piețe locale',
          puncte_slabe: 'Trotuare degradate, parcări invadează trotuarele, verde deficit sever',
        },
        'CUG / Lunca Cetățuii': {
          scor: 37, pop: 31000,
          descriere: 'Conexiune tramvai la centru, câteva servicii de cartier',
          puncte_slabe: 'Monofuncțional, distanțe mari, fără piste biciclete',
        },
        'Metalurgie / Vest': {
          scor: 28, pop: 18000,
          descriere: 'Câteva servicii de bază',
          puncte_slabe: 'Industrial, trotuare absente 60% din străzi, fără TP frecvent',
        },
        'Dancu / Greenpark / Himson': {
          scor: 22, pop: 12000,
          descriere: 'Cartier nou, câteva servicii în ansambluri',
          puncte_slabe: 'Zero infrastructură pietonală publică, zero TP, 100% dependență auto',
        },
        'Periurban Est (Holboca, Aroneanu)': {
          scor: 16, pop: 17000,
          descriere: 'Oarecare activitate locală',
          puncte_slabe: 'Rural, zero trotuare, zero TP, periurbanizare neplanificată',
        },
      },
      actiuni_prioritare: [
        'Piste biciclete 45km: Bd. Independenței, Șos. Nicolina, Cal. Chișinăului',
        'Reabilitare trotuare Tătărași — 8km prioritar, cost ~3M€',
        'TP rapid spre Dancu — extensie tramvai sau BRT Bd. Socola',
        'Pedestrianizare Str. Lăpușneanu complet (Palas → Palatul Culturii)',
        'Parklets și mobilier urban pe toate bulevardele principale',
      ],
    },

    heat: {
      // Sursa: ANM date termice 2010-2024 · Copernicus LST 2023 · IPCC AR6 RCP8.5
      temp_medie_vara_2024: 23.4,
      uhi_mediu: 2.1,
      zile_canicula_2024: 28,
      zile_canicula_2055: 52,    // per IPCC AR6 RCP8.5 + trend actual
      hotspots: [
        { zona:'Tătărași / Mircea cel Bătrân',    uhi:3.4, pop_expusa:55000,
          cauza:'Densitate maximă, asfalt, lipsa verde, clădiri P+8-P+10', risc:'critic' },
        { zona:'Metalurgie / Nicolina Industrial', uhi:2.9, pop_expusa:18000,
          cauza:'Suprafețe impermeabile industriale, hale, zero vegetație', risc:'ridicat' },
        { zona:'Centru Civic / zonă comercială',  uhi:2.5, pop_expusa:28000,
          cauza:'Trafic intens, pavaje reflectante, densitate maximă', risc:'ridicat' },
        { zona:'Gara Iași / Depou CFR',           uhi:2.2, pop_expusa:8000,
          cauza:'Infrastructură feroviară, asfalt', risc:'mediu' },
        { zona:'Copou / Campus',                  uhi:0.5, pop_expusa:42000,
          cauza:'Vegetație densă, clădiri P+3 max, parcuri', risc:'scazut' },
        { zona:'Ciric / Periurban Nord',           uhi:0.2, pop_expusa:15000,
          cauza:'Pădure urbană, lacuri, zone verzi extinse', risc:'scazut' },
      ],
      alerta_2055: 'CRITIC — 52 zile caniculă/an 2055 (vs 28 în 2024) · Fără acțiune: 3.200 internări suplimentare/vară',
      solutii_prioritare: [
        'Fond arbori urban: +15.000 arbori maturi până 2030 (prioritar Tătărași+CUG)',
        'Pavaje permeabile și reflectante pentru toate reabilitările stradale post-2026',
        'Acoperișuri verzi/albe pentru clădiri publice — 50% din fond până 2035',
        'Coridoare de ventilație — păstrate prin reglementare în PUG revizuit',
      ],
    },

    socialInfra: {
      // Sursa: INS TEMPO EDU103A, SAN101A · Date 2023
      scoli: {
        nr_total: 108, standard_la: 5000, populatie: 350000,
        necesar: 70, surplus: 38,
        nota: 'Cantitativ suficient · Distribuție inegală: Dancu/Holboca neacoperite',
      },
      gradinite: {
        nr_total: 89, standard_la: 3500, populatie: 350000,
        necesar: 100, deficit: -11,
        nota: 'Deficit mic cantitativ + sever în Dancu, Holboca, Ciurea',
      },
      spitale: {
        nr: 11, paturi: 7200, paturi_la_1000_loc: 8.2,
        benchmark_ue: 5.5,
        nota: 'Supracapacitate istorică · IUGG (Spital Regional €580M) restructurează',
      },
      centre_seniori: {
        nr: 4, capacitate: 280,
        necesar_2055: 18,
        deficit_major: true,
        nota: 'PRIORITATE CRITICĂ — pop 65+ crește +82% până 2055 per TCI Housing Mix',
      },
      presiune_2030: 'Medie — +3% pop → +8 grădinițe + 2 centre seniori prioritar Dancu+periurban',
      presiune_2055: 'Ridicată — +15% pop + îmbătrânire → +24 grădinițe + 18 centre seniori + 3 ambulatorii',
    },

  }, // end uxl
}); // end register('iasi')


// ════════════════════════════════════════════════════════════════════════════
// TEMPLATE — CUM SE ADAUGĂ UN UAT NOU
// ════════════════════════════════════════════════════════════════════════════
//
// Copiați blocul de mai jos, completați cu date reale, decomentați.
// UDRE + UXL detectează automat și folosesc datele reale.
// Nu modificați niciun alt fișier.
//
// PUG_REGISTRY.register('cluj', {
//
//   meta: {
//     name: 'Cluj-Napoca',
//     judet: 'CJ', siruta: '54984',
//     pugVersion: 'PUG Cluj-Napoca 2014 + amendamente',
//     pugStatus: 'in_revizuire',
//     surse: ['PUG 2014', 'PUZ-uri aprobate', 'INS 2023', 'Primăria Cluj'],
//     dataCompletare: 'YYYY-MM-DD',
//   },
//
//   udre: {
//     seismicAg: 0.10,    // Cluj — zonă cu seismicitate scăzută
//     zones: {
//       'CV': {           // ID din TCI._REAL_ZONES['cluj']
//         utrCode: 'CU',  // cod UTR real din PUG
//         utrName: 'Centru Dens — Cluj-Napoca',
//         pot: 70, cut: 4.0, hMaxFloors: 14, hMaxM: 45,
//         retragereStrada: 3, retragereVecin: 2,
//         tip: 'centru-mixt', tipLabel: 'Centru Dens Urban',
//         mixFunc: ['comercial','birouri','rezidential','cultural'],
//         profilStradal: 'Stradă principală 22m · Front continuu',
//         parcelMin: 350, parcelTip: 1000,
//         obs: '',
//         sursa: 'PUG Cluj 2014 UTR CU',
//       },
//       'FLO': { ... },   // Florești
//       'BAC': { ... },   // Baciu
//     },
//   },
//
//   uxl: {
//     verde: {
//       haAccesibil: 45.0,   // ha verde accesibil
//       populatie: 320000,
//       mp_loc_accesibil: 14.1,
//       target_OMS_min: 9.0, target_OMS_ideal: 26.0, target_UE_mediu: 16.5,
//       distributie_nota: '...',
//       actiuni_prioritare: ['...'],
//     },
//     walkability: {
//       scor_mediu: 64, benchmark_ue_similar: 65,
//       cartiere: { 'Centru': { scor: 82, pop: 30000, descriere: '...', puncte_slabe: '...' } },
//       actiuni_prioritare: ['...'],
//     },
//     heat: {
//       uhi_mediu: 1.6, zile_canicula_2024: 18, zile_canicula_2055: 38,
//       hotspots: [{ zona:'...', uhi:2.1, pop_expusa:25000, cauza:'...', risc:'mediu' }],
//       alerta_2055: '...',
//     },
//     socialInfra: {
//       scoli: { nr_total: 95, standard_la: 5000, populatie: 320000, necesar: 64 },
//       gradinite: { nr_total: 80, standard_la: 3500, deficit: 12 },
//       spitale: { nr: 8, paturi: 5200, paturi_la_1000_loc: 7.1, benchmark_ue: 5.5 },
//       centre_seniori: { nr: 6, necesar_2055: 14, deficit_major: true },
//       presiune_2055: '...',
//     },
//   },
//
// });


// ── Status la load ─────────────────────────────────────────────────────────
const _registered = PUG_REGISTRY.list();
console.log(`[PUG_REGISTRY] ✅ Loaded — ${_registered.length} UAT(uri) cu date reale:`,
  _registered.map(u => `${u.key} (${u.completitudine})`).join(', '));
