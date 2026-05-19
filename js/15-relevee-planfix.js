// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-planfix.js — Fix Arhitectural Complet
// UrbanX TSS·FG | v1.0 | 19 mai 2026
//
// Rezolvă 3 probleme reale identificate vizual și în cod:
//
// FIX 1 — PLAN NIVEL: pereți interiori desenați o singură dată, corect
//   Problema: pasul 2 (borduri) + pasul 3b (fill) se suprapun → linii murdare
//   Soluție: suprascrie _rvRenderPlan cu logică corectă de strat:
//     strat 1 → fill camere
//     strat 2 → mobilier
//     strat 3 → pereți exteriori BA (fill+hașuri)
//     strat 4 → pereți interiori (o singură dată, grosime reală)
//     strat 5 → goluri ferestre (alb + simbol triplu)
//     strat 6 → uși (arc + foaie, direcție corectă)
//     strat 7 → cote per cameră (L×l în fiecare cameră)
//     strat 8 → cote lanț exterior
//     strat 9 → etichete + suprafețe
//
// FIX 2 — FAȚADĂ: ferestre din fl.wins reale, nu calculate generic
//   Problema: _hasBalc/_wW/_wH sunt undefined → fațada ignoră planul real
//   Soluție: suprascrie drawOneFacade să citească din fl.wins/fl.rects
//     → ferestre poziționate exact din planul real
//     → balcoane din fl.rects tip 'balcon'
//     → cote complete (H nivel, L fațadă, ferestre)
//     → soclu, atic, linie teren cotată
//
// FIX 3 — COTE PER CAMERĂ: afișare L×l pe fiecare cameră în plan
//   Problema: cotele există doar global (bW, bD) nu per cameră
//   Soluție: funcție nouă _rvDrawRoomDims care cotează fiecare cameră intern
//
// REGULI:
//   ✅ Nu atingem _rvFloor(), _rvCompBuilding(), 11-viewer3d.js
//   ✅ Fără MutationObserver
//   ✅ Se încarcă DUPĂ 15-relevee.js
// ═══════════════════════════════════════════════════════════════════════════

(function(){
'use strict';

// ── Așteptăm _RV și funcțiile core ──────────────────────────────────────────
function waitReady(cb, n){
  n = n||0; if(n>100) return;
  if(typeof _RV==='undefined' || typeof _rvInitCanvas==='undefined'){
    setTimeout(()=>waitReady(cb,n+1), 200); return;
  }
  cb();
}

waitReady(()=>{
  _patchRenderPlan();
  _patchRenderFacade();
  console.log('[PlanFix v1] ✅ Plan+Fațadă arhitectural complet');
});

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTE ARHITECTURALE
// ═══════════════════════════════════════════════════════════════════════════

const WALL = {
  EXT:  0.30,   // perete exterior beton armat (m)
  INT:  0.15,   // perete interior zidărie (m)
  CORE: 0.20,   // perete casă scări BA
};

const ROOM_FILL = {
  living:    '#FEF3C7', bedroom:   '#DCFCE7', bedroom2:  '#DCFCE7',
  bedroom3:  '#DCFCE7', kitchen:   '#DBEAFE', bath:      '#EDE9FE',
  wc:        '#F3E8FF', hall:      '#F1F5F9', storage:   '#F8FAFC',
  core:      '#DBEAFE', balcon:    '#FEFCE8', commercial:'#FAF5FF',
  office:    '#F0FDF4', meeting:   '#FFF7ED', reception: '#FAF5FF',
};

const ROOM_STROKE = {
  living:'#D97706', bedroom:'#15803D', bedroom2:'#15803D', bedroom3:'#15803D',
  kitchen:'#0284C7', bath:'#7C3AED', wc:'#6D28D9', hall:'#475569',
  storage:'#64748B', core:'#1D4ED8', balcon:'#CA8A04', commercial:'#7C3AED',
  office:'#15803D', meeting:'#EA580C', reception:'#7C3AED',
};

// ═══════════════════════════════════════════════════════════════════════════
// FIX 1 — _rvRenderPlan complet
// ═══════════════════════════════════════════════════════════════════════════

function _patchRenderPlan(){
  const _orig = window._rvRenderPlan;

  window._rvRenderPlan = function(fl, b){
    if(!fl||!b||!b.P){ if(typeof _orig==='function') _orig(fl,b); return; }

    const {P,bW,bD} = b;
    const SC  = _RV.scale;
    const pad = 60, lm = 50;

    // Canvas dimensions
    const W = bW*SC + pad*2 + P.rl*2*SC + 40;
    const H = bD*SC + pad*2 + (P.rf+P.rs)*SC + 140;
    const {cv,ctx} = _rvInitCanvas(W, H);
    if(!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0,W,H);

    const ox = pad + P.rl*SC;
    const oy = pad + P.rf*SC;

    // Salvăm pentru click detection
    _RV.planOx = ox; _RV.planOy = oy; _RV.planSc = SC;

    // ── Parcelă ─────────────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(212,175,55,.4)';
    ctx.lineWidth = 1; ctx.setLineDash([SC*.4, SC*.4]);
    ctx.strokeRect(pad, pad, P.W*SC, P.D*SC);
    ctx.setLineDash([]);
    ctx.fillStyle = '#334155'; ctx.font = 'bold 8px IBM Plex Mono';
    ctx.fillText(`Nr. cad. ${P.nrCad}  ·  ${P.W}m × ${P.D}m  ·  ${P.area}m²  ·  UTR ${P.utr}`,
                 pad+4, pad-6);

    // Stradă
    const stY = oy + bD*SC + P.rs*SC + 8;
    ctx.fillStyle = 'rgba(30,64,175,.08)';
    ctx.fillRect(pad, stY, P.W*SC, 20);
    ctx.fillStyle = '#1e40af'; ctx.font = 'bold 9px IBM Plex Mono';
    ctx.textAlign = 'center';
    ctx.fillText('▲  FRONT STRADAL  ·  '+P.frontDir, pad+P.W*SC/2, stY+14);
    ctx.textAlign = 'left';

    // ── STRAT 1: Fundal clădire ──────────────────────────────────────────
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(ox, oy, bW*SC, bD*SC);

    if(!fl.rects || fl.rects.length===0){
      ctx.fillStyle = 'rgba(232,179,65,.7)';
      ctx.font = 'bold 14px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText('Plan în curs de generare…', W/2, H/2-20);
      ctx.textAlign = 'left';
      return;
    }

    // ── STRAT 2: Fill camere ────────────────────────────────────────────
    fl.rects.forEach(r=>{
      const rx = ox+r.x*SC, ry = oy+r.y*SC, rw = r.w*SC, rh = r.h*SC;
      if(rw<1||rh<1) return;
      ctx.fillStyle = ROOM_FILL[r.t] || '#F1F5F9';
      if(r.bal){
        // Balcoane — hașuri diagonale subtile
        ctx.save();
        ctx.fillStyle = '#FEFCE8';
        ctx.fillRect(rx,ry,rw,rh);
        ctx.strokeStyle = 'rgba(202,138,4,.3)'; ctx.lineWidth = 0.5;
        ctx.setLineDash([3,3]); ctx.strokeRect(rx,ry,rw,rh); ctx.setLineDash([]);
        ctx.strokeStyle = 'rgba(202,138,4,.15)'; ctx.lineWidth = 0.5;
        for(let h=-rh;h<rw+rh;h+=5){
          const x1=Math.max(rx,rx+h), y1=rx+h<rx?ry+(rx-rx-h):ry;
          const x2=Math.min(rx+rw,rx+h+rh), y2=x2===rx+rw?ry+(rx+rw-(rx+h)):ry+rh;
          if(x1<rx+rw&&x2>rx){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}
        }
        ctx.restore();
      } else {
        ctx.fillRect(rx, ry, rw, rh);
      }
    });

    // ── STRAT 3: Mobilier ───────────────────────────────────────────────
    fl.rects.forEach(r=>{
      if(r.bal) return;
      const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
      if(rw > SC*1.2 && rh > SC*1.2){
        if(typeof _rvDrawFurniture === 'function'){
          _rvDrawFurniture(ctx, r, rx+2, ry+2, rw-4, rh-4, SC);
        }
      }
    });

    // ── STRAT 4: Pereți exteriori BA ────────────────────────────────────
    const EW = Math.max(3, WALL.EXT*SC);
    ctx.fillStyle = '#1E293B';
    // 4 laturi
    ctx.fillRect(ox-EW,    oy-EW,    bW*SC+EW*2, EW);        // Nord
    ctx.fillRect(ox-EW,    oy+bD*SC, bW*SC+EW*2, EW);        // Sud
    ctx.fillRect(ox-EW,    oy-EW,    EW,          bD*SC+EW*2); // Vest
    ctx.fillRect(ox+bW*SC, oy-EW,    EW,          bD*SC+EW*2); // Est

    // Hașuri pe pereții exteriori (beton armat)
    ctx.save();
    ctx.beginPath();
    ctx.rect(ox-EW, oy-EW, bW*SC+EW*2, EW);
    ctx.rect(ox-EW, oy+bD*SC, bW*SC+EW*2, EW);
    ctx.rect(ox-EW, oy-EW, EW, bD*SC+EW*2);
    ctx.rect(ox+bW*SC, oy-EW, EW, bD*SC+EW*2);
    ctx.clip();
    ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = .6;
    for(let h=-bD*SC;h<bW*SC+bD*SC;h+=4){
      ctx.beginPath();
      ctx.moveTo(ox-EW+h, oy-EW);
      ctx.lineTo(ox-EW+h+bD*SC+EW*2, oy+bD*SC+EW);
      ctx.stroke();
    }
    ctx.restore();

    // ── STRAT 5: Pereți interiori ────────────────────────────────────────
    // O singură trecere, fără dubluri
    const IW = Math.max(2, WALL.INT*SC);
    const CW = Math.max(2, WALL.CORE*SC);

    fl.rects.forEach(r=>{
      if(r.bal) return;
      const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
      const wt = r.t==='core' ? CW : IW;

      ctx.fillStyle = r.t==='core' ? 'rgba(15,23,42,.9)' : 'rgba(30,41,59,.8)';

      // Desenăm bordura uniformă (nu mai dublu-desenăm)
      // Folosim strokeRect cu lineWidth exact = wt
      ctx.strokeStyle = r.t==='core' ? '#0F172A' : '#1E293B';
      ctx.lineWidth = wt;
      ctx.strokeRect(rx + wt/2, ry + wt/2, rw-wt, rh-wt);

      // Nuclee: hașuri + simboluri
      if(r.t==='core'){
        ctx.save();
        ctx.beginPath(); ctx.rect(rx,ry,rw,rh); ctx.clip();
        ctx.strokeStyle = 'rgba(255,255,255,.22)'; ctx.lineWidth = .6;
        for(let h=-rh;h<rw+rh;h+=5){
          ctx.beginPath();ctx.moveTo(rx+h,ry);ctx.lineTo(rx+h+rh,ry+rh);ctx.stroke();
        }
        ctx.restore();

        // Scări (linii orizontale)
        const stX=rx+CW+2, stY=ry+CW+2;
        const stW=Math.max(8,(rw-CW*2)*.55), stH=rh-CW*2-4;
        if(stW>6&&stH>6){
          ctx.fillStyle = 'rgba(219,234,254,.6)';
          ctx.fillRect(stX, stY, stW, stH);
          ctx.strokeStyle = 'rgba(29,78,216,.8)'; ctx.lineWidth = .8;
          ctx.strokeRect(stX, stY, stW, stH);
          const nSt = Math.max(4, Math.floor(stH/Math.max(2,SC*.22)));
          ctx.strokeStyle = 'rgba(29,78,216,.5)'; ctx.lineWidth = .6;
          for(let si=1;si<=nSt;si++){
            const ly = stY + si*(stH/nSt);
            ctx.beginPath();ctx.moveTo(stX,ly);ctx.lineTo(stX+stW,ly);ctx.stroke();
          }
          // Săgeată
          ctx.strokeStyle = 'rgba(29,78,216,.9)'; ctx.lineWidth = 1.2;
          const arY = stY+stH*.45;
          ctx.beginPath();ctx.moveTo(stX+stW*.2,arY);ctx.lineTo(stX+stW*.75,arY);ctx.stroke();
          ctx.beginPath();ctx.moveTo(stX+stW*.55,arY-3);ctx.lineTo(stX+stW*.75,arY);ctx.lineTo(stX+stW*.55,arY+3);ctx.stroke();
        }
        // Lift
        const lX=rx+CW+(rw-CW*2)*.58, lY=ry+CW+3;
        const lW=Math.max(6,(rw-CW*2)*.38), lH=Math.min(lW*1.4,rh-CW*2-6);
        if(lW>5&&lH>5){
          ctx.fillStyle = 'rgba(37,99,235,.15)';
          ctx.fillRect(lX,lY,lW,lH);
          ctx.strokeStyle = 'rgba(96,165,250,.7)'; ctx.lineWidth = .8;
          ctx.strokeRect(lX,lY,lW,lH);
          ctx.strokeStyle = 'rgba(96,165,250,.4)'; ctx.lineWidth = .5;
          ctx.beginPath();ctx.moveTo(lX,lY);ctx.lineTo(lX+lW,lY+lH);ctx.stroke();
          ctx.beginPath();ctx.moveTo(lX+lW,lY);ctx.lineTo(lX,lY+lH);ctx.stroke();
        }
      }
    });

    // ── STRAT 6: Ferestre în pereți exteriori ──────────────────────────
    fl.wins.forEach(w=>{
      const wSC = (w.w||w.h||1.2)*SC;
      let gx,gy,gw,gh;
      if(w.wall==='N'){gx=ox+w.x*SC;gy=oy-EW;gw=wSC;gh=EW*2;}
      else if(w.wall==='S'){gx=ox+w.x*SC;gy=oy+bD*SC-EW;gw=wSC;gh=EW*2;}
      else if(w.wall==='V'){gx=ox-EW;gy=oy+w.y*SC;gw=EW*2;gh=wSC;}
      else{gx=ox+bW*SC-EW;gy=oy+w.y*SC;gw=EW*2;gh=wSC;}

      // Gol alb (suprascrie peretele)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(gx-1, gy-1, gw+2, gh+2);

      // Simbol fereastră: 3 linii paralele (toc exterior + sticlă + toc interior)
      const isH = (w.wall==='N'||w.wall==='S');
      ctx.fillStyle = 'rgba(147,210,250,.5)';
      ctx.fillRect(gx, gy, gw, gh);
      ctx.strokeStyle = '#0369A1'; ctx.lineWidth = 1.5;
      ctx.strokeRect(gx, gy, gw, gh);
      ctx.strokeStyle = 'rgba(3,105,161,.6)'; ctx.lineWidth = .7;
      if(isH){
        [-.25,0,.25].forEach(f=>{
          const py = gy + gh/2 + f*gh*.5;
          ctx.beginPath();ctx.moveTo(gx,py);ctx.lineTo(gx+gw,py);ctx.stroke();
        });
      } else {
        [-.25,0,.25].forEach(f=>{
          const px = gx + gw/2 + f*gw*.5;
          ctx.beginPath();ctx.moveTo(px,gy);ctx.lineTo(px,gy+gh);ctx.stroke();
        });
      }
      // Cruce (cercevele)
      ctx.strokeStyle = 'rgba(3,105,161,.35)'; ctx.lineWidth = .5;
      ctx.beginPath();ctx.moveTo(gx+gw/2,gy);ctx.lineTo(gx+gw/2,gy+gh);ctx.stroke();
      if(isH){ctx.beginPath();ctx.moveTo(gx,gy+gh/2);ctx.lineTo(gx+gw,gy+gh/2);ctx.stroke();}
    });

    // ── STRAT 7: Uși ────────────────────────────────────────────────────
    fl.doors.forEach(d=>{
      _drawDoor(ctx, d, b, ox, oy, SC, EW, IW);
    });

    // ── STRAT 8: Ventilație baie/WC + solar ─────────────────────────────
    fl.rects.filter(r=>r.t==='bath'||r.t==='wc').forEach(r=>{
      const rx2=ox+r.x*SC, ry2=oy+r.y*SC, rw2=r.w*SC, rh2=r.h*SC;
      if(rw2<5||rh2<5) return;
      const EPS=0.15;
      const onExt=(r.x<=EPS||r.y<=EPS||r.x+r.w>=bW-EPS||r.y+r.h>=bD-EPS);
      const cx2=rx2+rw2/2, cy2=ry2+rh2/2;
      if(!onExt){
        const vR = Math.min(rw2*.18,rh2*.18,8);
        ctx.fillStyle='rgba(148,163,184,.2)';
        ctx.beginPath();ctx.arc(cx2,cy2-vR*.5,vR,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle='#64748B';ctx.lineWidth=1;
        ctx.beginPath();ctx.arc(cx2,cy2-vR*.5,vR,0,Math.PI*2);ctx.stroke();
        ctx.fillStyle='#334155';ctx.font=`bold ${Math.min(vR,7)}px IBM Plex Mono`;
        ctx.textAlign='center';ctx.fillText('M',cx2,cy2-vR*.5+Math.min(vR,7)*.35);
        ctx.textAlign='left';
      }
    });

    // ── STRAT 9: Cote per cameră (L × l) ────────────────────────────────
    _drawRoomDims(ctx, fl, ox, oy, SC);

    // ── STRAT 10: Etichete camere ────────────────────────────────────────
    fl.rects.forEach(r=>{
      if(r.t==='core') return; // nuclee au etichete proprii
      const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
      if(rw<16||rh<12) return;
      const lbl = _roomLabel(r);
      const area = (r.w*r.h).toFixed(1);
      const fs = Math.min(8.5, rw/7, rh/3.5);
      ctx.fillStyle = '#0F172A';
      ctx.font = `bold ${fs}px IBM Plex Mono`;
      ctx.textAlign = 'center';
      // Etichetă sus (mai sus dacă e spațiu pentru arie)
      const hasArea = rh > 28 && !r.bal;
      ctx.fillText(lbl, rx+rw/2, ry+rh/2 - (hasArea ? fs*.5 : 0));
      if(hasArea){
        ctx.fillStyle = 'rgba(0,0,0,.45)';
        ctx.font = `${Math.min(7, fs*.85)}px IBM Plex Mono`;
        ctx.fillText(area+'m²', rx+rw/2, ry+rh/2 + fs*.9);
      }
      ctx.textAlign = 'left';
    });

    // ── STRAT 11: Cote globale ───────────────────────────────────────────
    if(_RV.showDim){
      if(typeof _rvDrawDims==='function')
        _rvDrawDims(ctx, ox, oy, bW*SC, bD*SC, bW, bD, P, SC);
    }
    if(typeof _rvDrawChainDims==='function')
      _rvDrawChainDims(ctx, fl, b, ox, oy, SC);

    // ── STRAT 12: Tabele, legendă, cartuș ───────────────────────────────
    if(typeof _rvDrawTabelApartamente==='function')
      _rvDrawTabelApartamente(ctx, fl, b, ox, oy+bD*SC+65, Math.min(bW*SC,420));
    if(typeof _rvDrawLegenda==='function')
      _rvDrawLegenda(ctx, ox+bW*SC+32, oy, SC, fl);
    if(typeof _rvDrawNorth==='function')
      _rvDrawNorth(ctx, W-38, 44, P.frontDir);
    if(typeof _rvDrawScale==='function')
      _rvDrawScale(ctx, pad, H-18, SC);
    if(typeof _rvDrawCartus==='function')
      _rvDrawCartus(ctx, W, H, P, fl.floorIdx);

    // Watermark etaj
    ctx.fillStyle = 'rgba(212,175,55,.04)';
    ctx.font = `bold ${SC*5}px IBM Plex Mono`;
    ctx.textAlign = 'center';
    ctx.fillText(fl.floorIdx===0?'PARTER':`ETAJ ${fl.floorIdx}`,
                 ox+bW*SC/2, oy+bD*SC/2);
    ctx.textAlign = 'left';

    // Touch zoom
    setTimeout(()=>{
      try{ if(typeof _rvInitTouchCanvas==='function')
        _rvInitTouchCanvas(document.getElementById('rv-canvas'));
      }catch(e){}
    }, 200);

    // Hover
    try{
      if(typeof _rvSetupHover==='function')
        _rvSetupHover(cv, fl, ox, oy);
    }catch(e){}
  };
}

// ── Desenare ușă individuală ─────────────────────────────────────────────────
function _drawDoor(ctx, d, b, ox, oy, SC, EW, IW){
  const {bW,bD,P} = b;
  const isMain  = d.type==='main';
  const isInt   = d.type==='int';
  const isBalc  = d.type==='balcon';

  // Uși interioare (axă H sau V)
  if((isInt||isBalc) && d.axis){
    const dColor = isBalc ? '#0369A1' : '#334155';
    const dW = d.w*SC;
    if(d.axis==='H'){
      const dx2=ox+d.x*SC, dy2=oy+d.y*SC;
      // Gol alb în perete interior
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(dx2-1, dy2-IW, dW+2, IW*2);
      // Foaie ușă
      ctx.strokeStyle = dColor; ctx.lineWidth = 1.5;
      ctx.beginPath();ctx.moveTo(dx2,dy2);ctx.lineTo(dx2+dW,dy2);ctx.stroke();
      // Arc deschidere (spre interior = sus)
      ctx.strokeStyle = isBalc?'rgba(3,105,161,.5)':'rgba(51,65,85,.5)';
      ctx.lineWidth = .8;
      let pa=dx2, pb=dy2;
      for(let a=0.08;a<=Math.PI/2;a+=0.06){
        const nx=dx2+dW*Math.sin(a), ny=dy2-dW*(1-Math.cos(a));
        ctx.beginPath();ctx.moveTo(pa,pb);ctx.lineTo(nx,ny);ctx.stroke();
        pa=nx; pb=ny;
      }
    } else {
      const dx2=ox+d.x*SC, dy2=oy+d.y*SC;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(dx2-IW, dy2-1, IW*2, d.w*SC+2);
      ctx.strokeStyle = dColor; ctx.lineWidth = 1.5;
      ctx.beginPath();ctx.moveTo(dx2,dy2);ctx.lineTo(dx2,dy2+d.w*SC);ctx.stroke();
      ctx.strokeStyle = 'rgba(51,65,85,.5)'; ctx.lineWidth = .8;
      let pa=dx2, pb=dy2;
      for(let a=0.08;a<=Math.PI/2;a+=0.06){
        const nx=dx2+d.w*SC*(1-Math.cos(a)), ny=dy2+d.w*SC*Math.sin(a);
        ctx.beginPath();ctx.moveTo(pa,pb);ctx.lineTo(nx,ny);ctx.stroke();
        pa=nx; pb=ny;
      }
    }
    return;
  }

  // Uși exterioare (intrare bloc sau apartament)
  const dxP  = ox + d.x*SC;
  const dwP  = d.w*SC;
  const dyP  = d.y!==undefined ? oy+d.y*SC : oy+bD*SC;

  // Gol în perete exterior
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(dxP-1, dyP-EW, dwP+2, EW*2);

  // Foaie + arc
  const arcColor = isMain ? '#F59E0B' : '#334155';
  const lineW    = isMain ? 2.2 : 1.5;
  ctx.strokeStyle = arcColor; ctx.lineWidth = lineW;
  ctx.beginPath();ctx.moveTo(dxP, dyP);ctx.lineTo(dxP+dwP, dyP);ctx.stroke();

  // Arc
  ctx.strokeStyle = isMain ? 'rgba(245,158,11,.6)' : 'rgba(51,65,85,.5)';
  ctx.lineWidth = 1;
  const swing = d.swing || 'left';
  if(swing==='right' || isMain){
    ctx.beginPath();
    ctx.arc(dxP, dyP, dwP, -Math.PI/2, 0);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(dxP+dwP, dyP, dwP, Math.PI, -Math.PI/2);
    ctx.stroke();
  }

  // Etichete
  if(isMain){
    ctx.fillStyle = '#B45309'; ctx.font = 'bold 8px IBM Plex Mono';
    ctx.textAlign = 'center';
    ctx.fillText('▶ INTRARE BLOC', dxP+dwP/2, dyP+14);
    ctx.textAlign = 'left';
  } else if(d.aptIdx!==undefined){
    ctx.fillStyle = '#1D4ED8'; ctx.font = '7px IBM Plex Mono';
    ctx.textAlign = 'center';
    ctx.fillText('↑ Ap.'+(d.aptIdx||''), dxP+dwP/2, dyP-EW-3);
    ctx.textAlign = 'left';
  }

  // Cotă ușă
  ctx.fillStyle = '#1E40AF'; ctx.font = '7px IBM Plex Mono';
  ctx.textAlign = 'center';
  ctx.fillText((d.w||0).toFixed(2)+'m', dxP+dwP/2, dyP+(isMain?-6:-2));
  ctx.textAlign = 'left';
}

// ── Cote per cameră (dimensiuni interioare L×l) ──────────────────────────────
function _drawRoomDims(ctx, fl, ox, oy, SC){
  ctx.save();
  fl.rects.forEach(r=>{
    if(r.bal || r.t==='core') return;
    const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
    // Afișăm cote interne dacă camera e suficient de mare
    if(rw<35||rh<25) return;

    const colLine = 'rgba(30,64,175,.55)';
    const colText = 'rgba(30,64,175,.9)';
    ctx.strokeStyle = colLine; ctx.lineWidth = 0.6;
    ctx.fillStyle = colText;
    ctx.font = '6.5px IBM Plex Mono';

    // Cotă orizontală (lățime) — pe marginea de sus a camerei
    const dimY = ry + 8;
    ctx.beginPath();ctx.moveTo(rx+3,dimY);ctx.lineTo(rx+rw-3,dimY);ctx.stroke();
    ctx.beginPath();ctx.moveTo(rx+3,dimY-2);ctx.lineTo(rx+3,dimY+2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(rx+rw-3,dimY-2);ctx.lineTo(rx+rw-3,dimY+2);ctx.stroke();
    ctx.textAlign='center';
    ctx.fillText(r.w.toFixed(2)+'m', rx+rw/2, dimY-2);

    // Cotă verticală (adâncime) — pe marginea din stânga
    const dimX = rx + 8;
    ctx.beginPath();ctx.moveTo(dimX,ry+3);ctx.lineTo(dimX,ry+rh-3);ctx.stroke();
    ctx.beginPath();ctx.moveTo(dimX-2,ry+3);ctx.lineTo(dimX+2,ry+3);ctx.stroke();
    ctx.beginPath();ctx.moveTo(dimX-2,ry+rh-3);ctx.lineTo(dimX+2,ry+rh-3);ctx.stroke();
    ctx.save();
    ctx.translate(dimX-2, ry+rh/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText(r.h.toFixed(2)+'m', 0, 0);
    ctx.restore();

    ctx.textAlign = 'left';
  });
  ctx.restore();
}

// ── Label cameră ─────────────────────────────────────────────────────────────
function _roomLabel(r){
  const M = {
    living:'CAMERA DE ZI', bedroom:'DORMITOR', bedroom2:'DORMITOR 2',
    bedroom3:'DORMITOR 3', kitchen:'BUCĂTĂRIE', bath:'BAIE', wc:'WC',
    hall:'HOL', storage:'DEBARĂ', core:'CASĂ SCĂRI',
    commercial:'COMERCIAL', office:'BIROU', meeting:'ȘEDINȚĂ',
    reception:'RECEPȚIE', balcon:'BALCON',
  };
  return (r.lbl && r.lbl !== r.t)
    ? r.lbl.replace(/\n/g,' ').slice(0,16)
    : (M[r.t]||r.t.toUpperCase());
}

// ═══════════════════════════════════════════════════════════════════════════
// FIX 2 — _rvRenderFacade cu ferestre reale din plan
// ═══════════════════════════════════════════════════════════════════════════

function _patchRenderFacade(){
  const _orig = window._rvRenderFacade;

  window._rvRenderFacade = function(b){
    if(!b||!b.P){ if(typeof _orig==='function') _orig(b); return; }

    const _AC  = typeof _rvGetAEDISConfig==='function' ? _rvGetAEDISConfig() : {};
    const {P,bW,bD,niv} = b;
    const Ht   = niv * P.hn;
    const SC   = _RV.scale * .85;
    const pad  = 40;

    // Ferestre reale din planul de nivel
    const fl0    = _RV.floors?.[0] || null;
    const fl1    = _RV.floors?.[1] || fl0;
    const wins_N = (fl0?.wins||[]).filter(w=>w.wall==='N');
    const wins_S = (fl0?.wins||[]).filter(w=>w.wall==='S');
    const wins_V = (fl0?.wins||[]).filter(w=>w.wall==='V');
    const wins_E = (fl0?.wins||[]).filter(w=>w.wall==='E');
    // Balcoane reale
    const balcRects = (fl0?.rects||[]).filter(r=>r.bal);
    const hasBalc   = _AC.hasBalc !== undefined ? _AC.hasBalc : balcRects.length > 0;
    const balcD     = _AC.balcD || 0.6;
    const hasCortina= _AC.hasCurtainWall || false;
    const cortinaPct= _AC.cortinaPct || 0;
    const stil      = _AC.stil || 'modern';

    const facadeW_NS = bW*SC, facadeW_EV = bD*SC, facadeH = Ht*SC;
    const sectionH   = facadeH + 100;
    const W = Math.max(facadeW_NS,facadeW_EV) + pad*2 + 140;
    const H = sectionH * 4 + pad;
    const {cv,ctx} = _rvInitCanvas(W, H);
    if(!ctx) return;

    // Fundal alb arhitectural
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0,0,W,H);

    // ── Funcție desenare o fațadă ─────────────────────────────────────────
    function drawFatada(label, fW, ox_, oy_, isMain, wins, wallDir){
      // Header
      ctx.fillStyle = 'rgba(15,23,42,.8)';
      ctx.fillRect(ox_-2, oy_-24, fW+4, 22);
      ctx.fillStyle = '#D4AF37'; ctx.font = 'bold 10px IBM Plex Mono';
      ctx.textAlign = 'left';
      ctx.fillText('FAȚADĂ '+ label + (isMain?' ◀ PRINCIPALĂ (FRONT STRADAL)':''),
                   ox_+2, oy_-8);
      ctx.textAlign = 'left';

      // Fundal clădire (alb)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(ox_, oy_, fW, facadeH);

      // Soclu (H=0.5m)
      const soclH = 0.5*SC;
      ctx.fillStyle = '#CBD5E1';
      ctx.fillRect(ox_-4, oy_+facadeH-soclH, fW+8, soclH);
      ctx.strokeStyle = '#94A3B8'; ctx.lineWidth = .8;
      ctx.strokeRect(ox_-4, oy_+facadeH-soclH, fW+8, soclH);

      // Sol + linie teren
      ctx.fillStyle = '#9CA3AF';
      ctx.fillRect(ox_-12, oy_+facadeH, fW+24, 6);
      ctx.strokeStyle = '#374151'; ctx.lineWidth = 2.5;
      ctx.beginPath();ctx.moveTo(ox_-25,oy_+facadeH);ctx.lineTo(ox_+fW+50,oy_+facadeH);ctx.stroke();

      // Planșee inter-etaj
      for(let i=1;i<niv;i++){
        const ly = oy_ + facadeH - i*P.hn*SC;
        // Bandă planșeu
        ctx.fillStyle = 'rgba(30,41,59,.15)';
        ctx.fillRect(ox_, ly-4, fW, 4);
        ctx.strokeStyle = '#64748B'; ctx.lineWidth = .8;
        ctx.beginPath();ctx.moveTo(ox_,ly);ctx.lineTo(ox_+fW,ly);ctx.stroke();
        // Cotă nivel stânga
        ctx.fillStyle = '#1D4ED8'; ctx.font = '7px IBM Plex Mono';
        ctx.textAlign = 'right';
        ctx.fillText('+'+(i*P.hn).toFixed(2)+'m', ox_-6, ly+3);
        ctx.fillStyle = '#475569'; ctx.font = 'bold 7px IBM Plex Mono';
        ctx.fillText(i===0?'P':`E${i}`, ox_-28, ly+3);
        ctx.textAlign = 'left';
      }
      // Cotă parter
      ctx.fillStyle = '#1D4ED8'; ctx.font = '7px IBM Plex Mono';
      ctx.textAlign = 'right';
      ctx.fillText('±0.00', ox_-6, oy_+facadeH-2);
      ctx.fillStyle = '#475569'; ctx.font = 'bold 7px IBM Plex Mono';
      ctx.fillText('P', ox_-20, oy_+facadeH-2);
      ctx.textAlign = 'left';

      // ── Ferestre din plan real ──────────────────────────────────────
      // Desenăm ferestrele pentru fiecare etaj
      for(let floor=0; floor<niv; floor++){
        const flData   = _RV.floors?.[floor] || fl0;
        const flWins   = (flData?.wins||[]).filter(w=>w.wall===wallDir);
        const flY_base = oy_ + facadeH - (floor+1)*P.hn*SC;

        if(flWins.length > 0){
          // Ferestre reale din plan
          flWins.forEach(w=>{
            const wSC = (w.w||w.h||1.2)*SC;
            const wH  = _AC.wH ? _AC.wH*SC : P.hn*SC*.45;
            const wx_  = ox_ + w.x*SC;
            const wY   = flY_base + (P.hn*SC - wH) * .28;

            // Gol fereastră (peretele e alb acolo)
            ctx.fillStyle = hasCortina && cortinaPct>50
              ? 'rgba(56,189,248,.75)'
              : 'rgba(147,210,250,.65)';
            ctx.fillRect(wx_, wY, wSC, wH);

            // Toc exterior
            ctx.strokeStyle = hasCortina ? '#0EA5E9' : '#0369A1';
            ctx.lineWidth = hasCortina ? 2 : 1.5;
            ctx.strokeRect(wx_, wY, wSC, wH);

            // Cercevele (cruce)
            ctx.strokeStyle = 'rgba(3,105,161,.4)'; ctx.lineWidth = .7;
            ctx.beginPath();ctx.moveTo(wx_+wSC/2,wY);ctx.lineTo(wx_+wSC/2,wY+wH);ctx.stroke();
            ctx.beginPath();ctx.moveTo(wx_,wY+wH/2);ctx.lineTo(wx_+wSC,wY+wH/2);ctx.stroke();

            // Glaf exterior (linie orizontală sub fereastră)
            ctx.strokeStyle = '#94A3B8'; ctx.lineWidth = 1.5;
            ctx.beginPath();ctx.moveTo(wx_-3,wY+wH);ctx.lineTo(wx_+wSC+3,wY+wH);ctx.stroke();
          });
        } else {
          // Fallback: ferestre generice distribuite uniform dacă nu există date
          const wCols  = Math.max(2, Math.floor(fW/(SC*3.5)));
          const wW     = Math.min(fW/wCols*.55, _AC.wW ? _AC.wW*SC : 1.2*SC);
          const wH     = _AC.wH ? _AC.wH*SC : P.hn*SC*.44;
          const colSp  = fW/wCols;
          const coreC  = Math.floor(wCols/2);

          for(let col=0;col<wCols;col++){
            const wx_ = ox_ + col*colSp + (colSp-wW)/2;
            const wY  = flY_base + (P.hn*SC-wH)*.28;

            if(col===coreC){
              // Casă scări pe fațadă
              ctx.fillStyle = 'rgba(148,163,184,.25)';
              ctx.fillRect(wx_, wY, wW*.5, wH);
              ctx.strokeStyle = '#94A3B8'; ctx.lineWidth = .8;
              ctx.strokeRect(wx_, wY, wW*.5, wH);
              continue;
            }

            ctx.fillStyle = 'rgba(147,210,250,.6)';
            ctx.fillRect(wx_,wY,wW,wH);
            ctx.strokeStyle = '#0369A1'; ctx.lineWidth = 1.5;
            ctx.strokeRect(wx_,wY,wW,wH);
            ctx.strokeStyle = 'rgba(3,105,161,.35)'; ctx.lineWidth = .6;
            ctx.beginPath();ctx.moveTo(wx_+wW/2,wY);ctx.lineTo(wx_+wW/2,wY+wH);ctx.stroke();
            ctx.beginPath();ctx.moveTo(wx_,wY+wH/2);ctx.lineTo(wx_+wW,wY+wH/2);ctx.stroke();
            ctx.strokeStyle='#94A3B8';ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(wx_-2,wY+wH);ctx.lineTo(wx_+wW+2,wY+wH);ctx.stroke();
          }
        }
      }

      // ── Balcoane ──────────────────────────────────────────────────
      if(hasBalc){
        for(let row=1;row<niv;row++){
          const bz = oy_ + facadeH - row*P.hn*SC;
          const bH = Math.max(8, P.hn*SC*.13);

          // Placă balcon
          ctx.fillStyle = 'rgba(218,226,235,.95)';
          ctx.fillRect(ox_-14, bz-bH, fW+28, bH);
          ctx.strokeStyle = '#1E293B'; ctx.lineWidth = 1.8;
          ctx.strokeRect(ox_-14, bz-bH, fW+28, bH);

          // Pardoseală placă
          ctx.fillStyle = 'rgba(148,163,184,.4)';
          ctx.fillRect(ox_-14, bz-3, fW+28, 3);

          // Parapet
          ctx.strokeStyle = '#0369A1'; ctx.lineWidth = 2;
          ctx.beginPath();ctx.moveTo(ox_-14,bz-bH+2);ctx.lineTo(ox_+fW+14,bz-bH+2);ctx.stroke();
          // Montanți parapet
          ctx.lineWidth = 1;
          for(let mi=0;mi<=Math.floor(fW/20);mi++){
            const mx = ox_-14 + mi*20;
            ctx.beginPath();ctx.moveTo(mx,bz);ctx.lineTo(mx,bz-bH+2);ctx.stroke();
          }
        }
      }

      // ── Parter diferit ──────────────────────────────────────────
      if(_AC.parterDiferit && _AC.fnParterLabel){
        const pdH = P.hn*SC;
        const pdY = oy_ + facadeH - pdH;
        ctx.fillStyle = 'rgba(139,92,246,.1)';
        ctx.fillRect(ox_, pdY, fW, pdH);
        ctx.strokeStyle = '#7C3AED'; ctx.lineWidth = 1.5;
        ctx.setLineDash([4,3]); ctx.strokeRect(ox_,pdY,fW,pdH); ctx.setLineDash([]);
        ctx.fillStyle = '#6D28D9'; ctx.font = 'bold 7px IBM Plex Mono';
        ctx.textAlign = 'center';
        ctx.fillText('PARTER: '+_AC.fnParterLabel.toUpperCase().slice(0,22),
                     ox_+fW/2, pdY+pdH*.5);
        ctx.textAlign = 'left';
      }

      // ── Ușă intrare (fațadă principală) ─────────────────────────
      if(isMain){
        const doorW = 2.4*SC, doorH = 3.0*SC;
        const dX = ox_+fW/2-doorW/2, dY = oy_+facadeH-doorH;
        ctx.fillStyle = 'rgba(245,158,11,.12)';
        ctx.fillRect(dX, dY, doorW, doorH);
        ctx.strokeStyle = '#F59E0B'; ctx.lineWidth = 2;
        ctx.strokeRect(dX, dY, doorW, doorH);
        ctx.strokeStyle = 'rgba(245,158,11,.45)'; ctx.lineWidth = .8;
        ctx.beginPath();ctx.moveTo(dX+doorW/2,dY);ctx.lineTo(dX+doorW/2,dY+doorH);ctx.stroke();
        ctx.fillStyle = '#B45309'; ctx.font = 'bold 7px IBM Plex Mono';
        ctx.textAlign = 'center';
        ctx.fillText('INTRARE', dX+doorW/2, dY+doorH+9);
        ctx.textAlign = 'left';
      }

      // ── Contur clădire (bordură groasă) ─────────────────────────
      ctx.strokeStyle = '#1E293B'; ctx.lineWidth = 2.5;
      ctx.strokeRect(ox_, oy_, fW, facadeH);

      // ── Atic / parapet terasă ────────────────────────────────────
      const aticH = Math.max(7, 0.8*SC);
      ctx.fillStyle = 'rgba(30,41,59,.4)';
      ctx.fillRect(ox_-EW2, oy_-aticH, EW2*2, aticH);
      ctx.fillRect(ox_+fW-EW2, oy_-aticH, EW2*2, aticH);
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2;
      ctx.strokeRect(ox_-EW2, oy_-aticH, EW2*2, aticH);
      ctx.strokeRect(ox_+fW-EW2, oy_-aticH, EW2*2, aticH);

      // ── Cote dimensionale ─────────────────────────────────────────
      // H total (dreapta)
      const cotRX = ox_+fW+36;
      ctx.strokeStyle = '#1D4ED8'; ctx.lineWidth = .8;
      ctx.beginPath();ctx.moveTo(cotRX,oy_);ctx.lineTo(cotRX,oy_+facadeH);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cotRX-4,oy_);ctx.lineTo(cotRX+4,oy_);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cotRX-4,oy_+facadeH);ctx.lineTo(cotRX+4,oy_+facadeH);ctx.stroke();
      ctx.save();
      ctx.translate(cotRX+14, oy_+facadeH/2);
      ctx.rotate(-Math.PI/2);
      ctx.fillStyle = '#1D4ED8'; ctx.font = 'bold 8px IBM Plex Mono';
      ctx.textAlign = 'center';
      ctx.fillText('H = '+Ht.toFixed(2)+'m  ('+niv+' niv.)', 0, 0);
      ctx.restore();

      // L total (jos)
      const cotBY = oy_+facadeH+32;
      ctx.strokeStyle = '#1D4ED8'; ctx.lineWidth = .8;
      ctx.beginPath();ctx.moveTo(ox_,cotBY);ctx.lineTo(ox_+fW,cotBY);ctx.stroke();
      ctx.beginPath();ctx.moveTo(ox_,cotBY-4);ctx.lineTo(ox_,cotBY+4);ctx.stroke();
      ctx.beginPath();ctx.moveTo(ox_+fW,cotBY-4);ctx.lineTo(ox_+fW,cotBY+4);ctx.stroke();
      ctx.fillStyle = '#1D4ED8'; ctx.font = 'bold 8px IBM Plex Mono';
      ctx.textAlign = 'center';
      const fWm = fW===facadeW_NS ? bW : bD;
      ctx.fillText(fWm.toFixed(2)+'m', ox_+fW/2, cotBY+12);
      ctx.textAlign = 'left';

      // ── Tablou materiale (stânga) ─────────────────────────────────
      const matX = ox_+fW+4, matY = oy_;
      ctx.fillStyle = 'rgba(15,23,42,.9)';
      ctx.fillRect(matX, matY, 110, facadeH);
      ctx.strokeStyle = 'rgba(212,175,55,.2)'; ctx.lineWidth = .5;
      ctx.strokeRect(matX, matY, 110, facadeH);
      ctx.fillStyle = 'rgba(212,175,55,.15)';
      ctx.fillRect(matX, matY, 110, 14);
      ctx.fillStyle = '#D4AF37'; ctx.font = 'bold 7px IBM Plex Mono';
      ctx.textAlign = 'center';
      ctx.fillText('MATERIALE FAȚADĂ', matX+55, matY+10);
      ctx.textAlign = 'left';
      const mats = [
        ['Perete ext.','BA20+BCA15+EPS15cm','#CBD5E1'],
        ['Finisaj','Tencuiala siliconata','#F97316'],
        ['Ferestre','PVC/AL triplu low-E','#38BDF8'],
        ['Balcoane','Parapet sticla/BA','#D4AF37'],
        ['Acoperiș',_AC.acoperisLabel||'Terasă','#22C55E'],
        ['Soclu','Mozaic granit','#94A3B8'],
      ];
      mats.forEach(([name,spec,col],mi)=>{
        const my = matY+18+mi*18;
        if(my>matY+facadeH-10) return;
        ctx.fillStyle = col+'22'; ctx.fillRect(matX+2,my,106,16);
        ctx.strokeStyle = col+'66'; ctx.lineWidth=.5; ctx.strokeRect(matX+2,my,106,16);
        ctx.fillStyle = col; ctx.fillRect(matX+2,my,3,16);
        ctx.fillStyle = 'rgba(220,232,250,.9)'; ctx.font = 'bold 6px IBM Plex Mono';
        ctx.fillText(name, matX+8, my+6);
        ctx.fillStyle = 'rgba(148,163,184,.8)'; ctx.font = '5.5px IBM Plex Mono';
        ctx.fillText(spec, matX+8, my+13);
      });
    }

    const EW2 = Math.max(3, WALL.EXT*SC);

    // ── Cele 4 fațade ────────────────────────────────────────────────────
    const dirs = [
      {label: P.frontDir+' (PRINCIPALĂ)',     fW:facadeW_NS, isMain:true,  wins:wins_N, wallDir:'N'},
      {label: ({N:'S',S:'N',E:'V',V:'E'}[P.frontDir]||'S')+' (POSTERIOARĂ)',
                                               fW:facadeW_NS, isMain:false, wins:wins_S, wallDir:'S'},
      {label: 'E (LATERALĂ DREAPTĂ)',          fW:facadeW_EV, isMain:false, wins:wins_E, wallDir:'E'},
      {label: 'V (LATERALĂ STÂNGĂ)',           fW:facadeW_EV, isMain:false, wins:wins_V, wallDir:'V'},
    ];

    dirs.forEach(({label,fW,isMain,wins,wallDir}, idx)=>{
      const oy_ = pad + 30 + idx*sectionH;
      const ox_ = pad + 50;
      drawFatada(label, fW, ox_, oy_, isMain, wins, wallDir);
    });

    if(typeof _rvDrawNorth==='function')  _rvDrawNorth(ctx, W-40, 50, P.frontDir);
    if(typeof _rvDrawCartus==='function') _rvDrawCartus(ctx, W, H, P, null, 'TOATE FAȚADELE — N · S · E · V');
  };
}

})(); // end IIFE
