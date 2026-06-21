/* ============================================================================
 * UrbanX Notificări vecini — UI CORECT (onest).
 * Mecanismul real (planningalerts): autoritatea publică cererea → server face
 * matching geospatial cu abonații → trimite email. Aici, client-side, livrăm
 * partea care FUNCȚIONEAZĂ și e legal relevantă: LATURA PRIMĂRIEI — identificarea
 * vecinilor afectați dintr-o zonă de notificare (buffer). Abonarea + emailul către
 * cetățeni = marcate clar ca Faza 2 (server + primăria publică cererile în platformă).
 * window.Notificari.openPanel() · drawZone()
 * Legal: Legea 50/1991 art. 6 (afișare) + art. 7¹ (10 zile obiecție) · Aarhus.
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(700px,96vw);max-height:93vh;overflow:auto;border:1px solid rgba(13,148,136,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#0d9488,#0f766e);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#5eead4;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700'
  };
  function activeCentroid() { try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; if (ap.geo && G.turf) return { c: G.turf.centerOfMass(ap.geo).geometry.coordinates, nrcad: ap.nrcad }; } } catch (e) {} return null; }

  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🔔 Notificarea vecinilor afectați</div><div style="font-size:11px;color:#94a3b8">Latura primăriei: identifică afectații dintr-o zonă (PostGIS) · Legea 50/1991 art. 6</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);

    var tabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:8px' });
    var t1 = el('button', { style: ST.ghost }, '🏛 Vecini afectați (primărie)'); var t2 = el('button', { style: ST.ghost }, '🔔 Abonare & email (Faza 2)');
    tabs.appendChild(t1); tabs.appendChild(t2); body.appendChild(tabs);
    var p1 = el('div'); var p2 = el('div', { style: 'display:none' }); body.appendChild(p1); body.appendChild(p2);
    t1.onclick = function () { p1.style.display = ''; p2.style.display = 'none'; }; t2.onclick = function () { p1.style.display = 'none'; p2.style.display = ''; };

    // ── PANE 1: latura primăriei (funcționează) ──
    var ac = activeCentroid();
    p1.appendChild(el('div', { style: 'font-size:12px;color:#cbd5e1;margin-bottom:6px' }, 'Când primăria înregistrează un PUZ/AC, trebuie să notifice vecinii afectați. Selectează parcela cererii + raza de notificare (50-200m); sistemul desenează zona și identifică imobilele afectate.'));
    p1.appendChild(el('div', { style: 'font-size:11px;color:' + (ac ? '#34d399' : '#fbbf24') + ';margin-bottom:6px' }, ac ? ('📍 Cerere pe: CF ' + (ac.nrcad || '—')) : '⚠ Selectează parcela cererii (sau se folosește centrul hărții).'));
    p1.appendChild(el('div', { style: ST.label }, 'Rază de notificare'));
    var radWrap = el('div'); var radVal = el('span', { style: 'color:#5eead4;font-weight:700' }, '100 m');
    radWrap.appendChild(el('span', { style: 'font-size:12px;color:#cbd5e1' }, 'Rază: ')); radWrap.firstChild.appendChild(radVal);
    var rad = el('input', { type: 'range', min: '50', max: '300', step: '10', value: '100', style: 'width:100%' }); rad.oninput = function () { radVal.textContent = rad.value + ' m'; }; radWrap.appendChild(rad); p1.appendChild(radWrap);
    var idBtn = el('button', { style: ST.btn + ';margin-top:10px' }, '🔎 Identifică vecinii afectați'); p1.appendChild(idBtn);
    var out = el('div', { style: 'margin-top:12px' }); p1.appendChild(out);
    idBtn.onclick = function () {
      var c = (ac && ac.c) || (G.map && [G.map.getCenter().lng, G.map.getCenter().lat]);
      if (!c) { out.innerHTML = '<div style="color:#fca5a5;font-size:13px">Selectează o parcelă sau deschide harta.</div>'; return; }
      out.innerHTML = '<div style="font-size:12px;color:#94a3b8">⏳ Identific imobilele din zona de notificare (OSM)...</div>';
      G.Notificari.fetchAffected(c, +rad.value).then(function (r) {
        drawZone(c, +rad.value, r.sample);
        out.innerHTML = '<div style="background:#0a1120;border:1px solid rgba(13,148,136,.3);border-radius:10px;padding:12px">' +
          '<div style="display:flex;gap:8px"><div style="flex:1;text-align:center"><div style="font-size:22px;font-weight:800;color:#5eead4">' + r.buildings + '</div><div style="font-size:10px;color:#94a3b8">imobile în zonă</div></div>' +
          '<div style="flex:1;text-align:center"><div style="font-size:22px;font-weight:800;color:#34d399">' + r.residential + '</div><div style="font-size:10px;color:#94a3b8">rezidențiale (est.)</div></div>' +
          '<div style="flex:1;text-align:center"><div style="font-size:22px;font-weight:800;color:#60a5fa">' + rad.value + 'm</div><div style="font-size:10px;color:#94a3b8">rază notificare</div></div></div>' +
          '<div style="font-size:11px;color:#94a3b8;margin-top:8px">Zona + imobilele afectate sunt desenate pe hartă. Acestea sunt proprietarii de notificat. Termen de obiecție: 10 zile (L.50/1991 art. 7¹).</div></div>' +
          '<div style="font-size:10px;color:#64748b;margin-top:8px">⚠ Imobile estimate din OpenStreetMap (best-effort). Pentru lista exactă de proprietari (nume/CF) = date cadastrale ANCPI. Notificarea digitală SUPLIMENTEAZĂ afișajul fizic la fața locului (art. 6), nu-l înlocuiește.</div>';
      }).catch(function () { drawZone(c, +rad.value, []); out.innerHTML = '<div style="font-size:12px;color:#fbbf24">Zona de notificare desenată pe hartă. Numărul de imobile (OSM) n-a putut fi citit — verificare manuală.</div>'; });
    };

    // ── PANE 2: abonare + email = Faza 2 (server) ──
    p2.appendChild(el('div', { style: 'background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:10px;padding:12px;font-size:12px;color:#fca5a5;margin-bottom:10px' },
      '⚠ <b>Necesită server + ca primăria să publice cererile în UrbanX.</b> Mecanismul real (planningalerts): cetățeanul se abonează la o zonă → la fiecare cerere nouă publicată de primărie, un server face matching geospatial → trimite email. Abonarea de mai jos e doar un <b>preview local</b> (în acest browser); livrarea reală prin email = Faza 2 (backend + email).'));
    p2.appendChild(el('div', { style: ST.label }, 'Abonare (preview local)'));
    var email = el('input', { style: ST.inp, placeholder: 'email@exemplu.ro' }); p2.appendChild(email);
    var subBtn = el('button', { style: ST.ghost + ';margin-top:8px' }, 'Salvează abonarea (local)'); p2.appendChild(subBtn);
    var subOut = el('div', { style: 'margin-top:8px' }); p2.appendChild(subOut);
    subBtn.onclick = function () {
      var ac2 = activeCentroid();
      var s = G.Notificari.subs.subscribe({ email: email.value, mode: ac2 ? 'address' : 'uat', center: ac2 ? ac2.c : null, radius_m: 200, uat: (G.TCI && G.TCI.cityKey) });
      var matches = G.Notificari.subs.matches(s).length;
      subOut.innerHTML = '<div style="font-size:12px;color:#34d399">✓ Abonare salvată local. ' + matches + ' evenimente în zonă (din registrele platformei). Emailul real vine cu serverul.</div>';
    };
    // evenimente in platforma (din CAU/Sesizari) — ce ar fi notificat
    p2.appendChild(el('div', { style: ST.label }, 'Evenimente înregistrate în platformă (ce s-ar notifica)'));
    var ev = G.Notificari.events();
    p2.appendChild(el('div', { style: 'font-size:12px;color:#94a3b8' }, ev.length ? (ev.length + ' evenimente (CU/sesizări). Cu serverul, abonații din rază ar primi email + termen obiecție 10 zile.') : 'Niciun eveniment încă (apar pe măsură ce se înregistrează CU în CAU / sesizări).'));

    ov.appendChild(m); document.body.appendChild(ov);
  }

  // ── desen zonă de notificare + imobile afectate pe hartă ──
  var ZSRC = 'notif-zone-src', ZLY = 'notif-zone-ly', ZLN = 'notif-zone-ln', ASRC = 'notif-aff-src', ALY = 'notif-aff-ly';
  function drawZone(centroid, radius, samplePts) {
    var map = G.map; if (!map) return;
    [ZLN, ZLY, ALY].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} });
    [ZSRC, ASRC].forEach(function (id) { try { if (map.getSource(id)) map.removeSource(id); } catch (e) {} });
    var poly = G.Notificari.zonePolygon(centroid, radius);
    if (poly) {
      map.addSource(ZSRC, { type: 'geojson', data: poly });
      map.addLayer({ id: ZLY, type: 'fill', source: ZSRC, paint: { 'fill-color': '#0d9488', 'fill-opacity': 0.12 } });
      map.addLayer({ id: ZLN, type: 'line', source: ZSRC, paint: { 'line-color': '#5eead4', 'line-width': 2, 'line-dasharray': [2, 1] } });
    }
    if (samplePts && samplePts.length) {
      map.addSource(ASRC, { type: 'geojson', data: { type: 'FeatureCollection', features: samplePts.map(function (p) { return { type: 'Feature', geometry: { type: 'Point', coordinates: p }, properties: {} }; }) } });
      map.addLayer({ id: ALY, type: 'circle', source: ASRC, paint: { 'circle-radius': 4, 'circle-color': '#f59e0b', 'circle-opacity': 0.85, 'circle-stroke-color': '#fff', 'circle-stroke-width': 0.6 } });
    }
    try { map.flyTo({ center: centroid, zoom: Math.max(map.getZoom(), 15) }); } catch (e) {}
    if (!document.getElementById('notif-hide')) { var b = el('button', { id: 'notif-hide' }, '✕ Ascunde zona notificare'); b.style.cssText = 'position:fixed;bottom:130px;right:10px;z-index:3200;background:rgba(8,15,35,.92);color:#e6edf7;border:1px solid rgba(13,148,136,.5);border-radius:9px;padding:8px 11px;font-size:12px;cursor:pointer;font-family:system-ui'; b.onclick = function () { [ZLN, ZLY, ALY].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} }); [ZSRC, ASRC].forEach(function (id) { try { if (map.getSource(id)) map.removeSource(id); } catch (e) {} }); b.remove(); }; document.body.appendChild(b); }
  }
  G.Notificari = G.Notificari || {}; G.Notificari.openPanel = openPanel; G.Notificari.drawZone = drawZone;
  console.log('[Notificari] UI corectat încărcat (window.Notificari.openPanel)');
})(window);
