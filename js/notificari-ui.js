/* ============================================================================
 * UrbanX Notificări Vecini — UI. window.Notificari.openPanel()
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(700px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(13,148,136,.4);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:system-ui,sans-serif',
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
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🔔 Notificări vecini</div><div style="font-size:11px;color:#94a3b8">Află când se depune ceva lângă tine (planningalerts) · participare publică</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);

    var tabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:8px' });
    var t1 = el('button', { style: ST.ghost }, '🔔 Abonează-te'); var t2 = el('button', { style: ST.ghost }, '📬 Notificările mele'); var t3 = el('button', { style: ST.ghost }, '✋ Obiecții');
    [t1, t2, t3].forEach(function (t) { tabs.appendChild(t); }); body.appendChild(tabs);
    var p1 = el('div'), p2 = el('div', { style: 'display:none' }), p3 = el('div', { style: 'display:none' });
    [p1, p2, p3].forEach(function (p) { body.appendChild(p); });
    function show(n) { p1.style.display = n === 1 ? '' : 'none'; p2.style.display = n === 2 ? '' : 'none'; p3.style.display = n === 3 ? '' : 'none'; if (n === 2) renderFeed(); if (n === 3) renderObj(); }
    t1.onclick = function () { show(1); }; t2.onclick = function () { show(2); }; t3.onclick = function () { show(3); };

    // ── abonare ──
    var ac = activeCentroid();
    p1.appendChild(el('div', { style: ST.label }, 'Email (pentru viitor — acum notificările apar in-app)'));
    var email = el('input', { style: ST.inp, placeholder: 'email@exemplu.ro' }); p1.appendChild(email);
    p1.appendChild(el('div', { style: ST.label }, 'Ce zonă urmărești'));
    var modeSel = el('select', { style: ST.inp });
    [['address', ac ? ('Parcela selectată (CF ' + (ac.nrcad || '—') + ')') : 'Parcelă (selectează una pe hartă)'], ['map', 'Centrul hărții curente'], ['uat', 'Tot UAT-ul']].forEach(function (o) { modeSel.appendChild(el('option', { value: o[0] }, o[1])); });
    p1.appendChild(modeSel);
    var radWrap = el('div', { style: 'margin-top:8px' }); var radVal = el('span', { style: 'color:#5eead4;font-weight:700' }, '200 m');
    radWrap.appendChild(el('div', { style: 'font-size:12px;color:#cbd5e1;margin-bottom:4px' }, 'Rază de notificare: ')); radWrap.firstChild.appendChild(radVal);
    var rad = el('input', { type: 'range', min: '50', max: '1000', step: '50', value: '200', style: 'width:100%' }); rad.oninput = function () { radVal.textContent = rad.value + ' m'; }; radWrap.appendChild(rad); p1.appendChild(radWrap);
    var sub = el('button', { style: ST.btn + ';margin-top:12px' }, '🔔 Activează notificările'); p1.appendChild(sub);
    var subOut = el('div', { style: 'margin-top:10px' }); p1.appendChild(subOut);
    // abonari existente
    p1.appendChild(el('div', { style: ST.label }, 'Abonările mele'));
    var subList = el('div'); p1.appendChild(subList);
    function renderSubs() {
      var l = G.Notificari.subs.list();
      subList.innerHTML = l.length ? '' : '<div style="font-size:12px;color:#64748b">Nicio abonare.</div>';
      l.forEach(function (s) {
        var r = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)' });
        r.appendChild(el('span', null, (s.mode === 'uat' ? 'Tot UAT-ul' : (s.radius_m + 'm în jurul unui punct')) + ' · ' + (s.email || 'fără email')));
        var d = el('button', { style: ST.ghost + ';padding:2px 7px' }, '✕'); d.onclick = function () { G.Notificari.subs.remove(s.id); renderSubs(); }; r.appendChild(d); subList.appendChild(r);
      });
    }
    sub.onclick = function () {
      var center = null;
      if (modeSel.value === 'address') { if (!ac) { subOut.innerHTML = '<div style="color:#fca5a5;font-size:12px">Selectează o parcelă pe hartă.</div>'; return; } center = ac.c; }
      else if (modeSel.value === 'map') { if (G.map) center = [G.map.getCenter().lng, G.map.getCenter().lat]; }
      var s = G.Notificari.subs.subscribe({ email: email.value, mode: modeSel.value, center: center, radius_m: +rad.value, uat: (G.TCI && G.TCI.cityKey) });
      var matches = G.Notificari.subs.matches(s).length;
      subOut.innerHTML = '<div style="color:#34d399;font-size:13px">✓ Abonare activă. ' + matches + ' evenimente în zonă acum.</div>'; renderSubs();
    };
    renderSubs();

    function renderFeed() {
      var f = G.Notificari.feed();
      var total = f.reduce(function (n, x) { return n + x.events.length; }, 0);
      if (!G.Notificari.subs.list().length) { p2.innerHTML = '<div style="font-size:12px;color:#64748b;padding:8px 0">Abonează-te întâi la o zonă.</div>'; return; }
      var html = '<div style="font-size:12px;color:#94a3b8;margin-bottom:8px">' + total + ' evenimente în zonele tale</div>';
      var seen = {};
      f.forEach(function (x) {
        x.events.forEach(function (e) {
          if (seen[e.ref]) return; seen[e.ref] = 1;
          var col = e.type === 'CU' ? '#a78bfa' : '#5eead4';
          var dl = e.days_to_object;
          html += '<div style="background:#0a1120;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:10px;margin-bottom:6px">' +
            '<div style="display:flex;justify-content:space-between"><span style="font-weight:700;color:' + col + '">' + e.title + '</span><span style="font-size:11px;color:#94a3b8">' + new Date(e.date).toLocaleDateString('ro-RO') + '</span></div>' +
            '<div style="font-size:11px;color:#94a3b8">' + (e.sub || '') + (dl != null ? (' · termen obiecție: <b style="color:' + (dl < 3 ? '#f87171' : '#fbbf24') + '">' + (dl >= 0 ? dl + ' zile' : 'expirat') + '</b>') : '') + '</div>' +
            (e.can_object ? ('<button data-obj="' + e.ref + '|' + (e.title || '').replace(/"/g, '') + '" style="' + ST.ghost + ';margin-top:6px;padding:4px 10px;color:#fbbf24">✋ Depune obiecție</button>') : '') + '</div>';
        });
      });
      p2.innerHTML = html + '<div style="font-size:10px;color:#64748b;margin-top:6px">⚠ Notificare digitală — SUPLIMENTEAZĂ afișajul la fața locului (L.50/1991 Art.6), nu-l înlocuiește. Termen obiecție: 10 zile calendaristice (Art.7^1).</div>';
      p2.querySelectorAll('[data-obj]').forEach(function (b) { b.onclick = function () { var a = b.getAttribute('data-obj').split('|'); openObjForm(a[0], a[1]); }; });
    }
    function openObjForm(ref, title) {
      show(3); document.getElementById('uxnotif-objref').value = ref; document.getElementById('uxnotif-objtitle').textContent = 'Obiecție la: ' + title;
    }
    function renderObj() {
      p3.innerHTML = '<div style="' + ST.label + '">Depune o obiecție</div>' +
        '<div id="uxnotif-objtitle" style="font-size:12px;color:#fbbf24;margin-bottom:6px">Alege un eveniment din „Notificările mele" sau scrie referința.</div>' +
        '<input id="uxnotif-objref" style="' + ST.inp + ';margin-bottom:6px" placeholder="referință eveniment (auto)">' +
        '<input id="uxnotif-objemail" style="' + ST.inp + ';margin-bottom:6px" placeholder="email">' +
        '<textarea id="uxnotif-objtext" style="' + ST.inp + ';min-height:70px" placeholder="Motivul obiecției"></textarea>' +
        '<button id="uxnotif-objsend" style="' + ST.btn + ';margin-top:8px">✋ Trimite obiecția</button>' +
        '<div id="uxnotif-objout" style="margin-top:8px"></div>' +
        '<div style="' + ST.label + '">Obiecții depuse</div><div id="uxnotif-objlist"></div>';
      var listEl = p3.querySelector('#uxnotif-objlist');
      function rl() { var l = G.Notificari.objections.list(); listEl.innerHTML = l.length ? l.slice().reverse().map(function (o) { return '<div style="font-size:12px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><b>' + (o.email || '—') + '</b> · ' + new Date(o.created_at).toLocaleDateString('ro-RO') + '<br><span style="color:#94a3b8">' + (o.content || '') + '</span></div>'; }).join('') : '<div style="font-size:12px;color:#64748b">Nicio obiecție.</div>'; }
      p3.querySelector('#uxnotif-objsend').onclick = function () {
        var ref = p3.querySelector('#uxnotif-objref').value, txt = p3.querySelector('#uxnotif-objtext').value, em = p3.querySelector('#uxnotif-objemail').value;
        if (!txt.trim()) { p3.querySelector('#uxnotif-objout').innerHTML = '<span style="color:#fca5a5;font-size:12px">Scrie motivul.</span>'; return; }
        G.Notificari.objections.add({ event_ref: ref, email: em, content: txt });
        p3.querySelector('#uxnotif-objout').innerHTML = '<span style="color:#34d399;font-size:13px">✓ Obiecție înregistrată (apare în dosarul evenimentului).</span>';
        p3.querySelector('#uxnotif-objtext').value = ''; rl();
      };
      rl();
    }

    ov.appendChild(m); document.body.appendChild(ov);
  }
  G.Notificari = G.Notificari || {}; G.Notificari.openPanel = openPanel;
  console.log('[Notificari] UI încărcat (window.Notificari.openPanel)');
})(window);
