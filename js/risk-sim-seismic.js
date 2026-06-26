/* ============================================================================
 * UrbanX — risk-sim-seismic.js — Simulare cutremur interactivă (mag. 5–8)
 * pentru ORICE UAT. Model macroseismic transparent, fără invenții:
 *   - Sursa Vrancea (intermediară, INFP): φ0=45.68°N, λ0=26.62°E, h=95 km
 *   - Intensitate epicentrală: I0 = 1.5·M − 1.5
 *   - Atenuare Kövesligethy: I = I0 − 3·log10(R/h) − 3·α·log10(e)·(R−h)
 *   - PGA din intensitate (Wald et al. 1999): I = 3.66·log10(PGA) − 1.66
 *   - Avarieri pe grade EMS-98 (Grünthal 1998)
 * Comparare cu rezistența de proiectare ag (P100-1/2022) a UAT-ului.
 * MAP_VAR = window.map. Pattern overlay/sursă identic cu superbloc.js.
 * ========================================================================== */
(function (G) {
  'use strict';

  // ── Sursa seismogenă Vrancea (intermediară) — INFP ──
  var VR = { lat: 45.68, lon: 26.62, h: 95 };          // h în km
  var ALPHA = 0.003;                                    // coef. absorbție /km
  var LOG10E = 0.4342944819;

  // ── ag de proiectare per județ (P100-1/2022) — identic seismic-fix.js ──
  var AG_JUDET = {
    'VN': 0.40, 'BZ': 0.40, 'IS': 0.35, 'GL': 0.35, 'BC': 0.35, 'NT': 0.35,
    'VS': 0.35, 'B': 0.35, 'IF': 0.35, 'PH': 0.35, 'BR': 0.35, 'IL': 0.35,
    'BT': 0.20, 'SV': 0.20, 'CT': 0.20, 'TL': 0.20, 'CL': 0.20, 'GR': 0.25,
    'TR': 0.25, 'OT': 0.25, 'DJ': 0.25, 'GJ': 0.25, 'AG': 0.25, 'DB': 0.25,
    'VL': 0.25, 'MH': 0.20, 'AB': 0.15, 'SB': 0.15, 'MS': 0.15, 'HR': 0.15,
    'CV': 0.15, 'CS': 0.15, 'HD': 0.15, 'BV': 0.15, 'CJ': 0.10, 'BH': 0.10,
    'AR': 0.10, 'TM': 0.10, 'SM': 0.10, 'MM': 0.10, 'SJ': 0.10, 'BN': 0.10
  };

  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  function roman(i) { var k = Math.max(1, Math.min(12, Math.round(i))); return ROMAN[k]; }

  function haversineKm(la1, lo1, la2, lo2) {
    var R = 6371, dLa = (la2 - la1) * Math.PI / 180, dLo = (lo2 - lo1) * Math.PI / 180;
    var a = Math.sin(dLa / 2) * Math.sin(dLa / 2) +
      Math.cos(la1 * Math.PI / 180) * Math.cos(la2 * Math.PI / 180) * Math.sin(dLo / 2) * Math.sin(dLo / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
  }

  // ── MODEL PUR (fără DOM) ──
  function computeSeismic(lat, lon, M, judet) {
    var dEpi = haversineKm(VR.lat, VR.lon, lat, lon);     // distanță epicentrală km
    var R = Math.sqrt(dEpi * dEpi + VR.h * VR.h);          // distanță hipocentrală km
    var I0 = 1.5 * M - 1.5;                                // intensitate epicentrală
    var I = I0 - 3 * Math.log10(R / VR.h) - 3 * ALPHA * LOG10E * (R - VR.h);
    I = Math.max(1, Math.min(12, I));
    var pga = Math.pow(10, (I + 1.66) / 3.66);             // cm/s²  (Wald 1999)
    var pga_g = pga / 981;                                 // g
    var ag = (judet && AG_JUDET[judet] != null) ? AG_JUDET[judet] : null;
    return { dEpi: dEpi, R: R, I0: I0, I: I, pga: pga, pga_g: pga_g, ag: ag, M: M };
  }

  // EMS-98 (Grünthal 1998) — efecte + bandă avarieri pe stoc tipic mixt RO
  function emsDescriptor(I) {
    var k = Math.round(I);
    if (k <= 4) return { eff: 'Resimțit slab — fără avarieri structurale.', dmg: '0%', col: '#22c55e' };
    if (k === 5) return { eff: 'Resimțit puternic — fisuri fine la tencuieli, obiecte deplasate.', dmg: '~1–3% (grad 1)', col: '#84cc16' };
    if (k === 6) return { eff: 'Avarieri ușoare (grad 1–2): fisuri în pereți, coșuri afectate la clădiri vulnerabile.', dmg: '10–20% grad 1–2', col: '#eab308' };
    if (k === 7) return { eff: 'Avarieri moderate (grad 2–3): crăpături mari, căderi de tencuială, zidărie veche avariată.', dmg: '5–15% grad 3', col: '#f59e0b' };
    if (k === 8) return { eff: 'Avarieri grele (grad 3–4): pereți crăpați, prăbușiri parțiale la clădiri neconsolidate.', dmg: '15–30% grad 4', col: '#f97316' };
    if (k === 9) return { eff: 'Distrugeri (grad 4–5): colaps la zidărie nearmată, avarii structurale grave la beton.', dmg: '>30% grad 4–5', col: '#ef4444' };
    return { eff: 'Distrugeri generalizate (grad 5): colaps masiv inclusiv structuri rezistente.', dmg: '>50% grad 5', col: '#b91c1c' };
  }

  // culoare pe intensitate (scară USGS ShakeMap simplificată)
  function shakeColor(I) {
    var k = Math.round(I);
    return k <= 4 ? '#a7f3d0' : k === 5 ? '#bef264' : k === 6 ? '#fde047' :
      k === 7 ? '#fb923c' : k === 8 ? '#f87171' : k === 9 ? '#ef4444' : '#b91c1c';
  }

  // distanța epicentrală (km) la care intensitatea = Itarget (inversez atenuarea, bisecție)
  function intensityRadiusKm(M, Itarget) {
    var I0 = 1.5 * M - 1.5;
    if (Itarget >= I0) return 0;
    function intensAt(d) { var R = Math.sqrt(d * d + VR.h * VR.h); return I0 - 3 * Math.log10(R / VR.h) - 3 * ALPHA * LOG10E * (R - VR.h); }
    var lo = 0, hi = 1200; // intensitatea scade cu distanța → bisecție
    for (var i = 0; i < 40; i++) { var mid = (lo + hi) / 2; if (intensAt(mid) > Itarget) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  }

  // ── HARTĂ — câmp macroseismic real (inele izoseiste centrate pe epicentru) ──
  function drawOnMap(map, lat, lon, res) {
    if (!map || !G.turf) return;
    var I0 = res.I0;
    // benzi de intensitate EMS-98 vizibile (de la cea mai mică spre cea mai mare)
    var levels = [];
    for (var I = 4; I <= Math.min(10, Math.floor(I0)); I++) {
      var rad = intensityRadiusKm(res.M, I); if (rad > 1) levels.push({ I: I, rad: rad });
    }
    levels.sort(function (a, b) { return b.rad - a.rad; }); // mari întâi (jos), mici deasupra
    var fills = [], lines = [], labels = [];
    levels.forEach(function (lv, idx) {
      var poly;
      try { poly = G.turf.circle([VR.lon, VR.lat], lv.rad, { steps: 96, units: 'kilometers' }); } catch (e) { return; }
      var c = shakeColor(lv.I), desc = emsDescriptor(lv.I);
      poly.properties = { col: c, I: lv.I };
      fills.push(poly);
      lines.push(Object.assign({}, poly, { properties: { col: c } }));
      // eticheta benzii — desfăcută în evantai pe arcul de NV→NE (ca să NU se suprapună)
      var bearing = -50 + idx * (100 / Math.max(1, levels.length - 1));
      var lp;
      try { lp = G.turf.destination([VR.lon, VR.lat], lv.rad, bearing, { units: 'kilometers' }).geometry.coordinates; }
      catch (e) { lp = [VR.lon, VR.lat + lv.rad / 111]; }
      labels.push({ type: 'Feature', geometry: { type: 'Point', coordinates: lp },
        properties: { txt: 'Intensitate ' + roman(lv.I) + '  ·  ' + desc.dmg } });
    });
    var epi = { type: 'Feature', geometry: { type: 'Point', coordinates: [VR.lon, VR.lat] }, properties: {} };
    var city = { type: 'Feature', geometry: { type: 'Point', coordinates: [lon, lat] },
      properties: { txt: (G.TCI && G.TCI.cityName ? G.TCI.cityName : 'UAT') + ' · Int. ' + roman(res.I) } };
    var link = { type: 'Feature', geometry: { type: 'LineString', coordinates: [[VR.lon, VR.lat], [lon, lat]] }, properties: {} };
    var setOrAdd = function (id, data) { try { if (map.getSource(id)) map.getSource(id).setData(data); else map.addSource(id, { type: 'geojson', data: data }); } catch (e) {} };
    setOrAdd('seis-iso-src', { type: 'FeatureCollection', features: fills });
    setOrAdd('seis-isoline-src', { type: 'FeatureCollection', features: lines });
    setOrAdd('seis-isolbl-src', { type: 'FeatureCollection', features: labels });
    setOrAdd('seis-epi-src', epi); setOrAdd('seis-city-src', city); setOrAdd('seis-link-src', link);
    var addLayer = function (def, before) { try { if (!map.getLayer(def.id)) map.addLayer(def, before); } catch (e) {} };
    addLayer({ id: 'seis-iso-fill', type: 'fill', source: 'seis-iso-src',
      paint: { 'fill-color': ['get', 'col'], 'fill-opacity': 0.22 } });
    addLayer({ id: 'seis-iso-line', type: 'line', source: 'seis-isoline-src',
      paint: { 'line-color': ['get', 'col'], 'line-width': 2, 'line-opacity': 0.95 } });
    addLayer({ id: 'seis-link', type: 'line', source: 'seis-link-src',
      paint: { 'line-color': '#fca5a5', 'line-width': 1.5, 'line-dasharray': [3, 2], 'line-opacity': 0.6 } });
    addLayer({ id: 'seis-iso-lbl', type: 'symbol', source: 'seis-isolbl-src',
      layout: { 'text-field': ['get', 'txt'], 'text-size': 13, 'text-anchor': 'center', 'text-allow-overlap': true },
      paint: { 'text-color': '#ffffff', 'text-halo-color': '#0b0f1c', 'text-halo-width': 2.4 } });
    addLayer({ id: 'seis-epi', type: 'circle', source: 'seis-epi-src',
      paint: { 'circle-radius': 7, 'circle-color': '#7f1d1d', 'circle-stroke-color': '#fecaca', 'circle-stroke-width': 2 } });
    addLayer({ id: 'seis-epi-lbl', type: 'symbol', source: 'seis-epi-src',
      layout: { 'text-field': '★ Epicentru Vrancea (h=95 km)', 'text-size': 12.5, 'text-offset': [0, 1.4], 'text-anchor': 'top', 'text-allow-overlap': true },
      paint: { 'text-color': '#ffffff', 'text-halo-color': '#450a0a', 'text-halo-width': 2.2 } });
    addLayer({ id: 'seis-city', type: 'circle', source: 'seis-city-src',
      paint: { 'circle-radius': 8, 'circle-color': shakeColor(res.I), 'circle-stroke-color': '#fff', 'circle-stroke-width': 2.5 } });
    addLayer({ id: 'seis-city-lbl', type: 'symbol', source: 'seis-city-src',
      layout: { 'text-field': ['get', 'txt'], 'text-size': 12, 'text-offset': [0, 1.5], 'text-anchor': 'top', 'text-allow-overlap': true },
      paint: { 'text-color': '#fff', 'text-halo-color': '#0a0e1f', 'text-halo-width': 2 } });
    // încadrează epicentru + oraș
    try {
      var b = [[Math.min(VR.lon, lon), Math.min(VR.lat, lat)], [Math.max(VR.lon, lon), Math.max(VR.lat, lat)]];
      map.fitBounds(b, { padding: 90, duration: 1100, maxZoom: 9 });
    } catch (e) {}
  }
  var _pulseRAF = null, _pulseT = 0;
  function _pulse(map, col) {
    if (_pulseRAF) cancelAnimationFrame(_pulseRAF);
    function step() {
      _pulseT += 0.03;
      var o = 0.12 + 0.14 * (0.5 + 0.5 * Math.sin(_pulseT * 2));
      try { if (map.getLayer('seis-disk')) map.setPaintProperty('seis-disk', 'circle-opacity', o); } catch (e) {}
      if (map.getLayer('seis-disk')) _pulseRAF = requestAnimationFrame(step);
    }
    step();
  }
  function clearMap(map) {
    if (_pulseRAF) { cancelAnimationFrame(_pulseRAF); _pulseRAF = null; }
    if (!map) return;
    ['seis-buildings', 'seis-disk', 'seis-iso-fill', 'seis-iso-line', 'seis-iso-lbl', 'seis-link', 'seis-epi', 'seis-epi-lbl', 'seis-city', 'seis-city-lbl'].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} });
    ['seis-disk-src', 'seis-iso-src', 'seis-isoline-src', 'seis-isolbl-src', 'seis-epi-src', 'seis-city-src', 'seis-link-src'].forEach(function (id) { try { if (map.getSource(id)) map.removeSource(id); } catch (e) {} });
  }

  // ── DIALOG ──
  var _ov = null, _M = 7.0;
  function _curJudet() { try { return (G.TCI && (TCI.d && TCI.d.judet)) || (TCI && TCI.cityData && TCI.cityData.judet) || null; } catch (e) { return null; } }
  function _curCenter() { var m = G.map; if (!m) return null; var c = m.getCenter(); return { lat: c.lat, lon: c.lng }; }

  function openPanel() {
    closePanel();
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,16,.7);z-index:9100;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
    ov.onclick = function (e) { if (e.target === ov) closePanel(); };
    var box = document.createElement('div');
    box.id = 'seis-dialog';
    box.style.cssText = 'position:relative;background:#0b1424;color:#e6edf7;width:min(560px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(239,68,68,.4);border-radius:14px;font-family:system-ui,sans-serif;padding:18px 20px';
    ov.appendChild(box); document.body.appendChild(ov); _ov = ov;
    var c = _curCenter(), j = _curJudet();
    var loc = c ? (c.lat.toFixed(3) + '°N, ' + c.lon.toFixed(3) + '°E') : '— deschideți pe un UAT —';
    box.innerHTML =
      '<button onclick="RiskSeismic.close();if(window.SimLab&&SimLab.openDashboard)SimLab.openDashboard()" title="Înapoi la SimLab" style="position:absolute;top:12px;right:44px;background:rgba(212,175,55,.14);border:1px solid rgba(212,175,55,.35);color:#e9d08a;font-size:10px;font-weight:700;border-radius:7px;padding:4px 8px;cursor:pointer">← SimLab</button>' +
      '<button onclick="RiskSeismic.close()" style="position:absolute;top:12px;right:14px;background:none;border:0;color:#94a3b8;font-size:20px;cursor:pointer">×</button>' +
      '<div style="display:flex;align-items:center;gap:8px"><span style="font-size:22px">🌐</span>' +
      '<h3 style="margin:0;font-size:17px;font-weight:700">Simulare cutremur — scenariu Vrancea</h3></div>' +
      '<p style="margin:4px 0 12px;font-size:12px;opacity:0.6">UAT curent: ' + loc + (j ? ' · jud. ' + j : '') + ' · model macroseismic transparent</p>' +
      '<div style="font-size:11px;font-weight:700;color:#ef4444;letter-spacing:1px;margin-bottom:8px">MAGNITUDINE SCENARIU (Mw)</div>' +
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">' +
      '<input id="seis-mag" type="range" min="5" max="8" step="0.1" value="' + _M + '" oninput="RiskSeismic._setM(this.value)" style="flex:1">' +
      '<div id="seis-mag-val" style="font-size:22px;font-weight:800;color:#f59e0b;min-width:56px;text-align:center">' + _M.toFixed(1) + '</div></div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;font-size:10px;opacity:0.6">' +
      '<span>Repere: 1986 M6.9 · 1990 M6.9 · 1977 M7.4 · 1940 M7.7</span></div>' +
      '<button class="uxc-btn uxc-btn--primary" style="width:100%;background:#dc2626;border:0" onclick="RiskSeismic.run()">▶ Simulează + desenează pe hartă</button>' +
      '<div id="seis-results" style="display:none;margin-top:16px"></div>' +
      '<p style="font-size:10px;opacity:0.4;margin-top:14px;line-height:1.5">Model: sursă Vrancea intermediară (INFP, h=95 km) · atenuare Kövesligethy · PGA↔intensitate Wald et&nbsp;al. 1999 · avarieri EMS-98 (Grünthal 1998). ⚠ Scenariu orientativ — NU înlocuiește un studiu de microzonare seismică sau evaluarea structurală individuală (P100-3).</p>';
  }
  function _setM(v) { _M = parseFloat(v) || 7.0; var el = document.getElementById('seis-mag-val'); if (el) el.textContent = _M.toFixed(1); }

  function run() {
    var c = _curCenter(); if (!c) { alert('Deschideți simularea cu harta centrată pe un UAT.'); return; }
    var j = _curJudet();
    var r = computeSeismic(c.lat, c.lon, _M, j);
    drawOnMap(G.map, c.lat, c.lon, r);
    var d = emsDescriptor(r.I);
    var agCmp = '';
    if (r.ag != null) {
      var ratio = r.pga_g / r.ag;
      var verdict = ratio > 1.3 ? '<span style="color:#ef4444;font-weight:700">DEPĂȘEȘTE rezistența de proiectare</span> — clădirile dimensionate la cod sunt solicitate peste capacitate.' :
        ratio > 0.85 ? '<span style="color:#f59e0b;font-weight:700">aproape de limita de proiectare</span> — solicitare severă, clădiri vechi vulnerabile.' :
          '<span style="color:#22c55e;font-weight:700">sub rezistența de proiectare</span> — structurile conforme P100 rezistă.';
      agCmp = '<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:10px 12px;margin-top:8px;font-size:12px;line-height:1.5">' +
        'PGA scenariu <b>' + r.pga_g.toFixed(2) + 'g</b> vs. ag proiectare <b>' + r.ag.toFixed(2) + 'g</b> (P100-1/2022, jud. ' + j + ') → raport <b>' + ratio.toFixed(2) + '×</b>.<br>' + verdict + '</div>';
    }
    var html =
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
      _kpi('Intensitate (EMS-98)', roman(r.I) + ' <span style="font-size:13px;opacity:.6">(' + r.I.toFixed(1) + ')</span>', d.col) +
      _kpi('PGA estimat', r.pga_g.toFixed(2) + ' g', '#f59e0b') +
      _kpi('Distanță epicentru', Math.round(r.dEpi) + ' km', '#93c5fd') +
      _kpi('Avarieri stoc', d.dmg, d.col) +
      '</div>' +
      '<div style="background:' + d.col + '22;border-left:3px solid ' + d.col + ';border-radius:6px;padding:10px 12px;margin-top:10px;font-size:12.5px;line-height:1.5">' + d.eff + '</div>' +
      agCmp +
      '<div style="font-size:10.5px;opacity:0.55;margin-top:10px;line-height:1.6">' +
      '<b>Formule:</b> I₀ = 1,5·M − 1,5 = ' + r.I0.toFixed(1) + ' &nbsp;·&nbsp; ' +
      'I = I₀ − 3·log₁₀(R/h) − 3·α·log₁₀(e)·(R−h), R = ' + Math.round(r.R) + ' km, h = 95 km, α = 0,003 &nbsp;·&nbsp; ' +
      'PGA: I = 3,66·log₁₀(PGA) − 1,66 <i>(Wald — calibrare crustală; pentru sursele adânci Vrancea reprezintă o estimare de limită superioară).</i></div>';
    var rd = document.getElementById('seis-results'); if (rd) { rd.style.display = 'block'; rd.innerHTML = html; }
    _dock();
    // încadrarea epicentru+oraș se face în drawOnMap (câmp macroseismic regional)
  }
  // dupa simulare: dialogul devine non-blocant + se muta in colt ca sa fie vizibil desenul pe harta
  function _dock() {
    try {
      if (!_ov) return;
      _ov.style.background = 'transparent'; _ov.style.pointerEvents = 'none';
      _ov.style.alignItems = 'flex-start'; _ov.style.justifyContent = 'flex-start';
      var box = document.getElementById('seis-dialog');
      if (box) { box.style.pointerEvents = 'auto'; box.style.width = 'min(380px,94vw)'; box.style.maxHeight = '86vh'; box.style.margin = '58px 0 0 12px'; box.style.boxShadow = '0 12px 44px rgba(0,0,0,.7)'; }
    } catch (e) {}
  }
  function _kpi(label, val, col) {
    return '<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:10px 12px;text-align:center">' +
      '<div style="font-size:19px;font-weight:800;color:' + col + '">' + val + '</div>' +
      '<div style="font-size:10.5px;opacity:0.6;margin-top:2px">' + label + '</div></div>';
  }
  function closePanel() { if (_ov) { try { _ov.remove(); } catch (e) {} _ov = null; } try { clearMap(G.map); } catch (e) {} }

  G.RiskSeismic = { openPanel: openPanel, open: openPanel, run: run, close: closePanel, clear: function () { clearMap(G.map); }, _setM: _setM, compute: computeSeismic };
})(window);
