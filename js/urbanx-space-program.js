/* ============================================================================
 * UrbanX — Program funcțional (space program) editabil + dimensionare automată
 * Model: sistemul PROPUNE lista de spații (din normative + capacitate) →
 *        utilizatorul EDITEAZĂ → totul se recalculează (bilanț Su/Sc/Sd, POT/CUT,
 *        memorii, antemăsurători, AEDIS).
 * window.UXSpace: TEMPLATES, propune(fn, params), bilant(spatii)
 * ========================================================================== */
(function (G) {
  'use strict';

  // Catalog normativ per funcțiune. Fiecare spațiu la o CAPACITATE DE REFERINȚĂ.
  //  scal: 'fix'  → suprafața rămâne constantă indiferent de capacitate
  //        'lin'  → suprafața scalează liniar cu (capacitate / cap_ref)
  //        'pas'  → nr. bucăți scalează în trepte (o unitate la fiecare `la` beneficiari)
  //  mp = suprafață utilă unitară (mp); buc = nr. unități la capacitatea de referință
  var TEMPLATES = {
    'centru-social': {
      driver: 'capacitate', unit: 'beneficiari', cap_ref: 50, cap_default: 50,
      norma: 'Ord. MMJS 29/2019 (standarde centre de zi vârstnici) · NP 011 · OMS 119/2014 · NP 051/2012',
      spatii: [
        // zonă, denumire, nivel, buc, mp unitar (la cap_ref), scalare, ocupanți, obligatoriu
        { zona: 'Primire', nume: 'Windfang / tampon acces', niv: 'P', buc: 1, mp: 6.5, scal: 'fix', ocup: 0, ob: 1 },
        { zona: 'Primire', nume: 'Hol primire / recepție', niv: 'P', buc: 1, mp: 42, scal: 'lin', ocup: 10, ob: 1 },
        { zona: 'Primire', nume: 'Post primire / registratură', niv: 'P', buc: 1, mp: 9, scal: 'fix', ocup: 1, ob: 1 },
        { zona: 'Administrativ', nume: 'Birou asistent social', niv: 'P', buc: 1, mp: 14, scal: 'fix', ocup: 2, ob: 1 },
        { zona: 'Administrativ', nume: 'Birou psiholog / consiliere', niv: 'P', buc: 1, mp: 12.5, scal: 'fix', ocup: 2, ob: 1 },
        { zona: 'Medical', nume: 'Cabinet medical', niv: 'P', buc: 1, mp: 16, scal: 'fix', ocup: 3, ob: 1 },
        { zona: 'Medical', nume: 'Sală tratamente', niv: 'P', buc: 1, mp: 12, scal: 'fix', ocup: 2, ob: 0 },
        { zona: 'Recuperare', nume: 'Sală kinetoterapie', niv: 'P', buc: 1, mp: 60, scal: 'lin', ocup: 12, ob: 1 },
        { zona: 'Recuperare', nume: 'Vestiar + duș kineto (PMR)', niv: 'P', buc: 1, mp: 8, scal: 'fix', ocup: 2, ob: 0 },
        { zona: 'Masă', nume: 'Sală de mese / servire', niv: 'P', buc: 1, mp: 90, scal: 'lin', ocup: 50, ob: 1 },
        { zona: 'Masă', nume: 'Oficiu de distribuție', niv: 'P', buc: 1, mp: 14, scal: 'fix', ocup: 2, ob: 1 },
        { zona: 'Bloc alimentar', nume: 'Bucătărie — preparare la cald', niv: 'P', buc: 1, mp: 22, scal: 'lin', ocup: 3, ob: 1 },
        { zona: 'Bloc alimentar', nume: 'Recepție / curățare alimente', niv: 'P', buc: 1, mp: 10, scal: 'fix', ocup: 1, ob: 1 },
        { zona: 'Bloc alimentar', nume: 'Spălare vase', niv: 'P', buc: 1, mp: 9, scal: 'fix', ocup: 1, ob: 1 },
        { zona: 'Bloc alimentar', nume: 'Depozit alimente + spațiu răcit', niv: 'P', buc: 1, mp: 11, scal: 'lin', ocup: 0, ob: 1 },
        { zona: 'Sanitare', nume: 'GS beneficiari femei', niv: 'P', buc: 1, mp: 12, scal: 'pas', la: 15, ocup: 0, ob: 1 },
        { zona: 'Sanitare', nume: 'GS beneficiari bărbați', niv: 'P', buc: 1, mp: 11, scal: 'pas', la: 15, ocup: 0, ob: 1 },
        { zona: 'Sanitare', nume: 'GS adaptat PMR (parter)', niv: 'P', buc: 1, mp: 4.5, scal: 'fix', ocup: 0, ob: 1 },
        { zona: 'Tehnic', nume: 'Cameră curățenie parter', niv: 'P', buc: 1, mp: 3.5, scal: 'fix', ocup: 0, ob: 1 },
        { zona: 'Tehnic', nume: 'Spațiu tehnic — centrală termică', niv: 'P', buc: 1, mp: 12, scal: 'fix', ocup: 0, ob: 1 },
        // ETAJ
        { zona: 'Activități', nume: 'Sală activități polivalentă', niv: 'E', buc: 2, mp: 50, scal: 'pas', la: 25, ocup: 22, ob: 1 },
        { zona: 'Activități', nume: 'Atelier ergoterapie', niv: 'E', buc: 1, mp: 36, scal: 'lin', ocup: 12, ob: 1 },
        { zona: 'Activități', nume: 'Sală lectură / bibliotecă', niv: 'E', buc: 1, mp: 24, scal: 'fix', ocup: 12, ob: 0 },
        { zona: 'Activități', nume: 'Sală odihnă / relaxare', niv: 'E', buc: 1, mp: 30, scal: 'lin', ocup: 12, ob: 1 },
        { zona: 'Administrativ', nume: 'Birou coordonator centru', niv: 'E', buc: 1, mp: 15, scal: 'fix', ocup: 2, ob: 1 },
        { zona: 'Administrativ', nume: 'Birou administrativ / contabil', niv: 'E', buc: 1, mp: 14, scal: 'fix', ocup: 2, ob: 0 },
        { zona: 'Personal', nume: 'Vestiar personal femei + duș', niv: 'E', buc: 1, mp: 12, scal: 'pas', la: 20, ocup: 8, ob: 1 },
        { zona: 'Personal', nume: 'Vestiar personal bărbați + duș', niv: 'E', buc: 1, mp: 9, scal: 'pas', la: 30, ocup: 5, ob: 1 },
        { zona: 'Sanitare', nume: 'GS beneficiari etaj', niv: 'E', buc: 2, mp: 8.5, scal: 'pas', la: 15, ocup: 0, ob: 1 },
        { zona: 'Sanitare', nume: 'GS adaptat PMR (etaj)', niv: 'E', buc: 1, mp: 4.5, scal: 'fix', ocup: 0, ob: 1 },
        { zona: 'Tehnic', nume: 'Spălătorie / lenjerie', niv: 'E', buc: 1, mp: 14, scal: 'lin', ocup: 2, ob: 1 },
        { zona: 'Tehnic', nume: 'Depozit materiale / lenjerie', niv: 'E', buc: 1, mp: 13, scal: 'lin', ocup: 0, ob: 0 }
      ]
    }
  };

  // Propune programul de spații pentru o funcțiune + capacitate. Întoarce array de rânduri editabile.
  function propune(fn, params) {
    var tpl = TEMPLATES[fn]; if (!tpl) return null;
    var cap = Math.max(1, +(params && params.capacitate) || tpl.cap_default);
    var k = cap / tpl.cap_ref;
    return tpl.spatii.map(function (s) {
      var buc = s.buc, mp = s.mp;
      if (s.scal === 'lin') mp = Math.round(s.mp * k * 10) / 10;
      else if (s.scal === 'pas' && s.la) buc = Math.max(s.buc, Math.ceil(cap / s.la) * (s.buc / Math.max(1, Math.ceil(tpl.cap_ref / s.la))) || s.buc);
      buc = Math.max(1, Math.round(buc));
      return { zona: s.zona, nume: s.nume, niv: s.niv, buc: buc, mp_unit: mp, ocup: s.ocup || 0, ob: !!s.ob };
    });
  }

  // Bilanț: Su total, pe niveluri, Sc/Sd estimate (Su/Sd ≈ 0,80), verificare mp/beneficiar.
  function bilant(spatii, params) {
    var cap = Math.max(1, +(params && params.capacitate) || 0);
    var suP = 0, suE = 0, ocupMax = 0, suBenef = 0;
    var zonaBenef = { 'Primire': 1, 'Masă': 1, 'Recuperare': 1, 'Activități': 1 };
    (spatii || []).forEach(function (r) {
      var st = (+r.buc || 0) * (+r.mp_unit || 0);
      if (r.niv === 'E') suE += st; else suP += st;
      ocupMax += (+r.ocup || 0) * (+r.buc || 0);
      if (zonaBenef[r.zona]) suBenef += st;
    });
    var su = suP + suE;
    var coef = 0.80; // Su/Sd pt dotări sociale (circulații + pereți)
    var sd = su ? Math.round(su / coef) : 0;
    var niveluri = suE > 0 ? 2 : 1;
    var sc = niveluri ? Math.round(sd / niveluri) : 0;
    return {
      su: Math.round(su), suP: Math.round(suP), suE: Math.round(suE), sd: sd, sc: sc, niveluri: niveluri,
      ocupMax: ocupMax, suBenef: Math.round(suBenef),
      mp_benef: cap ? Math.round(suBenef / cap * 10) / 10 : 0,
      mp_benef_min: 4.0 // Ord. 29/2019
    };
  }

  // ===========================================================================
  // MOTOR DE REGULI — bibliotecă de SPAȚII atomice + rezolvarea dependențelor.
  // Model: NU AI inventează camere; bază de date de reguli codificate din
  // normative reale. Schema spațiu (Florin): mp_min/mp_rec, normativ, genereaza[]
  // (spații auto-incluse), inst[], deviz[], avize[], psi{}. share=true → spațiu
  // partajabil (o singură instanță chiar dacă mai multe spații îl generează).
  // ===========================================================================
  var SPACES = {
    // --- alimentar (bucătărie profesională + auxiliare — HG 924/2005 HACCP) ---
    bucatarie_profesionala: { label: 'Bucătărie profesională', cat: 'Alimentar', mp_min: 40, mp_rec: 65, normativ: 'HG 924/2005 (HACCP) + Ord. MS 976/1998', genereaza: ['depozit_uscat', 'depozit_frigorific', 'spalator_vase', 'pregatire_carne', 'pregatire_legume', 'camera_deseuri', 'vestiare_personal'], inst: ['IS_apa_calda', 'ventilatie_hota', 'gaze'], deviz: ['echip_bucatarie_prof', 'hota_inox', 'sifon_pardoseala'], avize: ['DSP'], psi: { cat: 'B', detector: 'termic', sting: 'CO2/clasa F' } },
    depozit_uscat: { label: 'Depozit uscat alimente', cat: 'Alimentar', mp_min: 12, mp_rec: 15, normativ: 'Ord. MS 976/1998' },
    depozit_frigorific: { label: 'Depozit frigorific', cat: 'Alimentar', mp_min: 8, mp_rec: 12, normativ: 'Ord. MS 976/1998', inst: ['IF_frig'] },
    spalator_vase: { label: 'Spălător vase', cat: 'Alimentar', mp_min: 10, mp_rec: 12, normativ: 'HG 924/2005', inst: ['IS_apa_calda'] },
    pregatire_carne: { label: 'Pregătire carne', cat: 'Alimentar', mp_min: 6, mp_rec: 8, normativ: 'ANSVSA — circuit separat' },
    pregatire_legume: { label: 'Pregătire legume', cat: 'Alimentar', mp_min: 6, mp_rec: 8, normativ: 'ANSVSA — circuit separat' },
    camera_deseuri: { label: 'Cameră deșeuri', cat: 'Tehnic', mp_min: 6, mp_rec: 8, share: true, normativ: 'OMS 119/2014', inst: ['ventilatie'] },
    vestiare_personal: { label: 'Vestiare personal + filtru', cat: 'Personal', mp_min: 8, mp_rec: 14, share: true, normativ: 'Legea 319/2006 SSM' },
    // --- medical (RMN — Ord. MS 914 + IEC 60601-2-33) ---
    rmn: { label: 'Sală RMN', cat: 'Medical', mp_min: 30, mp_rec: 40, normativ: 'Ord. MS 914/2006 + IEC 60601-2-33', genereaza: ['rmn_comanda', 'rmn_tehnica', 'rmn_racire', 'rmn_ups', 'rmn_zona_protectie'], inst: ['climatizare_dedicata_20C', 'UPS', 'grup_electrogen', 'ecranare_RF'], deviz: ['cusca_faraday', 'climatizare_precizie'], avize: ['DSP', 'CNCAN'], psi: { cat: 'C', detector: 'aspirativ', sting: 'gazos' } },
    rmn_comanda: { label: 'Cameră comandă RMN', cat: 'Medical', mp_min: 12, mp_rec: 16, normativ: 'IEC 60601-2-33' },
    rmn_tehnica: { label: 'Cameră tehnică RMN', cat: 'Tehnic', mp_min: 20, mp_rec: 24, normativ: 'IEC 60601-2-33' },
    rmn_racire: { label: 'Cameră răcire (chillere)', cat: 'Tehnic', mp_min: 10, mp_rec: 14, normativ: 'fișă echipament', inst: ['racire_apa'] },
    rmn_ups: { label: 'Cameră UPS', cat: 'Tehnic', mp_min: 8, mp_rec: 10, share: true, normativ: 'I7/2011', inst: ['UPS'] },
    rmn_zona_protectie: { label: 'Zonă protecție câmp magnetic (5 m)', cat: 'Medical', mp_min: 0, mp_rec: 0, normativ: 'IEC 60601-2-33 (linia 0,5 mT)' },
    // --- server / IT ---
    camera_server: { label: 'Cameră server / IT', cat: 'Tehnic', mp_min: 8, mp_rec: 14, share: true, normativ: 'I7/2011 + TIA-942', inst: ['climatizare_precizie', 'UPS'], deviz: ['pardoseala_suprainaltata', 'climatizare_precizie', 'UPS'], psi: { cat: 'C', detector: 'aspirativ_VESDA', sting: 'gazos/inertizare' } },
    // --- hală producție / logistică ---
    hala_productie: { label: 'Hală producție', cat: 'Producție', mp_min: 200, mp_rec: 1000, dim: 'param', normativ: 'NP 011 + Legea 319/2006', genereaza: ['laborator_ctc', 'camera_compresoare', 'camera_transformator', 'atelier_mentenanta', 'magazie_piese', 'punct_prim_ajutor'], inst: ['IE_forta', 'aer_comprimat', 'ventilatie'], psi: { cat: 'C-D', detector: 'termic', sting: 'hidranți' } },
    laborator_ctc: { label: 'Laborator control calitate (CTC)', cat: 'Producție', mp_min: 20, mp_rec: 30, normativ: 'proces tehnologic' },
    camera_compresoare: { label: 'Cameră compresoare', cat: 'Tehnic', mp_min: 10, mp_rec: 16, normativ: 'ISCIR', inst: ['aer_comprimat'] },
    camera_transformator: { label: 'Cameră transformator MT/JT', cat: 'Tehnic', mp_min: 12, mp_rec: 20, normativ: 'NTE 001 + I7', inst: ['IE_MT'] },
    atelier_mentenanta: { label: 'Atelier mentenanță', cat: 'Producție', mp_min: 15, mp_rec: 25, normativ: 'Legea 319/2006' },
    magazie_piese: { label: 'Magazie piese de schimb', cat: 'Depozitare', mp_min: 10, mp_rec: 20, normativ: '—' },
    punct_prim_ajutor: { label: 'Punct prim ajutor', cat: 'Personal', mp_min: 8, mp_rec: 10, share: true, normativ: 'Legea 319/2006 SSM' },
    depozit: { label: 'Depozit / hală depozitare', cat: 'Depozitare', mp_min: 50, mp_rec: 500, dim: 'param', normativ: 'NP 011 + P118', inst: ['ventilatie'] },
    // --- spații generate de reguli condiționate (praguri) ---
    idsi: { label: 'IDSI — detectare-semnalizare incendiu', cat: 'PSI', mp_min: 0, mp_rec: 0, normativ: 'P118-3/2015', inst: ['IDSAI'] },
    camera_psi: { label: 'Cameră PSI / centrală semnalizare', cat: 'PSI', mp_min: 6, mp_rec: 10, share: true, normativ: 'P118-2/3' },
    statie_pompe_incendiu: { label: 'Stație pompe incendiu', cat: 'PSI', mp_min: 15, mp_rec: 25, normativ: 'P118-2/2013', inst: ['stingere_incendiu'] },
    rezervor_incendiu: { label: 'Rezervor apă incendiu', cat: 'PSI', mp_min: 20, mp_rec: 40, normativ: 'P118-2/2013' },
    trape_shev: { label: 'Trape desfumare SHEV', cat: 'PSI', mp_min: 0, mp_rec: 0, normativ: 'P118-2 (min. 0,5% Sc)' },
    sprinklere: { label: 'Instalație sprinklere', cat: 'PSI', mp_min: 0, mp_rec: 0, normativ: 'SR EN 12845', inst: ['stingere_sprinkler'] },
    lift: { label: 'Ascensor', cat: 'Circulații', mp_min: 4, mp_rec: 6, normativ: 'ISCIR PT R2 + NP 051', inst: ['IE'] },
    camera_masini_lift: { label: 'Cameră mașini lift', cat: 'Tehnic', mp_min: 6, mp_rec: 8, normativ: 'ISCIR PT R2 (dacă nu MRL)' },
    adapost_ala: { label: 'Adăpost de protecție civilă (ALA)', cat: 'Tehnic', mp_min: 20, mp_rec: 40, normativ: 'Legea 132/1997 + HG 862/2016' },
    presurizare_scari: { label: 'Presurizare casă scări', cat: 'PSI', mp_min: 0, mp_rec: 0, normativ: 'P118-2 (H>28m)', inst: ['presurizare'] },
    hidranti_niv: { label: 'Hidranți interiori pe niveluri', cat: 'PSI', mp_min: 0, mp_rec: 0, normativ: 'P118-2', inst: ['stingere_incendiu'] },
    camera_contoare: { label: 'Cameră contoare', cat: 'Tehnic', mp_min: 4, mp_rec: 6, share: true, normativ: 'norme operatori utilități' },
    // --- sală sport publică (NP 051 + Ord. MTS) ---
    sala_sport: { label: 'Sală de sport', cat: 'Sport', mp_min: 200, mp_rec: 540, dim: 'param', normativ: 'NP 010 / Ord. MTS', genereaza: ['vestiar_sportivi', 'vestiar_arbitri', 'gs_public', 'camera_materiale_sport', 'punct_prim_ajutor'] },
    vestiar_sportivi: { label: 'Vestiare sportivi (×2)', cat: 'Sport', mp_min: 30, mp_rec: 40, normativ: 'Ord. MTS' },
    vestiar_arbitri: { label: 'Vestiar arbitri', cat: 'Sport', mp_min: 8, mp_rec: 10, normativ: 'Ord. MTS' },
    gs_public: { label: 'Grup sanitar public', cat: 'Sanitare', mp_min: 12, mp_rec: 20, share: true, normativ: 'NP 051/2012' },
    camera_materiale_sport: { label: 'Cameră materiale sportive', cat: 'Sport', mp_min: 10, mp_rec: 16, normativ: '—' },
    // --- medical extins (sală operație, laborator analize) — Ord. MS 914/2006 ---
    sala_operatie: { label: 'Sală de operație', cat: 'Medical', mp_min: 30, mp_rec: 42, normativ: 'Ord. MS 914/2006 + NP 015-1997', genereaza: ['sala_pregatire_preop', 'sala_trezire_postop', 'sterilizare_centrala', 'depozit_materiale_sterile', 'camera_deseuri_med', 'vestiar_medical_curat', 'vestiar_medical_murdar'], inst: ['climatizare_curata_ISO5', 'gaze_medicale', 'UPS', 'HEPA_H14'], avize: ['DSP', 'MS'], psi: { cat: 'C', detector: 'VESDA', sting: 'gazos clean-agent' } },
    sala_pregatire_preop: { label: 'Sală pregătire preoperatorie', cat: 'Medical', mp_min: 15, mp_rec: 18, normativ: 'Ord. MS 914/2006' },
    sala_trezire_postop: { label: 'Sală trezire postoperatorie', cat: 'Medical', mp_min: 20, mp_rec: 24, normativ: 'Ord. MS 914/2006' },
    sterilizare_centrala: { label: 'Sterilizare centrală', cat: 'Medical', mp_min: 30, mp_rec: 35, normativ: 'Ord. MS 914/2006', inst: ['abur', 'apa_dedurizata'] },
    depozit_materiale_sterile: { label: 'Depozit materiale sterile', cat: 'Medical', mp_min: 10, mp_rec: 14, normativ: 'Ord. MS 914/2006' },
    camera_deseuri_med: { label: 'Cameră deșeuri medicale periculoase (18 01)', cat: 'Medical', mp_min: 8, mp_rec: 10, share: true, normativ: 'Ord. MS 1226/2012', avize: ['DSP', 'APM'] },
    vestiar_medical_curat: { label: 'Vestiar personal medical (curat)', cat: 'Personal', mp_min: 12, mp_rec: 14, normativ: 'Ord. MS 914/2006' },
    vestiar_medical_murdar: { label: 'Vestiar personal medical (murdar)', cat: 'Personal', mp_min: 10, mp_rec: 12, normativ: 'Ord. MS 914/2006' },
    laborator_analize: { label: 'Laborator analize medicale', cat: 'Medical', mp_min: 25, mp_rec: 40, normativ: 'Ord. MS 914/2006 + Ord. MS 1301/2007', genereaza: ['sala_recoltare', 'camera_reactivi', 'camera_deseuri_periculoase_lab'], inst: ['hota_chimica', 'apa_distilata', 'depresiune_aer'], avize: ['DSP', 'APM'] },
    sala_recoltare: { label: 'Sală recoltare', cat: 'Medical', mp_min: 15, mp_rec: 18, normativ: 'Ord. MS 914/2006' },
    camera_reactivi: { label: 'Depozit reactivi (ventilat, securizat)', cat: 'Medical', mp_min: 8, mp_rec: 10, normativ: 'Ord. MS 1301/2007', inst: ['hota_chimica'] },
    camera_deseuri_periculoase_lab: { label: 'Cameră deșeuri periculoase laborator', cat: 'Medical', mp_min: 6, mp_rec: 8, share: true, normativ: 'Ord. MS 1226/2012' },
    // --- industrial: vopsitorie ATEX (SR EN 60079 + Dir. 2014/34/UE) ---
    zona_vopsitorie: { label: 'Zonă vopsitorie / lăcuire (ATEX)', cat: 'Producție', mp_min: 20, mp_rec: 40, normativ: 'SR EN 60079 + Dir. ATEX 2014/34/UE', genereaza: ['cabina_vopsire', 'camera_mixare_vopsele', 'depozit_solventi'], inst: ['ventilatie_antiex', 'instalatie_electrica_Ex'], deviz: ['cabina_vopsire_antiex'], avize: ['ISU', 'ITM', 'APM'], psi: { cat: 'A-B', detector: 'gaz solvenți', sting: 'sprinklere/CO2' }, doc: ['evaluare_ATEX_DIPE', 'clasificare_zone_Ex'] },
    cabina_vopsire: { label: 'Cabină de vopsire (antiex, ATEX 1)', cat: 'Producție', mp_min: 20, mp_rec: 30, normativ: 'SR EN 60079', inst: ['ventilatie_antiex'] },
    camera_mixare_vopsele: { label: 'Cameră mixare vopsele (ATEX 1)', cat: 'Producție', mp_min: 10, mp_rec: 14, normativ: 'SR EN 60079', inst: ['ventilatie_antiex'] },
    depozit_solventi: { label: 'Depozit solvenți (REI 120, ATEX 2)', cat: 'Depozitare', mp_min: 8, mp_rec: 12, normativ: 'P118 + SR EN 60079' },
    // --- energie: SKID GPL (NTPEE + ATEX + ISCIR) ---
    skid_gpl: { label: 'SKID GPL / stație', cat: 'Energie', mp_min: 20, mp_rec: 60, dim: 'param', normativ: 'NTPEE + ISCIR PT C7 + NFPA 58 + ATEX', genereaza: ['zona_protectie_gpl', 'camin_vane_gpl', 'imprejmuire_skid'], inst: ['detectie_gaz_Ex', 'paratrasnete_dedicate'], avize: ['ISU', 'ANRE', 'ISCIR', 'APM'], psi: { cat: 'A', detector: 'gaz Ex', sting: 'apă pulverizată/CO2' }, doc: ['DIPE_ATEX', 'autorizare_ANRE', 'autorizare_IGSU', 'autorizare_ISCIR', 'scoatere_circuit_agricol'] },
    zona_protectie_gpl: { label: 'Zonă protecție GPL (3 m perimetru, ATEX 2)', cat: 'Energie', mp_min: 0, mp_rec: 0, normativ: 'NFPA 58 + NTPEE' },
    camin_vane_gpl: { label: 'Cămin vane GPL', cat: 'Energie', mp_min: 2, mp_rec: 4, normativ: 'ISCIR PT C7' },
    imprejmuire_skid: { label: 'Împrejmuire skid (gard H=1,8m, avertizare)', cat: 'Energie', mp_min: 0, mp_rec: 0, normativ: 'Ord. IGSU 87/2010' },
    // --- sport: bazin înot ---
    bazin_inot: { label: 'Bazin de înot', cat: 'Sport', mp_min: 200, mp_rec: 500, dim: 'param', normativ: 'NP 010 + Ord. MTS + Ord. MS 119/2014', genereaza: ['sala_tratare_apa', 'camera_pompe_bazin', 'depozit_chimicale', 'vestiar_sportivi', 'gs_public'], inst: ['tratare_apa_clor', 'ventilatie_dezumidificare'], avize: ['DSP', 'ISU'] },
    sala_tratare_apa: { label: 'Sală tratare apă (clor, pH — ATEX)', cat: 'Sport', mp_min: 40, mp_rec: 50, normativ: 'Ord. MS 119/2014', inst: ['ventilatie_antiex'] },
    camera_pompe_bazin: { label: 'Cameră pompe bazin', cat: 'Tehnic', mp_min: 20, mp_rec: 25, normativ: 'I9' },
    depozit_chimicale: { label: 'Depozit chimicale (ventilat, impermeabil)', cat: 'Tehnic', mp_min: 8, mp_rec: 10, normativ: 'Ord. MS 119/2014' },
    // --- educațional: laborator chimie școală (NP 010 + DSP) ---
    laborator_chimie: { label: 'Laborator chimie școlar', cat: 'Educațional', mp_min: 70, mp_rec: 80, normativ: 'NP 010-1997', genereaza: ['depozit_reactivi_chimici', 'camera_pregatire_chimie'], inst: ['hota_chimica', 'statie_neutralizare'], avize: ['DSP', 'APM', 'ISU'] },
    depozit_reactivi_chimici: { label: 'Depozit reactivi chimici (securizat, ventilat)', cat: 'Educațional', mp_min: 8, mp_rec: 10, normativ: 'NP 010 + Ord. MS' },
    camera_pregatire_chimie: { label: 'Cameră pregătire experimente chimie', cat: 'Educațional', mp_min: 10, mp_rec: 12, normativ: 'NP 010' },
    sala_clasa: { label: 'Sală de clasă', cat: 'Educațional', mp_min: 50, mp_rec: 56, normativ: 'NP 010-1997 (1,8 mp/elev)' },
    // --- comune (hotel, birouri, locuințe) ---
    receptie: { label: 'Recepție', cat: 'Primire', mp_min: 10, mp_rec: 20, normativ: '—' },
    lobby: { label: 'Lobby / spațiu așteptare', cat: 'Primire', mp_min: 20, mp_rec: 60, dim: 'param', normativ: '—' },
    restaurant: { label: 'Restaurant / sală servire', cat: 'Alimentar', mp_min: 40, mp_rec: 120, dim: 'param', normativ: '1,2-1,5 mp/loc' },
    camera_hotel: { label: 'Cameră cazare', cat: 'Cazare', mp_min: 16, mp_rec: 22, normativ: 'Ord. ANT 65/2013 (clasificare)' },
    housekeeping: { label: 'Housekeeping / oficiu etaj', cat: 'Personal', mp_min: 6, mp_rec: 10, normativ: '—' },
    spalatorie: { label: 'Spălătorie / lenjerie', cat: 'Tehnic', mp_min: 12, mp_rec: 25, dim: 'param', normativ: 'circuit lenjerie', inst: ['IS_apa_calda'] },
    centrala_termica: { label: 'Centrală termică', cat: 'Tehnic', mp_min: 12, mp_rec: 20, share: true, normativ: 'I13 + NTPEE', inst: ['gaze', 'IT'] },
    camera_pompe: { label: 'Cameră pompe / hidrofor', cat: 'Tehnic', mp_min: 8, mp_rec: 12, share: true, normativ: 'I9' }
  };

  // Reguli CONDIȚIONATE de context (prag suprafață / regim înălțime) — din normative.
  var RULES_COND = [
    { id: 'depozit_mare', cand: function (c) { return c.mpOf('depozit') > 2500 || c.mpOf('hala_productie') > 2500; }, adauga: ['idsi', 'camera_psi', 'statie_pompe_incendiu', 'rezervor_incendiu', 'trape_shev', 'sprinklere'], normativ: 'P118/1999 + P118-2/2013 (depozit > 2.500 mp)' },
    { id: 'bloc_p4', cand: function (c) { return (c.params.niveluri || 0) >= 5; }, adauga: ['lift', 'camera_masini_lift', 'adapost_ala', 'presurizare_scari', 'hidranti_niv', 'camera_contoare'], normativ: 'ISCIR PT R2 + P118 + Legea 132/1997 (P+4 și peste)' },
    { id: 'sala_sport_mare', cand: function (c) { return c.mpOf('sala_sport') > 200; }, adauga: ['gs_public'], normativ: 'NP 051/2012 + Ord. MTS (sală sport > 200 mp)' }
  ];

  // Tipologii care folosesc motorul de reguli. baza(p) → spații primare {id, qty?, mp?}.
  var TIPOLOGII = {
    'clinica-rmn': {
      label: 'Clinică cu imagistică (RMN)', norma: 'Ord. MS 914/2006',
      params: [{ key: 'niveluri', label: 'Niveluri', type: 'number', def: 1 }],
      baza: function () { return [{ id: 'receptie' }, { id: 'lobby' }, { id: 'rmn' }, { id: 'camera_server' }]; }
    },
    'hotel': {
      label: 'Hotel', norma: 'Ord. ANT 65/2013',
      params: [{ key: 'camere', label: 'Nr. camere', type: 'number', def: 45 }, { key: 'restaurant_locuri', label: 'Restaurant (locuri)', type: 'number', def: 80 }, { key: 'niveluri', label: 'Niveluri', type: 'number', def: 5 }],
      baza: function (p) {
        var s = [{ id: 'receptie' }, { id: 'lobby', mp: Math.max(40, (p.camere || 45) * 1.2) }, { id: 'camera_hotel', qty: p.camere || 45 }, { id: 'housekeeping', qty: Math.max(1, Math.round((p.camere || 45) / 20)) }, { id: 'spalatorie', mp: Math.max(15, (p.camere || 45) * 0.5) }, { id: 'centrala_termica' }, { id: 'camera_pompe' }, { id: 'camera_server' }];
        if ((p.restaurant_locuri || 0) > 0) s.push({ id: 'restaurant', mp: Math.max(40, (p.restaurant_locuri) * 1.3) }, { id: 'bucatarie_profesionala', mp: Math.max(40, (p.restaurant_locuri) * 0.6) });
        return s;
      }
    },
    'spital': {
      label: 'Spital / unitate medicală', norma: 'Ord. MS 914/2006 + NP 015-1997',
      params: [{ key: 'paturi', label: 'Nr. paturi', type: 'number', def: 50 }, { key: 'sali_operatie', label: 'Săli de operație', type: 'number', def: 2 }, { key: 'laborator', label: 'Laborator analize', type: 'bool', def: true }, { key: 'niveluri', label: 'Niveluri', type: 'number', def: 3 }],
      baza: function (p) {
        var s = [{ id: 'receptie' }, { id: 'lobby', mp: Math.max(30, (p.paturi || 50) * 0.8) }, { id: 'camera_deseuri_med' }, { id: 'centrala_termica' }, { id: 'camera_server' }];
        for (var i = 0; i < (p.sali_operatie || 0); i++) s.push({ id: 'sala_operatie' });
        if (p.laborator) s.push({ id: 'laborator_analize' });
        return s;
      }
    },
    'scoala': {
      label: 'Școală / gimnaziu', norma: 'NP 010-1997 + HG 1534/2008',
      params: [{ key: 'elevi', label: 'Nr. elevi', type: 'number', def: 300 }, { key: 'clase', label: 'Nr. săli de clasă', type: 'number', def: 12 }, { key: 'lab_chimie', label: 'Laborator chimie', type: 'bool', def: true }, { key: 'sala_sport', label: 'Sală de sport', type: 'bool', def: true }, { key: 'niveluri', label: 'Niveluri', type: 'number', def: 2 }],
      baza: function (p) {
        var s = [{ id: 'receptie' }, { id: 'sala_clasa', qty: p.clase || 12 }, { id: 'centrala_termica' }, { id: 'gs_public' }];
        if (p.lab_chimie) s.push({ id: 'laborator_chimie' });
        if (p.sala_sport) s.push({ id: 'sala_sport', mp: 540 });
        return s;
      }
    },
    'skid-gpl': {
      label: 'SKID GPL / stație carburanți', norma: 'NTPEE + ISCIR PT C7 + ATEX',
      params: [{ key: 'mp_skid', label: 'Suprafață skid (mp)', type: 'number', def: 60 }, { key: 'niveluri', label: 'Niveluri', type: 'number', def: 1 }],
      baza: function (p) { return [{ id: 'skid_gpl', mp: p.mp_skid || 60 }]; }
    },
    'hala-logistica': {
      label: 'Hală logistică / producție', norma: 'NP 011 + P118 + Legea 319/2006',
      params: [{ key: 'mp_hala', label: 'Suprafață hală (mp)', type: 'number', def: 2000 }, { key: 'productie', label: 'Cu producție', type: 'bool', def: true }, { key: 'birouri_ang', label: 'Birouri (nr. angajați)', type: 'number', def: 15 }, { key: 'niveluri', label: 'Niveluri', type: 'number', def: 1 }],
      baza: function (p) {
        var s = [{ id: (p.productie ? 'hala_productie' : 'depozit'), mp: p.mp_hala || 2000 }, { id: 'receptie' }, { id: 'vestiare_personal' }, { id: 'centrala_termica' }, { id: 'camera_deseuri' }];
        if ((p.birouri_ang || 0) > 0) s.push({ id: 'lobby', mp: Math.max(20, (p.birouri_ang) * 6) });
        return s;
      }
    }
  };

  // MOTORUL: rezolvă dependențele recursiv (closure) + reguli condiționate + merge share + dimensionare + agregare.
  function rezolva(tip, params) {
    var t = TIPOLOGII[tip]; if (!t) return null;
    params = params || {};
    var present = {}; // id → {id, qty, mp, prov, ...def spatiu}
    function add(id, opt, prov) {
      var def = SPACES[id]; if (!def) return;
      if (present[id]) { // deja prezent: dacă e share → o instanță (qty max); altfel cumulează qty
        if (!def.share && opt && opt.qty) present[id].qty += opt.qty;
        return;
      }
      present[id] = { id: id, label: def.label, cat: def.cat, niv: (def.dim === 'param' ? 'P' : (opt && opt.niv) || 'P'),
        qty: (opt && opt.qty) || 1, mp_unit: (opt && opt.mp) || def.mp_rec || def.mp_min || 0,
        mp_min: def.mp_min || 0, normativ: def.normativ || '', ob: !(prov === 'manual'), prov: prov || 'primar',
        inst: def.inst || [], deviz: def.deviz || [], avize: def.avize || [], psi: def.psi || null };
    }
    // 1. spații primare
    (t.baza(params) || []).forEach(function (r) { add(r.id, r, 'primar'); });
    // 2. closure pe `genereaza` (până la punct fix)
    var changed = true, guard = 0;
    while (changed && guard++ < 20) {
      changed = false;
      Object.keys(present).forEach(function (id) {
        var def = SPACES[id]; if (!def || !def.genereaza) return;
        def.genereaza.forEach(function (gid) { if (!present[gid]) { add(gid, null, 'generat de ' + def.label); changed = true; } });
      });
    }
    // 3. reguli condiționate (prag)
    var ctx = { params: params, mpOf: function (id) { var s = present[id]; return s ? s.qty * s.mp_unit : 0; }, has: function (id) { return !!present[id]; } };
    RULES_COND.forEach(function (rule) { try { if (rule.cand(ctx)) rule.adauga.forEach(function (gid) { if (!present[gid]) add(gid, null, 'regulă: ' + rule.normativ); }); } catch (e) {} });
    // 4. listă + bilanț + agregare
    var spatii = Object.keys(present).map(function (k) { return present[k]; });
    var su = 0, instSet = {}, avizSet = {}, psiList = [], devizSet = {};
    spatii.forEach(function (s) {
      su += s.qty * s.mp_unit;
      (s.inst || []).forEach(function (x) { instSet[x] = 1; });
      (s.avize || []).forEach(function (x) { avizSet[x] = 1; });
      (s.deviz || []).forEach(function (x) { devizSet[x] = 1; });
      if (s.psi) psiList.push({ spatiu: s.label, psi: s.psi });
    });
    var sd = su ? Math.round(su / 0.82) : 0; // Su/Sd cu circulații+pereți
    var niv = Math.max(1, params.niveluri || 1);
    spatii = _distributeNiv(spatii, niv); // distribuie funcțiunea pe niveluri (parter public+tehnic, etaje = spații repetitive)
    return {
      tipologie: tip, label: t.label, norma: t.norma, params: params,
      spatii: spatii, instalatii: Object.keys(instSet), avize: Object.keys(avizSet), deviz: Object.keys(devizSet), psi: psiList,
      bilant: { su: Math.round(su), sd: sd, sc: Math.round(sd / niv), niveluri: niv, nr_spatii: spatii.length, nr_obligatorii: spatii.filter(function (s) { return s.ob; }).length }
    };
  }

  // Distribuie spațiile pe niveluri: parterul = primire/tehnic/alimentar/public;
  // etajele = spațiile repetitive (cazare, clase, cabinete, birouri, activități) —
  // împărțite pe niveluri (buc/nivel), ca proiectantul să vadă funcționalul PE FIECARE NIVEL și să editeze.
  function _distributeNiv(spatii, niv) {
    if (niv <= 1) { spatii.forEach(function (s) { s.niv = 'P'; }); return spatii; }
    // categorii/spații care se repetă pe etaje
    function isRepeat(s) {
      if (s.cat === 'Cazare' || s.cat === 'Educațional' || s.cat === 'Activități') return true;
      if (/camera_hotel|sala_clasa|camera_pacient|salon|birou|cabinet|apartament|garsoniera|housekeeping/.test(s.id || '')) return true;
      return false;
    }
    var lbl = function (f) { return f === 0 ? 'P' : String(f); };
    var out = [];
    spatii.forEach(function (s) {
      if (!isRepeat(s) || (s.qty || 1) < 1) { s.niv = 'P'; out.push(s); return; }
      // împarte buc pe toate nivelurile (parterul primește și el o parte)
      var total = Math.max(1, s.qty || 1);
      if (total < niv) { // mai puține bucăți decât niveluri: 1/etaj de sus în jos, restul pe parter
        for (var f = 0; f < total; f++) { var c1 = Object.assign({}, s, { qty: 1, niv: lbl(Math.min(f, niv - 1)) }); out.push(c1); }
        return;
      }
      var per = Math.floor(total / niv), rem = total - per * niv;
      for (var fl = 0; fl < niv; fl++) {
        var q = per + (fl < rem ? 1 : 0); if (q <= 0) continue;
        out.push(Object.assign({}, s, { qty: q, niv: lbl(fl) }));
      }
    });
    return out;
  }

  // Validare bidirecțională (compliance): la editare, semnalează spații obligatorii lipsă / sub minim.
  function valideaza(rezultat, spatiiEditate) {
    var probleme = [];
    var ed = {}; (spatiiEditate || []).forEach(function (s) { ed[s.id] = s; });
    (rezultat.spatii || []).forEach(function (s) {
      if (s.ob && !ed[s.id]) probleme.push({ tip: 'lipsa', spatiu: s.label, msg: 'Spațiu obligatoriu eliminat — ' + s.normativ });
    });
    (spatiiEditate || []).forEach(function (s) {
      var def = SPACES[s.id]; if (def && def.mp_min && +s.mp_unit < def.mp_min) probleme.push({ tip: 'sub_minim', spatiu: s.label, msg: (s.mp_unit) + ' mp < minim ' + def.mp_min + ' mp (' + def.normativ + ')' });
    });
    return probleme;
  }

  G.UXSpace = {
    TEMPLATES: TEMPLATES, propune: propune, bilant: bilant, hasTemplate: function (fn) { return !!TEMPLATES[fn]; },
    SPACES: SPACES, TIPOLOGII: TIPOLOGII, RULES_COND: RULES_COND, rezolva: rezolva, valideaza: valideaza
  };
  console.log('[UXSpace] motor program funcțional: ' + Object.keys(TEMPLATES).length + ' șabloane + ' + Object.keys(SPACES).length + ' spații atomice + ' + Object.keys(TIPOLOGII).length + ' tipologii cu reguli');
})(window);
