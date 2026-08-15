/* ============================================================================
 * UrbanX — DEVIZE & COST MANAGEMENT — export Word REAL (.docx, OOXML)
 * Înlocuiește trucul vechi "HTML salvat cu extensie .doc" (application/msword) —
 * Word modern îl deschide cu avertisment "formatul fișierului nu se potrivește
 * cu extensia" și nu respectă stiluri reale. Aici generăm fișiere .docx GENUINE
 * cu biblioteca `docx` (docx.js, dolanmiu/docx), încărcată lazy de la CDN —
 * exact pattern-ul deja folosit pt Tesseract.js (OCR) și SheetJS (Excel).
 * Reutilizează motorul existent (window.UXDevizePro / window.UXDevize) — nu
 * recalculează nimic, doar randează aceleași date ca table-uri Word reale.
 * ========================================================================== */
(function (G) {
  'use strict';
  var DOCX_CDN = 'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.min.js';
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
  function _asteaptaDocx() { return _asteaptaScript(function () { return !!(G.docx && G.docx.Document); }, DOCX_CDN, 25000); }

  function lei(n) { return Math.round(n || 0).toLocaleString('ro-RO'); }
  // pt consum_unitar (ore/UM, kg/UM etc.) — valori adesea sub 1 (ex. 0,02 ore macara/mp);
  // lei() rotunjește la întreg și le arată eronat ca „0” — aici păstrăm până la 3 zecimale reale.
  function zec(n) { return (Math.round((n || 0) * 1000) / 1000).toLocaleString('ro-RO', { maximumFractionDigits: 3 }); }

  // ── helpere de construcție Word real (Paragraph/Table), pattern comun brand ──
  function _brandHeader(docx) {
    return [
      new docx.Paragraph({ children: [new docx.TextRun({ text: 'UrbanX — Devize & Cost Management', bold: true, size: 16, color: '0d9488' })] }),
      new docx.Paragraph({ children: [new docx.TextRun({ text: 'Document generat automat din date de proiect reale (măsurători/relevee/normе de deviz) — necesită verificare de proiectant/diriginte înainte de utilizare contractuală.', italics: true, size: 14, color: '888888' })], spacing: { after: 200 } })
    ];
  }
  function _titlu(docx, text, sub) {
    var out = [new docx.Paragraph({ text: text, heading: docx.HeadingLevel.HEADING_1, alignment: docx.AlignmentType.CENTER })];
    if (sub) out.push(new docx.Paragraph({ text: sub, alignment: docx.AlignmentType.CENTER, spacing: { after: 200 } }));
    return out;
  }
  function _cell(docx, text, opts) {
    opts = opts || {};
    return new docx.TableCell({
      width: opts.width ? { size: opts.width, type: docx.WidthType.PERCENTAGE } : undefined,
      shading: opts.shade ? { fill: opts.shade } : undefined,
      children: [new docx.Paragraph({ alignment: opts.right ? docx.AlignmentType.RIGHT : docx.AlignmentType.LEFT, children: [new docx.TextRun({ text: String(text == null ? '' : text), bold: !!opts.bold })] })]
    });
  }
  function _tabel(docx, head, rows, widths) {
    var borders = { top: { style: docx.BorderStyle.SINGLE, size: 2, color: 'AAAAAA' }, bottom: { style: docx.BorderStyle.SINGLE, size: 2, color: 'AAAAAA' }, left: { style: docx.BorderStyle.SINGLE, size: 2, color: 'AAAAAA' }, right: { style: docx.BorderStyle.SINGLE, size: 2, color: 'AAAAAA' }, insideHorizontal: { style: docx.BorderStyle.SINGLE, size: 2, color: 'DDDDDD' }, insideVertical: { style: docx.BorderStyle.SINGLE, size: 2, color: 'DDDDDD' } };
    var headRow = new docx.TableRow({ children: head.map(function (h, i) { return _cell(docx, h, { bold: true, shade: 'DCE6F1', width: widths ? widths[i] : undefined }); }), tableHeader: true });
    var dataRows = rows.map(function (r) {
      return new docx.TableRow({ children: r.map(function (c, i) { return _cell(docx, c.v != null ? c.v : c, { bold: c && c.bold, right: c && c.right, shade: c && c.shade, width: widths ? widths[i] : undefined }); }) });
    });
    return new docx.Table({ width: { size: 100, type: docx.WidthType.PERCENTAGE }, borders: borders, rows: [headRow].concat(dataRows) });
  }
  function _doc(docx, sections) {
    return new docx.Document({ sections: [{ properties: {}, children: sections }] });
  }
  function _numeFisier(base) { return base.replace(/[^a-zA-Z0-9_\-]+/g, '_') + '.docx'; }

  // ── date reale pt breakdown manoperă/utilaj/materiale/transport pe articol (din normă) ──
  function _liniiResurseArticol(costArticolRezultat, resurseMap) {
    var d = costArticolRezultat.detaliu || [];
    if (!d.length) return null;
    return d.map(function (x) {
      var r = resurseMap[x.resursa_id] || {};
      var cantTotala = (+x.consum_unitar || 0) * (+costArticolRezultat.articol.cantitate || 0);
      return { tip: x.tip, denumire: r.denumire || x.resursa_id, um: r.um || '', consum_unitar: x.consum_unitar, cantitate_totala: cantTotala, valoare: x.valoare };
    });
  }

  function generateDocumenteF1F5Docx(proiectId) {
    var DP = G.UXDevizePro;
    if (!DP) return Promise.reject(new Error('UXDevizePro nu e încărcat.'));
    return _asteaptaDocx().then(function () {
      var docx = G.docx;
      return Promise.all([DP.getProiect(proiectId), DP.listObiecte(proiectId), DP.listResurse(), DP.computeDevizGeneral(proiectId)]).then(function (r) {
        var proiect = r[0], obiecte = r[1], resurse = r[2], devizGen = r[3];
        var resurseMap = {}; resurse.forEach(function (x) { resurseMap[x.id] = x; });
        return Promise.all(obiecte.map(function (o) { return DP.computeDevizObiect(o.id).then(function (d) { return { obiect: o, devizObiect: d }; }); })).then(function (perechi) {
          var files = [];

          // ── F1 — Centralizator cheltuieli pe obiectiv ──
          var f1Rows = perechi.map(function (p, i) { return [String(i + 1), p.obiect.denumire, { v: lei(p.devizObiect.total) + ' lei', right: true }]; });
          var totalGen = perechi.reduce(function (s, p) { return s + p.devizObiect.total; }, 0);
          f1Rows.push(['', { v: 'TOTAL', bold: true }, { v: lei(totalGen) + ' lei', bold: true, right: true }]);
          files.push({ name: _numeFisier('F1_Centralizator_obiectiv'), doc: _doc(docx, _brandHeader(docx).concat(
            _titlu(docx, 'FORMULARUL F1', 'Centralizatorul cheltuielilor pe obiectiv · ' + proiect.nume),
            [_tabel(docx, ['Nr.', 'Obiect', 'Valoare'], f1Rows, [10, 60, 30])]
          )) });

          perechi.forEach(function (p) {
            var suf = '_' + (p.obiect.cod || p.obiect.denumire);
            // DevizObiect (Anexa 8 HG907)
            var doRows = [];
            p.devizObiect.categorii.forEach(function (cat) {
              doRows.push(['', { v: cat.categorie.denumire, bold: true, shade: 'F2F2F2' }, '', { v: '', shade: 'F2F2F2' }]);
              cat.articole.forEach(function (c) { doRows.push([c.articol.cod || '', c.articol.denumire, c.articol.cantitate + ' ' + c.articol.um, { v: lei(c.total) + ' lei', right: true }]); });
              doRows.push(['', { v: 'Subtotal ' + cat.categorie.denumire, bold: true }, '', { v: lei(cat.subtotal) + ' lei', bold: true, right: true }]);
            });
            files.push({ name: _numeFisier('DevizObiect' + suf), doc: _doc(docx, _brandHeader(docx).concat(
              _titlu(docx, 'DEVIZ PE OBIECT', p.obiect.denumire + ' · conform HG 907/2016, Anexa nr. 8'),
              [_tabel(docx, ['Cod', 'Denumire', 'Cantitate', 'Valoare'], doRows, [10, 50, 20, 20]),
               new docx.Paragraph({ spacing: { before: 200 }, children: [new docx.TextRun({ text: 'TOTAL OBIECT: ' + lei(p.devizObiect.total) + ' lei (fără TVA)', bold: true })] })]
            )) });

            // F2 — pe categorii
            var f2Rows = p.devizObiect.categorii.map(function (c, i) { return [String(i + 1), c.categorie.denumire, { v: lei(c.subtotal) + ' lei', right: true }]; });
            files.push({ name: _numeFisier('F2' + suf), doc: _doc(docx, _brandHeader(docx).concat(
              _titlu(docx, 'FORMULARUL F2', 'Centralizator pe categorii de lucrări · ' + p.obiect.denumire),
              [_tabel(docx, ['Nr.', 'Categorie', 'Valoare'], f2Rows, [10, 60, 30])]
            )) });

            // F3 — lista cu cantități DE LUCRĂRI + breakdown real manoperă/utilaj/materiale/transport per articol normat
            var f3Rows = [];
            var detaliiNormate = [];
            p.devizObiect.categorii.forEach(function (cat) {
              cat.articole.forEach(function (c) {
                var pretUnitar = c.total / (c.articol.cantitate || 1);
                f3Rows.push([c.articol.cod || '', c.articol.denumire, c.articol.um, String(c.articol.cantitate), lei(pretUnitar), { v: lei(c.total) + ' lei', right: true }]);
                var linii = _liniiResurseArticol(c, resurseMap);
                if (linii) detaliiNormate.push({ articol: c.articol, linii: linii });
              });
            });
            var f3Sectiuni = [_tabel(docx, ['Cod', 'Denumire', 'UM', 'Cantitate', 'Preț unitar', 'Valoare'], f3Rows, [8, 32, 10, 12, 14, 24])];
            if (detaliiNormate.length) {
              f3Sectiuni.push(new docx.Paragraph({ heading: docx.HeadingLevel.HEADING_2, spacing: { before: 300 }, text: 'Detaliere pe resurse (manoperă/utilaj/materiale/transport) — articole pe normă' }));
              detaliiNormate.forEach(function (dn) {
                f3Sectiuni.push(new docx.Paragraph({ spacing: { before: 150 }, children: [new docx.TextRun({ text: dn.articol.denumire + ' (' + dn.articol.cantitate + ' ' + dn.articol.um + ')', bold: true })] }));
                var rows = dn.linii.map(function (l) { return [l.tip, l.denumire, zec(l.consum_unitar) + ' ' + l.um + '/UM', zec(l.cantitate_totala) + ' ' + l.um, { v: lei(l.valoare) + ' lei', right: true }]; });
                f3Sectiuni.push(_tabel(docx, ['Tip resursă', 'Denumire', 'Consum unitar', 'Cantitate totală', 'Valoare'], rows, [14, 36, 18, 16, 16]));
              });
            }
            files.push({ name: _numeFisier('F3' + suf), doc: _doc(docx, _brandHeader(docx).concat(
              _titlu(docx, 'FORMULARUL F3', 'Lista cu cantități de lucrări · ' + p.obiect.denumire),
              f3Sectiuni
            )) });

            // F4 — utilaje/echipamente (nume reale, ore totale, valoare)
            var util = {};
            p.devizObiect.categorii.forEach(function (cat) {
              cat.articole.forEach(function (c) {
                (c.detaliu || []).filter(function (d) { return d.tip === 'utilaj'; }).forEach(function (d) {
                  var key = d.resursa_id;
                  if (!util[key]) util[key] = { denumire: (resurseMap[key] || {}).denumire || key, um: (resurseMap[key] || {}).um || 'ore', ore: 0, valoare: 0 };
                  util[key].ore += (+d.consum_unitar || 0) * (+c.articol.cantitate || 0);
                  util[key].valoare += d.valoare;
                });
              });
            });
            var f4Rows = Object.keys(util).map(function (k, i) { var u = util[k]; return [String(i + 1), u.denumire, zec(u.ore) + ' ' + u.um, { v: lei(u.valoare) + ' lei', right: true }]; });
            files.push({ name: _numeFisier('F4' + suf), doc: _doc(docx, _brandHeader(docx).concat(
              _titlu(docx, 'FORMULARUL F4', 'Utilaje, echipamente tehnologice · ' + p.obiect.denumire),
              f4Rows.length ? [_tabel(docx, ['Nr.', 'Utilaj/echipament', 'Ore totale', 'Valoare'], f4Rows, [8, 44, 24, 24])] : [new docx.Paragraph('Nicio resursă de tip utilaj identificată în articolele acestui obiect (articolele curente au preț liber, nu sunt pe normă).')]
            )) });

            // F5 — fișe tehnice utilaje (placeholder structurat, ca înainte)
            files.push({ name: _numeFisier('F5' + suf), doc: _doc(docx, _brandHeader(docx).concat(
              _titlu(docx, 'FORMULARUL F5', 'Fișe tehnice utilaje/echipamente · ' + p.obiect.denumire),
              [new docx.Paragraph('Fișa tehnică se completează per echipament (producător, model, parametri, garanție) — secțiune de editare disponibilă în modulul Devize.')]
            )) });
          });

          // ── Deviz general HG 907/2016, Anexa 7 (STRUCT complet, real) ──
          if (devizGen.deviz_general && G.UXDevize && G.UXDevize.STRUCT) {
            var val = devizGen.deviz_general.v, tva = devizGen.deviz_general.tva;
            var dgRows = G.UXDevize.STRUCT.map(function (rw) {
              var cod = rw[0], den = rw[1], key = rw[2], lvl = rw[3];
              var fara = key != null ? val[key] : null;
              var t = fara != null ? Math.round(fara * tva) : null;
              var cu = fara != null ? fara + t : null;
              var opt = { bold: lvl >= 2, shade: lvl === 0 ? 'DCE6F1' : lvl === 3 ? '1F3864' : lvl === 2 ? 'F2F2F2' : undefined };
              return [cod, den, fara != null ? Object.assign({ v: lei(fara), right: true }, opt) : '', t != null ? Object.assign({ v: lei(t), right: true }, opt) : '', cu != null ? Object.assign({ v: lei(cu), right: true }, opt) : ''];
            });
            var totalCu = val.total + Math.round(val.total * tva);
            files.push({ name: _numeFisier('Deviz_general_HG907'), doc: _doc(docx, _brandHeader(docx).concat(
              _titlu(docx, 'DEVIZ GENERAL al obiectivului de investiție', proiect.nume + ' · conform HG 907/2016, Anexa nr. 7 · sursă cap.4.1: ' + (devizGen.sursa_c41 === 'articole_reale' ? 'articole reale din deviz' : 'estimare top-down')),
              [_tabel(docx, ['Nr. crt.', 'Denumirea capitolelor și subcapitolelor', 'Fără TVA', 'TVA', 'Cu TVA'], dgRows, [8, 50, 14, 12, 16]),
               new docx.Paragraph({ spacing: { before: 200 }, children: [new docx.TextRun({ text: 'TOTAL GENERAL cu TVA: ' + lei(totalCu) + ' lei (≈ ' + lei(Math.round(totalCu / devizGen.deviz_general.curs)) + ' euro)', bold: true })] })]
            )) });
          }

          return files;
        });
      });
    });
  }

  // ── export/download: real .docx blobs, zip prin JSZip dacă e disponibil (altfel descărcare individuală) ──
  function exportProiectDocxReal(proiectId) {
    var docx = null;
    return generateDocumenteF1F5Docx(proiectId).then(function (files) {
      docx = G.docx;
      return Promise.all(files.map(function (f) { return docx.Packer.toBlob(f.doc).then(function (blob) { return { name: f.name, blob: blob }; }); }));
    }).then(function (blobs) {
      if (typeof G.JSZip === 'undefined') {
        blobs.forEach(function (b) { var a = document.createElement('a'); a.href = URL.createObjectURL(b.blob); a.download = b.name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1200); });
        return blobs.length;
      }
      var zip = new G.JSZip();
      blobs.forEach(function (b) { zip.file(b.name, b.blob); });
      return zip.generateAsync({ type: 'blob' }).then(function (zipBlob) {
        var a = document.createElement('a'); a.href = URL.createObjectURL(zipBlob); a.download = 'Devize_Word_' + proiectId.slice(0, 8) + '.zip';
        document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        return blobs.length;
      });
    });
  }

  G.UXDevizeDocx = { generateDocumenteF1F5Docx: generateDocumenteF1F5Docx, exportProiectDocxReal: exportProiectDocxReal };
  console.log('[UXDevizeDocx] export Word real (.docx, OOXML via docx.js lazy) — window.UXDevizeDocx');
})(window);
