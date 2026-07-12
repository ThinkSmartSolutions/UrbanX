/* ============================================================================
 * UrbanX — SSI: M4b BIBLIOTECA REACTIE LA FOC / DoP (js/25-ssi-m4b-materiale.js)
 * Declarativ, NU calculat — regula v4.0 #13: clasa de reacție la foc nu se
 * presupune niciodată pentru materiale variabile; scenariul FINAL se blochează
 * dacă lipsește Declarația de Performanță (DoP)/fișa tehnică pt orice material
 * care nu e în lista restrânsă de materiale consacrate (variabilitate neglijabilă).
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
    // Materiale cu variabilitate mare intre producatori/formulari — implicit e DOAR orientativ,
    // blocant la generare FINALA fara DoP (clasa reala depinde de aditivi, tratament, densitate).
    polistiren_eps: { clasa: 'E', certitudine: 'ORIENTATIV — verifică DoP produsului concret' },
    polistiren_extrudat: { clasa: 'E', certitudine: 'ORIENTATIV — verifică DoP produsului concret (XPS)' },
    poliuretan_xps: { clasa: 'E', certitudine: 'ORIENTATIV — verifică DoP produsului concret' },
    membrana_impotriva_radacinilor: { clasa: null, certitudine: 'NECUNOSCUT — membrană anti-rădăcini (de regulă HDPE/PP), plajă variabilă, obligatoriu DoP produs concret' },
    lemn_masiv: { clasa: 'D-s2,d0', certitudine: 'ORIENTATIV — depinde de esență, grosime, densitate, tratament ignifug — verifică DoP' },
    lemn_stratificat: { clasa: 'D-s2,d0', certitudine: 'ORIENTATIV — depinde de adeziv/tratament ignifug — verifică DoP' },
    pvc: { clasa: null, certitudine: 'NECUNOSCUT — plajă B-E, obligatoriu DoP produs concret' },
    spuma_poliuretanica: { clasa: null, certitudine: 'NECUNOSCUT — variază semnificativ pe produs, obligatoriu DoP' },
    membrana_bituminoasa: { clasa: null, certitudine: 'NECUNOSCUT — plajă largă, obligatoriu DoP produs concret' },
    folie_difuzie: { clasa: null, certitudine: 'NECUNOSCUT — variază pe producător, obligatoriu DoP' },
    parchet: { clasa: null, certitudine: 'NECUNOSCUT — depinde de esență/tratament/adeziv, obligatoriu DoP' },
    covor_pvc: { clasa: null, certitudine: 'NECUNOSCUT — obligatoriu DoP produs concret' }
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

  // materialeFolosite = [{ nume, element?, DoP_atasat: bool }]
  function valideazaMateriale(materialeFolosite) {
    var rezultate = (materialeFolosite || []).map(function (m) {
      var info = claseMaterial(m.nume);
      return { nume: m.nume, element: m.element || null, clasa: info.clasa, certitudine: info.certitudine, sursa: info.sursa || null, DoP_atasat: !!m.DoP_atasat };
    });
    var neconfirmate = rezultate.filter(function (m) { return m.certitudine !== 'implicit_acceptat' && !m.DoP_atasat; });
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
