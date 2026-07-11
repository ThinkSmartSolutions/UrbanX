/* ============================================================================
 * UrbanX — SSI: FISA DE NECONFORMITATE + VERDICT GENERAL + BUCLA DE REVERIFICARE
 * (js/25-ssi-engine-M14-verdict.js) — completare v4.1 (11 iul 2026)
 *
 * Regula #16: nu orice neconformitate e o "masura compensatorie" (vezi M14, 3 stari).
 * Regula #17: fiecare neconformitate se leaga de elementul concret din DWG (nivel,
 *             camera, layer, id) — nu se raporteaza generic.
 * Regula #18: verdictul general e PRIMUL lucru afisat, nu ultimul.
 * Regula #19: orice corectie de proiect declanseaza recalculul INTEGRAL al cascadei
 *             (o modificare geometrica poate afecta alte verificari), nu doar punctul corectat.
 *
 * window.SSI_M14_VERDICT: genereazaFisaNeconformitate() · comparaVersiuniProiect()
 * · genereazaVerdictGeneral()
 * ========================================================================== */
(function (G) {
  'use strict';

  // Fisa de neconformitate — localizeaza EXACT elementul (daca geometria din DWG e disponibila)
  function genereazaFisaNeconformitate(neconformitate, geometrieTeren) {
    var element = null;
    if (geometrieTeren && neconformitate.element_id) {
      var vecinatati = geometrieTeren.vecinatati_geometrie || [];
      element = vecinatati.filter(function (v) { return v.id === neconformitate.element_id; })[0] || null;
    }
    var identificare = element
      ? ('Vecinătate ' + element.id + (element.distanta_min_la_propriu_m != null ? ', distanță DWG ' + element.distanta_min_la_propriu_m + ' m' : ''))
      : (neconformitate.element_id ? ('Element ' + neconformitate.element_id + ' — localizare DWG indisponibilă, verifică manual în plan') : 'Localizare generală (nu ține de un element DWG punctual — vezi indicatorii de proiect)');

    return {
      id_neconformitate: neconformitate.id,
      tip: neconformitate.status,
      element: { identificare_in_plan: identificare, element_id: neconformitate.element_id || null },
      cerinta: { valoare_necesara: neconformitate.corectie_necesara ? neconformitate.corectie_necesara.valoare_necesara : null,
        valoare_proiectata: neconformitate.corectie_necesara ? neconformitate.corectie_necesara.valoare_actuala : null,
        sursa_normativa: neconformitate.sursa_normativa },
      actiune: neconformitate.status === 'NECONFORM_CORECTIE_PROIECT'
        ? 'CORECTARE DIRECTĂ: ' + (neconformitate.corectie_necesara ? neconformitate.corectie_necesara.ce : neconformitate.mesaj)
        : 'MĂSURĂ COMPENSATORIE POSIBILĂ: alege una din soluțiile propuse (vezi tabelul de soluții)',
      status_rezolvare: 'NEREZOLVAT'
    };
  }

  // Bucla de reverificare — compara fisele din rularea anterioara (v1) cu rezultatele noi (v2, dupa reimport DWG)
  // NU se presupune ca o corectie punctuala rezolva doar acel punct — apelantul trebuie sa fi rulat cascada COMPLETA
  // pt versiunea noua (regula #19), aici doar se compara fisa-cu-fisa.
  function comparaVersiuniProiect(fiseVechi, rezultateNoi, versiuneDwgNoua) {
    var neconformNoi = (rezultateNoi && rezultateNoi.neconformitati) || [];
    return (fiseVechi || []).map(function (f) {
      var incaNeconform = neconformNoi.filter(function (n) { return n.id_neconformitate === f.id_neconformitate; })[0];
      return Object.assign({}, f, {
        status_rezolvare: incaNeconform ? 'NEREZOLVAT' : 'REZOLVAT',
        versiune_dwg_verificare: versiuneDwgNoua || null
      });
    });
  }

  // Verdict general — trebuie afisat PRIMUL (regula #18), banner rosu/galben/verde
  function genereazaVerdictGeneral(toateNeconformitatile) {
    var lista = toateNeconformitatile || [];
    var corectiiNecesare = lista.filter(function (n) { return n.status === 'NECONFORM_CORECTIE_PROIECT' && n.status_rezolvare !== 'REZOLVAT'; });
    var masuriPendinte = lista.filter(function (n) { return n.status === 'NECONFORM_MASURA_COMPENSATORIE_POSIBILA' && !n.solutie_aleasa; });
    var masuriAplicate = lista.filter(function (n) { return n.status === 'NECONFORM_MASURA_COMPENSATORIE_POSIBILA' && n.solutie_aleasa; });

    if (corectiiNecesare.length) {
      return {
        verdict: 'NECONFORM — PROIECTUL NU POATE FI AUTORIZAT ÎN FORMA ACTUALĂ', culoare: 'rosu',
        motiv: corectiiNecesare.length + ' element(e) din proiect nu respectă cerințele minime și necesită corectare directă înainte de reluarea analizei.',
        lista: corectiiNecesare
      };
    }
    if (masuriPendinte.length) {
      return {
        verdict: 'ÎN AȘTEPTARE — DECIZIE PROIECTANT NECESARĂ', culoare: 'galben',
        motiv: masuriPendinte.length + ' cerință/cerințe pot fi rezolvate prin măsură compensatorie — proiectantul trebuie să aleagă soluția înainte de finalizarea scenariului.',
        lista: masuriPendinte
      };
    }
    return {
      verdict: masuriAplicate.length ? 'CONFORM — CU MĂSURI COMPENSATORII DOCUMENTATE' : 'CONFORM — PROIECTUL RESPECTĂ INTEGRAL CERINȚELE APLICABILE',
      culoare: masuriAplicate.length ? 'galben' : 'verde', lista: masuriAplicate
    };
  }

  // v4.2 (Florin): SINGURA blocare ramasa nu e la introducere, e la FINALIZARE — daca raman vecinatati
  // neconfirmate de proiectant (estimare automata/conservatoare, nu validata), scenariul NU poate fi
  // marcat/exportat ca FINAL pentru depunere (desi analiza DRAFT a mers inainte fara nicio blocare).
  function poateFiExportatFinal(vecinatati, statusNormativeNevalidate) {
    var neconfirmate = (vecinatati || []).filter(function (v) { return v.estimat_implicit && !v.confirmat; });
    var normativeNevalidate = statusNormativeNevalidate || [];
    var poate = neconfirmate.length === 0 && normativeNevalidate.length === 0;
    var motive = [];
    if (neconfirmate.length) motive.push(neconfirmate.length + ' vecinătate/vecinătăți au doar estimare automată, neconfirmată de proiectant (' + neconfirmate.map(function (v) { return v.id; }).join(', ') + ').');
    if (normativeNevalidate.length) motive.push(normativeNevalidate.length + ' sursă/surse normative fără validare de inginer/arhitect atestat.');
    return { poate: poate, motiv: motive.length ? motive.join(' ') : null };
  }

  G.SSI_M14_VERDICT = { genereazaFisaNeconformitate: genereazaFisaNeconformitate, comparaVersiuniProiect: comparaVersiuniProiect, genereazaVerdictGeneral: genereazaVerdictGeneral, poateFiExportatFinal: poateFiExportatFinal };
  console.log('[SSI] fisa neconformitate + verdict general + bucla reverificare incarcate (window.SSI_M14_VERDICT)');
})(window);
