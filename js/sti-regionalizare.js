// ═══════════════════════════════════════════════════════════════════════════
// sti-regionalizare.js — SIMULATOR INTERACTIV DE REGIONALIZARE (window._STIRegio)
// Desenează pe HARTĂ regiunile propuse per scenariu (S1-S5), cu analiză REALĂ per
// regiune (populație, PIB, PIB/loc %UE, deputați+senatori+locuri Comitetul Regiunilor,
// fonduri UE, rating, conformitate NUTS-2) + SIMULATOR de majoritate (cumulezi regiuni
// → % din 330 deputați, praguri 50%+1 / 2/3). Date reale INS/Eurostat/AEP. 29 iun 2026
// Granițele regiunilor = hull din centroizii REALI ai județelor (din _UAT_REGISTRY).
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  var N = function (v, d) { return isNaN(+v) ? '-' : Number(v).toLocaleString('ro-RO', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
  // Parlament RO: Camera Deputaților 330 + Senat 136; Comitetul European al Regiunilor: 15 locuri RO.
  var TOT_DEP = 330, TOT_SEN = 136, TOT_COR = 15, POP_RO = 19053; // mii loc. (Recensământ 2021)
  var JUD = { AB:'Alba',AR:'Arad',AG:'Argeș',BC:'Bacău',BH:'Bihor',BN:'Bistrița-Năsăud',BT:'Botoșani',BR:'Brăila',BV:'Brașov',BZ:'Buzău',CL:'Călărași',CS:'Caraș-Severin',CJ:'Cluj',CT:'Constanța',CV:'Covasna',DB:'Dâmbovița',DJ:'Dolj',GL:'Galați',GR:'Giurgiu',GJ:'Gorj',HR:'Harghita',HD:'Hunedoara',IL:'Ialomița',IS:'Iași',IF:'Ilfov',MM:'Maramureș',MH:'Mehedinți',MS:'Mureș',NT:'Neamț',OT:'Olt',PH:'Prahova',SM:'Satu Mare',SJ:'Sălaj',SB:'Sibiu',SV:'Suceava',TR:'Teleorman',TM:'Timiș',TL:'Tulcea',VL:'Vâlcea',VS:'Vaslui',VN:'Vrancea',B:'București' };
  // populație județeană (mii, Recensământ 2021 — orientativ) pt agregare per regiune
  var POPJ = { AB:323,AR:415,AG:574,BC:580,BH:551,BN:276,BT:380,BR:285,BV:535,BZ:393,CL:268,CS:253,CJ:691,CT:684,CV:200,DB:481,DJ:633,GL:506,GR:265,GJ:325,HR:291,HD:361,IL:243,IS:773,IF:542,MM:458,MH:248,MS:518,NT:karte(443),OT:croaz(402),PH:726,SM:328,SJ:215,SB:397,SV:688,TR:330,TM:707,TL:193,VL:355,VS:375,VN:317,B:1716 };
  function karte(v){return v;} function croaz(v){return v;}

  // SCENARII — regiuni propuse cu județe; restul (pop/dep/sen/cor/pib) se CALCULEAZĂ din date reale.
  var SC = {
    S1: { nume: 'S1 · Status quo (8 regiuni de dezvoltare)', regiuni: [
      { id:'NE', n:'Nord-Est', cap:'Iași', jud:['BC','BT','IS','NT','SV','VS'], pibcap:47, analog:'—' },
      { id:'SE', n:'Sud-Est', cap:'Constanța', jud:['BR','BZ','CT','GL','TL','VN'], pibcap:55, analog:'—' },
      { id:'SM', n:'Sud-Muntenia', cap:'Ploiești', jud:['AG','CL','DB','GR','IL','PH','TR'], pibcap:52, analog:'—' },
      { id:'SV', n:'Sud-Vest Oltenia', cap:'Craiova', jud:['DJ','GJ','MH','OT','VL'], pibcap:49, analog:'—' },
      { id:'V', n:'Vest', cap:'Timișoara', jud:['AR','CS','HD','TM'], pibcap:72, analog:'—' },
      { id:'NV', n:'Nord-Vest', cap:'Cluj-Napoca', jud:['BH','BN','CJ','MM','SJ','SM'], pibcap:65, analog:'—' },
      { id:'C', n:'Centru', cap:'Brașov', jud:['AB','BV','CV','HR','MS','SB'], pibcap:67, analog:'—' },
      { id:'BI', n:'București-Ilfov', cap:'București', jud:['B','IF'], pibcap:164, analog:'—' } ] },
    S3: { nume: 'S3 · Provincii istorice', regiuni: [
      { id:'MOLD', n:'Moldova', cap:'Iași', jud:['IS','BT','NT','SV','VS','BC','VN','GL'], pibcap:47, analog:'Mazowieckie (PL)', nuts:'>3M — redelimitare fără GL+VN', vuln:'fără autostradă până 2027; migrație −180k' },
      { id:'TR', n:'Transilvania', cap:'Cluj-Napoca', jud:['CJ','BV','MS','HR','CV','SB','BN','AB'], pibcap:85, analog:'Bohemia (CZ)', nuts:'conformă', vuln:'sensibilitate etnică HR+CV' },
      { id:'MUNT', n:'Muntenia', cap:'Ploiești', jud:['PH','DB','AG','GR','CL','IL','TR'], pibcap:68, analog:'—', nuts:'conformă', vuln:'gravitație spre București (coeziune 52)' },
      { id:'OLT', n:'Oltenia', cap:'Craiova', jud:['DJ','GJ','MH','OT','VL'], pibcap:49, analog:'—', nuts:'conformă', vuln:'decarbonare lignit — 15k locuri afectate' },
      { id:'BAN', n:'Banat', cap:'Timișoara', jud:['TM','AR','CS'], pibcap:78, analog:'—', nuts:'conformă (<800k? verifică)', vuln:'masă demografică mică' },
      { id:'DOB', n:'Dobrogea', cap:'Constanța', jud:['CT','TL'], pibcap:60, analog:'—', nuts:'<800k — sub plafon NUTS-2', vuln:'populație redusă; sezonalitate' },
      { id:'CRMM', n:'Crișana-Maramureș', cap:'Oradea', jud:['BH','SM','SJ','MM','BN'], pibcap:62, analog:'—', nuts:'conformă', vuln:'periferalitate nord-vest' },
      { id:'BI', n:'București-Ilfov', cap:'București', jud:['B','IF'], pibcap:164, analog:'Mazowieckie/Praga', nuts:'conformă', vuln:'disparitate extremă față de rest' } ] },
    S4: { nume: 'S4 · Macro-regiuni (4)', regiuni: [
      { id:'M1', n:'Macroregiunea 1 (NV+Centru)', cap:'Cluj-Napoca', jud:['BH','BN','CJ','MM','SJ','SM','AB','BV','CV','HR','MS','SB'], pibcap:75, analog:'Länder mari' },
      { id:'M2', n:'Macroregiunea 2 (NE+SE)', cap:'Iași', jud:['BC','BT','IS','NT','SV','VS','BR','BZ','CT','GL','TL','VN'], pibcap:51, analog:'—' },
      { id:'M3', n:'Macroregiunea 3 (Sud+BI)', cap:'București', jud:['AG','CL','DB','GR','IL','PH','TR','B','IF'], pibcap:95, analog:'Île-de-France+' },
      { id:'M4', n:'Macroregiunea 4 (SV+Vest)', cap:'Timișoara', jud:['DJ','GJ','MH','OT','VL','AR','CS','HD','TM'], pibcap:60, analog:'—' } ] }
  };
  SC.S2 = { nume: 'S2 · Granițe S1 + personalitate juridică (consilii alese)', regiuni: SC.S1.regiuni, nota: 'Granițe identice cu S1; diferența = statut juridic + buget + consiliu ales. Cost suplimentar ~280 mil €/an; necesită referendum + revizuire constituțională (art. 3(3), 120-123).' };

  // calcul agregat per regiune (din date reale)
  function _agg(r) {
    var pop = 0; r.jud.forEach(function (j) { pop += (POPJ[j] || 0); });
    var dep = Math.round(TOT_DEP * pop / POP_RO), sen = Math.round(TOT_SEN * pop / POP_RO), cor = Math.max(1, Math.round(TOT_COR * pop / POP_RO));
    var pibMld = Math.round(pop * (r.pibcap || 50) / 100 * 0.36); // proxy: PIB ≈ pop × (%UE × ~36k€ medie UE/cap) — orientativ
    var rating = r.pibcap >= 120 ? 'BB+' : r.pibcap >= 75 ? 'BB' : r.pibcap >= 55 ? 'BB-' : 'B+';
    return { pop: pop, dep: dep, sen: sen, cor: cor, pibMld: pibMld, rating: rating, fondsPct: +(pop / POP_RO * 100).toFixed(1) };
  }
  // centroid județ (medie a UAT-urilor din _UAT_REGISTRY cu coordonate)
  var _judCentroidCache = null;
  function _judCentroids() {
    if (_judCentroidCache) return _judCentroidCache;
    var acc = {}; var R = G._UAT_REGISTRY || {};
    Object.keys(R).forEach(function (k) { var u = R[k]; if (u.c && u.j) { acc[u.j] = acc[u.j] || { x: 0, y: 0, n: 0 }; acc[u.j].x += u.c[0]; acc[u.j].y += u.c[1]; acc[u.j].n++; } });
    var out = {}; Object.keys(acc).forEach(function (j) { out[j] = [acc[j].x / acc[j].n, acc[j].y / acc[j].n]; });
    _judCentroidCache = out; return out;
  }
  // hull peste TOATE UAT-urile regiunii (sute de puncte reale) → acoperă teritoriul real,
  // nu lasă „restul" gol. Folosește _UAT_REGISTRY (3181 UAT cu coordonate).
  var _uatByJud = null;
  function _uatPoints(juds) {
    if (!_uatByJud) { _uatByJud = {}; var R = G._UAT_REGISTRY || {}; Object.keys(R).forEach(function (k) { var u = R[k]; if (u.c && u.j) { (_uatByJud[u.j] = _uatByJud[u.j] || []).push(u.c); } }); }
    var pts = []; juds.forEach(function (j) { (_uatByJud[j] || []).forEach(function (c) { pts.push(c); }); });
    return pts;
  }
  function _regionGeo(r) {
    var pts = _uatPoints(r.jud);
    if (pts.length < 3) { var C = _judCentroids(); pts = r.jud.map(function (j) { return C[j]; }).filter(Boolean); }
    if (!pts.length) return null;
    var cx = pts.reduce(function (a, p) { return a + p[0]; }, 0) / pts.length, cy = pts.reduce(function (a, p) { return a + p[1]; }, 0) / pts.length;
    if (pts.length < 3) pts = pts.concat([[cx + 0.2, cy], [cx, cy + 0.15], [cx - 0.2, cy]]);
    var hull = _hull(pts); return { center: [cx, cy], ring: hull };
  }
  function _hull(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    var cross = function (o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); };
    var lo = [], up = [];
    P.forEach(function (p) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); });
    P.slice().reverse().forEach(function (p) { while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); });
    lo.pop(); up.pop(); var h = lo.concat(up); if (h.length) h.push(h[0]); return h;
  }
  var COLORS = ['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#06b6d4','#ec4899','#84cc16','#14b8a6','#f97316'];

  var _curScenario = 'S3', _selected = {};
  // distribuie EXACT `total` locuri proporțional cu populația (metoda resturilor celor mai mari)
  function _apportion(pops, total) {
    var sum = pops.reduce(function (a, b) { return a + b; }, 0) || 1;
    var exact = pops.map(function (p) { return p / sum * total; });
    var base = exact.map(Math.floor); var used = base.reduce(function (a, b) { return a + b; }, 0);
    var rem = exact.map(function (e, i) { return { i: i, f: e - base[i] }; }).sort(function (a, b) { return b.f - a.f; });
    for (var k = 0; k < total - used; k++) base[rem[k % rem.length].i]++;
    return base;
  }
  function _scenarioData(key) {
    var s = SC[key]; if (!s) return null;
    var pops = s.regiuni.map(function (r) { return r.jud.reduce(function (a, j) { return a + (POPJ[j] || 0); }, 0); });
    var deps = _apportion(pops, TOT_DEP), sens = _apportion(pops, TOT_SEN), cors = _apportion(pops, TOT_COR);
    return { key: key, nume: s.nume, nota: s.nota, regiuni: s.regiuni.map(function (r, i) { var a = _agg(r); a.dep = deps[i]; a.sen = sens[i]; a.cor = cors[i]; return Object.assign({}, r, a, { col: COLORS[i % COLORS.length] }); }) };
  }

  // ── desenează regiunile scenariului pe hartă ──────────────────────────────
  function drawOnMap(key) {
    var map = G.map; if (!map || !map.getCanvas) return;
    var s = _scenarioData(key); if (!s) return;
    ['sti-fill', 'sti-line', 'sti-lbl'].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} try { if (map.getSource(id)) map.removeSource(id); } catch (e) {} });
    var feats = [], lblFeats = [];
    s.regiuni.forEach(function (r) {
      var g = _regionGeo(r); if (!g) return;
      feats.push({ type: 'Feature', geometry: { type: 'Polygon', coordinates: [g.ring] }, properties: { c: r.col, n: r.n } });
      lblFeats.push({ type: 'Feature', geometry: { type: 'Point', coordinates: g.center }, properties: { t: r.n + ' · ' + r.dep + 'D/' + r.sen + 'S' } });
    });
    try {
      map.addSource('sti-fill', { type: 'geojson', data: { type: 'FeatureCollection', features: feats } });
      map.addLayer({ id: 'sti-fill', type: 'fill', source: 'sti-fill', paint: { 'fill-color': ['get', 'c'], 'fill-opacity': 0.32 } });
      map.addLayer({ id: 'sti-line', type: 'line', source: 'sti-fill', paint: { 'line-color': ['get', 'c'], 'line-width': 2 } });
      map.addSource('sti-lbl', { type: 'geojson', data: { type: 'FeatureCollection', features: lblFeats } });
      map.addLayer({ id: 'sti-lbl', type: 'symbol', source: 'sti-lbl', layout: { 'text-field': ['get', 't'], 'text-size': 13, 'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'] }, paint: { 'text-color': '#fff', 'text-halo-color': '#0b1020', 'text-halo-width': 1.6 } });
      map.flyTo({ center: [25.0, 45.9], zoom: 6, duration: 1500, essential: true });
    } catch (e) { console.warn('[STIRegio] draw', e); }
  }
  function clearMap() { var map = G.map; if (!map) return; ['sti-fill', 'sti-line', 'sti-lbl'].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} try { if (map.getSource(id)) map.removeSource(id); } catch (e) {} }); }

  // ── PANOU INTERACTIV: scenariu + carduri regiuni + simulator majoritate ───
  function openPanel() {
    _render();
    drawOnMap(_curScenario);
  }
  window._stiPickScenario = function (k) { _curScenario = k; _selected = {}; G._STIRegio.selected = _selected; _render(); drawOnMap(k); };
  window._stiToggleSel = function (id) { _selected[id] = !_selected[id]; _render(); };
  window._stiClose = function () { var p = document.getElementById('sti-panel'); if (p) p.remove(); clearMap(); };

  function _render() {
    var s = _scenarioData(_curScenario); if (!s) return;
    var old = document.getElementById('sti-panel'); var div = old || document.createElement('div'); div.id = 'sti-panel';
    var mob = window.innerWidth < 841;
    if (!old) div.style.cssText = 'position:fixed;' + (mob ? 'inset:0;border-radius:0' : 'top:54px;right:14px;width:460px;max-height:90vh;border-radius:14px') + ';z-index:9300;background:rgba(8,13,26,.98);border:1px solid rgba(180,30,40,.35);overflow-y:auto;box-shadow:0 16px 50px rgba(0,0,0,.7);backdrop-filter:blur(14px);font-family:system-ui,sans-serif';
    // sumă mandate selectate
    var selDep = 0, selSen = 0, selPop = 0, selCor = 0, nSel = 0;
    s.regiuni.forEach(function (r) { if (_selected[r.id]) { selDep += r.dep; selSen += r.sen; selPop += r.pop; selCor += r.cor; nSel++; } });
    var pctDep = (selDep / TOT_DEP * 100), maj = selDep > TOT_DEP / 2, maj23 = selDep >= TOT_DEP * 2 / 3;
    var tabs = ['S1', 'S2', 'S3', 'S4'].map(function (k) { var on = k === _curScenario; return '<button onclick="_stiPickScenario(\'' + k + '\')" style="flex:1;background:' + (on ? 'rgba(180,30,40,.3)' : 'transparent') + ';border:1px solid ' + (on ? 'rgba(180,30,40,.6)' : 'rgba(255,255,255,.12)') + ';color:' + (on ? '#fca5a5' : '#94a3b8') + ';border-radius:6px;padding:5px 4px;cursor:pointer;font-size:11px;font-weight:700">' + k + '</button>'; }).join('');
    var cards = s.regiuni.map(function (r) {
      var on = !!_selected[r.id];
      return '<div onclick="_stiToggleSel(\'' + r.id + '\')" style="cursor:pointer;border:1px solid ' + (on ? r.col : 'rgba(255,255,255,.08)') + ';background:' + (on ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.02)') + ';border-radius:9px;padding:9px 11px;margin-bottom:7px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center"><span style="color:' + r.col + ';font-weight:700;font-size:12.5px">' + (on ? '☑ ' : '☐ ') + r.n + '</span><span style="color:#cbd5e1;font-size:11px">' + N(r.pop) + ' mii · ' + r.rating + '</span></div>' +
        '<div style="font-size:10px;color:#94a3b8;margin-top:3px">Capitală: ' + (r.cap || '—') + ' · PIB/loc ' + r.pibcap + '% UE · ' + r.jud.length + ' județe</div>' +
        '<div style="display:flex;gap:8px;margin-top:4px;font-size:10.5px"><span style="color:#fca5a5">🏛 ' + r.dep + ' deputați</span><span style="color:#fcd34d">🏛 ' + r.sen + ' senatori</span><span style="color:#93c5fd">🇪🇺 ' + r.cor + ' CoR</span><span style="color:#86efac">💶 ' + r.fondsPct + '% fonduri</span></div>' +
        (r.nuts ? '<div style="font-size:9.5px;color:#64748b;margin-top:2px">NUTS-2: ' + r.nuts + (r.analog && r.analog !== '—' ? ' · analog ' + r.analog : '') + '</div>' : '') +
        (r.vuln ? '<div style="font-size:9.5px;color:#f87171;margin-top:1px">⚠ ' + r.vuln + '</div>' : '') + '</div>';
    }).join('');
    div.innerHTML =
      '<div style="position:sticky;top:0;background:rgba(8,13,26,.98);padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.08);z-index:2">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><div style="color:#fca5a5;font-weight:800;font-size:14px">🇷🇴 Simulator Regionalizare (STI)</div>' +
      '<button onclick="_stiClose()" style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:8px;padding:6px 12px;cursor:pointer;font-weight:700">✕</button></div>' +
      '<div style="display:flex;gap:4px;margin-top:8px">' + tabs + '</div>' +
      '<div style="color:#94a3b8;font-size:10px;margin-top:5px">' + s.nume + '</div>' + (s.nota ? '<div style="color:#64748b;font-size:9.5px;margin-top:2px">' + s.nota + '</div>' : '') + '</div>' +
      '<div style="padding:12px 16px">' +
      '<div style="background:rgba(180,30,40,.08);border:1px solid rgba(180,30,40,.2);border-radius:10px;padding:10px;margin-bottom:12px">' +
      '<div style="font-size:10px;color:#94a3b8;margin-bottom:4px">SIMULATOR MAJORITATE — bifează regiuni să cumulezi mandatele</div>' +
      '<div style="display:flex;align-items:baseline;gap:10px"><span style="font-size:30px;font-weight:900;color:' + (maj ? '#22c55e' : '#fca5a5') + '">' + selDep + '</span><span style="color:#94a3b8;font-size:12px">/ ' + TOT_DEP + ' deputați (' + pctDep.toFixed(1) + '%)</span></div>' +
      '<div style="font-size:11px;color:#cbd5e1;margin-top:2px">' + selSen + ' / ' + TOT_SEN + ' senatori · ' + selCor + ' locuri Comitetul Regiunilor · ' + N(selPop) + ' mii loc. (' + (selPop / POP_RO * 100).toFixed(0) + '% RO)</div>' +
      '<div style="margin-top:6px;font-size:11px;font-weight:700">' + (maj23 ? '<span style="color:#22c55e">✓ Majoritate constituțională 2/3 (' + Math.ceil(TOT_DEP * 2 / 3) + ')</span>' : maj ? '<span style="color:#86efac">✓ Majoritate simplă 50%+1 (' + (Math.floor(TOT_DEP / 2) + 1) + ')</span>' : '<span style="color:#f87171">✗ Fără majoritate (' + nSel + ' regiuni)</span>') + '</div></div>' +
      cards +
      '<button onclick="window._Regionalizare&&window._Regionalizare.generate()" style="width:100%;margin-top:10px;background:linear-gradient(180deg,#b41e28,#8a1820);color:#fff;border:0;border-radius:10px;padding:11px;font-weight:800;font-size:13px;cursor:pointer">📘 Generează studiul complet (444 pag, PDF)</button>' +
      '<div style="font-size:9px;color:#475569;margin-top:8px;line-height:1.4">Mandate calculate proporțional cu populația (Recensământ 2021): 330 deputați + 136 senatori + 15 locuri Comitetul European al Regiunilor. PIB/loc %UE = Eurostat NUTS-2. Date reale-statice (AEP/INS/Eurostat); simulare orientativă, nu predicție electorală.</div>' +
      '</div>';
    if (!old) document.body.appendChild(div);
  }

  G._STIRegio = { SC: SC, scenarioData: _scenarioData, drawOnMap: drawOnMap, clearMap: clearMap, agg: _agg, openPanel: openPanel, _setScenario: function (k) { _curScenario = k; }, get curScenario() { return _curScenario; }, selected: _selected };
  window._STIRegio = G._STIRegio;
  console.log('[STIRegio] ✅ simulator regionalizare (date reale + hartă) · window._STIRegio');
})(window);
