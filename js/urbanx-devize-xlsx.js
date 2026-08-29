/* ============================================================================
 * UrbanX — EXPORT EXCEL REAL CU FORMULE LIVE (js/urbanx-devize-xlsx.js)
 * Diferit de "Word real" (urbanx-devize-docx.js, .docx static) și de "Export CSV"
 * (urbanx-deviz-engine.js, valori fixe): aici valorile cheie (Valoare articol,
 * subtotal categorie, Cheltuieli directe, Alte chelt./CAM/Indirecte/Profit/TVA,
 * TOTAL GENERAL) sunt scrise ca FORMULE Excel reale (cell.f), nu doar numere —
 * quando deschizi fișierul și modifici o Cantitate/Preț unitar/procent, Excel
 * recalculează singur toată lanțul (comportament Excel nativ, nu simulat de noi).
 *
 * Motor: SheetJS (window.XLSX, lazy-load același CDN ca la citirea antemăsurătorilor
 * — js/urbanx-devize-relevee-parse.js). Formula chain identică 1:1 cu
 * computeDevizObiect() din urbanx-devize-pro.js (nicio cifră inventată separat).
 *
 * window.UXDevizeXlsx.exportProiectXlsxReal(proiectId)
 * ========================================================================== */
(function (G) {
  'use strict';
  var XLSX_CDN = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';

  function _asteaptaXLSX() {
    return new Promise(function (resolve, reject) {
      if (G.XLSX) return resolve(true);
      if (!document.querySelector('script[data-ux-lazy="' + XLSX_CDN + '"]')) {
        var s = document.createElement('script'); s.src = XLSX_CDN; s.setAttribute('data-ux-lazy', XLSX_CDN);
        s.onerror = function () { reject(new Error('Nu s-a putut încărca motorul Excel (verifică conexiunea la internet).')); };
        document.head.appendChild(s);
      }
      var trecut = 0, iv = setInterval(function () {
        trecut += 200;
        if (G.XLSX) { clearInterval(iv); resolve(true); }
        else if (trecut >= 25000) { clearInterval(iv); reject(new Error('Timeout la încărcarea motorului Excel.')); }
      }, 200);
    });
  }

  function _sheetNume(baza, folosite) {
    var nume = String(baza || 'Obiect').replace(/[\\/?*\[\]:]/g, '-').slice(0, 31);
    var n = nume, i = 1;
    while (folosite[n]) { var suf = ' (' + (++i) + ')'; n = nume.slice(0, 31 - suf.length) + suf; }
    folosite[n] = true;
    return n;
  }

  // Scrie un rând de tip valoare simplă (nu formulă) — folosit pt. antet/etichete.
  function _rand(vals) { return vals; }

  // Construiește foaia de calcul (AOA + formule) pt. UN singur obiect (imobil/stadiu fizic),
  // pe baza rezultatului real computeDevizObiect() — nicio valoare recalculată separat aici,
  // doar transcrisă în celule + formulele care leagă celulele între ele.
  function _construiesteFoaieObiect(XLSX, proiect, obiect, devizObiect) {
    var aoa = [];
    aoa.push(['DEVIZ PE OBIECT — ' + (obiect.cod ? obiect.cod + ' ' : '') + obiect.denumire]);
    aoa.push(['Proiect: ' + (proiect.nume || '—') + (obiect.stadiu_fizic ? '  ·  Stadiul fizic: ' + obiect.stadiu_fizic : '')]);
    aoa.push([]);
    var HEAD_ROW = aoa.length; // 0-indexed, va deveni rândul 4 (1-indexed) după push
    aoa.push(['Nr.', 'Cod', 'Denumire articol', 'UM', 'Cantitate', 'Preț unitar (lei/UM)', 'Material (lei)', 'Manoperă (lei)', 'Utilaj (lei)', 'Transport (lei)', 'VALOARE (lei)']);

    var formule = []; // {addr, f, v}
    var subtotalRows = []; // rândurile (1-indexed) ale subtotalurilor pe categorie
    var nr = 0;
    var primulRandArticol = null, ultimulRandArticol = null;

    devizObiect.categorii.forEach(function (cat) {
      aoa.push(['', '', cat.categorie.denumire.toUpperCase(), '', '', '', '', '', '', '', '']);
      var rInceput = aoa.length + 1; // rând 1-indexed al primului articol din această categorie
      cat.articole.forEach(function (c) {
        nr++;
        var rowIdx1 = aoa.length + 1; // 1-indexed, va fi rândul acestui articol după push
        if (primulRandArticol == null) primulRandArticol = rowIdx1;
        ultimulRandArticol = rowIdx1;
        var cantitate = +c.articol.cantitate || 0;
        var pretUnitar = cantitate ? (c.total / cantitate) : 0;
        aoa.push([
          nr, c.articol.cod || '', c.articol.denumire, c.articol.um, cantitate,
          Math.round(pretUnitar * 100) / 100, Math.round(c.materiale * 100) / 100, Math.round(c.manopera * 100) / 100,
          Math.round(c.utilaj * 100) / 100, Math.round(c.transport * 100) / 100, Math.round(c.total * 100) / 100
        ]);
        // VALOARE = Cantitate * Preț unitar — formulă LIVE: editezi E sau F în Excel, K se recalculează.
        formule.push({ addr: 'K' + rowIdx1, f: 'E' + rowIdx1 + '*F' + rowIdx1, v: Math.round(c.total * 100) / 100 });
      });
      var rSfarsit = aoa.length; // ultimul rând articol (1-indexed)
      var rSubtotal = aoa.length + 1;
      aoa.push(['', '', 'TOTAL ' + cat.categorie.denumire, '', '', '', '', '', '', '', Math.round(cat.subtotal * 100) / 100]);
      formule.push({ addr: 'K' + rSubtotal, f: 'SUM(K' + rInceput + ':K' + rSfarsit + ')', v: Math.round(cat.subtotal * 100) / 100 });
      subtotalRows.push(rSubtotal);
    });

    aoa.push([]);
    aoa.push(['- lei -', '', '', '', '', '', '', '', '', '', '']);
    var s = devizObiect.subsol;

    var rCheltDirecte = aoa.length + 1;
    aoa.push(['', '', 'Cheltuieli directe (materiale+manoperă+utilaj+transport)', '', '', '', '', '', '', '', Math.round(s.cheltuieliDirecte * 100) / 100]);
    formule.push({ addr: 'K' + rCheltDirecte, f: subtotalRows.map(function (r) { return 'K' + r; }).join('+') || '0', v: Math.round(s.cheltuieliDirecte * 100) / 100 });

    var rManoperaTotal = aoa.length + 1;
    aoa.push(['', '', 'din care: Manoperă totală (bază pt. CAM)', '', '', '', '', '', '', '', Math.round(devizObiect.pe4.manopera * 100) / 100]);
    if (primulRandArticol != null) formule.push({ addr: 'K' + rManoperaTotal, f: 'SUM(H' + primulRandArticol + ':H' + ultimulRandArticol + ')', v: Math.round(devizObiect.pe4.manopera * 100) / 100 });

    var rAltePct = aoa.length + 1;
    aoa.push(['', '', 'Alte cheltuieli directe — procent (%) [editabil]', '', '', '', '', '', '', '', s.altePct]);
    var rAlte = aoa.length + 1;
    aoa.push(['', '', 'Alte cheltuieli directe (valoare)', '', '', '', '', '', '', '', Math.round(s.alteCheltuieliDirecte * 100) / 100]);
    formule.push({ addr: 'K' + rAlte, f: 'K' + rCheltDirecte + '*K' + rAltePct + '/100', v: Math.round(s.alteCheltuieliDirecte * 100) / 100 });

    var rCamPct = aoa.length + 1;
    aoa.push(['', '', 'CAM — contribuție asig. pt. muncă — procent (%) [legal, Cod Fiscal]', '', '', '', '', '', '', '', s.camPct]);
    var rCam = aoa.length + 1;
    aoa.push(['', '', 'CAM (valoare — se aplică STRICT pe manoperă)', '', '', '', '', '', '', '', Math.round(s.cam * 100) / 100]);
    formule.push({ addr: 'K' + rCam, f: 'K' + rManoperaTotal + '*K' + rCamPct + '/100', v: Math.round(s.cam * 100) / 100 });

    var rBazaIndirecte = aoa.length + 1;
    aoa.push(['', '', 'Bază cheltuieli indirecte (directe+alte+CAM)', '', '', '', '', '', '', '', Math.round((s.cheltuieliDirecte + s.alteCheltuieliDirecte + s.cam) * 100) / 100]);
    formule.push({ addr: 'K' + rBazaIndirecte, f: 'K' + rCheltDirecte + '+K' + rAlte + '+K' + rCam, v: Math.round((s.cheltuieliDirecte + s.alteCheltuieliDirecte + s.cam) * 100) / 100 });

    var rIndPct = aoa.length + 1;
    aoa.push(['', '', 'Cheltuieli indirecte — procent (%) [editabil]', '', '', '', '', '', '', '', s.indPct]);
    var rInd = aoa.length + 1;
    aoa.push(['', '', 'Cheltuieli indirecte (valoare)', '', '', '', '', '', '', '', Math.round(s.cheltuieliIndirecte * 100) / 100]);
    formule.push({ addr: 'K' + rInd, f: 'K' + rBazaIndirecte + '*K' + rIndPct + '/100', v: Math.round(s.cheltuieliIndirecte * 100) / 100 });

    var rBazaProfit = aoa.length + 1;
    aoa.push(['', '', 'Bază profit (bază indirecte + indirecte)', '', '', '', '', '', '', '', Math.round((s.cheltuieliDirecte + s.alteCheltuieliDirecte + s.cam + s.cheltuieliIndirecte) * 100) / 100]);
    formule.push({ addr: 'K' + rBazaProfit, f: 'K' + rBazaIndirecte + '+K' + rInd, v: Math.round((s.cheltuieliDirecte + s.alteCheltuieliDirecte + s.cam + s.cheltuieliIndirecte) * 100) / 100 });

    var rProfPct = aoa.length + 1;
    aoa.push(['', '', 'Profit — procent (%) [editabil]', '', '', '', '', '', '', '', s.profPct]);
    var rProfit = aoa.length + 1;
    aoa.push(['', '', 'Profit (valoare)', '', '', '', '', '', '', '', Math.round(s.profit * 100) / 100]);
    formule.push({ addr: 'K' + rProfit, f: 'K' + rBazaProfit + '*K' + rProfPct + '/100', v: Math.round(s.profit * 100) / 100 });

    var rTotalFaraTva = aoa.length + 1;
    aoa.push(['', '', 'TOTAL GENERAL (fără TVA)', '', '', '', '', '', '', '', Math.round(s.totalGeneralFaraTva * 100) / 100]);
    formule.push({ addr: 'K' + rTotalFaraTva, f: 'K' + rBazaProfit + '+K' + rProfit, v: Math.round(s.totalGeneralFaraTva * 100) / 100 });

    var rTvaPct = aoa.length + 1;
    aoa.push(['', '', 'Cotă TVA (%) [editabil]', '', '', '', '', '', '', '', Math.round(s.cotaTva * 10000) / 100]);
    var rTva = aoa.length + 1;
    aoa.push(['', '', 'TVA (valoare)', '', '', '', '', '', '', '', Math.round(s.tva * 100) / 100]);
    formule.push({ addr: 'K' + rTva, f: 'K' + rTotalFaraTva + '*K' + rTvaPct + '/100', v: Math.round(s.tva * 100) / 100 });

    var rTotalGeneral = aoa.length + 1;
    aoa.push(['', '', 'TOTAL GENERAL (cu TVA)', '', '', '', '', '', '', '', Math.round(s.totalGeneral * 100) / 100]);
    formule.push({ addr: 'K' + rTotalGeneral, f: 'K' + rTotalFaraTva + '+K' + rTva, v: Math.round(s.totalGeneral * 100) / 100 });

    var ws = XLSX.utils.aoa_to_sheet(aoa);
    formule.forEach(function (fo) { if (ws[fo.addr]) { ws[fo.addr].f = fo.f; } });
    ws['!cols'] = [{ wch: 5 }, { wch: 10 }, { wch: 40 }, { wch: 6 }, { wch: 10 }, { wch: 14 }, { wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 14 }];
    return { ws: ws, rTotalGeneral: rTotalGeneral, rTotalFaraTva: rTotalFaraTva };
  }

  function generateXlsxWorkbook(proiect, perechi) {
    return _asteaptaXLSX().then(function () {
      var XLSX = G.XLSX;
      var wb = XLSX.utils.book_new();
      var folosite = {};
      var refuriTotal = []; // {nume_sheet, rTotalGeneral}

      perechi.forEach(function (p) {
        var nume = _sheetNume((p.obiect.cod ? p.obiect.cod + ' ' : '') + p.obiect.denumire, folosite);
        var built = _construiesteFoaieObiect(XLSX, proiect, p.obiect, p.devizObiect);
        XLSX.utils.book_append_sheet(wb, built.ws, nume);
        refuriTotal.push({ nume: nume, obiect: p.obiect, rTotalGeneral: built.rTotalGeneral, total: p.devizObiect.subsol.totalGeneral });
      });

      // Foaia CENTRALIZATOR (F1) — fiecare rând REFERENȚIAZĂ (formulă) sheet-ul obiectului
      // respectiv; TOTAL = SUM al acestor referințe. Modifici o cifră în orice sheet de obiect
      // → totalul acelui obiect se schimbă → centralizatorul se schimbă automat (formule înlănțuite).
      var aoaCentral = [
        ['DEVIZ GENERAL CENTRALIZAT — ' + (proiect.nume || '—')],
        ['Fiecare rând face referință (formulă) la TOTALUL GENERAL al foii acelui obiect — actualizat automat.'],
        [],
        ['Nr.', 'Obiect / Stadiu fizic', 'Valoare (cu TVA, lei)']
      ];
      var formuleCentral = [];
      refuriTotal.forEach(function (r, i) {
        var rowIdx1 = aoaCentral.length + 1;
        aoaCentral.push([i + 1, (r.obiect.cod ? r.obiect.cod + ' ' : '') + r.obiect.denumire, Math.round(r.total * 100) / 100]);
        formuleCentral.push({ addr: 'C' + rowIdx1, f: "'" + r.nume + "'!K" + r.rTotalGeneral, v: Math.round(r.total * 100) / 100 });
      });
      var primR = 5, ultR = 4 + refuriTotal.length;
      var rTotalC = aoaCentral.length + 1;
      var totalC = refuriTotal.reduce(function (s, r) { return s + r.total; }, 0);
      aoaCentral.push(['', 'TOTAL CENTRALIZAT', Math.round(totalC * 100) / 100]);
      formuleCentral.push({ addr: 'C' + rTotalC, f: refuriTotal.length ? 'SUM(C' + primR + ':C' + ultR + ')' : '0', v: Math.round(totalC * 100) / 100 });

      var wsCentral = XLSX.utils.aoa_to_sheet(aoaCentral);
      formuleCentral.forEach(function (fo) { if (wsCentral[fo.addr]) wsCentral[fo.addr].f = fo.f; });
      wsCentral['!cols'] = [{ wch: 6 }, { wch: 45 }, { wch: 18 }];
      // Centralizatorul primul (se deschide implicit), apoi câte o foaie per obiect
      XLSX.utils.book_append_sheet(wb, wsCentral, 'CENTRALIZATOR (F1)');
      wb.SheetNames.unshift(wb.SheetNames.pop()); // mută centralizatorul pe prima poziție

      return wb;
    });
  }

  function exportProiectXlsxReal(proiectId) {
    var DP = G.UXDevizePro;
    if (!DP) return Promise.reject(new Error('Modulul UXDevizePro nu e încărcat.'));
    var _proiect = {};
    return DP.getProiect(proiectId).then(function (p) {
      _proiect = p || {};
      return DP.listObiecte(proiectId);
    }).then(function (obiecte) {
      if (!obiecte.length) return Promise.reject(new Error('Proiectul nu are niciun obiect — creează cel puțin un obiect cu articole înainte de export.'));
      return Promise.all(obiecte.map(function (o) { return DP.computeDevizObiect(o.id).then(function (dz) { return { obiect: o, devizObiect: dz }; }); }));
    }).then(function (perechi) { return generateXlsxWorkbook(_proiect, perechi); })
      .then(function (wb) {
        var XLSX = G.XLSX;
        var nume = 'Deviz_' + (_proiect.nume || 'proiect').replace(/[^a-zA-Z0-9_\-]+/g, '_') + '.xlsx';
        XLSX.writeFile(wb, nume);
        return { file: nume };
      });
  }

  G.UXDevizeXlsx = { exportProiectXlsxReal: exportProiectXlsxReal, generateXlsxWorkbook: generateXlsxWorkbook };
  console.log('[UXDevizeXlsx] export Excel real cu formule live (SheetJS) — window.UXDevizeXlsx');
})(window);
