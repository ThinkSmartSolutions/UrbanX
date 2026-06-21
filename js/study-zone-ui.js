/* ============================================================================
 * UrbanX — StudyZone UI (builder). window.StudyZone.openBuilder()
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(680px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(34,211,238,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#06b6d4,#0891b2);color:#06101f;border:0;border-radius:9px;padding:10px 14px;font-weight:700;cursor:pointer;font-size:13px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#67e8f9;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  function openBuilder() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">📐 Zonă de studiu (StudyZone)</div><div style="font-size:11px;color:#94a3b8">Definește o zonă FĂRĂ nr. cadastral · folosită de toate modulele</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    var msg = el('div', { style: 'font-size:12px;min-height:16px;margin-bottom:6px;color:#67e8f9' }); body.appendChild(msg);
    function ok(t) { msg.style.color = '#34d399'; msg.textContent = t; renderList(); }
    function err(t) { msg.style.color = '#fca5a5'; msg.textContent = t; }

    // metoda 1: OSM feature (flagship — Bahlui)
    body.appendChild(el('div', { style: ST.label }, 'A. Element OSM (râu, parc, cale ferată) + buffer'));
    var g1 = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr 70px;gap:6px' });
    var osmQ = el('input', { style: ST.inp, placeholder: 'ex: râul Bahlui Iași' });
    var osmBuf = el('input', { style: ST.inp, type: 'number', value: '120', title: 'buffer m' });
    var osmBtn = el('button', { style: ST.btn }, 'Caută');
    [osmQ, osmBuf, osmBtn].forEach(function (e) { g1.appendChild(e); }); body.appendChild(g1);
    osmBtn.onclick = function () { if (!osmQ.value.trim()) return; msg.textContent = '⏳ Caut „' + osmQ.value + '" în OSM...'; G.StudyZone.fromOSM(osmQ.value, +osmBuf.value || 0).then(function (z) { G.StudyZone.drawOnMap(z); ok('✓ Zonă creată: ' + z.name + ' (' + z.area_ha + ' ha)'); }).catch(function (e2) { err('⚠ ' + (e2.message || 'OSM indisponibil')); }); };

    // metoda 2: adresă + rază
    body.appendChild(el('div', { style: ST.label }, 'B. Adresă + rază'));
    var g2 = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr 70px;gap:6px' });
    var adrQ = el('input', { style: ST.inp, placeholder: 'ex: Piața Unirii Iași' });
    var adrR = el('input', { style: ST.inp, type: 'number', value: '400', title: 'rază m' });
    var adrBtn = el('button', { style: ST.btn }, 'Creează');
    [adrQ, adrR, adrBtn].forEach(function (e) { g2.appendChild(e); }); body.appendChild(g2);
    adrBtn.onclick = function () { if (!adrQ.value.trim()) return; msg.textContent = '⏳ Geocodez...'; G.StudyZone.fromAddressRadius(adrQ.value, +adrR.value || 300).then(function (z) { G.StudyZone.drawOnMap(z); ok('✓ Zonă creată: ' + z.name + ' (' + z.area_ha + ' ha)'); }).catch(function (e2) { err('⚠ ' + (e2.message || 'adresă negăsită')); }); };

    // metoda 3: parcela selectată + buffer
    body.appendChild(el('div', { style: ST.label }, 'C. Parcela selectată (+ buffer opțional)'));
    var g3 = el('div', { style: 'display:grid;grid-template-columns:1fr 70px;gap:6px' });
    var pBuf = el('input', { style: ST.inp, type: 'number', value: '0', title: 'buffer m' });
    var pBtn = el('button', { style: ST.btn }, 'Creează');
    g3.appendChild(pBuf); g3.appendChild(pBtn); body.appendChild(g3);
    pBtn.onclick = function () { var z = G.StudyZone.fromParcel(+pBuf.value || 0); if (z) { G.StudyZone.drawOnMap(z); ok('✓ Zonă din parcelă: ' + z.area_ha + ' ha'); } else err('⚠ Selectează o parcelă pe hartă.'); };

    // metoda 4: desen pe hartă
    body.appendChild(el('div', { style: ST.label }, 'D. Desenează pe hartă'));
    var g4 = el('div', { style: 'display:flex;gap:6px' });
    var drawBtn = el('button', { style: ST.ghost }, '✏ Începe desenul'); var finBtn = el('button', { style: ST.btn + ';display:none' }, '✓ Finalizează');
    g4.appendChild(drawBtn); g4.appendChild(finBtn); body.appendChild(g4);
    drawBtn.onclick = function () { ov.style.display = 'none'; G.StudyZone.startDraw(function () {}); msg.textContent = ''; finBtn.style.display = ''; drawBtn.style.display = 'none'; setTimeout(function () { ov.style.display = 'flex'; }, 100); G.ss && ss('Click pe hartă pt vârfuri; revino și apasă Finalizează'); };
    finBtn.onclick = function () { var z = G.StudyZone._finishDraw && G.StudyZone._finishDraw('Zonă desenată'); finBtn.style.display = 'none'; drawBtn.style.display = ''; if (z) ok('✓ Zonă desenată: ' + z.area_ha + ' ha'); else err('Minim 3 puncte.'); };

    // lista zonelor + activă + folosește în modul
    body.appendChild(el('div', { style: ST.label }, 'Zonele mele de studiu'));
    var list = el('div'); body.appendChild(list);
    function renderList() {
      var zs = G.StudyZone.registry.list(); var aid = G.StudyZone.registry.activeId();
      if (!zs.length) { list.innerHTML = '<div style="font-size:12px;color:#64748b">Nicio zonă încă.</div>'; return; }
      list.innerHTML = '';
      zs.slice().reverse().forEach(function (z) {
        var act = z.id === aid;
        var row = el('div', { style: 'background:#0a1120;border:1px solid ' + (act ? 'rgba(34,211,238,.5)' : 'rgba(255,255,255,.08)') + ';border-radius:8px;padding:9px;margin-bottom:6px' });
        row.appendChild(el('div', { style: 'display:flex;justify-content:space-between' }, '<span style="font-weight:700;font-size:12px">' + (act ? '★ ' : '') + z.name + '</span><span style="font-size:11px;color:#67e8f9">' + z.area_ha + ' ha · ' + (z.perimeter_m || 0) + ' m</span>'));
        var ca = el('div', { style: 'display:flex;gap:5px;margin-top:6px;flex-wrap:wrap' });
        function b(txt, fn, col) { var bb = el('button', { style: ST.ghost + ';padding:3px 8px' + (col ? (';color:' + col) : '') }, txt); bb.onclick = fn; ca.appendChild(bb); }
        b(act ? '★ activă' : 'setează activă', function () { G.StudyZone.registry.setActive(z.id); G.StudyZone.drawOnMap(z); renderList(); }, act ? '#34d399' : null);
        b('🗺 arată', function () { G.StudyZone.drawOnMap(z); });
        // folosește în module care acceptă o zonă
        if (G.UHI) b('→ UHI', function () { G.StudyZone.registry.setActive(z.id); ov.remove(); G.UHI.openPanel(); });
        if (G.Superbloc) b('→ Superbloc', function () { G.StudyZone.registry.setActive(z.id); ov.remove(); G.Superbloc.openPanel(); });
        b('🗑', function () { G.StudyZone.registry.remove(z.id); G.StudyZone.clearMap(); renderList(); });
        row.appendChild(ca); list.appendChild(row);
      });
    }
    renderList();
    body.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:10px' }, 'Zona activă (★) e folosită de modulele care acceptă o zonă de studiu (LOISIR, UHI, Superbloc, Mobilitate). Geometriile OSM/adresă vin prin Nominatim (gratuit). Buffer asimetric (mal stâng/drept) + import SHP = etapă viitoare.'));
    ov.appendChild(m); document.body.appendChild(ov);
  }
  G.StudyZone = G.StudyZone || {}; G.StudyZone.openBuilder = openBuilder;
  console.log('[StudyZone] UI builder încărcat (window.StudyZone.openBuilder)');
})(window);
