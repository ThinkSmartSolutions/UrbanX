/* ============================================================================
 * UrbanX — SSI: M14 CONFORMITATE + M15 SOLUTII COMPENSATORII (js/25-ssi-engine-M14-M15.js)
 * Aditiv, se grefeaza pe rezultatele SSI_ENGINE (M0-M12).
 *
 * v4.1 (11 iul 2026, completare Florin): taxonomie CU 3 STARI, nu 2 — nu tot ce e
 * neconform e o "masura compensatorie". Distinctie:
 *  - NECONFORM_CORECTIE_PROIECT: cerinta normativa are o SINGURA valoare minima/maxima,
 *    fara alternativa documentata legal (ex. latime usa) -> se corecteaza direct elementul,
 *    nu se deschide o discutie de solutii care nu exista legal.
 *  - NECONFORM_MASURA_COMPENSATORIE_POSIBILA: normativul permite explicit o solutie
 *    alternativa cu efect echivalent (ex. arie mai mare cu sprinklere) -> catalogul M15.
 * Regula critica: compensabilitatea e o PROPRIETATE A CATALOGULUI (existenta unor
 * solutii documentate in CATALOG_SOLUTII pt acel tip), NU o presupunere/flag arbitrar
 * trimis de apelant — de asta m14 NU mai primeste `compensabil` ca input, il deriva.
 *
 * window.SSI_M14: verificaConformitate()
 * window.SSI_M15: genereazaSolutii() · CATALOG_SOLUTII
 * ========================================================================== */
(function (G) {
  'use strict';

  // ── M14 — Conformitate (3 stari) ──
  // verificare = { id, tip, valoare_necesara, valoare_proiectata, sursa_normativa, sens,
  //                unitate, descriere_element, element_id }
  function m14_verificaConformitate(verificare) {
    var conform = (verificare.valoare_proiectata != null && verificare.valoare_necesara != null)
      ? (verificare.sens === 'min' ? verificare.valoare_proiectata >= verificare.valoare_necesara : verificare.valoare_proiectata <= verificare.valoare_necesara)
      : null;
    if (conform === true) return { id: verificare.id, status: 'CONFORM', sursa: verificare.sursa_normativa };
    if (conform === null) return { id: verificare.id, status: 'NEDETERMINAT', sursa: verificare.sursa_normativa, mesaj: 'Lipsesc date de proiect pentru verificare.' };

    var deficit = (verificare.valoare_necesara != null && verificare.valoare_proiectata != null) ? Math.abs(verificare.valoare_necesara - verificare.valoare_proiectata) : null;
    // Compensabilitatea = are catalogul (M15) solutii documentate pt acest TIP de cerinta? Nu se presupune, se deriva.
    var areAlternativa = !!(G.SSI_M15 && G.SSI_M15.CATALOG_SOLUTII && G.SSI_M15.CATALOG_SOLUTII[verificare.tip] && G.SSI_M15.CATALOG_SOLUTII[verificare.tip].length);

    if (areAlternativa) {
      return {
        id: verificare.id, status: 'NECONFORM_MASURA_COMPENSATORIE_POSIBILA', tip: verificare.tip,
        deficit: deficit, sursa_normativa: verificare.sursa_normativa, necesita_solutie: true,
        element_id: verificare.element_id || null
      };
    }
    return {
      id: verificare.id, status: 'NECONFORM_CORECTIE_PROIECT', tip: verificare.tip,
      deficit: deficit, sursa_normativa: verificare.sursa_normativa, element_id: verificare.element_id || null,
      mesaj: 'Cerința "' + (verificare.descriere_element || verificare.tip) + '" nu respectă valoarea normată — nu există o alternativă legală documentată, se corectează direct elementul din proiect.',
      corectie_necesara: {
        ce: (verificare.descriere_element || verificare.tip) + ' trebuie adus la valoarea minimă/maximă normată',
        valoare_actuala: verificare.valoare_proiectata, valoare_necesara: verificare.valoare_necesara,
        unitate: verificare.unitate || '', sursa: verificare.sursa_normativa
      }
    };
  }

  // ── M15 — Catalog solutii compensatorii (candidate, nu auto-aplicare) ──
  var CATALOG_SOLUTII = {
    ARIE_COMPARTIMENT_DEPASITA: [
      { solutie: 'Introducere perete/planșeu antifoc suplimentar (compartimentare)',
        efect: function (deficit, ctx) { var n = ctx && ctx.arie_proiectata && ctx.arie_maxima_admisa ? Math.ceil(ctx.arie_proiectata / ctx.arie_maxima_admisa) : null; return n ? 'Împarte compartimentul în ' + n + ' compartimente noi, fiecare ≤ arie maximă admisă' : 'Necesită compartimentare suplimentară'; },
        cerinte_suplimentare: ['Element cu rezistență REI corespunzătoare gradului de stabilitate', 'Uși EI la traversări, cu autoînchidere'],
        recalcul_necesar: ['M9 (evacuare — traseele se pot modifica)', 'M11 (instalații)'] },
      { solutie: 'Instalație automată de detectare+semnalizare (acoperire totală) — majorare admisă +25% (T41 nota a / T147 nota a)',
        efect: function () { return 'Majorare arie admisă cu 25%, cu excepția clădirilor înalte/foarte înalte (verificare explicită, nu presupusă).'; },
        cerinte_suplimentare: ['Instalație IDSAI cu acoperire totală'], recalcul_necesar: ['M11'] },
      { solutie: 'Instalație automată de stingere (sprinklere) — majorare admisă +100% pt grad III/IV/V (T41 nota b / T147 nota a)',
        efect: function () { return 'Conform T41/T147, sprinklerele pot justifica o arie maximă admisă majorată — verificare explicită, nu presupusă.'; },
        cerinte_suplimentare: ['Rezervă de apă', 'Grup de pompare', 'Sursă de energie de rezervă'], recalcul_necesar: ['M11 complet'] },
      { solutie: 'Reducerea ariei prin redistribuire funcțională (relocare parțială)',
        efect: function () { return 'Soluție arhitecturală — necesită replanificare, evaluată de proiectant, nu calculabilă automat.'; },
        cerinte_suplimentare: ['Reproiectare parțială plan'], recalcul_necesar: ['Toată cascada M1-M14 pentru zona replanificată'] }
    ],
    NIVELURI_DEPASITE: [
      { solutie: 'Reducerea numărului de niveluri supraterane la limita admisă (T42/T148)', efect: function () { return 'Singura soluție directă — pragul de niveluri nu se compensează prin instalații (verifică excepțiile din notele T42/T148 pt +1 nivel cu sprinklere, unde aplicabil).'; }, recalcul_necesar: ['M5', 'M9'] },
      { solutie: '+1 nivel cu sprinklere/ceață de apă (doar dacă destinația e în excepțiile T42 nota a / T148 notă)', efect: function () { return 'Aplicabil DOAR pentru destinațiile explicit exceptate în normativ, cu expertiză tehnică de specialitate.'; }, recalcul_necesar: ['M11'] }
    ],
    DISTANTA_VECINATATE_INSUFICIENTA: [
      { solutie: 'Perete antifoc (REI corespunzător) pe fațada orientată spre vecinătate, fără goluri sau cu goluri protejate EI',
        efect: function () { return 'Reducere posibilă cu expertiză tehnică de specialitate (T4 nota b / T145 nota b) — NU automat, necesită hotărâre scrisă a conducerii investitorului + expertiză.'; },
        recalcul_necesar: ['M6b/M12'] },
      { solutie: 'Sprinklerizare integrală a cel puțin uneia din construcții — reducere până la 25% (doar T4, construcții noi)',
        efect: function () { return 'Aplicabil doar construcțiilor NOI (T4 nota b) — nu se aplică la T145 (existent).'; }, recalcul_necesar: ['M6b/M12', 'M11'] },
      { solutie: 'Retragerea volumului proiectat', efect: function (deficit) { return deficit ? 'Necesită retragere de min. ' + deficit + ' m față de soluția actuală' : 'Necesită retragere suplimentară'; }, recalcul_necesar: ['M0 geometrie', 'M6b/M12'] }
    ],
    LUNGIME_EVACUARE_DEPASITA: [
      { solutie: 'Ieșire de evacuare suplimentară', efect: function () { return 'Reduce traseul maxim prin adăugarea unei ieșiri poziționate corespunzător.'; }, recalcul_necesar: ['M9 complet (fluxuri, lățimi)'] },
      { solutie: 'Instalație de sprinklere (poate justifica o lungime de evacuare majorată, conform normativ — verificare explicită necesară)', recalcul_necesar: ['M9', 'M11'] }
    ]
  };

  function m15_genereazaSolutii(neconformitate, context) {
    var candidate = CATALOG_SOLUTII[neconformitate.tip] || [];
    return candidate.map(function (c) {
      return {
        solutie: c.solutie,
        efect_calculat: c.efect ? c.efect(neconformitate.deficit, context) : null,
        cerinte_suplimentare: c.cerinte_suplimentare || [],
        recalcul_necesar: c.recalcul_necesar || [],
        necesita_aviz_ISU_pentru_solutia_alternativa: !!neconformitate.necesita_avizare_derogare
      };
    });
  }

  // Trasabilitate completa a deciziei (regula #12: cine/cand/ce/de ce)
  function m15_inregistreazaDecizie(neconformitate, solutieAleasa, proiectant) {
    return {
      neconformitate_initiala: neconformitate.mesaj || neconformitate.tip,
      sursa_normativa: neconformitate.sursa_normativa || neconformitate.norma,
      solutie_aleasa: solutieAleasa,
      validat_de: { nume: (proiectant && proiectant.nume) || null, nr_atestat: (proiectant && proiectant.nr_atestat) || null, data: (proiectant && proiectant.data) || null },
      rezultat_recalcul: null // se completeaza dupa rularea recalculului motoarelor afectate (recalcul_necesar)
    };
  }

  G.SSI_M14 = { verificaConformitate: m14_verificaConformitate };
  G.SSI_M15 = { CATALOG_SOLUTII: CATALOG_SOLUTII, genereazaSolutii: m15_genereazaSolutii, inregistreazaDecizie: m15_inregistreazaDecizie };
  console.log('[SSI] M14 conformitate + M15 solutii compensatorii incarcate (window.SSI_M14 / SSI_M15)');
})(window);
