/* ============================================================================
 * UrbanX — DEVIZE & COST MANAGEMENT — export Word REAL (.docx, OOXML)
 * Tipar EXACT reprodus după exemple reale de piață (F3 — Listă cu cantități
 * de lucrări, format devize.ro/ISDP): antet Obiectiv/Obiectul/Stadiul fizic/
 * Beneficiar/Proiectant, rând articol cu Material/Manoperă/Transport/Utilaj
 * ca 4 coloane pe același rând, subsol Cheltuieli directe → Alte cheltuieli
 * directe → CAM (2.25% legal) → Cheltuieli indirecte → Profit → TOTAL GENERAL.
 * Fișiere .docx GENUINE (OOXML) cu biblioteca `docx` (docx.js), încărcată lazy
 * de la CDN — același pattern ca Tesseract.js (OCR) și SheetJS (Excel).
 * Culori UrbanX: auriu #D4AF37 (accentul REAL folosit de motorul de documente
 * al platformei, js/tci-strategic-doc.js — verificat, NU inventat) + bleumarin
 * închis #1C263A pt text — albastrul din login-ul web-app-ului NU se folosește
 * pe documentele generate, e o suprafață diferită (UI, nu document).
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
  // Paletă UrbanX REALĂ pt documente — verificată în js/tci-strategic-doc.js (motorul _makeStratDoc,
  // folosit pt toate rapoartele generate din Teritoriu): ACCENT implicit = [212,175,55] (auriu, hex
  // D4AF37), INK = [28,38,58] (bleumarin închis text), SUB/MUT = gri-albastrui. Verificat live: un PDF
  // generat cu _makeStratDoc conține operatorii de culoare reali "0.588 0.471 0.157 rg" = RGB(150,120,40)
  // (variantă închisă a auriului, pe disclaimer) — albastrul (#16AECB) NU apare in motorul de documente,
  // e doar accentul din login/UI-ul web-app-ului, o suprafață diferită. Corectat aici (era invers).
  var UX = { GOLD: 'D4AF37', GOLD_DARK: '966E28', GOLD_TINT: 'FBF3DD', INK: '1C263A', GRI: '5A6476' };

  function lei(n) { return Math.round(n || 0).toLocaleString('ro-RO'); }
  // consum_unitar/ore — valori adesea sub 1 (ex. 0,02 ore macara/mp); lei() rotunjește la
  // întreg și le arată eronat ca „0" — aici păstrăm până la 3 zecimale reale.
  function zec(n) { return (Math.round((n || 0) * 1000) / 1000).toLocaleString('ro-RO', { maximumFractionDigits: 3 }); }

  function _brandHeader(docx, titluDoc) {
    return [
      new docx.Paragraph({ children: [new docx.TextRun({ text: 'UrbanX', bold: true, size: 24, color: UX.GOLD }), new docx.TextRun({ text: '  Devize & Cost Management', bold: true, size: 18, color: UX.INK })], spacing: { after: 40 } }),
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
      margins: { top: 40, bottom: 40, left: 60, right: 60 },
      children: [new docx.Paragraph({ alignment: opts.right ? docx.AlignmentType.RIGHT : (opts.center ? docx.AlignmentType.CENTER : docx.AlignmentType.LEFT), children: [new docx.TextRun({ text: String(text == null ? '' : text), bold: !!opts.bold, color: opts.color, size: opts.size })] })]
    });
  }
  var BORD = { style: 'single', size: 2, color: 'B9C2CE' };
  function _borders(docx) { return { top: BORD, bottom: BORD, left: BORD, right: BORD, insideHorizontal: BORD, insideVertical: BORD }; }
  function _tabel(docx, head, rows, widths, fontSize) {
    var headRow = new docx.TableRow({ children: head.map(function (h, i) { return _cell(docx, h, { bold: true, shade: UX.GOLD_TINT, color: UX.INK, width: widths ? widths[i] : undefined, center: true, size: fontSize || 16 }); }), tableHeader: true });
    var dataRows = rows.map(function (r) {
      return new docx.TableRow({ children: r.map(function (c, i) { return _cell(docx, c && c.v != null ? c.v : c, { bold: c && c.bold, right: c && c.right, shade: c && c.shade, width: widths ? widths[i] : undefined, size: fontSize || 18 }); }) });
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
    var tabelPrincipal = _tabel(docx, ['Nr', 'Capitolul de lucrări', 'UM', 'Cant.', 'Preț unitar', 'Material', 'Manoperă', 'Transport', 'Utilaj', 'TOTAL'], rows, [4, 36, 6, 8, 9, 9, 9, 7, 7, 9], 16);
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

  // ── C6-C9 — extrase de resurse (HG907/2016): C6 materiale, C7 manoperă, C8 utilaje de
  // șantier (ore de funcționare — DIFERIT de F4/dotări, bunuri de capital), C9 transport.
  // Agregă TOATE resursele de un TIP dat, folosite în articolele pe normă ale obiectului.
  function _agregaResursePeTip(devizObiect, resurseMap, tip) {
    var agregat = {};
    devizObiect.categorii.forEach(function (cat) {
      cat.articole.forEach(function (c) {
        (c.detaliu || []).forEach(function (d) {
          if (d.tip !== tip) return;
          var key = d.resursa_id;
          var r = resurseMap[d.resursa_id] || {};
          if (!agregat[key]) agregat[key] = { denumire: r.denumire || d.resursa_id, um: r.um || '', cantitateTotala: 0, valoare: 0, pretUnitar: d.pret_unitar };
          agregat[key].cantitateTotala += (+d.consum_unitar || 0) * (+c.articol.cantitate || 0);
          agregat[key].valoare += d.valoare;
        });
      });
    });
    return Object.keys(agregat).map(function (k) { return agregat[k]; });
  }
  function _paginaExtrasResurse(docx, proiect, obiect, devizObiect, resurseMap, cod, titluTip, tip, durata) {
    var lista = _agregaResursePeTip(devizObiect, resurseMap, tip);
    var rows = lista.map(function (u, i) {
      var fte = (durata > 0 && (tip === 'manopera' || tip === 'utilaj')) ? u.cantitateTotala / (durata * 8) : null;
      var row = [String(i + 1), u.denumire, u.um, zec(u.cantitateTotala), lei(u.pretUnitar), { v: lei(u.valoare) + ' lei', right: true }];
      if (fte != null) row.push(zec(fte) + ' pers./echip.');
      return row;
    });
    var head = ['Nr.', 'Denumire resursă', 'UM', 'Cantitate totală', 'Preț unitar', 'Valoare'];
    var widths = [6, 34, 10, 16, 14, 20];
    if (tip === 'manopera' || tip === 'utilaj') { head.push(durata > 0 ? 'Echivalent normă întreagă (FTE)' : 'FTE (setați durata pe obiect)'); widths = [6, 28, 8, 14, 12, 16, 16]; }
    var sectiuni = [lista.length ? _tabel(docx, head, rows, widths) : new docx.Paragraph('Niciun articol pe normă cu resursă de acest tip în acest obiect (articolele curente au preț liber).')];
    if (!durata && (tip === 'manopera' || tip === 'utilaj')) sectiuni.push(new docx.Paragraph({ spacing: { before: 150 }, children: [new docx.TextRun({ text: 'Notă: setați „Durata execuției" pe obiect (tab Obiecte & Articole → Setări deviz) pentru echivalentul de personal/utilaje (FTE).', italics: true, size: 15, color: UX.GRI })] }));
    return _brandHeader(docx, cod + ' — ' + titluTip).concat(_antet(docx, proiect, obiect), [new docx.Paragraph({ spacing: { before: 200 } })], sectiuni, _semnaturaProiectant(docx));
  }

  // ── F4 real (HG907 Anexa 8): utilaje/echipamente tehnologice + dotări CUMPĂRATE pt investiție
  // (bunuri de capital, Cap.4.3/4.4) — NU utilajele de șantier din C8. Sursă: js/urbanx-devize-pro-
  // schema-v3.sql (tabel deviz_dotari), introduse manual de proiectant (platforma nu proiectează
  // echipamente tehnologice).
  function _paginaF4Dotari(docx, proiect, obiect, dotari) {
    var rows = dotari.map(function (d, i) {
      var v = (+d.cantitate || 0) * (+d.pret_unitar || 0);
      return [String(i + 1), (d.cod ? d.cod + ' — ' : '') + d.denumire, d.um, zec(d.cantitate), lei(d.pret_unitar), { v: lei(v) + ' lei', right: true }, d.necesita_montaj !== false ? '4.3' : '4.4', d.furnizor || '—'];
    });
    var total = dotari.reduce(function (s, d) { return s + (+d.cantitate || 0) * (+d.pret_unitar || 0); }, 0);
    var sectiuni = dotari.length
      ? [_tabel(docx, ['Nr.', 'Denumire', 'UM', 'Cantitate', 'Preț unitar', 'Valoare', 'Cap.', 'Furnizor'], rows, [5, 26, 8, 10, 12, 14, 7, 18]),
      new docx.Paragraph({ spacing: { before: 150 }, children: [new docx.TextRun({ text: 'TOTAL DOTĂRI: ' + lei(total) + ' lei', bold: true })] })]
      : [new docx.Paragraph('Nicio dotare/echipament tehnologic introdus încă pentru acest obiect (tab Obiecte & Articole → secțiunea „🔧 Dotări").')];
    return _brandHeader(docx, 'F4 — Lista cu cantitățile de utilaje și echipamente tehnologice, inclusiv dotări').concat(_antet(docx, proiect, obiect), [new docx.Paragraph({ spacing: { before: 200 } })], sectiuni, _semnaturaProiectant(docx));
  }

  // ── F5 real: fișă tehnică per dotare (producător/model/parametri/garanție) — din datele reale
  // introduse la fiecare dotare, nu placeholder generic.
  function _paginaF5FiseTehnice(docx, proiect, obiect, dotari) {
    var sectiuni = [];
    if (!dotari.length) {
      sectiuni.push(new docx.Paragraph('Nicio dotare/echipament introdus încă — fișele tehnice se generează automat din datele completate la fiecare dotare (tab Obiecte & Articole → „🔧 Dotări").'));
    } else {
      dotari.forEach(function (d, i) {
        sectiuni.push(new docx.Paragraph({ heading: docx.HeadingLevel.HEADING_2, spacing: { before: i ? 300 : 0 }, text: (i + 1) + '. ' + d.denumire }));
        var rows = [
          ['Producător', d.producator || 'Se completează de proiectant/furnizor'],
          ['Model', d.model || '—'],
          ['Parametri tehnici', d.parametri || 'Se completează de proiectant/furnizor'],
          ['Garanție', d.garantie_luni ? d.garantie_luni + ' luni' : 'Se completează la contractare'],
          ['UM / Cantitate', d.um + ' / ' + zec(d.cantitate)],
          ['Furnizor', d.furnizor || 'Se stabilește prin achiziție']
        ];
        sectiuni.push(_tabel(docx, ['Câmp', 'Valoare'], rows, [30, 70]));
      });
    }
    return _brandHeader(docx, 'F5 — Fișele tehnice pentru utilaje/echipamente').concat(_antet(docx, proiect, obiect), [new docx.Paragraph({ spacing: { before: 200 } })], sectiuni, _semnaturaProiectant(docx));
  }

  // ── F6 (Anexa 10 HG907/2016) — Graficul general de realizare a investiției. Fără un modul de
  // planificare (durată per articol/capitol), singura eșalonare defensibilă e LINIARĂ pe durata
  // de execuție a obiectului — etichetat explicit ca implicit/editabil, nu ca plan real de șantier.
  function _paginaF6Grafic(docx, proiect, perechi) {
    var cuDurata = perechi.filter(function (p) { return +p.obiect.durata_zile_lucratoare > 0; });
    if (!cuDurata.length) {
      return _brandHeader(docx, 'F6 — Graficul general de realizare a investiției').concat(
        _antet(docx, proiect, null),
        [new docx.Paragraph({ spacing: { before: 200 }, children: [new docx.TextRun({ text: 'Niciun obiect nu are „Durata execuției" setată (tab Obiecte & Articole → Setări deviz) — graficul nu se poate genera fără o durată de referință.', italics: true })] })],
        _semnaturaProiectant(docx)
      );
    }
    var nrLuni = Math.max.apply(null, cuDurata.map(function (p) { return Math.ceil(+p.obiect.durata_zile_lucratoare / 30); }));
    var head = ['Nr.', 'Obiect / Stadiu fizic', 'Valoare totală'].concat(Array.from({ length: nrLuni }, function (_, i) { return 'Luna ' + (i + 1); }));
    var widths = [5, 25, 14].concat(Array.from({ length: nrLuni }, function () { return Math.round(56 / nrLuni); }));
    var rows = perechi.map(function (p, i) {
      var lunile = +p.obiect.durata_zile_lucratoare > 0 ? Math.ceil(+p.obiect.durata_zile_lucratoare / 30) : 0;
      var valLuna = lunile > 0 ? p.devizObiect.total / lunile : 0;
      var row = [String(i + 1), (p.obiect.cod ? p.obiect.cod + ' ' : '') + p.obiect.denumire, { v: lei(p.devizObiect.total) + ' lei', right: true }];
      for (var l = 0; l < nrLuni; l++) row.push(l < lunile ? { v: lei(valLuna), right: true } : '—');
      return row;
    });
    return _brandHeader(docx, 'F6 — Graficul general de realizare a investiției').concat(
      _antet(docx, proiect, null),
      [new docx.Paragraph({ spacing: { before: 100, after: 150 }, children: [new docx.TextRun({ text: 'Eșalonare implicită LINIARĂ pe durata de execuție declarată per obiect (' + nrLuni + ' luni) — de adaptat de proiectant/diriginte la graficul real de șantier, nu un plan definitiv.', italics: true, size: 15, color: UX.GRI })] }),
      _tabel(docx, head, rows, widths)],
      _semnaturaProiectant(docx)
    );
  }

  function _paginaDevizGeneral(docx, proiect, devizGen) {
    var val = devizGen.deviz_general.v, tva = devizGen.deviz_general.tva;
    var rows = G.UXDevize.STRUCT.map(function (rw) {
      var cod = rw[0], den = rw[1], key = rw[2], lvl = rw[3];
      var fara = key != null ? val[key] : null;
      var t = fara != null ? Math.round(fara * tva) : null;
      var cu = fara != null ? fara + t : null;
      var opt = { bold: lvl >= 2, shade: lvl === 3 ? UX.GOLD_TINT : (lvl === 0 || lvl === 2) ? 'F0F0F0' : undefined };
      return [cod, den, fara != null ? Object.assign({ v: lei(fara), right: true }, opt) : '', t != null ? Object.assign({ v: lei(t), right: true }, opt) : '', cu != null ? Object.assign({ v: lei(cu), right: true }, opt) : ''];
    });
    var totalCu = val.total + Math.round(val.total * tva);
    return _brandHeader(docx, 'DEVIZ GENERAL al obiectivului de investiție').concat(
      _antet(docx, proiect, null),
      [new docx.Paragraph({ spacing: { before: 100, after: 150 }, children: [new docx.TextRun({ text: 'conform HG 907/2016, Anexa nr. 7 · sursă cap.4.1: ' + (devizGen.sursa_c41 === 'articole_reale' ? 'articole reale din deviz' : 'estimare top-down'), italics: true, size: 16 })] }),
      _tabel(docx, ['Nr. crt.', 'Denumirea capitolelor și subcapitolelor', 'Fără TVA', 'TVA', 'Cu TVA'], rows, [8, 50, 14, 12, 16]),
      new docx.Paragraph({ spacing: { before: 200 }, children: [new docx.TextRun({ text: 'TOTAL GENERAL cu TVA: ' + lei(totalCu) + ' lei (≈ ' + lei(Math.round(totalCu / devizGen.deviz_general.curs)) + ' euro)', bold: true, color: UX.GOLD })] })],
      _semnaturaProiectant(docx)
    );
  }

  var TIP_COD = { materiale: ['C6', 'Lista cuprinzând consumurile de resurse materiale'], manopera: ['C7', 'Lista cuprinzând consumurile cu mâna de lucru'], utilaj: ['C8', 'Lista cuprinzând consumurile de ore de funcționare a utilajelor de construcții'], transport: ['C9', 'Lista cuprinzând consumurile privind transporturile'] };

  function generateDocumenteF1F5Docx(proiectId) {
    var DP = G.UXDevizePro;
    if (!DP) return Promise.reject(new Error('UXDevizePro nu e încărcat.'));
    return _asteaptaDocx().then(function () {
      var docx = G.docx;
      return Promise.all([DP.getProiect(proiectId), DP.listObiecte(proiectId), DP.listResurse(), DP.computeDevizGeneral(proiectId)]).then(function (r) {
        var proiect = r[0], obiecte = r[1], resurse = r[2], devizGen = r[3];
        var resurseMap = {}; resurse.forEach(function (x) { resurseMap[x.id] = x; });
        return Promise.all(obiecte.map(function (o) {
          return Promise.all([DP.computeDevizObiect(o.id), DP.listDotari(o.id)]).then(function (rr) { return { obiect: o, devizObiect: rr[0], dotari: rr[1] }; });
        })).then(function (perechi) {
          var files = [];
          files.push({ name: _numeFisier('F1_Centralizator_obiectiv'), doc: _doc(docx, _paginaF1(docx, proiect, perechi)) });
          files.push({ name: _numeFisier('F6_Grafic_realizare_investitie'), doc: _doc(docx, _paginaF6Grafic(docx, proiect, perechi)) });
          perechi.forEach(function (p) {
            var suf = '_' + (p.obiect.cod || p.obiect.denumire);
            var durata = +p.obiect.durata_zile_lucratoare || 0;
            files.push({ name: _numeFisier('F2' + suf), doc: _doc(docx, _paginaF2(docx, proiect, p.obiect, p.devizObiect)) });
            files.push({ name: _numeFisier('F3' + suf), doc: _doc(docx, _paginaF3(docx, proiect, p.obiect, p.devizObiect)) });
            files.push({ name: _numeFisier('F4' + suf), doc: _doc(docx, _paginaF4Dotari(docx, proiect, p.obiect, p.dotari)) });
            files.push({ name: _numeFisier('F5' + suf), doc: _doc(docx, _paginaF5FiseTehnice(docx, proiect, p.obiect, p.dotari)) });
            ['materiale', 'manopera', 'utilaj', 'transport'].forEach(function (tip) {
              var cod = TIP_COD[tip][0], titlu = TIP_COD[tip][1];
              files.push({ name: _numeFisier(cod + suf), doc: _doc(docx, _paginaExtrasResurse(docx, proiect, p.obiect, p.devizObiect, resurseMap, cod, titlu, tip, durata)) });
            });
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
