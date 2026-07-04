/* ============================================================================
 * UrbanX — Program funcțional (space program) editabil + dimensionare automată
 * Model: sistemul PROPUNE lista de spații (din normative + capacitate) →
 *        utilizatorul EDITEAZĂ → totul se recalculează (bilanț Su/Sc/Sd, POT/CUT,
 *        memorii, antemăsurători, AEDIS).
 * window.UXSpace: TEMPLATES, propune(fn, params), bilant(spatii)
 * ========================================================================== */
(function (G) {
  'use strict';

  // Catalog normativ per funcțiune. Fiecare spațiu la o CAPACITATE DE REFERINȚĂ.
  //  scal: 'fix'  → suprafața rămâne constantă indiferent de capacitate
  //        'lin'  → suprafața scalează liniar cu (capacitate / cap_ref)
  //        'pas'  → nr. bucăți scalează în trepte (o unitate la fiecare `la` beneficiari)
  //  mp = suprafață utilă unitară (mp); buc = nr. unități la capacitatea de referință
  var TEMPLATES = {
    'centru-social': {
      driver: 'capacitate', unit: 'beneficiari', cap_ref: 50, cap_default: 50,
      norma: 'Ord. MMJS 29/2019 (standarde centre de zi vârstnici) · NP 011 · OMS 119/2014 · NP 051/2012',
      spatii: [
        // zonă, denumire, nivel, buc, mp unitar (la cap_ref), scalare, ocupanți, obligatoriu
        { zona: 'Primire', nume: 'Windfang / tampon acces', niv: 'P', buc: 1, mp: 6.5, scal: 'fix', ocup: 0, ob: 1 },
        { zona: 'Primire', nume: 'Hol primire / recepție', niv: 'P', buc: 1, mp: 42, scal: 'lin', ocup: 10, ob: 1 },
        { zona: 'Primire', nume: 'Post primire / registratură', niv: 'P', buc: 1, mp: 9, scal: 'fix', ocup: 1, ob: 1 },
        { zona: 'Administrativ', nume: 'Birou asistent social', niv: 'P', buc: 1, mp: 14, scal: 'fix', ocup: 2, ob: 1 },
        { zona: 'Administrativ', nume: 'Birou psiholog / consiliere', niv: 'P', buc: 1, mp: 12.5, scal: 'fix', ocup: 2, ob: 1 },
        { zona: 'Medical', nume: 'Cabinet medical', niv: 'P', buc: 1, mp: 16, scal: 'fix', ocup: 3, ob: 1 },
        { zona: 'Medical', nume: 'Sală tratamente', niv: 'P', buc: 1, mp: 12, scal: 'fix', ocup: 2, ob: 0 },
        { zona: 'Recuperare', nume: 'Sală kinetoterapie', niv: 'P', buc: 1, mp: 60, scal: 'lin', ocup: 12, ob: 1 },
        { zona: 'Recuperare', nume: 'Vestiar + duș kineto (PMR)', niv: 'P', buc: 1, mp: 8, scal: 'fix', ocup: 2, ob: 0 },
        { zona: 'Masă', nume: 'Sală de mese / servire', niv: 'P', buc: 1, mp: 90, scal: 'lin', ocup: 50, ob: 1 },
        { zona: 'Masă', nume: 'Oficiu de distribuție', niv: 'P', buc: 1, mp: 14, scal: 'fix', ocup: 2, ob: 1 },
        { zona: 'Bloc alimentar', nume: 'Bucătărie — preparare la cald', niv: 'P', buc: 1, mp: 22, scal: 'lin', ocup: 3, ob: 1 },
        { zona: 'Bloc alimentar', nume: 'Recepție / curățare alimente', niv: 'P', buc: 1, mp: 10, scal: 'fix', ocup: 1, ob: 1 },
        { zona: 'Bloc alimentar', nume: 'Spălare vase', niv: 'P', buc: 1, mp: 9, scal: 'fix', ocup: 1, ob: 1 },
        { zona: 'Bloc alimentar', nume: 'Depozit alimente + spațiu răcit', niv: 'P', buc: 1, mp: 11, scal: 'lin', ocup: 0, ob: 1 },
        { zona: 'Sanitare', nume: 'GS beneficiari femei', niv: 'P', buc: 1, mp: 12, scal: 'pas', la: 15, ocup: 0, ob: 1 },
        { zona: 'Sanitare', nume: 'GS beneficiari bărbați', niv: 'P', buc: 1, mp: 11, scal: 'pas', la: 15, ocup: 0, ob: 1 },
        { zona: 'Sanitare', nume: 'GS adaptat PMR (parter)', niv: 'P', buc: 1, mp: 4.5, scal: 'fix', ocup: 0, ob: 1 },
        { zona: 'Tehnic', nume: 'Cameră curățenie parter', niv: 'P', buc: 1, mp: 3.5, scal: 'fix', ocup: 0, ob: 1 },
        { zona: 'Tehnic', nume: 'Spațiu tehnic — centrală termică', niv: 'P', buc: 1, mp: 12, scal: 'fix', ocup: 0, ob: 1 },
        // ETAJ
        { zona: 'Activități', nume: 'Sală activități polivalentă', niv: 'E', buc: 2, mp: 50, scal: 'pas', la: 25, ocup: 22, ob: 1 },
        { zona: 'Activități', nume: 'Atelier ergoterapie', niv: 'E', buc: 1, mp: 36, scal: 'lin', ocup: 12, ob: 1 },
        { zona: 'Activități', nume: 'Sală lectură / bibliotecă', niv: 'E', buc: 1, mp: 24, scal: 'fix', ocup: 12, ob: 0 },
        { zona: 'Activități', nume: 'Sală odihnă / relaxare', niv: 'E', buc: 1, mp: 30, scal: 'lin', ocup: 12, ob: 1 },
        { zona: 'Administrativ', nume: 'Birou coordonator centru', niv: 'E', buc: 1, mp: 15, scal: 'fix', ocup: 2, ob: 1 },
        { zona: 'Administrativ', nume: 'Birou administrativ / contabil', niv: 'E', buc: 1, mp: 14, scal: 'fix', ocup: 2, ob: 0 },
        { zona: 'Personal', nume: 'Vestiar personal femei + duș', niv: 'E', buc: 1, mp: 12, scal: 'pas', la: 20, ocup: 8, ob: 1 },
        { zona: 'Personal', nume: 'Vestiar personal bărbați + duș', niv: 'E', buc: 1, mp: 9, scal: 'pas', la: 30, ocup: 5, ob: 1 },
        { zona: 'Sanitare', nume: 'GS beneficiari etaj', niv: 'E', buc: 2, mp: 8.5, scal: 'pas', la: 15, ocup: 0, ob: 1 },
        { zona: 'Sanitare', nume: 'GS adaptat PMR (etaj)', niv: 'E', buc: 1, mp: 4.5, scal: 'fix', ocup: 0, ob: 1 },
        { zona: 'Tehnic', nume: 'Spălătorie / lenjerie', niv: 'E', buc: 1, mp: 14, scal: 'lin', ocup: 2, ob: 1 },
        { zona: 'Tehnic', nume: 'Depozit materiale / lenjerie', niv: 'E', buc: 1, mp: 13, scal: 'lin', ocup: 0, ob: 0 }
      ]
    }
  };

  // Propune programul de spații pentru o funcțiune + capacitate. Întoarce array de rânduri editabile.
  function propune(fn, params) {
    var tpl = TEMPLATES[fn]; if (!tpl) return null;
    var cap = Math.max(1, +(params && params.capacitate) || tpl.cap_default);
    var k = cap / tpl.cap_ref;
    return tpl.spatii.map(function (s) {
      var buc = s.buc, mp = s.mp;
      if (s.scal === 'lin') mp = Math.round(s.mp * k * 10) / 10;
      else if (s.scal === 'pas' && s.la) buc = Math.max(s.buc, Math.ceil(cap / s.la) * (s.buc / Math.max(1, Math.ceil(tpl.cap_ref / s.la))) || s.buc);
      buc = Math.max(1, Math.round(buc));
      return { zona: s.zona, nume: s.nume, niv: s.niv, buc: buc, mp_unit: mp, ocup: s.ocup || 0, ob: !!s.ob };
    });
  }

  // Bilanț: Su total, pe niveluri, Sc/Sd estimate (Su/Sd ≈ 0,80), verificare mp/beneficiar.
  function bilant(spatii, params) {
    var cap = Math.max(1, +(params && params.capacitate) || 0);
    var suP = 0, suE = 0, ocupMax = 0, suBenef = 0;
    var zonaBenef = { 'Primire': 1, 'Masă': 1, 'Recuperare': 1, 'Activități': 1 };
    (spatii || []).forEach(function (r) {
      var st = (+r.buc || 0) * (+r.mp_unit || 0);
      if (r.niv === 'E') suE += st; else suP += st;
      ocupMax += (+r.ocup || 0) * (+r.buc || 0);
      if (zonaBenef[r.zona]) suBenef += st;
    });
    var su = suP + suE;
    var coef = 0.80; // Su/Sd pt dotări sociale (circulații + pereți)
    var sd = su ? Math.round(su / coef) : 0;
    var niveluri = suE > 0 ? 2 : 1;
    var sc = niveluri ? Math.round(sd / niveluri) : 0;
    return {
      su: Math.round(su), suP: Math.round(suP), suE: Math.round(suE), sd: sd, sc: sc, niveluri: niveluri,
      ocupMax: ocupMax, suBenef: Math.round(suBenef),
      mp_benef: cap ? Math.round(suBenef / cap * 10) / 10 : 0,
      mp_benef_min: 4.0 // Ord. 29/2019
    };
  }

  G.UXSpace = { TEMPLATES: TEMPLATES, propune: propune, bilant: bilant, hasTemplate: function (fn) { return !!TEMPLATES[fn]; } };
  console.log('[UXSpace] program funcțional încărcat (' + Object.keys(TEMPLATES).length + ' șabloane)');
})(window);
