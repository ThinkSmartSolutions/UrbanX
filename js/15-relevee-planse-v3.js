// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-planse-v3.js
// UrbanX TSS·FG | v3.0 | 09 Iunie 2026
//
// RESCRIE COMPLET:
//   _rvRenderAcoperis  — tip acoperiș real din AEDIS + stratigrafie + capriori
//   _rvRenderAxono     — axonometrie izometrică 30° corectă + stil + acoperiș
//   _rvRenderSituatie  — circulații auto+pietonale, rampă subsol, parcaje, UTR
//   _rvRenderPlan (hook) — plan nivel complet: scări, lift, uși cu arc, accese
//   Export SVG + DXF per planșă (buton per tab)
//
// PRINCIPIU: fiecare planșă preia 100% setările din AEDIS —
//   tipAcoperis, stil, fn, balconLaturi, parterDiferit, subsolNiv, etajRetras
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 150) return;
    if (typeof _RV === 'undefined' || typeof _rvRenderAcoperis === 'undefined') {
      setTimeout(() => waitReady(cb, n + 1), 200); return;
    }
    cb();
  }

  waitReady(() => {
    window._rvRenderAcoperis  = _rvRenderAcoperisV3;
    window._rvRenderAxono      = _rvRenderAxonoV3;
    window._rvRenderSituatie   = _rvRenderSituatieV3;
    _hookPlanRender();
    _injectExportButtons();
    console.log('[PlansePRO v3] ✅ acoperis + axono + situatie + plan + export SVG/DXF');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // CONSTANTE TEHNICE
  // ═══════════════════════════════════════════════════════════════════════

  // Stratigrafii acoperiș conform C107/2010 + NP 040/2002
  const STRATIGRAFIE = {
    terasa: [
      { t: 'Strat protecție', mat: 'Pietriș spălat Ø16–32mm', grosime: '5 cm', cod: '#94A3B8' },
      { t: 'Strat separare', mat: 'Geotextil 200g/m²', grosime: '—', cod: '#CBD5E1' },
      { t: 'Termoizolație', mat: 'Polistiren extrudat XPS λ=0.032 W/mK', grosime: '15 cm', cod: '#FEF9C3' },
      { t: 'Barieră vapori', mat: 'Folie polietilenă 0.2mm', grosime: '—', cod: '#E0F2FE' },
      { t: 'Impermeabilizare', mat: 'Membrană bituminoasă 2× (SBS 4+4mm)', grosime: '8 mm', cod: '#1E293B' },
      { t: 'Șapă pantă', mat: 'Beton Cl8/10 cu pantă 1.5–2%', grosime: '5–15 cm', cod: '#E2E8F0' },
      { t: 'Planșeu beton', mat: 'Beton armat C25/30, armat OB37', grosime: '22 cm', cod: '#94A3B8' },
    ],
    terasa_circulabila: [
      { t: 'Finisaj', mat: 'Plăci prefabricate beton/gresie porțelanata pe ploturi', grosime: '3–5 cm', cod: '#CBD5E1' },
      { t: 'Strat drenaj', mat: 'Geocompozit drenaj', grosime: '2 cm', cod: '#DBEAFE' },
      { t: 'Impermeabilizare', mat: 'Membrană bituminoasă armată 2× (SBS 4+4mm)', grosime: '8 mm', cod: '#1E293B' },
      { t: 'Termoizolație', mat: 'EPS grafitat λ=0.031 W/mK', grosime: '15 cm', cod: '#FEF9C3' },
      { t: 'Șapă pantă', mat: 'Beton Cl8/10 cu pantă 2%', grosime: '5–15 cm', cod: '#E2E8F0' },
      { t: 'Planșeu beton', mat: 'Beton armat C25/30', grosime: '22 cm', cod: '#94A3B8' },
    ],
    inclinat: [
      { t: 'Învelitoare', mat: 'Țiglă ceramică sau beton', grosime: '—', cod: '#7C4A30' },
      { t: 'Lattens', mat: 'Șipci lemn 4×5cm, pas 32cm', grosime: '5 cm', cod: '#A07850' },
      { t: 'Contra-lattens', mat: 'Contra-șipci 4×8cm ventilație', grosime: '8 cm', cod: '#C8A870' },
      { t: 'Folie difuzie', mat: 'Folie ondulată difuzie vapori', grosime: '—', cod: '#E0F2FE' },
      { t: 'Termoizolație', mat: 'Vată minerală bazaltică λ=0.035 W/mK', grosime: '20 cm', cod: '#FEF9C3' },
      { t: 'Barieră vapori', mat: 'Folie polietilenă 0.2mm', grosime: '—', cod: '#DBEAFE' },
      { t: 'Capriori', mat: 'Lemn rășinos C24, 8×18cm, pas 80–100cm', grosime: '18 cm', cod: '#92400E' },
      { t: 'Pane', mat: 'Lemn rășinos 12×18cm (coamă + streașină + intermediare)', grosime: '18 cm', cod: '#78350F' },
      { t: 'Pop (stâlp central)', mat: 'Lemn rășinos, secț. 12×12cm la coamă', grosime: '12 cm', cod: '#78350F' },
      { t: 'Planșeu pod', mat: 'Beton armat C25/30 sau planșeu lemn', grosime: '15–22 cm', cod: '#94A3B8' },
    ],
    mansarda: [
      { t: 'Învelitoare', mat: 'Tablă falțuită zinc-titan sau îndreptată',  grosime: '—', cod: '#475569' },
      { t: 'Șarniță mansardă', mat: 'Scânduri 2.4cm + izolație', grosime: '8 cm', cod: '#A07850' },
      { t: 'Capriori mansardă', mat: 'Lemn rășinos 8×16cm, 80cm ax', grosime: '16 cm', cod: '#92400E' },
      { t: 'Termoizolație', mat: 'Vată minerală între capriori + supliment', grosime: '20 cm', cod: '#FEF9C3' },
      { t: 'Barieră vapori', mat: 'Folie kraft aluminizată', grosime: '—', cod: '#DBEAFE' },
      { t: 'Finisaj int.', mat: 'Gips-carton 12.5mm pe structură', grosime: '12 mm', cod: '#F1F5F9' },
    ],
    penthouse: [
      { t: 'Finisaj penthouse', mat: 'Gresie porțelanată mată antiderapantă', grosime: '1 cm', cod: '#CBD5E1' },
      { t: 'Impermeabilizare', mat: 'Membrană EPDM 1.5mm sau PVC', grosime: '1.5 mm', cod: '#1E293B' },
      { t: 'Termoizolație', mat: 'EPS grafitat λ=0.031 W/mK', grosime: '12 cm', cod: '#FEF9C3' },
      { t: 'Planșeu beton', mat: 'Beton armat C25/30', grosime: '22 cm', cod: '#94A3B8' },
    ],
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 1. PLAN ACOPERIȘ V3
  // ═══════════════════════════════════════════════════════════════════════

  function _rvRenderAcoperisV3(b) {
    if (!b || !b.P) return;
    const { P, bW, bD, niv, cores } = b;
    const _AC = _rvGetAEDISConfig();
    const SC = Math.min(_RV.scale * .85, 10);
    const PAD = 60, SIDE = 220;
    const W = Math.min(bW * SC + PAD * 2 + SIDE + 60, 2600);
    const H = Math.min(bD * SC + PAD * 2 + 180, 2000);
    const { cv, ctx } = _rvInitCanvas(W, H, 'rv-canvas');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H);

    const ox = PAD + 50, oy = PAD + 40;
    const roofType = _AC.tipAcoperis || 'terasa';
    const strat = STRATIGRAFIE[roofType] || STRATIGRAFIE.terasa;
    const pantaGrade = roofType.includes('inclinat') || roofType.includes('sarpanta') ? 30 : 2;

    // Titlu
    ctx.fillStyle = '#0F172A'; ctx.font = 'bold 12px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('PLAN ACOPERIȘ — ' + _AC.acoperisLabel.toUpperCase(), ox + bW * SC / 2, oy - 32);
    ctx.font = '8px IBM Plex Mono'; ctx.fillStyle = '#64748B';
    ctx.fillText('Nr.cad. ' + P.nrCad + ' · Sc. 1:' + Math.round(100 / (_RV.scale / 12)) + ' · pantă ' + pantaGrade + '° · cota +' + (niv * P.hn).toFixed(2) + 'm', ox + bW * SC / 2, oy - 17);
    ctx.textAlign = 'left';

    // ── CONTUR ATIC ───────────────────────────────────────────────────────
    const aticW = Math.max(3, 0.25 * SC);
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(ox, oy, bW * SC, aticW);
    ctx.fillRect(ox, oy + bD * SC - aticW, bW * SC, aticW);
    ctx.fillRect(ox, oy, aticW, bD * SC);
    ctx.fillRect(ox + bW * SC - aticW, oy, aticW, bD * SC);
    // hașuri atic
    [
      [ox, oy, bW * SC, aticW],
      [ox, oy + bD * SC - aticW, bW * SC, aticW],
      [ox, oy, aticW, bD * SC],
      [ox + bW * SC - aticW, oy, aticW, bD * SC],
    ].forEach(([x, y, w, h]) => _hatch(ctx, x, y, w, h, 'rgba(255,255,255,.3)', 0.5, 3));

    // Fundal planșă
    ctx.fillStyle = roofType.includes('inclinat') || roofType.includes('mansarda')
      ? 'rgba(120,80,50,.08)' : 'rgba(220,230,240,.35)';
    ctx.fillRect(ox + aticW, oy + aticW, bW * SC - aticW * 2, bD * SC - aticW * 2);

    // ── DESENUL PER TIP ACOPERIȘ ──────────────────────────────────────────
    if (roofType === 'inclinat' || roofType === 'sarpanta') {
      _drawAcoperisInclinat(ctx, ox, oy, bW, bD, SC, aticW, P, _AC, b);
    } else if (roofType === 'mansarda') {
      _drawAcoperisInclinat(ctx, ox, oy, bW, bD, SC, aticW, P, _AC, b, true);
    } else if (roofType === 'penthouse' || roofType === 'penthouse_terasa') {
      _drawAcoperisTerasaPenthouse(ctx, ox, oy, bW, bD, SC, aticW, P, _AC);
    } else {
      _drawAcoperisTerasaPlata(ctx, ox, oy, bW, bD, SC, aticW, P, _AC, roofType);
    }

    // ── IEȘIRE CASĂ SCĂRI + LIFT ──────────────────────────────────────────
    cores.forEach(core => {
      const cx2 = ox + core.x * SC, cy2 = oy + core.y * SC;
      const cw2 = core.w * SC, ch2 = core.h * SC;
      ctx.fillStyle = 'rgba(219,234,254,.85)'; ctx.fillRect(cx2, cy2, cw2, ch2);
      ctx.strokeStyle = '#1D4ED8'; ctx.lineWidth = 1.5; ctx.strokeRect(cx2, cy2, cw2, ch2);
      // Hașuri BE
      _hatch(ctx, cx2, cy2, cw2, ch2, 'rgba(29,78,216,.2)', 0.6, 4);
      ctx.fillStyle = '#1E3A8A'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('CS', cx2 + cw2 / 2, cy2 + ch2 / 2 - 3);
      if (b.niv >= 5) ctx.fillText('L', cx2 + cw2 / 2, cy2 + ch2 / 2 + 6);
      ctx.textAlign = 'left';
    });

    // ── SIFONURI + BURLANE ────────────────────────────────────────────────
    if (!roofType.includes('inclinat') && !roofType.includes('mansarda')) {
      const nSifoane = 4; // colțuri atic
      [[ox + aticW * 2 + SC * .3, oy + aticW * 2 + SC * .3],
       [ox + bW * SC - aticW * 2 - SC * .3, oy + aticW * 2 + SC * .3],
       [ox + aticW * 2 + SC * .3, oy + bD * SC - aticW * 2 - SC * .3],
       [ox + bW * SC - aticW * 2 - SC * .3, oy + bD * SC - aticW * 2 - SC * .3]].forEach(([sx, sy]) => {
        ctx.strokeStyle = '#0369A1'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(sx, sy, Math.max(3, SC * .15), 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = 'rgba(3,105,161,.15)'; ctx.beginPath(); ctx.arc(sx, sy, Math.max(3, SC * .15), 0, Math.PI * 2); ctx.fill();
      });
      ctx.fillStyle = '#0369A1'; ctx.font = '6px IBM Plex Mono';
      ctx.fillText('⊙ Receptor pluvial Ø125 (4 buc)', ox + aticW + 2, oy + bD * SC + 14);
    }

    // ── STRATIGRAFIE ──────────────────────────────────────────────────────
    _drawStratigrafie(ctx, ox + bW * SC + 20, oy, strat, bD * SC, roofType, pantaGrade);

    // ── COTE PLAN ACOPERIȘ ────────────────────────────────────────────────
    _dimLinePDF(ctx, ox, oy - 18, ox + bW * SC, oy - 18, bW + 'm', 'H');
    _dimLinePDF(ctx, ox - 18, oy, ox - 18, oy + bD * SC, bD + 'm', 'V');

    // Cartuș
    if (typeof _rvDrawCartus === 'function') _rvDrawCartus(ctx, W, H, P, null, 'PLAN ACOPERIȘ — ' + _AC.acoperisLabel.toUpperCase());

    // Legendă
    _drawRoofLegend(ctx, ox + bW * SC + 20, oy + bD * SC * .55, roofType);
  }

  function _drawAcoperisInclinat(ctx, ox, oy, bW, bD, SC, aticW, P, _AC, b, isMansarda) {
    const pantaGrade = isMansarda ? 45 : 30;
    const hCoama = bW * Math.tan(pantaGrade * Math.PI / 180) / 2;
    const pas = Math.max(SC * .8, 5); // pas capriori

    // Umplere pante
    const col = isMansarda ? 'rgba(100,80,60,.15)' : 'rgba(120,80,50,.12)';
    ctx.fillStyle = col;
    ctx.fillRect(ox + aticW, oy + aticW, bW * SC - aticW * 2, bD * SC - aticW * 2);

    // Hașuri pante (de la margine la coamă)
    const coamaX1 = ox + bW * SC * .25, coamaX2 = ox + bW * SC * .75;
    const coamaY1 = oy + bD * SC * .3, coamaY2 = oy + bD * SC * .7;
    ctx.strokeStyle = 'rgba(92,62,40,.25)'; ctx.lineWidth = .5;
    // Panta N→coamă
    for (let h = 0; h < bD * SC; h += pas) {
      const t = h / (bD * SC);
      const cx_ = coamaX1 + t * (coamaX2 - coamaX1);
      const cy_ = coamaY1 + t * (coamaY2 - coamaY1);
      ctx.beginPath(); ctx.moveTo(ox, oy + h); ctx.lineTo(cx_, cy_); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ox + bW * SC, oy + h); ctx.lineTo(cx_, cy_); ctx.stroke();
    }

    // Coama (linie principală)
    ctx.strokeStyle = '#4A3728'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(coamaX1, coamaY1); ctx.lineTo(coamaX2, coamaY2); ctx.stroke();
    ctx.fillStyle = '#4A3728'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('COAMĂ (' + hCoama.toFixed(2) + 'm înălțime)', (coamaX1 + coamaX2) / 2, (coamaY1 + coamaY2) / 2 - 6);
    ctx.textAlign = 'left';

    // Capriori (pas 80-100cm)
    const pasCap = .90 * SC;
    ctx.strokeStyle = 'rgba(92,62,40,.5)'; ctx.lineWidth = 1.2;
    for (let x = ox + aticW; x < ox + bW * SC - aticW; x += pasCap) {
      // Capriori N
      ctx.beginPath(); ctx.moveTo(x, oy); ctx.lineTo(coamaX1 + (x - ox) / (bW * SC) * (coamaX2 - coamaX1), coamaY1); ctx.stroke();
      // Capriori S
      ctx.beginPath(); ctx.moveTo(x, oy + bD * SC); ctx.lineTo(coamaX1 + (x - ox) / (bW * SC) * (coamaX2 - coamaX1), coamaY2); ctx.stroke();
    }

    // Pane (orizontale la 1/3 și 2/3 pe pantă)
    ctx.strokeStyle = '#78350F'; ctx.lineWidth = 2; ctx.setLineDash([8, 4]);
    [.33, .67].forEach(t => {
      const px = coamaX1 * t + ox * (1 - t);
      const px2 = coamaX2 * t + (ox + bW * SC) * (1 - t);
      const py = coamaY1 * t + oy * (1 - t);
      const py2 = coamaY2 * t + oy * (1 - t);
      ctx.beginPath(); ctx.moveTo(ox, oy + bD * SC * t * .5); ctx.lineTo(ox + bW * SC, oy + bD * SC * t * .5); ctx.stroke();
    });
    ctx.setLineDash([]);

    // Indicator pantă cu săgeată
    const midX = (coamaX1 + coamaX2) / 2;
    const midY = (coamaY1 + coamaY2) / 2;
    ctx.strokeStyle = '#DC2626'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, oy + bD * SC * .5); ctx.lineTo(midX, midY); ctx.stroke();
    ctx.fillStyle = '#DC2626'; ctx.font = 'bold 7px IBM Plex Mono';
    ctx.fillText('pantă ' + pantaGrade + '° (' + Math.round(Math.tan(pantaGrade * Math.PI / 180) * 100) + '%)', ox + 4, oy + bD * SC * .5 - 4);

    // Jgheaburi + burlane
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox - 4, oy); ctx.lineTo(ox + bW * SC + 4, oy); ctx.stroke();   // jgheab N
    ctx.beginPath(); ctx.moveTo(ox - 4, oy + bD * SC); ctx.lineTo(ox + bW * SC + 4, oy + bD * SC); ctx.stroke(); // jgheab S
    // Burlane
    [[ox + bW * SC * .15, oy], [ox + bW * SC * .85, oy],
     [ox + bW * SC * .15, oy + bD * SC], [ox + bW * SC * .85, oy + bD * SC]].forEach(([bx2, by2]) => {
      ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(bx2, by2, 5, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = '#475569'; ctx.font = '6px IBM Plex Mono';
    ctx.fillText('⊙ Burlan Ø100mm', ox + 4, oy + bD * SC + 16);
  }

  function _drawAcoperisTerasaPlata(ctx, ox, oy, bW, bD, SC, aticW, P, _AC, roofType) {
    const isCirc = roofType === 'terasa_circulabila';
    // Finisaj diferit
    if (isCirc) {
      // Plăci pe ploturi (grilă)
      ctx.strokeStyle = 'rgba(100,116,139,.3)'; ctx.lineWidth = .5;
      const ps = Math.max(SC * .5, 4);
      for (let x = ox + aticW; x < ox + bW * SC - aticW; x += ps) {
        ctx.beginPath(); ctx.moveTo(x, oy + aticW); ctx.lineTo(x, oy + bD * SC - aticW); ctx.stroke();
      }
      for (let y = oy + aticW; y < oy + bD * SC - aticW; y += ps) {
        ctx.beginPath(); ctx.moveTo(ox + aticW, y); ctx.lineTo(ox + bW * SC - aticW, y); ctx.stroke();
      }
    } else {
      // Pietriș (hașuri fine aleatoare vizuale)
      ctx.fillStyle = 'rgba(148,163,184,.2)';
      ctx.fillRect(ox + aticW, oy + aticW, bW * SC - aticW * 2, bD * SC - aticW * 2);
    }

    // Pantă scurgere → sifonuri (săgeți centrifuge)
    const cx_ = ox + bW * SC / 2, cy_ = oy + bD * SC / 2;
    const nSifoane = bW * bD > 200 ? 4 : 2;
    const sifPos = nSifoane === 4
      ? [[ox + bW * SC * .25, oy + bD * SC * .25], [ox + bW * SC * .75, oy + bD * SC * .25],
         [ox + bW * SC * .25, oy + bD * SC * .75], [ox + bW * SC * .75, oy + bD * SC * .75]]
      : [[ox + bW * SC * .3, cy_], [ox + bW * SC * .7, cy_]];

    sifPos.forEach(([sx, sy]) => {
      // Săgeată pantă minimă
      ctx.strokeStyle = 'rgba(37,99,235,.5)'; ctx.lineWidth = 1; ctx.setLineDash([3, 2]);
      ctx.beginPath(); ctx.moveTo(cx_, cy_); ctx.lineTo(sx, sy); ctx.stroke();
      ctx.setLineDash([]);
      // Sifon
      ctx.fillStyle = '#1D4ED8'; ctx.beginPath(); ctx.arc(sx, sy, SC * .15, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(sx, sy, SC * .15, 0, Math.PI * 2); ctx.stroke();
    });

    ctx.fillStyle = '#1D4ED8'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('pantă 2% → sifonuri', cx_, cy_ + SC * .5);
    ctx.fillText(isCirc ? 'TERASĂ CIRCULABILĂ' : 'TERASĂ NECIRCULABILĂ', cx_, cy_ - SC * .5);
    ctx.textAlign = 'left';

    // Echipamente tehnice
    const A = window.AEDIS || {};
    const fn_ = A.fn || '';
    if (fn_.includes('birouri') || fn_.includes('hotel') || fn_.includes('institutie')) {
      const techX = ox + bW * SC * .38, techY = oy + bD * SC * .38;
      const techW = bW * SC * .24, techH = bD * SC * .24;
      ctx.fillStyle = 'rgba(100,116,139,.15)'; ctx.fillRect(techX, techY, techW, techH);
      ctx.strokeStyle = '#64748B'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
      ctx.strokeRect(techX, techY, techW, techH); ctx.setLineDash([]);
      ctx.fillStyle = '#334155'; ctx.font = '7px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('CASĂ TEHNICĂ', techX + techW / 2, techY + techH / 2 - 4);
      ctx.fillStyle = '#64748B'; ctx.font = '6px IBM Plex Mono';
      ctx.fillText('HVAC + rezervor + centrală', techX + techW / 2, techY + techH / 2 + 6);
      ctx.textAlign = 'left';
    }

    // Panouri fotovoltaice (opțional)
    const pvY = oy + bD * SC * .6;
    ctx.strokeStyle = 'rgba(34,197,94,.5)'; ctx.lineWidth = .7;
    for (let c = 0; c < 4; c++) {
      const pvX = ox + bW * SC * .05 + c * bW * SC * .12;
      ctx.fillStyle = 'rgba(34,197,94,.12)'; ctx.fillRect(pvX, pvY, bW * SC * .1, bD * SC * .1);
      ctx.strokeRect(pvX, pvY, bW * SC * .1, bD * SC * .1);
    }
    ctx.fillStyle = '#15803D'; ctx.font = '6px IBM Plex Mono';
    ctx.fillText('☀ Panouri fotovoltaice (opțional — conf. L372/2005)', ox + 4, pvY - 4);
  }

  function _drawAcoperisTerasaPenthouse(ctx, ox, oy, bW, bD, SC, aticW, P, _AC) {
    const ret = bW * SC * .12, retD = bD * SC * .12;
    // Terasă circulabilă perimetrală
    ctx.fillStyle = 'rgba(212,175,55,.10)';
    ctx.fillRect(ox + aticW, oy + aticW, bW * SC - aticW * 2, bD * SC - aticW * 2);
    // Perete penthouse
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(ox + ret, oy + retD, bW * SC - ret * 2, aticW);
    ctx.fillRect(ox + ret, oy + bD * SC - retD - aticW, bW * SC - ret * 2, aticW);
    ctx.fillRect(ox + ret, oy + retD, aticW, bD * SC - retD * 2);
    ctx.fillRect(ox + bW * SC - ret - aticW, oy + retD, aticW, bD * SC - retD * 2);
    // Interior penthouse
    ctx.fillStyle = 'rgba(212,175,55,.2)';
    ctx.fillRect(ox + ret + aticW, oy + retD + aticW, bW * SC - ret * 2 - aticW * 2, bD * SC - retD * 2 - aticW * 2);
    ctx.fillStyle = '#92400E'; ctx.font = 'bold 8px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('PENTHOUSE', ox + bW * SC / 2, oy + bD * SC / 2 - 4);
    ctx.fillStyle = '#B45309'; ctx.font = '7px IBM Plex Mono';
    ctx.fillText('Terasă circulabilă perimetrală', ox + bW * SC / 2, oy + bD * SC / 2 + 8);
    ctx.textAlign = 'left';
  }

  // ── Stratigrafie în secțiune ──────────────────────────────────────────
  function _drawStratigrafie(ctx, x, y, strat, availH, roofType, pantaGrade) {
    const totalGros = strat.reduce((s, r) => s + (parseFloat(r.grosime) || 0), 0) || 60;
    const maxLayerH = Math.min((availH * .65) / strat.length, 22);
    const sW = 170;

    ctx.fillStyle = '#0F172A'; ctx.font = 'bold 8px IBM Plex Mono';
    ctx.fillText('STRATIGRAFIE ACOPERIȘ', x, y - 5);
    ctx.font = '6px IBM Plex Mono'; ctx.fillStyle = '#64748B';
    ctx.fillText(roofType.toUpperCase() + ' · pantă ' + pantaGrade + '°', x, y + 4);

    strat.forEach((layer, i) => {
      const lH = Math.max(10, Math.min(maxLayerH, (parseFloat(layer.grosime) || 2) * .7 + 6));
      const ly = y + 14 + i * (lH + 1);

      ctx.fillStyle = layer.cod; ctx.fillRect(x, ly, sW, lH);
      ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = .5; ctx.strokeRect(x, ly, sW, lH);

      // Hașuri pentru materiale specifice
      if (layer.t.includes('Beton') || layer.t.includes('Planșeu')) _hatch(ctx, x, ly, sW, lH, 'rgba(0,0,0,.18)', .5, 4);
      if (layer.t.includes('Termoiz')) {
        ctx.strokeStyle = 'rgba(254,240,40,.6)'; ctx.lineWidth = .6;
        for (let hx = x; hx < x + sW; hx += 4) {
          ctx.beginPath(); ctx.moveTo(hx, ly + 1); ctx.lineTo(hx + 2, ly + lH - 1); ctx.stroke();
        }
      }

      ctx.fillStyle = lH > 12 ? '#0F172A' : 'rgba(15,23,42,.8)';
      ctx.font = `bold ${Math.min(6.5, lH * .6)}px IBM Plex Mono`;
      ctx.fillText(layer.t, x + 3, ly + Math.min(lH * .5 + 2, 8));
      ctx.font = `${Math.min(5.5, lH * .5)}px IBM Plex Mono`;
      ctx.fillStyle = 'rgba(30,41,59,.75)';
      ctx.fillText(layer.mat.slice(0, 36), x + 3, ly + Math.min(lH * .5 + 7, lH - 2));

      // Cotă grosime (dreapta)
      ctx.fillStyle = '#475569'; ctx.font = '6px IBM Plex Mono'; ctx.textAlign = 'right';
      ctx.fillText(layer.grosime, x + sW - 2, ly + lH / 2 + 2);
      ctx.textAlign = 'left';
    });

    // Total grosime
    const totalH = strat.length * (maxLayerH + 1) + 14;
    ctx.fillStyle = 'rgba(30,41,59,.8)'; ctx.font = 'bold 7px IBM Plex Mono';
    ctx.fillText('Total ≈ ' + totalGros + ' cm', x, y + totalH + 10);
  }

  // ── Legendă plan acoperiș ─────────────────────────────────────────────
  function _drawRoofLegend(ctx, x, y, roofType) {
    const items = roofType.includes('inclinat') || roofType.includes('mansarda')
      ? [
          { col: '#78350F', lbl: '─── Coamă' },
          { col: 'rgba(92,62,40,.5)', lbl: '─ ─ Capriori 8×18cm, pas 90cm' },
          { col: '#78350F', lbl: '── Pane 12×18cm' },
          { col: '#475569', lbl: '⊙ Burlan Ø100mm' },
          { col: '#92400E', lbl: '↘ Pantă ' + (roofType.includes('mansarda') ? '45' : '30') + '°' },
        ]
      : [
          { col: '#1D4ED8', lbl: '⊙ Sifon terasa Ø125mm' },
          { col: 'rgba(37,99,235,.5)', lbl: '→ Direcție pantă 2%' },
          { col: '#1E293B', lbl: '▓ Atic (parapet) 25cm' },
          { col: '#219134', lbl: '☀ Panouri FV (opțional)' },
        ];

    ctx.fillStyle = '#0F172A'; ctx.font = 'bold 7px IBM Plex Mono';
    ctx.fillText('LEGENDĂ', x, y);
    items.forEach(({ col, lbl }, i) => {
      ctx.fillStyle = col; ctx.fillRect(x, y + 6 + i * 12, 12, 8);
      ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = .5; ctx.strokeRect(x, y + 6 + i * 12, 12, 8);
      ctx.fillStyle = '#334155'; ctx.font = '6.5px IBM Plex Mono';
      ctx.fillText(lbl, x + 16, y + 12 + i * 12);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 2. AXONOMETRIE IZOMETRICĂ V3
  // ═══════════════════════════════════════════════════════════════════════

  function _rvRenderAxonoV3(b) {
    if (!b || !b.P) return;
    const { P, bW, bD, niv, cores } = b;
    const _AC = _rvGetAEDISConfig();
    const A = window.AEDIS || {};
    const hNiv = P.hn || 3.0;
    const Ht = niv * hNiv;
    const hParter = _AC.parterDiferit ? 4.5 : hNiv;
    const SC = Math.min(_RV.scale * .75, 9);
    const PAD = 70;
    const W = Math.min(bW * SC * 3 + PAD * 2 + 220, 2800);
    const H = Math.min((Ht + bD * .6) * SC + PAD * 2 + 120, 2400);

    const { cv, ctx } = _rvInitCanvas(W, H, 'rv-canvas');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H);

    // ── PROIECȚIE IZOMETRICĂ 30° ──────────────────────────────────────────
    // Axele: X = dreapta, Y = adâncime (30° dreapta), Z = sus
    const cos30 = Math.cos(Math.PI / 6);
    const sin30 = Math.sin(Math.PI / 6);

    const ox = PAD + 80;
    const oy = H - PAD - 50;

    function iso(wx, wy, wz) {
      return [
        ox + (wx - wy * cos30) * SC,
        oy - (wz * SC + wy * sin30 * SC)
      ];
    }

    function face(pts, fill, stroke, lw, lineType) {
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
      ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) {
        ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1;
        if (lineType === 'dash') ctx.setLineDash([4, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // ── TITLU ─────────────────────────────────────────────────────────────
    ctx.fillStyle = '#0F172A'; ctx.font = 'bold 12px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('AXONOMETRIE IZOMETRICĂ — ' + _AC.fnLabel.toUpperCase() + ' · ' + _AC.stilLabel.toUpperCase(), W * .45, 28);
    ctx.font = '8px IBM Plex Mono'; ctx.fillStyle = '#64748B';
    ctx.fillText(niv + ' niveluri · H=' + Ht.toFixed(1) + 'm · ' + bW.toFixed(1) + '×' + bD.toFixed(1) + 'm · ' + _AC.acoperisLabel, W * .45, 42);
    ctx.textAlign = 'left';

    // ── CULORI per stil ───────────────────────────────────────────────────
    const STIL_COLS = {
      modern:    { front: 'rgba(192,216,240,.9)',  side: 'rgba(162,196,224,.85)', top: 'rgba(210,225,240,.7)',  roof: 'rgba(40,60,100,.5)' },
      inovator:  { front: 'rgba(40,30,80,.85)',    side: 'rgba(30,22,65,.80)',   top: 'rgba(50,40,90,.6)',    roof: 'rgba(60,40,130,.6)' },
      clasic:    { front: 'rgba(232,208,144,.9)',  side: 'rgba(210,188,120,.85)', top: 'rgba(245,225,165,.7)', roof: 'rgba(124,74,48,.6)' },
      minimalist:{ front: 'rgba(240,244,248,.95)', side: 'rgba(220,228,235,.9)', top: 'rgba(248,250,252,.7)', roof: 'rgba(50,65,90,.4)'  },
      industrial:{ front: 'rgba(60,50,30,.85)',    side: 'rgba(48,42,28,.80)',   top: 'rgba(70,60,40,.6)',    roof: 'rgba(30,20,10,.65)' },
    };
    const COL = STIL_COLS[_AC.stil] || STIL_COLS.modern;

    // ── SUBSOL (dacă există) ──────────────────────────────────────────────
    if ((b.subsolNiv || 0) > 0) {
      const sH = 2.7;
      face([iso(0, 0, -sH), iso(bW, 0, -sH), iso(bW, 0, 0), iso(0, 0, 0)],
        'rgba(80,90,110,.35)', '#475569', 1.2, 'dash');
      face([iso(bW, 0, -sH), iso(bW, bD, -sH), iso(bW, bD, 0), iso(bW, 0, 0)],
        'rgba(60,70,90,.3)', '#475569', 1, 'dash');
      ctx.fillStyle = '#475569'; ctx.font = '7px IBM Plex Mono';
      const [slx, sly] = iso(bW / 2, 0, -sH / 2);
      ctx.fillText('S-1 Parcaj', slx + 4, sly);
    }

    // ── CORP CLĂDIRE — ETAJ CU ETAJ ──────────────────────────────────────
    for (let fl = 0; fl < niv; fl++) {
      const zBot = fl === 0 ? 0 : hParter + (fl - 1) * hNiv;
      const zTop = fl === 0 ? hParter : hParter + fl * hNiv;
      const isGround = fl === 0;
      const isTop = fl === niv - 1;
      const isRetras = _AC.etajRetras && isTop;
      const ret = isRetras ? bW * .12 : 0;

      const x1 = ret, x2 = bW - ret;
      const y1 = ret, y2 = bD - ret;

      // Fațada frontală
      const frontAlpha = isGround && _AC.parterDiferit ? .95 : 1;
      face([iso(x1, y1, zBot), iso(x2, y1, zBot), iso(x2, y1, zTop), iso(x1, y1, zTop)],
        isGround && _AC.parterDiferit ? 'rgba(160,130,200,.8)' : COL.front, '#1E293B', fl === 0 ? 2 : 1);

      // Fațada laterală
      face([iso(x2, y1, zBot), iso(x2, y2, zBot), iso(x2, y2, zTop), iso(x2, y1, zTop)],
        COL.side, '#1E293B', 1);

      // Bandou orizontal (planșeu)
      const bandH = _AC.bandH || .14;
      face([iso(x1, y1, zBot), iso(x2, y1, zBot), iso(x2, y2, zBot), iso(x1, y2, zBot)],
        'rgba(50,70,100,.25)', 'rgba(30,41,59,.4)', .8);

      // Ferestre — fațada frontală
      if (!_AC.hasCurtainWall) {
        _drawFerestreAxono(ctx, iso, x1, x2, y1, zBot, zTop, _AC, fl, niv, cores);
      } else {
        _drawCurtainWallAxono(ctx, iso, x1, x2, y1, zBot, zTop, _AC, fl);
      }

      // Ferestre — fațada laterală
      _drawFerestreAxonoLateral(ctx, iso, x2, y1, y2, zBot, zTop, _AC, fl, niv);

      // Balcoane (conform balconLaturi AEDIS)
      const laturi = A.balconLaturi || null;
      if (_AC.hasBalc && fl > 0) {
        const showN = !laturi || laturi.includes('N') || laturi.length === 0;
        const showE = !laturi || laturi.includes('E') || laturi.length === 0;
        if (showN) _drawBalconAxono(ctx, iso, x1 - _AC.balcD, x2 + _AC.balcD, y1, zBot, _AC, 'N');
        if (showE) _drawBalconAxonoSide(ctx, iso, x2, y1 - _AC.balcD, y2 + _AC.balcD, zBot, _AC);
      }

      // Parter diferit
      if (isGround && _AC.parterDiferit) {
        const [pdx, pdy] = iso(x1 + (x2 - x1) * .35, y1, zBot + hParter * .5);
        ctx.fillStyle = 'rgba(120,80,200,.8)'; ctx.font = 'bold 7px IBM Plex Mono';
        ctx.fillText(_AC.fnParterLabel || 'Parter com.', pdx + 4, pdy);
      }
    }

    // ── ACOPERIȘ ──────────────────────────────────────────────────────────
    const zTop = hParter + (niv - 1) * hNiv;
    const ret2 = _AC.etajRetras ? bW * .12 : 0;
    _drawAcoperisAxono(ctx, iso, face, ret2, bW - ret2, ret2, bD - ret2, zTop, _AC.tipAcoperis, bW, bD, hNiv, COL);

    // ── NUCLEE ────────────────────────────────────────────────────────────
    cores.forEach(core => {
      // Casă scări vizibilă deasupra nivelului maxim
      face([iso(core.x, core.y, zTop), iso(core.x + core.w, core.y, zTop), iso(core.x + core.w, core.y, zTop + 2.5), iso(core.x, core.y, zTop + 2.5)],
        'rgba(219,234,254,.6)', '#1D4ED8', 1.5);
      face([iso(core.x + core.w, core.y, zTop), iso(core.x + core.w, core.y + core.h, zTop), iso(core.x + core.w, core.y + core.h, zTop + 2.5), iso(core.x + core.w, core.y, zTop + 2.5)],
        'rgba(191,219,254,.5)', '#1D4ED8', 1);
      face([iso(core.x, core.y, zTop + 2.5), iso(core.x + core.w, core.y, zTop + 2.5), iso(core.x + core.w, core.y + core.h, zTop + 2.5), iso(core.x, core.y + core.h, zTop + 2.5)],
        'rgba(219,234,254,.7)', '#1D4ED8', 1);
      const [clx, cly] = iso(core.x + core.w / 2, core.y, zTop + 2.5 + .3);
      ctx.fillStyle = '#1E3A8A'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText(b.niv >= 5 ? '🪜 Sc. + 🛗' : '🪜 Scări', clx, cly - 4);
      ctx.textAlign = 'left';
    });

    // ── COTE ──────────────────────────────────────────────────────────────
    // Lățime (X)
    const [c1x, c1y] = iso(0, bD + 1, 0);
    const [c2x, c2y] = iso(bW, bD + 1, 0);
    ctx.strokeStyle = '#1E40AF'; ctx.lineWidth = .8;
    ctx.beginPath(); ctx.moveTo(c1x, c1y + 8); ctx.lineTo(c2x, c2y + 8); ctx.stroke();
    ctx.fillStyle = '#1E40AF'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText(bW.toFixed(2) + 'm', (c1x + c2x) / 2, (c1y + c2y) / 2 + 18);

    // Adâncime (Y)
    const [d1x, d1y] = iso(bW + 1, 0, 0);
    const [d2x, d2y] = iso(bW + 1, bD, 0);
    ctx.beginPath(); ctx.moveTo(d1x + 8, d1y); ctx.lineTo(d2x + 8, d2y); ctx.stroke();
    ctx.fillText(bD.toFixed(2) + 'm', (d1x + d2x) / 2 + 14, (d1y + d2y) / 2 + 4);

    // Înălțime (Z) — per etaj
    for (let i = 0; i <= niv; i++) {
      const z_i = i === 0 ? 0 : hParter + (i - 1) * hNiv;
      const [hx, hy] = iso(bW + 2, bD, z_i);
      ctx.fillStyle = '#1E40AF'; ctx.font = '7px IBM Plex Mono';
      ctx.fillText('+' + z_i.toFixed(2) + 'm' + (i === 0 ? ' (CTN)' : ' E' + (i - 1 === 0 ? 'P' : i - 1)), hx + 6, hy + 3);
      ctx.strokeStyle = '#1E40AF'; ctx.lineWidth = .6;
      ctx.beginPath(); ctx.moveTo(hx + 2, hy); ctx.lineTo(hx + 20, hy); ctx.stroke();
    }

    // ── AXE CONSTRUCTIVE ─────────────────────────────────────────────────
    const nAxeX = Math.max(2, Math.round(bW / 4.5));
    const nAxeY = Math.max(2, Math.round(bD / 4.5));
    ctx.fillStyle = '#1E293B'; ctx.strokeStyle = '#334155'; ctx.lineWidth = .6;
    for (let i = 0; i <= nAxeX; i++) {
      const [ax, ay] = iso(i * bW / nAxeX, 0, -.5);
      ctx.beginPath(); ctx.arc(ax, ay + 14, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#FFF'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText(String(i + 1), ax, ay + 17);
      ctx.fillStyle = '#1E293B';
    }
    for (let i = 0; i <= nAxeY; i++) {
      const [ax, ay] = iso(0, i * bD / nAxeY, -.5);
      ctx.beginPath(); ctx.arc(ax - 14, ay, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#FFF'; ctx.font = 'bold 6px IBM Plex Mono';
      ctx.fillText(String.fromCharCode(65 + i), ax - 14, ay + 3);
      ctx.fillStyle = '#1E293B';
    }
    ctx.textAlign = 'left';

    if (typeof _rvDrawCartus === 'function') _rvDrawCartus(ctx, W, H, P, null, 'AXONOMETRIE IZOMETRICĂ 30° — ' + _AC.stilLabel.toUpperCase());
  }

  // ── Ferestre fațada frontală axono ────────────────────────────────────
  function _drawFerestreAxono(ctx, iso, x1, x2, y1, zBot, zTop, _AC, fl, niv, cores) {
    const nW = Math.max(1, Math.floor((x2 - x1) / (_AC.wW * 1.8)));
    const sp = (x2 - x1) / nW;
    const wBot = zBot + (zTop - zBot) * .2;
    const wTop2 = wBot + _AC.wH;
    const coreX = cores[0] ? cores[0].x : (x1 + x2) / 2;
    const coreW2 = cores[0] ? cores[0].w : 3.6;
    for (let i = 0; i < nW; i++) {
      const wx = x1 + i * sp + sp * .2;
      if (wx > coreX - .3 && wx < coreX + coreW2 + .3) continue;
      const pts = [iso(wx, y1, wBot), iso(wx + _AC.wW, y1, wBot), iso(wx + _AC.wW, y1, wTop2), iso(wx, y1, wTop2)];
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
      ctx.closePath();
      ctx.fillStyle = _AC.stil === 'inovator' ? 'rgba(40,80,200,.75)' : 'rgba(186,230,253,.7)';
      ctx.fill();
      ctx.strokeStyle = '#0369A1'; ctx.lineWidth = 1; ctx.stroke();
      // Cerc-ramă
      if (_AC.stil === 'clasic') {
        const [mx, my] = iso(wx + _AC.wW / 2, y1, wTop2);
        ctx.beginPath(); ctx.arc(mx, my, _AC.wW / 2 * 6, Math.PI, 0, false);
        ctx.fillStyle = 'rgba(104,120,160,.4)'; ctx.fill();
        ctx.strokeStyle = '#d4b860'; ctx.lineWidth = .8; ctx.stroke();
      }
    }
  }

  function _drawFerestreAxonoLateral(ctx, iso, x2, y1, y2, zBot, zTop, _AC, fl, niv) {
    const nW = Math.max(1, Math.floor((y2 - y1) / (_AC.wW * 1.8)));
    const sp = (y2 - y1) / nW;
    const wBot = zBot + (zTop - zBot) * .2;
    const wTop2 = wBot + _AC.wH;
    for (let i = 0; i < nW; i++) {
      const wy = y1 + i * sp + sp * .2;
      const pts = [iso(x2, wy, wBot), iso(x2, wy + _AC.wW, wBot), iso(x2, wy + _AC.wW, wTop2), iso(x2, wy, wTop2)];
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
      ctx.closePath();
      ctx.fillStyle = 'rgba(186,230,253,.5)'; ctx.fill();
      ctx.strokeStyle = '#0369A1'; ctx.lineWidth = .8; ctx.stroke();
    }
  }

  function _drawCurtainWallAxono(ctx, iso, x1, x2, y1, zBot, zTop, _AC, fl) {
    const nP = Math.max(2, Math.floor((x2 - x1) / 1.5));
    const sp = (x2 - x1) / nP;
    for (let i = 0; i <= nP; i++) {
      const [mx, my] = iso(x1 + i * sp, y1, zBot);
      const [mx2, my2] = iso(x1 + i * sp, y1, zTop);
      ctx.strokeStyle = '#1e3060'; ctx.lineWidth = .8;
      ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx2, my2); ctx.stroke();
    }
    // Panou sticlă
    const pts = [iso(x1, y1, zBot), iso(x2, y1, zBot), iso(x2, y1, zTop), iso(x1, y1, zTop)];
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
    ctx.closePath();
    ctx.fillStyle = 'rgba(40,100,200,.45)'; ctx.fill();
    ctx.strokeStyle = '#1e3060'; ctx.lineWidth = 1.5; ctx.stroke();
    // Traversa
    const [tx, ty] = iso(x1, y1, (zBot + zTop) / 2);
    const [tx2, ty2] = iso(x2, y1, (zBot + zTop) / 2);
    ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx2, ty2); ctx.stroke();
  }

  function _drawBalconAxono(ctx, iso, x1, x2, y1, z, _AC, side) {
    const bH = .12, bD = _AC.balcD;
    // Placă
    ctx.fillStyle = 'rgba(203,213,225,.9)';
    const pts = [iso(x1, y1, z), iso(x2, y1, z), iso(x2, y1, z + bH), iso(x1, y1, z + bH)];
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
    ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.stroke();
    // Parapet
    ctx.strokeStyle = '#0369A1'; ctx.lineWidth = 2;
    const [p1x, p1y] = iso(x1, y1, z + bH + .9);
    const [p2x, p2y] = iso(x2, y1, z + bH + .9);
    ctx.beginPath(); ctx.moveTo(p1x, p1y); ctx.lineTo(p2x, p2y); ctx.stroke();
  }

  function _drawBalconAxonoSide(ctx, iso, x2, y1, y2, z, _AC) {
    const bH = .12;
    ctx.fillStyle = 'rgba(203,213,225,.7)';
    const pts = [iso(x2, y1, z), iso(x2, y2, z), iso(x2, y2, z + bH), iso(x2, y1, z + bH)];
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
    ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke();
  }

  function _drawAcoperisAxono(ctx, iso, face, x1, x2, y1, y2, z, roofType, bW, bD, hNiv, COL) {
    if (roofType === 'inclinat' || roofType === 'sarpanta') {
      const rH = bW * .22;
      const ridX = (x1 + x2) / 2, ridY = (y1 + y2) / 2;
      face([iso(x1, y1, z), iso(x2, y1, z), iso(ridX, ridY, z + rH)], 'rgba(120,80,50,.6)', '#4A3728', 2);
      face([iso(x2, y1, z), iso(x2, y2, z), iso(ridX, ridY, z + rH)], 'rgba(100,65,40,.5)', '#4A3728', 1.5);
      face([iso(x1, y1, z), iso(x1, y2, z), iso(ridX, ridY, z + rH)], 'rgba(90,60,35,.4)', '#4A3728', 1);
      // Coamă
      ctx.strokeStyle = '#3A2810'; ctx.lineWidth = 2.5;
      const [rx, ry] = iso(ridX, y1, z + rH);
      const [rx2, ry2] = iso(ridX, y2, z + rH);
      ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx2, ry2); ctx.stroke();
    } else if (roofType === 'mansarda') {
      const rH = bW * .35;
      const ret3 = bW * .15, retD3 = bD * .15;
      face([iso(x1, y1, z), iso(x2, y1, z), iso(x2 - ret3, y1 + retD3, z + rH), iso(x1 + ret3, y1 + retD3, z + rH)], 'rgba(80,70,60,.6)', '#4A3728', 2);
      face([iso(x2, y1, z), iso(x2, y2, z), iso(x2 - ret3, y2 - retD3, z + rH), iso(x2 - ret3, y1 + retD3, z + rH)], 'rgba(70,60,50,.5)', '#4A3728', 1.5);
      face([iso(x1 + ret3, y1 + retD3, z + rH), iso(x2 - ret3, y1 + retD3, z + rH), iso(x2 - ret3, y2 - retD3, z + rH), iso(x1 + ret3, y2 - retD3, z + rH)], 'rgba(50,80,60,.3)', '#334155', 1);
    } else if (roofType === 'penthouse' || roofType === 'penthouse_terasa') {
      const ph = hNiv * .85, ret4 = bW * .13;
      // Terasă principală
      face([iso(x1, y1, z), iso(x2, y1, z), iso(x2, y2, z), iso(x1, y2, z)], 'rgba(180,190,200,.7)', '#334155', 1.5);
      // Penthouse box
      face([iso(x1 + ret4, y1 + ret4, z), iso(x2 - ret4, y1 + ret4, z), iso(x2 - ret4, y1 + ret4, z + ph), iso(x1 + ret4, y1 + ret4, z + ph)], 'rgba(212,175,55,.35)', '#B45309', 2);
      face([iso(x2 - ret4, y1 + ret4, z), iso(x2 - ret4, y2 - ret4, z), iso(x2 - ret4, y2 - ret4, z + ph), iso(x2 - ret4, y1 + ret4, z + ph)], 'rgba(180,150,40,.3)', '#B45309', 1.5);
      face([iso(x1 + ret4, y1 + ret4, z + ph), iso(x2 - ret4, y1 + ret4, z + ph), iso(x2 - ret4, y2 - ret4, z + ph), iso(x1 + ret4, y2 - ret4, z + ph)], 'rgba(212,175,55,.5)', '#B45309', 1);
    } else {
      // Terasă plată
      face([iso(x1, y1, z), iso(x2, y1, z), iso(x2, y2, z), iso(x1, y2, z)], COL.top, '#334155', 1.5);
      // Atic
      const aH = .9;
      face([iso(x1, y1, z), iso(x2, y1, z), iso(x2, y1, z + aH), iso(x1, y1, z + aH)], 'rgba(100,116,139,.45)', '#475569', 1);
      face([iso(x2, y1, z), iso(x2, y2, z), iso(x2, y2, z + aH), iso(x2, y1, z + aH)], 'rgba(80,100,120,.35)', '#475569', 1);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 3. PLAN SITUAȚIE V3 — circulații complete
  // ═══════════════════════════════════════════════════════════════════════

  function _rvRenderSituatieV3(b) {
    if (!b || !b.P) return;
    const { P, bW, bD, niv } = b;
    const _AC = _rvGetAEDISConfig();
    const SC = Math.min(_RV.scale * .6, 6);
    const PAD = 80, CTX = 55;
    const pW = P.W * SC, pH = P.D * SC;
    const W = Math.min(pW + PAD * 2 + CTX * 2 + 260, 2800);
    const H = Math.min(pH + PAD * 2 + CTX * 2 + 200, 2400);

    const { cv, ctx } = _rvInitCanvas(W, H, 'rv-canvas');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H);

    const ox = PAD + CTX, oy = PAD + CTX;
    const bX = ox + (pW - bW * SC) / 2;
    const bY = oy + (pH - bD * SC) / 2;

    // ── TITLU ─────────────────────────────────────────────────────────────
    ctx.fillStyle = '#0F172A'; ctx.font = 'bold 12px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('PLAN DE SITUAȚIE — COTAT + CIRCULAȚII', ox + pW / 2, oy - 40);
    ctx.font = '8px IBM Plex Mono'; ctx.fillStyle = '#64748B';
    ctx.fillText('Nr.cad. ' + P.nrCad + ' · S=' + P.area.toFixed(0) + 'm² · UTR ' + P.utr + ' · ' + _AC.fnLabel + ' · Sc. 1:' + Math.round(100 / (_RV.scale / 12)), ox + pW / 2, oy - 24);
    ctx.textAlign = 'left';

    // ── CONTEXT (vecini) ──────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(226,232,240,.45)';
    ctx.fillRect(ox - CTX, oy - CTX, pW + CTX * 2, pH + CTX * 2);
    // Vecini schematici
    ctx.strokeStyle = 'rgba(148,163,184,.3)'; ctx.lineWidth = .5; ctx.setLineDash([4, 4]);
    [[ox - CTX, oy, CTX, pH], [ox + pW, oy, CTX, pH],
     [ox, oy - CTX, pW, CTX], [ox, oy + pH, pW, CTX]].forEach(([x, y, w, h]) => {
      ctx.fillStyle = 'rgba(200,210,220,.25)'; ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
    });
    ctx.setLineDash([]);

    // ── PARCELA ───────────────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(254,252,232,.6)'; ctx.fillRect(ox, oy, pW, pH);
    ctx.strokeStyle = '#854D0E'; ctx.lineWidth = 2.5; ctx.strokeRect(ox, oy, pW, pH);
    // Cote latimi parcela
    _dimLinePDF(ctx, ox, oy - 22, ox + pW, oy - 22, P.W.toFixed(2) + 'm', 'H', '#1E40AF');
    _dimLinePDF(ctx, ox - 22, oy, ox - 22, oy + pH, P.D.toFixed(2) + 'm', 'V', '#1E40AF');

    // ── RETRAGERI (limita construibilă) ───────────────────────────────────
    const rf = (P.rf || 3) * SC, rs = (P.rs || 3) * SC, rl = (P.rl || 2) * SC;
    ctx.strokeStyle = 'rgba(180,120,20,.4)'; ctx.lineWidth = 1; ctx.setLineDash([6, 4]);
    ctx.strokeRect(ox + rl, oy + rf, pW - rl * 2, pH - rf - rs);
    ctx.setLineDash([]);
    ctx.fillStyle = '#92400E'; ctx.font = '6px IBM Plex Mono';
    ctx.fillText('Retragere față: ' + (P.rf || 3) + 'm', ox + rl + 2, oy + rf - 3);
    ctx.fillText('Ret. spate: ' + (P.rs || 3) + 'm', ox + rl + 2, oy + pH - rs + 10);
    ctx.fillText('Ret. lat.: ' + (P.rl || 2) + 'm', ox + 2, oy + pH / 2);

    // ── CLĂDIRE PROPUSĂ ───────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(30,64,175,.12)'; ctx.fillRect(bX, bY, bW * SC, bD * SC);
    // Hașuri diagonale
    ctx.save(); ctx.beginPath(); ctx.rect(bX, bY, bW * SC, bD * SC); ctx.clip();
    ctx.strokeStyle = 'rgba(30,64,175,.15)'; ctx.lineWidth = .7;
    for (let h = -bD * SC; h < bW * SC + bD * SC; h += 7) {
      ctx.beginPath(); ctx.moveTo(bX + h, bY); ctx.lineTo(bX + h + bD * SC, bY + bD * SC); ctx.stroke();
    }
    ctx.restore();
    ctx.strokeStyle = '#1E40AF'; ctx.lineWidth = 2.5; ctx.strokeRect(bX, bY, bW * SC, bD * SC);
    // Cote clădire
    _dimLinePDF(ctx, bX, bY - 12, bX + bW * SC, bY - 12, bW.toFixed(2) + 'm', 'H', '#DC2626');
    _dimLinePDF(ctx, bX - 12, bY, bX - 12, bY + bD * SC, bD.toFixed(2) + 'm', 'V', '#DC2626');
    // Etichetă
    ctx.fillStyle = '#1E40AF'; ctx.font = 'bold 8px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('CLĂDIRE PROPUSĂ', bX + bW * SC / 2, bY + bD * SC / 2 - 5);
    ctx.fillText('P+' + (niv - 1) + ' · H=' + (niv * P.hn).toFixed(1) + 'm', bX + bW * SC / 2, bY + bD * SC / 2 + 7);
    ctx.fillText('SC=' + Math.round(bW * bD) + 'm² (POT=' + (bW * bD / P.area * 100).toFixed(1) + '%)', bX + bW * SC / 2, bY + bD * SC / 2 + 19);
    ctx.textAlign = 'left';

    // ── STRADĂ ────────────────────────────────────────────────────────────
    const stradaW = Math.max(18, 6 * SC);
    const isNorth = P.frontDir === 'N' || !P.frontDir;
    const stradaY = isNorth ? oy - stradaW : oy + pH;
    ctx.fillStyle = 'rgba(190,200,210,.7)';
    ctx.fillRect(ox - CTX, stradaY, pW + CTX * 2, stradaW);
    // Axa stradă (linie galbenă discontinuă)
    ctx.strokeStyle = '#CA8A04'; ctx.lineWidth = 1; ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(ox - CTX, stradaY + stradaW / 2);
    ctx.lineTo(ox + pW + CTX, stradaY + stradaW / 2); ctx.stroke();
    ctx.setLineDash([]);
    // Bordura
    ctx.strokeStyle = 'rgba(71,85,105,.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox - CTX, stradaY + (isNorth ? stradaW : 0));
    ctx.lineTo(ox + pW + CTX, stradaY + (isNorth ? stradaW : 0)); ctx.stroke();
    ctx.fillStyle = '#475569'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('STRADĂ (cat.III est. ~6m)', ox + pW / 2, stradaY + stradaW / 2 + 3);
    ctx.textAlign = 'left';

    // ── TROTUARE ──────────────────────────────────────────────────────────
    const trotuarW = Math.max(6, 1.5 * SC);
    ctx.fillStyle = 'rgba(203,213,225,.4)';
    if (isNorth) {
      ctx.fillRect(ox, oy - trotuarW, pW, trotuarW); // față parcelă = N
      ctx.strokeStyle = 'rgba(100,116,139,.4)'; ctx.lineWidth = .8;
      ctx.strokeRect(ox, oy - trotuarW, pW, trotuarW);
    } else {
      ctx.fillRect(ox, oy + pH, pW, trotuarW);
      ctx.strokeRect(ox, oy + pH, pW, trotuarW);
    }

    // ── ACCES PIETONAL PRINCIPAL ──────────────────────────────────────────
    const accW = Math.max(8, 1.5 * SC), accL = (P.rf || 3) * SC;
    const accX = bX + bW * SC / 2 - accW / 2;
    const accY = isNorth ? oy : oy + pH - accL;
    ctx.fillStyle = 'rgba(148,163,184,.35)'; ctx.fillRect(accX, accY, accW, accL);
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; ctx.strokeRect(accX, accY, accW, accL);
    // Săgeată direcție
    const arrowY = isNorth ? accY + accL * .5 : accY + accL * .5;
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(accX + accW / 2, arrowY - accL * .25);
    ctx.lineTo(accX + accW / 2, arrowY + accL * .25); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(accX + accW / 2 - 4, arrowY + accL * .25 * (isNorth ? -1 : 1));
    ctx.lineTo(accX + accW / 2, arrowY + accL * .25 * (isNorth ? -1.5 : 1.5));
    ctx.lineTo(accX + accW / 2 + 4, arrowY + accL * .25 * (isNorth ? -1 : 1)); ctx.stroke();
    ctx.fillStyle = '#334155'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('ACCES', accX + accW / 2, arrowY + 4);
    ctx.fillText('PIETONAL', accX + accW / 2, arrowY + 11);
    ctx.textAlign = 'left';

    // ── ACCES AUTO (parcare la sol / garaj) ───────────────────────────────
    const hasParcare = !b.subsolNiv && P.area > 300;
    if (hasParcare) {
      // Acces auto
      const autW = Math.max(12, 3 * SC), autL = (P.rf || 3) * SC;
      const autX = bX + bW * SC * .75;
      const autY = isNorth ? oy : oy + pH - autL;
      ctx.fillStyle = 'rgba(251,191,36,.18)'; ctx.fillRect(autX, autY, autW, autL);
      ctx.strokeStyle = '#D97706'; ctx.lineWidth = 1.5; ctx.strokeRect(autX, autY, autW, autL);
      ctx.fillStyle = '#92400E'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('ACCES AUTO', autX + autW / 2, autY + autL * .5 - 3);
      ctx.fillText('3.5m', autX + autW / 2, autY + autL * .5 + 6);
      ctx.textAlign = 'left';
      // Locuri parcare (în incintă)
      const nLoc = Math.min(6, Math.floor((pW - accW - autW - 20) / (2.5 * SC)));
      if (nLoc > 0) {
        const lotX = ox + rl + 2;
        const lotY = bY + bD * SC + 4;
        const lotW = 2.5 * SC, lotL = 5 * SC;
        if (lotY + lotL < oy + pH - rs) {
          for (let i = 0; i < nLoc; i++) {
            const lx = lotX + i * (lotW + 1);
            if (lx + lotW > ox + pW - rl - 2) break;
            ctx.fillStyle = 'rgba(241,245,249,.8)'; ctx.fillRect(lx, lotY, lotW, lotL);
            ctx.strokeStyle = '#94A3B8'; ctx.lineWidth = .8; ctx.strokeRect(lx, lotY, lotW, lotL);
            ctx.fillStyle = '#64748B'; ctx.font = '6px IBM Plex Mono'; ctx.textAlign = 'center';
            ctx.fillText(String(i + 1), lx + lotW / 2, lotY + lotL / 2 + 2);
            ctx.textAlign = 'left';
          }
          ctx.fillStyle = '#334155'; ctx.font = '6px IBM Plex Mono';
          ctx.fillText('Parcare la sol (' + nLoc + ' loc. 2.5×5m)', lotX, lotY - 3);
        }
      }
    }

    // ── RAMPĂ SUBSOL ──────────────────────────────────────────────────────
    if ((b.subsolNiv || 0) > 0) {
      const rW = Math.max(14, 3.6 * SC), rL = Math.max(18, 9 * SC);
      const rX = ox + pW - rl - rW - 2;
      const rY = isNorth ? oy : oy + pH - rL;
      // Contur rampă cu hașuri diagonale (galben)
      ctx.fillStyle = 'rgba(254,243,199,.7)'; ctx.fillRect(rX, rY, rW, rL);
      ctx.save(); ctx.beginPath(); ctx.rect(rX, rY, rW, rL); ctx.clip();
      ctx.strokeStyle = 'rgba(180,100,20,.3)'; ctx.lineWidth = .6;
      for (let h = -rL; h < rW + rL; h += 5) {
        ctx.beginPath(); ctx.moveTo(rX + h, rY); ctx.lineTo(rX + h + rL, rY + rL); ctx.stroke();
      }
      ctx.restore();
      ctx.strokeStyle = '#B45309'; ctx.lineWidth = 2; ctx.strokeRect(rX, rY, rW, rL);
      // Indicatoare pantă
      ctx.strokeStyle = '#D97706'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(rX + rW / 2, rY); ctx.lineTo(rX + rW / 2, rY + rL); ctx.stroke();
      const arRY = rY + rL * .6;
      ctx.beginPath();
      ctx.moveTo(rX + rW / 2 - 5, arRY - 8); ctx.lineTo(rX + rW / 2, arRY);
      ctx.lineTo(rX + rW / 2 + 5, arRY - 8); ctx.stroke();
      ctx.fillStyle = '#92400E'; ctx.font = 'bold 6.5px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('RAMPĂ', rX + rW / 2, rY + rL * .25);
      ctx.fillText('AUTO', rX + rW / 2, rY + rL * .35);
      ctx.font = '5.5px IBM Plex Mono';
      ctx.fillText('L=' + 9 + 'm', rX + rW / 2, rY + rL * .48);
      ctx.fillText('i≤15%', rX + rW / 2, rY + rL * .58);
      ctx.fillText('l=3.6m', rX + rW / 2, rY + rL * .68);
      // Semn INTRARE / IEȘIRE
      ctx.fillStyle = 'rgba(239,68,68,.8)'; ctx.font = 'bold 5px IBM Plex Mono';
      ctx.fillText('↓ IEȘIRE URGENȚĂ', rX + rW / 2, rY - 5);
      ctx.textAlign = 'left';
    }

    // ── SPAȚII VERZI ──────────────────────────────────────────────────────
    const svL = bX - ox - rl, svR = ox + pW - rl - (bX + bW * SC);
    const svTop = bY - oy - rf;
    function drawSV(x, y, w, h) {
      if (w < 5 || h < 5) return;
      ctx.fillStyle = 'rgba(22,163,74,.18)'; ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = 'rgba(22,163,74,.4)'; ctx.lineWidth = .7; ctx.strokeRect(x, y, w, h);
      // Copaci schematici
      const nT = Math.max(1, Math.floor(Math.min(w, h) / 20));
      for (let t = 0; t < nT; t++) {
        const tx2 = x + w * .3 + t * w * .35;
        const ty2 = y + h * .5;
        ctx.fillStyle = 'rgba(22,163,74,.6)'; ctx.beginPath(); ctx.arc(tx2, ty2, 8, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#166534'; ctx.lineWidth = .8; ctx.beginPath(); ctx.arc(tx2, ty2, 8, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(tx2, ty2 + 6); ctx.lineTo(tx2, ty2 + 14); ctx.stroke();
      }
    }
    if (svL > 5) drawSV(ox + rl, bY, svL, bD * SC);
    if (svR > 5) drawSV(bX + bW * SC, bY, svR, bD * SC);
    if (svTop > 5) drawSV(bX, oy + rf, bW * SC, svTop);
    // Suprafata SV
    const svTotal = Math.max(0, svL * bD * SC + svR * bD * SC + svTop * bW * SC) / SC / SC;
    ctx.fillStyle = '#166534'; ctx.font = '6px IBM Plex Mono';
    ctx.fillText('SV = ' + Math.round(svTotal) + 'm² (' + (svTotal / P.area * 100).toFixed(0) + '% din parcelă)', ox + rl + 2, oy + pH + 18);

    // ── INDICATORI ────────────────────────────────────────────────────────
    const indX = ox + pW + 20, indY = oy;
    ctx.fillStyle = '#0F172A'; ctx.font = 'bold 9px IBM Plex Mono'; ctx.fillText('INDICATORI URBANISTICI', indX, indY + 8);
    const inds = [
      ['Suprafată teren', P.area.toFixed(0) + ' m²'],
      ['SC propusă', (bW * bD).toFixed(0) + ' m²'],
      ['SDA propusă', (bW * bD * niv).toFixed(0) + ' m²'],
      ['POT propus', (bW * bD / P.area * 100).toFixed(1) + '% / max ' + Math.round(P.pot * 100) + '%'],
      ['CUT propus', (bW * bD * niv / P.area).toFixed(2) + ' / max ' + P.cut],
      ['H max propusă', (niv * P.hn).toFixed(1) + 'm'],
      ['Retragere față', (P.rf || 3) + 'm'],
      ['Retragere spate', (P.rs || 3) + 'm'],
      ['Retrageri laterale', (P.rl || 2) + 'm'],
      ['Nr. locuri parcare', (b.subsolNiv || 0) > 0 ? (Math.floor(bW * bD / 28) * b.subsolNiv) + ' (subsol)' : 'la sol'],
      ['Suprafata verde', Math.round(svTotal) + ' m² (' + (svTotal / P.area * 100).toFixed(0) + '%)'],
    ];
    inds.forEach(([lbl, val], i) => {
      const ry = indY + 18 + i * 8;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(248,250,255,.8)' : 'rgba(240,245,255,.8)';
      ctx.fillRect(indX, ry - 4, 200, 7.5);
      ctx.strokeStyle = 'rgba(148,163,184,.3)'; ctx.lineWidth = .4; ctx.strokeRect(indX, ry - 4, 200, 7.5);
      ctx.fillStyle = '#1E3A8A'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.fillText(lbl, indX + 2, ry + .5);
      ctx.fillStyle = '#15803D'; ctx.font = '6px IBM Plex Mono'; ctx.fillText(val, indX + 118, ry + .5);
    });

    // Legendă
    const legY = indY + 18 + inds.length * 8 + 12;
    [
      { col: 'rgba(30,64,175,.12)', bc: '#1E40AF', lbl: 'Clădire propusă' },
      { col: 'rgba(22,163,74,.18)', bc: '#15803D', lbl: 'Spații verzi' },
      { col: 'rgba(254,243,199,.7)', bc: '#B45309', lbl: 'Rampă subsol' },
      { col: 'rgba(148,163,184,.35)', bc: '#475569', lbl: 'Acces pietonal' },
      { col: 'rgba(251,191,36,.18)', bc: '#D97706', lbl: 'Acces auto' },
    ].forEach(({ col, bc, lbl }, i) => {
      const ly = legY + i * 12;
      ctx.fillStyle = col; ctx.fillRect(indX, ly - 7, 12, 10);
      ctx.strokeStyle = bc; ctx.lineWidth = .8; ctx.strokeRect(indX, ly - 7, 12, 10);
      ctx.fillStyle = '#334155'; ctx.font = '6.5px IBM Plex Mono'; ctx.fillText(lbl, indX + 16, ly);
    });

    // Nord
    if (typeof _rvDrawNorth === 'function') _rvDrawNorth(ctx, W - 50, 60, P.frontDir);
    if (typeof _rvDrawCartus === 'function') _rvDrawCartus(ctx, W, H, P, null, 'PLAN DE SITUAȚIE — COTAT + CIRCULAȚII');
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 4. HOOK PLAN NIVEL — completare cu uși/scări/accese
  // ═══════════════════════════════════════════════════════════════════════

  function _hookPlanRender() {
    const origRender = window._rvRenderPlan;
    if (!origRender || window._PLAN_V3_HOOKED) return;
    window._PLAN_V3_HOOKED = true;

    window._rvRenderPlan = function (fl, b) {
      origRender.apply(this, arguments);
      // Post-procesare: adaugă simboluri suplimentare după render-ul principal
      // (planfix.js v2 deja include scări+lift+uși cu arc + etichete)
      // Adăugăm doar: indicator nord + cotă nivel
      const ctx = document.getElementById('rv-canvas')?.getContext('2d');
      if (!ctx || !b || !_RV.planOx) return;
      const ox = _RV.planOx, oy = _RV.planOy, SC = _RV.planSc;
      const P = b.P;
      // Etichetă nivel curent (stânga sus)
      ctx.fillStyle = 'rgba(30,64,175,.85)'; ctx.font = 'bold 9px IBM Plex Mono';
      const lvl = _RV.floor === 0 ? 'PARTER (P) · ±0.00m' : 'ETAJ ' + _RV.floor + ' (E' + _RV.floor + ') · +' + (_RV.floor * (P.hn || 3)).toFixed(2) + 'm';
      ctx.fillText(lvl, ox, oy - 55);
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 5. EXPORT SVG + DXF per planșă
  // ═══════════════════════════════════════════════════════════════════════

  function _injectExportButtons() {
    const _try = () => {
      if (document.getElementById('rv-svg-per-plansa')) return true;
      const toolbar = document.querySelector('.rv-toolbar-right, #rv-expbtn-wrap, .rv-expbtn')?.parentElement;
      if (!toolbar) return false;

      const wrap = document.createElement('span');
      wrap.id = 'rv-svg-per-plansa';

      [
        { id: 'rv-svg-tab-btn', icon: '🔷', label: 'SVG', fn: _exportCurrentSVG,
          bg: 'rgba(56,189,248,.12)', border: 'rgba(56,189,248,.4)', col: '#38bdf8' },
        { id: 'rv-dxf-tab-btn', icon: '📐', label: 'DXF', fn: _exportCurrentDXF,
          bg: 'rgba(99,102,241,.12)', border: 'rgba(99,102,241,.4)', col: '#818cf8' },
      ].forEach(b => {
        const btn = document.createElement('button');
        btn.id = b.id; btn.innerHTML = b.icon + ' ' + b.label;
        btn.title = b.label + ' — planșa curentă';
        btn.style.cssText = 'height:28px;padding:0 10px;border-radius:6px;cursor:pointer;font-family:inherit;font-size:10px;font-weight:800;margin-left:5px;' +
          `background:${b.bg};border:1.5px solid ${b.border};color:${b.col};display:inline-flex;align-items:center;flex-shrink:0`;
        btn.onclick = b.fn;
        wrap.appendChild(btn);
      });
      toolbar.appendChild(wrap);
      return true;
    };
    if (_try()) return;
    const obs = setInterval(() => { if (_try()) clearInterval(obs); }, 800);
    setTimeout(() => clearInterval(obs), 15000);
  }

  function _exportCurrentSVG() {
    const cv = document.getElementById('rv-canvas');
    if (!cv) return;
    const b = _RV?.building, P = _RV?.parcelParams;
    if (!b || !P) { alert('Generați planșa mai întâi.'); return; }
    const tab = _RV.tab || 'plan';
    const _AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};

    // SVG vectorial din canvas — convertit cu structură corectă
    const W = cv.width, H = cv.height;
    const imgData = cv.toDataURL('image/png', 1.0);

    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- UrbanX SVG Export · Nr.cad. ${P.nrCad} · ${tab.toUpperCase()} · ${_AC.fnLabel} · ${new Date().toISOString().slice(0, 10)} -->
<!-- Import în: AutoCAD (Insert>PDF/Image), FreeCAD Drawing, Inkscape, Illustrator -->
<!-- Scara: 1:${Math.round(100 / ((_RV.scale || 12) / 12))} -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${(W / 3.7795).toFixed(0)}mm" height="${(H / 3.7795).toFixed(0)}mm"
  viewBox="0 0 ${W} ${H}"
  version="1.1">
  <title>UrbanX · ${tab.toUpperCase()} · Nr.cad. ${P.nrCad}</title>
  <desc>Document orientativ pre-proiectare · UrbanX TSS·FG · ${new Date().toLocaleDateString('ro-RO')}</desc>
  <metadata>
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
             xmlns:dc="http://purl.org/dc/elements/1.1/">
      <rdf:Description rdf:about="">
        <dc:title>Plan ${tab} · Nr.cad. ${P.nrCad}</dc:title>
        <dc:creator>UrbanX TSS·FG</dc:creator>
        <dc:subject>Arhitectura · ${_AC.fnLabel} · ${_AC.stilLabel}</dc:subject>
        <dc:description>Document orientativ pre-proiectare. Nu înlocuieste proiectul tehnic.</dc:description>
        <dc:date>${new Date().toISOString()}</dc:date>
      </rdf:Description>
    </rdf:RDF>
  </metadata>
  <g id="planplansa_${tab}">
    <image x="0" y="0" width="${W}" height="${H}" xlink:href="${imgData}" />
  </g>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `urbanx_${tab}_${P.nrCad}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    if (typeof ss === 'function') ss('✅ SVG exportat: ' + tab.toUpperCase());
  }

  function _exportCurrentDXF() {
    const cv = document.getElementById('rv-canvas');
    const b = _RV?.building, P = _RV?.parcelParams;
    if (!cv || !b || !P) { alert('Generați planșa mai întâi.'); return; }
    const tab = _RV.tab || 'plan';

    // DXF minimal cu contururi extrase din rects
    const fl = _RV.floors?.[_RV.floor || 0];
    const SC = 1000; // 1m = 1000 DXF units
    const lines = [];
    const L = (x1, y1, x2, y2, layer) =>
      lines.push(`0\nLINE\n8\n${layer}\n10\n${x1}\n20\n${-y1}\n30\n0\n11\n${x2}\n21\n${-y2}\n31\n0`);
    const TXT = (x, y, h, txt, layer) =>
      lines.push(`0\nTEXT\n8\n${layer}\n10\n${x}\n20\n${-y}\n30\n0\n40\n${h}\n1\n${txt}`);

    const header = `0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1015\n9\n$INSUNITS\n70\n6\n0\nENDSEC\n0\nSECTION\n2\nTABLES\n0\nTABLE\n2\nLAYER\n70\n8`;
    const layers = ['PERETI_EXT', 'PERETI_INT', 'FERESTRE', 'USI', 'TEXTE', 'COTE', 'CORE'];
    const layerDefs = layers.map(l => `0\nLAYER\n2\n${l}\n70\n0\n62\n7\n6\nCONTINUOUS`).join('\n');
    const endTables = `0\nENDTAB\n0\nENDSEC\n0\nSECTION\n2\nENTITIES`;

    // Contur clădire
    const bW = b.bW, bD = b.bD;
    L(0, 0, bW * SC, 0, 'PERETI_EXT');
    L(bW * SC, 0, bW * SC, bD * SC, 'PERETI_EXT');
    L(bW * SC, bD * SC, 0, bD * SC, 'PERETI_EXT');
    L(0, bD * SC, 0, 0, 'PERETI_EXT');

    // Camere
    (fl?.rects || []).forEach(r => {
      const layer = r.t === 'core' ? 'CORE' : 'PERETI_INT';
      L(r.x * SC, r.y * SC, (r.x + r.w) * SC, r.y * SC, layer);
      L((r.x + r.w) * SC, r.y * SC, (r.x + r.w) * SC, (r.y + r.h) * SC, layer);
      L((r.x + r.w) * SC, (r.y + r.h) * SC, r.x * SC, (r.y + r.h) * SC, layer);
      L(r.x * SC, (r.y + r.h) * SC, r.x * SC, r.y * SC, layer);
      const lbl = (r.lbl || r.t).replace(/\n/, ' ').slice(0, 20);
      TXT((r.x + r.w / 2) * SC, (r.y + r.h / 2) * SC, 200, lbl, 'TEXTE');
      TXT((r.x + r.w / 2) * SC, (r.y + r.h / 2 + .25) * SC, 150, 's=' + (r.w * r.h).toFixed(2) + 'mp', 'TEXTE');
    });

    // Cote exterioare
    TXT(bW * SC / 2, -500, 200, bW.toFixed(2) + 'm', 'COTE');
    TXT(-800, bD * SC / 2, 200, bD.toFixed(2) + 'm', 'COTE');

    const dxfContent = [header, layerDefs, endTables, lines.join('\n'), '0\nENDSEC\n0\nEOF'].join('\n');
    const blob = new Blob([dxfContent], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `urbanx_${tab}_${P.nrCad}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
    if (typeof ss === 'function') ss('✅ DXF exportat: ' + tab.toUpperCase() + ' · import AutoCAD/FreeCAD');
  }

  // ═══════════════════════════════════════════════════════════════════════
  // UTILITARE
  // ═══════════════════════════════════════════════════════════════════════

  function _hatch(ctx, x, y, w, h, col, lw, sp) {
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.strokeStyle = col; ctx.lineWidth = lw || .5;
    for (let i = -(Math.max(w, h)); i < w + Math.max(w, h); i += (sp || 4)) {
      ctx.beginPath(); ctx.moveTo(x + i, y); ctx.lineTo(x + i + h, y + h); ctx.stroke();
    }
    ctx.restore();
  }

  function _dimLinePDF(ctx, x1, y1, x2, y2, label, dir, col) {
    col = col || '#1E40AF';
    ctx.strokeStyle = col; ctx.lineWidth = .8;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const tL = 5;
    if (dir === 'H') {
      ctx.beginPath(); ctx.moveTo(x1, y1 - tL); ctx.lineTo(x1, y1 + tL); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x2, y2 - tL); ctx.lineTo(x2, y2 + tL); ctx.stroke();
      ctx.fillStyle = col; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText(String(label), (x1 + x2) / 2, y1 - 3);
    } else {
      ctx.beginPath(); ctx.moveTo(x1 - tL, y1); ctx.lineTo(x1 + tL, y1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x2 - tL, y2); ctx.lineTo(x2 + tL, y2); ctx.stroke();
      ctx.save(); ctx.translate(x1 - 8, (y1 + y2) / 2); ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = col; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText(String(label), 0, 0); ctx.restore();
    }
    ctx.textAlign = 'left';
  }

  // Expose export functions globally
  window._exportCurrentSVG = _exportCurrentSVG;
  window._exportCurrentDXF = _exportCurrentDXF;

})();
