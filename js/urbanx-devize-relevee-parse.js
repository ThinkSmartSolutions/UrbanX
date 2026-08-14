/* ============================================================================
 * UrbanX — PARSING REAL DE RELEVEE (window.UXDevizeRelevee)
 * Extrage cantități REALE (nu estimate) din fișiere încărcate de utilizator, pt
 * modulul Devize & Cost Management (secțiunea 3bis din specificație — relevee pe
 * nivel, sursă alternativă/complementară de cantități față de proiectat).
 *
 * Formate acoperite:
 *  • CSV  — coloane nivel;denumire;suprafata;um — extragere directă, încredere ridicată.
 *  • DXF  — TOATE poligoanele închise (LWPOLYLINE/POLYLINE), arie prin formula ariei
 *           (shoelace) pe coordonate reale, nu estimare — încredere ridicată.
 *  • DWG  — refuzat cu mesaj clar (format binar Autodesk, nu se poate citi în browser;
 *           se convertește la DXF cu un tool gratuit, apoi se citește real).
 *  • PDF cu text — extragere reală via pdf.js (window.UXIngest, deja verificat/deployat
 *           în platformă la SSI) — încredere medie (depinde de formatarea tabelului).
 *  • PDF scanat / imagine — OCR real via Tesseract.js (încărcat la cerere, NU implicit,
 *           e greu) — încredere SCĂZUTĂ, candidații apar nebifați implicit, utilizatorul
 *           confirmă/corectează explicit înainte de import (regulă platformă: auto-
 *           estimare conservatoare, DRAFT merge mereu, FINAL cere confirmare).
 *
 * Rezultat comun: { niveluri:[...], candidati:[{denumire,cantitate,um,sursa_linie,
 * sursa,incredere,selectat}] } — NU se importă orbește; UI-ul afișează candidații
 * pt revizuire/bifare înainte de a crea articole (window.UXDevizePro.createArticol).
 * ========================================================================== */
(function (G) {
  'use strict';

  // ── Heuristică comună: extrage candidați "denumire ... cantitate UM" dintr-un text brut ──
  // Acoperă formate uzuale: "Living 25,40 mp", "Dormitor 1: 14.2 m²", "Baie - 4,5 mp".
  var UM_RE = '(mp|m2|m²|m3|m³|ml|buc)';
  var LINIE_RE = new RegExp('^(.{2,40}?)[\\s:\\-–]+([\\d]+(?:[.,]\\d+)?)\\s*' + UM_RE, 'i');
  function extrageCandidati(text, sursaLabel, incredere) {
    var linii = String(text || '').split(/\r?\n/);
    var candidati = [];
    linii.forEach(function (linie, idx) {
      var l = linie.trim(); if (!l || l.length > 80) return;
      var m = l.match(LINIE_RE);
      if (!m) return;
      var denumire = m[1].trim().replace(/[.:\-–]+$/, '').trim();
      if (!denumire || /^\d+$/.test(denumire)) return;
      var cantitate = parseFloat(m[2].replace(',', '.'));
      if (!cantitate || cantitate <= 0 || cantitate > 100000) return;
      var um = m[3].toLowerCase().replace('m2', 'm²').replace('m3', 'm³');
      candidati.push({ denumire: denumire, cantitate: cantitate, um: um, sursa_linie: l, linie_index: idx, sursa: sursaLabel, incredere: incredere, selectat: incredere === 'ridicata' });
    });
    return candidati;
  }

  // ── 1. CSV relevee — coloane: nivel;denumire;suprafata;um ────────────────────
  function parseCSVRelevee(text) {
    var sep = text.indexOf(';') > -1 ? ';' : ',';
    var linii = String(text || '').split(/\r?\n/).filter(function (l) { return l.trim().length; });
    if (!linii.length) return { niveluri: [], candidati: [] };
    var head = linii[0].split(sep).map(function (h) { return h.trim().toLowerCase(); });
    var candidati = [];
    linii.slice(1).forEach(function (l, idx) {
      var cel = l.split(sep), o = {};
      head.forEach(function (h, i) { o[h] = (cel[i] || '').trim(); });
      var cantitate = parseFloat((o.suprafata || o['suprafață'] || o.cantitate || '0').replace(',', '.'));
      var denumire = o.denumire || o.incapere || o['încăpere'];
      if (!denumire) return;
      candidati.push({ nivel: o.nivel || 'parter', denumire: denumire, cantitate: cantitate || 0, um: o.um || 'm²', sursa_linie: l, linie_index: idx, sursa: 'CSV', incredere: 'ridicata', selectat: true });
    });
    var niveluri = candidati.map(function (c) { return c.nivel; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
    return { niveluri: niveluri, candidati: candidati };
  }

  // ── 2. DXF relevee — TOATE poligoanele închise (nu doar conturul cel mai mare, ca la parcelă) ──
  // Fiecare poligon = probabil o încăpere/element; arie prin formula ariei (shoelace), reală.
  function parseDXFRelevee(text) {
    var lines = String(text || '').split(/\r\n|\r|\n/);
    var pairs = []; for (var i = 0; i + 1 < lines.length; i += 2) pairs.push([lines[i].trim(), lines[i + 1]]);
    var polys = [], cur = null, mode = null, vx = null, curLayer = null;
    for (var k = 0; k < pairs.length; k++) {
      var code = pairs[k][0], val = pairs[k][1];
      if (code === '0') {
        if (val === 'LWPOLYLINE') { cur = { pts: [], layer: null }; mode = 'lw'; polys.push(cur); }
        else if (val === 'POLYLINE') { cur = { pts: [], layer: null }; mode = 'pl'; polys.push(cur); }
        else if (val === 'VERTEX' && mode === 'pl' && cur) { vx = { x: null, y: null }; }
        else if (val === 'SEQEND' && vx) { vx = null; }
        else if (mode === 'lw') { mode = null; cur = null; }
      } else if (code === '8') { curLayer = val; if (cur && !cur.layer) cur.layer = val; }
      else if (mode === 'lw' && cur) {
        if (code === '10') cur.pts.push({ x: parseFloat(val), y: null });
        else if (code === '20' && cur.pts.length) cur.pts[cur.pts.length - 1].y = parseFloat(val);
      } else if (mode === 'pl' && vx) {
        if (code === '10') vx.x = parseFloat(val);
        else if (code === '20') { vx.y = parseFloat(val); if (cur) cur.pts.push({ x: vx.x, y: vx.y }); }
      }
    }
    function area(p) { var a = 0; for (var j = 0; j < p.length; j++) { var q = p[(j + 1) % p.length]; if (!p[j] || !q || p[j].x == null || q.x == null) continue; a += p[j].x * q.y - q.x * p[j].y; } return Math.abs(a) / 2; }
    function perimetru(p) { var per = 0; for (var j = 0; j < p.length; j++) { var q = p[(j + 1) % p.length]; if (!p[j] || !q) continue; per += Math.hypot(q.x - p[j].x, q.y - p[j].y); } return per; }
    var candidati = [];
    polys.forEach(function (poly, idx) {
      var pts = poly.pts.filter(function (v) { return v && v.x != null && v.y != null; });
      if (pts.length < 3) return;
      var ar = area(pts);
      if (ar < 0.3) return; // sub 0.3 mp — probabil cotă/hașură/element de desen, nu o încăpere reală
      candidati.push({ denumire: (poly.layer || 'Poligon') + ' #' + (idx + 1), cantitate: Math.round(ar * 100) / 100, um: 'm²', perimetru_m: Math.round(perimetru(pts) * 100) / 100, sursa_linie: 'DXF layer: ' + (poly.layer || '?'), sursa: 'DXF', incredere: 'ridicata', selectat: true });
    });
    return { niveluri: [], candidati: candidati, poligoane_gasite: polys.length };
  }

  // ── 3. PDF cu text (nu scanat) — extragere reală via pdf.js (window.UXIngest, deja verificat) ──
  function parseTextPDF(file) {
    if (!G.UXIngest || !G.UXIngest.extractTextFromFile) return Promise.reject(new Error('Modulul de extragere text (UXIngest) nu e încărcat.'));
    return G.UXIngest.extractTextFromFile(file).then(function (text) {
      return { niveluri: [], candidati: extrageCandidati(text, 'PDF (text)', 'medie'), text_lungime: text.length };
    });
  }

  // ── 4. Imagine / PDF scanat — OCR real (Tesseract.js, încărcat la cerere — e greu, nu implicit) ──
  var TESS_CDN = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';
  function _asteaptaScript(check, src, timeoutMs) {
    return new Promise(function (resolve, reject) {
      if (check()) return resolve(true);
      if (!document.querySelector('script[data-ux-lazy="' + src + '"]')) {
        var s = document.createElement('script'); s.src = src; s.setAttribute('data-ux-lazy', src);
        s.onerror = function () { reject(new Error('Nu s-a putut încărca ' + src + ' (verifică conexiunea la internet).')); };
        document.head.appendChild(s);
      }
      var trecut = 0, iv = setInterval(function () {
        trecut += 200;
        if (check()) { clearInterval(iv); resolve(true); }
        else if (trecut >= (timeoutMs || 25000)) { clearInterval(iv); reject(new Error('Timeout la încărcarea ' + src)); }
      }, 200);
    });
  }
  function _ocrImagine(fileOrCanvas, onProgress) {
    return _asteaptaScript(function () { return !!G.Tesseract; }, TESS_CDN, 25000).then(function () {
      return G.Tesseract.recognize(fileOrCanvas, 'ron+eng', {
        logger: function (m) { if (onProgress && m.status === 'recognizing text') onProgress(Math.round((m.progress || 0) * 100)); }
      });
    }).then(function (res) { return res.data.text; });
  }
  function parseImagineOCR(file, onProgress) {
    if (/\.pdf$/i.test(file.name || '')) {
      // PDF scanat: randăm prima pagină pe un canvas via pdf.js, apoi OCR pe canvas
      if (!G.pdfjsLib) return Promise.reject(new Error('pdf.js nu e încărcat.'));
      return file.arrayBuffer().then(function (buf) { return G.pdfjsLib.getDocument({ data: buf }).promise; })
        .then(function (doc) { return doc.getPage(1); })
        .then(function (pagina) {
          var viewport = pagina.getViewport({ scale: 2.0 });
          var canvas = document.createElement('canvas'); canvas.width = viewport.width; canvas.height = viewport.height;
          var ctx = canvas.getContext('2d');
          return pagina.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () { return canvas; });
        })
        .then(function (canvas) { return _ocrImagine(canvas, onProgress); })
        .then(function (text) { return { niveluri: [], candidati: extrageCandidati(text, 'PDF scanat (OCR)', 'scazuta'), text_lungime: text.length }; });
    }
    return _ocrImagine(file, onProgress).then(function (text) {
      return { niveluri: [], candidati: extrageCandidati(text, 'Imagine (OCR)', 'scazuta'), text_lungime: text.length };
    });
  }

  // ── Dispecer după extensie ────────────────────────────────────────────────
  function parseFisier(file, onProgress) {
    var ext = (file.name || '').split('.').pop().toLowerCase();
    if (ext === 'csv') return file.text().then(parseCSVRelevee);
    if (ext === 'dxf') return file.text().then(parseDXFRelevee);
    if (ext === 'dwg') return Promise.reject(new Error('Formatul DWG e binar/proprietar Autodesk — nu poate fi citit direct în browser. Convertește la DXF (ex. ODA File Converter, gratuit) și încarcă fișierul .dxf — se citește real, cu poligoane și arii exacte.'));
    if (ext === 'pdf') {
      return parseTextPDF(file).then(function (r) {
        if (r.text_lungime > 30) return r;         // are text real încorporat
        return parseImagineOCR(file, onProgress);   // text gol/aproape gol → probabil scanat, trece pe OCR
      }).catch(function () { return parseImagineOCR(file, onProgress); });
    }
    if (/\.(jpg|jpeg|png|webp|tif|tiff)$/i.test(file.name || '')) return parseImagineOCR(file, onProgress);
    return Promise.reject(new Error('Format neacceptat: .' + ext + ' (acceptate: csv, dxf, pdf, jpg/png/webp — DWG se convertește întâi la DXF).'));
  }

  G.UXDevizeRelevee = {
    parseCSVRelevee: parseCSVRelevee, parseDXFRelevee: parseDXFRelevee, parseTextPDF: parseTextPDF,
    parseImagineOCR: parseImagineOCR, parseFisier: parseFisier, extrageCandidati: extrageCandidati
  };
  console.log('[UXDevizeRelevee] parsing real relevee (CSV/DXF/PDF text/OCR imagine) — window.UXDevizeRelevee');
})(window);
