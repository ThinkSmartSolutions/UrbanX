/* ============================================================================
 * UrbanX — SSI: ACCESOR NORMATIV (js/25-ssi-normative.js)
 * Citeste data/ssi/normative.json (schema v3.0: sursa+status, NU valori
 * hardcodate fara provenienta) si expune functii de interogare pentru
 * motorul de cascada M0-M17 (js/25-ssi-engine.js si modulele M13/M14/M15).
 *
 * Regula de aur (v3.0, regula #7 v2.1): nicio valoare normativa nu se
 * returneaza fara sursa_url + status; daca status != 'validat_sursa', se
 * marcheaza explicit ca PENDING — motorul NU presupune conformitate.
 *
 * window.SSI_NORMATIVE_ENGINE: load() · getMetaNormativ() · getDistantaMinima()
 * · getAriiMaxime() · getNiveluriMaxime() · getStabilitateElement()
 * · getRezistentaPereti() · verificaStatusNormativeFolosite()
 * ========================================================================== */
(function (G) {
  'use strict';
  var URL_JSON = 'data/ssi/normative.json';
  var VER = '20260710a';

  var E = {
    _data: null,
    _readyPromise: null,

    load: function () {
      if (this._readyPromise) return this._readyPromise;
      var self = this;
      this._readyPromise = fetch(URL_JSON + '?v=' + VER)
        .then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (d) { self._data = d || {}; return self._data; })
        .catch(function () { self._data = {}; return self._data; });
      return this._readyPromise;
    },

    // Acces sincron dupa load() — daca nu e incarcat inca, returneaza null (apelantul trebuie sa astepte load()).
    getMetaNormativ: function (id) {
      if (!this._data) return null;
      return this._data[id] || null;
    },

    // Normalizeaza un grad I/II/III/IV/V in bucket-ul folosit de matricele T4/T145 ('I-II'|'III'|'IV-V')
    _bucketGrad: function (grad) {
      if (grad === 'I' || grad === 'II' || grad === 'I-II') return 'I-II';
      if (grad === 'III') return 'III';
      if (grad === 'IV' || grad === 'V' || grad === 'IV-V') return 'IV-V';
      return null;
    },

    // Distanta minima intre constructie proprie si o vecinatate — foloseste T4 (nou) sau T145 (existent).
    // Matricea oficiala e 3x3 (doar grad_propriu x grad_vecin); risc mare/f.mare si sprinklere sunt NOTE aplicate separat,
    // NU o a 4-a dimensiune a matricei (corectie fata de schema initiala v2.1 — vezi _meta.distante_minime_intre_cladiri).
    getDistantaMinima: function (opt) {
      opt = opt || {};
      var tabId = (opt.tip_lucrare === 'EXISTENTA_NEMODIFICATA' || opt.tip_lucrare === 'SCHIMBARE_DESTINATIE' || opt.tip_lucrare === 'CONSOLIDARE_REABILITARE')
        ? 'P118_1_2025_T145' : 'P118_1_2025_T4';
      var entry = this.getMetaNormativ(tabId);
      if (!entry) return { valoare_m: null, eroare: 'SURSA_INDISPONIBILA', norma: tabId, actiune: 'normative.json neincarcat sau intrarea lipseste — reincearca dupa load().' };
      var gp = this._bucketGrad(opt.grad_propriu), gv = this._bucketGrad(opt.grad_vecin);
      if (!gp || !gv) return { valoare_m: null, eroare: 'GRAD_INVALID', norma: tabId, actiune: 'grad_propriu/grad_vecin trebuie sa fie I-V.' };
      var rand = (entry.valoare.matrice || []).filter(function (r) { return r.grad_propriu === gp && r.grad_vecin === gv; })[0];
      if (!rand) return { valoare_m: null, eroare: 'COMBINATIE_NEGASITA', norma: tabId };
      var valoare = rand.distanta_m;
      var note_aplicate = [];
      // Nota (a): risc mare/foarte mare la vecin -> +50%, minimum 15m (T4/T145 identice pe acest punct)
      if (opt.risc_vecin === 'mare' || opt.risc_vecin === 'foarte_mare') {
        valoare = Math.max(Math.round(valoare * 1.5), 15);
        note_aplicate.push('risc mare/foarte mare la vecin: +50%, min. 15 m (nota a)');
      }
      // Nota (b)/(c): sprinklere pe cel putin una din cladiri -> reducere pana la 25% (doar la T4, nou)
      if (opt.sprinklerizat && tabId === 'P118_1_2025_T4') {
        valoare = Math.round(valoare * 0.75);
        note_aplicate.push('sprinklerizare pe cel putin o cladire: reducere pana la 25% (nota b)');
      }
      return {
        valoare_m: valoare,
        norma: entry.titlu + ' (' + tabId.replace('P118_1_2025_', '') + ')',
        sursa_url: entry.sursa_url, pagina: entry.pagina,
        data_extractie: entry.data_extractie, status_validare: entry.status,
        note_aplicate: note_aplicate,
        perete_CF_reduce_distanta: !!opt.perete_CF_pe_fatada_comuna
          ? 'Perete antifoc pe fatada comuna — reducere posibila cu expertiza tehnica de specialitate (nota b, T4/T145), NU automat, necesita expertiza + hotarare scrisa a conducerii investitorului.'
          : null
      };
    },

    // Normalizeaza gradul pt tabelele de arii/niveluri (T41/T147): I si II sunt UN SINGUR rand "I-II" in tabelul oficial,
    // dar III/IV/V raman randuri separate (diferit de bucket-ul distantelor, unde IV+V se combina) — NU refolosi _bucketGrad.
    _bucketGradArii: function (grad) {
      if (grad === 'I' || grad === 'II' || grad === 'I-II') return 'I-II';
      return grad; // III | IV | V raman neschimbate
    },

    // Arii maxime compartiment — T41 (nou) sau T147 (existent). niveluri: 'un_nivel' | 'mai_multe'
    getAriiMaxime: function (opt) {
      opt = opt || {};
      var tabId = (opt.tip_lucrare === 'EXISTENTA_NEMODIFICATA' || opt.tip_lucrare === 'SCHIMBARE_DESTINATIE' || opt.tip_lucrare === 'CONSOLIDARE_REABILITARE') ? 'P118_1_2025_T147' : 'P118_1_2025_T41';
      var entry = this.getMetaNormativ(tabId);
      if (!entry) return { arie_max_mp: null, eroare: 'SURSA_INDISPONIBILA', norma: tabId };
      var gradBucket = this._bucketGradArii(opt.grad);
      var rand = (entry.valoare.arii_maxime_mp || []).filter(function (r) { return r.grad === gradBucket; })[0];
      if (!rand) return { arie_max_mp: null, eroare: 'GRAD_NEGASIT', norma: tabId };
      var arie = (opt.niveluri === 'un_nivel') ? rand.un_nivel : rand.mai_multe_niveluri;
      return {
        arie_max_mp: arie, norma: entry.titlu + ' (' + tabId.replace('P118_1_2025_', '') + ')',
        sursa_url: entry.sursa_url, pagina: entry.pagina, status_validare: entry.status,
        note: entry.valoare.note || []
      };
    },

    // Numar maxim de niveluri — T42 (nou) sau T148 (existent). Doar pentru grad III/IV/V (I/II = nelimitat, vezi note).
    getNiveluriMaxime: function (opt) {
      opt = opt || {};
      if (opt.grad === 'I' || opt.grad === 'II') {
        return {
          niveluri_max: null, nelimitat: true,
          norma: opt.tip_lucrare === 'EXISTENTA_NEMODIFICATA' ? 'A.10.3.2.5 lit. a) P118-1/2025' : 'Art. 3.1.2.7 lit. a)/b) P118-1/2025',
          nota: 'Grad I: niveluri nelimitate indiferent de destinatie/capacitate. Grad II: nu trebuie sa determine incadrarea in cladiri inalte/foarte inalte (verificare separata H).'
        };
      }
      var tabId = (opt.tip_lucrare === 'EXISTENTA_NEMODIFICATA' || opt.tip_lucrare === 'SCHIMBARE_DESTINATIE' || opt.tip_lucrare === 'CONSOLIDARE_REABILITARE') ? 'P118_1_2025_T148' : 'P118_1_2025_T42';
      var entry = this.getMetaNormativ(tabId);
      if (!entry) return { niveluri_max: null, eroare: 'SURSA_INDISPONIBILA', norma: tabId };
      var col = 'niv_' + opt.grad; // niv_III | niv_IV | niv_V
      var rand = (entry.valoare.randuri || []).filter(function (r) { return r.destinatie === opt.destinatie; })[0];
      if (!rand) {
        return {
          niveluri_max: null, eroare: 'DESTINATIE_NEGASITA', norma: tabId,
          actiune: 'Destinatia „' + opt.destinatie + '" nu e in randurile extrase din ' + tabId + ' — foloseste randul „Cladiri cu alta destinatie (fara sali aglomerate)" ca varianta conservatoare, sau completeaza extractia.',
          destinatii_disponibile: (entry.valoare.randuri || []).map(function (r) { return r.destinatie; })
        };
      }
      return {
        niveluri_max: rand[col], capacitate_max_persoane: rand.capacitate_max,
        norma: entry.titlu + ' (' + tabId.replace('P118_1_2025_', '') + ')',
        sursa_url: entry.sursa_url, pagina: entry.pagina, status_validare: entry.status, note: entry.valoare.note || null
      };
    },

    // Conditii minime element structural — T2 (nou, partial) sau T144 (existent, partial). Doar randurile deja extrase.
    getStabilitateElement: function (opt) {
      opt = opt || {};
      var tabId = (opt.tip_lucrare === 'EXISTENTA_NEMODIFICATA' || opt.tip_lucrare === 'SCHIMBARE_DESTINATIE' || opt.tip_lucrare === 'CONSOLIDARE_REABILITARE') ? 'P118_1_2025_T144' : 'P118_1_2025_T2';
      var entry = this.getMetaNormativ(tabId);
      if (!entry) return { eroare: 'SURSA_INDISPONIBILA', norma: tabId };
      var randuri = entry.valoare.randuri_extrase || [];
      var rand = randuri.filter(function (r) { return r.element === opt.element; })[0];
      return {
        rand: rand || null, disponibil: !!rand,
        norma: entry.titlu + ' (' + tabId.replace('P118_1_2025_', '') + ')',
        sursa_url: entry.sursa_url, pagina: entry.pagina, status_validare: entry.status,
        acoperire: 'PARTIALA — doar elementele structurale principale (stalpi/grinzi/plansee' + (tabId === 'P118_1_2025_T144' ? '/pereti portanti/pereti despartitori/pereti exteriori/sarpante' : '') + ') sunt extrase; verifica manual restul elementelor pana la extractie completa.'
      };
    },

    // Rezistenta minima pereti dupa densitatea sarcinii termice q — T5 (nou) sau T146 (existent)
    getRezistentaPereti: function (opt) {
      opt = opt || {};
      var tabId = (opt.tip_lucrare === 'EXISTENTA_NEMODIFICATA' || opt.tip_lucrare === 'SCHIMBARE_DESTINATIE' || opt.tip_lucrare === 'CONSOLIDARE_REABILITARE') ? 'P118_1_2025_T146' : 'P118_1_2025_T5';
      var entry = this.getMetaNormativ(tabId);
      if (!entry) return { eroare: 'SURSA_INDISPONIBILA', norma: tabId };
      var q = +opt.q_MJ_mp || 0;
      var praguri = entry.valoare.praguri_q_MJ_mp || [];
      var rand = praguri.filter(function (p) {
        var min = p.q_min == null ? -Infinity : p.q_min, max = p.q_max == null ? Infinity : p.q_max;
        return q >= min && q <= max;
      })[0];
      return {
        prag: rand || null, q_MJ_mp: q,
        norma: entry.titlu + ' (' + tabId.replace('P118_1_2025_', '') + ')',
        sursa_url: entry.sursa_url, pagina: entry.pagina, status_validare: entry.status
      };
    },

    // Capacitatea unui flux de evacuare (C, persoane) — Tabelul 150, EXCLUSIV pt constructii EXISTENTE
    // (Anexa A.10). Pentru CONSTRUCTIE_NOUA normativul nu foloseste capacitate in persoane/flux, ci
    // latimea utila/modulul de trecere (Cap. 2.5) — se raporteaza explicit, nu se aplica gresit T150.
    getCapacitateFluxEvacuare: function (opt) {
      opt = opt || {};
      if (opt.tip_lucrare !== 'EXISTENTA_NEMODIFICATA') {
        return { aplicabil: false, motiv: 'Tabelul 150 e specific construcțiilor EXISTENTE (Anexa A.10, Art. A.10.2.5.58) — pentru CONSTRUCȚIE NOUĂ, verificarea fluxurilor de evacuare folosește lățimea utilă/modulul de trecere al căilor (Cap. 2.5, Art. 2.5.5 și urm.), nu o capacitate exprimată în persoane/flux.' };
      }
      var entry = this.getMetaNormativ('P118_1_2025_T150');
      if (!entry) return { aplicabil: true, eroare: 'SURSA_INDISPONIBILA', norma: 'P118_1_2025_T150' };
      // Potrivire pe cuvinte-cheie, nu pe egalitate exacta — destinatieT42 (ex. "Cladiri de locuit") nu
      // coincide literal cu descrierea lunga din randul T150 ("Cladiri de locuit, administrative,
      // hoteluri, camine, cabane etc. (...)"), dar identifica fara ambiguitate categoria corecta.
      var dest = String(opt.destinatie || '').toLowerCase();
      var randuri = entry.valoare.randuri || [];
      var rand = null;
      if (/nu se pot evacua|persoane ce nu se pot evacua/.test(dest)) rand = randuri[0];
      else if (/locuit|cazare/.test(dest)) rand = randuri[2];
      else rand = randuri[1];
      return {
        aplicabil: true, rand: rand || null, disponibil: !!rand,
        norma: entry.titlu + ' (T150)', sursa_url: entry.sursa_url, pagina: entry.pagina, status_validare: entry.status,
        destinatii_disponibile: (entry.valoare.randuri || []).map(function (r) { return r.destinatie; })
      };
    },

    // Verifica daca vreun normativ dintr-o lista de id-uri folosite in proiectul curent nu are status 'validat_sursa'/'validat'
    verificaStatusNormativeFolosite: function (listaIndicative) {
      var self = this;
      return (listaIndicative || []).map(function (id) {
        var m = self.getMetaNormativ(id);
        return { id: id, status: m ? m.status : 'lipsa', sursa_url: m ? m.sursa_url : null };
      }).filter(function (x) { return x.status !== 'validat_sursa' && x.status !== 'validat'; });
    }
  };

  G.SSI_NORMATIVE_ENGINE = E;
  E.load();
  console.log('[SSI] motor normativ incarcat (window.SSI_NORMATIVE_ENGINE) — sursa: data/ssi/normative.json');
})(window);
