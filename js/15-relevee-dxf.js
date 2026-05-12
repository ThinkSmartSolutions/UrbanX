// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-dxf.js — Export DXF Arhitectural v1.0
// UrbanX TSS·FG
//
// Exportă planurile din 15-relevee.js în format DXF R2000 (AC1015)
// Compatibil: AutoCAD, QGIS, FreeCAD, LibreCAD, QCAD, BricsCAD
//
// Layere generate:
//   WALLS_EXT    — pereți exteriori (linie groasă)
//   WALLS_INT    — pereți interiori
//   WALLS_CORE   — nuclee scări/lift (hașurat)
//   WINDOWS      — ferestre (simbol triplu)
//   DOORS        — uși (arc + foaie)
//   ROOMS_FILL   — conturul camerelor
//   ROOM_LABELS  — etichete cameră + arie
//   DIMS         — cote dimensionale
//   GRID         — grilă structurală + axe
//   PARCELA      — conturul parcelei
//   STRADA       — front stradal
//   BALCOANE     — balcoane (linie punctată)
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
      if(a&&!document.getElementById('rv-dxf-btn')) _injectBtn(a);
    });
    obs.observe(document.body,{childList:true,subtree:true});
    setTimeout(()=>_injectBtn(),1800);
    setInterval(()=>_injectBtn(),3500);
  });

  function _injectBtn(anchor){
    if(document.getElementById('rv-dxf-btn')) return;
    const a=anchor||document.querySelector('#rv-planseA3-btn')||document.querySelector('.rv-expbtn');
    if(!a) return;
    const btn=document.createElement('button');
    btn.id='rv-dxf-btn';
    btn.innerHTML='📏 Export DXF';
    btn.title='Export DXF — compatibil AutoCAD, QGIS, FreeCAD, LibreCAD';
    btn.style.cssText=['height:32px','padding:0 12px','border-radius:7px','cursor:pointer',
      'font-family:inherit','font-size:11px','font-weight:800','margin-left:6px',
      'background:rgba(34,197,94,.12)','border:1.5px solid rgba(34,197,94,.45)',
      'color:#4ade80','display:inline-flex','align-items:center','flex-shrink:0'].join(';');
    btn.onmouseover=()=>btn.style.background='rgba(34,197,94,.28)';
    btn.onmouseout=()=>btn.style.background='rgba(34,197,94,.12)';
    btn.onclick=()=>_rvExportDXF();
    a.parentElement.insertBefore(btn,a.nextSibling);
    console.log('[DXF] buton injectat');
  }
})();

// ═══════════════════════════════════════════════════════════════════════════
function _rvExportDXF(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){ alert('Generați releveele mai întâi.'); return; }

  const btn=document.getElementById('rv-dxf-btn');
  if(btn){ btn.innerHTML='⏳ DXF…'; btn.style.opacity='.6'; }
  if(typeof ss==='function') ss('⏳ Generez DXF…');

  // ── Builder DXF ──────────────────────────────────────────────────────────
  // Fiecare linie DXF e o pereche (group_code, value)
  const lines=[];
  const d=(...pairs)=>{ for(let i=0;i<pairs.length;i+=2) lines.push(String(pairs[i]),String(pairs[i+1])); };

  // Culori AutoCAD (ACI): 1=roșu, 2=galben, 3=verde, 4=cyan, 5=albastru, 6=magenta, 7=alb/negru
  const LAYER_DEFS=[
    {name:'WALLS_EXT',   color:7,  ltype:'CONTINUOUS', lweight:50},
    {name:'WALLS_INT',   color:7,  ltype:'CONTINUOUS', lweight:25},
    {name:'WALLS_CORE',  color:5,  ltype:'CONTINUOUS', lweight:35},
    {name:'WINDOWS',     color:4,  ltype:'CONTINUOUS', lweight:18},
    {name:'DOORS',       color:3,  ltype:'CONTINUOUS', lweight:18},
    {name:'ROOMS_FILL',  color:8,  ltype:'CONTINUOUS', lweight:13},
    {name:'ROOM_LABELS', color:7,  ltype:'CONTINUOUS', lweight:13},
    {name:'DIMS',        color:2,  ltype:'CONTINUOUS', lweight:13},
    {name:'GRID',        color:8,  ltype:'CENTER',     lweight:9},
    {name:'PARCELA',     color:30, ltype:'DASHED',     lweight:25},
    {name:'STRADA',      color:8,  ltype:'CONTINUOUS', lweight:18},
    {name:'BALCOANE',    color:50, ltype:'DASHED',     lweight:13},
    {name:'ANNOTATIONS', color:2,  ltype:'CONTINUOUS', lweight:9},
  ];

  // ── HEADER ────────────────────────────────────────────────────────────────
  d(0,'SECTION',2,'HEADER');
  d(9,'$ACADVER',1,'AC1015');         // R2000
  d(9,'$INSUNITS',70,6);             // 6 = meters
  d(9,'$MEASUREMENT',70,1);          // 1 = metric
  d(9,'$LUNITS',70,2);               // 2 = decimal
  d(9,'$AUUNITS',70,0);
  d(9,'$ANGBASE',50,0);
  d(9,'$ANGDIR',70,0);               // 0 = counterclockwise
  // Extents
  const extW=(P.W+10), extD=(P.D+20);
  d(9,'$EXTMIN',10,'-5',20,'-5',30,'0');
  d(9,'$EXTMAX',10,String(extW+5),20,String(extD+5),30,'10');
  d(9,'$LIMMIN',10,'0',20,'0');
  d(9,'$LIMMAX',10,String(extW),20,String(extD));
  d(0,'ENDSEC');

  // ── TABLES ───────────────────────────────────────────────────────────────
  d(0,'SECTION',2,'TABLES');

  // LTYPE table
  d(0,'TABLE',2,'LTYPE',70,3);
  d(0,'LTYPE',5,'14',330,'5',100,'AcDbSymbolTableRecord',100,'AcDbLinetypeTableRecord');
  d(2,'CONTINUOUS',70,0,3,'Solid line',72,65,73,0,40,'0.0');
  d(0,'LTYPE',5,'15',330,'5',100,'AcDbSymbolTableRecord',100,'AcDbLinetypeTableRecord');
  d(2,'DASHED',70,0,3,'Dashed',72,65,73,2,40,'12.0',49,'6.0',74,0,49,'-6.0',74,0);
  d(0,'LTYPE',5,'16',330,'5',100,'AcDbSymbolTableRecord',100,'AcDbLinetypeTableRecord');
  d(2,'CENTER',70,0,3,'Center',72,65,73,4,40,'40.0',49,'25.0',74,0,49,'-5.0',74,0,49,'5.0',74,0,49,'-5.0',74,0);
  d(0,'ENDTAB');

  // LAYER table
  d(0,'TABLE',2,'LAYER',70,LAYER_DEFS.length+1);
  d(0,'LAYER',5,'0',330,'2',100,'AcDbSymbolTableRecord',100,'AcDbLayerTableRecord');
  d(2,'0',70,0,62,7,6,'CONTINUOUS',370,25);
  LAYER_DEFS.forEach((l,i)=>{
    d(0,'LAYER',5,String(100+i),330,'2',100,'AcDbSymbolTableRecord',100,'AcDbLayerTableRecord');
    d(2,l.name,70,0,62,l.color,6,l.ltype,370,l.lweight);
  });
  d(0,'ENDTAB');

  // STYLE table (TEXT style)
  d(0,'TABLE',2,'STYLE',70,1);
  d(0,'STYLE',5,'200',330,'5',100,'AcDbSymbolTableRecord',100,'AcDbTextStyleTableRecord');
  d(2,'STANDARD',70,0,40,'0.0',41,'1.0',50,'0.0',71,0,42,'2.5',3,'romans.shx',4,'');
  d(0,'ENDTAB');

  // DIMSTYLE table
  d(0,'TABLE',2,'DIMSTYLE',70,1);
  d(0,'DIMSTYLE',105,'201',330,'5',100,'AcDbSymbolTableRecord',100,'AcDbDimStyleTableRecord');
  d(2,'STANDARD',70,0,41,'2.5',42,'0.625',43,'3.75',44,'1.25',45,'0.0',46,'0.0',47,'0.0',
    48,'0.0',140,'2.5',141,'2.5',142,'0.0',143,'25.4',144,'1.0',145,'0.0',146,'1.0',
    147,'0.625',73,0,74,0,75,0,76,0,77,0,78,0,170,0,171,2,172,0,173,0,174,0,175,0,
    176,0,177,0,178,0);
  d(0,'ENDTAB');

  d(0,'ENDSEC');

  // ── ENTITIES ─────────────────────────────────────────────────────────────
  d(0,'SECTION',2,'ENTITIES');

  let handle=1000;
  const nh=()=>{ handle++; return String(handle); };

  // Helper: linie
  const line=(x1,y1,x2,y2,layer,lw)=>{
    d(0,'LINE',5,nh(),8,layer,10,x1.toFixed(4),20,y1.toFixed(4),30,'0.0',
      11,x2.toFixed(4),21,y2.toFixed(4),31,'0.0');
    if(lw) d(370,lw);
  };

  // Helper: LWPOLYLINE (closed polygon)
  const lwpoly=(pts,layer,closed,lw)=>{
    d(0,'LWPOLYLINE',5,nh(),8,layer,100,'AcDbEntity',100,'AcDbPolyline');
    d(90,pts.length,70,closed?1:0);
    if(lw) d(43,lw);
    pts.forEach(([x,y])=>{d(10,x.toFixed(4),20,y.toFixed(4));});
  };

  // Helper: arc
  const arc=(cx,cy,r,startDeg,endDeg,layer)=>{
    d(0,'ARC',5,nh(),8,layer,
      10,cx.toFixed(4),20,cy.toFixed(4),30,'0.0',
      40,r.toFixed(4),50,startDeg.toFixed(2),51,endDeg.toFixed(2));
  };

  // Helper: TEXT
  const text=(x,y,h,str,layer,just)=>{
    const s=String(str||'').replace(/[^\x20-\x7E]/g,' ').trim().slice(0,80);
    if(!s) return;
    d(0,'TEXT',5,nh(),8,layer,
      10,x.toFixed(4),20,y.toFixed(4),30,'0.0',
      40,h.toFixed(3),1,s,
      7,'STANDARD',72,(just||0));
  };

  // Helper: dimension (linear) - simplified using lines + text
  const dim=(x1,y1,x2,y2,offset,layer)=>{
    const isHoriz=Math.abs(y2-y1)<0.001;
    const val=(isHoriz?Math.abs(x2-x1):Math.abs(y2-y1));
    const txt=val.toFixed(2)+'m';
    if(isHoriz){
      const dy=offset||2.0;
      line(x1,y1,x1,y1-dy,layer);
      line(x2,y2,x2,y2-dy,layer);
      line(x1,y1-dy,x2,y2-dy,layer);
      // Ticks
      line(x1+0.15,y1-dy-0.3,x1-0.15,y1-dy+0.3,layer);
      line(x2+0.15,y2-dy-0.3,x2-0.15,y2-dy+0.3,layer);
      text((x1+x2)/2,(y1-dy)-0.8,0.5,txt,layer,1);
    } else {
      const dx=offset||2.0;
      line(x1,y1,x1-dx,y1,layer);
      line(x2,y2,x2-dx,y2,layer);
      line(x1-dx,y1,x2-dx,y2,layer);
      line(x1-dx-0.3,y1+0.15,x1-dx+0.3,y1-0.15,layer);
      line(x2-dx-0.3,y2+0.15,x2-dx+0.3,y2-0.15,layer);
      // Rotated text — approximate (DXF TEXT rotation)
      d(0,'TEXT',5,nh(),8,layer,
        10,(x1-dx-1.2).toFixed(4),20,((y1+y2)/2).toFixed(4),30,'0.0',
        40,'0.5',1,txt,50,'90',7,'STANDARD',72,1);
    }
  };

  // ── Per etaj ────────────────────────────────────────────────────────────
  const floors=_RV.floors||[];
  floors.forEach((fl,flIdx)=>{
    const flOff=flIdx*(b.bD+5); // Fiecare etaj decalat vertical cu bD+5m

    // Parcelă (doar la primul etaj)
    if(flIdx===0){
      const ox=-P.rl, oy2=-P.rf;
      lwpoly([
        [ox,oy2+flOff],[ox+P.W,oy2+flOff],
        [ox+P.W,oy2+P.D+flOff],[ox,oy2+P.D+flOff]
      ],'PARCELA',true);
      // Stradă
      const sy=P.D-P.rf+flOff;
      d(0,'SOLID',5,nh(),8,'STRADA',
        10,(-P.rl).toFixed(4),20,sy.toFixed(4),30,'0.0',
        11,(P.W-P.rl).toFixed(4),21,sy.toFixed(4),31,'0.0',
        12,(-P.rl).toFixed(4),22,(sy+3).toFixed(4),32,'0.0',
        13,(P.W-P.rl).toFixed(4),23,(sy+3).toFixed(4),33,'0.0');
      text(P.W/2-P.rl,sy+1.5,1,'STRADA PRINCIPALA','STRADA',1);
      // Adnotare parcelă
      text(-P.rl+0.3,-P.rf+flOff+0.5,0.8,'Nr.cad. '+P.nrCad,'ANNOTATIONS');
      text(-P.rl+0.3,-P.rf+flOff+1.8,0.6,'UTR: '+P.utr+'  POT: '+(P.pot*100).toFixed(0)+'%  CUT: '+P.cut,'ANNOTATIONS');
      text(-P.rl+0.3,-P.rf+flOff+2.8,0.6,P.W+'m x '+P.D+'m = '+P.area+'m2','ANNOTATIONS');
    }

    // Clădire footprint (exterior)
    lwpoly([
      [0,0+flOff],[b.bW,0+flOff],
      [b.bW,b.bD+flOff],[0,b.bD+flOff]
    ],'WALLS_EXT',true,50);

    // Perete exterior (linie dublă)
    const ew=0.28; // grosime perete exterior 28cm
    lwpoly([
      [ew,ew+flOff],[b.bW-ew,ew+flOff],
      [b.bW-ew,b.bD-ew+flOff],[ew,b.bD-ew+flOff]
    ],'WALLS_EXT',true,25);

    // Grilă structurală
    const nGX=Math.max(3,Math.round(b.bW/4.5));
    const nGY=Math.max(2,Math.round(b.bD/3.8));
    const gSpX=b.bW/nGX, gSpY=b.bD/nGY;
    for(let gi=0;gi<=nGX;gi++){
      const gx=gi*gSpX;
      line(gx,-1+flOff,gx,b.bD+1+flOff,'GRID');
      // Bulă axă
      text(gx,-1.5+flOff,0.4,String(gi+1),'GRID',1);
    }
    for(let gi=0;gi<=nGY;gi++){
      const gy=gi*gSpY+flOff;
      line(-1,gy,b.bW+1,gy,'GRID');
      text(-1.5,gy,0.4,String.fromCharCode(65+gi),'GRID',1);
    }

    // Camere
    fl.rects.forEach(r=>{
      const rx=r.x,ry=r.y+flOff,rw=r.w,rh=r.h;
      const layer=r.bal?'BALCOANE':(r.t==='core'?'WALLS_CORE':'ROOMS_FILL');
      // Contur cameră
      lwpoly([
        [rx,ry],[rx+rw,ry],
        [rx+rw,ry+rh],[rx,ry+rh]
      ],layer,true);
      // Hașuri core (linii diagonale)
      if(r.t==='core'){
        const sp=0.5;
        for(let hi=-rh;hi<rw+rh;hi+=sp){
          const x1=Math.max(rx,rx+hi),y1=rx+hi<rx?ry+(rx-rx-hi):ry;
          const x2=Math.min(rx+rw,rx+hi+rh),y2=x2===rx+rw?ry+(rx+rw-(rx+hi)):ry+rh;
          if(x1<rx+rw&&x2>rx) line(x1,y1+flOff-r.y+r.y,y1+(x2-x1)+flOff-r.y+r.y>ry+rh?ry+rh:y1+(x2-x1),x2,y2+flOff-r.y+r.y,'WALLS_CORE');
        }
      }
      // Etichetă cameră
      if(rw>1.5&&rh>1.2){
        const nm=String(r.lbl||r.t).replace(/[\u{1F000}-\u{1FAFF}]/gu,'').replace(/[^\x20-\x7E]/g,' ').trim();
        text(rx+rw/2,ry+rh/2+0.1,Math.min(0.5,rw/8,rh/4),nm,'ROOM_LABELS',1);
        if(rw>2&&rh>1.8){
          text(rx+rw/2,ry+rh/2-0.5,Math.min(0.4,rw/10),(r.w*r.h).toFixed(1)+'m2','ROOM_LABELS',1);
        }
      }
    });

    // Pereți interiori (borduri per cameră)
    fl.rects.forEach(r=>{
      if(r.bal||r.t==='core') return;
      const iw=0.14;
      // Top wall
      lwpoly([[r.x,r.y+flOff],[r.x+r.w,r.y+flOff],[r.x+r.w,r.y+iw+flOff],[r.x,r.y+iw+flOff]],'WALLS_INT',true);
    });

    // Ferestre
    fl.wins.forEach(w=>{
      const wL=w.w||w.h||1.2;
      if(w.wall==='N'){
        const x1=w.x,y1=flOff,x2=w.x+wL,y2=flOff;
        line(x1,y1,x2,y2,'WINDOWS');
        line(x1,y1-ew/2,x2,y2-ew/2,'WINDOWS');
        line(x1,y1+ew/2,x2,y2+ew/2,'WINDOWS');
      } else if(w.wall==='S'){
        const x1=w.x,y1=b.bD+flOff,x2=w.x+wL;
        line(x1,y1,x2,y1,'WINDOWS');
        line(x1,y1-ew/2,x2,y1-ew/2,'WINDOWS');
        line(x1,y1+ew/2,x2,y1+ew/2,'WINDOWS');
      } else if(w.wall==='V'){
        const x1=0,y1=w.y+flOff,y2=w.y+(w.h||wL)+flOff;
        line(x1,y1,x1,y2,'WINDOWS');
        line(x1-ew/2,y1,x1-ew/2,y2,'WINDOWS');
        line(x1+ew/2,y1,x1+ew/2,y2,'WINDOWS');
      } else {
        const x1=b.bW,y1=w.y+flOff,y2=w.y+(w.h||wL)+flOff;
        line(x1,y1,x1,y2,'WINDOWS');
        line(x1-ew/2,y1,x1-ew/2,y2,'WINDOWS');
        line(x1+ew/2,y1,x1+ew/2,y2,'WINDOWS');
      }
    });

    // Uși
    fl.doors.forEach(dd=>{
      const dx=dd.x,dw=dd.w,dy_d=dd.y!=null?dd.y+flOff:b.bD+flOff;
      const isMain=dd.type==='main';
      // Gol în perete (ștergem vizual — DXF nu are "erase", dar facem linie albă peste exterior)
      // Foaia ușii
      line(dx,dy_d,dx+dw,dy_d,'DOORS');
      // Arc deschidere (90°)
      if(isMain){
        arc(dx,dy_d,dw,0,90,'DOORS');
      } else if(dd.swing==='right'){
        arc(dx,dy_d,dw,0,90,'DOORS');
      } else {
        arc(dx+dw,dy_d,dw,90,180,'DOORS');
      }
    });

    // Cote dimensionale (per etaj)
    // Cota totală X
    dim(0,0+flOff,b.bW,0+flOff,-2.5,'DIMS');
    // Cota totală Y
    dim(0,0+flOff,0,b.bD+flOff,-2.5,'DIMS');
    // Travee X (grilă structurală)
    for(let gi=0;gi<nGX;gi++){
      const x1=gi*gSpX,x2=(gi+1)*gSpX;
      dim(x1,0+flOff,x2,0+flOff,-1.2,'DIMS');
    }

    // Etichetă etaj
    text(-P.rl||0-0.5+b.bW/2,b.bD+1.5+flOff,0.8,
      flIdx===0?'PLAN PARTER  —  Cota ±0.00':'PLAN ETAJ '+flIdx+'  —  Cota +'+(flIdx*P.hn).toFixed(2)+'m',
      'ANNOTATIONS',1);
  });

  d(0,'ENDSEC');

  // ── EOF ──────────────────────────────────────────────────────────────────
  d(0,'EOF');


  // ── SECȚIUNI A-A și B-B (complete, per etaj) ───────────────────────────
  // Poziționate sub planuri, decalate cu (nFloors * (bD+5) + 10)
  const sectOffY = (floors.length) * (b.bD + 5) + 10;
  const sectOffYBB = sectOffY + b.niv * P.hn + 12;

  // Secțiune A-A (pe lățimea bD)
  text(b.bD/2, sectOffY + b.niv*P.hn + 1.5, 1.0, 'SECTIUNE A-A (LONGITUDINALA)', 'ANNOTATIONS', 1);
  // Pereti exteriori secțiune
  lwpoly([[0,sectOffY],[b.bD,sectOffY],[b.bD,sectOffY+b.niv*P.hn],[0,sectOffY+b.niv*P.hn]], 'WALLS_EXT', true, 50);
  lwpoly([[P.hn*0.09,sectOffY],[b.bD-P.hn*0.09,sectOffY],
          [b.bD-P.hn*0.09,sectOffY+b.niv*P.hn],[P.hn*0.09,sectOffY+b.niv*P.hn]], 'WALLS_EXT', true, 20);
  // Planșee per nivel
  for(let i=0;i<b.niv;i++){
    const fy = sectOffY + i * P.hn;
    line(0, fy, b.bD, fy, 'WALLS_INT', 25);
    // Hașuri planșeu
    for(let hx=0; hx<b.bD; hx+=0.4) line(hx, fy, hx+0.25, fy+0.18, 'WALLS_CORE');
    text(-1.5, fy + P.hn/2, 0.5, i===0?'P':'E'+i, 'ROOM_LABELS', 1);
    text(b.bD + 0.3, fy + P.hn/2, 0.5, P.hn.toFixed(1)+'m', 'DIMS', 1);
    text(-0.3, fy + 0.15, 0.4, '±'+(i*P.hn).toFixed(2), 'DIMS', 1);
  }
  // Nuclee scări în secțiune
  if(b.cores && b.cores.length) {
    const c = b.cores[Math.floor(b.cores.length/2)];
    const cx = b.bD/2 - (c.h||2.4)/2;
    const cw = c.h||2.4;
    for(let i=0;i<b.niv;i++){
      const fy = sectOffY + i*P.hn;
      lwpoly([[cx,fy],[cx+cw,fy],[cx+cw,fy+P.hn],[cx,fy+P.hn]], 'WALLS_CORE', true, 30);
      // Trepte schematice
      const nst = Math.max(4, Math.floor(P.hn/0.18));
      const sw2 = cw/nst, sh2 = P.hn/nst;
      for(let s=0;s<nst;s++){
        line(cx+s*sw2, fy+s*sh2, cx+(s+1)*sw2, fy+s*sh2, 'WALLS_CORE');
        line(cx+(s+1)*sw2, fy+s*sh2, cx+(s+1)*sw2, fy+(s+1)*sh2, 'WALLS_CORE');
      }
    }
  }
  // Sol + cota ±0.00
  line(-2, sectOffY, b.bD+2, sectOffY, 'STRADA', 50);
  text(0, sectOffY - 0.8, 0.5, 'COTA ±0.00 (CTN)', 'ANNOTATIONS');
  // Cota H total
  dim(b.bD+0.5, sectOffY, b.bD+0.5, sectOffY+b.niv*P.hn, 2, 'DIMS');
  text(b.bD+3.5, sectOffY+b.niv*P.hn/2, 0.7, 'H='+(b.niv*P.hn).toFixed(1)+'m', 'DIMS', 1);

  // Secțiune B-B (pe lungimea bW)
  text(b.bW/2, sectOffYBB + b.niv*P.hn + 1.5, 1.0, 'SECTIUNE B-B (TRANSVERSALA)', 'ANNOTATIONS', 1);
  lwpoly([[0,sectOffYBB],[b.bW,sectOffYBB],
          [b.bW,sectOffYBB+b.niv*P.hn],[0,sectOffYBB+b.niv*P.hn]], 'WALLS_EXT', true, 50);
  for(let i=0;i<b.niv;i++){
    const fy = sectOffYBB + i*P.hn;
    line(0,fy,b.bW,fy,'WALLS_INT',25);
    for(let hx=0;hx<b.bW;hx+=0.4) line(hx,fy,hx+0.25,fy+0.18,'WALLS_CORE');
    text(-1.5,fy+P.hn/2,0.5,i===0?'P':'E'+i,'ROOM_LABELS',1);
  }
  line(-2,sectOffYBB,b.bW+2,sectOffYBB,'STRADA',50);
  text(0,sectOffYBB-0.8,0.5,'COTA ±0.00 (CTN)','ANNOTATIONS');
  dim(b.bW+0.5,sectOffYBB,b.bW+0.5,sectOffYBB+b.niv*P.hn,2,'DIMS');
  text(b.bW+3.5,sectOffYBB+b.niv*P.hn/2,0.7,'H='+(b.niv*P.hn).toFixed(1)+'m','DIMS',1);

  // ── FAȚADE N/S/E/V ──────────────────────────────────────────────────────
  // Poziționate sub secțiuni, pe coloane
  const facOffY = sectOffYBB + b.niv*P.hn + 15;
  const facDefs = [
    {lbl:'FATADA N (PRINCIPALA)', w:b.bW, ox:0,        oy:facOffY},
    {lbl:'FATADA S',              w:b.bW, ox:b.bW+8,   oy:facOffY},
    {lbl:'FATADA E',              w:b.bD, ox:0,        oy:facOffY+b.niv*P.hn+10},
    {lbl:'FATADA V',              w:b.bD, ox:b.bD+8,   oy:facOffY+b.niv*P.hn+10},
  ];
  facDefs.forEach(({lbl,w,ox,oy:oy2})=>{
    const fH = b.niv*P.hn;
    // Contur fațadă
    lwpoly([[ox,oy2],[ox+w,oy2],[ox+w,oy2+fH],[ox,oy2+fH]],'WALLS_EXT',true,50);
    // Linii planșee
    for(let i=0;i<b.niv;i++){
      const ly = oy2+i*P.hn;
      line(ox,ly,ox+w,ly,'WALLS_INT',18);
      text(ox-1.5,ly+P.hn/2,0.5,i===0?'P':'E'+i,'ROOM_LABELS',1);
    }
    // Ferestre schematice
    const wCols = Math.max(2, Math.floor(w/3.2));
    const colSp = w/wCols, wW2 = w/wCols*0.55, wH2 = P.hn*0.42;
    for(let row=0;row<b.niv;row++){
      const wy = oy2+row*P.hn + (P.hn-wH2)*0.28;
      for(let col=0;col<wCols;col++){
        const wx = ox + col*colSp + (colSp-wW2)/2;
        lwpoly([[wx,wy],[wx+wW2,wy],[wx+wW2,wy+wH2],[wx,wy+wH2]],'WINDOWS',true,13);
        // Croix fereastră
        line(wx+wW2/2,wy,wx+wW2/2,wy+wH2,'WINDOWS');
        line(wx,wy+wH2/2,wx+wW2,wy+wH2/2,'WINDOWS');
      }
      // Balcon
      line(ox+w*0.03,oy2+row*P.hn+P.hn*0.82,ox+w*0.97,oy2+row*P.hn+P.hn*0.82,'BALCOANE');
    }
    // Sol
    line(ox-1,oy2,ox+w+1,oy2,'STRADA',50);
    // Cota H
    dim(ox+w+0.5,oy2,ox+w+0.5,oy2+fH,1.5,'DIMS');
    text(ox+w+2.5,oy2+fH/2,0.7,'H='+(b.niv*P.hn).toFixed(1)+'m','DIMS',1);
    // Cota lățime
    dim(ox,oy2-0.5,ox+w,oy2-0.5,-1,'DIMS');
    // Titlu
    text(ox+w/2,oy2+fH+1.5,0.8,lbl,'ANNOTATIONS',1);
  });

  // ── PLAN ACOPERIȘ ─────────────────────────────────────────────────────────
  const roofOffY = facOffY + b.niv*P.hn*2 + 25;
  text(b.bW/2, roofOffY + b.bD + 0.6*2 + 1.5, 0.8, 'PLAN ACOPERIS - PANTA 30', 'ANNOTATIONS', 1);
  const ovh=0.6;
  // Streaşină
  lwpoly([[0-ovh,roofOffY-ovh],[b.bW+ovh,roofOffY-ovh],
          [b.bW+ovh,roofOffY+b.bD+ovh],[0-ovh,roofOffY+b.bD+ovh]],'WALLS_EXT',true,35);
  // Contur clădire (linie întreruptă)
  lwpoly([[0,roofOffY],[b.bW,roofOffY],[b.bW,roofOffY+b.bD],[0,roofOffY+b.bD]],'BALCOANE',true,20);
  // Coamă centrală
  line(b.bW/2, roofOffY, b.bW/2, roofOffY+b.bD, 'WALLS_EXT', 35);
  // Linii de pantă
  [[0-ovh,roofOffY-ovh],[b.bW+ovh,roofOffY-ovh],[0-ovh,roofOffY+b.bD+ovh],[b.bW+ovh,roofOffY+b.bD+ovh]].forEach(([px,py])=>{
    line(px,py,b.bW/2,roofOffY+b.bD/2,'WALLS_INT',13);
  });
  text(b.bW/2+0.2, roofOffY+b.bD/2, 0.5, 'COAMA', 'ROOM_LABELS', 1);
  // Cote
  dim(0-ovh,roofOffY-ovh,b.bW+ovh,roofOffY-ovh,-1.5,'DIMS');
  dim(0-ovh,roofOffY-ovh,0-ovh,roofOffY+b.bD+ovh,-1.5,'DIMS');

  // ── Asamblare fișier DXF ─────────────────────────────────────────────────
  const dxfContent=lines.join('\n')+'\n';

  // Download
  const blob=new Blob([dxfContent],{type:'application/dxf'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  const fn=('relevee_'+String(P.nrCad||'urbanx')+'_'+String(P.utr||'UTR')+'.dxf').replace(/[^a-zA-Z0-9._-]/g,'_');
  a.download=fn;
  a.href=url;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);

  if(typeof ss==='function') ss('✅ DXF exportat: '+fn+' · '+floors.length+' etaje · compatibil AutoCAD/QGIS');
  if(btn){ const btn2=document.getElementById('rv-dxf-btn'); if(btn2){btn2.innerHTML='📏 Export DXF';btn2.style.opacity='1';}}
}
