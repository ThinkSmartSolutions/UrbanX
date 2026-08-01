/* ============================================================================
 * UrbanX — MOTOR SEISMIC REAL (js/25-seismic-normative.js)
 * Forța seismică de bază echivalentă (metoda statică echivalentă, Art. 4.5.3.2
 * din P100-1/2013), calculată LIVE din datele reale ale proiectului — nu un
 * exemplu static. Toate formulele/valorile de mai jos au fost verificate
 * VIZUAL (imagine, nu text OCR) direct pe P100-1/2013 (925 pagini, ediția
 * confirmată de js/urbanx-normative-registry.js) — vezi
 * data/structural/p100-formule-seismice.json și p100-ag-localitati.json.
 *
 * SCOP: proiectare PRELIMINARĂ (fază DTAC) — perioada proprie T1 se estimează
 * cu formulele simplificate din Anexa B (nu calcul dinamic real). Pentru
 * PTh/DE, inginerul structurist trebuie să refacă T1/Fb cu un model de calcul
 * real (Anexa C sau software structural) — acest motor NU înlocuiește acel
 * calcul, îl fundamentează cu date reale de intrare (ag/Tc/γI,e/q reale).
 *
 * window.SEISMIC_ENGINE: load() · getAgTc(localitate) · getGammaImportanta(clasa)
 * · getFactorQ(opt) · calculSd(T, ag, Tc, q) · estimeazaT1(opt) · calculFb(opt)
 * ========================================================================== */
(function (G) {
  'use strict';

  var URL_LOCALITATI = 'data/structural/p100-ag-localitati.json';
  var URL_FORMULE = 'data/structural/p100-formule-seismice.json';

  function stripDiac(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-/g, ' ').replace(/\s+/g, ' ').toUpperCase().trim();
  }

  var E = {
    _localitati: null, _formule: null, _readyPromise: null,

    load: function () {
      if (this._readyPromise) return this._readyPromise;
      var self = this;
      this._readyPromise = Promise.all([
        fetch(URL_LOCALITATI).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
        fetch(URL_FORMULE).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
      ]).then(function (res) {
        self._localitati = {};
        self._localitatiJudet = {};
        self._coliziuni = {};
        if (res[0] && res[0].localitati) {
          // FIX (26 iul, gasit prin verificare live in browser real - nu doar simulare): mai multe
          // nume de localitate apar de 2 ori in Tabelul A1 cu ag DIFERIT dupa judet (ex. Stefanesti,
          // Arges: ag=0.30 vs Stefanesti, Botosani: ag=0.20) - un index doar pe nume suprascrie
          // silentios prima intrare cu a doua, dand valoarea GRESITA pt un proiect real din primul
          // judet. Indexam si compus (nume+judet) si marcam coliziunile ca sa ceara judet explicit.
          res[0].localitati.forEach(function (r) {
            var key = stripDiac(r.localitate);
            if (self._localitati.hasOwnProperty(key)) self._coliziuni[key] = true;
            self._localitati[key] = r;
            self._localitatiJudet[key + '|' + stripDiac(r.judet)] = r;
          });
        }
        self._formule = res[1] || null;
        return true;
      });
      return this._readyPromise;
    },

    // Cel mai precis: match direct pe cele 337 localități din Tabelul A1 (P100-1/2013, Anexa A.6)
    getAgTc: function (numeLocalitate, judetFallback) {
      var key = stripDiac(numeLocalitate).replace(/^(MUNICIPIUL|ORAȘUL|ORASUL|COMUNA)\s+/, '');
      if (this._coliziuni && this._coliziuni[key]) {
        var keyJ = key + '|' + stripDiac(judetFallback || '');
        var recJ = this._localitatiJudet && this._localitatiJudet[keyJ];
        if (recJ) {
          return {
            ag: recJ.ag, Tc: recJ.Tc, norma: 'P100-1/2013, Tabel A1 (' + recJ.localitate + ', ' + recJ.judet + ')',
            status_validare: 'verificat_text_oficial'
          };
        }
        return { ag: null, Tc: null, eroare: 'LOCALITATE_AMBIGUA', norma: 'Localitatea „' + numeLocalitate + '" apare de mai multe ori în Tabelul A1, în județe diferite, cu a_g diferit — trebuie precizat județul exact al proiectului pentru a evita o valoare greșită (nu se poate alege automat).' };
      }
      var rec = this._localitati && this._localitati[key];
      if (rec) {
        return {
          ag: rec.ag, Tc: rec.Tc, norma: 'P100-1/2013, Tabel A1 (' + rec.localitate + ', ' + rec.judet + ')',
          status_validare: 'verificat_text_oficial'
        };
      }
      return { ag: null, Tc: null, eroare: 'LOCALITATE_NEGASITA', norma: 'Tabel A1 nu conține localitatea „' + numeLocalitate + '" (doar 337 localități urbane) — necesită verificare manuală contra hărții Fig. 3.1/3.2.' };
    },

    getGammaImportanta: function (clasa) {
      var f = this._formule; if (!f) return null;
      var c = f.art_4_4_5_factori_importanta.clase[clasa];
      if (!c) return { eroare: 'CLASA_INVALIDA', clase_disponibile: Object.keys(f.art_4_4_5_factori_importanta.clase) };
      return { gamma_Ie: c.gamma_Ie, descriere: c.descriere, norma: f.art_4_4_5_factori_importanta.articol, status_validare: 'verificat_vizual_text_oficial' };
    },

    // q — Tabelul 5.1 (beton armat), sisteme cadru sau pereți, cu aproximările uzuale au/a1
    getFactorQ: function (opt) {
      opt = opt || {};
      var f = this._formule; if (!f) return null;
      var material = opt.material || 'beton_armat'; // beton_armat (implicit, retrocompatibil) | otel | zidarie
      var ductilitate = opt.ductilitate || 'DCM'; // DCH | DCM | DCL

      // FIX (27 iul, cerere Florin "finalizeaza metodic tot" — inchide gap-ul explicit semnalat in
      // _seismicFbSec: "doar beton armat"): adaugat OTEL (Tabelul 6.3) si ZIDARIE (Tabelul 8.10),
      // ambele verificate vizual/text pe P100-1/2013. Beton armat (implicit) ramane exact ca inainte.
      if (material === 'otel') {
        var to = f.tabelul_6_1_6_3_factor_q_otel;
        if (ductilitate === 'DCL') return { q: 1.5, sistem: 'oțel (DCL)', ductilitate: 'DCL', norma: to.articol, status_validare: 'verificat_vizual_text_oficial', nota: to.DCL_general };
        var sistemOtel = opt.sistem_otel || 'cadre_neconstravantuite_etajate';
        var so = to.sisteme[sistemOtel];
        if (!so) return { eroare: 'SISTEM_OTEL_INVALID', sisteme_disponibile: Object.keys(to.sisteme) };
        var auA1o = opt.au_a1 != null ? opt.au_a1 : (so.au_a1_uzual != null ? so.au_a1_uzual : 1.0);
        var qValRaw = so[ductilitate];
        var qOtel = typeof qValRaw === 'string' ? auA1o * parseFloat(qValRaw) : qValRaw;
        return { q: qOtel, sistem: 'oțel — ' + so.descriere, ductilitate: ductilitate, au_a1: auA1o, norma: to.articol, status_validare: 'verificat_vizual_text_oficial', nota: opt.neregulat_elevatie ? 'Clădire neregulată în elevație — q se reduce cu 20% față de valoarea din Tabelul 6.3 (' + to.nota_neregularitate + ')' : null };
      }

      // FIX (28 iul, cerere Florin "continua pana finalizezi" — ultimul material din P100-1/2013):
      // COMPOZIT (otel-beton), Tabelul 7.2, verificat pe text oficial. kw = coeficient de forma
      // pereti (identic cu beton armat, Art. 5.2.2.2) - implicit 1.0 (pereti zvelti), ca la RC.
      if (material === 'compozit') {
        var tcz = f.tabelul_7_2_factor_q_compozit;
        var sistemCompozit = opt.sistem_compozit || 'cadre_neconstravantuite_o_deschidere_multinivel';
        var sc2 = tcz.sisteme[sistemCompozit];
        if (!sc2) return { eroare: 'SISTEM_COMPOZIT_INVALID', sisteme_disponibile: Object.keys(tcz.sisteme) };
        var auA1c = opt.au_a1 != null ? opt.au_a1 : (sc2.au_a1_uzual != null ? sc2.au_a1_uzual : 1.0);
        var kwC = opt.kw || 1.0;
        var qValRawC = sc2[ductilitate];
        var qCompozit;
        if (typeof qValRawC === 'string') {
          qCompozit = qValRawC.indexOf('kw') >= 0 ? kwC * auA1c * parseFloat(qValRawC) : auA1c * parseFloat(qValRawC);
        } else {
          qCompozit = qValRawC;
        }
        if (opt.neregulat_elevatie) qCompozit = qCompozit * 0.8;
        return { q: qCompozit, sistem: 'compozit oțel-beton — ' + sc2.descriere, ductilitate: ductilitate, au_a1: auA1c, norma: tcz.articol, status_validare: 'verificat_text_oficial', nota: opt.neregulat_elevatie ? 'Clădire neregulată în elevație — q redus cu 20% (' + tcz.nota_neregularitate + ')' : (sc2.kw_nota || null) };
      }

      // FIX (27 iul, cerere Florin "implementeaza tot" — inchide ultimul gap semnalat, lemnul):
      // Tabelul 9.2, verificat pe text oficial (extractie curata, fara nevoie de citire vizuala).
      if (material === 'lemn') {
        var tl = f.tabelul_9_2_factor_q_lemn;
        var sistemLemn = opt.sistem_lemn || 'cadre_dornuri_buloane_DCM';
        var sl = tl.sisteme[sistemLemn];
        if (!sl) return { eroare: 'SISTEM_LEMN_INVALID', sisteme_disponibile: Object.keys(tl.sisteme) };
        var qLemn = sl.q;
        if (opt.neregulat_elevatie) qLemn = Math.max(1.5, qLemn * 0.8);
        return { q: qLemn, sistem: 'lemn (' + sl.clasa + ') — ' + sl.descriere, ductilitate: sl.clasa, norma: tl.articol, status_validare: 'verificat_text_oficial', nota: opt.neregulat_elevatie ? 'Clădire neregulată pe înălțime — q redus cu 20% (min. 1,5), ' + tl.nota_neregularitate : tl.nota_element_critic };
      }

      if (material === 'zidarie') {
        var tz = f.tabelul_8_10_factor_q_zidarie;
        var tipZid = opt.tip_zidarie || 'ZC'; // ZNA | ZC | ZC_AR | ZIA
        var regulat = opt.regulat_plan !== false && opt.regulat_elevatie !== false;
        var grup = regulat ? tz.coeficienti_q_pe_regularitate.regulat_plan_si_elevatie : tz.coeficienti_q_pe_regularitate.neregulat_plan_sau_elevatie;
        var formulaZid = grup[tipZid];
        if (!formulaZid) return { eroare: 'TIP_ZIDARIE_INVALID', tipuri_disponibile: Object.keys(tz.tipuri_zidarie) };
        var auA1z = opt.au_a1 != null ? opt.au_a1 : tz.au_a1_implicit[tipZid];
        var qZid = auA1z * parseFloat(formulaZid);
        if (opt.niveluri === 1) qZid = qZid * 0.85; // reducere 15% pt structuri cu un singur nivel
        return {
          q: qZid, sistem: 'zidărie ' + tipZid + ' (' + tz.tipuri_zidarie[tipZid] + ')', ductilitate: ductilitate, au_a1: auA1z,
          norma: tz.articol, status_validare: 'verificat_text_oficial',
          nota: (regulat ? 'regulat în plan și elevație' : 'neregulat în plan sau elevație') + (opt.niveluri === 1 ? '; redus 15% (structură cu un singur nivel, ' + tz.reducere_1_nivel + ')' : '')
        };
      }

      // implicit: BETON ARMAT (Tabelul 5.1) — comportament neschimbat fata de inainte
      var t = f.tabelul_5_1_factor_q_beton_armat;
      var sistem = opt.sistem || 'cadre'; // cadre | pereti
      var auA1;
      if (sistem === 'pereti') {
        auA1 = opt.au_a1 || (opt.nr_pereti_pe_directie <= 2 ? t.au_a1_aproximari_uzuale.pereti_2pe_directie :
          (opt.pereti_cuplati ? t.au_a1_aproximari_uzuale.pereti_cuplati_sau_duala_pereti_preponderenti : t.au_a1_aproximari_uzuale.pereti_mai_multi));
        var kw = opt.kw || 1.0; // implicit pereți zvelți (rH/L>=2); pereți masivi necesită kw calculat de proiectant
        var qMap = { DCH: 4 * kw * auA1, DCM: 3 * kw * auA1, DCL: 2.0 };
        return { q: qMap[ductilitate], sistem: 'pereți (necuplați)', ductilitate: ductilitate, au_a1: auA1, kw: kw, norma: t.articol, status_validare: 'verificat_vizual_text_oficial', nota: kw === 1.0 ? 'kw=1,0 presupus (pereți zvelți) — de confirmat de proiectant dacă pereții sunt masivi (raport hw/lw<2).' : null };
      }
      auA1 = opt.au_a1 || (opt.niveluri <= 1 ? t.au_a1_aproximari_uzuale.cadre_1nivel :
        (opt.o_singura_deschidere ? t.au_a1_aproximari_uzuale.cadre_multinivel_o_deschidere : t.au_a1_aproximari_uzuale.cadre_multinivel_mai_multe_deschideri));
      var qMapC = { DCH: 5 * auA1, DCM: 3.5 * auA1, DCL: 2.0 };
      return { q: qMapC[ductilitate], sistem: 'cadre (sau structură duală)', ductilitate: ductilitate, au_a1: auA1, norma: t.articol, status_validare: 'verificat_vizual_text_oficial' };
    },

    // Sd(T) — Art. 3.2, formulele (3.17)/(3.18), verificate vizual
    calculSd: function (T, ag, Tc, q) {
      var f = this._formule; if (!f) return null;
      var beta0 = f.art_3_2_spectru_proiectare.beta0; // 2,5
      var TB = 0.2 * Tc;
      var Sd;
      if (T <= TB) {
        Sd = ag * (1 + (beta0 / q - 1) / TB * T);
      } else {
        var beta;
        var TD = f.art_3_2_spectru_proiectare.TD_dupa_TC[String(Tc)] || 3.0;
        if (T <= Tc) beta = beta0;
        else if (T <= TD) beta = beta0 * Tc / T;
        else beta = beta0 * Tc * TD / (T * T);
        Sd = Math.max(ag * beta / q, 0.2 * ag);
      }
      return { Sd: Sd, TB: TB, unitate: 'g (multiplu al accelerației gravitaționale — Sd(T) din P100-1 e în m/s²; aici ag e deja în unități de g, deci Sd rezultă tot în g)', norma: f.art_3_2_spectru_proiectare.articol, status_validare: 'verificat_vizual_text_oficial' };
    },

    // T1 — Anexa B, formule simplificate PROIECTARE PRELIMINARĂ (cladiri <=40m)
    estimeazaT1: function (opt) {
      opt = opt || {};
      var f = this._formule; if (!f) return null;
      var H = +opt.H || 0, n = +opt.niveluri || 0, material = opt.material || 'beton_armat';
      // FIX (27 iul): formula simplificata (B.8) se aplica la cadre beton armat SAU otel (nu doar RC,
      // cum verifica anterior codul — vezi nota textului oficial "structura in cadre beton armat/otel").
      var esteCadruSimplu = material === 'beton_armat' || (material === 'otel' && /^cadre_neconstravantuite/.test(opt.sistem_otel || ''));
      if (esteCadruSimplu && n > 0 && n <= 12) {
        return { T1: 0.1 * n, formula: 'T1 = 0,1 × n (n=' + n + ')', norma: f.anexa_B_perioada_fundamentala.articol + ', formula (B.8)', status_validare: 'verificat_vizual_text_oficial', conditie: '<=12 etaje, structură în cadre beton armat/oțel, h_nivel≈3m' };
      }
      var ctKey = material === 'otel' ? 'cadre_spatiale_otel' : (opt.sistem || 'alte_tipuri_structuri');
      var Ct = f.anexa_B_perioada_fundamentala.Ct[ctKey] || f.anexa_B_perioada_fundamentala.Ct.alte_tipuri_structuri;
      var T1 = Ct * Math.pow(H, 0.75);
      return { T1: T1, formula: 'T1 = Ct × H^0,75 = ' + Ct + ' × ' + H + '^0,75', Ct: Ct, norma: f.anexa_B_perioada_fundamentala.articol + ', formula (B.4)', status_validare: 'verificat_vizual_text_oficial', conditie: 'H≤40m (proiectare preliminară)' };
    },

    // Fb pt structuri cu pereti din ZIDARIE — Art. 8.4.2.1, relatia (8.7): formula DIFERITA fata de
    // Sd(T1) generic (RC/otel) — masonry foloseste un coeficient seismic global direct cs, cu factor
    // de reducere pt amortizare zidarie (eta=0.88, xi=8%), nu spectrul standard Sd(T). Aplicabil doar
    // cladirilor <=P+4E (T1<0.7s garantat de cod, deci beta(T1)=beta0 constant).
    calculFbZidarie: function (opt) {
      opt = opt || {};
      var f = this._formule; if (!f) return { eroare: 'DATE_NEINCARCATE' };
      var agTc = this.getAgTc(opt.localitate, opt.judet);
      if (agTc.eroare) return { eroare: agTc.eroare, detaliu: agTc.norma };
      var gamma = this.getGammaImportanta(opt.clasa_importanta || 'III');
      var q = this.getFactorQ({ material: 'zidarie', tip_zidarie: opt.tip_zidarie, regulat_plan: opt.regulat_plan, regulat_elevatie: opt.regulat_elevatie, niveluri: opt.niveluri, au_a1: opt.au_a1 });
      if (q.eroare) return { eroare: q.eroare };
      var beta0 = f.art_3_2_spectru_proiectare.beta0; // 2.5
      var eta = 0.88; // factor de reducere pt amortizarea zidariei (xi=8%) — Art. 8.4.2, relatia (8.7)
      var niveluri = +opt.niveluri || 1;
      var lambda = niveluri <= 2 ? 1.0 : 0.85; // lambda=1.0 pt P/P+1E, 0.85 pt >=P+2E — text relatia (8.7)
      var m = +opt.masa_totala_t || 0;
      var cs = agTc.ag * gamma.gamma_Ie * beta0 * eta * lambda / q.q;
      var Fb = cs * m;
      return {
        Fb_tf: Fb, ag: agTc.ag, Tc: agTc.Tc, q: q.q, gamma_Ie: gamma.gamma_Ie, beta0: beta0, eta: eta, lambda: lambda, cs: cs, masa_t: m,
        surse: { ag_Tc: agTc.norma, gamma: gamma.norma, q: q.norma },
        formula: 'cs = ag × γI,e × β0 × η × λ / q ; Fb = cs × m (G=m×g)', norma_formula: 'Art. 8.4.2.1, relația (8.7), P100-1/2013',
        status_validare: 'verificat_text_oficial',
        nota: 'Valabil pentru clădiri curente din zidărie cu înălțime ≤P+4E (T1<0,7s garantat de cod — β(T1)=β0 constant, nu necesită calculul separat al lui T1).'
      };
    },

    // Fb = Sd(T1) × γI,e × m × λ — Art. 4.5.3.2.2, formula (4.3)
    calculFb: function (opt) {
      opt = opt || {};
      var f = this._formule; if (!f) return { eroare: 'DATE_NEINCARCATE' };
      var agTc = this.getAgTc(opt.localitate, opt.judet);
      if (agTc.eroare) return { eroare: agTc.eroare, detaliu: agTc.norma };
      var gamma = this.getGammaImportanta(opt.clasa_importanta || 'III');
      var q = this.getFactorQ(opt);
      var T1r = this.estimeazaT1(opt);
      var m = +opt.masa_totala_t || 0; // masa totală a clădirii (tone), din greutatea seismică reală G/g
      var Sdr = this.calculSd(T1r.T1, agTc.ag, agTc.Tc, q.q);
      var niveluri = +opt.niveluri || 0;
      var lambda = (T1r.T1 <= agTc.Tc && niveluri > 2) ? 0.85 : 1.0;
      var Fb = Sdr.Sd * gamma.gamma_Ie * m * lambda; // rezultă în tone-forță echivalent (m în tone, Sd în g → F=m·g·Sd/g simplificat: Fb[tf]=m[t]×Sd[g])
      return {
        Fb_tf: Fb, ag: agTc.ag, Tc: agTc.Tc, T1: T1r.T1, Sd: Sdr.Sd, gamma_Ie: gamma.gamma_Ie, q: q.q, lambda: lambda, masa_t: m,
        surse: { ag_Tc: agTc.norma, gamma: gamma.norma, q: q.norma, T1: T1r.norma, Sd: Sdr.norma },
        formula: 'Fb = Sd(T1)·γI,e·m·λ', norma_formula: 'Art. 4.5.3.2.2, formula (4.3), P100-1/2013',
        nota: 'Estimare preliminară (fază DTAC) — T1 din formulă simplificată (Anexa B), nu din calcul dinamic real. λ=' + lambda + ' (' + (lambda === 0.85 ? 'T1≤TC și >2 niveluri' : 'condiția λ=0,85 nu e îndeplinită') + ').'
      };
    }
  };

  G.SEISMIC_ENGINE = E;
  E.load();
  console.log('[seismic] motor real P100-1/2013 încărcat (window.SEISMIC_ENGINE) — surse: data/structural/*.json');
})(window);
