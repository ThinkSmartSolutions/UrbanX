/* ============================================================================
 * UrbanX — MOTOR PUTERE ELECTRICĂ REAL (js/25-electric-normative.js)
 * Puterea absorbită (Pa), calculată LIVE din datele reale ale proiectului —
 * conform Normativ I7/2011 (Ordinul MDRT 2.741/2011), Art. 3.2.2.1/3.2.2.2,
 * Tabelele 3.3/3.4/3.5. Verificat VIZUAL (imagine, nu text OCR) pe textul
 * oficial (Monitorul Oficial 802 bis/14.XI.2011) — vezi
 * data/electrice/i7-2011-putere.json.
 *
 * window.ELECTRIC_ENGINE: load() · getPutereLocuinta(tip,varianta) ·
 * getFactorSimultaneitate(nrUnitati) · calculPutereAnsambluLocuinte(opt) ·
 * getPutereNerezidential(destinatie)
 * ========================================================================== */
(function (G) {
  'use strict';

  var URL_DATA = 'data/electrice/i7-2011-putere.json';

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

    // Tabelul 3.3 — Pi/ku pentru o unitate locativă, dupa tip si varianta de dotare electrica
    getPutereLocuinta: function (tipUnitate, varianta) {
      if (!this._data) return { eroare: 'DATE_NEINCARCATE' };
      varianta = varianta || 'fara_electric';
      var v = this._data.tabelul_3_3_putere_locuinte.variante.filter(function (x) { return x.id === varianta; })[0];
      if (!v) return { eroare: 'VARIANTA_INVALIDA', variante_disponibile: this._data.tabelul_3_3_putere_locuinte.variante.map(function (x) { return x.id; }) };
      var rand = v.randuri.filter(function (r) { return r.tip === tipUnitate; })[0];
      if (!rand) return { eroare: 'TIP_NEGASIT', tipuri_disponibile: v.randuri.map(function (r) { return r.tip; }) };
      return {
        Pi_kW: rand.Pi_kW, ku: rand.ku, varianta_descriere: v.descriere,
        norma: this._data.tabelul_3_3_putere_locuinte.articol, status_validare: 'verificat_vizual_text_oficial'
      };
    },

    // Tabelul 3.4 — ks dupa numarul de unitati locative din ansamblu
    getFactorSimultaneitate: function (nrUnitati) {
      if (!this._data) return { eroare: 'DATE_NEINCARCATE' };
      var t = this._data.tabelul_3_4_factor_simultaneitate_ks;
      var n = Math.max(1, +nrUnitati || 1);
      var rand = t.randuri.filter(function (r) { return r.n === n; })[0];
      if (!rand) {
        // peste 20 unitati - tabelul oficial se opreste la 20; folosim conservator ultima valoare cunoscuta
        rand = t.randuri[t.randuri.length - 1];
        return { ks: rand.ks, norma: t.articol, status_validare: 'aproximare_conservatoare', nota: 'Tabelul 3.4 (I7/2011) se oprește la 20 de unități — pentru ' + n + ' unități se folosește conservator ultima valoare cunoscută (ks=' + rand.ks + ' la n=20); necesită verificare/extrapolare de către proiectant.' };
      }
      return { ks: rand.ks, norma: t.articol, status_validare: 'verificat_vizual_text_oficial' };
    },

    // Calcul complet Pa pentru un ansamblu de locuințe (Art. 3.2.2.1: Pa = Pi·ku·ks, agregat pe tipuri)
    // unitati: [{tip_unitate, nr, varianta}], nrTotalUnitati folosit pt ks
    calculPutereAnsambluLocuinte: function (opt) {
      opt = opt || {};
      if (!this._data) return { eroare: 'DATE_NEINCARCATE' };
      var self = this;
      var unitati = opt.unitati || [];
      var nrTotal = unitati.reduce(function (s, u) { return s + (+u.nr || 0); }, 0);
      var ksInfo = this.getFactorSimultaneitate(nrTotal);
      var detalii = unitati.map(function (u) {
        var p = self.getPutereLocuinta(u.tip_unitate, u.varianta || opt.varianta || 'fara_electric');
        if (p.eroare) return { tip_unitate: u.tip_unitate, nr: u.nr, eroare: p.eroare, sursa_clasificare: u.sursa_clasificare };
        var PiTotal = p.Pi_kW * u.nr;
        var PaUnitate = p.Pi_kW * p.ku; // putere absorbita per unitate (fara ks, care se aplica la nivel de ansamblu)
        return { tip_unitate: u.tip_unitate, nr: u.nr, Pi_kW_unitate: p.Pi_kW, ku: p.ku, Pi_kW_total: PiTotal, Pa_kW_unitate: PaUnitate, sursa_clasificare: u.sursa_clasificare };
      });
      var PiAnsamblu = detalii.reduce(function (s, d) { return s + (d.Pi_kW_total || 0); }, 0);
      var PaFaraKs = detalii.reduce(function (s, d) { return s + ((d.Pa_kW_unitate || 0) * (d.nr || 0)); }, 0);
      var PaAnsamblu = ksInfo.ks != null ? PaFaraKs * ksInfo.ks : null;
      return {
        detalii: detalii, nrTotalUnitati: nrTotal,
        Pi_kW_ansamblu_neponderat: PiAnsamblu, // suma puterilor instalate, fara niciun factor
        Pa_kW_fara_ks: PaFaraKs, // suma (Pi x ku) pe unitate
        ks: ksInfo.ks, Pa_kW_ansamblu: PaAnsamblu, // Pa final, cu factorul de simultaneitate pe ansamblu
        formula: 'Pa_ansamblu = Σ(Pi_unitate × ku_unitate × nr_unitate) × ks_ansamblu',
        norma: this._data.art_3_2_2_1_formula_locuinte.articol + ' + ' + this._data.tabelul_3_3_putere_locuinte.articol + ' + ' + this._data.tabelul_3_4_factor_simultaneitate_ks.articol,
        surse_ks: ksInfo, status_validare: 'verificat_vizual_text_oficial'
      };
    },

    // Tabelul 3.5 — putere specifică pentru clădiri comerciale/social-culturale/administrative
    getPutereNerezidential: function (destinatie) {
      if (!this._data) return { eroare: 'DATE_NEINCARCATE' };
      var t = this._data.tabelul_3_5_putere_nerezidential;
      var rand = t.randuri.filter(function (r) { return r.destinatie === destinatie; })[0];
      if (!rand) return { eroare: 'DESTINATIE_NEGASITA', destinatii_disponibile: t.randuri.map(function (r) { return r.destinatie; }) };
      return { rand: rand, norma: t.articol, formula: this._data.art_3_2_2_2_formula_nerezidential.formula, status_validare: 'verificat_vizual_text_oficial' };
    }
  };

  G.ELECTRIC_ENGINE = E;
  E.load();
  console.log('[electric] motor real I7/2011 încărcat (window.ELECTRIC_ENGINE) — sursă: data/electrice/i7-2011-putere.json');
})(window);
