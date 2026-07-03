/* ============================================================================
 * UrbanX — Utilități Naționale · UI (panou). window.UtilitatiRO.openPanel()
 * Dashboard LIVE Sistem Energetic Național (Transelectrica SEN) + toggle rețele
 * de transport (electric/gaz) pe hartă + referință Transelectrica/Transgaz.
 * ========================================================================== */
(function (G) {
  'use strict';
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(3,7,18,.72);z-index:3400;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:24px 12px;font-family:system-ui,-apple-system,sans-serif',
    modal: 'background:#0b1220;border:1px solid rgba(59,130,246,.35);border-radius:16px;max-width:720px;width:100%;padding:20px;color:#e6edf7;box-shadow:0 20px 60px rgba(0,0,0,.5)',
    ghost: 'background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;line-height:1',
    btn: 'background:rgba(59,130,246,.2);color:#93c5fd;border:1px solid rgba(59,130,246,.45);border-radius:8px;padding:8px 13px;font-size:12.5px;cursor:pointer;font-family:system-ui;font-weight:600'
  };
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  function N(v) { return (v || 0).toLocaleString('ro-RO'); }

  function openPanel() {
    var U = G.UtilitatiRO; if (!U) { if (G.ss) G.ss('Se inițializează…'); return; }
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:4px' });
    head.appendChild(el('div', null, '<div style="font-size:17px;font-weight:800;color:#93c5fd">🔌 Utilități Naționale</div><div style="font-size:11px;color:#94a3b8">Sistemul Energetic Național LIVE + rețele de transport (electric · gaz)</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);

    var bar = el('div', { style: 'display:flex;gap:6px;flex-wrap:wrap;margin:12px 0' });
    var bGrid = el('button', { style: ST.btn }, '🗺 Desenează rețelele pe hartă');
    bGrid.onclick = function () { ov.remove(); var c = null; try { var mp = G.map; c = mp ? [mp.getCenter().lng, mp.getCenter().lat] : null; } catch (e) {} U.drawGrid(G.map, c, 30); };
    var bRefresh = el('button', { style: ST.btn.replace('59,130,246', '148,163,184').replace('#93c5fd', '#cbd5e1') }, '⟳ Reîmprospătează LIVE');
    bar.appendChild(bGrid); bar.appendChild(bRefresh); m.appendChild(bar);

    var senBox = el('div', { style: 'background:#0a1120;border:1px solid rgba(59,130,246,.25);border-radius:12px;padding:14px;margin-bottom:10px' }); m.appendChild(senBox);
    senBox.innerHTML = '<div style="font-size:12px;color:#94a3b8">⏳ Preiau datele LIVE din Sistemul Energetic Național…</div>';

    function renderSEN() {
      senBox.innerHTML = '<div style="font-size:12px;color:#94a3b8">⏳ Preiau datele LIVE…</div>';
      U.fetchSEN().then(function (s) {
        var soldTxt = s.sold > 0 ? 'Import +' + N(s.sold) : s.sold < 0 ? 'Export ' + N(s.sold) : 'Echilibrat';
        var soldCol = s.sold > 0 ? '#f59e0b' : '#10b981';
        var mixBars = s.mix.map(function (x) {
          return '<div style="margin:3px 0"><div style="display:flex;justify-content:space-between;font-size:11px"><span>' + x.label + '</span><span style="color:#94a3b8">' + N(x.mw) + ' MW · ' + x.pct + '%</span></div>' +
            '<div style="height:7px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="height:100%;width:' + x.pct + '%;background:' + x.col + '"></div></div></div>';
        }).join('');
        var inter = s.interconn.map(function (i) { var d = i.mw > 0 ? '↓ import' : i.mw < 0 ? '↑ export' : '—'; var c = i.mw > 0 ? '#f59e0b' : '#10b981'; return '<div style="display:flex;justify-content:space-between;font-size:11px;padding:2px 0;border-top:1px solid rgba(148,163,184,.08)"><span>' + i.country + '</span><span style="color:' + c + '">' + Math.abs(i.mw) + ' MW ' + d + '</span></div>'; }).join('');
        senBox.innerHTML =
          '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">' +
          '<div style="flex:1;min-width:120px;text-align:center;background:rgba(37,99,235,.12);border-radius:9px;padding:9px"><div style="font-size:22px;font-weight:800;color:#60a5fa">' + N(s.prod) + '</div><div style="font-size:10px;color:#94a3b8">MW PRODUCȚIE</div></div>' +
          '<div style="flex:1;min-width:120px;text-align:center;background:rgba(220,38,38,.12);border-radius:9px;padding:9px"><div style="font-size:22px;font-weight:800;color:#f87171">' + N(s.cons) + '</div><div style="font-size:10px;color:#94a3b8">MW CONSUM</div></div>' +
          '<div style="flex:1;min-width:120px;text-align:center;background:rgba(245,158,11,.12);border-radius:9px;padding:9px"><div style="font-size:16px;font-weight:800;color:' + soldCol + '">' + soldTxt + '</div><div style="font-size:10px;color:#94a3b8">MW SOLD</div></div>' +
          '</div>' +
          '<div style="font-size:12px;font-weight:700;color:#93c5fd;margin:6px 0 3px">Mix de producție (surse reale)</div>' + mixBars +
          (inter ? '<div style="font-size:12px;font-weight:700;color:#93c5fd;margin:9px 0 3px">Interconexiuni transfrontaliere</div>' + inter : '') +
          '<div style="font-size:9.5px;color:#64748b;margin-top:8px">Sursă LIVE: Transelectrica — Sistemul Energetic Național' + (s.ts ? ' · actualizat ' + s.ts : '') + '. Date reale, în timp real.</div>';
      }).catch(function (e) {
        senBox.innerHTML = '<div style="font-size:12px;color:#fbbf24">Nu s-au putut prelua datele LIVE acum (' + (e && e.message) + '). Sursa: Transelectrica SEN — reîncearcă.</div>';
      });
    }
    bRefresh.onclick = renderSEN;
    renderSEN();

    // referință surse oficiale
    var refBox = el('div', { style: 'background:#0a1120;border:1px solid rgba(148,163,184,.14);border-radius:10px;padding:12px' });
    function refBlock(r) { return '<div style="font-size:12px;font-weight:700;color:#cbd5e1">' + r.sursa + '</div>' + r.fapte.map(function (f) { return '<div style="font-size:10.5px;color:#94a3b8;margin:2px 0">• ' + f + '</div>'; }).join('') + '<a href="' + r.url + '" target="_blank" rel="noopener" style="font-size:10.5px;color:#60a5fa;text-decoration:none">↗ sursă oficială</a>'; }
    refBox.innerHTML = refBlock(U.RET_REF) + '<div style="height:8px"></div>' + refBlock(U.SNT_REF);
    m.appendChild(refBox);

    m.appendChild(el('div', { style: 'font-size:9.5px;color:#64748b;margin-top:10px;line-height:1.4' }, 'Trasee din OpenStreetMap (power=line +voltage, pipeline gaz) — reale, machine-readable, prin proxy. Hărțile Transgaz/Transelectrica sunt schematice statice → folosite ca referință și denumiri, nu ca feed. Distribuția locală (110 kV/MT/JT, branșamente gaz) aparține operatorilor de distribuție.'));
    ov.appendChild(m); document.body.appendChild(ov);
  }

  G.UtilitatiRO = G.UtilitatiRO || {}; G.UtilitatiRO.openPanel = openPanel;
  console.log('[UtilitatiRO] UI încărcat (window.UtilitatiRO.openPanel)');
})(window);
