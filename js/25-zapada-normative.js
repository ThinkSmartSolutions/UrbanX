/* ============================================================================
 * UrbanX — MOTOR ÎNCĂRCARE ZĂPADĂ REAL (js/25-zapada-normative.js)
 * Încărcarea caracteristică din zăpadă pe sol (sk, Anexa A Tabelul A.1, 337
 * localități reale) și pe acoperiș (s = Is×μi×Ce×Ct×sk, Art. 4.1) — CR 1-1-3/2012
 * (Cod de proiectare. Evaluarea acțiunii zăpezii asupra construcțiilor) —
 * verificat pe text oficial (PDF cu strat de text, nu scanat). Vezi
 * data/structural/cr113-zapada.json.
 *
 * Aceeași capcană găsită deja la P100-1/2013 (seismic): localitatea Ștefănești
 * apare de 2 ori (Argeș sk=2,0 / Botoșani sk=2,5) — index dublu (nume + nume|județ)
 * și dezambiguizare obligatorie pe județ, ca la SEISMIC_ENGINE.
 *
 * window.ZAPADA_ENGINE: load() · getSk(localitate, judet) · getIs(clasa) ·
 * getCe(tipExpunere) · calculMu1(unghiGrade) · calculS(opt)
 * ========================================================================== */
(function (G) {
  'use strict';

  var URL_DATA = 'data/structural/cr113-zapada.json';

  function stripDiac(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-/g, ' ').replace(/\s+/g, ' ').toUpperCase().trim();
  }

  var E = {
    _data: null, _sk: null, _skJudet: null, _coliziuni: null, _readyPromise: null,

    load: function () {
      if (this._readyPromise) return this._readyPromise;
      var self = this;
      this._readyPromise = fetch(URL_DATA).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
        self._data = d;
        self._sk = {}; self._skJudet = {}; self._coliziuni = {};
        if (d && d.anexa_A_tabelul_A1_sk_localitati) {
          d.anexa_A_tabelul_A1_sk_localitati.localitati.forEach(function (r) {
            var key = stripDiac(r.localitate);
            if (self._sk.hasOwnProperty(key)) self._coliziuni[key] = true;
            self._sk[key] = r;
            self._skJudet[key + '|' + stripDiac(r.judet)] = r;
          });
        }
        return d;
      }).catch(function () { self._data = null; return null; });
      return this._readyPromise;
    },

    // Anexa A, Tabelul A.1 — sk caracteristic pe sol, dezambiguizat pe judet daca e coliziune de nume
    getSk: function (numeLocalitate, judetFallback) {
      if (!this._data) return { sk: null, status_validare: 'motor_neincarcat' };
      var key = stripDiac(numeLocalitate).replace(/^(MUNICIPIUL|ORAȘUL|ORASUL|COMUNA)\s+/, '');
      if (this._coliziuni[key]) {
        var recJ = this._skJudet[key + '|' + stripDiac(judetFallback || '')];
        if (recJ) return { sk: recJ.sk, localitate_matched: recJ.localitate, norma: 'CR 1-1-3/2012, Anexa A, Tabelul A.1 (' + recJ.localitate + ', ' + recJ.judet + ')', status_validare: 'verificat_text_oficial' };
        return { sk: null, eroare: 'LOCALITATE_AMBIGUA', norma: 'Localitatea „' + numeLocalitate + '" apare de mai multe ori în Tabelul A.1 (CR 1-1-3/2012), în județe diferite, cu s_k diferit — trebuie precizat județul exact al proiectului.' };
      }
      var rec = this._sk[key];
      if (rec) return { sk: rec.sk, localitate_matched: rec.localitate, norma: 'CR 1-1-3/2012, Anexa A, Tabelul A.1 (' + rec.localitate + ', ' + rec.judet + ')', status_validare: 'verificat_text_oficial' };
      return { sk: null, eroare: 'LOCALITATE_NEGASITA', norma: 'Tabelul A.1 (CR 1-1-3/2012) nu conține localitatea „' + numeLocalitate + '" (doar 337 localități urbane) — necesită verificare manuală contra hărții Fig. 3.1.' };
    },

    // Tabelul 4.2 — factor de importanta-expunere Is (zapada)
    getIs: function (clasa) {
      var c = this._data.tabelul_4_2_factor_importanta_zapada.clase[clasa];
      if (c == null) return { eroare: 'CLASA_INVALIDA', clase_disponibile: Object.keys(this._data.tabelul_4_2_factor_importanta_zapada.clase) };
      return { Is: c, norma: this._data.tabelul_4_2_factor_importanta_zapada.articol, status_validare: 'verificat_text_oficial' };
    },

    // Tabelul 4.3 — coeficient de expunere Ce
    getCe: function (tipExpunere) {
      var v = this._data.tabelul_4_3_coeficient_expunere_Ce.valori[tipExpunere || 'normala'];
      if (v == null) v = this._data.tabelul_4_3_coeficient_expunere_Ce.valori.normala;
      return { Ce: v, norma: this._data.tabelul_4_3_coeficient_expunere_Ce.articol, status_validare: 'verificat_text_oficial' };
    },

    // Tabelul 5.1 — coeficient de forma mu1 (acoperisuri o panta/doua pante, fara obstacole/parapete)
    calculMu1: function (unghiGrade) {
      var a = +unghiGrade || 0;
      var mu1;
      if (a <= 30) mu1 = 0.8;
      else if (a < 60) mu1 = 0.8 * (60 - a) / 30;
      else mu1 = 0.0;
      return { mu1: mu1, norma: this._data.tabelul_5_1_coeficient_forma_mu1.articol, conditie: 'acoperiș cu o pantă/două pante, fără parazăpezi/parapete/obstacole (Tabelul 5.1)' };
    },

    // Formula (4.1): s = Is x mu_i x Ce x Ct x sk — situatie de proiectare normala (persistenta/tranzitorie)
    calculS: function (opt) {
      opt = opt || {};
      var skRes = this.getSk(opt.localitate, opt.judet);
      if (skRes.sk === null) return { s: null, eroare: skRes.eroare, detaliu: skRes.norma };
      var isRes = this.getIs(opt.clasa_importanta || 'III');
      if (isRes.eroare) return { s: null, eroare: isRes.eroare };
      var ceRes = this.getCe(opt.tip_expunere || 'normala');
      var muRes = opt.unghi_acoperis_grade != null ? this.calculMu1(opt.unghi_acoperis_grade) : null;
      var mu = muRes ? muRes.mu1 : (opt.mu_i != null ? opt.mu_i : null);
      if (mu === null) {
        return {
          s: null, eroare: 'MU_I_NECESAR',
          norma: 'Coeficientul de formă μi (Tabelul 5.1, CR 1-1-3/2012) necesită unghiul real al acoperișului (grade) sau valoarea μi stabilită de proiectant pentru configurații speciale (Capitolele 6-7) — nu are o valoare implicită unică.',
          sk: skRes, Is: isRes, Ce: ceRes
        };
      }
      var Ct = 1.0;
      var s = isRes.Is * mu * ceRes.Ce * Ct * skRes.sk;
      return {
        s: +s.toFixed(3), unitate: 'kN/m²',
        formula: 's = Is × μi × Ce × Ct × sk', norma: 'CR 1-1-3/2012, Art. 4.1, alin. (8), relația (4.1)',
        intrari: { Is: isRes.Is, mu_i: mu, Ce: ceRes.Ce, Ct: Ct, sk: skRes.sk, localitate: skRes.localitate_matched },
        surse: { sk: skRes.norma, Is: isRes.norma, Ce: ceRes.norma, mu_i: muRes ? muRes.norma : 'valoare μi introdusă de proiectant' },
        status_validare: skRes.status_validare
      };
    }
  };

  G.ZAPADA_ENGINE = E;
  E.load();
  console.log('[zapada] motor real CR 1-1-3/2012 încărcat (window.ZAPADA_ENGINE) — sursă: data/structural/cr113-zapada.json');
})(window);
