/* ============================================================================
 * UrbanX — SSI: CASCADA M0-M12 (js/25-ssi-engine.js)
 * Motor nou, aditiv — NU inlocuieste 'Scenariu securitate incendiu (P118)'
 * din urbanx-docx-builder.js, il alimenteaza cu date suplimentare (M0
 * tip_lucrare + M6b/M12 clasificare vecinatati/distante minime — capacitatile
 * NOI cerute explicit in addendum v2.1/v3.0/v4.0), pastrand campurile deja
 * calculate de UXDoc.valideaza() (v.calc) pentru M1-M4/M7/M8/M9(evacuare)/
 * M10/M11 (nu se recalculeaza in dublu — regula de aur a platformei).
 *
 * Sursa valorilor normative NOI (M5/M6/M6b-M12/M9-niveluri): SSI_NORMATIVE_ENGINE,
 * date reale extrase din P118-1/2025 (Monitorul Oficial 204 bis/10.III.2025),
 * NU valori inventate. Vezi data/ssi/normative.json._meta.
 *
 * window.SSI_ENGINE: m0_tipLucrare() · m5_compartimentare() · m6_stabilitate()
 * · m6b_clasificareVecinatati() · m9_niveluriMaxime() · ruleazaCascada()
 * ========================================================================== */
(function (G) {
  'use strict';

  function N() { return G.SSI_NORMATIVE_ENGINE; }

  var TIPURI_LUCRARE = {
    CONSTRUCTIE_NOUA: { label: '🆕 Construcție nouă', regim: 'nou', drepturi_castigate: false },
    EXTINDERE_COMPARTIMENTATA: { label: '➕ Extindere — compartimentată CF de existent', regim: 'nou', drepturi_castigate: 'partial',
      nota: 'Partea nouă intră la regimul NOU; partea existentă rămâne la regimul ei propriu (T144/T147/T148).' },
    EXTINDERE_INTEGRATA: { label: '➕ Extindere — integrată funcțional/structural', regim: 'nou', drepturi_castigate: false,
      nota: 'Ansamblul întreg intră sub regimul cel mai restrictiv dintre cele două componente.' },
    EXISTENTA_NEMODIFICATA: { label: '🏚 Existent nemodificat (audit/PSI/reautorizare)', regim: 'existent', drepturi_castigate: true },
    SCHIMBARE_DESTINATIE: { label: '🔄 Schimbare destinație', regim: 'existent', drepturi_castigate: 'conditionat',
      nota: 'Condiționat de neagravarea riscului de incendiu față de destinația anterioară — dacă riscul crește, se recalculează integral ca pentru construcție nouă.' },
    CONSOLIDARE_REABILITARE: { label: '🔧 Consolidare/reabilitare', regim: 'existent', drepturi_castigate: 'conditionat',
      nota: 'Condiționat de nemodificarea gradului de rezistență la foc — dacă se înrăutățește, recalcul complet M5/M6.' },
    SUPRAETAJARE: { label: '⬆️ Supraetajare', regim: 'mixt', drepturi_castigate: false,
      nota: 'Nivelurile noi intră la regim NOU; evacuarea se recalculează integral pe tot ansamblul (flux cumulat).' }
  };

  // M0 — tip de lucrare, decide ce tabele P118-1/2025 se activeaza in M5/M6/M6b/M9
  function m0_tipLucrare(input) {
    input = input || {};
    var tip = input.tip_lucrare;
    if (!TIPURI_LUCRARE[tip]) {
      return { eroare: true, blocant: true, cod: 'ERO-TIP-LUCRARE-LIPSA',
        mesaj: 'Tip de lucrare neselectat sau invalid — obligatoriu pentru a decide tabelele aplicabile (T41/T4/T2 pentru NOU vs T147/T145/T144 pentru EXISTENT).',
        optiuni: Object.keys(TIPURI_LUCRARE) };
    }
    var t = TIPURI_LUCRARE[tip];
    return {
      tip_lucrare: tip, label: t.label, regim: t.regim, drepturi_castigate: t.drepturi_castigate, nota: t.nota || null,
      // regim_tabele: cheia folosita mai jos de M5/M6/M6b/M9 pt a alege intre T-nou si T-existent
      regim_tabele: (t.regim === 'existent') ? 'EXISTENTA_NEMODIFICATA' : 'CONSTRUCTIE_NOUA',
      temei_legal: 'P118-1/2025 (tabele diferentiate nou/existent, Anexa A.10 pt existent) + Legea 50/1991 (categorii lucrari)'
    };
  }

  // M5 — arii maxime compartiment de incendiu (T41 nou / T147 existent), doar destinatii CIVILE (locuinte/birouri/etc)
  function m5_compartimentare(m0, params) {
    params = params || {};
    var grad = params.grad, sc = +params.arie_construita_mp || 0, niveluri = (+params.niveluri || 1) > 1 ? 'mai_multe_niveluri' : 'un_nivel';
    var r = N().getAriiMaxime({ tip_lucrare: m0.regim_tabele, grad: grad, niveluri: niveluri });
    if (r.eroare) return { conform: null, eroare: r.eroare, norma: r.norma, mesaj: 'Nu s-a putut determina aria maximă admisă — verifică grad/sursă normativă.' };
    var conform = r.arie_max_mp == null || sc <= r.arie_max_mp;
    return {
      arie_proiectata_mp: sc, arie_maxima_admisa_mp: r.arie_max_mp, conform: conform,
      norma: r.norma, sursa_url: r.sursa_url, pagina: r.pagina, status_validare: r.status_validare, note_majorari: r.note || [],
      mesaj: conform ? null : 'Aria depășește limita admisă — vezi M15 (soluții compensatorii: compartimentare suplimentară, sprinklere +100%, detectare +25%).'
    };
  }

  // M6 — stabilitate proprie (verificare partiala pe elementele deja extrase din T2/T144)
  function m6_stabilitate(m0, params) {
    params = params || {};
    var grad = params.grad, elemente = params.elemente_verificate || [];
    var rezultate = elemente.map(function (el) {
      return N().getStabilitateElement({ tip_lucrare: m0.regim_tabele, element: el });
    });
    return {
      grad_stabilitate: grad,
      elemente_verificate: rezultate,
      acoperire_partiala: 'Verificarea automată acoperă doar elementele structurale principale deja extrase din normativ (stâlpi/grinzi/planșee' +
        (m0.regim_tabele === 'EXISTENTA_NEMODIFICATA' ? '/pereți portanți/pereți despărțitori/pereți exteriori/șarpante' : '') +
        '); gradul de stabilitate final al construcției/compartimentului = elementul cu cea mai defavorabilă încadrare (verificare completă rămâne responsabilitatea proiectantului de structuri, conform normativului integral).'
    };
  }

  // M9 (partial) — numar maxim de niveluri (T42 nou / T148 existent), doar grad III/IV/V (I/II = nelimitat)
  function m9_niveluriMaxime(m0, params) {
    params = params || {};
    var r = N().getNiveluriMaxime({ tip_lucrare: m0.regim_tabele, grad: params.grad, destinatie: params.destinatie });
    if (r.nelimitat) return { niveluri_max: null, nelimitat: true, norma: r.norma, nota: r.nota };
    if (r.eroare) return { niveluri_max: null, eroare: r.eroare, norma: r.norma, actiune: r.actiune || null, destinatii_disponibile: r.destinatii_disponibile || null };
    var conform = params.niveluri_proiectate == null || r.niveluri_max == null || params.niveluri_proiectate <= r.niveluri_max;
    return {
      niveluri_proiectate: params.niveluri_proiectate, niveluri_max: r.niveluri_max, capacitate_max_persoane: r.capacitate_max_persoane,
      conform: conform, norma: r.norma, sursa_url: r.sursa_url, pagina: r.pagina, status_validare: r.status_validare, note: r.note || null
    };
  }

  // M6b / M12 — clasificarea vecinatatilor + distante minime (logica INVERSA: nu doar masori, clasifici)
  // vecinatati_declarate: [{ id, destinatie_declarata, grad_rezistenta_estimat, perete_CF_pe_fatada_comuna,
  //                          distanta_masurata_m, sursa_distanta (dwg|manual), risc_vecin (optional, altfel se estimeaza) }]
  var RISC_PE_DESTINATIE = {
    locuinta: 'mic', locuinte: 'mic', birou: 'mic', birouri: 'mic', comert: 'mijlociu', hotel: 'mijlociu',
    depozit: 'mare', depozitare: 'mare', hala_productie: 'mare', productie: 'mare',
    skid_gpl: 'foarte_mare', statie_gpl: 'foarte_mare', statie_transformare: 'mijlociu'
  };
  function _estimeazaRiscDinDestinatie(destinatie) {
    var key = String(destinatie || '').toLowerCase().replace(/\s+/g, '_');
    return RISC_PE_DESTINATIE[key] || 'necunoscut_verifica_manual';
  }
  // v4.2 (Florin, 11 iul 2026): analiza NU se mai opreste niciodata asteptand clasificare manuala completa.
  // Daca destinatia/gradul lipsesc, se aplica estimarea conservatoare (grad V, risc mare — exact ce ar
  // presupune un proiectant care se uita pe harta fara sa intre in casa vecinului), calculul CONTINUA,
  // si se marcheaza explicit sursa + starea "neconfirmat". Doar generarea scenariului FINAL (pt depunere)
  // cere ca fiecare vecinatate sa fi fost confirmata/corectata de proiectant (vezi statusFinalizare in
  // urbanx-docx-builder.js) — simetrie cu statusul de validare a normativelor (v3.0).
  // Laturi fara constructie vecina reala (teren liber sau limita spre strada/drum public) — Tabelul 4/145
  // (distante MINIME INTRE CONSTRUCTII) nu se aplica, pentru ca nu exista nimic de protejat pe acea latura.
  var FARA_VECIN_CONSTRUIT = { fara_constructie: 1, strada_drum_public: 1 };
  function m6b_clasificareVecinatati(m0, m6, vecinatatiDeclarate) {
    var rezultate = { vecinatati: [], neconformitati: [], avertismente: [] };
    (vecinatatiDeclarate || []).forEach(function (vecin) {
      if (FARA_VECIN_CONSTRUIT[vecin.destinatie_declarata]) {
        rezultate.vecinatati.push({
          id: vecin.id, destinatie_declarata: vecin.destinatie_declarata, conforma: true,
          distanta_necesara_m: null, distanta_masurata_m: vecin.distanta_masurata_m != null ? vecin.distanta_masurata_m : null,
          note_aplicate: ['Nu se aplică distanța minimă (Tabelul 4/145) — fără construcție de protejat pe această latură.'],
          estimat_implicit: false, confirmat: true, certitudine: 'nu_se_aplica', sursa_distanta: vecin.sursa_distanta || 'manual',
          cf_numar: vecin.cf_numar || null
        });
        return;
      }
      var estimatImplicit = !vecin.destinatie_declarata || !vecin.grad_rezistenta_estimat;
      var destinatie = vecin.destinatie_declarata || 'altele';
      var grad = vecin.grad_rezistenta_estimat || 'V';
      if (estimatImplicit) {
        rezultate.avertismente.push({
          cod: 'AVERT-VECIN-ESTIMAT-IMPLICIT', vecinatate: vecin.id,
          mesaj: 'Vecinătatea ' + (vecin.id || '?') + ': clasificare incompletă — s-a aplicat estimarea conservatoare implicită (grad V, risc mare), NECONFIRMATĂ de proiectant.',
          actiune: 'Analiza DRAFT continuă cu această estimare; scenariul FINAL (pentru depunere la ISU) cere confirmarea sau corecția ta pentru această vecinătate.'
        });
      }
      if (vecin.distanta_masurata_m == null) {
        rezultate.avertismente.push({ cod: 'AVERT-DISTANTA-NECUNOSCUTA', vecinatate: vecin.id, mesaj: 'Vecinătatea ' + vecin.id + ': distanța reală nu este completată — nu se poate verifica conformitatea până nu e introdusă (manual, din hartă sau din DXF).' });
        rezultate.vecinatati.push({
          id: vecin.id, destinatie_declarata: destinatie, grad_vecin: grad, distanta_necesara_m: null, distanta_masurata_m: null,
          conforma: null, estimat_implicit: estimatImplicit, confirmat: vecin.confirmat === true, sursa_distanta: vecin.sursa_distanta || 'manual',
          cf_numar: vecin.cf_numar || null
        });
        return;
      }
      var risc_vecin = vecin.risc_vecin || (estimatImplicit ? 'mare' : _estimeazaRiscDinDestinatie(destinatie));
      var d = N().getDistantaMinima({
        tip_lucrare: m0.regim_tabele, grad_propriu: m6.grad_stabilitate, grad_vecin: grad,
        risc_vecin: risc_vecin, sprinklerizat: !!vecin.sprinklerizat_unadincladiri, perete_CF_pe_fatada_comuna: !!vecin.perete_CF_pe_fatada_comuna
      });
      if (d.eroare) {
        rezultate.avertismente.push({ cod: 'AVERT-DISTANTA-NEDETERMINATA', vecinatate: vecin.id, mesaj: d.eroare + ' (' + d.norma + ')' });
        return;
      }
      var conforma = vecin.distanta_masurata_m >= d.valoare_m;
      rezultate.vecinatati.push({
        id: vecin.id, destinatie_declarata: destinatie, grad_propriu: m6.grad_stabilitate,
        grad_vecin: grad, risc_vecin_estimat: risc_vecin, perete_CF: !!vecin.perete_CF_pe_fatada_comuna,
        distanta_necesara_m: d.valoare_m, distanta_necesara_norma: d.norma, note_aplicate: d.note_aplicate,
        distanta_masurata_m: vecin.distanta_masurata_m, sursa_distanta: vecin.sursa_distanta || 'manual',
        sursa_url: d.sursa_url, pagina: d.pagina, status_validare: d.status_validare, conforma: conforma,
        estimat_implicit: estimatImplicit, confirmat: vecin.confirmat === true, certitudine: vecin.certitudine || (estimatImplicit ? 'presupus_conservator' : 'confirmat_manual'),
        cf_numar: vecin.cf_numar || null
      });
      if (!conforma) {
        rezultate.neconformitati.push({
          tip: 'CRITIC', cod: 'ERO-DISTANTA-VECIN', vecinatate: vecin.id, compensabil: true,
          mesaj: 'Vecinătate ' + vecin.id + ': distanță reală ' + vecin.distanta_masurata_m + ' m < necesar ' + d.valoare_m + ' m.',
          deficit_m: Math.max(0, d.valoare_m - vecin.distanta_masurata_m), norma: d.norma
        });
      }
    });
    return rezultate;
  }

  // Orchestrare completa M0-M12 (M1-M4/M7/M8/M9-evacuare/M10/M11 preluate din v.calc existent — nu se recalculeaza)
  function ruleazaCascada(input) {
    input = input || {};
    var m0 = m0_tipLucrare(input);
    if (m0.eroare) return { blocat: true, m0: m0 };
    var m5 = m5_compartimentare(m0, input.compartimentare || {});
    var m6 = m6_stabilitate(m0, input.stabilitate || {});
    var m6b = m6b_clasificareVecinatati(m0, { grad_stabilitate: (input.stabilitate || {}).grad }, input.vecinatati || []);
    var m9niv = m9_niveluriMaxime(m0, input.niveluri || {});
    return {
      blocat: false, m0: m0, m5_compartimentare: m5, m6_stabilitate: m6, m6b_vecinatati: m6b, m9_niveluri: m9niv,
      neconformitati_totale: (m6b.neconformitati || []).length + (m5.conform === false ? 1 : 0) + (m9niv.conform === false ? 1 : 0)
    };
  }

  // M6c — verificare distante MINIME intre cladirile PROPRII ale aceluiasi ansamblu/plan de situatie
  // (nu doar fata de vecini externi) — Tabelul 4/145 se aplica intre ORICE doua constructii/
  // compartimente de incendiu, indiferent daca apartin aceluiasi beneficiar sau nu. Grad si risc
  // identice pe ambele parti (aceeasi functiune/regim in tot ansamblul), spre deosebire de M6b unde
  // vecinul e necunoscut si se estimeaza conservator.
  // v4.4: perechile care fac parte din ACELASI grup constructiv (componenta conexa — vezi
  // grupeazaInComponenteConexe din 25-ssi-dwg-import.js) NU se verifica la distanta minima, chiar
  // daca distanta directa dintre ele nu e sub prag (ex. un triplex in L: A-B si B-C alipite, dar
  // A-C pot fi la >0,3m direct intre ele — tot fac parte din acelasi volum continuu prin B).
  function m6c_distanteIntreCladiriProprii(m0, m6, distanteIntreCladiri, riscPropriu, grupuriConstructive) {
    var risc = riscPropriu || 'mic';
    var grupPeCladire = {};
    (grupuriConstructive || []).forEach(function (g) { (g.cladiri_incluse || []).forEach(function (id) { grupPeCladire[id] = g.id_grup; }); });
    var rezultate = [];
    (distanteIntreCladiri || []).forEach(function (perechi) {
      var acelasiGrup = grupPeCladire[perechi.a] != null && grupPeCladire[perechi.a] === grupPeCladire[perechi.b];
      // Cladiri practic alipite (contur la contur, <0.3m) SAU parte a aceluiasi grup constructiv
      // continuu (dedus geometric, NU din eticheta): Tabelul 4/145 (distante) nu se aplica aici —
      // cerinta reala e un perete antifoc (REI) intre unitati, verificare distincta (M4b/materiale).
      if (perechi.posibil_alipite || acelasiGrup) {
        rezultate.push({ a: perechi.a, b: perechi.b, distanta_reala_m: perechi.distanta_m, alipite: true,
          nota: acelasiGrup && !perechi.posibil_alipite
            ? 'Parte a aceluiași volum construit continuu (grup ' + grupPeCladire[perechi.a] + ') — nu se verifică distanța minimă între unități ale aceluiași grup.'
            : 'Clădiri practic alipite (< 0,3 m) — posibil duplex/cuplare cu perete comun. Nu se verifică distanța minimă (Tabelul 4/145), ci prezența și rezistența la foc a peretelui antifoc despărțitor (secțiunea materiale/DoP).' });
        return;
      }
      if (perechi.distanta_m == null) { rezultate.push({ a: perechi.a, b: perechi.b, distanta_reala_m: null, eroare: 'distanta nedeterminata' }); return; }
      var d = N().getDistantaMinima({
        tip_lucrare: m0.regim_tabele, grad_propriu: m6.grad_stabilitate, grad_vecin: m6.grad_stabilitate,
        risc_vecin: risc, sprinklerizat: false, perete_CF_pe_fatada_comuna: false
      });
      if (d.eroare) { rezultate.push({ a: perechi.a, b: perechi.b, distanta_reala_m: perechi.distanta_m, eroare: d.eroare }); return; }
      rezultate.push({
        a: perechi.a, b: perechi.b, distanta_necesara_m: d.valoare_m, distanta_necesara_norma: d.norma,
        distanta_reala_m: perechi.distanta_m, conforma: perechi.distanta_m >= d.valoare_m
      });
    });
    var neconforme = rezultate.filter(function (r) { return r.conforma === false; });
    return { perechi: rezultate, nrNeconforme: neconforme.length, neconforme: neconforme };
  }

  // M-urbanism — POT/CUT reale ale ansamblului din geometria + adnotarile citite din DXF (nu
  // recalculate din normativ — sunt date de proiect, doar agregate pe tot ansamblul).
  function m_urbanismAnsamblu(cladiriPropuse, tipuriCladiri, arieTerenMp) {
    var grupuri = {};
    (cladiriPropuse || []).forEach(function (c) {
      var sc = (c.urbanism_adnotat && c.urbanism_adnotat.sc_mp != null) ? c.urbanism_adnotat.sc_mp : c.arie_mp;
      var sd = (c.urbanism_adnotat && c.urbanism_adnotat.sd_mp != null) ? c.urbanism_adnotat.sd_mp : null;
      var cheie = 'Sc_' + sc;
      if (!grupuri[cheie]) grupuri[cheie] = { cheie: cheie, denumire: (tipuriCladiri && tipuriCladiri[cheie]) || ('Tip Sc=' + sc + ' mp'), sc_mp: sc, sd_mp: sd, n: 0 };
      grupuri[cheie].n++;
    });
    var lista = Object.keys(grupuri).map(function (k) { return grupuri[k]; });
    var totalSc = lista.reduce(function (s, g) { return s + g.n * g.sc_mp; }, 0);
    var totalSd = lista.reduce(function (s, g) { return s + g.n * (g.sd_mp || 0); }, 0);
    return {
      nrCladiriTotal: (cladiriPropuse || []).length, tipuri: lista, totalSc_mp: totalSc, totalSd_mp: totalSd,
      arieTeren_mp: arieTerenMp || null,
      pot_ansamblu_pct: arieTerenMp ? +(100 * totalSc / arieTerenMp).toFixed(2) : null,
      cut_ansamblu: (arieTerenMp && totalSd) ? +(totalSd / arieTerenMp).toFixed(3) : null
    };
  }

  // M5b — compartimentare pe GRUPURI constructive (v4.4): un grup cuplat/duplex/triplex (componenta
  // conexa de cladiri alipite, vezi grupeazaInComponenteConexe) NU inseamna automat compartimente
  // separate — daca nu exista un perete despartitor cu rezistenta la foc DECLARATA/calificata drept
  // element de compartimentare intre unitati, grupul e UN SINGUR compartiment de incendiu, cu aria
  // insumata a tuturor unitatilor (regula v4.4 #26) — NU se verifica fiecare unitate izolat doar
  // pentru ca are cartus propriu.
  function m5b_compartimentareGrupuri(m0, grad, grupuriConstructive, cladiriPropuse, peretiDespartitoriDeclarati) {
    var cladirePeId = {}; (cladiriPropuse || []).forEach(function (c) { cladirePeId[c.id] = c; });
    function sdCladire(id) { var c = cladirePeId[id]; return c && c.urbanism_adnotat && c.urbanism_adnotat.sd_mp != null ? c.urbanism_adnotat.sd_mp : (c ? c.arie_mp : 0); }
    var peretePeGrup = {}; (peretiDespartitoriDeclarati || []).forEach(function (p) { peretePeGrup[p.id_grup] = p; });

    return (grupuriConstructive || []).map(function (g) {
      if (g.cladiri_incluse.length === 1) {
        var sdIndiv = sdCladire(g.cladiri_incluse[0]);
        var rIndiv = m5_compartimentare(m0, { grad: grad, arie_construita_mp: sdIndiv, niveluri: 1 });
        return { id_grup: g.id_grup, tip: g.tip, cladiri_incluse: g.cladiri_incluse, tratament: 'COMPARTIMENT_PROPRIU', arie_verificata_mp: sdIndiv, verificare: rIndiv };
      }
      var perete = peretePeGrup[g.id_grup];
      var areRezistentaCalificata = perete && perete.rezistenta_foc_declarata;
      if (areRezistentaCalificata) {
        var perUnitate = g.cladiri_incluse.map(function (id) { return { id: id, arie_mp: sdCladire(id) }; });
        return {
          id_grup: g.id_grup, tip: g.tip, cladiri_incluse: g.cladiri_incluse, tratament: 'COMPARTIMENTE_DISTINCTE',
          motiv: 'Peretele comun are rezistență la foc declarată (' + perete.rezistenta_foc_declarata + ') suficientă pentru a separa unitățile ca compartimente de incendiu distincte — fiecare unitate se verifică individual.',
          compartimente: perUnitate.map(function (u) { return { id: u.id, arie_mp: u.arie_mp, verificare: m5_compartimentare(m0, { grad: grad, arie_construita_mp: u.arie_mp, niveluri: 1 }) }; })
        };
      }
      var arieTotala = g.cladiri_incluse.reduce(function (s, id) { return s + sdCladire(id); }, 0);
      var rUnic = m5_compartimentare(m0, { grad: grad, arie_construita_mp: arieTotala, niveluri: 1 });
      return {
        id_grup: g.id_grup, tip: g.tip, cladiri_incluse: g.cladiri_incluse, tratament: 'COMPARTIMENT_UNIC',
        motiv: 'Nu există un perete de separare cu rezistență la foc calificată declarată între unități — grupul cuplat se tratează ca UN SINGUR compartiment de incendiu, cu aria însumată a tuturor unităților (' + g.cladiri_incluse.length + ' unități).',
        arie_verificata_mp: arieTotala, verificare: rUnic,
        avertisment: rUnic.conform === false ? 'Aria însumată depășește limita admisă — soluții: perete antifoc calificat între unități (documentat, cu DoP) SAU tratare ca un singur compartiment supradimensionat (neconform, necesită corecție/măsuri compensatorii).' : null
      };
    });
  }

  G.SSI_ENGINE = {
    TIPURI_LUCRARE: TIPURI_LUCRARE,
    m0_tipLucrare: m0_tipLucrare, m5_compartimentare: m5_compartimentare, m6_stabilitate: m6_stabilitate,
    m6b_clasificareVecinatati: m6b_clasificareVecinatati, m9_niveluriMaxime: m9_niveluriMaxime,
    m6c_distanteIntreCladiriProprii: m6c_distanteIntreCladiriProprii, m_urbanismAnsamblu: m_urbanismAnsamblu,
    m5b_compartimentareGrupuri: m5b_compartimentareGrupuri,
    ruleazaCascada: ruleazaCascada
  };
  console.log('[SSI] cascada M0-M12 incarcata (window.SSI_ENGINE)');
})(window);
