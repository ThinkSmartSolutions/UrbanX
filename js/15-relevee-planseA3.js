// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-planseA3.js — Export Planșe Arhitecturale A3 v2.0
// UrbanX TSS·FG — Extrage drawPlan/drawFacade/drawSection din _rvExportPDF
// Fond alb · Scale standard 1:100/200/250/500 · A3 landscape · 7 pagini
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
    const obs=new MutationObserver(()=>{
      const a=document.querySelector('.rv-expbtn');
      if(a&&!document.getElementById('rv-planseA3-btn')) _injectBtn(a);
    });
    obs.observe(document.body,{childList:true,subtree:true});
    setTimeout(()=>_injectBtn(),1500);
    setInterval(()=>_injectBtn(),3000);
    console.log('[PlanseA3 v2] loaded');
    // Fix meniu releveu: observăm când panoul stâng devine ascuns
    const menuObs = new MutationObserver(()=>{
      const lpanel = document.getElementById('rv-lpanel-main');
      const modal  = document.getElementById('rv-modal');
      if(!lpanel || !modal) return;
      // Detectăm dacă panoul e ascuns (mobil: translateX sau display:none)
      const hidden = lpanel.style.display==='none' || getComputedStyle(lpanel).left==='-260px';
      let fab = document.getElementById('rv-lpanel-fab');
      if(hidden && !fab){
        fab = document.createElement('button');
        fab.id = 'rv-lpanel-fab';
        fab.innerHTML = '☰';
        fab.title = 'Deschide panoul de analiză';
        fab.style.cssText = [
          'position:fixed','bottom:80px','left:12px','z-index:9999',
          'width:40px','height:40px','border-radius:50%','cursor:pointer',
          'background:rgba(212,175,55,.85)','border:none','color:#0B1426',
          'font-size:18px','font-weight:700','box-shadow:0 2px 8px rgba(0,0,0,.4)',
          'display:flex','align-items:center','justify-content:center',
          'transition:all .2s',
        ].join(';');
        fab.onclick = ()=>{
          lpanel.style.display = '';
          lpanel.classList.add('rv-lpanel-open');
          // Pe desktop: forțăm vizibilitate
          if(window.innerWidth>=768){
            lpanel.style.cssText='';
          }
          fab.remove();
        };
        document.body.appendChild(fab);
      } else if(!hidden && fab){
        fab.remove();
      }
    });
    menuObs.observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:['style','class']});
  });
  function _injectBtn(anchor){
    if(document.getElementById('rv-planseA3-btn')) return;
    const a=anchor||document.querySelector('.rv-expbtn');
    if(!a) return;
    const btn=document.createElement('button');
    btn.id='rv-planseA3-btn';
    btn.innerHTML='📐 Planșe A3';
    btn.title='Export 7 planșe arhitecturale A3 profesionale';
    btn.style.cssText=['height:32px','padding:0 12px','border-radius:7px','cursor:pointer',
      'font-family:inherit','font-size:11px','font-weight:800','margin-left:6px',
      'background:rgba(99,102,241,.18)','border:1.5px solid rgba(99,102,241,.55)',
      'color:#818cf8','display:inline-flex','align-items:center','flex-shrink:0'].join(';');
    btn.onmouseover=()=>btn.style.background='rgba(99,102,241,.35)';
    btn.onmouseout=()=>btn.style.background='rgba(99,102,241,.18)';
    btn.onclick=()=>_rvExportPlanseA3();
    a.parentElement.insertBefore(btn,a.nextSibling);
    console.log('[PlanseA3] buton injectat');
  }
})();

async function _rvExportPlanseA3(){
  const P=_RV.parcelParams,b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  // parametri tehnici derivati (seism/clima/incendiu) — ACEEASI calitate ca motorul de documentatii
  let _pA3acCache=null;
  const _pA3ac=()=>{ if(_pA3acCache)return _pA3acCache; try{ _pA3acCache=(window.UX_DRAW&&window.UX_DRAW.derivedParamsFor)?window.UX_DRAW.derivedParamsFor(Object.assign({scArea:b.scArea},P)):{}; }catch(e){_pA3acCache={};} return _pA3acCache; };
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
  if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  const btn=document.getElementById('rv-planseA3-btn');
  if(btn){btn.innerHTML='⏳…';btn.style.opacity='.6';}
  if(typeof ss==='function') ss('⏳ Generez 7 planșe A3…');

  const W=420,H=297;
  const pdf=new _jsPDF({orientation:'landscape',unit:'mm',format:'a3'});
  let pgN=0;
  const newPg=()=>{if(pgN>0)pdf.addPage();pgN++;};

  const S2=s=>String(s||'')
    .replace(/\u0219/g,'\u015F').replace(/\u0218/g,'\u015E')
    .replace(/\u021B/g,'\u0163').replace(/\u021A/g,'\u0162')
    .replace(/\u0103/g,'a').replace(/\u0102/g,'A')
    .replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ')
    .replace(/\s+/g,' ').trim().slice(0,400);
  const RN=(n,d)=>isNaN(n)?'—':d?Number(n).toFixed(d):Math.round(n)+'';

  const C={
    black:[10,15,25],white:[255,255,255],
    wall:[15,25,50],wallInt:[40,50,80],wallFill:[30,40,70],
    gold:[180,140,30],dark2:[15,25,50],
    grid:[200,210,225],
    living:[255,252,245],bedroom:[250,255,252],kitchen:[248,252,255],
    bath:[252,248,255],hall:[248,250,255],core:[235,242,255],
    balcon:[255,254,242],office:[248,252,255],commercial:[255,248,252],
    storage:[250,250,252],meeting:[255,250,245],
    red:[180,30,30],blue:[30,70,180],green:[20,120,50],
    cyan:[20,160,180],orange:[180,80,20],
    gray:[120,130,145],gray2:[205,210,218],
  };

  const SCALES=[50,100,150,200,250,500,1000];
  const pickSc=(dimM,maxMM)=>SCALES.find(s=>s>=dimM*1000/maxMM)||SCALES[SCALES.length-1];

  const aW=W-55,aH=H-30;
  const SC_RATIO=pickSc(Math.max(b.bW+P.rl*2,b.bD+P.rf+P.rs),Math.min(aW,aH));
  const sc=1000/SC_RATIO,scLabel='Sc. 1:'+SC_RATIO;

  const drawNord=(x,y,dir,sz)=>{
    sz=sz||7;
    const rot={N:0,S:Math.PI,E:Math.PI/2,V:-Math.PI/2}[dir||'N']||0;
    const px=(a,d)=>[x+Math.sin(a+rot)*d,y-Math.cos(a+rot)*d];
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray);pdf.setLineWidth(0.3);pdf.circle(x,y,sz+1,'FD');
    const n=px(0,sz),s2=px(Math.PI,sz);
    pdf.setFillColor(...C.red);
    try{pdf.triangle(x,y,n[0]-sz*0.35,n[1],n[0]+sz*0.35,n[1],'F');}catch(e){pdf.setDrawColor(...C.red);pdf.setLineWidth(1.5);pdf.line(x,y,n[0],n[1]);}
    pdf.setFillColor(175,182,195);
    try{pdf.triangle(x,y,s2[0]-sz*0.35,s2[1],s2[0]+sz*0.35,s2[1],'F');}catch(e){}
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

  const cartus=(nr,titlu,scTxt)=>{
    pdf.setFillColor(...C.dark2);pdf.rect(0,0,W,9,'F');
    pdf.setFillColor(...C.gold);pdf.rect(0,8.5,W,0.7,'F');
    pdf.setFillColor(...C.gold);pdf.roundedRect(3,1.5,7,6,1,1,'F');
    pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('UX',6.5,6.2,{align:'center'});
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(9);
    pdf.text(S2(String(nr).padStart(2,'0')+'  '+titlu),13,6);
    pdf.setTextColor(200,210,230);pdf.setFont('helvetica','normal');pdf.setFontSize(6);
    pdf.text(S2((scTxt||scLabel)+'  ·  Nr.cad. '+P.nrCad+'  ·  UTR '+P.utr),W-4,6,{align:'right'});
    pdf.setFillColor(243,245,250);pdf.rect(0,H-7.5,W,7.5,'F');
    pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.15);pdf.line(0,H-7.5,W,H-7.5);
    // strip parametri tehnici derivati (aceeasi calitate ca motorul de documentatii)
    try{ if(window.UX_DRAW && window.UX_DRAW.paramsStrip){ pdf.setTextColor(70,90,120);pdf.setFont('helvetica','normal');pdf.setFontSize(4.6);
      pdf.text(S2(window.UX_DRAW.paramsStrip(_pA3ac())),W/2,H-4.2,{align:'center'}); } }catch(e){}
    pdf.setTextColor(110,125,145);pdf.setFont('helvetica','italic');pdf.setFontSize(4.5);
    pdf.text(S2('Nr.cad. '+P.nrCad+' · UTR: '+P.utr+' · '+P.W+'m×'+P.D+'m · '+P.area+'m² · UrbanX TSS·FG · Document orientativ — nu inlocuieste proiectul tehnic Legea 50/1991'),W/2,H-1.5,{align:'center'});
  };

  // ── drawPlan (extras din _rvExportPDF, fond alb) ──────────────────────
  const drawPlan=(fl,P_,b_,ox,oy,sc_)=>{
    const bW=b_.bW,bD=b_.bD;
    // Parcelă
    pdf.setFillColor(238,243,232);
    pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.3);pdf.setLineDashPattern([2,1.5],0);
    pdf.rect(ox-P_.rl*sc_,oy-P_.rf*sc_,P_.W*sc_,P_.D*sc_,'FD');pdf.setLineDashPattern([],0);
    // Clădire alb
    pdf.setFillColor(255,255,255);pdf.rect(ox,oy,bW*sc_,bD*sc_,'F');
    // Grilă structurală
    const nGX=Math.max(3,Math.round(bW/4.5)),nGY=Math.max(2,Math.round(bD/3.8));
    const gSpX=bW/nGX,gSpY=bD/nGY,bubR=Math.min(2.8,sc_*0.6);
    pdf.setDrawColor(195,205,220);pdf.setLineWidth(0.12);pdf.setLineDashPattern([1.5,1.5],0);
    for(let gi=0;gi<=nGX;gi++){const gx=ox+gi*gSpX*sc_;pdf.line(gx,oy-bubR*3,gx,oy+bD*sc_+bubR*3);}
    for(let gi=0;gi<=nGY;gi++){const gy=oy+gi*gSpY*sc_;pdf.line(ox-bubR*3,gy,ox+bW*sc_+bubR*3,gy);}
    pdf.setLineDashPattern([],0);
    // Bule axe
    for(let gi=0;gi<=nGX;gi++){
      const gx=ox+gi*gSpX*sc_;
      [oy-bubR*2.2,oy+bD*sc_+bubR*2.2].forEach(gy2=>{
        pdf.setFillColor(255,255,255);pdf.setDrawColor(30,50,100);pdf.setLineWidth(0.35);
        pdf.circle(gx,gy2,bubR,'FD');
        pdf.setTextColor(15,35,90);pdf.setFont('helvetica','bold');pdf.setFontSize(Math.min(4,bubR*1.3));
        pdf.text(String(gi+1),gx,gy2+1.2,{align:'center'});
      });
    }
    for(let gi=0;gi<=nGY;gi++){
      const gy=oy+gi*gSpY*sc_,ltr=String.fromCharCode(65+gi);
      [ox-bubR*2.2,ox+bW*sc_+bubR*2.2].forEach(gx2=>{
        pdf.setFillColor(255,255,255);pdf.setDrawColor(30,50,100);pdf.setLineWidth(0.35);
        pdf.circle(gx2,gy,bubR,'FD');
        pdf.setTextColor(15,35,90);pdf.setFont('helvetica','bold');pdf.setFontSize(Math.min(4,bubR*1.3));
        pdf.text(ltr,gx2,gy+1.2,{align:'center'});
      });
    }
    // Stâlpi
    const colSz=Math.max(1.0,0.4*sc_);
    for(let gi=0;gi<=nGX;gi++)for(let gj=0;gj<=nGY;gj++){
      const cx=ox+gi*gSpX*sc_,cy=oy+gj*gSpY*sc_;
      if(cx<=ox+bW*sc_+0.5&&cy<=oy+bD*sc_+0.5){
        pdf.setFillColor(20,40,85);pdf.rect(cx-colSz/2,cy-colSz/2,colSz,colSz,'F');
      }
    }
    // Camere
    const wallPx=Math.max(0.8,0.15*sc_);
    const cm={living:C.living,bedroom:C.bedroom,bedroom2:C.bedroom,bedroom3:C.bedroom,
      kitchen:C.kitchen,bath:C.bath,wc:C.bath,hall:C.hall,storage:C.storage,
      core:C.core,office:C.office,meeting:C.meeting,commercial:C.commercial,
      reception:C.commercial,balcon:C.balcon};
    fl.rects.sort((a,m_)=>(a.zIdx||0)-(m_.zIdx||0)).forEach(r=>{
      const rx=ox+r.x*sc_,ry=oy+r.y*sc_,rw=r.w*sc_,rh=r.h*sc_;
      if(rw<0.5||rh<0.5) return;
      const fc=cm[r.t]||[252,252,254];
      pdf.setFillColor(...fc);
      if(r.bal){
        pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.4);pdf.setLineDashPattern([2,1],0);
        pdf.rect(rx,ry,rw,rh,'FD');pdf.setLineDashPattern([],0);
      } else {
        pdf.setDrawColor(...(r.t==='core'?C.wall:C.wallInt));
        pdf.setLineWidth(r.t==='core'?wallPx*1.4:wallPx);
        pdf.rect(rx,ry,rw,rh,'FD');
      }
      if(r.t==='core'){
        const sp=Math.max(2,colSz*1.1);
        pdf.setDrawColor(50,80,160);pdf.setLineWidth(0.22);
        for(let hi=-(rh);hi<rw+rh;hi+=sp){
          const x1=Math.max(rx,rx+hi),y1=rx+hi<rx?ry+(rx-rx-hi):ry;
          const x2=Math.min(rx+rw,rx+hi+rh),y2=x2===rx+rw?ry+(rx+rw-(rx+hi)):ry+rh;
          if(x1<rx+rw&&x2>rx)pdf.line(x1,y1,x2,y2);
        }
      }
    });
    // Perete exterior
    const ewT=Math.max(1.5,0.25*sc_);
    pdf.setDrawColor(...C.wall);pdf.setLineWidth(ewT);
    pdf.rect(ox+ewT/2,oy+ewT/2,bW*sc_-ewT,bD*sc_-ewT,'S');
    pdf.setDrawColor(80,100,130);pdf.setLineWidth(0.25);
    pdf.rect(ox+ewT,oy+ewT,bW*sc_-ewT*2,bD*sc_-ewT*2,'S');
    // Ferestre
    fl.wins.forEach(w=>{
      const wSC=(w.w||w.h||1.2)*sc_;
      pdf.setFillColor(255,255,255);pdf.setDrawColor(255,255,255);pdf.setLineWidth(0.1);
      if(w.wall==='N')      pdf.rect(ox+w.x*sc_,oy-ewT,wSC,ewT,'F');
      else if(w.wall==='S') pdf.rect(ox+w.x*sc_,oy+bD*sc_,wSC,ewT,'F');
      else if(w.wall==='V') pdf.rect(ox-ewT,oy+w.y*sc_,ewT,wSC,'F');
      else                  pdf.rect(ox+bW*sc_,oy+w.y*sc_,ewT,wSC,'F');
      pdf.setDrawColor(30,130,190);pdf.setLineWidth(0.45);
      if(w.wall==='N'||w.wall==='S'){
        const fy=w.wall==='N'?oy-ewT:oy+bD*sc_;
        pdf.line(ox+w.x*sc_,fy,ox+w.x*sc_+wSC,fy);
        pdf.line(ox+w.x*sc_,fy+ewT,ox+w.x*sc_+wSC,fy+ewT);
        pdf.setDrawColor(120,180,220);pdf.setLineWidth(0.8);
        pdf.line(ox+w.x*sc_,fy+ewT*0.5,ox+w.x*sc_+wSC,fy+ewT*0.5);
      } else {
        const fx=w.wall==='V'?ox-ewT:ox+bW*sc_;
        pdf.line(fx,oy+w.y*sc_,fx,oy+w.y*sc_+wSC);
        pdf.line(fx+ewT,oy+w.y*sc_,fx+ewT,oy+w.y*sc_+wSC);
        pdf.setDrawColor(120,180,220);pdf.setLineWidth(0.8);
        pdf.line(fx+ewT*0.5,oy+w.y*sc_,fx+ewT*0.5,oy+w.y*sc_+wSC);
      }
    });
    // Uși
    fl.doors.forEach(d=>{
      const dx=ox+d.x*sc_,dy_d=d.y!=null?oy+d.y*sc_:oy+bD*sc_,dw=d.w*sc_,isMain=d.type==='main';
      pdf.setFillColor(255,255,255);
      if(isMain||d.y==null) pdf.rect(dx,oy+bD*sc_-ewT,dw,ewT,'F');
      else pdf.rect(dx-ewT/2,dy_d-ewT/2,dw+ewT,ewT,'F');
      pdf.setDrawColor(...(isMain?C.orange:C.wall));pdf.setLineWidth(isMain?0.7:0.45);
      const sw=d.swing||'right';
      if(isMain){
        pdf.line(dx,oy+bD*sc_,dx+dw,oy+bD*sc_);
        pdf.setDrawColor(200,80,10);pdf.setLineWidth(0.35);
        let pa=dx,pb=oy+bD*sc_;
        for(let a=0.15;a<=Math.PI/2+0.01;a+=0.15){
          const ax=dx+dw*Math.sin(a),ay=oy+bD*sc_-dw*(1-Math.cos(a));
          pdf.line(pa,pb,ax,ay);pa=ax;pb=ay;
        }
      } else if(sw==='right'){
        pdf.line(dx,dy_d,dx+dw,dy_d);
        let pa=dx,pb=dy_d;
        for(let a=0.2;a<=Math.PI/2;a+=0.2){
          const ax=dx+dw*Math.sin(a),ay=dy_d-dw*(1-Math.cos(a));
          pdf.line(pa,pb,ax,ay);pa=ax;pb=ay;
        }
      } else {
        pdf.line(dx,dy_d,dx+dw,dy_d);
        let pa=dx+dw,pb=dy_d;
        for(let a=0.2;a<=Math.PI/2;a+=0.2){
          const ax=dx+dw-dw*Math.sin(a),ay=dy_d-dw*(1-Math.cos(a));
          pdf.line(pa,pb,ax,ay);pa=ax;pb=ay;
        }
      }
    });
    // Simboluri scări+lift
    fl.rects.filter(r=>r.t==='core').forEach(core=>{
      const rx=ox+core.x*sc_,ry=oy+core.y*sc_,rw=core.w*sc_,rh=core.h*sc_;
      const lW=Math.min(rw*0.42,3.5*sc_),lH=Math.min(rh*0.58,4*sc_);
      const lx=rx+rw*0.52,ly=ry+rh*0.18;
      pdf.setFillColor(225,235,252);pdf.setDrawColor(40,80,160);pdf.setLineWidth(0.5);
      pdf.rect(lx,ly,lW,lH,'FD');
      pdf.setDrawColor(80,120,200);pdf.setLineWidth(0.3);
      pdf.line(lx,ly,lx+lW,ly+lH);pdf.line(lx+lW,ly,lx,ly+lH);
      const stX=rx+rw*0.04,stY=ry+rh*0.08,stW=rw*0.44,stH=rh*0.78;
      const nSt=Math.max(5,Math.floor(stH/2.5));
      pdf.setFillColor(238,242,252);pdf.setDrawColor(40,70,140);pdf.setLineWidth(0.4);
      pdf.rect(stX,stY,stW,stH,'FD');
      pdf.setDrawColor(60,90,160);pdf.setLineWidth(0.2);
      for(let si=1;si<nSt;si++) pdf.line(stX,stY+si*(stH/nSt),stX+stW,stY+si*(stH/nSt));
      pdf.setDrawColor(30,60,140);pdf.setLineWidth(0.5);
      const arY=stY+stH*0.5;
      pdf.line(stX+stW*0.25,arY,stX+stW*0.75,arY);
      pdf.line(stX+stW*0.55,arY-1.5,stX+stW*0.75,arY);
      pdf.line(stX+stW*0.55,arY+1.5,stX+stW*0.75,arY);
    });
    // Etichete camere
    const tN={living:'LIVING',bedroom:'DORMITOR',bedroom2:'DORMITOR 2',bedroom3:'DORMITOR 3',
      kitchen:'BUCATARIE',bath:'BAIE',wc:'WC',hall:'HOL',storage:'DEPOZITARE',
      core:'SCARI/LIFT',office:'BIROU',meeting:'SEDINTE',
      commercial:'COMERCIAL',reception:'RECEPTIE',balcon:'BALCON'};
    fl.rects.forEach(r=>{
      if(r.t==='core'||r.bal) return;
      const rx=ox+r.x*sc_,ry=oy+r.y*sc_,rw=r.w*sc_,rh=r.h*sc_;
      if(rw<6||rh<5) return;
      const nm=S2(tN[r.t]||String(r.lbl||r.t).toUpperCase()).replace(/[\u{1F000}-\u{1FAFF}]/gu,'').trim();
      const fsz=Math.min(4.5,rw/8,rh/4);
      pdf.setTextColor(15,40,90);pdf.setFont('helvetica','bold');pdf.setFontSize(fsz);
      const ws=nm.split(' '),l1=ws.slice(0,Math.ceil(ws.length/2)).join(' '),l2=ws.slice(Math.ceil(ws.length/2)).join(' ');
      if(l2){pdf.text(S2(l1),rx+rw/2,ry+rh/2-fsz*0.4,{align:'center'});pdf.text(S2(l2),rx+rw/2,ry+rh/2+fsz*0.7,{align:'center'});}
      else pdf.text(S2(l1),rx+rw/2,ry+rh/2+fsz*0.3,{align:'center'});
      if(rw>12&&rh>8){
        pdf.setTextColor(70,90,120);pdf.setFont('helvetica','normal');pdf.setFontSize(Math.min(4,fsz*0.82));
        pdf.text(RN(r.w*r.h,1)+' m²',rx+rw/2,ry+rh/2+(l2?fsz*1.7:fsz*1.1)+2,{align:'center'});
      }
    });
    // Cote în lanț
    const dimY=oy+bD*sc_+11,dimX=ox-12;
    pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.28);
    let pGx=ox;
    for(let gi=1;gi<=nGX;gi++){
      const gx=ox+gi*gSpX*sc_;
      pdf.line(pGx,dimY,gx,dimY);pdf.line(pGx,dimY-2,pGx,dimY+2);pdf.line(gx,dimY-2,gx,dimY+2);
      pdf.setTextColor(15,35,90);pdf.setFont('helvetica','normal');pdf.setFontSize(3.8);
      pdf.text(gSpX.toFixed(2)+' m',(pGx+gx)/2,dimY+4,{align:'center'});pGx=gx;
    }
    pdf.setLineWidth(0.5);
    pdf.line(ox,dimY+7,ox+bW*sc_,dimY+7);
    pdf.line(ox,dimY+5,ox,dimY+9);pdf.line(ox+bW*sc_,dimY+5,ox+bW*sc_,dimY+9);
    pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text(bW.toFixed(2)+' m',ox+bW*sc_/2,dimY+13,{align:'center'});
    let pGy=oy;
    pdf.setLineWidth(0.28);
    for(let gi=1;gi<=nGY;gi++){
      const gy=oy+gi*gSpY*sc_;
      pdf.line(dimX,pGy,dimX,gy);pdf.line(dimX-2,pGy,dimX+2,pGy);pdf.line(dimX-2,gy,dimX+2,gy);
      pdf.setFont('helvetica','normal');pdf.setFontSize(3.8);
      pdf.text(gSpY.toFixed(2)+' m',dimX-4,(pGy+gy)/2,{align:'center',angle:90});pGy=gy;
    }
    pdf.setLineWidth(0.5);
    pdf.line(dimX-8,oy,dimX-8,oy+bD*sc_);
    pdf.line(dimX-10,oy,dimX-6,oy);pdf.line(dimX-10,oy+bD*sc_,dimX-6,oy+bD*sc_);
    pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text(bD.toFixed(2)+' m',dimX-15,oy+bD*sc_/2,{align:'center',angle:90});
    // Stradă
    pdf.setFillColor(215,220,235);
    pdf.rect(ox-P_.rl*sc_,oy+bD*sc_+P_.rs*sc_,P_.W*sc_,4,'F');
    pdf.setTextColor(55,75,115);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
    pdf.text(S2('^ FRONT STRADAL  ^  '+(P_.frontDir||'N')+'  ·  Nr.cad. '+P_.nrCad),
      ox+bW*sc_/2,oy+bD*sc_+P_.rs*sc_+3,{align:'center'});
  };

  // ── drawSection ─────────────────────────────────────────────────────────
  const drawSection=(b_,P_,ox,oy,sW,sH,sc_,lbl)=>{
    const niv=b_.niv;
    const zC=[[255,248,235],[245,255,248],[238,248,255],[248,242,255]];
    for(let i=0;i<niv;i++){
      const fy=oy+sH-(i+1)*P_.hn*sc_;
      pdf.setFillColor(...zC[i%4]);pdf.rect(ox,fy,sW,P_.hn*sc_,'F');
      pdf.setFillColor(165,180,198);pdf.rect(ox,fy-1.5,sW,1.5,'F');
      pdf.setDrawColor(130,145,165);pdf.setLineWidth(0.18);
      for(let hx=0;hx<sW;hx+=2.5)pdf.line(ox+hx,fy-1.5,ox+hx+1.5,fy);
      pdf.setTextColor(80,95,115);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
      pdf.text(i===0?'P':'E'+i,ox-7,oy+sH-i*P_.hn*sc_-P_.hn*sc_/2+1.5);
      pdf.setTextColor(140,155,175);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);
      pdf.text(P_.hn.toFixed(1)+'m',ox+sW+2.5,oy+sH-i*P_.hn*sc_-P_.hn*sc_/2+1.5);
    }
    if(b_.cores&&b_.cores.length){
      const c=b_.cores[Math.floor(b_.cores.length/2)];
      const cW=Math.min((c.h||c.w||2.4)*sc_,sW*0.25),cX=ox+sW/2-cW/2;
      for(let i=0;i<niv;i++){
        const fy=oy+sH-(i+1)*P_.hn*sc_;
        pdf.setFillColor(185,212,250);pdf.setDrawColor(...C.blue);pdf.setLineWidth(0.4);
        pdf.rect(cX,fy,cW,P_.hn*sc_,'FD');
        const st=7,sw2=cW/st,sh2=P_.hn*sc_/st;
        pdf.setDrawColor(75,125,195);pdf.setLineWidth(0.3);
        for(let s=0;s<st;s++){pdf.line(cX+s*sw2,fy+s*sh2,cX+(s+1)*sw2,fy+s*sh2);pdf.line(cX+(s+1)*sw2,fy+s*sh2,cX+(s+1)*sw2,fy+(s+1)*sh2);}
      }
    }
    const ewS=Math.max(1.8,0.28*sc_);
    pdf.setFillColor(190,198,215);
    pdf.rect(ox,oy,ewS,sH,'F');pdf.rect(ox+sW-ewS,oy,ewS,sH,'F');
    pdf.setDrawColor(80,95,115);pdf.setLineWidth(0.25);
    for(let hy=0;hy<sH;hy+=2.5){pdf.line(ox,oy+hy,ox+ewS,oy+hy+ewS);pdf.line(ox+sW-ewS,oy+hy,ox+sW,oy+hy+ewS);}
    pdf.setFillColor(165,175,192);pdf.setDrawColor(125,140,160);pdf.setLineWidth(0.4);
    pdf.rect(ox-4,oy+sH,sW+8,4,'FD');
    pdf.setTextColor(88,103,123);pdf.setFont('helvetica','italic');pdf.setFontSize(5.5);
    pdf.text('COTA ±0.00 (CTN)',ox,oy+sH+9);
    pdf.setDrawColor(...C.wall);pdf.setLineWidth(1.2);pdf.rect(ox,oy,sW,sH,'S');
    pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.35);
    pdf.line(ox+sW+4,oy,ox+sW+4,oy+sH);
    pdf.line(ox+sW+3,oy,ox+sW+5,oy);pdf.line(ox+sW+3,oy+sH,ox+sW+5,oy+sH);
    pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
    pdf.text('H='+(niv*P_.hn).toFixed(1)+'m',ox+sW+10,oy+sH/2+2);
    pdf.setFontSize(5);pdf.setFont('helvetica','normal');pdf.text(niv+' niv.',ox+sW+10,oy+sH/2+8);
    if(lbl){pdf.setTextColor(25,40,80);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text(S2(lbl),ox+sW/2,oy-4,{align:'center'});}
  };

  // ── drawFacade ───────────────────────────────────────────────────────────
  const drawFacade=(b_,P_,ox,oy,fW,fH,sc_,lbl)=>{
    const niv=b_.niv;
    pdf.setFillColor(238,242,250);pdf.rect(ox,oy,fW,fH,'F');
    for(let i=0;i<niv;i++){
      if(i%2===0){pdf.setFillColor(246,249,255);pdf.rect(ox,oy+fH-(i+1)*P_.hn*sc_,fW,P_.hn*sc_,'F');}
      pdf.setFillColor(195,205,218);pdf.rect(ox,oy+fH-i*P_.hn*sc_-1.2,fW,1.2,'F');
      pdf.setTextColor(120,135,155);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
      pdf.text(i===0?'P':'E'+i,ox-6,oy+fH-i*P_.hn*sc_-P_.hn*sc_/2+1.5);
      const wCols=Math.max(2,Math.floor(b_.bW/3.2));
      const wW2=Math.min(b_.bW/wCols*0.55,1.8)*sc_,wH2=P_.hn*0.42*sc_,colSp=fW/wCols,cC=Math.floor(wCols/2);
      const wy=oy+fH-(i+1)*P_.hn*sc_+(P_.hn*sc_-wH2)*0.28;
      for(let col=0;col<wCols;col++){
        const wx=ox+col*colSp+(colSp-wW2)/2;
        if(col===cC){pdf.setFillColor(215,228,245);pdf.setDrawColor(...C.blue);pdf.setLineWidth(0.4);pdf.rect(wx+wW2*0.25,wy,wW2*0.5,wH2,'FD');}
        else{
          pdf.setFillColor(195,220,250);pdf.setDrawColor(70,130,195);pdf.setLineWidth(0.4);pdf.rect(wx,wy,wW2,wH2,'FD');
          pdf.setFillColor(180,210,240);pdf.rect(wx,wy,wW2,wH2*0.45,'F');
          pdf.setDrawColor(140,180,220);pdf.setLineWidth(0.15);
          pdf.line(wx+wW2/2,wy,wx+wW2/2,wy+wH2);pdf.line(wx,wy+wH2/2,wx+wW2,wy+wH2/2);
        }
      }
      const bY=oy+fH-(i+1)*P_.hn*sc_+P_.hn*sc_*0.82;
      pdf.setFillColor(195,205,218);pdf.rect(ox+fW*0.03,bY,fW*0.94,1.5,'F');
    }
    const eW2=2.2*sc_,eH2=2.8*sc_,eX=ox+fW/2-eW2/2,eY=oy+fH-eH2;
    pdf.setFillColor(175,190,210);pdf.rect(eX,eY,eW2,eH2,'F');
    pdf.setDrawColor(90,120,160);pdf.setLineWidth(0.7);pdf.rect(eX,eY,eW2,eH2,'S');
    pdf.setDrawColor(120,145,175);pdf.setLineWidth(0.25);pdf.line(eX+eW2/2,eY,eX+eW2/2,eY+eH2);
    pdf.setDrawColor(...C.wall);pdf.setLineWidth(1.2);pdf.rect(ox,oy,fW,fH,'S');
    pdf.setDrawColor(90,105,125);pdf.setLineWidth(0.9);pdf.line(ox-5,oy+fH,ox+fW+10,oy+fH);
    pdf.setTextColor(80,95,115);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
    pdf.text('COTA ±0.00 (CTN)',ox,oy+fH+3.5);
    pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.35);
    pdf.line(ox+fW+3,oy,ox+fW+3,oy+fH);
    pdf.line(ox+fW+2,oy,ox+fW+4,oy);pdf.line(ox+fW+2,oy+fH,ox+fW+4,oy+fH);
    pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
    pdf.text('H='+(niv*P_.hn).toFixed(1)+'m',ox+fW+10,oy+fH/2+2);
    pdf.setFontSize(5);pdf.setFont('helvetica','normal');pdf.text(niv+' niv.',ox+fW+10,oy+fH/2+8);
    const cly=oy+fH+8;
    pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.4);
    pdf.line(ox,cly,ox+fW,cly);pdf.line(ox,cly-2,ox,cly+2);pdf.line(ox+fW,cly-2,ox+fW,cly+2);
    pdf.setTextColor(20,40,90);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text(RN(fW/sc_,2)+' m',ox+fW/2,cly+4,{align:'center'});
    if(lbl){pdf.setTextColor(25,40,80);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text(S2(lbl),ox+fW/2,oy-3,{align:'center'});}
  };

  // ═══════════════════════════════════════════════════════════════════════
  // GENERARE PAGINI
  // ═══════════════════════════════════════════════════════════════════════
  const fl0=_RV.floors[0]||_RV.floors[_RV.floor];
  const fl1=_RV.floors[1]||fl0;
  const ox0=42,oy0=14;

  // ── P1 & P2: PLANURI ────────────────────────────────────────────────────
  [['01','PLAN PARTER · '+S2(FN_CONFIG[_RV.fn]?.label||'Rezidential'),fl0],
   ['02','PLAN ETAJ TIP (E1-E'+(b.niv-1)+')',fl1]].forEach(([nr,titlu,fl])=>{
    newPg();pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
    cartus(nr,titlu);
    drawPlan(fl,P,b,ox0,oy0,sc);
    drawNord(W-18,oy0+10,P.frontDir,7);
    drawSc(ox0,oy0+b.bD*sc+P.rs*sc+22,sc,scLabel);
  });

  // ── P3: ACOPERIȘ ────────────────────────────────────────────────────────
  newPg();pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
  cartus('03','PLAN ACOPERIS · PANTA 30°');
  const ovh=0.6*sc,bWp=b.bW*sc,bDp=b.bD*sc,tax=ox0+15,tay=oy0+10;
  pdf.setFillColor(210,215,225);pdf.rect(tax-ovh,tay-ovh,bWp+ovh*2,bDp+ovh*2,'F');
  pdf.setFillColor(235,238,245);pdf.rect(tax,tay,bWp,bDp,'F');
  pdf.setDrawColor(80,95,115);pdf.setLineWidth(0.7);pdf.line(tax+bWp/2,tay,tax+bWp/2,tay+bDp);
  pdf.setLineWidth(0.3);
  [[tax-ovh,tay-ovh],[tax+bWp+ovh,tay-ovh],[tax-ovh,tay+bDp+ovh],[tax+bWp+ovh,tay+bDp+ovh]].forEach(([px,py])=>{
    pdf.line(px,py,tax+bWp/2,tay+bDp/2);
  });
  pdf.setLineDashPattern([3,2],0);pdf.rect(tax,tay,bWp,bDp,'S');pdf.setLineDashPattern([],0);
  pdf.setDrawColor(...C.wall);pdf.setLineWidth(0.6);pdf.rect(tax-ovh,tay-ovh,bWp+ovh*2,bDp+ovh*2,'S');
  // Cote acoperiș
  pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.4);
  pdf.line(tax-ovh,tay-ovh-7,tax+bWp+ovh,tay-ovh-7);
  pdf.line(tax-ovh,tay-ovh-9,tax-ovh,tay-ovh-5);pdf.line(tax+bWp+ovh,tay-ovh-9,tax+bWp+ovh,tay-ovh-5);
  pdf.setTextColor(20,40,90);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
  pdf.text(RN(b.bW+2*0.6,1)+'m (cu streaș.)',tax+bWp/2,tay-ovh-9.5,{align:'center'});
  pdf.line(tax-ovh-7,tay-ovh,tax-ovh-7,tay+bDp+ovh);
  pdf.line(tax-ovh-9,tay-ovh,tax-ovh-5,tay-ovh);pdf.line(tax-ovh-9,tay+bDp+ovh,tax-ovh-5,tay+bDp+ovh);
  pdf.text(RN(b.bD+2*0.6,1)+'m',tax-ovh-9.5,tay+bDp/2,{align:'center',angle:90});
  pdf.setTextColor(90,100,120);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
  pdf.text('COAMA',tax+bWp/2+1.5,tay+bDp/2,{align:'center',angle:90});
  drawNord(W-18,oy0+10,P.frontDir,7);
  drawSc(ox0,tay+bDp+ovh+18,sc,scLabel);

  // ── P4 & P5: SECȚIUNI ───────────────────────────────────────────────────
  const sectDims=[
    {dim:b.bD,nr:'04',titlu:'SECTIUNE A-A LONGITUDINALA',lbl:'SECTIUNE A-A — plan de taiere prin casa scarilor'},
    {dim:b.bW,nr:'05',titlu:'SECTIUNE B-B TRANSVERSALA',lbl:'SECTIUNE B-B'},
  ];
  sectDims.forEach(({dim,nr,titlu,lbl})=>{
    const scS=SCALES.find(s=>s>=pickSc(dim,aW-30))||500;
    const scSMM=1000/scS;
    const sW_=dim*scSMM,sH_=b.niv*P.hn*scSMM;
    newPg();pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
    cartus(nr,titlu,'Sc. 1:'+scS);
    drawSection(b,P,ox0+15,oy0+12,sW_,sH_,scSMM,lbl);
    drawNord(W-18,oy0+10,P.frontDir,7);
    drawSc(ox0,oy0+sH_+30,scSMM,'Sc. 1:'+scS);
  });

  // ── P6: FAȚADE ──────────────────────────────────────────────────────────
  newPg();pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
  const scF=SCALES.find(s=>s>=Math.max(pickSc(b.bW,(W-30)/2-20),pickSc(b.niv*P.hn,(H-28)/2-18)))||500;
  const scFMM=1000/scF;
  cartus('06','FATADE N · S · E · V','Sc. 1:'+scF);
  const fNW=b.bW*scFMM,fEW=b.bD*scFMM,fHH=b.niv*P.hn*scFMM;
  const c1x=22,c2x=W/2+8,r1y=14,r2y=14+(fHH+28);
  drawFacade(b,P,c1x,r1y,fNW,fHH,scFMM,'FATADA N (PRINCIPALA — FRONT STRADAL)');
  drawFacade(b,P,c2x,r1y,fNW,fHH,scFMM,'FATADA S (POSTERIOARA)');
  drawFacade(b,P,c1x,r2y,fEW,fHH,scFMM,'FATADA E (LATERALA DREAPTA)');
  drawFacade(b,P,c2x,r2y,fEW,fHH,scFMM,'FATADA V (LATERALA STANGA)');
  drawNord(W-12,14,P.frontDir,6);

  // ── P7: PLAN TEREN + LEGENDĂ + DATE GENERALE ────────────────────────────
  newPg();pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
  const scT2=SCALES.find(s=>s>=pickSc(Math.max(P.W,P.D),W*0.28))||500;
  const scTMM=1000/scT2;
  cartus('07','PLAN INCADRARE IN TEREN · LEGENDA · DATE GENERALE','Sc. 1:'+scT2);
  const tx=15,ty=14;
  pdf.setFillColor(232,245,225);pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.5);
  pdf.setLineDashPattern([3,2],0);pdf.rect(tx,ty,P.W*scTMM,P.D*scTMM,'FD');pdf.setLineDashPattern([],0);
  pdf.setFillColor(200,210,230);pdf.setDrawColor(...C.wall);pdf.setLineWidth(0.5);
  pdf.rect(tx+P.rl*scTMM,ty+P.rf*scTMM,b.bW*scTMM,b.bD*scTMM,'FD');
  pdf.setFillColor(190,195,210);pdf.rect(tx,ty+P.D*scTMM,P.W*scTMM,6,'F');
  pdf.setTextColor(60,75,95);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
  pdf.text('STRADA PRINCIPALA',tx+P.W*scTMM/2,ty+P.D*scTMM+4.5,{align:'center'});
  pdf.setFillColor(...C.gold);
  try{pdf.triangle(tx+P.W*scTMM/2,ty+P.D*scTMM,tx+P.W*scTMM/2-2,ty+P.D*scTMM-3,tx+P.W*scTMM/2+2,ty+P.D*scTMM-3,'F');}catch(e){}
  // Cote retrageri
  pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.3);
  if(P.rl>0){
    pdf.line(tx,ty+P.rf*scTMM,tx+P.rl*scTMM,ty+P.rf*scTMM);
    pdf.line(tx,ty+P.rf*scTMM-2,tx,ty+P.rf*scTMM+2);pdf.line(tx+P.rl*scTMM,ty+P.rf*scTMM-2,tx+P.rl*scTMM,ty+P.rf*scTMM+2);
    pdf.setTextColor(20,40,90);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
    pdf.text(RN(P.rl,1)+'m Rls',tx+P.rl*scTMM/2,ty+P.rf*scTMM-3,{align:'center'});
  }
  if(P.rf>0){
    pdf.line(tx+P.rl*scTMM,ty,tx+P.rl*scTMM,ty+P.rf*scTMM);
    pdf.setTextColor(20,40,90);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
    pdf.text(RN(P.rf,1)+'m Rf',tx+P.rl*scTMM+1,ty+P.rf*scTMM/2);
  }
  pdf.setTextColor(30,50,100);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
  pdf.text(S2(P.nrCad),tx+P.W*scTMM/2,ty+P.D*scTMM/4,{align:'center'});
  pdf.setFontSize(4.5);pdf.setFont('helvetica','normal');
  pdf.text(S2(P.W+'m×'+P.D+'m · '+P.area+'m²'),tx+P.W*scTMM/2,ty+P.D*scTMM/4+5,{align:'center'});
  drawNord(tx+P.W*scTMM/2,ty+P.D*scTMM+13,P.frontDir,6);
  drawSc(tx,ty+P.D*scTMM+22,scTMM,'Sc. 1:'+scT2);
  // Legendă
  const lgX=tx+P.W*scTMM+12,lgW=(W-20-lgX)/2-4;
  pdf.setFillColor(248,249,252);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.2);
  pdf.rect(lgX,ty,lgW,H-ty-8,'FD');
  pdf.setTextColor(25,40,75);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
  pdf.text('LEGENDA',lgX+lgW/2,ty+7,{align:'center'});
  const lgIt=[
    {f:C.wallFill,h:true,l:'Pereti portanti'},
    {f:[245,248,255],h:false,l:'Pereti neportanti'},
    {f:[240,245,255],l:'Goluri (usi, ferestre)'},
    {f:C.core,h:true,l:'Scara'},
    {f:C.core,l:'Lift'},
    {f:null,arr:true,l:'Acces principal'},
  ];
  lgIt.forEach((it,i)=>{
    const iy=ty+14+i*9;
    if(it.f){
      pdf.setFillColor(...it.f);pdf.setDrawColor(...C.wall);pdf.setLineWidth(0.3);
      pdf.rect(lgX+4,iy-3.5,7,5.5,'FD');
      if(it.h){pdf.setDrawColor(60,80,140);pdf.setLineWidth(0.18);for(let hx=0;hx<7;hx+=2)pdf.line(lgX+4+hx,iy-3.5,lgX+4+hx+2,iy+2);}
    } else if(it.arr){
      pdf.setFillColor(...C.gold);
      try{pdf.triangle(lgX+7.5,iy,lgX+5,iy-3.5,lgX+10,iy-3.5,'F');}catch(e){}
    }
    pdf.setTextColor(50,65,90);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
    pdf.text(S2(it.l),lgX+14,iy+0.5);
  });
  // Date generale
  const dgX=lgX+lgW+5,dgW=W-20-dgX;
  pdf.setFillColor(248,249,252);pdf.rect(dgX,ty,dgW,H-ty-8,'FD');
  pdf.setTextColor(25,40,75);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
  pdf.text('DATE GENERALE',dgX+dgW/2,ty+7,{align:'center'});
  const sdaT=Math.round(b.bW*b.bD*b.niv),scA=b.scArea?Math.round(b.scArea):Math.round(b.bW*b.bD*P.pot);
  const _ac=_pA3ac();
  const _dgRows=[['Suprafata construita:',scA+'m²'],
   ['Suprafata desfasurata:',sdaT+'m²'],
   ['Regim inaltime:','P+'+(b.niv-1)+'E'],
   ['Inaltime maxima:',(b.niv*P.hn).toFixed(1)+'m'],
   ['POT realizat:',RN(P.pot*100,0)+'%'],
   ['CUT realizat:',RN(P.cut,2)],
   ['Nr. cadastral:',S2(P.nrCad)],
   ['UTR:',S2(P.utr)],
   ['Suprafata parcela:',P.area+'m²'],
   ['Dim. parcela:',P.W+'m × '+P.D+'m'],
  ];
  // PARAMETRI TEHNICI derivati (aceeasi calitate ca formularul + documentele + planse noi)
  let _dgRowsAll=_dgRows;
  try{ if(_ac&&_ac.categorie_importanta&&window.UX_DRAW&&window.UX_DRAW.paramsRows){ _dgRowsAll=_dgRows.concat([['—— PARAMETRI TEHNICI ——','']]).concat(window.UX_DRAW.paramsRows(_ac)); } }catch(e){}
  const _dgN=_dgRowsAll.length, _dgAvail=(H-8)-(ty+14), _dgStep=Math.max(4.6,Math.min(7.5,_dgAvail/_dgN)), _dgFs=_dgStep<6?4.2:5;
  _dgRowsAll.forEach(([k,v],i)=>{
    const ry=ty+14+i*_dgStep;
    pdf.setTextColor(60,75,95);pdf.setFont('helvetica','bold');pdf.setFontSize(_dgFs);pdf.text(S2(k),dgX+3,ry);
    pdf.setTextColor(25,40,75);pdf.setFont('helvetica','normal');pdf.text(S2(v),dgX+40,ry);
    pdf.setDrawColor(225,230,238);pdf.setLineWidth(0.12);pdf.line(dgX+3,ry+1.6,dgX+dgW-3,ry+1.6);
  });

  // Salvare
  const fn=('planseA3_'+S2(P.nrCad)+'_'+S2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
  if(typeof ss==='function') ss('✅ Planșe A3: 7 pagini · '+fn+' · '+scLabel);
  if(btn){btn.innerHTML='📐 Planșe A3';btn.style.opacity='1';}
}
