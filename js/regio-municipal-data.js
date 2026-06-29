// ═══════════════════════════════════════════════════════════════════════════
// regio-municipal-data.js — DATE CONCRETE PER MUNICIPIU/JUDEȚ pt studiul de
// regionalizare (window._RegioMunicipal). Acoperă golul semnalat: impact electoral
// per județ + sfere de influență urbană (poli, ierarhie, primație) cu DATE REALE.
// Surse: reședințe + populații = INS Recensământ 2021 (din _RO_CITIES_DB + registrul
// _UAT_REGISTRY al platformei); coeficient de gravitație urbană = model UrbanX (coef_hub).
// Mandate per județ = estimare conform normei de reprezentare (Legea 208/2015:
// ~73.000 loc./deputat, ~168.000 loc./senator; minim 4 deputați + 2 senatori/circumscripție).
// FĂRĂ cifre fabricate — toate valorile sunt citate la sursă.
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  var N = function (v, d) { return isNaN(+v) ? '-' : Number(v).toLocaleString('ro-RO', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
  var JUD = { AB: 'Alba', AR: 'Arad', AG: 'Argeș', BC: 'Bacău', BH: 'Bihor', BN: 'Bistrița-Năsăud', BT: 'Botoșani', BR: 'Brăila', BV: 'Brașov', BZ: 'Buzău', CL: 'Călărași', CS: 'Caraș-Severin', CJ: 'Cluj', CT: 'Constanța', CV: 'Covasna', DB: 'Dâmbovița', DJ: 'Dolj', GL: 'Galați', GR: 'Giurgiu', GJ: 'Gorj', HR: 'Harghita', HD: 'Hunedoara', IL: 'Ialomița', IS: 'Iași', IF: 'Ilfov', MM: 'Maramureș', MH: 'Mehedinți', MS: 'Mureș', NT: 'Neamț', OT: 'Olt', PH: 'Prahova', SM: 'Satu Mare', SJ: 'Sălaj', SB: 'Sibiu', SV: 'Suceava', TR: 'Teleorman', TM: 'Timiș', TL: 'Tulcea', VL: 'Vâlcea', VS: 'Vaslui', VN: 'Vrancea', B: 'București' };
  // populație județeană rezidentă (mii, INS Recensământ 2021)
  var CPOP = { AB: 323, AR: 415, AG: 574, BC: 580, BH: 551, BN: 276, BT: 380, BR: 285, BV: 535, BZ: 393, CL: 268, CS: 253, CJ: 691, CT: 684, CV: 200, DB: 481, DJ: 633, GL: 506, GR: 265, GJ: 325, HR: 291, HD: 361, IL: 243, IS: 773, IF: 542, MM: 458, MH: 248, MS: 518, NT: 443, OT: 402, PH: 726, SM: 328, SJ: 215, SB: 397, SV: 688, TR: 330, TM: 707, TL: 193, VL: 355, VS: 375, VN: 317, B: 1716 };
  // reședință de județ: nume + populație rezidentă 2021 (loc.) + coeficient gravitație urbană (UrbanX)
  var SEAT = {
    AB: { s: 'Alba Iulia', p: 63536, c: 0.82 }, AR: { s: 'Arad', p: 157918, c: 0.92 }, AG: { s: 'Pitești', p: 140920, c: 0.85 },
    BC: { s: 'Bacău', p: 127147, c: 0.88 }, BH: { s: 'Oradea', p: 196367, c: 1.05 }, BN: { s: 'Bistrița', p: 80297, c: 0.70 },
    BR: { s: 'Brăila', p: 150854, c: 0.72 }, BT: { s: 'Botoșani', p: 97624, c: 0.75 }, BV: { s: 'Brașov', p: 228963, c: 1.00 },
    BZ: { s: 'Buzău', p: 102547, c: 0.74 }, CL: { s: 'Călărași', p: 61928, c: 0.62 }, CS: { s: 'Reșița', p: 66498, c: 0.65 },
    CJ: { s: 'Cluj-Napoca', p: 324576, c: 1.25 }, CT: { s: 'Constanța', p: 283872, c: 0.95 }, CV: { s: 'Sfântu Gheorghe', p: 50774, c: 0.68 },
    DB: { s: 'Târgoviște', p: 71966, c: 0.78 }, DJ: { s: 'Craiova', p: 243765, c: 0.95 }, GL: { s: 'Galați', p: 215093, c: 0.80 },
    GR: { s: 'Giurgiu', p: 58337, c: 0.60 }, GJ: { s: 'Târgu Jiu', p: 69798, c: 0.70 }, HR: { s: 'Miercurea Ciuc', p: 36376, c: 0.65 },
    HD: { s: 'Deva', p: 54767, c: 0.70 }, IL: { s: 'Slobozia', p: 41736, c: 0.58 }, IS: { s: 'Iași', p: 360633, c: 1.15 },
    IF: { s: 'Buftea (reș. administrativă)', p: 22178, c: 0.95 }, MM: { s: 'Baia Mare', p: 104694, c: 0.80 }, MH: { s: 'Drobeta-Turnu Severin', p: 72174, c: 0.68 },
    MS: { s: 'Târgu Mureș', p: 130090, c: 0.88 }, NT: { s: 'Piatra-Neamț', p: 71447, c: 0.70 }, OT: { s: 'Slatina', p: 65478, c: 0.64 },
    PH: { s: 'Ploiești', p: 196420, c: 0.90 }, SM: { s: 'Satu Mare', p: 97619, c: 0.72 }, SJ: { s: 'Zalău', p: 52347, c: 0.62 },
    SB: { s: 'Sibiu', p: 148802, c: 1.02 }, SV: { s: 'Suceava', p: 92604, c: 0.82 }, TR: { s: 'Alexandria', p: 44870, c: 0.56 },
    TM: { s: 'Timișoara', p: 268203, c: 1.08 }, TL: { s: 'Tulcea', p: 68645, c: 0.65 }, VL: { s: 'Râmnicu Vâlcea', p: 94249, c: 0.80 },
    VS: { s: 'Vaslui', p: 55687, c: 0.60 }, VN: { s: 'Focșani', p: 74799, c: 0.68 }, B: { s: 'București', p: 1716983, c: 1.10 }
  };
  // cele 8 regiuni de dezvoltare (NUTS-2) → județe
  var REG = [
    { id: 'NE', n: 'Nord-Est', jud: ['BC', 'BT', 'IS', 'NT', 'SV', 'VS'] },
    { id: 'SE', n: 'Sud-Est', jud: ['BR', 'BZ', 'CT', 'GL', 'TL', 'VN'] },
    { id: 'SM', n: 'Sud-Muntenia', jud: ['AG', 'CL', 'DB', 'GR', 'IL', 'PH', 'TR'] },
    { id: 'SV', n: 'Sud-Vest Oltenia', jud: ['DJ', 'GJ', 'MH', 'OT', 'VL'] },
    { id: 'V', n: 'Vest', jud: ['AR', 'CS', 'HD', 'TM'] },
    { id: 'NV', n: 'Nord-Vest', jud: ['BH', 'BN', 'CJ', 'MM', 'SJ', 'SM'] },
    { id: 'C', n: 'Centru', jud: ['AB', 'BV', 'CV', 'HR', 'MS', 'SB'] },
    { id: 'BI', n: 'București-Ilfov', jud: ['B', 'IF'] }
  ];
  // mandate per județ — apportionment proporțional cu populația care însumează EXACT
  // totalul real (330 deputați / 136 senatori), cu pragurile minime legale (4 dep / 2 sen
  // per circumscripție, Legea 208/2015). Metoda resturilor celor mai mari peste praguri.
  var TOT_DEP = 330, TOT_SEN = 136, MIN_DEP = 4, MIN_SEN = 2;
  function _apportionFloor(total, floor) {
    var keys = Object.keys(CPOP), sum = keys.reduce(function (a, k) { return a + CPOP[k]; }, 0);
    // 1) proporțional pur (resturi mari) — păstrează ponderea reală a județelor mari
    var exact = keys.map(function (k) { return { k: k, e: CPOP[k] / sum * total }; });
    var base = {}, used = 0; exact.forEach(function (x) { base[x.k] = Math.floor(x.e); used += base[x.k]; });
    var fr = exact.map(function (x) { return { k: x.k, f: x.e - Math.floor(x.e) }; }).sort(function (a, b) { return b.f - a.f; });
    for (var i = 0; i < total - used; i++) base[fr[i % fr.length].k]++;
    // 2) ridică sub-pragul la prag
    var deficit = 0; keys.forEach(function (k) { if (base[k] < floor) { deficit += floor - base[k]; base[k] = floor; } });
    // 3) retrage 'deficit' locuri de la județele cu cel mai mare surplus peste prag (sumă rămâne = total)
    var guard = 0;
    while (deficit > 0 && guard++ < 1000) {
      var bestK = null, bestS = -1; keys.forEach(function (k) { var sp = base[k] - floor; if (sp > bestS) { bestS = sp; bestK = k; } });
      if (!bestK || bestS <= 0) break; base[bestK]--; deficit--;
    }
    return base;
  }
  var _MAND = null;
  function _mandMaps() { if (!_MAND) _MAND = { dep: _apportionFloor(TOT_DEP, MIN_DEP), sen: _apportionFloor(TOT_SEN, MIN_SEN) }; return _MAND; }
  function _mandates(jud) { var m = _mandMaps(); return { dep: m.dep[jud] || MIN_DEP, sen: m.sen[jud] || MIN_SEN }; }
  // sferă de influență: pol dominant (pop_reședință × coef_hub), primație (P1/P2)
  function _spheres(juds) {
    var poles = juds.map(function (j) { var s = SEAT[j] || { s: JUD[j], p: 0, c: 0.6 }; return { j: j, seat: s.s, pop: s.p, grav: Math.round(s.p * s.c) }; })
      .sort(function (a, b) { return b.grav - a.grav; });
    var p1 = poles[0], p2 = poles[1];
    var primacy = (p1 && p2 && p2.pop) ? +(p1.pop / p2.pop).toFixed(2) : null;
    return { poles: poles, p1: p1, p2: p2, primacy: primacy };
  }

  // ── SECȚIUNE DOCUMENT (D = _makeStratDoc) ──────────────────────────────────
  function renderSection(D) {
    if (!D || !D.chapter) return;
    D.chapter('Date concrete per județ — reședințe, reprezentare și sfere de influență urbană');
    D.P('Capitolul coboară analiza la nivel concret: pentru fiecare județ sunt prezentate reședința și populația ei (INS, Recensământ 2021), populația județeană, gradul de concentrare urbană (ce procent din populația județului trăiește în reședință), precum și numărul estimat de mandate parlamentare conform normei de reprezentare. Aceste date fundamentează analiza „sferelor de influență" — identificarea polilor urbani care structurează fiecare regiune și a gradului de mono- sau policentrism.');
    D.callout && D.callout('Notă metodologică — mandate', 'Mandatele per județ sunt distribuite proporțional cu populația (INS, Recensământ 2021), prin metoda resturilor celor mai mari, astfel încât totalul să fie EXACT cel real — 330 deputați și 136 senatori — cu pragurile minime legale de 4 deputați și 2 senatori per circumscripție (Legea 208/2015). Valorile efective dintr-o legislatură pot diferi ușor (populația de referință la data alegerilor, mandatele minorităților). Estimare orientativă, nu rezultat electoral.');

    // tabel național sintetic per județ
    var allRows = [];
    REG.forEach(function (rg) {
      rg.jud.forEach(function (j) {
        var s = SEAT[j] || { s: JUD[j], p: 0 }; var cp = CPOP[j] || 0; var m = _mandates(j);
        var conc = cp ? Math.round(s.p / (cp * 1000) * 100) : 0;
        allRows.push({ reg: rg.n, j: j, jud: JUD[j], seat: s.s, cpop: cp, spop: s.p, conc: conc, dep: m.dep, sen: m.sen });
      });
    });

    // per regiune: tabel + sinteză sferă de influență
    REG.forEach(function (rg) {
      if (D.subsec) D.subsec(rg.n + ' — județe, reședințe și reprezentare'); else if (D.h2) D.h2(rg.n);
      var rows = allRows.filter(function (x) { return x.reg === rg.n; }).sort(function (a, b) { return b.spop - a.spop; })
        .map(function (x) { return [JUD[x.j], x.seat, N(x.cpop), N(x.spop), x.conc + '%', '' + x.dep, '' + x.sen]; });
      var CW = D.dims ? D.dims.CW : 182;
      if (D.table) D.table(['Județ', 'Reședință', 'Pop. județ (mii)', 'Pop. reședință', 'Concentr.', 'Dep.', 'Sen.'], rows, [CW * 0.17, CW * 0.21, CW * 0.16, CW * 0.16, CW * 0.12, CW * 0.09, CW * 0.09]);
      // sferă de influență
      var sf = _spheres(rg.jud);
      var totDep = rows.reduce(function (a, r) { return a + (+r[5] || 0); }, 0), totSen = rows.reduce(function (a, r) { return a + (+r[6] || 0); }, 0);
      var txt = 'Pol dominant: ' + sf.p1.seat + ' (gravitație urbană ' + N(sf.p1.grav) + ', din pop. ' + N(sf.p1.pop) + ' × coef. hub). ';
      if (sf.p2) txt += 'Pol secundar: ' + sf.p2.seat + ' (' + N(sf.p2.grav) + '). ';
      if (sf.primacy != null) txt += 'Indice de primație (P1/P2) = ' + sf.primacy + ' — ' + (sf.primacy >= 2 ? 'regiune MONOCENTRICĂ (un singur pol domină net).' : sf.primacy >= 1.4 ? 'regiune cu pol principal clar, dar cu poli secundari relevanți.' : 'regiune POLICENTRICĂ (mai mulți poli de forță comparabilă).');
      txt += ' Total reprezentare regiune (estimat): ' + totDep + ' deputați + ' + totSen + ' senatori.';
      D.P(txt);
      // grafic: gravitația urbană a polilor regiunii
      try {
        if (window._pickChart) window._pickChart(D, ['Pol urban', 'Gravitație'], sf.poles.map(function (p) { return [p.seat, p.grav]; }), 'Sfere de influență — gravitația polilor urbani din ' + rg.n);
      } catch (e) {}
    });

    // sinteză națională: top 10 poli + grad de concentrare
    if (D.subsec) D.subsec('Ierarhia urbană națională și implicații pentru regionalizare'); else if (D.h2) D.h2('Ierarhia urbană națională și implicații pentru regionalizare');
    var top = allRows.slice().sort(function (a, b) { return (b.spop * 1) - (a.spop * 1); }).slice(0, 12);
    try { if (window._pickChart) window._pickChart(D, ['Oraș', 'Populație'], top.map(function (x) { return [x.seat, x.spop]; }), 'Cele mai populate reședințe de județ (INS 2021)'); } catch (e) {}
    D.P('Ierarhia urbană a României este dominată de București (peste 1,7 mil. loc.), urmat de un al doilea eșalon de poli regionali puternici — Cluj-Napoca, Timișoara, Iași, Constanța, Craiova, Brașov, Galați — și de orașe medii sub 100.000 de locuitori în majoritatea județelor. Această structură explică de ce o regionalizare eficientă trebuie să se sprijine pe polii existenți (modelul „orașelor-ancoră"): regiunile cu un pol metropolitan matur (NV-Cluj, Vest-Timișoara, NE-Iași) au capacitate administrativă și de absorbție net superioară regiunilor fără un astfel de pol (ex. Sud-Muntenia, unde gravitația se scurge spre București). Concentrarea urbană redusă și absența unui pol clar sunt argumente împotriva fragmentării excesive și în favoarea consolidării în jurul reședințelor metropolitane.');
    D.callout && D.callout('Legătură cu recomandarea', 'Distribuția polilor confirmă recomandarea pentru scenariul S2: regiunile actuale sunt deja organizate în jurul unor poli metropolitani funcționali (Iași, Cluj, Timișoara, Constanța, Craiova, Brașov), iar redesenarea (S3/S4) ar rupe arii de polarizare deja consolidate. Prioritatea nu este re-trasarea graniței, ci întărirea polului și a competențelor regionale.');
  }

  G._RegioMunicipal = { SEAT: SEAT, CPOP: CPOP, REG: REG, JUD: JUD, mandates: _mandates, spheres: _spheres, renderSection: renderSection };
  window._RegioMunicipal = G._RegioMunicipal;
  console.log('[RegioMunicipal] ✅ date concrete per județ (reședințe + mandate + sfere de influență) · window._RegioMunicipal');
})(window);
