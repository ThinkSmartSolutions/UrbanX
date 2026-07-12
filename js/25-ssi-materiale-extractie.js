/* ============================================================================
 * UrbanX — SSI: EXTRACTIE MATERIALE REALE DIN PDF DE SECTIUNE (js/25-ssi-materiale-extractie.js)
 *
 * Regula (Florin, 12 iul): sectiunile arhitecturale (A2.1 Sectiune A-A etc.) contin STRATIGRAFIA
 * reala a peretilor/planseelor/acoperisului (grosime + denumire material, ex. "15 cm / Vata
 * bazaltica"), scrisa direct pe desen de proiectant — nu se mai presupune un sistem constructiv
 * generic cand aceste date REALE exista deja in fisierele incarcate.
 *
 * window.SSI_MATERIALE_EXTRACTIE: extrageMaterialeDinPDF(arrayBuffer)
 * ========================================================================== */
(function (G) {
  'use strict';

  if (window.pdfjsLib) {
    try { pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js'; } catch (e) { /* noop */ }
  }

  // Dictionar fraze reale (cum apar pe sectiuni arhitecturale RO) -> cheie din SSI_M4B.BIBLIOTECA_IMPLICITA.
  // Ordinea conteaza: frazele specifice se verifica INAINTEA celor generice (ex. "zidarie din
  // caramida" inaintea lui "zidarie" simplu).
  var DICTIONAR = [
    { re: /zid[aă]rie\s+din\s+c[aă]r[aă]mid[aă]/i, cheie: 'caramida' },
    { re: /c[aă]r[aă]mid[aă]/i, cheie: 'caramida' },
    { re: /\bbca\b/i, cheie: 'bca' },
    { re: /zid[aă]rie/i, cheie: 'zidarie' },
    { re: /beton\s+armat/i, cheie: 'beton_armat' },
    { re: /\bbeton\b/i, cheie: 'beton' },
    { re: /v[aă]t[aă]\s+bazaltic[aă]/i, cheie: 'vata_bazaltica' },
    { re: /v[aă]t[aă]\s+minerala/i, cheie: 'vata_minerala' },
    { re: /polistiren\s+extrudat/i, cheie: 'polistiren_extrudat' },
    { re: /polistiren\s+expandat/i, cheie: 'polistiren_eps' },
    { re: /membran[aă]\s+([iî]mpotriva|impotriva)\s+r[aă]d[aă]cinilor/i, cheie: 'membrana_impotriva_radacinilor' },
    { re: /hidroizola[tț]ie/i, cheie: 'membrana_bituminoasa' },
    { re: /tencuial[aă]/i, cheie: 'mortar' },
    { re: /tabl[aă]\s+f[aă]l[tț]uit[aă]/i, cheie: 'tabla' },
    { re: /sor[tț]\s+din\s+tabl[aă]/i, cheie: 'tabla' },
    { re: /\btabl[aă]\b/i, cheie: 'tabla' },
    { re: /t[aâ]mpl[aă]rie[\s\S]{0,20}pvc/i, cheie: 'pvc' },
    { re: /\bpvc\b/i, cheie: 'pvc' },
    { re: /astereal[aă]/i, cheie: 'lemn_masiv' },
    { re: /\bs[iî]pc[aă]\b/i, cheie: 'lemn_masiv' },
    { re: /contrasipc[aă]/i, cheie: 'lemn_masiv' },
    { re: /bariera\s+de\s+vapori|folie\s+anti-?condens/i, cheie: 'folie_difuzie' },
    { re: /geogril[aă]/i, cheie: 'folie_difuzie' },
    { re: /sticl[aă]/i, cheie: 'sticla' },
    { re: /o[tț]el/i, cheie: 'otel' },
    { re: /aluminiu/i, cheie: 'aluminiu' },
    { re: /\bparchet\b/i, cheie: 'parchet' },
    { re: /covor\s+pvc/i, cheie: 'covor_pvc' },
    { re: /ipsos|gips-?carton/i, cheie: 'ipsos' },
    { re: /piatr[aă]\s+natural[aă]/i, cheie: 'piatra_naturala' },
    { re: /[tț]igl[aă]\s+ceramic[aă]/i, cheie: 'tigla_ceramica' },
    { re: /[tț]igl[aă]\s+beton/i, cheie: 'tigla_beton' }
  ];

  // Linii care NU sunt materiale relevante pt reactia la foc (context/geometrie/straturi de teren
  // sau finisaje nespecificate) — evita potriviri false/zgomot (ex. nisipul/pamantul compactat
  // sunt oricum incombustibile, dar nu apar in BIBLIOTECA_IMPLICITA, deci oricum n-ar da match).
  var IGNORA = /^\d+([.,]\d+)?\s*cm$|^nisip$|^p[aă]m[aâ]nt|^strat\s+de\s+rupere|^s[aă]pa$|^sistem[\s\S]*[iî]nc[aă]lzire|^finisaj\s+pardoseal[aă]$/i;

  function _normalizeazaLinie(s) { return String(s || '').trim().replace(/\s+/g, ' '); }

  function _matchMaterial(linie) {
    for (var i = 0; i < DICTIONAR.length; i++) if (DICTIONAR[i].re.test(linie)) return DICTIONAR[i].cheie;
    return null;
  }

  // Extrage textul din toate paginile unui PDF (ArrayBuffer) via pdf.js, apoi identifica materialele
  // REALE mentionate — foloseste exact ce a scris proiectantul pe sectiune, nu presupune un sistem
  // constructiv generic. Returneaza [{nume, element, DoP_atasat:false, sursa_extractie}].
  async function extrageMaterialeDinPDF(arrayBuffer) {
    if (!window.pdfjsLib) throw new Error('pdf.js nu este încărcat — verifică conexiunea la CDN');
    var doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    var linii = [];
    for (var p = 1; p <= doc.numPages; p++) {
      var page = await doc.getPage(p);
      var content = await page.getTextContent();
      content.items.forEach(function (it) { if (it.str && it.str.trim()) linii.push(_normalizeazaLinie(it.str)); });
    }
    var gasite = {};
    linii.forEach(function (linie) {
      if (IGNORA.test(linie)) return;
      var cheie = _matchMaterial(linie);
      if (!cheie) return;
      if (!gasite[cheie]) gasite[cheie] = { nume: cheie, exemple: [] };
      if (gasite[cheie].exemple.indexOf(linie) < 0 && gasite[cheie].exemple.length < 3) gasite[cheie].exemple.push(linie);
    });
    return Object.keys(gasite).map(function (k) {
      return { nume: k, element: gasite[k].exemple.join(' / '), DoP_atasat: false, sursa_extractie: 'text real din secțiune PDF' };
    });
  }

  G.SSI_MATERIALE_EXTRACTIE = { extrageMaterialeDinPDF: extrageMaterialeDinPDF, DICTIONAR: DICTIONAR };
  console.log('[SSI] extractie materiale din PDF de secțiune încărcată (window.SSI_MATERIALE_EXTRACTIE)');
})(window);
