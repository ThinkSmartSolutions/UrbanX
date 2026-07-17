/* ============================================================================
 * UrbanX — SSI: SARCINA TERMICĂ (tipar exact de calcul, replicat după proiect real
 * "Sarcina termică Fruntiseni.xlsx" — Centru de zi Fruntișeni) + TIMPI DE INTERVENȚIE ISU
 * (js/25-ssi-sarcina-termica.js)
 *
 * Metodologia reală (Florin, 16 iul, cerere explicită "acest tipar de calcul, exact
 * acesta, pe fiecare tip de funcțiuni"): pentru fiecare încăpere se însumează sarcina
 * termică a TUTUROR materialelor combustibile reale (pardoseală + mobilier + textile +
 * plastice + cabluri), nu doar a finisajului de pardoseală (cum face motorul vechi din
 * js/25-ssi-materiale-extractie.js):
 *   G(kg) = Cantitate × Greutate_unitară
 *   I(MJ) = G × Putere_calorică(MJ/kg)
 *   qi(MJ/mp) = Σ I(încăpere) / Suprafață(încăpere)
 *   → încadrare risc: mic ≤420 / mijlociu 420-840 / mare 840-1680 / foarte mare >1680
 *     (praguri identice cu cele deja folosite în urbanx-docx-builder.js și js/25-ssi.js —
 *     art. A.10.2.1.2/A.10.2.1.3 P118-1/2025, aceeași sursă normativă din Excel-ul sursă).
 *
 * Acest motor e ADITIV: js/25-ssi-materiale-extractie.js rămâne sursa AUTORITARĂ pentru
 * pardoseala REALĂ (declarată pe planul de arhitectură încărcat) — acest fișier doar
 * ADAUGĂ conținutul de mobilier/echipamente/cabluri STANDARD per tip de încăpere, acolo
 * unde planul nu conține (și nu poate conține) un inventar de mobilier. Când nu există
 * niciun plan încărcat, genereazaCamereStandard() produce o estimare conservatoare a
 * întregului program de încăperi din tipologia funcțiunii (js/urbanx-space-program.js
 * TIPOLOGII+SPACES) — regula "auto-estimează, nu bloca": draftul are mereu cifre reale
 * calculate, utilizatorul confirmă/corectează, nu se lasă gol.
 *
 * window.SSI_SARCINA_TERMICA:
 *   PC                        — tabel putere calorică inferioară (MJ/kg), ~35 materiale
 *   incadreazaRisc(qi)        — 'mic'|'mijlociu'|'mare'|'foarte mare'
 *   calculeazaCamera(camera)  — camera:{nume,arie_mp,pardoseala?} → adaugă detaliu_materiale,
 *                                sarcina_termica_mj (TOTALĂ, pardoseală+conținut), densitate_mj_mp, risc
 *   genereazaCamereStandard(functiune, params) — array de camere estimate din program funcțional
 *   calculeazaTimpiInterventie(inputs) — T1..T14, cascadă conform metodologiei ISU
 * ========================================================================== */
(function (G) {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. PUTERE CALORICĂ INFERIOARĂ MATERIALE (MJ/kg) — extindere Tabelul 137, Anexa 9.1,
  // P118-1/2025 (păstrează cheile 'lemn'/'pvc' din 25-ssi-materiale-extractie.js pt.
  // compatibilitate + adaugă restul materialelor din tabelul de referință al proiectului
  // real Fruntișeni, verificate independent pe surse uzuale de calorimetrie a incendiului).
  // ---------------------------------------------------------------------------
  var PC = {
    // lemn / derivate lemnoase
    lemn: 18.40, lemn_esenta_moale: 13.80, lemn_esenta_tare: 19.25, lemn_de_foc: 17.95,
    lemn_conventional: 18.40, pal: 19.25,
    // materiale plastice
    pvc: 18.65, pvc_plastifiat: 33.50, polietilena: 46.00, polipropilena: 44.00,
    poliuretan: 38.00, materiale_plastice: 20.95, cauciuc: 41.85, rasina_epoxidica: 30.20,
    // hârtie / textile
    carton_hartie: 16.30, celuloza: 16.75, textile: 20.95, bumbac: 16.75, lana: 22.85,
    // finisaje / instalații
    linoleum_covor_pvc: 20.95, cabluri_echipamente_electrice: 33.50, vata_minerala: 0.55,
    // lichide / combustibili
    alcool_metilic: 22.40, benzina: 44.35, motorina: 42.50, ceara: 39.50, ulei_vegetal: 38.70,
    grasimi: 39.75,
    // alimentar / agrozootehnic
    cereale: 14.25, faina: 15.05, cacao: 20.75, sirop_de_zahar: 34.95, cafea: 20.10, fan: 14.65,
    // altele (Tabelul de referință Fruntișeni)
    acid_acetic: 14.85, brichete_lignit: 20.10, cocs_metalurgic: 30.35
  };

  // ---------------------------------------------------------------------------
  // 2. PRAGURI DE ÎNCADRARE ÎN RISC (identice cu SSI_NORMATIVE.risc din js/25-ssi.js
  // și cu incadrare()/incadrareMx()/incadrareC2() din urbanx-docx-builder.js — o singură
  // sursă de adevăr, nu se recalculează independent în 3 locuri divergente).
  // ---------------------------------------------------------------------------
  function incadreazaRisc(qi) {
    return qi > 1680 ? 'foarte mare' : qi > 840 ? 'mare' : qi > 420 ? 'mijlociu' : 'mic';
  }

  // ---------------------------------------------------------------------------
  // 3. PARDOSEALĂ combustibilă — compat 1:1 cu PARDOSEALA_COMBUSTIBILA din
  // js/25-ssi-materiale-extractie.js (aceleași densități/grosimi/PC), reutilizată aici
  // ca "rândul 1" al inventarului fiecărei încăperi, exact ca în Excel-ul sursă.
  // ---------------------------------------------------------------------------
  var PARDOSEALA = {
    parchet: { densitate: 650, grosime: 0.010, pc: PC.lemn, eticheta: 'Parchet lemn (masiv/stratificat)' },
    covor: { densitate: 1400, grosime: 0.003, pc: PC.pvc, eticheta: 'Covor PVC' },
    mocheta: { densitate: 900, grosime: 0.008, pc: PC.textile, eticheta: 'Mochetă textilă' },
    parchet_sportiv: { densitate: 650, grosime: 0.022, pc: PC.lemn_esenta_tare, eticheta: 'Parchet sportiv (lemn esență tare, 22mm)' }
  };
  function _pardoselaDin(pardoseala) {
    var p = String(pardoseala || '').toLowerCase();
    if (/parchet\s*sport|sportiv/.test(p)) return PARDOSEALA.parchet_sportiv;
    if (/parchet/.test(p)) return PARDOSEALA.parchet;
    if (/mochet[aă]/.test(p)) return PARDOSEALA.mocheta;
    if (/covor/.test(p)) return PARDOSEALA.covor;
    return null; // gresie, piatră, beton, ceramică etc. — incombustibile, contribuție 0
  }

  // ---------------------------------------------------------------------------
  // 4. BIBLIOTECĂ DE CONȚINUT COMBUSTIBIL STANDARD, pe FAMILII de încăperi — acoperă
  // toate cele 19 categorii ("cat") folosite în js/urbanx-space-program.js SPACES, deci
  // se aplică la ORICE funcțiune din platformă (SPACES e comun tuturor funcțiunilor).
  // Cantitățile sunt valori ORIENTATIVE tipice de proiectare (mobilier/echipamente
  // uzuale la acest tip de spațiu) — proiectantul le calibrează cu inventarul REAL la
  // faza PT, exact cum "grad de proiectare" ≠ "grad definitiv as-built" (vezi 3.2 SSI).
  // `per`: 'mp' = cantitate proporțională cu aria (kg/mp declarat direct ca greutate);
  //        'buc_per_mp' = 1 bucată la fiecare `la_mp` mp (rotunjit sus, minim 1 buc);
  //        'fix' = cantitate fixă (`buc`), indiferent de arie (ex. echipament unic).
  //
  // CALIBRARE (16 iul): greutățile de mai jos sunt fixate astfel încât densitatea REZULTATĂ
  // (qi, MJ/mp) a unei încăperi tipice din fiecare familie să se apropie de valorile
  // caracteristice publicate în SR EN 1991-1-2, Anexa E.4 (surse de sarcină termică pe
  // tip de destinație — valori medii, MJ/mp arie utilă): locuință ~780, birou ~420,
  // cameră hotel ~310, salon spital ~230, sală de clasă ~285, centru comercial ~600 —
  // nu valori inventate, ci ancorate la reperul normativ european uzual, apoi distribuite
  // pe itemi de mobilier plauzibili. Proiectantul calibrează cu inventarul REAL la faza PT.
  // ---------------------------------------------------------------------------
  var FAMILII = {
    // Administrativ / Birouri / Primire / Circulații / Comercial — spații "de tip birou"
    // (SR EN 1991-1-2 Anexa E.4, birou: qf,k ≈ 420 MJ/mp mediu)
    birou: { pardoseala: 'parchet', itemi: [
      { material: 'pal', nume: 'mobilier PAL (birou + dulap)', greutate: 55, per: 'buc_per_mp', la_mp: 15 },
      { material: 'poliuretan', nume: 'scaun ergonomic tapițat', greutate: 10, per: 'buc_per_mp', la_mp: 10 },
      { material: 'materiale_plastice', nume: 'echipamente electronice (PC/imprimantă/monitor)', greutate: 15, per: 'buc_per_mp', la_mp: 20 },
      { material: 'carton_hartie', nume: 'hârtie/dosare (arhivă curentă)', greutate: 1.4, per: 'mp' },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, tuburi, echipamente electrice aparente', greutate: 1.5, per: 'mp' }
    ] },
    // Cazare (cameră hotel/cămin) — pat, lenjerie, mobilier dormitor
    // (SR EN 1991-1-2 Anexa E.4, cameră hotel: qf,k ≈ 310 MJ/mp mediu)
    cazare: { pardoseala: 'mocheta', itemi: [
      { material: 'pal', nume: 'mobilier PAL (pat + noptieră + dulap)', greutate: 60, per: 'buc_per_mp', la_mp: 16 },
      { material: 'poliuretan', nume: 'saltea + fotoliu tapițat', greutate: 24, per: 'buc_per_mp', la_mp: 16 },
      { material: 'textile', nume: 'lenjerie, perdele, covor decorativ', greutate: 1.2, per: 'mp' },
      { material: 'materiale_plastice', nume: 'TV + minibar + echipamente cameră', greutate: 8, per: 'buc_per_mp', la_mp: 16 },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, tuburi, instalații electrice aparente', greutate: 1, per: 'mp' }
    ] },
    // Locuire (living/dormitor/bucătărie casă) — mobilier mult mai dens decât hotel
    // (SR EN 1991-1-2 Anexa E.4, locuință: qf,k ≈ 780 MJ/mp mediu — cea mai mare
    // sarcină termică "curentă", de acumulare personală pe termen lung)
    locuire: { pardoseala: 'parchet', itemi: [
      { material: 'pal', nume: 'mobilier PAL (canapea, dulap, masă)', greutate: 115, per: 'buc_per_mp', la_mp: 14 },
      { material: 'poliuretan', nume: 'tapițerie canapea/fotolii/saltele', greutate: 45, per: 'buc_per_mp', la_mp: 14 },
      { material: 'textile', nume: 'covoare, perdele, textile casă, haine', greutate: 3.5, per: 'mp' },
      { material: 'carton_hartie', nume: 'cărți, documente personale', greutate: 2, per: 'mp' },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, echipamente electrocasnice', greutate: 1.5, per: 'mp' }
    ] },
    // Medical (salon/cabinet/laborator generic — fără bloc operator, tratat distinct)
    // (SR EN 1991-1-2 Anexa E.4, salon spital: qf,k ≈ 230 MJ/mp mediu — mobilier redus,
    // reglementat, control strict al depozitării de materiale combustibile)
    medical: { pardoseala: 'covor', itemi: [
      { material: 'pal', nume: 'mobilier medical PAL (dulap, noptieră, birou consultație)', greutate: 22, per: 'buc_per_mp', la_mp: 18 },
      { material: 'poliuretan', nume: 'pat/scaun consultație tapițat', greutate: 14, per: 'buc_per_mp', la_mp: 18 },
      { material: 'textile', nume: 'lenjerie, câmpuri, consumabile textile', greutate: 0.4, per: 'mp' },
      { material: 'materiale_plastice', nume: 'echipamente medicale/consumabile plastic', greutate: 8, per: 'buc_per_mp', la_mp: 18 },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, monitoare, echipamente electrice', greutate: 1, per: 'mp' }
    ] },
    // Bloc operator / ATI — risc controlat, conținut combustibil minim (fără parchet/covor)
    medical_steril: { pardoseala: null, itemi: [
      { material: 'materiale_plastice', nume: 'echipamente medicale/consumabile sterile plastic', greutate: 8, per: 'buc_per_mp', la_mp: 20 },
      { material: 'textile', nume: 'câmpuri sterile, halate unică folosință', greutate: 0.3, per: 'mp' },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, monitoare, echipamente electrice medicale', greutate: 1.5, per: 'mp' }
    ] },
    // Alimentar (bucătărie/sală mese/oficiu) — fără reper EN direct, calibrat între birou și comercial
    alimentar: { pardoseala: null, itemi: [
      { material: 'pal', nume: 'mobilier PAL (mese, scaune, blaturi)', greutate: 30, per: 'buc_per_mp', la_mp: 3 },
      { material: 'poliuretan', nume: 'scaun tapițat sală de mese', greutate: 6, per: 'buc_per_mp', la_mp: 4 },
      { material: 'materiale_plastice', nume: 'materiale plastice (ambalaje, vase, echipamente)', greutate: 10, per: 'buc_per_mp', la_mp: 10 },
      { material: 'ulei_vegetal', nume: 'grăsimi/ulei vegetal (stoc curent bucătărie)', greutate: 10, per: 'buc_per_mp', la_mp: 10 },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, echipamente electrice de bucătărie', greutate: 2, per: 'mp' }
    ] },
    // Producție (hală industrială/atelier) — risc mediu tipic, cf. SSI_NORMATIVE.risc
    productie: { pardoseala: null, itemi: [
      { material: 'materiale_plastice', nume: 'ambalaje/materiale plastice în proces', greutate: 3, per: 'mp' },
      { material: 'lemn_conventional', nume: 'paleți/ambalaje lemn', greutate: 2, per: 'mp' },
      { material: 'cauciuc', nume: 'componente cauciuc/curele/garnituri', greutate: 0.5, per: 'mp' },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, tablouri, motoare electrice', greutate: 2, per: 'mp' }
    ] },
    // Agrozootehnic — furaje/cereale, risc combustibil ridicat (specific acestei categorii)
    agrozootehnic: { pardoseala: null, itemi: [
      { material: 'fan', nume: 'furaj fibros (fân/paie) depozitat', greutate: 8, per: 'mp' },
      { material: 'cereale', nume: 'cereale/furaj concentrat', greutate: 5, per: 'mp' },
      { material: 'lemn_conventional', nume: 'structuri/paleți lemn', greutate: 2, per: 'mp' },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, echipamente electrice utilaje', greutate: 0.8, per: 'mp' }
    ] },
    // Depozitare / Comercial — conținut variabil, profil conservator generic (marfă tip carton/plastic)
    // (SR EN 1991-1-2 Anexa E.4, centru comercial: qf,k ≈ 600 MJ/mp mediu)
    depozitare: { pardoseala: null, itemi: [
      { material: 'carton_hartie', nume: 'ambalaje carton (marfă generică)', greutate: 18, per: 'mp' },
      { material: 'materiale_plastice', nume: 'ambalaje/folii plastice', greutate: 7, per: 'mp' },
      { material: 'lemn_conventional', nume: 'paleți lemn', greutate: 4, per: 'mp' },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, iluminat, echipamente electrice', greutate: 0.6, per: 'mp' }
    ] },
    // Personal (vestiare) / Sanitare — conținut redus
    personal: { pardoseala: null, itemi: [
      { material: 'materiale_plastice', nume: 'dulapuri/bănci vestiar (structură metal + plastic)', greutate: 6, per: 'buc_per_mp', la_mp: 4 },
      { material: 'textile', nume: 'haine/echipament personal depozitat', greutate: 2, per: 'mp' },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, iluminat, echipamente electrice', greutate: 0.5, per: 'mp' }
    ] },
    sanitare: { pardoseala: null, itemi: [
      { material: 'materiale_plastice', nume: 'dozatoare, obiecte sanitare plastic', greutate: 1.5, per: 'mp' },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, iluminat', greutate: 0.4, per: 'mp' }
    ] },
    // Tehnic / Energie / PSI / Parcare — echipamente metalice, conținut combustibil minim
    tehnic: { pardoseala: null, itemi: [
      { material: 'vata_minerala', nume: 'izolații termice (vată minerală) pe conducte/echipamente', greutate: 2, per: 'mp' },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, tablouri, echipamente electrice/automatizare', greutate: 3, per: 'mp' },
      { material: 'motorina', nume: 'combustibil lichid (rezervor tampon/grup electrogen, dacă e cazul)', greutate: 0, per: 'mp' }
    ] },
    // PSI/Parcare/Energie — practic incombustibil (apă, beton, metal); rând simbolic pt. trasabilitate
    minim: { pardoseala: null, itemi: [
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, iluminat de securitate', greutate: 0.3, per: 'mp' }
    ] },
    // Sport — parchet sportiv (combustibil semnificativ) + echipamente
    sport: { pardoseala: 'parchet_sportiv', itemi: [
      { material: 'cauciuc', nume: 'echipamente sportive (saltele, mingi, protecții)', greutate: 1.5, per: 'mp' },
      { material: 'materiale_plastice', nume: 'echipamente/mobilier plastic gradene', greutate: 1, per: 'mp' },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, tablou electric, nocturnă', greutate: 0.6, per: 'mp' }
    ] },
    // Educațional — mobilier + hârtie/cărți (bibliotecă = combustibil ridicat)
    educational: { pardoseala: 'parchet', itemi: [
      { material: 'pal', nume: 'mobilier PAL (bănci, catedră, rafturi)', greutate: 20, per: 'buc_per_mp', la_mp: 4 },
      { material: 'carton_hartie', nume: 'cărți, manuale, materiale didactice', greutate: 3, per: 'mp' },
      { material: 'materiale_plastice', nume: 'echipamente didactice/IT', greutate: 4, per: 'buc_per_mp', la_mp: 20 },
      { material: 'cabluri_echipamente_electrice', nume: 'cabluri, echipamente electrice', greutate: 0.8, per: 'mp' }
    ] }
  };

  // Mapare categorie SPACES ("cat") -> familie de conținut combustibil de mai sus.
  var MAP_CATEGORIE = {
    'Administrativ': 'birou', 'Birouri': 'birou', 'Primire': 'birou', 'Circulații': 'birou', 'Comercial': 'depozitare',
    'Cazare': 'cazare', 'Locuire': 'locuire',
    'Medical': 'medical',
    'Alimentar': 'alimentar',
    'Producție': 'productie', 'Agrozootehnic': 'agrozootehnic',
    'Depozitare': 'depozitare',
    'Personal': 'personal', 'Sanitare': 'sanitare',
    'Tehnic': 'tehnic', 'Energie': 'tehnic', 'Parcare': 'minim', 'PSI': 'minim',
    'Sport': 'sport', 'Educațional': 'educational'
  };

  // Override-uri pe id specific de spațiu (js/urbanx-space-program.js SPACES) — acolo unde
  // conținutul diferă semnificativ de categoria generică (bloc operator ≠ Medical generic).
  var OVERRIDE_ID = {
    sala_operatie: 'medical_steril', sala_pregatire_preop: 'medical_steril', sala_trezire_postop: 'medical_steril',
    sterilizare_centrala: 'medical_steril', camera_server: 'tehnic', rmn: 'medical_steril',
    rmn_comanda: 'birou', rmn_tehnica: 'tehnic', rmn_racire: 'tehnic',
    centrala_termica: 'tehnic', camera_pompe: 'tehnic', camera_compresoare: 'tehnic', camera_transformator: 'tehnic',
    bucatarie_profesionala: 'alimentar', spalatorie: 'tehnic',
    idsi: 'minim', camera_psi: 'minim', statie_pompe_incendiu: 'minim', rezervor_incendiu: 'minim',
    hidranti_niv: 'minim', trape_shev: 'minim', sprinklere: 'minim', adapost_ala: 'minim',
    nivel_parcare: 'minim', boxa_subsol: 'minim'
  };

  // ---------------------------------------------------------------------------
  // 5. Recunoașterea tipului de încăpere dintr-un NUME liber (de pe plan PDF sau declarat
  // de utilizator) — cascadă cea mai specifică → cea mai generică, în stilul DICTIONAR
  // din js/25-ssi-materiale-extractie.js.
  // ---------------------------------------------------------------------------
  var DICTIONAR_NUME = [
    { re: /sal[aă]\s*(de\s*)?opera[tț]ie|bloc\s*operator|ATI\b|terapie\s*intensiv[aă]|sterilizare/i, familie: 'medical_steril' },
    { re: /salon|cabinet|ambulatoriu|imagistic|laborator|farmacie|na[sș]tere|neonatologie/i, familie: 'medical' },
    { re: /camer[aă]\s*(de\s*)?cazare|camer[aă]\s*hotel|dormitor\s*oaspe[tț]i/i, familie: 'cazare' },
    { re: /dormitor|camer[aă]\s*de\s*zi|living|buc[aă]t[aă]rie(?!\s*profesional)/i, familie: 'locuire' },
    { re: /buc[aă]t[aă]rie|sal[aă]\s*(de\s*)?mese|restaurant|oficiu|catering|bar\b/i, familie: 'alimentar' },
    { re: /hal[aă]\s*(de\s*)?produc[tț]ie|atelier|zon[aă]\s*vopsitorie/i, familie: 'productie' },
    { re: /grajd|adapost\s*animale|siloz|furaj|zootehnic/i, familie: 'agrozootehnic' },
    { re: /depozit|magazie|arhiv[aă]|marf[aă]/i, familie: 'depozitare' },
    { re: /vestiar/i, familie: 'personal' },
    { re: /g\.?s\.?\b|grup\s*sanitar|baie|toalet[aă]/i, familie: 'sanitare' },
    { re: /central[aă]\s*termic[aă]|camer[aă]\s*(compresoare|transformator|pompe)|tablou\s*electric|server/i, familie: 'tehnic' },
    { re: /rezervor|hidrant|sprinkler|idsi|psi\b/i, familie: 'minim' },
    { re: /sal[aă]\s*(de\s*)?sport|vestiar\s*sportiv/i, familie: 'sport' },
    { re: /sal[aă]\s*(de\s*)?clas[aă]|bibliotec[aă]|amfiteatru/i, familie: 'educational' },
    { re: /birou|recep[tț]ie|hol|lobby|coridor|sal[aă]\s*(de\s*)?[sș]edin[tț]e/i, familie: 'birou' }
  ];
  function _familieDinNume(nume) {
    var n = String(nume || '');
    for (var i = 0; i < DICTIONAR_NUME.length; i++) if (DICTIONAR_NUME[i].re.test(n)) return DICTIONAR_NUME[i].familie;
    return null;
  }

  // Mapare tip camera din motorul de relevee (js/15-relevee.js, rects[].t) -> familie de continut
  // combustibil. Sursa ASTA e mai buna decat genereazaCamereStandard() cand exista: geometria e cea
  // REALA trasata de proiectant pentru acest proiect anume (w x h in metri per camera), nu o estimare
  // generica din programul functional al tipului de cladire.
  var MAP_TIP_RELEVEE = {
    core: 'minim', hall: 'birou', reception: 'birou', office: 'birou', meeting: 'birou', commercial: 'depozitare',
    bedroom: 'locuire', living: 'locuire', kitchen: 'alimentar', bath: 'sanitare', wc: 'sanitare',
    storage: 'depozitare', balcon: 'minim'
  };

  // Genereaza camere din window._RV.floors (motorul de relevee — plan de nivel real trasat/generat in
  // aplicatie, cu rects[]={t,x,y,w,h,lbl,apt}). Auto-estimeaza, nu blocheaza: functioneaza pe ORICE
  // functiune, fiindca releveul insusi e generic (aceleasi chei t indiferent de tipul de cladire).
  function dinRelevee(floors) {
    if (!floors || !floors.length) return null;
    var camere = [];
    floors.forEach(function (floor, fi) {
      (floor.rects || []).forEach(function (r) {
        var arie = (+r.w || 0) * (+r.h || 0);
        if (!arie || arie < 1) return; // exclude markere/dreptunghiuri degenerate (zIdx decorative etc.)
        var familie = MAP_TIP_RELEVEE[r.t] || null;
        var nume = String(r.lbl || r.t || 'Încăpere').replace(/\n/g, ' ').replace(/[🪜🛗]/g, '').trim() + ' — nivel ' + (fi + 1);
        var c = calculeazaCamera({ nume: nume, arie_mp: Math.round(arie * 100) / 100, familie: familie }, {});
        c.sursa_sarcina = 'relevee (plan de nivel real, geometrie trasată în platformă, nivel ' + (fi + 1) + ') — ' + c.sursa_sarcina;
        camere.push(c);
      });
    });
    return camere.length ? camere : null;
  }

  // ---------------------------------------------------------------------------
  // 6. Calculul per încăpere — replică EXACTĂ a formulelor din Excel-ul sursă:
  //    G = Cantitate × Greutate;  I = G × Putere_calorică;  qi = ΣI / Arie
  // ---------------------------------------------------------------------------
  function _cantitate(item, arie) {
    if (item.per === 'mp') return arie;
    if (item.per === 'buc_per_mp') return Math.max(1, Math.round(arie / (item.la_mp || 10)));
    return item.buc || 1;
  }

  function calculeazaCamera(camera, opts) {
    opts = opts || {};
    var arie = +camera.arie_mp || 0;
    var detaliu = [];
    var total_mj = 0;

    // Rândul 1 (dacă e cunoscută): pardoseala REALĂ declarată pe plan — sursa cea mai
    // autoritară, are prioritate față de pardoseala implicită a familiei.
    var matPard = _pardoselaDin(camera.pardoseala) || null;
    var familie = camera.familie || _familieDinNume(camera.nume) || opts.familieImplicita || null;
    var prof = familie && FAMILII[familie] ? FAMILII[familie] : null;
    if (!matPard && prof && prof.pardoseala && camera.pardoseala == null) matPard = PARDOSEALA[prof.pardoseala];

    if (matPard) {
      var G_pard = arie * matPard.grosime * matPard.densitate;
      var I_pard = G_pard * matPard.pc;
      total_mj += I_pard;
      detaliu.push({
        nume: 'pardoseală — ' + matPard.eticheta, cantitate: arie, unitate: 'mp',
        greutate_kg: Math.round(matPard.grosime * matPard.densitate * 100) / 100,
        total_kg: Math.round(G_pard * 100) / 100, putere_calorica_mj_kg: matPard.pc,
        sarcina_termica_mj: Math.round(I_pard * 100) / 100
      });
    }

    // Restul rândurilor: conținutul combustibil standard al familiei de încăpere.
    if (prof) {
      prof.itemi.forEach(function (item) {
        var cant = _cantitate(item, arie);
        var G_it = cant * item.greutate;
        var pc = PC[item.material] || 0;
        var I_it = G_it * pc;
        total_mj += I_it;
        detaliu.push({
          nume: item.nume, cantitate: Math.round(cant * 100) / 100, unitate: (item.per === 'mp' ? 'mp' : 'buc'),
          greutate_kg: item.greutate, total_kg: Math.round(G_it * 100) / 100, putere_calorica_mj_kg: pc,
          sarcina_termica_mj: Math.round(I_it * 100) / 100
        });
      });
    }

    var densitate = arie > 0 ? total_mj / arie : 0;
    var risc = incadreazaRisc(densitate);
    return {
      nume: camera.nume || 'Încăpere', arie_mp: arie,
      sarcina_termica_mj: Math.round(total_mj * 100) / 100,
      densitate_mj_mp: Math.round(densitate * 10) / 10,
      risc_incadrare: risc,
      detaliu_materiale: detaliu,
      sursa_sarcina: prof
        ? ('inventar standard (' + (familie || '—') + ') mobilier/echipamente/cabluri' + (matPard && camera.pardoseala != null ? ' + pardoseală reală declarată' : matPard ? ' + pardoseală implicită familiei' : '') + ' — calibrează cu inventarul REAL la faza PT')
        : (matPard ? ('doar pardoseală declarată: ' + matPard.eticheta) : 'tip de încăpere neidentificat din denumire — fără inventar combustibil calculat (doar pardoseală, incombustibilă sau nedeclarată)')
    };
  }

  // ---------------------------------------------------------------------------
  // 7. Genereaza camere STANDARD dintr-o funcțiune, când nu există niciun plan/relevee
  // încărcat — folosește UXSpace.TIPOLOGII[functiune].baza(params) + UXSpace.SPACES[id]
  // pentru arie/etichetă/categorie. Rezultat etichetat clar ca ESTIMARE (nivel_certitudine
  // 'presupus_conservator', consecvent cu restul motorului SSI).
  // ---------------------------------------------------------------------------
  // js/urbanx-doc-engine.js FUNCTIUNI folosește chei putin diferite fata de
  // js/urbanx-space-program.js TIPOLOGII pt aceeasi functiune reala — aliniere explicita
  // (restul cheilor coincid deja 1:1 intre cele doua fisiere).
  var ALIAS_FUNCTIUNE = { 'hala-industriala': 'hala-logistica', 'hotelier': 'hotel', 'skid': 'skid-gpl' };
  function genereazaCamereStandard(functiune, params) {
    if (!G.UXSpace) return null;
    var camere = null;
    // Sursa 1: UXSpace.TIPOLOGII+SPACES (catalog simplu, id-based).
    if (G.UXSpace.TIPOLOGII && G.UXSpace.SPACES) {
      var tip = G.UXSpace.TIPOLOGII[functiune] || G.UXSpace.TIPOLOGII[ALIAS_FUNCTIUNE[functiune]];
      if (tip && typeof tip.baza === 'function') {
        try {
          var lista = tip.baza(params || {}) || [];
          var vazute = {}; camere = [];
          lista.forEach(function (s) {
            if (vazute[s.id]) return; // un singur rând reprezentativ per tip unic de spațiu (nu explodăm qty în N rânduri identice)
            vazute[s.id] = true;
            var sp = G.UXSpace.SPACES[s.id];
            var arie = +s.mp || (sp ? (sp.mp_rec || sp.mp_min) : null);
            if (!arie) return;
            var familie = OVERRIDE_ID[s.id] || (sp && MAP_CATEGORIE[sp.cat]) || null;
            var nume = (sp ? sp.label : s.id) + (s.qty > 1 ? (' (tipic, ×' + s.qty + ' unități)') : '');
            var c = calculeazaCamera({ nume: nume, arie_mp: arie, familie: familie }, {});
            c.estimat = true; c.nivel_certitudine = 'presupus_conservator';
            camere.push(c);
          });
        } catch (e) { camere = null; }
      }
    }
    // Sursa 2 (fallback, 17 iul — bug real gasit: TIPOLOGII nu are 'centru-social', genereazaCamereStandard
    // returna gol/null pt aceasta functiune): UXSpace.TEMPLATES/propune() — catalogul mai bogat al
    // programului funcțional (norme reale citate per spațiu, ex. Ord. MMJS 29/2019, sub-variante pe
    // categorie de beneficiari) — folosește ACELAȘI motor ca panoul de program funcțional al platformei.
    if ((!camere || !camere.length) && G.UXSpace.hasTemplate) {
      var functiuneTpl = ALIAS_FUNCTIUNE[functiune] || functiune;
      if (G.UXSpace.hasTemplate(functiuneTpl)) {
        try {
          var spatii = G.UXSpace.propune(functiuneTpl, params || {}) || [];
          var vazuteNume = {}; var camere2 = [];
          spatii.forEach(function (s) {
            if (vazuteNume[s.nume]) return; vazuteNume[s.nume] = true;
            if (!s.mp_unit) return;
            var c = calculeazaCamera({ nume: s.nume, arie_mp: s.mp_unit }, {});
            c.estimat = true; c.nivel_certitudine = 'presupus_conservator';
            camere2.push(c);
          });
          if (camere2.length) camere = camere2;
        } catch (e) { /* pastreaza camere din sursa 1 (poate fi null) */ }
      }
    }
    return camere;
  }

  // ---------------------------------------------------------------------------
  // 8. TIMPI DE INTERVENȚIE ISU — cascadă T1..T14, aceeași structură ca foaia "timpi" din
  // Excel-ul sursă. CORECȚIE față de sursă: formula T5 din fișierul original însuma
  // T2+T3+T3 (referință B6 dublată — eroare vizibilă de drag-fill în Excel); aici se
  // calculează CORECT T5 = T2+T3+T4 (timp de răspuns = alertare+deplasare+intrare în
  // acțiune), conform definiției standard din metodologia de intervenție ISU.
  // ---------------------------------------------------------------------------
  var TIMPI_IMPLICIT = {
    T1: 1,   // timp de alarmare (min) — implicit normat, de regulă necorelat cu proiectul
    T2: 3,   // timp de alertare (min) — implicit normat (dispecerat → subunitate)
    T3: null, // timp de deplasare (min) — SE ESTIMEAZĂ din distanța la subunitatea ISU (vezi mai jos)
    T4: 5,   // timp de intrare în acțiune a forțelor (min) — implicit normat
    T7: 10,  // timp de evacuare (min) — implicit; se dublează la funcțiuni cu persoane needeplasabile
    T8: 10,  // timp de localizare (min)
    T9: 20,  // timp de stingere (min) — bază; crește cu riscul/aria compartimentului (vezi mai jos)
    T10: 10, // timp de înlăturare a efectelor negative ale incendiului (min)
    T12: 10  // timp de retragere (min)
  };
  function calculeazaTimpiInterventie(inputs) {
    inputs = inputs || {};
    var estimatT3 = false;
    var T3 = inputs.T3;
    if (T3 == null) {
      if (inputs.distanta_isu_km != null) {
        var viteza = inputs.viteza_medie_kmh || 40; // km/h, viteză medie autospecială în mediu urban/rural mixt
        T3 = Math.round((inputs.distanta_isu_km / viteza) * 60 * 10) / 10;
      } else {
        T3 = 15; estimatT3 = true; // fallback conservator când nu se cunoaște distanța reală la ISU
      }
    }
    var T1 = inputs.T1 != null ? inputs.T1 : TIMPI_IMPLICIT.T1;
    var T2 = inputs.T2 != null ? inputs.T2 : TIMPI_IMPLICIT.T2;
    var T4 = inputs.T4 != null ? inputs.T4 : TIMPI_IMPLICIT.T4;
    var T7 = inputs.T7 != null ? inputs.T7 : (inputs.persoane_needeplasabile ? TIMPI_IMPLICIT.T7 * 2 : TIMPI_IMPLICIT.T7);
    var T8 = inputs.T8 != null ? inputs.T8 : TIMPI_IMPLICIT.T8;
    var T9 = inputs.T9 != null ? inputs.T9 : (function () {
      var baza = TIMPI_IMPLICIT.T9;
      var arie = inputs.arie_compartiment_mp || 0;
      var sporRisc = { mare: 10, 'foarte mare': 20 }[inputs.risc] || 0;
      var sporArie = Math.min(20, Math.round(arie / 500) * 2);
      return baza + sporRisc + sporArie;
    })();
    var T10 = inputs.T10 != null ? inputs.T10 : TIMPI_IMPLICIT.T10;
    var T12 = inputs.T12 != null ? inputs.T12 : TIMPI_IMPLICIT.T12;

    var T5 = T2 + T3 + T4;                  // timp de răspuns
    var T6 = T1 + T5;                       // timp de începere a intervenției
    var T11 = T7 + T8 + T9 + T10;           // timp de intervenție
    var T13 = T5 + T11 + T12;               // timp de ocupare a forțelor și mijloacelor
    var T14 = T3 + T13;                     // timp total de dislocare a forțelor și mijloacelor de intervenție

    return {
      randuri: [
        { id: 'T1', min: T1, eticheta: 'timp de alarmare', formula: null },
        { id: 'T2', min: T2, eticheta: 'timp de alertare', formula: null },
        { id: 'T3', min: T3, eticheta: 'timp de deplasare', formula: estimatT3 ? 'estimare implicită (fără distanță ISU declarată)' : (inputs.distanta_isu_km != null ? ('distanță ' + inputs.distanta_isu_km + ' km / viteză ' + (inputs.viteza_medie_kmh || 40) + ' km/h') : null) },
        { id: 'T4', min: T4, eticheta: 'timp de intrare în acțiune a forțelor', formula: null },
        { id: 'T5', min: T5, eticheta: 'timp de răspuns', formula: 'T2+T3+T4' },
        { id: 'T6', min: T6, eticheta: 'timp de începere a intervenției', formula: 'T1+T5' },
        { id: 'T7', min: T7, eticheta: 'timp de evacuare', formula: null },
        { id: 'T8', min: T8, eticheta: 'timp de localizare', formula: null },
        { id: 'T9', min: T9, eticheta: 'timp de stingere', formula: null },
        { id: 'T10', min: T10, eticheta: 'timp de înlăturare a efectelor negative ale incendiului', formula: null },
        { id: 'T11', min: T11, eticheta: 'timp de intervenție', formula: 'T7+T8+T9+T10' },
        { id: 'T12', min: T12, eticheta: 'timp de retragere', formula: null },
        { id: 'T13', min: T13, eticheta: 'timp de ocupare a forțelor și mijloacelor', formula: 'T5+T11+T12' },
        { id: 'T14', min: T14, eticheta: 'timp total de dislocare a forțelor și mijloacelor de intervenție', formula: 'T3+T13' }
      ],
      T14_total_min: T14, estimat_T3: estimatT3
    };
  }

  G.SSI_SARCINA_TERMICA = {
    PC: PC, FAMILII: FAMILII, MAP_CATEGORIE: MAP_CATEGORIE,
    incadreazaRisc: incadreazaRisc,
    calculeazaCamera: calculeazaCamera,
    genereazaCamereStandard: genereazaCamereStandard,
    dinRelevee: dinRelevee,
    calculeazaTimpiInterventie: calculeazaTimpiInterventie
  };
  console.log('[SSI] motor sarcină termică (inventar complet încăpere) + timpi de intervenție ISU încărcat (window.SSI_SARCINA_TERMICA)');
})(window);
