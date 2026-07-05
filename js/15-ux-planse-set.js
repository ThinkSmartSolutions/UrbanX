/* ============================================================================
 * UrbanX — SET COMPLET DE PLANȘE (js/15-ux-planse-set.js)
 * Extinde UX_DRAW cu generatoare pentru un PROIECT DESENAT complet, nu doar
 * fațade+secțiune: plan de situație, planuri de nivel, acoperiș, 4 fațade,
 * 2 secțiuni, fundații, cofraj+armare planșeu, scheme instalații (IS/IE/IT).
 * + export PDF multi-pagină (deschizibil oriunde) din primitivele desenului.
 * Toate poartă cartuș ISO 7200 + parametrii tehnici derivați. window.UX_DRAW.*
 * ========================================================================== */
(function () {
  'use strict';
  function wait(cb, n) { n = n || 0; if (n > 120) return; if (!window.UX_DRAW || !window.UX_DRAW.newDoc) { setTimeout(function () { wait(cb, n + 1); }, 250); return; } cb(window.UX_DRAW); }
  wait(function (UX) {
    var K = 1000;
    function grid(o) { return { nGX: Math.max(3, Math.round((o.width || 12) / (o.width > 25 ? 6 : 4.5))), nGY: Math.max(2, Math.round((o.adancime || 10) / (o.adancime > 25 ? 6 : 3.8))) }; }

    // ── PLAN DE SITUAȚIE ──────────────────────────────────────────────────
    UX.siteplanDoc = function (o) {
      o = o || {}; var doc = UX.newDoc();
      var W = (o.width || 12) * K, D = (o.adancime || 10) * K;
      var rl = (o.rl != null ? o.rl : 3) * K, rf = (o.rf != null ? o.rf : 5) * K, rs = (o.rs != null ? o.rs : 6) * K;
      var pW = (o.parcelW || (o.width + (o.rl || 3) * 2)) * K, pD = (o.parcelD || (o.adancime + (o.rf || 5) + (o.rs || 6))) * K;
      doc.rect(0, 0, pW, pD, 'C-PARCEL-BDRY');                         // parcela
      doc.rect(rl, rf, W, D, 'C-BLDG-PRPD');                           // cladire propusa
      try { UX.materialHatch(doc, [[rl, rf], [rl + W, rf], [rl + W, rf + D], [rl, rf + D]], 'HACHURE'); } catch (e) {}
      // retrageri cotate
      doc.dim(0, rf + D / 2, rl, rf + D / 2, 250, 'A-DIMS-PLAN');      // lateral stanga
      doc.dim(rl, 0, rl, rf, 250, 'A-DIMS-PLAN');                      // fata
      doc.dim(rl + W, rf + D, rl + W, pD, 250, 'A-DIMS-PLAN');         // spate
      // front stradal + acces
      doc.line(-500, pD + 300, pW + 500, pD + 300, 'C-ROAD-EDGE'); doc.line(-500, pD + 3300, pW + 500, pD + 3300, 'C-ROAD-EDGE');
      doc.text(pW / 2, pD + 1800, 300, 'STRADA / DRUM PUBLIC', 'A-TEXT-NOTE', { align: 'center' });
      doc.rect(rl + W / 2 - 1500, rf + D, 3000, pD - (rf + D), 'C-ROAD-EDGE'); doc.text(rl + W / 2, rf + D + 800, 260, 'ACCES', 'A-TEXT-NOTE', { align: 'center' });
      doc.text(rl + 400, rf + 700, 320, 'Nr. cad. ' + (o.nrCad || '—'), 'A-TEXT-NOTE');
      doc.text(rl + 400, rf + 1400, 260, 'S teren ' + (o.parcelArea || '—') + ' mp · POT ' + (o.pot != null ? Math.round(o.pot * 100) : '—') + '% · CUT ' + (o.cut || '—'), 'A-TEXT-FINI');
      UX.northArrow(doc, pW + 900, pD - 400, 340, 0); UX.scaleBar(doc, 0, -900, 500, 10);
      UX.titleBlock(doc, { x: pW + 1400, y: 0, proiect: o.proiect || 'Plan de situație', faza: o.faza || 'DTAC', plansa: o.plansa || 'A-01', scara: 500, beneficiar: o.beneficiar, data: o.data });
      if (o.params) try { UX.techNotes(doc, pW + 1400, 65, o.params); } catch (e) {}
      return doc;
    };

    // ── PLAN DE NIVEL PARAMETRIC (perimetru + grilă + nucleu + cote) ───────
    UX.floorPlanParametricDoc = function (o) {
      o = o || {}; var doc = UX.newDoc(); var g = grid(o);
      var W = (o.width || 12) * K, D = (o.adancime || 10) * K, th = 375;
      doc.rect(0, 0, W, D, 'A-WALL-EXTR-N'); doc.rect(-th, -th, W + 2 * th, D + 2 * th, 'A-WALL-EXTR-N');
      try { UX.materialHatch(doc, [[-th, -th], [W + th, -th], [W + th, 0], [-th, 0]], 'ZIDARIE_BCA'); } catch (e) {}
      // nucleu scări/lift central
      var cw = 3600, cd = Math.min(6600, D * 0.5), cx = W / 2 - cw / 2, cy = D / 2 - cd / 2;
      doc.rect(cx, cy, cw, cd, 'S-COLS-N'); try { UX.materialHatch(doc, [[cx, cy], [cx + cw, cy], [cx + cw, cy + cd], [cx, cy + cd]], 'BETON_ARMAT'); } catch (e) {}
      UX.staircaseSymbol(doc, { x: cx + 200, y: cy + 200, w: 1400, d: cd - 400, nSteps: 14 });
      doc.text(cx + cw / 2, cy + cd + 400, 260, 'NUCLEU SCĂRI + LIFT', 'A-TEXT-NOTE', { align: 'center' });
      // stâlpi la intersecțiile grilei
      var gx = W / g.nGX, gy = D / g.nGY, i, j;
      for (i = 0; i <= g.nGX; i++) for (j = 0; j <= g.nGY; j++) doc.rect(i * gx - 200, j * gy - 200, 400, 400, 'S-COLS-N');
      UX.structuralGrid(doc, 0, 0, W, D, gx, gy);
      doc.dim(0, 0, W, 0, -300, 'A-DIMS-PLAN'); doc.dim(0, 0, 0, D, -300, 'A-DIMS-PLAN');
      for (i = 0; i < g.nGX; i++) doc.dim(i * gx, -600, (i + 1) * gx, -600, -180, 'A-DIMS-PLAN');
      UX.levelMark(doc, W / 2, 800, o.cota != null ? o.cota : 0.0);
      doc.text(W / 2, D + 900, 300, (o.floorLabel || 'PLAN NIVEL').toUpperCase() + ' · S ≈ ' + Math.round((o.width || 12) * (o.adancime || 10)) + ' mp', 'A-TEXT-NOTE', { align: 'center' });
      UX.northArrow(doc, W + 700, D - 400, 320, 0); UX.scaleBar(doc, 0, -1000, 100, 10);
      UX.titleBlock(doc, { x: W + 1200, y: 0, proiect: o.proiect || ('Plan ' + (o.floorLabel || 'nivel')), faza: o.faza || 'DTAC', plansa: o.plansa || 'A-03', scara: 100, beneficiar: o.beneficiar, data: o.data });
      if (o.params) try { UX.techNotes(doc, W + 1200, 65, o.params); } catch (e) {}
      return doc;
    };

    // ── PLAN ACOPERIȘ ─────────────────────────────────────────────────────
    UX.roofPlanDoc = function (o) {
      o = o || {}; var doc = UX.newDoc();
      var W = (o.width || 12) * K, D = (o.adancime || 10) * K, over = 400;
      doc.rect(-over, -over, W + 2 * over, D + 2 * over, 'A-WALL-EXTR-N');  // streasina
      doc.rect(0, 0, W, D, 'S-SLAB-N');
      var roof = o.roof || 'terasa';
      if (roof === 'terasa') {
        doc.rect(200, 200, W - 400, D - 400, 'A-WALL-EXTR-N');            // atic
        // panta spre receptori (4 colturi) + sifoane
        [[600, 600], [W - 600, 600], [600, D - 600], [W - 600, D - 600]].forEach(function (r) { doc.circle(r[0], r[1], 180, 'S-SLAB-N'); doc.line(r[0] - 250, r[1], r[0] + 250, r[1], 'S-SLAB-N'); doc.line(r[0], r[1] - 250, r[0], r[1] + 250, 'S-SLAB-N'); });
        doc.line(0, 0, W, D, 'A-DIMS-PLAN'); doc.line(W, 0, 0, D, 'A-DIMS-PLAN');  // pante diagonale
        doc.text(W / 2, D / 2, 260, 'terasă necirculabilă · pantă 1.5% spre receptori', 'A-TEXT-NOTE', { align: 'center' });
      } else {
        doc.line(0, D / 2, W, D / 2, 'A-WALL-EXTR-N'); // coama
        doc.line(0, 0, W / 2, D / 2, 'A-DIMS-PLAN'); doc.line(W, 0, W / 2, D / 2, 'A-DIMS-PLAN');
        doc.line(0, D, W / 2, D / 2, 'A-DIMS-PLAN'); doc.line(W, D, W / 2, D / 2, 'A-DIMS-PLAN');
        doc.text(W / 2, D / 2 - 400, 260, 'șarpantă · pantă 30% · coamă', 'A-TEXT-NOTE', { align: 'center' });
      }
      doc.dim(0, -over, W, -over, -300, 'A-DIMS-PLAN'); doc.dim(0, 0, 0, D, -300, 'A-DIMS-PLAN');
      UX.northArrow(doc, W + over + 500, D - 400, 320, 0); UX.scaleBar(doc, 0, -over - 900, 100, 10);
      UX.titleBlock(doc, { x: W + 1200, y: 0, proiect: o.proiect || 'Plan acoperiș', faza: o.faza || 'DTAC', plansa: o.plansa || 'A-11', scara: 100, beneficiar: o.beneficiar, data: o.data });
      if (o.params) try { UX.techNotes(doc, W + 1200, 65, o.params); } catch (e) {}
      return doc;
    };

    // ── PLAN FUNDAȚII (rezistență) ────────────────────────────────────────
    UX.foundationPlanDoc = function (o) {
      o = o || {}; var doc = UX.newDoc(); var g = grid(o);
      var W = (o.width || 12) * K, D = (o.adancime || 10) * K, gx = W / g.nGX, gy = D / g.nGY, bw = 600, i, j;
      // grinzi de fundatie pe axe (talpi continue)
      for (i = 0; i <= g.nGX; i++) doc.rect(i * gx - bw / 2, -bw / 2, bw, D + bw, 'S-FNDT-N');
      for (j = 0; j <= g.nGY; j++) doc.rect(-bw / 2, j * gy - bw / 2, W + bw, bw, 'S-FNDT-N');
      // cuzineti sub stalpi
      for (i = 0; i <= g.nGX; i++) for (j = 0; j <= g.nGY; j++) { doc.rect(i * gx - 700, j * gy - 700, 1400, 1400, 'S-FNDT-N'); doc.rect(i * gx - 250, j * gy - 250, 500, 500, 'S-COLS-N'); }
      try { for (i = 0; i < g.nGX; i++) for (j = 0; j < g.nGY; j++) UX.materialHatch(doc, [[i * gx + bw, j * gy + bw], [(i + 1) * gx - bw, j * gy + bw], [(i + 1) * gx - bw, (j + 1) * gy - bw], [i * gx + bw, (j + 1) * gy - bw]], 'HACHURE'); } catch (e) {}
      UX.structuralGrid(doc, 0, 0, W, D, gx, gy);
      doc.dim(0, 0, W, 0, -400, 'A-DIMS-PLAN'); doc.dim(0, 0, 0, D, -400, 'A-DIMS-PLAN');
      doc.text(W / 2, D + 900, 260, 'Fundații continue/izolate · talpă la −' + ((o.adancimeFundatie || 1.0)).toFixed(2) + 'm (sub îngheț, STAS 6054) · beton C16/20, armătură B500C', 'A-TEXT-NOTE', { align: 'center' });
      UX.northArrow(doc, W + 700, D - 400, 320, 0); UX.scaleBar(doc, 0, -1000, 100, 10);
      UX.titleBlock(doc, { x: W + 1200, y: 0, proiect: o.proiect || 'Plan fundații', faza: o.faza || 'DTAC', plansa: o.plansa || 'R-01', scara: 100, beneficiar: o.beneficiar, data: o.data });
      if (o.params) try { UX.techNotes(doc, W + 1200, 65, o.params); } catch (e) {}
      return doc;
    };

    // ── PLAN COFRAJ + ARMARE PLANȘEU (rezistență) ─────────────────────────
    UX.formworkPlanDoc = function (o) {
      o = o || {}; var doc = UX.newDoc(); var g = grid(o);
      var W = (o.width || 12) * K, D = (o.adancime || 10) * K, gx = W / g.nGX, gy = D / g.nGY, i, j;
      doc.rect(0, 0, W, D, 'S-SLAB-N');
      // grinzi pe axe
      for (i = 0; i <= g.nGX; i++) doc.rect(i * gx - 150, 0, 300, D, 'S-BEAM-N');
      for (j = 0; j <= g.nGY; j++) doc.rect(0, j * gy - 150, W, 300, 'S-BEAM-N');
      // stalpi
      for (i = 0; i <= g.nGX; i++) for (j = 0; j <= g.nGY; j++) doc.rect(i * gx - 200, j * gy - 200, 400, 400, 'S-COLS-N');
      // directie armare (sageti) pe fiecare panou
      for (i = 0; i < g.nGX; i++) for (j = 0; j < g.nGY; j++) { var px = i * gx + gx / 2, py = j * gy + gy / 2; doc.line(px, j * gy + 400, px, (j + 1) * gy - 400, 'A-DIMS-PLAN'); }
      UX.structuralGrid(doc, 0, 0, W, D, gx, gy);
      doc.dim(0, 0, W, 0, -400, 'A-DIMS-PLAN'); doc.dim(0, 0, 0, D, -400, 'A-DIMS-PLAN');
      doc.text(W / 2, D + 900, 260, 'Placă b.a. h=' + (o.slab || 15) + 'cm · beton C25/30 · armare B500C · grinzi pe axe · direcție armare ↕', 'A-TEXT-NOTE', { align: 'center' });
      UX.scaleBar(doc, 0, -1000, 100, 10);
      UX.titleBlock(doc, { x: W + 1200, y: 0, proiect: o.proiect || 'Plan cofraj + armare planșeu', faza: o.faza || 'DTAC', plansa: o.plansa || 'R-02', scara: 100, beneficiar: o.beneficiar, data: o.data });
      if (o.params) try { UX.techNotes(doc, W + 1200, 65, o.params); } catch (e) {}
      return doc;
    };

    // ── SCHEMĂ INSTALAȚII (single-line) IS / IE / IT ──────────────────────
    UX.installationSchemeDoc = function (kind, o) {
      o = o || {}; var doc = UX.newDoc();
      var W = (o.width || 12) * K, D = (o.adancime || 10) * K, g = grid(o), gx = W / g.nGX, gy = D / g.nGY, i, j;
      doc.rect(0, 0, W, D, 'A-WALL-EXTR-D'); // contur cladire (referinta)
      var lay = kind === 'IE' ? 'M-HVAC-SUPP' : kind === 'IT' ? 'M-HVAC-RETN' : 'M-PIPE-CW';
      if (!UX.LAYERS[lay]) lay = 'A-TEXT-NOTE';
      var titles = { IS: 'INSTALAȚII SANITARE — schemă coloane apă/canal', IE: 'INSTALAȚII ELECTRICE — schemă monofilară + tablou general', IT: 'INSTALAȚII TERMICE / HVAC — schemă distribuție' };
      // sursa / tablou / centrala in colt
      var sx = 600, sy = 600; doc.rect(sx, sy, 2600, 1600, 'S-COLS-N');
      doc.text(sx + 1300, sy + 800, 300, kind === 'IE' ? 'TG (tablou general)' : kind === 'IT' ? 'CT (centrală termică)' : 'Branșament + apometru', 'A-TEXT-NOTE', { align: 'center' });
      // coloane verticale pe axe + racorduri
      for (i = 1; i < g.nGX; i++) { doc.line(i * gx, 400, i * gx, D - 400, lay); doc.circle(i * gx, 400, 160, lay); doc.text(i * gx, 200, 220, kind + '.' + i, 'A-TEXT-FINI', { align: 'center' }); }
      // magistrala orizontala de la sursa
      doc.line(sx + 1300, sy + 1600, sx + 1300, D - 800, lay); doc.line(sx + 1300, D - 800, W - 400, D - 800, lay);
      // consumatori (puncte) pe fiecare panou
      for (i = 0; i < g.nGX; i++) for (j = 0; j < g.nGY; j++) doc.circle(i * gx + gx / 2, j * gy + gy / 2, 120, lay);
      // legenda
      doc.text(400, D + 700, 240, kind === 'IE' ? 'Legendă: ● consumator · ○ coloană · TG tablou general · P.i. rezultă din bilanț (memoriu IE)' : kind === 'IT' ? 'Legendă: ● corp încălzire · ○ coloană · CT sursă termică · debit din breviar (memoriu IT)' : 'Legendă: ● obiect sanitar · ○ coloană · racord la colector · debite I9 (memoriu IS)', 'A-TEXT-FINI');
      doc.text(W / 2, D + 1300, 300, titles[kind] || ('Instalații ' + kind), 'A-TEXT-NOTE', { align: 'center' });
      UX.scaleBar(doc, 0, -900, 100, 10);
      UX.titleBlock(doc, { x: W + 1200, y: 0, proiect: o.proiect || titles[kind], faza: o.faza || 'DTAC', plansa: o.plansa || (kind + '-01'), scara: 100, beneficiar: o.beneficiar, data: o.data });
      if (o.params) try { UX.techNotes(doc, W + 1200, 65, o.params); } catch (e) {}
      return doc;
    };

    // ── SET COMPLET: arhitectură + rezistență + instalații ────────────────
    UX.buildFullSet = function (o) {
      o = o || {}; var s = [];
      var niv = Math.max(1, o.niv || 1);
      function add(key, label, plansa, doc) { s.push({ key: key, label: label, plansa: plansa, doc: doc }); }
      // ARHITECTURĂ
      add('situatie', 'Plan de situație', 'A-01', UX.siteplanDoc(Object.assign({}, o, { plansa: 'A-01' })));
      // plan parter — din camere reale daca exista, altfel parametric
      if (o.reledeeFloors && o.reledeeFloors[0]) add('plan_parter', 'Plan parter', 'A-02', UX.planFromReleveeFloor(o.reledeeFloors[0], Object.assign({}, o, { floorLabel: 'parter', plansa: 'A-02' })));
      else add('plan_parter', 'Plan parter', 'A-02', UX.floorPlanParametricDoc(Object.assign({}, o, { floorLabel: 'parter', plansa: 'A-02', cota: 0 })));
      if (niv > 1) {
        if (o.reledeeFloors && o.reledeeFloors[1]) add('plan_etaj', 'Plan etaj curent', 'A-03', UX.planFromReleveeFloor(o.reledeeFloors[1], Object.assign({}, o, { floorLabel: 'etaj curent', plansa: 'A-03' })));
        else add('plan_etaj', 'Plan etaj curent', 'A-03', UX.floorPlanParametricDoc(Object.assign({}, o, { floorLabel: 'etaj curent', plansa: 'A-03', cota: (o.hParter || 3) })));
      }
      add('acoperis', 'Plan acoperiș', 'A-04', UX.roofPlanDoc(Object.assign({}, o, { plansa: 'A-04' })));
      add('fatada_n', 'Fațadă principală (N)', 'A-05', UX.facadeDoc(Object.assign({}, o, { plansa: 'A-05', orient: 'principală N' })));
      add('fatada_s', 'Fațadă posterioară (S)', 'A-06', UX.facadeDoc(Object.assign({}, o, { plansa: 'A-06', orient: 'posterioară S' })));
      add('fatada_e', 'Fațadă laterală (E)', 'A-07', UX.facadeDoc(Object.assign({}, o, { width: o.adancime || o.width, winPerFloor: Math.max(1, Math.round((o.adancime || 10) / 3)), plansa: 'A-07', orient: 'laterală E' })));
      add('fatada_v', 'Fațadă laterală (V)', 'A-08', UX.facadeDoc(Object.assign({}, o, { width: o.adancime || o.width, winPerFloor: Math.max(1, Math.round((o.adancime || 10) / 3)), plansa: 'A-08', orient: 'laterală V' })));
      add('sect_aa', 'Secțiune A-A (longitudinală)', 'A-09', UX.sectionDoc(Object.assign({}, o, { plansa: 'A-09' })));
      add('sect_bb', 'Secțiune B-B (transversală)', 'A-10', UX.sectionDoc(Object.assign({}, o, { width: o.adancime || o.width, plansa: 'A-10' })));
      // REZISTENȚĂ
      add('fundatii', 'Plan fundații', 'R-01', UX.foundationPlanDoc(Object.assign({}, o, { plansa: 'R-01' })));
      add('cofraj', 'Plan cofraj + armare planșeu', 'R-02', UX.formworkPlanDoc(Object.assign({}, o, { plansa: 'R-02' })));
      // INSTALAȚII
      add('is', 'Instalații sanitare', 'IS-01', UX.installationSchemeDoc('IS', Object.assign({}, o, { plansa: 'IS-01' })));
      add('ie', 'Instalații electrice', 'IE-01', UX.installationSchemeDoc('IE', Object.assign({}, o, { plansa: 'IE-01' })));
      add('it', 'Instalații termice / HVAC', 'IT-01', UX.installationSchemeDoc('IT', Object.assign({}, o, { plansa: 'IT-01' })));
      return s;
    };

    // ── EXPORT PDF multi-pagină din primitive (deschizibil oriunde) ────────
    UX.sheetsToPdf = function (sheets, meta) {
      meta = meta || {};
      var JS = window.jspdf && window.jspdf.jsPDF; if (!JS) return null;
      var pdf = new JS({ orientation: 'landscape', unit: 'mm', format: 'a3' });
      var PW = 420, PH = 297, M = 12;
      function col(layer) { var L = UX.LAYERS[layer]; if (!L) return [30, 30, 30]; var c = L.color;
        if (c === 1) return [192, 57, 43]; if (c === 2) return [183, 149, 11]; if (c === 3) return [30, 132, 73]; if (c === 4) return [19, 141, 144]; if (c === 5) return [142, 68, 173]; if (c === 6) return [46, 92, 184]; if (c === 8 || c === 9) return [127, 140, 141]; if (c >= 250) return [149, 165, 166]; return [26, 26, 26]; }
      sheets.forEach(function (sh, idx) {
        if (idx > 0) pdf.addPage('a3', 'landscape');
        var prims = (sh.doc && sh.doc._prims) || [];
        var mnX = 1e15, mnY = 1e15, mxX = -1e15, mxY = -1e15;
        function ex(x, y) { if (x < mnX) mnX = x; if (x > mxX) mxX = x; if (y < mnY) mnY = y; if (y > mxY) mxY = y; }
        prims.forEach(function (e) { if (e.t === 'line') { ex(e.x1, e.y1); ex(e.x2, e.y2); } else if (e.t === 'poly') e.pts.forEach(function (q) { ex(q[0], q[1]); }); else if (e.t === 'circle' || e.t === 'arc') { ex(e.cx - e.r, e.cy - e.r); ex(e.cx + e.r, e.cy + e.r); } else if (e.t === 'text') ex(e.x, e.y); });
        if (mnX > mxX) { mnX = 0; mnY = 0; mxX = 1000; mxY = 1000; }
        var bw = mxX - mnX || 1, bh = mxY - mnY || 1;
        var sc = Math.min((PW - 2 * M) / bw, (PH - 2 * M) / bh);
        var offx = M + ((PW - 2 * M) - bw * sc) / 2, offy = M + ((PH - 2 * M) - bh * sc) / 2;
        function tx(x) { return offx + (x - mnX) * sc; }
        function ty(y) { return PH - (offy + (y - mnY) * sc); } // flip Y
        prims.forEach(function (e) {
          var c = col(e.l); pdf.setDrawColor(c[0], c[1], c[2]); pdf.setLineWidth(Math.max(0.08, ((UX.LAYERS[e.l] && UX.LAYERS[e.l].lw) || 0.25) * 0.5));
          try {
            if (e.t === 'line') pdf.line(tx(e.x1), ty(e.y1), tx(e.x2), ty(e.y2));
            else if (e.t === 'poly') { for (var i = 0; i < e.pts.length - 1; i++) pdf.line(tx(e.pts[i][0]), ty(e.pts[i][1]), tx(e.pts[i + 1][0]), ty(e.pts[i + 1][1])); if (e.closed && e.pts.length > 1) pdf.line(tx(e.pts[e.pts.length - 1][0]), ty(e.pts[e.pts.length - 1][1]), tx(e.pts[0][0]), ty(e.pts[0][1])); }
            else if (e.t === 'circle') pdf.circle(tx(e.cx), ty(e.cy), e.r * sc);
            else if (e.t === 'arc') { var steps = 16, a0 = e.a0 * Math.PI / 180, a1 = e.a1 * Math.PI / 180; if (a1 < a0) a1 += 2 * Math.PI; var px = e.cx + e.r * Math.cos(a0), py = e.cy + e.r * Math.sin(a0); for (var k2 = 1; k2 <= steps; k2++) { var a = a0 + (a1 - a0) * k2 / steps, nx = e.cx + e.r * Math.cos(a), ny = e.cy + e.r * Math.sin(a); pdf.line(tx(px), ty(py), tx(nx), ty(ny)); px = nx; py = ny; } }
            else if (e.t === 'text' && e.s) { pdf.setTextColor(11, 102, 68); var fs = Math.max(2.4, Math.min(14, e.h * sc * 2.6)); pdf.setFontSize(fs); pdf.text(String(e.s), tx(e.x), ty(e.y), { align: e.align === 'center' ? 'center' : 'left', angle: e.rot ? -e.rot : 0, baseline: 'middle' }); }
          } catch (ee) {}
        });
      });
      return pdf;
    };

    try { console.log('[UX planse-set] set complet planșe + PDF încărcat (' + '15 planșe: A/R/instalații)'); } catch (e) {}
  });
})();
