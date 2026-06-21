/* ============================================================================
 * UrbanX — Superbloc (model Barcelona / Salvador Rueda).
 * Grupează ~9 cvartale (~400×400m), deviază tranzitul pe perimetru, eliberează
 * interiorul pentru pietoni/verde. Calculează spațiul public recâștigat, beneficiul
 * de răcire (legat de UHI), populația deservită. Overlay pe hartă.
 * window.Superbloc.compute(input) · openPanel() · drawOverlay()
 * Surse: Agència d'Ecologia Urbana Barcelona · ISGlobal · plan Cerdà.
 * ========================================================================== */
(function (G) {
  'use strict';
  function compute(inp) {
    var side = +inp.side_m || 400;
    var area = side * side;                       // m²
    var streetPct = inp.street_pct == null ? 0.20 : +inp.street_pct;  // % carosabil din superbloc
    var freePct = inp.free_pct == null ? 0.65 : +inp.free_pct;        // % interior eliberat
    var dens = +inp.density_loc_ha || 200;        // loc/ha (urban dens)
    var streetArea = area * streetPct;
    var freed = Math.round(streetArea * freePct);            // m² spațiu public recâștigat
    var green = Math.round(freed * 0.55), playSquare = Math.round(freed * 0.45);
    var pop = Math.round(area / 10000 * dens);
    // răcire: tratăm spațiul verde nou ca parc (folosim logica UHI dacă există)
    var cooling = null;
    try { if (G.UHI) { var c = G.UHI.calculateCooling('parc_urban', green); cooling = c ? c.cooling_c : null; } } catch (e) {}
    if (cooling == null) cooling = Math.round(Math.min(3, 0.0004 * green) * 100) / 100;
    var co2 = Math.round(green / 10000 * 5.5 * 10) / 10;
    return {
      side_m: side, area_ha: Math.round(area / 10000 * 10) / 10,
      freed_m2: freed, green_m2: green, play_square_m2: playSquare,
      population: pop, cooling_c: cooling, co2_t_year: co2,
      transit_note: 'tranzitul auto → perimetru; interior 10 km/h, prioritate pieton/biciclist; acces doar rezidenți, livrări, urgențe'
    };
  }

  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(620px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(251,146,60,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#fb923c,#ea580c);color:#06101f;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#fdba74;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700'
  };
  function centroid() { try { var m = G.map; if (m) return [m.getCenter().lng, m.getCenter().lat]; } catch (e) {} return null; }

  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🟧 Superbloc (model Barcelona)</div><div style="font-size:11px;color:#94a3b8">Tranzit pe perimetru · interior pentru oameni · spațiu public recâștigat</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    body.appendChild(el('div', { style: 'font-size:12px;color:#cbd5e1;margin-bottom:6px' }, 'Grupează ~9 cvartale într-o zonă de ~400×400m. Mașinile de tranzit ocolesc pe perimetru; interiorul devine zonă cu 10 km/h unde pietonii și bicicliștii au prioritate, iar carosabilul eliberat devine verde + piațete.'));
    body.appendChild(el('div', { style: ST.label }, 'Parametri'));
    var g = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px' });
    var side = el('input', { style: ST.inp, type: 'number', value: '400' });
    var dens = el('input', { style: ST.inp, type: 'number', value: '200' });
    var freep = el('input', { style: ST.inp, type: 'number', value: '65' });
    [['Latură superbloc (m)', side], ['Densitate (loc/ha)', dens], ['% carosabil eliberat', freep]].forEach(function (o) { var w = el('div'); w.appendChild(el('div', { style: 'font-size:11px;color:#cbd5e1;margin-bottom:3px' }, o[0])); w.appendChild(o[1]); g.appendChild(w); });
    body.appendChild(g);
    var run = el('button', { style: ST.btn + ';margin-top:12px' }, '▶ Calculează'); body.appendChild(run);
    var mapBtn = el('button', { style: ST.ghost + ';margin-top:12px;margin-left:8px' }, '🗺 Arată pe hartă'); body.appendChild(mapBtn);
    var out = el('div', { style: 'margin-top:12px' }); body.appendChild(out);
    var last = null;
    run.onclick = function () {
      var r = compute({ side_m: +side.value, density_loc_ha: +dens.value, free_pct: (+freep.value || 65) / 100 }); last = r;
      var N = function (x) { return Math.round(x).toLocaleString('ro-RO'); };
      function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;text-align:center"><div style="font-size:17px;font-weight:800;color:' + (c || '#fdba74') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
      out.innerHTML = '<div style="display:flex;gap:8px;margin-bottom:8px">' + card(N(r.freed_m2) + ' mp', 'spațiu public recâștigat', '#22c55e') + card(N(r.population), 'locuitori deserviți') + card('−' + r.cooling_c + '°C', 'răcire (verde nou)', '#34d399') + '</div>' +
        '<div style="display:flex;gap:8px;margin-bottom:8px">' + card(N(r.green_m2) + ' mp', 'verde') + card(N(r.play_square_m2) + ' mp', 'piațete/joacă') + card(r.co2_t_year + ' t', 'CO₂/an') + '</div>' +
        '<div style="font-size:11px;color:#94a3b8">' + r.transit_note + '</div>' +
        '<div style="font-size:10px;color:#64748b;margin-top:8px">Model Barcelona (S. Rueda). Estimări pe baza ratei de carosabil eliberat — necesită studiu de trafic pt rerutarea de perimetru.</div>';
    };
    mapBtn.onclick = function () { drawOverlay(+side.value || 400); ov.remove(); };
    ov.appendChild(m); document.body.appendChild(ov);
  }

  var SRC = 'superbloc-src', LYR = 'superbloc-fill', LN = 'superbloc-line';
  function drawOverlay(side) {
    var map = G.map; var c = centroid(); if (!map || !c) { G.ss && ss('Harta nu e pregătită'); return; }
    [LN, LYR].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} }); try { if (map.getSource(SRC)) map.removeSource(SRC); } catch (e) {}
    var half = (side || 400) / 2; var dLat = half / 111320, dLon = half / (111320 * Math.cos(c[1] * Math.PI / 180));
    var sq = [[c[0] - dLon, c[1] - dLat], [c[0] + dLon, c[1] - dLat], [c[0] + dLon, c[1] + dLat], [c[0] - dLon, c[1] + dLat], [c[0] - dLon, c[1] - dLat]];
    map.addSource(SRC, { type: 'geojson', data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [sq] }, properties: {} } });
    map.addLayer({ id: LYR, type: 'fill', source: SRC, paint: { 'fill-color': '#fb923c', 'fill-opacity': 0.18 } });
    map.addLayer({ id: LN, type: 'line', source: SRC, paint: { 'line-color': '#fb923c', 'line-width': 3, 'line-dasharray': [2, 1] } });
    try { map.flyTo({ center: c, zoom: Math.max(map.getZoom(), 15) }); } catch (e) {}
    if (!document.getElementById('superbloc-hide')) { var b = el('button', { id: 'superbloc-hide' }, '✕ Ascunde superbloc'); b.style.cssText = 'position:fixed;bottom:130px;right:10px;z-index:3200;background:rgba(8,15,35,.92);color:#e6edf7;border:1px solid rgba(251,146,60,.5);border-radius:9px;padding:8px 11px;font-size:12px;cursor:pointer;font-family:system-ui'; b.onclick = function () { [LN, LYR].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} }); try { if (map.getSource(SRC)) map.removeSource(SRC); } catch (e) {} b.remove(); }; document.body.appendChild(b); }
    G.ss && ss('🟧 Superbloc ~' + (side || 400) + '×' + (side || 400) + 'm pe hartă');
  }
  G.Superbloc = { compute: compute, openPanel: openPanel, drawOverlay: drawOverlay };
  console.log('[Superbloc] model Barcelona încărcat (window.Superbloc)');
})(window);
