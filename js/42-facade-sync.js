// ═══════════════════════════════════════════════════════════════════════════
// 42-facade-sync.js — Sincronizare completă Fațade cu AEDIS + Flux de lucru
// UrbanX TSS·FG | v1.0 | 10 Iunie 2026
//
// PROBLEMA IDENTIFICATĂ:
//   _rvRenderFacade() generează aceeași fațadă indiferent de setările AEDIS.
//   viewer3D are cfgByStil cu culori, materiale, proporții diferite per stil.
//   Planșele ignorau complet aceste diferențe.
//
// CE IMPLEMENTEAZĂ:
//   1. FAȚADE SINCRONIZATE cu viewer3D:
//      - Culori sticlă, cadre, panouri per stil (modern/clasic/inovator etc.)
//      - Fațada N ≠ S ≠ E ≠ V (diferențieri realiste)
//      - Perete cortină NUMAI pe fațadele setate
//      - Balcoane cu adâncime și parapet corect
//      - Pilastri pe stil clasic/industrial
//      - Cornișe și bandouri orizontale per stil
//      - Intrare principală cu treaptă + rampă PMR
//      - Rampă subsol pe fațada cu acces auto
//      - Parter cu altă funcțiune (înălțime diferită + ferestre diferite)
//
//   2. FLUX DE LUCRU CORECT:
//      - Buton "📐 Planșe" direct în panoul AEDIS
//      - Buton "🏠 Viewer 3D" direct în Planșe
//      - Snapshot configurație AEDIS la momentul generării
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Configurația viewer3D extrasă și adaptată pentru 2D ───────────────────
  // Sursa de adevăr: 11-viewer3d.js cfgByStil (copiat și adaptat pt canvas 2D)
  const STIL_CFG = {
    modern: {
      glassCol: '#3a80c8', frame: '#90b0cc', panelCol: '#c0d8f0',
      bandCol: '#1e3a6a', bandH: 0.14, pilW: 0.0,
      wW: 1.20, wH: 1.55, reveal: 0.08,
      balcParapet: '#0369A1', balcSlab: '#CBD5E1',
      wallCol: '#E8EEF4', wallStroke: '#B0BEC8',
      label: 'Modern',
    },
    inovator: {
      glassCol: '#2040d0', frame: '#5060b0', panelCol: '#08102a',
      bandCol: '#3a2880', bandH: 0.18, pilW: 0.0,
      wW: 1.40, wH: 1.90, reveal: 0.12,
      balcParapet: '#7C3AED', balcSlab: '#1E1040',
      wallCol: '#0D1428', wallStroke: '#334155',
      label: 'Inovator',
    },
    clasic: {
      glassCol: '#6878a0', frame: '#d4b860', panelCol: '#e8d090',
      bandCol: '#c8a040', bandH: 0.35, pilW: 0.28,
      wW: 0.80, wH: 1.20, reveal: 0.22,
      balcParapet: '#B45309', balcSlab: '#E8D090',
      wallCol: '#F5EDD0', wallStroke: '#C8A040',
      label: 'Clasic',
    },
    minimalist: {
      glassCol: '#a0c8e0', frame: '#e0eaf0', panelCol: '#f0f4f8',
      bandCol: '#d0dce8', bandH: 0.05, pilW: 0.0,
      wW: 1.65, wH: 1.85, reveal: 0.04,
      balcParapet: '#94A3B8', balcSlab: '#E2E8F0',
      wallCol: '#F8FAFC', wallStroke: '#CBD5E1',
      label: 'Minimalist',
    },
    industrial: {
      glassCol: '#384858', frame: '#905020', panelCol: '#281808',
      bandCol: '#d05010', bandH: 0.30, pilW: 0.30,
      wW: 0.80, wH: 1.00, reveal: 0.28,
      balcParapet: '#92400E', balcSlab: '#44220A',
      wallCol: '#2A1A0A', wallStroke: '#6B3010',
      label: 'Industrial',
    },
    adaptat_context: {
      glassCol: '#5090a0', frame: '#80a870', panelCol: '#d0e8c0',
      bandCol: '#4a8040', bandH: 0.20, pilW: 0.08,
      wW: 1.00, wH: 1.40, reveal: 0.14,
      balcParapet: '#15803D', balcSlab: '#BBF7D0',
      wallCol: '#EEF4E8', wallStroke: '#86EFAC',
      label: 'Adaptat Context',
    },
  };

  const FN_CFG = {
    birouri:              { wW: 1.40, wH: 2.40, hasBalc: false, curtain: true,  glassCol: '#2060a0' },
    hotel:                { wW: 1.00, wH: 1.65, hasBalc: true,  curtain: false, glassCol: '#4878a8' },
    comercial:            { wW: 2.20, wH: 2.60, hasBalc: false, curtain: true,  glassCol: '#60a8d0' },
    rezidential_colectiv: { wW: 1.10, wH: 1.40, hasBalc: true,  curtain: false, glassCol: '#4888b8' },
    locuinta_individuala: { wW: 0.90, wH: 1.20, hasBalc: false, curtain: false, glassCol: '#6090a0' },
    institutie_publica:   { wW: 1.00, wH: 1.50, hasBalc: false, curtain: false, glassCol: '#5580a0' },
    mixt:                 { wW: 1.30, wH: 2.00, hasBalc: true,  curtain: false, glassCol: '#3070b8' },
  };

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (typeof _rvRenderFacade !== 'undefined') { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 250);
  }

  waitReady(() => {
    _patchFacade();
    _injectWorkflowButtons();
    console.log('[FacadeSync v1] ✅ Fațade sincronizate AEDIS + butoane flux');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 1. PATCH _rvRenderFacade
  // ═══════════════════════════════════════════════════════════════════════

  function _patchFacade() {
    if (window._FACADE_SYNC_PATCHED) return;
    window._FACADE_SYNC_PATCHED = true;

    window._rvRenderFacade = function (b) {
      _renderFacadeSync(b);
    };
  }

  function _renderFacadeSync(b) {
    if (!b?.P) return;
    const { P, bW, bD, niv, cores } = b;
    const A   = window.AEDIS || {};
    const stil = A.stil || 'modern';
    const fn   = A.fn   || 'rezidential_colectiv';
    const SC   = (window._RV?.scale || 12) * 0.85;
    const Ht   = niv * (P.hn || 3);

    // Combinăm config stil + funcțiune (exact ca viewer3D)
    const sC = STIL_CFG[stil] || STIL_CFG.modern;
    const fC = FN_CFG[fn]     || {};
    const C  = { ...sC, ...fC };

    // Override AEDIS manual
    const hasBalc      = A.hasBalcoane !== undefined ? !!A.hasBalcoane :
                         (fC.hasBalc !== undefined ? fC.hasBalc : sC.glassCol ? true : false);
    const balcD        = A.balconAdancime || 0.60;
    const hasCurtain   = !!A.peretelCortina || C.curtain || false;
    const cortinaPct   = hasCurtain ? (A.cortinaProcent || 60) : 0;
    const etajRetras   = !!A.activeRetragere;
    const parterDif    = !!A.parterDiferit;
    const fnParter     = A.fnParter || '';
    const hParter      = parterDif ? 4.5 : (P.hn || 3);
    const tipAcoperis  = A.tipAcoperis || 'terasa';
    const hasSubsol    = (b.subsolNiv || 0) > 0 || (bW * bD > 200);

    // Layout canvas — 4 fațade vertical
    const fW_NS = bW * SC;     // lățime fațade N și S
    const fW_EV = bD * SC;     // lățime fațade E și V
    const fH    = Ht * SC;     // înălțime comună
    const rowH  = fH + 120;    // spațiu per fațadă (incluzând tablou materiale)
    const W     = Math.max(fW_NS, fW_EV) + 240; // 240 = sidebar materiale
    const H     = rowH * 4 + 80;

    const { cv, ctx } = _rvInitCanvas(W, H);
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, W, H);

    // ── Title ──────────────────────────────────────────────────────────
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 12px Space Grotesk, IBM Plex Mono';
    ctx.textAlign = 'center';
    ctx.fillText(
      'FAȚADE — ' + sC.label.toUpperCase() + ' · ' + fn.toUpperCase().replace(/_/g,' '),
      W / 2, 22
    );
    ctx.fillStyle = '#64748B'; ctx.font = '8px IBM Plex Mono';
    ctx.fillText(
      niv + ' niveluri · H=' + Ht.toFixed(1) + 'm · ' + bW.toFixed(1) + '×' + bD.toFixed(1) + 'm · ' +
      (hasCurtain ? 'Perete cortină ' + cortinaPct + '% · ' : '') +
      (hasBalc ? 'Balcoane D=' + balcD + 'm · ' : '') +
      'Tip acoperiș: ' + tipAcoperis,
      W / 2, 38
    );
    ctx.textAlign = 'left';

    // ── Configurații per fațadă ────────────────────────────────────────
    const frontDir = P.frontDir || 'N';
    const oppositeDir = { N:'S', S:'N', E:'V', V:'E', NE:'SV', NV:'SE', SE:'NV', SV:'NE' };

    const facades = [
      {
        dir: frontDir,
        label: frontDir + ' — FAȚADĂ PRINCIPALĂ (FRONT STRADAL)',
        fW: fW_NS,
        isMain: true,
        hasEntry: true,
        hasRampaPMR: true,
        hasRampaSubsol: hasSubsol,
        // Fațada principală: perete cortină + balcoane complet
        curtainPct: cortinaPct,
        hasBalcoane: hasBalc,
        windowsPerFloor: null, // auto
        darker: false,
      },
      {
        dir: oppositeDir[frontDir] || 'S',
        label: (oppositeDir[frontDir] || 'S') + ' — FAȚADĂ POSTERIOARĂ',
        fW: fW_NS,
        isMain: false,
        hasEntry: false,
        hasRampaPMR: false,
        hasRampaSubsol: false,
        // Fațada posterioară: mai simplă, mai puțin cortină, uneori fără balcoane
        curtainPct: Math.floor(cortinaPct * 0.5), // mai puțin
        hasBalcoane: hasBalc,
        windowsPerFloor: null,
        darker: true,
      },
      {
        dir: 'E',
        label: 'E — FAȚADĂ LATERALĂ DREAPTĂ',
        fW: fW_EV,
        isMain: false,
        hasEntry: false,
        hasRampaPMR: false,
        hasRampaSubsol: false,
        // Lateralele: fără balcoane (în general), ferestre mai mici
        curtainPct: 0,
        hasBalcoane: false, // lateralele rar au balcoane
        windowsPerFloor: Math.max(1, Math.floor(bD / 4.5)),
        darker: true,
      },
      {
        dir: 'V',
        label: 'V — FAȚADĂ LATERALĂ STÂNGĂ',
        fW: fW_EV,
        isMain: false,
        hasEntry: false,
        hasRampaPMR: false,
        hasRampaSubsol: false,
        curtainPct: 0,
        hasBalcoane: false,
        windowsPerFloor: Math.max(1, Math.floor(bD / 4.5)),
        darker: true,
      },
    ];

    facades.forEach((fcd, idx) => {
      const oy = 50 + idx * rowH;
      const ox = 40;
      _drawFacadeSynced(ctx, fcd, b, C, A, P, SC, fH, Ht, ox, oy,
        { stil, etajRetras, parterDif, fnParter, hParter, tipAcoperis, hasSubsol });
    });

    _rvDrawNorth(ctx, W - 38, 50, P.frontDir);
    _rvDrawScale(ctx, 40, H - 20, SC);
    _rvDrawCartus(ctx, W, H, P, null, 'TOATE FAȚADELE — N · S · E · V');
  }

  function _drawFacadeSynced(ctx, fcd, b, C, A, P, SC, fH, Ht, ox, oy, opts) {
    const { stil, etajRetras, parterDif, fnParter, hParter, tipAcoperis, hasSubsol } = opts;
    const niv = b.niv;
    const hNiv = P.hn || 3;
    const fW   = fcd.fW;

    // ── Header fațadă ───────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(15,23,42,.08)';
    ctx.fillRect(ox - 5, oy - 20, fW + 10, 18);
    ctx.strokeStyle = 'rgba(212,175,55,.25)'; ctx.lineWidth = 0.8;
    ctx.strokeRect(ox - 5, oy - 20, fW + 10, 18);
    ctx.fillStyle = '#D4AF37'; ctx.font = 'bold 9px IBM Plex Mono';
    ctx.fillText('FAȚADĂ ' + fcd.label, ox, oy - 6);

    // ── Fond clădire (culoare per stil) ──────────────────────────────
    const wallCol = fcd.darker
      ? _darken(C.wallCol || '#E8EEF4', 0.08)
      : (C.wallCol || '#E8EEF4');
    ctx.fillStyle = wallCol;
    ctx.fillRect(ox, oy, fW, fH);
    ctx.strokeStyle = C.wallStroke || '#B0BEC8';
    ctx.lineWidth = 2;
    ctx.strokeRect(ox, oy, fW, fH);

    // ── Bandouri orizontale per stil ─────────────────────────────────
    const bandH = C.bandH * SC;
    if (bandH > 1) {
      for (let i = 0; i < niv; i++) {
        const by = oy + fH - (i + 1) * hNiv * SC;
        ctx.fillStyle = _hexAlpha(C.bandCol || '#334155', 0.35);
        ctx.fillRect(ox, by, fW, bandH);
      }
    }

    // ── Planșee (linii inter-etaj) ────────────────────────────────────
    for (let i = 1; i <= niv; i++) {
      const ly = oy + fH - i * hNiv * SC;
      ctx.strokeStyle = 'rgba(148,163,184,.4)'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(ox, ly); ctx.lineTo(ox + fW, ly); ctx.stroke();
      // Cotă nivel
      ctx.fillStyle = '#1D4ED8'; ctx.font = 'bold 7px IBM Plex Mono';
      ctx.textAlign = 'right';
      ctx.fillText('+' + (i * hNiv).toFixed(2) + 'm', ox - 4, ly + 3);
      ctx.fillStyle = '#475569'; ctx.font = '7px IBM Plex Mono';
      ctx.fillText(i === niv ? '' : (i === 0 ? 'P' : 'E' + i), ox - 32, ly + 3);
      ctx.textAlign = 'left';
    }
    // Parter label
    ctx.fillStyle = '#64748B'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'right';
    ctx.fillText('±0.00', ox - 4, oy + fH + 4);
    ctx.fillText('P', ox - 32, oy + fH + 4);
    ctx.textAlign = 'left';

    // ── Pilastri (clasic, industrial) ─────────────────────────────────
    const pilW = (C.pilW || 0) * SC;
    if (pilW > 2) {
      const nPil = Math.max(2, Math.floor(fW / (SC * 3.5)));
      const pilSpacing = fW / nPil;
      ctx.fillStyle = _hexAlpha(C.bandCol || '#C8A040', 0.25);
      for (let p = 0; p <= nPil; p++) {
        const px = ox + p * pilSpacing - pilW / 2;
        ctx.fillRect(px, oy, pilW, fH);
        ctx.strokeStyle = _hexAlpha(C.bandCol || '#C8A040', 0.5);
        ctx.lineWidth = 0.6;
        ctx.strokeRect(px, oy, pilW, fH);
      }
    }

    // ── Ferestre ─────────────────────────────────────────────────────
    const wW = (C.wW || 1.1) * SC;
    const wH = (C.wH || 1.4) * SC;
    const nWin = fcd.windowsPerFloor || Math.max(2, Math.floor(fW / (SC * 2.8)));
    const wSpacing = fW / nWin;
    const coreX = b.cores?.[0] ? b.cores[0].x / b.bW : 0.5; // poziție relativă core

    for (let row = 0; row < niv; row++) {
      const isParterRow = (row === 0 && parterDif);
      const rowH_px = (isParterRow ? 4.5 : hNiv) * SC;
      const wH_row  = isParterRow ? rowH_px * 0.6 : wH;
      const wy = oy + fH - (row + 1) * hNiv * SC + (hNiv * SC - wH_row) * 0.28;

      for (let col = 0; col < nWin; col++) {
        const wx = ox + col * wSpacing + (wSpacing - wW) / 2;

        // Skip nucleu scărilor
        const relX = (col + 0.5) / nWin;
        if (Math.abs(relX - coreX) < 0.12 && nWin > 3) {
          // Desenăm nucleu scări
          ctx.fillStyle = 'rgba(148,163,184,.2)';
          ctx.fillRect(wx, wy, wW * 0.7, wH_row);
          ctx.strokeStyle = '#64748B'; ctx.lineWidth = 0.8;
          ctx.strokeRect(wx, wy, wW * 0.7, wH_row);
          ctx.fillStyle = '#475569'; ctx.font = '6px IBM Plex Mono'; ctx.textAlign = 'center';
          ctx.fillText('SC', wx + wW * 0.35, wy + wH_row / 2 + 2);
          ctx.textAlign = 'left';
          continue;
        }

        // Perete cortină
        const isCortina = fcd.curtainPct > 0 && (col / nWin * 100) < fcd.curtainPct;

        if (isCortina) {
          // Cortină: geam continuu pe înălțimea etajului
          ctx.fillStyle = _hexAlpha(C.glassCol || '#3a80c8', 0.75);
          ctx.fillRect(wx - 2, oy + fH - (row + 1) * hNiv * SC, wSpacing + 2, hNiv * SC);
          ctx.strokeStyle = C.frame || '#90b0cc'; ctx.lineWidth = 1.5;
          ctx.strokeRect(wx - 2, oy + fH - (row + 1) * hNiv * SC, wSpacing + 2, hNiv * SC);
          // Grilaj mullion (linii verticale pe cortină)
          ctx.strokeStyle = _hexAlpha(C.frame || '#90b0cc', 0.4); ctx.lineWidth = 0.5;
          [0.33, 0.66].forEach(f => {
            const mx2 = wx - 2 + wSpacing * f;
            ctx.beginPath(); ctx.moveTo(mx2, oy + fH - (row + 1) * hNiv * SC);
            ctx.lineTo(mx2, oy + fH - row * hNiv * SC); ctx.stroke();
          });
        } else {
          // Fereastră normală
          ctx.fillStyle = _hexAlpha(C.glassCol || '#3a80c8', 0.55);
          ctx.fillRect(wx, wy, wW, wH_row);
          ctx.strokeStyle = C.frame || '#90b0cc'; ctx.lineWidth = 1.5;
          ctx.strokeRect(wx, wy, wW, wH_row);
          // Cercevele
          ctx.strokeStyle = _hexAlpha(C.frame || '#90b0cc', 0.35); ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(wx + wW / 2, wy); ctx.lineTo(wx + wW / 2, wy + wH_row); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(wx, wy + wH_row * 0.55); ctx.lineTo(wx + wW, wy + wH_row * 0.55); ctx.stroke();

          // Pervaz (still)
          ctx.fillStyle = _hexAlpha(C.bandCol || '#334155', 0.3);
          ctx.fillRect(wx - 3, wy + wH_row, wW + 6, SC * 0.07);
        }
      }
    }

    // ── Parter cu altă funcțiune ──────────────────────────────────────
    if (parterDif && fnParter) {
      const pdH = hParter * SC;
      const pdY = oy + fH - pdH;
      ctx.fillStyle = 'rgba(139,92,246,.1)';
      ctx.fillRect(ox, pdY, fW, pdH);
      ctx.strokeStyle = '#7C3AED'; ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 3]); ctx.strokeRect(ox, pdY, fW, pdH); ctx.setLineDash([]);
      ctx.fillStyle = '#6D28D9'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('PARTER: ' + fnParter.toUpperCase().replace(/_/g, ' '), ox + fW / 2, pdY + pdH * 0.45);
      ctx.fillText('h = ' + hParter.toFixed(1) + 'm', ox + fW / 2, pdY + pdH * 0.65);
      ctx.textAlign = 'left';
    }

    // ── Balcoane ──────────────────────────────────────────────────────
    if (fcd.hasBalcoane) {
      const bSlabH = Math.max(6, hNiv * SC * 0.13);
      const bProj  = (A.balconAdancime || 0.60) * SC * 0.5; // proiecție vizibilă
      for (let row = 1; row < niv; row++) {
        if (etajRetras && row === niv - 1) continue; // penthouse fără balcon
        const bz = oy + fH - row * hNiv * SC;
        // Placă balcon
        ctx.fillStyle = C.balcSlab || '#CBD5E1';
        ctx.fillRect(ox - bProj, bz - bSlabH, fW + bProj * 2, bSlabH);
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5;
        ctx.strokeRect(ox - bProj, bz - bSlabH, fW + bProj * 2, bSlabH);
        // Pardoseală balcon (linie subtilă)
        ctx.strokeStyle = _hexAlpha(C.bandCol || '#334155', 0.2); ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(ox - bProj, bz - 2); ctx.lineTo(ox + fW + bProj, bz - 2); ctx.stroke();
        // Parapet
        ctx.strokeStyle = C.balcParapet || '#0369A1'; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(ox - bProj, bz - bSlabH + 2);
        ctx.lineTo(ox + fW + bProj, bz - bSlabH + 2);
        ctx.stroke();
        // Montanți verticali parapet
        ctx.lineWidth = 0.8;
        const nMont = Math.floor(fW / (SC * 0.8));
        for (let m = 0; m <= nMont; m++) {
          const mx2 = ox + m * fW / nMont;
          ctx.beginPath();
          ctx.moveTo(mx2, bz - bSlabH + 2);
          ctx.lineTo(mx2, bz - bSlabH * 0.2);
          ctx.stroke();
        }
      }
    }

    // ── Penthouse / Etaj retras ───────────────────────────────────────
    if (etajRetras && niv > 1) {
      const retras = fW * 0.13;
      const phH    = hNiv * SC;
      ctx.fillStyle = _hexAlpha('#D4AF37', 0.15);
      ctx.fillRect(ox + retras, oy, fW - retras * 2, phH);
      ctx.strokeStyle = '#B45309'; ctx.lineWidth = 2.5;
      ctx.strokeRect(ox + retras, oy, fW - retras * 2, phH);
      ctx.fillStyle = '#92400E'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('PENTHOUSE / ETAJ RETRAS', ox + fW / 2, oy + phH * 0.45);
      ctx.textAlign = 'left';
    }

    // ── Acoperiș ─────────────────────────────────────────────────────
    _drawRoofProfile(ctx, tipAcoperis, ox, oy, fW, SC, b, C);

    // ── Sol ──────────────────────────────────────────────────────────
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(ox - 15, oy + fH, fW + 30, 6);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox - 30, oy + fH); ctx.lineTo(ox + fW + 50, oy + fH); ctx.stroke();
    ctx.fillStyle = '#334155'; ctx.font = 'bold 7px IBM Plex Mono';
    ctx.fillText('± 0.00 (CTN)', ox + fW + 5, oy + fH + 10);

    // ── Intrare principală ────────────────────────────────────────────
    if (fcd.hasEntry) {
      _drawMainEntry(ctx, ox, oy, fW, fH, SC, fcd.hasRampaPMR, C);
    }

    // ── Rampă subsol ─────────────────────────────────────────────────
    if (fcd.hasRampaSubsol) {
      _drawRampaSubsol(ctx, ox, oy, fW, fH, SC, C);
    }

    // ── Cotă lățime ──────────────────────────────────────────────────
    ctx.strokeStyle = '#1E40AF'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(ox, oy + fH + 28); ctx.lineTo(ox + fW, oy + fH + 28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy + fH + 22); ctx.lineTo(ox, oy + fH + 34); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox + fW, oy + fH + 22); ctx.lineTo(ox + fW, oy + fH + 34); ctx.stroke();
    ctx.fillStyle = '#1E40AF'; ctx.font = 'bold 8px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText(
      (fcd.fW === b.bW * SC ? b.bW : b.bD).toFixed(2) + 'm',
      ox + fW / 2, oy + fH + 44
    );
    ctx.textAlign = 'left';

    // ── Cotă înălțime ─────────────────────────────────────────────────
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ox + fW + 12, oy); ctx.lineTo(ox + fW + 12, oy + fH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox + fW + 6, oy); ctx.lineTo(ox + fW + 18, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox + fW + 6, oy + fH); ctx.lineTo(ox + fW + 18, oy + fH); ctx.stroke();
    ctx.save();
    ctx.translate(ox + fW + 28, oy + fH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#0F172A'; ctx.font = 'bold 9px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('H = ' + Ht.toFixed(2) + 'm', 0, 0);
    ctx.restore();

    // ── Sidebar materiale sincronizat AEDIS ───────────────────────────
    _drawMaterialsSidebar(ctx, ox, oy, fW, fH, C, A, opts, fcd);
  }

  // ── Helper: profil acoperiș ────────────────────────────────────────────
  function _drawRoofProfile(ctx, tipAcoperis, ox, oy, fW, SC, b, C) {
    if (tipAcoperis === 'inclinat' || tipAcoperis === 'sarpanta') {
      const ridgeH = b.bW * SC * 0.10;
      const ridgeX = ox + fW / 2;
      ctx.fillStyle = _hexAlpha('#6B4226', 0.3);
      ctx.beginPath();
      ctx.moveTo(ox - 10, oy);
      ctx.lineTo(ridgeX, oy - ridgeH);
      ctx.lineTo(ox + fW + 10, oy);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#4A3728'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ox - 10, oy); ctx.lineTo(ridgeX, oy - ridgeH); ctx.lineTo(ox + fW + 10, oy);
      ctx.stroke();
      ctx.fillStyle = '#4A3728'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('ACOPERIȘ ÎNCLINAR', ridgeX, oy - ridgeH - 5);
      ctx.textAlign = 'left';

    } else if (tipAcoperis === 'penthouse' || tipAcoperis === 'penthouse_terasa') {
      // Penthouse deja desenat mai sus — adăugăm doar terasa
      const aticH = 0.9 * SC;
      ctx.fillStyle = _hexAlpha('#334155', 0.3);
      ctx.fillRect(ox, oy - aticH, fW, aticH);
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5;
      ctx.strokeRect(ox, oy - aticH, fW, aticH);

    } else {
      // Terasă plată — atic
      const aticH = 0.9 * SC;
      ctx.fillStyle = _hexAlpha(C.wallCol || '#E8EEF4', 0.8);
      ctx.fillRect(ox, oy - aticH, fW, aticH);
      ctx.strokeStyle = C.wallStroke || '#B0BEC8'; ctx.lineWidth = 1.5;
      ctx.strokeRect(ox, oy - aticH, fW, aticH);
      ctx.fillStyle = '#475569'; ctx.font = '7px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('ATIC ' + (tipAcoperis === 'terasa_circulabila' ? 'TERASĂ CIRCULABILĂ' : 'TERASĂ PLATĂ'),
        ox + fW / 2, oy - aticH / 2 + 2);
      ctx.textAlign = 'left';
    }
  }

  // ── Helper: intrare principală cu treaptă + rampă PMR ─────────────────
  function _drawMainEntry(ctx, ox, oy, fW, fH, SC, hasPMR, C) {
    const dW = 1.8 * SC, dH = 2.4 * SC;
    const dX = ox + fW / 2 - dW / 2;
    const dY = oy + fH - dH;

    // Gol ușă
    ctx.fillStyle = _hexAlpha(C.glassCol || '#3a80c8', 0.3);
    ctx.fillRect(dX, dY, dW, dH);
    ctx.strokeStyle = '#F59E0B'; ctx.lineWidth = 2;
    ctx.strokeRect(dX, dY, dW, dH);
    // Cercevea uşă
    ctx.strokeStyle = _hexAlpha('#F59E0B', 0.4); ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(dX + dW / 2, dY); ctx.lineTo(dX + dW / 2, dY + dH); ctx.stroke();
    // Label
    ctx.fillStyle = '#B45309'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('▲ INTRARE PRINCIPALĂ', ox + fW / 2, oy + fH + 12);
    ctx.textAlign = 'left';

    // Trepte intrare (2 trepte)
    [0, 1].forEach(i => {
      const tw = dW + SC * (0.3 + i * 0.2);
      const tx = ox + fW / 2 - tw / 2;
      ctx.fillStyle = _hexAlpha('#94A3B8', 0.5);
      ctx.fillRect(tx, oy + fH + i * SC * 0.08, tw, SC * 0.08);
      ctx.strokeStyle = '#64748B'; ctx.lineWidth = 0.6;
      ctx.strokeRect(tx, oy + fH + i * SC * 0.08, tw, SC * 0.08);
    });

    // Rampă PMR (lateral stânga intrare)
    if (hasPMR) {
      const rW = dW * 1.4, rH = SC * 0.18;
      const rX = dX - rW - SC * 0.15;
      const rY = oy + fH;
      ctx.fillStyle = _hexAlpha('#0369A1', 0.2);
      ctx.strokeStyle = '#0369A1'; ctx.lineWidth = 1;
      ctx.fillRect(rX, rY, rW, rH);
      ctx.strokeRect(rX, rY, rW, rH);
      // Linie pantă
      ctx.strokeStyle = _hexAlpha('#0369A1', 0.5); ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(rX, rY + rH); ctx.lineTo(rX + rW, rY); ctx.stroke();
      ctx.fillStyle = '#0369A1'; ctx.font = '5.5px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('RAMPĂ PMR', rX + rW / 2, rY + rH + 9);
      ctx.fillText('i ≤ 8%', rX + rW / 2, rY + rH + 16);
      ctx.textAlign = 'left';
    }
  }

  // ── Helper: rampă subsol ───────────────────────────────────────────────
  function _drawRampaSubsol(ctx, ox, oy, fW, fH, SC, C) {
    const rW = Math.min(3.6 * SC, fW * 0.2);
    const rH = 5.0 * SC * 0.5; // L rampă la 15% pantă
    const rX = ox + fW * 0.75;
    const rY = oy + fH - rH;

    ctx.fillStyle = _hexAlpha('#F59E0B', 0.15);
    ctx.strokeStyle = '#B45309'; ctx.lineWidth = 1.5;
    // Rampă descendent
    ctx.beginPath();
    ctx.moveTo(rX, oy + fH);
    ctx.lineTo(rX + rW, oy + fH);
    ctx.lineTo(rX + rW, rY);
    ctx.lineTo(rX, oy + fH);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Hașuri diagonale
    ctx.save(); ctx.beginPath();
    ctx.moveTo(rX, oy + fH); ctx.lineTo(rX + rW, oy + fH); ctx.lineTo(rX + rW, rY); ctx.closePath();
    ctx.clip();
    ctx.strokeStyle = _hexAlpha('#B45309', 0.25); ctx.lineWidth = 0.5;
    for (let h = -rH; h < rW + rH; h += 6) {
      ctx.beginPath(); ctx.moveTo(rX + h, oy + fH); ctx.lineTo(rX + h + rH, rY); ctx.stroke();
    }
    ctx.restore();

    ctx.fillStyle = '#92400E'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('RAMPĂ S-1', rX + rW / 2, oy + fH - rH * 0.3);
    ctx.fillText('i = 15%', rX + rW / 2, oy + fH - rH * 0.15);
    ctx.textAlign = 'left';
  }

  // ── Helper: sidebar materiale sincronizat AEDIS ────────────────────────
  function _drawMaterialsSidebar(ctx, ox, oy, fW, fH, C, A, opts, fcd) {
    const sbX = ox + fW + 50; // mai departe de cotă înălțime
    const sbW = 130;
    const stil = opts.stil;

    // Materiale sincronizate cu AEDIS + stil
    const stilLabel = STIL_CFG[stil]?.label || stil;
    const matItems = [
      ['Stil arhitectural', stilLabel, C.glassCol || '#3a80c8'],
      ['Sticlă / ferestre',
        (C.glassCol ? C.glassCol.toUpperCase() : '#3A80C8') + ' · ' +
        (fcd.curtainPct > 0 ? 'Cortină ' + fcd.curtainPct + '%' : 'Ferestre ' + (C.wW||1.1).toFixed(2) + '×' + (C.wH||1.4).toFixed(2) + 'm'),
        C.glassCol || '#3a80c8'],
      ['Cadre tâmplărie',
        C.frame ? C.frame.toUpperCase() + ' · ' + (opts.stil === 'clasic' ? 'Profile aurii' : opts.stil === 'inovator' ? 'Profile violet' : 'Aluminiu anodizat') : 'Aluminiu',
        C.frame || '#90b0cc'],
      ['Panouri fațadă',
        C.panelCol ? C.panelCol.toUpperCase() + ' · ' + (opts.stil === 'clasic' ? 'Tencuiala decorativă' : opts.stil === 'industrial' ? 'Tablă vopsită' : 'BCA+EPS 15cm') : '—',
        C.panelCol || '#c0d8f0'],
      ['Bandouri / cornișe',
        C.bandCol ? C.bandCol.toUpperCase() + ' · ' + (C.bandH||0.14).toFixed(2) + 'm înălțime' : '—',
        C.bandCol || '#1e3a6a'],
      ['Balcoane',
        fcd.hasBalcoane ? ('Parapet · D=' + (A.balconAdancime||0.6) + 'm') : '— fără balcoane',
        fcd.hasBalcoane ? (C.balcParapet || '#0369A1') : '#94A3B8'],
      ['Acoperiș', opts.tipAcoperis.replace(/_/g,' '), '#22C55E'],
      ['U perete exterior', 'U≤0.27 W/m²K · BA+BCA+EPS', '#94A3B8'],
      ['Uw ferestre', 'Uw≤1.0 W/m²K · triplu low-E', '#38BDF8'],
    ];

    // Background
    ctx.fillStyle = 'rgba(248,250,252,.97)';
    ctx.strokeStyle = '#E2E8F0'; ctx.lineWidth = 1;
    ctx.fillRect(sbX, oy, sbW, fH);
    ctx.strokeRect(sbX, oy, sbW, fH);

    // Header
    ctx.fillStyle = '#1E293B'; ctx.fillRect(sbX, oy, sbW, 16);
    ctx.fillStyle = '#D4AF37'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('MATERIALE / FINISAJE', sbX + sbW / 2, oy + 11);
    ctx.textAlign = 'left';

    matItems.forEach(([name, spec, col], mi) => {
      const my = oy + 20 + mi * (fH - 20) / matItems.length;
      const mH = (fH - 20) / matItems.length - 2;

      ctx.fillStyle = mi % 2 === 0 ? 'rgba(248,250,252,1)' : 'rgba(241,245,249,1)';
      ctx.fillRect(sbX, my, sbW, mH);

      // Bandă culoare
      ctx.fillStyle = col;
      ctx.fillRect(sbX, my, 3, mH);

      // Texte
      ctx.fillStyle = '#0F172A'; ctx.font = 'bold 6px IBM Plex Mono';
      ctx.fillText(name, sbX + 6, my + mH * 0.38);
      ctx.fillStyle = '#475569'; ctx.font = '5.5px IBM Plex Mono';
      // Word wrap simplu
      const maxW = sbW - 10;
      if (ctx.measureText(spec).width > maxW) {
        const mid = Math.floor(spec.length / 2);
        ctx.fillText(spec.slice(0, mid), sbX + 6, my + mH * 0.62);
        ctx.fillText(spec.slice(mid), sbX + 6, my + mH * 0.85);
      } else {
        ctx.fillText(spec, sbX + 6, my + mH * 0.72);
      }
    });
  }

  // ── Utilitare culori ───────────────────────────────────────────────────
  function _hexAlpha(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function _darken(hex, amount) {
    try {
      const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - Math.round(255 * amount));
      const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - Math.round(255 * amount));
      const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - Math.round(255 * amount));
      return `rgb(${r},${g},${b})`;
    } catch { return hex; }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 2. FLUX DE LUCRU — Butoane directe între AEDIS, Planșe, Viewer3D
  // ═══════════════════════════════════════════════════════════════════════

  function _injectWorkflowButtons() {
    _injectPlanseButtonInAEDIS();
    _injectViewerButtonInPlanse();
  }

  // ── Buton "📐 Planșe" în AEDIS ────────────────────────────────────────
  function _injectPlanseButtonInAEDIS() {
    const _try = () => {
      const aedisHeader = document.getElementById('aedis-header');
      if (!aedisHeader || document.getElementById('aedis-planse-btn')) return false;

      const btn = document.createElement('button');
      btn.id = 'aedis-planse-btn';
      btn.innerHTML = '📐 Planșe';
      btn.title = 'Generează planșele proiectului din volumul curent AEDIS';
      btn.style.cssText = `
        height:32px;padding:0 12px;border-radius:7px;
        border:1.5px solid rgba(212,175,55,.5);
        background:linear-gradient(135deg,rgba(212,175,55,.18),rgba(212,175,55,.08));
        color:#F5C518;cursor:pointer;font-size:11px;font-weight:800;
        font-family:'Space Grotesk',sans-serif;letter-spacing:.03em;
        flex-shrink:0;white-space:nowrap;margin-left:8px;
      `;

      btn.onclick = () => {
        // Snapshot config AEDIS la momentul generării
        const snapshot = {
          ts: Date.now(),
          stil: window.AEDIS?.stil,
          fn: window.AEDIS?.fn,
          tipAcoperis: window.AEDIS?.tipAcoperis,
          peretelCortina: window.AEDIS?.peretelCortina,
          cortinaProcent: window.AEDIS?.cortinaProcent,
          activeRetragere: window.AEDIS?.activeRetragere,
          parterDiferit: window.AEDIS?.parterDiferit,
        };
        window._AEDIS_SNAPSHOT = snapshot;

        // Deschidem planșele
        if (typeof generateRelevee === 'function') {
          generateRelevee();
          if (typeof ss === 'function') ss('📐 Planșe generate din volumul AEDIS curent');
        } else if (typeof openRelevee_safe === 'function') {
          openRelevee_safe();
          if (typeof _rvRender === 'function') _rvRender();
        } else {
          alert('Selectați o parcelă și generați volumul în AEDIS mai întâi.');
        }
      };

      // Inserăm în header AEDIS
      aedisHeader.style.display = 'flex';
      aedisHeader.style.alignItems = 'center';
      aedisHeader.style.gap = '8px';
      aedisHeader.appendChild(btn);

      return true;
    };

    if (_try()) return;
    const obs = new MutationObserver(() => { if (_try()) obs.disconnect(); });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 30000);
  }

  // ── Buton "🏠 Viewer 3D" în Planșe ────────────────────────────────────
  function _injectViewerButtonInPlanse() {
    const _try = () => {
      const topbar = document.querySelector('.rv-topbar');
      if (!topbar || document.getElementById('rv-viewer3d-btn')) return false;

      const btn = document.createElement('button');
      btn.id = 'rv-viewer3d-btn';
      btn.innerHTML = '🏠 Viewer 3D';
      btn.title = 'Deschide Viewer 3D — Dollhouse, Tur Foto, Gaussian Splat';
      btn.style.cssText = `
        height:32px;padding:0 12px;border-radius:7px;
        border:1px solid rgba(0,255,136,.3);
        background:rgba(0,255,136,.08);
        color:#00ff88;cursor:pointer;font-size:11px;font-weight:700;
        font-family:'Space Grotesk',sans-serif;letter-spacing:.03em;
        flex-shrink:0;white-space:nowrap;
      `;

      btn.onclick = () => {
        // Închidem planșele și deschidem viewer-ul
        if (typeof closeRelevee === 'function') closeRelevee();

        // Deschidem viewer-ul după 300ms (tranziție)
        setTimeout(() => {
          // Găsim butonul Viewer 3D / Urban3D din interfața principală
          const viewerBtn =
            document.getElementById('btnAEDIS') ||
            document.querySelector('[onclick*="_v3dOpen"]') ||
            document.querySelector('[onclick*="v3dOpen"]') ||
            document.querySelector('[title*="Viewer 3D"]') ||
            document.querySelector('[title*="Urban3D"]');

          if (viewerBtn) {
            viewerBtn.click();
          } else if (typeof _v3dOpen === 'function') {
            _v3dOpen();
          } else {
            if (typeof ss === 'function') ss('ℹ️ Apăsați butonul Urban3D din hartă pentru Viewer 3D');
          }
        }, 320);
      };

      // Inserăm înainte de butonul Închide
      const closeBtn = topbar.querySelector('.rv-close-btn');
      if (closeBtn) {
        topbar.insertBefore(btn, closeBtn);
      } else {
        topbar.appendChild(btn);
      }

      return true;
    };

    if (_try()) return;
    const obs = new MutationObserver(() => { if (_try()) obs.disconnect(); });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 30000);
  }

})();
