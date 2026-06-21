/* ============================================================================
 * UrbanX — Coerență SIDU → PMUD → PUG.
 * SIDU = „constituția" orașului (10-15 ani). PMUD = componenta de mobilitate.
 * PUG = legea spațială. Insight cheie (SIDU.docx): SIDU/PMUD trebuie TRANSPUSE în
 * PUG ca să fie aplicabile — decalajul = blocajul real (benzi fără culoar →
 * exproprieri; ansambluri fără străzi în care intră autobuzul). Acest modul
 * verifică coerența și semnalează blocajele.
 * window.SIDU.openPanel() · check(answers)
 * ========================================================================== */
(function (G) {
  'use strict';
  var Q = [
    { k: 'sidu', t: 'Există o SIDU aprobată (strategia integrată pe 10-15 ani)?', gap: 'Fără SIDU, proiectele sunt punctuale, fără prioritizare și fără acces coerent la fonduri UE (POR).' },
    { k: 'pmud', t: 'Există PMUD aprobat și corelat cu SIDU?', gap: 'Fără PMUD corelat, transportul nu detaliază viziunea SIDU; finanțarea mobilității (POR/PNRR) e blocată.' },
    { k: 'culoare', t: 'PUG-ul rezervă culoare pentru proiectele PMUD (benzi dedicate, piste, lărgiri)?', gap: 'BLOCAJ real: dacă PUG nu are culoar rezervat, lărgirea/banda dedicată cere exproprieri masive — nu se poate autoriza.' },
    { k: 'metropolitan', t: 'Ansamblurile din zona metropolitană au străzi corelate cu PMUD (autobuzul poate intra/întoarce)?', gap: 'Străzi private prea înguste → autobuzul metropolitan nu intră fizic → ambuteiaje la intrările în oraș.' },
    { k: 'transpunere', t: 'Proiectele prioritare SIDU sunt transpuse în RLU/PUG (regim, retrageri, culoare)?', gap: 'Proiectele SIDU/PMUD netranspuse în regulamentul de construire rămân doar pe hârtie / se contestă în instanță.' },
    { k: 'verde', t: 'Coridoarele verzi / malurile (ex. râu) au regim de protecție în PUG?', gap: 'Fără regim în PUG, coridoarele verzi propuse în SIDU pot fi construite/betonate — pierdute.' }
  ];
  function check(ans) {
    ans = ans || {};
    var gaps = Q.filter(function (q) { return ans[q.k] === false; });
    var yes = Q.filter(function (q) { return ans[q.k] === true; }).length;
    var score = Math.round(yes / Q.length * 100);
    return { score: score, gaps: gaps, verdict: score >= 80 ? 'coerent' : score >= 50 ? 'parțial — risc de blocaje' : 'necorelat — blocaje majore' };
  }

  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(660px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(96,165,250,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', btn: 'background:linear-gradient(180deg,#2563eb,#1d4ed8);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px'
  };
  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🏛 Coerență SIDU → PMUD → PUG</div><div style="font-size:11px;color:#94a3b8">Verifică dacă strategia e transpusă în legea spațială (altfel = blocaj)</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    body.appendChild(el('div', { style: 'background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:12px;font-size:12px;color:#cbd5e1;margin-bottom:12px' },
      '<b style="color:#60a5fa">SIDU</b> (viziune 10-15 ani) <span style="color:#d4af37">→</span> <b style="color:#60a5fa">PMUD</b> (mobilitate) <span style="color:#d4af37">→</span> <b style="color:#60a5fa">PUG</b> (lege spațială). <br>Niciunul nu dă autorizații — dar dacă proiectele SIDU/PMUD nu sunt <b>transpuse în PUG</b>, rămân pe hârtie. Ex. Iași: SIDU = 331 proiecte; decalajul cu PUG creează blocaje (Podu Roș, benzi fără culoar, ansambluri în comune fără străzi pt autobuz).'));
    var rows = el('div'); body.appendChild(rows);
    var ans = {};
    Q.forEach(function (q) {
      var row = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.05)' });
      row.appendChild(el('span', { style: 'font-size:12px;flex:1' }, q.t));
      var seg = el('div', { style: 'display:flex;gap:4px;flex-shrink:0' });
      ['DA', 'NU'].forEach(function (v) { var b = el('button', { style: ST.ghost + ';padding:4px 10px' }, v); b.onclick = function () { ans[q.k] = (v === 'DA'); seg.querySelectorAll('button').forEach(function (bb) { bb.style.background = 'rgba(255,255,255,.06)'; bb.style.color = '#cbd5e1'; }); b.style.background = v === 'DA' ? 'rgba(34,197,94,.25)' : 'rgba(239,68,68,.25)'; b.style.color = v === 'DA' ? '#34d399' : '#f87171'; }; seg.appendChild(b); });
      row.appendChild(seg); rows.appendChild(row);
    });
    var run = el('button', { style: ST.btn + ';margin-top:14px' }, '▶ Evaluează coerența'); body.appendChild(run);
    var out = el('div', { style: 'margin-top:12px' }); body.appendChild(out);
    run.onclick = function () {
      var r = check(ans); var col = r.score >= 80 ? '#22c55e' : r.score >= 50 ? '#f59e0b' : '#ef4444';
      out.innerHTML = '<div style="text-align:center;margin-bottom:8px"><span style="font-size:28px;font-weight:900;color:' + col + '">' + r.score + '%</span> <span style="color:#94a3b8">coerență · ' + r.verdict + '</span></div>' +
        (r.gaps.length ? '<div style="font-size:11px;color:#fbbf24;font-weight:700;margin-bottom:4px">BLOCAJE IDENTIFICATE</div>' + r.gaps.map(function (g2) { return '<div style="font-size:12px;padding:5px 8px;margin-bottom:4px;background:#0a1120;border-left:3px solid #ef4444;border-radius:5px"><b>' + g2.t.replace(/\?$/, '') + '</b><br><span style="color:#94a3b8">' + g2.gap + '</span></div>'; }).join('') : '<div style="color:#34d399;font-size:13px">✓ Strategia e transpusă coerent în legea spațială — risc minim de blocaje.</div>') +
        '<div style="font-size:10px;color:#64748b;margin-top:8px">Cadru de coerență (SIDU→PMUD→PUG). Lista completă de proiecte SIDU per UAT + corelarea geometrică în PUG = etapă cu date (Faza 2).</div>';
    };
    ov.appendChild(m); document.body.appendChild(ov);
  }
  G.SIDU = { check: check, openPanel: openPanel, Q: Q };
  console.log('[SIDU] coerență SIDU→PMUD→PUG încărcat (window.SIDU)');
})(window);
