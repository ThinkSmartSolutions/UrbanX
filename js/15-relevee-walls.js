// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-walls.js — Sprint 1: Pereți Reali + Parcelă Reală + SVG + Tabel
// UrbanX TSS·FG v1.0
//
// 1. drawPlanWalls()  — algoritm wall-extraction din adiacența camerelor
//                       pereți exteriori 28cm, interiori 14cm, hașuri 45°
//                       goluri corecte pentru uși și ferestre
// 2. drawSitePlanReal() — parcelă din ap.geo (geometrie reală WGS84)
// 3. _rvExportSVG()   — export SVG vectorial (Inkscape, LibreCAD, QCAD)
// 4. _rvExportTabelSuprafete() — brevet suprafețe PDF + CSV
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
    _injectButtons();
    const _wObs=setInterval(()=>{
      if(document.querySelector('.rv-expbtn')&&!document.getElementById('rv-walls-btns')) _injectButtons();
      if(document.getElementById('rv-walls-btns')) clearInterval(_wObs);
    },500);
    console.log('[Walls v1] ✅ loaded');
  });

  function _injectButtons(){
    if(document.getElementById('rv-walls-btns')) return;
    const a=document.querySelector('#rv-planseA3-btn')||document.querySelector('.rv-expbtn');
    if(!a) return;
    const wrap=document.createElement('span');
    wrap.id='rv-walls-btns';
    const btns=[
      {id:'rv-walls-btn',  icon:'🏗', label:'Planșe Pereți', fn:'_rvExportPlanseWalls',
       bg:'rgba(245,158,11,.18)', border:'rgba(245,158,11,.5)', color:'#fbbf24'},
      {id:'rv-svg-btn',    icon:'◼', label:'Export SVG',    fn:'_rvExportSVG',
       bg:'rgba(168,85,247,.18)', border:'rgba(168,85,247,.5)', color:'#c084fc'},
      {id:'rv-tabel-btn',  icon:'📋', label:'Tabel Suprafețe', fn:'_rvExportTabelSuprafete',
       bg:'rgba(20,184,166,.18)', border:'rgba(20,184,166,.5)', color:'#2dd4bf'},
    ];
    btns.forEach(b_=>{
      const btn=document.createElement('button');
      btn.id=b_.id;
      btn.innerHTML=b_.icon+' '+b_.label;
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
// ALGORITM WALL EXTRACTION
// ═══════════════════════════════════════════════════════════════════════════
function _extractWalls(rects, bW, bD, wins, doors, ew, iw){
  ew=ew||0.28; iw=iw||0.14;
  const EPS=0.05;
  // Colectăm toate segmentele de perete ca {x1,y1,x2,y2,type}
  // type: 'ext'=exterior, 'int'=interior
  const segs=[];

  // Pentru fiecare cameră, generăm 4 muchii
  rects.forEach(r=>{
    if(r.bal) return; // balcoanele nu generează pereți interiori
    const {x,y,w,h}=r;
    // Top, Bottom, Left, Right
    segs.push({x1:x,y1:y,    x2:x+w,y2:y,    axis:'H',side:'top',    room:r});
    segs.push({x1:x,y1:y+h,  x2:x+w,y2:y+h,  axis:'H',side:'bottom', room:r});
    segs.push({x1:x,y1:y,    x2:x,  y2:y+h,  axis:'V',side:'left',   room:r});
    segs.push({x1:x+w,y1:y,  x2:x+w,y2:y+h,  axis:'V',side:'right',  room:r});
  });

  // Găsim segmentele partajate (interior walls)
  const shared=new Set();
  for(let i=0;i<segs.length;i++){
    for(let j=i+1;j<segs.length;j++){
      const a=segs[i],b_=segs[j];
      if(a.axis!==b_.axis) continue;
      if(a.axis==='H'&&Math.abs(a.y1-b_.y1)<EPS){
        const x1=Math.max(a.x1,b_.x1),x2=Math.min(a.x2,b_.x2);
        if(x2-x1>EPS){ shared.add(i); shared.add(j); }
      } else if(a.axis==='V'&&Math.abs(a.x1-b_.x1)<EPS){
        const y1=Math.max(a.y1,b_.y1),y2=Math.min(a.y2,b_.y2);
        if(y2-y1>EPS){ shared.add(i); shared.add(j); }
      }
    }
  }

  // Construim lista de pereți cu tipul corect
  const walls=[];
  const seen=new Set();
  segs.forEach((s,i)=>{
    const key=`${s.axis}_${Math.min(s.x1,s.x2).toFixed(2)}_${Math.min(s.y1,s.y2).toFixed(2)}_${Math.max(s.x1,s.x2).toFixed(2)}_${Math.max(s.y1,s.y2).toFixed(2)}`;
    if(seen.has(key)) return;
    seen.add(key);
    const isShared=shared.has(i);
    const isExt=!isShared&&(
      s.y1<EPS||s.y1>bD-EPS||s.y2<EPS||s.y2>bD-EPS||
      s.x1<EPS||s.x1>bW-EPS||s.x2<EPS||s.x2>bW-EPS
    );
    const type = isExt?'ext': isShared?'int':'int';
    const thick = type==='ext'?ew:iw;
    walls.push({...s, type, thick});
  });

  // Aplicăm goluri pentru uși și ferestre
  // Un gol e un interval pe segmentul de perete
  const wallsFinal=[];
  walls.forEach(w=>{
    const gaps=[];
    // Ferestre
    wins.forEach(win=>{
      const wL=win.w||win.h||1.2;
      if(w.axis==='H'&&(win.wall==='N'||win.wall==='S')){
        const wy = win.wall==='N'?0:bD;
        if(Math.abs(w.y1-wy)<EPS){
          const wx1=win.x, wx2=win.x+wL;
          if(wx1>w.x1-EPS&&wx2<w.x2+EPS) gaps.push({a:wx1,b:wx2,type:'win'});
        }
      }
      if(w.axis==='V'&&(win.wall==='V'||win.wall==='E')){
        const wx = win.wall==='V'?0:bW;
        if(Math.abs(w.x1-wx)<EPS){
          const wy1=win.y, wy2=win.y+(win.h||wL);
          if(wy1>w.y1-EPS&&wy2<w.y2+EPS) gaps.push({a:wy1,b:wy2,type:'win'});
        }
      }
    });
    // Uși
    doors.forEach(d=>{
      if(w.axis==='H'){
        const dy = d.y!=null?d.y:bD;
        if(Math.abs(w.y1-dy)<EPS){
          const dx1=d.x, dx2=d.x+d.w;
          if(dx1>=w.x1-EPS&&dx2<=w.x2+EPS) gaps.push({a:dx1,b:dx2,type:'door'});
        }
      }
    });
    if(gaps.length===0){ wallsFinal.push(w); return; }
    // Sortăm gapurile
    gaps.sort((a,b_)=>a.a-b_.a);
    let prev = w.axis==='H'?w.x1:w.y1;
    gaps.forEach(g=>{
      if(g.a-prev>EPS){
        const seg={...w};
        if(w.axis==='H'){seg.x1=prev;seg.x2=g.a;}
        else{seg.y1=prev;seg.y2=g.a;}
        wallsFinal.push(seg);
      }
      // Segmentul golului (fereastră sau ușă — cu simbol propriu)
      wallsFinal.push({...w, x1:w.axis==='H'?g.a:w.x1, x2:w.axis==='H'?g.b:w.x2,
                             y1:w.axis==='V'?g.a:w.y1, y2:w.axis==='V'?g.b:w.y2,
                             type:g.type, thick:w.thick});
      prev=g.b;
    });
    const end = w.axis==='H'?w.x2:w.y2;
    if(end-prev>EPS){
      const seg={...w};
      if(w.axis==='H'){seg.x1=prev;seg.x2=end;}
      else{seg.y1=prev;seg.y2=end;}
      wallsFinal.push(seg);
    }
  });

  return wallsFinal;
}

// ═══════════════════════════════════════════════════════════════════════════
// drawPlanWalls — desenează planul cu pereți reali în jsPDF
// ═══════════════════════════════════════════════════════════════════════════
function _drawPlanWalls(pdf, fl, P, b, ox, oy, sc, C){
  const bW=b.bW, bD=b.bD;
  const EW=0.28*sc, IW=0.14*sc; // grosime în mm pe pagină
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();

  // Fundal parcelă
  pdf.setFillColor(240,245,235);
  pdf.setDrawColor(...C.gold); pdf.setLineWidth(0.4); pdf.setLineDashPattern([2.5,1.5],0);
  pdf.rect(ox-P.rl*sc,oy-P.rf*sc,P.W*sc,P.D*sc,'FD');
  pdf.setLineDashPattern([],0);

  // Fundal clădire (alb)
  pdf.setFillColor(255,255,255);
  pdf.rect(ox,oy,bW*sc,bD*sc,'F');

  // Grilă structurală
  const nGX=Math.max(3,Math.round(bW/4.5)), nGY=Math.max(2,Math.round(bD/3.8));
  const gSpX=bW/nGX, gSpY=bD/nGY, bubR=Math.min(3,sc*0.55);
  pdf.setDrawColor(210,218,230); pdf.setLineWidth(0.1); pdf.setLineDashPattern([1.2,1.8],0);
  for(let i=0;i<=nGX;i++){const gx=ox+i*gSpX*sc; pdf.line(gx,oy-bubR*3,gx,oy+bD*sc+bubR*3);}
  for(let i=0;i<=nGY;i++){const gy=oy+i*gSpY*sc; pdf.line(ox-bubR*3,gy,ox+bW*sc+bubR*3,gy);}
  pdf.setLineDashPattern([],0);
  // Bule axe
  for(let i=0;i<=nGX;i++){
    const gx=ox+i*gSpX*sc;
    [oy-bubR*2.3, oy+bD*sc+bubR*2.3].forEach(gy2=>{
      pdf.setFillColor(255,255,255); pdf.setDrawColor(25,45,95); pdf.setLineWidth(0.3);
      pdf.circle(gx,gy2,bubR,'FD');
      pdf.setTextColor(15,35,85); pdf.setFont('helvetica','bold'); pdf.setFontSize(Math.min(3.8,bubR*1.2));
      pdf.text(String(i+1),gx,gy2+1.1,{align:'center'});
    });
  }
  for(let i=0;i<=nGY;i++){
    const gy=oy+i*gSpY*sc, ltr=String.fromCharCode(65+i);
    [ox-bubR*2.3, ox+bW*sc+bubR*2.3].forEach(gx2=>{
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
  fl.rects.forEach(r=>{
    if(r.t==='core') return; // cores desenate separat
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
      pdf.rect(rx,ry,rw,rh,'F'); // fill only, bordura vine din pereți
    }
  });

  // Nuclee scări — cu hașuri și simboluri
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
    // Lift
    const lW=Math.min(rw*.42,3*sc), lH=Math.min(rh*.55,3.5*sc);
    const lx=rx+rw*.52, ly=ry+rh*.18;
    pdf.setFillColor(215,230,255); pdf.setDrawColor(35,75,165); pdf.setLineWidth(0.5);
    pdf.rect(lx,ly,lW,lH,'FD');
    pdf.setDrawColor(70,115,200); pdf.setLineWidth(0.25);
    pdf.line(lx,ly,lx+lW,ly+lH); pdf.line(lx+lW,ly,lx,ly+lH);
    // Scări
    const stX=rx+rw*.04, stY=ry+rh*.08, stW=rw*.44, stH=rh*.78;
    const nSt=Math.max(5,Math.floor(stH/2.2));
    pdf.setFillColor(235,242,255); pdf.setDrawColor(35,65,145); pdf.setLineWidth(0.35);
    pdf.rect(stX,stY,stW,stH,'FD');
    pdf.setDrawColor(55,85,165); pdf.setLineWidth(0.18);
    for(let si=1;si<nSt;si++) pdf.line(stX,stY+si*(stH/nSt),stX+stW,stY+si*(stH/nSt));
    // Săgeată direcție
    pdf.setDrawColor(25,55,140); pdf.setLineWidth(0.45);
    const arY=stY+stH*.5;
    pdf.line(stX+stW*.2,arY,stX+stW*.78,arY);
    pdf.line(stX+stW*.58,arY-1.2,stX+stW*.78,arY);
    pdf.line(stX+stW*.58,arY+1.2,stX+stW*.78,arY);
  });

  // PEREȚI — algoritmul principal
  const walls=_extractWalls(fl.rects,bW,bD,fl.wins,fl.doors,0.28,0.14);
  walls.forEach(w=>{
    const thick=(w.type==='ext'?EW:IW);
    const half=thick/2;
    if(w.type==='win'){
      // Simbol fereastră: 3 linii paralele
      pdf.setDrawColor(30,125,185); pdf.setLineWidth(0.45);
      if(w.axis==='H'){
        const py=oy+w.y1*sc;
        [-half,0,half].forEach(offset=>{
          pdf.line(ox+w.x1*sc,py+offset,ox+w.x2*sc,py+offset);
        });
      } else {
        const px=ox+w.x1*sc;
        [-half,0,half].forEach(offset=>{
          pdf.line(px+offset,oy+w.y1*sc,px+offset,oy+w.y2*sc);
        });
      }
      return;
    }
    if(w.type==='door'){
      // Ușă: linie foaie + arc (90°)
      pdf.setDrawColor(10,20,50); pdf.setLineWidth(0.5);
      if(w.axis==='H'){
        const py=oy+w.y1*sc;
        const dx1=ox+w.x1*sc, dx2=ox+w.x2*sc, dw=dx2-dx1;
        pdf.line(dx1,py,dx2,py); // foaie
        // Arc 90°
        pdf.setLineWidth(0.28);
        let pa=dx1, pb=py;
        for(let a=0.1;a<=Math.PI/2;a+=0.1){
          const ax=dx1+dw*Math.sin(a), ay=py-dw*(1-Math.cos(a));
          pdf.line(pa,pb,ax,ay); pa=ax; pb=ay;
        }
      } else {
        const px=ox+w.x1*sc;
        const dy1=oy+w.y1*sc, dy2=oy+w.y2*sc, dh=dy2-dy1;
        pdf.line(px,dy1,px,dy2);
        pdf.setLineWidth(0.28);
        let pa=px, pb=dy1;
        for(let a=0.1;a<=Math.PI/2;a+=0.1){
          const ax=px+dh*(1-Math.cos(a)), ay=dy1+dh*Math.sin(a);
          pdf.line(pa,pb,ax,ay); pa=ax; pb=ay;
        }
      }
      return;
    }
    // Perete normal (ext sau int)
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
    // Fill perete
    pdf.setFillColor(isExt?22:45, isExt?35:58, isExt?65:95);
    pdf.rect(rx,ry,rw,rh,'F');
    // Hașuri 45° în pereții exteriori
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

  // Cote în lanț X
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
  // Total X
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

  // Stradă + front
  pdf.setFillColor(210,215,228);
  pdf.rect(ox-P.rl*sc,oy+bD*sc+P.rs*sc,P.W*sc,4.5,'F');
  pdf.setTextColor(50,68,110); pdf.setFont('helvetica','bold'); pdf.setFontSize(5);
  pdf.text(S2('▲ FRONT STRADAL · '+(P.frontDir||'N')+'  ·  Nr.cad. '+P.nrCad),
    ox+bW*sc/2,oy+bD*sc+P.rs*sc+3.2,{align:'center'});
}

// ═══════════════════════════════════════════════════════════════════════════
// SITE PLAN CU GEOMETRIE REALĂ din ap.geo
// ═══════════════════════════════════════════════════════════════════════════
function _drawSitePlanReal(pdf, ap, P, b, ox, oy, scT, C){
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  if(!ap?.geo?.geometry?.coordinates){
    // Fallback la dreptunghi
    pdf.setFillColor(232,245,225); pdf.setDrawColor(...C.gold); pdf.setLineWidth(0.5);
    pdf.setLineDashPattern([3,2],0);
    pdf.rect(ox,oy,P.W*scT,P.D*scT,'FD');
    pdf.setLineDashPattern([],0);
    return;
  }
  // Proiectăm coordonatele WGS84 → mm pe pagină
  const coords=ap.geo.geometry.type==='Polygon'
    ? ap.geo.geometry.coordinates[0]
    : ap.geo.geometry.coordinates[0][0];
  if(!coords||coords.length<3) return;

  // Bounding box al parcelei
  const lons=coords.map(c=>c[0]), lats=coords.map(c=>c[1]);
  const lonMin=Math.min(...lons), lonMax=Math.max(...lons);
  const latMin=Math.min(...lats), latMax=Math.max(...lats);
  const lonSpan=lonMax-lonMin, latSpan=latMax-latMin;
  if(lonSpan<1e-8||latSpan<1e-8) return;

  // Factori de scală (proiecție locală liniară — suficient pentru < 5km)
  const cosLat=Math.cos((latMin+latMax)/2*Math.PI/180);
  const mPerDegLon=111319.5*cosLat, mPerDegLat=111319.5;
  const realW=lonSpan*mPerDegLon, realH=latSpan*mPerDegLat;
  const availW=P.W*scT, availH=P.D*scT;
  const scaleX=availW/realW, scaleY=availH/realH;

  // Convertim coordonate → mm pe pagină
  const toPage=([lon,lat])=>[
    ox+(lon-lonMin)*mPerDegLon*scaleX,
    oy+availH-(lat-latMin)*mPerDegLat*scaleY
  ];

  // Desenăm parcela ca poligon real
  pdf.setFillColor(232,245,225);
  pdf.setDrawColor(...C.gold); pdf.setLineWidth(0.6);
  pdf.setLineDashPattern([3,2],0);
  // Construim path manual (jsPDF nu are polygon fill nativ, simulăm cu linii)
  const pts=coords.map(toPage);
  // Fill aproximat cu dreptunghi (parcele nearectangulare)
  // Contur exact
  pdf.setLineDashPattern([],0);
  pdf.setDrawColor(...C.gold); pdf.setLineWidth(0.8);
  for(let i=0;i<pts.length-1;i++){
    if(i===0) pdf.setFillColor(232,245,225);
    pdf.line(pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1]);
  }
  pdf.line(pts[pts.length-1][0],pts[pts.length-1][1],pts[0][0],pts[0][1]);

  // Clădire footprint (poziționată conform retrageri)
  const bfX=ox+P.rl*scT, bfY=oy+(P.rf||0)*scT;
  const bfW=b.bW*scT, bfH=b.bD*scT;
  pdf.setFillColor(195,208,228); pdf.setDrawColor(15,25,55); pdf.setLineWidth(0.5);
  pdf.rect(bfX,bfY,bfW,bfH,'FD');

  // Hașuri pe clădire
  pdf.setDrawColor(55,75,115); pdf.setLineWidth(0.18);
  for(let hx=0;hx<bfW;hx+=2.5) pdf.line(bfX+hx,bfY,bfX+hx+2,bfY+2);

  // Stradă
  const stY=oy+P.D*scT;
  pdf.setFillColor(195,200,215);
  pdf.rect(ox,stY,P.W*scT,6,'F');
  pdf.setTextColor(55,70,100); pdf.setFont('helvetica','bold'); pdf.setFontSize(5);
  pdf.text(S2('STRADA PRINCIPALĂ'),ox+P.W*scT/2,stY+4,{align:'center'});

  // Acces principal
  pdf.setFillColor(190,150,30);
  try{pdf.triangle(ox+P.W*scT/2,stY,ox+P.W*scT/2-2.5,stY-4,ox+P.W*scT/2+2.5,stY-4,'F');}catch(e){}

  // Cote retrageri
  if(P.rl>0){
    pdf.setDrawColor(20,38,88); pdf.setLineWidth(0.3);
    pdf.line(ox,bfY,bfX,bfY);
    pdf.line(ox,bfY-2,ox,bfY+2); pdf.line(bfX,bfY-2,bfX,bfY+2);
    pdf.setTextColor(20,38,88); pdf.setFont('helvetica','bold'); pdf.setFontSize(4.5);
    pdf.text((P.rl).toFixed(1)+'m',ox+P.rl*scT/2,bfY-3.5,{align:'center'});
  }
  if(P.rf>0){
    pdf.setDrawColor(20,38,88); pdf.setLineWidth(0.3);
    pdf.line(bfX+bfW/2,oy,bfX+bfW/2,bfY);
    pdf.line(bfX+bfW/2-2,oy,bfX+bfW/2+2,oy); pdf.line(bfX+bfW/2-2,bfY,bfX+bfW/2+2,bfY);
    pdf.setTextColor(20,38,88); pdf.setFont('helvetica','bold'); pdf.setFontSize(4.5);
    pdf.text((P.rf).toFixed(1)+'m Rf',bfX+bfW/2+2.5,oy+P.rf*scT/2);
  }

  // Nr. cadastral
  pdf.setTextColor(25,45,95); pdf.setFont('helvetica','bold'); pdf.setFontSize(6);
  pdf.text(S2(P.nrCad),bfX+bfW/2,bfY+bfH/2,{align:'center'});
  pdf.setFontSize(4.5); pdf.setFont('helvetica','normal');
  pdf.text(S2(P.W+'m×'+P.D+'m · '+P.area+'m²'),bfX+bfW/2,bfY+bfH/2+5,{align:'center'});
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT PLANȘE CU PEREȚI REALI
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportPlanseWalls(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
  if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  const btn=document.getElementById('rv-walls-btn');
  if(btn){btn.innerHTML='⏳ Pereți…';btn.style.opacity='.6';}
  if(typeof ss==='function') ss('⏳ Generez planșe cu pereți reali…');

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

  // P1: Plan Parter cu pereți reali
  newPg();pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
  cartus('01','PLAN PARTER — Pereți reali · '+S2(FN_CONFIG?.[_RV.fn]?.label||'Rezidential'));
  _drawPlanWalls(pdf,fl0,P,b,ox0,oy0,sc,C);
  drawNord(W-18,oy0+10,P.frontDir,7);
  drawSc(ox0,oy0+b.bD*sc+P.rs*sc+22,sc,scLabel);

  // P2: Plan Etaj Tip
  newPg();pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
  cartus('02','PLAN ETAJ TIP (E1-E'+(b.niv-1)+')');
  _drawPlanWalls(pdf,fl1,P,b,ox0,oy0,sc,C);
  drawNord(W-18,oy0+10,P.frontDir,7);
  drawSc(ox0,oy0+b.bD*sc+P.rs*sc+22,sc,scLabel);

  // P3: Plan Teren cu geometrie reală
  const scT=pickSc(Math.max(P.W,P.D),W*.28);
  const scTMM=1000/scT;
  newPg();pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
  cartus('03','PLAN INCADRARE IN TEREN — Geometrie reală cadastrală','Sc. 1:'+scT);
  _drawSitePlanReal(pdf,ap,P,b,20,14,scTMM,C);
  drawNord(20+P.W*scTMM/2,14+P.D*scTMM+13,P.frontDir,7);

  const fn=('planseWalls_'+S2(P.nrCad)+'_'+S2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
  if(typeof ss==='function') ss('✅ Planșe cu pereți reali: 3 pagini · '+fn+' · '+scLabel);
  if(btn){btn.innerHTML='🏗 Planșe Pereți';btn.style.opacity='1';}
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT SVG VECTORIAL
// ═══════════════════════════════════════════════════════════════════════════
function _rvExportSVG(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  if(typeof ss==='function') ss('⏳ Generez SVG vectorial…');

  const fl=_RV.floors[0]||_RV.floors[_RV.floor];
  const SCALE=20; // 1m = 20px în SVG (1:50 pentru editare)
  const PAD=60;
  const W=Math.round((b.bW+P.rl*2)*SCALE+PAD*2);
  const H=Math.round((b.bD+P.rf+P.rs)*SCALE+PAD*2);
  const ox=PAD+P.rl*SCALE, oy=PAD+P.rf*SCALE;
  const EW=0.28*SCALE, IW=0.14*SCALE;

  const toX=x=>ox+x*SCALE;
  const toY=y=>oy+y*SCALE;
  const S2=s=>String(s||'').replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c])).trim();

  let svg=`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"
     viewBox="0 0 ${W} ${H}" font-family="Arial,sans-serif">
<title>Plan Parter — Nr.cad. ${S2(P.nrCad)} · UTR ${S2(P.utr)}</title>
<desc>UrbanX TSS·FG · Export SVG vectorial · Editabil în Inkscape, LibreCAD, QCAD</desc>

<!-- Fundal -->
<rect width="${W}" height="${H}" fill="#f8f9fa"/>

<!-- Parcelă -->
<rect x="${ox-P.rl*SCALE}" y="${oy-P.rf*SCALE}"
      width="${P.W*SCALE}" height="${P.D*SCALE}"
      fill="#edf5e5" stroke="#b49620" stroke-width="1.5" stroke-dasharray="6,3"/>

<!-- Stradă -->
<rect x="${ox-P.rl*SCALE}" y="${toY(b.bD)+P.rs*SCALE}"
      width="${P.W*SCALE}" height="20" fill="#cdd2e0"/>
<text x="${ox+b.bW*SCALE/2}" y="${toY(b.bD)+P.rs*SCALE+13}"
      text-anchor="middle" font-size="9" fill="#3d4e72" font-weight="bold">STRADA PRINCIPALĂ</text>

<!-- Fundal clădire -->
<rect x="${ox}" y="${oy}" width="${b.bW*SCALE}" height="${b.bD*SCALE}" fill="white"/>

<!-- Camere -->\n`;

  // Camere
  const CM_SVG={living:'#fffcee',bedroom:'#f2fff4',kitchen:'#eef8ff',
    bath:'#f8eeff',wc:'#f8eeff',hall:'#f5f5ff',storage:'#f5f5f8',
    core:'#e8f0ff',office:'#eef8ff',balcon:'#fffde8'};
  fl.rects.forEach(r=>{
    if(r.t==='core') return;
    const rx=toX(r.x),ry=toY(r.y),rw=r.w*SCALE,rh=r.h*SCALE;
    const fill=CM_SVG[r.t]||'#fafafa';
    if(r.bal){
      svg+=`<rect x="${rx.toFixed(1)}" y="${ry.toFixed(1)}" width="${rw.toFixed(1)}" height="${rh.toFixed(1)}" fill="${fill}" stroke="#b49620" stroke-width="0.8" stroke-dasharray="4,2"/>\n`;
    } else {
      svg+=`<rect x="${rx.toFixed(1)}" y="${ry.toFixed(1)}" width="${rw.toFixed(1)}" height="${rh.toFixed(1)}" fill="${fill}"/>\n`;
    }
  });

  // Nuclee scări
  fl.rects.filter(r=>r.t==='core').forEach(c=>{
    const rx=toX(c.x),ry=toY(c.y),rw=c.w*SCALE,rh=c.h*SCALE;
    svg+=`<rect x="${rx.toFixed(1)}" y="${ry.toFixed(1)}" width="${rw.toFixed(1)}" height="${rh.toFixed(1)}" fill="#e3ebff" stroke="#2846a0" stroke-width="1.2"/>\n`;
    // Hașuri
    for(let hi=-rh;hi<rw+rh;hi+=3.5){
      const x1=Math.max(rx,rx+hi),y1=rx+hi<rx?ry+(rx-rx-hi):ry;
      const x2=Math.min(rx+rw,rx+hi+rh),y2=x2===rx+rw?ry+(rx+rw-(rx+hi)):ry+rh;
      if(x1<rx+rw&&x2>rx) svg+=`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#3050a0" stroke-width="0.4"/>\n`;
    }
  });

  svg+=`\n<!-- Pereți -->\n`;

  // Pereți
  const walls=_extractWalls(fl.rects,b.bW,b.bD,fl.wins,fl.doors,0.28,0.14);
  walls.forEach(w=>{
    const thick=(w.type==='ext'?EW:IW);
    const half=thick/2;
    if(w.type==='win'){
      // Fereastră SVG
      const col='#1e7ab5';
      if(w.axis==='H'){
        const py=toY(w.y1);
        for(const off of [-half,0,half])
          svg+=`<line x1="${toX(w.x1).toFixed(1)}" y1="${(py+off).toFixed(1)}" x2="${toX(w.x2).toFixed(1)}" y2="${(py+off).toFixed(1)}" stroke="${col}" stroke-width="0.9"/>\n`;
      } else {
        const px=toX(w.x1);
        for(const off of [-half,0,half])
          svg+=`<line x1="${(px+off).toFixed(1)}" y1="${toY(w.y1).toFixed(1)}" x2="${(px+off).toFixed(1)}" y2="${toY(w.y2).toFixed(1)}" stroke="${col}" stroke-width="0.9"/>\n`;
      }
      return;
    }
    if(w.type==='door'){
      // Ușă SVG: linie + arc
      const col='#0f1a32';
      if(w.axis==='H'){
        const py=toY(w.y1), dx1=toX(w.x1), dw=(w.x2-w.x1)*SCALE;
        svg+=`<line x1="${dx1.toFixed(1)}" y1="${py.toFixed(1)}" x2="${(dx1+dw).toFixed(1)}" y2="${py.toFixed(1)}" stroke="${col}" stroke-width="1.0"/>\n`;
        svg+=`<path d="M${dx1.toFixed(1)},${py.toFixed(1)} A${dw.toFixed(1)},${dw.toFixed(1)} 0 0,1 ${dx1.toFixed(1)},${(py-dw).toFixed(1)}" fill="none" stroke="${col}" stroke-width="0.6" stroke-dasharray="3,2"/>\n`;
      }
      return;
    }
    // Perete normal
    const isExt=w.type==='ext';
    const fill=isExt?'#0f1e3c':'#1e2d52';
    let rx,ry,rw,rh;
    if(w.axis==='H'){rx=toX(w.x1).toFixed(1);rw=((w.x2-w.x1)*SCALE).toFixed(1);ry=(toY(w.y1)-half).toFixed(1);rh=thick.toFixed(1);}
    else{ry=toY(w.y1).toFixed(1);rh=((w.y2-w.y1)*SCALE).toFixed(1);rx=(toX(w.x1)-half).toFixed(1);rw=thick.toFixed(1);}
    if(parseFloat(rw)<0.1||parseFloat(rh)<0.1) return;
    svg+=`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="${fill}"/>\n`;
    // Hașuri pe pereții exteriori
    if(isExt){
      const x0=parseFloat(rx),y0=parseFloat(ry),w0=parseFloat(rw),h0=parseFloat(rh);
      for(let hi=-h0;hi<w0+h0;hi+=1.8){
        const x1=Math.max(x0,x0+hi),y1=x0+hi<x0?y0+(x0-x0-hi):y0;
        const x2=Math.min(x0+w0,x0+hi+h0),y2=x2===x0+w0?y0+(x0+w0-(x0+hi)):y0+h0;
        if(x1<x0+w0&&x2>x0&&y1>=y0&&y2<=y0+h0+0.1)
          svg+=`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#3c4f7a" stroke-width="0.25"/>\n`;
      }
    }
  });

  // Etichete camere
  const TN_S={living:'LIVING',bedroom:'DORMITOR',bedroom2:'DORMITOR 2',bedroom3:'DORMITOR 3',
    kitchen:'BUCĂTĂRIE',bath:'BAIE',wc:'WC',hall:'HOL',storage:'DEP.',
    core:'SC/LFT',office:'BIROU',balcon:'BALCON'};
  svg+=`\n<!-- Etichete -->\n`;
  fl.rects.forEach(r=>{
    if(r.t==='core') return;
    const rw=r.w*SCALE, rh=r.h*SCALE;
    if(rw<14||rh<12) return;
    const cx=toX(r.x+r.w/2), cy=toY(r.y+r.h/2);
    const nm=S2(TN_S[r.t]||String(r.lbl||r.t).toUpperCase());
    const fsz=Math.min(9,rw/5,rh/3.5);
    svg+=`<text x="${cx.toFixed(1)}" y="${(cy-fsz*.3).toFixed(1)}" text-anchor="middle" font-size="${fsz.toFixed(1)}" font-weight="bold" fill="#0f2358">${nm}</text>\n`;
    if(rw>20&&rh>16){
      svg+=`<text x="${cx.toFixed(1)}" y="${(cy+fsz*1.0).toFixed(1)}" text-anchor="middle" font-size="${(fsz*.8).toFixed(1)}" fill="#506070">${(r.w*r.h).toFixed(1)} m²</text>\n`;
    }
  });

  // Nord
  const nX=W-30, nY=30;
  svg+=`<circle cx="${nX}" cy="${nY}" r="12" fill="white" stroke="#888" stroke-width="0.8"/>
<polygon points="${nX},${nY} ${nX-4},${nY+6} ${nX+4},${nY+6}" fill="#c0392b"/>
<polygon points="${nX},${nY} ${nX-4},${nY-6} ${nX+4},${nY-6}" fill="#aab0be"/>
<text x="${nX}" y="${nY-14}" text-anchor="middle" font-size="9" font-weight="bold" fill="#c0392b">N</text>\n`;

  // Scară grafică
  const scBarX=ox, scBarY=oy+b.bD*SCALE+40;
  const barLen=5*SCALE;
  svg+=`<rect x="${scBarX}" y="${scBarY}" width="${barLen/2}" height="4" fill="#0f1e3c"/>
<rect x="${scBarX+barLen/2}" y="${scBarY}" width="${barLen/2}" height="4" fill="white" stroke="#0f1e3c" stroke-width="0.5"/>
<rect x="${scBarX}" y="${scBarY}" width="${barLen}" height="4" fill="none" stroke="#0f1e3c" stroke-width="0.6"/>
<text x="${scBarX}" y="${scBarY+10}" font-size="7" fill="#3d4e72">0</text>
<text x="${scBarX+barLen}" y="${scBarY+10}" text-anchor="end" font-size="7" fill="#3d4e72">5m</text>
<text x="${scBarX+barLen/2}" y="${scBarY+16}" text-anchor="middle" font-size="7" fill="#88929a">Sc. 1:50</text>\n`;

  // Titlu
  svg+=`<text x="10" y="20" font-size="11" font-weight="bold" fill="#0f1e3c">PLAN PARTER — Nr.cad. ${S2(P.nrCad)} · UTR ${S2(P.utr)}</text>
<text x="10" y="${H-8}" font-size="7" fill="#94a3b8">UrbanX TSS·FG · Sc. 1:50 · Export SVG vectorial · Editabil în Inkscape, LibreCAD, QCAD</text>`;

  svg+='\n</svg>';

  // Download
  const blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.download=('plan_'+String(P.nrCad||'urbanx')+'_'+String(P.utr||'UTR')+'.svg').replace(/[^a-zA-Z0-9._-]/g,'_');
  a.href=url; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
  if(typeof ss==='function') ss('✅ SVG exportat: '+a.download+' · Deschide în Inkscape / LibreCAD / QCAD');
}

// ═══════════════════════════════════════════════════════════════════════════
// TABEL SUPRAFEȚE — PDF + CSV
// ═══════════════════════════════════════════════════════════════════════════
function _rvExportTabelSuprafete(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
  if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  if(typeof ss==='function') ss('⏳ Generez Tabel Suprafețe…');

  // Colectăm datele din toate etajele
  const floors=_RV.floors||[_RV.floors[_RV.floor]];
  const allRooms=[];
  const aptMap={};
  floors.forEach((fl,flIdx)=>{
    (fl?.rects||[]).forEach(r=>{
      if(r.bal) return;
      const area=Math.round(r.w*r.h*100)/100;
      const aptKey=r.apt>=0?('APT '+r.apt):'COMUN';
      if(!aptMap[aptKey]) aptMap[aptKey]={rooms:[],suUtil:0,scBrut:0,label:aptKey};
      if(!['core','storage'].includes(r.t)) aptMap[aptKey].suUtil+=area;
      aptMap[aptKey].scBrut+=area;
      aptMap[aptKey].rooms.push({
        etaj:flIdx===0?'Parter':'Etaj '+flIdx,
        tip:r.t, lbl:r.lbl||r.t,
        w:r.w, h:r.h, area
      });
    });
  });

  const apts=Object.values(aptMap).sort((a,b_)=>a.label.localeCompare(b_.label));
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  const RN=(n,d)=>isNaN(n)?'—':d?Number(n).toFixed(d):Math.round(n)+'';

  // PDF
  const pdf=new _jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const PW=210,PH=297;

  // Header
  pdf.setFillColor(15,25,50); pdf.rect(0,0,PW,16,'F');
  pdf.setFillColor(180,140,30); pdf.rect(0,15.5,PW,.8,'F');
  pdf.setTextColor(255,255,255); pdf.setFont('helvetica','bold'); pdf.setFontSize(13);
  pdf.text('BREVET DE SUPRAFEȚE',PW/2,10,{align:'center'});
  pdf.setFont('helvetica','normal'); pdf.setFontSize(7);
  pdf.setTextColor(200,210,230);
  pdf.text(S2('Nr.cad. '+P.nrCad+' · UTR '+P.utr+' · '+P.W+'m×'+P.D+'m · '+P.area+'m²'),PW/2,14,{align:'center'});

  // Info proiect
  pdf.setFillColor(248,249,252); pdf.rect(10,20,190,20,'F');
  pdf.setDrawColor(200,210,225); pdf.setLineWidth(0.2); pdf.rect(10,20,190,20,'S');
  const info=[
    ['Nr. cadastral:',P.nrCad],['UTR:',P.utr],['POT max:',RN(P.pot*100,0)+'%'],
    ['CUT max:',RN(P.cut,2)],['Hmax:',RN(b.niv*P.hn,1)+'m'],['Niveluri:','P+'+(b.niv-1)+'E'],
  ];
  info.forEach(([k,v],i)=>{
    const ix=10+(i%3)*65+5, iy=26+Math.floor(i/3)*7;
    pdf.setTextColor(80,95,115); pdf.setFont('helvetica','bold'); pdf.setFontSize(6.5);
    pdf.text(S2(k),ix,iy);
    pdf.setTextColor(15,30,60); pdf.setFont('helvetica','normal');
    pdf.text(S2(v),ix+22,iy);
  });

  let y=44;

  // Tabel per apartament
  apts.forEach(apt=>{
    if(y>PH-30){ pdf.addPage(); y=15; }
    // Header apartament
    pdf.setFillColor(25,40,80); pdf.rect(10,y,190,7,'F');
    pdf.setTextColor(255,255,255); pdf.setFont('helvetica','bold'); pdf.setFontSize(8);
    pdf.text(S2(apt.label),14,y+5);
    pdf.setFont('helvetica','normal'); pdf.setFontSize(7);
    pdf.text('SU util: '+RN(apt.suUtil,2)+'m²  ·  SC brut: '+RN(apt.scBrut,2)+'m²',
      PW-14,y+5,{align:'right'});
    y+=9;

    // Coloane tabel
    const cols=[{t:'Cameră',w:55},{t:'Etaj',w:25},{t:'Tip',w:30},{t:'L (m)',w:22},{t:'l (m)',w:22},{t:'Arie (m²)',w:28},{t:'Obs.',w:28}];
    let cx=10;
    pdf.setFillColor(240,243,250); pdf.rect(10,y,190,6,'F');
    pdf.setDrawColor(180,190,210); pdf.setLineWidth(0.15);
    cols.forEach(c=>{
      pdf.rect(cx,y,c.w,6,'S');
      pdf.setTextColor(45,60,95); pdf.setFont('helvetica','bold'); pdf.setFontSize(6);
      pdf.text(S2(c.t),cx+c.w/2,y+4,{align:'center'});
      cx+=c.w;
    });
    y+=6;

    // Rânduri
    apt.rooms.forEach((r,ri)=>{
      if(y>PH-25){ pdf.addPage(); y=15; }
      if(ri%2===0) pdf.setFillColor(252,252,255);
      else pdf.setFillColor(248,248,252);
      pdf.rect(10,y,190,5.5,'F');
      let cx2=10;
      pdf.setDrawColor(210,215,228); pdf.setLineWidth(0.12);
      const vals=[r.lbl||r.tip, r.etaj, r.tip, RN(r.w,2), RN(r.h,2), RN(r.area,2), ''];
      cols.forEach((c,ci)=>{
        pdf.rect(cx2,y,c.w,5.5,'S');
        pdf.setTextColor(ci===0?20:60, ci===0?35:75, ci===0?80:110);
        pdf.setFont('helvetica',ci===0?'bold':'normal'); pdf.setFontSize(5.8);
        pdf.text(S2(vals[ci]),cx2+c.w/2,y+3.8,{align:'center'});
        cx2+=c.w;
      });
      y+=5.5;
    });

    // Total apartament
    pdf.setFillColor(230,235,250); pdf.rect(10,y,190,6,'F');
    pdf.setTextColor(15,30,80); pdf.setFont('helvetica','bold'); pdf.setFontSize(6.5);
    pdf.text('TOTAL '+S2(apt.label),14,y+4.2);
    pdf.text('SU util: '+RN(apt.suUtil,2)+' m²',130,y+4.2);
    pdf.text('SC brut: '+RN(apt.scBrut,2)+' m²',175,y+4.2,{align:'right'});
    y+=8;
  });

  // TOTAL GENERAL
  const totalSU=apts.reduce((s,a)=>s+a.suUtil,0);
  const totalSC=apts.reduce((s,a)=>s+a.scBrut,0);
  const totalSDA=totalSC*b.niv;
  if(y>PH-30){ pdf.addPage(); y=15; }
  pdf.setFillColor(15,25,50); pdf.rect(10,y,190,20,'F');
  pdf.setFillColor(180,140,30); pdf.rect(10,y,190,1,'F');
  pdf.setTextColor(255,255,255); pdf.setFont('helvetica','bold'); pdf.setFontSize(8);
  pdf.text('BILANȚ TOTAL CLĂDIRE',14,y+8);
  [[`SU totală: ${RN(totalSU,1)} m²`,14],
   [`SC la sol: ${RN(totalSC,1)} m²`,70],
   [`SDA totală: ${RN(totalSDA,1)} m²`,126],
   [`POT real: ${RN(totalSC/(P.area||1)*100,1)}%`,182]
  ].forEach(([t,x])=>{
    pdf.setFont('helvetica','normal'); pdf.setFontSize(7); pdf.setTextColor(220,230,248);
    pdf.text(S2(t),x,y+16);
  });
  y+=22;

  // Footer
  pdf.setFontSize(6); pdf.setFont('helvetica','italic'); pdf.setTextColor(130,140,155);
  pdf.text(S2('UrbanX TSS·FG · Document orientativ · Suprafețele sunt calculate din planul schematic · Nu substituie măsurătorile cadastrale'),PW/2,PH-6,{align:'center'});

  // Salvare PDF
  const fn1=('tabel_suprafete_'+String(P.nrCad||'urbanx')+'_'+String(P.utr||'UTR')+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn1);

  // Export CSV simultan
  let csv='Apartament,Etaj,Tip Cameră,Lățime (m),Lungime (m),Arie (m²)\n';
  apts.forEach(apt=>{
    apt.rooms.forEach(r=>{
      csv+=`"${apt.label}","${r.etaj}","${r.lbl||r.tip}",${r.w.toFixed(2)},${r.h.toFixed(2)},${r.area.toFixed(2)}\n`;
    });
  });
  const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.download=fn1.replace('.pdf','.csv'); a.href=url; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);

  if(typeof ss==='function') ss('✅ Tabel Suprafețe: '+fn1+' + CSV · '+apts.length+' apartamente · SU total '+RN(totalSU,1)+'m²');
}
