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
    var hseed = 0x100;   // handle seed (hex)
    function h() { return (hseed++).toString(16).toUpperCase(); }
    function use(layer) { if (UX.LAYERS[layer]) used[layer] = 1; else used[layer] = 1; return layer; }
    function pair(code, val) { ents.push(code + '\n' + val); }

    var api = {
      _ents: ents, _used: used,
      line: function (x1, y1, x2, y2, layer) {
        use(layer); pair(0, 'LINE'); pair(5, h()); pair(100, 'AcDbEntity'); pair(8, layer); pair(100, 'AcDbLine');
        pair(10, num(x1)); pair(20, num(y1)); pair(30, '0'); pair(11, num(x2)); pair(21, num(y2)); pair(31, '0');
        return api;
      },
      pline: function (pts, closed, layer) {
        use(layer); pair(0, 'LWPOLYLINE'); pair(5, h()); pair(100, 'AcDbEntity'); pair(8, layer); pair(100, 'AcDbPolyline');
        pair(90, pts.length); pair(70, closed ? 1 : 0);
        pts.forEach(function (p) { pair(10, num(p[0])); pair(20, num(p[1])); });
        return api;
      },
      rect: function (x, y, w, hgt, layer) {
        return api.pline([[x, y], [x + w, y], [x + w, y + hgt], [x, y + hgt]], true, layer);
      },
      circle: function (cx, cy, r, layer) {
        use(layer); pair(0, 'CIRCLE'); pair(5, h()); pair(100, 'AcDbEntity'); pair(8, layer); pair(100, 'AcDbCircle');
        pair(10, num(cx)); pair(20, num(cy)); pair(30, '0'); pair(40, num(r)); return api;
      },
      arc: function (cx, cy, r, a0, a1, layer) {
        use(layer); pair(0, 'ARC'); pair(5, h()); pair(100, 'AcDbEntity'); pair(8, layer); pair(100, 'AcDbCircle');
        pair(10, num(cx)); pair(20, num(cy)); pair(30, '0'); pair(40, num(r)); pair(100, 'AcDbArc');
        pair(50, num(a0)); pair(51, num(a1)); return api;
      },
      text: function (x, y, hgt, str, layer, opts) {
        opts = opts || {}; use(layer);
        pair(0, 'TEXT'); pair(5, h()); pair(100, 'AcDbEntity'); pair(8, layer); pair(100, 'AcDbText');
        pair(10, num(x)); pair(20, num(y)); pair(30, '0'); pair(40, num(hgt));
        pair(1, String(str == null ? '' : str)); pair(50, num(opts.rot || 0)); pair(7, opts.style || 'ROMANS');
        // alignment: 72 horiz (1=center), 73 vert (2=middle)
        if (opts.align === 'center') { pair(72, 1); pair(11, num(x)); pair(21, num(y)); pair(31, '0'); pair(73, opts.mid ? 2 : 0); }
        else if (opts.mid) { pair(72, 0); pair(11, num(x)); pair(21, num(y)); pair(31, '0'); pair(73, 2); }
        pair(100, 'AcDbText'); return api;
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
      emit: function () { return UX._emitDxf(ents, used); }
    };
    return api;
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

  // ─── GENERATOR: HAȘURĂ MATERIAL ───────────────────────────────────────────
  UX.materialHatch = function (doc, poly, materialKey) {
    var mat = UX.MATERIALS[materialKey] || UX.MATERIALS.BETON_ARMAT;
    doc.hatchLines(poly, mat, mat.layer);
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

  // ─── UTIL: mesele modelului relevee (metri) → plan DXF simplu (mm) ─────────
  // Demonstrativ Sprint 1: contur + camere + etichete + cotare + grid + casetă.
  UX.planFromRooms = function (rooms, opts) {
    opts = opts || {}; var doc = UX.newDoc(); var K = 1000; // m → mm
    var maxX = 0, maxY = 0;
    (rooms || []).forEach(function (r) { maxX = Math.max(maxX, (r.x + r.w)); maxY = Math.max(maxY, (r.y + r.h)); });
    // contur clădire
    doc.rect(0, 0, maxX * K, maxY * K, 'A-WALL-EXTR-N');
    (rooms || []).forEach(function (r) {
      doc.rect(r.x * K, r.y * K, r.w * K, r.h * K, r.bal ? 'A-BALC-N' : 'A-WALL-PART-N');
      UX.roomAnnotation(doc, { cx: (r.x + r.w / 2) * K, cy: (r.y + r.h / 2) * K, name: r.lbl || r.t, area: r.w * r.h });
    });
    UX.structuralGrid(doc, 0, 0, maxX * K, maxY * K, 3000, 3000);
    // cotare totală pe 2 laturi
    doc.dim(0, 0, maxX * K, 0, -240, 'A-DIMS-PLAN');
    doc.dim(0, 0, 0, maxY * K, -240, 'A-DIMS-PLAN');
    UX.titleBlock(doc, { x: maxX * K + 1000, y: 0, proiect: opts.proiect || 'Plan nivel', faza: opts.faza || 'DTAC', plansa: opts.plansa || 'A-03', scara: 100, beneficiar: opts.beneficiar, data: opts.data });
    return doc.emit();
  };

  G.UX_DRAW = UX;
  try { console.log('[UX_DRAW] motor planșe DXF AC1024 încărcat · ' + Object.keys(UX.LAYERS).length + ' layere · ' + Object.keys(UX.MATERIALS).length + ' materiale'); } catch (e) {}
})(window);
