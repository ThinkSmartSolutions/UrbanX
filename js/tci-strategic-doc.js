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
  const RO = { 'ă':'a','â':'a','î':'i','ș':'s','ş':'s','ț':'t','ţ':'t','Ă':'A','Â':'A','Î':'I','Ș':'S','Ş':'S','Ț':'T','Ţ':'T','–':'-','—':'-','…':'...','„':'"','”':'"','“':'"','’':"'",'•':'-','°':' gr','²':'2','³':'3','€':'EUR' };
  const S2 = s => s==null ? '' : String(s).split('').map(c=>RO[c]!==undefined?RO[c]:c).join('').replace(/[^\x20-\x7E]/g,' ');
  const N = (v,d=0)=> isNaN(+v)?'-':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
  const RN = (v,d=2)=> isNaN(+v)?'-':Number(v).toFixed(d);
  const Pct = (v,d=1)=> (v>=0?'+':'')+Number(v).toFixed(d)+'%';

  // ── Motor de flux ──────────────────────────────────────────────────────
  function makeDoc(pdf, opts) {
    opts = opts || {};
    const W = 210, H = 297, ML = 18, MR = 18, MT = 22, MB = 15, CW = W - ML - MR;
    const ACCENT = opts.accent || [212, 175, 55];
    const INK = [28, 38, 58], SUB = [90, 102, 124], MUT = [130, 142, 162];
    const docTitle = opts.docTitle || 'DOCUMENT STRATEGIC';
    const cityName = opts.cityName || '';
    let y = MT, pageNum = 0;
    const toc = [];           // {title, level, page}
    let chapterNo = 0, subNo = 0, subsubNo = 0;
    let suppressChrome = false; // pt cover

    function band() {
      pdf.setFillColor(10, 18, 38); pdf.rect(0, 0, W, 13, 'F');
      pdf.setFillColor.apply(pdf, ACCENT); pdf.rect(0, 12.6, W, 0.5, 'F');
      pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7.5);
      pdf.text(S2(docTitle), ML, 8.6);
      pdf.setTextColor(120, 140, 170); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7);
      pdf.text(S2(cityName), W - MR, 8.6, { align: 'right' });
    }
    function foot() {
      pdf.setDrawColor(210, 215, 224); pdf.setLineWidth(0.2); pdf.line(ML, H - 10, W - MR, H - 10);
      pdf.setTextColor.apply(pdf, MUT); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.4);
      pdf.text(S2('UrbanX · ' + docTitle + ' · ' + cityName), ML, H - 6.5);
      pdf.text(String(pageNum), W - MR, H - 6.5, { align: 'right' });
    }
    function newPage() { pdf.addPage(); pageNum++; pdf.setFillColor(255,255,255); pdf.rect(0,0,W,H,'F'); if(!suppressChrome){ band(); foot(); } y = MT + 4; }
    function ensure(h) { if (y + h > H - MB) newPage(); }
    function setY(v){ y = v; }

    // Primitive de continut
    function chapter(title, opts2) {
      opts2 = opts2 || {}; chapterNo++; subNo = 0; subsubNo = 0;
      newPage();
      // banda capitol
      pdf.setFillColor(12, 24, 56); pdf.rect(ML, y, CW, 16, 'F'); pdf.setFillColor.apply(pdf, ACCENT); pdf.rect(ML, y, 2.4, 16, 'F');
      pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7);
      pdf.text(S2('CAPITOLUL ' + chapterNo), ML + 6, y + 6);
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(13);
      pdf.text(S2(title), ML + 6, y + 12.5, { maxWidth: CW - 10 });
      y += 22;
      toc.push({ title: chapterNo + '. ' + title, level: 1, page: pageNum });
      return chapterNo;
    }
    function h2(title) {
      subNo++; subsubNo = 0; ensure(16);
      pdf.setTextColor.apply(pdf, INK); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(10.5);
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
      pdf.setTextColor(50, 62, 86); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9);
      pdf.text(S2(chapterNo + '.' + subNo + '.' + subsubNo + '  ' + title), ML, y + 4);
      y += 7.5;
    }
    function P(text, o) {
      o = o || {}; const fs = o.fs || 8.6, lh = o.lh || 4.55, ind = o.indent || 0;
      pdf.setTextColor.apply(pdf, o.color || INK); pdf.setFont('helvetica', o.bold ? 'bold' : 'normal'); pdf.setFontSize(fs);
      const lines = pdf.splitTextToSize(S2(text), CW - ind);
      for (let i = 0; i < lines.length; i++) { ensure(lh + 0.5); pdf.text(lines[i], ML + ind, y + lh - 1); y += lh; }
      y += o.gap == null ? 2 : o.gap;
    }
    function bullets(arr, o) {
      o = o || {}; const fs = o.fs || 8.5, lh = o.lh || 4.4;
      arr.forEach(it => {
        const txt = Array.isArray(it) ? it : [null, it];
        const head = txt[0], body = txt[1];
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(fs);
        const full = (head ? '' : '') + body;
        const lines = pdf.splitTextToSize(S2(full), CW - 6);
        ensure(lh + 0.5);
        pdf.setFillColor.apply(pdf, ACCENT); pdf.circle(ML + 1.6, y + lh - 2.4, 0.85, 'F');
        for (let i = 0; i < lines.length; i++) {
          ensure(lh + 0.5);
          if (i === 0 && head) { pdf.setFont('helvetica','bold'); pdf.setTextColor.apply(pdf,INK); pdf.text(S2(head+': '), ML+5, y+lh-1); const wlab=pdf.getTextWidth(S2(head+': ')); pdf.setFont('helvetica','normal'); pdf.setTextColor.apply(pdf,INK); pdf.text(lines[i], ML+5+wlab, y+lh-1); }
          else { pdf.setTextColor.apply(pdf, INK); pdf.text(lines[i], ML + 5, y + lh - 1); }
          y += lh;
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
        let cx = ML; headers.forEach((hh, i) => { pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(hfs); pdf.text(S2(hh), cx + 1.6, y + RH * 0.7, {maxWidth:cw[i]-3}); cx += cw[i]; });
        y += RH;
      }
      drawHead();
      rows.forEach((r, ri) => {
        // calc inaltime rand (multi-linie)
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(fs);
        let maxL = 1; const cells = r.map((c, i) => { const ls = pdf.splitTextToSize(S2(String(c == null ? '-' : c)), cw[i] - 3); maxL = Math.max(maxL, ls.length); return ls; });
        const rh = Math.max(RH, maxL * 3.5 + 2.5);
        if (y + rh > H - MB) { newPage(); drawHead(); }
        if (ri % 2 === 0) { pdf.setFillColor(244, 247, 251); pdf.rect(ML, y, CW, rh, 'F'); }
        let cx = ML; cells.forEach((ls, i) => { pdf.setTextColor.apply(pdf, i === 0 ? INK : [60, 72, 94]); pdf.setFont('helvetica', i === 0 && o.boldFirst ? 'bold':'normal'); pdf.setFontSize(fs); ls.forEach((ln, li) => pdf.text(ln, cx + 1.6, y + 4 + li * 3.5)); cx += cw[i]; });
        pdf.setDrawColor(224, 228, 236); pdf.setLineWidth(0.1); pdf.line(ML, y + rh, ML + CW, y + rh);
        y += rh;
      });
      y += 3;
    }
    function source(t) { ensure(5); pdf.setTextColor.apply(pdf, MUT); pdf.setFont('helvetica', 'italic'); pdf.setFontSize(6.6); const ls = pdf.splitTextToSize(S2('Sursa: ' + t), CW); ls.forEach(l=>{ensure(3.2);pdf.text(l, ML, y + 2.6);y+=3.2;}); y += 2; }
    function callout(title, text, col) {
      col = col || ACCENT; const lines = pdf.splitTextToSize(S2(text), CW - 12); const hh = lines.length * 4.2 + 11;
      ensure(hh + 2); pdf.setFillColor(247, 249, 252); pdf.rect(ML, y, CW, hh, 'F'); pdf.setFillColor.apply(pdf, col); pdf.rect(ML, y, 2.4, hh, 'F');
      pdf.setTextColor.apply(pdf, col); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8.5); pdf.text(S2(title), ML + 6, y + 6);
      pdf.setTextColor.apply(pdf, INK); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8.2);
      lines.forEach((l, i) => pdf.text(l, ML + 6, y + 11 + i * 4.2)); y += hh + 3;
    }
    function kpis(items) { // [{label,val,sub}]
      const n = items.length, gap = 3, bw = (CW - gap * (n - 1)) / n, bh = 18; ensure(bh + 3);
      items.forEach((it, i) => { const x = ML + i * (bw + gap); pdf.setFillColor(12, 24, 56); pdf.rect(x, y, bw, bh, 'F'); pdf.setFillColor.apply(pdf, ACCENT); pdf.rect(x, y, bw, 1.2, 'F');
        pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(12); pdf.text(S2(String(it.val)), x + bw / 2, y + 9, { align: 'center' });
        pdf.setTextColor(200, 210, 224); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.2); pdf.text(S2(it.label), x + bw / 2, y + 13.5, { align: 'center', maxWidth: bw - 3 });
        if (it.sub) { pdf.setTextColor(150, 165, 190); pdf.setFontSize(5.6); pdf.text(S2(it.sub), x + bw / 2, y + 16.5, { align: 'center', maxWidth: bw - 3 }); } });
      y += bh + 4;
    }
    function spacer(h) { y += (h || 3); }
    // reutilizare grafice MP (iau (pdf,W,y,...) si returneaza y)
    function useMP(fn, estH, args) { ensure(estH || 40); const m = MP(); const r = m[fn].apply(m, [pdf, W, y].concat(args || [])); if (typeof r === 'number') y = r; y += 2; }

    return {
      pdf, get y(){return y}, setY, ensure, newPage, chapter, h2, h3, P, bullets, table, source, callout, kpis, spacer, useMP,
      toc, get page(){return pageNum}, setPage:(p)=>{pageNum=p;}, _band:band, _foot:foot,
      setSuppress:(v)=>{suppressChrome=v;}, S2, N, RN, Pct, dims:{W,H,ML,MR,MT,MB,CW,ACCENT,INK,SUB,MUT},
    };
  }

  // ── Construieste cuprinsul la final si il muta dupa coperta ──────────────
  function buildTOC(D, coverPages) {
    const { pdf, dims } = D; const { W, ML, MR, MT, MB, CW, ACCENT, INK, MUT } = dims, H = 297;
    const entries = D.toc;
    const perPage = 46; const tocPages = Math.max(1, Math.ceil(entries.length / perPage));
    // numerele de pagina cresc cu tocPages (cuprinsul se insereaza inainte de continut)
    const startContentPage = coverPages; // paginile de continut incep dupa coperti
    // randam paginile TOC la finalul documentului
    let idx = 0;
    for (let p = 0; p < tocPages; p++) {
      pdf.addPage(); pdf.setFillColor(255,255,255); pdf.rect(0,0,W,H,'F');
      let yy = MT + 4;
      if (p === 0) { pdf.setTextColor.apply(pdf, ACCENT); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(16); pdf.text('CUPRINS', ML, yy + 4); yy += 14; }
      pdf.setFontSize(8.5);
      for (; idx < entries.length && (idx) < (p + 1) * perPage; idx++) {
        const e = entries[idx]; const pg = e.page + tocPages; // shift
        const indent = e.level === 1 ? 0 : 6;
        pdf.setFont('helvetica', e.level === 1 ? 'bold' : 'normal');
        pdf.setTextColor.apply(pdf, e.level === 1 ? INK : [70, 82, 104]);
        pdf.setFontSize(e.level === 1 ? 9 : 8);
        const t = S2(e.title); const maxT = CW - indent - 14;
        let tt = t; while (pdf.getTextWidth(tt) > maxT && tt.length > 4) tt = tt.slice(0, -2);
        pdf.text(tt + (tt.length<t.length?'...':''), ML + indent, yy + 3.6);
        pdf.setTextColor.apply(pdf, MUT); pdf.setFont('helvetica','normal');
        pdf.text(String(pg), W - MR, yy + 3.6, { align: 'right' });
        yy += e.level === 1 ? 6.2 : 5;
        if (yy > H - MB - 4 && idx + 1 < (p + 1) * perPage) { /* va continua pe pagina urmatoare de TOC */ break; }
      }
    }
    // muta paginile TOC (ultimele tocPages) imediat dupa coperti
    try {
      const total = pdf.getNumberOfPages();
      for (let k = 0; k < tocPages; k++) {
        // pagina TOC curenta e la finalul listei
        pdf.movePage(total, coverPages + 1 + k);
      }
    } catch (e) { console.warn('[StratDoc] movePage indisponibil, TOC ramane la final', e); }
    return tocPages;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // MASTERPLAN EXTINS — document strategic complet
  // ═══════════════════════════════════════════════════════════════════════
  G._StratMasterplan = {
    async generate(cityKey, scenario) {
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
        const ctx = { pdf, W: 210, H: 297, city, risk, need, grav, climate, housing, invest, bench, euComp, scenario, pugGeo, reguli,
          today: new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }), iso: new Date().toISOString().split('T')[0] };

        // COPERTI (2): folosim coperta premium existenta a MP pt prima pagina
        const D = makeDoc(pdf, { docTitle: 'MASTERPLAN STRATEGIC', cityName: city.name, accent: [212,175,55] });
        D.setSuppress(true); D.setPage(1);
        m._pg1_cover(ctx);            // pagina 1 = coperta premium (deja existenta)
        D.setSuppress(false);
        const coverPages = 1;

        G._StratMasterplanContent.build(D, ctx);   // toate capitolele

        // CUPRINS dupa coperta
        buildTOC(D, coverPages);

        const fn = ('Masterplan_Strategic_' + S2(city.name || cityKey) + '_' + ctx.iso + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
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
