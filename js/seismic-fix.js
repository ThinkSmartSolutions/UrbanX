// ═══════════════════════════════════════════════════════════════════════════
// seismic-fix.js — _getSeismicAg pe date REALE, per localitate (P100-1/2013)
// UrbanX TSS·FG | Audit 2026-05-12 · Rescris 2026-07-26 (audit legal, cerere Florin:
// "calcule reale, live, nu inventam nimic")
//
// SURSA REALĂ: P100-1/2013 (Cod de proiectare seismică, MDRAP/UTCB, mai 2013 —
// ediția confirmată în vigoare de js/urbanx-normative-registry.js), Anexa A.6,
// Tabel A1 — valorile ag (accelerația terenului pentru proiectare, IMR=225 ani)
// și Tc (perioada de control/colț) pentru 337 localități urbane din România.
// Extrase direct din textul oficial (PDF, 925 pagini, text-layer verificat),
// toate cele 337 rânduri parsate și validate — vezi data/structural/p100-ag-localitati.json.
//
// CORECȚIE MAJORĂ față de versiunea anterioară (aproximare pe județ, o singură
// valoare pentru tot județul): comparând cu tabelul oficial per-localitate, mai
// multe orașe mari aveau valori GREȘITE, ex.:
//   - Iași:      cod vechi ag=0,35g  →  real (Tabel A1) ag=0,25g
//   - Timișoara: cod vechi ag=0,10g  →  real (Tabel A1) ag=0,20g
// Aproximarea pe județ rămâne doar ca FALLBACK de precizie mai mică, pentru
// localitățile care nu apar în cele 337 din tabelul oficial (comune mici).
//
// hMaxStory/hMaxM rămân o ESTIMARE HEURISTICĂ PROPRIE UrbanX (NU o prevedere
// P100-1 reală — P100-1 nu leagă direct ag de un plafon de etaje; înălțimea
// admisă rezultă din calculul structural complet, cap. 4-9). Folosit doar
// pentru module narative/predictive (cinematic, rapoarte de fezabilitate),
// NU ca bază de calcul structural în DTAC/PTh/DE.
// ═══════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  var DATA_URL = 'data/structural/p100-ag-localitati.json';
  var _localitati = null;   // { NORM_NAME: {ag, Tc, judet, localitate} }
  var _loadPromise = null;

  function stripDiac(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim();
  }

  function loadData() {
    if (_loadPromise) return _loadPromise;
    _loadPromise = fetch(DATA_URL).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      _localitati = {};
      if (d && d.localitati) {
        d.localitati.forEach(function (r) {
          _localitati[stripDiac(r.localitate)] = r;
        });
      }
      return _localitati;
    }).catch(function () { _localitati = {}; return _localitati; });
    return _loadPromise;
  }
  loadData();

  // Fallback pe județ (precizie mai mică — folosit DOAR dacă localitatea nu e
  // în cele 337 din tabelul oficial). Valorile de mai jos NU au fost verificate
  // rând-cu-rând ca cele per-localitate — sunt o aproximare de rezervă.
  var SEISMIC_JUDET_FALLBACK = {
    'VN':0.40, 'BZ':0.40,
    'IS':0.25, 'GL':0.30, 'BC':0.35, 'NT':0.25, 'VS':0.30,
    'B':0.30,  'IF':0.30, 'PH':0.35, 'BR':0.30, 'IL':0.30,
    'BT':0.20, 'SV':0.20, 'CT':0.20, 'TL':0.20, 'CL':0.20,
    'GR':0.25, 'TR':0.20, 'OT':0.20, 'DJ':0.20, 'GJ':0.20,
    'AG':0.25, 'DB':0.25, 'VL':0.20, 'MH':0.15,
    'AB':0.10, 'SB':0.20, 'MS':0.15, 'HR':0.20, 'CV':0.20,
    'CS':0.15, 'HD':0.10, 'BV':0.20,
    'CJ':0.10, 'BH':0.10, 'AR':0.20, 'TM':0.20,
    'SM':0.15, 'MM':0.15, 'SJ':0.10, 'BN':0.10,
  };

  var agToStory = function (ag) {
    return ag >= 0.40 ? { hMaxStory:4,  hMaxM:13  } :
           ag >= 0.35 ? { hMaxStory:6,  hMaxM:20  } :
           ag >= 0.30 ? { hMaxStory:8,  hMaxM:26  } :
           ag >= 0.25 ? { hMaxStory:10, hMaxM:33  } :
           ag >= 0.20 ? { hMaxStory:12, hMaxM:39  } :
           ag >= 0.15 ? { hMaxStory:16, hMaxM:52  } :
                        { hMaxStory:99, hMaxM:300 };
  };

  function waitReady(cb, n) {
    n = n || 0;
    if (n > 80) return;
    if (typeof TCI === 'undefined') { setTimeout(function () { waitReady(cb, n + 1); }, 250); return; }
    cb();
  }

  waitReady(function () {
    var _origSeismic = TCI._getSeismicAg.bind(TCI);

    TCI._getSeismicAg = function (lon, lat) {
      var numeLocalitate = (TCI.d && TCI.d.name) || (TCI.cityData && TCI.cityData.name);
      var judet = (TCI.d && TCI.d.judet) || (TCI.cityData && TCI.cityData.judet);

      // 1. Cel mai precis: match direct pe cele 337 localități din Tabelul A1 (P100-1/2013)
      if (_localitati && numeLocalitate) {
        var key = stripDiac(numeLocalitate).replace(/^(MUNICIPIUL|ORAȘUL|ORASUL|COMUNA)\s+/, '');
        var rec = _localitati[key];
        if (rec) {
          return {
            ag: rec.ag, Tc: rec.Tc, ...agToStory(rec.ag),
            source: 'P100-1/2013, Tabel A1 (' + rec.localitate + ', ' + rec.judet + ')',
            ag_status: 'verificat_text_oficial', hMaxStory_status: 'estimare_euristica_NU_normativa'
          };
        }
      }

      // 2. Fallback pe județ (precizie mai mică, pt. localități absente din Tabelul A1)
      if (judet && SEISMIC_JUDET_FALLBACK[judet] !== undefined) {
        var ag = SEISMIC_JUDET_FALLBACK[judet];
        return {
          ag: ag, ...agToStory(ag),
          source: 'fallback pe județ (localitate absentă din cele 337 ale Tabelului A1)',
          ag_status: 'aproximare_fallback_precizie_redusa', hMaxStory_status: 'estimare_euristica_NU_normativa'
        };
      }

      // 3. Fallback geometric original (pentru zone OSM frontier fără judet/nume)
      var orig = _origSeismic(lon, lat);
      return Object.assign({}, orig, { source: 'bbox_fallback (fără date de localitate/județ)' });
    };

    console.log('[seismic-fix] ✅ _getSeismicAg pe date reale P100-1/2013 (337 localități) activ');

    // Verificare live pe date REALE (nu presupuse) — rulează după ce s-a încărcat tabelul
    loadData().then(function () {
      var testCities = [
        { name: 'Iași', expected: 0.25 },
        { name: 'Cluj-Napoca', expected: 0.10 },
        { name: 'Botoșani', expected: 0.20 },
        { name: 'Timișoara', expected: 0.20 },
        { name: 'Bucuresti', expected: 0.30 }
      ];
      testCities.forEach(function (c) {
        var origD = TCI.d;
        TCI.d = { name: c.name };
        var result = TCI._getSeismicAg(0, 0);
        TCI.d = origD;
        var ok = result.ag === c.expected;
        console.log('[seismic-fix]', ok ? '✅' : '❌', c.name, '→ ag=' + result.ag + 'g', ok ? '' : ('(așteptat ' + c.expected + 'g)'));
      });
    });
  });
})();
