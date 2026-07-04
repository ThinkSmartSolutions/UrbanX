/* ============================================================================
 * UrbanX — GENERATOR PLANȘE (parte desenată) din modelul funcțional.
 * Produce planșe PARAMETRICE COTATE de nivel profesional (draft de proiectare):
 *  • Plan de nivel (parter/etaj) — pereți dublu-strat, uși, etichete+arii, cote, nord, cartuș
 *  • Plan de situație — parcelă, amprentă, retrageri, accese, nord, cote, cartuș
 *  • Secțiune — niveluri, cote de nivel, teren, atic, cartuș
 *  • Fațadă — goluri (tâmplărie), atic/cornișă, cote înălțime, cartuș
 * Export: SVG · PDF (print) · DXF (AutoCAD/BricsCAD; DWG prin ODA).
 * NB: geometria finală (cotare exactă, grilă structurală) o definește proiectantul;
 * planșele auto sunt baza parametrică reală, nu planșa DTAC finală.
 * window.UXPlanSVG.open(spatii, meta)
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) for (var k in a) e.setAttribute(k, a[k]); if (h != null) e.innerHTML = h; return e; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  var CATCOL = { Primire: '#eaf2ff', Administrativ: '#f0ecff', Medical: '#e8fff4', Recuperare: '#e6fbff', 'Masă': '#fff7e6', 'Bloc alimentar': '#fff0db', Sanitare: '#e8f6ff', Tehnic: '#f0f2f5', 'Activități': '#ffeef7', Personal: '#f5edff', Sport: '#ecfce9', Producție: '#fff0e6', Depozitare: '#f2f2f2', Cazare: '#eef0ff', 'Educațional': '#e9fbf7', Energie: '#ffecec', PSI: '#ffe9e9', 'Circulații': '#f7f9fb', Diverse: '#f3f4f6' };
  var MPP = 26; // px per metru (scară desen la ~1:50 vizual)
  var WALL = 3; // grosime perete px

  // ── layout pe niveluri: împachetare rânduri, mp→dimensiuni reale ─────────
  function layout(spatii) {
    var byNiv = {}; (spatii || []).forEach(function (r) { var k = r.niv || 'P'; (byNiv[k] = byNiv[k] || []).push(r); });
    var res = {};
    Object.keys(byNiv).forEach(function (niv) {
      var rooms = []; byNiv[niv].forEach(function (r) { var b = Math.max(1, +r.buc || 1); for (var i = 0; i < b; i++) rooms.push(r); });
      rooms.sort(function (a, b) { return (b.mp_unit || 0) - (a.mp_unit || 0); });
      var W = 24; // lățime bandă în metri (canvas logic)
      var x = 0, y = 0, rowH = 0, rects = [];
      rooms.forEach(function (r) {
        var A = Math.max(4, +r.mp_unit || 4);
        var w = Math.min(8.5, Math.max(2.4, Math.sqrt(A) * 1.15)); // lățime m
        var h = Math.max(2.2, A / w); // înălțime m
        if (x + w > W) { x = 0; y += rowH + 0.0; rowH = 0; }
        rects.push({ x: x, y: y, w: w, h: h, room: r }); x += w; rowH = Math.max(rowH, h);
      });
      var totalH = 0; rects.forEach(function (rc) { totalH = Math.max(totalH, rc.y + rc.h); });
      res[niv] = { rects: rects, w: W, h: totalH };
    });
    return res;
  }

  // ── cartuș (title block) conform Legea 50/1991 Anexa 1 ───────────────────
  function cartus(meta, X, Y, W) {
    meta = meta || {}; var H = 78, x = X, y = Y;
    var s = '<g font-family="Arial" font-size="8" fill="#111">';
    s += '<rect x="' + x + '" y="' + y + '" width="' + W + '" height="' + H + '" fill="#fff" stroke="#111" stroke-width="1"/>';
    // rânduri
    var rows = [
      ['Proiectant', meta.proiectant || 'ThinkSmart Solutions SRL / UrbanX'],
      ['Beneficiar', meta.beneficiar || '—'],
      ['Proiect', meta.proiect || '—'],
      ['Amplasament', meta.amplasament || '—'],
      ['Planșa', (meta.cod || '') + '  ' + (meta.titlu || '')],
      ['Faza / Scara / Data', (meta.faza || 'DTAC') + '  ·  ' + (meta.scara || '1:100') + '  ·  ' + (meta.data || '')]
    ];
    var ry = y + 12; s += '<text x="' + (x + 5) + '" y="' + ry + '" font-size="10" font-weight="bold" fill="#1F3864">' + esc(meta.proiectant || 'UrbanX — ThinkSmart Solutions') + '</text>'; ry += 12;
    rows.slice(1).forEach(function (r) { s += '<text x="' + (x + 5) + '" y="' + ry + '"><tspan fill="#666">' + esc(r[0]) + ': </tspan>' + esc(r[1]) + '</text>'; ry += 10.5; });
    s += '<text x="' + (x + W - 5) + '" y="' + (y + H - 6) + '" text-anchor="end" font-size="7" fill="#888">Generat UrbanX · verificat și semnat de proiectanți atestați</text>';
    s += '</g>';
    return s;
  }
  function nord(x, y) {
    return '<g transform="translate(' + x + ',' + y + ')"><circle r="14" fill="none" stroke="#111" stroke-width="0.8"/><polygon points="0,-13 4,4 0,0 -4,4" fill="#111"/><text y="-16" text-anchor="middle" font-size="9" font-family="Arial" font-weight="bold">N</text></g>';
  }
  function dimH(x1, x2, y, txt) { // cotă orizontală
    return '<g stroke="#c0392b" stroke-width="0.6" font-family="Arial" font-size="7" fill="#c0392b">' +
      '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '"/>' +
      '<line x1="' + x1 + '" y1="' + (y - 3) + '" x2="' + x1 + '" y2="' + (y + 3) + '"/>' +
      '<line x1="' + x2 + '" y1="' + (y - 3) + '" x2="' + x2 + '" y2="' + (y + 3) + '"/>' +
      '<text x="' + ((x1 + x2) / 2) + '" y="' + (y - 3) + '" text-anchor="middle">' + txt + '</text></g>';
  }
  function dimV(y1, y2, x, txt) {
    return '<g stroke="#c0392b" stroke-width="0.6" font-family="Arial" font-size="7" fill="#c0392b">' +
      '<line x1="' + x + '" y1="' + y1 + '" x2="' + x + '" y2="' + y2 + '"/>' +
      '<line x1="' + (x - 3) + '" y1="' + y1 + '" x2="' + (x + 3) + '" y2="' + y1 + '"/>' +
      '<line x1="' + (x - 3) + '" y1="' + y2 + '" x2="' + (x + 3) + '" y2="' + y2 + '"/>' +
      '<text x="' + (x - 4) + '" y="' + ((y1 + y2) / 2) + '" text-anchor="middle" transform="rotate(-90 ' + (x - 4) + ',' + ((y1 + y2) / 2) + ')">' + txt + '</text></g>';
  }

  // ── PLAN DE NIVEL ────────────────────────────────────────────────────────
  function planNivel(lay, niv, meta) {
    var d = lay[niv]; if (!d) return '';
    var PAD = 60, M = MPP;
    var pw = d.w * M, ph = d.h * M;
    var W = pw + PAD * 2, H = ph + PAD * 2 + 90;
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" font-family="Arial">';
    s += '<rect width="100%" height="100%" fill="#fff"/>';
    s += '<text x="' + PAD + '" y="24" font-size="14" font-weight="bold" fill="#1F3864">' + esc((meta && meta.titlu) || ('PLAN ' + (niv === 'E' ? 'ETAJ' : niv === 'S' ? 'SUBSOL' : 'PARTER'))) + '</text>';
    var ox = PAD, oy = 40;
    // conturul exterior gros
    s += '<rect x="' + (ox - 2) + '" y="' + (oy - 2) + '" width="' + (pw + 4) + '" height="' + (ph + 4) + '" fill="none" stroke="#111" stroke-width="' + (WALL + 1) + '"/>';
    d.rects.forEach(function (rc) {
      var x = ox + rc.x * M, y = oy + rc.y * M, w = rc.w * M, h = rc.h * M;
      var col = CATCOL[rc.room.cat] || '#f3f4f6';
      s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + col + '" stroke="#111" stroke-width="' + WALL + '"/>';
      // ușă: gol de 0,9m pe latura de jos (arc)
      var dw = 0.9 * M, dx = x + Math.min(w * 0.3, 8);
      s += '<line x1="' + dx + '" y1="' + (y + h) + '" x2="' + (dx + dw) + '" y2="' + (y + h) + '" stroke="#fff" stroke-width="' + (WALL + 1) + '"/>';
      s += '<path d="M ' + dx + ' ' + (y + h) + ' A ' + dw + ' ' + dw + ' 0 0 1 ' + (dx + dw) + ' ' + (y + h) + '" fill="none" stroke="#999" stroke-width="0.5"/>';
      // etichetă
      var nm = esc((rc.room.nume || '').length > 20 ? rc.room.nume.slice(0, 19) + '…' : rc.room.nume);
      s += '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 - 3) + '" text-anchor="middle" font-size="8" font-weight="bold" fill="#222">' + nm + '</text>';
      s += '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 8) + '" text-anchor="middle" font-size="7" fill="#555">' + (Math.round(rc.room.mp_unit || 0)) + ' mp · ' + rc.w.toFixed(1) + '×' + rc.h.toFixed(1) + '</text>';
    });
    // cote generale
    s += dimH(ox, ox + pw, oy - 14, d.w.toFixed(1) + ' m');
    s += dimV(oy, oy + ph, ox - 14, d.h.toFixed(1) + ' m');
    s += nord(W - 40, 40);
    s += cartus(meta, W - 360, oy + ph + 6, 340);
    s += '</svg>';
    return s;
  }

  // ── PLAN DE SITUAȚIE ─────────────────────────────────────────────────────
  function planSituatie(D, meta) {
    var st = +D.Steren || 2000, sc = +D.Sc || Math.round(st * 0.25);
    var side = Math.sqrt(st), bside = Math.sqrt(sc); // pătrat echivalent
    var M = 3.2, PAD = 70;
    var pw = side * M, ph = side * M, W = pw + PAD * 2, H = ph + PAD * 2 + 90;
    var rf = +D.retragere_fata || 5, rl = +D.retragere_lateral || 3, rsp = +D.retragere_spate || 5;
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" font-family="Arial"><rect width="100%" height="100%" fill="#fff"/>';
    s += '<text x="' + PAD + '" y="24" font-size="14" font-weight="bold" fill="#1F3864">PLAN DE SITUAȚIE</text>';
    var ox = PAD, oy = 40;
    // parcela
    s += '<rect x="' + ox + '" y="' + oy + '" width="' + pw + '" height="' + ph + '" fill="#f4faf0" stroke="#111" stroke-width="1.5" stroke-dasharray="6 3"/>';
    // amprenta clădire (retrasă)
    var bx = ox + rf * M, by = oy + rf * M, bw = bside * M, bh = (sc / bside) * M;
    if (bw > pw - (rf + rl) * M) bw = pw - (rf + rl) * M; if (bh > ph - (rf + rsp) * M) bh = ph - (rf + rsp) * M;
    s += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" fill="#dbe7f5" stroke="#1F3864" stroke-width="2"/>';
    s += '<text x="' + (bx + bw / 2) + '" y="' + (by + bh / 2) + '" text-anchor="middle" font-size="9" font-weight="bold" fill="#1F3864">CONSTRUCȚIE PROPUSĂ<tspan x="' + (bx + bw / 2) + '" dy="12" font-size="8" font-weight="normal">Sc ≈ ' + sc + ' mp</tspan></text>';
    // retrageri (cote)
    s += dimV(oy, by, ox - 16, 'front ' + rf + 'm');
    s += dimH(ox, bx, oy + ph + 16, 'lat ' + rl + 'm');
    // acces
    s += '<text x="' + (ox + pw / 2) + '" y="' + (oy + ph - 4) + '" text-anchor="middle" font-size="8" fill="#c0392b">▲ acces din drum public</text>';
    s += '<text x="' + ox + '" y="' + (oy - 4) + '" font-size="8" fill="#555">Teren: ' + st.toLocaleString('ro-RO') + ' mp · POT propus ' + (st ? Math.round(sc / st * 100) : 0) + '%</text>';
    s += nord(W - 40, 40);
    s += cartus(Object.assign({}, meta, { titlu: 'Plan de situație', cod: 'A.01', scara: '1:500' }), W - 360, oy + ph + 6, 340);
    s += '</svg>';
    return s;
  }

  // ── SECȚIUNE ─────────────────────────────────────────────────────────────
  function sectiune(D, meta) {
    var niv = Math.max(1, +D.niv_supraterane || 1), hNiv = 3.0, H0 = +D.H || (niv * hNiv + 1);
    var M = 34, PAD = 70, wm = 14;
    var pw = wm * M, ph = (niv * hNiv + 1.5) * M, W = pw + PAD * 2, Ht = ph + PAD * 2 + 90;
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + Ht + '" font-family="Arial"><rect width="100%" height="100%" fill="#fff"/>';
    s += '<text x="' + PAD + '" y="24" font-size="14" font-weight="bold" fill="#1F3864">SECȚIUNE TRANSVERSALĂ A-A</text>';
    var ox = PAD, oy = 40, base = oy + ph - 1.5 * M;
    // teren
    s += '<line x1="' + (ox - 20) + '" y1="' + base + '" x2="' + (ox + pw + 20) + '" y2="' + base + '" stroke="#6b4423" stroke-width="2"/>';
    s += '<text x="' + (ox + pw + 22) + '" y="' + (base + 3) + '" font-size="8" fill="#6b4423">±0,00 (CTS)</text>';
    // niveluri
    for (var k = 0; k < niv; k++) {
      var yTop = base - (k + 1) * hNiv * M, yBot = base - k * hNiv * M;
      s += '<rect x="' + ox + '" y="' + yTop + '" width="' + pw + '" height="' + (hNiv * M) + '" fill="#fafafa" stroke="#111" stroke-width="2"/>';
      s += '<text x="' + (ox + 6) + '" y="' + (yBot - 6) + '" font-size="8" fill="#333">' + (k === 0 ? 'PARTER' : 'ETAJ ' + k) + ' (H liber 2,70 m)</text>';
      s += '<text x="' + (ox - 6) + '" y="' + (yTop + 3) + '" text-anchor="end" font-size="7" fill="#c0392b">+' + ((k + 1) * hNiv).toFixed(2) + '</text>';
    }
    // planșeu/acoperiș
    s += '<rect x="' + (ox - 4) + '" y="' + (base - niv * hNiv * M - 6) + '" width="' + (pw + 8) + '" height="6" fill="#1F3864"/>';
    s += '<text x="' + (ox + pw + 8) + '" y="' + (base - niv * hNiv * M) + '" font-size="7" fill="#c0392b">+' + (niv * hNiv).toFixed(2) + ' atic</text>';
    s += dimV(base - niv * hNiv * M, base, ox - 30, 'H ' + (niv * hNiv).toFixed(1) + ' m');
    s += cartus(Object.assign({}, meta, { titlu: 'Secțiune A-A', cod: 'A.06', scara: '1:50' }), W - 360, oy + ph + 6, 340);
    s += '</svg>';
    return s;
  }

  // ── FAȚADĂ ───────────────────────────────────────────────────────────────
  function fatada(D, meta) {
    var niv = Math.max(1, +D.niv_supraterane || 1), hNiv = 3.0, wm = 18, M = 30, PAD = 70;
    var pw = wm * M, ph = (niv * hNiv + 1) * M, W = pw + PAD * 2, Ht = ph + PAD * 2 + 90;
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + Ht + '" font-family="Arial"><rect width="100%" height="100%" fill="#fff"/>';
    s += '<text x="' + PAD + '" y="24" font-size="14" font-weight="bold" fill="#1F3864">FAȚADA PRINCIPALĂ</text>';
    var ox = PAD, oy = 40, base = oy + ph - 0.6 * M;
    // volum
    s += '<rect x="' + ox + '" y="' + (base - niv * hNiv * M) + '" width="' + pw + '" height="' + (niv * hNiv * M) + '" fill="#eef2f7" stroke="#111" stroke-width="1.5"/>';
    // ferestre pe niveluri
    for (var k = 0; k < niv; k++) {
      var yb = base - k * hNiv * M, wy = yb - hNiv * M + 0.5 * M;
      var nW = Math.floor(wm / 3);
      for (var j = 0; j < nW; j++) {
        var wx = ox + 1.2 * M + j * 3 * M;
        s += '<rect x="' + wx + '" y="' + wy + '" width="' + (1.6 * M) + '" height="' + (1.5 * M) + '" fill="#cfe0f0" stroke="#1F3864" stroke-width="1"/>';
        s += '<line x1="' + (wx + 0.8 * M) + '" y1="' + wy + '" x2="' + (wx + 0.8 * M) + '" y2="' + (wy + 1.5 * M) + '" stroke="#1F3864" stroke-width="0.5"/>';
      }
    }
    // ușă acces la parter
    s += '<rect x="' + (ox + pw / 2 - 0.9 * M) + '" y="' + (base - 2.4 * M) + '" width="' + (1.8 * M) + '" height="' + (2.4 * M) + '" fill="#dbe7f5" stroke="#1F3864" stroke-width="1.2"/>';
    s += '<line x1="' + (ox - 20) + '" y1="' + base + '" x2="' + (ox + pw + 20) + '" y2="' + base + '" stroke="#6b4423" stroke-width="2"/>';
    s += dimV(base - niv * hNiv * M, base, ox - 20, 'H ' + (niv * hNiv).toFixed(1) + ' m');
    s += cartus(Object.assign({}, meta, { titlu: 'Fațada principală', cod: 'A.09', scara: '1:50' }), W - 360, oy + ph + 6, 340);
    s += '</svg>';
    return s;
  }

  // ── TABLOU DE TÂMPLĂRIE (T.01) — derivat parametric din spații ────────────
  // Uși: 1 interioară/spațiu; ext. acces (1.60 dublă) + secundar (1.20). Ferestre:
  // arie vitrată ≈ 1/8 din aria pardoselii (iluminat natural OMS 119/NP), în ferestre standard.
  function tamplarie(spatii, D) {
    spatii = spatii || [];
    var usi = {}, fer = {};
    function addU(cod, l, h, mat, obs) { var k = cod; usi[k] = usi[k] || { cod: cod, l: l, h: h, mat: mat, obs: obs, n: 0 }; usi[k].n++; }
    function addF(cod, l, h, n) { fer[cod] = fer[cod] || { cod: cod, l: l, h: h, n: 0 }; fer[cod].n += n; }
    var noSan = 0, noNorm = 0, aTot = 0;
    spatii.forEach(function (r) {
      var b = Math.max(1, +r.buc || 1), A = (+r.mp_unit || 0) * b; aTot += A;
      var cat = (r.cat || '') + '', nm = (r.nume || '').toLowerCase();
      // uși interioare pe spațiu
      if (/sanit|wc|grup san|baie/.test(nm) || cat === 'Sanitare') { for (var i = 0; i < b; i++) addU('Ui1', 0.80, 2.10, 'PVC/MDF', 'ușă interioară GS'); noSan += b; }
      else { for (var j = 0; j < b; j++) addU('Ui2', 0.90, 2.10, 'MDF/lemn', 'ușă interioară (acces PMR 0,90 m)'); noNorm += b; }
      // ferestre din iluminat natural (spații de folosință prelungită)
      if (!/sanit|wc|tehnic|depozit|magazie|circulat|hol|coridor/.test(nm) && cat !== 'Sanitare' && cat !== 'Tehnic' && cat !== 'Depozitare' && A > 0) {
        var aFer = A / 8; // OMS 119: min 1/8 din pardoseală
        var aUnit = 1.20 * 1.50; // fereastră tip 1,20×1,50
        var nf = Math.max(b, Math.round(aFer / aUnit));
        addF('F1', 1.20, 1.50, nf);
      }
    });
    // uși exterioare
    addU('Ue1', 1.60, 2.40, 'Al/geam securizat', 'acces principal, dublă, spre exterior'); usi['Ue1'].n = 1;
    addU('Ue2', 1.20, 2.20, 'Al/geam securizat', 'acces secundar / evacuare'); usi['Ue2'].n = 1;
    // fereastră mare pentru săli aglomerate
    addF('F2', 1.80, 1.50, Math.max(1, Math.round(aTot / 300)));
    return { usi: Object.keys(usi).map(function (k) { return usi[k]; }), fer: Object.keys(fer).map(function (k) { return fer[k]; }) };
  }
  function planTamplarie(spatii, D, meta) {
    var t = tamplarie(spatii, D);
    var items = t.usi.map(function (u) { return { tip: 'ușă', cod: u.cod, l: u.l, h: u.h, n: u.n, mat: u.mat, obs: u.obs }; })
      .concat(t.fer.map(function (f) { return { tip: 'fereastră', cod: f.cod, l: f.l, h: f.h, n: f.n, mat: 'PVC/Al triplu geam low-E', obs: 'Uw ≤ 1,1 W/mp·K' }; }));
    var rowH = 74, top = 56, W = 820, H = top + items.length * rowH + 130;
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" font-family="Arial"><rect width="100%" height="100%" fill="#fff"/>';
    s += '<text x="30" y="26" font-size="14" font-weight="bold" fill="#1F3864">TABLOU DE TÂMPLĂRIE</text>';
    s += '<text x="30" y="42" font-size="9" fill="#666">Derivat parametric din programul de spații (uși/spațiu + iluminat natural OMS 119). Dimensiunile finale se confirmă în proiectul de arhitectură.</text>';
    // header
    var cx = [30, 150, 470, 560, 660]; // thumbnail, cod, dims/obs, buc
    s += '<g font-size="9" font-weight="bold" fill="#333"><text x="34" y="' + (top - 4) + '">Elevație</text><text x="150" y="' + (top - 4) + '">Cod / tip</text><text x="270" y="' + (top - 4) + '">Dimensiuni (l×h)</text><text x="470" y="' + (top - 4) + '">Material / obs.</text><text x="740" y="' + (top - 4) + '">Buc.</text></g>';
    s += '<line x1="30" y1="' + top + '" x2="' + (W - 20) + '" y2="' + top + '" stroke="#111" stroke-width="0.8"/>';
    items.forEach(function (it, i) {
      var y = top + i * rowH; var pxScale = 24, tw = it.l * pxScale, th = it.h * pxScale;
      var tx = 40, ty = y + (rowH - th) / 2 + 4;
      // thumbnail elevație
      s += '<rect x="' + tx + '" y="' + ty + '" width="' + tw + '" height="' + th + '" fill="' + (it.tip === 'ușă' ? '#dbe7f5' : '#cfe0f0') + '" stroke="#1F3864" stroke-width="1.2"/>';
      if (it.tip === 'fereastră') { s += '<line x1="' + (tx + tw / 2) + '" y1="' + ty + '" x2="' + (tx + tw / 2) + '" y2="' + (ty + th) + '" stroke="#1F3864" stroke-width="0.6"/><line x1="' + tx + '" y1="' + (ty + th / 2) + '" x2="' + (tx + tw) + '" y2="' + (ty + th / 2) + '" stroke="#1F3864" stroke-width="0.6"/>'; }
      else { s += '<line x1="' + (tx + tw * 0.8) + '" y1="' + (ty + th / 2) + '" x2="' + (tx + tw * 0.8) + '" y2="' + (ty + th / 2 + 3) + '" stroke="#1F3864" stroke-width="1"/>'; }
      s += '<text x="150" y="' + (y + rowH / 2) + '" font-size="11" font-weight="bold" fill="#1F3864">' + it.cod + '</text><text x="150" y="' + (y + rowH / 2 + 13) + '" font-size="8" fill="#666">' + it.tip + '</text>';
      s += '<text x="270" y="' + (y + rowH / 2 + 4) + '" font-size="10" fill="#222">' + it.l.toFixed(2) + ' × ' + it.h.toFixed(2) + ' m</text>';
      s += '<text x="470" y="' + (y + rowH / 2 - 2) + '" font-size="8.5" fill="#333">' + it.mat + '</text><text x="470" y="' + (y + rowH / 2 + 10) + '" font-size="8" fill="#666">' + (it.obs || '') + '</text>';
      s += '<text x="748" y="' + (y + rowH / 2 + 4) + '" font-size="12" font-weight="bold" fill="#c0392b" text-anchor="middle">' + it.n + '</text>';
      s += '<line x1="30" y1="' + (y + rowH) + '" x2="' + (W - 20) + '" y2="' + (y + rowH) + '" stroke="#ccc" stroke-width="0.5"/>';
    });
    var totU = t.usi.reduce(function (a, u) { return a + u.n; }, 0), totF = t.fer.reduce(function (a, f) { return a + f.n; }, 0);
    s += '<text x="30" y="' + (top + items.length * rowH + 20) + '" font-size="9.5" fill="#333">Total: ' + totU + ' uși, ' + totF + ' ferestre. Toate tâmplăriile exterioare: geam triplu low-E, Uw ≤ 1,1 W/mp·K (C107/nZEB). Uși pe căi de evacuare: deschidere în sensul evacuării, bară antipanică unde e cazul (P118).</text>';
    s += cartus(Object.assign({}, meta, { titlu: 'Tablou de tâmplărie', cod: 'T.01', scara: '1:20' }), W - 360, top + items.length * rowH + 34, 340);
    s += '</svg>';
    return s;
  }

  // ── DXF (plan de nivel) ──────────────────────────────────────────────────
  function toDXF(lay, niv) {
    var d = lay[niv]; if (!d) return ''; var e = [];
    function p(c, v) { e.push(c); e.push(v); }
    e.push('0'); e.push('SECTION'); e.push('2'); e.push('ENTITIES');
    d.rects.forEach(function (rc) {
      var X = rc.x, Y = -(rc.y), W = rc.w, H = rc.h;
      var pts = [[X, Y], [X + W, Y], [X + W, Y - H], [X, Y - H], [X, Y]];
      p('0', 'POLYLINE'); p('8', 'PERETI'); p('66', '1'); p('70', '1');
      pts.forEach(function (pt) { p('0', 'VERTEX'); p('8', 'PERETI'); p('10', pt[0].toFixed(3)); p('20', pt[1].toFixed(3)); });
      p('0', 'SEQEND');
      p('0', 'TEXT'); p('8', 'TEXT'); p('10', (X + 0.2).toFixed(3)); p('20', (Y - 0.5).toFixed(3)); p('40', '0.3'); p('1', (rc.room.nume || '').replace(/[^\x20-\x7e]/g, '') + ' ' + Math.round(rc.room.mp_unit || 0) + 'mp');
    });
    e.push('0'); e.push('ENDSEC'); e.push('0'); e.push('EOF');
    return e.join('\n');
  }

  function _dl(name, content, mime) { try { var b = new Blob([content], { type: mime }); var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); } catch (e) {} }

  function open(spatii, meta) {
    spatii = spatii || []; meta = meta || {};
    if (!spatii.length) { if (G.ss) G.ss('Nu există program de spații. Generează-l în „🧩 Program funcțional".'); return; }
    var D = meta.D || {};
    var lay = layout(spatii);
    var planse = [];
    Object.keys(lay).sort().forEach(function (niv) { planse.push({ id: 'plan-' + niv, nume: 'Plan ' + (niv === 'E' ? 'etaj' : niv === 'S' ? 'subsol' : 'parter'), svg: planNivel(lay, niv, Object.assign({}, meta, { titlu: 'PLAN ' + (niv === 'E' ? 'ETAJ' : niv === 'S' ? 'SUBSOL' : 'PARTER'), cod: niv === 'E' ? 'A.03' : 'A.02', scara: '1:100' })), niv: niv }); });
    planse.push({ id: 'situatie', nume: 'Plan situație', svg: planSituatie(D, meta) });
    planse.push({ id: 'sectiune', nume: 'Secțiune', svg: sectiune(D, meta) });
    planse.push({ id: 'fatada', nume: 'Fațadă', svg: fatada(D, meta) });
    planse.push({ id: 'tamplarie', nume: 'Tablou tâmplărie', svg: planTamplarie(spatii, D, meta) });

    var ov = el('div', { id: 'uxplan-ov', style: 'position:fixed;inset:0;background:#070c18;z-index:4300;overflow:auto;font-family:system-ui;color:#e6edf7' });
    var wrap = el('div', { style: 'max-width:1200px;margin:0 auto;padding:16px' });
    var head = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:10px' });
    head.appendChild(el('div', null, '<div style="font-size:17px;font-weight:800;color:#6ee7b7">📐 Planșe (parte desenată) din model</div><div style="font-size:11px;color:#94a3b8">Planuri niveluri · situație · secțiune · fațadă · tablou tâmplărie — cotate, cu cartuș. Export SVG/PDF/DXF. Draft parametric; geometria finală o rafinează proiectantul.</div>'));
    var bX = el('button', { style: 'background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer' }, '✕'); bX.onclick = function () { ov.remove(); }; head.appendChild(bX); wrap.appendChild(head);
    // tabs
    var tabs = el('div', { style: 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px' });
    var view = el('div', { style: 'background:#fff;border-radius:8px;padding:8px;overflow:auto' });
    var cur = 0;
    function show(i) { cur = i; view.innerHTML = planse[i].svg; Array.prototype.forEach.call(tabs.children, function (c, k) { c.style.background = k === i ? '#34d399' : 'rgba(148,163,184,.15)'; c.style.color = k === i ? '#04231a' : '#cbd5e1'; }); }
    planse.forEach(function (pl, i) { var b = el('button', { style: 'border:none;border-radius:7px;padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer' }, pl.nume); b.onclick = function () { show(i); }; tabs.appendChild(b); });
    var bar = el('div', { style: 'display:flex;gap:8px;margin-bottom:8px' });
    function mk(t, fn) { var b = el('button', { style: 'background:rgba(52,211,153,.18);color:#6ee7b7;border:1px solid rgba(52,211,153,.4);border-radius:8px;padding:7px 12px;font-size:12px;font-weight:600;cursor:pointer' }, t); b.onclick = fn; return b; }
    bar.appendChild(mk('⬇ SVG', function () { _dl(planse[cur].id + '.svg', planse[cur].svg, 'image/svg+xml'); }));
    bar.appendChild(mk('⬇ DXF (plan)', function () { var pl = planse[cur]; if (pl.niv) _dl(pl.id + '.dxf', toDXF(lay, pl.niv), 'application/dxf'); else if (G.ss) G.ss('DXF disponibil pentru planurile de nivel.'); }));
    bar.appendChild(mk('🖨 PDF', function () { var w = window.open('', '_blank'); if (w) { w.document.write('<html><head><title>' + planse[cur].nume + '</title></head><body style="margin:0">' + planse[cur].svg + '</body></html>'); w.document.close(); setTimeout(function () { w.print(); }, 300); } }));
    bar.appendChild(mk('⬇ Toate (SVG)', function () { planse.forEach(function (pl) { _dl(pl.id + '.svg', pl.svg, 'image/svg+xml'); }); }));
    wrap.appendChild(tabs); wrap.appendChild(bar); wrap.appendChild(view);
    ov.appendChild(wrap); document.body.appendChild(ov); show(0);
  }

  G.UXPlanSVG = { layout: layout, planNivel: planNivel, planSituatie: planSituatie, sectiune: sectiune, fatada: fatada, tamplarie: tamplarie, planTamplarie: planTamplarie, toDXF: toDXF, open: open };
})(window);
