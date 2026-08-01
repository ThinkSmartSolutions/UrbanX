/* ============================================================================
 * UrbanX — MOTOR ACȚIUNE VÂNT REAL (js/25-vant-normative.js)
 * Presiunea de referință a vântului (qb, Anexa A Tabelul A.1, 337 localități
 * reale) — CR 1-1-4/2012 (Cod de proiectare. Evaluarea acțiunii vântului
 * asupra construcțiilor) — verificat pe text oficial (PDF cu strat de text,
 * nu scanat). Vezi data/structural/cr114-vant.json.
 *
 * Aceeași capcană găsită deja la P100-1/2013 și CR 1-1-3/2012: localitatea
 * Ștefănești apare de 2 ori (Argeș qb=0,5 / Botoșani qb=0,7) — index dublu
 * (nume + nume|județ) și dezambiguizare obligatorie pe județ.
 *
 * window.VANT_ENGINE: load() · getQb(localitate, judet) · getCategorieTeren(cod)
 * ========================================================================== */
(function (G) {
  'use strict';

  var URL_DATA = 'data/structural/cr114-vant.json';

  function stripDiac(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-/g, ' ').replace(/\s+/g, ' ').toUpperCase().trim();
  }

  var E = {
    _data: null, _qb: null, _qbJudet: null, _coliziuni: null, _readyPromise: null,

    load: function () {
      if (this._readyPromise) return this._readyPromise;
      var self = this;
      this._readyPromise = fetch(URL_DATA).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
        self._data = d;
        self._qb = {}; self._qbJudet = {}; self._coliziuni = {};
        if (d && d.anexa_A_tabelul_A1_qb_localitati) {
          d.anexa_A_tabelul_A1_qb_localitati.localitati.forEach(function (r) {
            var key = stripDiac(r.localitate);
            if (self._qb.hasOwnProperty(key)) self._coliziuni[key] = true;
            self._qb[key] = r;
            self._qbJudet[key + '|' + stripDiac(r.judet)] = r;
          });
        }
        return d;
      }).catch(function () { self._data = null; return null; });
      return this._readyPromise;
    },

    // Anexa A, Tabelul A.1 — qb (presiune de referinta), dezambiguizat pe judet daca e coliziune de nume
    getQb: function (numeLocalitate, judetFallback) {
      if (!this._data) return { qb: null, status_validare: 'motor_neincarcat' };
      var key = stripDiac(numeLocalitate).replace(/^(MUNICIPIUL|ORAȘUL|ORASUL|COMUNA)\s+/, '');
      if (this._coliziuni[key]) {
        var recJ = this._qbJudet[key + '|' + stripDiac(judetFallback || '')];
        if (recJ) return { qb_kpa: recJ.qb_kpa, localitate_matched: recJ.localitate, norma: 'CR 1-1-4/2012, Anexa A, Tabelul A.1 (' + recJ.localitate + ', ' + recJ.judet + ')', status_validare: 'verificat_text_oficial' };
        return { qb_kpa: null, eroare: 'LOCALITATE_AMBIGUA', norma: 'Localitatea „' + numeLocalitate + '" apare de mai multe ori în Tabelul A.1 (CR 1-1-4/2012), în județe diferite, cu q_b diferit — trebuie precizat județul exact al proiectului.' };
      }
      var rec = this._qb[key];
      if (rec) return { qb_kpa: rec.qb_kpa, localitate_matched: rec.localitate, norma: 'CR 1-1-4/2012, Anexa A, Tabelul A.1 (' + rec.localitate + ', ' + rec.judet + ')', status_validare: 'verificat_text_oficial' };
      return { qb_kpa: null, eroare: 'LOCALITATE_NEGASITA', norma: 'Tabelul A.1 (CR 1-1-4/2012) nu conține localitatea „' + numeLocalitate + '" (doar 337 localități urbane) — necesită verificare manuală contra hărții Fig. 2.1.' };
    },

    // Tabelul 2.1 — categorie de teren (z0, zmin)
    getCategorieTeren: function (cod) {
      var c = this._data.tabelul_2_1_categorii_teren.categorii[cod];
      if (!c) return { eroare: 'CATEGORIE_INVALIDA', categorii_disponibile: Object.keys(this._data.tabelul_2_1_categorii_teren.categorii) };
      return { z0_m: c.z0_m, zmin_m: c.zmin_m, descriere: c.descriere, norma: this._data.tabelul_2_1_categorii_teren.articol, status_validare: 'verificat_text_oficial' };
    },

    // EXTINDERE (29 iul, cerere Florin "finalizeaza performant, perfectionist, real, live orice
    // tine de proiectare"): presiunea de CALCUL qp(z), nu doar valoarea de referinta qb — formulele
    // (2.4)/(2.5)/(2.11)/(2.14)/(2.17), verificate vizual pe text oficial (fractii/exponenti).
    // cr(z) — factorul de rugozitate (Art. 2.3, formulele 2.4/2.5)
    _crZ: function (z, cod) {
      var d = this._data;
      var cat = d.tabelul_2_1_categorii_teren.categorii[cod];
      var kr = d.tabelul_2_2_factor_rugozitate_kr.kr_pe_categorie[cod];
      if (!cat || kr == null) return null;
      var zEff = Math.max(z, cat.zmin_m);
      return kr * Math.log(zEff / cat.z0_m);
    },
    // Iv(z) — intensitatea turbulentei (Art. 2.4, formula 2.11)
    _ivZ: function (z, cod) {
      var d = this._data;
      var cat = d.tabelul_2_1_categorii_teren.categorii[cod];
      var sqrtB = d.tabelul_2_3_turbulenta_sqrtb.sqrtb_pe_categorie[cod];
      if (!cat || sqrtB == null) return null;
      var zEff = Math.max(z, cat.zmin_m);
      return sqrtB / (2.5 * Math.log(zEff / cat.z0_m));
    },
    // qp(z) = cpq(z) * cr(z)^2 * qb — presiunea de calcul a vantului la inaltimea z (Art. 2.4, formula 2.17)
    calculQp: function (opt) {
      opt = opt || {};
      if (!this._data) return { eroare: 'DATE_NEINCARCATE' };
      var qbRes = this.getQb(opt.localitate, opt.judet);
      if (qbRes.qb_kpa === null) return { qp_kpa: null, eroare: qbRes.eroare, detaliu: qbRes.norma };
      var cod = opt.categorie_teren || 'II';
      var cat = this._data.tabelul_2_1_categorii_teren.categorii[cod];
      if (!cat) return { eroare: 'CATEGORIE_TEREN_INVALIDA', categorii_disponibile: Object.keys(this._data.tabelul_2_1_categorii_teren.categorii) };
      var z = +opt.z_m || 0;
      var cr = this._crZ(z, cod);
      var iv = this._ivZ(z, cod);
      var cpq = 1 + 7 * iv;
      var qp = cpq * cr * cr * qbRes.qb_kpa;
      return {
        qp_kpa: +qp.toFixed(4), z_m: z, categorie_teren: cod, cr_z: +cr.toFixed(4), Iv_z: +iv.toFixed(4), cpq_z: +cpq.toFixed(4), qb_kpa: qbRes.qb_kpa,
        formula: 'qp(z) = cpq(z) × cr(z)² × qb', norma: 'CR 1-1-4/2012, Art. 2.4, formulele (2.4)/(2.5)/(2.11)/(2.14)/(2.17)',
        surse: { qb: qbRes.norma, teren: cat.descriere },
        status_validare: 'verificat_vizual_text_oficial',
        nota: 'qp(z) e presiunea de calcul a vântului la înălțimea z deasupra terenului — NU încă presiunea finală pe o suprafață a construcției (necesită Cpe, coeficientul aerodinamic de presiune, dependent de forma reală a acoperișului/fațadei, date de proiect neincluse generic).'
      };
    }
  };

  G.VANT_ENGINE = E;
  E.load();
  console.log('[vant] motor real CR 1-1-4/2012 încărcat (window.VANT_ENGINE) — sursă: data/structural/cr114-vant.json');
})(window);
