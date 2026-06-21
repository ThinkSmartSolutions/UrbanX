/* ============================================================================
 * UrbanX Portfolio Due Diligence (Modul 16) — engine + UI + PDF, client-side.
 * DD urbanistic automat pe un portofoliu de parcele (bănci/fonduri): agregă
 * Dosarul Digital al fiecărei parcele + scor + red flags + sumar portofoliu.
 * Înlocuiește săptămâni de muncă manuală de avocat/consultant. Model: Drooms, CBRE DD.
 *
 * window.Portfolio: registry · analyze · openPanel · generatePDF
 * ONEST: foloseste datele UrbanX (cadastru/PUG/CAU/Sesizări/Heritage). Scoruri
 * indicative; verificarea juridică finală (CF, sarcini, litigii) = ANCPI/avocat.
 * ========================================================================== */
(function (G) {
  'use strict';
  var RKEY = 'urbanx_portfolio_v1';
  function load() { try { return JSON.parse(localStorage.getItem(RKEY) || '[]'); } catch (e) { return []; } }
  function save(a) { try { localStorage.setItem(RKEY, JSON.stringify(a)); } catch (e) {} }
  var registry = {
    list: function () { return load(); },
    add: function (p) { var a = load(); if (a.some(function (x) { return x.nrcad === p.nrcad; })) return null; p.added_at = Date.now(); a.push(p); save(a); return p; },
    remove: function (nrcad) { save(load().filter(function (x) { return x.nrcad !== nrcad; })); },
    clear: function () { save([]); }
  };

  function analyze() {
    var items = load().map(function (p) {
      var d = (G.Dosar && G.Dosar.aggregate) ? G.Dosar.aggregate(p) : null;
      var nearHeritage = 0; try { if (G.Heritage && p.centroid) nearHeritage = G.Heritage.checkProximity(p.centroid, 100).length; } catch (e) {}
      var flags = [];
      if (d) { if (d.score < 50) flags.push('scor conformitate scăzut'); if (d.open_sesizari) flags.push(d.open_sesizari + ' sesizare deschisă'); }
      if (nearHeritage) flags.push('lângă monument (constrângeri)');
      if ((p.area || 0) < 300) flags.push('parcelă mică');
      return { nrcad: p.nrcad, area: p.area || 0, utr: p.utr, score: d ? d.score : null, open_sesizari: d ? d.open_sesizari : 0, near_heritage: nearHeritage, autorizatii: d ? d.autorizatii.length : 0, flags: flags };
    });
    var n = items.length;
    var scored = items.filter(function (x) { return x.score != null; });
    var avg = scored.length ? Math.round(scored.reduce(function (s, x) { return s + x.score; }, 0) / scored.length) : null;
    return {
      items: items, count: n, avg_score: avg,
      total_area: items.reduce(function (s, x) { return s + (x.area || 0); }, 0),
      flagged: items.filter(function (x) { return x.flags.length; }).length,
      with_sesizari: items.filter(function (x) { return x.open_sesizari; }).length,
      near_heritage: items.filter(function (x) { return x.near_heritage; }).length
    };
  }

  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(700px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(245,158,11,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', btn: 'background:linear-gradient(180deg,#f59e0b,#d97706);color:#0a0a0a;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px'
  };
  function activeParcel() { try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; var centroid = null; try { if (ap.geo && G.turf) centroid = G.turf.centerOfMass(ap.geo).geometry.coordinates; } catch (e) {} return { nrcad: ap.nrcad, area: ap.area, utr: ap.utr, params: ap.params, centroid: centroid, geo: ap.geo, source: ap.source, zoneLabel: ap.zoneLabel }; } } catch (e) {} return null; }

  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🏦 Portfolio Due Diligence</div><div style="font-size:11px;color:#94a3b8">DD urbanistic pe portofoliu de parcele · bănci/fonduri</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    var ap = activeParcel();
    var addBtn = el('button', { style: ST.ghost }, ap ? ('➕ Adaugă parcela selectată (CF ' + (ap.nrcad || '—') + ')') : '➕ Selectează o parcelă pe hartă');
    addBtn.onclick = function () { if (ap) { var r = registry.add(ap); render(); if (!r) G.ss && ss('Parcela e deja în portofoliu'); } };
    body.appendChild(addBtn);
    var content = el('div', { style: 'margin-top:12px' }); body.appendChild(content);
    var pdfBtn = el('button', { style: ST.btn + ';display:none;margin-top:12px' }, '⬇ Raport DD (PDF)'); body.appendChild(pdfBtn);
    var lastA = null;
    function render() {
      var a = analyze(); lastA = a;
      if (!a.count) { content.innerHTML = '<div style="font-size:12px;color:#64748b">Portofoliu gol. Adaugă parcele (selectează pe hartă → „Adaugă").</div>'; pdfBtn.style.display = 'none'; return; }
      function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:800;color:' + (c || '#fbbf24') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
      var html = '<div style="display:flex;gap:8px;margin-bottom:10px">' + card(a.count, 'parcele') + card((a.avg_score != null ? a.avg_score : '—'), 'scor mediu', a.avg_score >= 70 ? '#22c55e' : a.avg_score >= 50 ? '#f59e0b' : '#ef4444') + card(a.flagged, 'cu red flags', a.flagged ? '#f87171' : '#22c55e') + card(Math.round(a.total_area).toLocaleString('ro-RO'), 'mp total') + '</div>';
      a.items.forEach(function (it) {
        var sc = it.score == null ? '#94a3b8' : it.score >= 70 ? '#22c55e' : it.score >= 50 ? '#f59e0b' : '#ef4444';
        var row = el('div', { style: 'background:#0a1120;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:9px;margin-bottom:6px' });
        row.innerHTML = '<div style="display:flex;justify-content:space-between"><span style="font-weight:700">CF ' + (it.nrcad || '—') + ' <span style="color:#64748b">· ' + Math.round(it.area).toLocaleString('ro-RO') + ' mp · UTR ' + (it.utr || '—') + '</span></span><span style="color:' + sc + ';font-weight:800">' + (it.score != null ? it.score + '/100' : '—') + '</span></div>' +
          (it.flags.length ? '<div style="font-size:11px;color:#f87171;margin-top:3px">⚠ ' + it.flags.join(' · ') + '</div>' : '<div style="font-size:11px;color:#34d399;margin-top:3px">✓ fără red flags</div>');
        var d = el('button', { style: ST.ghost + ';margin-top:6px;padding:2px 8px' }, '✕ scoate'); d.onclick = function () { registry.remove(it.nrcad); render(); };
        row.appendChild(d); content.appendChild(row);
      });
      content.insertAdjacentHTML('afterbegin', html);
      pdfBtn.style.display = '';
    }
    content.innerHTML = ''; render();
    pdfBtn.onclick = function () { if (lastA) generatePDF(lastA); };
    ov.appendChild(m); document.body.appendChild(ov);
  }

  function generatePDF(a) {
    var Jc = (typeof jsPDF !== 'undefined') ? jsPDF : (window.jspdf && window.jspdf.jsPDF) || window.jsPDF; if (!Jc) return;
    var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' }); try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var F = 'DejaVuRO', W = 210, H = 297, today = new Date().toLocaleDateString('ro-RO'); var N = function (x) { return Math.round(x).toLocaleString('ro-RO'); };
    pdf.setFillColor(8, 15, 35); pdf.rect(0, 0, W, 26, 'F'); pdf.setFillColor(245, 158, 11); pdf.rect(0, 0, W, 3, 'F');
    pdf.setTextColor(251, 191, 36); pdf.setFont(F, 'bold'); pdf.setFontSize(8); pdf.text('URBANX · PORTFOLIO DUE DILIGENCE', W / 2, 10, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(14); pdf.text('Raport DD urbanistic — portofoliu', W / 2, 19, { align: 'center' });
    pdf.setTextColor(200, 180, 140); pdf.setFontSize(8); pdf.text(a.count + ' parcele · scor mediu ' + (a.avg_score != null ? a.avg_score : '—') + '/100 · ' + today, W / 2, 24, { align: 'center' });
    var y = 36; pdf.setTextColor(90, 100, 120); pdf.setFont(F, 'normal'); pdf.setFontSize(9);
    pdf.text('Total: ' + N(a.total_area) + ' mp · ' + a.flagged + ' parcele cu red flags · ' + a.with_sesizari + ' cu sesizări · ' + a.near_heritage + ' lângă monumente', 14, y); y += 8;
    // tabel
    pdf.setFillColor(14, 26, 54); pdf.rect(12, y, W - 24, 7, 'F'); pdf.setTextColor(251, 191, 36); pdf.setFont(F, 'bold'); pdf.setFontSize(7.5);
    ['CF', 'mp', 'UTR', 'Scor', 'Red flags'].forEach(function (hh, i) { pdf.text(hh, 14 + [0, 30, 55, 80, 105][i], y + 4.7); }); y += 7;
    a.items.forEach(function (it, ri) {
      if (ri % 2 === 0) { pdf.setFillColor(244, 247, 251); pdf.rect(12, y, W - 24, 7, 'F'); }
      pdf.setFont(F, 'normal'); pdf.setFontSize(7.2); pdf.setTextColor(30, 40, 60);
      pdf.text(String(it.nrcad || '—'), 14, y + 4.7); pdf.text(N(it.area), 14 + 30, y + 4.7); pdf.text(String(it.utr || '—'), 14 + 55, y + 4.7);
      pdf.setTextColor.apply(pdf, it.score == null ? [120, 120, 120] : it.score >= 70 ? [30, 140, 60] : it.score >= 50 ? [200, 130, 20] : [200, 60, 40]); pdf.setFont(F, 'bold');
      pdf.text(it.score != null ? it.score + '' : '—', 14 + 80, y + 4.7);
      pdf.setTextColor(180, 60, 40); pdf.setFont(F, 'normal'); pdf.setFontSize(6.6);
      pdf.text(pdf.splitTextToSize(it.flags.join(', ') || '—', W - 24 - 105), 14 + 105, y + 4.5); y += 7;
      if (y > H - 30) { pdf.addPage(); y = 20; }
    });
    var dy = H - 22; pdf.setFillColor(40, 30, 10); pdf.rect(12, dy, W - 24, 16, 'F'); pdf.setTextColor(251, 191, 36); pdf.setFont(F, 'normal'); pdf.setFontSize(7.5);
    pdf.text(pdf.splitTextToSize('Scoruri indicative din datele UrbanX (cadastru/PUG/CAU/Sesizări/Heritage). Verificarea juridică finală — extras CF actualizat, sarcini, ipoteci, litigii — se face la ANCPI/OCPI și de un avocat. Orientativ pentru pre-screening.', W - 30), W / 2, dy + 6, { align: 'center' });
    pdf.save('Portfolio_DD_' + new Date().toISOString().slice(0, 10) + '.pdf');
    G.ss && ss('✅ Raport DD portofoliu generat');
  }

  G.Portfolio = { registry: registry, analyze: analyze, openPanel: openPanel, generatePDF: generatePDF };
  console.log('[Portfolio] Portfolio DD încărcat (window.Portfolio)');
})(window);
