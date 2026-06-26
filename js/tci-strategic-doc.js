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
  const S2 = s => { if (s == null) return ''; var out = ''; var t = String(s); for (var i = 0; i < t.length; i++) { var c = t[i]; if (_NORM[c] !== undefined) { out += _NORM[c]; } else if (_KEEP.test(c)) { out += c; } } return out; };
  // Transliterare RO->ASCII pt NUME DE FISIER (fara diacritice, fara underscore urat)
  const _DIA = {'ă':'a','â':'a','î':'i','ș':'s','ş':'s','ț':'t','ţ':'t','Ă':'A','Â':'A','Î':'I','Ș':'S','Ş':'S','Ț':'T','Ţ':'T'};
  const _ascii = s => String(s == null ? '' : s).replace(/[ăâîșşțţĂÂÎȘŞȚŢ]/g, c => _DIA[c] || c);
  G._asciiFile = _ascii; // expus pt PMUD / masterplan legacy
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
      // Capitolele CURG continuu (nu forteaza pagina noua) -> pagini dense, fara continut partial.
      // Primul capitol incepe pe pagina noua (dupa coperta); restul doar daca nu mai e loc.
      if (first) newPage();
      else { ensure(54); if (y > MT + 6) y += 5; }
      // banda capitol
      pdf.setFillColor(12, 24, 56); pdf.rect(ML, y, CW, 16, 'F'); pdf.setFillColor.apply(pdf, ACCENT); pdf.rect(ML, y, 2.4, 16, 'F');
      pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont(FONT, 'bold'); pdf.setFontSize(7);
      pdf.text(S2('CAPITOLUL ' + chapterNo), ML + 6, y + 6);
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(13);
      pdf.text(S2(title), ML + 6, y + 12.5, { maxWidth: CW - 10 });
      y += 22;
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
      for (let i = 0; i < lines.length; i++) { ensure(lh + 0.5); _jline(lines[i], ML + ind, y + lh - 1, jw, o.noJustify || i === lines.length - 1); y += lh; }
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
            ensure(lh + 0.5);
            if (i === 0) { pdf.setFont(FONT, 'bold'); pdf.text(hstr, ML + 5, y + lh - 1); pdf.setFont(FONT, 'normal'); _jline(lines[0], ML + 5 + hw, y + lh - 1, CW - 6 - hw, lines.length === 1); }
            else { _jline(lines[i], ML + 5, y + lh - 1, CW - 6, i === lines.length - 1); }
            y += lh;
          }
        } else {
          const lines = pdf.splitTextToSize(body, CW - 6);
          for (let i = 0; i < lines.length; i++) { ensure(lh + 0.5); pdf.setFont(FONT, 'normal'); _jline(lines[i], ML + 5, y + lh - 1, CW - 6, i === lines.length - 1); y += lh; }
        }
        y += 0.8;
      });
      y += 1.5;
    }
    function table(headers, rows, colWs, o) {
      o = o || {}; const RH = o.rh || 6, fs = o.fs || 7, hfs = o.hfs || 6.8;
      const cw = colWs || headers.map(() => CW / headers.length);
      function drawHead() {
        ensure(RH + 2); pdf.setFillColor(14, 26, 54); pdf.rect(ML, y, CW, RH, 'F');
        let cx = ML; headers.forEach((hh, i) => { pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont(FONT, 'bold'); pdf.setFontSize(hfs); pdf.text(S2(hh), cx + 1.6, y + RH * 0.7, {maxWidth:cw[i]-3}); cx += cw[i]; });
        y += RH;
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
      const mv = opts.max || Math.max.apply(null, data.map(d => +d[1] || 0)) * 1.12 || 1;
      const baseY = _axes(x0, top, plotW, plotH, mv, opts.yfmt);
      const n = data.length, gap = plotW / n, bw = Math.min(gap * 0.62, 16);
      data.forEach((d, i) => { const v = +d[1] || 0, bh = plotH * v / mv, bx = x0 + gap * i + (gap - bw) / 2, col = d[2] || ACCENT;
        pdf.setFillColor(col[0], col[1], col[2]); pdf.rect(bx, baseY - bh, bw, bh, 'F');
        pdf.setTextColor.apply(pdf, INK); pdf.setFont(FONT,'bold'); pdf.setFontSize(5.6); pdf.text(opts.vfmt?opts.vfmt(v):N(v), bx + bw/2, baseY - bh - 1.2, { align: 'center' });
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
    // Ajusteaza marimea fontului ca textul sa incapa in latimea data (anti-overflow)
    function fitFont(font, style, base, str, maxW) {
      var fs = base; pdf.setFont(font, style); pdf.setFontSize(fs);
      while (pdf.getTextWidth(S2(str)) > maxW && fs > 5) { fs -= 0.3; pdf.setFontSize(fs); }
      return fs;
    }
    function formula(title, expr, where) {
      const wlines = where ? pdf.splitTextToSize(S2(where), CW - 12) : [];
      // formula: micsoreaza fontul ca sa incapa; daca tot e prea lata, o sparge pe linii
      // courier (monospace) NU are glife pt →/×/−/² etc -> sanitizam la ASCII.
      var exprS = S2(expr).replace(/→/g,' -> ').replace(/×/g,' x ').replace(/−/g,'-').replace(/²/g,'2').replace(/·/g,'*').replace(/\s+/g,' ').trim();
      var fs = fitFont('courier', 'bold', 9.5, exprS, CW - 12);
      var exprLines = (pdf.getTextWidth(exprS) > CW - 12) ? pdf.splitTextToSize(exprS, CW - 12) : [exprS];
      var elh = 4.6;
      const hh = 8 + exprLines.length * elh + wlines.length * 3.6 + 4; ensure(hh + 2);
      pdf.setFillColor(245, 248, 252); pdf.rect(ML, y, CW, hh, 'F'); pdf.setFillColor.apply(pdf, ACCENT); pdf.rect(ML, y, 2, hh, 'F');
      pdf.setTextColor.apply(pdf, SUB); pdf.setFont(FONT, 'bold'); pdf.setFontSize(6.6); pdf.text(S2('FORMULA · ' + title), ML + 5, y + 4.5);
      pdf.setTextColor.apply(pdf, INK); pdf.setFont('courier', 'bold'); pdf.setFontSize(fs);
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
      barChart, lineChart, pie, formula, sourceBadges, PAL,
      toc, get page(){return pageNum}, setPage:(p)=>{pageNum=p;}, _band:band, _foot:foot,
      setSuppress:(v)=>{suppressChrome=v;}, S2, N, RN, Pct, dims:{W,H,ML,MR,MT,MB,CW,ACCENT,INK,SUB,MUT},
    };
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

        const fn = ('Masterplan_Strategic_' + _ascii(city.name || cityKey) + '_' + ctx.iso + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
        pdf.save(fn);
        window.ss && ss('✅ Masterplan Strategic extins generat: ' + pdf.getNumberOfPages() + ' pagini · ' + city.name);
        return fn;
      } catch (err) { console.error('[StratMasterplan]', err); window.ss && ss('❌ Eroare Masterplan: ' + (err.message || err).slice(0, 80)); }
    }
  };

  window._makeStratDoc = makeDoc;
  window._buildStratTOC = buildTOC;
  console.log('[StratDoc] ✅ motor documente strategice incarcat');
})(window);
