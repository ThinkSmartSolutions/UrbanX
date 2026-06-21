/* ============================================================================
 * UrbanX — Masterplan Ansamblu (lotizare ghidată, metodologie corectă).
 * NU pleacă de la POT/CUT+retrageri. Urmează ordinea de proiectare reală:
 *   1. Program funcțional  → 2. Accese (min 2, ISU)  → 3. Ierarhie stradală
 *   (colector→local→woonerf)  → 4. Separare fluxuri (grădiniță/comerț/biserică)
 *   → 5. Loturi/edificabil pe ce rămâne + verificări de aprobabilitate PUZ/PUD.
 * window.Ansamblu.plan(input) · openWizard()
 * Surse: practică urbanistică PUZ/PUD · Legea 24/2007 (verde) · GD 525/1996 (parcaje)
 * · NP 068/2002 (circulații) · Legea 50/1991 (ISU acces). Orientativ — schemă de
 * organizare + brief de proiectare; desenul final = proiectant atestat.
 * ========================================================================== */
(function (G) {
  'use strict';

  // norme orientative
  var OCC = { casa: 3.2, colectiv: 2.4 };       // locuitori/unitate (INS)
  var GREEN_PER_CAP = 8;                          // mp/loc (Legea 24/2007)
  var CIRC_PCT = 0.22;                            // cotă circulații (străzi+trotuare) din teren
  var LOT_CASA_MP = 350;                          // teren mediu/casă individuală
  var PARK = { casa: 1.5, colectiv: 1.2, comercial_per100: 4, gradinita_per100: 1 };
  // profile minime (m) — NP 068 orientativ
  var STREET = {
    colector: { w: 12, label: 'Colector principal', rol: 'coloana vertebrală; preia tot traficul; ISU/salubritate/livrări; trotuare ample + arbori' },
    local: { w: 8, label: 'Stradă locală rezidențială', rol: 'deservește casele; trafic redus; calmare; fără tranzit' },
    woonerf: { w: 5, label: 'Alee / woonerf / shared space', rol: 'acces punctual; prioritate pieton; fronturi calme' }
  };

  function plan(inp) {
    var area = +inp.area_m2 || 0;
    var pg = inp.program || {};
    var cIndiv = +pg.case_individuale || 0;
    var uColectiv = +pg.colectiv_units || 0;
    var comMp = +pg.comercial_mp || 0;
    var gradinita = !!pg.gradinita, biserica = !!pg.biserica;
    var parcMp = +pg.parc_mp || 0;
    var accese = +inp.accese || 1;
    var pot = +inp.pot || 35, cut = +inp.cut || 1.2;

    var pop = Math.round(cIndiv * OCC.casa + uColectiv * OCC.colectiv);
    var greenMin = Math.max(parcMp, Math.round(pop * GREEN_PER_CAP), Math.round(area * 0.05));
    var circ = Math.round(area * CIRC_PCT);
    var parcaje = Math.ceil(cIndiv * PARK.casa + uColectiv * PARK.colectiv + comMp / 100 * PARK.comercial_per100 + (gradinita ? 6 : 0));

    // teren rezidențial/edificabil rămas
    var echip = (gradinita ? 2500 : 0) + (biserica ? 1200 : 0) + (comMp ? Math.round(comMp / cut) : 0);
    var netResidential = Math.max(0, area - circ - greenMin - echip);
    var terenCase = cIndiv * LOT_CASA_MP;
    var fitsCase = terenCase <= netResidential;
    // densitate verificare: ADC total cerut vs CUT permis
    var adcCeruta = Math.round(uColectiv * 65 / 0.82 + cIndiv * 120 + comMp + (gradinita ? 800 : 0));
    var adcMax = Math.round(area * cut);
    var fitsCUT = adcCeruta <= adcMax;

    // ── ierarhie stradală sugerată ──
    var ierarhie = [
      { nivel: 1, tip: STREET.colector, deserveste: 'locuințe colective, comerț, (biserică)', lungime_est: Math.round(Math.sqrt(area) * 1.1) },
      { nivel: 2, tip: STREET.local, deserveste: 'zonele de case', lungime_est: Math.round(Math.sqrt(area) * 1.4) },
      { nivel: 3, tip: STREET.woonerf, deserveste: 'fronturi calme, parcări, acces local', lungime_est: Math.round(Math.sqrt(area) * 0.8) }
    ];

    // ── separarea fluxurilor — reguli de amplasare ──
    var amplasare = [];
    if (gradinita) amplasare.push({ f: 'Grădiniță', regula: 'lângă intrarea în ansamblu, cu zonă drop-off + întoarcere; trotuare sigure; NU obliga traversarea cartierului', flux: 'generator critic' });
    if (comMp) amplasare.push({ f: 'Comerț (' + comMp + ' mp)', regula: 'pe colectorul principal, aproape de acces; accesibilitate pietonală; NU în inima zonei de case', flux: 'opriri scurte + livrări' });
    if (biserica) amplasare.push({ f: 'Biserică', regula: 'parcare temporară pt evenimente (duminică/sărbători); fără blocarea circulației rezidențiale', flux: 'redus zilnic, mare ocazional' });
    if (uColectiv) amplasare.push({ f: 'Locuințe colective', regula: 'pe colector (trafic mai mare); parcaje în incintă/subsol', flux: 'mediu-mare' });
    if (cIndiv) amplasare.push({ f: 'Case individuale', regula: 'pe străzi locale liniștite, ferite de tranzit; viteze mici', flux: 'redus' });

    // ── verificări de aprobabilitate ──
    var checks = [];
    checks.push({ item: 'Minim 2 accese auto (redundanță + ISU)', ok: accese >= 2, legal: 'Legea 50/1991 · ISU', detail: accese >= 2 ? accese + ' accese' : 'doar ' + accese + ' acces — risc de respingere/ISU' });
    checks.push({ item: 'Separare flux public (grădiniță/comerț) vs rezidențial', ok: !(gradinita || comMp) || accese >= 2, detail: (gradinita || comMp) ? 'necesită acces/flux distinct pt funcțiunile publice' : 'fără funcțiuni publice generatoare' });
    checks.push({ item: 'Spații verzi ≥ 8 mp/locuitor', ok: greenMin >= pop * GREEN_PER_CAP, legal: 'Legea 24/2007', detail: greenMin.toLocaleString('ro-RO') + ' mp (necesar ' + (pop * GREEN_PER_CAP).toLocaleString('ro-RO') + ')' });
    checks.push({ item: 'Densitate în limita CUT', ok: fitsCUT, legal: 'RLU/PUG', detail: 'ADC cerută ' + adcCeruta.toLocaleString('ro-RO') + ' / max ' + adcMax.toLocaleString('ro-RO') + ' mp' });
    checks.push({ item: 'Teren suficient pt programul de case', ok: fitsCase, detail: terenCase.toLocaleString('ro-RO') + ' mp case / ' + netResidential.toLocaleString('ro-RO') + ' mp disponibil' });
    checks.push({ item: 'Continuitate pietonală (copil → grădiniță/parc/comerț în siguranță)', ok: null, detail: 'verifică traseele pietonale continue, fără întreruperi la intersecții/parcări' });
    var fails = checks.filter(function (c) { return c.ok === false; }).length;

    return {
      area_m2: area, population: pop,
      budget: { circulatii: circ, verde_min: greenMin, echipamente: echip, rezidential_net: netResidential, parcaje: parcaje },
      program: { case_individuale: cIndiv, colectiv_units: uColectiv, comercial_mp: comMp, gradinita: gradinita, biserica: biserica, parc_mp: parcMp },
      ierarhie: ierarhie, amplasare: amplasare, checks: checks, fails: fails,
      verdict: fails === 0 ? 'coerent (aprobabil)' : fails <= 2 ? 'necesită ajustări' : 'neaprobabil ca atare',
      adc_ceruta: adcCeruta, adc_max: adcMax, accese: accese, pot: pot, cut: cut
    };
  }

  // ── UI wizard ──
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(740px,96vw);max-height:93vh;overflow:auto;border:1px solid rgba(192,132,252,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#a855f7,#7c3aed);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#d8b4fe;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700'
  };
  function prefill() { try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; var reg = (G.REGULI && G.REGULI[ap.utr]) || {}; return { area: ap.area || 0, pot: (ap.params && ap.params.pot) || reg.pot || 35, cut: (ap.params && ap.params.cut) || reg.cut || 1.2, nrcad: ap.nrcad }; } } catch (e) {} return null; }

  function openWizard() {
    var pre = prefill();
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🏘️ Masterplan ansamblu — lotizare ghidată</div><div style="font-size:11px;color:#94a3b8">Program → accese → circulații → fluxuri → loturi (metodologia corectă)</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    if (pre) body.appendChild(el('div', { style: 'font-size:11px;color:#34d399;margin-bottom:4px' }, '✓ Parcela: ' + Math.round(pre.area).toLocaleString('ro-RO') + ' mp · POT ' + pre.pot + '% · CUT ' + pre.cut));
    else body.appendChild(el('div', { style: 'font-size:11px;color:#fbbf24;margin-bottom:4px' }, '⚠ Selectează o parcelă pentru suprafață/indicatori (sau introdu manual).'));

    // PAS 1 — program funcțional (PRIMUL, nu indicatorii)
    body.appendChild(el('div', { style: ST.label }, 'Pas 1 — Program funcțional (ce vrei să realizezi)'));
    var g = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px' });
    var areaI = el('input', { style: ST.inp, type: 'number', placeholder: 'mp teren' }); areaI.value = pre ? Math.round(pre.area) : '';
    var caseI = el('input', { style: ST.inp, type: 'number', placeholder: 'nr. case individuale' });
    var colI = el('input', { style: ST.inp, type: 'number', placeholder: 'nr. ap. locuințe colective' });
    var comI = el('input', { style: ST.inp, type: 'number', placeholder: 'comerț mp ADC' });
    var parcI = el('input', { style: ST.inp, type: 'number', placeholder: 'parc public mp' });
    [['Teren (mp)', areaI], ['Case individuale', caseI], ['Ap. colective', colI], ['Comerț (mp)', comI], ['Parc public (mp)', parcI]].forEach(function (o) { var w = el('div'); w.appendChild(el('div', { style: 'font-size:11px;color:#cbd5e1;margin-bottom:3px' }, o[0])); w.appendChild(o[1]); g.appendChild(w); });
    body.appendChild(g);
    var chkWrap = el('div', { style: 'display:flex;gap:16px;margin-top:8px;font-size:12px;color:#cbd5e1' });
    var grad = el('input', { type: 'checkbox' }), bis = el('input', { type: 'checkbox' });
    var l1 = el('label', { style: 'display:flex;gap:6px;align-items:center' }); l1.appendChild(grad); l1.appendChild(document.createTextNode('Grădiniță'));
    var l2 = el('label', { style: 'display:flex;gap:6px;align-items:center' }); l2.appendChild(bis); l2.appendChild(document.createTextNode('Biserică'));
    chkWrap.appendChild(l1); chkWrap.appendChild(l2); body.appendChild(chkWrap);

    // PAS 2 — accese
    body.appendChild(el('div', { style: ST.label }, 'Pas 2 — Accese în teren'));
    var acc = el('select', { style: ST.inp }); [['1', '1 acces'], ['2', '2 accese (recomandat — ISU)'], ['3', '3 accese']].forEach(function (o) { acc.appendChild(el('option', { value: o[0] }, o[1])); }); acc.value = '2';
    body.appendChild(acc);
    // indicatorii vin ABIA acum (ca verificare, nu ca punct de plecare)
    body.appendChild(el('div', { style: ST.label }, 'Verificare (indicatori PUG — pt validare, nu punct de plecare)'));
    var gi = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px' });
    var potI = el('input', { style: ST.inp, type: 'number', placeholder: 'POT %' }); potI.value = pre ? pre.pot : 35;
    var cutI = el('input', { style: ST.inp, type: 'number', step: '0.1', placeholder: 'CUT' }); cutI.value = pre ? pre.cut : 1.2;
    gi.appendChild(potI); gi.appendChild(cutI); body.appendChild(gi);

    var run = el('button', { style: ST.btn + ';margin-top:14px' }, '▶ Generează schema de organizare'); body.appendChild(run);
    var out = el('div', { style: 'margin-top:14px' }); body.appendChild(out);
    var pdfBtn = el('button', { style: ST.btn + ';display:none;margin-top:10px;background:linear-gradient(180deg,#2563eb,#1d4ed8)' }, '⬇ Brief de proiectare (PDF)'); body.appendChild(pdfBtn);
    var last = null;
    run.onclick = function () {
      var r = plan({ area_m2: +areaI.value, accese: +acc.value, pot: +potI.value, cut: +cutI.value, program: { case_individuale: +caseI.value, colectiv_units: +colI.value, comercial_mp: +comI.value, gradinita: grad.checked, biserica: bis.checked, parc_mp: +parcI.value } });
      last = r; var html = render(r);
      try { if (G.LotizareValidator && G.LotizareValidator.renderHTML) html += G.LotizareValidator.renderHTML(r, {}); } catch (e) { console.warn('[Ansamblu] validator', e); }
      out.innerHTML = html; pdfBtn.style.display = (typeof G.Ansamblu.generatePDF === 'function') ? '' : 'none';
    };
    pdfBtn.onclick = function () { if (last) G.Ansamblu.generatePDF(last, { nrcad: pre && pre.nrcad }); };
    ov.appendChild(m); document.body.appendChild(ov);
  }

  function render(r) {
    var vc = r.fails === 0 ? '#22c55e' : r.fails <= 2 ? '#f59e0b' : '#ef4444';
    function N(x) { return Math.round(x).toLocaleString('ro-RO'); }
    var html = '<div style="background:#0a1120;border:1px solid ' + vc + ';border-radius:10px;padding:12px;margin-bottom:10px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:800">Schema de organizare · ' + N(r.population) + ' locuitori</span>' +
      '<span style="background:' + vc + ';color:#06101f;padding:3px 10px;border-radius:20px;font-weight:800;font-size:11px;text-transform:uppercase">' + r.verdict + '</span></div></div>';
    // buget suprafețe
    html += '<div style="' + ST.label + '">Bilanț suprafețe (ordinea corectă: circulații + verde + echipamente ÎNAINTEA loturilor)</div>';
    [['Circulații (străzi+trotuare ~22%)', r.budget.circulatii + ' mp'], ['Spații verzi (Legea 24/2007)', r.budget.verde_min + ' mp'], ['Echipamente (grădiniță/biserică/comerț)', r.budget.echipamente + ' mp'], ['Rezidențial net (ce rămâne)', r.budget.rezidential_net + ' mp'], ['Parcaje necesare', r.budget.parcaje + ' locuri']].forEach(function (o) { html += '<div style="display:flex;justify-content:space-between;font-size:12px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:#94a3b8">' + o[0] + '</span><span style="font-weight:600">' + (typeof o[1] === 'string' ? o[1].replace(/\B(?=(\d{3})+(?!\d))/g, '.') : o[1]) + '</span></div>'; });
    // ierarhie stradală
    html += '<div style="' + ST.label + '">Ierarhie stradală (3 niveluri)</div>';
    r.ierarhie.forEach(function (i) { html += '<div style="font-size:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)"><b style="color:#d8b4fe">N' + i.nivel + ' · ' + i.tip.label + ' (' + i.tip.w + 'm)</b> <span style="color:#64748b">~' + i.lungime_est + 'm</span><br><span style="color:#94a3b8;font-size:11px">' + i.tip.rol + '</span></div>'; });
    // amplasare fluxuri
    if (r.amplasare.length) { html += '<div style="' + ST.label + '">Separarea fluxurilor — reguli de amplasare</div>'; r.amplasare.forEach(function (a) { html += '<div style="font-size:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)"><b>' + a.f + '</b> <span style="color:#64748b">(' + a.flux + ')</span><br><span style="color:#94a3b8;font-size:11px">' + a.regula + '</span></div>'; }); }
    // checks
    html += '<div style="' + ST.label + '">Verificări de aprobabilitate</div>';
    r.checks.forEach(function (c) { var ic = c.ok === true ? '✓' : c.ok === false ? '✕' : 'ⓘ'; var cc = c.ok === true ? '#34d399' : c.ok === false ? '#f87171' : '#94a3b8'; html += '<div style="font-size:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:' + cc + ';font-weight:800">' + ic + '</span> ' + c.item + (c.legal ? ' <span style="color:#64748b">· ' + c.legal + '</span>' : '') + '<br><span style="color:#94a3b8;font-size:11px;margin-left:16px">' + c.detail + '</span></div>'; });
    html += '<div style="font-size:10px;color:#64748b;margin-top:10px">⚠ Schemă de organizare orientativă + brief. Desenul PUZ/PUD final (loturi, profile, plan reglementări) = proiectant atestat RUR.</div>';
    return html;
  }

  function generatePDF(r, meta) {
    meta = meta || {}; var Jc = (typeof jsPDF !== 'undefined') ? jsPDF : (window.jspdf && window.jspdf.jsPDF) || window.jsPDF; if (!Jc) return;
    var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' }); try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var F = 'DejaVuRO', W = 210, H = 297, today = new Date().toLocaleDateString('ro-RO'); var N = function (x) { return Math.round(x).toLocaleString('ro-RO'); };
    pdf.setFillColor(8, 15, 35); pdf.rect(0, 0, W, 26, 'F'); pdf.setFillColor(168, 85, 247); pdf.rect(0, 0, W, 3, 'F');
    pdf.setTextColor(216, 180, 254); pdf.setFont(F, 'bold'); pdf.setFontSize(8); pdf.text('URBANX · MASTERPLAN ANSAMBLU', W / 2, 10, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(14); pdf.text('Schemă de organizare + brief de proiectare', W / 2, 19, { align: 'center' });
    pdf.setTextColor(190, 170, 220); pdf.setFontSize(8); pdf.text((meta.nrcad ? 'CF ' + meta.nrcad + ' · ' : '') + N(r.area_m2) + ' mp · ' + N(r.population) + ' loc · ' + today, W / 2, 24, { align: 'center' });
    var y = 36; function h(t) { pdf.setFillColor(244, 240, 252); pdf.rect(12, y - 4, W - 24, 7, 'F'); pdf.setTextColor(120, 60, 200); pdf.setFont(F, 'bold'); pdf.setFontSize(10); pdf.text(t, 14, y + 1); y += 9; }
    function ln(t, c) { if (y > H - 20) { pdf.addPage(); y = 20; } pdf.setTextColor.apply(pdf, c || [40, 50, 70]); pdf.setFont(F, 'normal'); pdf.setFontSize(8.5); var s = pdf.splitTextToSize(t, W - 30); pdf.text(s, 15, y); y += s.length * 4.3 + 1.5; }
    h('1. Program funcțional'); ln('Case individuale: ' + r.program.case_individuale + ' · Ap. colective: ' + r.program.colectiv_units + ' · Comerț: ' + r.program.comercial_mp + ' mp' + (r.program.gradinita ? ' · Grădiniță' : '') + (r.program.biserica ? ' · Biserică' : '') + (r.program.parc_mp ? ' · Parc ' + r.program.parc_mp + ' mp' : ''));
    h('2. Accese'); ln(r.accese + ' accese auto' + (r.accese >= 2 ? ' (redundanță + ISU OK)' : ' — RISC: minim 2 recomandat pt ISU'));
    h('3. Bilanț suprafețe (circulații+verde+echipamente ÎNAINTEA loturilor)');
    ln('Circulații ~22%: ' + N(r.budget.circulatii) + ' mp · Spații verzi: ' + N(r.budget.verde_min) + ' mp · Echipamente: ' + N(r.budget.echipamente) + ' mp · Rezidențial net: ' + N(r.budget.rezidential_net) + ' mp · Parcaje: ' + r.budget.parcaje + ' locuri');
    h('4. Ierarhie stradală'); r.ierarhie.forEach(function (i) { ln('N' + i.nivel + ' — ' + i.tip.label + ' (' + i.tip.w + 'm, ~' + i.lungime_est + 'm): ' + i.tip.rol, [60, 50, 90]); });
    h('5. Separarea fluxurilor'); r.amplasare.forEach(function (a) { ln('• ' + a.f + ': ' + a.regula); });
    h('6. Verificări de aprobabilitate (' + r.verdict + ')');
    r.checks.forEach(function (c) { var ic = c.ok === true ? '[OK]' : c.ok === false ? '[!]' : '[i]'; ln(ic + ' ' + c.item + ' — ' + c.detail, c.ok === false ? [200, 60, 40] : [50, 60, 80]); });
    if (y > H - 30) { pdf.addPage(); y = 20; }
    pdf.setFillColor(40, 24, 60); pdf.rect(12, y, W - 24, 18, 'F'); pdf.setTextColor(216, 180, 254); pdf.setFont(F, 'normal'); pdf.setFontSize(7.5);
    pdf.text(pdf.splitTextToSize('Schemă de organizare orientativă (metodologie: program → accese → ierarhie stradală → separare fluxuri → loturi). Pietonalul se proiectează înaintea mașinii. Desenul PUZ/PUD final (plan reglementări, loturi, profile transversale) se elaborează de proiectant atestat RUR, conform Legii 350/2001 și NP 068/2002.', W - 30), W / 2, y + 6, { align: 'center' });
    pdf.save(('Masterplan_ansamblu_' + (meta.nrcad || 'parcela') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_'));
    G.ss && ss('✅ Brief masterplan ansamblu generat');
  }

  G.Ansamblu = { plan: plan, openWizard: openWizard, generatePDF: generatePDF };
  console.log('[Ansamblu] masterplan ansamblu / lotizare ghidată încărcat (window.Ansamblu)');
})(window);
