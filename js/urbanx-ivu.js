// ═══════════════════════════════════════════════════════════════════════════
// urbanx-ivu.js — IVU · Indicele de Vitalitate Urbană (City Intelligence)
// Brand: "IVU powered by UrbanX". Construit PE motorul existent G._UrbanRank
// (6 dimensiuni ponderate, formulă, grade A+..D, benchmark european pe tier).
// Adaugă: Score Card explicabil (de ce nota X / cum poate crește) + Catalog
// comparator între orașe (tabel + best-per-dimensiune + verdict) + export.
// window.UrbanXIVU.open()  ·  26 iunie 2026 · ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';

  function N(v) { try { return Math.round(v).toLocaleString('ro-RO'); } catch (e) { return '' + v; } }
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  function gradeColor(s) { return s >= 80 ? '#22c55e' : s >= 65 ? '#84cc16' : s >= 50 ? '#f59e0b' : '#ef4444'; }
  var TIER_RO = { metropola: 'Metropolă', mare: 'Oraș mare', mediu: 'Oraș mediu', mic: 'Oraș mic' };

  // IVU este NAȚIONAL — orice UAT cu date în platformă (municipii _RO_CITIES_DB
  // + orașe/comune _EXTRA_UATS). Sursă unică, dedusă (DB are prioritate).
  function _allUats() {
    var out = {};
    // comune/orașe mici din TCI._EXTRA_UATS (sau window._EXTRA_UATS)
    var extra = (G.TCI && G.TCI._EXTRA_UATS) || G._EXTRA_UATS || {};
    Object.keys(extra).forEach(function (k) { out[k] = extra[k]; });
    // municipii/orașe din _RO_CITIES_DB (suprascrie — date mai bogate)
    var db = G._RO_CITIES_DB || {};
    Object.keys(db).forEach(function (k) { out[k] = db[k]; });
    return out;
  }
  // Construiește un city object ONEST din registrul SIRUTA (3181 UAT) când UAT-ul
  // nu are date bogate — estimare din ATRIBUTELE PROPRII (pop/regiune/centroid),
  // NU fallback la Iași (ar fabrica date — vezi regula contaminare comune).
  var _HUB = { NV: 1.08, NE: 0.78, SE: 0.82, SB: 0.88, SV: 0.85, V: 1.10, C: 1.00, BI: 1.25, B: 1.25, S: 0.80 };
  var _PIBR = { NE: 8200, NV: 14500, V: 17200, C: 16800, SE: 10400, S: 9800, SV: 8900, B: 28400, BI: 28400, SB: 9800 };
  var _JUDNAME = { AB:'Alba', AR:'Arad', AG:'Argeș', BC:'Bacău', BH:'Bihor', BN:'Bistrița-Năsăud', BT:'Botoșani', BR:'Brăila', BV:'Brașov', BZ:'Buzău', CL:'Călărași', CS:'Caraș-Severin', CJ:'Cluj', CT:'Constanța', CV:'Covasna', DB:'Dâmbovița', DJ:'Dolj', GL:'Galați', GR:'Giurgiu', GJ:'Gorj', HR:'Harghita', HD:'Hunedoara', IL:'Ialomița', IS:'Iași', IF:'Ilfov', MM:'Maramureș', MH:'Mehedinți', MS:'Mureș', NT:'Neamț', OT:'Olt', PH:'Prahova', SM:'Satu Mare', SJ:'Sălaj', SB:'Sibiu', SV:'Suceava', TR:'Teleorman', TM:'Timiș', TL:'Tulcea', VL:'Vâlcea', VS:'Vaslui', VN:'Vrancea', B:'București' };
  function _titleRO(s) { return ('' + (s || '')).toLowerCase().replace(/(^|[\s\-])([a-zăâîșț])/g, function (m, p1, p2) { return p1 + p2.toUpperCase(); }); }
  function _cityFromRegistry(cityKey) {
    var R = (G._UAT_REGISTRY && G._UAT_REGISTRY[cityKey]); if (!R) return null;
    var tip = { m: 'municipiu', o: 'oras', c: 'comuna', C: 'capitala' }[R.t] || 'comuna';
    var pop = R.p || (R.t === 'c' ? 2500 : R.t === 'o' ? 9000 : R.t === 'm' ? 40000 : 1500);
    return {
      key: cityKey, name: _titleRO(R.n), siruta: R.s, judet: _JUDNAME[R.j] || R.j, judet_code: R.j, tip: tip,
      lat: R.c ? R.c[1] : null, lon: R.c ? R.c[0] : null,
      regiune: R.r, pop2021: pop, pop2011: Math.round(pop / 0.985),
      rata_reala_2011_2021: 1.0, coef_hub: _HUB[R.r] || 0.85,
      pib_eur_cap: _PIBR[R.r] || 10000, _estimat: true
    };
  }
  // SIRUTA difera intre registru si datele bogate (nestandardizat) → reconciliem dupa NUME.
  function _normNm(s) { return String(s || '').toLowerCase().replace(/[șş]/g, 's').replace(/[țţ]/g, 't').replace(/[ăâ]/g, 'a').replace(/î/g, 'i').replace(/^(municipiul|orasul|oras|comuna|sat)\s+/, '').trim(); }
  var _richNameIdx = null;
  function _richByName(name) {
    if (!_richNameIdx) {
      _richNameIdx = {}; var all = _allUats();
      Object.keys(all).forEach(function (k) { var nm = _normNm(all[k].name || ''); if (nm && !_richNameIdx[nm]) { if (!all[k].key) all[k].key = k; _richNameIdx[nm] = all[k]; } });
    }
    return _richNameIdx[_normNm(name)] || null;
  }
  function _resolveCityData(cityKey) {
    var all = _allUats();
    if (all[cityKey]) return all[cityKey];
    var R = (G._UAT_REGISTRY && G._UAT_REGISTRY[cityKey]);
    if (R) {
      // daca avem DATE BOGATE cu acelasi nume (Cluj/Iasi/comune cu RLU) → foloseste-le, nu estima
      var rich = _richByName(R.n); if (rich) return rich;
      // altfel ONEST: construieste din registrul SIRUTA propriu (NU fallback Iasi)
      var reg = _cityFromRegistry(cityKey); if (reg) return reg;
    }
    // fallback final: motorul masterplan (poate cădea pe Iași — ultim resort)
    try { if (G._TCIMasterplanPDF && G._TCIMasterplanPDF._resolveCity) return G._TCIMasterplanPDF._resolveCity(cityKey); } catch (e) {}
    return null;
  }

  // ── calcul IVU pentru un cityKey (sincron) ───────────────────────────────
  function scoreFor(cityKey) {
    var city = _resolveCityData(cityKey); if (!city) return null;
    if (!city.key) city.key = cityKey;
    var pred = {};
    try { if (G._PredEngine && G._PredEngine.calc) pred = G._PredEngine.calc(city) || {}; } catch (e) {}
    var R = (G._UrbanRank && G._UrbanRank.compute) ? G._UrbanRank.compute(pred, city) : null;
    if (!R) return null;
    return { key: cityKey, name: city.name || cityKey, city: city, R: R };
  }

  // catalog NAȚIONAL — TOATE UAT-urile (municipii+orașe+comune din datele bogate
  // UNITE cu întregul registru SIRUTA de 3181 UAT). Memoizat (calcul o singură
  // dată — scoreFor × 3181 e costisitor). UAT-urile fără date bogate sunt
  // scorate ONEST din atributele proprii (marcate _estimat).
  var _catCache = null;
  function catalog() {
    if (_catCache) return _catCache;
    var keys = {};
    Object.keys(_allUats()).forEach(function (k) { keys[k] = 1; });
    if (G._UAT_REGISTRY) Object.keys(G._UAT_REGISTRY).forEach(function (k) { keys[k] = 1; });
    var scored = Object.keys(keys).map(scoreFor).filter(Boolean);
    // dedup pe nume+judet: acelasi UAT poate exista sub 2 chei (EXTRA vs registru)
    // → pastram intrarea cu DATE BOGATE (non-estimat) fata de cea estimata.
    var byName = {};
    scored.forEach(function (s) {
      var nm = (s.name || '') + '|' + (s.city && (s.city.judet_code || s.city.judet) || '');
      var prev = byName[nm];
      if (!prev || (prev.city && prev.city._estimat && !(s.city && s.city._estimat))) byName[nm] = s;
    });
    _catCache = Object.keys(byName).map(function (k) { return byName[k]; })
      .sort(function (a, b) { return b.R.score - a.R.score; });
    return _catCache;
  }
  function _catInvalidate() { _catCache = null; }

  // rang național + percentilă în catalog
  function rankOf(cityKey) {
    var cat = catalog();
    var pos = cat.findIndex(function (x) { return x.key === cityKey; });
    if (pos < 0) return null;
    return { pos: pos + 1, total: cat.length, percentile: Math.round((1 - pos / Math.max(1, cat.length)) * 100), cat: cat };
  }

  // ── explicație deterministă (XAI v1, fără apel AI — transparent & verificabil) ──
  function explain(s) {
    var dims = s.R.dims.slice().sort(function (a, b) { return b.score - a.score; });
    var top = dims.slice(0, 2), low = dims.slice(-2).reverse();
    var txt = s.name + ' obține nota UrbanX de <b>' + s.R.score + '/100</b> (calificativ <b>' + s.R.grade + '</b>, categorie de mărime: ' + s.R.tierLabel + '). ';
    txt += 'Scorul este susținut în principal de <b>' + top[0].label + '</b> (' + top[0].score + '/100) și <b>' + top[1].label + '</b> (' + top[1].score + '/100), ';
    txt += 'și este limitat de <b>' + low[0].label + '</b> (' + low[0].score + '/100) și <b>' + low[1].label + '</b> (' + low[1].score + '/100). ';
    txt += 'Fiecare sub-scor provine din date reale și are formulă explicită — nota poate fi recalculată și verificată oricând.';
    // cum poate crește: dimensiunile slabe, cu gap până la 80
    var improve = dims.filter(function (d) { return d.score < 75; }).sort(function (a, b) { return a.score - b.score; }).slice(0, 3)
      .map(function (d) {
        var gap = 80 - d.score; var pts = (gap * d.w).toFixed(1);
        return { label: d.label, gap: gap, pts: pts, w: d.w, formula: d.formula };
      });
    return { txt: txt, improve: improve, top: top, low: low };
  }

  // ── Score Card pentru orașul activ ───────────────────────────────────────
  function scoreCardHTML(s) {
    var R = s.R, rk = rankOf(s.key);
    var col = gradeColor(R.score);
    var circ = 2 * Math.PI * 52, off = circ * (1 - R.score / 100);
    var x = explain(s);
    var dimBars = R.dims.map(function (d) {
      var c = gradeColor(d.score);
      return '<div style="margin:7px 0"><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px">' +
        '<span style="color:#cbd5e1">' + d.label + ' <span style="color:#64748b">(' + Math.round(d.w * 100) + '%)</span></span>' +
        '<span style="color:' + c + ';font-weight:700">' + d.score + '</span></div>' +
        '<div style="height:7px;background:#0a1120;border-radius:4px;overflow:hidden"><div style="height:100%;width:' + d.score + '%;background:' + c + '"></div></div>' +
        '<div style="font-size:9px;color:#64748b;margin-top:2px">' + d.formula + ' · sursă: ' + d.src + '</div></div>';
    }).join('');
    var peers = R.peersWithCity.map(function (p) {
      return '<div style="display:flex;justify-content:space-between;font-size:11px;padding:2px 0;color:' + (p.self ? '#fbbf24' : '#94a3b8') + (p.self ? ';font-weight:700' : '') + '"><span>' + (p.self ? '★ ' : '') + p.n + '</span><span>' + p.s + '</span></div>';
    }).join('');
    return '<div style="display:grid;grid-template-columns:200px 1fr;gap:18px;align-items:start">' +
      // cerc scor
      '<div style="text-align:center">' +
      '<svg width="130" height="130" viewBox="0 0 120 120" style="transform:rotate(-90deg)">' +
      '<circle cx="60" cy="60" r="52" fill="none" stroke="#1e293b" stroke-width="10"/>' +
      '<circle cx="60" cy="60" r="52" fill="none" stroke="' + col + '" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"/></svg>' +
      '<div style="margin-top:-92px;margin-bottom:50px"><div style="font-size:32px;font-weight:800;color:' + col + '">' + R.score + '</div><div style="font-size:11px;color:#64748b">/100</div><div style="font-size:20px;font-weight:800;color:' + col + ';margin-top:2px">' + R.grade + '</div></div>' +
      (rk ? '<div style="font-size:11px;color:#94a3b8;margin-top:8px">Catalog național:<br><b style="color:#e2e8f0">#' + rk.pos + ' / ' + rk.total + '</b> · Top ' + (100 - rk.percentile) + '%</div>' : '') +
      '<div style="font-size:10px;color:#64748b;margin-top:6px">' + R.tierLabel + '</div>' +
      '</div>' +
      // dimensiuni + explicatie
      '<div>' +
      '<div style="font-size:11px;color:#6ee7b7;text-transform:uppercase;letter-spacing:.05em;font-weight:700;margin-bottom:6px">Descompunere pe dimensiuni</div>' +
      dimBars +
      '<div style="margin-top:12px;background:rgba(110,231,183,.06);border:1px solid rgba(110,231,183,.2);border-radius:8px;padding:10px">' +
      '<div style="font-size:11px;color:#6ee7b7;font-weight:700;margin-bottom:4px">🧠 De ce această notă</div>' +
      '<div style="font-size:11.5px;color:#cbd5e1;line-height:1.5">' + x.txt + '</div></div>' +
      (x.improve.length ? '<div style="margin-top:8px;background:rgba(59,130,246,.06);border:1px solid rgba(59,130,246,.2);border-radius:8px;padding:10px">' +
        '<div style="font-size:11px;color:#93c5fd;font-weight:700;margin-bottom:4px">📈 Cum poate crește nota</div>' +
        x.improve.map(function (im) { return '<div style="font-size:11px;color:#cbd5e1;padding:2px 0">+' + im.pts + ' pct → ridicarea „' + im.label + '" la 80/100 (' + im.formula + ')</div>'; }).join('') +
        '</div>' : '') +
      '<div style="margin-top:10px"><div style="font-size:11px;color:#94a3b8;font-weight:700;margin-bottom:3px">Benchmark european (aceeași categorie de mărime)</div>' + peers + '</div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:8px">' + R.formula + '</div>' +
      '</div></div>';
  }

  // ── Comparator catalog ───────────────────────────────────────────────────
  var _sel = [];
  function comparatorHTML() {
    var rows = _sel.map(scoreFor).filter(Boolean);
    var table = '';
    if (rows.length) {
      var dimLabels = rows[0].R.dims.map(function (d) { return d.label; });
      var head = '<tr><th style="text-align:left;padding:5px;color:#94a3b8;font-size:11px">Indicator</th>' +
        rows.map(function (r) { return '<th style="padding:5px;color:#e2e8f0;font-size:11px">' + r.name + (r.city && r.city._estimat ? ' <span title="Scor estimat din populatie/regiune — UAT fara date detaliate" style="color:#fbbf24;font-size:9px">~est</span>' : '') + ' <span onclick="window.UrbanXIVU.rm(\'' + r.key + '\')" style="cursor:pointer;color:#ef4444">✕</span></th>'; }).join('') + '</tr>';
      var scoreRow = '<tr style="border-top:2px solid rgba(255,255,255,.12)"><td style="padding:5px;font-weight:700;color:#6ee7b7">Nota UrbanX (iVU)</td>' +
        rows.map(function (r) { return '<td style="padding:5px;text-align:center;font-weight:800;color:' + gradeColor(r.R.score) + '">' + r.R.score + ' <span style="font-size:10px">' + r.R.grade + '</span></td>'; }).join('') + '</tr>';
      var dimRows = dimLabels.map(function (lbl, i) {
        var vals = rows.map(function (r) { return r.R.dims[i].score; });
        var best = Math.max.apply(null, vals);
        return '<tr style="border-top:1px solid rgba(255,255,255,.06)"><td style="padding:5px;color:#cbd5e1;font-size:11px">' + lbl + '</td>' +
          rows.map(function (r) { var v = r.R.dims[i].score; return '<td style="padding:5px;text-align:center;font-size:12px;color:' + (v === best ? '#22c55e' : '#cbd5e1') + (v === best ? ';font-weight:800' : '') + '">' + v + (v === best ? ' ★' : '') + '</td>'; }).join('') + '</tr>';
      }).join('');
      // verdict: pt ce e cel mai bun fiecare oras (top 2 dimensiuni)
      var verdict = rows.map(function (r) {
        var t = r.R.dims.slice().sort(function (a, b) { return b.score - a.score; }).slice(0, 2).map(function (d) { return d.label; });
        return '<div style="font-size:11px;color:#cbd5e1;padding:2px 0"><b style="color:#fbbf24">' + r.name + '</b> → cel mai bun la: ' + t.join(' · ') + '</div>';
      }).join('');
      table = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">' + head + scoreRow + dimRows + '</table></div>' +
        '<div style="margin-top:10px;background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.2);border-radius:8px;padding:10px"><div style="font-size:11px;color:#fbbf24;font-weight:700;margin-bottom:4px">⚖ Verdict UrbanX</div>' + verdict + '</div>';
    } else {
      table = '<div style="color:#64748b;font-size:12px;padding:14px;text-align:center">Adaugă 2-4 orașe pentru comparație.</div>';
    }
    return '<div style="margin-bottom:10px;position:relative">' +
      '<input id="ivu-search" type="text" autocomplete="off" placeholder="🔍 Caută ORICE UAT din România (municipiu · oraș · comună)…" ' +
      'oninput="window.UrbanXIVU.search(this.value)" ' +
      'style="width:100%;box-sizing:border-box;background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:9px 12px;font-size:13px">' +
      '<div id="ivu-results" style="position:absolute;left:0;right:0;top:42px;z-index:20;background:#0c1424;border:1px solid rgba(255,255,255,.14);border-radius:8px;max-height:240px;overflow-y:auto;display:none"></div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:5px">Catalog complet: ' + ((G._UAT_REGISTRY ? Object.keys(G._UAT_REGISTRY).length : 0)) + ' UAT-uri (SIRUTA). UAT-urile fără date detaliate primesc scor <b>estimat</b> din populație/regiune.</div>' +
      '</div>' + table;
  }
  // type-ahead peste registrul SIRUTA complet (3181 UAT)
  function _renderResults(q) {
    var box = document.getElementById('ivu-results'); if (!box) return;
    var res = (G._searchSIRUTA && q && q.length >= 2) ? G._searchSIRUTA(q, 12) : [];
    if (!res.length) { box.style.display = 'none'; box.innerHTML = ''; return; }
    box.innerHTML = res.map(function (r) {
      var dup = _sel.indexOf(r.key) >= 0;
      return '<div onclick="window.UrbanXIVU.add(\'' + r.key + '\')" style="padding:8px 12px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between;align-items:center' + (dup ? ';opacity:.4' : '') + '" onmouseover="this.style.background=\'rgba(16,185,129,.12)\'" onmouseout="this.style.background=\'transparent\'">' +
        '<span style="color:#e6edf7;font-size:13px">' + r.name + (dup ? ' ✓' : '') + '</span>' +
        '<span style="color:#64748b;font-size:11px">' + (r.tip || '') + ' · ' + r.judet + (r.pop2021 ? ' · ' + r.pop2021.toLocaleString('ro-RO') + ' loc.' : '') + '</span></div>';
    }).join('');
    box.style.display = 'block';
  }

  // ── Catalog național (toate orașele ranked) ──────────────────────────────
  var CAT_CAP = 150; // afisam top N; restul via cautare (evita 3181 randuri in DOM)
  function _normNmCat(s) { return String(s || '').toLowerCase().replace(/[șş]/g, 's').replace(/[țţ]/g, 't').replace(/[ăâ]/g, 'a').replace(/î/g, 'i'); }
  function _catRowsHTML(list, offset) {
    offset = offset || 0;
    return list.map(function (s, i) {
      return '<tr style="border-top:1px solid rgba(255,255,255,.06);cursor:pointer" onclick="window.UrbanXIVU.show(\'' + s.key + '\')">' +
        '<td style="padding:5px;color:#64748b">' + (s._rank != null ? s._rank : (offset + i + 1)) + '</td><td style="padding:5px;color:#e2e8f0">' + s.name + (s.city && s.city._estimat ? ' <span title="scor estimat — UAT fără date detaliate" style="color:#fbbf24;font-size:9px">~est</span>' : '') + '</td>' +
        '<td style="padding:5px;text-align:center;font-weight:800;color:' + gradeColor(s.R.score) + '">' + s.R.score + '</td>' +
        '<td style="padding:5px;text-align:center;color:' + gradeColor(s.R.score) + '">' + s.R.grade + '</td>' +
        '<td style="padding:5px;text-align:center;color:#94a3b8;font-size:10px">' + (TIER_RO[s.R.tier] || s.R.tier || '') + '</td></tr>';
    }).join('');
  }
  function catFilter(q) {
    var box = document.getElementById('ivu-cat-rows'); if (!box) return;
    var cat = catalog(); var qn = _normNmCat(q);
    var list;
    if (qn && qn.length >= 2) {
      list = cat.filter(function (s) { return _normNmCat(s.name).indexOf(qn) >= 0; }).slice(0, 60)
        .map(function (s) { s._rank = cat.indexOf(s) + 1; return s; });
    } else {
      list = cat.slice(0, CAT_CAP);
    }
    box.innerHTML = _catRowsHTML(list, 0);
    var note = document.getElementById('ivu-cat-note');
    if (note) note.textContent = qn && qn.length >= 2 ? (list.length + ' rezultate pentru „' + q + '" (rang național din ' + cat.length + ')') : ('Top ' + Math.min(CAT_CAP, cat.length) + ' din ' + cat.length + ' UAT-uri — caută pentru restul.');
  }
  function catalogHTML() {
    var cat = catalog();
    if (!cat.length) return '<div style="color:#64748b;padding:14px">Catalogul se populează din registrul de UAT-uri.</div>';
    return '<input id="ivu-cat-q" oninput="window.UrbanXIVU.catFilter(this.value)" placeholder="🔎 caută în toate cele ' + cat.length + ' UAT-uri…" style="width:100%;box-sizing:border-box;background:#0a1120;border:1px solid rgba(255,255,255,.12);border-radius:8px;color:#e6edf7;padding:8px 11px;font-size:12px;margin-bottom:8px;font-family:inherit">' +
      '<div style="overflow-x:auto;max-height:52vh;overflow-y:auto"><table style="width:100%;border-collapse:collapse;font-size:12px">' +
      '<tr><th style="text-align:left;padding:5px;color:#94a3b8">#</th><th style="text-align:left;padding:5px;color:#94a3b8">UAT</th><th style="padding:5px;color:#94a3b8">iVU</th><th style="padding:5px;color:#94a3b8">Notă</th><th style="padding:5px;color:#94a3b8">Categorie</th></tr>' +
      '<tbody id="ivu-cat-rows">' + _catRowsHTML(cat.slice(0, CAT_CAP), 0) + '</tbody></table></div>' +
      '<div id="ivu-cat-note" style="font-size:10px;color:#64748b;margin-top:8px">Top ' + Math.min(CAT_CAP, cat.length) + ' din ' + cat.length + ' UAT-uri — caută pentru restul. Click pe un UAT → fișă de scor.</div>';
  }

  // ── Panou principal (overlay cu 3 taburi) ────────────────────────────────
  var _tab = 'card', _active = null;
  function _render() {
    var ov = document.getElementById('ivu-ov'); if (!ov) return;
    var body = ov.querySelector('#ivu-body');
    var s = _active ? scoreFor(_active) : null;
    var tabBtn = function (id, lbl) { return '<button onclick="window.UrbanXIVU.tab(\'' + id + '\')" style="background:' + (_tab === id ? 'rgba(16,185,129,.2)' : 'transparent') + ';color:' + (_tab === id ? '#6ee7b7' : '#94a3b8') + ';border:1px solid ' + (_tab === id ? 'rgba(16,185,129,.4)' : 'rgba(255,255,255,.12)') + ';border-radius:8px;padding:7px 14px;cursor:pointer;font-weight:700;font-size:12px">' + lbl + '</button>'; };
    ov.querySelector('#ivu-tabs').innerHTML = tabBtn('card', '🏙️ Fișă de scor') + tabBtn('compare', '🔀 Comparator') + tabBtn('catalog', '📊 Catalog național');
    ov.querySelector('#ivu-sub').textContent = _active && s ? s.name : 'selectează un oraș';
    if (_tab === 'card') body.innerHTML = s ? scoreCardHTML(s) : '<div style="color:#64748b;padding:20px;text-align:center">Niciun oraș activ. Deschide din Catalog național sau selectează un UAT pe hartă.</div>';
    else if (_tab === 'compare') body.innerHTML = comparatorHTML();
    else body.innerHTML = catalogHTML();
  }

  var IVU = {
    open: function (cityKey) {
      _active = cityKey || (G.TCI && G.TCI.cityKey) || null;
      if (document.getElementById('ivu-ov')) { _render(); return; }
      var ov = el('div', { id: 'ivu-ov', style: 'position:fixed;inset:0;background:rgba(2,6,16,.78);z-index:9400;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)' });
      ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
      var m = el('div', { style: 'background:#0b1424;color:#e6edf7;width:min(820px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(16,185,129,.4);border-radius:14px;font-family:system-ui,sans-serif' });
      m.innerHTML = '<div style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between">' +
        '<div><div style="font-weight:800;font-size:17px">🏆 iVU — Indicele de Vitalitate Urbană <span style="font-size:10px;color:#6ee7b7;background:rgba(16,185,129,.15);padding:2px 7px;border-radius:10px;margin-left:4px">marca UrbanX</span></div>' +
        '<div style="font-size:11px;color:#94a3b8" id="ivu-sub"></div></div>' +
        '<button onclick="document.getElementById(\'ivu-ov\').remove()" style="background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:6px 11px;cursor:pointer">✕</button></div>' +
        '<div style="padding:14px 20px"><div id="ivu-tabs" style="display:flex;gap:8px;margin-bottom:14px"></div><div id="ivu-body"></div>' +
        '<div style="font-size:10px;color:#64748b;margin-top:14px;border-top:1px solid rgba(255,255,255,.06);padding-top:8px">IVU = indice compozit transparent din date reale (ISO 37120 · Eurostat · OECD · INFP · EEA). Document orientativ — nu substituie evaluarea oficială. · UrbanX TSS-FG</div></div>';
      ov.appendChild(m); document.body.appendChild(ov);
      _render();
    },
    // ── Secțiune IVU reutilizabilă în ORICE PDF (_makeStratDoc) ──────────────
    // Injectează un capitol „Nota UrbanX (iVU)": scor + formulă + grafic pe
    // dimensiuni + benchmark european. Apelabilă din orice generator de raport,
    // teritorial sau de parcelă (contextul UAT al amplasamentului).
    renderSection: function (D, cityKey) {
      try {
        if (!D || !(G._UrbanRank && G._UrbanRank.renderChapter)) return false;
        var db = G._RO_CITIES_DB || {};
        var key = cityKey || (G.TCI && G.TCI.cityKey);
        var city = (db[key]) || (G._TCIMasterplanPDF && G._TCIMasterplanPDF._resolveCity && G._TCIMasterplanPDF._resolveCity(key)) || null;
        if (!city) return false;
        if (!city.key) city.key = key;
        var pred = {};
        try { if (G._PredEngine && G._PredEngine.calc) pred = G._PredEngine.calc(city) || {}; } catch (e) {}
        G._UrbanRank.renderChapter(D, pred, city);
        return true;
      } catch (e) { console.warn('[IVU renderSection]', e); return false; }
    },
    tab: function (t) { _tab = t; _render(); },
    show: function (k) { _active = k; _tab = 'card'; _render(); },
    add: function (k) { if (k && _sel.indexOf(k) < 0 && _sel.length < 4) _sel.push(k); _tab = 'compare'; _render(); },
    search: function (q) { try { _renderResults(q); } catch (e) {} },
    rm: function (k) { _sel = _sel.filter(function (x) { return x !== k; }); _render(); },
    scoreFor: scoreFor, catalog: catalog, rankOf: rankOf, catFilter: catFilter,
    resolveCity: _resolveCityData, cityFromRegistry: _cityFromRegistry
  };
  G.UrbanXIVU = IVU;

  // ── Grilă de culori IVU (stil certificat energetic A→G) — bandă cu zone
  // colorate roșu→verde și un indicator (triunghi) la poziția notei. Reutilizabilă
  // pe copertă și în capitolul IVU. (x,y,w) în mm; score 0-100.
  G._ivuScaleBar = function (pdf, x, y, w, score, opts) {
    try {
      opts = opts || {};
      var font = opts.font || 'helvetica';
      var s = Math.max(0, Math.min(100, +score || 0));
      var h = opts.h || 5.5;
      // benzi IVU: D <50 · C 50-65 · B 65-80 · A 80-100 (roșu → verde)
      var bands = [
        { lab: 'D', from: 0, to: 50, col: [239, 68, 68] },
        { lab: 'C', from: 50, to: 65, col: [245, 158, 11] },
        { lab: 'B', from: 65, to: 80, col: [132, 204, 22] },
        { lab: 'A', from: 80, to: 100, col: [34, 197, 94] }
      ];
      bands.forEach(function (b) {
        var bx = x + w * (b.from / 100), bw = w * ((b.to - b.from) / 100);
        pdf.setFillColor(b.col[0], b.col[1], b.col[2]); pdf.rect(bx, y, bw, h, 'F');
        pdf.setTextColor(255, 255, 255); pdf.setFont(font, 'bold'); pdf.setFontSize(6.3);
        pdf.text(b.lab, bx + bw / 2, y + h - 1.5, { align: 'center' });
      });
      // indicator (triunghi) la poziția notei + valoarea
      var px = x + w * (s / 100);
      var mc = opts.markCol || [15, 23, 42];
      pdf.setFillColor(mc[0], mc[1], mc[2]);
      pdf.triangle(px, y - 0.2, px - 1.9, y - 2.7, px + 1.9, y - 2.7, 'F');
      var lc = opts.labelCol || [40, 50, 70];
      pdf.setTextColor(lc[0], lc[1], lc[2]); pdf.setFont(font, 'bold'); pdf.setFontSize(7.2);
      pdf.text(String(Math.round(s)), px, y - 3.4, { align: 'center' });
    } catch (e) {}
  };

  // ── Notă IVU pentru COPERTĂ (brand UrbanX) — apelabilă din orice generator ──
  // Desenează o casetă compactă pe copertă: scor + calificativ + „dezvoltat de UrbanX".
  // Returnează înălțimea desenată (0 dacă nu există scor) ca să poată fi poziționată.
  G._ivuCoverNote = function (pdf, cityKey, opts) {
    try {
      opts = opts || {};
      if (pdf.__ivuStamped) return 0; pdf.__ivuStamped = 1; // idempotent (o singură notă pe copertă)
      var s = null; try { s = scoreFor(cityKey || (G.TCI && G.TCI.cityKey)); } catch (e) {}
      var W = opts.W || 210, ml = opts.x != null ? opts.x : 26, w = opts.w || (W - 2 * ml);
      var y = opts.y != null ? opts.y : 250;
      var ac = opts.accent || [37, 99, 235];
      var FONT = opts.font || 'DejaVuRO';
      var hasScore = !!(s && s.R);
      var h = hasScore ? 30 : 16;        // mai înalt când avem scor (loc pt grila A-G fără suprapunere)
      if (y + h > 292) y = 292 - h;      // nu depăși marginea de jos a paginii A4
      pdf.setDrawColor(ac[0], ac[1], ac[2]); pdf.setLineWidth(0.4);
      pdf.setFillColor(opts.bg ? opts.bg[0] : 18, opts.bg ? opts.bg[1] : 24, opts.bg ? opts.bg[2] : 40);
      pdf.roundedRect(ml, y, w, h, 2, 2, 'FD');
      pdf.setTextColor(ac[0], ac[1], ac[2]); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8.5);
      pdf.text('NOTA URBANX (iVU)', ml + 5, y + 6);
      pdf.setFont(FONT, 'normal'); pdf.setFontSize(8); pdf.setTextColor(210, 210, 220);
      var line2;
      if (hasScore) line2 = 'Indicele de Vitalitate Urbană: ' + s.R.score + '/100 · calificativ ' + s.R.grade + ' (' + (s.R.tierLabel || '') + ')';
      else line2 = 'Indicele de Vitalitate Urbană — indice compozit (0–100) pe dimensiuni cheie';
      pdf.text(line2, ml + 5, y + 11.5);
      // grilă de culori A→G cu indicator la notă (doar când avem scor real)
      // Bara coborâtă la y+21 → eticheta „65" (bară−3.4 = y+17.6) NU se mai suprapune
      // peste line2 (y+11.5). Spațiu de respirație, nu aglomerat.
      if (hasScore && G._ivuScaleBar) {
        var barW = Math.min(96, w - 10);
        G._ivuScaleBar(pdf, ml + 5, y + 22, barW, s.R.score, { font: FONT, markCol: [255, 255, 255], labelCol: [225, 228, 235] });
      }
      pdf.setFontSize(6.4); pdf.setTextColor(150, 150, 165);
      pdf.text(hasScore ? 'Indice compozit · scala A–D · detaliat în capitolul „Nota UrbanX (iVU)".'
                        : 'Indice compozit dezvoltat de UrbanX · formulă transparentă · detaliat în capitolul „Nota UrbanX (iVU)".',
        hasScore ? ml + 5 + Math.min(96, w - 10) + 5 : ml + 5, hasScore ? y + 23 : y + 15, { maxWidth: hasScore ? (w - Math.min(96, w - 10) - 15) : (w - 10) });
      return h;
    } catch (e) { return 0; }
  };

  console.log('[IVU] ✅ Indicele de Vitalitate Urbană (City Intelligence & Comparator) încărcat');
})(window);
