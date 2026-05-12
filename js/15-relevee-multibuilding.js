// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-multibuilding.js — Layer Legătură Multi-Corp / Multi-Parcelă
// UrbanX TSS·FG
//
// Detectează automat scenariul activ și leagă releveele cu:
//   1. O singură clădire pe o parcelă (default — funcționează deja)
//   2. AEDIS.corpuri[] — multiple corpuri pe ACEEAȘI parcelă (Lotizare)
//      fiecare corp are: niv, hNiv, tip, fn, pozitie proprie
//   3. S.parcels[] + S.multiMode — multiple parcele simultane
//      fiecare parcelă generează un set complet de relevee
//
// Funcționalități:
//   - Selector UI clădire activă (tab-uri sau dropdown)
//   - _rvSetActiveBuilding(def) — comută _RV la clădirea selectată
//   - _rvGetAllBuildings()       — inventariază toate clădirile disponibile
//   - _rvExportBatch()           — generează toate releveele secvențial
//   - _rvExportSitePlanAll()     — plan de situație combinat (toate clădirile)
//   - _rvExportSummaryAll()      — sumar comparativ toate clădirile (PDF)
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  function waitReady(cb,n){
    n=n||0; if(n>100) return;
    if(typeof _rvExportPDF==='undefined'||typeof _RV==='undefined'){
      setTimeout(()=>waitReady(cb,n+1),300); return;
    }
    cb();
  }
  waitReady(()=>{
    _injectMultiBuildingUI();
    // Re-injectăm UI când apar relevee noi
    const obs=new MutationObserver(()=>{
      if(document.querySelector('.rv-expbtn')&&!document.getElementById('rv-multi-selector'))
        _injectMultiBuildingUI();
    });
    obs.observe(document.body,{childList:true,subtree:true});
    // Monitorizăm schimbările în AEDIS.corpuri sau S.parcels
    setInterval(_rvCheckMultiMode, 3000);
    console.log('[MultiBuilding] ✅ loaded');
  });
})();

// ═══════════════════════════════════════════════════════════════════════════
// DETECȚIE SCENARIU ACTIV
// ═══════════════════════════════════════════════════════════════════════════
function _rvDetectBuildingMode(){
  const S=window.S;
  const nParcels=(S?.parcels?.length)||0;
  const nCorpuri=(window.AEDIS?.corpuri?.length)||0;
  const nFeats=(S?.vol?._lastFeats?.length)||0;
  if(nParcels>1&&S?.multiMode) return 'multi-parcel';   // Multiple parcele selectate
  if(nCorpuri>1)                return 'multi-corp';     // AEDIS.corpuri[] multiple
  if(nFeats>1)                  return 'multi-feat';     // Volume 3D multiple
  return 'single';
}

let _lastMultiMode='single', _lastBuildingCount=1;
function _rvCheckMultiMode(){
  const mode=_rvDetectBuildingMode();
  const buildings=_rvGetAllBuildings();
  if(mode!==_lastMultiMode||buildings.length!==_lastBuildingCount){
    _lastMultiMode=mode; _lastBuildingCount=buildings.length;
    _injectMultiBuildingUI();
    if(mode!=='single'&&typeof ss==='function')
      ss('📐 Multi-clădiri detectate: '+buildings.length+' clădiri · mod "'+mode+'" · selector activat');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// INVENTAR COMPLET CLĂDIRI DISPONIBILE
// ═══════════════════════════════════════════════════════════════════════════
function _rvGetAllBuildings(){
  const S=window.S;
  const buildings=[];
  const mode=_rvDetectBuildingMode();

  // ── MULTI-PARCELĂ: fiecare parcelă = o clădire cu proprii parametri ───
  if(mode==='multi-parcel'&&S?.multiMode&&S?.parcels?.length>1){
    S.parcels.forEach((ap,i)=>{
      if(!ap?.geo?.geometry) return;
      try{
        // Construim P pentru această parcelă specifică
        const P=_rvBuildParamsForParcel(S,i,ap);
        if(!P) return;
        buildings.push({
          id:'P'+(i+1),
          label:'Parcelă '+(i+1)+' · '+(ap.nrCad||ap.utr||'—'),
          icon:'🗂',
          type:'parcel',
          parcelIdx:i,
          corpIdx:0,
          P, ap,
          color:['#38bdf8','#34d399','#f59e0b','#a78bfa','#f87171','#fb923c'][i%6],
        });
      }catch(e){}
    });
    return buildings.length?buildings:_rvGetAllBuildingsFallback();
  }

  // ── MULTI-CORP: AEDIS.corpuri[] pe aceeași parcelă ────────────────────
  if(mode==='multi-corp'&&window.AEDIS?.corpuri?.length>1){
    const ap=S?.parcels?.[S?.activeParcel??0];
    window.AEDIS.corpuri.forEach((corp,i)=>{
      const P=_rvBuildParamsForCorp(S,ap,corp,i);
      buildings.push({
        id:'C'+(i+1),
        label:'Corp '+String.fromCharCode(65+i)+' · '+(corp.tip||corp.fn||corp.label||'Corp '+(i+1)),
        icon:'🏢',
        type:'corp',
        parcelIdx:S?.activeParcel??0,
        corpIdx:i,
        P, ap, corp,
        color:['#38bdf8','#34d399','#f59e0b','#a78bfa','#f87171','#fb923c'][i%6],
      });
    });
    return buildings.length?buildings:_rvGetAllBuildingsFallback();
  }

  // ── MULTI-FEAT: volume 3D multiple din _lastFeats ─────────────────────
  if(mode==='multi-feat'&&(S?.vol?._lastFeats?.length||0)>1){
    const ap=S?.parcels?.[S?.activeParcel??0];
    const P0=_RV?.parcelParams;
    S.vol._lastFeats.forEach((feat,i)=>{
      const featH=feat.properties?.top||feat.properties?.height||P0?.niv*P0?.hn||9;
      const P={...P0, niv:Math.max(1,Math.round(featH/(P0?.hn||3))), _featIdx:i};
      buildings.push({
        id:'V'+(i+1), label:'Volum '+(i+1)+' · h='+(featH).toFixed(1)+'m',
        icon:'📦', type:'feat',
        parcelIdx:S?.activeParcel??0, corpIdx:0,
        P, ap, feat,
        color:['#38bdf8','#34d399','#f59e0b','#a78bfa'][i%4],
      });
    });
    return buildings.length?buildings:_rvGetAllBuildingsFallback();
  }

  // ── SINGLE: o clădire, o parcelă (cazul default) ─────────────────────
  return _rvGetAllBuildingsFallback();
}

function _rvGetAllBuildingsFallback(){
  const P=_RV?.parcelParams;
  const ap=window.S?.parcels?.[window.S?.activeParcel??0];
  if(!P) return [];
  return [{
    id:'B1',
    label:(P.nrCad||P.utr||'Clădire')+' · P+'+(P.niv-1)+'E',
    icon:'🏠', type:'single',
    parcelIdx:window.S?.activeParcel??0, corpIdx:0,
    P, ap,
    color:'#D4AF37',
    isActive:true,
  }];
}

// ── Construim P pentru o parcelă specifică ────────────────────────────────
function _rvBuildParamsForParcel(S,parcelIdx,ap){
  if(!ap) ap=S?.parcels?.[parcelIdx];
  if(!ap?.geo?.geometry) return null;
  try{
    const areaRaw=ap.area||turf.area(ap.geo);
    const bbox=turf.bbox(ap.geo);
    const bboxW=turf.distance(
      {type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[1]]}},
      {type:'Feature',geometry:{type:'Point',coordinates:[bbox[2],bbox[1]]}},{units:'meters'});
    const bboxD=turf.distance(
      {type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[1]]}},
      {type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[3]]}},{units:'meters'});
    const reg=(typeof REGULI!=='undefined'&&REGULI[ap.utr||'CB7'])||{};
    const params=ap.params||{};
    return {
      nrCad:ap.nrCad||ap.id||'—', utr:ap.utr||'CB7',
      fn:S?.vol?.fn||ap.fn||'rezidential_colectiv',
      W:Math.round(bboxW*10)/10, D:Math.round(bboxD*10)/10,
      area:Math.round(areaRaw),
      rf:params.rf??reg.rf??0, rl:params.rl??reg.rl??3, rs:params.rs??reg.rs??6,
      pot:(params.pot??reg.pot??70)/100, cut:params.cut??reg.cut??2.0,
      hn:3.0, hMax:params.h||reg.h||28,
      niv:Math.max(1,Math.min(25,params.niv||reg.niv||Math.floor((params.h||reg.h||28)/3))),
      frontDir:S?.vol?.frontDir||ap.frontDir||'N',
      lat:turf.centerOfMass(ap.geo).geometry.coordinates[1],
      lon:turf.centerOfMass(ap.geo).geometry.coordinates[0],
    };
  }catch(e){return null;}
}

// ── Construim P pentru un corp AEDIS specific ──────────────────────────────
function _rvBuildParamsForCorp(S,ap,corp,corpIdx){
  const base=_RV?.parcelParams||_rvBuildParamsForParcel(S,S?.activeParcel??0,ap)||{};
  return {
    ...base,
    nrCad:(base.nrCad||'—')+'/C'+(corpIdx+1),
    fn:corp.fn||corp.tip||base.fn,
    niv:Math.max(1,corp.niv||base.niv||3),
    hn:corp.hNiv||base.hn||3.0,
    hMax:(corp.niv||3)*(corp.hNiv||3),
    _corpIdx:corpIdx,
    _corpLabel:'Corp '+String.fromCharCode(65+corpIdx),
    // Dacă corpul are poziție proprie (offset față de parcelă)
    ...(corp.offsetX!=null?{_offsetX:corp.offsetX}:{}),
    ...(corp.offsetY!=null?{_offsetY:corp.offsetY}:{}),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SETARE CLĂDIRE ACTIVĂ — comută _RV la clădirea selectată
// ═══════════════════════════════════════════════════════════════════════════
function _rvSetActiveBuilding(buildingDef){
  // Salvăm starea precedentă
  if(!window._rvBuildingSavedState){
    window._rvBuildingSavedState={
      P:_RV.parcelParams, b:_RV.building, floors:_RV.floors,
      fn:_RV.fn, floor:_RV.floor,
    };
  }
  // Setăm noua parcelă
  _RV.parcelParams=buildingDef.P;
  _RV.fn=buildingDef.P?.fn||_RV.fn;

  // Recalculăm building pentru noul P
  try{
    if(typeof _rvCompBuilding==='function'){
      const newB=_rvCompBuilding(buildingDef.P);
      if(newB){
        _RV.building=newB;
        _RV.floors=[];
        if(typeof _rvFloor==='function'){
          for(let i=0;i<newB.niv;i++) _RV.floors.push(_rvFloor(newB,i));
        }
      }
    }
  }catch(e){
    console.warn('[MultiBuilding] Eroare la generarea clădirii:',e.message);
  }

  // Re-render dacă există funcție
  if(typeof _rvRender==='function') setTimeout(()=>_rvRender(),100);

  if(typeof ss==='function')
    ss('✅ Activ: '+buildingDef.label+' · '+buildingDef.P?.niv+'niv · '+buildingDef.P?.nrCad);
}

function _rvRestoreOriginalBuilding(){
  if(!window._rvBuildingSavedState) return;
  const s=window._rvBuildingSavedState;
  _RV.parcelParams=s.P; _RV.building=s.b; _RV.floors=s.floors;
  _RV.fn=s.fn; _RV.floor=s.floor;
  delete window._rvBuildingSavedState;
  if(typeof _rvRender==='function') _rvRender();
}

// ═══════════════════════════════════════════════════════════════════════════
// UI SELECTOR — tab-uri cu toate clădirile detectate
// ═══════════════════════════════════════════════════════════════════════════
function _injectMultiBuildingUI(){
  // Ștergem selectorul vechi
  document.getElementById('rv-multi-selector')?.remove();
  document.getElementById('rv-multi-actions')?.remove();

  const buildings=_rvGetAllBuildings();
  const mode=_rvDetectBuildingMode();

  // Dacă e single, nu afișăm selectorul
  if(mode==='single'||buildings.length<=1){
    _injectMultiBuildingButtons(false);
    return;
  }

  // Injectăm selectorul deasupra panoului de relevee
  const panel=document.getElementById('rv-sec-relevee')||
               document.querySelector('.rv-rsec')||
               document.querySelector('#rv-panel');
  if(!panel) return;

  // ── Selector tab-uri ─────────────────────────────────────────────────
  const sel=document.createElement('div');
  sel.id='rv-multi-selector';
  sel.style.cssText=[
    'padding:8px 12px 0',
    'background:rgba(15,22,48,.95)',
    'border-bottom:1px solid rgba(212,175,55,.2)',
    'display:flex','align-items:center','gap:6px',
    'flex-wrap:wrap','font-family:inherit',
  ].join(';');

  // Label stânga
  const lbl=document.createElement('span');
  lbl.style.cssText='font-size:9.5px;font-weight:700;color:#94a3b8;margin-right:4px;white-space:nowrap;';
  lbl.innerHTML=(mode==='multi-parcel'?'📐 '+buildings.length+' PARCELE':
                 mode==='multi-corp'?'🏢 '+buildings.length+' CORPURI':
                 '📦 '+buildings.length+' VOLUME')+':';
  sel.appendChild(lbl);

  // Tab per clădire
  buildings.forEach((bld,i)=>{
    const tab=document.createElement('button');
    tab.id='rv-multi-tab-'+bld.id;
    tab.dataset.bldId=bld.id;
    tab.innerHTML=bld.icon+' '+bld.label;
    tab.style.cssText=[
      'height:28px','padding:0 10px','border-radius:5px','cursor:pointer',
      'font-family:inherit','font-size:9.5px','font-weight:700',
      'border:1.5px solid '+bld.color+'44',
      'color:'+bld.color,
      'background:'+bld.color+'18',
      'white-space:nowrap','flex-shrink:0','transition:all .15s',
    ].join(';');
    tab.onmouseover=()=>{tab.style.opacity='.8';tab.style.borderColor=bld.color;};
    tab.onmouseout=()=>{
      tab.style.opacity='1';
      tab.style.borderColor=(_rvActiveBuildingId===bld.id)?bld.color:bld.color+'44';
    };
    tab.onclick=()=>{
      _rvActiveBuildingId=bld.id;
      _rvSetActiveBuilding(bld);
      // Update tab styles
      buildings.forEach(b2=>{
        const t2=document.getElementById('rv-multi-tab-'+b2.id);
        if(t2){
          t2.style.background=b2.id===bld.id?bld.color+'38':b2.color+'18';
          t2.style.borderColor=b2.id===bld.id?bld.color:b2.color+'44';
        }
      });
    };
    if(i===0){
      tab.style.background=bld.color+'38';
      tab.style.borderColor=bld.color;
      if(!_rvActiveBuildingId) _rvActiveBuildingId=bld.id;
    }
    sel.appendChild(tab);
  });

  // Buton restore
  const restBtn=document.createElement('button');
  restBtn.innerHTML='↩ Original';
  restBtn.style.cssText='height:28px;padding:0 8px;border-radius:5px;cursor:pointer;'+
    'font-family:inherit;font-size:9px;font-weight:700;'+
    'border:1px solid rgba(148,163,184,.3);color:#94a3b8;background:rgba(148,163,184,.1);'+
    'white-space:nowrap;flex-shrink:0;margin-left:4px;';
  restBtn.onclick=()=>{
    _rvActiveBuildingId=null;
    _rvRestoreOriginalBuilding();
    buildings.forEach(b2=>{
      const t2=document.getElementById('rv-multi-tab-'+b2.id);
      if(t2){t2.style.background=b2.color+'18';t2.style.borderColor=b2.color+'44';}
    });
  };
  sel.appendChild(restBtn);

  panel.insertBefore(sel, panel.firstChild);

  // Injectăm butoanele de acțiuni batch
  _injectMultiBuildingButtons(true);
}

let _rvActiveBuildingId=null;

// ── Butoane batch deasupra exporturilor ────────────────────────────────────
function _injectMultiBuildingButtons(hasMulti){
  document.getElementById('rv-multi-actions')?.remove();
  if(!hasMulti) return;
  const anchor=document.querySelector('#rv-extras-wrap')||
               document.querySelector('#ctx3d-btn-wrap')||
               document.querySelector('.rv-expbtn');
  if(!anchor) return;

  const wrap=document.createElement('span'); wrap.id='rv-multi-actions';
  [
    {id:'rv-batch-btn', icon:'⚡', label:'Export Toate',   fn:'_rvExportBatch',
     bg:'rgba(212,175,55,.18)', border:'rgba(212,175,55,.6)', color:'#D4AF37'},
    {id:'rv-siteall-btn',icon:'🗺', label:'Plan Situație',  fn:'_rvExportSitePlanAll',
     bg:'rgba(14,165,233,.15)', border:'rgba(14,165,233,.5)', color:'#38bdf8'},
    {id:'rv-sumall-btn', icon:'📊', label:'Sumar Proiect',  fn:'_rvExportSummaryAll',
     bg:'rgba(168,85,247,.15)', border:'rgba(168,85,247,.5)', color:'#c084fc'},
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
  anchor.parentElement.insertBefore(wrap, anchor.nextSibling);
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT BATCH — generează toate releveele pentru toate clădirile
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportBatch(){
  const buildings=_rvGetAllBuildings();
  if(buildings.length<=1){
    if(typeof _rvExportComplet==='function') return _rvExportComplet();
    alert('Un singur corp detectat — folosiți Export Complet.');
    return;
  }
  const btn=document.getElementById('rv-batch-btn');
  if(btn){btn.innerHTML='⏳ Export batch…';btn.style.opacity='.6';}
  if(typeof ss==='function') ss('⚡ Export batch: '+buildings.length+' clădiri…');

  // Salvăm starea originală
  const saved={P:_RV.parcelParams,b:_RV.building,floors:[..._RV.floors],fn:_RV.fn};

  let done=0;
  for(const bld of buildings){
    if(typeof ss==='function') ss('⚡ ('+(done+1)+'/'+buildings.length+') '+bld.icon+' '+bld.label+'…');
    // Setăm clădirea activă
    _rvSetActiveBuilding(bld);
    await new Promise(r=>setTimeout(r,400)); // așteptăm recalculul

    // Generăm exporturile principale pentru această clădire
    const exports=[
      '_rvExportPlanseWalls',  // Plan parter + etaj tip cu pereți reali
      '_rvExportAcoperis',     // Plan acoperiș
      '_rvExportFatadeAEDIS',  // Fațade diferențiate
      '_rvExportTablouMateriale', // Tablou materiale
      '_rvExportTabelSuprafete',  // Tabel suprafețe
    ];
    for(const fn of exports){
      if(typeof window[fn]==='function'){
        try{ await window[fn](); await new Promise(r=>setTimeout(r,900)); }
        catch(e){ console.warn('[Batch] Eroare '+fn+':',e.message); }
      }
    }
    // Subsol dacă e necesar
    if(typeof _calcSubsolNeeded==='function'){
      const sub=_calcSubsolNeeded(_RV.building,_RV.parcelParams);
      if(sub.needsBasement&&typeof _rvExportSubsol==='function'){
        try{ await _rvExportSubsol(); await new Promise(r=>setTimeout(r,900)); }
        catch(e){}
      }
    }
    done++;
    if(typeof ss==='function') ss('⚡ ✅ '+bld.label+' exportat ('+done+'/'+buildings.length+')');
  }

  // Restaurăm starea originală
  _RV.parcelParams=saved.P; _RV.building=saved.b;
  _RV.floors=saved.floors; _RV.fn=saved.fn;
  if(typeof _rvRender==='function') _rvRender();

  if(btn){btn.innerHTML='⚡ Export Toate';btn.style.opacity='1';}
  if(typeof ss==='function') ss('✅ Export batch complet: '+done+' clădiri × set relevee complet');
}

// ═══════════════════════════════════════════════════════════════════════════
// PLAN DE SITUAȚIE COMBINAT — toate parcelele + clădirile
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportSitePlanAll(){
  const buildings=_rvGetAllBuildings();
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
  if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  if(typeof ss==='function') ss('⏳ Generez Plan de Situație combinat…');

  const W=420,H=297;
  const pdf=new _jsPDF({orientation:'landscape',unit:'mm',format:'a3'});
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  const C={dark2:[15,25,50],gold:[180,140,30]};

  pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');

  // Header
  pdf.setFillColor(...C.dark2);pdf.rect(0,0,W,9,'F');
  pdf.setFillColor(...C.gold);pdf.rect(0,8.5,W,.7,'F');
  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(9);
  pdf.text('PLAN DE SITUAȚIE — PROIECT COMPLEX · '
    +buildings.length+' CLĂDIRI · '
    +(window.S?.parcels?.length||1)+' PARCELE',W/2,6,{align:'center'});

  // Calculăm bounding box global al tuturor parcelelor
  let minLon=180,maxLon=-180,minLat=90,maxLat=-90;
  buildings.forEach(bld=>{
    if(bld.P?.lon) {minLon=Math.min(minLon,bld.P.lon);maxLon=Math.max(maxLon,bld.P.lon);}
    if(bld.P?.lat) {minLat=Math.min(minLat,bld.P.lat);maxLat=Math.max(maxLat,bld.P.lat);}
  });

  // Fallback dacă nu avem coordonate multiple
  if(maxLon-minLon<0.0001) {
    minLon-=0.001; maxLon+=0.001; minLat-=0.001; maxLat+=0.001;
  }

  const PAD=20, drawW=W-PAD*3-60, drawH=H-30;
  const cosLat=Math.cos((minLat+maxLat)/2*Math.PI/180);
  const scX=drawW/((maxLon-minLon)*111319.9*cosLat);
  const scY=drawH/((maxLat-minLat)*111319.9);
  const scGlobal=Math.min(scX,scY);
  const ox=PAD, oy=12;

  // Funcție conversie coordonate
  const toXY=(lon,lat)=>[
    ox+(lon-minLon)*111319.9*cosLat*scGlobal,
    oy+drawH-(lat-minLat)*111319.9*scGlobal
  ];

  // Fond plan
  pdf.setFillColor(235,242,228);
  pdf.rect(ox,oy,drawW,drawH,'F');

  // Grid de referință
  pdf.setDrawColor(210,218,230);pdf.setLineWidth(0.1);pdf.setLineDashPattern([2,3],0);
  for(let gx=ox;gx<ox+drawW;gx+=20)pdf.line(gx,oy,gx,oy+drawH);
  for(let gy=oy;gy<oy+drawH;gy+=20)pdf.line(ox,gy,ox+drawW,gy);
  pdf.setLineDashPattern([],0);

  // Stradă generică la baza planului
  pdf.setFillColor(205,210,225);
  pdf.rect(ox,oy+drawH-6,drawW,6,'F');
  pdf.setTextColor(80,90,115);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
  pdf.text('STRADĂ',ox+drawW/2,oy+drawH-1.5,{align:'center'});

  // Desenăm fiecare clădire
  buildings.forEach((bld,i)=>{
    const P=bld.P;
    if(!P) return;
    const col=[[25,100,200],[15,130,65],[180,130,20],[120,30,180],[180,40,40],[30,130,150]][i%6];

    const [bx,by]=toXY(P.lon,P.lat);
    const halfW=(P.W||20)*scGlobal/2, halfD=(P.D||15)*scGlobal/2;

    // Parcelă
    pdf.setFillColor(...col.map(c=>Math.round(c*.1+235)));
    pdf.setDrawColor(...col);pdf.setLineWidth(0.5);
    pdf.setLineDashPattern([3,2],0);
    pdf.rect(bx-halfW-P.rl*scGlobal, by-halfD-P.rf*scGlobal,
             (P.W||20)*scGlobal, (P.D||15)*scGlobal,'FD');
    pdf.setLineDashPattern([],0);

    // Footprint clădire
    const b2=_RV.building||{bW:P.W*.7,bD:P.D*.65};
    const bfW=(b2.bW||P.W*.7)*scGlobal, bfD=(b2.bD||P.D*.65)*scGlobal;
    pdf.setFillColor(...col.map(c=>Math.round(c*.35+165)));
    pdf.setDrawColor(...col);pdf.setLineWidth(0.6);
    pdf.rect(bx-bfW/2, by-bfD/2, bfW, bfD,'FD');

    // Hașuri pe clădire
    pdf.setDrawColor(...col);pdf.setLineWidth(0.15);
    for(let hx=0;hx<bfW;hx+=3)
      pdf.line(bx-bfW/2+hx,by-bfD/2,bx-bfW/2+hx+3,by-bfD/2+3);

    // Badge cu ID clădire
    const badgeR=Math.max(4,Math.min(8,bfW*.35));
    pdf.setFillColor(...col);
    try{pdf.circle(bx,by,badgeR,'F');}catch(e){pdf.rect(bx-badgeR,by-badgeR,badgeR*2,badgeR*2,'F');}
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(Math.min(7,badgeR*1.1));
    pdf.text(S2(bld.id),bx,by+2,{align:'center'});

    // Label sub clădire
    pdf.setTextColor(...col);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text(S2(bld.label),bx,by+bfD/2+5,{align:'center'});
    pdf.setFont('helvetica','normal');pdf.setFontSize(4.8);pdf.setTextColor(70,85,110);
    pdf.text(S2('H='+(P.niv*P.hn).toFixed(1)+'m · '+P.niv+'niv.'),bx,by+bfD/2+9.5,{align:'center'});

    // Cote (dacă e suficient spațiu)
    if(bfW>12){
      pdf.setDrawColor(...col);pdf.setLineWidth(0.2);
      pdf.line(bx-bfW/2,by+bfD/2+12,bx+bfW/2,by+bfD/2+12);
      pdf.line(bx-bfW/2,by+bfD/2+10,bx-bfW/2,by+bfD/2+14);
      pdf.line(bx+bfW/2,by+bfD/2+10,bx+bfW/2,by+bfD/2+14);
      pdf.setFontSize(4);pdf.setTextColor(...col);
      pdf.text(S2((P.W||20).toFixed(1)+'m'),bx,by+bfD/2+16,{align:'center'});
    }
  });

  // Nord
  const nX=ox+drawW-12, nY=oy+14;
  pdf.setFillColor(255,255,255);pdf.setDrawColor(120,130,145);pdf.setLineWidth(0.4);
  try{pdf.circle(nX,nY,8,'FD');}catch(e){}
  pdf.setFillColor(190,30,30);
  try{pdf.triangle(nX,nY,nX-3.5,nY+5,nX+3.5,nY+5,'F');}catch(e){}
  pdf.setFillColor(170,178,192);
  try{pdf.triangle(nX,nY,nX-3.5,nY-5,nX+3.5,nY-5,'F');}catch(e){}
  pdf.setTextColor(190,30,30);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
  pdf.text('N',nX,nY-8.5,{align:'center'});

  // Legendă dreapta
  const legX=ox+drawW+5, legY=oy+2;
  pdf.setFillColor(248,250,255);pdf.setDrawColor(185,200,220);pdf.setLineWidth(0.2);
  pdf.rect(legX,legY,52,H-legY-5,'FD');
  pdf.setTextColor(20,35,80);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
  pdf.text('LEGENDĂ',legX+26,legY+6,{align:'center'});
  pdf.setDrawColor(180,190,210);pdf.setLineWidth(0.15);
  pdf.line(legX+3,legY+8,legX+49,legY+8);

  const mode=_rvDetectBuildingMode();
  pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.setTextColor(50,70,110);
  pdf.text('Mod: '+(mode==='multi-parcel'?'Multi-Parcelă':mode==='multi-corp'?'Multi-Corp':'Single'),legX+3,legY+14);
  pdf.text('Clădiri: '+buildings.length,legX+3,legY+20);

  let ly2=legY+28;
  buildings.forEach((bld,i)=>{
    if(ly2>H-12) return;
    const col=[[25,100,200],[15,130,65],[180,130,20],[120,30,180],[180,40,40],[30,130,150]][i%6];
    pdf.setFillColor(...col);
    try{pdf.circle(legX+6,ly2,3.5,'F');}catch(e){pdf.rect(legX+3,ly2-3,7,7,'F');}
    pdf.setTextColor(...col);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text(S2(bld.id),legX+6,ly2+2,{align:'center'});
    pdf.setTextColor(30,45,80);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
    const lbl=S2(bld.label).slice(0,28);
    pdf.text(lbl,legX+12,ly2-0.5);
    pdf.setTextColor(90,105,125);
    pdf.text(S2('H='+(bld.P?.niv*bld.P?.hn).toFixed(1)+'m · SDA~'+(bld.P?Math.round(bld.P.W*.7*bld.P.D*.65*bld.P.niv):'?')+'m²'),legX+12,ly2+4.5);
    ly2+=13;
  });

  // Total
  const totalSDA=buildings.reduce((s,b2)=>s+(b2.P?Math.round((b2.P.W||0)*.7*(b2.P.D||0)*.65*b2.P.niv):0),0);
  if(ly2<H-20){
    pdf.setDrawColor(180,190,215);pdf.setLineWidth(0.15);pdf.line(legX+3,ly2,legX+49,ly2);ly2+=4;
    pdf.setTextColor(15,30,75);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text('SDA total: ~'+totalSDA+'m²',legX+3,ly2);
    pdf.text('Investiție: ~'+Math.round(totalSDA*1.2/1000)+'k€',legX+3,ly2+6);
  }

  // Footer
  pdf.setFillColor(243,245,250);pdf.rect(0,H-5.5,W,5.5,'F');
  pdf.setTextColor(110,125,145);pdf.setFont('helvetica','italic');pdf.setFontSize(4.5);
  pdf.text(S2('UrbanX TSS·FG · Plan situație combinat · '+buildings.length+' clădiri · Document orientativ'),W/2,H-1.5,{align:'center'});

  const nrCads=buildings.map(b2=>S2(b2.P?.nrCad||b2.id)).join('+');
  const fn2=('plan_situatie_'+nrCads+'.pdf').replace(/[^a-zA-Z0-9._+-]/g,'_').slice(0,80);
  pdf.save(fn2);
  if(typeof ss==='function') ss('✅ Plan Situație combinat: '+fn2+' · '+buildings.length+' clădiri');
}

// ═══════════════════════════════════════════════════════════════════════════
// SUMAR COMPARATIV — toate clădirile într-un tabel PDF
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportSummaryAll(){
  const buildings=_rvGetAllBuildings();
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
  if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  if(typeof ss==='function') ss('⏳ Generez Sumar Proiect…');

  const pdf=new _jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const PW=210,PH=297;
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  const RN=(n,d)=>isNaN(n)?'—':d?Number(n).toFixed(d):Math.round(n)+'';

  // Header
  pdf.setFillColor(15,25,50);pdf.rect(0,0,PW,16,'F');
  pdf.setFillColor(180,140,30);pdf.rect(0,15.5,PW,.8,'F');
  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(13);
  pdf.text('SUMAR PROIECT COMPLEX',PW/2,10,{align:'center'});
  pdf.setFont('helvetica','normal');pdf.setFontSize(7);pdf.setTextColor(200,210,230);
  pdf.text(S2(buildings.length+' clădiri · '+(window.S?.parcels?.length||1)+' parcele · UrbanX TSS·FG'),PW/2,14.5,{align:'center'});

  let y=22;

  // Tabel comparativ
  const cols=[{t:'ID',w:12},{t:'Clădire / Corp',w:52},{t:'Parcela',w:22},
    {t:'H (m)',w:16},{t:'Niv.',w:12},{t:'SDA (m²)',w:22},{t:'Investiție',w:22},{t:'Parcaje',w:20}];
  pdf.setFillColor(238,242,250);pdf.rect(10,y,190,7,'F');
  let cx=10;
  cols.forEach(c=>{
    pdf.setDrawColor(180,195,220);pdf.setLineWidth(0.12);pdf.rect(cx,y,c.w,7,'S');
    pdf.setTextColor(35,50,90);pdf.setFont('helvetica','bold');pdf.setFontSize(6.2);
    pdf.text(S2(c.t),cx+c.w/2,y+4.8,{align:'center'});cx+=c.w;
  });
  y+=7;

  let totalSDA=0, totalInvest=0, totalParcaje=0;

  buildings.forEach((bld,ri)=>{
    if(y>PH-35){pdf.addPage();y=15;}
    const P=bld.P;
    if(!P){y+=6;return;}
    const sda=Math.round((P.W||0)*.7*(P.D||0)*.65*(P.niv||3));
    const invest=Math.round(sda*1.2/1000);
    const parc=Math.ceil(sda/70*1.1);
    totalSDA+=sda; totalInvest+=invest; totalParcaje+=parc;

    pdf.setFillColor(ri%2===0?252:248,ri%2===0?252:250,255);
    pdf.rect(10,y,190,6.5,'F');
    let cx2=10;
    const vals=[bld.id,bld.label,S2(P.nrCad||P.utr||'—'),
      RN(P.niv*P.hn,1),String(P.niv),RN(sda,0)+'m²','~'+invest+'k€',parc+' loc.'];
    cols.forEach((c,ci)=>{
      pdf.setDrawColor(210,218,232);pdf.setLineWidth(0.1);pdf.rect(cx2,y,c.w,6.5,'S');
      pdf.setFont('helvetica',ci<=1?'bold':'normal');pdf.setFontSize(5.8);
      pdf.setTextColor(ci===0?bld.color?.[0]||20:20,ci===0?bld.color?.[1]||35:40,ci===0?bld.color?.[2]||80:80);
      pdf.text(S2(vals[ci]),cx2+2,y+4.5);
      cx2+=c.w;
    });
    y+=6.5;
  });

  // Total
  y+=4;
  if(y>PH-25){pdf.addPage();y=15;}
  pdf.setFillColor(15,25,50);pdf.rect(10,y,190,12,'F');
  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(8);
  pdf.text('TOTAL PROIECT',14,y+5);
  pdf.setFont('helvetica','normal');pdf.setFontSize(7);pdf.setTextColor(220,230,248);
  pdf.text('SDA totală: '+totalSDA+'m²',14,y+10);
  pdf.text('Investiție: ~'+totalInvest+'k€',75,y+10);
  pdf.text('Parcaje: '+totalParcaje+' loc.',145,y+10);
  y+=16;

  // Note tehnice
  if(y>PH-40){pdf.addPage();y=15;}
  y+=5;
  pdf.setFont('helvetica','bold');pdf.setFontSize(8);pdf.setTextColor(15,25,60);
  pdf.text('NOTE TEHNICE PROIECT COMPLEX',14,y);y+=7;

  const notes=[
    'Planșele individuale per clădire se generează din selectorul de clădiri (tab-uri în panoul Relevee).',
    'Plan de Situație combinat: toate parcelele + amprente clădiri + retrageri → exportat separat.',
    'Fiecare clădire are set complet: planuri etaje, fațade, acoperiș, subsol (dacă necesar), memoriu tehnic.',
    'Tabloul de materiale este per clădire; pentru proiect complet folosiți Export Batch.',
    'IFC-lite exportă fiecare clădire separat — importați toate în FreeCAD/ArchiCAD ca fișiere separate.',
    'DNA Urban analizează fiecare clădire individual față de normativele parcelei respective.',
  ];
  notes.forEach(n=>{
    if(y>PH-15){pdf.addPage();y=15;}
    pdf.setFillColor(248,250,255);pdf.rect(10,y-3.5,190,7,'F');
    pdf.setTextColor(40,60,100);pdf.setFont('helvetica','normal');pdf.setFontSize(6.5);
    pdf.text(S2('▸ '+n),14,y+0.5,{maxWidth:182});
    y+=7.5;
  });

  pdf.setFont('helvetica','italic');pdf.setFontSize(5.5);pdf.setTextColor(130,140,155);
  pdf.text(S2('UrbanX TSS·FG · Sumar proiect orientativ · SDA calculate estimativ la 0.7×0.65×niv din bbox parcelă'),PW/2,PH-5,{align:'center'});

  const fn3=('sumar_proiect_'+buildings.length+'cladiri_'+new Date().toISOString().slice(0,10)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn3);
  if(typeof ss==='function') ss('✅ Sumar Proiect: '+fn3+' · '+buildings.length+' clădiri · SDA total '+totalSDA+'m²');
}

console.log('[MultiBuilding] ✅ Sistem legătură multi-corp/multi-parcelă activ');
