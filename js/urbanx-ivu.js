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

  // ── calcul IVU pentru un cityKey (sincron) ───────────────────────────────
  function scoreFor(cityKey) {
    var db = G._RO_CITIES_DB || {};
    var city = db[cityKey]; if (!city) return null;
    if (!city.key) city.key = cityKey;
    var pred = {};
    try { if (G._PredEngine && G._PredEngine.calc) pred = G._PredEngine.calc(city) || {}; } catch (e) {}
    var R = (G._UrbanRank && G._UrbanRank.compute) ? G._UrbanRank.compute(pred, city) : null;
    if (!R) return null;
    return { key: cityKey, name: city.name || cityKey, city: city, R: R };
  }

  // catalog complet (toate orașele din _RO_CITIES_DB), ordonat după IVU
  function catalog() {
    var db = G._RO_CITIES_DB || {};
    return Object.keys(db).map(scoreFor).filter(Boolean)
      .sort(function (a, b) { return b.R.score - a.R.score; });
  }

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
    var txt = s.name + ' obține nota UrbanX de <b>' + s.R.score + '/100</b> (calificativ <b>' + s.R.grade + '</b>, tier: ' + s.R.tierLabel + '). ';
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
      '<div style="margin-top:10px"><div style="font-size:11px;color:#94a3b8;font-weight:700;margin-bottom:3px">Benchmark european (același tier)</div>' + peers + '</div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:8px">' + R.formula + '</div>' +
      '</div></div>';
  }

  // ── Comparator catalog ───────────────────────────────────────────────────
  var _sel = [];
  function comparatorHTML() {
    var db = G._RO_CITIES_DB || {};
    var opts = Object.keys(db).sort(function (a, b) { return (db[a].name || '').localeCompare(db[b].name || ''); })
      .map(function (k) { return '<option value="' + k + '">' + (db[k].name || k) + '</option>'; }).join('');
    var rows = _sel.map(scoreFor).filter(Boolean);
    var table = '';
    if (rows.length) {
      var dimLabels = rows[0].R.dims.map(function (d) { return d.label; });
      var head = '<tr><th style="text-align:left;padding:5px;color:#94a3b8;font-size:11px">Indicator</th>' +
        rows.map(function (r) { return '<th style="padding:5px;color:#e2e8f0;font-size:11px">' + r.name + ' <span onclick="window.UrbanXIVU.rm(\'' + r.key + '\')" style="cursor:pointer;color:#ef4444">✕</span></th>'; }).join('') + '</tr>';
      var scoreRow = '<tr style="border-top:2px solid rgba(255,255,255,.12)"><td style="padding:5px;font-weight:700;color:#6ee7b7">Nota UrbanX (IVU)</td>' +
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
    return '<div style="display:flex;gap:8px;align-items:center;margin-bottom:10px"><select id="ivu-add" style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px">' + opts + '</select>' +
      '<button onclick="window.UrbanXIVU.add()" style="background:linear-gradient(180deg,#10b981,#059669);color:#fff;border:0;border-radius:8px;padding:8px 14px;font-weight:700;cursor:pointer">+ Adaugă</button></div>' + table;
  }

  // ── Catalog național (toate orașele ranked) ──────────────────────────────
  function catalogHTML() {
    var cat = catalog();
    if (!cat.length) return '<div style="color:#64748b;padding:14px">Catalogul se populează din _RO_CITIES_DB.</div>';
    return '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px">' +
      '<tr><th style="text-align:left;padding:5px;color:#94a3b8">#</th><th style="text-align:left;padding:5px;color:#94a3b8">Oraș</th><th style="padding:5px;color:#94a3b8">IVU</th><th style="padding:5px;color:#94a3b8">Notă</th><th style="padding:5px;color:#94a3b8">Tier</th></tr>' +
      cat.map(function (s, i) {
        return '<tr style="border-top:1px solid rgba(255,255,255,.06);cursor:pointer" onclick="window.UrbanXIVU.show(\'' + s.key + '\')">' +
          '<td style="padding:5px;color:#64748b">' + (i + 1) + '</td><td style="padding:5px;color:#e2e8f0">' + s.name + '</td>' +
          '<td style="padding:5px;text-align:center;font-weight:800;color:' + gradeColor(s.R.score) + '">' + s.R.score + '</td>' +
          '<td style="padding:5px;text-align:center;color:' + gradeColor(s.R.score) + '">' + s.R.grade + '</td>' +
          '<td style="padding:5px;text-align:center;color:#94a3b8;font-size:10px">' + (s.R.tier || '') + '</td></tr>';
      }).join('') + '</table></div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:8px">Click pe un oraș → Score Card detaliat. Catalog ordonat după IVU.</div>';
  }

  // ── Panou principal (overlay cu 3 taburi) ────────────────────────────────
  var _tab = 'card', _active = null;
  function _render() {
    var ov = document.getElementById('ivu-ov'); if (!ov) return;
    var body = ov.querySelector('#ivu-body');
    var s = _active ? scoreFor(_active) : null;
    var tabBtn = function (id, lbl) { return '<button onclick="window.UrbanXIVU.tab(\'' + id + '\')" style="background:' + (_tab === id ? 'rgba(16,185,129,.2)' : 'transparent') + ';color:' + (_tab === id ? '#6ee7b7' : '#94a3b8') + ';border:1px solid ' + (_tab === id ? 'rgba(16,185,129,.4)' : 'rgba(255,255,255,.12)') + ';border-radius:8px;padding:7px 14px;cursor:pointer;font-weight:700;font-size:12px">' + lbl + '</button>'; };
    ov.querySelector('#ivu-tabs').innerHTML = tabBtn('card', '🏙️ Score Card') + tabBtn('compare', '🔀 Comparator') + tabBtn('catalog', '📊 Catalog național');
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
        '<div><div style="font-weight:800;font-size:17px">🏆 IVU — Indicele de Vitalitate Urbană <span style="font-size:10px;color:#6ee7b7;background:rgba(16,185,129,.15);padding:2px 7px;border-radius:10px;margin-left:4px">powered by UrbanX</span></div>' +
        '<div style="font-size:11px;color:#94a3b8" id="ivu-sub"></div></div>' +
        '<button onclick="document.getElementById(\'ivu-ov\').remove()" style="background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:6px 11px;cursor:pointer">✕</button></div>' +
        '<div style="padding:14px 20px"><div id="ivu-tabs" style="display:flex;gap:8px;margin-bottom:14px"></div><div id="ivu-body"></div>' +
        '<div style="font-size:10px;color:#64748b;margin-top:14px;border-top:1px solid rgba(255,255,255,.06);padding-top:8px">IVU = indice compozit transparent din date reale (ISO 37120 · Eurostat · OECD · INFP · EEA). Document orientativ — nu substituie evaluarea oficială. · UrbanX TSS-FG</div></div>';
      ov.appendChild(m); document.body.appendChild(ov);
      _render();
    },
    tab: function (t) { _tab = t; _render(); },
    show: function (k) { _active = k; _tab = 'card'; _render(); },
    add: function () { var s = document.getElementById('ivu-add'); if (s && s.value && _sel.indexOf(s.value) < 0 && _sel.length < 4) _sel.push(s.value); _tab = 'compare'; _render(); },
    rm: function (k) { _sel = _sel.filter(function (x) { return x !== k; }); _render(); },
    scoreFor: scoreFor, catalog: catalog, rankOf: rankOf
  };
  G.UrbanXIVU = IVU;
  console.log('[IVU] ✅ Indicele de Vitalitate Urbană (City Intelligence & Comparator) încărcat');
})(window);
