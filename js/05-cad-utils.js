// UrbanX — UTR helpers, parcele din zona


async function doLoadLocalParcels(){
  const bb = map.getBounds();
  const W=bb.getWest(), S2=bb.getSouth(), E=bb.getEast(), N=bb.getNorth();
  const cLng=(W+E)/2, cLat=(S2+N)/2;
  
  // Calculăm zona (grid 0.05°) pentru centrul viewport-ului
  const GRID=0.05;
  const zx=Math.floor(cLng/GRID), zy=Math.floor(cLat/GRID);
  const zonaName='zona_'+zx+'_'+zy;
  
  ss('⏳ Se încarcă parcele zona '+zonaName+'…');
  
  try{
    // Încărcăm fișierul de zonă dacă nu e deja în cache
    if(!S._zoneCache) S._zoneCache={};
    
    if(!S._zoneCache[zonaName]){
      const r = await fetch('./zone/'+zonaName+'.geojson');
      if(!r.ok) throw new Error('Zona '+zonaName+' indisponibilă');
      S._zoneCache[zonaName] = await r.json();
    }
    
    const zoneData = S._zoneCache[zonaName];
    
    // Filtrăm parcelele din viewport - folosim centroid, nu primul punct al ring-ului
    const inView = zoneData.features.filter(f=>{
      try{
        const ring = f.geometry?.coordinates?.[0];
        if(!ring?.length) return false;
        // Calculam centroid simplu (medie coordonate)
        let sumX=0, sumY=0;
        for(const [x,y] of ring){sumX+=x;sumY+=y;}
        const cx=sumX/ring.length, cy=sumY/ring.length;
        // Extindem viewport-ul putin pentru a prinde parcelele partial vizibile
        const pad=0.001;
        return cx>=(W-pad) && cx<=(E+pad) && cy>=(S2-pad) && cy<=(N+pad);
      }catch(e){ return false; }
    });
    
    if(!inView.length){
      ss('⚠️ Nicio parcelă în zona vizibilă. Zoom mai aproape sau pan spre Iași municipiu.');
      return;
    }
    
    // Afișăm pe hartă
    const fc={type:'FeatureCollection',features:inView.map((f,i)=>({
      ...f, id:i,
      properties:{...f.properties, pidx:i, fc:'#60a5fa', lc:'#3b82f6'}
    }))};
    setSource('parcel-src', fc);
    
    // Actualizăm cadData temporar pentru findNearest
    S.cadData={features:inView};
    S.cadHasPolygons=true;
    
    ss('✅ '+inView.length+' parcele afișate · Click pe o parcelă pentru a o selecta');
    const el=document.getElementById('cadastru-status');
    if(el) el.textContent='✅ '+inView.length+' parcele în zonă';
    
  }catch(e){
    ss('⚠️ '+e.message+' — verificați că folderul zone/ e urcat în GitHub');
  }
}



function doReset(){
  try{_aedisRestoreCad3D();}catch(e){}
  S.parcels=[];S.activeParcel=null;S.utr='';S.rule={};S.ll=null;S.ctx=null;S.vol.genDone=false;
  if(S.popup){S.popup.remove();S.popup=null;}
  ['parcel-src','vol-src','fp-src','ctx-src','utr-src'].forEach(clearSource);
  try{_aedisRestoreCad3D();}catch(e){}  // curăță mask demolare
  // Curățăm inputurile
  document.querySelectorAll('#inp-addr,#inp-cad,#inp-coord').forEach(el=>el.value='');
  document.querySelectorAll('#addr-box,#cad-box').forEach(el=>el.innerHTML='');
  mobSearchOverlayClose();
  window._pendingAddrResults=null;window._pendingAddrHtml=null;window._addrI=null;
  window._addrI=null;window._cadR=null;
  // Nu avem nevoie de refresh - resetăm starea complet
  renderAll();
  ss('Resetat ✓ — Selectează un teren nou pe hartă sau caută o adresă.');
}

async function genVol(){
  if(!S.parcels.length)return alert('Selectează mai întâi o parcelă.');
  
  const ap = S.parcels[S.activeParcel??0];
  
  // Dacă nu avem context OSM, încărcăm mai întâi
  if(!S.ctx?.features?.length && ap?.geo?.geometry){
    ss('⏳ Se încarcă clădirile existente pentru detecție coliziuni…');
    await loadContext();
  }
  
  // Verificăm coliziuni
  if(ap?.geo?.geometry){
    const fp = buildFP(ap.geo.geometry, ap.params||ap.utr);
    if(fp?.geometry){
      const {fp:fpAdj, collisions} = checkCollisions(fp);
      if(collisions > 0){
        ap._fpAdj = fpAdj;
        console.log(`Coliziuni detectate: ${collisions}, footprint ajustat`);
      } else {
        ap._fpAdj = null;
      }
    }
  }
  
  const feats = buildVolume();
  // Adăugăm bldIdx explicit pentru distanțe multiple volume
  {
    const geomMap = {};
    let bldCounter = 0;
    feats.forEach(f=>{
      if(f.properties?.floor < 0 || f.properties?.isExistent) return;
      const ring = f.geometry?.coordinates?.[0];
      if(!ring?.length) return;
      const hash = ring[0]?.map(v=>(v||0).toFixed(5)).join(',')+':'+ring[1]?.map(v=>(v||0).toFixed(5)).join(',');
      if(!(hash in geomMap)){ geomMap[hash] = bldCounter++; }
      if(!f.properties) f.properties = {};
      f.properties.bldIdx = geomMap[hash];
      f.properties.parcelIdx = 0;
    });
  }
  S.vol._lastFeats = feats;
  setSource('vol-src',{type:'FeatureCollection',features:feats});
  S.vol._lastFeats = feats;
  S.vol.genDone = true;
  setTimeout(updateDistanceLines, 150);
  setTimeout(updateBilant, 300); // auto-refresh bilant daca e activ
  // Ștergem masca de demolare — volumul generat acoperă acum zona
  try{
    if(map.getLayer('demolish-mask')) map.removeLayer('demolish-mask');
    if(map.getSource('demolish-mask-src')) map.removeSource('demolish-mask-src');
  }catch(e){}
  set3D(60,-20);
  
  const colMsg = ap?._fpAdj ? ` · ⚠️ Footprint ajustat (coliziuni cu clădiri existente eliminate)` : '';
  _setCtxVisibility();
  ss(`🏗 Volum 3D generat!`);
  renderTab('volume');
  if(window.innerWidth<=840)_g('mob-sheet')?.classList.remove('open');
  // Distanțe față de vecini — dacă contextul lipsește, îl încărcăm mai întâi
  if(!S.ctx?.features?.length){
    loadContext().then(()=>{ setTimeout(updateDistanceLines, 300); });
  } else {
    setTimeout(updateDistanceLines, 300);
  }
}

function clearVol(){
  clearSource('vol-src');
  S.vol.genDone=false;
  if(S._ctxBackup?.features?.length){ S.ctx = S._ctxBackup; try{setSource('ctx-src',S.ctx);}catch(e){} }
  S._ctxBackup=null;
  _demolishRestoreNative();
  if(S._styleBeforeDemo){
    const prev = S._styleBeforeDemo; S._styleBeforeDemo=null;
    const sel = document.getElementById('selBase');
    if(sel){ sel.value=prev; map.setStyle(STYLES[prev]||STYLES.custom); map.once('style.load',()=>setTimeout(()=>_restoreAfterStyleLoad(prev),400)); }
  } else {
    try{ map.setLayoutProperty('ctx-3d','visibility','visible'); }catch(e){}
  }
  renderTab('proiect');
}

// ── Actualizare parametri urbanistici editabili ────────────────────────────
function updateParam(key, val, rerender){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap) return;
  if(!ap.params) ap.params = getDefaultParams(ap.utr);
  let n = parseFloat(String(val).replace(',','.'));
  if(isNaN(n) || n < 0) return;
  // Validare domeniu: POT max 100%, CUT max 20, H max 200m, niv max 50
  if(key==='pot') n = Math.min(100, n);
  if(key==='cut') n = Math.min(20, n);
  if(key==='h')   n = Math.min(200, n);
  if(key==='niv') n = Math.min(50, Math.round(n));
  if(key==='rf'||key==='rl'||key==='rr'||key==='rs') n = Math.min(50, n);
  if(key==='sv')  n = Math.min(95, n);
  ap.params[key] = n;
  // Fix #9: CUT creste → creste suprafata desfasurata → creste inaltimea/nivelurile
  if(key === 'niv'){
    ap.params.h = Math.round(n * Number(S.vol.hNiv||3) * 10) / 10;
  }
  if(key === 'h'){
    ap.params.niv = Math.max(1, Math.round(n / Number(S.vol.hNiv||3)));
  }
  // Cand CUT se schimba: recalculam niveluri maxime posibile (SD_max/SC_sol)
  if(key === 'cut'){
    const pArea = ap.area || turf.area(ap.geo);
    const fp2 = buildFP(ap.geo.geometry, ap.params);
    const scSol = fp2?.geometry ? turf.area(fp2) : pArea * (ap.params.pot||35) / 100;
    if(scSol > 0){
      const maxNiv = Math.max(1, Math.floor((pArea * n) / scSol));
      // Sugeram niveluri (nu fortam - utilizatorul poate ajusta)
      ap.params.niv = maxNiv;
      ap.params.h = Math.round(maxNiv * Number(S.vol.hNiv||3) * 10) / 10;
    }
  }
  S.rule = {...ap.params};
  ap._fpAdj = null; // forțăm recalculare footprint

  // Actualizăm footprint vizual pe hartă
  updateMap();

  // Dacă volumul e generat, regenerăm imediat cu noii parametri
  if(S.vol.genDone && ap.geo?.geometry){
    // buildFP recalculează cu noii parametri (POT, aliniamente etc)
    const fp = buildFP(ap.geo.geometry, ap.params);
    if(fp?.geometry){
      // Verificăm coliziuni
      if(S.ctx?.features?.length){
        const {fp:fpAdj, collisions} = checkCollisions(fp);
        if(collisions > 0) ap._fpAdj = fpAdj;
      }
    }
    // buildVolume folosește ap.params (inclusiv key-ul tocmai schimbat)
    const f = buildVolume();
    setSource('vol-src', {type:'FeatureCollection', features:f});
    console.log('Volum actualizat:', key, '=', n, '→ fp:', fp?Math.round(turf.area(fp))+'mp':'?');
  }
  if(rerender){
    renderTab('proiect');
  } else {
    // Actualizăm doar calculele live fără a rerenderiza tot
    // Actualizam zona badge
    const zoneInfoLive = detectZoneType(S.ll?.lat||0, S.ll?.lng||0, ap?.utr||'');
    const zoneBadgeEl = document.querySelector('#zone-badge');
    if(zoneBadgeEl){
      zoneBadgeEl.textContent = zoneInfoLive.label;
      zoneBadgeEl.style.color = zoneInfoLive.color;
      zoneBadgeEl.style.borderColor = zoneInfoLive.color+'55';
      zoneBadgeEl.style.background = zoneInfoLive.color+'15';
    }
    const liveEl = document.querySelector('#live-calcule');
    if(liveEl && ap.geo?.geometry){
      const fp2=buildFP(ap.geo.geometry,ap.params);
      const fp_m2=fp2?.geometry?Math.round(turf.area(fp2)):0;
      const pA=ap.area||0;
      const pot=pN(ap.params.pot)||100;
      const cut=pN(ap.params.cut);
      const sv=pN(ap.params.sv)||0;
      const hNiv=Number(S.vol.hNiv||3);
      const h=pN(ap.params.h)||(pN(ap.params.niv)||4)*hNiv;
      const niv=Math.max(1,Math.round(h/hNiv));
      const SC=Math.round(fp_m2);
      const SD=Math.round(SC*niv);
      const SDmax=cut?Math.floor(pA*cut):null;
      liveEl.innerHTML='<b style="color:#d4af37">SC la sol:</b> '+SC+' m² · <b style="color:#d4af37">SD total:</b> '+SD+(SDmax?' / max '+SDmax:'')+' mp.ADC · <b style="color:#d4af37">H:</b> '+h+'m / '+niv+' et.';
    }
  }
}

let _paramDebounce = null;
function updateParamLive(key, val){ 
  clearTimeout(_paramDebounce);
  _paramDebounce = setTimeout(()=>updateParam(key, val, false), 80);
}

function resetParams(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap) return;
  ap.params = getDefaultParams(ap.utr);
  S.rule = {...ap.params};
  ap._fpAdj = null;
  if(S.vol.genDone && ap.geo?.geometry){
    const f = buildVolume();
    setSource('vol-src', {type:'FeatureCollection', features:f});
  }
  updateMap();
  renderTab('proiect');
}


function centerOnParcel(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry&&!S.ll)return;
  
  let center;
  if(ap?.geo?.geometry){
    try{center=turf.centerOfMass(ap.geo).geometry.coordinates;}
    catch(e){center=[S.ll?.lng||27.6014,S.ll?.lat||47.1585];}
  } else {
    center=[S.ll?.lng||27.6014,S.ll?.lat||47.1585];
  }
  
  // Zburăm la parcelă
  map.flyTo({center, zoom:Math.max(map.getZoom(),18), duration:700});
  
  // Reafișăm popup-ul cu info parcelei
  if(ap){
    const nrcad=ap.nrcad||'—';
    const utr=ap.utr||'—';
    const area=ap.area?Math.round(ap.area)+' m²':'—';
    const src=ap.source==='ANCPI'?'<span style="color:#34d399">● ANCPI</span>':'<span style="color:#fbbf24">● approx.</span>';
    popup(
      `<b>📍 ${esc(nrcad)}</b><br>UTR: <b>${esc(utr)}</b><br>Suprafață: <b>${area}</b> ${src}<br><small style="color:#64748b">Click X sau ESC pentru a închide</small>`,
      {lng:center[0],lat:center[1]}
    );
  }
}

function genVolAll(){
  const feats=buildVolume();
  S.vol._lastFeats=feats;
  setSource('vol-src',{type:'FeatureCollection',features:feats});
  S.vol.genDone=true;
  set3D(60,-20);
  ss('🏗 Volum unificat generat pentru toate parcelele!');
  setTimeout(updateDistanceLines, 400);
}

function genVolEach(){
  const feats=[];
  const prevFn=S.vol.fn;
  S.parcels.forEach((p,pi)=>{
    if(p.fn)S.vol.fn=p.fn;
    const pFeats=buildVolume();
    feats.push(...pFeats.map(f=>({...f,properties:{...f.properties,parcelIdx:pi}})));
    S.vol.fn=prevFn;
  });
  S.vol._lastFeats=feats;
  setSource('vol-src',{type:'FeatureCollection',features:feats});
  S.vol.genDone=true;
  set3D(60,-20);
  ss('🏗 Volume individuale generate per parcelă!');
  setTimeout(updateDistanceLines, 400);
}

function removeParcel(i){
  S.parcels.splice(i,1);
  if(S.activeParcel>=S.parcels.length)S.activeParcel=S.parcels.length-1;
  updateMap();renderAll();
}

function clearAll(){
  S.parcels=[];S.activeParcel=null;S.vol.genDone=false;
  ['parcel-src','vol-src','fp-src'].forEach(clearSource);
  renderAll();ss('Toate parcelele șterse.');
}

