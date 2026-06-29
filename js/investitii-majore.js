// ═══════════════════════════════════════════════════════════════════════════
// investitii-majore.js — REGISTRU INVESTIȚII MAJORE ANUNȚATE (window._InvestMajore)
// Proiecte mari de infrastructură anunțate/în execuție, pe județe — din programele
// naționale (PNRR, Anghel Saligny, CNAIR, CFR, CNI, Programul Transport, POR).
// Date curate din surse publice (proiecte reale). forJudet(code)/forCity(cityKey) +
// panou + secțiune reutilizabilă în studii (Masterplan/SIDU/Regionalizare). 29 iun 2026
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  var N = function (v) { return isNaN(+v) ? '-' : Number(v).toLocaleString('ro-RO'); };
  // valoare în mil. EUR (orientativ, surse publice). prog = programul de finanțare. st = stadiu.
  var P = [
    // ── NAȚIONAL / multi-județ ──
    { jud: 'NATIONAL', n: 'Autostrada A7 — Autostrada Moldovei (Ploiești–Siret, ~430 km)', val: 9500, prog: 'PNRR + Buget', st: 'execuție', an: 2027, sect: 'Transport rutier' },
    { jud: 'NATIONAL', n: 'Autostrada A8 — Autostrada Unirii (Tg. Mureș–Iași–Ungheni)', val: 8000, prog: 'PNRR + Buget', st: 'execuție/licitație', an: 2030, sect: 'Transport rutier' },
    { jud: 'NATIONAL', n: 'Spitalele Regionale de Urgență (Iași, Cluj, Craiova)', val: 1500, prog: 'PNRR + BEI', st: 'execuție', an: 2027, sect: 'Sănătate' },
    { jud: 'NATIONAL', n: 'Programul „Anghel Saligny" — drumuri, apă-canal, gaze (UAT)', val: 13000, prog: 'Anghel Saligny', st: 'contractare/execuție', an: 2028, sect: 'Infrastructură locală' },
    // ── IAȘI ──
    { jud: 'IS', n: 'Spitalul Regional de Urgență Iași (~850 paturi)', val: 470, prog: 'PNRR + BEI', st: 'execuție', an: 2027, sect: 'Sănătate' },
    { jud: 'IS', n: 'Trenul Metropolitan Iași (rețea feroviară metropolitană)', val: 2400, prog: 'PNRR + POR NE', st: 'execuție/faze', an: 2026, sect: 'Mobilitate' },
    { jud: 'IS', n: 'Centura ocolitoare Iași (extindere la 4 benzi + pasaje)', val: 250, prog: 'CNAIR', st: 'execuție', an: 2026, sect: 'Transport rutier' },
    // ── SUCEAVA ──
    { jud: 'SV', n: 'A7 Pașcani–Suceava–Siret (tronson Moldova nord)', val: 2200, prog: 'PNRR', st: 'execuție', an: 2027, sect: 'Transport rutier' },
    { jud: 'SV', n: 'Șoseaua de centură / ocolitoarea Suceava', val: 180, prog: 'CNAIR + Buget', st: 'aprobat/licitație', an: 2028, sect: 'Transport rutier' },
    // ── CLUJ ──
    { jud: 'CJ', n: 'Metroul Cluj-Napoca (Linia 1, ~21 km, 19 stații)', val: 2100, prog: 'PNRR + Buget', st: 'execuție', an: 2028, sect: 'Mobilitate' },
    { jud: 'CJ', n: 'Centura metropolitană Cluj + tren metropolitan', val: 900, prog: 'POR NV + CNAIR', st: 'execuție/faze', an: 2027, sect: 'Mobilitate' },
    { jud: 'CJ', n: 'Extinderea Aeroportului Internațional Cluj', val: 250, prog: 'CJ + POR', st: 'execuție', an: 2026, sect: 'Aerian' },
    // ── BUCUREȘTI-ILFOV ──
    { jud: 'B', n: 'Magistrala 6 de metrou (1 Mai – Aeroport Otopeni)', val: 1700, prog: 'PNRR + BEI', st: 'execuție', an: 2030, sect: 'Mobilitate' },
    { jud: 'IF', n: 'Autostrada de centură A0 București (~100 km)', val: 2300, prog: 'PNRR + Buget', st: 'execuție', an: 2027, sect: 'Transport rutier' },
    // ── BRAȘOV ──
    { jud: 'BV', n: 'Autostrada A3 Comarnic–Brașov (tronson montan)', val: 1800, prog: 'Buget + concesiune', st: 'licitație/faze', an: 2031, sect: 'Transport rutier' },
    { jud: 'BV', n: 'Aeroportul Internațional Brașov-Ghimbav (operațional)', val: 200, prog: 'CJ Brașov', st: 'finalizat', an: 2023, sect: 'Aerian' },
    // ── TIMIȘ ──
    { jud: 'TM', n: 'Centura Timișoara + pasaje + modernizare CF', val: 400, prog: 'CNAIR + CFR', st: 'execuție', an: 2027, sect: 'Mobilitate' },
    // ── CONSTANȚA ──
    { jud: 'CT', n: 'Modernizarea și extinderea Portului Constanța + dane', val: 1200, prog: 'CEF + Buget', st: 'execuție/faze', an: 2030, sect: 'Portuar' },
    { jud: 'CT', n: 'Autostrada A4 — centura Constanța (extindere)', val: 300, prog: 'CNAIR', st: 'planificat', an: 2029, sect: 'Transport rutier' },
    // ── alte județe (reprezentativ) ──
    { jud: 'BC', n: 'A7 tronson Bacău + spital municipal', val: 1100, prog: 'PNRR', st: 'execuție', an: 2026, sect: 'Transport rutier' },
    { jud: 'GL', n: 'Pod suspendat Brăila (Dunăre) — efecte Galați + drumuri', val: 500, prog: 'Buget + BEI', st: 'finalizat', an: 2023, sect: 'Transport rutier' },
    { jud: 'BR', n: 'Podul peste Dunăre la Brăila (cel mai lung din RO)', val: 500, prog: 'Buget + BEI', st: 'finalizat', an: 2023, sect: 'Transport rutier' },
    { jud: 'DJ', n: 'Spitalul Regional de Urgență Craiova', val: 370, prog: 'PNRR + BEI', st: 'execuție', an: 2027, sect: 'Sănătate' },
    { jud: 'AR', n: 'A1 Arad–Timișoara (modernizare) + centura Arad', val: 300, prog: 'CNAIR', st: 'execuție', an: 2026, sect: 'Transport rutier' },
    { jud: 'MM', n: 'Drumul Expres Baia Mare–Satu Mare + reabilitare CF', val: 350, prog: 'POR NV + CFR', st: 'faze', an: 2028, sect: 'Transport rutier' },
    { jud: 'SB', n: 'A1 Sibiu–Pitești (tronsuri montane, Boița–Cornetu)', val: 2000, prog: 'PNRR + Buget', st: 'execuție', an: 2028, sect: 'Transport rutier' }
  ];

  function _judOf(cityKey) {
    try {
      if (G._UAT_REGISTRY && G._UAT_REGISTRY[cityKey]) return G._UAT_REGISTRY[cityKey].j;
      var c = (G._RO_CITIES_DB && G._RO_CITIES_DB[cityKey]) || (G.TCI && G.TCI._EXTRA_UATS && G.TCI._EXTRA_UATS[cityKey]);
      if (c && c.judet_code) return c.judet_code;
      var s = G.UrbanXIVU && G.UrbanXIVU.scoreFor && G.UrbanXIVU.scoreFor(cityKey);
      if (s && s.city && s.city.judet_code) return s.city.judet_code;
    } catch (e) {}
    return null;
  }
  function forJudet(code) { if (!code) return []; code = code.toUpperCase(); return P.filter(function (x) { return x.jud === code || x.jud === 'NATIONAL'; }); }
  function forCity(cityKey) { return forJudet(_judOf(cityKey)); }

  // secțiune reutilizabilă în studii (D = _makeStratDoc). Folosită în Masterplan/SIDU/Regionalizare.
  function renderSection(D, cityKey) {
    try {
      var list = forCity(cityKey); if (!list.length || !D || !D.chapter) return;
      D.chapter('Investiții majore anunțate cu impact teritorial');
      D.P('Tabelul de mai jos sintetizează investițiile majore anunțate sau în execuție care afectează teritoriul analizat, din programele naționale de finanțare (PNRR, Anghel Saligny, Programul Transport, CNAIR, CFR, CNI, POR). Valorile sunt orientative, din surse publice, și pot evolua pe parcursul implementării. Aceste proiecte structurante modifică semnificativ accesibilitatea, atractivitatea investițională și capacitatea de dezvoltare a zonei.');
      if (D.table) D.table(['Proiect', 'Program', 'Valoare (mil. €)', 'Stadiu'],
        list.map(function (x) { return [x.n, x.prog, N(x.val), x.st + ' · ~' + x.an]; }),
        [D.dims.CW * 0.46, D.dims.CW * 0.20, D.dims.CW * 0.16, D.dims.CW * 0.18]);
      try {
        var bySect = {}; list.forEach(function (x) { bySect[x.sect] = (bySect[x.sect] || 0) + x.val; });
        var rows = Object.keys(bySect).map(function (k) { return [k, bySect[k]]; });
        if (rows.length >= 2 && window._pickChart) window._pickChart(D, ['Sector', 'Valoare (mil. €)'], rows, 'Investiții majore pe sectoare (mil. €) — orientativ');
      } catch (e) {}
      D.P('Sursă: programele naționale de finanțare (PNRR, Anghel Saligny, Programul Transport 2021-2027, CNAIR, CFR, CNI, POR). Document orientativ — valorile și termenele se confirmă cu autoritățile contractante.');
    } catch (e) {}
  }

  // panou rapid (din meniul Teritoriu / context UAT)
  function openPanel(cityKey) {
    try {
      cityKey = cityKey || (G.TCI && G.TCI.cityKey);
      var list = forCity(cityKey); var jud = _judOf(cityKey) || '—';
      var old = document.getElementById('invest-panel'); if (old) old.remove();
      var ov = document.createElement('div'); ov.id = 'invest-panel';
      ov.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(4,8,18,.72);display:flex;align-items:center;justify-content:center;padding:18px';
      ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
      var rows = list.length ? list.map(function (x) {
        var col = x.st.indexOf('finalizat') >= 0 ? '#22c55e' : x.st.indexOf('execuție') >= 0 ? '#f59e0b' : '#60a5fa';
        return '<div style="padding:9px 11px;border:1px solid rgba(255,255,255,.07);border-radius:9px;margin-bottom:7px;background:rgba(255,255,255,.02)">' +
          '<div style="color:#e2e8f0;font-size:12.5px;font-weight:600">' + x.n + '</div>' +
          '<div style="display:flex;gap:10px;margin-top:3px;font-size:10px;color:#94a3b8"><span>📋 ' + x.prog + '</span><span style="color:#fbbf24">≈ ' + N(x.val) + ' mil. €</span><span style="color:' + col + '">● ' + x.st + ' · ' + x.an + '</span></div></div>';
      }).join('') : '<div style="color:#94a3b8;padding:18px;text-align:center">Nu sunt înregistrate investiții majore pentru județul „' + jud + '" în registrul curent (proiectele naționale se aplică oricum).</div>';
      ov.innerHTML = '<div style="max-width:600px;width:100%;background:#0f172a;border:1px solid rgba(212,175,55,.3);border-radius:14px;padding:18px;max-height:85vh;overflow-y:auto;box-shadow:0 16px 50px rgba(0,0,0,.7)">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><div style="color:#fbbf24;font-weight:800;font-size:15px">🏗 Investiții majore anunțate · jud. ' + jud + '</div>' +
        '<button onclick="document.getElementById(\'invest-panel\').remove()" style="background:none;border:0;color:#94a3b8;font-size:20px;cursor:pointer">✕</button></div>' +
        '<div style="color:#64748b;font-size:11px;margin-bottom:12px">Proiecte din programele naționale (PNRR · Anghel Saligny · Programul Transport · CNAIR · CFR · CNI · POR). Valori orientative din surse publice.</div>' +
        rows + '</div>';
      document.body.appendChild(ov);
    } catch (e) { G.ss && G.ss('Eroare panou investiții'); }
  }

  G._InvestMajore = { PROJECTS: P, forJudet: forJudet, forCity: forCity, renderSection: renderSection, openPanel: openPanel };
  window._InvestMajore = G._InvestMajore;
  console.log('[InvestMajore] ✅ registru investiții majore (' + P.length + ' proiecte) · window._InvestMajore');
})(window);
