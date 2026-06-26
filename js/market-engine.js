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

  function _nf(n) { try { return Math.round(n).toLocaleString('ro-RO'); } catch (e) { return '' + n; } }

  // ── STUDIU GENUIN (≥10 pag) pe motorul strategic _makeStratDoc ─────────────
  function _marketStudy(uat, type) {
    var jsPDFns = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF;
    var pdf = new jsPDFns({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    var D = window._makeStratDoc(pdf, { docTitle: 'STUDIU DE PIAȚĂ IMOBILIARĂ', cityName: uat, accent: [16, 185, 129] });
    var W = 210, ML = D.dims.ML, CW = D.dims.CW, FONT = 'DejaVuRO', N = _nf;
    var s = snapshot(uat, type), tName = TYPES[type] || type;
    var allRows = _uats().map(function (u) { return { u: u, s: snapshot(u, type) }; }).filter(function (r) { return r.s.count; });
    var tr = trend(uat, type);

    // ── COPERTĂ ──
    D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
    pdf.setFillColor(6, 24, 18); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(16, 185, 129); pdf.rect(0, 60, W, 1.4, 'F');
    try { if (window._drawUrbanxLogo) { window._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
    pdf.setTextColor(110, 231, 183); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · MARKET INTELLIGENCE IMOBILIAR', W / 2, 44, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(24); pdf.text('STUDIU DE PIAȚĂ IMOBILIARĂ', W / 2, 90, { align: 'center' });
    pdf.setTextColor(110, 231, 183); pdf.setFontSize(14); pdf.text(D.S2(tName + ' · ' + uat), W / 2, 104, { align: 'center' });
    if (s.count) { pdf.setTextColor(150, 190, 170); pdf.setFontSize(11); pdf.text('Preț median ' + N(s.median_m2_eur) + ' €/mp · variație 12 luni ' + (s.change_12m_pct >= 0 ? '+' : '') + s.change_12m_pct + '%', W / 2, 116, { align: 'center' }); }
    D.setSuppress && D.setSuppress(false);

    D.chapter('1. Rezumat executiv');
    if (s.count) {
      D.P('Prezentul studiu analizează piața imobiliară pentru segmentul „' + tName + '" în ' + uat + ', pe baza unui eșantion de ' + N(s.count) + ' tranzacții. Prețul median observat este de ' + N(s.median_m2_eur) + ' €/mp (' + N(s.median_m2_ron) + ' RON/mp), cu un interval de ' + N(s.min_m2_eur) + '–' + N(s.max_m2_eur) + ' €/mp. Dinamica recentă indică o variație de ' + (s.change_3m_pct >= 0 ? '+' : '') + s.change_3m_pct + '% pe ultimele 3 luni și ' + (s.change_12m_pct >= 0 ? '+' : '') + s.change_12m_pct + '% pe 12 luni.');
      D.callout && D.callout('Concluzie de piață', 'Segmentul „' + tName + '" în ' + uat + ' se află într-o fază ' + (s.change_12m_pct > 5 ? 'de creștere susținută' : s.change_12m_pct > 0 ? 'de creștere moderată' : s.change_12m_pct < -5 ? 'de corecție' : 'de stabilizare') + '. Prețurile sunt agregate și au caracter informativ; nu constituie consultanță de investiții.');
    } else {
      D.P('Nu există tranzacții înregistrate pentru combinația „' + tName + '" în ' + uat + ' la momentul raportului. Studiul prezintă cadrul metodologic și contextul de piață aplicabil; indicatorii sintetici se vor completa pe măsura colectării de tranzacții.');
    }

    D.chapter('2. Metodologie');
    D.P('Analiza folosește mediana prețului unitar (€/mp) ca indicator principal de tendință centrală, întrucât este robustă la valori extreme — spre deosebire de medie, care este distorsionată de tranzacții atipice (proprietăți de lux sau vânzări sub presiune). Indicatorii calculați: mediana, media aritmetică, intervalul min–max, și variațiile procentuale pe 3 și 12 luni (comparând mediana tranzacțiilor recente cu cea a perioadelor anterioare). Conversia €↔RON folosește un curs orientativ de ' + CURS.toFixed(1) + ' RON/€; evaluările oficiale folosesc cursul BNR din ziua evaluării.');
    D.formula && D.formula('Variația prețului median', 'Δ% = (Med_recent − Med_anterior) / Med_anterior × 100', 'Med = mediana €/mp pe fereastra temporală respectivă');
    D.P('Pentru segmentarea temporală, tranzacțiile se grupează în ferestre (0–3 luni „recent", 3–6 luni, ≥9 luni „acum un an"), iar variațiile se calculează între mediane de fereastră. Această abordare reduce zgomotul lunar și surprinde tendința reală, evitând concluziile bazate pe o singură lună atipică.');

    D.chapter('3. Surse de date și cadru legal');
    D.P('Datele de tranzacții provin, în varianta de producție, din registrele publice ANCPI (eTranzacții / cărți funciare), accesibile conform Legii 7/1996 art. 51 privind caracterul public al cărții funciare. Prețurile sunt agregate statistic, fără date personale (nume, CNP), în conformitate cu GDPR și Legea 190/2018 — se publică doar valori unitare și indicatori derivați, niciodată tranzacții nominale.');
    D.callout && D.callout('Transparență privind datele', s.data_quality === 'demonstrativ' ? 'Eșantionul curent este DEMONSTRATIV (seed). Integrarea live ANCPI eTranzacții este prevăzută ca Faza 2 (componentă server). Indicatorii ilustrează metodologia, nu valori de piață validate.' : 'Eșantionul include tranzacții reale introduse local; calitatea datelor: ' + s.data_quality + '.');
    D.source && D.source('ANCPI · Legea 7/1996 art.51 · GDPR / Legea 190/2018 · curs BNR');

    D.chapter('4. Contextul pieței imobiliare din România');
    D.P('Piața imobiliară românească este caracterizată de eterogenitate teritorială accentuată: polii de creștere (Cluj-Napoca, București, Timișoara, Iași, Brașov) concentrează cererea și înregistrează cele mai ridicate valori și ritmuri de apreciere, în timp ce orașele mici și mediul rural rămân la valori semnificativ mai joase. Cererea este susținută de urbanizare, de fluxul de forță de muncă către poli și de rolul imobiliarului ca refugiu pentru economii într-un context inflaționist.');
    D.P('Oferta nouă este sensibilă la costul materialelor și al finanțării, iar autorizarea (PUZ/autorizație de construire) introduce decalaje de 1–3 ani între semnalul de preț și livrarea de stoc nou. Această inelasticitate pe termen scurt amplifică volatilitatea prețurilor în fazele de cerere ridicată. Creditul ipotecar și nivelul dobânzilor sunt determinanți macro majori ai accesibilității și, implicit, ai cererii efective.');

    D.chapter('5. Indicatori sintetici de piață');
    if (s.count) {
      D.table && D.table(['Indicator', 'Valoare'], [
        ['Preț median', N(s.median_m2_eur) + ' €/mp  (' + N(s.median_m2_ron) + ' RON/mp)'],
        ['Preț mediu', N(s.avg_m2_eur) + ' €/mp'],
        ['Interval (min–max)', N(s.min_m2_eur) + ' – ' + N(s.max_m2_eur) + ' €/mp'],
        ['Variație 3 luni', (s.change_3m_pct >= 0 ? '+' : '') + s.change_3m_pct + '%'],
        ['Variație 12 luni', (s.change_12m_pct >= 0 ? '+' : '') + s.change_12m_pct + '%'],
        ['Eșantion', N(s.count) + ' tranzacții · calitate: ' + s.data_quality],
      ], [CW * 0.42, CW * 0.58]);
      D.P('Diferența dintre mediană (' + N(s.median_m2_eur) + ' €/mp) și medie (' + N(s.avg_m2_eur) + ' €/mp) indică ' + (s.avg_m2_eur > s.median_m2_eur * 1.05 ? 'o asimetrie spre dreapta — câteva tranzacții de valoare ridicată trag media în sus, mediana fiind mai reprezentativă pentru tranzacția tipică.' : 'o distribuție relativ simetrică, cei doi indicatori fiind apropiați.'));
    } else { D.P('Indicatorii sintetici se completează la colectarea tranzacțiilor.'); }

    D.chapter('6. Analiza trendului pe 12 luni');
    if (D.lineChart && tr.length >= 2) {
      try { D.lineChart([{ name: tName, color: [16, 185, 129], points: tr.map(function (p) { return p.val; }) }], tr.map(function (p) { return 'L-' + p.m; }), { title: 'Evoluția prețului median €/mp (12 luni)', h: 52, source: 'Mediană lunară pe eșantionul disponibil' }); } catch (e) {}
    }
    D.P('Trendul lunar al medianei surprinde dinamica recentă a segmentului. Un trend ascendent susținut indică presiune a cererii sau ofertă insuficientă; aplatizarea sau corecția pot semnala saturarea cererii la nivelul de preț atins, ori înăsprirea condițiilor de creditare. Interpretarea trendului trebuie corelată cu volumul tranzacțiilor: o creștere de preț pe volum în scădere este mai fragilă decât una pe volum în creștere.');

    D.chapter('7. Comparație între UAT-uri');
    if (D.table && allRows.length) {
      D.table(['UAT', '€/mp median', '3 luni', '12 luni'], allRows.map(function (r) {
        return [r.u, N(r.s.median_m2_eur), (r.s.change_3m_pct >= 0 ? '+' : '') + r.s.change_3m_pct + '%', (r.s.change_12m_pct >= 0 ? '+' : '') + r.s.change_12m_pct + '%'];
      }), [CW * 0.34, CW * 0.24, CW * 0.21, CW * 0.21]);
    }
    if (D.barChart && allRows.length) {
      D.barChart(allRows.map(function (r, i) { return [r.u, r.s.median_m2_eur, i === 0 ? [16, 185, 129] : [148, 163, 184]]; }), { title: 'Preț median €/mp pe UAT (' + tName + ')', h: 46, source: 'Comparație inter-UAT, același segment' });
    }
    D.P('Comparația inter-UAT pe același segment evidențiază poziționarea relativă și ecartul de valoare între piețe. Diferențele reflectă nivelul de dezvoltare economică, presiunea demografică și atractivitatea fiecărui UAT. Ritmurile de variație (3 și 12 luni) arată unde se concentrează momentul de piață — un UAT cu creștere accelerată poate semnala atât oportunitate, cât și risc de supraîncălzire.');

    D.chapter('8. Factori determinanți ai prețului');
    D.P('Prețul unitar al unei proprietăți se formează din interacțiunea mai multor factori, a căror pondere estimată (pe baza literaturii de evaluare hedonică și a observațiilor de piață locale) este: localizare/accesibilitate ~40–50%, suprafață și calitatea/vechimea construcției ~20–25%, dotări de cartier (școli, comerț, transport public, spații verzi) ~15–20%, regimul urbanistic și potențialul edificabil (POT/CUT) ~10–15%.');
    D.bullets([
      'Localizare: distanța la centru, la noduri de transport și la dotări — corelată cu indicii Walk Score și Orașul-15-minute din platformă;',
      'Reglementare urbanistică: un CUT/POT mai permisiv crește valoarea terenului prin potențialul de dezvoltare;',
      'Infrastructură: proximitatea școlilor, spitalelor și transportului public adaugă primă de valoare;',
      'Calitatea construcției: an, materiale, eficiență energetică (certificatul energetic devine factor de preț).'
    ]);

    D.chapter('9. Cererea, oferta și echilibrul de piață');
    D.P('Prețul este rezultanta echilibrului dintre cerere (susținută de venituri, credit, demografie și așteptări) și ofertă (stocul existent plus pipeline-ul de proiecte autorizate). Pe termen scurt oferta este inelastică — construcția necesită ani — astfel încât șocurile de cerere se transmit direct în preț. Pe termen mediu, oferta nouă temperează creșterile, dacă autorizarea și infrastructura permit dezvoltarea.');
    D.P('Indicatori utili de monitorizare a echilibrului: numărul de autorizații de construire emise, stocul de locuințe nevândute, durata medie de expunere pe piață (time-on-market) și raportul preț cerut/preț tranzacționat. O durată de expunere în creștere și un discount preț cerut–tranzacționat în creștere anticipează încetinirea pieței înaintea ajustării prețului median.');

    D.chapter('10. Accesibilitatea locuirii (affordability)');
    D.P('Accesibilitatea măsoară raportul dintre prețul locuinței și veniturile gospodăriilor — un indicator-cheie al sustenabilității pieței. Indicatorul price-to-income (preț locuință / venit anual) și efortul lunar de rambursare a creditului raportat la venit (debt-service-to-income) determină câtă cerere efectivă poate susține piața la un nivel de preț dat.');
    D.formula && D.formula('Indice de accesibilitate', 'PIR = Preț_locuință / (Venit_mediu_anual_gospodărie)', 'PIR > 7–8 = piață scump accesibilă; PIR < 5 = accesibilă');
    D.P('Când prețurile cresc mai repede decât veniturile, accesibilitatea se deteriorează și cererea efectivă se restrânge — chiar dacă dorința de cumpărare persistă. Politica de creditare (avans, dobândă, programe guvernamentale tip „Noua Casă") modifică direct accesibilitatea și, prin ea, cererea. Un raport preț/venit ridicat și în creștere este un semnal de avertizare privind sustenabilitatea pe termen mediu.');

    D.chapter('11. Randamentul investițional și piața chiriilor');
    D.P('Pentru proprietățile de investiție, randamentul locativ brut (yield) este indicatorul central: raportul dintre chiria anuală și prețul de achiziție. El permite compararea imobiliarului cu alte clase de active și semnalează gradul de supra/subevaluare al pieței față de fundamentul ei locativ.');
    D.formula && D.formula('Randament locativ brut', 'Yield_brut = (Chirie_lunară × 12) / Preț_achiziție × 100', 'randament net scade costurile de administrare, vacanță și impozite');
    D.P('Un yield brut tipic pe piața rezidențială românească se situează în intervalul 5–7% pentru orașele mari, comprimându-se în zonele centrale scumpe (unde aprecierea capitalului compensează randamentul locativ mai mic). Un yield în scădere accentuată semnalează că prețurile cresc mai repede decât chiriile — un avertisment de supraevaluare relativă, întrucât valoarea se îndepărtează de fundamentul ei generator de venit.');

    D.chapter('12. Ciclul imobiliar și poziționarea');
    D.P('Piețele imobiliare urmează cicluri (expansiune → vârf → corecție → redresare) determinate de interacțiunea dintre credit, ofertă nouă și sentimentul de piață. Poziționarea în ciclu orientează deciziile: în expansiune timpurie randamentele ajustate la risc sunt favorabile; aproape de vârf, riscul de corecție crește. Variația pe 12 luni de ' + (s.count ? ((s.change_12m_pct >= 0 ? '+' : '') + s.change_12m_pct + '%') : 'n/a') + ' coroborată cu volumul și cu accesibilitatea ajută la localizarea aproximativă în ciclu.');
    D.P('Semnale de vârf de ciclu: accelerarea prețului decuplată de venituri, comprimarea yield-ului sub costul finanțării, creșterea ponderii cumpărătorilor speculativi și expansiunea agresivă a creditării. Semnale de redresare: stabilizarea volumelor, revenirea accesibilității și reluarea creditării după o perioadă de corecție.');

    D.chapter('13. Segmentarea pe tipuri de proprietate');
    D.P('Fiecare segment (apartament, casă, teren, comercial, birou) are dinamică proprie. Rezidențialul este cel mai lichid și mai sensibil la creditarea persoanelor fizice; terenul are volatilitate ridicată și este puternic dependent de reglementarea urbanistică (un teren cu PUZ aprobat și CUT ridicat valorează mult mai mult); comercialul și birourile depind de ciclul economic și de tendințele de muncă (remote/hibrid afectează cererea de birouri). Analiza pe segment evită concluziile eronate dintr-o medie agregată pe tipuri eterogene.');

    D.chapter('14. Legătura cu evaluarea ANEVAR / IVS');
    D.P('Indicatorii de piață din acest studiu alimentează abordarea prin comparație de piață (Sales Comparison Approach) din Standardele Internaționale de Evaluare (IVS) și standardele ANEVAR. Evaluatorul autorizat pornește de la prețuri de tranzacție comparabile, ajustate pentru diferențe (localizare, suprafață, stare, dată), pentru a estima valoarea de piață a unei proprietăți-țintă. Mediana și intervalul de preț pe segment oferă reperul de pornire și benzile de plauzibilitate.');
    D.P('Acest studiu NU substituie un raport de evaluare ANEVAR: nu individualizează proprietatea, nu aplică ajustări specifice și nu angajează responsabilitatea unui evaluator autorizat. Are rol de pre-analiză de piață și de orientare, conform disclaimerului final.');

    D.chapter('15. Impactul reglementărilor urbanistice asupra valorii');
    D.P('Regimul urbanistic (POT, CUT, regim de înălțime, funcțiuni admise) este un determinant major al valorii terenului: capacitatea edificabilă suplimentară se capitalizează direct în preț. O modificare de PUZ care crește CUT-ul poate genera un salt de valoare („plusvaloare urbanistică") — fenomen care fundamentează instrumentele de captare a plusvalorii (vezi studiul LVC al platformei). Invers, servituțile, zonele de protecție și restricțiile reduc valoarea.');
    D.P('Pentru investitori și administrații, corelarea hărții de valoare (studiul Hartă valori imobiliare al platformei) cu zonarea PUG identifică terenurile subutilizate semicentrale — oportunități de densificare cu beneficiu fiscal și de regenerare urbană.');

    D.chapter('16. Fiscalitate și costuri de tranzacționare');
    D.P('Costul total al unei tranzacții depășește prețul afișat: cumpărătorul suportă onorariul notarial, taxele de intabulare (OCPI/ANCPI) și, după caz, comisionul de agenție; vânzătorul suportă impozitul pe venitul din transferul proprietăților imobiliare (conform Codului Fiscal). Aceste costuri (orientativ 3–6% cumulat) afectează randamentul net al investiției și trebuie incluse în analiza de rentabilitate.');
    D.P('Impozitul local pe clădiri și terenuri, bazat pe valoarea impozabilă, leagă piața de finanțele publice locale: o piață cu valori în creștere extinde baza de impozitare și capacitatea administrației de a finanța servicii și infrastructură — care, la rândul lor, susțin valoarea (buclă de feedback pozitiv prin captarea plusvalorii).');

    D.chapter('17. Riscuri de piață');
    D.bullets([
      'Macroeconomic: creșterea dobânzilor și înăsprirea creditării reduc cererea efectivă;',
      'Supraevaluare: yield comprimat sub costul finanțării și preț decuplat de venituri;',
      'Lichiditate: în corecție, durata de vânzare crește și discounturile se adâncesc;',
      'Reglementar: schimbări de regim fiscal sau urbanistic pot reprețui rapid segmente întregi;',
      'Calitatea datelor: eșantion mic sau neechilibrat → indicatori instabili (vezi cap. 20).'
    ]);
    D.P('Gestionarea riscului presupune diversificare (segmente, localizări), marjă de siguranță în ipotezele de randament și monitorizarea indicatorilor de avertizare timpurie (accesibilitate, yield, volum, time-on-market) descriși mai sus.');

    D.chapter('18. Scenarii și prognoză (orizont 3 ani)');
    var base = s.count ? s.median_m2_eur : 1500;
    if (D.lineChart) {
      try {
        var yrs = [0, 1, 2, 3];
        D.lineChart([
          { name: 'Optimist (+6%/an)', color: [34, 197, 94], points: yrs.map(function (y) { return Math.round(base * Math.pow(1.06, y)); }) },
          { name: 'Moderat (+3%/an)', color: [234, 179, 8], points: yrs.map(function (y) { return Math.round(base * Math.pow(1.03, y)); }) },
          { name: 'Conservator (0%/an)', color: [148, 163, 184], points: yrs.map(function (y) { return Math.round(base * Math.pow(1.0, y)); }) },
        ], yrs.map(function (y) { return 'an+' + y; }), { title: 'Proiecție preț median €/mp — 3 scenarii', h: 52, source: 'Proiecție UrbanX · creștere compusă (orientativ)' });
      } catch (e) {}
    }
    D.P('Scenariile reflectă incertitudinea macroeconomică. Diferența de ritm anual se compune semnificativ pe trei ani: un ecart de 3 puncte procentuale/an generează o diferență de valoare de aproape 10% la final de orizont. Proiecțiile au caracter strict orientativ și nu reprezintă recomandări de investiție — vezi limitările.');

    D.chapter('19. Recomandări');
    D.bullets([
      'Pentru cumpărători/investitori: corelați prețul cu yield-ul și accesibilitatea, nu doar cu trendul; includeți costurile de tranzacționare în randamentul net;',
      'Pentru administrații: folosiți indicatorii pentru calibrarea valorilor impozabile și identificarea terenurilor subutilizate (densificare + bază fiscală);',
      'Pentru dezvoltatori: corelați segmentul și localizarea cu accesibilitatea cererii, nu doar cu prețul de vârf;',
      'Pentru toți: monitorizați volumul tranzacțiilor odată cu prețul — un preț în creștere pe volum în scădere este fragil.'
    ]);

    D.chapter('20. Calitatea datelor și limitări metodologice');
    D.P('Robustețea indicatorilor depinde de mărimea și reprezentativitatea eșantionului. Eșantioane mici (sub câteva zeci de tranzacții pe segment/perioadă) produc mediane instabile și variații procentuale zgomotoase. Sursa preferată este registrul ANCPI (prețuri efective de tranzacție); listările de pe portaluri reflectă prețuri CERUTE, sistematic mai mari decât cele tranzacționate. Eșantionul curent are calitatea „' + s.data_quality + '".');
    D.P('Alte limitări: agregarea pe UAT maschează diferențele intra-urbane (centru vs periferie); neajustarea pentru caracteristici (suprafață, etaj, stare) introduce eterogenitate; decalajul de înregistrare în CF poate întârzia reflectarea tranzacțiilor recente. Pentru evaluări individuale se impune metoda comparabilelor ajustate, realizată de evaluator autorizat.');

    D.chapter('21. Lichiditatea și volumul tranzacțional');
    D.P('Lichiditatea — ușurința cu care o proprietate poate fi vândută la un preț apropiat de valoarea de piață, într-un timp rezonabil — este o dimensiune adesea neglijată, dar critică. Prețul median spune cât valorează tranzacția tipică, dar nu și cât de ușor se realizează ea. Volumul tranzacțional (numărul de tranzacții pe perioadă) și durata medie de expunere pe piață (time-on-market) sunt indicatorii-cheie ai lichidității.');
    D.P('O piață lichidă (volum ridicat, expunere scurtă) validează prețurile observate: ele reflectă tranzacții efective, nu listări nerealizate. O piață în care prețul median crește dar volumul scade și durata de expunere se prelungește este o piață care se răcește sub aparența stabilității — semnalul de preț devine nereprezentativ pentru că tot mai puțini cumpărători acceptă nivelul atins. Pentru investitor, lichiditatea afectează direct strategia de ieșire (exit): o proprietate în segment puțin lichid necesită discount mai mare sau orizont de vânzare mai lung. Eșantionul curent de ' + (s.count ? N(s.count) : '0') + ' tranzacții oferă o primă indicație de lichiditate pentru segmentul analizat.');

    D.chapter('22. Benchmarking european și poziționare');
    D.P('Raportarea la piețele europene oferă perspectivă asupra potențialului de convergență. Prețurile imobiliare din orașele românești rămân, în general, sub media central- și vest-europeană pentru localități comparabile ca rol economic, ceea ce a susținut un proces de convergență („catch-up") pe fondul creșterii veniturilor și al integrării economice. Acest diferențial explică, parțial, ritmurile de apreciere superioare mediei UE observate în polii de creștere.');
    D.P('Totuși, convergența nu este garantată și nici uniformă: ea depinde de creșterea susținută a veniturilor reale, de stabilitatea macroeconomică și de calitatea infrastructurii și a guvernanței urbane. Indicatorii relativi (preț/venit, yield, preț raportat la costul de construcție) plasează o piață locală pe traiectoria de convergență și semnalează dacă aprecierea este susținută de fundamente sau de exuberanță. Compararea cu orașe-pereche din regiune (de exemplu poli regionali din Polonia, Ungaria, Cehia) rafinează această poziționare.');

    try { if (window.UrbanXIVU && window.UrbanXIVU.renderSection) window.UrbanXIVU.renderSection(D); } catch (e) {}
    D.chapter('23. Limitări și disclaimer');
    D.P('Studiu generat algoritmic (UrbanX Market Intelligence) pe date ' + (s.data_quality === 'demonstrativ' ? 'DEMONSTRATIVE (seed); integrarea ANCPI eTranzacții este Faza 2.' : 'agregate local.') + ' Prețurile sunt agregate, fără date personale (GDPR / Legea 190/2018). Documentul NU constituie consultanță financiară sau investițională (Legea 297/2004) și NU substituie un raport de evaluare ANEVAR/IVS întocmit de evaluator autorizat. Cifrele sunt orientative și necesită validare profesională.');

    D.chapter('24. Surse și standarde');
    D.P('ANCPI / cărți funciare (Legea 7/1996 art. 51 — date publice); GDPR / Legea 190/2018 (agregare, fără date personale); Standardele Internaționale de Evaluare (IVS) și standardele ANEVAR (abordarea prin comparație de piață); Codul Fiscal (impozit pe transfer și impozit local); curs BNR. Glosar: mediană = valoarea de mijloc; yield = randament locativ brut; PIR = price-to-income ratio; CUT/POT = coeficient/procent de utilizare a terenului. Metodologie UrbanX · ThinkSmart Solutions.');

    var fn = ('Studiu_piata_' + (type || '') + '_' + (uat || '').replace(/[^\w]+/g, '_') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[ăĂâÂîÎșȘşŞțȚţŢ]/g,function(c){return {'ă':'a','Ă':'A','â':'a','Â':'A','î':'i','Î':'I','ș':'s','Ș':'S','ş':'s','Ş':'S','ț':'t','Ț':'T','ţ':'t','Ţ':'T'}[c]||c;}).replace(/[ăĂâÂîÎșȘşŞțȚţŢ]/g,function(c){return {'ă':'a','Ă':'A','â':'a','Â':'A','î':'i','Î':'I','ș':'s','Ș':'S','ş':'s','Ş':'S','ț':'t','Ț':'T','ţ':'t','Ţ':'T'}[c]||c;}).replace(/[^a-zA-Z0-9._-]/g,'_');
    window._buildStratTOC && window._buildStratTOC(D, 1);
    pdf.save(fn); window.ss && ss('✅ Studiu de piață generat: ' + pdf.getNumberOfPages() + ' pagini'); return fn;
  }

  function generatePDF(uat, type) {
    if (typeof window._makeStratDoc === 'function') { try { return _marketStudy(uat, type); } catch (e) { console.error('[Market PDF]', e); } }
    return _genSimpleMarket(uat, type);
  }

  function _genSimpleMarket(uat, type) {
    try {
      var jsPDFns = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF; if (!jsPDFns) { alert('jsPDF indisponibil'); return; }
      var pdf = new jsPDFns({ unit: 'mm', format: 'a4' });
      var _F = (G._registerROFont && G._registerROFont(pdf)) ? 'DejaVuRO' : 'helvetica';
      pdf.setFont(_F, 'normal'); // FIX: fontul RO era inregistrat dar niciodata aplicat -> diacritice rupte
      var x = 16, y = 22, s = snapshot(uat, type);
      pdf.setFontSize(9); pdf.setTextColor(120); pdf.text('UrbanX · Market Intelligence imobiliar (date demonstrative)', x, 13);
      pdf.setFontSize(17); pdf.setTextColor(20); pdf.text('Raport de piață — ' + (TYPES[type] || type) + ', ' + uat, x, y); y += 10;
      if (s.count) {
        pdf.setFontSize(11); pdf.setTextColor(60);
        var _nfn = (window._nf || function(n){return ''+n;});
        pdf.text('Preț median: ' + _nfn(s.median_m2_eur) + ' €/mp (' + _nfn(s.median_m2_ron) + ' RON/mp)', x, y); y += 6;
        pdf.text('Interval: ' + _nfn(s.min_m2_eur) + '–' + _nfn(s.max_m2_eur) + ' €/mp · medie ' + _nfn(s.avg_m2_eur) + ' €/mp', x, y); y += 6;
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
