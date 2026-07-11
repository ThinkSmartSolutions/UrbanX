/* ============================================================================
 * UrbanX — SSI: MOTOR RELEVEE + CALCUL VOLUM REAL (js/25-ssi-relevee-import.js)
 * v5.0, Secțiunea 1 — planul de situație dă Sc/Sd/regim ca text, NU volumul real
 * (nu spune nimic despre panta/forma acoperișului sau dacă podul e amenajabil).
 * Volumul cere date dintr-un releveu (plan + fațadă/secțiune), per TIP de clădire
 * (un releveu reprezentativ aplicat pe toate amprentele identice din plan).
 *
 * Regulă critică: dacă nu există releveu pentru un tip, NU se inventează volumul
 * (nu se face Sc×3m implicit) — se marchează explicit lipsa, nu se presupune.
 *
 * window.SSI_RELEVEE: calculeazaVolum() · asociazaReleveuLaAmprente() · cheieTipReleveu()
 * ========================================================================== */
(function (G) {
  'use strict';

  function cheieTipReleveu(regim, arie_construita_mp) {
    return (regim || '?') + '_' + (arie_construita_mp != null ? arie_construita_mp : '?');
  }

  // Formula explicita — nu aproximare presupusa. tip_acoperis necunoscut => eroare explicita,
  // NU forma implicita (un acoperis presupus gresit denatureaza volumul si sarcina termica).
  function calculeazaVolum(releveu, amprentaLaSol) {
    var tip = releveu.tip_acoperis;
    var arie = +amprentaLaSol.arie_mp || 0;
    // Nicio valoare lipsa nu produce NaN tacit — se opreste explicit cu motiv (bug real gasit:
    // un camp necompletat (undefined) facea ca formula sa produca NaN, care trecea nefiltrat
    // in document ca "NaN m³" in loc sa fie tratat ca "necalculat, lipsa data").
    if (releveu.inaltime_cornisa == null || isNaN(+releveu.inaltime_cornisa)) {
      return { eroare: 'H_CORNISA_LIPSA', actiune: 'H cornișă nu este completată — volumul nu se calculează fără ea.' };
    }
    if (!tip) return { eroare: 'TIP_ACOPERIS_NECOMPLETAT', actiune: 'Tipul de acoperiș nu este ales — se cere clarificare din releveu, nu se presupune formă implicită.' };
    if (tip !== 'plat' && (releveu.inaltime_coama == null || isNaN(+releveu.inaltime_coama))) {
      return { eroare: 'H_COAMA_LIPSA', actiune: 'H coamă nu este completată (necesară pentru acoperiș ' + tip.replace(/_/g, ' ') + ') — volumul nu se calculează fără ea.' };
    }
    var h_cornisa = +releveu.inaltime_cornisa, h_coama = +releveu.inaltime_coama;
    var volumPereti = arie * h_cornisa;
    var volumAcoperis;
    if (tip === 'plat') volumAcoperis = 0;
    else if (tip === 'sarpanta_doua_ape') volumAcoperis = arie * (h_coama - h_cornisa) * 0.5;
    else if (tip === 'sarpanta_patru_ape') volumAcoperis = arie * (h_coama - h_cornisa) / 3;
    else return { eroare: 'TIP_ACOPERIS_NECUNOSCUT', actiune: 'Se cere clarificare din releveu — nu se presupune formă implicită.' };
    return {
      volum_total_mc: Math.round((volumPereti + volumAcoperis) * 10) / 10,
      volum_pereti_mc: Math.round(volumPereti * 10) / 10,
      volum_acoperis_mc: Math.round(volumAcoperis * 10) / 10,
      pod_amenajabil: !!releveu.poduri_amenajabile,
      nota: releveu.poduri_amenajabile
        ? 'Podul amenajabil se include și în aria desfășurată (Sd) — verifică dacă Sd din cartușul planului de situație reflectă deja acest lucru.'
        : 'Pod tehnic/nefolosibil — nu intră în aria desfășurată, dar intră în volumul total (relevant pentru sarcina termică pe volum, nu pe arie).'
    };
  }

  // Leaga releveele incarcate (o data per TIP de cladire) de fiecare amprenta detectata in
  // planul de situatie — daca un tip nu are releveu, volumul ramane null + avertisment explicit,
  // NU se aproximeaza (aceeasi regula ca la vecinatati/normative: lipsa se semnaleaza, nu se ascunde).
  function asociazaReleveuLaAmprente(releveeMap, cladiriDinPlanSituatie) {
    return (cladiriDinPlanSituatie || []).map(function (cladire) {
      var ua = cladire.urbanism_adnotat || {};
      var scEfectiv = ua.sc_mp != null ? ua.sc_mp : cladire.arie_mp;
      var cheie = cheieTipReleveu(ua.regim, scEfectiv);
      var releveu = releveeMap && releveeMap[cheie];
      var copie = {};
      for (var k in cladire) if (Object.prototype.hasOwnProperty.call(cladire, k)) copie[k] = cladire[k];
      copie.cheie_tip_releveu = cheie;
      if (!releveu) {
        copie.volum = null;
        copie.avertisment_releveu = 'Nu există releveu încărcat pentru acest tip de clădire (' + cheie + ') — volumul rămâne necalculat, nu se presupune.';
        return copie;
      }
      copie.volum = calculeazaVolum(releveu, { arie_mp: scEfectiv });
      return copie;
    });
  }

  G.SSI_RELEVEE = { calculeazaVolum: calculeazaVolum, asociazaReleveuLaAmprente: asociazaReleveuLaAmprente, cheieTipReleveu: cheieTipReleveu };
  console.log('[SSI] motor relevee + calcul volum real incarcat (window.SSI_RELEVEE) — v5.0');
})(window);
