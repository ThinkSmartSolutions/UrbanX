// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-multibuilding.js — Selector Multi-Corp / Multi-Parcelă
// UrbanX TSS·FG
//
// Scenarii gestionate:
//   1. O parcelă, un singur volum → funcționează deja implicit
//   2. O parcelă, MULTIPLE VOLUME (AEDIS "Multiple Volume")
//      → S.vol._lastFeats[] cu N corpi, fiecare cu geometry + properties.top
//      → Selectăm corpul → generăm planșe pentru el
//   3. Multiselect → S.parcels[] cu N parcele separate
//      → Selectăm parcela → generăm planșe pentru ea
//
// IMPORTANT: Nu generăm înălțimi noi.
// Citim EXCLUSIV ce a setat userul în AEDIS:
//   - feat.properties.top = înălțimea corpului
//   - feat.geometry = footprint-ul corpului (dimensiunile reale)
//   - AEDIS.corpuri[i].niv / .hNiv = nr. niveluri / H/nivel
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';
  function waitReady(cb,n){
    n=n||0; if(n>120) return;
    if(typeof _rvExportPDF==='undefined'||typeof _RV==='undefined')
      { setTimeout(()=>waitReady(cb,n+1),300); return; }
    cb();
  }
  waitReady(()=>{
    _injectMultiBuildingUI();
    const obs = new MutationObserver(()=>{
      if(document.querySelector('.rv-expbtn') && !document.getElementById('rv-multi-selector'))
        _injectMultiBuildingUI();
    });
    obs.observe(document.body, {childList:true, subtree:true});
    setInterval(_rvCheckMultiMode, 3000);
    console.log('[MultiBuilding] ✅ loaded');
  });
})();

// ═══════════════════════════════════════════════════════════════════════════
// DETECȚIE MOD ACTIV
// ═══════════════════════════════════════════════════════════════════════════
function _rvDetectBuildingMode(){
  const S = window.S;
  const nFeats  = (S?.vol?._lastFeats?.length) || 0;
  const nCorps  = (window.AEDIS?.corpuri?.length) || 0;
  const nParc   = (S?.parcels?.length) || 0;
  if(nParc > 1 && S?.multiMode)  return 'multi-parcel';
  if(nFeats > 1)                  return 'multi-feat';   // Multiple Volume pe o parcelă
  if(nCorps > 1)                  return 'multi-corp';   // AEDIS.corpuri explicit
  return 'single';
}

let _lastMode = 'single', _lastCount = 1;
function _rvCheckMultiMode(){
  const mode  = _rvDetectBuildingMode();
  const count = _rvGetAllBuildings().length;
  if(mode !== _lastMode || count !== _lastCount){
    _lastMode = mode; _lastCount = count;
    _injectMultiBuildingUI();
    if(mode !== 'single' && typeof ss === 'function')
      ss('📐 '+count+' corpi/parcele detectate · mod "'+mode+'" · selector activat');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// INVENTAR CORPI / PARCELE — citim EXCLUSIV date existente din AEDIS
// ═══════════════════════════════════════════════════════════════════════════
function _rvGetAllBuildings(){
  const S   = window.S;
  const mode = _rvDetectBuildingMode();

  // ── MULTI-PARCELĂ ─────────────────────────────────────────────────────
  if(mode === 'multi-parcel' && S?.multiMode && S?.parcels?.length > 1){
    return S.parcels.map((ap, i) => {
      const P = _rvBuildParamsForParcel(S, i, ap);
      if(!P) return null;
      return {
        id: 'P'+(i+1),
        label: 'Parcelă '+(i+1)+' · '+(ap.nrcad||ap.id||'—'),
        icon: '🗂', type: 'parcel',
        parcelIdx: i, featIdx: null,
        P, ap,
        color: ['#38bdf8','#34d399','#f59e0b','#a78bfa','#f87171','#fb923c'][i%6],
      };
    }).filter(Boolean);
  }

  // ── MULTIPLE VOLUME pe o parcelă → citim _lastFeats ───────────────────
  if(mode === 'multi-feat'){
    const feats = S?.vol?._lastFeats || [];
    const ap    = S?.parcels?.[S?.activeParcel ?? 0];
    const P0    = _RV?.parcelParams;
    if(!P0 || !feats.length) return _fallback();
    const hn    = P0.hn || 3.0;

    return feats.map((feat, i) => {
      // Înălțimea REALĂ setată de user pentru acest corp
      const h   = feat.properties?.top || feat.properties?.height || (P0.niv * hn);
      const niv = Math.max(1, Math.round(h / hn));

      // Dimensiunile corpului din footprint-ul geometric real
      let bW = P0.W * (P0.pot || 0.7) * 0.9;
      let bD = P0.D * 0.65;
      if(feat.geometry?.coordinates?.[0]?.length >= 4){
        try{
          const ring  = feat.geometry.coordinates[0];
          const lons  = ring.map(c=>c[0]);
          const lats  = ring.map(c=>c[1]);
          const cos   = Math.cos((lats[0]||P0.lat||45)*Math.PI/180);
          const dW    = (Math.max(...lons)-Math.min(...lons))*111319.9*cos;
          const dD    = (Math.max(...lats)-Math.min(...lats))*111319.9;
          if(dW > 2) bW = Math.round(dW*10)/10;
          if(dD > 2) bD = Math.round(dD*10)/10;
        }catch(e){}
      }

      const fn = feat.properties?.fn || feat.properties?.tip || P0.fn;
      const P  = {
        ...P0,
        nrCad: (P0.nrCad||'—')+' · Corp '+(i+1),
        fn,
        niv,
        hn,
        hMax: h,
        aedisH: h,
        _bW: bW,
        _bD: bD,
        _featIdx: i,
      };
      return {
        id: 'C'+(i+1),
        label: 'Corp '+(i+1)+' · h='+h.toFixed(1)+'m · '+niv+'niv.',
        icon: '🏢', type: 'feat',
        parcelIdx: S?.activeParcel ?? 0, featIdx: i,
        P, ap, feat,
        color: ['#38bdf8','#34d399','#f59e0b','#a78bfa','#f87171','#fb923c'][i%6],
      };
    });
  }

  // ── AEDIS.corpuri (fallback dacă nu avem _lastFeats) ─────────────────
  if(mode === 'multi-corp'){
    const corps = window.AEDIS?.corpuri || [];
    const ap    = S?.parcels?.[S?.activeParcel ?? 0];
    const P0    = _RV?.parcelParams;
    if(!P0 || !corps.length) return _fallback();

    return corps.map((corp, i) => {
      // Citim DIRECT valorile setate de user
      const niv = Math.max(1, corp.niv || P0.niv || 3);
      const hn  = corp.hNiv || P0.hn || 3.0;
      const h   = niv * hn;
      const fn  = corp.fn || corp.tip || P0.fn;
      const P   = {
        ...P0,
        nrCad: (P0.nrCad||'—')+'/C'+(i+1),
        fn, niv, hn, hMax: h, aedisH: h,
        _corpIdx: i,
        _bW: corp.bW || P0.W * 0.65,
        _bD: corp.bD || P0.D * 0.65,
      };
      return {
        id: 'C'+(i+1),
        label: 'Corp '+(i+1)+' · P+'+(niv-1)+'E · h='+h+'m',
        icon: '🏗', type: 'corp',
        parcelIdx: S?.activeParcel ?? 0, featIdx: null,
        P, ap, corp,
        color: ['#38bdf8','#34d399','#f59e0b','#a78bfa','#f87171','#fb923c'][i%6],
      };
    });
  }

  return _fallback();
}

function _fallback(){
  const P  = _RV?.parcelParams;
  const ap = window.S?.parcels?.[window.S?.activeParcel ?? 0];
  if(!P) return [];
  return [{
    id:'B1', label:(P.nrCad||P.utr||'Clădire')+' · P+'+(P.niv-1)+'E',
    icon:'🏠', type:'single', parcelIdx: window.S?.activeParcel ?? 0, featIdx: null,
    P, ap, color:'#D4AF37', isActive: true,
  }];
}

// ── Construim P pentru o parcelă din multiselect ──────────────────────────
function _rvBuildParamsForParcel(S, idx, ap){
  ap = ap || S?.parcels?.[idx];
  if(!ap?.geo?.geometry) return null;
  try{
    const areaRaw = ap.area || (typeof turf !== 'undefined' ? turf.area(ap.geo) : 0);
    const bbox    = typeof turf !== 'undefined' ? turf.bbox(ap.geo) : [0,0,0,0];
    const cos     = Math.cos(((bbox[1]+bbox[3])/2)*Math.PI/180);
    const bboxW   = (bbox[2]-bbox[0])*111319.9*cos;
    const bboxD   = (bbox[3]-bbox[1])*111319.9;
    const reg     = (typeof REGULI !== 'undefined' && REGULI[ap.utr||'CB7']) || {};
    const params  = ap.params || {};
    const hn      = 3.0;
    const h       = S?.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)
                    || params.h || reg.h || 12;
    const niv     = Math.max(1, Math.min(25, Math.round(h/hn)));
    return {
      nrCad: ap.nrcad || ap.id || '—',
      utr: ap.utr || 'CB7',
      fn: S?.vol?.fn || ap.fn || 'rezidential_colectiv',
      W: Math.round(bboxW*10)/10, D: Math.round(bboxD*10)/10,
      area: Math.round(areaRaw),
      rf: params.rf ?? reg.rf ?? 0,
      rl: params.rl ?? reg.rl ?? 3,
      rs: params.rs ?? reg.rs ?? 6,
      pot: (params.pot ?? reg.pot ?? 70) / 100,
      cut: params.cut ?? reg.cut ?? 2.0,
      niv, hn, hMax: params.h || reg.h || 28,
      frontDir: S?.vol?.frontDir || ap.frontDir || 'N',
      lat: ap.geo?.geometry?.coordinates?.[0]?.[0]?.[1] || 47.16,
      lon: ap.geo?.geometry?.coordinates?.[0]?.[0]?.[0] || 27.58,
      aedisH: h,
    };
  }catch(e){ return null; }
}

// ═══════════════════════════════════════════════════════════════════════════
// SETARE CORP ACTIV → actualizăm _RV cu datele EXACTE ale corpului selectat
// ═══════════════════════════════════════════════════════════════════════════
function _rvSetActiveBuilding(def){
  if(!window._rvBldSaved){
    window._rvBldSaved = {
      P: _RV.parcelParams,
      b: _RV.building,
      floors: [...(_RV.floors||[])],
      fn: _RV.fn,
    };
  }

  // Setăm parametrii noii parcele/corp
  _RV.parcelParams = def.P;
  _RV.fn = def.P?.fn || _RV.fn;

  // _rvCompBuilding citește _RV.parcelParams → reconstruiește building
  // Dar dimensiunile corpului vin din date AEDIS, NU recalculate
  try{
    if(typeof _rvCompBuilding === 'function'){
      const nb = _rvCompBuilding(def.P);
      if(nb){
        // Suprascriem cu dimensiunile reale ale corpului dacă le avem
        if(def.P._bW) nb.bW = def.P._bW;
        if(def.P._bD) nb.bD = def.P._bD;
        _RV.building = nb;
        _RV.floors = [];
        if(typeof _rvFloor === 'function')
          for(let i=0; i<nb.niv; i++) _RV.floors.push(_rvFloor(nb, i));
      }
    }
  }catch(e){ console.warn('[Multi] _rvCompBuilding eroare:', e.message); }

  if(typeof _rvRender === 'function') setTimeout(()=>_rvRender(), 100);
  if(typeof ss === 'function')
    ss('✅ Activ: '+def.label+' · '+def.P.niv+'niv · h='+(def.P.aedisH||'?')+'m');
}

function _rvRestoreBuilding(){
  if(!window._rvBldSaved) return;
  const s = window._rvBldSaved;
  _RV.parcelParams = s.P;
  _RV.building     = s.b;
  _RV.floors       = s.floors;
  _RV.fn           = s.fn;
  delete window._rvBldSaved;
  if(typeof _rvRender === 'function') _rvRender();
}

// ═══════════════════════════════════════════════════════════════════════════
// UI SELECTOR — apare DOAR când sunt mai multe corpi/parcele
// ═══════════════════════════════════════════════════════════════════════════
function _injectMultiBuildingUI(){
  document.getElementById('rv-multi-selector')?.remove();
  document.getElementById('rv-multi-actions')?.remove();

  const buildings = _rvGetAllBuildings();
  const mode      = _rvDetectBuildingMode();
  if(mode === 'single' || buildings.length <= 1){
    _injectBatchButtons(false);
    return;
  }

  const panel = document.getElementById('rv-sec-relevee')
              || document.querySelector('.rv-rsec')
              || document.querySelector('#rv-panel');
  if(!panel) return;

  // ── Tab-uri selector ────────────────────────────────────────────────────
  const sel = document.createElement('div');
  sel.id = 'rv-multi-selector';
  sel.style.cssText = 'padding:7px 10px 0;background:rgba(10,16,36,.97);'+
    'border-bottom:1px solid rgba(212,175,55,.2);display:flex;align-items:center;'+
    'gap:5px;flex-wrap:wrap;font-family:inherit;';

  const lbl = document.createElement('span');
  lbl.style.cssText = 'font-size:9px;font-weight:700;color:#94a3b8;margin-right:3px;white-space:nowrap;';
  lbl.textContent = (mode==='multi-parcel'?'📐 PARCELE':
                     mode==='multi-feat'?'🏢 CORPI AEDIS':'🏗 CORPURI')+' ('+buildings.length+'):';
  sel.appendChild(lbl);

  buildings.forEach((bld, i) => {
    const tab = document.createElement('button');
    tab.id = 'rv-mtab-'+bld.id;
    tab.innerHTML = bld.icon+' '+bld.label;
    tab.title = bld.label;
    tab.style.cssText = [
      'height:26px','padding:0 9px','border-radius:5px','cursor:pointer',
      'font-family:inherit','font-size:9.5px','font-weight:700',
      'border:1.5px solid '+bld.color+'44',
      'color:'+bld.color,
      'background:'+bld.color+'18',
      'white-space:nowrap','flex-shrink:0','transition:all .12s',
    ].join(';');
    tab.onmouseover = ()=>{ tab.style.opacity='.75'; tab.style.borderColor=bld.color; };
    tab.onmouseout  = ()=>{
      tab.style.opacity = '1';
      tab.style.borderColor = (_rvActiveBldId===bld.id) ? bld.color : bld.color+'44';
    };
    tab.onclick = ()=>{
      _rvActiveBldId = bld.id;
      _rvSetActiveBuilding(bld);
      // Actualizăm stiluri tab-uri
      buildings.forEach(b2 => {
        const t2 = document.getElementById('rv-mtab-'+b2.id);
        if(t2){
          t2.style.background    = b2.id===bld.id ? bld.color+'35' : b2.color+'18';
          t2.style.borderColor   = b2.id===bld.id ? bld.color       : b2.color+'44';
        }
      });
    };
    if(i===0){
      tab.style.background  = bld.color+'35';
      tab.style.borderColor = bld.color;
      if(!_rvActiveBldId) _rvActiveBldId = bld.id;
    }
    sel.appendChild(tab);
  });

  // Buton restore
  const rest = document.createElement('button');
  rest.innerHTML = '↩ Resetează';
  rest.style.cssText = 'height:26px;padding:0 8px;border-radius:5px;cursor:pointer;'+
    'font-family:inherit;font-size:9px;font-weight:700;margin-left:3px;'+
    'border:1px solid rgba(148,163,184,.3);color:#94a3b8;background:rgba(148,163,184,.08);white-space:nowrap;';
  rest.onclick = ()=>{
    _rvActiveBldId = null;
    _rvRestoreBuilding();
    buildings.forEach(b2=>{
      const t2=document.getElementById('rv-mtab-'+b2.id);
      if(t2){t2.style.background=b2.color+'18';t2.style.borderColor=b2.color+'44';}
    });
  };
  sel.appendChild(rest);

  panel.insertBefore(sel, panel.firstChild);
  _injectBatchButtons(true);
}

let _rvActiveBldId = null;

// ── Butoane batch ──────────────────────────────────────────────────────────
function _injectBatchButtons(show){
  document.getElementById('rv-multi-actions')?.remove();
  if(!show) return;
  const anchor = document.querySelector('#ctx3d-btn-wrap')
              || document.querySelector('#rv-extras-wrap')
              || document.querySelector('.rv-expbtn');
  if(!anchor) return;
  const wrap = document.createElement('span');
  wrap.id = 'rv-multi-actions';
  [
    {id:'rv-batch-btn',  icon:'⚡', label:'Export Toate',  fn:'_rvExportBatch',
     bg:'rgba(212,175,55,.15)',border:'rgba(212,175,55,.55)',color:'#D4AF37'},
    {id:'rv-siteall-btn',icon:'🗺', label:'Plan Situație', fn:'_rvExportSitePlanAll',
     bg:'rgba(14,165,233,.12)',border:'rgba(14,165,233,.45)',color:'#38bdf8'},
  ].forEach(b_=>{
    const btn=document.createElement('button');
    btn.id=b_.id; btn.innerHTML=b_.icon+' '+b_.label;
    btn.style.cssText=['height:30px','padding:0 9px','border-radius:6px','cursor:pointer',
      'font-family:inherit','font-size:9.5px','font-weight:800','margin-left:5px',
      `background:${b_.bg}`,`border:1.5px solid ${b_.border}`,`color:${b_.color}`,
      'display:inline-flex','align-items:center','flex-shrink:0'].join(';');
    btn.onmouseover=()=>btn.style.opacity='.72';
    btn.onmouseout =()=>btn.style.opacity='1';
    btn.onclick    =()=>window[b_.fn]?.();
    wrap.appendChild(btn);
  });
  anchor.parentElement.insertBefore(wrap, anchor.nextSibling);
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT BATCH — pentru fiecare corp generăm setul complet de planșe
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportBatch(){
  const buildings = _rvGetAllBuildings();
  if(buildings.length <= 1){
    if(typeof _rvExportComplet === 'function') return _rvExportComplet();
    return;
  }
  const btn = document.getElementById('rv-batch-btn');
  if(btn){ btn.innerHTML='⏳ Export batch…'; btn.style.opacity='.6'; }
  if(typeof ss==='function') ss('⚡ Export batch: '+buildings.length+' corpi/parcele…');

  // Salvăm starea originală
  const saved = { P:_RV.parcelParams, b:_RV.building, floors:[..._RV.floors], fn:_RV.fn };
  let done = 0;

  for(const bld of buildings){
    if(typeof ss==='function') ss('⚡ ('+(done+1)+'/'+buildings.length+') '+bld.icon+' '+bld.label+'…');
    _rvSetActiveBuilding(bld);
    await new Promise(r=>setTimeout(r,500));

    const exports = ['_rvExportPlanseWalls','_rvExportAcoperis','_rvExportFatadeAEDIS',
                     '_rvExportTabelSuprafete','_rvExportTablouMateriale'];
    for(const fn of exports){
      if(typeof window[fn]==='function'){
        try{ await window[fn](); await new Promise(r=>setTimeout(r,900)); }
        catch(e){ console.warn('[Batch]',fn,e.message); }
      }
    }
    done++;
  }

  // Restaurăm
  _RV.parcelParams=saved.P; _RV.building=saved.b;
  _RV.floors=saved.floors; _RV.fn=saved.fn;
  if(typeof _rvRender==='function') _rvRender();
  if(btn){ btn.innerHTML='⚡ Export Toate'; btn.style.opacity='1'; }
  if(typeof ss==='function') ss('✅ Export batch: '+done+' corpi · planșe generate');
}

// ═══════════════════════════════════════════════════════════════════════════
// PLAN SITUAȚIE — toate corpi/parcelele pe un singur A3
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportSitePlanAll(){
  const buildings = _rvGetAllBuildings();
  const _jsPDF = (typeof jsPDF !== 'undefined') ? jsPDF : window.jspdf?.jsPDF;
  if(!_jsPDF){ alert('jsPDF indisponibil.'); return; }
  if(typeof ss==='function') ss('⏳ Generez Plan Situație combinat…');

  const W=420, H=297;
  const pdf = new _jsPDF({orientation:'landscape',unit:'mm',format:'a3'});
  const S2  = s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();

  pdf.setFillColor(255,255,255); pdf.rect(0,0,W,H,'F');
  pdf.setFillColor(15,25,50);   pdf.rect(0,0,W,9,'F');
  pdf.setFillColor(180,140,30); pdf.rect(0,8.5,W,.7,'F');
  pdf.setTextColor(255,255,255); pdf.setFont('helvetica','bold'); pdf.setFontSize(9);
  pdf.text('PLAN SITUAȚIE COMBINAT · '+buildings.length+' CORPI',W/2,6,{align:'center'});

  // Bounding box global
  let minLon=180,maxLon=-180,minLat=90,maxLat=-90;
  buildings.forEach(b=>{
    if(b.P?.lon){minLon=Math.min(minLon,b.P.lon);maxLon=Math.max(maxLon,b.P.lon);}
    if(b.P?.lat){minLat=Math.min(minLat,b.P.lat);maxLat=Math.max(maxLat,b.P.lat);}
  });
  if(maxLon-minLon<0.0001){minLon-=.001;maxLon+=.001;minLat-=.001;maxLat+=.001;}

  const PAD=18, dW=W-PAD*3-55, dH=H-30;
  const cos=Math.cos((minLat+maxLat)/2*Math.PI/180);
  const scX=dW/((maxLon-minLon)*111319.9*cos);
  const scY=dH/((maxLat-minLat)*111319.9);
  const sc=Math.min(scX,scY);
  const ox=PAD, oy=12;

  pdf.setFillColor(235,242,228); pdf.rect(ox,oy,dW,dH,'F');
  pdf.setDrawColor(200,208,220); pdf.setLineWidth(.1); pdf.setLineDashPattern([2,3],0);
  for(let gx=ox;gx<ox+dW;gx+=20) pdf.line(gx,oy,gx,oy+dH);
  for(let gy=oy;gy<oy+dH;gy+=20) pdf.line(ox,gy,ox+dW,gy);
  pdf.setLineDashPattern([],0);
  pdf.setFillColor(200,205,220); pdf.rect(ox,oy+dH-5,dW,5,'F');

  const toXY=(lon,lat)=>[ox+(lon-minLon)*111319.9*cos*sc, oy+dH-(lat-minLat)*111319.9*sc];
  const COLS=[[25,100,200],[15,130,65],[180,130,20],[120,30,180],[180,40,40],[30,130,150]];

  buildings.forEach((bld,i)=>{
    const P=bld.P; if(!P) return;
    const col=COLS[i%6];
    const [bx,by]=toXY(P.lon,P.lat);
    const bfW=((P._bW||P.W*0.65)*sc), bfD=((P._bD||P.D*0.6)*sc);

    pdf.setFillColor(...col.map(c=>Math.round(c*.1+235)));
    pdf.setDrawColor(...col); pdf.setLineWidth(.5);
    pdf.rect(bx-bfW/2, by-bfD/2, bfW, bfD,'FD');

    // Hașuri
    pdf.setDrawColor(...col); pdf.setLineWidth(.12);
    for(let hx=0;hx<bfW;hx+=3) pdf.line(bx-bfW/2+hx,by-bfD/2,bx-bfW/2+hx+3,by-bfD/2+3);

    // Badge
    const r=Math.max(3.5,Math.min(7,bfW*.3));
    pdf.setFillColor(...col);
    try{pdf.circle(bx,by,r,'F');}catch(e){pdf.rect(bx-r,by-r,r*2,r*2,'F');}
    pdf.setTextColor(255,255,255); pdf.setFont('helvetica','bold'); pdf.setFontSize(Math.min(6.5,r));
    pdf.text(S2(bld.id),bx,by+2,{align:'center'});

    // Label
    pdf.setTextColor(...col); pdf.setFont('helvetica','bold'); pdf.setFontSize(5.5);
    pdf.text(S2(bld.label.slice(0,30)),bx,by+bfD/2+5,{align:'center'});
    pdf.setFont('helvetica','normal'); pdf.setFontSize(4.8); pdf.setTextColor(70,85,110);
    pdf.text('h='+(P.aedisH||P.niv*P.hn).toFixed(1)+'m · '+P.niv+'niv.',bx,by+bfD/2+10,{align:'center'});
  });

  // Legendă dreapta
  const lx=ox+dW+4, ly=oy+2;
  pdf.setFillColor(248,250,255); pdf.setDrawColor(185,200,220); pdf.setLineWidth(.2);
  pdf.rect(lx,ly,50,H-ly-5,'FD');
  pdf.setTextColor(20,35,80); pdf.setFont('helvetica','bold'); pdf.setFontSize(7);
  pdf.text('LEGENDĂ',lx+25,ly+7,{align:'center'});
  let ly2=ly+16;
  buildings.forEach((bld,i)=>{
    if(ly2>H-14) return;
    const col=COLS[i%6];
    pdf.setFillColor(...col);
    try{pdf.circle(lx+6,ly2,3,'F');}catch(e){pdf.rect(lx+3,ly2-3,6,6,'F');}
    pdf.setTextColor(...col); pdf.setFont('helvetica','bold'); pdf.setFontSize(5.5);
    pdf.text(S2(bld.id),lx+6,ly2+1.5,{align:'center'});
    pdf.setTextColor(30,45,80); pdf.setFont('helvetica','normal'); pdf.setFontSize(5);
    pdf.text(S2(bld.label).slice(0,24),lx+11,ly2-0.5);
    pdf.setTextColor(90,105,125);
    pdf.text('h='+(bld.P?.aedisH||'?')+'m',lx+11,ly2+4.5);
    ly2+=12;
  });

  // Nord
  const nX=ox+dW-10, nY=oy+12;
  pdf.setFillColor(255,255,255); pdf.setDrawColor(120,130,145); pdf.setLineWidth(.35);
  try{pdf.circle(nX,nY,7,'FD');}catch(e){}
  pdf.setFillColor(190,30,30);
  try{pdf.triangle(nX,nY,nX-3,nY+4.5,nX+3,nY+4.5,'F');}catch(e){}
  pdf.setFillColor(170,178,192);
  try{pdf.triangle(nX,nY,nX-3,nY-4.5,nX+3,nY-4.5,'F');}catch(e){}
  pdf.setTextColor(190,30,30); pdf.setFont('helvetica','bold'); pdf.setFontSize(7);
  pdf.text('N',nX,nY-7,{align:'center'});

  pdf.setFont('helvetica','italic'); pdf.setFontSize(5); pdf.setTextColor(130,140,155);
  pdf.text('UrbanX TSS·FG · Plan situație orientativ',W/2,H-3,{align:'center'});

  const fn2=('plan_situatie_'+buildings.length+'corpi.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn2);
  if(typeof ss==='function') ss('✅ Plan Situație: '+fn2+' · '+buildings.length+' corpi');
}


// ═══════════════════════════════════════════════════════════════════════════
// FUNCȚIUNE PER CORP — injectăm selector în panoul AEDIS + tab-ul Relevee
// ═══════════════════════════════════════════════════════════════════════════

const _FN_OPTIONS = [
  {val:'rezidential_colectiv', label:'🏠 Rezidențial colectiv'},
  {val:'rez',                  label:'🏠 Locuință individuală'},
  {val:'birouri',              label:'🏢 Birouri / Office'},
  {val:'com',                  label:'🏪 Comercial / Retail'},
  {val:'hotel',                label:'🏨 Hotel / Cazare'},
  {val:'mixt_com_rez',         label:'🏬 Comercial P0 + Rezidențial'},
  {val:'mixt_bir_rez',         label:'🏗 Birouri P0 + Rezidențial'},
  {val:'mixt_hotel_com',       label:'🏩 Hotel + Comercial P0'},
];

function _rvInjectFnPerCorp(){
  if(!window.AEDIS?.corpuri?.length) return;

  // ── Injectăm în panoul AEDIS (secțiunea "Editare individuala per corp") ──
  // Căutăm containerele corp: elemente cu text "Corp N" + inputuri Niveluri/H
  // Folosim pattern flexibil: orice element cu textContent ce conține "Corp 1", "Corp 2"...
  AEDIS.corpuri.forEach((corp, i) => {
    const corpLabel = 'Corp '+(i+1);
    const selId     = 'aedis-fn-corp-'+i;
    if(document.getElementById(selId)) return; // deja injectat

    // Căutăm containerul corpului în DOM
    const allElems = Array.from(document.querySelectorAll('*'));
    let corpContainer = null;
    for(const el of allElems){
      if(el.children.length > 0) continue; // skip parents
      if(el.textContent.trim() === corpLabel){
        // Urcăm la container
        corpContainer = el.closest('[class*="corp"]') || el.parentElement?.parentElement || el.parentElement;
        break;
      }
    }
    if(!corpContainer) return;

    // Creăm selectorul de funcțiune
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;align-items:center;gap:6px;margin-top:6px;padding:4px 0;';
    wrap.innerHTML = '<span style="font-size:10px;font-weight:600;color:rgba(255,255,255,.5);min-width:70px;font-family:inherit">Funcțiune</span>';

    const sel = document.createElement('select');
    sel.id = selId;
    sel.style.cssText = [
      'flex:1','height:28px','border-radius:5px','cursor:pointer',
      'font-family:inherit','font-size:10px','font-weight:600',
      'background:#0f1828','color:#e2e8f0',
      'border:1px solid rgba(212,175,55,.3)',
      'padding:0 6px','outline:none',
    ].join(';');

    _FN_OPTIONS.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.val;
      o.textContent = opt.label;
      if((corp.fn || 'rezidential_colectiv') === opt.val) o.selected = true;
      sel.appendChild(o);
    });

    sel.onchange = (e) => {
      AEDIS.corpuri[i].fn = e.target.value;
      // Dacă corpul activ în Relevee e acesta, actualizăm și _RV
      if(_rvActiveBldId === 'C'+(i+1) && _RV.parcelParams){
        _RV.parcelParams.fn = e.target.value;
        _RV.fn = e.target.value;
        if(typeof _rvRender === 'function') _rvRender();
      }
      if(typeof ss === 'function') ss('✅ Corp '+(i+1)+' → funcțiune: '+e.target.value);
    };

    wrap.appendChild(sel);
    corpContainer.appendChild(wrap);
  });
}

// Observer: injectăm când panoul AEDIS apare sau se schimbă
const _fnCorpObs = new MutationObserver(()=>{
  if(window.AEDIS?.corpuri?.length > 1) _rvInjectFnPerCorp();
});
_fnCorpObs.observe(document.body, {childList:true, subtree:true});
setInterval(()=>{ if(window.AEDIS?.corpuri?.length > 1) _rvInjectFnPerCorp(); }, 2000);


console.log('[MultiBuilding] ✅ loaded — citesc date AEDIS reale');
