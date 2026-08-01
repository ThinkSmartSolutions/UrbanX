/* ============================================================================
 * UrbanX — MOTOR DEBITE APĂ REAL (js/25-sanitare-normative.js)
 * Debitul de calcul (Vc) pentru conducte de distribuție a apei la clădiri de
 * locuit — Art. 9.8, relația (5), Normativ I9/2015 (Ordinul MDRAP 818/2015,
 * Monitorul Oficial 830 bis/6.XI.2015) — verificat VIZUAL (imagine, nu text
 * OCR — fișierul sursă are stratul de text corupt). Vezi
 * data/sanitare/i9-2015-debite.json.
 *
 * window.SANITARE_ENGINE: load() · getNecesarSpecific(opt) · calculVc(opt)
 * ========================================================================== */
(function (G) {
  'use strict';

  var URL_DATA = 'data/sanitare/i9-2015-debite.json';

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

    // Anexa 1 — necesar specific de apa (l/zi.pers) pt cladiri de locuit
    getNecesarSpecific: function (opt) {
      opt = opt || {};
      if (!this._data) return { eroare: 'DATE_NEINCARCATE' };
      var t = this._data.anexa_1_necesar_specific_locuinte;
      var rand = t.randuri.filter(function (r) { return r.id === (opt.id || 'central_cu_cada_dus_spalator'); })[0];
      if (!rand) return { eroare: 'CAZ_NEGASIT', cazuri_disponibile: t.randuri.map(function (r) { return r.id; }) };
      var caz = opt.caz || 'caz2';
      return {
        necesar_total_l_zi_pers: rand.necesar_total_apa_rece[caz], necesar_apa_rece_l_zi_pers: rand.necesar_apa_rece[caz], necesar_apa_calda_l_zi_pers: rand.necesar_apa_calda_60C[caz],
        descriere: rand.descriere, norma: t.articol, status_validare: 'verificat_vizual_text_oficial'
      };
    },

    // Suma echivalentilor de debit (E) pt un set de obiecte sanitare (Anexa 2), inmultit cu nr. de unitati identice
    _sumaEchivalenti: function (obiecte, nrUnitati) {
      var self = this;
      var t = this._data.anexa_2_echivalenti_debit;
      var perUnitate = 0, detalii = [];
      obiecte.forEach(function (o) {
        var rand = t.randuri.filter(function (r) { return r.obiect === o; })[0];
        if (rand) { perUnitate += rand.e; detalii.push({ obiect: o, e: rand.e }); }
        else detalii.push({ obiect: o, eroare: 'NECATALOGAT' });
      });
      return { E_per_unitate: perUnitate, E_total: perUnitate * (nrUnitati || 1), detalii: detalii, norma: t.articol };
    },

    // Debitul de calcul Vc = a * (0,15*sqrt(E) + 0,004*E) — Art. 9.8, relatia (5)
    calculVc: function (opt) {
      opt = opt || {};
      if (!this._data) return { eroare: 'DATE_NEINCARCATE' };
      var f = this._data.art_9_8_formula_debit_calcul_locuinte;
      var nrUnitati = +opt.nrUnitati || 1;
      var echiv, sursaSet;
      // EXTINDERE (27 iul, cerere Florin "continua profesionist"): daca se cunoaste nr. REAL de bai
      // (din programul de spatii al proiectului, D._spatii), descompunem in obiecte per-baie (se
      // repeta de nrBaiTotal ori) + obiecte per-unitate (o singura data per unitate, indiferent de
      // nr. de bai) — mai precis decat ipoteza generica "1 baie/unitate" cand proiectul are 2+ bai.
      if (opt.nrBaiTotal != null) {
        var setSplit = this._data.set_per_baie_si_per_unitate;
        var nrBaiTotal = +opt.nrBaiTotal || 0;
        var echivBaie = this._sumaEchivalenti(setSplit.per_baie, nrBaiTotal);
        var echivUnit = this._sumaEchivalenti(setSplit.per_unitate, nrUnitati);
        echiv = {
          E_per_unitate: +((echivBaie.E_total + echivUnit.E_total) / nrUnitati).toFixed(3),
          E_total: echivBaie.E_total + echivUnit.E_total,
          detalii: echivBaie.detalii.map(function (d) { return { obiect: d.obiect + ' × ' + nrBaiTotal + ' băi', e: d.e }; }).concat(echivUnit.detalii.map(function (d) { return { obiect: d.obiect + ' × ' + nrUnitati + ' unități', e: d.e }; })),
          norma: setSplit.nota, nr_bai_total: nrBaiTotal
        };
        sursaSet = 'real (' + nrBaiTotal + ' băi însumate din programul de spații al proiectului, ' + nrUnitati + ' unități)';
      } else {
        var obiecte = opt.obiecte || this._data.set_standard_locuinta_o_baie.obiecte;
        echiv = this._sumaEchivalenti(obiecte, nrUnitati);
        sursaSet = 'ipoteză (1 baie completă/unitate — programul de spații real nu specifică numărul de băi)';
      }
      var E_val = echiv.E_total;
      function vc(a) { return a * (0.15 * Math.sqrt(E_val) + 0.004 * E_val); }
      var VcRece = vc(f.a_apa_rece), VcCalda = vc(f.a_apa_calda);
      return {
        nrUnitati: nrUnitati, E_per_unitate: echiv.E_per_unitate, E_total: E_val, detalii_echivalenti: echiv.detalii,
        Vc_apa_rece_l_s: VcRece, Vc_apa_calda_l_s: VcCalda, sursa_set: sursaSet,
        formula: f.formula + ' (a=' + f.a_apa_rece + ' apă rece, a=' + f.a_apa_calda + ' apă caldă)',
        norma: f.articol + ' + ' + echiv.norma, status_validare: 'verificat_vizual_text_oficial',
        conditie_aplicare: f.conditie
      };
    }
  };

  G.SANITARE_ENGINE = E;
  E.load();
  console.log('[sanitare] motor real I9/2015 încărcat (window.SANITARE_ENGINE) — sursă: data/sanitare/i9-2015-debite.json');
})(window);
