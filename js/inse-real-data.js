// ═══════════════════════════════════════════════════════════════════════════
// inse-real-data.js — Date INS REALE (TEMPO 2021) ca strat de referință
// 15 iunie 2026 | ThinkSmart Solutions SRL
//
// Adaugă, fără a suprascrie pop2021 (rezidentă/estimare), câmpuri verificabile:
//   • pop_domiciliu_2021       — INS TEMPO POP107D (populația după domiciliu, localitate)
//   • pop_rezidenta_judet_2021 — INS TEMPO POP105A (populația rezidentă, județ)
// Sursă: extras offline din statistici.insse.ro (TEMPO) — vezi data/ins-*.json
// NOTĂ: „după domiciliu" supraestimează rezidenții; pentru densitate folosiți rezidenta.
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  var DOMIC = 'data/ins-populatie-2021.json';
  var REZJUD = 'data/ins-rezidenta-judet-2021.json';

  function norm(s) {
    s = (s || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    s = s.replace(/\b(MUNICIPIUL|MUNICIPIU|ORASUL|ORAS|COMUNA|SATUL|SAT)\b/g, '');
    return s.replace(/[^A-Z0-9]/g, '');
  }

  var domicByName = {};   // normName -> {pop, siruta, mun}
  var rezByJud = {};      // normJud  -> pop
  var ready = false;

  Promise.all([
    fetch(DOMIC + '?v=20260615').then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
    fetch(REZJUD + '?v=20260615').then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
  ]).then(function (res) {
    var dom = res[0], rez = res[1];
    if (dom && dom.nume && dom.populatie) {
      Object.keys(dom.nume).forEach(function (siruta) {
        var raw = dom.nume[siruta];
        var key = norm(raw);
        var isMun = /MUNICIPIUL/i.test(raw);
        // pe coliziune de nume, preferăm municipiul (evită confuzia cu un sat omonim)
        if (!domicByName[key] || (isMun && !domicByName[key].mun)) {
          domicByName[key] = { pop: dom.populatie[siruta], siruta: siruta, mun: isMun };
        }
      });
    }
    if (rez && rez.rezidenta_judet) {
      Object.keys(rez.rezidenta_judet).forEach(function (j) { rezByJud[norm(j)] = rez.rezidenta_judet[j]; });
    }
    ready = true;
    patchAll();
    console.log('[INSE real] domiciliu localități:', Object.keys(domicByName).length,
                '| rezidentă județe:', Object.keys(rezByJud).length);
  });

  function patchEntry(e) {
    if (!e || !e.name) return 0;
    var n = 0;
    var d = domicByName[norm(e.name)];
    if (d && e.pop_domiciliu_2021 == null) { e.pop_domiciliu_2021 = d.pop; e.pop_domiciliu_siruta = d.siruta; n++; }
    var rj = rezByJud[norm(e.judet || e.judet_code || '')];
    if (rj && e.pop_rezidenta_judet_2021 == null) { e.pop_rezidenta_judet_2021 = rj; n++; }
    if (n) e.pop_sursa_reala = 'INS TEMPO 2021 — POP107D (domiciliu) + POP105A (rezidentă județ)';
    return n;
  }

  function patchAll() {
    if (!ready) return;
    var total = 0;
    [window._RO_CITIES_DB,
     window.TCI && window.TCI._EXTRA_UATS,
     window._EXTRA_UATS,
     window._UAT_DB].forEach(function (db) {
      if (db) Object.keys(db).forEach(function (k) { total += patchEntry(db[k]); });
    });
    return total;
  }

  // DB-urile se populează asincron — reaplicăm până prind toate
  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    if (ready) patchAll();
    if (tries > 25) clearInterval(iv);
  }, 1000);

  // API public pentru studii / masterplan / PDF
  window._INSEReal = {
    domiciliu: function (name) { var d = domicByName[norm(name)]; return d ? d.pop : null; },
    rezidentaJudet: function (judet) { return rezByJud[norm(judet)] || null; },
    ready: function () { return ready; },
    repatch: patchAll
  };
})();
