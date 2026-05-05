// UrbanX — Generator lotizare, export

let _lotizareActive = false;

const _LOT = {
  lotAria: 400,
  drumLat: 6,
  drumProcent: 20,
  drumMod: 'ambele',
  strategie: 'grid',

  tipMix: { individuala:40, insiruita:30, duplex:20, bloc:10 },

  tipuri: {
    individuala: {
      label:'Casă individuală', icon:'🏡',
      lotMin:300, lotMax:1500, lotDefault:450,
      sc:35, hMax:8, niv:2, retF:5, retS:4, retL:3,
      color:'#4ade80', borderColor:'#16a34a',
      pretConstr:900, pretVanzare:1400, suprafUtila:130,
      desc:'Lot propriu, grădină, garaj'
    },
    insiruita: {
      label:'Casă înșiruită', icon:'🏘',
      lotMin:150, lotMax:400, lotDefault:220,
      sc:60, hMax:9, niv:2, retF:4, retS:3, retL:0,
      color:'#60a5fa', borderColor:'#2563eb',
      pretConstr:800, pretVanzare:1250, suprafUtila:110,
      desc:'Calcan lateral, front mic, eficient'
    },
    duplex: {
      label:'Duplex (2 familii)', icon:'🏠',
      lotMin:250, lotMax:600, lotDefault:320,
      sc:50, hMax:8, niv:2, retF:4, retS:3, retL:0,
      color:'#fbbf24', borderColor:'#d97706',
      pretConstr:820, pretVanzare:1300, suprafUtila:120,
      desc:'2 unități pe lot comun'
    },
    bloc: {
      label:'Bloc mic (4-8 ap)', icon:'🏢',
      lotMin:600, lotMax:3000, lotDefault:900,
      sc:40, hMax:15, niv:4, retF:6, retS:5, retL:4,
      color:'#a78bfa', borderColor:'#7c3aed',
      pretConstr:750, pretVanzare:1350, suprafUtila:65,
      desc:'Regim S+P+3E, max 8 ap'
    }
  },

  // ── Clădiri existente marcate pentru demolare ─────────────────────────
  demoIds: new Set(),     // Set de indecși din S.ctx.features marcate demo
  demoMode: false,        // true = click pe hartă marchează/demarchează clădiri
  // Utilizatorul poate modifica orice parametru pentru sesiunea curentă
  // Format: {individuala: {niv:3, sc:45, hMax:10}, bloc: {niv:5, ...}, ...}
  tipOverride: {},
  // Fiecare drum = {id, tip, coords:[[lng,lat],[lng,lat],...], latime}
  // tip: 'principal' | 'secundar' | 'acces' | 'pietonal'
  _drumCustom: [],      // drumuri definite manual de utilizator
  _drumEditMode: null,  // null | 'draw' | 'move' | 'delete'
  _drumDrawing: null,   // drum în curs de desenare
  _drumSelected: null,  // id drum selectat pentru move/delete
  _drumNextId: 1,

  // ── Stare generată ────────────────────────────────────────────────────
  _loturi: [],
  _drumuri: [],
  _bilant: null,

  // Config drum per tip
  drumTipuri: {
    principal: {label:'Drum principal',  latime:7, color:'#94a3b8', opacity:0.6},
    secundar:  {label:'Drum secundar',   latime:5, color:'#64748b', opacity:0.5},
    acces:     {label:'Alee acces',      latime:3.5,color:'#475569', opacity:0.4},
    pietonal:  {label:'Cale pietonală',  latime:2, color:'#38bdf8', opacity:0.35},
  }
};

// ─── Toggle ───────────────────────────────────────────────────────────────
function toggleLotizare(){
  _lotizareActive = !_lotizareActive;
  document.getElementById('btnLotizare')?.classList.toggle('on', _lotizareActive);
  if(_lotizareActive){
    // Ascundem layerele care ar zgomota harta în modul lotizare
    ['dist-src','aedis-dim-src'].forEach(src=>{
      try{ setSource(src,{type:'FeatureCollection',features:[]}); }catch(e){}
    });
    ['aedis-dim-line','aedis-dim-label'].forEach(lid=>{
      try{ if(map.getLayer(lid)) map.setLayoutProperty(lid,'visibility','none'); }catch(e){}
    });
  }
  if(_lotizareActive) _showLotizarePanel();
  else {
    // IMPORTANT: NU ștergem sursele la închidere — propunerea lotizare rămâne vizibilă
    // Sursele se curăță DOAR la Reset explicit sau la selectare parcelă nouă
    // ['lotizare-src','lotizare-drum-src','lotizare-label-src'].forEach(s=>
    //   setSource(s,{type:'FeatureCollection',features:[]}));
    // setSource('lot-demo-src',{type:'FeatureCollection',features:[]});
    if(_LOT.demoMode) _lotDemoModeToggle();
    // Restaurează front/setback layers
    ['front-parcel-line','front-setback-line','front-label','front-arrow'].forEach(lid=>{
      try{map.setLayoutProperty(lid,'visibility','visible');}catch(e){}
    });
    updateMap();
    // Curăță viewer-ul 3D DOAR dacă era generat de lotizare și nu există o propunere salvată
    if(S.vol._lastFeats?.[0]?.properties?.isLotizare && !S.vol._lotizareSaved){
      clearSource('vol-src');
      S.vol.genDone = false;
      S.vol._lastFeats = null;
    }
    document.getElementById('lotizare-panel')?.remove();
    _floatPanelClose('lotizare-panel');
    // Resetează harta după închidere (fix black screen pe mobil)
    setTimeout(()=>{
      try{
        const mapEl = document.getElementById('map');
        if(mapEl) mapEl.style.bottom = '';
        if(window.map){ window.map.resize(); window.map.triggerRepaint(); }
        if(window._lotLayoutSync) window._lotLayoutSync();
      }catch(e){}
    }, 80);
  }
}

// ─── Panel principal ──────────────────────────────────────────────────────
function _showLotizarePanel(){
  document.getElementById('lotizare-panel')?.remove();
  const ap = S.parcels[S.activeParcel??0];
  const mob = window.innerWidth<841;
  const panelW = 430;
  // Întotdeauna la stânga panoului lateral (420px) + 8px gap
  const rightPos = mob ? null : 428;

  const div = document.createElement('div');
  div.id='lotizare-panel';
  // Pe mobil: drawer de jos cu inaltime 48vh — lasa harta vizibila deasupra
  div.style.cssText=`position:fixed;${mob?'bottom:72px;left:0;right:0;border-radius:16px 16px 0 0':'top:56px;right:'+rightPos+'px;width:'+panelW+'px;border-radius:16px'};z-index:8600;background:rgba(7,12,24,.97);border:1px solid rgba(167,139,250,.35);${mob?'border-bottom:none':''}padding:0;box-shadow:0 12px 48px rgba(0,0,0,.75);backdrop-filter:blur(16px);font-family:system-ui,sans-serif;max-height:${mob?'50':'88'}vh;overflow:hidden;display:flex;flex-direction:column`;

  div.innerHTML=`
    <div style="padding:12px 16px 0;flex-shrink:0">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div>
          <span style="color:#a78bfa;font-weight:800;font-size:13px">🏘 Lotizare</span>
          <span style="color:#64748b;font-weight:400;font-size:11px"> · ${ap?ap.nrcad+' · '+Math.round(ap.area||0)+'mp':'selectați parcela'}</span>
          ${ap?.utr?`<span style="color:#d4af37;font-size:9px;margin-left:4px">UTR ${ap.utr}</span>`:''}
        </div>
        <button onclick="toggleLotizare()" style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:8px;padding:${mob?'8px 18px':'5px 12px'};font-size:${mob?'16px':'12px'};font-weight:700;cursor:pointer;flex-shrink:0;min-width:${mob?'44px':'auto'}">✕ Închide</button>
      </div>
      ${!ap?'<div style="color:#f87171;font-size:10px;padding:4px 0 6px">⚠️ Selectați mai întâi o parcelă pe hartă!</div>':''}
      <div style="display:flex;gap:2px;background:rgba(255,255,255,.04);border-radius:8px;padding:3px" id="lot-tabs">
        ${[['p','⚙ Param'],['t','🏢 Tipuri'],['d','🏚 Demolare'],['c','🛣 Circulații'],['m','🏡 Mix'],['r','📊 Rezultat'],['f','💰 Financiar'],['x','📄 Export']].map(([id,l],i)=>`
          <button onclick="_lotTab('${id}')" id="ltab-${id}" style="flex:1;border:none;background:${i===0?'rgba(167,139,250,.2)':'none'};color:${i===0?'#a78bfa':'#64748b'};border-radius:6px;padding:5px 1px;font-size:${mob?6:7}px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .15s">${l}</button>`).join('')}
      </div>
    </div>
    <div id="lot-content" style="overflow-y:auto;padding:12px 16px;flex:1">${_lotHtmlParametri()}</div>
    <div style="padding:8px 16px 10px;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0;display:flex;flex-direction:column;gap:6px">
      <div style="display:flex;gap:6px">
        <button onclick="_lotSetDemolare()" title="Setează retrageri 0 — construcție pe limita proprietății" style="flex:1;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.25);color:#f87171;border-radius:8px;padding:8px;font-size:11px;font-weight:700;cursor:pointer">
          🏚 Demolare / Calcan 0
        </button>
        <button onclick="_lotResetParams()" title="Resetează la valorile PUG" style="flex:1;background:rgba(100,116,139,.1);border:1px solid rgba(100,116,139,.25);color:#94a3b8;border-radius:8px;padding:8px;font-size:11px;font-weight:700;cursor:pointer">
          ↩ Reset PUG
        </button>
        <button onclick="_lotOpenUrban3D()" title="Deschide viewer Urban3D fotorealist" style="background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.25);color:#38bdf8;border-radius:8px;padding:8px 10px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap">
          ⚡ Urban3D
        </button>
      </div>
      <button onclick="runLotizare()" style="width:100%;background:linear-gradient(135deg,#6d28d9,#4c1d95);border:1px solid #7c3aed;color:#fff;border-radius:10px;padding:12px;font-size:13px;font-weight:800;cursor:pointer;letter-spacing:.03em" onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
        🏘 Generează Plan Lotizare
      </button>
    </div>`;
  document.body.appendChild(div);
}

function _lotTab(tab){
  ['p','t','d','c','m','r','f','x'].forEach(t=>{
    const b=document.getElementById('ltab-'+t);
    if(!b) return;
    b.style.background = t===tab?'rgba(167,139,250,.2)':'none';
    b.style.color = t===tab?'#a78bfa':'#64748b';
  });
  const c=document.getElementById('lot-content');
  if(!c) return;
  const map2={'p':_lotHtmlParametri,'t':_lotHtmlTipuri,'d':_lotHtmlDemolare,'c':_lotHtmlCirculatii,'m':_lotHtmlMix,'r':_lotHtmlRezultat,'f':_lotHtmlFinanciar,'x':_lotHtmlExport};
  c.innerHTML = (map2[tab]||_lotHtmlParametri)();
}

// ─── TAB: Parametri ───────────────────────────────────────────────────────
// ─── Helpers lotizare ────────────────────────────────────────────────────
// ─── Helpers lotizare ────────────────────────────────────────────────────
// Returnează parametrii efectivi per tip (override > default)
function _lotGetTip(tipKey){
  const def = _LOT.tipuri[tipKey]||_LOT.tipuri.individuala;
  const ov  = _LOT.tipOverride[tipKey]||{};
  return {...def, ...ov};
}
// Actualizare override + recalcul live
function _lotSetTipParam(tipKey, param, val){
  if(!_LOT.tipOverride[tipKey]) _LOT.tipOverride[tipKey]={};
  _LOT.tipOverride[tipKey][param] = val;
  // Recalcul live dacă planul e generat
  if(_LOT._loturi.length>0) runLotizare();
}
// ── Deschide viewer-ul Urban3D cu volumele din lotizare ──────────────────
function _lotOpenUrban3D(){
  if(!_LOT._loturi?.length){
    ss('⚠️ Generează planul de lotizare mai întâi.');
    return;
  }
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('⚠️ Selectați o parcelă.'); return; }

  // Asigurăm că vol-src și _lastFeats sunt actualizate
  _lotBuild3D(_LOT._loturi, _LOT._drumuri);

  // Setăm funcțiunea predominantă în AEDIS (pentru stilul vizual)
  const tipPred = Object.entries(_LOT.tipMix)
    .filter(([,v])=>v>0)
    .sort((a,b)=>b[1]-a[1])[0]?.[0] || 'individuala';
  const fnMap = {
    individuala:'locuinta_individuala', insiruita:'locuinta_insiruita',
    duplex:'locuinta_duplex', bloc:'rezidential_colectiv'
  };
  AEDIS.fn = fnMap[tipPred] || 'rezidential_colectiv';

  // Preluăm cel mai înalt tip pentru legenda viewer-ului
  const t = _lotGetTip(tipPred);
  const ov = _LOT.tipOverride[tipPred]||{};
  const niv = t.niv||2;
  const hNiv = ov.hNiv||t.hNiv||3.0;
  const hParter = ov.hParter||t.hParter||3.0;
  if(AEDIS.corpuri[0]){
    AEDIS.corpuri[0].niv  = niv;
    AEDIS.corpuri[0].hNiv = hNiv;
    AEDIS._nivOverride = true;
    AEDIS._hNivOverride = true;
  }

  // Deschide viewer-ul
  aedisOpen3DViewer();
  ss('🏙 Urban3D — Plan de lotizare · '+_LOT._loturi.length+' volume');
}

// ── Activare mod marcare demolare ────────────────────────────────────────
function _lotDemoModeToggle(){
  _LOT.demoMode = !_LOT.demoMode;
  map.getCanvas().style.cursor = _LOT.demoMode ? 'crosshair' : '';
  if(_LOT.demoMode){
    map._lotDemoClick = (e) => {
      // Găsim clădiri sub cursor din ctx-src
      const feats = map.queryRenderedFeatures(e.point, {layers:['ctx-3d']});
      if(!feats.length){
        // Căutăm în S.ctx manual după distanță
        if(!S.ctx?.features?.length) return;
        const ap = S.parcels[S.activeParcel??0];
        if(!ap) return;
        const clickPt = [e.lngLat.lng, e.lngLat.lat];
        S.ctx.features.forEach((f,idx)=>{
          if(!f.geometry) return;
          try{
            const ptFeat={type:'Feature',geometry:{type:'Point',coordinates:clickPt},properties:{}};
            const bldFeat={type:'Feature',geometry:f.geometry,properties:{}};
            // Verifică dacă punctul e în interiorul clădirii
            if(turf.booleanPointInPolygon(ptFeat, bldFeat)){
              if(_LOT.demoIds.has(idx)) _LOT.demoIds.delete(idx);
              else _LOT.demoIds.add(idx);
              _lotDemoRefresh();
            }
          }catch(e2){}
        });
        return;
      }
      feats.forEach(f=>{
        const idx = S.ctx?.features?.findIndex(cf=>
          cf.geometry === f.geometry ||
          JSON.stringify(cf.geometry?.coordinates) === JSON.stringify(f.geometry?.coordinates)
        );
        if(idx>=0){
          if(_LOT.demoIds.has(idx)) _LOT.demoIds.delete(idx);
          else _LOT.demoIds.add(idx);
        }
      });
      _lotDemoRefresh();
    };
    map.on('click', map._lotDemoClick);
    ss('🏚 Mod demolare activ — click pe clădiri pentru a le marca/demarca');
  } else {
    if(map._lotDemoClick){ map.off('click', map._lotDemoClick); map._lotDemoClick=null; }
    ss('✅ Mod demolare dezactivat — '+_LOT.demoIds.size+' clădiri marcate');
  }
  // Refresh buton în panou
  const btn = document.getElementById('lot-demo-btn');
  if(btn){
    btn.style.background = _LOT.demoMode ? 'rgba(239,68,68,.3)' : 'rgba(239,68,68,.12)';
    btn.style.borderColor = _LOT.demoMode ? '#ef4444' : 'rgba(239,68,68,.25)';
    btn.textContent = _LOT.demoMode ? '🏚 Stop marcare' : '🏚 Marchează demolări';
  }
}

function _lotDemoRefresh(){
  // Actualizează layer-ul vizual roșu pentru clădirile marcate
  const demoFeats = [];
  if(S.ctx?.features){
    S.ctx.features.forEach((f,idx)=>{
      if(_LOT.demoIds.has(idx) && f.geometry){
        demoFeats.push({...f, properties:{...f.properties, marked:true}});
      }
    });
  }
  setSource('lot-demo-src',{type:'FeatureCollection',features:demoFeats});
  // Actualizează counter în panou
  const cnt = document.getElementById('lot-demo-count');
  if(cnt) cnt.textContent = _LOT.demoIds.size+' clăd. marcate';
  _lotDemoUpdatePanel();
}

function _lotDemoClearAll(){
  _LOT.demoIds.clear();
  _lotDemoRefresh();
  ss('🗑 Toate marcajele de demolare șterse');
}

function _lotDemoMarkAll(){
  // Marchează toate clădirile de pe parcela activă
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry || !S.ctx?.features?.length) return;
  S.ctx.features.forEach((f,idx)=>{
    if(!f.geometry) return;
    try{
      const parcelFeat={type:'Feature',geometry:ap.geo.geometry,properties:{}};
      const bldFeat={type:'Feature',geometry:f.geometry,properties:{}};
      const overlap=turf.intersect(parcelFeat,bldFeat);
      if(overlap && turf.area(overlap)>5) _LOT.demoIds.add(idx);
    }catch(e){}
  });
  _lotDemoRefresh();
  ss('🏚 '+_LOT.demoIds.size+' clădiri de pe parcelă marcate pentru demolare');
}

function _lotDemoUpdatePanel(){
  const el = document.getElementById('lot-demo-list');
  if(!el) return;
  if(_LOT.demoIds.size===0){
    el.innerHTML='<div style="color:#475569;font-size:10px;text-align:center;padding:6px">Nicio clădire marcată</div>';
    return;
  }
  let html='';
  _LOT.demoIds.forEach(idx=>{
    const f=S.ctx?.features?.[idx];
    if(!f) return;
    const h=f.properties?.h||'?';
    const fn=f.properties?.fn||'—';
    try{
      const a=Math.round(turf.area({type:'Feature',geometry:f.geometry,properties:{}}));
      html+=`<div style="display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)">
        <span style="color:#ef4444;font-size:10px">🏚</span>
        <span style="flex:1;color:#fca5a5;font-size:10px">${fn} · ${a}mp · H${h}m</span>
        <button onclick="_LOT.demoIds.delete(${idx});_lotDemoRefresh()" style="background:none;border:none;color:#64748b;cursor:pointer;font-size:10px">✕</button>
      </div>`;
    }catch(e){}
  });
  el.innerHTML=html||'<div style="color:#475569;font-size:10px">—</div>';
}

function _lotSetDemolare(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap){ss('Selectati o parcela mai intai.');return;}
  if(!ap.params) ap.params=getDefaultParams(ap.utr||'');
  // Setează toate aliniamentele la 0
  ap.params.rf=0; ap.params.rs=0; ap.params.rl=0; ap.params.rr=0;
  ap.params.sv=0; // și SV la 0 pentru edificabil maxim
  // Modul per latură — toate la 0
  if(ap.geo?.geometry){
    const ring=ap.geo.geometry.type==='Polygon'
      ? ap.geo.geometry.coordinates[0]
      : ap.geo.geometry.coordinates[0][0];
    if(ring){
      S.vol.sideSetbacks={};
      for(let i=0;i<ring.length-1;i++) S.vol.sideSetbacks[i]=0;
    }
  }
  updateMap();
  // Re-render complet panel — astfel inputurile afișează noile valori 0
  const c=document.getElementById('lot-content');
  if(c) c.innerHTML=_lotHtmlParametri();
  // Highlight tab Param
  ['p','t','c','m','r','f','x'].forEach(t=>{
    const b=document.getElementById('ltab-'+t);
    if(!b) return;
    b.style.background=t==='p'?'rgba(167,139,250,.2)':'none';
    b.style.color=t==='p'?'#a78bfa':'#64748b';
  });
  ss('🏚 Demolare: toate retrageri = 0 · Edificabil = parcela integrala');
}

function _lotResetParams(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap){ss('Selectati o parcela mai intai.');return;}
  ap.params=getDefaultParams(ap.utr||'');
  S.vol.sideSetbacks={};
  S.vol.perSideMode=false;
  updateMap();
  const c=document.getElementById('lot-content');
  if(c) c.innerHTML=_lotHtmlParametri();
  ['p','t','c','m','r','f','x'].forEach(t=>{
    const b=document.getElementById('ltab-'+t);
    if(!b) return;
    b.style.background=t==='p'?'rgba(167,139,250,.2)':'none';
    b.style.color=t==='p'?'#a78bfa':'#64748b';
  });
  ss('↩ Parametri resetati la valorile PUG pentru UTR '+(ap.utr||''));
}

function _lotHtmlDemolare(){
  const hasCladiri = S.ctx?.features?.length > 0;
  const nDemo = _LOT.demoIds.size;
  return `
    <!-- Status vizual -->
    <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:10px;padding:10px 12px;margin-bottom:10px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="color:#fca5a5;font-size:11px;font-weight:800">🏚 Clădiri pentru demolare</span>
        <span id="lot-demo-count" style="color:#ef4444;font-size:11px;font-weight:800">${nDemo} clăd. marcate</span>
      </div>
      <div style="font-size:9px;color:#64748b;line-height:1.5">
        Marchează clădirile existente pe teren care vor fi demolate.<br>
        La generarea lotizării, acestea sunt <b style="color:#fca5a5">ignorate complet</b> din calcule.
      </div>
    </div>

    <!-- Butoane acțiune -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:8px">
      <button id="lot-demo-btn" onclick="_lotDemoModeToggle()"
        style="background:${_LOT.demoMode?'rgba(239,68,68,.3)':'rgba(239,68,68,.12)'};
               border:1px solid ${_LOT.demoMode?'#ef4444':'rgba(239,68,68,.25)'};
               color:#fca5a5;border-radius:8px;padding:9px;font-size:10px;font-weight:700;cursor:pointer">
        ${_LOT.demoMode?'🛑 Stop marcare':'🏚 Marchează demolări'}
      </button>
      <button onclick="_lotDemoMarkAll()"
        style="background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.25);
               color:#fbbf24;border-radius:8px;padding:9px;font-size:10px;font-weight:700;cursor:pointer">
        🏘 Toate de pe parcelă
      </button>
    </div>

    ${!hasCladiri?`
      <div style="background:rgba(255,255,255,.04);border-radius:8px;padding:10px;text-align:center;margin-bottom:8px">
        <div style="color:#64748b;font-size:10px">Nicio clădire în context.</div>
        <div style="color:#475569;font-size:9px;margin-top:3px">Apasă Context 3D din tab Analiză pentru a încărca clădirile existente.</div>
      </div>`:''}

    <!-- Lista clădiri marcate -->
    <div style="border-top:1px solid rgba(255,255,255,.07);padding-top:8px;margin-bottom:8px">
      <div style="font-size:9px;color:#475569;font-weight:700;text-transform:uppercase;margin-bottom:5px">Clădiri marcate pentru demolare</div>
      <div id="lot-demo-list" style="max-height:150px;overflow-y:auto">
        ${nDemo===0
          ? '<div style="color:#475569;font-size:10px;text-align:center;padding:6px">Nicio clădire marcată</div>'
          : ''}
      </div>
      ${nDemo>0?`<button onclick="_lotDemoClearAll()" style="width:100%;margin-top:6px;padding:5px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#f87171;border-radius:6px;font-size:9px;cursor:pointer">🗑 Șterge toate marcajele</button>`:''}
    </div>

    <!-- Legendă vizuală -->
    <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:10px">
      <div style="font-size:9px;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:8px">Legendă hartă</div>
      ${[
        ['rgba(239,68,68,.4)','border:2px dashed #ef4444','Clădire marcată pentru demolare'],
        ['rgba(255,180,0,.15)','border:1px solid #d4af37','Parcelă activă selectată'],
        ['rgba(34,197,94,.15)','border:1px solid #22c55e','Edificabil disponibil (după retrageri)'],
        ['rgba(167,139,250,.25)','border:1px solid #7c3aed','Loturi propuse (după lotizare)'],
        ['rgba(148,163,184,.4)','border:1px solid #94a3b8','Circulații interioare'],
      ].map(([bg,brd,lbl])=>`
        <div style="display:flex;align-items:center;gap:7px;margin-bottom:5px">
          <div style="width:16px;height:12px;border-radius:2px;background:${bg};${brd};flex-shrink:0"></div>
          <span style="font-size:9px;color:#64748b">${lbl}</span>
        </div>`).join('')}
    </div>`;
}

function _lotHtmlCirculatii(){
  const tipuri = _LOT.drumTipuri;
  const hasCustom = _LOT._drumCustom.length > 0;
  const isDrawing = _LOT._drumEditMode === 'draw';
  const activeTip = isDrawing ? _LOT._drumDrawTip : null;

  return `
    <div style="margin-bottom:10px">
      <div style="font-size:10px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">✏️ Desenează circulații pe hartă</div>
      <div style="font-size:9px;color:#475569;margin-bottom:8px;line-height:1.5">
        Selectează tipul, apasă butonul, ${window.innerWidth<841?'<b style="color:#a78bfa">tap pe hartă</b> (zona de sus)':'<b style="color:#a78bfa">click pe hartă</b>'} pentru puncte.<br>
        <b style="color:#a78bfa">Enter</b> sau dublu-click = finalizare · <b style="color:#a78bfa">Esc</b> = anulare · <b style="color:#a78bfa">Backspace</b> = șterge ultimul punct
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:8px">
        ${Object.entries(tipuri).map(([tip,cfg])=>{
          const isActive = activeTip === tip;
          return `<button onclick="_lotDrumEditorStart('${tip}')"
            style="background:${isActive?cfg.color+'33':'rgba(255,255,255,.05)'};
              border:${isActive?'2px solid '+cfg.color:'1px solid '+cfg.color+'44'};
              color:${cfg.color};border-radius:8px;padding:8px 6px;font-size:10px;
              font-weight:700;cursor:pointer;text-align:left;transition:all .15s"
            onmouseover="this.style.background='rgba(255,255,255,.1)'"
            onmouseout="this.style.background='${isActive?cfg.color+'33':'rgba(255,255,255,.05)'}'"
          >
            <div style="font-size:11px;margin-bottom:2px">${isActive?'✏️ ACTIV — ':''} ${cfg.label}</div>
            <div style="font-size:9px;opacity:.7">Lățime: ${cfg.latime}m</div>
          </button>`;
        }).join('')}
      </div>
    </div>

    <div style="border-top:1px solid rgba(255,255,255,.07);padding-top:10px;margin-bottom:10px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <div style="font-size:10px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Circulații definite</div>
        ${hasCustom?`<button onclick="_lotDrumEditorClear()" style="background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.25);color:#f87171;border-radius:5px;padding:2px 8px;font-size:9px;cursor:pointer">🗑 Șterge toate</button>`:''}
      </div>
      <div id="lot-drum-list">
        ${hasCustom ? _LOT._drumCustom.map(d=>{
            const cfg=tipuri[d.tip]||tipuri.secundar;
            return `<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)">
              <span style="width:10px;height:10px;border-radius:50%;background:${cfg.color};flex-shrink:0"></span>
              <span style="flex:1;color:#e2e8f0;font-size:10px">${cfg.label} (${d.coords.length} pct · ${d.latime}m)</span>
              <button onclick="_lotDrumEditorDelete('${d.id}')" style="background:rgba(239,68,68,.15);border:none;color:#f87171;border-radius:4px;padding:2px 7px;font-size:9px;cursor:pointer">🗑</button>
            </div>`;
          }).join('')
          : '<div style="color:#475569;font-size:10px;text-align:center;padding:8px">Nicio circulație desenată manual<br><span style="font-size:9px">Fără circulații custom = generare automată</span></div>'
        }
      </div>
    </div>

    <div style="background:rgba(56,189,248,.05);border:1px solid rgba(56,189,248,.15);border-radius:8px;padding:10px">
      <div style="font-size:9px;color:#38bdf8;font-weight:700;margin-bottom:5px">ℹ️ Cum funcționează</div>
      <div style="font-size:9px;color:#64748b;line-height:1.6">
        • <b style="color:#94a3b8">Fără circulații custom</b> → sistem generează automat drum principal + secundare<br>
        • <b style="color:#94a3b8">Cu circulații custom</b> → loturile se calculează în jurul drumurilor tale<br>
        • <b style="color:#94a3b8">Recalcul automat</b> la fiecare modificare (dacă planul e generat)<br>
        • <b style="color:#94a3b8">Loturi de margine</b> se adaptează la forma parcelei
      </div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// LOTIZARE → VIEWER 3D
// Generează volume 3D pentru fiecare lot și le trimite în vol-src
// ═══════════════════════════════════════════════════════════════════════════
function _lotBuild3D(loturi, drumuri){
  if(!loturi?.length){ clearSource('vol-src'); return; }

  const feats3D = [];
  const pal = getArchPalette ? getArchPalette() : {
    etaje:['#7c9bcc','#8faacc','#a3b8cc','#b7c6cc','#c4d0cc','#d0dacc','#dce5cc','#e8efcc'],
    retras:'#c8d8e8', terasa:'#708090', comercial:'#d4a44c'
  };

  loturi.forEach((lot, lotIdx) => {
    const tipKey = lot.properties?.tip || 'individuala';
    const t = _lotGetTip(tipKey);
    if(!lot.geometry) return;

    // Parametri per tip (cu override)
    const ov = _LOT.tipOverride[tipKey] || {};
    const niv     = Math.max(1, t.niv || 2);
    const hNiv    = Math.max(2.4, ov.hNiv || t.hNiv || 3.0);
    const hParter = Math.max(2.4, ov.hParter || t.hParter || 3.0);
    const hasRetras = ov.hasRetras || false;
    const hasComercial = tipKey === 'bloc' && (ov.parterComercial !== false);

    // Footprint del lot — aplicăm retragerea față din tipul de locuință
    const lotFeat = {type:'Feature', geometry:lot.geometry, properties:{}};
    let fpGeom = lot.geometry; // implicit = lotul integral
    try {
      // Retragere față de drumul din lot (retF din tipul de construcție)
      const retF = t.retF || 0;
      const retL = t.retL || 0;
      if(retF > 0 || retL > 0) {
        const buf = turf.buffer(lotFeat, -(Math.max(retF,retL)/2), {units:'meters'});
        if(buf?.geometry && turf.area(buf) > 10) fpGeom = buf.geometry;
      }
    } catch(e){}

    // Culori per tip
    const tipColors = {
      individuala: {etaje:['#4ade80','#6ee89a','#88f0b0'], retras:'#a0f0c0'},
      insiruita:   {etaje:['#60a5fa','#7ab8fb','#93cafc'], retras:'#acdbfd'},
      duplex:      {etaje:['#fbbf24','#fcc93c','#fdd154'], retras:'#fdd97c'},
      bloc:        {etaje:['#a78bfa','#b5a0fb','#c3b5fc'], retras:'#d1c9fd', comercial:'#f59e0b'},
    };
    const colors = tipColors[tipKey] || tipColors.individuala;

    // Generare etaje
    for(let i = 0; i < niv; i++){
      let base, top, color, geom = fpGeom;

      if(i === 0){
        base = 0;
        top  = hParter;
        color = (hasComercial && tipKey==='bloc') ? colors.comercial : colors.etaje[0];
      } else {
        base  = hParter + (i-1)*hNiv;
        top   = base + hNiv;
        color = colors.etaje[Math.min(i, colors.etaje.length-1)];
      }

      // Etaj retras (ultimul etaj)
      const isLast = i === niv-1 && niv > 1;
      if(hasRetras && isLast){
        try{
          const sc = turf.transformScale(
            {type:'Feature',geometry:fpGeom,properties:{}},
            0.80, {origin:turf.centerOfMass({type:'Feature',geometry:fpGeom,properties:{}})}
          );
          if(sc?.geometry){ geom = sc.geometry; color = colors.retras; }
        }catch(e){}
      }

      feats3D.push({
        type:'Feature',
        geometry: geom,
        properties:{
          base, top, color,
          floor: i,
          parcelIdx: lotIdx,
          lotTip: tipKey,
          isLotizare: true,
          isRetras: hasRetras && isLast,
          isComercial: i===0 && hasComercial,
          scenariu: 'liber'
        }
      });
    }

    // Etaj retras suplimentar (dacă hasRetras)
    if(hasRetras){
      const lastBase = hParter + Math.max(0, niv-1)*hNiv;
      try{
        const sc = turf.transformScale(
          {type:'Feature',geometry:fpGeom,properties:{}},
          0.75, {origin:turf.centerOfMass({type:'Feature',geometry:fpGeom,properties:{}})}
        );
        if(sc?.geometry){
          feats3D.push({
            type:'Feature',
            geometry: sc.geometry,
            properties:{base:lastBase, top:lastBase+2.8, color:colors.retras,
              floor:niv, parcelIdx:lotIdx, lotTip:tipKey, isLotizare:true, isRetras:true, scenariu:'liber'}
          });
        }
      }catch(e){}
    }
  });

  // Drumuri ca volume plate (h=0.15m — bordura/carosabil vizibil)
  drumuri?.forEach((drum, di) => {
    if(!drum.geometry) return;
    feats3D.push({
      type:'Feature',
      geometry: drum.geometry,
      properties:{base:0, top:0.15, color:'#475569',
        floor:-10, parcelIdx:-1, lotTip:'drum', isLotizare:true, scenariu:'liber'}
    });
  });

  // Trimite în vol-src — viewer-ul 3D redă automat
  setSource('vol-src', {type:'FeatureCollection', features:feats3D});
  S.vol.genDone = true;
  S.vol._lastFeats = feats3D;

  // Switch automat la vedere 3D
  if(map.getPitch() < 20){
    map.easeTo({pitch:45, duration:600});
  }
}

function _lotHtmlTipuri(){
  return Object.entries(_LOT.tipuri).map(([key, def])=>{
    const ov = _LOT.tipOverride[key]||{};
    const t  = {...def, ...ov}; // parametri efectivi
    const hasOverride = Object.keys(ov).length > 0;

    // Calcul H total din niv + hNiv
    const hNiv = ov.hNiv || def.hNiv || 3.0;
    const hTotal = (t.niv * hNiv).toFixed(1);
    const hParter = ov.hParter || def.hParter || 3.0;
    const hRetras = ov.hasRetras !== undefined ? ov.hasRetras : false;

    return `
    <div style="background:rgba(255,255,255,.04);border:1px solid ${hasOverride?t.color+'66':'rgba(255,255,255,.07)'};border-radius:12px;padding:12px;margin-bottom:10px;border-left:3px solid ${t.color}">

      <!-- Header tip -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:18px">${def.icon}</span>
          <div>
            <div style="color:#e2e8f0;font-size:12px;font-weight:800">${def.label}</div>
            <div style="color:#475569;font-size:9px">${def.desc}</div>
          </div>
        </div>
        ${hasOverride?`<button onclick="delete _LOT.tipOverride['${key}'];_lotTab('t')" style="font-size:9px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.25);color:#f87171;border-radius:5px;padding:2px 7px;cursor:pointer">↩ Reset</button>`:'<span style="font-size:8px;color:#334155">PUG implicit</span>'}
      </div>

      <!-- Regim înălțime -->
      <div style="background:rgba(0,0,0,.25);border-radius:8px;padding:8px 10px;margin-bottom:8px">
        <div style="font-size:9px;color:#d4af37;font-weight:700;text-transform:uppercase;margin-bottom:6px">Regim de înălțime</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px">

          <!-- Nr. niveluri -->
          <div>
            <div style="font-size:9px;color:#64748b;margin-bottom:3px">Nr. niveluri (fără parter)</div>
            <div style="display:flex;gap:3px;flex-wrap:wrap">
              ${[0,1,2,3,4,5,6,7].map(n=>`
                <button onclick="_lotSetTipParam('${key}','niv',${n+1});_lotTab('t')"
                  style="padding:4px 7px;border-radius:5px;font-size:11px;font-weight:700;cursor:pointer;
                  border:1px solid ${t.niv===(n+1)?t.color:'rgba(255,255,255,.12)'};
                  background:${t.niv===(n+1)?t.color+'33':'rgba(11,18,32,.8)'};
                  color:${t.niv===(n+1)?t.color:'#64748b'}">
                  ${n===0?'P':('P+'+n+'E')}
                </button>`).join('')}
            </div>
          </div>

          <!-- Etaj retras -->
          <div>
            <div style="font-size:9px;color:#64748b;margin-bottom:3px">Etaj retras/mansardă</div>
            <div style="display:flex;gap:4px">
              <button onclick="_lotSetTipParam('${key}','hasRetras',false);_lotTab('t')"
                style="flex:1;padding:5px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;
                border:1px solid ${!hRetras?t.color:'rgba(255,255,255,.12)'};
                background:${!hRetras?t.color+'22':'rgba(11,18,32,.8)'};
                color:${!hRetras?t.color:'#64748b'}">Fără</button>
              <button onclick="_lotSetTipParam('${key}','hasRetras',true);_lotTab('t')"
                style="flex:1;padding:5px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;
                border:1px solid ${hRetras?t.color:'rgba(255,255,255,.12)'};
                background:${hRetras?t.color+'22':'rgba(11,18,32,.8)'};
                color:${hRetras?t.color:'#64748b'}">+1 Retras</button>
            </div>
          </div>
        </div>

        <!-- Înălțimi etaje -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
          <div>
            <div style="font-size:9px;color:#64748b;margin-bottom:3px">H parter (m)</div>
            <input type="number" min="2.5" max="6" step="0.1" value="${hParter}"
              style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:5px;padding:5px 8px;font-size:12px"
              oninput="_lotSetTipParam('${key}','hParter',+this.value)">
          </div>
          <div>
            <div style="font-size:9px;color:#64748b;margin-bottom:3px">H etaj curent (m)</div>
            <input type="number" min="2.5" max="5" step="0.1" value="${hNiv}"
              style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:5px;padding:5px 8px;font-size:12px"
              oninput="_lotSetTipParam('${key}','hNiv',+this.value);_lotTab('t')">
          </div>
        </div>

        <!-- H total calculat -->
        <div style="margin-top:6px;background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.2);border-radius:6px;padding:5px 8px;display:flex;justify-content:space-between">
          <span style="font-size:9px;color:#64748b">H total estimat:</span>
          <span style="color:#d4af37;font-size:11px;font-weight:800">
            ${(parseFloat(hParter) + Math.max(0,t.niv-1)*parseFloat(hNiv) + (hRetras?2.5:0)).toFixed(1)}m
            ${hRetras?' (+etaj retras)':''}
          </span>
        </div>
      </div>

      <!-- Suprafețe și retrageri -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px">
        <div>
          <div style="font-size:9px;color:#64748b;margin-bottom:3px">POT lot (%)</div>
          <input type="number" min="10" max="100" step="5" value="${t.sc}"
            style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:5px;padding:4px 7px;font-size:12px"
            oninput="_lotSetTipParam('${key}','sc',+this.value)">
        </div>
        <div>
          <div style="font-size:9px;color:#64748b;margin-bottom:3px">Ret. față (m)</div>
          <input type="number" min="0" max="20" step="0.5" value="${t.retF}"
            style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:5px;padding:4px 7px;font-size:12px"
            oninput="_lotSetTipParam('${key}','retF',+this.value)">
        </div>
        <div>
          <div style="font-size:9px;color:#64748b;margin-bottom:3px">Sup. utilă/ap (mp)</div>
          <input type="number" min="30" max="300" step="5" value="${t.suprafUtila}"
            style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:5px;padding:4px 7px;font-size:12px"
            oninput="_lotSetTipParam('${key}','suprafUtila',+this.value)">
        </div>
      </div>

      <!-- Rezumat regim -->
      <div style="margin-top:8px;padding:6px 8px;background:rgba(255,255,255,.03);border-radius:6px;font-size:9px;color:#64748b">
        Regim: <b style="color:#94a3b8">${t.niv===1?'Parter':'P+'+(t.niv-1)+'E'}${hRetras?'+Retras':''}</b>
        · H≈<b style="color:#d4af37">${(parseFloat(hParter) + Math.max(0,t.niv-1)*parseFloat(hNiv) + (hRetras?2.5:0)).toFixed(1)}m</b>
        · POT <b style="color:#94a3b8">${t.sc}%</b>
        · <b style="color:#94a3b8">${t.suprafUtila}mp/ap</b>
        · Retragere față <b style="color:#94a3b8">${t.retF}m</b>
      </div>
    </div>`;
  }).join('') +
  `<button onclick="Object.keys(_LOT.tipuri).forEach(k=>_LOT.tipOverride[k]={});_lotTab('t')"
    style="width:100%;padding:8px;background:rgba(100,116,139,.1);border:1px solid rgba(100,116,139,.2);color:#64748b;border-radius:8px;font-size:10px;cursor:pointer;margin-top:4px">
    ↩ Reset toți parametrii la valorile implicite
  </button>`;
}

function _lotHtmlParametri(){
  const ap=S.parcels[S.activeParcel??0];
  return `
  ${!ap?`<div style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:8px;padding:8px 10px;font-size:10px;color:#f87171;margin-bottom:10px">⚠️ Selectați mai întâi o parcelă de pe hartă</div>`:''}

  <div style="font-size:10px;color:#fbbf24;font-weight:700;margin-bottom:6px">📐 Suprafață lot (mp/lot)</div>
  <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:7px">
    ${[300,400,500,600,800,1000].map(v=>`<button onclick="_LOT.lotAria=${v};_lotTab('p')" style="background:${_LOT.lotAria===v?'rgba(251,191,36,.25)':'rgba(255,255,255,.06)'};border:1px solid ${_LOT.lotAria===v?'#fbbf24':'rgba(255,255,255,.1)'};color:${_LOT.lotAria===v?'#fbbf24':'#94a3b8'};border-radius:7px;padding:5px 10px;font-size:11px;font-weight:700;cursor:pointer">${v}mp</button>`).join('')}
  </div>
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
    <span style="font-size:10px;color:#64748b;min-width:68px">Personalizat:</span>
    <input type="number" value="${_LOT.lotAria}" min="100" max="5000" step="50"
      oninput="_LOT.lotAria=+this.value"
      style="flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#fbbf24;border-radius:7px;padding:5px 9px;font-size:12px;font-weight:700">
    <span style="color:#fbbf24;font-size:11px;font-weight:700">${_LOT.lotAria} mp</span>
  </div>

  <div style="font-size:10px;color:#38bdf8;font-weight:700;margin-bottom:6px">🛣 Circulații interioare</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-bottom:8px">
    ${[['latime','📏 Lățime fixă','Drum = lățimea setată'],['procent','📊 Procentaj','Drum = X% din teren'],['ambele','🔀 Ambele (min)','Cel mai restrictiv']].map(([v,l,d])=>`
      <button onclick="_LOT.drumMod='${v}';_lotTab('p')" style="background:${_LOT.drumMod===v?'rgba(56,189,248,.2)':'rgba(255,255,255,.04)'};border:1px solid ${_LOT.drumMod===v?'#38bdf8':'rgba(255,255,255,.08)'};border-radius:8px;padding:7px 4px;cursor:pointer;text-align:center">
        <div style="color:${_LOT.drumMod===v?'#38bdf8':'#e2e8f0'};font-size:10px;font-weight:700">${l}</div>
        <div style="color:#475569;font-size:8px;margin-top:2px">${d}</div>
      </button>`).join('')}
  </div>

  ${_LOT.drumMod!=='procent'?`
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
    <span style="font-size:10px;color:#64748b;min-width:80px">Lățime drum:</span>
    <input type="range" min="3" max="12" step="0.5" value="${_LOT.drumLat}"
      oninput="_LOT.drumLat=+this.value;this.nextElementSibling.textContent=this.value+'m'"
      style="flex:1;accent-color:#38bdf8">
    <span style="color:#38bdf8;font-size:12px;font-weight:700;min-width:35px">${_LOT.drumLat}m</span>
  </div>
  <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">
    ${[4,5,6,7,8,10].map(v=>`<button onclick="_LOT.drumLat=${v};_lotTab('p')" style="background:${_LOT.drumLat===v?'rgba(56,189,248,.2)':'rgba(255,255,255,.05)'};border:1px solid ${_LOT.drumLat===v?'#38bdf8':'rgba(255,255,255,.08)'};color:${_LOT.drumLat===v?'#38bdf8':'#64748b'};border-radius:6px;padding:4px 9px;font-size:10px;font-weight:700;cursor:pointer">${v}m</button>`).join('')}
  </div>`:''}

  ${_LOT.drumMod!=='latime'?`
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
    <span style="font-size:10px;color:#64748b;min-width:80px">% drum din teren:</span>
    <input type="range" min="5" max="40" step="1" value="${_LOT.drumProcent}"
      oninput="_LOT.drumProcent=+this.value;this.nextElementSibling.textContent=this.value+'%'"
      style="flex:1;accent-color:#38bdf8">
    <span style="color:#38bdf8;font-size:12px;font-weight:700;min-width:35px">${_LOT.drumProcent}%</span>
  </div>`:''}

  <div style="background:rgba(56,189,248,.07);border-radius:7px;padding:7px 10px;font-size:9px;color:#475569;margin-bottom:12px">
    💡 <b style="color:#38bdf8">Un sens:</b> min 3.5m &nbsp;|&nbsp; <b style="color:#38bdf8">Două sensuri:</b> min 6m &nbsp;|&nbsp; <b style="color:#38bdf8">Cu trotuare:</b> min 8m &nbsp;|&nbsp; <b style="color:#38bdf8">Bulevard:</b> 12m+
  </div>

  <div style="font-size:10px;color:#34d399;font-weight:700;margin-bottom:6px">🧭 Strategie generare loturi</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">
    ${[['grid','📏 Grilă regulată','Loturi egale în rânduri'],['strip','➡ Fâșii paralele','Loturi alungite, front la drum'],['adaptiv','🔄 Adaptiv','Urmărește forma parcelei'],['radial','◉ Periferic','Loturi pe conturul parcelei']].map(([v,l,d])=>`
      <button onclick="_LOT.strategie='${v}';_lotTab('p')" style="background:${_LOT.strategie===v?'rgba(52,211,153,.15)':'rgba(255,255,255,.04)'};border:1px solid ${_LOT.strategie===v?'#34d399':'rgba(255,255,255,.08)'};border-radius:8px;padding:8px;cursor:pointer;text-align:left">
        <div style="color:${_LOT.strategie===v?'#34d399':'#e2e8f0'};font-size:10px;font-weight:700">${l}</div>
        <div style="color:#475569;font-size:8.5px;margin-top:2px">${d}</div>
      </button>`).join('')}
  </div>`;
}

// ─── TAB: Mix tipuri ──────────────────────────────────────────────────────
function _lotHtmlMix(){
  const total=Object.values(_LOT.tipMix).reduce((s,v)=>s+v,0);
  return `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
    <span style="font-size:10px;color:#d4af37;font-weight:700">🏡 Mix tipuri locuințe</span>
    <span style="font-size:12px;font-weight:800;color:${total===100?'#4ade80':'#f87171'}">${total}% ${total===100?'✓':'≠100'}</span>
  </div>
  ${total!==100?`<div style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);border-radius:8px;padding:7px 10px;font-size:10px;color:#f87171;margin-bottom:8px">Totalul trebuie să fie 100% (acum ${total}%)</div>`:''}

  ${Object.entries(_LOT.tipuri).map(([k,t])=>`
    <div style="background:rgba(255,255,255,.04);border-radius:11px;padding:11px;border:1px solid rgba(255,255,255,.06);margin-bottom:6px;border-left:3px solid ${_LOT.tipMix[k]>0?t.color:'rgba(255,255,255,.1)'}">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
        <label style="display:flex;align-items:center;gap:7px;cursor:pointer">
          <input type="checkbox" ${_LOT.tipMix[k]>0?'checked':''} onchange="if(!this.checked){_LOT.tipMix['${k}']=0;_lotTab('m')}else{_LOT.tipMix['${k}']=25;_lotTab('m')}" style="accent-color:${t.color};width:16px;height:16px">
          <span style="font-size:13px">${t.icon}</span>
          <div>
            <div style="color:#e2e8f0;font-size:11px;font-weight:700">${t.label}</div>
            <div style="color:#475569;font-size:8.5px">${t.desc}</div>
          </div>
        </label>
        <span style="color:${t.color};font-size:16px;font-weight:800;min-width:38px;text-align:right" id="mix-v-${k}">${_LOT.tipMix[k]}%</span>
      </div>
      <input type="range" min="0" max="100" step="5" value="${_LOT.tipMix[k]}"
        oninput="_LOT.tipMix['${k}']=+this.value;document.getElementById('mix-v-${k}').textContent=this.value+'%'"
        style="width:100%;accent-color:${t.color};margin-bottom:7px">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:3px">
        ${[['Lot',t.lotDefault+'mp'],['SC',t.sc+'%'],['H',t.hMax+'m'],['Retrag.F',t.retF+'m']].map(([l,v])=>`
          <div style="text-align:center;padding:4px;background:rgba(255,255,255,.03);border-radius:5px">
            <div style="font-size:10px;font-weight:700;color:#94a3b8">${v}</div>
            <div style="font-size:7.5px;color:#475569">${l}</div>
          </div>`).join('')}
      </div>
    </div>`).join('')}

  <div style="font-size:10px;color:#64748b;font-weight:700;margin:10px 0 6px">⚡ Preset-uri rapide</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">
    ${[
      ['100% Individual',{individuala:100,insiruita:0,duplex:0,bloc:0}],
      ['100% Înșiruite',{individuala:0,insiruita:100,duplex:0,bloc:0}],
      ['Mix clasic (50+30+20)',{individuala:50,insiruita:30,duplex:20,bloc:0}],
      ['Mix urban (30+40+20+10)',{individuala:30,insiruita:40,duplex:20,bloc:10}],
      ['Duplex dominant',{individuala:20,insiruita:20,duplex:60,bloc:0}],
      ['Mixt cu bloc',{individuala:25,insiruita:25,duplex:25,bloc:25}],
    ].map(([l,mix])=>`
      <button onclick="Object.assign(_LOT.tipMix,${JSON.stringify(mix)});_lotTab('m')"
        style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:8px;text-align:left;cursor:pointer;transition:border-color .15s"
        onmouseover="this.style.borderColor='rgba(167,139,250,.4)'" onmouseout="this.style.borderColor='rgba(255,255,255,.08)'">
        <div style="color:#e2e8f0;font-size:10px;font-weight:700">${l}</div>
      </button>`).join('')}
  </div>`;
}

// ─── TAB: Rezultat ────────────────────────────────────────────────────────
function _lotHtmlRezultat(){
  if(!_LOT._bilant) return `<div style="color:#475569;font-size:12px;text-align:center;padding:24px">
    <div style="font-size:32px;margin-bottom:10px">🏘</div>
    Apasă <b style="color:#a78bfa">Generează Plan Lotizare</b>
  </div>`;
  const b=_LOT._bilant;
  const ap=S.parcels[S.activeParcel??0];
  const pA=ap?.area||0;

  return `
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:10px">
    ${[
      ['Total loturi',b.totalLoturi+' buc','#a78bfa'],
      ['Teren loturi',Math.round(b.terenLoturi)+' mp','#4ade80'],
      ['Teren drum+alei',Math.round(b.terenDrum)+' mp','#38bdf8'],
      ['Eficiență',(b.eficienta*100).toFixed(0)+'%','#fbbf24'],
      ['Lot mediu',Math.round(b.lotMediu)+' mp','#94a3b8'],
      ['Unități totale',b.totalUnitati+' buc','#f472b6'],
    ].map(([l,v,c])=>`<div style="background:rgba(255,255,255,.04);border-radius:9px;padding:8px;text-align:center">
      <div style="font-size:13px;font-weight:800;color:${c}">${v}</div>
      <div style="font-size:8px;color:#475569;margin-top:2px">${l}</div>
    </div>`).join('')}
  </div>

  <div style="font-size:10px;color:#d4af37;font-weight:700;margin-bottom:6px">Distribuție per tip</div>
  ${Object.entries(b.perTip).filter(([,v])=>v.count>0).map(([k,v])=>{
    const t=_LOT.tipuri[k];
    const pct=pA>0?((v.count*_LOT.lotAria/pA)*100).toFixed(0):'—';
    return `<div style="background:rgba(255,255,255,.04);border-radius:9px;padding:9px;border-left:3px solid ${t.color};margin-bottom:5px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
        <span style="color:#e2e8f0;font-size:11px;font-weight:700">${t.icon} ${t.label}</span>
        <span style="color:${t.color};font-size:13px;font-weight:800">${v.count} loturi · ${pct}%</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:3px">
        ${[['Suprafață',Math.round(v.suprafataTotala)+' mp'],['SC max',Math.round(v.scMax)+' mp'],['Unități',v.unitati+' buc'],['ROI',v.roi+'%']].map(([l,val])=>`
          <div style="text-align:center;padding:4px;background:rgba(255,255,255,.03);border-radius:5px">
            <div style="font-size:10px;font-weight:700;color:#94a3b8">${val}</div>
            <div style="font-size:7.5px;color:#475569">${l}</div>
          </div>`).join('')}
      </div>
    </div>`;
  }).join('')}

  <div style="font-size:10px;color:#38bdf8;font-weight:700;margin:10px 0 6px">✅ Verificare PUG</div>
  ${b.verificari.map(v=>`
    <div style="padding:6px 9px;background:rgba(255,255,255,.03);border-radius:7px;margin-bottom:3px">
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:13px">${v.ok?'✅':'⚠️'}</span>
        <span style="color:#94a3b8;font-size:10px;flex:1">${v.label}</span>
        <span style="color:${v.ok?'#4ade80':'#fbbf24'};font-size:10px;font-weight:700">${v.value}</span>
      </div>
      ${v.warn?`<div style="font-size:9px;color:#64748b;margin-top:3px;padding-left:21px">${v.warn}</div>`:''}
    </div>`).join('')}

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:10px">
    <button onclick="runLotizare()" style="background:rgba(167,139,250,.15);border:1px solid rgba(167,139,250,.3);color:#a78bfa;border-radius:8px;padding:9px;font-size:10px;font-weight:700;cursor:pointer">🔄 Regenerează</button>
    <button onclick="_lotTab('x')" style="background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.3);color:#d4af37;border-radius:8px;padding:9px;font-size:10px;font-weight:700;cursor:pointer">📄 Export PDF</button>
  </div>`;
}

// ─── TAB: Financiar ───────────────────────────────────────────────────────
function _lotHtmlFinanciar(){
  if(!_LOT._bilant) return `<div style="color:#475569;font-size:11px;text-align:center;padding:24px">Generați planul mai întâi.</div>`;
  const b=_LOT._bilant;
  const ap=S.parcels[S.activeParcel??0];
  const utr=ap?.utr||'default';
  const landPx=MARKET_DATA?.landPrice?.[utr]||300;
  const terenVal=(ap?.area||0)*landPx;

  return `
  <div style="background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.2);border-radius:11px;padding:11px;margin-bottom:10px">
    <div style="font-size:10px;color:#fbbf24;font-weight:700;margin-bottom:8px">💰 Rezumat financiar ansamblu</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">
      ${[
        ['Valoare teren',Math.round(terenVal/1000)+'k€','#fbbf24'],
        ['Cost construcție',Math.round(b.costConstrTotal/1000)+'k€','#94a3b8'],
        ['Venituri estimate',Math.round(b.venituriTotal/1000)+'k€','#4ade80'],
        ['Profit estimat',Math.round(b.profitTotal/1000)+'k€',b.profitTotal>0?'#4ade80':'#f87171'],
        ['ROI total',b.roi+'%',b.roi>=20?'#4ade80':b.roi>=12?'#fbbf24':'#f87171'],
        ['Profit/lot mediu',Math.round(b.profitTotal/Math.max(1,b.totalLoturi)/1000)+'k€','#a78bfa'],
      ].map(([l,v,c])=>`<div style="text-align:center;padding:8px;background:rgba(255,255,255,.04);border-radius:8px">
        <div style="font-size:13px;font-weight:800;color:${c}">${v}</div>
        <div style="font-size:8px;color:#475569">${l}</div>
      </div>`).join('')}
    </div>
  </div>

  <div style="height:8px;border-radius:4px;overflow:hidden;display:flex;margin-bottom:6px">
    <div style="width:${Math.min(80,(terenVal/Math.max(1,b.venituriTotal)*100)).toFixed(0)}%;background:#fbbf24;min-width:3px" title="Teren"></div>
    <div style="flex:1;background:rgba(255,255,255,.06)"></div>
    <div style="width:${Math.min(80,(b.profitTotal/Math.max(1,b.venituriTotal)*100)).toFixed(0)}%;background:#4ade80;min-width:3px" title="Profit"></div>
  </div>

  <div style="font-size:10px;color:#4ade80;font-weight:700;margin:10px 0 6px">📈 Detalii per tip locuință</div>
  ${Object.entries(b.perTip).filter(([,v])=>v.count>0).map(([k,v])=>{
    const t=_LOT.tipuri[k];
    return `<div style="background:rgba(255,255,255,.04);border-radius:10px;padding:10px;border-left:3px solid ${t.color};margin-bottom:6px">
      <div style="display:flex;justify-content:space-between;margin-bottom:5px">
        <span style="color:#e2e8f0;font-size:11px;font-weight:700">${t.icon} ${t.label} · ${v.count} buc</span>
        <span style="color:${v.profit>0?'#4ade80':'#f87171'};font-size:11px;font-weight:800">${Math.round(v.profit/1000)}k€</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:3px">
        ${[['Invest.',Math.round(v.cost/1000)+'k€'],['Venituri',Math.round(v.venit/1000)+'k€'],['Profit',Math.round(v.profit/1000)+'k€'],['ROI',v.roi+'%']].map(([l,val])=>`
          <div style="text-align:center;padding:4px;background:rgba(255,255,255,.03);border-radius:5px">
            <div style="font-size:10px;font-weight:700;color:#94a3b8">${val}</div>
            <div style="font-size:7.5px;color:#475569">${l}</div>
          </div>`).join('')}
      </div>
      <div style="margin-top:5px;height:3px;background:rgba(255,255,255,.06);border-radius:2px">
        <div style="height:100%;width:${Math.min(100,v.roi*2)}%;background:${v.roi>=20?'#4ade80':v.roi>=12?'#fbbf24':'#ef4444'};border-radius:2px"></div>
      </div>
    </div>`;
  }).join('')}
  <div style="font-size:8px;color:#334155;text-align:center;padding:6px;margin-top:4px">
    ⚠️ Estimativ. Nu include taxe, avize, branșamente (~5-8%). Confirmare cu evaluator ANEVAR.
  </div>`;
}

// ─── TAB: Export ─────────────────────────────────────────────────────────
function _lotHtmlExport(){
  // hasBilant: bilant calculat SAU loturi generate (fallback)
  const hasBilant=!!_LOT._bilant || (_LOT._loturi?.length>0);
  return `
  <div style="font-size:10px;color:#d4af37;font-weight:700;margin-bottom:10px">📄 Export documente</div>
  ${!hasBilant?`<div style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);border-radius:8px;padding:8px 10px;font-size:10px;color:#f87171;margin-bottom:10px">⚠️ Generați planul de lotizare mai întâi</div>`:''}

  <div style="display:flex;flex-direction:column;gap:6px">
    <button onclick="_lotExportPDF()" ${!hasBilant?'disabled':''} style="background:${hasBilant?'rgba(212,175,55,.15)':'rgba(255,255,255,.03)'};border:1px solid ${hasBilant?'rgba(212,175,55,.3)':'rgba(255,255,255,.06)'};color:${hasBilant?'#d4af37':'#334155'};border-radius:10px;padding:12px;font-size:11px;font-weight:700;cursor:${hasBilant?'pointer':'not-allowed'};text-align:left">
      📄 <b>Export PDF complet</b><br>
      <span style="font-size:9px;opacity:.7">Cover + Plan situație (hartă) + Bilanț suprafețe + Analiză financiară + Verificare PUG</span>
    </button>
    <button onclick="_lotExportClipboard()" ${!hasBilant?'disabled':''} style="background:${hasBilant?'rgba(99,102,241,.15)':'rgba(255,255,255,.03)'};border:1px solid ${hasBilant?'rgba(99,102,241,.3)':'rgba(255,255,255,.06)'};color:${hasBilant?'#818cf8':'#334155'};border-radius:10px;padding:12px;font-size:11px;font-weight:700;cursor:${hasBilant?'pointer':'not-allowed'};text-align:left">
      📋 <b>Copiază bilanț (text)</b><br>
      <span style="font-size:9px;opacity:.7">Tabel sumar pentru clipboard — pastă în Word/Excel</span>
    </button>
    <button onclick="runLotizare()" style="background:rgba(167,139,250,.15);border:1px solid rgba(167,139,250,.3);color:#a78bfa;border-radius:10px;padding:12px;font-size:11px;font-weight:700;cursor:pointer;text-align:left">
      🔄 <b>Regenerează plan</b><br>
      <span style="font-size:9px;opacity:.7">Recalculează cu parametrii curenți</span>
    </button>
  </div>`;
}

// ════════════════════════════════════════════════════════════════════════════
// MOTOR GENERARE
// ════════════════════════════════════════════════════════════════════════════
function runLotizare(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('⚠️ Selectați o parcelă de pe hartă.');return;}

  const totalMix=Object.values(_LOT.tipMix).reduce((s,v)=>s+v,0);
  if(totalMix===0){ss('⚠️ Selectați cel puțin un tip de locuință.');return;}

  ss('🏘 Se generează planul de lotizare...');

  try{
    const pFeat={type:'Feature',geometry:ap.geo.geometry,properties:{}};
    const pArea=turf.area(pFeat);
    const params=ap.params||getDefaultParams(ap.utr||'');

    // Edificabil (cu retrageri față de stradă)
    // Dacă există clădiri marcate pentru demolare → le excludem din calcul
    // (tratate ca teren liber, nu mai influențează edificabilul)
    const fp=buildFP(ap.geo.geometry,params)||pFeat;
    const fpArea=turf.area(fp);

    // Suprafață drum
    let drumAreaFract;
    const bbox2=turf.bbox(fp);
    const wM2=(bbox2[2]-bbox2[0])*111320*Math.cos(((bbox2[1]+bbox2[3])/2)*Math.PI/180);
    const hM2=(bbox2[3]-bbox2[1])*111320;
    const lotDim=Math.sqrt(_LOT.lotAria);
    // Număr de drumuri = câte rânduri de loturi există (aproximativ)
    const nrLoturiEst=Math.floor(fpArea/_LOT.lotAria);
    const colsEst=Math.max(1,Math.round(Math.sqrt(nrLoturiEst*wM2/Math.max(1,hM2))));
    const rowsEst=Math.max(1,Math.ceil(nrLoturiEst/colsEst));
    // Lungime totală drum = 1 drum principal + (rânduri-1) drumuri secundare
    const lungimeDrum=(1 + Math.max(0,rowsEst-1)) * Math.max(wM2,hM2);
    const drumAreaEst=lungimeDrum*_LOT.drumLat; // mp
    const fractLat=Math.min(0.30, drumAreaEst/Math.max(1,fpArea)); // max 30%

    if(_LOT.drumMod==='latime'){
      drumAreaFract=fractLat;
    } else if(_LOT.drumMod==='procent'){
      drumAreaFract=Math.min(0.35, _LOT.drumProcent/100);
    } else {
      // ambele — luăm maximul dar plafonat la 30%
      drumAreaFract=Math.min(0.30, Math.max(fractLat, _LOT.drumProcent/100));
    }

    const terenUtil=fpArea*(1-drumAreaFract);
    const nrLoturiTotal=Math.max(1,Math.floor(terenUtil/_LOT.lotAria));

    // Distribuire loturi per tip
    const loturiPerTip={};
    let ramas=nrLoturiTotal;
    const tipuriActiv=Object.entries(_LOT.tipMix).filter(([,v])=>v>0);
    tipuriActiv.forEach(([k,pct],i)=>{
      if(i===tipuriActiv.length-1) loturiPerTip[k]=ramas;
      else{const n=Math.max(0,Math.round(nrLoturiTotal*pct/totalMix));loturiPerTip[k]=n;ramas-=n;}
    });
    Object.keys(_LOT.tipuri).forEach(k=>{if(!loturiPerTip[k])loturiPerTip[k]=0;});

    // Generare geometrii
    const {loturi,drumuri}=_genLotizareGeom(fp,loturiPerTip,drumAreaFract);

    // Bilanț
    const terenLoturi=loturi.reduce((s,l)=>{try{return s+turf.area(l);}catch(e){return s;}},0);
    const terenDrum=Math.max(0,fpArea-terenLoturi);
    const eficienta=terenLoturi/Math.max(1,fpArea);
    const totalUnitati=Object.entries(loturiPerTip).reduce((s,[k,n])=>s+(n*(_lotGetTip(k)?.niv||1)),0);

    // Financiar
    const utr=ap.utr||'default';
    const landPx=MARKET_DATA?.landPrice?.[utr]||300;
    const terenVal=pArea*landPx;
    let costConstrTotal=0,venituriTotal=0;
    const perTip={};
    Object.entries(loturiPerTip).forEach(([k,count])=>{
      const t=_lotGetTip(k);if(!t||count===0)return;
      const unitati=count*t.niv;
      const sdTotal=count*t.suprafUtila*t.niv;
      const scMax=count*(_LOT.lotAria*t.sc/100);
      const cost=sdTotal*t.pretConstr*1.18;
      const costTerenTip=count*_LOT.lotAria*landPx; // cost teren alocat acestui tip
      const venit=sdTotal*t.pretVanzare*0.92;
      const profit=venit-cost-costTerenTip;
      const roi=Math.round((profit/Math.max(1,cost+costTerenTip))*100);
      costConstrTotal+=cost;venituriTotal+=venit;
      perTip[k]={count,unitati,suprafataTotala:count*_LOT.lotAria,scMax,cost,venit,profit,roi};
    });
    const profitTotal=venituriTotal-terenVal-costConstrTotal;
    const roi=Math.round((profitTotal/Math.max(1,terenVal+costConstrTotal))*100);

    // Verificări
    const verificari=[
      {label:'Lot ≥ 150mp (min legal)',value:_LOT.lotAria+'mp',ok:_LOT.lotAria>=150},
      {label:'Drum ≥ 3.5m (un sens)',value:_LOT.drumLat+'m',ok:_LOT.drumLat>=3.5},
      {label:'Drum ≥ 6m (două sensuri)',value:_LOT.drumLat+'m',ok:_LOT.drumLat>=6},
      {label:'Loturi generate',value:loturi.length+' buc',ok:loturi.length>0},
      {label:'Eficiență utilizare (>60%)',value:(eficienta*100).toFixed(0)+'%',ok:eficienta>0.6,warn:eficienta<0.4?'Parcelă neregulată — normală pentru forme triunghiulare':null},
      {label:'Suprafață drum (<30%)',value:(drumAreaFract*100).toFixed(0)+'%',ok:drumAreaFract<0.30},
    ];

    _LOT._loturi=loturi;_LOT._drumuri=drumuri;
    _LOT._bilant={totalLoturi:loturi.length,terenLoturi,terenDrum,eficienta,lotMediu:terenLoturi/Math.max(1,loturi.length),totalUnitati,perTip,verificari,costConstrTotal,venituriTotal,profitTotal,roi};

    // ── Afișare hartă 2D ──────────────────────────────────────────────────
    setSource('lotizare-src',{type:'FeatureCollection',features:loturi});
    setSource('lotizare-drum-src',{type:'FeatureCollection',features:drumuri});
    const labels=loturi.map((l,li)=>{
      const tip=l.properties.tip||'individuala';
      const t=_LOT.tipuri[tip]||_LOT.tipuri.individuala;
      const tv=_lotGetTip(tip);
      const a=Math.round(turf.area(l));
      const reg=tv.niv===1?'P':('P+'+(tv.niv-1)+'E');
      // Label concis: nr. lot + suprafata + regim
      return {type:'Feature',geometry:turf.centerOfMass(l).geometry,
        properties:{
          label:'L'+(li+1)+'\n'+a+'mp\n'+reg,
          color:t.color
        }};
    });
    setSource('lotizare-label-src',{type:'FeatureCollection',features:labels});

    // ── Generare volume 3D → vol-src ──────────────────────────────────────
    _lotBuild3D(loturi, drumuri);

    try{const bb=turf.bbox(pFeat);map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:60,duration:700});}catch(e){}
    ss(`🏘 ${loturi.length} loturi · ${totalUnitati} unități · ROI ${roi}%`);
    _showLotizarePanel();setTimeout(()=>_lotTab('r'),80);

  }catch(e){console.error('Lotizare:',e);ss('⚠️ Eroare: '+e.message);}
}

// ─── Generator geometrii ──────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
// EDITOR CIRCULAȚII — desenare interactivă pe hartă
// ═══════════════════════════════════════════════════════════════════════════

function _lotDrumEditorStart(tip){
  // Dacă deja desenăm un alt tip, oprim mai întâi
  if(_LOT._drumEditMode === 'draw') _lotDrumEditorCancel();

  _LOT._drumEditMode = 'draw';
  _LOT._drumDrawTip  = tip || 'secundar';
  _LOT._drumDrawCoords = [];
  map.getCanvas().style.cursor = 'crosshair';
  const cfg = _LOT.drumTipuri[tip]||_LOT.drumTipuri.secundar;

  // ── Overlay transparent peste hartă — blochează interacțiunile obișnuite ──
  // Asigurăm că click-urile ajung la handlerul nostru, nu la alte elemente
  let overlay = document.getElementById('lot-draw-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'lot-draw-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:1;cursor:crosshair;pointer-events:none;';
    document.body.appendChild(overlay);
  }
  overlay.style.pointerEvents = 'none'; // nu blocăm mouse-ul, doar marcăm starea

  // ── Mesaj status (statusbar + banner în panou) ──────────────────────
  ss('✏️ ' + cfg.label + ': click/tap pe HARTĂ pentru puncte · Enter=finalizare · Esc=anulare');

  // Banner vizibil direct în panoul lotizare (vital pe mobile)
  _lotDrawBannerShow(cfg);

  _lotDrumEditorBind();
}

// Afișează banner "modul desen activ" în panoul lotizare
function _lotDrawBannerShow(cfg){
  let banner = document.getElementById('lot-draw-banner');
  if(!banner){
    banner = document.createElement('div');
    banner.id = 'lot-draw-banner';
    // Îl inserăm DEASUPRA conținutului lot-content
    const content = document.getElementById('lot-content');
    if(content) content.parentNode.insertBefore(banner, content);
  }
  banner.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:8px;'
    + 'background:rgba(167,139,250,.18);border-top:2px solid '+(cfg?.color||'#a78bfa')+';'
    + 'border-bottom:1px solid rgba(167,139,250,.25);padding:10px 16px;flex-shrink:0;'
    + 'animation:lot-pulse .9s ease-in-out infinite alternate';
  banner.innerHTML =
    '<div>'
    + '<div style="font-size:12px;font-weight:800;color:#a78bfa">✏️ MOD DESEN ACTIV</div>'
    + '<div style="font-size:10px;color:#94a3b8;margin-top:2px">'
    + (window.innerWidth < 841
        ? '👆 Tap pe hartă (sus) pentru puncte'
        : '🖱 Click pe hartă pentru puncte')
    + ' · Enter=gata · Esc=anulare</div>'
    + '</div>'
    + '<div style="display:flex;gap:6px">'
    + '<button onclick="_lotDrumEditorFinish()" style="background:rgba(52,211,153,.2);border:1px solid #34d399;color:#34d399;border-radius:7px;padding:6px 12px;cursor:pointer;font-size:11px;font-weight:700">✅ Gata</button>'
    + '<button onclick="_lotDrumEditorCancel()" style="background:rgba(239,68,68,.15);border:1px solid #ef4444;color:#f87171;border-radius:7px;padding:6px 12px;cursor:pointer;font-size:11px;font-weight:700">✕ Anulare</button>'
    + '</div>';

  // Injectăm animația CSS dacă nu există
  if(!document.getElementById('lot-draw-anim-css')){
    const st = document.createElement('style');
    st.id = 'lot-draw-anim-css';
    st.textContent = '@keyframes lot-pulse{from{opacity:.85}to{opacity:1}}';
    document.head.appendChild(st);
  }

  // Pe mobile, scrollăm la top pentru a fi vizibil
  const content2 = document.getElementById('lot-content');
  if(content2) content2.scrollTop = 0;
  // Scroll panoul însuși la top
  const panel = document.getElementById('lotizare-panel');
  if(panel) panel.scrollTop = 0;
}

function _lotDrumEditorBind(){
  const canvas = map.getCanvas();

  // ── Click pe CANVAS cu capture:true ─────────────────────────────────────
  // Prin capture:true, handlerul nostru rulează PRIMUL, înaintea oricărui
  // alt handler Mapbox (selectare parcelă, popup-uri etc.)
  // stopImmediatePropagation() blochează toți ceilalți handleri → nu mai
  // ieșim accidental din modul de desen
  map._lotCanvasClick = (e) => {
    if(_LOT._drumEditMode !== 'draw') return;
    // Blocăm propagarea → parcelele, popup-urile NU se activează
    e.stopPropagation();
    e.stopImmediatePropagation();
    // Convertim coordonate ecran → geografice Mapbox
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    if(isNaN(x)||isNaN(y)) return;
    const lngLat = map.unproject([x, y]);
    _LOT._drumDrawCoords.push([lngLat.lng, lngLat.lat]);
    _lotDrumEditorRefreshPreview();
  };

  // ── Touch (mobile) ──────────────────────────────────────────────────────
  // Pe mobil touchend e mai rapid decât click și nu are delay de 300ms
  map._lotCanvasTouch = (e) => {
    if(_LOT._drumEditMode !== 'draw') return;
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault(); // previne zoom dublu-tap
    const touch = e.changedTouches?.[0];
    if(!touch) return;
    const rect = canvas.getBoundingClientRect();
    const lngLat = map.unproject([touch.clientX - rect.left, touch.clientY - rect.top]);
    _LOT._drumDrawCoords.push([lngLat.lng, lngLat.lat]);
    _lotDrumEditorRefreshPreview();
  };

  // ── Dublu-click / dublu-tap = finalizare ───────────────────────────────
  map._lotCanvasDbl = (e) => {
    if(_LOT._drumEditMode !== 'draw') return;
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
    // Eliminăm ultimul punct adăugat de click-ul simplu al dbl-click
    if(_LOT._drumDrawCoords.length > 1) _LOT._drumDrawCoords.pop();
    _lotDrumEditorFinish();
  };

  // ── Keyboard ────────────────────────────────────────────────────────────
  map._lotKeyHandler = (e) => {
    if(_LOT._drumEditMode !== 'draw') return;
    if(e.key==='Escape'){ e.stopPropagation(); _lotDrumEditorCancel(); }
    if(e.key==='Enter'){  e.stopPropagation(); _lotDrumEditorFinish(); }
    if(e.key==='Backspace'||e.key==='Delete'){
      e.stopPropagation();
      if(_LOT._drumDrawCoords.length > 1){
        _LOT._drumDrawCoords.pop();
        _lotDrumEditorRefreshPreview();
      }
    }
  };

  // ── Înregistrare ────────────────────────────────────────────────────────
  // capture:true → primul în lanțul de propagare
  canvas.addEventListener('click',    map._lotCanvasClick, {capture:true});
  canvas.addEventListener('touchend', map._lotCanvasTouch, {capture:true, passive:false});
  canvas.addEventListener('dblclick', map._lotCanvasDbl,   {capture:true});
  document.addEventListener('keydown', map._lotKeyHandler,  {capture:false});

  // Dezactivăm double-click zoom al hărții pe durata desenului
  map._lotDblZoomWasEnabled = map.doubleClickZoom?.isEnabled?.() ?? true;
  map.doubleClickZoom?.disable?.();
}

function _lotDrumEditorUnbind(){
  const canvas = map.getCanvas();
  if(map._lotCanvasClick) canvas.removeEventListener('click',    map._lotCanvasClick, {capture:true});
  if(map._lotCanvasTouch) canvas.removeEventListener('touchend', map._lotCanvasTouch, {capture:true});
  if(map._lotCanvasDbl)   canvas.removeEventListener('dblclick', map._lotCanvasDbl,   {capture:true});
  if(map._lotKeyHandler)  document.removeEventListener('keydown', map._lotKeyHandler, {capture:false});
  map._lotCanvasClick = null;
  map._lotCanvasTouch = null;
  map._lotCanvasDbl   = null;
  map._lotKeyHandler  = null;
  // Restaurăm double-click zoom
  if(map._lotDblZoomWasEnabled !== false) map.doubleClickZoom?.enable?.();
  map._lotDblZoomWasEnabled = null;
  // Păstrăm compatibilitate cu codul care verifică _lotClickHandler
  map._lotClickHandler = null;
  map._lotDblClickHandler = null;
}

function _lotDrumEditorRefreshPreview(){
  const coords = _LOT._drumDrawCoords;
  if(coords.length < 1){ setSource('lot-drum-edit-src',{type:'FeatureCollection',features:[]}); return; }
  const cfg = _LOT.drumTipuri[_LOT._drumDrawTip] || _LOT.drumTipuri.secundar;
  const lineW = Math.max(2, cfg.latime / 2);

  // Linie preview + vertices existente
  const features = [];
  if(coords.length >= 2){
    features.push({type:'Feature',geometry:{type:'LineString',coordinates:coords},
      properties:{color:cfg.color, lineW:lineW+2, caseColor:'#0f172a', caseW:lineW+6, tip:_LOT._drumDrawTip}});
  }
  setSource('lot-drum-edit-src',{type:'FeatureCollection',features});

  // Vertices
  const verts = coords.map((c,i)=>({type:'Feature',
    geometry:{type:'Point',coordinates:c},
    properties:{idx:i, sel: i===coords.length-1}}));
  setSource('lot-drum-vert-src',{type:'FeatureCollection',features:verts});
}

function _lotDrumEditorFinish(){
  const coords = _LOT._drumDrawCoords;
  if(coords.length < 2){ _lotDrumEditorCancel(); return; }
  const cfg = _LOT.drumTipuri[_LOT._drumDrawTip] || _LOT.drumTipuri.secundar;

  const drum = {
    id: 'drum_' + (_LOT._drumNextId++),
    tip: _LOT._drumDrawTip,
    coords: [...coords],
    latime: cfg.latime,
    label: cfg.label,
  };
  _LOT._drumCustom.push(drum);

  _lotDrumEditorCancel();
  _lotDrumEditorRefreshAllLines();
  // Recalcul automat dacă există plan generat
  if(_LOT._loturi.length > 0) runLotizare();
  ss('✅ '+drum.label+' adăugat ('+coords.length+' puncte)');
  _lotDrumEditorUpdatePanel();
}

function _lotDrumEditorCancel(){
  _LOT._drumEditMode = null;
  _LOT._drumDrawCoords = [];
  map.getCanvas().style.cursor = '';
  // Curăță overlay
  const overlay = document.getElementById('lot-draw-overlay');
  if(overlay) overlay.remove();
  // Ascundem bannerul de desen activ
  const b = document.getElementById('lot-draw-banner');
  if(b) b.style.display = 'none';
  _lotDrumEditorUnbind();
  _lotDrumEditorRefreshAllLines();
  setSource('lot-drum-vert-src',{type:'FeatureCollection',features:[]});
}

function _lotDrumEditorDelete(drumId){
  _LOT._drumCustom = _LOT._drumCustom.filter(d=>d.id!==drumId);
  _lotDrumEditorRefreshAllLines();
  if(_LOT._loturi.length > 0) runLotizare();
  _lotDrumEditorUpdatePanel();
  ss('🗑 Drum șters');
}

function _lotDrumEditorClear(){
  _LOT._drumCustom = [];
  _lotDrumEditorRefreshAllLines();
  if(_LOT._loturi.length > 0) runLotizare();
  _lotDrumEditorUpdatePanel();
  ss('🗑 Toate circulațiile manuale șterse');
}

function _lotDrumEditorRefreshAllLines(){
  const features = [];
  _LOT._drumCustom.forEach(d=>{
    const cfg = _LOT.drumTipuri[d.tip] || _LOT.drumTipuri.secundar;
    const lw = Math.max(2, d.latime/2);
    features.push({type:'Feature',
      geometry:{type:'LineString',coordinates:d.coords},
      properties:{id:d.id, color:cfg.color, lineW:lw+2, caseColor:'#0f172a', caseW:lw+6, tip:d.tip}});
  });
  setSource('lot-drum-edit-src',{type:'FeatureCollection',features});
}

function _lotDrumEditorUpdatePanel(){
  const el = document.getElementById('lot-drum-list');
  if(!el) return;
  if(_LOT._drumCustom.length===0){
    el.innerHTML='<div style="color:#475569;font-size:10px;text-align:center;padding:8px">Nicio circulație desenată manual<br><span style="font-size:9px">Fără circulații custom = generare automată</span></div>';
    return;
  }
  el.innerHTML = _LOT._drumCustom.map(d=>{
    const cfg = _LOT.drumTipuri[d.tip]||_LOT.drumTipuri.secundar;
    return `<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)">
      <span style="width:10px;height:10px;border-radius:50%;background:${cfg.color};flex-shrink:0"></span>
      <span style="flex:1;color:#e2e8f0;font-size:10px">${cfg.label} (${d.coords.length} pct · ${d.latime}m)</span>
      <button onclick="_lotDrumEditorDelete('${d.id}')" style="background:rgba(239,68,68,.15);border:none;color:#f87171;border-radius:4px;padding:2px 7px;font-size:9px;cursor:pointer">🗑</button>
    </div>`;
  }).join('');
  // Refresh butoane tip (actualizare stare activ/inactiv)
  const lotContent = document.getElementById('lot-content');
  if(lotContent && _LOT._drumEditMode !== 'draw'){
    // Forțăm re-render al tabului Circulații dacă e activ
    const activeTab = document.querySelector('#lot-tabs button[style*="rgba(167,139,250"]');
    // Nu re-render complet, doar actualizăm lista de circulații
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GENERARE LOTURI — MODULARĂ, UMPLU COMPLET PARCELA
// ═══════════════════════════════════════════════════════════════════════════

function _genLotizareGeom(fpFeat, loturiPerTip, drumFract){
  const loturi=[], drumuri=[];
  const bbox2=turf.bbox(fpFeat);
  const cy=(bbox2[1]+bbox2[3])/2;
  const mLng=111320*Math.cos(cy*Math.PI/180), mLat=111320;
  const wDeg=bbox2[2]-bbox2[0], hDeg=bbox2[3]-bbox2[1];
  const fpArea=turf.area(fpFeat);
  const lotW=Math.sqrt(_LOT.lotAria)/mLng;
  const lotH=Math.sqrt(_LOT.lotAria)/mLat;
  const drumLatDeg=_LOT.drumLat/mLat;

  // ── 1. Construim poligoane drumuri ──────────────────────────────────────
  // A) Drumuri custom desenate manual
  _LOT._drumCustom.forEach(d=>{
    const coords = d.coords;
    if(coords.length < 2) return;
    const latDeg = d.latime / mLat;
    // Buffer liniar → poligon drum
    try{
      const line = {type:'Feature',geometry:{type:'LineString',coordinates:coords},properties:{}};
      const buf = turf.buffer(line, d.latime/2, {units:'meters'});
      if(!buf?.geometry) return;
      const inter = turf.intersect(fpFeat, buf);
      if(inter?.geometry) drumuri.push({...inter,properties:{tip:d.tip,id:d.id}});
    }catch(e){}
  });

  // B) Dacă nu există drumuri custom, generăm automat
  if(_LOT._drumCustom.length === 0){
    // Drum principal orizontal la 1/3
    const drumY = bbox2[1]+hDeg*0.33;
    const dp={type:'Feature',geometry:{type:'Polygon',coordinates:[[
      [bbox2[0],drumY],[bbox2[2],drumY],
      [bbox2[2],drumY+drumLatDeg],[bbox2[0],drumY+drumLatDeg],[bbox2[0],drumY]
    ]]},properties:{tip:'drum_principal'}};
    try{const di=turf.intersect(fpFeat,dp);if(di?.geometry)drumuri.push({...di,properties:{tip:'drum_principal'}});}catch(e){}

    // Drumuri secundare
    const cols=Math.max(1,Math.floor(wDeg/lotW));
    const rows=Math.max(1,Math.floor(hDeg/lotH));
    for(let r=3;r<rows;r+=3){
      const y0=bbox2[1]+r*lotH;
      if(y0<drumY+drumLatDeg&&y0+drumLatDeg*0.5>drumY) continue;
      const ds={type:'Feature',geometry:{type:'Polygon',coordinates:[[
        [bbox2[0],y0],[bbox2[2],y0],
        [bbox2[2],y0+drumLatDeg*0.5],[bbox2[0],y0+drumLatDeg*0.5],[bbox2[0],y0]
      ]]},properties:{tip:'drum_secundar'}};
      try{const di=turf.intersect(fpFeat,ds);if(di?.geometry)drumuri.push({...di,properties:{tip:'drum_secundar'}});}catch(e){}
    }
  }

  // ── 2. Calculăm zona rămasă pentru loturi (parcela minus drumuri) ──────
  let terenDisponibil = fpFeat;
  drumuri.forEach(d=>{
    try{
      const diff = turf.difference(terenDisponibil, d);
      if(diff?.geometry) terenDisponibil = diff;
    }catch(e){}
  });

  // ── 3. Grid adaptiv care UMPLE COMPLET terenul disponibil ──────────────
  const cols2=Math.max(1,Math.floor(wDeg/lotW));
  const rows2=Math.max(1,Math.floor(hDeg/lotH));

  const lista=[];
  ['individuala','insiruita','duplex','bloc'].forEach(tip=>{
    for(let i=0;i<(loturiPerTip[tip]||0);i++) lista.push(tip);
  });
  if(!lista.length) return {loturi,drumuri};

  let idx=0;

  for(let r=0;r<rows2&&idx<lista.length;r++){
    const y0=bbox2[1]+r*lotH;
    const y1=y0+lotH;

    for(let c=0;c<cols2&&idx<lista.length;c++){
      const x0=bbox2[0]+c*lotW;
      const x1=x0+lotW;
      const tip=lista[idx];
      const t=_lotGetTip(tip)||_LOT.tipuri.individuala;

      const lotPoly={type:'Feature',geometry:{type:'Polygon',coordinates:[[
        [x0,y0],[x1,y0],[x1,y1],[x0,y1],[x0,y0]
      ]]},properties:{tip,color:t.color,borderColor:t.borderColor}};

      try{
        // Intersectăm cu TERENUL DISPONIBIL (după scăderea drumurilor)
        const inter=turf.intersect(terenDisponibil, lotPoly);
        if(!inter?.geometry) continue;

        const interArea = turf.area(inter);
        const lotAriaMin = _LOT.lotAria * 0.15; // minim 15% pentru a fi valid

        if(interArea < lotAriaMin) continue; // lot prea mic — sărim

        // MODULABIL: dacă lotul e parțial (margine), îl extindem să umple golul
        const lotAreaTarget = _LOT.lotAria;

        if(interArea >= lotAreaTarget * 0.85){
          // Lot complet sau aproape complet → OK
          loturi.push({...inter, properties:{...lotPoly.properties, area:Math.round(interArea)}});
          idx++;
        } else if(interArea >= lotAriaMin){
          // Lot de margine parțial → îl comasăm cu vecinul sau îl lăsăm ca lot redus
          // Verificăm dacă e lotul de final al listei sau e izolat
          const isLastInRow = c === cols2-1 || x1 >= bbox2[2]-lotW*0.3;
          const isEdgeLot = c===0 || r===0 || r===rows2-1;

          if(isEdgeLot || isLastInRow){
            // Lot de margine → acceptăm chiar și parțial, îi ajustăm tipul dacă e prea mic
            const tipAdj = interArea < 200 ? 'insiruita' : tip;
            const tAdj = _LOT.tipuri[tipAdj]||t;
            loturi.push({...inter, properties:{
              ...lotPoly.properties,
              tip:tipAdj, color:tAdj.color, borderColor:tAdj.borderColor,
              area:Math.round(interArea), partial:true
            }});
            idx++;
          }
          // Altfel: lot interior prea mic → golul va fi consumat de lotul următor extins
        }
      }catch(e){}
    }
  }

  return {loturi, drumuri};
}

// ─── Export PDF ───────────────────────────────────────────────────────────
async function _lotExportPDF(){
  if(!_LOT._bilant){
    ss('⚠️ Generati mai intai planul (butonul violet Generează Plan Lotizare).');
    _lotTab('p'); // duca la parametri
    return;
  }
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('⚠️ Selectati o parcela de pe harta.');return;}
  ss('⏳ Se genereaza PDF Plan de Lotizare (poate dura 15-30 sec)...');
  try{

  // ── Initializare motor PDF comun ────────────────────────────────────────
  const d=_initStudyPdf('Plan de Lotizare si Parcelarea Terenului',
    'Regulament local · Bilanturi suprafete · Analiza financiara',8);
  const {pdf,W,H,DARK,DARK2,GOLD,GOLD2,BLUE,BLUE2,LIGHT,LIGHT2,RED,GREEN,ORANGE,GRAY,GRAY2,GRAY3,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
    hdr,ftr,sec,subsec,body,tblRow,addImg,kv,badge,divider,bullet,concluzii,sign,cover,newPage,checkY}=d;

  const b=_LOT._bilant;
  const caps=await _captureStudyMaps(ap,m=>ss(m));
  const lmix=_LOT.tipMix;
  const lAria=_LOT.lotAria;
  const lPx=MARKET_DATA?.landPrice?.[utr]||300;
  const pArea=parseFloat(area)||ap.area||0;
  const nrCirc=_LOT._drumCustom.length;
  const drumMod=_LOT.drumMod==='ambele'?'Latimea + Procentul (min)'
    :_LOT.drumMod==='latime'?'Latimea fixa':'Procentul din teren';

  // ─── PAG 1: COPERTA ──────────────────────────────────────────────────────
  cover(
    'Parcelarea si mobilarea terenului · Loturi rezidentiale · Circulatii interioare · Bilanturi · ROI',
    caps.imgCity||caps.img3D,
    [['Total loturi generate',b.totalLoturi+' buc'],
     ['Total unitati locative',b.totalUnitati+' unitati'],
     ['Suprafata medie lot',Math.round(b.lotMediu)+' mp'],
     ['Eficienta utilizare teren',((b.eficienta||0)*100).toFixed(0)+'%'],
     ['ROI estimat',b.roi+'%'],
     ['Circulatii interioare',_LOT.drumLat+'m latime · '+drumMod]],
    b.roi>0,
    'Studiu de fezabilitate urbanistica si financiara · Document orientativ'
  );

  // ─── PAG 2: CONTEXT + PLAN SITUATIE ─────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('CONTEXT AMPLASAMENT SI PLAN DE SITUATIE',2);ftr();
  let cy=30;
  const hw=(W-32)/2;
  cy=addImg(caps.img3D,14,cy,W-28,80,'FIG. 1 — Plan de situatie · Parcelarea propusa cu loturi si circulatii · '+uat);cy+=3;
  cy=addImg(caps.imgLocation,14,cy,hw,52,'FIG. 2 — Amplasament cadastral · Nr. '+nrcad);
  addImg(caps.imgCity,14+hw+4,cy-52,hw,52,'FIG. 3 — Incadrare in '+uat+' · UTR '+utr);
  cy+=4;

  cy=sec('1. DATE DE IDENTIFICARE A AMPLASAMENTULUI',cy);
  tblRow(['PARAMETRU','VALOARE CADASTRALA / URBANISTICA'],cy,true,[90,92]);cy+=8;
  [['Numar cadastral',nrcad],
   ['Localitate',uat+', jud. '+judet],
   ['Zona urbanistica (UTR)',utr+' — '+(REGULI[utr]?.d||'conform PUG '+uat)],
   ['Coordonate GPS',lat.toFixed(5)+'°N, '+lon.toFixed(5)+'°E'],
   ['Suprafata teren total',pArea.toFixed(0)+' mp ('+( pArea/10000).toFixed(4)+' ha)'],
   ['Suprafata lotizabila',Math.round(b.terenLoturi+b.terenDrum)+' mp'],
   ['Suprafata circulatii',Math.round(b.terenDrum)+' mp ('+((b.terenDrum/(b.terenLoturi+b.terenDrum+1))*100).toFixed(1)+'% din lotizabil)'],
   ['POT maxim admis (PUG)',( params.pot||'—')+'%'],
   ['CUT maxim admis (PUG)',(params.cut||'—')],
   ['H maxim admis (PUG)',(params.h||'—')+'m'],
   ['Spatii verzi minime',(params.sv||'—')+'%'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[90,92]);});

  // ─── PAG 3: BILANT SUPRAFETE + REGLEMENTARI ──────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('BILANT SUPRAFETE SI REGLEMENTARI URBANISTICE',3);ftr();
  cy=30;

  cy=addImg(caps.imgFront||caps.img3D,14,cy,W-28,65,'FIG. 4 — Vedere frontala · Lotizare propusa · Loturi si circulatii interioare');cy+=4;

  cy=sec('2. BILANT GENERAL DE SUPRAFETE',cy);
  cy=body('Bilantul suprafetelor a fost calculat prin intersectia geometriei parcelei cu grila de loturi si circulatiile interioare. Suprafetele de mai jos reprezinta valori nete dupa scaderea zonelor de circulatie si a eventualelor spatii reziduale la marginea parcelei.',14,cy);cy+=3;
  tblRow(['Categorie suprafata','Suprafata (mp)','Pondere (%)','Observatii'],cy,true,[65,28,22,67]);cy+=8;
  [['Teren total studiat',pArea.toFixed(0),'100%','Conform extras CF'],
   ['Suprafata loturi (total)',Math.round(b.terenLoturi),((b.eficienta||0)*100).toFixed(1)+'%','Edificabil net per lot'],
   ['Circulatii interioare (drum+alei)',Math.round(b.terenDrum),((b.terenDrum/(pArea+1))*100).toFixed(1)+'%','Profil '+_LOT.drumLat+'m · '+drumMod],
   ['Nr. loturi generate',b.totalLoturi+' buc','—','Media: '+Math.round(b.lotMediu)+' mp/lot'],
   ['Nr. unitati locative',b.totalUnitati+' buc','—','Conform mix functiuni'],
   ['Lot minim generat',_LOT.lotAria+' mp','—','Suprafata configurata'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[65,28,22,67]);});cy+=6;

  cy=sec('3. DISTRIBUTIE LOTURI PER TIP DE LOCUINTA',cy);
  cy=body('Mixul de functiuni a fost stabilit conform propunerii de mobilare, tinand cont de reglementarile UTR '+utr+' si de cererea de piata estimata pentru zona '+uat+'. Parametrii per tip pot fi ajustati individual din interfata sistemului.',14,cy);cy+=3;
  tblRow(['Tip locuinta','Nr.lot','Supraf.lot','SC max/lot','Reg.inaltime','H max','Unitati','Pondre'],cy,true,[38,16,26,26,28,20,22,16]);cy+=8;
  Object.entries(b.perTip).filter(([,v])=>v.count>0).forEach(([k,v])=>{
    const tipT2=_lotGetTip(k);
    const tipOv2=_LOT.tipOverride[k]||{};
    const tipNiv2=tipT2.niv||2;
    const tipHP2=tipOv2.hParter||tipT2.hParter||3.0;
    const tipHE2=tipOv2.hNiv||tipT2.hNiv||3.0;
    const tipHTot2=(parseFloat(tipHP2)+Math.max(0,tipNiv2-1)*parseFloat(tipHE2)+(tipOv2.hasRetras?2.5:0)).toFixed(1);
    const tipReg2=tipNiv2===1?'P':('P+'+(tipNiv2-1)+'E')+(tipOv2.hasRetras?'+R':'');
    cy=tblRow([
      S2(_LOT.tipuri[k]?.label||k),
      v.count+' buc',
      Math.round(v.suprafataTotala/Math.max(1,v.count))+' mp',
      Math.round(v.scMax/Math.max(1,v.count))+' mp',
      tipReg2,
      tipHTot2+'m',
      v.unitati+' buc',
      Math.round(lmix[k]||0)+'%'
    ],cy,false,[38,16,26,26,28,20,22,16]);
  });

  // ─── PAG 4: PARAMETRI CIRCULATII + CONFORMITATE PUG ─────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('CIRCULATII INTERIOARE SI CONFORMITATE PUG',4);ftr();
  cy=30;

  cy=addImg(caps.v3dDay||caps.img3D,14,cy,hw,60,'FIG. 5 — Vedere 3D · Volumetrie propusa · Loturi edificate');
  addImg(caps.v3dGolden||caps.imgBack,14+hw+4,cy-60,hw,60,'FIG. 6 — Vedere 3D golden hour · Integrare in context urban');
  cy+=4;

  cy=sec('4. PARAMETRI RETEA DE CIRCULATII INTERIOARE',cy);
  cy=body('Reteaua de circulatii a fost dimensionata conform normativelor tehnice: NP 051/2012 rev. privind parcajele, Normativul privind proiectarea drumurilor urbane si Regulamentul Local de Urbanism al '+uat+'. Latimile minime respecta cerintele pentru circulatia cu doua sensuri si accesul vehiculelor de urgenta.',14,cy);cy+=3;
  tblRow(['Parametru circulatii','Valoare proiectata','Norma de referinta','Conformitate'],cy,true,[60,35,65,22]);cy+=8;
  [['Latimea profilului',_LOT.drumLat+'m','NP 051/2012: min 3.5m (1 sens) / 6m (2 sensuri)',_LOT.drumLat>=6?'CONFORM':'VERIFICATI'],
   ['Mod calcul suprafata',drumMod,'Optionala (functie de configuratie)','—'],
   ['Procent drum din teren',Math.round(b.terenDrum/Math.max(1,pArea)*100)+'%','Recomandat max 25-30%',b.terenDrum/Math.max(1,pArea)<0.30?'CONFORM':'ATENTIE'],
   ['Nr. circulatii custom',( nrCirc>0?nrCirc:' Generare automata'),'—','—'],
   ['Acces vehicule urgenta',_LOT.drumLat>=3.5?'DA (latimea suficienta)':'VERIFICATI','Min 3.5m (OG 96/2003)',_LOT.drumLat>=3.5?'CONFORM':'NECONFORM'],
   ['Circulatii pietonale','Conform profil ales','SR 13330:2014','CONFORM'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[60,35,65,22]);});cy+=6;

  cy=sec('5. VERIFICARE CONFORMITATE CU PUG '+uat.toUpperCase(),cy);
  cy=body('Verificarile de mai jos sunt automate si orientative. Ele nu substituie avizul arhitectului sau al autoritatii competente (DAU / Primaria '+uat+'). Conformitatea finala se stabileste prin Certificat de Urbanism emis de autoritatea locala.',14,cy);cy+=3;
  tblRow(['Criteriu verificat','Valoare','Status','Obs.'],cy,true,[80,30,22,50]);cy+=8;
  b.verificari.forEach(v=>{
    const statusColor=v.ok?[0,150,0]:[200,100,0];
    cy=tblRow([S2(v.label),S2(v.value),v.ok?'CONFORM':(v.warn?'ATENTIE':'VERIF.'),S2(v.warn||'—')],cy,false,[80,30,22,50]);
  });

  // ─── PAG 5: ANALIZA FINANCIARA DETALIATA ────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('ANALIZA FINANCIARA PRELIMINARA',5);ftr();
  cy=30;

  cy=sec('6. CADRUL METODOLOGIC AL ANALIZEI FINANCIARE',cy);
  cy=body('Analiza financiara preliminara a fost elaborata pe baza datelor de piata disponibile pentru zona UTR '+utr+' din '+uat+' si a parametrilor tehnici ai proiectului de lotizare. Valorile prezentate sunt estimative si nu constituie un studiu de fezabilitate complet conform Legii 350/2001. Se recomanda confirmarea cu un evaluator autorizat ANEVAR si cu un expert tehnic atestat.',14,cy);cy+=4;

  cy=sec('7. REZUMAT FINANCIAR GENERAL',cy);
  tblRow(['Indicator financiar','Valoare estimata','Baza de calcul'],cy,true,[75,40,67]);cy+=8;
  [['Valoare teren la pret piata',Math.round(pArea*lPx/1000)+'k EUR',''+pArea.toFixed(0)+' mp × '+lPx+' EUR/mp (UTR '+utr+')'],
   ['Cost constructie total',Math.round(b.costConstrTotal/1000)+'k EUR','Include +18% proiectare, avize, autorizatii'],
   ['Investitie totala (teren+constr.)',Math.round((pArea*lPx+b.costConstrTotal)/1000)+'k EUR','Cost complet prefinantare'],
   ['Venituri totale estimate',Math.round(b.venituriTotal/1000)+'k EUR','Pret vanzare mediu zona × SD'],
   ['Profit brut estimat',Math.round(b.profitTotal/1000)+'k EUR','Venituri - Investitie totala'],
   ['ROI (Return on Investment)',b.roi+'%','Profit/Investitie totala × 100'],
   ['Profit mediu per lot',Math.round(b.profitTotal/Math.max(1,b.totalLoturi)/1000)+'k EUR','Profit/nr. loturi'],
   ['Profit mediu per unitate',Math.round(b.profitTotal/Math.max(1,b.totalUnitati)/1000)+'k EUR','Profit/nr. unitati locative'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[75,40,67]);});cy+=6;

  cy=sec('8. ANALIZA FINANCIARA PER TIP DE LOCUINTA',cy);
  cy=body('Valorile de constructie si vanzare sunt medii de piata pentru zona '+uat+'. Preturile de constructie includ materialele, manopera, instalatiile si un coeficient de contingente de 10%. Nu includ: taxe notariale, bransamente retele edilitare, amenajari exterioare, fond de risc.',14,cy);cy+=3;
  tblRow(['Tip','Loturi','Nr.ap','Investitie','Cost/ap','Venituri','Venit/ap','Profit','ROI'],cy,true,[28,15,14,28,26,26,26,22,15]);cy+=8;
  Object.entries(b.perTip).filter(([,v])=>v.count>0).forEach(([k,v])=>{
    const t=_lotGetTip(k);
    const costPerAp=Math.round(v.cost/Math.max(1,v.unitati)/1000);
    const venitPerAp=Math.round(v.venit/Math.max(1,v.unitati)/1000);
    cy=tblRow([
      S2(_LOT.tipuri[k]?.label||k).substring(0,14),
      v.count+'',v.unitati+'',
      Math.round(v.cost/1000)+'k',costPerAp+'k',
      Math.round(v.venit/1000)+'k',venitPerAp+'k',
      Math.round(v.profit/1000)+'k',
      v.roi+'%'
    ],cy,false,[28,15,14,28,26,26,26,22,15]);
  });

  // ─── PAG 6: PARAMETRI TEHNICI PER TIP ───────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('PARAMETRI TEHNICI SI INDICATORI PER TIP LOCUINTA',6);ftr();
  cy=30;

  cy=addImg(caps.v3dNight||caps.img3D,14,cy,W-28,65,'FIG. 7 — Vedere 3D noapte · Impact vizual nocturn · Ansamblu rezidential propus');cy+=4;

  cy=sec('9. FISE TEHNICE PER TIP DE LOCUINTA',cy);
  cy=body('Fiecare tip de locuinta din mixul functional propus are parametri tehnici si urbanistici individuali, configurabili din sistem. Valorile de mai jos reflecta configuratia adoptata pentru prezentul studiu, inclusiv eventualele suprascrieri fata de valorile implicite PUG.',14,cy);cy+=4;

  Object.entries(b.perTip).filter(([,v])=>v.count>0).forEach(([k,v])=>{
    const tipDef=_LOT.tipuri[k]||_LOT.tipuri.individuala;
    const tipOv=_LOT.tipOverride[k]||{};
    const tipT=_lotGetTip(k);
    const tipNiv=tipT.niv||2;
    const tipHP=parseFloat(tipOv.hParter||tipT.hParter||3.0);
    const tipHE=parseFloat(tipOv.hNiv||tipT.hNiv||3.0);
    const tipHTot=(tipHP+Math.max(0,tipNiv-1)*tipHE+(tipOv.hasRetras?2.5:0)).toFixed(1);
    const tipReg=tipNiv===1?'Parter':('P+'+(tipNiv-1)+'E')+(tipOv.hasRetras?'+Retras':'');
    const tipHasOv=Object.keys(tipOv).length>0;

    // Titlu tip
    pdf.setFillColor(...BLUE2);pdf.rect(14,cy-3,W-28,8,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,cy-3,3,8,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
    pdf.text(tipDef.icon+' '+S2(tipDef.label).toUpperCase()+' · '+v.count+' loturi · '+v.unitati+' unitati'+(tipHasOv?' (PARAMETRI PERSONALIZATI)':''),18,cy+1.5);
    cy+=11;

    tblRow(['Parametru','Valoare adoptata','Valoare implicita PUG','Observatii'],cy,true,[55,35,40,52]);cy+=8;
    [['Suprafata lot',Math.round(v.suprafataTotala/Math.max(1,v.count))+' mp',tipDef.lotDefault+' mp (recomandat)','Configurabil'],
     ['Regim inaltime',tipReg,'P+'+(tipDef.niv-1)+'E',tipHasOv&&tipOv.niv?'MODIFICAT':'Implicit'],
     ['H parter',tipHP.toFixed(1)+'m',( tipDef.hParter||3.0)+'m (implicit)',tipHasOv&&tipOv.hParter?'MODIFICAT':'Implicit'],
     ['H etaj curent',tipHE.toFixed(1)+'m',( tipDef.hNiv||3.0)+'m (implicit)',tipHasOv&&tipOv.hNiv?'MODIFICAT':'Implicit'],
     ['H total constructie',tipHTot+'m',(parseFloat(tipDef.hParter||3)+Math.max(0,(tipDef.niv-1))*parseFloat(tipDef.hNiv||3)).toFixed(1)+'m','Calculat'],
     ['POT lot (% ocupare)',tipT.sc+'%',tipDef.sc+'%',tipHasOv&&tipOv.sc?'MODIFICAT':'Conform tip'],
     ['SC maxima per lot',Math.round(v.scMax/Math.max(1,v.count))+' mp',Math.round(lAria*tipDef.sc/100)+' mp','Functie de POT'],
     ['Retragere fata strada',tipT.retF+'m',tipDef.retF+'m',tipHasOv&&tipOv.retF?'MODIFICAT':'Implicit'],
     ['Suprafata utila/apartament',tipT.suprafUtila+' mp',tipDef.suprafUtila+' mp',tipHasOv&&tipOv.suprafUtila?'MODIFICAT':'Implicit'],
     ['Pret constructie estimat',tipT.pretConstr+' EUR/mp',''+tipDef.pretConstr+' EUR/mp','Valoare medie zona '+uat],
     ['Pret vanzare estimat',tipT.pretVanzare+' EUR/mp',''+tipDef.pretVanzare+' EUR/mp','Valoare medie zona '+uat],
    ].forEach(r=>{cy=tblRow(r.map(c=>S2(c)),cy,false,[55,35,40,52]);});
    cy+=5;
    if(cy>H-40){pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PARAMETRI TEHNICI PER TIP (continuare)',6);ftr();cy=22;}
  });

  // ─── PAG 7: REGLEMENTARI URBANISTICE + AVIZE ────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('REGLEMENTARI URBANISTICE SI AVIZE NECESARE',7);ftr();
  cy=30;

  cy=sec('10. CADRUL LEGAL SI NORMATIV APLICABIL',cy);
  cy=bullet([
    'Legea nr. 50/1991 republicata — Autorizarea executarii lucrarilor de constructii. Lotizarea si parcelarea terenului necesita Autorizatie de Construire emisa de Primaria '+uat+'.',
    'Legea nr. 350/2001 republicata — Amenajarea teritoriului si urbanismul. PUG '+uat+' in vigoare — UTR '+utr+': POT max '+( params.pot||'—')+'%, CUT max '+(params.cut||'—')+', H max '+(params.h||'—')+'m.',
    'Legea nr. 7/1996 republicata — Cadastrul si publicitatea imobiliara. Dezmembramantul parcelei necesita documentatie tehnica cadastrala intocmita de topograf autorizat ANCPI.',
    'OUG nr. 57/2020 — Codul Administrativ. Compartimentul Urbanism al Primariei '+uat+' emite Certificatul de Urbanism si Autorizatia de Construire.',
    'HG nr. 525/1996 — Regulamentul General de Urbanism (RGU). Prevederile RGU se aplica complementar Regulamentului Local de Urbanism (RLU) al PUG '+uat+'.',
    'NP 051/2012 rev. — Normativ parcaje. Numarul minim de locuri de parcare per locuinta: 1-2 locuri/unitate (functie de UTR).',
    'Legea nr. 18/1991 republicata — Fondul funciar. Se verifica incadrarea terenului si eventualele sarcini/servituti.',
    'Legea nr. 24/2007 — Spatii verzi. Minim '+(params.sv||'20')+'% spatii verzi obligatorii pe fiecare lot.',
  ],14,cy);cy+=4;

  cy=sec('11. AVIZE SI ACORDURI NECESARE PENTRU AUTORIZARE',cy);
  tblRow(['Institutie','Tip aviz','Conditii'],cy,true,[60,50,72]);cy+=8;
  const djcpn=getDJCPN?getDJCPN():'DJCPN Judetean';
  [['Primaria '+uat,' Certificat de Urbanism','Obligatoriu inainte de orice documentatie tehnica'],
   [djcpn,'Aviz patrimoniu (daca e cazul)','Daca amplasamentul e in zona LMI sau zona de protectie'],
   ['APM '+judet,'Acord de mediu','Legea 292/2018 — proiecte cu impact potential'],
   ['Distributie energie electrica','Aviz retele electrice','Bransamente individuale per lot'],
   ['Operator apa-canal','Aviz retele apa/canalizare','Bransamente individuale per lot'],
   ['Operator gaze naturale','Aviz retele gaze','Daca zona are distributie gaze'],
   ['DAU '+uat,'Aviz urbanism PUZ/PUD','Obligatoriu daca proiectul derogheaza de la PUG'],
   ['ANCPI','Documentatie cadastrala','Dezlipire/comasare parcele — topograf autorizat'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[60,50,72]);});

  // ─── PAG 8: CONCLUZII + SEMNATURA ───────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('CONCLUZII SI RECOMANDARI FINALE',8);ftr();
  cy=30;

  cy=addImg(caps.imgCity||caps.img3D,14,cy,W-28,55,'FIG. 8 — Harta '+uat+' · Incadrare teritoriala a amplasamentului in context urban regional');cy+=4;

  cy=concluzii([
    'Suprafata totala studiata de '+pArea.toFixed(0)+' mp ('+( pArea/10000).toFixed(4)+' ha) permite o lotizare cu '+b.totalLoturi+' loturi, cu o eficienta de utilizare a terenului de '+((b.eficienta||0)*100).toFixed(0)+'%. Valoarea este '+(b.eficienta>0.6?'SATISFACATOARE (peste pragul recomandat de 60%)':b.eficienta>0.4?'ACCEPTABILA (intre 40-60% — tipica pentru parcele neregulate)':'SCAZUTA (sub 40% — parcela cu geometrie complexa, se recomanda reconfigurarea lotizarii')+'.',
    'Mixul functional propus cuprinde '+Object.entries(b.perTip).filter(([,v])=>v.count>0).map(([k,v])=>v.count+' loturi '+(_LOT.tipuri[k]?.label||k).toLowerCase()).join(', ')+'. Totalul de '+b.totalUnitati+' unitati locative va genera o densitate rezidentiala estimata compatibila cu reglementarile UTR '+utr+'.',
    'Reteaua de circulatii interioare cu profil de '+_LOT.drumLat+'m '+(+_LOT.drumLat>=6?'respecta cerintele pentru circulatia cu doua sensuri (min 6m) si asigura accesul vehiculelor de urgenta conform OG 96/2003':'asigura circulatia cu un sens — pentru circulatie cu doua sensuri se recomanda largirea la min 6m')+'. Suprafata afectata circulatiilor reprezinta '+Math.round(b.terenDrum/Math.max(1,pArea)*100)+'% din teren.',
    'Analiza financiara preliminara indica un ROI de '+b.roi+'% la valorile de piata curente pentru zona UTR '+utr+', '+uat+'. '+(b.roi>15?'Proiectul prezinta viabilitate financiara buna.':b.roi>5?'Proiectul este marginal financiar — se recomanda optimizarea mixului functional sau renegocierea pretului de achizitie a terenului.':'ROI-ul negativ indica fie pret de achizitie ridicat, fie parametri de densitate insuficienti. Se recomanda reconfigurarea proiectului.')+' Valorile nu includ taxele notariale, bransamentele si amenajarea infrastructurii (~5-8% suplimentar).',
    'Parcelarea propusa necesita intocmirea documentatiei tehnice cadastrale de catre un topograf autorizat ANCPI pentru dezlipirea in loturi individuale. Fiecare lot va primi numar cadastral distinct si va fi inscris in Cartea Funciara.',
    'Inainte de demararea proiectului se recomanda obtinerea Certificatului de Urbanism de la Primaria '+uat+' pentru verificarea compatibilitatii cu PUG in vigoare si identificarea eventualelor restrictii sau conditii suplimentare de avizare.',
    'Prezentul document are caracter ORIENTATIV si PRELIMINARY. Nu substituie documentatia tehnica de specialitate (Plan Urbanistic Zonal, Studiu de fezabilitate, proiect tehnic) intocmita de profesionisti atestati conform Legii 350/2001 si Legii 50/1991.',
    'UrbanX TSS·FG · '+dateStr+' · Sistem de analiza urbanistica asistata · Valori orientative pentru faza de prefezabilitate · Confirmare obligatorie cu arhitect si topograf autorizati.',
  ],cy);

  sign();
  pdf.save('Plan_Lotizare_'+S2(nrcad).replace(/[^a-zA-Z0-9]/g,'_')+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ PDF Plan de Lotizare generat! (8 pagini)');
  }catch(e){
    console.error('_lotExportPDF error:',e);
    ss('❌ Eroare la generare PDF: '+e.message+' — verificati consola (F12)');
  }
}


function _lotExportClipboard(){
  if(!_LOT._bilant){ss('Generați planul mai întâi.');return;}
  const ap=S.parcels[S.activeParcel??0];
  const b=_LOT._bilant;
  const lines=[
    'PLAN LOTIZARE URBANX',
    `Nr.cad: ${ap?.nrcad||'—'} | UTR: ${ap?.utr||'—'} | Teren: ${Math.round(ap?.area||0)}mp`,
    `Suprafata/lot: ${_LOT.lotAria}mp | Drum: ${_LOT.drumLat}m (${_LOT.drumMod})`,
    `Total loturi: ${b.totalLoturi} buc | Total unitati: ${b.totalUnitati}`,
    `Teren loturi: ${Math.round(b.terenLoturi)}mp | Teren drum: ${Math.round(b.terenDrum)}mp`,
    `Eficienta: ${((b.eficienta||0)*100).toFixed(0)}% | ROI: ${b.roi}%`,
    '---',
    ...Object.entries(b.perTip).filter(([,v])=>v.count>0).map(([k,v])=>
      `${_LOT.tipuri[k]?.label}: ${v.count} loturi / ${v.unitati} unitati / ROI ${v.roi}%`
    ),
    '---',
    `Investitie totala: ${Math.round(b.costConstrTotal/1000)}k€ | Venituri: ${Math.round(b.venituriTotal/1000)}k€ | Profit: ${Math.round(b.profitTotal/1000)}k€`,
    `Generat: ${new Date().toLocaleString('ro-RO')} | UrbanX TSS·FG`,
  ].join('\n');
  navigator.clipboard?.writeText(lines).then(()=>ss('📋 Bilanț copiat!')).catch(()=>alert(lines));
}

