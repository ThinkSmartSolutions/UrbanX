// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-walls-patch.js — Patch v2.0 pentru 15-relevee-walls.js
// UrbanX TSS·FG | 19 mai 2026
//
// FIXURI APLICATE:
//   ✅ Uși cu arc vizibil corect (direcție swing stânga/dreapta/sus/jos)
//   ✅ Culori distincte borduri per apartament în PDF și SVG
//   ✅ Legendă apartamente în planul cu pereți
//   ✅ Arc ușă SVG corectat (path ArcTo corect)
//
// UTILIZARE: Include după 15-relevee-walls.js
//   <script src="js/15-relevee-walls.js"></script>
//   <script src="js/15-relevee-walls-patch.js"></script>
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';

  // ── Paleta culori per apartament (borduri distincte) ─────────────────────
  // Index 0 = spații comune, 1-8 = apartamente
  const APT_COLORS = [
    [120,130,150],   // 0 — comun (gri)
    [59, 130,246],   // 1 — albastru
    [16, 185,129],   // 2 — verde
    [245,158, 11],   // 3 — portocaliu
    [139, 92,246],   // 4 — violet
    [239, 68, 68],   // 5 — roșu
    [20, 184,166],   // 6 — teal
    [236,115, 55],   // 7 — coral
    [99, 179,237],   // 8 — albastru deschis
  ];

  const APT_COLORS_HEX = [
    '#78828e','#3b82f6','#10b981','#f59e0b',
    '#8b5cf6','#ef4444','#14b8a6','#ec7337','#63b3ed',
  ];

  // Obține culoarea unui apartament după index
  function _aptColor(aptIdx){
    if(aptIdx == null || aptIdx < 0) return APT_COLORS[0];
    return APT_COLORS[(aptIdx % (APT_COLORS.length - 1)) + 1];
  }
  function _aptColorHex(aptIdx){
    if(aptIdx == null || aptIdx < 0) return APT_COLORS_HEX[0];
    return APT_COLORS_HEX[(aptIdx % (APT_COLORS_HEX.length - 1)) + 1];
  }

  // ── Desenare arc ușă corect (jsPDF) ──────────────────────────────────────
  // pdf    — instanță jsPDF
  // hinge  — [x,y] punctul de rotație (balamaua)
  // leaf   — lungimea foii ușii (în mm pe pagină)
  // angle  — unghi de deschidere (implicit 90°)
  // swing  — 'left'|'right'|'up'|'down' — direcția de deschidere
  function _drawDoorArc(pdf, hinge, leaf, angle, swing){
    angle = angle || Math.PI/2;
    swing = swing || 'left';
    const [hx,hy] = hinge;
    const steps = Math.ceil(angle / 0.05);
    const dA = angle / steps;

    pdf.setLineWidth(0.22);

    // Arc 90° din punctul de balamală (hinge)
    // Foaia pornește pe axa perpendicularității peretelui și se rotește 90°
    // swing determină sensul de rotație (spre care cameră se deschide)
    //
    // Convention (axă H = perete orizontal):
    //   'down'  — deschidere spre interior/jos (perete pe latura N)
    //   'up'    — deschidere spre interior/sus (perete pe latura S)
    // Convention (axă V = perete vertical):
    //   'right' — deschidere spre interior/dreapta (perete pe latura V)
    //   'left'  — deschidere spre interior/stânga  (perete pe latura E)

    let startAngle;
    switch(swing){
      case 'right': startAngle = Math.PI;       break; // foaia merge dreapta
      case 'up':    startAngle = Math.PI/2;     break; // foaia merge sus
      case 'down':  startAngle = -Math.PI/2;    break; // foaia merge jos
      case 'left':
      default:      startAngle = 0;             break; // left — foaia merge stânga
    }

    let prevX = hx + leaf*Math.cos(startAngle);
    let prevY = hy + leaf*Math.sin(startAngle);

    for(let i=1;i<=steps;i++){
      const a = startAngle + i*dA;
      const nx = hx + leaf*Math.cos(a);
      const ny = hy + leaf*Math.sin(a);
      pdf.line(prevX,prevY,nx,ny);
      prevX=nx; prevY=ny;
    }
  }

  // ── Versiune îmbunătățită _drawPlanWalls ─────────────────────────────────
  // Suprascrie funcția originală cu suport pentru:
  //   - borduri colorate per apartament
  //   - arc ușă cu direcție corectă
  //   - legendă apartamente
  window._drawPlanWallsV2 = function(pdf, fl, P, b, ox, oy, sc, C){
    const bW=b.bW, bD=b.bD;
    const EW=0.28*sc, IW=0.14*sc;
    const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();

    // Fundal parcelă
    pdf.setFillColor(240,245,235);
    pdf.setDrawColor(...C.gold); pdf.setLineWidth(0.4); pdf.setLineDashPattern([2.5,1.5],0);
    pdf.rect(ox-P.rl*sc,oy-P.rf*sc,P.W*sc,P.D*sc,'FD');
    pdf.setLineDashPattern([],0);

    // Fundal clădire
    pdf.setFillColor(255,255,255);
    pdf.rect(ox,oy,bW*sc,bD*sc,'F');

    // Grilă structurală
    const nGX=Math.max(3,Math.round(bW/4.5));
    const nGY=Math.max(2,Math.round(bD/3.8));
    const gSpX=bW/nGX, gSpY=bD/nGY, bubR=Math.min(3,sc*0.55);
    pdf.setDrawColor(210,218,230); pdf.setLineWidth(0.1); pdf.setLineDashPattern([1.2,1.8],0);
    for(let i=0;i<=nGX;i++){const gx=ox+i*gSpX*sc; pdf.line(gx,oy-bubR*3,gx,oy+bD*sc+bubR*3);}
    for(let i=0;i<=nGY;i++){const gy=oy+i*gSpY*sc; pdf.line(ox-bubR*3,gy,ox+bW*sc+bubR*3,gy);}
    pdf.setLineDashPattern([],0);

    // Bule axe
    for(let i=0;i<=nGX;i++){
      const gx=ox+i*gSpX*sc;
      [oy-bubR*2.3,oy+bD*sc+bubR*2.3].forEach(gy2=>{
        pdf.setFillColor(255,255,255); pdf.setDrawColor(25,45,95); pdf.setLineWidth(0.3);
        pdf.circle(gx,gy2,bubR,'FD');
        pdf.setTextColor(15,35,85); pdf.setFont('helvetica','bold'); pdf.setFontSize(Math.min(3.8,bubR*1.2));
        pdf.text(String(i+1),gx,gy2+1.1,{align:'center'});
      });
    }
    for(let i=0;i<=nGY;i++){
      const gy=oy+i*gSpY*sc, ltr=String.fromCharCode(65+i);
      [ox-bubR*2.3,ox+bW*sc+bubR*2.3].forEach(gx2=>{
        pdf.setFillColor(255,255,255); pdf.setDrawColor(25,45,95); pdf.setLineWidth(0.3);
        pdf.circle(gx2,gy,bubR,'FD');
        pdf.setTextColor(15,35,85); pdf.setFont('helvetica','bold'); pdf.setFontSize(Math.min(3.8,bubR*1.2));
        pdf.text(ltr,gx2,gy+1.1,{align:'center'});
      });
    }

    // Stâlpi
    const colSz=Math.max(0.9,0.38*sc);
    for(let i=0;i<=nGX;i++) for(let j=0;j<=nGY;j++){
      const cx=ox+i*gSpX*sc, cy=oy+j*gSpY*sc;
      if(cx<=ox+bW*sc+0.5&&cy<=oy+bD*sc+0.5){
        pdf.setFillColor(18,38,80); pdf.rect(cx-colSz/2,cy-colSz/2,colSz,colSz,'F');
      }
    }

    // Fundal camere cu culori discrete
    const CM={living:[255,252,244],bedroom:[248,255,250],bedroom2:[248,255,250],bedroom3:[248,255,250],
      kitchen:[245,250,255],bath:[250,245,255],wc:[250,245,255],hall:[248,248,252],
      storage:[248,248,250],core:[232,240,255],office:[245,250,255],
      commercial:[255,245,248],balcon:[255,252,235],meeting:[255,250,244]};

    // ✅ Colectăm apartamente unice pentru legendă
    const aptSet = new Set();
    fl.rects.forEach(r=>{ if(r.apt>=0) aptSet.add(r.apt); });

    fl.rects.forEach(r=>{
      if(r.t==='core') return;
      const rx=ox+r.x*sc, ry=oy+r.y*sc, rw=r.w*sc, rh=r.h*sc;
      if(rw<0.5||rh<0.5) return;
      const fc=CM[r.t]||[252,252,254];
      pdf.setFillColor(...fc);
      if(r.bal){
        pdf.setLineDashPattern([2,1.5],0);
        pdf.setDrawColor(180,160,30); pdf.setLineWidth(0.3);
        pdf.rect(rx,ry,rw,rh,'FD');
        pdf.setLineDashPattern([],0);
      } else {
        pdf.rect(rx,ry,rw,rh,'F');
      }

      // ✅ Bordură colorată per apartament
      if(r.apt>=0){
        const ac = _aptColor(r.apt);
        pdf.setDrawColor(...ac);
        pdf.setLineWidth(0.55);
        pdf.rect(rx,ry,rw,rh,'S');
      }
    });

    // Nuclee scări
    fl.rects.filter(r=>r.t==='core').forEach(c=>{
      const rx=ox+c.x*sc, ry=oy+c.y*sc, rw=c.w*sc, rh=c.h*sc;
      pdf.setFillColor(230,240,255); pdf.setDrawColor(40,70,150); pdf.setLineWidth(0.5);
      pdf.rect(rx,ry,rw,rh,'FD');
      const sp=Math.max(1.8,0.35*sc);
      pdf.setDrawColor(55,90,175); pdf.setLineWidth(0.18);
      for(let hi=-(rh);hi<rw+rh;hi+=sp){
        const x1=Math.max(rx,rx+hi),y1=rx+hi<rx?ry+(rx-rx-hi):ry;
        const x2=Math.min(rx+rw,rx+hi+rh),y2=x2===rx+rw?ry+(rx+rw-(rx+hi)):ry+rh;
        if(x1<rx+rw&&x2>rx) pdf.line(x1,y1,x2,y2);
      }
      // Lift + scări (identic cu originalul)
      const lW=Math.min(rw*.42,3*sc), lH=Math.min(rh*.55,3.5*sc);
      const lx=rx+rw*.52, ly=ry+rh*.18;
      pdf.setFillColor(215,230,255); pdf.setDrawColor(35,75,165); pdf.setLineWidth(0.5);
      pdf.rect(lx,ly,lW,lH,'FD');
      pdf.setDrawColor(70,115,200); pdf.setLineWidth(0.25);
      pdf.line(lx,ly,lx+lW,ly+lH); pdf.line(lx+lW,ly,lx,ly+lH);
      const stX=rx+rw*.04,stY=ry+rh*.08,stW=rw*.44,stH=rh*.78;
      const nSt=Math.max(5,Math.floor(stH/2.2));
      pdf.setFillColor(235,242,255); pdf.setDrawColor(35,65,145); pdf.setLineWidth(0.35);
      pdf.rect(stX,stY,stW,stH,'FD');
      pdf.setDrawColor(55,85,165); pdf.setLineWidth(0.18);
      for(let si=1;si<nSt;si++) pdf.line(stX,stY+si*(stH/nSt),stX+stW,stY+si*(stH/nSt));
      pdf.setDrawColor(25,55,140); pdf.setLineWidth(0.45);
      const arY=stY+stH*.5;
      pdf.line(stX+stW*.2,arY,stX+stW*.78,arY);
      pdf.line(stX+stW*.58,arY-1.2,stX+stW*.78,arY);
      pdf.line(stX+stW*.58,arY+1.2,stX+stW*.78,arY);
    });

    // Pereți
    const walls = typeof _extractWalls==='function'
      ? _extractWalls(fl.rects,bW,bD,fl.wins||[],fl.doors||[],0.28,0.14)
      : [];

    walls.forEach(w=>{
      const thick=(w.type==='ext'?EW:IW);
      const half=thick/2;

      if(w.type==='win'){
        pdf.setDrawColor(30,125,185); pdf.setLineWidth(0.45);
        if(w.axis==='H'){
          const py=oy+w.y1*sc;
          [-half,0,half].forEach(off=>pdf.line(ox+w.x1*sc,py+off,ox+w.x2*sc,py+off));
        } else {
          const px=ox+w.x1*sc;
          [-half,0,half].forEach(off=>pdf.line(px+off,oy+w.y1*sc,px+off,oy+w.y2*sc));
        }
        return;
      }

      if(w.type==='door'){
        // ✅ FIX: Arc cu direcție corectă
        pdf.setDrawColor(10,20,50); pdf.setLineWidth(0.5);

        if(w.axis==='H'){
          const py=oy+w.y1*sc;
          const dx1=ox+w.x1*sc, dx2=ox+w.x2*sc, dw=dx2-dx1;
          pdf.line(dx1,py,dx2,py);

          // Detectăm direcția de deschidere
          // Dacă y1 == 0 (perete N) → deschide spre interior (jos)
          // Dacă y1 == bD (perete S) → deschide spre interior (sus)
          // Default: sus (convenție desenare)
          const towardInterior = (w.y1 < bD/2) ? 1 : -1; // 1=jos, -1=sus
          const swing = towardInterior > 0 ? 'down' : 'up';

          _drawDoorArc(pdf, [dx1,py], dw, Math.PI/2, swing);

        } else {
          const px=ox+w.x1*sc;
          const dy1=oy+w.y1*sc, dy2=oy+w.y2*sc, dh=dy2-dy1;
          pdf.line(px,dy1,px,dy2);

          // Perete vertical: deschidere spre dreapta (interior) sau stânga (exterior)
          const towardInterior = (w.x1 < bW/2) ? 1 : -1; // 1=dreapta, -1=stânga
          const swing = towardInterior > 0 ? 'right' : 'left';

          _drawDoorArc(pdf, [px,dy1], dh, Math.PI/2, swing);
        }
        return;
      }

      // Perete normal
      const isExt=w.type==='ext';
      let rx,ry,rw,rh;
      if(w.axis==='H'){
        rx=ox+w.x1*sc; rw=(w.x2-w.x1)*sc;
        ry=oy+w.y1*sc-half; rh=thick;
      } else {
        ry=oy+w.y1*sc; rh=(w.y2-w.y1)*sc;
        rx=ox+w.x1*sc-half; rw=thick;
      }
      if(rw<0.1||rh<0.1) return;
      pdf.setFillColor(isExt?22:45,isExt?35:58,isExt?65:95);
      pdf.rect(rx,ry,rw,rh,'F');
      if(isExt){
        const sp=Math.max(0.9,thick*.45);
        pdf.setDrawColor(60,75,105); pdf.setLineWidth(0.12);
        for(let hi=-rh;hi<rw+rh;hi+=sp){
          const x1=Math.max(rx,rx+hi),y1=rx+hi<rx?ry+(rx-rx-hi):ry;
          const x2=Math.min(rx+rw,rx+hi+rh),y2=x2===rx+rw?ry+(rx+rw-(rx+hi)):ry+rh;
          if(x1<rx+rw&&x2>rx&&y1>=ry&&y2<=ry+rh+0.1) pdf.line(x1,y1,x2,y2);
        }
      }
    });

    // Etichete camere
    const TN={living:'LIVING',bedroom:'DORMITOR',bedroom2:'DORMITOR 2',bedroom3:'DORMITOR 3',
      kitchen:'BUCĂTĂRIE',bath:'BAIE',wc:'WC',hall:'HOL',storage:'DEPOZITARE',
      core:'SC/LFT',office:'BIROU',meeting:'ȘEDINTE',commercial:'COM.',reception:'RECEPȚIE',balcon:'BALCON'};
    fl.rects.forEach(r=>{
      if(r.t==='core') return;
      const rx=ox+r.x*sc,ry=oy+r.y*sc,rw=r.w*sc,rh=r.h*sc;
      if(rw<5||rh<4.5) return;
      const nm=S2(TN[r.t]||String(r.lbl||r.t).toUpperCase()).replace(/[\u{1F000}-\u{1FAFF}]/gu,'').trim();
      const fsz=Math.min(4.2,rw/7,rh/3.5);
      pdf.setTextColor(15,35,80); pdf.setFont('helvetica','bold'); pdf.setFontSize(fsz);
      pdf.text(S2(nm),rx+rw/2,ry+rh/2-(r.w*r.h>2&&rw>8?fsz*.4:0),{align:'center'});
      if(rw>8&&rh>7&&r.w*r.h>1.5&&!r.bal){
        pdf.setTextColor(80,98,125); pdf.setFont('helvetica','normal'); pdf.setFontSize(Math.min(3.8,fsz*.85));
        pdf.text((r.w*r.h).toFixed(1)+' m²',rx+rw/2,ry+rh/2+fsz*1.0,{align:'center'});
      }
    });

    // Cote lanț X
    const dimY=oy+bD*sc+11;
    pdf.setDrawColor(20,38,88); pdf.setLineWidth(0.25);
    let pGx=ox;
    for(let i=1;i<=nGX;i++){
      const gx=ox+i*gSpX*sc;
      pdf.line(pGx,dimY,gx,dimY);
      pdf.line(pGx,dimY-2,pGx,dimY+2); pdf.line(gx,dimY-2,gx,dimY+2);
      pdf.setTextColor(15,35,88); pdf.setFont('helvetica','normal'); pdf.setFontSize(3.6);
      pdf.text(gSpX.toFixed(2)+' m',(pGx+gx)/2,dimY+4,{align:'center'});
      pGx=gx;
    }
    pdf.setLineWidth(0.5);
    pdf.line(ox,dimY+7,ox+bW*sc,dimY+7);
    pdf.line(ox,dimY+5,ox,dimY+9); pdf.line(ox+bW*sc,dimY+5,ox+bW*sc,dimY+9);
    pdf.setFont('helvetica','bold'); pdf.setFontSize(5);
    pdf.text(bW.toFixed(2)+' m',ox+bW*sc/2,dimY+12,{align:'center'});

    // Cote Y
    const dimX=ox-13;
    let pGy=oy;
    pdf.setLineWidth(0.25);
    for(let i=1;i<=nGY;i++){
      const gy=oy+i*gSpY*sc;
      pdf.line(dimX,pGy,dimX,gy);
      pdf.line(dimX-2,pGy,dimX+2,pGy); pdf.line(dimX-2,gy,dimX+2,gy);
      pdf.setFont('helvetica','normal'); pdf.setFontSize(3.6);
      pdf.text(gSpY.toFixed(2)+' m',dimX-4,(pGy+gy)/2,{align:'center',angle:90});
      pGy=gy;
    }
    pdf.setLineWidth(0.5);
    pdf.line(dimX-8,oy,dimX-8,oy+bD*sc);
    pdf.line(dimX-10,oy,dimX-6,oy); pdf.line(dimX-10,oy+bD*sc,dimX-6,oy+bD*sc);
    pdf.setFont('helvetica','bold'); pdf.setFontSize(5);
    pdf.text(bD.toFixed(2)+' m',dimX-15,oy+bD*sc/2,{align:'center',angle:90});

    // Stradă
    pdf.setFillColor(210,215,228);
    pdf.rect(ox-P.rl*sc,oy+bD*sc+P.rs*sc,P.W*sc,4.5,'F');
    pdf.setTextColor(50,68,110); pdf.setFont('helvetica','bold'); pdf.setFontSize(5);
    pdf.text(S2('▲ FRONT STRADAL · '+(P.frontDir||'N')+'  ·  Nr.cad. '+P.nrCad),
      ox+bW*sc/2,oy+bD*sc+P.rs*sc+3.2,{align:'center'});

    // ✅ Legendă apartamente (dacă există mai mult de unul)
    if(aptSet.size > 1){
      const legX = ox + bW*sc + 8;
      let legY = oy;
      pdf.setFillColor(248,249,252); pdf.setDrawColor(200,210,225); pdf.setLineWidth(0.2);
      pdf.rect(legX-1, legY-1, 28, aptSet.size*6+10, 'FD');
      pdf.setTextColor(15,30,60); pdf.setFont('helvetica','bold'); pdf.setFontSize(5);
      pdf.text('APARTAMENTE', legX+13, legY+4, {align:'center'});
      legY+=7;
      [...aptSet].sort((a,b)=>a-b).forEach(aptIdx=>{
        const col = _aptColor(aptIdx);
        pdf.setFillColor(...col);
        pdf.rect(legX, legY, 4, 4, 'F');
        pdf.setTextColor(15,30,60); pdf.setFont('helvetica','normal'); pdf.setFontSize(4.5);
        pdf.text('APT '+aptIdx, legX+5.5, legY+3.2);
        legY+=6;
      });
    }
  };

  // ── Patch SVG: arc ușă corect ─────────────────────────────────────────────
  // Funcție helper pentru path SVG arc
  window._svgDoorArcPath = function(hx, hy, dw, swing){
    // SVG arc path de la (hx,hy) cu raza dw, unghi 90°
    // swing determină dacă arcul e CW sau CCW și direcția
    let endX, endY, sweepFlag;

    switch(swing){
      case 'right':
        endX = hx + dw; endY = hy - dw; sweepFlag = 0; break;
      case 'down':
        endX = hx + dw; endY = hy + dw; sweepFlag = 1; break;
      case 'up':
        endX = hx - dw; endY = hy - dw; sweepFlag = 0; break;
      case 'left':
      default: // left
        endX = hx - dw; endY = hy + dw; sweepFlag = 1; break;
    }

    return `M${hx.toFixed(1)},${hy.toFixed(1)} A${dw.toFixed(1)},${dw.toFixed(1)} 0 0,${sweepFlag} ${endX.toFixed(1)},${endY.toFixed(1)}`;
  };

  // ── Patchează _rvExportPlanseWalls să folosească V2 ───────────────────────
  const _origExportWalls = window._rvExportPlanseWalls;
  window._rvExportPlanseWalls = async function(){
    const P=_RV?.parcelParams, b=_RV?.building;
    if(!P||!b){alert('Generați releveele mai întâi.');return;}
    const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
    if(!_jsPDF){alert('jsPDF indisponibil.');return;}

    const btn=document.getElementById('rv-walls-btn');
    if(btn){btn.innerHTML='⏳ Pereți…';btn.style.opacity='.6';}
    if(typeof ss==='function') ss('⏳ Generez planșe cu pereți reali + borduri apartamente…');

    const W=420,H=297;
    const pdf=new _jsPDF({orientation:'landscape',unit:'mm',format:'a3'});
    let pgN=0;
    const newPg=()=>{if(pgN>0)pdf.addPage();pgN++;};
    const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim().slice(0,400);
    const C={black:[10,15,25],white:[255,255,255],wall:[12,22,55],gold:[180,140,30],
      dark2:[15,25,50],gray:[120,130,145],gray2:[205,210,218],red:[180,30,30]};
    const SCALES=[50,100,150,200,250,500,1000];
    const pickSc=(dM,mM)=>SCALES.find(s=>s>=dM*1000/mM)||SCALES[SCALES.length-1];
    const aW=W-55,aH=H-30;
    const SC_RATIO=pickSc(Math.max(b.bW+P.rl*2,b.bD+P.rf+P.rs),Math.min(aW,aH));
    const sc=1000/SC_RATIO, scLabel='Sc. 1:'+SC_RATIO;

    const cartus=(nr,titlu,scTxt)=>{
      pdf.setFillColor(...C.dark2);pdf.rect(0,0,W,9,'F');
      pdf.setFillColor(...C.gold);pdf.rect(0,8.5,W,.7,'F');
      pdf.setFillColor(...C.gold);pdf.roundedRect(3,1.5,7,6,1,1,'F');
      pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('UX',6.5,6.2,{align:'center'});
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(9);
      pdf.text(S2(String(nr).padStart(2,'0')+'  '+titlu),13,6);
      pdf.setTextColor(200,210,230);pdf.setFont('helvetica','normal');pdf.setFontSize(6);
      pdf.text(S2((scTxt||scLabel)+'  ·  Nr.cad. '+P.nrCad+'  ·  UTR '+P.utr),W-4,6,{align:'right'});
      pdf.setFillColor(243,245,250);pdf.rect(0,H-5.5,W,5.5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.15);pdf.line(0,H-5.5,W,H-5.5);
      pdf.setTextColor(110,125,145);pdf.setFont('helvetica','italic');pdf.setFontSize(4.5);
      pdf.text(S2('Nr.cad. '+P.nrCad+' · UTR: '+P.utr+' · UrbanX TSS·FG · Document orientativ'),W/2,H-1.5,{align:'center'});
    };

    const drawNord=(x,y,dir,sz)=>{
      sz=sz||7;
      const rot={N:0,S:Math.PI,E:Math.PI/2,V:-Math.PI/2}[dir||'N']||0;
      const p=(a,d)=>[x+Math.sin(a+rot)*d,y-Math.cos(a+rot)*d];
      pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray);pdf.setLineWidth(0.3);pdf.circle(x,y,sz+1,'FD');
      const n=p(0,sz),s2=p(Math.PI,sz);
      pdf.setFillColor(...C.red);
      try{pdf.triangle(x,y,n[0]-sz*.35,n[1],n[0]+sz*.35,n[1],'F');}catch(e){pdf.setDrawColor(...C.red);pdf.setLineWidth(1.5);pdf.line(x,y,n[0],n[1]);}
      pdf.setFillColor(172,180,195);
      try{pdf.triangle(x,y,s2[0]-sz*.35,s2[1],s2[0]+sz*.35,s2[1],'F');}catch(e){}
      pdf.setTextColor(...C.red);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('N',n[0],n[1]-1.5,{align:'center'});
    };

    const drawSc=(x,y,sc_,txt)=>{
      const m5=5*sc_;
      pdf.setFillColor(...C.dark2);pdf.rect(x,y,m5/2,1.5,'F');
      pdf.setFillColor(255,255,255);pdf.rect(x+m5/2,y,m5/2,1.5,'F');
      pdf.setDrawColor(...C.dark2);pdf.setLineWidth(0.35);pdf.rect(x,y,m5,1.5,'S');
      pdf.setTextColor(60,75,95);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
      pdf.text('0',x,y+4);pdf.text('5m',x+m5,y+4,{align:'right'});
      pdf.text(S2(txt),x+m5/2,y+5.5,{align:'center'});
    };

    const fl0=_RV.floors[0]||_RV.floors[_RV.floor];
    const fl1=_RV.floors[1]||fl0;
    const ox0=42, oy0=14;
    const ap=_RV.activeParcel||_RV.ap||null;

    // P1: Plan Parter cu pereți + borduri apartamente
    newPg();pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
    cartus('01','PLAN PARTER — Pereți reali + Borduri apartamente');
    window._drawPlanWallsV2(pdf,fl0,P,b,ox0,oy0,sc,C);
    drawNord(W-18,oy0+10,P.frontDir,7);
    drawSc(ox0,oy0+b.bD*sc+P.rs*sc+22,sc,scLabel);

    // P2: Plan Etaj Tip
    newPg();pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
    cartus('02','PLAN ETAJ TIP (E1-E'+(b.niv-1)+') — Pereți reali');
    window._drawPlanWallsV2(pdf,fl1,P,b,ox0,oy0,sc,C);
    drawNord(W-18,oy0+10,P.frontDir,7);
    drawSc(ox0,oy0+b.bD*sc+P.rs*sc+22,sc,scLabel);

    // P3: Plan Teren
    const scT=pickSc(Math.max(P.W,P.D),W*.28);
    const scTMM=1000/scT;
    newPg();pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
    cartus('03','PLAN INCADRARE IN TEREN — Geometrie reală cadastrală','Sc. 1:'+scT);
    if(typeof _drawSitePlanReal==='function') _drawSitePlanReal(pdf,ap,P,b,20,14,scTMM,C);
    drawNord(20+P.W*scTMM/2,14+P.D*scTMM+13,P.frontDir,7);

    const fn=('planseWalls_v2_'+S2(P.nrCad)+'_'+S2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
    pdf.save(fn);
    if(typeof ss==='function') ss('✅ Planșe v2: 3 pagini · borduri apartamente · arc uși corectat · '+fn+' · '+scLabel);
    if(btn){btn.innerHTML='🏗 Planșe Pereți';btn.style.opacity='1';}
  };

  console.log('[Walls Patch v2] ✅ loaded — uși arc fix + culori apartamente');
})();
