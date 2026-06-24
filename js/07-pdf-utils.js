// UrbanX — PDF logo, capturi, bilant

function _pdfDrawLogo(pdf, x, y, size){
  const s = size || 10;
  // Logo REAL UrbanX (favicon) daca e disponibil — altfel fallback la vectorul de mai jos
  try { if (window._urbanxLogoDataURL) { pdf.addImage(window._urbanxLogoDataURL, 'PNG', x, y, s, s); return; } } catch(e){}
  // Background rotund
  pdf.setFillColor(14, 22, 42);
  pdf.roundedRect(x, y, s, s, s*0.2, s*0.2, 'F');
  // Sageata alba stanga (>)
  pdf.setFillColor(246, 248, 252);
  const pts1 = [
    [x+s*0.18, y+s*0.27], [x+s*0.43, y+s*0.27],
    [x+s*0.57, y+s*0.50], [x+s*0.43, y+s*0.73],
    [x+s*0.18, y+s*0.73], [x+s*0.33, y+s*0.50]
  ];
  pdf.setFillColor(240, 244, 252);
  pdf.triangle(x+s*0.18,y+s*0.27, x+s*0.43,y+s*0.27, x+s*0.57,y+s*0.50,'F');
  pdf.triangle(x+s*0.18,y+s*0.73, x+s*0.43,y+s*0.73, x+s*0.57,y+s*0.50,'F');
  pdf.triangle(x+s*0.18,y+s*0.27, x+s*0.18,y+s*0.73, x+s*0.33,y+s*0.50,'F');
  // K auriu dreapta
  pdf.setFillColor(214, 158, 54);
  pdf.triangle(x+s*0.60,y+s*0.27, x+s*0.83,y+s*0.27, x+s*0.70,y+s*0.50,'F');
  pdf.triangle(x+s*0.53,y+s*0.53, x+s*0.70,y+s*0.50, x+s*0.83,y+s*0.73,'F');
  pdf.triangle(x+s*0.53,y+s*0.53, x+s*0.65,y+s*0.73, x+s*0.83,y+s*0.73,'F');
}

// ═══════════════════════════════════════════════════════════════════════════
// STUDII URBANISTICE — 7 studii PDF cu aceeași calitate ca studiul de însorire
// UrbanX AEDIS · Generare automată pe baza datelor cadastrale + OSM + PUG
// ═══════════════════════════════════════════════════════════════════════════

// ── Helper comun: inițializare PDF cu același design ca studiul de însorire ──
// ════════════════════════════════════════════════════════════════════════════
// HELPER: Captură standard imagini hartă + viewer pentru toate studiile
// Returnează: {img3D, img2D, imgDist, imgLat, imgFront, imgAerial, v3dDay, v3dNight, v3dGolden}
// ════════════════════════════════════════════════════════════════════════════
async function _captureStudyMaps(ap, statusFn){
  const st = statusFn || (msg => ss(msg));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const waitF = async (n=4) => { for(let i=0;i<n;i++) await new Promise(r => requestAnimationFrame(r)); };

  // ── Helper: zoom optim bazat pe suprafața parcelei ──────────────────────
  // Garantează că parcela + contextul imediat sunt vizibile la orice dimensiune
  const _optimalZoom = (area_mp) => {
    // area_mp → zoom Mapbox care arată parcela + ~50m împrejur
    if(area_mp <   200) return 19.5;
    if(area_mp <   500) return 19.0;
    if(area_mp <  1500) return 18.5;
    if(area_mp <  4000) return 18.0;
    if(area_mp < 10000) return 17.5;
    if(area_mp < 30000) return 17.0;
    return 16.5;
  };
  const parcelArea = ap.area || (()=>{ try{ return turf.area(ap.geo); }catch(e){ return 1000; } })();
  const zoomClose  = _optimalZoom(parcelArea);       // zoom aproape — vederi 3D, amplasament
  const zoomMedium = Math.max(zoomClose - 1.5, 15);  // zoom mediu — context urban imediat
  const zoomCity   = 13.5;                           // zoom oraș — încadrare teritorială (era 12 → prea departe)
  const ctr = turf.centerOfMass(ap.geo).geometry.coordinates;
  const bb  = turf.bbox(ap.geo);

  // Asigurăm că suntem pe Urban 3D (stilul nostru principal)
  const selBase = document.getElementById('selBase');
  if(selBase && selBase.value !== 'custom'){
    await new Promise(resolve => {
      map.once('style.load', async () => {
        try{ addLayers(); if(S.ctx) setSource('ctx-src',S.ctx); updateMap(); }catch(e){}
        if(S.vol._lastFeats?.length) try{ setSource('vol-src',{type:'FeatureCollection',features:S.vol._lastFeats}); }catch(e){}
        await waitF(8); await wait(1200); map.triggerRepaint(); await waitF(4); await wait(600);
        resolve();
      });
      map.setStyle(STYLES['custom']);
      selBase.value = 'custom';
    });
  }

  // Centrăm pe parcelă — zoom optim, nu maxZoom:18 fix
  try{
    map.easeTo({center:ctr, zoom:zoomClose, pitch:0, bearing:0, duration:0});
    await waitF(6); await wait(600);
  }catch(e){}

  // capMap — setează pitch/bearing și face captură, cu zoom constant pe parcelă
  const capMap = async (pitch, bearing, extraWait=0, customZoom) => {
    try{
      const z = customZoom || zoomClose;
      map.easeTo({center:ctr, zoom:z, pitch, bearing, duration:0});
      await waitF(6); await wait(700+extraWait); map.triggerRepaint(); await waitF(4); await wait(500);
      const c = map.getCanvas();
      return c.width > 0 ? c.toDataURL('image/jpeg', 0.92) : '';
    }catch(e){ return ''; }
  };

  st('Captură 3D principală...');
  const img3D = await capMap(62, -20, 300);

  st('Captură plan 2D...');
  const img2D = await capMap(0, 0, 200);

  st('Captură plan distanțe...');
  let imgDist = '';
  try{
    // Plan distanțe: zoom ușor mai depărtat ca să vedem vecinii
    map.easeTo({center:ctr, zoom:zoomMedium, pitch:0, bearing:0, duration:0});
    await waitF(6); await wait(800); map.triggerRepaint(); await waitF(4); await wait(600);
    imgDist = map.getCanvas().toDataURL('image/jpeg', 0.92);
    // Re-centrăm pe parcelă
    map.easeTo({center:ctr, zoom:zoomClose, pitch:0, bearing:0, duration:0});
    await waitF(4); await wait(400);
  }catch(e){}

  st('Capturi vederi 3D...');
  const imgLat    = await capMap(58,  90);
  const imgFront  = await capMap(55,   0);
  const imgAerial = await capMap(70,  45);
  const imgBack   = await capMap(55, 180);

  // Revenire la vedere principală
  await capMap(62, -20);

  st('Captură hartă amplasament (Standard 3D)...');
  let imgLocation = '';
  try{
    await new Promise(resolve => {
      map.once('style.load', async () => {
        try{ addLayers(); if(S.ctx) setSource('ctx-src',S.ctx); updateMap(); }catch(e){}
        if(S.vol._lastFeats?.length) try{ setSource('vol-src',{type:'FeatureCollection',features:S.vol._lastFeats}); }catch(e){}
        await waitF(8); await wait(1200); map.triggerRepaint(); await waitF(4); await wait(800);
        resolve();
      });
      map.setStyle(STYLES['standard']);
      const selBase = document.getElementById('selBase');
      if(selBase) selBase.value = 'standard';
    });
    // zoom optim calculat — nu fix zoom:17
    map.easeTo({center:ctr, zoom:zoomClose, pitch:55, bearing:-20, duration:0});
    await waitF(6); await wait(900); map.triggerRepaint(); await waitF(4); await wait(700);
    imgLocation = map.getCanvas().toDataURL('image/jpeg', 0.92);
    // Revenim la Urban 3D
    await new Promise(resolve => {
      map.once('style.load', async () => {
        try{ addLayers(); if(S.ctx) setSource('ctx-src',S.ctx); updateMap(); }catch(e){}
        if(S.vol._lastFeats?.length) try{ setSource('vol-src',{type:'FeatureCollection',features:S.vol._lastFeats}); }catch(e){}
        await waitF(6); await wait(800); map.triggerRepaint(); await waitF(4); await wait(600);
        resolve();
      });
      map.setStyle(STYLES['custom']);
      const selBase = document.getElementById('selBase');
      if(selBase) selBase.value = 'custom';
    });
  }catch(e){ console.warn('Standard 3D capture:', e.message); imgLocation = img3D; }

  st('Captură hartă oraș (încadrare teritorială)...');
  let imgCity = '';
  try{
    // zoom 13.5 în loc de 12 — orașul e vizibil dar parcela nu se pierde în zgomot
    map.easeTo({center:ctr, zoom:zoomCity, pitch:0, bearing:0, duration:0});
    await waitF(6); await wait(900); map.triggerRepaint(); await waitF(4); await wait(700);
    imgCity = map.getCanvas().toDataURL('image/jpeg', 0.92);
    // Revenim pe parcelă
    map.easeTo({center:ctr, zoom:zoomClose, pitch:0, bearing:0, duration:0});
    await waitF(4); await wait(400);
  }catch(e){ imgCity = img2D; }

  st('Captură viewer 3D architectural...');
  let v3dDay='', v3dNight='', v3dGolden='', v3dOvercast='';
  try{
    if(S.vol._lastFeats?.length){
      const v3dImgs = await _v3dCaptureSilent(ap);
      v3dDay     = v3dImgs?.day     || v3dImgs?.zi       || '';
      v3dNight   = v3dImgs?.night   || v3dImgs?.noapte   || '';
      v3dGolden  = v3dImgs?.golden  || '';
      v3dOvercast= v3dImgs?.overcast|| v3dImgs?.innorirat || '';
    }
  }catch(e){ console.warn('v3d capture:', e.message); }

  const imgStandard = imgLocation || imgAerial || img3D;

  return {img3D, img2D, imgDist, imgLat, imgFront, imgAerial, imgBack, imgStandard, imgLocation, imgCity, v3dDay, v3dNight, v3dGolden, v3dOvercast};
}

// ════════════════════════════════════════════════════════════════════════════
// BILANȚ EDIFICABIL AVANSAT — Analiză completă proiectant/proprietar
// ════════════════════════════════════════════════════════════════════════════

// ── Date de piață UTR (€/mp estimat) ─────────────────────────────────────
const MARKET_DATA = {
  // Preț teren €/mp estimat per tip UTR
  landPrice: {
    'CM':900,'CC':800,'CB1':700,'CB2':650,'CB3':600,'CB4':550,'CB5':500,
    'P1':350,'P2':320,'P3':300,'P4':280,'P5':260,'P1A':380,'P1B':360,
    'P2A':330,'P2B':310,'P2C':290,'P3':300,
    'AI2A':200,'AI2B':180,'AI2C':160,'AI3':140,
    'LV':250,'LA':230,'LL':220,'LC':210,
    'default':300
  },
  // Cost construcție €/mp SD per funcțiune
  buildCost: {
    'rezidential_colectiv':750,'locuinta_individuala':900,'birouri':850,
    'comercial':700,'hotel':1100,'mixt':780,'industrial_depozitare':400,
    'institutie_publica':950,'default':750
  },
  // Preț vânzare €/mp util per funcțiune
  salePrice: {
    'rezidential_colectiv':1400,'locuinta_individuala':1200,'birouri':1100,
    'comercial':1800,'hotel':2200,'mixt':1500,'default':1300
  },
  // Suprafață medie unitate (mp) per funcțiune
  unitSize: {
    'rezidential_colectiv':65,'locuinta_individuala':120,'birouri':45,
    'comercial':80,'hotel':30,'mixt':60,'default':65
  }
};

// ── State global bilanț ────────────────────────────────────────────────────
let _bilantActive = false;
let _bilantScenarii = []; // scenarii salvate pentru comparator
let _bilantDragActive = false;
let _bilantDragSide = null;

// ── Toggle principal ───────────────────────────────────────────────────────
// ── Gestionare panouri flotante — evitare suprapunere cu #panel ──────────
function _floatPanelOpen(panelId, width){
  // Când un panou flotant se deschide, împingem #panel la stânga
  const panel = document.getElementById('panel');
  if(!panel) return;
  const panelVisible = panel.style.display !== 'none' && 
                       getComputedStyle(panel).display !== 'none' &&
                       panel.offsetWidth > 0;
  if(panelVisible){
    const offset = (width||440) + 10;
    panel.style.right = offset + 'px';
    panel.dataset.floatOffset = offset;
  }
}
function _floatPanelClose(panelId){
  // Când se închide panoul flotant, restaurăm #panel
  // Verificăm că nu mai e niciun alt panou deschis
  const otherOpen = ['lotizare-panel','bilant-panel','cimec-widget','uat-selector']
    .filter(id => id !== panelId)
    .some(id => {
      const el = document.getElementById(id);
      return el && el.offsetParent !== null;
    });
  if(!otherOpen){
    const panel = document.getElementById('panel');
    if(panel) panel.style.right = '0px';
  }
}

function toggleBilant(){
  _bilantActive = !_bilantActive;
  const btn = document.getElementById('btnBilant');
  if(btn) btn.classList.toggle('on', _bilantActive);
  if(_bilantActive){
    // Ascunde fp-src (portocaliu) când Bilanțul e activ — edificabil-src (verde) îl înlocuiește
    try{map.setLayoutProperty('fp-fill','visibility','none');}catch(e){}
    try{map.setLayoutProperty('fp-line','visibility','none');}catch(e){}
    updateBilant();
  } else {
    // Restaurează fp-src
    try{map.setLayoutProperty('fp-fill','visibility','visible');}catch(e){}
    try{map.setLayoutProperty('fp-line','visibility','visible');}catch(e){}
    setSource('setback-src',{type:'FeatureCollection',features:[]});
    setSource('edificabil-src',{type:'FeatureCollection',features:[]});
    setSource('bilant-src',{type:'FeatureCollection',features:[]});
    document.getElementById('bilant-panel')?.remove();
    _floatPanelClose('bilant-panel');
  }
}

// ── Calcul central bilanț ──────────────────────────────────────────────────
function updateBilant(){
  if(!_bilantActive) return;
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry) return;

  const parcelGeom = ap.geo.geometry;
  const params = ap.params || getDefaultParams(ap.utr||'');
  const fp = buildFP(parcelGeom, params);
  if(!fp?.geometry) return;

  const parcelFeat = {type:'Feature',geometry:parcelGeom,properties:{}};
  const parcelArea = turf.area(parcelFeat);
  const edificabilArea = turf.area(fp);

  // Suprafața construită reală (etaj 0)
  const volFeats = S.vol._lastFeats?.filter(f=>f.properties?.floor===0)||[];
  const volArea = volFeats.reduce((s,f)=>{
    try{return s+turf.area({type:'Feature',geometry:f.geometry,properties:{}});}catch(e){return s;}
  },0);

  // SD reală (suma tuturor etajelor)
  const sdReal = (S.vol._lastFeats||[]).reduce((s,f)=>{
    if((f.properties?.floor||0)<0) return s;
    try{return s+turf.area({type:'Feature',geometry:f.geometry,properties:{}});}catch(e){return s;}
  },0);

  // Retrageri overlay
  try{
    const diff=turf.difference(parcelFeat,fp);
    if(diff?.geometry) setSource('setback-src',{type:'FeatureCollection',features:[
      {type:'Feature',geometry:diff.geometry,properties:{color:'#ef4444'}}
    ]});
  }catch(e){}

  setSource('edificabil-src',{type:'FeatureCollection',features:[
    {type:'Feature',geometry:fp.geometry,properties:{}}
  ]});

  // Labels pe hartă
  const fpCtr = turf.centerOfMass(fp);
  const parCtr = turf.centerOfMass(parcelFeat);
  const bilantFeats = [
    {type:'Feature',geometry:fpCtr.geometry,properties:{
      label:`🟢 ${Math.round(edificabilArea)}mp\n${((edificabilArea/parcelArea)*100).toFixed(0)}% edificabil`,color:'#4ade80'}},
    {type:'Feature',geometry:parCtr.geometry,properties:{
      label:`🔴 ${Math.round(parcelArea-edificabilArea)}mp\n${(((parcelArea-edificabilArea)/parcelArea)*100).toFixed(0)}% retrageri`,color:'#f87171'}},
  ];
  if(volArea>0) bilantFeats.push({type:'Feature',geometry:fpCtr.geometry,properties:{
    label:`🔵 ${Math.round(volArea)}mp\n${((volArea/parcelArea)*100).toFixed(0)}% construit`,color:'#60a5fa'}});
  setSource('bilant-src',{type:'FeatureCollection',features:bilantFeats});

  _showBilantPanel(ap, parcelArea, edificabilArea, volArea, sdReal, params);
}

// ── Panel principal ────────────────────────────────────────────────────────
function _showBilantPanel(ap, parcelArea, edificabilArea, volArea, sdReal, params){
  document.getElementById('bilant-panel')?.remove();

  const utr = ap.utr||'default';
  const fn = AEDIS.fn||'rezidential_colectiv';
  const potMax = parseFloat(params?.pot)||40;
  const cutMax = parseFloat(params?.cut)||2.0;
  const nivMax = parseInt(params?.niv)||4;
  const retrageriArea = parcelArea - edificabilArea;
  const pctEdif = ((edificabilArea/parcelArea)*100).toFixed(1);
  const pctRetrag = ((retrageriArea/parcelArea)*100).toFixed(1);
  const pctVol = volArea>0?((volArea/parcelArea)*100).toFixed(1):'0';
  const pctUtil = edificabilArea>0&&volArea>0?((volArea/edificabilArea)*100).toFixed(0):'0';
  const scMax = parcelArea*potMax/100;
  const sdMax = parcelArea*cutMax;

  // Eficiență edificabil
  const efEdif = ((edificabilArea/parcelArea)*100).toFixed(0);
  const efComment = efEdif>=75?'Excelent — parcelă regulată':
    efEdif>=60?'Bun — pierderi moderate':
    efEdif>=45?'Moderat — formă neregulată':
    'Slab — parcelă dificilă, considerați PUZ';

  // Date financiare
  const landPricePerSqm = MARKET_DATA.landPrice[utr]||MARKET_DATA.landPrice.default;
  const buildCostPerSqm = MARKET_DATA.buildCost[fn]||MARKET_DATA.buildCost.default;
  const salePricePerSqm = MARKET_DATA.salePrice[fn]||MARKET_DATA.salePrice.default;
  const unitSz = MARKET_DATA.unitSize[fn]||MARKET_DATA.unitSize.default;

  // Scenarii financiare
  const scenarii = _calcScenarii(parcelArea, edificabilArea, params, fn, landPricePerSqm, buildCostPerSqm, salePricePerSqm, unitSz);

  // Vecini pentru comasare
  const vecini = _getVeciniPentruComasare(ap);

  // Umbrire vecini
  const umbrire = _calcUmbrireVecini(ap, volArea>0?S.vol._lastFeats:null);

  const isMobile = window.innerWidth < 841;
  const div = document.createElement('div');
  div.id = 'bilant-panel';
  // Pe desktop: plasăm la stânga panoului lateral, în josul ecranului
  const bPanel = document.getElementById('panel');
  const bPanelVis = bPanel && bPanel.offsetWidth>0 && getComputedStyle(bPanel).display!=='none';
  const bRight = isMobile ? null : (bPanelVis ? 434 : 20);
  div.style.cssText = `
    position:fixed;
    ${isMobile?'bottom:72px;left:4px;right:4px;':'bottom:20px;right:'+bRight+'px;width:460px;'}
    z-index:8500;background:rgba(7,12,24,.97);
    border:1px solid rgba(34,197,94,.3);border-radius:16px;
    padding:0;box-shadow:0 12px 40px rgba(0,0,0,.7);
    backdrop-filter:blur(16px);font-family:system-ui,sans-serif;
    max-height:${isMobile?'82vh':'85vh'};overflow:hidden;display:flex;flex-direction:column;
  `;

  // Tabs sistem
  div.innerHTML = `
    <!-- Header -->
    <div style="padding:12px 16px 0;flex-shrink:0">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <span style="color:#d4af37;font-weight:800;font-size:13px">📐 Bilanț Edificabil · <span style="color:#94a3b8;font-weight:400">${ap.nrcad||'parcela'} · UTR ${utr}</span></span>
        <button onclick="toggleBilant()" style="background:none;border:none;color:#475569;font-size:18px;cursor:pointer;line-height:1">✕</button>
      </div>

      <!-- Bara proporții -->
      <div style="height:8px;border-radius:4px;overflow:hidden;display:flex;gap:1px;margin-bottom:6px">
        ${volArea>0?`<div style="width:${pctVol}%;background:#3b82f6;min-width:2px;border-radius:3px 0 0 3px"></div>`:''}
        <div style="width:${Math.max(0,parseFloat(pctEdif)-parseFloat(pctVol)).toFixed(1)}%;background:#22c55e;min-width:2px${!volArea?';border-radius:3px 0 0 3px':''}"></div>
        <div style="flex:1;background:#ef4444;border-radius:0 3px 3px 0"></div>
      </div>
      <div style="display:flex;gap:10px;font-size:9px;margin-bottom:10px">
        ${volArea>0?`<span style="color:#60a5fa">🔵 Construit ${pctVol}%</span>`:''}
        <span style="color:#4ade80">🟢 Edificabil ${pctEdif}%</span>
        <span style="color:#f87171">🔴 Retrageri ${pctRetrag}%</span>
        ${volArea>0?`<span style="color:#fbbf24">⚡ Util. edificabil ${pctUtil}%</span>`:''}
      </div>

      <!-- Tabs -->
      <div style="display:flex;gap:2px;background:rgba(255,255,255,.04);border-radius:8px;padding:3px;" id="bilant-tabs">
        ${[['bilant','📊 Bilanț'],['financiar','💰 Financiar'],['scenarii','⚡ Scenarii'],['umbrire','🌑 Umbrire'],['comasare','🔗 Comasare']].map(([id,label])=>
          `<button onclick="_bilantTab('${id}')" id="btab-${id}"
            style="flex:1;border:none;background:${id==='bilant'?'rgba(34,197,94,.2)':'none'};
            color:${id==='bilant'?'#4ade80':'#64748b'};border-radius:6px;padding:5px 2px;
            font-size:${isMobile?'8.5':'9'}px;font-weight:700;cursor:pointer;transition:all .15s;white-space:nowrap"
          >${label}</button>`
        ).join('')}
      </div>
    </div>

    <!-- Content scrollabil -->
    <div id="bilant-content" style="overflow-y:auto;padding:12px 16px;flex:1">
      ${_bilantTabBilant(parcelArea,edificabilArea,volArea,sdReal,params,efEdif,efComment,scMax,sdMax,pctEdif,pctRetrag,pctVol)}
    </div>
  `;
  document.body.appendChild(div);

  // Stocăm datele pentru tabs
  div._data = {ap,parcelArea,edificabilArea,volArea,sdReal,params,fn,utr,
    landPricePerSqm,buildCostPerSqm,salePricePerSqm,unitSz,
    scenarii,vecini,umbrire,scMax,sdMax,potMax,cutMax,nivMax,
    pctEdif,pctRetrag,pctVol,pctUtil,efEdif,efComment};
}

function _bilantTab(tab){
  const div = document.getElementById('bilant-panel');
  if(!div) return;
  const d = div._data;
  // Update tab buttons
  ['bilant','financiar','scenarii','umbrire','comasare'].forEach(t=>{
    const btn=document.getElementById('btab-'+t);
    if(!btn) return;
    const active = t===tab;
    btn.style.background = active?'rgba(34,197,94,.2)':'none';
    btn.style.color = active?'#4ade80':'#64748b';
  });
  const content = document.getElementById('bilant-content');
  if(!content) return;
  if(tab==='bilant') content.innerHTML=_bilantTabBilant(d.parcelArea,d.edificabilArea,d.volArea,d.sdReal,d.params,d.efEdif,d.efComment,d.scMax,d.sdMax,d.pctEdif,d.pctRetrag,d.pctVol);
  else if(tab==='financiar') content.innerHTML=_bilantTabFinanciar(d);
  else if(tab==='scenarii') content.innerHTML=_bilantTabScenarii(d);
  else if(tab==='umbrire') content.innerHTML=_bilantTabUmbrire(d);
  else if(tab==='comasare') content.innerHTML=_bilantTabComasare(d);
}

// ── TAB 1: Bilanț suprafețe ────────────────────────────────────────────────
function _bilantTabBilant(parcelArea,edificabilArea,volArea,sdReal,params,efEdif,efComment,scMax,sdMax,pctEdif,pctRetrag,pctVol){
  const retrageriArea=parcelArea-edificabilArea;
  const potMax=parseFloat(params?.pot)||40;
  const potReal=parcelArea>0?((volArea/parcelArea)*100).toFixed(1):'—';
  const sdMax2=parcelArea*(parseFloat(params?.cut)||2);
  return `
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin-bottom:10px">
      ${[
        ['Teren total',Math.round(parcelArea)+' mp','#94a3b8'],
        ['Edificabil',Math.round(edificabilArea)+' mp','#4ade80'],
        ['Retrageri',Math.round(retrageriArea)+' mp','#f87171'],
        ['POT max PUG',params?.pot+'%','#fbbf24'],
        ['SC max admisă',Math.round(scMax)+' mp','#fbbf24'],
        ['SD max admisă',Math.round(sdMax2)+' mp','#a78bfa'],
        ['SC construită',Math.round(volArea)+' mp','#60a5fa'],
        ['SD construită',Math.round(sdReal)+' mp','#818cf8'],
        ['POT real',potReal+'%',parseFloat(potReal)<=potMax?'#4ade80':'#f87171'],
      ].map(([l,v,c])=>`<div style="background:rgba(255,255,255,.04);border-radius:8px;padding:8px;text-align:center;border:1px solid rgba(255,255,255,.05)">
        <div style="font-size:11px;font-weight:700;color:${c}">${v}</div>
        <div style="font-size:8px;color:#475569;margin-top:2px">${l}</div>
      </div>`).join('')}
    </div>

    <!-- Eficiență edificabil -->
    <div style="background:rgba(34,197,94,.07);border:1px solid rgba(34,197,94,.2);border-radius:10px;padding:10px;margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span style="color:#4ade80;font-size:11px;font-weight:700">Eficiență edificabil: ${efEdif}%</span>
        <span style="font-size:9px;color:#64748b">${efComment}</span>
      </div>
      <div style="height:6px;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden">
        <div style="height:100%;width:${efEdif}%;background:${efEdif>=75?'#4ade80':efEdif>=60?'#fbbf24':'#ef4444'};border-radius:3px;transition:width .5s"></div>
      </div>
    </div>

    <!-- Retrageri detaliate -->
    <div style="font-size:10px;color:#d4af37;font-weight:700;margin-bottom:6px">↔ Retrageri PUG aplicate</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:4px;margin-bottom:10px">
      ${[['↑ Față',params?.rf+'m','#fbbf24'],['↓ Spate',params?.rs+'m','#60a5fa'],
         ['← Stânga',params?.rl+'m','#a78bfa'],['→ Dreapta',(params?.rr||params?.rl)+'m','#34d399']
      ].map(([l,v,c])=>`<div style="background:rgba(255,255,255,.04);border-radius:7px;padding:6px;text-align:center">
        <div style="font-size:12px;font-weight:700;color:${c}">${v}</div>
        <div style="font-size:8px;color:#475569">${l}</div>
      </div>`).join('')}
    </div>

    <!-- Acțiuni rapide -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px">
      <button onclick="_bilantMaximizare()" style="background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.3);color:#4ade80;border-radius:8px;padding:8px 4px;font-size:10px;font-weight:700;cursor:pointer">⚡ Maximizează</button>
      <button onclick="_bilantOptimizeForma()" style="background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.3);color:#d4af37;border-radius:8px;padding:8px 4px;font-size:10px;font-weight:700;cursor:pointer">🔲 Formă optimă</button>
      <button onclick="_bilantExportClipboard()" style="background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.3);color:#818cf8;border-radius:8px;padding:8px 4px;font-size:10px;font-weight:700;cursor:pointer">📋 Copiază</button>
    </div>
  `;
}

// ── TAB 2: Financiar ───────────────────────────────────────────────────────
function _bilantTabFinanciar(d){
  const {parcelArea,edificabilArea,sdReal,params,fn,utr,landPricePerSqm,buildCostPerSqm,salePricePerSqm,unitSz,scMax,sdMax,potMax,cutMax,nivMax} = d;
  const scenarii = d.scenarii;

  return `
    <div style="font-size:10px;color:#fbbf24;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:6px">
      💰 Analiză financiară preliminară
      <span style="font-size:8px;color:#475569;font-weight:400">Estimativ · confirmare cu evaluator autorizat</span>
    </div>

    <!-- Valoare teren estimată -->
    <div style="background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.2);border-radius:10px;padding:10px;margin-bottom:10px">
      <div style="font-size:10px;color:#fbbf24;font-weight:700;margin-bottom:8px">🏗 Valoare teren estimată · UTR ${utr}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px">
        ${[
          ['Preț/mp teren',landPricePerSqm+'€/mp','#fbbf24'],
          ['Valoare totală teren',(Math.round(parcelArea*landPricePerSqm/1000))+'k€','#fbbf24'],
          ['Preț/mp edificabil',(Math.round(parcelArea*landPricePerSqm/Math.max(1,edificabilArea)))+'€/mp','#f59e0b'],
        ].map(([l,v,c])=>`<div style="text-align:center;padding:6px;background:rgba(255,255,255,.04);border-radius:7px">
          <div style="font-size:11px;font-weight:700;color:${c}">${v}</div>
          <div style="font-size:8px;color:#475569">${l}</div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Scenarii ROI -->
    <div style="font-size:10px;color:#4ade80;font-weight:700;margin-bottom:6px">📈 Scenarii ROI per regim de înălțime</div>
    <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:10px">
      ${scenarii.map((sc,i)=>`
        <div onclick="_applyBilantScenariu(${sc.niv})" style="background:rgba(255,255,255,.04);border-radius:9px;padding:9px 11px;cursor:pointer;border:1px solid rgba(255,255,255,.06);transition:all .15s"
          onmouseover="this.style.borderColor='rgba(34,197,94,.3)';this.style.background='rgba(34,197,94,.05)'"
          onmouseout="this.style.borderColor='rgba(255,255,255,.06)';this.style.background='rgba(255,255,255,.04)'">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <span style="color:#e2e8f0;font-size:11px;font-weight:700">${sc.label}</span>
            <span style="color:${sc.roi>=20?'#4ade80':sc.roi>=12?'#fbbf24':'#f87171'};font-size:12px;font-weight:800">ROI ${sc.roi}%</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">
            ${[['Invest.',sc.investStr],['Venituri',sc.venituriStr],['Profit',sc.profitStr],['Unități',sc.unitati+' ap/buc']].map(([l,v])=>
              `<div style="text-align:center"><div style="font-size:10px;font-weight:700;color:#94a3b8">${v}</div><div style="font-size:7.5px;color:#475569">${l}</div></div>`
            ).join('')}
          </div>
          <div style="margin-top:4px;height:3px;background:rgba(255,255,255,.06);border-radius:2px">
            <div style="height:100%;width:${Math.min(100,sc.roi*2)}%;background:${sc.roi>=20?'#4ade80':sc.roi>=12?'#fbbf24':'#ef4444'};border-radius:2px"></div>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="font-size:8.5px;color:#334155;text-align:center;padding:6px;border-top:1px solid rgba(255,255,255,.05)">
      ⚠️ Valori estimative. Nu includ taxe, avize, proiectare (~15-20% din construcție). Confirmare cu evaluator autorizat ANEVAR.
    </div>
  `;
}

function _calcScenarii(parcelArea, edificabilArea, params, fn, landPrice, buildCost, salePrice, unitSz){
  const potMax=parseFloat(params?.pot)||40;
  const cutMax=parseFloat(params?.cut)||2.0;
  const nivMax=parseInt(params?.niv)||4;
  const terrainVal = parcelArea * landPrice;
  const scMax = Math.min(edificabilArea, parcelArea*potMax/100);

  return [1,2,Math.min(4,nivMax),Math.min(6,nivMax+2)].map(niv=>{
    const sc = scMax * (niv===1?1.0:niv===2?0.9:niv<=4?0.78:0.65);
    const sd = sc * niv * 0.85; // eficiență plan (coridoare, pereți)
    const invest = terrainVal + sd*buildCost*(1+0.18); // +18% proiectare/avize/taxe
    const unitati = Math.floor(sd/unitSz);
    const venituri = sd * salePrice * 0.90;
    const profit = venituri - invest;
    const roi = invest>0?Math.round((profit/invest)*100):0;
    const fmt = v=>v>=1000000?(v/1000000).toFixed(2)+'M€':(v/1000).toFixed(0)+'k€';
    return {
      niv, label:niv===1?'Parter (P)':niv===2?'P+1 etaj':`P+${niv-1} etaje (${niv} niv.)`,
      sc:Math.round(sc),sd:Math.round(sd),invest:Math.round(invest),
      venituri:Math.round(venituri),profit:Math.round(profit),roi,unitati,
      investStr:fmt(invest),venituriStr:fmt(venituri),profitStr:fmt(profit)
    };
  });
}

// ── TAB 3: Scenarii comparator ─────────────────────────────────────────────
function _bilantTabScenarii(d){
  const {parcelArea,edificabilArea,params,fn,scenarii} = d;

  return `
    <div style="font-size:10px;color:#d4af37;font-weight:700;margin-bottom:8px">⚡ Scenarii de utilizare — Click pentru a aplica</div>
    ${scenarii.map(sc=>`
      <div onclick="_applyBilantScenariu(${sc.niv})" style="background:rgba(255,255,255,.04);border-radius:10px;padding:10px 12px;cursor:pointer;border:1px solid rgba(255,255,255,.06);margin-bottom:5px;transition:all .15s"
        onmouseover="this.style.borderColor='rgba(212,175,55,.4)';this.style.background='rgba(212,175,55,.04)'"
        onmouseout="this.style.borderColor='rgba(255,255,255,.06)';this.style.background='rgba(255,255,255,.04)'">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="color:#fbbf24;font-size:12px;font-weight:800">${sc.label}</span>
          <span style="background:${sc.roi>=20?'rgba(34,197,94,.2)':sc.roi>=12?'rgba(251,191,36,.2)':'rgba(239,68,68,.2)'};
            color:${sc.roi>=20?'#4ade80':sc.roi>=12?'#fbbf24':'#f87171'};
            border-radius:5px;padding:2px 8px;font-size:10px;font-weight:700">ROI ${sc.roi}%</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:5px">
          ${[['SC',sc.sc+' mp'],['SD',sc.sd+' mp'],['Unități',sc.unitati+' buc'],
             ['Investiție',sc.investStr],['Venituri',sc.venituriStr],['Profit',sc.profitStr]
          ].map(([l,v])=>`<div style="text-align:center;padding:5px;background:rgba(255,255,255,.03);border-radius:6px">
            <div style="font-size:10px;font-weight:700;color:#e2e8f0">${v}</div>
            <div style="font-size:7.5px;color:#475569">${l}</div>
          </div>`).join('')}
        </div>
        <div style="text-align:right;font-size:9px;color:#22c55e;font-weight:600">→ Click pentru a aplica</div>
      </div>
    `).join('')}

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:8px">
      <button onclick="_bilantMaximizare()" style="background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.3);color:#4ade80;border-radius:8px;padding:9px;font-size:10px;font-weight:700;cursor:pointer">⚡ Maximizează SC</button>
      <button onclick="_bilantOptimizeForma()" style="background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.3);color:#d4af37;border-radius:8px;padding:9px;font-size:10px;font-weight:700;cursor:pointer">🔲 Formă optimă automată</button>
    </div>
  `;
}

// ── TAB 4: Umbrire vecini ──────────────────────────────────────────────────
function _bilantTabUmbrire(d){
  const {ap, umbrire} = d;
  const lat = ap?.geo ? turf.centerOfMass(ap.geo).geometry.coordinates[1] : 47.16;
  const hProp = S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13;

  const solarAlt=(lat,month,hour)=>{
    const D2R=Math.PI/180;
    const decl=(-23.45*Math.cos(D2R*(360/365)*(month*30+10)))*D2R;
    const ha=(hour-12)*15*D2R;
    return Math.max(0,Math.asin(Math.sin(lat*D2R)*Math.sin(decl)+Math.cos(lat*D2R)*Math.cos(decl)*Math.cos(ha))*180/Math.PI);
  };
  const shadowLen=(h,alt)=>alt>0.5?h/Math.tan(alt*Math.PI/180):999;

  const altDec=solarAlt(lat,11,12);
  const altIun=solarAlt(lat,5,12);
  const shaDec=shadowLen(hProp,altDec);
  const shaIun=shadowLen(hProp,altIun);
  const isConform=altDec>=15;

  const hoursOk=[];
  for(let h=7;h<=17;h++){const a=solarAlt(lat,11,h);if(a>=15)hoursOk.push(h);}

  return `
    <div style="background:rgba(${isConform?'34,197,94':'239,68,68'},.1);border:1px solid rgba(${isConform?'34,197,94':'239,68,68'},.3);border-radius:10px;padding:10px;margin-bottom:10px">
      <div style="font-size:12px;font-weight:800;color:${isConform?'#4ade80':'#f87171'};margin-bottom:4px">
        ${isConform?'✅ CONFORM OMS 119/2014':'⚠️ VERIFICARE NECESARĂ'}
      </div>
      <div style="font-size:10px;color:#94a3b8">Alt. solară solstițiu iarnă (12:00): <b style="color:#fbbf24">${altDec.toFixed(1)}°</b> · Prag minim: <b>15°</b></div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px">
      ${[
        ['H propus',hProp.toFixed(1)+'m','#60a5fa'],
        ['Latitudine',lat.toFixed(2)+'°N','#94a3b8'],
        ['Umbră Dec (12:00)',shaDec>200?'>200m':shaDec.toFixed(0)+'m','#f87171'],
        ['Umbră Iun (12:00)',shaIun>200?'>200m':shaIun.toFixed(0)+'m','#fbbf24'],
        ['Alt. solară Dec',altDec.toFixed(1)+'°',altDec>=15?'#4ade80':'#f87171'],
        ['Ore însorire Dec',hoursOk.length+'h ('+( hoursOk[0]||'—')+':00-'+(hoursOk[hoursOk.length-1]||'—')+':00)','#fbbf24'],
      ].map(([l,v,c])=>`<div style="background:rgba(255,255,255,.04);border-radius:8px;padding:8px;text-align:center">
        <div style="font-size:11px;font-weight:700;color:${c}">${v}</div>
        <div style="font-size:8px;color:#475569">${l}</div>
      </div>`).join('')}
    </div>

    <div style="font-size:10px;color:#d4af37;font-weight:700;margin-bottom:6px">🌑 Umbre orare · Solstițiu iarnă · H=${hProp.toFixed(1)}m</div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3px;margin-bottom:10px">
      ${[8,9,10,12,14,15,16].map(h=>{
        const alt=solarAlt(lat,11,h);
        const sh=shadowLen(hProp,alt);
        const ok=alt>=15;
        return `<div style="background:rgba(${ok?'34,197,94':'239,68,68'},.12);border-radius:6px;padding:5px;text-align:center;border:1px solid rgba(${ok?'34,197,94':'239,68,68'},.2)">
          <div style="font-size:9px;color:#64748b">${h}:00</div>
          <div style="font-size:10px;font-weight:700;color:${ok?'#4ade80':'#f87171'}">${alt<0.5?'—':alt.toFixed(0)+'°'}</div>
          <div style="font-size:8px;color:#475569">${sh>200?'>200':sh.toFixed(0)}m</div>
        </div>`;
      }).join('')}
    </div>

    ${umbrire.length>0?`
    <div style="font-size:10px;color:#d4af37;font-weight:700;margin-bottom:6px">🏘 Vecini potențial umbriți</div>
    <div style="display:flex;flex-direction:column;gap:3px">
      ${umbrire.slice(0,5).map(v=>`
        <div style="display:flex;justify-content:space-between;background:rgba(255,255,255,.04);border-radius:7px;padding:6px 9px">
          <span style="color:#94a3b8;font-size:10px">${v.nrcad}</span>
          <span style="color:#f87171;font-size:10px">${v.dist.toFixed(0)}m distanță</span>
          <span style="color:${v.impact==='IMPACT'?'#f87171':'#4ade80'};font-size:10px;font-weight:700">${v.impact}</span>
        </div>
      `).join('')}
    </div>`:'<div style="color:#475569;font-size:10px;text-align:center;padding:10px">Nu s-au detectat vecini cu impact semnificativ</div>'}
  `;
}

function _calcUmbrireVecini(ap, volFeats){
  if(!ap?.geo?.geometry||!S.ctx?.features) return [];
  const ctr=turf.centerOfMass(ap.geo).geometry.coordinates;
  const hProp=volFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13;
  return S.ctx.features
    .filter(f=>f.geometry)
    .map(f=>{
      try{
        const vc=turf.centerOfMass({type:'Feature',geometry:f.geometry,properties:{}}).geometry.coordinates;
        const dist=turf.distance({type:'Feature',geometry:{type:'Point',coordinates:ctr},properties:{}},
          {type:'Feature',geometry:{type:'Point',coordinates:vc},properties:{}},{units:'meters'});
        const impact=dist<hProp*1.5?'IMPACT':'OK';
        return {nrcad:f.properties?.nrcad||'—',dist,impact,h:f.properties?.h||6};
      }catch(e){return null;}
    })
    .filter(x=>x&&x.dist<100)
    .sort((a,b)=>a.dist-b.dist);
}

// ── TAB 5: Comasare parcele ────────────────────────────────────────────────
function _bilantTabComasare(d){
  const {ap, parcelArea, edificabilArea, params, vecini} = d;
  const potMax=parseFloat(params?.pot)||40;

  if(!vecini||vecini.length===0) return `
    <div style="color:#475569;font-size:11px;text-align:center;padding:20px">
      <div style="font-size:24px;margin-bottom:8px">🔗</div>
      Nu s-au detectat parcele vecine cu date disponibile.<br>
      <span style="font-size:9px">Selectați o parcelă cu context OSM încărcat.</span>
    </div>`;

  return `
    <div style="font-size:10px;color:#a78bfa;font-weight:700;margin-bottom:8px">
      🔗 Potențial comasare — Parcele adiacente identificate
    </div>
    <div style="background:rgba(167,139,250,.08);border:1px solid rgba(167,139,250,.2);border-radius:10px;padding:10px;margin-bottom:10px">
      <div style="font-size:11px;color:#e2e8f0;margin-bottom:4px">Parcela curentă: <b style="color:#a78bfa">${Math.round(parcelArea)} mp · Edificabil ${Math.round(edificabilArea)} mp</b></div>
      <div style="font-size:9.5px;color:#64748b">Prin comasare cu parcelele de mai jos crești edificabilul și poți accesa indicatori superiori.</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:10px">
      ${vecini.slice(0,5).map(v=>{
        const combined=parcelArea+(v.area||0);
        const gainEdif=Math.round((combined*potMax/100)-edificabilArea);
        const gainPct=edificabilArea>0?((gainEdif/edificabilArea)*100).toFixed(0):'—';
        return `
          <div style="background:rgba(255,255,255,.04);border-radius:10px;padding:10px;border:1px solid rgba(255,255,255,.06)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
              <span style="color:#a78bfa;font-size:11px;font-weight:700">Nr. ${v.nrcad}</span>
              <span style="color:#4ade80;font-size:10px;font-weight:700">+${gainPct}% edificabil</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px">
              ${[
                ['Suprafață parcelă',Math.round(v.area||0)+' mp'],
                ['Teren combinat',Math.round(combined)+' mp'],
                ['Câștig edificabil','+'+gainEdif+' mp'],
              ].map(([l,v])=>`<div style="text-align:center;padding:4px;background:rgba(255,255,255,.03);border-radius:5px">
                <div style="font-size:10px;font-weight:700;color:#e2e8f0">${v}</div>
                <div style="font-size:7.5px;color:#475569">${l}</div>
              </div>`).join('')}
            </div>
            <div style="margin-top:5px;font-size:8.5px;color:#475569">
              SC max combinat: <b style="color:#fbbf24">${Math.round(combined*potMax/100)} mp</b> vs. actual: <b>${Math.round(parcelArea*potMax/100)} mp</b>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <div style="font-size:8.5px;color:#334155;text-align:center;padding:6px">
      Comasarea necesită acordul proprietarilor vecini și procedura cadastrală conform Legii 7/1996.
    </div>
  `;
}

function _getVeciniPentruComasare(ap){
  if(!ap?.geo?.geometry||!S.ctx?.features) return [];
  const parcelFeat={type:'Feature',geometry:ap.geo.geometry,properties:{}};
  return S.ctx.features
    .filter(f=>f.geometry)
    .map(f=>{
      try{
        const inter=turf.intersect(parcelFeat,{type:'Feature',geometry:f.geometry,properties:{}});
        // dacă sunt adiacente (intersecție linie sau punct)
        const area=turf.area({type:'Feature',geometry:f.geometry,properties:{}});
        if(area>20) return {nrcad:f.properties?.nrcad||'—',area,geo:f.geometry};
        return null;
      }catch(e){
        // încearcă distanță
        try{
          const dist=turf.distance(turf.centerOfMass(parcelFeat),
            turf.centerOfMass({type:'Feature',geometry:f.geometry,properties:{}}),{units:'meters'});
          if(dist<15){
            const area=turf.area({type:'Feature',geometry:f.geometry,properties:{}});
            return {nrcad:f.properties?.nrcad||'—',area,geo:f.geometry};
          }
        }catch(e2){}
        return null;
      }
    })
    .filter(x=>x&&x.area>20)
    .sort((a,b)=>b.area-a.area);
}

// ── Acțiuni ────────────────────────────────────────────────────────────────
function _applyBilantScenariu(niv){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap){ss('Selectați o parcelă.');return;}
  if(ap.params) ap.params.niv=niv;
  if(AEDIS.corpuri[0]) AEDIS.corpuri[0].niv=niv;
  S.vol.hNiv=3.0;
  const feats=buildVolume();
  setSource('vol-src',{type:'FeatureCollection',features:feats});
  S.vol.genDone=true;
  setTimeout(()=>{updateDistanceLines();updateBilant();},150);
  ss(`⚡ Scenariu ${niv} niveluri aplicat!`);
}

function _bilantMaximizare(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  AEDIS.forma='auto';
  const feats=buildVolume();
  setSource('vol-src',{type:'FeatureCollection',features:feats});
  S.vol.genDone=true;
  setTimeout(()=>{updateDistanceLines();updateBilant();},150);
  ss('⚡ Edificabil maximizat!');
}

function _bilantOptimizeForma(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  const params=ap.params||getDefaultParams(ap.utr||'');
  const forme=['auto','dreptunghi','L','U','T','bara','patrat'];
  let best='auto',bestArea=0;
  const savedForma=AEDIS.forma;
  forme.forEach(f=>{
    try{AEDIS.forma=f;const fp=buildFP(ap.geo.geometry,params);const a=fp?turf.area(fp):0;if(a>bestArea){bestArea=a;best=f;}}catch(e){}
  });
  AEDIS.forma=best;
  const feats=buildVolume();
  setSource('vol-src',{type:'FeatureCollection',features:feats});
  S.vol.genDone=true;
  setTimeout(()=>{updateDistanceLines();updateBilant();},150);
  ss(`🔲 Formă optimă: ${best} · SC≈${Math.round(bestArea)}mp`);
}

function _bilantExportClipboard(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap){ss('Selectați o parcelă.');return;}
  const params=ap.params||getDefaultParams(ap.utr||'');
  const pA=turf.area({type:'Feature',geometry:ap.geo.geometry,properties:{}});
  const fp=buildFP(ap.geo.geometry,params);
  const eA=fp?turf.area(fp):0;
  const utr=ap.utr||'—';
  const landPx=MARKET_DATA.landPrice[utr]||MARKET_DATA.landPrice.default;
  const txt=[
    `BILANȚ EDIFICABIL URBANX`,
    `Nr. cadastral: ${ap.nrcad||'—'} | UTR: ${utr}`,
    `Suprafață teren: ${Math.round(pA)} mp`,
    `Edificabil: ${Math.round(eA)} mp (${((eA/pA)*100).toFixed(1)}%)`,
    `Retrageri: ${Math.round(pA-eA)} mp (${(((pA-eA)/pA)*100).toFixed(1)}%)`,
    `Retrageri: F=${params.rf}m | S=${params.rs}m | L=${params.rl}m`,
    `POT max: ${params.pot}% | CUT: ${params.cut} | H: ${params.h||'—'}m | Niv: ${params.niv||'—'}`,
    `SC max: ${Math.round(pA*parseFloat(params.pot)/100)} mp | SD max: ${Math.round(pA*parseFloat(params.cut))} mp`,
    `Valoare teren est.: ${Math.round(pA*landPx/1000)}k€ (${landPx}€/mp)`,
    `Generat: ${new Date().toLocaleString('ro-RO')} | UrbanX TSS·FG`,
  ].join('\n');
  navigator.clipboard?.writeText(txt).then(()=>ss('📋 Bilanț copiat!')).catch(()=>{alert(txt);});
}




// ════════════════════════════════════════════════════════════════════════════
// SISTEM LOTIZARE TEREN — Ansamblu rezidențial
// ════════════════════════════════════════════════════════════════════════════


// ════════════════════════════════════════════════════════════════════════════
// SISTEM LOTIZARE TEREN v2 — Ansamblu rezidențial complet
// Circulații: lățime + procentaj + scenarii auto
// Tipuri: toate active by default
// Rezultate: hartă, bilanț, financiar, PUG, PDF
// ════════════════════════════════════════════════════════════════════════════

