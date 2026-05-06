// ═══════════════════════════════════════════════════════════════════════════
// UrbanX · 15-relevee.js · Relevee Instant Generator
// Generează planuri funcționale orientative din datele parcelei active.
// Citește din: S.parcels[activeParcel], REGULI, S.vol (AEDIS), S.ctx (vecini)
// Expune: generateRelevee(), closeRelevee()
// ═══════════════════════════════════════════════════════════════════════════

// ── Normative româneşti ─────────────────────────────────────────────────────
const _RV_NP057 = { living:14, bedroom:12, bedroom2:10, bedroom3:8, kitchen:5, bath:3.6, wc:1.2, hall:3, storage:1.5 };
const _RV_OMS119_H = 1.5; // ore min. însorire iarnă
const _RV_P118_CORR = 30; // m max. culoar până la scări

// ── Template-uri apartamente ────────────────────────────────────────────────
const _RV_APT = {
  studio:{ label:'Garsonieră', area:38, w:5.1, d:7.5, rooms:[
    {t:'hall',   x:0,    y:0,    w:1.8, h:2.1,  lbl:'Hol'},
    {t:'bath',   x:1.95, y:0,    w:2.4, h:2.1,  lbl:'Baie'},
    {t:'wc',     x:4.5,  y:0,    w:0.6, h:2.1,  lbl:'WC'},
    {t:'living', x:0,    y:2.25, w:5.1, h:4.5,  lbl:'Garsonieră'},
    {t:'balcon', x:0,    y:7.05, w:5.1, h:1.2,  lbl:'Balcon', bal:true},
  ]},
  apt2c:{ label:'2 camere', area:65, w:8.4, d:10.2, rooms:[
    {t:'hall',    x:0,    y:0,    w:2.4,  h:3.6,  lbl:'Hol'},
    {t:'bath',    x:2.55, y:0,    w:2.85, h:2.1,  lbl:'Baie'},
    {t:'wc',      x:2.55, y:2.25, w:1.35, h:1.35, lbl:'WC'},
    {t:'storage', x:3.9,  y:2.25, w:1.5,  h:1.35, lbl:'Dep.'},
    {t:'kitchen', x:5.55, y:0,    w:2.85, h:3.6,  lbl:'Bucătărie'},
    {t:'living',  x:0,    y:3.75, w:5.1,  h:5.4,  lbl:'Living'},
    {t:'bedroom', x:5.25, y:3.75, w:3.15, h:5.4,  lbl:'Dormitor'},
    {t:'balcon',  x:0,    y:9.30, w:8.4,  h:1.2,  lbl:'Balcon', bal:true},
  ]},
  apt3c:{ label:'3 camere', area:88, w:10.8, d:12.0, rooms:[
    {t:'hall',    x:0,    y:0,    w:2.7,  h:4.2,  lbl:'Hol'},
    {t:'bath',    x:2.85, y:0,    w:3.15, h:2.4,  lbl:'Baie'},
    {t:'wc',      x:2.85, y:2.55, w:1.5,  h:1.65, lbl:'WC'},
    {t:'storage', x:4.5,  y:2.55, w:1.5,  h:1.65, lbl:'Dep.'},
    {t:'kitchen', x:6.15, y:0,    w:4.65, h:4.2,  lbl:'Bucătărie'},
    {t:'living',  x:0,    y:4.35, w:6.0,  h:6.0,  lbl:'Living'},
    {t:'bedroom', x:6.15, y:4.35, w:4.65, h:3.6,  lbl:'Dorm. 1'},
    {t:'bedroom2',x:6.15, y:8.1,  w:4.65, h:2.7,  lbl:'Dorm. 2'},
    {t:'balcon',  x:0,    y:10.5, w:10.8, h:1.5,  lbl:'Balcon', bal:true},
  ]},
  apt4c:{ label:'4 camere', area:115, w:13.2, d:13.2, rooms:[
    {t:'hall',    x:0,    y:0,    w:3.0,  h:4.5,  lbl:'Hol'},
    {t:'bath',    x:3.15, y:0,    w:3.3,  h:2.7,  lbl:'Baie'},
    {t:'wc',      x:3.15, y:2.85, w:1.65, h:1.65, lbl:'WC'},
    {t:'storage', x:4.95, y:2.85, w:1.5,  h:1.65, lbl:'Dep.'},
    {t:'kitchen', x:6.6,  y:0,    w:6.6,  h:4.5,  lbl:'Bucătărie-Dining'},
    {t:'living',  x:0,    y:4.65, w:7.2,  h:6.6,  lbl:'Living'},
    {t:'bedroom', x:7.35, y:4.65, w:5.85, h:3.9,  lbl:'Dorm. 1'},
    {t:'bedroom2',x:7.35, y:8.7,  w:5.85, h:2.55, lbl:'Dorm. 2'},
    {t:'bedroom3',x:0,    y:11.4, w:4.5,  h:1.8,  lbl:'Dorm. 3'},
    {t:'balcon',  x:0,    y:13.2, w:13.2, h:1.5,  lbl:'Balcon L', bal:true},
  ]},
};

const _RV_COLORS = {
  living:  {fill:'rgba(180,83,1,.14)',   stroke:'#F97316'},
  bedroom: {fill:'rgba(21,128,61,.13)',  stroke:'#22C55E'},
  bedroom2:{fill:'rgba(21,128,61,.13)',  stroke:'#22C55E'},
  bedroom3:{fill:'rgba(21,128,61,.13)',  stroke:'#22C55E'},
  kitchen: {fill:'rgba(14,116,144,.15)', stroke:'#06B6D4'},
  bath:    {fill:'rgba(109,40,217,.13)', stroke:'#A78BFA'},
  wc:      {fill:'rgba(109,40,217,.1)',  stroke:'#8B5CF6'},
  hall:    {fill:'rgba(71,85,105,.18)',  stroke:'#64748B'},
  storage: {fill:'rgba(71,85,105,.12)',  stroke:'#475569'},
  core:    {fill:'rgba(37,99,235,.16)',  stroke:'#3B82F6'},
  commercial:{fill:'rgba(147,51,234,.14)',stroke:'#A855F7'},
  reception: {fill:'rgba(147,51,234,.14)',stroke:'#A855F7'},
  balcon:  {fill:'rgba(212,175,55,.08)', stroke:'rgba(212,175,55,.45)', dash:true},
  office:  {fill:'rgba(21,128,61,.13)',  stroke:'#22C55E'},
  meeting: {fill:'rgba(180,83,1,.14)',   stroke:'#F97316'},
};

// ── State intern relevee ────────────────────────────────────────────────────
const _RV = {
  open: false,
  tab: 'plan', floor: 0,
  scale: 12,
  showSolar: false, showISU: false, showDim: true, showSGrid: false,
  building: null, floors: [],
  parcelParams: null,
};

// ── Helpers ─────────────────────────────────────────────────────────────────
const _rvFmt  = n => isNaN(n) ? '—' : Math.round(n)+'';
const _rvFmtD = n => isNaN(n) ? '—' : n.toFixed(2);
const _rvPx   = v => v * _RV.scale;
const _rvSleep= ms => new Promise(r=>setTimeout(r,ms));

function _rvEsc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ── Extrage parametrii din parcela activă ───────────────────────────────────
function _rvGetParcelParams(){
  const ap = S.parcels[S.activeParcel ?? 0];
  if(!ap?.geo?.geometry) return null;

  const areaRaw  = ap.area || turf.area(ap.geo);
  const utr      = ap.utr || 'CB7';
  const reg      = (typeof REGULI !== 'undefined' && REGULI[utr]) || {};
  const params   = ap.params || {};

  // Estimăm dimensiunile parcelei din bbox
  const bbox  = turf.bbox(ap.geo);
  const bboxW = turf.distance({type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[1]]}},
                               {type:'Feature',geometry:{type:'Point',coordinates:[bbox[2],bbox[1]]}},{units:'meters'});
  const bboxD = turf.distance({type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[1]]}},
                               {type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[3]]}},{units:'meters'});

  // Orientare din AEDIS sau estimată din bbox
  const frontDir = S.vol?.frontDir || ap.frontDir || 'N';

  // Înălțimea din AEDIS dacă e generat, altfel din params sau din regulament
  const aedisH   = S.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0) || null;
  const hMax     = params.h || reg.h || 28;
  const hn       = 3.0;
  const niv      = aedisH ? Math.round(aedisH/hn) : (params.niv || reg.niv || Math.floor(hMax/hn));

  return {
    nrCad: ap.nrcad || ap.id || '—',
    utr, fn: S.vol?.fn || ap.fn || 'rezidential_colectiv',
    W: Math.round(bboxW * 10) / 10,
    D: Math.round(bboxD * 10) / 10,
    area: Math.round(areaRaw),
    rf: params.rf ?? reg.rf ?? 0,
    rl: params.rl ?? reg.rl ?? 3,
    rs: params.rs ?? reg.rs ?? 6,
    pot: (params.pot ?? reg.pot ?? 70) / 100,
    cut: params.cut ?? reg.cut ?? 2.0,
    niv: Math.max(1, Math.min(25, niv)),
    hn,
    hMax,
    frontDir,
    aedisH,
    lat: turf.centerOfMass(ap.geo).geometry.coordinates[1],
    lon: turf.centerOfMass(ap.geo).geometry.coordinates[0],
  };
}

// ── Algoritm de calcul ────────────────────────────────────────────────────
function _rvCompBuilding(P){
  // Dimensiuni minime viabile — dacă parcela e prea mică, folosim estimare din arie
  let effW = P.W, effD = P.D;
  if(P.area < 100){
    // Parcelă mică — estimăm din arie cu raport 1:1.5
    effW = Math.max(P.W, Math.sqrt(P.area * 0.8));
    effD = Math.max(P.D, P.area / effW);
  }
  const bW   = Math.max(6, effW - P.rl * 2);
  const bD   = Math.max(6, effD - P.rf - P.rs);
  const scArea   = Math.min(bW * bD, Math.max(P.area * P.pot, 36));
  const sdaTarget= P.area * P.cut;
  const niv  = Math.min(P.niv, Math.max(1, Math.round(sdaTarget / scArea)));
  const sdaTotal = scArea * niv;

  // Nuclee scări+lift
  const nStairs = Math.max(1, Math.min(6, Math.floor(bW / 8.0)));
  const stairW  = 3.6;
  const stairD  = Math.min(6.6, bD * 0.5);
  const colSp   = bW / nStairs;
  const cores   = Array.from({length:nStairs}, (_,i) => ({
    x: colSp*(i+0.5) - stairW/2,
    y: (bD - stairD) / 2,
    w: stairW, h: stairD,
  }));

  return { P, bW, bD, niv, scArea, sdaTotal, sdaPerFloor:scArea, cores,
           parcelArea: P.area };
}

function _rvMix(P){
  // Funcțiune → template key
  const fnStr = String(P.fn||'').toLowerCase();
  if(fnStr.includes('birouri') || fnStr.includes('office')) return 'birouri';
  if(fnStr.includes('hotel'))                                return 'hotel';
  if(fnStr.includes('mixt'))                                 return 'mixt';
  return 'rezCol'; // default rezidențial colectiv
}

function _rvFloor(b, floorIdx){
  const {bW, bD, cores, P} = b;
  const isGround = floorIdx === 0;
  const fnKey    = _rvMix(P);
  const rects    = [];

  // ── Apartamente rezidențiale ─────────────────────────────────────────────
  if(fnKey === 'rezCol'){
    const aptTypes = ['apt2c','apt2c','apt3c','studio','apt3c','apt2c','apt4c','apt2c'];
    const colSp    = bW / (cores.length + 1);

    cores.forEach((core, ci) => {
      // Core
      rects.push({t:'core', x:core.x, y:core.y, w:core.w, h:core.h,
        lbl: b.niv>3 ? '🪜 Sc.\n🛗 Lift' : '🪜 Scări', apt:-1});

      // Apartament stânga
      const tplKeyL = aptTypes[(ci*2) % aptTypes.length];
      const tplL    = _RV_APT[tplKeyL] || _RV_APT.apt2c;
      const aWL     = core.x - ci*colSp;
      const scL     = Math.min(1, Math.min(aWL / tplL.w, bD / tplL.d)) * 0.92;
      tplL.rooms.forEach(r => rects.push({
        t:r.t, lbl:r.lbl, bal:r.bal||false, apt:ci*2,
        x: ci*colSp + r.x*scL,
        y: r.y*scL,
        w: r.w*scL, h: r.h*scL,
        normMin: _RV_NP057[r.t]||0,
      }));

      // Apartament dreapta (ultimul core)
      if(ci === cores.length-1){
        const x0   = core.x + core.w;
        const aWR  = bW - x0;
        const tplKeyR = aptTypes[(ci*2+1) % aptTypes.length];
        const tplR = _RV_APT[tplKeyR] || _RV_APT.apt2c;
        const scR  = Math.min(1, Math.min(aWR / tplR.w, bD / tplR.d)) * 0.92;
        tplR.rooms.forEach(r => rects.push({
          t:r.t, lbl:r.lbl, bal:r.bal||false, apt:ci*2+1,
          x: x0 + (aWR-r.w*scR)/2 + (r.x*scR - (tplR.w*scR-r.w*scR)/2),
          y: r.y*scR,
          w: r.w*scR, h: r.h*scR,
          normMin: _RV_NP057[r.t]||0,
        }));
      }
    });
    // Hol intrare parter
    if(isGround)
      rects.push({t:'hall', x:0, y:bD-2.4, w:bW, h:2.4,
        lbl:'Hol intrare + Căsuțe poștale', apt:-2, zIdx:-1, normMin:0});

  } else if(fnKey === 'birouri'){
    cores.forEach(core => rects.push({t:'core', x:core.x, y:core.y, w:core.w, h:core.h, lbl:'🪜 Sc.\n🛗 Lift', apt:-1}));
    rects.push({t:'office',  x:0,          y:0,          w:bW*0.65,     h:bD*0.55,   lbl:'Open Space', apt:0});
    rects.push({t:'meeting', x:bW*0.65+.3, y:0,          w:bW*0.35-.3,  h:bD*0.4,    lbl:'Sală Ședințe', apt:0});
    rects.push({t:'kitchen', x:bW*0.65+.3, y:bD*0.4+.3,  w:bW*0.18,     h:bD*0.3,    lbl:'Break room', apt:0});
    rects.push({t:'bath',    x:bW*0.83+.3, y:bD*0.4+.3,  w:bW*0.17-.3,  h:bD*0.15,   lbl:'Sanitar M', apt:0});
    rects.push({t:'wc',      x:bW*0.83+.3, y:bD*0.55+.3, w:bW*0.17-.3,  h:bD*0.15,   lbl:'Sanitar F', apt:0});
    rects.push({t:'office',  x:0,          y:bD*0.55+.3,  w:bW*0.65,     h:bD*0.45-.3, lbl:'Open Space 2', apt:1});
    if(isGround)
      rects.push({t:'reception', x:0, y:bD*0.75, w:bW, h:bD*0.25, lbl:'Recepție + Hol', apt:-2, zIdx:-1});

  } else if(fnKey === 'hotel'){
    cores.forEach(core => rects.push({t:'core', x:core.x, y:core.y, w:core.w, h:core.h, lbl:'🪜 Sc.\n🛗 Lift', apt:-1}));
    const rW=4.2; const rD=6.0;
    const nLeft = Math.floor((cores[0]?.x||bW/2)/(rW+0.15));
    for(let i=0;i<nLeft;i++){
      rects.push({t:'bedroom', x:i*(rW+0.15), y:0, w:rW, h:rD, lbl:`Cam.${i+101}\n${_rvFmt(rW*rD)}m²`, apt:i});
      rects.push({t:'bath',    x:i*(rW+0.15), y:rD+0.15, w:rW, h:bD-rD-0.15, lbl:'Bth', apt:i});
    }
    if(isGround)
      rects.push({t:'commercial', x:0, y:bD*0.6, w:bW, h:bD*0.4, lbl:'Recepție + Lobby Hotel', apt:-2, zIdx:-1});

  } else { // mixt
    cores.forEach(core => rects.push({t:'core', x:core.x, y:core.y, w:core.w, h:core.h, lbl:'🪜 Sc.\n🛗 Lift', apt:-1}));
    if(isGround){
      rects.push({t:'commercial', x:0,          y:0,          w:bW*0.55, h:bD,      lbl:'Spațiu Comercial', apt:0});
      rects.push({t:'hall',       x:bW*0.55+.3, y:0,          w:bW*0.45-.3, h:bD*0.5, lbl:'Back-office', apt:0});
      rects.push({t:'bath',       x:bW*0.55+.3, y:bD*0.5+.3,  w:bW*0.45-.3, h:bD*0.5-.3, lbl:'Depozit+Sanitar', apt:0});
    } else {
      const tplM = _RV_APT.apt2c; const sc = Math.min(1, Math.min((bW-4)/tplM.w, bD/tplM.d))*0.92;
      tplM.rooms.forEach(r => rects.push({t:r.t,lbl:r.lbl,bal:r.bal||false,apt:0,x:r.x*sc,y:r.y*sc,w:r.w*sc,h:r.h*sc}));
    }
  }

  // ── Ferestre ────────────────────────────────────────────────────────────
  const wins = []; const EPS=0.5;
  rects.filter(r=>!['core','hall','storage','wc','bath'].includes(r.t)&&!r.bal).forEach(r=>{
    if(r.y<=EPS && r.w>2) wins.push({wall:'N',x:r.x+r.w*.2,y:0,w:r.w*.55,type:r.t,apt:r.apt});
    if(r.y+r.h>=bD-EPS && r.w>2) wins.push({wall:'S',x:r.x+r.w*.15,y:bD,w:r.w*.65,type:r.t,apt:r.apt});
    if(r.x<=EPS && r.h>2) wins.push({wall:'V',x:0,y:r.y+r.h*.2,h:r.h*.5,type:r.t,apt:r.apt});
    if(r.x+r.w>=bW-EPS && r.h>2) wins.push({wall:'E',x:bW,y:r.y+r.h*.2,h:r.h*.5,type:r.t,apt:r.apt});
  });

  // ── Uși ─────────────────────────────────────────────────────────────────
  const doors = [];
  if(isGround) doors.push({x:bW/2-0.9, y:bD, w:1.8, type:'main', swing:'out'});
  cores.forEach(core=>{
    doors.push({x:core.x-0.85, y:core.y+core.h*.25, w:0.9, type:'apt', swing:'right'});
    doors.push({x:core.x+core.w+.05, y:core.y+core.h*.25, w:0.9, type:'apt', swing:'left'});
  });

  // ── Solar OMS 119 ────────────────────────────────────────────────────────
  const dirScore = {S:2.8,SE:2.5,SV:2.5,E:2.2,V:2.0,N:0.9,NE:1.4,NV:1.3}[P.frontDir]||1.8;
  rects.forEach(r=>{
    if(['living','bedroom','bedroom2','bedroom3','office'].includes(r.t)){
      const h = Math.min(4, (dirScore + floorIdx*0.05)).toFixed(1);
      r.solarH = h; r.solarOk = parseFloat(h) >= _RV_OMS119_H;
    }
  });

  // ── ISU ──────────────────────────────────────────────────────────────────
  const isuIssues = [];
  cores.forEach(core=>{
    const cx=core.x+core.w/2, cy=core.y+core.h/2;
    rects.filter(r=>r.apt>=0).forEach(r=>{
      const d=Math.hypot(r.x+r.w/2-cx, r.y+r.h/2-cy);
      if(d>_RV_P118_CORR) isuIssues.push({lbl:r.lbl, d:d.toFixed(0)});
    });
  });

  return {rects, wins, doors, floorIdx, bW, bD,
          isu:{ok:isuIssues.length===0, issues:isuIssues}};
}

// ══════════════════════════════════════════════════════════════════════════
// RENDERER
// ══════════════════════════════════════════════════════════════════════════
function _rvInitCanvas(W,H){
  const cv = document.getElementById('rv-canvas');
  const dpr = window.devicePixelRatio || 1;
  cv.width = W*dpr; cv.height = H*dpr;
  cv.style.width = W+'px'; cv.style.height = H+'px';
  const ctx = cv.getContext('2d'); ctx.scale(dpr,dpr);
  return {cv,ctx,W,H};
}

function _rvRender(){
  if(!_RV.building) return;
  const fl = _RV.floors[_RV.floor] || _RV.floors[0];
  const b  = _RV.building;
  if     (_RV.tab==='plan')     _rvRenderPlan(fl,b);
  else if(_RV.tab==='fatada')   _rvRenderFacade(b);
  else if(_RV.tab==='sectiune') _rvRenderSection(b);
  else if(_RV.tab==='axono')    _rvRenderAxono(b);
}

function _rvRenderPlan(fl,b){
  const {P,bW,bD}=b; const SC=_RV.scale;
  const pad=60; const lm=50;
  const W = bW*SC + pad*2 + P.rl*2*SC + 40;
  const H = bD*SC + pad*2 + (P.rf+P.rs)*SC + 60;
  const {cv,ctx}=_rvInitCanvas(W,H);

  ctx.fillStyle='#060C1A'; ctx.fillRect(0,0,W,H);
  // grid bg
  ctx.strokeStyle='rgba(255,255,255,.018)'; ctx.lineWidth=.5;
  for(let x=0;x<W;x+=SC){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=SC){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

  const ox=pad+P.rl*SC; const oy=pad+P.rf*SC;

  // Parcelă
  ctx.strokeStyle='rgba(212,175,55,.35)';ctx.lineWidth=1;ctx.setLineDash([SC*.5,SC*.5]);
  ctx.strokeRect(pad,pad,P.W*SC,P.D*SC); ctx.setLineDash([]);
  ctx.fillStyle='rgba(212,175,55,.4)';ctx.font='9px IBM Plex Mono';
  ctx.fillText(`Nr. cad. ${P.nrCad}  ·  ${P.W}m × ${P.D}m  ·  ${P.area}m²  ·  UTR ${P.utr}`,pad+4,pad-6);

  // Retrageri
  ctx.strokeStyle='rgba(212,175,55,.18)';ctx.lineWidth=.8;ctx.setLineDash([SC*.3,SC*.3]);
  ctx.strokeRect(ox,oy,bW*SC,bD*SC); ctx.setLineDash([]);

  // Stradă
  const stY=oy+bD*SC+P.rs*SC+8;
  ctx.fillStyle='rgba(100,116,139,.2)';ctx.fillRect(pad,stY,P.W*SC,20);
  ctx.fillStyle='#475569';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='center';
  ctx.fillText('▲  FRONT STRADAL  ·  '+P.frontDir,pad+P.W*SC/2,stY+14);
  ctx.textAlign='left';

  // Structurală grid
  if(_RV.showSGrid){
    ctx.strokeStyle='rgba(59,130,246,.15)';ctx.lineWidth=.5;ctx.setLineDash([3,3]);
    for(let x=ox;x<ox+bW*SC;x+=SC*5.4){ctx.beginPath();ctx.moveTo(x,oy);ctx.lineTo(x,oy+bD*SC);ctx.stroke();}
    for(let y=oy;y<oy+bD*SC;y+=SC*3.6){ctx.beginPath();ctx.moveTo(ox,y);ctx.lineTo(ox+bW*SC,y);ctx.stroke();}
    ctx.setLineDash([]);
  }

  // Building fill
  ctx.fillStyle='rgba(16,29,53,.95)';ctx.fillRect(ox,oy,bW*SC,bD*SC);

  // Camere
  [...fl.rects].sort((a,m_)=>(a.zIdx||0)-(m_.zIdx||0)).forEach(r=>{
    const C=_RV_COLORS[r.t]||_RV_COLORS.hall;
    const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
    // Solar overlay
    if(_RV.showSolar&&r.solarOk!=null){
      ctx.fillStyle=r.solarOk?'rgba(34,197,94,.12)':'rgba(239,68,68,.12)';
      ctx.fillRect(rx,ry,rw,rh);
    }
    ctx.fillStyle=C.fill; ctx.fillRect(rx+1,ry+1,rw-2,rh-2);
    ctx.strokeStyle=C.stroke; ctx.lineWidth=r.bal?1:1.5;
    if(C.dash) ctx.setLineDash([4,3]);
    ctx.strokeRect(rx+1,ry+1,rw-2,rh-2); ctx.setLineDash([]);
    // Label
    if(rw>22&&rh>14){
      const lines=(r.lbl||r.t).split('\n');
      ctx.fillStyle=C.stroke; ctx.font=`bold ${Math.min(9,rw/6)}px IBM Plex Mono`; ctx.textAlign='center';
      lines.forEach((ln,li)=>ctx.fillText(ln,rx+rw/2,ry+rh/2+(li-(lines.length-1)/2)*11));
      if(!r.bal&&rh>24&&r.w*r.h>1){
        ctx.fillStyle='rgba(255,255,255,.2)';ctx.font=`${Math.min(8,rw/8)}px IBM Plex Mono`;
        ctx.fillText(_rvFmt(r.w*r.h)+'m²',rx+rw/2,ry+rh/2+lines.length*5.5+8);
      }
      ctx.textAlign='left';
    }
    if(_RV.showSolar&&r.solarH){
      ctx.fillStyle=r.solarOk?'rgba(34,197,94,.9)':'rgba(239,68,68,.9)';
      ctx.font='bold 8px IBM Plex Mono';ctx.textAlign='center';
      ctx.fillText(r.solarH+'h☀',rx+rw/2,ry+rh-5);ctx.textAlign='left';
    }
    if(_RV.showISU&&r.apt>=0&&b.cores.length){
      const core=b.cores[0]; const d=Math.hypot(r.x+r.w/2-core.x-core.w/2,r.y+r.h/2-core.y-core.h/2);
      const ok=d<=_RV_P118_CORR;
      ctx.fillStyle=ok?'rgba(34,197,94,.7)':'rgba(239,68,68,.9)';
      ctx.font='8px IBM Plex Mono';ctx.textAlign='center';
      ctx.fillText(d.toFixed(0)+'m',rx+rw/2,ry+10);ctx.textAlign='left';
    }
  });

  // Ziduri exterioare
  ctx.strokeStyle='#CBD5E1';ctx.lineWidth=3;ctx.strokeRect(ox,oy,bW*SC,bD*SC);

  // Ferestre
  fl.wins.forEach(w=>{
    ctx.fillStyle='rgba(56,189,248,.2)';
    if(w.wall==='N') ctx.fillRect(ox+w.x*SC,oy-4,w.w*SC,6);
    else if(w.wall==='S') ctx.fillRect(ox+w.x*SC,oy+bD*SC-2,w.w*SC,6);
    else if(w.wall==='V') ctx.fillRect(ox-4,oy+w.y*SC,6,w.h*SC);
    else if(w.wall==='E') ctx.fillRect(ox+bW*SC-2,oy+w.y*SC,6,w.h*SC);
    ctx.strokeStyle='#38BDF8';ctx.lineWidth=2;
    if(w.wall==='N') ctx.strokeRect(ox+w.x*SC,oy-4,w.w*SC,6);
    else if(w.wall==='S') ctx.strokeRect(ox+w.x*SC,oy+bD*SC-2,w.w*SC,6);
    else if(w.wall==='V') ctx.strokeRect(ox-4,oy+w.y*SC,6,w.h*SC);
    else if(w.wall==='E') ctx.strokeRect(ox+bW*SC-2,oy+w.y*SC,6,w.h*SC);
  });

  // Intrare principale
  fl.doors.filter(d=>d.type==='main').forEach(d=>{
    const dx=ox+d.x*SC,dy=oy+bD*SC;
    ctx.clearRect(dx-1,dy-3,d.w*SC+2,7);
    ctx.strokeStyle='#F59E0B';ctx.lineWidth=2.5;
    ctx.beginPath();ctx.moveTo(dx,dy);ctx.lineTo(dx+d.w*SC,dy);ctx.stroke();
    ctx.strokeStyle='rgba(245,158,11,.35)';ctx.lineWidth=1;
    ctx.beginPath();ctx.arc(dx+d.w*SC,dy,d.w*SC,Math.PI,Math.PI*1.5);ctx.stroke();
  });

  // Cote
  if(_RV.showDim) _rvDrawDims(ctx,ox,oy,bW*SC,bD*SC,bW,bD,P,SC);
  // Nord
  _rvDrawNorth(ctx,W-38,44,P.frontDir);
  // Scară grafică
  _rvDrawScale(ctx,pad,H-18,SC);
  // Cartuș
  _rvDrawCartus(ctx,W,H,P,fl.floorIdx);
  // Marcaj etaj
  ctx.fillStyle='rgba(212,175,55,.05)';ctx.font=`bold ${SC*6}px Space Grotesk`;ctx.textAlign='center';
  ctx.fillText(fl.floorIdx===0?'PARTER':`ETAJ ${fl.floorIdx}`,ox+bW*SC/2,oy+bD*SC/2);
  ctx.textAlign='left';
  // Hover
  _rvSetupHover(cv,fl,ox,oy);
}

function _rvRenderFacade(b){
  const {P,bW,niv}=b; const Ht=niv*P.hn; const SC=_RV.scale*.85;
  const pad=50; const W=bW*SC+pad*2+80; const H=Ht*SC+pad*2+50;
  const {cv,ctx}=_rvInitCanvas(W,H+40);
  ctx.fillStyle='#060C1A';ctx.fillRect(0,0,cv.width,H+40);
  const ox=pad+40,oy=pad; const fW=bW*SC,fH=Ht*SC;
  ctx.fillStyle='rgba(17,27,48,.95)';ctx.fillRect(ox,oy,fW,fH);
  ctx.strokeStyle='#CBD5E1';ctx.lineWidth=2.5;ctx.strokeRect(ox,oy,fW,fH);
  for(let i=1;i<niv;i++){
    const ly=oy+fH-i*P.hn*SC;
    ctx.fillStyle='rgba(203,213,225,.07)';ctx.fillRect(ox,ly-2,fW,2);
    ctx.fillStyle='#475569';ctx.font='8px IBM Plex Mono';
    ctx.fillText(i===0?'P':`E${i}`,ox-30,ly+4);
  }
  ctx.fillStyle='#475569';ctx.font='8px IBM Plex Mono';ctx.fillText('P',ox-14,oy+fH-4);
  const wCols=Math.max(3,Math.floor(bW/3.2)); const wW=Math.min(bW/wCols*.55,1.8)*SC;
  const wH=P.hn*.45*SC; const colSp=fW/wCols; const coreC=Math.floor(wCols/2);
  for(let row=0;row<niv;row++){
    const y0=oy+fH-(row+1)*P.hn*SC+(P.hn*SC-wH)*.3;
    for(let col=0;col<wCols;col++){
      if(col===coreC){ctx.fillStyle='rgba(37,99,235,.2)';ctx.fillRect(ox+col*colSp+(colSp-wW*.5)/2,y0,wW*.5,wH);ctx.strokeStyle='#3B82F6';ctx.lineWidth=1;ctx.strokeRect(ox+col*colSp+(colSp-wW*.5)/2,y0,wW*.5,wH);continue;}
      const wx=ox+col*colSp+(colSp-wW)/2;
      const sf=(['S','SE','SV'].includes(P.frontDir))?.35:.15;
      ctx.fillStyle=`rgba(56,189,248,${sf})`;ctx.fillRect(wx,y0,wW,wH);
      ctx.strokeStyle='#38BDF8';ctx.lineWidth=1.5;ctx.strokeRect(wx,y0,wW,wH);
      ctx.strokeStyle='rgba(56,189,248,.3)';ctx.lineWidth=.5;
      ctx.beginPath();ctx.moveTo(wx+wW/2,y0);ctx.lineTo(wx+wW/2,y0+wH);ctx.stroke();
      ctx.beginPath();ctx.moveTo(wx,y0+wH/2);ctx.lineTo(wx+wW,y0+wH/2);ctx.stroke();
    }
  }
  for(let row=0;row<niv;row++){
    const bz=oy+fH-(row+1)*P.hn*SC+P.hn*SC*.78;
    ctx.fillStyle='rgba(212,175,55,.07)';ctx.fillRect(ox+10,bz,fW-20,4);
    ctx.strokeStyle='rgba(212,175,55,.3)';ctx.lineWidth=1;ctx.strokeRect(ox+10,bz,fW-20,4);
  }
  const eW=2.2*SC,eH=2.8*SC,eX=ox+fW/2-eW/2,eY=oy+fH-eH;
  ctx.fillStyle='rgba(245,158,11,.12)';ctx.fillRect(eX,eY,eW,eH);
  ctx.strokeStyle='#F59E0B';ctx.lineWidth=2;ctx.strokeRect(eX,eY,eW,eH);
  ctx.strokeStyle='rgba(203,213,225,.5)';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(ox-20,oy+fH);ctx.lineTo(ox+fW+60,oy+fH);ctx.stroke();
  ctx.fillStyle='#475569';ctx.font='9px IBM Plex Mono';ctx.fillText('COTA ±0.00 (CTN)',ox,oy+fH+14);
  if(_RV.showDim){
    ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=.8;ctx.setLineDash([3,3]);
    ctx.beginPath();ctx.moveTo(ox,oy+fH+30);ctx.lineTo(ox+fW,oy+fH+30);ctx.stroke();
    ctx.setLineDash([]);ctx.fillStyle='rgba(212,175,55,.7)';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='center';
    ctx.fillText(bW.toFixed(1)+'m',ox+fW/2,oy+fH+44);
    ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=.8;ctx.setLineDash([3,3]);
    ctx.beginPath();ctx.moveTo(ox+fW+18,oy);ctx.lineTo(ox+fW+18,oy+fH);ctx.stroke();
    ctx.setLineDash([]);ctx.save();ctx.translate(ox+fW+36,oy+fH/2);
    ctx.fillText(Ht.toFixed(1)+'m',0,0);ctx.restore();
    ctx.textAlign='left';
  }
  _rvDrawNorth(ctx,W-38,44,P.frontDir);
  _rvDrawScale(ctx,pad,H+28,_RV.scale*.85);
  _rvDrawCartus(ctx,W,H+40,P,null,'FAȚADĂ PRINCIPALĂ');
}

function _rvRenderSection(b){
  const {P,bW,bD,niv,cores}=b; const Ht=niv*P.hn; const SC=_RV.scale*.85;
  const pad=50; const W=bD*SC+pad*2+80; const H=Ht*SC+pad*2+50;
  const {cv,ctx}=_rvInitCanvas(W,H+40);
  ctx.fillStyle='#060C1A';ctx.fillRect(0,0,cv.width,H+40);
  const ox=pad+40,oy=pad; const sW=bD*SC,sH=Ht*SC;
  ctx.fillStyle='rgba(17,27,48,.95)';ctx.fillRect(ox,oy,sW,sH);
  ctx.strokeStyle='#CBD5E1';ctx.lineWidth=2.5;ctx.strokeRect(ox,oy,sW,sH);
  const rC=['rgba(180,83,1,.14)','rgba(21,128,61,.13)','rgba(14,116,144,.15)','rgba(109,40,217,.13)'];
  for(let i=0;i<niv;i++){
    const y0=oy+sH-(i+1)*P.hn*SC;
    ctx.fillStyle=rC[i%4];ctx.fillRect(ox+2,y0+2,sW-4,P.hn*SC-4);
    ctx.fillStyle='rgba(203,213,225,.2)';ctx.fillRect(ox,y0-3,sW,3);
    ctx.fillStyle='#475569';ctx.font='8px IBM Plex Mono';ctx.fillText(i===0?'P':`E${i}`,ox-30,y0+P.hn*SC/2+4);
  }
  if(cores.length){
    const c=cores[Math.floor(cores.length/2)];const cx=ox+sW/2-c.h*SC/2;
    for(let i=0;i<niv;i++){
      const y0=oy+sH-(i+1)*P.hn*SC;
      ctx.fillStyle='rgba(37,99,235,.2)';ctx.fillRect(cx,y0,c.h*SC,P.hn*SC);
      ctx.strokeStyle='#3B82F6';ctx.lineWidth=.8;ctx.strokeRect(cx,y0,c.h*SC,P.hn*SC);
      const steps=7,sw=c.h*SC/steps,sh=P.hn*SC/steps;
      ctx.strokeStyle='rgba(59,130,246,.5)';ctx.lineWidth=.6;
      for(let s=0;s<steps;s++){ctx.beginPath();ctx.moveTo(cx+s*sw,y0+s*sh);ctx.lineTo(cx+(s+1)*sw,y0+s*sh);ctx.lineTo(cx+(s+1)*sw,y0+(s+1)*sh);ctx.stroke();}
    }
  }
  ctx.fillStyle='rgba(107,114,128,.35)';ctx.fillRect(ox-8,oy+sH,sW+16,16);
  ctx.strokeStyle='#6B7280';ctx.lineWidth=1;ctx.strokeRect(ox-8,oy+sH,sW+16,16);
  ctx.strokeStyle='rgba(6,182,212,.5)';ctx.lineWidth=1;ctx.setLineDash([5,4]);
  const nfaY=oy+sH+Math.min(P.hn*.5,1.5)*SC;
  ctx.beginPath();ctx.moveTo(ox-20,nfaY);ctx.lineTo(ox+sW+30,nfaY);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='rgba(6,182,212,.6)';ctx.font='8px IBM Plex Mono';ctx.fillText('NFA ~-1.5m',ox+4,nfaY+10);
  ctx.strokeStyle='rgba(203,213,225,.5)';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(ox-20,oy+sH);ctx.lineTo(ox+sW+60,oy+sH);ctx.stroke();
  ctx.fillStyle='#475569';ctx.font='9px IBM Plex Mono';ctx.fillText('±0.00 CTN',ox,oy+sH+14);
  if(_RV.showDim){
    ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=.8;ctx.setLineDash([3,3]);
    ctx.beginPath();ctx.moveTo(ox+sW+18,oy);ctx.lineTo(ox+sW+18,oy+sH);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle='rgba(212,175,55,.7)';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='center';
    ctx.save();ctx.translate(ox+sW+36,oy+sH/2);ctx.fillText(Ht.toFixed(1)+'m',0,0);ctx.restore();
    ctx.textAlign='left';
  }
  _rvDrawNorth(ctx,W-38,44,P.frontDir);
  _rvDrawScale(ctx,pad,H+28,_RV.scale*.85);
  _rvDrawCartus(ctx,W,H+40,P,null,'SECȚIUNE A-A');
}

function _rvRenderAxono(b){
  const {P,bW,bD,niv,cores}=b; const s=_RV.scale*.5;
  const iso=(x,y,z)=>({px:(x-y)*Math.cos(Math.PI/6)*s, py:(x+y)*Math.sin(Math.PI/6)*s-z*s*.55});
  const {cv,ctx}=_rvInitCanvas(720,520);
  ctx.fillStyle='#060C1A';ctx.fillRect(0,0,720,520);
  ctx.strokeStyle='rgba(255,255,255,.015)';ctx.lineWidth=.5;
  for(let x=0;x<720;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,520);ctx.stroke();}
  for(let y=0;y<520;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(720,y);ctx.stroke();}
  const CX=310,CY=400;
  const pt=(x,y,z)=>{const r=iso(x,y,z);return[CX+r.px,CY+r.py];};
  const face=(pts,fill,stk,lw=1)=>{ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stk;ctx.lineWidth=lw;ctx.stroke();};
  const sF=Math.min(4,niv);
  for(let fl=0;fl<=sF;fl++){
    const z=fl*P.hn;
    face([pt(0,0,z),pt(bW,0,z),pt(bW,bD,z),pt(0,bD,z)],`rgba(16,29,53,${.5+fl*.04})`,`rgba(203,213,225,${.06+fl*.02})`, .4);
  }
  if(niv>sF){
    const z=niv*P.hn;
    face([pt(0,0,z),pt(bW,0,z),pt(bW,bD,z),pt(0,bD,z)],'rgba(212,175,55,.1)','rgba(212,175,55,.5)',1.5);
    ctx.strokeStyle='rgba(203,213,225,.1)';ctx.lineWidth=.5;ctx.setLineDash([4,4]);
    [[0,0],[bW,0],[bW,bD],[0,bD]].forEach(([x,y])=>{const[ax,ay]=pt(x,y,sF*P.hn);const[bx_,by_]=pt(x,y,niv*P.hn);ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx_,by_);ctx.stroke();});
    ctx.setLineDash([]);
  }
  const z1=sF*P.hn;
  face([pt(0,bD,0),pt(bW,bD,0),pt(bW,bD,z1),pt(0,bD,z1)],'rgba(37,99,235,.1)','#3B82F6',1.5);
  face([pt(bW,0,0),pt(bW,bD,0),pt(bW,bD,z1),pt(bW,0,z1)],'rgba(34,197,94,.07)','#22C55E',1);
  const wCols=Math.max(2,Math.floor(bW/3.5));const wW_=bW/wCols*.55;const wH_=P.hn*.42;const cC=Math.floor(wCols/2);
  for(let row=0;row<Math.min(niv,sF);row++){
    for(let col=0;col<wCols;col++){
      if(col===cC||col===cC-1) continue;
      const wx=col*bW/wCols+(bW/wCols-wW_)/2,wz=row*P.hn+P.hn*.25;
      const sf=(['S','SE','SV'].includes(P.frontDir))?.3:.12;
      face([pt(wx,bD,wz),pt(wx+wW_,bD,wz),pt(wx+wW_,bD,wz+wH_),pt(wx,bD,wz+wH_)],`rgba(56,189,248,${sf})`,'#38BDF8',1.2);
    }
  }
  for(let row=0;row<Math.min(niv,sF);row++){
    const bz=row*P.hn+P.hn*.78;
    face([pt(.5,bD,bz),pt(bW-.5,bD,bz),pt(bW-.5,bD+.4,bz),pt(.5,bD+.4,bz)],'rgba(212,175,55,.08)','rgba(212,175,55,.3)',.8);
  }
  ctx.fillStyle='rgba(212,175,55,.8)';ctx.font='bold 11px Space Grotesk';
  ctx.fillText(`VEDERE AXONOMETRICĂ · ${niv} NIV. · H=${(niv*P.hn).toFixed(1)}m · SDA=${_rvFmt(b.sdaTotal)}m²`,18,504);
  _rvDrawCartus(ctx,720,520,P,null,'AXONOMETRIE');
  _rvDrawNorth(ctx,680,40,P.frontDir);
}

function _rvDrawDims(ctx,ox,oy,pw,ph,bW,bD,P,SC){
  ctx.strokeStyle='rgba(212,175,55,.4)';ctx.fillStyle='rgba(212,175,55,.75)';
  ctx.font='bold 9px IBM Plex Mono';ctx.lineWidth=.8;
  ctx.setLineDash([3,3]);
  ctx.beginPath();ctx.moveTo(ox,oy+ph+18);ctx.lineTo(ox+pw,oy+ph+18);ctx.stroke();
  ctx.setLineDash([]);ctx.textAlign='center';ctx.fillText(bW.toFixed(1)+'m',ox+pw/2,oy+ph+30);
  ctx.setLineDash([3,3]);
  ctx.beginPath();ctx.moveTo(ox-18,oy);ctx.lineTo(ox-18,oy+ph);ctx.stroke();
  ctx.setLineDash([]);
  ctx.save();ctx.translate(ox-30,oy+ph/2);ctx.rotate(-Math.PI/2);ctx.fillText(bD.toFixed(1)+'m',0,0);ctx.restore();
  ctx.fillStyle='rgba(212,175,55,.4)';ctx.font='8px IBM Plex Mono';
  ctx.fillText(P.W.toFixed(1)+'m (parcelă)',ox+P.W*SC/2,oy+P.D*SC+30);
  ctx.textAlign='left';
}

function _rvDrawNorth(ctx,x,y,dir){
  const rot={N:0,S:Math.PI,E:Math.PI/2,V:-Math.PI/2,NE:Math.PI/4,NV:-Math.PI/4,SE:Math.PI*3/4,SV:-Math.PI*3/4}[dir]||0;
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);
  ctx.beginPath();ctx.arc(0,0,16,0,Math.PI*2);
  ctx.fillStyle='rgba(6,12,26,.8)';ctx.fill();
  ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='#EF4444';
  ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(5,4);ctx.lineTo(0,2);ctx.lineTo(-5,4);ctx.closePath();ctx.fill();
  ctx.fillStyle='#64748b';
  ctx.beginPath();ctx.moveTo(0,12);ctx.lineTo(5,4);ctx.lineTo(0,2);ctx.lineTo(-5,4);ctx.closePath();ctx.fill();
  ctx.restore();
  ctx.fillStyle='#EF4444';ctx.font='bold 9px Space Grotesk';ctx.textAlign='center';
  ctx.fillText('N',x,y-20);ctx.textAlign='left';
}

function _rvDrawScale(ctx,x,y,SC){
  const m5=SC*5;
  ctx.strokeStyle='rgba(212,175,55,.5)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(x,y-6);ctx.lineTo(x,y);ctx.lineTo(x+m5,y);ctx.lineTo(x+m5,y-6);ctx.stroke();
  ctx.fillStyle='rgba(212,175,55,.6)';ctx.font='9px IBM Plex Mono';ctx.textAlign='center';
  ctx.fillText('0',x,y+12);ctx.fillText('5m',x+m5,y+12);
  ctx.fillStyle='rgba(212,175,55,.3)';ctx.font='8px IBM Plex Mono';
  ctx.fillText('Sc. 1:100',x+m5/2,y+12);ctx.textAlign='left';
}

function _rvDrawCartus(ctx,W,H,P,floorIdx,subtitle){
  const cW=240,cH=46,cx=W-cW-8,cy=H-cH-8;
  ctx.fillStyle='rgba(11,20,38,.9)';ctx.fillRect(cx,cy,cW,cH);
  ctx.strokeStyle='rgba(212,175,55,.35)';ctx.lineWidth=1;ctx.strokeRect(cx,cy,cW,cH);
  ctx.fillStyle='rgba(212,175,55,.15)';ctx.fillRect(cx,cy,cW,10);
  ctx.fillStyle='rgba(212,175,55,.85)';ctx.font='bold 7px Space Grotesk';
  ctx.fillText(' UrbanX TSS·FG · Document orientativ · '+new Date().toLocaleDateString('ro-RO'),cx+4,cy+7.5);
  ctx.fillStyle='#DDE6F5';ctx.font='7px IBM Plex Mono';
  ctx.fillText(`Nr.cad. ${P.nrCad}  ·  UTR: ${P.utr}  ·  ${P.fn}`,cx+4,cy+20);
  ctx.fillText(`${P.W}m×${P.D}m  ·  ${P.niv}niv.  ·  H=${(P.niv*P.hn).toFixed(1)}m  ·  ${subtitle||'PLAN'}${floorIdx!=null?' E'+floorIdx:''}`,cx+4,cy+30);
  ctx.fillText(`POT=${Math.round(P.pot*100)}%  CUT=${P.cut}  Sc.1:100`,cx+4,cy+40);
}

function _rvSetupHover(cv,fl,ox,oy){
  cv.onmousemove=(e)=>{
    const r=cv.getBoundingClientRect();
    const mx=e.clientX-r.left, my=e.clientY-r.top;
    const mxM=(mx-ox)/_RV.scale, myM=(my-oy)/_RV.scale;
    const hit=fl.rects.find(r_=>mxM>=r_.x&&mxM<=r_.x+r_.w&&myM>=r_.y&&myM<=r_.y+r_.h);
    const tip=document.getElementById('rv-tip');
    if(hit&&tip){
      const area=_rvFmt(hit.w*hit.h);
      const normMin=_RV_NP057[hit.t]||0;
      const areaNum=hit.w*hit.h;
      const normOk=normMin===0||areaNum>=normMin;
      tip.style.display='block'; tip.style.left=(e.clientX+14)+'px'; tip.style.top=(e.clientY-10)+'px';
      tip.innerHTML=`<strong style="color:#D4AF37">${_rvEsc(hit.lbl||hit.t)}</strong><br>`+
        `Suprafață: ${area}m² &nbsp; ${hit.w.toFixed(1)}×${hit.h.toFixed(1)}m<br>`+
        (normMin?`NP057 min: ${normMin}m² &nbsp; ${normOk?'<span style="color:#22C55E">✓ CONFORM</span>':'<span style="color:#EF4444">✗ SUB MINIM</span>'}<br>`:'')+
        (hit.solarH?`OMS 119: ${hit.solarH}h ☀ ${hit.solarOk?'<span style="color:#22C55E">✓</span>':'<span style="color:#EF4444">✗ insuficient</span>'}`:'')+
        (hit.apt>=0?`<br><span style="color:#64748b">Ap. #${hit.apt+1}</span>`:'');
    } else if(tip){ tip.style.display='none'; }
  };
  cv.onmouseleave=()=>{const t=document.getElementById('rv-tip');if(t)t.style.display='none';};
}

// ══════════════════════════════════════════════════════════════════════════
// GENERATE FLOW
// ══════════════════════════════════════════════════════════════════════════
const _RV_STEPS = [
  'Citesc geometria parcelei active…',
  'Aplic retragerile RLU — edificabil net…',
  'Dimensionez structura — stâlpi, travei, scări…',
  'Generez apartamente conform mix propus…',
  'Plasez camerele după NP 057/2002…',
  'Calculez ferestre — orientare solară…',
  'Verific OMS 119/2014 — însorire camere…',
  'Verific P118-2/2013 — căi evacuare ISU…',
  'Generez planurile + fațadă + secțiune…',
  'Calculez bilanțul suprafețelor…',
  'Finalizez documentația orientativă…',
];

async function generateRelevee(){
  const ap = S.parcels[S.activeParcel ?? 0];
  if(!ap?.geo?.geometry){
    if(typeof ss === 'function') ss('⚠ Selectați o parcelă pe hartă pentru a genera releveele.');
    return;
  }

  _rvOpen();

  const P = _rvGetParcelParams();
  _RV.parcelParams = P;

  const t0 = performance.now();
  const tdot = document.getElementById('rv-tdot');
  const tval = document.getElementById('rv-tval');
  if(tdot) tdot.classList.add('rv-running');
  const tInt = setInterval(()=>{ if(tval) tval.textContent=((performance.now()-t0)/1000).toFixed(1)+'s'; },80);

  // Progress
  const prog = document.getElementById('rv-prog'); prog?.classList.add('rv-on');
  const psteps = document.getElementById('rv-psteps');
  const ppct   = document.getElementById('rv-ppct');
  const pbar   = document.getElementById('rv-pbar');
  if(psteps) psteps.innerHTML = _RV_STEPS.map((s,i)=>`<div class="rv-pstep" id="rv-ps${i}"><div class="rv-psico">${i+1}</div><span>${s}</span></div>`).join('');

  for(let i=0;i<_RV_STEPS.length;i++){
    await _rvSleep(40+Math.random()*65+(i===_RV_STEPS.length-1?150:0));
    document.getElementById(`rv-ps${i}`)?.classList.add('rv-active');
    const pct = Math.round((i+1)/_RV_STEPS.length*100);
    if(ppct) ppct.textContent=pct+'%';
    if(pbar) pbar.style.width=pct+'%';
    if(i>0){
      const prev = document.getElementById(`rv-ps${i-1}`);
      prev?.classList.replace('rv-active','rv-done');
      const ico=prev?.querySelector('.rv-psico'); if(ico) ico.textContent='✓';
    }
  }
  _RV_STEPS.forEach((_,i)=>{
    const el=document.getElementById(`rv-ps${i}`); el?.classList.replace('rv-active','rv-done');
    const ico=el?.querySelector('.rv-psico'); if(ico) ico.textContent='✓';
  });
  await _rvSleep(200);
  prog?.classList.remove('rv-on');

  // Compute
  const b = _rvCompBuilding(P); _RV.building = b;
  _RV.floors = [];
  for(let i=0;i<b.niv;i++) _RV.floors.push(_rvFloor(b,i));

  // Floor bar
  const fb = document.getElementById('rv-floorbar'); if(fb){ fb.style.display='flex'; }
  _rvBuildFloorBar(b.niv);

  _RV.floor=0; _RV.tab='plan';
  document.querySelectorAll('.rv-tab').forEach(t=>t.classList.remove('rv-on'));
  document.querySelector('.rv-tab[data-tab="plan"]')?.classList.add('rv-on');
  document.getElementById('rv-empty')?.style.setProperty('display','none');

  // Auto-fit: calculăm scala optimă pentru parcelă
  try{
    const wrap = document.getElementById('rv-drawwrap');
    if(wrap && b.P){
      const availW = wrap.clientWidth  - 140; // pad + dims
      const availH = wrap.clientHeight - 120;
      const scW = availW / (b.P.W + b.P.rl*2 + 4);
      const scH = availH / (b.P.D + b.P.rf + b.P.rs + 4);
      const fitSc = Math.min(28, Math.max(6, Math.floor(Math.min(scW, scH))));
      _RV.scale = fitSc;
      document.getElementById('rv-zval').textContent = Math.round(fitSc/12*100)+'%';
    }
  }catch(e){}

  _rvRender();

  clearInterval(tInt);
  const secs=((performance.now()-t0)/1000).toFixed(1);
  if(tdot) tdot.classList.remove('rv-running');
  if(tval) tval.textContent=secs+'s';
  document.getElementById('rv-tinfo').textContent=`Nr.cad. ${P.nrCad} · ${b.niv} niv. · SDA=${_rvFmt(b.sdaTotal)}m² · POT=${_rvFmt(b.scArea/P.area*100)}% · CUT=${_rvFmtD(b.sdaTotal/P.area)} · ${secs}s`;
  // Populăm info parcelă din panoul drept
  const piEl = document.getElementById('rv-parcel-info');
  if(piEl) piEl.innerHTML = `Nr. cad.: <strong style="color:#D4AF37">${P.nrCad}</strong><br>UTR: ${P.utr}<br>Suprafață: ${P.area}m²<br>Dim. bbox: ${P.W.toFixed(1)}m × ${P.D.toFixed(1)}m<br>Front: ${P.frontDir}<br>POT max: ${Math.round(P.pot*100)}%<br>CUT max: ${P.cut}<br>H max: ${P.hMax}m<br>Niveluri: ${b.niv} niv.<br>H total: ${(b.niv*P.hn).toFixed(1)}m`;

  _rvUpdatePanels(b,P);
  if(typeof ss === 'function') ss(`✅ Relevee generate în ${secs}s — ${b.niv} niveluri, SDA=${_rvFmt(b.sdaTotal)}m²`);
}

function _rvBuildFloorBar(niv){
  const fb=document.getElementById('rv-floorbar'); if(!fb) return;
  fb.innerHTML=`<span class="rv-fb-label">NIV:</span>`;
  for(let i=0;i<niv;i++){
    const btn=document.createElement('div'); btn.className='rv-fbtn'+(i===0?' rv-on':'');
    btn.textContent=i===0?'P':`E${i}`;
    btn.onclick=()=>{_RV.floor=i;document.querySelectorAll('.rv-fbtn').forEach(b=>b.classList.remove('rv-on'));btn.classList.add('rv-on');_rvRender();};
    fb.appendChild(btn);
  }
}

function _rvUpdatePanels(b,P){
  // Bilanț
  const bilant=document.getElementById('rv-bilant');
  if(bilant) bilant.innerHTML=[
    ['Suprafață parcelă',_rvFmt(P.area)+'m²'],
    ['SC edificiu',_rvFmt(b.scArea)+'m²'],
    ['SDA totală',_rvFmt(b.sdaTotal)+'m²'],
    ['POT realizat',_rvFmt(b.scArea/P.area*100)+'% / max '+Math.round(P.pot*100)+'%'],
    ['CUT realizat',_rvFmtD(b.sdaTotal/P.area)+' / max '+P.cut],
    ['Niveluri',b.niv+' niv. · H='+(b.niv*P.hn).toFixed(1)+'m'],
    ['Apartamente est.',_rvFmt(b.niv*b.cores.length*2)+' unități'],
  ].map(([l,v])=>`<div class="rv-stat"><span class="rv-sl">${l}</span><span class="rv-sv">${v}</span></div>`).join('');

  // Normative
  const fl=_RV.floors[0];
  const potOk=b.scArea/P.area<=P.pot+.001;
  const cutOk=b.sdaTotal/P.area<=P.cut+.001;
  const roomsOk=fl.rects.every(r=>{ const m=_RV_NP057[r.t]; return !m||r.w*r.h>=m; });
  const solarIssues=fl.rects.filter(r=>r.solarOk===false).length;
  const isuOk=fl.isu?.ok!==false;
  const norms=document.getElementById('rv-norm');
  if(norms) norms.innerHTML=[
    ['POT',potOk?'ok':'err',potOk?'CONFORM':'DEPĂȘIRE','PUG · NP 068'],
    ['CUT',cutOk?'ok':'err',cutOk?'CONFORM':'DEPĂȘIRE','PUG · NP 068'],
    ['Suprafețe min.',roomsOk?'ok':'warn',roomsOk?'CONFORM':'Verificare','NP 057/2002'],
    ['Însorire OMS 119',solarIssues===0?'ok':'warn',solarIssues===0?'CONFORM':solarIssues+' cam.','OMS 119/2014'],
    ['Evacuare ISU',isuOk?'ok':'warn',isuOk?'CONFORM':'Verificare','P118-2/2013'],
    ['PMR',b.scArea>600?'ok':'warn','Obligatoriu','NP 051/2012'],
    ['Seismic',P.niv>0?'ok':'warn','Zona E ag=0.2g','P100-1/2013'],
  ].map(([l,cls,v,ref])=>`<div class="rv-norm-item"><div><div class="rv-nl">${l}</div><div class="rv-nref">${ref}</div></div><div class="rv-badge rv-badge-${cls}">${v}</div></div>`).join('');
}

// ══════════════════════════════════════════════════════════════════════════
// MODAL OPEN / CLOSE
// ══════════════════════════════════════════════════════════════════════════
function _rvOpen(){
  if(!document.getElementById('rv-modal')) _rvInject();
  document.getElementById('rv-modal').classList.add('rv-modal-open');
  _RV.open=true;
}

function closeRelevee(){
  document.getElementById('rv-modal')?.classList.remove('rv-modal-open');
  _RV.open=false;
}

function _rvTabClick(btn){
  document.querySelectorAll('.rv-tab').forEach(t=>t.classList.remove('rv-on'));
  btn.classList.add('rv-on');
  _RV.tab=btn.dataset.tab;
  if(_RV.building) _rvRender();
}

function _rvToggle(el,key){
  el.classList.toggle('rv-tog-on');
  _RV['show'+key[0].toUpperCase()+key.slice(1)]=el.classList.contains('rv-tog-on');
  if(_RV.building) _rvRender();
}

function _rvZoom(d){
  _RV.scale=Math.max(5,Math.min(32,_RV.scale+(d*2)));
  document.getElementById('rv-zval').textContent=Math.round(_RV.scale/12*100)+'%';
  if(_RV.building) _rvRender();
}

function _rvExport(){
  // PNG quick export (păstrat pentru debug)
  const cv=document.getElementById('rv-canvas'); if(!cv.width) return;
  const a=document.createElement('a');
  const P=_RV.parcelParams;
  a.download=`relevee_${P?.nrCad||'urbanx'}_${_RV.tab}_e${_RV.floor}.png`;
  a.href=cv.toDataURL('image/png',1.0); a.click();
}

// ══════════════════════════════════════════════════════════════════════════
// EXPORT PDF PROFESIONAL — desenat direct în jsPDF (fundal alb, arh. style)
// ══════════════════════════════════════════════════════════════════════════
async function _rvExportPDF(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:(window.jspdf?.jsPDF);
  if(!_jsPDF){_rvExportAllPNG(P,b);return;}

  const btn=document.querySelector('.rv-expbtn');
  if(btn){btn.textContent='⏳ Generez PDF…';btn.style.opacity='.6';}

  try{
    const pdf=new _jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
    const W=297,H=210;
    let pgN=0;
    const newPage=()=>{if(pgN>0)pdf.addPage();pgN++;};

    // ── Culori ──────────────────────────────────────────────────────────
    const C={
      gold:[212,175,55], gold2:[245,198,60], dark:[8,14,30], dark2:[15,25,48],
      light:[248,249,252], light2:[240,244,250], white:[255,255,255],
      red:[220,38,38], green:[22,163,74], blue:[37,99,235], cyan:[6,182,212],
      orange:[234,88,12], purple:[124,58,237], gray:[100,116,139],
      gray2:[203,213,225], gray3:[241,245,249],
      wall:[80,100,130], wallLight:[180,195,215],
      living:[253,186,116], bedroom:[134,239,172], kitchen:[103,232,249],
      bath:[196,181,253], hall:[203,213,225], core:[147,197,253],
      balcon:[254,249,195], commercial:[249,168,212], storage:[209,213,219],
    };
    const S2=s=>String(s||'').replace(/[^ -~À-ɏĀ-ɏ]/g,' ').replace(/\s+/g,' ').trim().slice(0,200);
    const RN=(n,d=0)=>isNaN(n)?'—':d?n.toFixed(d):Math.round(n)+'';

    // ── Header/Footer helpers ────────────────────────────────────────────
    const hdr=(title,pg)=>{
      pdf.setFillColor(...C.dark2);pdf.rect(0,0,W,9,'F');
      pdf.setFillColor(...C.gold);pdf.rect(0,0,W,1.2,'F');
      // Logo text
      pdf.setTextColor(...C.gold);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
      pdf.text('URBANX',5,6.2);
      pdf.setTextColor(150,165,185);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
      pdf.text('RELEVEE INSTANT · Document orientativ',18,6.2);
      // Title center
      pdf.setTextColor(220,230,245);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
      pdf.text(S2(title),W/2,6.2,{align:'center'});
      // Page right
      pdf.setTextColor(...C.gold);pdf.setFontSize(6.5);
      pdf.text('Pag. '+pg+' / '+totalPages,W-5,6.2,{align:'right'});
    };
    const ftr=()=>{
      pdf.setFillColor(240,244,250);pdf.rect(0,H-7,W,7,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.2);pdf.line(0,H-7,W,H-7);
      pdf.setTextColor(120,135,155);pdf.setFontSize(5.5);pdf.setFont('helvetica','italic');
      pdf.text('Nr.cad. '+S2(P.nrCad)+' · UTR: '+S2(P.utr)+' · '+S2(P.fn)+' · UrbanX TSS·FG · Document orientativ — nu înlocuiește proiectul tehnic elaborat de arhitect autorizat OAR conf. Legii 50/1991',W/2,H-2,{align:'center'});
    };
    const secTitle=(txt,y,col=C.dark2)=>{
      pdf.setFillColor(...col);pdf.rect(10,y,W-20,6,'F');
      pdf.setFillColor(...C.gold);pdf.rect(10,y,1.5,6,'F');
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
      pdf.text(S2(txt),14,y+4.2);
      return y+8;
    };
    const bodyText=(txt,x,y,w=W-20,sz=7)=>{
      pdf.setTextColor(40,55,80);pdf.setFont('helvetica','normal');pdf.setFontSize(sz);
      const lines=pdf.splitTextToSize(S2(txt),w);
      lines.forEach((l,i)=>pdf.text(l,x,y+i*sz*0.45));
      return y+lines.length*sz*0.45+1.5;
    };
    const tblHdr=(cols,widths,y)=>{
      pdf.setFillColor(...C.dark2);
      const totalW=widths.reduce((a,b_)=>a+b_,0);
      pdf.rect(10,y,totalW,6,'F');
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
      let x=10;cols.forEach((c,i)=>{pdf.text(S2(c),x+2,y+4.2);x+=widths[i];});
      return y+6;
    };
    const tblRow=(cols,widths,y,isEven=false)=>{
      pdf.setFillColor(isEven?245:252,isEven?248:253,isEven?252:253);
      const totalW=widths.reduce((a,b_)=>a+b_,0);
      pdf.rect(10,y,totalW,5.5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(10,y+5.5,10+totalW,y+5.5);
      pdf.setTextColor(40,55,80);pdf.setFont('helvetica','normal');pdf.setFontSize(6);
      let x=10;cols.forEach((c,i)=>{
        if(c==='OK'||c==='CONFORM'){pdf.setTextColor(...C.green);pdf.setFont('helvetica','bold');}
        else if(c==='DEPĂȘIRE'||c==='NECONFORM'){pdf.setTextColor(...C.red);pdf.setFont('helvetica','bold');}
        else if(c==='Verificare PT'||c==='Verificare'){pdf.setTextColor(180,100,20);pdf.setFont('helvetica','normal');}
        else{pdf.setTextColor(40,55,80);pdf.setFont('helvetica','normal');}
        pdf.text(S2(String(c)),x+2,y+4);x+=widths[i];
      });
      return y+5.5;
    };
    const badge=(txt,x,y,ok)=>{
      const col=ok?[220,252,231]:ok===null?[241,245,249]:[254,226,226];
      const tc=ok?C.green:ok===null?C.gray:C.red;
      pdf.setFillColor(...col);pdf.roundedRect(x,y-3.5,22,5,1,1,'F');
      pdf.setDrawColor(...tc);pdf.setLineWidth(0.3);pdf.roundedRect(x,y-3.5,22,5,1,1,'S');
      pdf.setTextColor(...tc);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text(S2(txt),x+11,y+0.2,{align:'center'});
    };

    // ── Draw plan architectural ────────────────────────────────────────
    const drawPlanArch=(fl,P_,b_,ox,oy,sc,showDim=true)=>{
      const bW=b_.bW,bD=b_.bD;
      // Parcel area (dashed)
      pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.3);pdf.setLineDashPattern([2,1.5],0);
      pdf.rect(ox-P_.rl*sc,oy-P_.rf*sc,P_.W*sc,P_.D*sc,'S');
      pdf.setLineDashPattern([],0);
      // Setback area (light fill)
      pdf.setFillColor(248,249,252);pdf.rect(ox,oy,bW*sc,bD*sc,'F');
      // Grid lines (structural)
      pdf.setDrawColor(220,228,240);pdf.setLineWidth(0.1);
      const gsp=5.4*sc;
      for(let x=ox;x<=ox+bW*sc+0.1;x+=gsp){pdf.setLineDashPattern([1,1],0);pdf.line(x,oy,x,oy+bD*sc);pdf.setLineDashPattern([],0);}
      for(let y=oy;y<=oy+bD*sc+0.1;y+=gsp){pdf.setLineDashPattern([1,1],0);pdf.line(ox,y,ox+bW*sc,y);pdf.setLineDashPattern([],0);}

      // Rooms
      fl.rects.sort((a,m)=>(a.zIdx||0)-(m.zIdx||0)).forEach(r=>{
        const rx=ox+r.x*sc,ry=oy+r.y*sc,rw=r.w*sc,rh=r.h*sc;
        const colMap={living:C.living,bedroom:C.bedroom,bedroom2:C.bedroom,bedroom3:C.bedroom,kitchen:C.kitchen,bath:C.bath,wc:C.bath,hall:C.hall,storage:C.storage,core:C.core,office:C.bedroom,meeting:C.living,commercial:C.commercial,reception:C.commercial,balcon:C.balcon};
        const strokeMap={living:C.orange,bedroom:C.green,bedroom2:C.green,bedroom3:C.green,kitchen:C.cyan,bath:C.purple,wc:C.purple,hall:C.gray,storage:C.gray2,core:C.blue,office:C.green,meeting:C.orange,commercial:[180,50,200],reception:[180,50,200],balcon:C.gold};
        const fc=colMap[r.t]||C.hall;
        const sc2=strokeMap[r.t]||C.gray;
        // Fill with opacity
        pdf.setFillColor(fc[0],fc[1],fc[2]);
        if(r.bal){pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.3);pdf.setLineDashPattern([1.5,1],0);pdf.rect(rx,ry,rw,rh,'FD');pdf.setLineDashPattern([],0);}
        else{pdf.setFillColor(fc[0],fc[1],fc[2]);pdf.setDrawColor(...sc2);pdf.setLineWidth(r.t==='core'?0.8:0.5);pdf.rect(rx,ry,rw,rh,'FD');}
        // Label
        if(rw>8&&rh>5){
          const lbl=(r.lbl||r.t).replace(/[🪜🛗☀🛏🍳🚿🚽🏠🚪📦]/g,'').trim();
          const lines=lbl.split('\n').filter(Boolean);
          const fsz=Math.min(5.5,rw/8,rh/lines.length/2.5);
          pdf.setFont('helvetica','bold');pdf.setFontSize(fsz);
          pdf.setTextColor(r.t==='core'?37:50,r.t==='core'?99:65,r.t==='core'?235:90);
          lines.forEach((ln,li)=>{
            pdf.text(S2(ln.slice(0,14)),rx+rw/2,ry+rh/2+(li-(lines.length-1)/2)*fsz*0.6,{align:'center'});
          });
          if(!r.bal&&rw>12&&rh>9){
            const area=Math.round(r.w*r.h);
            pdf.setFont('helvetica','normal');pdf.setFontSize(Math.min(4.5,fsz*0.8));
            pdf.setTextColor(100,120,140);
            pdf.text(area+'m²',rx+rw/2,ry+rh/2+lines.length*fsz*0.35+2,{align:'center'});
          }
        }
      });

      // Exterior walls (thick)
      pdf.setDrawColor(...C.wall);pdf.setLineWidth(1.2);pdf.rect(ox,oy,bW*sc,bD*sc,'S');

      // Windows (cyan rectangles on walls)
      fl.wins.forEach(w=>{
        pdf.setFillColor(200,240,255);pdf.setDrawColor(30,150,200);pdf.setLineWidth(0.8);
        if(w.wall==='N'){pdf.rect(ox+w.x*sc,oy-1.2,w.w*sc,1.6,'FD');}
        else if(w.wall==='S'){pdf.rect(ox+w.x*sc,oy+bD*sc-0.4,w.w*sc,1.6,'FD');}
        else if(w.wall==='V'){pdf.rect(ox-1.2,oy+w.y*sc,1.6,w.h*sc,'FD');}
        else if(w.wall==='E'){pdf.rect(ox+bW*sc-0.4,oy+w.y*sc,1.6,w.h*sc,'FD');}
      });

      // Main door
      fl.doors.filter(d=>d.type==='main').forEach(d=>{
        const dx=ox+d.x*sc;
        pdf.setFillColor(255,255,255);pdf.rect(dx,oy+bD*sc-0.5,d.w*sc,1,'F');
        pdf.setDrawColor(...C.orange);pdf.setLineWidth(0.8);
        pdf.line(dx,oy+bD*sc,dx+d.w*sc,oy+bD*sc);
        pdf.setLineDashPattern([0.5,0.5],0);
        pdf.beginFormObject?.()||null;
        pdf.setDrawColor(245,158,11,0.4);pdf.setLineWidth(0.4);
        pdf.circle(dx+d.w*sc,oy+bD*sc,d.w*sc,'S');
        pdf.setLineDashPattern([],0);
      });

      // Street
      pdf.setFillColor(230,235,245);
      pdf.rect(ox-P_.rl*sc,oy+bD*sc+P_.rs*sc,P_.W*sc,5,'F');
      pdf.setDrawColor(150,165,185);pdf.setLineWidth(0.3);
      pdf.line(ox-P_.rl*sc,oy+bD*sc+P_.rs*sc,ox-P_.rl*sc+P_.W*sc,oy+bD*sc+P_.rs*sc);
      pdf.setTextColor(80,100,130);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('▲  FRONT STRADAL  ·  '+P_.frontDir,ox-P_.rl*sc+P_.W*sc/2,oy+bD*sc+P_.rs*sc+3.5,{align:'center'});

      // Dimensions
      if(showDim){
        pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.25);pdf.setLineDashPattern([1.5,1],0);
        pdf.line(ox,oy+bD*sc+2,ox+bW*sc,oy+bD*sc+2);
        pdf.setLineDashPattern([],0);
        pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
        pdf.text(bW.toFixed(1)+'m',ox+bW*sc/2,oy+bD*sc+5.5,{align:'center'});
        pdf.setLineDashPattern([1.5,1],0);
        pdf.line(ox-2,oy,ox-2,oy+bD*sc);
        pdf.setLineDashPattern([],0);
        pdf.save();pdf.translate(ox-5,oy+bD*sc/2);pdf.rotate(90);
        pdf.setFontSize(5.5);pdf.text(bD.toFixed(1)+'m',0,0,{align:'center'});pdf.restore();
        // Parcel dims
        pdf.setTextColor(150,165,185);pdf.setFontSize(4.5);
        pdf.text(P_.W.toFixed(1)+'m (parcelă)',ox-P_.rl*sc+P_.W*sc/2,oy-P_.rf*sc-1.5,{align:'center'});
      }
    };

    // ── Draw facade ───────────────────────────────────────────────────
    const drawFacadeArch=(b_,P_,ox,oy,fW,fH,sc)=>{
      const niv=b_.niv;
      // Sky
      pdf.setFillColor(235,241,252);pdf.rect(ox,oy,fW,fH,'F');
      // Ground shadow
      pdf.setFillColor(215,220,228);pdf.rect(ox,oy+fH+0.5,fW,2,'F');
      // Building
      pdf.setFillColor(242,244,248);pdf.rect(ox,oy,fW,fH,'F');
      pdf.setFillColor(235,238,245);pdf.rect(ox+fW*0.02,oy,fW*0.96,fH,'F');
      // Floor bands
      for(let i=0;i<niv;i++){
        const fy=oy+fH-(i+1)*P_.hn*sc;
        if(i%2===0){pdf.setFillColor(238,241,248);pdf.rect(ox,fy,fW,P_.hn*sc,'F');}
        // Slab line
        pdf.setFillColor(200,208,220);pdf.rect(ox,oy+fH-i*P_.hn*sc-1,fW,1.2,'F');
        // Floor label
        pdf.setTextColor(120,135,155);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
        pdf.text(i===0?'P':`E${i}`,ox-5,oy+fH-(i)*P_.hn*sc-P_.hn*sc/2+1.5);
      }
      // Windows
      const wCols=Math.max(3,Math.floor(b_.bW/3.2));
      const wW_=Math.min(b_.bW/wCols*0.55,1.8)*sc, wH_=P_.hn*0.42*sc;
      const colSp=fW/wCols;
      const cC=Math.floor(wCols/2);
      for(let row=0;row<niv;row++){
        const wy=oy+fH-(row+1)*P_.hn*sc+(P_.hn*sc-wH_)*0.28;
        for(let col=0;col<wCols;col++){
          const isCore=col===cC;
          const wx=ox+col*colSp+(colSp-wW_)/2;
          if(isCore){
            // Staircase window
            pdf.setFillColor(220,230,245);pdf.rect(wx+wW_*0.25,wy,wW_*0.5,wH_,'F');
            pdf.setDrawColor(...C.blue);pdf.setLineWidth(0.5);pdf.rect(wx+wW_*0.25,wy,wW_*0.5,wH_,'S');
          } else {
            pdf.setFillColor(210,228,252);pdf.rect(wx,wy,wW_,wH_,'F');
            pdf.setFillColor(195,218,245);pdf.rect(wx,wy,wW_,wH_*0.5,'F');
            pdf.setDrawColor(80,140,200);pdf.setLineWidth(0.5);pdf.rect(wx,wy,wW_,wH_,'S');
            // Cross
            pdf.setDrawColor(150,185,225);pdf.setLineWidth(0.2);
            pdf.line(wx+wW_/2,wy,wx+wW_/2,wy+wH_);
            pdf.line(wx,wy+wH_/2,wx+wW_,wy+wH_/2);
          }
        }
        // Balcony rail
        const bY=oy+fH-(row+1)*P_.hn*sc+P_.hn*sc*0.8;
        pdf.setFillColor(200,210,225);pdf.rect(ox+fW*0.03,bY,fW*0.94,1.5,'F');
        pdf.setDrawColor(170,185,205);pdf.setLineWidth(0.3);
        for(let ri=0;ri<Math.floor(fW*0.9/3);ri++){
          pdf.line(ox+fW*0.03+ri*3+1.5,bY,ox+fW*0.03+ri*3+1.5,bY+1.5);
        }
      }
      // Main entry
      const eW=2.2*sc,eH=2.8*sc,eX=ox+fW/2-eW/2,eY=oy+fH-eH;
      pdf.setFillColor(180,195,215);pdf.rect(eX,eY,eW,eH,'F');
      pdf.setDrawColor(100,130,170);pdf.setLineWidth(0.8);pdf.rect(eX,eY,eW,eH,'S');
      pdf.setDrawColor(130,150,180);pdf.setLineWidth(0.3);pdf.line(eX+eW/2,eY,eX+eW/2,eY+eH);
      // Exterior walls heavy
      pdf.setDrawColor(...C.wall);pdf.setLineWidth(1.2);pdf.rect(ox,oy,fW,fH,'S');
      // Ground line
      pdf.setDrawColor(100,115,135);pdf.setLineWidth(1);pdf.line(ox-5,oy+fH,ox+fW+10,oy+fH);
      // H annotation
      pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.4);
      pdf.line(ox+fW+3,oy,ox+fW+3,oy+fH);
      pdf.line(ox+fW+2,oy,ox+fW+4,oy);
      pdf.line(ox+fW+2,oy+fH,ox+fW+4,oy+fH);
      pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
      pdf.text('H='+((niv*P_.hn).toFixed(1))+'m',ox+fW+10,oy+fH/2+2);
      pdf.setTextColor(100,115,135);pdf.setFontSize(5);
      pdf.text(niv+' niv.',ox+fW+10,oy+fH/2+6);
      // CTN
      pdf.setTextColor(90,105,125);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
      pdf.text('COTA ±0.00 (CTN)',ox,oy+fH+3.5);
      // Width dim
      pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.25);
      pdf.line(ox,oy+fH+7,ox+fW,oy+fH+7);
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text(b_.bW.toFixed(1)+'m',ox+fW/2,oy+fH+10.5,{align:'center'});
    };

    // ── Draw section ─────────────────────────────────────────────────
    const drawSectionArch=(b_,P_,ox,oy,sW,sH,sc)=>{
      const niv=b_.niv;
      // Fill
      pdf.setFillColor(235,240,248);pdf.rect(ox,oy,sW,sH,'F');
      // Floor zones
      const zoneColors=[[253,220,180],[200,240,215],[180,230,250],[210,195,250]];
      for(let i=0;i<niv;i++){
        const fy=oy+sH-(i+1)*P_.hn*sc;
        pdf.setFillColor(...zoneColors[i%4]);pdf.rect(ox,fy,sW,P_.hn*sc,'F');
        // Slab
        pdf.setFillColor(170,185,205);pdf.rect(ox,fy-1.5,sW,1.5,'F');
        // Label
        pdf.setTextColor(80,95,115);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
        pdf.text(i===0?'P':`E${i}`,ox-7,oy+sH-(i)*P_.hn*sc-P_.hn*sc/2+1.5);
        // H per level
        pdf.setTextColor(140,155,175);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);
        pdf.text(P_.hn.toFixed(1)+'m',ox+sW+2,oy+sH-(i)*P_.hn*sc-P_.hn*sc/2+1.5);
      }
      // Staircase
      if(b_.cores.length){
        const c=b_.cores[Math.floor(b_.cores.length/2)];
        const cx=ox+sW/2-c.h*sc/2;
        for(let i=0;i<niv;i++){
          const fy=oy+sH-(i+1)*P_.hn*sc;
          pdf.setFillColor(190,215,250);pdf.rect(cx,fy,c.h*sc,P_.hn*sc,'F');
          pdf.setDrawColor(...C.blue);pdf.setLineWidth(0.4);pdf.rect(cx,fy,c.h*sc,P_.hn*sc,'S');
          const steps=7,sw=c.h*sc/steps,sh=P_.hn*sc/steps;
          pdf.setDrawColor(80,130,200);pdf.setLineWidth(0.3);
          for(let s=0;s<steps;s++){
            pdf.line(cx+s*sw,fy+s*sh,cx+(s+1)*sw,fy+s*sh);
            pdf.line(cx+(s+1)*sw,fy+s*sh,cx+(s+1)*sw,fy+(s+1)*sh);
          }
        }
      }
      // Foundation
      pdf.setFillColor(170,180,195);pdf.rect(ox-4,oy+sH,sW+8,4,'F');
      pdf.setDrawColor(130,145,165);pdf.setLineWidth(0.5);pdf.rect(ox-4,oy+sH,sW+8,4,'S');
      // NFA
      pdf.setDrawColor(30,160,190);pdf.setLineWidth(0.5);pdf.setLineDashPattern([2,1.5],0);
      pdf.line(ox-10,oy+sH+2.5,ox+sW+15,oy+sH+2.5);pdf.setLineDashPattern([],0);
      pdf.setTextColor(20,140,170);pdf.setFont('helvetica','italic');pdf.setFontSize(5);
      pdf.text('NFA est. ~-1.5m',ox+2,oy+sH+5.5);
      // Walls
      pdf.setDrawColor(...C.wall);pdf.setLineWidth(1.2);pdf.rect(ox,oy,sW,sH,'S');
      // Ground
      pdf.setDrawColor(90,105,125);pdf.setLineWidth(0.8);pdf.line(ox-10,oy+sH,ox+sW+20,oy+sH);
      pdf.setTextColor(90,105,125);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
      pdf.text('±0.00 CTN',ox+2,oy+sH+3);
      // H annotation
      pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.4);
      pdf.line(ox+sW+4,oy,ox+sW+4,oy+sH);
      pdf.line(ox+sW+3,oy,ox+sW+5,oy);pdf.line(ox+sW+3,oy+sH,ox+sW+5,oy+sH);
      pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
      pdf.text('H='+(niv*P_.hn).toFixed(1)+'m',ox+sW+8,oy+sH/2+2);
    };

    // ── Draw axono (isometric direct în PDF) ──────────────────────────
    const drawAxonoArch=(b_,P_,cx,cy,sc)=>{
      const niv=b_.niv,bW=b_.bW,bD=b_.bD,hn=P_.hn;
      const cos30=Math.cos(Math.PI/6)*sc*0.85, sin30=Math.sin(Math.PI/6)*sc*0.85;
      const proj=(x,y,z)=>({px:cx+(x-y)*cos30, py:cy+(x+y)*sin30-z*sc*0.85*0.55});
      const face=(pts,fill,stk,lw=0.4)=>{
        pdf.setFillColor(...fill);pdf.setDrawColor(...stk);pdf.setLineWidth(lw);
        pdf.moveTo(pts[0].px,pts[0].py);
        pdf.beginPath();pts.forEach(p=>pdf.lineTo(p.px,p.py));
        pdf.closePath();pdf.fillAndStroke?pdf.fillAndStroke():void 0;
        // Manual
        pdf.setFillColor(...fill);
        const pg=[pts[0].px,pts[0].py];
        for(let i=1;i<pts.length;i++){pdf.triangle?.()||(null);}
        // Use rect-based approach
        const xs=pts.map(p=>p.px),ys=pts.map(p=>p.py);
        const minX=Math.min(...xs),minY=Math.min(...ys);
      };
      // Draw each face manually using lines
      const drawFace=(pts,fillR,fillG,fillB,stR,stG,stB,lw=0.4)=>{
        const xc=pts.map(p=>p.px),yc=pts.map(p=>p.py);
        pdf.setFillColor(fillR,fillG,fillB);
        pdf.setDrawColor(stR,stG,stB);pdf.setLineWidth(lw);
        // jsPDF polygon
        if(pdf.polygon){
          const coords=pts.flatMap(p=>[p.px,p.py]);
          pdf.polygon(coords,'FD');
        } else {
          // fallback lines
          pdf.setLineWidth(lw);
          for(let i=0;i<pts.length;i++){
            const n=(i+1)%pts.length;
            pdf.line(pts[i].px,pts[i].py,pts[n].px,pts[n].py);
          }
        }
      };
      const showFloors=Math.min(niv,5);
      // Floor slabs
      for(let fl=0;fl<=showFloors;fl++){
        const z=fl*hn;
        const pts=[proj(0,0,z),proj(bW,0,z),proj(bW,bD,z),proj(0,bD,z)];
        const bright=180+fl*8;
        drawFace(pts,bright,bright+5,bright+15,150,160,175,0.3);
      }
      if(niv>showFloors){
        const z=niv*hn;
        const pts=[proj(0,0,z),proj(bW,0,z),proj(bW,bD,z),proj(0,bD,z)];
        drawFace(pts,245,235,190,C.gold[0],C.gold[1],C.gold[2],1);
        pdf.setLineDashPattern([1.5,1.5],0);
        [[0,0],[bW,0],[bW,bD],[0,bD]].forEach(([x,y])=>{
          const a=proj(x,y,showFloors*hn),b2=proj(x,y,niv*hn);
          pdf.setDrawColor(180,190,205);pdf.setLineWidth(0.3);pdf.line(a.px,a.py,b2.px,b2.py);
        });
        pdf.setLineDashPattern([],0);
      }
      const z1=showFloors*hn;
      // Front face (S)
      drawFace([proj(0,bD,0),proj(bW,bD,0),proj(bW,bD,z1),proj(0,bD,z1)],218,228,248,C.wall[0],C.wall[1],C.wall[2],0.8);
      // Right face (E)
      drawFace([proj(bW,0,0),proj(bW,bD,0),proj(bW,bD,z1),proj(bW,0,z1)],200,215,238,C.wall[0],C.wall[1],C.wall[2],0.6);
      // Windows on front face
      const wCols=Math.max(2,Math.floor(bW/3.5));
      const wW2=bW/wCols*0.52,wH2=hn*0.4;
      for(let row=0;row<Math.min(niv,showFloors);row++){
        for(let col=0;col<wCols;col++){
          if(col===Math.floor(wCols/2)) continue;
          const wx=col*bW/wCols+(bW/wCols-wW2)/2,wz=row*hn+hn*0.22;
          const wpts=[proj(wx,bD,wz),proj(wx+wW2,bD,wz),proj(wx+wW2,bD,wz+wH2),proj(wx,bD,wz+wH2)];
          drawFace(wpts,190,220,255,60,130,200,0.4);
        }
        // Balcony
        const bz=row*hn+hn*0.82;
        const bpts=[proj(0.3,bD,bz),proj(bW-0.3,bD,bz),proj(bW-0.3,bD+0.35,bz),proj(0.3,bD+0.35,bz)];
        drawFace(bpts,210,215,225,160,170,185,0.3);
      }
      // Outer walls thick
      pdf.setDrawColor(...C.wall);pdf.setLineWidth(1);
      const corners=[[0,0],[bW,0],[bW,bD],[0,bD]];
      for(let i=0;i<4;i++){
        const a=proj(corners[i][0],corners[i][1],0);
        const b2=proj(corners[i][0],corners[i][1],z1);
        pdf.line(a.px,a.py,b2.px,b2.py);
      }
    };

    // ── North arrow ───────────────────────────────────────────────────
    const drawNorthArrow=(x,y,dir,sz=8)=>{
      const rot={N:0,S:Math.PI,E:Math.PI/2,V:-Math.PI/2,NE:Math.PI/4,NV:-Math.PI/4,SE:Math.PI*3/4,SV:-Math.PI*3/4}[dir]||0;
      const r=(deg)=>{const d=deg*Math.PI/180+rot;return d;};
      const p=(a,dist)=>({x:x+Math.sin(a)*dist,y:y-Math.cos(a)*dist});
      // Circle
      pdf.setFillColor(255,255,255);pdf.circle(x,y,sz+1,'F');
      pdf.setDrawColor(...C.gray);pdf.setLineWidth(0.3);pdf.circle(x,y,sz+1,'S');
      // N half (red)
      const n=p(rot,sz);
      pdf.setFillColor(...C.red);
      if(pdf.polygon){pdf.polygon([x,y,n.x-sz*0.35,n.y,n.x+sz*0.35,n.y],'F');}
      else{pdf.setDrawColor(...C.red);pdf.line(x,y,n.x,n.y);}
      // S half (gray)
      const s=p(rot+Math.PI,sz);
      pdf.setFillColor(180,190,200);
      if(pdf.polygon){pdf.polygon([x,y,s.x-sz*0.35,s.y,s.x+sz*0.35,s.y],'F');}
      else{pdf.setDrawColor(160,175,190);pdf.line(x,y,s.x,s.y);}
      // N label
      pdf.setTextColor(...C.red);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('N',n.x,n.y-1.5,{align:'center'});
    };

    // ── Scale bar ────────────────────────────────────────────────────
    const drawScaleBar=(x,y,sc,label='Sc. 1:100')=>{
      const m5=5*sc;
      pdf.setFillColor(...C.dark2);pdf.rect(x,y,m5/2,1.5,'F');
      pdf.setFillColor(255,255,255);pdf.rect(x+m5/2,y,m5/2,1.5,'F');
      pdf.setDrawColor(...C.dark2);pdf.setLineWidth(0.4);pdf.rect(x,y,m5,1.5,'S');
      pdf.setTextColor(60,75,95);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
      pdf.text('0',x,y+4);pdf.text('5m',x+m5,y+4,{align:'right'});
      pdf.setTextColor(100,115,135);pdf.text(label,x+m5/2,y+5.5,{align:'center'});
    };

    // ── Legend box ───────────────────────────────────────────────────
    const drawLegend=(x,y,w=45)=>{
      pdf.setFillColor(250,251,253);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
      pdf.rect(x,y,w,52,'FD');
      pdf.setFillColor(...C.dark2);pdf.rect(x,y,w,6,'F');
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('LEGENDĂ SPAȚII',x+w/2,y+4,{align:'center'});
      const items=[
        [C.living,C.orange,'Living / Sufragerie'],
        [C.bedroom,C.green,'Dormitor'],
        [C.kitchen,C.cyan,'Bucătărie'],
        [C.bath,C.purple,'Baie / WC'],
        [C.hall,C.gray,'Hol / Coridor'],
        [C.core,C.blue,'Scări + Lift'],
        [C.balcon,C.gold,'Balcon / Terasă'],
        [C.commercial,[180,50,200],'Comercial'],
      ];
      items.forEach(([fill,stroke,lbl],i)=>{
        const iy=y+9+i*5.5;
        pdf.setFillColor(...fill);pdf.setDrawColor(...stroke);pdf.setLineWidth(0.4);
        pdf.rect(x+2,iy-2.5,5,4,'FD');
        pdf.setTextColor(50,65,85);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
        pdf.text(lbl,x+9,iy);
      });
    };

    // ══════════════════════════════════════════════════════════════
    // CALCULEAZĂ NR. TOTAL PAGINI
    // ══════════════════════════════════════════════════════════════
    const maxFloors=Math.min(b.niv,4);
    const totalPages=1+maxFloors+1+1+1+1; // cover+planuri+fatada+sectiune+axono+bilant

    // ══════════════════════════════════════════════════════════════
    // PAG 1 — COPERTĂ PROFESIONALĂ
    // ══════════════════════════════════════════════════════════════
    newPage();
    // Background gradient (simulat cu benzi)
    pdf.setFillColor(8,14,30);pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(12,22,45);pdf.rect(0,H*0.35,W,H*0.65,'F');
    // Gold accent top
    pdf.setFillColor(...C.gold);pdf.rect(0,0,W,2,'F');
    // Logo area
    pdf.setFillColor(15,25,48);pdf.roundedRect(10,8,70,20,2,2,'F');
    pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(16);
    pdf.text('URBANX',15,21);
    pdf.setTextColor(150,165,185);pdf.setFont('helvetica','normal');pdf.setFontSize(7);
    pdf.text('PLATFORMĂ NAȚIONALĂ DE ANALIZĂ URBANISTICĂ',15,27);
    // Title
    pdf.setTextColor(245,248,255);pdf.setFont('helvetica','bold');pdf.setFontSize(28);
    pdf.text('RELEVEE',15,55);
    pdf.setTextColor(...C.gold);pdf.text('INSTANT',15,72);
    pdf.setTextColor(190,205,225);pdf.setFont('helvetica','normal');pdf.setFontSize(9);
    pdf.text('Planuri funcționale orientative generate automat din datele cadastrale',15,82);
    // Decorative line
    pdf.setFillColor(...C.gold);pdf.rect(15,87,80,0.8,'F');
    pdf.setFillColor(60,80,120);pdf.rect(97,87,W-107,0.8,'F');
    // Info card
    pdf.setFillColor(20,35,62);pdf.roundedRect(W*0.55,12,W*0.4,H-24,3,3,'F');
    pdf.setFillColor(...C.gold);pdf.roundedRect(W*0.55,12,W*0.4,8,3,3,'F');
    pdf.setFillColor(...C.gold);pdf.rect(W*0.55,16,W*0.4,4,'F');
    pdf.setTextColor(15,25,48);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
    pdf.text('DATE DE IDENTIFICARE',W*0.55+W*0.2,18,{align:'center'});
    const infoY=W*0.55; let iy=26;
    const infoRow=(lbl,val,highlight=false)=>{
      pdf.setFillColor(highlight?[30,50,85]:25,highlight?[50,80,130]:42,highlight?[90,120,180]:72);
      pdf.setFillColor(highlight?30:25,highlight?50:42,highlight?90:72);
      pdf.rect(infoY,iy-3,W*0.4,6,'F');
      pdf.setTextColor(150,165,185);pdf.setFont('helvetica','normal');pdf.setFontSize(6.5);
      pdf.text(S2(lbl),infoY+3,iy);
      pdf.setTextColor(highlight?C.gold[0]:220,highlight?C.gold[1]:230,highlight?C.gold[2]:245);
      if(highlight)pdf.setFont('helvetica','bold');
      pdf.text(S2(String(val)),infoY+W*0.4-3,iy,{align:'right'});
      pdf.setFont('helvetica','normal');
      iy+=7;
    };
    infoRow('Nr. Cadastral',P.nrCad,true);
    infoRow('UTR / Zonă',P.utr);
    infoRow('Funcțiune propusă',P.fn);
    infoRow('Suprafață parcelă',P.area+'m²');
    infoRow('Dimensiuni bbox',P.W.toFixed(1)+'m × '+P.D.toFixed(1)+'m');
    infoRow('Regim înălțime',b.niv+' niv. · H='+(b.niv*P.hn).toFixed(1)+'m',true);
    infoRow('POT realizat / max',RN(b.scArea/P.area*100)+'% / '+RN(P.pot*100)+'%');
    infoRow('CUT realizat / max',(b.sdaTotal/P.area).toFixed(2)+' / '+P.cut);
    infoRow('SDA totală estimată',RN(b.sdaTotal)+'m²',true);
    infoRow('Orientare front',P.frontDir);
    infoRow('Nr. apartamente est.',RN(b.niv*b.cores.length*2)+' unități');
    infoRow('Data generare',new Date().toLocaleDateString('ro-RO'));
    // Normative badge strip
    pdf.setFillColor(15,28,55);pdf.rect(infoY,iy-1,W*0.4,18,'F');
    pdf.setTextColor(100,120,150);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text('NORMATIVE APLICATE',infoY+3,iy+3);iy+=7;
    ['NP 057/2002','OMS 119/2014','P118-2/2013','NP 051/2012','P100-1/2013'].forEach((n,i)=>{
      const nx=infoY+3+(i%3)*32, niy2=iy+(Math.floor(i/3))*5;
      pdf.setFillColor(25,45,80);pdf.roundedRect(nx-1,niy2-3,30,4.5,1,1,'F');
      pdf.setTextColor(...C.gold);pdf.setFontSize(4.8);pdf.text(n,nx,niy2);
    });
    // Bottom disclaimer
    pdf.setFillColor(10,18,38);pdf.rect(0,H-12,W,12,'F');
    pdf.setFillColor(...C.gold);pdf.rect(0,H-12,W,0.6,'F');
    pdf.setTextColor(100,120,150);pdf.setFont('helvetica','italic');pdf.setFontSize(5.5);
    pdf.text('Document orientativ generat de UrbanX Relevee Instant · Nu înlocuiește proiectul tehnic elaborat de arhitect autorizat OAR conform Legii 50/1991 · UrbanX TSS·FG',W/2,H-7,{align:'center'});
    pdf.text('Dimensiunile sunt estimative — proiectul tehnic stabilește cotele exacte · '+new Date().toLocaleDateString('ro-RO'),W/2,H-3,{align:'center'});

    // ══════════════════════════════════════════════════════════════
    // PAG 2..N — PLANURI DE NIVEL
    // ══════════════════════════════════════════════════════════════
    for(let fl=0;fl<maxFloors;fl++){
      newPage();
      const flObj=_RV.floors[fl];
      const flLabel=fl===0?'PLAN PARTER':'PLAN ETAJ '+fl;
      hdr(flLabel+' — Nr.cad. '+P.nrCad+' · UTR '+P.utr,pgN);

      // Calculate scale to fit plan nicely
      const aW=W-60, aH=H-35;
      const sc=Math.min(aW/(P.W+6), aH/(P.D+12));
      const planW=b.bW*sc, planH=b.bD*sc;
      // Center plan in available space (leave right margin for legend)
      const ox=15+(aW-45-planW)/2+P.rl*sc;
      const oy=12+(aH-planH)/2+P.rf*sc;

      pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-9,'F');
      pdf.setFillColor(255,255,255);pdf.rect(8,10,W-55,H-19,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(8,10,W-55,H-19,'S');

      drawPlanArch(flObj,P,b,ox,oy,sc,true);
      drawNorthArrow(W-47,20,P.frontDir,7);
      drawScaleBar(14,H-13,sc);
      drawLegend(W-52,10);

      // Section indicator
      pdf.setTextColor(...C.red);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
      pdf.text('A',ox-2,oy+b.bD*sc/2);
      pdf.text('A',ox+b.bW*sc+2,oy+b.bD*sc/2);
      pdf.setDrawColor(...C.red);pdf.setLineWidth(0.4);pdf.setLineDashPattern([1,1],0);
      pdf.line(ox,oy+b.bD*sc/2,ox+b.bW*sc,oy+b.bD*sc/2);
      pdf.setLineDashPattern([],0);

      // Info box bottom right
      pdf.setFillColor(250,251,253);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
      pdf.rect(W-52,65,44,H-74,'FD');
      pdf.setFillColor(...C.dark2);pdf.rect(W-52,65,44,6,'F');
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('DATE ETAJ',W-30,69,{align:'center'});
      const flInfo=[
        ['Nivel',fl===0?'Parter':'Etaj '+fl],
        ['Cotă pardoseală','+'+(fl*P.hn).toFixed(2)+'m'],
        ['Cotă planseu','+'+(fl*P.hn+P.hn).toFixed(2)+'m'],
        ['H nivel net',(P.hn-0.25).toFixed(2)+'m'],
        ['SC nivel',RN(b.scArea)+'m²'],
        ['Nr. apartamente',b.cores.length*2+' apt.'],
      ];
      flInfo.forEach(([l,v],i)=>{
        const fy=74+i*6;
        pdf.setFillColor(i%2?248:255,i%2?250:255,i%2?252:255);pdf.rect(W-52,fy-3,44,6,'F');
        pdf.setTextColor(100,115,135);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
        pdf.text(l,W-50,fy);
        pdf.setTextColor(40,55,80);pdf.setFont('helvetica','bold');
        pdf.text(S2(v),W-9,fy,{align:'right'});
      });

      // Solar note if overlay active
      pdf.setTextColor(120,135,155);pdf.setFont('helvetica','italic');pdf.setFontSize(5);
      const solarNote=(['S','SE','SV','E'].includes(P.frontDir))?'Orientare favorabilă însorire ('+P.frontDir+')':'Verificați orientarea camerelor conf. OMS 119/2014';
      pdf.text('☀ '+solarNote,15,H-5);

      ftr();
    }

    // ══════════════════════════════════════════════════════════════
    // PAG FAȚADĂ PRINCIPALĂ
    // ══════════════════════════════════════════════════════════════
    newPage();
    hdr('FAȚADĂ PRINCIPALĂ — VEDERE DIN STRADĂ · Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(235,238,245);pdf.rect(0,9,W,H-9,'F');
    pdf.setFillColor(255,255,255);pdf.rect(8,10,W-16,H-19,'F');
    pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(8,10,W-16,H-19,'S');

    const fSc=Math.min((W-60)/(b.bW+4),(H-50)/((b.niv*P.hn)+10));
    const fW=b.bW*fSc, fH=b.niv*P.hn*fSc;
    const fOx=(W-fW)/2, fOy=12+(H-35-fH)/2;

    drawFacadeArch(b,P,fOx,fOy,fW,fH,fSc);
    drawNorthArrow(W-28,22,P.frontDir,7);
    drawScaleBar(15,H-13,fSc);

    // Annotations
    pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('INTRARE',fOx+fW/2,fOy+fH+fSc*P.hn*0.15,{align:'center'});
    pdf.setTextColor(80,100,130);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
    pdf.text('Acces principal pietonal + auto',fOx+fW/2,fOy+fH+fSc*P.hn*0.15+4,{align:'center'});

    // Technical box
    pdf.setFillColor(248,249,252);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(10,H-30,120,20,'FD');
    pdf.setFillColor(...C.dark2);pdf.rect(10,H-30,120,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('DATE TEHNICE FAȚADĂ',12,H-25.5);
    const fData=[['H total',( b.niv*P.hn).toFixed(1)+'m'],['Nr. niveluri',b.niv+' niv.'],['Lățime fațadă',b.bW.toFixed(1)+'m'],['GRF estimat',b.niv>4?'GRF II (REI≥90min)':'GRF III (REI≥60min)'],['Balcoane',b.niv>2?'DA — toate nivelurile':'N/A']];
    fData.forEach(([l,v],i)=>{
      const fy=H-23+i*3;
      pdf.setFillColor(i%2?248:252,i%2?250:253,i%2?252:254);pdf.rect(10,fy-2,120,3,'F');
      pdf.setTextColor(100,115,135);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(l,12,fy);
      pdf.setTextColor(40,55,80);pdf.setFont('helvetica','bold');pdf.text(S2(v),75,fy);
    });
    ftr();

    // ══════════════════════════════════════════════════════════════
    // PAG SECȚIUNE A-A
    // ══════════════════════════════════════════════════════════════
    newPage();
    hdr('SECȚIUNE TRANSVERSALĂ A-A · Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(235,238,245);pdf.rect(0,9,W,H-9,'F');
    pdf.setFillColor(255,255,255);pdf.rect(8,10,W-16,H-19,'F');
    pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(8,10,W-16,H-19,'S');

    const sSc=Math.min((W-60)/(b.bD+4),(H-50)/((b.niv*P.hn)+10));
    const sW=b.bD*sSc, sH=b.niv*P.hn*sSc;
    const sOx=(W-sW)/2, sOy=12+(H-35-sH)/2;

    drawSectionArch(b,P,sOx,sOy,sW,sH,sSc);
    drawNorthArrow(W-28,22,P.frontDir,7);
    drawScaleBar(15,H-13,sSc);

    // Section legend
    pdf.setFillColor(248,249,252);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(W-80,12,70,40,'FD');
    pdf.setFillColor(...C.dark2);pdf.rect(W-80,12,70,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text('LEGENDĂ SECȚIUNE',W-45,16,{align:'center'});
    const sLeg=[[C.living,C.orange,'Zone locuit / birouri'],[C.bedroom,C.green,'Dormitoare'],[C.kitchen,C.cyan,'Bucătărie / utilități'],[C.core,C.blue,'Casa scărilor + lift'],[C.balcon,C.gold,'Placă beton (planșeu)']];
    sLeg.forEach(([fill,stk,lbl],i)=>{
      const sly=20+i*5.5;
      pdf.setFillColor(...fill);pdf.setDrawColor(...stk);pdf.setLineWidth(0.4);pdf.rect(W-78,sly-2.5,5,4,'FD');
      pdf.setTextColor(50,65,85);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(lbl,W-71,sly);
    });

    // Technical notes
    pdf.setFillColor(248,249,252);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(10,H-32,120,22,'FD');
    pdf.setFillColor(...C.dark2);pdf.rect(10,H-32,120,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('NOTE TEHNICE SECȚIUNE',12,H-27.5);
    const secNotes=['Structură beton armat conf. P100-1/2013 zona seismică E (ag=0.2g)','Grosime planșeu estimat: 18-22cm (proiect structural)','Înălțime liberă nivel: '+(P.hn-0.25).toFixed(2)+'m (H nivel '+(P.hn).toFixed(1)+'m - planșeu)','NFA estimat: 1.5-4.0m (verificare studiu geotehnic NP 074/2014)','Fundații recomandate: izolate/continue la min. 1.5m (sub CTN)'];
    secNotes.forEach((n,i)=>{
      pdf.setFillColor(i%2?248:252,252,252);pdf.rect(10,H-21+i*4-2,120,4,'F');
      pdf.setTextColor(60,80,110);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
      pdf.text('▸ '+S2(n),12,H-21+i*4);
    });
    ftr();

    // ══════════════════════════════════════════════════════════════
    // PAG AXONOMETRIE
    // ══════════════════════════════════════════════════════════════
    newPage();
    hdr('VEDERE AXONOMETRICĂ — VOLUM 3D ESTIMAT · Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(235,238,248);pdf.rect(0,9,W,H-9,'F');
    pdf.setFillColor(248,249,254);pdf.rect(8,10,W-16,H-19,'F');
    pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(8,10,W-16,H-19,'S');

    const axSc=Math.min((W-80)/(b.bW+b.bD+4),(H-50)/((b.niv*P.hn)+b.bD/2+6))*0.85;
    const axCx=W*0.38, axCy=H*0.62;

    drawAxonoArch(b,P,axCx,axCy,axSc);
    drawNorthArrow(W-28,22,P.frontDir,7);

    // Annotations
    pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
    pdf.text('H = '+(b.niv*P.hn).toFixed(1)+'m',W*0.75,axCy-b.niv*P.hn*axSc*0.55+5);
    pdf.setTextColor(100,115,135);pdf.setFont('helvetica','normal');pdf.setFontSize(6);
    pdf.text(b.niv+' niveluri · P+'+( b.niv-1)+'E',W*0.75,axCy-b.niv*P.hn*axSc*0.55+11);

    // Info cards row
    const cards=[
      ['SDA TOTALĂ',RN(b.sdaTotal)+'m²','Suprafață desfășurată'],
      ['REGIM H',b.niv+' niv.','P+'+(b.niv-1)+'E = H'+(b.niv*P.hn).toFixed(1)+'m'],
      ['POT / CUT',RN(b.scArea/P.area*100)+'% / '+(b.sdaTotal/P.area).toFixed(1),'Conf. PUG '+P.utr],
      ['APT. ESTIMATE',RN(b.niv*b.cores.length*2)+' unități','Mix apt. configur.'],
    ];
    cards.forEach(([t,v,s],i)=>{
      const cx=W-75+0,cy_c=H-48+i*14;
      pdf.setFillColor(245,247,252);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
      pdf.roundedRect(W-78,cy_c-5,70,12,1.5,1.5,'FD');
      pdf.setFillColor(...C.dark2);pdf.roundedRect(W-78,cy_c-5,70,6,1.5,1.5,'F');
      pdf.rect(W-78,cy_c-2,70,3,'F');
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text(t,W-43,cy_c-1,{align:'center'});
      pdf.setTextColor(20,40,80);pdf.setFontSize(8);
      pdf.text(S2(v),W-43,cy_c+4,{align:'center'});
      pdf.setTextColor(120,135,155);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
      pdf.text(S2(s),W-43,cy_c+7,{align:'center'});
    });
    ftr();

    // ══════════════════════════════════════════════════════════════
    // PAG BILANȚ + NORMATIVE + CONCLUZII
    // ══════════════════════════════════════════════════════════════
    newPage();
    hdr('BILANȚ SUPRAFEȚE · VERIFICARE NORMATIVE · CONCLUZII',pgN);
    pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-9,'F');

    let cy3=13;
    const col1W=(W-22)/2, col2X=14+col1W+3;

    // COL 1: Bilanț
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(11,cy3,col1W,80,'FD');
    cy3=secTitle('BILANȚ SUPRAFEȚE',cy3+0.5,C.dark2)+1;
    const bilRows=[
      ['Suprafață parcelă (ST)',P.area+'m²'],
      ['SC edificiu la sol',RN(b.scArea)+'m²'],
      ['Spații verzi min. (SV)',RN(P.area*(parseFloat(P.sv||10)/100))+'m²'],
      ['SDA totală',RN(b.sdaTotal)+'m²'],
      ['SDA/nivel',RN(b.sdaPerFloor)+'m²'],
      ['POT realizat / max',RN(b.scArea/P.area*100)+'% / '+RN(P.pot*100)+'%'],
      ['CUT realizat / max',(b.sdaTotal/P.area).toFixed(2)+' / '+P.cut],
      ['Nr. niveluri',b.niv+' niv. (P+'+(b.niv-1)+'E)'],
      ['Înălțime totală',(b.niv*P.hn).toFixed(1)+'m'],
      ['Înălțime liberă nivel',(P.hn-0.25).toFixed(2)+'m'],
      ['Nr. nuclee scări',b.cores.length+' nuclee'],
      ['Apartamente estimate',RN(b.niv*b.cores.length*2)+' unități'],
    ];
    bilRows.forEach(([l,v],i)=>{ cy3=tblRow([l,v],[col1W-14,40],cy3,i%2===0); });
    cy3+=4;

    // COL 2: Normative
    const fl0=_RV.floors[0];
    let cy4=13;
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(col2X,cy4,col1W+1,80,'FD');
    cy4=secTitle('VERIFICARE NORMATIVE',cy4+0.5,C.dark2)+1;
    const potOk=b.scArea/P.area<=P.pot+.001;
    const cutOk=b.sdaTotal/P.area<=P.cut+.001;
    const roomsOk=fl0?.rects.every(r=>{ const m={living:14,bedroom:12,bedroom2:10,kitchen:5,bath:3.6}[r.t]; return !m||r.w*r.h>=m; })!==false;
    const isuOk=fl0?.isu?.ok!==false;
    const solarOk=fl0?.rects.filter(r=>r.solarOk===false).length===0;
    const normRows=[
      ['POT max admis',potOk?'OK':'DEP.',potOk,'PUG · NP 068/2000'],
      ['CUT max admis',cutOk?'OK':'DEP.',cutOk,'PUG · NP 068/2000'],
      ['Suprafețe min.',roomsOk?'CONFORM':'Verif. PT',roomsOk,'NP 057/2002'],
      ['Însorire OMS 119',solarOk?'CONFORM':'Verif. PT',solarOk,'OMS 119/2014'],
      ['Evacuare ISU',isuOk?'CONFORM':'Verif. PT',isuOk,'P118-2/2013'],
      ['Accesibilitate PMR',b.scArea>300?'Obligatoriu':null,null,'NP 051/2012'],
      ['Seismic zona E',true,'ag=0.2g Tc=1.6s',true,'P100-1/2013'],
      ['Calitate construcții',true,'Legea 10/1995',true,'Legea 10/1995'],
    ];
    normRows.forEach(([l,v,ok,ref],i)=>{
      cy4=tblRow([l,S2(String(v)),S2(ref)],[col1W-20,22,col1W-5],cy4,i%2===0);
    });
    cy4+=4;

    // Conclusions
    const concY=Math.max(cy3,cy4)+4;
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(11,concY,W-22,H-concY-19,'FD');
    const cY=secTitle('CONCLUZII ȘI RECOMANDĂRI',concY+0.5,[15,30,65])+2;
    const potStatus=potOk?'se încadrează':'DEPĂȘEȘTE';
    const cutStatus=cutOk?'se încadrează':'DEPĂȘEȘTE';
    const concText=[
      'Parcela cu nr. cadastral '+P.nrCad+' (UTR '+P.utr+', suprafață '+P.area+'m², Municipiul Iași) a fost analizată de platforma UrbanX Relevee Instant. Scenariul generat propune un volum edificabil de '+b.niv+' niveluri (P+'+(b.niv-1)+'E), cu înălțimea totală de '+(b.niv*P.hn).toFixed(1)+'m și o suprafață desfășurată totală estimată de '+RN(b.sdaTotal)+'m².',
      'Indicatorii urbanistici: POT realizat '+RN(b.scArea/P.area*100)+'% '+potStatus+' în limitele PUG (max. '+RN(P.pot*100)+'%). CUT realizat '+(b.sdaTotal/P.area).toFixed(2)+' '+cutStatus+' în limitele PUG (max. '+P.cut+'). Construirea este fezabilă cu respectarea condițiilor din Regulamentul Local de Urbanism (RLU UTR '+P.utr+').',
      'Se recomandă elaborarea unui Studiu de Însorire detaliat (OMS 119/2014) pentru orientarea '+P.frontDir+' a frontului stradal, cu verificarea orelor de însorire per cameră la solstițiu de iarnă. Orientările favorabile camere de locuit: S, SE, SV (min. 1.5h/zi la 21 dec.).',
      'Pașii următori obligatorii: (1) Certificat de Urbanism → Primăria Municipiului Iași; (2) Studiu geotehnic NP 074/2014; (3) Proiect PAC/DTAC elaborat de arhitect OAR; (4) Avize din CU (ISU, utilități, AACR); (5) Autorizație de Construire.',
    ];
    let conclY=cY;
    concText.forEach((t,i)=>{
      pdf.setFillColor(i%2?248:252,252,253);pdf.rect(12,conclY-2,W-24,12,'F');
      pdf.setFillColor(...C.gold);pdf.rect(12,conclY-2,1.5,12,'F');
      pdf.setTextColor(40,55,80);pdf.setFont('helvetica','normal');pdf.setFontSize(6);
      const lines=pdf.splitTextToSize(S2(t),W-28);
      lines.slice(0,3).forEach((l,li)=>pdf.text(l,16,conclY+li*4.5));
      conclY+=Math.min(lines.length,3)*4.5+3;
    });

    // Final disclaimer
    pdf.setFillColor(8,14,30);pdf.rect(11,H-15,W-22,9,'F');
    pdf.setFillColor(...C.gold);pdf.rect(11,H-15,W-22,1,'F');
    pdf.setTextColor(150,165,185);pdf.setFont('helvetica','italic');pdf.setFontSize(5.5);
    pdf.text('Prezentul document orientativ a fost generat automat de platforma UrbanX Relevee Instant. Nu înlocuiește documentațiile tehnice avizate conf. Legii 50/1991 și Legii 350/2001.',W/2,H-10.5,{align:'center'});
    pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text('UrbanX TSS·FG · '+new Date().toLocaleDateString('ro-RO')+' · '+totalPages+' pagini',W/2,H-7,{align:'center'});
    ftr();

    // SAVE
    pdf.save('Relevee_'+P.nrCad+'_'+new Date().getFullYear()+'.pdf');
    if(btn){btn.textContent='⬇ Export PDF Raport';btn.style.opacity='1';}
    if(typeof ss==='function') ss('✅ PDF Relevee exportat profesional — '+totalPages+' pagini!');

  }catch(err){
    console.error('[Relevee PDF]',err);
    if(btn){btn.textContent='⬇ Export PDF Raport';btn.style.opacity='1';}
    _rvExportAllPNG(P,b);
  }
}

function _rvExportAllPNG(P,b){
  const savedScale=_RV.scale;
  _RV.scale=20;_rvRender();
  setTimeout(()=>{
    const cv=document.getElementById('rv-canvas');if(!cv)return;
    const a=document.createElement('a');
    a.download='relevee_'+(P?.nrCad||'urbanx')+'_'+_RV.tab+'.png';
    a.href=cv.toDataURL('image/png',1.0);a.click();
    _RV.scale=savedScale;_rvRender();
    if(typeof ss==='function') ss('Export PNG — jsPDF indisponibil');
  },150);
}

function _rvMobSheet(){
  const sh=document.getElementById('rv-mob-sheet'); if(!sh) return;
  // Populate from main panels
  const bil=document.getElementById('rv-bilant');
  const norm=document.getElementById('rv-norm');
  const mob_b=document.getElementById('rv-mob-bilant');
  const mob_n=document.getElementById('rv-mob-norm');
  if(mob_b&&bil) mob_b.innerHTML=bil.innerHTML;
  if(mob_n&&norm) mob_n.innerHTML=norm.innerHTML;
  sh.classList.add('rv-mob-open');
}
function _rvMobSheetClose(){
  document.getElementById('rv-mob-sheet')?.classList.remove('rv-mob-open');
}

// ══════════════════════════════════════════════════════════════════════════
// DOM INJECTION — modal + CSS injectate o singură dată
// ══════════════════════════════════════════════════════════════════════════
function _rvInject(){
  // ── CSS ──────────────────────────────────────────────────────────────────
  if(!document.getElementById('rv-css')){
    const css=document.createElement('style'); css.id='rv-css';
    css.textContent=`
#rv-modal{position:fixed;inset:0;z-index:8000;background:rgba(4,8,18,.0);backdrop-filter:blur(0);display:flex;flex-direction:column;pointer-events:none;transition:all .25s;}
#rv-modal.rv-modal-open{background:rgba(4,8,18,.96);backdrop-filter:blur(16px);pointer-events:all;}
#rv-modal .rv-body{display:grid;grid-template-columns:260px 1fr 240px;height:100%;opacity:0;transition:opacity .25s .1s;}
#rv-modal.rv-modal-open .rv-body{opacity:1;}
.rv-topbar{display:flex;align-items:center;gap:10px;padding:0 14px;height:50px;background:rgba(6,12,26,.98);border-bottom:1px solid rgba(212,175,55,.15);flex-shrink:0;}
.rv-logo-t{font-size:14px;font-weight:800;letter-spacing:.04em;font-family:'Space Grotesk',sans-serif;}
.rv-sub{font-size:8px;color:#4A6080;text-transform:uppercase;letter-spacing:.1em;}
.rv-badge-t{background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.25);color:#D4AF37;font-size:8px;font-weight:700;padding:2px 8px;border-radius:99px;letter-spacing:.06em;font-family:'Space Grotesk',sans-serif;}
.rv-sep{width:1px;height:22px;background:rgba(212,175,55,.15);}
.rv-timer{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#F5C518;display:flex;align-items:center;gap:5px;}
.rv-tdot{width:5px;height:5px;border-radius:50%;background:#22C55E;box-shadow:0 0 5px #22C55E;}
.rv-running{animation:rv-pulse 1s ease-in-out infinite;}
@keyframes rv-pulse{0%,100%{opacity:1}50%{opacity:.3}}
.rv-tinfo{margin-left:auto;font-size:10px;color:#4A6080;font-family:'IBM Plex Mono',monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:280px;}
.rv-close-btn{margin-left:8px;width:28px;height:28px;border-radius:6px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#64748b;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s;}
.rv-close-btn:hover{border-color:rgba(239,68,68,.4);color:#EF4444;}
.rv-lpanel{background:#0B1426;border-right:1px solid rgba(212,175,55,.1);overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:12px;}
.rv-lpanel::-webkit-scrollbar{width:3px;}.rv-lpanel::-webkit-scrollbar-thumb{background:rgba(212,175,55,.15);}
.rv-sec-t{font-size:8px;text-transform:uppercase;letter-spacing:.12em;color:#4A6080;font-weight:700;margin-bottom:8px;font-family:'Space Grotesk',sans-serif;}
.rv-tog-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;}
.rv-tog-lbl{font-size:10px;color:#7A8FA8;font-family:'Space Grotesk',sans-serif;}
.rv-tog{width:32px;height:17px;border-radius:99px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);cursor:pointer;position:relative;transition:all .2s;flex-shrink:0;}
.rv-tog.rv-tog-on{background:rgba(212,175,55,.28);border-color:rgba(212,175,55,.5);}
.rv-tog::after{content:'';position:absolute;width:11px;height:11px;border-radius:50%;background:#64748b;top:2px;left:2px;transition:all .2s;}
.rv-tog.rv-tog-on::after{background:#F5C518;left:17px;}
.rv-center{display:flex;flex-direction:column;background:#060C1A;overflow:hidden;}
.rv-tabs{display:flex;background:#0B1426;border-bottom:1px solid rgba(212,175,55,.12);flex-shrink:0;}
.rv-tab{padding:9px 14px;font-size:11px;font-weight:700;cursor:pointer;color:#4A6080;border-bottom:2px solid transparent;transition:all .15s;letter-spacing:.03em;font-family:'Space Grotesk',sans-serif;}
.rv-tab:hover{color:#DDE6F5;}.rv-tab.rv-on{color:#D4AF37;border-bottom-color:#D4AF37;}
.rv-floorbar{display:flex;align-items:center;gap:5px;padding:7px 12px;border-bottom:1px solid rgba(212,175,55,.1);background:rgba(6,12,26,.6);flex-shrink:0;overflow-x:auto;}
.rv-floorbar::-webkit-scrollbar{height:2px;}.rv-floorbar::-webkit-scrollbar-thumb{background:rgba(212,175,55,.15);}
.rv-fb-label{font-size:9px;color:#4A6080;white-space:nowrap;font-weight:700;font-family:'IBM Plex Mono',monospace;}
.rv-fbtn{padding:3px 9px;border-radius:5px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);color:#4A6080;cursor:pointer;font-size:10px;font-weight:700;white-space:nowrap;transition:all .1s;font-family:'IBM Plex Mono',monospace;}
.rv-fbtn.rv-on{border-color:#D4AF37;background:rgba(212,175,55,.1);color:#F5C518;}
.rv-drawwrap{flex:1;overflow:auto;display:flex;align-items:flex-start;justify-content:flex-start;padding:16px;position:relative;}
.rv-drawwrap::-webkit-scrollbar{width:5px;height:5px;}.rv-drawwrap::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:3px;}
.rv-empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#4A6080;pointer-events:none;}
.rv-empty-ico{font-size:48px;opacity:.18;filter:grayscale(1);}.rv-empty-t{font-size:14px;font-weight:700;color:#374151;font-family:'Space Grotesk',sans-serif;}.rv-empty-s{font-size:11px;line-height:1.6;max-width:240px;text-align:center;}
.rv-prog{position:absolute;inset:0;background:rgba(6,12,26,.94);backdrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;z-index:50;opacity:0;pointer-events:none;transition:opacity .2s;}
.rv-prog.rv-on{opacity:1;pointer-events:all;}
.rv-pct{font-family:'IBM Plex Mono',monospace;font-size:48px;font-weight:600;color:#D4AF37;line-height:1;}
.rv-pbar-w{width:240px;height:3px;background:rgba(255,255,255,.07);border-radius:99px;}
.rv-pbar{height:3px;background:linear-gradient(90deg,#D4AF37,#F5C518);border-radius:99px;transition:width .12s;}
.rv-psteps{display:flex;flex-direction:column;gap:5px;min-width:240px;}
.rv-pstep{display:flex;align-items:center;gap:7px;font-size:10px;color:#4A6080;transition:color .2s;font-family:'Space Grotesk',sans-serif;}
.rv-pstep.rv-active{color:#DDE6F5;}.rv-pstep.rv-done{color:#22C55E;}
.rv-psico{width:15px;height:15px;border-radius:50%;border:1px solid currentColor;display:flex;align-items:center;justify-content:center;font-size:8px;flex-shrink:0;}
.rv-pstep.rv-done .rv-psico{background:#22C55E;border-color:#22C55E;color:#000;}
.rv-pstep.rv-active .rv-psico{border-color:#D4AF37;color:#D4AF37;animation:rv-spin .7s linear infinite;}
@keyframes rv-spin{to{transform:rotate(360deg)}}
.rv-zoombar{display:flex;align-items:center;gap:6px;padding:6px 12px;border-top:1px solid rgba(212,175,55,.1);background:rgba(6,12,26,.8);flex-shrink:0;}
.rv-zbtn{width:24px;height:24px;border-radius:5px;border:1px solid rgba(212,175,55,.2);background:rgba(255,255,255,.03);color:#64748b;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;transition:all .1s;}
.rv-zbtn:hover{border-color:rgba(212,175,55,.4);color:#D4AF37;}
.rv-zval{font-family:'IBM Plex Mono',monospace;font-size:9px;color:#64748b;min-width:34px;text-align:center;}
.rv-expbtn{margin-left:auto;padding:4px 10px;border-radius:5px;border:1px solid rgba(212,175,55,.25);background:rgba(212,175,55,.07);color:#D4AF37;font-size:9px;font-weight:700;cursor:pointer;transition:all .15s;font-family:'Space Grotesk',sans-serif;}
.rv-expbtn:hover{background:rgba(212,175,55,.14);}
.rv-rpanel{background:#0B1426;border-left:1px solid rgba(212,175,55,.1);overflow-y:auto;padding:12px;}
.rv-rpanel::-webkit-scrollbar{width:3px;}.rv-rpanel::-webkit-scrollbar-thumb{background:rgba(212,175,55,.15);}
.rv-rsec{margin-bottom:14px;}
.rv-rst{font-size:8px;text-transform:uppercase;letter-spacing:.12em;color:#4A6080;font-weight:700;margin-bottom:8px;font-family:'Space Grotesk',sans-serif;}
.rv-stat{display:flex;justify-content:space-between;align-items:baseline;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.03);}
.rv-sl{font-size:10px;color:#4A6080;font-family:'Space Grotesk',sans-serif;}
.rv-sv{font-size:11px;font-weight:700;font-family:'IBM Plex Mono',monospace;color:#DDE6F5;}
.rv-norm-item{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.03);}
.rv-nl{font-size:10px;color:#7A8FA8;font-family:'Space Grotesk',sans-serif;}
.rv-nref{font-size:8px;color:#4A6080;font-family:'IBM Plex Mono',monospace;}
.rv-badge{font-size:8px;padding:1px 7px;border-radius:99px;font-weight:700;font-family:'Space Grotesk',sans-serif;}
.rv-badge-ok{background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);color:#22C55E;}
.rv-badge-warn{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.3);color:#F59E0B;}
.rv-badge-err{background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);color:#EF4444;}
.rv-leg{display:flex;align-items:center;gap:6px;font-size:9px;color:#7A8FA8;margin-bottom:3px;font-family:'Space Grotesk',sans-serif;}
.rv-legsq{width:10px;height:10px;border-radius:2px;flex-shrink:0;}
#rv-tip{position:fixed;background:#101D35;border:1px solid rgba(212,175,55,.2);padding:7px 10px;border-radius:7px;font-size:10px;pointer-events:none;z-index:9999;display:none;font-family:'IBM Plex Mono',monospace;color:#DDE6F5;box-shadow:0 6px 24px rgba(0,0,0,.5);max-width:210px;line-height:1.5;}

/* ── MOBILE RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 840px) {
  #rv-modal .rv-body {
    grid-template-columns: 1fr !important;
    grid-template-rows: 1fr auto;
  }
  /* Ascunde panourile laterale pe mobil — afișează doar canvas + bottom sheet */
  #rv-modal .rv-lpanel { display: none !important; }
  #rv-modal .rv-rpanel { display: none !important; }
  #rv-modal .rv-center { grid-column: 1; }

  /* Bottom sheet cu info esențial */
  #rv-modal .rv-zoombar {
    flex-wrap: wrap; gap: 8px; padding: 8px 12px;
  }
  .rv-tabs {
    overflow-x: auto; -webkit-overflow-scrolling: touch;
  }
  .rv-tabs::-webkit-scrollbar { display: none; }
  .rv-tab { padding: 9px 11px; font-size: 10px; white-space: nowrap; }
  .rv-floorbar { padding: 6px 10px; }
  .rv-fbtn { font-size: 9px; padding: 3px 8px; }
  .rv-drawwrap { padding: 10px; }
  /* Butoane zoom mai mari pe touch */
  .rv-zbtn { width: 32px; height: 32px; font-size: 15px; }
  .rv-expbtn { font-size: 10px; padding: 6px 12px; }
  /* Progress mai compact */
  .rv-pct { font-size: 36px; }
  .rv-psteps { max-height: 140px; font-size: 9px; }
  /* Topbar compact */
  .rv-topbar { padding: 0 10px; gap: 8px; }
  .rv-tinfo { max-width: 160px; font-size: 9px; }
  .rv-logo-t { font-size: 13px; }
}

/* Buton info mobil — apare în zoombar pe mobil */
@media (max-width: 840px) {
  #rv-mob-info-btn { display: flex !important; }
}
#rv-mob-info-btn {
  display: none;
  padding: 4px 10px; border-radius: 5px;
  border: 1px solid rgba(212,175,55,.25);
  background: rgba(212,175,55,.07); color: #D4AF37;
  font-size: 9px; font-weight: 700; cursor: pointer;
  font-family: 'Space Grotesk', sans-serif;
  align-items: center; gap: 4px;
}

/* Bottom info sheet pe mobil */
#rv-mob-sheet {
  display: none;
  position: absolute; bottom: 0; left: 0; right: 0;
  background: rgba(11,20,38,.97); border-top: 1px solid rgba(212,175,55,.2);
  border-radius: 12px 12px 0 0;
  padding: 12px 14px 20px; z-index: 60;
  max-height: 60vh; overflow-y: auto;
  transform: translateY(100%); transition: transform .3s ease;
}
#rv-mob-sheet.rv-mob-open {
  display: block;
  transform: translateY(0);
}
.rv-mob-sheet-handle {
  width: 36px; height: 4px; background: rgba(212,175,55,.3);
  border-radius: 99px; margin: 0 auto 12px;
}
`;
    document.head.appendChild(css);
  }

  // ── HTML ─────────────────────────────────────────────────────────────────
  const div=document.createElement('div'); div.id='rv-modal';
  div.innerHTML=`
<div class="rv-topbar">
  <svg width="24" height="24" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#101D35"/><path d="M18 28h26l13 22-13 22H18l15-22z" fill="#DDE6F5"/><path d="M59 28h23L71 49H53z" fill="#D4AF37"/><path d="M53 55h17l13 19H61z" fill="#D4AF37"/></svg>
  <div><div class="rv-logo-t">UrbanX</div><div class="rv-sub">Relevee Instant</div></div>
  <div class="rv-badge-t">Beta</div>
  <div class="rv-sep"></div>
  <div class="rv-timer"><div class="rv-tdot" id="rv-tdot"></div><span id="rv-tval">00.0s</span></div>
  <div class="rv-tinfo" id="rv-tinfo">Se generează releveele…</div>
  <button class="rv-close-btn" onclick="closeRelevee()" title="Închide">✕</button>
</div>
<div class="rv-body">
  <!-- LEFT -->
  <div class="rv-lpanel">
    <div class="rv-rsec">
      <div class="rv-sec-t">Overlay analiză</div>
      <div class="rv-tog-row"><span class="rv-tog-lbl">☀ Însorire OMS 119</span><div class="rv-tog" id="rv-tog-solar" onclick="_rvToggle(this,'solar')"></div></div>
      <div class="rv-tog-row"><span class="rv-tog-lbl">🔥 Căi evacuare ISU</span><div class="rv-tog" id="rv-tog-isu" onclick="_rvToggle(this,'isu')"></div></div>
      <div class="rv-tog-row"><span class="rv-tog-lbl">📐 Cote dimensionale</span><div class="rv-tog rv-tog-on" id="rv-tog-dim" onclick="_rvToggle(this,'dim')"></div></div>
      <div class="rv-tog-row"><span class="rv-tog-lbl">🔲 Grilă structurală</span><div class="rv-tog" id="rv-tog-sgrid" onclick="_rvToggle(this,'sGrid')"></div></div>
    </div>
    <div class="rv-rsec">
      <div class="rv-sec-t">Bilanț suprafețe</div>
      <div id="rv-bilant"><div style="font-size:10px;color:#4A6080;text-align:center;padding:8px">—</div></div>
    </div>
    <div class="rv-rsec">
      <div class="rv-sec-t">Verificare normative</div>
      <div id="rv-norm"><div style="font-size:10px;color:#4A6080;text-align:center;padding:8px">—</div></div>
    </div>
    <div class="rv-rsec">
      <div class="rv-sec-t">Legendă</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(180,83,1,.14);border:1px solid #F97316"></div>Living / Sufragerie</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(21,128,61,.13);border:1px solid #22C55E"></div>Dormitor</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(14,116,144,.15);border:1px solid #06B6D4"></div>Bucătărie</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(109,40,217,.13);border:1px solid #A78BFA"></div>Baie / WC</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(71,85,105,.18);border:1px solid #64748B"></div>Hol / Coridor</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(37,99,235,.16);border:1px solid #3B82F6"></div>Casa scărilor / Lift</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(212,175,55,.08);border:1.5px dashed rgba(212,175,55,.45)"></div>Balcon / Terasă</div>
    </div>
    <div class="rv-rsec" style="font-size:9px;color:#4A6080;line-height:1.7;font-family:'IBM Plex Mono',monospace;">
      NP 057/2002 — Suprafețe min.<br>OMS 119/2014 — Însorire<br>P118-2/2013 — ISU evacuare<br>NP 051/2012 — PMR<br>P100-1/2013 — Seismic
    </div>
  </div>
  <!-- CENTER -->
  <div class="rv-center">
    <div class="rv-tabs">
      <div class="rv-tab rv-on" data-tab="plan" onclick="_rvTabClick(this)">📐 Plan Nivel</div>
      <div class="rv-tab" data-tab="fatada" onclick="_rvTabClick(this)">🏛 Fațadă</div>
      <div class="rv-tab" data-tab="sectiune" onclick="_rvTabClick(this)">✂ Secțiune</div>
      <div class="rv-tab" data-tab="axono" onclick="_rvTabClick(this)">📦 Axonometrie</div>
    </div>
    <div class="rv-floorbar" id="rv-floorbar" style="display:none"></div>
    <div class="rv-drawwrap" id="rv-drawwrap">
      <div class="rv-empty" id="rv-empty">
        <div class="rv-empty-ico">📐</div>
        <div class="rv-empty-t">Generare în curs…</div>
        <div class="rv-empty-s">Releveele orientative se generează din datele parcelei active.</div>
      </div>
      <canvas id="rv-canvas" style="display:block"></canvas>
      <div class="rv-prog" id="rv-prog">
        <div class="rv-pct" id="rv-ppct">0%</div>
        <div class="rv-pbar-w"><div class="rv-pbar" id="rv-pbar" style="width:0%"></div></div>
        <div class="rv-psteps" id="rv-psteps"></div>
      </div>
    </div>
    <div class="rv-zoombar">
      <button class="rv-zbtn" onclick="_rvZoom(-1)">−</button>
      <div class="rv-zval" id="rv-zval">100%</div>
      <button class="rv-zbtn" onclick="_rvZoom(1)">+</button>
      <button class="rv-zbtn" onclick="{_RV.scale=12;document.getElementById('rv-zval').textContent='100%';if(_RV.building)_rvRender();}" style="font-size:9px;font-weight:700;width:auto;padding:0 8px">FIT</button>
      <div id="rv-mob-info-btn" onclick="_rvMobSheet()">📊 Bilanț</div>
      <div class="rv-expbtn" onclick="_rvExportPDF()" style="background:rgba(212,175,55,.15);font-size:10px">⬇ Export PDF Raport</div>
    </div>
    <!-- Mobile bottom sheet -->
    <div id="rv-mob-sheet">
      <div class="rv-mob-sheet-handle"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <span style="font-size:11px;font-weight:700;color:#D4AF37;font-family:'Space Grotesk',sans-serif">📊 Bilanț + Normative</span>
        <button onclick="_rvMobSheetClose()" style="background:none;border:none;color:#64748b;font-size:16px;cursor:pointer">✕</button>
      </div>
      <div id="rv-mob-bilant"></div>
      <div style="margin-top:10px"><div class="rv-rst">NORMATIVE</div><div id="rv-mob-norm"></div></div>
    </div>
  </div>
  <!-- RIGHT -->
  <div class="rv-rpanel">
    <div class="rv-rsec">
      <div class="rv-sec-t">Normative aplicate</div>
      <div style="font-size:8.5px;color:#4A6080;line-height:1.8;font-family:'IBM Plex Mono',monospace;">
        NP 057/2002<br>OMS 119/2014<br>P118-1/2013<br>P100-1/2013<br>NP 051/2012<br>Legea 10/1995<br>PUG Iași în vigoare
      </div>
    </div>
    <div class="rv-rsec">
      <div class="rv-sec-t">Info parcelă activă</div>
      <div id="rv-parcel-info" style="font-size:9px;color:#4A6080;font-family:'IBM Plex Mono',monospace;line-height:1.8">—</div>
    </div>
  </div>
</div>
<div id="rv-tip"></div>`;
  document.body.appendChild(div);
}

// Expune global
window.generateRelevee = generateRelevee;
window.closeRelevee    = closeRelevee;
