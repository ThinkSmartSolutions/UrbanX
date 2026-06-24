/* ============================================================================
 * UrbanX — UI Dosar Digital (05) + Sesizări (06). window.Dosar.open() ·
 * window.Sesizari.openForm() · window.Sesizari.toggleMap()
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(720px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(13,148,136,.4);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px',
    inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#0d9488,#0f766e);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#5eead4;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700'
  };
  function activeParcel() {
    try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; var centroid = null; try { if (ap.geo && G.turf) centroid = G.turf.centerOfMass(ap.geo).geometry.coordinates; } catch (e) {} return { nrcad: ap.nrcad, area: ap.area, utr: ap.utr, params: ap.params, source: ap.source, zoneLabel: ap.zoneLabel, centroid: centroid, geo: ap.geo }; } } catch (e) {} return null;
  }
  function mkOverlay() { var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); }; return ov; }
  function mkHead(title, sub, ov) { var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">' + title + '</div><div style="font-size:11px;color:#94a3b8">' + sub + '</div>')); var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); return head; }

  // ════════ DOSAR DIGITAL ════════
  function openDosar() {
    var ap = activeParcel();
    var ov = mkOverlay(); var m = el('div', { style: ST.modal });
    m.appendChild(mkHead('🗂️ Dosar Digital al imobilului', 'Pașaportul imobilului · agregare din datele UrbanX · scor indicativ', ov));
    var body = el('div', { style: ST.body }); m.appendChild(body);
    if (!ap) { body.innerHTML = '<div style="color:#fbbf24;font-size:13px">Selectează o parcelă pe hartă pentru a-i deschide dosarul digital.</div>'; ov.appendChild(m); document.body.appendChild(ov); return; }
    var d = G.Dosar.aggregate(ap);
    var sc = d.score >= 80 ? '#22c55e' : d.score >= 50 ? '#f59e0b' : '#ef4444';
    function row(l, v) { return '<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:#94a3b8">' + l + '</span><span style="font-weight:600">' + v + '</span></div>'; }
    var html = '<div style="display:flex;gap:14px;align-items:center;margin-bottom:12px">' +
      '<div style="width:84px;height:84px;border-radius:50%;border:4px solid ' + sc + ';display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0">' +
      '<div style="font-size:24px;font-weight:800;color:' + sc + '">' + d.score + '</div><div style="font-size:8px;color:#94a3b8">/100</div></div>' +
      '<div><div style="font-size:18px;font-weight:800">CF ' + (d.identitate.nrcad || '—') + '</div>' +
      '<div style="font-size:12px;color:#94a3b8">' + (d.identitate.city || '') + ' · ' + (d.identitate.area_m2 ? Math.round(d.identitate.area_m2).toLocaleString('ro-RO') + ' mp' : '—') + ' · UTR ' + (d.urbanistic.utr || '—') + '</div>' +
      '<div style="font-size:11px;color:' + sc + ';font-weight:700;margin-top:3px">Scor conformitate: ' + d.score_status.toUpperCase() + '</div></div></div>';
    html += '<div style="' + ST.label + '">Reglementări urbanistice</div>' + row('Zonă', d.urbanistic.zona || '—') + row('POT / CUT', (d.urbanistic.pot != null ? d.urbanistic.pot + '%' : '—') + ' / ' + (d.urbanistic.cut != null ? d.urbanistic.cut : '—'));
    html += '<div style="' + ST.label + '">Istoric autorizații (' + d.autorizatii.length + ')</div>';
    html += d.autorizatii.length ? d.autorizatii.map(function (a) { return row(a.type + ' ' + (a.number || ''), (a.date ? new Date(a.date).toLocaleDateString('ro-RO') : '') + ' · ' + (a.status || '')); }).join('') : '<div style="font-size:12px;color:#64748b">Nicio autorizație în UrbanX pentru această parcelă.</div>';
    html += '<div style="' + ST.label + '">Sesizări (' + d.sesizari.length + ' · deschise ' + d.open_sesizari + ')</div>';
    html += d.sesizari.length ? d.sesizari.map(function (s) { var c = (G.Sesizari && G.Sesizari.CATEGORIES[s.category]) || {}; return row((c.icon || '') + ' ' + (c.label || s.category), (s.status || '') + (s.flag_no_permit ? ' ⚠' : '')); }).join('') : '<div style="font-size:12px;color:#64748b">Nicio sesizare legată de parcelă.</div>';
    if (d.deductions.length) html += '<div style="margin-top:10px;font-size:11px;color:#f87171">Scor: ' + d.deductions.join(' · ') + '</div>';
    html += '<div style="margin-top:10px;font-size:10px;color:#64748b">Date din sistem: ' + (d.data_available.join(', ') || '—') + '. Indisponibile: ' + d.data_missing.join(', ') + '. Scor INDICATIV, fără valoare legală.</div>';
    body.innerHTML = html;
    var pdf = el('button', { style: ST.btn + ';margin-top:14px' }, '⬇ Extras dosar (PDF)'); pdf.onclick = function () { G.Dosar.generatePDF(d); }; body.appendChild(pdf);
    ov.appendChild(m); document.body.appendChild(ov);
  }

  // ════════ SESIZĂRI ════════
  function openSesizareForm() {
    var ap = activeParcel();
    var loc = (ap && ap.centroid) || (G.map && [G.map.getCenter().lng, G.map.getCenter().lat]) || null;
    var ov = mkOverlay(); var m = el('div', { style: ST.modal });
    m.appendChild(mkHead('📢 Sesizare urbană', 'Raportează o problemă pe hartă · UAT-ul o urmărește', ov));
    var body = el('div', { style: ST.body }); m.appendChild(body);

    // tabs
    var tabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:8px' });
    var t1 = el('button', { style: ST.ghost }, '➕ Sesizare nouă'); var t2 = el('button', { style: ST.ghost }, '📋 Listă & statistici');
    tabs.appendChild(t1); tabs.appendChild(t2); body.appendChild(tabs);
    var p1 = el('div'); var p2 = el('div', { style: 'display:none' }); body.appendChild(p1); body.appendChild(p2);
    t1.onclick = function () { p1.style.display = ''; p2.style.display = 'none'; }; t2.onclick = function () { p1.style.display = 'none'; p2.style.display = ''; renderList(); };

    p1.appendChild(el('div', { style: ST.label }, 'Categorie'));
    var catSel = el('select', { style: ST.inp }); Object.keys(G.Sesizari.CATEGORIES).forEach(function (k) { var c = G.Sesizari.CATEGORIES[k]; catSel.appendChild(el('option', { value: k }, c.icon + ' ' + c.label)); }); p1.appendChild(catSel);
    p1.appendChild(el('div', { style: ST.label }, 'Titlu & descriere'));
    var title = el('input', { style: ST.inp, placeholder: 'Titlu scurt' }); p1.appendChild(title);
    var desc = el('textarea', { style: ST.inp + ';margin-top:6px;min-height:60px', placeholder: 'Descriere' }); p1.appendChild(desc);
    var prio = el('select', { style: ST.inp + ';margin-top:6px' }); G.Sesizari.PRIORITIES.forEach(function (pp) { prio.appendChild(el('option', { value: pp }, 'Prioritate: ' + pp)); }); prio.value = 'medie'; p1.appendChild(prio);
    p1.appendChild(el('div', { style: 'font-size:11px;color:' + (loc ? '#34d399' : '#fbbf24') + ';margin-top:8px' }, loc ? ('📍 Locație: ' + (ap && ap.centroid ? 'parcela selectată (CF ' + (ap.nrcad || '—') + ')' : 'centrul hărții') + ' — ' + loc[1].toFixed(5) + ', ' + loc[0].toFixed(5)) : '⚠ Fără locație — selectează o parcelă sau deschide harta.'));
    // GDPR: sesizarea (text + locatie) e afisata public pe harta UAT
    var gdprS = el('label', { style: 'display:flex;gap:7px;align-items:flex-start;font-size:10px;color:#94a3b8;margin-top:10px;cursor:pointer;line-height:1.4' });
    var gdprSCb = el('input', { type: 'checkbox', style: 'margin-top:2px;flex-shrink:0' });
    gdprS.appendChild(gdprSCb);
    gdprS.appendChild(el('span', null, 'Sesizarea (text + locatie) va fi afisata PUBLIC pe harta UAT. NU includeti date cu caracter personal (nume, telefon, CNP) in descriere. Sunt de acord cu publicarea. (GDPR - Reg. UE 2016/679)'));
    p1.appendChild(gdprS);
    var send = el('button', { style: ST.btn + ';margin-top:12px' }, '📤 Trimite sesizarea'); p1.appendChild(send);
    var out = el('div', { style: 'margin-top:10px' }); p1.appendChild(out);
    send.onclick = function () {
      if (!title.value.trim()) { out.innerHTML = '<div style="color:#fca5a5;font-size:12px">Adaugă un titlu.</div>'; return; }
      if (!gdprSCb.checked) { out.innerHTML = '<div style="color:#fbbf24;font-size:12px">Bifati acordul de publicare (GDPR) pentru a trimite sesizarea.</div>'; return; }
      var s = G.Sesizari.registry.add({ category: catSel.value, title: title.value, description: desc.value, priority: prio.value, geom: loc, linked_parcel: ap ? { nrcad: ap.nrcad } : null, address_text: (ap && ap.nrcad ? 'CF ' + ap.nrcad : ''), consent: true, consentTs: new Date().toISOString() });
      var extra = s.flag_no_permit ? '<div style="color:#f87171;font-size:12px;margin-top:4px">⚠ Cross-check CAU: nicio autorizație găsită pentru parcelă → marcat PRIORITATE MARE.</div>' : (s.cau_check && s.cau_check.has_permit ? '<div style="color:#34d399;font-size:12px;margin-top:4px">✓ Parcela are ' + s.cau_check.permits + ' autorizație(i) în CAU.</div>' : '');
      out.innerHTML = '<div style="color:#34d399;font-size:13px">✓ Sesizare înregistrată (' + s.id.slice(0, 8) + '). Apare pe hartă & în dosarul parcelei.</div>' + extra;
      title.value = ''; desc.value = '';
      try { if (G.Sesizari._mapOn) G.Sesizari.toggleMap(true); } catch (e) {}
    };

    function renderList() {
      var st = G.Sesizari.registry.stats(); var list = G.Sesizari.registry.list().slice().reverse();
      var head = '<div style="display:flex;gap:8px;margin-bottom:10px">' +
        card(st.total, 'total') + card(st.open, 'deschise', '#f59e0b') + card(st.avg_resolution_days != null ? st.avg_resolution_days + ' z' : '—', 'timp mediu', '#60a5fa') + '</div>';
      var rows = list.length ? list.map(function (s) {
        var c = G.Sesizari.CATEGORIES[s.category] || {}; var scol = s.status === 'rezolvata' ? '#22c55e' : s.status === 'respinsa' ? '#94a3b8' : '#f59e0b';
        return '<div style="background:#0a1120;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:9px;margin-bottom:6px">' +
          '<div style="display:flex;justify-content:space-between"><span style="font-weight:700">' + (c.icon || '') + ' ' + (s.title || c.label) + '</span><span style="color:' + scol + ';font-size:11px;font-weight:700">' + s.status + (s.flag_no_permit ? ' ⚠' : '') + '</span></div>' +
          '<div style="font-size:11px;color:#94a3b8;margin-top:2px">' + (c.label || '') + ' · prioritate ' + (s.priority || '—') + ' · ' + new Date(s.created_at).toLocaleDateString('ro-RO') + '</div>' +
          statusBtns(s) + '</div>';
      }).join('') : '<div style="font-size:12px;color:#64748b">Nicio sesizare încă.</div>';
      p2.innerHTML = head + rows;
      p2.querySelectorAll('[data-act]').forEach(function (b) { b.onclick = function () { var a = b.getAttribute('data-act').split('|'); if (a[0] === 'st') G.Sesizari.registry.setStatus(a[1], a[2]); else if (a[0] === 'del') G.Sesizari.registry.remove(a[1]); renderList(); try { if (G.Sesizari._mapOn) G.Sesizari.toggleMap(true); } catch (e) {} }; });
    }
    function statusBtns(s) {
      return '<div style="display:flex;gap:5px;margin-top:6px;flex-wrap:wrap">' +
        '<button data-act="st|' + s.id + '|in_lucru" style="' + ST.ghost + ';padding:3px 8px">în lucru</button>' +
        '<button data-act="st|' + s.id + '|rezolvata" style="' + ST.ghost + ';padding:3px 8px;color:#34d399">rezolvată</button>' +
        '<button data-act="del|' + s.id + '" style="' + ST.ghost + ';padding:3px 8px">🗑</button></div>';
    }
    function card(big, small, col) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:' + (col || '#5eead4') + '">' + big + '</div><div style="font-size:10px;color:#94a3b8">' + small + '</div></div>'; }

    ov.appendChild(m); document.body.appendChild(ov);
  }

  // hartă: pini sesizări pe window.map
  var SRC = 'sesizari-src', LYR = 'sesizari-lyr', LBL = 'sesizari-lbl';
  function toggleMap(forceOn) {
    var map = G.map; if (!map) { G.ss && ss('Harta nu e pregătită'); return; }
    if (G.Sesizari._mapOn && !forceOn) {
      [LBL, LYR].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} });
      try { if (map.getSource(SRC)) map.removeSource(SRC); } catch (e) {}
      G.Sesizari._mapOn = false; var b = document.getElementById('sesizari-hide'); if (b) b.remove(); return;
    }
    var data = G.Sesizari.registry.mapGeoJSON();
    if (map.getSource(SRC)) map.getSource(SRC).setData(data);
    else {
      map.addSource(SRC, { type: 'geojson', data: data });
      map.addLayer({ id: LYR, type: 'circle', source: SRC, paint: { 'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 5, 16, 9], 'circle-color': ['get', 'color'], 'circle-stroke-color': '#fff', 'circle-stroke-width': 1.5, 'circle-opacity': 0.92 } });
      map.addLayer({ id: LBL, type: 'symbol', source: SRC, layout: { 'text-field': ['get', 'icon'], 'text-size': 13, 'text-allow-overlap': true } });
    }
    G.Sesizari._mapOn = true;
    if (!document.getElementById('sesizari-hide')) {
      var hb = el('button', { id: 'sesizari-hide' }, '✕ Ascunde sesizări'); hb.style.cssText = 'position:fixed;bottom:130px;right:10px;z-index:3200;background:rgba(8,15,35,.92);color:#e6edf7;border:1px solid rgba(13,148,136,.5);border-radius:9px;padding:8px 11px;font-size:12px;cursor:pointer;font-family:system-ui,sans-serif';
      hb.onclick = function () { toggleMap(); }; document.body.appendChild(hb);
    }
    G.ss && ss('📍 ' + (data.features.length) + ' sesizări pe hartă');
  }

  G.Dosar = G.Dosar || {}; G.Dosar.open = openDosar;
  G.Sesizari = G.Sesizari || {}; G.Sesizari.openForm = openSesizareForm; G.Sesizari.toggleMap = toggleMap;
  console.log('[Wave1] UI Dosar + Sesizări încărcat');
})(window);
