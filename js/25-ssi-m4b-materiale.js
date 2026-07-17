/* ============================================================================
 * UrbanX — SSI: M4b BIBLIOTECA REACTIE LA FOC / DoP (js/25-ssi-m4b-materiale.js)
 *
 * FIX BUG REAL (Florin, 17 iul: "DoP imi trebuie la putine scenarii SSI... Nu cere
 * DoP la orice si dai mesaje ca este lipsa. Ai materialele de baza si poti consulta
 * date publice de sarcini termice, de materiale"): varianta anterioara marca 8
 * materiale FOARTE comune (parchet, PVC, membrana bituminoasa, folie difuzie,
 * polistiren extrudat, lemn masiv, membrana anti-radacini) ca "NECUNOSCUT — obligatoriu
 * DoP", blocand FINAL la aproape orice proiect real (au aparut in TOATE cele 8
 * materiale extrase automat din sectiunile reale ale unui proiect). Doua erori
 * de fond corectate acum:
 * (1) Multe din aceste materiale sunt STRATURI ASCUNSE in alcatuirea peretelui/
 *     acoperisului (folie de difuzie in interiorul peretelui, membrana bituminoasa
 *     SUB protectie la terasa, membrana anti-radacini SUB pamant la terasa verde,
 *     sarpanta de lemn SUB invelitoare) — reactia la foc a unui strat needcopus,
 *     neexpus pe o cale de evacuare/incapere, NU e o cerinta normativa relevanta
 *     (P118 impune clase de reactie la foc pe FINISAJE EXPUSE — Tabelele 48/49 —
 *     nu pe straturi ingropate in alcatuire). Aceste materiale primesc acum
 *     `relevanta_reactie_foc:false` — apar informativ, NU cer DoP.
 * (2) Restul (parchet, PVC tamplarie/pardoseala, lemn masiv expus) au clase TIPICE
 *     bine cunoscute/publicate (SR EN 13501-1, fise tehnice uzuale de producator) —
 *     se folosesc ca implicit ORIENTATIV-NEBLOCANT (nu opresc exportul FINAL),
 *     cu recomandarea sa se confirme cu DoP-ul produsului ales DOAR daca materialul
 *     e folosit pe o cale de evacuare/casa de scari cu cerinta stricta (Tabelele 48/49
 *     P118-1/2025) — nu generic, oriunde apare.
 * Raman "obligatoriu DoP" (blocant) DOAR materialele cu variabilitate reala MARE
 * si expunere normativ relevanta, unde niciun implicit conservator nu e defendabil.
 *
 * window.SSI_M4B: BIBLIOTECA_IMPLICITA · valideazaMateriale()
 * ========================================================================== */
(function (G) {
  'use strict';

  // Valabil ca implicit DOAR pt materiale unde variabilitatea intre produse e neglijabila —
  // proprietatea de reacție la foc rezultă din natura fizică a materialului (mineral/metalic,
  // incombustibil prin compoziție), nu dintr-un tratament/aditiv care variază pe producător.
  var BIBLIOTECA_IMPLICITA = {
    beton: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'material mineral incombustibil — SR EN 13501-1' },
    beton_armat: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'material mineral incombustibil — SR EN 13501-1' },
    caramida: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'material ceramic incombustibil' },
    bca: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'beton celular autoclavizat, incombustibil' },
    zidarie: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'material mineral incombustibil' },
    otel: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'material metalic incombustibil (rezistența la foc a elementului, nu reacția, e critică — vezi 3.2)' },
    aluminiu: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'material metalic incombustibil' },
    sticla: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'material mineral incombustibil' },
    vata_bazaltica: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'fibră minerală incombustibilă' },
    vata_minerala: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'fibră minerală incombustibilă' },
    mortar: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'liant mineral incombustibil' },
    var: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'liant mineral incombustibil' },
    ipsos: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'liant mineral incombustibil (placa de gips-carton std. — A2 la unele produse, verifică dacă hidrofugă/rezistentă la foc)' },
    tigla_ceramica: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'material ceramic incombustibil' },
    tigla_beton: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'material mineral incombustibil' },
    tabla: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'material metalic incombustibil' },
    piatra_naturala: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'material mineral incombustibil' },
    // Straturi ASCUNSE in alcatuire (nu expuse pe o suprafata/incapere/cale de evacuare) —
    // reactia la foc nu e o cerinta normativa relevanta pt aceste pozitii (P118 Tabelele 48/49
    // vizeaza finisaje EXPUSE). Informativ, NU cer DoP (relevanta_reactie_foc:false).
    folie_difuzie: { clasa: null, certitudine: 'implicit_neexpus', relevanta_reactie_foc: false, sursa: 'strat ascuns în interiorul peretelui/acoperișului (barieră vapori) — neexpus, fără cerință de reacție la foc' },
    membrana_bituminoasa: { clasa: 'E (tipic, neexpus)', certitudine: 'implicit_neexpus', relevanta_reactie_foc: false, sursa: 'hidroizolație SUB protecție (pietriș/dală/pământ) la terasă — strat ascuns, neexpus, fără cerință de reacție la foc directă' },
    membrana_impotriva_radacinilor: { clasa: null, certitudine: 'implicit_neexpus', relevanta_reactie_foc: false, sursa: 'membrană anti-rădăcini SUB pământ/vegetație la terasă verde — strat complet ascuns, fără relevanță de reacție la foc' },
    // Materiale EXPUSE cu clasa TIPICA bine cunoscuta (SR EN 13501-1 / fise tehnice uzuale) —
    // implicit orientativ, NU blocheaza FINAL; se confirma cu DoP doar daca sunt pe o cale de
    // evacuare/casa de scari cu cerinta stricta (Tabelele 48/49 P118-1/2025).
    parchet: { clasa: 'DFL-s1 (tipic, lemn lăcuit necertificat ignifug)', certitudine: 'implicit_orientativ', sursa: 'clasificare tipică pardoseli lemn masiv/stratificat — SUB pragul min. BFL-s1 cerut pe coridoare grad I/II (Tabelul 48); verifică DoP DOAR dacă parchetul e folosit pe o cale de evacuare la clădire grad I/II' },
    covor_pvc: { clasa: 'CFL-s1 (tipic)', certitudine: 'implicit_orientativ', sursa: 'clasificare tipică pardoseli PVC uzuale — confirmă DoP dacă folosit pe cale de evacuare grad I/II (necesită min. BFL-s1, Tabelul 48)' },
    pvc: { clasa: 'B-s2,d0 (tipic, profile rigide tâmplărie)', certitudine: 'implicit_orientativ', sursa: 'PVC rigid (tâmplărie) e uzual autostingător prin conținutul de clor — tâmplăria exterioară nu e de regulă pe calea de evacuare interioară, deci clasa nu e critică normativ; confirmă DoP doar pentru PVC folosit ca pardoseală/finisaj pe cale de evacuare' },
    lemn_masiv: { clasa: 'D-s2,d0 (tipic, lemn netratat)', certitudine: 'implicit_orientativ', sursa: 'clasificare tipică lemn masiv — șarpanta e de regulă ascunsă sub învelitoare (neexpusă); confirmă DoP doar dacă lemnul e expus pe o cale de evacuare/casă de scări (Tabelul 48, min. B-s1,d0 la grad I/II)' },
    lemn_stratificat: { clasa: 'D-s2,d0 (tipic)', certitudine: 'implicit_orientativ', sursa: 'ca lemn_masiv — depinde de adeziv, dar clasa tipică D-s2,d0 e un implicit rezonabil pt uz necritic' },
    // Materiale cu variabilitate GENUIN mare + expunere normativ relevanta — raman blocante,
    // nu exista un implicit conservator defendabil pt ele.
    polistiren_eps: { clasa: 'E', certitudine: 'ORIENTATIV — verifică DoP produsului concret (termoizolație expusă în sisteme ETICS fără placare incombustibilă)' },
    polistiren_extrudat: { clasa: 'E', certitudine: 'ORIENTATIV — verifică DoP produsului concret (XPS, idem EPS)' },
    poliuretan_xps: { clasa: 'E', certitudine: 'ORIENTATIV — verifică DoP produsului concret' },
    spuma_poliuretanica: { clasa: null, certitudine: 'NECUNOSCUT — variază semnificativ pe produs (B-F), obligatoriu DoP dacă e expusă (etanșări vizibile pe căi de evacuare)' }
  };

  // Sisteme structurale standard (v. locuință individuală) → atribuire IMPLICITĂ a materialului
  // pe element, ca sa nu se ceara utilizatorului sa completeze manual "stâlpii sunt din beton" —
  // se deriva din sistemul constructiv deja cunoscut (D._elemente_structurale/sistem), NU din nimic
  // presupus in plus fata de ce e deja declarat in proiect. Doar elementele cu variabilitate reala
  // (sarpanta lemn, tamplarie, izolatie) raman de completat cu DoP.
  var ELEMENTE_STANDARD_PE_SISTEM = {
    zidarie_confinata: [
      { element: 'Stâlpi/sâmburi de beton armat', material: 'beton_armat' },
      { element: 'Centuri de beton armat', material: 'beton_armat' },
      { element: 'Planșee de beton armat', material: 'beton_armat' },
      { element: 'Pereți portanți (zidărie)', material: 'zidarie' },
      { element: 'Pereți despărțitori (zidărie/BCA)', material: 'bca' },
      { element: 'Tencuieli/mortare', material: 'mortar' },
      { element: 'Fundații de beton armat', material: 'beton_armat' }
    ],
    cadre_beton: [
      { element: 'Stâlpi de beton armat', material: 'beton_armat' },
      { element: 'Grinzi de beton armat', material: 'beton_armat' },
      { element: 'Planșee de beton armat', material: 'beton_armat' },
      { element: 'Pereți de umplutură (zidărie/BCA)', material: 'bca' },
      { element: 'Fundații de beton armat', material: 'beton_armat' }
    ]
  };
  // Elemente cu variabilitate reala — DAR nu toate se aplica intotdeauna: sarpanta de lemn NU exista
  // fizic pe o cladire cu acoperis plat/terasa (bug real gasit: aparea cerut DoP pt lemn chiar cand
  // proiectantul declarase explicit tip_acoperis='plat' la releveu — element inexistent in realitate
  // nu poate necesita DoP). Cele "intotdeauna_prezente" se aplica indiferent de tip acoperis; cele
  // "doar_daca_sarpanta" / "doar_daca_plat" se filtreaza dupa tipul de acoperis REAL declarat.
  var ELEMENTE_VARIABILE_INTOTDEAUNA = [
    { element: 'Termoizolație pereți/acoperiș', material: 'polistiren_eps' },
    { element: 'Tâmplărie exterioară (rame ferestre/uși)', material: 'pvc' }
  ];
  var ELEMENTE_VARIABILE_DOAR_SARPANTA = [
    { element: 'Șarpantă lemn (acoperiș în pantă)', material: 'lemn_masiv' },
    { element: 'Învelitoare (țiglă/tablă pe șarpantă)', material: 'tigla_ceramica' }
  ];
  var ELEMENTE_VARIABILE_DOAR_PLAT = [
    { element: 'Hidroizolație/membrană terasă (acoperiș plat)', material: 'membrana_bituminoasa' }
  ];

  function _normKey(nume) { return String(nume || '').toLowerCase().replace(/\s+/g, '_').replace(/[ăâ]/g, 'a').replace(/î/g, 'i').replace(/ș/g, 's').replace(/ț/g, 't'); }

  // Genereaza lista IMPLICITA de materiale pe elemente, din sistemul constructiv deja cunoscut —
  // proiectantul NU trebuie sa retasteze "stalpii sunt din beton", doar sa confirme/corecteze si sa
  // ataseze DoP pentru elementele variabile (marcate distinct, nu amestecate cu cele consacrate).
  // tipuriAcoperisDeclarate = lista de tip_acoperis REALE declarate in releveu (per tip de cladire) —
  // daca lipseste/e goala (nu s-a completat inca niciun releveu), aratam ambele variante posibile
  // (sarpanta SI terasa) ca sa nu ascundem o cerinta reala inainte de completare; daca e completata,
  // aratam DOAR ce chiar exista fizic pe cladire, nu o lista generica neverificata.
  function genereazaListaImplicita(sistemConstructiv, tipuriAcoperisDeclarate) {
    var standard = ELEMENTE_STANDARD_PE_SISTEM[sistemConstructiv] || ELEMENTE_STANDARD_PE_SISTEM.zidarie_confinata;
    var tipuri = tipuriAcoperisDeclarate || [];
    var areSarpanta = !tipuri.length || tipuri.some(function (t) { return t === 'sarpanta_doua_ape' || t === 'sarpanta_patru_ape'; });
    var arePlat = !tipuri.length || tipuri.some(function (t) { return t === 'plat'; });
    var variabile = ELEMENTE_VARIABILE_INTOTDEAUNA
      .concat(areSarpanta ? ELEMENTE_VARIABILE_DOAR_SARPANTA : [])
      .concat(arePlat ? ELEMENTE_VARIABILE_DOAR_PLAT : []);
    return standard.concat(variabile).map(function (e) { return { nume: e.material, element: e.element, DoP_atasat: false }; });
  }

  function claseMaterial(nume) {
    var k = _normKey(nume);
    return BIBLIOTECA_IMPLICITA[k] || { clasa: null, certitudine: 'NECUNOSCUT — material nu e în biblioteca implicită, obligatoriu DoP/fișă tehnică produs concret' };
  }

  // Nivele de certitudine care NU blocheaza exportul FINAL (Florin, 17 iul: "DoP doar la putine
  // scenarii... nu cere DoP la orice") — materiale consacrate (mineral/metalic), straturi ascunse
  // neexpuse (folie_difuzie, membrane sub protectie) si materiale expuse cu clasa TIPICA cunoscuta
  // (implicit_orientativ) NU necesita DoP pt un scenariu DRAFT/FINAL uzual. Raman blocante DOAR
  // materialele "NECUNOSCUT" (variabilitate mare + expunere reala, fara implicit defendabil).
  var CERTITUDINE_NEBLOCANTA = { implicit_acceptat: 1, implicit_orientativ: 1, implicit_neexpus: 1 };

  // materialeFolosite = [{ nume, element?, DoP_atasat: bool }]
  function valideazaMateriale(materialeFolosite) {
    var rezultate = (materialeFolosite || []).map(function (m) {
      var info = claseMaterial(m.nume);
      return { nume: m.nume, element: m.element || null, clasa: info.clasa, certitudine: info.certitudine, sursa: info.sursa || null, DoP_atasat: !!m.DoP_atasat };
    });
    var neconfirmate = rezultate.filter(function (m) { return !CERTITUDINE_NEBLOCANTA[m.certitudine] && !m.DoP_atasat; });
    return {
      materiale: rezultate,
      blocat_pt_final: neconfirmate.length > 0,
      neconfirmate: neconfirmate,
      mesaj: neconfirmate.length
        ? 'Scenariul NU poate fi marcat FINAL — materialele următoare nu au DoP/fișă tehnică atașată: ' + neconfirmate.map(function (m) { return m.nume; }).join(', ') + '.'
        : null
    };
  }

  G.SSI_M4B = { BIBLIOTECA_IMPLICITA: BIBLIOTECA_IMPLICITA, claseMaterial: claseMaterial, valideazaMateriale: valideazaMateriale, genereazaListaImplicita: genereazaListaImplicita };
  console.log('[SSI] M4b biblioteca reactie la foc / DoP incarcata (window.SSI_M4B)');
})(window);
