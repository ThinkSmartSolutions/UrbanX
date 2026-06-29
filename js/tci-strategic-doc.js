// ═══════════════════════════════════════════════════════════════════════════
// tci-strategic-doc.js — Motor de documente strategice DENSE (100+ pagini)
// Flux continuu cu auto-paginare (fara pagini pe sfert), cuprins cu numere de
// pagina (movePage), antet/subsol curente. Reutilizeaza datele + graficele din
// _TCIMasterplanPDF. Construieste Masterplanul extins. (PMUD intr-un val urmator.)
// Incarcat DUPA tci-masterplan.js.
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  const _jsPDF = () => (typeof jsPDF !== 'undefined') ? jsPDF : (window.jspdf && window.jspdf.jsPDF) || window.jsPDF || null;
  const MP = () => G._TCIMasterplanPDF;
  // PASTRAM diacriticele romanesti (fontul DejaVuRO le suporta). Normalizam doar
  // cateva caractere si eliminam ce nu e in subset (emoji etc.) ca sa nu apara casute.
  const _NORM = { ' ':' ','·':'-','‧':'-','„':'"','”':'"','“':'"','’':"'",'‚':"'",'…':'...','ş':'ș','Ş':'Ș','ţ':'ț','Ţ':'Ț' };
  const _KEEP = /[\t\n\r -ɏˆˇˉ˘-˝°²³«»–—‘’‚“”„†•…‰‹›€™→−✓]/;
  const S2 = s => {
    if (s == null) return '';
    var t = String(s);
    // i18n PDF: traduce string-urile CUNOSCUTE din dicționar când limba ≠ RO (titluri/anteturi/
    // etichete/disclaimer). Proza interpolată cu date nu e în dicționar → rămâne RO (corect).
    try { if (G.UrbanXI18n && G.UrbanXI18n.getCurrentLang() !== 'ro' && G.T) { var tt = t.trim(); if (tt) { var tr = G.T(tt); if (tr && tr !== tt) t = t.replace(tt, tr); } } } catch (e) {}
    var out = ''; for (var i = 0; i < t.length; i++) { var c = t[i]; if (_NORM[c] !== undefined) { out += _NORM[c]; } else if (_KEEP.test(c)) { out += c; } } return out;
  };
  // Transliterare RO->ASCII pt NUME DE FISIER (fara diacritice, fara underscore urat)
  const _DIA = {'ă':'a','â':'a','î':'i','ș':'s','ş':'s','ț':'t','ţ':'t','Ă':'A','Â':'A','Î':'I','Ș':'S','Ş':'S','Ț':'T','Ţ':'T'};
  const _ascii = s => String(s == null ? '' : s).replace(/[ăâîșşțţĂÂÎȘŞȚŢ]/g, c => _DIA[c] || c);
  G._asciiFile = _ascii; // expus pt PMUD / masterplan legacy
  // NUME DE FISIER SCURT, convenție unică (Florin 28 iun):
  //   parcelă/rang inferior:    <Scurt>_<nrCadastral>_<Localitate>.pdf  (ex. RCAI_149112_Iasi.pdf)
  //   teritorial/rang superior: <Scurt>_<UAT>_<An>.pdf                  (ex. RCAI_Iasi_2026.pdf)
  function _stratFileName(short, opts) {
    opts = opts || {};
    var loc = _ascii(opts.localitate || opts.uat || '').replace(/^(municipiul|comuna|ora[sș]ul?|sat)\s+/i, '').replace(/[^\w]+/g, '_').replace(/^_+|_+$/g, '');
    var parts;
    if (opts.mode === 'T' || opts.territorial) {
      parts = [short, loc, opts.year || (new Date().getFullYear())];
    } else {
      var nr = _ascii(opts.nrcad || 'parcela').replace(/[^\w]+/g, '_').replace(/^_+|_+$/g, '');
      parts = [short, nr, loc];
    }
    return (parts.filter(Boolean).join('_') + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_').replace(/_+/g, '_');
  }
  G._stratFileName = _stratFileName;
  // slug localitate pt nume de fișier (folosit și de motorul proiectant 10-studies)
  function _locSlug(s) { return _ascii(s == null ? '' : s).replace(/^(municipiul|comuna|ora[sș]ul?|sat)\s+/i, '').replace(/[^\w]+/g, '_').replace(/^_+|_+$/g, ''); }
  G._locSlug = _locSlug;
  const N = (v,d=0)=> isNaN(+v)?'-':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
  const RN = (v,d=2)=> isNaN(+v)?'-':Number(v).toFixed(d);
  const Pct = (v,d=1)=> (v>=0?'+':'')+Number(v).toFixed(d)+'%';

  // ── Motor de flux ──────────────────────────────────────────────────────
  function makeDoc(pdf, opts) {
    opts = opts || {};
    // Inregistram fontul cu diacritice (DejaVuRO) pe aceasta instanta -> diacritice reale.
    const _hasRO = (typeof window._registerROFont === 'function') ? window._registerROFont(pdf) : false;
    const FONT = _hasRO ? 'DejaVuRO' : 'helvetica';
    const W = 210, H = 297, ML = 18, MR = 18, MT = 22, MB = 15, CW = W - ML - MR;
    const ACCENT = opts.accent || [212, 175, 55];
    const INK = [28, 38, 58], SUB = [90, 102, 124], MUT = [130, 142, 162];
    const docTitle = opts.docTitle || 'DOCUMENT STRATEGIC';
    const cityName = opts.cityName || '';
    let y = MT, pageNum = 1;   // documentul incepe cu 1 pagina (coperta)
    const toc = [];           // {title, level, page}
    let chapterNo = 0, subNo = 0, subsubNo = 0;
    let suppressChrome = false; // pt cover
    // urmarim TOATE paginile (inclusiv cele adaugate de metodele MP full-page)
    const _addPageOrig = pdf.addPage.bind(pdf);
    pdf.addPage = function () { const r = _addPageOrig.apply(pdf, arguments); pageNum++; return r; };

    function band() {
      pdf.setFillColor(10, 18, 38); pdf.rect(0, 0, W, 13, 'F');
      pdf.setFillColor.apply(pdf, ACCENT); pdf.rect(0, 12.6, W, 0.5, 'F');
      pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont(FONT, 'bold'); pdf.setFontSize(7.5);
      pdf.text(S2(docTitle), ML, 8.6);
      pdf.setTextColor(120, 140, 170); pdf.setFont(FONT, 'normal'); pdf.setFontSize(7);
      pdf.text(S2(cityName), W - MR, 8.6, { align: 'right' });
    }
    function foot() {
      pdf.setDrawColor(210, 215, 224); pdf.setLineWidth(0.2); pdf.line(ML, H - 10, W - MR, H - 10);
      pdf.setTextColor.apply(pdf, MUT); pdf.setFont(FONT, 'normal'); pdf.setFontSize(6.4);
      pdf.text(S2('UrbanX · ' + docTitle + ' · ' + cityName), ML, H - 6.5);
      pdf.text(String(pageNum), W - MR, H - 6.5, { align: 'right' });
    }
    function newPage() { pdf.addPage(); pdf.setFillColor(255,255,255); pdf.rect(0,0,W,H,'F'); if(!suppressChrome){ band(); foot(); } y = MT + 4; }
    function ensure(h) { if (y + h > H - MB) newPage(); }
    function setY(v){ y = v; }

    // Primitive de continut
    function chapter(title, opts2) {
      opts2 = opts2 || {}; const first = chapterNo === 0; chapterNo++; subNo = 0; subsubNo = 0;
      // Evită dublarea numerelor: capitolul se numerotează automat (chapterNo).
      // Dacă titlul vine deja cu un număr manual ("4. ..." sau "4. A. ..."), îl strip.
      title = String(title || '').replace(/^\s*\d+\.\s*/, '');
      // ── Banda capitol cu ÎNĂLȚIME DINAMICĂ: titlurile lungi se sparg pe 2-3 linii
      // si banda creste ca sa NU le taie (bug paginare titluri). Masuram liniile la
      // fontul real de titlu inainte de a desena banda.
      var _tfs = 13;
      pdf.setFont(FONT, 'bold'); pdf.setFontSize(_tfs);
      var _tlines = pdf.splitTextToSize(S2(title), CW - 12);
      // reduce fontul daca titlul are >3 linii (titluri foarte lungi) ca sa ramana compact
      while (_tlines.length > 3 && _tfs > 10) { _tfs -= 0.5; pdf.setFontSize(_tfs); _tlines = pdf.splitTextToSize(S2(title), CW - 12); }
      // Spațiere aerisită (cerut Florin): eticheta CAPITOLUL respiră față de titlu,
      // padding generos sus/jos, linii de titlu mai aerate — aplicat la TOATE studiile/rapoartele.
      var _tlh = _tfs * 0.44 + 1.2;                       // ~6.9mm/linie la 13pt (mai aerisit)
      var _topPad = 6.5;                                  // y → baseline „CAPITOLUL"
      var _title1 = _topPad + 7.6;                        // gap clar label → titlu (~7.6mm)
      var bandH = _title1 + (_tlines.length - 1) * _tlh + 6.5;  // + padding jos
      if (bandH < 21) bandH = 21;
      // Capitolele CURG continuu; primul incepe pe pagina noua, restul doar daca nu mai e loc.
      if (first) newPage();
      else { ensure(bandH + 40); if (y > MT + 6) y += 7; }   // spațiu și ÎNAINTE de bandă
      // banda capitol (inaltime = bandH)
      pdf.setFillColor(12, 24, 56); pdf.rect(ML, y, CW, bandH, 'F'); pdf.setFillColor.apply(pdf, ACCENT); pdf.rect(ML, y, 2.4, bandH, 'F');
      pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont(FONT, 'bold'); pdf.setFontSize(7); pdf.setCharSpace && pdf.setCharSpace(0.3);
      pdf.text(S2('CAPITOLUL ' + chapterNo), ML + 6.5, y + _topPad);
      try { pdf.setCharSpace && pdf.setCharSpace(0); } catch (e) {}
      pdf.setTextColor(255, 255, 255); pdf.setFont(FONT, 'bold'); pdf.setFontSize(_tfs);
      for (var _i = 0; _i < _tlines.length; _i++) pdf.text(_tlines[_i], ML + 6.5, y + _title1 + _i * _tlh);
      y += bandH + 7;
      toc.push({ title: chapterNo + '. ' + title, level: 1, page: pageNum });
      return chapterNo;
    }
    function h2(title) {
      subNo++; subsubNo = 0; ensure(16);
      pdf.setTextColor.apply(pdf, INK); pdf.setFont(FONT, 'bold'); pdf.setFontSize(10.5);
      const lab = chapterNo + '.' + subNo + '  ' + title;
      const lines = pdf.splitTextToSize(S2(lab), CW);
      lines.forEach((l,i)=>pdf.text(l, ML, y + 4.5 + i*5));
      y += 4.5 + lines.length*5;
      pdf.setDrawColor.apply(pdf, ACCENT); pdf.setLineWidth(0.5); pdf.line(ML, y - 0.5, ML + 28, y - 0.5);
      y += 3.5;
      toc.push({ title: lab, level: 2, page: pageNum });
    }
    function h3(title) {
      subsubNo++; ensure(11);
      pdf.setTextColor(50, 62, 86); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9);
      pdf.text(S2(chapterNo + '.' + subNo + '.' + subsubNo + '  ' + title), ML, y + 4);
      y += 7.5;
    }
    // text JUSTIFY: aliniaza la ambele margini toate liniile dintr-un paragraf,
    // mai putin ultima (si liniile fara spatiu). Cerinta: toate rapoartele justify.
    // JUSTIFY MANUAL — distribuie spatiul intre cuvinte (merge cu ORICE font,
    // inclusiv DejaVuRO embedat; justify-ul nativ jsPDF nu e fiabil cu fonturi custom).
    function _jline(str, x, yy, w, last) {
      if (last || !str || str.indexOf(' ') <= 0) { pdf.text(str, x, yy); return; }
      var words = str.split(' ').filter(function (s) { return s.length; });
      if (words.length < 2) { pdf.text(str, x, yy); return; }
      var wW = 0; words.forEach(function (wd) { wW += pdf.getTextWidth(wd); });
      var gap = (w - wW) / (words.length - 1);
      var spaceW = pdf.getTextWidth(' ');
      // nu intinde liniile scurte (gap urias) — randeaza normal
      if (gap <= 0 || gap > spaceW * 4.5) { pdf.text(str, x, yy); return; }
      var cx = x;
      words.forEach(function (wd) { pdf.text(wd, cx, yy); cx += pdf.getTextWidth(wd) + gap; });
    }
    function P(text, o) {
      o = o || {}; const fs = o.fs || 8.6, lh = o.lh || 4.55, ind = o.indent || 0;
      pdf.setTextColor.apply(pdf, o.color || INK); pdf.setFont(FONT, o.bold ? 'bold' : 'normal'); pdf.setFontSize(fs);
      const lines = pdf.splitTextToSize(S2(text), CW - ind);
      const jw = CW - ind;
      // FIX page-break: ensure() poate insera o pagină nouă la mijlocul paragrafului, iar band()/foot()
      // resetează culoarea/fontul → liniile continuate ieșeau gri. Re-aplicăm stilul după fiecare ensure().
      for (let i = 0; i < lines.length; i++) { ensure(lh + 0.5); pdf.setTextColor.apply(pdf, o.color || INK); pdf.setFont(FONT, o.bold ? 'bold' : 'normal'); pdf.setFontSize(fs); _jline(lines[i], ML + ind, y + lh - 1, jw, o.noJustify || i === lines.length - 1); y += lh; }
      y += o.gap == null ? 2 : o.gap;
    }
    function bullets(arr, o) {
      o = o || {}; const fs = o.fs || 8.5, lh = o.lh || 4.4;
      arr.forEach(it => {
        const txt = Array.isArray(it) ? it : [null, it];
        const head = txt[0], body = S2(txt[1]);
        ensure(lh + 0.5);
        pdf.setFillColor.apply(pdf, ACCENT); pdf.circle(ML + 1.6, y + lh - 2.4, 0.85, 'F');
        pdf.setTextColor.apply(pdf, INK); pdf.setFontSize(fs);
        if (head) {
          // indent agatat: eticheta bold pe prima linie, corpul curge dupa ea fara depasire
          const hstr = S2(head) + ': ';
          pdf.setFont(FONT, 'bold'); const hw = pdf.getTextWidth(hstr); pdf.setFont(FONT, 'normal');
          const words = body.split(' '); const lines = []; let cur = '', maxW = CW - 6 - hw;
          words.forEach(w => { const test = cur ? cur + ' ' + w : w; if (pdf.getTextWidth(test) > maxW && cur) { lines.push(cur); cur = w; maxW = CW - 6; } else cur = test; });
          if (cur) lines.push(cur);
          for (let i = 0; i < lines.length; i++) {
            ensure(lh + 0.5); pdf.setTextColor.apply(pdf, INK); pdf.setFontSize(fs);
            if (i === 0) { pdf.setFont(FONT, 'bold'); pdf.text(hstr, ML + 5, y + lh - 1); pdf.setFont(FONT, 'normal'); _jline(lines[0], ML + 5 + hw, y + lh - 1, CW - 6 - hw, lines.length === 1); }
            else { _jline(lines[i], ML + 5, y + lh - 1, CW - 6, i === lines.length - 1); }
            y += lh;
          }
        } else {
          const lines = pdf.splitTextToSize(body, CW - 6);
          for (let i = 0; i < lines.length; i++) { ensure(lh + 0.5); pdf.setTextColor.apply(pdf, INK); pdf.setFont(FONT, 'normal'); pdf.setFontSize(fs); _jline(lines[i], ML + 5, y + lh - 1, CW - 6, i === lines.length - 1); y += lh; }
        }
        y += 0.8;
      });
      y += 1.5;
    }
    function table(headers, rows, colWs, o) {
      o = o || {}; const RH = o.rh || 6, fs = o.fs || 7, hfs = o.hfs || 6.8;
      let cw = colWs || headers.map(() => CW / headers.length);
      // SIGURANȚĂ: daca suma latimilor de coloana depaseste latimea utila (CW),
      // scaleaza proportional ca tabelul sa NU iasa din pagina (anti-overflow).
      var _csum = cw.reduce(function (a, b) { return a + b; }, 0);
      if (_csum > CW + 0.5) { var _ck = CW / _csum; cw = cw.map(function (c) { return c * _ck; }); }
      function drawHead() {
        // ÎNĂLȚIME ANTET DINAMICĂ: capetele de coloană lungi se sparg pe mai multe
        // linii si banda creste, ca sa NU se suprapuna peste primul rand (bug paginare).
        pdf.setFont(FONT, 'bold'); pdf.setFontSize(hfs);
        var hcells = headers.map(function (hh, i) { return pdf.splitTextToSize(S2(String(hh == null ? '' : hh)), cw[i] - 3); });
        var hmaxL = hcells.reduce(function (m, ls) { return Math.max(m, ls.length); }, 1);
        var headH = Math.max(RH, hmaxL * 3.3 + 2.6);
        ensure(headH + 2); pdf.setFillColor(14, 26, 54); pdf.rect(ML, y, CW, headH, 'F');
        var cx = ML; hcells.forEach(function (ls, i) { pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont(FONT, 'bold'); pdf.setFontSize(hfs); ls.forEach(function (ln, li) { pdf.text(ln, cx + 1.6, y + 3.6 + li * 3.3); }); cx += cw[i]; });
        y += headH;
      }
      drawHead();
      rows.forEach((r, ri) => {
        // calc inaltime rand (multi-linie)
        pdf.setFont(FONT, 'normal'); pdf.setFontSize(fs);
        let maxL = 1; const cells = r.map((c, i) => { const ls = pdf.splitTextToSize(S2(String(c == null ? '-' : c)), cw[i] - 3); maxL = Math.max(maxL, ls.length); return ls; });
        const rh = Math.max(RH, maxL * 3.5 + 2.5);
        if (y + rh > H - MB) { newPage(); drawHead(); }
        if (ri % 2 === 0) { pdf.setFillColor(244, 247, 251); pdf.rect(ML, y, CW, rh, 'F'); }
        let cx = ML; cells.forEach((ls, i) => { pdf.setTextColor.apply(pdf, i === 0 ? INK : [60, 72, 94]); pdf.setFont(FONT, i === 0 && o.boldFirst ? 'bold':'normal'); pdf.setFontSize(fs); ls.forEach((ln, li) => pdf.text(ln, cx + 1.6, y + 4 + li * 3.5)); cx += cw[i]; });
        pdf.setDrawColor(224, 228, 236); pdf.setLineWidth(0.1); pdf.line(ML, y + rh, ML + CW, y + rh);
        y += rh;
      });
      y += 3;
    }
    function source(t) { ensure(5); pdf.setTextColor.apply(pdf, MUT); pdf.setFont(FONT, 'italic'); pdf.setFontSize(6.6); const ls = pdf.splitTextToSize(S2('Sursa: ' + t), CW); ls.forEach(l=>{ensure(3.2);pdf.text(l, ML, y + 2.6);y+=3.2;}); y += 2; }
    function callout(title, text, col) {
      col = col || ACCENT;
      // FONT setat ÎNAINTE de splitTextToSize (altfel wrap-ul foloseste fontul anterior,
      // mai mic, si liniile ies din caseta cand se randeaza la 8.2pt) — fix overflow.
      pdf.setFont(FONT, 'normal'); pdf.setFontSize(8.2);
      const lines = pdf.splitTextToSize(S2(text), CW - 12); const hh = lines.length * 4.2 + 11;
      ensure(hh + 2); pdf.setFillColor(247, 249, 252); pdf.rect(ML, y, CW, hh, 'F'); pdf.setFillColor.apply(pdf, col); pdf.rect(ML, y, 2.4, hh, 'F');
      pdf.setTextColor.apply(pdf, col); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8.5); pdf.text(S2(title), ML + 6, y + 6);
      pdf.setTextColor.apply(pdf, INK); pdf.setFont(FONT, 'normal'); pdf.setFontSize(8.2);
      lines.forEach((l, i) => pdf.text(l, ML + 6, y + 11 + i * 4.2)); y += hh + 3;
    }
    function kpis(items) { // [{label,val,sub}]
      if (!items || !items.length) return;
      const n = items.length;
      // WRAP pe randuri ca sa NU se inghesuie / iasa din pagina (max 5 coloane)
      const cols = n <= 5 ? n : Math.min(5, Math.ceil(n / 2));
      const gap = 3, bw = (CW - gap * (cols - 1)) / cols, bh = 22;
      const rows = Math.ceil(n / cols);
      ensure(rows * (bh + gap) + 3);
      const y0 = y;
      items.forEach((it, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const x = ML + c * (bw + gap), yy = y0 + r * (bh + gap);
        pdf.setFillColor(12, 24, 56); pdf.rect(x, yy, bw, bh, 'F'); pdf.setFillColor.apply(pdf, ACCENT); pdf.rect(x, yy, bw, 1.2, 'F');
        // VALOARE — font auto-fit la latimea cardului (nu mai iese "4.6t CO2/loc")
        const vstr = S2(String(it.val)); const vf = fitFont(FONT, 'bold', 12, vstr, bw - 4);
        pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont(FONT, 'bold'); pdf.setFontSize(vf); pdf.text(vstr, x + bw / 2, yy + 8, { align: 'center' });
        // ETICHETA — max 2 linii, centrata
        pdf.setTextColor(200, 210, 224); pdf.setFont(FONT, 'normal'); pdf.setFontSize(6);
        const ll = pdf.splitTextToSize(S2(it.label), bw - 3).slice(0, 2);
        ll.forEach((l, li) => pdf.text(l, x + bw / 2, yy + 12 + li * 3.2, { align: 'center' }));
        // SUB — sub eticheta, fara suprapunere
        if (it.sub) { pdf.setTextColor(150, 165, 190); pdf.setFontSize(5.4); pdf.text(S2(it.sub), x + bw / 2, yy + 12 + ll.length * 3.2 + 1.6, { align: 'center', maxWidth: bw - 2 }); }
      });
      y = y0 + rows * (bh + gap) + 1;
    }
    // ── GRAFICE NATIVE (control complet, densitate mare) ───────────────────
    const PAL = [[59,130,246],[212,175,55],[34,160,90],[239,68,68],[168,85,247],[245,158,11],[20,184,166],[236,72,153]];
    function _axes(x0, top, plotW, plotH, mv, yfmt) {
      const baseY = top + plotH;
      pdf.setDrawColor(205,210,220); pdf.setLineWidth(0.2);
      pdf.line(x0, top, x0, baseY); pdf.line(x0, baseY, x0 + plotW, baseY);
      pdf.setFontSize(5.4); pdf.setFont(FONT,'normal'); pdf.setTextColor.apply(pdf, MUT);
      for (let g = 0; g <= 4; g++) { const gy = baseY - plotH * g / 4; pdf.setDrawColor(234,237,242); pdf.setLineWidth(0.1); if(g>0) pdf.line(x0, gy, x0 + plotW, gy); pdf.text((yfmt?yfmt(mv*g/4):N(Math.round(mv*g/4))), x0 - 1.5, gy + 1, { align: 'right' }); }
      return baseY;
    }
    function barChart(data, opts) { // data: [[label,val,color?],...]
      opts = opts || {}; const h = opts.h || 50, ttl = opts.title;
      ensure(h + (ttl?6:0) + (opts.source?7:0) + 6);
      if (ttl) { pdf.setTextColor.apply(pdf, INK); var _tf=fitFont(FONT,'bold',8,ttl,CW); pdf.setFontSize(_tf); pdf.text(S2(ttl), ML, y + 3.5); y += 6.5; }
      const x0 = ML + 12, plotW = CW - 14, plotH = h - 10, top = y;
      // suporta valori NEGATIVE: axa pleaca de la min (<=0) la max -> linie de zero
      var _vals = data.map(d => +d[1] || 0);
      var _max = Math.max.apply(null, _vals), _min = Math.min.apply(null, _vals);
      if (opts.max) _max = opts.max;
      if (_min > 0) _min = 0; if (_max < 0) _max = 0;
      if (_max === _min) _max = _min + 1;
      var span = (_max - _min) * 1.08 || 1;
      const baseY = top + plotH;                          // baza grila (jos)
      const zeroY = baseY - plotH * (0 - _min) / span;    // pozitia valorii 0
      // grila + axe (cu eticheta min/max corecte pt negative)
      pdf.setDrawColor(205,210,220); pdf.setLineWidth(0.2);
      pdf.line(x0, top, x0, baseY); pdf.line(x0, zeroY, x0 + plotW, zeroY);
      pdf.setFontSize(5.4); pdf.setFont(FONT,'normal'); pdf.setTextColor.apply(pdf, MUT);
      for (let g = 0; g <= 4; g++) { const gy = baseY - plotH * g / 4; const gv = _min + span * g / 4; pdf.setDrawColor(234,237,242); pdf.setLineWidth(0.1); if(g>0) pdf.line(x0, gy, x0 + plotW, gy); pdf.text((opts.yfmt?opts.yfmt(gv):N(Math.round(gv))), x0 - 1.5, gy + 1, { align: 'right' }); }
      const n = data.length, gap = plotW / n, bw = Math.min(gap * 0.62, 16);
      data.forEach((d, i) => { const v = +d[1] || 0, bh = plotH * v / span, bx = x0 + gap * i + (gap - bw) / 2, col = d[2] || ACCENT;
        pdf.setFillColor(col[0], col[1], col[2]);
        if (v >= 0) pdf.rect(bx, zeroY - bh, bw, bh, 'F'); else pdf.rect(bx, zeroY, bw, -bh, 'F');
        // eticheta valoare — peste bara pozitiva / sub bara negativa, clamp in plot
        var ly = v >= 0 ? zeroY - bh - 1.2 : zeroY - bh + 3.2;
        ly = Math.max(top + 2.4, Math.min(ly, baseY - 0.5));
        pdf.setTextColor.apply(pdf, INK); pdf.setFont(FONT,'bold'); pdf.setFontSize(5.6); pdf.text(opts.vfmt?opts.vfmt(v):N(v), bx + bw/2, ly, { align: 'center' });
        pdf.setTextColor.apply(pdf, SUB); pdf.setFont(FONT,'normal'); pdf.setFontSize(5.4); pdf.text(S2(String(d[0])), bx + bw/2, baseY + 3, { align: 'center', maxWidth: gap }); });
      y = baseY + 6; if (opts.source) source(opts.source);
    }
    function lineChart(series, xLabels, opts) { // series:[{name,color,points:[]}]
      opts = opts || {}; const h = opts.h || 54, ttl = opts.title;
      ensure(h + (ttl?6:0) + (opts.source?7:0) + 10);
      if (ttl) { pdf.setTextColor.apply(pdf, INK); var _tf=fitFont(FONT,'bold',8,ttl,CW); pdf.setFontSize(_tf); pdf.text(S2(ttl), ML, y + 3.5); y += 6.5; }
      const x0 = ML + 14, plotW = CW - 16, plotH = h - 10, top = y;
      let mx = 0, mn = opts.min!=null?opts.min:Infinity; series.forEach(s => s.points.forEach(p => { if (p > mx) mx = p; if (p < mn) mn = p; }));
      if (opts.min==null) mn = Math.min(mn, 0); mx = opts.max || mx * 1.1 || 1; const span = (mx - mn) || 1;
      const baseY = top + plotH; pdf.setDrawColor(205,210,220); pdf.setLineWidth(0.2); pdf.line(x0, top, x0, baseY); pdf.line(x0, baseY, x0 + plotW, baseY);
      pdf.setFontSize(5.4); pdf.setFont(FONT,'normal'); pdf.setTextColor.apply(pdf, MUT);
      for (let g = 0; g <= 4; g++) { const gy = baseY - plotH * g / 4; pdf.setDrawColor(234,237,242); pdf.setLineWidth(0.1); if(g>0) pdf.line(x0, gy, x0 + plotW, gy); pdf.text(N(Math.round(mn + span * g / 4)), x0 - 1.5, gy + 1, { align: 'right' }); }
      const np = xLabels.length;
      const px = i => x0 + plotW * (np>1?i/(np-1):0.5), py = v => baseY - plotH * (v - mn) / span;
      series.forEach(s => { const col = s.color || ACCENT; pdf.setDrawColor(col[0],col[1],col[2]); pdf.setLineWidth(0.7);
        for (let i = 1; i < s.points.length; i++) pdf.line(px(i-1), py(s.points[i-1]), px(i), py(s.points[i]));
        pdf.setFillColor(col[0],col[1],col[2]); s.points.forEach((v,i)=>pdf.circle(px(i), py(v), 0.7, 'F')); });
      pdf.setTextColor.apply(pdf, SUB); pdf.setFontSize(5.4); xLabels.forEach((l,i)=>pdf.text(S2(String(l)), px(i), baseY + 3, { align: 'center' }));
      y = baseY + 5;
      // legenda
      let lx = x0; pdf.setFontSize(6);
      series.forEach(s => { const col = s.color || ACCENT; pdf.setFillColor(col[0],col[1],col[2]); pdf.rect(lx, y - 2, 3, 1.6, 'F'); pdf.setTextColor.apply(pdf, SUB); pdf.text(S2(s.name), lx + 4, y); lx += 4 + pdf.getTextWidth(S2(s.name)) + 7; });
      y += 5; if (opts.source) source(opts.source);
    }
    function pie(slices, opts) { // slices:[[label,val,color?],...]
      opts = opts || {}; const R = opts.r || 22, ttl = opts.title; const boxH = R * 2 + (ttl?6:0) + 8;
      ensure(boxH + (opts.source?7:0));
      if (ttl) { pdf.setTextColor.apply(pdf, INK); var _tf=fitFont(FONT,'bold',8,ttl,CW); pdf.setFontSize(_tf); pdf.text(S2(ttl), ML, y + 3.5); y += 6.5; }
      const cx = ML + R + 4, cy = y + R, tot = slices.reduce((s, d) => s + (+d[1] || 0), 0) || 1;
      let a0 = -Math.PI / 2;
      slices.forEach((d, i) => { const frac = (+d[1] || 0) / tot, a1 = a0 + frac * 2 * Math.PI, col = d[2] || PAL[i % PAL.length];
        pdf.setFillColor(col[0], col[1], col[2]); const steps = Math.max(2, Math.ceil(frac * 40));
        for (let s = 0; s < steps; s++) { const t0 = a0 + (a1 - a0) * s / steps, t1 = a0 + (a1 - a0) * (s + 1) / steps; pdf.triangle(cx, cy, cx + R * Math.cos(t0), cy + R * Math.sin(t0), cx + R * Math.cos(t1), cy + R * Math.sin(t1), 'F'); }
        a0 = a1; });
      // legenda
      let ly = y + 2; const lx = cx + R + 8; pdf.setFontSize(6.4);
      slices.forEach((d, i) => { const col = d[2] || PAL[i % PAL.length], pc = Math.round((+d[1]||0)/tot*100); pdf.setFillColor(col[0],col[1],col[2]); pdf.rect(lx, ly - 2.4, 3.2, 3.2, 'F'); pdf.setTextColor.apply(pdf, INK); pdf.setFont(FONT,'normal'); pdf.text(S2(String(d[0]) + ' — ' + pc + '%'), lx + 4.5, ly, { maxWidth: CW - (lx - ML) - 6 }); ly += 5.2; });
      y += boxH; if (opts.source) source(opts.source);
    }
    // DONUT (pie cu gaura) — variatie vizuala pt compozitii
    function donut(slices, opts) {
      opts = opts || {}; const R = opts.r || 22, ri = R * 0.56, ttl = opts.title; const boxH = R * 2 + (ttl ? 6 : 0) + 8;
      ensure(boxH + (opts.source ? 7 : 0));
      if (ttl) { pdf.setTextColor.apply(pdf, INK); var _tf = fitFont(FONT, 'bold', 8, ttl, CW); pdf.setFontSize(_tf); pdf.text(S2(ttl), ML, y + 3.5); y += 6.5; }
      const cx = ML + R + 4, cy = y + R, tot = slices.reduce((s, d) => s + (+d[1] || 0), 0) || 1;
      let a0 = -Math.PI / 2;
      slices.forEach((d, i) => { const frac = (+d[1] || 0) / tot, a1 = a0 + frac * 2 * Math.PI, col = d[2] || PAL[i % PAL.length];
        pdf.setFillColor(col[0], col[1], col[2]); const steps = Math.max(2, Math.ceil(frac * 40));
        for (let s = 0; s < steps; s++) { const t0 = a0 + (a1 - a0) * s / steps, t1 = a0 + (a1 - a0) * (s + 1) / steps; pdf.triangle(cx, cy, cx + R * Math.cos(t0), cy + R * Math.sin(t0), cx + R * Math.cos(t1), cy + R * Math.sin(t1), 'F'); }
        a0 = a1; });
      pdf.setFillColor(255, 255, 255); pdf.circle(cx, cy, ri, 'F');   // gaura
      let ly = y + 2; const lx = cx + R + 8; pdf.setFontSize(6.4);
      slices.forEach((d, i) => { const col = d[2] || PAL[i % PAL.length], pc = Math.round((+d[1] || 0) / tot * 100); pdf.setFillColor(col[0], col[1], col[2]); pdf.rect(lx, ly - 2.4, 3.2, 3.2, 'F'); pdf.setTextColor.apply(pdf, INK); pdf.setFont(FONT, 'normal'); pdf.text(S2(String(d[0]) + ' — ' + pc + '%'), lx + 4.5, ly, { maxWidth: CW - (lx - ML) - 6 }); ly += 5.2; });
      y += boxH; if (opts.source) source(opts.source);
    }
    // HBAR (bare orizontale) — ideal pt etichete lungi (nu se suprapun ca la bar vertical)
    function hbar(data, opts) {
      opts = opts || {}; const ttl = opts.title, n = data.length;
      const rowH = Math.min(8, Math.max(5, 46 / Math.max(1, n))), h = n * rowH + 3;
      ensure(h + (ttl ? 6 : 0) + (opts.source ? 7 : 0) + 4);
      if (ttl) { pdf.setTextColor.apply(pdf, INK); var _tf = fitFont(FONT, 'bold', 8, ttl, CW); pdf.setFontSize(_tf); pdf.text(S2(ttl), ML, y + 3.5); y += 6.5; }
      const labW = Math.min(56, Math.max(24, CW * 0.34)), x0 = ML + labW, plotW = CW - labW - 16;
      const mv = opts.max || Math.max.apply(null, data.map(d => +d[1] || 0)) * 1.14 || 1;
      data.forEach((d, i) => { const v = +d[1] || 0, bw = plotW * Math.max(0, v) / mv, by = y + i * rowH, col = d[2] || ACCENT;
        pdf.setTextColor.apply(pdf, SUB); pdf.setFont(FONT, 'normal'); pdf.setFontSize(6); pdf.text(S2(String(d[0])), ML, by + rowH * 0.64, { maxWidth: labW - 2 });
        pdf.setFillColor(col[0], col[1], col[2]); pdf.rect(x0, by + rowH * 0.2, bw, rowH * 0.6, 'F');
        pdf.setTextColor.apply(pdf, INK); pdf.setFont(FONT, 'bold'); pdf.setFontSize(6); pdf.text(opts.vfmt ? opts.vfmt(v) : N(v), x0 + bw + 1.5, by + rowH * 0.64); });
      y += h; if (opts.source) source(opts.source);
    }
    // RADAR / SPIDER — ideal pt scoruri multi-dimensionale (5-8 axe). Variatie vizuala (model Kanban depth).
    function radar(axes, opts) { // axes:[[label,val,color?],...]
      opts = opts || {}; var ttl = opts.title, n = axes.length; if (n < 3) { return barChart(axes, opts); }
      var R = opts.r || 27, boxH = R * 2 + 16 + (ttl ? 6 : 0);
      ensure(boxH + (opts.source ? 7 : 0));
      if (ttl) { pdf.setTextColor.apply(pdf, INK); var _tf = fitFont(FONT, 'bold', 8, ttl, CW); pdf.setFontSize(_tf); pdf.text(S2(ttl), ML, y + 3.5); y += 6.5; }
      var cx = ML + CW / 2, cy = y + R + 5;
      var max = opts.max || Math.max.apply(null, axes.map(function (a) { return +a[1] || 0; })) || 1;
      var ang = function (i) { return -Math.PI / 2 + i * 2 * Math.PI / n; };
      // grilă concentrică (4 inele poligonale)
      pdf.setDrawColor(224, 228, 235); pdf.setLineWidth(0.15);
      for (var g = 1; g <= 4; g++) { var rr = R * g / 4; for (var i = 0; i < n; i++) { var a1 = ang(i), a2 = ang(i + 1); pdf.line(cx + rr * Math.cos(a1), cy + rr * Math.sin(a1), cx + rr * Math.cos(a2), cy + rr * Math.sin(a2)); } }
      // axe radiale + etichete
      pdf.setDrawColor(205, 210, 220); pdf.setLineWidth(0.2);
      for (var i = 0; i < n; i++) { var a = ang(i), ex = cx + R * Math.cos(a), ey = cy + R * Math.sin(a); pdf.line(cx, cy, ex, ey);
        var lx = cx + (R + 3.5) * Math.cos(a), ly = cy + (R + 3.5) * Math.sin(a), al = Math.abs(Math.cos(a)) < 0.35 ? 'center' : (Math.cos(a) > 0 ? 'left' : 'right');
        pdf.setTextColor.apply(pdf, MUT); pdf.setFont(FONT, 'normal'); pdf.setFontSize(5.3); pdf.text(S2(String(axes[i][0]).slice(0, 16)), lx, ly + 1, { align: al, maxWidth: 32 }); }
      // poligonul valorilor (contur + puncte + valori)
      var col = opts.color || ACCENT, pts = axes.map(function (d, i) { var a = ang(i), rr = R * Math.min(1, (+d[1] || 0) / max); return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; });
      pdf.setDrawColor(col[0], col[1], col[2]); pdf.setLineWidth(0.7);
      for (var i = 0; i < n; i++) { var j = (i + 1) % n; pdf.line(pts[i][0], pts[i][1], pts[j][0], pts[j][1]); }
      pdf.setFillColor(col[0], col[1], col[2]);
      axes.forEach(function (d, i) { pdf.circle(pts[i][0], pts[i][1], 0.8, 'F'); pdf.setTextColor.apply(pdf, INK); pdf.setFont(FONT, 'bold'); pdf.setFontSize(5.3); pdf.text(N(+d[1] || 0), pts[i][0], pts[i][1] - 1.2, { align: 'center' }); });
      y = cy + R + 9; if (opts.source) source(opts.source);
    }
    // ── PICKER UNIC de grafic (diversificat) — folosit IDENTIC de toate studiile/rapoartele
    // (deepRender + _autoChart RCAI/HBU + orice studiu nou). Sursă unică = stil uniform peste tot.
    function _pickChart(D2, headers, rows, title) {
      try {
        if (!D2 || !D2.barChart || !rows || rows.length < 2 || rows.length > 14) return false;
        var li = (headers ? headers.length : (rows[0] ? rows[0].length : 0)) - 1; if (li < 1) return false;
        var vals = rows.map(function (r) { return _num(r[li]); });
        var ok = vals.filter(function (v) { return v != null; }).length; if (ok < rows.length || ok < 2) return false;
        var uniq = {}; vals.forEach(function (v) { uniq[v] = 1; }); if (Object.keys(uniq).length < 2) return false;
        var labels0 = rows.map(function (r) { return ('' + (r[0] || '')).trim(); });
        var PALc = D2.PAL || [[59,130,246],[34,197,94],[249,115,22],[168,85,247],[234,179,8],[14,165,233]];
        var ttl = title || ((headers && headers[li]) || 'Valori') + ' — reprezentare grafică', src = 'Date din tabelul de mai sus';
        var isTime = labels0.length >= 3 && labels0.every(function (l) { return /(19|20)\d{2}/.test(l); });
        var allPos = vals.every(function (v) { return v != null && v >= 0; });
        var data = rows.map(function (r, i) { return [('' + (r[0] || ('#' + (i + 1)))).replace(/\s+/g, ' ').trim().slice(0, 28), vals[i], PALc[i % PALc.length]]; });
        if (isTime && D2.lineChart) { D2.lineChart([{ name: ((headers && headers[li]) || 'Serie').slice(0, 24), color: [37, 99, 235], points: vals }], labels0.map(function (l) { return (l.match(/(19|20)\d{2}/) || [l])[0]; }), { title: ttl, source: src }); return true; }
        var elig = []; if (D2.barChart) elig.push('bar'); if (D2.hbar) elig.push('hbar');
        if (D2.donut && allPos && rows.length <= 6) elig.push('donut');
        if (D2.pie && allPos && rows.length <= 5) elig.push('pie');
        if (D2.radar && allPos && rows.length >= 4 && rows.length <= 8) elig.push('radar');
        if (!elig.length) elig = ['bar'];
        var st = elig[(D2.__tci = (D2.__tci || 0) + 1) % elig.length];
        if (st === 'donut') D2.donut(data.map(function (r) { return [r[0].slice(0, 14), r[1], r[2]]; }), { title: ttl, source: src });
        else if (st === 'pie') D2.pie(data.map(function (r) { return [r[0].slice(0, 14), r[1], r[2]]; }), { title: ttl, source: src });
        else if (st === 'radar') D2.radar(data, { title: ttl, source: src });
        else if (st === 'hbar') D2.hbar(data, { title: ttl, source: src });
        else D2.barChart(data.map(function (r) { return [r[0].slice(0, 16), r[1], r[2]]; }), { title: ttl, source: src });
        return true;
      } catch (e) { return false; }
    }
    window._pickChart = _pickChart;
    // Ajusteaza marimea fontului ca textul sa incapa in latimea data (anti-overflow)
    function fitFont(font, style, base, str, maxW) {
      var fs = base; pdf.setFont(font, style); pdf.setFontSize(fs);
      while (pdf.getTextWidth(S2(str)) > maxW && fs > 5) { fs -= 0.3; pdf.setFontSize(fs); }
      return fs;
    }
    function formula(title, expr, where) {
      const wlines = where ? pdf.splitTextToSize(S2(where), CW - 12) : [];
      // formula: micsoreaza fontul ca sa incapa; daca tot e prea lata, o sparge pe linii
      // courier (monospace) NU are glife pt →/×/−/²/Σ etc -> sanitizam la ASCII.
      var maxFW = CW - 12;
      var exprS = S2(expr).replace(/Σ/g,'Suma ').replace(/→/g,' -> ').replace(/×/g,' x ').replace(/−/g,'-').replace(/²/g,'2').replace(/·/g,' * ').replace(/\s+/g,' ').trim();
      // Folosim FONTUL EMBEDDED (DejaVuRO), NU 'courier' — courier nu e embedded, deci
      // jsPDF rupea liniile cu metrica helvetica (îngustă) dar randa cu un fallback ~2x mai
      // lat → formula ieșea din pagină. Cu fontul real, splitTextToSize rupe corect.
      // Marjă de siguranță 0.92 pt eventuale subestimări de metrică.
      var safeW = maxFW * 0.92;
      var fs = 8.6; pdf.setFont(FONT, 'bold'); pdf.setFontSize(fs);
      var exprLines = pdf.splitTextToSize(exprS, safeW), _g = 0;
      while (_g++ < 14) {
        var _over = false; for (var _li = 0; _li < exprLines.length; _li++) { if (pdf.getTextWidth(exprLines[_li]) > maxFW) { _over = true; break; } }
        if (!_over || fs <= 5) break;
        fs -= 0.4; pdf.setFontSize(fs); exprLines = pdf.splitTextToSize(exprS, safeW);
      }
      var elh = 4.6;
      const hh = 8 + exprLines.length * elh + wlines.length * 3.6 + 4; ensure(hh + 2);
      pdf.setFillColor(245, 248, 252); pdf.rect(ML, y, CW, hh, 'F'); pdf.setFillColor.apply(pdf, ACCENT); pdf.rect(ML, y, 2, hh, 'F');
      pdf.setTextColor.apply(pdf, SUB); pdf.setFont(FONT, 'bold'); pdf.setFontSize(6.6); pdf.text(S2('FORMULA · ' + title), ML + 5, y + 4.5);
      pdf.setTextColor.apply(pdf, INK); pdf.setFont(FONT, 'bold'); pdf.setFontSize(fs);
      exprLines.forEach((l, i) => pdf.text(l, ML + 6, y + 10 + i * elh));
      var wy = y + 10 + exprLines.length * elh + 1;
      pdf.setFont(FONT, 'italic'); pdf.setFontSize(6.4); pdf.setTextColor.apply(pdf, MUT);
      wlines.forEach((l, i) => pdf.text(l, ML + 6, wy + i * 3.6));
      y += hh + 3;
    }
    function sourceBadges(list) { // ['INS','Eurostat',...]
      ensure(9); pdf.setTextColor.apply(pdf, MUT); pdf.setFont(FONT,'bold'); pdf.setFontSize(6); pdf.text('SURSE:', ML, y + 3);
      let bx = ML + 13; pdf.setFontSize(6.2);
      list.forEach(s => { const w = pdf.getTextWidth(S2(s)) + 5; if (bx + w > ML + CW) { bx = ML + 13; y += 6; ensure(7); } pdf.setFillColor(238, 242, 248); pdf.setDrawColor(200, 208, 220); pdf.setLineWidth(0.2); pdf.roundedRect(bx, y - 1.2, w, 5, 1, 1, 'FD'); pdf.setTextColor.apply(pdf, SUB); pdf.setFont(FONT,'normal'); pdf.text(S2(s), bx + 2.5, y + 2.2); bx += w + 3; });
      y += 8;
    }
    function spacer(h) { y += (h || 3); }
    // Integreaza o pagina/metoda MP full-page (deseneaza propria pagina). Numerotam capitolul.
    function fullPage(title, drawFn) {
      chapterNo++; subNo = 0; subsubNo = 0;
      toc.push({ title: chapterNo + '. ' + title, level: 1, page: pageNum + 1 });
      try { drawFn(); } catch (e) { console.warn('[StratDoc] fullPage esuat: ' + title, e); }
      y = H; // metoda MP a desenat propria pagina plina -> urmatorul capitol incepe pe pagina noua
    }
    // reutilizare grafice MP (iau (pdf,W,y,...) si returneaza y)
    function useMP(fn, estH, args) { ensure(estH || 40); const m = MP(); const r = m[fn].apply(m, [pdf, W, y].concat(args || [])); if (typeof r === 'number') y = r; y += 2; }

    return {
      pdf, get y(){return y}, setY, ensure, newPage, chapter, h2, h3, P, bullets, table, source, callout, kpis, spacer, useMP, fullPage,
      barChart, lineChart, pie, donut, hbar, radar, formula, sourceBadges, PAL,
      toc, get page(){return pageNum}, setPage:(p)=>{pageNum=p;}, _band:band, _foot:foot,
      setSuppress:(v)=>{suppressChrome=v;}, S2, N, RN, Pct, dims:{W,H,ML,MR,MT,MB,CW,ACCENT,INK,SUB,MUT},
    };
  }

  // ── Render corp dezvoltat (capitole _DEEP) + auto-grafic din tabele numerice ──
  // Reutilizabil de orice studiu (climate, economy, etc.) ca să atingă rangul superior.
  function _num(s){ if(typeof s==='number')return s; if(s==null)return null; var m=(''+s).replace(/\./g,'').replace(/,/g,'.').match(/-?\d+(\.\d+)?/); return m?parseFloat(m[0]):null; }

  // ── Context real al orașului pentru grafice (calculat o dată, cache pe D) ──
  function _gctx(D){
    if(D.__gctx) return D.__gctx;
    var ctx={ivuDims:null,score:null,grade:null,pop:null,growth:null,avg:null,name:null};
    try{
      var ck=(D.__cityKey)||(G.TCI&&G.TCI.cityKey);
      var city=(G._RO_CITIES_DB&&G._RO_CITIES_DB[ck])||(G.TCI&&G.TCI._EXTRA_UATS&&G.TCI._EXTRA_UATS[ck])||
        (G._TCIMasterplanPDF&&G._TCIMasterplanPDF._resolveCity&&G._TCIMasterplanPDF._resolveCity(ck))||{};
      ctx.name=city.name||'UAT';
      ctx.pop=city.pop2021||city.pop||null;
      // creștere pe deceniu (%) — pt prognoză demografică
      var g=city.rata_reala_2011_2021; if(g==null && city.r10!=null) g=city.r10*10; if(g==null) g=0;
      ctx.growth=g;
      if(G.UrbanXIVU&&G.UrbanXIVU.scoreFor){ var s=G.UrbanXIVU.scoreFor(ck); if(s&&s.R){ ctx.ivuDims=s.R.dims; ctx.score=s.R.score; ctx.grade=s.R.grade; } }
      if(G.UrbanXIVU&&G.UrbanXIVU.catalog){ try{ var cat=G.UrbanXIVU.catalog(); if(cat&&cat.length){ ctx.avg=Math.round(cat.reduce(function(a,b){return a+(b.R&&b.R.score||0);},0)/cat.length); } }catch(e){} }
    }catch(e){}
    D.__gctx=ctx; D.__gci=0; return ctx;
  }
  // Desenează un grafic din date REALE pe un capitol fără vizual propriu. Rotește un set
  // de vizualizări reale/prognoză ca să nu fie perete de text. Returnează true dacă a desenat.
  function _chapterGraphic(D, idx){
    try{
      if(!D || !D.barChart) return false;
      // REGULĂ (Florin 28 iun): graficele IVU/UAT (profil urban, dimensiuni, proiecție demografică)
      // NU se repetă în corpul capitolelor — apăreau de 8-10× și sunt irelevante în studii de
      // parcelă (ex. RCAI arheologic). Rămân DOAR în capitolul dedicat „Nota UrbanX (IVU)".
      // Graficele din DATELE proprii ale capitolului (tabele) rămân (le face _deepRender separat).
      if(!D.__allowChapterIVU) return false;
      var c=_gctx(D);
      var PAL=[[37,99,235],[34,197,94],[249,115,22],[168,85,247],[234,179,8],[14,165,233],[236,72,153],[20,184,166]];
      var opts=[];
      // 1. BAR — IVU pe dimensiuni
      if(c.ivuDims&&c.ivuDims.length) opts.push(function(){
        D.barChart(c.ivuDims.map(function(d,i){return [(''+d.label).split(' ')[0].slice(0,14), Math.round(d.score), PAL[i%PAL.length]];}),{title:'Nota UrbanX pe dimensiuni (0-100) — '+(c.name||''),max:100,source:'IVU UrbanX · date reale'}); });
      // 2. PIE — compoziția dimensiunilor IVU
      if(c.ivuDims&&c.ivuDims.length&&D.pie) opts.push(function(){
        D.pie(c.ivuDims.map(function(d,i){return [(''+d.label).split(' ')[0].slice(0,12), Math.round(d.score), PAL[i%PAL.length]];}),{title:'Profil IVU — contribuția dimensiunilor',source:'IVU UrbanX'}); });
      // 3. LINE — proiecție demografică 2011→2041
      if(c.pop&&D.lineChart) opts.push(function(){ var g=c.growth/100; var p2011=Math.round(c.pop/(1+(g||0.001))), p2031=Math.round(c.pop*(1+g)), p2041=Math.round(c.pop*(1+g)*(1+g));
        D.lineChart([{name:'Populație',color:[37,99,235],points:[p2011,Math.round(c.pop),p2031,p2041]}],['2011','2021','2031','2041'],{title:'Proiecție demografică — '+(c.name||'UAT')+' (trend '+(c.growth>=0?'+':'')+(c.growth||0).toFixed(1)+'%/deceniu)',source:'INS Recensământ + prognoză UrbanX'}); });
      // 4. BAR comparativ — oraș vs media națională vs țintă
      if(c.score!=null && c.avg!=null) opts.push(function(){
        D.barChart([[(c.name||'Oraș').slice(0,12),c.score,[34,197,94]],['Media națională',c.avg,[148,163,184]],['Țintă (A)',80,[59,130,246]]],{title:'Nota UrbanX — poziție și țintă',max:100,source:'IVU UrbanX · catalog național'}); });
      // 5. PIE — forte vs vulnerabilități
      if(c.ivuDims&&c.ivuDims.length>=4&&D.pie) opts.push(function(){ var s=c.ivuDims.slice().sort(function(a,b){return b.score-a.score;});
        var top=Math.round((s[0].score+s[1].score)/2), low=Math.round((s[s.length-1].score+s[s.length-2].score)/2);
        D.pie([['Puncte forte',top,[34,197,94]],['Vulnerabilități',low,[239,68,68]]],{title:'Echilibru forte / vulnerabilități (IVU)',source:'IVU UrbanX'}); });
      // 6. LINE — traiectoria IVU spre țintă
      if(c.score!=null&&D.lineChart) opts.push(function(){
        D.lineChart([{name:'IVU',color:[168,85,247],points:[c.score,Math.round((c.score+80)/2),80]}],['2026','2030','2035'],{title:'Traiectoria Notei UrbanX spre țintă (scenariu strategic)',source:'Model UrbanX'}); });
      // 7. BAR — priorități de intervenție (dimensiuni sortate crescător)
      if(c.ivuDims&&c.ivuDims.length>=3) opts.push(function(){ var s=c.ivuDims.slice().sort(function(a,b){return a.score-b.score;}).slice(0,5);
        D.barChart(s.map(function(d){var v=Math.round(d.score);return [(''+d.label).split(' ')[0].slice(0,14),v, v<50?[239,68,68]:v<65?[234,179,8]:[34,197,94]];}),{title:'Priorități de intervenție — dimensiuni cu potențial',max:100,source:'IVU UrbanX'}); });
      if(!opts.length) return false;
      var pick=opts[(D.__gci||0)%opts.length]; D.__gci=(D.__gci||0)+1;
      if(D.ensure) D.ensure(54);
      pick(); return true;
    }catch(e){ return false; }
  }
  window._chapterGraphic = _chapterGraphic;

  function deepRender(D, deepArr, CW){
    if(!D || !deepArr || !deepArr.length) return 0;
    var n=0;
    deepArr.forEach(function(ch){
      if(!ch || !ch.title) return;
      try{
        D.chapter(ch.title); n++;
        var hadVisual=false;
        (ch.blocks||[]).forEach(function(bl){
          try{
            if(bl.type==='p' && bl.text) D.P(bl.text);
            else if(bl.type==='bullets' && bl.items && bl.items.length && D.bullets) D.bullets(bl.items);
            else if(bl.type==='chart' && bl.data && bl.data.length && D.barChart){
              // bloc grafic explicit — acceptă AMBELE formate:
              //  (a) data=[[label,val],...]   (b) labels=[...] + data=[num,...] (+ chartType opțional)
              var pal2=[[59,130,246],[34,197,94],[249,115,22],[168,85,247],[234,179,8],[14,165,233]];
              var cd;
              if(bl.labels && bl.labels.length && typeof bl.data[0]!=='object'){
                cd=bl.labels.map(function(l,i){ return [(''+l).slice(0,18), _num(bl.data[i]), pal2[i%pal2.length]]; }).filter(function(r){return r[1]!=null;});
              } else {
                cd=bl.data.map(function(r,i){ return [(''+((Array.isArray(r)?r[0]:r)||('#'+(i+1)))).slice(0,18), _num(Array.isArray(r)?r[1]:r), (Array.isArray(r)&&r[2]&&r[2].length===3)?r[2]:pal2[i%pal2.length]]; }).filter(function(r){return r[1]!=null;});
              }
              if(cd.length>=2){
                var _ttl=bl.title||'Reprezentare grafică', _src=bl.source||'Date studiu', _ct=bl.chartType;
                if(_ct==='donut' && D.donut) D.donut(cd,{title:_ttl,source:_src});
                else if(_ct==='pie' && D.pie) D.pie(cd,{title:_ttl,source:_src});
                else if(_ct==='hbar' && D.hbar) D.hbar(cd,{title:_ttl,source:_src});
                else if(_ct==='radar' && D.radar && cd.length>=4) D.radar(cd,{title:_ttl,source:_src});
                else if((_ct==='line'||_ct==='linie') && D.lineChart) D.lineChart([{name:(''+_ttl).slice(0,22),color:[37,99,235],points:cd.map(function(r){return r[1];})}], cd.map(function(r){return r[0];}), {title:_ttl,source:_src});
                else D.barChart(cd, {title:_ttl, max:bl.max||0, source:_src});
                hadVisual=true;
              }
            }
            else if(bl.type==='table' && bl.headers && bl.rows && bl.rows.length && D.table){
              var nc=bl.headers.length||1; D.table(bl.headers, bl.rows, bl.headers.map(function(){return CW/nc;}));
              // grafic diversificat din tabel — PICKER UNIC (același în toate studiile/rapoartele)
              try{ if(window._pickChart && window._pickChart(D, bl.headers, bl.rows)) hadVisual=true; }catch(e){}
            }
          }catch(e){}
        });
        // REGULĂ: fiecare capitol are un element grafic — fallback cu date reale/prognoză
        if(!hadVisual){ try{ _chapterGraphic(D, n); }catch(e){} }
      }catch(e){}
    });
    return n;
  }

  // ── Construieste cuprinsul la final si il muta dupa coperta ──────────────
  function buildTOC(D, coverPages) {
    var TF = (D && D.pdf && D.pdf.__unicodeFont) ? 'DejaVuRO' : 'helvetica';
    const { pdf, dims } = D; const { W, ML, MR, MT, MB, CW, ACCENT, INK, MUT } = dims, H = 297;
    // ── Notă IVU pe COPERTĂ (brand UrbanX) — universal pentru toate documentele strategice ──
    try {
      if (G._ivuCoverNote && !pdf.__ivuStamped) {
        var _last = pdf.getNumberOfPages(); pdf.setPage(1);
        var _ck = (D && D.__cityKey) || (G.TCI && G.TCI.cityKey);
        G._ivuCoverNote(pdf, _ck, { y: 273, accent: ACCENT, bg: [20, 22, 34], font: TF, W: W, x: ML, w: CW });
        pdf.setPage(_last);
      }
    } catch (e) { console.warn('[StratDoc IVU cover]', e); }
    const entries = D.toc;
    const perPage = 46; const tocPages = Math.max(1, Math.ceil(entries.length / perPage));
    // numerele de pagina cresc cu tocPages (cuprinsul se insereaza inainte de continut)
    const startContentPage = coverPages; // paginile de continut incep dupa coperti
    // randam paginile TOC la finalul documentului
    let idx = 0;
    for (let p = 0; p < tocPages; p++) {
      pdf.addPage(); pdf.setFillColor(255,255,255); pdf.rect(0,0,W,H,'F');
      let yy = MT + 4;
      if (p === 0) { pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont(TF, 'bold'); pdf.setFontSize(16); pdf.text('CUPRINS', ML, yy + 4); yy += 14; }
      pdf.setFontSize(8.5);
      for (; idx < entries.length && (idx) < (p + 1) * perPage; idx++) {
        const e = entries[idx]; const pg = e.page + tocPages; // shift
        const indent = e.level === 1 ? 0 : 6;
        pdf.setFont(TF, e.level === 1 ? 'bold' : 'normal');
        pdf.setTextColor.apply(pdf, e.level === 1 ? INK : [70, 82, 104]);
        pdf.setFontSize(e.level === 1 ? 9 : 8);
        const t = S2(e.title); const maxT = CW - indent - 14;
        let tt = t; while (pdf.getTextWidth(tt) > maxT && tt.length > 4) tt = tt.slice(0, -2);
        pdf.text(tt + (tt.length<t.length?'...':''), ML + indent, yy + 3.6);
        pdf.setTextColor.apply(pdf, MUT); pdf.setFont(TF,'normal');
        pdf.text(String(pg), W - MR, yy + 3.6, { align: 'right' });
        yy += e.level === 1 ? 6.2 : 5;
        if (yy > H - MB - 4 && idx + 1 < (p + 1) * perPage) { /* va continua pe pagina urmatoare de TOC */ break; }
      }
    }
    // muta paginile TOC (ultimele tocPages) imediat dupa coperti, pastrand ordinea
    try {
      const total = pdf.getNumberOfPages();
      const firstTocIdx = total - tocPages + 1;   // prima pagina TOC (la final)
      for (let k = 0; k < tocPages; k++) {
        // pagina TOC k este la firstTocIdx+k (indicii mai mari raman neschimbati
        // la inserarile anterioare); o ducem la pozitia coverPages+1+k
        pdf.movePage(firstTocIdx + k, coverPages + 1 + k);
      }
    } catch (e) { console.warn('[StratDoc] movePage indisponibil, TOC ramane la final', e); }
    return tocPages;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // MASTERPLAN EXTINS — document strategic complet
  // ═══════════════════════════════════════════════════════════════════════
  G._StratMasterplan = {
    async generate(cityKey, scenario) {
      if (window._USER && _USER.email === 'office@m2msolutions.ro') { window.ss && ss('Generare dezactivată pentru acest cont'); return; }
      const J = _jsPDF(); const m = MP(); if (!J || !m) { window.ss && ss('Motor indisponibil'); return; }
      window.ss && ss('📘 Generez Masterplan Strategic extins (100+ pagini)...');
      try {
        const city = m._resolveCity(cityKey); if (!city) { ss && ss('UAT negasit'); return; }
        scenario = scenario || 'S2';
        const risk = (typeof _getRiskProfile === 'function') ? _getRiskProfile(city) : m._defaultRisk(city);
        const need = (typeof _calcUrbanNeedLocal === 'function') ? _calcUrbanNeedLocal(city, scenario) : m._calcNeed(city, scenario);
        const grav = (typeof _calcGravityLocal === 'function') ? _calcGravityLocal(city) : m._calcGravity(city);
        const climate = m._getClimate(city), housing = m._calcHousingMix(need, city, grav), invest = m._calcInvestment(need, city, risk), bench = m._calcBenchmark(city, grav), euComp = m._getEUComparable(city);
        // PUG + reguli
        let pugGeo = null, reguli = null;
        try { const reg = (window._PUG_REGISTRY || {})[cityKey]; if (reg) { const ff = u => u ? fetch(u).then(r => r.ok ? r.json() : null).catch(() => null) : Promise.resolve(null); const res = await Promise.race([Promise.all([ff(reg.pugFile), ff(reg.reguli)]), new Promise(rs => setTimeout(() => rs([null, null]), 8000))]); pugGeo = res && res[0]; reguli = res && res[1]; } } catch (e) {}

        const pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        pdf.__doc = 'Masterplan Strategic 2025-2055';
        const ctx = { pdf, W: 210, H: 297, cityKey, city, risk, need, grav, climate, housing, invest, bench, euComp, scenario, pugGeo, reguli,
          today: new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }), iso: new Date().toISOString().split('T')[0] };

        // COPERTI (2): folosim coperta premium existenta a MP pt prima pagina
        const D = makeDoc(pdf, { docTitle: 'MASTERPLAN STRATEGIC', cityName: city.name, accent: [212,175,55] });
        // QR deep-link (UAT+scenariu) pe coperta — restaureaza la scanare
        try { if (G._QRMasterplanPatch && G._QRGenerator) { const u = G._QRMasterplanPatch._buildShareURL(cityKey, scenario); window._currentShareURL = u; window._currentMasterplanQR = G._QRGenerator.generate(u, 100); } } catch (e) {}
        D.setSuppress(true); D.setPage(1);
        m._pg1_cover(ctx);            // pagina 1 = coperta premium (cu QR via patch)
        D.setSuppress(false);
        const coverPages = 1;

        // A3: capturi superbloc + indici pe harta UAT (orchestrare automata)
        let _mapShots = [];
        try { if (window._DocMapCaptures) _mapShots = await window._DocMapCaptures.capture(cityKey); } catch (e) {}

        G._StratMasterplanContent.build(D, ctx);   // toate capitolele

        // A3: planse cu indici pe harta
        try { if (window._DocMapCaptures) window._DocMapCaptures.renderPlates(D, _mapShots, 'Planse — modele urbane si indici pe harta UAT'); } catch (e) {}
        // Incheiere eleganta: concluzii + limitari + disclaimer (nu se termina brusc cu plansele)
        try { if (window._DocMapCaptures && window._DocMapCaptures.docClosing) window._DocMapCaptures.docClosing(D, 'masterplan', city.name); } catch (e) {}

        // CUPRINS dupa coperta
        buildTOC(D, coverPages);

        const fn = _stratFileName('Masterplan', { territorial: true, localitate: city.name || cityKey });
        pdf.save(fn);
        window.ss && ss('✅ Masterplan Strategic extins generat: ' + pdf.getNumberOfPages() + ' pagini · ' + city.name);
        return fn;
      } catch (err) { console.error('[StratMasterplan]', err); window.ss && ss('❌ Eroare Masterplan: ' + (err.message || err).slice(0, 80)); }
    }
  };

  window._makeStratDoc = makeDoc;
  window._buildStratTOC = buildTOC;
  window._deepRender = deepRender;
  console.log('[StratDoc] ✅ motor documente strategice incarcat');
})(window);
