// ═══════════════════════════════════════════════════════════════════════════
// RLU Municipiul Galați — Regulament Local de Urbanism
// Sursa: PUG Municipiul Galați 2024, Etapa II.2
//        Proiectant: UAUIM CCPEC + Urban Team + Oppidum Studio + Fida Solutions
//        Contract 17544/27.01.2023 — Revizia 05 — Decembrie 2025
// UrbanX TSS·FG | v1.0 | 2026-06-05
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  if (!window.RLU_REGISTRY) window.RLU_REGISTRY = {};

  window.RLU_REGISTRY['galati'] = {

    meta: {
      name: 'Municipiul Galați',
      judet: 'GL',
      siruta: '79810',
      rluVersion: 'RLU PUG Galați 2024 — Revizia 05 / Decembrie 2025',
      rluStatus: 'în avizare',
      elaborator: 'UAUIM CCPEC + Urban Team SRL + Oppidum Studio SRL + Fida Solutions SRL',
      contract: '17544/27.01.2023',
      surse: ['RLU PUG Galați REV05 Dec.2025', 'Etapa II.2 Format GIS'],
      dataCompletare: '2026-06-05',
      completatDe: 'TSS·FG',
      seismic: { ag: 0.35, Tc: 1.6, zona: 'B' },
      nota: 'PUG în procedură de avizare. Valorile sunt din REV05/Dec.2025 — verificați versiunea finală aprobată.',
    },

    zone: {

      // ── ZONE CONSTRUITE PROTEJATE ─────────────────────────────────────────
      'ZCP': {
        cod: 'ZCP', denumire: 'Zone Construite Protejate',
        culoare: '#7B2D8B',
        pot: null, cut: null, hMaxM: null,
        regim: 'conform PUZ-CP în vigoare',
        tip: 'patrimoniu-protejat',
        descriere: 'Zone construite protejate — se aplică prevederile PUZ-CP în vigoare pentru fiecare ZCP în parte (Domneasca-Bălcescu, Sf.Spiridon, Egalității, Precista, Portul Comercial, Elisabeta Doamna, Dornei, Barbosi, Cartier Dunărea etc.)',
        fn_complementare: [],
        fn_interzise: ['orice intervenție fără avizul Ministerului Culturii'],
        utrs: [],
        nota: 'Cuprinde 17 ZCP distincte. Regulamentul specific fiecărei ZCP e prevăzut în PUZ-CP aprobat.',
      },

      // ── ZONA CENTRALĂ ─────────────────────────────────────────────────────
      'ZF07': {
        cod: 'ZF07', denumire: 'Zona Centrală',
        culoare: '#C0392B',
        pot: 60, cut: 3.0, hMaxM: null, hMaxFloors: 8,
        regim: 'P+2÷P+8',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'centru-civic',
        descriere: 'Zona centrală situată în imediata vecinătate a zonei protejate — funcțiuni publice, comerciale, administrative, culturale și locuire colectivă',
        fn_complementare: ['locuințe colective', 'comerț', 'servicii', 'cultură', 'birouri', 'turism', 'hoteluri'],
        fn_interzise: ['industrie', 'depozitare', 'activități poluante', 'construcții provizorii'],
        utrs: [15],
        nota: 'POT locuințe individuale complementare: 45-60%; CUT locuințe individuale: 1.3',
      },

      // ── ZONE MIXTE ────────────────────────────────────────────────────────
      'ZF08.1': {
        cod: 'ZF08.1', denumire: 'Zona Mixtă Pol de Agrement — Servicii',
        culoare: '#E74C3C',
        pot: 70, cut: 4.2, hMaxM: 22.5, hMaxFloors: 5,
        regim: 'P+2÷P+5',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'mixt-agrement-servicii',
        descriere: 'Zone mixte cu funcțiuni de agrement, servicii și echipamente publice de importanță municipală — pol de agrement',
        fn_complementare: ['locuințe colective (POT40%, CUT2.0)', 'locuințe individuale (POT45%, CUT1.3)', 'parcaje', 'spații verzi', 'construcții cult'],
        fn_interzise: ['industrie poluantă', 'depozitare en-gros', 'construcții provizorii'],
        utrs: [],
      },

      'ZF08.2': {
        cod: 'ZF08.2', denumire: 'Zona Mixtă Poli Urbani Principali',
        culoare: '#E67E22',
        pot: 70, cut: 4.8, hMaxM: 19, hMaxFloors: 4,
        regim: 'P+2÷P+4',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'mixt-poli-principali',
        descriere: 'Zone mixte aferente polilor urbani principali — concentrare de funcțiuni comerciale, administrative, servicii și locuire colectivă',
        fn_complementare: ['locuințe colective (POT40%, CUT4.0)', 'locuințe individuale (POT45%, CUT1.3)', 'parcaje', 'spații verzi'],
        fn_interzise: ['industrie poluantă', 'depozitare en-gros'],
        utrs: [],
      },

      'ZF08.3': {
        cod: 'ZF08.3', denumire: 'Zona Mixtă Agrement Faleza Dunării',
        culoare: '#3498DB',
        pot: 45, cut: 1.5, hMaxM: 19, hMaxFloors: 4,
        regim: 'P÷P+4',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'mixt-agrement-faleza',
        descriere: 'Zona mixtă de agrement situată pe Faleza Dunării — turism, agrement, servicii de loisir și locuire de vacanță',
        fn_complementare: ['locuințe individuale (POT45%)', 'locuințe colective (POT30%)', 'sport și agrement (POT50%)', 'cult', 'învățământ'],
        fn_interzise: ['industrie', 'depozitare', 'activități poluante'],
        utrs: [],
        nota: 'Zona supusă reglementărilor specifice privind Faleza Dunării',
      },

      'ZF08.4': {
        cod: 'ZF08.4', denumire: 'Zona Mixtă Agrement / Loisir',
        culoare: '#2980B9',
        pot: 50, cut: 2.0, hMaxM: 15.5, hMaxFloors: 3,
        regim: 'P+1÷P+3',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'mixt-agrement-loisir',
        descriere: 'Zona mixtă destinată agrementului și loisirului — construcții și amenajări sportive, locuințe de vacanță, turism',
        fn_complementare: ['parcaje (POT50%)', 'spații verzi (POT10%)', 'echipamente tehnico-edilitare'],
        fn_interzise: ['industrie', 'depozitare en-gros', 'locuințe permanente în zonele de protecție'],
        utrs: [],
        nota: 'Locuințe de vacanță: POT20%, CUT0.4. Investiții >P+5 sau >300mp necesită PUD.',
      },

      'ZF08.5': {
        cod: 'ZF08.5', denumire: 'Zone Mixte Locuințe / Comerț / Servicii',
        culoare: '#F39C12',
        pot: 45, cut: 1.3, hMaxM: 12, hMaxFloors: 2,
        regim: 'P+1÷P+2',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'mixt-locuinte-comert',
        descriere: 'Zone mixte de-a lungul arterelor principale — locuințe individuale și colective, servicii, comerț',
        fn_complementare: ['locuințe colective (CUT1.3)', 'cult', 'învățământ', 'spații verzi'],
        fn_interzise: ['industrie', 'depozitare en-gros', 'activități cu impact negativ'],
        utrs: [1, 21, 45, 55],
      },

      'ZF08.6': {
        cod: 'ZF08.6', denumire: 'Zone Mixte Locuințe Colective / Comerț / Servicii',
        culoare: '#D35400',
        pot: 45, cut: 1.5, hMaxM: 22.5, hMaxFloors: 5,
        regim: 'P+2÷P+5',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'mixt-locuinte-colective',
        descriere: 'Zone mixte cu locuințe colective predominante, comerț și servicii la parter',
        fn_complementare: ['locuințe individuale (POT45%)', 'cult', 'parcaje'],
        fn_interzise: ['industrie', 'depozitare', 'activități poluante'],
        utrs: [],
        nota: 'POT variabil după suprafața parcelei: <200mp=45%, 201-500mp=45%, >501mp=70%, >1001mp=80%. CUT: <200mp=1.5, 201-500mp=2.5, >501mp=3.5',
      },

      'ZF08.7': {
        cod: 'ZF08.7', denumire: 'Zona Mixtă Universitară / Cercetare / Birouri',
        culoare: '#8E44AD',
        pot: 40, cut: 2.0, hMaxM: null, hMaxFloors: null,
        regim: 'conform PUD',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'mixt-universitar',
        descriere: 'Zona mixtă cu specific universitar, cercetare-dezvoltare și birouri — campus universitar și activități conexe',
        fn_complementare: ['locuințe studențești', 'servicii pentru educație', 'cercetare', 'birouri'],
        fn_interzise: ['industrie', 'comerț en-gros', 'depozitare'],
        utrs: [],
      },

      'ZF08.8': {
        cod: 'ZF08.8', denumire: 'Zona Mixtă cu Funcțiuni Complexe',
        culoare: '#922B21',
        pot: 50, cut: 2.5, hMaxM: 19, hMaxFloors: 4,
        regim: 'P+1÷P+4',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'mixt-complex',
        descriere: 'Zone mixte cu funcțiuni complexe — servicii, birouri, comerț, funcțiuni publice și locuire',
        fn_complementare: ['locuințe colective', 'parcaje', 'spații verzi'],
        fn_interzise: ['industrie poluantă', 'depozitare en-gros'],
        utrs: [],
      },

      'ZF08.9': {
        cod: 'ZF08.9', denumire: 'Zona Mixtă Locuințe / Servicii / Agrement',
        culoare: '#CB4335',
        pot: 50, cut: 1.5, hMaxM: 10, hMaxFloors: 2,
        regim: 'P+1÷P+2',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'mixt-locuinte-agrement',
        descriere: 'Zone mixte cu locuire, servicii de proximitate și agrement — zone rezidențiale cu funcțiuni complementare',
        fn_complementare: ['spații verzi', 'parcaje', 'construcții tehnico-edilitare'],
        fn_interzise: ['industrie', 'depozitare', 'activități cu disconfort'],
        utrs: [],
      },

      'ZF08.10': {
        cod: 'ZF08.10', denumire: 'Zona Mixtă Poli Urbani Secundari',
        culoare: '#E59866',
        pot: 70, cut: 3.5, hMaxM: 19, hMaxFloors: 4,
        regim: 'P+1÷P+4',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'mixt-poli-secundari',
        descriere: 'Zone mixte aferente polilor urbani secundari — centre de cartier cu funcțiuni comerciale, servicii și locuire',
        fn_complementare: ['locuințe individuale (POT45%, CUT1.3)', 'locuințe colective (POT40%, CUT2.0)', 'parcaje', 'cult', 'spații verzi'],
        fn_interzise: ['industrie poluantă', 'depozitare en-gros'],
        utrs: [12],
        nota: 'Locuințe individuale: POT45%, CUT1.3, H max P+2/10m',
      },

      // ── INSTITUȚII ────────────────────────────────────────────────────────
      'ZF09.1': {
        cod: 'ZF09.1', denumire: 'Zona Instituții Publice',
        culoare: '#1A5276',
        pot: 50, cut: 1.5, hMaxM: 12, hMaxFloors: 2,
        regim: 'P+1÷P+2',
        retragereStrada: 3, retragereVecin: 3,
        tip: 'institutii-publice',
        descriere: 'Zona destinată instituțiilor publice — administrație, sănătate, educație, cultură, culte',
        fn_complementare: ['parcaje aferente', 'spații verzi', 'construcții tehnico-edilitare'],
        fn_interzise: ['locuire', 'industrie', 'comerț en-gros', 'depozitare'],
        utrs: [],
        nota: 'CUT variabil: cult și învățământ=1.5; alte funcțiuni=4.5',
      },

      // ── COMERȚ ────────────────────────────────────────────────────────────
      'ZF10.1': {
        cod: 'ZF10.1', denumire: 'Zona Comerț și Servicii',
        culoare: '#F1C40F',
        pot: 50, cut: 2.5, hMaxM: 19, hMaxFloors: 4,
        regim: 'P÷P+4',
        retragereStrada: 6, retragereVecin: 6,
        tip: 'comert-servicii',
        descriere: 'Zone comerciale și de servicii — mall-uri, centre comerciale, servicii de interes general',
        fn_complementare: ['parcaje', 'spații verzi', 'construcții tehnico-edilitare'],
        fn_interzise: ['locuire permanentă', 'industrie poluantă'],
        utrs: [],
      },

      // ── LOCUIRE ───────────────────────────────────────────────────────────
      'ZF11.1': {
        cod: 'ZF11.1', denumire: 'Zone Locuințe Colective',
        culoare: '#FAD7A0',
        pot: 40, cut: 2.0, hMaxM: 12, hMaxFloors: 2,
        regim: 'P+2÷variable',
        retragereStrada: 5, retragereVecin: 5,
        tip: 'rezidential-colectiv',
        descriere: 'Zone rezidențiale cu locuințe colective predominante — blocuri de locuit, dotări de cartier',
        fn_complementare: ['comerț la parter (max 200mp)', 'servicii de cartier', 'spații verzi', 'parcaje'],
        fn_interzise: ['industrie', 'activități productive poluante', 'depozitare en-gros'],
        utrs: [],
        nota: 'POT și CUT variabil după tipul de locuință colectivă și regimul de înălțime. Locuințe individuale complementare: POT45%, CUT1.5',
      },

      'ZF11.2': {
        cod: 'ZF11.2', denumire: 'Zone Locuințe Individuale',
        culoare: '#FDEBD0',
        pot: 45, cut: 1.5, hMaxM: 12, hMaxFloors: 2,
        regim: 'P÷P+2',
        retragereStrada: 5, retragereVecin: 3,
        tip: 'rezidential-individual',
        descriere: 'Zone rezidențiale cu locuințe individuale — case unifamiliale, duplex, înșiruite',
        fn_complementare: ['anexe gospodărești', 'garaje', 'comerț max 200mp Adc', 'servicii profesionale'],
        fn_interzise: ['industrie', 'activități productive poluante', 'depozitare en-gros', 'service auto'],
        utrs: [],
        nota: 'CUT variabil: P=0.5, P+1=1.0, P+2=1.5. POT=45% standard.',
      },

      // ── ACTIVITĂȚI PRODUCTIVE ─────────────────────────────────────────────
      'ZF12.1': {
        cod: 'ZF12.1', denumire: 'Zone Activități Productive și Servicii Conexe',
        culoare: '#7F8C8D',
        pot: 50, cut: 2.5, hMaxM: null,
        regim: 'P÷conform necesități',
        retragereStrada: 6, retragereVecin: 6,
        tip: 'productiv-servicii',
        descriere: 'Zone destinate activităților productive nepoluante și serviciilor conexe — ateliere, service, logistică, servicii tehnice',
        fn_complementare: ['birouri', 'showroom', 'depozitare', 'parcaje'],
        fn_interzise: ['locuire permanentă', 'industrie poluantă cu risc major', 'unități de învățământ'],
        utrs: [],
      },

      'ZF12.2': {
        cod: 'ZF12.2', denumire: 'Zone Activități Productive și Depozitare',
        culoare: '#566573',
        pot: 80, cut: 2.4, hMaxM: null,
        regim: 'P÷conform necesități',
        retragereStrada: 6, retragereVecin: 6,
        tip: 'industrial-depozitare',
        descriere: 'Zone industriale și de depozitare — hale de producție, depozite, platforme industriale',
        fn_complementare: ['birouri administrative', 'parcaje', 'construcții tehnico-edilitare'],
        fn_interzise: ['locuire permanentă', 'unități de învățământ', 'sănătate', 'activități cu risc biologic'],
        utrs: [],
        nota: 'Alte funcțiuni admise: POT50%, CUT2.5',
      },

      // ── AGROZOOTEHNIC ─────────────────────────────────────────────────────
      'ZF04': {
        cod: 'ZF04', denumire: 'Zona Unități Agrozootehnice',
        culoare: '#A9CCE3',
        pot: 50, cut: 2.5, hMaxM: null,
        regim: 'P÷conform specificului',
        tip: 'agrozootehnic',
        descriere: 'Zone destinate activităților agrozootehnice — ferme, sere, silozuri, exploatații agricole',
        fn_complementare: ['birouri administrative', 'locuințe pentru personal de pază'],
        fn_interzise: ['locuire permanentă', 'unități de învățământ', 'sănătate publică'],
        utrs: [],
      },

      // ── GOSPODĂRIE COMUNALĂ ───────────────────────────────────────────────
      'ZF13': {
        cod: 'ZF13', denumire: 'Zona Gospodărie Comunală — Cimitire',
        culoare: '#6B8E23',
        pot: 2, cut: 2.0, hMaxM: 8.5, hMaxFloors: 1,
        regim: 'P÷P+1',
        tip: 'gospodarie-comunala',
        descriere: 'Zone destinate gospodăriei comunale — cimitire, capele, anexe administrative',
        fn_complementare: ['capele mortuare', 'administrație', 'spații plantate', 'circulații'],
        fn_interzise: ['locuire', 'industrie', 'comerț', 'locuințe la mai puțin de 50m de cimitir'],
        utrs: [],
        nota: 'POT construcții aferente cimitirului = 1-2%. Construcții pentru cult: POT variabil.',
      },

      // ── SPAȚII VERZI ──────────────────────────────────────────────────────
      'ZF14.1': {
        cod: 'ZF14.1', denumire: 'Zona Spații Verzi / Agrement / Scuaruri',
        culoare: '#27AE60',
        pot: 50, cut: 1.5, hMaxM: null,
        regim: 'P÷conform specificului',
        tip: 'spatii-verzi-agrement',
        descriere: 'Zone de spații verzi, agrement, scuaruri, fâșii plantate și perdele de protecție — inclusiv amenajări sportive',
        fn_complementare: ['construcții sportive', 'agrement', 'restaurante/cafenele max 15%', 'parcaje'],
        fn_interzise: ['locuire', 'industrie', 'depozitare', 'construcții incompatibile cu funcțiunea verde'],
        utrs: [],
        nota: 'Spații verzi propriu-zise: POT10%, CUT0.1',
      },

      'ZF14_PV': {
        cod: 'ZF14_PV', denumire: 'Subzona Pol Agrement și Relaxare (PV.PF)',
        culoare: '#1E8449',
        pot: 50, cut: 1.0, hMaxM: null,
        regim: 'conform specificului',
        tip: 'pol-agrement',
        descriere: 'Subzonă destinată polilor de agrement și relaxare — bazine, terenuri sport, tribune',
        fn_complementare: ['servicii de agrement', 'restaurante', 'parcaje'],
        fn_interzise: ['locuire permanentă', 'industrie'],
        utrs: [],
        nota: 'POT50% include suprafața construită la sol — nu include amenajările în aer liber (bazine, terenuri sport).',
      },

      'ZF14_V1': {
        cod: 'ZF14_V1', denumire: 'Subzona Spații Verzi Publice — Parcuri / Scuaruri (V1.PF)',
        culoare: '#2ECC71',
        pot: 10, cut: 0.2, hMaxM: null,
        regim: 'P',
        tip: 'parcuri-publice',
        descriere: 'Spații verzi publice cu acces nelimitat — parcuri, scuaruri, grădini publice',
        fn_complementare: ['locuri de joacă', 'mobilier urban', 'chioșcuri max 10mp', 'circulații pietonale'],
        fn_interzise: ['locuire', 'industrie', 'comerț permanent', 'parcaje supraterane'],
        utrs: [],
      },

      'ZF14_V2': {
        cod: 'ZF14_V2', denumire: 'Subzona Spații Verzi Publice Faleza Dunării (V2.PF)',
        culoare: '#58D68D',
        pot: 10, cut: 0.2, hMaxM: null,
        regim: 'P',
        tip: 'faleza-spatii-verzi',
        descriere: 'Spații verzi publice aferente Falezei Dunării — promenadă, parcuri riverane',
        fn_complementare: ['promenada pietonală', 'mobilier urban', 'pontoane', 'construcții ușoare agrement'],
        fn_interzise: ['locuire', 'industrie', 'construcții permanente incompatibile cu caracterul falezei'],
        utrs: [],
        nota: 'Zonă de interes major peisagistic — reglementări speciale pentru protecția vederii spre Dunăre.',
      },

      // ── ECHIPAMENTE TEHNICO-EDILITARE ─────────────────────────────────────
      'ZF05': {
        cod: 'ZF05', denumire: 'Zone Construcții Aferente Echipamente Tehnico-Edilitare',
        culoare: '#ABB2B9',
        pot: 50, cut: null, hMaxM: 7, hMaxFloors: 1,
        regim: 'P÷P+1',
        tip: 'tehnico-edilitar',
        descriere: 'Zone destinate infrastructurii tehnico-edilitare — stații de pompare, transformatoare, stații epurare, gospodărie apă',
        fn_complementare: ['birouri tehnice', 'construcții administrative aferente'],
        fn_interzise: ['locuire', 'funcțiuni incompatibile cu infrastructura'],
        utrs: [],
      },

      // ── CĂPĂI COMUNICAȚIE ─────────────────────────────────────────────────
      'ZF06.1': {
        cod: 'ZF06.1', denumire: 'Căi de Comunicație Rutieră și Amenajări Aferente',
        culoare: '#808B96',
        pot: 80, cut: 1.0, hMaxM: 12, hMaxFloors: 2,
        regim: 'P÷P+2',
        tip: 'transport-rutier',
        descriere: 'Zone aferente căilor de comunicație rutieră — drumuri, poduri, noduri rutiere, parcaje, terminal transport',
        fn_complementare: ['stații carburant', 'service auto', 'parcaje'],
        fn_interzise: ['locuire', 'industrie incompatibilă'],
        utrs: [],
      },

      'ZF06.2': {
        cod: 'ZF06.2', denumire: 'Căi de Comunicație Feroviară și Amenajări Aferente',
        culoare: '#717D7E',
        pot: null, cut: null, hMaxM: 12, hMaxFloors: 2,
        regim: 'conform specificului',
        tip: 'transport-feroviar',
        descriere: 'Zone aferente infrastructurii feroviare — linii CF, triaj, gări, hale de întreținere',
        fn_complementare: ['depouri', 'ateliere CFR', 'construcții administrative'],
        fn_interzise: ['locuire', 'funcțiuni incompatibile cu siguranța feroviară'],
        utrs: [],
      },

      'ZF06.3': {
        cod: 'ZF06.3', denumire: 'Căi de Comunicație Navale — Port',
        culoare: '#5D6D7E',
        pot: null, cut: null, hMaxM: null,
        regim: 'conform specificului',
        tip: 'transport-naval',
        descriere: 'Zone aferente infrastructurii portuare și transportului naval — dane, depozite portuare, echipamente specifice',
        fn_complementare: ['terminal de pasageri', 'servicii portuare', 'construcții administrative'],
        fn_interzise: ['locuire permanentă', 'funcțiuni incompatibile cu activitatea portuară'],
        utrs: [44],
      },

      // ── APE ───────────────────────────────────────────────────────────────
      'ZF01': {
        cod: 'ZF01', denumire: 'Zona Terenuri Aflate Permanent Sub Ape — Canale',
        culoare: '#5DADE2',
        pot: null, cut: null, hMaxM: null,
        regim: 'conform legislației apelor',
        tip: 'ape',
        descriere: 'Terenuri acoperite permanent cu apă — lacuri, canale, Dunăre, bălți',
        fn_complementare: ['amenajări hidrotehnice', 'pontoane', 'infrastructură de apărare împotriva inundațiilor'],
        fn_interzise: ['construcții permanente', 'depozitare substanțe periculoase'],
        utrs: [],
      },
    },

    // ── Reguli generale ─────────────────────────────────────────────────────
    reguli_generale: {
      retragere_DN: 'min. 22m din axul drumului național',
      retragere_DJ: 'min. 20m din axul drumului județean',
      retragere_DC: 'min. 15m din axul drumului comunal',
      gard_spre_strada_max: '2.0m (soclu max 0.6m + parte transparentă)',
      gard_spre_vecini_max: '2.2m opac',
      spatii_verzi_min: '20% din suprafața parcelei pentru locuire individuală',
      seismic_nota: 'Zona seismică B — ag=0.35g, Tc=1.6s (P100-1/2013)',
      zona_inundabila: 'Construcțiile în zone inundabile necesită studiu hidrologic avizat ANAR',
      patrimoniu_nota: 'Intervențiile în ZCP și zona de protecție MI necesită aviz Ministerul Culturii',
    },
  };

  console.log('[RLU Galați] v1.0 — ' + Object.keys(window.RLU_REGISTRY['galati'].zone).length + ' zone funcționale încărcate');
})();
