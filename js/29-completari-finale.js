// ═══════════════════════════════════════════════════════════════════════════
// 29-completari-finale.js — Completări + Funcțiuni Noi
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// P1 — Fix planșă sintetică (folosește planfix v2) + fix heatmap + _rvExportComplet
// P2 — Calcul termic C107/2010 + fișă tehnică per apartament
// P3 — Plan încadrare cu clădiri OSM reale din Mapbox
// P4 — Certificat de conformitate urbanistică + calculator parcaje RGU complet
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (typeof _RV === 'undefined' || typeof _rvRenderPlan === 'undefined') {
      setTimeout(() => waitReady(cb, n + 1), 200); return;
    }
    cb();
  }

  waitReady(() => {
    _fixSintetic();
    _fixHeatmap();
    _fixExportComplet();
    _injectThermalAndApt();
    _fixIncadrareOSM();
    _injectCertificat();
    _fixParcajeRGU();
    console.log('[Completari v1] ✅ sintetic+heatmap+termic+OSM+certificat+parcaje');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // P1A — PLANȘĂ SINTETICĂ — folosește planfix v2
  // ═══════════════════════════════════════════════════════════════════════

  function _fixSintetic() {
    window._rvRenderSintetic = function (b) {
      if (!b || !b.P) return;
      const { P, bW, bD, niv } = b;
      const _AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
      const fl = _RV.floors?.[0];

      const COL = 3, ROW = 3, cW = 520, cH = 390, gap = 14, pad = 32;
      const W = COL * cW + (COL - 1) * gap + pad * 2;
      const H = ROW * cH + (ROW - 1) * gap + pad * 2 + 100;
      const { cv, ctx } = _rvInitCanvas(W, H, 'rv-canvas');
      if (!ctx) return;

      // Fundal alb profesional
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H);
      // Bordură dublă
      ctx.strokeStyle = '#1E293B'; ctx.lineWidth = 3; ctx.strokeRect(6, 6, W - 12, H - 12);
      ctx.strokeStyle = '#94A3B8'; ctx.lineWidth = 1; ctx.strokeRect(10, 10, W - 20, H - 20);

      // Header planșă
      ctx.fillStyle = '#0F172A'; ctx.fillRect(6, 6, W - 12, 56);
      ctx.fillStyle = '#D4AF37'; ctx.fillRect(6, 58, W - 12, 3);
      ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 14px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('PLANȘĂ SINTETICĂ — DOCUMENTAȚIE ARHITECTURALĂ', W / 2, 28);
      ctx.font = '8px IBM Plex Mono'; ctx.fillStyle = 'rgba(255,255,255,.6)';
      ctx.fillText('Nr.cad: ' + P.nrCad + '  ·  UTR: ' + P.utr + '  ·  ' + _AC.fnLabel + '  ·  ' + _AC.stilLabel + '  ·  ' + niv + ' niveluri  ·  H=' + (niv * P.hn).toFixed(1) + 'm  ·  ' + new Date().toLocaleDateString('ro-RO'), W / 2, 46);
      ctx.textAlign = 'left';

      const cells = [
        { id: 'plan_p',    title: '01  PLAN PARTER',          sub: 'Sc. 1:100' },
        { id: 'plan_e',    title: '02  PLAN ETAJ TIP',        sub: 'Sc. 1:100' },
        { id: 'fatada_n',  title: '03  FAȚADĂ PRINCIPALĂ',    sub: 'Sc. 1:100' },
        { id: 'fatada_s',  title: '04  FAȚADĂ POSTERIOARĂ',   sub: 'Sc. 1:100' },
        { id: 'sectiune',  title: '05  SECȚIUNE A-A',         sub: 'Sc. 1:100' },
        { id: 'axono',     title: '06  AXONOMETRIE ISO 30°',  sub: 'Proiecție izometrică' },
        { id: 'tabel',     title: '07  TABEL SUPRAFEȚE',      sub: 'Bilanț complet' },
        { id: 'normative', title: '08  NORMATIVE',            sub: 'Verificare conformitate' },
        { id: 'legenda',   title: '09  LEGENDĂ',              sub: 'Simboluri + materiale' },
      ];

      cells.forEach((cell, i) => {
        const col = i % COL, row = Math.floor(i / COL);
        const cx = pad + col * (cW + gap);
        const cy = pad + 66 + row * (cH + gap);

        // Header celulă
        ctx.fillStyle = '#1E293B'; ctx.fillRect(cx, cy, cW, 20);
        ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 7px IBM Plex Mono';
        ctx.fillText(cell.title, cx + 4, cy + 13);
        ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.font = '6px IBM Plex Mono';
        ctx.fillText(cell.sub, cx + cW - 55, cy + 13);

        // Fundal celulă
        ctx.fillStyle = '#F8FAFC'; ctx.fillRect(cx, cy + 20, cW, cH - 20);
        ctx.strokeStyle = '#CBD5E1'; ctx.lineWidth = 1; ctx.strokeRect(cx, cy, cW, cH);

        const iox = cx + 6, ioy = cy + 26, iW = cW - 12, iH = cH - 32;
        const iSC = Math.min(iW / (bW || 15) * .85, iH / (bD || 12) * .85, 8);

        ctx.save(); ctx.beginPath(); ctx.rect(cx, cy + 20, cW, cH - 20); ctx.clip();

        try {
          if (cell.id === 'plan_p') {
            _drawMiniPlanV2(ctx, b, fl, iox, ioy, iSC);
          } else if (cell.id === 'plan_e') {
            const fl1 = _RV.floors?.[1] || fl;
            _drawMiniPlanV2(ctx, b, fl1, iox, ioy, iSC);
          } else if (cell.id === 'fatada_n') {
            _drawMiniFatadaV2(ctx, b, P, iox, ioy, iW, iH, 'N', _AC);
          } else if (cell.id === 'fatada_s') {
            _drawMiniFatadaV2(ctx, b, P, iox, ioy, iW, iH, 'S', _AC);
          } else if (cell.id === 'sectiune') {
            _drawMiniSectiuneV2(ctx, b, P, fl, iox, ioy, iW, iH, _AC);
          } else if (cell.id === 'axono') {
            _drawMiniAxonoV2(ctx, b, P, iox, ioy, iW, iH, _AC);
          } else if (cell.id === 'tabel') {
            _drawTabelSinteticV2(ctx, b, fl, P, iox, ioy, iW, iH);
          } else if (cell.id === 'normative') {
            _drawNormativeSinteticV2(ctx, b, fl, P, iox, ioy, iW, iH);
          } else if (cell.id === 'legenda') {
            _drawLegendaSinteticaV2(ctx, iox, ioy, iW, iH, _AC);
          }
        } catch (e) {
          ctx.fillStyle = '#EF4444'; ctx.font = '8px IBM Plex Mono';
          ctx.fillText('Eroare: ' + e.message.slice(0, 40), iox + 4, ioy + 20);
        }
        ctx.restore();
      });

      // Footer cartuș
      ctx.fillStyle = '#0F172A'; ctx.fillRect(6, H - 50, W - 12, 44);
      ctx.fillStyle = '#D4AF37'; ctx.fillRect(6, H - 50, W - 12, 2);
      ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 8px IBM Plex Mono'; ctx.textAlign = 'left';
      ctx.fillText('UrbanX TSS·FG  ·  PLANȘĂ SINTETICĂ Nr.001  ·  Nr.cad: ' + P.nrCad + '  ·  UTR: ' + P.utr + '  ·  SC: ' + (b.scArea || 0).toFixed(0) + 'm²  ·  SDA: ' + (b.sdaTotal || 0).toFixed(0) + 'm²', 20, H - 33);
      ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '7px IBM Plex Mono';
      ctx.fillText('Funcțiune: ' + _AC.fnLabel + '  ·  Stil: ' + _AC.stilLabel + '  ·  POT: ' + (b.scArea / P.area * 100).toFixed(1) + '%  ·  CUT: ' + (b.sdaTotal / P.area).toFixed(2) + '  ·  Document orientativ — nu înlocuiește proiectul tehnic autorizat', 20, H - 18);
      ctx.textAlign = 'right'; ctx.fillStyle = '#D4AF37'; ctx.font = 'bold 7px IBM Plex Mono';
      ctx.fillText('Sc. 1:100  ·  A3', W - 20, H - 18); ctx.textAlign = 'left';

      if (typeof _rvDrawNorth === 'function') _rvDrawNorth(ctx, W - 60, 85, P.frontDir);
    };
  }

  // ── Mini-plan cu planfix v2 colors ───────────────────────────────────
  function _drawMiniPlanV2(ctx, b, fl, ox, oy, SC) {
    if (!fl) return;
    const CM = {
      living: '#FEF3C7', bedroom: '#DCFCE7', bedroom2: '#DCFCE7', bedroom3: '#DCFCE7',
      kitchen: '#DBEAFE', bath: '#EDE9FE', wc: '#F3E8FF', core: '#E2E8F0',
      balcon: '#FEFCE8', hall: '#F1F5F9', commercial: '#FAF5FF', storage: '#F8FAFC',
    };
    ctx.fillStyle = '#F1F5F9'; ctx.fillRect(ox, oy, b.bW * SC, b.bD * SC);
    const EW = Math.max(2, 0.28 * SC);
    // Camere
    fl.rects.forEach(r => {
      ctx.fillStyle = CM[r.t] || '#F1F5F9';
      ctx.fillRect(ox + r.x * SC, oy + r.y * SC, r.w * SC, r.h * SC);
      if (!r.bal) {
        ctx.strokeStyle = 'rgba(30,41,59,.35)'; ctx.lineWidth = .5;
        ctx.strokeRect(ox + r.x * SC, oy + r.y * SC, r.w * SC, r.h * SC);
        if (r.w * SC > 18 && r.h * SC > 12) {
          ctx.fillStyle = '#334155'; ctx.font = Math.min(6, r.w * SC * .12) + 'px IBM Plex Mono'; ctx.textAlign = 'center';
          const lbl = (r.lbl || r.t).replace('\n', ' ').slice(0, 10);
          ctx.fillText(lbl, ox + r.x * SC + r.w * SC / 2, oy + r.y * SC + r.h * SC / 2 + 2);
          if (r.w * SC > 25 && r.h * SC > 18) {
            ctx.fillStyle = 'rgba(30,41,59,.5)'; ctx.font = Math.min(5, r.w * SC * .10) + 'px IBM Plex Mono';
            ctx.fillText((r.w * r.h).toFixed(1) + 'm²', ox + r.x * SC + r.w * SC / 2, oy + r.y * SC + r.h * SC / 2 + 8);
          }
          ctx.textAlign = 'left';
        }
      }
    });
    // Pereți exteriori
    ctx.fillStyle = '#1A1A2E';
    ctx.fillRect(ox - EW, oy - EW, b.bW * SC + EW * 2, EW);
    ctx.fillRect(ox - EW, oy + b.bD * SC, b.bW * SC + EW * 2, EW);
    ctx.fillRect(ox - EW, oy - EW, EW, b.bD * SC + EW * 2);
    ctx.fillRect(ox + b.bW * SC, oy - EW, EW, b.bD * SC + EW * 2);
  }

  function _drawMiniFatadaV2(ctx, b, P, ox, oy, W, H, dir, _AC) {
    const niv = b.niv, hNiv = P.hn || 3;
    const SC = H / (niv * hNiv) * .88;
    const fW = b.bW * SC;
    const fH = niv * hNiv * SC;

    // Stil
    const STIL_COLS = {
      modern: { panel: '#C0D8F0', band: '#1E3A6A', glass: 'rgba(58,128,200,.65)', frame: '#90B0CC' },
      inovator: { panel: '#08102A', band: '#3A2880', glass: 'rgba(40,80,200,.7)', frame: '#5060B0' },
      clasic: { panel: '#E8D090', band: '#C8A040', glass: 'rgba(104,120,160,.6)', frame: '#D4B860' },
      minimalist: { panel: '#F0F4F8', band: '#D0DCE8', glass: 'rgba(160,200,224,.6)', frame: '#E0EAF0' },
      industrial: { panel: '#281808', band: '#D05010', glass: 'rgba(56,72,88,.65)', frame: '#905020' },
    };
    const C = STIL_COLS[_AC.stil] || STIL_COLS.modern;

    ctx.fillStyle = C.panel; ctx.fillRect(ox, oy, fW, fH);
    // Etaje
    for (let i = 1; i <= niv; i++) {
      const bandY = oy + fH - i * hNiv * SC;
      const bH = Math.max(2, _AC.bandH * SC);
      ctx.fillStyle = C.band; ctx.fillRect(ox, bandY - bH / 2, fW, bH);
    }
    // Ferestre
    const wW = _AC.wW * SC, wH = _AC.wH * SC;
    const nW = Math.max(2, Math.floor(fW / (wW * 1.8)));
    const sp = fW / nW;
    for (let row = 0; row < niv; row++) {
      for (let c = 0; c < nW; c++) {
        const wx = ox + c * sp + (sp - wW) / 2;
        const wy = oy + fH - (row + 1) * hNiv * SC + (hNiv * SC - wH) * .3;
        ctx.fillStyle = C.glass; ctx.fillRect(wx, wy, wW, wH);
        ctx.strokeStyle = C.frame; ctx.lineWidth = .8; ctx.strokeRect(wx, wy, wW, wH);
      }
    }
    // Balcoane
    if (_AC.hasBalc) {
      for (let row = 1; row < niv; row++) {
        const bz = oy + fH - row * hNiv * SC;
        ctx.fillStyle = 'rgba(203,213,225,.8)';
        ctx.fillRect(ox - 3, bz - 4, fW + 6, 4);
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
        ctx.strokeRect(ox - 3, bz - 4, fW + 6, 4);
      }
    }
    // Acoperiș
    const roofType = _AC.tipAcoperis || 'terasa';
    if (roofType.includes('inclinat') || roofType.includes('sarpanta')) {
      ctx.fillStyle = 'rgba(120,80,50,.7)';
      ctx.beginPath(); ctx.moveTo(ox - 3, oy); ctx.lineTo(ox + fW / 2, oy - fW * .15); ctx.lineTo(ox + fW + 3, oy); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#4A3728'; ctx.lineWidth = 1.2; ctx.stroke();
    } else {
      ctx.fillStyle = '#475569';
      ctx.fillRect(ox - 3, oy - Math.max(2, 0.25 * SC), fW + 6, Math.max(2, 0.25 * SC));
    }
    // Pereți exteriori
    const EW = Math.max(2, 0.28 * SC);
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(ox - EW, oy, EW, fH); ctx.fillRect(ox + fW, oy, EW, fH);
    // Sol
    ctx.fillStyle = '#94A3B8'; ctx.fillRect(ox - 6, oy + fH, fW + 12, 5);
    ctx.fillStyle = '#475569'; ctx.font = '7px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('FAȚADĂ ' + dir + ' · ' + (_AC.stilLabel || ''), ox + fW / 2, oy + fH + 15);
    ctx.textAlign = 'left';
  }

  function _drawMiniSectiuneV2(ctx, b, P, fl, ox, oy, W, H, _AC) {
    const niv = b.niv, hNiv = P.hn || 3;
    const SC = H / (niv * hNiv) * .85;
    const sW = b.bW * SC, sH = niv * hNiv * SC;
    const SLAB = Math.max(2, .20 * SC);

    // Fundal
    ctx.fillStyle = '#F1F5F9'; ctx.fillRect(ox, oy, sW, sH);
    // Planșee
    for (let i = 0; i < niv; i++) {
      ctx.fillStyle = 'rgba(50,65,90,.25)'; ctx.fillRect(ox, oy + sH - (i + 1) * hNiv * SC, sW, SLAB);
    }
    // Camere în secțiune (slice central)
    if (fl?.rects) {
      const CM = { living: 'rgba(254,243,199,.6)', bedroom: 'rgba(220,252,231,.6)', kitchen: 'rgba(219,234,254,.6)', bath: 'rgba(237,233,254,.6)', hall: 'rgba(226,232,240,.5)' };
      const cut = b.bD / 2;
      for (let fi = 0; fi < Math.min(niv, (_RV.floors?.length || 1)); fi++) {
        const fli = _RV.floors?.[fi] || fl;
        const flY = oy + sH - (fi + 1) * hNiv * SC + SLAB;
        const flH = hNiv * SC - SLAB;
        (fli?.rects || []).forEach(r => {
          if (r.bal || r.y > cut + 0.1 || r.y + r.h < cut - 0.1) return;
          ctx.fillStyle = CM[r.t] || 'rgba(226,232,240,.4)';
          ctx.fillRect(ox + r.x * SC, flY, r.w * SC, flH);
        });
      }
    }
    // Pereți
    const EW = Math.max(3, .28 * SC);
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(ox, oy, EW, sH); ctx.fillRect(ox + sW - EW, oy, EW, sH);
    ctx.strokeStyle = '#1E293B'; ctx.lineWidth = 1.5; ctx.strokeRect(ox, oy, sW, sH);
    // Subsol schematic
    if ((b.subsolNiv || 0) > 0) {
      const subH = Math.max(10, 2.7 * SC);
      ctx.fillStyle = 'rgba(74,85,104,.15)'; ctx.fillRect(ox, oy + sH, sW, subH);
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
      ctx.strokeRect(ox, oy + sH, sW, subH); ctx.setLineDash([]);
      ctx.fillStyle = '#64748B'; ctx.font = '6px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('S-1 Parcaj', ox + sW / 2, oy + sH + subH / 2 + 2); ctx.textAlign = 'left';
    }
    // Acoperiș
    const roofType = _AC.tipAcoperis || 'terasa';
    if (roofType.includes('inclinat') || roofType.includes('sarpanta')) {
      ctx.fillStyle = 'rgba(120,80,50,.6)';
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + sW / 2, oy - sW * .18); ctx.lineTo(ox + sW, oy); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#4A3728'; ctx.lineWidth = 1; ctx.stroke();
    }
    // Cote H
    ctx.strokeStyle = '#1E40AF'; ctx.lineWidth = .7; ctx.fillStyle = '#1E40AF'; ctx.font = '6px IBM Plex Mono';
    for (let i = 0; i <= niv; i++) {
      const ly = oy + sH - i * hNiv * SC;
      ctx.beginPath(); ctx.moveTo(ox + sW + 3, ly); ctx.lineTo(ox + sW + 14, ly); ctx.stroke();
      ctx.fillText('+' + (i * hNiv).toFixed(1) + 'm', ox + sW + 16, ly + 3);
    }
    ctx.fillStyle = '#334155'; ctx.font = '7px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('SECȚIUNE A-A', ox + sW / 2, oy + sH + (b.subsolNiv ? 2.7 * SC : 0) + 14); ctx.textAlign = 'left';
  }

  function _drawMiniAxonoV2(ctx, b, P, ox, oy, W, H, _AC) {
    const bW = b.bW, bD = b.bD, Ht = b.niv * (P.hn || 3);
    const SC = Math.min(W / (bW + bD * .65) * .7, H / (Ht + bD * .35) * .7, 6);
    const cos30 = Math.cos(Math.PI / 6), sin30 = Math.sin(Math.PI / 6);
    function iso(wx, wy, wz) { return [ox + (wx - wy * cos30) * SC, oy + H * .85 - (wz + wy * sin30) * SC]; }
    function face(pts, fill, stroke, lw) {
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
      ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1; ctx.stroke(); }
    }
    const STIL_COLS = {
      modern: { front: '#C0D8F0', side: '#A2C4E0', top: '#D2E5F0' },
      inovator: { front: '#181035', side: '#120B28', top: '#201845' },
      clasic: { front: '#E8D090', side: '#D0B870', top: '#F0E0A0' },
      minimalist: { front: '#F0F4F8', side: '#DCE4EC', top: '#F8FAFC' },
      industrial: { front: '#281808', side: '#200F05', top: '#301A08' },
    };
    const C = STIL_COLS[_AC.stil] || STIL_COLS.modern;
    const roofType = _AC.tipAcoperis || 'terasa';
    const hP = (_AC.parterDiferit ? 4.5 : P.hn || 3);

    face([iso(0, 0, 0), iso(bW, 0, 0), iso(bW, 0, Ht), iso(0, 0, Ht)], C.front, '#1E293B', 1.5);
    face([iso(bW, 0, 0), iso(bW, bD, 0), iso(bW, bD, Ht), iso(bW, 0, Ht)], C.side, '#1E293B', 1);

    // Parter diferit
    if (_AC.parterDiferit) {
      face([iso(0, 0, 0), iso(bW, 0, 0), iso(bW, 0, hP), iso(0, 0, hP)], 'rgba(139,92,246,.5)', '#7C3AED', 1.5);
    }

    // Ferestre
    const nW = Math.max(2, Math.floor(bW / (_AC.wW * 1.8)));
    const sp = bW / nW;
    for (let row = 0; row < b.niv; row++) {
      for (let c = 0; c < nW; c++) {
        const wx = c * sp + sp * .2;
        const wBot = row * (P.hn || 3) + (P.hn || 3) * .18;
        const wTop = wBot + _AC.wH;
        const pts = [iso(wx, 0, wBot), iso(wx + _AC.wW, 0, wBot), iso(wx + _AC.wW, 0, wTop), iso(wx, 0, wTop)];
        ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
        ctx.closePath(); ctx.fillStyle = 'rgba(147,210,250,.65)'; ctx.fill();
        ctx.strokeStyle = '#0369A1'; ctx.lineWidth = .7; ctx.stroke();
      }
    }

    // Balcoane
    if (_AC.hasBalc) {
      for (let row = 1; row < b.niv; row++) {
        const bz = row * (P.hn || 3);
        face([iso(0, -_AC.balcD, bz), iso(bW, -_AC.balcD, bz), iso(bW, -_AC.balcD, bz + .12), iso(0, -_AC.balcD, bz + .12)],
          'rgba(203,213,225,.85)', '#334155', 1);
      }
    }

    // Acoperiș
    if (roofType.includes('inclinat') || roofType.includes('sarpanta')) {
      const rH = bW * .22;
      face([iso(0, 0, Ht), iso(bW, 0, Ht), iso(bW / 2, bD / 2, Ht + rH)], 'rgba(120,80,50,.65)', '#4A3728', 1.5);
      face([iso(bW, 0, Ht), iso(bW, bD, Ht), iso(bW / 2, bD / 2, Ht + rH)], 'rgba(100,65,40,.5)', '#4A3728', 1);
    } else if (roofType.includes('penthouse')) {
      face([iso(0, 0, Ht), iso(bW, 0, Ht), iso(bW, bD, Ht), iso(0, bD, Ht)], C.top, '#334155', 1.5);
      const ret = bW * .12;
      face([iso(ret, ret, Ht), iso(bW - ret, ret, Ht), iso(bW - ret, ret, Ht + (P.hn || 3) * .85), iso(ret, ret, Ht + (P.hn || 3) * .85)], 'rgba(212,175,55,.3)', '#B45309', 1.5);
    } else {
      face([iso(0, 0, Ht), iso(bW, 0, Ht), iso(bW, bD, Ht), iso(0, bD, Ht)], C.top, '#334155', 1.5);
      const aH = .9;
      face([iso(0, 0, Ht), iso(bW, 0, Ht), iso(bW, 0, Ht + aH), iso(0, 0, Ht + aH)], 'rgba(100,116,139,.4)', '#475569', 1);
    }

    // Cote
    ctx.fillStyle = '#1E40AF'; ctx.font = '6px IBM Plex Mono';
    const [hx, hy] = iso(bW + .5, bD, Ht);
    ctx.fillText('H=' + Ht.toFixed(1) + 'm', hx + 3, hy);
    const [wx2, wy2] = iso(bW, bD + .5, 0);
    ctx.fillText(bW.toFixed(1) + 'm', wx2, wy2 + 10);
  }

  function _drawTabelSinteticV2(ctx, b, fl, P, ox, oy, W, H) {
    if (!fl) return;
    const aptIds = [...new Set(fl.rects.filter(r => r.apt >= 0 && !r.bal).map(r => r.apt))].sort((a, b) => a - b);
    const RH = 13, cols = [35, 45, 22, 35, 35, 30];
    const headers = ['Ap.', 'Tip', 'Cam.', 'SU (m²)', 'SC (m²)', 'Bal.'];
    let cy = oy + 8;

    ctx.fillStyle = '#1E293B'; ctx.fillRect(ox, cy, W, RH);
    ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 6.5px IBM Plex Mono';
    let cx3 = ox;
    headers.forEach((h, i) => { ctx.fillText(h, cx3 + 2, cy + 9); cx3 += cols[i]; });
    cy += RH;

    aptIds.slice(0, Math.floor((H - 60) / RH)).forEach((aptId, idx) => {
      const rooms = fl.rects.filter(r => r.apt === aptId);
      const su = rooms.filter(r => !r.bal).reduce((s, r) => s + r.w * r.h, 0);
      const suBal = rooms.filter(r => r.bal).reduce((s, r) => s + r.w * r.h, 0);
      const nCam = rooms.filter(r => ['living', 'bedroom', 'bedroom2', 'bedroom3'].includes(r.t)).length;
      const tipMap = { 1: 'Garsonieră', 2: 'Ap. 2 cam.', 3: 'Ap. 3 cam.', 4: 'Ap. 4 cam.' };

      ctx.fillStyle = idx % 2 === 0 ? '#F8FAFC' : '#F1F5F9';
      ctx.fillRect(ox, cy, W, RH);
      ctx.fillStyle = '#0F172A'; ctx.font = '6.5px IBM Plex Mono';
      cx3 = ox;
      ['Ap.' + String(aptId + 1).padStart(2, '0'), tipMap[nCam] || nCam + ' cam.', nCam, su.toFixed(1), (su * 1.22).toFixed(1), suBal > 0 ? suBal.toFixed(1) : '—'].forEach((v, i) => {
        ctx.fillText(String(v), cx3 + 2, cy + 9); cx3 += cols[i];
      });
      cy += RH;
    });

    // Total
    const totalSU = aptIds.reduce((s, id) => s + fl.rects.filter(r => r.apt === id && !r.bal).reduce((a, r) => a + r.w * r.h, 0), 0);
    const totalBal = fl.rects.filter(r => r.bal).reduce((s, r) => s + r.w * r.h, 0);
    ctx.fillStyle = '#E2E8F0'; ctx.fillRect(ox, cy, W, RH + 2);
    ctx.fillStyle = '#1E293B'; ctx.font = 'bold 6.5px IBM Plex Mono';
    ctx.fillText('TOTAL: ' + aptIds.length + ' apt.  SU=' + totalSU.toFixed(1) + 'm²  Bal.=' + totalBal.toFixed(1) + 'm²', ox + 2, cy + 9);
    cy += RH + 6;
    // Bilanț rapid
    const bilLines = [
      'SC amprentă: ' + (b.scArea || b.bW * b.bD).toFixed(0) + ' m²',
      'SDA total: ' + (b.sdaTotal || b.scArea * b.niv).toFixed(0) + ' m²',
      'POT: ' + ((b.scArea || b.bW * b.bD) / P.area * 100).toFixed(1) + '%  CUT: ' + ((b.sdaTotal || 0) / P.area).toFixed(2),
    ];
    ctx.fillStyle = '#475569'; ctx.font = '6px IBM Plex Mono';
    bilLines.forEach(l => { ctx.fillText(l, ox + 2, cy); cy += 10; });
  }

  function _drawNormativeSinteticV2(ctx, b, fl, P, ox, oy, W, H) {
    const RH = 18;
    const potOk = (b.scArea || b.bW * b.bD) / P.area <= P.pot + .005;
    const cutOk = (b.sdaTotal || 0) / P.area <= P.cut + .01;
    const np057Ok = !fl?.rects?.some(r => { const m = (typeof _RV_NP057 !== 'undefined' ? _RV_NP057 : {})[r.t]; return m && r.w * r.h < m - .05; });
    const omsOk = !fl?.rects?.some(r => r.solarOk === false);
    const liftOk = b.niv < 5 || fl?.rects?.some(r => r.t === 'core' && (r.lbl || '').includes('Lift'));
    const items = [
      { lbl: 'POT', val: ((b.scArea || b.bW * b.bD) / P.area * 100).toFixed(1) + '% / max ' + Math.round(P.pot * 100) + '%', ok: potOk, norm: 'PUG/RGU' },
      { lbl: 'CUT', val: ((b.sdaTotal || 0) / P.area).toFixed(2) + ' / max ' + P.cut, ok: cutOk, norm: 'PUG/RGU' },
      { lbl: 'NP 057/2002', val: np057Ok ? 'Suprafețe conforme' : 'Camere sub minim', ok: np057Ok, norm: 'NP057' },
      { lbl: 'OMS 119/2014', val: omsOk ? 'Însorire ≥1.5h/zi' : 'Camere neconforme', ok: omsOk, norm: 'OMS119' },
      { lbl: 'P118-2/2013', val: 'Căi evacuare ≤30m', ok: true, norm: 'P118' },
      { lbl: 'NP 051/2012', val: liftOk ? (b.niv >= 5 ? 'Lift prezent ✓' : 'N/A (<P+4)') : 'Lift lipsă!', ok: liftOk, norm: 'NP051' },
    ];
    let cy = oy + 4;
    items.forEach(item => {
      ctx.fillStyle = item.ok ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.12)';
      ctx.fillRect(ox, cy, W, RH);
      ctx.strokeStyle = item.ok ? 'rgba(34,197,94,.2)' : 'rgba(239,68,68,.2)'; ctx.lineWidth = .5;
      ctx.strokeRect(ox, cy, W, RH);
      ctx.fillStyle = item.ok ? '#166534' : '#991B1B'; ctx.font = 'bold 6.5px IBM Plex Mono';
      ctx.fillText((item.ok ? '✅ ' : '⚠ ') + item.lbl, ox + 3, cy + 7);
      ctx.fillStyle = '#475569'; ctx.font = '6px IBM Plex Mono';
      ctx.fillText(item.val, ox + 3, cy + 14);
      ctx.fillStyle = 'rgba(100,116,139,.5)'; ctx.font = '6px IBM Plex Mono'; ctx.textAlign = 'right';
      ctx.fillText(item.norm, ox + W - 2, cy + 7); ctx.textAlign = 'left';
      cy += RH + 2;
    });
  }

  function _drawLegendaSinteticaV2(ctx, ox, oy, W, H, _AC) {
    const items = [
      { col: '#FEF3C7', bc: '#D97706', lbl: 'Camera de zi / Living' },
      { col: '#DCFCE7', bc: '#15803D', lbl: 'Dormitor' },
      { col: '#DBEAFE', bc: '#0284C7', lbl: 'Bucătărie' },
      { col: '#EDE9FE', bc: '#7C3AED', lbl: 'Baie / WC' },
      { col: '#F1F5F9', bc: '#475569', lbl: 'Hol / Coridor' },
      { col: '#E2E8F0', bc: '#1E3A8A', lbl: 'Casa scărilor + Lift' },
      { col: '#FEFCE8', bc: '#CA8A04', lbl: 'Balcon / Terasă' },
      { col: '#FAF5FF', bc: '#7C3AED', lbl: 'Spațiu comercial/Birou' },
    ];
    ctx.fillStyle = '#0F172A'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.fillText('LEGENDĂ CULORI', ox, oy + 8); let y = oy + 16;
    items.forEach(({ col, bc, lbl }) => {
      ctx.fillStyle = col; ctx.fillRect(ox, y - 7, 13, 11);
      ctx.strokeStyle = bc; ctx.lineWidth = .8; ctx.strokeRect(ox, y - 7, 13, 11);
      ctx.fillStyle = '#334155'; ctx.font = '6.5px IBM Plex Mono'; ctx.fillText(lbl, ox + 17, y); y += 14;
    });
    y += 6;
    // Stil + materiale
    ctx.fillStyle = '#0F172A'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.fillText('SETĂRI ARHITECTURALE', ox, y); y += 10;
    [
      ['Stil:', _AC.stilLabel || '—'],
      ['Funcțiune:', (_AC.fnLabel || '—').slice(0, 20)],
      ['Acoperiș:', _AC.acoperisLabel || '—'],
      ['Balcoane:', _AC.hasBalc ? 'Da (D=' + _AC.balcD + 'm)' : 'Nu'],
      ['Curtain wall:', _AC.hasCurtainWall ? 'Da (' + _AC.cortinaPct + '%)' : 'Nu'],
    ].forEach(([lbl, val]) => {
      ctx.fillStyle = '#64748B'; ctx.font = '6px IBM Plex Mono'; ctx.fillText(lbl, ox, y);
      ctx.fillStyle = '#0F172A'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.fillText(val, ox + 60, y); y += 10;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // P1B — FIX HEATMAP — funcționează cu planfix v2
  // ═══════════════════════════════════════════════════════════════════════

  function _fixHeatmap() {
    window._rvToggleHeatmap = function () {
      const modes = [null, 'isu', 'oms', 'np057', 'solar'];
      const labels = { isu: 'ISU P118', oms: 'OMS119 Însorire', np057: 'NP057 Suprafețe', solar: 'Solar Ore/zi' };
      window._heatmapMode = modes[(modes.indexOf(window._heatmapMode || null) + 1) % modes.length];
      const btn = document.getElementById('rv-heatmap-btn');
      if (btn) {
        btn.innerHTML = '🌡 ' + (window._heatmapMode ? labels[window._heatmapMode] : 'Normal');
        btn.style.background = window._heatmapMode ? 'rgba(239,68,68,.35)' : 'rgba(239,68,68,.12)';
      }
      if (typeof _rvRender === 'function') _rvRender();
      // Post-render: aplică overlay
      setTimeout(() => _applyHeatmapV2(window._heatmapMode), 80);
    };
  }

  function _applyHeatmapV2(mode) {
    if (!mode) return;
    const cv = document.getElementById('rv-canvas');
    const ctx = cv?.getContext('2d');
    const fl = _RV.floors?.[_RV.floor || 0];
    if (!ctx || !fl?.rects || !_RV.planOx) return;
    const ox = _RV.planOx, oy = _RV.planOy, SC = _RV.planSc;
    const b = _RV.building;

    fl.rects.forEach(r => {
      if (r.bal || r.apt < 0) return;
      const rx = ox + r.x * SC, ry = oy + r.y * SC, rw = r.w * SC, rh = r.h * SC;
      let color = null, intensity = 0;

      if (mode === 'isu' && b?.cores?.length > 0) {
        const core = b.cores[0];
        const d = Math.hypot(r.x + r.w / 2 - core.x - core.w / 2, r.y + r.h / 2 - core.y - core.h / 2);
        const maxD = 30;
        intensity = Math.min(1, d / maxD);
        color = d <= maxD ? `rgba(34,197,94,${.35 * (1 - intensity)})` : `rgba(239,68,68,${.5 * intensity})`;
      } else if (mode === 'oms' && ['bedroom', 'bedroom2', 'bedroom3', 'living'].includes(r.t)) {
        color = r.solarOk === false ? 'rgba(239,68,68,.45)' : r.solarOk === true ? 'rgba(34,197,94,.3)' : 'rgba(245,158,11,.2)';
      } else if (mode === 'np057') {
        const NP057 = typeof _RV_NP057 !== 'undefined' ? _RV_NP057 : { living: 14, bedroom: 12, bedroom2: 10, bedroom3: 8, kitchen: 5, bath: 3.6, wc: 1.2 };
        const minA = NP057[r.t];
        if (minA) {
          const ratio = r.w * r.h / minA;
          color = ratio < 1 ? `rgba(239,68,68,${Math.min(.6, (1 - ratio) * 2)})` : `rgba(34,197,94,${Math.min(.35, (ratio - 1) * .5)})`;
        }
      } else if (mode === 'solar') {
        if (r.solarH) {
          const h = parseFloat(r.solarH);
          const ok = h >= 1.5;
          color = ok ? `rgba(251,191,36,${Math.min(.6, h / 6)})` : `rgba(239,68,68,${.4})`;
        }
      }

      if (color) {
        ctx.fillStyle = color; ctx.fillRect(rx, ry, rw, rh);
        // Valoare numerică
        ctx.fillStyle = 'rgba(15,23,42,.8)'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
        if (mode === 'isu' && b?.cores?.length > 0) {
          const d = Math.hypot(r.x + r.w / 2 - b.cores[0].x - b.cores[0].w / 2, r.y + r.h / 2 - b.cores[0].y - b.cores[0].h / 2);
          ctx.fillText(d.toFixed(0) + 'm', rx + rw / 2, ry + rh / 2 + 3);
        } else if (mode === 'solar' && r.solarH) {
          ctx.fillText(r.solarH + 'h', rx + rw / 2, ry + rh / 2 + 3);
        }
        ctx.textAlign = 'left';
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // P1C — FIX EXPORT COMPLET — include toate documentele noi
  // ═══════════════════════════════════════════════════════════════════════

  function _fixExportComplet() {
    window._rvExportComplet = async function () {
      const b = _RV.building, P = _RV.parcelParams;
      if (!b || !P) { alert('Generați releveele mai întâi.'); return; }
      if (typeof ss === 'function') ss('📦 Export complet — generez toate documentele…');

      const exports = [
        { icon: '📄', label: 'PDF Planșe',         fn: '_rvExportPDF' },
        { icon: '💰', label: 'Deviz HG907',         fn: '_rvExportDeviz' },
        { icon: '📦', label: 'Extras Materiale',    fn: '_rvExportExtras' },
        { icon: '📝', label: 'Memoriu Tehnic',      fn: '_rvExportMemoriu' },
        { icon: '🏗',  label: 'IFC 2x3',            fn: '_rvExportIFC' },
        { icon: '📐',  label: 'DXF AutoCAD',        fn: '_rvExportDXF' },
        { icon: '🔷',  label: 'SVG Vectorial',      fn: '_exportCurrentSVG' },
        { icon: '📋',  label: 'Certificat Conform.', fn: '_rvExportCertificat' },
        { icon: '🏠',  label: 'Fișe Apartamente',   fn: '_rvExportFiseApt' },
        { icon: '🌡',  label: 'Raport Termic',      fn: '_rvExportRaportTermic' },
      ];

      let done = 0;
      for (const exp of exports) {
        if (typeof window[exp.fn] !== 'function') continue;
        try {
          if (typeof ss === 'function') ss(`📦 (${++done}/${exports.length}) ${exp.icon} ${exp.label}…`);
          await window[exp.fn]();
          await new Promise(r => setTimeout(r, 600));
        } catch (e) { console.warn('[ExportComplet]', exp.label, e.message); }
      }
      if (typeof ss === 'function') ss(`✅ Export complet: ${done} documente generate`);
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // P2A — CALCUL TERMIC C107/2010
  // ═══════════════════════════════════════════════════════════════════════

  // Rezistențe termice minime conform C107-1/2010 + GT 019/2019 (NZEB)
  const RMIN = {
    perete_ext:   { classic: 1.80, nzeb: 3.50, unit: 'm²K/W', desc: 'Perete exterior' },
    planseu_pod:  { classic: 3.50, nzeb: 5.00, unit: 'm²K/W', desc: 'Planșeu pod/terasă' },
    planseu_sol:  { classic: 2.00, nzeb: 3.50, unit: 'm²K/W', desc: 'Planșeu peste sol' },
    fereastra:    { classic: 0.77, nzeb: 1.00, unit: 'm²K/W', desc: 'Tâmplărie (U≤1.3)' },
  };

  // Straturi termice — lambda [W/mK] + grosime [m]
  function _calcRezistentaTermica(straturi) {
    return straturi.reduce((R, s) => R + s.grosime / s.lambda, 0);
  }

  const STRUCTURA_IMPLICITA = {
    perete_ext: [
      { desc: 'Tencuială ext.', grosime: 0.02, lambda: 0.87 },
      { desc: 'EPS λ=0.032', grosime: 0.15, lambda: 0.032 },
      { desc: 'BCA λ=0.25', grosime: 0.25, lambda: 0.25 },
      { desc: 'Tencuială int.', grosime: 0.015, lambda: 0.87 },
    ],
    planseu_pod: [
      { desc: 'Gresie 1cm', grosime: 0.01, lambda: 1.4 },
      { desc: 'Șapă beton', grosime: 0.08, lambda: 1.4 },
      { desc: 'EPS λ=0.032', grosime: 0.15, lambda: 0.032 },
      { desc: 'Mem. bitum.', grosime: 0.008, lambda: 0.17 },
      { desc: 'Planșeu BA', grosime: 0.22, lambda: 1.74 },
    ],
    fereastra: [
      { desc: 'PVC 5cam. triplu low-E', grosime: 1.0, lambda: 1.3 },
    ],
  };

  window._rvExportRaportTermic = async function () {
    const b = _RV.building, P = _RV.parcelParams;
    if (!b || !P) { alert('Generați releveele mai întâi.'); return; }
    const _jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!_jsPDF) { alert('jsPDF indisponibil.'); return; }
    if (typeof ss === 'function') ss('🌡 Generez raport termic C107/2010…');

    const pdf = new _jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const PW = 210, PH = 297;
    const S2 = s => String(s || '').replace(/[^\x20-\x7E\u00C0-\u024F]/g, ' ').trim();

    // Calculele
    const results = {};
    Object.entries(STRUCTURA_IMPLICITA).forEach(([tip, straturi]) => {
      const R = _calcRezistentaTermica(straturi);
      const U = 1 / R;
      const Rmin_cl = RMIN[tip]?.classic || 0;
      const Rmin_nz = RMIN[tip]?.nzeb || 0;
      results[tip] = { R, U, ok_classic: R >= Rmin_cl, ok_nzeb: R >= Rmin_nz, Rmin_cl, Rmin_nz, straturi };
    });

    // Header
    pdf.setFillColor(15, 23, 42); pdf.rect(0, 0, PW, 18, 'F');
    pdf.setFillColor(56, 189, 248); pdf.rect(0, 17.5, PW, .8, 'F');
    pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(12);
    pdf.text('VERIFICARE TERMICĂ ORIENTATIVĂ', PW / 2, 10, { align: 'center' });
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5); pdf.setTextColor(180, 220, 240);
    pdf.text(S2('C107-1/2010 + GT 019/2019 (NZEB) · Nr.cad. ' + P.nrCad + ' · ' + new Date().toLocaleDateString('ro-RO')), PW / 2, 15, { align: 'center' });

    let y = 22;

    pdf.setFillColor(219, 234, 254); pdf.rect(10, y, PW - 20, 10, 'F');
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6.5); pdf.setTextColor(30, 64, 175);
    pdf.text('⚠ Document orientativ pre-proiectare. Calculul termic oficial se elaborează de auditor energetic atestat MDLPA (Legea 372/2005).', 12, y + 4.5);
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6); pdf.setTextColor(60, 100, 180);
    pdf.text('Structurile de alcătuire sunt implicite (BCA+EPS 15cm). Modificați grosimile conform proiectului tehnic real.', 12, y + 8.5);
    y += 14;

    // Tabel rezultate
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.setTextColor(15, 23, 42);
    pdf.text('REZULTATE VERIFICARE TERMICĂ', 14, y); y += 8;

    const cols2 = [14, 65, 95, 125, 150, 175];
    pdf.setFillColor(20, 40, 90); pdf.rect(10, y - 4, PW - 20, 7, 'F');
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6); pdf.setTextColor(255, 255, 255);
    ['Element', 'R calculat (m²K/W)', 'R min Classic', 'R min NZEB', 'Classic', 'NZEB'].forEach((h, i) => pdf.text(h, cols2[i], y));
    y += 5;

    Object.entries(results).forEach(([tip, r], idx) => {
      const desc = RMIN[tip]?.desc || tip;
      pdf.setFillColor(idx % 2 === 0 ? 248 : 242, 250, 255);
      pdf.rect(10, y - 3, PW - 20, 7, 'F');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5); pdf.setTextColor(20, 40, 90);
      pdf.text(S2(desc), cols2[0], y + 0.5);
      pdf.text(r.R.toFixed(2), cols2[1], y + 0.5);
      pdf.text(r.Rmin_cl.toFixed(2), cols2[2], y + 0.5);
      pdf.text(r.Rmin_nz.toFixed(2), cols2[3], y + 0.5);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(r.ok_classic ? 15 : 180, r.ok_classic ? 120 : 30, r.ok_classic ? 40 : 30);
      pdf.text(r.ok_classic ? '✅ OK' : '⚠ NOK', cols2[4], y + 0.5);
      pdf.setTextColor(r.ok_nzeb ? 15 : 180, r.ok_nzeb ? 120 : 30, r.ok_nzeb ? 40 : 30);
      pdf.text(r.ok_nzeb ? '✅ OK' : '⚠ NOK', cols2[5], y + 0.5);
      y += 8;
    });

    y += 6;
    // Alcătuiri stratigrafice
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.setTextColor(15, 23, 42);
    pdf.text('ALCĂTUIRI STRATIGRAFICE (implicite — de confirmat cu proiect)', 14, y); y += 7;

    Object.entries(STRUCTURA_IMPLICITA).forEach(([tip, straturi]) => {
      if (y > PH - 40) { pdf.addPage(); y = 15; }
      const r2 = results[tip];
      pdf.setFillColor(r2.ok_nzeb ? 235 : 255, r2.ok_nzeb ? 255 : 242, r2.ok_nzeb ? 235 : 235);
      pdf.rect(10, y - 3, PW - 20, 6, 'F');
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7); pdf.setTextColor(20, 40, 90);
      pdf.text(S2((RMIN[tip]?.desc || tip) + ' — R=' + r2.R.toFixed(2) + ' m²K/W · U=' + r2.U.toFixed(2) + ' W/m²K'), 12, y);
      y += 6;
      straturi.forEach((s, i) => {
        if (y > PH - 15) { pdf.addPage(); y = 15; }
        pdf.setFillColor(i % 2 === 0 ? 250 : 245, 252, 255);
        pdf.rect(14, y - 2, PW - 28, 6, 'F');
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6); pdf.setTextColor(40, 60, 100);
        pdf.text(S2(s.desc), 16, y + 1.5);
        pdf.text('d=' + (s.grosime * 100).toFixed(0) + 'cm', 100, y + 1.5);
        pdf.text('λ=' + s.lambda.toFixed(3) + ' W/mK', 130, y + 1.5);
        pdf.text('R=' + (s.grosime / s.lambda).toFixed(3) + ' m²K/W', 165, y + 1.5);
        y += 6;
      });
      y += 4;
    });

    pdf.setFont('helvetica', 'italic'); pdf.setFontSize(5.5); pdf.setTextColor(160, 170, 185);
    pdf.text('UrbanX TSS·FG · Verificare termică orientativă · C107-1/2010 + GT 019/2019', PW / 2, PH - 5, { align: 'center' });

    pdf.save(('Raport_termic_' + (P.nrCad || 'x') + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_'));
    if (typeof ss === 'function') ss('✅ Raport termic C107/2010 generat');
  };

  // ═══════════════════════════════════════════════════════════════════════
  // P2B — FIȘE TEHNICE PER APARTAMENT
  // ═══════════════════════════════════════════════════════════════════════

  function _injectThermalAndApt() {
    // Buton în dropdown-ul export
    const _addToDropdown = () => {
      const menu = document.getElementById('ux-export-menu');
      if (!menu || document.getElementById('ux-termic-item')) return false;
      const items = [
        { id: 'ux-termic-item', icon: '🌡', label: 'Raport termic C107/2010', fn: '_rvExportRaportTermic' },
        { id: 'ux-fisapt-item', icon: '🏠', label: 'Fișe tehnice apartamente', fn: '_rvExportFiseApt' },
      ];
      items.forEach(item => {
        const btn = document.createElement('button');
        btn.id = item.id; btn.className = 'ux-exp-item';
        btn.innerHTML = `<span style="font-size:14px">${item.icon}</span>${item.label}`;
        btn.onclick = () => { menu.classList.remove('open'); window[item.fn]?.(); };
        menu.appendChild(btn);
      });
      return true;
    };
    if (_addToDropdown()) return;
    const obs = setInterval(() => { if (_addToDropdown()) clearInterval(obs); }, 1000);
    setTimeout(() => clearInterval(obs), 20000);
  }

  window._rvExportFiseApt = async function () {
    const b = _RV.building, P = _RV.parcelParams;
    if (!b || !P) { alert('Generați releveele mai întâi.'); return; }
    const fl0 = _RV.floors?.[0];
    if (!fl0?.rects) { alert('Planul de nivel nu este disponibil.'); return; }
    const _jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!_jsPDF) return;
    if (typeof ss === 'function') ss('🏠 Generez fișe tehnice apartamente…');

    const pdf = new _jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const PW = 210, PH = 297;
    const S2 = s => String(s || '').replace(/[^\x20-\x7E\u00C0-\u024F]/g, ' ').trim();

    const aptIds = [...new Set(fl0.rects.filter(r => r.apt >= 0).map(r => r.apt))].sort((a, b) => a - b);
    const NP057 = typeof _RV_NP057 !== 'undefined' ? _RV_NP057 : { living: 14, bedroom: 12, bedroom2: 10, bedroom3: 8, kitchen: 5, bath: 3.6, wc: 1.2 };
    const ROOM_LBL = { living: 'Camera de zi', bedroom: 'Dormitor 1', bedroom2: 'Dormitor 2', bedroom3: 'Dormitor 3', kitchen: 'Bucătărie', bath: 'Baie', wc: 'WC', hall: 'Hol', storage: 'Debara', balcon: 'Balcon' };
    const ORIENTARI = { N: 'Nord', S: 'Sud', E: 'Est', V: 'Vest', SE: 'Sud-Est', SV: 'Sud-Vest', NE: 'Nord-Est', NV: 'Nord-Vest' };

    aptIds.forEach((aptId, idx) => {
      if (idx > 0) pdf.addPage();

      const rooms = fl0.rects.filter(r => r.apt === aptId);
      const mainRooms = rooms.filter(r => !r.bal);
      const balcoane = rooms.filter(r => r.bal);
      const su = mainRooms.reduce((s, r) => s + r.w * r.h, 0);
      const suBal = balcoane.reduce((s, r) => s + r.w * r.h, 0);
      const sc = su * 1.22; // SU → SC estimat
      const nDorm = mainRooms.filter(r => r.t.startsWith('bedroom')).length;
      const tipMap = { 0: 'Garsonieră', 1: 'Apartament 2 camere', 2: 'Apartament 3 camere', 3: 'Apartament 4 camere' };
      const tip = tipMap[nDorm] || (nDorm + 1) + ' camere';

      // Determinare etaj
      let etaj = 0;
      for (let fi = 0; fi < (_RV.floors?.length || 1); fi++) {
        const hasFl = _RV.floors?.[fi]?.rects?.some(r => r.apt === aptId);
        if (hasFl) { etaj = fi; break; }
      }

      // Header
      pdf.setFillColor(30, 58, 138); pdf.rect(0, 0, PW, 22, 'F');
      pdf.setFillColor(212, 175, 55); pdf.rect(0, 21.5, PW, 1, 'F');
      pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(14);
      pdf.text(S2(tip), PW / 2, 10, { align: 'center' });
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.setTextColor(180, 210, 240);
      pdf.text(S2('Ap.' + String(aptId + 1).padStart(2, '0') + ' · Etaj ' + (etaj === 0 ? 'Parter' : etaj) + ' · Nr.cad. ' + P.nrCad + ' · UTR ' + P.utr), PW / 2, 17, { align: 'center' });

      let y = 27;

      // Indicatori principali
      const indics = [
        ['Suprafața utilă (SU)', su.toFixed(2) + ' m²'],
        ['Suprafața construită (SC est.)', sc.toFixed(2) + ' m²'],
        ['Suprafața balcoane', suBal > 0 ? suBal.toFixed(2) + ' m²' : 'Nu există'],
        ['Număr camere', String(nDorm + 1) + (nDorm > 0 ? ' (1 living + ' + nDorm + ' dorm.)' : ' (garsonieră)')],
        ['Etaj', etaj === 0 ? 'Parter (P)' : 'Etaj ' + etaj + ' (E' + etaj + ')'],
        ['Orientare principală', S2(ORIENTARI[P.frontDir] || P.frontDir || '—')],
        ['Însorire camere', mainRooms.every(r => r.solarOk !== false) ? 'Conforme OMS 119/2014' : 'Verificare necesară'],
      ];

      pdf.setFillColor(248, 250, 255); pdf.rect(10, y, PW - 20, indics.length * 7.5 + 6, 'F');
      pdf.setDrawColor(180, 200, 235); pdf.setLineWidth(.3); pdf.rect(10, y, PW - 20, indics.length * 7.5 + 6, 'S');
      indics.forEach(([lbl, val], i) => {
        const ry = y + 5 + i * 7.5;
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5); pdf.setTextColor(60, 80, 120);
        pdf.text(S2(lbl), 13, ry);
        pdf.setFont('helvetica', 'bold'); pdf.setTextColor(15, 40, 100);
        pdf.text(S2(val), 100, ry);
      });
      y += indics.length * 7.5 + 10;

      // Tabel camere cu normative
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.setTextColor(15, 23, 42);
      pdf.text('SUPRAFEȚE PER CAMERĂ — VERIFICARE NP 057/2002', 14, y); y += 7;

      const cols3 = [14, 70, 100, 127, 154, 180];
      pdf.setFillColor(20, 40, 90); pdf.rect(10, y - 4, PW - 20, 7, 'F');
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6); pdf.setTextColor(255, 255, 255);
      ['Cameră', 'SU (m²)', 'Min. NP057', 'Dim. (m)', 'Orientare', 'OMS119'].forEach((h, i) => pdf.text(h, cols3[i], y));
      y += 5;

      [...mainRooms, ...balcoane].forEach((r, ri) => {
        const area = r.w * r.h;
        const minA = NP057[r.t] || 0;
        const ok = !minA || area >= minA - .05;
        const front = P.frontDir || 'N';
        const wallDir = r.y <= .3 ? front : r.y + r.h >= b.bD - .3 ? ({ N: 'S', S: 'N', E: 'V', V: 'E' }[front] || 'S') : 'Int.';
        const solarLbl = r.solarOk === true ? '✅' : r.solarOk === false ? '⚠' : '—';

        pdf.setFillColor(ri % 2 === 0 ? 248 : 243, 250, ri % 2 === 0 ? 255 : 250);
        pdf.rect(10, y - 3, PW - 20, 7, 'F');
        if (!ok) { pdf.setFillColor(255, 235, 235); pdf.rect(10, y - 3, PW - 20, 7, 'F'); }

        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5);
        pdf.setTextColor(20, 40, 90);
        pdf.text(S2(ROOM_LBL[r.t] || r.t), cols3[0], y + 0.5);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(!minA || ok ? 15 : 180, !minA || ok ? 80 : 30, !minA || ok ? 40 : 30);
        pdf.text(area.toFixed(2), cols3[1], y + 0.5);
        pdf.setFont('helvetica', 'normal'); pdf.setTextColor(80, 100, 130);
        pdf.text(minA ? minA.toFixed(1) : '—', cols3[2], y + 0.5);
        pdf.text(r.w.toFixed(1) + '×' + r.h.toFixed(1), cols3[3], y + 0.5);
        pdf.text(S2(wallDir), cols3[4], y + 0.5);
        pdf.text(solarLbl, cols3[5], y + 0.5);
        y += 7;
      });

      // Total
      pdf.setFillColor(230, 240, 255); pdf.rect(10, y - 2, PW - 20, 7, 'F');
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6.5); pdf.setTextColor(15, 40, 90);
      pdf.text('TOTAL SU: ' + su.toFixed(2) + ' m²   |   Balcoane: ' + suBal.toFixed(2) + ' m²   |   SC estimat: ' + sc.toFixed(2) + ' m²', cols3[0], y + 1.5);
      y += 12;

      // Normative per apartament
      if (y < PH - 30) {
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7); pdf.setTextColor(15, 23, 42);
        pdf.text('CONFORMITATE NORMATIVĂ', 14, y); y += 7;
        const normChecks = [
          { n: 'NP 057/2002', desc: 'Suprafețe minime', ok: mainRooms.every(r => { const m = NP057[r.t]; return !m || r.w * r.h >= m - .05; }) },
          { n: 'OMS 119/2014', desc: 'Însorire min. 1.5h/zi', ok: !mainRooms.some(r => r.solarOk === false) },
          { n: 'NP 057 SU', desc: 'SU minimă apartament', ok: su >= (nDorm >= 3 ? 75 : nDorm >= 2 ? 55 : nDorm >= 1 ? 37 : 28) },
        ];
        normChecks.forEach(nc => {
          pdf.setFillColor(nc.ok ? 240 : 255, nc.ok ? 255 : 240, nc.ok ? 240 : 240);
          pdf.rect(10, y - 3, PW - 20, 7, 'F');
          pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6.5);
          pdf.setTextColor(nc.ok ? 15 : 180, nc.ok ? 120 : 30, nc.ok ? 40 : 30);
          pdf.text((nc.ok ? '✅ ' : '⚠ ') + nc.n, 12, y + 0.5);
          pdf.setFont('helvetica', 'normal'); pdf.setTextColor(60, 80, 110);
          pdf.text(S2(nc.desc), 70, y + 0.5);
          y += 7;
        });
      }

      pdf.setFont('helvetica', 'italic'); pdf.setFontSize(5.5); pdf.setTextColor(150, 160, 175);
      pdf.text('UrbanX TSS·FG · Fișă tehnică orientativă · Apartament ' + (aptId + 1) + ' · Document pre-proiectare', PW / 2, PH - 5, { align: 'center' });
    });

    pdf.save(('Fise_apartamente_' + (P.nrCad || 'x') + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_'));
    if (typeof ss === 'function') ss('✅ Fișe tehnice: ' + aptIds.length + ' apartamente');
  };

  // ═══════════════════════════════════════════════════════════════════════
  // P3 — PLAN ÎNCADRARE CU CLĂDIRI OSM REALE
  // ═══════════════════════════════════════════════════════════════════════

  function _fixIncadrareOSM() {
    window._rvRenderIncadrare = function (b) {
      if (!b || !b.P) return;
      const { P, bW, bD, niv } = b;
      const _AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
      const SC = Math.min(_RV.scale * .35, 3);
      const PAD = 60, CTX = 120;
      const pW = P.W * SC, pH = P.D * SC;
      const W = pW + PAD * 2 + CTX * 2 + 200, H = pH + PAD * 2 + CTX * 2 + 130;
      const { cv, ctx } = _rvInitCanvas(W, H, 'rv-canvas');
      if (!ctx) return;
      ctx.fillStyle = '#F0F4F8'; ctx.fillRect(0, 0, W, H);
      const ox = PAD + CTX, oy = PAD + CTX;

      // Titlu
      ctx.fillStyle = '#0F172A'; ctx.font = 'bold 12px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('PLAN DE ÎNCADRARE ÎN ZONĂ', ox + pW / 2, oy - CTX - 22);
      ctx.font = '8px IBM Plex Mono'; ctx.fillStyle = '#64748B';
      ctx.fillText('Nr.cad. ' + P.nrCad + ' · UTR ' + P.utr + ' · Sc. 1:' + Math.round(100 / (SC / 12) * 2.9), ox + pW / 2, oy - CTX - 8);
      ctx.textAlign = 'left';

      // Fond urban
      ctx.fillStyle = '#E8EDF4';
      ctx.fillRect(ox - CTX, oy - CTX, pW + CTX * 2, pH + CTX * 2);

      // ── Clădiri OSM reale din Mapbox ──────────────────────────────────
      const osmBuildings = _getOSMBuildings(P, bW, bD, SC, ox, oy, pW, pH, CTX);
      osmBuildings.forEach(bld => {
        const heightAlpha = Math.min(.65, .15 + bld.height / 50 * .5);
        ctx.fillStyle = `rgba(148,163,184,${heightAlpha})`;
        ctx.fillRect(bld.x, bld.y, bld.w, bld.h);
        ctx.strokeStyle = 'rgba(100,116,139,.5)'; ctx.lineWidth = .7;
        ctx.strokeRect(bld.x, bld.y, bld.w, bld.h);
        // Hașuri conform înălțime
        ctx.save(); ctx.beginPath(); ctx.rect(bld.x, bld.y, bld.w, bld.h); ctx.clip();
        ctx.strokeStyle = 'rgba(100,116,139,.12)'; ctx.lineWidth = .4;
        for (let h = -bld.h; h < bld.w + bld.h; h += 5) {
          ctx.beginPath(); ctx.moveTo(bld.x + h, bld.y); ctx.lineTo(bld.x + h + bld.h, bld.y + bld.h); ctx.stroke();
        }
        ctx.restore();
        // Etichetă înălțime
        if (bld.w > 15 && bld.h > 10 && bld.height > 0) {
          ctx.fillStyle = 'rgba(30,41,59,.6)'; ctx.font = '6px IBM Plex Mono'; ctx.textAlign = 'center';
          ctx.fillText(bld.height + 'm', bld.x + bld.w / 2, bld.y + bld.h / 2 + 2); ctx.textAlign = 'left';
        }
      });

      // Stradă principală
      const strW = Math.max(20, 6 * SC);
      ctx.fillStyle = 'rgba(200,210,220,.7)';
      ctx.fillRect(ox - CTX, oy - strW, pW + CTX * 2, strW);
      ctx.strokeStyle = '#D97706'; ctx.lineWidth = 1; ctx.setLineDash([8, 6]);
      ctx.beginPath(); ctx.moveTo(ox - CTX, oy - strW / 2); ctx.lineTo(ox + pW + CTX, oy - strW / 2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#475569'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('STRADĂ PRINCIPALĂ — FRONT ' + (P.frontDir || 'N'), ox + pW / 2, oy - strW / 2 + 3);

      // Trotuar
      ctx.fillStyle = 'rgba(180,190,205,.5)';
      ctx.fillRect(ox, oy - Math.max(5, 1.5 * SC), pW, Math.max(5, 1.5 * SC));

      // Parcela
      ctx.fillStyle = 'rgba(254,249,195,.5)'; ctx.fillRect(ox, oy, pW, pH);
      ctx.strokeStyle = '#CA8A04'; ctx.lineWidth = 2; ctx.strokeRect(ox, oy, pW, pH);

      // Clădire propusă
      const bX = ox + (pW - bW * SC) / 2, bY = oy + (pH - bD * SC) / 2;
      ctx.fillStyle = 'rgba(30,64,175,.18)'; ctx.fillRect(bX, bY, bW * SC, bD * SC);
      ctx.save(); ctx.beginPath(); ctx.rect(bX, bY, bW * SC, bD * SC); ctx.clip();
      ctx.strokeStyle = 'rgba(30,64,175,.2)'; ctx.lineWidth = .7;
      for (let h = -bD * SC; h < bW * SC + bD * SC; h += 7) {
        ctx.beginPath(); ctx.moveTo(bX + h, bY); ctx.lineTo(bX + h + bD * SC, bY + bD * SC); ctx.stroke();
      }
      ctx.restore();
      ctx.strokeStyle = '#1E40AF'; ctx.lineWidth = 2.5; ctx.strokeRect(bX, bY, bW * SC, bD * SC);
      ctx.fillStyle = '#1E40AF'; ctx.font = 'bold 8px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('OBIECTIV', bX + bW * SC / 2, bY + bD * SC / 2 - 4);
      ctx.font = '7px IBM Plex Mono';
      ctx.fillText('P+' + (niv - 1) + ' · H=' + (niv * P.hn).toFixed(1) + 'm', bX + bW * SC / 2, bY + bD * SC / 2 + 8);
      ctx.textAlign = 'left';

      // Cote parcelă
      ctx.strokeStyle = '#1E40AF'; ctx.fillStyle = '#1E40AF'; ctx.lineWidth = .8;
      ctx.beginPath(); ctx.moveTo(ox, oy - 16); ctx.lineTo(ox + pW, oy - 16); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ox, oy - 20); ctx.lineTo(ox, oy - 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ox + pW, oy - 20); ctx.lineTo(ox + pW, oy - 12); ctx.stroke();
      ctx.font = 'bold 8px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText(P.W.toFixed(2) + 'm', ox + pW / 2, oy - 20);
      ctx.textAlign = 'left';

      // Legendă
      const lgX = ox + pW + CTX * .15, lgY = oy + pH * .3;
      const lgItems = [
        { col: 'rgba(254,249,195,.6)', bc: '#CA8A04', lbl: 'Parcela studiată' },
        { col: 'rgba(30,64,175,.18)', bc: '#1E40AF', lbl: 'Construcție propusă' },
        { col: 'rgba(148,163,184,.5)', bc: '#94A3B8', lbl: 'Clădiri existente (OSM)' },
        { col: 'rgba(200,210,220,.7)', bc: '#94A3B8', lbl: 'Carosabil' },
      ];
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(lgX, lgY, 150, lgItems.length * 18 + 20);
      ctx.strokeStyle = '#CBD5E1'; ctx.lineWidth = 1; ctx.strokeRect(lgX, lgY, 150, lgItems.length * 18 + 20);
      ctx.fillStyle = '#1E293B'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.fillText('LEGENDĂ', lgX + 3, lgY + 11);
      lgItems.forEach(({ col, bc, lbl }, i) => {
        const ly = lgY + 18 + i * 18;
        ctx.fillStyle = col; ctx.fillRect(lgX + 3, ly, 14, 12);
        ctx.strokeStyle = bc; ctx.lineWidth = 1; ctx.strokeRect(lgX + 3, ly, 14, 12);
        ctx.fillStyle = '#334155'; ctx.font = '7px IBM Plex Mono'; ctx.fillText(lbl, lgX + 20, ly + 9);
      });

      // Status OSM
      ctx.fillStyle = osmBuildings.length > 0 ? '#15803D' : '#94A3B8';
      ctx.font = '6px IBM Plex Mono';
      ctx.fillText(osmBuildings.length > 0 ? '✅ ' + osmBuildings.length + ' clădiri OSM' : '○ Clădiri OSM: hartă indisponibilă', lgX + 3, lgY + lgItems.length * 18 + 32);

      if (typeof _rvDrawNorth === 'function') _rvDrawNorth(ctx, W - 50, 60, P.frontDir);
      if (typeof _rvDrawScale === 'function') _rvDrawScale(ctx, PAD, H - 18, SC);
      if (typeof _rvDrawCartus === 'function') _rvDrawCartus(ctx, W, H - 8, P, null, 'PLAN ÎNCADRARE ÎN ZONĂ');
    };
  }

  function _getOSMBuildings(P, bW, bD, SC, ox, oy, pW, pH, CTX) {
    const buildings = [];
    const map = window.map;
    if (!map || typeof map.queryRenderedFeatures !== 'function') {
      // Fallback: clădiri generice schematice
      return _getSchematicNeighbors(bW, bD, SC, ox, oy, pW, pH, CTX);
    }
    try {
      const features = map.queryRenderedFeatures(
        undefined,
        { layers: ['building-extrusion', 'building', '3d-buildings', 'fill-extrusion'].filter(l => { try { return !!map.getLayer(l); } catch { return false; } }) }
      );
      const cent = P.lon !== undefined ? [P.lon, P.lat] : null;
      features.slice(0, 40).forEach(f => {
        if (!f.geometry) return;
        const height = parseFloat(f.properties?.height || f.properties?.render_height || 6);
        const bbox2 = f.geometry.type === 'Polygon' ? f.geometry.coordinates[0] : (f.geometry.coordinates?.[0]?.[0] || []);
        if (!bbox2.length) return;
        const lons = bbox2.map(c => c[0]), lats = bbox2.map(c => c[1]);
        const minLon = Math.min(...lons), maxLon = Math.max(...lons);
        const minLat = Math.min(...lats), maxLat = Math.max(...lats);
        if (!cent) return;
        const mPerDeg = 111320;
        const dx = (minLon - cent[0]) * mPerDeg * Math.cos(cent[1] * Math.PI / 180);
        const dy = (cent[1] - maxLat) * mPerDeg;
        const bwm = (maxLon - minLon) * mPerDeg * Math.cos(cent[1] * Math.PI / 180);
        const bhm = (maxLat - minLat) * mPerDeg;
        const bx = ox + (dx + P.W / 2) * SC;
        const by = oy + (dy + P.D / 2) * SC;
        buildings.push({ x: bx, y: by, w: bwm * SC, h: bhm * SC, height });
      });
      return buildings.length > 0 ? buildings : _getSchematicNeighbors(bW, bD, SC, ox, oy, pW, pH, CTX);
    } catch (e) {
      return _getSchematicNeighbors(bW, bD, SC, ox, oy, pW, pH, CTX);
    }
  }

  function _getSchematicNeighbors(bW, bD, SC, ox, oy, pW, pH, CTX) {
    return [
      { x: ox - CTX * .9, y: oy, w: CTX * .75, h: pH * .55, height: 9 },
      { x: ox + pW + CTX * .15, y: oy + pH * .1, w: CTX * .7, h: pH * .65, height: 12 },
      { x: ox + pW * .05, y: oy + pH + CTX * .15, w: pW * .5, h: CTX * .5, height: 6 },
      { x: ox + pW * .6, y: oy + pH + CTX * .1, w: pW * .38, h: CTX * .55, height: 15 },
      { x: ox - CTX * .85, y: oy + pH * .6, w: CTX * .65, h: pH * .35, height: 18 },
    ];
  }

  // ═══════════════════════════════════════════════════════════════════════
  // P4A — CERTIFICAT DE CONFORMITATE URBANISTICĂ
  // ═══════════════════════════════════════════════════════════════════════

  function _injectCertificat() {
    const _addBtn = () => {
      const menu = document.getElementById('ux-export-menu');
      if (!menu || document.getElementById('ux-cert-item')) return false;
      const btn = document.createElement('button');
      btn.id = 'ux-cert-item'; btn.className = 'ux-exp-item';
      btn.innerHTML = '<span style="font-size:14px">🏛</span>Certificat Conformitate Urbanistică';
      btn.onclick = () => { menu.classList.remove('open'); window._rvExportCertificat?.(); };
      menu.appendChild(btn);
      return true;
    };
    if (_addBtn()) return;
    const obs = setInterval(() => { if (_addBtn()) clearInterval(obs); }, 1000);
    setTimeout(() => clearInterval(obs), 20000);
  }

  window._rvExportCertificat = async function () {
    const b = _RV.building, P = _RV.parcelParams;
    if (!b || !P) { alert('Generați releveele mai întâi.'); return; }
    const _jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!_jsPDF) return;
    if (typeof ss === 'function') ss('🏛 Generez certificat de conformitate…');

    const pdf = new _jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const PW = 210, PH = 297;
    const S2 = s => String(s || '').replace(/[^\x20-\x7E\u00C0-\u024F]/g, ' ').trim();
    const _AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
    const fl0 = _RV.floors?.[0];
    const sc = b.scArea || b.bW * b.bD;
    const sda = b.sdaTotal || sc * b.niv;
    const potReal = sc / P.area;
    const cutReal = sda / P.area;

    // Header oficial
    pdf.setFillColor(15, 23, 42); pdf.rect(0, 0, PW, 28, 'F');
    pdf.setFillColor(212, 175, 55); pdf.rect(0, 27.5, PW, 1, 'F');
    pdf.setTextColor(212, 175, 55); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7);
    pdf.text('DOCUMENT ORIENTATIV — NU ÎNLOCUIEȘTE CERTIFICATUL DE URBANISM OFICIAL', PW / 2, 7, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(14);
    pdf.text('CERTIFICAT DE CONFORMITATE URBANISTICĂ', PW / 2, 18, { align: 'center' });
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.setTextColor(180, 200, 230);
    pdf.text(S2('Nr.cad. ' + P.nrCad + ' · UAT ' + (P.uatLabel || '—') + ' · ' + new Date().toLocaleDateString('ro-RO')), PW / 2, 25, { align: 'center' });

    let y = 33;

    // ── SECȚIUNEA 1: DATE IMOBIL ──────────────────────────────────────────
    const section = (title, col) => {
      if (y > PH - 30) { pdf.addPage(); y = 15; }
      pdf.setFillColor(...(col || [20, 40, 100])); pdf.rect(10, y, PW - 20, 9, 'F');
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8.5); pdf.setTextColor(255, 255, 255);
      pdf.text(S2(title), 13, y + 6.5); y += 12;
    };

    const row = (lbl, val, ok) => {
      if (y > PH - 12) { pdf.addPage(); y = 15; }
      const bg = ok === true ? [240, 255, 240] : ok === false ? [255, 240, 240] : [248, 250, 255];
      pdf.setFillColor(...bg); pdf.rect(10, y - 3, PW - 20, 7, 'F');
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5); pdf.setTextColor(40, 60, 110);
      pdf.text(S2(lbl), 12, y + .5);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(ok === true ? 15 : ok === false ? 180 : 20, ok === true ? 120 : ok === false ? 30 : 40, ok === true ? 40 : ok === false ? 30 : 90);
      pdf.text(S2(val), 110, y + .5);
      if (ok === true) pdf.text('✅ CONFORM', 175, y + .5);
      if (ok === false) pdf.text('⚠ VERIFICARE', 170, y + .5);
      y += 7;
    };

    section('1. IDENTIFICARE IMOBIL');
    row('Număr cadastral', P.nrCad || '—');
    row('UAT / Județ', S2((P.uatLabel || '—') + ' / ' + (P.judet || '—')));
    row('Suprafață teren (din acte)', (P.area || 0).toFixed(0) + ' m²');
    row('Zone urbanistice (UTR)', S2(P.utr || '—'));
    row('Funcțiune propusă', S2(_AC.fnLabel || P.fn || '—'));
    row('Regim juridic teren', '_________________________________ (din CF)');
    y += 3;

    section('2. VERIFICARE INDICATORI URBANISTICI (PUG/PUZ)');
    row('POT maxim admis (PUG)', Math.round(P.pot * 100) + '%', null);
    row('POT propus', (potReal * 100).toFixed(1) + '%', potReal <= P.pot + .005);
    row('CUT maxim admis (PUG)', String(P.cut), null);
    row('CUT propus', cutReal.toFixed(2), cutReal <= P.cut + .01);
    row('Înălțime maximă (PUG)', P.niv + ' niveluri', null);
    row('Înălțime propusă', b.niv + ' niveluri · H=' + (b.niv * P.hn).toFixed(1) + 'm', b.niv <= P.niv);
    row('Retragere față (min.)', (P.rf || 3) + 'm minim', null);
    row('Retrageri laterale (min.)', (P.rl || 2) + 'm minim', null);
    row('Retragere spate (min.)', (P.rs || 3) + 'm minim', null);
    y += 3;

    section('3. VERIFICARE NORMATIVE DE PROIECTARE');
    const NP057 = typeof _RV_NP057 !== 'undefined' ? _RV_NP057 : {};
    const np057Ok = !fl0?.rects?.some(r => { const m = NP057[r.t]; return m && r.w * r.h < m - .05; });
    const omsOk = !fl0?.rects?.some(r => r.solarOk === false);
    row('NP 057/2002 — Suprafețe minime camere', np057Ok ? 'Toate camerele conforme' : 'Camere sub suprafața minimă', np057Ok);
    row('OMS 119/2014 — Însorire min. 1.5h/zi', omsOk ? 'Camere conforme' : 'Verificare necesară', omsOk);
    row('P118-2/2013 — Căi evacuare ISU', 'Distanțe ≤30m (verificare necesară PT)', null);
    row('NP 051/2012 — Lift obligatoriu P+4+', b.niv >= 5 ? 'Obligatoriu (P+' + (b.niv - 1) + ')' : 'N/A (P+' + (b.niv - 1) + ' < P+4)', b.niv < 5 || true);
    row('NP 067/2002 — Parcaje obligatorii', _calcParcajeRGU(b, P).text, null);
    y += 3;

    section('4. AVIZE OBLIGATORII (conform CU)', [120, 60, 20]);
    const avizeObl = [
      ['Distribuitor apă-canal', 'Branșament rețea publică', true],
      ['Distribuitor energie electrică', 'Racord + aviz putere instalată', true],
      ['ISU județean', sda > 600 ? 'Obligatoriu (SDA > 600m²)' : 'Facultativ (<600m²)', sda > 600 ? false : null],
      ['Auditor energetic atestat', 'CPE obligatoriu (Legea 372/2005)', false],
      ['Verificator proiect atestat MDLPA', 'Cerință Af + Ar obligatorie', false],
    ];
    avizeObl.forEach(([emitent, desc, req]) => {
      row(S2(emitent), S2(desc), req === true ? true : req === false ? null : null);
    });
    y += 3;

    section('5. CONCLUZII', [15, 90, 40]);
    const allOk = potReal <= P.pot + .005 && cutReal <= P.cut + .01 && b.niv <= P.niv && np057Ok;
    if (y > PH - 30) { pdf.addPage(); y = 15; }
    const concBg = allOk ? [230, 255, 230] : [255, 248, 220];
    pdf.setFillColor(...concBg); pdf.rect(10, y, PW - 20, 22, 'F');
    pdf.setDrawColor(allOk ? 20 : 180, allOk ? 120 : 100, allOk ? 40 : 20); pdf.setLineWidth(.5); pdf.rect(10, y, PW - 20, 22, 'S');
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9);
    pdf.setTextColor(allOk ? 15 : 140, allOk ? 120 : 80, allOk ? 40 : 10);
    pdf.text(allOk ? '✅ PROPUNEREA RESPECTĂ INDICATORII URBANISTICI' : '⚠ NECESITĂ VERIFICĂRI SUPLIMENTARE', PW / 2, y + 8, { align: 'center' });
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.setTextColor(60, 80, 100);
    pdf.text(S2('Documentație completă: PT+DTAC obligatoriu. Certificat de Urbanism oficial se eliberează de Primărie (Legea 50/1991 Art.6).'), PW / 2, y + 15, { align: 'center' });
    y += 26;

    pdf.setFont('helvetica', 'italic'); pdf.setFontSize(5.5); pdf.setTextColor(160, 170, 185);
    pdf.text('UrbanX TSS·FG · Document orientativ pre-proiectare · ' + new Date().toLocaleDateString('ro-RO'), PW / 2, PH - 5, { align: 'center' });

    pdf.save(('Certificat_conformitate_' + (P.nrCad || 'x') + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_'));
    if (typeof ss === 'function') ss('✅ Certificat de conformitate urbanistică generat');
  };

  // ═══════════════════════════════════════════════════════════════════════
  // P4B — CALCULATOR PARCAJE RGU COMPLET
  // ═══════════════════════════════════════════════════════════════════════

  function _calcParcajeRGU(b, P) {
    const fn = window.AEDIS?.fn || P?.fn || 'rezidential_colectiv';
    const sda = b?.sdaTotal || (b?.scArea || 0) * (b?.niv || 1);
    const NP067 = {
      rezidential_colectiv:   { base: 1.0, unit: 'per apt', minApt: 70, label: 'Rezidențial colectiv' },
      locuinta_individuala:   { base: 2.0, unit: 'per casa', minApt: 0, label: 'Locuință individuală' },
      hotel:                  { base: 0.5, unit: 'per 2 cam', minApt: 16, label: 'Hotel' },
      birouri:                { base: 1.0, unit: 'per 50m² SDA', minApt: 0, label: 'Birouri' },
      comercial:              { base: 1.0, unit: 'per 50m² SDA', minApt: 0, label: 'Comercial' },
      industrial_depozitare:  { base: 0.5, unit: 'per 50m² SDA', minApt: 0, label: 'Industrial' },
      institutie_publica:     { base: 1.0, unit: 'per 50m² SDA', minApt: 0, label: 'Instituție' },
    };
    const cfg = NP067[fn] || NP067.rezidential_colectiv;
    let neces = 0;

    if (cfg.unit === 'per apt') {
      const nrApt = Math.max(1, Math.round(sda / (cfg.minApt || 70)));
      neces = Math.ceil(nrApt * cfg.base * 1.2); // +20% vizitatori conform RGU
    } else if (cfg.unit === 'per 2 cam') {
      const nrCam = Math.max(1, Math.round(sda / (cfg.minApt || 16)));
      neces = Math.ceil(nrCam * cfg.base);
    } else {
      neces = Math.ceil(sda / 50 * cfg.base);
    }

    // Reduceri RGU Art.25
    let reducere = 0;
    // Transport public la 300m (dacă există date)
    const hasTransport = P?.transportPublic || false;
    if (hasTransport) reducere = Math.floor(neces * .25);

    // Centru istoric (UTR IS/C/CA)
    const utr = String(P?.utr || '').toUpperCase();
    if (utr.includes('IS') || utr.includes('LC') || utr.includes('CA')) reducere = Math.max(reducere, Math.floor(neces * .5));

    const necesFinal = Math.max(1, neces - reducere);
    const disponibil = Math.max(0, Math.floor((P?.area || 200) - (b?.scArea || 100)) / 28);
    const deficit = Math.max(0, necesFinal - disponibil);
    const nLevSubsol = deficit > 0 ? Math.ceil(deficit / Math.max(1, Math.floor((b?.bW || 15) * (b?.bD || 12) / 28))) : 0;
    const pmrNec = Math.max(1, Math.ceil(necesFinal * .04));

    return {
      neces, reducere, necesFinal, disponibil, deficit, nLevSubsol, pmrNec,
      text: necesFinal + ' locuri (incl. ' + pmrNec + ' PMR) — ' + (deficit > 0 ? 'deficit ' + deficit + ' → subsol ' + nLevSubsol + ' niv.' : 'fără deficit'),
      label: cfg.label,
    };
  }

  function _fixParcajeRGU() {
    // Expunem funcția global
    window._calcParcajeRGU = _calcParcajeRGU;

    // Actualizăm panoul DNA cu informații parcaje mai detaliate
    const _updateDNAPanel = () => {
      const b = _RV?.building, P = _RV?.parcelParams;
      if (!b || !P) return;
      const park = _calcParcajeRGU(b, P);
      const el = document.getElementById('rv-dna-parcaje-detail');
      if (!el) return;
      el.innerHTML = `
        <div style="font-size:8px;font-family:IBM Plex Mono,monospace;color:#94A3B8;margin-top:4px">
          <div style="color:#DDE6F5;font-weight:700;margin-bottom:3px">NP 067/2002 — ${park.label}</div>
          <div>Necesar: <span style="color:#F5C518">${park.neces}</span> locuri</div>
          ${park.reducere > 0 ? '<div>Reducere RGU: <span style="color:#22C55E">-' + park.reducere + '</span> locuri</div>' : ''}
          <div>Necesar final: <span style="color:#F5C518">${park.necesFinal}</span> (${park.pmrNec} PMR ≥4%)</div>
          <div>Disponibil sol: <span style="color:${park.disponibil >= park.necesFinal ? '#22C55E' : '#EF4444'}">${park.disponibil}</span> locuri</div>
          ${park.deficit > 0 ? `<div style="color:#EF4444;font-weight:700">Deficit: ${park.deficit} → subsol ${park.nLevSubsol} niv.</div>` : '<div style="color:#22C55E">Fără deficit ✓</div>'}
        </div>
      `;
    };

    // Hook pe render
    const orig = window._rvRender;
    if (orig && !window._PARCAJE_RGU_HOOKED) {
      window._PARCAJE_RGU_HOOKED = true;
      window._rvRender = function () {
        orig.apply(this, arguments);
        setTimeout(_updateDNAPanel, 200);
      };
    }
  }

})();
