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
  //
  // Bug real gasit (Florin, captura tabel §5): 6 perechi de cladiri neconforme (M6c) apareau ca 6
  // randuri IDENTICE — "Localizare generala", aceeasi "Actiune necesara" generica. Cauza: aceasta
  // functie ignora complet campurile descriere_element/valoare_proiectata/valoare_necesara/unitate
  // (care EXISTA deja pe obiectul neconformitate, atasate de m14_verificaConformitate) — folosea
  // DOAR cautarea in geometrieTeren.vecinatati_geometrie (care nu contine perechi intre cladiri
  // proprii, ci doar vecinatati externe) si un text static pt ramura MASURA_COMPENSATORIE. Rezultat:
  // orice neconformitate fara element_id gasit in acel array cadea pe acelasi text generic, indiferent
  // CARE pereche/cerinta era de fapt vizata — exact bug-ul semnalat ("nu inteleg la ce se aplica").
  function genereazaFisaNeconformitate(neconformitate, geometrieTeren) {
    var element = null;
    if (geometrieTeren && neconformitate.element_id) {
      var vecinatati = geometrieTeren.vecinatati_geometrie || [];
      element = vecinatati.filter(function (v) { return v.id === neconformitate.element_id; })[0] || null;
    }
    var identificare = element
      ? ('Vecinătate ' + element.id + (element.distanta_min_la_propriu_m != null ? ', distanță DWG ' + element.distanta_min_la_propriu_m + ' m' : ''))
      : (neconformitate.descriere_element
        ? neconformitate.descriere_element + (neconformitate.element_id ? ' (' + neconformitate.element_id + ')' : '')
        : (neconformitate.element_id ? ('Element ' + neconformitate.element_id + ' — localizare DWG indisponibilă, verifică manual în plan') : 'Localizare generală (nu ține de un element DWG punctual — vezi indicatorii de proiect)'));

    var valProiectata = neconformitate.corectie_necesara ? neconformitate.corectie_necesara.valoare_actuala : neconformitate.valoare_proiectata;
    var valNecesara = neconformitate.corectie_necesara ? neconformitate.corectie_necesara.valoare_necesara : neconformitate.valoare_necesara;
    var unitate = (neconformitate.corectie_necesara ? neconformitate.corectie_necesara.unitate : neconformitate.unitate) || '';
    var cifre = (valProiectata != null && valNecesara != null)
      ? ' — proiectat ' + valProiectata + unitate + ' vs. necesar ' + valNecesara + unitate + (neconformitate.deficit != null ? ', deficit ' + Math.round(neconformitate.deficit * 100) / 100 + unitate : '')
      : '';

    return {
      id_neconformitate: neconformitate.id,
      tip: neconformitate.status,
      element: { identificare_in_plan: identificare, element_id: neconformitate.element_id || null },
      cerinta: { valoare_necesara: valNecesara, valoare_proiectata: valProiectata, sursa_normativa: neconformitate.sursa_normativa },
      actiune: neconformitate.status === 'NECONFORM_CORECTIE_PROIECT'
        ? 'CORECTARE DIRECTĂ: ' + (neconformitate.corectie_necesara ? neconformitate.corectie_necesara.ce : neconformitate.mesaj) + cifre
        : 'MĂSURĂ COMPENSATORIE POSIBILĂ' + cifre + ': alege una din soluțiile propuse (vezi tabelul de soluții)',
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
  //
  // v6.0 (Florin, 12 iul — audit "12_urbanx_ssi_v6.0_MASTER_FINAL"): terminologie EXACTA ceruta,
  // fara stare improvizata: APT_PENTRU_AVIZARE / APT_CONDITIONAT / NEAPT_PENTRU_AVIZARE, cu lista
  // EXHAUSTIVA de conditii la variantele intermediare — nu doar un text generic "in asteptare".
  // materialeInfo (optional): rezultatul SSI_M4B.valideazaMateriale() — "documente justificative
  // lipsa" (Sectiunea 7/17 a auditului) e al doilea motiv posibil de APT_CONDITIONAT, alaturi de
  // masurile compensatorii neasumate; o lista NEDECLARATA (materialeInfo omis) nu blocheaza nimic
  // (backward-compatibil cu apelurile existente care nu-l furnizeaza inca).
  function genereazaVerdictGeneral(toateNeconformitatile, materialeInfo) {
    var lista = toateNeconformitatile || [];
    var corectiiNecesare = lista.filter(function (n) { return n.status === 'NECONFORM_CORECTIE_PROIECT' && n.status_rezolvare !== 'REZOLVAT'; });
    var masuriPendinte = lista.filter(function (n) { return n.status === 'NECONFORM_MASURA_COMPENSATORIE_POSIBILA' && !n.solutie_aleasa; });
    var masuriAplicate = lista.filter(function (n) { return n.status === 'NECONFORM_MASURA_COMPENSATORIE_POSIBILA' && n.solutie_aleasa; });
    var documenteLipsa = (materialeInfo && materialeInfo.neconfirmate) || [];

    if (corectiiNecesare.length) {
      return {
        verdict: 'NEAPT_PENTRU_AVIZARE', verdict_label: 'NEAPT PENTRU AVIZARE', culoare: 'rosu',
        motiv: corectiiNecesare.length + ' element(e) din proiect nu respectă cerințele minime și necesită corectare directă (nerezolvată) — proiectul nu poate fi autorizat în forma actuală.',
        conditii: corectiiNecesare.map(function (n) { return { tip: 'CORECȚIE DIRECTĂ OBLIGATORIE', element: n.element_id || n.id, actiune: (n.corectie_necesara && n.corectie_necesara.ce) || n.mesaj || 'de corectat' }; }),
        lista: corectiiNecesare
      };
    }
    if (masuriPendinte.length || documenteLipsa.length) {
      var conditii = masuriPendinte.map(function (n) { return { tip: 'MĂSURĂ COMPENSATORIE DE ALES', element: n.element_id || n.id, actiune: 'Selectează soluția compensatorie din tabelul de soluții candidate (secțiunea vizată).' }; })
        .concat(documenteLipsa.map(function (m) { return { tip: 'DOCUMENT JUSTIFICATIV LIPSĂ', element: m.nume, actiune: 'Atașează DoP/certificat/fișă tehnică pentru materialul „' + m.nume + '" înainte de export FINAL.' }; }));
      return {
        verdict: 'APT_CONDITIONAT', verdict_label: 'APT CONDIȚIONAT', culoare: 'galben',
        motiv: (masuriPendinte.length ? masuriPendinte.length + ' cerință/cerințe rezolvabile prin măsură compensatorie încă neasumată' : '') +
          (masuriPendinte.length && documenteLipsa.length ? '; ' : '') +
          (documenteLipsa.length ? documenteLipsa.length + ' document/documente justificative (DoP/certificat) lipsă' : '') +
          ' — vezi lista exhaustivă de condiții de îndeplinit înainte de export FINAL.',
        conditii: conditii,
        lista: masuriPendinte
      };
    }
    return {
      verdict: 'APT_PENTRU_AVIZARE', verdict_label: 'APT PENTRU AVIZARE', culoare: 'verde',
      motiv: masuriAplicate.length ? 'Toate cerințele sunt CONFORM sau CONFORM prin măsură compensatorie cu soluție aleasă; toate documentele justificative disponibile sunt atașate.' : 'Proiectul respectă integral cerințele aplicabile analizate.',
      conditii: [], lista: masuriAplicate
    };
  }

  // v4.2 (Florin): SINGURA blocare ramasa nu e la introducere, e la FINALIZARE — daca raman vecinatati
  // neconfirmate de proiectant (estimare automata/conservatoare, nu validata), scenariul NU poate fi
  // marcat/exportat ca FINAL pentru depunere (desi analiza DRAFT a mers inainte fara nicio blocare).
  function poateFiExportatFinal(vecinatati, statusNormativeNevalidate, confirmatDeProiectant, integritateCalcul, materialeInfo, capitoleIncomplete) {
    var neconfirmate = (vecinatati || []).filter(function (v) { return v.estimat_implicit && !v.confirmat; });
    var normativeNevalidate = statusNormativeNevalidate || [];
    // Simetrie cu vecinatatile (v4.2): sursele normative pot fi "validate" fie institutional (status
    // 'validat_sursa' in normative.json), fie prin asumarea raspunderii profesionale a proiectantului
    // atestat pentru ACEST export (bifa dedicata in panoul SSI) — la fel cum semnatura lui ar fi singura
    // "validare" si in afara platformei.
    var normativeBlocheaza = normativeNevalidate.length > 0 && !confirmatDeProiectant;
    // Bug real gasit (Florin, BUG 5): un document cu erori interne de calcul (volume NaN, verificari
    // de distanta rulate pe 0 perechi cand ar fi trebuit sa fie N*(N-1)/2, contradictii intre sectiuni)
    // se putea marca FINAL doar pentru ca sursele normative erau asumate — integritatea calculului
    // NU e conditionata de statusul normativelor, e o verificare SEPARATA si obligatorie.
    var eroriCalcul = (integritateCalcul && integritateCalcul.erori) || [];
    // Materialele cu variabilitate reala (Regula #13): in DRAFT/proiectare NU se mai afiseaza ca
    // blocaj vizibil in document (Florin, 12 iul: "nu mai astepta ca utilizatorul sa mai adauge el
    // ceva, cum e DoP" — in faza de proiectare e normal sa nu existe inca un DoP de produs concret,
    // proiectul prescrie doar clasa minima necesara) — dar cerinta legala reala (DoP la depunerea la
    // ISU) nu dispare, doar se muta EXCLUSIV la poarta de export FINAL, cu aceeasi bifa de asumare a
    // raspunderii profesionale ca la normative/vecinatati (nu o bifa separata suplimentara).
    var materialeNeconfirmate = (materialeInfo && materialeInfo.neconfirmate) || [];
    var materialeBlocheaza = materialeNeconfirmate.length > 0 && !confirmatDeProiectant;
    // Sectiunea 14 (audit v6.0): un capitol din Ord. 180/2022 Anexa 5 cu un element BLOCANT lipsa
    // (nu o limitare cunoscuta a platformei, cum e "planuri retele" netrackuit inca) refuza si el
    // exportul FINAL — vezi urbanx-docx-builder.js _checklistCapitole (blocant:true/false per lipsa).
    var capitoleIncompleteLista = capitoleIncomplete || [];
    var poate = neconfirmate.length === 0 && !normativeBlocheaza && eroriCalcul.length === 0 && !materialeBlocheaza && capitoleIncompleteLista.length === 0;
    var motive = [];
    if (eroriCalcul.length) motive.push('Erori de integritate a calculului: ' + eroriCalcul.join('; ') + '.');
    if (neconfirmate.length) motive.push(neconfirmate.length + ' vecinătate/vecinătăți au doar estimare automată, neconfirmată de proiectant (' + neconfirmate.map(function (v) { return v.id; }).join(', ') + ').');
    if (normativeNevalidate.length && !confirmatDeProiectant) motive.push(normativeNevalidate.length + ' sursă/surse normative fără validare de inginer/arhitect atestat (bifează confirmarea din panoul SSI pentru a asuma răspunderea profesională).');
    if (materialeBlocheaza) motive.push(materialeNeconfirmate.length + ' material/materiale cu variabilitate reală nu au încă DoP/fișă tehnică de produs concret atașată (' + materialeNeconfirmate.map(function (m) { return m.nume; }).join(', ') + ') — bifează confirmarea din panoul SSI pentru a asuma răspunderea profesională dacă dorești export FINAL fără DoP-uri atașate.');
    if (capitoleIncompleteLista.length) motive.push(capitoleIncompleteLista.length + ' capitol(e) din Ord. 180/2022 Anexa 5 incomplet(e): ' + capitoleIncompleteLista.map(function (c) { return 'Capitol ' + c.nr + ' (' + c.titlu + ')'; }).join(', ') + '.');
    return { poate: poate, motiv: motive.length ? motive.join(' ') : null, normativeAsumatePeRaspundere: !!(normativeNevalidate.length && confirmatDeProiectant) };
  }

  G.SSI_M14_VERDICT = { genereazaFisaNeconformitate: genereazaFisaNeconformitate, comparaVersiuniProiect: comparaVersiuniProiect, genereazaVerdictGeneral: genereazaVerdictGeneral, poateFiExportatFinal: poateFiExportatFinal };
  console.log('[SSI] fisa neconformitate + verdict general + bucla reverificare incarcate (window.SSI_M14_VERDICT)');
})(window);
