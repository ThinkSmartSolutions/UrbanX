/* ============================================================================
 * UrbanX — Fișă cadastrală (lotizare / comasare / dezmembrare) PENTRU CADASTRIST.
 * NU e masterplanul lotizării (acela = js/lotizare-ansamblu.js, proiectare). Aici
 * generăm DOCUMENTAȚIA tehnică ANCPI/OCPI dintr-o parcelă reală:
 *   1. Plan de amplasament și delimitare (schiță la scară, vârfuri numerotate)
 *   2. Inventar de coordonate STEREO70 (Punct, X-Nord, Y-Est) + lungimi laturi
 *   3. Tabel de mișcare parcelară (situația ACTUALĂ → situația VIITOARE)
 * Operații: dezmembrare/lotizare (1 lot → N), comasare (N loturi → 1), fișă simplă.
 *
 * Conversie WGS84 → Stereo70 cu proj4 (EPSG:3844, Helmert 7 parametri). ORIENTATIV:
 * pentru documentația oficială, coordonatele se obțin din ridicare topografică cu
 * TransDatRO (ANCPI) — nu din reproiecția platformei. Marcat clar pe fișă.
 *
 * window.Cadastru: toStereo · buildFisa · generatePDF · openPanel
 * Format: Ordinul ANCPI 700/2014 (plan amplasament + inventar coordonate + miscare parcelara).
 * ========================================================================== */
(function (G) {
  'use strict';
  var STEREO = '+proj=sterea +lat_0=46 +lon_0=25 +k=0.99975 +x_0=500000 +y_0=500000 ' +
    '+ellps=krass +towgs84=2.329,-147.042,-92.08,-0.309,0.325,0.497,5.69 +units=m +no_defs';
  var _projReady = false;
  function ensureProj() {
    if (_projReady) return !!G.proj4;
    if (!G.proj4) return false;
    try { G.proj4.defs('EPSG:3844', STEREO); _projReady = true; } catch (e) { return false; }
    return true;
  }
  // WGS84 [lon,lat] → Stereo70 {x:Nord, y:Est}. (proj4 dă [easting, northing]; RO: X=Nord, Y=Est.)
  function toStereo(lon, lat) {
    if (!ensureProj()) return null;
    var p = G.proj4('EPSG:4326', 'EPSG:3844', [lon, lat]);
    return { x: Math.round(p[1] * 1000) / 1000, y: Math.round(p[0] * 1000) / 1000 };
  }

  // extrage inelul exterior (cel mai mare poligon dacă MultiPolygon)
  function outerRing(geom) {
    if (!geom) return null;
    if (geom.type === 'Polygon') return geom.coordinates[0];
    if (geom.type === 'MultiPolygon') {
      var best = null, bestA = -1;
      geom.coordinates.forEach(function (poly) { var a = Math.abs(shoeArrLonLat(poly[0])); if (a > bestA) { bestA = a; best = poly[0]; } });
      return best;
    }
    return null;
  }
  function shoeArrLonLat(ring) { var s = 0; for (var i = 0; i < ring.length - 1; i++) { s += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]; } return s / 2; }

  // inel WGS84 → puncte Stereo70 [{pct,x,y}] (fără punctul de închidere duplicat)
  function ringToStereo(ring) {
    if (!ring) return [];
    var pts = [], n = ring.length;
    var closed = n > 1 && ring[0][0] === ring[n - 1][0] && ring[0][1] === ring[n - 1][1];
    var lim = closed ? n - 1 : n;
    for (var i = 0; i < lim; i++) { var s = toStereo(ring[i][0], ring[i][1]); if (s) pts.push({ pct: i + 1, x: s.x, y: s.y }); }
    return pts;
  }
  // arie planară Stereo70 (shoelace) — convenția cadastrală
  function planarArea(pts) {
    if (!pts || pts.length < 3) return 0;
    var s = 0; for (var i = 0; i < pts.length; i++) { var a = pts[i], b = pts[(i + 1) % pts.length]; s += a.y * b.x - b.y * a.x; }
    return Math.abs(s / 2);
  }
  // lungimi laturi (perimetru) în metri
  function sides(pts) {
    var out = []; for (var i = 0; i < pts.length; i++) { var a = pts[i], b = pts[(i + 1) % pts.length]; out.push({ from: a.pct, to: b.pct, len: Math.round(Math.hypot(b.x - a.x, b.y - a.y) * 100) / 100 }); } return out;
  }

  // ── split (dezmembrare / lotizare) — N loturi pe axa lungă, lățime egală ──
  function splitParcel(feature, n) {
    if (!G.turf || n < 2) return [feature];
    var bb; try { bb = G.turf.bbox(feature); } catch (e) { return [feature]; }
    var w = bb[2] - bb[0], h = bb[3] - bb[1], lots = [];
    for (var i = 0; i < n; i++) {
      var strip;
      if (w >= h) strip = G.turf.bboxPolygon([bb[0] + w * i / n, bb[1], bb[0] + w * (i + 1) / n, bb[3]]);
      else strip = G.turf.bboxPolygon([bb[0], bb[1] + h * i / n, bb[2], bb[1] + h * (i + 1) / n]);
      try { var inter = G.turf.intersect(feature, strip); if (inter) lots.push(inter); } catch (e) {}
    }
    return lots.length ? lots : [feature];
  }
  function mergeParcels(features) {
    if (!G.turf || !features.length) return null;
    var u = features[0];
    for (var i = 1; i < features.length; i++) { try { u = G.turf.union(u, features[i]); } catch (e) {} }
    return u;
  }

  // ── construiește fișa (date structurate) ──
  function buildFisa(operation, opts) {
    opts = opts || {};
    var S = G.S, active = S && S.parcels && S.parcels[S.activeParcel];
    var lot = function (feat, nrcad, folosinta, proprietar) {
      var ring = outerRing(feat.geometry); var pts = ringToStereo(ring);
      return { nrcad: nrcad || (feat.properties && feat.properties.nrcad) || '—', pts: pts, area: Math.round(planarArea(pts)), sides: sides(pts), folosinta: folosinta || 'curți construcții', proprietar: proprietar || '—', feature: feat };
    };
    var initial = [], rezultat = [], miscare = [];
    if (operation === 'comasare') {
      var sel = (S && S.parcels && S.parcels.length) ? S.parcels : [];
      if (sel.length < 2) return { error: 'Comasarea cere ≥2 parcele selectate (mod multi-parcelă).' };
      initial = sel.map(function (p, i) { return lot(p.geo, p.nrcad, null, p.proprietar); });
      var merged = mergeParcels(sel.map(function (p) { return p.geo; }));
      if (!merged) return { error: 'Nu s-au putut comasa geometriile.' };
      rezultat = [lot(merged, 'NOU', null, opts.proprietar)];
    } else if (operation === 'dezmembrare' || operation === 'lotizare') {
      if (!active) return { error: 'Selectează o parcelă pe hartă.' };
      initial = [lot(active.geo, active.nrcad, null, active.proprietar)];
      var n = Math.max(2, +opts.n_loturi || 2);
      var parts = splitParcel(active.geo, n);
      rezultat = parts.map(function (f, i) { return lot(f, 'LOT ' + (i + 1), null, opts.proprietar); });
    } else { // fișă simplă
      if (!active) return { error: 'Selectează o parcelă pe hartă.' };
      initial = [lot(active.geo, active.nrcad, null, active.proprietar)];
      rezultat = initial;
    }
    // tabel mișcare parcelară
    var sumI = initial.reduce(function (s, l) { return s + l.area; }, 0);
    var sumR = rezultat.reduce(function (s, l) { return s + l.area; }, 0);
    initial.forEach(function (l) { miscare.push({ stare: 'actual', nrcad: l.nrcad, area: l.area, folosinta: l.folosinta, proprietar: l.proprietar }); });
    rezultat.forEach(function (l) { miscare.push({ stare: 'viitor', nrcad: l.nrcad, area: l.area, folosinta: l.folosinta, proprietar: l.proprietar }); });
    return {
      operation: operation, initial: initial, rezultat: rezultat, miscare: miscare,
      sum_initial: sumI, sum_rezultat: sumR, balance_ok: Math.abs(sumI - sumR) <= Math.max(1, sumI * 0.005),
      proj_ok: ensureProj()
    };
  }

  // ── PDF (format ANCPI: plan amplasament + inventar coordonate + mișcare parcelară) ──
  var OPLABEL = { fisa: 'Fișă cadastrală', dezmembrare: 'Dezmembrare', lotizare: 'Lotizare (dezmembrare în loturi)', comasare: 'Comasare (alipire)' };
  function generatePDF(f) {
    try {
      if (f.error) { alert(f.error); return; }
      var jsPDFns = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF; if (!jsPDFns) { alert('jsPDF indisponibil'); return; }
      var pdf = new jsPDFns({ unit: 'mm', format: 'a4' });
      if (G._registerROFont && G._registerROFont(pdf)) pdf.setFont('DejaVuRO','normal'); // A5: diacritice
      var W = 210, H = 297, x = 16;

      // ── PAGINA 1: Plan de amplasament și delimitare ──
      pdf.setFontSize(9); pdf.setTextColor(120); pdf.text('UrbanX · Documentație cadastrală (Ordin ANCPI 700/2014) — DRAFT orientativ', x, 12);
      pdf.setFontSize(16); pdf.setTextColor(20); pdf.text('Plan de amplasament și delimitare a imobilului', x, 22);
      pdf.setFontSize(11); pdf.setTextColor(60); pdf.text('Operație: ' + (OPLABEL[f.operation] || f.operation), x, 30);
      // schiță la scară din coordonatele Stereo70
      var all = []; f.rezultat.forEach(function (l) { l.pts.forEach(function (p) { all.push(p); }); });
      f.initial.forEach(function (l) { l.pts.forEach(function (p) { all.push(p); }); });
      if (all.length) {
        var minX = Math.min.apply(null, all.map(function (p) { return p.x; })), maxX = Math.max.apply(null, all.map(function (p) { return p.x; }));
        var minY = Math.min.apply(null, all.map(function (p) { return p.y; })), maxY = Math.max.apply(null, all.map(function (p) { return p.y; }));
        var spanX = maxX - minX || 1, spanY = maxY - minY || 1;
        var bx = x, by = 38, bw = W - 2 * x, bh = 150;
        var sc = Math.min(bw / spanY, bh / spanX) * 0.86; // Y=Est→orizontal, X=Nord→vertical (sus)
        var ox = bx + (bw - spanY * sc) / 2, oy = by + (bh - spanX * sc) / 2;
        function px(p) { return ox + (p.y - minY) * sc; }
        function py(p) { return oy + (maxX - p.x) * sc; } // Nord în sus
        // ramă + nord
        pdf.setDrawColor(200); pdf.rect(bx, by, bw, bh);
        pdf.setFontSize(10); pdf.setTextColor(40); pdf.text('N↑', bx + bw - 10, by + 8);
        var COLORS = [[37, 99, 235], [16, 150, 80], [212, 130, 20], [168, 85, 247], [220, 38, 38], [13, 148, 136]];
        var draw = f.rezultat.length > 1 || f.operation === 'comasare' ? f.rezultat : f.initial;
        draw.forEach(function (l, idx) {
          var c = COLORS[idx % COLORS.length]; pdf.setDrawColor(c[0], c[1], c[2]); pdf.setLineWidth(0.4);
          for (var i = 0; i < l.pts.length; i++) { var a = l.pts[i], b = l.pts[(i + 1) % l.pts.length]; pdf.line(px(a), py(a), px(b), py(b)); }
          // vârfuri numerotate
          pdf.setFontSize(7); pdf.setTextColor(c[0], c[1], c[2]);
          l.pts.forEach(function (p) { pdf.circle(px(p), py(p), 0.7, 'F'); pdf.text(String(p.pct), px(p) + 1, py(p) - 1); });
          // etichetă lot la centroid
          var cx = l.pts.reduce(function (s, p) { return s + px(p); }, 0) / l.pts.length, cy = l.pts.reduce(function (s, p) { return s + py(p); }, 0) / l.pts.length;
          pdf.setFontSize(9); pdf.text(l.nrcad + ' (' + l.area + ' mp)', cx - 8, cy);
        });
        pdf.setLineWidth(0.2);
      }
      pdf.setFontSize(8); pdf.setTextColor(150);
      pdf.text('Scară aproximativă. Sistem de proiecție: Stereografic 1970 (EPSG:3844). Orientare: Nord în sus.', x, 196);
      pdf.setTextColor(200, 60, 20);
      pdf.text('DRAFT ORIENTATIV — coordonatele provin din reproiecția platformei (proj4, 7 parametri), NU dintr-o', x, 204);
      pdf.text('ridicare topografică. Documentația oficială ANCPI necesită măsurători cu TransDatRO și viză topograf autorizat.', x, 209);

      // ── PAGINA 2: Inventar de coordonate ──
      pdf.addPage();
      pdf.setFontSize(15); pdf.setTextColor(20); pdf.text('Inventar de coordonate — Stereo70', x, 20);
      var y = 30;
      (f.rezultat.length ? f.rezultat : f.initial).forEach(function (l) {
        if (y > 250) { pdf.addPage(); y = 20; }
        pdf.setFontSize(11); pdf.setTextColor(40); pdf.text(l.nrcad + ' — S = ' + l.area + ' mp', x, y); y += 6;
        pdf.setFontSize(9); pdf.setTextColor(90);
        pdf.text('Pct', x, y); pdf.text('X [Nord] (m)', x + 18, y); pdf.text('Y [Est] (m)', x + 60, y); pdf.text('Latură (m)', x + 102, y); y += 2;
        pdf.setDrawColor(220); pdf.line(x, y, x + 130, y); y += 4;
        var sd = l.sides;
        l.pts.forEach(function (p, i) {
          if (y > 282) { pdf.addPage(); y = 20; }
          pdf.setTextColor(40); pdf.text(String(p.pct), x, y);
          pdf.text(p.x.toFixed(3), x + 18, y); pdf.text(p.y.toFixed(3), x + 60, y);
          pdf.text((sd[i] ? sd[i].len.toFixed(2) : '—'), x + 102, y); y += 5;
        });
        var perim = sd.reduce(function (s, e) { return s + e.len; }, 0);
        pdf.setTextColor(90); pdf.text('Perimetru: ' + perim.toFixed(2) + ' m', x, y); y += 9;
      });

      // ── PAGINA 3: Tabel de mișcare parcelară ──
      pdf.addPage();
      pdf.setFontSize(15); pdf.setTextColor(20); pdf.text('Tabel de mișcare parcelară', x, 20);
      var y3 = 32;
      function block(title, rows, sum) {
        pdf.setFontSize(11); pdf.setTextColor(40); pdf.text(title, x, y3); y3 += 6;
        pdf.setFontSize(9); pdf.setTextColor(90);
        pdf.text('Nr. cadastral', x, y3); pdf.text('Suprafață (mp)', x + 55, y3); pdf.text('Categ. folosință', x + 95, y3); pdf.text('Proprietar', x + 140, y3); y3 += 2;
        pdf.setDrawColor(220); pdf.line(x, y3, x + 178, y3); y3 += 4;
        rows.forEach(function (r) { if (y3 > 280) { pdf.addPage(); y3 = 20; } pdf.setTextColor(40); pdf.text(String(r.nrcad), x, y3); pdf.text(String(r.area), x + 55, y3); pdf.text(r.folosinta, x + 95, y3); pdf.text(String(r.proprietar), x + 140, y3); y3 += 5; });
        pdf.setTextColor(90); pdf.text('TOTAL: ' + sum + ' mp', x, y3 + 1); y3 += 10;
      }
      block('Situația actuală (înainte)', f.miscare.filter(function (m) { return m.stare === 'actual'; }), f.sum_initial);
      block('Situația viitoare (după)', f.miscare.filter(function (m) { return m.stare === 'viitor'; }), f.sum_rezultat);
      pdf.setFontSize(9); pdf.setTextColor(f.balance_ok ? 16 : 200, f.balance_ok ? 150 : 60, f.balance_ok ? 80 : 20);
      pdf.text(f.balance_ok ? '✓ Bilanț suprafețe închis (actual ≈ viitor).' : '⚠ Bilanț suprafețe neînchis — verifică geometria.', x, y3);
      pdf.setFontSize(8); pdf.setTextColor(150);
      pdf.text('Document DRAFT generat de UrbanX pentru pregătirea documentației cadastrale. Nu substituie lucrarea', x, 285);
      pdf.text('persoanei autorizate ANCPI. Categoria de folosință și proprietarii se completează din actele de proprietate.', x, 290);
      pdf.save('Fisa_cadastrala_' + f.operation + '.pdf');
    } catch (e) { console.warn('[Cadastru] PDF', e); alert('Eroare la generarea fișei: ' + e.message); }
  }

  // ── UI ──
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(640px,96vw);max-height:93vh;overflow:auto;border:1px solid rgba(56,189,248,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#0ea5e9,#0284c7);color:#fff;border:0;border-radius:9px;padding:10px 15px;font-weight:700;cursor:pointer;font-size:13px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#7dd3fc;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">📐 Fișă cadastrală (pentru cadastrist)</div><div style="font-size:11px;color:#94a3b8">Plan amplasament · inventar coordonate Stereo70 · tabel mișcare parcelară (ANCPI)</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);

    if (!G.proj4) body.appendChild(el('div', { style: 'font-size:11px;border-radius:8px;padding:8px 10px;margin-bottom:8px;background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.3);color:#fbbf24' }, '⚠ proj4 nu s-a încărcat — conversia Stereo70 e indisponibilă. Reîncarcă pagina.'));

    body.appendChild(el('div', { style: ST.label }, 'Operație'));
    var ops = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:6px' });
    var sel = { v: 'fisa' };
    [['fisa', '📄 Fișă simplă (1 parcelă)'], ['dezmembrare', '✂ Dezmembrare / Lotizare'], ['comasare', '🔗 Comasare (alipire)']].forEach(function (o) {
      var b = el('button', { style: ST.ghost + ';text-align:left' }, o[1]); b.onclick = function () { sel.v = o[0]; ops.querySelectorAll('button').forEach(function (bb) { bb.setAttribute('style', ST.ghost + ';text-align:left'); }); b.setAttribute('style', ST.btn + ';text-align:left'); nopt.style.display = (o[0] === 'dezmembrare' || o[0] === 'lotizare') ? '' : 'none'; };
      ops.appendChild(b);
    });
    body.appendChild(ops);

    var nopt = el('div', { style: 'display:none;margin-top:8px' });
    nopt.appendChild(el('div', { style: ST.label }, 'Număr de loturi rezultate'));
    var nIn = el('input', { style: ST.inp, type: 'number', min: '2', value: '2' }); nopt.appendChild(nIn);
    body.appendChild(nopt);

    body.appendChild(el('div', { style: ST.label }, 'Proprietar (opțional — din actele de proprietate)'));
    var prop = el('input', { style: ST.inp, placeholder: 'nume proprietar' }); body.appendChild(prop);

    // info sursă parcelă
    var S = G.S, ap = S && S.parcels && S.parcels[S.activeParcel];
    body.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin-top:10px' }, ap ? ('Parcelă activă: ' + (ap.nrcad || '—') + ' · ' + (ap.area || '?') + ' mp · UTR ' + (ap.utr || '—') + '. Pentru comasare: activează modul multi-parcelă și selectează ≥2.') : '⚠ Nicio parcelă selectată. Caută/click pe hartă o parcelă întâi.'));

    var run = el('button', { style: ST.btn + ';margin-top:12px' }, '▶ Generează fișa (PDF ANCPI)'); body.appendChild(run);
    var prev = el('div', { style: 'margin-top:12px' }); body.appendChild(prev);
    run.onclick = function () {
      var f = buildFisa(sel.v, { n_loturi: +nIn.value || 2, proprietar: prop.value || null });
      if (f.error) { prev.innerHTML = '<div style="color:#fca5a5;font-size:13px">' + f.error + '</div>'; return; }
      function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:' + (c || '#7dd3fc') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
      prev.innerHTML = '<div style="display:flex;gap:8px;margin-bottom:8px">' + card(f.initial.length, 'parcele actuale') + card(f.rezultat.length, 'loturi rezultate', '#34d399') + card(f.sum_rezultat + ' mp', 'suprafață totală', f.balance_ok ? '#34d399' : '#fbbf24') + '</div>' +
        (f.balance_ok ? '' : '<div style="font-size:11px;color:#fbbf24;margin-bottom:6px">⚠ Bilanț suprafețe: ' + f.sum_initial + ' → ' + f.sum_rezultat + ' mp (diferență din intersecția geometrică — verifică).</div>') +
        '<div style="font-size:11px;color:#cbd5e1">' + f.rezultat.map(function (l) { return l.nrcad + ': <b>' + l.area + ' mp</b> (' + l.pts.length + ' vârfuri)'; }).join(' · ') + '</div>';
      var dl = el('button', { style: ST.btn + ';margin-top:10px' }, '📄 Descarcă PDF'); dl.onclick = function () { generatePDF(f); }; prev.appendChild(dl);
      prev.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:8px' }, 'DRAFT orientativ. Coordonatele Stereo70 din reproiecția platformei (proj4) — nu din ridicare topografică. Documentația oficială ANCPI necesită măsurători cu TransDatRO + viză topograf autorizat.'));
    };
    ov.appendChild(m); document.body.appendChild(ov);
  }

  // ════════════ 004 — MODUL CADASTRU TABBED (componente 002) ════════════
  var CAD_TABS = [
    { id: 'proiecte', label: 'Proiecte' }, { id: 'dezmembrare', label: 'Dezmembrare/Lotizare' },
    { id: 'apartamentare', label: 'Apartamentare' }, { id: 'comasare', label: 'Comasare' }, { id: 'export', label: 'Export ANCPI' }
  ];
  var _cadTab = 'proiecte', _cadOv = null;
  function openCadastru(tab) {
    _cadTab = tab || 'proiecte';
    if (_cadOv) { try { _cadOv.remove(); } catch (e) {} }
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) { ov.remove(); _cadOv = null; } }; _cadOv = ov;
    var m = el('div', { style: ST.modal }); ov.appendChild(m); document.body.appendChild(ov);
    G._cadHostModal = m; _cadRender();
  }
  function _hdr() {
    if (typeof G.moduleHeader === 'function') return G.moduleHeader({ title: '📐 Cadastru', context: 'ANCPI Ordin 700/2014', infoKey: 'cadastru', onClose: 'Cadastru.closeCadastru()' });
    return '<div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between"><b>📐 Cadastru</b><button onclick="Cadastru.closeCadastru()" style="' + ST.ghost + '">✕</button></div>';
  }
  function _tabs() {
    if (typeof G.viewTabs === 'function') return G.viewTabs({ tabs: CAD_TABS, activeTab: _cadTab, onChangeFn: 'Cadastru.switchTab' });
    return '<div style="display:flex;gap:4px;padding:6px 12px;border-bottom:1px solid rgba(255,255,255,.08);flex-wrap:wrap">' + CAD_TABS.map(function (t) { return '<button onclick="Cadastru.switchTab(\'' + t.id + '\')" style="' + (t.id === _cadTab ? ST.btn : ST.ghost) + ';padding:5px 9px">' + t.label + '</button>'; }).join('') + '</div>';
  }
  function _cadRender() {
    var m = G._cadHostModal; if (!m) return;
    m.innerHTML = _hdr() + _tabs() + '<div id="cad-content" style="padding:16px;max-height:62vh;overflow:auto"></div>';
    _cadContent();
  }
  function switchTab(t) { _cadTab = t; _cadRender(); }
  function closeCadastru() { if (_cadOv) { try { _cadOv.remove(); } catch (e) {} _cadOv = null; } }
  function _cadContent() {
    var el2 = document.getElementById('cad-content'); if (!el2) return;
    if (_cadTab === 'dezmembrare') el2.innerHTML = _renderDezmembrare();
    else if (_cadTab === 'apartamentare') el2.innerHTML = _renderApartamentare();
    else if (_cadTab === 'comasare') el2.innerHTML = _renderComasare();
    else if (_cadTab === 'export') el2.innerHTML = _renderExport();
    else el2.innerHTML = _renderProiecte();
  }
  var inpCss = 'width:100%;padding:8px 10px;border-radius:7px;background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;font-size:13px;box-sizing:border-box';
  function _activeInfo() { var S = G.S, ap = S && S.parcels && S.parcels[S.activeParcel]; return ap ? ('parcela CF ' + (ap.nrcad || '—') + ' · ' + (ap.area || '?') + ' mp') : 'nicio parcelă selectată'; }
  function _renderProiecte() {
    return '<div style="font-size:12px;color:#94a3b8;margin-bottom:12px">Fișa cadastrală pentru un cadastrist (plan amplasament + inventar coordonate Stereo70 + tabel mișcare parcelară), pe ' + _activeInfo() + '.</div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' + CAD_TABS.filter(function (t) { return t.id !== 'proiecte'; }).map(function (t) { return '<button onclick="Cadastru.switchTab(\'' + t.id + '\')" style="' + ST.btn + ';background:linear-gradient(180deg,#0ea5e9,#0284c7)">' + t.label + '</button>'; }).join('') + '</div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:14px">⚠ DRAFT orientativ — coordonatele provin din reproiecția platformei (proj4), nu din ridicare topografică. Documentația oficială ANCPI necesită TransDatRO + viză topograf autorizat.</div>';
  }
  function _renderDezmembrare() {
    return '<div style="max-width:720px"><h4 style="margin:0 0 4px;font-size:15px">Dezmembrare / Lotizare</h4>' +
      '<p style="font-size:11px;color:#94a3b8;margin:0 0 14px">Bilanț de suprafețe (planificare) — apoi „Generează" produce dosarul ANCPI real din geometria parcelei selectate.</p>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:6px">' +
      '<div><label style="font-size:11px;color:#94a3b8">Nr. cadastral parcelă mamă</label><input id="dz-nr" type="text" placeholder="ex: 127835" style="' + inpCss + '"></div>' +
      '<div><label style="font-size:11px;color:#94a3b8">Supr. <b>măsurată</b> (mp)</label><input id="dz-sup" type="number" placeholder="ex: 5420" oninput="Cadastru._dzRecalc()" style="' + inpCss + '"></div>' +
      '<div><label style="font-size:11px;color:#94a3b8">Supr. din acte (opțional)</label><input id="dz-acte" type="number" placeholder="ex: 5400" oninput="Cadastru._dzRecalc()" style="' + inpCss + '"></div></div>' +
      '<p style="font-size:10px;color:#64748b;margin:0 0 14px">Bilanțul se face pe suprafața <b>măsurată</b> (din coordonate), conform Ord. ANCPI 700/2014. Diferența față de actele de proprietate este normală (eroare istorică de cadastrare) — se <b>documentează în memoriul tehnic</b>, nu blochează dezmembrarea.</p>' +
      '<div style="font-size:11px;color:#7dd3fc;text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin:10px 0 6px">Loturi propuse</div><div id="dz-loturi">' +
      [1, 2].map(_dzLotRow).join('') + '</div>' +
      '<button onclick="Cadastru._dzAddLot()" style="' + ST.ghost + ';margin-bottom:14px">+ Adaugă lot</button>' +
      '<div style="padding:10px 14px;border-radius:9px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);margin-bottom:14px;font-size:13px">' +
      '<div style="display:flex;justify-content:space-between;padding:3px 0"><span>Parcelă mamă:</span><span id="dz-b-mama">— mp</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:3px 0"><span>Total loturi:</span><span id="dz-b-loturi">0 mp</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:6px 0 3px;border-top:1px solid rgba(255,255,255,.08);font-weight:700"><span>Diferență (trebuie 0):</span><span id="dz-b-dif" style="color:#22c55e">0 mp ✓</span></div></div>' +
      '<div id="dz-acte-note" style="display:none;font-size:11px;padding:8px 12px;border-radius:8px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.3);color:#fbbf24;margin-bottom:14px"></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button onclick="Cadastru._genFromActive(\'dezmembrare\')" style="' + ST.btn + '">⬇ Generează dosar ANCPI (din parcela selectată)</button></div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:8px">' + _activeInfo() + '</div></div>';
  }
  function _dzLotRow(i) {
    return '<div class="dz-lot" style="display:grid;grid-template-columns:54px 1fr 1fr 30px;gap:8px;align-items:center;margin-bottom:6px">' +
      '<span style="font-size:12px;color:#94a3b8">Lot ' + i + '</span>' +
      '<input type="number" placeholder="mp" class="dz-sup" oninput="Cadastru._dzRecalc()" style="' + inpCss + '">' +
      '<input type="text" placeholder="destinație" style="' + inpCss + '">' +
      '<button onclick="Cadastru._dzRemoveLot(this)" style="background:none;border:0;color:#94a3b8;cursor:pointer;font-size:15px">✕</button></div>';
  }
  function _dzRecalc() {
    var mama = parseFloat((document.getElementById('dz-sup') || {}).value || 0), total = 0;
    document.querySelectorAll('.dz-sup').forEach(function (i) { total += parseFloat(i.value || 0); });
    var dif = mama - total, ok = Math.abs(dif) < 1;
    var mE = document.getElementById('dz-b-mama'), lE = document.getElementById('dz-b-loturi'), dE = document.getElementById('dz-b-dif');
    if (mE) mE.textContent = mama.toLocaleString('ro-RO') + ' mp';
    if (lE) lE.textContent = total.toLocaleString('ro-RO') + ' mp';
    if (dE) { dE.textContent = Math.abs(dif).toLocaleString('ro-RO') + ' mp ' + (ok ? '✓' : (dif > 0 ? '⚠ lipsesc' : '⚠ depășesc')); dE.style.color = ok ? '#22c55e' : '#ef4444'; }
    // 005 FAZA 2: discrepanța acte-vs-măsurat — DOCUMENTATĂ, nu blocantă
    var acte = parseFloat((document.getElementById('dz-acte') || {}).value || 0);
    var nE = document.getElementById('dz-acte-note');
    if (nE) {
      if (acte > 0 && mama > 0) {
        var dA = Math.round((mama - acte) * 100) / 100;
        nE.style.display = 'block';
        nE.innerHTML = Math.abs(dA) < 1
          ? '✓ Suprafața măsurată coincide cu cea din acte (' + acte.toLocaleString('ro-RO') + ' mp).'
          : 'ℹ Diferență acte ↔ măsurat: <b>' + (dA > 0 ? '+' : '') + dA.toLocaleString('ro-RO') + ' mp</b> (acte ' + acte.toLocaleString('ro-RO') + ' → măsurat ' + mama.toLocaleString('ro-RO') + '). Normală — se menționează în memoriul tehnic; NU blochează dezmembrarea.';
      } else { nE.style.display = 'none'; }
    }
  }
  function _dzAddLot() { var c = document.getElementById('dz-loturi'); if (!c) return; var n = c.querySelectorAll('.dz-lot').length + 1; c.insertAdjacentHTML('beforeend', _dzLotRow(n)); }
  function _dzRemoveLot(b) { var r = b.closest('.dz-lot'); if (r) r.remove(); _dzRecalc(); }
  function _renderApartamentare() {
    return '<div style="max-width:720px"><h4 style="margin:0 0 4px;font-size:15px">Apartamentare</h4>' +
      '<p style="font-size:11px;color:#94a3b8;margin:0 0 14px">Ordin ANCPI 700/2014 Art. 56-62 — descrierea unităților individuale (UI) dintr-o clădire.</p>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">' +
      '<div><label style="font-size:11px;color:#94a3b8">Nr. cadastral clădire</label><input id="ap-nr" type="text" style="' + inpCss + '"></div>' +
      '<div><label style="font-size:11px;color:#94a3b8">Nr. niveluri</label><input id="ap-niv" type="number" value="4" style="' + inpCss + '"></div></div>' +
      '<button onclick="Cadastru._apAddUnit()" style="' + ST.ghost + ';margin-bottom:10px">+ Adaugă unitate (UI)</button>' +
      '<div id="ap-unitati"></div>' +
      '<div style="padding:10px 14px;border-radius:9px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);margin:12px 0;font-size:13px"><div style="display:flex;justify-content:space-between"><span>Total cotă-părți comune:</span><span id="ap-cota">0% (trebuie 100%)</span></div></div>' +
      '<button onclick="Cadastru._apGen()" style="' + ST.btn + '">⬇ Generează releveu apartamentare (PDF)</button></div>';
  }
  function _apAddUnit() {
    var c = document.getElementById('ap-unitati'); if (!c) return; var n = c.querySelectorAll('.ap-u').length + 1;
    c.insertAdjacentHTML('beforeend', '<div class="ap-u" style="display:grid;grid-template-columns:60px 1fr 1fr 1fr 30px;gap:6px;align-items:center;margin-bottom:6px">' +
      '<span style="font-size:12px;color:#94a3b8">UI ' + n + '</span>' +
      '<input placeholder="nr. (ex 1A)" style="' + inpCss + '">' +
      '<input type="number" placeholder="S utilă mp" style="' + inpCss + '">' +
      '<input type="number" placeholder="cotă %" class="ap-cota-i" oninput="Cadastru._apRecalc()" style="' + inpCss + '">' +
      '<button onclick="this.closest(\'.ap-u\').remove();Cadastru._apRecalc()" style="background:none;border:0;color:#94a3b8;cursor:pointer">✕</button></div>');
  }
  function _apRecalc() { var t = 0; document.querySelectorAll('.ap-cota-i').forEach(function (i) { t += parseFloat(i.value || 0); }); var e = document.getElementById('ap-cota'); if (e) { var ok = Math.abs(t - 100) < 0.5; e.textContent = t.toFixed(1) + '% ' + (ok ? '✓' : '(trebuie 100%)'); e.style.color = ok ? '#22c55e' : '#fbbf24'; } }
  function _apGen() { G.ss && G.ss('Releveu apartamentare — folosește „Export ANCPI" pt dosarul cu geometrie reală (UI individuale = Faza 2 cu plan etaj).'); }
  function _renderComasare() {
    return '<div style="max-width:720px"><h4 style="margin:0 0 4px;font-size:15px">Comasare (alipire)</h4>' +
      '<p style="font-size:11px;color:#94a3b8;margin:0 0 14px">Unește parcele adiacente cu același proprietar. Selectează ≥2 parcele pe hartă (mod multi), apoi generează.</p>' +
      '<div style="font-size:12px;color:#cbd5e1;margin-bottom:12px">' + _activeInfo() + '</div>' +
      '<button onclick="Cadastru._genFromActive(\'comasare\')" style="' + ST.btn + '">⬇ Generează dosar comasare (ANCPI)</button></div>';
  }
  function _renderExport() {
    return '<div style="max-width:720px"><h4 style="margin:0 0 4px;font-size:15px">Export dosar ANCPI</h4>' +
      '<p style="font-size:11px;color:#94a3b8;margin:0 0 14px">Plan de amplasament și delimitare + inventar coordonate Stereo70 + tabel mișcare parcelară (Ordin 700/2014) — din geometria reală a parcelei selectate.</p>' +
      '<div style="font-size:12px;color:#cbd5e1;margin-bottom:12px">' + _activeInfo() + '</div>' +
      '<button onclick="Cadastru._genFromActive(\'fisa\')" style="' + ST.btn + '">⬇ Generează dosarul complet (PDF)</button></div>';
  }
  function _genFromActive(op) {
    var n = 2; try { var di = document.querySelectorAll('.dz-lot').length; if (di) n = di; } catch (e) {}
    var f = buildFisa(op, { n_loturi: n }); if (f && f.error) { G.ss && G.ss(f.error); alert(f.error); return; }
    generatePDF(f);
  }

  G.Cadastru = {
    toStereo: toStereo, buildFisa: buildFisa, generatePDF: generatePDF, openPanel: openCadastru, openCadastru: openCadastru,
    closeCadastru: closeCadastru, switchTab: switchTab, ensureProj: ensureProj,
    _dzRecalc: _dzRecalc, _dzAddLot: _dzAddLot, _dzRemoveLot: _dzRemoveLot, _apAddUnit: _apAddUnit, _apRecalc: _apRecalc, _apGen: _apGen, _genFromActive: _genFromActive
  };
  console.log('[Cadastru] fișă cadastrală (lotizare/comasare/dezmembrare) încărcată (window.Cadastru)');
})(window);
