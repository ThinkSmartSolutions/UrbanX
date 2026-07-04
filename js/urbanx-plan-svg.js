/* ============================================================================
 * UrbanX — Plan FUNCȚIONAL schematic din modelul funcțional (D._spatii).
 * Fiecare spațiu = bloc dimensionat pe suprafață, împachetat pe niveluri (P/E),
 * colorat pe categorie. Export: SVG, PDF (print), DXF (AutoCAD/BricsCAD — DWG prin ODA).
 * NU e planșa DTAC finală cotată (aceea cere geometrie/proiectare) — e planul
 * funcțional/diagramă de zonare, punct de plecare real din model.
 * window.UXPlanSVG.open(spatii)
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) for (var k in a) e.setAttribute(k, a[k]); if (h != null) e.innerHTML = h; return e; }
  var CATCOL = { Primire: '#60a5fa', Administrativ: '#a78bfa', Medical: '#34d399', Recuperare: '#22d3ee', 'Masă': '#fbbf24', 'Bloc alimentar': '#f59e0b', Sanitare: '#38bdf8', Tehnic: '#94a3b8', 'Activități': '#f472b6', Personal: '#c084fc', Sport: '#4ade80', Producție: '#fb923c', Depozitare: '#a3a3a3', Cazare: '#818cf8', 'Educațional': '#2dd4bf', Energie: '#f87171', PSI: '#ef4444', 'Circulații': '#cbd5e1', Diverse: '#9ca3af' };
  var SCALE = 9, GAP = 6, PAD = 16, W = 940; // px/m

  // Împachetare pe rafturi (shelf packing) per nivel. Întoarce {levels:[{niv,rects:[...],h}], w, h}
  function layout(spatii) {
    var byNiv = {}; (spatii || []).forEach(function (r) { var k = r.niv || 'P'; (byNiv[k] = byNiv[k] || []).push(r); });
    var order = Object.keys(byNiv).sort();
    var levels = [], yTop = 0;
    order.forEach(function (niv) {
      var rooms = byNiv[niv].slice().sort(function (a, b) { return (b.buc * b.mp_unit) - (a.buc * a.mp_unit); });
      var x = 0, y = 0, rowH = 0, rects = [];
      rooms.forEach(function (r) {
        var buc = +r.buc || 1;
        for (var k = 0; k < buc; k++) {
          var A = Math.max(4, +r.mp_unit || 4);
          var w = Math.max(46, Math.min(260, Math.round(Math.sqrt(A) * SCALE * 1.25)));
          var h = Math.max(36, Math.round(A * SCALE * SCALE / w));
          h = Math.min(h, 150);
          if (x + w > W) { x = 0; y += rowH + GAP; rowH = 0; }
          rects.push({ x: x, y: y, w: w, h: h, room: r });
          x += w + GAP; rowH = Math.max(rowH, h);
        }
      });
      var lh = y + rowH;
      levels.push({ niv: niv === 'E' ? 'ETAJ' : (niv === 'S' ? 'SUBSOL' : 'PARTER'), rects: rects, h: lh, yTop: yTop });
      yTop += lh + 42;
    });
    return { levels: levels, w: W, h: yTop };
  }

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function toSVG(lay, title) {
    var H = lay.h + PAD * 2 + 30;
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + (lay.w + PAD * 2) + '" height="' + H + '" font-family="system-ui,Arial" font-size="10">';
    s += '<rect width="100%" height="100%" fill="#ffffff"/>';
    s += '<text x="' + PAD + '" y="20" font-size="15" font-weight="700" fill="#1F3864">' + esc(title || 'PLAN FUNCȚIONAL (schematic din model)') + '</text>';
    lay.levels.forEach(function (lv) {
      var oy = 40 + lv.yTop;
      s += '<text x="' + PAD + '" y="' + (oy - 6) + '" font-size="12" font-weight="700" fill="#2F5496">' + esc(lv.niv) + '</text>';
      lv.rects.forEach(function (rc) {
        var col = CATCOL[rc.room.cat] || '#9ca3af';
        var x = PAD + rc.x, y = oy + rc.y;
        s += '<rect x="' + x + '" y="' + y + '" width="' + rc.w + '" height="' + rc.h + '" fill="' + col + '" fill-opacity="0.22" stroke="' + col + '" stroke-width="1.2"/>';
        var nm = esc((rc.room.nume || '').length > 22 ? rc.room.nume.slice(0, 21) + '…' : rc.room.nume);
        s += '<text x="' + (x + 4) + '" y="' + (y + 14) + '" fill="#111">' + nm + '</text>';
        s += '<text x="' + (x + 4) + '" y="' + (y + 27) + '" fill="#555">' + (Math.round(rc.room.mp_unit || 0)) + ' mp</text>';
      });
    });
    s += '</svg>';
    return s;
  }

  // DXF minimal (R12) — dreptunghiuri (POLYLINE) + etichete (TEXT) pe layere per nivel. Deschide în AutoCAD/BricsCAD; DWG prin ODA.
  function toDXF(lay) {
    var e = [];
    function p(code, val) { e.push(code); e.push(val); }
    e.push('0'); e.push('SECTION'); e.push('2'); e.push('ENTITIES');
    lay.levels.forEach(function (lv) {
      var layer = lv.niv;
      lv.rects.forEach(function (rc) {
        // în DXF y crește în sus; folosim scala 1 unitate = 1 metru → împărțim px la SCALE
        var X = rc.x / SCALE, Y = -(lv.yTop + rc.y) / SCALE, Wm = rc.w / SCALE, Hm = rc.h / SCALE;
        var pts = [[X, Y], [X + Wm, Y], [X + Wm, Y - Hm], [X, Y - Hm], [X, Y]];
        p('0', 'POLYLINE'); p('8', layer); p('66', '1'); p('70', '1');
        pts.forEach(function (pt) { p('0', 'VERTEX'); p('8', layer); p('10', pt[0].toFixed(3)); p('20', pt[1].toFixed(3)); });
        p('0', 'SEQEND');
        p('0', 'TEXT'); p('8', layer); p('10', (X + 0.2).toFixed(3)); p('20', (Y - 0.6).toFixed(3)); p('40', '0.35'); p('1', (rc.room.nume || '').replace(/[^\x20-\x7e]/g, '') + ' ' + Math.round(rc.room.mp_unit || 0) + 'mp');
      });
    });
    e.push('0'); e.push('ENDSEC'); e.push('0'); e.push('EOF');
    return e.join('\n');
  }

  function _dl(name, content, mime) { try { var b = new Blob([content], { type: mime }); var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); } catch (e) {} }

  function open(spatii, meta) {
    spatii = spatii || []; if (!spatii.length) { if (G.ss) G.ss('Nu există program de spații. Generează-l întâi în „🧩 Program funcțional".'); return; }
    var lay = layout(spatii); var title = (meta && meta.title) || 'PLAN FUNCȚIONAL — schematic din model';
    var svg = toSVG(lay, title);
    var ov = el('div', { id: 'uxplan-ov', style: 'position:fixed;inset:0;background:#070c18;z-index:4300;overflow:auto;font-family:system-ui;color:#e6edf7' });
    var wrap = el('div', { style: 'max-width:1050px;margin:0 auto;padding:16px' });
    var head = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:10px' });
    head.appendChild(el('div', null, '<div style="font-size:17px;font-weight:800;color:#6ee7b7">📐 Plan funcțional (din modelul de spații)</div><div style="font-size:11px;color:#94a3b8">Schematic/zonare — export SVG · PDF · DXF (AutoCAD/BricsCAD). Nu înlocuiește planșa DTAC cotată.</div>'));
    var bX = el('button', { style: 'background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer' }, '✕'); bX.onclick = function () { ov.remove(); }; head.appendChild(bX); wrap.appendChild(head);
    var bar = el('div', { style: 'display:flex;gap:8px;margin-bottom:10px' });
    function mkbtn(txt, fn) { var b = el('button', { style: 'background:rgba(52,211,153,.18);color:#6ee7b7;border:1px solid rgba(52,211,153,.4);border-radius:8px;padding:8px 13px;font-size:12.5px;font-weight:600;cursor:pointer' }, txt); b.onclick = fn; return b; }
    bar.appendChild(mkbtn('⬇ SVG', function () { _dl('Plan_functional.svg', svg, 'image/svg+xml'); }));
    bar.appendChild(mkbtn('⬇ DXF (CAD)', function () { _dl('Plan_functional.dxf', toDXF(lay), 'application/dxf'); }));
    bar.appendChild(mkbtn('🖨 PDF (print)', function () { var w = window.open('', '_blank'); if (w) { w.document.write('<html><head><title>Plan funcțional</title></head><body style="margin:0">' + svg + '</body></html>'); w.document.close(); setTimeout(function () { w.print(); }, 300); } }));
    wrap.appendChild(bar);
    var box = el('div', { style: 'background:#fff;border-radius:8px;padding:8px;overflow:auto' }); box.innerHTML = svg; wrap.appendChild(box);
    ov.appendChild(wrap); document.body.appendChild(ov);
  }

  G.UXPlanSVG = { layout: layout, toSVG: toSVG, toDXF: toDXF, open: open };
})(window);
