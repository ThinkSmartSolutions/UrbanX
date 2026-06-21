/* ============================================================================
 * UrbanX — Plăți online taxe urbanistice (WAVE 1-D). Calculator de taxe (CU/AC/PUZ),
 * checkout MOCK + chitanță PDF. Singurul modul nou din val 1 (Dosar/Sesizări/
 * Notificări existau deja). Deblochează CAU la confirmare (concept).
 * window.Plati: calcFee · payments · checkout · receiptPDF · openPanel
 * ONEST: integrarea reală Netopia/Stripe + webhook HMAC + reconciliere fiscală =
 * Faza 2 (server + persoană juridică). Aici e simulare cu banner clar.
 * Surse: Legea 50/1991 art.30 (taxa AC = 0.5% valoare) · Legea 227/2015 (Cod Fiscal,
 *  taxe locale + chitanță) · OUG 98/2017 (servicii online primării >50k loc).
 * ========================================================================== */
(function (G) {
  'use strict';
  var FEES = {
    taxa_cu: { label: 'Certificat de urbanism (CU)', def: 50, min: 50, max: 500, legal: 'Legea 227/2015 (taxă locală, HCL)' },
    taxa_ac: { label: 'Autorizație de construire (AC)', pct: 0.005, min: 50, max: 100000, legal: 'Legea 50/1991 art. 30 (0,5% din valoarea autorizată)' },
    taxa_puz: { label: 'Aviz/taxă PUZ', def: 1000, min: 100, max: 10000, legal: 'taxă locală configurabilă (HCL)' },
    taxa_copii: { label: 'Taxă copii documente', def: 30, min: 10, max: 200, legal: 'Legea 544/2001' },
    taxa_prelungire: { label: 'Prelungire CU/AC', def: 30, min: 20, max: 250, legal: 'Legea 50/1991' }
  };
  // taxa AC = valoare lucrări × 0.5%, plafonată; restul = fix/configurabil
  function calcFee(type, opts) {
    opts = opts || {}; var f = FEES[type]; if (!f) return null;
    var amount;
    if (f.pct != null) { amount = Math.round((+opts.valoare_lucrari || 0) * f.pct); }
    else { amount = +opts.amount || f.def; }
    amount = Math.max(f.min, Math.min(f.max, amount));
    return { type: type, label: f.label, amount: amount, legal: f.legal, basis: f.pct != null ? ('0,5% × ' + (+opts.valoare_lucrari || 0).toLocaleString('ro-RO') + ' RON valoare lucrări (plafon ' + f.min + '–' + f.max + ')') : ('taxă ' + (opts.amount ? '(setată)' : 'standard') + ' ' + f.min + '–' + f.max + ' RON') };
  }

  // ── nr → litere (RON) ──
  function n2w(n) {
    n = Math.round(n); if (n === 0) return 'zero';
    var U = ['', 'unu', 'doi', 'trei', 'patru', 'cinci', 'șase', 'șapte', 'opt', 'nouă'];
    var Uf = ['', 'una', 'două', 'trei', 'patru', 'cinci', 'șase', 'șapte', 'opt', 'nouă'];
    var T1 = ['zece', 'unsprezece', 'doisprezece', 'treisprezece', 'paisprezece', 'cincisprezece', 'șaisprezece', 'șaptesprezece', 'optsprezece', 'nouăsprezece'];
    var T = ['', '', 'douăzeci', 'treizeci', 'patruzeci', 'cincizeci', 'șaizeci', 'șaptezeci', 'optzeci', 'nouăzeci'];
    function sub1000(x, fem) {
      var s = '', h = Math.floor(x / 100), r = x % 100, ten = Math.floor(r / 10), u = r % 10;
      if (h) s += (h === 1 ? 'o sută' : (h === 2 ? 'două sute' : U[h] + ' sute')) + ' ';
      if (r >= 10 && r < 20) s += T1[r - 10];
      else { if (ten) s += T[ten] + (u ? ' și ' : ''); if (u) s += (fem ? Uf[u] : U[u]); }
      return s.trim();
    }
    var out = [];
    var mil = Math.floor(n / 1000000), th = Math.floor((n % 1000000) / 1000), rest = n % 1000;
    if (mil) out.push(mil === 1 ? 'un milion' : sub1000(mil) + ' milioane');
    if (th) out.push(th === 1 ? 'o mie' : (th === 2 ? 'două mii' : sub1000(th, true) + ' mii'));
    if (rest) out.push(sub1000(rest));
    return out.join(' ').trim();
  }

  var KEY = 'urbanx_plati_v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function save(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  var payments = {
    list: function () { return load(); },
    add: function (p) { var a = load(); p.id = 'pay' + Date.now(); p.receipt_no = 'CHT-' + new Date().getFullYear() + '-' + String(a.length + 1).padStart(6, '0'); a.push(p); save(a); return p; },
    remove: function (id) { save(load().filter(function (p) { return p.id !== id; })); }
  };

  // ── UI ──
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(560px,96vw);max-height:93vh;overflow:auto;border:1px solid rgba(34,197,94,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:16px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#16a34a,#15803d);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#86efac;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">💳 Plăți taxe urbanistice</div><div style="font-size:11px;color:#94a3b8">Calculator taxe (CU/AC/PUZ) + plată online + chitanță</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    body.appendChild(el('div', { style: 'font-size:11px;border-radius:8px;padding:8px 10px;margin-bottom:8px;background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.3);color:#fbbf24' }, '⚠ <b>Simulare.</b> Integrarea reală cu procesatorul de plăți (Netopia/Stripe) + webhook + reconciliere fiscală = Faza 2 (server + persoană juridică). Chitanța generată e demonstrativă.'));
    body.appendChild(el('div', { style: ST.label }, 'Calculează taxa'));
    var typeSel = el('select', { style: ST.inp }); Object.keys(FEES).forEach(function (k) { typeSel.appendChild(el('option', { value: k }, FEES[k].label)); });
    body.appendChild(typeSel);
    var valWrap = el('div', { style: 'margin-top:6px' }); valWrap.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin-bottom:3px' }, 'Valoarea autorizată a lucrărilor (RON) — doar pt AC'));
    var valI = el('input', { style: ST.inp, type: 'number', placeholder: 'ex. 800000' }); valWrap.appendChild(valI); body.appendChild(valWrap);
    var out = el('div', { style: 'margin-top:10px' }); body.appendChild(out);
    var last = null;
    function calc() { var t = typeSel.value; last = calcFee(t, { valoare_lucrari: +valI.value }); valWrap.style.display = (FEES[t].pct != null) ? '' : 'none'; out.innerHTML = '<div style="background:#0a1120;border:1px solid rgba(34,197,94,.3);border-radius:10px;padding:12px;text-align:center"><div style="font-size:26px;font-weight:900;color:#34d399">' + last.amount.toLocaleString('ro-RO') + ' RON</div><div style="font-size:11px;color:#94a3b8;margin-top:3px">' + last.label + '</div><div style="font-size:10px;color:#64748b;margin-top:4px">' + last.basis + ' · ' + last.legal + '</div></div>'; }
    typeSel.onchange = calc; valI.oninput = calc; calc();
    // checkout
    body.appendChild(el('div', { style: ST.label }, 'Date plătitor'));
    var g = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:6px' });
    var nm = el('input', { style: ST.inp, placeholder: 'Nume / Denumire' });
    var em = el('input', { style: ST.inp, placeholder: 'Email' });
    var cnp = el('input', { style: ST.inp, placeholder: 'CNP / CUI' });
    var uat = el('input', { style: ST.inp, placeholder: 'UAT beneficiar', value: (G.TCI && G.TCI.cityName) || 'Primăria' });
    g.appendChild(nm); g.appendChild(em); g.appendChild(cnp); g.appendChild(uat); body.appendChild(g);
    var pay = el('button', { style: ST.btn + ';margin-top:12px' }, '💳 Simulează plata'); body.appendChild(pay);
    var payOut = el('div', { style: 'margin-top:10px' }); body.appendChild(payOut);
    pay.onclick = function () {
      if (!last) return; if (!nm.value.trim()) { payOut.innerHTML = '<div style="color:#fca5a5;font-size:12px">Completează numele plătitorului.</div>'; return; }
      var p = payments.add({ type: last.type, label: last.label, amount: last.amount, payer: nm.value, email: em.value, cnp: cnp.value, uat: uat.value, status: 'paid', date: new Date().toLocaleDateString('ro-RO') });
      payOut.innerHTML = '<div style="background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.4);border-radius:10px;padding:10px;font-size:12px;color:#86efac">✓ Plată confirmată (simulată) · chitanță <b>' + p.receipt_no + '</b> · ' + p.amount.toLocaleString('ro-RO') + ' RON</div>';
      var dl = el('button', { style: ST.ghost + ';margin-top:8px' }, '🧾 Descarcă chitanță PDF'); dl.onclick = function () { receiptPDF(p); }; payOut.appendChild(dl);
    };
    // istoric
    var hist = load();
    if (hist.length) { body.appendChild(el('div', { style: ST.label }, 'Plăți anterioare (' + hist.length + ')')); var hl = el('div'); body.appendChild(hl); hl.innerHTML = hist.slice(-6).reverse().map(function (p) { return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span>' + p.receipt_no + ' · ' + p.label + '</span><span style="font-weight:700;color:#34d399">' + p.amount.toLocaleString('ro-RO') + ' RON</span></div>'; }).join(''); }
    body.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:10px;border-top:1px solid rgba(255,255,255,.06);padding-top:8px' }, '⚖ Taxa AC = 0,5% din valoarea autorizată (L.50/1991 art.30). Plata confirmată deblochează emiterea în CAU (concept). Procesator real + chitanță fiscală cu CIF/IBAN UAT = Faza 2.'));
    ov.appendChild(m); document.body.appendChild(ov);
  }

  function receiptPDF(p) {
    try {
      var jsPDFns = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF; if (!jsPDFns) { alert('jsPDF indisponibil'); return; }
      var pdf = new jsPDFns({ unit: 'mm', format: 'a4' }); if (G._registerROFont) G._registerROFont(pdf);
      var x = 18, y = 24;
      pdf.setFontSize(9); pdf.setTextColor(120); pdf.text('UrbanX · Chitanță taxă urbanistică (demonstrativă) — Legea 227/2015', x, 13);
      pdf.setFontSize(18); pdf.setTextColor(20); pdf.text('CHITANȚĂ ' + p.receipt_no, x, y); y += 10;
      pdf.setFontSize(11); pdf.setTextColor(60);
      pdf.text('Beneficiar (UAT): ' + (p.uat || '—'), x, y); y += 6;
      pdf.text('Plătitor: ' + (p.payer || '—') + (p.cnp ? ' · CNP/CUI: ' + p.cnp : ''), x, y); y += 6;
      pdf.text('Reprezentând: ' + p.label, x, y); y += 6;
      pdf.text('Data: ' + (p.date || '') + '   ·   Stare: achitat (simulat)', x, y); y += 10;
      pdf.setFontSize(15); pdf.setTextColor(20); pdf.text('Suma: ' + p.amount.toLocaleString('ro-RO') + ' RON', x, y); y += 7;
      pdf.setFontSize(10); pdf.setTextColor(70); pdf.text('Adică: ' + n2w(p.amount) + ' lei', x, y); y += 12;
      pdf.setFontSize(8); pdf.setTextColor(150);
      var lines = pdf.splitTextSize ? pdf.splitTextSize('Document demonstrativ generat de UrbanX. Chitanța fiscală oficială (cu CIF, IBAN UAT, serie/număr fiscal) se emite de primărie prin sistemul de încasări, la integrarea reală a procesatorului de plăți (Faza 2). Conform Legii 227/2015 (Codul Fiscal) și Legii 50/1991 art. 30.', 174) : [];
      pdf.text(lines, x, 274);
      pdf.save(p.receipt_no + '.pdf');
    } catch (e) { console.warn('[Plati] PDF', e); alert('Eroare PDF: ' + e.message); }
  }

  G.Plati = { calcFee: calcFee, payments: payments, openPanel: openPanel, receiptPDF: receiptPDF, n2w: n2w, FEES: FEES };
  console.log('[Plati] modul plăți taxe urbanistice încărcat (window.Plati)');
})(window);
