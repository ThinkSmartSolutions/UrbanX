// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-dxf.js — Export DXF Arhitectural v2.0
// UrbanX TSS·FG
//
// FIX v2.0 (19 mai 2026):
//   ✅ EOF mutat corect la final — secțiuni/fațade erau după EOF (bug critic)
//   ✅ Secțiune A-A cu camere reale (fl.rects proiectate pe axa de tăiere)
//   ✅ Pereți interiori via _extractWalls() — fără pereți dubli
//   ✅ MutationObserver eliminat (cauza cascadei microtask din HANDOVER)
//   ✅ Secțiune B-B cu camere reale pe axa transversală
//   ✅ Plan Acoperiș cu streașină și pantă corectă
//
// Compatibil: AutoCAD R2000+, QGIS, FreeCAD, LibreCAD, QCAD, BricsCAD
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
//   SECTIUNE     — linii secțiuni A-A / B-B
//   FATADE       — fațade arhitecturale
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  function waitReady(cb, n){
    n = n||0; if(n > 80) return;
    if(typeof _rvExportPDF === 'undefined' || typeof _RV === 'undefined'){
      setTimeout(()=>waitReady(cb, n+1), 300); return;
    }
    cb();
  }

  waitReady(()=>{
    // ✅ FIX: fără MutationObserver — simplu polling cu clearInterval
    const obs = setInterval(()=>{
      if(document.getElementById('rv-dxf-btn')){ clearInterval(obs); return; }
      _injectBtn();
    }, 800);
    setTimeout(()=>{ clearInterval(obs); _injectBtn(); }, 2000);
    console.log('[DXF v2] ✅ loaded — fără MutationObserver');
  });

  function _injectBtn(){
    if(document.getElementById('rv-dxf-btn')) return;
    const a = document.querySelector('#rv-planseA3-btn') || document.querySelector('.rv-expbtn');
    if(!a) return;
    const btn = document.createElement('button');
    btn.id = 'rv-dxf-btn';
    btn.innerHTML = '📏 Export DXF';
    btn.title = 'Export DXF — compatibil AutoCAD, QGIS, FreeCAD, LibreCAD';
    btn.style.cssText = [
      'height:32px','padding:0 12px','border-radius:7px','cursor:pointer',
      'font-family:inherit','font-size:11px','font-weight:800','margin-left:6px',
      'background:rgba(34,197,94,.12)','border:1.5px solid rgba(34,197,94,.45)',
      'color:#4ade80','display:inline-flex','align-items:center','flex-shrink:0'
    ].join(';');
    btn.onmouseover = ()=>btn.style.background = 'rgba(34,197,94,.28)';
    btn.onmouseout  = ()=>btn.style.background = 'rgba(34,197,94,.12)';
    btn.onclick = ()=>_rvExportDXF();
    a.parentElement.insertBefore(btn, a.nextSibling);
    console.log('[DXF v2] buton injectat');
  }
})();

// ═══════════════════════════════════════════════════════════════════════════
// HELPER: Proiectează fl.rects pe o axă de tăiere → camere vizibile în secțiune
// cutAxis: 'H' = tăiere orizontală (A-A, la y=cutY), 'V' = tăiere verticală (B-B, la x=cutX)
// ═══════════════════════════════════════════════════════════════════════════
function _projectRectsOnSection(rects, cutAxis, cutPos){
  // Returnează lista de camere care intersectează axa de tăiere
  // cu dimensiunile proiectate pe axă (lățime vizibilă în secțiune)
  const EPS = 0.05;
  const visible = [];

  rects.forEach(r=>{
    if(cutAxis === 'H'){
      // Tăiere la y=cutPos — camera trebuie să conțină y=cutPos
      if(r.y - EPS <= cutPos && cutPos <= r.y + r.h + EPS){
        visible.push({
          label:  r.lbl || r.t,
          type:   r.t,
          bal:    r.bal,
          // Pe axă X: poziția și lățimea camerei
          posX:   r.x,
          width:  r.w,
          // Pe verticală: înălțimea camerei (din parametri nivel)
          // — se va folosi P.hn din context
        });
      }
    } else {
      // Tăiere la x=cutPos — camera trebuie să conțină x=cutPos
      if(r.x - EPS <= cutPos && cutPos <= r.x + r.w + EPS){
        visible.push({
          label:  r.lbl || r.t,
          type:   r.t,
          bal:    r.bal,
          // Pe axă Y: poziția și adâncimea camerei
          posX:   r.y,
          width:  r.h,
        });
      }
    }
  });

  // Sortăm după poziție pe axă
  visible.sort((a,b)=>a.posX - b.posX);
  return visible;
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPER: Obține _extractWalls dacă e disponibil, altfel fallback simplu
// ═══════════════════════════════════════════════════════════════════════════
function _getWalls(fl, bW, bD){
  if(typeof _extractWalls === 'function'){
    return _extractWalls(fl.rects, bW, bD, fl.wins||[], fl.doors||[], 0.28, 0.14);
  }
  // Fallback: contur exterior simplu
  return [
    {x1:0,   y1:0,   x2:bW,  y2:0,   axis:'H', type:'ext', thick:0.28},
    {x1:0,   y1:bD,  x2:bW,  y2:bD,  axis:'H', type:'ext', thick:0.28},
    {x1:0,   y1:0,   x2:0,   y2:bD,  axis:'V', type:'ext', thick:0.28},
    {x1:bW,  y1:0,   x2:bW,  y2:bD,  axis:'V', type:'ext', thick:0.28},
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
function _rvExportDXF(){
  const P = _RV.parcelParams, b = _RV.building;
  if(!P || !b){ alert('Generați releveele mai întâi.'); return; }

  const btn = document.getElementById('rv-dxf-btn');
  if(btn){ btn.innerHTML = '⏳ DXF…'; btn.style.opacity = '.6'; }
  if(typeof ss === 'function') ss('⏳ Generez DXF arhitectural complet…');

  // ── Builder DXF ──────────────────────────────────────────────────────────
  const lines = [];
  const d = (...pairs)=>{ for(let i = 0; i < pairs.length; i+=2) lines.push(String(pairs[i]), String(pairs[i+1])); };

  const LAYER_DEFS = [
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
    {name:'SECTIUNE',    color:1,  ltype:'CONTINUOUS', lweight:35},
    {name:'FATADE',      color:6,  ltype:'CONTINUOUS', lweight:25},
  ];

  // ── HEADER ────────────────────────────────────────────────────────────────
  d(0,'SECTION', 2,'HEADER');
  d(9,'$ACADVER',   1,'AC1015');
  d(9,'$INSUNITS', 70,6);
  d(9,'$MEASUREMENT',70,1);
  d(9,'$LUNITS',   70,2);
  d(9,'$AUUNITS',  70,0);
  d(9,'$ANGBASE',  50,0);
  d(9,'$ANGDIR',   70,0);
  const extW = (P.W + 10), extD = (P.D + 20);
  d(9,'$EXTMIN',10,'-5',      20,'-5',      30,'0');
  d(9,'$EXTMAX',10,String(extW+5),20,String(extD+200),30,'10');
  d(9,'$LIMMIN',10,'0',20,'0');
  d(9,'$LIMMAX',10,String(extW),20,String(extD+200));
  d(0,'ENDSEC');

  // ── TABLES ───────────────────────────────────────────────────────────────
  d(0,'SECTION', 2,'TABLES');

  // LTYPE
  d(0,'TABLE',2,'LTYPE',70,3);
  d(0,'LTYPE',5,'14',330,'5',100,'AcDbSymbolTableRecord',100,'AcDbLinetypeTableRecord');
  d(2,'CONTINUOUS',70,0,3,'Solid line',72,65,73,0,40,'0.0');
  d(0,'LTYPE',5,'15',330,'5',100,'AcDbSymbolTableRecord',100,'AcDbLinetypeTableRecord');
  d(2,'DASHED',70,0,3,'Dashed',72,65,73,2,40,'12.0',49,'6.0',74,0,49,'-6.0',74,0);
  d(0,'LTYPE',5,'16',330,'5',100,'AcDbSymbolTableRecord',100,'AcDbLinetypeTableRecord');
  d(2,'CENTER',70,0,3,'Center',72,65,73,4,40,'40.0',49,'25.0',74,0,49,'-5.0',74,0,49,'5.0',74,0,49,'-5.0',74,0);
  d(0,'ENDTAB');

  // LAYER
  d(0,'TABLE',2,'LAYER',70,LAYER_DEFS.length+1);
  d(0,'LAYER',5,'0',330,'2',100,'AcDbSymbolTableRecord',100,'AcDbLayerTableRecord');
  d(2,'0',70,0,62,7,6,'CONTINUOUS',370,25);
  LAYER_DEFS.forEach((l,i)=>{
    d(0,'LAYER',5,String(100+i),330,'2',100,'AcDbSymbolTableRecord',100,'AcDbLayerTableRecord');
    d(2,l.name,70,0,62,l.color,6,l.ltype,370,l.lweight);
  });
  d(0,'ENDTAB');

  // STYLE
  d(0,'TABLE',2,'STYLE',70,1);
  d(0,'STYLE',5,'200',330,'5',100,'AcDbSymbolTableRecord',100,'AcDbTextStyleTableRecord');
  d(2,'STANDARD',70,0,40,'0.0',41,'1.0',50,'0.0',71,0,42,'2.5',3,'romans.shx',4,'');
  d(0,'ENDTAB');

  // DIMSTYLE
  d(0,'TABLE',2,'DIMSTYLE',70,1);
  d(0,'DIMSTYLE',105,'201',330,'5',100,'AcDbSymbolTableRecord',100,'AcDbDimStyleTableRecord');
  d(2,'STANDARD',70,0,41,'2.5',42,'0.625',43,'3.75',44,'1.25',140,'2.5',141,'2.5',
    142,'0.0',143,'25.4',144,'1.0',147,'0.625',73,0,74,0,75,0,76,0,171,2);
  d(0,'ENDTAB');

  d(0,'ENDSEC');

  // ── ENTITIES ─────────────────────────────────────────────────────────────
  // ✅ FIX: TOT conținutul deseneabil e în SECTION ENTITIES
  // EOF vine doar la final, după ENDSEC
  d(0,'SECTION', 2,'ENTITIES');

  let handle = 1000;
  const nh = ()=>{ handle++; return String(handle); };

  // Helper: linie
  const line = (x1,y1,x2,y2,layer,lw)=>{
    d(0,'LINE',5,nh(),8,layer,
      10,x1.toFixed(4),20,y1.toFixed(4),30,'0.0',
      11,x2.toFixed(4),21,y2.toFixed(4),31,'0.0');
    if(lw) d(370,lw);
  };

  // Helper: polyline închisă
  const lwpoly = (pts,layer,closed,lw)=>{
    d(0,'LWPOLYLINE',5,nh(),8,layer,100,'AcDbEntity',100,'AcDbPolyline');
    d(90,pts.length, 70,closed?1:0);
    if(lw) d(43,lw);
    pts.forEach(([x,y])=>{ d(10,x.toFixed(4),20,y.toFixed(4)); });
  };

  // Helper: arc
  const arc = (cx,cy,r,startDeg,endDeg,layer)=>{
    d(0,'ARC',5,nh(),8,layer,
      10,cx.toFixed(4),20,cy.toFixed(4),30,'0.0',
      40,r.toFixed(4),50,startDeg.toFixed(2),51,endDeg.toFixed(2));
  };

  // Helper: text
  const text = (x,y,h,str,layer,just)=>{
    const s = String(str||'').replace(/[^\x20-\x7E]/g,' ').trim().slice(0,80);
    if(!s) return;
    d(0,'TEXT',5,nh(),8,layer,
      10,x.toFixed(4),20,y.toFixed(4),30,'0.0',
      40,h.toFixed(3),1,s,7,'STANDARD',72,(just||0));
  };

  // Helper: cotă liniară (linii + text)
  const dim = (x1,y1,x2,y2,offset,layer)=>{
    const isH = Math.abs(y2-y1) < 0.001;
    const val = isH ? Math.abs(x2-x1) : Math.abs(y2-y1);
    const txt = val.toFixed(2)+'m';
    if(isH){
      const dy = offset||2.0;
      line(x1,y1,x1,y1-dy,layer);
      line(x2,y2,x2,y2-dy,layer);
      line(x1,y1-dy,x2,y2-dy,layer);
      line(x1+0.15,y1-dy-0.3,x1-0.15,y1-dy+0.3,layer);
      line(x2+0.15,y2-dy-0.3,x2-0.15,y2-dy+0.3,layer);
      text((x1+x2)/2,(y1-dy)-0.8,0.5,txt,layer,1);
    } else {
      const dx = offset||2.0;
      line(x1,y1,x1-dx,y1,layer);
      line(x2,y2,x2-dx,y2,layer);
      line(x1-dx,y1,x2-dx,y2,layer);
      line(x1-dx-0.3,y1+0.15,x1-dx+0.3,y1-0.15,layer);
      line(x2-dx-0.3,y2+0.15,x2-dx+0.3,y2-0.15,layer);
      d(0,'TEXT',5,nh(),8,layer,
        10,(x1-dx-1.2).toFixed(4),20,((y1+y2)/2).toFixed(4),30,'0.0',
        40,'0.5',1,txt,50,'90',7,'STANDARD',72,1);
    }
  };

  // ── PLANURI NIVEL (câte unul per etaj) ───────────────────────────────────
  const floors = _RV.floors || [];
  const nFloors = floors.length;

  floors.forEach((fl,flIdx)=>{
    if(!fl || !fl.rects) return;
    const flOff = flIdx * (b.bD + 6);

    // Parcelă (doar la parter)
    if(flIdx === 0){
      const ox = -P.rl, oy2 = -P.rf;
      lwpoly([
        [ox,oy2+flOff],[ox+P.W,oy2+flOff],
        [ox+P.W,oy2+P.D+flOff],[ox,oy2+P.D+flOff]
      ],'PARCELA',true);
      const sy = P.D - P.rf + flOff;
      line(-P.rl,sy,P.W-P.rl,sy,'STRADA',50);
      line(-P.rl,sy+3,P.W-P.rl,sy+3,'STRADA',18);
      text(P.W/2-P.rl,sy+1.5,1,'STRADA PRINCIPALA','STRADA',1);
      text(-P.rl+0.3,-P.rf+flOff+0.5,0.8,'Nr.cad. '+P.nrCad,'ANNOTATIONS');
      text(-P.rl+0.3,-P.rf+flOff+1.8,0.6,'UTR: '+P.utr+'  POT: '+(P.pot*100).toFixed(0)+'%  CUT: '+P.cut,'ANNOTATIONS');
      text(-P.rl+0.3,-P.rf+flOff+2.8,0.6,P.W+'m x '+P.D+'m = '+P.area+'m2','ANNOTATIONS');
    }

    // Contur clădire exterior
    lwpoly([
      [0,0+flOff],[b.bW,0+flOff],
      [b.bW,b.bD+flOff],[0,b.bD+flOff]
    ],'WALLS_EXT',true,50);

    // Grilă structurală
    const nGX = Math.max(3,Math.round(b.bW/4.5));
    const nGY = Math.max(2,Math.round(b.bD/3.8));
    const gSpX = b.bW/nGX, gSpY = b.bD/nGY;
    for(let gi=0;gi<=nGX;gi++){
      const gx = gi*gSpX;
      line(gx,-1+flOff,gx,b.bD+1+flOff,'GRID');
      text(gx,-1.5+flOff,0.4,String(gi+1),'GRID',1);
    }
    for(let gi=0;gi<=nGY;gi++){
      const gy = gi*gSpY+flOff;
      line(-1,gy,b.bW+1,gy,'GRID');
      text(-1.5,gy,0.4,String.fromCharCode(65+gi),'GRID',1);
    }

    // Camere (contur + etichetă)
    fl.rects.forEach(r=>{
      const ry2 = r.y + flOff;
      const layer = r.bal ? 'BALCOANE' : (r.t==='core' ? 'WALLS_CORE' : 'ROOMS_FILL');
      lwpoly([
        [r.x,ry2],[r.x+r.w,ry2],
        [r.x+r.w,ry2+r.h],[r.x,ry2+r.h]
      ],layer,true);

      // Hașuri nuclee scări
      if(r.t==='core'){
        const sp = 0.5;
        for(let hi=-r.h;hi<r.w+r.h;hi+=sp){
          const x1 = Math.max(r.x,r.x+hi);
          const y1 = r.x+hi < r.x ? ry2+(r.x-r.x-hi) : ry2;
          const x2 = Math.min(r.x+r.w,r.x+hi+r.h);
          const y2 = x2===r.x+r.w ? ry2+(r.x+r.w-(r.x+hi)) : ry2+r.h;
          if(x1<r.x+r.w && x2>r.x) line(x1,y1,x2,y2,'WALLS_CORE');
        }
      }

      // Etichetă
      if(r.w > 1.5 && r.h > 1.2){
        const nm = String(r.lbl||r.t).replace(/[^\x20-\x7E]/g,' ').trim();
        text(r.x+r.w/2, ry2+r.h/2+0.1, Math.min(0.5,r.w/8,r.h/4), nm, 'ROOM_LABELS', 1);
        if(r.w > 2 && r.h > 1.8){
          text(r.x+r.w/2, ry2+r.h/2-0.5, Math.min(0.4,r.w/10), (r.w*r.h).toFixed(1)+'m2','ROOM_LABELS',1);
        }
      }
    });

    // ✅ FIX: Pereți via _extractWalls (nu per cameră manual)
    const walls = _getWalls(fl, b.bW, b.bD);
    walls.forEach(w=>{
      const y_off = flOff;
      if(w.type==='win'){
        if(w.axis==='H'){
          const py = w.y1+y_off;
          line(w.x1,py,w.x2,py,'WINDOWS');
          line(w.x1,py-0.1,w.x2,py-0.1,'WINDOWS');
          line(w.x1,py+0.1,w.x2,py+0.1,'WINDOWS');
        } else {
          const px = w.x1;
          line(px,w.y1+y_off,px,w.y2+y_off,'WINDOWS');
          line(px-0.1,w.y1+y_off,px-0.1,w.y2+y_off,'WINDOWS');
          line(px+0.1,w.y1+y_off,px+0.1,w.y2+y_off,'WINDOWS');
        }
      } else if(w.type==='door'){
        if(w.axis==='H'){
          const py = w.y1+y_off, dw = w.x2-w.x1;
          line(w.x1,py,w.x2,py,'DOORS');
          arc(w.x1,py,dw,0,90,'DOORS');
        } else {
          const px = w.x1, dh = w.y2-w.y1;
          line(px,w.y1+y_off,px,w.y2+y_off,'DOORS');
          arc(px,w.y1+y_off,dh,90,180,'DOORS');
        }
      } else {
        // Perete normal ext/int
        const lyr = w.type==='ext' ? 'WALLS_EXT' : 'WALLS_INT';
        const lw  = w.type==='ext' ? 50 : 25;
        const half = (w.thick||0.14)/2;
        if(w.axis==='H'){
          const py = w.y1+y_off;
          lwpoly([
            [w.x1,py-half],[w.x2,py-half],
            [w.x2,py+half],[w.x1,py+half]
          ],lyr,true,lw);
        } else {
          const px = w.x1;
          lwpoly([
            [px-half,w.y1+y_off],[px+half,w.y1+y_off],
            [px+half,w.y2+y_off],[px-half,w.y2+y_off]
          ],lyr,true,lw);
        }
      }
    });

    // Cote etaj
    dim(0,0+flOff,b.bW,0+flOff,-2.5,'DIMS');
    dim(0,0+flOff,0,b.bD+flOff,-2.5,'DIMS');
    for(let gi=0;gi<nGX;gi++){
      dim(gi*gSpX,0+flOff,(gi+1)*gSpX,0+flOff,-1.2,'DIMS');
    }

    // Etichetă etaj
    text(b.bW/2,b.bD+1.5+flOff,0.8,
      flIdx===0?'PLAN PARTER  —  Cota ±0.00':'PLAN ETAJ '+flIdx+'  —  Cota +'+(flIdx*P.hn).toFixed(2)+'m',
      'ANNOTATIONS',1);

    // Marker linie de secțiune A-A (la mijlocul adâncimii)
    const cutY_aa = b.bD/2;
    line(-P.rl-1, cutY_aa+flOff, b.bW+1, cutY_aa+flOff, 'SECTIUNE', 18);
    text(-P.rl-2, cutY_aa+flOff+0.2, 0.6, 'A', 'SECTIUNE');
    text(b.bW+1.2, cutY_aa+flOff+0.2, 0.6, 'A', 'SECTIUNE');

    // Marker linie de secțiune B-B (la mijlocul lățimii)
    const cutX_bb = b.bW/2;
    line(cutX_bb,0+flOff-1,cutX_bb,b.bD+flOff+1,'SECTIUNE',18);
    text(cutX_bb+0.2,b.bD+flOff+1.2,0.6,'B','SECTIUNE');
    text(cutX_bb+0.2,0+flOff-1.5,0.6,'B','SECTIUNE');
  });

  // ── SECȚIUNE A-A CU CAMERE REALE ─────────────────────────────────────────
  // ✅ FIX PRINCIPAL: fl.rects proiectate pe axa de tăiere y=bD/2
  const sectOffY = nFloors * (b.bD + 6) + 8;
  const cutY_aa  = b.bD / 2;   // linia de tăiere la mijlocul adâncimii
  const fl0      = floors[0] || {rects:[],wins:[],doors:[]};

  text(b.bD/2, sectOffY + b.niv*P.hn + 2, 1.0, 'SECTIUNE A-A (LONGITUDINALA) — Cota y='+cutY_aa.toFixed(2)+'m', 'SECTIUNE', 1);

  // Contur exterior secțiune
  lwpoly([
    [0,sectOffY],[b.bD,sectOffY],
    [b.bD,sectOffY+b.niv*P.hn],[0,sectOffY+b.niv*P.hn]
  ],'WALLS_EXT',true,50);

  // Planșee și etichete nivel
  for(let i=0; i<b.niv; i++){
    const fy = sectOffY + i*P.hn;
    // Planșeu
    line(0,fy,b.bD,fy,'WALLS_INT',30);
    // Hașuri planșeu (grosime ~20cm)
    for(let hx=0; hx<b.bD; hx+=0.35){
      line(hx,fy,hx+0.22,fy+0.18,'WALLS_CORE');
    }
    // Etichetă nivel stânga
    text(-1.8,fy+P.hn/2,0.5,i===0?'P':'E'+i,'ROOM_LABELS',1);
    // Cotă nivel
    text(b.bD+0.4,fy+P.hn/2,0.45,P.hn.toFixed(1)+'m','DIMS',1);
    text(-0.4,fy+0.2,0.4,'±'+(i*P.hn).toFixed(2),'DIMS',1);
  }

  // ✅ Proiecție camere pe A-A (per etaj)
  floors.forEach((fl,flIdx)=>{
    if(!fl || !fl.rects) return;
    const fy0 = sectOffY + flIdx*P.hn;
    const rooms = _projectRectsOnSection(fl.rects, 'H', cutY_aa);

    rooms.forEach(r=>{
      if(r.bal || r.type==='core') return;
      const rx  = r.posX;
      const rw  = r.width;
      const rh  = P.hn * 0.85;  // înălțime liberă ~85% din înălțimea de nivel
      const ry  = fy0 + (P.hn - rh) / 2;

      // Contur cameră în secțiune
      lwpoly([
        [rx,ry],[rx+rw,ry],
        [rx+rw,ry+rh],[rx,ry+rh]
      ],'ROOMS_FILL',true,13);

      // Etichetă
      if(rw > 1.0){
        const nm = String(r.label||r.type).replace(/[^\x20-\x7E]/g,' ').trim();
        text(rx+rw/2,ry+rh/2+0.1,Math.min(0.45,rw/7),nm,'ROOM_LABELS',1);
      }

      // Fereastră în secțiune (dacă camera e la exterior N sau S)
      // Camerele cu r.posX la marginile clădirii primesc simbol fereastră
      if(Math.abs(rx) < 0.1 || Math.abs(rx+rw-b.bW) < 0.1){
        const wY = ry + P.hn*0.25;
        const wH = P.hn*0.40;
        line(rx, wY, rx, wY+wH, 'WINDOWS');
        line(rx-0.1, wY, rx-0.1, wY+wH, 'WINDOWS');
        line(rx+0.1, wY, rx+0.1, wY+wH, 'WINDOWS');
      }
    });

    // Nuclee scări în secțiune
    if(fl.rects) fl.rects.filter(r=>r.t==='core').forEach(c=>{
      const cx  = c.y;   // pe axa A-A, coordonata e y-ul camerei
      const cw  = c.h;
      const fy  = sectOffY + flIdx*P.hn;
      lwpoly([
        [cx,fy],[cx+cw,fy],
        [cx+cw,fy+P.hn],[cx,fy+P.hn]
      ],'WALLS_CORE',true,30);
      // Trepte
      const nst = Math.max(4,Math.floor(P.hn/0.18));
      const sw2 = cw/nst, sh2 = P.hn/nst;
      for(let s=0;s<nst;s++){
        line(cx+s*sw2, fy+s*sh2, cx+(s+1)*sw2, fy+s*sh2, 'WALLS_CORE');
        line(cx+(s+1)*sw2, fy+s*sh2, cx+(s+1)*sw2, fy+(s+1)*sh2, 'WALLS_CORE');
      }
    });
  });

  // Sol A-A
  line(-2,sectOffY,b.bD+2,sectOffY,'STRADA',50);
  text(0,sectOffY-0.8,0.5,'COTA ±0.00 (CTN)','ANNOTATIONS');
  // Cota H total
  dim(b.bD+0.5,sectOffY,b.bD+0.5,sectOffY+b.niv*P.hn,2,'DIMS');
  text(b.bD+3.2,sectOffY+b.niv*P.hn/2,0.7,'H='+(b.niv*P.hn).toFixed(1)+'m','DIMS',1);

  // ── SECȚIUNE B-B CU CAMERE REALE ─────────────────────────────────────────
  // ✅ FIX: fl.rects proiectate pe axa x=bW/2
  const sectOffYBB = sectOffY + b.niv*P.hn + 12;
  const cutX_bb    = b.bW / 2;

  text(b.bW/2, sectOffYBB + b.niv*P.hn + 2, 1.0, 'SECTIUNE B-B (TRANSVERSALA) — Cota x='+cutX_bb.toFixed(2)+'m', 'SECTIUNE', 1);

  lwpoly([
    [0,sectOffYBB],[b.bW,sectOffYBB],
    [b.bW,sectOffYBB+b.niv*P.hn],[0,sectOffYBB+b.niv*P.hn]
  ],'WALLS_EXT',true,50);

  for(let i=0; i<b.niv; i++){
    const fy = sectOffYBB + i*P.hn;
    line(0,fy,b.bW,fy,'WALLS_INT',30);
    for(let hx=0;hx<b.bW;hx+=0.35) line(hx,fy,hx+0.22,fy+0.18,'WALLS_CORE');
    text(-1.8,fy+P.hn/2,0.5,i===0?'P':'E'+i,'ROOM_LABELS',1);
    text(b.bW+0.4,fy+P.hn/2,0.45,P.hn.toFixed(1)+'m','DIMS',1);
    text(-0.4,fy+0.2,0.4,'±'+(i*P.hn).toFixed(2),'DIMS',1);
  }

  // ✅ Proiecție camere pe B-B
  floors.forEach((fl,flIdx)=>{
    if(!fl || !fl.rects) return;
    const fy0   = sectOffYBB + flIdx*P.hn;
    const rooms = _projectRectsOnSection(fl.rects, 'V', cutX_bb);

    rooms.forEach(r=>{
      if(r.bal || r.type==='core') return;
      const rx  = r.posX;
      const rw  = r.width;
      const rh  = P.hn * 0.85;
      const ry  = fy0 + (P.hn - rh) / 2;

      lwpoly([
        [rx,ry],[rx+rw,ry],
        [rx+rw,ry+rh],[rx,ry+rh]
      ],'ROOMS_FILL',true,13);

      if(rw > 1.0){
        const nm = String(r.label||r.type).replace(/[^\x20-\x7E]/g,' ').trim();
        text(rx+rw/2,ry+rh/2+0.1,Math.min(0.45,rw/7),nm,'ROOM_LABELS',1);
      }
    });

    // Nuclee în B-B (pe axa X)
    if(fl.rects) fl.rects.filter(r=>r.t==='core').forEach(c=>{
      const cx = c.x, cw = c.w;
      const fy = sectOffYBB + flIdx*P.hn;
      lwpoly([[cx,fy],[cx+cw,fy],[cx+cw,fy+P.hn],[cx,fy+P.hn]],'WALLS_CORE',true,30);
      const nst = Math.max(4,Math.floor(P.hn/0.18));
      const sw2 = cw/nst, sh2 = P.hn/nst;
      for(let s=0;s<nst;s++){
        line(cx+s*sw2,fy+s*sh2,cx+(s+1)*sw2,fy+s*sh2,'WALLS_CORE');
        line(cx+(s+1)*sw2,fy+s*sh2,cx+(s+1)*sw2,fy+(s+1)*sh2,'WALLS_CORE');
      }
    });
  });

  line(-2,sectOffYBB,b.bW+2,sectOffYBB,'STRADA',50);
  text(0,sectOffYBB-0.8,0.5,'COTA ±0.00 (CTN)','ANNOTATIONS');
  dim(b.bW+0.5,sectOffYBB,b.bW+0.5,sectOffYBB+b.niv*P.hn,2,'DIMS');
  text(b.bW+3.2,sectOffYBB+b.niv*P.hn/2,0.7,'H='+(b.niv*P.hn).toFixed(1)+'m','DIMS',1);

  // ── FAȚADE N/S/E/V ────────────────────────────────────────────────────────
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
    // Planșee
    for(let i=0;i<b.niv;i++){
      const ly = oy2+i*P.hn;
      line(ox,ly,ox+w,ly,'WALLS_INT',18);
      text(ox-1.5,ly+P.hn/2,0.5,i===0?'P':'E'+i,'ROOM_LABELS',1);
    }
    // Ferestre schematice pe fațadă
    const wCols = Math.max(2,Math.floor(w/3.2));
    const colSp = w/wCols, wW2 = colSp*0.55, wH2 = P.hn*0.42;
    for(let row=0;row<b.niv;row++){
      const wy = oy2+row*P.hn+(P.hn-wH2)*0.28;
      for(let col=0;col<wCols;col++){
        const wx = ox+col*colSp+(colSp-wW2)/2;
        lwpoly([[wx,wy],[wx+wW2,wy],[wx+wW2,wy+wH2],[wx,wy+wH2]],'WINDOWS',true,13);
        line(wx+wW2/2,wy,wx+wW2/2,wy+wH2,'WINDOWS');
        line(wx,wy+wH2/2,wx+wW2,wy+wH2/2,'WINDOWS');
      }
      // Balcon
      line(ox+w*0.03,oy2+row*P.hn+P.hn*0.82,ox+w*0.97,oy2+row*P.hn+P.hn*0.82,'BALCOANE');
    }
    // Sol
    line(ox-1,oy2,ox+w+1,oy2,'STRADA',50);
    // Cote
    dim(ox+w+0.5,oy2,ox+w+0.5,oy2+fH,1.5,'DIMS');
    text(ox+w+2.5,oy2+fH/2,0.7,'H='+(b.niv*P.hn).toFixed(1)+'m','DIMS',1);
    dim(ox,oy2-0.5,ox+w,oy2-0.5,-1,'DIMS');
    text(ox+w/2,oy2+fH+1.5,0.8,lbl,'FATADE',1);
  });

  // ── PLAN ACOPERIȘ ─────────────────────────────────────────────────────────
  const roofOffY = facOffY + b.niv*P.hn*2 + 25;
  const ovh      = 0.6;   // streașină 60cm

  text(b.bW/2, roofOffY+b.bD+ovh+2, 0.8, 'PLAN ACOPERIS - PANTA 30 grade', 'ANNOTATIONS', 1);

  // Streașină
  lwpoly([
    [0-ovh,roofOffY-ovh],[b.bW+ovh,roofOffY-ovh],
    [b.bW+ovh,roofOffY+b.bD+ovh],[0-ovh,roofOffY+b.bD+ovh]
  ],'WALLS_EXT',true,35);

  // Contur clădire (sub acoperiș, linie întreruptă)
  lwpoly([
    [0,roofOffY],[b.bW,roofOffY],
    [b.bW,roofOffY+b.bD],[0,roofOffY+b.bD]
  ],'BALCOANE',true,20);

  // Coamă centrală (orientare longitudinală)
  line(b.bW/2,roofOffY-ovh,b.bW/2,roofOffY+b.bD+ovh,'WALLS_EXT',35);
  text(b.bW/2+0.2,roofOffY+b.bD/2,0.5,'COAMA','ROOM_LABELS',1);

  // Linii de pantă din colțuri spre coamă
  [
    [0-ovh,roofOffY-ovh],[b.bW+ovh,roofOffY-ovh],
    [0-ovh,roofOffY+b.bD+ovh],[b.bW+ovh,roofOffY+b.bD+ovh]
  ].forEach(([px,py])=>{
    line(px,py,b.bW/2,roofOffY+b.bD/2,'WALLS_INT',13);
  });

  // Jgheaburi pe streașini E și V
  line(0-ovh,roofOffY-ovh,0-ovh,roofOffY+b.bD+ovh,'WALLS_INT',18);
  line(b.bW+ovh,roofOffY-ovh,b.bW+ovh,roofOffY+b.bD+ovh,'WALLS_INT',18);
  text(-ovh-0.8,roofOffY+b.bD/2,0.4,'JGHEAB','ROOM_LABELS',1);
  text(b.bW+ovh+0.3,roofOffY+b.bD/2,0.4,'JGHEAB','ROOM_LABELS',1);

  // Cote plan acoperiș
  dim(0-ovh,roofOffY-ovh,b.bW+ovh,roofOffY-ovh,-1.5,'DIMS');
  dim(0-ovh,roofOffY-ovh,0-ovh,roofOffY+b.bD+ovh,-1.5,'DIMS');

  // ── ADNOTARE GENERALĂ ─────────────────────────────────────────────────────
  const noteY = roofOffY + b.bD + ovh + 5;
  text(0, noteY,    0.7, 'RELEVEE ARHITECTURALE — UrbanX TSS·FG', 'ANNOTATIONS');
  text(0, noteY+1.5,0.55,'Nr. cad.: '+P.nrCad+'  UTR: '+P.utr+'  POT: '+(P.pot*100).toFixed(0)+'%  CUT: '+P.cut,'ANNOTATIONS');
  text(0, noteY+2.8,0.5, 'Scara: 1:100  |  Unitati: METRI  |  Document orientativ — nu substituie documentatia tehnica autorizata','ANNOTATIONS');

  // ✅ ENDSEC înainte de EOF
  d(0,'ENDSEC');

  // ✅ EOF — corect la final
  d(0,'EOF');

  // ── Download ──────────────────────────────────────────────────────────────
  const dxfContent = lines.join('\n') + '\n';
  const blob = new Blob([dxfContent], {type:'application/dxf'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const fn   = ('relevee_'+String(P.nrCad||'urbanx')+'_'+String(P.utr||'UTR')+'.dxf').replace(/[^a-zA-Z0-9._-]/g,'_');
  a.download = fn;
  a.href     = url;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url), 2000);

  const nPlanuri = floors.length;
  if(typeof ss==='function') ss(
    '✅ DXF v2 exportat: '+fn+
    ' · '+nPlanuri+' planuri nivel'+
    ' · Secțiuni A-A+B-B cu camere reale'+
    ' · 4 fațade · Plan acoperiș'+
    ' · compatibil AutoCAD/QGIS/LibreCAD'
  );
  const btn2 = document.getElementById('rv-dxf-btn');
  if(btn2){ btn2.innerHTML='📏 Export DXF'; btn2.style.opacity='1'; }
}
