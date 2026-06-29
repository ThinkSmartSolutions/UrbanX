// ═══════════════════════════════════════════════════════════════════════════
// naval-treceri.js — TRECERI NAVALE PE DUNĂRE/MARE (window._NavalTreceri)
// Puncte de trecere cu bacul/feribotul (date reale) + context navigație fluvial-
// maritimă. NU inventează „orare de barje" (traficul de marfă e la cerere, urmărit
// prin AIS/RoRIS-AFDJ, nu pe orar fix) — prezintă onest trecerile + sistemul AIS.
// renderSection(D) pt studiile portuar/litoral + panou. 29 iun 2026 · TSS
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  // treceri cu bacul/feribotul pe Dunăre (RO) — reale. tip: bac(intern) / feribot(transfrontalier)
  var TRECERI = [
    { de: 'Bechet (DJ)', spre: 'Oreahovo (BG)', tip: 'feribot transfrontalier', rau: 'Dunăre', jud: 'DJ' },
    { de: 'Zimnicea (TR)', spre: 'Sviștov (BG)', tip: 'feribot transfrontalier', rau: 'Dunăre', jud: 'TR' },
    { de: 'Turnu Măgurele (TR)', spre: 'Nikopol (BG)', tip: 'feribot transfrontalier', rau: 'Dunăre', jud: 'TR' },
    { de: 'Oltenița (CL)', spre: 'Tutrakan (BG)', tip: 'feribot transfrontalier', rau: 'Dunăre', jud: 'CL' },
    { de: 'Călărași (CL)', spre: 'Silistra (BG)', tip: 'feribot transfrontalier', rau: 'Dunăre', jud: 'CL' },
    { de: 'Galați (GL)', spre: 'I.C. Brătianu (TL)', tip: 'bac intern', rau: 'Dunăre', jud: 'GL' },
    { de: 'Brăila (BR)', spre: 'Smârdan / Insula Mare', tip: 'bac intern', rau: 'Dunăre', jud: 'BR' },
    { de: 'Isaccea (TL)', spre: 'Orlovka (UA)', tip: 'feribot transfrontalier', rau: 'Dunăre', jud: 'TL' },
    { de: 'Tulcea (TL)', spre: 'localități Deltă (Sulina, Sf. Gheorghe)', tip: 'navă pasageri', rau: 'Dunăre/Deltă', jud: 'TL' },
    { de: 'Cernavodă (CT)', spre: 'mal stâng Dunăre', tip: 'bac intern', rau: 'Dunăre', jud: 'CT' }
  ];

  function _judOf(cityKey) {
    try {
      if (G._UAT_REGISTRY && G._UAT_REGISTRY[cityKey]) return G._UAT_REGISTRY[cityKey].j;
      var s = G.UrbanXIVU && G.UrbanXIVU.scoreFor && G.UrbanXIVU.scoreFor(cityKey);
      if (s && s.city && s.city.judet_code) return s.city.judet_code;
    } catch (e) {}
    return null;
  }

  // secțiune reutilizabilă (D = _makeStratDoc) — pt studiile portuar/litoral/deltă
  function renderSection(D, cityKey) {
    try {
      if (!D || !D.chapter) return;
      D.chapter('Navigație fluvial-maritimă, treceri navale și trafic AIS');
      D.P('Spre deosebire de transportul rutier sau feroviar, transportul fluvial de marfă pe Dunăre NU funcționează pe baza unui orar public fix: convoaiele de barje sunt operate la cerere, în funcție de marfă, de adâncimea șenalului navigabil și de regimul hidrologic. Mișcarea navelor este însă monitorizată în timp real prin sistemul AIS (Automatic Identification System) și prin RoRIS — River Information Services, operat de AFDJ Galați (Administrația Fluvială a Dunării de Jos), care oferă date despre poziția, pescajul și direcția navelor pe sectorul românesc al Dunării (~1.075 km navigabili).');
      D.P('Pentru transportul de persoane și autovehicule există însă treceri navale cu program (bac/feribot), inclusiv transfrontaliere (România–Bulgaria, România–Ucraina). Tabelul de mai jos prezintă principalele treceri de pe Dunăre relevante pentru conectivitatea teritoriului analizat. Programul exact al fiecărei treceri se stabilește de operator (sezonier și în funcție de nivelul apei) și se confirmă la fața locului.');
      if (D.table) D.table(['Trecere (de la → la)', 'Tip', 'Curs de apă'],
        TRECERI.map(function (t) { return [t.de + ' → ' + t.spre, t.tip, t.rau]; }),
        [D.dims.CW * 0.46, D.dims.CW * 0.34, D.dims.CW * 0.20]);
      D.P('Pentru navigația maritimă, Portul Constanța — cel mai mare port la Marea Neagră — este conectat la Dunăre prin Canalul Dunăre–Marea Neagră (64,4 km), care scurtează cu ~400 km ruta spre Europa Centrală. Traficul maritim este urmărit prin AIS (terminale tip MarineTraffic) și gestionat de Căpitănia Portului. Sursă: AFDJ Galați (RoRIS), CN Administrația Porturilor Maritime Constanța, AIS public; date orientative — programele de trecere se confirmă cu operatorii.');
    } catch (e) {}
  }

  function openPanel(cityKey) {
    try {
      var old = document.getElementById('naval-panel'); if (old) old.remove();
      var ov = document.createElement('div'); ov.id = 'naval-panel';
      ov.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(4,8,18,.72);display:flex;align-items:center;justify-content:center;padding:18px';
      ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
      var rows = TRECERI.map(function (t) {
        var col = t.tip.indexOf('transfrontalier') >= 0 ? '#a78bfa' : t.tip.indexOf('pasageri') >= 0 ? '#34d399' : '#60a5fa';
        return '<div style="padding:8px 11px;border:1px solid rgba(255,255,255,.07);border-radius:8px;margin-bottom:6px;background:rgba(255,255,255,.02)">' +
          '<div style="color:#e2e8f0;font-size:12.5px;font-weight:600">' + t.de + ' → ' + t.spre + '</div>' +
          '<div style="font-size:10px;margin-top:2px;color:' + col + '">⛴ ' + t.tip + ' · ' + t.rau + '</div></div>';
      }).join('');
      ov.innerHTML = '<div style="max-width:560px;width:100%;background:#0f172a;border:1px solid rgba(56,138,221,.3);border-radius:14px;padding:18px;max-height:85vh;overflow-y:auto;box-shadow:0 16px 50px rgba(0,0,0,.7)">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><div style="color:#38bdf8;font-weight:800;font-size:15px">⛴ Treceri navale pe Dunăre & navigație</div>' +
        '<button onclick="document.getElementById(\'naval-panel\').remove()" style="background:none;border:0;color:#94a3b8;font-size:20px;cursor:pointer">✕</button></div>' +
        '<div style="color:#94a3b8;font-size:11px;margin-bottom:12px;line-height:1.5">Transportul de marfă pe Dunăre e la cerere (nu pe orar fix), urmărit prin AIS / RoRIS-AFDJ. Trecerile de persoane/auto (bac/feribot) au program sezonier, stabilit de operator.</div>' +
        rows +
        '<div style="font-size:9.5px;color:#475569;margin-top:8px">Surse: AFDJ Galați (RoRIS), CN APM Constanța, AIS public. ~1.075 km Dunăre navigabilă în RO · Canalul Dunăre–Marea Neagră 64,4 km.</div></div>';
      document.body.appendChild(ov);
    } catch (e) {}
  }

  G._NavalTreceri = { TRECERI: TRECERI, renderSection: renderSection, openPanel: openPanel, _judOf: _judOf };
  window._NavalTreceri = G._NavalTreceri;
  console.log('[NavalTreceri] ✅ treceri navale Dunăre/mare (' + TRECERI.length + ') · window._NavalTreceri');
})(window);
