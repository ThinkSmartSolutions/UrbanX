// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-planfix.js — Planuri + Fațade Arhitecturale v2.0
// UrbanX TSS·FG | 09 Iunie 2026
//
// CE FACE:
//   1. Plan nivel — pereți corecți, etichete "s = x,xx mp", mobilier detaliat
//      Identic cu preview_2.webp: hașuri BA, goluri ferestre, uși cu arc 90°
//
//   2. Fațadă — diferențiată VIZUAL per stil din AEDIS, identic cu viewer3D:
//      MODERN:      ferestre PVC late, balcoane cu parapet din sticlă, bandou spandrel
//      INOVATOR:    ferestre full-height, balcoane adânci, panouri negre, bandou violet
//      CLASIC:      pilaștri, cornișe, ferestre cu arc semicircular, fără balcoane
//      MINIMALIST:  ferestre panoramice, zero ornamente, parapet invizibil, benzi fine
//      INDUSTRIAL:  ferestre mici cu zăbrele, pilaștri metalici portocalii, fără balcoane
//      BIROURI:     curtain wall cu mullioni verticali și traverse orizontale per etaj
//      HOTEL:       ferestre individuale per cameră, logii juliet, bandou auriu
//      COMERCIAL:   vitrine înalte cu mullioni, nimic rezidențial la parter
//      Parter diferit vizibil, etaj retras corect, tip acoperiș per stil
//
// REGULI:
//   ✅ Nu atingem _rvFloor(), _rvCompBuilding()
//   ✅ Citim EXCLUSIV din window.AEDIS + _rvGetAEDISConfig()
//   ✅ Se încarcă DUPĂ 15-relevee.js
// ═══════════════════════════════════════════════════════════════════════════

(function(){
'use strict';

function waitReady(cb, n){
  n = n||0; if(n>120) return;
  if(typeof _RV==='undefined' || typeof _rvInitCanvas==='undefined'){
    setTimeout(()=>waitReady(cb,n+1), 200); return;
  }
  cb();
}

waitReady(()=>{
  _patchRenderPlan();
  _patchRenderFacade();
  console.log('[PlanFix v2] ✅ Plan arhitectural + Fațadă per stil AEDIS');
});

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTE
// ═══════════════════════════════════════════════════════════════════════════
const WALL = { EXT:0.30, INT:0.15, CORE:0.25 };

const ROOM_FILL = {
  living:'#FEF3C7',  bedroom:'#DCFCE7',  bedroom2:'#DCFCE7', bedroom3:'#DCFCE7',
  kitchen:'#DBEAFE', bath:'#EDE9FE',     wc:'#F3E8FF',       hall:'#F1F5F9',
  storage:'#F8FAFC', core:'#E2E8F0',     balcon:'#FEFCE8',   commercial:'#FAF5FF',
  office:'#F0FDF4',  meeting:'#FFF7ED',  reception:'#FAF5FF',
};
const ROOM_STROKE = {
  living:'#D97706',  bedroom:'#15803D',  bedroom2:'#15803D', bedroom3:'#15803D',
  kitchen:'#0284C7', bath:'#7C3AED',     wc:'#6D28D9',       hall:'#475569',
  storage:'#94A3B8', core:'#1E3A8A',     balcon:'#CA8A04',   commercial:'#7C3AED',
  office:'#15803D',  meeting:'#EA580C',  reception:'#7C3AED',
};
const ROOM_LBL = {
  living:'CAMERA DE ZI', bedroom:'DORMITOR', bedroom2:'DORMITOR', bedroom3:'DORMITOR',
  kitchen:'BUCĂTĂRIE',   bath:'BAIE',        wc:'WC',             hall:'HOL',
  storage:'DEBARA',      core:'CASA SCĂRILOR', balcon:'BALCON',   commercial:'SPAȚIU COM.',
  office:'BIROU',        meeting:'SALĂ CONF.',reception:'RECEPȚIE',
};

// ═══════════════════════════════════════════════════════════════════════════
// FIX 1 — PLAN NIVEL
// ═══════════════════════════════════════════════════════════════════════════
function _patchRenderPlan(){
  window._rvRenderPlan = function(fl, b){
    if(!fl||!b||!b.P){ return; }
    const {P,bW,bD} = b;
    const SC  = _RV.scale;
    const PAD = 60, DIMS = 42;

    const W = bW*SC + PAD*2 + P.rl*2*SC + DIMS*2 + 180;
    const H = bD*SC + PAD*2 + (P.rf+P.rs)*SC + DIMS*2 + 50;
    const {cv,ctx} = _rvInitCanvas(W, H);
    if(!ctx) return;

    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0,0,W,H);

    const ox = PAD + P.rl*SC + DIMS;
    const oy = PAD + P.rf*SC + DIMS;
    _RV.planOx = ox; _RV.planOy = oy; _RV.planSc = SC;

    const EW = Math.max(3, WALL.EXT*SC);
    const IW = Math.max(2, WALL.INT*SC);
    const CW = Math.max(3, WALL.CORE*SC);

    // Grilă subtilă
    ctx.strokeStyle='rgba(200,210,225,.2)';ctx.lineWidth=.3;
    for(let x=0;x<W;x+=SC){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=SC){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

    // Parcelă
    ctx.strokeStyle='rgba(180,130,30,.35)';ctx.lineWidth=.8;ctx.setLineDash([SC*.5,SC*.5]);
    ctx.strokeRect(PAD+DIMS,PAD+DIMS,P.W*SC,P.D*SC);ctx.setLineDash([]);

    // Fundal clădire
    ctx.fillStyle='#F8FAFC';ctx.fillRect(ox,oy,bW*SC,bD*SC);

    const sorted=[...(fl.rects||[])].sort((a,m)=>(a.zIdx||0)-(m.zIdx||0));

    // ── STRAT 1: umpleri camere ────────────────────────────────────────────
    sorted.forEach(r=>{
      const rx_=ox+r.x*SC,ry_=oy+r.y*SC,rw_=r.w*SC,rh_=r.h*SC;
      const fill=ROOM_FILL[r.t]||'#F1F5F9';
      if(r.bal){
        ctx.fillStyle=fill;ctx.fillRect(rx_,ry_,rw_,rh_);
        ctx.save();ctx.beginPath();ctx.rect(rx_,ry_,rw_,rh_);ctx.clip();
        ctx.strokeStyle='rgba(180,130,30,.25)';ctx.lineWidth=.6;
        for(let i=-rh_;i<rw_+rh_;i+=5){ctx.beginPath();ctx.moveTo(rx_+i,ry_);ctx.lineTo(rx_+i+rh_,ry_+rh_);ctx.stroke();}
        ctx.restore();
      } else {
        ctx.fillStyle=fill;ctx.fillRect(rx_,ry_,rw_,rh_);
      }
    });

    // ── STRAT 2: mobilier ─────────────────────────────────────────────────
    sorted.forEach(r=>{
      if(r.bal||r.apt<0) return;
      const rx_=ox+r.x*SC+2,ry_=oy+r.y*SC+2,rw_=r.w*SC-4,rh_=r.h*SC-4;
      if(rw_<SC*.9||rh_<SC*.9) return;
      _drawMobilier(ctx,r.t,rx_,ry_,rw_,rh_,SC);
    });

    // ── STRAT 3: pereți exteriori ─────────────────────────────────────────
    function hatch45(x,y,w,h){
      ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
      ctx.strokeStyle='rgba(255,255,255,.3)';ctx.lineWidth=.55;
      const sp=Math.max(3,SC*.18);
      for(let i=-(Math.max(w,h));i<w+Math.max(w,h);i+=sp){
        ctx.beginPath();ctx.moveTo(x+i,y);ctx.lineTo(x+i+h,y+h);ctx.stroke();
      }
      ctx.restore();
    }
    ctx.fillStyle='#1A1A2E';
    ctx.fillRect(ox-EW,oy-EW,bW*SC+EW*2,EW);
    ctx.fillRect(ox-EW,oy+bD*SC,bW*SC+EW*2,EW);
    ctx.fillRect(ox-EW,oy-EW,EW,bD*SC+EW*2);
    ctx.fillRect(ox+bW*SC,oy-EW,EW,bD*SC+EW*2);
    hatch45(ox-EW,oy-EW,bW*SC+EW*2,EW);
    hatch45(ox-EW,oy+bD*SC,bW*SC+EW*2,EW);
    hatch45(ox-EW,oy-EW,EW,bD*SC+EW*2);
    hatch45(ox+bW*SC,oy-EW,EW,bD*SC+EW*2);

    // ── STRAT 4: pereți interiori ─────────────────────────────────────────
    sorted.forEach(r=>{
      if(r.bal) return;
      const rx_=ox+r.x*SC,ry_=oy+r.y*SC,rw_=r.w*SC,rh_=r.h*SC;
      const wT = r.t==='core'?CW:IW;
      ctx.fillStyle=r.t==='core'?'#0F172A':'#1E293B';
      ctx.fillRect(rx_,ry_,rw_,wT);ctx.fillRect(rx_,ry_+rh_-wT,rw_,wT);
      ctx.fillRect(rx_,ry_,wT,rh_);ctx.fillRect(rx_+rw_-wT,ry_,wT,rh_);
      if(r.t==='core'){
        hatch45(rx_+wT,ry_+wT,rw_-wT*2,rh_-wT*2);
        _drawScariLift(ctx,rx_+wT+2,ry_+wT+2,(rw_-wT*2)*.55,rh_-wT*2-4);
        _drawLift(ctx,rx_+wT+(rw_-wT*2)*.60,ry_+wT+3,(rw_-wT*2)*.36,Math.min((rw_-wT*2)*.5,rh_-wT*2-6));
      }
    });

    // ── STRAT 5: ferestre ─────────────────────────────────────────────────
    (fl.wins||[]).forEach(w=>{
      const wSC=(w.w||w.h||0)*SC;
      let gx,gy,gw,gh;
      if(w.wall==='N'){gx=ox+w.x*SC;gy=oy-EW;gw=wSC;gh=EW*2;}
      else if(w.wall==='S'){gx=ox+w.x*SC;gy=oy+bD*SC-EW;gw=wSC;gh=EW*2;}
      else if(w.wall==='V'){gx=ox-EW;gy=oy+w.y*SC;gw=EW*2;gh=wSC;}
      else{gx=ox+bW*SC-EW;gy=oy+w.y*SC;gw=EW*2;gh=wSC;}
      ctx.fillStyle='#FFFFFF';ctx.fillRect(gx,gy,gw,gh);
      const isH=(w.wall==='N'||w.wall==='S');
      ctx.strokeStyle='#1E3A5F';ctx.lineWidth=1.5;
      if(isH){
        ctx.beginPath();ctx.moveTo(gx,gy+gh*.15);ctx.lineTo(gx+gw,gy+gh*.15);ctx.stroke();
        ctx.strokeStyle='rgba(56,189,248,.8)';ctx.lineWidth=1.2;
        ctx.beginPath();ctx.moveTo(gx,gy+gh*.50);ctx.lineTo(gx+gw,gy+gh*.50);ctx.stroke();
        ctx.strokeStyle='#1E3A5F';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.moveTo(gx,gy+gh*.85);ctx.lineTo(gx+gw,gy+gh*.85);ctx.stroke();
      } else {
        ctx.beginPath();ctx.moveTo(gx+gw*.15,gy);ctx.lineTo(gx+gw*.15,gy+gh);ctx.stroke();
        ctx.strokeStyle='rgba(56,189,248,.8)';ctx.lineWidth=1.2;
        ctx.beginPath();ctx.moveTo(gx+gw*.50,gy);ctx.lineTo(gx+gw*.50,gy+gh);ctx.stroke();
        ctx.strokeStyle='#1E3A5F';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.moveTo(gx+gw*.85,gy);ctx.lineTo(gx+gw*.85,gy+gh);ctx.stroke();
      }
    });

    // ── STRAT 6: uși ─────────────────────────────────────────────────────
    (fl.doors||[]).forEach(d=>{
      const isMain=d.type==='main',isBalc=d.type==='balcon';
      const dW=d.w*SC;
      const dCol=isMain?'#D97706':isBalc?'#0369A1':'#374151';
      ctx.strokeStyle=dCol;ctx.lineWidth=isMain?2:1.2;
      if(d.axis==='H'){
        const dx2=ox+d.x*SC,dy2=oy+d.y*SC;
        ctx.fillStyle='#FFFFFF';ctx.fillRect(dx2-1,dy2-5,dW+2,10);
        ctx.beginPath();ctx.moveTo(dx2,dy2);ctx.lineTo(dx2+dW,dy2);ctx.stroke();
        ctx.strokeStyle='rgba(55,65,81,.3)';ctx.lineWidth=.7;
        ctx.beginPath();ctx.arc(dx2+dW,dy2,dW,Math.PI,Math.PI*1.5);ctx.stroke();
      } else if(d.axis==='V'){
        const dx2=ox+d.x*SC,dy2=oy+d.y*SC;
        ctx.fillStyle='#FFFFFF';ctx.fillRect(dx2-5,dy2-1,10,dW+2);
        ctx.beginPath();ctx.moveTo(dx2,dy2);ctx.lineTo(dx2,dy2+dW);ctx.stroke();
        ctx.strokeStyle='rgba(55,65,81,.3)';ctx.lineWidth=.7;
        ctx.beginPath();ctx.arc(dx2,dy2+dW,dW,-Math.PI/2,0);ctx.stroke();
      } else if(isMain||d.swing==='out'){
        const dy_d=d.y!==undefined?oy+d.y*SC:oy+bD*SC,dx_d=ox+d.x*SC;
        ctx.fillStyle='#FFFFFF';ctx.fillRect(dx_d-1,dy_d-EW-1,dW+2,EW*2+2);
        ctx.strokeStyle=dCol;ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo(dx_d,dy_d);ctx.lineTo(dx_d+dW,dy_d);ctx.stroke();
        ctx.strokeStyle='rgba(217,119,6,.5)';ctx.lineWidth=1;
        ctx.beginPath();ctx.arc(dx_d,dy_d,dW,-Math.PI/2,0);ctx.stroke();
        if(isMain){
          ctx.fillStyle='#92400E';ctx.font='bold 7px Arial';ctx.textAlign='center';
          ctx.fillText('INTRARE BLOC',dx_d+dW/2,dy_d+14);ctx.textAlign='left';
        }
      }
    });

    // ── STRAT 7: etichete camere ──────────────────────────────────────────
    sorted.forEach(r=>{
      const rx_=ox+r.x*SC,ry_=oy+r.y*SC,rw_=r.w*SC,rh_=r.h*SC;
      if(rw_<18||rh_<12) return;
      const area=(r.w*r.h).toFixed(2).replace('.',',');
      const lbl=ROOM_LBL[r.t]||((r.lbl||r.t).replace('\n',' ').toUpperCase());
      const fs=Math.min(9,Math.max(6,rw_/10));
      ctx.font=`bold ${fs}px Arial`;
      const tw=ctx.measureText(lbl).width;
      const lines=tw>rw_*.88?lbl.split(' '):[lbl];
      ctx.textAlign='center';
      ctx.fillStyle=r.t==='core'?'rgba(255,255,255,.9)':'#1E293B';
      const startY=ry_+rh_/2-(lines.length*(fs+2)+fs)/2+fs;
      lines.forEach((ln,i)=>{ ctx.font=`bold ${fs}px Arial`; ctx.fillText(ln,rx_+rw_/2,startY+i*(fs+2)); });
      if(!r.bal&&r.w*r.h>0.5&&rh_>22){
        ctx.font=`${Math.max(6,fs-1)}px Arial`;
        ctx.fillStyle=r.t==='core'?'rgba(255,255,255,.7)':'rgba(30,41,59,.6)';
        ctx.fillText('s = '+area+' mp',rx_+rw_/2,startY+lines.length*(fs+2)+3);
      }
      ctx.textAlign='left';
    });

    // ── STRAT 8: cote exterioare ──────────────────────────────────────────
    _dimLine(ctx,ox,oy-EW-10,ox+bW*SC,oy-EW-10,bW,'H','#1E3A5F');
    _dimLine(ctx,ox-EW-10,oy,ox-EW-10,oy+bD*SC,bD,'V','#1E3A5F');
    // Cote per bay (N)
    let cxAcc=ox;
    const row0=sorted.filter(r=>r.y<.1&&!r.bal&&r.apt>=0).sort((a,m)=>a.x-m.x);
    const uniq=[];row0.forEach(r=>{if(!uniq.find(u=>Math.abs(u.x-r.x)<.1))uniq.push(r);});
    uniq.forEach(r=>{ _dimLine(ctx,cxAcc,oy-EW-26,cxAcc+r.w*SC,oy-EW-26,r.w,'H','#64748B'); cxAcc+=r.w*SC; });

    // Header
    ctx.fillStyle='#0F172A';ctx.font='bold 11px Arial';
    const flLbl=_RV.floor===0?'PARTER (P)':('ETAJ '+_RV.floor+' (E'+_RV.floor+')');
    const AC=typeof _rvGetAEDISConfig==='function'?_rvGetAEDISConfig():{};
    ctx.fillText(`PLAN ${flLbl} — Nr.cad. ${P.nrCad} · ${bW.toFixed(1)}×${bD.toFixed(1)}m · UTR ${P.utr}`,ox,oy-EW-42);

    // Front stradal
    const stY=oy+bD*SC+EW+22;
    ctx.fillStyle='rgba(37,99,235,.06)';ctx.fillRect(PAD+DIMS,stY,P.W*SC,18);
    ctx.strokeStyle='rgba(37,99,235,.2)';ctx.lineWidth=.7;ctx.strokeRect(PAD+DIMS,stY,P.W*SC,18);
    ctx.fillStyle='#1D4ED8';ctx.font='bold 8px Arial';ctx.textAlign='center';
    ctx.fillText('▲  FRONT STRADAL  ·  '+P.frontDir,PAD+DIMS+P.W*SC/2,stY+12);ctx.textAlign='left';

    // Legendă
    const lgX=ox+bW*SC+EW+20,lgY=oy;
    ctx.fillStyle='#0F172A';ctx.font='bold 8px Arial';ctx.fillText('LEGENDĂ',lgX,lgY+12);
    const lgItems=[
      {col:'#FEF3C7',bc:'#D97706',lbl:'Camera de zi / Living'},
      {col:'#DCFCE7',bc:'#15803D',lbl:'Dormitor'},
      {col:'#DBEAFE',bc:'#0284C7',lbl:'Bucătărie'},
      {col:'#EDE9FE',bc:'#7C3AED',lbl:'Baie / WC'},
      {col:'#F1F5F9',bc:'#475569',lbl:'Hol / Coridor'},
      {col:'#F8FAFC',bc:'#94A3B8',lbl:'Debara / Depozit'},
      {col:'#E2E8F0',bc:'#1E3A8A',lbl:'Casa scărilor + Lift'},
      {col:'#FEFCE8',bc:'#CA8A04',lbl:'Balcon / Terasă'},
    ];
    lgItems.forEach(({col,bc,lbl},i)=>{
      const ly=lgY+22+i*16;
      ctx.fillStyle=col;ctx.fillRect(lgX,ly-9,13,11);
      ctx.strokeStyle=bc;ctx.lineWidth=.7;ctx.strokeRect(lgX,ly-9,13,11);
      ctx.fillStyle='#334155';ctx.font='7px Arial';ctx.fillText(lbl,lgX+17,ly);
    });

    // Cartuș
    const ctX=lgX,ctY=oy+bD*SC-72;
    ctx.fillStyle='rgba(241,245,249,.95)';ctx.fillRect(ctX,ctY,168,68);
    ctx.strokeStyle='#94A3B8';ctx.lineWidth=.7;ctx.strokeRect(ctX,ctY,168,68);
    ctx.fillStyle='#0F172A';ctx.font='bold 7px Arial';ctx.fillText('PLANȘĂ ORIENTATIVĂ',ctX+4,ctY+11);
    ctx.fillStyle='#334155';ctx.font='6px Arial';
    ctx.fillText('Scara: 1:'+Math.round(100/(_RV.scale/12)),ctX+4,ctY+22);
    ctx.fillText('Stil: '+(AC.stilLabel||AC.stil||'—'),ctX+4,ctY+32);
    ctx.fillText('Funcțiune: '+(AC.fnLabel||AC.fn||'—'),ctX+4,ctY+42);
    ctx.fillText('Acoperiș: '+(AC.acoperisLabel||'—'),ctX+4,ctY+52);
    ctx.fillStyle='rgba(30,41,59,.4)';ctx.font='5.5px Arial';
    ctx.fillText('UrbanX TSS·FG · '+new Date().toLocaleDateString('ro-RO'),ctX+4,ctY+63);

    _RV.planOx=ox;_RV.planOy=oy;_RV.planSc=SC;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// FIX 2 — FAȚADĂ diferențiată per stil AEDIS (sync cu viewer3D)
// ═══════════════════════════════════════════════════════════════════════════
function _patchRenderFacade(){
  window._rvRenderFacade = function(b){
    if(!b||!b.P) return;
    const _AC  = typeof _rvGetAEDISConfig==='function' ? _rvGetAEDISConfig() : {};
    const A    = window.AEDIS||{};
    const {P,bW,bD,niv} = b;
    const SC   = _RV.scale*.85;
    const Ht   = niv*P.hn;
    const pad  = 40;

    // ── Config vizual per stil — IDENTIC cu cfgByStil din 11-viewer3d.js ─
    const STIL_CFG = {
      modern:     { wW:1.20,wH:1.55,wGap:1.60,pilW:0,   bandH:0.14,bandCol:'#1e3a6a',
                    glassCol:'rgba(58,128,200,.7)',frameCol:'#90b0cc',panelCol:'#c0d8f0',
                    soclH:0.50,soclCol:'#CBD5E1',cornisaH:0.15,cornisaCol:'#94A3B8',
                    arcFerestre:false,pilastri:false },
      inovator:   { wW:1.40,wH:1.90,wGap:1.50,pilW:0,   bandH:0.18,bandCol:'#3a2880',
                    glassCol:'rgba(32,64,208,.75)',frameCol:'#5060b0',panelCol:'#08102a',
                    soclH:0,   soclCol:'#1E293B',cornisaH:0.10,cornisaCol:'#3a2880',
                    arcFerestre:false,pilastri:false },
      clasic:     { wW:0.80,wH:1.20,wGap:2.00,pilW:0.28,bandH:0.35,bandCol:'#c8a040',
                    glassCol:'rgba(104,120,160,.65)',frameCol:'#d4b860',panelCol:'#e8d090',
                    soclH:0.80,soclCol:'#B8A070',cornisaH:0.30,cornisaCol:'#C8A030',
                    arcFerestre:true, pilastri:true },
      minimalist: { wW:1.65,wH:1.85,wGap:1.70,pilW:0,   bandH:0.05,bandCol:'#d0dce8',
                    glassCol:'rgba(160,200,224,.65)',frameCol:'#e0eaf0',panelCol:'#f0f4f8',
                    soclH:0,   soclCol:'#E2E8F0',cornisaH:0.05,cornisaCol:'#E2E8F0',
                    arcFerestre:false,pilastri:false },
      industrial: { wW:0.80,wH:1.00,wGap:2.20,pilW:0.30,bandH:0.30,bandCol:'#d05010',
                    glassCol:'rgba(56,72,88,.7)',  frameCol:'#905020',panelCol:'#281808',
                    soclH:0.60,soclCol:'#78716C',cornisaH:0.20,cornisaCol:'#905020',
                    arcFerestre:false,pilastri:true },
      adaptat_context:{ wW:1.00,wH:1.40,wGap:1.75,pilW:0.08,bandH:0.20,bandCol:'#4a8040',
                    glassCol:'rgba(80,144,160,.65)',frameCol:'#80a870',panelCol:'#d0e8c0',
                    soclH:0.60,soclCol:'#A8B890',cornisaH:0.18,cornisaCol:'#4a8040',
                    arcFerestre:false,pilastri:false },
    };
    const FN_CFG = {
      birouri:               { curtainForce:true, wW:1.40,wH:2.40,bandCol:'#1e3060',glassCol:'rgba(32,96,160,.8)',soclH:0.60,soclCol:'#94A3B8' },
      hotel:                 { wW:1.00,wH:1.65,bandCol:'#c8a040',glassCol:'rgba(72,120,168,.65)',soclH:0.80,soclCol:'#B8A070' },
      comercial:             { curtainForce:true, wW:2.20,wH:2.60,bandCol:'#1e3060',glassCol:'rgba(96,168,208,.75)',soclH:0 },
      rezidential_colectiv:  { wW:1.10,wH:1.40,glassCol:'rgba(72,136,184,.65)' },
      locuinta_individuala:  { wW:0.90,wH:1.20,glassCol:'rgba(96,144,160,.6)' },
      industrial_depozitare: { wW:1.20,wH:0.80,pilW:0.25,bandCol:'#cc6020',glassCol:'rgba(80,96,112,.65)',soclH:0.60 },
      institutie_publica:    { wW:1.00,wH:1.50,pilW:0.15,bandCol:'#8090b0',glassCol:'rgba(85,128,160,.65)' },
    };

    const stil = A.stil||'modern';
    const fn   = A.fn  ||'rezidential_colectiv';
    const baseC = STIL_CFG[stil] || STIL_CFG.modern;
    const fnC   = FN_CFG[fn]    || {};
    const C = {...baseC,...fnC};

    const isCurtainWall = _AC.hasCurtainWall || C.curtainForce || false;
    const hasBalc   = !isCurtainWall && (_AC.hasBalc !== undefined ? _AC.hasBalc : (baseC.wGap>0 && !fnC.curtainForce));
    const balcD     = _AC.balcD || 0.6;
    const etajRetras= _AC.etajRetras;
    const parterDif = _AC.parterDiferit;
    const fnParterL = _AC.fnParterLabel;
    const tipAcop   = A.tipAcoperis||'terasa_plata';

    // Canvas
    const fNS=bW*SC, fEV=bD*SC, fH=Ht*SC;
    const secH=fH+90;
    const W=Math.max(fNS,fEV)+pad*2+130;
    const H=secH*4+pad;
    const {cv,ctx}=_rvInitCanvas(W,H);
    if(!ctx) return;
    ctx.fillStyle='#F8FAFC';ctx.fillRect(0,0,W,H);

    const EW=Math.max(4,WALL.EXT*SC);

    // ──────────────────────────────────────────────────────────────────────
    // FUNCȚIE PRINCIPALĂ: desenează o fațadă conform stilului AEDIS
    // ──────────────────────────────────────────────────────────────────────
    function drawFatada(label,fW,ox_,oy_,isMain,wallDir){
      // Header label
      ctx.fillStyle='rgba(15,23,42,.85)';ctx.fillRect(ox_-2,oy_-24,fW+4,22);
      ctx.fillStyle='#D4AF37';ctx.font='bold 10px IBM Plex Mono';ctx.textAlign='left';
      ctx.fillText('FAȚADĂ '+label+(isMain?' ◀ PRINCIPALĂ':''),ox_+2,oy_-8);

      // Fundal clădire (culoarea panourilor per stil)
      ctx.fillStyle=C.panelCol||'#FFFFFF';ctx.fillRect(ox_,oy_,fW,fH);

      // ── 1. SOCLU ──────────────────────────────────────────────────────
      const sH=Math.max(0,C.soclH||0)*SC;
      if(sH>1){
        ctx.fillStyle=C.soclCol||'#CBD5E1';
        ctx.fillRect(ox_-4,oy_+fH-sH,fW+8,sH);
        ctx.strokeStyle='rgba(0,0,0,.2)';ctx.lineWidth=.6;
        ctx.strokeRect(ox_-4,oy_+fH-sH,fW+8,sH);
        // Textură granit (linii fine orizontale)
        ctx.strokeStyle='rgba(0,0,0,.08)';ctx.lineWidth=.4;
        for(let si=1;si*4<sH;si++){
          ctx.beginPath();ctx.moveTo(ox_-4,oy_+fH-sH+si*4);ctx.lineTo(ox_+fW+4,oy_+fH-sH+si*4);ctx.stroke();
        }
      }

      // ── 2. PILASTRI VERTICALI (clasic, industrial) ────────────────────
      if(C.pilastri && C.pilW>0){
        const nPil=Math.floor(fW/(C.wGap*SC))+2;
        const pilGap=fW/(nPil-1||1);
        const pilWpx=C.pilW*SC;
        ctx.fillStyle=C.bandCol;
        for(let p=0;p<nPil;p++){
          ctx.fillRect(ox_+p*pilGap-pilWpx/2,oy_,pilWpx,fH-sH);
        }
      }

      // ── 3. BENZI ORIZONTALE (planșee, banduri spandrel) ───────────────
      for(let i=1;i<niv;i++){
        const ly=oy_+fH-i*P.hn*SC;
        const bHpx=Math.max(3,C.bandH*SC);
        ctx.fillStyle=C.bandCol;ctx.fillRect(ox_,ly-bHpx/2,fW,bHpx);
        // Cotă etaj
        ctx.fillStyle='#1D4ED8';ctx.font='7px IBM Plex Mono';ctx.textAlign='right';
        ctx.fillText('+'+(i*P.hn).toFixed(2)+'m',ox_-5,ly+3);
        ctx.fillStyle='#475569';ctx.font='bold 7px IBM Plex Mono';
        ctx.fillText(i===0?'P':`E${i}`,ox_-28,ly+3);
        ctx.textAlign='left';
      }
      // Cornișă vârf
      const cHpx=Math.max(2,C.cornisaH*SC);
      ctx.fillStyle=C.cornisaCol;
      ctx.fillRect(ox_-EW/2,oy_-cHpx,fW+EW,cHpx);

      // ── 4. CURTAIN WALL (birouri, comercial, sau toggle activ) ────────
      if(isCurtainWall){
        _drawCurtainWall(ctx,ox_,oy_,fW,fH,niv,P.hn,SC,C);
      } else {
        // ── 5. FERESTRE individuale per stil ──────────────────────────
        _drawFerestre(ctx,ox_,oy_,fW,fH,niv,P.hn,SC,C,stil,wallDir,b);
      }

      // ── 6. BALCOANE (din AEDIS: hasBalc, balcD, balconLaturi) ────────
      if(hasBalc){
        const laturi=A.balconLaturi||null; // null = toate fațadele
        const thisLatura=wallDir; // N/S/E/V
        const showBalc=!laturi||laturi.length===0||laturi.includes(thisLatura);
        if(showBalc) _drawBalcoane(ctx,ox_,oy_,fW,fH,niv,P.hn,SC,balcD,stil,isCurtainWall);
      }

      // ── 7. PARTER DIFERIT ────────────────────────────────────────────
      if(parterDif && fnParterL){
        const pdH=Math.max(P.hn*SC,SC*1.3);
        const pdY=oy_+fH-pdH;
        ctx.fillStyle='rgba(139,92,246,.08)';ctx.fillRect(ox_,pdY,fW,pdH);
        ctx.strokeStyle='#7C3AED';ctx.lineWidth=1.5;
        ctx.setLineDash([4,3]);ctx.strokeRect(ox_,pdY,fW,pdH);ctx.setLineDash([]);
        ctx.fillStyle='#6D28D9';ctx.font='bold 7px IBM Plex Mono';ctx.textAlign='center';
        ctx.fillText('PARTER: '+fnParterL.toUpperCase().slice(0,22),ox_+fW/2,pdY+pdH*.5);
        ctx.textAlign='left';
        // Geamuri mai mari la parter (vitrine)
        if(!isCurtainWall){
          const nV=Math.max(2,Math.floor(fW/(SC*2.5)));
          const vW=fW/nV*.75,vH=pdH*.7;
          for(let v=0;v<nV;v++){
            const vx=ox_+(v+.5)*fW/nV-vW/2;
            const vy=pdY+(pdH-vH)*.3;
            ctx.fillStyle='rgba(96,168,208,.5)';ctx.fillRect(vx,vy,vW,vH);
            ctx.strokeStyle='#0369A1';ctx.lineWidth=1.2;ctx.strokeRect(vx,vy,vW,vH);
          }
        }
      }

      // ── 8. ETAJ RETRAS (penthouse) ────────────────────────────────────
      if(etajRetras && niv>1){
        const retras=fW*.13;
        ctx.fillStyle='rgba(212,175,55,.2)';
        ctx.fillRect(ox_+retras,oy_,fW-retras*2,P.hn*SC);
        ctx.strokeStyle='#B45309';ctx.lineWidth=2;
        ctx.strokeRect(ox_+retras,oy_,fW-retras*2,P.hn*SC);
        ctx.fillStyle='#92400E';ctx.font='bold 7px IBM Plex Mono';ctx.textAlign='center';
        ctx.fillText('PENTHOUSE / ETAJ RETRAS',ox_+fW/2,oy_+P.hn*SC*.5+3);ctx.textAlign='left';
      }

      // ── 9. ACOPERIȘ vizual (conform tipAcoperis din AEDIS) ───────────
      _drawAcoperis(ctx,ox_,oy_,fW,fH,SC,P.hn,tipAcop,stil,C,EW);

      // ── 10. UȘĂ INTRARE (fațada principală) ──────────────────────────
      if(isMain){
        const dW=2.4*SC,dH=3.0*SC;
        const dX=ox_+fW/2-dW/2,dY=oy_+fH-dH;
        ctx.fillStyle='rgba(245,158,11,.12)';ctx.fillRect(dX,dY,dW,dH);
        ctx.strokeStyle='#F59E0B';ctx.lineWidth=2;ctx.strokeRect(dX,dY,dW,dH);
        ctx.strokeStyle='rgba(245,158,11,.4)';ctx.lineWidth=.8;
        ctx.beginPath();ctx.moveTo(dX+dW/2,dY);ctx.lineTo(dX+dW/2,dY+dH);ctx.stroke();
        ctx.fillStyle='#B45309';ctx.font='bold 7px IBM Plex Mono';ctx.textAlign='center';
        ctx.fillText('INTRARE',dX+dW/2,dY+dH+9);ctx.textAlign='left';
      }

      // ── 11. CONTUR CLĂDIRE + PEREȚI EXTERIORI ────────────────────────
      ctx.fillStyle='#1E293B';
      ctx.fillRect(ox_,oy_,EW,fH);ctx.fillRect(ox_+fW-EW,oy_,EW,fH);
      // Hașuri în pereți exteriori
      function hatchV(x,y,w,h){
        ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
        ctx.strokeStyle='rgba(255,255,255,.25)';ctx.lineWidth=.5;
        for(let i=-(h);i<w+h;i+=4){ctx.beginPath();ctx.moveTo(x+i,y);ctx.lineTo(x+i+h,y+h);ctx.stroke();}
        ctx.restore();
      }
      hatchV(ox_,oy_,EW,fH);hatchV(ox_+fW-EW,oy_,EW,fH);
      ctx.strokeStyle='#1E293B';ctx.lineWidth=2;ctx.strokeRect(ox_,oy_,fW,fH);

      // Sol
      ctx.fillStyle='rgba(148,163,184,.6)';ctx.fillRect(ox_-12,oy_+fH,fW+24,7);
      ctx.strokeStyle='#374151';ctx.lineWidth=2.5;
      ctx.beginPath();ctx.moveTo(ox_-25,oy_+fH);ctx.lineTo(ox_+fW+55,oy_+fH);ctx.stroke();
      ctx.fillStyle='#334155';ctx.font='bold 7px IBM Plex Mono';
      ctx.fillText('COTA ±0.00 (CTN)',ox_,oy_+fH+18);

      // Cotă parter
      ctx.fillStyle='#1D4ED8';ctx.font='7px IBM Plex Mono';ctx.textAlign='right';
      ctx.fillText('±0.00',ox_-5,oy_+fH-2);ctx.fillStyle='#475569';ctx.font='bold 7px IBM Plex Mono';
      ctx.fillText('P',ox_-22,oy_+fH-2);ctx.textAlign='left';

      // Cotă H total
      const cotRX=ox_+fW+30;
      ctx.strokeStyle='#1D4ED8';ctx.lineWidth=.8;
      ctx.beginPath();ctx.moveTo(cotRX,oy_);ctx.lineTo(cotRX,oy_+fH);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cotRX-3,oy_);ctx.lineTo(cotRX+3,oy_);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cotRX-3,oy_+fH);ctx.lineTo(cotRX+3,oy_+fH);ctx.stroke();
      ctx.save();ctx.translate(cotRX+12,oy_+fH/2);ctx.rotate(-Math.PI/2);
      ctx.fillStyle='#1D4ED8';ctx.font='bold 7px IBM Plex Mono';ctx.textAlign='center';
      ctx.fillText('H = '+Ht.toFixed(2)+'m ('+niv+' niv.)',0,0);ctx.restore();

      // Tablou materiale (per stil)
      _drawTablouMateriale(ctx,ox_+fW+55,oy_,fH,C,_AC,stil,fn,A);
    }

    // ── Cele 4 fațade ─────────────────────────────────────────────────────
    const dirs=[
      {label:P.frontDir+' (PRINCIPALĂ)',           fW:fNS,isMain:true, wallDir:'N'},
      {label:({N:'S',S:'N',E:'V',V:'E'}[P.frontDir]||'S')+' (POSTERIOARĂ)',fW:fNS,isMain:false,wallDir:'S'},
      {label:'E (LATERALĂ DREAPTĂ)',               fW:fEV,isMain:false,wallDir:'E'},
      {label:'V (LATERALĂ STÂNGĂ)',                fW:fEV,isMain:false,wallDir:'V'},
    ];
    dirs.forEach(({label,fW,isMain,wallDir},idx)=>{
      const oy_=pad+30+idx*secH, ox_=pad+50;
      drawFatada(label,fW,ox_,oy_,isMain,wallDir);
      if(typeof _rvSubsolAddRampaToFatada==='function')
        _rvSubsolAddRampaToFatada(ctx,wallDir,P,b,ox_,oy_,SC,{gold:[180,140,30],dark2:[15,25,50]});
    });

    if(typeof _rvDrawNorth==='function')  _rvDrawNorth(ctx,W-40,50,P.frontDir);
    if(typeof _rvDrawCartus==='function') _rvDrawCartus(ctx,W,H,P,null,'TOATE FAȚADELE — '+_AC.stilLabel+' · '+_AC.fnLabel);
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPERE DESEN FAȚADĂ
// ═══════════════════════════════════════════════════════════════════════════

// Curtain wall: mullioni + traverse + panouri de sticlă
function _drawCurtainWall(ctx,ox,oy,fW,fH,niv,hn,SC,C){
  const nPanels=Math.max(2,Math.floor(fW/(SC*1.5)));
  const panW=fW/nPanels;
  const mullW=Math.max(2,SC*.05);
  // Geam de fundal
  ctx.fillStyle='rgba(26,40,80,.75)';ctx.fillRect(ox+EW_px(SC),oy,fW-EW_px(SC)*2,fH);
  // Mullioni verticali
  ctx.fillStyle=C.bandCol||'#5070a0';
  for(let p=0;p<=nPanels;p++) ctx.fillRect(ox+p*panW-mullW/2,oy,mullW,fH);
  // Traverse orizontale
  const transH=Math.max(2,SC*.08);
  for(let fl=0;fl<=niv;fl++){
    ctx.fillRect(ox,oy+fH-fl*hn*SC-transH/2,fW,transH);
  }
  // Panouri geam cu variatie
  for(let p=0;p<nPanels;p++){
    for(let fl=0;fl<niv;fl++){
      const gx=ox+p*panW+mullW;
      const gy=oy+fH-(fl+1)*hn*SC+transH;
      const gw=panW-mullW*2;
      const gh=hn*SC-transH*2;
      if(gw<2||gh<2) continue;
      const alpha=.45+Math.sin(p*7+fl*13)*.15;
      ctx.fillStyle=`rgba(42,88,144,${alpha})`;ctx.fillRect(gx,gy,gw,gh);
      ctx.strokeStyle='rgba(80,112,160,.4)';ctx.lineWidth=.5;ctx.strokeRect(gx,gy,gw,gh);
    }
  }
}

function EW_px(SC){ return Math.max(4,0.30*SC); }

// Ferestre individuale — forma variază per stil
function _drawFerestre(ctx,ox,oy,fW,fH,niv,hn,SC,C,stil,wallDir,b){
  const wWpx=C.wW*SC, wHpx=C.wH*SC;
  const nWin=Math.max(1,Math.floor((fW-SC*.5)/(C.wGap*SC)));
  const step=fW/nWin;
  const coreCol=Math.floor(nWin/2);

  for(let fl=0;fl<niv;fl++){
    const flBase=oy+fH-(fl+1)*hn*SC;
    const wY=flBase+(hn*SC-wHpx)*.35;

    for(let wi=0;wi<nWin;wi++){
      const wx=ox+(wi+.5)*step-wWpx/2;

      if(wi===coreCol){
        // Casa scărilor
        ctx.fillStyle='rgba(148,163,184,.2)';
        ctx.fillRect(wx,wY,wWpx*.55,wHpx);
        ctx.strokeStyle='#94A3B8';ctx.lineWidth=.7;
        ctx.strokeRect(wx,wY,wWpx*.55,wHpx);
        continue;
      }

      // Ramă fereastră
      ctx.fillStyle=C.frameCol||'#94A3B8';
      ctx.fillRect(wx-SC*.06,wY-SC*.06,wWpx+SC*.12,wHpx+SC*.12);

      // Geam
      ctx.fillStyle=C.glassCol||'rgba(147,210,250,.6)';
      ctx.fillRect(wx,wY,wWpx,wHpx);
      ctx.strokeStyle=C.frameCol||'#0369A1';ctx.lineWidth=1.5;
      ctx.strokeRect(wx,wY,wWpx,wHpx);

      // Stil specific
      if(stil==='clasic'){
        // Arc semicircular deasupra
        const arcR=wWpx/2;
        ctx.fillStyle=C.glassCol;
        ctx.beginPath();ctx.arc(wx+wWpx/2,wY,arcR,Math.PI,0);ctx.fill();
        ctx.strokeStyle=C.frameCol;ctx.lineWidth=1.5;
        ctx.beginPath();ctx.arc(wx+wWpx/2,wY,arcR,Math.PI,0);ctx.stroke();
        // Profil interior (2 canate)
        ctx.strokeStyle='rgba(0,0,0,.3)';ctx.lineWidth=.7;
        ctx.beginPath();ctx.moveTo(wx+wWpx/2,wY);ctx.lineTo(wx+wWpx/2,wY+wHpx);ctx.stroke();
        ctx.beginPath();ctx.moveTo(wx,wY+wHpx/2);ctx.lineTo(wx+wWpx,wY+wHpx/2);ctx.stroke();
        // Pervaz
        ctx.fillStyle=C.bandCol;ctx.fillRect(wx-SC*.08,wY+wHpx,wWpx+SC*.16,SC*.06);
      } else if(stil==='industrial'){
        // Zăbrele metalice (grilă de 3×4)
        ctx.strokeStyle=C.frameCol;ctx.lineWidth=1;
        for(let gi=1;gi<3;gi++){
          ctx.beginPath();ctx.moveTo(wx+gi*wWpx/3,wY);ctx.lineTo(wx+gi*wWpx/3,wY+wHpx);ctx.stroke();
        }
        for(let gj=1;gj<4;gj++){
          ctx.beginPath();ctx.moveTo(wx,wY+gj*wHpx/4);ctx.lineTo(wx+wWpx,wY+gj*wHpx/4);ctx.stroke();
        }
      } else if(stil==='minimalist'){
        // Zero ornamente — doar linie subțire de contur
        ctx.strokeStyle='rgba(200,220,240,.5)';ctx.lineWidth=.5;
        ctx.strokeRect(wx+1,wY+1,wWpx-2,wHpx-2);
      } else {
        // Modern/inovator/adaptat: 2 canate + traversă
        ctx.strokeStyle='rgba(3,105,161,.35)';ctx.lineWidth=.7;
        ctx.beginPath();ctx.moveTo(wx+wWpx/2,wY);ctx.lineTo(wx+wWpx/2,wY+wHpx);ctx.stroke();
        ctx.beginPath();ctx.moveTo(wx,wY+wHpx*.55);ctx.lineTo(wx+wWpx,wY+wHpx*.55);ctx.stroke();
      }

      // Glaf
      ctx.strokeStyle='#94A3B8';ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(wx-SC*.08,wY+wHpx);ctx.lineTo(wx+wWpx+SC*.08,wY+wHpx);ctx.stroke();
    }
  }
}

// Balcoane — variante per stil
function _drawBalcoane(ctx,ox,oy,fW,fH,niv,hn,SC,balcD,stil,isCurtainWall){
  if(isCurtainWall) return;
  const balcDpx=Math.max(SC*.4,balcD*SC);
  const bH=Math.max(8,hn*SC*.12);

  for(let row=1;row<niv-0;row++){
    const bz=oy+fH-row*hn*SC;
    // Placă
    ctx.fillStyle=stil==='inovator'?'rgba(60,40,128,.3)':'rgba(218,226,235,.9)';
    ctx.fillRect(ox-balcDpx*.5,bz-bH,fW+balcDpx,bH);
    ctx.strokeStyle='#1E293B';ctx.lineWidth=1.8;
    ctx.strokeRect(ox-balcDpx*.5,bz-bH,fW+balcDpx,bH);
    // Pardoseală
    ctx.fillStyle='rgba(148,163,184,.35)';ctx.fillRect(ox-balcDpx*.5,bz-3,fW+balcDpx,3);
    // Parapet
    if(stil==='modern'||stil==='inovator'||stil==='minimalist'){
      // Sticlă
      ctx.fillStyle='rgba(147,210,250,.3)';ctx.fillRect(ox-balcDpx*.5,bz-bH,fW+balcDpx,bH*.7);
      ctx.strokeStyle=stil==='inovator'?'#5060B0':'#0369A1';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(ox-balcDpx*.5,bz-bH+1);ctx.lineTo(ox+fW+balcDpx*.5,bz-bH+1);ctx.stroke();
    } else if(stil==='clasic'){
      // Balustradă cu baluștri
      const nBal=Math.max(3,Math.floor(fW/20));
      ctx.strokeStyle=C_bandCol(C_active);ctx.lineWidth=1;
      for(let bi=0;bi<=nBal;bi++){
        const bx=ox-balcDpx*.5+bi*(fW+balcDpx)/nBal;
        ctx.beginPath();ctx.moveTo(bx,bz);ctx.lineTo(bx,bz-bH);ctx.stroke();
      }
      ctx.strokeStyle=C_bandCol(C_active);ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(ox-balcDpx*.5,bz-bH);ctx.lineTo(ox+fW+balcDpx*.5,bz-bH);ctx.stroke();
    } else {
      // Parapete simple
      ctx.strokeStyle='#0369A1';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(ox-balcDpx*.5,bz-bH+2);ctx.lineTo(ox+fW+balcDpx*.5,bz-bH+2);ctx.stroke();
      const nM=Math.floor(fW/20);
      ctx.lineWidth=1;
      for(let mi=0;mi<=nM;mi++){
        const mx=ox-balcDpx*.5+mi*(fW+balcDpx)/nM;
        ctx.beginPath();ctx.moveTo(mx,bz);ctx.lineTo(mx,bz-bH+2);ctx.stroke();
      }
    }
  }
}

// Variabile globale pentru funcțiile ajutătoare
let C_active={bandCol:'#1e3a6a'};
function C_bandCol(c){return (c&&c.bandCol)||'#1e3a6a';}

// Acoperiș vizual per tipAcoperis + stil
function _drawAcoperis(ctx,ox,oy,fW,fH,SC,hn,tipAcop,stil,C,EW){
  const roofCols={
    modern:'#2a3a50',clasic:'#7c3512',minimalist:'#c8d0d8',
    inovator:'#2a1a60',industrial:'#3a2818',adaptat_context:'#4a6030',
  };
  const rCol=roofCols[stil]||'#2a3a50';

  if(tipAcop==='sarpanta'||tipAcop==='inclinat'){
    // Șarpantă: triunghi deasupra clădirii
    const sH=Math.max(SC*1.5,hn*SC*.7);
    ctx.fillStyle=rCol;
    ctx.beginPath();
    ctx.moveTo(ox-EW,oy);
    ctx.lineTo(ox+fW/2,oy-sH);
    ctx.lineTo(ox+fW+EW,oy);
    ctx.closePath();ctx.fill();
    ctx.strokeStyle='#0F172A';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(ox-EW,oy);ctx.lineTo(ox+fW/2,oy-sH);ctx.lineTo(ox+fW+EW,oy);ctx.stroke();
    // Țigle (linii diagonale)
    ctx.strokeStyle='rgba(255,255,255,.15)';ctx.lineWidth=.5;
    for(let ti=0;ti<fW/8;ti++){
      ctx.beginPath();ctx.moveTo(ox+ti*8,oy);ctx.lineTo(ox+fW/2,oy-sH);ctx.stroke();
    }
  } else if(tipAcop==='mansarda'){
    // Mansardă: trapez
    const ret=fW*.18,mH=hn*SC*.85;
    ctx.fillStyle=rCol;
    ctx.beginPath();
    ctx.moveTo(ox-EW,oy);ctx.lineTo(ox+ret,oy-mH);
    ctx.lineTo(ox+fW-ret,oy-mH);ctx.lineTo(ox+fW+EW,oy);
    ctx.closePath();ctx.fill();
    ctx.strokeStyle='#0F172A';ctx.lineWidth=1.5;ctx.stroke();
    // Ferestre mansardă (lucarne)
    const nLuc=Math.max(1,Math.floor((fW-ret*2)/(SC*3)));
    const lucW=Math.min(SC*1.2,(fW-ret*2)/nLuc*.6);
    const lucH=mH*.55;
    for(let lc=0;lc<nLuc;lc++){
      const lx=ox+ret+(lc+.5)*(fW-ret*2)/nLuc-lucW/2;
      const ly=oy-mH*.3-lucH;
      ctx.fillStyle='rgba(147,210,250,.55)';ctx.fillRect(lx,ly,lucW,lucH);
      ctx.strokeStyle='#94A3B8';ctx.lineWidth=1;ctx.strokeRect(lx,ly,lucW,lucH);
    }
  } else if(tipAcop==='penthouse'||tipAcop==='penthouse_terasa'){
    // Penthouse retras
    const ret=fW*.15,pH=hn*SC;
    ctx.fillStyle='rgba(212,175,55,.2)';
    ctx.fillRect(ox+ret,oy-pH,fW-ret*2,pH);
    ctx.strokeStyle='#B45309';ctx.lineWidth=2;
    ctx.strokeRect(ox+ret,oy-pH,fW-ret*2,pH);
    // Terasă penthouse
    ctx.fillStyle=rCol;
    ctx.fillRect(ox+ret-3,oy-pH-4,fW-ret*2+6,4);
  } else {
    // Terasă plată: parapet + elemente tehnice
    const pHpx=Math.max(5,SC*.45);
    ctx.fillStyle=rCol;
    ctx.fillRect(ox-EW/2,oy-pHpx,fW+EW,pHpx);
    ctx.strokeStyle='#0F172A';ctx.lineWidth=1;
    ctx.strokeRect(ox-EW/2,oy-pHpx,fW+EW,pHpx);
    // Scafă
    ctx.fillStyle=C.cornisaCol||rCol;
    ctx.fillRect(ox-EW/2,oy,fW+EW,SC*.06);
    // Element tehnic (casă lift, ventilație)
    if(fW>SC*5){
      const techW=SC*1.5,techH=SC*.9;
      ctx.fillStyle='#475569';
      ctx.fillRect(ox+fW/2-techW/2,oy-pHpx-techH,techW,techH);
      ctx.strokeStyle='#334155';ctx.lineWidth=.8;
      ctx.strokeRect(ox+fW/2-techW/2,oy-pHpx-techH,techW,techH);
    }
  }
}

// Tablou materiale per stil
function _drawTablouMateriale(ctx,x,y,fH,C,AC,stil,fn,A){
  const mats={
    modern:    [['Pereți ext.','BA20+BCA15+EPS15cm'],['Ferestre','PVC 5cam. triplu low-E'],['Balcoane','Parapet sticlă securizată'],['Finisaj','Tencuiala siliconata'],['Acoperiș',AC.acoperisLabel||'Terasă']],
    inovator:  [['Pereți ext.','BA25+EPS20cm'],['Ferestre','AL full-height low-E'],['Balcoane','Sticlă laminată fără ramă'],['Finisaj','Panouri compozit'],['Acoperiș',AC.acoperisLabel||'Terasă']],
    clasic:    [['Pereți ext.','BCA25+EPS10cm'],['Ferestre','Lemn cu arc 2 canate'],['Ornamente','Stucco pilaștri+cornișe'],['Finisaj','Tencuiala decorativa'],['Acoperiș',AC.acoperisLabel||'Terasă']],
    minimalist:[['Pereți ext.','BA20+EPS15cm'],['Ferestre','AL ultra-slim low-E'],['Balcoane','Parapet sticlă clar'],['Finisaj','Vopsea mata'],['Acoperiș',AC.acoperisLabel||'Terasă']],
    industrial:[['Pereți ext.','BA+prefab. beton'],['Ferestre','Oțel + sticlă zăbrele'],['Pilastri','Profil metalic portocaliu'],['Finisaj','Beton aparent + grund'],['Acoperiș',AC.acoperisLabel||'Terasă']],
  };
  const rows=(mats[stil]||mats.modern);
  const tW=120,rH=14;
  ctx.fillStyle='rgba(15,23,42,.9)';ctx.fillRect(x,y,tW,rows.length*rH+18);
  ctx.strokeStyle='rgba(212,175,55,.2)';ctx.lineWidth=.5;ctx.strokeRect(x,y,tW,rows.length*rH+18);
  ctx.fillStyle='rgba(212,175,55,.15)';ctx.fillRect(x,y,tW,14);
  ctx.fillStyle='#D4AF37';ctx.font='bold 6.5px IBM Plex Mono';ctx.textAlign='center';
  ctx.fillText('MATERIALE FAȚADĂ',x+tW/2,y+10);ctx.textAlign='left';
  rows.forEach(([name,spec],mi)=>{
    const ry=y+18+mi*rH;
    ctx.fillStyle=mi%2===0?'rgba(255,255,255,.04)':'rgba(255,255,255,.01)';
    ctx.fillRect(x,ry,tW,rH);
    ctx.fillStyle='rgba(220,232,250,.85)';ctx.font='bold 5.5px IBM Plex Mono';
    ctx.fillText(name,x+4,ry+6);
    ctx.fillStyle='rgba(148,163,184,.75)';ctx.font='5px IBM Plex Mono';
    ctx.fillText(spec.slice(0,22),x+4,ry+12);
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPERE PLAN
// ═══════════════════════════════════════════════════════════════════════════
function _drawScariLift(ctx,x,y,w,h){
  if(w<6||h<6) return;
  const n=Math.max(4,Math.floor(h/5));
  ctx.strokeStyle='rgba(100,116,139,.5)';ctx.lineWidth=.6;
  for(let i=1;i<=n;i++){
    const ly=y+i*(h/n);
    ctx.beginPath();ctx.moveTo(x,ly);ctx.lineTo(x+w,ly);ctx.stroke();
  }
  ctx.strokeStyle='rgba(100,116,139,.8)';ctx.lineWidth=1;
  const arY=y+h*.45;
  ctx.beginPath();ctx.moveTo(x+w*.2,arY);ctx.lineTo(x+w*.8,arY);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x+w*.6,arY-4);ctx.lineTo(x+w*.8,arY);ctx.lineTo(x+w*.6,arY+4);ctx.stroke();
}
function _drawLift(ctx,x,y,w,h){
  if(w<5||h<5) return;
  ctx.fillStyle='rgba(37,99,235,.12)';ctx.strokeStyle='rgba(96,165,250,.7)';ctx.lineWidth=.8;
  ctx.fillRect(x,y,w,h);ctx.strokeRect(x,y,w,h);
  ctx.strokeStyle='rgba(96,165,250,.4)';ctx.lineWidth=.5;
  ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+w,y+h);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x+w,y);ctx.lineTo(x,y+h);ctx.stroke();
}
function _dimLine(ctx,x1,y1,x2,y2,val,dir,col){
  const isH=Math.abs(y2-y1)<2;
  ctx.strokeStyle=col||'#334155';ctx.lineWidth=.8;
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const tL=5;
  if(isH){
    ctx.beginPath();ctx.moveTo(x1,y1-tL);ctx.lineTo(x1,y1+tL);ctx.stroke();
    ctx.beginPath();ctx.moveTo(x2,y2-tL);ctx.lineTo(x2,y2+tL);ctx.stroke();
  } else {
    ctx.beginPath();ctx.moveTo(x1-tL,y1);ctx.lineTo(x1+tL,y1);ctx.stroke();
    ctx.beginPath();ctx.moveTo(x2-tL,y2);ctx.lineTo(x2+tL,y2);ctx.stroke();
  }
  ctx.fillStyle=col||'#334155';ctx.font='7px Arial';ctx.textAlign='center';
  const lbl=val.toFixed(2).replace('.',',')+'m';
  if(isH) ctx.fillText(lbl,(x1+x2)/2,y1-4);
  else { ctx.save();ctx.translate((x1+x2)/2-10,(y1+y2)/2);ctx.rotate(-Math.PI/2);ctx.fillText(lbl,0,0);ctx.restore(); }
  ctx.textAlign='left';
}
function _drawMobilier(ctx,t,rx,ry,rw,rh,SC){
  ctx.save();
  ctx.strokeStyle='rgba(30,41,59,.45)';ctx.fillStyle='rgba(30,41,59,.05)';ctx.lineWidth=.8;
  if(t==='living'){
    const sw=Math.min(rw*.68,SC*2.2),sh=Math.min(rh*.28,SC*.85);
    const sx=rx+rw/2-sw/2,sy=ry+rh-sh-4;
    ctx.fillRect(sx,sy,sw,sh);ctx.strokeRect(sx,sy,sw,sh);
    ctx.strokeRect(sx,sy,sh*.5,sh);ctx.strokeRect(sx+sw-sh*.5,sy,sh*.5,sh);
    const tw=sw*.45,td=Math.min(sh*.65,SC*.55);
    ctx.strokeRect(rx+rw/2-tw/2,sy-td-4,tw,td);
    if(rw>SC*1.8){const tvW=rw*.5,tvH=SC*.1;ctx.fillStyle='rgba(30,41,59,.12)';ctx.fillRect(rx+rw/2-tvW/2,ry+3,tvW,tvH);ctx.strokeRect(rx+rw/2-tvW/2,ry+3,tvW,tvH);}
  } else if(t==='bedroom'||t==='bedroom2'||t==='bedroom3'){
    const dbl=rw*rh/SC/SC>=10;
    const bW=dbl?Math.min(rw*.72,SC*1.7):Math.min(rw*.58,SC*.95);
    const bH=Math.min(rh*.52,SC*2.0);
    const bx=rx+rw/2-bW/2,by=ry+4;
    ctx.fillRect(bx,by,bW,bH);ctx.strokeRect(bx,by,bW,bH);
    ctx.fillStyle='rgba(30,41,59,.08)';ctx.fillRect(bx,by,bW,bH*.16);ctx.strokeRect(bx,by,bW,bH*.16);
    ctx.fillStyle='rgba(255,255,255,.85)';ctx.strokeStyle='rgba(30,41,59,.35)';
    if(dbl){ctx.fillRect(bx+3,by+2,bW/2-7,bH*.2);ctx.strokeRect(bx+3,by+2,bW/2-7,bH*.2);ctx.fillRect(bx+bW/2+4,by+2,bW/2-7,bH*.2);ctx.strokeRect(bx+bW/2+4,by+2,bW/2-7,bH*.2);}
    else{ctx.fillRect(bx+3,by+2,bW-6,bH*.2);ctx.strokeRect(bx+3,by+2,bW-6,bH*.2);}
    ctx.fillStyle='rgba(30,41,59,.05)';ctx.strokeStyle='rgba(30,41,59,.3)';ctx.lineWidth=.7;
    const ns=SC*.30;
    if(bx-ns-2>rx){ctx.fillRect(bx-ns-2,by+1,ns,ns);ctx.strokeRect(bx-ns-2,by+1,ns,ns);}
    if(bx+bW+2+ns<rx+rw){ctx.fillRect(bx+bW+2,by+1,ns,ns);ctx.strokeRect(bx+bW+2,by+1,ns,ns);}
  } else if(t==='kitchen'){
    const sW=SC*.52,sH=SC*.52;
    ctx.fillRect(rx+2,ry+2,sW,rh-4);ctx.strokeRect(rx+2,ry+2,sW,rh-4);
    ctx.fillRect(rx+sW+2,ry+2,rw-sW-4,sH);ctx.strokeRect(rx+sW+2,ry+2,rw-sW-4,sH);
    ctx.strokeStyle='rgba(30,41,59,.55)';ctx.lineWidth=.9;
    ctx.strokeRect(rx+4,ry+4,sW*.6,sH*.6);
    ctx.beginPath();ctx.arc(rx+4+sW*.3,ry+4+sH*.3,sH*.22,0,Math.PI*2);ctx.stroke();
    ctx.strokeRect(rx+4,ry+sH+6,sW*.8,sW*.75);
    [[.28,.28],[.72,.28],[.28,.72],[.72,.72]].forEach(([fx,fy])=>{
      ctx.beginPath();ctx.arc(rx+4+(sW*.8)*fx,ry+sH+6+(sW*.75)*fy,(sW*.8)*.1,0,Math.PI*2);ctx.stroke();
    });
  } else if(t==='bath'){
    const cW=Math.min(rw*.82,SC*1.6),cH=Math.min(rh*.42,SC*.85);
    ctx.fillRect(rx+2,ry+2,cW,cH);ctx.strokeRect(rx+2,ry+2,cW,cH);
    ctx.beginPath();ctx.ellipse(rx+2+cW/2,ry+2+cH/2,cW*.36,cH*.34,0,0,Math.PI*2);ctx.stroke();
    const bW=SC*.48,bH=SC*.35;
    ctx.strokeRect(rx+2,ry+cH+7,bW,bH);
    ctx.beginPath();ctx.arc(rx+2+bW/2,ry+cH+7+bH/2,bH*.28,0,Math.PI*2);ctx.stroke();
    if(rh>SC*1.4){
      const wW=Math.min(rw*.55,SC*.55),wH=Math.min(rh*.45,SC*.8);
      ctx.beginPath();ctx.ellipse(rx+2+wW/2,ry+rh-wH*.55-3,wW*.42,wH*.42,0,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,.8)';
      ctx.beginPath();ctx.ellipse(rx+2+wW/2,ry+rh-wH*.55-3,wW*.28,wH*.28,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(30,41,59,.05)';
      ctx.fillRect(rx+2,ry+rh-wH-3,wW,wH*.22);ctx.strokeRect(rx+2,ry+rh-wH-3,wW,wH*.22);
    }
  } else if(t==='wc'){
    const wW=Math.min(rw*.58,SC*.58),wH=Math.min(rh*.52,SC*.82);
    ctx.beginPath();ctx.ellipse(rx+wW/2+3,ry+wH+3,wW*.42,wH*.42,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.8)';
    ctx.beginPath();ctx.ellipse(rx+wW/2+3,ry+wH+3,wW*.28,wH*.28,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(30,41,59,.07)';ctx.strokeStyle='rgba(30,41,59,.4)';ctx.lineWidth=.7;
    ctx.fillRect(rx+3,ry+3,wW,SC*.18);ctx.strokeRect(rx+3,ry+3,wW,SC*.18);
    if(rh>SC*.88){ctx.strokeRect(rx+wW+7,ry+3,SC*.38,SC*.3);ctx.beginPath();ctx.arc(rx+wW+7+SC*.19,ry+3+SC*.15,SC*.09,0,Math.PI*2);ctx.stroke();}
  }
  ctx.restore();
}

})(); // end IIFE
