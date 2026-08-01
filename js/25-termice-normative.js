/* ============================================================================
 * UrbanX — MOTOR NECESAR DE CĂLDURĂ REAL (js/25-termice-normative.js)
 * Necesarul de căldură de calcul pentru clădiri de locuit — Art. 4.1, formulele
 * (1)-(3), SR 1907-1:2014 — verificat VIZUAL (imagine, nu text OCR — fișierul
 * sursă e scanat, fără strat de text). PDF furnizat direct de Florin (era
 * indisponibil liber — standard ASRO, de regulă plătit). Vezi
 * data/termice/sr1907-1-necesar-caldura.json.
 *
 * window.TERMICE_ENGINE: load() · getThetaExt(localitate) · getCM(pereteUsor) ·
 * calculQi(opt)
 * ========================================================================== */
(function (G) {
  'use strict';

  var URL_DATA = 'data/termice/sr1907-1-necesar-caldura.json';

  function stripDiac(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/[ăâ]/g, 'a').replace(/[î]/g, 'i').replace(/[ș]/g, 's').replace(/[ț]/g, 't')
      .replace(/\s+/g, ' ').trim();
  }

  var E = {
    _data: null, _idx: null, _readyPromise: null,

    load: function () {
      if (this._readyPromise) return this._readyPromise;
      var self = this;
      this._readyPromise = fetch(URL_DATA).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
        self._data = d;
        if (d) {
          var idx = {};
          var loc = d.anexa_A_tabelul_A1_temperaturi_exterioare.localitati;
          Object.keys(loc).forEach(function (nume) { idx[stripDiac(nume)] = { nume: nume, thetaeo: loc[nume] }; });
          self._idx = idx;
        }
        return d;
      }).catch(function () { self._data = null; return null; });
      return this._readyPromise;
    },

    // Anexa A, Tabelul A.1 — temperatura exterioara conventionala de calcul (98%)
    getThetaExt: function (localitate) {
      if (!this._data) return { thetaeo: null, status_validare: 'motor_neincarcat' };
      var hit = this._idx[stripDiac(localitate)];
      if (hit) {
        return {
          thetaeo: hit.thetaeo, localitate_matched: hit.nume,
          norma: 'SR 1907-1:2014, Anexa A, Tabelul A.1 (grad de asigurare 98%)',
          status_validare: 'exact'
        };
      }
      return {
        thetaeo: null, localitate_matched: null,
        norma: 'SR 1907-1:2014, Anexa A, Tabelul A.1',
        status_validare: 'lipsa_in_tabel',
        nota: 'Localitatea "' + localitate + '" nu e în cele 64 din Tabelul A.1 aici încărcate. Alegeți manual cea mai apropiată localitate cu condiții climatice similare din Anexa A / harta zonelor climatice (Fig. A.1).'
      };
    },

    // Art. 4.1.1.2 — coeficient de masa termica
    getCM: function (pereteUsor) {
      var meta = this._data.art_4_1_1_2_cM;
      return {
        cM: pereteUsor ? meta.cM_pereti_usori : meta.cM_alte_constructii,
        norma: 'SR 1907-1:2014, Art. 4.1.1.2',
        conditie: pereteUsor ? meta.conditie_cM_1 : 'alte tipuri de structură (pereți masivi, groși)'
      };
    },

    // Art. 4.1.2, formula (3) — flux termic pt incalzirea aerului de ventilare
    calculQi: function (opt) {
      var t = this.getThetaExt(opt.localitate);
      if (t.thetaeo === null) return { Qi: null, eroare: 'thetaeo necunoscut pentru localitatea dată', detaliu: t };
      if (opt.na == null) {
        return {
          Qi: null,
          eroare: 'na (numărul de schimburi de aer necesar, h^-1) trebuie specificat de proiectant',
          norma: 'SR 1907-1:2014, Art. 4.1.2.1 — na se stabilește în funcție de sistemul de ventilare prevăzut pentru încăpere (natural/mecanic), nu există o valoare unică implicită în standard pentru toate cazurile',
          thetaeo: t
        };
      }
      var cM = opt.cM != null ? opt.cM : 1.0;
      var Qi = 0.334 * opt.na * cM * opt.Vi * (opt.thetaa - t.thetaeo);
      return {
        Qi: Math.round(Qi), unitate: 'W',
        formula: 'Qi = 0,334 × na × cM × Vi × (θa − θeo)',
        norma: 'SR 1907-1:2014, Art. 4.1.2, formula (3)',
        intrari: { na: opt.na, cM: cM, Vi: opt.Vi, thetaa: opt.thetaa, thetaeo: t.thetaeo, localitate: t.localitate_matched },
        status_validare: t.status_validare
      };
    }
  };

  G.TERMICE_ENGINE = E;
  E.load();
  console.log('[termice] motor real SR 1907-1:2014 încărcat (window.TERMICE_ENGINE) — sursă: data/termice/sr1907-1-necesar-caldura.json');
})(window);
