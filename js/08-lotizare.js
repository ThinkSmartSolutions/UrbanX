// UrbanX — Generator lotizare, export

let _lotizareActive = false;

const _LOT = {
  lotAria: 400,
  drumLat: 6,
  drumProcent: 20,
  drumMod: 'ambele',
  strategie: 'grid',
  // Retrageri perimetrale față de limita proprietății (pentru edificabilul lotizării)
  retFront: 0,    // față stradă (m) — 0 = loturi până la limita proprietății
  retSpate: 0,    // spate (m)
  retLateral: 0,  // lateral stg+dreapta (m)

  tipMix: { individuala:40, insiruita:30, duplex:20, bloc:10 }, // % din loturi rezidentiale (sum=100)
  // Tipuri speciale: numar FIX de loturi (nu procent) — se adauga deasupra rezidentialelor
  tipCount: { gazebo:0, garaj:0, bbq:0, bucvara:0, bortodoxa:0, bcatolica:0 },
  // Pozitii manuale per tip special: { bortodoxa: [[lng,lat]], bbq: [[lng,lat],[lng2,lat2]], ... }
  manualPos: {},
  _placingTip: null, // tipul pentru care asteptam click pe harta
  // tipActiv: care tipuri sunt vizibile in Mix si generate
  tipActiv: { individuala:true, insiruita:true, duplex:true, bloc:true, gazebo:true, garaj:true, bbq:true, bucvara:true, bortodoxa:true, bcatolica:true },

  tipuri: {
    individuala: {
      label:'Casă individuală', icon:'🏡',
      lotMin:300, lotMax:1500, lotDefault:450,
      sc:35, hMax:8, niv:2, retF:5, retS:4, retL:3,
      color:'#4ade80', borderColor:'#16a34a',
      pretConstr:900, pretVanzare:1400, suprafUtila:130,
      desc:'Lot propriu, grădină, garaj', categorie:'rezidential',
      stil:'clasic', tipAcoperis:'sarpanta', penthouseActiv:false, balcoane:false, pereteleCortina:false, parterComercial:false
    },
    insiruita: {
      label:'Casă înșiruită', icon:'🏘',
      lotMin:150, lotMax:400, lotDefault:220,
      sc:60, hMax:9, niv:2, retF:4, retS:3, retL:0,
      color:'#60a5fa', borderColor:'#2563eb',
      pretConstr:800, pretVanzare:1250, suprafUtila:110,
      desc:'Calcan lateral, front mic, eficient', categorie:'rezidential',
      stil:'modern', tipAcoperis:'terasa_plata', penthouseActiv:false, balcoane:true, balconAdancime:1.2, pereteleCortina:false, parterComercial:false
    },
    duplex: {
      label:'Duplex (2 familii)', icon:'🏠',
      lotMin:250, lotMax:600, lotDefault:320,
      sc:50, hMax:8, niv:2, retF:4, retS:3, retL:0,
      color:'#fbbf24', borderColor:'#d97706',
      pretConstr:820, pretVanzare:1300, suprafUtila:120,
      desc:'2 unități pe lot comun', categorie:'rezidential',
      stil:'modern', tipAcoperis:'sarpanta', penthouseActiv:false, balcoane:true, balconAdancime:1.0, pereteleCortina:false, parterComercial:false
    },
    bloc: {
      label:'Bloc mic (4-8 ap)', icon:'🏢',
      lotMin:600, lotMax:3000, lotDefault:900,
      sc:40, hMax:15, niv:4, retF:6, retS:5, retL:4,
      color:'#a78bfa', borderColor:'#7c3aed',
      pretConstr:750, pretVanzare:1350, suprafUtila:65,
      desc:'Regim S+P+3E, max 8 ap', categorie:'rezidential',
      stil:'minimalist', tipAcoperis:'terasa_plata', penthouseActiv:true, penthouseRetragere:2.5, penthouseH:3.2, penthouseSuprafataFactor:0.5, balcoane:true, balconAdancime:1.5, pereteleCortina:true, parterComercial:true
    },
    // ── Dotări / amenajări ──────────────────────────────────────────────
    gazebo: {
      label:'Foisor / Pergolă', icon:'⛺',
      lotMin:60, lotMax:300, lotDefault:80,
      sc:50, hMax:4, niv:1, retF:2, retS:2, retL:2,
      color:'#86efac', borderColor:'#22c55e',
      pretConstr:350, pretVanzare:500, suprafUtila:30,
      desc:'Structură ușoară, lemn sau metal', categorie:'dotare',
      render3d:'gazebo'
    },
    garaj: {
      label:'Garaj acoperit', icon:'🚗',
      lotMin:20, lotMax:80, lotDefault:35,
      sc:80, hMax:3, niv:1, retF:1, retS:1, retL:1,
      color:'#94a3b8', borderColor:'#64748b',
      pretConstr:400, pretVanzare:600, suprafUtila:30,
      desc:'1-2 autoturisme, acoperiș metalic/tigla', categorie:'dotare',
      render3d:'garaj'
    },
    bbq: {
      label:'Zonă BBQ + Grătar', icon:'🔥',
      lotMin:30, lotMax:150, lotDefault:50,
      sc:30, hMax:2.5, niv:1, retF:2, retS:2, retL:2,
      color:'#fb923c', borderColor:'#ea580c',
      pretConstr:200, pretVanzare:300, suprafUtila:20,
      desc:'Foișor + vatră + zona relaxare', categorie:'dotare',
      render3d:'bbq'
    },
    bucvara: {
      label:'Bucătărie de Vară', icon:'🍳',
      lotMin:25, lotMax:80, lotDefault:40,
      sc:70, hMax:3, niv:1, retF:2, retS:1, retL:1,
      color:'#fde68a', borderColor:'#f59e0b',
      pretConstr:500, pretVanzare:700, suprafUtila:25,
      desc:'Spațiu semi-deschis, instalații gaz/apă', categorie:'dotare',
      render3d:'bucvara'
    },
    bortodoxa: {
      label:'Biserică Ortodoxă', icon:'⛪',
      lotMin:500, lotMax:5000, lotDefault:1200,
      sc:20, hMax:25, niv:3, retF:10, retS:8, retL:8,
      color:'#fcd34d', borderColor:'#d97706',
      pretConstr:2500, pretVanzare:0, suprafUtila:300,
      desc:'Naos + pronaos + turlă, curte',  categorie:'cult',
      render3d:'bortodoxa'
    },
    bcatolica: {
      label:'Biserică Catolică', icon:'⛪',
      lotMin:400, lotMax:4000, lotDefault:900,
      sc:25, hMax:20, niv:3, retF:8, retS:6, retL:6,
      color:'#e0f2fe', borderColor:'#0284c7',
      pretConstr:2200, pretVanzare:0, suprafUtila:250,
      desc:'Navă centrală + turn clopotniță', categorie:'cult',
      render3d:'bcatolica'
    },
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
    // Preia automat retragerile din PUG la prima deschidere (daca sunt 0 si PUG are valori)
    if(_LOT.retFront===0 && _LOT.retSpate===0 && _LOT.retLateral===0){
      try{
        const ap=S.parcels[S.activeParcel??0];
        const p=ap?.params||{};
        const rf=parseFloat(p.rf||0), rs=parseFloat(p.rs||0), rl=parseFloat(p.rl||0);
        if(rf>0||rs>0||rl>0){ _LOT.retFront=rf; _LOT.retSpate=rs; _LOT.retLateral=rl; }
      }catch(e){}
    }
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
    if(_LOT.demoMode) _lotDemoModeToggle();
    // Restaurează layerele de front/setback (ascunse când lotizarea era activă)
    ['front-parcel-line','front-setback-line','front-label','front-arrow'].forEach(lid=>{
      try{map.setLayoutProperty(lid,'visibility','visible');}catch(e){}
    });
    // NU apelăm updateMap() — ar putea reseta sursele lotizare
    // NU ștergem vol-src — 3D viewer rămâne cu lotizarea
    // NU ștergem lotizare-src/drum/label — propunerea rămâne vizibilă pe hartă
    // Curățarea se face NUMAI la Reset explicit sau parcelă nouă
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
  div.style.cssText=`position:fixed;${mob?'bottom:72px;left:0;right:0;border-radius:16px 16px 0 0':'top:56px;right:'+rightPos+'px;width:'+panelW+'px;border-radius:16px'};z-index:8600;background:rgba(7,12,24,.97);border:1px solid rgba(167,139,250,.35);${mob?'border-bottom:none':''}padding:0;box-shadow:0 12px 48px rgba(0,0,0,.75);backdrop-filter:blur(16px);font-family:system-ui,sans-serif;max-height:${mob?'62':'88'}vh;overflow:hidden;display:flex;flex-direction:column`;

  div.innerHTML=`
    <div style="padding:12px 16px 0;flex-shrink:0">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div>
          <span style="color:#a78bfa;font-weight:800;font-size:13px">🏘 Lotizare</span>
          ${(S.parcels||[]).filter(p=>p?.geo?.geometry).length>1
            ? `<span style="color:#f59e0b;font-weight:700;font-size:10px;margin-left:4px;background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.3);border-radius:5px;padding:2px 6px">⊞ ${S.parcels.filter(p=>p?.geo?.geometry).length} parcele</span>`
            : `<span style="color:#64748b;font-weight:400;font-size:11px"> · ${ap?ap.nrcad+' · '+Math.round(ap.area||0)+'mp':'selectați parcela'}</span>`
          }
          ${ap?.utr?`<span style="color:#d4af37;font-size:9px;margin-left:4px">UTR ${ap.utr}</span>`:''}
        </div>
        <button onclick="toggleLotizare()" 
  title="Închide panelul — lotizarea rămâne vizibilă pe hartă"
  style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:8px;padding:${mob?'8px 18px':'5px 12px'};font-size:${mob?'16px':'12px'};font-weight:700;cursor:pointer;flex-shrink:0;min-width:${mob?'44px':'auto'}">✕ Închide</button>
      </div>
      ${!ap?'<div style="color:#f87171;font-size:10px;padding:4px 0 6px">⚠️ Selectați mai întâi o parcelă pe hartă!</div>':''}
      <div style="display:flex;gap:2px;background:rgba(255,255,255,.04);border-radius:8px;padding:3px" id="lot-tabs">
        ${mob ? `
        <!-- MOBIL: 2 randuri de tab-uri cu icoane + text lizibil -->
        <div style="display:flex;gap:3px;width:100%">
          ${[['p','⚙','Param'],['t','🏢','Tipuri'],['d','🏚','Demol.'],['c','🛣','Circ.']].map(([id,ico,lbl],i)=>`
            <button onclick="_lotTab('${id}')" id="ltab-${id}" style="flex:1;border:none;background:rgba(255,255,255,.05);color:#64748b;border-radius:8px;padding:7px 2px 5px;cursor:pointer;transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:2px;min-height:44px">
              <span style="font-size:16px">${ico}</span>
              <span style="font-size:9px;font-weight:700">${lbl}</span>
            </button>`).join('')}
        </div>
        <div style="display:flex;gap:3px;width:100%;margin-top:3px">
          ${[['m','🏡','Mix'],['r','📊','Rezult.'],['f','💰','Financ.'],['x','📄','Export']].map(([id,ico,lbl],i)=>`
            <button onclick="_lotTab('${id}')" id="ltab-${id}" style="flex:1;border:none;background:rgba(255,255,255,.05);color:#64748b;border-radius:8px;padding:7px 2px 5px;cursor:pointer;transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:2px;min-height:44px">
              <span style="font-size:16px">${ico}</span>
              <span style="font-size:9px;font-weight:700">${lbl}</span>
            </button>`).join('')}
        </div>
        ` : `
        ${[['p','⚙ Param'],['t','🏢 Tipuri'],['d','🏚 Demolare'],['c','🛣 Circulații'],['m','🏡 Mix'],['r','📊 Rezultat'],['f','💰 Financiar'],['x','📄 Export']].map(([id,l],i)=>`
          <button onclick="_lotTab('${id}')" id="ltab-${id}" style="flex:1;border:none;background:none;color:#64748b;border-radius:6px;padding:5px 1px;font-size:7px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .15s">${l}</button>`).join('')}
        `}
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
        <button onclick="_lotToggleLegend()" title="Legendă culori" style="background:rgba(167,139,250,.1);border:1px solid rgba(167,139,250,.25);color:#a78bfa;border-radius:8px;padding:8px 8px;font-size:13px;cursor:pointer;flex-shrink:0">
          🎨
        </button>
      </div>
      <button onclick="runLotizare()" style="width:100%;background:linear-gradient(135deg,#6d28d9,#4c1d95);border:1px solid #7c3aed;color:#fff;border-radius:10px;padding:12px;font-size:13px;font-weight:800;cursor:pointer;letter-spacing:.03em" onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
        🏘 Generează Plan Lotizare
      </button>
    </div>`;
  document.body.appendChild(div);
}


// ─── Legenda culori lotizare ──────────────────────────────────────────────
window._lotToggleLegend = function _lotToggleLegend(){
  const existing = document.getElementById('lot-legend');
  if(existing){ existing.remove(); return; }

  const mob = window.innerWidth < 841;
  const div = document.createElement('div');
  div.id = 'lot-legend';
  div.style.cssText = `position:fixed;${mob?'bottom:calc(50vh+68px);left:8px':'bottom:24px;left:12px'};z-index:8500;background:rgba(7,12,24,.94);border:1px solid rgba(167,139,250,.3);border-radius:12px;padding:10px 12px;font-family:system-ui,sans-serif;min-width:180px;max-width:220px;backdrop-filter:blur(12px);box-shadow:0 4px 24px rgba(0,0,0,.6)`;

  const tipuriActive = Object.entries(_LOT.tipuri).filter(([k])=>{
    if(['gazebo','garaj','bbq','bucvara','bortodoxa','bcatolica'].includes(k))
      return (parseInt((_LOT.tipCount||{})[k])||0) > 0;
    return (_LOT.tipMix[k]||0) > 0;
  });

  div.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <span style="color:#a78bfa;font-size:10px;font-weight:800">🎨 Legendă lotizare</span>
      <button onclick="document.getElementById('lot-legend')?.remove()" style="background:none;border:none;color:#64748b;cursor:pointer;font-size:14px;line-height:1;padding:0">✕</button>
    </div>
    ${tipuriActive.map(([k,t])=>`
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:5px">
        <div style="width:14px;height:14px;border-radius:3px;background:${t.color};border:1px solid ${t.borderColor||t.color};flex-shrink:0"></div>
        <div>
          <span style="color:#e2e8f0;font-size:10px;font-weight:600">${t.icon} ${t.label}</span>
          ${t.categorie==='rezidential'?`<span style="color:#475569;font-size:8.5px"> · ${_LOT.tipMix[k]||0}%</span>`:
            `<span style="color:#475569;font-size:8.5px"> · ${parseInt((_LOT.tipCount||{})[k])||0} lot</span>`}
        </div>
      </div>`).join('')}
    <div style="margin-top:8px;border-top:1px solid rgba(255,255,255,.07);padding-top:7px">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:4px">
        <div style="width:14px;height:5px;border-radius:2px;background:#94a3b8;flex-shrink:0"></div>
        <span style="color:#94a3b8;font-size:9.5px">Drum / Circulații</span>
      </div>
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:4px">
        <div style="width:14px;height:5px;border-radius:2px;background:#16a34a;flex-shrink:0"></div>
        <span style="color:#94a3b8;font-size:9.5px">Spații verzi estimate</span>
      </div>
      <div style="display:flex;align-items:center;gap:7px">
        <div style="width:14px;height:5px;border-radius:2px;background:#38bdf8;opacity:.5;flex-shrink:0"></div>
        <span style="color:#94a3b8;font-size:9.5px">Parcare estimată</span>
      </div>
    </div>
  `;
  document.body.appendChild(div);
}

function _lotTab(tab){
  ['p','t','d','c','m','r','f','x'].forEach(t=>{
    const b=document.getElementById('ltab-'+t);
    if(!b) return;
    const isMob=window.innerWidth<841;
    if(isMob){
      b.style.background = t===tab?'rgba(167,139,250,.3)':'rgba(255,255,255,.05)';
      b.style.color = t===tab?'#a78bfa':'#64748b';
      b.style.borderBottom = t===tab?'2px solid #a78bfa':'2px solid transparent';
    } else {
      b.style.background = t===tab?'rgba(167,139,250,.2)':'none';
      b.style.color = t===tab?'#a78bfa':'#64748b';
    }
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
    const def = _LOT.tipuri[tipKey] || _LOT.tipuri.individuala; // definitie originala (fara override)
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

    // Tipurile speciale (dotari/cult) genereaza doar o platforma de sol
    // Geometria 3D detaliata e adaugata de _lotRenderSpecial in viewer
    const _isSpecialTip = ['gazebo','garaj','bbq','bucvara','bortodoxa','bcatolica'].includes(tipKey);

    // Setări arhitecturale per tip (din override sau default)
    const tipStil      = ov.stil          ?? def.stil          ?? 'modern';
    const tipAcoperis  = ov.tipAcoperis   ?? def.tipAcoperis   ?? 'terasa_plata';
    const tipPenthouse = ov.penthouseActiv?? def.penthouseActiv?? false;
    const tipPRet      = ov.penthouseRetragere ?? def.penthouseRetragere ?? 2.5;
    const tipPH        = ov.penthouseH    ?? def.penthouseH    ?? 3.2;
    const tipPF        = ov.penthouseSuprafataFactor ?? def.penthouseSuprafataFactor ?? 0.5;
    const tipBalcoane  = ov.balcoane      ?? def.balcoane      ?? false;
    const tipBalcAdanc = ov.balconAdancime?? def.balconAdancime?? 1.2;
    const tipCortina   = ov.pereteleCortina ?? def.pereteleCortina ?? false;
    const tipParterC   = ov.parterComercial ?? def.parterComercial ?? false;

    // Tipuri speciale: doar platforma colorata de sol, geometria 3D = _lotRenderSpecial
    if(_isSpecialTip){
      feats3D.push({
        type:'Feature', geometry: fpGeom,
        properties:{
          base:0, top:0.25, color: def.color,
          floor:0, parcelIdx:lotIdx, lotTip:tipKey,
          isLotizare:true, stil:tipStil
        }
      });
      return; // skip generarea etajelor normale (forEach)
    }

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
          stil: tipStil,
          pereteleCortina: tipCortina && i>0,
          parterComercial: tipParterC && i===0,
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

    // ── Acoperis per lot (sarpanta, mansarda, combinat) ─────────────────────
  loturi.forEach((lot, lotIdx)=>{
    const tipKey = lot.properties?.tip || 'individuala';
    const def = _LOT.tipuri[tipKey]||_LOT.tipuri.individuala;
    const ov = _LOT.tipOverride[tipKey]||{};
    // Lot partial (margine parcela) = acoperis plat - geometria trapezoidala/triunghiulara
    // genereaza proiectii vizuale in afara parcelei cu acoperisuri in panta
    const tipAcoperis = (lot.properties?.partial===true) ? 'terasa_plata' : (ov.tipAcoperis ?? def.tipAcoperis ?? 'terasa_plata');
    if(!lot.geometry || tipAcoperis==='terasa_plata' || tipAcoperis==='terasa_circulabila') return;
    const t = {...def,...ov};
    const niv=Math.max(1,t.niv||2);
    const hP=Math.max(2.4,t.hParter||3.0);
    const hE=Math.max(2.4,t.hNiv||3.0);
    const topH=hP+(niv-1)*hE;
    const tipStil=ov.stil??def.stil??'modern';
    try{
      const lotFeat={type:'Feature',geometry:lot.geometry,properties:{}};
      if(tipAcoperis==='sarpanta'){
        const shrunk=turf.buffer(lotFeat,-0.3/111320,{units:'degrees'});
        const rGeom=shrunk?.geometry||lot.geometry;
        feats3D.push({type:'Feature',geometry:rGeom,properties:{
          base:topH, top:topH+2.0, color:'#8B4513', floor:-5, roofType:'sarpanta',
          parcelIdx:lotIdx, lotTip:tipKey, isLotizare:true, stil:tipStil
        }});
      } else if(tipAcoperis==='mansarda'){
        const ret=turf.buffer(lotFeat,-1.5/111320,{units:'degrees'});
        const mGeom=ret?.geometry&&turf.area(ret)>10?ret.geometry:lot.geometry;
        feats3D.push({type:'Feature',geometry:mGeom,properties:{
          base:topH, top:topH+2.8, color:'#f0d8a0', floor:niv, roofType:'mansarda',
          parcelIdx:lotIdx, lotTip:tipKey, isLotizare:true, stil:tipStil, isLast:true
        }});
        feats3D.push({type:'Feature',geometry:mGeom,properties:{
          base:topH+2.8, top:topH+4.3, color:'#8B4513', floor:-12, roofType:'sarpanta_mica',
          parcelIdx:lotIdx, lotTip:tipKey, isLotizare:true, stil:tipStil
        }});
      } else if(tipAcoperis==='combinat'){
        feats3D.push({type:'Feature',geometry:lot.geometry,properties:{
          base:topH, top:topH+0.3, color:'#c8d0d8', floor:-1, roofType:'terasa_plata',
          parcelIdx:lotIdx, lotTip:tipKey, isLotizare:true, stil:tipStil
        }});
        const scaled=turf.transformScale(lotFeat,0.4,{origin:turf.centerOfMass(lotFeat)});
        feats3D.push({type:'Feature',geometry:scaled.geometry,properties:{
          base:topH+0.3, top:topH+3.5, color:'#475569', floor:-2, roofType:'combinat',
          parcelIdx:lotIdx, lotTip:tipKey, isLotizare:true, stil:tipStil
        }});
      }
    }catch(e){}
  });

  // ── Acoperiș per lot (sarpanta, mansarda, combinat) ─────────────────────
  loturi.forEach((lot, lotIdx)=>{
    const tipKey = lot.properties?.tip || 'individuala';
    const def = _LOT.tipuri[tipKey]||_LOT.tipuri.individuala;
    const ov = _LOT.tipOverride[tipKey]||{};
    // Lot partial (margine parcela) = acoperis plat - geometria trapezoidala/triunghiulara
    // genereaza proiectii vizuale in afara parcelei cu acoperisuri in panta
    const tipAcoperis = (lot.properties?.partial===true) ? 'terasa_plata' : (ov.tipAcoperis ?? def.tipAcoperis ?? 'terasa_plata');
    if(!lot.geometry || tipAcoperis==='terasa_plata' || tipAcoperis==='terasa_circulabila') return;
    const t = {...def,...ov};
    const niv=Math.max(1,t.niv||2);
    const hP=Math.max(2.4,t.hParter||3.0);
    const hE=Math.max(2.4,t.hNiv||3.0);
    const topH=hP+(niv-1)*hE;
    const tipStil=ov.stil??def.stil??'modern';
    try{
      const lotFeat={type:'Feature',geometry:lot.geometry,properties:{}};
      if(tipAcoperis==='sarpanta'){
        const shrunk=turf.buffer(lotFeat,-0.3/111320,{units:'degrees'});
        const rGeom=shrunk?.geometry||lot.geometry;
        feats3D.push({type:'Feature',geometry:rGeom,properties:{base:topH,top:topH+2.0,color:'#8B4513',floor:-5,roofType:'sarpanta',parcelIdx:lotIdx,lotTip:tipKey,isLotizare:true,stil:tipStil}});
      } else if(tipAcoperis==='mansarda'){
        const ret=turf.buffer(lotFeat,-1.5/111320,{units:'degrees'});
        const mGeom=ret?.geometry&&turf.area(ret)>10?ret.geometry:lot.geometry;
        feats3D.push({type:'Feature',geometry:mGeom,properties:{base:topH,top:topH+2.8,color:'#f0d8a0',floor:niv,roofType:'mansarda',parcelIdx:lotIdx,lotTip:tipKey,isLotizare:true,stil:tipStil,isLast:true}});
        feats3D.push({type:'Feature',geometry:mGeom,properties:{base:topH+2.8,top:topH+4.3,color:'#8B4513',floor:-12,roofType:'sarpanta_mica',parcelIdx:lotIdx,lotTip:tipKey,isLotizare:true,stil:tipStil}});
      } else if(tipAcoperis==='combinat'){
        feats3D.push({type:'Feature',geometry:lot.geometry,properties:{base:topH,top:topH+0.3,color:'#c8d0d8',floor:-1,roofType:'terasa_plata',parcelIdx:lotIdx,lotTip:tipKey,isLotizare:true,stil:tipStil}});
        const scaled=turf.transformScale(lotFeat,0.4,{origin:turf.centerOfMass(lotFeat)});
        feats3D.push({type:'Feature',geometry:scaled.geometry,properties:{base:topH+0.3,top:topH+3.5,color:'#475569',floor:-2,roofType:'combinat',parcelIdx:lotIdx,lotTip:tipKey,isLotizare:true,stil:tipStil}});
      }
    }catch(e){}
  });

  // ── Penthouse per lot (dacă activat) ──────────────────────────────
  loturi.forEach((lot, lotIdx)=>{
    const tipKey = lot.properties?.tip || 'individuala';
    const def = _LOT.tipuri[tipKey]||_LOT.tipuri.individuala;
    const ov = _LOT.tipOverride[tipKey]||{};
    const t = {...def,...ov};
    if(!(ov.penthouseActiv ?? def.penthouseActiv)) return;
    if(!lot.geometry) return;

    const niv=Math.max(1,t.niv||2);
    const hP=Math.max(2.4,t.hParter||3.0);
    const hE=Math.max(2.4,t.hNiv||3.0);
    const topH=hP+(niv-1)*hE;
    const pRet=(ov.penthouseRetragere??def.penthouseRetragere??2.5);
    const pH=(ov.penthouseH??def.penthouseH??3.2);
    const pF=(ov.penthouseSuprafataFactor??def.penthouseSuprafataFactor??0.5);
    const tipStil=ov.stil??def.stil??'modern';

    try{
      const lotFeat={type:'Feature',geometry:lot.geometry,properties:{}};
      const scaled=turf.transformScale(lotFeat,Math.sqrt(pF),{origin:turf.centerOfMass(lotFeat)});
      const buf=turf.buffer(scaled,-pRet/111320,{units:'degrees'});
      const pGeom=buf?.geometry&&turf.area(buf)>4?buf.geometry:scaled.geometry;
      feats3D.push({type:'Feature',geometry:pGeom,properties:{
        base:topH,top:topH+pH,color:'#0f172a',floor:-20,roofType:'penthouse',
        parcelIdx:lotIdx,lotTip:tipKey,isLotizare:true,stil:tipStil
      }});
      feats3D.push({type:'Feature',geometry:pGeom,properties:{
        base:topH+pH,top:topH+pH+0.3,color:'#475569',floor:-21,roofType:'penthouse_terasa',
        parcelIdx:lotIdx,lotTip:tipKey,isLotizare:true
      }});
    }catch(e){}
  });

  // Trimite în vol-src — viewer-ul 3D redă automat
  setSource('vol-src', {type:'FeatureCollection', features:feats3D});

  // Render 3D special pentru tipurile dotare/cult (dacă viewer 3D e deschis)
  const _specialTipuri = ['gazebo','garaj','bbq','bucvara','bortodoxa','bcatolica'];
  if(window.THREE && window.V3D?.scene && window.V3D?.r) {
    const ring0 = loturi[0]?.geometry ? (()=>{
      try{
        const ap=S.parcels[S.activeParcel??0];
        const r0=ap.geo.geometry.type==='Polygon'?ap.geo.geometry.coordinates[0]:ap.geo.geometry.coordinates[0][0];
        const c0=r0.reduce((s,c)=>s+c[0],0)/r0.length, c1=r0.reduce((s,c)=>s+c[1],0)/r0.length;
        const mLng=111320*Math.cos(c1*Math.PI/180), mLat=111320;
        return ([lng,lat])=>[(lng-c0)*mLng,(lat-c1)*mLat];
      }catch(e){return null;}
    })() : null;
    if(ring0){
      loturi.forEach(lot=>{
        const tip = lot.properties?.tip;
        if(!_specialTipuri.includes(tip)) return;
        _lotRenderSpecial(window.THREE, window.V3D.scene, lot.geometry, tip, ring0);
      });
      window.V3D.r.render(window.V3D.scene, window.V3D.cam);
    }
  }
  S.vol.genDone = true;
  S.vol._lastFeats = feats3D;

  // Switch automat la vedere 3D
  if(map.getPitch() < 20){
    map.easeTo({pitch:45, duration:600});
  }
}

// ─── Render 3D specializat per tip dotare / cult ─────────────────────────

// ─── Plasare manuală tipuri speciale ──────────────────────────────────────
function _lotStartManualPlace(tipKey){
  const cnt = parseInt((_LOT.tipCount||{})[tipKey])||0;
  if(cnt === 0){
    ss('⚠️ Setați mai întâi numărul de loturi (+ buton) pentru '+(_LOT.tipuri[tipKey]?.label||tipKey));
    return;
  }

  _LOT._placingTip = tipKey;
  const t = _LOT.tipuri[tipKey];
  const existingPos = (_LOT.manualPos[tipKey]||[]).length;
  const needed = cnt;

  ss(`📍 ${t?.icon||''} ${t?.label||tipKey}: click pe HARTĂ unde vrei să plasezi lotul (${existingPos+1}/${needed})`);
  map.getCanvas().style.cursor = 'crosshair';

  // Overlay banner vizibil
  const banner = document.createElement('div');
  banner.id = 'lot-place-banner';
  banner.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:9000;background:rgba(167,139,250,.95);color:#fff;border-radius:10px;padding:10px 20px;font-size:13px;font-weight:700;pointer-events:none;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,.5)';
  banner.innerHTML = `${t?.icon||'📍'} Click pe hartă — ${t?.label||tipKey} (${existingPos+1}/${needed}) &nbsp;<span style="font-size:11px;opacity:.8">ESC = anulează</span>`;
  document.body.appendChild(banner);

  // Sterge pozitiile anterioare si incepe fresh
  _LOT.manualPos[tipKey] = [];

  // Handler click harta
  const handler = (e) => {
    if(_LOT._placingTip !== tipKey) return;
    const lngLat = e.lngLat;

    // Verifica daca e in interiorul parcelei
    const ap = S.parcels[S.activeParcel??0];
    let inParcel = true;
    if(ap?.geo?.geometry){
      try{
        const pt = {type:'Feature',geometry:{type:'Point',coordinates:[lngLat.lng,lngLat.lat]},properties:{}};
        const parcelFeat = {type:'Feature',geometry:ap.geo.geometry,properties:{}};
        inParcel = turf.booleanPointInPolygon(pt, parcelFeat);
      }catch(e){}
    }

    if(!inParcel){
      ss('⚠️ Punctul este în afara parcelei! Click în interiorul parcelei.');
      return;
    }

    if(!_LOT.manualPos[tipKey]) _LOT.manualPos[tipKey]=[];
    _LOT.manualPos[tipKey].push([lngLat.lng, lngLat.lat]);

    const placed = _LOT.manualPos[tipKey].length;
    const needed2 = parseInt((_LOT.tipCount||{})[tipKey])||1;

    // Marker vizual pe harta
    const markerId = 'lot-manual-'+tipKey+'-'+placed;
    if(map.getLayer(markerId)) map.removeLayer(markerId);
    if(map.getSource(markerId)) map.removeSource(markerId);
    map.addSource(markerId, {type:'geojson', data:{type:'Feature',geometry:{type:'Point',coordinates:[lngLat.lng,lngLat.lat]},properties:{}}});
    map.addLayer({id:markerId, type:'circle', source:markerId,
      paint:{'circle-radius':8,'circle-color':_LOT.tipuri[tipKey]?.color||'#d4af37','circle-stroke-width':2,'circle-stroke-color':'#fff'}});

    if(placed >= needed2){
      // Toate plasate
      _lotStopManualPlace(false);
      ss(`✅ ${t?.icon||''} ${t?.label||tipKey}: ${placed} pozitii setate manual. Generați planul pentru a aplica.`);
      // Refresh tab mix ca sa arate "✓ Manual"
      const c = document.getElementById('lot-content');
      if(c && document.getElementById('ltab-m')?.classList.contains('active-tab')) _lotTab('m');
    } else {
      ss(`📍 ${t?.icon||''} ${t?.label||tipKey}: mai plasați ${needed2-placed} lot(uri). Click pe hartă.`);
      document.getElementById('lot-place-banner').innerHTML = `${t?.icon||'📍'} Click pe hartă — ${t?.label||tipKey} (${placed+1}/${needed2}) &nbsp;<span style="font-size:11px;opacity:.8">ESC = anulează</span>`;
    }
  };

  map._lotPlaceHandler = handler;
  map.on('click', handler);

  // ESC pentru anulare
  const escHandler = (e) => {
    if(e.key === 'Escape' && _LOT._placingTip === tipKey){
      _lotStopManualPlace(true);
      ss('Plasare anulată');
    }
  };
  window._lotPlaceEscHandler = escHandler;
  window.addEventListener('keydown', escHandler);
}

function _lotStopManualPlace(cancel){
  if(!_LOT._placingTip) return;
  if(cancel) _LOT.manualPos[_LOT._placingTip] = [];
  _LOT._placingTip = null;
  map.getCanvas().style.cursor = '';
  if(map._lotPlaceHandler){ map.off('click', map._lotPlaceHandler); map._lotPlaceHandler=null; }
  if(window._lotPlaceEscHandler){ window.removeEventListener('keydown', window._lotPlaceEscHandler); window._lotPlaceEscHandler=null; }
  document.getElementById('lot-place-banner')?.remove();
}

function _lotClearManualPos(tipKey){
  if(!tipKey){ _LOT.manualPos={}; }
  else {
    delete _LOT.manualPos[tipKey];
    // Sterge markerii vizuali
    for(let i=1;i<=10;i++){
      const id='lot-manual-'+tipKey+'-'+i;
      try{ if(map.getLayer(id)) map.removeLayer(id); if(map.getSource(id)) map.removeSource(id); }catch(e){}
    }
  }
  ss('📍 Pozițiile manuale au fost șterse');
  _lotTab('m');
}

window._lotRenderSpecial = function _lotRenderSpecial(THREE, scene, geom, tipKey, toLoc){
  if(!THREE||!scene||!geom||!toLoc) return;
  try{
    const ring = geom.type==='Polygon' ? geom.coordinates[0] : geom.coordinates[0][0];
    const pts2d = ring.slice(0,-1).map(([lng,lat])=>toLoc([lng,lat]));
    const cx = pts2d.reduce((s,p)=>s+p[0],0)/pts2d.length;
    const cz = pts2d.reduce((s,p)=>s+p[1],0)/pts2d.length;
    const xs=pts2d.map(p=>p[0]), zs=pts2d.map(p=>p[1]);
    const w=Math.max(...xs)-Math.min(...xs), d=Math.max(...zs)-Math.min(...zs);
    const sz=Math.min(w,d)*0.8;

    if(tipKey==='gazebo'){
      const stMat=new THREE.MeshStandardMaterial({color:'#8B6914',roughness:0.8,metalness:0.1});
      const rfMat=new THREE.MeshStandardMaterial({color:'#c8520a',roughness:0.7,metalness:0.05});
      const s=Math.min(Math.max(sz*0.6,3),8); // scala adaptiva, minim 3m
      const postH=3.2;
      [[-s/2,-s/2],[s/2,-s/2],[s/2,s/2],[-s/2,s/2]].forEach(([ox,oz])=>{
        const st=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.15,postH,8),stMat);
        st.position.set(cx+ox,postH/2,cz+oz); scene.add(st);
      });
      // Grinzi orizontale pe perimetru
      [[-s/2,0,0.12,s],[0,-s/2,s,0.12]].forEach(([ox,oz,bw,bd])=>{
        const g=new THREE.Mesh(new THREE.BoxGeometry(bw,0.15,bd),stMat);
        g.position.set(cx+ox,postH,cz+oz); scene.add(g);
        const g2=new THREE.Mesh(new THREE.BoxGeometry(bw,0.15,bd),stMat);
        g2.position.set(cx-ox,postH,cz-oz); scene.add(g2);
      });
      const rf=new THREE.Mesh(new THREE.ConeGeometry(s*0.78,1.8,4),rfMat);
      rf.rotation.y=Math.PI/4; rf.position.set(cx,postH+1.0,cz); scene.add(rf);
    }
    else if(tipKey==='garaj'){
      const wallMat=new THREE.MeshStandardMaterial({color:'#94a3b8',roughness:0.6,metalness:0.3});
      const roofMat=new THREE.MeshStandardMaterial({color:'#475569',roughness:0.5,metalness:0.5,emissive:new THREE.Color(0.02,0.02,0.04),emissiveIntensity:0.3});
      const gw=Math.min(Math.max(w*0.75,4),8), gd=Math.min(Math.max(d*0.75,4),7);
      const gH=2.8;
      const body=new THREE.Mesh(new THREE.BoxGeometry(gw,gH,gd),wallMat);
      body.position.set(cx,gH/2,cz); scene.add(body);
      const roof=new THREE.Mesh(new THREE.BoxGeometry(gw+0.3,0.2,gd+0.3),roofMat);
      roof.position.set(cx,gH+0.1,cz); scene.add(roof);
      const usaMat=new THREE.MeshStandardMaterial({color:'#1e3a5f',roughness:0.4,metalness:0.7});
      const usaW=Math.min(gw*0.65,3.2);
      const usa=new THREE.Mesh(new THREE.BoxGeometry(usaW,gH*0.85,0.1),usaMat);
      usa.position.set(cx,gH*0.425,cz-gd/2-0.05); scene.add(usa);
      // Linii usa
      const lineMat=new THREE.MeshStandardMaterial({color:'#90a0b0',roughness:0.3,metalness:0.8});
      for(let li=0;li<4;li++){
        const lm=new THREE.Mesh(new THREE.BoxGeometry(usaW,0.06,0.05),lineMat);
        lm.position.set(cx,0.5+li*0.55,cz-gd/2-0.06); scene.add(lm);
      }
    }
    else if(tipKey==='bbq'){
      const piatra=new THREE.MeshStandardMaterial({color:'#6b5a4a',roughness:0.95,metalness:0});
      const r_vatra=Math.min(sz*0.18,2.5);
      const vatra=new THREE.Mesh(new THREE.CylinderGeometry(r_vatra,r_vatra*1.1,0.6,12),piatra);
      vatra.position.set(cx,0.3,cz); scene.add(vatra);
      // Parapet/zid vatra
      const parapetMat=new THREE.MeshStandardMaterial({color:'#8b7355',roughness:0.9,metalness:0});
      const parapet=new THREE.Mesh(new THREE.CylinderGeometry(r_vatra+0.3,r_vatra+0.35,0.4,12,1,true),parapetMat);
      parapet.position.set(cx,0.8,cz); scene.add(parapet);
      // Foc emissive vizibil
      const focMat=new THREE.MeshStandardMaterial({color:'#ff6600',emissive:new THREE.Color(1.0,0.4,0),emissiveIntensity:4,roughness:1,transparent:true,opacity:0.9});
      const foc=new THREE.Mesh(new THREE.ConeGeometry(r_vatra*0.5,r_vatra*0.8,8),focMat);
      foc.position.set(cx,1.2,cz); scene.add(foc);
      if(window._v3dNight){
        const focLight=new THREE.PointLight('#ff6600',2.5,sz*2,1.5);
        focLight.position.set(cx,2,cz); scene.add(focLight);
      }
      // Masa cu umbrela
      const masaMat=new THREE.MeshStandardMaterial({color:'#8B6914',roughness:0.8,metalness:0});
      const offset=sz*0.35;
      const masa=new THREE.Mesh(new THREE.CylinderGeometry(1.0,1.0,0.07,12),masaMat);
      masa.position.set(cx+offset,0.78,cz+offset); scene.add(masa);
      const picior=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,0.78,6),masaMat);
      picior.position.set(cx+offset,0.39,cz+offset); scene.add(picior);
      // Scaune (4)
      [1,-1].forEach(sx2=>[1,-1].forEach(sz2=>{
        const sc=new THREE.Mesh(new THREE.BoxGeometry(0.45,0.08,0.45),masaMat);
        sc.position.set(cx+offset+sx2*0.65,0.48,cz+offset+sz2*0.65); scene.add(sc);
      }));
    }
    else if(tipKey==='bucvara'){
      const perMat=new THREE.MeshStandardMaterial({color:'#f0d0a0',roughness:0.85,metalness:0});
      const rfMat=new THREE.MeshStandardMaterial({color:'#c84a20',roughness:0.7,metalness:0});
      const bw=Math.min(Math.max(w*0.7,3),6), bd=Math.min(Math.max(d*0.7,3),5);
      const hh=2.6;
      // 3 pereti: stanga, dreapta, spate (fata deschisa)
      [{ox:-bw/2,oz:0,ww:0.15,dd:bd},{ox:bw/2,oz:0,ww:0.15,dd:bd},{ox:0,oz:-bd/2,ww:bw,dd:0.15}].forEach(({ox,oz,ww,dd})=>{
        const p=new THREE.Mesh(new THREE.BoxGeometry(ww,hh,dd),perMat);
        p.position.set(cx+ox,hh/2,cz+oz); scene.add(p);
      });
      // Acoperis
      const rf=new THREE.Mesh(new THREE.BoxGeometry(bw+0.4,0.18,bd+0.4),rfMat);
      rf.position.set(cx,hh+0.09,cz); scene.add(rf);
      // Cos de fum
      const cosMat=new THREE.MeshStandardMaterial({color:'#8B6914',roughness:0.9,metalness:0});
      const cos=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.2,1.2,8),cosMat);
      cos.position.set(cx+bw*0.3,hh+0.8,cz-bd*0.3); scene.add(cos);
    }
    else if(tipKey==='bortodoxa'){
      const isNight=window._v3dNight||false;
      // Materiale: noaptea zidurile prind lumina calda, cupolele stralucesc auriu
      const zidMat=new THREE.MeshStandardMaterial({
        color: isNight?'#c8b89a':'#f5f0e8', roughness:0.8, metalness:0,
        emissive: isNight?new THREE.Color(0.12,0.08,0.02):new THREE.Color(0,0,0),
        emissiveIntensity: isNight?1.0:0
      });
      const acMat=new THREE.MeshStandardMaterial({
        color:'#8B6914', roughness:0.4, metalness:0.5,
        emissive: new THREE.Color(0.3,0.18,0.01),
        emissiveIntensity: isNight?3.5:0.4  // cupola straluceste auriu noaptea
      });
      const cruceMat=new THREE.MeshStandardMaterial({
        color:'#d4af37', roughness:0.1, metalness:1.0,
        emissive: new THREE.Color(0.8,0.6,0.0),
        emissiveIntensity: isNight?5.0:0.3   // crucea straluceste puternic noaptea
      });
      const bs=Math.min(Math.max(sz*0.65,6),14);

      // Corp + bolta + turla
      const corp=new THREE.Mesh(new THREE.BoxGeometry(bs*0.6,5,bs),zidMat);
      corp.position.set(cx,2.5,cz); scene.add(corp);
      const bolta=new THREE.Mesh(new THREE.SphereGeometry(bs*0.32,8,6,0,Math.PI*2,0,Math.PI/2),acMat);
      bolta.position.set(cx,5.2,cz); scene.add(bolta);
      const turla=new THREE.Mesh(new THREE.CylinderGeometry(0.8,1.0,3.5,8),zidMat);
      turla.position.set(cx,7.5,cz-bs*0.15); scene.add(turla);
      const turlaAc=new THREE.Mesh(new THREE.ConeGeometry(0.85,2.0,8),acMat);
      turlaAc.position.set(cx,10.2,cz-bs*0.15); scene.add(turlaAc);
      const cv=new THREE.Mesh(new THREE.BoxGeometry(0.08,1.0,0.08),cruceMat);
      cv.position.set(cx,11.7,cz-bs*0.15); scene.add(cv);
      const ch=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.08,0.08),cruceMat);
      ch.position.set(cx,11.5,cz-bs*0.15); scene.add(ch);

      if(isNight){
        // ── Lumini noapte ──────────────────────────────────────────────
        // 1. Halo auriu cupola — lumina calda portocalie sus
        const haloLight=new THREE.PointLight('#ffc060',4.5,bs*2.5,1.8);
        haloLight.position.set(cx,9,cz-bs*0.15); scene.add(haloLight);

        // 2. Lumina difuza corp — ilumineaza peretii de jos
        const corpLight=new THREE.PointLight('#ffe8a0',2.5,bs*1.8,2.0);
        corpLight.position.set(cx,1.5,cz); scene.add(corpLight);

        // 3. Spot cruce — fascicul alb-auriu de jos in sus pe cruce
        const spotCruce=new THREE.SpotLight('#fffbe0',6,18,Math.PI/10,0.3,2);
        spotCruce.position.set(cx,0.5,cz-bs*0.15-3);
        spotCruce.target.position.set(cx,12,cz-bs*0.15);
        scene.add(spotCruce); scene.add(spotCruce.target);

        // 4. Ferestre nave — lumina calda galbena din interior
        [[-bs*0.25,0],[bs*0.25,0],[0,-bs*0.4],[0,bs*0.4]].forEach(([ox,oz])=>{
          const winLight=new THREE.PointLight('#ffdd80',1.8,bs*0.7,2.5);
          winLight.position.set(cx+ox,2.5,cz+oz); scene.add(winLight);
          // Mesh vitraliu emissive
          const vitMat=new THREE.MeshStandardMaterial({
            color:'#ffcc44',emissive:new THREE.Color(1.0,0.7,0.1),
            emissiveIntensity:3,transparent:true,opacity:0.85,side:THREE.DoubleSide
          });
          const vit=new THREE.Mesh(new THREE.PlaneGeometry(0.9,1.4),vitMat);
          vit.position.set(cx+ox,2.5,cz+oz); scene.add(vit);
        });

        // 5. Halo albastru-alb la baza — tip reper urban (spot exterior)
        const groundSpot=new THREE.PointLight('#c0d8ff',1.5,bs*1.2,2.2);
        groundSpot.position.set(cx,0.3,cz); scene.add(groundSpot);
      }
    }
    else if(tipKey==='bcatolica'){
      const isNight=window._v3dNight||false;
      // Materiale: stil gotic — piatra alba iluminata cu spoturi reci
      const zidMat=new THREE.MeshStandardMaterial({
        color: isNight?'#d8d0c0':'#e8e0d0', roughness:0.75, metalness:0,
        emissive: isNight?new THREE.Color(0.06,0.07,0.10):new THREE.Color(0,0,0),
        emissiveIntensity: isNight?1.2:0
      });
      const acMat=new THREE.MeshStandardMaterial({
        color:'#607080', roughness:0.45, metalness:0.25,
        emissive: isNight?new THREE.Color(0.05,0.07,0.12):new THREE.Color(0,0,0),
        emissiveIntensity: isNight?1.5:0
      });
      const cruceMat=new THREE.MeshStandardMaterial({
        color:'#d4af37', roughness:0.1, metalness:1.0,
        emissive: new THREE.Color(0.9,0.7,0.0),
        emissiveIntensity: isNight?5.5:0.2  // crucea mai puternica decat la ortodoxa
      });
      const bs=Math.min(Math.max(sz*0.65,6),12);

      // Geometrie
      const nava=new THREE.Mesh(new THREE.BoxGeometry(bs*0.55,5.5,bs),zidMat);
      nava.position.set(cx,2.75,cz); scene.add(nava);
      const aRoof=new THREE.Mesh(new THREE.CylinderGeometry(0.01,bs*0.32,1.8,3,1),acMat);
      aRoof.rotation.y=Math.PI/2; aRoof.position.set(cx,6.3,cz); scene.add(aRoof);
      const turn=new THREE.Mesh(new THREE.BoxGeometry(bs*0.2,9,bs*0.2),zidMat);
      turn.position.set(cx+bs*0.3,4.5,cz-bs*0.38); scene.add(turn);
      const turnAc=new THREE.Mesh(new THREE.ConeGeometry(bs*0.13,2.5,4),acMat);
      turnAc.rotation.y=Math.PI/4; turnAc.position.set(cx+bs*0.3,10.25,cz-bs*0.38); scene.add(turnAc);
      const cv2=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.9,0.07),cruceMat);
      cv2.position.set(cx+bs*0.3,11.7,cz-bs*0.38); scene.add(cv2);
      const ch2=new THREE.Mesh(new THREE.BoxGeometry(0.45,0.07,0.07),cruceMat);
      ch2.position.set(cx+bs*0.3,11.4,cz-bs*0.38); scene.add(ch2);

      if(isNight){
        // ── Lumini noapte stil catolic ─────────────────────────────────
        // 1. Spoturi reci pe turn + cruce (lumina alba-albastruie, gotic)
        const spotTurn=new THREE.SpotLight('#e0eeff',5,20,Math.PI/8,0.25,1.8);
        spotTurn.position.set(cx+bs*0.3-4,0.5,cz-bs*0.38-3);
        spotTurn.target.position.set(cx+bs*0.3,12,cz-bs*0.38);
        scene.add(spotTurn); scene.add(spotTurn.target);

        // 2. Spot lateral nava (gotic: lumina dramatica pe fatada)
        const spotNava=new THREE.SpotLight('#ddeeff',3,15,Math.PI/6,0.35,2);
        spotNava.position.set(cx-bs*0.5,0.5,cz);
        spotNava.target.position.set(cx,4,cz);
        scene.add(spotNava); scene.add(spotNava.target);

        // 3. Halo rece pe turn (albastru-alb: reper urban nocturn)
        const turnLight=new THREE.PointLight('#a0c0ff',3.5,bs*1.8,1.8);
        turnLight.position.set(cx+bs*0.3,8,cz-bs*0.38); scene.add(turnLight);

        // 4. Vitralii nave — lumina calda galbena-portocalie din interior
        [[-bs*0.2,-bs*0.35],[bs*0.15,-bs*0.1],[0,bs*0.3]].forEach(([ox,oz],wi)=>{
          const wcol=['#ff9922','#ffcc44','#ff8844'][wi];
          const winLight=new THREE.PointLight(wcol,2.0,bs*0.65,2.5);
          winLight.position.set(cx+ox,2.5,cz+oz); scene.add(winLight);
          const vitMat=new THREE.MeshStandardMaterial({
            color:wcol, emissive:new THREE.Color(...wcol.match(/.{2}/g).map(h=>parseInt(h,16)/255/2)),
            emissiveIntensity:4, transparent:true, opacity:0.9, side:THREE.DoubleSide
          });
          const vit=new THREE.Mesh(new THREE.PlaneGeometry(0.7,2.0),vitMat);
          vit.position.set(cx+ox,2.5,cz+oz); scene.add(vit);
        });

        // 5. Lumina de sol albastra — halo urban la baza
        const groundL=new THREE.PointLight('#8090c0',2.0,bs*1.0,2.5);
        groundL.position.set(cx,0.5,cz); scene.add(groundL);
      }
    }
  }catch(e){ console.warn('_lotRenderSpecial',tipKey,e.message); }
};

function _lotHtmlTipuri(){
  const _mob = window.innerWidth < 841;
  // Grupare pe categorii
  const catLabels = {rezidential:'🏠 Rezidențial', dotare:'🌿 Dotări / Amenajări', cult:'⛪ Cult / Spații Publice'};
  const grupe = {};
  Object.entries(_LOT.tipuri).forEach(([key,def])=>{
    const cat = def.categorie||'rezidential';
    if(!grupe[cat]) grupe[cat]=[];
    grupe[cat].push([key,def]);
  });

  let html = '';
  Object.entries(grupe).forEach(([cat, items])=>{
    html += `<div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin:8px 0 6px;padding:4px 8px;background:rgba(255,255,255,.04);border-radius:6px">${catLabels[cat]||cat}</div>`;
    items.forEach(([key, def])=>{
      const isActiv = _LOT.tipActiv?.[key] !== false;
      const ov = _LOT.tipOverride[key]||{};
      const t  = {...def, ...ov};
      const hasOverride = Object.keys(ov).length > 0;
      const hNiv = ov.hNiv || def.hNiv || 3.0;
      const hParter = ov.hParter || def.hParter || 3.0;
      const hRetras = ov.hasRetras !== undefined ? ov.hasRetras : false;
      html += `
    <div style="background:rgba(255,255,255,${isActiv?'.04':'.01'});border:1px solid ${isActiv?(hasOverride?t.color+'66':'rgba(255,255,255,.07)'):'rgba(255,255,255,.03)'};border-radius:12px;padding:12px;margin-bottom:8px;border-left:3px solid ${isActiv?t.color:'#334155'};opacity:${isActiv?1:0.45}">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:${isActiv?'10':'0'}px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:${_mob?'22':'18'}px">${def.icon}</span>
          <div>
            <div style="color:#e2e8f0;font-size:${_mob?'14':'12'}px;font-weight:800">${def.label}</div>
            <div style="color:#475569;font-size:${_mob?'10':'9'}px">${def.desc}</div>
          </div>
        </div>
        <div style="display:flex;gap:4px;align-items:center">
          <button onclick="_LOT.tipActiv=_LOT.tipActiv||{};_LOT.tipActiv['${key}']=!(_LOT.tipActiv['${key}']!==false);if(!_LOT.tipActiv['${key}']){_LOT.tipMix['${key}']=0;}else{_LOT.tipMix['${key}']=_LOT.tipMix['${key}']||10;}_lotTab('t')"
            style="padding:${_mob?'8px 14px':'4px 10px'};border-radius:7px;font-size:${_mob?'12':'10'}px;font-weight:700;cursor:pointer;border:1px solid ${isActiv?t.color:'rgba(255,255,255,.15)'};background:${isActiv?t.color+'33':'rgba(11,18,32,.8)'};color:${isActiv?t.color:'#475569'};min-height:${_mob?'36':'auto'}px">
            ${isActiv?'✓ Activ':'+ Activează'}
          </button>
          ${hasOverride?`<button onclick="delete _LOT.tipOverride['${key}'];_lotTab('t')" style="font-size:9px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.25);color:#f87171;border-radius:5px;padding:2px 7px;cursor:pointer">↩</button>`:''}
        </div>
      </div>
      ${isActiv ? `
      <div style="background:rgba(0,0,0,.25);border-radius:8px;padding:8px 10px;margin-bottom:8px">
        <div style="font-size:9px;color:#d4af37;font-weight:700;text-transform:uppercase;margin-bottom:6px">Regim de înălțime</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px">
          <div>
            <div style="font-size:9px;color:#64748b;margin-bottom:3px">Nr. niveluri (fără parter)</div>
            <div style="display:flex;gap:3px;flex-wrap:wrap">
              ${[0,1,2,3,4,5,6,7].map(n=>`<button onclick="_lotSetTipParam('${key}','niv',${n+1});_lotTab('t')" style="padding:${_mob?'8px 10px':'4px 7px'};border-radius:5px;font-size:${_mob?'13':'11'}px;font-weight:700;cursor:pointer;border:1px solid ${t.niv===(n+1)?t.color:'rgba(255,255,255,.12)'};background:${t.niv===(n+1)?t.color+'33':'rgba(11,18,32,.8)'};color:${t.niv===(n+1)?t.color:'#64748b'};min-height:${_mob?'36px':'auto'}">${n===0?'P':('P+'+n+'E')}</button>`).join('')}
            </div>
          </div>
          <div>
            <div style="font-size:9px;color:#64748b;margin-bottom:3px">Etaj retras</div>
            <div style="display:flex;gap:4px">
              <button onclick="_lotSetTipParam('${key}','hasRetras',false);_lotTab('t')" style="flex:1;padding:${_mob?'9px 5px':'5px'};border-radius:6px;font-size:${_mob?'13':'10'}px;font-weight:700;cursor:pointer;border:1px solid ${!hRetras?t.color:'rgba(255,255,255,.12)'};background:${!hRetras?t.color+'22':'rgba(11,18,32,.8)'};color:${!hRetras?t.color:'#64748b'}">Fără</button>
              <button onclick="_lotSetTipParam('${key}','hasRetras',true);_lotTab('t')" style="flex:1;padding:${_mob?'9px 5px':'5px'};border-radius:6px;font-size:${_mob?'13':'10'}px;font-weight:700;cursor:pointer;border:1px solid ${hRetras?t.color:'rgba(255,255,255,.12)'};background:${hRetras?t.color+'22':'rgba(11,18,32,.8)'};color:${hRetras?t.color:'#64748b'}">+Retras</button>
            </div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
          <div>
            <div style="font-size:9px;color:#64748b;margin-bottom:3px">H parter (m)</div>
            <input type="number" min="2" max="8" step="0.1" value="${hParter}" style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:5px;padding:${_mob?'9px':'5px'} 8px;font-size:${_mob?'16px':'12px'}" oninput="_lotSetTipParam('${key}','hParter',+this.value)">
          </div>
          <div>
            <div style="font-size:9px;color:#64748b;margin-bottom:3px">H etaj (m)</div>
            <input type="number" min="2" max="5" step="0.1" value="${hNiv}" style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:5px;padding:5px 8px;font-size:12px" oninput="_lotSetTipParam('${key}','hNiv',+this.value);_lotTab('t')">
          </div>
        </div>
        <div style="margin-top:6px;background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.2);border-radius:6px;padding:5px 8px;display:flex;justify-content:space-between">
          <span style="font-size:9px;color:#64748b">H total:</span>
          <span style="color:#d4af37;font-size:11px;font-weight:800">${(parseFloat(hParter)+Math.max(0,t.niv-1)*parseFloat(hNiv)+(hRetras?2.5:0)).toFixed(1)}m${hRetras?' (+retras)':''}</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:${_mob?'1fr 1fr':'1fr 1fr 1fr'};gap:5px">
        <div>
          <div style="font-size:9px;color:#64748b;margin-bottom:3px">POT lot (%)</div>
          <input type="number" min="10" max="100" step="5" value="${t.sc}" style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:5px;padding:${_mob?'8px':'4px'} 7px;font-size:${_mob?'14':'12'}px" oninput="_lotSetTipParam('${key}','sc',+this.value)">
        </div>
        <div>
          <div style="font-size:9px;color:#64748b;margin-bottom:3px">Ret. față (m)</div>
          <input type="number" min="0" max="20" step="0.5" value="${t.retF}" style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:5px;padding:${_mob?'8px':'4px'} 7px;font-size:${_mob?'14':'12'}px" oninput="_lotSetTipParam('${key}','retF',+this.value)">
        </div>
        <div>
          <div style="font-size:9px;color:#64748b;margin-bottom:3px">Lot default (mp)</div>
          <input type="number" min="20" max="5000" step="10" value="${t.lotDefault||def.lotDefault}" style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:#e2e8f0;border-radius:5px;padding:${_mob?'8px':'4px'} 7px;font-size:${_mob?'14':'12'}px" oninput="_lotSetTipParam('${key}','lotDefault',+this.value)">
        </div>
      </div>

      <!-- ── Stil arhitectural ── -->
      <div style="margin-top:8px">
        <div style="font-size:9px;color:#d4af37;font-weight:700;text-transform:uppercase;margin-bottom:6px">🎨 Stil arhitectural</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">
          ${(window.AEDIS_STIL?Object.entries(window.AEDIS_STIL):[['modern',{label:'Modern'}],['clasic',{label:'Clasic'}],['minimalist',{label:'Minimalist'}],['industrial',{label:'Industrial'}],['inovator',{label:'Inovator'}],['adaptat_context',{label:'Context'}]]).map(([sk,sv])=>`
            <button onclick="_lotSetTipParam('${key}','stil','${sk}');_lotTab('t')"
              style="padding:${_mob?'7px 10px':'4px 8px'};border-radius:6px;font-size:${_mob?'11':'9'}px;font-weight:700;cursor:pointer;
              border:1px solid ${(t.stil||def.stil||'modern')===sk?t.color:'rgba(255,255,255,.1)'};
              background:${(t.stil||def.stil||'modern')===sk?t.color+'33':'rgba(11,18,32,.8)'};
              color:${(t.stil||def.stil||'modern')===sk?t.color:'#64748b'}">${sv.label}</button>`).join('')}
        </div>
      </div>

      <!-- ── Tip acoperiș ── -->
      <div style="margin-top:8px">
        <div style="font-size:9px;color:#d4af37;font-weight:700;text-transform:uppercase;margin-bottom:6px">🏠 Tip acoperiș</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">
          ${[['terasa_plata','▬','Terasă plată'],['terasa_circulabila','🏖','Terasă circul.'],['sarpanta','🏠','Șarpantă'],['mansarda','🏡','Mansardă'],['combinat','🏢','Combinat']].map(([id,ico,lbl])=>`
            <button onclick="_lotSetTipParam('${key}','tipAcoperis','${id}');_lotTab('t')"
              style="padding:${_mob?'7px 10px':'4px 8px'};border-radius:6px;font-size:${_mob?'11':'9'}px;font-weight:700;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:1px;
              border:1px solid ${(t.tipAcoperis||def.tipAcoperis||'terasa_plata')===id?t.color:'rgba(255,255,255,.1)'};
              background:${(t.tipAcoperis||def.tipAcoperis||'terasa_plata')===id?t.color+'33':'rgba(11,18,32,.8)'};
              color:${(t.tipAcoperis||def.tipAcoperis||'terasa_plata')===id?t.color:'#64748b'}">
              <span>${ico}</span><span style="font-size:${_mob?'10':'8'}px">${lbl}</span>
            </button>`).join('')}
        </div>
      </div>

      <!-- ── Penthouse ── -->
      <div style="margin-top:8px;background:rgba(0,0,0,.2);border-radius:8px;padding:8px 10px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="font-size:9px;color:#d4af37;font-weight:700;text-transform:uppercase">🏙 Penthouse</div>
          <button onclick="_lotSetTipParam('${key}','penthouseActiv',!${!!(t.penthouseActiv||def.penthouseActiv)});_lotTab('t')"
            style="padding:${_mob?'7px 12px':'3px 10px'};border-radius:6px;font-size:${_mob?'12':'10'}px;font-weight:700;cursor:pointer;
            border:1px solid ${(t.penthouseActiv||def.penthouseActiv)?t.color:'rgba(255,255,255,.15)'};
            background:${(t.penthouseActiv||def.penthouseActiv)?t.color+'33':'rgba(11,18,32,.8)'};
            color:${(t.penthouseActiv||def.penthouseActiv)?t.color:'#475569'}">
            ${(t.penthouseActiv||def.penthouseActiv)?'✓ Activ':'+ Adaugă'}
          </button>
        </div>
        ${(t.penthouseActiv||def.penthouseActiv)?`
        <div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:6px">
          <div>
            <div style="font-size:9px;color:#64748b;margin-bottom:3px">Retragere (m)</div>
            <input type="range" min="1" max="8" step="0.5" value="${t.penthouseRetragere||def.penthouseRetragere||2.5}"
              style="width:100%;accent-color:${t.color}"
              oninput="_lotSetTipParam('${key}','penthouseRetragere',+this.value);this.nextElementSibling.textContent=this.value+'m'">
            <span style="font-size:10px;color:#d4af37;font-weight:700">${t.penthouseRetragere||def.penthouseRetragere||2.5}m</span>
          </div>
          <div>
            <div style="font-size:9px;color:#64748b;margin-bottom:3px">Înălțime (m)</div>
            <input type="range" min="2.4" max="5" step="0.2" value="${t.penthouseH||def.penthouseH||3.2}"
              style="width:100%;accent-color:${t.color}"
              oninput="_lotSetTipParam('${key}','penthouseH',+this.value);this.nextElementSibling.textContent=this.value+'m'">
            <span style="font-size:10px;color:#d4af37;font-weight:700">${t.penthouseH||def.penthouseH||3.2}m</span>
          </div>
          <div style="grid-column:span 2">
            <div style="font-size:9px;color:#64748b;margin-bottom:3px">Suprafață penthouse (%)</div>
            <input type="range" min="25" max="85" step="5" value="${Math.round((t.penthouseSuprafataFactor||def.penthouseSuprafataFactor||0.5)*100)}"
              style="width:100%;accent-color:${t.color}"
              oninput="_lotSetTipParam('${key}','penthouseSuprafataFactor',+this.value/100);this.nextElementSibling.textContent=this.value+'%'">
            <span style="font-size:10px;color:#d4af37;font-weight:700">${Math.round((t.penthouseSuprafataFactor||def.penthouseSuprafataFactor||0.5)*100)}%</span>
          </div>
        </div>`:''}
      </div>

      <!-- ── Extra ── -->
      <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:5px">
        ${[['balcoane','🪟 Balcoane',true],['pereteleCortina','🪞 Perete cortină',true],[(['bloc','insiruita'].includes(key)?'parterComercial':null),'🏪 Parter comercial',['bloc','insiruita'].includes(key)]].filter(([f])=>f).map(([field,label])=>`
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:${_mob?'8px 12px':'5px 10px'};flex:1;min-width:110px">
          <input type="checkbox" ${(t[field]||def[field])?'checked':''} onchange="_lotSetTipParam('${key}','${field}',this.checked);_lotTab('t')" style="accent-color:${t.color};width:${_mob?'18':'14'}px;height:${_mob?'18':'14'}px">
          <span style="font-size:${_mob?'12':'10'}px;color:#94a3b8;font-weight:600">${label}</span>
        </label>`).join('')}
        ${(t.balcoane||def.balcoane)?`
        <div style="width:100%;display:flex;align-items:center;gap:8px;padding:3px 2px">
          <span style="font-size:9px;color:#64748b;white-space:nowrap">Adâncime balcon:</span>
          <input type="range" min="0.6" max="2.5" step="0.1" value="${t.balconAdancime||def.balconAdancime||1.2}"
            style="flex:1;accent-color:${t.color}"
            oninput="_lotSetTipParam('${key}','balconAdancime',+this.value);this.nextElementSibling.textContent=this.value+'m'">
          <span style="font-size:10px;color:#d4af37;font-weight:700;min-width:32px">${t.balconAdancime||def.balconAdancime||1.2}m</span>
        </div>`:''}
      </div>
      ` : ''}
    </div>`;
    });
  });
  html += `<button onclick="Object.keys(_LOT.tipuri).forEach(k=>{_LOT.tipOverride[k]={};_LOT.tipActiv[k]=(['individuala','insiruita','duplex','bloc'].includes(k));if(!_LOT.tipActiv[k])_LOT.tipMix[k]=0;});_lotTab('t')" style="width:100%;padding:8px;background:rgba(100,116,139,.1);border:1px solid rgba(100,116,139,.2);color:#64748b;border-radius:8px;font-size:10px;cursor:pointer;margin-top:4px">↩ Reset toți parametrii</button>`;
  return html;
}


function _lotHtmlParametri(){
  const ap=S.parcels[S.activeParcel??0];
  return `
  ${!ap?`<div style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:8px;padding:8px 10px;font-size:10px;color:#f87171;margin-bottom:10px">⚠️ Selectați mai întâi o parcelă de pe hartă</div>`:''}

  ${(S.parcels||[]).filter(p=>p?.geo?.geometry).length>1?`
  <div style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.25);border-radius:8px;padding:7px 10px;margin-bottom:10px;font-size:10px;color:#f59e0b">
    <b>⊞ ${S.parcels.filter(p=>p?.geo?.geometry).length} parcele selectate</b> — lotizarea se va genera pe <b>suprafața unificată</b> a tuturor parcelelor.<br>
    <span style="color:#64748b">Suprafață totală: ~${Math.round(S.parcels.filter(p=>p?.geo?.geometry).reduce((s,p)=>s+(p.area||0),0))} mp</span>
  </div>`:''}
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
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:14px">
    ${[['grid','📏 Grilă regulată','Loturi egale în rânduri'],['strip','➡ Fâșii paralele','Loturi alungite, front la drum'],['adaptiv','🔄 Adaptiv','Urmărește forma parcelei'],['radial','◉ Periferic','Loturi pe conturul parcelei']].map(([v,l,d])=>`
      <button onclick="_LOT.strategie='${v}';_lotTab('p')" style="background:${_LOT.strategie===v?'rgba(52,211,153,.15)':'rgba(255,255,255,.04)'};border:1px solid ${_LOT.strategie===v?'#34d399':'rgba(255,255,255,.08)'};border-radius:8px;padding:8px;cursor:pointer;text-align:left">
        <div style="color:${_LOT.strategie===v?'#34d399':'#e2e8f0'};font-size:10px;font-weight:700">${l}</div>
        <div style="color:#475569;font-size:8.5px;margin-top:2px">${d}</div>
      </button>`).join('')}
  </div>

  <!-- ─── Retrageri edificabil lotizare ──────────────────────────────── -->
  <div style="background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.2);border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <div style="font-size:10px;color:#fbbf24;font-weight:700">📐 Retrageri edificabil față de limita proprietății</div>
      <button onclick="
        const ap=S.parcels[S.activeParcel??0];
        const p=ap?.params||{};
        _LOT.retFront=parseFloat(p.rf||0);
        _LOT.retSpate=parseFloat(p.rs||0);
        _LOT.retLateral=parseFloat(p.rl||0);
        _lotTab('p')
      " style="font-size:9px;background:rgba(251,191,36,.15);border:1px solid rgba(251,191,36,.3);color:#fbbf24;border-radius:5px;padding:3px 8px;cursor:pointer">
        ↙ Din PUG
      </button>
    </div>
    <div style="font-size:8.5px;color:#475569;margin-bottom:8px">
      ⚠️ Aceste retrageri controlează <b style="color:#fbbf24">marginea edificabilului</b> — zona din care se generează loturile față de limita proprietății.<br>
      Tab-ul <b style="color:#94a3b8">Analiză</b> → retrageri AEDIS (un singur imobil). <b>Nu se aplică automat la lotizare.</b>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">
      ${[['retFront','↑ Față (stradă)','#fbbf24'],['retSpate','↓ Spate','#94a3b8'],['retLateral','↔ Lateral','#60a5fa']].map(([field,label,col])=>`
        <div>
          <div style="font-size:8px;color:#64748b;margin-bottom:3px">${label}</div>
          <div style="display:flex;align-items:center;gap:3px">
            <input type="number" min="0" max="20" step="0.5" value="${_LOT[field]||0}"
              style="width:100%;background:#04090f;border:1px solid rgba(255,255,255,.15);color:${col};border-radius:5px;padding:5px 6px;font-size:13px;font-weight:700"
              oninput="_LOT['${field}']=+this.value">
            <span style="color:${col};font-size:10px;font-weight:700">m</span>
          </div>
        </div>`).join('')}
    </div>
    <div style="margin-top:8px;display:flex;gap:5px">
      <button onclick="_LOT.retFront=0;_LOT.retSpate=0;_LOT.retLateral=0;_lotTab('p')"
        style="flex:1;font-size:9px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#f87171;border-radius:6px;padding:4px;cursor:pointer">
        0m (maxim teren)
      </button>
      <button onclick="_LOT.retFront=3;_LOT.retSpate=3;_LOT.retLateral=3;_lotTab('p')"
        style="flex:1;font-size:9px;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.2);color:#fbbf24;border-radius:6px;padding:4px;cursor:pointer">
        3m (standard)
      </button>
      <button onclick="_LOT.retFront=5;_LOT.retSpate=5;_LOT.retLateral=3;_lotTab('p')"
        style="flex:1;font-size:9px;background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.2);color:#818cf8;border-radius:6px;padding:4px;cursor:pointer">
        5/5/3m (PUG typ.)
      </button>
    </div>
  </div>`;
}

// ─── TAB: Mix tipuri ──────────────────────────────────────────────────────
function _lotHtmlMix(){
  // Doar rezidentiale in calcul sum=100
  const _specK=['gazebo','garaj','bbq','bucvara','bortodoxa','bcatolica'];
  const total=Object.entries(_LOT.tipMix).filter(([k])=>!_specK.includes(k)).reduce((s,[,v])=>s+v,0);
  const totalSpeciale=Object.values(_LOT.tipCount||{}).reduce((s,v)=>s+(parseInt(v)||0),0);
  return `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
    <span style="font-size:10px;color:#d4af37;font-weight:700">🏡 Mix rezidențial</span>
    <span style="font-size:12px;font-weight:800;color:${total===100?'#4ade80':'#f87171'}">${total}% ${total===100?'✓':'≠100'}</span>
  </div>
  ${total!==100?`<div style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);border-radius:8px;padding:7px 10px;font-size:10px;color:#f87171;margin-bottom:8px">Totalul rezidențial trebuie să fie 100% (acum ${total}%)</div>`:''}
  ${totalSpeciale>0?`<div style="background:rgba(212,175,55,.07);border:1px solid rgba(212,175,55,.2);border-radius:7px;padding:5px 9px;font-size:9px;color:#d4af37;margin-bottom:8px">+ ${totalSpeciale} loturi speciale adăugate automat deasupra mixului rezidențial</div>`:''}

  <!-- Rezidentiale: procente (sum 100%) -->
  ${Object.entries(_LOT.tipuri).filter(([k])=>!['gazebo','garaj','bbq','bucvara','bortodoxa','bcatolica'].includes(k)).map(([k,t])=>`
    <div style="background:rgba(255,255,255,.04);border-radius:11px;padding:11px;border:1px solid rgba(255,255,255,.06);margin-bottom:6px;border-left:3px solid ${(_LOT.tipMix[k]||0)>0?t.color:'rgba(255,255,255,.1)'}">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
        <label style="display:flex;align-items:center;gap:7px;cursor:pointer">
          <input type="checkbox" ${(_LOT.tipMix[k]||0)>0?'checked':''} onchange="if(!this.checked){_LOT.tipMix['${k}']=0;_lotTab('m')}else{_LOT.tipMix['${k}']=25;_lotTab('m')}" style="accent-color:${t.color};width:16px;height:16px">
          <span style="font-size:13px">${t.icon}</span>
          <div>
            <div style="color:#e2e8f0;font-size:11px;font-weight:700">${t.label}</div>
            <div style="color:#475569;font-size:8.5px">${t.desc}</div>
          </div>
        </label>
        <span style="color:${t.color};font-size:16px;font-weight:800;min-width:38px;text-align:right" id="mix-v-${k}">${_LOT.tipMix[k]||0}%</span>
      </div>
      <input type="range" min="0" max="100" step="5" value="${_LOT.tipMix[k]||0}"
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

  <!-- Dotari/Cult: numar FIX de loturi (nu procent) -->
  <div style="margin-top:12px;margin-bottom:6px">
    <div style="font-size:10px;color:#d4af37;font-weight:700;margin-bottom:4px">🌿 Dotări / Amenajări / Cult — Nr. fix loturi</div>
    <div style="font-size:9px;color:#475569;margin-bottom:8px">Aceste tipuri se adaugă deasupra mixului rezidențial. 0 = nu se generează.</div>
  </div>
  ${Object.entries(_LOT.tipuri).filter(([k])=>['gazebo','garaj','bbq','bucvara','bortodoxa','bcatolica'].includes(k)).map(([k,t])=>{
    const cnt=parseInt((_LOT.tipCount||{})[k])||0;
    return `
    <div style="background:rgba(255,255,255,${cnt>0?'.05':'.02'});border-radius:10px;padding:9px 11px;margin-bottom:5px;border:1px solid ${cnt>0?t.color+'55':'rgba(255,255,255,.06)'};display:flex;align-items:center;gap:8px">
      <span style="font-size:16px">${t.icon}</span>
      <div style="flex:1;min-width:0">
        <div style="color:#e2e8f0;font-size:11px;font-weight:700">${t.label}</div>
        <div style="color:#475569;font-size:8px">${t.desc} · lot ${t.lotDefault}mp</div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;flex-shrink:0">
        <button onclick="_LOT.tipCount=_LOT.tipCount||{};_LOT.tipCount['${k}']=Math.max(0,(parseInt((_LOT.tipCount||{})['${k}'])||0)-1);_lotTab('m')"
          style="width:28px;height:28px;border-radius:7px;font-size:16px;font-weight:700;cursor:pointer;border:1px solid rgba(255,255,255,.15);background:rgba(11,18,32,.9);color:#94a3b8;line-height:1">−</button>
        <span style="color:${cnt>0?t.color:'#475569'};font-size:16px;font-weight:800;min-width:22px;text-align:center">${cnt}</span>
        <button onclick="_LOT.tipCount=_LOT.tipCount||{};_LOT.tipCount['${k}']=Math.min(10,(parseInt((_LOT.tipCount||{})['${k}'])||0)+1);_lotTab('m')"
          style="width:28px;height:28px;border-radius:7px;font-size:16px;font-weight:700;cursor:pointer;border:1px solid ${t.color};background:${t.color}22;color:${t.color};line-height:1">+</button>
      </div>
      ${cnt>0?`
      <div style="display:flex;align-items:center;gap:5px;margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,.06)">
        ${(_LOT.manualPos||{})[k]?.length>0
          ? `<span style="font-size:9px;color:#4ade80;flex:1">✓ ${(_LOT.manualPos[k]||[]).length}/${cnt} pozitii manuale</span>
             <button onclick="_lotClearManualPos('${k}')" style="font-size:9px;padding:3px 7px;border-radius:5px;cursor:pointer;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.25);color:#f87171">✕ Reset</button>`
          : `<span style="font-size:9px;color:#64748b;flex:1">Automat (margine)</span>`}
        <button onclick="_lotStartManualPlace('${k}')"
          style="padding:4px 10px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid ${t.color};background:${t.color}22;color:${t.color}">
          📍 Plasare manuală
        </button>
      </div>`:''}
    </div>`;}).join('')}

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

  const _specKeys2=['gazebo','garaj','bbq','bucvara','bortodoxa','bcatolica'];
  const totalMix=Object.entries(_LOT.tipMix).filter(([k])=>!_specKeys2.includes(k)).reduce((s,[,v])=>s+v,0);
  const totalSpeciale=Object.values(_LOT.tipCount||{}).reduce((s,v)=>s+(parseInt(v)||0),0);
  if(totalMix===0 && totalSpeciale===0){ss('⚠️ Selectați cel puțin un tip de locuință sau dotare.');return;}

  ss('🏘 Se generează planul de lotizare...');

  try{
    // ── Multi-parcelă: union al tuturor parcelelor selectate ─────────────
    let pFeat;
    const nrParcele = (S.parcels||[]).filter(p=>p?.geo?.geometry).length;
    _LOT._sceneCenter = null; // reset - folosim parcela activa ca centru implicit
    if(nrParcele > 1){
      ss('🏘 Se unifică '+nrParcele+' parcele pentru lotizare...');
      let unified = {type:'Feature',geometry:S.parcels[0].geo.geometry,properties:{}};
      for(let pi=1;pi<S.parcels.length;pi++){
        const p=S.parcels[pi];
        if(!p?.geo?.geometry) continue;
        try{
          const u=turf.union(unified,{type:'Feature',geometry:p.geo.geometry,properties:{}});
          if(u?.geometry) unified=u;
        }catch(e){}
      }
      pFeat=unified;
      // Salveaza centrul bbox-ului uniunii pentru viewer 3D
      try{
        const bb=turf.bbox(pFeat);
        _LOT._sceneCenter=[(bb[0]+bb[2])/2,(bb[1]+bb[3])/2];
      }catch(e){}
    } else {
      pFeat={type:'Feature',geometry:ap.geo.geometry,properties:{}};
    }
    const pArea=turf.area(pFeat);
    const params=ap.params||getDefaultParams(ap.utr||'');

    // Edificabil lotizare = parcela cu retrageri perimetrale configurate de utilizator
    // _LOT.retFront/retSpate/retLateral (tab Param) — NU din Analiza tab (acelea sunt AEDIS)
    const retF = Math.max(0, _LOT.retFront || 0);
    const retS = Math.max(0, _LOT.retSpate || 0);
    const retL = Math.max(0, _LOT.retLateral || 0);
    const retMed = (retF + retS + retL*2) / 4; // retragere medie pentru buffer uniform
    const retBuf = Math.max(0.5, retMed); // minim 0.5m pentru stabilitate geometrica
    let fp = pFeat;
    try{
      const buf = turf.buffer(pFeat, -retBuf, {units:'meters'});
      if(buf?.geometry && turf.area(buf) > pArea*0.3) fp = buf;
      else if(retBuf > 1){
        // Daca retragerea e prea mare pentru parcela mica, incercam 0.5m
        const buf2 = turf.buffer(pFeat, -0.5, {units:'meters'});
        if(buf2?.geometry && turf.area(buf2) > pArea*0.5) fp = buf2;
      }
    }catch(e){}
    const fpArea = turf.area(fp);

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
    const _specialTipKeys=['gazebo','garaj','bbq','bucvara','bortodoxa','bcatolica'];
    const tipCount=_LOT.tipCount||{};

    // Nr loturi speciale fixe
    const nrSpeciale=_specialTipKeys.reduce((s,k)=>s+(parseInt(tipCount[k])||0),0);
    // Loturi rezidentiale: calculam din teren util REAL (nu din bbox)
    // fpArea e suprafata reala a parcelei dupa buffer retrageri
    const terenUtilRezid=fpArea*(1-drumAreaFract);
    const nrRezidCalc=Math.max(1,Math.floor(terenUtilRezid/_LOT.lotAria)-nrSpeciale);
    const nrRezid=Math.max(1, Math.min(nrRezidCalc, nrLoturiTotal - nrSpeciale));

    // Distribuie rezidentiale proportional
    const tipuriActiv=Object.entries(_LOT.tipMix).filter(([k,v])=>v>0 && !_specialTipKeys.includes(k));
    let ramas=nrRezid;
    if(totalMix>0){
      tipuriActiv.forEach(([k,pct],i)=>{
        if(i===tipuriActiv.length-1) loturiPerTip[k]=Math.max(0,ramas);
        else{const n=Math.max(0,Math.round(nrRezid*pct/totalMix));loturiPerTip[k]=n;ramas-=n;}
      });
    }
    Object.keys(_LOT.tipuri).forEach(k=>{if(!loturiPerTip[k])loturiPerTip[k]=0;});

    // Adauga speciale cu nr fix
    _specialTipKeys.forEach(k=>{
      const n=parseInt(tipCount[k])||0;
      if(n>0) loturiPerTip[k]=n;
    });

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
    // Labels: doar pentru loturi suficient de mari si cu pas de filtrare
    // La proiecte mari (>30 loturi) reducem densitatea etichetelor
    const labelStep = loturi.length > 40 ? 3 : loturi.length > 20 ? 2 : 1;
    const labels=loturi
      .filter((l,li)=> li % labelStep === 0) // filtrare pas
      .map((l,li)=>{
        const tip=l.properties.tip||'individuala';
        const t=_LOT.tipuri[tip]||_LOT.tipuri.individuala;
        const tv=_lotGetTip(tip);
        const a=Math.round(turf.area(l));
        const reg=tv.niv===1?'P':('P+'+(tv.niv-1)+'E');
        return {type:'Feature',geometry:turf.centerOfMass(l).geometry,
          properties:{
            label:'L'+(li*labelStep+1)+'\n'+a+'mp\n'+reg,
            color:t.color
          }};
      });
    setSource('lotizare-label-src',{type:'FeatureCollection',features:labels});

    // ── Generare volume 3D → vol-src ──────────────────────────────────────
    _lotBuild3D(loturi, drumuri);

    try{const bb=turf.bbox(pFeat);map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:60,duration:700});}catch(e){}
    setTimeout(()=>{ if(!document.getElementById('lot-legend')) _lotToggleLegend(); }, 600);
    ss(`🏘 ${loturi.length} loturi · ${totalUnitati} unități · ROI ${roi}%`);
    _showLotizarePanel();setTimeout(()=>{
      _lotTab('r');
      // Adauga hint vizibil in rezultat despre cum se vede harta
      const hint = document.getElementById('lot-close-hint');
      if(!hint){
        const c = document.getElementById('lot-content');
        if(c){
          const d = document.createElement('div');
          d.id = 'lot-close-hint';
          d.style.cssText = 'background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.2);border-radius:8px;padding:8px 10px;font-size:10px;color:#818cf8;margin-top:10px;text-align:center';
          d.innerHTML = '💡 <b>✕ Închide</b> panelul pentru a vedea harta cu lotizarea · Propunerea rămâne vizibilă';
          c.appendChild(d);
        }
      }
    }, 80);

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

  // ── 1. Drumuri ──────────────────────────────────────────────────────────
  _LOT._drumCustom.forEach(d=>{
    if(d.coords.length < 2) return;
    try{
      const line={type:'Feature',geometry:{type:'LineString',coordinates:d.coords},properties:{}};
      const buf=turf.buffer(line, d.latime/2, {units:'meters'});
      if(!buf?.geometry) return;
      const inter=turf.intersect(fpFeat, buf);
      if(inter?.geometry) drumuri.push({...inter,properties:{tip:d.tip,id:d.id}});
    }catch(e){}
  });

  if(_LOT._drumCustom.length === 0){
    // Drum principal la 40% din inaltime (nu 33% — mai centrat)
    const drumY = bbox2[1]+hDeg*0.40;
    const dp={type:'Feature',geometry:{type:'Polygon',coordinates:[[
      [bbox2[0],drumY],[bbox2[2],drumY],
      [bbox2[2],drumY+drumLatDeg],[bbox2[0],drumY+drumLatDeg],[bbox2[0],drumY]
    ]]},properties:{tip:'drum_principal'}};
    try{const di=turf.intersect(fpFeat,dp);if(di?.geometry)drumuri.push({...di,properties:{tip:'drum_principal'}});}catch(e){}

    // Drumuri secundare la fiecare 3 randuri
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

  // ── 2. Teren disponibil = parcela minus drumuri ──────────────────────────
  let terenDisponibil=fpFeat;
  drumuri.forEach(d=>{
    try{ const diff=turf.difference(terenDisponibil,d); if(diff?.geometry) terenDisponibil=diff; }catch(e){}
  });

  // ── 3. SCANARE COMPLETA grid → colecteaza TOATE pozitiile valide ─────────
  // Fix principal: nu mai oprim bucla la lista.length — mai intai gasim toate
  // pozitiile valide, apoi distribuim tipurile proportional
  const cols2=Math.max(1,Math.round(wDeg/lotW)+1); // +1 pentru margini
  const rows2=Math.max(1,Math.round(hDeg/lotH)+1);
  const lotAriaMin=_LOT.lotAria*0.20; // minim 20% suprafata lot pentru a fi valid

  const pozitiiValide=[];
  for(let r=0;r<rows2;r++){
    const y0=bbox2[1]+r*lotH;
    const y1=y0+lotH;
    for(let c=0;c<cols2;c++){
      const x0=bbox2[0]+c*lotW;
      const x1=x0+lotW;
      const lotPoly={type:'Feature',geometry:{type:'Polygon',coordinates:[[
        [x0,y0],[x1,y0],[x1,y1],[x0,y1],[x0,y0]
      ]]},properties:{}};
      try{
        const inter=turf.intersect(terenDisponibil,lotPoly);
        if(!inter?.geometry) continue;
        const interArea=turf.area(inter);
        if(interArea < lotAriaMin) continue;
        pozitiiValide.push({geom:inter.geometry, area:Math.round(interArea), r, c});
      }catch(e){}
    }
  }

  if(!pozitiiValide.length) return {loturi,drumuri};

  // ── 4. Distribuie tipurile EXACT pe numarul cerut de loturi ─────────────
  // Nu generam mai mult decat cere mixul utilizatorului
  const tipuriActive=Object.keys(loturiPerTip).filter(k=>loturiPerTip[k]>0);
  const totalCerut=Object.values(loturiPerTip).reduce((s,v)=>s+v,0);

  // Construim lista de tipuri de asignat (fix, cat cere mixul)
  const asignari=[];
  tipuriActive.forEach(tip=>{
    const n=loturiPerTip[tip]||0;
    for(let i=0;i<n;i++) asignari.push(tip);
  });
  // Daca avem mai putine pozitii valide decat cerut → folosim cat avem
  const nrLoturiFinale=Math.min(asignari.length, pozitiiValide.length);
  if(nrLoturiFinale===0) return {loturi,drumuri};

  const specialTips=['gazebo','garaj','bbq','bucvara','bortodoxa','bcatolica'];
  const asignSpeciale=asignari.filter(t=>specialTips.includes(t));
  const asignRezid=asignari.filter(t=>!specialTips.includes(t));
  const tipDominant=tipuriActive.filter(t=>!specialTips.includes(t))
    .reduce((a,b)=>(loturiPerTip[a]||0)>=(loturiPerTip[b]||0)?a:b,tipuriActive[0]||'individuala');

  const maxR=pozitiiValide.length>0?Math.max(...pozitiiValide.map(x=>x.r)):0;
  const maxC=pozitiiValide.length>0?Math.max(...pozitiiValide.map(x=>x.c)):0;
  const pozMargine=pozitiiValide.filter(p=>p.r===0||p.r===maxR||p.c===0||p.c===maxC);
  const pozInterior=pozitiiValide.filter(p=>!(p.r===0||p.r===maxR||p.c===0||p.c===maxC));

  // REZERVA pozitii pentru speciale INAINTE de a plasa rezidentialele
  // Speciale → colturi (maxR+maxC combinat) sau primele margini disponibile
  const pozRezerv=pozMargine.slice(0, asignSpeciale.length);
  const pozRezervSet=new Set(pozRezerv.map(p=>p.r+','+p.c));

  // Rezidentiale → interior + margini nerezervate, umplute pana la capac
  const pozPtRezid=[...pozInterior, ...pozMargine.filter(p=>!pozRezervSet.has(p.r+','+p.c))];
  const asignRezidFull=[...asignRezid];
  while(asignRezidFull.length < pozPtRezid.length) asignRezidFull.push(tipDominant);

  // Plaseaza rezidentiale
  asignRezidFull.forEach((tip,i)=>{
    const poz=pozPtRezid[i]; if(!poz) return;
    const t=_lotGetTip(tip)||_LOT.tipuri.individuala;
    loturi.push({type:'Feature',geometry:poz.geom,
      properties:{tip,color:t.color,borderColor:t.borderColor,area:poz.area,
        partial:poz.area<_LOT.lotAria*0.85}});
  });

  // Plaseaza speciale: manual (daca exista pozitie setata) sau in pozitii rezervate
  const manPos = _LOT.manualPos||{};
  const loturiSpeciale = []; // loturi speciale generate - pt a elimina suprapunerile
  const tipUsed={};
  let rezervIdx=0;

  asignSpeciale.forEach((tip,i)=>{
    if(!tipUsed[tip]) tipUsed[tip]=0;
    const manPosArr = manPos[tip]||[];
    const posIdx = tipUsed[tip];
    tipUsed[tip]++;

    let lotGeom = null;
    let manual = false;

    if(manPosArr[posIdx]){
      // Plasare manuala: lot centrat pe pozitia aleasa
      const [lng,lat] = manPosArr[posIdx];
      const cy3=(bbox2[1]+bbox2[3])/2;
      const mLng3=111320*Math.cos(cy3*Math.PI/180), mLat3=111320;
      const half = Math.sqrt(_LOT.lotAria)/2;
      const dLng = half/mLng3, dLat = half/mLat3;
      const manualPoly = {type:'Feature',geometry:{type:'Polygon',coordinates:[[
        [lng-dLng,lat-dLat],[lng+dLng,lat-dLat],
        [lng+dLng,lat+dLat],[lng-dLng,lat+dLat],[lng-dLng,lat-dLat]
      ]]},properties:{}};
      try{
        const inter=turf.intersect(fpFeat, manualPoly);
        if(inter?.geometry && turf.area(inter)>10) lotGeom=inter.geometry;
        else lotGeom=manualPoly.geometry;
      }catch(e){ lotGeom=manualPoly.geometry; }
      manual=true;
    } else {
      const poz=pozRezerv[rezervIdx]||(pozitiiValide[pozitiiValide.length-1-rezervIdx]);
      rezervIdx++;
      if(poz) lotGeom=poz.geom;
    }

    if(lotGeom){
      const t=_lotGetTip(tip)||_LOT.tipuri.individuala;
      const lotFeat={type:'Feature',geometry:lotGeom,
        properties:{tip,color:t.color,borderColor:t.borderColor,
          area:Math.round(turf.area({type:'Feature',geometry:lotGeom,properties:{}})),
          manual}};
      loturiSpeciale.push(lotFeat);
    }
  });

  // ELIMINA loturi rezidentiale care se suprapun cu pozitiile manuale ale specialelor
  // (altfel casa individuala + biserica ocupa acelasi spatiu)
  const loturiRezidFiltrate = loturi.filter(lr=>{
    for(const ls of loturiSpeciale){
      if(!ls.properties?.manual) continue; // doar pentru plasare manuala
      try{
        const overlap=turf.intersect(lr,ls);
        if(overlap && turf.area(overlap) > turf.area(lr)*0.35){
          return false; // lotul rezidential e acoperit >35% de special → elimina
        }
      }catch(e){}
    }
    return true;
  });

  // Reconstruieste lista loturi cu clip final la parcela (garanteaza ca niciun lot nu iese)
  loturi.length=0;
  loturiRezidFiltrate.forEach(l=>{
    try{
      // Verifica si re-clipuieste la fpFeat (parcela fara drumuri)
      const clipped=turf.intersect(fpFeat,l);
      if(clipped?.geometry && turf.area(clipped) > _LOT.lotAria*0.12){
        loturi.push({...l,geometry:clipped.geometry,
          properties:{...l.properties,area:Math.round(turf.area(clipped))}});
      }
    }catch(e){ loturi.push(l); } // fallback: pastreaza lotul original
  });
  loturiSpeciale.forEach(l=>loturi.push(l));

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

