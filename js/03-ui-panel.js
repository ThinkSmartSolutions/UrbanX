// UrbanX — Panel, tab-uri, HTML UI

let _ctxLastParcel = null;

async function loadContext(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry) return;
  
  // Debounce: daca acelasi teren, nu mai facem Overpass in mai putin de 20s
  const now = Date.now();
  const parcelKey = ap.nrcad || JSON.stringify(ap.geo?.geometry?.coordinates?.[0]?.[0]);
  if(parcelKey === _ctxLastParcel && (now - _ctxLastCall) < 20000){
    // Avem deja contextul - nu refacem request
    if(S.ctx?.features?.length) return;
  }
  _ctxLastCall = now;
  _ctxLastParcel = parcelKey;
  const c = turf.centerOfMass(ap.geo).geometry.coordinates;
  const r = Math.max(80, Number(S.vol.ctxR||200));

  // Cache pe zona (centru rotunjit 3 zecimale = ~100m precizie)
  const ckey = c[1].toFixed(3)+'_'+c[0].toFixed(3);
  if(_CTX_CACHE[ckey]){
    S.ctx = _CTX_CACHE[ckey];
    setSource('ctx-src', S.ctx);
    _ctxApplyLabels(S.ctx.features);
    if(S.vol.genDone) setTimeout(updateDistanceLines, 200);
    return;
  }

  // ── Încearcă Overpass (timeout scurt 5s, un singur endpoint random) ──────
  let feats = null;
  try{
    const endpoints = [
      'https://overpass-api.de/api/interpreter',
      'https://lz4.overpass-api.de/api/interpreter',
      'https://z.overpass-api.de/api/interpreter'
    ];
    const ep = endpoints[Math.floor(Math.random()*endpoints.length)];
    const q = `[out:json][timeout:5];(way["building"](around:${r},${c[1]},${c[0]}););out geom tags;`;
    const ctrl = new AbortController();
    const tid = setTimeout(()=>ctrl.abort(), 6000);
    const res = await fetch(ep, {
      method:'POST',
      headers:{'Content-Type':'text/plain;charset=UTF-8'},
      body:q, signal:ctrl.signal
    });
    clearTimeout(tid);
    if(res.ok){
      const json = await res.json();
      feats = (json.elements||[])
        .filter(el=>el.type==='way'&&Array.isArray(el.geometry)&&el.geometry.length>=3)
        .map(el=>{
          const ring=el.geometry.map(p=>[Number(p.lon),Number(p.lat)]);
          if(ring[0][0]!==ring.at(-1)[0]||ring[0][1]!==ring.at(-1)[1])ring.push(ring[0]);
          const lv=pN(el.tags?.['building:levels']);
          const ht=pN(el.tags?.height);
          const h=ht||(lv?lv*3.0:7);
          const fn=el.tags?.building||'yes';
          return{type:'Feature',
            properties:{h,lv,fn,col:BLD_COL[fn]||BLD_COL['yes']||'#8a9ab0'},
            geometry:{type:'Polygon',coordinates:[ring]}};
        });
      if(feats.length) ss('✅ Context OSM: '+feats.length+' clădiri');
    }
  }catch(e){
    console.warn('Overpass failed ('+e.message+'), folosim Mapbox rendered features');
  }

  // ── FALLBACK: extragem clădiri din viewport Mapbox ────────────────────────
  // Folosim ctx-3d (layerul nostru GeoJSON, mereu disponibil) +
  // composite/building (stilul Mapbox streets/satellite)
  if(!feats || feats.length === 0){
    feats = _ctxFromMapbox(c, r);
    if(feats.length > 0){
      ss('📍 Context Mapbox: '+feats.length+' clădiri (Overpass indisponibil)');
    } else {
      ss('⚠️ Context: nicio clădire găsită — mărește zoom sau schimbă stilul hărții');
    }
  }

  const fc = {type:'FeatureCollection', features: feats||[]};
  S.ctx = fc;
  if(feats?.length) _CTX_CACHE[ckey] = fc;
  setSource('ctx-src', S.ctx);
  _ctxApplyLabels(feats||[]);
  if(S.vol.genDone) setTimeout(updateDistanceLines, 300);
}

// Extrage clădiri din Mapbox GL rendered features (fără apel extern)
function _ctxFromMapbox(center, radiusM){
  const feats = [];
  const seen = new Set();
  const centerPt = turf.point(center);

  // Layere posibile — extinse pentru compatibilitate mobile și toate stilurile Mapbox
  const possibleLayers = [
    'ctx-3d',
    // Mapbox Standard / Streets v12
    'building', 'building-extrusion', 'building-shadow',
    // Mapbox Standard 3D (noul stil)
    'building-outline', 'building-part', '3d-buildings',
    // Mapbox Satellite / Dark / Light
    'composite_building', 'mapbox-satellite-building',
    // Custom UrbanX style layers
    'urban-buildings', 'buildings-3d', 'fill-extrusion'
  ];
  const availableLayers = possibleLayers.filter(id=>{
    try{ return !!map.getLayer(id); }catch(e){ return false; }
  });

  // Dacă ctx-3d e singurul disponibil dar e gol, nu are sens să-l interogăm
  // Verificăm dacă are features
  let ctxHasData = false;
  try{
    const ctxData = map.getSource('ctx-src')?._data;
    ctxHasData = (ctxData?.features?.length||0) > 0;
  }catch(e){}

  // Layere de interogat: dacă ctx-3d e gol, excludem
  const queryLayers = availableLayers.filter(id=>
    id !== 'ctx-3d' || ctxHasData
  );

  if(!queryLayers.length){
    // Fallback mobil: interogăm FĂRĂ filtru de layer, luăm tot ce are geometrie Polygon
    console.warn('_ctxFromMapbox: niciun layer specific — fallback fara filtru');
    try{
      const allFeats = map.queryRenderedFeatures(undefined);
      for(const f of allFeats){
        if(!f.geometry || (f.geometry.type!=='Polygon' && f.geometry.type!=='MultiPolygon')) continue;
        if(!(f.properties?.height||f.properties?.render_height||f.properties?.['building:levels']||f.properties?.h||f.layer?.type==='fill-extrusion')) continue;
        const geom = f.geometry.type==='MultiPolygon'?{type:'Polygon',coordinates:f.geometry.coordinates[0]}:f.geometry;
        try{
          const ctr=turf.centerOfMass({type:'Feature',geometry:geom,properties:{}});
          const dist=turf.distance(centerPt,ctr,{units:'meters'});
          if(dist>radiusM+150) continue;
          const key=ctr.geometry.coordinates.map(v=>v.toFixed(4)).join(',');
          if(seen.has(key)) continue; seen.add(key);
          const h=pN(f.properties?.height)||pN(f.properties?.render_height)||(pN(f.properties?.['building:levels'])||0)*3||7;
          feats.push({type:'Feature',properties:{h,lv:Math.round(h/3),fn:f.properties?.building||'yes',col:'#8a9ab0'},geometry:geom});
        }catch(e){}
      }
    }catch(e){ console.warn('_ctxFromMapbox fallback total error:', e.message); }
    return feats;
  }

  try{
    // Interogăm tot viewport-ul (undefined = tot ecranul)
    const rendered = map.queryRenderedFeatures(undefined, {layers: queryLayers});

    for(const f of rendered){
      if(!f.geometry) continue;
      const geom = f.geometry.type==='MultiPolygon'
        ? {type:'Polygon', coordinates:f.geometry.coordinates[0]}
        : f.geometry;
      if(geom.type!=='Polygon') continue;
      if(geom.coordinates[0]?.length < 3) continue;

      try{
        const ctr = turf.centerOfMass({type:'Feature',geometry:geom,properties:{}});
        const dist = turf.distance(centerPt, ctr, {units:'meters'});
        if(dist > radiusM + 100) continue; // puțin mai larg

        const key = ctr.geometry.coordinates.map(v=>v.toFixed(4)).join(',');
        if(seen.has(key)) continue;
        seen.add(key);

        const h = pN(f.properties?.height)
          || pN(f.properties?.render_height)
          || (pN(f.properties?.['building:levels'])||0)*3
          || pN(f.properties?.h)
          || 7;
        const fn = f.properties?.building || f.properties?.fn || 'yes';

        feats.push({
          type:'Feature',
          properties:{h, lv:Math.round(h/3), fn, col:BLD_COL[fn]||'#8a9ab0'},
          geometry: geom
        });
      }catch(e){}
    }
  }catch(e){ console.warn('_ctxFromMapbox error:', e.message); }

  return feats;
}

// Aplică etichete pe hartă pentru clădirile de context
function _ctxApplyLabels(feats){
  try{
    const labelFeats = feats.map(f=>{
      try{
        const ctr = turf.centerOfMass(f);
        const h = f.properties.h;
        const fn = f.properties.fn||'yes';
        const fnLbl = BLD_LABELS?.[fn]||fn;
        const showFn = fn!=='yes' && fnLbl!=='Necunoscut';
        return{type:'Feature', geometry:ctr.geometry,
          properties:{
            h_label: h?Math.round(h)+'m':'',
            fn_label: showFn?(fnLbl.length>12?fnLbl.slice(0,12)+'.':fnLbl):'Necunoscut',
            col: f.properties.col||'#e2e8f0',
            h: h||0
          }};
      }catch(e){return null;}
    }).filter(Boolean);
    setSource('ctx-labels-src',{type:'FeatureCollection',features:labelFeats});
  }catch(e){}
}

// Reîncarcă forțat contextul (ignoră cache)
async function loadContextForce(){
  _ctxLastCall=0; _ctxLastParcel=null; // bypass cooldown
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('⚠️ Selectează o parcelă mai întâi'); return; }
  // Ștergem cache pentru zona curentă
  const c = turf.centerOfMass(ap.geo).geometry.coordinates;
  const ckey = c[1].toFixed(3)+'_'+c[0].toFixed(3);
  delete _CTX_CACHE[ckey];
  S.ctx = null;
  ss('⏳ Se reîncarcă contextul urban...');
  await loadContext();
  renderTab('proiect');
}

// ═══ POPUP ════════════════════════════════════════════════════════════════
function popup(html,lngLat){
  if(S.popup){S.popup.remove();S.popup=null;}
  // Fix #6/#7: Font mai mare pe mobile, stiluri garantate
  const isMob = window.innerWidth <= 840;
  const fs = isMob ? '15px' : '13px';
  const pad = isMob ? '14px 16px' : '12px 15px';
  const minW = isMob ? '200px' : '160px';
  const wrappedHtml = '<div style="background:#0b1220;color:#e2e8f0;border-radius:12px;font-size:'+fs+';min-width:'+minW+';font-family:Segoe UI,Arial,sans-serif;line-height:1.6;padding:'+pad+'">'+html+'</div>';
  S.popup=new mapboxgl.Popup({
    closeButton:true,
    offset:isMob?20:12,
    closeOnClick:false,
    maxWidth: isMob?'320px':'280px',
    className:'ux-popup'  // clasă custom pentru override CSS
  }).setLngLat(lngLat).setHTML(wrappedHtml).addTo(map);
  S.popup.on('close',()=>{S.popup=null;});
  // Forțăm stilul pe container după adăugare
  setTimeout(()=>{
    const el=document.querySelector('.ux-popup .mapboxgl-popup-content');
    if(el){
      el.style.cssText='background:#0b1220!important;color:#e2e8f0!important;border:1px solid rgba(212,175,55,.4)!important;border-radius:12px!important;padding:12px 15px!important;font-size:13px!important;box-shadow:0 8px 32px rgba(0,0,0,.8)!important;max-width:260px!important;min-width:160px!important';
    }
    const btn=document.querySelector('.ux-popup .mapboxgl-popup-close-button');
    if(btn){
      btn.style.cssText='color:#94a3b8!important;font-size:20px!important;background:none!important;border:none!important;padding:0 8px!important;cursor:pointer!important;line-height:1!important';
    }
  },10);
}

// Buton global de închidere popup (keyboard ESC)
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&S.popup){S.popup.remove();S.popup=null;}
  if(e.key==='Escape'&&document.getElementById('utr-drawer')?.classList.contains('open')) hideUTRDrawer();
});

// ═══ PARCAJE ══════════════════════════════════════════════════════════════
function calcParcaje(fn,area,nrApart,nrCam){
  const f=FN_UTR[fn];if(!f)return'—';
  if(fn==='locuinta_individuala')return`${Math.ceil(2*(nrApart||1))} locuri (2/unitate)`;
  if(fn==='locuinta_colectiva')return`${Math.ceil(1*(nrApart||Math.round(area/60)))} locuri (1/apart.)`;
  if(fn==='hotel')return`${Math.ceil((nrCam||10)*1)+(nrCam>=10?1:0)} locuri (1/cameră + autocar)`;
  if(['birouri','servicii','institutional'].includes(fn))return`${Math.ceil(area/100*2)} locuri (2/100mp)`;
  if(fn==='comert')return`${Math.ceil(area/100*3)} locuri (3/100mp)`;
  if(fn==='industrial'||fn==='logistic')return`${Math.ceil(area/100*1)} locuri (1/100mp)`;
  return f.pk_formula;
}

function valFunctiune(fn,utr){
  const f=FN_UTR[fn];const u=utr||S.utr;
  if(!f||!u)return{status:'neutral',msg:'Selectează UTR și funcțiune'};
  if(f.admis.includes(u))return{status:'ok',msg:`✅ ${f.label} ADMISĂ în UTR ${u}`};
  if(f.cond.includes(u))return{status:'warn',msg:`⚠️ ${f.label} CONDIȚIONATĂ în UTR ${u} — necesită aviz`};
  return{status:'err',msg:`🚫 ${f.label} INTERZISĂ în UTR ${u} — schimbați funcțiunea sau solicitați PUZ`};
}

// ═══ RENDER PANELS ════════════════════════════════════════════════════════
// Mobile nav - click pe tab din bara de jos
function mobNavClick(tab, btn){
  const sh = document.getElementById('mob-sheet');
  const isActive = btn.classList.contains('active');
  const isOpen = sh?.classList.contains('open');

  // Dacă tab-ul e deja activ și sheet-ul e deschis → închidem
  if(isActive && isOpen){
    sh.classList.remove('open');
    return;
  }

  // Activăm tab-ul
  document.querySelectorAll('.mnav-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  S.tab = tab;

  // Actualizăm conținut — try/catch: sheet-ul se deschide chiar dacă getContent aruncă
  const mb = document.getElementById('mob-body');
  if(mb){
    try{ mb.innerHTML = getContent(tab); }
    catch(e){
      console.error('[mobNavClick] getContent('+tab+'):', e.message);
      mb.innerHTML = '<div class="card"><div style="color:#f87171;padding:12px">Eroare încărcare tab: '+e.message+'</div></div>';
    }
  }
  if(sh){
    sh.classList.add('open');
    setTimeout(draw2D, 80);
  }
}

function toggleMobSheet(){
  const sh = document.getElementById('mob-sheet');
  if(!sh) return;
  sh.classList.toggle('open');
  if(sh.classList.contains('open')){
    const mb = document.getElementById('mob-body');
    if(mb) mb.innerHTML = getContent(S.tab||'search');
    setTimeout(draw2D, 80);
  }
}

// Drag gestures pe sheet
let _dragY = 0, _dragStartH = 0;
function mobDragStart(e){
  _dragY = e.touches[0].clientY;
  _dragStartH = document.getElementById('mob-sheet')?.getBoundingClientRect().height || 0;
}
function mobDragMove(e){
  const dy = e.touches[0].clientY - _dragY;
  const sh = document.getElementById('mob-sheet');
  if(sh && dy > 0) sh.style.transform = 'translateY('+dy+'px)';
}
function mobDragEnd(e){
  const dy = e.changedTouches[0].clientY - _dragY;
  const sh = document.getElementById('mob-sheet');
  if(!sh) return;
  sh.style.transform = '';
  if(dy > 60){
    sh.classList.remove('open');
    document.querySelectorAll('.mnav-btn').forEach(b=>b.classList.remove('active'));
  }
}

function ensureFAB(){
  const fab = document.getElementById('mob-fab');
  if(!fab) return;
  if(window.innerWidth > 840){
    // Desktop: FAB ascuns
    fab.style.display = 'none';
    return;
  }
  // Mobile: FAB vizibil cu toate stilurile
  Object.assign(fab.style, {
    position:'fixed', bottom:'28px', right:'16px',
    zIndex:'2147483647', display:'flex',
    width:'64px', height:'64px', borderRadius:'50%',
    background:'#d4af37', border:'3px solid rgba(255,255,255,.5)',
    fontSize:'28px', cursor:'pointer', fontWeight:'900',
    alignItems:'center', justifyContent:'center',
    color:'#000', boxShadow:'0 4px 24px rgba(0,0,0,.9)',
    touchAction:'manipulation'
  });
}

function renderAll(){
  // renderTab actualizează tc-{tab} și mob-body (cu scroll preservation)
  renderTab(S.tab);
  // Actualizăm tabs
  document.querySelectorAll('.ptab').forEach(b=>b.classList.toggle('active',b.dataset.t===S.tab));
  document.querySelectorAll('.tc').forEach(c=>c.classList.toggle('active',c.id===`tc-${S.tab}`));
  document.querySelectorAll('.mtab').forEach(b=>b.classList.toggle('active',b.dataset.mt===S.tab));
  // Mobile: renderTab a actualizat deja mob-body — NU mai facem innerHTML direct (ar reseta scroll-ul)
  // Desktop: dacă mob-sheet e deschis, actualizăm și acolo
  const mb=_g('mob-body');
  if(mb && window.innerWidth>840 && _g('mob-sheet')?.classList.contains('open')){
    const savedScroll = mb.scrollTop;
    mb.innerHTML=getContent(S.tab);
    if(savedScroll > 0) mb.scrollTop=savedScroll;
  }
  setTimeout(draw2D,60);
}

function renderTab(tab){
  try{
    const html=getContent(tab);

    // Desktop: tc-{tab} — cu scroll preservation
    const el=document.getElementById('tc-'+tab);
    if(el){
      const savedScroll = el.scrollTop;
      el.innerHTML=html;
      if(savedScroll > 0) el.scrollTop=savedScroll;
    }

    // Mobile: mob-body — cu scroll preservation
    if(window.innerWidth<=840 && tab===S.tab){
      const mb=document.getElementById('mob-body');
      if(mb){
        const savedMbScroll = mb.scrollTop;
        mb.innerHTML=html;
        if(savedMbScroll > 0) mb.scrollTop=savedMbScroll;
      }
    }
  }catch(e){
    console.error('renderTab('+tab+') error:', e);
    const el=document.getElementById('tc-'+tab);
    if(el) el.innerHTML='<div class="card"><div style="color:#f87171">Eroare: '+e.message+'</div></div>';
  }
}

function getContent(tab){
  switch(tab){
    case'search':return htmlSearch();
    case'utr':return htmlUTR()+htmlIndicatori();
    case'indicatori':return htmlIndicatori();
    case'proiect':return htmlProiect();
    case'multi':return htmlMulti();
    case'scen':return htmlScen();
    case'rapoarte':return htmlMobRapoarte();
    default:return'';
  }
}

function htmlMobRapoarte(){
  const hasParcel = !!(S.parcels[S.activeParcel??0]?.geo?.geometry);
  const warn = hasParcel ? '' : '<div style="background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.3);border-radius:8px;padding:10px;font-size:12px;color:#fbbf24;margin-bottom:10px">⚠️ Selectați mai întâi o parcelă de pe hartă</div>';
  const btn=(onclick,color,ico,label,desc,infoKey)=>`
  <div style="display:flex;align-items:stretch;gap:5px">
    <button onclick="${onclick}" style="flex:1;font-size:11px;padding:10px;background:rgba(${color},.10);border:1px solid rgba(${color},.30);color:rgb(${color});border-radius:10px;display:flex;align-items:center;gap:9px;text-align:left;cursor:pointer">
      <span style="font-size:18px;flex-shrink:0">${ico}</span>
      <span><b>${label}</b><br><small style="opacity:.65">${desc}</small></span>
    </button>
    <button onclick="infoDrawerOpen('${infoKey}')" title="Detalii studiu" style="background:rgba(${color},.08);border:1px solid rgba(${color},.25);color:rgba(${color},.8);border-radius:10px;padding:0 12px;cursor:pointer;font-size:13px;flex-shrink:0;font-weight:700">ⓘ</button>
  </div>`;
  const cat=(label,col)=>`<div style="font-size:9px;color:#${col||'475569'};text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin:8px 0 5px;display:flex;align-items:center;gap:6px"><span style="flex:1;height:1px;background:rgba(${col?col.replace(/(.{2})(.{2})(.{2})/,'$1,$2,$3'):'71,85,105'},.3)"></span>${label}<span style="flex:2;height:1px;background:rgba(${col?col.replace(/(.{2})(.{2})(.{2})/,'$1,$2,$3'):'71,85,105'},.3)"></span></div>`;
  return`
  <div style="padding:4px 0 6px">
  <div class="section">📋 Rapoarte & Studii Urbane</div>
  ${warn}
  <button onclick="openStudyMap()" style="width:100%;margin-bottom:10px;padding:11px 14px;
    background:linear-gradient(135deg,rgba(212,175,55,.15),rgba(99,102,241,.1));
    border:1px solid rgba(212,175,55,.35);border-radius:10px;cursor:pointer;
    display:flex;align-items:center;gap:10px;text-align:left">
    <span style="font-size:22px">🗺</span>
    <div>
      <div style="font-size:12px;font-weight:800;color:#d4af37">Hartă Rapoarte & Conexiuni</div>
      <div style="font-size:10px;color:#64748b;margin-top:1px">Ce studii ai nevoie · ce date circulă · scopuri AC/PUZ/NZEB</div>
    </div>
    <span style="margin-left:auto;font-size:11px;color:#d4af37;font-weight:700">→</span>
  </button>

  ${cat('① Analize de Bază — Prima etapă','d4af37')}
  <div class="card" style="display:flex;flex-direction:column;gap:6px;margin-bottom:8px">
    ${btn('generateStudiuAmplasament()','129,140,248','🗺','Studiu de Amplasament & Context Teritorial','Teritoriu · UTR · Restricții · LMI · Utilități · Acces','amplasament')}
    ${btn('runExport()','255,255,255','📄','Raport Urbanistic Complet','POT, CUT, H, funcțiuni, aliniamente, norme PUG','raport_complet')}
  </div>

  ${cat('② Proiectare Preliminară','d4af37')}
  <div class="card" style="display:flex;flex-direction:column;gap:6px;margin-bottom:8px">
    ${btn('generateRelevee()','212,175,55','📐','Memoriu Tehnic Preliminar','Planuri funcționale · Secțiuni · Axonometrie · Bilanț suprafețe','relevee')}
    ${btn('generateMemoriu()','212,175,55','🏗','Memoriu Tehnic pentru Avize','Document complet PT/DTAC · Avize AC · Specialist OAR','memoriu')}
    ${btn('_lotExportPDF()','192,132,252','🏘','Plan de Lotizare PDF','Ansamblu rezidențial · Parcele · Circulații · Accese','lotizare')}
  </div>

  ${cat('③ Studii Tehnice — Obligatorii AC/CU','94,234,212')}
  <div class="card" style="display:flex;flex-direction:column;gap:6px;margin-bottom:8px">
    ${btn('generateSolarStudy()','251,191,36','☀','Studiu Însorire','Ore soare, bilanț solar OMS 119/2014','insorire')}
    ${btn('generateShadowStudy()','251,146,60','🌑','Studiu Umbre & Obstrucție','Umbre proiectate, distanțe critice','umbre')}
    ${btn('generateSSF()','248,113,113','🔥','Studiu Siguranță la Foc (ISU)','Aviz ISU Moldova, P118-2/2013, evacuare','isu')}
    ${btn('generateGeotehnicalStudy()','167,139,250','🪨','Pre-Studiu Geotehnic','Seismicitate, NFA, capacitate portantă','geotehnic')}
    ${btn('generateAACR()','96,165,250','✈','Studiu AACR — Aviz Aeroport','ICAO Anexa 14, H maxim admis','aacr')}
  </div>

  ${cat('④ Studii Mediu & Infrastructură','74,222,128')}
  <div class="card" style="display:flex;flex-direction:column;gap:6px;margin-bottom:8px">
    ${btn('generateEnvironmentalImpact()','134,239,172','🌿','Studiu Impact Mediu (EIM)','Impact APM, Legea 292/2018','eim')}
    ${btn('generateHealthImpactStudy()','34,211,238','🏥','Studiu Impact Sănătate Populație','Aer · Zgomot · Radon · OMS 119','sanatate')}
    ${btn('generateWaterStudy()','34,211,238','💧','Studiu Gospodărire Ape — DTGA','Aviz Apele Române, inundabilitate','apa')}
    ${btn('generateGreenStudy()','74,222,128','🌳','Studiu Spații Verzi','SV necesar, plantare, permeabilitate','verde')}
    ${btn('generateNoiseStudy()','167,139,250','🔇','Studiu Acustic Urban','Zgomot, SR 10009/2017, noapte','acustic')}
    ${btn('generateWindStudy()','56,189,248','🌬','Studiu Vânt & Confort Pietonal','Criteriu Lawson, zone calm','vant')}
  </div>

  ${cat('⑤ Studii Mobilitate & Impact','244,114,182')}
  <div class="card" style="display:flex;flex-direction:column;gap:6px;margin-bottom:8px">
    ${btn('generateTrafficStudy()','52,211,153','🚦','Studiu Impact Trafic','Trafic generat, parcaje NP 067, ITE','trafic')}
    ${btn('generateMobilityStudy()','244,114,182','🚗','Studiu Mobilitate & Parcaje','Accese, NP 051, PMR','mobilitate')}
    ${btn('generateDensityStudy()','148,163,184','📊','Studiu Densitate Urbană','CUT zonal, POT vecini, profil stradal','densitate')}
  </div>

  ${cat('⑥ Studii Speciale & Patrimoniu','245,158,11')}
  <div class="card" style="display:flex;flex-direction:column;gap:6px;margin-bottom:8px">
    ${btn('generateIstoricStudy()','245,158,11','🏛','Studiu Patrimoniu & Istoric','LMI, zone protejate, avize MCID/DJCPN','patrimoniu')}
    ${btn('generateExistingBldStudy()','251,113,133','🏚','Studiu Construcții Existente','Inventar, scenarii demolare/consolidare','existente')}
  </div>

  ${cat('⑦ Studii Tehnico-Economice','212,175,55')}
  <div class="card" style="display:flex;flex-direction:column;gap:6px">
    ${btn('generateStudiuFezabilitate()','212,175,55','📊','Studiu Fezabilitate / DALI','Viabilitate economică, HG 907/2016','fezabilitate')}
    ${btn('generateCPE()','52,211,153','⚡','Certificat Performanță Energetică','Clasa A-G · EP kWh/m²an · NZEB · Legea 372/2005','cpe')}
    ${btn('generateProiectieUrbanistica()','100,130,220','🏙','Proiecție Urbanistică 10/20/30 ani','INSE · Scenarii S1/S2/S3 · Demografic · ESG Proiectat','proiectie_urb')}
    ${btn('generateStabilitateTaluzuri()','180,76,4','⛰','Studiu Stabilitate Taluzuri','Bishop · Fellenius · EC7 · NP 074/2014 · Cotă AMSL real','stabilitate')}
    ${btn('generatePrestudiuBransamente()','96,165,250','🔌','Pre-studiu Bransamente & Utilități','Apă · Canal · Electric · Gaze · ISU · PV','bransamente')}
  </div>

  ${cat('⑧ Studii Noi 2026','34,211,238')}
  <div class="card" style="display:flex;flex-direction:column;gap:6px">
    ${btn('generateStudiuPMR()','34,211,238','♿','Accesibilitate PMR','Legea 448/2006 · NP 051/2012 · ISO 21542','pmr')}
    ${btn('generateStudiuIluminat()','251,191,36','💡','Iluminat Natural EN 17037','Factor lumină zi · OMS 119 · Adâncime cameră','iluminat')}
    ${btn('generateREPA()','129,140,248','📋','Raport Pre-Autorizare (REPA)','Checklist AC · Avize necesare · Listă documente','repa')}
    ${btn('generateStudiuApePluviale()','56,189,248','🌧','Gospodărire Ape Pluviale','SR EN 752 · Debit calcul · Cisternă recuperare','ape_pluviale')}
    ${btn('generateSeismicStudy()','248,113,113','🌍','Studiu Seismic & Risc Seismic','P100-1/2013 · ag · Tc · Clasa importanță','seismic')}
    ${btn('()=>{ss("🔜 Studiu Carbon — în dezvoltare. Disponibil în curând.");}','74,222,128','🌱','Bilanț Carbon & CO₂','Amprentă carbon · NZEB · ESG — în dezvoltare','carbon')}
    ${btn('()=>{ss("🔜 Studiu Biodiversitate — în dezvoltare. Disponibil în curând.");}','134,239,172','🦋','Biodiversitate Urbană','Natura 2000 · Indice verde — în dezvoltare','biodiv')}
  </div>
  </div>`;
}


// ═══ MOB SEARCH OVERLAY — rezultate căutare fix pe mobil ══════════════════
// Poziționează overlayul chiar deasupra tastaturii iOS/Android
function mobSearchOverlayShow(title, contentHtml){
  const ov = document.getElementById('mob-search-overlay');
  const ovContent = document.getElementById('mob-ov-content');
  const ovTitle = document.getElementById('mob-ov-title');
  if(!ov||!ovContent) return;

  ovTitle && (ovTitle.textContent = title||'Rezultate');
  ovContent.innerHTML = contentHtml;
  ov.classList.add('active');

  // Poziționăm overlay deasupra tastaturii
  // Pe iOS: window.visualViewport.height = înălțimea vizibilă (fără tastatură)
  function positionOverlay(){
    const vvh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const keyboardH = window.innerHeight - vvh;
    ov.style.bottom = Math.max(72, keyboardH + 72) + 'px'; // 72 = mob-nav height
    ov.style.top = 'auto';
  }
  positionOverlay();

  // Actualizăm la resize (tastatură apare/dispare)
  if(window.visualViewport){
    window._ovVVListener = positionOverlay;
    window.visualViewport.addEventListener('resize', window._ovVVListener);
  }
}

function mobSearchOverlayClose(){
  const ov = document.getElementById('mob-search-overlay');
  if(ov) ov.classList.remove('active');
  if(window.visualViewport && window._ovVVListener){
    window.visualViewport.removeEventListener('resize', window._ovVVListener);
    window._ovVVListener = null;
  }
}

function mobSearchOverlayUpdate(contentHtml){
  const ovContent = document.getElementById('mob-ov-content');
  if(ovContent) ovContent.innerHTML = contentHtml;
  const ov = document.getElementById('mob-search-overlay');
  if(ov && contentHtml) ov.classList.add('active');
  else if(ov && !contentHtml) ov.classList.remove('active');
}

// ═══ SHORTCUT ACTIONS CATALOG ══════════════════════════════════════════════
const SHORTCUT_CATALOG = [
  {id:'raport_pdf',      ico:'📄', label:'Raport Urbanistic',   fn:"showPdfModal?showPdfModal():runExport()"},
  {id:'studiu_insorire', ico:'☀',  label:'Studiu Însorire',     fn:"generateSolarStudy()"},
  {id:'aedis_open',      ico:'⚡', label:'Urban3D',              fn:"aedisOpen()"},
  {id:'genVol',          ico:'🏗', label:'Generează Volum 3D',  fn:"genVol()"},
  {id:'parcele_zona',    ico:'📦', label:'Parcele din Zonă',     fn:"doLoadLocalParcels()"},
  {id:'loisir',          ico:'🌿', label:'LOISIR',              fn:"aedisOpenLoisir()"},
  {id:'view_3d',         ico:'🏙', label:'Vedere 3D',           fn:"set3D(60,-20)"},
  {id:'view_2d',         ico:'⬛', label:'Vedere 2D / Nord',    fn:"set2D()"},
  {id:'standard_3d',     ico:'🗺', label:'Standard 3D (PBR)',   fn:"(()=>{const s=document.getElementById('selBase');if(s){s.value='standard';s.dispatchEvent(new Event('change'));}})()"},
  {id:'satelit',         ico:'🛰', label:'Satelitar',           fn:"(()=>{const s=document.getElementById('selBase');if(s){s.value='sat';s.dispatchEvent(new Event('change'));}})()"},
  {id:'multi_toggle',    ico:'🔲', label:'Multiselect On/Off',  fn:"toggleMulti(!S.multiMode);renderTab('search')"},
  {id:'reset_all',       ico:'🗑', label:'Resetează tot',       fn:"window._lastCadVal='';window._lastAddrVal='';window._lastCoordVal='';doReset();renderTab('search')"},
  {id:'studiu_umbre',    ico:'🌑', label:'Studiu Umbre',         fn:"generateShadowStudy()"},
  {id:'studiu_acustic',  ico:'🔇', label:'Studiu Acustic',       fn:"generateNoiseStudy()"},
  {id:'studiu_vent',     ico:'🌬', label:'Studiu Vânt',          fn:"generateWindStudy()"},
  {id:'studiu_verde',    ico:'🌿', label:'Studiu Spații Verzi',  fn:"generateGreenStudy()"},
  {id:'studiu_mobilit',  ico:'🚗', label:'Studiu Mobilitate',    fn:"generateMobilityStudy()"},
  {id:'memoriu',         ico:'🏗', label:'Memoriu Tehnic',       fn:"generateMemoriu()"},
];

function renderShortcuts(){
  const sc = S.shortcuts || [];
  if(!sc.length) return '<div class="help" style="text-align:center;padding:6px">Niciun shortcut. Apasă ✏ Editează.</div>';
  return sc.map(id=>{
    const def = SHORTCUT_CATALOG.find(c=>c.id===id);
    if(!def) return '';
    return `<button onclick="${def.fn}" style="display:flex;align-items:center;gap:10px;width:100%;padding:12px 14px;border-radius:10px;border:1px solid rgba(212,175,55,.3);background:rgba(212,175,55,.08);color:#d4af37;cursor:pointer;font-size:13px;font-weight:700;text-align:left;transition:all .15s" onmouseover="this.style.background='rgba(212,175,55,.18)'" onmouseout="this.style.background='rgba(212,175,55,.08)'">
      <span style="font-size:18px">${def.ico}</span>
      <span>${def.label}</span>
    </button>`;
  }).join('');
}

function showShortcutPicker(){
  const current = S.shortcuts || [];
  const overlay = document.createElement('div');
  overlay.id = 'sc-picker-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)';
  
  const box = document.createElement('div');
  box.style.cssText = 'background:#0f172a;border:1px solid rgba(212,175,55,.4);border-radius:16px;width:min(400px,94vw);max-height:85vh;overflow-y:auto;padding:20px;box-shadow:0 24px 80px rgba(0,0,0,.7)';
  
  box.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <div>
        <div style="font-size:15px;font-weight:800;color:#d4af37">⚡ Shortcut-uri rapide</div>
        <div style="font-size:11px;color:#64748b;margin-top:2px">Alege maxim 2 acțiuni favorite</div>
      </div>
      <button onclick="document.getElementById('sc-picker-overlay').remove()" style="background:none;border:1px solid rgba(255,255,255,.2);color:#94a3b8;border-radius:8px;padding:5px 10px;cursor:pointer;font-size:13px">✕</button>
    </div>
    <div id="sc-list" style="display:flex;flex-direction:column;gap:7px">
      ${SHORTCUT_CATALOG.map(def=>{
        const selected = current.includes(def.id);
        const idx = current.indexOf(def.id);
        return `<button onclick="scToggle('${def.id}',this)" data-id="${def.id}"
          style="display:flex;align-items:center;gap:10px;padding:11px 13px;border-radius:10px;
          border:2px solid ${selected?'#d4af37':'rgba(255,255,255,.12)'};
          background:${selected?'rgba(212,175,55,.12)':'rgba(11,18,32,.7)'};
          color:${selected?'#d4af37':'#94a3b8'};cursor:pointer;text-align:left;width:100%;
          font-size:12px;font-weight:${selected?'700':'400'};transition:all .15s">
          <span style="font-size:18px;width:24px;text-align:center">${def.ico}</span>
          <span style="flex:1">${def.label}</span>
          ${selected?`<span style="background:#d4af37;color:#0b1220;border-radius:99px;padding:1px 7px;font-size:10px;font-weight:800">${idx+1}</span>`:''}
        </button>`;
      }).join('')}
    </div>
    <div style="display:flex;gap:8px;margin-top:16px">
      <button onclick="scSave()" style="flex:1;padding:11px;border-radius:9px;background:#d4af37;color:#0b1220;border:none;font-size:13px;font-weight:800;cursor:pointer">✅ Salvează</button>
      <button onclick="document.getElementById('sc-picker-overlay').remove()" style="padding:11px 16px;border-radius:9px;background:#374151;color:#e2e8f0;border:none;font-size:13px;cursor:pointer">Anulează</button>
    </div>
  `;
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
}

function scToggle(id, btn){
  let sc = [...(S.shortcuts||[])];
  const i = sc.indexOf(id);
  if(i>=0){
    sc.splice(i,1);
  } else {
    if(sc.length>=2){ 
      // Flash the limit indicator
      btn.style.borderColor='#f87171';
      setTimeout(()=>{ btn.style.borderColor='rgba(255,255,255,.12)'; }, 600);
      return; 
    }
    sc.push(id);
  }
  S.shortcuts = sc;
  // Re-render lista din picker
  const list = document.getElementById('sc-list');
  if(list){
    list.innerHTML = SHORTCUT_CATALOG.map(def=>{
      const selected = sc.includes(def.id);
      const idx = sc.indexOf(def.id);
      return `<button onclick="scToggle('${def.id}',this)" data-id="${def.id}"
        style="display:flex;align-items:center;gap:10px;padding:11px 13px;border-radius:10px;
        border:2px solid ${selected?'#d4af37':'rgba(255,255,255,.12)'};
        background:${selected?'rgba(212,175,55,.12)':'rgba(11,18,32,.7)'};
        color:${selected?'#d4af37':'#94a3b8'};cursor:pointer;text-align:left;width:100%;
        font-size:12px;font-weight:${selected?'700':'400'};transition:all .15s">
        <span style="font-size:18px;width:24px;text-align:center">${def.ico}</span>
        <span style="flex:1">${def.label}</span>
        ${selected?`<span style="background:#d4af37;color:#0b1220;border-radius:99px;padding:1px 7px;font-size:10px;font-weight:800">${idx+1}</span>`:''}
      </button>`;
    }).join('');
  }
}

function scSave(){
  try{ localStorage.setItem('ux_shortcuts', JSON.stringify(S.shortcuts||[])); }catch(e){}
  document.getElementById('sc-picker-overlay')?.remove();
  renderTab('search');
  ss('✅ Shortcut-uri salvate.');
}

// ═══ HTML SEARCH ══════════════════════════════════════════════════════════
function htmlSearch(){
  // Preservăm valorile introduse anterior
  const coordVal = window._lastCoordVal || S._lastCoord || '';
  const addrVal  = window._lastAddrVal  || '';
  const cadVal   = window._lastCadVal   || '';

  return`
  <div class="section">📍 Coordonate GPS</div>
  <div class="card">
    <input class="inp" id="inp-coord" placeholder="47.1585, 27.6014 (lat, lng)" 
      value="${coordVal}"
      oninput="window._lastCoordVal=this.value"
      onkeydown="if(event.key==='Enter'){window._lastCoordVal=this.value;doCoord()}"
      onfocus="window._activeSearchCtx=this">
    <div class="help">Dublu-click pe hartă → completare automată. Funcționează pentru orice localitate din România.</div>
    <div class="btn-row">
      <button class="btn-p" style="flex:1" onclick="doCoord()">🎯 Mergi</button>
      <button class="btn-s" onclick="if(navigator.geolocation)navigator.geolocation.getCurrentPosition(p=>{const v=p.coords.latitude.toFixed(6)+', '+p.coords.longitude.toFixed(6);document.getElementById('inp-coord').value=v;window._lastCoordVal=v;doCoord()})">📡 GPS</button>
    </div>
  </div>

  <div class="section">🏠 Adresă sau punct de interes</div>
  <div class="card">
    <input class="inp" id="inp-addr"
      placeholder="Str. Lascar Catargi 54, Palas, Hotel Traian…"
      value="${addrVal}"
      autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
      inputmode="search"
      oninput="window._lastAddrVal=this.value;_addrOnInput(this.value)"
      onkeydown="if(event.key==='Enter'){event.preventDefault();clearTimeout(window._addrT);window._lastAddrVal=this.value;doAddr(this.value,true)}"
      onfocus="window._activeSearchCtx=this"
      onblur="setTimeout(()=>{ const v=this.value; if(v&&v.length>=4&&window._lastAddrSearch!==v) doAddr(v,true); },300)"
      style="margin-bottom:0">
    ${(()=>{
      // Restaurăm rezultatele dacă există (după re-render DOM)
      const pending = window._pendingAddrHtml || (window._pendingAddrResults?.length
        ? window._pendingAddrResults.map((it,i)=>`<div class='ri' onclick='pickAddr(${i})' style='-webkit-tap-highlight-color:transparent;padding:12px 11px'><div style='font-size:14px;font-weight:600;color:#e2e8f0'>${esc(it.text)}</div><div style='font-size:12px;color:#64748b;margin-top:2px'>${esc((it.place_name||'').slice(0,80))}</div></div>`).join('')
        : '');
      if(addrVal && pending) return `<div class="res-box" id="addr-box" style="margin-top:4px">${pending}</div>`;
      return `<div class="res-box" id="addr-box" style="margin-top:4px;${addrVal?'':'display:none'}"></div>`;
    })()}
    <div class="help" style="margin-top:6px">Adresă, stradă, POI — orice localitate din România și lume.</div>
  </div>

  <div class="section">🔢 Număr cadastral ${(()=>{const k=window.TCI?.cityKey||localStorage.getItem('ux_last_city')||'RO-IS-01';const db=window._RO_CITIES_DB||{};return db[k]?.name||'UAT';})()}</div>
  <div class="card">
    <input class="inp" id="inp-cad" placeholder="Ex: 127835" inputmode="numeric" autocomplete="off"
      value="${cadVal}"
      oninput="window._lastCadVal=this.value;onCadInput(this.value)"
      onkeydown="if(event.key==='Enter'){event.preventDefault();window._lastCadVal=this.value;doCad();mobSearchOverlayClose()}"
      onfocus="window._activeSearchCtx=this;if(this.value&&this.value.length>=2)onCadInput(this.value)">
    <div id="cad-range" class="help" style="color:#34d399;margin:4px 0 8px">✅ Disponibil: 60.000 – 183.379</div>
    <div class="btn-row">
      <button class="btn-p" onclick="window._lastCadVal=document.getElementById('inp-cad')?.value||window._lastCadVal||'';doCad()" style="flex:1">🔍 Caută</button>
      <button class="btn-s" onclick="window._lastCadVal='';window._lastAddrVal='';window._lastCoordVal='';doReset();renderTab('search')">🗑 Resetează tot</button>
    </div>
    <div class="res-box" id="cad-box"></div>
  </div>

  <div class="section">📦 Parcele cadastrale</div>
  <div class="card">
    <div class="help" style="margin-bottom:8px">Selectează UAT și încarcă parcelele din zona vizibilă. Fișierul este mare — se filtrează doar zona hărții.</div>
    <div class="btn-row" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">
      <button class="btn-p" onclick="doLoadLocalParcels()" style="flex:1;min-width:140px">📦 Parcele din zonă</button>
      <button class="btn-s" onclick="doClearParcels()" style="padding:9px 12px">✕ Șterge</button>
    </div>
    <div class="help" style="color:#34d399" id="cadastru-status">⏳ Se încarcă cadastrul…</div>
  </div>

  <div class="section">🔲 Multiselect parcele</div>
  <div class="card">
    <button onclick="toggleMulti(!S.multiMode);renderTab('search')" style="width:100%;padding:12px;border-radius:10px;border:2px solid ${S.multiMode?'#d4af37':'rgba(255,255,255,.2)'};background:${S.multiMode?'rgba(212,175,55,.2)':'rgba(11,18,32,.8)'};color:${S.multiMode?'#d4af37':'#94a3b8'};cursor:pointer;font-size:14px;font-weight:700;margin-bottom:8px;transition:all .2s">
      ${S.multiMode?'🟡 MULTISELECT ACTIV — click pe hartă adaugă parcele':'⬜ Activează Multiselect'}
    </button>
    ${S.parcels.length?`<div style="background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.3);border-radius:8px;padding:8px 10px;font-size:12px;color:#34d399;margin-top:4px">✅ <b>${S.parcels.length}</b> parcelă/parcele selectate</div>`:''}
  </div>

  <div class="section">🗺 Navigare hartă</div>
  <div class="card">
    <div class="btn-row" style="margin-bottom:8px">
      <button class="btn-p" onclick="set3D(60,-20)" style="flex:1">🏙 3D</button>
      <button class="btn-s" onclick="set2D()" style="flex:1">⬛ 2D</button>
      <button class="btn-s" onclick="map.easeTo({bearing:0,duration:600})" style="flex:1">🧭 Nord</button>
    </div>
    <div class="g3" style="margin-bottom:8px">
      <button class="btn-s" onclick="(()=>{const sel=document.getElementById('selBase');if(sel){sel.value='custom';sel.dispatchEvent(new Event('change'));}})()" style="font-size:11px;padding:7px 4px">🌆 Urban 3D</button>
      <button class="btn-s" onclick="(()=>{const sel=document.getElementById('selBase');if(sel){sel.value='standard';sel.dispatchEvent(new Event('change'));}})()" style="font-size:11px;padding:7px 4px">☀ Standard</button>
      <button class="btn-s" onclick="(()=>{const sel=document.getElementById('selBase');if(sel){sel.value='sat';sel.dispatchEvent(new Event('change'));}})()" style="font-size:11px;padding:7px 4px">🛰 Satelit</button>
    </div>
    <div style="margin-bottom:4px">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:2px"><span>Pitch</span><span id="pitchV2">0°</span></div>
      <input type="range" id="slPitch2" min="0" max="85" value="${Math.round(map?.getPitch?.()||0)}" style="width:100%;accent-color:#3b82f6"
        oninput="const v=+this.value;map.easeTo({pitch:v,duration:150});document.getElementById('pitchV2').textContent=v+'°';">
    </div>
    <div>
      <div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:2px"><span>Bearing</span><span id="bearV2">0°</span></div>
      <input type="range" id="slBearing2" min="0" max="360" value="${Math.round(((map?.getBearing?.()||0)+360)%360)}" style="width:100%;accent-color:#3b82f6"
        oninput="const v=+this.value;map.easeTo({bearing:v,duration:150});document.getElementById('bearV2').textContent=v+'°';">
    </div>
  </div>

  <div class="section" style="display:flex;align-items:center;justify-content:space-between">
    <span>⚡ Shortcut-uri rapide</span>
    <button onclick="showShortcutPicker()" style="background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.35);color:#d4af37;border-radius:6px;padding:2px 8px;font-size:10px;cursor:pointer;font-weight:700">✏ Editează</button>
  </div>
  <div class="card" style="display:flex;flex-direction:column;gap:8px">
    ${renderShortcuts()}
  </div>
  `;
}

// ═══ HTML UTR ══════════════════════════════════════════════════════════════
function htmlUTR(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap)return`<div class="card"><div style="color:#64748b">Selectează un teren pe hartă.</div></div>`;
  const r=REGULI[ap.utr]||{},u=ap.utr;
  const fnData=FN_UTR[S.vol.fn];
  const fnVal=valFunctiune(S.vol.fn,u);
  return`
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
      <div>
        <span class="badge b-b">📋 ${esc(ap.nrcad||'—')}</span>
        ${u?`<span class="badge b-g">🗺 UTR: ${esc(u)}</span>`:`<span class="badge b-y">⚠️ UTR necunoscut</span>`}
        <span class="badge" style="background:rgba(212,175,55,.15);color:#d4af37">${'📐 Cadastru local'}</span>
      </div>
      <button class="btn-s" onclick="centerOnParcel()" title="Centrează harta pe parcelă" style="padding:4px 10px;font-size:11px;flex-shrink:0">📍 Centrează</button>
    </div>
    <div class="g2" style="margin-top:9px">
      <div class="met"><div class="ml">Suprafață teren</div><div class="mv">${ap.area?Math.round(ap.area)+' m²':'—'}</div></div>
      <div class="met"><div class="ml">UTR</div><div class="mv">${esc(u||'—')}</div></div>
      ${r.d?`<div class="met" style="grid-column:span 2"><div class="ml">Descriere zonă</div><div class="mv">${esc(r.d)}</div></div>`:''}
    </div>
    ${r.ua?`
    <div class="met" style="margin-top:7px"><div class="ml">✅ Utilizări admise</div><div class="mv">${esc(r.ua)}</div></div>
    <div class="met" style="margin-top:6px"><div class="ml">⚠️ Condiționate</div><div class="mv">${esc(r.uc||'-')}</div></div>
    <div class="met" style="margin-top:6px"><div class="ml">🚫 Interzise</div><div class="mv">${esc(r.ui||'-')}</div></div>
    `:''}
  </div>
  <div class="section" style="margin-top:10px">🔍 Ce vrei să construiești?</div>
  ${(()=>{
    // ── Lookup UTR numeric folosind _findUTRNumericForParcel sau pugIdx direct ──
    let utrNr = ap.utr_nr;
    if (!utrNr) {
      // Folosim funcția din index.html dacă există
      if (typeof window._findUTRNumericForParcel === 'function') {
        utrNr = window._findUTRNumericForParcel(ap);
      } else if (S.pugIdx && S.pugIdx.length && ap.geo?.geometry) {
        // Fallback inline
        try {
          const ring = ap.geo.geometry.coordinates?.[0];
          if (ring?.length) {
            const cx = ring.reduce((s,p)=>s+p[0],0)/ring.length;
            const cy = ring.reduce((s,p)=>s+p[1],0)/ring.length;
            const pt = {type:'Feature',geometry:{type:'Point',coordinates:[cx,cy]},properties:{}};
            for (const entry of S.pugIdx) {
              if (cx<entry.bb[0]||cx>entry.bb[2]||cy<entry.bb[1]||cy>entry.bb[3]) continue;
              if (turf.booleanPointInPolygon(pt,{type:'Feature',geometry:entry.geom,properties:{}})) {
                utrNr = entry.UTR ? String(entry.UTR) : entry.utr;
                if (utrNr) { ap.utr_nr = utrNr; }
                break;
              }
            }
          }
        } catch(e) {}
      }
    }

    const cityKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
    const d = window._PUG_REGULI && window._PUG_REGULI[cityKey];
    const CATS = window._FunctionEngine?.cats || [];

    // ── Fallback la sistemul vechi dacă nu avem reguli noi ───────────────
    if (!d || !utrNr || !d.utrs[String(utrNr)] || !CATS.length) {
      return '<div class="'+(fnVal.status==='ok'?'ok-box':fnVal.status==='warn'?'warn-box':'err-box')+'">'+fnVal.msg+'</div>'
        +(fnData?'<div class="help">🅿️ Parcaje: <b>'+calcParcaje(S.vol.fn,ap.area,0,0)+'</b></div>':'');
    }

    const utrData = d.utrs[String(utrNr)];
    const subzone = d.subzone;
    const domSz = utrData.fn_dominanta;
    const domData = subzone[domSz] || {};
    const curSz = ap._subzona || domSz;
    const curData = subzone[curSz] || domData;
    const area = ap.area || 0;

    // ── Helper: box indicator ─────────────────────────────────────────────
    function ibox(label, val, unit, color, calc) {
      const display = val != null ? val+unit : '—';
      const calcStr = calc ? '<div style="font-size:9px;color:#64748b;margin-top:1px">'+calc+'</div>' : '';
      return '<div style="background:rgba(0,0,0,0.2);border-radius:7px;padding:6px 8px">'
        +'<div style="font-size:9px;color:#64748b;margin-bottom:2px">'+label+'</div>'
        +'<div style="font-size:14px;font-weight:700;color:'+color+'">'+display+'</div>'
        +calcStr+'</div>';
    }

    // ── Card indicatori subzonă curentă ───────────────────────────────────
    const pot = curData.pot_baza;
    const cut = curData.cut_baza;
    const h   = curData.hmax_m;
    const niv = curData.niv_max;
    const sv  = curData.spatii_verzi_pct;
    const pk  = curData.parcaje_min;
    const sf  = curData.suprafata_min_mp;
    const reg = curData.regim || '';

    const scSol  = pot && area ? Math.round(area * pot / 100) : null;
    const sdTot  = cut && area ? Math.round(area * cut)       : null;
    const svMp   = sv  && area ? Math.round(area * sv  / 100) : null;

    // Stare subzonă: dominant / complementar / PUZ
    const isDom   = curSz === domSz;
    const isAdm   = utrData.subzone_admise?.includes(curSz);
    const needPUZ = !isDom && isAdm;
    const statusBadge = isDom
      ? '<span style="background:rgba(52,211,153,0.15);color:#34d399;border:1px solid rgba(52,211,153,0.3);padding:2px 8px;border-radius:10px;font-size:10px;font-weight:600">✅ Funcțiune dominantă — fără PUZ</span>'
      : needPUZ
      ? '<span style="background:rgba(251,191,36,0.15);color:#fbbf24;border:1px solid rgba(251,191,36,0.3);padding:2px 8px;border-radius:10px;font-size:10px;font-weight:600">🟡 Admisă cu condiții — necesită PUZ/PUD</span>'
      : '<span style="background:rgba(239,68,68,0.12);color:#ef4444;border:1px solid rgba(239,68,68,0.3);padding:2px 8px;border-radius:10px;font-size:10px;font-weight:600">⛔ Interzisă în UTR '+utrNr+'</span>';

    // ── Selector subzonă (funcțiuni în limbaj uman) ───────────────────────
    const catBtns = CATS.map(cat => {
      return '<button onclick="window._selCat(\''+cat.id+'\',this)" data-cat="'+cat.id+'" '
        +'style="display:flex;flex-direction:column;align-items:center;justify-content:center;'
        +'padding:7px 2px;border-radius:8px;cursor:pointer;border:1px solid rgba(255,255,255,0.08);'
        +'background:rgba(255,255,255,0.03);color:#94a3b8;font-size:9px;font-weight:600;'
        +'transition:all 0.15s;flex:1;min-height:48px">'
        +'<span style="font-size:16px;margin-bottom:2px">'+cat.icon+'</span>'
        +'<span style="line-height:1.2;text-align:center">'+cat.label+'</span></button>';
    }).join('');

    return (
      // Header UTR + subzonă curentă
      '<div style="background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.2);border-radius:9px;padding:10px;margin-bottom:8px">'
        +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">'
          +'<div>'
            +'<div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.06em">UTR '+utrNr+' — '+esc(utrData.denumire||'')+'</div>'
            +'<div style="font-size:11px;color:#e2e8f0;margin-top:2px;font-weight:600">Subzonă: <span style="color:#d4af37">'+curSz+'</span> — '+esc((curData.denumire||'').slice(0,45))+'</div>'
          +'</div>'
        +'</div>'
        +statusBadge
        // Grid indicatori
        +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:8px">'
          +ibox('POT max', pot, '%', '#fbbf24', scSol ? scSol+'m² la sol' : null)
          +ibox('CUT max', cut, '', '#fbbf24', sdTot ? sdTot+'mp ADC' : null)
          +ibox('H max', h, 'm', '#34d399', niv ? niv+' niv' : null)
          +ibox('Sp. verzi', sv, '%', '#86efac', svMp ? svMp+'m²' : null)
          +ibox('Sf. min', sf, 'm²', '#94a3b8', null)
          +ibox('Regim', null, '', '#94a3b8', reg || '—')
        +'</div>'
        +(pk ? '<div style="font-size:10px;color:#64748b;margin-top:6px">🅿️ '+esc(pk)+'</div>' : '')
        +(curData.aliniament_note ? '<div style="font-size:9px;color:#475569;margin-top:4px">📐 '+esc(curData.aliniament_note.slice(0,80))+'</div>' : '')
      +'</div>'
      // Selector funcțiune
      +'<div style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Schimbă funcțiunea</div>'
      +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:6px">'+catBtns+'</div>'
      +'<div id="fn-items-list" style="display:none;margin-bottom:4px"></div>'
      +'<div id="fn-result"></div>'
    );
  })()}`;
}

// ═══ HTML INDICATORI ══════════════════════════════════════════════════════
function htmlIndicatori(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap)return`<div class="card"><div style="color:#64748b">Selectează un teren.</div></div>`;
  const r=REGULI[ap.utr]||{},p=ap.params||getDefaultParams(ap.utr);
  const m2=ap.area||0;
  const sC=p.pot&&m2?Math.floor(m2*p.pot/100):null;
  const sD=p.cut&&m2?Math.floor(m2*p.cut):null;
  const sV=p.sv&&m2?Math.floor(m2*p.sv/100):null;

  return`
  <div class="card">
    <div style="font-size:13px;color:#d4af37;font-weight:700;margin-bottom:10px">Indicatori Urbanistici — PUG ${(()=>{const k=window.TCI?.cityKey||localStorage.getItem('ux_last_city')||'RO-IS-01';const db=window._RO_CITIES_DB||{};return db[k]?.name||'UAT';})()}  · UTR: ${esc(ap.utr||'—')}</div>
    <div class="warn-box" style="margin-bottom:10px;font-size:11px">ℹ️ Valorile de mai jos sunt <b>maxime admise</b> conform PUG. POT = %, CUT = mp.ADC/mp.teren, H și aliniamente = metri, spații verzi = %, parcaje = nr. locuri (valori minime).</div>
    <table class="tbl">
      <tr><th>Indicator</th><th>PUG max/min</th><th>Pe teren tău (${m2?Math.round(m2)+'m²':'?'})</th></tr>
      <tr><td><b>POT</b> — Procentul de Ocupare a Terenului</td><td>${fmt(r.pot,'%')} <small>(maxim)</small></td><td>${sC?sC+' m²':'-'}</td></tr>
      <tr><td><b>CUT</b> — Coef. de Utilizare a Terenului (mp.ADC/mp.teren)</td><td>${fmt(r.cut)} <small>(maxim)</small></td><td>${sD?sD+' mp.ADC':'-'}</td></tr>
      <tr><td><b>Nr. niveluri</b> — maxim admis</td><td>${fmt(r.niv,' et.')} <small>(maxim)</small></td><td>—</td></tr>
      <tr><td><b>H max</b> — înălțime maximă</td><td>${fmt(r.h,' m')} <small>(maxim)</small></td><td>—</td></tr>
      <tr><td><b>Aliniament principal</b> (față stradă)</td><td>${fmt(r.rf,' m')} <small>(minim)</small></td><td>—</td></tr>
      <tr><td><b>Aliniament lateral stg.</b></td><td>${fmt(r.rl,' m')} <small>(minim)</small></td><td>—</td></tr>
      <tr><td><b>Aliniament lateral dr.</b></td><td>${fmt(r.rl,' m')} <small>(minim)</small></td><td>—</td></tr>
      <tr><td><b>Aliniament posterior</b> (spate)</td><td>${fmt(r.rs,' m')} <small>(minim)</small></td><td>—</td></tr>
      <tr><td><b>Spații verzi</b></td><td>${fmt(r.sv,'%')} <small>(minim)</small></td><td>${sV?sV+' m²':'-'}</td></tr>
      <tr><td><b>Parcaje</b> (per 100mp sau unitate)</td><td>${fmt(r.pk)} loc/100mp <small>(minim)</small></td><td>${ap.area?Math.ceil(ap.area/100*(r.pk||0))+' locuri':'-'}</td></tr>
      <tr><td><b>Aliniament obligatoriu</b></td><td>${esc(r.ao||'—')}</td><td>—</td></tr>
      <tr><td><b>Front minim stradă</b></td><td>${fmt(r.fm,' m')}</td><td>—</td></tr>
    </table>
  </div>
  </div>
  `
  +(S.ctx?.features?.length?`<div class="section">🌆 Context urban — clădiri în zonă</div>
  <div class="card"><div class="g2" style="margin-bottom:10px">
    <div class="met"><div class="ml">Clădiri analizate</div><div class="mv">${S.ctx.features.length}</div></div>
    <div class="met"><div class="ml">H medie context</div><div class="mv">${Math.round(S.ctx.features.reduce((s,f)=>s+(f.properties?.h||0),0)/Math.max(1,S.ctx.features.length))}m</div></div>
    <div class="met"><div class="ml">H max context</div><div class="mv warn">${Math.round(Math.max(...S.ctx.features.map(f=>f.properties?.h||0)))}m</div></div>
  </div>
  <div class="fl-leg">${(()=>{const cnt={};S.ctx.features.forEach(f=>{const fn2=f.properties?.fn||'yes';cnt[fn2]=(cnt[fn2]||0)+1;});return Object.entries(cnt).sort((a,b)=>b[1]-a[1]).map(([fn2,n])=>{const col2=BLD_COL[fn2]||'#8a9ab0';const lbl2=BLD_LABELS?.[fn2]||fn2;return '<div class="fl-dot"><span class="fl-sq" style="background:'+col2+'"></span>'+lbl2+' ('+n+')</div>';}).join('');})()}</div>
  </div>`:'')
;
}

// ═══ HTML PROIECT (Parametri + Volum unificate) ══════════════════════════
// ═══════════════════════════════════════════════════════════════════════════
// UI — 3 Scenarii Constructive
// ═══════════════════════════════════════════════════════════════════════════
function _htmlScenarii3(){
  if(!S.vol3) S.vol3 = {generated:false,active:null,activeTab:'optim',
    pug:{feats:[],metrics:{},params:{}},
    max:{feats:[],metrics:{},params:{}},
    optim:{feats:[],metrics:{},params:{}}};
  const v3  = S.vol3;
  const tab = v3.activeTab || 'optim';
  const gen = v3.generated;
  const act = v3.active;
  const C   = {pug:'#3b82f6',max:'#f59e0b',optim:'#34d399'};
  const IC  = {pug:'🔵',max:'🟠',optim:'🟢'};
  const LB  = {pug:'PUG',max:'Maxim',optim:'Optim'};
  const params = S.parcels[S.activeParcel??0]?.params || S.rule || {};
  // ── Info box contextualizat per scenariu activ ──────────────────────────
  const SCENARIO_INFO = {
    pug: {
      color: '#3b82f6',
      title: '🔵 Scenariul PUG — cum funcționează',
      desc: 'Folosește <b>parametrii exacți din RLU/PUG</b> pentru UTR-ul parcelei selectate.'
        +'<br>POT='+params?.pot+'% · CUT='+params?.cut+' · H max='+(params?.h||'N/S')+'m'
        +'<br>Retrageri: față '+params?.rf+'m · lateral '+params?.rl+'m · spate '+params?.rs+'m'
        +'<br>Scenariul de <b>referință legal</b> — nicio depășire posibilă fără PUZ/PUD.'
    },
    max: {
      color: '#f59e0b',
      title: '🟠 Scenariul Maxim — cum funcționează',
      desc: 'Utilizează <b>limita maximă admisă</b>: POT maxim, retrageri minime, calcan lateral.'
        +'<br>POT='+params?.pot+'% (100% amprentă pe lotul util) · H max conform PUG'
        +'<br>Retrageri minime: față '+params?.rf+'m · calcan lateral · spate minim'
        +'<br>Scenariul cel mai agresiv — verificare obligatorie AACR + studiu umbre.'
    },
    optim: {
      color: '#34d399',
      title: '🟢 Algoritmul Optim — cum funcționează',
      desc: 'Iterează niveluri 1→H_max PUG. Pentru fiecare N, calculează:'
        +'<br><b>Cost</b> = SDA × Cost/m² (870€ P, 980€ P+3, 1250€ bloc înalt)'
        +'<br><b>Venit</b> = SU (~80% din SDA) × Chirie (1520€/m², scade cu înălțimea)'
        +'<br><b>ROI</b> = (Venit - Cost) / (Cost + Teren€) × 100%'
        +'<br>Selectează N cu ROI maxim — balanță construcție vs piață vs teren.'
    }
  };
  const _sInfo = SCENARIO_INFO[tab] || SCENARIO_INFO.optim;

  // ── Butoane selecție tab ──────────────────────────────────────────────
  const tabBtns = ['pug','max','optim'].map(k=>{
    const on = tab===k;
    return '<button onclick="S.vol3.activeTab=\''+k+'\';renderTab(\'proiect\')" '
      +'style="flex:1;padding:9px 2px;border-radius:9px;border:2px solid '+(on?C[k]:'rgba(255,255,255,.08)')+';'
      +'background:'+(on?C[k]+'18':'rgba(11,18,32,.6)')+';'
      +'color:'+(on?C[k]:'#475569')+';cursor:pointer;font-size:10px;font-weight:800;'
      +'display:flex;flex-direction:column;align-items:center;gap:3px;transition:all .15s">'
      +'<span style="font-size:18px">'+IC[k]+'</span>'
      +'<span>'+LB[k]+'</span>'
      +(gen && v3[k]?.metrics?.niv ? '<span style="font-size:9px;opacity:.7">'+v3[k].metrics.niv+'niv·'+v3[k].metrics.hTot+'m</span>' : '')
      +'</button>';
  }).join('');

  // ── Butoane generare ──────────────────────────────────────────────────
  const btnSingle = '<button onclick="generateSingleScenariu(\''+tab+'\')" '
    +'style="flex:1;padding:10px 8px;border-radius:9px;border:1px solid '+C[tab]+';'
    +'background:'+C[tab]+'18;color:'+C[tab]+';cursor:pointer;font-size:11px;font-weight:800">'
    +'⚡ '+IC[tab]+' '+LB[tab]
    +'</button>';

  const btnAll = '<button onclick="generateAllScenarii()" '
    +'style="flex:1;padding:10px 8px;border-radius:9px;'
    +'background:linear-gradient(135deg,rgba(37,99,235,.35),rgba(217,119,6,.25),rgba(5,150,105,.35));'
    +'border:1px solid rgba(255,255,255,.18);color:#e2e8f0;cursor:pointer;font-size:11px;font-weight:800">'
    +'⚡ Toate 3 simultan'
    +'</button>';

  // ── Tabel comparator ─────────────────────────────────────────────────
  function cRow(label, fn, highlight, bestIsOptim){
    const mP = v3.pug.metrics   || {};
    const mM = v3.max.metrics   || {};
    const mO = v3.optim.metrics || {};
    const vals = [fn(mP), fn(mM), fn(mO)];
    const nums = vals.map(v=>parseFloat(v)||0);
    const maxN = Math.max(...nums);
    return '<tr style="border-bottom:1px solid rgba(255,255,255,.04)">'
      +'<td style="padding:6px 8px;color:#475569;font-size:10px;white-space:nowrap">'+label+'</td>'
      +vals.map((v,i)=>{
        const col = [C.pug,C.max,C.optim][i];
        const isHighlight = highlight && nums[i]===maxN && maxN>0;
        const isBest = bestIsOptim && i===2;
        return '<td style="text-align:center;padding:6px 8px;font-weight:'+(isHighlight||isBest?800:500)+';'
          +'color:'+(isBest?'#34d399':isHighlight?'#fbbf24':'#e2e8f0')+';white-space:nowrap">'
          +(isBest?'★ ':'')+v+'</td>';
      }).join('')
      +'</tr>';
  }

  const comparator = !gen ? '' :
    '<div style="background:#04090f;border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;margin-top:10px;overflow-x:auto">'
    +'<div style="font-size:9px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Comparator indicatori</div>'
    +'<table style="width:100%;border-collapse:collapse;font-size:11px">'
    +'<thead><tr style="border-bottom:1px solid rgba(255,255,255,.1)">'
    +'<th style="text-align:left;padding:6px 8px;color:#334155;font-size:9px;font-weight:700;text-transform:uppercase">Indicator</th>'
    +['pug','max','optim'].map(k=>'<th style="text-align:center;padding:6px 8px;color:'+C[k]+';font-size:11px">'+IC[k]+' '+LB[k]+'</th>').join('')
    +'</tr></thead>'
    +'<tbody>'
    +cRow('Niveluri',        m=>m.niv  ? m.niv+'niv' : '—', false, false)
    +cRow('H total',         m=>m.hTot ? m.hTot+'m'  : '—', false, false)
    +cRow('SC la sol',       m=>m.scMp ? m.scMp+'mp' : '—', true,  false)
    +cRow('SD totală',       m=>m.sdMp ? m.sdMp+'mp' : '—', true,  false)
    +cRow('POT real',        m=>m.potReal>=0 ? m.potReal+'%' : '—', true, false)
    +cRow('SV minim (mp)',   m=>m.svMp ? m.svMp+'mp' : '—', false, false)
    +cRow('Parcaje necesare',m=>m.pkNec>=0 ? m.pkNec+' loc' : '—', false, false)
    +cRow('ROI estimat',     m=>m.roi  ? m.roi+'%'   : '—', false, true)
    +'</tbody></table>'
    +'</div>';

  // ── Toggle vizualizare pe hartă ───────────────────────────────────────
  const vizBtns = !gen ? '' :
    '<div style="margin-top:10px">'
    +'<div style="font-size:9px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px">Vizualizare hartă</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:4px">'
    +['pug','max','optim'].map(k=>{
      const on = act===k;
      return '<button onclick="_setActiveScenario3(\''+k+'\')" '
        +'style="padding:7px 2px;border-radius:7px;border:1px solid '+(on?C[k]:'rgba(255,255,255,.08)')+';'
        +'background:'+(on?C[k]+'20':'transparent')+';color:'+(on?C[k]:'#475569')+';'
        +'cursor:pointer;font-size:10px;font-weight:700">'+IC[k]+' '+k.toUpperCase()+'</button>';
    }).join('')
    +'<button onclick="_setActiveScenario3(\'all\')" '
    +'style="padding:7px 2px;border-radius:7px;border:1px solid '+(act==='all'?'#d4af37':'rgba(255,255,255,.08)')+';'
    +'background:'+(act==='all'?'rgba(212,175,55,.12)':'transparent')+';'
    +'color:'+(act==='all'?'#d4af37':'#475569')+';cursor:pointer;font-size:10px;font-weight:700">◉ Toate</button>'
    +'</div>'
    +'<div style="font-size:9px;color:#334155;margin-top:5px">◉ Toate = stivă colorată: 🔵 PUG · 🟠 Maxim · 🟢 Optim</div>'
    +'</div>';

  // ── Asamblare ─────────────────────────────────────────────────────────
  return '<div class="card" style="background:#06111f;border:1px solid rgba(59,130,246,.22);padding:12px;margin-bottom:10px">'

    // Header cu info box dinamic per scenariu
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">'
    +'<div style="font-size:12px;font-weight:800;color:#d4af37;letter-spacing:.04em">⚡ SCENARII CONSTRUCTIVE</div>'
    +'<div style="margin-top:4px;padding:8px 10px;background:'+_sInfo.color+'0e;border-radius:8px;border-left:2px solid '+_sInfo.color+'">'
    +'<div style="font-size:10px;font-weight:700;color:'+_sInfo.color+';margin-bottom:4px">'+_sInfo.title+'</div>'
    +'<div style="font-size:9px;color:#64748b;line-height:1.6">'+_sInfo.desc+'</div>'
    +'</div>'
    +(gen
      ? '<span style="font-size:9px;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.25);color:#34d399;border-radius:999px;padding:2px 9px">✓ generate</span>'
      : '<span style="font-size:9px;color:#334155">selectați un scenariu și generați</span>'
    )
    +'</div>'

    // Selector tab
    +'<div style="display:flex;gap:5px;margin-bottom:10px">'
    +tabBtns
    +'</div>'

    // Butoane
    +'<div style="display:flex;gap:6px">'
    +btnSingle+btnAll
    +'</div>'

    // Comparator + viz
    +comparator
    +vizBtns

    +'</div>';
}

function htmlProiect(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap) return '<div class="card"><div style="color:#64748b">Selectează un teren pe hartă.</div></div>';
  const utrResolved = resolveUTR(ap.utr||'');
  // Daca UTR nu e in REGULI, afisam avertisment si folosim reguli default
  if(utrResolved && !REGULI[utrResolved] && utrResolved!=='EXT' && utrResolved!=='EXT_COM'){
    // UTR valid din PUG dar fara reguli definite in aplicatie
    // Adaugam la runtime cu valori goale pentru a nu bloca UI
    if(!REGULI[utrResolved]){
      REGULI[utrResolved] = {
        d:'UTR '+utrResolved+' — reguli detaliate nedefinite în aplicație',
        pot:null,cut:null,niv:null,h:null,rf:null,rl:null,rs:null,sv:null,pk:null,
        ua:'Consultați PUG UAT-ului activ — Regulament Local de Urbanism pentru UTR '+utrResolved,
        uc:'—',ui:'—',
        obs:'⚠️ Regulile pentru UTR '+utrResolved+' nu sunt complet definite în UrbanX. Verificați PUG oficial.'
      };
    }
  }
  const r = REGULI[utrResolved||ap.utr]||{};
  const p = ap.params || getDefaultParams(ap.utr);
  const m2 = ap.area||0;
  const fp = ap.geo?.geometry ? buildFP(ap.geo.geometry, p) : null;
  const fp_m2 = fp?.geometry ? Math.round(turf.area(fp)) : 0;
  const sv_m2 = Math.round(m2 * (p.sv||0) / 100);
  const pot_m2 = p.pot ? Math.floor(m2 * p.pot/100) : fp_m2;
  const construibil_real = Math.min(fp_m2, pot_m2);
  const hNiv = Number(S.vol.hNiv||3);
  const totalH = Number(p.niv||S.vol.niv||4) * hNiv; // niv × hNiv
  const realNiv = Math.max(1, Math.round(totalH / hNiv));
  const sD_calc = Math.round(construibil_real * realNiv);
  const sD_max = p.cut&&m2 ? Math.floor(m2*p.cut) : null;
  const pkNec = Math.ceil((fp_m2 * realNiv / 100) * (p.pk||0));
  const fnVal = valFunctiune(S.vol.fn, ap.utr);
  const PUZK = ['cut'];

  function pf(label, key, unit, hint){
    const v = p[key]??''; const vPUG = r[key];
    const pct = vPUG!=null&&Number(v)>0&&Number(vPUG)>0?(Number(v)/Number(vPUG)-1)*100:0;
    const ovr = PUZK.includes(key)&&vPUG!=null&&Number(v)>Number(vPUG)*1.2;
    const changed = vPUG!=null&&Math.abs(Number(v)-Number(vPUG))>0.001;
    const border = ovr?'border-color:#f59e0b':changed?'border-color:#3b82f6':'';
    const wMsg = ovr ? '<div style="font-size:10px;color:#fbbf24;margin-top:2px">PUZ posibil (+'+pct.toFixed(0)+'%)</div>' : '';
    const mMsg = (!ovr&&changed&&vPUG!=null)?'<div style="font-size:10px;color:#60a5fa;margin-top:2px">'+(pct>0?'+':'')+pct.toFixed(0)+'% vs PUG</div>':'';
    return '<div>'
      +'<div class="ml" style="display:flex;justify-content:space-between">'
      +'<span>'+label+(unit?' ('+unit+')':'')+'</span>'
      +'<span style="color:#475569;font-size:10px">PUG: <b>'+(vPUG!=null?vPUG:'-')+'</b></span>'
      +'</div>'
            +'<input class="inp" type="number" value="'+v+'" min="0"'      +' max="'+(key==='pot'?'100':key==='sv'?'95':key==='cut'?'20':key==='niv'?'50':key==='h'?'200':'50')+'"'      +' step="'+(key==='cut'?'0.1':'1')+'"'      +' oninput="updateParamLive(this.dataset.key,this.value)"'      +' onchange="updateParam(this.dataset.key,this.value,true)"'      +' data-key="'+key+'"'      +' style="margin-bottom:0;'+border+'" title="'+(hint||'')+'">'  
      +wMsg+mMsg+'</div>';
  }

  const flLeg = S.vol.genDone ? Array.from({length:Math.min(realNiv,12)},(_,i)=>
    '<div class="fl-dot"><span class="fl-sq" style="background:'+FLOOR_COLORS[i]+';"></span>'+(i===0?'P':'Et.'+i)+'</div>').join('') : '';

  const neconstruibil = Math.round(sv_m2 + Math.max(0, m2 - fp_m2 - sv_m2));
  const pot_real = m2>0 ? Math.round(construibil_real/m2*100) : 0;
  const overCut = sD_max && sD_calc > sD_max;

  return [
  // ── CONFLICT QUICK CHECK (audit) ─────────────────────────────────────────
  (()=>{
    const _cf=[];
    const _h_max = parseFloat(p.h||0);
    const _aH = S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||0;
    const _dist = typeof S_UAT!=='undefined' ? (S_UAT.aeroport?.distanta_km||30) : 30;
    if(_h_max>0 && _aH > _h_max+0.5) _cf.push('H propus '+_aH.toFixed(1)+'m > H max PUG '+_h_max+'m');
    if(_dist < 15) _cf.push('Aeroport la '+_dist+'km — aviz AACR obligatoriu');
    if(overCut) _cf.push('SDA depășește CUT max ('+sD_calc+' > '+(sD_max||'?')+' mp)');
    if(_cf.length===0) return '';
    return '<div style="background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.35);border-radius:10px;padding:9px 12px;margin-bottom:8px;font-size:11px">'
      +'<div style="color:#ef4444;font-weight:700;margin-bottom:4px">⚡ '+_cf.length+' conflict'+(+_cf.length>1?'e':'')+' detectat'+(+_cf.length>1?'e':'')+' — Studiu Amplasament recomandat</div>'
      +_cf.map(c=>'<div style="color:#fca5a5;padding:2px 0">• '+c+'</div>').join('')
      +'</div>';
  })(),
  // ── SCENARII CONSTRUCTIVE (nou) ──
  _htmlScenarii3(),
  // ── SEPARATOR ──
  '<div style="height:1px;background:rgba(255,255,255,.05);margin:0 0 8px"></div>',
  // ── CALCULE LIVE ──
  '<div class="card" style="background:#0a1628;border-color:rgba(212,175,55,.3)">',
  '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:6px"><div style="font-size:12px;font-weight:700;color:#d4af37">📐 Calcule live — '+esc(ap.nrcad||'?')+' · UTR: '+esc(ap.utr||'—')+'</div><div id="zone-badge" style="font-size:10px;padding:2px 8px;border-radius:20px;border:1px solid #34d39955;background:#34d39915;color:#34d399">Detectare zonă…</div></div>','<div id="live-calcule" style="font-size:11px;color:#94a3b8;margin-bottom:8px;padding:5px 8px;background:#080f1c;border-radius:6px">Modifică parametrii pentru a vedea calculele live</div>',
  '<div class="g3">',
  '<div class="met"><div class="ml">Teren total</div><div class="mv">'+(m2?Math.round(m2)+' m²':'—')+'</div></div>',
  '<div class="met"><div class="ml">Spații verzi obligatorii</div><div class="mv warn">'+(sv_m2?sv_m2+' m²  ('+( p.sv||0)+'%)':'—')+'</div></div>',
  '<div class="met"><div class="ml">Suprafață la sol max (POT)</div><div class="mv gold">'+(construibil_real?construibil_real+' m²':'—')+'<div style="font-size:10px;color:#64748b">POT real: '+pot_real+'%</div></div></div>',
  '</div>',
  '<div class="g3" style="margin-top:7px">',
  '<div class="met"><div class="ml">Niveluri</div><div class="mv">'+realNiv+' et. × '+hNiv+'m</div></div>',
  '<div class="met"><div class="ml">H total</div><div class="mv">'+totalH.toFixed(1)+' m</div></div>',
  '<div class="met"><div class="ml">Supraf. desfășurată (CUT)</div><div class="mv '+(overCut?'err':'gold')+'">'+sD_calc+' mp.ADC'+(sD_max?'<div style="font-size:10px;color:#64748b">max CUT: '+sD_max+' mp.ADC</div>':'')+'</div></div>',
  '</div>',
  '<div class="g3" style="margin-top:7px">',
  '<div class="met"><div class="ml">Parcaje necesare</div><div class="mv">'+pkNec+' locuri</div></div>',
  '<div class="met"><div class="ml">Teren neconstruibil</div><div class="mv">'+neconstruibil+' m²<div style="font-size:10px;color:#64748b">SV+aliniamente</div></div></div>',
  '<div class="met"><div class="ml">Funcțiune</div><div class="mv" style="font-size:11px">'+esc(FN_UTR[S.vol.fn]?.label||S.vol.fn)+'</div></div>',
  '</div>',
  overCut ? '<div class="err-box" style="margin-top:8px;font-size:11px">⚠️ Suprafața desfășurată ('+sD_calc+' m²) depășește CUT maxim ('+sD_max+' m²)</div>' : '',
  '</div>',
  // ── FUNCȚIUNE ──
  '<div class="section">Funcțiune propusă</div>',
  '<select class="sel" onchange="S.vol.fn=this.value;renderTab(\'proiect\')">',
  Object.entries(FN_UTR).map(([k,v])=>'<option value="'+k+'" '+(S.vol.fn===k?'selected':'')+'>'+v.label+'</option>').join(''),
  '</select>',
  '<div class="'+(fnVal.status==='ok'?'ok-box':fnVal.status==='warn'?'warn-box':'err-box')+'" style="font-size:11px">'+fnVal.msg+'</div>',
  // ── VOLUM 3D ──
  `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:#080f1c;border-radius:10px;border:1px solid rgba(212,175,55,.2);margin-bottom:8px">
    <div>
      <div style="font-size:11px;font-weight:700;color:#d4af37">🏗 Volum brut — conform PUG</div>
      <div style="font-size:10px;color:#64748b;margin-top:2px">Editează parametrii și generează volumul</div>
    </div>
    <button onclick="aedisOpen()" style="padding:7px 12px;border-radius:8px;border:1px solid rgba(212,175,55,.4);background:rgba(212,175,55,.1);color:#d4af37;cursor:pointer;font-size:11px;font-weight:700">⚡ Urban3D →</button>
  </div>`,


  '<div class="section">🏗 Volum 3D</div>',
  '<div class="card" style="background:#08152a">',
  '<div class="help" style="margin-bottom:6px">Nivelurile și înălțimea se setează în <b>Parametri urbanistici</b> mai jos (Nr. niveluri, H max). Aici setezi doar forma și generezi.</div>',
  '<div class="g2">',
  '<div><div class="help">H/nivel (m)</div><input class="inp" type="number" min="2.4" max="6" step="0.1" value="'+S.vol.hNiv+'" onchange="S.vol.hNiv=Math.max(2.4,+this.value);if(S.vol.genDone){const f=buildVolume();setSource(\'vol-src\',{type:\'FeatureCollection\',features:f});}renderTab(\'proiect\')"></div>',
  '<div><div class="help">Factor amprentă (0.1–1.0)</div><input class="inp" type="number" min="0.1" max="1" step="0.05" value="'+S.vol.fpF+'" onchange="S.vol.fpF=Math.max(0.1,Math.min(1,+this.value));updateMap();if(S.vol.genDone){const f=buildVolume();setSource(\'vol-src\',{type:\'FeatureCollection\',features:f});}renderTab(\'proiect\')"></div>',
  '</div>',
  /* H override eliminat - H max = niv × H/nivel */
  '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:8px">',
  '<label style="display:flex;gap:5px;align-items:center;cursor:pointer;font-size:13px"><input type="checkbox" '+(S.vol.retras?'checked':'')+' onchange="S.vol.retras=this.checked;if(S.vol.genDone){const f=buildVolume();setSource(\'vol-src\',{type:\'FeatureCollection\',features:f});}"> Etaj retras</label>',
  '<label style="display:flex;gap:5px;align-items:center;cursor:pointer;font-size:13px"><input type="checkbox" '+(S.vol.terasa?'checked':'')+' onchange="S.vol.terasa=this.checked;if(S.vol.genDone){const f=buildVolume();setSource(\'vol-src\',{type:\'FeatureCollection\',features:f});}"> Terasă</label>',
  '<label style="display:flex;gap:5px;align-items:center;cursor:pointer;font-size:13px"><input type="checkbox" '+(S.vol.onlyVol?'checked':'')+' onchange="S.vol.onlyVol=this.checked;_setCtxVisibility()"> Doar volumul meu</label>',
  '</div>',
  '<div class="btn-row">',
  '<button class="btn-p" onclick="genVol()" style="flex:1;font-size:14px">🏗 Generează volum 3D</button>',
  '<button class="btn-s" onclick="clearVol()">✕ Șterge</button>',
  '</div></div>',
  // ── SCENARIU CONSTRUCTIE ──
  '<div class="section">🏗 Scenariu construcție</div>',
  '<div class="card" style="background:#08152a;margin-bottom:8px">',
  '<div class="help" style="margin-bottom:8px">Alege cum gestionezi clădirile existente pe teren:</div>',
  '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:5px;margin-bottom:5px">',
  '<button onclick="setS(this)" data-s="liber" style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:8px 4px;border-radius:9px;cursor:pointer;font-size:10px;text-align:center;border:2px solid '+((S.vol.scenariuConstructie==='liber'||!S.vol.scenariuConstructie)?'#d4af37':'rgba(255,255,255,.15)')+';background:'+((S.vol.scenariuConstructie==='liber'||!S.vol.scenariuConstructie)?'rgba(212,175,55,.15)':'rgba(11,18,32,.8)')+';color:#e2e8f0">🏚 Demolare<br><small>Teren liber</small></button>',
  '<button onclick="setS(this)" data-s="extindere_h" style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:8px 4px;border-radius:9px;cursor:pointer;font-size:10px;text-align:center;border:2px solid '+(S.vol.scenariuConstructie==='extindere_h'?'#3b82f6':'rgba(255,255,255,.15)')+';background:'+(S.vol.scenariuConstructie==='extindere_h'?'rgba(59,130,246,.15)':'rgba(11,18,32,.8)')+';color:#e2e8f0">🔗 Extindere<br><small>Orizontal</small></button>',
  '<button onclick="setS(this)" data-s="extindere_v" style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:8px 4px;border-radius:9px;cursor:pointer;font-size:10px;text-align:center;border:2px solid '+(S.vol.scenariuConstructie==='extindere_v'?'#34d399':'rgba(255,255,255,.15)')+';background:'+(S.vol.scenariuConstructie==='extindere_v'?'rgba(52,211,153,.15)':'rgba(11,18,32,.8)')+';color:#e2e8f0">🏗 Extindere<br><small>V+H</small></button>',
  '<button onclick="toggleMultiVol()" style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:8px 4px;border-radius:9px;cursor:pointer;font-size:10px;text-align:center;border:2px solid '+(S.vol.multiVol?'#f59e0b':'rgba(255,255,255,.15)')+';background:'+(S.vol.multiVol?'rgba(245,158,11,.15)':'rgba(11,18,32,.8)')+';color:#e2e8f0">🏙 Multiple<br><small>Volume</small></button>',
  '</div>',
  '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:5px">',
  '<button onclick="setS(this)" data-s="mansardare" style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:8px 4px;border-radius:9px;cursor:pointer;font-size:10px;text-align:center;border:2px solid '+(S.vol.scenariuConstructie==='mansardare'?'#f472b6':'rgba(255,255,255,.15)')+';background:'+(S.vol.scenariuConstructie==='mansardare'?'rgba(244,114,182,.15)':'rgba(11,18,32,.8)')+';color:#e2e8f0">🏠 Mansardare<br><small>Supraetajare</small></button>',
  '<button onclick="setS(this)" data-s="consolidare" style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:8px 4px;border-radius:9px;cursor:pointer;font-size:10px;text-align:center;border:2px solid '+(S.vol.scenariuConstructie==='consolidare'?'#fb923c':'rgba(255,255,255,.15)')+';background:'+(S.vol.scenariuConstructie==='consolidare'?'rgba(251,146,60,.15)':'rgba(11,18,32,.8)')+';color:#e2e8f0">🔧 Consolidare<br><small>Reabilitare</small></button>',
  '<button onclick="setS(this)" data-s="reconversie" style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:8px 4px;border-radius:9px;cursor:pointer;font-size:10px;text-align:center;border:2px solid '+(S.vol.scenariuConstructie==='reconversie'?'#a78bfa':'rgba(255,255,255,.15)')+';background:'+(S.vol.scenariuConstructie==='reconversie'?'rgba(167,139,250,.15)':'rgba(11,18,32,.8)')+';color:#e2e8f0">🔄 Reconversie<br><small>Funcțională</small></button>',
  '<button onclick="setS(this)" data-s="inglobare" style="touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:8px 4px;border-radius:9px;cursor:pointer;font-size:10px;text-align:center;border:2px solid '+(S.vol.scenariuConstructie==='inglobare'?'#38bdf8':'rgba(255,255,255,.15)')+';background:'+(S.vol.scenariuConstructie==='inglobare'?'rgba(56,189,248,.15)':'rgba(11,18,32,.8)')+';color:#e2e8f0">🏛 Înglobare<br><small>Corp nou+exist.</small></button>',
  '</div>',
  ...(S.vol.multiVol ? htmlMultiVolUI() : []),
  '<div class="help" style="margin-top:6px;font-size:10px;padding:6px 8px;background:rgba(255,255,255,.03);border-radius:7px">'+
    (S.vol.scenariuConstructie==='extindere_h'?'🔗 Volum nou pe zona liberă, lângă clădirile existente care rămân.':
    S.vol.scenariuConstructie==='extindere_v'?'🏗 Corp nou integrat vertical și orizontal cu existentele.':
    S.vol.scenariuConstructie==='mansardare'?'🏠 Adaugă mansardă/etaj peste clădirile existente. Supraetajare parțială sau totală.':
    S.vol.scenariuConstructie==='consolidare'?'🔧 Clădirile existente se reabilitează și consolidează structural. Fără demolare.':
    S.vol.scenariuConstructie==='reconversie'?'🔄 Schimbare funcțiune fără demolare. Reamenajare interioară + eventuale intervenții exterioare.':
    S.vol.scenariuConstructie==='inglobare'?'🏛 Clădirile existente sunt înglobate într-un corp arhitectural nou extins.':
    '🏚 Toate construcțiile existente se demolează. Teren complet liber conform PUG.')+'</div>',
  '</div>',
  // ── ORIENTARE ──
  '<div class="section">🧭 Front stradal — spre ce direcție este strada?</div>',
  // Legenda culori
  `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;padding:7px 10px;background:rgba(11,18,32,.8);border-radius:8px;border:1px solid rgba(255,255,255,.08)">
    <span style="font-size:10px;color:#94a3b8;width:100%;margin-bottom:2px;font-weight:600;letter-spacing:.5px">LEGENDĂ LATURI PE HARTĂ:</span>
    <span style="display:flex;align-items:center;gap:5px;font-size:11px;font-weight:700;color:#FFD700"><span style="width:22px;height:5px;background:#FFD700;border-radius:3px;display:inline-block;box-shadow:0 0 6px #FFD700"></span>🟡 FRONT stradal</span>
    <span style="display:flex;align-items:center;gap:5px;font-size:11px;font-weight:700;color:#FF4444"><span style="width:22px;height:5px;background:#FF4444;border-radius:3px;display:inline-block;box-shadow:0 0 6px #FF4444"></span>🔴 SPATE</span>
    <span style="display:flex;align-items:center;gap:5px;font-size:11px;font-weight:700;color:#22D3EE"><span style="width:22px;height:5px;background:#22D3EE;border-radius:3px;display:inline-block;box-shadow:0 0 6px #22D3EE"></span>🔵 Lateral stg</span>
    <span style="display:flex;align-items:center;gap:5px;font-size:11px;font-weight:700;color:#C084FC"><span style="width:22px;height:5px;background:#C084FC;border-radius:3px;display:inline-block;box-shadow:0 0 6px #C084FC"></span>🟣 Lateral dr</span>
  </div>`,
  // Rozetă + butoane directie
  `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px">
    <div style="position:relative;width:90px;height:90px;flex-shrink:0">
      <div style="position:absolute;inset:0;border-radius:50%;border:2px solid rgba(255,255,255,.12);background:rgba(8,15,32,.95)"></div>
      <div style="position:absolute;top:50%;left:0;right:0;height:1px;background:rgba(255,255,255,.08);transform:translateY(-50%)"></div>
      <div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:rgba(255,255,255,.08);transform:translateX(-50%)"></div>
      <div style="position:absolute;top:50%;left:50%;width:0;height:0;transform-origin:0 0;transform:rotate(${S.bearing}deg) translate(-50%,-100%);pointer-events:none;margin-top:-4px">
        <div style="width:4px;height:28px;background:linear-gradient(to bottom,#FFD700,rgba(255,215,0,.2));border-radius:2px;transform:translateX(-50%)"></div>
        <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:9px solid #FFD700;transform:translateX(-50%) translateY(-28px)"></div>
      </div>
      <div style="position:absolute;top:50%;left:50%;width:8px;height:8px;background:#FFD700;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 8px #FFD700"></div>
      <div style="position:absolute;top:3px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:#64748b">N</div>
      <div style="position:absolute;bottom:3px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:#64748b">S</div>
      <div style="position:absolute;right:4px;top:50%;transform:translateY(-50%);font-size:9px;font-weight:700;color:#64748b">E</div>
      <div style="position:absolute;left:4px;top:50%;transform:translateY(-50%);font-size:9px;font-weight:700;color:#64748b">V</div>
    </div>
    <div style="flex:1">
      <div style="font-size:10px;color:#94a3b8;margin-bottom:5px">Strada este spre:</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-bottom:6px">
        <button onclick="setBearing(0)" style="padding:5px 4px;border-radius:6px;cursor:pointer;font-size:11px;border:1px solid rgba(255,255,255,.1);background:rgba(11,18,32,.7);color:#64748b" id="brg-0">↑ Nord</button>
        <button onclick="setBearing(90)" style="padding:5px 4px;border-radius:6px;cursor:pointer;font-size:11px;border:1px solid rgba(255,255,255,.1);background:rgba(11,18,32,.7);color:#64748b" id="brg-90">→ Est</button>
        <button onclick="setBearing(180)" style="padding:5px 4px;border-radius:6px;cursor:pointer;font-size:11px;border:1px solid rgba(255,255,255,.1);background:rgba(11,18,32,.7);color:#64748b" id="brg-180">↓ Sud</button>
        <button onclick="setBearing(270)" style="padding:5px 4px;border-radius:6px;cursor:pointer;font-size:11px;border:1px solid rgba(255,255,255,.1);background:rgba(11,18,32,.7);color:#64748b" id="brg-270">← Vest</button>
        <button onclick="setBearing(45)" style="padding:5px 4px;border-radius:6px;cursor:pointer;font-size:11px;border:1px solid rgba(255,255,255,.1);background:rgba(11,18,32,.7);color:#64748b" id="brg-45">↗ NE</button>
        <button onclick="setBearing(135)" style="padding:5px 4px;border-radius:6px;cursor:pointer;font-size:11px;border:1px solid rgba(255,255,255,.1);background:rgba(11,18,32,.7);color:#64748b" id="brg-135">↘ SE</button>
        <button onclick="setBearing(225)" style="padding:5px 4px;border-radius:6px;cursor:pointer;font-size:11px;border:1px solid rgba(255,255,255,.1);background:rgba(11,18,32,.7);color:#64748b" id="brg-225">↙ SV</button>
        <button onclick="setBearing(315)" style="padding:5px 4px;border-radius:6px;cursor:pointer;font-size:11px;border:1px solid rgba(255,255,255,.1);background:rgba(11,18,32,.7);color:#64748b" id="brg-315">↖ NV</button>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <input id="bearing-slider" type="range" min="0" max="359" value="${S.bearing}" 
          oninput="setBearing(+this.value)" 
          style="flex:1;accent-color:#FFD700;height:3px">
        <span id="bearing-value" style="color:#FFD700;font-size:13px;font-weight:700;min-width:38px">${S.bearing}°</span>
      </div>
    </div>
  </div>`,
  '<button class="btn-s" onclick="detectAndSetBearing()" style="margin-bottom:8px;width:100%;background:rgba(34,211,238,.08);border-color:rgba(34,211,238,.4);color:#22D3EE">🔍 Auto-detectează frontul din OSM</button>',
  '<div style="display:flex;gap:4px;margin-bottom:10px">',
  '<span style="font-size:11px;color:#94a3b8;flex-shrink:0;line-height:32px">Fronturi:</span>',
  '<button onclick="setFC(1)" style="flex:1;padding:6px;border-radius:6px;border:1px solid '+(S.vol.frontCount===1?'#FFD700':'rgba(255,255,255,.12)')+';background:'+(S.vol.frontCount===1?'rgba(255,215,0,.12)':'rgba(11,18,32,.6)')+';color:'+(S.vol.frontCount===1?'#FFD700':'#64748b')+';cursor:pointer;font-size:11px;font-weight:'+(S.vol.frontCount===1?'700':'400')+'">1 față</button>',
  '<button onclick="setFC(2)" style="flex:1;padding:6px;border-radius:6px;border:1px solid '+(S.vol.frontCount===2?'#FFD700':'rgba(255,255,255,.12)')+';background:'+(S.vol.frontCount===2?'rgba(255,215,0,.12)':'rgba(11,18,32,.6)')+';color:'+(S.vol.frontCount===2?'#FFD700':'#64748b')+';cursor:pointer;font-size:11px;font-weight:'+(S.vol.frontCount===2?'700':'400')+'">2 (colț)</button>',
  '<button onclick="setFC(3)" style="flex:1;padding:6px;border-radius:6px;border:1px solid '+(S.vol.frontCount===3?'#FFD700':'rgba(255,255,255,.12)')+';background:'+(S.vol.frontCount===3?'rgba(255,215,0,.12)':'rgba(11,18,32,.6)')+';color:'+(S.vol.frontCount===3?'#FFD700':'#64748b')+';cursor:pointer;font-size:11px;font-weight:'+(S.vol.frontCount===3?'700':'400')+'">3+ fețe</button>',
  '</div>',

  // ── PARAMETRI URBANISTICI ──
  '<div class="section">⚙️ Parametri urbanistici editabili</div>',
  '<div class="card" style="background:#08152a">',
  '<div class="help" style="margin-bottom:8px">Modificările se reflectă <b>live</b> în calcule și volum. Aliniamente mari = suprafață construibilă mai mică. SV mare = suprafață construibilă mai mică.</div>',
  '<div class="g2">'+pf('POT max (%)','pot','%','Procent ocupare teren — maxim')+pf('CUT max (mp.ADC/mp)','cut','','Coeficient utilizare — maxim')+'</div>',
  '<div class="g2">'+pf('Nr. niveluri max','niv','et.','Număr maxim de niveluri admis')+'<div>'+'<div class="ml" style="display:flex;justify-content:space-between">'+'<span>H total (m)</span>'+'<span style="color:#475569;font-size:10px">PUG: <b>'+(r.h||'-')+'m</b></span>'+'</div>'+'<div class="inp" style="background:#04090f;color:#d4af37;font-weight:700;cursor:default;padding:10px 12px;margin-bottom:0">'+((pN(ap.params?.niv)||1)*Number(S.vol.hNiv||3)).toFixed(1)+' m = '+(pN(ap.params?.niv)||1)+' et. × '+Number(S.vol.hNiv||3)+'m'+(r.h&&((pN(ap.params?.niv)||1)*Number(S.vol.hNiv||3))>r.h?' ⚠ PUG: '+r.h+'m':'')+'</div></div></div>',
  '<div class="section" style="margin-top:8px">Aliniamente minime (metri de la construcție la limita terenului)</div>',
  // Toggle mod clasic / per latură
  '<div style="display:flex;gap:6px;margin-bottom:8px;align-items:center">'+
    '<button onclick="S.vol.perSideMode=false;updateMap();renderTab(\'proiect\')" '+
      'style="flex:1;padding:5px 8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid '+(S.vol.perSideMode?'rgba(255,255,255,.15)':'#d4af37')+';background:'+(S.vol.perSideMode?'rgba(11,18,32,.6)':'rgba(212,175,55,.2)')+';color:'+(S.vol.perSideMode?'#64748b':'#d4af37')+'">'+
      '⚡ Mod clasic (rf/rs/rl)</button>'+
    '<button onclick="S.vol.perSideMode=true;if(!S.vol.sideSetbacks)S.vol.sideSetbacks={};updateMap();renderTab(\'proiect\')" '+
      'style="flex:1;padding:5px 8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid '+(S.vol.perSideMode?'#38bdf8':'rgba(255,255,255,.15)')+';background:'+(S.vol.perSideMode?'rgba(56,189,248,.15)':'rgba(11,18,32,.6)')+';color:'+(S.vol.perSideMode?'#38bdf8':'#64748b')+'">'+
      '🔧 Per latură (avansat)</button>'+
  '</div>',
  // Mod clasic
  ...(S.vol.perSideMode ? [] : [
    '<div class="g2">',
    pf('Față stradă (rf)','rf','m','Distanța minimă de la construcție la limita orientată spre stradă'),
    pf('Posterior / spate (rs)','rs','m','Distanța minimă de la construcție la limita posterioară'),
    '</div>',
    '<div class="g2">',
    pf('Lateral stânga (rl)','rl','m','Distanța la limita laterală stângă (0 = construcție pe limita terenului / calcan)'),
    pf('Lateral dreapta (rr)','rr','m','Distanța la limita laterală dreaptă (0 = calcan)'),
    '</div>',
  ]),
  // Mod per latură
  ...(S.vol.perSideMode && ap?.geo ? [
    '<div class="help" style="margin-bottom:8px;color:#38bdf8">Setează aliniamentul pentru fiecare latură individual. 0 = calcan (pe limita proprietății). Laturile sunt numerotate în sensul acelor de ceasornic.</div>',
    (()=>{
      // Calculăm laturile parcelei
      try{
        const ring=ap.geo.geometry.type==='Polygon'
          ? ap.geo.geometry.coordinates[0]
          : ap.geo.geometry.coordinates[0][0];
        if(!ring||ring.length<3) return '<div style="color:#f87171;font-size:10px">Geometrie invalidă</div>';
        const cx=ring.reduce((s,c)=>s+c[0],0)/ring.length;
        const cy2=ring.reduce((s,c)=>s+c[1],0)/ring.length;
        const mLng2=111320*Math.cos(cy2*Math.PI/180);
        const mLat2=111320;
        const brg=S.bearing||0;
        const FTHRESH=S.vol.frontCount>=3?150:S.vol.frontCount===2?110:65;

        let html='<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">';
        for(let i=0;i<ring.length-1;i++){
          const p1=ring[i],p2=ring[i+1];
          const mx=(p1[0]+p2[0])/2, my=(p1[1]+p2[1])/2;
          const dLn=(mx-cx)*mLng2, dLt=(my-cy2)*mLat2;
          const dir=(Math.atan2(dLn,dLt)*180/Math.PI+360)%360;
          let diff=((dir-brg)+360)%360;
          if(diff>180)diff=360-diff;
          const isFront=diff<FTHRESH;
          const sideLen=Math.sqrt(Math.pow((p2[0]-p1[0])*mLng2,2)+Math.pow((p2[1]-p1[1])*mLat2,2));
          const curVal=S.vol.sideSetbacks&&(i in S.vol.sideSetbacks)?S.vol.sideSetbacks[i]:'';
          const defaultVal=isFront?(ap.params?.rf??REGULI[ap.utr]?.rf??5):(ap.params?.rs??REGULI[ap.utr]?.rs??5);
          const sideColor=isFront?'#d4af37':'#60a5fa';
          html+=`<div style="background:rgba(255,255,255,.04);border:1px solid ${sideColor}44;border-radius:7px;padding:7px">
            <div style="font-size:9px;color:${sideColor};font-weight:700;margin-bottom:3px">
              Latura ${i+1} ${isFront?'🟡 FRONT':''} · ${sideLen.toFixed(0)}m
            </div>
            <input type="number" min="0" max="30" step="0.5" value="${curVal}" placeholder="${defaultVal}"
              style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:5px;padding:4px 7px;font-size:12px"
              oninput="if(!S.vol.sideSetbacks)S.vol.sideSetbacks={};S.vol.sideSetbacks[${i}]=+this.value||0;updateMap();if(S.vol.genDone){const f=buildVolume();setSource('vol-src',{type:'FeatureCollection',features:f});}">
            <div style="font-size:8px;color:#475569;margin-top:2px">PUG implicit: ${defaultVal}m · 0=calcan</div>
          </div>`;
        }
        html+='</div>';
        html+=`<div style="margin-top:6px;display:flex;gap:5px">
          <button onclick="S.vol.sideSetbacks={};updateMap();if(S.vol.genDone){const f=buildVolume();setSource('vol-src',{type:'FeatureCollection',features:f});}renderTab('proiect')"
            style="flex:1;padding:5px;border:1px solid rgba(255,255,255,.15);background:rgba(11,18,32,.6);color:#94a3b8;border-radius:6px;font-size:10px;cursor:pointer">
            🔄 Reset toate la implicit
          </button>
          <button onclick="${[...Array(ring.length-1).keys()].map(i=>'S.vol.sideSetbacks['+i+']=0;').join('')}updateMap();if(S.vol.genDone){const f=buildVolume();setSource('vol-src',{type:'FeatureCollection',features:f});}renderTab('proiect')"
            style="flex:1;padding:5px;border:1px solid rgba(255,255,255,.15);background:rgba(11,18,32,.6);color:#94a3b8;border-radius:6px;font-size:10px;cursor:pointer">
            ⬛ Toate calcan (0)
          </button>
        </div>`;
        return html;
      }catch(e){return '<div style="color:#f87171;font-size:10px">Eroare calcul laturi: '+e.message+'</div>';}
    })(),
  ] : []),
  '<div class="section" style="margin-top:8px">Spații verzi și parcaje (minime)</div>',
  '<div class="g2">'+pf('Spații verzi (%)','sv','%','% din suprafața terenului — reduce suprafața construibilă')+pf('Parcaje (loc/100mp)','pk','','Locuri parcare minime per 100mp')+'</div>',
  '<div class="btn-row" style="margin-top:10px">',
  '<button class="btn-s" onclick="resetParams()" style="flex:1">↩ Reset la PUG</button>',
  '<button class="btn-p" onclick="switchTab(\'indicatori\')">📊 Indicatori PUG</button>',
  '</div></div>',
  // ── ETAJE ──
  S.vol.genDone ? '<div class="section">🎨 Etaje generate ('+realNiv+' niveluri)</div><div class="fl-leg">'+flLeg+'</div>' : '',
  // ── PLAN 2D ──
  '<div class="section">📐 Plan 2D — parcelă și suprafață construibilă</div>',
  '<div class="help">Verde = parcelă. Portocaliu = suprafață construibilă (se micșorează când mărești aliniamentele sau spațiile verzi).</div>',
  '<div class="vbox" style="min-height:180px">'+(ap.geo?'<canvas id="c2d" width="380" height="180"></canvas>':'<div style="color:#64748b">Selectează o parcelă</div>')+'</div>',
  // ── CONTEXT ──
  '<div class="section">🌆 Context 3D OSM</div>',
  '<div style="display:flex;gap:8px;align-items:center">',
  '<input class="inp" type="number" min="60" max="500" step="10" value="'+S.vol.ctxR+'" onchange="S.vol.ctxR=Math.max(60,+this.value)" style="width:90px;margin:0">',
  '<span style="color:#64748b;font-size:12px">m raza</span>',
  '<button class="btn-s" onclick="loadContextForce()" style="padding:7px 12px" title="Reîncarcă clădiri context (Overpass + Mapbox)">🔄 Context</button>',
  '</div>'
  ].join('');
}

// ═══ HTML MULTI ════════════════════════════════════════════════════════════
function htmlMulti(){
  if(!S.parcels.length)return '<div class="card"><div style="color:#64748b">Nicio parcelă selectată. Activează multiselect din tab Căutare și dă click pe parcele pe hartă.</div></div>';
  return `
  <div class="card">
    <div style="font-size:13px;color:#d4af37;font-weight:700;margin-bottom:8px">🔲 Parcele selectate (${S.parcels.length})</div>
    <div class="btn-row" style="margin-bottom:10px">
      <button class="btn-p" onclick="genVolAll()" style="flex:1">🏗 Volum unificat</button>
      <button class="btn-s" onclick="genVolEach()">📦 Per parcelă</button>
      <button class="btn-w" onclick="clearAll()">🗑 Șterge tot</button>
    </div>
    ${S.parcels.map((p,i)=>`
    <div class="ms-item" ${i===S.activeParcel?'style="border-color:#d4af37"':''}>
      <div class="ms-head">
        <div>
          <b>Parcelă ${i+1}: ${esc(p.nrcad||'—')}</b>
          <span class="badge ${i===S.activeParcel?'b-y':'b-b'}" style="font-size:10px">UTR: ${esc(p.utr||'—')}</span>
          <span class="badge" style="background:rgba(100,116,139,.15);color:#94a3b8;font-size:10px">${'📐 local'}</span>
        </div>
        <div style="display:flex;gap:5px">
          <button class="btn-s" onclick="S.activeParcel=${i};S.utr='${p.utr}';S.rule=REGULI['${p.utr}']||{};renderAll()" style="padding:4px 8px;font-size:11px">✏️</button>
          <button class="btn-w" onclick="removeParcel(${i})" style="padding:4px 8px;font-size:11px">✕</button>
        </div>
      </div>
      <div class="g2">
        <div class="met"><div class="ml">Suprafață</div><div class="mv">${p.area?Math.round(p.area)+' m²':'—'}</div></div>
        <div class="met"><div class="ml">Funcțiune</div><div class="mv" style="font-size:12px">${esc(FN_UTR[p.fn||S.vol.fn]?.label||S.vol.fn)}</div></div>
      </div>
      <select class="sel" style="margin-top:7px;margin-bottom:6px" onchange="S.parcels[${i}].fn=this.value;renderAll()">
        ${Object.entries(FN_UTR).map(([k,v])=>`<option value="${k}" ${(p.fn||S.vol.fn)===k?'selected':''}>${v.label}</option>`).join('')}
      </select>
      <div class="g2" style="margin-top:4px">
        <div class="met" style="padding:7px">
          <div class="ml" style="font-size:9px">POT max (%)</div>
          <input class="inp" type="number" min="0" max="100" step="1" value="${p.params?.pot??''}" placeholder="${REGULI[p.utr]?.pot??''}" 
            oninput="if(!S.parcels[${i}].params)S.parcels[${i}].params=getDefaultParams('${p.utr}');S.parcels[${i}].params.pot=+this.value;updateMap()" 
            style="margin-bottom:0;padding:5px 8px;font-size:12px">
        </div>
        <div class="met" style="padding:7px">
          <div class="ml" style="font-size:9px">CUT max</div>
          <input class="inp" type="number" min="0" max="10" step="0.1" value="${p.params?.cut??''}" placeholder="${REGULI[p.utr]?.cut??''}"
            oninput="if(!S.parcels[${i}].params)S.parcels[${i}].params=getDefaultParams('${p.utr}');S.parcels[${i}].params.cut=+this.value;updateMap()"
            style="margin-bottom:0;padding:5px 8px;font-size:12px">
        </div>
        <div class="met" style="padding:7px">
          <div class="ml" style="font-size:9px">Niveluri max</div>
          <input class="inp" type="number" min="1" max="30" step="1" value="${p.params?.niv??''}" placeholder="${REGULI[p.utr]?.niv??''}"
            oninput="if(!S.parcels[${i}].params)S.parcels[${i}].params=getDefaultParams('${p.utr}');S.parcels[${i}].params.niv=+this.value;updateMap()"
            style="margin-bottom:0;padding:5px 8px;font-size:12px">
        </div>
        <div class="met" style="padding:7px">
          <div class="ml" style="font-size:9px">H max (m)</div>
          <input class="inp" type="number" min="0" max="100" step="0.5" value="${p.params?.h??''}" placeholder="${REGULI[p.utr]?.h??''}"
            oninput="if(!S.parcels[${i}].params)S.parcels[${i}].params=getDefaultParams('${p.utr}');S.parcels[${i}].params.h=+this.value;updateMap()"
            style="margin-bottom:0;padding:5px 8px;font-size:12px">
        </div>
      </div>
      <div class="g2" style="margin-top:4px">
        <div class="met" style="padding:7px">
          <div class="ml" style="font-size:9px">Aliniament stradă (m)</div>
          <input class="inp" type="number" min="0" max="30" step="0.5" value="${p.params?.rf??''}" placeholder="${REGULI[p.utr]?.rf??''}"
            oninput="if(!S.parcels[${i}].params)S.parcels[${i}].params=getDefaultParams('${p.utr}');S.parcels[${i}].params.rf=+this.value;if(S.vol.genDone){const f=buildVolume();setSource('vol-src',{type:'FeatureCollection',features:f});}updateMap()"
            style="margin-bottom:0;padding:5px 8px;font-size:12px">
        </div>
        <div class="met" style="padding:7px">
          <div class="ml" style="font-size:9px">Aliniament spate (m)</div>
          <input class="inp" type="number" min="0" max="30" step="0.5" value="${p.params?.rs??''}" placeholder="${REGULI[p.utr]?.rs??''}"
            oninput="if(!S.parcels[${i}].params)S.parcels[${i}].params=getDefaultParams('${p.utr}');S.parcels[${i}].params.rs=+this.value;if(S.vol.genDone){const f=buildVolume();setSource('vol-src',{type:'FeatureCollection',features:f});}updateMap()"
            style="margin-bottom:0;padding:5px 8px;font-size:12px">
        </div>
      </div>
      <div class="btn-row" style="margin-top:7px">
        <button class="btn-p" onclick="S.activeParcel=${i};S.vol.genDone&&(()=>{const f=buildVolume();setSource('vol-src',{type:'FeatureCollection',features:f});})();switchTab('proiect')" style="flex:1;font-size:11px">✏️ Editează detaliat</button>
        <button class="btn-g" onclick="S.activeParcel=${i};genVol()" style="font-size:11px">🏗</button>
      </div>
    </div>
    `).join('')}
  </div>`;
}

// ═══ HTML SCENARII ═══════════════════════════════════════════════════════
function htmlScen(){
  return`
  <div class="card">
    <div class="section">📅 Orizont de analiză</div>
    <div style="display:flex;gap:6px;margin-bottom:10px">
      ${['','5','10','15'].map(y=>`<button onclick="S.timeline='${y}';renderTab('scen')" style="flex:1;padding:7px;border-radius:8px;border:1px solid ${S.timeline===y?'#d4af37':'rgba(255,255,255,.15)'};background:${S.timeline===y?'rgba(212,175,55,.2)':'rgba(11,18,32,.8)'};color:${S.timeline===y?'#d4af37':'#94a3b8'};cursor:pointer;font-size:12px;font-weight:700">${y||'Curent'} ${y?'ani':''}</button>`).join('')}
    </div>
    <div class="btn-row">
      <button class="btn-g" onclick="saveScen()" style="flex:1">💾 Salvează</button>
      <button class="btn-s" onclick="expJSON()">⬇ JSON</button>
    </div>
  </div>
  <div class="section">Scenarii salvate (${S.scenarios.length})</div>
  ${S.scenarios.length?S.scenarios.map((s,i)=>`
  <div class="sc-item">
    <div><div style="font-weight:700;font-size:13px">${esc(s.name||'Sc.'+( i+1))}</div><div style="font-size:11px;color:#64748b">${esc((s.ts||'').slice(0,16).replace('T',' '))} · ${s.nParcele||1} parcele · ${s.niv||'?'}et. · ${s.h||'?'}m</div></div>
    <div style="display:flex;gap:5px">
      <button class="btn-g" onclick="loadScen(${i})" style="padding:5px 9px;font-size:11px">▶</button>
      <button class="btn-w" onclick="S.scenarios.splice(${i},1);localStorage.setItem('ux16',JSON.stringify(S.scenarios));renderTab('scen')" style="padding:5px 9px;font-size:11px">✕</button>
    </div>
  </div>`).join(''):'<div class="card"><div style="color:#64748b">Niciun scenariu salvat.</div></div>'}`;
}

// ═══ DRAW 2D ═══════════════════════════════════════════════════════════════
