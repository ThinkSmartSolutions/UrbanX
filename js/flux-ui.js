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

  // ── PREFILL din parcela activă (click pe hartă) ──────────────────────────
  // Citește S.parcels[S.activeParcel]: area (mp), params.pot/cut, utr -> deduce
  // funcțiunea dominantă și ADC ≈ area × CUT. Întoarce null dacă nu există parcelă.
  function prefillFromParcel() {
    try {
      var S = G.S; if (!S || !S.parcels || S.parcels[S.activeParcel == null ? 0 : S.activeParcel] == null) return null;
      var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel];
      var area = ap.area || 0; if (area <= 0) return null;
      var cut = (ap.params && ap.params.cut) || (G.REGULI && G.REGULI[ap.utr] && G.REGULI[ap.utr].cut) || 1.0;
      var adc = Math.round(area * cut);                         // mp arie desfășurată estimată
      var desc = ((G.REGULI && G.REGULI[ap.utr] && G.REGULI[ap.utr].d) || ap.zoneLabel || ap.utr || '').toLowerCase();
      var type = guessFunction(desc, ap.utr);
      var lu;
      if (type === 'residential') lu = { land_use: 'residential', units: Math.max(1, Math.round(adc / 75)) }; // ~75 mp/loc.
      else lu = { land_use: type, gross_floor_area_sqm: adc };
      var centroid = null;
      try { if (ap.geo && G.turf) centroid = G.turf.centerOfMass(ap.geo).geometry.coordinates; } catch (e) {}
      return {
        site_name: 'PUZ ' + (ap.nrcad && ap.nrcad !== '—' ? ('CF ' + ap.nrcad + ' · ') : '') + (cityName() || ''),
        land_uses: [lu], centroid: centroid, area: area, cut: cut, utr: ap.utr
      };
    } catch (e) { console.warn('[Flux] prefill esuat', e); return null; }
  }
  function guessFunction(desc, utr) {
    var u = (utr || '').toUpperCase();
    if (/centr|mixt|CM|CMX|ZCP|ZM/.test(u) || /central|mixt/.test(desc)) return 'mixed_use';
    if (/birou|servicii|tert/.test(desc)) return 'office';
    if (/comer|comert|retail/.test(desc)) return 'retail';
    if (/indus|product|depozit|logist/.test(desc) || /^I/.test(u)) return 'industrial';
    if (/locui|reziden|^L/.test(desc) || /^L/.test(u)) return 'residential';
    return 'mixed_use';
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
    head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🚦 Trafic interactiv (Flux)</div><div style="font-size:11px;color:#94a3b8">Calculator + hartă impact trafic PUZ/PUD · ≠ Studiul Impact Trafic PDF (Rapoarte) · orientativ</div>'));
    var x = el('button', { style: ST.btnGhost }, '✕ Închide'); x.onclick = function () { ov.remove(); };
    head.appendChild(x);
    m.appendChild(head);

    var body = el('div', { style: ST.body });
    var pre = prefillFromParcel();   // null dacă nu e nicio parcelă selectată

    // meta
    body.appendChild(el('div', { style: ST.label }, 'Identificare'));
    var siteName = el('input', { style: ST.inp, placeholder: 'Denumire sit / PUZ' });
    siteName.value = (pre && pre.site_name) || ('Sit PUZ ' + (cityName() || ''));
    body.appendChild(siteName);
    if (pre) {
      body.appendChild(el('div', { style: 'font-size:11px;color:#34d399;margin-top:6px' },
        '✓ Precompletat din parcela selectată · ' + Math.round(pre.area).toLocaleString('ro-RO') +
        ' mp teren · CUT ' + pre.cut + ' · UTR ' + (pre.utr || '—') + ' → ' +
        Math.round(pre.area * pre.cut).toLocaleString('ro-RO') + ' mp ADC estimat'));
    }

    // land uses
    body.appendChild(el('div', { style: ST.label }, 'Funcțiuni propuse'));
    var luWrap = el('div');
    if (pre && pre.land_uses.length) {
      pre.land_uses.forEach(function (lu) {
        luWrap.appendChild(luRow(lu.land_use, lu.units != null ? lu.units : lu.gross_floor_area_sqm));
      });
    } else {
      luWrap.appendChild(luRow('residential', 200));
      luWrap.appendChild(luRow('office', 6000));
    }
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
    var actions = el('div', { style: 'display:flex;gap:10px;margin-top:18px;flex-wrap:wrap' });
    var runBtn = el('button', { style: ST.btn }, '▶ Calculează');
    var mapBtn = el('button', { style: ST.btn + ';display:none;background:linear-gradient(180deg,#0891b2,#0e7490)' }, '🗺 Arată pe hartă');
    var pdfBtn = el('button', { style: ST.btn + ';display:none;background:linear-gradient(180deg,#2563eb,#1d4ed8)' }, '⬇ Generează PDF');
    var stBtn = el('button', { style: ST.btn + ';display:none;background:linear-gradient(180deg,#34d399,#0f766e);color:#06101f' }, '📄 → Studiu Impact Trafic (complet)');
    var losBtn = el('button', { style: ST.btn + ';display:none;background:linear-gradient(180deg,#f59e0b,#b45309)' }, '🚦 LOS pe rețeaua reală (OSM)');
    actions.appendChild(runBtn); actions.appendChild(mapBtn); actions.appendChild(losBtn); actions.appendChild(pdfBtn); actions.appendChild(stBtn);
    body.appendChild(actions);
    m.appendChild(body);

    var lastResult = null, lastMeta = null;
    var centroid = (pre && pre.centroid) || null;

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
      lastMeta = { site_name: siteName.value, city_name: cityName(), land_uses: g.scenario.land_uses, centroid: centroid };
      G.Flux._lastStudy = { result: res, meta: lastMeta };   // pt capitolul Mobilitate din Masterplan/PMUD
      result.innerHTML = summaryHTML(res);
      // ── reține + compară scenarii ──
      var cmpWrap = document.createElement('div'); cmpWrap.style.cssText = 'margin-top:10px;border-top:1px solid rgba(255,255,255,.08);padding-top:8px';
      var keep = document.createElement('button'); keep.textContent = '💾 Reține acest scenariu'; keep.style.cssText = 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:6px 11px;cursor:pointer;font-size:12px';
      var cmpOut = document.createElement('div'); cmpOut.style.cssText = 'margin-top:8px';
      keep.onclick = function () {
        G.Flux._scenarios.push({ name: (siteName.value || 'Scenariu') + ' #' + (G.Flux._scenarios.length + 1), res: res });
        if (G.Flux._scenarios.length > 4) G.Flux._scenarios.shift();
        var n = G.Flux._scenarios.length;
        if (n >= 2) {
          var a = G.Flux._scenarios[n - 2], b = G.Flux._scenarios[n - 1], d = G.Flux.compareScenarios(a.res, b.res);
          var sgn = function (v, inv) { var good = inv ? v < 0 : v > 0; var col = v === 0 ? '#94a3b8' : good ? '#34d399' : '#f87171'; return '<b style="color:' + col + '">' + (v > 0 ? '+' : '') + v + '</b>'; };
          cmpOut.innerHTML = '<div style="font-size:11px;color:#93c5fd;font-weight:700;margin-bottom:4px">⚖ ' + a.name + ' → ' + b.name + '</div>' +
            '<div style="font-size:12px;color:#cbd5e1;line-height:1.7">Deplasări zilnice: ' + sgn(d.trips_pct, true) + '% · Cotă auto: ' + sgn(d.modal_auto_pct_change, true) + ' pp · Mobilitate sustenabilă (PT+velo+pieton): ' + sgn(d.pkm_sustainable_pct_change) + ' pp · Intersecții critice noi: ' + sgn(d.new_critical_intersections, true) + ' · CO₂: ' + sgn(d.co2_delta_tonnes_day, true) + ' t/zi</div>' +
            '<div style="font-size:10px;color:#64748b;margin-top:4px">Verde = îmbunătățire față de scenariul anterior reținut.</div>';
        } else cmpOut.innerHTML = '<div style="font-size:11px;color:#94a3b8">Scenariu reținut. Modifică parametrii, recalculează și reține din nou pentru a compara.</div>';
      };
      cmpWrap.appendChild(keep); cmpWrap.appendChild(cmpOut); result.appendChild(cmpWrap);
      pdfBtn.style.display = '';
      mapBtn.style.display = centroid ? '' : 'none';
      losBtn.style.display = (centroid && G.Flux.drawNetworkLOS) ? '' : 'none';
      stBtn.style.display = (typeof generateTrafficStudy === 'function') ? '' : 'none';
    };
    losBtn.onclick = function () { if (lastResult && centroid) { G.Flux.drawNetworkLOS(centroid, lastResult); ov.remove(); } };
    pdfBtn.onclick = function () { if (lastResult) G.Flux.generatePDF(lastResult, lastMeta); };
    // CONECTARE: calculatorul Flux deschide Studiul de Impact Trafic PDF complet (aceeași parcelă, document formal)
    stBtn.onclick = function () { if (typeof generateTrafficStudy === 'function') { ov.remove(); try { generateTrafficStudy(); } catch (e) { window.ss && ss('Studiu trafic: ' + (e.message || e)); } } };
    mapBtn.onclick = function () { if (lastResult && centroid) { G.Flux.drawOverlay(lastResult, centroid); ov.remove(); } };

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

  // Butonul flotant a fost ÎNLOCUIT cu intrarea din meniul „Intelligence & Date Live"
  // (index.html, tci-adv-menu). Curățăm orice buton vechi rămas din versiuni cache.
  function cleanupFloating() {
    var b = document.getElementById('flux-traffic-btn'); if (b) b.remove();
  }

  // ── OVERLAY PE HARTĂ ─────────────────────────────────────────────────────
  var OV_SRC = 'flux-overlay-src', OV_GLOW = 'flux-ov-glow', OV_CORE = 'flux-ov-core', OV_LBL = 'flux-ov-lbl';
  function clearOverlay() {
    var map = G.map; if (!map) return;
    [OV_LBL, OV_CORE, OV_GLOW].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} });
    try { if (map.getSource(OV_SRC)) map.removeSource(OV_SRC); } catch (e) {}
    var b = document.getElementById('flux-ov-hide'); if (b) b.remove();
  }
  function drawOverlay(res, centroid) {
    var map = G.map; if (!map || !centroid) return;
    clearOverlay();
    var over = (res.intersections || []).some(function (i) { return i.over_capacity; });
    var color = over ? '#ef4444' : (res.modal_split.auto > 0.55 ? '#f59e0b' : '#22c55e');
    var worst = (res.intersections || []).reduce(function (a, i) { return i.vc_ratio > a ? i.vc_ratio : a; }, 0);
    var feats = [{
      type: 'Feature', geometry: { type: 'Point', coordinates: centroid },
      properties: {
        kind: 'site', color: color,
        label: Math.round(res.trips.pm).toLocaleString('ro-RO') + ' depl/h vârf PM' +
          (worst > 0 ? (' · v/c max ' + worst.toFixed(2)) : '')
      }
    }];
    // intersecții cu coordonate (dacă există)
    (res.intersections || []).forEach(function (i) {
      if (i.lon == null || i.lat == null) return;
      feats.push({
        type: 'Feature', geometry: { type: 'Point', coordinates: [i.lon, i.lat] },
        properties: { kind: 'ix', color: i.over_capacity ? '#ef4444' : (i.vc_ratio > 0.75 ? '#f59e0b' : '#22c55e'), label: i.name + ' · LOS ' + i.los }
      });
    });
    map.addSource(OV_SRC, { type: 'geojson', data: { type: 'FeatureCollection', features: feats } });
    map.addLayer({
      id: OV_GLOW, type: 'circle', source: OV_SRC,
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 22, 16, 60],
        'circle-color': ['get', 'color'], 'circle-opacity': 0.18, 'circle-blur': 0.6
      }
    });
    map.addLayer({
      id: OV_CORE, type: 'circle', source: OV_SRC,
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 5, 16, 11],
        'circle-color': ['get', 'color'], 'circle-stroke-color': '#fff', 'circle-stroke-width': 1.5, 'circle-opacity': 0.95
      }
    });
    map.addLayer({
      id: OV_LBL, type: 'symbol', source: OV_SRC,
      layout: { 'text-field': ['get', 'label'], 'text-size': 12, 'text-offset': [0, 1.6], 'text-anchor': 'top', 'text-allow-overlap': true },
      paint: { 'text-color': '#fff', 'text-halo-color': '#06101f', 'text-halo-width': 1.5 }
    });
    try { map.flyTo({ center: centroid, zoom: Math.max(map.getZoom(), 14), essential: true }); } catch (e) {}
    // buton de ascundere
    if (!document.getElementById('flux-ov-hide')) {
      var b = el('button', { id: 'flux-ov-hide' }, '✕ Ascunde trafic Flux');
      b.style.cssText = 'position:fixed;bottom:210px;right:10px;z-index:3200;background:rgba(8,15,35,.92);color:#e6edf7;border:1px solid rgba(34,160,90,.4);border-radius:9px;padding:8px 11px;font-size:12px;cursor:pointer;font-family:system-ui,sans-serif';
      b.onclick = clearOverlay;
      document.body.appendChild(b);
    }
    window.ss && ss('🗺 Impact de trafic afișat pe hartă');
  }

  G.Flux = G.Flux || {};
  G.Flux.openStudiu = openModal;
  G.Flux.drawOverlay = drawOverlay;
  G.Flux.clearOverlay = clearOverlay;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', cleanupFloating);
  else cleanupFloating();
  console.log('[Flux] UI încărcat (meniu: window.Flux.openStudiu)');
})(window);
