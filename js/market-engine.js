/* ============================================================================
 * UrbanX — Market Intelligence imobiliar (WAVE 2-B). Singurul modul nou real din
 * val 2 — Invest si Feaz il asteptau ca dependinta (componenta „market").
 * Tranzactii (localStorage, seed demonstrativ) → snapshot per UAT/tip: mediana,
 * medie, min/max EUR/mp, variatie 3 luni / 12 luni, pipeline oferta. Trend SVG.
 * window.Market: transactions · snapshot · trend · openPanel · generatePDF
 * ONEST: „Date demonstrative — ANCPI eTranzactii = Faza 2 (server)". Disclaimer
 * obligatoriu: „Nu constituie consultanta financiara sau investitionala" (L.297/2004).
 * Surse: Legea 7/1996 art.51 (CF public) · GDPR L.190/2018 (pret agregat, fara nume).
 * ========================================================================== */
(function (G) {
  'use strict';
  var CURS = 5.0; // RON/EUR orientativ (BNR ~)
  var TYPES = { apartament: 'Apartament', casa: 'Casă', teren: 'Teren', comercial: 'Comercial', birou: 'Birou' };
  // seed demonstrativ: preturi EUR/mp realiste RO 2024 + dispersie pe 12 luni
  function _seed() {
    var out = [], id = 0;
    var base = { apartament: [1200, 1800], casa: [800, 1200], teren: [80, 200], comercial: [900, 1500], birou: [950, 1500] };
    var uats = [['Florești', 58297], ['Cluj-Napoca', 54975], ['Iași', 95075]];
    // luni inapoi 0..11; trend usor crescator (~+8%/an)
    uats.forEach(function (u, ui) {
      Object.keys(base).forEach(function (t) {
        var lo = base[t][0] * (1 + ui * 0.12), hi = base[t][1] * (1 + ui * 0.12);
        for (var m = 11; m >= 0; m--) {
          var n = t === 'teren' ? 3 : 2;
          for (var k = 0; k < n; k++) {
            var growth = 1 + (11 - m) * 0.007; // +0.7%/luna
            var frac = ((id * 37) % 100) / 100;
            var ppm = Math.round((lo + (hi - lo) * frac) * growth);
            var area = t === 'teren' ? 300 + (id * 53) % 700 : t === 'casa' ? 90 + (id * 17) % 120 : 45 + (id * 11) % 70;
            out.push({ id: 'tx_seed_' + (id++), uat: u[0], siruta: u[1], type: t, price_m2_eur: ppm, area_m2: area, price_eur: ppm * area, months_ago: m, source: 'demonstrativ' });
          }
        }
      });
    });
    return out;
  }
  var KEY = 'urbanx_market_tx_v1';
  function load() { try { var v = localStorage.getItem(KEY); if (v == null) { var s = _seed(); localStorage.setItem(KEY, JSON.stringify(s)); return s; } return JSON.parse(v); } catch (e) { return _seed(); } }
  function save(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  var transactions = {
    list: function (f) { var a = load(); if (f && f.uat) a = a.filter(function (t) { return t.uat === f.uat; }); if (f && f.type) a = a.filter(function (t) { return t.type === f.type; }); return a; },
    add: function (t) { var a = load(); t.id = 'tx' + Date.now(); t.source = t.source || 'manual'; if (!t.price_m2_eur && t.price_eur && t.area_m2) t.price_m2_eur = Math.round(t.price_eur / t.area_m2); t.months_ago = t.months_ago || 0; a.push(t); save(a); return t; },
    remove: function (id) { save(load().filter(function (t) { return t.id !== id; })); }
  };
  function _median(arr) { if (!arr.length) return 0; var s = arr.slice().sort(function (a, b) { return a - b; }); var m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2); }

  function snapshot(uat, type) {
    var a = transactions.list({ uat: uat, type: type });
    if (!a.length) return { count: 0, uat: uat, type: type };
    var ppm = a.map(function (t) { return t.price_m2_eur; });
    var recent = a.filter(function (t) { return t.months_ago <= 3; }).map(function (t) { return t.price_m2_eur; });
    var prev3 = a.filter(function (t) { return t.months_ago > 3 && t.months_ago <= 6; }).map(function (t) { return t.price_m2_eur; });
    var yearAgo = a.filter(function (t) { return t.months_ago >= 9; }).map(function (t) { return t.price_m2_eur; });
    var medRecent = _median(recent.length ? recent : ppm), medPrev3 = _median(prev3.length ? prev3 : ppm), medYear = _median(yearAgo.length ? yearAgo : ppm);
    var ch3 = medPrev3 ? Math.round((medRecent - medPrev3) / medPrev3 * 1000) / 10 : 0;
    var ch12 = medYear ? Math.round((medRecent - medYear) / medYear * 1000) / 10 : 0;
    var quality = a.some(function (t) { return t.source !== 'demonstrativ'; }) ? 'medium' : 'demonstrativ';
    return {
      count: a.length, uat: uat, type: type,
      median_m2_eur: _median(ppm), avg_m2_eur: Math.round(ppm.reduce(function (s, x) { return s + x; }, 0) / ppm.length),
      min_m2_eur: Math.min.apply(null, ppm), max_m2_eur: Math.max.apply(null, ppm),
      median_m2_ron: Math.round(_median(ppm) * CURS),
      change_3m_pct: ch3, change_12m_pct: ch12, data_quality: quality
    };
  }
  // trend: mediana lunara (12 luni) pentru SVG
  function trend(uat, type) {
    var a = transactions.list({ uat: uat, type: type }); var pts = [];
    for (var m = 11; m >= 0; m--) { var v = a.filter(function (t) { return t.months_ago === m; }).map(function (t) { return t.price_m2_eur; }); pts.push({ m: m, val: _median(v) }); }
    return pts.filter(function (p) { return p.val > 0; });
  }
  function trendSVG(pts, color, w, h) {
    w = w || 320; h = h || 90; if (pts.length < 2) return '';
    var vals = pts.map(function (p) { return p.val; }); var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals); var rng = mx - mn || 1;
    var step = (w - 20) / (pts.length - 1);
    var d = pts.map(function (p, i) { var x = 10 + i * step, y = h - 14 - (p.val - mn) / rng * (h - 28); return (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }).join(' ');
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:8px"><path d="' + d + '" fill="none" stroke="' + (color || '#34d399') + '" stroke-width="2"/>' +
      '<text x="10" y="12" fill="#94a3b8" font-size="9">' + mx + ' €/mp</text><text x="10" y="' + (h - 3) + '" fill="#94a3b8" font-size="9">' + mn + ' €/mp · 12 luni</text></svg>';
  }

  // ── UI ──
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(680px,96vw);max-height:93vh;overflow:auto;border:1px solid rgba(52,211,153,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:16px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#10b981,#059669);color:#fff;border:0;border-radius:9px;padding:10px 15px;font-weight:700;cursor:pointer;font-size:13px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#6ee7b7;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  function card(b, s, c) { return '<div style="flex:1;min-width:80px;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:' + (c || '#6ee7b7') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
  function _uats() { var a = load(); var u = []; a.forEach(function (t) { if (u.indexOf(t.uat) < 0) u.push(t.uat); }); return u; }

  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">📈 Market Intelligence imobiliar</div><div style="font-size:11px;color:#94a3b8">Prețuri €/mp · trend 3/12 luni · pipeline ofertă · comparare UAT</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    body.appendChild(el('div', { style: 'font-size:11px;border-radius:8px;padding:8px 10px;margin-bottom:8px;background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.3);color:#fbbf24' }, '⚠ <b>Date demonstrative.</b> Tranzacțiile reale (ANCPI eTranzacții) = Faza 2 (server). Poți adăuga tranzacții manual mai jos.'));
    // selectoare
    var g = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px' });
    var uatSel = el('select', { style: ST.inp }); _uats().forEach(function (u) { uatSel.appendChild(el('option', { value: u }, u)); });
    var typeSel = el('select', { style: ST.inp }); Object.keys(TYPES).forEach(function (t) { typeSel.appendChild(el('option', { value: t }, TYPES[t])); });
    g.appendChild(uatSel); g.appendChild(typeSel); body.appendChild(g);
    var out = el('div', { style: 'margin-top:10px' }); body.appendChild(out);
    function refresh() {
      var s = snapshot(uatSel.value, typeSel.value);
      if (!s.count) { out.innerHTML = '<div style="color:#64748b;font-size:12px">Nicio tranzacție pentru această combinație.</div>'; return; }
      var chCol = function (v) { return v > 0 ? '#34d399' : v < 0 ? '#f87171' : '#94a3b8'; };
      out.innerHTML = '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">' +
        card(s.median_m2_eur + ' €/mp', 'mediană (' + s.median_m2_ron + ' RON)', '#34d399') +
        card(s.min_m2_eur + '–' + s.max_m2_eur, 'interval €/mp') +
        card((s.change_3m_pct >= 0 ? '+' : '') + s.change_3m_pct + '%', 'variație 3 luni', chCol(s.change_3m_pct)) +
        card((s.change_12m_pct >= 0 ? '+' : '') + s.change_12m_pct + '%', 'variație 12 luni', chCol(s.change_12m_pct)) + '</div>' +
        trendSVG(trend(uatSel.value, typeSel.value), '#34d399') +
        '<div style="font-size:10px;color:#64748b;margin-top:6px">' + s.count + ' tranzacții · calitate date: ' + s.data_quality + '</div>';
    }
    uatSel.onchange = refresh; typeSel.onchange = refresh; refresh();
    // comparare UAT
    body.appendChild(el('div', { style: ST.label }, 'Comparare UAT (același tip)'));
    var cmp = el('div'); body.appendChild(cmp);
    function renderCmp() {
      var rows = _uats().map(function (u) { return { u: u, s: snapshot(u, typeSel.value) }; }).filter(function (r) { return r.s.count; });
      var best = Math.max.apply(null, rows.map(function (r) { return r.s.change_12m_pct; }));
      cmp.innerHTML = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr><th style="text-align:left;padding:3px;color:#94a3b8">UAT</th><th style="padding:3px;color:#94a3b8">€/mp</th><th style="padding:3px;color:#94a3b8">3 luni</th><th style="padding:3px;color:#94a3b8">12 luni</th></tr></thead><tbody>' +
        rows.map(function (r) { return '<tr style="border-top:1px solid rgba(255,255,255,.06)"><td style="padding:3px">' + r.u + '</td><td style="padding:3px;text-align:center;font-weight:700">' + r.s.median_m2_eur + '</td><td style="padding:3px;text-align:center;color:' + (r.s.change_3m_pct >= 0 ? '#34d399' : '#f87171') + '">' + (r.s.change_3m_pct >= 0 ? '+' : '') + r.s.change_3m_pct + '%</td><td style="padding:3px;text-align:center;font-weight:700;color:' + (r.s.change_12m_pct === best ? '#34d399' : '#cbd5e1') + '">' + (r.s.change_12m_pct >= 0 ? '+' : '') + r.s.change_12m_pct + '%</td></tr>'; }).join('') + '</tbody></table>';
    }
    var oldCh = typeSel.onchange; typeSel.onchange = function () { oldCh(); renderCmp(); }; renderCmp();
    // adaugare tranzactie
    body.appendChild(el('div', { style: ST.label }, 'Adaugă tranzacție (date reale, locale)'));
    var g2 = el('div', { style: 'display:grid;grid-template-columns:1.4fr 1fr 1fr 50px;gap:6px' });
    var aUat = el('input', { style: ST.inp, placeholder: 'UAT', value: uatSel.value });
    var aPpm = el('input', { style: ST.inp, type: 'number', placeholder: '€/mp' });
    var aArea = el('input', { style: ST.inp, type: 'number', placeholder: 'mp' });
    var aAdd = el('button', { style: ST.btn }, '+'); g2.appendChild(aUat); g2.appendChild(aPpm); g2.appendChild(aArea); g2.appendChild(aAdd); body.appendChild(g2);
    aAdd.onclick = function () { if (!aUat.value || !aPpm.value) return; transactions.add({ uat: aUat.value, type: typeSel.value, price_m2_eur: +aPpm.value, area_m2: +aArea.value || 60, months_ago: 0, source: 'manual' }); if (_uats().indexOf(aUat.value) >= 0 && !Array.prototype.slice.call(uatSel.options).some(function (o) { return o.value === aUat.value; })) uatSel.appendChild(el('option', { value: aUat.value }, aUat.value)); aPpm.value = ''; aArea.value = ''; refresh(); renderCmp(); };
    // PDF + disclaimer
    var pdf = el('button', { style: ST.btn + ';margin-top:12px' }, '📄 Raport piață (PDF)'); pdf.onclick = function () { generatePDF(uatSel.value, typeSel.value); }; body.appendChild(pdf);
    body.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:10px;border-top:1px solid rgba(255,255,255,.06);padding-top:8px' }, '⚖ Nu constituie consultanță financiară sau investițională (L.297/2004). Prețurile sunt agregate; fără date personale (GDPR L.190/2018). Sursa oficială = ANCPI/cărți funciare (date publice L.7/1996 art.51), integrare live = Faza 2.'));
    ov.appendChild(m); document.body.appendChild(ov);
  }

  function generatePDF(uat, type) {
    try {
      var jsPDFns = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF; if (!jsPDFns) { alert('jsPDF indisponibil'); return; }
      var pdf = new jsPDFns({ unit: 'mm', format: 'a4' }); if (G._registerROFont) G._registerROFont(pdf);
      var x = 16, y = 22, s = snapshot(uat, type);
      pdf.setFontSize(9); pdf.setTextColor(120); pdf.text('UrbanX · Market Intelligence imobiliar (date demonstrative)', x, 13);
      pdf.setFontSize(17); pdf.setTextColor(20); pdf.text('Raport de piață — ' + (TYPES[type] || type) + ', ' + uat, x, y); y += 10;
      if (s.count) {
        pdf.setFontSize(11); pdf.setTextColor(60);
        pdf.text('Preț median: ' + s.median_m2_eur + ' €/mp (' + s.median_m2_ron + ' RON/mp)', x, y); y += 6;
        pdf.text('Interval: ' + s.min_m2_eur + '–' + s.max_m2_eur + ' €/mp · medie ' + s.avg_m2_eur + ' €/mp', x, y); y += 6;
        pdf.text('Variație: ' + (s.change_3m_pct >= 0 ? '+' : '') + s.change_3m_pct + '% (3 luni) · ' + (s.change_12m_pct >= 0 ? '+' : '') + s.change_12m_pct + '% (12 luni)', x, y); y += 6;
        pdf.text('Eșantion: ' + s.count + ' tranzacții · calitate: ' + s.data_quality, x, y); y += 10;
      } else { pdf.setFontSize(11); pdf.setTextColor(120); pdf.text('Fără tranzacții pentru această combinație.', x, y); y += 10; }
      pdf.setFontSize(8); pdf.setTextColor(150);
      var lines = pdf.splitTextSize ? pdf.splitTextSize('Date demonstrative. Nu constituie consultanță financiară sau investițională (Legea 297/2004). Prețuri agregate, fără date personale (GDPR). Sursa oficială: ANCPI / cărți funciare (date publice Legea 7/1996 art. 51) — integrare live = Faza 2.', 178) : [];
      pdf.text(lines, x, 270);
      pdf.save('Raport_piata_' + (type || '') + '_' + (uat || '').replace(/[^\w]+/g, '_') + '.pdf');
    } catch (e) { console.warn('[Market] PDF', e); alert('Eroare PDF: ' + e.message); }
  }

  G.Market = { transactions: transactions, snapshot: snapshot, trend: trend, openPanel: openPanel, generatePDF: generatePDF, TYPES: TYPES, CURS: CURS };
  console.log('[Market] Market Intelligence încărcat (window.Market)');
})(window);
