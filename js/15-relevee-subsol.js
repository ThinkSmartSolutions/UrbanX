// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-subsol.js — Sprint 2
// UrbanX TSS·FG
//
// 1. DNA → detector subsol parcaje + generator plan subsol complet
//    (coloane, culoare circulație, locuri parcare, rampă acces,
//     nuclee scări/lift, ventilație, bariere, marcaje)
// 2. Tablou materiale auto-generat (PDF + CSV)
//    (structură, închideri, finisaje, tâmplărie, subsol dacă există)
// 3. AEDIS settings → relevee
//    (penthouse, mansardă, perete cortină, tip balcon, finisaje)
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
    _injectSubsolButtons();
    const obs=new MutationObserver(()=>{
      if(document.querySelector('.rv-expbtn')&&!document.getElementById('rv-subsol-wrap'))
        _injectSubsolButtons();
    });
    obs.observe(document.body,{childList:true,subtree:true});
    _patchDNAParking();
    console.log('[Subsol Sprint2] ✅ loaded');
  });

  function _injectSubsolButtons(){
    if(document.getElementById('rv-subsol-wrap')) return;
    const a=document.querySelector('#rv-walls-btn')||document.querySelector('.rv-expbtn');
    if(!a) return;
    const wrap=document.createElement('span'); wrap.id='rv-subsol-wrap';
    [
      {id:'rv-subsol-btn',  icon:'🅿',  label:'Plan Subsol',         fn:'_rvExportSubsol',
       bg:'rgba(239,68,68,.15)', border:'rgba(239,68,68,.5)', color:'#f87171'},
      {id:'rv-materiale-btn',icon:'🧱', label:'Tablou Materiale',    fn:'_rvExportTablouMateriale',
       bg:'rgba(249,115,22,.15)',border:'rgba(249,115,22,.5)',color:'#fb923c'},
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

  // ── Patch DNA — adaugă alertă vizuală pentru necesitate subsol ──────────
  function _patchDNAParking(){
    const check=()=>{
      const P=_RV?.parcelParams, b=_RV?.building;
      if(!P||!b) return;
      const info=_calcSubsolNeeded(b,P);
      _RV._subsolInfo=info;
      // Actualizăm indicatorul DNA dacă e vizibil
      const dnaEl=document.getElementById('rv-dna-score-detail');
      if(dnaEl&&info.needsBasement){
        const existing=dnaEl.querySelector('#rv-subsol-alert');
        if(!existing){
          const div=document.createElement('div');
          div.id='rv-subsol-alert';
          div.style.cssText='margin-top:6px;padding:6px 8px;border-radius:6px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);font-size:8.5px;color:#f87171;font-weight:700';
          div.innerHTML=`🅿 Deficit ${info.deficit} locuri parcare → Subsol necesar · ${info.nLevels} nivel${info.nLevels>1?'e':''} (${info.totalSpots} locuri) · Apasă 🅿 Plan Subsol`;
          dnaEl.appendChild(div);
        }
      }
    };
    setTimeout(check,2000);
    setInterval(check,5000);
  }
})();

// ═══════════════════════════════════════════════════════════════════════════
// CALCUL NECESITATE SUBSOL (NP 067/2002)
// ═══════════════════════════════════════════════════════════════════════════
function _calcSubsolNeeded(b, P){
  const nrApt=Math.max(1,Math.round((b.sdaTotal||b.bW*b.bD*b.niv)/70));
  const fnCfg=typeof FN_CONFIG!=='undefined'?FN_CONFIG[_RV.fn]||FN_CONFIG.rez:{pk_unit:'per_apt',pk_val:1};
  let parcNec;
  if(fnCfg.pk_unit==='per_apt')      parcNec=Math.ceil(nrApt*fnCfg.pk_val*1.1); // +10% vizitatori
  else if(fnCfg.pk_unit==='per_50m2') parcNec=Math.ceil((b.sdaTotal||2000)/50*fnCfg.pk_val);
  else if(fnCfg.pk_unit==='per_2cam') parcNec=Math.ceil(nrApt*fnCfg.pk_val*1.1);
  else                                 parcNec=Math.ceil(nrApt*1.1);

  // Suprafață disponibilă la sol (parcelă - clădire - 200m² minim spații verzi)
  const surfDisp=Math.max(0, P.area - b.bW*b.bD - 200);
  // 1 loc = 2.5×5.5m + circulație: ~28m² brut
  const parcSup=Math.floor(surfDisp/28);
  const deficit=Math.max(0,parcNec-parcSup);

  // Câte locuri per nivel subsol
  // Module parcare: alee 6m + 2 rânduri × 5.5m = 17m
  const aisleModH=17; // m
  const nAisles=Math.max(1,Math.floor(b.bD/aisleModH));
  const spotsPerAisle=Math.floor(b.bW/2.5)*2 - 2; // -2 pt rampă
  const spotsPerLevel=nAisles*spotsPerAisle;
  const nLevels=deficit>0?Math.ceil(deficit/spotsPerLevel):0;
  const totalSpots=nLevels*spotsPerLevel;

  return {
    nrApt, parcNec, parcSup, deficit,
    needsBasement: deficit>0,
    nLevels: Math.max(nLevels,deficit>0?1:0),
    spotsPerLevel, totalSpots,
    surfDisp,
    nAisles
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// GENERATOR LAYOUT SUBSOL
// ═══════════════════════════════════════════════════════════════════════════
function _generateSubsolLayout(b, P, nLevel){
  nLevel=nLevel||1;
  const EW=0.30; // perete exterior subsol mai gros (30cm BA)
  const bW=b.bW, bD=b.bD;
  const SPOT_W=2.5, SPOT_D=5.5, AISLE=6.0, RAMP_W=3.5;
  const PILLAR=0.40; // secțiune stâlp BA 40×40cm

  const layout={
    level:nLevel, bW, bD,
    spots:[], aisles:[], ramp:null,
    columns:[], walls:[], cores:[],
    annotations:[], dimensions:[]
  };

  // Moștenire coloane de la etaje
  const nGX=Math.max(3,Math.round(bW/4.5));
  const nGY=Math.max(2,Math.round(bD/3.8));
  const gSpX=bW/nGX, gSpY=bD/nGY;
  for(let i=0;i<=nGX;i++) for(let j=0;j<=nGY;j++){
    layout.columns.push({x:i*gSpX, y:j*gSpY, w:PILLAR, h:PILLAR});
  }

  // Rampă acces — la frontul stradal (marginea bD)
  // Lungime rampă: (H_etaj + grosime planseu) / panta_max = 3.5/0.15 = 23.3m
  // Dacă nu încape, folosim rampă în 2 rampe cu palier
  const rampLen=Math.min(bD-2, 23.5); // m
  const rampX=bW/2-RAMP_W/2;
  layout.ramp={
    x:rampX, y:bD-rampLen, w:RAMP_W, h:rampLen,
    slope:15, slopeLen:rampLen, dir:'N→S',
    label:'RAMPĂ AUTO Δ15% · '+RAMP_W+'m lăț.'
  };
  layout.annotations.push({x:rampX+RAMP_W/2,y:bD-rampLen/2,text:'RAMPĂ\n15%',size:'small'});

  // Culoar principal circulație vehicule (lângă rampă)
  layout.aisles.push({x:0,y:bD-rampLen-1,w:bW,h:AISLE,label:'CULOAR ACCES 6.0m',type:'main'});
  layout.annotations.push({x:bW/2,y:bD-rampLen-1+AISLE/2,text:'CULOAR 6.0m',size:'normal'});

  // Rânduri parcări
  const aisleTopY=bD-rampLen-1; // Y-ul culoarului principal (sus)
  const aisleBottomY=bD-rampLen-1+AISLE; // Y-ul de jos al culoarului

  // Rând 1: deasupra culoarului (mers spre N)
  const row1Y=Math.max(EW, aisleTopY-SPOT_D);
  const nSpots1=Math.floor((bW-rampX-RAMP_W-1.5)/SPOT_W); // dreapta rampei
  const nSpots1L=Math.floor((rampX-EW-1)/SPOT_W); // stânga rampei
  let sx=EW+0.5;
  for(let i=0;i<nSpots1L;i++){
    layout.spots.push({x:sx,y:row1Y,w:SPOT_W,h:SPOT_D,dir:'S',nr:layout.spots.length+1});
    sx+=SPOT_W;
  }
  sx=rampX+RAMP_W+0.5;
  for(let i=0;i<nSpots1;i++){
    layout.spots.push({x:sx,y:row1Y,w:SPOT_W,h:SPOT_D,dir:'S',nr:layout.spots.length+1});
    sx+=SPOT_W;
  }

  // Rând 2: sub culoar (mers spre S)
  if(aisleBottomY+SPOT_D+EW<bD-EW){
    let sx2=EW+0.5;
    const nSpots2=Math.floor((bW-EW*2-1)/SPOT_W);
    for(let i=0;i<nSpots2;i++){
      layout.spots.push({x:sx2,y:aisleBottomY,w:SPOT_W,h:SPOT_D,dir:'N',nr:layout.spots.length+1});
      sx2+=SPOT_W;
    }
    // Al doilea culoar (dacă bD permite)
    const aisle2Y=aisleBottomY+SPOT_D+0.5;
    if(aisle2Y+AISLE+EW<bD-EW){
      layout.aisles.push({x:0,y:aisle2Y,w:bW,h:AISLE,label:'CULOAR 6.0m',type:'secondary'});
      // Rând 3: sub al doilea culoar
      let sx3=EW+0.5;
      const nSpots3=Math.floor((bW-EW*2-1)/SPOT_W);
      for(let i=0;i<nSpots3;i++){
        layout.spots.push({x:sx3,y:aisle2Y+AISLE,w:SPOT_W,h:SPOT_D,dir:'N',nr:layout.spots.length+1});
        sx3+=SPOT_W;
      }
    }
  }

  // Nuclee scări/lift (moștenire de la etaje)
  (b.cores||[]).forEach(c=>{
    layout.cores.push({x:c.x,y:c.y,w:c.w,h:c.h,label:'SC/LFT'});
  });
  // Dacă nu există core → adăugăm nuclee de acces la subsol lângă rampă
  if(!(b.cores||[]).length){
    layout.cores.push({x:EW+0.5,y:EW+0.5,w:3.0,h:4.5,label:'SCĂRI'});
    layout.cores.push({x:bW-EW-3.5,y:EW+0.5,w:3.0,h:4.5,label:'SCĂRI'});
  }

  // Zonă tehnică (ventilație, pompă)
  layout.annotations.push({
    x:EW+1, y:EW+1,
    text:'VENTILAȚIE\n+CO DETECTOR', size:'small', type:'tech'
  });
  layout.annotations.push({
    x:bW-EW-4, y:EW+1,
    text:'STAȚIE POMPARE\n+HIDROFOR', size:'small', type:'tech'
  });

  // Barieră auto la intrarea rampei
  layout.annotations.push({
    x:rampX+RAMP_W/2, y:bD-rampLen-0.5,
    text:'▼ BARIERĂ', size:'small', type:'barrier'
  });

  // Cote principale
  layout.dimensions.push({x1:0,y1:-3,x2:bW,y2:-3,label:bW.toFixed(1)+'m',axis:'H'});
  layout.dimensions.push({x1:-3,y1:0,x2:-3,y2:bD,label:bD.toFixed(1)+'m',axis:'V'});
  layout.dimensions.push({x1:rampX,y1:-5,x2:rampX+RAMP_W,y2:-5,label:RAMP_W+'m rampă',axis:'H'});

  layout.totalSpots=layout.spots.length;
  return layout;
}

// ═══════════════════════════════════════════════════════════════════════════
// DESENARE PLAN SUBSOL în jsPDF
// ═══════════════════════════════════════════════════════════════════════════
function _drawSubsolPDF(pdf, layout, ox, oy, sc, C){
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  const tx=x=>ox+x*sc, ty=y=>oy+y*sc;

  // Fundal subsol
  pdf.setFillColor(245,248,255);
  pdf.rect(ox,oy,layout.bW*sc,layout.bD*sc,'F');

  // Pereți exteriori (BA)
  const EW=0.30*sc;
  pdf.setFillColor(30,45,90);
  // Top, Bottom
  pdf.rect(ox-EW,oy-EW,layout.bW*sc+EW*2,EW,'F');
  pdf.rect(ox-EW,oy+layout.bD*sc,layout.bW*sc+EW*2,EW,'F');
  // Left, Right
  pdf.rect(ox-EW,oy,EW,layout.bD*sc,'F');
  pdf.rect(ox+layout.bW*sc,oy,EW,layout.bD*sc,'F');
  // Hașuri pereți BA
  const drawHatch=(rx,ry,rw,rh,sp,col)=>{
    pdf.setDrawColor(...col); pdf.setLineWidth(0.15);
    for(let hi=-rh;hi<rw+rh;hi+=sp){
      const x1=Math.max(rx,rx+hi),y1=rx+hi<rx?ry+(rx-rx-hi):ry;
      const x2=Math.min(rx+rw,rx+hi+rh),y2=x2===rx+rw?ry+(rx+rw-(rx+hi)):ry+rh;
      if(x1<rx+rw&&x2>rx&&y1>=ry&&y2<=ry+rh+.1) pdf.line(x1,y1,x2,y2);
    }
  };
  [[ox-EW,oy-EW,layout.bW*sc+EW*2,EW],[ox-EW,oy+layout.bD*sc,layout.bW*sc+EW*2,EW],
   [ox-EW,oy,EW,layout.bD*sc],[ox+layout.bW*sc,oy,EW,layout.bD*sc]].forEach(([rx,ry,rw,rh])=>{
    drawHatch(rx,ry,rw,rh,1.8,[60,80,130]);
  });

  // Culoar principal circulație
  layout.aisles.forEach(a=>{
    pdf.setFillColor(235,240,252);
    pdf.rect(tx(a.x),ty(a.y),a.w*sc,a.h*sc,'F');
    // Săgeți direcție
    const ay=ty(a.y+a.h/2), arW=a.w*sc*.6;
    pdf.setDrawColor(50,80,170); pdf.setLineWidth(0.4);
    pdf.line(tx(a.x+a.w*.2),ay, tx(a.x+a.w*.8),ay);
    pdf.line(tx(a.x+a.w*.8)-3,ay-2, tx(a.x+a.w*.8),ay);
    pdf.line(tx(a.x+a.w*.8)-3,ay+2, tx(a.x+a.w*.8),ay);
    // Etichetă
    pdf.setTextColor(50,80,170); pdf.setFont('helvetica','bold'); pdf.setFontSize(5);
    pdf.text(S2(a.label),tx(a.x)+a.w*sc/2,ty(a.y+a.h/2)+1.5,{align:'center'});
  });

  // Rampă
  if(layout.ramp){
    const r=layout.ramp;
    pdf.setFillColor(220,228,245);
    pdf.rect(tx(r.x),ty(r.y),r.w*sc,r.h*sc,'F');
    // Dungi diagonale rampă
    pdf.setDrawColor(100,120,180); pdf.setLineWidth(0.2);
    for(let hy=0;hy<r.h*sc;hy+=3.5)
      pdf.line(tx(r.x),ty(r.y)+hy, tx(r.x+r.w),ty(r.y)+hy+r.w*sc);
    pdf.setDrawColor(35,60,150); pdf.setLineWidth(0.6);
    pdf.rect(tx(r.x),ty(r.y),r.w*sc,r.h*sc,'S');
    // Săgeată rampă
    const midX=tx(r.x+r.w/2), midY=ty(r.y+r.h/2);
    pdf.setDrawColor(35,60,150); pdf.setLineWidth(0.6);
    pdf.line(midX,ty(r.y+r.h*.2),midX,ty(r.y+r.h*.8));
    pdf.line(midX-2,ty(r.y+r.h*.75),midX,ty(r.y+r.h*.8));
    pdf.line(midX+2,ty(r.y+r.h*.75),midX,ty(r.y+r.h*.8));
    pdf.setTextColor(25,50,140); pdf.setFont('helvetica','bold'); pdf.setFontSize(4.5);
    pdf.text('RAMPĂ',midX,midY-1.5,{align:'center'});
    pdf.setFontSize(4);
    pdf.text(r.slope+'% · '+r.w+'m',midX,midY+2,{align:'center'});
  }

  // Locuri parcare
  layout.spots.forEach((sp,i)=>{
    const sx=tx(sp.x), sy=ty(sp.y), sw=sp.w*sc, sh=sp.h*sc;
    pdf.setFillColor(i%2===0?248:245, i%2===0?252:250, 255);
    pdf.setDrawColor(50,80,160); pdf.setLineWidth(0.3);
    pdf.rect(sx,sy,sw,sh,'FD');
    // Marcaj P
    pdf.setTextColor(80,110,200); pdf.setFont('helvetica','bold'); pdf.setFontSize(3.8);
    pdf.text(String(sp.nr),sx+sw/2,sy+sh/2+1.2,{align:'center'});
    // Linii marcaj lateral
    pdf.setDrawColor(130,155,215); pdf.setLineWidth(0.15);
    pdf.line(sx,sy,sx,sy+sh);
    pdf.line(sx+sw,sy,sx+sw,sy+sh);
  });

  // Nuclee scări
  layout.cores.forEach(c=>{
    const cx=tx(c.x), cy=ty(c.y), cw=c.w*sc, ch=c.h*sc;
    pdf.setFillColor(200,215,250); pdf.setDrawColor(35,65,160); pdf.setLineWidth(0.6);
    pdf.rect(cx,cy,cw,ch,'FD');
    drawHatch(cx,cy,cw,ch,2.2,[55,90,190]);
    pdf.setTextColor(25,55,140); pdf.setFont('helvetica','bold'); pdf.setFontSize(4.2);
    pdf.text(S2(c.label),cx+cw/2,cy+ch/2+1.2,{align:'center'});
  });

  // Stâlpi BA (40×40cm)
  layout.columns.forEach(col=>{
    const cx=tx(col.x-col.w/2), cy=ty(col.y-col.h/2), cw=col.w*sc, ch=col.h*sc;
    pdf.setFillColor(20,38,80); pdf.rect(cx,cy,cw,ch,'F');
  });

  // Adnotări tehnice
  layout.annotations.forEach(ann=>{
    const ax=tx(ann.x), ay=ty(ann.y);
    const col=ann.type==='tech'?[15,140,105]:ann.type==='barrier'?[220,50,50]:[50,80,160];
    pdf.setFillColor(...col.map(c=>Math.round(c*.12+244)));
    pdf.setDrawColor(...col); pdf.setLineWidth(0.3);
    const tw2=16, th2=8;
    pdf.rect(ax-tw2/2,ay-th2/2,tw2,th2,'FD');
    pdf.setTextColor(...col); pdf.setFont('helvetica','bold'); pdf.setFontSize(3.5);
    const lines2=(ann.text||'').split('\n');
    lines2.forEach((ln,li)=>pdf.text(S2(ln),ax,ay-1.5+(li*3.5),{align:'center'}));
  });

  // Bordura exterior
  pdf.setDrawColor(15,25,60); pdf.setLineWidth(0.9);
  pdf.rect(ox-EW,oy-EW,layout.bW*sc+EW*2,layout.bD*sc+EW*2,'S');

  // Cote
  pdf.setDrawColor(20,38,88); pdf.setLineWidth(0.25);
  pdf.line(ox,oy-EW-8,ox+layout.bW*sc,oy-EW-8);
  pdf.line(ox,oy-EW-10,ox,oy-EW-6); pdf.line(ox+layout.bW*sc,oy-EW-10,ox+layout.bW*sc,oy-EW-6);
  pdf.setTextColor(20,38,88); pdf.setFont('helvetica','bold'); pdf.setFontSize(5.5);
  pdf.text(layout.bW.toFixed(1)+' m',ox+layout.bW*sc/2,oy-EW-11.5,{align:'center'});
  pdf.line(ox-EW-8,oy,ox-EW-8,oy+layout.bD*sc);
  pdf.line(ox-EW-10,oy,ox-EW-6,oy); pdf.line(ox-EW-10,oy+layout.bD*sc,ox-EW-6,oy+layout.bD*sc);
  pdf.text(layout.bD.toFixed(1)+' m',ox-EW-15,oy+layout.bD*sc/2,{align:'center',angle:90});

  // Legend parcări
  pdf.setFillColor(248,250,255); pdf.setDrawColor(180,190,215); pdf.setLineWidth(0.2);
  const legX=ox+layout.bW*sc+12, legY=oy;
  pdf.rect(legX,legY,45,30,'FD');
  pdf.setTextColor(20,35,80); pdf.setFont('helvetica','bold'); pdf.setFontSize(6);
  pdf.text('SUBSOL NIV. -'+(layout.level||1),legX+22.5,legY+5.5,{align:'center'});
  pdf.setFont('helvetica','normal'); pdf.setFontSize(5);
  pdf.text('Locuri parcare: '+layout.totalSpots+' buc.',legX+2,legY+11);
  pdf.text('Culoar circulație: 6.0m',legX+2,legY+16);
  pdf.text('Loc parcare: 2.5m × 5.5m',legX+2,legY+21);
  pdf.text('Rampă acces: 3.5m · Δ15%',legX+2,legY+26);
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT PLAN SUBSOL — PDF + DXF layers
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportSubsol(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
  if(!_jsPDF){alert('jsPDF indisponibil.');return;}

  const btn=document.getElementById('rv-subsol-btn')
         ||document.getElementById('rv-tb-_rvExportSubsol')
         ||document.querySelector('[onclick*="_rvExportSubsol"]');
  if(btn){btn.innerHTML='⏳ Subsol…';btn.style.opacity='.6';}
  if(typeof ss==='function') ss('⏳ Generez plan subsol…');

  const info=_calcSubsolNeeded(b,P);
  if(!info.needsBasement){
    const forta = confirm(
      '✅ La această parcelă subsolul NU este obligatoriu conform NP 067/2002.\n\n'+
      '• Parcaje disponibile la sol: '+info.parcSup+' locuri\n'+
      '• Necesare (NP 067): '+info.parcNec+' locuri\n\n'+
      'Doriți totuși să generați planul de subsol? (opțional / pt. proiecte cu cerințe proprii)'
    );
    if(!forta){if(btn){btn.innerHTML='🅿 Plan Subsol';btn.style.opacity='1';} return;}
    // Generăm un subsol cu 1 nivel cu capacitate maximă posibilă
    info.needsBasement=true; info.nLevels=1;
    info.deficit=info.parcNec; // forțăm generarea
  }

  const W=420,H=297;
  const pdf=new _jsPDF({orientation:'landscape',unit:'mm',format:'a3'});
  let pgN=0;
  const newPg=()=>{if(pgN>0)pdf.addPage();pgN++;};
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim().slice(0,300);
  const C={gold:[180,140,30],dark2:[15,25,50],gray2:[205,210,218],red:[180,30,30],gray:[120,130,145]};

  const SCALES=[50,100,150,200,250,500];
  const pickSc=(dM,mM)=>SCALES.find(s=>s>=dM*1000/mM)||SCALES[SCALES.length-1];
  const SC_RATIO=pickSc(Math.max(b.bW+8,b.bD+8),Math.min(W-80,H-40));
  const sc=1000/SC_RATIO, scLabel='Sc. 1:'+SC_RATIO;

  const cartus=(titlu,sub)=>{
    pdf.setFillColor(...C.dark2);pdf.rect(0,0,W,9,'F');
    pdf.setFillColor(...C.gold);pdf.rect(0,8.5,W,.7,'F');
    pdf.setFillColor(180,50,50);pdf.roundedRect(3,1.5,7,6,1,1,'F'); // roșu pt subsol
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('B1',6.5,6.2,{align:'center'});
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(9);
    pdf.text(S2(titlu),13,6);
    pdf.setTextColor(200,210,230);pdf.setFont('helvetica','normal');pdf.setFontSize(6);
    pdf.text(S2(scLabel+'  ·  Nr.cad. '+P.nrCad+'  ·  '+info.totalSpots+' locuri parcaj  ·  NP 067/2002'),W-4,6,{align:'right'});
    pdf.setFillColor(255,245,245);pdf.rect(0,H-5.5,W,5.5,'F');
    pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.15);pdf.line(0,H-5.5,W,H-5.5);
    pdf.setTextColor(130,80,80);pdf.setFont('helvetica','italic');pdf.setFontSize(4.5);
    pdf.text(S2('Subsol parcare NP 067/2002 · UrbanX TSS·FG · Document orientativ · nu înlocuieste proiectul tehnic autorizat'),W/2,H-1.5,{align:'center'});
    if(sub){
      pdf.setFillColor(255,240,240);pdf.rect(0,9,W,6,'F');
      pdf.setTextColor(180,50,50);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text(S2(sub),W/2,13.5,{align:'center'});
    }
  };

  for(let lv=1;lv<=info.nLevels;lv++){
    newPg();
    pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
    const layout=_generateSubsolLayout(b,P,lv);
    const ox=50, oy=20;
    cartus(
      `PLAN SUBSOL NIVEL -${lv} — Parcare Auto`,
      `Deficit: ${info.deficit} locuri · Disponibil la sol: ${info.parcSup} · Necesar: ${info.parcNec} (NP 067/2002) · Acest nivel: ${layout.totalSpots} locuri`
    );
    _drawSubsolPDF(pdf,layout,ox,oy,sc,C);
  }

  // Pagina cu nota tehnica subsol
  newPg();
  pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
  cartus('SUBSOL — NOTE TEHNICE + CONFORMITATE NP 067/2002 + TABLOU MATERIALE');
  const nx=15,ny=16;
  pdf.setTextColor(15,25,60);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
  pdf.text('CONFORMITATE PARCARE — NP 067/2002',nx,ny+4);

  const rows=[
    ['Număr unități estimate',String(info.nrApt)+' apt.','INS – 70m²/unitate medie'],
    ['Parcaje necesare',String(info.parcNec)+' loc.','NP 067/2002 – 1 loc/apt + 10% vizitatori'],
    ['Parcaje disponibile la sol',String(info.parcSup)+' loc.',String(Math.round(info.surfDisp))+'m² suprafață disponibilă / 28m² brut/loc'],
    ['DEFICIT',String(info.deficit)+' loc.','→ Subsol necesar'],
    ['Locuri asigurate subsol',String(info.totalSpots)+' loc.',String(info.nLevels)+' nivel(e) × '+String(info.spotsPerLevel)+' loc./nivel'],
    ['TOTAL ASIGURAT',String(info.parcSup+info.totalSpots)+' loc.','✅ '+String(info.parcSup+info.totalSpots)+'/'+ String(info.parcNec)+' ('+Math.round((info.parcSup+info.totalSpots)/info.parcNec*100)+'%)'],
  ];
  let ry=ny+9;
  rows.forEach((r,i)=>{
    const isLast=i===rows.length-1;
    pdf.setFillColor(isLast?225:i%2===0?250:246, isLast?240:i%2===0?252:248, isLast?225:255);
    pdf.rect(nx,ry-3.5,W-nx*2,6,'F');
    pdf.setDrawColor(200,210,225);pdf.setLineWidth(0.12);pdf.rect(nx,ry-3.5,W-nx*2,6,'S');
    pdf.setFont('helvetica',isLast?'bold':'normal');pdf.setFontSize(6);
    pdf.setTextColor(isLast?15:40,isLast?80:55,isLast?15:90);
    pdf.text(S2(r[0]),nx+3,ry+0.5);
    pdf.setFont('helvetica','bold');pdf.setTextColor(isLast?15:20,isLast?100:35,isLast?15:80);
    pdf.text(S2(r[1]),nx+75,ry+0.5);
    pdf.setFont('helvetica','normal');pdf.setTextColor(100,115,135);pdf.setFontSize(5);
    pdf.text(S2(r[2]),nx+100,ry+0.5);
    ry+=6.2;
  });

  // Specificatii tehnice subsol
  ry+=5;
  pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);pdf.setTextColor(15,25,60);
  pdf.text('SPECIFICAȚII TEHNICE SUBSOL',nx,ry);ry+=6;
  const specs=[
    ['Structura subsolului','Beton armat C30/37, P+W8 · Impermeabilizare beton · Radier 30cm + pereți 30cm'],
    ['Înălțime liberă subsol','min 2.20m (NP 067) · recomandat 2.40m pentru ventilație'],
    ['Ventilație mecanică','Obligatorie P118/3 · min 6 sch/h · Detectoare CO + CO₂ · Evacuare forțată'],
    ['Instalații subsol','Stație pompare apă uzată · Hidrofor · Instalație sprinklere (dacă >200 locuri)'],
    ['Rampă acces auto','Lățime min 3.0m (3.5m recomandat) · Pantă max 15% · Striuri antiderapante'],
    ['Marcaje parcare','Vopsea epoxidică 2C · Alb – loc normal · Galben – loc cu dizabilități · Blue P (informativ)'],
    ['Barieră auto','Automată cu telecomandă/card · Senzor buclă inductivă · UPS backup'],
    ['Iluminat','LED 50-100 lux nivel parcare · 200 lux rampe · Iluminat urgență 1h autonomie'],
  ];
  specs.forEach((sp,i)=>{
    pdf.setFillColor(i%2===0?248:252,i%2===0?250:252,255);
    pdf.rect(nx,ry-3.5,(W-nx*2)/2,6,'F');
    pdf.rect(nx+(W-nx*2)/2,ry-3.5,(W-nx*2)/2,6,'F');
    pdf.setDrawColor(210,218,232);pdf.setLineWidth(0.12);
    pdf.rect(nx,ry-3.5,W-nx*2,6,'S');
    pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.setTextColor(20,35,80);
    pdf.text(S2(sp[0]),nx+2,ry+0.5);
    pdf.setFont('helvetica','normal');pdf.setTextColor(60,75,100);
    pdf.text(S2(sp[1]),nx+(W-nx*2)/2+2,ry+0.5);
    ry+=6.2;
  });

  const fn=('subsol_'+S2(P.nrCad)+'_'+S2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
  if(typeof ss==='function') ss('✅ Plan Subsol: '+(pgN)+' pagini · '+fn+' · '+info.totalSpots+' locuri parcare');
  if(btn){btn.innerHTML='🅿 Plan Subsol';btn.style.opacity='1';}
}

// ═══════════════════════════════════════════════════════════════════════════
// TABLOU MATERIALE (PDF + CSV)
// ═══════════════════════════════════════════════════════════════════════════
const MATERIALS={
  // Structura
  ba_stalpi:   {cat:'Structură',name:'Stâlpi beton armat C25/30',   unit:'buc', desc:'40×40cm, h=3.0m, fiecare nivel', cost:950},
  ba_grinzi:   {cat:'Structură',name:'Grinzi beton armat C25/30',   unit:'ml', desc:'Secțiune 30×60cm, grindă principală', cost:280},
  ba_planseu:  {cat:'Structură',name:'Planșeu beton armat C25/30',  unit:'m²', desc:'Grosime 20cm, monolitic', cost:135},
  ba_radier:   {cat:'Structură',name:'Fundație radier BA C30/37',   unit:'m²', desc:'Grosime 30cm, P+W8, subsol', cost:195},
  // Închideri exterioare
  per_ext:     {cat:'Pereți exteriori',name:'Perete exterior BCA 20cm+EPS 15cm',unit:'m²',desc:'BCA 20cm + termoizolație EPS 15cm + tencuială silicată',cost:95},
  per_cortina: {cat:'Pereți exteriori',name:'Perete cortină aluminiu+geam',unit:'m²',desc:'Profil Al 60mm + geam tripan 4/16/4, transmitanță U=0.7',cost:650},
  // Pereți interiori
  per_int_bca: {cat:'Pereți interiori',name:'Perete interior BCA 10cm',unit:'m²',desc:'BCA 10cm + tencuială 1.5cm bipartit', cost:45},
  per_int_gk:  {cat:'Pereți interiori',name:'Perete gipscarton 2×12.5mm',unit:'m²',desc:'Structură metalică + 2 straturi GK 12.5mm + vată', cost:65},
  // Tâmplărie
  ferestre_pvc:{cat:'Tâmplărie',name:'Ferestre PVC 5 camere, geam tripan',unit:'buc',desc:'PVC alb Uw=0.9 · geam tripan 4/16/4 · dublu canat', cost:420},
  usa_ext_al:  {cat:'Tâmplărie',name:'Ușă exterioară aluminiu RAL',unit:'buc',desc:'Aluminiu RAL 7016 · 2100×900mm · cerber anti-efracție', cost:1450},
  usa_int_hdf: {cat:'Tâmplărie',name:'Ușă interioară HDF 40mm',unit:'buc',desc:'HDF 40mm · toc reglabil · feronerie inox', cost:320},
  usa_garaj:   {cat:'Tâmplărie',name:'Ușă sectionala garaj/subsol',unit:'buc',desc:'Sectional din oțel izolat, telecomandă', cost:2800},
  // Finisaje
  parchet_lam: {cat:'Finisaje',name:'Parchet laminat AC4, 8mm',unit:'m²',desc:'Laminat AC4 + folie vapori 2mm · click', cost:38},
  gresie_bath: {cat:'Finisaje',name:'Gresie baie rectificată R11',unit:'m²',desc:'60×60cm antiderapantă · rost 2mm epoxidic', cost:52},
  gresie_buc:  {cat:'Finisaje',name:'Gresie bucătărie rectificată',unit:'m²',desc:'60×60cm · rost epoxidic 2mm', cost:48},
  tencuiala:   {cat:'Finisaje',name:'Tencuială mecanizată interior',unit:'m²',desc:'Glet Knauf 2mm + grunduit + vopsea lavabilă 2×', cost:28},
  // Acoperiș / Terasă
  acop_tigla:  {cat:'Acoperiș',name:'Acoperiș învelitoare ceramică',unit:'m²',desc:'Căpriori 10×16cm @ 90cm + șipcuire + membrană + țiglă', cost:75},
  terasa_circ: {cat:'Terasă',name:'Terasă circulabilă (dale 40×40)',unit:'m²',desc:'Membrană bituminoasă 2str. + XPS 10cm + dale 40×40 pe plots', cost:105},
  terasa_verd: {cat:'Terasă',name:'Terasă verde extensivă',unit:'m²',desc:'Membrană + XPS + substrat 10cm + vegetație extensivă', cost:135},
  // Subsol (dacă există)
  hidro_subs:  {cat:'Subsol',name:'Hidroizolație subsol extradosată',unit:'m²',desc:'Membrană bituminoasă autoprotejată 2str. + protecție mecanică', cost:62},
  marcaje_pk:  {cat:'Subsol',name:'Marcaje parcare epoxidice',unit:'loc',desc:'Vopsea epoxidică 2C albă + delimitator galben',cost:55},
  bariera_auto:{cat:'Subsol',name:'Barieră auto automată',unit:'buc',desc:'Barieră 4m + senzor buclă + telecomandă + UPS', cost:3200},
  vent_subs:   {cat:'Subsol',name:'Sistem ventilație mecanică subsol',unit:'forfait',desc:'Centrale ventilație + detectoare CO/CO₂ + tubulatura', cost:18000},
  rampa_beton: {cat:'Subsol',name:'Rampă acces beton striat',unit:'m²',desc:'BA 15cm C25/30 + striuri antiderapante + trotuar 10cm', cost:98},
};

function _rvExportTablouMateriale(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
  if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  if(typeof ss==='function') ss('⏳ Generez Tablou Materiale…');

  const fl=_RV.floors[0]||_RV.floors[_RV.floor];
  const info=_RV._subsolInfo||_calcSubsolNeeded(b,P);
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  const RN=(n,d)=>isNaN(n)?'—':d?Number(n).toFixed(d):Math.round(n)+'';

  // Calculăm cantități
  const sc_area = b.scArea||b.bW*b.bD*P.pot;
  const sda_total = b.sdaTotal||sc_area*b.niv;
  const perim_ext = 2*(b.bW+b.bD);
  const perim_int_est = (b.bW*b.bD*b.niv)/12; // estimat
  const H_total = b.niv*P.hn;
  const nFerestre = fl.wins?.length||Math.round((perim_ext*H_total*.3)/1.5);
  const nUsiInt = fl.doors?.filter(d=>d.type!=='main').length||Math.round(sda_total/18);
  const nUsiExt = fl.doors?.filter(d=>d.type==='main').length||b.cores.length;
  const nStalpiBaza = Math.max(3,Math.round(b.bW/4.5)+1)*Math.max(2,Math.round(b.bD/3.8)+1);
  const nStalpi = nStalpiBaza*b.niv;
  const nAisleLen = (b.bW+b.bD)*b.niv;

  const aedisConfig = _rvGetAEDISConfig();
  const hasPereCortina = aedisConfig.pereCortina||false;
  const hasMansarda = aedisConfig.mansarda||false;
  const hasTerasa = aedisConfig.terasa||false;

  // Construim lista cantități
  const items=[];
  const add=(key,qty,obs)=>{
    const m=MATERIALS[key];
    if(!m||qty<=0) return;
    items.push({...m,key,qty:Math.round(qty*10)/10,obs:obs||'',total_eur:Math.round(qty*(m.cost||0))});
  };

  // Structură
  add('ba_stalpi',nStalpi,'incl. subsol dacă există');
  add('ba_grinzi',nAisleLen*0.6,'grinzi principale per etaj');
  add('ba_planseu',sc_area*b.niv,'toate planșeele');
  if(info.needsBasement) add('ba_radier',sc_area*info.nLevels,'radier subsol, P+W8');

  // Pereți exteriori
  const extWallArea = perim_ext*H_total*.7;
  if(hasPereCortina){
    add('per_cortina',extWallArea*.6,'perete cortină fațade principale');
    add('per_ext',extWallArea*.4,'pereți opaci restanți');
  } else {
    add('per_ext',extWallArea,'pereți exteriori cu termoizolație');
  }

  // Pereți interiori
  add('per_int_bca',perim_int_est*H_total*.65,'pereți interiori BCA');
  add('per_int_gk',perim_int_est*H_total*.35,'compartimentări gipscarton');

  // Tâmplărie
  add('ferestre_pvc',nFerestre,'din planul de goluri');
  add('usa_ext_al',nUsiExt,'uși intrare apartamente, intrare clădire');
  add('usa_int_hdf',nUsiInt,'uși interioare apartamente');
  if(info.needsBasement) add('usa_garaj',info.nLevels,'una per nivel subsol');

  // Finisaje
  const livingArea=fl.rects?.filter(r=>['living','bedroom','bedroom2','bedroom3','office'].includes(r.t)).reduce((s,r)=>s+r.w*r.h,0)||sda_total*.55;
  const bathArea=fl.rects?.filter(r=>['bath','wc'].includes(r.t)).reduce((s,r)=>s+r.w*r.h,0)||sda_total*.08;
  const kitchenArea=fl.rects?.filter(r=>r.t==='kitchen').reduce((s,r)=>s+r.w*r.h,0)||sda_total*.1;
  add('parchet_lam',livingArea*b.niv,'living + dormitoare toate etajele');
  add('gresie_bath',bathArea*b.niv,'băi + WC toate etajele');
  add('gresie_buc',kitchenArea*b.niv,'bucătărie toate etajele');
  add('tencuiala',(perim_int_est+perim_ext)*H_total,'tencuială + glet + vopsea');

  // Acoperiș / Terasă
  if(hasMansarda) add('acop_tigla',sc_area*1.3,'suprafață învelitoare mansardă');
  else if(hasTerasa) add('terasa_circ',sc_area,'terasă circulabilă mansardă/ultimul etaj');
  else add('acop_tigla',sc_area*1.3,'acoperiș șarpantă');

  // Subsol materiale
  if(info.needsBasement){
    add('hidro_subs',(perim_ext*3.5*info.nLevels)+(sc_area*info.nLevels),'pereți + radier hidroizolație');
    add('marcaje_pk',info.totalSpots,'vopsea epoxidică per loc');
    add('bariera_auto',info.nLevels*2,'intrare+ieșire per nivel');
    add('vent_subs',1,'sistem complet ventilație mecanică');
    add('rampa_beton',3.5*(23.5)*info.nLevels,'suprafață rampă totală');
  }

  // Grupăm pe categorii
  const cats={};
  items.forEach(it=>{
    if(!cats[it.cat]) cats[it.cat]=[];
    cats[it.cat].push(it);
  });

  // ── PDF ──────────────────────────────────────────────────────────────────
  const pdf=new _jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const PW=210,PH=297;

  pdf.setFillColor(15,25,50);pdf.rect(0,0,PW,18,'F');
  pdf.setFillColor(180,140,30);pdf.rect(0,17.5,PW,.8,'F');
  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(13);
  pdf.text('TABLOU DE MATERIALE',PW/2,11,{align:'center'});
  pdf.setFont('helvetica','normal');pdf.setFontSize(7);pdf.setTextColor(200,210,230);
  pdf.text(S2('Nr.cad. '+P.nrCad+' · UTR '+P.utr+' · P+'+(b.niv-1)+'E · SDA ~'+RN(sda_total,0)+'m²'+(info.needsBasement?' · Subsol '+info.nLevels+' niv.':'')),PW/2,15.5,{align:'center'});

  let y=22;
  const totalCost=items.reduce((s,i)=>s+i.total_eur,0);

  // Per categorie
  Object.entries(cats).forEach(([cat,catItems])=>{
    if(y>PH-35){pdf.addPage();y=10;}
    // Header categorie
    const catTotal=catItems.reduce((s,i)=>s+i.total_eur,0);
    pdf.setFillColor(25,40,80);pdf.rect(10,y,190,7,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(8);
    pdf.text(S2(cat.toUpperCase()),14,y+5);
    pdf.setFont('helvetica','normal');pdf.setFontSize(7);
    pdf.text('~'+RN(catTotal/1000,0)+'k€',PW-14,y+5,{align:'right'});
    y+=9;

    // Header coloane
    const cols=[{t:'Denumire material',w:72},{t:'Descriere',w:55},{t:'U.M.',w:14},{t:'Cant.',w:18},{t:'Preț unit.',w:20},{t:'Total est.',w:21}];
    pdf.setFillColor(238,242,250);pdf.rect(10,y,190,5.5,'F');
    let cx=10;
    cols.forEach(c=>{
      pdf.setDrawColor(185,195,215);pdf.setLineWidth(0.12);pdf.rect(cx,y,c.w,5.5,'S');
      pdf.setTextColor(40,55,90);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text(S2(c.t),cx+c.w/2,y+3.8,{align:'center'});
      cx+=c.w;
    });
    y+=5.5;

    catItems.forEach((it,ri)=>{
      if(y>PH-20){pdf.addPage();y=10;}
      pdf.setFillColor(ri%2===0?252:248, ri%2===0?252:250, ri%2===0?255:254);
      pdf.rect(10,y,190,5.5,'F');
      let cx2=10;
      const vals=[it.name, it.desc, it.unit, RN(it.qty,1), it.cost+'€', '~'+RN(it.total_eur/1000,1)+'k€'];
      cols.forEach((c,ci)=>{
        pdf.setDrawColor(210,218,232);pdf.setLineWidth(0.1);pdf.rect(cx2,y,c.w,5.5,'S');
        pdf.setFont('helvetica',ci===0?'bold':'normal');pdf.setFontSize(5);
        pdf.setTextColor(ci===0?15:60, ci===0?30:75, ci===0?75:105);
        pdf.text(S2(vals[ci]),cx2+2,y+3.8);
        cx2+=c.w;
      });
      y+=5.5;
    });
    y+=3;
  });

  // Total general
  if(y>PH-25){pdf.addPage();y=10;}
  pdf.setFillColor(15,25,50);pdf.rect(10,y,190,14,'F');
  pdf.setFillColor(180,140,30);pdf.rect(10,y,190,.8,'F');
  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(9);
  pdf.text('TOTAL ESTIMAT CONSTRUCȚIE',14,y+6);
  pdf.setFontSize(11);pdf.text('~'+RN(totalCost/1000,0)+'.000 €',PW-14,y+6,{align:'right'});
  pdf.setFontSize(6.5);pdf.setFont('helvetica','normal');pdf.setTextColor(180,195,225);
  pdf.text(S2('Prețuri orientative 2026 · TVA 5% locuințe neinclusă · Variații regionale ±15%'),PW/2,y+12,{align:'center'});

  pdf.setFontSize(5.5);pdf.setFont('helvetica','italic');pdf.setTextColor(130,140,155);
  pdf.text(S2('UrbanX TSS·FG · Tablou materiale estimativ · Nu include manoperă, utilaje, organizare șantier · Consultați devizul detaliat al arhitectului'),PW/2,PH-5,{align:'center'});

  const fn1=('tablou_materiale_'+S2(P.nrCad)+'_'+S2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn1);

  // ── CSV ──────────────────────────────────────────────────────────────────
  let csv='\uFEFFCategorie,Denumire material,Descriere,Unitate masura,Cantitate,Pret unitar (EUR),Total estimat (EUR)\n';
  items.forEach(it=>{
    csv+=`"${it.cat}","${it.name}","${it.desc}","${it.unit}",${it.qty},${it.cost},${it.total_eur}\n`;
  });
  csv+=`\n,,,,,"TOTAL",${totalCost}\n`;
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.download=fn1.replace('.pdf','.csv');a.href=url;a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);

  if(typeof ss==='function') ss('✅ Tablou Materiale: '+fn1+' + CSV · '+items.length+' articole · ~'+RN(totalCost/1000,0)+'k€ estimat');
}

// ═══════════════════════════════════════════════════════════════════════════
// AEDIS CONFIG READER + APLICARE LA RELEVEE
// ═══════════════════════════════════════════════════════════════════════════
function _rvGetAEDISConfig(){
  // Citim din mai multe surse posibile
  const aedis = window.AEDIS || window._AEDIS || null;
  const svol  = window.S?.vol || null;
  return {
    penthouse:    aedis?.penthouse    || svol?.penthouse    || false,
    mansarda:     aedis?.mansarda     || svol?.mansarda     || false,
    pereCortina:  aedis?.pereCortina  || svol?.pereCortina  || false,
    terasa:       aedis?.terasa       || svol?.terasa       || false,
    balconType:   aedis?.balconType   || svol?.balconType   || 'standard', // standard/larg/francez/fara
    finisajExt:   aedis?.finisajExt   || svol?.finisajExt   || 'tencuiala', // tencuiala/clinker/travertin/tabla
    scenariu:     aedis?.scenariu     || svol?.scenariu     || null,
  };
}

// Patch _rvCompBuilding pentru a integra setările AEDIS
(function(){
  function waitBuild(cb,n){
    n=n||0; if(n>80) return;
    if(typeof _rvCompBuilding==='undefined'){
      setTimeout(()=>waitBuild(cb,n+1),250); return;
    }
    cb();
  }
  waitBuild(()=>{
    const _origComp=window._rvCompBuilding;
    if(!_origComp){return;}
    window._rvCompBuilding=function(P){
      const b=_origComp(P);
      if(!b) return b;
      const cfg=_rvGetAEDISConfig();

      // Penthouse: ultimul etaj cu retragere
      if(cfg.penthouse&&b.niv>2){
        b.penthouse={
          retragere:2.5, // 2.5m setback
          niv:1,         // ultimul etaj
          reduced_bW:b.bW-5.0,
          reduced_bD:b.bD-5.0,
        };
        b._hasPenthouse=true;
      }

      // Mansardă: înlocuiește ultimul etaj cu spațiu sub șarpantă
      if(cfg.mansarda&&b.niv>1){
        b.mansarda={
          panta:35,     // grade
          inaltimeCoama:b.bD*Math.tan(35*Math.PI/180)/2,
          niv:1,
          h_perete:1.5, // înălțimea peretelui drept
        };
        b._hasMansarda=true;
      }

      // Perete cortină: flag pentru fațade
      if(cfg.pereCortina){
        b._pereCortina=true;
        b._cortinaPct=0.60; // 60% din fațadă cortină
      }

      // Tip balcon
      b._balconType=cfg.balconType;
      if(cfg.balconType==='larg')    b._balconAdancime=2.0;
      else if(cfg.balconType==='francez') b._balconAdancime=0.0;
      else if(cfg.balconType==='fara')    b._balconAdancime=-1;
      else b._balconAdancime=1.4; // standard

      // Finisaj exterior
      b._finisajExt=cfg.finisajExt;

      // Terasă pe ultimul etaj
      if(cfg.terasa){
        b._terasa={type:'circulabila',suprafata:b.bW*b.bD};
      }

      console.log('[Sprint2 AEDIS] Applied config:',{penthouse:b._hasPenthouse,mansarda:b._hasMansarda,cortina:b._pereCortina,balcon:b._balconType});
      return b;
    };
    console.log('[Sprint2] ✅ _rvCompBuilding patched cu AEDIS config');
  });
})();
