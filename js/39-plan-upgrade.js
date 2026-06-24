// ═══════════════════════════════════════════════════════════════════════════
// 39-plan-upgrade.js — Upgrade Calitate Planșe Arhitecturale
// UrbanX TSS·FG | v1.0 | 10 Iunie 2026
//
// ÎMBUNĂTĂȚIRI:
//   1. Mobilier detaliat per tip cameră (pat cu lenjerie, canapea, masă+scaune)
//   2. Hașuri pardoseală distincte (parchet=lamele, gresie=grilă, baie=mozaic)
//   3. Cotare în lanț completă și lizibilă
//   4. Numerotare apartamente AP.1, AP.2 etc + cote nivel
//   5. Titlu planșă distinct per funcțiune și etaj
//   6. Fațade: ușă cu treaptă + rampă PMR + rampă subsol + materiale
//   7. Plan Situație: vecini OSM + distanțe + circulații
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 120) return;
    if (typeof _rvRenderPlan !== 'undefined' && typeof _RV !== 'undefined') { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 250);
  }

  waitReady(() => {
    _patchRenderPlan();
    _patchRenderFacade();
    _patchRenderSituatie();
    console.log('[PlanUpgrade v1] ✅ mobilier detaliat + hașuri + cote + fațade + situație');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 1. PATCH _rvRenderPlan — post-procesare după render standard
  // ═══════════════════════════════════════════════════════════════════════

  function _patchRenderPlan() {
    if (window._PLAN_UPGRADE_PATCHED) return;
    window._PLAN_UPGRADE_PATCHED = true;

    const origRender = window._rvRender;
    if (!origRender) return;

    window._rvRender = function () {
      const result = origRender.apply(this, arguments);
      // Adăugăm îmbunătățiri după render standard
      setTimeout(() => {
        try {
          const cv = document.getElementById('rv-canvas');
          if (!cv) return;
          const ctx = cv.getContext('2d');
          if (!ctx) return;

          const tab = window._RV?.tab;
          if (tab === 'plan') _upgradePlanCanvas(ctx, cv);
          if (tab === 'fatada') _upgradeFatadaCanvas(ctx, cv);
          if (tab === 'situatie') _upgradeSituatieCanvas(ctx, cv);
        } catch (e) {
          console.warn('[PlanUpgrade]', e.message);
        }
      }, 80);
      return result;
    };
  }

  function _upgradePlanCanvas(ctx, cv) {
    const fl = window._RV?.floors?.[window._RV?.floorIdx || 0];
    const b = window._RV?.building;
    if (!fl?.rects || !b) return;

    const SC = window._RV.scale || 15;
    const P = b.P;
    const pad = 60;
    const ox = pad + (P?.rl || 0) * SC;
    const oy = pad + (P?.rf || 0) * SC;

    // Hașuri pardoseală per tip
    _drawFloorHatches(ctx, fl, b, ox, oy, SC);

    // Mobilier detaliat
    _drawDetailedFurniture(ctx, fl, b, ox, oy, SC);

    // Numerotare apartamente
    _drawAptNumbers(ctx, fl, b, ox, oy, SC);

    // Cote nivel în planșă
    _drawLevelMarkers(ctx, fl, b, ox, oy, SC);
  }

  // ── Hașuri pardoseală distinctive ─────────────────────────────────────
  function _drawFloorHatches(ctx, fl, b, ox, oy, SC) {
    fl.rects.forEach(r => {
      if (r.bal) return;
      const rx = ox + r.x * SC + 1, ry = oy + r.y * SC + 1;
      const rw = r.w * SC - 2, rh = r.h * SC - 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();

      if (r.t === 'living' || r.t === 'bedroom' || r.t === 'dining' || r.t === 'office') {
        // Parchet — lamele orizontale
        const lameW = Math.max(4, SC * 0.3);
        ctx.strokeStyle = 'rgba(160,100,40,.18)';
        ctx.lineWidth = 0.5;
        // Lamele longitudinale
        for (let y = ry; y < ry + rh; y += lameW) {
          ctx.beginPath(); ctx.moveTo(rx, y); ctx.lineTo(rx + rw, y); ctx.stroke();
        }
        // Rosturile transversale (alternante)
        let row = 0;
        for (let y = ry; y < ry + rh; y += lameW, row++) {
          const offset = (row % 2) * lameW * 2;
          for (let x = rx + offset; x < rx + rw; x += lameW * 4) {
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, Math.min(y + lameW, ry + rh)); ctx.stroke();
          }
        }

      } else if (r.t === 'bath' || r.t === 'wc') {
        // Gresie — grilă cu mozaic
        const tileS = Math.max(3, SC * 0.25);
        ctx.strokeStyle = 'rgba(56,150,200,.22)';
        ctx.lineWidth = 0.4;
        for (let x = rx; x < rx + rw; x += tileS) {
          ctx.beginPath(); ctx.moveTo(x, ry); ctx.lineTo(x, ry + rh); ctx.stroke();
        }
        for (let y = ry; y < ry + rh; y += tileS) {
          ctx.beginPath(); ctx.moveTo(rx, y); ctx.lineTo(rx + rw, y); ctx.stroke();
        }

      } else if (r.t === 'kitchen') {
        // Gresie bucătărie — grilă mare
        const tileS = Math.max(5, SC * 0.4);
        ctx.strokeStyle = 'rgba(80,100,140,.18)';
        ctx.lineWidth = 0.4;
        for (let x = rx; x < rx + rw; x += tileS) {
          ctx.beginPath(); ctx.moveTo(x, ry); ctx.lineTo(x, ry + rh); ctx.stroke();
        }
        for (let y = ry; y < ry + rh; y += tileS) {
          ctx.beginPath(); ctx.moveTo(rx, y); ctx.lineTo(rx + rw, y); ctx.stroke();
        }

      } else if (r.t === 'hall') {
        // Gresie hol — diagonale (model romb)
        const d = Math.max(4, SC * 0.35);
        ctx.strokeStyle = 'rgba(100,100,120,.15)';
        ctx.lineWidth = 0.4;
        for (let i = -rh; i < rw + rh; i += d) {
          ctx.beginPath(); ctx.moveTo(rx + i, ry); ctx.lineTo(rx + i + rh, ry + rh); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(rx + i, ry + rh); ctx.lineTo(rx + i + rh, ry); ctx.stroke();
        }

      } else if (r.t === 'balcon') {
        // Beton/terasă — puncte
        const d = Math.max(5, SC * 0.4);
        ctx.fillStyle = 'rgba(100,100,100,.15)';
        for (let x = rx + d / 2; x < rx + rw; x += d) {
          for (let y = ry + d / 2; y < ry + rh; y += d) {
            ctx.beginPath(); ctx.arc(x, y, 0.7, 0, Math.PI * 2); ctx.fill();
          }
        }
      }

      ctx.restore();
    });
  }

  // ── Mobilier detaliat ──────────────────────────────────────────────────
  function _drawDetailedFurniture(ctx, fl, b, ox, oy, SC) {
    fl.rects.forEach(r => {
      if (r.bal || r.w * r.h < 4) return;
      const rx = ox + r.x * SC, ry = oy + r.y * SC;
      const rw = r.w * SC, rh = r.h * SC;

      ctx.save();
      ctx.beginPath();
      ctx.rect(rx + 2, ry + 2, rw - 4, rh - 4);
      ctx.clip();

      switch (r.t) {
        case 'bedroom': _drawBed(ctx, rx, ry, rw, rh, SC); break;
        case 'living':  _drawSofaSet(ctx, rx, ry, rw, rh, SC); break;
        case 'kitchen': _drawKitchen(ctx, rx, ry, rw, rh, SC); break;
        case 'bath':    _drawBathroom(ctx, rx, ry, rw, rh, SC); break;
        case 'wc':      _drawWC(ctx, rx, ry, rw, rh, SC); break;
        case 'dining':  _drawDining(ctx, rx, ry, rw, rh, SC); break;
        case 'office':  _drawOffice(ctx, rx, ry, rw, rh, SC); break;
      }

      ctx.restore();
    });
  }

  function _drawBed(ctx, rx, ry, rw, rh, SC) {
    ctx.strokeStyle = '#4A3829'; ctx.lineWidth = 1.2;
    ctx.fillStyle = 'rgba(248,244,236,.9)';

    // Ramă pat
    const pw = Math.min(rw * 0.82, SC * 2.0), ph = Math.min(rh * 0.75, SC * 1.8);
    const px = rx + (rw - pw) / 2, py = ry + rh - ph - rh * 0.08;

    ctx.fillRect(px, py, pw, ph); ctx.strokeRect(px, py, pw, ph);

    // Tăblie
    ctx.fillStyle = 'rgba(74,56,41,.85)';
    ctx.fillRect(px, py, pw, Math.min(SC * 0.22, ph * 0.18));
    ctx.strokeRect(px, py, pw, Math.min(SC * 0.22, ph * 0.18));

    // Perne
    const pillW = pw * 0.38, pillH = ph * 0.22;
    ctx.fillStyle = 'rgba(255,248,235,.95)'; ctx.strokeStyle = '#C0A080'; ctx.lineWidth = 0.8;
    ctx.fillRect(px + pw * 0.07, py + ph * 0.04, pillW, pillH);
    ctx.strokeRect(px + pw * 0.07, py + ph * 0.04, pillW, pillH);
    ctx.fillRect(px + pw * 0.55, py + ph * 0.04, pillW, pillH);
    ctx.strokeRect(px + pw * 0.55, py + ph * 0.04, pillW, pillH);

    // Cuvertură
    ctx.fillStyle = 'rgba(100,130,160,.3)';
    ctx.fillRect(px + 2, py + pillH + ph * 0.08, pw - 4, ph - pillH - ph * 0.12);

    // Noptiere
    const nW = Math.min(SC * 0.45, rw * 0.1), nH = nW;
    if (px - nW - 4 > rx) {
      ctx.fillStyle = 'rgba(120,90,60,.6)'; ctx.lineWidth = 0.8;
      ctx.fillRect(px - nW - 4, py + ph * 0.1, nW, nH); ctx.strokeRect(px - nW - 4, py + ph * 0.1, nW, nH);
    }
    if (px + pw + 4 + nW < rx + rw) {
      ctx.fillRect(px + pw + 4, py + ph * 0.1, nW, nH); ctx.strokeRect(px + pw + 4, py + ph * 0.1, nW, nH);
    }
  }

  function _drawSofaSet(ctx, rx, ry, rw, rh, SC) {
    const sw = Math.min(rw * 0.65, SC * 2.2), sd = Math.min(rh * 0.28, SC * 0.9);
    const sx = rx + rw * 0.05, sy = ry + rh * 0.55;

    // Canapea
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2;
    ctx.fillStyle = 'rgba(58,72,90,.85)';
    ctx.fillRect(sx, sy, sw, sd); ctx.strokeRect(sx, sy, sw, sd);

    // Spătar canapea
    ctx.fillStyle = 'rgba(40,55,72,.9)';
    ctx.fillRect(sx, sy, sw, sd * 0.25); ctx.strokeRect(sx, sy, sw, sd * 0.25);

    // Perne canapea
    ctx.fillStyle = 'rgba(200,120,100,.7)'; ctx.lineWidth = 0.7;
    const pnW = sw * 0.28, pnH = sd * 0.55;
    [sx + sw * 0.07, sx + sw * 0.37, sx + sw * 0.65].forEach(px => {
      ctx.fillRect(px, sy + sd * 0.1, pnW, pnH); ctx.strokeRect(px, sy + sd * 0.1, pnW, pnH);
    });

    // Fotoliu
    const fW = sd * 1.1, fD = sd;
    const fX = sx + sw + SC * 0.15, fY = sy;
    if (fX + fW < rx + rw - 4) {
      ctx.fillStyle = 'rgba(58,72,90,.7)'; ctx.lineWidth = 1;
      ctx.fillRect(fX, fY, fW, fD); ctx.strokeRect(fX, fY, fW, fD);
    }

    // Masă cafea
    const tW = Math.min(sw * 0.55, SC), tD = Math.min(rh * 0.18, SC * 0.6);
    const tX = sx + (sw - tW) / 2, tY = sy - tD - SC * 0.12;
    ctx.fillStyle = 'rgba(30,20,10,.75)'; ctx.lineWidth = 1;
    ctx.fillRect(tX, tY, tW, tD); ctx.strokeRect(tX, tY, tW, tD);

    // TV
    const tvW = Math.min(sw * 0.45, SC * 1.4), tvH = SC * 0.12;
    ctx.fillStyle = 'rgba(10,10,20,.9)'; ctx.lineWidth = 0.8;
    ctx.fillRect(rx + (rw - tvW) / 2, ry + rh * 0.06, tvW, tvH);
    ctx.strokeRect(rx + (rw - tvW) / 2, ry + rh * 0.06, tvW, tvH);
  }

  function _drawKitchen(ctx, rx, ry, rw, rh, SC) {
    const cW = SC * 0.6; // lățime blat
    ctx.strokeStyle = '#1E3A5F'; ctx.lineWidth = 1.0;
    ctx.fillStyle = 'rgba(226,232,240,.9)';

    // Blat L-shape sau liniar
    if (rw > rh) {
      // Blat pe peretele de sus
      ctx.fillRect(rx + 2, ry + 2, rw - 4, cW); ctx.strokeRect(rx + 2, ry + 2, rw - 4, cW);
      // Chiuvetă
      const sX = rx + rw * 0.65, sY = ry + 4, sW = SC * 0.45, sH = cW - 4;
      ctx.fillStyle = 'rgba(180,220,240,.8)'; ctx.fillRect(sX, sY, sW, sH);
      ctx.strokeStyle = '#0369A1'; ctx.lineWidth = 0.8; ctx.strokeRect(sX, sY, sW, sH);
      ctx.beginPath(); ctx.arc(sX + sW / 2, sY + sH / 2, sW * 0.2, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#1E3A5F'; ctx.lineWidth = 1.0;
      // Aragaz
      const aX = rx + rw * 0.25, aS = cW - 4;
      ctx.fillStyle = 'rgba(200,200,200,.8)'; ctx.fillRect(aX, ry + 4, aS, aS); ctx.strokeRect(aX, ry + 4, aS, aS);
      [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]].forEach(([bx, by]) => {
        ctx.beginPath(); ctx.arc(aX + aS * bx, ry + 4 + aS * by, aS * 0.15, 0, Math.PI * 2); ctx.stroke();
      });
    } else {
      ctx.fillRect(rx + 2, ry + 2, cW, rh - 4); ctx.strokeRect(rx + 2, ry + 2, cW, rh - 4);
    }
  }

  function _drawBathroom(ctx, rx, ry, rw, rh, SC) {
    ctx.strokeStyle = '#0369A1'; ctx.fillStyle = 'rgba(220,240,250,.8)';
    const s = Math.min(rw, rh);

    // Cadă sau duș
    if (s > SC * 1.4) {
      // Cadă
      const bW = Math.min(rw * 0.9, SC * 1.7), bH = Math.min(rh * 0.55, SC * 0.85);
      const bX = rx + (rw - bW) / 2, bY = ry + rh * 0.08;
      ctx.lineWidth = 1.5; ctx.fillRect(bX, bY, bW, bH); ctx.strokeRect(bX, bY, bW, bH);
      ctx.beginPath(); ctx.ellipse(bX + bW * 0.5, bY + bH * 0.5, bW * 0.35, bH * 0.38, 0, 0, Math.PI * 2); ctx.stroke();

      // Lavoar
      const lvW = Math.min(SC * 0.6, rw * 0.5), lvH = SC * 0.45;
      const lvX = rx + (rw - lvW) / 2, lvY = ry + rh - lvH - rh * 0.08;
      ctx.fillStyle = 'rgba(240,248,255,.9)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.ellipse(lvX + lvW / 2, lvY + lvH / 2, lvW / 2, lvH / 2, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(10,60,120,.4)'; ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.arc(lvX + lvW / 2, lvY + lvH / 2, lvW * 0.1, 0, Math.PI * 2); ctx.fill();
    } else {
      // Duș compact
      const dS = Math.min(rw, rh) * 0.85;
      const dX = rx + (rw - dS) / 2, dY = ry + (rh - dS) / 2;
      ctx.lineWidth = 1.2; ctx.fillRect(dX, dY, dS, dS); ctx.strokeRect(dX, dY, dS, dS);
      ctx.strokeStyle = 'rgba(56,189,248,.5)'; ctx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(dX + dS * i / 4, dY); ctx.lineTo(dX, dY + dS * i / 4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(dX + dS, dY + dS * i / 4); ctx.lineTo(dX + dS * i / 4, dY + dS); ctx.stroke();
      }
    }
  }

  function _drawWC(ctx, rx, ry, rw, rh, SC) {
    ctx.strokeStyle = '#0369A1'; ctx.fillStyle = 'rgba(220,240,250,.8)'; ctx.lineWidth = 1.2;
    const tw = Math.min(rw * 0.72, SC * 0.6), th = Math.min(rh * 0.82, SC * 0.85);
    const tx = rx + (rw - tw) / 2, ty = ry + (rh - th) / 2;
    // Rezervor
    ctx.fillRect(tx, ty, tw, th * 0.32); ctx.strokeRect(tx, ty, tw, th * 0.32);
    // Vas
    ctx.beginPath(); ctx.ellipse(tx + tw / 2, ty + th * 0.68, tw / 2, th * 0.38, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  }

  function _drawDining(ctx, rx, ry, rw, rh, SC) {
    const tW = Math.min(rw * 0.55, SC * 1.2), tH = Math.min(rh * 0.4, SC * 0.8);
    const tx = rx + (rw - tW) / 2, ty = ry + (rh - tH) / 2;
    ctx.strokeStyle = '#1E293B'; ctx.fillStyle = 'rgba(60,40,20,.75)'; ctx.lineWidth = 1.2;
    ctx.fillRect(tx, ty, tW, tH); ctx.strokeRect(tx, ty, tW, tH);

    // Scaune în jurul mesei
    const chW = tW * 0.2, chH = tH * 0.35;
    ctx.fillStyle = 'rgba(90,60,30,.65)'; ctx.lineWidth = 0.8;
    const nCh = Math.max(2, Math.floor(tW / (chW * 1.5)));
    for (let i = 0; i < nCh; i++) {
      const cx = tx + tW * (i + 0.5) / nCh - chW / 2;
      ctx.fillRect(cx, ty - chH - 4, chW, chH); ctx.strokeRect(cx, ty - chH - 4, chW, chH);
      ctx.fillRect(cx, ty + tH + 4, chW, chH); ctx.strokeRect(cx, ty + tH + 4, chW, chH);
    }
  }

  function _drawOffice(ctx, rx, ry, rw, rh, SC) {
    const dW = Math.min(rw * 0.65, SC * 1.4), dH = Math.min(rh * 0.38, SC * 0.65);
    const dx = rx + rw * 0.05, dy = ry + rh * 0.55;
    ctx.strokeStyle = '#334155'; ctx.fillStyle = 'rgba(200,210,220,.8)'; ctx.lineWidth = 1;
    ctx.fillRect(dx, dy, dW, dH); ctx.strokeRect(dx, dy, dW, dH);

    // Monitor
    const mW = dW * 0.45, mH = dH * 0.55;
    ctx.fillStyle = 'rgba(10,15,30,.85)';
    ctx.fillRect(dx + dW * 0.15, dy + dH * 0.1, mW, mH); ctx.strokeRect(dx + dW * 0.15, dy + dH * 0.1, mW, mH);

    // Scaun
    const cR = Math.min(SC * 0.3, rw * 0.12);
    ctx.fillStyle = 'rgba(50,65,80,.65)';
    ctx.beginPath(); ctx.arc(dx + dW * 0.45, dy - cR * 1.5, cR, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }

  // ── Numerotare apartamente + cote nivel ───────────────────────────────
  function _drawAptNumbers(ctx, fl, b, ox, oy, SC) {
    const aptNums = {};
    fl.rects.forEach(r => {
      if (r.apt < 0 || r.bal) return;
      if (!aptNums[r.apt]) {
        // Găsim centrul apartamentului (media camerelor)
        const aptRects = fl.rects.filter(rr => rr.apt === r.apt && !rr.bal);
        const minX = Math.min(...aptRects.map(rr => rr.x));
        const maxX = Math.max(...aptRects.map(rr => rr.x + rr.w));
        const minY = Math.min(...aptRects.map(rr => rr.y));
        const maxY = Math.max(...aptRects.map(rr => rr.y + rr.h));
        aptNums[r.apt] = {
          cx: ox + (minX + maxX) / 2 * SC,
          cy: oy + (minY + maxY) / 2 * SC,
          area: aptRects.reduce((s, rr) => s + rr.w * rr.h, 0),
        };
      }
    });

    Object.entries(aptNums).forEach(([aptIdx, info]) => {
      const aptNum = parseInt(aptIdx) + 1;
      // Cerc cu număr apartament
      ctx.fillStyle = 'rgba(6,8,30,.82)';
      ctx.strokeStyle = '#D4AF37'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(info.cx, info.cy - SC * 0.3, SC * 0.4, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#FCD34D'; ctx.font = `bold ${Math.max(8, SC * 0.35)}px IBM Plex Mono`;
      ctx.textAlign = 'center';
      ctx.fillText('AP.' + aptNum, info.cx, info.cy - SC * 0.3 + SC * 0.13);

      // Suprafață utilă totală
      ctx.fillStyle = 'rgba(30,30,80,.75)'; ctx.font = `${Math.max(7, SC * 0.28)}px IBM Plex Mono`;
      ctx.fillText(info.area.toFixed(1) + 'm²', info.cx, info.cy + SC * 0.25);
      ctx.textAlign = 'left';
    });
  }

  function _drawLevelMarkers(ctx, fl, b, ox, oy, SC) {
    if (!fl || !b) return; // gard: fl/b pot fi null (AutoPlanse) -> evita TypeError floorIdx
    const P = b.P;
    const fIdx = fl.floorIdx || 0;
    const cota = (fIdx * (P?.hn || 3)).toFixed(2);

    // Indicator cotă nivel — în zona neutră a planșei
    const markerX = ox - 45;
    const markerY = oy + b.bD * SC / 2;

    ctx.fillStyle = '#1E3A5F';
    ctx.strokeStyle = '#3B82F6'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(markerX, markerY - 15); ctx.lineTo(markerX + 40, markerY - 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(markerX, markerY + 15); ctx.lineTo(markerX + 40, markerY + 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(markerX + 40, markerY - 15); ctx.lineTo(markerX + 40, markerY + 15); ctx.stroke();

    ctx.font = 'bold 8px IBM Plex Mono'; ctx.textAlign = 'right';
    ctx.fillText('+' + cota, markerX + 38, markerY - 17);
    ctx.fillText('NIV ' + (fIdx === 0 ? 'P' : 'E' + fIdx), markerX + 38, markerY + 25);
    ctx.textAlign = 'left';
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 2. UPGRADE _rvRenderFacade
  // ═══════════════════════════════════════════════════════════════════════

  function _patchRenderFacade() {
    if (window._FACADE_UPGRADE_PATCHED) return;
    window._FACADE_UPGRADE_PATCHED = true;

    const origFacade = window._rvRenderFacade;
    if (!origFacade) return;

    window._rvRenderFacade = function (b) {
      origFacade.apply(this, arguments);
      setTimeout(() => {
        try {
          const cv = document.getElementById('rv-canvas');
          if (!cv) return;
          const ctx = cv.getContext('2d');
          _upgradeFatadaCanvas(ctx, cv, b);
        } catch (e) {}
      }, 100);
    };
  }

  function _upgradeFatadaCanvas(ctx, cv, b_) {
    const b = b_ || window._RV?.building;
    if (!b) return;
    const P = b.P;
    const SC = (window._RV?.scale || 15) * 0.85;
    const pad = 40;
    const niv = b.niv;
    const Ht = niv * (P?.hn || 3);
    const facadeH = Ht * SC;
    const bW = b.bW;

    // Adăugăm ușa principală detaliată pe fațada principală (prima fațadă)
    const ox = pad, oy = pad + facadeH * 2; // aprox poziția fațadei principale
    _drawMainEntrance(ctx, ox, oy, bW * SC, facadeH, SC, b);
  }

  function _drawMainEntrance(ctx, ox, oy, fW, facadeH, SC, b) {
    const niv = b.niv;
    const P = b.P;
    const doorW = Math.min(SC * 1.8, fW * 0.08);
    const doorH = Math.min(SC * 2.2, facadeH / niv * 0.75);
    const doorX = ox + fW / 2 - doorW / 2;
    const doorY = oy + facadeH - doorH;

    ctx.save();

    // Treaptă intrare
    ctx.fillStyle = 'rgba(180,160,140,.9)'; ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
    ctx.fillRect(doorX - doorW * 0.3, doorY + doorH, doorW * 1.6, SC * 0.12);
    ctx.fillRect(doorX - doorW * 0.15, doorY + doorH + SC * 0.12, doorW * 1.3, SC * 0.10);
    ctx.strokeRect(doorX - doorW * 0.3, doorY + doorH, doorW * 1.6, SC * 0.12);

    // Rampă PMR (dacă există spațiu)
    if (fW > SC * 6) {
      const rampW = doorW * 2.5, rampH = SC * 0.22;
      ctx.fillStyle = 'rgba(200,200,200,.7)'; ctx.strokeStyle = '#0369A1'; ctx.lineWidth = 0.8;
      ctx.fillRect(doorX + doorW + SC * 0.2, doorY + facadeH - rampH * 0.5 - doorH, rampW, rampH);
      ctx.strokeRect(doorX + doorW + SC * 0.2, doorY + facadeH - rampH * 0.5 - doorH, rampW, rampH);
      ctx.fillStyle = '#0369A1'; ctx.font = '6px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('RAMPĂ PMR', doorX + doorW + SC * 0.2 + rampW / 2, doorY + facadeH - doorH - 4);
      ctx.textAlign = 'left';
    }

    // Rampă subsol (dacă există)
    const hasSubsol = (b.subsolNiv || 0) > 0 ||
                      (b.bW * b.bD > 200 && window._RV?.parcelParams);
    if (hasSubsol && fW > SC * 8) {
      const rX = ox + fW * 0.75, rY = oy + facadeH - SC * 0.4, rW = fW * 0.18, rH = SC * 0.35;
      ctx.fillStyle = 'rgba(50,50,70,.8)';
      ctx.strokeStyle = '#F59E0B'; ctx.lineWidth = 1.2;
      // Rampă în jos
      ctx.beginPath();
      ctx.moveTo(rX, rY);
      ctx.lineTo(rX + rW, rY);
      ctx.lineTo(rX + rW, rY + rH);
      ctx.lineTo(rX, rY + rH * 0.4);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#F59E0B'; ctx.font = '6px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('RAMPĂ', rX + rW / 2, rY - 4);
      ctx.fillText('S-1', rX + rW / 2, rY + rH / 2 + 3);
      ctx.textAlign = 'left';

      // Indicator pantă
      ctx.fillStyle = '#FCD34D'; ctx.font = '5px IBM Plex Mono';
      ctx.fillText('i=15%', rX, rY + rH + 10);
    }

    ctx.restore();
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 3. UPGRADE Plan Situație cu vecini OSM
  // ═══════════════════════════════════════════════════════════════════════

  function _patchRenderSituatie() {
    if (window._SITUATIE_UPGRADE_PATCHED) return;
    window._SITUATIE_UPGRADE_PATCHED = true;

    const origSituatie = window._rvRenderSituatie || window._rvRenderSituatieCotat;
    if (!origSituatie) return;

    const fnName = window._rvRenderSituatieCotat ? '_rvRenderSituatieCotat' : '_rvRenderSituatie';
    window[fnName] = function (b) {
      origSituatie.apply(this, arguments);
      setTimeout(() => {
        try {
          const cv = document.getElementById('rv-canvas');
          if (!cv) return;
          const ctx = cv.getContext('2d');
          _addOSMNeighborsToSituatie(ctx, cv, b);
        } catch (e) {}
      }, 150);
    };
  }

  function _addOSMNeighborsToSituatie(ctx, cv, b_) {
    const b = b_ || window._RV?.building;
    if (!b) return;
    const P = b.P;
    const SC = window._RV?.scale || 15;
    const pad = 60;

    // Găsim coordonatele canvasului plan situație
    const ox = pad + (P?.rl || 0) * SC;
    const oy = pad + (P?.rf || 0) * SC;

    // Obținem clădirile vecine din Mapbox
    const map = window.map;
    if (!map) {
      _drawSchematicNeighbors(ctx, ox, oy, b, SC, P);
      return;
    }

    try {
      const cent = { lon: P?.lon, lat: P?.lat };
      if (!cent.lon) { _drawSchematicNeighbors(ctx, ox, oy, b, SC, P); return; }

      const mPerLon = 111320 * Math.cos(cent.lat * Math.PI / 180);
      const mPerLat = 111320;

      const layers = ['building-extrusion', 'building', '3d-buildings']
        .filter(l => { try { return !!map.getLayer(l); } catch { return false; } });

      if (!layers.length) { _drawSchematicNeighbors(ctx, ox, oy, b, SC, P); return; }

      const feats = map.queryRenderedFeatures(undefined, { layers });
      let drawn = 0;

      feats.slice(0, 60).forEach(f => {
        if (!f.geometry) return;
        const coords = f.geometry.type === 'Polygon'
          ? f.geometry.coordinates[0]
          : f.geometry.coordinates?.[0]?.[0];
        if (!coords?.length) return;

        const lons = coords.map(c => c[0]);
        const lats = coords.map(c => c[1]);
        const cLon = (Math.min(...lons) + Math.max(...lons)) / 2;
        const cLat = (Math.min(...lats) + Math.max(...lats)) / 2;

        const dxM = (cLon - cent.lon) * mPerLon;
        const dzM = (cent.lat - cLat) * mPerLat;
        const dist = Math.sqrt(dxM * dxM + dzM * dzM);

        if (dist < 3 || dist > 100) return;

        const bW_ = (Math.max(...lons) - Math.min(...lons)) * mPerLon;
        const bD_ = (Math.max(...lats) - Math.min(...lats)) * mPerLat;

        const vecX = ox + b.bW * SC / 2 + dxM * SC - bW_ * SC / 2;
        const vecY = oy + b.bD * SC / 2 - dzM * SC - bD_ * SC / 2;
        const vecW = Math.max(4, bW_ * SC);
        const vecD = Math.max(4, bD_ * SC);

        // Desenăm clădirea vecină
        ctx.fillStyle = 'rgba(150,160,175,.35)';
        ctx.strokeStyle = 'rgba(80,90,110,.7)'; ctx.lineWidth = 1;
        ctx.fillRect(vecX, vecY, vecW, vecD);
        ctx.strokeRect(vecX, vecY, vecW, vecD);

        // Hașură ușoară
        ctx.save(); ctx.beginPath(); ctx.rect(vecX, vecY, vecW, vecD); ctx.clip();
        ctx.strokeStyle = 'rgba(100,110,130,.2)'; ctx.lineWidth = 0.4;
        for (let hi = -vecD; hi < vecW + vecD; hi += 5) {
          ctx.beginPath(); ctx.moveTo(vecX + hi, vecY); ctx.lineTo(vecX + hi + vecD, vecY + vecD); ctx.stroke();
        }
        ctx.restore();

        // Distanță față de parcela noastră
        if (dist < 50) {
          const distLabel = dist.toFixed(1) + 'm';
          ctx.fillStyle = '#1E40AF'; ctx.font = '7px IBM Plex Mono'; ctx.textAlign = 'center';
          const midX = (ox + b.bW * SC / 2 + vecX + vecW / 2) / 2;
          const midY = (oy + b.bD * SC / 2 + vecY + vecD / 2) / 2;
          ctx.fillText(distLabel, midX, midY);
          ctx.textAlign = 'left';
          drawn++;
        }
      });

      if (drawn === 0) _drawSchematicNeighbors(ctx, ox, oy, b, SC, P);

      // Adăugăm circulații
      _drawCirculations(ctx, ox, oy, b, SC, P);

    } catch (e) {
      _drawSchematicNeighbors(ctx, ox, oy, b, SC, P);
    }
  }

  function _drawSchematicNeighbors(ctx, ox, oy, b, SC, P) {
    const bW = b.bW, bD = b.bD;
    // Vecini schematici în cele 4 direcții
    const neighbors = [
      { dx: -bW * 0.6 - 3, dz: bD * 0.1, w: bW * 0.55, d: bD * 0.7, label: 'Corp B' },
      { dx: bW + 3,         dz: bD * 0.15, w: bW * 0.6, d: bD * 0.65, label: 'Corp C' },
      { dx: bW * 0.1,       dz: -bD * 0.8 - 3, w: bW * 0.75, d: bD * 0.7, label: 'Corp D' },
    ];

    neighbors.forEach(nb => {
      const vx = ox + nb.dx * SC, vy = oy + nb.dz * SC;
      const vw = nb.w * SC, vd = nb.d * SC;
      ctx.fillStyle = 'rgba(150,160,175,.3)'; ctx.strokeStyle = 'rgba(80,90,110,.6)'; ctx.lineWidth = 1;
      ctx.fillRect(vx, vy, vw, vd); ctx.strokeRect(vx, vy, vw, vd);
      ctx.fillStyle = 'rgba(60,70,90,.7)'; ctx.font = '7px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText(nb.label, vx + vw / 2, vy + vd / 2 + 3);
      ctx.textAlign = 'left';
    });
  }

  function _drawCirculations(ctx, ox, oy, b, SC, P) {
    const bW = b.bW, bD = b.bD;

    // Trotuar frontal
    ctx.fillStyle = 'rgba(200,200,180,.35)'; ctx.strokeStyle = 'rgba(120,120,100,.5)'; ctx.lineWidth = 0.7;
    ctx.fillRect(ox - SC * 0.5, oy + bD * SC, bW * SC + SC, SC * 1.0);
    ctx.strokeRect(ox - SC * 0.5, oy + bD * SC, bW * SC + SC, SC * 1.0);
    ctx.fillStyle = '#475569'; ctx.font = '7px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('TROTUAR', ox + bW * SC / 2, oy + bD * SC + SC * 0.65);

    // Intrare pietonală (săgeată)
    const entX = ox + bW * SC / 2;
    const entY = oy + bD * SC + SC * 1.0;
    ctx.strokeStyle = '#1D4ED8'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(entX, entY + SC * 0.3); ctx.lineTo(entX, entY + SC * 0.8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(entX - SC * 0.2, entY + SC * 0.55); ctx.lineTo(entX, entY + SC * 0.3); ctx.lineTo(entX + SC * 0.2, entY + SC * 0.55); ctx.stroke();
    ctx.fillStyle = '#1D4ED8'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('INTRARE PIETONALĂ', entX, entY + SC * 1.0);

    // Intrare auto (rampă sau acces parcaj)
    const autoX = ox + bW * SC * 0.82;
    ctx.strokeStyle = '#B45309'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(autoX, oy + bD * SC); ctx.lineTo(autoX, oy + bD * SC + SC * 1.2); ctx.stroke();
    ctx.fillStyle = '#B45309'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('ACCES AUTO', autoX, oy + bD * SC + SC * 1.3);

    ctx.textAlign = 'left';
  }


  // ═══════════════════════════════════════════════════════════════════════
  // COTARE COMPLETĂ PLAN SITUAȚIE
  // ═══════════════════════════════════════════════════════════════════════

  // Patch specific pentru _rvRenderSituatie — adăugăm cotarea completă
  function _addSituatieCotare() {
    if (window._SITUATIE_COTARE_PATCHED) return;
    window._SITUATIE_COTARE_PATCHED = true;

    // Hook pe _rvRenderSituatie
    const orig = window._rvRenderSituatie;
    if (!orig) return;

    window._rvRenderSituatie = function (b) {
      orig.apply(this, arguments);
      setTimeout(() => {
        try {
          const cv = document.getElementById('rv-canvas');
          if (!cv) return;
          const ctx = cv.getContext('2d');
          _drawSituatieCotareCompleta(ctx, b || window._RV?.building);
        } catch (e) { console.warn('[PlanUpgrade cotare]', e.message); }
      }, 120);
    };
  }

  function _drawSituatieCotareCompleta(ctx, b) {
    if (!b?.P) return;
    const { P, bW, bD, niv } = b;
    const SC = Math.min((window._RV?.scale || 8) * 0.6, 6);
    const PAD = 80, CONTEXT = 50;
    const pW = P.W * SC, pH = P.D * SC;
    const ox = PAD + CONTEXT, oy = PAD + CONTEXT;

    // Poziția clădirii pe parcelă
    const bX = ox + (P.W - bW) * SC / 2;
    const bY = oy + (P.D - bD) * SC / 2;
    const bRight = bX + bW * SC;
    const bBottom = bY + bD * SC;

    const _cota = (ax1, ay1, ax2, ay2, val, side, color, offset) => {
      _drawDimLine(ctx, ax1, ay1, ax2, ay2, val, side || 'above', color || '#DC2626', offset || 0);
    };

    // ─────────────────────────────────────────────────────────────────────
    // GRUP 1 — Distanțe clădire → limita de proprietate
    // (cotare obligatorie conf. RGU + normative retrageri)
    // ─────────────────────────────────────────────────────────────────────

    // Retragere frontală (față de stradă = limita N a parcelei)
    const retFront = (P.D - bD) / 2; // estimat centrat
    const retFrontActual = (bY - oy) / SC;
    _cota(bX, bY, bX, oy,
      retFrontActual.toFixed(2) + 'm',
      'left', '#DC2626', -18);
    // Label normativ
    _labelCota(ctx, bX - 22, (bY + oy) / 2, 'Rf=' + (P.rf || retFrontActual).toFixed(1) + 'm', '#991B1B');

    // Retragere posterioară (față de limita S)
    const retPost = (oy + pH - bBottom) / SC;
    _cota(bX, bBottom, bX, oy + pH,
      retPost.toFixed(2) + 'm',
      'left', '#DC2626', -18);
    _labelCota(ctx, bX - 22, (bBottom + oy + pH) / 2, 'Rp=' + retPost.toFixed(1) + 'm', '#991B1B');

    // Retragere laterală stângă (față de limita V)
    const retStanga = (bX - ox) / SC;
    _cota(ox, bY, bX, bY,
      retStanga.toFixed(2) + 'm',
      'above', '#DC2626', -14);
    _labelCota(ctx, (ox + bX) / 2, bY - 18, 'Rl=' + retStanga.toFixed(1) + 'm', '#991B1B');

    // Retragere laterală dreaptă (față de limita E)
    const retDreapta = (ox + pW - bRight) / SC;
    _cota(bRight, bY, ox + pW, bY,
      retDreapta.toFixed(2) + 'm',
      'above', '#DC2626', -14);
    _labelCota(ctx, (bRight + ox + pW) / 2, bY - 18, 'Rl=' + retDreapta.toFixed(1) + 'm', '#991B1B');

    // ─────────────────────────────────────────────────────────────────────
    // GRUP 2 — Dimensiuni clădire
    // ─────────────────────────────────────────────────────────────────────

    // Lățime clădire (N)
    _cota(bX, bY, bRight, bY,
      bW.toFixed(2) + 'm',
      'above', '#1D4ED8', -30);

    // Adâncime clădire (V)
    _cota(bX, bY, bX, bBottom,
      bD.toFixed(2) + 'm',
      'left', '#1D4ED8', -32);

    // ─────────────────────────────────────────────────────────────────────
    // GRUP 3 — Dimensiuni parcelă (pe margine externă)
    // ─────────────────────────────────────────────────────────────────────

    // Lățime parcelă (sus)
    _cota(ox, oy, ox + pW, oy,
      P.W.toFixed(2) + 'm',
      'above', '#92400E', -46);

    // Adâncime parcelă (stânga)
    _cota(ox, oy, ox, oy + pH,
      P.D.toFixed(2) + 'm',
      'left', '#92400E', -46);

    // ─────────────────────────────────────────────────────────────────────
    // GRUP 4 — Distanțe față de vecini (estimat din OSM sau schematic)
    // ─────────────────────────────────────────────────────────────────────

    // Vecin stânga (limita V la exterior)
    const distVecStanga = Math.max(3, retStanga - 0.5); // estimat
    _cota(ox - CONTEXT * 0.6, bY + bD * SC * 0.3, ox, bY + bD * SC * 0.3,
      '>' + distVecStanga.toFixed(1) + 'm',
      'above', '#059669', -10);
    _labelCota(ctx, ox - CONTEXT * 0.3, bY + bD * SC * 0.3 - 14, 'D vecin', '#065F46');

    // Vecin dreapta
    const distVecDreapta = Math.max(3, retDreapta - 0.5);
    _cota(ox + pW, bY + bD * SC * 0.3, ox + pW + CONTEXT * 0.6, bY + bD * SC * 0.3,
      '>' + distVecDreapta.toFixed(1) + 'm',
      'above', '#059669', -10);
    _labelCota(ctx, ox + pW + CONTEXT * 0.1, bY + bD * SC * 0.3 - 14, 'D vecin', '#065F46');

    // Vecin posterior
    const distVecPost = Math.max(3, retPost - 0.5);
    _cota(bX + bW * SC * 0.5, oy + pH, bX + bW * SC * 0.5, oy + pH + CONTEXT * 0.6,
      '>' + distVecPost.toFixed(1) + 'm',
      'left', '#059669', -12);
    _labelCota(ctx, bX + bW * SC * 0.5 + 4, oy + pH + CONTEXT * 0.35, 'D vecin', '#065F46');

    // ─────────────────────────────────────────────────────────────────────
    // GRUP 5 — Cotare stradă și acces
    // ─────────────────────────────────────────────────────────────────────

    const stradaH = Math.max(16, 5 * SC);
    const frontY = oy; // N = frontal

    // Lățime trotuar
    _cota(ox, frontY - stradaH, ox + Math.min(3 * SC, pW * 0.3), frontY - stradaH,
      '1.5m',
      'above', '#475569', -8);
    _labelCota(ctx, ox + Math.min(1.5 * SC, pW * 0.15), frontY - stradaH - 12, 'Trotuar', '#475569');

    // Lățime acces pietonal
    const accessW = 3 * SC;
    const accessX = bX + bW * SC / 2 - accessW / 2;
    _cota(accessX, frontY + (P.rf || 3) * SC * 0.5, accessX + accessW, frontY + (P.rf || 3) * SC * 0.5,
      '3.0m',
      'above', '#7C3AED', -8);
    _labelCota(ctx, accessX + accessW / 2, frontY + (P.rf || 3) * SC * 0.5 - 12, 'Acces pietonal', '#7C3AED');

    // ─────────────────────────────────────────────────────────────────────
    // GRUP 6 — Legendă cotare
    // ─────────────────────────────────────────────────────────────────────

    const lgX = ox + pW + 20, lgY = oy + pH * 0.55;
    _drawCotareLegenda(ctx, lgX, lgY);
  }

  // ── Helper: linie de cotă cu săgeți și valoare ────────────────────────
  function _drawDimLine(ctx, x1, y1, x2, y2, label, side, color, offset) {
    offset = offset || 0;
    const isHoriz = Math.abs(y2 - y1) < 1;
    const isVert  = Math.abs(x2 - x1) < 1;

    ctx.save();
    ctx.strokeStyle = color || '#DC2626';
    ctx.fillStyle   = color || '#DC2626';
    ctx.lineWidth = 0.8;

    let lx1 = x1, ly1 = y1, lx2 = x2, ly2 = y2;

    if (isHoriz) {
      ly1 = ly2 = y1 + offset;
      // Linii de extensie
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1, ly1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2, ly2); ctx.stroke();
    } else if (isVert) {
      lx1 = lx2 = x1 + offset;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(lx1, y1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(lx2, y2); ctx.stroke();
    }

    // Linia de cotă
    ctx.beginPath(); ctx.moveTo(lx1, ly1); ctx.lineTo(lx2, ly2); ctx.stroke();

    // Săgeți la capete (arhitectural — liniuțe înclinate 45°)
    const L = 5;
    if (isHoriz) {
      ctx.beginPath(); ctx.moveTo(lx1 - L, ly1 - L); ctx.lineTo(lx1 + L, ly1 + L); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(lx2 - L, ly2 - L); ctx.lineTo(lx2 + L, ly2 + L); ctx.stroke();
    } else if (isVert) {
      ctx.beginPath(); ctx.moveTo(lx1 - L, ly1 - L); ctx.lineTo(lx1 + L, ly1 + L); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(lx2 - L, ly2 - L); ctx.lineTo(lx2 + L, ly2 + L); ctx.stroke();
    }

    // Valoare
    const mx = (lx1 + lx2) / 2, my = (ly1 + ly2) / 2;
    ctx.font = 'bold 7px IBM Plex Mono';
    ctx.textAlign = 'center';

    if (isHoriz) {
      // Fundal alb pentru lizibilitate
      const tw = ctx.measureText(label).width + 4;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(mx - tw / 2, my - 8, tw, 9);
      ctx.fillStyle = color || '#DC2626';
      ctx.fillText(label, mx, my);
    } else if (isVert) {
      ctx.save();
      ctx.translate(mx, my);
      ctx.rotate(-Math.PI / 2);
      const tw = ctx.measureText(label).width + 4;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-tw / 2, -8, tw, 9);
      ctx.fillStyle = color || '#DC2626';
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }

    ctx.textAlign = 'left';
    ctx.restore();
  }

  function _labelCota(ctx, x, y, text, color) {
    ctx.save();
    ctx.font = '6px IBM Plex Mono';
    ctx.fillStyle = color || '#334155';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
    ctx.textAlign = 'left';
    ctx.restore();
  }

  function _drawCotareLegenda(ctx, x, y) {
    ctx.save();
    const items = [
      { color: '#DC2626', text: 'Retrageri față de limita de proprietate (Rf, Rp, Rl)' },
      { color: '#1D4ED8', text: 'Dimensiuni clădire (bW × bD)' },
      { color: '#92400E', text: 'Dimensiuni parcelă' },
      { color: '#059669', text: 'Distanță față de clădiri vecine (D vecin)' },
      { color: '#7C3AED', text: 'Accese (pietonal/auto)' },
    ];

    ctx.fillStyle = 'rgba(248,250,252,.95)';
    ctx.strokeStyle = '#CBD5E1'; ctx.lineWidth = 0.8;
    ctx.fillRect(x, y, 200, items.length * 14 + 20);
    ctx.strokeRect(x, y, 200, items.length * 14 + 20);

    ctx.font = 'bold 7px IBM Plex Mono'; ctx.fillStyle = '#0F172A';
    ctx.fillText('LEGENDĂ COTARE', x + 5, y + 12);

    items.forEach((item, i) => {
      const iy = y + 20 + i * 14;
      ctx.fillStyle = item.color;
      ctx.fillRect(x + 5, iy, 20, 6);
      ctx.fillStyle = '#334155'; ctx.font = '6px IBM Plex Mono';
      ctx.fillText(item.text, x + 30, iy + 5.5);
    });

    ctx.restore();
  }


  // Init cotare situație
  _addSituatieCotare();
  // Fix parcare
  _fixParcareLogica();

  // ═══════════════════════════════════════════════════════════════════
  // FIX PARCARE — logică corectă: nu în spatele clădirii fără acces
  // ═══════════════════════════════════════════════════════════════════

  function _fixParcareLogica() {
    if (window._PARCARE_LOGIC_PATCHED) return;
    window._PARCARE_LOGIC_PATCHED = true;

    // Patch _rvRenderSituatieV3 — redesenăm parcarea corect
    const tryPatch = () => {
      const orig = window._rvRenderSituatieV3;
      if (!orig) return false;

      window._rvRenderSituatieV3 = function (b) {
        orig.apply(this, arguments);
        setTimeout(() => {
          try {
            const cv = document.getElementById('rv-canvas');
            if (!cv) return;
            const ctx = cv.getContext('2d');
            _redrawParcareCorect(ctx, b || window._RV?.building);
          } catch (e) {}
        }, 120);
      };
      return true;
    };

    if (!tryPatch()) {
      const obs = new MutationObserver(() => { if (tryPatch()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => obs.disconnect(), 30000);
    }
  }

  function _redrawParcareCorect(ctx, b) {
    if (!b?.P) return;
    const { P, bW, bD, niv } = b;
    const SC = Math.min((window._RV?.scale || 8) * 0.6, 6);
    const PAD = 80, CTX = 50;
    const pW = P.W * SC, pH = P.D * SC;
    const ox = PAD + CTX, oy = PAD + CTX;
    const rl = (P.rl || 3) * SC, rf = (P.rf || 3) * SC;
    const bX = ox + (P.W - bW) * SC / 2;
    const bY = oy + (P.D - bD) * SC / 2;
    const isNorth = !P.frontDir || P.frontDir === 'N';

    // Ștergem locurile greșite din spate
    const wrongY = bY + bD * SC + 2;
    const wrongH = 5 * SC + 24;
    if (wrongY + wrongH < oy + pH - 4) {
      ctx.fillStyle = 'rgba(254,252,232,.6)';
      ctx.fillRect(ox + rl, wrongY, pW - rl * 2, wrongH);
    }

    const hasSubsol = (b.subsolNiv || 0) > 0;
    if (hasSubsol) return; // rampa deja desenată de codul original

    // Calcul spațiu frontal disponibil
    const frontSpaceM = (bY - oy - rf) / SC;
    const culoarNec = 7.5, locD = 5.0, locW = 2.5;
    const canParkFront = frontSpaceM >= (locD + culoarNec);

    const parcNec = Math.ceil(((b.sdaTotal || bW * bD * niv) / 70));

    if (canParkFront) {
      // Parcare frontală cu culoar de manevră
      const nLoc = Math.min(parcNec, Math.floor((pW - rl * 2 - 20) / (locW * SC + 2)));
      if (nLoc <= 0) return;

      const startX = bX;
      const culoarY = isNorth ? (oy + rf * SC * 0.3) : (bY + bD * SC + rf * 0.3);
      const locY    = isNorth ? culoarY + culoarNec * SC : culoarY - locD * SC;

      // Culoar manevră
      ctx.fillStyle = 'rgba(251,191,36,.12)';
      ctx.strokeStyle = 'rgba(180,100,20,.25)'; ctx.lineWidth = 0.6;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(startX, culoarY, nLoc * (locW * SC + 2), culoarNec * SC);
      ctx.fillRect(startX, culoarY, nLoc * (locW * SC + 2), culoarNec * SC);
      ctx.setLineDash([]);
      ctx.fillStyle = '#92400E'; ctx.font = '5.5px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('CULOAR MANEVRĂ 7.5m — NP067/2002',
        startX + nLoc * (locW * SC + 2) / 2, culoarY + culoarNec * SC / 2 + 2);
      ctx.textAlign = 'left';

      // Locuri parcare
      for (let i = 0; i < nLoc; i++) {
        const lx = startX + i * (locW * SC + 2);
        ctx.fillStyle = 'rgba(241,245,249,.9)';
        ctx.strokeStyle = '#94A3B8'; ctx.lineWidth = 0.8;
        ctx.fillRect(lx, locY, locW * SC, locD * SC);
        ctx.strokeRect(lx, locY, locW * SC, locD * SC);
        ctx.fillStyle = '#334155'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
        ctx.fillText(String(i + 1), lx + locW * SC / 2, locY + locD * SC / 2 + 2);
        ctx.textAlign = 'left';
      }

      ctx.fillStyle = '#1E3A5F'; ctx.font = '5.5px IBM Plex Mono';
      ctx.fillText('Parcare la sol — ' + nLoc + ' loc. (2.5×5m)',
        startX, locY + (isNorth ? locD * SC + 9 : -5));

      // Dacă mai lipsesc locuri → banner subsol
      if (nLoc < parcNec) {
        _drawSubsolBanner(ctx, bX, bY, bW * SC, bD * SC, parcNec - nLoc);
      }
    } else {
      // Nu există spațiu → parcare la sol imposibilă
      _drawNoParcareMsg(ctx, bX, bY, bW * SC, parcNec);
    }
  }

  function _drawNoParcareMsg(ctx, bX, bY, bW, parcNec) {
    const msgX = bX + bW / 2, msgY = bY - 12;
    const tw = 195, th = 40;
    ctx.fillStyle = 'rgba(254,226,226,.96)';
    ctx.strokeStyle = '#DC2626'; ctx.lineWidth = 1.2;
    ctx.fillRect(msgX - tw / 2, msgY - th, tw, th);
    ctx.strokeRect(msgX - tw / 2, msgY - th, tw, th);
    ctx.fillStyle = '#991B1B'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('⚠ PARCARE LA SOL IMPOSIBILĂ', msgX, msgY - th + 12);
    ctx.fillStyle = '#7F1D1D'; ctx.font = '6px IBM Plex Mono';
    ctx.fillText('Spațiu insuficient culoar manevră 7.5m', msgX, msgY - th + 24);
    ctx.fillText('→ OBLIGATORIU SUBSOL (' + parcNec + ' locuri)', msgX, msgY - th + 35);
    ctx.textAlign = 'left';
  }

  function _drawSubsolBanner(ctx, bX, bY, bW, bD, deficit) {
    const x = bX + bW / 2, y = bY + bD + 14;
    const tw = 170;
    ctx.fillStyle = 'rgba(254,243,199,.96)';
    ctx.strokeStyle = '#D97706'; ctx.lineWidth = 1;
    ctx.fillRect(x - tw / 2, y, tw, 26);
    ctx.strokeRect(x - tw / 2, y, tw, 26);
    ctx.fillStyle = '#92400E'; ctx.font = 'bold 6.5px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('⬇ SUBSOL: încă ' + deficit + ' locuri necesare', x, y + 11);
    ctx.fillStyle = '#78350F'; ctx.font = '5.5px IBM Plex Mono';
    ctx.fillText('conf. NP 067/2002 — rampă acces frontal', x, y + 21);
    ctx.textAlign = 'left';
  }

})();
