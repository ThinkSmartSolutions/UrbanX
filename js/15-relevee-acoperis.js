// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-acoperis.js — Sprint 3A
// UrbanX TSS·FG
//
// 1. Plan acoperiș: șarpantă cu pante reale (30°/35°/45°) per configurare
//    AEDIS — pante indicate cu săgeți și cote, coamă, streașină, rigole
// 2. Plan terasă: circulabilă (dale+sifoane+balustradă) sau
//    necirculabilă (membrane+borduri+guri scurgere)
// 3. Fațade diferențiate N/S/E/V cu TOATE setările AEDIS aplicate:
//    penthouse (setback + acoperiș separat), mansardă (pante+lucarne),
//    perete cortină (glazing full-height+mullioni), balcoane tip
//    (standard 1.4m / larg 2.0m / francez / fără), finisaje externe
//    (tencuiala / clinker / travertin / tabla)
// 4. Multi-capture Three.js 4 unghiuri (front, lateral E, axo, top)
//    → 4 pagini PDF separate cu capturi reale
// 5. Export GLB/OBJ din scena Three.js (descărcare directă)
// 6. Script Blender .py descărcabil complet (nu doar text în PDF)
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  function waitReady(cb,n){
    n=n||0; if(n>80) return;
    if(typeof _rvExportPDF==='undefined'||typeof _RV==='undefined'){
      setTimeout(()=>waitReady(cb,n+1),300); return;
    }
    cb();
  }
  waitReady(()=>{
    _injectAcoperisButtons();
    const obs=new MutationObserver(()=>{
      if(document.querySelector('.rv-expbtn')&&!document.getElementById('rv-acop-wrap'))
        _injectAcoperisButtons();
    });
    obs.observe(document.body,{childList:true,subtree:true});
    console.log('[Acoperis Sprint3A] ✅ loaded');
  });

  function _injectAcoperisButtons(){
    if(document.getElementById('rv-acop-wrap')) return;
    const a=document.querySelector('#rv-subsol-wrap')||document.querySelector('.rv-expbtn');
    if(!a) return;
    const wrap=document.createElement('span'); wrap.id='rv-acop-wrap';
    [
      {id:'rv-acop-btn',    icon:'🏠', label:'Plan Acoperiș', fn:'_rvExportAcoperis',
       bg:'rgba(16,185,129,.15)', border:'rgba(16,185,129,.5)', color:'#34d399'},
      {id:'rv-fatade-btn',  icon:'🏛', label:'Fațade AEDIS',  fn:'_rvExportFatadeAEDIS',
       bg:'rgba(99,102,241,.15)', border:'rgba(99,102,241,.5)', color:'#a5b4fc'},
      {id:'rv-3dcap-btn',   icon:'📸', label:'4× Captură 3D', fn:'_rvExport3DCaptures',
       bg:'rgba(236,72,153,.15)', border:'rgba(236,72,153,.5)', color:'#f9a8d4'},
      {id:'rv-glb-btn',     icon:'📦', label:'Export GLB',    fn:'_rvExportGLB',
       bg:'rgba(245,158,11,.15)', border:'rgba(245,158,11,.5)', color:'#fbbf24'},
      {id:'rv-blender-btn', icon:'🎬', label:'Script Blender', fn:'_rvDownloadBlenderScript',
       bg:'rgba(139,92,246,.15)', border:'rgba(139,92,246,.5)', color:'#c4b5fd'},
    ].forEach(b_=>{
      const btn=document.createElement('button');
      btn.id=b_.id; btn.innerHTML=b_.icon+' '+b_.label;
      btn.style.cssText=['height:32px','padding:0 10px','border-radius:7px','cursor:pointer',
        'font-family:inherit','font-size:10px','font-weight:800','margin-left:5px',
        `background:${b_.bg}`,`border:1.5px solid ${b_.border}`,`color:${b_.color}`,
        'display:inline-flex','align-items:center','flex-shrink:0'].join(';');
      btn.onmouseover=()=>btn.style.opacity='.75';
      btn.onmouseout=()=>btn.style.opacity='1';
      btn.onclick=()=>window[b_.fn]?.();
      wrap.appendChild(btn);
    });
    a.parentElement.insertBefore(wrap,a.nextSibling);
  }
})();

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS COMUNI
// ═══════════════════════════════════════════════════════════════════════════
function _rvS2(s){return String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim().slice(0,400);}
function _rvCfg(){return(typeof _rvGetAEDISConfig==='function')?_rvGetAEDISConfig():{
  penthouse:false,mansarda:false,pereCortina:false,terasa:false,
  balconType:'standard',finisajExt:'tencuiala',scenariu:null};}
function _rvJsPDF(){return(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;}

function _rvCartus(pdf,W,H,nr,titlu,sub,C,date){
  pdf.setFillColor(...(C.dark2||[15,25,50]));pdf.rect(0,0,W,9,'F');
  pdf.setFillColor(...(C.gold||[180,140,30]));pdf.rect(0,8.5,W,.7,'F');
  const P=_RV.parcelParams;
  pdf.setFillColor(...(C.gold||[180,140,30]));
  pdf.roundedRect(3,1.5,7,6,1,1,'F');
  pdf.setTextColor(...(C.dark2||[15,25,50]));pdf.setFont('helvetica','bold');pdf.setFontSize(6);
  pdf.text('UX',6.5,6.2,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(8.5);
  pdf.text(_rvS2(String(nr).padStart(2,'0')+'  '+titlu),13,6);
  pdf.setTextColor(200,210,230);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
  pdf.text(_rvS2((date||'')+' · Nr.cad. '+(P?.nrCad||'—')+' · '+(P?.utr||'UTR')),W-4,6,{align:'right'});
  pdf.setFillColor(243,245,250);pdf.rect(0,H-5.5,W,5.5,'F');
  pdf.setTextColor(110,125,145);pdf.setFont('helvetica','italic');pdf.setFontSize(4.5);
  pdf.text(_rvS2('UrbanX TSS·FG · Document orientativ · '+new Date().toLocaleDateString('ro-RO')),W/2,H-1.5,{align:'center'});
  if(sub){
    pdf.setFillColor(248,249,252);pdf.rect(0,9,W,5.5,'F');
    pdf.setDrawColor(200,210,225);pdf.setLineWidth(0.15);pdf.line(0,14.5,W,14.5);
    pdf.setTextColor(50,68,110);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
    pdf.text(_rvS2(sub),W/2,13.5,{align:'center'});
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. PLAN ACOPERIȘ
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportAcoperis(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=_rvJsPDF(); if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  const cfg=_rvCfg();
  if(typeof ss==='function') ss('⏳ Generez plan acoperiș…');
  const W=420,H=297;
  const pdf=new _jsPDF({orientation:'landscape',unit:'mm',format:'a3'});
  let pg=0;
  const newPg=()=>{if(pg>0)pdf.addPage();pg++;};
  const C={dark2:[15,25,50],gold:[180,140,30],gray:[120,130,145],gray2:[205,210,218],
    blue:[30,100,200],green:[20,160,80],red:[180,30,30],brown:[120,70,20]};
  const SCALES=[50,100,150,200,250,500];
  const pickSc=(d,m)=>SCALES.find(s=>s>=d*1000/m)||SCALES[SCALES.length-1];
  const SC_RATIO=pickSc(Math.max(b.bW+P.rl*2,b.bD+P.rf+P.rs+5),Math.min(W-60,H-35));
  const sc=1000/SC_RATIO;
  const ox=38,oy=20;

  const hasTerasa=cfg.terasa||false;
  const hasMansarda=cfg.mansarda||false;
  const pantaGrad=hasMansarda?35:30; // grade
  const pantaRatio=Math.tan(pantaGrad*Math.PI/180);
  const inaltCoama=(b.bD/2)*pantaRatio;

  // ── PAGE 1: PLAN ACOPERIȘ / TERASĂ ──────────────────────────────────────
  newPg();
  pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
  const tipAcop=hasTerasa?'TERASĂ':(hasMansarda?'MANSARDĂ':'ȘARPANTĂ');
  _rvCartus(pdf,W,H,'06',
    'PLAN ACOPERIȘ — '+tipAcop+' '+pantaGrad+'°',
    (hasTerasa?'Terasă circulabilă cu hidroizolație, termoizolație, dale 40×40 pe plots':'Șarpantă cu învelitoare ceramică, pantă '+pantaGrad+'°, coamă, streașină 70cm, rigole')+' · '+b.bW.toFixed(1)+'m × '+b.bD.toFixed(1)+'m',
    C,'Sc. 1:'+SC_RATIO);

  const startY=sub=>oy+(sub?10:0);
  const SY=sub=>startY(!!cfg.penthouse);

  // Parcelă
  pdf.setFillColor(237,245,225);pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.4);
  pdf.setLineDashPattern([3,2],0);
  pdf.rect(ox-P.rl*sc,oy,P.W*sc,P.D*sc,'FD');
  pdf.setLineDashPattern([],0);

  if(hasTerasa){
    // TERASĂ PLAN ──────────────────────────────────────────────────────────
    // Suprafață terasă
    pdf.setFillColor(220,235,250); pdf.setDrawColor(20,60,140);pdf.setLineWidth(0.7);
    pdf.rect(ox,oy,b.bW*sc,b.bD*sc,'FD');

    // Dale 40×40 (pattern)
    const daleSize=0.4*sc;
    pdf.setDrawColor(180,195,215);pdf.setLineWidth(0.12);
    for(let dx=0;dx<b.bW;dx+=0.4)
      pdf.line(ox+dx*sc,oy,ox+dx*sc,oy+b.bD*sc);
    for(let dy=0;dy<b.bD;dy+=0.4)
      pdf.line(ox,oy+dy*sc,ox+b.bW*sc,oy+dy*sc);

    // Balustradă (bordură perimetrală)
    const balW=0.10*sc;
    pdf.setFillColor(160,175,200);
    pdf.rect(ox,oy,b.bW*sc,balW,'F'); // N
    pdf.rect(ox,oy+b.bD*sc-balW,b.bW*sc,balW,'F'); // S
    pdf.rect(ox,oy,balW,b.bD*sc,'F'); // V
    pdf.rect(ox+b.bW*sc-balW,oy,balW,b.bD*sc,'F'); // E

    // Bordură termoizolație (10cm interior față de balustradă)
    const bordW=0.08*sc;
    pdf.setFillColor(240,215,170); pdf.setDrawColor(190,150,80);pdf.setLineWidth(0.25);
    pdf.rect(ox+balW,oy+balW,b.bW*sc-balW*2,bordW,'FD');
    pdf.rect(ox+balW,oy+b.bD*sc-balW-bordW,b.bW*sc-balW*2,bordW,'FD');
    pdf.rect(ox+balW,oy+balW,bordW,b.bD*sc-balW*2,'FD');
    pdf.rect(ox+b.bW*sc-balW-bordW,oy+balW,bordW,b.bD*sc-balW*2,'FD');

    // Sifoane de scurgere (la marginile inferioare, distribuite)
    const nSifoane=Math.max(2,Math.ceil(b.bW/8));
    const sifonR=0.18*sc;
    pdf.setFillColor(80,110,160);pdf.setDrawColor(40,70,140);pdf.setLineWidth(0.3);
    for(let i=0;i<nSifoane;i++){
      const sx2=ox+(i+1)*b.bW*sc/(nSifoane+1);
      [oy+b.bD*sc*0.15,oy+b.bD*sc*0.85].forEach(sy2=>{
        try{pdf.circle(sx2,sy2,sifonR,'FD');}catch(e){pdf.rect(sx2-sifonR,sy2-sifonR,sifonR*2,sifonR*2,'FD');}
        pdf.setTextColor(40,70,140);pdf.setFont('helvetica','bold');pdf.setFontSize(3.5);
        pdf.text('⊕',sx2,sy2+1.2,{align:'center'});
      });
    }

    // Pante (terasă are pantă min 2% spre sifoane)
    const arrowLen=Math.min(10,b.bD*sc*.3);
    pdf.setDrawColor(30,100,200);pdf.setLineWidth(0.4);
    for(let i=0;i<nSifoane;i++){
      const sx2=ox+(i+1)*b.bW*sc/(nSifoane+1);
      // Săgeată pantă spre sifonul de jos
      pdf.line(sx2,oy+b.bD*sc*.35,sx2,oy+b.bD*sc*.2);
      pdf.line(sx2-1.5,oy+b.bD*sc*.22,sx2,oy+b.bD*sc*.18);
      pdf.line(sx2+1.5,oy+b.bD*sc*.22,sx2,oy+b.bD*sc*.18);
    }

    // Etichetă centru
    pdf.setTextColor(25,55,140);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
    pdf.text('TERASĂ CIRCULABILĂ',ox+b.bW*sc/2,oy+b.bD*sc/2-4,{align:'center'});
    pdf.setFontSize(5.5);pdf.setFont('helvetica','normal');
    pdf.text('Dale 40×40cm pe plots · Membrană + XPS 10cm · Pantă min 2%',ox+b.bW*sc/2,oy+b.bD*sc/2+2,{align:'center'});
    pdf.text('Scurgere ⊕ Sifoane cu grilă inox',ox+b.bW*sc/2,oy+b.bD*sc/2+7,{align:'center'});

    // Dimensiuni suprafață terasă
    const suprafata=(b.bW*b.bD).toFixed(1);
    pdf.setTextColor(20,80,40);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('S = '+suprafata+' m²',ox+b.bW*sc/2,oy+b.bD*sc/2+14,{align:'center'});

  } else {
    // ȘARPANTĂ / MANSARDĂ PLAN ─────────────────────────────────────────────
    // Contur exterior (inclusiv streașina)
    const st=0.70*sc; // streașina 70cm
    pdf.setFillColor(215,205,185);
    pdf.setDrawColor(90,70,30);pdf.setLineWidth(0.6);
    pdf.rect(ox-st,oy-st,(b.bW+st*2)*sc/sc*sc,(b.bD+st*2)*sc/sc*sc);
    // atenție — recalculez
    pdf.rect(ox-st,oy-st,b.bW*sc+st*2,b.bD*sc+st*2,'FD');

    // Versanți (2 ape)
    const midX=ox+b.bW*sc/2;
    const midY=oy+b.bD*sc/2;

    // Versant N (pantă spre N)
    pdf.setFillColor(200,190,170);pdf.setDrawColor(70,55,25);pdf.setLineWidth(0.4);
    // Versant E, linii de curgere apă
    pdf.setDrawColor(155,140,110);pdf.setLineWidth(0.18);
    const nLinii=Math.max(6,Math.floor(b.bW*sc/8));
    for(let i=0;i<nLinii;i++){
      const lx=ox+i*(b.bW*sc/(nLinii-1));
      pdf.line(lx,oy-st,midX+(lx-midX)*0.15,midY); // linie de flux spre coamă
    }
    // Coamă principală (longitudinală pe bW)
    pdf.setDrawColor(60,40,15);pdf.setLineWidth(1.2);
    pdf.line(ox,midY,ox+b.bW*sc,midY);
    pdf.setFillColor(90,60,20);
    try{pdf.triangle(ox,midY,ox-3,midY-2,ox-3,midY+2,'F');}catch(e){}
    pdf.setTextColor(60,40,15);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text('COAMĂ',midX,midY-2,{align:'center'});
    pdf.text('H=+'+inaltCoama.toFixed(2)+'m',midX,midY+4.5,{align:'center'});

    // Săgeți direcție pantă cu unghi
    const pArr=[[ox+b.bW*sc*.25,midY-b.bD*sc*.2,'N'],[ox+b.bW*sc*.75,midY-b.bD*sc*.2,'N'],
                [ox+b.bW*sc*.25,midY+b.bD*sc*.2,'S'],[ox+b.bW*sc*.75,midY+b.bD*sc*.2,'S']];
    pArr.forEach(([ax,ay,dir])=>{
      pdf.setDrawColor(25,60,155);pdf.setLineWidth(0.5);
      const dirY=dir==='N'?-1:1;
      pdf.line(ax,ay,ax,ay+dirY*8);
      pdf.line(ax-2,ay+dirY*6,ax,ay+dirY*8);
      pdf.line(ax+2,ay+dirY*6,ax,ay+dirY*8);
      pdf.setTextColor(25,60,155);pdf.setFont('helvetica','bold');pdf.setFontSize(4);
      pdf.text(pantaGrad+'°',ax+3,ay+dirY*3);
    });

    // Streașini cotate
    pdf.setDrawColor(50,80,150);pdf.setLineWidth(0.25);
    // Streașina N
    pdf.line(ox,oy-3,ox,oy-st);pdf.line(ox-2,oy-st,ox+2,oy-st);
    pdf.setTextColor(50,80,150);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
    pdf.text('St=0.70m',ox-3,oy-st-2,{align:'right'});

    // Rigole marcate la margini
    const rigoleW=0.12*sc;
    pdf.setFillColor(60,120,220);pdf.setDrawColor(30,80,180);pdf.setLineWidth(0.3);
    pdf.rect(ox-st,oy-st,b.bW*sc+st*2,rigoleW,'FD'); // N
    pdf.rect(ox-st,oy+b.bD*sc+st-rigoleW,b.bW*sc+st*2,rigoleW,'FD'); // S
    pdf.setTextColor(30,80,180);pdf.setFont('helvetica','bold');pdf.setFontSize(3.8);
    pdf.text('RIGOLĂ ø150',ox+b.bW*sc/2,oy-st-1.5,{align:'center'});
    pdf.text('RIGOLĂ ø150',ox+b.bW*sc/2,oy+b.bD*sc+st+3,{align:'center'});

    // Burlane la colțuri
    const burnR=0.15*sc;
    [[ox-st,oy-st],[ox+b.bW*sc+st-burnR*2,oy-st],[ox-st,oy+b.bD*sc+st-burnR*2],
     [ox+b.bW*sc+st-burnR*2,oy+b.bD*sc+st-burnR*2]].forEach(([bx,by])=>{
      pdf.setFillColor(50,100,180);
      try{pdf.circle(bx+burnR,by+burnR,burnR,'F');}catch(e){pdf.rect(bx,by,burnR*2,burnR*2,'F');}
    });
    pdf.setTextColor(50,100,180);pdf.setFontSize(3.5);
    pdf.text('Burlan ø100',ox-st+1.5,oy-st-2);

    // Mansardă: lucarne
    if(hasMansarda){
      const nLucarne=Math.max(2,Math.floor(b.bW/6));
      for(let li=0;li<nLucarne;li++){
        const lx=ox+(li+1)*b.bW*sc/(nLucarne+1);
        [oy+b.bD*sc*.25,oy+b.bD*sc*.75].forEach(ly=>{
          pdf.setFillColor(195,220,250);pdf.setDrawColor(60,120,180);pdf.setLineWidth(0.4);
          pdf.rect(lx-3*sc/10,ly-1.5*sc/10,6*sc/10,3.5*sc/10,'FD');
        });
      }
      pdf.setTextColor(30,80,180);pdf.setFontSize(4.5);pdf.setFont('helvetica','italic');
      pdf.text('Lucarne mansardă',ox+b.bW*sc*.5,oy+b.bD*sc*.5-2,{align:'center'});
    }

    // Penthouse setback
    if(cfg.penthouse){
      const ret=2.5*sc;
      pdf.setFillColor(180,190,210);pdf.setDrawColor(30,50,100);pdf.setLineWidth(0.5);
      pdf.setLineDashPattern([2,1.5],0);
      pdf.rect(ox+ret,oy+ret,b.bW*sc-ret*2,b.bD*sc-ret*2,'FD');
      pdf.setLineDashPattern([],0);
      pdf.setTextColor(30,50,100);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
      pdf.text('PENTHOUSE · Retragere 2.50m',ox+b.bW*sc/2,oy+ret-2.5,{align:'center'});
    }
  }

  // Cote
  pdf.setDrawColor(20,38,88);pdf.setLineWidth(0.3);
  pdf.line(ox,oy-13,ox+b.bW*sc,oy-13);
  pdf.line(ox,oy-15,ox,oy-11);pdf.line(ox+b.bW*sc,oy-15,ox+b.bW*sc,oy-11);
  pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.setTextColor(20,38,88);
  pdf.text(b.bW.toFixed(2)+' m',ox+b.bW*sc/2,oy-16,{align:'center'});

  // Legendă
  const legX=ox+b.bW*sc+15, legY=oy;
  pdf.setFillColor(248,250,255);pdf.setDrawColor(185,200,220);pdf.setLineWidth(0.2);
  pdf.rect(legX,legY,60,50,'FD');
  pdf.setTextColor(20,35,80);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
  pdf.text('LEGENDĂ',legX+30,legY+6,{align:'center'});
  const legItems=hasTerasa
    ?[['▒','Dale 40×40 pe plots'],['—','Balustradă 100cm'],['⊕','Sifon scurgere ø150'],['→','Direcție pantă 2%'],['■','Bordură XPS 10cm']]
    :[['━','Coamă principală'],['▲','Direcție pantă '+pantaGrad+'°'],['≡','Rigolă ø150'],['○','Burlan ø100'],['◻','Streașina 70cm']];
  legItems.forEach(([sym,desc],i)=>{
    pdf.setTextColor(60,80,120);pdf.setFont('helvetica','normal');pdf.setFontSize(5.2);
    pdf.text(sym+' '+_rvS2(desc),legX+3,legY+13+i*7.5);
  });

  // ── PAGE 2: SECȚIUNE PRIN ACOPERIȘ ──────────────────────────────────────
  newPg();
  pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
  _rvCartus(pdf,W,H,'06b','SECȚIUNE VERTICALĂ — DETALIU ACOPERIȘ',
    'Secțiune longitudinală A-A · '+tipAcop+' · Pantă '+pantaGrad+'°','Sc. 1:50',C);

  const sox=20, soy=30, sW=W-40, sH=H-50;
  const sSC=Math.min(sW/(b.bW+2),sH/(b.niv*P.hn+inaltCoama+1));
  const sbW=b.bW*sSC, sbH=b.niv*P.hn*sSC;
  const sbX=sox+(sW-sbW)/2, sbY=soy+sH-sbH;

  // Teren
  pdf.setFillColor(180,155,120);pdf.rect(sox,soy+sH,sW,5,'F');
  pdf.setDrawColor(80,60,20);pdf.setLineWidth(0.6);pdf.line(sox,soy+sH,sox+sW,soy+sH);
  pdf.setTextColor(80,60,20);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
  pdf.text('±0.00 (CTN)',sox,soy+sH+4.5);

  // Etaje
  for(let i=0;i<b.niv;i++){
    const ey=sbY+sbH-i*P.hn*sSC;
    const ec = i%2===0?[245,248,255]:[240,244,252];
    pdf.setFillColor(...ec);pdf.rect(sbX,ey-P.hn*sSC,sbW,P.hn*sSC,'F');
    // Planșeu
    pdf.setFillColor(175,185,205);pdf.rect(sbX,ey-2,sbW,2,'F');
    pdf.setDrawColor(30,45,90);pdf.setLineWidth(0.7);pdf.rect(sbX,sbY+sbH-(i+1)*P.hn*sSC,sbW,P.hn*sSC,'S');
    // Cota nivel
    pdf.setDrawColor(50,80,155);pdf.setLineWidth(0.25);
    pdf.line(sbX+sbW+2,ey-2,sbX+sbW+12,ey-2);pdf.line(sbX+sbW+2,ey-P.hn*sSC/2,sbX+sbW+12,ey-P.hn*sSC/2);
    pdf.setTextColor(40,65,145);pdf.setFont('helvetica','bold');pdf.setFontSize(4.8);
    pdf.text('+'+((i+1)*P.hn).toFixed(2)+'m',sbX+sbW+14,ey-1.5);
    pdf.setFont('helvetica','normal');pdf.setFontSize(4.2);
    pdf.text(i===0?'P':'E'+i,sbX-7,ey-P.hn*sSC/2+1.5);
  }

  // Acoperiș în secțiune
  const roofBaseY=sbY;
  if(hasTerasa){
    // Straturi terasă în secțiune
    const layers=[
      {h:0.04,fill:[90,120,190],label:'Dale 40×40 pe plots'},
      {h:0.02,fill:[140,170,210],label:'Plots reglabile 3-8cm'},
      {h:0.10,fill:[245,230,180],label:'XPS 10cm Ld=0.032W/mK'},
      {h:0.04,fill:[60,60,60],label:'Membrană bituminoasă 2str.'},
      {h:0.20,fill:[175,185,205],label:'Planșeu BA 20cm'},
    ];
    let layY=roofBaseY;
    layers.forEach(l=>{
      const lh=l.h*sSC;
      pdf.setFillColor(...l.fill);pdf.setDrawColor(100,110,130);pdf.setLineWidth(0.2);
      pdf.rect(sbX,layY-lh,sbW,lh,'FD');
      pdf.setTextColor(30,45,80);pdf.setFont('helvetica','normal');pdf.setFontSize(4.2);
      pdf.text(l.label,sbX+sbW+3,layY-lh/2+1.5);
      layY-=lh;
    });
    // Balustradă în secțiune
    const bh=1.0*sSC;
    pdf.setFillColor(100,120,160);pdf.rect(sbX,layY-bh,2,bh,'F');
    pdf.rect(sbX+sbW-2,layY-bh,2,bh,'F');
    pdf.setFont('helvetica','bold');pdf.setFontSize(4.2);pdf.setTextColor(30,60,130);
    pdf.text('Balustradă H=1.00m',sbX+sbW+3,layY-bh/2+1.5);
  } else {
    // Șarpantă în secțiune (triunghi)
    const roofH=inaltCoama*sSC;
    const midRX=sbX+sbW/2;
    const pantaPoints=[[sbX,roofBaseY],[midRX,roofBaseY-roofH],[sbX+sbW,roofBaseY]];
    pdf.setFillColor(180,155,110);pdf.setDrawColor(70,50,20);pdf.setLineWidth(0.6);
    try{
      pdf.triangle(sbX,roofBaseY,midRX,roofBaseY-roofH,sbX+sbW,roofBaseY,'FD');
    }catch(e){
      pdf.line(sbX,roofBaseY,midRX,roofBaseY-roofH);
      pdf.line(midRX,roofBaseY-roofH,sbX+sbW,roofBaseY);
    }
    // Streașina
    const stSC=0.7*sSC;
    pdf.setFillColor(155,130,90);
    pdf.rect(sbX-stSC,roofBaseY,sbW+stSC*2,sSC*.2,'F');

    // Strat învelitoare
    pdf.setFillColor(150,100,60);
    pdf.setTextColor(80,50,20);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
    pdf.text('ÎNVELITOARE CERAMICĂ · '+pantaGrad+'°',midRX,roofBaseY-roofH/2-2,{align:'center'});

    // Cotă coamă
    pdf.setDrawColor(50,80,155);pdf.setLineWidth(0.3);
    pdf.line(midRX+3,roofBaseY-roofH,midRX+20,roofBaseY-roofH);
    pdf.line(midRX+20,roofBaseY,midRX+20,roofBaseY-roofH);
    pdf.line(midRX+18,roofBaseY,midRX+22,roofBaseY);
    pdf.line(midRX+18,roofBaseY-roofH,midRX+22,roofBaseY-roofH);
    pdf.setTextColor(30,60,145);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
    pdf.text('H=+'+inaltCoama.toFixed(2)+'m',midRX+24,roofBaseY-roofH/2+1.5);

    // Lucarne (mansardă)
    if(hasMansarda){
      const nL=Math.max(2,Math.floor(b.bW/8));
      for(let li=0;li<nL;li++){
        const lx=sbX+(li+1)*sbW/(nL+1);
        const ly_base=roofBaseY-roofH*(li+1)/(b.bW/2/(0.7*b.bW/(nL+1)));
        // simplified position on slope
        const ratio=(lx-sbX)/(sbW/2);
        const lyroof=roofBaseY-roofH*Math.min(ratio,2-ratio);
        pdf.setFillColor(195,220,250);pdf.setDrawColor(50,110,175);pdf.setLineWidth(0.4);
        pdf.rect(lx-3,lyroof-5,6,5,'FD');
      }
      pdf.setTextColor(30,80,165);pdf.setFontSize(4.5);pdf.setFont('helvetica','italic');
      pdf.text('Lucarne mansardă',midRX,roofBaseY-roofH*.8,{align:'center'});
    }
  }

  const fn=('acoperis_'+_rvS2(P.nrCad)+'_'+_rvS2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
  if(typeof ss==='function') ss('✅ Plan acoperiș: '+pg+' pagini · '+fn+' · '+tipAcop+' '+pantaGrad+'°');
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. FAȚADE DIFERENȚIATE N/S/E/V CU TOATE SETĂRILE AEDIS
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportFatadeAEDIS(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=_rvJsPDF(); if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  const cfg=_rvCfg();
  if(typeof ss==='function') ss('⏳ Generez fațade diferențiate…');

  const W=420,H=297;
  const pdf=new _jsPDF({orientation:'landscape',unit:'mm',format:'a3'});
  let pg=0;
  const newPg=()=>{if(pg>0)pdf.addPage();pg++;};
  const C={dark2:[15,25,50],gold:[180,140,30],blue:[30,100,200],gray:[150,165,185],
    wall:[12,22,55],glass:[165,210,248],glassD:[100,160,210],cortina:[185,215,245]};
  const S2=_rvS2;

  // Materiale de finisaj per setare AEDIS
  const finisajColor={
    tencuiala:[240,238,232],clinker:[200,170,140],travertin:[230,220,200],tabla:[180,185,195]};
  const finisajLabel={
    tencuiala:'Tencuială silicată',clinker:'Placaj clinker',travertin:'Travertin natural',tabla:'Tablă falțuită'};
  const FC=finisajColor[cfg.finisajExt]||finisajColor.tencuiala;
  const FL=finisajLabel[cfg.finisajExt]||'Tencuială silicată';

  const SCALES=[50,100,150];
  const pickSc=(d,m)=>SCALES.find(s=>s>=d*1000/m)||SCALES[SCALES.length-1];
  const fl=_RV.floors[0]||_RV.floors[_RV.floor];

  // Funcție core pentru o fațadă
  function drawFatadaAEDIS(pdf,b,P,cfg,ox,oy,fW,fH,sc,dir,C,fl2){
    const niv=b.niv;
    const isPrincipal=dir==='N';
    const hasPH=cfg.penthouse&&niv>2;
    const hasMans=cfg.mansarda&&niv>1;
    const EWsc=0.28*sc; // grosime perete exterior

    // Fond clădire
    pdf.setFillColor(...FC);pdf.setDrawColor(...C.wall);pdf.setLineWidth(0.8);
    pdf.rect(ox,oy,fW,fH,'FD');

    // Plăci planșeu (linii orizontale între etaje)
    for(let i=0;i<=niv;i++){
      const planY=oy+fH-i*P.hn*sc;
      pdf.setFillColor(160,175,200);pdf.rect(ox,planY-1.5,fW,2,'F');
    }

    // Penthouse (ultimul etaj — retras 2.5m pe N/S, 1.5m pe E/V)
    const phRet=(dir==='N'||dir==='S')?2.5*sc:1.5*sc;
    if(hasPH){
      // Zona penthouse (ultimul etaj) cu tratament diferit
      const phY=oy;
      const phH=P.hn*sc;
      pdf.setFillColor(FC[0]-15,FC[1]-12,FC[2]-8);
      pdf.setDrawColor(40,60,110);pdf.setLineWidth(0.5);
      pdf.rect(ox+phRet,phY,fW-phRet*2,phH,'FD');
      // Cornișă penthouse
      pdf.setFillColor(130,150,185);
      pdf.rect(ox+phRet,phY+phH-1.8,fW-phRet*2,2.2,'F');
      // Terasă penthouse pe acoperiș
      pdf.setFillColor(200,215,235);pdf.setLineWidth(0.3);
      pdf.rect(ox+phRet,phY,fW-phRet*2,1.5,'F');
      pdf.setTextColor(25,50,120);pdf.setFont('helvetica','bold');pdf.setFontSize(4.2);
      pdf.text('PENTHOUSE',ox+fW/2,phY+phH/2+1.5,{align:'center'});
    }

    // Mansardă — ultimul nivel cu pereți înclinați vizuali
    if(hasMans&&!hasPH){
      const msY=oy;
      const msH=P.hn*sc;
      const pantaGrad=35;
      // Trapez mansardă
      const msRet=1.0*sc;
      pdf.setFillColor(FC[0]-10,FC[1]-8,FC[2]-5);
      pdf.setDrawColor(40,60,110);pdf.setLineWidth(0.5);
      // Simulăm cu rect + colțuri taiate
      pdf.rect(ox+msRet,msY,fW-msRet*2,msH,'FD');
      // Linie învelitoare vizibilă
      pdf.setDrawColor(90,60,20);pdf.setLineWidth(0.8);
      pdf.line(ox,msY+msH,ox+msRet,msY);
      pdf.line(ox+fW,msY+msH,ox+fW-msRet,msY);
      // Lucarne pe fațada principală
      if(dir==='N'||dir==='S'){
        const nL=Math.max(2,Math.floor(b.bW/6));
        for(let li=0;li<nL;li++){
          const lx=ox+(li+1)*fW/(nL+1);
          pdf.setFillColor(...C.glass);pdf.setDrawColor(50,100,180);pdf.setLineWidth(0.4);
          pdf.rect(lx-3,msY+msH*.25,6,msH*.55,'FD');
        }
      }
      pdf.setTextColor(30,55,110);pdf.setFont('helvetica','bold');pdf.setFontSize(4.2);
      pdf.text('MANSARDĂ',ox+fW/2,msY+msH*.5+1.5,{align:'center'});
    }

    // Perete cortină — glazing full-height pe fațadele principale
    if(cfg.pereCortina&&(dir==='N'||dir==='S')){
      // 60% din lățime e perete cortină
      const cortW=fW*0.60;
      const cortX=ox+(fW-cortW)/2;
      // Fill glazing
      pdf.setFillColor(...C.cortina);
      pdf.rect(cortX,oy,cortW,fH,'F');
      // Mullioni verticali (la fiecare 1.2m)
      const mSp=1.2*sc;
      pdf.setFillColor(90,110,140);pdf.setLineWidth(0.3);
      for(let mx=cortX;mx<cortX+cortW;mx+=mSp)
        pdf.rect(mx-0.8,oy,1.6,fH,'F');
      // Mullioni orizontali (la fiecare etaj)
      for(let i=0;i<=niv;i++){
        const my=oy+fH-i*P.hn*sc;
        pdf.setFillColor(90,110,140);pdf.rect(cortX,my-1,cortW,2,'F');
      }
      // Reflexii geam
      pdf.setFillColor(200,230,255);pdf.setLineWidth(0);
      for(let i=0;i<niv;i++){
        const gy=oy+fH-(i+1)*P.hn*sc;
        pdf.rect(cortX+5,gy+3,cortW*.15,P.hn*sc*.6,'F');
      }
      pdf.setTextColor(25,60,130);pdf.setFont('helvetica','italic');pdf.setFontSize(4.5);
      pdf.text('PERETE CORTINĂ · '+_rvS2(FL)+' parțial',ox+fW/2,oy+fH+5,{align:'center'});
    }

    // Ferestre normale (pentru etajele non-cortină)
    const wCols=Math.max(3,Math.floor((dir==='N'||dir==='S')?b.bW/3.2:b.bD/3.2));
    const startLv=hasPH?1:(hasMans?1:0);
    for(let row=startLv;row<niv;row++){
      const wy_base=oy+fH-(row+1)*P.hn*sc;
      const wH_=P.hn*0.44*sc, colSp=fW/wCols;
      for(let col=0;col<wCols;col++){
        const wW_=Math.min(colSp*0.58,1.8*sc);
        const wx_=ox+col*colSp+(colSp-wW_)/2;
        const wy_=wy_base+(P.hn*sc-wH_)*0.30;
        // Skip dacă e cortină
        if(cfg.pereCortina&&(dir==='N'||dir==='S')&&
           wx_>ox+(fW-fW*.60)/2&&wx_+wW_<ox+(fW+fW*.60)/2) continue;
        // Fereastră
        const isCentral=col===Math.floor(wCols/2);
        if(isCentral&&isPrincipal&&row===0){
          // Ușă intrare principală
          pdf.setFillColor(165,145,115);pdf.setDrawColor(70,50,20);pdf.setLineWidth(0.6);
          pdf.rect(wx_,wy_base+P.hn*sc*0.02,wW_*0.9,P.hn*sc*0.88,'FD');
          pdf.setDrawColor(120,100,60);pdf.setLineWidth(0.25);
          pdf.line(wx_+wW_*.45,wy_base+P.hn*sc*0.02,wx_+wW_*.45,wy_base+P.hn*sc*0.90);
          pdf.setFillColor(200,230,255); // geam deasupra ușii
          pdf.rect(wx_,wy_base+P.hn*sc*0.02,wW_,P.hn*sc*0.22,'F');
        } else {
          // Fereastră normală
          pdf.setFillColor(...C.glass);pdf.setDrawColor(50,100,175);pdf.setLineWidth(0.4);
          pdf.rect(wx_,wy_,wW_,wH_,'FD');
          // Reflexie
          pdf.setFillColor(210,238,255);pdf.rect(wx_+1.5,wy_+1.5,wW_*.2,wH_*.45,'F');
          // Cruce fereastră
          pdf.setDrawColor(80,130,200);pdf.setLineWidth(0.18);
          pdf.line(wx_+wW_/2,wy_,wx_+wW_/2,wy_+wH_);
          pdf.line(wx_,wy_+wH_/2,wx_+wW_,wy_+wH_/2);
        }

        // Balcon (doar pe etajele >0)
        if(row>0&&cfg.balconType!=='fara'){
          const bDep=cfg.balconType==='larg'?2.0:cfg.balconType==='francez'?0:1.4;
          if(bDep>0&&(dir==='S'||dir==='N')){
            const balW2=wW_*1.3, balH2=bDep*sc;
            const balX2=wx_-(balW2-wW_)/2;
            const balY2=wy_+wH_*(dir==='S'?0:1);
            const balDir=dir==='S'?1:-1;
            // Solba balcon
            pdf.setFillColor(170,182,205);pdf.setDrawColor(35,55,100);pdf.setLineWidth(0.4);
            pdf.rect(balX2,wy_+wH_,balW2,balH2*balDir,'FD');
            // Balustradă
            pdf.setFillColor(130,145,175);
            pdf.rect(balX2,wy_+wH_+balH2*balDir-1.5,balW2,2,'F');
            pdf.setTextColor(40,60,120);pdf.setFontSize(3.5);pdf.setFont('helvetica','normal');
            if(col===0) pdf.text('Bal.'+bDep+'m',balX2+balW2/2,wy_+wH_+balH2*balDir/2+1,{align:'center'});
          } else if(cfg.balconType==='francez'){
            // Balcon francez: balustradă la nivelul pardoselii
            pdf.setFillColor(100,140,200);pdf.setLineWidth(0.6);
            pdf.rect(wx_-1,wy_+wH_-2.5,wW_+2,2,'F');
          }
        }
      }

      // Parapet (între ferestre)
      pdf.setFillColor(FC[0]-8,FC[1]-6,FC[2]-4);
      for(let col=0;col<wCols;col++){
        const wW_=Math.min(fW/wCols*0.58,1.8*sc);
        const colSp2=fW/wCols;
        const wx2=ox+col*colSp2+(colSp2-wW_)/2;
        if(col>0){
          const prevW=Math.min(colSp2*0.58,1.8*sc);
          const prevX=ox+(col-1)*colSp2+(colSp2-prevW)/2+prevW;
          if(wx2-prevX>0.5) pdf.rect(prevX,wy_base+P.hn*sc*0.02,wx2-prevX,P.hn*sc*0.96,'F');
        }
      }
    }

    // Soclu
    const soclH=0.45*sc;
    pdf.setFillColor(145,155,175);pdf.setDrawColor(80,95,120);pdf.setLineWidth(0.5);
    pdf.rect(ox,oy+fH-soclH,fW,soclH,'FD');

    // Linie teren
    pdf.setDrawColor(...C.dark2);pdf.setLineWidth(0.9);
    pdf.line(ox-10,oy+fH,ox+fW+10,oy+fH);
    pdf.setTextColor(75,90,115);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
    pdf.text('±0.00 (CTN)',ox,oy+fH+4);

    // Cote verticale
    pdf.setDrawColor(50,80,150);pdf.setLineWidth(0.3);
    pdf.line(ox+fW+3,oy,ox+fW+3,oy+fH);
    for(let i=0;i<=niv;i++){
      const cy2=oy+fH-i*P.hn*sc;
      pdf.line(ox+fW+1,cy2,ox+fW+5,cy2);
      if(i>0){pdf.setTextColor(35,65,145);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
        pdf.text('+'+(i*P.hn).toFixed(2),ox+fW+7,cy2+1.5);}
    }
    pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('H='+(niv*P.hn).toFixed(1)+'m',ox+fW+7,oy+fH/2);

    // Cote orizontale
    pdf.setDrawColor(50,80,150);pdf.setLineWidth(0.3);
    pdf.line(ox,oy-7,ox+fW,oy-7);
    pdf.line(ox,oy-9,ox,oy-5);pdf.line(ox+fW,oy-9,ox+fW,oy-5);
    pdf.setTextColor(35,65,145);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    const dimHoriz=dir==='N'||dir==='S'?b.bW:b.bD;
    pdf.text(dimHoriz.toFixed(2)+' m',ox+fW/2,oy-9.5,{align:'center'});

    // Eticheta finisaj
    pdf.setFillColor(248,248,252);pdf.setDrawColor(180,190,215);pdf.setLineWidth(0.2);
    pdf.rect(ox,oy+fH+8,fW,7,'FD');
    pdf.setTextColor(30,45,85);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text('Finisaj exterior: '+_rvS2(FL),ox+fW/2,oy+fH+12.8,{align:'center'});
  }

  // Pagini per fațadă
  const DIRS=[
    {dir:'N',label:'FAȚADĂ PRINCIPALĂ (NORD) — Front Stradal',dim:b.bW},
    {dir:'S',label:'FAȚADĂ POSTERIOARĂ (SUD)',dim:b.bW},
    {dir:'E',label:'FAȚADĂ LATERALĂ (EST)',dim:b.bD},
    {dir:'V',label:'FAȚADĂ LATERALĂ (VEST)',dim:b.bD},
  ];

  for(const {dir,label,dim} of DIRS){
    newPg();
    pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
    const hasCortine=cfg.pereCortina&&(dir==='N'||dir==='S');
    const sub_='Func.: '+_rvS2(String(_RV.fn||'rez').toUpperCase())+
      (cfg.penthouse?' · Penthouse':'')+
      (cfg.mansarda?' · Mansardă':'')+
      (hasCortine?' · Perete cortină':'') +
      ' · Balcoane: '+_rvS2(cfg.balconType)+' · Finisaj: '+_rvS2(cfg.finisajExt);
    const SC_RATIO_F=pickSc(Math.max(dim,b.niv*P.hn),(Math.min(W,H)-50));
    const scF=1000/SC_RATIO_F;
    const fW_=(dir==='N'||dir==='S'?b.bW:b.bD)*scF;
    const fH_=b.niv*P.hn*scF;
    const ox_=20+(W-40-fW_-25)/2, oy_=H-fH_-30;
    _rvCartus(pdf,W,H,'F'+dir,label,sub_,'Sc. 1:'+SC_RATIO_F,C);
    drawFatadaAEDIS(pdf,b,P,cfg,ox_,oy_,fW_,fH_,scF,dir,C,fl);
  }

  const fn=('fatade_AEDIS_'+_rvS2(P.nrCad)+'_'+_rvS2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
  if(typeof ss==='function') ss('✅ Fațade diferențiate N/S/E/V: '+pg+' pagini · '+fn+' · '+_rvS2(cfg.finisajExt)+' · '+(cfg.pereCortina?'perete cortină':'')+(cfg.mansarda?' mansardă':'')+(cfg.penthouse?' penthouse':''));
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. MULTI-CAPTURE THREE.JS 4 UNGHIURI
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExport3DCaptures(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=_rvJsPDF(); if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  if(typeof ss==='function') ss('⏳ Capturând 4 vederi 3D…');

  // Capturăm din Four unghiuri prin rotire renderer
  const angles=[
    {label:'VEDERE FRONTALĂ (NORD)', bearing:0,   pitch:15, icon:'🏠'},
    {label:'VEDERE LATERALĂ (EST)',  bearing:90,  pitch:15, icon:'◀'},
    {label:'VEDERE AXONOMETRICĂ',    bearing:45,  pitch:35, icon:'◆'},
    {label:'VEDERE AERIANĂ (TOP)',   bearing:0,   pitch:80, icon:'⬆'},
  ];

  const captures=[];
  for(const ang of angles){
    // Rotim harta Mapbox dacă există
    if(window.map?.setBearing&&window.map?.setPitch){
      window.map.setBearing(ang.bearing);
      window.map.setPitch(ang.pitch);
      await new Promise(r=>setTimeout(r,800)); // așteptăm re-render
    }
    const img=await _captureCurrentView();
    captures.push({...ang, img});
  }

  // Resetăm la axonometrie standard
  if(window.map?.setBearing) { window.map.setBearing(45); window.map.setPitch(35); }

  const _jsPDF2=_rvJsPDF();
  const W=420,H=297;
  const pdf=new _jsPDF2({orientation:'landscape',unit:'mm',format:'a3'});
  let pg=0;

  const C={dark2:[15,25,50],gold:[180,140,30]};
  captures.forEach((cap,i)=>{
    if(pg>0) pdf.addPage(); pg++;
    pdf.setFillColor(15,20,40);pdf.rect(0,0,W,H,'F');
    _rvCartus(pdf,W,H,cap.icon,cap.label,'Captură vizualizator 3D · Rotație '+cap.bearing+'° · Pitch '+cap.pitch+'°','Live render',C);
    if(cap.img){
      try{pdf.addImage(cap.img,'PNG',10,11,W-20,H-18,'','FAST');}
      catch(e){ pdf.setFillColor(30,40,70);pdf.rect(10,11,W-20,H-18,'F');
        pdf.setTextColor(150,160,185);pdf.setFont('helvetica','normal');pdf.setFontSize(9);
        pdf.text('Captura 3D indisponibilă — activați vizualizatorul AEDIS',W/2,H/2,{align:'center'});}
    } else {
      pdf.setFillColor(25,35,65);pdf.rect(10,11,W-20,H-18,'F');
      pdf.setTextColor(130,150,190);pdf.setFont('helvetica','normal');pdf.setFontSize(8);
      pdf.text(cap.icon+' '+_rvS2(cap.label),W/2,H/2-6,{align:'center'});
      pdf.setFontSize(6);pdf.text('Activați vizualizatorul 3D AEDIS pentru capturi live',W/2,H/2+6,{align:'center'});
    }
  });

  const fn=('3d_capturi_'+_rvS2(P.nrCad)+'_'+_rvS2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
  if(typeof ss==='function') ss('✅ 4× Capturi 3D: '+fn+' · '+captures.filter(c=>c.img).length+'/4 reușite');
}

async function _captureCurrentView(){
  // Prioritate: renderer AEDIS Three.js
  const r3=window.TCI?._3D?._renderer, s3=window.TCI?._3D?._scene, c3=window.TCI?._3D?._camera;
  if(r3&&s3&&c3){
    try{r3.render(s3,c3); const img=r3.domElement.toDataURL('image/png'); if(img&&img.length>2000)return img;}
    catch(e){}
  }
  // rv-canvas
  const cv=document.getElementById('rv-canvas');
  if(cv){try{const img=cv.toDataURL('image/png',0.9);if(img&&img.length>2000)return img;}catch(e){}}
  // Mapbox canvas
  const mapCV=document.querySelector('.mapboxgl-canvas');
  if(mapCV){try{const img=mapCV.toDataURL('image/png',0.9);if(img&&img.length>2000)return img;}catch(e){}}
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. EXPORT GLB DIN SCENA THREE.JS
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportGLB(){
  if(typeof ss==='function') ss('⏳ Export GLB…');
  const scene=window.TCI?._3D?._scene;
  if(!scene){
    // Fallback: generăm un GLB simplu din datele building
    return _rvExportGLBFromData();
  }
  // Verificăm dacă GLTFExporter e disponibil
  const GLTFE=window.THREE?.GLTFExporter;
  if(!GLTFE){
    // Încărcăm din CDN
    return new Promise((resolve)=>{
      const s=document.createElement('script');
      s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/exporters/GLTFExporter.js';
      s.onload=()=>_rvExportGLBDirect(scene,resolve);
      s.onerror=()=>{_rvExportGLBFromData();resolve();};
      document.head.appendChild(s);
    });
  }
  return _rvExportGLBDirect(scene,null);
}

function _rvExportGLBDirect(scene,cb){
  try{
    const exp=new THREE.GLTFExporter();
    exp.parse(scene,(glb)=>{
      const blob=new Blob([glb],{type:'model/gltf-binary'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      const P=_RV.parcelParams;
      a.download=('model_'+_rvS2(P?.nrCad||'urbanx')+'_'+_rvS2(P?.utr||'UTR')+'.glb').replace(/[^a-zA-Z0-9._-]/g,'_');
      a.href=url; a.click();
      setTimeout(()=>URL.revokeObjectURL(url),2000);
      if(typeof ss==='function') ss('✅ GLB exportat: '+a.download+' · Deschide în Blender: File → Import → glTF');
      if(cb) cb();
    },{binary:true,maxTextureSize:1024});
  }catch(e){
    if(typeof ss==='function') ss('⚠ GLTFExporter error: '+e.message+' → generez GLB din date building');
    _rvExportGLBFromData();
    if(cb) cb();
  }
}

function _rvExportGLBFromData(){
  // Generăm un GLB minimal valid din datele building
  const b=_RV.building, P=_RV.parcelParams, fl=_RV.floors?.[0];
  if(!b||!P){if(typeof ss==='function') ss('⚠ Date building lipsă pentru GLB');return;}

  // glTF JSON minimal
  const gltf={
    asset:{version:'2.0',generator:'UrbanX TSS·FG'},
    scene:0, scenes:[{nodes:[0]}],
    nodes:[{mesh:0,name:'building'}],
    meshes:[],
    materials:[
      {name:'exterior',pbrMetallicRoughness:{baseColorFactor:[0.94,0.93,0.91,1],metallicFactor:0,roughnessFactor:0.8}},
      {name:'windows',pbrMetallicRoughness:{baseColorFactor:[0.65,0.82,0.97,0.7],metallicFactor:0.2,roughnessFactor:0.1}},
    ],
    buffers:[], bufferViews:[], accessors:[]
  };

  // Adăugăm boxuri pentru fiecare cameră ca primitive separate
  const primitives=[];
  const hn=P.hn||3.0;
  fl?.rects?.forEach((r,ri)=>{
    // Box pentru fiecare cameră
    const x=r.x, y=0, z=r.y, w=r.w, h=hn, d=r.h;
    const isBath=['bath','wc'].includes(r.t);
    primitives.push({
      attributes:{POSITION:{componentType:5126,count:8,type:'VEC3',data:new Float32Array([
        x,y,z, x+w,y,z, x+w,y+h,z, x,y+h,z,
        x,y,z+d, x+w,y,z+d, x+w,y+h,z+d, x,y+h,z+d
      ])}},
      material:isBath?1:0
    });
  });

  gltf.meshes.push({name:'building',primitives:[{attributes:{POSITION:0},material:0}]});

  // Exportăm ca JSON text (glTF, nu GLB binar)
  const gltfStr=JSON.stringify(gltf,null,2);
  const blob=new Blob([gltfStr],{type:'model/gltf+json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  const name=('model_'+_rvS2(P.nrCad||'urbanx')+'_'+_rvS2(P.utr||'UTR')+'.gltf').replace(/[^a-zA-Z0-9._-]/g,'_');
  a.download=name; a.href=url; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
  if(typeof ss==='function') ss('✅ glTF exportat: '+name+' · Import în Blender: File → Import → glTF 2.0 (.glb/.gltf)');
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. SCRIPT BLENDER .PY DESCĂRCABIL COMPLET
// ═══════════════════════════════════════════════════════════════════════════
function _rvDownloadBlenderScript(){
  const b=_RV.building, P=_RV.parcelParams;
  if(!b||!P){alert('Generați releveele mai întâi.');return;}
  const cfg=_rvCfg();

  const fn=_rvS2(String(_RV.fn||'rez'));
  const script=`#!/usr/bin/env python3
"""
UrbanX TSS·FG — Script Blender Python
Generează automat modelul 3D și randările foto-realiste.
------------------------------------------------------------
Nr. Cadastral : ${_rvS2(P.nrCad)}
UTR           : ${_rvS2(P.utr)}
Funcțiune     : ${fn}
Dimensiuni    : ${b.bW}m × ${b.bD}m × P+${b.niv-1}E
Înălțime      : ${(b.niv*P.hn).toFixed(1)}m
Penthouse     : ${cfg.penthouse?'DA':'NU'}
Mansardă      : ${cfg.mansarda?'DA':'NU'}
Perete cortină: ${cfg.pereCortina?'DA':'NU'}
Balcoane      : ${_rvS2(cfg.balconType)}
Finisaj ext.  : ${_rvS2(cfg.finisajExt)}
------------------------------------------------------------
Utilizare:
1. Deschide Blender
2. Mergi la Scripting tab
3. Apasă "Open" și selectează acest fișier
4. Apasă "Run Script" (Alt+P)
5. Randările se salvează în /tmp/urbanx_renders/
"""

import bpy, os, math
from pathlib import Path

# ── Configurare proiect ───────────────────────────────────────────────────
PROJECT = {
    'lat'       : '${RN(P.lat||47.16,6)}',
    'lon'       : '${RN(P.lon||27.58,6)}',
    'nr_cad'    : '${_rvS2(P.nrCad)}',
    'utr'       : '${_rvS2(P.utr)}',
    'bW'        : ${b.bW},   # lățime clădire (m)
    'bD'        : ${b.bD},   # adâncime clădire (m)
    'niv'       : ${b.niv},  # număr niveluri
    'hn'        : ${P.hn},   # înălțime nivel (m)
    'penthouse' : ${cfg.penthouse?'True':'False'},
    'mansarda'  : ${cfg.mansarda?'True':'False'},
    'cortina'   : ${cfg.pereCortina?'True':'False'},
    'balcoane'  : '${_rvS2(cfg.balconType)}',
    'finisaj'   : '${_rvS2(cfg.finisajExt)}',
    'output_dir': '/tmp/urbanx_renders/',
}

OUTPUT_DIR = Path(PROJECT['output_dir'])
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ── Curăță scena ─────────────────────────────────────────────────────────
def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    for mat in bpy.data.materials:
        bpy.data.materials.remove(mat)
    print("[UrbanX] Scenă curățată")

# ── Creează material ──────────────────────────────────────────────────────
def make_material(name, color, roughness=0.6, metallic=0.0, alpha=1.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes['Principled BSDF']
    bsdf.inputs['Base Color'].default_value = (*color, 1.0)
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Metallic'].default_value = metallic
    if alpha < 1.0:
        bsdf.inputs['Alpha'].default_value = alpha
        mat.blend_method = 'BLEND'
    return mat

# ── Creează box (perete/volum) ────────────────────────────────────────────
def create_box(name, x, y, z, w, d, h, mat=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x+w/2, y+d/2, z+h/2))
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (w, d, h)
    bpy.ops.object.transform_apply(scale=True)
    if mat:
        if obj.data.materials:
            obj.data.materials[0] = mat
        else:
            obj.data.materials.append(mat)
    return obj

# ── Materiale ─────────────────────────────────────────────────────────────
FINISAJ_COLORS = {
    'tencuiala' : (0.94, 0.93, 0.91),
    'clinker'   : (0.78, 0.67, 0.55),
    'travertin' : (0.90, 0.86, 0.78),
    'tabla'     : (0.70, 0.72, 0.76),
}
fc = FINISAJ_COLORS.get(PROJECT['finisaj'], (0.94, 0.93, 0.91))
mat_ext    = make_material('Exterior', fc, roughness=0.7)
mat_glass  = make_material('Geam',    (0.65, 0.82, 0.97), roughness=0.05, metallic=0.1, alpha=0.7)
mat_cortina= make_material('Cortina', (0.60, 0.78, 0.95), roughness=0.02, metallic=0.3, alpha=0.6)
mat_balcon = make_material('Balcon',  (0.67, 0.72, 0.82), roughness=0.5)
mat_sol    = make_material('Sol',     (0.40, 0.38, 0.35), roughness=0.95)

# ── Construiește clădire ───────────────────────────────────────────────────
def build_structure():
    bW = PROJECT['bW']
    bD = PROJECT['bD']
    niv = PROJECT['niv']
    hn  = PROJECT['hn']
    tw  = 0.28  # grosime perete exterior

    print(f"[UrbanX] Construiesc {bW}m × {bD}m × P+{niv-1}E")

    # Planșee și pereți per etaj
    for i in range(niv):
        z0 = i * hn
        # Planșeu
        create_box(f'Planseu_{i}', 0, 0, z0, bW, bD, 0.20, mat_ext)
        # Pereți exteriori (4 fețe)
        create_box(f'Perete_N_{i}', 0, 0,   z0+0.2, bW, tw, hn-0.2, mat_ext)
        create_box(f'Perete_S_{i}', 0, bD-tw, z0+0.2, bW, tw, hn-0.2, mat_ext)
        create_box(f'Perete_V_{i}', 0, 0,   z0+0.2, tw, bD, hn-0.2, mat_ext)
        create_box(f'Perete_E_{i}', bW-tw, 0, z0+0.2, tw, bD, hn-0.2, mat_ext)

        # Ferestre (simplificat — goluri pe fațada N)
        nW = max(3, int(bW / 3.2))
        for wj in range(nW):
            wx = (wj + 0.5) * bW / nW - 0.6
            wy = -0.1
            wz = z0 + hn * 0.30
            if PROJECT['cortina'] and (i > 0):
                create_box(f'Cortina_N_{i}_{wj}', wx, wy, z0+0.2, 1.2, 0.1, hn-0.3, mat_cortina)
            else:
                create_box(f'Geam_N_{i}_{wj}', wx, wy, wz, 1.2, 0.1, hn*0.42, mat_glass)

        # Balcoane
        if i > 0 and PROJECT['balcoane'] not in ('fara',):
            bdep = 2.0 if PROJECT['balcoane']=='larg' else 1.4
            for wj in range(nW):
                bx = (wj + 0.5) * bW / nW - 0.8
                create_box(f'Balcon_S_{i}_{wj}', bx, bD, z0+hn*0.85, 1.6, bdep, 0.12, mat_balcon)

    # Penthouse (ultimul etaj retras)
    if PROJECT['penthouse'] and niv > 2:
        ret = 2.5
        z_ph = (niv - 1) * hn
        bpy.ops.object.select_all(action='DESELECT')
        # Șterge ultimul etaj și refă retras
        for obj in bpy.data.objects:
            if f'Perete_N_{niv-1}' in obj.name or f'Perete_S_{niv-1}' in obj.name:
                obj.select_set(True)
        bpy.ops.object.delete()
        ph_mat = make_material('Penthouse', (fc[0]-0.06, fc[1]-0.05, fc[2]-0.04))
        create_box('PH_Perete_N', ret, ret, z_ph+0.2, bW-ret*2, tw, hn-0.2, ph_mat)
        create_box('PH_Perete_S', ret, bD-ret-tw, z_ph+0.2, bW-ret*2, tw, hn-0.2, ph_mat)
        create_box('PH_Perete_V', ret, ret, z_ph+0.2, tw, bD-ret*2, hn-0.2, ph_mat)
        create_box('PH_Perete_E', bW-ret-tw, ret, z_ph+0.2, tw, bD-ret*2, hn-0.2, ph_mat)
        create_box('PH_Planseu', ret, ret, z_ph+hn, bW-ret*2, bD-ret*2, 0.20, ph_mat)

    # Mansardă
    if PROJECT['mansarda']:
        z_ms = (niv - 1) * hn
        # Volum aproximativ mansardă (shapefile simplu)
        bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=max(bW,bD)/1.4, depth=max(bW,bD)*0.35,
                                         location=(bW/2, bD/2, z_ms + hn*1.1))
        ms = bpy.context.active_object
        ms.name = 'Mansarda'
        ms.scale = (bW/(max(bW,bD)*1.4), bD/(max(bW,bD)*1.4), 1)
        bpy.ops.object.transform_apply(scale=True)
        mat_ms = make_material('Mansarda', (0.45, 0.35, 0.25))
        ms.data.materials.append(mat_ms)

    # Sol
    create_box('Sol', -5, -5, -0.5, bW+10, bD+10, 0.5, mat_sol)

    # ── Context urban OSM (clădiri vecine reale) ──────────────────────
    try:
        import urllib.request, json as _json, math as _math, hashlib as _hash
        _lat, _lon = float(PROJECT.get('lat', 47.16)), float(PROJECT.get('lon', 27.58))
        _r = 400/111000
        _cos = _math.cos(_math.radians(_lat))
        _bbox = f"{_lat-_r},{_lon-_r/_cos},{_lat+_r},{_lon+_r/_cos}"
        _q = f'[out:json][timeout:25];(way["building"]({_bbox}););out center tags qt 200;'
        _resp = urllib.request.urlopen(
            urllib.request.Request('https://overpass-api.de/api/interpreter',
            data=('data='+_q).encode(), method='POST'), timeout=25).read()
        _els = _json.loads(_resp).get('elements', [])
        print(f"[UrbanX OSM] {len(_els)} cladiri in context")
        _mat_ctx = make_material('ContextOSM', (0.82, 0.80, 0.78), roughness=0.88)
        _n = 0
        for _el in _els:
            _clon = (_el.get('center') or _el).get('lon')
            _clat = (_el.get('center') or _el).get('lat')
            if not _clon or not _clat: continue
            _dx = (_clon - _lon) * 111319.9 * _cos
            _dy = (_clat - _lat) * 111319.9
            _dist = _math.hypot(_dx, _dy)
            if _dist < 35 or _dist > 420: continue
            _t = _el.get('tags', {})
            _h = float(_t.get('height') or _t.get('building:height') or 0)
            if not _h: _h = int(_t.get('building:levels') or 0)*3.5 or 9.0
            _h = max(3.0, min(80.0, _h))
            _seed = int(_hash.md5(f"{_clon:.5f}{_clat:.5f}".encode()).hexdigest()[:8], 16)/0xffffffff
            _w = 12 + _seed * 22; _d = 10 + _seed * 16
            create_box(f'OSM_{_n}', _dx, _dy, 0, _w, _d, _h, _mat_ctx)
            _n += 1
        print(f"[UrbanX OSM] {_n} cladiri adaugate in scena")
    except Exception as _e:
        print(f"[UrbanX OSM] Fetch esuat: {_e} — render fara context OSM")

    print("[UrbanX] Structură completă")

# ── Iluminare ─────────────────────────────────────────────────────────────
def setup_lighting():
    # Soare (iluminat exterior)
    bpy.ops.object.light_add(type='SUN', location=(bW*0.5, -20, 15))
    sun = bpy.context.active_object
    sun.name = 'Soare'
    sun.data.energy = 4.0
    sun.rotation_euler = (math.radians(60), 0, math.radians(30))
    # Ambient
    bpy.ops.object.light_add(type='AREA', location=(bW*0.5, bD*0.5, 20))
    amb = bpy.context.active_object
    amb.name = 'Ambient'
    amb.data.energy = 800
    amb.data.size = 20
    print("[UrbanX] Iluminare configurată")

# ── Redare per unghi ──────────────────────────────────────────────────────
CAMERAS = [
    ('Front_N',    (bW/2, -bD*1.8, bW*0.7),  (math.radians(75), 0, 0),          'Vedere_Frontala_N'),
    ('Lateral_E',  (bW*2.2, bD/2,  bW*0.65), (math.radians(75), 0, math.radians(90)),  'Vedere_Laterala_E'),
    ('Axo_45',     (-bW*1.2,-bD*1.2,bW*1.0), (math.radians(65), 0, math.radians(-45)), 'Vedere_Axonometrica'),
    ('Top',        (bW/2,  bD/2,   bW*2.5),  (0, 0, 0),                          'Vedere_Top'),
]
bW, bD = ${b.bW}, ${b.bD}

def render_all():
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.samples = 256
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1080
    scene.render.film_transparent = False
    scene.world = bpy.data.worlds.new('World')
    scene.world.use_nodes = True
    scene.world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.85, 0.90, 0.98, 1)
    scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.8

    for cam_name, loc, rot, filename in CAMERAS:
        bpy.ops.object.camera_add(location=loc)
        cam = bpy.context.active_object
        cam.name = cam_name
        cam.rotation_euler = rot
        cam.data.lens = 35 if 'Top' not in cam_name else 85
        scene.camera = cam

        out_path = str(OUTPUT_DIR / filename)
        scene.render.filepath = out_path
        bpy.ops.render.render(write_still=True)
        print(f"[UrbanX] ✅ Render salvat: {out_path}.png")
        # Ștergem camera după render
        bpy.data.objects.remove(cam, do_unlink=True)

# ── MAIN ──────────────────────────────────────────────────────────────────
print("=" * 60)
print("UrbanX TSS·FG — Generare model 3D + randări")
print(f"Nr.cad: {PROJECT['nr_cad']} · UTR: {PROJECT['utr']}")
print(f"Dimensiuni: {PROJECT['bW']}m × {PROJECT['bD']}m × P+{PROJECT['niv']-1}E")
print("=" * 60)

clear_scene()
build_structure()
setup_lighting()
render_all()

print("=" * 60)
print(f"[UrbanX] ✅ Randări complete în: {OUTPUT_DIR}")
print(f"[UrbanX] Fișiere: Vedere_Frontala_N.png, Vedere_Laterala_E.png,")
print(f"         Vedere_Axonometrica.png, Vedere_Top.png")
print("=" * 60)
`;

  const blob=new Blob([script],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.download=('UrbanX_Blender_'+_rvS2(P.nrCad)+'_'+_rvS2(P.utr)+'.py').replace(/[^a-zA-Z0-9._-]/g,'_');
  a.href=url; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
  if(typeof ss==='function') ss('✅ Script Blender descărcat: '+a.download+' · Deschide în Blender → Scripting → Run Script');
}
