/* ============================================================================
 * UrbanX Intelligence — capitol „Capacitate & Conformitate" în Masterplan + PMUD.
 * Patch non-invaziv pe _StratPMUDContent.build / _StratMasterplanContent.build:
 * adaugă bilanțul de capacitate cumulativă al UAT-ului + verdictul scenariului
 * analizat în sesiune (dacă există window.UXI._last). Disciplina integrității:
 * capacități estimate din populație → flag „estimat", rol de pre-analiză.
 * ========================================================================== */
(function (G) {
  'use strict';
  function fmt(n) { try { return Math.round(n).toLocaleString('ro-RO'); } catch (e) { return String(n); } }

  function chapter(D, ctx) {
    if (!D || !D.chapter || !G.UXI) return;
    var city = (ctx && ctx.city) || {};

    D.chapter('Capacitate & Conformitate (UrbanX Intelligence)');
    D.P('Acest capitol prezintă bilanțul de capacitate cumulativă generat de modulul UrbanX ' +
      'Intelligence: gradul de utilizare a infrastructurii față de TOATE documentațiile aprobate ' +
      '(nu față de populația curentă). Scopul este să semnaleze depășirile cumulate înainte de noi ' +
      'aprobări — conform Legea 169/2026 (CATUC), NTPA 013/2002, Legii 24/2007 și normelor MEN. ' +
      'Rol de PRE-ANALIZĂ; capacitățile de infrastructură sunt estimate și necesită confirmare de la operatori.');

    D.h2('Praguri și indicatori');
    D.table(['Indicator', 'Normă', 'Prag avertizare', 'Prag critic'],
      [['Apă potabilă', 'NTPA 013/2002 · 150 l/loc/zi', '70%', '90%'],
       ['Locuri școală', 'MEN · 1 loc / 4 locuințe', '70%', '90%'],
       ['Locuri grădiniță', '1 loc / 8 locuințe', '70%', '90%'],
       ['Spații verzi', 'Legea 24/2007 · 8 mp/loc', '70%', '90%'],
       ['Impermeabilizare', 'standard UE · 65% din UAT', '70%', '90%']],
      null, { boldFirst: true });
    D.source('Praguri: ok <70% · avertizare 70–90% · critic >90% · blocat >100% (infrastructură fizic depășită).');

    var last = G.UXI._last;
    if (last && last.capacity) {
      var cap = last.capacity;
      D.h2('Bilanț UAT analizat: ' + (last.uat && last.uat.name ? last.uat.name : (city.name || '')));
      D.kpis([
        { label: 'Populație aprobată', val: fmt(cap.population_approved), sub: 'cumulat' },
        { label: 'Stare generală', val: (cap.overall_status || '').toUpperCase(), sub: 'max severitate' },
        { label: 'Deplasări/zi', val: fmt(cap.trips_daily), sub: 'generate' }
      ]);
      var rows = Object.keys(cap.indicators).map(function (k) {
        var ind = cap.indicators[k];
        return [ind.label, fmt(ind.needed) + ' ' + ind.unit, fmt(ind.capacity) + ' ' + ind.unit, ind.utilization_pct + '%', ind.status.toUpperCase()];
      });
      D.table(['Indicator', 'Necesar', 'Capacitate', 'Utilizare', 'Stare'], rows, null, { boldFirst: true });

      if (last.impact) {
        var imp = last.impact;
        D.callout('Verdict PUZ analizat: ' + imp.recommendation.replace(/_/g, ' ').toUpperCase(),
          '+' + fmt(imp.marginal.population) + ' locuitori · +' + fmt(imp.marginal.water_m3day) + ' m³/zi apă · +' +
          fmt(imp.marginal.school_seats) + ' locuri școală. ' +
          (imp.pug_fail.length ? 'Neconformitate PUG: ' + imp.pug_fail.join(', ') + '. ' : '') +
          (imp.exceeded_indicators.length ? 'Infrastructură depășită: ' + imp.exceeded_indicators.join(', ') + '.' : ''),
          imp.recommendation === 'blocat' ? [200, 60, 40] : imp.recommendation === 'in_analiza' ? [200, 130, 20] : [40, 150, 80]);
      }
    } else {
      var inf = G.UXI.estimateInfra(city);
      if (inf.population_current > 0) {
        D.h2('Capacități estimate — ' + (city.name || 'UAT'));
        D.table(['Infrastructură', 'Capacitate estimată'],
          [['Apă potabilă', fmt(inf.infra_water_m3day) + ' m³/zi'],
           ['Locuri școală', fmt(inf.infra_schools_seats)],
           ['Locuri grădiniță', fmt(inf.infra_kinder_seats)],
           ['Spații verzi', fmt(inf.infra_green_m2) + ' mp']],
          null, { boldFirst: true });
        D.source(inf.note);
      }
      D.P('Pentru bilanțul cumulativ complet, deschideți „🏗️ Capacitate UAT" în UrbanX, introduceți ' +
        'locuințele aprobate cumulat (din registrul PUZ) și capacitățile reale de la operatori — rezultatul ' +
        '(utilizare pe indicatori + verdict PUZ nou) va apărea automat aici.');
    }

    D.callout('Instrument de pre-analiză',
      'Bilanțul este orientativ. Capacitățile de infrastructură estimate din populație trebuie confirmate ' +
      'cu date verificate de la operatori (apă-canal, ISJ, energie). Deciziile de aprobare/blocare rămân ' +
      'în sarcina arhitectului șef și a Consiliului Local, conform Legea 169/2026 (CATUC).', [212, 130, 20]);
  }

  function patch(name) {
    var obj = G[name];
    if (!obj || typeof obj.build !== 'function' || obj.__uxiPatched) return false;
    var orig = obj.build.bind(obj);
    obj.build = function (D, ctx) { orig(D, ctx); try { chapter(D, ctx); } catch (e) { console.warn('[UXI] capitol esuat', e); } };
    obj.__uxiPatched = true; return true;
  }
  function tryPatch() { var a = patch('_StratPMUDContent'), b = patch('_StratMasterplanContent'); return a || b; }
  if (!tryPatch()) { var t = 0, iv = setInterval(function () { t++; if (tryPatch() || t > 40) clearInterval(iv); }, 250); }
  G.UXI = G.UXI || {}; G.UXI.capacityChapter = chapter;
  console.log('[UXI] capitol Capacitate & Conformitate pregătit (Masterplan + PMUD)');
})(window);
