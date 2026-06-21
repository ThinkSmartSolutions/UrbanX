/* ============================================================================
 * UrbanX LOISIR / UHI — mitigarea insulei de căldură urbană (client-side).
 * Calculator de răcire (formule empirice validate) + scorecard verde vs benchmark
 * mondial. Harta termică din satelit (Landsat/Sentinel LST) = pipeline server
 * (Copernicus) — marcată ca Faza 2; aici NU o simulăm.
 *
 * window.UHI.calculateCooling(type, area) · simulate(list, currentUHI) · scorecard(dims)
 * Surse: Bowler 2010, Gill 2007, Santamouris 2013, C40 Cities · WHO 300m/30% canopy
 * · benchmark Singapore/Copenhaga/Paris. Estimări empirice (±30-50% local).
 * ========================================================================== */
(function (G) {
  'use strict';
  // tip → [răcire °C/m², rază m, CO2 t/ha/an (mediu), plafon °C, etichetă]
  var COOL = {
    padure_urbana: { rate: 0.0008, r: 200, co2: 11.5, cap: 4.0, label: 'Pădure urbană (>1ha)', src: 'Bowler 2010' },
    parc_urban: { rate: 0.0004, r: 150, co2: 5.5, cap: 3.0, label: 'Parc urban (>2ha)', src: 'Gill 2007' },
    parc_mic: { rate: 0.0002, r: 50, co2: 2, cap: 1.5, label: 'Parc mic (<0.5ha)', src: 'Lin 2015' },
    acoperis_verde_ext: { rate: 0.0001, r: 10, co2: 0.75, cap: 1.0, label: 'Acoperiș verde extensiv', src: 'Kleerekoper 2012' },
    acoperis_verde_int: { rate: 0.0002, r: 20, co2: 2, cap: 1.5, label: 'Acoperiș verde intensiv', src: 'Berardi 2014' },
    perete_verde: { rate: 0.00005, r: 5, co2: 0.35, cap: 0.8, label: 'Perete verde', src: 'Cameron 2014' },
    pavaj_permeabil: { rate: 0.0001, r: 30, co2: 0, cap: 1.0, label: 'Pavaj permeabil', src: 'Santamouris 2013' },
    fantana_racire: { rate: 0.003, r: 20, co2: 0, cap: 2.0, label: 'Fântână/misting de răcire', src: 'Tokyo data' },
    wetland: { rate: 0.0005, r: 100, co2: 4, cap: 2.5, label: 'Zonă umedă (>0.5ha)', src: 'Song 2014' },
    rain_garden: { rate: 0.0002, r: 40, co2: 1.5, cap: 1.0, label: 'Grădină de ploaie', src: 'EPA 2014' }
  };
  function calculateCooling(type, area_m2) {
    var c = COOL[type]; if (!c) return null;
    var cooling = Math.min(c.cap, c.rate * (area_m2 || 0));
    var co2 = c.co2 * ((area_m2 || 0) / 10000);
    return { type: type, label: c.label, cooling_c: Math.round(cooling * 100) / 100, radius_m: c.r, co2_t_year: Math.round(co2 * 10) / 10, src: c.src };
  }
  function simulate(list, currentUHI) {
    var items = (list || []).map(function (x) { return calculateCooling(x.type, x.area_m2); }).filter(Boolean);
    // răcirea totală nu e aditivă liniar (efecte care se suprapun) — aplicăm o atenuare ușoară
    var raw = items.reduce(function (s, x) { return s + x.cooling_c; }, 0);
    var total = Math.round(Math.min(raw, raw * (raw > 3 ? 0.8 : 1)) * 100) / 100;
    var co2 = Math.round(items.reduce(function (s, x) { return s + x.co2_t_year; }, 0) * 10) / 10;
    var cur = currentUHI == null ? 4.5 : +currentUHI;
    return { items: items, total_cooling_c: total, co2_t_year: co2, current_uhi_c: cur, new_uhi_c: Math.round(Math.max(0, cur - total) * 100) / 100 };
  }
  // scorecard 6 dimensiuni (0-100) + benchmark
  var BENCH = { Singapore: 85, Copenhaga: 78, Paris: 65, 'medie RO': 35 };
  var DIMS = [
    { k: 'canopy', label: 'Acoperire arboricolă', help: 'WHO: >30% = 100' },
    { k: 'equity', label: 'Distribuție echitabilă', help: 'WHO: 100% loc. la <300m = 100' },
    { k: 'connectivity', label: 'Conectivitate ecologică', help: 'rețea coridoare fără întrerupere' },
    { k: 'uhi', label: 'Performanță UHI', help: 'UHI mediu <1°C = 100' },
    { k: 'biodiversity', label: 'Biodiversitate urbană', help: 'specii native, >20 specii arbori' },
    { k: 'water', label: 'Infrastructură albastră', help: '>50% permeabil, rain gardens' }
  ];
  function scorecard(dims) {
    var vals = DIMS.map(function (d) { return Math.max(0, Math.min(100, +(dims && dims[d.k]) || 0)); });
    var total = Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length);
    return { total: total, dims: DIMS.map(function (d, i) { return { key: d.k, label: d.label, help: d.help, score: vals[i] }; }), benchmarks: BENCH };
  }

  // ── UI ──
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(700px,96vw);max-height:93vh;overflow:auto;border:1px solid rgba(34,197,94,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#16a34a,#15803d);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#86efac;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700'
  };
  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🌿 LOISIR — Insulă de căldură (UHI)</div><div style="font-size:11px;color:#94a3b8">Calculator de răcire + scorecard verde · soluții bazate pe natură</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    // tabs
    var tabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:8px' });
    var t1 = el('button', { style: ST.ghost }, '❄ Calculator răcire'); var t2 = el('button', { style: ST.ghost }, '🌳 Scorecard verde');
    tabs.appendChild(t1); tabs.appendChild(t2); body.appendChild(tabs);
    var p1 = el('div'); var p2 = el('div', { style: 'display:none' }); body.appendChild(p1); body.appendChild(p2);
    t1.onclick = function () { p1.style.display = ''; p2.style.display = 'none'; }; t2.onclick = function () { p1.style.display = 'none'; p2.style.display = ''; };

    // calculator
    p1.appendChild(el('div', { style: ST.label }, 'UHI actual (°C peste periferie — estimat/din hartă)'));
    var uhiI = el('input', { style: ST.inp, type: 'number', step: '0.1', value: '4.5' }); p1.appendChild(uhiI);
    p1.appendChild(el('div', { style: ST.label }, 'Adaugă soluții de răcire'));
    var rows = el('div'); p1.appendChild(rows);
    function addRow() {
      var row = el('div', { style: 'display:grid;grid-template-columns:1.5fr 1fr 30px;gap:6px;margin-bottom:6px', class: 'uhi-row' });
      var sel = el('select', { style: ST.inp, class: 'uhi-type' }); Object.keys(COOL).forEach(function (k) { sel.appendChild(el('option', { value: k }, COOL[k].label)); });
      var ar = el('input', { style: ST.inp, class: 'uhi-area', type: 'number', placeholder: 'mp' });
      var d = el('button', { style: ST.ghost }, '✕'); d.onclick = function () { row.remove(); };
      row.appendChild(sel); row.appendChild(ar); row.appendChild(d); rows.appendChild(row);
    }
    addRow(); addRow();
    var add = el('button', { style: ST.ghost }, '+ soluție'); add.onclick = addRow; p1.appendChild(add);
    var run = el('button', { style: ST.btn + ';margin-top:12px' }, '▶ Calculează răcirea'); p1.appendChild(run);
    var out = el('div', { style: 'margin-top:12px' }); p1.appendChild(out);
    run.onclick = function () {
      var list = []; rows.querySelectorAll('.uhi-row').forEach(function (r) { var a = +r.querySelector('.uhi-area').value; if (a > 0) list.push({ type: r.querySelector('.uhi-type').value, area_m2: a }); });
      if (!list.length) { out.innerHTML = '<div style="color:#fca5a5;font-size:13px">Adaugă cel puțin o soluție cu suprafață.</div>'; return; }
      var r = simulate(list, +uhiI.value);
      function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;text-align:center"><div style="font-size:18px;font-weight:800;color:' + (c || '#86efac') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
      out.innerHTML = '<div style="display:flex;gap:8px;margin-bottom:8px">' + card('−' + r.total_cooling_c + '°C', 'răcire totală', '#34d399') + card(r.new_uhi_c + '°C', 'UHI nou (din ' + r.current_uhi_c + ')', '#60a5fa') + card(r.co2_t_year + ' t', 'CO₂ sechestrat/an', '#86efac') + '</div>' +
        r.items.map(function (i) { return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span>' + i.label + ' <span style="color:#64748b">· rază ' + i.radius_m + 'm · ' + i.src + '</span></span><span style="color:#34d399;font-weight:700">−' + i.cooling_c + '°C</span></div>'; }).join('') +
        '<div style="font-size:10px;color:#64748b;margin-top:8px">⚠ Estimări empirice (C40/Bowler 2010 etc.) — variază ±30-50% local. Harta termică din satelit (Landsat/Sentinel LST) = etapă cu server Copernicus.</div>';
    };

    // scorecard
    p2.appendChild(el('div', { style: ST.label }, 'Evaluează 6 dimensiuni (0-100)'));
    var sliders = {};
    DIMS.forEach(function (d) {
      var w = el('div', { style: 'margin-bottom:8px' });
      var val = el('span', { style: 'color:#34d399;font-weight:700' }, '40');
      w.appendChild(el('div', { style: 'font-size:12px;color:#cbd5e1' }, d.label + ' <span style="color:#64748b;font-size:10px">· ' + d.help + '</span> — ')); w.firstChild.appendChild(val);
      var sl = el('input', { type: 'range', min: '0', max: '100', value: '40', style: 'width:100%' }); sl.oninput = function () { val.textContent = sl.value; }; w.appendChild(sl);
      sliders[d.k] = sl; p2.appendChild(w);
    });
    var sbtn = el('button', { style: ST.btn + ';margin-top:8px' }, '▶ Calculează scorul'); p2.appendChild(sbtn);
    var sout = el('div', { style: 'margin-top:12px' }); p2.appendChild(sout);
    sbtn.onclick = function () {
      var dims = {}; Object.keys(sliders).forEach(function (k) { dims[k] = +sliders[k].value; });
      var r = scorecard(dims); var col = r.total >= 70 ? '#22c55e' : r.total >= 45 ? '#f59e0b' : '#ef4444';
      sout.innerHTML = '<div style="text-align:center;margin-bottom:8px"><span style="font-size:30px;font-weight:900;color:' + col + '">' + r.total + '</span><span style="color:#94a3b8">/100 scor verde</span></div>' +
        '<div style="font-size:11px;color:#94a3b8;margin-bottom:6px">Benchmark: ' + Object.keys(BENCH).map(function (b) { return b + ' ' + BENCH[b]; }).join(' · ') + '</div>' +
        r.dims.map(function (d) { return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0"><span>' + d.label + '</span><span style="font-weight:700;color:' + (d.score >= 70 ? '#34d399' : d.score >= 45 ? '#fbbf24' : '#f87171') + '">' + d.score + '</span></div>'; }).join('') +
        '<div style="font-size:10px;color:#64748b;margin-top:8px">Model: Singapore NParks + C40. Unele dimensiuni (canopy, UHI) se calculează automat din satelit cu serverul Copernicus (Faza 2).</div>';
    };

    body.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:14px;border-top:1px solid rgba(255,255,255,.06);padding-top:10px' }, '🛰 Harta insulei de căldură (LST din Landsat 8/9: K1=774.88, K2=1321.08 / Sentinel-3) + coridoarele de aer rece (model Stuttgart, vânt ERA5) necesită pipeline-ul Copernicus pe server — Faza 2. Calculatorul de răcire și scorecard-ul de mai sus rulează aici, pe formule reale.'));
    ov.appendChild(m); document.body.appendChild(ov);
  }
  G.UHI = { calculateCooling: calculateCooling, simulate: simulate, scorecard: scorecard, openPanel: openPanel, COOL: COOL };
  console.log('[UHI/Loisir] modul insulă de căldură încărcat (window.UHI)');
})(window);
