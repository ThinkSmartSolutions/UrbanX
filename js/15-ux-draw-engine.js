/* ============================================================================
 * UrbanX — MOTOR GENERARE PLANȘE TEHNICE (js/15-ux-draw-engine.js) — Sprint 1
 * Produce entități tehnice la standard SR EN ISO din modelul clădirii, emise ca
 * DXF ASCII AutoCAD 2010 (AC1024). Non-destructiv: NU modifică 15-relevee*.js —
 * expune window.UX_DRAW (writer DXF + LAYERS + hașuri + simboluri + cotare +
 * casetă ISO 7200), folosit de motoarele de planșe pe specialități (A/S/instalații).
 *
 * Convenție unități: coordonate în MM reali la scara 1:1 (modelul relevee e în
 * metri → ×1000). INSUNITS=4 (mm), MEASUREMENT=1.
 *
 * Standarde: SR EN ISO 128 (reprezentare/grosimi), 129-1 (cotare), 7200 (casetă),
 * NP 069/2014 (simboluri), SR EN ISO 128-50 (hașuri).
 * ========================================================================== */
(function (G) {
  'use strict';

  var UX = {
    STANDARDS: {
      REPRESENTATION: 'SR EN ISO 128', DIMENSIONING: 'SR EN ISO 129-1',
      TITLE_BLOCK: 'SR EN ISO 7200', SYMBOLS: 'NP 069/2014',
      LINE_WEIGHTS: 'SR EN ISO 128-24', HATCHING: 'SR EN ISO 128-50', SCALES: 'SR EN ISO 5455'
    },
    // Grosimi linii (mm) — SR EN ISO 128-24, bază 0.35, raport 1:2
    LINE_WEIGHTS: { EXTRA_THICK: 0.70, THICK: 0.50, MEDIUM: 0.35, THIN: 0.25, EXTRA_THIN: 0.18, HAIR: 0.09 },

    // Layere (convenție AIA adaptată RO). lw=mm, color=index ACI, lt=linetype
    LAYERS: {
      'A-WALL-EXTR-N': { lw: 0.50, color: 7, lt: 'CONTINUOUS' },
      'A-WALL-INTR-N': { lw: 0.35, color: 7, lt: 'CONTINUOUS' },
      'A-WALL-PART-N': { lw: 0.25, color: 8, lt: 'CONTINUOUS' },
      'A-WALL-EXTR-E': { lw: 0.35, color: 8, lt: 'CONTINUOUS' },
      'A-WALL-EXTR-D': { lw: 0.25, color: 1, lt: 'DASHED' },
      'A-DOOR-N': { lw: 0.25, color: 4, lt: 'CONTINUOUS' },
      'A-GLAZ-N': { lw: 0.25, color: 4, lt: 'CONTINUOUS' },
      'A-STRS-N': { lw: 0.25, color: 7, lt: 'CONTINUOUS' },
      'A-FLOR-PATT': { lw: 0.13, color: 9, lt: 'CONTINUOUS' },
      'A-BALC-N': { lw: 0.25, color: 7, lt: 'CONTINUOUS' },
      'S-COLS-N': { lw: 0.50, color: 1, lt: 'CONTINUOUS' },
      'S-BEAM-N': { lw: 0.35, color: 5, lt: 'CONTINUOUS' },
      'S-SLAB-N': { lw: 0.18, color: 5, lt: 'CONTINUOUS' },
      'S-FNDT-N': { lw: 0.50, color: 1, lt: 'CONTINUOUS' },
      'A-DIMS-PLAN': { lw: 0.18, color: 3, lt: 'CONTINUOUS' },
      'A-DIMS-ELEV': { lw: 0.18, color: 3, lt: 'CONTINUOUS' },
      'A-GRID-AXES': { lw: 0.18, color: 2, lt: 'DASHDOT' },
      'A-GRID-SYMB': { lw: 0.25, color: 2, lt: 'CONTINUOUS' },
      'A-TEXT-ROOM': { lw: 0.18, color: 7, lt: 'CONTINUOUS' },
      'A-TEXT-AREA': { lw: 0.18, color: 3, lt: 'CONTINUOUS' },
      'A-TEXT-FINI': { lw: 0.18, color: 9, lt: 'CONTINUOUS' },
      'A-TEXT-NOTE': { lw: 0.18, color: 7, lt: 'CONTINUOUS' },
      'A-TEXT-NTPR': { lw: 0.18, color: 1, lt: 'CONTINUOUS' },
      'A-HATCH-BCAR': { lw: 0.13, color: 9, lt: 'CONTINUOUS' },
      'A-HATCH-ZCAR': { lw: 0.13, color: 9, lt: 'CONTINUOUS' },
      'A-HATCH-ZBCA': { lw: 0.13, color: 9, lt: 'CONTINUOUS' },
      'A-HATCH-IZOL': { lw: 0.09, color: 253, lt: 'CONTINUOUS' },
      'A-HATCH-PMNT': { lw: 0.13, color: 34, lt: 'CONTINUOUS' },
      'A-HATCH-LEMN': { lw: 0.13, color: 43, lt: 'CONTINUOUS' },
      'C-PARCEL-BDRY': { lw: 0.50, color: 1, lt: 'CONTINUOUS' },
      'C-BLDG-PRPD': { lw: 0.50, color: 2, lt: 'CONTINUOUS' },
      'C-BLDG-EXST': { lw: 0.35, color: 8, lt: 'CONTINUOUS' },
      'C-ROAD-EDGE': { lw: 0.35, color: 7, lt: 'CONTINUOUS' },
      'C-ROAD-AXIS': { lw: 0.18, color: 7, lt: 'DASHDOT' },
      'U-WATR-PRPD': { lw: 0.35, color: 5, lt: 'CONTINUOUS' },
      'U-SEWR-PRPD': { lw: 0.35, color: 3, lt: 'CONTINUOUS' },
      'U-GASS-PRPD': { lw: 0.35, color: 30, lt: 'DASHED' },
      'U-ELEC-PRPD': { lw: 0.35, color: 1, lt: 'DASHED2' },
      'T-TITL-BORD': { lw: 0.70, color: 7, lt: 'CONTINUOUS' },
      'T-TITL-LINE': { lw: 0.50, color: 7, lt: 'CONTINUOUS' },
      'T-TITL-TEXT': { lw: 0.18, color: 7, lt: 'CONTINUOUS' }
    },

    // Definiții tipuri de linie (LTYPE) — pattern în unități de desen (mm)
    LTYPES: {
      CONTINUOUS: { desc: 'Continua', pat: [] },
      DASHED: { desc: '__ __ __', pat: [12, -6] },
      DASHED2: { desc: '_ _ _', pat: [6, -3] },
      DASHDOT: { desc: '__ . __ .', pat: [12, -4, 0, -4] },
      HIDDEN: { desc: 'Ascunsa', pat: [6, -3] },
      DOTTED: { desc: '. . .', pat: [0, -3] }
    },

    // Materiale → pattern hașură (SR EN ISO 128-50 / convenție ANSI)
    MATERIALS: {
      BETON_ARMAT: { layer: 'A-HATCH-BCAR', pat: 'ANSI31', angle: 45, scale: 25 },
      BETON_SIMPLU: { layer: 'A-HATCH-BCAR', pat: 'ANSI31', angle: 45, scale: 50 },
      ZIDARIE_CARAMIDA: { layer: 'A-HATCH-ZCAR', pat: 'BRICK', angle: 0, scale: 30 },
      ZIDARIE_BCA: { layer: 'A-HATCH-ZBCA', pat: 'ANSI31', angle: 135, scale: 40 },
      TERMOIZOLATIE: { layer: 'A-HATCH-IZOL', pat: 'DOTS', angle: 0, scale: 30 },
      LEMN: { layer: 'A-HATCH-LEMN', pat: 'ANSI32', angle: 45, scale: 30 },
      PAMANT: { layer: 'A-HATCH-PMNT', pat: 'EARTH', angle: 0, scale: 40 }
    }
  };

  // ─── HELPER: număr → string DXF (fără notație exponențială) ──────────────
  function n(v) { v = +v || 0; if (Math.abs(v) < 1e-9) v = 0; return v.toFixed(4).replace(/\.?0+$/, function (m) { return m.indexOf('.') === 0 ? '' : ''; }); }
  function num(v) { v = +v || 0; if (Math.abs(v) < 1e-9) v = 0; var s = v.toFixed(4); return s; }

  // ─── FABRICĂ DOCUMENT DXF ─────────────────────────────────────────────────
  // doc.line/pline/circle/arc/text/mtext/solid/dim → adaugă entități; doc.emit() → string DXF
  UX.newDoc = function () {
    var ents = [];       // linii de text ENTITIES
    var used = {};       // layere folosite
    var prims = [];      // primitive structurate (pt. preview SVG in browser)
    var hseed = 0x100;   // handle seed (hex)
    function h() { return (hseed++).toString(16).toUpperCase(); }
    function use(layer) { if (UX.LAYERS[layer]) used[layer] = 1; else used[layer] = 1; return layer; }
    function pair(code, val) { ents.push(code + '\n' + val); }

    var api = {
      _ents: ents, _used: used, _prims: prims,
      line: function (x1, y1, x2, y2, layer) {
        use(layer); pair(0, 'LINE'); pair(5, h()); pair(100, 'AcDbEntity'); pair(8, layer); pair(100, 'AcDbLine');
        pair(10, num(x1)); pair(20, num(y1)); pair(30, '0'); pair(11, num(x2)); pair(21, num(y2)); pair(31, '0');
        prims.push({ t: 'line', x1: +x1, y1: +y1, x2: +x2, y2: +y2, l: layer });
        return api;
      },
      pline: function (pts, closed, layer) {
        use(layer); pair(0, 'LWPOLYLINE'); pair(5, h()); pair(100, 'AcDbEntity'); pair(8, layer); pair(100, 'AcDbPolyline');
        pair(90, pts.length); pair(70, closed ? 1 : 0);
        pts.forEach(function (p) { pair(10, num(p[0])); pair(20, num(p[1])); });
        prims.push({ t: 'poly', pts: pts.map(function (p) { return [+p[0], +p[1]]; }), closed: !!closed, l: layer });
        return api;
      },
      rect: function (x, y, w, hgt, layer) {
        return api.pline([[x, y], [x + w, y], [x + w, y + hgt], [x, y + hgt]], true, layer);
      },
      circle: function (cx, cy, r, layer) {
        use(layer); pair(0, 'CIRCLE'); pair(5, h()); pair(100, 'AcDbEntity'); pair(8, layer); pair(100, 'AcDbCircle');
        pair(10, num(cx)); pair(20, num(cy)); pair(30, '0'); pair(40, num(r));
        prims.push({ t: 'circle', cx: +cx, cy: +cy, r: +r, l: layer }); return api;
      },
      arc: function (cx, cy, r, a0, a1, layer) {
        use(layer); pair(0, 'ARC'); pair(5, h()); pair(100, 'AcDbEntity'); pair(8, layer); pair(100, 'AcDbCircle');
        pair(10, num(cx)); pair(20, num(cy)); pair(30, '0'); pair(40, num(r)); pair(100, 'AcDbArc');
        pair(50, num(a0)); pair(51, num(a1));
        prims.push({ t: 'arc', cx: +cx, cy: +cy, r: +r, a0: +a0, a1: +a1, l: layer }); return api;
      },
      text: function (x, y, hgt, str, layer, opts) {
        opts = opts || {}; use(layer);
        pair(0, 'TEXT'); pair(5, h()); pair(100, 'AcDbEntity'); pair(8, layer); pair(100, 'AcDbText');
        pair(10, num(x)); pair(20, num(y)); pair(30, '0'); pair(40, num(hgt));
        pair(1, String(str == null ? '' : str)); pair(50, num(opts.rot || 0)); pair(7, opts.style || 'ROMANS');
        // alignment: 72 horiz (1=center), 73 vert (2=middle)
        if (opts.align === 'center') { pair(72, 1); pair(11, num(x)); pair(21, num(y)); pair(31, '0'); pair(73, opts.mid ? 2 : 0); }
        else if (opts.mid) { pair(72, 0); pair(11, num(x)); pair(21, num(y)); pair(31, '0'); pair(73, 2); }
        pair(100, 'AcDbText');
        prims.push({ t: 'text', x: +x, y: +y, h: +hgt, s: String(str == null ? '' : str), rot: +(opts.rot || 0), align: opts.align || (opts.mid ? 'left' : 'left'), l: layer });
        return api;
      },
      // hașură reprezentată SOLID (fundal) sau ca pattern-linii simplificat pt. compatibilitate
      hatchLines: function (poly, mat, layer) {
        // desenează linii de hașură la 45° în interiorul dreptunghiului bound-box (simplificat, robust)
        var xs = poly.map(function (p) { return p[0]; }), ys = poly.map(function (p) { return p[1]; });
        var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
        var y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
        var step = (mat && mat.scale) || 25, ang = (mat && mat.angle) || 45;
        // linii la 45° (ANSI31): y = x + c; parcurgem c de la -(x1-x0) la (y1-y0)
        var i, tan = Math.tan(ang * Math.PI / 180);
        for (i = x0 - (y1 - y0); i <= x1; i += step) {
          // segment în interiorul dreptunghiului
          var xa = i, ya = y0, xb = i + (y1 - y0) / (tan || 1), yb = y1;
          xa = Math.max(x0, Math.min(x1, xa)); xb = Math.max(x0, Math.min(x1, xb));
          api.line(xa, ya, xb, yb, layer);
        }
        return api;
      },
      // Cotă liniară grafică (linie cotă + martori + săgeți + text) — robust în orice CAD
      dim: function (x1, y1, x2, y2, off, layer, txtLayer) {
        var dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy); if (len < 1e-6) return api;
        var nx = -dy / len, ny = dx / len; // normala
        var ox = nx * off, oy = ny * off;
        var p1 = [x1 + ox, y1 + oy], p2 = [x2 + ox, y2 + oy];
        api.line(x1, y1, p1[0], p1[1], layer); // martor 1
        api.line(x2, y2, p2[0], p2[1], layer); // martor 2
        api.line(p1[0], p1[1], p2[0], p2[1], layer); // linia de cotă
        // săgeți (linii oblice tip arhitectural)
        var a = 25 / len; // ~2.5mm proiectat
        api.line(p1[0], p1[1], p1[0] + (dx * a) - (nx * 8), p1[1] + (dy * a) - (ny * 8), layer);
        api.line(p2[0], p2[1], p2[0] - (dx * a) - (nx * 8), p2[1] - (dy * a) - (ny * 8), layer);
        // text (valoarea în cm, fără zecimale)
        var cm = Math.round(len / 10);
        var mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2;
        var rot = Math.atan2(dy, dx) * 180 / Math.PI; if (rot > 90 || rot < -90) rot += 180;
        api.text(mx + nx * 15, my + ny * 15, 25, '' + cm, txtLayer || 'A-DIMS-PLAN', { align: 'center', rot: rot });
        return api;
      },
      emit: function () { return UX._emitDxf(ents, used); },
      emitSVG: function (o) { return UX._emitSvg(prims, o); }
    };
    return api;
  };

  // ─── EMITERE SVG (preview in browser — aceleasi primitive ca DXF) ─────────
  UX._emitSvg = function (prims, o) {
    o = o || {}; prims = prims || [];
    var minX = 1e15, minY = 1e15, maxX = -1e15, maxY = -1e15;
    function ext(x, y) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    prims.forEach(function (p) {
      if (p.t === 'line') { ext(p.x1, p.y1); ext(p.x2, p.y2); }
      else if (p.t === 'poly') { p.pts.forEach(function (q) { ext(q[0], q[1]); }); }
      else if (p.t === 'circle' || p.t === 'arc') { ext(p.cx - p.r, p.cy - p.r); ext(p.cx + p.r, p.cy + p.r); }
      else if (p.t === 'text') { ext(p.x, p.y); }
    });
    if (minX > maxX) { minX = 0; minY = 0; maxX = 100; maxY = 100; }
    var pad = (maxX - minX) * 0.03 + 50; minX -= pad; maxX += pad; minY -= pad; maxY += pad;
    var W = maxX - minX, H = maxY - minY;
    // Y flip: DXF are Y in sus → SVG Y in jos. Folosim viewBox cu transform.
    function col(layer) { var L = UX.LAYERS[layer]; if (!L) return '#1a1a1a'; var c = L.color;
      if (c === 1) return '#c0392b'; if (c === 2) return '#b7950b'; if (c === 3) return '#1e8449'; if (c === 4) return '#138d90';
      if (c === 5) return '#8e44ad'; if (c === 6) return '#2e5cb8'; if (c === 8 || c === 9) return '#7f8c8d'; if (c >= 250) return '#95a5a6'; return '#1a1a1a'; }
    function lw(layer) { var L = UX.LAYERS[layer]; var w = (L && L.lw) || 0.25; return Math.max(0.4, w / 0.35 * (W / 1400)); }
    var s = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + minX.toFixed(1) + ' ' + minY.toFixed(1) + ' ' + W.toFixed(1) + ' ' + H.toFixed(1) + '" style="width:100%;height:auto;background:#fff" preserveAspectRatio="xMidYMid meet">'];
    // grup cu flip pe Y in jurul centrului viewBox
    s.push('<g transform="matrix(1 0 0 -1 0 ' + (2 * minY + H).toFixed(1) + ')">');
    function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    prims.forEach(function (p) {
      var c = col(p.l), w = lw(p.l).toFixed(2);
      if (p.t === 'line') s.push('<line x1="' + p.x1.toFixed(1) + '" y1="' + p.y1.toFixed(1) + '" x2="' + p.x2.toFixed(1) + '" y2="' + p.y2.toFixed(1) + '" stroke="' + c + '" stroke-width="' + w + '"/>');
      else if (p.t === 'poly') { var d = p.pts.map(function (q, i) { return (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join(' ') + (p.closed ? ' Z' : ''); s.push('<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + w + '"/>'); }
      else if (p.t === 'circle') s.push('<circle cx="' + p.cx.toFixed(1) + '" cy="' + p.cy.toFixed(1) + '" r="' + p.r.toFixed(1) + '" fill="none" stroke="' + c + '" stroke-width="' + w + '"/>');
      else if (p.t === 'arc') { var a0 = p.a0 * Math.PI / 180, a1 = p.a1 * Math.PI / 180; if (a1 < a0) a1 += 2 * Math.PI; var x0 = p.cx + p.r * Math.cos(a0), y0 = p.cy + p.r * Math.sin(a0), x1 = p.cx + p.r * Math.cos(a1), y1 = p.cy + p.r * Math.sin(a1); var large = (a1 - a0) > Math.PI ? 1 : 0; s.push('<path d="M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + p.r.toFixed(1) + ' ' + p.r.toFixed(1) + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + '" fill="none" stroke="' + c + '" stroke-width="' + w + '"/>'); }
      else if (p.t === 'text') {
        var anchor = p.align === 'center' ? 'middle' : 'start';
        // textul e in grup flip-Y → contra-flip local ca sa nu fie oglindit
        s.push('<g transform="translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') scale(1 -1)' + (p.rot ? ' rotate(' + (-p.rot).toFixed(1) + ')' : '') + '"><text x="0" y="0" font-family="Arial,sans-serif" font-size="' + Math.max(60, p.h).toFixed(0) + '" fill="#0b6" text-anchor="' + anchor + '" dominant-baseline="middle">' + esc(p.s) + '</text></g>');
      }
    });
    s.push('</g></svg>');
    return s.join('');
  };

  // ─── EMITERE DXF COMPLET (HEADER / TABLES / ENTITIES / EOF) ───────────────
  UX._emitDxf = function (ents, used) {
    var o = [];
    function p(c, v) { o.push(c); o.push(v); }
    // HEADER
    p(0, 'SECTION'); p(2, 'HEADER');
    p(9, '$ACADVER'); p(1, 'AC1024');
    p(9, '$INSUNITS'); p(70, 4);
    p(9, '$MEASUREMENT'); p(70, 1);
    p(9, '$LTSCALE'); p(40, 1.0);
    p(0, 'ENDSEC');
    // TABLES
    p(0, 'SECTION'); p(2, 'TABLES');
    // LTYPE
    p(0, 'TABLE'); p(2, 'LTYPE'); p(70, Object.keys(UX.LTYPES).length + 1);
    p(0, 'LTYPE'); p(2, 'BYLAYER'); p(70, 0); p(3, ''); p(72, 65); p(73, 0); p(40, 0);
    Object.keys(UX.LTYPES).forEach(function (name) {
      var lt = UX.LTYPES[name]; var pat = lt.pat || [];
      var total = 0; pat.forEach(function (s) { total += Math.abs(s); });
      p(0, 'LTYPE'); p(2, name); p(70, 0); p(3, lt.desc || name); p(72, 65);
      p(73, pat.length); p(40, total);
      pat.forEach(function (s) { p(49, s); p(74, 0); });
    });
    p(0, 'ENDTAB');
    // LAYER
    var layers = Object.keys(used);
    p(0, 'TABLE'); p(2, 'LAYER'); p(70, layers.length + 1);
    p(0, 'LAYER'); p(2, '0'); p(70, 0); p(62, 7); p(6, 'CONTINUOUS'); p(370, 25);
    layers.forEach(function (name) {
      var L = UX.LAYERS[name] || { color: 7, lt: 'CONTINUOUS', lw: 0.25 };
      p(0, 'LAYER'); p(2, name); p(70, 0); p(62, L.color); p(6, L.lt || 'CONTINUOUS');
      p(370, Math.round((L.lw || 0.25) * 100)); // lineweight în 1/100 mm
    });
    p(0, 'ENDTAB');
    // STYLE
    p(0, 'TABLE'); p(2, 'STYLE'); p(70, 2);
    p(0, 'STYLE'); p(2, 'STANDARD'); p(70, 0); p(40, 0); p(41, 1.0); p(50, 0); p(71, 0); p(42, 2.5); p(3, 'txt'); p(4, '');
    p(0, 'STYLE'); p(2, 'ROMANS'); p(70, 0); p(40, 0); p(41, 0.8); p(50, 0); p(71, 0); p(42, 2.5); p(3, 'romans.shx'); p(4, '');
    p(0, 'ENDTAB');
    // DIMSTYLE (UX-STANDARD) — pentru DIMENSION reale viitoare
    p(0, 'TABLE'); p(2, 'DIMSTYLE'); p(70, 1);
    p(0, 'DIMSTYLE'); p(105, 'D1'); p(2, 'UX-STANDARD'); p(70, 0);
    p(140, 2.5); p(141, 2.5); p(147, 0.5); p(41, 2.0); p(42, 0.5); p(44, 1.5); p(271, 0); p(279, 0);
    p(0, 'ENDTAB');
    p(0, 'ENDSEC');
    // ENTITIES
    p(0, 'SECTION'); p(2, 'ENTITIES');
    // ents e listă de "code\nval" — le adăugăm direct
    ents.forEach(function (e) { o.push(e); });
    p(0, 'ENDSEC');
    p(0, 'EOF');
    // asamblare: perechile din p() sunt (code, val) alternante; ents sunt deja stringuri "code\nval"
    var out = [];
    for (var i = 0; i < o.length; i++) {
      if (typeof o[i] === 'string' && o[i].indexOf('\n') >= 0) { out.push(o[i]); }
      else { out.push(o[i] + '\n' + o[i + 1]); i++; }
    }
    return out.join('\n') + '\n';
  };

  // ─── GENERATOR: HAȘURĂ MATERIAL (pattern real pe tip, clipat în bandă) ─────
  // Emite linii de hașură conform pattern-ului materialului (100% DXF valid,
  // echivalent vizual cu hașura de secțiune a proiectantului). Bbox dreptunghiular.
  UX.materialHatch = function (doc, poly, materialKey) {
    var mat = UX.MATERIALS[materialKey] || UX.MATERIALS.BETON_ARMAT;
    var xs = poly.map(function (p) { return p[0]; }), ys = poly.map(function (p) { return p[1]; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
    var y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var L = mat.layer, s = mat.scale || 25, i;
    var pat = mat.pat || 'ANSI31';
    if (pat === 'ANSI31' || pat === 'ANSI32') { // beton/lemn: linii la 45°
      for (i = x0 - (y1 - y0); i <= x1; i += s) {
        var xa = Math.max(x0, i), ya = y0 + Math.max(0, x0 - i);
        var xb = Math.min(x1, i + (y1 - y0)), yb = y0 + Math.min(y1 - y0, x1 - i);
        if (xb > xa) doc.line(xa, y0 + (xa - i), xb, y0 + (xb - i), L);
      }
      if (pat === 'ANSI32') for (i = x0 - (y1 - y0) + s / 2; i <= x1; i += s) { // dublă (lemn)
        var xa2 = Math.max(x0, i), xb2 = Math.min(x1, i + (y1 - y0));
        if (xb2 > xa2) doc.line(xa2, y0 + (xa2 - i), xb2, y0 + (xb2 - i), L);
      }
    } else if (pat === 'BRICK') { // zidărie cărămidă: orizontale + verticale decalate
      var row = 0; for (i = y0; i <= y1; i += s) { doc.line(x0, i, x1, i, L); row++; }
      row = 0; for (var yy = y0; yy < y1; yy += s) { var offx = (row % 2) ? s : 0; for (var xx = x0 + offx; xx <= x1; xx += 2 * s) doc.line(xx, yy, xx, Math.min(y1, yy + s), L); row++; }
    } else if (pat === 'DOTS') { // termoizolație: puncte (cerculețe mici)
      for (var yd = y0 + s / 2; yd < y1; yd += s) for (var xd = x0 + s / 2; xd < x1; xd += s) doc.circle(xd, yd, s * 0.08, L);
    } else if (pat === 'EARTH') { // pământ: linii orizontale + hașuri scurte oblice sub
      for (i = y0; i <= y1; i += s * 1.5) { doc.line(x0, i, x1, i, L); for (var xe = x0; xe < x1; xe += s) doc.line(xe, i, xe + s * 0.4, i - s * 0.4, L); }
    } else { doc.hatchLines(poly, mat, L); }
    return doc;
  };

  // ─── GENERATOR: SĂGEATĂ NORD ──────────────────────────────────────────────
  UX.northArrow = function (doc, cx, cy, size, bearingDeg) {
    size = size || 200; var b = (bearingDeg || 0) * Math.PI / 180;
    var tip = [cx + size * Math.sin(b), cy + size * Math.cos(b)];
    var bl = [cx + size * 0.3 * Math.sin(b + 2.5), cy + size * 0.3 * Math.cos(b + 2.5)];
    var br = [cx + size * 0.3 * Math.sin(b - 2.5), cy + size * 0.3 * Math.cos(b - 2.5)];
    doc.pline([tip, bl, [cx, cy], br], true, 'A-TEXT-NOTE');
    doc.text(tip[0], tip[1] + size * 0.15, size * 0.25, 'N', 'A-TEXT-NOTE', { align: 'center' });
    return doc;
  };

  // ─── GENERATOR: SCARĂ GRAFICĂ (bară gradată) ──────────────────────────────
  UX.scaleBar = function (doc, x, y, scale, mMax) {
    scale = scale || 100; mMax = mMax || 10; // metri
    var mm = mMax * 1000 / scale * 10; // lungime desenată în mm-desen (la scara 1:scale, 1 m real = 1000/scale mm plan)... reprezentăm 0..mMax m
    var seg = mm / mMax, i;
    doc.line(x, y, x + mm, y, 'A-TEXT-NOTE');
    for (i = 0; i <= mMax; i++) { doc.line(x + i * seg, y, x + i * seg, y + (i % 5 === 0 ? 40 : 20), 'A-TEXT-NOTE'); if (i % 5 === 0) doc.text(x + i * seg, y - 60, 25, '' + i, 'A-TEXT-NOTE', { align: 'center' }); }
    doc.text(x + mm / 2, y - 130, 25, 'Sc. 1:' + scale + ' (m)', 'A-TEXT-NOTE', { align: 'center' });
    return doc;
  };

  // ─── GENERATOR: COTĂ DE NIVEL (triunghi ▼ plin / △ gol + valoare ±X.XX) ────
  UX.levelMark = function (doc, x, y, value, below) {
    var s = 60; // mărime triunghi (mm)
    doc.pline([[x, y], [x - s / 2, y + s], [x + s / 2, y + s]], true, 'A-DIMS-ELEV');
    var v = (value >= 0 ? '+' : '') + (Math.round(value * 100) / 100).toFixed(2);
    doc.text(x + s, y + s, 30, v, 'A-DIMS-ELEV', { mid: true });
    return doc;
  };

  // ─── GENERATOR: DETALIU STRATIFICAȚIE (sandwich, insert 1:20) ──────────────
  // straturi = [{grosime(mm), nume, material}] de jos în sus
  UX.strataDetail = function (doc, x, y, w, straturi) {
    var cy = y;
    (straturi || []).forEach(function (st) {
      doc.rect(x, cy, w, st.grosime, 'A-WALL-INTR-N');
      if (st.material) { try { UX.materialHatch(doc, [[x, cy], [x + w, cy], [x + w, cy + st.grosime], [x, cy + st.grosime]], st.material); } catch (e) {} }
      doc.text(x + w + 60, cy + st.grosime / 2, 25, st.nume + ' ' + st.grosime + 'mm', 'A-TEXT-FINI', { mid: true });
      cy += st.grosime;
    });
    return doc;
  };

  // ─── GENERATOR: SIMBOL UȘĂ (NP 069/2014) ──────────────────────────────────
  // door: {x,y (mm), width (mm), thickness, angle (grade), swing:'LEFT'|'RIGHT'}
  UX.doorSymbol = function (doc, door) {
    var x = door.x, y = door.y, w = door.width || 900, th = door.thickness || 100;
    var sw = door.swing === 'RIGHT' ? -1 : 1;
    // foaia ușii (linie de la balamale, deschisă 90°)
    doc.line(x, y, x, y + sw * w, 'A-DOOR-N');
    // arc sfert de cerc (raza = lățime foaie)
    if (sw > 0) doc.arc(x, y, w, 0, 90, 'A-DOOR-N'); else doc.arc(x, y, w, 270, 360, 'A-DOOR-N');
    // golul în perete (2 linii toc)
    doc.line(x, y, x + w, y, 'A-DOOR-N');
    return doc;
  };

  // ─── GENERATOR: SIMBOL FEREASTRĂ (plan — 3 linii paralele) ────────────────
  UX.windowSymbol = function (doc, win) {
    var x = win.x, y = win.y, w = win.width || 1200, th = win.thickness || 200;
    // 3 linii paralele pe lățimea golului (toc ext / cercevea / toc int)
    doc.line(x, y, x + w, y, 'A-GLAZ-N');
    doc.line(x, y + th / 2, x + w, y + th / 2, 'A-GLAZ-N');
    doc.line(x, y + th, x + w, y + th, 'A-GLAZ-N');
    return doc;
  };

  // ─── GENERATOR: SIMBOL SCARĂ (plan — trepte + săgeată SUS) ────────────────
  // stair: {x,y,w,d (mm), nSteps, dir}
  UX.staircaseSymbol = function (doc, stair) {
    var x = stair.x, y = stair.y, w = stair.w || 1200, d = stair.d || 3000, n = stair.nSteps || 12;
    var tread = d / n;
    for (var i = 1; i < n; i++) doc.line(x, y + i * tread, x + w, y + i * tread, 'A-STRS-N');
    doc.rect(x, y, w, d, 'A-STRS-N');
    // săgeată SUS (linie mediană + vârf)
    doc.line(x + w / 2, y + tread, x + w / 2, y + d - tread, 'A-STRS-N');
    doc.text(x + w / 2, y + d + 60, 25, 'SUS', 'A-TEXT-NOTE', { align: 'center' });
    return doc;
  };

  // ─── GENERATOR: GRID STRUCTURAL (axe A-G / 1-n) ───────────────────────────
  UX.structuralGrid = function (doc, x0, y0, W, H, modX, modY) {
    modX = modX || 6000; modY = modY || 6000;
    var ext = 800, r = 400; // extensie axă + rază cerc bulă
    var nx = Math.max(1, Math.round(W / modX)), ny = Math.max(1, Math.round(H / modY));
    var letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // fără I și O
    var i;
    for (i = 0; i <= nx; i++) { // axe verticale numerotate
      var xx = x0 + i * (W / nx);
      doc.line(xx, y0 - ext, xx, y0 + H + ext, 'A-GRID-AXES');
      doc.circle(xx, y0 - ext - r, r, 'A-GRID-SYMB');
      doc.text(xx, y0 - ext - r, 25, '' + (i + 1), 'A-GRID-SYMB', { align: 'center', mid: true });
    }
    for (i = 0; i <= ny; i++) { // axe orizontale literate
      var yy = y0 + i * (H / ny);
      doc.line(x0 - ext, yy, x0 + W + ext, yy, 'A-GRID-AXES');
      doc.circle(x0 - ext - r, yy, r, 'A-GRID-SYMB');
      doc.text(x0 - ext - r, yy, 25, letters[i] || ('' + i), 'A-GRID-SYMB', { align: 'center', mid: true });
    }
    return doc;
  };

  // ─── GENERATOR: COTARE 3 RÂNDURI pe o latură ──────────────────────────────
  // seg = [ {len(mm), lbl?}... ] golurile+plinurile; totalLen suma
  UX.dimensionChain = function (doc, x0, y0, dir, segments) {
    // dir: 'H' (orizontal, cotare sub) | 'V' (vertical, cotare stânga)
    var off1 = 80, off3 = 240; // mm față de clădire
    var cur = 0, i;
    for (i = 0; i < segments.length; i++) {
      var L = segments[i].len;
      if (dir === 'H') doc.dim(x0 + cur, y0, x0 + cur + L, y0, -off1, 'A-DIMS-PLAN');
      else doc.dim(x0, y0 + cur, x0, y0 + cur + L, -off1, 'A-DIMS-PLAN');
      cur += L;
    }
    // rândul 3 — cota totală
    if (dir === 'H') doc.dim(x0, y0, x0 + cur, y0, -off3, 'A-DIMS-PLAN');
    else doc.dim(x0, y0, x0, y0 + cur, -off3, 'A-DIMS-PLAN');
    return doc;
  };

  // ─── GENERATOR: ETICHETĂ ÎNCĂPERE (denumire + finisaj + suprafață) ─────────
  UX.roomAnnotation = function (doc, room) {
    // room: {cx,cy (mm centru), name, finish, area (mp)}
    var cx = room.cx, cy = room.cy;
    doc.text(cx, cy + 60, 35, (room.name || '').toUpperCase(), 'A-TEXT-ROOM', { align: 'center' });
    if (room.finish) doc.text(cx, cy, 25, room.finish, 'A-TEXT-FINI', { align: 'center' });
    if (room.area != null) doc.text(cx, cy - 60, 25, 'S = ' + (Math.round(room.area * 100) / 100).toFixed(2) + ' mp', 'A-TEXT-AREA', { align: 'center' });
    return doc;
  };

  // ─── GENERATOR: CASETĂ DESEN ISO 7200 ─────────────────────────────────────
  // cfg: {x,y (colț dreapta-jos casetă, mm), w=180mm, h=55mm, beneficiar, proiect, faza, scara, plansa, data, arhitect}
  UX.titleBlock = function (doc, cfg) {
    cfg = cfg || {}; var W = (cfg.w || 180) * 1, H = (cfg.h || 55) * 1; // dat în mm direct
    var x = cfg.x || 0, y = cfg.y || 0; // colț stânga-jos
    // bordura casetei
    doc.rect(x, y, W, H, 'T-TITL-LINE');
    // linii interne (3 rânduri)
    doc.line(x, y + H * 0.66, x + W, y + H * 0.66, 'T-TITL-LINE');
    doc.line(x, y + H * 0.33, x + W, y + H * 0.33, 'T-TITL-LINE');
    doc.line(x + W * 0.55, y, x + W * 0.55, y + H, 'T-TITL-LINE');
    // texte
    var tx = x + 3;
    doc.text(tx, y + H - 8, 3.5, (cfg.beneficiar || 'Beneficiar: ____'), 'T-TITL-TEXT');
    doc.text(tx, y + H * 0.66 - 8, 3.5, (cfg.proiect || 'Proiect: ____'), 'T-TITL-TEXT');
    doc.text(tx, y + H * 0.33 - 8, 3.5, 'Faza: ' + (cfg.faza || 'DTAC') + '   Data: ' + (cfg.data || '____'), 'T-TITL-TEXT');
    // zona dreapta: planșă + scară + semnătură
    var rx = x + W * 0.55 + 3;
    doc.text(rx, y + H - 8, 5, (cfg.plansa || 'A-01'), 'T-TITL-TEXT');
    doc.text(rx, y + H * 0.66 - 8, 3.5, 'Sc. 1:' + (cfg.scara || 100), 'T-TITL-TEXT');
    doc.text(rx, y + H * 0.33 - 10, 2.5, 'Arh. ____ (semnătură + parafă OAR)', 'T-TITL-TEXT');
    // notă proiectant (asumare)
    doc.text(x + 3, y - 6, 2.0, 'Document generat parametric UrbanX — necesită verificarea și asumarea proiectantului autorizat.', 'A-TEXT-NTPR');
    return doc;
  };

  // ─── Notă tehnică pe planșă: tabel cu parametrii tehnici derivați ──────────
  // params = obiect autoCalc (v.calc). Desenează un tabel titrat (mm) lângă cartuș.
  UX.techNotes = function (doc, x, y, params) {
    params = params || {}; var da = function (b) { return b ? 'DA' : 'nu'; };
    var s = params.seismic || {}, c = params.clima || {};
    var rows = [
      ['Categ. importanță (HG 766/1997)', (params.categorie_importanta || '-')],
      ['Clasă imp. seismică (P100-1)', (params.clasa_importanta || '-') + '  gI=' + (params.gamma_I != null ? params.gamma_I.toFixed(2) : '1.00')],
      ['Factor comportare q', (params.factor_q != null ? params.factor_q.toFixed(1) : '3.0')],
      ['ag / Tc (P100-1/2013)', ((s.ag != null ? s.ag : '-') + 'g / ' + (s.Tc != null ? s.Tc : '-') + 's')],
      ['Zapada sk / Te (CR 1-1-3)', ((c.sk != null ? c.sk : '-') + ' kN/mp / ' + (c.Te != null ? c.Te : '-') + ' C')],
      ['Adancime inghet (STAS 6054)', ((params.adancime_inghet_m || 0.9).toFixed(2) + ' m')],
      ['Risc / categ. pericol incendiu', ((params.risc_incendiu || 'mediu').replace('foarte_mare', 'f.mare') + ' / Cat. ' + (params.psi_default || 'C'))],
      ['Grad rezistenta la foc (P118)', ('Gradul ' + (params.grad_default || 'II'))],
      ['Arie max / nr. compartimente', ((params.arie_compartiment_max || 0).toLocaleString('ro-RO') + ' mp / ' + (params.nr_compartimente || 1))],
      ['Evacuare 2 sensuri / fund sac', ((params.dist_evacuare_2sensuri || 35) + 'm / ' + (params.dist_evacuare_fundsac || 15) + 'm')],
      ['Desfumare / hidr. int / ext', (da(params.desfumare_oblig) + ' / ' + da(params.hidranti_int_oblig) + ' / ' + da(params.hidranti_ext_oblig))],
      ['Rezerva apa incendiu (est.)', ((params.rezerva_incendiu_mc || 0) + ' mc')],
      ['Sprinklere / IDSAI / lift pomp.', (da(params.sprinklere_oblig) + ' / ' + da(params.idsi_oblig) + ' / ' + da(params.lift_oblig))]
    ];
    var W = 120, rh = 6.5, H = rh * (rows.length + 1); // mm
    doc.rect(x, y, W, H, 'T-TITL-LINE');
    doc.line(x, y + H - rh, x + W, y + H - rh, 'T-TITL-LINE');
    doc.line(x + W * 0.52, y, x + W * 0.52, y + H - rh, 'T-TITL-LINE');
    doc.text(x + 2, y + H - rh + 2, 3.0, 'PARAMETRI TEHNICI DERIVATI (P100-1 · CR 1-1-3 · P118 · HG 766)', 'T-TITL-TEXT');
    rows.forEach(function (r, i) {
      var yy = y + H - rh - (i + 1) * rh + 2;
      doc.line(x, y + H - rh - (i + 1) * rh, x + W, y + H - rh - (i + 1) * rh, 'T-TITL-LINE');
      doc.text(x + 2, yy, 2.4, r[0], 'T-TITL-TEXT');
      doc.text(x + W * 0.52 + 2, yy, 2.4, r[1], 'T-TITL-TEXT');
    });
    return doc;
  };

  // ─── UTIL: mesele modelului relevee (metri) → plan DXF simplu (mm) ─────────
  // Demonstrativ Sprint 1: contur + camere + etichete + cotare + grid + casetă.
  UX.planFromRooms = function (rooms, opts) {
    opts = opts || {}; var doc = UX.newDoc(); var K = 1000; // m → mm
    var maxX = 0, maxY = 0;
    (rooms || []).forEach(function (r) { maxX = Math.max(maxX, (r.x + r.w)); maxY = Math.max(maxY, (r.y + r.h)); });
    var TPL = G.UX_TEMPLATES; var th = 375; // grosime perete exterior (mm, BCA 36.5+finisaj)
    // perete exterior ca bandă cu grosime (dublu contur) + hașură material
    doc.rect(0, 0, maxX * K, maxY * K, 'A-WALL-EXTR-N');
    doc.rect(-th, -th, maxX * K + 2 * th, maxY * K + 2 * th, 'A-WALL-EXTR-N');
    try { if (TPL) UX.materialHatch(doc, [[-th, -th], [maxX * K + th, -th], [maxX * K + th, 0], [-th, 0]], TPL.materialFor('wall_exterior')); } catch (e) {}
    (rooms || []).forEach(function (r) {
      doc.rect(r.x * K, r.y * K, r.w * K, r.h * K, r.bal ? 'A-BALC-N' : 'A-WALL-PART-N');
      var fin = ''; try { if (TPL) { var f = TPL.finishFor(r.t); fin = f.floor || ''; } } catch (e) {}
      UX.roomAnnotation(doc, { cx: (r.x + r.w / 2) * K, cy: (r.y + r.h / 2) * K, name: r.lbl || r.t, finish: fin, area: r.w * r.h });
    });
    UX.structuralGrid(doc, 0, 0, maxX * K, maxY * K, 3000, 3000);
    // cotare totală pe 2 laturi
    doc.dim(0, 0, maxX * K, 0, -240, 'A-DIMS-PLAN');
    doc.dim(0, 0, 0, maxY * K, -240, 'A-DIMS-PLAN');
    UX.levelMark(doc, maxX * K / 2, maxY * K / 2, opts.cota != null ? opts.cota : 0.0);
    UX.northArrow(doc, maxX * K + 600, maxY * K - 400, 300, opts.bearing || 0);
    UX.scaleBar(doc, 0, -900, 100, 10);
    UX.titleBlock(doc, { x: maxX * K + 1000, y: 0, proiect: opts.proiect || 'Plan nivel', faza: opts.faza || 'DTAC', plansa: opts.plansa || 'A-03', scara: 100, beneficiar: opts.beneficiar, data: opts.data });
    // notă cu toți parametrii tehnici derivați (deasupra cartușului)
    if (opts.params) { try { UX.techNotes(doc, maxX * K + 1000, 65, opts.params); } catch (e) {} }
    return doc.emit();
  };

  // ─── GENERATOR: FAȚADĂ / ELEVAȚIE (Sprint 3) ──────────────────────────────
  // opts: {width(m), niv, hParter(m), hEtaj(m), roof:'terasa'|'sarpanta', winPerFloor,
  //        cotaTeren(m), plansa, faza, proiect, beneficiar, data, params, orient}
  UX.facadeDoc = function (opts) {
    opts = opts || {}; var doc = UX.newDoc(); var K = 1000;
    var Wm = opts.width || 12, niv = Math.max(1, opts.niv || 1);
    var hP = opts.hParter || 3.0, hE = opts.hEtaj || 3.0;
    var levels = [0]; for (var i = 1; i <= niv; i++) levels.push(levels[i - 1] + (i === 1 ? hP : hE));
    var totalH = levels[niv]; var roof = opts.roof || (niv > 2 ? 'terasa' : 'sarpanta');
    var W = Wm * K, cotaT = (opts.cotaTeren != null ? opts.cotaTeren : 0);
    // linia terenului (hașură pământ sub 0)
    doc.line(-1500, cotaT * K, W + 1500, cotaT * K, 'C-ROAD-EDGE');
    for (var g = -1400; g < W + 1400; g += 300) doc.line(g, cotaT * K, g - 250, cotaT * K - 250, 'A-HATCH-PMNT');
    // conturul fațadei
    doc.rect(0, 0, W, totalH * K, 'A-WALL-EXTR-N');
    // linii de nivel (planșee vizibile pe fațadă) + cote de nivel
    levels.forEach(function (lv, idx) {
      if (idx > 0 && idx <= niv) doc.line(0, lv * K, W, lv * K, 'S-SLAB-N');
      UX.levelMark(doc, W + 700, lv * K, lv, false);
    });
    // ferestre pe fiecare etaj
    var nw = opts.winPerFloor || Math.max(2, Math.round(Wm / 3));
    for (var f = 0; f < niv; f++) {
      var y0 = levels[f] * K + 900, wh = ((f === 0 ? hP : hE) * K) - 1800; // parapet 0.9, allège
      var gap = W / (nw + 1), ww = Math.min(1400, gap * 0.6);
      for (var w = 1; w <= nw; w++) { var wx = gap * w - ww / 2; doc.rect(wx, y0, ww, Math.max(1200, wh), 'A-GLAZ-N'); doc.line(wx + ww / 2, y0, wx + ww / 2, y0 + Math.max(1200, wh), 'A-GLAZ-N'); }
    }
    // acoperiș
    if (roof === 'sarpanta') { var over = 500, ridge = totalH * K + Math.min(W, 6000) * 0.25; doc.pline([[-over, totalH * K], [W / 2, ridge], [W + over, totalH * K]], false, 'A-WALL-EXTR-N'); UX.levelMark(doc, W + 700, ridge, (ridge / K), false); }
    else { doc.line(-200, totalH * K + 400, W + 200, totalH * K + 400, 'A-WALL-EXTR-N'); doc.rect(-200, totalH * K, W + 400, 500, 'A-WALL-EXTR-N'); }
    // lanț de cote pe verticală (înălțimi de nivel) — stânga
    for (var c = 0; c < niv; c++) doc.dim(-600, levels[c] * K, -600, levels[c + 1] * K, -300, 'A-DIMS-ELEV');
    doc.dim(-1400, 0, -1400, totalH * K, -300, 'A-DIMS-ELEV'); // total
    UX.scaleBar(doc, 0, cotaT * K - 900, 100, 10);
    UX.titleBlock(doc, { x: W + 1600, y: 0, proiect: opts.proiect || 'Fațadă ' + (opts.orient || ''), faza: opts.faza || 'DTAC', plansa: opts.plansa || 'A-05', scara: 100, beneficiar: opts.beneficiar, data: opts.data });
    if (opts.params) { try { UX.techNotes(doc, W + 1600, 65, opts.params); } catch (e) {} }
    return doc;
  };
  UX.facadeFromBuilding = function (opts) { return UX.facadeDoc(opts).emit(); };

  // ─── GENERATOR: SECȚIUNE TRANSVERSALĂ (Sprint 3) ──────────────────────────
  // opts ca la fațadă + adâncimeFundatie(m), strataPlanseu[], strataAcoperis[]
  UX.sectionDoc = function (opts) {
    opts = opts || {}; var doc = UX.newDoc(); var K = 1000;
    var Wm = opts.width || 12, niv = Math.max(1, opts.niv || 1);
    var hP = opts.hParter || 3.0, hE = opts.hEtaj || 3.0, thSlab = 250; // mm
    var levels = [0]; for (var i = 1; i <= niv; i++) levels.push(levels[i - 1] + (i === 1 ? hP : hE));
    var totalH = levels[niv]; var W = Wm * K;
    var adf = (opts.adancimeFundatie != null ? opts.adancimeFundatie : (opts.params && opts.params.adancime_inghet_m) || 1.0);
    // pereți exteriori secționați (2 laturi) — hașurați (zidărie)
    var th = 375;
    [[-th, 0, th, totalH * K], [W, 0, th, totalH * K]].forEach(function (r) { doc.rect(r[0], r[1], r[2], r[3], 'A-WALL-EXTR-N'); try { UX.materialHatch(doc, [[r[0], r[1]], [r[0] + r[2], r[1]], [r[0] + r[2], r[1] + r[3]], [r[0], r[1] + r[3]]], 'ZIDARIE_BCA'); } catch (e) {} });
    // planșee secționate la fiecare nivel (hașură beton) + cotă de nivel
    levels.forEach(function (lv, idx) {
      if (idx > 0) { doc.rect(-th, lv * K - thSlab, W + 2 * th, thSlab, 'S-SLAB-N'); try { UX.materialHatch(doc, [[-th, lv * K - thSlab], [W + th, lv * K - thSlab], [W + th, lv * K], [-th, lv * K]], 'BETON_ARMAT'); } catch (e) {} }
      UX.levelMark(doc, W + th + 700, lv * K, lv, false);
      // înălțime liberă interioară (cotă)
      if (idx < niv) doc.dim(300, lv * K, 300, levels[idx + 1] * K - thSlab, 400, 'A-DIMS-ELEV');
    });
    // placa parter + fundație (sub cota 0)
    doc.rect(-th, -thSlab, W + 2 * th, thSlab, 'S-SLAB-N');
    doc.rect(-th - 200, -adf * K, th + 400, adf * K, 'S-FNDT-N'); doc.rect(W - 200, -adf * K, th + 400, adf * K, 'S-FNDT-N');
    try { UX.materialHatch(doc, [[-th - 200, -adf * K], [-th - 200 + th + 400, -adf * K], [-th - 200 + th + 400, 0], [-th - 200, 0]], 'BETON_ARMAT'); } catch (e) {}
    doc.text(W / 2, -adf * K / 2, 30, 'Fundație continuă — talpa sub adâncimea de îngheț ' + adf.toFixed(2) + 'm (STAS 6054)', 'A-TEXT-NOTE', { align: 'center' });
    // acoperiș (terasă cu atic sau șarpantă)
    var roof = opts.roof || (niv > 2 ? 'terasa' : 'sarpanta');
    if (roof === 'terasa') { doc.rect(-th, totalH * K, W + 2 * th, thSlab, 'S-SLAB-N'); doc.rect(-th, totalH * K + thSlab, th, 500, 'A-WALL-EXTR-N'); doc.rect(W, totalH * K + thSlab, th, 500, 'A-WALL-EXTR-N'); }
    else { var ridge = totalH * K + Math.min(W, 6000) * 0.25; doc.pline([[-th - 400, totalH * K], [W / 2, ridge], [W + th + 400, totalH * K]], false, 'A-WALL-EXTR-N'); doc.line(-th - 400, totalH * K, W + th + 400, totalH * K, 'S-SLAB-N'); }
    // total înălțime + detaliu stratificație planșeu (callout la dreapta)
    doc.dim(-th - 900, 0, -th - 900, totalH * K, -400, 'A-DIMS-ELEV');
    var straturi = opts.strataPlanseu || [{ grosime: 50, nume: 'șapă + finisaj', material: 'MORTAR' }, { grosime: 250, nume: 'placă b.a.', material: 'BETON_ARMAT' }, { grosime: 20, nume: 'tencuială', material: 'MORTAR' }];
    doc.text(W + th + 2400, totalH * K * 0.5 + 400, 30, 'DETALIU PLANȘEU 1:20', 'A-TEXT-NOTE');
    try { UX.strataDetail(doc, W + th + 2400, totalH * K * 0.5 - 200, 700, straturi); } catch (e) {}
    UX.scaleBar(doc, 0, -adf * K - 900, 100, 10);
    UX.titleBlock(doc, { x: W + th + 4000, y: 0, proiect: opts.proiect || 'Secțiune transversală', faza: opts.faza || 'DTAC', plansa: opts.plansa || 'A-07', scara: 100, beneficiar: opts.beneficiar, data: opts.data });
    if (opts.params) { try { UX.techNotes(doc, W + th + 4000, 65, opts.params); } catch (e) {} }
    return doc;
  };
  UX.sectionFromBuilding = function (opts) { return UX.sectionDoc(opts).emit(); };

  // ─── PARTAJAT: parametrii tehnici derivați pt orice motor de planșe ────────
  // Mapează o funcțiune relevee (fn liber) → cheia UXDoc + rulează autoCalc, ca să
  // avem ACEEAȘI calitate de parametri (seism/climă/incendiu) în modulul Planșe.
  UX.mapFnToUXDoc = function (fn, niv) {
    var f = String(fn || '').toLowerCase();
    if (f.indexOf('birou') >= 0) return 'birouri';
    if (f.indexOf('hotel') >= 0) return 'hotelier';
    if (f.indexOf('mall') >= 0) return 'mall';
    if (f.indexOf('com') >= 0 || f.indexOf('retail') >= 0) return 'spatiu-comercial';
    if (f.indexOf('hala') >= 0 || f.indexOf('industr') >= 0 || f.indexOf('logist') >= 0) return 'hala-industriala';
    if (f.indexOf('medical') >= 0 || f.indexOf('spital') >= 0 || f.indexOf('clinic') >= 0) return 'medical';
    if (f.indexOf('scoala') >= 0 || f.indexOf('scol') >= 0 || f.indexOf('invat') >= 0) return 'scoala';
    if (f.indexOf('gradinit') >= 0 || f.indexOf('cresa') >= 0) return 'gradinita';
    if (f.indexOf('sport') >= 0) return 'sport';
    if (f.indexOf('parcare') >= 0) return 'parcare';
    if ((f.indexOf('individ') >= 0 || f.indexOf('unifam') >= 0) || (f.indexOf('rez') >= 0 && (niv || 1) <= 2)) return 'locuinta-individuala';
    return 'bloc-locuinte';
  };
  // P = parcelParams relevee {fn, niv, hn, W, D, area, pot, cut, hMax, judet?, struct?}
  UX.derivedParamsFor = function (P) {
    P = P || {}; if (!G.UXDoc || !G.UXDoc.autoCalc) return {};
    var niv = Math.max(1, +P.niv || 1);
    var Sc = +P.scArea || (P.W && P.D && P.pot ? P.W * P.D * P.pot : (P.area ? P.area * (P.pot || 0.4) : 0));
    var H = +P.hMax || (P.hn ? P.hn * niv : niv * 3);
    var d = { functiune: UX.mapFnToUXDoc(P.fn, niv), judet: P.judet || (G._currentJudet) || '',
      Sc: Math.round(Sc), Sd: Math.round(Sc * niv), H: H, niv_supraterane: niv, struct: P.struct || '' };
    try { return G.UXDoc.autoCalc(d); } catch (e) { return {}; }
  };
  // rânduri pentru tabele (label, valoare)
  UX.paramsRows = function (ac) {
    ac = ac || {}; var da = function (b) { return b ? 'DA' : 'nu'; };
    return [
      ['Categorie importanta:', ac.categorie_importanta || '—'],
      ['Clasa imp. seismica:', (ac.clasa_importanta || '—') + ' (gI=' + (ac.gamma_I != null ? ac.gamma_I.toFixed(2) : '1.00') + ')'],
      ['ag / Tc (P100-1):', ((ac.seismic && ac.seismic.ag) || '—') + 'g / ' + ((ac.seismic && ac.seismic.Tc) || '—') + 's'],
      ['Zapada / Te:', ((ac.clima && ac.clima.sk) || '—') + ' kN/mp / ' + ((ac.clima && ac.clima.Te) || '—') + '°C'],
      ['Adancime inghet:', (ac.adancime_inghet_m || 0.9).toFixed(2) + ' m'],
      ['Grad rezist. la foc:', 'Gradul ' + (ac.grad_default || 'II')],
      ['Categoria PSI:', 'Cat. ' + (ac.psi_default || 'C') + ' (risc ' + (String(ac.risc_incendiu || 'mediu').replace('foarte_mare', 'f.mare')) + ')'],
      ['Sprinklere/IDSAI/lift:', da(ac.sprinklere_oblig) + '/' + da(ac.idsi_oblig) + '/' + da(ac.lift_oblig)]
    ];
  };
  // strip compact pt cartuș (o linie)
  UX.paramsStrip = function (ac) {
    ac = ac || {};
    return 'Categ.imp. ' + (ac.categorie_importanta ? String(ac.categorie_importanta).split(' ')[0] : '-') +
      ' · Clasa seism. ' + (ac.clasa_importanta || '-') + ' (gI=' + (ac.gamma_I != null ? ac.gamma_I.toFixed(2) : '1.00') + ')' +
      ' · ag ' + ((ac.seismic && ac.seismic.ag) || '-') + 'g · Grad RF ' + (ac.grad_default || 'II') +
      ' · PSI Cat.' + (ac.psi_default || 'C') + ' · inghet ' + (ac.adancime_inghet_m || 0.9).toFixed(2) + 'm';
  };

  G.UX_DRAW = UX;
  try { console.log('[UX_DRAW] motor planșe DXF AC1024 încărcat · ' + Object.keys(UX.LAYERS).length + ' layere · ' + Object.keys(UX.MATERIALS).length + ' materiale'); } catch (e) {}
})(window);
