// UrbanX — Urban3D, UAT_REGISTRY, FAL.AI

function toggleMulti(v){
  S.multiMode=v;
  _g('btnMulti')?.classList.toggle('multi-on',v);
  renderTab('search');
}

function set3D(pitch=60,bearing=-20){
  map.easeTo({pitch,bearing,duration:800,zoom:Math.max(map.getZoom(),16)});
  _g('pitchV').textContent=pitch+'°';_g('slPitch').value=pitch;
  _g('bearV').textContent=((bearing+360)%360)+'°';_g('slBearing').value=((bearing+360)%360);
}
function toggleFnLegend(btn){
  const leg=document.getElementById('fn-legend');
  if(!leg)return;
  const visible=leg.classList.toggle('visible');
  btn.classList.toggle('on',visible);
  // Aratam/ascundem si etichetele de pe harta
  try{
    map.setLayoutProperty('ctx-height-label','visibility',visible?'visible':'none');
  }catch(e){}
}
function set2D(){map.easeTo({pitch:0,bearing:0,duration:600});_g('pitchV').textContent='0°';_g('slPitch').value=0;_g('bearV').textContent='0°';_g('slBearing').value=0;}

function switchTab(t){
  S.tab=t;
  document.querySelectorAll('.ptab').forEach(b=>b.classList.toggle('active',b.dataset.t===t));
  document.querySelectorAll('.tc').forEach(c=>c.classList.toggle('active',c.id===`tc-${t}`));
  document.querySelectorAll('.mtab').forEach(b=>b.classList.toggle('active',b.dataset.mt===t));
  renderTab(t);
  const mb=_g('mob-body');if(mb&&_g('mob-sheet')?.classList.contains('open'))mb.innerHTML=getContent(t);
  setTimeout(draw2D,60);
}

// ═══ UTR DRAWER ═══════════════════════════════════════════════════════════
let utrOpen=false;
function toggleUTR(){
  utrOpen=!utrOpen;
  _g('btnUTR').classList.toggle('on',utrOpen);
  _g('utr-drawer').classList.toggle('open',utrOpen);
  if(!utrOpen){clearSource('utr-src');return;}
  if(!S.pug)return;
  const map = window.map;
  if(!map){ss('⚠ Harta nu e pregătită — mai încearcă');return;}
  const fc={type:'FeatureCollection',features:S.pug.features.map(f=>({...f,properties:{...f.properties,utr:normU(f.properties?.utr||''),c:ucol(normU(f.properties?.utr||''))}}))};
  setSource('utr-src',fc);
  const bb=turf.bbox(S.pug);map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:40,duration:800});
  ss(`🗺 ${S.pug.features.length} zone UTR`);
  const utrMap={};
  S.pug.features.forEach(f=>{const u=normU(f.properties?.utr||'');if(u&&u!=='?'&&u!=='??')utrMap[u]=(utrMap[u]||0)+1;});
  const chips=_g('utr-chips');
  if(chips)chips.innerHTML=Object.keys(utrMap).sort().map(u=>`<span class="utr-chip" style="background:${ucol(u)}22;border-color:${ucol(u)};color:${ucol(u)}" onclick="selectUTR('${u}')" title="${esc(REGULI[u]?.d||u)} · ${utrMap[u]} zone">${u}</span>`).join('');
  const leg=_g('utr-leg');if(leg)leg.textContent=`${Object.keys(utrMap).length} tipuri UTR · ${S.pug.features.length} zone · Click pe UTR pentru detalii și zoom`;
}

// Ascunde doar bara — UTR-urile rămân vizibile pe hartă
function hideUTRDrawer(){
  _g('utr-drawer').classList.remove('open');
}

function selectUTR(utr){
  if(!S.pug)return;
  const feats=S.pug.features.filter(f=>normU(f.properties?.utr||'')===utr);
  setSource('utr-src',{type:'FeatureCollection',features:feats.map(f=>({...f,properties:{...f.properties,utr,c:ucol(utr)}}))});
  if(feats.length){const bb=turf.bbox({type:'FeatureCollection',features:feats});map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:60,duration:700});}
  S.utr=utr;S.rule=REGULI[utr]||{};
  utrOpen=false;_g('utr-drawer').classList.remove('open');_g('btnUTR').classList.remove('on');
  switchTab('utr');
  ss(`🗺 UTR ${utr} — ${esc(REGULI[utr]?.d||'')} · ${feats.length} zone`);
}

// ═══ SCENARII ═════════════════════════════════════════════════════════════
function saveScen(){
  const name=prompt('Nume scenariu:')||`Sc.${S.scenarios.length+1}`;
  S.scenarios.unshift({ts:new Date().toISOString(),name,nParcele:S.parcels.length,niv:S.vol.niv,h:S.vol.hOvr||S.rule.h,fn:S.vol.fn,timeline:S.timeline||null,parcels:S.parcels.map(p=>({nrcad:p.nrcad,utr:p.utr,area:p.area,fn:p.fn}))});
  localStorage.setItem('ux16',JSON.stringify(S.scenarios));renderTab('scen');ss('💾 Salvat.');
}
function expJSON(){const b=new Blob([JSON.stringify(S.scenarios,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='urbanx_scenarii.json';a.click();}
function detectAndSetBearing(){
  const geo = S.parcels[S.activeParcel??0]?.geo;
  if(!geo){ss('⚠️ Selectează o parcelă mai întâi.');return;}
  ss('🧭 Se detectează frontul stradal…');
  detectRoadFront(geo).then(b=>{
    if(b!==null){
      S.bearing=Math.round(b);
      document.querySelectorAll('input[type=range]').forEach(el=>{
        if(el.oninput?.toString().includes('S.bearing')){
          el.value=S.bearing;
          el.dispatchEvent(new Event('input'));
        }
      });
      updateMap();
      if(S.vol.genDone){const f=buildVolume();setSource('vol-src',{type:'FeatureCollection',features:f});}
      renderTab('proiect');
      ss('🧭 Front stradal detectat: '+S.bearing+'°');
    } else {
      ss('⚠️ Stradă nedetectată — ajustați manual bearingul.');
    }
  }).catch(()=>ss('⚠️ Eroare la detectare stradă.'));
}

function setBearing(deg){
  S.bearing = Math.round((+deg + 360) % 360);
  const sl = document.getElementById('bearing-slider');
  const vl = document.getElementById('bearing-value');
  if(sl){ sl.value = S.bearing; }
  if(vl){ vl.textContent = S.bearing + '°'; }
  updateMap();
  if(S.vol.genDone){
    const f = buildVolume();
    setSource('vol-src', {type:'FeatureCollection', features:f});
  }
  renderTab('proiect');
}

function setS(btn){ if(btn?.getAttribute) setScenariu(btn.getAttribute('data-s')); else setScenariu(btn); }
function setFC(n){ S.vol.frontCount=n; updateMap(); renderTab('proiect'); }
function toggleMultiVol(){ 
  S.vol.multiVol=!S.vol.multiVol; 
  if(S.vol.genDone){const f=buildVolume();setSource('vol-src',{type:'FeatureCollection',features:f});}
  renderTab('proiect'); 
}

// ── Helper funcții balcoane — apelate din onclick-urile butoanelor N/E/S/V ──
function _aedisToggleBalcon(latura){
  if(!AEDIS.balconLaturi) AEDIS.balconLaturi = [];
  const i = AEDIS.balconLaturi.indexOf(latura);
  if(i >= 0){ AEDIS.balconLaturi.splice(i, 1); }
  else { AEDIS.balconLaturi.push(latura); }
  aedisRender();
}
function _aedisToggleAllBalcon(){
  AEDIS.balconLaturi = (AEDIS.balconLaturi||[]).length === 4 ? [] : ['N','E','S','V'];
  aedisRender();
}

function htmlPerBldgUI(){
  const mv = S.vol.multiVolCount||2;
  const perBldg = S.vol.multiVolPerBldg||[];
  const hNiv = Number(S.vol.hNiv||3);
  const globalNiv = S.parcels[S.activeParcel??0]?.params?.niv||4;
  const rows = Array.from({length:mv},(_,i)=>{
    const b = perBldg[i]||{};
    const niv = b.niv??globalNiv;
    const h = b.hNiv??hNiv;
    return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;padding:6px 8px;background:#0d1f3c;border-radius:6px;border:1px solid rgba(245,158,11,0.2)">'+
      '<span style="color:#f59e0b;font-weight:700;font-size:11px;min-width:60px">Corp '+(i+1)+'</span>'+
      '<div style="flex:1"><div style="font-size:10px;color:#94a3b8;margin-bottom:2px">Niveluri</div>'+
      '<input type="number" min="1" max="50" value="'+niv+'" oninput="setBldgParam('+i+',\'niv\',+this.value)" style="width:100%;background:#081526;border:1px solid rgba(245,158,11,0.3);color:#fff;border-radius:4px;padding:3px 6px;font-size:12px"></div>'+
      '<div style="flex:1"><div style="font-size:10px;color:#94a3b8;margin-bottom:2px">H/nivel (m)</div>'+
      '<input type="number" min="2" max="6" step="0.1" value="'+h+'" oninput="setBldgParam('+i+',\'hNiv\',+this.value)" style="width:100%;background:#081526;border:1px solid rgba(245,158,11,0.3);color:#fff;border-radius:4px;padding:3px 6px;font-size:12px"></div>'+
      '</div>';
  }).join('');
  return '<div class="card" style="background:#08152a;margin-top:6px;padding:12px"><div style="font-size:12px;font-weight:700;color:#f59e0b;margin-bottom:8px">Editare individuala per corp</div>'+rows+'</div>';
}

function setBldgParam(idx, key, val){
  if(!S.vol.multiVolPerBldg) S.vol.multiVolPerBldg=[];
  while(S.vol.multiVolPerBldg.length <= idx) S.vol.multiVolPerBldg.push({});
  S.vol.multiVolPerBldg[idx][key] = val;
  _mvRegen();
}

function htmlMultiVolUI(){
  const mv = S.vol.multiVolCount||2;
  const ms = S.vol.multiVolShape||'rect';
  const md = S.vol.multiVolDist||6;
  const btnStyle = (active,col)=>
    'padding:6px 2px;border-radius:6px;border:1px solid '+(active?col:'rgba(255,255,255,.2)')+
    ';background:'+(active?col.replace(')',', 0.2)').replace('rgb','rgba'):'transparent')+
    ';color:'+(active?col:'#94a3b8')+';cursor:pointer;font-size:12px;font-weight:700;flex:1';

  const nBtns = [2,3,4,6].map(n=>
    '<button onclick="setMVC('+n+')" style="'+btnStyle(mv===n,'#f59e0b')+'">'+n+'</button>'
  ).join('');

  return [
    '<div class="card" style="background:#08152a;margin-top:6px;padding:12px">',
    '<div style="font-size:12px;font-weight:700;color:#f59e0b;margin-bottom:10px">Multiple clădiri pe edificabil</div>',
    '<div class="g2" style="margin-bottom:10px">',
    '<div><div class="ml" style="font-size:11px;margin-bottom:4px">Nr. clădiri pe parcelă</div>',
    '<div style="display:flex;gap:4px">'+nBtns+'</div></div>',
    '<div><div class="ml" style="font-size:11px;margin-bottom:4px">Formă globală clădiri</div>',
    '<div style="display:flex;flex-wrap:wrap;gap:3px">',
    '<button onclick="setMVS(\'auto\')" style="'+btnStyle(ms==='auto','#f59e0b')+';font-size:11px;padding:5px 3px">⚡ Auto</button>',
    '<button onclick="setMVS(\'rect\')" style="'+btnStyle(ms==='rect','#f59e0b')+';font-size:11px;padding:5px 3px">▬ Dreptunghi</button>',
    '<button onclick="setMVS(\'square\')" style="'+btnStyle(ms==='square','#f59e0b')+';font-size:11px;padding:5px 3px">■ Pătrat</button>',
    '<button onclick="setMVS(\'L\')" style="'+btnStyle(ms==='L','#f59e0b')+';font-size:11px;padding:5px 3px">⌐ Formă L</button>',
    '<button onclick="setMVS(\'U\')" style="'+btnStyle(ms==='U','#f59e0b')+';font-size:11px;padding:5px 3px">⊓ Formă U</button>',
    '<button onclick="setMVS(\'T\')" style="'+btnStyle(ms==='T','#f59e0b')+';font-size:11px;padding:5px 3px">⊤ Formă T</button>',
    '</div></div>',
    '</div>',
    '<div class="ml" style="font-size:11px;margin-bottom:4px">Distanță minimă între clădiri (m)</div>',
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">',
    '<input type="range" min="0.5" max="24" step="0.5" value="'+md+'" oninput="updateMVDist(+this.value)" style="flex:1;accent-color:#f59e0b">',
    '<span id="mvd-val" style="color:#f59e0b;font-weight:700;min-width:35px">'+md+'m</span>',
    '</div>',
    '</div>',
    htmlPerBldgUI(),  // Panel editare individuală per clădire
  ];
}

// ── Post-procesare height overrides ──────────────────────────────────────────
// Grupează features pe clădiri după proximitate centroid și aplică H per clădire
function _applyMVPerBuildingHeights(feats, perBld, globalNiv, globalHNiv){
  if(!feats?.length || !perBld?.some(b=>b?.niv!=null||b?.hNiv!=null)) return feats;
  try{
    // Identifică N clustere de features după centroid
    const centers = feats
      .filter(f=>f.properties?.floor===0)
      .map(f=>({ctr:turf.centerOfMass(f).geometry.coordinates, feat:f}));

    // Sortăm centrele stânga-dreapta, sus-jos (ordine consistentă)
    centers.sort((a,b)=> a.ctr[0]-b.ctr[0] || a.ctr[1]-b.ctr[1]);

    const clusterRadius = 30; // m — raza de grupare per clădire
    const clusters = [];
    centers.forEach(c=>{
      const existing = clusters.find(cl=>
        turf.distance({type:'Feature',geometry:{type:'Point',coordinates:cl.ctr},properties:{}},
          {type:'Feature',geometry:{type:'Point',coordinates:c.ctr},properties:{}},{units:'meters'}) < clusterRadius
      );
      if(existing) existing.feats.push(c.feat);
      else clusters.push({ctr:c.ctr, feats:[c.feat]});
    });

    if(clusters.length < 2) return feats; // nu s-au identificat clădiri separate

    // Construiește mapă centroid→buildingIdx
    const ctrMap = [];
    clusters.forEach((cl,idx)=>{
      ctrMap.push({ctr:cl.ctr, idx});
    });

    // Funcție ce determină indexul clădirii pentru un feature
    const getBldIdx = f => {
      const fc = turf.centerOfMass(f).geometry.coordinates;
      let best = 0, bestD = Infinity;
      ctrMap.forEach(cm=>{
        const d = Math.abs(fc[0]-cm.ctr[0])*111000 + Math.abs(fc[1]-cm.ctr[1])*111000;
        if(d<bestD){bestD=d; best=cm.idx;}
      });
      return best;
    };

    // Reconstruiește features cu heights corecte per clădire
    // FIX: nu mai scalăm → generăm floor-uri noi pentru fiecare clădire
    const origNiv = globalNiv || 4;
    const origHNiv = globalHNiv || 3.0;
    const result = [];

    clusters.forEach((cl, bIdx) => {
      const bCfg = perBld[bIdx] || {};
      const newNiv = bCfg.niv ?? origNiv;
      const newHNiv = bCfg.hNiv ?? origHNiv;
      const origHTot = origNiv * origHNiv;
      const newHTot  = newNiv * newHNiv;

      // Features aparținând acestei clădiri
      const bFeats = feats.filter(f => getBldIdx(f) === bIdx);
      if(!bFeats.length) return;

      // Dacă niv/hNiv nu s-au schimbat, păstrăm ca atare
      if(newNiv === origNiv && newHNiv === origHNiv){
        result.push(...bFeats); return;
      }

      // Reconstruim floor-urile: scalăm baza/top proporțional CU NOU H total
      // Și generăm floor-uri suplimentare dacă newNiv > origNiv
      const floorFeats = bFeats.filter(f => (f.properties?.floor??-1) >= 0);
      const nonFloorFeats = bFeats.filter(f => (f.properties?.floor??-1) < 0);

      // Scalăm feature-urile non-etaj (acoperiș, parapet etc.) la noul H
      const scale = origHTot > 0 ? newHTot / origHTot : 1;
      nonFloorFeats.forEach(f => {
        const nb = parseFloat(((f.properties.base||0)*scale).toFixed(3));
        const nt = parseFloat(((f.properties.top||0)*scale).toFixed(3));
        if(nb <= newHTot + 2) result.push({...f, properties:{...f.properties, base:nb, top:nt}});
      });

      // Generăm floor-urile noi (câte newNiv bucăți)
      const baseFloor = floorFeats.find(f=>f.properties?.floor===0) || floorFeats[0];
      if(!baseFloor) { result.push(...bFeats); return; }

      let curH = 0;
      for(let i = 0; i < newNiv; i++){
        const fH = i === 0 ? newHNiv : newHNiv; // parter = newHNiv
        const topH = curH + fH;
        // Clonăm geometria și proprietățile de la etajul corespunzător dacă există
        const srcFloor = floorFeats.find(f=>f.properties?.floor===i) || baseFloor;
        result.push({
          ...srcFloor,
          properties:{
            ...srcFloor.properties,
            floor: i,
            base: parseFloat(curH.toFixed(3)),
            top: parseFloat(topH.toFixed(3)),
          }
        });
        curH = topH;
      }
    });

    return result.length ? result : feats; // fallback
  }catch(e){
    console.warn('_applyMVPerBuildingHeights error:', e);
    return feats;
  }
}
function setArchStyle(s){
  S.vol.archStyle=s;
  if(S.vol.genDone){const f=buildVolume();setSource('vol-src',{type:'FeatureCollection',features:f});}
  renderTab('proiect');
}
// Debounce pentru regenerare volum — evită apeluri multiple rapide
let _mvDebounce = null;
function _mvRegen(){
  clearTimeout(_mvDebounce);
  _mvDebounce = setTimeout(()=>{
    if(S.vol.genDone){
      const f = buildVolume();
      setSource('vol-src',{type:'FeatureCollection',features:f});
      setTimeout(updateDistanceLines, 150);
    }
  }, 80);
}

function setMVC(n){ 
  S.vol.multiVolCount=n;
  // Inițializăm / redimensionăm array-ul per-building
  if(!S.vol.multiVolPerBldg) S.vol.multiVolPerBldg=[];
  while(S.vol.multiVolPerBldg.length < n) S.vol.multiVolPerBldg.push({});
  _mvRegen();
  renderTab('proiect'); 
}
function setMVS(s){ if(s&&s.getAttribute) s=s.getAttribute('data-s'); 
  S.vol.multiVolShape=s;
  _mvRegen();
  renderTab('proiect'); 
}

// Per-building param setters
function updateMVDist(v){
  S.vol.multiVolDist=v;
  const el=document.getElementById('mvd-val');
  if(el) el.textContent=v+'m';
  _mvRegen();
  updateMap();
}
function setScenariu(s){
  S.vol.scenariuConstructie = s;

  try{
    if(s === 'liber'){
      // Salvăm backup ctx — _safeFc elimina circular refs inainte de JSON.stringify
      if(!S._ctxBackup && S.ctx?.features?.length){
        try{ S._ctxBackup = JSON.parse(JSON.stringify(_safeFc ? _safeFc(S.ctx) : S.ctx)); }
        catch(e){ S._ctxBackup = {type:'FeatureCollection', features: (S.ctx.features||[]).map(f=>({type:'Feature',geometry:f.geometry,properties:{...(f.properties||{})}}))}; }
      }
      _setCtxVisibility();
      const ap = S.parcels[S.activeParcel??0];
      _demolishHideNative(ap?.geo?.geometry || null);

    } else {
      if(S._ctxBackup?.features?.length){
        S.ctx = S._ctxBackup; S._ctxBackup = null;
        try{ setSource('ctx-src', S.ctx); }catch(e){}
      }
      _demolishRestoreNative();
      if(S._styleBeforeDemo){
        const prevStyle = S._styleBeforeDemo; S._styleBeforeDemo = null;
        const selBase = document.getElementById('selBase');
        if(selBase) selBase.value = prevStyle;
        map.setStyle(STYLES[prevStyle] || STYLES.custom);
        map.once('style.load', ()=>{
          setTimeout(()=>{ _restoreAfterStyleLoad(prevStyle); _setCtxVisibility(); }, 400);
        });
      } else {
        _setCtxVisibility();
      }
    }

    if(S.vol.genDone){
      try{
        const f = buildVolume();
        setSource('vol-src',{type:'FeatureCollection',features:f});
      }catch(e){ console.warn('[setScenariu] buildVolume:', e.message); }
    }
  }catch(e){
    console.warn('[setScenariu]', e.message);
  }finally{
    // renderTab se apelează ÎNTOTDEAUNA — indiferent de erori anterioare
    renderTab('proiect');
  }
}

// Ascunde clădirile native DOAR pe parcelă folosind Clip Layer (Mapbox GL JS v3+)
function _demolishHideNative(parcelGeometry){
  try{
    // Ștergem clip-ul anterior dacă există
    _demolishRestoreNative();
    if(!parcelGeometry) return;

    // Clip layer — exclude clădirile 3D native doar în zona parcelei
    if(!map.getSource('demo-clip-src')){
      map.addSource('demo-clip-src', {
        type: 'geojson',
        data: { type: 'Feature', geometry: parcelGeometry, properties: {} }
      });
    } else {
      map.getSource('demo-clip-src').setData(
        { type: 'Feature', geometry: parcelGeometry, properties: {} }
      );
    }

    if(!map.getLayer('demo-clip-layer')){
      map.addLayer({
        id: 'demo-clip-layer',
        type: 'clip',
        source: 'demo-clip-src',
        layout: {
          'clip-layer-types': ['model', 'symbol']
        }
      });
    }
    // fill-extrusion nu poate fi clipped — ascundem selectiv cu filter
    // Găsim layerele fill-extrusion și le filtrăm să excludă parcela
    const allLayers = map.getStyle()?.layers || [];
    allLayers.forEach(l => {
      if(l.type === 'fill-extrusion' && l.id !== 'vol-3d' && l.id !== 'ctx-3d' && l.id !== 'demolish-mask'){
        try{
          if(!S._hiddenNativeLayers) S._hiddenNativeLayers = {};
          S._hiddenNativeLayers[l.id] = map.getFilter(l.id) ?? null;
          map.setFilter(l.id, ['!', ['within', parcelGeometry]]);
        }catch(e){ console.warn('filter', l.id, e.message); }
      }
    });
    console.log('UrbanX: clip layer applied for demolition');
  }catch(e){
    console.warn('_demolishHideNative clip failed:', e.message);
    // Fallback: nu facem nimic — clădirile vor apărea sub volum
  }
}

// Restaurează — șterge clip layer și restaurează filtrele
function _demolishRestoreNative(){
  try{
    if(map.getLayer('demo-clip-layer')) map.removeLayer('demo-clip-layer');
    if(map.getSource('demo-clip-src')) map.removeSource('demo-clip-src');
  }catch(e){}
  try{
    if(S._hiddenNativeLayers){
      Object.entries(S._hiddenNativeLayers).forEach(([id, filter])=>{
        try{ if(map.getLayer(id)) map.setFilter(id, filter); }catch(e){}
      });
      S._hiddenNativeLayers = null;
    }
  }catch(e){}
}
function loadScen(i){const sc=S.scenarios[i];if(!sc)return;Object.assign(S.vol,{fn:sc.fn||'locuinta_individuala',niv:sc.niv||4});if(typeof renderAll==="function")renderAll();ss('📦 Scenariu încărcat.');}

// ═══ BUTOANE GLOBALE ═══════════════════════════════════════════════════════
// Butoane topbar - null-safe pentru toate
const safeOn=(id,fn)=>{const el=document.getElementById(id);if(el)el.onclick=fn;else console.warn('Missing element:',id);};
safeOn('btnUTR',toggleUTR);
safeOn('btnCloseUTR',hideUTRDrawer);
safeOn('btnGPS',doGPS);
// btnANCPI eliminat
safeOn('btnMulti',()=>{S.multiMode=!S.multiMode;const bm=document.getElementById('btnMulti');if(bm)bm.classList.toggle('multi-on',S.multiMode);const cm=document.getElementById('chkMulti');if(cm)cm.checked=S.multiMode;renderTab('search');ss(S.multiMode?'🔲 Multiselect ACTIV':'Multiselect dezactivat.');});
safeOn('btn3D',()=>set3D(60,-20));
safeOn('btn2D',()=>set2D());
safeOn('btnPDF',toggleRapoarteMenu);
safeOn('btnPanel',()=>{
  if(window.innerWidth<=840){
    toggleMobSheet();
  } else {
    const p=_g('panel');
    p.classList.toggle('hidden');
    const isHidden=p.classList.contains('hidden');
    p.style.display=isHidden?'none':'flex';
  }
});
if(_g('btnMobClose'))_g('btnMobClose').onclick=toggleMobSheet;

// ═══ RESTAURARE COMPLETĂ DUPĂ SCHIMBARE STIL HARTĂ ══════════════════════════
// Apelat după orice map.setStyle() — reîncarcă TOATE sursele și layerele
function _restoreAfterStyleLoad(styleKey){
  try{
    addLayers();
    updateMap();

    // Vol-src: volumul AEDIS generat
    if(S.vol.genDone){
      if(S.vol._lastFeats?.length){
        setSource('vol-src',{type:'FeatureCollection',features:S.vol._lastFeats});
      } else {
        try{ const feats=buildVolume(); setSource('vol-src',{type:'FeatureCollection',features:feats}); }catch(e){}
      }
    }

    // Ctx-src: contextul urban OSM
    if(S.ctx?.features?.length){
      setSource('ctx-src', S.ctx);
    }
    // Ctx-3d visibility: ascuns la demolare, ascuns dacă onlyVol, vizibil altfel
    const ctxVisible = !S.vol.onlyVol && AEDIS.scenariu !== 'demolare' && !AEDIS._demolishActive;
    try{ map.setLayoutProperty('ctx-3d','visibility', ctxVisible ? 'visible' : 'none'); }catch(e){}

    // Demolare: re-aplicăm filtrarea ctx-src (fără mask layer)
    if(AEDIS._demolishActive){
      setTimeout(()=>{ try{_aedisRemoveExistingFromCtx();}catch(e){} }, 150);
    }

    // ★ DISTANȚE: restaurăm dist-src cu featurile salvate
    if(S.vol._lastDistFeats?.length){
      try{
        setSource('dist-src',{type:'FeatureCollection',features:S.vol._lastDistFeats});
      }catch(e){}
    } else if(S.vol.genDone){
      // Nu avem cache → recalculăm
      setTimeout(()=>{ try{updateDistanceLines();}catch(e){} }, 500);
    }

    // Aedis-dim-src: etichete dimensionale AEDIS
    if(S.vol.genDone){
      const dimSrc = map.getSource('aedis-dim-src');
      if(dimSrc && !dimSrc._data?.features?.length){
        setTimeout(()=>{ try{updateDistanceLines();}catch(e){} }, 600);
      }
    }

    // Standard style: iluminare solara
    if(styleKey==='standard'){
      try{ _applyStandardLighting(); }catch(e){}
      setTimeout(renderSolarControl, 500);
    } else {
      SOLAR.active = false;
      const sc = document.getElementById('solar-ctrl');
      if(sc) sc.remove();
    }

    renderTab('proiect');
  }catch(err){
    console.warn('_restoreAfterStyleLoad:', err.message);
  }
}

_g('selBase').onchange=e=>{
  const v=e.target.value;
  // Fix #8: predefinit "Doar volumul meu" ACTIV în Urban3D, INACTIV în Streets/Satelitar
  if(v==='custom'){
    S.vol.onlyVol=true;
  } else {
    S.vol.onlyVol=false;
  }
  map.setStyle(STYLES[v]||STYLES.custom);
  // Re-add layers after style change
  map.once('style.load',()=>{
    setTimeout(()=>{
      _restoreAfterStyleLoad(v);
    },300);
  });
};
if(_g('slPitch'))_g('slPitch').oninput=()=>{const v=+_g('slPitch').value;map.easeTo({pitch:v,duration:150});if(_g('pitchV'))_g('pitchV').textContent=v+'°';};
if(_g('slBearing'))_g('slBearing').oninput=()=>{const v=+_g('slBearing').value;map.easeTo({bearing:v,duration:150});if(_g('bearV'))_g('bearV').textContent=v+'°';};

// Tab switching
document.querySelectorAll('.ptab').forEach(b=>{
  b.addEventListener('click', ()=>{ switchTab(b.dataset.t || b.getAttribute('data-t')); });
});
document.querySelectorAll('.mtab').forEach(b=>b.onclick=()=>switchTab(b.dataset.mt));

// ═══ BOOTSTRAP ════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════════════
// REGISTRU UAT — Multi-UAT România
// Adaugă UAT-uri noi în UAT_REGISTRY când ai datele disponibile.
// Structura: fiecare UAT are un folder data/&#123;id&#125;/ cu fișierele necesare.
// Status: 'complet' | 'pug_only' | 'partial' | 'empty'
// ════════════════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════════════════
// UAT_REGISTRY — Registrul național UrbanX
// Fiecare UAT conține TOATE datele necesare pentru generarea rapoartelor:
//   date admin, PUG/cadastru, aeroport (AACR), seism (geotehnică),
//   hidrologie, LMI/patrimoniu, zgomot, vânt, trafic
// Când adaugi pugFile+cadastruIndex → toate rapoartele se populează automat
// ════════════════════════════════════════════════════════════════════════════
const UAT_REGISTRY = {

  // ── IAȘI ────────────────────────────────────────────────────────────────
  'municipiul-iasi': {
    label:'Municipiul Iași', short:'Iași',
    judet:'Iași', judetCode:'IS', siruta:'179132',
    center:[27.6014,47.1585], zoom:13,
    pugFile:'./data/municipiul-iasi/pug.geojson',
    cadastruIndex:'./data/municipiul-iasi/cadastru_index.json',
    reguliFile:'./data/municipiul-iasi/reguli.json',
    status:'complet',
    // Instituții
    primar:'Primăria Municipiului Iași',
    daU:'DAU — Direcția Arhitectură și Urbanism',
    djcpn:'DJCPN Iași', djcpnEmail:'djcpn.iasi@cultura.ro',
    cjPut:'CJ Iași',
    // Aeroport (studiu AACR)
    aeroport:{
      icao:'LRIA', nume:'Aeroportul Internațional Iași',
      prag08:[27.6199,47.1782], prag26:[27.6470,47.1731],
      elevatie:397, pistA_curs:83, pistB_curs:263,
      lungimePista:2400, latimePista:45,
      reglementare:'HG 930/2016 + Legea 233/2016 + RACR-AD-PETA',
      contactAACR:'aacr-iasi@aacr.ro',
    },
    // Seismicitate (studiu geotehnic)
    seism:{
      zona:'E', ag:0.20, Tc:1.6, MSK:'VII-VIII',
      norm:'P100-1/2013',
      descriere:'Zona seismică E — intensitate moderată. Accelerație de proiectare ag=0.20g.',
      recomandare:'Fundație directă posibilă pe loess consolidat. Verificare obligatorie pentru clădiri >P+3.',
    },
    // Hidrologie & Geotehnică (studiu geotehnic)
    hidro:{
      nfa:'1.5-4.0m', tip_sol:'Loess, argilă prăfoasă', portanta:'150-200 kPa',
      risc_inundabil:'Scăzut (zonele centrale) / Mediu (luncile Bahluiului)',
      adancime_fundare:'min. 0.9m (îngheț) — recomandat 1.2-1.5m',
      clasa_geotehnica:'2 (risc moderat)',
      studiu_obligatoriu:'Da — pentru orice clădire, cf. NP 074/2014',
    },
    // LMI & Patrimoniu (studiu istoric)
    lmi:{
      cimecRadius:1000,
      zone_protejate:[
        {cod:'IS-II-s-B-04093', tip:'Zonă construită protejată', centru:[27.5817,47.1597], raza:800,
          desc:'Centrul Istoric Iași — Piața Unirii și zona adiacentă', aviz:'DJCPN Iași + MCID'},
        {cod:'IS-II-s-B-04094', tip:'Ansamblu urban', centru:[27.5835,47.1634], raza:500,
          desc:'Bulevardul Ștefan cel Mare și Sfânt', aviz:'DJCPN Iași'},
        {cod:'IS-II-s-B-04095', tip:'Zonă protejată', centru:[27.5789,47.1612], raza:400,
          desc:'Zona Palat Roznovanu și Primăria Iași', aviz:'DJCPN Iași'},
        {cod:'IS-II-s-B-04096', tip:'Ansamblu arhitectural', centru:[27.5854,47.1587], raza:300,
          desc:'Universitatea Alexandru Ioan Cuza', aviz:'DJCPN Iași'},
      ],
      monumente_reprezentative:[
        {cod:'IS-II-m-A-04090', denumire:'Palatul Culturii', categorie:'A', adresa:'Piața Ștefan cel Mare 1'},
        {cod:'IS-II-m-A-04091', denumire:'Catedrala Mitropolitană', categorie:'A', adresa:'Bld. Ștefan cel Mare 16'},
        {cod:'IS-II-m-B-04092', denumire:'Teatrul Național Vasile Alecsandri', categorie:'B', adresa:'Str. Agatha Bârsescu 18'},
      ],
      reglementare:'Legea 422/2001 · Ordinul MCID 2828/2015 · PUG Iași — zone protejate',
    },
    // Zgomot (studiu acustic)
    zgomot:{
      zona_acustica:'II — Rezidențial/Mixt urban',
      Lzsn_limita:60, Lnoapte_limita:50,
      surse_principale:['Trafic rutier Bld. Independenței / Bd. C-tin Coposu','Trafic feroviar CFR Iași','Activități comerciale zona centrală'],
      distanta_cale_ferata:850, // m față de gara CFR Iași
      harta_zgomot:'https://www.primaria-iasi.ro/portal/wp-content/uploads/2024/harta_zgomot_iasi.pdf',
      norm:'SR 10009:2017 + HG 321/2005',
    },
    // Vânt (studiu confort pietonal)
    vant:{
      zona:'III', // conform CR 1-1-4/2012
      v_ref:30, // m/s viteză referință
      presiune_vant:0.55, // kN/mp
      directie_dominanta:'NV-NNV (vara) / N-NE (iarna)',
      altitudine_teren:45, // m fata de NMN
      norm:'CR 1-1-4/2012 · SR EN 1991-1-4:2006',
      factor_teren:'II — câmpie deschisă cu obstacole rare',
    },
    // Trafic (studiu impact)
    trafic:{
      viteza_proiectare:50, // km/h intravilam
      TMA_ref:12000, // trafic mediu anual de referință (vehicule/zi)
      norm_parcaje:'NP 051/2012 rev.',
      intersectii_principale:[
        'Bd. Independenței × Str. Grigore Ghica Vodă',
        'Bd. C-tin Coposu × Str. Sărăriei',
        'Str. Palat × Bd. Ștefan cel Mare',
      ],
      acces_transport_public:true,
      linii_tramvai:['1','3','7','9','13'],
      linii_autobuz:['4','5','6','11','16','28','36','43'],
    },
    // Mediu — date pentru EIM și studiu spații verzi
    mediu:{
      sv_minim_procent:20,
      parc_cel_mai_apropiat:'Parcul Expoziției (0.8km)',
      parcuri_principale:['Parcul Expoziției','Parcul Copou','Parcul Ciric','Parcul Palat'],
      arie_protejata_apropiere:null, km_arie_protejata:null,
      natura2000_proximitate:['ROSCI0105 Lunca Prutului — 35km','ROSPA0070 Lunca Mijlocie a Prutului — 38km'],
      // Calitate aer (Agenția pentru Protecția Mediului Iași — APM IS)
      aer:{
        apm:'APM Iași', apmWeb:'http://apmis.anpm.ro',
        statii_monitoring:['Iași-Copou (IS-1)','Iași-Tătărași (IS-2)','Iași-Tudor Vladimirescu (IS-3)'],
        poluanti_principali:['NO2 (trafic)','PM10/PM2.5 (trafic + încălzire)','CO (trafic)'],
        NO2_medie_anuala:28, // μg/m³ (limita UE: 40)
        PM10_medie_anuala:22, // μg/m³ (limita UE: 40)
        calitate_generala:'Moderată — influențată de trafic urban și încălzire rezidențială',
        norm:'Legea 104/2011 + Dir. 2008/50/CE (CAFE)',
      },
      // Apă
      apa:{
        operator:'APAVITAL SA Iași',
        sursa_apa_potabila:'Sursa Timișești (râul Moldova) + Sursa Prut',
        retea_canalizare:true, grad_conectare:92, // %
        receptori_naturali:['Râul Bahlui','Râul Nicolina','Râul Jijia'],
        calitate_bahlui:'Stare ecologică moderată (cl. III)',
        risc_inundabil_bahlui:'Zonă de risc — Plan de Management Bazin Prut-Bârlad',
        norm:'Legea 107/1996 + Dir. 2000/60/CE (WFD)',
      },
      // Sol
      sol:{
        tip_sol_predominant:'Cernoziom degradat, argilă prăfoasă',
        contaminare_cunoscuta:'Zone industriale Copou-Socola — investigare în curs',
        permeabilitate:'Scăzută-Medie (0.5-2.0 m/zi)',
        eroziune:'Risc scăzut în intravilanul plat; risc mediu pe versanții Copou',
        norm:'OUG 195/2005 + Ord. 184/1997 (Evaluare impact)',
      },
      // Deșeuri
      deseuri:{
        operator_salubritate:'Serviciul Public de Exploatare a Patrimoniului Municipiului Iași',
        depozit_conform:'Depozitul Ecologic Iași (Roșcani)',
        colectare_selectiva:true,
        rata_reciclare_est:28, // %
        norm:'Legea 211/2011 (deșeuri) + Dir. 2008/98/CE',
      },
      // Zgomot și vibrații
      zgomot_vibratii:{
        harta_strategica_zgomot:true,
        surse_principale:['Trafic rutier (Bld. Independenței, str. Sărăriei)','CFR (gara Iași)'],
        zone_sensibile:['Spitale','Școli','Grădinițe','Zone rezidențiale liniștite'],
      },
      // Date socio-economice (INS)
      ins:{
        populatie:290422, // 2021, recensamant
        densitate_pop:1850, // loc/km²
        suprafata_intravilam:5619, // ha
        rata_somaj:3.2, // %
        venit_mediu_lunar:4200, // RON net
        sursa:'INS — Recensământ 2021 + Fișă localitate 2023',
        ins_web:'https://statistici.insse.ro',
      },
      // Conectivitate date externe
      api:{
        apm_url:'http://apmis.anpm.ro/calitateaer',
        ins_fisa:'https://statistici.insse.ro/shop/index.jsp?page=tempo2&lang=ro&query=populatie+iasi',
        retim_url:null,
        primaria_url:'https://www.primaria-iasi.ro/portal',
      },
      norm:'Legea 292/2018 (EIM) + OUG 195/2005 (Protecția mediului) + Legea 24/2007 (SV)',
    },
  },

  // ── BOTOȘANI — JUDEȚ COMPLET ────────────────────────────────────────────
  // Status: 'partial' → se actualizează la 'complet' după import DXF/SHP
  // Fișiere necesare: data/botosani/cadastru_index.json + pug.geojson + reguli.json
  'municipiul-botosani': {
    label:'Municipiul Botoșani', short:'Botoșani',
    judet:'Botoșani', judetCode:'BT', siruta:'29980',
    center:[26.6697,47.7479], zoom:13,
    pugFile:'./data/municipiul-botosani/pug.geojson',
    cadastruIndex:'./data/municipiul-botosani/cadastru_index.json',
    reguliFile:'./js/data/municipiul-botosani/reguli.json',
    status:'partial', // → 'complet' după import DXF/SHP și populare cadastru_index.json
    primar:'Primăria Municipiului Botoșani',
    adresaPrimarie:'Piața Revoluției nr. 1, Botoșani 710236',
    telefon:'0231 515 712', web:'https://www.primariabotosani.ro',
    daU:'Serviciul Urbanism, Amenajarea Teritoriului și Autorizații',
    djcpn:'DJCPN Botoșani', djcpnEmail:'djcpn.botosani@cultura.ro',
    cjPut:'Consiliul Județean Botoșani',
    apm:'APM Botoșani', apmWeb:'http://apmbt.anpm.ro',
    // Aeroport — cel mai apropiat: Iași (LRIA, ~110km) sau Suceava (LRSV, ~90km)
    aeroport:{
      icao:'LRSV', nume:'Aeroportul Internațional „Ștefan cel Mare" Suceava',
      distanta_km:88, directie:'V',
      nota:'Nu există aeroport în județul Botoșani. Cel mai apropiat: Suceava 88km.',
      contactAACR:'aacr@aacr.ro',
    },
    // Seismicitate — P100-1/2013
    seism:{
      zona:'E', ag:0.20, Tc:1.6, MSK:'VII',
      norm:'P100-1/2013',
      descriere:'Zona seismică E — intensitate moderată. ag=0.20g, Tc=1.6s (Câmpia Moldovei).',
      recomandare:'Fundație directă pe loess consolidat. Verificare obligatorie pentru clădiri >P+3E.',
    },
    // Hidrologie și geotehnică
    hidro:{
      nfa:'2.0-5.0m',
      tip_sol:'Loess, argilă prăfoasă, nisipuri fine (Câmpia Moldovei de Nord)',
      portanta:'140-190 kPa (loess consolidat)',
      risc_inundabil:'Scăzut general / Mediu în lunca Jijiei și Sitnaului',
      adancime_fundare:'min. 0.9m (adâncime de îngheț 0.90m conf. STAS 6054)',
      clasa_geotehnica:'2 (risc moderat)',
      studiu_obligatoriu:'Da — NP 074/2014 pentru orice clădire',
      rauri_principale:['Jijia','Sitnau','Dresleuca','Miletin'],
      risc_inundare_jijia:'Zonă de risc ridicat — Plan Management Bazin Hidrografic Prut-Bârlad',
    },
    // LMI și Patrimoniu (DJCPN Botoșani)
    lmi:{
      cimecRadius:1000,
      zone_protejate:[
        {cod:'BT-II-s-B-02001', tip:'Zonă construită protejată', centru:[26.6635,47.7465], raza:600,
          desc:'Centrul Istoric Botoșani — Zona pieței centrale și str. Calea Națională', aviz:'DJCPN Botoșani + MCID'},
        {cod:'BT-II-s-B-02002', tip:'Ansamblu urban', centru:[26.6712,47.7482], raza:400,
          desc:'Strada Cuza Vodă — ansamblul de arhitectură sec. XIX', aviz:'DJCPN Botoșani'},
      ],
      monumente_reprezentative:[
        {cod:'BT-II-m-A-02001', denumire:'Sinagoga Mare Botoșani', categorie:'A', adresa:'Str. Marchian 17'},
        {cod:'BT-II-m-A-02002', denumire:'Biserica Popăuți (1496)', categorie:'A', adresa:'Str. Popăuți 2'},
        {cod:'BT-II-m-A-02003', denumire:'Turnul Colței (sec. XVII)', categorie:'A', adresa:'Str. Calea Națională'},
        {cod:'BT-II-m-B-02004', denumire:'Palatul Administrativ', categorie:'B', adresa:'Piața Revoluției 1'},
        {cod:'BT-II-m-B-02005', denumire:'Casa natală Eminescu (Ipotești)', categorie:'A', adresa:'Ipotești (com. Mihai Eminescu)'},
        {cod:'BT-II-m-B-02006', denumire:'Liceul Național A.T. Laurian (1859)', categorie:'B', adresa:'Str. Cuza Vodă'},
      ],
      reglementare:'Legea 422/2001 · Ordinul MCID 2828/2015 · PUG Botoșani — zone protejate',
    },
    // Zgomot urban — studiu acustic
    zgomot:{
      zona_acustica:'II — Rezidențial/Mixt urban',
      Lzsn_limita:60, Lnoapte_limita:50,
      surse_principale:[
        'Trafic rutier DN29 (Botoșani—Iași)',
        'Trafic rutier DN29A (Botoșani—Dorohoi)',
        'Nod feroviar CFR Botoșani',
        'Activități comerciale zona centrală',
      ],
      distanta_cale_ferata:400,
      norm:'SR 10009:2017 + HG 321/2005',
    },
    // Vânt — CR 1-1-4/2012
    vant:{
      zona:'III',
      v_ref:30, presiune_vant:0.55,
      directie_dominanta:'NV-NNV (predominant) / NE (iarnă)',
      altitudine_teren:143, // m față de NMN, centrul Botoșanilor
      norm:'CR 1-1-4/2012 · SR EN 1991-1-4:2006',
      factor_teren:'II — câmpie deschisă (Câmpia Moldovei)',
    },
    // Trafic
    trafic:{
      viteza_proiectare:50,
      TMA_ref:8500,
      norm_parcaje:'NP 051/2012 rev.',
      drumuri_nationale:['DN29 (Botoșani—Iași)','DN29A (Botoșani—Dorohoi)','DN29B'],
      acces_transport_public:true,
      linii_autobuz:['1','2','3','4','5','6','7','8'],
      statii_cale_ferata:['Botoșani', 'Catamarești'],
    },
    // Mediu
    mediu:{
      sv_minim_procent:20,
      parcuri_principale:['Parcul Mihai Eminescu','Parcul Cornișa Dresleucei','Grădina Publică'],
      parc_cel_mai_apropiat:'Parcul Mihai Eminescu (centru)',
      arie_protejata_apropiere:'Rezervația de la Stânca-Costești',
      km_arie_protejata:45,
      natura2000_proximitate:[
        'ROSCI0084 Iazurile Miletinului și Başeului — 12km',
        'ROSPA0046 Iazurile de pe Bașeu și Ibăneasa — 18km',
        'ROSCI0062 Dealurile Agapia și Văratec — 75km',
      ],
      aer:{
        apm:'APM Botoșani', apmWeb:'http://apmbt.anpm.ro',
        statii_monitoring:['Botoșani-Urban (BT-1)'],
        poluanti_principali:['NO2 (trafic)','PM10 (trafic + agricultură)'],
        calitate_generala:'Bună — urbanizare moderată, presiune trafic în creștere',
        norm:'Legea 104/2011 + Dir. 2008/50/CE',
      },
      apa:{
        operator:'Nova Apaserv SA Botoșani',
        sursa_apa_potabila:'Lacul Stânca-Costești (Prut) + subteran',
        retea_canalizare:true, grad_conectare:78,
        receptori_naturali:['Râul Jijia','Râul Sitnau'],
        norm:'Legea 107/1996 + Dir. 2000/60/CE',
      },
      sol:{
        tip_sol_predominant:'Cernoziom cambic, loess, argilă prăfoasă',
        permeabilitate:'Scăzută-Medie',
        eroziune:'Risc moderat pe versanți; scăzut în câmpie',
        norm:'OUG 195/2005',
      },
      ins:{
        populatie:106847, // Recensământ 2021
        densitate_pop:1450,
        suprafata_intravilam:3890, // ha
        rata_somaj:4.1,
        venit_mediu_lunar:3600, // RON net estimat
        sursa:'INS — Recensământ 2021 + Fișă localitate 2023',
        ins_web:'https://statistici.insse.ro',
      },
      norm:'Legea 292/2018 (EIM) + OUG 195/2005 + Legea 24/2007 (SV)',
    },
    // Prețuri piață (estimative, €/mp, 2024-2025)
    market:{
      teren_central:120, teren_rezidential:60, teren_periferic:25, teren_extravilan:8,
      constructie_rezidential:800, constructie_comercial:950, constructie_industrial:600,
      vanzare_apartament:900, vanzare_casa:700, chiria_birouri:8,
      sursa:'Olx, Storia, Imobiliare.ro — medii estimative 2025',
    },
  },

  // ── DOROHOI (Municipiu) ──────────────────────────────────────────────────
  'municipiul-dorohoi': {
    label:'Municipiul Dorohoi', short:'Dorohoi',
    judet:'Botoșani', judetCode:'BT', siruta:'30027',
    center:[26.3980,47.9572], zoom:13,
    pugFile:'./data/dorohoi/pug.geojson',
    cadastruIndex:'./data/dorohoi/cadastru_index.json',
    reguliFile:'./data/municipiul-botosani/reguli.json', // folosește reguli județ până la PUG specific
    status:'partial',
    primar:'Primăria Municipiului Dorohoi',
    adresaPrimarie:'Str. Revoluției nr. 1, Dorohoi 715200',
    telefon:'0231 611 490', web:'https://www.primaria-dorohoi.ro',
    daU:'Compartiment Urbanism și Amenajarea Teritoriului',
    djcpn:'DJCPN Botoșani', djcpnEmail:'djcpn.botosani@cultura.ro',
    aeroport:null,
    seism:{zona:'E',ag:0.20,Tc:1.6,MSK:'VII',norm:'P100-1/2013',
      descriere:'Zona seismică E — similar Botoșani.',
      recomandare:'Fundație directă pe loess. Verificare pentru >P+3E.'},
    hidro:{nfa:'2.5-5.0m',tip_sol:'Loess, argilă (câmpie)',portanta:'130-180 kPa',
      risc_inundabil:'Scăzut / Mediu luncă Jijia-Sitna',
      adancime_fundare:'min. 0.9m',clasa_geotehnica:'2',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:800,
      zone_protejate:[{cod:'BT-II-s-B-03001',tip:'Centru urban protejat',centru:[26.3980,47.9572],raza:400,
        desc:'Centrul istoric Dorohoi',aviz:'DJCPN Botoșani'}],
      monumente_reprezentative:[
        {cod:'BT-II-m-A-03001',denumire:'Biserica Sf. Gheorghe Dorohoi (1495)',categorie:'A',adresa:'Str. Victoriei'},
        {cod:'BT-II-m-B-03002',denumire:'Casa Memorială George Enescu',categorie:'B',adresa:'Str. Enescu'},
      ],
      reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic DN29A','Nod feroviar Dorohoi'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:4500,norm_parcaje:'NP 051/2012 rev.',
      drumuri_nationale:['DN29A'],acces_transport_public:true},
    mediu:{sv_minim_procent:20,parcuri_principale:['Parcul Central Dorohoi'],
      apa:{operator:'Nova Apaserv SA',sursa_apa_potabila:'Subteran + Siret',retea_canalizare:true},
      ins:{populatie:26800,sursa:'INS 2021'},norm:'Legea 24/2007'},
    market:{teren_central:60,teren_rezidential:30,teren_extravilan:5,
      constructie_rezidential:750,vanzare_apartament:750,sursa:'Estimativ 2025'},
  },

  // ── ORAȘE JUDEȚUL BOTOȘANI ───────────────────────────────────────────────
  'oras-darabani': {
    label:'Orașul Darabani', short:'Darabani',
    judet:'Botoșani', judetCode:'BT', siruta:'31868',
    center:[26.5773,48.1829], zoom:13,
    cadastruIndex:'./data/darabani/cadastru_index.json',
    reguliFile:'./data/municipiul-botosani/reguli.json',
    status:'partial', primar:'Primăria Orașului Darabani',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Botoșani',
    aeroport:null,
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'2.0-5.0m',tip_sol:'Loess',portanta:'130-170 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:600,zone_protejate:[],monumente_reprezentative:[],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic local'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'I'},
    trafic:{viteza_proiectare:50,TMA_ref:2000,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
    market:{teren_central:30,teren_rezidential:15,constructie_rezidential:700,vanzare_apartament:600},
  },
  'oras-saveni': {
    label:'Orașul Săveni', short:'Săveni',
    judet:'Botoșani', judetCode:'BT', siruta:'37015',
    center:[26.8599,47.9564], zoom:13,
    cadastruIndex:'./data/saveni/cadastru_index.json',
    reguliFile:'./data/municipiul-botosani/reguli.json',
    status:'partial', primar:'Primăria Orașului Săveni',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Botoșani',
    aeroport:null,
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'2.5-5.0m',tip_sol:'Loess, cernoziom',portanta:'140-180 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:600,zone_protejate:[],monumente_reprezentative:[],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic local'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'I'},
    trafic:{viteza_proiectare:50,TMA_ref:1800,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
    market:{teren_central:25,teren_rezidential:12,constructie_rezidential:700,vanzare_apartament:580},
  },
  'oras-flamanzi': {
    label:'Orașul Flămânzi', short:'Flămânzi',
    judet:'Botoșani', judetCode:'BT', siruta:'33274',
    center:[26.8929,47.5558], zoom:13,
    cadastruIndex:'./data/flamanzi/cadastru_index.json',
    reguliFile:'./data/municipiul-botosani/reguli.json',
    status:'partial', primar:'Primăria Orașului Flămânzi',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Botoșani',
    aeroport:null,
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'3.0-6.0m',tip_sol:'Loess, argilă',portanta:'130-160 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:500,zone_protejate:[],monumente_reprezentative:[],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic local','CFR'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'I'},
    trafic:{viteza_proiectare:50,TMA_ref:1500,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
    market:{teren_central:20,teren_rezidential:10,constructie_rezidential:680,vanzare_apartament:550},
  },
  'oras-bucecea': {
    label:'Orașul Bucecea', short:'Bucecea',
    judet:'Botoșani', judetCode:'BT', siruta:'30143',
    center:[26.4640,47.7757], zoom:13,
    cadastruIndex:'./data/bucecea/cadastru_index.json',
    reguliFile:'./data/municipiul-botosani/reguli.json',
    status:'partial', primar:'Primăria Orașului Bucecea',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Botoșani',
    aeroport:null,
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'2.0-4.0m',tip_sol:'Loess',portanta:'140-180 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:500,zone_protejate:[],monumente_reprezentative:[],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic DN29C'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'I'},
    trafic:{viteza_proiectare:50,TMA_ref:1200,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
    market:{teren_central:25,teren_rezidential:12,constructie_rezidential:700,vanzare_apartament:560},
  },
  'oras-stefanesti': {
    label:'Orașul Ștefănești', short:'Ștefănești',
    judet:'Botoșani', judetCode:'BT', siruta:'37695',
    center:[27.2063,47.7314], zoom:13,
    cadastruIndex:'./data/stefanesti/cadastru_index.json',
    reguliFile:'./data/municipiul-botosani/reguli.json',
    status:'partial', primar:'Primăria Orașului Ștefănești',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Botoșani',
    aeroport:null,
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'2.0-4.5m',tip_sol:'Loess, cernoziom',portanta:'150-190 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:500,zone_protejate:[],monumente_reprezentative:[{cod:'BT-II-m-B-05001',denumire:'Mânăstirea Vorona (1775)',categorie:'B',adresa:'com. Vorona'}],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic local'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'I'},
    trafic:{viteza_proiectare:50,TMA_ref:1000,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,natura2000_proximitate:['ROSCI0084 Iazurile Miletinului — 8km'],norm:'Legea 24/2007'},
    market:{teren_central:20,teren_rezidential:10,constructie_rezidential:680,vanzare_apartament:540},
  },

  // ── SUCEAVA ─────────────────────────────────────────────────────────────

  'municipiul-suceava': {
    label:'Municipiul Suceava', short:'Suceava',
    judet:'Suceava', judetCode:'SV', siruta:'285386',
    center:[26.2531,47.6535], zoom:13,
    pugFile:'./data/suceava/pug.geojson',
    cadastruIndex:'./data/suceava/cadastru_index.json',
    reguliFile:'./data/suceava/reguli.json',
    status:'empty',
    primar:'Primăria Municipiului Suceava',
    daU:'Direcția de Urbanism și Amenajarea Teritoriului',
    djcpn:'DJCPN Suceava', djcpnEmail:'djcpn.suceava@cultura.ro',
    aeroport:{icao:'LRSV',prag08:[26.3542,47.6874],prag26:[26.3699,47.6887],elevatie:1375,
      lungimePista:2400,latimePista:45,
      reglementare:'HG 930/2016 + Legea 233/2016',
      note:'Aeroportul Ștefan cel Mare Suceava — trafic internațional'},
    seism:{zona:'E',ag:0.20,Tc:1.0,MSK:'VII',norm:'P100-1/2013',
      descriere:'Zona seismică E, perioadă colț Tc=1.0s (diferit față de Iași).',
      recomandare:'Fundație directă posibilă. Verificare pentru clădiri >P+3.'},
    hidro:{nfa:'2.0-6.0m',tip_sol:'Argilă, pietriș (vale Suceava)',portanta:'160-220 kPa',
      risc_inundabil:'Mediu (lunca Sucevei)',adancime_fundare:'min. 1.0m',clasa_geotehnica:'2',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1500,
      zone_protejate:[
        {cod:'SV-II-s-A-05001',tip:'Ansamblu medieval',centru:[26.2531,47.6535],raza:600,
          desc:'Cetatea de Scaun a Sucevei și zona adiacentă',aviz:'DJCPN Suceava + MCID'},
        {cod:'SV-II-s-B-05002',tip:'Zonă protejată UNESCO proxim',centru:[26.2800,47.6700],raza:5000,
          desc:'Zona tampon Mănăstirile din Bucovina (UNESCO)',aviz:'DJCPN Suceava + UNESCO'},
      ],
      monumente_reprezentative:[
        {cod:'SV-II-m-A-05001',denumire:'Cetatea de Scaun a Sucevei',categorie:'A',adresa:'Str. Cetății 1'},
        {cod:'SV-II-m-A-05002',denumire:'Mănăstirea Sfântul Ioan cel Nou',categorie:'A',adresa:'Str. Ioan Vodă cel Cumplit'},
      ],
      reglementare:'Legea 422/2001 · UNESCO World Heritage Buffer Zone · Ordinul MCID 2828/2015'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier DN2 (E85)','Aeroportul LRSV (zgomot aeronave)','Trafic feroviar'],
      distanta_aeroport:8500,norm:'SR 10009:2017 + HG 321/2005'},
    vant:{zona:'III',v_ref:32,presiune_vant:0.60,directie_dominanta:'NV-V',
      norm:'CR 1-1-4/2012',factor_teren:'II — deal cu relief moderat'},
    trafic:{viteza_proiectare:50,TMA_ref:9000,norm_parcaje:'NP 051/2012 rev.',
      acces_transport_public:true},
    mediu:{sv_minim_procent:20,arie_protejata_apropiere:'Parcul Natural Bucovina',norm:'Legea 24/2007'},
  },

  // ── PIATRA-NEAMȚ ────────────────────────────────────────────────────────
  'municipiul-piatra-neamt': {
    label:'Municipiul Piatra-Neamț', short:'Piatra-Neamț',
    judet:'Neamț', judetCode:'NT', siruta:'209890',
    center:[26.3726,46.9264], zoom:13,
    pugFile:'./data/piatra-neamt/pug.geojson',
    cadastruIndex:'./data/piatra-neamt/cadastru_index.json',
    reguliFile:'./data/piatra-neamt/reguli.json',
    status:'empty',
    primar:'Primăria Municipiului Piatra-Neamț',
    daU:'Direcția de Urbanism și Amenajarea Teritoriului',
    djcpn:'DJCPN Neamț', djcpnEmail:'djcpn.neamt@cultura.ro',
    aeroport:null,
    seism:{zona:'E',ag:0.20,Tc:1.0,MSK:'VII',norm:'P100-1/2013',
      descriere:'Zona E, relief montan — verificare suplimentară pentru versanți.',
      recomandare:'ATENȚIE: Relief accidentat! Studiu geotehnic obligatoriu pentru orice construcție pe versant. Risc de alunecare de teren.'},
    hidro:{nfa:'3.0-8.0m',tip_sol:'Pietriș, argilă (vale Bistrița)',portanta:'180-260 kPa',
      risc_inundabil:'Ridicat (lunca Bistriței — zonă inundabilă)',
      adancime_fundare:'min. 1.0m',clasa_geotehnica:'3 (risc ridicat — versanți)',
      studiu_obligatoriu:'Da — obligatoriu, inclusiv studiu stabilitate versant'},
    lmi:{cimecRadius:1200,
      zone_protejate:[
        {cod:'NT-II-s-B-03001',tip:'Zonă construită protejată',centru:[26.3726,46.9264],raza:400,
          desc:'Centrul vechi Piatra-Neamț',aviz:'DJCPN Neamț'},
        {cod:'NT-II-s-A-03002',tip:'Sit UNESCO proxim',centru:[26.4000,46.9700],raza:10000,
          desc:'Mănăstirea Neamț — patrimoniu UNESCO propus',aviz:'DJCPN Neamț + MCID'},
      ],
      monumente_reprezentative:[
        {cod:'NT-II-m-A-03001',denumire:'Curtea Domnească Piatra-Neamț',categorie:'A',adresa:'Str. Mihai Eminescu'},
        {cod:'NT-II-m-A-03002',denumire:'Turnul lui Ștefan cel Mare',categorie:'A',adresa:'Piața Libertății'},
      ],
      reglementare:'Legea 422/2001 · Ordinul MCID 2828/2015'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier DN15','Activități industriale Săvinești'],
      norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:28,presiune_vant:0.50,directie_dominanta:'V (canal Bistrița)',
      norm:'CR 1-1-4/2012',
      factor_teren:'III — teren cu obstacole (depresiune montană)',
      note:'Effect de canalizare a vântului pe Valea Bistriței — viteze locale pot depăși valorile zonale.'},
    trafic:{viteza_proiectare:50,TMA_ref:7000,norm_parcaje:'NP 051/2012 rev.',
      acces_transport_public:true},
    mediu:{sv_minim_procent:20,arie_protejata_apropiere:'Parcul Natural Vânători Neamț (12km)',norm:'Legea 24/2007'},
  },

  // ── ROMAN ────────────────────────────────────────────────────────────────
  'municipiul-roman': {
    label:'Municipiul Roman', short:'Roman',
    judet:'Neamț', judetCode:'NT', siruta:'209912',
    center:[26.9265,46.9219], zoom:13,
    pugFile:'./data/roman/pug.geojson',
    cadastruIndex:'./data/roman/cadastru_index.json',
    reguliFile:'./data/roman/reguli.json',
    status:'empty',
    primar:'Primăria Municipiului Roman',
    daU:'Direcția de Urbanism Roman',
    djcpn:'DJCPN Neamț', djcpnEmail:'djcpn.neamt@cultura.ro',
    aeroport:null,
    seism:{zona:'E',ag:0.20,Tc:1.6,MSK:'VII',norm:'P100-1/2013',
      descriere:'Zona E — câmpie, condiții bune de fundare.',
      recomandare:'Fundație directă. Verificare la clădiri >P+4.'},
    hidro:{nfa:'1.5-4.0m',tip_sol:'Aluviuni Moldova, argilă',portanta:'150-210 kPa',
      risc_inundabil:'Mediu (confluența Moldova-Siret)',adancime_fundare:'min. 0.9m',
      clasa_geotehnica:'2',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1000,
      zone_protejate:[
        {cod:'NT-II-s-B-03010',tip:'Zonă construită protejată',centru:[26.9265,46.9219],raza:350,
          desc:'Centrul istoric Roman — Episcopia Romanului',aviz:'DJCPN Neamț'},
      ],
      monumente_reprezentative:[
        {cod:'NT-II-m-A-03010',denumire:'Catedrala Episcopiei Romanului',categorie:'A',adresa:'Str. Episcopiei 1'},
      ],
      reglementare:'Legea 422/2001 · Ordinul MCID 2828/2015'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier DN2 (E85)','Trafic feroviar Roman'],
      norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',
      norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:8500,norm_parcaje:'NP 051/2012 rev.',
      acces_transport_public:true},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },

  // ── BACĂU ────────────────────────────────────────────────────────────────
  'municipiul-bacau': {
    label:'Municipiul Bacău', short:'Bacău',
    judet:'Bacău', judetCode:'BC', siruta:'21562',
    center:[26.9130,46.5670], zoom:13,
    pugFile:'./data/bacau/pug.geojson',
    cadastruIndex:'./data/bacau/cadastru_index.json',
    reguliFile:'./data/bacau/reguli.json',
    status:'empty',
    primar:'Primăria Municipiului Bacău',
    daU:'Direcția de Urbanism și Amenajarea Teritoriului Bacău',
    djcpn:'DJCPN Bacău', djcpnEmail:'djcpn.bacau@cultura.ro',
    aeroport:{icao:'LRBC',prag08:[26.9101,46.5216],prag26:[26.9236,46.5196],elevatie:524,
      lungimePista:2500,latimePista:45,
      reglementare:'HG 930/2016 + Legea 233/2016',
      note:'Aeroportul Internațional George Enescu Bacău — trafic internațional'},
    seism:{zona:'D',ag:0.25,Tc:1.6,MSK:'VII-VIII',norm:'P100-1/2013',
      descriere:'Zona seismică D — intensitate moderată-ridicată. ag=0.25g.',
      recomandare:'Fundație directă cu calcul seismic obligatoriu. Clădiri >P+3 necesită verificare structurală specială.'},
    hidro:{nfa:'1.5-4.0m',tip_sol:'Aluviuni Bistrița/Siret, nisip',portanta:'160-220 kPa',
      risc_inundabil:'Mediu (lunca Bistriței)',adancime_fundare:'min. 0.9m',
      clasa_geotehnica:'2',studiu_obligatoriu:'Da — obligatoriu cf. NP 074/2014'},
    lmi:{cimecRadius:1000,
      zone_protejate:[
        {cod:'BC-II-s-B-02001',tip:'Zonă construită protejată',centru:[26.9130,46.5670],raza:400,
          desc:'Centrul istoric Bacău',aviz:'DJCPN Bacău'},
      ],
      monumente_reprezentative:[
        {cod:'BC-II-m-A-02001',denumire:'Biserica Precista',categorie:'A',adresa:'Str. 9 Mai 70'},
        {cod:'BC-II-m-B-02002',denumire:'Casa Roset-Roznovanu',categorie:'B',adresa:'Bd. Unirii 2'},
      ],
      reglementare:'Legea 422/2001 · Ordinul MCID 2828/2015'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier DN2 (E85)','Aeroportul LRBC','Trafic feroviar CFR','Platforma industrială'],
      distanta_aeroport:6000,norm:'SR 10009:2017 + HG 321/2005'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV-V',
      norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:11000,norm_parcaje:'NP 051/2012 rev.',
      acces_transport_public:true,linii_autobuz:['1','2','3','4','5','6','7','8']},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },

  // ── VASLUI ───────────────────────────────────────────────────────────────
  'municipiul-vaslui': {
    label:'Municipiul Vaslui', short:'Vaslui',
    judet:'Vaslui', judetCode:'VS', siruta:'330379',
    center:[27.7305,46.6409], zoom:13,
    pugFile:'./data/vaslui/pug.geojson',
    cadastruIndex:'./data/vaslui/cadastru_index.json',
    reguliFile:'./data/vaslui/reguli.json',
    status:'empty',
    primar:'Primăria Municipiului Vaslui',
    daU:'Serviciul de Urbanism și Amenajarea Teritoriului',
    djcpn:'DJCPN Vaslui', djcpnEmail:'djcpn.vaslui@cultura.ro',
    aeroport:null,
    seism:{zona:'E',ag:0.20,Tc:1.6,MSK:'VII',norm:'P100-1/2013',
      descriere:'Zona seismică E — câmpie moldovenească, condiții bune.',
      recomandare:'Fundație directă. Verificare standard.'},
    hidro:{nfa:'2.0-5.0m',tip_sol:'Argilă prăfoasă, loess (Podișul Central Moldovenesc)',portanta:'140-200 kPa',
      risc_inundabil:'Scăzut-Mediu',adancime_fundare:'min. 0.9m',clasa_geotehnica:'2',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1000,
      zone_protejate:[
        {cod:'VS-II-s-B-06001',tip:'Zonă construită protejată',centru:[27.7305,46.6409],raza:350,
          desc:'Centrul civic Vaslui',aviz:'DJCPN Vaslui'},
      ],
      monumente_reprezentative:[
        {cod:'VS-II-m-A-06001',denumire:'Biserica Sf. Ioan Botezătorul (Vaslui)',categorie:'A',adresa:'Str. Ștefan cel Mare'},
      ],
      reglementare:'Legea 422/2001 · Ordinul MCID 2828/2015'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier DN24','Activități comerciale centru'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',
      norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:7500,norm_parcaje:'NP 051/2012 rev.',
      acces_transport_public:true},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },

  // ── BÂRLAD ──────────────────────────────────────────────────────────────
  'municipiul-barlad': {
    label:'Municipiul Bârlad', short:'Bârlad',
    judet:'Vaslui', judetCode:'VS', siruta:'330388',
    center:[27.6726,46.2281], zoom:13,
    pugFile:'./data/barlad/pug.geojson',
    cadastruIndex:'./data/barlad/cadastru_index.json',
    reguliFile:'./data/barlad/reguli.json',
    status:'empty',
    primar:'Primăria Municipiului Bârlad',
    daU:'Compartiment Urbanism Bârlad',
    djcpn:'DJCPN Vaslui', djcpnEmail:'djcpn.vaslui@cultura.ro',
    aeroport:null,
    seism:{zona:'E',ag:0.20,Tc:1.6,MSK:'VII',norm:'P100-1/2013',
      descriere:'Zona seismică E.',recomandare:'Fundație directă standard.'},
    hidro:{nfa:'2.0-4.5m',tip_sol:'Aluviuni Bârlad, argilă',portanta:'150-210 kPa',
      risc_inundabil:'Mediu (lunca Bârladului)',adancime_fundare:'min. 0.9m',
      clasa_geotehnica:'2',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1000,
      zone_protejate:[],
      monumente_reprezentative:[
        {cod:'VS-II-m-B-06010',denumire:'Teatrul Victor Ion Popa',categorie:'B',adresa:'Str. Vasile Pârvan 1'},
      ],
      reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier DN24'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',
      norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:7000,norm_parcaje:'NP 051/2012 rev.',acces_transport_public:true},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },

  // ── FOCȘANI ──────────────────────────────────────────────────────────────
  'municipiul-focsani': {
    label:'Municipiul Focșani', short:'Focșani',
    judet:'Vrancea', judetCode:'VN', siruta:'162044',
    center:[27.1856,45.6977], zoom:13,
    pugFile:'./data/focsani/pug.geojson',
    cadastruIndex:'./data/focsani/cadastru_index.json',
    reguliFile:'./data/focsani/reguli.json',
    status:'empty',
    primar:'Primăria Municipiului Focșani',
    daU:'Direcția de Urbanism Focșani',
    djcpn:'DJCPN Vrancea', djcpnEmail:'djcpn.vrancea@cultura.ro',
    aeroport:null,
    seism:{zona:'B',ag:0.35,Tc:1.6,MSK:'VIII-IX',norm:'P100-1/2013',
      descriere:'⚠️ ZONĂ SEISMICĂ CRITICĂ — Epicentrul Vrancea. ag=0.35g, MSK VIII-IX.',
      recomandare:'STUDIU SEISMIC OBLIGATORIU! Proiectare structurală specială pentru toate clădirile. Consultare expert IS (inginer seismolog) obligatorie.'},
    hidro:{nfa:'1.0-3.0m',tip_sol:'Aluviuni Putna/Milcov',portanta:'140-200 kPa',
      risc_inundabil:'Mediu',adancime_fundare:'min. 1.0m',
      clasa_geotehnica:'3 (risc seismic ridicat)',
      studiu_obligatoriu:'Da — studiu geotehnic + raport seismic de amplasament obligatorii'},
    lmi:{cimecRadius:1000,
      zone_protejate:[
        {cod:'VN-II-s-B-07001',tip:'Zonă construită protejată',centru:[27.1856,45.6977],raza:400,
          desc:'Centrul istoric Focșani',aviz:'DJCPN Vrancea'},
      ],
      monumente_reprezentative:[
        {cod:'VN-II-m-A-07001',denumire:'Monumentul Unirii',categorie:'A',adresa:'Str. Cuza Vodă'},
      ],
      reglementare:'Legea 422/2001 · Ordinul MCID 2828/2015'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier DN2 (E85)','Trafic feroviar — nod important'],
      norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:32,presiune_vant:0.60,directie_dominanta:'NV',
      norm:'CR 1-1-4/2012',factor_teren:'II',
      note:'Culoarul Siretului — vânturi canalate din NV.'},
    trafic:{viteza_proiectare:50,TMA_ref:9500,norm_parcaje:'NP 051/2012 rev.',
      acces_transport_public:true},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },

  // ── CLUJ-NAPOCA ───────────────────────────────────────────────────────────
  'municipiul-cluj-napoca': {
    label:'Municipiul Cluj-Napoca', short:'Cluj-Napoca',
    judet:'Cluj', judetCode:'CJ', siruta:'54984',
    center:[23.5989,46.7712], zoom:13,
    pugFile:'./data/cluj-napoca/pug.geojson',
    cadastruIndex:'./data/cluj-napoca/cadastru_index.json',
    reguliFile:'./data/cluj-napoca/reguli.json',
    status:'empty',
    primar:'Primăria Municipiului Cluj-Napoca',
    daU:'Direcția Generală de Urbanism Cluj-Napoca',
    djcpn:'DJCPN Cluj', djcpnEmail:'djcpn.cluj@cultura.ro',
    aeroport:{icao:'LRCL',prag08:[23.6860,46.7853],prag26:[23.7102,46.7791],elevatie:322,
      lungimePista:3400,latimePista:45,
      reglementare:'HG 930/2016 + Legea 233/2016',
      note:'Aeroportul Internațional Avram Iancu Cluj — aeroport major'},
    seism:{zona:'F',ag:0.10,Tc:0.7,MSK:'VI-VII',norm:'P100-1/2013',
      descriere:'Zona seismică F — intensitate scăzută. Condiții favorabile.',
      recomandare:'Fundație directă fără restricții seismice speciale. Verificare standard.'},
    hidro:{nfa:'2.0-5.0m',tip_sol:'Argilă, pietriș',portanta:'180-250 kPa',
      risc_inundabil:'Scăzut-Mediu (lunca Someșului)',adancime_fundare:'min. 0.8m',
      clasa_geotehnica:'1-2',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1200,
      zone_protejate:[
        {cod:'CJ-II-s-A-08001',tip:'Centru istoric',centru:[23.5989,46.7712],raza:700,
          desc:'Centrul Istoric Cluj-Napoca',aviz:'DJCPN Cluj + MCID'},
      ],
      monumente_reprezentative:[
        {cod:'CJ-II-m-A-08001',denumire:'Catedrala Sf. Mihail',categorie:'A',adresa:'Piața Unirii'},
        {cod:'CJ-II-m-A-08002',denumire:'Palatul Bánffy',categorie:'A',adresa:'Piața Unirii 30'},
      ],
      reglementare:'Legea 422/2001 · PUZ Centru Istoric Cluj · Ordinul MCID 2828/2015'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier inel 1/2/3','Aeroportul LRCL','Trafic feroviar'],
      distanta_aeroport:8000,norm:'SR 10009:2017 + HG 321/2005'},
    vant:{zona:'II',v_ref:28,presiune_vant:0.50,directie_dominanta:'NV',
      norm:'CR 1-1-4/2012',factor_teren:'III — depresiune Someș'},
    trafic:{viteza_proiectare:50,TMA_ref:18000,norm_parcaje:'NP 051/2012 rev.',
      acces_transport_public:true,linii_tramvai:['1','2','3','4'],
      linii_autobuz:['1','2','3','4','5','6','7','8','9','10','24','27','29','35','36','38','40','44']},
    mediu:{sv_minim_procent:20,arie_protejata_apropiere:'Pădurea Hoia (ROSCI0090)',norm:'Legea 24/2007'},
  },

  // ── TIMIȘOARA ─────────────────────────────────────────────────────────────
  'municipiul-timisoara': {
    label:'Municipiul Timișoara', short:'Timișoara',
    judet:'Timiș', judetCode:'TM', siruta:'318670',
    center:[21.2087,45.7489], zoom:13,
    pugFile:'./data/timisoara/pug.geojson',
    cadastruIndex:'./data/timisoara/cadastru_index.json',
    reguliFile:'./data/timisoara/reguli.json',
    status:'empty',
    primar:'Primăria Municipiului Timișoara',
    daU:'Direcția Urbanism Timișoara',
    djcpn:'DJCPN Timiș', djcpnEmail:'djcpn.timis@cultura.ro',
    aeroport:{icao:'LRTR',prag08:[21.3376,45.8099],prag26:[21.3194,45.8051],elevatie:348,
      lungimePista:3500,latimePista:45,
      reglementare:'HG 930/2016 + Legea 233/2016',
      note:'Aeroportul Internațional Traian Vuia Timișoara — hub major'},
    seism:{zona:'E',ag:0.20,Tc:1.0,MSK:'VII',norm:'P100-1/2013',
      descriere:'Zona E, perioadă colț Tc=1.0s.',
      recomandare:'Verificare seismică standard. Fundație directă posibilă pe teren aluvionar compactat.'},
    hidro:{nfa:'1.0-3.0m',tip_sol:'Aluviuni, nisip',portanta:'120-180 kPa',
      risc_inundabil:'Mediu (râul Bega)',adancime_fundare:'min. 0.9m',
      clasa_geotehnica:'2',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1200,
      zone_protejate:[
        {cod:'TM-II-s-A-09001',tip:'Centru istoric',centru:[21.2087,45.7489],raza:800,
          desc:'Centrul Istoric Timișoara — Piața Unirii/Victoriei',aviz:'DJCPN Timiș + MCID'},
        {cod:'TM-II-s-A-09002',tip:'Zona Fabric',centru:[21.2200,45.7500],raza:500,
          desc:'Zona Fabric — patrimoniu industrial',aviz:'DJCPN Timiș'},
      ],
      monumente_reprezentative:[
        {cod:'TM-II-m-A-09001',denumire:'Catedrala Mitropolitană',categorie:'A',adresa:'Piața Victoriei'},
        {cod:'TM-II-m-A-09002',denumire:'Opera Națională',categorie:'A',adresa:'Piața Victoriei 1'},
      ],
      reglementare:'Legea 422/2001 · PUZ Centru Istoric Timișoara · Capitală Culturală Europeană 2023'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier inel 1/2','Aeroportul LRTR','Trafic feroviar nod Timișoara'],
      distanta_aeroport:12000,norm:'SR 10009:2017 + HG 321/2005'},
    vant:{zona:'III',v_ref:32,presiune_vant:0.60,directie_dominanta:'V-NV (Câmpia Panonică)',
      norm:'CR 1-1-4/2012',factor_teren:'I-II — câmpie deschisă',
      note:'Câmpia de Vest — vânturi dominante din vest, viteze semnificative la etaje superioare.'},
    trafic:{viteza_proiectare:50,TMA_ref:16000,norm_parcaje:'NP 051/2012 rev.',
      acces_transport_public:true,linii_tramvai:['1','2','4','6','7','8','9'],
      linii_autobuz:['3','11','13','14','15','16','18','21','22','28','33','36','40','41','43','46']},
    mediu:{sv_minim_procent:20,arie_protejata_apropiere:'Parcul Natural Lunca Mureșului',norm:'Legea 24/2007'},
  },

  // ── BRAȘOV ────────────────────────────────────────────────────────────────
  'municipiul-brasov': {
    label:'Municipiul Brașov', short:'Brașov',
    judet:'Brașov', judetCode:'BV', siruta:'40198',
    center:[25.5976,45.6427], zoom:13,
    pugFile:'./data/brasov/pug.geojson',
    cadastruIndex:'./data/brasov/cadastru_index.json',
    reguliFile:'./data/brasov/reguli.json',
    status:'empty',
    primar:'Primăria Municipiului Brașov',
    daU:'Direcția Urbanism și Amenajarea Teritoriului',
    djcpn:'DJCPN Brașov', djcpnEmail:'djcpn.brasov@cultura.ro',
    aeroport:null, // LRBV Brașov-Ghimbav în construcție
    seism:{zona:'D',ag:0.25,Tc:1.0,MSK:'VIII',norm:'P100-1/2013',
      descriere:'Zona D — intensitate moderată-ridicată. ag=0.25g.',
      recomandare:'Calcul seismic obligatoriu pentru toate clădirile. Depresiunea Brașov — amplificare locală posibilă.'},
    hidro:{nfa:'2.0-6.0m',tip_sol:'Argilă, pietriș montan',portanta:'150-220 kPa',
      risc_inundabil:'Scăzut-Mediu',adancime_fundare:'min. 1.0m (îngheț altitudinal)',
      clasa_geotehnica:'2',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1200,
      zone_protejate:[
        {cod:'BV-II-s-A-10001',tip:'Centru istoric medieval',centru:[25.5976,45.6427],raza:800,
          desc:'Centrul Vechi Brașov — Cetate medievală sași',aviz:'DJCPN Brașov + MCID'},
      ],
      monumente_reprezentative:[
        {cod:'BV-II-m-A-10001',denumire:'Biserica Neagră',categorie:'A',adresa:'Curtea Johannes Honterus 2'},
        {cod:'BV-II-m-A-10002',denumire:'Cetățuia Brașovului',categorie:'A',adresa:'Str. Vânătorilor'},
      ],
      reglementare:'Legea 422/2001 · PUZ Centru Istoric Brașov · Ordinul MCID 2828/2015'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier DN1 (A3)','Trafic feroviar nod Brașov','Activități industriale Tractorul'],
      norm:'SR 10009:2017 + HG 321/2005'},
    vant:{zona:'III',v_ref:28,presiune_vant:0.50,directie_dominanta:'NV (culoarul Prahovei)',
      norm:'CR 1-1-4/2012',factor_teren:'III — depresiune montană',
      note:'Depresiunea Brașovului — efecte de adăpost. Culoarul Prahovei generează vânturi canalate.'},
    trafic:{viteza_proiectare:50,TMA_ref:14000,norm_parcaje:'NP 051/2012 rev.',
      acces_transport_public:true},
    mediu:{sv_minim_procent:20,arie_protejata_apropiere:'Parcul Natural Bucegi / Parcul Natural Piatra Craiului',norm:'Legea 24/2007'},
  },

  // ── CONSTANȚA ─────────────────────────────────────────────────────────────
  'municipiul-constanta': {
    label:'Municipiul Constanța', short:'Constanța',
    judet:'Constanța', judetCode:'CT', siruta:'60928',
    center:[28.6573,44.1733], zoom:13,
    pugFile:'./data/constanta/pug.geojson',
    cadastruIndex:'./data/constanta/cadastru_index.json',
    reguliFile:'./data/constanta/reguli.json',
    status:'empty',
    primar:'Primăria Municipiului Constanța',
    daU:'Direcția Urbanism Constanța',
    djcpn:'DJCPN Constanța', djcpnEmail:'djcpn.constanta@cultura.ro',
    aeroport:{icao:'LRCK',prag08:[28.4881,44.2183],prag26:[28.5144,44.2083],elevatie:59,
      lungimePista:3500,latimePista:45,
      reglementare:'HG 930/2016 + Legea 233/2016',
      note:'Aeroportul Internațional Mihail Kogălniceanu'},
    seism:{zona:'C',ag:0.35,Tc:0.7,MSK:'VIII',norm:'P100-1/2013',
      descriere:'Zona C — intensitate ridicată. ag=0.35g, Tc=0.7s (risc structuri înalte).',
      recomandare:'Studiu seismic obligatoriu. Atenție la structuri flexibile — Tc mic favorizează clădiri rigide.'},
    hidro:{nfa:'1.5-4.0m',tip_sol:'Loess, calcar',portanta:'200-300 kPa',
      risc_inundabil:'Scăzut (platou litoral)',adancime_fundare:'min. 0.9m',
      clasa_geotehnica:'2',studiu_obligatoriu:'Da — teren karstificat posibil'},
    lmi:{cimecRadius:1500,
      zone_protejate:[
        {cod:'CT-II-s-A-11001',tip:'Sit arheologic Tomis',centru:[28.6573,44.1733],raza:600,
          desc:'Cetatea Tomis — patrimoniu greco-roman',aviz:'DJCPN Constanța + MCID'},
      ],
      monumente_reprezentative:[
        {cod:'CT-II-m-A-11001',denumire:'Moscheea Carol I',categorie:'A',adresa:'Str. Arhiepiscopiei 5'},
        {cod:'CT-II-m-A-11002',denumire:'Edificiul Roman cu Mozaic',categorie:'A',adresa:'Str. Ovid 1'},
      ],
      reglementare:'Legea 422/2001 · Zona de protecție sit arheologic · OG 43/2000 (situri arheologice)'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier A2 (Autostrada Soarelui)','Portul Constanța','Aeroportul LRCK'],
      norm:'SR 10009:2017 + HG 321/2005'},
    vant:{zona:'I',v_ref:38,presiune_vant:0.90,directie_dominanta:'N-NE (Crivăț de pe Marea Neagră)',
      norm:'CR 1-1-4/2012',factor_teren:'I — câmpie litorală fără obstacole',
      note:'ATENȚIE: Zona litorală — viteze vânt semnificativ mai mari! Presiune vânt 0.90 kN/mp (față de 0.55 zona III).'},
    trafic:{viteza_proiectare:50,TMA_ref:15000,norm_parcaje:'NP 051/2012 rev.',
      acces_transport_public:true},
    mediu:{sv_minim_procent:20,arie_protejata_apropiere:'Rezervația Biosferei Delta Dunării (90km)',norm:'Legea 24/2007'},
  },

  // ── BUCUREȘTI ─────────────────────────────────────────────────────────────
  'municipiul-bucuresti': {
    label:'Municipiul București', short:'București',
    judet:'Ilfov', judetCode:'B', siruta:'179141',
    center:[26.0974,44.4268], zoom:12,
    pugFile:'./data/bucuresti/pug.geojson',
    cadastruIndex:'./data/bucuresti/cadastru_index.json',
    reguliFile:'./data/bucuresti/reguli.json',
    status:'empty',
    primar:'Primăria Generală a Municipiului București',
    daU:'ALPAB + Direcțiile Urbanism ale sectoarelor',
    djcpn:'DJCPN București', djcpnEmail:'djcpn.bucuresti@cultura.ro',
    aeroport:{icao:'LROP',prag08:[26.0851,44.5722],prag26:[26.1063,44.5711],elevatie:314,
      lungimePista:3500,latimePista:60,
      reglementare:'HG 930/2016 + Legea 233/2016',
      note:'Aeroportul Internațional Henri Coandă (Otopeni) — hub național major'},
    seism:{zona:'B',ag:0.30,Tc:1.6,MSK:'VIII',norm:'P100-1/2013',
      descriere:'Zona seismică B — intensitate ridicată. ag=0.30g. Efectul cutremurelor Vrancea.',
      recomandare:'STUDIU SEISMIC OBLIGATORIU pentru toate clădirile. Expert tehnic IS obligatoriu >P+3. Atenție la clădiri existente neconsolidate.'},
    hidro:{nfa:'1.0-4.0m',tip_sol:'Argilă, nisip (Câmpia Vlăsiei)',portanta:'150-200 kPa',
      risc_inundabil:'Scăzut-Mediu (colectori pluviometrici)',adancime_fundare:'min. 0.9m',
      clasa_geotehnica:'2',studiu_obligatoriu:'Da — obligatoriu cf. NP 074/2014'},
    lmi:{cimecRadius:2000,
      zone_protejate:[
        {cod:'B-II-s-A-00001',tip:'Centru Istoric',centru:[26.0974,44.4268],raza:1200,
          desc:'Centrul Istoric București',aviz:'DJCPN București + MCID'},
        {cod:'B-II-s-B-00002',tip:'Zona Cotroceni',centru:[26.0700,44.4350],raza:500,
          desc:'Ansamblul Palatul Cotroceni',aviz:'DJCPN București + Administrația Prezidențială'},
      ],
      monumente_reprezentative:[
        {cod:'B-II-m-A-00001',denumire:'Palatul CEC',categorie:'A',adresa:'Calea Victoriei 13'},
        {cod:'B-II-m-A-00002',denumire:'Ateneul Român',categorie:'A',adresa:'Str. Benjamin Franklin 1'},
        {cod:'B-II-m-A-00003',denumire:'Palatul Parlamentului',categorie:'A',adresa:'Str. Izvor 2-4'},
      ],
      reglementare:'Legea 422/2001 · PUZ Centru Istoric București · Ordinul MCID 2828/2015'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Trafic rutier inele 1-3','Metrou (zgomot structural)','Aeroportul LROP','CFR București Nord'],
      distanta_aeroport:18000,norm:'SR 10009:2017 + HG 321/2005'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',
      norm:'CR 1-1-4/2012',factor_teren:'II — câmpie cu construcții dese',
      note:'Efectul de canyon urban în zonele dense — viteze locale mărite pe coridoare stradale.'},
    trafic:{viteza_proiectare:50,TMA_ref:35000,norm_parcaje:'NP 051/2012 rev.',
      acces_transport_public:true,
      linii_metrou:['M1','M2','M3','M4','M5'],
      linii_tramvai:['1','10','11','16','21','25','32','40','41','42','44','55'],},
    mediu:{sv_minim_procent:20,arie_protejata_apropiere:'Parcul Natural Comana (40km)',norm:'Legea 24/2007'},
  },

  // ── UAT-uri Moldova mici — structură minimă pregătită ────────────────────
  'oras-dorohoi':{ label:'Orașul Dorohoi',short:'Dorohoi',judet:'Botoșani',judetCode:'BT',siruta:'30027',
    center:[26.3975,47.9572],zoom:13,pugFile:'./data/dorohoi/pug.geojson',cadastruIndex:'./data/dorohoi/cadastru_index.json',
    reguliFile:'./data/dorohoi/reguli.json',status:'empty',primar:'Primăria Orașului Dorohoi',
    daU:'Compartiment Urbanism',djcpn:'DJCPN Botoșani',
    aeroport:null,seism:{zona:'E',ag:0.20,Tc:1.6,MSK:'VII',norm:'P100-1/2013'},
    hidro:{nfa:'2.5-5.0m',tip_sol:'Loess, argilă',portanta:'130-180 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:800,zone_protejate:[],monumente_reprezentative:[],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic DN29A'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:4000,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },
  'municipiul-falticeni':{ label:'Municipiul Fălticeni',short:'Fălticeni',judet:'Suceava',judetCode:'SV',siruta:'285402',
    center:[26.3022,47.4581],zoom:13,pugFile:'./data/falticeni/pug.geojson',cadastruIndex:'./data/falticeni/cadastru_index.json',
    reguliFile:'./data/falticeni/reguli.json',status:'empty',primar:'Primăria Municipiului Fălticeni',
    daU:'Compartiment Urbanism',djcpn:'DJCPN Suceava',
    aeroport:null,seism:{zona:'E',ag:0.20,Tc:1.0,MSK:'VII',norm:'P100-1/2013'},
    hidro:{nfa:'2.5-5.5m',tip_sol:'Argilă, loess',portanta:'150-200 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1000,zone_protejate:[{cod:'SV-II-s-B-05010',tip:'Zonă protejată',centru:[26.3022,47.4581],raza:300,desc:'Centrul Fălticeni',aviz:'DJCPN Suceava'}],monumente_reprezentative:[],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic DN2'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:5000,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },
  'municipiul-radauti':{ label:'Municipiul Rădăuți',short:'Rădăuți',judet:'Suceava',judetCode:'SV',siruta:'285561',
    center:[25.9192,47.8456],zoom:13,pugFile:'./data/radauti/pug.geojson',cadastruIndex:'./data/radauti/cadastru_index.json',
    reguliFile:'./data/radauti/reguli.json',status:'empty',primar:'Primăria Municipiului Rădăuți',
    daU:'Compartiment Urbanism',djcpn:'DJCPN Suceava',
    aeroport:null,seism:{zona:'E',ag:0.20,Tc:1.0,MSK:'VII',norm:'P100-1/2013'},
    hidro:{nfa:'1.5-4.0m',tip_sol:'Argilă, pietriș glaciar',portanta:'160-220 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1200,zone_protejate:[{cod:'SV-II-s-A-05020',tip:'Ansamblu medieval',centru:[25.9192,47.8456],raza:500,desc:'Mănăstirea Bogdana — patrimoniu UNESCO proxim',aviz:'DJCPN Suceava + MCID'}],
      monumente_reprezentative:[{cod:'SV-II-m-A-05020',denumire:'Mănăstirea Bogdana',categorie:'A',adresa:'Str. Bogdana 1'}],
      reglementare:'Legea 422/2001 · UNESCO Buffer Zone'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic DN17A'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:28,presiune_vant:0.50,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:5500,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },
  'oras-targu-neamt':{ label:'Orașul Târgu-Neamț',short:'Târgu-Neamț',judet:'Neamț',judetCode:'NT',siruta:'209985',
    center:[26.3672,47.1989],zoom:13,pugFile:'./data/targu-neamt/pug.geojson',cadastruIndex:'./data/targu-neamt/cadastru_index.json',
    reguliFile:'./data/targu-neamt/reguli.json',status:'empty',primar:'Primăria Orașului Târgu-Neamț',
    daU:'Compartiment Urbanism',djcpn:'DJCPN Neamț',
    aeroport:null,seism:{zona:'E',ag:0.20,Tc:1.0,MSK:'VII',norm:'P100-1/2013'},
    hidro:{nfa:'3.0-7.0m',tip_sol:'Argilă, pietriș',portanta:'160-220 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1500,zone_protejate:[{cod:'NT-II-s-A-03020',tip:'Cetate medievală',centru:[26.3672,47.1989],raza:400,desc:'Cetatea Neamțului',aviz:'DJCPN Neamț + MCID'}],
      monumente_reprezentative:[{cod:'NT-II-m-A-03020',denumire:'Cetatea Neamțului',categorie:'A',adresa:'Cetatea Neamț'}],
      reglementare:'Legea 422/2001 · Sit arheologic protejat'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic DN15B'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:28,presiune_vant:0.50,directie_dominanta:'V',norm:'CR 1-1-4/2012',factor_teren:'III'},
    trafic:{viteza_proiectare:50,TMA_ref:4500,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,arie_protejata_apropiere:'Parcul Natural Vânători Neamț (3km)',norm:'Legea 24/2007'},
  },
  'municipiul-onesti':{ label:'Municipiul Onești',short:'Onești',judet:'Bacău',judetCode:'BC',siruta:'21624',
    center:[26.7833,46.2500],zoom:13,pugFile:'./data/onesti/pug.geojson',cadastruIndex:'./data/onesti/cadastru_index.json',
    reguliFile:'./data/onesti/reguli.json',status:'empty',primar:'Primăria Municipiului Onești',
    daU:'Compartiment Urbanism',djcpn:'DJCPN Bacău',
    aeroport:null,seism:{zona:'D',ag:0.25,Tc:1.0,MSK:'VII-VIII',norm:'P100-1/2013'},
    hidro:{nfa:'2.0-5.0m',tip_sol:'Argilă, pietriș',portanta:'170-230 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:800,zone_protejate:[],monumente_reprezentative:[],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic DN11','Platformă petrochimică'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:28,presiune_vant:0.50,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:6500,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },
  'municipiul-moinesti':{ label:'Municipiul Moinești',short:'Moinești',judet:'Bacău',judetCode:'BC',siruta:'21598',
    center:[26.4803,46.4667],zoom:13,pugFile:'./data/moinesti/pug.geojson',cadastruIndex:'./data/moinesti/cadastru_index.json',
    reguliFile:'./data/moinesti/reguli.json',status:'empty',primar:'Primăria Municipiului Moinești',
    daU:'Compartiment Urbanism',djcpn:'DJCPN Bacău',
    aeroport:null,seism:{zona:'D',ag:0.25,Tc:1.0,MSK:'VII-VIII',norm:'P100-1/2013'},
    hidro:{nfa:'2.5-6.0m',tip_sol:'Argilă, pietriș subcarpatic',portanta:'160-220 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:800,zone_protejate:[],monumente_reprezentative:[],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic DN12A'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:28,presiune_vant:0.50,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:4500,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },
  'municipiul-husi':{ label:'Municipiul Huși',short:'Huși',judet:'Vaslui',judetCode:'VS',siruta:'330424',
    center:[28.0539,46.6789],zoom:13,pugFile:'./data/husi/pug.geojson',cadastruIndex:'./data/husi/cadastru_index.json',
    reguliFile:'./data/husi/reguli.json',status:'empty',primar:'Primăria Municipiului Huși',
    daU:'Compartiment Urbanism',djcpn:'DJCPN Vaslui',
    aeroport:null,seism:{zona:'E',ag:0.20,Tc:1.6,MSK:'VII',norm:'P100-1/2013'},
    hidro:{nfa:'2.5-5.5m',tip_sol:'Argilă, loess (Dealul Huși)',portanta:'140-190 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1000,zone_protejate:[],
      monumente_reprezentative:[{cod:'VS-II-m-B-06020',denumire:'Catedrala Episcopiei Hușilor',categorie:'B',adresa:'Str. Stefan cel Mare 1'}],
      reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic DN24B'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:4000,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,note:'Zona viticolă Podgoria Huși',norm:'Legea 24/2007'},
  },
  'municipiul-tecuci':{ label:'Municipiul Tecuci',short:'Tecuci',judet:'Galați',judetCode:'GL',siruta:'95060',
    center:[27.4281,45.8506],zoom:13,pugFile:'./data/tecuci/pug.geojson',cadastruIndex:'./data/tecuci/cadastru_index.json',
    reguliFile:'./data/tecuci/reguli.json',status:'empty',primar:'Primăria Municipiului Tecuci',
    daU:'Compartiment Urbanism',djcpn:'DJCPN Galați',
    aeroport:null,seism:{zona:'C',ag:0.30,Tc:1.6,MSK:'VIII',norm:'P100-1/2013',
      descriere:'Zona C — influență Vrancea. ag=0.30g.',recomandare:'Calcul seismic obligatoriu.'},
    hidro:{nfa:'1.5-3.5m',tip_sol:'Aluviuni Tecuci, argilă',portanta:'140-200 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:800,zone_protejate:[],monumente_reprezentative:[],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic DN25','Trafic feroviar'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'II'},
    trafic:{viteza_proiectare:50,TMA_ref:6000,norm_parcaje:'NP 051/2012 rev.'},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },
  'municipiul-galati':{ label:'Municipiul Galați',short:'Galați',judet:'Galați',judetCode:'GL',siruta:'95024',
    center:[28.0500,45.4354],zoom:13,pugFile:'./data/galati/pug.geojson',cadastruIndex:'./data/galati/cadastru_index.json',
    reguliFile:'./data/galati/reguli.json',status:'empty',primar:'Primăria Municipiului Galați',
    daU:'Direcția Urbanism Galați',djcpn:'DJCPN Galați',
    aeroport:null,seism:{zona:'B',ag:0.40,Tc:1.6,MSK:'VIII-IX',norm:'P100-1/2013',
      descriere:'Zona B — intensitate ridicată. ag=0.40g — cea mai mare din România continentală.',
      recomandare:'STUDIU SEISMIC OBLIGATORIU! Expert IS obligatoriu pentru orice clădire.'},
    hidro:{nfa:'0.5-2.5m',tip_sol:'Aluviuni Dunăre',portanta:'100-160 kPa',
      risc_inundabil:'Ridicat (lunca Dunării)',adancime_fundare:'min. 1.0m',
      clasa_geotehnica:'3',studiu_obligatoriu:'Da — studiu geotehnic + raport seismic obligatorii'},
    lmi:{cimecRadius:1000,zone_protejate:[{cod:'GL-II-s-B-12001',tip:'Zonă construită protejată',centru:[28.0500,45.4354],raza:500,desc:'Centrul vechi Galați',aviz:'DJCPN Galați'}],
      monumente_reprezentative:[],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,
      surse_principale:['Port Galați (activitate industrială)','Trafic DN25','Trafic feroviar nod Galați'],norm:'SR 10009:2017 + HG 321/2005'},
    vant:{zona:'III',v_ref:32,presiune_vant:0.60,directie_dominanta:'N-NE (Crivăț)',
      norm:'CR 1-1-4/2012',factor_teren:'I-II — câmpie și luncă Dunăre'},
    trafic:{viteza_proiectare:50,TMA_ref:12000,norm_parcaje:'NP 051/2012 rev.',acces_transport_public:true},
    mediu:{sv_minim_procent:20,arie_protejata_apropiere:'Rezervația Biosferei Delta Dunării (50km)',norm:'Legea 24/2007'},
  },
  'municipiul-craiova':{ label:'Municipiul Craiova',short:'Craiova',judet:'Dolj',judetCode:'DJ',siruta:'66500',
    center:[23.8093,44.3302],zoom:13,pugFile:'./data/craiova/pug.geojson',cadastruIndex:'./data/craiova/cadastru_index.json',
    reguliFile:'./data/craiova/reguli.json',status:'empty',primar:'Primăria Municipiului Craiova',
    daU:'Direcția Urbanism Craiova',djcpn:'DJCPN Dolj',
    aeroport:{icao:'LRCV',prag08:[23.8886,44.3181],prag26:[23.8750,44.3200],elevatie:192,lungimePista:3200,latimePista:45,reglementare:'HG 930/2016'},
    seism:{zona:'C',ag:0.35,Tc:1.6,MSK:'VIII',norm:'P100-1/2013',
      descriere:'Zona C — intensitate moderată-ridicată.',recomandare:'Calcul seismic obligatoriu.'},
    hidro:{nfa:'1.0-3.5m',tip_sol:'Aluviuni, argilă',portanta:'130-200 kPa',studiu_obligatoriu:'Da'},
    lmi:{cimecRadius:1000,zone_protejate:[{cod:'DJ-II-s-B-13001',tip:'Zonă protejată',centru:[23.8093,44.3302],raza:500,desc:'Centrul Craiova',aviz:'DJCPN Dolj'}],monumente_reprezentative:[],reglementare:'Legea 422/2001'},
    zgomot:{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:['Trafic DN6 (A1)','Aeroportul LRCV'],norm:'SR 10009:2017'},
    vant:{zona:'III',v_ref:32,presiune_vant:0.60,directie_dominanta:'N-NE',norm:'CR 1-1-4/2012',factor_teren:'I-II'},
    trafic:{viteza_proiectare:50,TMA_ref:14000,norm_parcaje:'NP 051/2012 rev.',acces_transport_public:true},
    mediu:{sv_minim_procent:20,norm:'Legea 24/2007'},
  },
  // ── COMUNE CU PUG+RLU VECTORIZAT ────────────────────────────────────────
  'comuna-miroslava': {
    label:'Comuna Miroslava', short:'Miroslava',
    judet:'Iași', judetCode:'IS', siruta:'95042',
    center:[27.5280,47.1050], zoom:13,
    pugFile:'./data/comuna-miroslava/pug.geojson',
    reguliFile:'./data/comuna-miroslava/reguli.json',
    status:'partial', primar:'Primăria Comunei Miroslava',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Iași',
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'2-5m',tip_sol:'Loess, argilă',portanta:'130-170 kPa',studiu_obligatoriu:'Da'},
  },
  'comuna-rediu': {
    label:'Comuna Rediu', short:'Rediu',
    judet:'Iași', judetCode:'IS', siruta:'95087',
    center:[27.5680,47.1890], zoom:13,
    pugFile:'./data/comuna-rediu/pug.geojson',
    reguliFile:'./data/comuna-rediu/reguli.json',
    status:'partial', primar:'Primăria Comunei Rediu',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Iași',
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'2-5m',tip_sol:'Loess',portanta:'130-160 kPa',studiu_obligatoriu:'Da'},
  },
  'comuna-aroneanu': {
    label:'Comuna Aroneanu', short:'Aroneanu',
    judet:'Iași', judetCode:'IS', siruta:'94889',
    center:[27.6980,47.1760], zoom:13,
    pugFile:'./data/comuna-aroneanu/pug.geojson',
    reguliFile:'./data/comuna-aroneanu/reguli.json',
    status:'partial', primar:'Primăria Comunei Aroneanu',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Iași',
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'2-5m',tip_sol:'Loess, argilă',portanta:'130-170 kPa',studiu_obligatoriu:'Da'},
  },
  'comuna-holboca': {
    label:'Comuna Holboca', short:'Holboca',
    judet:'Iași', judetCode:'IS', siruta:'94951',
    center:[27.7280,47.1450], zoom:13,
    pugFile:'./data/comuna-holboca/pug.geojson',
    reguliFile:'./data/comuna-holboca/reguli.json',
    status:'partial', primar:'Primăria Comunei Holboca',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Iași',
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'2-5m',tip_sol:'Loess, aluviuni',portanta:'120-160 kPa',studiu_obligatoriu:'Da'},
  },
  'comuna-popricani': {
    label:'Comuna Popricani', short:'Popricani',
    judet:'Iași', judetCode:'IS', siruta:'95424',
    center:[27.6050,47.2550], zoom:13,
    pugFile:'./data/comuna-popricani/pug.geojson',
    reguliFile:'./data/comuna-popricani/reguli.json',
    status:'partial', primar:'Primăria Comunei Popricani',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Iași',
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'2-5m',tip_sol:'Loess',portanta:'130-170 kPa',studiu_obligatoriu:'Da'},
  },
  'comuna-baluseni': {
    label:'Comuna Bălușeni', short:'Bălușeni',
    judet:'Botoșani', judetCode:'BT', siruta:'18073',
    center:[26.8730,47.5320], zoom:13,
    pugFile:'./data/comuna-baluseni/pug.geojson',
    reguliFile:'./data/comuna-baluseni/reguli.json',
    status:'partial', primar:'Primăria Comunei Bălușeni',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Botoșani',
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'2-5m',tip_sol:'Loess',portanta:'130-170 kPa',studiu_obligatoriu:'Da'},
  },
  'comuna-mihaieminescu': {
    label:'Comuna Mihai Eminescu', short:'M. Eminescu',
    judet:'Botoșani', judetCode:'BT', siruta:'38063',
    center:[26.5380,47.6120], zoom:13,
    pugFile:'./data/comuna-mihaieminescu/pug.geojson',
    reguliFile:'./data/comuna-mihaieminescu/reguli.json',
    status:'partial', primar:'Primăria Comunei Mihai Eminescu',
    daU:'Compartiment Urbanism', djcpn:'DJCPN Botoșani',
    seism:{zona:'E',ag:0.20,Tc:1.6,norm:'P100-1/2013'},
    hidro:{nfa:'2-5m',tip_sol:'Loess',portanta:'130-170 kPa',studiu_obligatoriu:'Da'},
  },

};

// ── Funcții helper UAT ────────────────────────────────────────────────────
function getUATById(id){ return UAT_REGISTRY[id]||null; }
function getUATList(){ return Object.entries(UAT_REGISTRY).map(([id,c])=>({id,...c})); }
function getUATListComplete(){ return getUATList().filter(u=>u.status==='complet'); }
function getUATListAvailable(){ return getUATList().filter(u=>u.status!=='empty'); }

// ── Starea UAT activ ──────────────────────────────────────────────────────
var S_UAT = {
  id:'municipiul-iasi',
  ...UAT_REGISTRY['municipiul-iasi'],
};

function getActiveUAT(){ return S_UAT; }
function getUATLabel(){ return S_UAT.label||'Localitate'; }
function getUATShort(){ return S_UAT.short||S_UAT.label||''; }
function getUATJudet(){ return S_UAT.judet||''; }
function getUATJudetCode(){ return S_UAT.judetCode||''; }
function getPrimar(){ return S_UAT.primar||'Primăria Locală'; }
function getDAU(){ return S_UAT.daU||'Departamentul Urbanism'; }
function getDJCPN(){ return S_UAT.djcpn||'DJCPN Județean'; }
function getAeroprtConfig(){ return S_UAT.aeroport||null; }
function getSeismConfig(){ return S_UAT.seism||{zona:'E',ag:0.20,Tc:1.6,MSK:'VII-VIII',norm:'P100-1/2013'}; }
function getHidroConfig(){ return S_UAT.hidro||{nfa:'2-4m',tip_sol:'Verificare necesară',studiu_obligatoriu:'Da'}; }
function getLmiConfig(){ return S_UAT.lmi||{cimecRadius:1000,zone_protejate:[],monumente_reprezentative:[],reglementare:'Legea 422/2001'}; }
function getZgomotConfig(){ return S_UAT.zgomot||{zona_acustica:'II',Lzsn_limita:60,Lnoapte_limita:50,surse_principale:[],norm:'SR 10009:2017'}; }
function getVantConfig(){ return S_UAT.vant||{zona:'III',v_ref:30,presiune_vant:0.55,directie_dominanta:'NV',norm:'CR 1-1-4/2012',factor_teren:'II'}; }
function getTraficConfig(){ return S_UAT.trafic||{viteza_proiectare:50,TMA_ref:8000,norm_parcaje:'NP 051/2012 rev.'}; }
function getMediuConfig(){ return S_UAT.mediu||{sv_minim_procent:20,norm:'Legea 24/2007'}; }

// ── Config Apele Române — per UAT ─────────────────────────────────────────
const _APA_ROMANA_CFG = {
  'municipiul-iasi':     {DA:'DA Prut-Bârlad',DA_oras:'Iași',DA_adresa:'Bd. Carol I nr. 1, Iași 700505',DA_tel:'0232/213.135',DA_email:'office@daprut.rowater.ro',DA_web:'http://www.rowater.ro/daprut',bazin:'Prut-Bârlad',sub_bazin:'Bazinul Bahlui',cursuri:['Râul Bahlui (5.2km N)','Râul Jijia (14km NE)','Pârâul Nicolina (2.8km SV)'],risc_inundabil:'Mediu (lunca Bahlui) / Scăzut (platouri)',zona_inundabila:'Q100: mal stâng Bahlui',distanta_curs_principal:1200,arie_naturala:'ROSCI0105 Lunca Prutului (35km)'},
  'municipiul-botosani': {DA:'DA Prut-Bârlad',DA_oras:'Iași',DA_adresa:'Bd. Carol I nr. 1, Iași 700505',DA_tel:'0232/213.135',DA_email:'office@daprut.rowater.ro',DA_web:'http://www.rowater.ro/daprut',bazin:'Prut-Bârlad',sub_bazin:'Bazinul Jijia',cursuri:['Râul Jijia (1.5km E)','Pârâul Dresleuca (3km V)'],risc_inundabil:'Mediu (lunca Jijia)',zona_inundabila:'Q100: lunca Jijia est',distanta_curs_principal:1500,arie_naturala:'ROSPA0067 Lacurile de acumulare Stânca-Costești (25km)'},
  'municipiul-suceava':  {DA:'DA Siret',DA_oras:'Bacău',DA_adresa:'Str. Cuza Vodă nr. 1, Bacău 600274',DA_tel:'0234/511.510',DA_email:'office@dasiret.rowater.ro',DA_web:'http://www.rowater.ro/dasiret',bazin:'Siret',sub_bazin:'Bazinul Suceava',cursuri:['Râul Suceava (0.8km N)','Râul Sucevița (8km V)'],risc_inundabil:'Mediu (lunca Suceava)',zona_inundabila:'Q100: malul drept Suceava',distanta_curs_principal:800,arie_naturala:'ROSCI0229 Râul Suceava între Rădăuți și Mihoveni (5km)'},
  'municipiul-falticeni': {DA:'DA Siret',DA_oras:'Bacău',DA_adresa:'Str. Cuza Vodă nr. 1, Bacău 600274',DA_tel:'0234/511.510',DA_email:'office@dasiret.rowater.ro',DA_web:'http://www.rowater.ro/dasiret',bazin:'Siret',sub_bazin:'Bazinul Moldova',cursuri:['Râul Moldova (2.5km E)'],risc_inundabil:'Scăzut-Mediu',zona_inundabila:'Q100: lunca Moldova',distanta_curs_principal:2500,arie_naturala:null},
  'municipiul-radauti':   {DA:'DA Siret',DA_oras:'Bacău',DA_adresa:'Str. Cuza Vodă nr. 1, Bacău 600274',DA_tel:'0234/511.510',DA_email:'office@dasiret.rowater.ro',DA_web:'http://www.rowater.ro/dasiret',bazin:'Siret',sub_bazin:'Bazinul Suceava',cursuri:['Râul Suceava (1.2km S)'],risc_inundabil:'Mediu',zona_inundabila:'Q100: malul drept Suceava',distanta_curs_principal:1200,arie_naturala:'ROSCI0229 Râul Suceava'},
  'municipiul-piatra-neamt':{DA:'DA Siret',DA_oras:'Bacău',DA_adresa:'Str. Cuza Vodă nr. 1, Bacău 600274',DA_tel:'0234/511.510',DA_email:'office@dasiret.rowater.ro',DA_web:'http://www.rowater.ro/dasiret',bazin:'Siret',sub_bazin:'Bazinul Bistrița',cursuri:['Râul Bistrița (0.5km S)','Lacul de acumulare Bâtca Doamnei (1km N)'],risc_inundabil:'Ridicat (malul Bistriței)',zona_inundabila:'Q100: lunca Bistrița — reglementat PLRM Siret',distanta_curs_principal:500,arie_naturala:'ROSCI0038 Cheile Bicazului — Hășmaș (30km)'},
  'municipiul-roman':     {DA:'DA Siret',DA_oras:'Bacău',DA_adresa:'Str. Cuza Vodă nr. 1, Bacău 600274',DA_tel:'0234/511.510',DA_email:'office@dasiret.rowater.ro',DA_web:'http://www.rowater.ro/dasiret',bazin:'Siret',sub_bazin:'Confluența Moldova-Siret',cursuri:['Râul Siret (2km E)','Râul Moldova (0.6km V)'],risc_inundabil:'Mediu-Ridicat (zone de confluență)',zona_inundabila:'Q100: lunca Siret și Moldova',distanta_curs_principal:600,arie_naturala:null},
  'oras-targu-neamt':     {DA:'DA Siret',DA_oras:'Bacău',DA_adresa:'Str. Cuza Vodă nr. 1, Bacău 600274',DA_tel:'0234/511.510',DA_email:'office@dasiret.rowater.ro',DA_web:'http://www.rowater.ro/dasiret',bazin:'Siret',sub_bazin:'Bazinul Ozana',cursuri:['Pârâul Ozana (0.8km)'],risc_inundabil:'Scăzut',zona_inundabila:'Q100: lunca Ozana',distanta_curs_principal:800,arie_naturala:null},
  'municipiul-bacau':     {DA:'DA Siret',DA_oras:'Bacău',DA_adresa:'Str. Cuza Vodă nr. 1, Bacău 600274',DA_tel:'0234/511.510',DA_email:'office@dasiret.rowater.ro',DA_web:'http://www.rowater.ro/dasiret',bazin:'Siret',sub_bazin:'Bazinul Bistrița',cursuri:['Râul Bistrița (1.5km NE)','Râul Siret (5km E)'],risc_inundabil:'Mediu',zona_inundabila:'Q100: lunca Bistrița și Siret',distanta_curs_principal:1500,arie_naturala:null},
  'municipiul-onesti':    {DA:'DA Siret',DA_oras:'Bacău',DA_adresa:'Str. Cuza Vodă nr. 1, Bacău 600274',DA_tel:'0234/511.510',DA_email:'office@dasiret.rowater.ro',DA_web:'http://www.rowater.ro/dasiret',bazin:'Siret',sub_bazin:'Bazinul Trotuș',cursuri:['Râul Trotuș (0.5km S)'],risc_inundabil:'Mediu-Ridicat',zona_inundabila:'Q100: lunca Trotuș',distanta_curs_principal:500,arie_naturala:null},
  'municipiul-moinesti':  {DA:'DA Siret',DA_oras:'Bacău',DA_adresa:'Str. Cuza Vodă nr. 1, Bacău 600274',DA_tel:'0234/511.510',DA_email:'office@dasiret.rowater.ro',DA_web:'http://www.rowater.ro/dasiret',bazin:'Siret',sub_bazin:'Bazinul Trotuș',cursuri:['Pârâul Tazlău (1.2km)'],risc_inundabil:'Scăzut',zona_inundabila:'Q100: lunca Tazlău',distanta_curs_principal:1200,arie_naturala:null},
  'municipiul-vaslui':    {DA:'DA Prut-Bârlad',DA_oras:'Iași',DA_adresa:'Bd. Carol I nr. 1, Iași 700505',DA_tel:'0232/213.135',DA_email:'office@daprut.rowater.ro',DA_web:'http://www.rowater.ro/daprut',bazin:'Prut-Bârlad',sub_bazin:'Bazinul Bârlad',cursuri:['Pârâul Vaslui (0.3km E)','Râul Bârlad (3km S)'],risc_inundabil:'Mediu (lunca Vaslui)',zona_inundabila:'Q100: lunca pârâului Vaslui',distanta_curs_principal:300,arie_naturala:null},
  'municipiul-barlad':    {DA:'DA Prut-Bârlad',DA_oras:'Iași',DA_adresa:'Bd. Carol I nr. 1, Iași 700505',DA_tel:'0232/213.135',DA_email:'office@daprut.rowater.ro',DA_web:'http://www.rowater.ro/daprut',bazin:'Prut-Bârlad',sub_bazin:'Bazinul Bârlad',cursuri:['Râul Bârlad (0.4km E)'],risc_inundabil:'Mediu-Ridicat',zona_inundabila:'Q100: lunca Bârlad',distanta_curs_principal:400,arie_naturala:null},
  'municipiul-husi':      {DA:'DA Prut-Bârlad',DA_oras:'Iași',DA_adresa:'Bd. Carol I nr. 1, Iași 700505',DA_tel:'0232/213.135',DA_email:'office@daprut.rowater.ro',DA_web:'http://www.rowater.ro/daprut',bazin:'Prut-Bârlad',sub_bazin:'Bazinul Prut',cursuri:['Râul Prut (8km E)','Pârâul Lohan (1km V)'],risc_inundabil:'Scăzut',zona_inundabila:'Q100: lunca Prut (departe)',distanta_curs_principal:1000,arie_naturala:'ROSPA0070 Lunca Mijlocie a Prutului (8km)'},
  'municipiul-galati':    {DA:'DA Prut-Bârlad',DA_oras:'Iași',DA_adresa:'Bd. Carol I nr. 1, Iași 700505',DA_tel:'0232/213.135',DA_email:'office@daprut.rowater.ro',DA_web:'http://www.rowater.ro/daprut',bazin:'Dunăre',sub_bazin:'Confluența Siret-Prut-Dunăre',cursuri:['Fluviul Dunărea (1.5km S)','Râul Siret (15km NV)','Râul Prut (8km NE)'],risc_inundabil:'Ridicat (port Dunăre)',zona_inundabila:'Q100: zona portului și faleza',distanta_curs_principal:1500,arie_naturala:'ROSCI0103 Lunca Joasă a Prutului (8km)'},
  'municipiul-tecuci':    {DA:'DA Prut-Bârlad',DA_oras:'Iași',DA_adresa:'Bd. Carol I nr. 1, Iași 700505',DA_tel:'0232/213.135',DA_email:'office@daprut.rowater.ro',DA_web:'http://www.rowater.ro/daprut',bazin:'Prut-Bârlad',sub_bazin:'Bazinul Bârlad',cursuri:['Râul Bârlad (0.5km V)'],risc_inundabil:'Mediu',zona_inundabila:'Q100: lunca Bârlad',distanta_curs_principal:500,arie_naturala:null},
  'municipiul-focsani':   {DA:'DA Siret',DA_oras:'Bacău',DA_adresa:'Str. Cuza Vodă nr. 1, Bacău 600274',DA_tel:'0234/511.510',DA_email:'office@dasiret.rowater.ro',DA_web:'http://www.rowater.ro/dasiret',bazin:'Siret',sub_bazin:'Bazinul Milcov',cursuri:['Râul Milcov (1km E)','Râul Putna (8km NV)'],risc_inundabil:'Mediu',zona_inundabila:'Q100: lunca Milcov',distanta_curs_principal:1000,arie_naturala:null},
  'municipiul-cluj-napoca':{DA:'DA Someș-Tisa',DA_oras:'Cluj-Napoca',DA_adresa:'Str. Vânătorului nr. 17, Cluj-Napoca 400213',DA_tel:'0264/433.082',DA_email:'office@dasomestisa.rowater.ro',DA_web:'http://www.rowater.ro/dasomes',bazin:'Someș-Tisa',sub_bazin:'Bazinul Someșul Mic',cursuri:['Râul Someșul Mic (0.4km S)'],risc_inundabil:'Mediu (lunca Someșul Mic)',zona_inundabila:'Q100: lunca Someșul Mic',distanta_curs_principal:400,arie_naturala:'ROSCI0227 Râul Crișul Negru (80km)'},
  'municipiul-brasov':    {DA:'DA Olt',DA_oras:'Râmnicu Vâlcea',DA_adresa:'Str. Recea nr. 2, Rm. Vâlcea 240272',DA_tel:'0250/737.890',DA_email:'office@daolt.rowater.ro',DA_web:'http://www.rowater.ro/daolt',bazin:'Olt',sub_bazin:'Bazinul Bârsa',cursuri:['Râul Bârsa (2km SE)','Pârâul Graft (1km N)'],risc_inundabil:'Scăzut-Mediu',zona_inundabila:'Q100: lunca Bârsa',distanta_curs_principal:2000,arie_naturala:'ROSCI0122 Munții Bucegi (20km)'},
  'municipiul-timisoara':  {DA:'DA Banat',DA_oras:'Timișoara',DA_adresa:'Str. Gheorghe Lazăr nr. 2A, Timișoara 300081',DA_tel:'0256/491.595',DA_email:'office@dabanat.rowater.ro',DA_web:'http://www.rowater.ro/dabanat',bazin:'Banat',sub_bazin:'Bazinul Bega',cursuri:['Canalul Bega (1.8km NV)'],risc_inundabil:'Scăzut (canal regularizat)',zona_inundabila:'Q100: zona Fabric-Fabric',distanta_curs_principal:1800,arie_naturala:'ROSCI0226 Râul Bega între Topolovăț și Timișoara (5km)'},
  'municipiul-craiova':    {DA:'DA Jiu',DA_oras:'Craiova',DA_adresa:'Str. Brestei nr. 2, Craiova 200432',DA_tel:'0251/420.130',DA_email:'office@dajiu.rowater.ro',DA_web:'http://www.rowater.ro/dajiu',bazin:'Jiu',sub_bazin:'Bazinul Jiu inferior',cursuri:['Râul Jiu (3.5km V)'],risc_inundabil:'Mediu',zona_inundabila:'Q100: lunca Jiu vest',distanta_curs_principal:3500,arie_naturala:null},
  'municipiul-constanta':  {DA:'DA Dobrogea-Litoral',DA_oras:'Constanța',DA_adresa:'Str. Mircea cel Bătrân nr. 127, Constanța 900527',DA_tel:'0241/545.520',DA_email:'office@dadl.rowater.ro',DA_web:'http://www.rowater.ro/dadl',bazin:'Dobrogea-Litoral',sub_bazin:'Litoral Marea Neagră',cursuri:['Marea Neagră (3km E)','Lacul Tăbăcărie (1km NV)'],risc_inundabil:'Scăzut (platou dobrogean)',zona_inundabila:'Q100: zona joasă port',distanta_curs_principal:1000,arie_naturala:'ROSCI0269 Zona Marină Vama Veche-2 Mai (45km)'},
  'municipiul-bucuresti':  {DA:'ABA Argeș-Vedea + DA Argeș-Vedea',DA_oras:'Pitești',DA_adresa:'Str. Eroilor nr. 1, Pitești 110192',DA_tel:'0248/213.000',DA_email:'office@daarges.rowater.ro',DA_web:'http://www.rowater.ro/daarges',bazin:'Argeș-Vedea',sub_bazin:'Bazinul Dâmbovița + Colentina',cursuri:['Râul Dâmbovița (canalizat)','Lacurile Colentina (șir)'],risc_inundabil:'Scăzut (lucrări de regularizare extinse)',zona_inundabila:'Q100: sectoare neconstrolate',distanta_curs_principal:500,arie_naturala:'ROSPA0043 Ilfov-București (perimetrul Bălteni)'},
};
function getApaConfig(){
  const uatId = S_UAT?.id || 'municipiul-iasi';
  const base = _APA_ROMANA_CFG[uatId] || _APA_ROMANA_CFG['municipiul-iasi'];
  const hidro = S_UAT?.hidro || {};
  const medApa = S_UAT?.mediu?.apa || {};
  return {
    ...base,
    nfa: hidro.nfa || '2-4m',
    tip_sol: hidro.tip_sol || 'Verificare necesară',
    portanta: hidro.portanta || '150-200 kPa',
    risc_inundabil_hidro: hidro.risc_inundabil || 'Verificare necesară',
    adancime_fundare: hidro.adancime_fundare || 'min. 0.9m',
    operator_apa: medApa.operator || 'Operator regional',
    sursa_apa: medApa.sursa_apa_potabila || 'Verificare locală',
    retea_canalizare: medApa.retea_canalizare !== false,
    receptori: medApa.receptori_naturali || [],
    norm_principala: 'Legea 107/1996 + HG 930/2010 + Ord. 662/2006',
  };
}
function getEIMConfig(){
  const m=S_UAT.mediu||{};
  return {
    aer:   m.aer   ||{apm:'APM Județean',poluanti_principali:['NO2','PM10'],calitate_generala:'Moderată',norm:'Legea 104/2011'},
    apa:   m.apa   ||{operator:'Operator regional APA',sursa_apa_potabila:'Verificare locală',retea_canalizare:true,norm:'Legea 107/1996'},
    sol:   m.sol   ||{tip_sol_predominant:'Verificare necesară',permeabilitate:'Medie',norm:'OUG 195/2005'},
    deseuri:m.deseuri||{operator_salubritate:'Operator local',colectare_selectiva:true,norm:'Legea 211/2011'},
    ins:   m.ins   ||{populatie:null,densitate_pop:null,sursa:'INS — statistici.insse.ro'},
    natura2000:m.natura2000_proximitate||[],
    arii_protejate:m.arie_protejata_apropiere||null,
    api:   m.api   ||{ins_fisa:'https://statistici.insse.ro',primaria_url:'#'},
    norm:  m.norm  ||'OUG 195/2005 + Legea 292/2018',
  };
}

// ── Schimbare UAT ─────────────────────────────────────────────────────────
async function switchUAT(uatId){
  const cfg = UAT_REGISTRY[uatId];
  if(!cfg){ ss('⚠️ UAT necunoscut: '+uatId); return; }

  S_UAT = {id:uatId, ...cfg};

  // Sincronizăm localStorage cu cheia TCI (RO-XX-NN) pentru _setupBtnUTR
  // Căutăm cheia TCI din _PUG_REGISTRY (acoperă municipii + toate comunele)
  const _pugReg = window._PUG_REGISTRY || {};
  const tciKey = Object.keys(_pugReg).find(k => _pugReg[k].id === uatId)
    || { 'municipiul-iasi':'RO-IS-01', 'municipiul-suceava':'RO-SV-01',
         'municipiul-botosani':'RO-BT-01' }[uatId];
  if(tciKey) {
    try { localStorage.setItem('ux_last_city', tciKey); } catch(e) {}
    if(window.TCI) window.TCI.cityKey = tciKey;
  }

  // Resetăm PUG încărcat — forțăm re-încărcare la următorul click UTR
  if(window.S) { window.S.pug = null; window.S.pugIdx = []; window.S._loadedCityKey = null; }

  // Actualizăm titlul paginii dinamic
  document.title = `UrbanX – ${cfg.short||cfg.label}`;

  // Actualizăm indicator UI
  const el=document.getElementById('uat-indicator');
  if(el) el.textContent=S_UAT.short||S_UAT.label;

  // Navigăm la centrul UAT-ului
  if(cfg.center) map.flyTo({center:cfg.center, zoom:cfg.zoom||13, duration:1500});

  // Încărcăm datele UAT-ului dacă sunt disponibile
  if(cfg.status!=='empty'){
    await loadData(uatId);
    ss(`✅ UAT activ: ${cfg.label} (${cfg.status})`);
    // Activează automat UTR după ce loadData termină
    setTimeout(function(){
      if(S.pug && S.pug.features && S.pug.features.length) {
        utrOpen = true;
        const btnU = _g('btnUTR');
        if(btnU) { btnU.classList.add('on'); }
        const utrDrawer = _g('utr-drawer');
        if(utrDrawer) utrDrawer.classList.add('open');
        const fc={type:'FeatureCollection',features:S.pug.features.map(f=>({...f,properties:{...f.properties,utr:normU(f.properties?.utr||''),c:ucol(normU(f.properties?.utr||''))}}))};
        setSource('utr-src', fc);
        ss('🗺 PUG ' + (cfg.short||cfg.label) + ' — ' + S.pug.features.length + ' zone UTR');
      }
    }, 1500);
  } else {
    // Reset PUG — UAT fără date
    S.pug=null; S.pugIdx=[];
    setSource('utr-src',{type:'FeatureCollection',features:[]});
    ss(`📍 ${cfg.label} — PUG indisponibil. Contribuie cu date: github.com/tss-fg/urbanx-data`);
  }

  // Actualizăm REGULI cu regulile UAT-ului dacă există reguli.json
  if(cfg.reguliFile){
    try{
      const r=await fetch(cfg.reguliFile);
      if(r.ok){
        const newReguli=await r.json();
        if (typeof mergeIntoREGULI === 'function') {
          const ck2 = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
          mergeIntoREGULI(newReguli, ck2);
        } else { Object.assign(REGULI,newReguli); }
        ss('📋 Reguli PUG '+cfg.label+' încărcate');
      }
    }catch(e){}
  }
}

// ── Detectare automată UAT din coordonate ────────────────────────────────
async function detectUATFromCoords(lat, lng){
  try{
    const url=`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
    const r=await fetch(url,{headers:{'Accept-Language':'ro'},signal:AbortSignal.timeout(5000)});
    if(!r.ok) return null;
    const d=await r.json();
    const addr=d.address||{};
    return {
      city:addr.city||addr.town||addr.village||addr.municipality||'',
      county:addr.county||'',
      postcode:addr.postcode||'',
      country:addr.country_code?.toUpperCase()||'RO',
      label:(addr.city||addr.town||'')+(addr.county?', '+addr.county:''),
    };
  }catch(e){return null;}
}

async function autoDetectUAT(lat, lng){
  const info=await detectUATFromCoords(lat,lng);
  if(!info||info.country!=='RO') return;
  const cityNorm=info.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  // Caută în registry
  for(const [id,cfg] of Object.entries(UAT_REGISTRY)){
    const cfgNorm=(cfg.short||cfg.label).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    if(cfgNorm.includes(cityNorm)||cityNorm.includes(cfgNorm.replace('municipiul ',''))) {
      if(id!==S_UAT.id) switchUAT(id);
      return;    }
  }
  // UAT neconfigurat — notificăm
  const el=document.getElementById('uat-indicator');
  if(el) el.textContent=info.city||'?';
  ss(`📍 ${info.label} — UAT neconfigurat în UrbanX. Contribuie: github.com/tss-fg/urbanx-data`);
}

// ── Widget selector UAT ───────────────────────────────────────────────────
function showUATSelector(){
  const existing=document.getElementById('uat-selector');
  if(existing){existing.remove();return;}
  const div=document.createElement('div');
  div.id='uat-selector';
  const mob=window.innerWidth<841;
  const uatPanel=document.getElementById('panel');
  const uatPanelVis=uatPanel&&uatPanel.offsetWidth>0&&getComputedStyle(uatPanel).display!=='none';
  const uatRight=mob?null:(uatPanelVis?434:20);
  div.style.cssText=`position:fixed;${mob?'bottom:72px;left:4px;right:4px':'top:56px;right:'+uatRight+'px;width:400px'};z-index:9200;background:rgba(7,12,24,.97);border:1px solid rgba(212,175,55,.3);border-radius:14px;padding:0;max-height:82vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 12px 40px rgba(0,0,0,.7);backdrop-filter:blur(16px);font-family:system-ui,sans-serif`;

  // Grupăm pe regiuni
  const REGIUNI = {
    'Moldova — Iași + zona':     ['municipiul-iasi','comuna-miroslava','comuna-rediu','comuna-aroneanu','comuna-holboca','comuna-popricani'],
    'Moldova — Botoșani':        ['municipiul-botosani','oras-dorohoi','comuna-baluseni','comuna-mihaieminescu'],
    'Moldova — Suceava':         ['municipiul-suceava','municipiul-falticeni','municipiul-radauti'],
    'Moldova — Neamț':           ['municipiul-piatra-neamt','municipiul-roman','oras-targu-neamt'],
    'Moldova — Bacău':           ['municipiul-bacau','municipiul-onesti','municipiul-moinesti'],
    'Moldova — Vaslui':          ['municipiul-vaslui','municipiul-barlad','municipiul-husi'],
    'Moldova — Galați/Vrancea':  ['municipiul-galati','municipiul-tecuci','municipiul-focsani'],
    'Transilvania':              ['municipiul-cluj-napoca','municipiul-brasov'],
    'Vest':                      ['municipiul-timisoara'],
    'Sud/Oltenia':               ['municipiul-craiova'],
    'Sud-Est':                   ['municipiul-constanta'],
    'București':                 ['municipiul-bucuresti'],
  };

  const statusBadge=(s)=>{
    const map={complet:'✅ Complet',pug_only:'🗺 PUG',partial:'⚠ Parțial',empty:'⭕ Gol'};
    const col={complet:'#4ade80',pug_only:'#fbbf24',partial:'#fbbf24',empty:'#334155'};
    return `<span style="font-size:8px;padding:2px 6px;border-radius:4px;font-weight:700;color:${col[s]||'#475569'};background:${col[s]||'#475569'}22">${map[s]||s}</span>`;
  };

  const uatRows = (ids)=>ids.map(id=>{
    const u=UAT_REGISTRY[id]; if(!u) return '';
    return `<div onclick="switchUAT('${id}');document.getElementById('uat-selector').remove();var b=document.getElementById('uat-selector-backdrop');if(b)b.remove()"
      style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:8px;cursor:pointer;border:1px solid ${id===S_UAT.id?'rgba(212,175,55,.4)':'rgba(255,255,255,.05)'};background:${id===S_UAT.id?'rgba(212,175,55,.07)':'transparent'};margin-bottom:2px;transition:background .15s"
      onmouseover="this.style.background='rgba(255,255,255,.04)'" onmouseout="this.style.background='${id===S_UAT.id?'rgba(212,175,55,.07)':'transparent'}'">
      <div>
        <span style="color:${id===S_UAT.id?'#d4af37':'#e2e8f0'};font-size:11px;font-weight:${id===S_UAT.id?'800':'600'}">${u.label}</span>
        ${u.note?`<div style="color:#475569;font-size:8px;margin-top:1px;max-width:240px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${u.note.substring(0,60)}</div>`:''}
      </div>
      <div style="display:flex;align-items:center;gap:4px">
        ${statusBadge(u.status)}
        ${id===S_UAT.id?'<span style="color:#d4af37;font-size:10px">●</span>':''}
      </div>
    </div>`;
  }).join('');

  const regionSections=Object.entries(REGIUNI).map(([reg,ids])=>{
    const rows=uatRows(ids);
    if(!rows) return '';
    return `<div style="margin-bottom:10px">
      <div style="font-size:8.5px;color:#475569;text-transform:uppercase;letter-spacing:.07em;font-weight:700;padding:4px 4px 4px 0;border-bottom:1px solid rgba(255,255,255,.05);margin-bottom:4px">${reg}</div>
      ${rows}
    </div>`;
  }).join('');

  div.innerHTML=`
    <div style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.07);display:flex;justify-content:space-between;align-items:center;flex-shrink:0">
      <div>
        <span style="color:#d4af37;font-weight:800;font-size:13px">📍 Selectează UAT</span>
        <span style="color:#475569;font-size:9px;margin-left:6px">${Object.keys(UAT_REGISTRY).length} UAT-uri</span>
      </div>
      <button onclick="document.getElementById('uat-selector').remove();var b=document.getElementById('uat-selector-backdrop');if(b)b.remove()" style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:8px;padding:8px 16px;font-size:13px;font-weight:700;cursor:pointer;min-width:44px;min-height:44px">✕</button>
    </div>
    <div style="overflow-y:auto;padding:10px 12px;flex:1">
      ${regionSections}
      <div style="margin-top:10px;padding:10px;background:rgba(212,175,55,.04);border:1px solid rgba(212,175,55,.12);border-radius:8px">
        <div style="font-size:9px;color:#d4af37;font-weight:700;margin-bottom:4px">📦 Contribuie cu date pentru UAT-ul tău</div>
        <div style="font-size:8.5px;color:#64748b">PUG georeferențiat + cadastru index + reguli PUG</div>
        <div style="font-size:8.5px;color:#60a5fa;margin-top:3px">Format: data/&#123;uat-id&#125;/ · github.com/tss-fg/urbanx-data</div>
      </div>
    </div>
    <div style="padding:10px 12px;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0">
      <button onclick="document.getElementById('uat-selector').remove();var b=document.getElementById('uat-selector-backdrop');if(b)b.remove()"
        style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;width:100%;padding:12px;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;min-height:48px">
        ✕ Închide
      </button>
    </div>`;
  document.body.appendChild(div);

  // Backdrop transparent — tap în afara selectorului îl închide
  const backdrop = document.createElement('div');
  backdrop.id = 'uat-selector-backdrop';
  backdrop.style.cssText = 'position:fixed;inset:0;z-index:9199;background:transparent';
  backdrop.onclick = () => {
    div.remove();
    backdrop.remove();
  };
  document.body.insertBefore(backdrop, div);

  // Outside-click pe desktop (redundant cu backdrop dar sigur)
  setTimeout(()=>{
    document.addEventListener('click', function _uatClose(e){
      if(!div.contains(e.target)){
        div.remove(); backdrop.remove();
        document.removeEventListener('click', _uatClose);
      }
    });
  }, 100);
}

// ── LMI cultura.ro + CIMEC ───────────────────────────────────────────────
async function _lmiQueryCimec(lon, lat, radiusKm=1){
  const R=radiusKm/111.32;
  const bbox=`${lon-R},${lat-R},${lon+R},${lat+R}`;
  const results={monumente:[],zone:[],situri:[],ok:false};
  const layers=[
    {typename:'LMI_Puncte',  key:'monumente'},
    {typename:'LMI_Poligoane',key:'zone'},
    {typename:'Situri_Arh',  key:'situri'},
  ];
  for(const lq of layers){
    try{
      const url=`https://map.cimec.ro/Mapserver/wfs?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature`+
        `&TYPENAME=${lq.typename}&BBOX=${bbox},EPSG:4326&SRSNAME=EPSG:4326`+
        `&OUTPUTFORMAT=application/json&maxFeatures=100`;
      const r=await fetch(url,{signal:AbortSignal.timeout(10000)});
      if(r.ok&&(r.headers.get('content-type')||'').includes('json')){
        const d=await r.json(); results[lq.key]=d.features||[]; results.ok=true;
      }
    }catch(e){}
  }
  return results;
}

function _lmiFormatMonument(feat){
  const p=feat.properties||{};
  const get=(...keys)=>{ for(const k of keys){const v=p[k]||p[k.toLowerCase()]||p[k.toUpperCase()]; if(v&&v!=='None') return v;} return '—'; };
  return {
    cod:get('cod_lmi','cod','COD_LMI'),
    denumire:get('denumire','DENUMIRE','name','Denumire'),
    localitate:get('localitate','LOCALITATE','city'),
    judet:get('judet','JUDET','county'),
    categorie:get('categorie','CATEGORIE','cat'),
    datare:get('datare','DATARE','date'),
    adresa:get('adresa','ADRESA','address'),
    zonaProtectie:get('zona_protectie','ZONA_PROTECTIE','zona_prot','raza_protectie'),
    stare:get('stare','STARE'),
    coords:feat.geometry?.coordinates||null,
    dist:null,
  };
}


function getActiveUAT(){ return S_UAT; }
function getUATLabel(){ return S_UAT.label || 'Localitate'; }
function getUATJudet(){ return S_UAT.judet || ''; }
function getPrimar(){ return S_UAT.config?.primar || 'Primăria Locală'; }
function getAeroprtConfig(){ return S_UAT.config?.aeroport || null; }
function getSeismConfig(){ return S_UAT.config?.seism || {zona:'E',ag:0.20,Tc:1.6,MSK:'VII-VIII'}; }

// Detectare automată UAT din coordonate (reverse geocoding Nominatim)
async function detectUATFromCoords(lat, lng){
  try{
    const url=`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
    const r=await fetch(url,{headers:{'Accept-Language':'ro'}});
    if(!r.ok) return null;
    const d=await r.json();
    const addr=d.address||{};
    const city=addr.city||addr.town||addr.village||addr.municipality||'';
    const county=addr.county||addr.state||'';
    const postcode=addr.postcode||'';
    return {
      city, county, postcode,
      raw: addr,
      label: city+(county?', '+county:''),
      country: addr.country_code?.toUpperCase()||'RO'
    };
  }catch(e){ return null; }
}

// Actualizare UAT când utilizatorul navighează pe hartă
async function updateUATFromLocation(lat, lng){
  const info = await detectUATFromCoords(lat, lng);
  if(!info || info.country!=='RO') return;

  const cityNorm = info.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

  // Caută în UAT_CONFIG
  let matched = null;
  for(const [id, cfg] of Object.entries(UAT_CONFIG)){
    if(id==='_template') continue;
    const cfgNorm = cfg.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    if(cfgNorm.includes(cityNorm)||cityNorm.includes(cfgNorm.split(' ').pop())){
      matched={id,cfg}; break;
    }
  }

  if(matched){
    S_UAT = {id:matched.id, config:matched.cfg, label:matched.cfg.label, judet:matched.cfg.judet, judetCode:matched.cfg.judetCode};
  } else {
    // UAT neconfigurat — creem unul dinamic cu date minime
    S_UAT = {
      id:'dynamic-'+cityNorm,
      config:{...UAT_CONFIG._template, label:info.city, judet:info.county, pugFile:null, cadastruIndex:null},
      label:info.city, judet:info.county, judetCode:'',
      _dynamic:true, _raw:info
    };
  }

  // Actualizăm UI
  const uatEl=document.getElementById('uat-indicator');
  if(uatEl) uatEl.textContent=S_UAT.label;

  // Dacă PUG-ul UAT-ului nou e diferit de cel încărcat, notificăm
  if(matched && matched.cfg.pugFile && matched.cfg.pugFile!==S_UAT.config?.pugFile){
    ss(`📍 UAT detectat: ${S_UAT.label} — PUG disponibil`);
    // loadDataForUAT(matched.id); // dezactivat până la implementare completă per UAT
  } else if(S_UAT._dynamic){
    ss(`📍 ${S_UAT.label}, ${S_UAT.judet} — PUG local indisponibil. Parametrii se preiau din ANCPI/IGRP.`);
  }
}

// ── LMI cultura.ro — interogare CIMEC WFS cu câmpuri complete ────────────
async function _lmiQueryCimec(lon, lat, radiusKm=2){
  const R=radiusKm/111.32;
  const bbox=`${lon-R},${lat-R},${lon+R},${lat+R}`;
  const results={monumente:[],zone:[],situri:[],ok:false,source:'CIMEC WFS'};

  // Layerele CIMEC cu câmpuri LMI complete
  const layerQueries=[
    {typename:'LMI_Puncte',  key:'monumente'},
    {typename:'LMI_Poligoane',key:'zone'},
    {typename:'Situri_Arh',  key:'situri'},
  ];

  for(const lq of layerQueries){
    try{
      const url=`https://map.cimec.ro/Mapserver/wfs?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature`+
        `&TYPENAME=${lq.typename}&BBOX=${bbox},EPSG:4326&SRSNAME=EPSG:4326`+
        `&OUTPUTFORMAT=application/json&maxFeatures=100`;
      const r=await fetch(url,{signal:AbortSignal.timeout(10000)});
      if(r.ok){
        const ct=r.headers.get('content-type')||'';
        if(ct.includes('json')){
          const d=await r.json();
          results[lq.key]=d.features||[];
          results.ok=true;
        }
      }
    }catch(e){}
  }

  // Fallback: WFS alternativ cu GML
  if(!results.ok){
    try{
      const url=`https://map.cimec.ro/Mapserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo`+
        `&QUERY_LAYERS=LMI_Puncte&LAYERS=LMI_Puncte`+
        `&BBOX=${bbox}&CRS=EPSG:4326&WIDTH=100&HEIGHT=100`+
        `&I=50&J=50&INFO_FORMAT=application/json`;
      const r=await fetch(url,{signal:AbortSignal.timeout(6000)});
      if(r.ok) results.ok=true;
    }catch(e){}
  }

  return results;
}

// Formatare monument LMI pentru afișare
function _lmiFormatMonument(feat){
  const p=feat.properties||{};
  // Câmpuri standard CIMEC LMI
  return {
    cod:      p.cod_lmi   ||p.COD_LMI   ||p.Cod_LMI   ||p.cod     ||'—',
    denumire: p.denumire  ||p.DENUMIRE  ||p.Denumire  ||p.name    ||'Monument nedenumit',
    localitate:p.localitate||p.LOCALITATE||p.Localitate||p.city   ||'—',
    judet:    p.judet     ||p.JUDET     ||p.Judet     ||p.county  ||'—',
    categorie:p.categorie ||p.CATEGORIE ||p.Categorie ||p.cat     ||'—',
    datare:   p.datare    ||p.DATARE    ||p.Datare    ||p.date    ||'—',
    adresa:   p.adresa    ||p.ADRESA    ||p.Adresa    ||p.address ||'—',
    zonaProtectie: p.zona_protectie||p.ZONA_PROTECTIE||'100m (default)',
    stare:    p.stare     ||p.STARE     ||'—',
    descriere:p.descriere ||p.DESCRIERE ||'',
    coords:   feat.geometry?.coordinates||null,
  };
}

// ── Afișare widget CIMEC în panel Analiza ───────────────────────────────
let _cimecWidgetData = null;

function showCimecWidget(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectati o parcela.');return;}
  const ctr=turf.centerOfMass(ap.geo).geometry.coordinates;
  const lon=ctr[0].toFixed(5);
  const lat=ctr[1].toFixed(5);
  const nrcad=ap.nrcad||'?';
  const uatLabel=getUATLabel();

  // URL-uri directe catre CIMEC si alte resurse (fara fetch/CORS)
  const cimecMapUrl  = 'https://map.cimec.ro/Mapserver/map?center='+lon+','+lat+'&zoom=16';
  const culturaUrl   = 'https://www.cultura.ro/lista-monumentelor-istorice/';
  const googleUrl    = 'https://www.google.com/maps/search/monumente+istorice/@'+lat+','+lon+',16z';
  const wikiUrl      = 'https://ro.wikipedia.org/wiki/Special:Search?search=monumente+istorice+'+encodeURIComponent(uatLabel);

  // Date locale din UAT_REGISTRY
  const lmiCfg = getLmiConfig();
  const zoneLocal = lmiCfg.zone_protejate||[];
  const monLocal  = lmiCfg.monumente_reprezentative||[];

  // Calcul distante zone locale
  const zonesWithDist = zoneLocal.map(z=>{
    try{
      const d=Math.round(turf.distance(
        {type:'Feature',geometry:{type:'Point',coordinates:ctr},properties:{}},
        {type:'Feature',geometry:{type:'Point',coordinates:z.centru},properties:{}},
        {units:'meters'}
      ));
      return {...z, dist:d, inZona:d<z.raza};
    }catch(e){return {...z,dist:null,inZona:false};}
  }).sort((a,b)=>(a.dist||9999)-(b.dist||9999));

  const inZona = zonesWithDist.some(z=>z.inZona);

  document.getElementById('cimec-widget')?.remove();
  const div=document.createElement('div');
  div.id='cimec-widget';
  const mob=window.innerWidth<841;
  div.style.cssText='position:fixed;top:56px;'+(mob?'left:4px;right:4px;':'left:50%;transform:translateX(-50%);width:min(640px,95vw);')+
    'z-index:9200;background:rgba(7,12,24,.97);border:1px solid rgba(212,175,55,.3);border-radius:14px;overflow:hidden;'+
    'box-shadow:0 16px 48px rgba(0,0,0,.75);backdrop-filter:blur(16px);font-family:system-ui,sans-serif;max-height:88vh;display:flex;flex-direction:column';

  // Status badge
  const statusColor = inZona ? '#ef4444' : '#4ade80';
  const statusText  = inZona ? 'ATENȚIE — Amplasament în zonă protejată LMI!' : 'Fără zone protejate identificate local';

  // URL-uri
  const googleEmbedUrl = 'https://maps.google.com/maps?q='+lat+','+lon+'&z=17&output=embed&hl=ro';
  const cimecDirectUrl = 'https://map.cimec.ro/Mapserver/';

  div.innerHTML =
    // Header
    '<div style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between;flex-shrink:0">'+
      '<div>'+
        '<div style="color:#d4af37;font-weight:800;font-size:13px">🏛 LMI — Monumente Istorice</div>'+
        '<div style="color:#475569;font-size:9px;margin-top:1px">'+uatLabel+' · Parcela '+nrcad+' · '+lat+'°N, '+lon+'°E</div>'+
      '</div>'+
      '<button id="cimec-close-btn" style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:6px;padding:3px 10px;font-size:11px;font-weight:700;cursor:pointer">✕</button>'+
    '</div>'+
    // Status
    '<div style="padding:10px 16px;background:'+statusColor+'18;border-bottom:1px solid rgba(255,255,255,.06);flex-shrink:0">'+
      '<span style="color:'+statusColor+';font-size:11px;font-weight:700">'+statusText+'</span>'+
    '</div>'+
    // Body scrollabil
    '<div style="overflow-y:auto;flex:1;padding:12px 16px">'+

      // Zone locale din UAT_REGISTRY
      (zonesWithDist.length>0 ?
        '<div style="margin-bottom:12px">'+
          '<div style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-bottom:6px">Zone protejate locale (date UAT_REGISTRY)</div>'+
          zonesWithDist.map(z=>
            '<div style="background:rgba(255,255,255,.04);border:1px solid '+(z.inZona?'rgba(239,68,68,.3)':'rgba(255,255,255,.07)')+';border-radius:8px;padding:8px 10px;margin-bottom:5px">'+
              '<div style="display:flex;justify-content:space-between;align-items:flex-start">'+
                '<div>'+
                  '<div style="color:#d4af37;font-size:9px;font-weight:700">'+z.cod+'</div>'+
                  '<div style="color:#e2e8f0;font-size:11px;font-weight:600;margin:2px 0">'+z.desc+'</div>'+
                  '<div style="color:#64748b;font-size:9px">'+z.tip+' · Raza: '+z.raza+'m · Aviz: '+(z.aviz||'DJCPN')+'</div>'+
                '</div>'+
                '<div style="text-align:right;flex-shrink:0;margin-left:8px">'+
                  '<div style="color:'+(z.inZona?'#ef4444':'#4ade80')+';font-size:10px;font-weight:700">'+(z.dist!==null?z.dist+'m':'—')+'</div>'+
                  '<div style="font-size:8px;color:'+(z.inZona?'#ef4444':'#64748b')+'">'+(z.inZona?'ÎN ZONĂ':'în afară')+'</div>'+
                '</div>'+
              '</div>'+
            '</div>'
          ).join('')+
        '</div>'
        : '<div style="color:#475569;font-size:10px;padding:6px 0 10px">Nicio zonă protejată în UAT_REGISTRY pentru '+uatLabel+'.</div>'
      )+

      // Monumente reprezentative
      (monLocal.length>0 ?
        '<div style="margin-bottom:12px">'+
          '<div style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-bottom:6px">Monumente reprezentative (date locale)</div>'+
          monLocal.map(m=>
            '<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:rgba(212,175,55,.06);border-radius:6px;margin-bottom:3px">'+
              '<span style="color:#d4af37;font-size:9px;font-weight:700;flex-shrink:0">'+m.cod.split('-').slice(-1)[0]+'</span>'+
              '<div style="flex:1">'+
                '<div style="color:#e2e8f0;font-size:10px;font-weight:600">'+m.denumire+'</div>'+
                '<div style="color:#64748b;font-size:8px">Cat. '+(m.categorie||'—')+' · '+(m.adresa||'—')+'</div>'+
              '</div>'+
            '</div>'
          ).join('')+
        '</div>'
        : ''
      )+

      // Harta embed — Google Maps centrat pe parcela
      '<div style="margin-bottom:12px">'+
        '<div style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-bottom:6px">🗺 Hartă amplasament (Google Maps)</div>'+
        '<div style="position:relative;border-radius:8px;overflow:hidden;border:1px solid rgba(212,175,55,.2)">'+
          '<iframe src="'+googleEmbedUrl+'" style="width:100%;height:280px;border:none;display:block" loading="lazy" allowfullscreen title="Harta amplasament"></iframe>'+
        '</div>'+
        '<div style="margin-top:6px;padding:8px 10px;background:rgba(212,175,55,.06);border:1px solid rgba(212,175,55,.15);border-radius:7px">'+
          '<div style="font-size:9px;color:#d4af37;font-weight:700;margin-bottom:4px">🏛 Verificare monumente pe harta CIMEC:</div>'+
          '<a href="'+cimecDirectUrl+'" target="_blank" style="color:#60a5fa;font-size:10px;font-weight:600;text-decoration:none">'+
            '→ Deschide map.cimec.ro/Mapserver/ și navighează la: '+lat+', '+lon+
          '</a>'+
          '<div style="color:#475569;font-size:8.5px;margin-top:3px">Copiaza coordonatele de mai sus si cauta manual in harta CIMEC (CORS blocheaza incarcarea automata)</div>'+
          '<button onclick="navigator.clipboard?.writeText(\''+lat+', '+lon+'\').then(()=>ss(\'📋 Coordonate copiate!\'))" '+
            'style="margin-top:5px;background:rgba(96,165,250,.15);border:1px solid rgba(96,165,250,.3);color:#60a5fa;border-radius:5px;padding:3px 9px;font-size:9px;cursor:pointer">'+
            '📋 Copiaza coordonate'+
          '</button>'+
        '</div>'+
      '</div>'+

    '</div>'+
    // Footer linkuri
    '<div style="padding:10px 16px;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0">'+
      '<div style="font-size:9px;color:#475569;font-weight:700;text-transform:uppercase;margin-bottom:6px">Verificare suplimentară</div>'+
      '<div style="display:flex;gap:5px;flex-wrap:wrap">'+
        '<a href="'+culturaUrl+'" target="_blank" style="color:#60a5fa;font-size:10px;font-weight:600;text-decoration:none;background:rgba(96,165,250,.1);border:1px solid rgba(96,165,250,.25);border-radius:5px;padding:4px 9px">📋 LMI cultura.ro</a>'+
        '<a href="'+googleUrl+'" target="_blank" style="color:#4ade80;font-size:10px;font-weight:600;text-decoration:none;background:rgba(74,222,128,.1);border:1px solid rgba(74,222,128,.25);border-radius:5px;padding:4px 9px">📍 Google Maps</a>'+
        '<a href="'+wikiUrl+'" target="_blank" style="color:#a78bfa;font-size:10px;font-weight:600;text-decoration:none;background:rgba(167,139,250,.1);border:1px solid rgba(167,139,250,.25);border-radius:5px;padding:4px 9px">📖 Wikipedia</a>'+
      '</div>'+
      '<div style="font-size:8px;color:#334155;margin-top:6px">Sursa: CIMEC — Institutul Național al Patrimoniului · map.cimec.ro · LMI 2015+actualizări</div>'+
    '</div>';

  document.body.appendChild(div);
  document.getElementById('cimec-close-btn')?.addEventListener('click',()=>div.remove());
  ss('🏛 LMI: '+(inZona?'ATENȚIE zonă protejată!':'hartă CIMEC deschisă'));
}



async function loadData(uatId){
  const uatCfg = (uatId && UAT_REGISTRY[uatId]) ? UAT_REGISTRY[uatId] : S_UAT;

  // Căi noi (data/&#123;id&#125;/) cu fallback la căile vechi din root (compatibilitate)
  const pugFile   = uatCfg?.pugFile        || './data/municipiul-iasi/pug.geojson';
  const cadFile   = uatCfg?.cadastruIndex  || './data/municipiul-iasi/cadastru_index.json';
  const reguliFile= uatCfg?.reguliFile     || null;

  // Fallback-uri pentru tranziția fișierelor vechi → structura nouă
  const pugFallbacks  = [pugFile,  './qGis_pug.iasi.geojson'];
  const cadFallbacks  = [cadFile,  './cadastru_index.json'];

  S._dataLoading=true;
  ss('⏳ Se încarcă date UAT…');

  // ── Încarcă PUG cu fallback ──────────────────────────────────────────
  let pugLoaded=false;
  for(const path of pugFallbacks){
    try{
      const r=await fetch(path);
      if(!r.ok) continue;
      S.pug=await r.json();
      S.pugIdx=[];
      S.pug.features.forEach(f=>{
        const u=normU(f.properties?.utr||'');if(!u||u==='?'||u==='??')return;
        try{const bb=turf.bbox(f);const area=turf.area(f);S.pugIdx.push({utr:u,geom:f.geometry,bb:[bb[0],bb[1],bb[2],bb[3]],area});}catch(e){}
      });
      S.pugIdx.sort((a,b)=>a.area-b.area);
      if(path!==pugFile) console.warn('PUG loaded from fallback path:',path);
      ss(`⏳ PUG OK (${S.pug.features.length} zone). Se încarcă cadastrul…`);
      pugLoaded=true;
      break;
    }catch(e){}
  }
  if(!pugLoaded) ss('⚠️ PUG indisponibil pentru acest UAT');

  // ── Încarcă Reguli PUG din reguli.json (dacă există) ─────────────────
  if(reguliFile){
    try{
      const rr=await fetch(reguliFile);
      if(rr.ok){
        const newReguli=await rr.json();
        if (typeof mergeIntoREGULI === 'function') {
          const ck = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
          mergeIntoREGULI(newReguli, ck);
        } else { Object.assign(REGULI, newReguli); }
      }
    }catch(e){ console.warn('reguli.json indisponibil:', e.message); }
  }

  // ── Încarcă Cadastru Index cu fallback ────────────────────────────────
  try{
    S.cadIdx=new Map(); S.cadHasPolygons=false; S.cadData={features:[]};
    for(const path of cadFallbacks){
      try{
        const ri=await fetch(path);
        if(!ri.ok) continue;
        const cadIdx=await ri.json();
        let _nrMin=Infinity,_nrMax=0;
        Object.entries(cadIdx).forEach(([nrcad,center])=>{
          S.cadIdx.set(nrcad.toLowerCase(),{type:'Feature',geometry:{type:'Point',coordinates:center},properties:{nrcad,center}});
          const n=parseInt(nrcad);
          if(!isNaN(n)){if(n<_nrMin)_nrMin=n;if(n>_nrMax)_nrMax=n;}
        });
        S.cadNrRange=[_nrMin===Infinity?0:_nrMin,_nrMax];
        if(path!==cadFile) console.warn('Cadastru loaded from fallback:', path);
        break;
      }catch(e){}
    }
    ss(`✅ ${S_UAT.label||'UAT'} · ${S.pug?.features?.length||0} zone PUG · Click pe hartă pentru a selecta un teren`);
    const elInit=document.getElementById('cadastru-status');
    if(elInit) elInit.textContent='💡 Apasă „Parcele din zonă" pentru a încărca parcelele vizibile.';
  }catch(e){
    S.cadData={type:'FeatureCollection',features:[]};
    ss(`✅ ${S.pug?.features?.length||0} zone PUG încărcate`);
  }
  if(typeof renderAll === "function") renderAll(); else if(typeof renderTab === "function") renderTab(S.tab||"search");
  ensureFAB();
  // Afișăm range nrcad disponibil
  setTimeout(()=>{
    const el = document.getElementById('cad-range');
    if(el && S.cadNrRange && S.cadNrRange[1]>0){
      el.textContent = '✅ Disponibil: '+S.cadNrRange[0].toLocaleString()+' – '+S.cadNrRange[1].toLocaleString();
    }
  }, 500);
}


// ═══ PDF EXPORT ═══════════════════════════════════════════════════════════
let _pdfOpt = 'full';

function selectPdfOpt(opt){
  _pdfOpt=opt;
  document.querySelectorAll('.pdf-opt').forEach(el=>el.classList.remove('sel'));
  const el=document.getElementById('pdf-opt-'+opt);
  if(el)el.classList.add('sel');
}

function showPdfModal(){
  _g('pdf-modal').classList.add('open');
  _g('pdf-progress').style.display='none';
}

// ═══════════════════════════════════════════════════════════════════════════
// PDF EXPORT — SISTEM COMPLET REDESENAT
// Rapoarte profesionale de analiză urbanistică
// ═══════════════════════════════════════════════════════════════════════════

// ── Paleta de culori pentru PDF ──────────────────────────────────────────
// PDF_C moved to top

// ── Header premium pe fiecare pagina ─────────────────────────────────────
function pdfHeader(pdf, title, subtitle, pg, total){
  const pw = pdf.internal.pageSize.getWidth();
  // Bara navy sus
  pdf.setFillColor(...PDF_C.navy);
  pdf.rect(0, 0, pw, 18, 'F');
  // Bara gold subtire
  pdf.setFillColor(...PDF_C.gold);
  pdf.rect(0, 18, pw, 1.5, 'F');
  // Logo
  pdf.setFont('helvetica','bold');
  pdf.setFontSize(13);
  pdf.setTextColor(...PDF_C.gold);
  pdf.text('UrbanX', 8, 12);
  // Titlu
  pdf.setFontSize(9);
  pdf.setTextColor(...PDF_C.goldL);
  pdf.text(title, 35, 9);
  pdf.setFontSize(7.5);
  pdf.setTextColor(180, 180, 200);
  pdf.text(subtitle||'', 35, 14.5);
  // Pagina dreapta
  const dateStr = new Date().toLocaleDateString('ro',{day:'2-digit',month:'long',year:'numeric'});
  pdf.setFontSize(7.5);
  pdf.setTextColor(160, 170, 190);
  pdf.text(`${dateStr}  ·  pag. ${pg}${total?' / '+total:''}`, pw-8, 11, {align:'right'});
  pdf.setTextColor(120,130,150);
  pdf.text('© UrbanX · FG · TSS', pw-8, 15.5, {align:'right'});
}

// ── Footer pe fiecare pagina ──────────────────────────────────────────────
function pdfFooter(pdf, note){
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();
  pdf.setFillColor(...PDF_C.gray1);
  pdf.rect(0, ph-8, pw, 8, 'F');
  pdf.setFontSize(6.5);
  pdf.setTextColor(...PDF_C.gray3);
  pdf.text(note||'Valorile sunt orientative. Verificați cu autoritățile competente. Sursă: PUG Iași · Cadastru local · OSM', 8, ph-3.5);
}

// ── Sectiune titlu ────────────────────────────────────────────────────────
function pdfSection(pdf, txt, y){
  const pw = pdf.internal.pageSize.getWidth();
  pdf.setFillColor(...PDF_C.navy);
  pdf.rect(8, y-4, pw-16, 8, 'F');
  pdf.setFillColor(...PDF_C.gold);
  pdf.rect(8, y-4, 2, 8, 'F');
  pdf.setFont('helvetica','bold');
  pdf.setFontSize(8.5);
  pdf.setTextColor(...PDF_C.gold);
  pdf.text(txt.toUpperCase(), 13, y+1);
  return y+12;
}

// ── Rand de tabel ─────────────────────────────────────────────────────────
function pdfRow(pdf, cols, y, isHeader, colWidths, x0){
  const x = x0||8;
  const h = isHeader ? 8 : 7;
  const bg = isHeader ? PDF_C.navy : (Math.floor(y/7)%2===0 ? PDF_C.offwhite : PDF_C.white);
  const pw_tot = colWidths.reduce((s,w)=>s+w,0);
  pdf.setFillColor(...bg);
  pdf.rect(x, y-h+2, pw_tot, h, 'F');
  if(isHeader){
    pdf.setDrawColor(...PDF_C.gold);
    pdf.setLineWidth(0.3);
    pdf.line(x, y-h+2, x+pw_tot, y-h+2);
    pdf.line(x, y+2, x+pw_tot, y+2);
  }
  let cx = x+2;
  cols.forEach((txt,i)=>{
    pdf.setFont('helvetica', isHeader?'bold':'normal');
    pdf.setFontSize(isHeader?7.5:7.5);
    pdf.setTextColor(...(isHeader?PDF_C.gold:PDF_C.dark));
    pdf.text(String(txt||'—'), cx, y, {maxWidth: (colWidths[i]||40)-3});
    cx += colWidths[i]||40;
  });
  return y + h;
}

// ── Card metric ──────────────────────────────────────────────────────────
function pdfMetric(pdf, label, value, unit, x, y, w, h, color){
  const c = color||PDF_C.blue;
  pdf.setFillColor(...PDF_C.offwhite);
  pdf.rect(x, y, w, h, 'F');
  pdf.setDrawColor(...c);
  pdf.setLineWidth(0.5);
  pdf.rect(x, y, w, h, 'S');
  pdf.setFillColor(...c);
  pdf.rect(x, y, 2, h, 'F');
  pdf.setFont('helvetica','normal');
  pdf.setFontSize(6.5);
  pdf.setTextColor(...PDF_C.gray3);
  pdf.text(label, x+5, y+5);
  pdf.setFont('helvetica','bold');
  pdf.setFontSize(12);
  pdf.setTextColor(...c);
  pdf.text(String(value||'—'), x+5, y+13);
  if(unit){
    pdf.setFontSize(7);
    pdf.setFont('helvetica','normal');
    pdf.setTextColor(...PDF_C.gray3);
    pdf.text(unit, x+5, y+18);
  }
}

// ── Badge colorat ─────────────────────────────────────────────────────────
function pdfBadge(pdf, txt, x, y, color){
  const c = color||PDF_C.blue;
  const w = pdf.getStringUnitWidth(txt)*8/pdf.internal.getFontSize()*pdf.internal.scaleFactor + 6;
  pdf.setFillColor(c[0],c[1],c[2],0.15);
  pdf.roundedRect(x, y-3.5, w, 5.5, 1, 1, 'F');
  pdf.setFont('helvetica','bold');
  pdf.setFontSize(7);
  pdf.setTextColor(...c);
  pdf.text(txt, x+3, y+0.5);
  return x + w + 3;
}

// ═══════════════════════════════════════════════════════════════════════════
// RAPORT COMPLET
// ═══════════════════════════════════════════════════════════════════════════
async function exportFull(pdf, ap, r, p){
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();
  const m2 = ap?.area||0;
  const hNiv = Number(S.vol.hNiv||3);
  const niv = pN(p.niv)||1;
  const totH = niv*hNiv;
  const sv_m2 = Math.round(m2*(pN(p.sv)||0)/100);
  const pot_ef = p.pot?Math.min(p.pot,100-(pN(p.sv)||0)):100-(pN(p.sv)||0);
  const SC_max = Math.floor(m2*pot_ef/100);
  const SD_max = p.cut?Math.floor(m2*p.cut):null;
  const fnVal = valFunctiune(S.vol.fn, ap?.utr);

  // ── PAGINA 1: Cover + Harta ─────────────────────────────────────────────
  const mapCanvas = await html2canvas(_g('map'),{useCORS:true,scale:1.8,logging:false});
  pdf.addImage(mapCanvas.toDataURL('image/jpeg',.88),'JPEG',0,0,pw,ph);
  // Overlay gradient jos
  pdf.setFillColor(8,21,42);
  for(let i=0;i<60;i++){
    pdf.setGState?pdf.setGState(new pdf.GState({opacity:(i/60)*0.85})):null;
    pdf.rect(0, ph-60+i, pw, 1, 'F');
  }
  pdf.setFillColor(...PDF_C.navy);
  pdf.setOpacity?pdf.setOpacity(0.88):null;
  pdf.rect(0, ph-55, pw, 55, 'F');
  // Reset opacity
  try{pdf.setOpacity(1);}catch(e){}
  // Header cover
  pdf.setFillColor(...PDF_C.navy);
  pdf.rect(0,0,pw,22,'F');
  pdf.setFillColor(...PDF_C.gold);
  pdf.rect(0,22,pw,1.5,'F');
  pdf.setFont('helvetica','bold');pdf.setFontSize(16);pdf.setTextColor(...PDF_C.gold);
  pdf.text('UrbanX', 10, 15);
  pdf.setFontSize(9);pdf.setTextColor(180,180,200);
  pdf.text('Analiza Urbanistica - PUG Iasi', 52, 10);
  pdf.setFontSize(7.5);pdf.setTextColor(140,150,170);
  pdf.text(new Date().toLocaleDateString('ro',{day:'2-digit',month:'long',year:'numeric'}), 52, 16.5);
  // Info jos
  pdf.setFontSize(10);pdf.setFont('helvetica','bold');pdf.setTextColor(...PDF_C.gold);
  pdf.text(`Parcela: ${ap?.nrcad||'—'}`, 12, ph-44);
  pdf.setFontSize(8.5);pdf.setTextColor(200,210,230);
  pdf.text(`UTR: ${ap?.utr||'—'}  ·  ${m2?Math.round(m2)+' m²':'—'}  ·  ${FN_UTR[S.vol.fn]?.label||S.vol.fn}`, 12, ph-36);
  pdf.setFontSize(7.5);pdf.setTextColor(140,150,170);
  pdf.text(`Scenariu: ${S.vol.scenariuConstructie==='liber'?'Demolare + construcție nouă':S.vol.scenariuConstructie==='extindere_h'?'Extindere orizontală':'Corp nou integrat'}`, 12, ph-28);
  pdf.text(`Surse date: Cadastru local · PUG Iași · OpenStreetMap`, 12, ph-21);
  pdf.text(`© UrbanX · FG · TSS · ${new Date().getFullYear()}`, pw-10, ph-10, {align:'right'});

  // ── PAGINA 2: Regulament PUG ────────────────────────────────────────────
  pdf.addPage('a4','portrait');
  pdfHeader(pdf,'REGULAMENT URBANISTIC',`UTR ${ap?.utr||'—'} — ${r.d||'Zona'}`,2);
  pdfFooter(pdf);
  let y = 28;

  y = pdfSection(pdf, '📋 Date parcelă identificată', y);
  // Metrics row
  const metrics = [
    ['Nr. cadastral', ap?.nrcad||'—', '', PDF_C.gold],
    ['Suprafață teren', m2?Math.round(m2):'—', 'm²', PDF_C.blue],
    ['UTR', ap?.utr||'—', '', PDF_C.teal],
    ['Zonare', detectZoneType(S.ll?.lat||0,S.ll?.lng||0,ap?.utr||'').label.replace(/[🏙🌿🌾]/g,'').trim(), '', detectZoneType(S.ll?.lat||0,S.ll?.lng||0,ap?.utr||'').type==='intravilan'?PDF_C.green:PDF_C.orange],
  ];
  const mw = (pw-20)/4;
  metrics.forEach(([lbl,val,unit,col],i)=>{
    pdfMetric(pdf, lbl, val, unit, 8+i*mw, y, mw-3, 22, col);
  });
  y+=26;

  y = pdfSection(pdf,'📐 Indicatori urbanistici maximi (PUG)', y);
  const indCols = [55,22,22,22,22,22,22,22,22];
  y = pdfRow(pdf,['Indicator','POT%','CUT','Niv.max','H max','Față str.','Lat.','Post.','SV%'],y,true,indCols);
  y = pdfRow(pdf,['Valoare PUG (max/min)',
    fmt(r.pot,'%'),fmt(r.cut),fmt(r.niv,' et.'),fmt(r.h,' m'),
    fmt(r.rf,' m'),fmt(r.rl,' m'),fmt(r.rs,' m'),fmt(r.sv,'%')],y,false,indCols);
  const apPOT = pN(p.pot)||r.pot||0;
  const apCUT = pN(p.cut)||r.cut||0;
  y = pdfRow(pdf,['Valoare proiect',
    fmt(apPOT,'%'),fmt(apCUT),fmt(pN(p.niv),' et.'),totH.toFixed(1)+' m',
    fmt(p.rf,' m'),fmt(p.rl,' m'),fmt(p.rs,' m'),fmt(p.sv,'%')],y,false,indCols);

  // Highlight depasiri
  [[apPOT,r.pot,'POT'],[apCUT,r.cut,'CUT']].forEach(([v,max,name])=>{
    if(v&&max&&v>max*1.05){
      pdf.setFillColor(...PDF_C.red);pdf.setGlobalAlpha?pdf.setGlobalAlpha(0.1):null;
      pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.setTextColor(...PDF_C.red);
      pdf.text(`⚠ ${name} depășit față de PUG (${v} > ${max})`, 10, y+2);y+=6;
    }
  });
  y+=4;

  y = pdfSection(pdf,'🏗 Utilizări și restricții', y);
  const catRows = [
    ['✅ ADMISE', r.ua||'—', PDF_C.green],
    ['⚠️ CONDIȚIONATE', r.uc||'—', PDF_C.orange],
    ['🚫 INTERZISE', r.ui||'—', PDF_C.red],
  ];
  catRows.forEach(([lbl,val,col])=>{
    const lines = pdf.splitTextToSize(val, pw-55);
    const rowH = Math.max(8, lines.length*4+4);
    pdf.setFillColor(col[0],col[1],col[2]);
    pdf.rect(8,y-1,3,rowH,'F');
    pdf.setFillColor(col[0],col[1],col[2], 0.05);
    pdf.rect(11,y-1,pw-22,rowH,'F');
    pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);pdf.setTextColor(...col);
    pdf.text(lbl, 13, y+3.5);
    pdf.setFont('helvetica','normal');pdf.setTextColor(...PDF_C.dark);
    pdf.text(lines, 45, y+3.5);
    y+=rowH+3;
  });
  y+=2;

  // Validare functiune
  const fvCol = fnVal.status==='ok'?PDF_C.green:fnVal.status==='warn'?PDF_C.orange:PDF_C.red;
  pdf.setFillColor(fvCol[0],fvCol[1],fvCol[2]);
  pdf.rect(8,y,pw-16,1,'F');
  y+=5;
  pdf.setFont('helvetica','bold');pdf.setFontSize(8);pdf.setTextColor(...fvCol);
  pdf.text(fnVal.msg.replace(/[✅⚠️🚫]/g,'').trim(), 10, y);y+=7;

  // Calcule sintetice
  y = pdfSection(pdf,'📊 Calcule sintetice pe teren', y);
  const calcs = [
    ['Suprafață teren total', m2?Math.round(m2)+' m²':'—'],
    ['Spații verzi obligatorii ('+fmt(p.sv,'%')+')', sv_m2+' m²'],
    ['Suprafață construibilă la sol (POT efectiv)', SC_max+' m²'],
    ['Suprafață desfășurată max (CUT)', SD_max?SD_max+' mp.ADC':'conform proiect'],
    ['Înălțime totală propusă', totH.toFixed(1)+' m ('+niv+' niveluri × '+hNiv+'m/nivel)'],
    ['Funcțiune propusă', FN_UTR[S.vol.fn]?.label||S.vol.fn],
    ['Parcaje necesare', calcParcaje(S.vol.fn, m2, 0, 0)],
  ];
  const calcW = [(pw-16)*0.55, (pw-16)*0.45];
  calcs.forEach(([l,v],i)=>{
    const bg = i%2===0?PDF_C.offwhite:PDF_C.white;
    pdf.setFillColor(...bg);pdf.rect(8,y-5,pw-16,7,'F');
    pdf.setFont('helvetica','normal');pdf.setFontSize(7.5);pdf.setTextColor(...PDF_C.gray3);
    pdf.text(l,10,y);
    pdf.setFont('helvetica','bold');pdf.setTextColor(...PDF_C.dark);
    pdf.text(v,8+calcW[0],y);
    y+=7;
  });

  // ── PAGINA 3: Context Urban ─────────────────────────────────────────────
  pdf.addPage('a4','portrait');
  pdfHeader(pdf,'CONTEXT URBAN EXISTENT','Clădiri în zona de influență · OpenStreetMap',3);
  pdfFooter(pdf);
  y=28;

  if(S.ctx?.features?.length){
    const ctxFeats = S.ctx.features;
    const hArr = ctxFeats.map(f=>f.properties?.h||0);
    const hMed = Math.round(hArr.reduce((s,h)=>s+h,0)/hArr.length);
    const hMax = Math.round(Math.max(...hArr));
    const hMin = Math.round(Math.min(...hArr.filter(h=>h>0)));
    const totalCtxArea = Math.round(ctxFeats.reduce((s,f)=>{try{return s+turf.area(f);}catch(e){return s;}},0));

    // Metrics context
    const ctxM=[
      ['Clădiri analizate', ctxFeats.length, 'în raza '+Math.round(S.vol.ctxR||200)+'m', PDF_C.blue],
      ['H medie context', hMed, 'm', PDF_C.teal],
      ['H maximă context', hMax, 'm', PDF_C.orange],
      ['H propusă', totH.toFixed(0), 'm ('+niv+' et.)', totH>hMax*1.3?PDF_C.red:totH>hMax?PDF_C.orange:PDF_C.green],
    ];
    const cmw=(pw-20)/4;
    ctxM.forEach(([lbl,val,unit,col],i)=>{
      pdfMetric(pdf,lbl,val,unit,8+i*cmw,y,cmw-3,22,col);
    });
    y+=28;

    y=pdfSection(pdf,'🎨 Funcțiuni clădiri existente în context',y);
    const fnCnt={};
    ctxFeats.forEach(f=>{const fn=f.properties?.fn||'yes';fnCnt[fn]=(fnCnt[fn]||0)+1;});
    const fnSorted=Object.entries(fnCnt).sort((a,b)=>b[1]-a[1]);
    const fnCols=[50,25,35,55,25,35];
    y=pdfRow(pdf,['Funcțiune','Nr.','%','Funcțiune','Nr.','%'],y,true,fnCols);
    const fnPairs=[];
    for(let i=0;i<fnSorted.length;i+=2){fnPairs.push([fnSorted[i],fnSorted[i+1]]);}
    fnPairs.forEach(([a,b])=>{
      const col=(hex)=>{
        const c=BLD_COL[hex]||'#8a9ab0';
        return [parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];
      };
      const row=[
        (BLD_LABELS?.[a[0]]||a[0]),a[1],Math.round(a[1]/ctxFeats.length*100)+'%',
        b?(BLD_LABELS?.[b[0]]||b[0]):'',b?b[1]:'',b?Math.round(b[1]/ctxFeats.length*100)+'%':''
      ];
      y=pdfRow(pdf,row,y,false,fnCols);
    });
    y+=6;

    y=pdfSection(pdf,'📏 Distribuție înălțimi clădiri context',y);
    // Histograma simpla pe text
    const bands=[[0,5,'0-5m'],[6,9,'6-9m'],[10,14,'10-14m'],[15,20,'15-20m'],[21,999,'21m+']];
    const bw=(pw-20)/bands.length;
    bands.forEach(([lo,hi,lbl],bi)=>{
      const cnt=hArr.filter(h=>h>=lo&&h<=hi).length;
      const pct=ctxFeats.length>0?cnt/ctxFeats.length:0;
      const barH=Math.round(pct*40);
      // Bar
      const col=bi<2?PDF_C.green:bi<3?PDF_C.blue:bi<4?PDF_C.orange:PDF_C.red;
      pdf.setFillColor(...col);
      pdf.rect(10+bi*bw, y+40-barH, bw-4, barH, 'F');
      pdf.setFillColor(...PDF_C.offwhite);
      pdf.rect(10+bi*bw, y, bw-4, 40-barH, 'F');
      // Label
      pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.setTextColor(...PDF_C.dark);
      pdf.text(String(cnt), 10+bi*bw+(bw-4)/2, y+38-barH, {align:'center'});
      pdf.setFont('helvetica','normal');pdf.setFontSize(6.5);pdf.setTextColor(...PDF_C.gray3);
      pdf.text(lbl, 10+bi*bw+(bw-4)/2, y+46, {align:'center'});
      pdf.text(Math.round(pct*100)+'%', 10+bi*bw+(bw-4)/2, y+51, {align:'center'});
    });
    y+=58;

    // Tabel primele 10 cladiri ca inaltime
    y=pdfSection(pdf,'🏢 Top clădiri context (după înălțime)',y);
    const top10=ctxFeats.slice().sort((a,b)=>(b.properties?.h||0)-(a.properties?.h||0)).slice(0,10);
    const t10cols=[12,40,22,22,35,55];
    y=pdfRow(pdf,['#','Funcțiune','H (m)','Niv.','Dist. aprox.','Culoare funcțiune'],y,true,t10cols);
    top10.forEach((f,i)=>{
      const fn=f.properties?.fn||'yes';
      const col=BLD_COL[fn]||'#8a9ab0';
      const colRGB=[parseInt(col.slice(1,3),16),parseInt(col.slice(3,5),16),parseInt(col.slice(5,7),16)];
      try{
        const lbl=BLD_LABELS?.[fn]||fn;
        const dist=ap?.geo?.geometry?Math.round(turf.distance(turf.centerOfMass(ap.geo),turf.centerOfMass(f),{units:'meters'}))+'m':'—';
        y=pdfRow(pdf,[i+1,lbl,Math.round(f.properties?.h||0),f.properties?.lv||'—',dist,''],y,false,t10cols);
        // Coloram celula functiune
        pdf.setFillColor(...colRGB);
        pdf.rect(8+t10cols.slice(0,5).reduce((s,w)=>s+w,0), y-5, t10cols[5]-3, 5, 'F');
        pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.setTextColor(255,255,255);
        pdf.text(lbl.slice(0,12), 8+t10cols.slice(0,5).reduce((s,w)=>s+w,0)+2, y-1.5);
      }catch(e){}
    });
  } else {
    pdf.setFont('helvetica','italic');pdf.setFontSize(9);pdf.setTextColor(...PDF_C.gray3);
    pdf.text('Context urban neincarcat. Selectati un teren si apasati Genereaza Volum 3D pentru a incarca contextul.', 10, y+10, {maxWidth:pw-20});
  }

  // ── PAGINA 4: Proiect + Volum ───────────────────────────────────────────
  pdf.addPage('a4','portrait');
  pdfHeader(pdf,'PARAMETRI PROIECT ȘI VOLUMETRIE','Configurație urbanistică propusă',4);
  pdfFooter(pdf);
  y=28;

  // Screenshot volumetrie (captam vederea curenta)
  const vol_h = 70;
  try{
    const vc=await html2canvas(_g('map'),{useCORS:true,scale:1.2,logging:false});
    pdf.addImage(vc.toDataURL('image/jpeg',.82),'JPEG',8,y,pw-16,vol_h);
    pdf.setDrawColor(...PDF_C.gold);pdf.setLineWidth(0.5);
    pdf.rect(8,y,pw-16,vol_h,'S');
    y+=vol_h+5;
  }catch(e){y+=5;}

  y=pdfSection(pdf,'⚙️ Parametri urbanistici setați vs PUG',y);
  const parCols=[65,30,30,61];
  y=pdfRow(pdf,['Parametru','Valoare PUG','Valoare proiect','Obs.'],y,true,parCols);
  const parRows=[
    ['POT — Procent Ocupare Teren (%)',fmt(r.pot,'%'),fmt(apPOT,'%'),
      apPOT>r.pot*1.05?'⚠ Depășire PUG':apPOT<r.pot?'Sub max PUG':'= PUG'],
    ['CUT — Coef. Utilizare Teren',fmt(r.cut),fmt(apCUT),
      apCUT>r.cut*1.05?'⚠ Depășire PUG':apCUT<r.cut?'Sub max PUG':'= PUG'],
    ['Nr. niveluri max',fmt(r.niv,' et.'),fmt(pN(p.niv),' et.'),''],
    ['Înălțime totală (m)',fmt(r.h,' m'),totH.toFixed(1)+' m',
      totH>r.h*1.05?'⚠ Depășire PUG':totH<r.h?'Sub max PUG':'= PUG'],
    ['Aliniament față stradă (m)',fmt(r.rf,' m'),fmt(p.rf,' m'),p.rf===0?'Calcan stradal':''],
    ['Aliniament lateral stg. (m)',fmt(r.rl,' m'),fmt(p.rl,' m'),p.rl===0?'Calcan lateral':''],
    ['Aliniament lateral dr. (m)',fmt(r.rl,' m'),fmt(p.rr,' m'),p.rr===0?'Calcan lateral':''],
    ['Aliniament posterior / spate (m)',fmt(r.rs,' m'),fmt(p.rs,' m'),p.rs===0?'Calcan posterior':''],
    ['Spații verzi obligatorii (%)',fmt(r.sv,'%'),fmt(p.sv,'%'),
      p.sv<r.sv?'⚠ Sub min PUG':'≥ min PUG'],
    ['Parcaje necesare',fmt(r.pk,' loc/100mp'),calcParcaje(S.vol.fn,m2,0,0),'calc. funcțiune'],
  ];
  parRows.forEach(row=>{ y=pdfRow(pdf,row,y,false,parCols); });
  y+=4;

  y=pdfSection(pdf,'📐 Suprafețe calculate',y);
  const sfCols=[80,45,60];
  y=pdfRow(pdf,['Element','Suprafață','Observație'],y,true,sfCols);
  const sfRows=[
    ['Suprafață totală teren', m2?Math.round(m2)+' m²':'—', '100%'],
    ['Spații verzi obligatorii ('+fmt(p.sv,'%')+')', sv_m2+' m²', 'Obligatoriu neconstructibil'],
    ['Suprafață construibilă la sol (SC)', SC_max+' m²', 'POT efectiv '+pot_ef+'%'],
    ['Suprafață desfășurată (SD)', SD_max?SD_max+' mp.ADC':'—', 'CUT × Teren'],
    ['Teren neconstruibil (aliniamente+SV)', Math.max(0,m2-SC_max-sv_m2)+' m²', 'Curți, circulații'],
  ];
  sfRows.forEach(row=>{ y=pdfRow(pdf,row,y,false,sfCols); });
  // Pagina AEDIS (daca volumul 3D avansat a fost generat)
  await exportAEDISPage(pdf);
}

// ═══════════════════════════════════════════════════════════════════════════
// AEDIS PDF PAGE — Volumetrie avansată + AI Render
// ═══════════════════════════════════════════════════════════════════════════
async function exportAEDISPage(pdf){
  if(!AEDIS3D.active && !FAL_AI.lastRender) return; // nimic de exportat
  const pw = pdf.internal.pageSize.getWidth();
  
  pdf.addPage('a4','portrait');
  pdfHeader(pdf,'Urban3D — Volumetrie',
    AEDIS_STIL[AEDIS.stil]?.label + ' · ' + (AEDIS_FN[AEDIS.fn]?.label||''), 
    pdf.internal.getCurrentPageInfo().pageNumber);
  pdfFooter(pdf);
  let y = 28;

  // Screenshot Three.js / Mapbox cu volumul AEDIS
  if(AEDIS3D.active){
    try{
      map.triggerRepaint();
      await new Promise(r=>setTimeout(r,600));
      const vc = await html2canvas(_g('map'),{useCORS:true,scale:1.5,logging:false});
      pdf.addImage(vc.toDataURL('image/jpeg',.85),'JPEG',8,y,pw-16,68);
      pdf.setDrawColor(212,175,55);pdf.setLineWidth(0.4);
      pdf.rect(8,y,pw-16,68,'S');
      pdf.setFontSize(7);pdf.setTextColor(100,116,139);
      pdf.text('Volumetrie 3D generata cu UrbanX - Three.js - Mapbox GL JS', pw/2, y+70, {align:'center'});
      y += 76;
    }catch(e){ y += 4; }
  }

  // AI Render (daca disponibil)
  if(FAL_AI.lastRender?.url){
    y = pdfSection(pdf,'🎨 AI Render Fotorealist — Fal.ai FLUX.1', y);
    try{
      const imgH = AEDIS3D.active ? 62 : 90;
      pdf.addImage(FAL_AI.lastRender.url,'JPEG',8,y,pw-16,imgH);
      pdf.setDrawColor(212,175,55);pdf.setLineWidth(0.4);
      pdf.rect(8,y,pw-16,imgH,'S');
      y += imgH + 3;
      pdf.setFontSize(7);pdf.setTextColor(100,116,139);
      pdf.text('Generat cu Fal.ai FLUX.1 · ' + new Date(FAL_AI.lastRender.timestamp).toLocaleString('ro'), pw/2, y, {align:'center'});
      y += 5;
    }catch(e){ y += 3; }
  }

  // Parametri AEDIS
  y = pdfSection(pdf,'⚡ Parametri volum', y);
  const ap = S.parcels[S.activeParcel??0];
  const params2 = ap?.params||getDefaultParams(ap?.utr||'');
  const fnDef = AEDIS_FN[AEDIS.fn]||AEDIS_FN.rezidential_colectiv;
  const niv = AEDIS.corpuri[0]?.niv||4;
  const hNiv = AEDIS.corpuri[0]?.hNiv||3.0;
  const hP = AEDIS.parterDiferit?(fnDef.hParter||4.5):hNiv;
  const hTot = hP + (niv-1)*hNiv;

  const aedisRows = [
    ['Funcțiune principală', fnDef.label.replace(/[🏠🏡🏢🏬🏨🏙🏭🏛]/g,'').trim()],
    ['Stil arhitectural', AEDIS_STIL[AEDIS.stil]?.label||AEDIS.stil],
    ['Nr. niveluri', niv + ' niveluri'],
    ['H parter', hP.toFixed(1) + ' m'],
    ['H etaj curent', hNiv.toFixed(1) + ' m'],
    ['H total', hTot.toFixed(1) + ' m'],
    ['Tip acoperiș', {terasa_plata:'Terasă plată',terasa_circulabila:'Terasă circulabilă',
      sarpanta:'Șarpantă',mansarda:'Mansardă',combinat:'Combinat'}[AEDIS.tipAcoperis]||AEDIS.tipAcoperis],
    ['Scenariu construcție', {demolare:'Demolare + Teren liber',extindere_h:'Extindere orizontală',
      extindere_v:'Extindere verticală',inglobare:'Inglobare existente'}[AEDIS.scenariu]||AEDIS.scenariu],
    ['Parter cu altă funcțiune', AEDIS.parterDiferit ? 
      (AEDIS_FN[AEDIS.fnParter]?.label||AEDIS.fnParter) : 'Nu'],
    ['Etaj retras', AEDIS.activeRetragere ? 
      'Da (' + Math.round((AEDIS.retrageriFineEtaje[niv-1]||AEDIS_STIL[AEDIS.stil]?.retragereFactor||0.85)*100) + '%)' : 'Nu'],
  ];

  const cols2 = [85,100];
  y = pdfRow(pdf,['Parametru','Valoare'],y,true,cols2);
  aedisRows.forEach(row=>{ y = pdfRow(pdf,row,y,false,cols2); });
}

// ═══════════════════════════════════════════════════════════════════════════
// RAPORT MULTIPARCELĂ — COMPLET
// ═══════════════════════════════════════════════════════════════════════════
async function exportMulti(pdf){
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();
  const parcele = S.parcels;
  const totalArea = parcele.reduce((s,p)=>s+(p.area||0),0);

  // ── PAGINA 1: Cover + harta cu toate parcelele ──────────────────────────
  const mc = await html2canvas(_g('map'),{useCORS:true,scale:1.8,logging:false});
  pdf.addImage(mc.toDataURL('image/jpeg',.88),'JPEG',0,0,pw,ph);
  pdf.setFillColor(...PDF_C.navy);
  pdf.rect(0,0,pw,22,'F');
  pdf.setFillColor(...PDF_C.gold);
  pdf.rect(0,22,pw,1.5,'F');
  pdf.setFont('helvetica','bold');pdf.setFontSize(16);pdf.setTextColor(...PDF_C.gold);
  pdf.text('UrbanX', 10, 15);
  pdf.setFontSize(10);pdf.setTextColor(200,210,230);
  pdf.text('Raport Multiparcela', 50, 11);
  pdf.setFontSize(8);pdf.setTextColor(150,160,180);
  pdf.text(new Date().toLocaleDateString('ro',{day:'2-digit',month:'long',year:'numeric'}), 50, 17);
  // Info josul hartii
  pdf.setFillColor(...PDF_C.navy);
  pdf.rect(0,ph-40,pw,40,'F');
  pdf.setFillColor(...PDF_C.gold);
  pdf.rect(0,ph-40,pw,1,'F');
  pdf.setFont('helvetica','bold');pdf.setFontSize(11);pdf.setTextColor(...PDF_C.gold);
  pdf.text(`${parcele.length} parcele selectate  ·  Suprafață totală: ${Math.round(totalArea).toLocaleString()} m²`, 10, ph-27);
  pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.setTextColor(160,170,190);
  const utrList=[...new Set(parcele.map(p=>p.utr||'—').filter(u=>u!=='—'))].join(', ');
  pdf.text(`UTR-uri: ${utrList||'—'}  ·  Surse: Cadastru local · PUG Iași`, 10, ph-19);
  pdf.text('© UrbanX · FG · TSS', pw-10, ph-10, {align:'right'});

  // ── PAGINA 2: Sumar parcele ─────────────────────────────────────────────
  pdf.addPage('a4','portrait');
  pdfHeader(pdf,'SUMAR PARCELE SELECTATE',parcele.length+' parcele · '+Math.round(totalArea)+' m² total',2);
  pdfFooter(pdf);
  let y=28;

  // Metrici globale
  const metG=[
    ['Parcele selectate',parcele.length,'',PDF_C.blue],
    ['Suprafață totală',Math.round(totalArea).toLocaleString(),'m²',PDF_C.teal],
    ['Suprafață medie',Math.round(totalArea/Math.max(1,parcele.length)),'m²/parcelă',PDF_C.gold],
    ['UTR-uri distincte',[...new Set(parcele.map(p=>p.utr||'—'))].length,'',PDF_C.green],
  ];
  const mgw=(pw-20)/4;
  metG.forEach(([l,v,u,c],i)=>pdfMetric(pdf,l,v,u,8+i*mgw,y,mgw-3,22,c));
  y+=28;

  y=pdfSection(pdf,'📋 Tabel parcele — Date cadastrale și indicatori',y);
  const mCols=[8,22,12,20,25,20,15,18,26];
  y=pdfRow(pdf,['#','Nr.Cad.','UTR','Suprafață','Funcțiune','POT%','CUT','H max (m)','Parcaje'],y,true,mCols);
  parcele.forEach((p,i)=>{
    const r2=REGULI[p.utr]||{};
    const pp=p.params||getDefaultParams(p.utr);
    const fnVal2=valFunctiune(p.fn||S.vol.fn,p.utr);
    const statusCol=fnVal2.status==='ok'?PDF_C.green:fnVal2.status==='warn'?PDF_C.orange:PDF_C.red;
    y=pdfRow(pdf,[
      i+1, p.nrcad||'—', p.utr||'—',
      p.area?Math.round(p.area)+' m²':'—',
      (FN_UTR[p.fn||S.vol.fn]?.label||S.vol.fn).slice(0,18),
      fmt(pp.pot||r2.pot,'%'), fmt(pp.cut||r2.cut), fmt(pp.h||r2.h,' m'),
      calcParcaje(p.fn||S.vol.fn,p.area||0,0,0)
    ],y,false,mCols);
    // Bara colorata stare functiune
    pdf.setFillColor(...statusCol);
    pdf.rect(8,y-5,1.5,5,'F');
  });
  y+=6;

  // Sumar financiar/urbanistic
  y=pdfSection(pdf,'📊 Calcule cumulate (toate parcelele)',y);
  const potMed=Math.round(parcele.reduce((s,p)=>{const r2=REGULI[p.utr]||{};return s+(pN(p.params?.pot)||pN(r2.pot)||0);},0)/Math.max(1,parcele.length));
  const totSC=Math.round(totalArea*(potMed/100));
  const cutMed=parcele.reduce((s,p)=>{const r2=REGULI[p.utr]||{};return s+(pN(p.params?.cut)||pN(r2.cut)||0);},0)/Math.max(1,parcele.length);
  const totSD=Math.round(totalArea*cutMed);
  const cumRows=[
    ['Suprafață totală teren',Math.round(totalArea).toLocaleString()+' m²','suma tuturor parcelelor'],
    ['POT mediu ponderat',potMed+'%','medie indicatori PUG per parcelă'],
    ['Suprafață construibilă la sol (est.)',totSC.toLocaleString()+' m²','POT mediu × suprafață totală'],
    ['CUT mediu ponderat',cutMed.toFixed(1),'medie indicatori PUG'],
    ['Suprafață desfășurată estimată',totSD.toLocaleString()+' mp.ADC','CUT mediu × suprafață totală'],
    ['Nr. total parcaje necesare',parcele.reduce((s,p)=>s+Math.ceil((p.area||0)/100*(pN(getDefaultParams(p.utr)?.pk)||0)),0)+' locuri','conform funcțiune și suprafață'],
  ];
  const cumCols=[80,50,56];
  y=pdfRow(pdf,['Indicator cumulat','Valoare','Metodologie'],y,true,cumCols);
  cumRows.forEach(row=>y=pdfRow(pdf,row,y,false,cumCols));
  y+=6;

  // ── PAGINA 3: Detalii per parcelă ───────────────────────────────────────
  pdf.addPage('a4','portrait');
  pdfHeader(pdf,'DETALII PER PARCELĂ','Indicatori urbanistici individuali',3);
  pdfFooter(pdf);
  y=28;

  for(const [pi,parc] of parcele.entries()){
    if(y > ph-60){
      pdf.addPage('a4','portrait');
      pdfHeader(pdf,'DETALII PER PARCELĂ (continuare)','',3+Math.floor(pi/4));
      pdfFooter(pdf);
      y=28;
    }
    const r3=REGULI[parc.utr]||{};
    const pp3=parc.params||getDefaultParams(parc.utr);
    const hNiv3=Number(S.vol.hNiv||3);
    const niv3=pN(pp3.niv)||1;
    const totH3=niv3*hNiv3;
    const fv3=valFunctiune(parc.fn||S.vol.fn,parc.utr);
    const fc=[fv3.status==='ok'?PDF_C.green:fv3.status==='warn'?PDF_C.orange:PDF_C.red];

    // Card parcelă
    pdf.setFillColor(...PDF_C.offwhite);
    pdf.rect(8,y,pw-16,8,'F');
    pdf.setFillColor(...PDF_C.navy);
    pdf.rect(8,y,2,8,'F');
    pdf.setFont('helvetica','bold');pdf.setFontSize(9);pdf.setTextColor(...PDF_C.navy);
    pdf.text(`Parcela ${pi+1}: ${parc.nrcad||'—'}`, 13, y+5.5);
    // UTR badge
    pdf.setFillColor(...PDF_C.blue);
    pdf.roundedRect(pw-55,y+1.5,30,5,1,1,'F');
    pdf.setFontSize(7);pdf.setTextColor(...PDF_C.white);
    pdf.text('UTR: '+(parc.utr||'—'), pw-54, y+5.5);
    // Suprafata
    pdf.setFontSize(7.5);pdf.setFont('helvetica','normal');pdf.setTextColor(...PDF_C.gray3);
    pdf.text(parc.area?Math.round(parc.area)+' m²':'—', pw-20, y+5.5, {align:'right'});
    y+=11;

    // Grid indicatori
    const indW=(pw-20)/5;
    const indData=[
      ['POT%',fmt(pp3.pot||r3.pot,'%'),PDF_C.blue],
      ['CUT',fmt(pp3.cut||r3.cut),PDF_C.teal],
      ['H max',totH3.toFixed(0)+' m',PDF_C.orange],
      ['Niveluri',fmt(pN(pp3.niv),' et.'),PDF_C.gold],
      ['SV min',fmt(pp3.sv||r3.sv,'%'),PDF_C.green],
    ];
    indData.forEach(([l,v,c],i)=>{
      pdf.setFillColor(...PDF_C.white);
      pdf.rect(8+i*indW,y,indW-2,14,'F');
      pdf.setDrawColor(220,225,235);pdf.setLineWidth(0.3);
      pdf.rect(8+i*indW,y,indW-2,14,'S');
      pdf.setFont('helvetica','normal');pdf.setFontSize(6);pdf.setTextColor(...PDF_C.gray3);
      pdf.text(l,10+i*indW,y+4.5);
      pdf.setFont('helvetica','bold');pdf.setFontSize(9);pdf.setTextColor(...c);
      pdf.text(v,10+i*indW,y+11.5);
    });
    y+=17;

    // Validare functiune
    pdf.setFont('helvetica','normal');pdf.setFontSize(7);pdf.setTextColor(...fv3.status==='ok'?PDF_C.green:fv3.status==='warn'?PDF_C.orange:PDF_C.red);
    pdf.text(fv3.msg.replace(/[✅⚠️🚫]/g,'').trim().slice(0,100), 10, y+3);
    y+=9;
  }

  // ── PAGINA FINALA: Harta satelit/streets ───────────────────────────────
  pdf.addPage('a4','landscape');
  const mc2=await html2canvas(_g('map'),{useCORS:true,scale:1.5,logging:false});
  const pw2=pdf.internal.pageSize.getWidth(),ph2=pdf.internal.pageSize.getHeight();
  pdf.addImage(mc2.toDataURL('image/jpeg',.85),'JPEG',0,0,pw2,ph2);
  pdfHeader(pdf,'PLAN HARTĂ — PARCELE SELECTATE','',pdf.internal.getCurrentPageInfo().pageNumber);
}

// ═══════════════════════════════════════════════════════════════════════════
// RAPORT 3 SCENARII
// ═══════════════════════════════════════════════════════════════════════════
async function exportVol3(pdf, ap, r, p){
  const pw=pdf.internal.pageSize.getWidth(),ph=pdf.internal.pageSize.getHeight();
  const m2=ap?.area||0;
  const hNiv=Number(S.vol.hNiv||3);
  const niv=pN(p.niv)||1;
  const totH=niv*hNiv;
  const SC_max=Math.floor(m2*(pN(p.pot)||35)/100);
  const SD_max=m2*(pN(p.cut)||1.2);
  const origScen=S.vol.scenariuConstructie;
  const scenDef=[
    {id:'liber',   label:'Scenariu 1 — Demolare + Construcție Nouă',
     desc:'Toate clădirile existente pe teren sunt demolate. Se aplică regulile PUG integral pe teren complet liber. Footprint maxim conform POT și aliniamente.',
     ctxViz:false, col:PDF_C.green},
    {id:'extindere_h', label:'Scenariu 2 — Extindere Orizontală',
     desc:'Clădirile existente rămân pe teren. Volumul nou se construiește lipit sau adiacent, pe zona liberă rămasă conform aliniamentelor. H poate depăși clădirile existente.',
     ctxViz:true, col:PDF_C.blue},
    {id:'extindere_v', label:'Scenariu 3 — Corp Nou Integrat (V+H)',
     desc:'Clădirile existente sunt înglobate într-un corp arhitectural nou, mai mare. Footprint maxim conform PUG. Poate include consolidare verticală și extindere orizontală.',
     ctxViz:true, col:PDF_C.teal},
  ];

  for(const [si,sc] of scenDef.entries()){
    // Cover scenariu (landscape cu harta)
    pdf.addPage('a4','landscape');
    S.vol.scenariuConstructie=sc.id;
    const feats=buildVolume();
    setSource('vol-src',{type:'FeatureCollection',features:feats});
    S.vol.genDone=true;
    // Calculam si afisam distantele fata de vecinii adiacenti
    setTimeout(updateDistanceLines, 300);
    try{map.setLayoutProperty('ctx-3d','visibility',sc.ctxViz?'visible':'none');}catch(e){}
    await new Promise(r=>setTimeout(r,1200));
    const mc=await html2canvas(_g('map'),{useCORS:true,scale:1.6,logging:false});
    const pw2=pdf.internal.pageSize.getWidth(),ph2=pdf.internal.pageSize.getHeight();
    pdf.addImage(mc.toDataURL('image/jpeg',.88),'JPEG',0,0,pw2,ph2);
    // Header overlay
    pdf.setFillColor(...PDF_C.navy);
    pdf.rect(0,0,pw2,22,'F');
    pdf.setFillColor(...sc.col);
    pdf.rect(0,22,pw2,1.5,'F');
    pdf.setFont('helvetica','bold');pdf.setFontSize(13);pdf.setTextColor(...PDF_C.gold);
    pdf.text('UrbanX',10,14);
    pdf.setFontSize(10);pdf.setTextColor(...sc.col);
    pdf.text(sc.label,42,10);
    pdf.setFontSize(8);pdf.setTextColor(160,170,190);
    pdf.text(`Parcela: ${ap?.nrcad||'—'} · UTR: ${ap?.utr||'—'} · ${Math.round(m2)} m²`,42,16.5);
    // Info overlay jos
    pdf.setFillColor(...PDF_C.navy);
    pdf.rect(0,ph2-30,pw2,30,'F');
    pdf.setFillColor(...sc.col);
    pdf.rect(0,ph2-30,pw2,1,'F');
    pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.setTextColor(180,190,210);
    pdf.text(sc.desc, 10, ph2-20, {maxWidth:pw2-20});
    pdf.setFontSize(7.5);pdf.setTextColor(120,130,150);
    pdf.text(new Date().toLocaleDateString('ro',{day:'2-digit',month:'long',year:'numeric'}),pw2-10,ph2-8,{align:'right'});
  }

  // Restauram scenariu original
  S.vol.scenariuConstructie=origScen;
  const featsOrig=buildVolume();
  setSource('vol-src',{type:'FeatureCollection',features:featsOrig});
  try{_setCtxVisibility();}catch(e){}

  // ── Pagina comparatie ────────────────────────────────────────────────────
  pdf.addPage('a4','portrait');
  pdfHeader(pdf,'COMPARAȚIE SCENARII DE VOLUMETRIE','Analiză comparativă urbanistică',scenDef.length+1);
  pdfFooter(pdf);
  let y=28;

  // Metrics per scenariu
  y=pdfSection(pdf,'📊 Indicatori comparativi per scenariu',y);
  const scCols=[55,40,40,51];
  y=pdfRow(pdf,['Indicator','Sc.1 Demolare','Sc.2 Ext.Orizontal','Sc.3 Corp Integrat'],y,true,scCols);
  const scRows=[
    ['Suprafață construibilă la sol',SC_max+' m²',Math.round(SC_max*0.55)+' m² (zona liberă)',SC_max+' m²'],
    ['Suprafață desfășurată (SD)',Math.round(SD_max)+' mp.ADC',Math.round(SD_max*0.55)+' mp.ADC',Math.round(SD_max)+' mp.ADC'],
    ['Nr. niveluri',niv+' et.',niv+' et.',niv+' et.'],
    ['Înălțime totală',totH.toFixed(1)+' m',totH.toFixed(1)+' m',totH.toFixed(1)+' m'],
    ['POT realizabil',fmt(p.pot,'%'),Math.round((pN(p.pot)||35)*0.55)+'% (zona liberă)',fmt(p.pot,'%')],
    ['Spații verzi',Math.round(m2*(pN(p.sv)||30)/100)+' m²',Math.round(m2*(pN(p.sv)||30)/100)+' m²',Math.round(m2*(pN(p.sv)||30)/100)+' m²'],
    ['Clădiri existente','Demolate','Rămân (referință)','Înglobate în corp nou'],
    ['Context 3D în PDF','Ascuns','Vizibil','Vizibil'],
  ];
  scRows.forEach(row=>{ y=pdfRow(pdf,row,y,false,scCols); });
  y+=8;

  // Descrieri detaliate
  scenDef.forEach((sc,i)=>{
    if(y>230){
      pdf.addPage('a4','portrait');
      pdfHeader(pdf,'COMPARAȚIE SCENARII (continuare)','','');
      pdfFooter(pdf);
      y=28;
    }
    pdf.setFillColor(sc.col[0],sc.col[1],sc.col[2]);
    pdf.rect(8,y,2,20,'F');
    pdf.setFillColor(...PDF_C.offwhite);
    pdf.rect(10,y,pw-18,20,'F');
    pdf.setFont('helvetica','bold');pdf.setFontSize(9);pdf.setTextColor(...sc.col);
    pdf.text(sc.label,13,y+7);
    pdf.setFont('helvetica','normal');pdf.setFontSize(7.5);pdf.setTextColor(...PDF_C.dark);
    const lines=pdf.splitTextToSize(sc.desc,pw-28);
    pdf.text(lines,13,y+13);
    y+=25;
  });

  // Context urban in comparatie
  if(S.ctx?.features?.length){
    y+=4;
    y=pdfSection(pdf,'🌆 Context urban — referință pentru toate scenariile',y);
    const hArr=S.ctx.features.map(f=>f.properties?.h||0);
    const hMed=Math.round(hArr.reduce((s,h)=>s+h,0)/hArr.length);
    const hMax=Math.round(Math.max(...hArr));
    pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.setTextColor(...PDF_C.dark);
    pdf.text(`H medie context: ${hMed}m  ·  H maximă context: ${hMax}m  ·  Clădiri analizate: ${S.ctx.features.length}`, 10, y+4);
    y+=10;
    // Raport propus vs context
    const rapport=totH/Math.max(1,hMed);
    const rapCol=rapport>1.5?PDF_C.red:rapport>1.2?PDF_C.orange:PDF_C.green;
    pdf.setFont('helvetica','bold');pdf.setFontSize(8);pdf.setTextColor(...rapCol);
    pdf.text(`Raport H propusă / H medie context: ${rapport.toFixed(1)}x ${rapport>1.5?'— potențial impact peisagistic semnificativ':rapport>1.2?'— depășire moderată față de context':'— compatibil cu contextul'}`,10,y+4);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT DISPATCHER
// ═══════════════════════════════════════════════════════════════════════════
// ── Safe text pentru jsPDF (elimina diacritice care cauzeaza erori) ───────────
function _pdfSafe(str){
  if(str===null||str===undefined) return '';
  return String(str)
    // ── Diacritice românești — ambele forme Unicode (cu și fără cedilă) ──
    .replace(/[ăÃã]/g,'a').replace(/[âÂ]/g,'a')
    .replace(/[îÎ]/g,'i')
    .replace(/[șȘşŞ]/g,'s')
    .replace(/[țȚţŢ]/g,'t')
    // ── Alte diacritice europene comune ──
    .replace(/[àáäÀÁÄ]/g,'a').replace(/[èéêëÈÉÊË]/g,'e')
    .replace(/[ìíîïÌÍÎÏ]/g,'i').replace(/[òóôöÒÓÔÖ]/g,'o')
    .replace(/[ùúûüÙÚÛÜ]/g,'u').replace(/[ñÑ]/g,'n')
    .replace(/[çÇ]/g,'c').replace(/[ýÝ]/g,'y')
    .replace(/[ßẞ]/g,'ss').replace(/[æÆ]/g,'ae').replace(/[øØ]/g,'o')
    // ── Semne tipografice → ASCII ──
    .replace(/[„""''‚]/g,'"').replace(/[–—]/g,'-')
    .replace(/[…]/g,'...').replace(/[•·]/g,'*')
    .replace(/[×]/g,'x').replace(/[÷]/g,'/')
    .replace(/[©]/g,'(c)').replace(/[®]/g,'(R)').replace(/[™]/g,'(TM)')
    .replace(/[°]/g,' gr.').replace(/[±]/g,'+/-')
    .replace(/[²]/g,'2').replace(/[³]/g,'3').replace(/[¹]/g,'1')
    .replace(/[½]/g,'1/2').replace(/[¼]/g,'1/4').replace(/[¾]/g,'3/4')
    .replace(/[µ]/g,'u').replace(/[§]/g,'par.').replace(/[¶]/g,'alin.')
    .replace(/[←→↑↓↔]/g,'->')
    // ── Emoji și simboluri Unicode ──
    .replace(/[\u{1F000}-\u{1FFFF}]/gu,'').replace(/[\u2600-\u27FF]/g,'')
    .replace(/[\u{1F300}-\u{1F9FF}]/gu,'').replace(/[\u{1FA00}-\u{1FFFF}]/gu,'')
    // ── Orice alt non-Latin1 rămas ──
    .replace(/[^\x00-\xFF]/g,'')
    .trim();
}

async function runExport(){
  const prog=_g('pdf-progress');
  const msg=_g('pdf-prog-msg');
  if(prog) prog.style.display='block';
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('Selectati mai intai o parcela.'); if(prog) prog.style.display='none'; return; }

  const r=S.rule||REGULI[ap?.utr||'']||{};
  const p=ap?.params||getDefaultParams(ap?.utr||'');
  const utr=ap.utr||'—';
  const nrcad=String(ap.nrcad||'—');
  const area=ap.area?ap.area.toFixed(0):'—';
  const fnDef=AEDIS_FN[AEDIS.fn]||AEDIS_FN.rezidential_colectiv;
  const center=turf.centerOfMass(ap.geo);
  const lat=center.geometry.coordinates[1];
  const lon=center.geometry.coordinates[0];
  const dateStr=new Date().toLocaleDateString('ro-RO',{day:'2-digit',month:'long',year:'numeric'});
  const timeStr=new Date().toLocaleTimeString('ro-RO');
  const pot=String(p.pot||'—');
  const cut=String(p.cut||'—');
  const hmax=String(p.hmax||'—');
  const rf=String(parseFloat(p.rf)||5);
  const rl2=String(parseFloat(p.rl)||3);
  const rs2=String(parseFloat(p.rs)||5);
  const rl=String(p.rl||3);
  const rs=String(p.rs||5);
  const rr=String(p.rr||p.rl||3);
  const sv=String(p.sv||30);
  const niv=String(AEDIS.corpuri[0]?.niv||4);
  const aedisH=(S.vol._lastFeats||[]).reduce((m,f)=>Math.max(m,f.properties?.top||0),0);
  const S2=t=>_pdfSafe(t);
  const areaNum=parseFloat(area)||0;
  const potNum=parseFloat(pot)||0;
  const cutNum=parseFloat(cut)||0;
  const svNum=parseFloat(sv)||15;
  const scMax=potNum>0?Math.round(areaNum*potNum/100):0;
  const sdMax=cutNum>0?Math.round(areaNum*cutNum):0;
  const svMin=Math.round(areaNum*svNum/100);

  // ── Capturare imagini multiple ────────────────────────────────────────────
  const wait=ms=>new Promise(r2=>setTimeout(r2,ms));
  const waitF=async(n=3)=>{for(let i=0;i<n;i++)await new Promise(r2=>requestAnimationFrame(r2));};
  const origStyle=document.getElementById('selBase')?.value||'custom';

  // Funcție captură cu așteptare completă tile rendering
  const capMap=async(pitch,bearing,extraWait=0)=>{
    map.easeTo({pitch,bearing,duration:0});
    await waitF(5);await wait(500+extraWait);map.triggerRepaint();await waitF(4);await wait(400);
    try{const c=map.getCanvas();return c.width>0?c.toDataURL('image/jpeg',0.90):'';}catch(e){return'';}
  };

  // Funcție schimbare stil hartă cu așteptare completă
  const switchStyle=async(styleKey)=>{
    return new Promise(resolve=>{
      if(document.getElementById('selBase')?.value===styleKey){ resolve(); return; }
      map.once('style.load',async()=>{
        // Re-adăugăm layerele după schimbare stil
        try{ addLayers(); if(S.ctx) setSource('ctx-src',S.ctx); updateMap(); }catch(e){}
        if(S.vol._lastFeats?.length) try{ setSource('vol-src',{type:'FeatureCollection',features:S.vol._lastFeats}); }catch(e){}
        // Restaurăm și dist-src
        if(S.vol._lastDistFeats?.length) try{ setSource('dist-src',{type:'FeatureCollection',features:S.vol._lastDistFeats}); }catch(e){}
        await waitF(6); await wait(800); map.triggerRepaint(); await waitF(4); await wait(600);
        resolve();
      });
      map.setStyle(STYLES[styleKey]||STYLES.custom);
      if(document.getElementById('selBase')) document.getElementById('selBase').value=styleKey;
    });
  };

  // 1. Urban 3D (stilul curent) — vedere principală pitch 62°
  if(msg) msg.textContent='Captura Urban 3D principala...';
  await switchStyle('custom');
  const mapImg3D=await capMap(62,-20);

  // 2. Plan 2D ortogonal
  if(msg) msg.textContent='Captura plan 2D cadastral...';
  const mapImg2D=await capMap(0,0);

  // 3. Plan distanțe — zoom pe parcelă
  if(msg) msg.textContent='Captura plan distante...';
  let mapImgDist='';
  try{
    const bb=turf.bbox(ap.geo);
    map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:100,pitch:0,bearing:0,duration:0,maxZoom:18});
    await waitF(5);await wait(700);map.triggerRepaint();await waitF(4);await wait(500);
    mapImgDist=map.getCanvas().toDataURL('image/jpeg',0.90);
  }catch(e){}

  // 4-5. Vederi laterale/frontale Urban 3D
  if(msg) msg.textContent='Captura vederi laterale...';
  const mapImgLat=await capMap(58,90);
  const mapImgFront=await capMap(55,0);
  const mapImgAerial=await capMap(70,45);
  const mapImgBack=await capMap(55,180);

  // 6. Mapbox Standard 3D (stilul cu iluminare PBR reală) — captură separată
  if(msg) msg.textContent='Captura Mapbox Standard 3D...';
  let mapStdImg='';
  try{
    await switchStyle('standard');
    // Re-centrăm pe parcelă
    const center=turf.centerOfMass(ap.geo).geometry.coordinates;
    map.easeTo({center,zoom:17,pitch:60,bearing:-20,duration:0});
    await waitF(6);await wait(1000);map.triggerRepaint();await waitF(4);await wait(800);
    mapStdImg=map.getCanvas().toDataURL('image/jpeg',0.90);
  }catch(e){ console.warn('Standard style capture:',e.message); }

  // 7. Revenim la Urban 3D și restaurăm vista
  if(msg) msg.textContent='Se restaureaza harta...';
  await switchStyle('custom');
  try{map.easeTo({pitch:62,bearing:-20,duration:0});}catch(e){}

  // 8. Viewer 3D AEDIS — TOATE preseturile (offscreen, independent de viewer deschis)
  if(msg) msg.textContent='Captură viewer 3D Urban3D (zi/noapte/golden/overcast)...';
  let v3dImgs={};
  try{
    if(S.vol._lastFeats?.length){
      v3dImgs=await _v3dCaptureSilent(ap);
      console.log('V3D captures:', Object.keys(v3dImgs).filter(k=>v3dImgs[k]?.length>500));
    }
  }catch(e){ console.warn('V3D capture:',e.message); }

  // 9. AI Render dacă există
  let aiImg='';
  try{if(FAL_AI?.lastRender?.url)aiImg=FAL_AI.lastRender.url;}catch(e){}

  if(msg) msg.textContent='Se compileaza PDF-ul (8 pagini)...';

  try{
    const{jsPDF}=window.jspdf;
    const totalPag=8;
    const pdf=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
    const W=210,H=297;
    const DARK=[10,22,48],GOLD=[200,150,10],BLUE=[26,58,106],LIGHT=[248,249,251];

    const hdr=(title,pg)=>{
      pdf.setFillColor(...DARK);pdf.rect(0,0,W,24,'F');
      pdf.setFillColor(...GOLD);pdf.rect(0,0,W,2,'F');pdf.rect(0,22,W,2,'F');
      pdf.setFillColor(...GOLD);pdf.rect(14,0,3,24,'F');
      pdf.setTextColor(...GOLD);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
      pdf.text('URBANX — RAPORT URBANISTIC COMPLET',20,9);
      pdf.setTextColor(255,255,255);pdf.setFontSize(11);
      pdf.text(S2(title),W/2,15,{align:'center'});
      pdf.setTextColor(150,170,190);pdf.setFontSize(7);pdf.setFont('helvetica','normal');
      pdf.text('Pag.'+pg+'/'+totalPag+' · Parcela '+nrcad+' · UTR '+S2(utr),W-14,15,{align:'right'});
    };
    const ftr=()=>{
      pdf.setFillColor(240,242,246);pdf.rect(0,H-10,W,10,'F');
      pdf.setDrawColor(200,205,215);pdf.line(0,H-10,W,H-10);
      pdf.setTextColor(100,110,130);pdf.setFontSize(6.5);pdf.setFont('helvetica','normal');
      pdf.text('UrbanX · Parcela '+nrcad+' · '+S2(dateStr)+' · Valori orientative · Document cu caracter informativ',W/2,H-3.5,{align:'center'});
    };
    const sec=(txt,y,col)=>{
      col=col||BLUE;
      pdf.setFillColor(...col);pdf.rect(14,y-4,W-28,7,'F');
      pdf.setFillColor(...GOLD);pdf.rect(14,y-4,2,7,'F');
      pdf.setTextColor(255,255,255);pdf.setFontSize(8.5);pdf.setFont('helvetica','bold');
      pdf.text(S2(txt),19,y);return y+10;
    };
    const row2=(l1,v1,l2,v2,y)=>{
      const cw=(W-28)/4;
      pdf.setFillColor(242,245,252);pdf.rect(14,y,W-28,7,'F');
      pdf.setTextColor(80,95,115);pdf.setFont('helvetica','normal');pdf.setFontSize(7.5);
      pdf.text(S2(l1)+':',17,y+5);
      pdf.setTextColor(20,40,80);pdf.setFont('helvetica','bold');
      pdf.text(S2(String(v1)),17+cw,y+5);
      if(l2){
        pdf.setTextColor(80,95,115);pdf.setFont('helvetica','normal');
        pdf.text(S2(l2)+':',17+cw*2,y+5);
        pdf.setTextColor(20,40,80);pdf.setFont('helvetica','bold');
        pdf.text(S2(String(v2)),17+cw*3,y+5);
      }
      return y+7;
    };
    // Body text cu justify
    const body=(txt,x,y,maxW)=>{
      pdf.setTextColor(38,52,68);pdf.setFont('helvetica','normal');pdf.setFontSize(8.5);
      const mw=maxW||(W-28);
      const lines=pdf.splitTextToSize(S2(txt),mw);
      lines.forEach((line,i)=>{
        const isLast=i===lines.length-1||line.trim()==='';
        if(!isLast&&line.trim().length>0){
          const words=line.split(' ').filter(w=>w.length>0);
          if(words.length>1){
            const lw2=pdf.getTextWidth(line.replace(/\s+/g,' '));
            const sw=(mw-lw2)/(words.length-1);
            let cx=x||14;
            words.forEach(w=>{pdf.text(w,cx,y+i*5.2);cx+=pdf.getTextWidth(w)+pdf.getTextWidth(' ')+sw;});
          }else{pdf.text(line,x||14,y+i*5.2);}
        }else{pdf.text(line,x||14,y+i*5.2);}
      });
      return y+lines.length*5.2;
    };
    const addImg=(img,x,y,w,h2,caption)=>{
      if(!img||img.length<500)return y;
      try{pdf.addImage(img,'JPEG',x,y,w,h2,undefined,'FAST');}catch(e){return y;}
      pdf.setDrawColor(200,208,225);pdf.setLineWidth(0.3);pdf.rect(x,y,w,h2,'S');
      if(caption){pdf.setTextColor(90,105,130);pdf.setFontSize(6.5);pdf.setFont('helvetica','italic');pdf.text(S2(caption),x,y+h2+3.5);return y+h2+7;}
      return y+h2+3;
    };

    // ══ PAG 1: COPERTĂ ════════════════════════════════════════════════════════
    pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(12,28,60);pdf.rect(0,H*0.42,W,H*0.58,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,0,W,2.5,'F');pdf.rect(0,H-2.5,W,2.5,'F');
    const coverImg=mapImg3D||v3dImgs.day;  // Harta 3D prima - impact vizual mai mare
    if(coverImg&&coverImg.length>500){try{pdf.addImage(coverImg,'JPEG',0,0,W,H*0.44,undefined,'FAST');}catch(e){}}
    pdf.setFillColor(...DARK);pdf.rect(0,H*0.38,W,H*0.07,'F');
    pdf.setTextColor(...GOLD);pdf.setFontSize(26);pdf.setFont('helvetica','bold');pdf.text('UrbanX',W/2,H*0.48,{align:'center'});
    pdf.setTextColor(190,205,230);pdf.setFontSize(10);pdf.setFont('helvetica','normal');pdf.text('UrbanX — Generator Volumetric Avansat',W/2,H*0.496,{align:'center'});
    pdf.setFillColor(...GOLD);pdf.rect(30,H*0.512,W-60,1.5,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(16);pdf.setFont('helvetica','bold');pdf.text('RAPORT URBANISTIC COMPLET',W/2,H*0.534,{align:'center'});
    pdf.setTextColor(...GOLD);pdf.setFontSize(10);pdf.text('Analiza teren, indicatori PUG si volumetrie propusa',W/2,H*0.550,{align:'center'});
    pdf.setFillColor(12,28,60);pdf.roundedRect(18,H*0.565,W-36,90,2,2,'F');
    pdf.setFillColor(...GOLD);pdf.rect(18,H*0.565,3,90,'F');
    pdf.setTextColor(...GOLD);pdf.setFontSize(8);pdf.setFont('helvetica','bold');pdf.text('DATE DE IDENTIFICARE A IMOBILULUI',W/2,H*0.582,{align:'center'});
    const covR=[['Nr. cadastral',nrcad],['UTR (zona urbanistica)',utr],['Suprafata teren',area+' mp'],
      ['Functiune propusa',S2(fnDef.label)],['Regim inaltime',niv+' niveluri · H ~'+aedisH.toFixed(1)+'m'],
      ['POT max / CUT max',pot+'% / '+cut],['Aliniamente rf/rs/rl-rr',rf+'m/'+rs+'m/'+rl+'m-'+rr+'m'],
      ['Coordonate GPS',lat.toFixed(5)+'N · '+lon.toFixed(5)+'E'],['Localitate',getUATLabel()+', jud. '+getUATJudet()]];
    let ry2=H*0.596;covR.forEach(([l,v])=>{
      pdf.setTextColor(150,175,210);pdf.setFontSize(7.5);pdf.setFont('helvetica','normal');pdf.text(S2(l)+':',28,ry2);
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.text(S2(String(v)),92,ry2);ry2+=8.2;});
    const isOk=!(aedisH>0&&parseFloat(hmax||'0')>0&&aedisH>parseFloat(hmax));
    pdf.setFillColor(...(isOk?[25,120,55]:[155,35,35]));pdf.roundedRect(18,H*0.887,W-36,14,2,2,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
    pdf.text(isOk?'PARAMETRI IN LIMITA PUG — Constructie autorizabila':'ATENTIE — Verificare necesara: H max PUG depasit',W/2,H*0.900,{align:'center'});
    pdf.setFontSize(7);pdf.setFont('helvetica','normal');
    pdf.text('H propus: '+aedisH.toFixed(1)+'m · H max PUG: '+hmax+'m · POT: '+pot+'% · CUT: '+cut,W/2,H*0.912,{align:'center'});
    pdf.setTextColor(110,130,160);pdf.setFontSize(7);pdf.text('Generat: '+S2(dateStr)+' · '+timeStr+' · Document cu caracter ORIENTATIV',W/2,H*0.950,{align:'center'});
    ftr();

    // ══ PAG 2: VEDERI 3D ZI / NOAPTE / GOLDEN / OVERCAST ════════════════════
    pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
    hdr('VEDERI 3D — ILUMINARE ZI / NOAPTE / GOLDEN HOUR',2);
    let cy=30;const half=(W-32)/2;
    if(v3dImgs.day&&v3dImgs.day.length>500){
      cy=addImg(v3dImgs.day,14,cy,half,56,'FIG. 1 — Viewer 3D Urban3D · Iluminare ZI');
      if(v3dImgs.night&&v3dImgs.night.length>500)addImg(v3dImgs.night,14+half+4,cy-62,half,56,'FIG. 2 — Viewer 3D Urban3D · Iluminare NOAPTE');
    }else if(mapImg3D&&mapImg3D.length>500){cy=addImg(mapImg3D,14,cy,W-28,65,'FIG. 1 — Vedere 3D Mapbox · Context urban');}
    cy+=2;
    if(v3dImgs.golden&&v3dImgs.golden.length>500){
      cy=addImg(v3dImgs.golden,14,cy,half,56,'FIG. 3 — Viewer 3D · Golden Hour');
      if(v3dImgs.overcast&&v3dImgs.overcast.length>500)addImg(v3dImgs.overcast,14+half+4,cy-62,half,56,'FIG. 4 — Viewer 3D · Cer acoperit');
      cy+=6;
    }
    if(mapStdImg&&mapStdImg.length>500)cy=addImg(mapStdImg,14,cy,W-28,50,'FIG. 5 — Mapbox Standard 3D · Iluminare PBR');
    if(aiImg&&aiImg.length>500)cy=addImg(aiImg,14,cy,W-28,55,'FIG. 6 — AI Render fotorealist · Fal.ai FLUX.1');
    cy=Math.max(cy,252);cy=sec('NOTE TEHNICE — VIZUALIZARE 3D',cy);
    body('Vizualizarile 3D sunt generate cu motorul Three.js r128 integrat in platforma UrbanX, cu shadere GLSL procedurale si materiale PBR (Physically Based Rendering) cu roughness/metalness specifice fiecarui stil arhitectural. Iluminarea simuleaza pozitia soarelui la latitudinea '+lat.toFixed(2)+'°N. Contextul urban provine din date OpenStreetMap via Overpass API si Mapbox GL JS v3.',14,cy+2,W-28);
    ftr();

    // ══ PAG 3: PLAN 2D + VEDERE 3D CONTEXTUALA ═══════════════════════════════
    pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
    hdr('SITUATIE EXISTENTA SI CONTEXT URBAN',3);cy=30;
    cy=sec('1. AMPLASAMENT — VEDERE 3D CONTEXTUALA (pitch 62°)',cy);cy+=2;
    // Guard: mapImg3D diferit de mapImg2D (evitam duplicate)
    if(mapImg3D&&mapImg3D.length>500){
      cy=addImg(mapImg3D,14,cy,W-28,68,'FIG. 7 — Vedere 3D principala · Volumul propus (albastru) in contextul urban real · Sursa: UrbanX/Mapbox GL JS');cy+=2;
    }
    cy=sec('2. PLAN 2D — ORTOGONAL (vedere de sus, pitch=0°)',cy);cy+=2;
    // Adăugăm mapImg2D doar dacă e diferit de mapImg3D
    const _img2DValid=mapImg2D&&mapImg2D.length>500&&mapImg2D!==mapImg3D;
    if(_img2DValid){
      cy=addImg(mapImg2D,14,cy,W-28,60,'FIG. 8 — Plan 2D ortogonal · Parcela marcata + contextul construit existent · Sursa: UrbanX/Mapbox GL JS');cy+=4;
    } else if(!mapImg2D||mapImg2D.length<500){
      pdf.setTextColor(100,120,150);pdf.setFontSize(8);pdf.setFont('helvetica','italic');
      pdf.text('(Captura 2D indisponibila - deschideti platforma si activati vederea 2D)',W/2,cy+8,{align:'center'});
      cy+=20;
    }
    cy=sec('3. DATE PARCELA SI AMPLASAMENT',cy);
    cy=row2('Nr. cadastral',nrcad,'UTR (zona PUG)',utr,cy);
    cy=row2('Suprafata teren',area+' mp','Perimetru aprox.','calc. GIS',cy);
    cy=row2('Coordonate lat.',lat.toFixed(5)+'N','Coordonate lng.',lon.toFixed(5)+'E',cy);
    cy=row2('Localitate',getUATLabel()+', jud. '+getUATJudet(),'Sector cadastral',S2(getUATJudet()),cy);
    cy+=4;cy=sec('4. INFORMATII URBANISTICE ZONA',cy);
    cy=row2('Zona UTR (PUG)','UTR '+utr,'Functiune zona',S2(r.fnLabel||fnDef.label||'—'),cy);
    cy=row2('Tip zona','Zona reglementata PUG','Sursa date','PUG '+getUATLabel()+' + Cadastru',cy);
    ftr();

    // ══ PAG 4: DISTANTE + VEDERI LATERALE ════════════════════════════════════
    pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
    hdr('INCADRARE IN CONTEXT — DISTANTE FATA DE VECINATATI',4);cy=30;
    cy=sec('5. DISTANTE FATA DE CLADIRILE VECINE — PLAN DISTANTE',cy);cy+=2;
    cy=addImg(mapImgDist,14,cy,W-28,82,'FIG. 9 — Plan distante contur-la-contur · verde=OK · rosu=sub minim · Sursa: UrbanX');cy+=3;
    if(mapImgLat&&mapImgLat.length>500){
      cy=sec('6. VEDERE LATERALA (E-V) SI FRONTALA (N-S)',cy);cy+=2;
      cy=addImg(mapImgLat,14,cy,half,50,'FIG. 10 — Vedere laterala (bearing 90°) · Context E-V');
      if(mapImgFront&&mapImgFront.length>500)addImg(mapImgFront,14+half+4,cy-56,half,50,'FIG. 11 — Vedere frontala (bearing 0°) · Context N-S');
      cy+=6;
    }
    cy=sec('7. ANALIZA DISTANTE MINIME FATA DE VECINATATI',cy);cy+=3;
    const distFeats=(map.getSource('dist-src')?._data?.features)||[];
    const neighborDists=distFeats.filter(f=>f.properties?.type==='to_neighbor'&&f.properties?.dist<200);
    if(neighborDists.length>0){
      pdf.setFillColor(...DARK);pdf.rect(14,cy,W-28,8,'F');
      pdf.setTextColor(...GOLD);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
      pdf.text('Nr.',17,cy+5.5);pdf.text('Distanta (m)',35,cy+5.5);pdf.text('Status',80,cy+5.5);pdf.text('Observatii',110,cy+5.5);cy+=8;
      const minD=S.vol.multiVolDist||6;
      neighborDists.slice(0,12).forEach(({properties:pr},ri)=>{
        const ok=pr.dist>=minD;
        pdf.setFillColor(...(ri%2===0?[235,240,250]:[245,248,255]));pdf.rect(14,cy,W-28,7.5,'F');
        pdf.setFillColor(...(ok?[35,140,65]:[190,45,45]));pdf.rect(14,cy,3,7.5,'F');
        pdf.setTextColor(30,50,90);pdf.setFont('helvetica','normal');pdf.setFontSize(7.5);pdf.text(String(ri+1),17,cy+5);
        pdf.setTextColor(...(ok?[25,120,50]:[170,35,35]));pdf.setFont('helvetica','bold');pdf.text(pr.dist.toFixed(1)+' m',35,cy+5);
        pdf.setTextColor(...(ok?[25,120,50]:[170,35,35]));pdf.setFont('helvetica','normal');pdf.text(ok?'CONFORM':'SUB MINIM',80,cy+5);
        pdf.setTextColor(70,90,120);pdf.setFontSize(6.5);pdf.text(ok?'Distanta minima respectata (min. '+minD+'m)':'Sub minimul admis de '+minD+'m — verificati',110,cy+5,{maxWidth:82});cy+=7.5;
      });
      cy+=4;
      pdf.setFillColor(235,248,240);pdf.roundedRect(14,cy,W-28,9,1,1,'F');
      pdf.setTextColor(20,100,50);pdf.setFontSize(7);pdf.setFont('helvetica','normal');
      const okC=neighborDists.filter(f=>f.properties.dist>=(S.vol.multiVolDist||6)).length;
      pdf.text('Sumar: '+neighborDists.length+' cladiri vecine analizate · '+okC+' CONFORM · '+(neighborDists.length-okC)+' SUB MINIM',17,cy+6);cy+=14;
    }else{
      pdf.setFillColor(248,248,255);pdf.rect(14,cy,W-28,12,'F');
      pdf.setTextColor(80,95,130);pdf.setFontSize(8);pdf.setFont('helvetica','italic');
      pdf.text('Datele despre distante sunt disponibile dupa generarea volumului 3D si incarcarea contextului urban OSM.',17,cy+8,{maxWidth:W-35});cy+=16;
    }
    ftr();

    // ══ PAG 5: REGULAMENT PUG + INDICATORI ═══════════════════════════════════
    pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
    hdr('REGULAMENT URBANISTIC SI INDICATORI PUG',5);cy=30;
    cy=sec('8. INDICATORI URBANISTICI MAXIMI ADMISI (PUG IASI · UTR '+S2(utr)+')',cy);
    [['POT max admis',pot+'%','CUT max admis',cut],['H max admis',hmax+' m','Nr. niveluri max',niv+' etaje'],
     ['Aliniament fata strada (rf)',rf+' m','Aliniament spate (rs)',rs+' m'],
     ['Aliniament lateral stg (rl)',rl+' m','Aliniament lateral dr (rr)',rr+' m'],
     ['Spatii verzi obligatorii',sv+'%','Parcaje (estimat)','2 locuri/unitate'],
     ['Functiune zona',S2(r.fnLabel||fnDef.label||'—'),'Tip zona','Zona reglementata PUG']
    ].forEach(([l1,v1,l2,v2])=>{cy=row2(l1,v1,l2,v2,cy);});cy+=5;
    cy=sec('9. CALCULE SUPRAFETE PE TEREN',cy);
    [['Suprafata totala teren',area+' mp (100%)','Spatii verzi min obligatorii',svMin+' mp ('+sv+'%)'],
     ['Suprafata construibila max (SC)',scMax>0?scMax+' mp (POT '+pot+'%)':'—','Suprafata desfasurata max (SD)',sdMax>0?sdMax+' mp.ADC (CUT '+cut+')':'—'],
     ['Inaltime propusa',aedisH.toFixed(1)+' m','Incadrare in H max',parseFloat(hmax||'0')>0?(aedisH<=parseFloat(hmax)?'IN LIMITA':'DEPASIT'):'H max nspec.'],
     ['SC utila estimata (90%)',Math.round(scMax*0.9)+' mp','Nr. apartamente est. (~55mp)',scMax>0?Math.floor(scMax*parseInt(niv)*0.9/55)+' ap.':'—']
    ].forEach(([l1,v1,l2,v2])=>{cy=row2(l1,v1,l2,v2,cy);});cy+=5;
    cy=sec('10. UTILIZARI ADMISE IN UTR '+S2(utr),cy);cy+=3;
    cy=body('Conform PUG '+getUATLabel()+', in zona UTR '+S2(utr)+', sunt admise functiunile compatibile cu caracterul zonei. Functiunea propusa "'+S2(fnDef.label)+'" necesita verificare cu Certificatul de Urbanism emis de '+getPrimar()+', inainte de demararea oricarei proceduri de autorizare.',14,cy,W-28);cy+=5;
    cy=sec('11. ANALIZA CONFORMITATE COMPLETA',cy);cy+=3;
    [[isOk,'Inaltime propusa vs H max PUG',parseFloat(hmax||'0')>0?(aedisH<=parseFloat(hmax)?'IN LIMITA — H propus '+aedisH.toFixed(1)+'m ≤ H max '+hmax+'m':'DEPASIT — H propus '+aedisH.toFixed(1)+'m > H max '+hmax+'m'):'H max PUG nespecificat'],
     [true,'Incadrare POT','POT '+pot+'% → SC max la sol: '+scMax+' mp din '+area+' mp teren'],
     [true,'Incadrare CUT','CUT '+cut+' → SD maxima: '+sdMax+' mp.ADC'],
     [true,'Spatii verzi','Min. '+svMin+' mp ('+sv+'% din suprafata totala) — obligatoriu de amenajat'],
     [true,'Parcaje necesare','Min. 2 locuri/unitate + 0.2 vizitatori/unitate conform HG 525/1996 art. 33'],
     [!(aedisH>parseFloat(hmax||'999')),'Necesitate PUZ/PUD',aedisH>parseFloat(hmax||'999')?'Posibil necesara procedura PUZ':'Parametrii se incadreaza in PUG — verificati CU']
    ].forEach(([ok,l,v],ri)=>{
      pdf.setFillColor(...(ri%2===0?[235,240,250]:[245,248,255]));pdf.rect(14,cy,W-28,9,'F');
      pdf.setFillColor(...(ok?[35,140,65]:[190,45,45]));pdf.rect(14,cy,3,9,'F');
      pdf.setTextColor(30,50,90);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);pdf.text(S2(l),19,cy+6);
      pdf.setTextColor(...(ok?[25,100,50]:[155,35,35]));pdf.setFont('helvetica','normal');pdf.setFontSize(7);pdf.text(S2(v),90,cy+6,{maxWidth:112});cy+=9;
    });
    ftr();

    // ══ PAG 6: VOLUMETRIE PROPUSA — parametri + vederi suplimentare ══════════
    pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
    hdr('VOLUMETRIE PROPUSA — PARAMETRI DETALIATI',6);cy=30;
    cy=sec('12. PARAMETRI VOLUM PROPUS vs PUG',cy);
    [['Functiune propusa',S2(fnDef.label),'Stil arhitectural',S2(AEDIS.stil||'modern')],
     ['Nr. niveluri propus',niv+' niveluri','Inaltime totala',aedisH.toFixed(1)+' m'],
     ['POT aplicat',pot+'%','SC construita la sol',scMax+' mp'],
     ['CUT aplicat',cut,'SD totala desfasurata',sdMax+' mp.ADC'],
     ['H parter',((AEDIS.parterDiferit?(AEDIS_FN[AEDIS.fn]?.hParter||4.5):AEDIS.corpuri[0]?.hNiv||3.0).toFixed(1))+' m','H etaj curent',(AEDIS.corpuri[0]?.hNiv||3.0).toFixed(1)+' m'],
     ['Parter cu alta functiune',AEDIS.parterDiferit?S2(AEDIS_FN[AEDIS.fnParter]?.label||'—'):'Nu','Etaj retras',AEDIS.activeRetragere?'Da':'Nu'],
     ['Tip acoperis',S2({terasa_plata:'Terasa plata',terasa_circulabila:'Terasa circulabila',sarpanta:'Sarpanta',mansarda:'Mansarda'}[AEDIS.tipAcoperis]||'Terasa plata'),'Scenariu',S2({liber:'Demolare+Constr.Noua',extindere_h:'Extindere orizontala',extindere_v:'Extindere verticala',inglobare:'Inglobare existente'}[AEDIS.scenariu]||'Demolare')],
     ['Retragere front stradal',rf+' m','Retragere spate',rs+' m'],
     ['Retragere lateral stg.',rl+' m','Retragere lateral dr.',rr+' m'],
     ['Spatii verzi min oblig.',svMin+' mp ('+sv+'%)','Nr. ap. estimat',scMax>0?Math.floor(scMax*parseInt(niv)*0.9/55)+' ap.':'—']
    ].forEach(([l1,v1,l2,v2])=>{cy=row2(l1,v1,l2,v2,cy);});cy+=6;
    cy=sec('13. VEDERI SUPLIMENTARE VOLUM PROPUS',cy);cy+=2;
    const imgA=v3dImgs.front||mapImgFront||mapImg3D;
    const imgB=v3dImgs.topdown||mapImgAerial||v3dImgs.day;
    if(imgA&&imgA.length>500){
      addImg(imgA,14,cy,half,52,'FIG. 12 — Vedere frontala / viewer 3D');
      if(imgB&&imgB.length>500)addImg(imgB,14+half+4,cy,half,52,'FIG. 13 — Vedere aeriana / top-down');
      cy+=58;
    }
    if(aiImg&&aiImg.length>500)cy=addImg(aiImg,14,cy,W-28,58,'FIG. 14 — AI Render fotorealist · Fal.ai FLUX.1 · Propunere volumetrica');
    ftr();

    // ══ PAG 7 (optionala): PAGINA DEDICATA AI RENDER (daca exista) ═══════════
    if(aiImg&&aiImg.length>500){
      pdf.addPage();pdf.setFillColor(8,12,24);pdf.rect(0,0,W,H,'F');
      pdf.setFillColor(...GOLD);pdf.rect(0,0,W,2,'F');pdf.rect(0,H-2,W,2,'F');
      // AI Render full page cu impact maxim
      try{pdf.addImage(aiImg,'JPEG',0,20,W,H*0.68,undefined,'FAST');}catch(e){}
      pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.5);pdf.rect(0,20,W,H*0.68,'S');
      pdf.setFillColor(8,12,24);pdf.rect(0,H*0.68+18,W,H*0.32-16,'F');
      pdf.setTextColor(...GOLD);pdf.setFontSize(14);pdf.setFont('helvetica','bold');
      pdf.text('PROPUNERE VOLUMETRICA — AI RENDER',W/2,H*0.72,{align:'center'});
      pdf.setTextColor(190,205,230);pdf.setFontSize(9);pdf.setFont('helvetica','normal');
      const prompt=aedisPromptBuild().slice(0,160)+'...';
      pdf.text('Stil: '+S2(AEDIS.stil||'modern')+' · Functiune: '+S2(fnDef.label)+' · '+niv+' niveluri · H='+aedisH.toFixed(1)+'m',W/2,H*0.735,{align:'center'});
      pdf.setFillColor(15,25,50);pdf.roundedRect(14,H*0.755,W-28,30,2,2,'F');
      pdf.setTextColor(140,160,190);pdf.setFontSize(7);
      const promptLines=pdf.splitTextToSize('Prompt AI: '+S2(prompt),W-36);
      pdf.text(promptLines.slice(0,3),21,H*0.768);
      pdf.setTextColor(...GOLD);pdf.setFontSize(8);pdf.setFont('helvetica','bold');
      pdf.text('Randare generata cu Fal.ai FLUX.1 · Rezultat cu caracter ilustrativ · UrbanX',W/2,H*0.860,{align:'center'});
      pdf.setTextColor(100,120,150);pdf.setFontSize(7);pdf.setFont('helvetica','normal');
      pdf.text('Parcela: '+nrcad+' · '+S2(dateStr),W/2,H*0.875,{align:'center'});
      ftr();
    }

    // ══ PAG 7: CONCLUZII DETALIATE ════════════════════════════════════════════
    pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
    hdr('CONCLUZII DETALIATE SI RECOMANDARI',7);cy=30;
    cy=sec('14. SINTEZA ANALIZEI URBANISTICE',cy);cy+=3;
    ['1. FEZABILITATE GENERALA: Pe parcela nr. '+nrcad+' din UTR '+S2(utr)+', Municipiul Iasi (suprafata '+area+' mp, coordonate GPS '+lat.toFixed(4)+'N / '+lon.toFixed(4)+'E), se poate realiza o constructie cu functiunea "'+S2(fnDef.label)+'", cu un regim de inaltime de '+niv+' niveluri (H total propus ~'+aedisH.toFixed(1)+'m), in limitele parametrilor urbanistici ai PUG Iasi in vigoare. Suprafata terenului permite o SC max la sol de '+scMax+' mp (POT '+pot+'%) si o SD maxima de '+sdMax+' mp.ADC (CUT '+cut+').',
     '2. PARAMETRI URBANISTICI: POT max admis = '+pot+'% → SC max la sol '+scMax+' mp. CUT max admis = '+cut+' → SD max '+sdMax+' mp.ADC. H max PUG = '+hmax+' m ('+niv+' etaje). Aliniamente: fata strada '+rf+'m, spate '+rs+'m, lateral '+rl+'m/'+rr+'m. Spatii verzi minime obligatorii: '+svMin+' mp ('+sv+'%). Toate aceste valori sunt maxime admise; proiectul final poate propune parametri mai mici.',
     '3. ANALIZA CONTEXTUALA: Constructia propusa se inscrie in caracterul urban al zonei UTR '+S2(utr)+'. Contextul construit existent (cladiri OSM/cadastru) a fost analizat pentru distantele contur-la-contur. Stilul arhitectural '+S2(AEDIS.stil||'modern')+' este compatibil cu zona. Se recomanda studierea atenta a cladirilor invecinate si alinierea la scara si caracterul stradal dominant.',
     '4. INSORIRE SI UMBRE: Amplasamentul beneficiaza de insorire directa conform pozitiei geografice (lat. '+lat.toFixed(2)+'°N). Constructia propusa (H='+aedisH.toFixed(1)+'m) proiecteaza umbre proportionale cu inaltimea, cu impact maxim iarna spre nord. Se recomanda elaborarea unui studiu de insorire detaliat (cf. OMS 119/2014) de catre arhitect autorizat.',
     '5. RECOMANDARI ARHITECTURALE: Stilul arhitectural ales ('+S2(AEDIS.stil||'modern')+') este adecvat functiunii propuse. Tipul de acoperis '+S2({terasa_plata:'terasa plata',terasa_circulabila:'terasa circulabila',sarpanta:'sarpanta',mansarda:'mansarda'}[AEDIS.tipAcoperis]||'terasa plata')+' permite valorificarea suprafetei. Se recomanda consultarea PUZ-urilor sau studiilor de oportunitate din zona.',
     '6. ETAPE URMATOARE: (1) Obtinere Certificat de Urbanism de la DAU — Primaria Municipiului Iasi; (2) Studiu geotehnic si topografic; (3) Studiu de insorire (cf. OMS 119/2014); (4) Proiect tehnic faza PAC semnat de arhitect autorizat OAR; (5) Avize ISU, ANRE, apa-canal, mediu (dupa caz); (6) Autorizatie de Construire.'
    ].forEach(txt=>{cy=body(txt,14,cy+2,W-28);cy+=4;});
    cy=sec('15. DOCUMENTE OBLIGATORII PENTRU AUTORIZATIA DE CONSTRUIRE',Math.min(cy+4,250));cy+=3;
    ['Cerere tip AC + declaratie pe propria raspundere','Certificat de Urbanism in vigoare (emis de Primaria Iasi)',
     'Titlul asupra imobilului (extras CF actualizat la zi)','Proiect tehnic PAC — memorii + piese desenate (arhitectura, rezistenta, instalatii)',
     'Avize si acorduri solicitate prin CU (ISU, DSP, distribuitori utilitati, mediu etc.)','Studiu geotehnic (obligatoriu — Legea 10/1995)',
     'Studiu de insorire (recomandat — OMS 119/2014)','Dovada achitarii taxei de autorizare (0.5% din valoarea constructiei)'
    ].forEach(d=>{cy=body('• '+d,16,cy+1,W-32);cy+=2;});
    ftr();

    // ══ PAG 8: TEMEI LEGAL + DISCLAIMER ══════════════════════════════════════
    pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
    hdr('TEMEI LEGAL SI NOTE METODOLOGICE',8);cy=30;
    cy=sec('16. BAZA LEGALA',cy);cy+=3;
    ['Legea nr. 350/2001 privind amenajarea teritoriului si urbanismul (cu modificarile ulterioare)',
     'Legea nr. 50/1991 privind autorizarea executarii lucrarilor de constructii (republicata)',
     'Legea nr. 10/1995 privind calitatea in constructii (republicata)',
     'HG nr. 525/1996 pentru aprobarea Regulamentului General de Urbanism (RGU)',
     'Ordinul MDRAP nr. 233/2016 pentru aprobarea Normelor metodologice PUZ/PUD',
     'PUG Municipiul Iasi — in vigoare (aprobat prin HCL Iasi)',
     'RLU — Regulamentul Local de Urbanism aferent PUG Iasi',
     'Legea nr. 7/1996 a cadastrului si publicitatii imobiliare (republicata)',
     'OMS nr. 119/2014 + Ordin 994/2018 — Norme igiena, conditii de insorire',
     'STAS 6221/1981 — Iluminat natural in constructii'
    ].forEach(d=>{cy=body('• '+d,16,cy+1,W-32);cy+=2;});cy+=4;
    cy=sec('17. DISCLAIMER',cy,[140,30,30]);cy+=2;
    cy=body('Prezentul raport este generat AUTOMAT de platforma UrbanX si are caracter strict ORIENTATIV si INFORMATIV. Valorile prezentate sunt estimative si nu au valoare juridica deplina, nu inlocuiesc documentatia tehnica avizata conform legii si nu constituie un Certificat de Urbanism, aviz sau autorizatie de constructie. Deciziile de investitie sau proiectare bazate exclusiv pe acest document sunt in responsabilitatea exclusiva a utilizatorului.',14,cy,W-28);cy+=8;
    pdf.setFillColor(232,240,255);pdf.roundedRect(14,cy,W-28,32,2,2,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,cy,3,32,'F');
    pdf.setTextColor(...BLUE);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
    pdf.text('Elaborat de platforma UrbanX — Generator Volumetric Urbanistic Avansat',W/2,cy+9,{align:'center'});
    pdf.setTextColor(55,75,110);pdf.setFontSize(8);pdf.setFont('helvetica','normal');
    pdf.text('Data: '+S2(dateStr)+' · Ora: '+timeStr,W/2,cy+17,{align:'center'});
    pdf.text('Parcela: '+nrcad+' · UTR: '+S2(utr)+' · Suprafata: '+area+' mp · GPS: '+lat.toFixed(5)+'N, '+lon.toFixed(5)+'E',W/2,cy+24,{align:'center'});
    pdf.text('© UrbanX · FG · TSS — Toate drepturile rezervate',W/2,cy+30,{align:'center'});
    ftr();

    // ══ PAG intermediara: HARTA UTR + CASETA SEMNATURA ═══════════════════════
    // Capturam harta UTR (zoom out cu toate zonele vizibile)
    let utrMapImg='';
    try{
      // Setam harta la vedere panoramica cu UTR-urile vizibile
      const center=turf.centerOfMass(ap.geo).geometry.coordinates;
      map.easeTo({center,zoom:11,pitch:0,bearing:0,duration:0});
      await waitF(5);await wait(800);map.triggerRepaint();await waitF(4);await wait(600);
      utrMapImg=map.getCanvas().toDataURL('image/jpeg',0.92);
      // Revenim la vista principala
      map.easeTo({pitch:62,bearing:-20,duration:0});
    }catch(e){}

    pdf.addPage();
    // Dark background — pagina de impact
    pdf.setFillColor(6,10,20);pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,0,W,2,'F');

    // Harta UTR full-width sus (60% din pagina)
    if(utrMapImg&&utrMapImg.length>500){
      try{pdf.addImage(utrMapImg,'JPEG',0,2,W,H*0.58,undefined,'FAST');}catch(e){}
      // Overlay gradient jos pe imagine
      pdf.setFillColor(6,10,20);
      for(let i=0;i<18;i++){
        pdf.setFillColor(6,10,20);
        const alpha=i/18;
        // simulam gradient: benzi tot mai opace
        pdf.rect(0,H*0.58-i*3,W,4,'F');
      }
    }

    // Titlu deasupra casetei
    const utrCity=ap.uat||'Municipiul Iași';
    pdf.setTextColor(...GOLD);pdf.setFontSize(13);pdf.setFont('helvetica','bold');
    pdf.text('PLAN URBANISTIC GENERAL — ZONIFICARE UTR',W/2,H*0.625,{align:'center'});
    pdf.setTextColor(160,180,210);pdf.setFontSize(8);pdf.setFont('helvetica','normal');
    pdf.text(S2(utrCity)+' · Zona UTR '+S2(utr)+' · Parcela '+nrcad+' · Coordonate: '+lat.toFixed(4)+'°N, '+lon.toFixed(4)+'°E',W/2,H*0.638,{align:'center'});

    // ── Caseta de semnătură cu valoare legală ────────────────────────────────
    const sigY=H*0.655;
    pdf.setFillColor(10,18,38);pdf.roundedRect(14,sigY,W-28,H-sigY-14,3,3,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,sigY,3,H-sigY-14,'F');
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.roundedRect(14,sigY,W-28,H-sigY-14,3,3,'S');

    // Header caseta
    pdf.setFillColor(...BLUE);pdf.rect(17,sigY,W-31,10,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(8.5);pdf.setFont('helvetica','bold');
    pdf.text('CASETA DE ELABORARE, VERIFICARE SI ASUMARE A RESPONSABILITATII',W/2,sigY+6.5,{align:'center'});

    let sy=sigY+16;
    // Text legal
    pdf.setTextColor(200,215,235);pdf.setFontSize(7.5);pdf.setFont('helvetica','normal');
    const legalText='Subsemnatul/Subsemnata, elaborator al prezentului document, declar pe proprie raspundere ca informatiile, calculele si recomandarile cuprinse in prezentul pre-studiu/raport urbanistic au fost intocmite cu buna-credinta, pe baza datelor disponibile la data elaborarii, in conformitate cu legislatia urbanistica in vigoare (Legea nr. 350/2001, HG nr. 525/1996, PUG '+S2(utrCity)+' in vigoare). Imi asum raspunderea profesionala pentru continutul tehnic al documentului, in limita competentelor conferite de calificarea profesionala detinuta, conform art. 36 din Legea nr. 350/2001. Documentul a fost generat cu sprijinul platformei UrbanX AEDIS, cu caracter orientativ si informativ, si nu inlocuieste documentatia tehnica avizata conform legii.';
    const legalLines=pdf.splitTextToSize(legalText,W-48);
    pdf.text(legalLines,24,sy);sy+=legalLines.length*4.5+8;

    // Cele 3 coloane: Elaborator / Verificator / Beneficiar
    const colW3=(W-36)/3;
    const cols=[
      {title:'ELABORAT',role:'Arhitect/Urbanist autorizat',fields:['Nume și prenume:','Nr. OAR:','Semnătura:','Ștampila:']},
      {title:'VERIFICAT',role:'Responsabil tehnic atestat',fields:['Nume și prenume:','Nr. atestare RUR:','Semnătura:','Data:']},
      {title:'BENEFICIAR / INVESTITOR',role:'Persoană fizică sau juridică',fields:['Denumire:','CUI / CNP:','Reprezentant:','Semnătura:']},
    ];

    cols.forEach((col,ci)=>{
      const cx=17+ci*(colW3+1.5);
      // Header coloana
      const hCol=ci===0?[26,70,120]:ci===1?[40,100,60]:[100,60,20];
      pdf.setFillColor(...hCol);pdf.roundedRect(cx,sy-2,colW3,8,1,1,'F');
      pdf.setTextColor(255,255,255);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
      pdf.text(col.title,cx+colW3/2,sy+3.5,{align:'center'});
      pdf.setTextColor(160,185,210);pdf.setFontSize(6.5);pdf.setFont('helvetica','italic');
      pdf.text(S2(col.role),cx+colW3/2,sy+9,{align:'center'});

      let fy=sy+15;
      col.fields.forEach(field=>{
        pdf.setTextColor(120,145,175);pdf.setFontSize(7);pdf.setFont('helvetica','normal');
        pdf.text(S2(field),cx+3,fy);
        // Linie de scriere
        pdf.setDrawColor(50,70,110);pdf.setLineWidth(0.3);
        pdf.line(cx+3,fy+5,cx+colW3-3,fy+5);
        fy+=12;
      });
    });

    sy=H-30;
    pdf.setFillColor(8,15,32);pdf.rect(14,sy,W-28,16,'F');
    pdf.setTextColor(...GOLD);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
    pdf.text('UrbanX · Pre-studiu urbanistic nr. '+nrcad+'/'+new Date().getFullYear()+' · Data elaborarii: '+S2(dateStr),W/2,sy+6,{align:'center'});
    pdf.setTextColor(100,120,150);pdf.setFont('helvetica','normal');pdf.setFontSize(6.5);
    pdf.text('Documentul are caracter ORIENTATIV. Valorile sunt estimative si nu au valoare juridica deplina conform Legii nr. 50/1991 si Legii nr. 350/2001.',W/2,sy+12,{align:'center'});
    ftr();


    const safeName='RaportUrbanistic_'+nrcad+'_'+S2(utr)+'_'+new Date().toISOString().slice(0,10)+'.pdf';
    pdf.save(safeName);
    if(prog) prog.style.display='none';
    if(_g('pdf-modal')) _g('pdf-modal').classList.remove('open');
    ss('Raport urbanistic complet exportat! (8 pagini, capturi multiple)');

  }catch(e){
    console.error('PDF error:',e);
    if(msg) msg.textContent='Eroare PDF: '+e.message;
    ss('Eroare generare PDF: '+e.message);
  }
}


// ═══ PDF HELPERS LEGACY ════════════════════════════════════════════════════
function addHeader(pdf, title, pg, total){
  const pw=pdf.internal.pageSize.getWidth();
  pdf.setFillColor(8,21,42);pdf.rect(0,0,pw,16,'F');
  pdf.setFillColor(212,175,55);pdf.rect(0,16,pw,1,'F');
  pdf.setFont('helvetica','bold');pdf.setFontSize(11);pdf.setTextColor(212,175,55);
  pdf.text('UrbanX',8,11);
  pdf.setFontSize(8.5);pdf.setTextColor(180,190,210);
  pdf.text(title,38,11);
  if(pg){pdf.setFontSize(7);pdf.setTextColor(120,130,150);
    pdf.text('pag. '+pg+(total?' / '+total:''),pw-8,11,{align:'right'});}
}

// addDataPage and addMultiPage removed - covered by exportFull/exportMulti
async function addScenariiPage(pdf){
  const pw=pdf.internal.pageSize.getWidth();
  addHeader(pdf,'Scenarii salvate',1,S.scenarios.length);
  let y=26;
  if(!S.scenarios.length){
    pdf.setFont('helvetica','italic');pdf.setFontSize(9);pdf.setTextColor(100,116,139);
    pdf.text('Niciun scenariu salvat.',10,y+10);return;
  }
  pdf.setFont('helvetica','bold');pdf.setFontSize(8);pdf.setTextColor(8,21,42);
  ['#','Parcelă','UTR','Suprafață','Funcțiune','Niv.','H(m)','POT%','CUT'].forEach((h,i)=>{
    pdf.text(h,[10,22,35,50,70,100,115,130,150][i]||10+i*18,y);
  });
  y+=7;
  S.scenarios.forEach((sc,i)=>{
    pdf.setFont('helvetica','normal');pdf.setFontSize(7.5);pdf.setTextColor(20,30,50);
    const vals=[i+1,sc.nrcad||'—',sc.utr||'—',sc.area?Math.round(sc.area)+' m²':'—',
      (FN_UTR[sc.fn]?.label||sc.fn||'—').slice(0,16),
      sc.niv||'—',sc.h||'—',sc.pot?sc.pot+'%':'—',sc.cut||'—'];
    vals.forEach((v,j)=>pdf.text(String(v),[10,22,35,50,70,100,115,130,150][j]||10+j*18,y));
    y+=7;
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// UrbanX — Generator Volumetric Avansat
// Integrat în UrbanX · Mapbox GL JS fill-extrusion
// ═══════════════════════════════════════════════════════════════════════════

// ── State AEDIS ────────────────────────────────────────────────────────────
// AEDIS moved to top

// ── Funcțiuni AEDIS cu programe ───────────────────────────────────────────
// AEDIS_FN moved to top

// ── Stiluri arhitecturale AEDIS — paleta cu identitate vizuala clara ──────
// AEDIS_STIL moved to top

// ── Helpers culori ─────────────────────────────────────────────────────────
function hexToRgb(hex){
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  return [r,g,b];
}
function rgbToHex(r,g,b){
  return '#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
}
function lighten(hex,pct){
  const [r,g,b]=hexToRgb(hex);
  return rgbToHex(r+(255-r)*pct/100,g+(255-g)*pct/100,b+(255-b)*pct/100);
}
function darken(hex,pct){
  const [r,g,b]=hexToRgb(hex);
  return rgbToHex(r*(1-pct/100),g*(1-pct/100),b*(1-pct/100));
}
function mixColor(hex1,hex2,t){
  const [r1,g1,b1]=hexToRgb(hex1),[r2,g2,b2]=hexToRgb(hex2);
  return rgbToHex(r1+(r2-r1)*t,g1+(g2-g1)*t,b1+(b2-b1)*t);
}

// ═══════════════════════════════════════════════════════════════════════════
// AEDIS BUILD — Generare volumetrie avansată
// ═══════════════════════════════════════════════════════════════════════════
function aedisBuild(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('⚠️ Selectați o parcelă mai întâi.'); return; }

  // DEMOLARE: eliminăm clădirile existente înainte de build
  if(AEDIS.scenariu === 'demolare'){
    _aedisRemoveExistingFromCtx();
    // Dezactivăm și ctx-3d complet (clădiri native Mapbox tile)
    try{map.setLayoutProperty('ctx-3d','visibility','none');}catch(e){}
  }

  const feats = [];

  // MULTIPARCEL: generăm pentru toate parcelele dacă sunt multiple selectate
  const parcelsToGen = S.parcels.length > 1 ? S.parcels : [ap];
  if(S.parcels.length > 1){
    ss(`⏳ Generare pentru ${S.parcels.length} parcele…`);
  }

  // Procesăm parcela activă (sau toate în modul multi)
  // Restul parcelelor folosesc aceeași configurație AEDIS (fn, stil, niv)
  for(const parcelaTmp of parcelsToGen){
    if(!parcelaTmp?.geo?.geometry) continue;

    let params = parcelaTmp.params || getDefaultParams(parcelaTmp.utr);
    let fp = buildFP(parcelaTmp.geo.geometry, params);
    if(!fp?.geometry) continue;
    let pA_loop = parcelaTmp.area || turf.area({type:'Feature',geometry:parcelaTmp.geo.geometry,properties:{}});

    let fn = AEDIS.fn;
    let fnDef = AEDIS_FN[fn] || AEDIS_FN.rezidential_colectiv;
    let stilDef = AEDIS_STIL[AEDIS.stil] || AEDIS_STIL.modern;
    let pA = pA_loop;

    // Calcule de baza
    let hParter = AEDIS.parterDiferit ? (fnDef.hParter || 4.5) : (AEDIS.corpuri[0]?.hNiv||3.0);
    let hEtaj = AEDIS.corpuri[0]?.hNiv || fnDef.hEtaj || 3.0;
    let totalNiv = AEDIS.corpuri[0]?.niv || pN(params.niv) || 4;

    // ── Scenariu: calcul POT/CUT existent ─────────────────────────────────
    let baseH = 0;
    let fpGeom = fp.geometry;

    if(AEDIS.scenariu !== 'demolare' && S.ctx?.features?.length){
      // Calculam POT/CUT existent din cladirile de pe parcela
      const onParcel = S.ctx.features.filter(f=>{
        try{
          const ctr = turf.centerOfMass(f);
          return turf.booleanPointInPolygon(ctr, {type:'Feature',geometry:parcelaTmp.geo.geometry,properties:{}});
        }catch(e){ return false; }
      });

      if(onParcel.length){
        const existArea = onParcel.reduce((s,f)=>{try{return s+turf.area(f);}catch(e){return s;}},0);
        AEDIS.existentPOT = Math.round(existArea/pA*100);
        AEDIS.existentH = Math.round(Math.max(...onParcel.map(f=>f.properties?.h||0)));
        AEDIS.existentCUT = 0;

        if(AEDIS.scenariu==='extindere_v'){
          baseH = AEDIS.existentH;
          onParcel.forEach(f=>{
            feats.push({type:'Feature',
              properties:{base:0,top:AEDIS.existentH,color:'#94a3b8',floor:-1,isExistent:true},
              geometry:f.geometry});
          });
        } else if(AEDIS.scenariu==='extindere_h'){
          try{
            let freeZone = fp;
            onParcel.forEach(f=>{
              try{
                const diff = turf.difference(freeZone, f);
                if(diff?.geometry && turf.area(diff) > 10) freeZone = diff;
              }catch(e){}
            });
            fpGeom = freeZone.geometry;
            onParcel.forEach(f=>{
              feats.push({type:'Feature',
                properties:{base:0,top:f.properties?.h||7,color:'#94a3b8',floor:-1,isExistent:true},
                geometry:f.geometry});
            });
          }catch(e){}
        } else if(AEDIS.scenariu==='inglobare'){
          baseH = 0;
          onParcel.forEach(f=>{
            feats.push({type:'Feature',
              properties:{base:0,top:f.properties?.h||7,color:'rgba(100,100,100,0.3)',floor:-1,isExistent:true},
              geometry:f.geometry});
          });
        }
        // DEMOLARE: nu adăugăm niciun isExistent — terenul e liber
      }
    }

    // ── Generare corpuri AEDIS ─────────────────────────────────────────────
    let fpFeat = {type:'Feature',geometry:fpGeom,properties:{}};

    // ── MULTIPLE VOLUME: dacă S.vol.multiVol e activ, distribuim N clădiri ──
    if(S.vol.multiVol){
      const mvParams = {...params, niv: totalNiv};
      let multiFeats = [];
      try{
        multiFeats = buildMultiVolume(parcelaTmp,
          {type:'Feature',geometry:fpGeom,properties:{}},
          mvParams, 0);
      }catch(e){
        console.warn('buildMultiVolume error (shape fallback la rect):', e.message);
        // Fallback la dreptunghi simplu dacă forma complexă crează eroare
        const origShape = S.vol.multiVolShape;
        S.vol.multiVolShape = 'rect';
        try{
          multiFeats = buildMultiVolume(parcelaTmp,
            {type:'Feature',geometry:fpGeom,properties:{}},
            mvParams, 0);
        }catch(e2){ multiFeats = []; }
        S.vol.multiVolShape = origShape;
        ss('⚠️ Forma selectată a generat eroare — s-a folosit dreptunghi. Încearcă altă formă.');
      }
      // Aplică H/niv personalizat per clădire dacă există
      // Aplică H/niv per clădire din sistemul existent (S.vol.multiVolPerBldg)
      const perBldg = S.vol.multiVolPerBldg||[];
      if(multiFeats.length && perBldg.some(b=>b?.niv!=null||b?.hNiv!=null)){
        multiFeats = _applyMVPerBuildingHeights(multiFeats, perBldg, totalNiv, hEtaj);
      }
      feats.push(...multiFeats);
      continue; // trecem la parcela următoare
    }

    // Corp principal cu retrageri fine per etaj
    let currentH = baseH;

    for(let i=0; i<totalNiv; i++){
      const isLast = i===totalNiv-1;
      const hEtajCrt = i===0 ? hParter : hEtaj;

      // Retragere per etaj (configurabila)
      let etajGeom = fpGeom;
      const fineRetragere = AEDIS.retrageriFineEtaje[i] ?? (isLast && AEDIS.activeRetragere ? (stilDef.retragereFactor||0.88) : 1.0);

      if(fineRetragere < 0.99){
        try{
          const sc = turf.transformScale(fpFeat, fineRetragere, {origin:turf.centerOfMass(fpFeat)});
          if(sc?.geometry) etajGeom = sc.geometry;
        }catch(e){}
      }
      // Stocăm geometria etajului curent pentru acoperiș (vom folosi ultima geometrie)
      if(isLast) AEDIS._lastFloorGeom = etajGeom;

      // Culoare etaj - din paleta stilului arhitectural (nu din functiune)
      // Parter = intotdeauna culoare distincta (soclu)
      let etajColor;
      if(i===0){
        // Parter: culoare soclu din stil
        etajColor = AEDIS.parterDiferit
          ? (AEDIS_FN[AEDIS.fnParter]?.color||stilDef.parterColor||'#334155')
          : (stilDef.parterColor||'#334155');
      } else {
        // Etaje: culoare din paleta stilului
        etajColor = stilDef.etajColor
          ? stilDef.etajColor(fnDef.color||'#94a3b8', i, totalNiv)
          : (stilDef.floorColors?.[Math.min(i,stilDef.floorColors.length-1)]||lighten(fnDef.color||'#94a3b8',i*8));
      }

      const _base = Number(currentH)||0;
      const _top = _base + (Number(hEtajCrt)||3.0);
      if(_top > _base && _top < 500 && etajGeom){ // sanity check: max 500m, top>base
        feats.push({
          type:'Feature',
          properties:{
            base: _base,
            top: _top,
            color: etajColor,
            floor: i,
            isLast,
            isAedis: true,
            isParter: i===0,
            fn: AEDIS.parterDiferit && i===0 ? AEDIS.fnParter : fn,
            hEtaj: Number(hEtajCrt)||3.0,
            parcelIdx: S.activeParcel??0
          },
          geometry: etajGeom
        });
      }

      currentH = _top;
    }

    // ── Acoperiș ──────────────────────────────────────────────────────────
    let roofBase = currentH;
    let fpSmall = turf.transformScale(fpFeat, 0.97, {origin:turf.centerOfMass(fpFeat)});

      const _roofFpGeom = AEDIS._lastFloorGeom || fpGeom;
    switch(AEDIS.tipAcoperis){
      case 'terasa_plata':
        // Terasa plata: slab subtire vizibil + parapet cu culoare atic din stil
        feats.push({type:'Feature',
          properties:{base:roofBase,top:roofBase+0.3,color:'#475569',floor:-10,roofType:'terasa'},
          geometry:_roofFpGeom});
        // Parapet - culoare atic din stil (mai inchis)
        if((AEDIS.hAttic||1.2)>0){
          const aticColor = stilDef.aticColor||darken(AEDIS_FN[fn]?.color||'#94a3b8',40);
          feats.push({type:'Feature',
            properties:{base:roofBase,top:roofBase+(AEDIS.hAttic||1.2),color:aticColor,floor:-11,roofType:'parapet'},
            geometry:_roofFpGeom});
          // Interior parapet (gol)
          try{
            const inner = turf.buffer({type:'Feature',geometry:_roofFpGeom,properties:{}}, -0.4, {units:'meters'});
            if(inner?.geometry){
              feats.push({type:'Feature',
                properties:{base:roofBase,top:roofBase+AEDIS.hAttic,color:'#0a1628',floor:-12,roofType:'parapet_inner'},
                geometry:inner.geometry});
            }
          }catch(e){}
        }
        break;

      case 'terasa_circulabila':
        // Terasa cu borduri mai inalte + pavaj (culoare diferita)
        feats.push({type:'Feature',
          properties:{base:roofBase,top:roofBase+0.15,color:'#78716c',floor:-10,roofType:'pavaj'},
          geometry:_roofFpGeom});
        feats.push({type:'Feature',
          properties:{base:roofBase,top:roofBase+1.1,color:darken(AEDIS_FN[fn]?.color||'#94a3b8',25),floor:-11,roofType:'bordura'},
          geometry:_roofFpGeom});
        try{
          const inner = turf.buffer({type:'Feature',geometry:_roofFpGeom,properties:{}}, -0.5, {units:'meters'});
          if(inner?.geometry) feats.push({type:'Feature',
            properties:{base:roofBase,top:roofBase+1.1,color:'#0a1628',floor:-12,roofType:'terasa_interior'},
            geometry:inner.geometry});
        }catch(e){}
        break;

      case 'sarpanta': {
        // Sarpanta simulata: doua corpuri triunghiulare (un dreptunghi ngustat la varf)
        const hCoama = AEDIS.hSarpanta||3.5;
        // Corp sarpanta = corp redus progresiv in 4 pasi
        for(let si=0;si<4;si++){
          const f = 1 - si*0.25;
          const sh = roofBase + si*(hCoama/4);
          try{
            const sc = turf.transformScale(fpFeat, Math.max(0.05,f), {origin:turf.centerOfMass(fpFeat)});
            if(sc?.geometry) feats.push({type:'Feature',
              properties:{base:sh,top:sh+hCoama/4,color:darken('#c4956a',si*5),floor:-10-si,roofType:'sarpanta'},
              geometry:sc.geometry});
          }catch(e){}
        }
        break;
      }

      case 'mansarda': {
        // Mansarda: etaj retras H=mansarda + sarpanta mica deasupra
        const retFact = 0.72;
        try{
          const sc = turf.transformScale(fpFeat, retFact, {origin:turf.centerOfMass(fpFeat)});
          if(sc?.geometry){
            feats.push({type:'Feature',
              properties:{base:roofBase,top:roofBase+AEDIS.hMansarda,color:darken(AEDIS_FN[fn]?.color||'#94a3b8',10),floor:-10,roofType:'mansarda'},
              geometry:sc.geometry});
            // Sarpanta mica deasupra mansardei
            const hCoama2=1.8;
            for(let si=0;si<3;si++){
              const f2 = retFact*(1-si*0.35);
              try{
                const sc2=turf.transformScale(fpFeat,Math.max(0.05,f2),{origin:turf.centerOfMass(fpFeat)});
                if(sc2?.geometry) feats.push({type:'Feature',
                  properties:{base:roofBase+AEDIS.hMansarda+si*(hCoama2/3),top:roofBase+AEDIS.hMansarda+(si+1)*(hCoama2/3),color:'#a0785a',floor:-11-si,roofType:'sarpanta_mica'},
                  geometry:sc2.geometry});
              }catch(e){}
            }
          }
        }catch(e){}
        break;
      }

      case 'combinat':
        // Terasa + corp tehnic central
        feats.push({type:'Feature',
          properties:{base:roofBase,top:roofBase+0.2,color:'#475569',floor:-10,roofType:'terasa'},
          geometry:_roofFpGeom});
        try{
          const techGeom = turf.transformScale(fpFeat,0.3,{origin:turf.centerOfMass(fpFeat)});
          if(techGeom?.geometry) feats.push({type:'Feature',
            properties:{base:roofBase+0.2,top:roofBase+3.5,color:'#64748b',floor:-11,roofType:'corp_tehnic'},
            geometry:techGeom.geometry});
        }catch(e){}
        break;
    }

    // ── PENTHOUSE (opțional, deasupra ultimului etaj) ─────────────────────
    if(AEDIS.penthouseActiv){
      try{
        const pRet = Math.max(1, AEDIS.penthouseRetragere||2.5);
        const pH   = Math.max(2.4, AEDIS.penthouseH||3.2);
        const pF   = Math.max(0.25, Math.min(0.85, AEDIS.penthouseSuprafataFactor||0.5));
        // Retragere uniformă pe toate laturile
        const pGeom = turf.buffer({type:'Feature',geometry:fp.geometry,properties:{}}, -pRet, {units:'meters'});
        if(pGeom?.geometry){
          // Scalăm la factorul de suprafață dorit
          const pScaled = turf.transformScale({type:'Feature',geometry:pGeom.geometry,properties:{}}, pF/1.0, {origin:turf.centerOfMass({type:'Feature',geometry:pGeom.geometry,properties:{}})});
          if(pScaled?.geometry){
            const pBase = roofBase + 0.3;
            const pColor = AEDIS_STIL[AEDIS.stil]?.parterColor || '#0f172a';
            feats.push({type:'Feature',
              properties:{base:pBase, top:pBase+pH, color:pColor, floor:-20, roofType:'penthouse'},
              geometry:pScaled.geometry});
            // Terasă deasupra penthouse
            feats.push({type:'Feature',
              properties:{base:pBase+pH, top:pBase+pH+0.3, color:'#475569', floor:-21, roofType:'penthouse_terasa'},
              geometry:pScaled.geometry});
          }
        }
      }catch(e){}
    }

    // ── Etichete dimensionale ─────────────────────────────────────────────
    if(AEDIS.showDim){
      aedisUpdateDimLabels(fp, totalNiv, hParter, hEtaj, currentH + (AEDIS.tipAcoperis!=='terasa_plata'?AEDIS.hSarpanta:0.25));
    }

    // Stocam si setam
  } // end for parcelsToGen

  // ── Generare balcoane ───────────────────────────────────────────────────
  if(AEDIS.balcoane && feats.length > 0){
    try{
      const ap3 = S.parcels[S.activeParcel??0];
      if(ap3?.geo?.geometry){
        const etajFeats = feats.filter(f=>!f.properties?.isExistent&&(f.properties?.floor??0)>=1);
        const adanc = Math.max(0.5, AEDIS.balconAdancime||1.5);
        const laturi = AEDIS.balconLaturi||['S'];
        etajFeats.slice(0,Math.min(etajFeats.length, 20)).forEach(ef=>{
          if(!ef.geometry?.coordinates?.[0]) return;
          const ring = ef.geometry.coordinates[0];
          const base = ef.properties.base||0;
          const top = base + 0.15; // placa balcon subtire
          // Calculam directia fiecarei laturi si adaugam balcoanele
          for(let si=0;si<ring.length-1;si++){
            const p1=ring[si], p2=ring[(si+1)%ring.length];
            const midLng=(p1[0]+p2[0])/2, midLat=(p1[1]+p2[1])/2;
            // Directia laturii (bearing 0=N, 90=E, 180=S, 270=V)
            const dx=(p2[0]-p1[0])*111320*Math.cos(midLat*Math.PI/180);
            const dy=(p2[1]-p1[1])*111320;
            const bearing = ((Math.atan2(dx,dy)*180/Math.PI)+360)%360;
            // Detectam daca e N/E/S/V (in 45° de la directia nominala)
            const dirLabel = bearing<45||bearing>=315?'N':bearing<135?'E':bearing<225?'S':'V';
            if(!laturi.includes(dirLabel)) continue;
            // Normalele spre exterior
            const len = Math.sqrt(dx*dx+dy*dy);
            if(len<0.5) continue;
            const nx=dy/len, ny=-dx/len;
            const mLng=111320*Math.cos(midLat*Math.PI/180), mLat2=111320;
            const offset=adanc;
            // Balcon = dreptunghi proiectat pe latură
            const lLen=Math.min(len,12)*0.8; // max 12m latime balcon
            const midDx=(p2[0]-p1[0])/2*0.8, midDy=(p2[1]-p1[1])/2*0.8;
            const bl=[p1[0]+midDx*(1-lLen/len*2),p1[1]+midDy*(1-lLen/len*2)];
            const br=[p1[0]+midDx*(1+lLen/len*2),p1[1]+midDy*(1+lLen/len*2)];
            const tl=[bl[0]+nx*offset/mLng, bl[1]+ny*offset/mLat2];
            const tr=[br[0]+nx*offset/mLng, br[1]+ny*offset/mLat2];
            feats.push({type:'Feature',
              properties:{base:base-0.15,top:top,color:'#93c5fd',floor:ef.properties.floor,isBalcon:true},
              geometry:{type:'Polygon',coordinates:[[bl,br,tr,tl,bl]]}});
          }
        });
      }
    }catch(e){ console.warn('balcoane err:', e.message); }
  }

  // ── Perete cortina: modificam culoarea etajelor la sticla reflectiva ───
  if(AEDIS.peretelCortina){
    const pct = (AEDIS.cortinaProcent||60)/100;
    const stilDef2 = AEDIS_STIL[AEDIS.stil]||AEDIS_STIL.modern;
    feats.filter(f=>!f.properties?.isExistent&&(f.properties?.floor??0)>=0&&!f.properties?.isBalcon)
      .forEach(f=>{
        if(Math.random()<pct){
          f.properties.color = '#7dd3fc'; // sticla albastru deschis
          f.properties.peretelCortina = true;
        }
      });
  }

  S.vol._lastFeats = feats;
  S.vol.genDone = true;
  setSource('vol-src',{type:'FeatureCollection',features:feats});

  set3D(65,-25);

  // Zoom la parcela dupa generare
  const ap2 = S.parcels[S.activeParcel??0];
  if(ap2?.geo?.geometry){
    try{
      const bb = turf.bbox(ap2.geo);
      const pad = Math.max(60, Math.min(120, (bb[2]-bb[0])*111320*0.3));
      setTimeout(()=>{
        map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{
          padding: pad, pitch: 65, bearing: -25,
          maxZoom: 18, duration: 900
        });
      }, 200);
    }catch(e){}
  }

  // Dacă nu avem context, îl încărcăm acum
  if(!S.ctx?.features?.length){
    loadContext().then(()=>{ setTimeout(updateDistanceLines, 300); });
  } else {
    setTimeout(updateDistanceLines, 400);
  }

  const _lastNiv = AEDIS.corpuri[0]?.niv || 4;
  const _lastHNiv = AEDIS.corpuri[0]?.hNiv || 3.0;
  const _lastFnDef = AEDIS_FN[AEDIS.fn] || AEDIS_FN.rezidential_colectiv;
  const _lastH = (AEDIS.parterDiferit?(_lastFnDef.hParter||4.5):_lastHNiv)+(_lastNiv-1)*_lastHNiv;
  const _multiMsg = S.parcels.length>1 ? ` · ${S.parcels.length} parcele` : '';
  ss(`✅ AEDIS: ${AEDIS.corpuri[0]?.niv||4} niveluri · H=${((AEDIS.parterDiferit?(AEDIS_FN[AEDIS.fn]?.hParter||4.5):(AEDIS.corpuri[0]?.hNiv||3.0))+(((AEDIS.corpuri[0]?.niv||4)-1)*(AEDIS.corpuri[0]?.hNiv||3.0))).toFixed(1)}m · ${AEDIS_FN[AEDIS.fn]?.label||''} · ${AEDIS_STIL[AEDIS.stil]?.label||''}${S.parcels.length>1?' · '+S.parcels.length+' parcele':''}`);
  // Actualizăm distanțele imediat după generare
  setTimeout(()=>{ try{updateDistanceLines();}catch(e){} }, 400);
  // Dacă viewer e deschis, rebuild rapid (fără recreare completă)
  if(_v3dIsOpen()) setTimeout(()=>{ try{_v3dRebuildFast();}catch(e){} }, 200);
}

// ── Etichete dimensionale AEDIS ────────────────────────────────────────────
function _aedisToggleDimLabels(){
  // Dacă showDim e acum false → golim sursa de etichete
  // Dacă showDim e acum true → recalculăm etichetele
  try{
    const dimSrc = map.getSource('aedis-dim-src');
    if(!dimSrc) return;
    if(!AEDIS.showDim){
      // Ascundem: golim sursa
      dimSrc.setData({type:'FeatureCollection',features:[]});
    } else {
      // Afișăm: recalculăm din ultimul footprint
      const ap = S.parcels[S.activeParcel??0];
      if(!ap?.geo?.geometry) return;
      const params = ap.params || getDefaultParams(ap.utr||'');
      const fnDef = AEDIS_FN[AEDIS.fn] || AEDIS_FN.rezidential_colectiv;
      const totalNiv = AEDIS.corpuri[0]?.niv || pN(params.niv) || 4;
      const hParter = AEDIS.parterDiferit ? (fnDef.hParter||4.5) : (AEDIS.corpuri[0]?.hNiv||3.0);
      const hEtaj = AEDIS.corpuri[0]?.hNiv || fnDef.hEtaj || 3.0;
      const hTot = hParter+(totalNiv-1)*hEtaj;

      // Prioritate: lastFeats (dacă volum generat) → footprint calculat → geometria parcelei
      let fp = null;
      if(S.vol._lastFeats?.length){
        const parterFeat = S.vol._lastFeats.find(f=>f.properties?.floor===0&&!f.properties?.isExistent);
        if(parterFeat) fp = {type:'Feature',geometry:parterFeat.geometry,properties:{}};
      }
      if(!fp && ap.geo?.geometry){
        // Fallback: folosim footprint calculat din parametri
        try{
          const fpBuilt = buildFP(ap.geo.geometry, params);
          if(fpBuilt?.geometry) fp = fpBuilt;
        }catch(e){}
      }
      if(!fp && ap.geo?.geometry){
        // Fallback final: geometria parcelei direct
        fp = {type:'Feature', geometry:ap.geo.geometry, properties:{}};
      }
      if(fp) aedisUpdateDimLabels(fp, totalNiv, hParter, hEtaj, hTot);
    }
  }catch(e){ console.warn('_aedisToggleDimLabels:', e.message); }
}

function aedisUpdateDimLabels(fp, niv, hP, hE, hTot){
  if(!fp?.geometry) return;
  try{
    const labels=[];
    const ring = fp.geometry.coordinates[0];
    const cx=ring.reduce((s,c)=>s+c[0],0)/ring.length;
    const cy=ring.reduce((s,c)=>s+c[1],0)/ring.length;

    // Eticheta totala in centru
    labels.push({type:'Feature',geometry:{type:'Point',coordinates:[cx,cy]},
      properties:{label:`H=${hTot.toFixed(1)}m\n${niv} niv.`,type:'total'}});

    // Eticheta pe latura frontala
    if(ring.length>2){
      const mid=[(ring[0][0]+ring[1][0])/2,(ring[0][1]+ring[1][1])/2];
      labels.push({type:'Feature',geometry:{type:'Point',coordinates:mid},
        properties:{label:`P:${hP.toFixed(1)}m`,type:'parter'}});
    }

    // Actualizăm sursa corectă: aedis-dim-src (nu ctx-labels-src)
    const dimSrc = map.getSource('aedis-dim-src');
    if(dimSrc){
      dimSrc.setData({type:'FeatureCollection',features:labels});
    } else {
      // Fallback: setSource generic
      setSource('aedis-dim-src',{type:'FeatureCollection',features:labels});
    }
  }catch(e){}
}

// ── Calcul POT/CUT existent pe parcelă ────────────────────────────────────
function aedisCalcExistent(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry || !S.ctx?.features?.length) return {pot:0,cut:0,h:0,n:0};

  const pA = ap.area || turf.area({type:'Feature',geometry:ap.geo.geometry,properties:{}});
  const onParcel = S.ctx.features.filter(f=>{
    try{
      const ctr=turf.centerOfMass(f);
      return turf.booleanPointInPolygon(ctr,{type:'Feature',geometry:ap.geo.geometry,properties:{}});
    }catch(e){return false;}
  });

  const totalSC = onParcel.reduce((s,f)=>{try{return s+turf.area(f);}catch(e){return s;}},0);
  const maxH = onParcel.length ? Math.max(...onParcel.map(f=>f.properties?.h||0)) : 0;
  const avgNiv = onParcel.length ? Math.round(onParcel.reduce((s,f)=>s+(f.properties?.lv||Math.round((f.properties?.h||0)/3)),0)/onParcel.length) : 0;

  return {
    pot: pA>0 ? Math.round(totalSC/pA*100) : 0,
    cut: pA>0 ? Math.round(totalSC*avgNiv/pA*10)/10 : 0,
    h: Math.round(maxH),
    n: onParcel.length,
    sc: Math.round(totalSC)
  };
}

// ── Helper: setează visibility ctx-3d respectând scenariul demolare ─────────
function _setCtxVisibility(){
  const visible = !S.vol.onlyVol
    && S.vol.scenariuConstructie !== 'liber'
    && AEDIS.scenariu !== 'demolare'
    && !AEDIS._demolishActive;
  try{ map.setLayoutProperty('ctx-3d','visibility', visible ? 'visible' : 'none'); }catch(e){}
  return visible;
}

// ═══════════════════════════════════════════════════════════════════════════
// AEDIS UI — Panou modal
// ═══════════════════════════════════════════════════════════════════════════

function aedisOpenLoisir(){
  // Setăm modul AEDIS pe LOISIR
  AEDIS.mode = 'loisir';
  aedisOpen();
}

// Rebuild rapid viewer: doar mesh-urile AEDIS, fără recreare completă
function _v3dIsOpen(){
  return !!(document.getElementById('aedis-3d-viewer-overlay') && V3D.scene && V3D.r && V3D.cam);
}

function _v3dRebuildFast(){
  if(!_v3dIsOpen()) return false;
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry||!S.vol._lastFeats?.length) return false;
  V3D.texCache={};
  // Ştergem DOAR mesh-urile AEDIS
  V3D.aedis.forEach(m=>{
    V3D.scene.remove(m);
    try{m.geometry?.dispose();if(Array.isArray(m.material))m.material.forEach(t=>t.dispose());else m.material?.dispose();}catch(e){}
  });
  V3D.aedis=[];
  // Curăță liniile de muchie (EdgesGeometry)
  const rm=[];
  V3D.scene.children.forEach(c=>{if(c.isLineSegments&&c.renderOrder<999)rm.push(c);});
  rm.forEach(c=>V3D.scene.remove(c));

  const ring0=ap.geo.geometry.type==='Polygon'?ap.geo.geometry.coordinates[0]:ap.geo.geometry.coordinates[0][0];
  const cx=ring0.reduce((s,c)=>s+c[0],0)/ring0.length;
  const cy2=ring0.reduce((s,c)=>s+c[1],0)/ring0.length;
  const mLng=111320*Math.cos(cy2*Math.PI/180),mLat=111320;
  const toLoc=([lng,lat])=>[(lng-cx)*mLng,(lat-cy2)*mLat];
  const THREE=window.THREE;
  const stilKey=AEDIS.stil||'modern';
  const COLS_V={modern:{e:'#c8dff8',p:'#0d2040'},inovator:{e:'#a0a8f0',p:'#0c1035'},
    clasic:{e:'#f0d8a0',p:'#5c3010'},minimalist:{e:'#f4f8fc',p:'#d0dcea'},
    industrial:{e:'#c09870',p:'#1e1008'},adaptat_context:{e:'#c8e0b8',p:'#1c3014'}};
  const cv=COLS_V[stilKey]||COLS_V.modern;

  (S.vol._lastFeats||[]).forEach(f=>{
    if(!f.geometry||f.properties?.isExistent) return;
    const base=f.properties?.base||0,top=f.properties?.top||3,floor=f.properties?.floor??0;
    const h=top-base; if(h<=0.01) return;
    const rt=f.properties?.roofType||'';
    const isMans=floor<=-10&&(rt==='mansarda'||rt==='sarpanta_mica');
    const isSarp=floor<0&&(rt==='sarpanta'||rt==='sarpanta_mica');
    const isRoofSlab=floor<0&&(rt==='terasa_plata'||rt==='terasa'||rt==='combinat');
    const isPenthouse=floor<0&&(rt==='penthouse'||rt==='penthouse_terasa');
    if(floor<0&&!isRoofSlab&&!isMans&&!isSarp&&!isPenthouse) return;
    const coords=f.geometry.type==='Polygon'?f.geometry.coordinates:f.geometry.coordinates[0];
    const pts=coords[0].slice(0,-1).map(toLoc);
    const holePts=coords.length>1?coords[1].slice(0,-1).map(toLoc):null;
    if(pts.length<3) return;
    let mat;
    try{
      if(isRoofSlab) mat=new THREE.MeshLambertMaterial({color:'#c8d0d8'});
      else if(isPenthouse){
        mat=_v3dMatPenthouse(THREE,stilKey,V3D.texCache);
      }
      else if(isMans||isSarp){const rc={modern:'#2a3a50',clasic:'#7c3512',minimalist:'#c8d0d8',inovator:'#2a1a60',industrial:'#3a2818',adaptat_context:'#4a6030',contemporary:'#1a4020',deconstructivist:'#2a0a40'};mat=new THREE.MeshStandardMaterial({color:new THREE.Color(rc[stilKey]||'#5a4030'),roughness:0.80,metalness:0.05});}
      else if(floor===0) mat=_v3dMatParter(THREE,stilKey,V3D.texCache);
      else if(f.properties?.isLast) mat=_v3dMatPenthouse(THREE,stilKey,V3D.texCache);
      else mat=_v3dMatFloor(THREE,floor===0?cv.p:cv.e,floor,stilKey,V3D.texCache);
      if(!mat) return;
      const mesh=_v3dPrism(THREE,pts,base,top,mat,holePts);
      if(!mesh) return;
      mesh.castShadow=true;mesh.receiveShadow=true;
      V3D.scene.add(mesh);V3D.aedis.push(mesh);
      if(mesh.isGroup)mesh.children.forEach(c=>{if(c.isMesh)_v3dAddEdges(THREE,c,V3D.scene,'#ffffff',0.18);});
      else _v3dAddEdges(THREE,mesh,V3D.scene,'#ffffff',0.18);
      if(floor>=0&&h>1.5){
        _v3dAddWindows(THREE,pts,base,top,V3D.scene,stilKey);
        if(holePts&&holePts.length>=3)_v3dAddWindows(THREE,holePts,base,top,V3D.scene,stilKey);
      }
    }catch(e){console.warn('fast rebuild:',e.message);}
  });
  V3D.r.render(V3D.scene,V3D.cam);
  // Trigger re-render în loop-ul de animație dacă există
  if(V3D._raf) cancelAnimationFrame(V3D._raf);
  V3D._raf = requestAnimationFrame(()=>{
    if(V3D.r && V3D.scene && V3D.cam) V3D.r.render(V3D.scene, V3D.cam);
  });
  // Actualizăm legenda cu valorile curente
  _v3dUpdateLegend();
  return true;
}

// Actualizează legenda contextuală din viewer
function _v3dUpdateLegend(){
  const leg = document.getElementById('v3d-legend');
  if(!leg) return;
  const niv2 = AEDIS.corpuri[0]?.niv||4;
  const hNiv2 = AEDIS.corpuri[0]?.hNiv||3.0;
  const fnDef2 = AEDIS_FN[AEDIS.fn]||AEDIS_FN.rezidential_colectiv;
  const hP2 = AEDIS.parterDiferit?(fnDef2.hParter||4.5):hNiv2;
  const hTot2 = (hP2+(niv2-1)*hNiv2).toFixed(1);
  const stilLabel2 = AEDIS_STIL[AEDIS.stil]?.label||'Modern';
  const etajRetras2 = AEDIS.activeRetragere && (AEDIS_STIL[AEDIS.stil]?.retragereFactor||1)<0.98;
  const etajeNorm2 = niv2-1-(etajRetras2?1:0);
  const acoperis2 = {terasa_plata:'Terasă plată',terasa_circulabila:'Terasă circulabilă',sarpanta:'Șarpantă',mansarda:'Mansardă',combinat:'Combinat',penthouse:'Penthouse'}[AEDIS.tipAcoperis]||'Terasă plată';
  const forma2 = {patrat:'Formă pătrat',dreptunghi:'Dreptunghi',L:'Formă L',U:'Formă U',T:'Formă T',curte:'Curte interioară',bara:'Bară'}[AEDIS.forma||'auto']||'';

  let etajStr2 = [];
  if(AEDIS.parterDiferit) etajStr2.push('Parter '+(AEDIS_FN[AEDIS.fnParter]?.label||''));
  else etajStr2.push('Parter');
  if(etajeNorm2>0) etajStr2.push(etajeNorm2+(etajeNorm2===1?' etaj':' etaje'));
  if(etajRetras2) etajStr2.push('+ etaj retras');

  const ap2 = S.parcels[S.activeParcel??0];
  const sc2 = ap2?.area ? Math.round(ap2.area * (ap2.params?.pot||40)/100) : null;
  const sd2 = ap2?.area ? Math.round(ap2.area * (ap2.params?.cut||2.0)) : null;

  leg.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
      <div style="display:flex;align-items:center;gap:6px">
        <span style="font-size:15px">${fnDef2.icon||'🏢'}</span>
        <div>
          <div style="font-size:12px;font-weight:800;color:#d4af37;letter-spacing:0.03em">${fnDef2.label||'Clădire'}</div>
          <div style="font-size:9.5px;color:#64748b;letter-spacing:0.04em;text-transform:uppercase">${stilLabel2}</div>
        </div>
      </div>
      <button onclick="this.closest('#v3d-legend').classList.toggle('collapsed')"
        style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:#64748b;border-radius:5px;padding:2px 7px;font-size:10px;cursor:pointer;flex-shrink:0"
        title="Ascunde/arată legenda">⊟</button>
    </div>
    <div class="v3d-legend-body">
      <div style="height:1px;background:rgba(212,175,55,0.15);margin:5px 0"></div>
      <div style="display:flex;flex-direction:column;gap:3px">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:11px;color:#38bdf8;font-weight:800;min-width:42px">${hTot2}m</span>
          <span style="font-size:10px;color:#94a3b8">${etajStr2.join(' · ')}</span>
        </div>
        ${forma2?`<div style="display:flex;align-items:center;gap:6px"><span style="font-size:9px;color:#64748b;min-width:42px">Formă</span><span style="font-size:10px;color:#94a3b8">${forma2}</span></div>`:''}
        ${AEDIS.peretelCortina?`<div style="display:flex;align-items:center;gap:6px"><span style="font-size:9px;color:#64748b;min-width:42px">Fațadă</span><span style="font-size:10px;color:#60a5fa">Perete cortină ${AEDIS.cortinaProcent||60}%</span></div>`:''}
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:9px;color:#64748b;min-width:42px">Acoperiș</span>
          <span style="font-size:10px;color:#94a3b8">${acoperis2}${AEDIS.penthouseActiv?' + Penthouse':''}</span>
        </div>
      </div>
      <div style="height:1px;background:rgba(212,175,55,0.15);margin:5px 0"></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;text-align:center">
        <div><div style="font-size:12px;font-weight:800;color:#d4af37">${niv2}</div><div style="font-size:7px;color:#475569;text-transform:uppercase">niv.</div></div>
        <div><div style="font-size:12px;font-weight:800;color:#38bdf8">${hTot2}m</div><div style="font-size:7px;color:#475569;text-transform:uppercase">H total</div></div>
        <div><div style="font-size:12px;font-weight:800;color:#4ade80">${sc2||'—'}mp</div><div style="font-size:7px;color:#475569;text-transform:uppercase">SC</div></div>
        <div><div style="font-size:12px;font-weight:800;color:#f472b6">${ap2?.utr||'—'}</div><div style="font-size:7px;color:#475569;text-transform:uppercase">UTR</div></div>
      </div>
      ${sd2?`<div style="margin-top:4px;font-size:9px;color:#64748b;text-align:center">SD estimat: <span style="color:#a78bfa;font-weight:700">${sd2} mp</span> · H etaj: <span style="color:#38bdf8;font-weight:700">${hNiv2}m</span></div>`:''}
    </div>
  `;

  // CSS pentru collapsed state
  if(!document.getElementById('v3d-legend-css')){
    const st = document.createElement('style');
    st.id = 'v3d-legend-css';
    st.textContent = `#v3d-legend.collapsed .v3d-legend-body{display:none}`;
    document.head.appendChild(st);
  }
}

function aedisOpen(){
  AEDIS.open=true;

  // ── Inițializare sursă etichete dimensionale (dacă nu există) ────────────
  try{
    if(!map.getSource('aedis-dim-src')){
      map.addSource('aedis-dim-src',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
    }
    if(!map.getLayer('aedis-dim-layer')){
      map.addLayer({
        id:'aedis-dim-layer', type:'symbol', source:'aedis-dim-src',
        layout:{
          'text-field':['get','label'],
          'text-size':11,
          'text-font':['DIN Pro Bold','Arial Unicode MS Bold'],
          'text-anchor':'center',
          'text-justify':'center',
          'text-allow-overlap':true,
          'text-ignore-placement':true,
        },
        paint:{
          'text-color':'#00ff88',
          'text-halo-color':'rgba(0,0,0,0.85)',
          'text-halo-width':1.8,
        }
      });
    }
  }catch(e){ console.warn('[aedisOpen] dim-layer:', e.message); }

  // ── Sincronizăm setările din Volum 3D → Urban3D ───────────────────────
  // Niveluri și H etaj
  const ap = S.parcels[S.activeParcel??0];
  const params = ap?.params || getDefaultParams(ap?.utr||'');
  const nivFromVol = pN(params.niv) || 4;
  const hNivFromVol = Number(S.vol.hNiv||3.0);
  if(AEDIS.corpuri[0]){
    AEDIS.corpuri[0].niv  = nivFromVol;
    AEDIS.corpuri[0].hNiv = hNivFromVol;
  }
  // Funcțiune
  if(S.vol.fn && AEDIS_FN[S.vol.fn]) AEDIS.fn = S.vol.fn;
  // Scenariu constructie
  if(S.vol.scenariuConstructie) AEDIS.scenariu = S.vol.scenariuConstructie==='liber'?'demolare':S.vol.scenariuConstructie;
  // Multiple volume
  AEDIS._multiVol = S.vol.multiVol || false;
  AEDIS._multiVolCount = S.vol.multiVolCount || 2;

  const modal=document.getElementById('aedis-modal');
  if(modal) modal.classList.add('open');
  aedisRender();
  // Mobile close button fix
  if(window.innerWidth < 600){
    let btn = document.getElementById('aedis-mob-x');
    if(!btn){
      btn = document.createElement('button');
      btn.id='aedis-mob-x';
      btn.textContent='✕';
      btn.style.cssText='position:fixed;top:12px;left:12px;z-index:10001;background:rgba(15,25,50,.85);color:#a78bfa;border:1px solid rgba(139,92,246,.4);border-radius:50%;width:32px;height:32px;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);box-shadow:0 2px 8px rgba(0,0,0,.3)';
      btn.onclick=()=>{aedisClose();};
      document.body.appendChild(btn);
    }
    btn.style.display='flex'; btn.style.alignItems='center'; btn.style.justifyContent='center';
  }
}
function aedisSetFalKey(){
  const current = FAL_AI.apiKey ? '(setat)' : '(nesetat)';
  const key = prompt('API key Fal.ai ' + current + '\nObțineți de pe: https://fal.ai/dashboard', '');
  if(key !== null){
    FAL_AI.apiKey = key.trim();
    try{
      if(FAL_AI.apiKey) localStorage.setItem('fal_api_key', FAL_AI.apiKey);
      else localStorage.removeItem('fal_api_key');
    }catch(e){}
    if(FAL_AI.apiKey) ss('✅ API key Fal.ai setat și salvat.');
    else ss('⚠️ API key șters.');
    aedisRender();
  }
}

// aedisResetAndRender și aedisCloseRenderOverlay — definite mai jos (versiunea unică)

function aedis3DRemove(){
  try{
    if(map.getLayer('aedis-3d-layer')) map.removeLayer('aedis-3d-layer');
  }catch(e){}
  if(AEDIS3D.renderer){
    AEDIS3D.renderer.dispose();
    AEDIS3D.renderer = null;
  }
  AEDIS3D.active = false;
  ss('Volum șters.');
}


// ── Demolare: elimină clădirile existente de pe parcelă din toate sursele ─
// Strategie simplă și robustă: filtrare GeoJSON + ctx-3d hidden
// FĂRĂ mask layer (creează turnuri vizibile în orice stil de hartă)
function _aedisRemoveExistingFromCtx(){
  try{
    const parcels = S.parcels.filter(p=>p.geo?.geometry);
    if(!parcels.length) return;

    // ── 1. Filtrăm ctx-src (GeoJSON OSM încărcat de noi) ────────────────────
    // Eliminăm clădirile al căror centru e pe parcelă
    const ctxSrc = map.getSource('ctx-src');
    if(ctxSrc?._data?.features){
      ctxSrc.setData({type:'FeatureCollection', features: ctxSrc._data.features.filter(f=>{
        try{
          const ctr = turf.centerOfMass(f);
          return !parcels.some(p=>
            turf.booleanPointInPolygon(ctr,{type:'Feature',geometry:p.geo.geometry,properties:{}}));
        }catch(e){ return true; }
      })});
    }

    // ── 2. Eliminăm isExistent din vol-src ──────────────────────────────────
    const volSrc = map.getSource('vol-src');
    if(volSrc?._data?.features){
      volSrc.setData({type:'FeatureCollection',
        features: volSrc._data.features.filter(f=>!f.properties?.isExistent)});
    }

    // ── 3. Ascundem ctx-3d complet pe zona parcelei
    // Cel mai simplu și fără artefacte: ctx-3d none, vol-3d acoperă zona
    try{ map.setLayoutProperty('ctx-3d','visibility','none'); }catch(e){}

    // ── 4. Clădirile native Mapbox (tile-uri vectoriale) nu pot fi eliminate
    // programatic. Ele vor fi acoperite vizual de vol-3d după generare.
    // Dacă utilizatorul nu a generat volumul încă, îl rugăm să genereze.

    map.triggerRepaint();
    AEDIS._forcedBaseH = 0;
    AEDIS._demolishActive = true;
    ss('🔨 Demolare aplicată — context eliminat. Generați volumul cu ⚡ pentru a acoperi terenul.');
  }catch(e){ console.warn('_aedisRemoveExistingFromCtx error:', e.message); }
}

// Restaurăm starea normală când ieșim din demolare
function _aedisRestoreCad3D(){
  try{
    AEDIS._demolishActive = false;

    // Ștergem masca de demolare (acoperă clădirile native Mapbox)
    try{
      if(map.getLayer('demolish-mask')) map.removeLayer('demolish-mask');
      if(map.getSource('demolish-mask-src')) map.removeSource('demolish-mask-src');
    }catch(e){}

    // Restaurăm S.ctx din backup (dacă a fost salvat la demolare)
    if(S._ctxBackup?.features?.length){
      S.ctx = S._ctxBackup;
      S._ctxBackup = null;
    }

    // Restaurăm ctx-3d vizibil (dacă nu e onlyVol)
    try{
      _setCtxVisibility();
    }catch(e){}

    // Restaurăm ctx-src cu toate clădirile
    if(S.ctx?.features?.length){
      try{ setSource('ctx-src', S.ctx); }catch(e){}
    }

    map.triggerRepaint();
  }catch(e){ console.warn('_aedisRestoreCad3D:', e.message); }
}

function aedisGenerateAll(){
  // Verificăm că avem o parcelă selectată
  if(!S.parcels?.length || !S.parcels[S.activeParcel??0]?.geo?.geometry){
    ss('Selectati mai intai o parcela de pe harta (click pe teren).');
    return;
  }
  // Re-sincronizăm AEDIS cu parcela activă
  const _ap = S.parcels[S.activeParcel??0];
  if(_ap && !AEDIS.fn) AEDIS.fn = 'rezidential_colectiv';
  // Dezactivăm Three.js layer dacă era activ
  if(AEDIS3D.active){
    try{ map.removeLayer('aedis-3d-layer'); }catch(e){}
    if(AEDIS3D.renderer){ AEDIS3D.renderer.dispose(); AEDIS3D.renderer=null; }
    AEDIS3D.active = false;
  }
  // DEMOLARE: curăță contextul de pe parcelă (ascundem din ctx-src)
  if(AEDIS.scenariu === 'demolare'){
    _aedisRemoveExistingFromCtx();
  }
  // Generăm fill-extrusion Mapbox
  aedisBuild();
  // Contextul urban + distanțele
  if(!S.ctx?.features?.length){
    loadContext().then(()=>{
      if(AEDIS.scenariu === 'demolare') _aedisRemoveExistingFromCtx();
      setTimeout(updateDistanceLines, 300);
    });
  } else {
    setTimeout(updateDistanceLines, 400);
  }
  // Rebuild viewer 3D rapid dacă e deschis (fără recreare completă)
  if(typeof _v3dIsOpen !== 'undefined' && _v3dIsOpen()){
    setTimeout(()=>{ try{ _v3dRebuildFast(); }catch(e){ console.warn('rebuild:',e); } }, 300);
  }
}

function aedisClose(){
  AEDIS.open=false;
  const modal=document.getElementById('aedis-modal');
  if(modal) modal.classList.remove('open');
  const btn = document.getElementById('aedis-mob-x');
  if(btn) btn.style.display='none';
}
function aedisTab(t){
  AEDIS.tab=t;
  aedisRender();
}

function aedisRender(){
  // ── Sincronizăm AEDIS cu setările din Volum 3D la fiecare render ─────
  const ap = S.parcels[S.activeParcel??0];
  const params = ap?.params || getDefaultParams(ap?.utr||'');
  const nivFromVol = pN(params.niv) || 4;
  const hNivFromVol = Number(S.vol.hNiv||3.0);
  if(AEDIS.corpuri[0]){
    if(!AEDIS._nivOverride) AEDIS.corpuri[0].niv  = nivFromVol;
    if(!AEDIS._hNivOverride) AEDIS.corpuri[0].hNiv = hNivFromVol;
  }
  if(S.vol.fn && AEDIS_FN[S.vol.fn] && !AEDIS._fnOverride) AEDIS.fn = S.vol.fn;
  if(S.vol.scenariuConstructie && !AEDIS._scenariuOverride)
    AEDIS.scenariu = S.vol.scenariuConstructie==='liber'?'demolare':S.vol.scenariuConstructie;
  // Invalidăm cache materiale viewer dacă stilul/funcțiunea s-au schimbat
  if(typeof _v3dIsOpen!=='undefined' && _v3dIsOpen() && V3D?.texCache){
    V3D.texCache={};
  }
  const body=document.getElementById('aedis-body');
  if(!body) return;

  // Salvăm scroll position — innerHTML reset șterge scrollTop-ul din aedis-content
  const scrollEl = body.querySelector('.aedis-content');
  const savedScroll = scrollEl ? scrollEl.scrollTop : 0;

  try{
    body.innerHTML=aedisGetContent();
    // Restaurăm scroll după re-render (utilizatorul rămâne în aceeași poziție)
    if(savedScroll > 0){
      const newScrollEl = body.querySelector('.aedis-content');
      if(newScrollEl) newScrollEl.scrollTop = savedScroll;
    }
  }
  catch(e){ body.innerHTML=`<div style="color:#f87171;padding:16px">Eroare: ${e.message}</div>`; }
}

function aedisGetContent(){
  const ap=S.parcels[S.activeParcel??0];
  const params=ap?.params||getDefaultParams(ap?.utr||'');
  const existent=aedisCalcExistent();
  const fnDef=AEDIS_FN[AEDIS.fn]||AEDIS_FN.rezidential_colectiv;
  const totalNiv=AEDIS.corpuri[0]?.niv||pN(params.niv)||4;
  const hParter=AEDIS.parterDiferit?(fnDef.hParter||4.5):(AEDIS.corpuri[0]?.hNiv||3.0);
  const hEtaj=AEDIS.corpuri[0]?.hNiv||fnDef.hEtaj||3.0;
  const hTot=hParter+(totalNiv-1)*hEtaj;

  const tabs=[
    {id:'functiune',icon:'🏢',label:'Funcțiune'},
    {id:'volum',icon:'📐',label:'Volum'},
    {id:'acoperis',icon:'🏠',label:'Acoperiș'},
    {id:'context',icon:'🌆',label:'Context'},
    {id:'analiza',icon:'📊',label:'Analiză'},
  ];

  const tabsHtml=`<div class="aedis-tabs">${tabs.map(t=>
    `<button onclick="aedisTab('${t.id}')" class="aedis-tab${AEDIS.tab===t.id?' active':''}">${t.icon} ${t.label}</button>`
  ).join('')}</div>`;

  // ── Header info parcelă ──────────────────────────────────────────────
  const headerHtml=ap?`
  <div class="aedis-parcel-info">
    <div class="aedis-pi-row">
      <span class="aedis-pi-badge">${ap.nrcad||'—'}</span>
      <span class="aedis-pi-badge blue">${ap.utr||'—'}</span>
      <span class="aedis-pi-badge green">${ap.area?Math.round(ap.area)+' m²':'—'}</span>
      ${existent.n>0?`<span class="aedis-pi-badge orange">Existent: ${existent.pot}% POT · H${existent.h}m</span>`:'<span class="aedis-pi-badge">Teren liber</span>'}
    </div>
    <div class="aedis-pi-row" style="margin-top:4px;font-size:10px;color:#64748b">
      H propus: <b style="color:#d4af37">${hTot.toFixed(1)}m</b> · 
      ${totalNiv} niveluri · ${fnDef.label}
    </div>
  </div>`:'<div style="color:#f59e0b;padding:8px;font-size:12px">⚠️ Selectați o parcelă mai întâi</div>';

  let contentHtml='';

  // ════════════════════════════════════════════════════════════════════
  if(AEDIS.tab==='functiune'){
    contentHtml=`
    <div class="aedis-section">Funcțiunea principală</div>
    <div class="aedis-fn-grid">
      ${Object.entries(AEDIS_FN).map(([k,v])=>`
        <button onclick="AEDIS.fn='${k}';AEDIS._fnOverride=true;aedisRender();if(typeof _v3dIsOpen==='function'&&_v3dIsOpen()&&typeof _v3dRebuildFast==='function')_v3dRebuildFast();if((S.vol.genDone||window.AEDIS3D?.active)&&typeof aedisGenerateAll==='function')setTimeout(()=>aedisGenerateAll(),0)" class="aedis-fn-btn${AEDIS.fn===k?' active':''}">
          <span class="aedis-fn-dot" style="background:${v.color}"></span>
          ${v.label}
        </button>`).join('')}
    </div>
    <div class="aedis-fn-desc">${fnDef.desc}</div>

    <div class="aedis-section">Parter cu funcțiune distinctă</div>
    <label class="aedis-toggle">
      <input type="checkbox" ${AEDIS.parterDiferit?'checked':''} onchange="AEDIS.parterDiferit=this.checked;aedisRender()">
      <span class="aedis-toggle-label">Parter cu altă funcțiune (ex: comercial la bloc)</span>
    </label>
    ${AEDIS.parterDiferit?`
    <div class="aedis-fn-grid" style="margin-top:8px">
      ${['comercial','birouri','institutie'].map(k=>`
        <button onclick="AEDIS.fnParter='${k}';AEDIS._fnOverride=true;aedisRender()" class="aedis-fn-btn${AEDIS.fnParter===k?' active':''}">
          <span class="aedis-fn-dot" style="background:${AEDIS_FN[k].color}"></span>
          ${AEDIS_FN[k].label}
        </button>`).join('')}
    </div>
    <div class="aedis-row" style="margin-top:8px">
      <span class="aedis-lbl">H parter (m)</span>
      <input type="range" min="3" max="6.5" step="0.5" value="${fnDef.hParter||4.5}"
        oninput="AEDIS.corpuri[0].hParter=+this.value;this.nextElementSibling.textContent=this.value+'m'"
        style="flex:1;accent-color:#f59e0b">
      <span class="aedis-val" style="color:#f59e0b">${fnDef.hParter||4.5}m</span>
    </div>`:''}

    <div class="aedis-section">Stil arhitectural</div>
    <div class="aedis-stil-grid">
      ${Object.entries(AEDIS_STIL).map(([k,v])=>{
        const swatches = v.floorColors.slice(0,5).map(c=>`<span style="display:inline-block;width:8px;height:8px;background:${c};border-radius:1px;margin:0 1px"></span>`).join('');
        return `
        <button onclick="AEDIS.stil='${k}';AEDIS._stilOverride=true;aedisRender();if(typeof _v3dIsOpen==='function'&&_v3dIsOpen()&&typeof _v3dRebuildFast==='function')_v3dRebuildFast();if((S.vol.genDone||window.AEDIS3D?.active)&&typeof aedisGenerateAll==='function')setTimeout(()=>aedisGenerateAll(),0)" class="aedis-stil-btn${AEDIS.stil===k?' active':''}">
          ${v.label}<br>
          <div style="margin:3px 0">${swatches}</div>
          <small style="opacity:0.85;font-size:10px;color:#94a3b8;line-height:1.4;display:block;margin-top:2px">${v.desc}</small>
        </button>`;
      }).join('')}
    </div>
    ${AEDIS.stil==='adaptat_context'&&(!S.ctx?.features?.length)?
      '<div class="aedis-warn">⚠️ Generați contextul OSM mai întâi pentru adaptare automată</div>':
      (AEDIS.stil==='adaptat_context'&&S.ctx?.features?.length?
        `<div class="aedis-ok">✅ Context OSM disponibil: ${S.ctx.features.length} clădiri analizate</div>`:'')
    }`;
  }

  // ════════════════════════════════════════════════════════════════════
  else if(AEDIS.tab==='volum'){
    const niv=AEDIS.corpuri[0]?.niv||4;
    const hNiv=AEDIS.corpuri[0]?.hNiv||3.0;
    contentHtml=`
    <div class="aedis-section">Scenariu construcție</div>
    <div class="aedis-scen-grid">
      ${[
        {id:'demolare',ico:'🏚',label:'Demolare',desc:'Teren liber, maxim PUG'},
        {id:'extindere_h',ico:'🔗',label:'Ext. Orizontal',desc:'Lângă existente'},
        {id:'extindere_v',ico:'🏗',label:'Ext. Vertical',desc:'Deasupra existentelor'},
        {id:'inglobare',ico:'🏙',label:'Inglobare',desc:'Înglobează existentele'},
      ].map(s=>`
        <button onclick="AEDIS.scenariu='${s.id}';AEDIS._scenariuOverride=true;if(typeof setScenariu==='function')setScenariu(AEDIS.scenariu==='demolare'?'liber':AEDIS.scenariu);aedisRender();if((S.vol.genDone||window.AEDIS3D?.active)&&typeof aedisGenerateAll==='function')setTimeout(()=>aedisGenerateAll(),0)" class="aedis-scen-btn${AEDIS.scenariu===s.id?' active':''}">
          ${s.ico} ${s.label}<br><small>${s.desc}</small>
        </button>`).join('')}
    </div>
    ${existent.n>0?`
    <div class="aedis-existent-box">
      <div style="font-size:11px;font-weight:700;color:#f59e0b;margin-bottom:6px">📊 Situație existentă pe teren</div>
      <div class="aedis-g3">
        <div class="aedis-metric"><div class="aedis-ml">POT existent</div><div class="aedis-mv warn">${existent.pot}%</div></div>
        <div class="aedis-metric"><div class="aedis-ml">H max existent</div><div class="aedis-mv warn">${existent.h}m</div></div>
        <div class="aedis-metric"><div class="aedis-ml">SC existent</div><div class="aedis-mv">${existent.sc} m²</div></div>
      </div>
      <div style="font-size:10px;color:#64748b;margin-top:4px">Sursă: OpenStreetMap · poate fi incomplet</div>
    </div>`:'<div class="aedis-ok" style="margin-top:8px">✅ Teren liber — fără construcții existente detectate</div>'}

    <div class="aedis-section">Forma planimetrică</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:8px">
      ${[
        {id:'auto',ico:'🏗',label:'Auto',desc:'Urmărește edificabilul'},
        {id:'dreptunghi',ico:'▬',label:'Dreptunghi',desc:'Corp simplu'},
        {id:'patrat',ico:'■',label:'Pătrat',desc:'Corp pătrat'},
        {id:'bara',ico:'━',label:'Bară',desc:'Corp lung îngust'},
        {id:'L',ico:'⌐',label:'Corp L',desc:'Formă L'},
        {id:'U',ico:'⊓',label:'Corp U',desc:'Formă U/potcoavă'},
        {id:'T',ico:'⊤',label:'Corp T',desc:'Formă T'},
        {id:'curte',ico:'⬜',label:'Curte int.',desc:'Curte interioară'},
      ].map(f=>`
        <button onclick="AEDIS.forma='${f.id}';AEDIS._formaOverride=true;aedisRender();if((S.vol.genDone||window.AEDIS3D?.active)&&typeof aedisGenerateAll==='function')setTimeout(()=>aedisGenerateAll(),0)"
          title="${f.desc}"
          style="padding:8px 4px;border-radius:9px;border:2px solid ${AEDIS.forma===f.id?'#d4af37':'rgba(255,255,255,.15)'};background:${AEDIS.forma===f.id?'rgba(212,175,55,.15)':'rgba(11,18,32,.8)'};color:${AEDIS.forma===f.id?'#d4af37':'#94a3b8'};cursor:pointer;font-size:18px;text-align:center;line-height:1.2;transition:all .15s">
          <div style="font-size:18px">${f.ico}</div>
          <div style="font-size:9px;margin-top:2px;font-weight:700">${f.label}</div>
        </button>`).join('')}
    </div>
    ${(AEDIS.forma==='L'||AEDIS.forma==='U'||AEDIS.forma==='T'||AEDIS.forma==='curte')?`
    <div class="aedis-row" style="margin-bottom:10px">
      <span class="aedis-lbl">Grosime brațe</span>
      <input type="range" min="20" max="50" step="5" value="${Math.round((AEDIS.formaRatio||0.35)*100)}"
        oninput="AEDIS.formaRatio=+this.value/100;document.getElementById('aedis-ratio-val').textContent=this.value+'%';if(S.vol.genDone||AEDIS3D.active)aedisGenerateAll()"
        style="flex:1;accent-color:#d4af37">
      <span class="aedis-val" id="aedis-ratio-val">${Math.round((AEDIS.formaRatio||0.35)*100)}%</span>
    </div>`:''}

    <div class="aedis-section">Regim de înălțime</div>
    <div class="aedis-g2">
      <div>
        <div class="aedis-lbl">Nr. niveluri</div>
        <div style="display:flex;gap:4px;margin-top:4px">
          ${[1,2,3,4,5,6,7,8,10,12].map(n=>`
            <button onclick="AEDIS.corpuri[0].niv=${n};AEDIS._nivOverride=true;aedisRender();if((S.vol.genDone||window.AEDIS3D?.active)&&typeof aedisGenerateAll==='function')setTimeout(()=>aedisGenerateAll(),0)" 
              style="padding:5px 7px;border-radius:6px;border:1px solid ${niv===n?'#d4af37':'rgba(255,255,255,.2)'};background:${niv===n?'rgba(212,175,55,.2)':'transparent'};color:${niv===n?'#d4af37':'#94a3b8'};cursor:pointer;font-size:11px;font-weight:700">${n}</button>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="aedis-row" style="margin-top:10px">
      <span class="aedis-lbl">H/nivel (m)</span>
      <input type="range" min="2.6" max="5.5" step="0.1" value="${hNiv}"
        oninput="AEDIS.corpuri[0].hNiv=+this.value;AEDIS._hNivOverride=true;aedisRender()"
        style="flex:1;accent-color:#d4af37">
      <span class="aedis-val">${hNiv.toFixed(1)}m</span>
    </div>
    <div class="aedis-summary-box">
      <span>H total: <b style="color:#d4af37">${hTot.toFixed(1)}m</b></span>
      <span>SC max: <b style="color:#3b82f6">${ap?.area?Math.round(ap.area*(pN(params.pot)||35)/100)+' m²':'—'}</b></span>
      <span>SD max: <b style="color:#34d399">${ap?.area&&params.cut?Math.round(ap.area*(pN(params.cut)||1.2))+' mp.ADC':'—'}</b></span>
    </div>

    <div class="aedis-section">Retrageri fine per etaj</div>
    <label class="aedis-toggle">
      <input type="checkbox" ${AEDIS.activeRetragere?'checked':''} onchange="AEDIS.activeRetragere=this.checked;aedisRender()">
      <span class="aedis-toggle-label">Activează retrageri individuale per etaj</span>
    </label>
    ${AEDIS.activeRetragere?`
    <div style="margin-top:8px">
      ${Array.from({length:Math.min(niv,8)},(_,i)=>`
        <div class="aedis-row" style="margin-bottom:4px">
          <span class="aedis-lbl" style="min-width:55px">${i===0?'P':('Et.'+i)}</span>
          <input type="range" min="50" max="100" step="5" value="${Math.round((AEDIS.retrageriFineEtaje[i]??1.0)*100)}"
            oninput="AEDIS.retrageriFineEtaje[${i}]=+this.value/100;aedisRender()"
            style="flex:1;accent-color:#60a5fa">
          <span class="aedis-val">${Math.round((AEDIS.retrageriFineEtaje[i]??1.0)*100)}%</span>
        </div>`).join('')}
    </div>`:''}`;
  }

  // ════════════════════════════════════════════════════════════════════
  else if(AEDIS.tab==='acoperis'){
    contentHtml=`
    <div class="aedis-section">Tip acoperiș</div>
    <div class="aedis-acop-grid">
      ${[
        {id:'terasa_plata',ico:'▬',label:'Terasă plată',desc:'Acoperiș plat cu parapet'},
        {id:'terasa_circulabila',ico:'🏖',label:'Terasă circulabilă',desc:'Terasă accesibilă cu borduri'},
        {id:'sarpanta',ico:'🏠',label:'Șarpantă',desc:'Acoperiș în două ape'},
        {id:'mansarda',ico:'🏡',label:'Mansardă',desc:'Etaj înscris în șarpantă'},
        {id:'combinat',ico:'🏢',label:'Combinat',desc:'Terasă + corp tehnic'},
      ].map(a=>`
        <button onclick="AEDIS.tipAcoperis='${a.id}';AEDIS._acoperisOverride=true;aedisRender()" class="aedis-acop-btn${AEDIS.tipAcoperis===a.id?' active':''}">
          <span style="font-size:20px">${a.ico}</span>
          <strong>${a.label}</strong>
          <small>${a.desc}</small>
        </button>`).join('')}
    </div>

    ${AEDIS.tipAcoperis==='sarpanta'||AEDIS.tipAcoperis==='mansarda'?`
    <div class="aedis-section">Parametri șarpantă</div>
    <div class="aedis-row">
      <span class="aedis-lbl">H coamă (m)</span>
      <input type="range" min="1.5" max="6" step="0.5" value="${AEDIS.hSarpanta}"
        oninput="AEDIS.hSarpanta=+this.value;this.nextElementSibling.textContent=this.value+'m'"
        style="flex:1;accent-color:#c4956a"><span class="aedis-val">${AEDIS.hSarpanta}m</span>
    </div>
    ${AEDIS.tipAcoperis==='mansarda'?`
    <div class="aedis-row" style="margin-top:8px">
      <span class="aedis-lbl">H util mansardă (m)</span>
      <input type="range" min="2.2" max="3.5" step="0.1" value="${AEDIS.hMansarda}"
        oninput="AEDIS.hMansarda=+this.value;this.nextElementSibling.textContent=this.value+'m'"
        style="flex:1;accent-color:#c4956a"><span class="aedis-val">${AEDIS.hMansarda}m</span>
    </div>`:''}
    `:''}
    ${AEDIS.tipAcoperis==='terasa_plata'||AEDIS.tipAcoperis==='terasa_circulabila'||AEDIS.tipAcoperis==='combinat'?`
    <div class="aedis-section">Parapet / Atic</div>
    <div class="aedis-row">
      <span class="aedis-lbl">H parapet (m)</span>
      <input type="range" min="0.5" max="2.5" step="0.1" value="${AEDIS.hAttic||1.2}"
        oninput="AEDIS.hAttic=+this.value;this.nextElementSibling.textContent=this.value+'m';aedisRender()"
        style="flex:1;accent-color:#34d399"><span class="aedis-val">${AEDIS.hAttic||1.2}m</span>
    </div>`:''}

    <div class="aedis-section">🏙 Penthouse</div>
    <label class="aedis-toggle">
      <input type="checkbox" ${AEDIS.penthouseActiv?'checked':''} onchange="AEDIS.penthouseActiv=this.checked;aedisRender()">
      <span class="aedis-toggle-label">Adaugă penthouse deasupra ultimului etaj</span>
    </label>
    ${AEDIS.penthouseActiv?`
    <div style="margin-top:10px;display:flex;flex-direction:column;gap:8px">
      <div class="aedis-row">
        <span class="aedis-lbl">Retragere față de atic (m)</span>
        <input type="range" min="1" max="8" step="0.5" value="${AEDIS.penthouseRetragere||2.5}"
          oninput="AEDIS.penthouseRetragere=+this.value;this.nextElementSibling.textContent=this.value+'m';aedisRender()"
          style="flex:1;accent-color:#d4af37"><span class="aedis-val">${AEDIS.penthouseRetragere||2.5}m</span>
      </div>
      <div class="aedis-row">
        <span class="aedis-lbl">Înălțime penthouse (m)</span>
        <input type="range" min="2.4" max="5" step="0.2" value="${AEDIS.penthouseH||3.2}"
          oninput="AEDIS.penthouseH=+this.value;this.nextElementSibling.textContent=this.value+'m';aedisRender()"
          style="flex:1;accent-color:#d4af37"><span class="aedis-val">${AEDIS.penthouseH||3.2}m</span>
      </div>
      <div class="aedis-row">
        <span class="aedis-lbl">Suprafață penthouse (%)</span>
        <input type="range" min="25" max="85" step="5" value="${Math.round((AEDIS.penthouseSuprafataFactor||0.5)*100)}"
          oninput="AEDIS.penthouseSuprafataFactor=+this.value/100;this.nextElementSibling.textContent=this.value+'%';aedisRender()"
          style="flex:1;accent-color:#d4af37"><span class="aedis-val">${Math.round((AEDIS.penthouseSuprafataFactor||0.5)*100)}%</span>
      </div>
      <div style="font-size:10px;color:#64748b;padding:6px 8px;background:rgba(212,175,55,.05);border-radius:6px;border:1px solid rgba(212,175,55,.15)">
        💡 Suprafața terasei = ${Math.round((1-(AEDIS.penthouseSuprafataFactor||0.5))*100)}% din ultimul etaj (zona liberă în jurul penthouse-ului)
      </div>
    </div>`:''}

    <div class="aedis-section">↔ Retragere atic per latură</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px">
      ${['front','spate','stanga','dreapta'].map(side=>{
        const labels={front:'↑ Față (stradă)',spate:'↓ Spate',stanga:'← Stânga',dreapta:'→ Dreapta'};
        const val=(AEDIS.aticRetragere||{})[side]||0;
        return `<div style="background:rgba(0,0,0,.2);border-radius:8px;padding:8px">
          <div style="font-size:10px;color:#94a3b8;margin-bottom:4px">${labels[side]}</div>
          <input type="range" min="0" max="5" step="0.5" value="${val}"
            oninput="if(!AEDIS.aticRetragere)AEDIS.aticRetragere={};AEDIS.aticRetragere['${side}']=+this.value;this.nextElementSibling.textContent=this.value+'m';aedisRender()"
            style="width:100%;accent-color:#38bdf8">
          <div style="font-size:11px;color:#38bdf8;font-weight:700;margin-top:2px">${val}m</div>
        </div>`;
      }).join('')}
    </div>`;
  }

  // ════════════════════════════════════════════════════════════════════
  else if(AEDIS.tab==='context'){
    const ctxN=S.ctx?.features?.length||0;
    const fnCnt={};
    (S.ctx?.features||[]).forEach(f=>{const fn=f.properties?.fn||'yes';fnCnt[fn]=(fnCnt[fn]||0)+1;});
    const hArr=(S.ctx?.features||[]).map(f=>f.properties?.h||0);
    const hMed=hArr.length?Math.round(hArr.reduce((s,h)=>s+h,0)/hArr.length):0;
    const hMax=hArr.length?Math.round(Math.max(...hArr)):0;

    contentHtml=`
    <div class="aedis-section">Context urban existent</div>
    ${ctxN>0?`
    <div class="aedis-g3" style="margin-bottom:10px">
      <div class="aedis-metric"><div class="aedis-ml">Clădiri context</div><div class="aedis-mv">${ctxN}</div></div>
      <div class="aedis-metric"><div class="aedis-ml">H medie</div><div class="aedis-mv">${hMed}m</div></div>
      <div class="aedis-metric"><div class="aedis-ml">H maximă</div><div class="aedis-mv warn">${hMax}m</div></div>
    </div>
    <div class="aedis-fn-legend">
      ${Object.entries(fnCnt).sort((a,b)=>b[1]-a[1]).map(([fn,n])=>`
        <div class="aedis-fn-row">
          <span class="aedis-fn-sq" style="background:${BLD_COL[fn]||'#8a9ab0'}"></span>
          ${BLD_LABELS?.[fn]||fn} (${n})
        </div>`).join('')}
    </div>
    <div class="aedis-section" style="margin-top:10px">Raporturi față de context</div>
    <div class="aedis-context-compare">
      <div class="aedis-cc-row">
        <span>H propusă</span>
        <div class="aedis-cc-bar-wrap">
          <div class="aedis-cc-bar" style="width:${Math.min(100,hTot/Math.max(1,hMax)*100)}%;background:${hTot>hMax*1.3?'#ef4444':hTot>hMax?'#f59e0b':'#34d399'}"></div>
        </div>
        <span style="color:${hTot>hMax*1.3?'#ef4444':hTot>hMax?'#f59e0b':'#34d399'};font-weight:700">${hTot.toFixed(1)}m</span>
      </div>
      <div class="aedis-cc-row">
        <span>H max context</span>
        <div class="aedis-cc-bar-wrap"><div class="aedis-cc-bar" style="width:100%;background:#60a5fa"></div></div>
        <span style="color:#60a5fa;font-weight:700">${hMax}m</span>
      </div>
      <div class="aedis-cc-row">
        <span>H medie context</span>
        <div class="aedis-cc-bar-wrap"><div class="aedis-cc-bar" style="width:${Math.min(100,hMed/Math.max(1,hMax)*100)}%;background:#94a3b8"></div></div>
        <span style="color:#94a3b8;font-weight:700">${hMed}m</span>
      </div>
    </div>
    ${hTot>hMax*1.5?'<div class="aedis-warn">⚠️ H propusă depășește semnificativ contextul — impact peisagistic major</div>':
      hTot>hMax*1.2?'<div class="aedis-warn" style="border-color:#f59e0b;color:#f59e0b">⚠️ H propusă depășește moderat contextul</div>':
      '<div class="aedis-ok">✅ H propusă compatibilă cu contextul urban</div>'}`
    :'<div class="aedis-warn">⚠️ Context OSM neîncărcat.<br>Selectați o parcelă și generați contextul mai întâi.</div>'}`;
  }

  // ════════════════════════════════════════════════════════════════════
  else if(AEDIS.tab==='analiza'){
    const r=S.rule||REGULI[ap?.utr||'']||{};
    const niv=AEDIS.corpuri[0]?.niv||4;
    const hNiv2=AEDIS.corpuri[0]?.hNiv||3.0;
    const SC_propus=ap?.area?(ap.area*(pN(params.pot)||35)/100):0;
    const SD_propus=ap?.area&&params.cut?(ap.area*pN(params.cut)):0;
    const hTot2=hParter+(niv-1)*hNiv2;

    contentHtml=`
    <div class="aedis-section">Sinteză urbanistică propunere</div>
    <table class="aedis-tbl">
      <tr><th>Indicator</th><th>PUG</th><th>Propus</th><th>Status</th></tr>
      <tr>
        <td>POT (%)</td>
        <td>${r.pot!=null?r.pot+'%':'—'}</td>
        <td>${pN(params.pot)||'—'}%</td>
        <td>${r.pot&&pN(params.pot)>r.pot?'⚠️':'✅'}</td>
      </tr>
      <tr>
        <td>CUT (mp.ADC/mp)</td>
        <td>${r.cut!=null?r.cut:'—'}</td>
        <td>${pN(params.cut)||'—'}</td>
        <td>${r.cut&&pN(params.cut)>r.cut?'⚠️':'✅'}</td>
      </tr>
      <tr>
        <td>H total (m)</td>
        <td>${r.h!=null?r.h+'m':'—'}</td>
        <td>${hTot2.toFixed(1)}m</td>
        <td>${r.h&&hTot2>r.h?'⚠️':'✅'}</td>
      </tr>
      <tr>
        <td>Nr. niveluri</td>
        <td>${r.niv!=null?r.niv+' et.':'—'}</td>
        <td>${niv} et.</td>
        <td>${r.niv&&niv>r.niv?'⚠️':'✅'}</td>
      </tr>
      <tr>
        <td>SV (%)</td>
        <td>${r.sv!=null?r.sv+'%':'—'}</td>
        <td>${pN(params.sv)||'0'}%</td>
        <td>${r.sv&&pN(params.sv)<r.sv?'⚠️':'✅'}</td>
      </tr>
    </table>

    <div class="aedis-section" style="margin-top:10px">🏗 Elemente de fațadă</div>
    <div style="background:#080f1c;border-radius:10px;padding:12px;border:1px solid rgba(255,255,255,.08);margin-bottom:10px">
      <!-- BALCOANE -->
      <label class="aedis-toggle" style="margin-bottom:8px">
        <input type="checkbox" ${AEDIS.balcoane?'checked':''} onchange="AEDIS.balcoane=this.checked;aedisRender();if(S.vol.genDone||AEDIS3D.active)aedisGenerateAll()">
        <span class="aedis-toggle-label" style="font-weight:700;color:#e2e8f0">🏠 Balcoane</span>
      </label>
      ${AEDIS.balcoane?`
      <div class="aedis-row" style="margin-bottom:6px">
        <span class="aedis-lbl">Adâncime (m)</span>
        <input type="range" min="0.8" max="2.5" step="0.1" value="${AEDIS.balconAdancime||1.5}"
          oninput="AEDIS.balconAdancime=+this.value;document.getElementById('balc-adanc').textContent=this.value+'m';if(S.vol.genDone||AEDIS3D.active)aedisGenerateAll()"
          style="flex:1;accent-color:#3b82f6">
        <span class="aedis-val" id="balc-adanc">${(AEDIS.balconAdancime||1.5).toFixed(1)}m</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:10px;color:#94a3b8">Amplasare balcoane pe laturi:</span>
        <span style="font-size:10px;font-weight:700;color:#60a5fa">${(AEDIS.balconLaturi||[]).length} / 4 laturi</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin-bottom:8px">
        ${['N','E','S','V'].map(l=>`
          <button onclick="_aedisToggleBalcon('${l}');if((S.vol.genDone||window.AEDIS3D?.active)&&typeof aedisGenerateAll==='function')setTimeout(()=>aedisGenerateAll(),0)"
            style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:7px 2px;border-radius:7px;border:1px solid ${(AEDIS.balconLaturi||[]).includes('${l}')?'#3b82f6':'rgba(255,255,255,.12)'};background:${(AEDIS.balconLaturi||[]).includes('${l}')?'rgba(59,130,246,.25)':'rgba(11,18,32,.6)'};color:${(AEDIS.balconLaturi||[]).includes('${l}')?'#93c5fd':'#475569'};cursor:pointer;font-size:11px;font-weight:800;transition:all .15s">
            ${l}
          </button>`).join('')}
        <button onclick="_aedisToggleAllBalcon();if((S.vol.genDone||window.AEDIS3D?.active)&&typeof aedisGenerateAll==='function')setTimeout(()=>aedisGenerateAll(),0)"
          style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:7px 2px;border-radius:7px;border:1px solid ${(AEDIS.balconLaturi||[]).length===4?'#22c55e':'rgba(255,255,255,.12)'};background:${(AEDIS.balconLaturi||[]).length===4?'rgba(34,197,94,.2)':'rgba(11,18,32,.6)'};color:${(AEDIS.balconLaturi||[]).length===4?'#86efac':'#475569'};cursor:pointer;font-size:9px;font-weight:800">
          Toate
        </button>
      </div>
      <div style="font-size:9px;color:#475569;margin-bottom:4px">Selectați 1, 2, 3 sau toate laturile · depinde de forma și vecinătăți</div>
      `:''}

      <!-- SEPARATOR -->
      <div style="border-top:1px solid rgba(255,255,255,.06);margin:8px 0"></div>

      <!-- PERETE CORTINA -->
      <label class="aedis-toggle" style="margin-bottom:8px">
        <input type="checkbox" ${AEDIS.peretelCortina?'checked':''} onchange="AEDIS.peretelCortina=this.checked;aedisRender();if(typeof _v3dIsOpen==='function'&&_v3dIsOpen()&&typeof _v3dRebuildFast==='function')_v3dRebuildFast();if(S.vol.genDone||AEDIS3D.active)aedisGenerateAll()">
        <span class="aedis-toggle-label" style="font-weight:700;color:#e2e8f0">🪟 Perete cortină (curtain wall)</span>
      </label>
      ${AEDIS.peretelCortina?`
      <div class="aedis-row" style="margin-bottom:4px">
        <span class="aedis-lbl">Acoperire fațadă</span>
        <input type="range" min="30" max="100" step="5" value="${AEDIS.cortinaProcent||60}"
          oninput="AEDIS.cortinaProcent=+this.value;document.getElementById('cortina-pct').textContent=this.value+'%';if(typeof _v3dIsOpen==='function'&&_v3dIsOpen()&&typeof _v3dRebuildFast==='function')_v3dRebuildFast();if(S.vol.genDone||AEDIS3D.active)aedisGenerateAll()"
          style="flex:1;accent-color:#38bdf8">
        <span class="aedis-val" id="cortina-pct">${AEDIS.cortinaProcent||60}%</span>
      </div>
      <div style="font-size:10px;color:#64748b;line-height:1.4">Perete cortină = fațadă din sticlă/aluminiu pe toată înălțimea. Afectează stilul arhitectural și randarea AI.</div>`:''}
    </div>

    <div class="aedis-section" style="margin-top:10px">🎨 AI Render fotorealist</div>
    <div style="padding:10px;background:#080f1c;border-radius:8px;border:1px solid rgba(212,175,55,.2);margin-bottom:10px">
      <div style="font-size:11px;color:#94a3b8;margin-bottom:8px">
        Randare fotorealistă bazată pe stilul, funcțiunea și parametrii selectați.
        ${FAL_AI.lastRender ? '<span style="color:#4ade80">✅ Randare disponibilă</span>' : '<span style="color:#64748b">Nicio randare generată</span>'}
      </div>
      <!-- Toggle model calitate -->
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <label style="font-size:10px;color:#64748b">Model:</label>
        <button onclick="FAL_AI.useDevModel=false;aedisRender()" style="padding:4px 10px;border-radius:6px;font-size:10px;cursor:pointer;border:1px solid ${!FAL_AI.useDevModel?'#d4af37':'rgba(255,255,255,.15)'};background:${!FAL_AI.useDevModel?'rgba(212,175,55,.15)':'transparent'};color:${!FAL_AI.useDevModel?'#d4af37':'#64748b'}">⚡ Schnell<br><span style="font-size:9px">rapid (~5s)</span></button>
        <button onclick="FAL_AI.useDevModel=true;aedisRender()" style="padding:4px 10px;border-radius:6px;font-size:10px;cursor:pointer;border:1px solid ${FAL_AI.useDevModel?'#4ade80':'rgba(255,255,255,.15)'};background:${FAL_AI.useDevModel?'rgba(74,222,128,.12)':'transparent'};color:${FAL_AI.useDevModel?'#4ade80':'#64748b'}">✨ Dev<br><span style="font-size:9px">calitate max (~30s)</span></button>
        <span style="font-size:9px;color:#475569;margin-left:4px">${FAL_AI.useDevModel?'~$0.025/randare':'~$0.003/randare'}</span>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button onclick="aedisAIRender()" style="padding:9px 16px;border-radius:8px;border:1px solid rgba(212,175,55,.4);background:rgba(212,175,55,.1);color:#d4af37;cursor:pointer;font-size:12px;font-weight:700">🎨 Generează AI Render</button>
        ${FAL_AI.lastRender ? '<button onclick="aedisShowRender(FAL_AI.lastRender.url)" style="padding:9px 16px;border-radius:8px;border:1px solid rgba(74,222,128,.3);background:rgba(74,222,128,.1);color:#4ade80;cursor:pointer;font-size:12px">👁 Vezi Randarea</button>' : ''}
        <button onclick="aedisSetFalKey()" style="padding:9px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:transparent;color:#64748b;cursor:pointer;font-size:11px">⚙ API Key</button>
        <button onclick="ss('📋 Prompt: '+aedisPromptBuild().slice(0,200)+'...')" style="padding:9px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:transparent;color:#475569;cursor:pointer;font-size:11px" title="Preview prompt">👁 Prompt</button>
      </div>
      <div style="font-size:10px;color:#334155;margin-top:6px;line-height:1.5">
        Prompt auto-generat din: stil ${AEDIS.stil||'modern'} · ${AEDIS.corpuri[0]?.niv||4} niv · ${AEDIS.tipAcoperis||'terasa'} · iluminare ${document.getElementById('v3d-light')?.value||'zi'} · context ${(S.parcels[S.activeParcel??0]?.uat)||'Iași'}
      </div>
    </div>
    <div class="aedis-section" style="margin-top:10px">Suprafețe calculate</div>
    <div class="aedis-g2">
      <div class="aedis-metric"><div class="aedis-ml">Teren total</div><div class="aedis-mv">${ap?.area?Math.round(ap.area)+' m²':'—'}</div></div>
      <div class="aedis-metric"><div class="aedis-ml">SC propusă</div><div class="aedis-mv blue">${Math.round(SC_propus)} m²</div></div>
      <div class="aedis-metric"><div class="aedis-ml">SD propusă</div><div class="aedis-mv">${Math.round(SD_propus)} mp.ADC</div></div>
      <div class="aedis-metric"><div class="aedis-ml">SV obligatorii</div><div class="aedis-mv green">${ap?.area?Math.round(ap.area*(pN(params.sv)||0)/100)+' m²':'—'}</div></div>
    </div>
    ${existent.n>0?`
    <div class="aedis-section" style="margin-top:10px">Bilanț existent + propus</div>
    <div class="aedis-g2">
      <div class="aedis-metric"><div class="aedis-ml">POT existent</div><div class="aedis-mv warn">${existent.pot}%</div></div>
      <div class="aedis-metric"><div class="aedis-ml">POT disponibil</div><div class="aedis-mv">${Math.max(0,(pN(params.pot)||35)-existent.pot)}%</div></div>
    </div>`:''}`;
  }

  return `
  ${headerHtml}
  ${tabsHtml}
  <div class="aedis-content">${contentHtml}</div>
  ${S.vol.multiVol ? `
  <div style="background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.4);border-radius:8px;padding:8px 12px;margin:6px 0;font-size:11px;color:#fbbf24;display:flex;align-items:center;gap:8px">
    <span>🔲</span>
    <span><b>Multiple Volume activ:</b> ${S.vol.multiVolCount||2} clădiri · ${S.vol.multiVolShape||'rect'} · distanță ${S.vol.multiVolDist||6}m — Generează pentru a aplica</span>
  </div>` : ''}
  <div class="aedis-actions">
    <button onclick="aedisGenerateAll()" class="aedis-build-btn">
      ${S.vol.multiVol ? `⚡ Generează ${S.vol.multiVolCount||2} Volume 3D în hartă` : '⚡ Generează Volum 3D în hartă'}
    </button>
    <button onclick="aedisOpen3DViewer()" class="aedis-dim-btn" 
      style="background:rgba(99,102,241,.2);border-color:rgba(139,92,246,.5);color:#a78bfa;font-size:9px;font-weight:700;display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 8px" 
      title="Viewer 3D isometric">🔭<span style="font-size:8px">3D</span></button>
    <button onclick="aedisOpenLoisir()" class="aedis-dim-btn"
      style="background:rgba(34,197,94,.15);border-color:rgba(34,197,94,.4);color:#4ade80;font-size:9px;font-weight:700;display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 8px"
      title="LOISIR — Amenajare spații publice">🌿<span style="font-size:8px">Loisir</span></button>
    <button onclick="aedisAIRender()" class="aedis-dim-btn" style="background:rgba(212,175,55,.15);border-color:rgba(212,175,55,.4);color:#d4af37;font-size:10px" title="AI Render fotorealist (necesită API key Fal.ai)">🎨 AI</button>
    <button onclick="AEDIS.showDim=!AEDIS.showDim;aedisRender();if(typeof _aedisToggleDimLabels==='function')_aedisToggleDimLabels();if(S.vol.genDone&&typeof updateDistanceLines==='function')updateDistanceLines()" 
      class="aedis-dim-btn${AEDIS.showDim?' active':''}" title="Etichete dimensionale (toggle)">📏</button>
    <button onclick="aedisClose()" class="aedis-close-btn">✕</button>
  </div>`;
}


// ═══════════════════════════════════════════════════════════════════════════
// AEDIS 3D — Three.js Custom Layer pentru Mapbox GL JS v3
// Generare volumetrie fotorealistă cu materiale procedurale WebGL
// ═══════════════════════════════════════════════════════════════════════════

// Incarcam Three.js r128 de pe CDN
function aedisLoadThree(cb){
  if(window.THREE){ setTimeout(cb, 0); return; }
  const s=document.createElement('script');
  s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  s.onload=()=>{ 
    // Așteptăm un frame pentru ca Three.js să se inițializeze complet
    requestAnimationFrame(()=>requestAnimationFrame(cb));
  };
  s.onerror=()=>{ 
    _v3dStatus('❌ Three.js nu a putut fi încărcat. Verificați conexiunea.');
    console.error('Three.js load failed'); 
  };
  document.head.appendChild(s);
}

// ── State Three.js layer ───────────────────────────────────────────────────
// AEDIS3D moved to top

// ── GLSL Shadere procedurale ───────────────────────────────────────────────
// AEDIS_SHADERS moved to top

// ═══════════════════════════════════════════════════════════════════════════
// AEDIS 3D BUILDER — construieste mesh Three.js din geometria parcelei
// ═══════════════════════════════════════════════════════════════════════════

function aedis3DBuild(parcelRing, params){
  // parcelRing: array de [lng, lat] - conturul parcelei
  // params: { niv, hParter, hEtaj, stil, fn, tipAcoperis, hSarpanta,
  //           retrageriFineEtaje, parterDiferit, fnParter }
  if(!window.THREE) return null;
  const THREE = window.THREE;

  const p = params;
  const niv = p.niv || 4;
  const hP = p.hParter || 3.0;
  const hE = p.hEtaj || 3.0;
  const stil = AEDIS_STIL[p.stil] || AEDIS_STIL.modern;

  // Convertim coordonate geografice -> locale (metri)
  const cx = parcelRing.reduce((s,c)=>s+c[0],0)/parcelRing.length;
  const cy = parcelRing.reduce((s,c)=>s+c[1],0)/parcelRing.length;
  const mLng = 111320 * Math.cos(cy * Math.PI/180);
  const mLat = 111320;

  const localRing = parcelRing.map(([lng,lat])=>[
    (lng - cx) * mLng,
    (lat - cy) * mLat
  ]);

  const group = new THREE.Group();

  // ── Inner ring pentru forma Curte Interioară ─────────────────────────
  // Calculăm curtea pe baza AEDIS.formaRatio și localRing
  let courtyardRing = null;
  if(p.forma === 'curte' || AEDIS.forma === 'curte'){
    const ratio = Math.max(0.2, Math.min(0.5, AEDIS.formaRatio || 0.35));
    // Inner ring = shrinkRing la (1 - ratio*2) față de centru
    const innerFactor = 1 - ratio * 1.5;
    if(innerFactor > 0.1){
      const icx = localRing.reduce((s,p)=>s+p[0],0)/localRing.length;
      const icz = localRing.reduce((s,p)=>s+p[1],0)/localRing.length;
      courtyardRing = localRing.map(([x,y])=>[icx+(x-icx)*innerFactor, icz+(y-icz)*innerFactor]);
    }
  }

  // ── Materiale per stil ────────────────────────────────────────────────
  function makeShaderMat(shaderKey, colorHex, opacity=1.0){
    const shader = AEDIS_SHADERS[shaderKey] || AEDIS_SHADERS.plaster;
    const col = new THREE.Color(colorHex);
    return new THREE.ShaderMaterial({
      uniforms: {
        baseColor: {value: new THREE.Vector3(col.r, col.g, col.b)},
        time: {value: 0}
      },
      vertexShader: shader.vert,
      fragmentShader: shader.frag,
      transparent: opacity < 1.0,
      opacity,
      side: THREE.DoubleSide
    });
  }

  // Material per stil si zona
  const MAT = {
    modern:        { parter:'concrete', etaj:'glass',   accent:'metal',   acoperis:'metal'  },
    inovator:      { parter:'metal',    etaj:'glass',   accent:'metal',   acoperis:'metal'  },
    clasic:        { parter:'stone',    etaj:'stone',   accent:'plaster', acoperis:'stone'  },
    minimalist:    { parter:'plaster',  etaj:'plaster', accent:'glass',   acoperis:'metal'  },
    industrial:    { parter:'concrete', etaj:'corten',  accent:'metal',   acoperis:'metal'  },
    adaptat_context:{ parter:'plaster', etaj:'plaster', accent:'glass',   acoperis:'plaster'},
  };
  const matDef = MAT[p.stil] || MAT.modern;

  // Culori per stil — vii, contrast ridicat, pentru prezentare arhitecturală
  const COLS = {
    modern:    { parter:'#1e3a5f', etaj:'#c8daf5', accent:'#3b82f6', acoperis:'#1d4ed8',
                 parterAcc:'#60a5fa', etajAlt:'#dbeafe', balcon:'#93c5fd' },
    inovator:  { parter:'#2e1065', etaj:'#a78bfa', accent:'#7c3aed', acoperis:'#4c1d95',
                 parterAcc:'#c4b5fd', etajAlt:'#ede9fe', balcon:'#8b5cf6' },
    clasic:    { parter:'#7c2d12', etaj:'#fef3c7', accent:'#d97706', acoperis:'#92400e',
                 parterAcc:'#fbbf24', etajAlt:'#fffbeb', balcon:'#f59e0b' },
    minimalist:{ parter:'#374151', etaj:'#f9fafb', accent:'#6b7280', acoperis:'#d1d5db',
                 parterAcc:'#e5e7eb', etajAlt:'#ffffff', balcon:'#9ca3af' },
    industrial:{ parter:'#18181b', etaj:'#71717a', accent:'#f97316', acoperis:'#3f3f46',
                 parterAcc:'#fb923c', etajAlt:'#a1a1aa', balcon:'#f97316' },
    adaptat_context:{ parter:'#365314', etaj:'#d9f99d', accent:'#84cc16', acoperis:'#4d7c0f',
                 parterAcc:'#a3e635', etajAlt:'#f7fee7', balcon:'#86efac' },
  };
  const cols = COLS[p.stil] || COLS.modern;

  // ── Helper: construieste peretii unui etaj ─────────────────────────────
  // Folosim BoxGeometry subțire (evită probleme de orientare PlaneGeometry)
  function buildWalls(ring2D, baseH, topH, matKey, colorHex, opacity=1.0){
    const mat = makeShaderMat(matKey, colorHex, opacity);
    const meshGroup = new THREE.Group();
    const wallH = topH - baseH;
    if(wallH <= 0) return meshGroup;
    for(let i=0; i<ring2D.length-1; i++){
      const [x1,z1] = ring2D[i];   // Three.js Y-up: X=est, Z=nord, Y=sus
      const [x2,z2] = ring2D[i+1];
      const len = Math.sqrt((x2-x1)**2+(z2-z1)**2);
      if(len < 0.05) continue;

      // BoxGeometry: width=len, height=wallH, depth=0.08 (grosime perete)
      const geo = new THREE.BoxGeometry(len, wallH, 0.08, Math.ceil(len/2), Math.ceil(wallH), 1);

      const wall = new THREE.Mesh(geo, mat);

      // Centrul peretelui
      wall.position.set(
        (x1+x2)/2,
        baseH + wallH/2,  // Y = înălțime verticală
        (z1+z2)/2
      );

      // Rotim în jurul axei Y (verticale) pentru a alinia peretele cu latura parcelei
      // atan2(z2-z1, x2-x1) = unghiul față de axa X în planul XZ
      wall.rotation.y = -Math.atan2(z2-z1, x2-x1);

      meshGroup.add(wall);
    }
    return meshGroup;
  }

  // ── Helper: construieste planseu (podea/tavan) cu suport gaură ──────────
  // ring2D = [[x,z],...] în spațiu local metri, Y-up
  // holeRing2D (optional) = inner ring pentru curte interioară
  function buildSlab(ring2D, h, colorHex, thick=0.15, holeRing2D=null){
    const shape = new THREE.Shape();
    shape.moveTo(ring2D[0][0], ring2D[0][1]);
    for(let i=1; i<ring2D.length-1; i++) shape.lineTo(ring2D[i][0], ring2D[i][1]);
    shape.closePath();

    // Adăugăm gaura curții dacă există
    if(holeRing2D && holeRing2D.length >= 3){
      const hole = new THREE.Path();
      hole.moveTo(holeRing2D[0][0], holeRing2D[0][1]);
      for(let i=1; i<holeRing2D.length-1; i++) hole.lineTo(holeRing2D[i][0], holeRing2D[i][1]);
      hole.closePath();
      shape.holes.push(hole);
    }

    const geo = new THREE.ExtrudeGeometry(shape, { depth: thick, bevelEnabled: false });
    const col = new THREE.Color(colorHex);
    const mat = new THREE.MeshStandardMaterial({
      color: col, roughness: 0.35, metalness: 0.05, side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = h;
    return mesh;
  }

  // ── Helper: retragere inel ─────────────────────────────────────────────
  function shrinkRing(ring2D, factor){
    const cx2 = ring2D.reduce((s,p)=>s+p[0],0)/ring2D.length;
    const cy2 = ring2D.reduce((s,p)=>s+p[1],0)/ring2D.length;
    return ring2D.map(([x,y])=>[cx2+(x-cx2)*factor, cy2+(y-cy2)*factor]);
  }

  // ════════════════════════════════════════════════════════════════════════
  // GENERARE VOLUMETRIE — diferențiată complet per stil arhitectural
  // ════════════════════════════════════════════════════════════════════════
  let currentH = 0;
  let currentRing = localRing;
  const stilKey = p.stil || 'modern';

  // ── Helper: coloane verticale (mullions) pe fațadă ───────────────────
  function addMullions(ring2D, baseH, topH, colColor, colW=0.15, spacing=3.0){
    const colMat = new THREE.MeshStandardMaterial({color:new THREE.Color(colColor),roughness:0.2,metalness:0.8});
    for(let i=0;i<ring2D.length-1;i++){
      const [x1,z1]=ring2D[i],[x2,z2]=ring2D[i+1];
      const len=Math.sqrt((x2-x1)**2+(z2-z1)**2);
      const nx=(x2-x1)/len, nz=(z2-z1)/len;
      const count=Math.max(1,Math.floor(len/spacing));
      for(let c=0;c<=count;c++){
        const t=c/count;
        const mx=x1+nx*len*t, mz=z1+nz*len*t;
        const geo=new THREE.BoxGeometry(colW,topH-baseH,colW);
        const mesh=new THREE.Mesh(geo,colMat);
        mesh.position.set(mx,baseH+(topH-baseH)/2,mz);
        group.add(mesh);
      }
    }
  }

  // ── Helper: cornișă orizontală (bandă proeminentă) ────────────────────
  function addCornice(ring2D, h, depth=0.5, thick=0.25, color='#c8a882'){
    const cMat=new THREE.MeshStandardMaterial({color:new THREE.Color(color),roughness:0.6,metalness:0.0});
    for(let i=0;i<ring2D.length-1;i++){
      const [x1,z1]=ring2D[i],[x2,z2]=ring2D[i+1];
      const len=Math.sqrt((x2-x1)**2+(z2-z1)**2);
      if(len<0.1) continue;
      const ang=-Math.atan2(z2-z1,x2-x1);
      const geo=new THREE.BoxGeometry(len+depth,thick,depth);
      const mesh=new THREE.Mesh(geo,cMat);
      mesh.position.set((x1+x2)/2,h+thick/2,(z1+z2)/2);
      mesh.rotation.y=ang;
      group.add(mesh);
    }
  }

  // ── Helper: pilastri verticali (clasic) ───────────────────────────────
  function addPilasters(ring2D, baseH, topH, color='#d4b896', w=0.4, d=0.35){
    const pMat=new THREE.MeshStandardMaterial({color:new THREE.Color(color),roughness:0.7,metalness:0.0});
    for(let i=0;i<ring2D.length-1;i++){
      const [x1,z1]=ring2D[i],[x2,z2]=ring2D[i+1];
      const len=Math.sqrt((x2-x1)**2+(z2-z1)**2);
      const nx=(x2-x1)/len, nz=(z2-z1)/len;
      const count=Math.max(1,Math.round(len/4.5));
      for(let c=0;c<=count;c++){
        const t=c/count;
        const mx=x1+nx*len*t, mz=z1+nz*len*t;
        const geo=new THREE.BoxGeometry(w,topH-baseH,d);
        const mesh=new THREE.Mesh(geo,pMat);
        mesh.position.set(mx,baseH+(topH-baseH)/2,mz);
        mesh.rotation.y=-Math.atan2(nz,nx);
        group.add(mesh);
      }
    }
  }

  // ── Helper: bracing X industrial ─────────────────────────────────────
  function addBracing(ring2D, baseH, topH, color='#f97316'){
    const bMat=new THREE.MeshStandardMaterial({color:new THREE.Color(color),roughness:0.3,metalness:0.9});
    for(let i=0;i<ring2D.length-1;i++){
      const [x1,z1]=ring2D[i],[x2,z2]=ring2D[i+1];
      const len=Math.sqrt((x2-x1)**2+(z2-z1)**2);
      if(len<4) continue;
      const ang=-Math.atan2(z2-z1,x2-x1);
      const hh=topH-baseH;
      // Diagonala 1: bottom-left → top-right
      const diag=Math.sqrt(len*len+hh*hh);
      const geo=new THREE.BoxGeometry(diag,0.12,0.12);
      const m1=new THREE.Mesh(geo,bMat);
      m1.position.set((x1+x2)/2,baseH+hh/2,(z1+z2)/2);
      m1.rotation.y=ang;
      m1.rotation.z=Math.atan2(hh,len);
      group.add(m1);
      // Diagonala 2: top-left → bottom-right
      const m2=new THREE.Mesh(geo.clone(),bMat);
      m2.position.set((x1+x2)/2,baseH+hh/2,(z1+z2)/2);
      m2.rotation.y=ang;
      m2.rotation.z=-Math.atan2(hh,len);
      group.add(m2);
    }
  }

  // ── Helper: balcon real (plăcuță proiectată pe fațadă) ────────────────
  function addBalconies(ring2D, h, color='#93c5fd', depth=1.4, thick=0.12){
    const bMat=new THREE.MeshStandardMaterial({color:new THREE.Color(color),roughness:0.3,metalness:0.1,transparent:true,opacity:0.85});
    const railMat=new THREE.MeshStandardMaterial({color:new THREE.Color('#e2e8f0'),roughness:0.1,metalness:0.9});
    for(let i=0;i<ring2D.length-1;i++){
      const [x1,z1]=ring2D[i],[x2,z2]=ring2D[i+1];
      const len=Math.sqrt((x2-x1)**2+(z2-z1)**2);
      if(len<3) continue;
      const ang=-Math.atan2(z2-z1,x2-x1);
      const bW=Math.min(len*0.65,4.5);
      // Placa balcon
      const geo=new THREE.BoxGeometry(bW,thick,depth);
      const mesh=new THREE.Mesh(geo,bMat);
      mesh.position.set((x1+x2)/2,h-thick/2,(z1+z2)/2);
      mesh.rotation.y=ang;
      group.add(mesh);
      // Balustradă parapetă
      const rGeo=new THREE.BoxGeometry(bW,0.9,0.05);
      const rail=new THREE.Mesh(rGeo,railMat);
      // Offsetăm spre exterior cu depth/2
      const perp=[-Math.sin(Math.atan2(z2-z1,x2-x1)),Math.cos(Math.atan2(z2-z1,x2-x1))];
      rail.position.set((x1+x2)/2+perp[0]*depth*0.9,h+0.45,(z1+z2)/2+perp[1]*depth*0.9);
      rail.rotation.y=ang;
      group.add(rail);
    }
  }

  // ════════════════════════════════════════════════════════════════════════
  // LOOP PRINCIPAL ETAJE — cu diferențieri per stil
  // ════════════════════════════════════════════════════════════════════════
  for(let i=0; i<niv; i++){
    const hEtaj = i===0 ? hP : hE;
    const topH = currentH + hEtaj;
    const isLast = i === niv-1;
    const isParter = i===0;

    // Retragere per etaj
    const retFactor = p.retrageriFineEtaje?.[i] ?? (
      isLast && p.activeRetragere ? (stil.retragereFactor||0.88) : 1.0
    );
    if(retFactor < 0.99 && i > 0) currentRing = shrinkRing(localRing, retFactor);

    // ── Culoare per etaj (gradient stil-specific) ────────────────────────
    let colorHex;
    if(isParter){
      colorHex = (p.parterDiferit && AEDIS_FN[p.fnParter]?.color) ? AEDIS_FN[p.fnParter].color : cols.parter;
    } else if(stil.etajColor){
      colorHex = stil.etajColor(cols.etaj, i, niv);
    } else if(stil.floorColors){
      colorHex = stil.floorColors[Math.min(i, stil.floorColors.length-1)];
    } else {
      const t = niv>1 ? i/(niv-1) : 0;
      colorHex = '#'+new THREE.Color(cols.etaj).lerp(new THREE.Color(cols.etajAlt||cols.etaj),t*0.6).getHexString();
    }

    // ── Material per etaj și stil ───────────────────────────────────────
    let matKey;
    if(isParter && p.parterDiferit) matKey='glass';
    else if(isParter) matKey=matDef.parter;
    else if(isLast && retFactor<0.98) matKey=matDef.accent;
    else matKey=matDef.etaj;

    // ── PEREȚI PRINCIPALI ──────────────────────────────────────────────
    group.add(buildWalls(currentRing, currentH, topH, matKey, colorHex));
    // Pereți interiori ai curții (dacă forma = curte)
    if(courtyardRing){
      group.add(buildWalls(courtyardRing, currentH, topH, matKey, colorHex));
    }

    // ════════════════════════════════════════════════════════════════════
    // ELEMENTE SPECIFICE PER STIL
    // ════════════════════════════════════════════════════════════════════

    if(stilKey==='modern'){
      // Coloane mullion verticale metalice la fiecare etaj
      if(!isParter) addMullions(currentRing, currentH, topH, '#1e40af', 0.12, 2.8);
      // Bandă orizontală subțire la fiecare etaj (spandrel panel)
      const spandrelCol='#1d4ed8';
      group.add(buildSlab(currentRing, currentH, spandrelCol, 0.18, courtyardRing));
      // Balcoane din sticlă pe etajele medii
      if(i>0 && i<niv-1 && i%2===0) addBalconies(currentRing, topH, '#bfdbfe', 1.2);

    } else if(stilKey==='inovator'){
      // Volume offset alternante — etajele par sunt retrase, impare proiectate
      const offsetRing = shrinkRing(currentRing, i%2===0 ? 0.95 : 1.02);
      group.add(buildWalls(offsetRing, currentH, topH, matKey, colorHex));
      // Bandă de accent în culori alternante
      const inoColors=['#7c3aed','#c026d3','#0891b2','#7c3aed'];
      group.add(buildSlab(currentRing, currentH+hEtaj*0.6, inoColors[i%inoColors.length], 0.3));
      // Balcoane mari pe fațadele principale
      if(i>0) addBalconies(currentRing, topH, cols.balcon||'#a78bfa', 1.8);

    } else if(stilKey==='clasic'){
      // Pilastri verticali la fiecare etaj
      addPilasters(currentRing, currentH, topH, i===0?'#6b3a10':'#c8914a', 0.35, 0.3);
      // Cornișă orizontală la fiecare etaj (nu la parter)
      if(!isParter) addCornice(currentRing, topH, 0.45, 0.2, i===niv-1?'#b45309':'#d4a96a');
      // Ferestrele clasice au arc → simulat cu bandă de accent deasupra
      if(!isParter){
        const archBand=buildSlab(currentRing, currentH+hEtaj*0.72, '#fbbf24', 0.08);
        group.add(archBand);
      }

    } else if(stilKey==='minimalist'){
      // Volume pure — fara ornamente, ferestre late
      // Singura diferentiere: linie fină de margine la fiecare etaj
      const lineSlab=buildSlab(currentRing, topH, '#d1d5db', 0.06);
      group.add(lineSlab);
      // Ultimul etaj: retras dramatic + terasa verde
      if(isLast){
        const greenRing=shrinkRing(currentRing, 0.85);
        group.add(buildSlab(greenRing, topH+0.1, '#4ade80', 0.08)); // vegetatie terasa
      }

    } else if(stilKey==='industrial'){
      // Bracing X metalic vizibil la etajele structurale
      if(i>0 && i<niv-1) addBracing(currentRing, currentH, topH, '#f97316');
      // Bandă copertine metalice negre
      group.add(buildSlab(currentRing, topH-0.4, '#18181b', 0.3));
      // Grinzi orizontale aparente
      addCornice(currentRing, topH, 0.3, 0.15, '#ea580c');

    } else if(stilKey==='adaptat_context'){
      // Fațadă cu ritm moderat, cornișă simplă
      if(!isParter) addCornice(currentRing, topH, 0.3, 0.15, '#84cc16');
      if(i>0 && i%2===0) addBalconies(currentRing, topH, '#86efac', 1.0);
    }

    currentH = topH;
  }

  // ════════════════════════════════════════════════════════════════════════
  // SOCLU ȘI TEREN
  // ════════════════════════════════════════════════════════════════════════
  // Soclu specific per stil
  const soclColors={modern:'#0f172a',inovator:'#1e1b4b',clasic:'#2d1608',minimalist:'#27272a',industrial:'#0c0a09',adaptat_context:'#1a2e1a'};
  const soclH={modern:0.6,inovator:0.4,clasic:1.2,minimalist:0.3,industrial:0.8,adaptat_context:0.5};
  const sclH=soclH[stilKey]||0.6;
  // Soclu proeminant per stil
  const soclRing=shrinkRing(localRing,1.02);
  group.add(buildWalls(soclRing,-sclH,0,'concrete',soclColors[stilKey]||'#1a1a1a'));
  group.add(buildSlab(soclRing,-sclH,soclColors[stilKey]||'#1a1a1a',0.2));
  // Teren (shadow catcher)
  const terrainRing=shrinkRing(localRing,1.1);
  group.add(buildSlab(terrainRing,-sclH-0.05,'#131a1a',0.1));
  // Curtea interioară — sol verde/pavaj
  if(courtyardRing){
    // Pavaj curte: slab verde-gri la nivelul solului
    group.add(buildSlab(courtyardRing, 0.02, '#1a2e1a', 0.08));
    // Vegetație simulată: slab verde
    const courtGreen = shrinkRing(courtyardRing, 0.85);
    group.add(buildSlab(courtGreen, 0.1, '#2d5a27', 0.06));
  }

  // ════════════════════════════════════════════════════════════════════════
  // ACOPERIȘ — diferențiat per stil
  // ════════════════════════════════════════════════════════════════════════
  const hAt = p.hAttic || (stilKey==='clasic'?2.5:stilKey==='modern'?1.4:1.0);

  switch(p.tipAcoperis||'terasa_plata'){
    case 'terasa_plata':{
      // Terasa (cu gaura curte dacă e cazul)
      group.add(buildSlab(currentRing, currentH, cols.acoperis, 0.3, courtyardRing));

      if(stilKey==='modern'){
        // Atic clar cu bandă albastră + parapet sticlă
        group.add(buildWalls(currentRing,currentH,currentH+hAt,'glass','#1d4ed8'));
        addMullions(currentRing,currentH,currentH+hAt,'#0f172a',0.10,2.5);
        group.add(buildSlab(currentRing,currentH+hAt,'#0f172a',0.12));

      } else if(stilKey==='inovator'){
        // Parapet cu panouri violete + forma dinamică
        const retRing=shrinkRing(currentRing,0.9);
        group.add(buildWalls(retRing,currentH,currentH+hAt*1.5,'metal','#6d28d9'));
        group.add(buildSlab(retRing,currentH+hAt*1.5,'#4c1d95',0.2));

      } else if(stilKey==='clasic'){
        // Cornișă principală + balustradă + atic ornamental
        addCornice(currentRing,currentH,0.7,0.35,'#b45309');
        group.add(buildWalls(currentRing,currentH+0.35,currentH+0.35+hAt,'plaster','#e8cfa0'));
        addPilasters(currentRing,currentH+0.35,currentH+0.35+hAt,'#d4a96a',0.3,0.25);
        addCornice(currentRing,currentH+0.35+hAt,0.5,0.2,'#b45309');
        group.add(buildSlab(currentRing,currentH+0.35+hAt+0.2,'#92400e',0.1));

      } else if(stilKey==='minimalist'){
        // Parapet subțire alb + vegetație
        group.add(buildWalls(currentRing,currentH,currentH+0.9,'plaster','#f9fafb'));
        // Panou solar simulat
        const solRing=shrinkRing(currentRing,0.75);
        group.add(buildSlab(solRing,currentH+0.15,'#1e3a5f',0.08));

      } else if(stilKey==='industrial'){
        // Parapet metalic cu structura aparentă
        group.add(buildWalls(currentRing,currentH,currentH+hAt,'metal','#57534e'));
        addBracing(currentRing,currentH,currentH+hAt,'#f97316');
        group.add(buildSlab(currentRing,currentH+hAt,'#1c1917',0.2));
        // Coș industrial
        try{
          const cosRing=shrinkRing(currentRing,0.08);
          group.add(buildWalls(cosRing,currentH+hAt,currentH+hAt+3.5,'concrete','#292524'));
          group.add(buildSlab(cosRing,currentH+hAt+3.5,'#44403c',0.3));
        }catch(e){}

      } else {
        // Adaptat context + alte stiluri
        if(hAt>0){
          group.add(buildWalls(currentRing,currentH,currentH+hAt,matDef.acoperis,cols.accent||cols.acoperis));
          addCornice(currentRing,currentH+hAt,0.3,0.12,cols.parterAcc||cols.accent);
          group.add(buildSlab(currentRing,currentH+hAt+0.12,cols.acoperis,0.08));
        }
      }

      // Corp tehnic HVAC (toate stilurile)
      try{
        const techFactor=stilKey==='industrial'?0.35:stilKey==='clasic'?0.18:0.22;
        const techRing=shrinkRing(currentRing,techFactor);
        const techH=stilKey==='industrial'?0:hAt;
        const techColor=stilKey==='modern'?'#1e293b':stilKey==='clasic'?'#6b3a10':'#374151';
        group.add(buildWalls(techRing,currentH+techH,currentH+techH+2.5,'concrete',techColor));
        group.add(buildSlab(techRing,currentH+techH+2.5,'#1e293b',0.15));
      }catch(e){}
      break;
    }

    case 'sarpanta':{
      const hCoama=p.hSarpanta||3.5;
      const roofColor=stilKey==='clasic'?'#7c3512':stilKey==='adaptat_context'?'#4d7c0f':'#854d0e';
      const roofColor2=stilKey==='clasic'?'#a0522d':'#92400e';
      let roofRing=currentRing;
      for(let si=0;si<5;si++){
        const f=1-si*0.22; const prevRing=roofRing;
        roofRing=shrinkRing(localRing,Math.max(0.04,f));
        const sh=currentH+si*(hCoama/5);
        const avgRing=prevRing.map((_,idx)=>[(prevRing[idx][0]+roofRing[Math.min(idx,roofRing.length-1)][0])/2,
          (prevRing[idx][1]+roofRing[Math.min(idx,roofRing.length-1)][1])/2]);
        group.add(buildWalls(avgRing,sh,sh+hCoama/5,'plaster',si%2===0?roofColor:roofColor2));
        group.add(buildSlab(roofRing,sh+hCoama/5,roofColor2,0.15));
      }
      if(stilKey==='clasic') addCornice(currentRing,currentH,0.5,0.25,'#b45309');
      break;
    }

    case 'mansarda':{
      const mansF=stilKey==='clasic'?0.78:0.72;
      const mansRing=shrinkRing(localRing,mansF);
      const mansColor=stilKey==='clasic'?'#8b4513':cols.etaj;
      group.add(buildWalls(mansRing,currentH,currentH+(p.hMansarda||2.8),matDef.etaj,mansColor));
      if(stilKey==='clasic'){
        addPilasters(mansRing,currentH,currentH+(p.hMansarda||2.8),'#c8914a',0.25,0.2);
        addCornice(mansRing,currentH+(p.hMansarda||2.8),0.4,0.2,'#b45309');
      }
      group.add(buildSlab(mansRing,currentH+(p.hMansarda||2.8),cols.acoperis,0.2));
      break;
    }
  }

  return { group, cx, cy, mLng, mLat };
}

// ═══════════════════════════════════════════════════════════════════════════
// MAPBOX CUSTOM LAYER — integreaza Three.js in Mapbox
// ═══════════════════════════════════════════════════════════════════════════

function aedis3DCreateLayer(parcelRing, params){
  const THREE = window.THREE;

  let renderer, scene, camera, threeGroup;
  let cx, cy, mLng, mLat;

  const layer = {
    id: 'aedis-3d-layer',
    type: 'custom',
    renderingMode: '3d',

    onAdd(map, gl){
      renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true
      });
      renderer.autoClear = false;
      renderer.shadowMap.enabled = false;
      renderer.outputEncoding = THREE.sRGBEncoding;

      scene = new THREE.Scene();
      camera = new THREE.Camera();

      // ── Iluminare cinematografică cu 4 surse + ton mapping ──────────────
      // Renderer settings pentru calitate maximă
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Ambient sky — albastru atmosferic cald
      const ambLight = new THREE.HemisphereLight(0xc8deff, 0x8b6914, 0.7);
      scene.add(ambLight);

      // Soare principal — auriu-alb, unghi de după-amiază
      const sunLight = new THREE.DirectionalLight(0xfff2cc, 2.8);
      sunLight.position.set(3.0, 5.0, 2.0);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 2048;
      sunLight.shadow.mapSize.height = 2048;
      sunLight.shadow.camera.far = 500;
      sunLight.shadow.camera.near = 0.1;
      sunLight.shadow.camera.left = -80;
      sunLight.shadow.camera.right = 80;
      sunLight.shadow.camera.top = 80;
      sunLight.shadow.camera.bottom = -80;
      sunLight.shadow.bias = -0.002;
      scene.add(sunLight);

      // Fill light — cer opus soarelui, albastru rece
      const fillLight = new THREE.DirectionalLight(0x6ab0ff, 0.9);
      fillLight.position.set(-2.0, 2.0, -1.5);
      scene.add(fillLight);

      // Back light / rim — contur dramatic din spate
      const rimLight = new THREE.DirectionalLight(0xffd6a0, 0.6);
      rimLight.position.set(-0.5, 1.5, -3.0);
      scene.add(rimLight);

      // Ground bounce — lumina reflectata de sol (warm)
      const groundLight = new THREE.DirectionalLight(0xc4a45a, 0.35);
      groundLight.position.set(0, -1, 0);
      scene.add(groundLight);

      // Construim mesh-ul
      const result = aedis3DBuild(parcelRing, params);
      if(!result){ console.error('Urban3D: build failed'); return; }

      threeGroup = result.group;
      cx=result.cx; cy=result.cy; mLng=result.mLng; mLat=result.mLat;

      scene.add(threeGroup);

      AEDIS3D.renderer = renderer;
      AEDIS3D.scene = scene;
      AEDIS3D.camera = camera;
      AEDIS3D.layer = layer;
    },

    render(gl, matrix){
      const mercCenter = mapboxgl.MercatorCoordinate.fromLngLat({lng:cx, lat:cy}, 0);
      const scale = mercCenter.meterInMercatorCoordinateUnits();
      // Mapbox GL v3: Y-up, NU negam scale pe Y
      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
        .makeTranslation(mercCenter.x, mercCenter.y, mercCenter.z)
        .scale(new THREE.Vector3(scale, scale, scale));
      camera.projectionMatrix = m.multiply(l);
      renderer.resetState();
      renderer.render(scene, camera);
      map.triggerRepaint();
    }
  };

  return layer;
}

// ── API Public AEDIS 3D ───────────────────────────────────────────────────
function aedis3DGenerate(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('⚠️ Selectați o parcelă.'); return; }

  ss('⏳ Se încarcă Three.js…');

  aedisLoadThree(()=>{
    ss('⏳ Se construiește volumetria…');

    // Curatam layer-ul anterior
    try{
      if(map.getLayer('aedis-3d-layer')) map.removeLayer('aedis-3d-layer');
      AEDIS3D.active = false;
      if(AEDIS3D.renderer){
        AEDIS3D.renderer.dispose();
        AEDIS3D.renderer = null;
      }
    }catch(e){}

    // Extragem inelul parcelei
    const geom = ap.geo.geometry;
    const ring = geom.type==='Polygon'
      ? geom.coordinates[0]
      : geom.coordinates[0][0];

    if(!ring?.length){ ss('⚠️ Geometrie parcelă invalidă.'); return; }

    const params2 = ap.params || getDefaultParams(ap.utr||'');
    const fnDef = AEDIS_FN[AEDIS.fn] || AEDIS_FN.rezidential_colectiv;
    const niv = AEDIS.corpuri[0]?.niv || pN(params2.niv) || 4;
    const hNiv = AEDIS.corpuri[0]?.hNiv || fnDef.hEtaj || 3.0;
    const hParter = AEDIS.parterDiferit ? (fnDef.hParter||4.5) : hNiv;

    const buildParams = {
      niv, hParter, hEtaj: hNiv,
      stil: AEDIS.stil, fn: AEDIS.fn,
      fnParter: AEDIS.fnParter,
      parterDiferit: AEDIS.parterDiferit,
      tipAcoperis: AEDIS.tipAcoperis,
      hSarpanta: AEDIS.hSarpanta,
      hMansarda: AEDIS.hMansarda,
      hAttic: AEDIS.hAttic||1.2,
      retrageriFineEtaje: AEDIS.retrageriFineEtaje,
      activeRetragere: AEDIS.activeRetragere,
    };

    try{
      const layer = aedis3DCreateLayer(ring, buildParams);
      if(!layer){ ss('❌ Nu s-a putut crea layer-ul.'); return; }

      map.addLayer(layer);
      AEDIS3D.active = true;
      AEDIS3D.params = buildParams;
          // Contextul urban: _setCtxVisibility respectă automat scenariul demolare
      _setCtxVisibility();
      if(AEDIS.scenariu === 'demolare' && AEDIS._demolishActive){
        _aedisRemoveExistingFromCtx();
      }

      set3D(55, -20);
      ss('✅ Urban3D: ' + niv + ' niveluri · H=' +
        (hParter+(niv-1)*hNiv).toFixed(1) + 'm · ' +
        AEDIS_STIL[AEDIS.stil].label + ' · ' + fnDef.label);
    }catch(err){
      console.error('Urban3D error:', err);
      ss('❌ Urban3D: ' + err.message);
    }
  });
}


function aedisResetAndRender(){
  FAL_AI.apiKey='';
  aedisCloseRenderOverlay();
  aedisAIRender();
}


// ── toggleRapoarteMenu — definit aici pentru a fi disponibil la init ──────
let _rapoarteCloseHandler = null; // referinta unica — previne acumularea de listeners

function toggleRapoarteMenu(){
  const m = document.getElementById('rapoarte-menu');
  const btn = document.getElementById('btnPDF');
  if(!m) return;

  // Sterge listener-ul anterior INTOTDEAUNA (previne acumularea)
  if(_rapoarteCloseHandler){
    document.removeEventListener('click', _rapoarteCloseHandler);
    _rapoarteCloseHandler = null;
  }

  const isOpen = m.style.display === 'block';
  if(isOpen){ m.style.display = 'none'; return; }

  // Pozitionare corecta: display:block INTAI, apoi calculeaza offsetWidth real
  m.style.visibility = 'hidden';
  m.style.display = 'block';

  requestAnimationFrame(()=>{
    const r = btn ? btn.getBoundingClientRect() : {bottom:48, right:window.innerWidth - 20, top:42};
    const mw = m.offsetWidth || 270;
    const mh = m.offsetHeight || 400;
    // Aliniat la dreapta butonului, sub el
    let left = r.right - mw;
    let top  = r.bottom + 6;
    // Clamp la viewport
    if(left + mw > window.innerWidth - 8) left = window.innerWidth - mw - 8;
    if(left < 8) left = 8;
    if(top + mh > window.innerHeight - 12) top = Math.max(8, r.top - mh - 4);
    m.style.left = left + 'px';
    m.style.top  = top  + 'px';
    m.style.visibility = '';

    // Adauga listener de inchidere (o singura data, cu referinta stocata)
    _rapoarteCloseHandler = function(e){
      if(!m.contains(e.target) && e.target.id !== 'btnPDF'){
        m.style.display = 'none';
        document.removeEventListener('click', _rapoarteCloseHandler);
        _rapoarteCloseHandler = null;
      }
    };
    setTimeout(()=> document.addEventListener('click', _rapoarteCloseHandler), 50);
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SISTEM 3 SCENARII CONSTRUCTIVE — PUG Automat · Maxim · Optim
// Generează și compară 3 scenarii simultan pe aceeași parcelă
// ═══════════════════════════════════════════════════════════════════════════

const SCEN3 = {
  COLS:  {pug:'#3b82f6', max:'#f59e0b', optim:'#34d399'},
  DARK:  {pug:'#1d4ed8', max:'#b45309', optim:'#047857'},
  ICONS: {pug:'🔵', max:'🟠', optim:'🟢'},
  LABELS:{pug:'PUG Automat', max:'Maxim', optim:'Optim'},
  DESC:  {
    pug:  'Parametrii <b>exacti din PUG</b> — regulamentul urbanistic în vigoare pentru acest UTR. Scenariul de referință legal.',
    max:  'Limita <b>maximă admisă</b> — POT la maxim, retrageri minime, calcan lateral. Cel mai agresiv scenariu legal.',
    optim:'<b>ROI maxim estimat</b> — numărul de niveluri care maximizează raportul profit/investiție. Nu neapărat cel mai înalt.'
  }
};

// Lazy init state vol3
function _initVol3(){
  if(!S.vol3) S.vol3 = {
    generated:false, active:null, activeTab:'optim',
    pug:  {feats:[], metrics:{}, params:{}},
    max:  {feats:[], metrics:{}, params:{}},
    optim:{feats:[], metrics:{}, params:{}}
  };
  return S.vol3;
}

// ── Adaugă sursele și layer-ul combinat (lazy) ─────────────────────────────
function _ensureVol3Sources(){
  if(window._vol3Ready) return;
  try{
    const E={type:'FeatureCollection',features:[]};
    if(!map.getSource('vol-scen-src')) map.addSource('vol-scen-src',{type:'geojson',data:E});
    if(!map.getLayer('vol-scen-3d')){
      map.addLayer({
        id:'vol-scen-3d', type:'fill-extrusion', source:'vol-scen-src',
        paint:{
          'fill-extrusion-color':['match',['get','scenariu3'],
            'pug','#2563eb','max','#d97706','optim','#059669','#94a3b8'],
          'fill-extrusion-height':['get','top'],
          'fill-extrusion-base':['get','base'],
          'fill-extrusion-opacity':0.52,
          'fill-extrusion-vertical-gradient':true
        }
      });
      // Ascundem inițial — afișăm doar în modul "Toate"
      map.setLayoutProperty('vol-scen-3d','visibility','none');
    }
    window._vol3Ready = true;
  }catch(e){ console.warn('vol3 sources init:',e.message); }
}

// ── Construiește parametrii pentru fiecare scenariu ────────────────────────
function _buildParamsForScenario(ap, mode){
  const utr = resolveUTR(ap.utr||'');
  const r   = REGULI[utr]||{};
  const base= ap.params || getDefaultParams(ap.utr);
  // Valori de baza (PUG sau fallback)
  const pot = r.pot  ?? base.pot  ?? 50;
  const cut = r.cut  ?? base.cut  ?? 1.5;
  const niv = r.niv  ?? base.niv  ?? 2;
  const h   = r.h    ?? base.h    ?? 9;
  const rf  = r.rf   ?? base.rf   ?? 5;
  const rl  = r.rl   ?? base.rl   ?? 3;
  const rs  = r.rs   ?? base.rs   ?? 5;
  const sv  = r.sv   ?? base.sv   ?? 20;
  const pk  = r.pk   ?? base.pk   ?? 1;

  if(mode === 'pug'){
    return {pot, cut, niv, h, rf, rl, rr:rl, rs, sv, pk};
  }

  if(mode === 'max'){
    return {
      pot: Math.min(pot, 80),       // POT la maxim permis (fără PUZ)
      cut, niv, h,
      rf:  Math.max(1, rf - 1),     // Retragere față -1m față de PUG
      rl:  0,                        // Calcan lateral
      rr:  0,                        // Calcan lateral
      rs:  Math.max(2, rs - 1),     // Retragere spate -1m
      sv:  Math.max(5, sv - 5),     // SV la minim tolerabil
      pk
    };
  }

  if(mode === 'optim'){
    // Iterăm prin număr de niveluri (1 → max_niv) și căutăm ROI maxim
    const pugP = _buildParamsForScenario(ap, 'pug');
    const maxNiv = Math.max(1, pN(pugP.niv)||2);
    const m2 = ap.area || 0;

    // Estimăm SC din footprint PUG
    let scEst = m2 * Math.min((pugP.pot||50)/100, 0.75);
    try{
      const fp = ap.geo?.geometry ? buildFP(ap.geo.geometry, pugP) : null;
      if(fp?.geometry){
        const fpA = turf.area(fp);
        scEst = Math.min(fpA, m2*(pugP.pot||50)/100);
      }
    }catch(e){}

    const LAND_EUR_M2 = 250; // estimat eur/m2 teren
    const landVal = m2 * LAND_EUR_M2;

    let bestROI = -Infinity, bestNiv = 1;
    for(let n = 1; n <= maxNiv; n++){
      const sd   = scEst * n;
      const util = sd * 0.78; // 78% din SD = suprafață utilă vandabilă
      // Cost crește neliniar: structuri înalte sunt mai scumpe
      const costM2 = n <= 2 ? 870 : n <= 4 ? 980 : 1250;
      // Preț vânzare scade pentru blocuri înalte (piață > cerere)
      const revM2  = n <= 2 ? 1520 : n <= 4 ? 1320 : 1150;
      const cost = util * costM2;
      const rev  = util * revM2;
      const roi  = (rev - cost) / (cost + landVal) * 100;
      if(roi > bestROI){ bestROI = roi; bestNiv = n; }
    }

    return {
      ...pugP,
      niv: bestNiv,
      h: +(bestNiv * Number(S.vol.hNiv||3)).toFixed(1)
    };
  }

  return {...base};
}

// ── Calculează metricile pentru un set de features generat ─────────────────
function _computeMetrics3(feats, params, ap){
  const m2   = ap.area || 0;
  const hNiv = Number(S.vol.hNiv||3);
  const niv  = pN(params.niv)||1;
  const hTot = (niv * hNiv).toFixed(1);

  // SC real = suma amprentelor la sol (floor=0)
  let scMp = 0;
  feats.filter(f=>f.properties?.floor===0&&!f.properties?.isExistent)
       .forEach(f=>{ try{ scMp += turf.area({type:'Feature',geometry:f.geometry,properties:{}}); }catch(e){} });
  scMp = Math.round(scMp);

  const sdMp    = scMp * niv;
  const potReal = m2 > 0 ? Math.round(scMp/m2*100) : 0;
  const svMp    = Math.round(m2 * (params.sv||20) / 100);
  const pkNec   = Math.ceil(scMp * niv / 100 * (params.pk||0));

  // ROI estimat (același algoritm ca optimizarea)
  const landVal = m2 * 250;
  const util    = sdMp * 0.78;
  const costM2  = niv <= 2 ? 870 : niv <= 4 ? 980 : 1250;
  const revM2   = niv <= 2 ? 1520 : niv <= 4 ? 1320 : 1150;
  const cost    = util * costM2;
  const rev     = util * revM2;
  const roi     = cost > 0 ? Math.round((rev - cost)/(cost + landVal)*100) : 0;

  return {niv, hTot, scMp, sdMp, potReal, svMp, pkNec, roi};
}

// ── Generează volumul pentru un scenariu (fără a schimba state-ul global) ──
function _buildVolumeForScenario(ap, mode){
  const params = _buildParamsForScenario(ap, mode);

  // Salvăm state-ul curent
  const savedParams  = ap.params ? JSON.parse(JSON.stringify(ap.params)) : null;
  const savedScen    = S.vol.scenariuConstructie;
  const savedMulti   = S.vol.multiVol;
  const savedForma   = AEDIS.forma;
  const savedRetras  = S.vol.retras;

  // Setăm starea pentru acest scenariu
  ap.params              = {...params};
  S.vol.scenariuConstructie = 'liber';   // clean slate pentru comparație
  S.vol.multiVol         = false;         // un singur volum pentru claritate
  AEDIS.forma            = 'dreptunghi'; // formă simplă pentru comparator
  S.vol.retras           = false;

  // Generăm
  let feats = [];
  try{ feats = buildVolume(); }catch(e){ console.warn('buildVolume scenario '+mode+':', e.message); }

  // Marcăm cu scenariu
  feats.forEach(f=>{ f.properties.scenariu3 = mode; });

  // Restaurăm state-ul
  ap.params              = savedParams;
  S.vol.scenariuConstructie = savedScen;
  S.vol.multiVol         = savedMulti;
  AEDIS.forma            = savedForma;
  S.vol.retras           = savedRetras;

  return {feats, params, metrics: _computeMetrics3(feats, params, ap)};
}

// ── Generează un singur scenariu ───────────────────────────────────────────
function generateSingleScenariu(mode){
  const v3 = _initVol3();
  if(!mode) mode = v3.activeTab || 'pug';
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('⚠️ Selectați o parcelă mai întâi.'); return; }

  _ensureVol3Sources();
  ss('⚡ Generez ' + (SCEN3.LABELS[mode]||mode) + '…');

  const result = _buildVolumeForScenario(ap, mode);
  v3[mode]    = result;
  v3.active   = mode;
  v3.generated = !!(v3.pug.feats.length && v3.max.feats.length && v3.optim.feats.length);

  // Activăm pe hartă
  S.vol._lastFeats = result.feats;
  S.vol.genDone    = true;
  setSource('vol-src', {type:'FeatureCollection', features: result.feats});
  _vol3SyncSources();

  // Asigurăm că layer-ul principal e vizibil, cel comparat ascuns
  try{ map.setLayoutProperty('vol-scen-3d','visibility','none'); }catch(e){}
  try{ map.setLayoutProperty('vol-3d','visibility','visible'); }catch(e){}

  set3D(65,-25);
  const m = result.metrics;
  ss(`✅ ${SCEN3.ICONS[mode]} ${SCEN3.LABELS[mode]}: ${m.niv} niv · H=${m.hTot}m · SC=${m.scMp}mp · ROI≈${m.roi}%`);
  renderTab('proiect');
  try{
    const bb=turf.bbox(ap.geo);
    map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:80,pitch:65,bearing:-25,maxZoom:18,duration:800});
  }catch(e){}
}

// ── Generează toate 3 scenariile simultan ──────────────────────────────────
function generateAllScenarii(){
  const v3 = _initVol3();
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('⚠️ Selectați o parcelă mai întâi.'); return; }

  _ensureVol3Sources();
  ss('⚡ Generez 3 scenarii…');

  ['pug','max','optim'].forEach(mode=>{
    v3[mode] = _buildVolumeForScenario(ap, mode);
  });

  v3.generated = true;
  v3.active    = 'all';

  // vol-src arată scenariul Optim ca implicit
  S.vol._lastFeats = v3.optim.feats;
  S.vol.genDone    = true;
  setSource('vol-src', {type:'FeatureCollection', features: v3.optim.feats});
  _vol3SyncSources();

  // Afișăm layerul combinat
  try{ map.setLayoutProperty('vol-scen-3d','visibility','visible'); }catch(e){}
  try{ map.setLayoutProperty('vol-3d','visibility','none'); }catch(e){}

  set3D(65,-25);
  const p=v3.pug.metrics, mx=v3.max.metrics, o=v3.optim.metrics;
  ss(`✅ PUG: ${p.niv}niv·${p.hTot}m · MAX: ${mx.niv}niv·${mx.hTot}m · OPTIM: ${o.niv}niv·ROI≈${o.roi}%`);
  renderTab('proiect');
  try{
    const bb=turf.bbox(ap.geo);
    map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:80,pitch:65,bearing:-25,maxZoom:18,duration:900});
  }catch(e){}
}

// ── Comută scenariu activ vizibil pe hartă ────────────────────────────────
function _setActiveScenario3(key){
  const v3 = _initVol3();
  if(!v3.generated && key !== 'none') return;
  v3.active = key;

  if(key === 'all'){
    _vol3SyncSources();
    try{ map.setLayoutProperty('vol-scen-3d','visibility','visible'); }catch(e){}
    try{ map.setLayoutProperty('vol-3d','visibility','none'); }catch(e){}
  } else {
    const feats = v3[key]?.feats || [];
    setSource('vol-src', {type:'FeatureCollection', features:feats});
    S.vol._lastFeats = feats;
    try{ map.setLayoutProperty('vol-scen-3d','visibility','none'); }catch(e){}
    try{ map.setLayoutProperty('vol-3d','visibility','visible'); }catch(e){}
  }
  renderTab('proiect');
  if(typeof _v3dIsOpen==='function' && _v3dIsOpen())
    setTimeout(()=>{ try{_v3dRebuildFast();}catch(e){} },200);
}

// ── Sincronizează sursa combinată ──────────────────────────────────────────
function _vol3SyncSources(){
  const v3 = _initVol3();
  const all = [...(v3.pug.feats||[]),...(v3.max.feats||[]),...(v3.optim.feats||[])];
  try{ setSource('vol-scen-src',{type:'FeatureCollection',features:all}); }catch(e){}
}

