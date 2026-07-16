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
    { re: /placaj[\s\S]{0,25}lemn/i, cheie: 'lemn_masiv' },
    { re: /lemn\s+de\s+(frasin|stejar|brad|fag|molid)/i, cheie: 'lemn_masiv' },
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

  // Bug real semnalat de Florin (12 iul, capturi ecran din sesiune reala): "nu s-a putut citi textul
  // PDF: pdf.js nu este incarcat" a aparut pt TOATE fisierele incarcate, desi scriptul e in index.html.
  // Cauza plauzibila: CDN-ul (jsdelivr) incarca sincron, dar pe o retea reala/lenta, utilizatorul poate
  // incepe upload-ul inainte ca scriptul sa termine efectiv de executat (fisier mare, 320KB minificat +
  // parsare) — verificarea anterioara arunca eroare INSTANT, fara sa astepte deloc. Fix: asteapta pana
  // la ~8s (polling) inainte de a declara esec, ca sa acopere exact acest caz de incarcare intarziata.
  async function _asteaptaPdfjs(timeoutMs) {
    var pas = 200, trecut = 0;
    while (!window.pdfjsLib && trecut < (timeoutMs || 8000)) {
      await new Promise(function (r) { setTimeout(r, pas); });
      trecut += pas;
    }
    return !!window.pdfjsLib;
  }

  async function _liniiDinPDF(arrayBuffer) {
    if (!window.pdfjsLib) await _asteaptaPdfjs();
    if (!window.pdfjsLib) throw new Error('pdf.js nu s-a încărcat de pe CDN (jsdelivr) după 8 secunde de așteptare — verifică conexiunea la internet sau dacă un blocker de reclame/extensie de browser blochează cdn.jsdelivr.net; poți completa manual câmpurile H cornișă/H coamă/tip acoperiș, restul platformei funcționează fără această extragere automată.');
    var doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    var linii = [];
    for (var p = 1; p <= doc.numPages; p++) {
      var page = await doc.getPage(p);
      var content = await page.getTextContent();
      content.items.forEach(function (it) { if (it.str && it.str.trim()) linii.push(_normalizeazaLinie(it.str)); });
    }
    return linii;
  }

  // Extrage textul din toate paginile unui PDF (ArrayBuffer) via pdf.js, apoi identifica materialele
  // REALE mentionate — foloseste exact ce a scris proiectantul pe sectiune, nu presupune un sistem
  // constructiv generic. Returneaza [{nume, element, DoP_atasat:false, sursa_extractie}].
  async function extrageMaterialeDinPDF(arrayBuffer) {
    var linii = await _liniiDinPDF(arrayBuffer);
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

  // Puteri calorifice REALE (Anexa 9.1, Tabelul 137, P118-1/2025 — verificat pe text sursă oficial,
  // pag. 543-546). Doar materialele efectiv necesare pt finisajele intalnite pe planurile de arhitectura
  // (pardoseli) sunt incluse aici — nu tot tabelul 137 (peste 170 de randuri).
  var PUTERE_CALORIFICA_MJ_KG = {
    lemn: 18.40,       // "Lemn convențional", Tabelul 137 nr. crt. 92
    pvc: 18.65         // "Policlorură de vinil (PVC) rigidă" 15...21.80, medie folosita conservator
  };
  // Densitate + grosime UZUALE de material pt pardoseli (proprietati fizice ale clasei de produs, nu
  // date de proiect specifice — la fel cum se foloseste densitatea betonului 2400 kg/mc ca fapt cunoscut,
  // nu ca "presupunere"). Sursa: standarde de produs uzuale pt parchet lemn stratificat/masiv RO.
  var PARDOSEALA_COMBUSTIBILA = {
    // regex pardoseala declarata -> {densitate kg/m3, grosime m, putere calorifica}
    parchet: { densitate: 650, grosime: 0.010, pc: PUTERE_CALORIFICA_MJ_KG.lemn, eticheta: 'Parchet lemn (masiv/stratificat)' },
    covor: { densitate: 1400, grosime: 0.003, pc: PUTERE_CALORIFICA_MJ_KG.pvc, eticheta: 'Covor PVC' }
  };

  function _sarcinaTermicaPardoseala(pardoseala) {
    var p = String(pardoseala || '').toLowerCase();
    if (/parchet/.test(p)) return PARDOSEALA_COMBUSTIBILA.parchet;
    if (/covor/.test(p)) return PARDOSEALA_COMBUSTIBILA.covor;
    return null; // gresie, gresie antiderapanta etc. — incombustibile, contributie 0
  }

  // Extrage inventarul REAL de incaperi de pe un plan de arhitectura (Parter/Etaj) — foloseste exact
  // formatul de eticheta pus de proiectant pe desen: "Nume / Suprafata: X m2 / Per: Y m / h Liber: Z m /
  // Pard.: material / Pereti: material / Tavan: material" (convenție GraphiSoft ArchiCAD — GSPublisherVersion,
  // intalnita pe toate planurile acestui proiect). Calculeaza sarcina termica REALA a finisajului de
  // pardoseala (singurul material combustibil cu arie/grosime cunoscute din desen) — NU inventeaza
  // un inventar de mobilier care nu exista in fisier.
  // pdf.js NU pastreaza fiecare eticheta+valoare pe acelasi fragment de text — "Suprafata:", valoarea
  // numerica si unitatea "m2" (uneori chiar cifra "2" a exponentului separat) apar ca fragmente
  // DISTINCTE consecutive in array (verificat pe fisierul real: ["Suprafata:","4.22","m","2","Per:",...]).
  // Parserul citeste secvential intre etichete, nu presupune totul pe un singur rand.
  function extrageIncaperiSiSarcinaTermica(linii) {
    var camere = [];
    function _esteEticheta(s, re) { return re.test(String(s || '').trim()); }
    for (var i = 0; i < linii.length; i++) {
      if (!_esteEticheta(linii[i], /^Suprafata:?$/i)) continue;
      var nume = linii[i - 1] || 'Încăpere';
      var j = i + 1, buf, mNum;
      buf = '';
      while (j < linii.length && !_esteEticheta(linii[j], /^Per:?$/i) && (j - i) < 6) { buf += ' ' + linii[j]; j++; }
      mNum = /([\d.,]+)/.exec(buf); if (!mNum) continue; // fara arie numerica, nu e un rand real de camera
      var arie = parseFloat(mNum[1].replace(',', '.'));
      if (_esteEticheta(linii[j], /^Per:?$/i)) j++;
      while (j < linii.length && !_esteEticheta(linii[j], /^h\s*Liber:?$/i) && (j - i) < 10) j++;
      if (_esteEticheta(linii[j], /^h\s*Liber:?$/i)) j++;
      while (j < linii.length && !_esteEticheta(linii[j], /^Pard\.?:?$/i) && (j - i) < 16) j++;
      if (_esteEticheta(linii[j], /^Pard\.?:?$/i)) j++;
      var pard = linii[j] || null; j++;
      var pereti = null, tavan = null;
      if (_esteEticheta(linii[j], /^Pereti:?$/i)) { j++; pereti = linii[j] || null; j++; }
      if (_esteEticheta(linii[j], /^Tavan:?$/i)) { j++; tavan = linii[j] || null; }
      camere.push({ nume: nume, arie_mp: arie, pardoseala: pard, pereti: pereti, tavan: tavan });
    }
    var vazute = {};
    var unice = camere.filter(function (c) {
      var cheie = c.nume + '|' + c.arie_mp + '|' + c.pardoseala;
      if (vazute[cheie]) return false;
      vazute[cheie] = true;
      return true;
    });
    return unice.map(function (c) {
      var mat = _sarcinaTermicaPardoseala(c.pardoseala);
      var sarcina_pardoseala_mj = mat ? Math.round(c.arie_mp * mat.grosime * mat.densitate * mat.pc) : 0;
      var sursaPardoseala = mat ? ('finisaj pardoseală real: ' + c.pardoseala + ' — ' + mat.eticheta + ' (' + (mat.grosime * 1000) + 'mm × ' + mat.densitate + 'kg/m³ × ' + mat.pc + 'MJ/kg, Tabelul 137 Anexa 9.1 P118-1/2025)') : ('pardoseală incombustibilă declarată (' + c.pardoseala + ') — contribuție 0');
      // Aditiv (16 iul, Florin: "tiparul de calcul exact, pe fiecare tip de functiuni"): pardoseala
      // reala de mai sus ramane sursa autoritara (declarata pe plan), dar planul NU contine un
      // inventar de mobilier/echipamente/cabluri — daca motorul SSI_SARCINA_TERMICA e incarcat si
      // reuseste sa identifice tipul incaperii din denumire, se ADAUGA acel inventar STANDARD peste
      // pardoseala reala (nu o inlocuieste), la fel ca in metodologia reala (Excel Fruntiseni): rand
      // "pardoseala" + randuri "mobilier/textile/plastice/cabluri" insumate per incapere.
      if (G.SSI_SARCINA_TERMICA) {
        var enriched = G.SSI_SARCINA_TERMICA.calculeazaCamera({ nume: c.nume, arie_mp: c.arie_mp, pardoseala: null });
        if (enriched.detaliu_materiale.length) {
          var total = sarcina_pardoseala_mj + enriched.sarcina_termica_mj;
          return {
            nume: c.nume, arie_mp: c.arie_mp, sarcina_termica_mj: Math.round(total),
            densitate_mj_mp: c.arie_mp ? Math.round((total / c.arie_mp) * 10) / 10 : 0,
            detaliu_materiale: [{ nume: 'pardoseală — ' + (mat ? mat.eticheta : c.pardoseala || 'nedeclarată'), cantitate: c.arie_mp, unitate: 'mp', greutate_kg: mat ? Math.round(mat.grosime * mat.densitate * 100) / 100 : 0, total_kg: mat ? Math.round(c.arie_mp * mat.grosime * mat.densitate * 100) / 100 : 0, putere_calorica_mj_kg: mat ? mat.pc : 0, sarcina_termica_mj: sarcina_pardoseala_mj }].concat(enriched.detaliu_materiale),
            sursa_sarcina: sursaPardoseala + ' + ' + enriched.sursa_sarcina,
            pardoseala_declarata: c.pardoseala
          };
        }
      }
      return {
        nume: c.nume, arie_mp: c.arie_mp, sarcina_termica_mj: sarcina_pardoseala_mj,
        sursa_sarcina: sursaPardoseala,
        pardoseala_declarata: c.pardoseala
      };
    });
  }

  // Extrage din cartusul planului (daca e prezent) gradul de rezistenta la foc si categoria de
  // importanta DECLARATE explicit de proiectant — cea mai autoritara sursa posibila (mai buna decat
  // orice valoare implicita a motorului), daca proiectantul a completat aceste campuri pe desen.
  function extrageGradSiCategorieDinPlanPDF(linii) {
    var rezultat = {};
    for (var i = 0; i < linii.length; i++) {
      if (/grad de rezisten[tț]a la foc/i.test(linii[i])) {
        for (var j = i + 1; j < Math.min(i + 4, linii.length); j++) {
          var m = /^(I|II|III|IV|V)$/i.exec(linii[j].trim());
          if (m) { rezultat.grad_stabilitate = m[1].toUpperCase(); break; }
        }
      }
      if (/categoria de importan[tț][aă]/i.test(linii[i])) {
        for (var j2 = i + 1; j2 < Math.min(i + 4, linii.length); j2++) {
          var m2 = /^(A|B|C|D)$/i.exec(linii[j2].trim());
          if (m2) { rezultat.categorie_importanta = m2[1].toUpperCase(); break; }
        }
      }
    }
    return rezultat;
  }

  async function extrageDatePlanPDF(arrayBuffer) {
    var linii = await _liniiDinPDF(arrayBuffer);
    return {
      camere: extrageIncaperiSiSarcinaTermica(linii),
      cartus: extrageGradSiCategorieDinPlanPDF(linii)
    };
  }

  G.SSI_MATERIALE_EXTRACTIE = {
    extrageMaterialeDinPDF: extrageMaterialeDinPDF, DICTIONAR: DICTIONAR,
    extrageDatePlanPDF: extrageDatePlanPDF
  };
  console.log('[SSI] extractie materiale + incaperi/sarcina termica din PDF încărcată (window.SSI_MATERIALE_EXTRACTIE)');
})(window);
