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

  // ── 5. Excel (.xlsx/.xls) — SheetJS, încărcat la cerere (lazy, ca Tesseract) ──
  var XLSX_CDN = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
  function _celToText(v) { return v == null ? '' : String(v).trim(); }
  // Convertește PRIMA foaie a unui .xlsx/.xls în text CSV (';'-separat) — reutilizabil de orice importator CSV existent
  // (parseCSVRelevee mai sus, sau importCSVArticole din urbanx-devize-pro.js), fără să duplicăm logica de parsare.
  function xlsxToCSV(file) {
    return _asteaptaScript(function () { return !!G.XLSX; }, XLSX_CDN, 25000).then(function () {
      return file.arrayBuffer();
    }).then(function (buf) {
      var wb = G.XLSX.read(buf, { type: 'array' });
      var foaie = wb.Sheets[wb.SheetNames[0]];
      var randuri = G.XLSX.utils.sheet_to_json(foaie, { header: 1, raw: false, defval: '' });
      return randuri.map(function (r) { return r.map(_celToText).join(';'); }).filter(function (l) { return l.replace(/;/g, '').trim().length; }).join('\n');
    });
  }
  function parseXLSXRelevee(file) {
    return xlsxToCSV(file).then(parseCSVRelevee);
  }

  // ── 6. Antemăsurătoare pe cameră (Excel real de proiectant) ──────────────────────────
  // Tipar real observat: (a) un tabel PIVOT pe cameră — coloane Nr/Destinație/Suprafață/
  // Perimetru/Înălțime urmate de o coloană PER TIP DE ELEMENT (ZIDĂRIE GVP 30, FERESTRE EXT
  // PVC, TAVAN GIPS CARTON...) cu suprafața (mp) acelui element în camera respectivă — se
  // însumează pe coloană → o cantitate per tip de element, peste toate camerele; (b) sub-
  // tabele FLATE, per stadiu fizic (ex. "ALEI PIETONALE - BETON ARMAT"), cu antet NR CRT/
  // ACTIVITATE/UM/CANTITATE — acestea au deja UM+cantitate explicite, încredere ridicată.
  // Regex, NU listă exactă — antetele reale au sufixe de unitate ("Suprafata - mp", "Perimetru - m ")
  // care nu se potriveau niciodată exact cu o listă de cuvinte simple (bug găsit testând fișierul real).
  var RE_COLOANA_METADATA_CAMERA = /^(nr\.?\/?no\.?|destinatie|destinație|suprafata|suprafață|perimetru|inaltime|înălțime)\b/i;
  function parseAntemasuratoareXLSX(file) {
    return _asteaptaScript(function () { return !!G.XLSX; }, XLSX_CDN, 25000).then(function () {
      return file.arrayBuffer();
    }).then(function (buf) {
      var wb = G.XLSX.read(buf, { type: 'array' });
      var foaie = wb.Sheets[wb.SheetNames[0]];
      var randuri = G.XLSX.utils.sheet_to_json(foaie, { header: 1, raw: true, defval: null });
      var candidati = [];

      // (a) tabel pivot pe cameră: caut rândul de antet (conține "destinatie"/"destinație")
      var idxAntetCamera = -1;
      for (var i = 0; i < randuri.length; i++) {
        var r = randuri[i];
        if (r.some(function (c) { return /destinatie|destinație/i.test(_celToText(c)); })) { idxAntetCamera = i; break; }
      }
      if (idxAntetCamera >= 0) {
        var antet = randuri[idxAntetCamera].map(_celToText);
        var suprafataColIdx = antet.findIndex(function (h) { return /suprafata|suprafață/i.test(h); });
        var coloaneElement = []; // {idx, denumire}
        antet.forEach(function (h, idx) {
          if (!h || RE_COLOANA_METADATA_CAMERA.test(h.trim())) return;
          coloaneElement.push({ idx: idx, denumire: h.trim() });
        });
        var sumeElement = {}; // denumire -> total mp
        var sumePardoseliPereteTavan = { pardoseli: {}, pereti: {}, tavane: {} };
        var COL_PARDOSELI = antet.findIndex(function (h) { return /^pardoseli/i.test(h); });
        var COL_PERETI = antet.findIndex(function (h) { return /finisaj\s*perete|finisaj\s*pereti/i.test(h); });
        var COL_TAVANE = antet.findIndex(function (h) { return /finisaj\s*tavan/i.test(h); });
        for (var ri = idxAntetCamera + 1; ri < randuri.length; ri++) {
          var row = randuri[ri];
          if (!row || !row.length || row.every(function (c) { return c == null || c === ''; })) break; // secțiune terminată
          var suprafataCamera = suprafataColIdx >= 0 ? parseFloat(row[suprafataColIdx]) || 0 : 0;
          coloaneElement.forEach(function (c) {
            var v = row[c.idx];
            if (typeof v === 'number' && v > 0) sumeElement[c.denumire] = (sumeElement[c.denumire] || 0) + v;
          });
          if (COL_PARDOSELI >= 0 && row[COL_PARDOSELI]) { var pk = _celToText(row[COL_PARDOSELI]); sumePardoseliPereteTavan.pardoseli[pk] = (sumePardoseliPereteTavan.pardoseli[pk] || 0) + suprafataCamera; }
          if (COL_TAVANE >= 0 && row[COL_TAVANE]) { var tk = _celToText(row[COL_TAVANE]); sumePardoseliPereteTavan.tavane[tk] = (sumePardoseliPereteTavan.tavane[tk] || 0) + suprafataCamera; }
        }
        Object.keys(sumeElement).forEach(function (den) {
          candidati.push({ denumire: den, cantitate: Math.round(sumeElement[den] * 1000) / 1000, um: 'mp', sursa: 'antemăsurătoare — tabel pe cameră (însumat)', incredere: 'medie', selectat: true });
        });
        Object.keys(sumePardoseliPereteTavan.pardoseli).forEach(function (den) {
          candidati.push({ denumire: 'Pardoseală: ' + den, cantitate: Math.round(sumePardoseliPereteTavan.pardoseli[den] * 1000) / 1000, um: 'mp', sursa: 'antemăsurătoare — grupat după tip pardoseală', incredere: 'medie', selectat: true });
        });
        Object.keys(sumePardoseliPereteTavan.tavane).forEach(function (den) {
          candidati.push({ denumire: 'Tavan: ' + den, cantitate: Math.round(sumePardoseliPereteTavan.tavane[den] * 1000) / 1000, um: 'mp', sursa: 'antemăsurătoare — grupat după tip tavan', incredere: 'medie', selectat: true });
        });
      }

      // (b) sub-tabele flate pe stadiu fizic: antet "NR CRT / ACTIVITATE / UM / CANTITATE"
      for (var k = 0; k < randuri.length; k++) {
        var rk = randuri[k].map(_celToText);
        var areNrCrt = rk.some(function (c) { return /^nr\s*crt/i.test(c); });
        var areActivitate = rk.some(function (c) { return /^activitate/i.test(c); });
        var areUm = rk.some(function (c) { return /^um$/i.test(c); });
        var areCant = rk.some(function (c) { return /^cantitate/i.test(c); });
        if (!(areNrCrt && areActivitate && areUm && areCant)) continue;
        var idxActivitate = rk.findIndex(function (c) { return /^activitate/i.test(c); });
        var idxUm = rk.findIndex(function (c) { return /^um$/i.test(c); });
        var idxCant = rk.findIndex(function (c) { return /^cantitate/i.test(c); });
        // titlul secțiunii (stadiul fizic) e de obicei 1-2 rânduri mai sus, coloana cu text
        var titluStadiu = '';
        for (var back = k - 1; back >= Math.max(0, k - 3); back--) {
          var textRand = randuri[back].find(function (c) { return typeof c === 'string' && c.trim().length > 3; });
          if (textRand) { titluStadiu = textRand.trim(); break; }
        }
        for (var m = k + 1; m < randuri.length; m++) {
          var rowM = randuri[m];
          if (!rowM || !rowM.length || rowM.every(function (c) { return c == null || c === ''; })) break;
          var denumireM = _celToText(rowM[idxActivitate]);
          var cantitateM = parseFloat(rowM[idxCant]);
          if (!denumireM || !cantitateM) continue;
          candidati.push({ denumire: (titluStadiu ? titluStadiu + ' — ' : '') + denumireM, cantitate: cantitateM, um: _celToText(rowM[idxUm]).toLowerCase() || 'buc', sursa: 'antemăsurătoare — tabel activități' + (titluStadiu ? ' (' + titluStadiu + ')' : ''), incredere: 'ridicata', selectat: true });
        }
      }

      return { niveluri: [], candidati: candidati, poligoane_gasite: null };
    });
  }

  // ── Dispecer după extensie ────────────────────────────────────────────────
  function parseFisier(file, onProgress) {
    var ext = (file.name || '').split('.').pop().toLowerCase();
    if (ext === 'csv') return file.text().then(parseCSVRelevee);
    if (ext === 'xlsx' || ext === 'xls') return parseXLSXRelevee(file);
    if (ext === 'dxf') return file.text().then(parseDXFRelevee);
    if (ext === 'dwg') return Promise.reject(new Error('Formatul DWG e binar/proprietar Autodesk — nu poate fi citit direct în browser. Convertește la DXF (ex. ODA File Converter, gratuit) și încarcă fișierul .dxf — se citește real, cu poligoane și arii exacte.'));
    if (ext === 'pdf') {
      return parseTextPDF(file).then(function (r) {
        if (r.text_lungime > 30) return r;         // are text real încorporat
        return parseImagineOCR(file, onProgress);   // text gol/aproape gol → probabil scanat, trece pe OCR
      }).catch(function () { return parseImagineOCR(file, onProgress); });
    }
    if (/\.(jpg|jpeg|png|webp|tif|tiff)$/i.test(file.name || '')) return parseImagineOCR(file, onProgress);
    return Promise.reject(new Error('Format neacceptat: .' + ext + ' (acceptate: csv, xlsx/xls, dxf, pdf, jpg/png/webp — DWG se convertește întâi la DXF).'));
  }

  G.UXDevizeRelevee = {
    parseCSVRelevee: parseCSVRelevee, parseDXFRelevee: parseDXFRelevee, parseTextPDF: parseTextPDF,
    parseImagineOCR: parseImagineOCR, parseFisier: parseFisier, extrageCandidati: extrageCandidati,
    xlsxToCSV: xlsxToCSV, parseXLSXRelevee: parseXLSXRelevee, parseAntemasuratoareXLSX: parseAntemasuratoareXLSX
  };
  console.log('[UXDevizeRelevee] parsing real relevee (CSV/XLSX/DXF/PDF text/OCR imagine) — window.UXDevizeRelevee');
})(window);
