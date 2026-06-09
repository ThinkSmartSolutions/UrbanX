// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-deviz.js — Deviz Estimativ + Extras Materiale + Memoriu Tehnic
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// DOCUMENTE GENERATE:
//   1. Deviz estimativ conform HG 907/2016 (structura obligatorie)
//      — Capitolele 1-6 ale devizului general
//      — Prețuri actualizate 2024-2025 (euro/mp SDA)
//      — Pe categorii de funcțiune (rezidențial, birouri, hotel, industrial)
//
//   2. Extras de materiale principale
//      — Cantități calculate din geometria clădirii
//      — Beton, armatură, zidărie, termoizolație, tâmplărie, finisaje
//      — Format util la cerere ofertă constructor
//
//   3. Memoriu tehnic orientativ
//      — Date parcela + indicatori urbanistici
//      — Soluție structurală propusă
//      — Normative aplicabile
//      — Avize necesare (calculat din funcțiune + suprafață)
//
//   4. Cartuș corect pe planșe
//      — Format standard românesc (conform SR ISO 7200)
//      — Câmpuri pentru semnătură arhitect OAR (goale — de completat)
//      — Avertizare clară "Document orientativ"
//
// ⚠ AVERTIZARE LEGALĂ:
//   Aceste documente sunt ORIENTATIVE și nu înlocuiesc:
//   - Devizul general semnat de arhitect + verificator MDLPA (Legea 10/1995)
//   - Proiectul tehnic elaborat de arhitect cu drept de semnătură OAR
//   - Documentația pentru obținerea Autorizației de Construire (Legea 50/1991)
//
// INSTALARE: adaugă în index.html după 15-relevee-dna-optimize.js
//   <script src="js/15-relevee-deviz.js?v=20260609"></script>
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 120) return;
    if (typeof _RV === 'undefined' || typeof _rvRenderPlan === 'undefined') {
      setTimeout(() => waitReady(cb, n + 1), 300); return;
    }
    cb();
  }

  waitReady(() => {
    _injectButtons();
    _patchCartus();
    console.log('[Deviz v1] ✅ loaded — deviz HG907 + extras + memoriu + cartuș corect');
  });

  // ─── Injectare butoane ──────────────────────────────────────────────────
  function _injectButtons() {
    if (document.getElementById('rv-deviz-wrap')) return;
    const anchor = document.querySelector('#rv-optim-wrap, #rv-prezentare-btn, .rv-expbtn');
    if (!anchor) { setTimeout(_injectButtons, 800); return; }

    const wrap = document.createElement('span');
    wrap.id = 'rv-deviz-wrap';

    const btns = [
      { id: 'rv-deviz-btn', icon: '💰', label: 'Deviz Estimativ', fn: '_rvExportDeviz', bg: 'rgba(245,158,11,.15)', border: 'rgba(245,158,11,.5)', color: '#fbbf24' },
      { id: 'rv-extras-btn', icon: '📦', label: 'Extras Materiale', fn: '_rvExportExtras', bg: 'rgba(34,197,94,.10)', border: 'rgba(34,197,94,.4)', color: '#4ade80' },
      { id: 'rv-memoriu-btn', icon: '📄', label: 'Memoriu Tehnic', fn: '_rvExportMemoriu', bg: 'rgba(96,165,250,.12)', border: 'rgba(96,165,250,.4)', color: '#93c5fd' },
    ];

    btns.forEach(b => {
      const btn = document.createElement('button');
      btn.id = b.id; btn.innerHTML = b.icon + ' ' + b.label;
      btn.style.cssText = [
        'height:32px', 'padding:0 11px', 'border-radius:7px', 'cursor:pointer',
        'font-family:inherit', 'font-size:10px', 'font-weight:800', 'margin-left:5px',
        `background:${b.bg}`, `border:1.5px solid ${b.border}`, `color:${b.color}`,
        'display:inline-flex', 'align-items:center', 'flex-shrink:0',
      ].join(';');
      btn.onmouseover = () => btn.style.opacity = '.75';
      btn.onmouseout = () => btn.style.opacity = '1';
      btn.onclick = () => window[b.fn]?.();
      wrap.appendChild(btn);
    });

    anchor.parentElement.insertBefore(wrap, anchor.nextSibling);
  }

  // ─── Patch cartuș ──────────────────────────────────────────────────────
  function _patchCartus() {
    window._rvDrawCartus = function (ctx, W, H, P, floorIdx, subtitle) {
      if (!P) return;
      // Cartuș standard SR ISO 7200 adaptat
      const cW = 280, cH = 72;
      const cx = W - cW - 6, cy = H - cH - 6;

      // Fundal
      ctx.fillStyle = 'rgba(255,255,255,.97)';
      ctx.fillRect(cx, cy, cW, cH);
      ctx.strokeStyle = '#1E293B'; ctx.lineWidth = 1.2;
      ctx.strokeRect(cx, cy, cW, cH);

      // Linie verticală — împarte în coloana date (stânga) și coloana semnături (dreapta)
      const midX = cx + cW * 0.62;
      ctx.beginPath(); ctx.moveTo(midX, cy); ctx.lineTo(midX, cy + cH); ctx.stroke();

      // Linii orizontale în coloana stânga
      [1 / 4, 2 / 4, 3 / 4].forEach(f => {
        ctx.beginPath();
        ctx.moveTo(cx, cy + cH * f); ctx.lineTo(midX, cy + cH * f);
        ctx.stroke();
      });

      // Linii orizontale în coloana dreapta (semnături)
      [1 / 3, 2 / 3].forEach(f => {
        ctx.beginPath();
        ctx.moveTo(midX, cy + cH * f); ctx.lineTo(cx + cW, cy + cH * f);
        ctx.stroke();
      });

      // Conținut coloana stânga
      ctx.fillStyle = '#64748B'; ctx.font = '5px Arial'; ctx.textAlign = 'left';
      const lx = cx + 3;

      ctx.fillText('NR. CADASTRAL / UAT', lx, cy + cH * 0.14);
      ctx.fillStyle = '#0F172A'; ctx.font = 'bold 8px Arial';
      ctx.fillText((P.nrCad || '—') + ' · ' + (P.utr || '—'), lx, cy + cH * 0.24);

      ctx.fillStyle = '#64748B'; ctx.font = '5px Arial';
      ctx.fillText('FUNCȚIUNE / REGIM ÎNĂLȚIME', lx, cy + cH * 0.39);
      ctx.fillStyle = '#0F172A'; ctx.font = 'bold 7px Arial';
      const fnLabel = typeof _rvGetAEDISConfig === 'function' ? (_rvGetAEDISConfig().fnLabel || P.fn || '—') : (P.fn || '—');
      ctx.fillText(fnLabel.slice(0, 32) + ' · P+' + ((P.niv || 1) - 1) + ' · H=' + ((P.niv || 1) * (P.hn || 3)).toFixed(1) + 'm', lx, cy + cH * 0.49);

      ctx.fillStyle = '#64748B'; ctx.font = '5px Arial';
      ctx.fillText('PLANȘĂ / SCARA', lx, cy + cH * 0.64);
      ctx.fillStyle = '#0F172A'; ctx.font = 'bold 7px Arial';
      const planLabel = subtitle || (floorIdx != null ? (floorIdx === 0 ? 'PLAN PARTER' : 'PLAN ETAJ ' + floorIdx) : 'PLAN');
      ctx.fillText(planLabel.slice(0, 36), lx, cy + cH * 0.74);

      ctx.fillStyle = '#64748B'; ctx.font = '5px Arial';
      ctx.fillText('POT=' + Math.round((P.pot || 0) * 100) + '%  CUT=' + (P.cut || '—') + '  Sc. 1:' + Math.round(100 / ((_RV.scale || 12) / 12)), lx, cy + cH * 0.89);
      ctx.fillStyle = '#334155'; ctx.font = 'italic 5px Arial';
      ctx.fillText('Data: ' + new Date().toLocaleDateString('ro-RO'), lx, cy + cH * 0.97);

      // Coloana dreapta — semnături
      ctx.fillStyle = '#64748B'; ctx.font = '5px Arial'; ctx.textAlign = 'center';
      const mx = midX + (cx + cW - midX) / 2;

      ctx.fillText('PROIECTANT (Arhitect OAR)', mx, cy + cH * 0.08);
      ctx.fillStyle = '#94A3B8'; ctx.font = 'italic 5.5px Arial';
      ctx.fillText('Semnătură + Parafă', mx, cy + cH * 0.22);
      ctx.fillText('Nr. OAR: ___________', mx, cy + cH * 0.30);

      ctx.fillStyle = '#64748B'; ctx.font = '5px Arial';
      ctx.fillText('ȘEF PROIECT', mx, cy + cH * 0.41);
      ctx.fillStyle = '#94A3B8'; ctx.font = 'italic 5.5px Arial';
      ctx.fillText('Semnătură', mx, cy + cH * 0.55);

      ctx.fillStyle = '#64748B'; ctx.font = '5px Arial';
      ctx.fillText('BENEFICIAR', mx, cy + cH * 0.72);
      ctx.fillStyle = '#94A3B8'; ctx.font = 'italic 5.5px Arial';
      ctx.fillText('Semnătură + Ștampilă', mx, cy + cH * 0.86);

      // Avertizare jos
      ctx.fillStyle = 'rgba(239,68,68,.8)'; ctx.font = 'bold 5px Arial'; ctx.textAlign = 'center';
      ctx.fillText('⚠ DOCUMENT ORIENTATIV — Nu înlocuiește proiectul tehnic autorizat (Legea 50/1991)', cx + cW / 2, cy + cH - 2);

      // Logo UrbanX mic
      ctx.fillStyle = 'rgba(212,175,55,.6)'; ctx.font = 'bold 5px Arial'; ctx.textAlign = 'left';
      ctx.fillText('UrbanX TSS·FG', cx + 3, cy + cH - 2);

      ctx.textAlign = 'left';
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // PREȚURI UNITARE 2024–2025
  // Surse: INS, MDLPA, publicații devize
  // ═══════════════════════════════════════════════════════════════════════
  const PRET_CONSTRUCTIE = {
    // €/mp SDA — total construcție (structură + finisaje + instalații)
    rez_standard:   750,   // rezidențial colectiv standard
    rez_premium:    1050,  // rezidențial premium
    birouri_cls_b:  900,
    birouri_cls_a:  1250,
    hotel_3stele:   1100,
    hotel_4stele:   1500,
    comercial:      850,
    industrial:     450,
    subsol_parcare: 600,   // €/mp SC subsol
  };

  // Coeficienți pentru categorii HG 907/2016 (% din valoare construcție)
  const COEF_HG907 = {
    studii:         0.005, // Cap.1 — studii, expertize, topografie
    obtinere_avize: 0.010, // Cap.2 — avize, acorduri, autorizații
    proiectare:     0.060, // Cap.3 — proiectare + verificare + asisțență
    org_santier:    0.025, // Cap.5.2 — organizare șantier
    diverse:        0.100, // Cap.5.3 — diverse și neprevăzute
    tva:            0.19,  // TVA 19%
  };

  // Coeficienți structurali per tip construcție (% din total construcție)
  const COEF_CAPITOLE = {
    terasamente:    0.03,
    fundatii:       0.10,
    structura:      0.30,
    zidarie_fatade: 0.12,
    termoizolatie:  0.06,
    invelitoare:    0.04,
    tamplarie:      0.08,
    finisaje:       0.12,
    instalatii_san: 0.06,
    instalatii_el:  0.05,
    instalatii_inc: 0.04,
  };

  // ─── Determină prețul per funcțiune ────────────────────────────────────
  function _pretPerFn(fn) {
    const f = String(fn || '').toLowerCase();
    if (f.includes('hotel')) return PRET_CONSTRUCTIE.hotel_3stele;
    if (f.includes('birouri')) return PRET_CONSTRUCTIE.birouri_cls_b;
    if (f.includes('industrial') || f.includes('depozit')) return PRET_CONSTRUCTIE.industrial;
    if (f.includes('com')) return PRET_CONSTRUCTIE.comercial;
    return PRET_CONSTRUCTIE.rez_standard;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 1. DEVIZ ESTIMATIV — HG 907/2016
  // ═══════════════════════════════════════════════════════════════════════

  window._rvExportDeviz = async function () {
    const b = window._RV?.building, P = window._RV?.parcelParams;
    if (!b || !P) { alert('Generați releveele mai întâi.'); return; }
    if (typeof ss === 'function') ss('⏳ Generez deviz estimativ HG 907/2016…');

    const _jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!_jsPDF) { alert('jsPDF indisponibil.'); return; }

    const pdf = new _jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const PW = 210, PH = 297;
    const S2 = s => String(s || '').replace(/[^\x20-\x7E\u00C0-\u024F]/g, ' ').trim();
    const AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};

    const fn = window.AEDIS?.fn || P.fn || 'rez';
    const pretUnit = _pretPerFn(fn);
    const sda = b.sdaTotal || b.bW * b.bD * b.niv;
    const sc = b.scArea || b.bW * b.bD;
    const subsolSC = (b.subsolNiv || 0) * sc;

    const valConstr = sda * pretUnit + subsolSC * PRET_CONSTRUCTIE.subsol_parcare;
    const EUR = v => new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(v));
    const EUR2 = v => new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

    // ── HEADER ───────────────────────────────────────────────────────────
    pdf.setFillColor(15, 23, 42); pdf.rect(0, 0, PW, 20, 'F');
    pdf.setFillColor(245, 158, 11); pdf.rect(0, 19.5, PW, 0.8, 'F');
    pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(13);
    pdf.text('DEVIZ GENERAL ESTIMATIV', PW / 2, 10, { align: 'center' });
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.setTextColor(180, 200, 230);
    pdf.text(S2('conform HG 907/2016 · Prețuri orientative 2024–2025 · Valori în Euro fără TVA'), PW / 2, 15.5, { align: 'center' });

    let y = 25;

    // ── AVERTIZARE ────────────────────────────────────────────────────────
    pdf.setFillColor(254, 252, 232); pdf.rect(10, y, PW - 20, 11, 'F');
    pdf.setDrawColor(245, 158, 11); pdf.setLineWidth(0.3); pdf.rect(10, y, PW - 20, 11, 'S');
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7); pdf.setTextColor(146, 64, 14);
    pdf.text('⚠ DOCUMENT ORIENTATIV — Nu înlocuiește devizul general întocmit de proiectant autorizat', PW / 2, y + 4.5, { align: 'center' });
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6); pdf.setTextColor(100, 80, 30);
    pdf.text('Valorile sunt estimative. Devizul general obligatoriu conform Legea 10/1995 + HG 907/2016 se elaborează de arhitect cu drept de semnătură OAR.', PW / 2, y + 9, { align: 'center' });
    y += 15;

    // ── DATE INVESTIȚIE ───────────────────────────────────────────────────
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.setTextColor(15, 23, 42);
    pdf.text('DATE INVESTIȚIE', 14, y); y += 6;

    const dataRows = [
      ['Amplasament', S2('Nr.cad. ' + P.nrCad + ', UAT ' + (P.uatLabel || '—') + ', jud. ' + (P.judet || '—'))],
      ['Funcțiune propusă', S2(AC.fnLabel || fn)],
      ['Regim înălțime', 'P+' + (b.niv - 1) + ' · H totală = ' + (b.niv * (P.hn || 3)).toFixed(2) + 'm'],
      ['Suprafață teren', EUR(P.area) + ' mp'],
      ['SC amprentă clădire', EUR(sc) + ' mp (POT=' + (sc / P.area * 100).toFixed(1) + '%)'],
      ['SDA (Suprafața Desfășurată)', EUR(sda) + ' mp (CUT=' + (sda / P.area).toFixed(2) + ')'],
      ['Subsol parcare', b.subsolNiv > 0 ? b.subsolNiv + ' nivel(uri) · ' + EUR(subsolSC) + ' mp' : 'Nu este prevăzut'],
      ['Preț unitar estimat', EUR(pretUnit) + ' €/mp SDA (' + S2(AC.fnLabel || fn) + ', standard 2024–2025)'],
    ];

    dataRows.forEach(([lbl, val], i) => {
      const ry = y + i * 7;
      pdf.setFillColor(i % 2 === 0 ? 248 : 242, 250, 255);
      pdf.rect(10, ry - 3, PW - 20, 6.5, 'F');
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6); pdf.setTextColor(30, 40, 90);
      pdf.text(S2(lbl), 12, ry + 0.5);
      pdf.setFont('helvetica', 'normal'); pdf.setTextColor(50, 70, 120);
      pdf.text(S2(val), 85, ry + 0.5);
    });
    y += dataRows.length * 7 + 6;

    // ── CAPITOLELE DEVIZULUI (HG 907/2016) ────────────────────────────────
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.setTextColor(15, 23, 42);
    pdf.text('DEVIZ GENERAL — CAPITOLELE 1–6 (HG 907/2016)', 14, y); y += 7;

    // Header tabel
    const colX = [12, 90, 140, 170];
    const colW = [77, 48, 29, 28];
    pdf.setFillColor(20, 40, 90);
    pdf.rect(10, y - 4, PW - 20, 7, 'F');
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6.5); pdf.setTextColor(255, 255, 255);
    ['Capitolul / Subcapitolul', 'Denumire lucrări', 'Valoare (€)', '% din total'].forEach((h, i) => {
      pdf.text(h, colX[i], y);
    });
    y += 4;

    // Calculul valorilor per capitol
    const studii   = valConstr * COEF_HG907.studii;
    const avize    = valConstr * COEF_HG907.obtinere_avize;
    const proiect  = valConstr * COEF_HG907.proiectare;
    const orgSant  = valConstr * COEF_HG907.org_santier;
    const diverse  = valConstr * COEF_HG907.diverse;
    const totalFaraTVA = valConstr + studii + avize + proiect + orgSant + diverse;
    const tva      = totalFaraTVA * COEF_HG907.tva;
    const total    = totalFaraTVA + tva;

    const capitole = [
      { cap: '1', sub: '1.1+1.2+1.3', lbl: 'Studii de teren, expertize, documentații', val: studii, note: 'Topo, geo, expertize' },
      { cap: '2', sub: '2.1+2.2', lbl: 'Obținere avize, acorduri, autorizații', val: avize, note: 'AC + avize de specialitate' },
      { cap: '3', sub: '3.1+3.5+3.8', lbl: 'Proiectare + verificare + diri. de șantier', val: proiect, note: 'PT+DDE+DTAC+RTE+diriginte' },
      { cap: '4', sub: '4.1', lbl: 'CONSTRUCȚII — structură (beton, zidărie)', val: valConstr * 0.43, note: 'Fundații+structură+zidărie' },
      { cap: '4', sub: '4.2', lbl: 'CONSTRUCȚII — finisaje interioare+exterioare', val: valConstr * 0.24, note: 'Tencuieli, faianță, pardoseli' },
      { cap: '4', sub: '4.3', lbl: 'INSTALAȚII (san.+el.+HVAC+lift)', val: valConstr * 0.33, note: 'Sanitare+electrice+ventilatii' },
      { cap: '5', sub: '5.2', lbl: 'Organizare șantier', val: orgSant, note: '' },
      { cap: '5', sub: '5.3', lbl: 'Cheltuieli diverse și neprevăzute (10%)', val: diverse, note: 'Rezervă contractuală' },
    ];

    const subtotalConstr = valConstr * 0.43 + valConstr * 0.24 + valConstr * 0.33;
    let rowBg = false;

    capitole.forEach((cap) => {
      rowBg = !rowBg;
      pdf.setFillColor(rowBg ? 248 : 242, rowBg ? 250 : 247, 255);
      pdf.rect(10, y - 3, PW - 20, 7, 'F');
      const isCap4 = cap.cap === '4';
      pdf.setFont('helvetica', isCap4 ? 'bold' : 'normal');
      pdf.setFontSize(6.2);
      pdf.setTextColor(isCap4 ? 10 : 40, isCap4 ? 40 : 60, isCap4 ? 90 : 110);
      pdf.text('Cap.' + cap.cap + ' · ' + cap.sub, colX[0], y + 0.5);
      pdf.text(S2(cap.lbl), colX[1], y + 0.5);
      pdf.setFont('helvetica', 'bold'); pdf.setTextColor(15, 80, 40);
      pdf.text(EUR(cap.val) + ' €', colX[2], y + 0.5);
      pdf.setFont('helvetica', 'normal'); pdf.setTextColor(100, 120, 150);
      pdf.text((cap.val / totalFaraTVA * 100).toFixed(1) + '%', colX[3], y + 0.5);
      y += 7;
    });

    // Linie subtotal construcții
    pdf.setFillColor(230, 240, 255); pdf.rect(10, y - 3, PW - 20, 7, 'F');
    pdf.setDrawColor(100, 130, 200); pdf.setLineWidth(0.3); pdf.rect(10, y - 3, PW - 20, 7, 'S');
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7); pdf.setTextColor(10, 40, 100);
    pdf.text('SUBTOTAL Cap.4 — CONSTRUCȚII + INSTALAȚII (fără TVA)', colX[0], y + 0.5);
    pdf.text(EUR(subtotalConstr) + ' €', colX[2], y + 0.5);
    y += 9;

    // Total fără TVA
    pdf.setFillColor(20, 50, 100); pdf.rect(10, y - 3, PW - 20, 7, 'F');
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7.5); pdf.setTextColor(255, 255, 255);
    pdf.text('TOTAL DEVIZ GENERAL (fără TVA)', colX[0], y + 0.5);
    pdf.text(EUR(totalFaraTVA) + ' €', colX[2], y + 0.5);
    y += 8;

    // TVA
    pdf.setFillColor(240, 240, 250); pdf.rect(10, y - 3, PW - 20, 7, 'F');
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5); pdf.setTextColor(60, 80, 130);
    pdf.text('TVA 19%', colX[0], y + 0.5);
    pdf.text(EUR(tva) + ' €', colX[2], y + 0.5);
    y += 8;

    // TOTAL CU TVA
    pdf.setFillColor(245, 158, 11); pdf.rect(10, y - 3, PW - 20, 9, 'F');
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.setTextColor(15, 23, 42);
    pdf.text('TOTAL DEVIZ GENERAL (cu TVA inclus)', colX[0], y + 1.5);
    pdf.text(EUR(total) + ' €', colX[2], y + 1.5);
    y += 13;

    // ── INDICATORI SINTETICI ──────────────────────────────────────────────
    if (y < PH - 60) {
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.setTextColor(15, 23, 42);
      pdf.text('INDICATORI SINTETICI', 14, y); y += 6;

      const nrApt = Math.max(1, Math.round(sda / 70));
      const costPerMp = Math.round(total / sda);
      const costPerApt = fn.includes('rez') || fn.includes('hotel') ? Math.round(total / nrApt) : 0;

      const indic = [
        ['Cost mediu construcție/mp SDA (cu TVA)', EUR(costPerMp) + ' €/mp'],
        ['Cost mediu construcție/mp SDA (fără TVA)', EUR(Math.round(totalFaraTVA / sda)) + ' €/mp'],
        fn.includes('rez') ? ['Cost mediu per unitate locativă (estimat)', EUR(costPerApt) + ' €/apt (est. ' + nrApt + ' apt.)'] : null,
        fn.includes('hotel') ? ['Cost mediu per cameră hotel (estimat)', EUR(costPerApt) + ' €/cameră (est. ' + nrApt + ' camere)'] : null,
        ['Curs de referință utilizat', '1 EUR ≈ 4.97 RON (BNR mediu 2024)'],
        ['Total investiție echivalent RON (orientativ)', EUR(Math.round(total * 4.97)) + ' RON'],
      ].filter(Boolean);

      indic.forEach(([lbl, val], i) => {
        const ry = y + i * 7;
        pdf.setFillColor(i % 2 === 0 ? 255 : 250, 252, i % 2 === 0 ? 235 : 230);
        pdf.rect(10, ry - 3, PW - 20, 6.5, 'F');
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.2); pdf.setTextColor(40, 60, 100);
        pdf.text(S2(lbl), 12, ry + 0.5);
        pdf.setFont('helvetica', 'bold'); pdf.setTextColor(15, 80, 40);
        pdf.text(S2(val), 145, ry + 0.5);
      });
      y += indic.length * 7 + 6;
    }

    // ── NOTĂ PREȚURI ──────────────────────────────────────────────────────
    if (y < PH - 30) {
      pdf.setFillColor(248, 250, 255); pdf.rect(10, y, PW - 20, 22, 'F');
      pdf.setDrawColor(148, 163, 184); pdf.setLineWidth(0.2); pdf.rect(10, y, PW - 20, 22, 'S');
      pdf.setFont('helvetica', 'italic'); pdf.setFontSize(6); pdf.setTextColor(100, 120, 150);
      const note = [
        'Prețurile unitare sunt orientative, bazate pe date statistice INS și publicații de specialitate 2024–2025.',
        'Variații de ±30% sunt normale în funcție de: calitatea finisajelor, specificații tehnice, zona geografică,',
        'accesibilitate șantier, piața materialelor de construcții, conjunctura economică.',
        'Devizul general obligatoriu se elaborează de arhitectul proiectant cu drept de semnătură OAR, pe baza proiectului tehnic',
        'complet (PT), și se prezintă odată cu documentația pentru Autorizația de Construire (Legea 50/1991, Art.6).',
        'Surse: INS România, MDLPA, publicații devize constructii.ro, RSP 2024.',
      ];
      note.forEach((ln, i) => pdf.text(S2(ln), 12, y + 5 + i * 3.2));
    }

    // Footer
    pdf.setFont('helvetica', 'italic'); pdf.setFontSize(5.5); pdf.setTextColor(160, 170, 185);
    pdf.text(S2('UrbanX TSS·FG · Deviz estimativ · Document orientativ · ' + new Date().toLocaleDateString('ro-RO')), PW / 2, PH - 5, { align: 'center' });

    pdf.save(('Deviz_estimativ_' + (P.nrCad || 'x') + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_'));
    if (typeof ss === 'function') ss('✅ Deviz estimativ HG 907/2016 generat');
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 2. EXTRAS DE MATERIALE
  // ═══════════════════════════════════════════════════════════════════════

  window._rvExportExtras = function () {
    const b = window._RV?.building, P = window._RV?.parcelParams;
    if (!b || !P) { alert('Generați releveele mai întâi.'); return; }
    if (typeof ss === 'function') ss('⏳ Generez extras de materiale…');

    const _jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!_jsPDF) { return; }

    const pdf = new _jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const PW = 210, PH = 297;
    const S2 = s => String(s || '').replace(/[^\x20-\x7E\u00C0-\u024F]/g, ' ').trim();

    const sc = b.scArea || b.bW * b.bD;
    const sda = b.sdaTotal || sc * b.niv;
    const niv = b.niv || 1;
    const bW = b.bW || 15, bD = b.bD || 12;
    const hNiv = P.hn || 3.0;
    const subsolSC = (b.subsolNiv || 0) * sc;
    const perimetru = 2 * (bW + bD);

    // Calculul cantităților
    const Q = {
      // STRUCTURĂ
      beton_radier:     { q: (sc + subsolSC) * 0.30, u: 'm³', desc: 'Beton armat C30/37 — radier + substructură' },
      beton_stalpi:     { q: sc * niv * 0.025, u: 'm³', desc: 'Beton armat C25/30 — stâlpi + grinzi' },
      beton_plansee:    { q: sc * niv * 0.22, u: 'm³', desc: 'Beton armat C25/30 — planșee + scări' },
      armatura:         { q: (sc + subsolSC) * 0.30 * 120 + sc * niv * 0.245 * 100, u: 'kg', desc: 'Armătură OB37+PC52 — total structură' },

      // ZIDĂRIE + TERMOIZOLAȚIE
      bca_pereti_ext:   { q: perimetru * hNiv * niv * 0.25, u: 'm³', desc: 'BCA 25cm — pereți exteriori (exclus goluri)' },
      bca_pereti_int:   { q: (sc * niv / 4) * 0.15, u: 'm³', desc: 'BCA/GKF 15cm — pereți interiori despărțitori (estimat)' },
      eps_fatada:       { q: perimetru * hNiv * niv * 0.90, u: 'm²', desc: 'EPS 15cm λ=0.031 — termoizolație fațadă (exclus goluri)' },
      tencuiala_ext:    { q: perimetru * hNiv * niv * 0.85, u: 'm²', desc: 'Tencuială siliconică colorată — fațadă' },

      // ACOPERIȘ
      ...((window.AEDIS?.tipAcoperis || 'terasa').includes('inclinat') || (window.AEDIS?.tipAcoperis || '').includes('sarpanta')
        ? {
            sarpanta_lemn:   { q: sc * 1.3, u: 'm²', desc: 'Structură lemn șarpantă (suprafață în plan)' },
            tigla:           { q: sc * 1.3, u: 'm²', desc: 'Țiglă ceramică — strat exterior' },
            termoiz_sarpanta:{ q: sc, u: 'm²', desc: 'Termoizolație vată minerală 20cm — pod' },
          }
        : {
            membrana_terasa: { q: sc, u: 'm²', desc: 'Membrană bituminoasă 2× — terasă (strat de etanșare)' },
            termoiz_terasa:  { q: sc, u: 'm²', desc: 'Polistiren extrudat XPS 15cm — terasă' },
            strat_protectie: { q: sc, u: 'm²', desc: 'Pietriș/gresie terasa circulabila — protecție mecanică' },
          }),

      // TÂMPLĂRIE
      tamplarie_pvc_ferestre: {
        q: Math.round(perimetru * hNiv * niv * 0.15),
        u: 'm²',
        desc: 'Tâmplărie PVC 5 camere, geam triplu low-E — ferestre (estimat 15% din fațadă)'
      },
      tamplarie_usi_ext: { q: b.cores?.length || 1, u: 'buc', desc: 'Uși intrare bloc aluminiu + geam securizat (per scară)' },
      tamplarie_usi_int: { q: Math.round(sda / 15), u: 'buc', desc: 'Uși interior (estimat 1 ușă / 15mp SDA)' },

      // FINISAJE INTERIOARE
      pardoseala_gresie: { q: sda * 0.25, u: 'm²', desc: 'Gresie 60×60 — băi, bucătării, holuri (≈25% SDA)' },
      pardoseala_parchet:{ q: sda * 0.55, u: 'm²', desc: 'Parchet laminat AC4 sau PVC LVT — camere (≈55% SDA)' },
      faianta:           { q: sda * 0.10, u: 'm²', desc: 'Faianță 30×60 — băi + bucătării (estimat)' },
      tencuiala_int:     { q: sda * 2.5, u: 'm²', desc: 'Tencuială interioară — pereți + tavane (estimat 2.5×SDA)' },
      vopsea_int:        { q: sda * 2.5, u: 'm²', desc: 'Vopsea lavabilă albă — 2 straturi' },

      // INSTALAȚII
      instalatii_san:    { q: sda, u: 'mp SDA', desc: 'Instalații sanitare apă-canal (abonament/mp SDA)' },
      instalatii_el:     { q: sda, u: 'mp SDA', desc: 'Instalații electrice curente slabe+tari (abonament/mp SDA)' },
      hvac:              { q: sda, u: 'mp SDA', desc: 'Ventilatii/climatizare/incalzire (abonament/mp SDA)' },

      // SUBSOL (dacă există)
      ...((b.subsolNiv || 0) > 0 ? {
        impermeabilizare_subsol: { q: perimetru * 3 * (b.subsolNiv || 1), u: 'm²', desc: 'Membrană impermeabilizare subteran — pereți subsol' },
        drenaj:                   { q: perimetru, u: 'ml', desc: 'Sistem drenaj perimetral + strat drenant' },
      } : {}),
    };

    // ── Header ──────────────────────────────────────────────────────────
    pdf.setFillColor(15, 23, 42); pdf.rect(0, 0, PW, 18, 'F');
    pdf.setFillColor(34, 197, 94); pdf.rect(0, 17.5, PW, 0.7, 'F');
    pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(12);
    pdf.text('EXTRAS DE MATERIALE PRINCIPALE', PW / 2, 9, { align: 'center' });
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5); pdf.setTextColor(180, 210, 230);
    pdf.text(S2('Nr.cad. ' + P.nrCad + ' · SDA=' + Math.round(sda) + 'mp · ' + b.niv + ' niveluri · Cantități orientative 2024–2025'), PW / 2, 14.5, { align: 'center' });

    let y = 23;

    // Avertizare
    pdf.setFillColor(232, 248, 232); pdf.rect(10, y, PW - 20, 9, 'F');
    pdf.setFont('helvetica', 'italic'); pdf.setFontSize(6); pdf.setTextColor(20, 100, 40);
    pdf.text('ℹ Cantitățile sunt calculate pe baza geometriei generate și sunt orientative (±20%). Extrasul de materiale definitiv se calculează din proiectul tehnic complet.', 12, y + 5);
    y += 13;

    // Header tabel
    const cx = [10, 100, 130, 155, 175];
    pdf.setFillColor(20, 50, 30); pdf.rect(10, y - 4, PW - 20, 7, 'F');
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6.5); pdf.setTextColor(255, 255, 255);
    ['Material / Lucrare', 'Cantitate', 'U.M.', 'Preț unit. (€)', 'Total (€)'].forEach((h, i) => pdf.text(h, cx[i], y));
    y += 4;

    // Prețuri unitare materiale (surse publicații specialitate 2024)
    const PRET_MAT = {
      beton_radier: 180, beton_stalpi: 200, beton_plansee: 190, armatura: 1.2,
      bca_pereti_ext: 220, bca_pereti_int: 160, eps_fatada: 35, tencuiala_ext: 45,
      sarpanta_lemn: 120, tigla: 55, termoiz_sarpanta: 28,
      membrana_terasa: 35, termoiz_terasa: 30, strat_protectie: 25,
      tamplarie_pvc_ferestre: 280, tamplarie_usi_ext: 2500, tamplarie_usi_int: 350,
      pardoseala_gresie: 42, pardoseala_parchet: 38, faianta: 45,
      tencuiala_int: 18, vopsea_int: 8,
      instalatii_san: 85, instalatii_el: 75, hvac: 65,
      impermeabilizare_subsol: 55, drenaj: 120,
    };

    let grandTotal = 0;
    let rowBg2 = false;
    let lastCategory = '';

    const CATEGORIES = {
      beton: 'STRUCTURĂ — BETON + ARMĂTURĂ',
      bca: 'ZIDĂRIE + TERMOIZOLAȚIE',
      sarpanta: 'ACOPERIȘ — ȘARPANTĂ',
      membrana: 'ACOPERIȘ — TERASĂ',
      tamplarie: 'TÂMPLĂRIE',
      pardoseala: 'FINISAJE INTERIOARE',
      faianta: 'FINISAJE INTERIOARE',
      tencuiala_int: 'FINISAJE INTERIOARE',
      vopsea_int: 'FINISAJE INTERIOARE',
      instalatii: 'INSTALAȚII (abonament/mp)',
      impermeabilizare: 'SUBSOL',
      drenaj: 'SUBSOL',
    };

    Object.entries(Q).forEach(([key, row]) => {
      // Header categorie
      const catKey = Object.keys(CATEGORIES).find(k => key.startsWith(k));
      const cat = CATEGORIES[catKey] || '';
      if (cat && cat !== lastCategory) {
        lastCategory = cat;
        if (y > PH - 30) { pdf.addPage(); y = 15; }
        pdf.setFillColor(30, 50, 80); pdf.rect(10, y - 3, PW - 20, 6, 'F');
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6.5); pdf.setTextColor(200, 220, 255);
        pdf.text(S2(cat), 12, y + 0.5);
        y += 6;
      }

      if (y > PH - 20) { pdf.addPage(); y = 15; }
      rowBg2 = !rowBg2;
      const pretUnit = PRET_MAT[key] || 0;
      const total = row.q * pretUnit;
      grandTotal += total;

      pdf.setFillColor(rowBg2 ? 248 : 243, 252, rowBg2 ? 248 : 244);
      pdf.rect(10, y - 3, PW - 20, 7, 'F');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(5.8); pdf.setTextColor(30, 50, 80);
      pdf.text(S2(row.desc.slice(0, 55)), cx[0], y + 0.5);
      pdf.setFont('helvetica', 'bold');
      pdf.text(row.q < 10000 ? row.q.toFixed(1) : Math.round(row.q).toString(), cx[1], y + 0.5);
      pdf.setFont('helvetica', 'normal'); pdf.setTextColor(80, 100, 130);
      pdf.text(row.u, cx[2], y + 0.5);
      pdf.text(pretUnit > 0 ? pretUnit.toFixed(0) + ' €' : '—', cx[3], y + 0.5);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(total > 0 ? 10 : 100, total > 0 ? 80 : 100, total > 0 ? 30 : 130);
      pdf.text(total > 0 ? Math.round(total).toLocaleString('ro-RO') + ' €' : '—', cx[4], y + 0.5);
      y += 7;
    });

    // Grand total
    if (y > PH - 20) { pdf.addPage(); y = 15; }
    y += 3;
    pdf.setFillColor(34, 197, 94); pdf.rect(10, y - 3, PW - 20, 8, 'F');
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.setTextColor(10, 40, 15);
    pdf.text('TOTAL ESTIMAT MATERIALE PRINCIPALE (fără manoperă, transport, TVA)', cx[0], y + 1.5);
    pdf.text(Math.round(grandTotal).toLocaleString('ro-RO') + ' €', cx[4] - 5, y + 1.5);

    pdf.setFont('helvetica', 'italic'); pdf.setFontSize(5.5); pdf.setTextColor(130, 150, 130);
    pdf.text('Manoperă estimată separat: ~' + Math.round(grandTotal * 0.35).toLocaleString('ro-RO') + ' € · Transport + utilaje: ~' + Math.round(grandTotal * 0.08).toLocaleString('ro-RO') + ' €', 12, y + 9);

    pdf.setFont('helvetica', 'italic'); pdf.setFontSize(5.5); pdf.setTextColor(160, 170, 185);
    pdf.text('UrbanX TSS·FG · Extras de materiale orientativ · ' + new Date().toLocaleDateString('ro-RO'), PW / 2, PH - 5, { align: 'center' });

    pdf.save(('Extras_materiale_' + (P.nrCad || 'x') + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_'));
    if (typeof ss === 'function') ss('✅ Extras de materiale principale generat');
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 3. MEMORIU TEHNIC ORIENTATIV
  // ═══════════════════════════════════════════════════════════════════════

  window._rvExportMemoriu = function () {
    const b = window._RV?.building, P = window._RV?.parcelParams;
    if (!b || !P) { alert('Generați releveele mai întâi.'); return; }
    if (typeof ss === 'function') ss('⏳ Generez memoriu tehnic orientativ…');

    const _jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!_jsPDF) { return; }

    const pdf = new _jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const PW = 210, PH = 297;
    const S2 = s => String(s || '').replace(/[^\x20-\x7E\u00C0-\u024F]/g, ' ').trim();
    const AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
    const fn = window.AEDIS?.fn || P.fn || 'rez';
    const fnCfg = (typeof FN_CONFIG !== 'undefined' && FN_CONFIG[fn]) || { norms: [], label: fn };
    const sc = b.scArea || b.bW * b.bD;
    const sda = b.sdaTotal || sc * b.niv;
    const nrApt = fn.includes('rez') || fn.includes('hotel') ? Math.max(1, Math.round(sda / 70)) : 0;

    // Avize necesare (conform legislație)
    const avizeNecesare = _calcAvizeNecesare(b, P, fn, sda, sc);

    // ── Header ──────────────────────────────────────────────────────────
    pdf.setFillColor(15, 23, 42); pdf.rect(0, 0, PW, 18, 'F');
    pdf.setFillColor(96, 165, 250); pdf.rect(0, 17.5, PW, 0.7, 'F');
    pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(11);
    pdf.text('MEMORIU TEHNIC ORIENTATIV', PW / 2, 8, { align: 'center' });
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5); pdf.setTextColor(180, 210, 240);
    pdf.text(S2('Nr.cad. ' + P.nrCad + ' · ' + S2(AC.fnLabel || fn) + ' · Document orientativ pre-proiectare'), PW / 2, 14.5, { align: 'center' });

    let y = 23;
    const section = (title) => {
      if (y > PH - 40) { pdf.addPage(); y = 12; }
      y += 3;
      pdf.setFillColor(20, 50, 120); pdf.rect(10, y - 4, PW - 20, 7, 'F');
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.setTextColor(255, 255, 255);
      pdf.text(S2(title), 13, y);
      y += 6;
    };

    const par = (text, indent) => {
      if (y > PH - 20) { pdf.addPage(); y = 12; }
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.setTextColor(30, 45, 80);
      const maxW = PW - 20 - (indent || 0);
      const lines = pdf.splitTextToSize(S2(text), maxW);
      lines.forEach(ln => { pdf.text(ln, 10 + (indent || 0), y); y += 4.5; });
    };

    const field = (lbl, val) => {
      if (y > PH - 15) { pdf.addPage(); y = 12; }
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6.5); pdf.setTextColor(30, 50, 120);
      pdf.text(S2(lbl) + ':', 12, y);
      pdf.setFont('helvetica', 'normal'); pdf.setTextColor(40, 60, 100);
      pdf.text(S2(val), 80, y);
      y += 5.5;
    };

    // AVERTIZARE
    pdf.setFillColor(219, 234, 254); pdf.rect(10, y, PW - 20, 10, 'F');
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6.5); pdf.setTextColor(30, 64, 175);
    pdf.text('⚠ DOCUMENT ORIENTATIV — Memoriulu tehnic obligatoriu pentru PA se elaborează de arhitect autorizat OAR (Legea 50/1991)', 12, y + 4);
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6); pdf.setTextColor(60, 100, 180);
    pdf.text('Conținut conform Ordinul 839/2009, Anexa 1, Pct. B — Piese scrise', 12, y + 8.5);
    y += 14;

    // 1. DATE GENERALE
    section('1. DATE GENERALE');
    field('Obiect investiție', S2(AC.fnLabel || fn) + ' — ' + S2(P.nrCad || '—'));
    field('Amplasament', 'Nr.cad. ' + S2(P.nrCad) + ', UAT ' + S2(P.uatLabel || '—') + ', jud. ' + S2(P.judet || '—'));
    field('Beneficiar', '_________________________________ (de completat)');
    field('Proiectant general', 'Arhitect _________________________________ (de completat)');
    field('Nr. OAR proiectant', '_________________________________');
    field('Faza de proiectare', 'DTAC + PT + DE (Documentație Tehnică Autorizare Construire)');

    // 2. DATE TEREN
    section('2. DATE DESPRE TEREN');
    field('Suprafață teren (din CF)', Math.round(P.area) + ' mp');
    field('Front stradal', S2(P.frontDir || '—') + ' · ' + S2(P.W ? P.W.toFixed(2) + 'm' : '—'));
    field('Adâncime medie parcelă', S2(P.D ? P.D.toFixed(2) + 'm' : '—'));
    field('Regim juridic teren', '_________________________________ (din CF / extras ANCPI)');
    field('Categoria de folosință', '_________________________________ (de completat din CF)');
    field('Coeficienți urbanistici', 'POT max=' + Math.round((P.pot || 0) * 100) + '% · CUT max=' + (P.cut || '—') + ' · H max=' + (P.niv || '—') + ' niveluri');
    field('UTR / Zonă PUG', S2(P.utr || '—'));
    field('Retrageri prescrise', 'Față=' + (P.rf || '—') + 'm · Spate=' + (P.rs || '—') + 'm · Laterale=' + (P.rl || '—') + 'm');

    // 3. DATE CONSTRUCȚIE
    section('3. DESCRIERE CONSTRUCȚIE PROPUSĂ');
    field('Funcțiunea principală', S2(AC.fnLabel || fn));
    field('Funcțiunea parter', window.AEDIS?.parterDiferit ? S2(AC.fnParterLabel || '—') : S2(AC.fnLabel || fn));
    field('Regim înălțime', 'P+' + (b.niv - 1) + ' · Hmax=' + (b.niv * (P.hn || 3)).toFixed(2) + 'm');
    field('Dimensiuni în plan', bW => b.bW.toFixed(2) + 'm × ' + b.bD.toFixed(2) + 'm');
    field('SC amprentă construcție', Math.round(sc) + ' mp (POT realizat=' + (sc / P.area * 100).toFixed(1) + '%)');
    field('SDA (Suprafața Desfășurată)', Math.round(sda) + ' mp (CUT realizat=' + (sda / P.area).toFixed(2) + ')');
    field('Subsol', b.subsolNiv > 0 ? b.subsolNiv + ' nivel(uri) subsol — parcaj ' + (b.subsolLoc || '—') + ' locuri' : 'Nu este prevăzut');
    nrApt > 0 && field('Nr. unități', nrApt + ' ' + (fn.includes('hotel') ? 'camere hotel' : 'apartamente') + ' (estimat)');
    field('Stil arhitectural', S2(AC.stilLabel || window.AEDIS?.stil || 'Modern'));
    field('Tip acoperiș', S2(AC.acoperisLabel || window.AEDIS?.tipAcoperis || 'Terasă plată'));

    // 4. SOLUȚIE STRUCTURALĂ
    section('4. SOLUȚIE STRUCTURALĂ PROPUSĂ');
    par('Structura de rezistență propusă este din beton armat monolit — cadre plane (stâlpi + grinzi) cu planșee dală sau cu grinzi, în funcție de deschideri. Soluția definitivă se stabilește prin proiect tehnic de rezistență elaborat de inginer structurist cu drept de semnătură AICPS.');
    field('Sistem structural', 'Beton armat monolit (cadre plane + planșee) — de confirmat');
    field('Clasa de beton', 'C25/30 structură · C30/37 fundații și subsol');
    field('Zonă seismică', 'ag = ' + (P.ag || '0.20') + 'g · Tc = ' + (P.Tc || '0.7') + 's (conform P100-1/2013) — de verificat');
    field('Adâncime fundare', '>1.20m sub CTN (de confirmat prin studiu geotehnic)');
    field('Pereți exteriori', 'BCA 25cm + termoizolație EPS 15cm + tencuiala siliconică');
    field('Pereți interiori', 'BCA/GKF 10–15cm');
    par('NOTĂ: Proiectul de rezistență (structură) se elaborează obligatoriu de inginer structurist atestat AICPS și se verifică de verificator de proiect atestat Af (conform HG 925/1995). Este obligatorie și expertiza tehnică dacă există demolare parțială.', 5);

    // 5. NORMATIVE APLICABILE
    section('5. NORMATIVE DE PROIECTARE APLICABILE');
    const normsExtra = [
      'Legea 10/1995 — Calitatea în construcții',
      'Legea 50/1991 — Autorizarea executării lucrărilor de construcții',
      'Ordinul 839/2009 — Norme metodologice aplicare Lege 50/1991',
      'P100-1/2013 — Cod de proiectare seismică',
      'C107/2010 — Normativ de calcul termotehnic',
      'GT 010/2019 — Cerințe de calitate energetică (NZEB)',
      'SR EN 1990 — Eurocod: Baze de proiectare a structurilor',
    ];
    [...(fnCfg.norms || []), ...normsExtra].filter((v, i, a) => a.indexOf(v) === i).forEach(n => {
      par('• ' + S2(n), 8);
    });

    // 6. AVIZE NECESARE
    section('6. AVIZE ȘI ACORDURI NECESARE');
    par('Lista avizelor/acordurilor necesare se stabilește prin certificatul de urbanism. Lista orientativă de mai jos se bazează pe funcțiune, suprafață și amplasament:');
    y += 2;
    avizeNecesare.forEach(av => {
      if (y > PH - 18) { pdf.addPage(); y = 12; }
      pdf.setFillColor(av.obligatoriu ? 255 : 245, av.obligatoriu ? 248 : 252, av.obligatoriu ? 235 : 255);
      pdf.rect(10, y - 3, PW - 20, 7, 'F');
      pdf.setFont('helvetica', av.obligatoriu ? 'bold' : 'normal');
      pdf.setFontSize(6.5);
      pdf.setTextColor(av.obligatoriu ? 120 : 60, av.obligatoriu ? 60 : 80, av.obligatoriu ? 10 : 130);
      pdf.text((av.obligatoriu ? '● ' : '○ ') + S2(av.emitent), 12, y + 0.5);
      pdf.setFont('helvetica', 'normal'); pdf.setTextColor(60, 80, 110);
      pdf.text(S2(av.desc), 70, y + 0.5);
      pdf.setTextColor(140, 100, 30);
      pdf.text(S2(av.temei), 165, y + 0.5);
      y += 7;
    });

    // Footer
    pdf.setFont('helvetica', 'italic'); pdf.setFontSize(5.5); pdf.setTextColor(160, 170, 185);
    pdf.text('UrbanX TSS·FG · Memoriu tehnic orientativ · Document pre-proiectare · ' + new Date().toLocaleDateString('ro-RO'), PW / 2, PH - 5, { align: 'center' });

    pdf.save(('Memoriu_tehnic_' + (P.nrCad || 'x') + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_'));
    if (typeof ss === 'function') ss('✅ Memoriu tehnic orientativ generat');
  };

  // ─── Calcul avize necesare per funcțiune + suprafață ──────────────────
  function _calcAvizeNecesare(b, P, fn, sda, sc) {
    const avize = [];
    const add = (emitent, desc, temei, obligatoriu = true) =>
      avize.push({ emitent, desc, temei, obligatoriu });

    // Avize întotdeauna necesare
    add('Primăria UAT', 'Certificat de Urbanism', 'Legea 50/1991, Art.6', true);
    add('ANIF / Ape Române', 'Aviz gospodărire ape (dacă în zona inundabilă)', 'Legea 107/1996', false);
    add('Distribuitor apă-canal local', 'Aviz alimentare cu apă + canalizare', 'Legea 241/2006', true);
    add('Distribuitor energie electrică', 'Aviz racord electric (putere instalată)', 'Legea 123/2012', true);
    add('Distribuitor gaze naturale', 'Aviz racord gaze (dacă se prevede)', 'Legea 123/2012', false);
    add('Telekom / RCS-RDS / alt. ISP', 'Aviz infrastructură comunicații electronice', 'Legea 154/2012', false);

    // ISU — obligatoriu dacă SDA > 600mp sau P118 impune
    if (sda > 600 || fn.includes('hotel') || fn.includes('com') || fn.includes('industrial')) {
      add('ISU județean', 'Aviz securitate la incendiu (P118-2/2013 sau P118-3/2015)', 'Legea 307/2006 + P118', true);
    }

    // Sănătate publică — hotel, comercial alimentar, instituții
    if (fn.includes('hotel') || fn.includes('com') || fn.includes('institutie')) {
      add('DSP — Direcția de Sănătate Publică', 'Aviz sanitar-veterinar / sănătate publică', 'Legea 95/2006', true);
    }

    // Mediu — dacă SDA > 5000mp sau industrial
    if (sda > 5000 || fn.includes('industrial')) {
      add('APM — Agenția Protecției Mediului', 'Acord de mediu / Screening EIA', 'Legea 292/2018 + HG 445/2009', true);
    }

    // Drumuri/trafic — dacă front stradal mare sau acces auto necesar
    add('Administrație drumuri (primărie/DRDP)', 'Aviz acces auto + lucrări la drum public', 'OG 43/1997', true);

    // Patrimoniu — dacă în zona protejată
    if ((P.utr || '').includes('IS') || (P.utr || '').toUpperCase().includes('P') || P.patrimoniuZona) {
      add('Ministerul Culturii / DJPC', 'Aviz Ministerul Culturii (zonă protejată)', 'Legea 422/2001', true);
    }

    // Energetică — obligatorie
    add('Auditor energetic atestat MDLPA', 'Certificat de performanță energetică (CPE)', 'Legea 372/2005 + GT 019/2019', true);
    add('RTE (Responsabil Tehnic cu Execuția)', 'Atestat MDLPA pentru execuție lucrări', 'Legea 10/1995 + HG 925/1995', true);
    add('Verificator de proiect atestat', 'Verificare proiect — cerință Af + Ar (structură + incendiu)', 'HG 925/1995', true);

    return avize;
  }

})();
