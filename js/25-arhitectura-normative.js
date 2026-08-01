/* ============================================================================
 * UrbanX — MOTOR CONFORMITATE IGIENĂ REAL (js/25-arhitectura-normative.js)
 * Verifică LIVE, din programul de spații real al proiectului (D._spatii),
 * conformitatea cu Ordinul MS 119/2014 (Norme de igienă și sănătate publică),
 * Art. 17/18 — praguri reale (12mp/cameră, 5mp/bucătărie, 2,55m înălțime,
 * 1,20m culoar), verificate direct pe textul oficial (Monitorul Oficial
 * nr. 127/21.02.2014, formă consolidată). Vezi
 * data/arhitectura/ordin119-2014-igiena.json.
 *
 * window.ARHITECTURA_ENGINE: load() · verificaSpatii(spatii, opt)
 * ========================================================================== */
(function (G) {
  'use strict';

  var URL_DATA = 'data/arhitectura/ordin119-2014-igiena.json';

  var E = {
    _data: null, _readyPromise: null,

    load: function () {
      if (this._readyPromise) return this._readyPromise;
      var self = this;
      this._readyPromise = fetch(URL_DATA).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
        self._data = d; return d;
      }).catch(function () { self._data = null; return null; });
      return this._readyPromise;
    },

    // Verifica un tablou de spatii reale (D._spatii: [{nume, cat/zona, mp_unit, buc, niv, ocup}]) contra
    // Art. 17/18. Clasifica dupa "cat"/"zona"/"nume": camera de locuit (living/dormitor/cameră) vs
    // bucatarie vs culoar.
    // EXTINDERE (27 iul, cerere Florin "implementeaza tot"): adaugate 2 praguri suplimentare automate
    // (inaltime libera + volum aer/persoana), pe langa suprafata camera/bucatarie si latime culoar deja
    // acoperite. Ambele folosesc "ocup" (camp real, din programul de spatii - vezi urbanx-space-ui.js)
    // si inaltimea aproximata din D.H/niveluri (regim de inaltime declarat) - NU o masuratoare reala pe
    // releveu per incapere (care nu exista ca data de proiect) - etichetat explicit ca aproximare.
    verificaSpatii: function (spatii, opt) {
      opt = opt || {};
      if (!this._data) return { eroare: 'DATE_NEINCARCATE' };
      var a17 = this._data.art_17_parametri_sanitari_locuinte;
      var a18 = this._data.art_18_circulatii;
      var rezultate = [];
      // Inaltime libera aproximata: H total / niveluri, minus alocatie uzuala plansee+finisaje (~0.35m) —
      // aproximare, NU masuratoare reala; se confirma de proiectant pe releveu.
      var inaltimeLiberaAprox = null;
      if (opt.H_total != null && opt.niveluri) {
        var hEtajBrut = (+opt.H_total) / (+opt.niveluri);
        inaltimeLiberaAprox = +(hEtajBrut - 0.35).toFixed(2);
      }
      (spatii || []).forEach(function (sp) {
        var nume = String(sp.nume || '').toLowerCase();
        var cat = String(sp.cat || sp.zona || '').toLowerCase();
        var mp = +sp.mp_unit || 0;
        var esteCameraLocuit = /dormitor|living|cameră de zi|camera de zi|camera/.test(nume) || /locuit|zi|dormitor/.test(cat);
        var esteBucatarie = /bucătărie|bucatarie/.test(nume) || /bucatarie/.test(cat);
        var esteCuloar = /hol|coridor|culoar/.test(nume) || /circulatie|circulație/.test(cat);
        if (esteBucatarie) {
          var okB = mp >= a17.suprafata_minima_bucatarie_mp;
          rezultate.push({ spatiu: sp.nume, tip: 'bucătărie', prag_mp: a17.suprafata_minima_bucatarie_mp, valoare_mp: mp, conform: okB, norma: a17.articol });
        } else if (esteCameraLocuit) {
          var okC = mp >= a17.suprafata_minima_camera_mp;
          rezultate.push({ spatiu: sp.nume, tip: 'cameră de locuit', prag_mp: a17.suprafata_minima_camera_mp, valoare_mp: mp, conform: okC, norma: a17.articol });
        } else if (esteCuloar && opt.latime_culoar_m != null) {
          var okL = +opt.latime_culoar_m >= a18.latime_minima_culoar_m;
          rezultate.push({ spatiu: sp.nume, tip: 'culoar/circulație', prag_m: a18.latime_minima_culoar_m, valoare_m: opt.latime_culoar_m, conform: okL, norma: a18.articol });
        }
        if ((esteCameraLocuit || esteBucatarie) && inaltimeLiberaAprox != null) {
          var okH = inaltimeLiberaAprox >= a17.inaltime_sub_plafon_m;
          rezultate.push({ spatiu: sp.nume, tip: 'înălțime liberă (' + (esteCameraLocuit ? 'cameră de locuit' : 'bucătărie') + ', APROXIMATĂ)', prag_m: a17.inaltime_sub_plafon_m, valoare_m: inaltimeLiberaAprox, conform: okH, norma: a17.articol, aproximat: true });
        }
        if (esteCameraLocuit && inaltimeLiberaAprox != null && (+sp.ocup || 0) > 0) {
          var volumTotal = mp * inaltimeLiberaAprox;
          var volumPerPersoana = +(volumTotal / (+sp.ocup)).toFixed(1);
          var okV = volumPerPersoana >= a17.volum_minim_aer_persoana_mc;
          rezultate.push({ spatiu: sp.nume, tip: 'volum aer/persoană (APROXIMAT)', prag_mc: a17.volum_minim_aer_persoana_mc, valoare_mc: volumPerPersoana, conform: okV, norma: a17.articol, aproximat: true, detaliu: mp + 'mp × ' + inaltimeLiberaAprox + 'm ÷ ' + sp.ocup + ' pers.' });
        }
      });
      var neconforme = rezultate.filter(function (r) { return r.conform === false; });
      return {
        rezultate: rezultate, nrNeconforme: neconforme.length, neconforme: neconforme,
        inaltime_libera_aproximata_m: inaltimeLiberaAprox,
        praguri_folosite: a17, status_validare: 'verificat_text_oficial'
      };
    }
  };

  G.ARHITECTURA_ENGINE = E;
  E.load();
  console.log('[arhitectura] motor real Ordin 119/2014 încărcat (window.ARHITECTURA_ENGINE) — sursă: data/arhitectura/ordin119-2014-igiena.json');
})(window);
