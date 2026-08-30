/* ============================================================================
 * UrbanX Flux — capitol „Mobilitate" injectat în Masterplan + PMUD.
 * Patch non-invaziv pe _StratPMUDContent.build / _StratMasterplanContent.build:
 * apelează build-ul original, apoi adaugă un capitol de mobilitate (metodologie +
 * rate ITE de referință + repartiție modală + studiul de impact rulat în sesiune,
 * dacă există). Disciplina de integritate: pre-analiză, nu substituie PMUD oficial.
 * ========================================================================== */
(function (G) {
  'use strict';

  function fmt(n) { try { return Math.round(n).toLocaleString('ro-RO'); } catch (e) { return String(n); } }

  function fluxChapter(D, ctx) {
    if (!D || !D.chapter) return;
    var F = G.Flux; if (!F) return;
    var city = (ctx && ctx.city) || {};
    var mob = (ctx && ctx.mob) || {};

    D.chapter('Mobilitate — Studiu de trafic (UrbanX Flux)');
    D.P('Acest capitol prezintă fundamentarea de mobilitate generată cu modulul UrbanX Flux, ' +
      'integrat nativ cu cadastrul și zonarea PUG ale platformei. Estimările folosesc rate de ' +
      'generare a deplasărilor tip ITE adaptate la contextul românesc și parametri normativi ' +
      '(NP 068/2002, STAS 10144, GD 525/1996). Rolul este de PRE-ANALIZĂ și fundamentare — ' +
      'nu substituie un studiu de trafic / model calibrat elaborat de proiectant atestat.');

    // ── Rate de generare (referință) ──────────────────────────────────────
    D.h2('Rate de generare a deplasărilor (ITE adaptat RO)');
    var rates = F.TRIP_RATES || {};
    var rows = Object.keys(rates).map(function (k) {
      var r = rates[k];
      var amt = (r.am_in + r.am_out).toFixed(2), pmt = (r.pm_in + r.pm_out).toFixed(2);
      var basis = r.basis === 'unit' ? 'per locuință' : 'per 100 mp ADC';
      return [(F.LAND_USE_LABELS && F.LAND_USE_LABELS[k]) || k, amt, pmt, basis, r.ite];
    });
    D.table(['Funcțiune', 'Vârf AM', 'Vârf PM', 'Bază', 'Referință ITE'], rows, null, { boldFirst: true });
    D.source('ITE Trip Generation Manual 10th/11th ed., coeficienți adaptați pe PMUD Cluj 2021 / Iași 2019.');

    // ── Repartiție modală de referință ────────────────────────────────────
    D.h2('Repartiția modală de referință');
    var split = null;
    if (mob && mob.modalAct && mob.modalAct.length >= 3) {
      split = 'Auto ' + mob.modalAct[0] + '% · Transport public ' + mob.modalAct[1] + '% · Moduri active ' + mob.modalAct[2] + '% (situație actuală, model PMUD).';
    } else {
      var size = (city.pop2021 || city.pop || 0) >= 200000 ? 'metropolis' : (city.tip === 'comuna' ? 'commune' : 'city');
      var ms = (F.MODAL_BY_SIZE && F.MODAL_BY_SIZE[size]) || {};
      split = 'Auto ' + Math.round((ms.auto || 0) * 100) + '% · TP ' + Math.round((ms.pt || 0) * 100) +
        '% · Bicicletă ' + Math.round((ms.bicycle || 0) * 100) + '% · Pietonal ' + Math.round((ms.pedestrian || 0) * 100) +
        '% (implicit pe mărimea localității, INS/ANCPI).';
    }
    D.P(split);

    // ── Studiul de impact rulat în sesiune (dacă există) ──────────────────
    var study = F._lastStudy;
    if (study && study.result) {
      var res = study.result, meta = study.meta || {};
      D.h2('Studiu de impact rulat: ' + (meta.site_name || 'sit analizat'));
      D.kpis([
        { label: 'Vârf PM', val: fmt(res.trips.pm), sub: 'deplasări/h' },
        { label: 'Zilnic', val: fmt(res.trips.daily), sub: 'deplasări' },
        { label: 'Cotă auto', val: Math.round(res.modal_split.auto * 100) + '%', sub: 'vârf PM' },
        { label: 'Parcare', val: fmt(res.parking_demand.required_after_reduction), sub: 'locuri (GD 525)' },
        { label: 'CO2', val: fmt(res.emissions.total_tonnes_year) + ' t', sub: 'pe an' }
      ]);
      if (res.intersections && res.intersections.length) {
        D.h3 && D.h3('Încărcarea intersecțiilor adiacente');
        var ixRows = res.intersections.map(function (i) {
          return [i.name, i.vc_ratio.toFixed(2), i.los, '+' + fmt(i.added_veh_hr) + ' veh/h', i.over_capacity ? 'PESTE LOS D' : 'OK'];
        });
        D.table(['Intersecție', 'v/c', 'LOS', 'Trafic adăugat', 'Stare'], ixRows, null, { boldFirst: true });
      }
      var fail = (res.compliance || []).filter(function (c) { return c.status === 'FAIL'; });
      if (fail.length) {
        D.callout('Atenție — depășiri de capacitate',
          fail.map(function (c) { return c.detail; }).join(' '), [200, 60, 40]);
      }
    } else {
      D.P('Pentru un studiu de impact pe un sit concret, selectați parcela/PUZ-ul în UrbanX și ' +
        'rulați „Studiu trafic" (UrbanX Flux) — rezultatul (generare, repartiție modală, încărcare ' +
        'intersecții, parcare, emisii) va fi inclus automat aici.');
    }

    D.callout('Instrument de pre-analiză',
      'Cifrele din acest capitol sunt orientative, generate algoritmic. Pentru avize și aprobări ' +
      'este necesar un studiu de trafic / PMUD elaborat de proiectant atestat, cu model calibrat și ' +
      'măsurători de teren, conform NP 068/2002, STAS 10144 și Legea 169/2026 (CATUC).', [212, 130, 20]);
  }

  function patch(name) {
    var obj = G[name];
    if (!obj || typeof obj.build !== 'function' || obj.__fluxPatched) return false;
    var orig = obj.build.bind(obj);
    obj.build = function (D, ctx) {
      orig(D, ctx);
      try { fluxChapter(D, ctx); } catch (e) { console.warn('[Flux] capitol mobilitate esuat', e); }
    };
    obj.__fluxPatched = true;
    return true;
  }

  // încearcă imediat + reîncearcă scurt (în caz de ordine de încărcare)
  function tryPatch() {
    var a = patch('_StratPMUDContent'), b = patch('_StratMasterplanContent');
    return a || b;
  }
  if (!tryPatch()) {
    var tries = 0, iv = setInterval(function () {
      tries++; if (tryPatch() || tries > 40) clearInterval(iv);
    }, 250);
  }
  G.Flux = G.Flux || {};
  G.Flux.mobilityChapter = fluxChapter;
  console.log('[Flux] capitol Mobilitate pregătit (Masterplan + PMUD)');
})(window);
