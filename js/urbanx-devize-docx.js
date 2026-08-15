/* ============================================================================
 * UrbanX — DEVIZE & COST MANAGEMENT — export Word REAL (.docx, OOXML)
 * Tipar EXACT reprodus după exemple reale de piață (F3 — Listă cu cantități
 * de lucrări, format devize.ro/ISDP): antet Obiectiv/Obiectul/Stadiul fizic/
 * Beneficiar/Proiectant, rând articol cu Material/Manoperă/Transport/Utilaj
 * ca 4 coloane pe același rând, subsol Cheltuieli directe → Alte cheltuieli
 * directe → CAM (2.25% legal) → Cheltuieli indirecte → Profit → TOTAL GENERAL.
 * Fișiere .docx GENUINE (OOXML) cu biblioteca `docx` (docx.js), încărcată lazy
 * de la CDN — același pattern ca Tesseract.js (OCR) și SheetJS (Excel).
 * Culori UrbanX: albastru brand #16AECB (logo/titlu platformă) + auriu accent
 * #D4AF37 (disclaimer/logo) — NU culori inventate.
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

  // ── Paleta UrbanX (aceeași folosită în platformă — logo/titlu, NU inventată) ──
  var UX = { BLUE: '16AECB', BLUE_TINT: 'E3F5F9', GOLD: 'D4AF37', GOLD_TINT: 'FBF3DD', DARK: '0E162A', GRI: '5A6476' };

  function lei(n) { return Math.round(n || 0).toLocaleString('ro-RO'); }
  // consum_unitar/ore — valori adesea sub 1 (ex. 0,02 ore macara/mp); lei() rotunjește la
  // întreg și le arată eronat ca „0" — aici păstrăm până la 3 zecimale reale.
  function zec(n) { return (Math.round((n || 0) * 1000) / 1000).toLocaleString('ro-RO', { maximumFractionDigits: 3 }); }

  function _brandHeader(docx, titluDoc) {
    return [
      new docx.Paragraph({ children: [new docx.TextRun({ text: 'UrbanX', bold: true, size: 24, color: UX.BLUE }), new docx.TextRun({ text: '  Devize & Cost Management', bold: true, size: 18, color: UX.DARK })], spacing: { after: 40 } }),
      new docx.Paragraph({ border: { bottom: { color: UX.GOLD, space: 4, style: docx.BorderStyle.SINGLE, size: 6 } }, children: [new docx.TextRun({ text: '' })], spacing: { after: 160 } }),
      new docx.Paragraph({ text: titluDoc, heading: docx.HeadingLevel.HEADING_1, alignment: docx.AlignmentType.CENTER })
    ];
  }
  function _antet(docx, proiect, obiect) {
    function r(label, val) { return new docx.Paragraph({ children: [new docx.TextRun({ text: label + ': ', bold: true, size: 18 }), new docx.TextRun({ text: val || '—', size: 18 })], spacing: { after: 40 } }); }
    var lines = [r('OBIECTIV', proiect.nume)];
    if (obiect) {
      lines.push(r('OBIECTUL', (obiect.cod ? obiect.cod + ' ' : '') + obiect.denumire));
      lines.push(r('STADIUL FIZIC', obiect.stadiu_fizic || obiect.denumire));
    }
    lines.push(r('Beneficiar', proiect.beneficiar));
    lines.push(r('Proiectant', proiect.proiectant));
    return lines;
  }
  function _cell(docx, text, opts) {
    opts = opts || {};
    return new docx.TableCell({
      width: opts.width ? { size: opts.width, type: docx.WidthType.PERCENTAGE } : undefined,
      shading: opts.shade ? { fill: opts.shade } : undefined,
      verticalAlign: docx.VerticalAlign.CENTER,
      children: [new docx.Paragraph({ alignment: opts.right ? docx.AlignmentType.RIGHT : (opts.center ? docx.AlignmentType.CENTER : docx.AlignmentType.LEFT), children: [new docx.TextRun({ text: String(text == null ? '' : text), bold: !!opts.bold, color: opts.color })] })]
    });
  }
  var BORD = { style: 'single', size: 2, color: 'B9C2CE' };
  function _borders(docx) { return { top: BORD, bottom: BORD, left: BORD, right: BORD, insideHorizontal: BORD, insideVertical: BORD }; }
  function _tabel(docx, head, rows, widths) {
    var headRow = new docx.TableRow({ children: head.map(function (h, i) { return _cell(docx, h, { bold: true, shade: UX.BLUE_TINT, color: UX.DARK, width: widths ? widths[i] : undefined, center: true }); }), tableHeader: true });
    var dataRows = rows.map(function (r) {
      return new docx.TableRow({ children: r.map(function (c, i) { return _cell(docx, c && c.v != null ? c.v : c, { bold: c && c.bold, right: c && c.right, shade: c && c.shade, width: widths ? widths[i] : undefined }); }) });
    });
    return new docx.Table({ width: { size: 100, type: docx.WidthType.PERCENTAGE }, borders: _borders(docx), rows: [headRow].concat(dataRows) });
  }
  function _semnaturaProiectant(docx) {
    return [new docx.Paragraph({ spacing: { before: 400 }, children: [new docx.TextRun({ text: 'Proiectant,', bold: true })] }),
    new docx.Paragraph({ spacing: { before: 600 }, children: [new docx.TextRun({ text: 'Document generat automat de platforma UrbanX din date de proiect reale (măsurători/relevee/norme de deviz) — necesită verificare de proiectant/diriginte înainte de utilizare contractuală.', italics: true, size: 15, color: UX.GRI })] })];
  }
  function _doc(docx, sections) { return new docx.Document({ sections: [{ properties: {}, children: sections }] }); }
  function _numeFisier(base) { return base.replace(/[^a-zA-Z0-9_\-]+/g, '_') + '.docx'; }

  // ── F3 real: subsol Cheltuieli directe → Alte → CAM → Indirecte → Profit → TOTAL GENERAL ──
  function _subsolTabel(docx, s, pe4) {
    var rows = [
      ['Cheltuieli directe', '', lei(pe4.materiale), lei(pe4.manopera), lei(pe4.utilaj), lei(pe4.transport), { v: lei(s.cheltuieliDirecte), bold: true, right: true }],
      ['Alte cheltuieli directe', s.altePct + '%', '', '', '', '', { v: lei(s.alteCheltuieliDirecte), right: true }],
      ['Contribuție asiguratorie pentru muncă (CAM)', s.camPct + '% — legal, pe manoperă', '', '', '', '', { v: lei(s.cam), right: true }],
      ['Cheltuieli indirecte', s.indPct + '% — orientativ, editabil', '', '', '', '', { v: lei(s.cheltuieliIndirecte), right: true }],
      ['Profit', s.profPct + '% — orientativ, editabil', '', '', '', '', { v: lei(s.profit), right: true }],
      [{ v: 'TOTAL GENERAL (fără TVA)', bold: true, shade: UX.GOLD_TINT }, { v: '', shade: UX.GOLD_TINT }, { v: '', shade: UX.GOLD_TINT }, { v: '', shade: UX.GOLD_TINT }, { v: '', shade: UX.GOLD_TINT }, { v: '', shade: UX.GOLD_TINT }, { v: lei(s.totalGeneralFaraTva), bold: true, right: true, shade: UX.GOLD_TINT }],
      ['TVA', Math.round(s.cotaTva * 100) + '%', '', '', '', '', { v: lei(s.tva), right: true }],
      [{ v: 'TOTAL GENERAL', bold: true, shade: UX.GOLD_TINT }, { v: '', shade: UX.GOLD_TINT }, { v: '', shade: UX.GOLD_TINT }, { v: '', shade: UX.GOLD_TINT }, { v: '', shade: UX.GOLD_TINT }, { v: '', shade: UX.GOLD_TINT }, { v: lei(s.totalGeneral) + ' lei', bold: true, right: true, shade: UX.GOLD_TINT }]
    ];
    return _tabel(docx, ['', 'procent', 'material', 'manoperă', 'utilaj', 'transport', 'total'], rows, [30, 18, 12, 12, 12, 10, 16]);
  }

  function _paginaF3(docx, proiect, obiect, devizObiect) {
    var rows = []; var nrCap = 0;
    devizObiect.categorii.forEach(function (cat) {
      nrCap++;
      rows.push([{ v: String(nrCap), bold: true, shade: 'F0F0F0' }, { v: cat.categorie.denumire.toUpperCase(), bold: true, shade: 'F0F0F0' }, '', '', '', '', '', '', '', '']);
      cat.articole.forEach(function (c, i) {
        var pretUnitar = c.total / (c.articol.cantitate || 1);
        rows.push([nrCap + '.' + (i + 1), (c.articol.cod ? c.articol.cod + ' — ' : '') + c.articol.denumire, c.articol.um, zec(c.articol.cantitate),
        { v: lei(pretUnitar), right: true }, { v: lei(c.materiale), right: true }, { v: lei(c.manopera), right: true }, { v: lei(c.transport), right: true }, { v: lei(c.utilaj), right: true }, { v: lei(c.total), right: true, bold: true }]);
      });
    });
    var tabelPrincipal = _tabel(docx, ['Nr', 'Capitolul de lucrări', 'UM', 'Cant.', 'Preț unitar', 'Material', 'Manoperă', 'Transport', 'Utilaj', 'TOTAL'], rows, [5, 27, 7, 8, 11, 10, 10, 8, 8, 13]);
    return _brandHeader(docx, 'F3 — Listă cu cantități de lucrări pe categorii de lucrări').concat(
      _antet(docx, proiect, obiect),
      [new docx.Paragraph({ spacing: { before: 200, after: 100 }, children: [new docx.TextRun({ text: '- lei -', italics: true })] }), tabelPrincipal,
      new docx.Paragraph({ spacing: { before: 200 } }), _subsolTabel(docx, devizObiect.subsol, devizObiect.pe4)],
      _semnaturaProiectant(docx)
    );
  }

  function _paginaF1(docx, proiect, perechi) {
    var rows = perechi.map(function (p, i) { return [String(i + 1), (p.obiect.cod ? p.obiect.cod + ' ' : '') + p.obiect.denumire, { v: lei(p.devizObiect.total) + ' lei', right: true }]; });
    var total = perechi.reduce(function (s, p) { return s + p.devizObiect.total; }, 0);
    rows.push([{ v: '', shade: UX.GOLD_TINT }, { v: 'TOTAL', bold: true, shade: UX.GOLD_TINT }, { v: lei(total) + ' lei', bold: true, right: true, shade: UX.GOLD_TINT }]);
    return _brandHeader(docx, 'F1 — Centralizatorul cheltuielilor pe obiectiv').concat(
      _antet(docx, proiect, null),
      [new docx.Paragraph({ spacing: { before: 200 } }), _tabel(docx, ['Nr.', 'Obiect / Stadiu fizic', 'Valoare (fără TVA)'], rows, [10, 60, 30])],
      _semnaturaProiectant(docx)
    );
  }

  function _paginaF2(docx, proiect, obiect, devizObiect) {
    var rows = devizObiect.categorii.map(function (c, i) { return [String(i + 1), c.categorie.denumire, { v: lei(c.subtotal) + ' lei', right: true }]; });
    return _brandHeader(docx, 'F2 — Centralizator pe categorii de lucrări').concat(
      _antet(docx, proiect, obiect),
      [new docx.Paragraph({ spacing: { before: 200 } }), _tabel(docx, ['Nr.', 'Categorie', 'Valoare (fără TVA)'], rows, [10, 60, 30])],
      _semnaturaProiectant(docx)
    );
  }

  // ── Necesar manoperă și utilaje — "ore normate, utilaje, muncitori, numărul lor, ore, preț/oră" ──
  // ÎNLOCUIEȘTE F4 (care arăta doar utilaje, cu ID-uri brute de resursă) — arată explicit AMBELE
  // tipuri de resursă (manoperă + utilaj) cu nume real, ore totale, preț/oră curent, valoare, și
  // — dacă obiectul are o durată de execuție setată — echivalentul de forță de muncă (FTE).
  function _paginaNecesarResurse(docx, proiect, obiect, devizObiect, resurseMap) {
    var agregat = {};
    devizObiect.categorii.forEach(function (cat) {
      cat.articole.forEach(function (c) {
        (c.detaliu || []).forEach(function (d) {
          if (d.tip !== 'manopera' && d.tip !== 'utilaj') return;
          var key = d.tip + '|' + d.resursa_id;
          if (!agregat[key]) agregat[key] = { tip: d.tip, denumire: (resurseMap[d.resursa_id] || {}).denumire || d.resursa_id, um: (resurseMap[d.resursa_id] || {}).um || 'ore', oreTotale: 0, valoare: 0, pretOra: d.pret_unitar };
          agregat[key].oreTotale += (+d.consum_unitar || 0) * (+c.articol.cantitate || 0);
          agregat[key].valoare += d.valoare;
        });
      });
    });
    var durata = +obiect.durata_zile_lucratoare || 0;
    var manopera = [], utilaj = [];
    Object.keys(agregat).forEach(function (k) { (agregat[k].tip === 'manopera' ? manopera : utilaj).push(agregat[k]); });
    function randuri(lista) {
      return lista.map(function (u, i) {
        var fte = durata > 0 ? u.oreTotale / (durata * 8) : null;
        return [String(i + 1), u.denumire, zec(u.oreTotale) + ' ore', lei(u.pretOra) + ' lei/oră', fte != null ? zec(fte) + ' pers./echip.' : '—', { v: lei(u.valoare) + ' lei', right: true }];
      });
    }
    var sectiuni = [];
    sectiuni.push(new docx.Paragraph({ heading: docx.HeadingLevel.HEADING_2, text: '👷 Manoperă — muncitori necesari' }));
    sectiuni.push(manopera.length ? _tabel(docx, ['Nr.', 'Meserie / muncitor', 'Ore totale', 'Preț/oră', durata > 0 ? 'Echivalent normă întreagă' : 'Echiv. normă (setați durata)', 'Valoare'], randuri(manopera), [6, 30, 16, 14, 20, 14])
      : new docx.Paragraph('Niciun articol pe normă cu resursă de manoperă în acest obiect (articolele curente au preț liber).'));
    sectiuni.push(new docx.Paragraph({ heading: docx.HeadingLevel.HEADING_2, spacing: { before: 300 }, text: '🚜 Utilaje — echipamente necesare' }));
    sectiuni.push(utilaj.length ? _tabel(docx, ['Nr.', 'Utilaj / echipament', 'Ore totale', 'Preț/oră', 'Nr. utilaje (dacă se rulează în paralel pe durată)', 'Valoare'], randuri(utilaj), [6, 30, 16, 14, 20, 14])
      : new docx.Paragraph('Niciun articol pe normă cu resursă de utilaj în acest obiect.'));
    if (!durata) sectiuni.push(new docx.Paragraph({ spacing: { before: 150 }, children: [new docx.TextRun({ text: 'Notă: setați „Durata execuției (zile lucrătoare)" pe obiect ca să vedeți echivalentul de personal/utilaje (normă întreagă) — fără durată, se arată doar orele totale.', italics: true, size: 15, color: UX.GRI })] }));
    return _brandHeader(docx, 'Necesar manoperă și utilaje').concat(_antet(docx, proiect, obiect), [new docx.Paragraph({ spacing: { before: 200 } })], sectiuni, _semnaturaProiectant(docx));
  }

  function _paginaDevizGeneral(docx, proiect, devizGen) {
    var val = devizGen.deviz_general.v, tva = devizGen.deviz_general.tva;
    var rows = G.UXDevize.STRUCT.map(function (rw) {
      var cod = rw[0], den = rw[1], key = rw[2], lvl = rw[3];
      var fara = key != null ? val[key] : null;
      var t = fara != null ? Math.round(fara * tva) : null;
      var cu = fara != null ? fara + t : null;
      var opt = { bold: lvl >= 2, shade: lvl === 0 ? UX.BLUE_TINT : lvl === 3 ? UX.GOLD_TINT : lvl === 2 ? 'F0F0F0' : undefined };
      return [cod, den, fara != null ? Object.assign({ v: lei(fara), right: true }, opt) : '', t != null ? Object.assign({ v: lei(t), right: true }, opt) : '', cu != null ? Object.assign({ v: lei(cu), right: true }, opt) : ''];
    });
    var totalCu = val.total + Math.round(val.total * tva);
    return _brandHeader(docx, 'DEVIZ GENERAL al obiectivului de investiție').concat(
      _antet(docx, proiect, null),
      [new docx.Paragraph({ spacing: { before: 100, after: 150 }, children: [new docx.TextRun({ text: 'conform HG 907/2016, Anexa nr. 7 · sursă cap.4.1: ' + (devizGen.sursa_c41 === 'articole_reale' ? 'articole reale din deviz' : 'estimare top-down'), italics: true, size: 16 })] }),
      _tabel(docx, ['Nr. crt.', 'Denumirea capitolelor și subcapitolelor', 'Fără TVA', 'TVA', 'Cu TVA'], rows, [8, 50, 14, 12, 16]),
      new docx.Paragraph({ spacing: { before: 200 }, children: [new docx.TextRun({ text: 'TOTAL GENERAL cu TVA: ' + lei(totalCu) + ' lei (≈ ' + lei(Math.round(totalCu / devizGen.deviz_general.curs)) + ' euro)', bold: true, color: UX.BLUE })] })],
      _semnaturaProiectant(docx)
    );
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
          files.push({ name: _numeFisier('F1_Centralizator_obiectiv'), doc: _doc(docx, _paginaF1(docx, proiect, perechi)) });
          perechi.forEach(function (p) {
            var suf = '_' + (p.obiect.cod || p.obiect.denumire);
            files.push({ name: _numeFisier('F3' + suf), doc: _doc(docx, _paginaF3(docx, proiect, p.obiect, p.devizObiect)) });
            files.push({ name: _numeFisier('F2' + suf), doc: _doc(docx, _paginaF2(docx, proiect, p.obiect, p.devizObiect)) });
            files.push({ name: _numeFisier('NecesarResurse' + suf), doc: _doc(docx, _paginaNecesarResurse(docx, proiect, p.obiect, p.devizObiect, resurseMap)) });
          });
          if (devizGen.deviz_general && G.UXDevize && G.UXDevize.STRUCT) {
            files.push({ name: _numeFisier('Deviz_general_HG907'), doc: _doc(docx, _paginaDevizGeneral(docx, proiect, devizGen)) });
          }
          return files;
        });
      });
    });
  }

  function exportProiectDocxReal(proiectId) {
    return generateDocumenteF1F5Docx(proiectId).then(function (files) {
      var docx = G.docx;
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
  console.log('[UXDevizeDocx] export Word real (.docx, OOXML, tipar F3 devize.ro) — window.UXDevizeDocx');
})(window);
