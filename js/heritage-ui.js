/* ============================================================================
 * UrbanX Heritage — UI. window.Heritage.openPanel() · toggleMap()
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(680px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(220,38,38,.35);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#dc2626,#b91c1c);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#fca5a5;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700'
  };
  function activeCentroid() { try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; if (ap.geo && G.turf) return G.turf.centerOfMass(ap.geo).geometry.coordinates; } } catch (e) {} return null; }

  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🏛️ Inventar Patrimoniu (GIS)</div><div style="font-size:11px;color:#94a3b8">Monumente & zone protejate · alimentează avizarea CAU · ≠ Studiul Patrimoniu PDF</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);

    var topRow = el('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' });
    var mapBtn = el('button', { style: ST.ghost }, '🗺 Arată pe hartă'); mapBtn.onclick = function () { toggleMap(); }; topRow.appendChild(mapBtn);
    if (typeof generateIstoricStudy === 'function') {
      var stBtn = el('button', { style: ST.ghost + ';color:#fbbf24' }, '📄 → Studiu Patrimoniu & Istoric (PDF)');
      stBtn.onclick = function () { ov.remove(); try { generateIstoricStudy(); } catch (e) { window.ss && ss('Studiu patrimoniu: ' + (e.message || e)); } };
      topRow.appendChild(stBtn);
    }
    body.appendChild(topRow);

    // listă
    body.appendChild(el('div', { style: ST.label }, 'Inventar (' + G.Heritage.registry.list().length + ')'));
    var list = el('div'); body.appendChild(list);
    function renderList() {
      var items = G.Heritage.registry.list();
      list.innerHTML = items.map(function (h) {
        var col = h.protection_level === 'A' ? '#f87171' : h.protection_level === 'B' ? '#fbbf24' : '#a78bfa';
        var legal = h.data_source === 'lmi_oficial' ? 'LMI oficial (protecție legală)' : h.data_source === 'inventar_local' ? 'inventar local' : 'propunere';
        var r = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)' });
        r.innerHTML = '<span><b style="color:' + col + '">●</b> ' + h.name + ' <span style="color:#64748b">· ' + (h.address || '') + ' · ' + legal + (h.lmi_code ? ' · ' + h.lmi_code : '') + '</span></span>';
        var d = el('button', { style: ST.ghost + ';padding:2px 7px' }, '✕'); d.onclick = function () { G.Heritage.registry.remove(h.id); renderList(); if (G.Heritage._mapOn) toggleMap(true); }; r.appendChild(d);
        list.appendChild(r);
      }) && null;
      if (!items.length) list.innerHTML = '<div style="font-size:12px;color:#64748b">Niciun obiect. Adaugă mai jos.</div>';
    }
    list.innerHTML = ''; G.Heritage.registry.list().forEach(function () {}); renderList();

    // propune / adaugă
    body.appendChild(el('div', { style: ST.label }, 'Propune monument (din parcela selectată / centrul hărții)'));
    var nm = el('input', { style: ST.inp, placeholder: 'Denumire' }); body.appendChild(nm);
    var grid = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px' });
    var catSel = el('select', { style: ST.inp }); Object.keys(G.Heritage.CATEGORIES).forEach(function (k) { catSel.appendChild(el('option', { value: k }, G.Heritage.CATEGORIES[k])); });
    var lvlSel = el('select', { style: ST.inp }); [['A', 'A — național (LMI)'], ['B', 'B — local'], ['recomandat', 'Recomandat (propunere)']].forEach(function (o) { lvlSel.appendChild(el('option', { value: o[0] }, o[1])); }); lvlSel.value = 'recomandat';
    grid.appendChild(catSel); grid.appendChild(lvlSel); body.appendChild(grid);
    var add = el('button', { style: ST.btn + ';margin-top:10px' }, '🏛️ Adaugă în inventar'); body.appendChild(add);
    var out = el('div', { style: 'margin-top:8px' }); body.appendChild(out);
    add.onclick = function () {
      var loc = activeCentroid() || (G.map && [G.map.getCenter().lng, G.map.getCenter().lat]);
      if (!nm.value.trim()) { out.innerHTML = '<span style="color:#fca5a5;font-size:12px">Adaugă denumirea.</span>'; return; }
      if (!loc) { out.innerHTML = '<span style="color:#fca5a5;font-size:12px">Selectează o parcelă sau deschide harta.</span>'; return; }
      G.Heritage.registry.add({ name: nm.value, category: catSel.value, protection_level: lvlSel.value, geom: loc, condition: 'medie', data_source: lvlSel.value === 'A' ? 'lmi_oficial' : 'inventar_local', address: '' });
      out.innerHTML = '<span style="color:#34d399;font-size:13px">✓ Adăugat. Apare pe hartă + în avizarea CAU pentru parcelele din rază.</span>';
      nm.value = ''; renderList(); if (G.Heritage._mapOn) toggleMap(true);
    };
    body.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:10px' }, '⚠ Statutul LMI (nivel A) are valoare legală; „inventar local"/„recomandat" — nu. Import LMI complet din Excel Min. Culturii = Faza 2.'));

    ov.appendChild(m); document.body.appendChild(ov);
  }

  var SRC = 'heritage-src', LYR = 'heritage-lyr', LBL = 'heritage-lbl';
  function toggleMap(forceOn) {
    var map = G.map; if (!map) { G.ss && ss('Harta nu e pregătită'); return; }
    if (G.Heritage._mapOn && !forceOn) {
      [LBL, LYR].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} });
      try { if (map.getSource(SRC)) map.removeSource(SRC); } catch (e) {}
      G.Heritage._mapOn = false; var b = document.getElementById('heritage-hide'); if (b) b.remove(); return;
    }
    var data = G.Heritage.registry.mapGeoJSON();
    if (map.getSource(SRC)) map.getSource(SRC).setData(data);
    else {
      map.addSource(SRC, { type: 'geojson', data: data });
      map.addLayer({ id: LYR, type: 'circle', source: SRC, paint: { 'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 6, 16, 11], 'circle-color': ['get', 'color'], 'circle-stroke-color': '#fff', 'circle-stroke-width': 1.5, 'circle-opacity': 0.92 } });
      map.addLayer({ id: LBL, type: 'symbol', source: SRC, layout: { 'text-field': '🏛️', 'text-size': 13, 'text-allow-overlap': true } });
    }
    G.Heritage._mapOn = true;
    if (!document.getElementById('heritage-hide')) { var hb = el('button', { id: 'heritage-hide' }, '✕ Ascunde patrimoniu'); hb.style.cssText = 'position:fixed;bottom:170px;right:10px;z-index:3200;background:rgba(8,15,35,.92);color:#e6edf7;border:1px solid rgba(220,38,38,.5);border-radius:9px;padding:8px 11px;font-size:12px;cursor:pointer;font-family:system-ui,sans-serif'; hb.onclick = function () { toggleMap(); }; document.body.appendChild(hb); }
    G.ss && ss('🏛️ ' + data.features.length + ' monumente pe hartă');
  }
  G.Heritage = G.Heritage || {}; G.Heritage.openPanel = openPanel; G.Heritage.toggleMap = toggleMap;
  console.log('[Heritage] UI încărcat (window.Heritage.openPanel)');
})(window);
