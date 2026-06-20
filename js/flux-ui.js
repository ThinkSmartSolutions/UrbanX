/* ============================================================================
 * UrbanX Flux — UI (buton + modal) pentru studiul preliminar de trafic.
 * Buton flotant „📊 Studiu trafic" -> formular (funcțiuni propuse, scor TP,
 * mărime oraș, intersecții opționale) -> window.Flux.compute -> sumar + PDF.
 * ========================================================================== */
(function (G) {
  'use strict';
  var LU = [
    ['residential', 'Locuințe (unități)'], ['office', 'Birouri (mp ADC)'],
    ['retail', 'Comerț (mp ADC)'], ['supermarket', 'Supermarket (mp ADC)'],
    ['school', 'Învățământ (mp ADC)'], ['hospital', 'Sănătate (mp ADC)'],
    ['industrial', 'Producție/logistică (mp ADC)'], ['mixed_use', 'Mixt (mp ADC)']
  ];
  var CITY_SIZES = [['metropolis', 'Metropolă (>200k)'], ['city', 'Oraș mediu (50–200k)'],
    ['town', 'Oraș mic (<50k)'], ['commune', 'Comună / rural']];

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html != null) e.innerHTML = html;
    return e;
  }

  function guessCitySize() {
    try {
      var c = (G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]) || null;
      if (c && (c.tip === 'comuna')) return 'commune';
      var pop = c && (c.pop2021 || c.pop || 0);
      if (pop >= 200000) return 'metropolis';
      if (pop >= 50000) return 'city';
      if (pop > 0) return 'town';
    } catch (e) {}
    return 'city';
  }
  function cityName() {
    try { var c = G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]; if (c) return c.name; } catch (e) {}
    return '';
  }

  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(680px,94vw);max-height:92vh;overflow:auto;border:1px solid rgba(34,160,90,.4);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:system-ui,Segoe UI,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px',
    row: 'display:grid;grid-template-columns:1fr 130px 34px;gap:8px;margin-bottom:8px',
    inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#16a34a,#0f7a37);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    btnGhost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#93c5fd;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700'
  };

  function luRow(presetType, presetQty) {
    var row = el('div', { style: ST.row, class: 'flux-lu-row' });
    var sel = el('select', { style: ST.inp, class: 'flux-lu-type' });
    LU.forEach(function (o) { var op = el('option', { value: o[0] }, o[1]); if (o[0] === presetType) op.selected = true; sel.appendChild(op); });
    var qty = el('input', { style: ST.inp, class: 'flux-lu-qty', type: 'number', min: '0', placeholder: 'cantitate', value: presetQty != null ? presetQty : '' });
    var del = el('button', { style: ST.btnGhost, title: 'Șterge' }, '✕');
    del.onclick = function () { row.remove(); };
    row.appendChild(sel); row.appendChild(qty); row.appendChild(del);
    return row;
  }
  function ixRow(name, cap, vol, share) {
    var row = el('div', { style: 'display:grid;grid-template-columns:1.4fr .8fr .8fr .7fr 34px;gap:6px;margin-bottom:8px', class: 'flux-ix-row' });
    function inp(cls, ph, val, type) { return el('input', { style: ST.inp, class: cls, placeholder: ph, value: val != null ? val : '', type: type || 'text' }); }
    row.appendChild(inp('flux-ix-name', 'intersecție', name));
    row.appendChild(inp('flux-ix-cap', 'capac. veh/h', cap, 'number'));
    row.appendChild(inp('flux-ix-vol', 'volum actual', vol, 'number'));
    row.appendChild(inp('flux-ix-share', 'cota 0–1', share, 'number'));
    var del = el('button', { style: ST.btnGhost }, '✕'); del.onclick = function () { row.remove(); };
    row.appendChild(del);
    return row;
  }

  function openModal() {
    var ov = el('div', { style: ST.overlay });
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });

    var head = el('div', { style: ST.head });
    head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">📊 UrbanX Flux — Studiu de trafic</div><div style="font-size:11px;color:#94a3b8">Pre-analiză impact trafic pentru PUZ/PUD · cifre orientative</div>'));
    var x = el('button', { style: ST.btnGhost }, '✕ Închide'); x.onclick = function () { ov.remove(); };
    head.appendChild(x);
    m.appendChild(head);

    var body = el('div', { style: ST.body });

    // meta
    body.appendChild(el('div', { style: ST.label }, 'Identificare'));
    var siteName = el('input', { style: ST.inp, placeholder: 'Denumire sit / PUZ' });
    siteName.value = 'Sit PUZ ' + (cityName() || '');
    body.appendChild(siteName);

    // land uses
    body.appendChild(el('div', { style: ST.label }, 'Funcțiuni propuse'));
    var luWrap = el('div');
    luWrap.appendChild(luRow('residential', 200));
    luWrap.appendChild(luRow('office', 6000));
    body.appendChild(luWrap);
    var addLu = el('button', { style: ST.btnGhost }, '+ Adaugă funcțiune');
    addLu.onclick = function () { luWrap.appendChild(luRow('retail', '')); };
    body.appendChild(addLu);

    // params
    body.appendChild(el('div', { style: ST.label }, 'Context'));
    var pgrid = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:12px' });
    var sizeSel = el('select', { style: ST.inp });
    CITY_SIZES.forEach(function (o) { var op = el('option', { value: o[0] }, o[1]); if (o[0] === guessCitySize()) op.selected = true; sizeSel.appendChild(op); });
    var ptWrap = el('div');
    var ptVal = el('span', { style: 'color:#34d399;font-weight:700' }, '0.50');
    var pt = el('input', { type: 'range', min: '0', max: '1', step: '0.05', value: '0.5', style: 'width:100%' });
    pt.oninput = function () { ptVal.textContent = (+pt.value).toFixed(2); };
    ptWrap.appendChild(el('div', { style: 'font-size:12px;color:#cbd5e1;margin-bottom:4px' }, 'Acces transport public '));
    ptWrap.firstChild.appendChild(ptVal);
    ptWrap.appendChild(pt);
    pgrid.appendChild(el('div', null, '<div style="font-size:12px;color:#cbd5e1;margin-bottom:4px">Mărime localitate</div>'));
    pgrid.firstChild.appendChild(sizeSel);
    pgrid.appendChild(ptWrap);
    body.appendChild(pgrid);

    // intersections (optional)
    body.appendChild(el('div', { style: ST.label }, 'Intersecții adiacente (opțional — pt v/c · LOS)'));
    var ixWrap = el('div');
    body.appendChild(ixWrap);
    var addIx = el('button', { style: ST.btnGhost }, '+ Adaugă intersecție');
    addIx.onclick = function () { ixWrap.appendChild(ixRow('', '', '', '')); };
    body.appendChild(addIx);

    // result
    var result = el('div', { style: 'margin-top:16px' });
    body.appendChild(result);

    // actions
    var actions = el('div', { style: 'display:flex;gap:10px;margin-top:18px' });
    var runBtn = el('button', { style: ST.btn }, '▶ Calculează');
    var pdfBtn = el('button', { style: ST.btn + ';display:none;background:linear-gradient(180deg,#2563eb,#1d4ed8)' }, '⬇ Generează PDF');
    actions.appendChild(runBtn); actions.appendChild(pdfBtn);
    body.appendChild(actions);
    m.appendChild(body);

    var lastResult = null, lastMeta = null;

    function gather() {
      var land_uses = [];
      luWrap.querySelectorAll('.flux-lu-row').forEach(function (r) {
        var t = r.querySelector('.flux-lu-type').value;
        var q = parseFloat(r.querySelector('.flux-lu-qty').value) || 0;
        if (q <= 0) return;
        var lu = { land_use: t, label: '' };
        if (t === 'residential') lu.units = q; else lu.gross_floor_area_sqm = q;
        land_uses.push(lu);
      });
      var intersections = [];
      ixWrap.querySelectorAll('.flux-ix-row').forEach(function (r, i) {
        var nm = r.querySelector('.flux-ix-name').value.trim();
        var cap = parseFloat(r.querySelector('.flux-ix-cap').value) || 0;
        if (!nm || cap <= 0) return;
        intersections.push({
          intersection_id: 'ix' + i, name: nm, capacity_veh_hr: cap,
          existing_volume_veh_hr: parseFloat(r.querySelector('.flux-ix-vol').value) || 0,
          assignment_share: parseFloat(r.querySelector('.flux-ix-share').value) || 0.3
        });
      });
      return {
        scenario: { land_uses: land_uses, zones: [], intersections: intersections, pt_accessibility_score: +pt.value },
        params: { city_size: sizeSel.value }
      };
    }

    runBtn.onclick = function () {
      var g = gather();
      if (!g.scenario.land_uses.length) { result.innerHTML = '<div style="color:#fca5a5;font-size:13px">Adaugă cel puțin o funcțiune cu cantitate > 0.</div>'; return; }
      var res = G.Flux.compute(g.scenario, g.params);
      lastResult = res;
      lastMeta = { site_name: siteName.value, city_name: cityName(), land_uses: g.scenario.land_uses };
      result.innerHTML = summaryHTML(res);
      pdfBtn.style.display = '';
    };
    pdfBtn.onclick = function () { if (lastResult) G.Flux.generatePDF(lastResult, lastMeta); };

    ov.appendChild(m);
    document.body.appendChild(ov);
  }

  function summaryHTML(res) {
    var g = res.trips_detail, ms = res.modal_split, p = res.parking_demand, e = res.emissions;
    function card(big, small, col) {
      return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:12px;text-align:center">' +
        '<div style="font-size:20px;font-weight:800;color:' + (col || '#34d399') + '">' + big + '</div>' +
        '<div style="font-size:11px;color:#94a3b8">' + small + '</div></div>';
    }
    var ixHTML = (res.intersections || []).map(function (i) {
      var col = i.over_capacity ? '#f87171' : (i.vc_ratio > 0.75 ? '#fbbf24' : '#34d399');
      return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)">' +
        '<span>' + i.name + '</span><span style="color:' + col + '">v/c ' + i.vc_ratio.toFixed(2) + ' · LOS ' + i.los + (i.over_capacity ? ' ⚠' : '') + '</span></div>';
    }).join('');
    return '<div style="display:flex;gap:8px;margin-bottom:10px">' +
      card(Math.round(g.pm_total).toLocaleString('ro-RO'), 'deplasări vârf PM') +
      card(Math.round(g.daily).toLocaleString('ro-RO'), 'zilnic', '#93c5fd') +
      card(Math.round(ms.auto * 100) + '%', 'cotă auto', '#fbbf24') +
      '</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:10px">' +
      card(Math.round(p.required_after_reduction).toLocaleString('ro-RO'), 'locuri parcare') +
      card(Math.round(e.total_tonnes_year).toLocaleString('ro-RO') + ' t', 'CO₂/an', '#f87171') +
      '</div>' +
      (ixHTML ? ('<div style="font-size:11px;color:#93c5fd;margin:6px 0 2px;font-weight:700">INTERSECȚII</div>' + ixHTML) : '') +
      '<div style="font-size:10px;color:#64748b;margin-top:8px">⚠ Pre-analiză orientativă — nu substituie studiul de trafic al unui proiectant atestat.</div>';
  }

  function mountButton() {
    if (document.getElementById('flux-traffic-btn')) return;
    var b = el('button', { id: 'flux-traffic-btn', title: 'UrbanX Flux — Studiu de trafic' },
      '📊 Studiu trafic');
    b.style.cssText = 'position:fixed;bottom:170px;right:10px;z-index:3200;background:linear-gradient(180deg,#16a34a,#0f7a37);color:#fff;border:0;border-radius:10px;padding:9px 12px;font-weight:700;font-size:12px;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.4);font-family:system-ui,sans-serif';
    b.onclick = openModal;
    document.body.appendChild(b);
  }

  G.Flux = G.Flux || {};
  G.Flux.openStudiu = openModal;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountButton);
  else mountButton();
  console.log('[Flux] UI încărcat (buton + window.Flux.openStudiu)');
})(window);
