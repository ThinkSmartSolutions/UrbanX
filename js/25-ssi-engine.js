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
  function m6b_clasificareVecinatati(m0, m6, vecinatatiDeclarate) {
    var rezultate = { vecinatati: [], neconformitati: [], avertismente: [] };
    (vecinatatiDeclarate || []).forEach(function (vecin) {
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
          conforma: null, estimat_implicit: estimatImplicit, confirmat: vecin.confirmat === true, sursa_distanta: vecin.sursa_distanta || 'manual'
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
        estimat_implicit: estimatImplicit, confirmat: vecin.confirmat === true, certitudine: vecin.certitudine || (estimatImplicit ? 'presupus_conservator' : 'confirmat_manual')
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

  G.SSI_ENGINE = {
    TIPURI_LUCRARE: TIPURI_LUCRARE,
    m0_tipLucrare: m0_tipLucrare, m5_compartimentare: m5_compartimentare, m6_stabilitate: m6_stabilitate,
    m6b_clasificareVecinatati: m6b_clasificareVecinatati, m9_niveluriMaxime: m9_niveluriMaxime,
    ruleazaCascada: ruleazaCascada
  };
  console.log('[SSI] cascada M0-M12 incarcata (window.SSI_ENGINE)');
})(window);
