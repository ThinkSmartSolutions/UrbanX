/* ============================================================================
 * UrbanX Intelligence — UI dashboard (buton + modal capacitate cumulativă).
 * Buton „🏗️ Capacitate UAT" -> modal: capacități infra + locuințe aprobate cumulat
 * -> bilanț pe indicatori (apă/canal/școli/grădinițe/verde/impermeabilizare) +
 * verdict + impact PUZ nou. Demo Florești preîncărcat. Folosește window.UXI.
 * ========================================================================== */
(function (G) {
  'use strict';
  var COL = { ok: '#22c55e', avertizare: '#f59e0b', critic: '#f97316', blocat: '#ef4444' };
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(720px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(96,165,250,.4);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px',
    inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:7px 9px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#2563eb,#1d4ed8);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#93c5fd;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700'
  };
  var FIELDS = [
    ['name', 'UAT', 'text'], ['area_ha', 'Suprafață (ha)', 'number'],
    ['infra_water_m3day', 'Capacitate apă (m³/zi)', 'number'], ['infra_schools_seats', 'Locuri școală', 'number'],
    ['infra_kinder_seats', 'Locuri grădiniță', 'number'], ['infra_green_m2', 'Spații verzi (mp)', 'number'],
    ['dwelling_units', 'Locuințe aprobate (cumulat)', 'number'], ['built_footprint_m2', 'Amprentă construită (mp)', 'number']
  ];

  function openModal() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head });
    head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🏗️ UrbanX Intelligence — Capacitate cumulativă</div><div style="font-size:11px;color:#94a3b8">Bilanțul infrastructurii față de TOT ce e aprobat · pre-analiză</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x);
    m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);

    var btnRow = el('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' });
    var uatBtn = el('button', { style: ST.ghost }, '📍 UAT curent (capacități estimate)');
    var demoBtn = el('button', { style: ST.ghost }, '⚡ Demo Florești (criză reală)');
    btnRow.appendChild(uatBtn); btnRow.appendChild(demoBtn);
    body.appendChild(btnRow);
    var estNote = el('div', { style: 'font-size:11px;color:#fbbf24;margin-top:6px;display:none' });
    body.appendChild(estNote);

    body.appendChild(el('div', { style: ST.label }, 'Date UAT + total aprobat'));
    var grid = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px' });
    var inputs = {};
    FIELDS.forEach(function (f) {
      var wrap = el('div'); wrap.appendChild(el('div', { style: 'font-size:11px;color:#cbd5e1;margin-bottom:3px' }, f[1]));
      var inp = el('input', { style: ST.inp, type: f[2] }); inputs[f[0]] = inp; wrap.appendChild(inp); grid.appendChild(wrap);
    });
    body.appendChild(grid);

    body.appendChild(el('div', { style: ST.label }, 'PUZ nou (opțional — impact marginal)'));
    var pgrid = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px' });
    var npDwell = el('input', { style: ST.inp, type: 'number', placeholder: 'locuințe' });
    var npPot = el('input', { style: ST.inp, type: 'number', placeholder: 'POT prop %' });
    var npPotMax = el('input', { style: ST.inp, type: 'number', placeholder: 'POT max %' });
    var npCut = el('input', { style: ST.inp, type: 'number', placeholder: 'CUT prop' });
    [npDwell, npPot, npPotMax, npCut].forEach(function (i) { pgrid.appendChild(i); });
    body.appendChild(pgrid);

    // ── Registru PUZ (persistent local) ──
    body.appendChild(el('div', { style: ST.label }, 'Registru PUZ (salvat local pe UAT)'));
    var regList = el('div', { style: 'max-height:140px;overflow:auto;margin-bottom:6px' });
    body.appendChild(regList);
    var rgrid = el('div', { style: 'display:grid;grid-template-columns:1.4fr .8fr .9fr 34px;gap:6px' });
    var rName = el('input', { style: ST.inp, placeholder: 'denumire PUZ' });
    var rDwell = el('input', { style: ST.inp, type: 'number', placeholder: 'locuințe' });
    var rStatus = el('select', { style: ST.inp });
    [['aprobat', 'aprobat'], ['in_analiza', 'în analiză'], ['depus', 'depus']].forEach(function (o) { rStatus.appendChild(el('option', { value: o[0] }, o[1])); });
    var rAdd = el('button', { style: ST.ghost }, '+');
    [rName, rDwell, rStatus, rAdd].forEach(function (e) { rgrid.appendChild(e); });
    body.appendChild(rgrid);
    var regCalc = el('button', { style: ST.ghost + ';margin-top:6px' }, '📊 Calculează din registru (cumulat)');
    body.appendChild(regCalc);

    var result = el('div', { style: 'margin-top:14px' }); body.appendChild(result);
    var run = el('button', { style: ST.btn + ';margin-top:16px' }, '▶ Calculează bilanț (din total manual)'); body.appendChild(run);

    function regKey() { return (inputs.name.value || '').trim() || (G.TCI && G.TCI.cityKey) || 'UAT'; }
    function refreshReg() {
      var items = G.UXI.registry.list(regKey());
      if (!items.length) { regList.innerHTML = '<div style="font-size:11px;color:#64748b">Niciun PUZ înregistrat pentru „' + regKey() + '". Adaugă mai jos sau folosește totalul manual.</div>'; return; }
      regList.innerHTML = '';
      var tot = 0;
      items.forEach(function (p) {
        tot += +p.dwelling_units || 0;
        var row = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)' });
        row.appendChild(el('span', null, (p.name || 'PUZ') + ' · <b>' + (+p.dwelling_units || 0) + '</b> loc · <span style="color:#94a3b8">' + p.status + '</span>'));
        var del = el('button', { style: ST.ghost + ';padding:2px 7px' }, '✕');
        del.onclick = function () { G.UXI.registry.remove(regKey(), p.id); refreshReg(); };
        row.appendChild(del); regList.appendChild(row);
      });
      regList.appendChild(el('div', { style: 'font-size:11px;color:#34d399;margin-top:4px;font-weight:700' }, 'Total: ' + items.length + ' PUZ · ' + tot.toLocaleString('ro-RO') + ' locuințe'));
    }
    rAdd.onclick = function () {
      if (!(+rDwell.value > 0)) return;
      G.UXI.registry.add(regKey(), { name: rName.value || 'PUZ', dwelling_units: +rDwell.value, built_footprint_m2: (+rDwell.value) * 30, status: rStatus.value });
      rName.value = ''; rDwell.value = ''; refreshReg();
    };
    regCalc.onclick = function () {
      var uat = readUat();
      var puz = G.UXI.registry.list(regKey());
      if (!puz.length) { result.innerHTML = '<div style="color:#fca5a5;font-size:13px">Registrul e gol — adaugă PUZ-uri sau folosește totalul manual.</div>'; return; }
      var cap = G.UXI.capacity(uat, puz, { include: ['aprobat', 'in_analiza'] });
      var al = G.UXI.alerts(cap);
      result.innerHTML = renderCapacity(cap) + renderAlerts(al);
      G.UXI._last = { uat: uat, puz: puz, capacity: cap, impact: null };
    };
    refreshReg();

    uatBtn.onclick = function () {
      var c = null;
      try {
        var k = G.TCI && G.TCI.cityKey;
        c = (G._RO_CITIES_DB && G._RO_CITIES_DB[k]) || (G.TCI && G.TCI._EXTRA_UATS && G.TCI._EXTRA_UATS[k]) || null;
      } catch (e) {}
      if (!c) { estNote.style.display = ''; estNote.textContent = 'Niciun UAT selectat în UrbanX — alege un oraș/comună sau folosește demo.'; return; }
      var inf = G.UXI.estimateInfra(c);
      inputs.name.value = c.name || ''; inputs.area_ha.value = inf.area_ha || '';
      inputs.infra_water_m3day.value = inf.infra_water_m3day; inputs.infra_schools_seats.value = inf.infra_schools_seats;
      inputs.infra_kinder_seats.value = inf.infra_kinder_seats; inputs.infra_green_m2.value = inf.infra_green_m2;
      inputs.dwelling_units.value = ''; inputs.built_footprint_m2.value = '';
      estNote.style.display = ''; estNote.textContent = '⚠ ' + inf.note + ' Introdu locuințele aprobate cumulat (din registrul PUZ al UAT-ului).';
    };
    demoBtn.onclick = function () {
      var d = G.UXI.demoFloresti(); var u = d.uat;
      estNote.style.display = 'none';
      inputs.name.value = u.name; inputs.area_ha.value = u.area_ha; inputs.infra_water_m3day.value = u.infra_water_m3day;
      inputs.infra_schools_seats.value = u.infra_schools_seats; inputs.infra_kinder_seats.value = u.infra_kinder_seats;
      inputs.infra_green_m2.value = u.infra_green_m2; inputs.dwelling_units.value = d.capacity.dwelling_units;
      inputs.built_footprint_m2.value = 342000; npDwell.value = 600; npPot.value = 45; npPotMax.value = 40; npCut.value = 1.4;
    };

    function readUat() {
      return {
        name: inputs.name.value, area_ha: +inputs.area_ha.value || 0,
        infra_water_m3day: +inputs.infra_water_m3day.value || 0, infra_schools_seats: +inputs.infra_schools_seats.value || 0,
        infra_kinder_seats: +inputs.infra_kinder_seats.value || 0, infra_green_m2: +inputs.infra_green_m2.value || 0
      };
    }
    run.onclick = function () {
      var uat = readUat();
      var puz = [{ dwelling_units: +inputs.dwelling_units.value || 0, built_footprint_m2: +inputs.built_footprint_m2.value || 0, status: 'aprobat' }];
      var cap = G.UXI.capacity(uat, puz);
      var html = renderCapacity(cap);
      if (+npDwell.value > 0) {
        var imp = G.UXI.cumulativeImpact(uat, puz, { dwelling_units: +npDwell.value, pug: { pot_max: +npPotMax.value || null, pot_proposed: +npPot.value || null, cut_max: 1.2, cut_proposed: +npCut.value || null } });
        html += renderImpact(imp);
      }
      result.innerHTML = html;
      G.UXI._last = { uat: uat, puz: puz, capacity: cap, impact: (+npDwell.value > 0 ? imp : null) };
    };
    // ── Asistent AI (răspunde din datele live, fără să inventeze) ──
    body.appendChild(el('div', { style: ST.label }, '💬 Asistent AI urbanistic'));
    var aiRow = el('div', { style: 'display:flex;gap:8px' });
    var aiInp = el('input', { style: ST.inp, placeholder: 'ex: Câte locuri de școală mai pot aproba?' });
    var aiSend = el('button', { style: ST.ghost }, 'Întreabă');
    aiRow.appendChild(aiInp); aiRow.appendChild(aiSend); body.appendChild(aiRow);
    var aiOut = el('div', { style: 'margin-top:8px;font-size:13px;color:#cbd5e1;white-space:pre-wrap;line-height:1.5' });
    body.appendChild(aiOut);
    function buildContext() {
      var uat = readUat(); var puz = G.UXI.registry.list(regKey());
      var cap = puz.length ? G.UXI.capacity(uat, puz, { include: ['aprobat', 'in_analiza'] }) : (G.UXI._last && G.UXI._last.capacity) || null;
      var ind = {}; if (cap) Object.keys(cap.indicators).forEach(function (k) { ind[k] = { utilizare_pct: cap.indicators[k].utilization_pct, stare: cap.indicators[k].status, necesar: cap.indicators[k].needed, capacitate: cap.indicators[k].capacity, unit: cap.indicators[k].unit }; });
      return {
        uat: uat.name, capacitati_estimate: true,
        populatie_aprobata_cumulat: cap ? cap.population_approved : null,
        stare_generala: cap ? cap.overall_status : null,
        indicatori: cap ? ind : null,
        alerte: cap ? G.UXI.alerts(cap).map(function (a) { return a.message; }) : [],
        puz_in_registru: puz.length
      };
    }
    aiSend.onclick = function () {
      var q = aiInp.value.trim(); if (!q) return;
      aiOut.textContent = '⏳ Analizez datele UAT-ului...';
      askAI(q, buildContext()).then(function (txt) { aiOut.textContent = txt; })
        .catch(function (e) { aiOut.textContent = '⚠ Asistentul AI e indisponibil momentan (' + (e.message || e) + '). Datele din bilanț rămân valabile.'; });
    };
    aiInp.addEventListener('keydown', function (e) { if (e.key === 'Enter') aiSend.onclick(); });

    ov.appendChild(m); document.body.appendChild(ov);
  }

  var AI_SYSTEM = 'Ești asistentul AI al platformei UrbanX Intelligence pentru planificare urbanistică în România. ' +
    'Ajuți primarii și arhitecții șefi să înțeleagă capacitatea infrastructurii UAT-ului. Reguli: vorbești în română, ' +
    'clar și accesibil; când dai cifre le explici în context (nu "118%" ci "depășit cu 18%, risc pene de presiune"); ' +
    'folosești DOAR datele din contextul JSON primit — NU inventezi; dacă o informație lipsește, spui că nu e disponibilă ' +
    'și ce date ar fi necesare; citezi baza legală când e relevant (Legea 350/2001, NTPA 013/2002, Legea 24/2007, MEN). ' +
    'Atenționezi mereu că datele de infrastructură sunt ESTIMATE și necesită confirmare de la operatori. Max 180 cuvinte.';

  function askAI(question, ctx) {
    var proxy = window._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
    var prompt = 'Date live UAT (JSON):\n' + JSON.stringify(ctx, null, 1) + '\n\nÎntrebare: ' + question;
    return fetch(proxy + '/proxy?url=' + encodeURIComponent('https://api.anthropic.com/v1/messages'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 700, system: AI_SYSTEM, messages: [{ role: 'user', content: prompt }] }),
      signal: AbortSignal.timeout ? AbortSignal.timeout(25000) : undefined
    }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (d) { var t = d && d.content && d.content[0] && d.content[0].text; if (!t) throw new Error('răspuns gol'); return t; });
  }

  function bar(ind) {
    var pct = Math.min(ind.utilization_pct, 130), c = COL[ind.status] || '#64748b';
    return '<div style="margin:6px 0"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px">' +
      '<span>' + ind.label + '</span><span style="color:' + c + ';font-weight:700">' + ind.utilization_pct + '%' +
      (ind.deficit && ind.deficit > 0 ? (' · deficit ' + ind.deficit.toLocaleString('ro-RO') + ' ' + ind.unit) : '') + '</span></div>' +
      '<div style="background:#0a1120;border-radius:5px;height:9px;overflow:hidden;border:1px solid rgba(255,255,255,.08)">' +
      '<div style="height:100%;width:' + (pct / 130 * 100) + '%;background:' + c + '"></div></div></div>';
  }
  function renderCapacity(cap) {
    var c = COL[cap.overall_status] || '#64748b';
    var bars = Object.keys(cap.indicators).map(function (k) { return bar(cap.indicators[k]); }).join('');
    return '<div style="background:#0a1120;border:1px solid ' + c + ';border-radius:10px;padding:12px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
      '<span style="font-weight:800">Populație aprobată cumulat: ' + cap.population_approved.toLocaleString('ro-RO') + ' loc.</span>' +
      '<span style="background:' + c + ';color:#06101f;padding:3px 10px;border-radius:20px;font-weight:800;font-size:12px;text-transform:uppercase">' + cap.overall_status + '</span></div>' +
      bars + '</div>';
  }
  function renderAlerts(al) {
    if (!al || !al.length) return '<div style="margin-top:10px;font-size:12px;color:#34d399">✓ Niciun indicator peste prag.</div>';
    return '<div style="margin-top:12px"><div style="font-size:11px;color:#93c5fd;font-weight:700;margin-bottom:6px">ALERTE (' + al.length + ')</div>' +
      al.map(function (a) {
        var c = COL[a.severity] || '#64748b';
        return '<div style="display:flex;gap:8px;align-items:center;font-size:12px;padding:5px 8px;margin-bottom:4px;background:#0a1120;border-left:3px solid ' + c + ';border-radius:5px">' +
          '<span style="color:' + c + ';font-weight:800;text-transform:uppercase;font-size:10px">' + a.severity + '</span><span>' + a.message + '</span></div>';
      }).join('') + '</div>';
  }
  function renderImpact(imp) {
    var recCol = imp.recommendation === 'blocat' ? '#ef4444' : imp.recommendation === 'in_analiza' ? '#f59e0b' : '#22c55e';
    var crossed = Object.keys(imp.delta).filter(function (k) { return imp.delta[k].crosses_critical; }).map(function (k) { return imp.delta[k].label; });
    return '<div style="margin-top:12px;background:#0a1120;border:1px solid ' + recCol + ';border-radius:10px;padding:12px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">' +
      '<span style="font-weight:800">Verdict PUZ nou</span>' +
      '<span style="background:' + recCol + ';color:#06101f;padding:3px 10px;border-radius:20px;font-weight:800;font-size:12px;text-transform:uppercase">' + imp.recommendation.replace(/_/g, ' ') + '</span></div>' +
      '<div style="font-size:12px;color:#cbd5e1">+' + imp.marginal.population + ' loc · +' + imp.marginal.water_m3day + ' m³/zi apă · +' + imp.marginal.school_seats + ' locuri școală · +' + imp.marginal.trips_daily + ' deplasări/zi</div>' +
      (imp.pug_fail.length ? '<div style="font-size:12px;color:#f87171;margin-top:5px">⚠ Neconformitate PUG: ' + imp.pug_fail.join(' · ') + '</div>' : '') +
      (imp.exceeded_indicators.length ? '<div style="font-size:12px;color:#f87171;margin-top:3px">⚠ Infrastructură depășită: ' + imp.exceeded_indicators.join(', ') + '</div>' : '') +
      (crossed.length ? '<div style="font-size:12px;color:#fbbf24;margin-top:3px">↗ Trece pragul critic la: ' + crossed.join(', ') + '</div>' : '') +
      '<div style="font-size:10px;color:#64748b;margin-top:8px">⚠ Pre-analiză orientativă — necesită validarea arhitectului șef și date de infrastructură verificate.</div></div>';
  }

  // Butonul flotant a fost ÎNLOCUIT cu intrarea din meniul „Intelligence & Date Live".
  function cleanupFloating() { var b = document.getElementById('uxi-cap-btn'); if (b) b.remove(); }
  G.UXI = G.UXI || {}; G.UXI.openDashboard = openModal;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', cleanupFloating); else cleanupFloating();
  console.log('[UXI] dashboard UI încărcat (meniu: window.UXI.openDashboard)');
})(window);
