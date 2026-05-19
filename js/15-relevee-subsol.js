// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-subsol.js — Plan Subsol Parcaj + Adăpost ALA
// UrbanX TSS·FG | v3.0 | 19 mai 2026
//
// v3.0 — CORECTĂRI FUNCȚIONALE:
//   ✅ Grila structurală ADAPTATĂ la modulul de parcaj
//      Stâlpii cad EXACT la: y=0, y=LOC_L(5m), y=LOC_L+CULOAR(11m), y=modul(16m)
//      Stâlpii pe X: la fiecare 2 locuri (5m) — ÎNTRE locuri, nu pe ele
//   ✅ Rampa apare în Plan Situație + Fațade (hook _rvSubsolAddRampTo*)
//   ✅ Tabel centralizator SC/SU/SDA pe planșă
//   ✅ Audit funcțional integrat (verifică conflicte stâlpi+locuri)
//   ✅ Adăpost ALA: NP-073/2002 + P118/2-2013
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';
  function waitReady(cb,n){
    n=n||0; if(n>80) return;
    if(typeof _RV==='undefined'||typeof(window.jspdf?.jsPDF||window.jsPDF)==='undefined'){
      setTimeout(()=>waitReady(cb,n+1),300); return;
    }
    cb();
  }
  waitReady(()=>{
    _injectButton();
    const obs=setInterval(()=>{ if(document.getElementById('rv-subsol-btn')){clearInterval(obs);return;} _injectButton(); },1000);
    setTimeout(()=>clearInterval(obs),15000);
    console.log('[Subsol v3] loaded — grilă adaptată parcaj + ALA + centralizator');
  });
  function _injectButton(){
    if(document.getElementById('rv-subsol-btn')) return;
    const anchor=document.querySelector('#rv-planseA3-btn,.rv-expbtn');
    if(!anchor) return;
    const btn=document.createElement('button');
    btn.id='rv-subsol-btn'; btn.innerHTML='🅿 Plan Subsol';
    btn.title='Plan Subsol Parcaj funcțional + ALA + Tabel SC/SU/SDA';
    btn.style.cssText='height:32px;padding:0 11px;border-radius:7px;cursor:pointer;font-family:inherit;font-size:10px;font-weight:800;margin-left:5px;background:rgba(99,102,241,.18);border:1.5px solid rgba(99,102,241,.5);color:#818cf8;display:inline-flex;align-items:center;flex-shrink:0';
    btn.onmouseover=()=>btn.style.opacity='.75';
    btn.onmouseout=()=>btn.style.opacity='1';
    btn.onclick=()=>window._rvExportSubsol?.();
    anchor.parentElement.insertBefore(btn,anchor.nextSibling);
  }
})();

const SUBSOL={
  LOC_W:2.50,LOC_L:5.00,LOC_PMR_W:3.60,LOC_PMR_L:5.00,
  CULOAR:6.00,H_LIBER:2.20,RAMPA_PANTA:15,RAMPA_W:3.60,RAMPA_L:9.00,
  STALP_DIM:0.40,STALP_X_PAS:5.00,
  ALA_MP_PERS:0.75,ALA_H_MIN:2.20,ALA_PERETE:0.30,ALA_PLANSEU:0.25,
  ALA_PRAG:10,PERS_APT:2.5
};

function _calcSubsol(P,b){
  const bW=b.bW,bD=b.bD;
  const floors=_RV.floors||[];
  let nrApt=0;
  floors.forEach(fl=>(fl.rects||[]).forEach(r=>{if(r.apt>=0)nrApt=Math.max(nrApt,r.apt+1);}));
  nrApt=Math.max(nrApt,1);

  const modul=SUBSOL.LOC_L+SUBSOL.CULOAR+SUBSOL.LOC_L; // 16m

  const ala_oblig=nrApt>=SUBSOL.ALA_PRAG;
  const ala_pers=Math.ceil(nrApt*SUBSOL.PERS_APT);
  const ala_sup_min=Math.max(ala_pers*SUBSOL.ALA_MP_PERS,12);
  const ala_adanc=Math.min(bD*0.4,Math.ceil(ala_sup_min/4)+1);
  const ala_lat=Math.ceil(ala_sup_min/ala_adanc*10)/10;
  const ala_sup=Math.round(ala_lat*ala_adanc*100)/100;

  const rampa_zona_w=SUBSOL.RAMPA_W+0.4;
  const rampa_zona_l=SUBSOL.RAMPA_L+0.5;

  // Grilă Y corectă: axele sunt EXACT la marginile locurilor și culoarului
  const axe_y=[0];
  let yc=0;
  while(yc<bD-0.05){
    const nextL=yc+SUBSOL.LOC_L;
    if(nextL<=bD+0.01) axe_y.push(Math.round(nextL*100)/100);
    const nextC=nextL+SUBSOL.CULOAR;
    if(nextC<=bD+0.01) axe_y.push(Math.round(nextC*100)/100);
    const nextR=nextC+SUBSOL.LOC_L;
    if(nextR<=bD+0.01) axe_y.push(Math.round(nextR*100)/100);
    yc=nextR;
  }
  if(axe_y[axe_y.length-1]<bD-0.05) axe_y.push(bD);

  // Grilă X: stâlpi la marginile peretelui + între fiecare 2 locuri (5m)
  const ala_offset_x=ala_oblig?ala_lat+0.3:0;
  const axe_x=[0];
  let xc=ala_offset_x+SUBSOL.STALP_X_PAS;
  while(xc<bW-rampa_zona_w-0.1){
    axe_x.push(Math.round(xc*100)/100);
    xc+=SUBSOL.STALP_X_PAS;
  }
  axe_x.push(bW);

  // Locuri parcaj
  const px_start=ala_offset_x+0.15;
  const px_end=bW-rampa_zona_w-0.15;
  const loc_per_rand=Math.floor((px_end-px_start)/SUBSOL.LOC_W);
  const n_module=Math.floor(bD/modul);
  const locuri_totale=n_module*2*loc_per_rand;
  const pmr_nr=Math.max(1,Math.ceil(locuri_totale*0.04));

  // Verificare conflicte stâlpi vs locuri
  const conflicte=[];
  axe_x.slice(1,-1).forEach(sx=>{
    const dx=sx-ala_offset_x;
    if(dx>0){
      const posX=dx%SUBSOL.LOC_W;
      if(posX>0.08&&posX<SUBSOL.LOC_W-0.08)
        conflicte.push(`stâlp x=${sx}m taie loc`);
    }
  });
  axe_y.forEach(sy=>{
    const posY=sy%modul;
    if(posY>0.08&&posY<SUBSOL.LOC_L-0.08)
      conflicte.push(`stâlp y=${sy}m în rând 1`);
    if(posY>SUBSOL.LOC_L+SUBSOL.CULOAR+0.08&&posY<modul-0.08)
      conflicte.push(`stâlp y=${sy}m în rând 2`);
  });

  const sc_subsol=bW*bD;
  const su_util=Math.round(Math.max(sc_subsol-(ala_oblig?ala_sup:0)-rampa_zona_w*rampa_zona_l*0.5-8-(bW*2+bD*2)*0.15,0)*100)/100;

  return{bW,bD,nrApt,floors_n:floors.length,modul,axe_y,axe_x,
    ala_oblig,ala_pers,ala_sup,ala_lat,ala_adanc,ala_offset_x,
    rampa_zona_w,rampa_zona_l,px_start,px_end,
    loc_per_rand,n_module,locuri_totale,pmr_nr,
    sc_subsol,su_util,conflicte,ok:conflicte.length===0};
}

function _auditFunctional(calc){
  const issues=[],ok=[];
  if(calc.conflicte.length===0) ok.push('Stâlpi: nu blochează locuri');
  else issues.push('Stâlpi în locuri: '+calc.conflicte.join('; '));
  if(calc.pmr_nr/Math.max(calc.locuri_totale,1)*100>=4) ok.push(`PMR: ${calc.pmr_nr}loc OK`);
  else issues.push(`PMR insuficiente`);
  if(calc.ala_oblig) ok.push(`ALA: ${calc.ala_sup.toFixed(0)}m² pt.${calc.ala_pers}p`);
  if(calc.locuri_totale>=calc.nrApt) ok.push(`Parcaje: ${calc.locuri_totale}≥${calc.nrApt} necesare`);
  else issues.push(`Parcaje insuficiente: ${calc.locuri_totale}<${calc.nrApt}`);
  ok.push(`Rampă: ${SUBSOL.RAMPA_W}m, i≤${SUBSOL.RAMPA_PANTA}%`);
  return{ok,issues,pass:issues.length===0};
}

function _drawSubsol(pdf,P,b,C,calc,ox,oy,sc){
  const{bW,bD,axe_y,axe_x,ala_oblig,ala_lat,ala_adanc,ala_offset_x,
        n_module,loc_per_rand,modul,locuri_totale,pmr_nr,
        rampa_zona_w,rampa_zona_l,px_start}=calc;
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();

  // Fundal parcelă
  pdf.setFillColor(235,240,230);
  pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.4);pdf.setLineDashPattern([2.5,1.5],0);
  pdf.rect(ox-P.rl*sc,oy-P.rf*sc,P.W*sc,P.D*sc,'FD');pdf.setLineDashPattern([],0);

  // Fundal subsol
  pdf.setFillColor(218,224,232);pdf.rect(ox,oy,bW*sc,bD*sc,'F');

  // Grilă ajutătoare
  pdf.setDrawColor(185,195,210);pdf.setLineWidth(0.1);pdf.setLineDashPattern([1.2,2],0);
  axe_x.forEach(gx=>pdf.line(ox+gx*sc,oy-3,ox+gx*sc,oy+bD*sc+3));
  axe_y.forEach(gy=>pdf.line(ox-3,oy+gy*sc,ox+bW*sc+3,oy+gy*sc));
  pdf.setLineDashPattern([],0);

  // Bule axe
  const bR=2.5;
  axe_x.forEach((gx,i)=>{
    [oy-bR*2.2,oy+bD*sc+bR*2.2].forEach(gy2=>{
      pdf.setFillColor(255,255,255);pdf.setDrawColor(25,45,95);pdf.setLineWidth(0.25);
      pdf.circle(ox+gx*sc,gy2,bR,'FD');
      pdf.setTextColor(15,35,85);pdf.setFont('helvetica','bold');pdf.setFontSize(3.2);
      pdf.text(String(i+1),ox+gx*sc,gy2+1,{align:'center'});
    });
  });
  axe_y.forEach((gy,i)=>{
    const l=String.fromCharCode(65+i);
    [ox-bR*2.2,ox+bW*sc+bR*2.2].forEach(gx2=>{
      pdf.setFillColor(255,255,255);pdf.setDrawColor(25,45,95);pdf.setLineWidth(0.25);
      pdf.circle(gx2,oy+gy*sc,bR,'FD');
      pdf.setTextColor(15,35,85);pdf.setFont('helvetica','bold');pdf.setFontSize(3.2);
      pdf.text(l,gx2,oy+gy*sc+1,{align:'center'});
    });
  });

  // STÂLPI — grilă adaptată, cu diagonale (nu fill negru)
  const cSz=SUBSOL.STALP_DIM*sc,cH=cSz/2;
  axe_x.forEach(gx=>axe_y.forEach(gy=>{
    const cx=ox+gx*sc,cy=oy+gy*sc;
    pdf.setFillColor(82,98,122);pdf.setDrawColor(12,22,48);pdf.setLineWidth(0.5);
    pdf.rect(cx-cH,cy-cH,cSz,cSz,'FD');
    pdf.setDrawColor(162,175,195);pdf.setLineWidth(0.2);
    pdf.line(cx-cH,cy-cH,cx+cH,cy+cH);pdf.line(cx+cH,cy-cH,cx-cH,cy+cH);
    if(cSz>=4){
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');
      pdf.setFontSize(Math.min(2.8,cSz*0.42));pdf.text('S',cx,cy+0.8,{align:'center'});
    }
  }));

  // LOCURI DE PARCARE
  const lw=SUBSOL.LOC_W*sc,ll=SUBSOL.LOC_L*sc,cul=SUBSOL.CULOAR*sc;
  let locNr=0,pmrCount=0;
  for(let m=0;m<n_module;m++){
    const my=oy+m*modul*sc;
    // Rând 1
    for(let p=0;p<loc_per_rand;p++){
      locNr++;const isPMR=pmrCount<pmr_nr;
      const lx=ox+px_start*sc+p*lw;
      const lw2=isPMR?SUBSOL.LOC_PMR_W*sc:lw;
      if(lx+lw2>ox+bW*sc-rampa_zona_w*sc-0.5)break;
      pdf.setFillColor(isPMR?212:240,isPMR?228:244,isPMR?255:250);
      pdf.setDrawColor(68,88,128);pdf.setLineWidth(0.28);pdf.rect(lx,my,lw2,ll,'FD');
      pdf.setTextColor(42,62,108);pdf.setFont('helvetica','bold');pdf.setFontSize(Math.min(4.5,lw2*0.44));
      pdf.text(String(locNr),lx+lw2/2,my+ll/2-1.5,{align:'center'});
      if(isPMR){pdf.setTextColor(8,68,195);pdf.setFontSize(Math.min(5.5,lw2*0.55));pdf.text('♿',lx+lw2/2,my+ll/2+2.5,{align:'center'});pmrCount++;}
    }
    // Culoar
    const culY=my+ll,culX=ox+px_start*sc,culW=(bW-px_start-rampa_zona_w-0.15)*sc;
    pdf.setFillColor(198,208,222);pdf.rect(culX,culY,culW,cul,'F');
    pdf.setDrawColor(52,72,108);pdf.setLineWidth(0.2);pdf.rect(culX,culY,culW,cul,'S');
    // Săgeți dublu sens
    const aY1=culY+cul*0.33,aY2=culY+cul*0.67,aX1=culX+5,aX2=culX+culW-5;
    pdf.setDrawColor(32,52,98);pdf.setLineWidth(0.45);
    pdf.line(aX1,aY1,aX2,aY1);pdf.line(aX2-3.5,aY1-2,aX2,aY1);pdf.line(aX2-3.5,aY1+2,aX2,aY1);
    pdf.line(aX2,aY2,aX1,aY2);pdf.line(aX1+3.5,aY2-2,aX1,aY2);pdf.line(aX1+3.5,aY2+2,aX1,aY2);
    pdf.setTextColor(32,52,98);pdf.setFont('helvetica','normal');pdf.setFontSize(3.8);
    pdf.text(`CULOAR ${SUBSOL.CULOAR}m — DUBLU SENS`,culX+culW/2,culY+cul/2+0.8,{align:'center'});
    // Rând 2
    for(let p=0;p<loc_per_rand;p++){
      locNr++;const isPMR=pmrCount<pmr_nr;
      const lx=ox+px_start*sc+p*lw,ly=culY+cul;
      const lw2=isPMR?SUBSOL.LOC_PMR_W*sc:lw;
      if(lx+lw2>ox+bW*sc-rampa_zona_w*sc-0.5||ly+ll>oy+bD*sc+0.5)break;
      pdf.setFillColor(isPMR?212:240,isPMR?228:244,isPMR?255:250);
      pdf.setDrawColor(68,88,128);pdf.setLineWidth(0.28);pdf.rect(lx,ly,lw2,ll,'FD');
      pdf.setTextColor(42,62,108);pdf.setFont('helvetica','bold');pdf.setFontSize(Math.min(4.5,lw2*0.44));
      pdf.text(String(locNr),lx+lw2/2,ly+ll/2-1.5,{align:'center'});
      if(isPMR){pdf.setTextColor(8,68,195);pdf.setFontSize(Math.min(5.5,lw2*0.55));pdf.text('♿',lx+lw2/2,ly+ll/2+2.5,{align:'center'});pmrCount++;}
    }
  }

  // RAMPĂ AUTO
  const rx=ox+(bW-rampa_zona_w)*sc,ry=oy+bD*sc-rampa_zona_l*sc;
  const rw=(rampa_zona_w-0.1)*sc,rl=(rampa_zona_l-0.1)*sc;
  pdf.setFillColor(185,196,212);pdf.setDrawColor(38,58,98);pdf.setLineWidth(0.6);
  pdf.rect(rx,ry,rw,rl,'FD');
  pdf.setDrawColor(152,168,188);pdf.setLineWidth(0.2);
  for(let h=0;h<rl+rw;h+=3.5){
    const x1=Math.max(rx,rx+h-rl),y1=rx+h-rl<rx?ry+(rx-(rx+h-rl)):ry;
    const x2=Math.min(rx+rw,rx+h),y2=x2===rx+rw?ry+(rx+rw-(rx+h-rl)):ry+rl;
    if(x1<rx+rw&&x2>rx)pdf.line(x1,y1,x2,y2);
  }
  const arRX=rx+rw/2;
  pdf.setDrawColor(18,42,98);pdf.setLineWidth(0.7);
  pdf.line(arRX,ry+rl*0.85,arRX,ry+rl*0.1);
  pdf.line(arRX-3,ry+rl*0.2,arRX,ry+rl*0.1);pdf.line(arRX+3,ry+rl*0.2,arRX,ry+rl*0.1);
  pdf.setTextColor(12,38,98);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
  pdf.text('RAMPĂ',arRX,ry+rl*0.45,{align:'center'});
  pdf.setFont('helvetica','normal');pdf.setFontSize(4);
  pdf.text(`i≤${SUBSOL.RAMPA_PANTA}%`,arRX,ry+rl*0.57,{align:'center'});
  pdf.text(`L=${SUBSOL.RAMPA_L}m`,arRX,ry+rl*0.67,{align:'center'});
  pdf.text(`l=${SUBSOL.RAMPA_W}m`,arRX,ry+rl*0.77,{align:'center'});
  pdf.setFillColor(148,162,182);pdf.rect(rx,oy+bD*sc,rw,3.5,'F');
  pdf.setTextColor(12,35,78);pdf.setFont('helvetica','bold');pdf.setFontSize(3.5);
  pdf.text('↑ IEȘ.RAMPĂ',arRX,oy+bD*sc+3,{align:'center'});

  // ADĂPOST ALA
  if(ala_oblig){
    const{ala_lat:al,ala_adanc:ad}=calc;
    const ax=ox+0.15*sc,ay=oy+0.15*sc,aw=al*sc,adh=ad*sc,pw=SUBSOL.ALA_PERETE*sc;
    pdf.setFillColor(38,50,68);pdf.rect(ax,ay,aw,adh,'F');
    pdf.setDrawColor(168,182,202);pdf.setLineWidth(0.12);
    [[ax,ay,aw,pw],[ax,ay+adh-pw,aw,pw],[ax,ay,pw,adh],[ax+aw-pw,ay,pw,adh]].forEach(([rx2,ry2,rw2,rh2])=>{
      for(let h=-rh2;h<rw2+rh2;h+=1.5){
        const x1=Math.max(rx2,rx2+h),y1=rx2+h<rx2?ry2+(rx2-rx2-h):ry2;
        const x2=Math.min(rx2+rw2,rx2+h+rh2),y2=x2===rx2+rw2?ry2+(rx2+rw2-(rx2+h)):ry2+rh2;
        if(x1<rx2+rw2&&x2>rx2&&y1<ry2+rh2&&y2>ry2)pdf.line(x1,y1,x2,y2);
      }
    });
    pdf.setFillColor(236,242,255);pdf.rect(ax+pw,ay+pw,aw-2*pw,adh-2*pw,'F');
    pdf.setDrawColor(22,48,118);pdf.setLineWidth(0.7);pdf.rect(ax,ay,aw,adh,'S');
    const ix=ax+pw+1,iy=ay+pw+1,iw=aw-2*pw-2,ih=adh-2*pw-2;
    pdf.setFillColor(198,218,248);pdf.setDrawColor(28,68,158);pdf.setLineWidth(0.3);
    pdf.rect(ix,iy,Math.min(iw*0.35,6),Math.min(ih*0.4,5),'FD');
    pdf.setTextColor(18,52,142);pdf.setFont('helvetica','bold');pdf.setFontSize(2.5);
    pdf.text('FILTRU',ix+Math.min(iw*0.35,6)/2,iy+Math.min(ih*0.4,5)/2+0.5,{align:'center'});
    pdf.setFillColor(212,230,255);pdf.setLineWidth(0.3);
    pdf.rect(ix+iw*0.55,iy,Math.min(iw*0.35,5),Math.min(ih*0.4,5),'FD');
    pdf.text('GS',ix+iw*0.55+Math.min(iw*0.35,5)/2,iy+Math.min(ih*0.4,5)/2+0.5,{align:'center'});
    pdf.setTextColor(12,42,118);pdf.setFont('helvetica','bold');
    pdf.setFontSize(Math.min(5.5,aw/5.5));
    pdf.text('ADĂPOST ALA',ax+aw/2,ay+adh/2,{align:'center'});
    pdf.setFont('helvetica','normal');pdf.setFontSize(Math.min(4,aw/7));
    pdf.text(`${calc.ala_pers}p · ${calc.ala_sup.toFixed(0)}m²`,ax+aw/2,ay+adh/2+3.5,{align:'center'});
    pdf.setFontSize(2.8);
    pdf.text('NP-073 · P118',ax+aw/2,ay+adh/2+6.5,{align:'center'});
    pdf.setTextColor(168,22,22);pdf.setFont('helvetica','bold');pdf.setFontSize(3);
    pdf.text('↑ IEȘ.URG.',ax+aw/2,ay-1.5,{align:'center'});
    // Ușă ALA
    const uY=ay+adh-pw;
    pdf.setDrawColor(12,32,88);pdf.setLineWidth(0.5);
    pdf.line(ax+aw/2-2.5,uY,ax+aw/2+2.5,uY);
    let px2=ax+aw/2-2.5,py2=uY;
    for(let a=0.08;a<=Math.PI/2;a+=0.08){const nx=ax+aw/2-2.5+5*Math.sin(a),ny=uY+5*(1-Math.cos(a));pdf.line(px2,py2,nx,ny);px2=nx;py2=ny;}
  }

  // COTE
  const dimY=oy+bD*sc+10;
  pdf.setDrawColor(20,38,88);pdf.setTextColor(15,35,88);
  pdf.setLineWidth(0.4);pdf.line(ox,dimY,ox+bW*sc,dimY);
  pdf.line(ox,dimY-2,ox,dimY+2);pdf.line(ox+bW*sc,dimY-2,ox+bW*sc,dimY+2);
  pdf.setFont('helvetica','bold');pdf.setFontSize(5);
  pdf.text(`${bW.toFixed(2)} m`,ox+bW*sc/2,dimY+4,{align:'center'});
  // Cotă modul parcaj
  const dimX2=ox-18;
  for(let m=0;m<n_module;m++){
    const my=oy+m*modul*sc;
    pdf.setLineWidth(0.18);pdf.setFontSize(3.2);
    pdf.line(dimX2,my,dimX2,my+SUBSOL.LOC_L*sc);
    pdf.text(`${SUBSOL.LOC_L}m`,dimX2-3,my+SUBSOL.LOC_L*sc/2,{align:'center',angle:90});
    pdf.line(dimX2,my+SUBSOL.LOC_L*sc,dimX2,my+(SUBSOL.LOC_L+SUBSOL.CULOAR)*sc);
    pdf.text(`${SUBSOL.CULOAR}m`,dimX2-3,my+(SUBSOL.LOC_L+SUBSOL.CULOAR/2)*sc,{align:'center',angle:90});
    pdf.line(dimX2,my+(SUBSOL.LOC_L+SUBSOL.CULOAR)*sc,dimX2,my+modul*sc);
    pdf.text(`${SUBSOL.LOC_L}m`,dimX2-3,my+(SUBSOL.LOC_L+SUBSOL.CULOAR+SUBSOL.LOC_L/2)*sc,{align:'center',angle:90});
  }
  // Cotă Y total
  const dimX=ox-12;
  pdf.setLineWidth(0.4);pdf.line(dimX,oy,dimX,oy+bD*sc);
  pdf.line(dimX-2,oy,dimX+2,oy);pdf.line(dimX-2,oy+bD*sc,dimX+2,oy+bD*sc);
  pdf.setFont('helvetica','bold');pdf.setFontSize(5);
  pdf.text(`${bD.toFixed(2)} m`,dimX-4,oy+bD*sc/2,{align:'center',angle:90});
  // Cotă lățime loc
  pdf.setLineWidth(0.18);pdf.setFontSize(3.2);
  pdf.line(ox+px_start*sc,oy-4,ox+px_start*sc+SUBSOL.LOC_W*sc,oy-4);
  pdf.line(ox+px_start*sc,oy-2.5,ox+px_start*sc,oy-5.5);
  pdf.line(ox+px_start*sc+SUBSOL.LOC_W*sc,oy-2.5,ox+px_start*sc+SUBSOL.LOC_W*sc,oy-5.5);
  pdf.setTextColor(15,35,88);pdf.text(`${SUBSOL.LOC_W}m`,ox+px_start*sc+SUBSOL.LOC_W*sc/2,oy-6,{align:'center'});
}

function _drawCentralizator(pdf,P,b,C,calc,ox,oy){
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  const RN=(n,d=2)=>isNaN(+n)?'—':Number(n).toFixed(d);
  const floors=_RV.floors||[];
  const TW=155,RH=5.8,cols=[42,28,28,57];
  let tx=ox,ty=oy;
  pdf.setFillColor(12,22,52);pdf.rect(tx,ty,TW,8,'F');
  pdf.setFillColor(178,138,28);pdf.rect(tx,ty+7.5,TW,0.6,'F');
  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
  pdf.text('CENTRALIZATOR SUPRAFEȚE',tx+TW/2,ty+5.2,{align:'center'});ty+=9;
  const hdrs=['NIVEL','SC (m²)','SU (m²)','OBSERVAȚII'];
  pdf.setFillColor(226,232,248);pdf.rect(tx,ty,TW,RH,'F');
  let cx=tx;
  hdrs.forEach((h,i)=>{pdf.setDrawColor(142,158,182);pdf.setLineWidth(0.15);pdf.rect(cx,ty,cols[i],RH,'S');pdf.setTextColor(22,46,98);pdf.setFont('helvetica','bold');pdf.setFontSize(5.2);pdf.text(S2(h),cx+cols[i]/2,ty+RH*0.67,{align:'center'});cx+=cols[i];});ty+=RH;
  const rows=[{label:'SUBSOL (S-1)',sc:RN(calc.sc_subsol),su:RN(calc.su_util),note:`${calc.locuri_totale}loc+${calc.pmr_nr}PMR${calc.ala_oblig?' +ALA':''}`}];
  floors.forEach((fl,i)=>{if(!fl||!fl.rects)return;const sc_n=b.bW*b.bD,su_n=(fl.rects||[]).reduce((s,r)=>r.t==='core'?s:s+r.w*r.h,0);rows.push({label:i===0?'PARTER (P)':`ETAJ ${i} (E${i})`,sc:RN(sc_n),su:RN(su_n,2),note:''});});
  const tot_sc=b.bW*b.bD*(floors.length+1),tot_su=rows.reduce((s,r)=>s+parseFloat(r.su||0),0);
  rows.forEach((row,i)=>{
    pdf.setFillColor(i%2===0?251:246,i%2===0?251:247,i%2===0?255:252);pdf.rect(tx,ty,TW,RH,'F');cx=tx;
    [S2(row.label),row.sc,row.su,S2(row.note)].forEach((v,ci)=>{pdf.setDrawColor(175,190,212);pdf.setLineWidth(0.1);pdf.rect(cx,ty,cols[ci],RH,'S');pdf.setTextColor(ci===0?12:48,ci===0?32:65,ci===0?78:105);pdf.setFont('helvetica',ci===0?'bold':'normal');pdf.setFontSize(4.8);pdf.text(S2(String(v)),ci===0?cx+2:cx+cols[ci]/2,ty+RH*0.67,{align:ci===0?'left':'center'});cx+=cols[ci];});ty+=RH;
  });
  pdf.setDrawColor(42,62,112);pdf.setLineWidth(0.35);pdf.line(tx,ty,tx+TW,ty);ty+=0.4;
  pdf.setFillColor(220,228,246);pdf.rect(tx,ty,TW,RH,'F');cx=tx;
  ['TOTAL',RN(tot_sc,2),RN(tot_su,2),''].forEach((v,ci)=>{pdf.setDrawColor(145,160,192);pdf.setLineWidth(0.12);pdf.rect(cx,ty,cols[ci],RH,'S');pdf.setTextColor(10,26,75);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(v),ci===0?cx+2:cx+cols[ci]/2,ty+RH*0.67,{align:ci===0?'left':'center'});cx+=cols[ci];});ty+=RH+1;
  pdf.setFillColor(10,20,50);pdf.rect(tx,ty,TW,7.5,'F');
  pdf.setTextColor(210,173,52);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
  pdf.text('SDA (Suprafață Desfășurată):',tx+3,ty+5);pdf.text(RN(tot_sc,2)+' m²',tx+TW-3,ty+5,{align:'right'});ty+=9;
  pdf.setFillColor(230,238,252);pdf.setDrawColor(138,162,208);pdf.setLineWidth(0.2);pdf.rect(tx,ty,TW,20,'FD');
  pdf.setTextColor(16,40,96);pdf.setFont('helvetica','bold');pdf.setFontSize(5.2);pdf.text('PARCAJ',tx+3,ty+4.5);
  pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);
  [`Total: ${calc.locuri_totale}loc | PMR: ${calc.pmr_nr} (≥4% NP051)`,`Loc std: ${SUBSOL.LOC_W}×${SUBSOL.LOC_L}m | PMR: ${SUBSOL.LOC_PMR_W}×${SUBSOL.LOC_PMR_L}m`,`Culoar: ${SUBSOL.CULOAR}m dublu sens | H liber: ≥${SUBSOL.H_LIBER}m`,`Rampă: l=${SUBSOL.RAMPA_W}m · L=${SUBSOL.RAMPA_L}m · i≤${SUBSOL.RAMPA_PANTA}% (NP051)`].forEach((l,i)=>{pdf.setTextColor(20,46,108);pdf.text(S2(l),tx+3,ty+8.5+i*3);});ty+=22;
  if(calc.ala_oblig){
    pdf.setFillColor(226,237,255);pdf.setDrawColor(42,78,172);pdf.setLineWidth(0.3);pdf.rect(tx,ty,TW,19,'FD');
    pdf.setTextColor(16,48,138);pdf.setFont('helvetica','bold');pdf.setFontSize(5.2);pdf.text('ADĂPOST ALA — NP-073/2002 + P118/2-2013',tx+3,ty+4.5);
    pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);
    [`Obligatoriu ✅ — ${calc.nrApt} ap. (prag ≥${SUBSOL.ALA_PRAG})`,`Capacitate: ${calc.ala_pers}p | Suprafață: ${calc.ala_sup.toFixed(1)}m²`,`Pereți BA ≥${SUBSOL.ALA_PERETE*100}cm | Planșeu BA ≥${SUBSOL.ALA_PLANSEU*100}cm | H≥${SUBSOL.ALA_H_MIN}m`,`Dotări: filtru chimic · gr.sanitar · apă · ventilație mecanică`].forEach((l,i)=>{pdf.setTextColor(18,50,145);pdf.text(S2(l),tx+3,ty+8.5+i*3);});ty+=21;
  }
  pdf.setTextColor(108,126,148);pdf.setFont('helvetica','italic');pdf.setFontSize(3.8);
  pdf.text(S2('SC=Suprafață Construită | SU=Suprafață Utilă | SDA=Suprafață Desfășurată Totală'),tx+TW/2,ty+2,{align:'center'});
}

function _drawLegenda(pdf,ox,oy){
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  let ly=oy;const lw=48;
  pdf.setFillColor(241,245,252);pdf.setDrawColor(145,162,192);pdf.setLineWidth(0.2);pdf.rect(ox,ly,lw,68,'FD');
  pdf.setTextColor(16,38,98);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text('LEGENDĂ',ox+lw/2,ly+4.5,{align:'center'});ly+=7.5;
  const items=[
    {fill:[82,98,122],stroke:[12,22,48],label:'Stâlp struct. BA 40×40cm',hatch:true,x:true},
    {fill:[240,244,250],stroke:[68,88,128],label:'Loc parcare std 2.5×5m',hatch:false},
    {fill:[212,228,255],stroke:[38,78,158],label:'Loc PMR ♿ 3.6×5m (NP051)',hatch:false},
    {fill:[38,50,68],stroke:[22,48,118],label:'Perete ALA (BA ≥30cm)',hatch:true},
    {fill:[236,242,255],stroke:[28,68,158],label:'Interior adăpost ALA',hatch:false},
    {fill:[185,196,212],stroke:[38,58,98],label:'Rampă auto (i≤15%)',hatch:true},
    {fill:[198,208,222],stroke:[52,72,108],label:'Culoar circulație 6m',hatch:false},
  ];
  items.forEach(it=>{
    pdf.setFillColor(...it.fill);pdf.setDrawColor(...it.stroke);pdf.setLineWidth(0.3);pdf.rect(ox+3,ly-2,6,4.5,'FD');
    if(it.hatch){pdf.setDrawColor(168,182,202);pdf.setLineWidth(0.12);for(let h=-4.5;h<6+4.5;h+=1.5){const x1=Math.max(ox+3,ox+3+h),y1=ox+3+h<ox+3?ly-2+(ox+3-(ox+3+h)):ly-2;const x2=Math.min(ox+9,ox+3+h+4.5),y2=x2===ox+9?ly-2+(ox+9-(ox+3+h)):ly+2.5;if(x1<ox+9&&x2>ox+3&&y1<ly+2.5&&y2>ly-2)pdf.line(x1,y1,x2,y2);};}
    if(it.x){pdf.setDrawColor(160,175,195);pdf.setLineWidth(0.2);pdf.line(ox+3,ly-2,ox+9,ly+2.5);pdf.line(ox+9,ly-2,ox+3,ly+2.5);}
    pdf.setTextColor(26,48,102);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);pdf.text(S2(it.label),ox+11,ly+0.8);ly+=7.5;
  });
}

window._rvExportSubsol=async function(){
  const P=_RV.parcelParams,b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
  if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  const btn=document.getElementById('rv-subsol-btn');
  if(btn){btn.innerHTML='⏳ Subsol…';btn.style.opacity='.6';}
  if(typeof ss==='function')ss('⏳ Generez Plan Subsol funcțional…');

  const calc=_calcSubsol(P,b);
  const audit=_auditFunctional(calc);
  console.log('[Subsol v3] AUDIT FUNCȚIONAL:');
  audit.ok.forEach(m=>console.log(' ✅',m));
  audit.issues.forEach(m=>console.warn(' ❌',m));

  const W=420,H=297;
  const _jsPDF2=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
  const pdf=new _jsPDF2({orientation:'landscape',unit:'mm',format:'a3'});
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim().slice(0,400);
  const C={black:[10,15,25],white:[255,255,255],gold:[178,138,28],dark2:[12,22,50],gray:[118,128,142],gray2:[202,208,216],red:[178,28,28]};
  const SCALES=[50,100,150,200,250,500];
  const pickSc=(dM,mM)=>SCALES.find(s=>s>=dM*1000/mM)||SCALES[SCALES.length-1];
  const SC_RATIO=pickSc(Math.max(b.bW+P.rl*2,b.bD+P.rf+P.rs),Math.min(W*0.52,H-22));
  const sc=1000/SC_RATIO,scLabel='Sc. 1:'+SC_RATIO;

  // Header
  pdf.setFillColor(...C.dark2);pdf.rect(0,0,W,9,'F');
  pdf.setFillColor(...C.gold);pdf.rect(0,8.5,W,0.7,'F');
  pdf.setFillColor(...C.gold);pdf.roundedRect(3,1.5,7,6,1,1,'F');
  pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('UX',6.5,6.2,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(8.5);pdf.text('01  PLAN SUBSOL PARCAJ + ADĂPOST ALA',13,6);
  pdf.setTextColor(198,208,228);pdf.setFont('helvetica','normal');pdf.setFontSize(5.8);
  pdf.text(S2(`${scLabel} · Nr.cad.${P.nrCad} · UTR ${P.utr} · ${calc.locuri_totale}loc. parcaj · NP-073/2002 · P118/2-2013`),W-4,6,{align:'right'});
  // Audit badge
  if(audit.pass){pdf.setFillColor(18,138,58);pdf.roundedRect(W-24,1.5,22,5,1,1,'F');pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(4);pdf.text('✅ PLAN CORECT',W-13,5,{align:'center'});}
  else{pdf.setFillColor(178,28,28);pdf.roundedRect(W-28,1.5,26,5,1,1,'F');pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(4);pdf.text('⚠ '+audit.issues.length+' PROB.',W-15,5,{align:'center'});}
  // Footer
  pdf.setFillColor(241,244,250);pdf.rect(0,H-5.5,W,5.5,'F');
  pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.15);pdf.line(0,H-5.5,W,H-5.5);
  pdf.setTextColor(108,122,142);pdf.setFont('helvetica','italic');pdf.setFontSize(4.5);
  pdf.text(S2(`Nr.cad.${P.nrCad} · UTR:${P.utr} · UrbanX TSS·FG · Grilă structurală adaptată funcțiunii de parcaj · Document orientativ`),W/2,H-1.5,{align:'center'});

  const ox=42,oy=13;
  _drawSubsol(pdf,P,b,C,calc,ox,oy,sc);

  const legX=ox+b.bW*sc+(P.rl||0)*sc+8;
  if(legX<W-52)_drawLegenda(pdf,legX,oy);
  const tabX=legX<W-52?legX:ox,tabY=legX<W-52?oy+70:oy+b.bD*sc+(P.rs||0)*sc+20;
  _drawCentralizator(pdf,P,b,C,calc,tabX,tabY);

  // Nord
  const nX=ox+b.bW*sc/2,nY=oy-7;
  pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray);pdf.setLineWidth(0.3);pdf.circle(nX,nY,4.5,'FD');
  pdf.setFillColor(...C.red);try{pdf.triangle(nX,nY,nX-1.8,nY+3,nX+1.8,nY+3,'F');}catch(e){}
  pdf.setTextColor(...C.red);pdf.setFont('helvetica','bold');pdf.setFontSize(4);pdf.text('N',nX,nY-5,{align:'center'});

  // Scară
  const scBarX=ox,scBarY=oy+b.bD*sc+(P.rs||0)*sc+16,barLen=5*sc;
  pdf.setFillColor(...C.dark2);pdf.rect(scBarX,scBarY,barLen/2,1.8,'F');
  pdf.setFillColor(255,255,255);pdf.rect(scBarX+barLen/2,scBarY,barLen/2,1.8,'F');
  pdf.setDrawColor(...C.dark2);pdf.setLineWidth(0.4);pdf.rect(scBarX,scBarY,barLen,1.8,'S');
  pdf.setTextColor(48,68,98);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
  pdf.text('0',scBarX,scBarY+5);pdf.text('5m',scBarX+barLen,scBarY+5,{align:'right'});
  pdf.text(S2(scLabel),scBarX+barLen/2,scBarY+7.5,{align:'center'});

  const fn=('subsol_parcaj_'+S2(P.nrCad||'urbanx')+'_'+S2(P.utr||'UTR')+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
  if(typeof ss==='function')ss(`🅿 Subsol v3: ${calc.locuri_totale}loc(${calc.pmr_nr}PMR)${calc.ala_oblig?' +ALA':''}${audit.pass?' ✅ Plan corect':' ⚠ '+audit.issues[0]} · ${fn}`);
  if(btn){btn.innerHTML='🅿 Plan Subsol';btn.style.opacity='1';}
};

// Hook pentru Plan Situație — adaugă rampa
window._rvSubsolAddRampaToSitePlan=function(pdf,P,b,ox,oy,sc,C){
  if(!P||!b)return;
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  const rw=SUBSOL.RAMPA_W*sc,rx=ox+(b.bW-SUBSOL.RAMPA_W)*sc,ry=oy+b.bD*sc;
  pdf.setDrawColor(38,58,118);pdf.setLineWidth(0.6);pdf.setLineDashPattern([2,1.5],0);
  pdf.line(rx,ry,rx,ry+SUBSOL.RAMPA_L*sc*0.28);pdf.line(rx+rw,ry,rx+rw,ry+SUBSOL.RAMPA_L*sc*0.28);
  pdf.setLineDashPattern([],0);
  pdf.setLineWidth(0.5);const arX=rx+rw/2;
  pdf.line(arX,ry,arX,ry+SUBSOL.RAMPA_L*sc*0.22);
  pdf.line(arX-2,ry+SUBSOL.RAMPA_L*sc*0.18,arX,ry+SUBSOL.RAMPA_L*sc*0.22);
  pdf.line(arX+2,ry+SUBSOL.RAMPA_L*sc*0.18,arX,ry+SUBSOL.RAMPA_L*sc*0.22);
  pdf.setTextColor(22,48,118);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
  pdf.text(S2('INTRARE SUBSOL'),arX,ry+SUBSOL.RAMPA_L*sc*0.3,{align:'center'});
  pdf.setFont('helvetica','normal');pdf.setFontSize(3.8);
  pdf.text(S2(`l=${SUBSOL.RAMPA_W}m · i≤${SUBSOL.RAMPA_PANTA}%`),arX,ry+SUBSOL.RAMPA_L*sc*0.3+4,{align:'center'});
  // Cotă lățime rampă
  const cY=ry+SUBSOL.RAMPA_L*sc*0.36;
  pdf.setLineWidth(0.2);pdf.line(rx,cY,rx+rw,cY);pdf.line(rx,cY-1.5,rx,cY+1.5);pdf.line(rx+rw,cY-1.5,rx+rw,cY+1.5);
  pdf.setFontSize(3.5);pdf.text(SUBSOL.RAMPA_W.toFixed(1)+'m',arX,cY+3,{align:'center'});
};

// Hook pentru Fațade — adaugă secțiunea rampei
window._rvSubsolAddRampaToFatada=function(pdf,fatadaType,P,b,ox,oy,sc,C){
  if(!P||!b)return;
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  const fH=b.niv*(P.hn||3.0)*sc;
  const subH=3.0*sc; // h subsol estimat
  const rw=SUBSOL.RAMPA_W*sc,rx=ox+(b.bW-SUBSOL.RAMPA_W)*sc;
  const ryT=oy+fH; // nivel teren
  const ryS=ryT+subH; // nivel subsol
  // Linie nivel subsol
  pdf.setDrawColor(28,48,108);pdf.setLineWidth(0.35);pdf.setLineDashPattern([2.5,1.5],0);
  pdf.line(ox-5,ryS,ox+b.bW*sc+5,ryS);pdf.setLineDashPattern([],0);
  // Rampa ca trapez în secțiune
  pdf.setFillColor(182,195,212);pdf.setDrawColor(35,55,98);pdf.setLineWidth(0.5);
  pdf.line(rx,ryT,rx,ryS);pdf.line(rx+rw,ryT,rx+rw,ryS);
  pdf.line(rx,ryS,rx+rw,ryS);
  // Linie oblică rampă
  pdf.setDrawColor(22,42,88);pdf.setLineWidth(0.6);pdf.line(rx,ryT,rx+rw,ryS);
  // Etichete
  pdf.setTextColor(18,42,108);pdf.setFont('helvetica','bold');pdf.setFontSize(4);
  pdf.text(S2(`RAMPĂ i≤${SUBSOL.RAMPA_PANTA}%`),rx+rw/2,ryT+(ryS-ryT)*0.5,{align:'center'});
  pdf.setTextColor(28,52,128);pdf.setFont('helvetica','italic');pdf.setFontSize(3.8);
  pdf.text(S2('±0.00 NIVEL TEREN'),ox+5,ryT+1.5);
  pdf.text(S2(`-${(3.0).toFixed(2)} NIVEL SUBSOL`),ox+5,ryS+1.5);
  // Cotă H subsol
  const cX=ox-8;
  pdf.setDrawColor(20,38,88);pdf.setLineWidth(0.2);
  pdf.line(cX,ryT,cX,ryS);pdf.line(cX-2,ryT,cX+2,ryT);pdf.line(cX-2,ryS,cX+2,ryS);
  pdf.setFont('helvetica','bold');pdf.setFontSize(3.8);
  pdf.text('-3.00m',cX-5,(ryT+ryS)/2,{align:'center',angle:90});
};
