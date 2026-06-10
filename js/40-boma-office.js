// ═══════════════════════════════════════════════════════════════════════════
// 40-boma-office.js — BOMA 2017 + IPMS 3 + RICS CoMP + ANCPI — Birouri
// UrbanX TSS·FG | v1.0 | 10 Iunie 2026
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (typeof _RV !== 'undefined' && typeof _rvRenderPlan !== 'undefined') { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 250);
  }

  waitReady(() => {
    _injectBOMATab();
    _patchRenderForBOMA();
    console.log('[BOMA Office v1] ✅ BOMA 2017 + IPMS 3 + RICS activ');
  });

  // ── Detectare funcțiune birouri ────────────────────────────────────────
  function _isBirouri() {
    const fn = (window._RV?.fn || window.AEDIS?.fn || '').toLowerCase();
    return fn.includes('birouri') || fn.includes('office');
  }

  // ═══════════════════════════════════════════════════════════════════════
  // CALCUL BOMA per etaj
  // ═══════════════════════════════════════════════════════════════════════

  function _calcBOMAFloor(fl, b) {
    const rects = fl?.rects || [];
    const allR   = rects.filter(r => !r.bal && r.w > 0.3 && r.h > 0.3);
    const coreR  = allR.filter(r => r.t === 'core' || (r.apt < 0 && r.t === 'hall'));
    const corrR  = allR.filter(r => r.apt < 0 && r.t !== 'core');
    const offR   = allR.filter(r => r.apt >= 0 && r.t === 'office');
    const confR  = allR.filter(r => r.apt >= 0 && (r.t === 'living' || r.lbl?.includes('conf')));
    const srvR   = allR.filter(r => r.t === 'bath' || r.t === 'wc' || r.t === 'kitchen');
    const recR   = allR.filter(r => r.t === 'reception' || (r.apt < 0 && r.t === 'living'));

    const A = (arr) => arr.reduce((s, r) => s + r.w * r.h, 0);

    const coreArea = A(coreR);
    const corrArea = A(corrR);
    const offArea  = A(offR);
    const confArea = A(confR);
    const srvArea  = A(srvR);
    const recArea  = A(recR);

    const UA  = offArea + confArea;
    const SharedAmenity = corrArea + recArea + srvArea;
    const BCA = coreArea;
    const GIA = b.scArea || b.bW * b.bD;

    const RU_Ratio   = GIA > 0 ? GIA / Math.max(UA, 1) : 1;
    const RA         = UA * RU_Ratio;
    const LoadFactor = UA > 0 ? (RA - UA) / UA * 100 : 0;
    const LossFactor = GIA > 0 ? (GIA - UA) / GIA * 100 : 0;
    const EffRatio   = GIA > 0 ? UA / GIA * 100 : 0;

    return {
      UA, RA, RU_Ratio, LoadFactor, LossFactor, EffRatio,
      SharedAmenity, BCA, GIA,
      IPMS3_A: UA,
      RICS_NIA: UA * 0.97,
      ANCPI_SU: UA * 0.95,
      offArea, confArea, corrArea, recArea, srvArea, coreArea,
    };
  }

  function _calcBOMABuilding(b) {
    const floors = window._RV?.floors;
    if (!floors?.length) return null;
    const fd = floors.map((fl, fi) => ({
      floorIdx: fi,
      label: fi === 0 ? 'Parter' : 'Etaj ' + fi,
      ...(_calcBOMAFloor(fl, b)),
    }));
    const sum = (k) => fd.reduce((s, f) => s + (f[k] || 0), 0);
    const total = {
      UA: sum('UA'), RA: sum('RA'), GIA: sum('GIA'),
      offArea: sum('offArea'), confArea: sum('confArea'),
      coreArea: sum('coreArea'), RICS_NIA: sum('RICS_NIA'),
      ANCPI_SDA: b.sdaTotal || b.scArea * b.niv,
    };
    total.RU_Ratio   = total.UA > 0 ? total.RA / total.UA : 1;
    total.LoadFactor = total.UA > 0 ? (total.RA - total.UA) / total.UA * 100 : 0;
    total.LossFactor = total.GIA > 0 ? (total.GIA - total.UA) / total.GIA * 100 : 0;
    total.EffRatio   = total.GIA > 0 ? total.UA / total.GIA * 100 : 0;
    return { floors: fd, total };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // TAB BOMA
  // ═══════════════════════════════════════════════════════════════════════

  function _injectBOMATab() {
    const _try = () => {
      const tabsBar = document.querySelector('.rv-tabs');
      if (!tabsBar || document.getElementById('rv-tab-boma')) return false;

      const tab = document.createElement('div');
      tab.id = 'rv-tab-boma';
      tab.className = 'rv-tab';
      tab.setAttribute('data-tab', 'boma');
      tab.innerHTML = '📊 BOMA';
      tab.title = 'Suprafețe BOMA 2017 + IPMS 3 + RICS — standard internațional birouri';
      tab.style.cssText += ';color:#818CF8';

      tab.onclick = () => {
        document.querySelectorAll('.rv-tab').forEach(t => {
          t.classList.remove('rv-on');
        });
        tab.classList.add('rv-on');
        window._RV.tab = 'boma';
        _renderBOMACanvas();
      };

      // Adăugăm tab — vizibil mereu (nu doar birouri — util și pentru mixt)
      const situatieTab = document.querySelector('.rv-tab[data-tab="situatie"]');
      if (situatieTab) {
        situatieTab.parentNode.insertBefore(tab, situatieTab.nextSibling);
      } else {
        tabsBar.appendChild(tab);
      }
      return true;
    };

    if (_try()) return;
    const obs = new MutationObserver(() => { if (_try()) obs.disconnect(); });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 30000);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER CANVAS BOMA
  // ═══════════════════════════════════════════════════════════════════════

  window._renderBOMACanvas = function _renderBOMACanvas() {
    const b = window._RV?.building;
    if (!b) return;
    const boma = _calcBOMABuilding(b);
    if (!boma) return;
    const { floors, total } = boma;
    const P = b.P;
    const n = floors.length;

    const cols = [
      { h:'Nivel',        sub:'Etaj / Parter',                   w:60,  color:'#94A3B8' },
      { h:'UA (m²)',      sub:'Spațiu exclusiv chiriaș',          w:50,  color:'#F5C518' },
      { h:'RA (m²)',      sub:'Baza chirii (UA + common)',        w:50,  color:'#F5C518' },
      { h:'R/U Ratio',    sub:'Target ≤1.15 cls A',              w:44,  color:'#94A3B8' },
      { h:'Load Factor',  sub:'% extra față de UA · <15% bun',   w:52,  color:'#FCD34D' },
      { h:'Loss Factor',  sub:'% pierdut · <25% bun',            w:52,  color:'#FCD34D' },
      { h:'Eficiență %',  sub:'UA/GIA · >70% cls A',             w:48,  color:'#4ADE80' },
      { h:'IPMS3-A',      sub:'Standard global RICS/IVSC',       w:46,  color:'#818CF8' },
      { h:'RICS NIA',     sub:'Net Internal Area UK',            w:46,  color:'#818CF8' },
      { h:'ANCPI SU',     sub:'Suprafață utilă România',         w:46,  color:'#60A5FA' },
    ];
    const tW = cols.reduce((s, c) => s + c.w, 0) + 40;
    const W  = Math.max(tW + 80, 850);
    const rH = 22, hdrH = 55, thH = 28;
    const lgH = 260;
    const H   = hdrH + thH + n * rH + rH + 20 + lgH + 80;

    const cv = document.getElementById('rv-canvas');
    if (!cv) return;
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');

    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H);

    // Header
    ctx.fillStyle = '#0F172A'; ctx.fillRect(0, 0, W, hdrH);
    ctx.fillStyle = '#D4AF37'; ctx.fillRect(0, hdrH, W, 3);
    ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 14px IBM Plex Mono';
    ctx.textAlign = 'center';
    ctx.fillText('SUPRAFEȚE BOMA 2017  ·  IPMS 3  ·  RICS CoMP  ·  ANCPI', W / 2, 20);
    ctx.fillStyle = '#818CF8'; ctx.font = '10px IBM Plex Mono';
    ctx.fillText('Standard internațional evaluare, închiriere și vânzare spații birouri', W / 2, 35);
    ctx.fillStyle = '#64748B'; ctx.font = '8px IBM Plex Mono';
    ctx.fillText('Nr.cad. ' + (P?.nrCad || '—') + '  ·  ' + b.niv + ' niveluri  ·  ' + (total.GIA).toFixed(0) + ' m² GIA/nivel  ·  Birouri / Office', W / 2, 50);
    ctx.textAlign = 'left';

    let y = hdrH + 6;
    const pad = 20;

    // Antet tabel — 2 rânduri: titlu + explicație
    const thH2 = 38; // mai înalt pentru 2 rânduri
    ctx.fillStyle = '#1E293B'; ctx.fillRect(pad, y, W - pad * 2, thH2);
    // Linie de accent în antet
    ctx.fillStyle = 'rgba(212,175,55,.15)'; ctx.fillRect(pad, y + thH2 - 2, W - pad * 2, 2);

    let cx = pad;
    cols.forEach(col => {
      // Titlu coloană
      ctx.fillStyle = col.color || '#D4AF37';
      ctx.font = 'bold 8px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText(col.h, cx + col.w / 2, y + 13);
      // Subtext explicativ
      ctx.fillStyle = 'rgba(148,163,184,.8)';
      ctx.font = '6.5px IBM Plex Mono';
      // Wrap dacă e prea lung
      const sub = col.sub || '';
      if (ctx.measureText(sub).width < col.w - 4) {
        ctx.fillText(sub, cx + col.w / 2, y + 25);
      } else {
        // Split în 2 linii
        const words = sub.split(' · ');
        if (words.length > 1) {
          ctx.fillText(words[0], cx + col.w / 2, y + 23);
          ctx.fillText(words[1], cx + col.w / 2, y + 31);
        } else {
          ctx.fillText(sub.substring(0, 12), cx + col.w / 2, y + 25);
        }
      }
      // Separator vertical
      if (cx > pad) {
        ctx.strokeStyle = 'rgba(255,255,255,.06)'; ctx.lineWidth = 0.4;
        ctx.beginPath(); ctx.moveTo(cx, y + 4); ctx.lineTo(cx, y + thH2 - 4); ctx.stroke();
      }
      cx += col.w;
    });
    ctx.textAlign = 'left';
    y += thH2;

    // Rânduri etaje
    floors.forEach((fl, fi) => {
      ctx.fillStyle = fi % 2 === 0 ? '#F8FAFC' : '#F1F5F9';
      ctx.fillRect(pad, y, W - pad * 2, rH);
      ctx.strokeStyle = 'rgba(148,163,184,.15)'; ctx.lineWidth = 0.3;
      ctx.strokeRect(pad, y, W - pad * 2, rH);

      // Culori semantice per valoare
      const eC   = fl.EffRatio   >= 70 ? '#16A34A' : fl.EffRatio   >= 55 ? '#D97706' : '#DC2626';
      const lfC  = fl.LoadFactor <= 15 ? '#16A34A' : fl.LoadFactor <= 22 ? '#D97706' : '#DC2626';
      const losC = fl.LossFactor <= 25 ? '#16A34A' : fl.LossFactor <= 35 ? '#D97706' : '#DC2626';
      const ruC  = fl.RU_Ratio   <= 1.15 ? '#16A34A' : fl.RU_Ratio <= 1.25 ? '#D97706' : '#DC2626';

      const vals = [
        { v: fl.label,                  c: '#334155', bold: true  },
        { v: fl.UA.toFixed(1) + ' m²',  c: '#F5C518', bold: true  },
        { v: fl.RA.toFixed(1) + ' m²',  c: '#F5C518', bold: false },
        { v: fl.RU_Ratio.toFixed(3),    c: ruC,       bold: false },
        { v: fl.LoadFactor.toFixed(1) + '%', c: lfC,  bold: false },
        { v: fl.LossFactor.toFixed(1) + '%', c: losC, bold: false },
        { v: fl.EffRatio.toFixed(1) + '%',   c: eC,   bold: true  },
        { v: fl.IPMS3_A.toFixed(1),     c: '#818CF8', bold: false },
        { v: fl.RICS_NIA.toFixed(1),    c: '#818CF8', bold: false },
        { v: fl.ANCPI_SU.toFixed(1),    c: '#60A5FA', bold: false },
      ];
      cx = pad;
      vals.forEach((item, vi) => {
        ctx.fillStyle = item.c;
        ctx.font = (item.bold ? 'bold ' : '') + '9px IBM Plex Mono';
        ctx.textAlign = 'center';
        ctx.fillText(item.v, cx + cols[vi].w / 2, y + rH / 2 + 3);
        cx += cols[vi].w;
      });
      ctx.textAlign = 'left';
      y += rH;
    });

    // Rând total
    ctx.fillStyle = '#1E293B'; ctx.fillRect(pad, y, W - pad * 2, rH + 2);
    const eC2 = total.EffRatio >= 70 ? '#4ADE80' : total.EffRatio >= 55 ? '#FCD34D' : '#F87171';
    const totVals = [
      'TOTAL CLĂDIRE',
      total.UA.toFixed(1), total.RA.toFixed(1),
      total.RU_Ratio.toFixed(3),
      total.LoadFactor.toFixed(1) + '%', total.LossFactor.toFixed(1) + '%',
      total.EffRatio.toFixed(1) + '%',
      total.UA.toFixed(1), total.RICS_NIA.toFixed(1),
      (total.UA * 0.95).toFixed(1),
    ];
    cx = pad;
    totVals.forEach((v, vi) => {
      ctx.fillStyle = vi === 6 ? eC2 : '#F5C518';
      ctx.font = 'bold 9px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText(v, cx + cols[vi].w / 2, y + (rH + 2) / 2 + 3);
      cx += cols[vi].w;
    });
    ctx.textAlign = 'left';
    y += rH + 16;

    // Clasificare
    const cls = total.EffRatio >= 75 ? 'CLASA A+' : total.EffRatio >= 68 ? 'CLASA A' :
                total.EffRatio >= 58 ? 'CLASA B' : 'CLASA C';
    const clsC = total.EffRatio >= 75 ? '#D4AF37' : total.EffRatio >= 68 ? '#22C55E' :
                 total.EffRatio >= 58 ? '#F59E0B' : '#EF4444';
    ctx.fillStyle = 'rgba(15,23,42,.95)'; ctx.fillRect(pad, y, W - pad * 2, 44);
    ctx.fillStyle = clsC; ctx.font = 'bold 13px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('Eficiență BOMA: ' + total.EffRatio.toFixed(1) + '%  →  ' + cls, W / 2, y + 18);
    ctx.fillStyle = '#94A3B8'; ctx.font = '9px IBM Plex Mono';
    ctx.fillText(
      'UA: ' + total.UA.toFixed(0) + ' m²   RA: ' + total.RA.toFixed(0) + ' m²   GIA/nivel: ' + total.GIA.toFixed(0) + ' m²   Load Factor: ' + total.LoadFactor.toFixed(1) + '%',
      W / 2, y + 36
    );
    ctx.textAlign = 'left';
    y += 54;

    // Legendă
    // ── Panel interpretare culori ─────────────────────────────────────
    y += 8;
    const signals = [
      { color:'#16A34A', bg:'rgba(22,163,74,.1)', border:'rgba(22,163,74,.3)',
        title:'Verde = Bun', lines:['Eficiență >70%', 'Load Factor <15%', 'R/U Ratio ≤1.15'] },
      { color:'#D97706', bg:'rgba(217,119,6,.1)', border:'rgba(217,119,6,.3)',
        title:'Portocaliu = Acceptabil', lines:['Eficiență 55–70%', 'Load Factor 15–22%', 'R/U Ratio 1.15–1.25'] },
      { color:'#DC2626', bg:'rgba(220,38,38,.1)', border:'rgba(220,38,38,.3)',
        title:'Roșu = Slab', lines:['Eficiență <55%', 'Load Factor >22%', 'R/U Ratio >1.25'] },
    ];
    const sigW = (W - pad * 2 - 16) / 3;
    signals.forEach((sig, i) => {
      const sx = pad + i * (sigW + 8);
      ctx.fillStyle = sig.bg; ctx.strokeStyle = sig.border; ctx.lineWidth = 1;
      ctx.fillRect(sx, y, sigW, 52); ctx.strokeRect(sx, y, sigW, 52);
      // Indicator culoare
      ctx.fillStyle = sig.color;
      ctx.fillRect(sx, y, 4, 52);
      ctx.font = 'bold 8px IBM Plex Mono'; ctx.fillStyle = sig.color;
      ctx.textAlign = 'left';
      ctx.fillText(sig.title, sx + 10, y + 12);
      ctx.fillStyle = '#94A3B8'; ctx.font = '7px IBM Plex Mono';
      sig.lines.forEach((line, li) => ctx.fillText(line, sx + 10, y + 24 + li * 10));
    });
    ctx.textAlign = 'left';
    y += 62;

    // ── Glosar termeni ─────────────────────────────────────────────────
    ctx.fillStyle = '#1E293B'; ctx.fillRect(pad, y, W - pad * 2, 14);
    ctx.fillStyle = '#D4AF37'; ctx.font = 'bold 8px IBM Plex Mono';
    ctx.fillText('GLOSAR COMPLET TERMENI BOMA / IPMS / RICS / ANCPI', pad + 8, y + 10);
    y += 18;

    const gloss = [
      ['UA — Usable Area (BOMA 2017)', 'Spațiu exclusiv chiriaș: birouri + săli conferință. Fără zone comune, core, sanitare.'],
      ['RA — Rentable Area (BOMA 2017)', 'UA + cotă proporțională zone comune. Baza de calcul pentru chiria lunară.'],
      ['R/U Ratio', 'RA ÷ UA. Cls A: ≤1.15. Cu cât mai mic, cu atât chiriașul plătește mai puțin extra.'],
      ['Load Factor (Add-On Factor)', '(RA−UA)/UA×100%. Cls A: <15%. Peste 20% = dezavantaj în negociere.'],
      ['Loss Factor', '(GIA−UA)/GIA×100%. Pierdere globală. Bun: <25%. Slab: >35%.'],
      ['Eficiență %', 'UA/GIA×100%. Cls A: >70%. Cls B: 58–68%. Sub 55% = clădire ineficientă.'],
      ['IPMS 3 Component A', 'International Property Measurement Standards: spațiu exclusiv. Echivalent UA BOMA. Standard global RICS/IVSC.'],
      ['RICS NIA', 'RICS CoMP 2023: UA minus stâlpi + praguri + nișe <0.25m². Standard UK și evaluări internaționale.'],
      ['ANCPI SU', 'Suprafață Utilă cf. norme cadastrale România. Fără grosimea pereților interiori. Pentru CF + autorizare L50/1991.'],
    ];

    const gW = (W - pad * 2 - 8) / 2;
    gloss.forEach((item, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const gx = pad + col * (gW + 8), gy = y + row * 26;
      ctx.fillStyle = i % 4 < 2 ? 'rgba(129,140,248,.05)' : 'rgba(99,102,241,.03)';
      ctx.fillRect(gx, gy, gW, 24);
      ctx.fillStyle = '#818CF8'; ctx.font = 'bold 7.5px IBM Plex Mono';
      ctx.fillText(item[0], gx + 5, gy + 9);
      ctx.fillStyle = '#475569'; ctx.font = '7px IBM Plex Mono';
      // Simplu wrap
      const maxW = gW - 10;
      let line = '', lY = gy + 18;
      item[1].split(' ').forEach(w => {
        const t = line + w + ' ';
        if (ctx.measureText(t).width > maxW && line) {
          ctx.fillText(line.trim(), gx + 5, lY); line = w + ' '; lY += 8;
        } else line = t;
      });
      if (line.trim()) ctx.fillText(line.trim(), gx + 5, lY);
    });

    // Buton export
    _injectBOMAExportBtn(_calcBOMABuilding(b), b);
  };

  // ═══════════════════════════════════════════════════════════════════════
  // EXPORT XLSX / CSV
  // ═══════════════════════════════════════════════════════════════════════

  function _injectBOMAExportBtn(boma, b) {
    if (document.getElementById('rv-boma-export-btn')) return;
    const zb = document.querySelector('.rv-zoombar');
    if (!zb) return;
    const btn = document.createElement('button');
    btn.id = 'rv-boma-export-btn';
    btn.innerHTML = '📊 Export BOMA';
    btn.style.cssText = 'height:26px;padding:0 10px;border-radius:5px;margin-left:6px;border:1px solid rgba(129,140,248,.5);background:rgba(129,140,248,.1);color:#818CF8;cursor:pointer;font-size:9px;font-weight:700;font-family:IBM Plex Mono,monospace;flex-shrink:0';
    btn.onclick = () => _exportBOMA(boma, b);
    zb.appendChild(btn);
  }

  function _exportBOMA(boma, b) {
    const { floors, total } = boma;
    const P = b.P;

    // CSV fallback — funcționează fără librării externe
    const hdr = 'Nivel,UA (m2),RA (m2),R/U Ratio,Load Factor %,Loss Factor %,Eficienta %,IPMS3-A (m2),RICS NIA (m2),ANCPI SU (m2),Birouri (m2),Conf (m2),GIA (m2)';
    const rows = floors.map(fl =>
      [fl.label, fl.UA.toFixed(2), fl.RA.toFixed(2), fl.RU_Ratio.toFixed(3),
       fl.LoadFactor.toFixed(2), fl.LossFactor.toFixed(2), fl.EffRatio.toFixed(2),
       fl.IPMS3_A.toFixed(2), fl.RICS_NIA.toFixed(2), fl.ANCPI_SU.toFixed(2),
       fl.offArea.toFixed(2), fl.confArea.toFixed(2), fl.GIA.toFixed(2)
      ].join(',')
    );
    const totalRow = [
      'TOTAL', total.UA.toFixed(2), total.RA.toFixed(2), total.RU_Ratio.toFixed(3),
      total.LoadFactor.toFixed(2), total.LossFactor.toFixed(2), total.EffRatio.toFixed(2),
      total.UA.toFixed(2), total.RICS_NIA.toFixed(2), (total.UA * 0.95).toFixed(2),
      total.offArea.toFixed(2), total.confArea.toFixed(2), total.GIA.toFixed(2)
    ].join(',');

    const rezumat = [
      '', 'REZUMAT BOMA + IPMS + ANCPI',
      '', 'BOMA 2017 OFFICE',
      'Usable Area total (UA),' + total.UA.toFixed(2) + ' m2',
      'Rentable Area total (RA),' + total.RA.toFixed(2) + ' m2',
      'R/U Ratio (target <1.20 cls A),' + total.RU_Ratio.toFixed(3),
      'Load Factor % (target <15%),' + total.LoadFactor.toFixed(2) + '%',
      'Loss Factor %,' + total.LossFactor.toFixed(2) + '%',
      'Eficienta % (target >70% cls A),' + total.EffRatio.toFixed(2) + '%',
      '', 'ANCPI ROMANIA',
      'Suprafata Utila (SU),' + (total.UA * 0.95).toFixed(2) + ' m2',
      'Suprafata Construita (SC),' + total.GIA.toFixed(2) + ' m2',
      'Suprafata Desfasurata (SDA),' + total.ANCPI_SDA.toFixed(2) + ' m2',
      '', 'CLASIFICARE BOMA,' + (total.EffRatio >= 75 ? 'A+' : total.EffRatio >= 68 ? 'A' : total.EffRatio >= 58 ? 'B' : 'C'),
    ];

    const csv = [hdr, ...rows, totalRow, ...rezumat].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'BOMA_' + (P?.nrCad || 'birouri').replace(/[^a-z0-9]/gi, '_') + '_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    if (typeof ss === 'function') ss('✅ BOMA.csv descărcat — deschide în Excel sau Google Sheets');
  }

  // ═══════════════════════════════════════════════════════════════════════
  // OVERLAY BOMA pe Plan Nivel (mini-tabel în colț)
  // ═══════════════════════════════════════════════════════════════════════

  function _patchRenderForBOMA() {
    if (window._BOMA_RENDER_PATCHED) return;
    window._BOMA_RENDER_PATCHED = true;

    const orig = window._rvRender;
    if (!orig) return;
    window._rvRender = function () {
      const r = orig.apply(this, arguments);
      if (window._RV?.tab === 'plan' && _isBirouri()) {
        setTimeout(_addBOMAMiniTable, 120);
      }
      return r;
    };
  }

  function _addBOMAMiniTable() {
    const cv = document.getElementById('rv-canvas');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const b  = window._RV?.building;
    const fl = window._RV?.floors?.[window._RV?.floorIdx || 0];
    if (!b || !fl) return;
    const boma = _calcBOMAFloor(fl, b);
    const SC   = window._RV?.scale || 15;
    const P    = b.P;
    const pad  = 60;
    const ox   = pad + (P?.rl || 0) * SC;
    const oy   = pad + (P?.rf || 0) * SC;

    const tX = ox + b.bW * SC + 30;
    const tY = oy + b.bD * SC * 0.45;
    const tW = 148, tH = 118;

    ctx.fillStyle = 'rgba(15,23,42,.96)';
    ctx.strokeStyle = '#818CF8'; ctx.lineWidth = 1;
    ctx.fillRect(tX, tY, tW, tH);
    ctx.strokeRect(tX, tY, tW, tH);

    ctx.fillStyle = '#818CF8'; ctx.font = 'bold 7.5px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('BOMA 2017 — etaj curent', tX + tW / 2, tY + 11);
    ctx.fillStyle = 'rgba(129,140,248,.3)'; ctx.fillRect(tX, tY + 14, tW, 1);

    const rows = [
      ['Usable Area (UA)',     boma.UA.toFixed(1) + ' m²', '#F5C518'],
      ['Rentable Area (RA)',   boma.RA.toFixed(1) + ' m²', '#F5C518'],
      ['R/U Ratio',            boma.RU_Ratio.toFixed(3),   '#94A3B8'],
      ['Load Factor',          boma.LoadFactor.toFixed(1) + '%', '#94A3B8'],
      ['Eficiență',            boma.EffRatio.toFixed(1) + '%',
        boma.EffRatio >= 70 ? '#4ADE80' : boma.EffRatio >= 55 ? '#FCD34D' : '#F87171'],
      ['ANCPI SU',             boma.ANCPI_SU.toFixed(1) + ' m²', '#818CF8'],
    ];

    rows.forEach(([lbl, val, color], i) => {
      const iy = tY + 22 + i * 15;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,.03)' : 'transparent';
      ctx.fillRect(tX, iy - 4, tW, 14);
      ctx.fillStyle = '#64748B'; ctx.font = '7px IBM Plex Mono'; ctx.textAlign = 'left';
      ctx.fillText(lbl, tX + 5, iy + 5);
      ctx.fillStyle = color; ctx.font = 'bold 8px IBM Plex Mono'; ctx.textAlign = 'right';
      ctx.fillText(val, tX + tW - 5, iy + 5);
    });
    ctx.textAlign = 'left';
  }

  window._bomaCalc = _calcBOMABuilding;

})();
