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

  // ── Scenariul Demolare: ignorăm construcțiile existente ─────────────
  // Când utilizatorul a selectat scenariu "Demolare" în AEDIS,
  // releveele și studiile trebuie să reflecte terenul LIBER, nu construcțiile
  // demolate. Context OSM și S.vol._lastFeats nu mai sunt relevante.
  const isDemolare = (typeof AEDIS !== 'undefined') &&
    (AEDIS.scenariu === 'demolare' || AEDIS._demolishActive);
  const existentH  = isDemolare ? 0 : null; // ignoram constructia existenta

  // Estimăm dimensiunile parcelei din bbox
  const bbox  = turf.bbox(ap.geo);
  const bboxW = turf.distance({type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[1]]}},
                               {type:'Feature',geometry:{type:'Point',coordinates:[bbox[2],bbox[1]]}},{units:'meters'});
  const bboxD = turf.distance({type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[1]]}},
                               {type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[3]]}},{units:'meters'});

  // Orientare din AEDIS sau estimată din bbox
  const frontDir = S.vol?.frontDir || ap.frontDir || 'N';

  // Înălțimea din AEDIS dacă e generat, altfel din params sau din regulament
  // În scenariul Demolare, ignorăm înălțimea construcției existente
  const aedisH   = isDemolare ? null :
    (S.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0) || null);
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
    effW = Math.max(P.W, Math.sqrt(P.area * 0.8));
    effD = Math.max(P.D, P.area / effW);
  }
  const bW   = Math.max(6, effW - P.rl * 2);

  // ── Adâncimea clădirii: rezidențial → coridor dublu încărcat (max 26m) ───
  // Un bloc de apartamente realist are max 25-26m adâncime:
  //   rândul NORD 9-10m + nuclee 6.6m + rândul SUD 9-10m = ~25m
  // Restul parcelei (sub 26m) devine curte/parcare/spații verzi.
  const _fnRez = !String(P.fn||'').toLowerCase().includes('birouri') &&
                 !String(P.fn||'').toLowerCase().includes('hotel');
  const bD_raw = Math.max(6, effD - P.rf - P.rs);
  const bD   = _fnRez ? Math.min(26, bD_raw) : bD_raw;

  const scArea   = Math.min(bW * bD, Math.max(P.area * P.pot, 36));
  const sdaTarget= P.area * P.cut;
  const niv  = Math.min(P.niv, Math.max(1, Math.round(sdaTarget / scArea)));
  const sdaTotal = scArea * niv;

  // Nuclee scări+lift — 1 nucleu la fiecare 18m (P118-2/2013: max 30m coridoc evacuare)
  // Exemplu: 23m → 1 nucleu; 36m → 2; 54m → 3
  const nStairs = Math.max(1, Math.min(6, Math.floor(bW / 18.0)));
  const stairW  = 3.6;
  const stairD  = Math.min(6.6, bD * 0.5);
  const colSp   = bW / nStairs;
  const cores   = Array.from({length:nStairs}, (_,i) => ({
    x: colSp*(i+0.5) - stairW/2,
    y: (bD - stairD) / 2,   // centrat pe adâncimea clădirii
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

// ── _rvFillApt: umple COMPLET un dreptunghi W×D cu camere de apartament ────────
// Nicio bucată goală — fiecare m² are o funcțiune clară.
// isFlipped=false → balcon sus (față stradă), hol jos (lângă nucleu) — rândul NORD
// isFlipped=true  → hol sus (lângă nucleu), balcon jos (curte/grădină) — rândul SUD
function _rvFillApt(x0, y0, W, D, aptIdx, isFlipped){
  const rms=[];
  if(W<1.5||D<3.0) return rms;
  const push=(t,x,y,w,h,lbl,bal=false)=>{
    if(w<0.3||h<0.3) return;
    rms.push({t,lbl,bal,apt:aptIdx,x:x0+x,y:y0+y,w,h,normMin:_RV_NP057[t]||0});
  };
  // ── Zone proporționale (suma = D exact) ─────────────────────────────────
  const r_bal =Math.max(0.9, Math.min(1.4,  D*0.11));  // balcon
  const r_hol =Math.max(1.0, Math.min(2.0,  D*0.12));  // hol intrare
  const r_serv=Math.max(2.0, Math.min(3.5,  D*0.26));  // servicii (baie+wc+bucătărie)
  const r_noapt=Math.max(2.4, Math.min(4.5, D*0.29));  // dormitoare
  const r_zi  =Math.max(2.5, D-r_bal-r_hol-r_serv-r_noapt); // living — restul
  const sum=r_bal+r_hol+r_serv+r_noapt+r_zi;
  const f=D/sum; // factor corecție
  const bH=r_bal*f, hH=r_hol*f, sH=r_serv*f, nH=r_noapt*f, lH=r_zi*f;

  // ── Dimensiuni lățimi funcționale ──────────────────────────────────────
  const kW=Math.max(1.8, Math.min(W*0.38, 3.5));   // bucătărie (lătime)
  const livW=W-kW;                                   // living (restul lățimii)
  const bathW=Math.max(1.1, Math.min(W*0.44, 2.2)); // baie
  const wcW=Math.max(0.7, Math.min(W*0.22, 1.3));   // wc
  const holSW=Math.max(0, W-bathW-wcW);              // hol servicii (restul)
  const d1W=Math.round(W*0.55*10)/10;                // dormitor principal
  const d2W=W-d1W;                                   // dormitor 2

  const drawNoapte=(y_)=>{
    if(W>=5.5){
      push('bedroom',  0,   y_, d1W, nH, 'Dorm. 1');
      push('bedroom2', d1W, y_, d2W, nH*0.7, 'Dorm. 2');
      if(nH*0.3>0.5) push('storage', d1W, y_+nH*0.7, d2W, nH*0.3, 'Dep.');
    } else if(W>=3.5){
      push('bedroom', 0, y_, W, nH, 'Dormitor');
    } else {
      push('bedroom', 0, y_, W, nH, 'Dorm.');
    }
  };
  const drawServ=(y_)=>{
    push('bath',  0,             y_, bathW,  sH,        'Baie');
    push('wc',    bathW,         y_, wcW,    sH*0.65,   'WC');
    if(holSW>0.3) push('hall',   bathW+wcW,  y_, holSW, sH, 'Hol');
    if(sH*0.35>0.4) push('storage', bathW,  y_+sH*0.65, wcW, sH*0.35, 'Dep.');
  };
  const drawZiSi=(y_)=>{
    push('living',  0,    y_, livW, lH,        'Living');
    push('kitchen', livW, y_, kW,   lH*0.65,   'Bucătărie');
    if(lH*0.35>0.5) push('storage', livW, y_+lH*0.65, kW, lH*0.35, 'Dep.');
  };

  if(!isFlipped){
    // NORD: balcon sus → zi → noapte → servicii → hol
    let y=0;
    push('balcon',0,y,W,bH,'Balcon',true); y+=bH;
    drawZiSi(y); y+=lH;
    drawNoapte(y); y+=nH;
    drawServ(y);   y+=sH;
    push('hall',0,y,W,hH,'Hol apartament');
  } else {
    // SUD: hol sus → servicii → noapte → zi → balcon
    let y=0;
    push('hall',0,y,W,hH,'Hol apartament'); y+=hH;
    drawServ(y);   y+=sH;
    drawNoapte(y); y+=nH;
    drawZiSi(y);   y+=lH;
    push('balcon',0,y,W,bH,'Balcon',true);
  }
  return rms;
}

function _rvFloor(b, floorIdx){
  const {bW, bD, cores, P} = b;
  const isGround = floorIdx === 0;
  const fnKey    = _rvMix(P);
  const rects    = [];

  // ── Apartamente rezidențiale ─────────────────────────────────────────────
  if(fnKey === 'rezCol'){
    // ── Limite spațiu disponibil ──────────────────────────────────────────
    const northMaxD  = cores.length > 0 ? cores[0].y : bD*0.4;
    const southStart = cores.length > 0 ? cores[0].y+cores[0].h : bD*0.6;
    const southAvailD= bD-southStart;
    const hasDoubleCorridor = southAvailD >= 4.0;

    // ── Nuclee scări+lift ─────────────────────────────────────────────────
    cores.forEach(core=>{
      rects.push({t:'core', x:core.x, y:core.y, w:core.w, h:core.h,
        lbl:b.niv>3?'🪜 Sc.\n🛗 Lift':'🪜 Scări', apt:-1});
    });

    // ── Coridor orizontal (bandă între apartamente Nord și nuclee) ─────────
    if(hasDoubleCorridor && northMaxD>0.5){
      const corrH=Math.max(1.0, Math.min(2.0, cores[0].y-northMaxD*0.88));
      const corrY=northMaxD-corrH;
      if(corrH>0.4 && corrY>0)
        rects.push({t:'hall',x:0,y:corrY,w:bW,h:corrH,lbl:'Coridor etaj',apt:-3,zIdx:-1,normMin:0});
    }

    // ── Generăm un dreptunghi de apartament pentru fiecare coloană ────────
    // Coloana = spațiul dintre 2 nuclee consecutive (sau margine-nucleu)
    const colBounds=[];
    if(cores.length===1){
      colBounds.push({xL:0, xR:cores[0].x});                       // stânga
      colBounds.push({xL:cores[0].x+cores[0].w, xR:bW});           // dreapta
    } else {
      colBounds.push({xL:0, xR:cores[0].x});
      for(let i=0;i<cores.length-1;i++)
        colBounds.push({xL:cores[i].x+cores[i].w, xR:cores[i+1].x});
      colBounds.push({xL:cores[cores.length-1].x+cores[cores.length-1].w, xR:bW});
    }

    colBounds.forEach(({xL,xR},ci)=>{
      const W=xR-xL;
      if(W<1.5) return; // prea îngust
      // Rândul NORD — umplu complet [xL..xR] × [0..northMaxD]
      if(northMaxD>=3.5)
        _rvFillApt(xL, 0, W, northMaxD, ci*2, false)
          .forEach(r=>rects.push(r));
      // Rândul SUD — umplu complet [xL..xR] × [southStart..bD]
      if(hasDoubleCorridor && southAvailD>=3.5)
        _rvFillApt(xL, southStart, W, southAvailD, ci*2+1, true)
          .forEach(r=>rects.push(r));
    });

    // ── Hol intrare parter ────────────────────────────────────────────────
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
  // ── Curăță handler-ul de hover când NU suntem pe Plan ─────────────────────
  // Bug: hover-ul de plan (tooltip camere) rămâne activ pe canvas la switch tab
  if(_RV.tab !== 'plan'){
    const cv_=document.getElementById('rv-canvas');
    if(cv_){ cv_.onmousemove=null; cv_.onmouseleave=null; }
    const tip=document.getElementById('rv-tip');
    if(tip) tip.style.display='none';
  }
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

  // ── PEREȚI: borduri groase + hașuri structurale ──────────────────────────
  const wallPx = Math.max(2, SC * 0.17); // ~17cm perete non-structural
  const extWallPx = Math.max(3, SC * 0.25); // ~25cm perete exterior/structural

  // Hașuri diagonale pentru elemente structurale (cores, pereți BA)
  function _hatch(x,y,w,h,col,sp){
    ctx.save();
    ctx.beginPath(); ctx.rect(x,y,w,h); ctx.clip();
    ctx.strokeStyle=col||'rgba(20,40,90,0.28)'; ctx.lineWidth=0.7;
    for(let i=-(Math.max(w,h));i<w+Math.max(w,h);i+=sp||Math.max(4,SC*0.35)){
      ctx.beginPath(); ctx.moveTo(x+i,y); ctx.lineTo(x+i+h,y+h); ctx.stroke();
    }
    ctx.restore();
  }

  // Pasul 1: peretele exterior clădirii (cel mai gros)
  ctx.save();
  ctx.strokeStyle='rgba(5,12,40,0.96)';
  ctx.lineWidth=extWallPx;
  ctx.strokeRect(ox+extWallPx*.5,oy+extWallPx*.5,bW*SC-extWallPx,bD*SC-extWallPx);
  // Hașura peretelui exterior
  _hatch(ox,oy,extWallPx*1.5,bD*SC,'rgba(15,30,70,0.22)',Math.max(3,SC*0.25));           // V
  _hatch(ox+bW*SC-extWallPx*1.5,oy,extWallPx*1.5,bD*SC,'rgba(15,30,70,0.22)',Math.max(3,SC*0.25)); // E
  _hatch(ox,oy,bW*SC,extWallPx*1.5,'rgba(15,30,70,0.22)',Math.max(3,SC*0.25));            // N
  _hatch(ox,oy+bD*SC-extWallPx*1.5,bW*SC,extWallPx*1.5,'rgba(15,30,70,0.22)',Math.max(3,SC*0.25)); // S
  ctx.restore();

  // Pasul 2: borduri camere (pereți interiori)
  [...fl.rects].sort((a,m_)=>(a.zIdx||0)-(m_.zIdx||0)).forEach(r=>{
    if(r.bal) return;
    const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
    const wp = r.t==='core' ? wallPx*1.3 : wallPx;
    ctx.strokeStyle = r.t==='core' ? 'rgba(5,15,45,0.95)' : 'rgba(12,25,60,0.75)';
    ctx.lineWidth = wp;
    ctx.setLineDash([]);
    ctx.strokeRect(rx+wp*.5,ry+wp*.5,rw-wp,rh-wp);
    // Hașura structurală (cores — beton armat)
    if(r.t==='core'){
      _hatch(rx+wp,ry+wp,rw-wp*2,rh-wp*2,'rgba(20,50,120,0.30)',Math.max(3,SC*0.3));
    }
  });

  // Pasul 3: ferestre — goluri albe în perete + linie dublă
  fl.wins.forEach(w=>{
    ctx.fillStyle='rgba(56,189,248,.18)';
    ctx.strokeStyle='#38BDF8'; ctx.lineWidth=2;
    const wSC = (w.w||w.h||0)*SC;
    let gx,gy,gw,gh;
    if(w.wall==='N'){gx=ox+w.x*SC;gy=oy-extWallPx;gw=wSC;gh=extWallPx*2;}
    else if(w.wall==='S'){gx=ox+w.x*SC;gy=oy+bD*SC-extWallPx;gw=wSC;gh=extWallPx*2;}
    else if(w.wall==='V'){gx=ox-extWallPx;gy=oy+w.y*SC;gw=extWallPx*2;gh=wSC;}
    else{gx=ox+bW*SC-extWallPx;gy=oy+w.y*SC;gw=extWallPx*2;gh=wSC;}
    // Gol alb în perete
    ctx.fillStyle='rgba(8,15,35,.98)'; ctx.fillRect(gx,gy,gw,gh);
    // Linie fereastră (3 linii: toc + sticlă)
    ctx.fillStyle='rgba(56,189,248,.15)'; ctx.fillRect(gx,gy,gw,gh);
    ctx.strokeStyle='#38BDF8'; ctx.lineWidth=1.8;
    ctx.strokeRect(gx+1,gy+1,gw-2,gh-2);
    // Linia centrală (cercevelele ferestrei)
    ctx.strokeStyle='rgba(56,189,248,.5)'; ctx.lineWidth=0.8;
    if(w.wall==='N'||w.wall==='S'){
      ctx.beginPath(); ctx.moveTo(gx+gw/2,gy); ctx.lineTo(gx+gw/2,gy+gh); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx,gy+gh/2); ctx.lineTo(gx+gw,gy+gh/2); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(gx,gy+gh/2); ctx.lineTo(gx+gw,gy+gh/2); ctx.stroke();
    }
  });

  // Pasul 4: uși — arc + foaie ușă
  fl.doors.forEach(d=>{
    const dx=ox+d.x*SC, dw=d.w*SC;
    const isMain=d.type==='main';
    const dy_d = d.y!==undefined ? oy+d.y*SC : oy+bD*SC;
    // Golul în perete (alb)
    if(d.swing==='out'||isMain){
      ctx.fillStyle='rgba(8,15,35,.98)'; ctx.fillRect(dx-1,dy_d-extWallPx,dw+2,extWallPx*2);
    }
    // Foaia ușii (linie subțire)
    ctx.strokeStyle=isMain?'#F59E0B':'rgba(203,213,225,.7)';
    ctx.lineWidth=isMain?2.5:1.5;
    ctx.beginPath();
    if(isMain||d.swing==='out'){
      ctx.moveTo(dx,dy_d); ctx.lineTo(dx+dw,dy_d); ctx.stroke();
      // Arc deschidere
      ctx.strokeStyle=isMain?'rgba(245,158,11,.5)':'rgba(203,213,225,.3)';
      ctx.lineWidth=1;
      ctx.beginPath(); ctx.arc(dx,dy_d,dw,-Math.PI/2,0); ctx.stroke();
    } else if(d.swing==='right'){
      ctx.moveTo(dx,dy_d-wallPx); ctx.lineTo(dx+dw,dy_d-wallPx); ctx.stroke();
      ctx.beginPath(); ctx.arc(dx,dy_d-wallPx,dw,0,Math.PI/2); ctx.stroke();
    } else {
      ctx.moveTo(dx,dy_d-wallPx); ctx.lineTo(dx+dw,dy_d-wallPx); ctx.stroke();
      ctx.beginPath(); ctx.arc(dx+dw,dy_d-wallPx,dw,Math.PI/2,Math.PI); ctx.stroke();
    }
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
  const {P,bW,bD,niv,cores}=b; const Ht=niv*P.hn; const SC=_RV.scale*.85;
  const pad=40;
  // Toate 4 fațade în layout vertical: N(principal), S(posterior), E(lateral), V(lateral)
  const facadeW_NS=bW*SC, facadeW_EV=bD*SC, facadeH=Ht*SC;
  const sectionH=facadeH+80; // h per facade + labels
  const W=Math.max(facadeW_NS,facadeW_EV)+pad*2+120;
  const H=sectionH*4+pad;
  const {cv,ctx}=_rvInitCanvas(W,H);
  ctx.fillStyle='#060C1A';ctx.fillRect(0,0,W,H);

  // ── Helper: desenare o fațadă ──────────────────────────────────────────────
  function drawOneFacade(label,fW,ox_,oy_,isMain,matZones){
    // Header label
    ctx.fillStyle='rgba(212,175,55,.15)';ctx.fillRect(pad-5,oy_-22,fW+10,20);
    ctx.strokeStyle='rgba(212,175,55,.3)';ctx.lineWidth=1;ctx.strokeRect(pad-5,oy_-22,fW+10,20);
    ctx.fillStyle='#D4AF37';ctx.font='bold 10px Space Grotesk';ctx.textAlign='left';
    ctx.fillText('FAȚADĂ '+label+(isMain?' ◀ PRINCIPALĂ (FRONT STRADAL)':''),pad,oy_-7);
    ctx.textAlign='left';

    // Building fill
    ctx.fillStyle='rgba(17,27,50,.95)'; ctx.fillRect(ox_,oy_,fW,facadeH);
    ctx.strokeStyle='#CBD5E1'; ctx.lineWidth=2.5; ctx.strokeRect(ox_,oy_,fW,facadeH);

    // Sol
    ctx.fillStyle='rgba(60,80,100,.3)'; ctx.fillRect(ox_-10,oy_+facadeH,fW+20,8);
    ctx.strokeStyle='rgba(100,120,150,.5)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(ox_-20,oy_+facadeH); ctx.lineTo(ox_+fW+40,oy_+facadeH); ctx.stroke();
    ctx.fillStyle='#475569'; ctx.font='8px IBM Plex Mono';
    ctx.fillText('COTA ±0.00 (CTN)',ox_,oy_+facadeH+20);

    // Planșee (linii orizontale inter-etaj)
    for(let i=1;i<niv;i++){
      const ly=oy_+facadeH-i*P.hn*SC;
      ctx.fillStyle='rgba(203,213,225,.10)'; ctx.fillRect(ox_,ly-3,fW,3);
      ctx.strokeStyle='rgba(203,213,225,.2)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(ox_,ly); ctx.lineTo(ox_+fW,ly); ctx.stroke();
      ctx.fillStyle='#64748b'; ctx.font='7px IBM Plex Mono';
      ctx.fillText(i===0?'P':`E${i}`,ox_-28,ly+4);
      ctx.fillStyle='rgba(212,175,55,.5)'; ctx.font='7px IBM Plex Mono';
      ctx.fillText('+'+(i*P.hn).toFixed(2)+'m',ox_-28,ly+12);
    }
    ctx.fillStyle='#64748b'; ctx.font='7px IBM Plex Mono';
    ctx.fillText('P',ox_-14,oy_+facadeH-4);
    ctx.fillStyle='rgba(212,175,55,.5)'; ctx.font='7px IBM Plex Mono';
    ctx.fillText('+0.00',ox_-28,oy_+facadeH-4+8);

    // Ferestre
    const wCols=Math.max(3,Math.floor(fW/(SC*3.2)));
    const wW=Math.min(fW/wCols*.58,1.9*SC);
    const wH=P.hn*.44*SC; const colSp_=fW/wCols; const coreCol_=Math.floor(wCols/2);
    for(let row=0;row<niv;row++){
      const wy=oy_+facadeH-(row+1)*P.hn*SC+(P.hn*SC-wH)*.28;
      for(let col=0;col<wCols;col++){
        if(col===coreCol_){
          // Nucleu scărilor (fara geam, culoare diferita)
          ctx.fillStyle='rgba(37,99,235,.18)'; ctx.fillRect(ox_+col*colSp_+(colSp_-wW*.45)/2,wy,wW*.45,wH);
          ctx.strokeStyle='rgba(59,130,246,.5)'; ctx.lineWidth=1; ctx.strokeRect(ox_+col*colSp_+(colSp_-wW*.45)/2,wy,wW*.45,wH);
          continue;
        }
        const wx_=ox_+col*colSp_+(colSp_-wW)/2;
        // Solicitare solara: fațadele S/SE/SV au geamuri mai luminoase
        const solarBoost=(['S','SE','SV'].includes(P.frontDir)&&isMain)||(['N','NE','NV'].includes(P.frontDir)&&!isMain);
        ctx.fillStyle=`rgba(56,189,248,${solarBoost?.40:.18})`; ctx.fillRect(wx_,wy,wW,wH);
        ctx.strokeStyle='#38BDF8'; ctx.lineWidth=1.5; ctx.strokeRect(wx_,wy,wW,wH);
        // Cercevele
        ctx.strokeStyle='rgba(56,189,248,.4)'; ctx.lineWidth=.6;
        ctx.beginPath();ctx.moveTo(wx_+wW/2,wy);ctx.lineTo(wx_+wW/2,wy+wH);ctx.stroke();
        ctx.beginPath();ctx.moveTo(wx_,wy+wH/2);ctx.lineTo(wx_+wW,wy+wH/2);ctx.stroke();
      }
    }

    // Balcoane (benzi orizontale)
    for(let row=1;row<niv;row++){
      const bz=oy_+facadeH-row*P.hn*SC-4;
      ctx.fillStyle='rgba(212,175,55,.08)'; ctx.fillRect(ox_+8,bz,fW-16,5);
      ctx.strokeStyle='rgba(212,175,55,.35)'; ctx.lineWidth=1; ctx.strokeRect(ox_+8,bz,fW-16,5);
    }

    // Uța principală (doar fațada principală, parter)
    if(isMain){
      const doorW=2.4*SC,doorH=3.0*SC;
      const dX=ox_+fW/2-doorW/2,dY=oy_+facadeH-doorH;
      ctx.fillStyle='rgba(245,158,11,.15)'; ctx.fillRect(dX,dY,doorW,doorH);
      ctx.strokeStyle='#F59E0B'; ctx.lineWidth=2; ctx.strokeRect(dX,dY,doorW,doorH);
      ctx.strokeStyle='rgba(245,158,11,.5)'; ctx.lineWidth=.8;
      ctx.beginPath();ctx.moveTo(dX+doorW/2,dY);ctx.lineTo(dX+doorW/2,dY+doorH);ctx.stroke();
      ctx.fillStyle='rgba(245,158,11,.6)'; ctx.font='bold 7px IBM Plex Mono'; ctx.textAlign='center';
      ctx.fillText('INTRARE',dX+doorW/2,dY+doorH+9); ctx.textAlign='left';
    }

    // Zone materiale (annotate pe dreapta)
    const matLbls=matZones||[
      {y:0,h:1,'mat':'Tencuiala decorativa siliconata','col':'#F97316','cod':'RAL 9001 / 7035'},
      {y:1,h:niv-1,'mat':'Tencuiala siliconata + EPS 15cm','col':'#D4AF37','cod':'U=0.27 W/m²K'},
      {y:0,h:niv,'mat':'Tamplarie PVC 5cam. + geam triplu low-E','col':'#38BDF8','cod':'Uw≤1.0 W/m²K'},
    ];
    // Sidebar materiale
    const sbX=ox_+fW+10;
    ctx.fillStyle='rgba(8,16,32,.9)'; ctx.fillRect(sbX,oy_,100,facadeH);
    ctx.strokeStyle='rgba(212,175,55,.2)'; ctx.lineWidth=.5; ctx.strokeRect(sbX,oy_,100,facadeH);
    ctx.fillStyle='rgba(212,175,55,.15)'; ctx.fillRect(sbX,oy_,100,14);
    ctx.fillStyle='#D4AF37'; ctx.font='bold 7px IBM Plex Mono'; ctx.textAlign='center';
    ctx.fillText('MATERIALE',sbX+50,oy_+10); ctx.textAlign='left';

    const matItems=[
      ['Perete exterior','BA20+BCA15+EPS15cm','#CBD5E1'],
      ['Finisaj fațadă','Tencuiala siliconica','#F97316'],
      ['Ferestre','PVC/AL triplu low-E','#38BDF8'],
      ['Balcoane','Parapet sticla/beton','#D4AF37'],
      ['Acoperiș','Terasa inversa XPS20','#22C55E'],
      ['Ușă intrare','Aluminiu RF + sticlă','#F59E0B'],
    ];
    matItems.forEach(([name,spec,col],mi)=>{
      const my=oy_+18+mi*18;
      if(my>oy_+facadeH-10)return;
      ctx.fillStyle=col+'33'; ctx.fillRect(sbX+2,my,96,16);
      ctx.strokeStyle=col+'88'; ctx.lineWidth=.5; ctx.strokeRect(sbX+2,my,96,16);
      ctx.fillStyle=col; ctx.fillRect(sbX+2,my,3,16);
      ctx.fillStyle='rgba(220,232,250,.9)'; ctx.font='bold 6px IBM Plex Mono';
      ctx.fillText(name,sbX+7,my+6);
      ctx.fillStyle='rgba(148,163,184,.8)'; ctx.font='5.5px IBM Plex Mono';
      ctx.fillText(spec,sbX+7,my+13);
    });

    // Dimensiuni H
    if(_RV.showDim){
      ctx.strokeStyle='rgba(212,175,55,.5)'; ctx.lineWidth=.8; ctx.setLineDash([3,3]);
      ctx.beginPath();ctx.moveTo(ox_-18,oy_);ctx.lineTo(ox_-18,oy_+facadeH);ctx.stroke();
      ctx.setLineDash([]);
      ctx.save();ctx.translate(ox_-36,oy_+facadeH/2);ctx.rotate(-Math.PI/2);
      ctx.fillStyle='rgba(212,175,55,.8)';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='center';
      ctx.fillText('H = '+Ht.toFixed(1)+'m',0,0);ctx.restore();
      // L
      ctx.strokeStyle='rgba(212,175,55,.5)'; ctx.lineWidth=.8; ctx.setLineDash([3,3]);
      ctx.beginPath();ctx.moveTo(ox_,oy_+facadeH+30);ctx.lineTo(ox_+fW,oy_+facadeH+30);ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle='rgba(212,175,55,.8)';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='center';
      ctx.fillText(fW===facadeW_NS?bW.toFixed(1)+'m':bD.toFixed(1)+'m',ox_+fW/2,oy_+facadeH+44);
      ctx.textAlign='left';
    }
  }

  // ── Renderăm toate 4 fațade ────────────────────────────────────────────────
  const dirs=[
    {lbl:P.frontDir+' (PRINCIPALĂ)',fW:facadeW_NS,isMain:true},
    {lbl:{N:'S',S:'N',E:'V',V:'E',NE:'SV',NV:'SE',SE:'NV',SV:'NE'}[P.frontDir]||'S'+' (POSTERIOARĂ)',fW:facadeW_NS,isMain:false},
    {lbl:'E (LATERALĂ DREAPTĂ)',fW:facadeW_EV,isMain:false},
    {lbl:'V (LATERALĂ STÂNGĂ)',fW:facadeW_EV,isMain:false},
  ];
  dirs.forEach(({lbl,fW,isMain},idx)=>{
    const oy_=pad+25+idx*sectionH;
    const ox_=pad+30;
    drawOneFacade(lbl,fW,ox_,oy_,isMain);
  });

  _rvDrawNorth(ctx,W-38,50,P.frontDir);
  _rvDrawCartus(ctx,W,H,P,null,'TOATE FAȚADELE — N · S · E · V');
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
  const {cv,ctx}=_rvInitCanvas(780,560);
  ctx.fillStyle='#060C1A';ctx.fillRect(0,0,780,560);
  // Grid background
  ctx.strokeStyle='rgba(255,255,255,.015)';ctx.lineWidth=.5;
  for(let x=0;x<780;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,560);ctx.stroke();}
  for(let y=0;y<560;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(780,y);ctx.stroke();}
  const CX=280,CY=390;
  const pt=(x,y,z)=>{const r=iso(x,y,z);return[CX+r.px,CY+r.py];};
  const face=(pts,fill,stk,lw=1)=>{
    ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stk;ctx.lineWidth=lw;ctx.stroke();
  };

  // ── Umbra (shadow) ────────────────────────────────────────────────────────
  const shadowOff=8;
  ctx.save(); ctx.globalAlpha=0.25;
  const shadow_pts=[pt(0,0,0),pt(bW,0,0),pt(bW,bD,0),pt(0,bD,0)];
  ctx.beginPath();
  shadow_pts.forEach(([x,y],i)=>i?ctx.lineTo(x+shadowOff,y+shadowOff):ctx.moveTo(x+shadowOff,y+shadowOff));
  ctx.closePath(); ctx.fillStyle='rgba(0,0,0,.6)'; ctx.fill();
  ctx.globalAlpha=1; ctx.restore();

  // ── Planșee (floors) ─────────────────────────────────────────────────────
  const sF=Math.min(5,niv);
  for(let fl=0;fl<=sF;fl++){
    const z=fl*P.hn;
    const alpha=0.5+fl*.04;
    face([pt(0,0,z),pt(bW,0,z),pt(bW,bD,z),pt(0,bD,z)],
      `rgba(16,29,53,${alpha})`,`rgba(203,213,225,${.08+fl*.02})`, .4);
    // Etichetă nivel pe marginea dreaptă
    if(fl>0 && fl<=sF){
      const[ex,ey]=pt(bW,0,z);
      ctx.fillStyle='rgba(212,175,55,.7)'; ctx.font='bold 8px IBM Plex Mono';
      ctx.fillText(fl===niv?'ATIC':(fl===1?'P':'E'+(fl-1)),ex+6,ey+3);
      ctx.fillStyle='rgba(148,163,184,.5)'; ctx.font='7px IBM Plex Mono';
      ctx.fillText('+'+(z).toFixed(1)+'m',ex+6,ey+12);
    }
  }
  if(niv>sF){
    const z=niv*P.hn;
    face([pt(0,0,z),pt(bW,0,z),pt(bW,bD,z),pt(0,bD,z)],'rgba(212,175,55,.1)','rgba(212,175,55,.6)',1.5);
    ctx.strokeStyle='rgba(203,213,225,.1)';ctx.lineWidth=.5;ctx.setLineDash([4,4]);
    [[0,0],[bW,0],[bW,bD],[0,bD]].forEach(([x,y])=>{
      const[ax,ay]=pt(x,y,sF*P.hn);const[bx_,by_]=pt(x,y,niv*P.hn);
      ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx_,by_);ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  // ── Fațade vizibile ───────────────────────────────────────────────────────
  const z1=sF*P.hn;
  // Fațada S (principală vizibilă)
  face([pt(0,bD,0),pt(bW,bD,0),pt(bW,bD,z1),pt(0,bD,z1)],'rgba(37,99,235,.12)','#3B82F6',1.5);
  // Fațada E (laterală)
  face([pt(bW,0,0),pt(bW,bD,0),pt(bW,bD,z1),pt(bW,0,z1)],'rgba(34,197,94,.08)','rgba(100,150,120,.5)',1);

  // ── Ferestre pe fațada S ──────────────────────────────────────────────────
  const wCols=Math.max(2,Math.floor(bW/3.5));const wW_=bW/wCols*.55;const wH_=P.hn*.42;
  const cC=Math.floor(wCols/2);
  for(let row=0;row<Math.min(niv,sF);row++){
    for(let col=0;col<wCols;col++){
      if(col===cC||col===cC-1) continue;
      const wx=col*bW/wCols+(bW/wCols-wW_)/2,wz=row*P.hn+P.hn*.25;
      const sf=(['S','SE','SV'].includes(P.frontDir))?.35:.14;
      face([pt(wx,bD,wz),pt(wx+wW_,bD,wz),pt(wx+wW_,bD,wz+wH_),pt(wx,bD,wz+wH_)],
        `rgba(56,189,248,${sf})`,'#38BDF8',1.2);
      // Cercevele
      ctx.strokeStyle='rgba(56,189,248,.25)'; ctx.lineWidth=.5;
      const[w1x,w1y]=pt(wx+wW_/2,bD,wz),wBot=pt(wx+wW_/2,bD,wz+wH_);
      ctx.beginPath();ctx.moveTo(w1x,w1y);ctx.lineTo(wBot[0],wBot[1]);ctx.stroke();
    }
  }
  // ── Balcoane ──────────────────────────────────────────────────────────────
  for(let row=1;row<Math.min(niv,sF);row++){
    const bz=row*P.hn+P.hn*.78;
    face([pt(.5,bD,bz),pt(bW-.5,bD,bz),pt(bW-.5,bD+.4,bz),pt(.5,bD+.4,bz)],
      'rgba(212,175,55,.08)','rgba(212,175,55,.35)',.8);
  }

  // ── H indicator ──────────────────────────────────────────────────────────
  const[hTopX,hTopY]=pt(bW+1,0,niv*P.hn),hBotPt=pt(bW+1,0,0);
  ctx.strokeStyle='rgba(212,175,55,.5)';ctx.lineWidth=1;ctx.setLineDash([3,3]);
  ctx.beginPath();ctx.moveTo(hTopX,hTopY);ctx.lineTo(hBotPt[0],hBotPt[1]);ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle='rgba(212,175,55,.85)'; ctx.font='bold 9px IBM Plex Mono';
  ctx.fillText('H='+(niv*P.hn).toFixed(1)+'m',(hTopX+hBotPt[0])/2+6,(hTopY+hBotPt[1])/2);

  // ── Explicație: CE ESTE ACEASTĂ VEDERE ────────────────────────────────────
  // Panou informativ în dreapta
  ctx.fillStyle='rgba(8,16,38,.92)'; ctx.fillRect(460,20,300,360);
  ctx.strokeStyle='rgba(212,175,55,.25)'; ctx.lineWidth=1; ctx.strokeRect(460,20,300,360);
  ctx.fillStyle='rgba(212,175,55,.15)'; ctx.fillRect(460,20,300,28);
  ctx.fillStyle='#D4AF37'; ctx.font='bold 10px Space Grotesk'; ctx.textAlign='center';
  ctx.fillText('CE ESTE VEDEREA AXONOMETRICĂ?',610,38); ctx.textAlign='left';

  const explLines=[
    ['📐 CE ESTE:','O proiecție izometrică tehnică (30°) a'],
    ['','volumului clădirii. Arată forma 3D exactă,'],
    ['','propor­ții­le și regimul de înălțime.'],
    ['',''],
    ['📏 CE ARATĂ:','• Planșee = benzile orizontale (niveluri)'],
    ['','• Ferestre = dreptunghiuri albastre pe fațadă'],
    ['','• Balcoane = benzi aurii per nivel'],
    ['','• H indicator = înălțimea totală'],
    ['','• Niveluri: '+niv+' niv. · H='+( niv*P.hn).toFixed(1)+'m'],
    ['',''],
    ['⚠️ CE NU ESTE:','NU este o randare foto-realistă.'],
    ['','NU are materiale/culori finale (acelea'],
    ['','se stabilesc la faza PAC de arhitect).'],
    ['','NU este o perspectivă (care ar distorsiona'],
    ['','propor­ți­ile și nu ar fi precisă tehnic).'],
    ['',''],
    ['✅ DE CE E UTIL:','• Înțelegi volumul fără a fi arhitect'],
    ['','• Verifici că H și retragerile sunt corecte'],
    ['','• Identifici numărul de niveluri'],
    ['','• Compari cu contextul urban din PDF'],
    ['',''],
    ['🏗️ RANDARE 3D:','Disponibilă în Viewer 3D Urban3D →'],
    ['','folosește butonul 🔭 din panoul AEDIS'],
    ['','pentru imagini foto-realiste cu materiale.'],
  ];
  let ey=58;
  explLines.forEach(([label,text])=>{
    if(ey>360) return;
    if(label){
      ctx.fillStyle='#D4AF37'; ctx.font='bold 7px Space Grotesk';
      ctx.fillText(label,468,ey);
      ctx.fillStyle='rgba(203,213,225,.85)'; ctx.font='7px IBM Plex Mono';
      ctx.fillText(text,468+58,ey);
    } else {
      ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font='7px IBM Plex Mono';
      ctx.fillText(text,468+58,ey);
    }
    ey+=11;
  });

  // Footer
  ctx.fillStyle='rgba(212,175,55,.7)'; ctx.font='bold 10px Space Grotesk';
  ctx.fillText(`VEDERE AXONOMETRICĂ · ${niv} NIV. · H=${(niv*P.hn).toFixed(1)}m · SDA=${_rvFmt(b.sdaTotal)}m²  ·  Nr.cad. ${P.nrCad}`,16,546);
  _rvDrawCartus(ctx,780,560,P,null,'AXONOMETRIE 3D — SCHEMĂ ORIENTATIVĂ');
  _rvDrawNorth(ctx,430,42,P.frontDir);
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
    ['Apartamente est.',_rvFmt(b.niv*b.cores.length*4)+' unități'],
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

  const btn=document.querySelector('.rv-expbtn')||document.querySelector('button[onclick*="ExportPDF"]');
  if(btn){btn.textContent='⏳ Generez PDF…';btn.style.opacity='.6';btn.style.background='rgba(212,175,55,.25)';}
  if(typeof ss==='function') ss('⏳ Generez Releveu PDF — Pasul 1/4: capturi hărți…');

  // ── Capturi din viewer 3D (cu timeout 8s — nu blocăm dacă e lent) ────
  let caps={};
  try{
    const ap=S.parcels[S.activeParcel??0];
    if(ap?.geo?.geometry && typeof _captureStudyMaps==='function'){
      const capturePromise=_captureStudyMaps(ap, msg=>{ if(typeof ss==='function') ss(msg); });
      const timeoutPromise=new Promise(res=>setTimeout(()=>res({}),8000)); // max 8s
      caps=await Promise.race([capturePromise,timeoutPromise])||{};
    }
  }catch(e){console.warn('[Releveu PDF] capture failed:',e.message);}
  if(typeof ss==='function') ss('⏳ Generez PDF — Pasul 2/4: planuri de nivel…');

  try{
    const pdf=new _jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
    const W=297,H=210;
    let pgN=0; let totalPages=0;
    const newPage=()=>{if(pgN>0)pdf.addPage();pgN++;};

    // ── Culori & utilitare ───────────────────────────────────────────
    const C={
      gold:[212,175,55],gold2:[245,198,60],dark:[8,14,30],dark2:[15,25,48],
      light:[248,249,252],white:[255,255,255],red:[220,38,38],green:[22,163,74],
      blue:[37,99,235],cyan:[6,182,212],orange:[234,88,12],purple:[124,58,237],
      gray:[100,116,139],gray2:[203,213,225],gray3:[241,245,249],
      wall:[80,100,130],living:[253,186,116],bedroom:[134,239,172],kitchen:[103,232,249],
      bath:[196,181,253],hall:[203,213,225],core:[147,197,253],balcon:[254,249,195],
      commercial:[249,168,212],storage:[209,213,219],
    };
    const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').replace(/\s+/g,' ').trim().slice(0,300);
    const RN=(n,d=0)=>isNaN(n)?'—':d?Number(n).toFixed(d):Math.round(n)+'';
    const addCap=(img,x,y,w,h,cap)=>{
      if(!img||img.length<200)return;
      try{
        pdf.setFillColor(230,234,242);pdf.rect(x,y,w,h,'F');
        pdf.addImage(img,'JPEG',x,y,w,h,undefined,'FAST');
        if(cap){
          pdf.setFillColor(0,0,0,0.5);
          pdf.setFillColor(15,25,48);pdf.rect(x,y+h-5,w,5,'F');
          pdf.setTextColor(...C.gold);pdf.setFont('helvetica','italic');pdf.setFontSize(5);
          pdf.text(S2(cap),x+w/2,y+h-1.5,{align:'center'});
        }
      }catch(e){}
    };

    // ── Header/Footer ────────────────────────────────────────────────
    const hdr=(title,pg)=>{
      pdf.setFillColor(...C.dark2);pdf.rect(0,0,W,9,'F');
      pdf.setFillColor(...C.gold);pdf.rect(0,0,W,1.2,'F');
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text('URBANX',5,6.2);
      pdf.setTextColor(150,165,185);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);pdf.text('RELEVEE INSTANT · Prezentare elaborată',18,6.2);
      pdf.setTextColor(220,230,245);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);pdf.text(S2(title),W/2,6.2,{align:'center'});
      pdf.setTextColor(...C.gold);pdf.setFontSize(6.5);pdf.text('Pag. '+pg,W-5,6.2,{align:'right'});
    };
    const ftr=()=>{
      pdf.setFillColor(240,244,250);pdf.rect(0,H-7,W,7,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.2);pdf.line(0,H-7,W,H-7);
      pdf.setTextColor(120,135,155);pdf.setFontSize(5.5);pdf.setFont('helvetica','italic');
      pdf.text('Nr.cad. '+S2(P.nrCad)+' · UTR: '+S2(P.utr)+' · '+S2(P.fn)+' · UrbanX TSS·FG · Document orientativ — nu înlocuiește proiectul tehnic conf. Legii 50/1991',W/2,H-2,{align:'center'});
    };
    const secTitle=(txt,y,col)=>{
      const c=col||C.dark2;
      pdf.setFillColor(...c);pdf.rect(10,y,W-20,6,'F');
      pdf.setFillColor(...C.gold);pdf.rect(10,y,1.5,6,'F');
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
      pdf.text(S2(txt),14,y+4.2);return y+8;
    };
    const bodyTxt=(txt,x,y,w,sz,col)=>{
      const s=sz||6.5,ww=w||(W-22),cc=col||[40,55,80];
      pdf.setTextColor(...cc);pdf.setFont('helvetica','normal');pdf.setFontSize(s);
      const lines=pdf.splitTextToSize(S2(txt),ww);
      lines.forEach((l,i)=>pdf.text(l,x,y+i*(s*0.42)));
      return y+lines.length*(s*0.42)+1.5;
    };
    const noteBox=(txt,x,y,w,h,icon,bgCol,tcol)=>{
      const bg=bgCol||[248,252,255],tc=tcol||[30,60,120];
      pdf.setFillColor(...bg);pdf.setDrawColor(tc[0],tc[1],tc[2],0.3);pdf.setLineWidth(0.3);
      pdf.roundedRect(x,y,w,h,1.5,1.5,'FD');
      if(icon){pdf.setTextColor(...tc);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text(icon,x+2.5,y+h/2+2);}
      pdf.setTextColor(...tc);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
      const lines=pdf.splitTextToSize(S2(txt),w-(icon?10:4));
      lines.slice(0,Math.floor(h/3.2)).forEach((l,i)=>pdf.text(l,x+(icon?9:2.5),y+4+i*3.2));
    };
    const tblHdr=(cols,widths,y)=>{
      pdf.setFillColor(...C.dark2);pdf.rect(10,y,widths.reduce((a,b_)=>a+b_,0),6,'F');
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
      let x=10;cols.forEach((c,i)=>{pdf.text(S2(c),x+2,y+4.2);x+=widths[i];});return y+6;
    };
    const tblRow=(cols,widths,y,even)=>{
      const tw=widths.reduce((a,b_)=>a+b_,0);
      pdf.setFillColor(even?245:252,even?248:253,even?252:254);pdf.rect(10,y,tw,5.5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(10,y+5.5,10+tw,y+5.5);
      let x=10;cols.forEach((c,i)=>{
        const v=S2(String(c||''));
        if(v==='CONFORM'||v==='OK'){pdf.setTextColor(...C.green);pdf.setFont('helvetica','bold');}
        else if(v==='DEPĂȘIRE'||v==='NECONFORM'){pdf.setTextColor(...C.red);pdf.setFont('helvetica','bold');}
        else if(v==='Verificare PT'){pdf.setTextColor(160,90,20);pdf.setFont('helvetica','normal');}
        else{pdf.setTextColor(40,55,80);pdf.setFont('helvetica','normal');}
        pdf.setFontSize(6);pdf.text(v,x+2,y+4);x+=widths[i];
      });return y+5.5;
    };

    // ── Draw plan — NIVEL CAD ──────────────────────────────────────────
    const drawPlan=(fl,P_,b_,ox,oy,sc)=>{
      const bW=b_.bW,bD=b_.bD;

      // ── 1. Fundal parcelă + clădire ────────────────────────────────────
      pdf.setFillColor(248,249,252);pdf.rect(ox-P_.rl*sc,oy-P_.rf*sc,P_.W*sc,P_.D*sc,'F');
      pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.25);pdf.setLineDashPattern([2,1.5],0);
      pdf.rect(ox-P_.rl*sc,oy-P_.rf*sc,P_.W*sc,P_.D*sc,'S');pdf.setLineDashPattern([],0);
      pdf.setFillColor(252,252,254);pdf.rect(ox,oy,bW*sc,bD*sc,'F');

      // ── 2. Grilă structurală cu bule alfanumerice ──────────────────────
      // Calcul spatii grila bazat pe dimensiunile clădirii
      const nGX=Math.max(3,Math.round(bW/4.5)),nGY=Math.max(2,Math.round(bD/3.8));
      const gSpX=bW/nGX,gSpY=bD/nGY;
      const bubR=2.8; // raza bula mm

      // Linii grilă (punctate fine)
      pdf.setDrawColor(190,200,220);pdf.setLineWidth(0.12);pdf.setLineDashPattern([1.5,1.5],0);
      for(let gi=0;gi<=nGX;gi++){const gx=ox+gi*gSpX*sc;pdf.line(gx,oy-bubR*3,gx,oy+bD*sc+bubR*3);}
      for(let gi=0;gi<=nGY;gi++){const gy=oy+gi*gSpY*sc;pdf.line(ox-bubR*3,gy,ox+bW*sc+bubR*3,gy);}
      pdf.setLineDashPattern([],0);

      // Bule numerice (sus + jos)
      for(let gi=0;gi<=nGX;gi++){
        const gx=ox+gi*gSpX*sc;
        [oy-bubR*2.2,oy+bD*sc+bubR*2.2].forEach(gy2=>{
          pdf.setFillColor(255,255,255);pdf.setDrawColor(30,50,100);pdf.setLineWidth(0.35);
          pdf.circle(gx,gy2,bubR,'FD');
          pdf.setTextColor(15,35,90);pdf.setFont('helvetica','bold');pdf.setFontSize(4);
          pdf.text(String(gi+1),gx,gy2+1.3,{align:'center'});
        });
      }
      // Bule literere (stânga + dreapta)
      for(let gi=0;gi<=nGY;gi++){
        const gy=oy+gi*gSpY*sc;
        const ltr=String.fromCharCode(65+gi); // A,B,C...
        [ox-bubR*2.2,ox+bW*sc+bubR*2.2].forEach(gx2=>{
          pdf.setFillColor(255,255,255);pdf.setDrawColor(30,50,100);pdf.setLineWidth(0.35);
          pdf.circle(gx2,gy,bubR,'FD');
          pdf.setTextColor(15,35,90);pdf.setFont('helvetica','bold');pdf.setFontSize(4);
          pdf.text(ltr,gx2,gy+1.3,{align:'center'});
        });
      }

      // ── 3. Simboluri stâlpi la intersecții ────────────────────────────
      const colSz=Math.max(1.2,0.4*sc); // 40cm coloane
      for(let gi=0;gi<=nGX;gi++){
        for(let gj=0;gj<=nGY;gj++){
          const cx=ox+gi*gSpX*sc,cy=oy+gj*gSpY*sc;
          if(cx<=ox+bW*sc+0.5&&cy<=oy+bD*sc+0.5){
            pdf.setFillColor(20,40,85);
            pdf.rect(cx-colSz/2,cy-colSz/2,colSz,colSz,'F');
          }
        }
      }

      // ── 4. Camere — umplutură colorată ────────────────────────────────
      const cm={living:C.living,bedroom:C.bedroom,bedroom2:C.bedroom,bedroom3:C.bedroom,
        kitchen:C.kitchen,bath:C.bath,wc:C.bath,hall:C.hall,storage:C.storage,
        core:C.core,office:C.bedroom,meeting:C.living,commercial:C.commercial,
        reception:C.commercial,balcon:C.balcon};
      const sm={living:C.orange,bedroom:C.green,bedroom2:C.green,bedroom3:C.green,
        kitchen:C.cyan,bath:C.purple,wc:C.purple,hall:C.gray,storage:C.gray2,
        core:C.blue,office:C.green,meeting:C.orange,commercial:[180,30,140],
        reception:[180,30,140],balcon:C.gold};

      fl.rects.sort((a,m_)=>(a.zIdx||0)-(m_.zIdx||0)).forEach(r=>{
        const rx=ox+r.x*sc,ry=oy+r.y*sc,rw=r.w*sc,rh=r.h*sc;
        if(rw<0.5||rh<0.5)return;
        const fc=cm[r.t]||[238,240,245],stk=sm[r.t]||[100,115,140];
        pdf.setFillColor(...fc);
        if(r.bal){
          pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.4);pdf.setLineDashPattern([2,1],0);
          pdf.rect(rx,ry,rw,rh,'FD');pdf.setLineDashPattern([],0);
        } else {
          const lw=r.t==='core'?1.0:r.apt<0?0.6:0.45;
          pdf.setDrawColor(...stk);pdf.setLineWidth(lw);
          pdf.rect(rx,ry,rw,rh,'FD');
        }
        // Hașuri oblice pentru pereți structurali (cores) — fără save/restore (jsPDF.save() = download!)
        if(r.t==='core'){
          pdf.setDrawColor(50,80,160);pdf.setLineWidth(0.25);
          const sp=Math.max(1.5,colSz);
          for(let hi=-(rh);hi<rw+rh;hi+=sp){
            const x1=Math.max(rx,rx+hi),y1=rx+hi<rx?ry+(rx-rx-hi):ry;
            const x2=Math.min(rx+rw,rx+hi+rh),y2=x2==rx+rw?ry+(rx+rw-(rx+hi)):ry+rh;
            if(x1<rx+rw&&x2>rx)pdf.line(x1,y1,x2,y2);
          }
        }
      });

      // ── 5. Perete exterior gros (simulat prin borduri multiple) ────────
      const ewT=Math.max(1.5,0.25*sc); // 25cm perete exterior
      pdf.setDrawColor(20,35,75);pdf.setLineWidth(ewT);
      pdf.rect(ox+ewT/2,oy+ewT/2,bW*sc-ewT,bD*sc-ewT,'S');
      // Linie interior perete (toc)
      pdf.setDrawColor(80,100,130);pdf.setLineWidth(0.25);
      pdf.rect(ox+ewT,oy+ewT,bW*sc-ewT*2,bD*sc-ewT*2,'S');

      // ── 6. Ferestre — simbol dublu (toc + sticlă) ─────────────────────
      fl.wins.forEach(w=>{
        const wSC=(w.w||w.h||1.2)*sc;
        const gapPx=ewT*0.85;
        // Golul din perete (alb)
        pdf.setFillColor(252,253,255);pdf.setDrawColor(255,255,255);pdf.setLineWidth(0.1);
        if(w.wall==='N'){pdf.rect(ox+w.x*sc,oy-ewT,wSC,ewT,'F');}
        else if(w.wall==='S'){pdf.rect(ox+w.x*sc,oy+bD*sc,wSC,ewT,'F');}
        else if(w.wall==='V'){pdf.rect(ox-ewT,oy+w.y*sc,ewT,wSC,'F');}
        else{pdf.rect(ox+bW*sc,oy+w.y*sc,ewT,wSC,'F');}
        // Toc exterior + sticlă (3 linii: toc1, sticlă, toc2)
        pdf.setDrawColor(30,130,190);pdf.setLineWidth(0.45);
        if(w.wall==='N'||w.wall==='S'){
          const fy=w.wall==='N'?oy-ewT:oy+bD*sc;
          pdf.line(ox+w.x*sc,fy,ox+w.x*sc+wSC,fy); // toc exterior
          pdf.line(ox+w.x*sc,fy+ewT,ox+w.x*sc+wSC,fy+ewT); // toc interior
          pdf.setDrawColor(120,180,220);pdf.setLineWidth(0.8);
          pdf.line(ox+w.x*sc,fy+ewT*0.5,ox+w.x*sc+wSC,fy+ewT*0.5); // sticlă
        } else {
          const fx=w.wall==='V'?ox-ewT:ox+bW*sc;
          pdf.line(fx,oy+w.y*sc,fx,oy+w.y*sc+wSC);
          pdf.line(fx+ewT,oy+w.y*sc,fx+ewT,oy+w.y*sc+wSC);
          pdf.setDrawColor(120,180,220);pdf.setLineWidth(0.8);
          pdf.line(fx+ewT*0.5,oy+w.y*sc,fx+ewT*0.5,oy+w.y*sc+wSC);
        }
      });

      // ── 7. Uși — arc de deschidere ────────────────────────────────────
      fl.doors.forEach(d=>{
        const dx=ox+d.x*sc,dy_d=d.y!=null?oy+d.y*sc:oy+bD*sc;
        const dw=d.w*sc;
        const isMain=d.type==='main';
        // Gol în perete
        pdf.setFillColor(252,253,255);
        if(isMain||d.y==null)pdf.rect(dx,oy+bD*sc-ewT,dw,ewT,'F');
        else pdf.rect(dx-ewT/2,dy_d-ewT/2,dw+ewT,ewT,'F');
        // Foaia ușii
        const doorCol=isMain?C.orange:[40,60,100];
        pdf.setDrawColor(...doorCol);
        pdf.setLineWidth(isMain?0.7:0.45);
        // Linia foii
        if(isMain){
          pdf.line(dx,oy+bD*sc,dx+dw,oy+bD*sc);
          // Arc deschidere ușă (quarter circle)
          pdf.setDrawColor(200,80,10);pdf.setLineWidth(0.35);
          let prevAx=dx,prevAy=oy+bD*sc;
          for(let a=0.15;a<=Math.PI/2+0.01;a+=0.15){
            const ax=dx+dw*Math.sin(a),ay=oy+bD*sc-dw*(1-Math.cos(a));
            pdf.line(prevAx,prevAy,ax,ay);prevAx=ax;prevAy=ay;
          }
        } else {
          const sw=d.swing||'right';
          if(sw==='right'){
            pdf.line(dx,dy_d,dx+dw,dy_d);
            for(let a=0;a<=Math.PI/2;a+=0.2){if(a>0){
              const ax=dx+dw*Math.sin(a),ay=dy_d-dw*(1-Math.cos(a));
              const pa=a-0.2,pax=dx+dw*Math.sin(pa),pay=dy_d-dw*(1-Math.cos(pa));
              pdf.line(pax,pay,ax,ay);
            }}
          }
        }
      });

      // ── 8. Marcaje nivel (▽ cota) ──────────────────────────────────────
      const cota=fl.floorIdx===0?'±0.00':'+'+(fl.floorIdx*P_.hn).toFixed(2);
      fl.rects.filter(r=>r.apt>=0&&!r.bal&&r.w*r.h>6).slice(0,8).forEach(r=>{
        const rx=ox+r.x*sc+r.w*sc/2,ry2=oy+r.y*sc+r.h*sc*0.78;
        // Triunghi cotat
        const ts=1.6;
        pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.4);
        pdf.line(rx-ts,ry2,rx+ts,ry2);pdf.line(rx-ts,ry2,rx,ry2+ts*1.4);pdf.line(rx+ts,ry2,rx,ry2+ts*1.4);
        pdf.setTextColor(15,35,90);pdf.setFont('helvetica','normal');pdf.setFontSize(3.8);
        pdf.text(cota,rx,ry2+ts*1.4+2.5,{align:'center'});
      });

      // ── 9. Simboluri LIFT și SCĂRI ────────────────────────────────────
      fl.rects.filter(r=>r.t==='core').forEach(core=>{
        const rx=ox+core.x*sc,ry=oy+core.y*sc,rw=core.w*sc,rh=core.h*sc;
        // Nucleu = zona scări + lift
        const liftW=Math.min(rw*0.42,3.5*sc),liftH=Math.min(rh*0.58,4*sc);
        const lx=rx+rw*0.52,ly=ry+rh*0.18;
        // Simbolul liftului (pătrat cu X)
        pdf.setFillColor(225,235,252);pdf.setDrawColor(40,80,160);pdf.setLineWidth(0.5);
        pdf.rect(lx,ly,liftW,liftH,'FD');
        pdf.setDrawColor(80,120,200);pdf.setLineWidth(0.3);
        pdf.line(lx,ly,lx+liftW,ly+liftH);pdf.line(lx+liftW,ly,lx,ly+liftH);
        pdf.setTextColor(15,60,160);pdf.setFont('helvetica','bold');pdf.setFontSize(3.5);
        pdf.text('LIFT',lx+liftW/2,ly+liftH+3.5,{align:'center'});
        // Simbolul scărilor (linii orizontale paralele cu săgeată)
        const stX=rx+rw*0.04,stY=ry+rh*0.08,stW=rw*0.44,stH=rh*0.78;
        const nSteps=Math.max(5,Math.floor(stH/2.5));
        pdf.setFillColor(238,242,252);pdf.setDrawColor(40,70,140);pdf.setLineWidth(0.4);
        pdf.rect(stX,stY,stW,stH,'FD');
        pdf.setDrawColor(60,90,160);pdf.setLineWidth(0.2);
        for(let si=1;si<nSteps;si++)pdf.line(stX,stY+si*(stH/nSteps),stX+stW,stY+si*(stH/nSteps));
        // Săgeată direcție
        const arY=stY+stH*0.5;
        pdf.setDrawColor(30,60,140);pdf.setLineWidth(0.5);
        pdf.line(stX+stW*0.25,arY,stX+stW*0.75,arY);
        pdf.line(stX+stW*0.55,arY-1.5,stX+stW*0.75,arY);
        pdf.line(stX+stW*0.55,arY+1.5,stX+stW*0.75,arY);
      });

      // ── 10. Etichete profesionale camere ──────────────────────────────
      const typeNm={living:'LIVING / SALON',bedroom:'DORMITOR 1',bedroom2:'DORMITOR 2',bedroom3:'DORMITOR 3',
        kitchen:'BUCĂTĂRIE',bath:'BAIE',wc:'WC',hall:'HOL / CORIDOR',storage:'DEPOZITARE',
        core:'CASA SCĂRILOR / LIFT',office:'SPAȚIU BIROURI',meeting:'SALĂ ȘEDINȚE',
        commercial:'SPAȚIU COMERCIAL',reception:'RECEPȚIE',balcon:'BALCON / LOGGIE'};
      fl.rects.forEach(r=>{
        if(r.bal)return;
        const rx=ox+r.x*sc,ry=oy+r.y*sc,rw=r.w*sc,rh=r.h*sc;
        if(rw<7||rh<5)return;
        const area=(r.w*r.h);
        const nm=S2(typeNm[r.t]||String(r.lbl||r.t).toUpperCase()).replace(/[\u{1F000}-\u{1FAFF}]/gu,'').trim();
        if(r.t==='core')return; // scările au simboluri proprii
        // Funcțiunea (bold, albastru închis)
        const fsz=Math.min(4.8,rw/10,rh/5);
        pdf.setTextColor(15,40,90);pdf.setFont('helvetica','bold');pdf.setFontSize(fsz);
        const lines=nm.split(' ');
        // Max 2 rânduri
        const l1=lines.slice(0,Math.ceil(lines.length/2)).join(' ');
        const l2=lines.slice(Math.ceil(lines.length/2)).join(' ');
        if(l2){
          pdf.text(S2(l1),rx+rw/2,ry+rh/2-fsz*0.4,{align:'center'});
          pdf.text(S2(l2),rx+rw/2,ry+rh/2+fsz*0.6,{align:'center'});
        } else {
          pdf.text(S2(l1),rx+rw/2,ry+rh/2+fsz*0.3,{align:'center'});
        }
        // Aria (normal, mic, gri)
        if(rw>12&&rh>8){
          pdf.setTextColor(70,90,120);pdf.setFont('helvetica','normal');pdf.setFontSize(Math.min(4,fsz*0.82));
          pdf.text(area.toFixed(2)+' m²',rx+rw/2,ry+rh/2+(l2?fsz*1.6:fsz*1.0)+2,{align:'center'});
        }
      });

      // ── 11. Cote în lanț (X) — dimensiuni per travee ──────────────────
      const dimLineY=oy+bD*sc+8;
      const dimLineX=ox-10;
      pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.3);

      // Cote X (per travee)
      let prevGx=ox;
      for(let gi=1;gi<=nGX;gi++){
        const gx=ox+gi*gSpX*sc;
        pdf.line(prevGx,dimLineY,gx,dimLineY);
        pdf.line(prevGx,dimLineY-2,prevGx,dimLineY+2);
        pdf.line(gx,dimLineY-2,gx,dimLineY+2);
        pdf.setTextColor(15,35,90);pdf.setFont('helvetica','normal');pdf.setFontSize(4);
        pdf.text(gSpX.toFixed(2)+' m',(prevGx+gx)/2,dimLineY+4.5,{align:'center'});
        prevGx=gx;
      }
      // Total X
      pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.5);
      pdf.line(ox,dimLineY+7,ox+bW*sc,dimLineY+7);
      pdf.line(ox,dimLineY+5,ox,dimLineY+9);pdf.line(ox+bW*sc,dimLineY+5,ox+bW*sc,dimLineY+9);
      pdf.setTextColor(15,35,90);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
      pdf.text(bW.toFixed(2)+' m',ox+bW*sc/2,dimLineY+12,{align:'center'});

      // Cote Y (per travee)
      let prevGy=oy;
      for(let gi=1;gi<=nGY;gi++){
        const gy=oy+gi*gSpY*sc;
        pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.3);
        pdf.line(dimLineX,prevGy,dimLineX,gy);
        pdf.line(dimLineX-2,prevGy,dimLineX+2,prevGy);pdf.line(dimLineX-2,gy,dimLineX+2,gy);
        pdf.setTextColor(15,35,90);pdf.setFont('helvetica','normal');pdf.setFontSize(4);
        pdf.text(gSpY.toFixed(2)+' m',dimLineX-4.5,(prevGy+gy)/2,{align:'center',angle:90});
        prevGy=gy;
      }
      // Total Y
      pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.5);
      pdf.line(dimLineX-8,oy,dimLineX-8,oy+bD*sc);
      pdf.line(dimLineX-10,oy,dimLineX-6,oy);pdf.line(dimLineX-10,oy+bD*sc,dimLineX-6,oy+bD*sc);
      pdf.setTextColor(15,35,90);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
      pdf.text(bD.toFixed(2)+' m',dimLineX-15,oy+bD*sc/2,{align:'center',angle:90});

      // ── 12. Stradă + front stradal ────────────────────────────────────
      pdf.setFillColor(215,220,235);pdf.rect(ox-P_.rl*sc,oy+bD*sc+P_.rs*sc,P_.W*sc,4,'F');
      pdf.setTextColor(55,75,115);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
      pdf.text('▲  FRONT STRADAL  ·  '+P_.frontDir+' · Nr.cad. '+S2(P_.nrCad),ox-P_.rl*sc+P_.W*sc/2,oy+bD*sc+P_.rs*sc+3,{align:'center'});
    };
    const drawNorth=(x,y,dir,sz)=>{
      const s=sz||7,rot={N:0,S:Math.PI,E:Math.PI/2,V:-Math.PI/2,NE:Math.PI/4,NV:-Math.PI/4,SE:Math.PI*3/4,SV:-Math.PI*3/4}[dir]||0;
      const p=(a,d)=>({x:x+Math.sin(a+rot)*d,y:y-Math.cos(a+rot)*d});
      pdf.setFillColor(255,255,255);pdf.circle(x,y,s+1,'F');
      pdf.setDrawColor(...C.gray);pdf.setLineWidth(0.3);pdf.circle(x,y,s+1,'S');
      const n=p(0,s),s2=p(Math.PI,s);
      pdf.setFillColor(...C.red);if(pdf.polygon)pdf.polygon([x,y,n.x-s*0.35,n.y,n.x+s*0.35,n.y],'F');else{pdf.setDrawColor(...C.red);pdf.line(x,y,n.x,n.y);}
      pdf.setFillColor(170,180,195);if(pdf.polygon)pdf.polygon([x,y,s2.x-s*0.35,s2.y,s2.x+s*0.35,s2.y],'F');else{pdf.setDrawColor(160,175,190);pdf.line(x,y,s2.x,s2.y);}
      pdf.setTextColor(...C.red);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text('N',n.x,n.y-1.5,{align:'center'});
    };
    const drawScale=(x,y,sc)=>{
      const m5=5*sc;
      pdf.setFillColor(...C.dark2);pdf.rect(x,y,m5/2,1.5,'F');
      pdf.setFillColor(255,255,255);pdf.rect(x+m5/2,y,m5/2,1.5,'F');
      pdf.setDrawColor(...C.dark2);pdf.setLineWidth(0.35);pdf.rect(x,y,m5,1.5,'S');
      pdf.setTextColor(60,75,95);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
      pdf.text('0',x,y+4);pdf.text('5m',x+m5,y+4,{align:'right'});
      pdf.setTextColor(100,115,135);pdf.text('Sc. 1:100',x+m5/2,y+5.5,{align:'center'});
    };
    const drawFacade=(b_,P_,ox,oy,fW,fH,sc)=>{
      const niv=b_.niv;
      pdf.setFillColor(232,236,246);pdf.rect(ox,oy,fW,fH,'F');
      for(let i=0;i<niv;i++){
        if(i%2===0){pdf.setFillColor(240,243,250);pdf.rect(ox,oy+fH-(i+1)*P_.hn*sc,fW,P_.hn*sc,'F');}
        pdf.setFillColor(195,205,218);pdf.rect(ox,oy+fH-i*P_.hn*sc-1,fW,1.2,'F');
        pdf.setTextColor(120,135,155);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
        pdf.text(i===0?'P':`E${i}`,ox-5,oy+fH-i*P_.hn*sc-P_.hn*sc/2+1.5);
      }
      const wCols=Math.max(3,Math.floor(b_.bW/3.2));
      const wW_=Math.min(b_.bW/wCols*0.55,1.8)*sc,wH_=P_.hn*0.42*sc,colSp=fW/wCols,cC=Math.floor(wCols/2);
      for(let row=0;row<niv;row++){
        const wy=oy+fH-(row+1)*P_.hn*sc+(P_.hn*sc-wH_)*0.28;
        for(let col=0;col<wCols;col++){
          const wx=ox+col*colSp+(colSp-wW_)/2;
          if(col===cC){pdf.setFillColor(215,228,245);pdf.setDrawColor(...C.blue);pdf.setLineWidth(0.4);pdf.rect(wx+wW_*0.25,wy,wW_*0.5,wH_,'FD');}
          else{
            pdf.setFillColor(195,220,250);pdf.setDrawColor(70,130,195);pdf.setLineWidth(0.4);pdf.rect(wx,wy,wW_,wH_,'FD');
            pdf.setFillColor(180,210,240);pdf.rect(wx,wy,wW_,wH_*0.45,'F');
            pdf.setDrawColor(140,180,220);pdf.setLineWidth(0.15);
            pdf.line(wx+wW_/2,wy,wx+wW_/2,wy+wH_);pdf.line(wx,wy+wH_/2,wx+wW_,wy+wH_/2);
          }
        }
        const bY=oy+fH-(row+1)*P_.hn*sc+P_.hn*sc*0.8;
        pdf.setFillColor(195,205,218);pdf.rect(ox+fW*0.03,bY,fW*0.94,1.5,'F');
      }
      const eW=2.2*sc,eH=2.8*sc,eX=ox+fW/2-eW/2,eY=oy+fH-eH;
      pdf.setFillColor(175,190,210);pdf.rect(eX,eY,eW,eH,'F');
      pdf.setDrawColor(90,120,160);pdf.setLineWidth(0.7);pdf.rect(eX,eY,eW,eH,'S');
      pdf.setDrawColor(120,145,175);pdf.setLineWidth(0.25);pdf.line(eX+eW/2,eY,eX+eW/2,eY+eH);
      pdf.setDrawColor(...C.wall);pdf.setLineWidth(1.2);pdf.rect(ox,oy,fW,fH,'S');
      pdf.setDrawColor(90,105,125);pdf.setLineWidth(0.9);pdf.line(ox-5,oy+fH,ox+fW+10,oy+fH);
      pdf.setTextColor(80,95,115);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
      pdf.text('COTA ±0.00 (CTN)',ox,oy+fH+3.5);
      pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.35);
      pdf.line(ox+fW+3,oy,ox+fW+3,oy+fH);pdf.line(ox+fW+2,oy,ox+fW+4,oy);pdf.line(ox+fW+2,oy+fH,ox+fW+4,oy+fH);
      pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
      pdf.text('H='+(niv*P_.hn).toFixed(1)+'m',ox+fW+10,oy+fH/2+2);
      pdf.setTextColor(100,115,135);pdf.setFontSize(5);pdf.setFont('helvetica','normal');
      pdf.text(niv+' niv.',ox+fW+10,oy+fH/2+7);
    };
    const drawSection=(b_,P_,ox,oy,sW,sH,sc)=>{
      const niv=b_.niv;
      const zC=[[253,220,180],[200,240,215],[180,230,250],[210,195,250]];
      for(let i=0;i<niv;i++){
        const fy=oy+sH-(i+1)*P_.hn*sc;
        pdf.setFillColor(...zC[i%4]);pdf.rect(ox,fy,sW,P_.hn*sc,'F');
        pdf.setFillColor(165,180,198);pdf.rect(ox,fy-1.5,sW,1.5,'F');
        pdf.setTextColor(80,95,115);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
        pdf.text(i===0?'P':`E${i}`,ox-7,oy+sH-i*P_.hn*sc-P_.hn*sc/2+1.5);
        pdf.setTextColor(140,155,175);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);
        pdf.text(P_.hn.toFixed(1)+'m',ox+sW+2,oy+sH-i*P_.hn*sc-P_.hn*sc/2+1.5);
      }
      if(b_.cores.length){
        const c=b_.cores[Math.floor(b_.cores.length/2)];
        const cx=ox+sW/2-c.h*sc/2;
        for(let i=0;i<niv;i++){
          const fy=oy+sH-(i+1)*P_.hn*sc;
          pdf.setFillColor(185,212,250);pdf.setDrawColor(...C.blue);pdf.setLineWidth(0.4);pdf.rect(cx,fy,c.h*sc,P_.hn*sc,'FD');
          const steps=7,sw=c.h*sc/steps,sh=P_.hn*sc/steps;
          pdf.setDrawColor(75,125,195);pdf.setLineWidth(0.3);
          for(let s=0;s<steps;s++){pdf.line(cx+s*sw,fy+s*sh,cx+(s+1)*sw,fy+s*sh);pdf.line(cx+(s+1)*sw,fy+s*sh,cx+(s+1)*sw,fy+(s+1)*sh);}
        }
      }
      pdf.setFillColor(165,175,192);pdf.setDrawColor(125,140,160);pdf.setLineWidth(0.4);pdf.rect(ox-4,oy+sH,sW+8,4,'FD');
      pdf.setDrawColor(25,155,185);pdf.setLineWidth(0.4);pdf.setLineDashPattern([2,1.5],0);
      pdf.line(ox-10,oy+sH+2.5,ox+sW+15,oy+sH+2.5);pdf.setLineDashPattern([],0);
      pdf.setTextColor(15,135,165);pdf.setFont('helvetica','italic');pdf.setFontSize(5);pdf.text('NFA est. ~-1.5m',ox+2,oy+sH+5.5);
      pdf.setDrawColor(...C.wall);pdf.setLineWidth(1.2);pdf.rect(ox,oy,sW,sH,'S');
      pdf.setDrawColor(88,103,123);pdf.setLineWidth(0.8);pdf.line(ox-10,oy+sH,ox+sW+20,oy+sH);
      pdf.setTextColor(88,103,123);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);pdf.text('±0.00 CTN',ox+2,oy+sH+3);
      pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.35);
      pdf.line(ox+sW+4,oy,ox+sW+4,oy+sH);pdf.line(ox+sW+3,oy,ox+sW+5,oy);pdf.line(ox+sW+3,oy+sH,ox+sW+5,oy+sH);
      pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('H='+(niv*P_.hn).toFixed(1)+'m',ox+sW+8,oy+sH/2+2);
    };
    const drawAxono=(b_,P_,cx,cy2,sc)=>{
      const niv=b_.niv,bW=b_.bW,bD=b_.bD,hn=P_.hn;
      const c30=Math.cos(Math.PI/6)*sc*0.82,s30=Math.sin(Math.PI/6)*sc*0.82;
      const prj=(x,y,z)=>({px:cx+(x-y)*c30,py:cy2+(x+y)*s30-z*sc*0.82*0.55});
      const face=(pts,fr,fg,fb,sr,sg,sb,lw)=>{
        pdf.setFillColor(fr,fg,fb);pdf.setDrawColor(sr,sg,sb);pdf.setLineWidth(lw||0.35);
        if(pdf.polygon){pdf.polygon(pts.flatMap(p=>[p.px,p.py]),'FD');}
        else{for(let i=0;i<pts.length;i++){const n=(i+1)%pts.length;pdf.line(pts[i].px,pts[i].py,pts[n].px,pts[n].py);}}
      };
      const sF=Math.min(niv,5);
      for(let fl=0;fl<=sF;fl++){
        const z=fl*hn,br=178+fl*7;
        face([prj(0,0,z),prj(bW,0,z),prj(bW,bD,z),prj(0,bD,z)],br,br+5,br+15,148,158,172,0.25);
      }
      if(niv>sF){
        const z=niv*hn;
        face([prj(0,0,z),prj(bW,0,z),prj(bW,bD,z),prj(0,bD,z)],242,232,188,C.gold[0],C.gold[1],C.gold[2],0.9);
        pdf.setLineDashPattern([1.5,1.5],0);
        [[0,0],[bW,0],[bW,bD],[0,bD]].forEach(([x,y])=>{const a=prj(x,y,sF*hn),b2=prj(x,y,niv*hn);pdf.setDrawColor(175,185,202);pdf.setLineWidth(0.25);pdf.line(a.px,a.py,b2.px,b2.py);});
        pdf.setLineDashPattern([],0);
      }
      const z1=sF*hn;
      face([prj(0,bD,0),prj(bW,bD,0),prj(bW,bD,z1),prj(0,bD,z1)],215,225,245,78,98,128,0.7);
      face([prj(bW,0,0),prj(bW,bD,0),prj(bW,bD,z1),prj(bW,0,z1)],198,212,235,78,98,128,0.55);
      const wCols=Math.max(2,Math.floor(bW/3.5)),wW2=bW/wCols*0.52,wH2=hn*0.4;
      for(let row=0;row<Math.min(niv,sF);row++){
        for(let col=0;col<wCols;col++){
          if(col===Math.floor(wCols/2))continue;
          const wx=col*bW/wCols+(bW/wCols-wW2)/2,wz=row*hn+hn*0.22;
          face([prj(wx,bD,wz),prj(wx+wW2,bD,wz),prj(wx+wW2,bD,wz+wH2),prj(wx,bD,wz+wH2)],188,218,252,55,125,195,0.35);
        }
        const bz=row*hn+hn*0.82;
        face([prj(0.3,bD,bz),prj(bW-0.3,bD,bz),prj(bW-0.3,bD+0.35,bz),prj(0.3,bD+0.35,bz)],205,212,222,155,168,182,0.25);
      }
      pdf.setDrawColor(...C.wall);pdf.setLineWidth(0.9);
      [[0,0],[bW,0],[bW,bD],[0,bD]].forEach(([x,y])=>{const a=prj(x,y,0),b2=prj(x,y,z1);pdf.line(a.px,a.py,b2.px,b2.py);});
    };

    // ── CALCULE ────────────────────────────────────────────────────────
    const maxFL=Math.min(b.niv,4);
    // +3 pagini noi: Date Clădire, Inventar Goluri+Suprafețe, Celelalte 3 Fațade
    totalPages=1+1+1+maxFL+1+1+1+1+1+1+1; // cover+situatie+dateClirii+planuri+inv+fatada+3fatade+sectiune+axono+memoriu+bilant
    const fnLabel=(P.fn||'rezidential_colectiv').replace(/_/g,' ');
    const potOk=b.scArea/P.area<=P.pot+.001;
    const cutOk=b.sdaTotal/P.area<=P.cut+.001;
    const fl0=_RV.floors[0];
    const isuOk=fl0?.isu?.ok!==false;
    const solarDir=['S','SE','SV','E'].includes(P.frontDir);

    // ══════════════════════════════════════════════════════════════════
    // PAG 1 — COPERTĂ
    // ══════════════════════════════════════════════════════════════════
    newPage();
    pdf.setFillColor(...C.dark);pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(12,22,45);pdf.rect(0,H*0.4,W,H*0.6,'F');
    pdf.setFillColor(...C.gold);pdf.rect(0,0,W,1.8,'F');pdf.rect(0,H-1.8,W,1.8,'F');
    // 3D image full width top
    if(caps.img3D) addCap(caps.img3D,0,0,W,H*0.42,'');
    else{pdf.setFillColor(20,35,62);pdf.rect(0,0,W,H*0.42,'F');}
    // Dark overlay gradient bottom of image
    pdf.setFillColor(8,14,30);pdf.rect(0,H*0.32,W,H*0.12,'F');
    pdf.setFillColor(...C.gold);pdf.rect(0,1.8,8,H*0.38,'F');
    // Logo
    pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(22);pdf.text('URBANX',14,18);
    pdf.setTextColor(170,185,205);pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.text('PLATFORMĂ NAȚIONALĂ DE ANALIZĂ URBANISTICĂ',14,25);
    // Title
    pdf.setTextColor(245,248,255);pdf.setFont('helvetica','bold');pdf.setFontSize(26);pdf.text('RELEVEU ARHITECTURAL',14,H*0.46);
    pdf.setTextColor(245,248,255);pdf.setFont('helvetica','normal');pdf.setFontSize(11);pdf.text('Orientativ — Pre-proiectare · Verificare normative',14,H*0.46+10);
    pdf.setTextColor(...C.gold);pdf.setFont('helvetica','normal');pdf.setFontSize(8.5);pdf.text('Conf. Legii 50/1991 · NP 057/2002 · OMS 119/2014 · P118/2013 · C107/2022',14,H*0.46+18);
    pdf.setFillColor(45,70,120);pdf.rect(14,H*0.46+13,120,0.6,'F');
    // Info grid bottom
    const infoItems=[
      ['Nr. Cadastral',P.nrCad],['UTR / Zonă',P.utr],['Funcțiune',fnLabel],
      ['Suprafață teren',P.area+'m²'],['Regim H',b.niv+' niv. · H='+(b.niv*P.hn).toFixed(1)+'m'],
      ['POT / CUT',RN(b.scArea/P.area*100)+'% / '+(b.sdaTotal/P.area).toFixed(2)],
      ['SDA estimată',RN(b.sdaTotal)+'m²'],['Data',new Date().toLocaleDateString('ro-RO')],
    ];
    const iCols=4,iColW=(W-28)/iCols;
    infoItems.forEach(([l,v],i)=>{
      const ix=14+(i%iCols)*iColW,iy=H*0.56+Math.floor(i/iCols)*16;
      pdf.setFillColor(18,32,62);pdf.roundedRect(ix,iy,iColW-3,14,1.5,1.5,'F');
      pdf.setFillColor(...C.gold);pdf.roundedRect(ix,iy,iColW-3,4.5,1.5,1.5,'F');pdf.rect(ix,iy+2,iColW-3,2.5,'F');
      pdf.setTextColor(15,25,48);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(l),ix+(iColW-3)/2,iy+3.8,{align:'center'});
      pdf.setTextColor(220,232,248);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);pdf.text(S2(String(v)),ix+(iColW-3)/2,iy+11,{align:'center'});
    });
    pdf.setTextColor(100,120,150);pdf.setFont('helvetica','italic');pdf.setFontSize(5.5);
    pdf.text('Document orientativ · generat de UrbanX Relevee Instant · nu înlocuiește proiectul tehnic conf. Legii 50/1991 · UrbanX TSS·FG',W/2,H-3,{align:'center'});

    // ══════════════════════════════════════════════════════════════════
    // PAG 2 — PLAN DE SITUAȚIE + CONTEXT URBAN 3D
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('PLAN DE SITUAȚIE ȘI CONTEXT URBAN — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');
    // 3 imagini: location map, vedere frontala, vedere aeriana
    const imgH=H-30,imgW1=(W-20)*0.55,imgW2=(W-20)*0.44;
    pdf.setFillColor(230,234,244);pdf.rect(10,10,imgW1,imgH,'F');
    if(caps.imgLocation) addCap(caps.imgLocation,10,10,imgW1,imgH,'FIG. 1 — Plan situație · Parcela '+P.nrCad+' în context urban · Sursa: UrbanX + OpenStreetMap');
    const half2=imgH/2-1;
    pdf.setFillColor(230,234,244);pdf.rect(14+imgW1,10,imgW2,half2,'F');
    if(caps.img3D) addCap(caps.img3D,14+imgW1,10,imgW2,half2,'FIG. 2 — Vedere 3D · Volumul propus în contextul urban real');
    else if(caps.v3dDay) addCap(caps.v3dDay,14+imgW1,10,imgW2,half2,'FIG. 2 — Viewer 3D · Vedere principală');
    pdf.setFillColor(230,234,244);pdf.rect(14+imgW1,12+half2,imgW2,half2,'F');
    if(caps.v3dDay&&caps.img3D) addCap(caps.v3dDay,14+imgW1,12+half2,imgW2,half2,'FIG. 3 — Viewer 3D Urban3D · ZI · Amplasament în țesut urban');
    else if(caps.imgCity) addCap(caps.imgCity,14+imgW1,12+half2,imgW2,half2,'FIG. 3 — Hartă Municipiul Iași · Amplasament parcelă');
    // Explicatie
    pdf.setFillColor(255,255,255);pdf.rect(10,H-13,W-20,6,'F');
    noteBox('Amplasamentul se situează în Municipiul Iași, UTR '+P.utr+', cu suprafața de '+P.area+'m² și dimensiunile de aprox. '+P.W.toFixed(1)+'m × '+P.D.toFixed(1)+'m. Frontul stradal principal este orientat spre '+P.frontDir+'. Vecinătățile imediate (clădiri, aliniamente stradale, spații verzi) determină retragerile obligatorii și caracterul arhitectural al viitoarei construcții.',14,H-13,W-20,6);
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG 3: DATE CLĂDIRE + METODĂ RELEVEU + DATE TEHNICE
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('DATE CLĂDIRE · PARAMETRI URBANISTICI · METODĂ RELEVEU — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(255,255,255);pdf.rect(0,9,W,H-16,'F');
    let cy_dc=12;
    const colW3=Math.floor((W-22)/3);

    // ── Col 1: Date generale ──────────────────────────────────────────
    pdf.setFillColor(...C.dark2);pdf.rect(10,cy_dc,colW3,6,'F');pdf.setFillColor(...C.gold);pdf.rect(10,cy_dc,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('DATE GENERALE CLĂDIRE',10+colW3/2,cy_dc+4.2,{align:'center'});
    let r1y=cy_dc+8;
    const dat1=[
      ['Nr. cadastral ANCPI:',P.nrCad,''],
      ['UAT / Localitate:','Municipiul Iași, jud. Iași',''],
      ['UTR / Zonă PUG:',P.utr,'conf. PUG Iași în vigoare'],
      ['Funcțiunea propusă:',S2(fnLabel),'conf. AEDIS / PUG'],
      ['Front stradal principal:',P.frontDir+' ('+({N:'Nord',S:'Sud',E:'Est',V:'Vest',NE:'Nord-Est',NV:'Nord-Vest',SE:'Sud-Est',SV:'Sud-Vest'}[P.frontDir]||P.frontDir)+')','OMS 119/2014'],
      ['Suprafața teren (ST):',P.area+' m²','conf. CF/ANCPI'],
      ['Dim. bbox parcelă:',P.W.toFixed(1)+' m × '+P.D.toFixed(1)+' m','estimat din GIS'],
      ['Retragere front (Rf):',P.rf+' m','conf. RLU UTR '+P.utr],
      ['Retragere lateral (Rl):',P.rl+' m','conf. RLU'],
      ['Retragere spate (Rs):',P.rs+' m','conf. RLU'],
    ];
    dat1.forEach(([lab,val,obs],i)=>{
      pdf.setFillColor(i%2?248:255,i%2?250:252,252);pdf.rect(10,r1y-2.5,colW3,6,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(10,r1y+3.5,10+colW3,r1y+3.5);
      pdf.setTextColor(70,90,115);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(S2(lab),12,r1y+1);
      pdf.setTextColor(15,35,75);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(String(val)),12,r1y+5);
      if(obs){pdf.setTextColor(120,140,160);pdf.setFont('helvetica','italic');pdf.setFontSize(4.2);pdf.text(S2(obs),12,r1y+8);}
      r1y+=obs?11:7;
    });

    // ── Col 2: Indicatori urbanistici ─────────────────────────────────
    const cx2=10+colW3+2;
    pdf.setFillColor(...C.dark2);pdf.rect(cx2,cy_dc,colW3,6,'F');pdf.setFillColor(...C.gold);pdf.rect(cx2,cy_dc,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('INDICATORI URBANISTICI',cx2+colW3/2,cy_dc+4.2,{align:'center'});
    let r2y=cy_dc+8;
    const dat2=[
      ['POT maxim admis (PUG):',RN(P.pot*100)+'%','PUG · NP 068'],
      ['POT realizat:',RN(b.scArea/P.area*100)+'%',potOk?'CONFORM ✓':'DEPĂȘIRE ✗'],
      ['CUT maxim admis (PUG):',String(P.cut),'PUG · NP 068'],
      ['CUT realizat:',(b.sdaTotal/P.area).toFixed(2),cutOk?'CONFORM ✓':'DEPĂȘIRE ✗'],
      ['H maxim admis:',P.hMax+' m','conf. RLU'],
      ['H total propus:',(b.niv*P.hn).toFixed(1)+' m','P+'+( b.niv-1)+'E'],
      ['Niveluri:',b.niv+' niv. (P+'+( b.niv-1)+'E)','H/nivel = '+P.hn.toFixed(1)+'m'],
      ['Suprafată construită (SC):',RN(b.scArea)+' m²','la sol'],
      ['SDA totală:',RN(b.sdaTotal)+' m²','Σ planșee'],
      ['SDA per nivel:',RN(b.sdaPerFloor)+' m²','medie/etaj'],
      ['Nuclee scări+lift:',b.cores.length,'conf. P118-2/2013'],
      ['Unități locative est.:',RN(b.niv*b.cores.length*4),'orientativ'],
    ];
    dat2.forEach(([lab,val,note],i)=>{
      const isOk=String(note).includes('✓'),isErr=String(note).includes('✗');
      pdf.setFillColor(i%2?248:255,i%2?250:252,252);pdf.rect(cx2,r2y-2.5,colW3,6,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(cx2,r2y+3.5,cx2+colW3,r2y+3.5);
      pdf.setTextColor(70,90,115);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(S2(lab),cx2+2,r2y+1);
      const vc=isOk?C.green:isErr?C.red:[15,35,75];
      pdf.setTextColor(...vc);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(val),cx2+2,r2y+5);
      pdf.setTextColor(isOk?[34,197,94][0]:isErr?C.red[0]:120,isOk?150:isErr?60:140,isOk?94:isErr?38:160);
      pdf.setFont('helvetica','italic');pdf.setFontSize(4.2);pdf.text(S2(note),cx2+colW3-2,r2y+5,{align:'right'});
      r2y+=9;
    });

    // ── Col 3: Metodă Releveu + Scop ─────────────────────────────────
    const cx3=cx2+colW3+2;
    const rw3=W-cx3-8;
    pdf.setFillColor(...C.dark2);pdf.rect(cx3,cy_dc,rw3,6,'F');pdf.setFillColor(...C.gold);pdf.rect(cx3,cy_dc,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('METODĂ RELEVEU · SCOP',cx3+rw3/2,cy_dc+4.2,{align:'center'});
    let r3y=cy_dc+10;

    // Scop Releveu
    pdf.setFillColor(235,242,252);pdf.roundedRect(cx3,r3y,rw3,22,1.5,1.5,'F');
    pdf.setFillColor(...C.blue);pdf.rect(cx3,r3y,2,22,'F');
    pdf.setTextColor(...C.blue);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text('SCOP DOCUMENT',cx3+5,r3y+5);
    pdf.setTextColor(20,45,90);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
    const scopTxt='Prezentul releveu orientativ a fost generat automat de platforma UrbanX în scop de PRE-PROIECTARE — pentru evaluarea fezabilității urbanistice a parcelei nr. '+P.nrCad+' și estimarea funcționalității propuse. NU înlocuiește releveul elaborat de arhitect autorizat OAR la fazele DTAC / PT / PAC conf. Legii 50/1991.';
    const sl=pdf.splitTextToSize(S2(scopTxt),rw3-7);
    sl.slice(0,4).forEach((l,li)=>pdf.text(l,cx3+5,r3y+10+li*3));
    r3y+=26;

    // Metodă ridicare
    pdf.setFillColor(235,252,242);pdf.roundedRect(cx3,r3y,rw3,52,1.5,1.5,'F');
    pdf.setFillColor(...C.green);pdf.rect(cx3,r3y,2,52,'F');
    pdf.setTextColor(0,120,60);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text('METODĂ DE RIDICARE (selectați la faza PT)',cx3+5,r3y+5);
    const metode=[
      ['☐ Manual (ruletă + teodolit optic)','Precizie ±2-5cm, cost redus, timp ridicat'],
      ['☐ Stație totală robotizată','Precizie ±1-3cm, rapidă, export DXF/CAD'],
      ['☐ Scanare 3D cu laser (LiDAR)','Precizie ±2-5mm, nor de puncte, BIM-ready'],
      ['☐ Fotogrammetrie aeriană (UAV)','Precizie ±1-5cm, acoperire completă exterior'],
      ['☐ Fotogrammetrie terestră','Precizie ±5-10mm, fațade și interior'],
    ];
    metode.forEach(([m,d],mi)=>{
      pdf.setTextColor(0,80,40);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(m,cx3+5,r3y+13+mi*8);
      pdf.setTextColor(40,100,70);pdf.setFont('helvetica','italic');pdf.setFontSize(4.8);pdf.text(d,cx3+5,r3y+17+mi*8);
    });
    r3y+=56;

    // Nivel detaliu
    pdf.setFillColor(252,248,232);pdf.roundedRect(cx3,r3y,rw3,32,1.5,1.5,'F');
    pdf.setFillColor(...C.gold);pdf.rect(cx3,r3y,2,32,'F');
    pdf.setTextColor(120,80,0);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text('NIVEL DE DETALIU',cx3+5,r3y+5);
    const nivDet=[
      ['☐ Sumar','Plan general + dimensiuni principale, fără cote interioare'],
      ['☐ Mediu','Cote complete, grosimi pereți, tipuri goluri (uzual PT)'],
      ['☐ Execuție','Toate cotele, materiale, detalii constructive, finisaje'],
    ];
    nivDet.forEach(([n,d],ni)=>{
      pdf.setTextColor(100,65,0);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(n,cx3+5,r3y+13+ni*8);
      pdf.setTextColor(100,80,20);pdf.setFont('helvetica','italic');pdf.setFontSize(4.8);pdf.text(d,cx3+5,r3y+17+ni*8);
    });
    r3y+=36;

    // Normative aplicate
    pdf.setFillColor(248,248,252);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(cx3,r3y,rw3,H-r3y-18,'FD');
    pdf.setFillColor(...C.dark2);pdf.rect(cx3,r3y,rw3,5.5,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text('NORMATIVE OBLIGATORII LA PT',cx3+2,r3y+3.8);
    const norme2=[['NP 057/2002','Suprafețe minime locuințe'],['OMS 119/2014','Însorire min. 1.5h/zi'],['P118-2/2013','Evacuare ISU, căi acces'],['NP 051/2012','PMR, lift obligatoriu P+4+'],['C107/1-5:2022','Coeficienți termici U'],['P100-1/2013','Proiectare seismică'],['Legea 10/1995','Calitatea construcțiilor'],['SR EN 1992-1','BA — proiectare structurală']];
    norme2.forEach(([cod,desc],ni)=>{
      const ny=r3y+8+ni*7;if(ny>H-20)return;
      pdf.setFillColor(ni%2?250:255,ni%2?251:253,255);pdf.rect(cx3,ny-2,rw3,7,'F');
      pdf.setTextColor(...C.blue);pdf.setFont('helvetica','bold');pdf.setFontSize(5);pdf.text(cod,cx3+2,ny+2);
      pdf.setTextColor(40,60,100);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(S2(desc),cx3+26,ny+2);
    });
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG 3..N+2 — PLANURI DE NIVEL CU EXPLICAȚII
    // ══════════════════════════════════════════════════════════════════
    for(let fl=0;fl<maxFL;fl++){
      newPage();
      const flObj=_RV.floors[fl];
      const flLabel=fl===0?'PLAN PARTER (cota ±0.00)':'PLAN ETAJ '+fl+' (cota +'+(fl*P.hn).toFixed(2)+'m)';
      hdr(flLabel+' — Nr.cad. '+P.nrCad+' · UTR '+P.utr,pgN);
      pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');

      // Plan area (left 2/3)
      const planAreaW=W*0.62,planAreaH=H-28;
      pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
      pdf.rect(10,10,planAreaW-5,planAreaH,'FD');

      const sc=Math.min((planAreaW-25)/(P.W+2),(planAreaH-20)/(P.D+8));
      const ox=10+((planAreaW-25)-b.bW*sc)/2+P.rl*sc+2;
      const oy=10+((planAreaH-20)-b.bD*sc)/2+P.rf*sc+4;

      drawPlan(flObj,P,b,ox,oy,sc);
      drawNorth(planAreaW-10,22,P.frontDir,6);
      drawScale(14,H-13,sc);
      // Secțiune A-A (longitudinală, orizontală)
      pdf.setTextColor(...C.red);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('A',ox-2.5,oy+b.bD*sc/2);pdf.text('A',ox+b.bW*sc+2,oy+b.bD*sc/2);
      pdf.setDrawColor(...C.red);pdf.setLineWidth(0.35);pdf.setLineDashPattern([1,0.8],0);
      pdf.line(ox,oy+b.bD*sc/2,ox+b.bW*sc,oy+b.bD*sc/2);pdf.setLineDashPattern([],0);
      // Secțiune B-B (transversală, verticală)
      pdf.setTextColor(37,99,235);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('B',ox+b.bW*sc/2,oy-2.5);pdf.text('B',ox+b.bW*sc/2,oy+b.bD*sc+3.5);
      pdf.setDrawColor(37,99,235);pdf.setLineWidth(0.35);pdf.setLineDashPattern([1,0.8],0);
      pdf.line(ox+b.bW*sc/2,oy,ox+b.bW*sc/2,oy+b.bD*sc);pdf.setLineDashPattern([],0);

      // ── RIGHT PANEL — ghid complet pentru non-arhitect ─────────────────
      const rx=10+planAreaW,ry=10,rw=W-rx-8,rh=planAreaH;
      pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(rx,ry,rw,rh,'FD');
      let panY=ry+2;

      // Header panel
      pdf.setFillColor(...C.dark2);pdf.rect(rx,panY,rw,7,'F');
      pdf.setFillColor(...C.gold);pdf.rect(rx,panY,2,7,'F');
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
      pdf.text(fl===0?'CUM SE CITEȘTE PLANUL PARTERULUI':'CUM SE CITEȘTE PLANUL ETAJULUI '+fl,rx+rw/2,panY+5,{align:'center'});
      panY+=10;

      // Introducere contextualizata
      const floorTitle=fl===0?'PARTER — NIVELUL 0 (COTA ±0.00)':'ETAJ '+fl+' — COTA +'+(fl*P.hn).toFixed(2)+'m';
      pdf.setFillColor(235,242,252);pdf.roundedRect(rx+1,panY,rw-2,5,1,1,'F');
      pdf.setTextColor(...C.blue);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text(floorTitle,rx+3,panY+3.5);panY+=7;

      const genExp=fl===0
        ?'Acesta este planul parterului — primul nivel al clădirii, la nivelul solului. Pe acest plan veți găsi: intrarea principală în clădire cu holul de acces, căsuțe poștale, nucleele de scări cu lift (accesul vertical la toate etajele), și apartamentele de la parter. Toți peretii sunt la scara 1:100 — 1cm pe plan = 1m în realitate.'
        :'Acesta este planul etajului '+fl+' — un nivel tipic de locuire la înălțimea de '+(fl*P.hn).toFixed(2)+'m față de sol. Toate etajele de la 1 la '+(b.niv-1)+' au același plan funcțional (tip). Fiecare etaj cuprinde '+RN(b.cores.length*4)+' apartamente cu o suprafață totală de '+RN(b.sdaPerFloor)+'m².';
      panY=bodyTxt(genExp,rx+2,panY,rw-4,5.2,[30,50,80]);panY+=4;

      // Sectiune: CE VEDETI
      pdf.setFillColor(245,248,252);pdf.rect(rx,panY,rw,5.5,'F');
      pdf.setFillColor(...C.gold);pdf.rect(rx,panY,2,5.5,'F');
      pdf.setTextColor(30,50,85);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('CE REPREZINTĂ FIECARE CULOARE PE PLAN?',rx+4,panY+3.8);panY+=7.5;

      // Room explanations - full detail
      const roomExpl=[
        [C.core,C.blue,'CASĂ SCĂRI + LIFT (albastru)','Inima verticală a clădirii. Scara permite accesul pe jos între etaje; liftul este OBLIGATORIU conf. NP 051/2012 pentru clădiri P+4 și mai mult și asigură accesul persoanelor cu mobilitate redusă (PMR). Cabina liftului min. 1.1×1.4m, ușă min. 0.8m (Legea 448/2006). Casa scărilor este compartimentată antifoc (uși EI 30) pentru evacuare în siguranță.','14m²','Nucleu'],
        [C.hall,C.gray,'HOL / CORIDOR (gri)','Spațiu de tranziție și circulație. La PARTER: conține căsuțele poștale, interfon video color, eventual spații biciclete. La ETAJE: coridorul care leagă liftul/scara de ușile apartamentelor. Lățime min. 1.2m conf. P118 evacuare. Fără lumină naturală directă — reglementat de ventilație mecanică.','min. 3m²','Circulație'],
        [C.living,C.orange,'LIVING / SALON (portocaliu)','Camera principală de zi și socializare — cea mai mare cameră din apartament. Orientată obligatoriu spre Sud, Est sau Vest pentru însorire min. 1.5h/zi la solstițiu de iarnă (OMS 119/2014). Min. 14m² conf. NP 057/2002 — suficient pentru canapea, masă dining, TV. Fereastra: min. 1/8 din suprafața camerei = min. 1.75m². Ventilație naturală directă obligatorie.','min. 14m²','Zi'],
        [C.bedroom,C.green,'DORMITOR (verde)','Camera de odihnă — pat dublu sau pat single + dulap + birou. Suprafața minimă: 12m² dormitor principal, 10m² dormitor secundar (NP 057/2002). IMPORTANT: Dormitoarele NU se orientează spre Nord — însorirea minimă 1.5h/zi este OBLIGATORIE (OMS 119/2014). Fereastra asigură ventilarea nocturnă (aerisire obligatorie). Izolație fonică față de vecini min. Rw=52dB (SR EN ISO 717-1).','min. 10m²','Noapte'],
        [C.kitchen,C.cyan,'BUCĂTĂRIE (turcoaz)','Spațiu de preparare alimente. Min. 5m² conf. NP 057/2002 — suficient pentru friteuza, cuptor, frigider, spălător, masă mică. OBLIGATORIU: ventilație mecanică cu extractor (hota) direct spre exterior conf. SR EN 15665. Racorduri: apă rece+caldă, canalizare, gaz natural sau electric (centrală termică). Faianta pe pereți (min. 1.5m înălțime), pardoseală ceramică.','min. 5m²','Zi'],
        [C.bath,C.purple,'BAIE / WC (violet)','Grupul sanitar — baie cu cadă/cabină duș, lavoar, WC. Min. 3.6m² baie, 1.2m² WC separat (NP 057/2002). OBLIGATORIU ventilație mecanică spre exterior (nu în plafon!) conf. I5/2010. Hidroizolație planșeu și pereți min. 2m înălțime conf. SR EN 1504. Faianta 100% pereți. Pardoseală ceramică anti-alunecare (R9 min).','min. 3.6m²','Igienă'],
        [C.balcon,C.gold,'BALCON / TERASĂ (auriu, linie punctată)','Extensie exterioară a apartamentului — spațiu semi-exterior acoperit. IMPORTANT: balconul NU este inclus în suprafața utilă dar se adaugă la suprafața construită. Adâncime min. 1.2m conf. NP 016-97. Parapet min. 1.0m înălțime conf. STAS 6131/1-1982. Sticlă securizată sau beton parapet. Planseul balconului: PUNTE TERMICĂ — necesită ruptură termică obligatorie conf. C107-05.','min. 4.5m²','Semi-ext.'],
      ];
      roomExpl.forEach(([fill,stk,name,expl,minArea,tip])=>{
        if(panY>ry+rh-32)return;
        // Color bar + name
        pdf.setFillColor(...fill);pdf.setDrawColor(...stk);pdf.setLineWidth(0.5);pdf.rect(rx+1,panY,6,12,'FD');
        pdf.setFillColor(...stk);pdf.rect(rx+1,panY+9.5,6,2.5,'F'); // bottom accent
        // Name
        pdf.setTextColor(...stk);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(name),rx+9,panY+4);
        // Min area badge
        pdf.setFillColor(...stk);pdf.roundedRect(rw+rx-18,panY,17,5.5,1,1,'F');
        pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);pdf.text(minArea,rw+rx-9.5,panY+3.5,{align:'center'});
        // Description
        pdf.setTextColor(45,60,80);pdf.setFont('helvetica','normal');pdf.setFontSize(4.8);
        const expLines=pdf.splitTextToSize(S2(expl),rw-9);
        expLines.slice(0,3).forEach((l,li)=>pdf.text(l,rx+9,panY+8+li*2.9));
        panY+=15;
      });
      panY+=2;

      // Sectiune: FERESTRE SI USA
      if(panY<ry+rh-40){
        pdf.setFillColor(232,245,255);pdf.roundedRect(rx+1,panY,rw-2,28,1.5,1.5,'F');
        pdf.setFillColor(...C.blue);pdf.rect(rx+1,panY,2,28,'F');
        pdf.setTextColor(...C.blue);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
        pdf.text('FERESTRELE — DE CE SUNT ACOLO ȘI CE FAC?',rx+5,panY+5);
        pdf.setTextColor(20,45,80);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
        const fExp='Ferestrele sunt marcate cu dreptunghiuri albastre pe pereții exteriori ai clădirii. Ele au 3 roluri esențiale, toate reglementate legal: (1) LUMINA NATURALA: suprafața vitrata min. 1/8 din suprafata camerei conf. NP 016-97. O camera de 14m² are nevoie de min. 1.75m² geam — o fereastra de 1.2m x 1.5m depaseste aceasta cerinta. (2) AERISIREA: ventilatie naturala directa obligatorie pentru camerele de locuit — se deschid min. 1/20 din suprafata camerei conf. I5/2010. (3) CASTIG SOLAR PASIV iarna: ferestrele de pe fatadele S/SE/SV permit intrarea caldurii solare, reducand cu 15-25% consumul de incalzire. Specificatie recomandata: tamplarie PVC sau aluminiu cu rupere de punte termica, geam triplu low-E cu argon, Uw≤1.0 W/m²K conf. C107-2005. Cost estimat: 300-450 EUR/mp fereastra.';
        const fLines=pdf.splitTextToSize(S2(fExp),rw-6);
        fLines.slice(0,7).forEach((l,li)=>pdf.text(l,rx+5,panY+11+li*2.9));
        panY+=31;
      }

      if(panY<ry+rh-22 && fl===0){
        pdf.setFillColor(255,245,225);pdf.roundedRect(rx+1,panY,rw-2,20,1.5,1.5,'F');
        pdf.setFillColor(...C.orange);pdf.rect(rx+1,panY,2,20,'F');
        pdf.setTextColor(...C.orange);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
        pdf.text('USA PRINCIPALA DE INTRARE — ACCES SI SECURITATE',rx+5,panY+4.5);
        pdf.setTextColor(70,40,10);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
        const dExp='Marcata cu arc portocaliu pe planul parterului. Latime OBLIGATORIE min. 1.2m simpla / recomandat 1.8m dubla conf. NP 051/2012 (acces persoane cu scaun rulant si carucior). Sistemul de acces include: interfon video color cu deblocare la distanta, yala electromagnetica sau electronic, posibil cititor de card/telecomanda. Usa: antiefractie clasa RC2 (SR EN 1627), cu garnitura termica si fonica. Pragul: max 2cm sau rampa (PMR). Iluminat automat cu senzor de miscare obligatoriu (min. 100 lux la intrare conf. NP 061).';
        const dLines=pdf.splitTextToSize(S2(dExp),rw-6);
        dLines.slice(0,5).forEach((l,li)=>pdf.text(l,rx+5,panY+10+li*2.9));
        panY+=23;
      }

      // Performanta termica
      if(panY<ry+rh-18){
        pdf.setFillColor(232,252,240);pdf.roundedRect(rx+1,panY,rw-2,16,1.5,1.5,'F');
        pdf.setFillColor(...C.green);pdf.rect(rx+1,panY,2,16,'F');
        pdf.setTextColor(0,100,50);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
        pdf.text('EFICIENTA ENERGETICA A ACESTUI NIVEL',rx+5,panY+4.5);
        pdf.setTextColor(10,60,30);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
        const eExp='Consumul energetic al nivelului '+fl+' este minimizat prin: termoizolatie pereti exteriori 15cm EPS (U=0.27 W/m²K, sub limita admisa de 0.35 W/m²K conf. C107/4-2022), geamuri triplu low-E (Uw≤1.0 vs. limita 1.30 W/m²K), ventilatie cu recuperare caldura 80% eficienta, pod termic la balcoane (ruptura termica). Clasa energetica estimata B-A dupa finalizare. Obligatia proprietarului: respectarea normei NZEB conf. Legea 372/2005 modificata — cladirile noi dupa 2021 sunt Nearly Zero Energy Building.';
        const eLines=pdf.splitTextToSize(S2(eExp),rw-6);
        eLines.slice(0,4).forEach((l,li)=>pdf.text(l,rx+5,panY+10+li*2.9));
        panY+=19;
      }

      // Cartus
      pdf.setFillColor(15,28,55);pdf.rect(rx,H-17,rw,9,'F');
      pdf.setFillColor(...C.gold);pdf.rect(rx,H-17,rw,1.2,'F');
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('Nr.cad. '+S2(P.nrCad)+' · UTR '+S2(P.utr)+' · '+(fl===0?'PLAN PARTER':'PLAN ETAJ '+fl)+' · Sc.1:100',rx+rw/2,H-12,{align:'center'});
      pdf.setTextColor(120,140,170);pdf.setFont('helvetica','normal');pdf.setFontSize(4.8);
      pdf.text('Cota ±'+(fl===0?'0.00':'+')+(fl*P.hn).toFixed(2)+'m · SC='+RN(b.scArea)+'m² · SDA nivel='+RN(b.sdaPerFloor)+'m² · Document orientativ UrbanX',rx+rw/2,H-8,{align:'center'});
      ftr();
    }

    // ══════════════════════════════════════════════════════════════════
    // PAG: TABEL SUPRAFEȚE + INVENTAR GOLURI (USI/FERESTRE)
    // ══════════════════════════════════════════════════════════════════
    {
    const fl0data=_RV.floors[0]||{rects:[],wins:[],doors:[]};
    newPage();
    hdr('TABEL SUPRAFEȚE · INVENTAR GOLURI (UȘI & FERESTRE) — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(255,255,255);pdf.rect(0,9,W,H-16,'F');
    const halfW=(W-22)/2;
    let tY=12;

    // ── Tabel suprafețe ────────────────────────────────────────────────
    pdf.setFillColor(...C.dark2);pdf.rect(10,tY,halfW-2,6,'F');
    pdf.setFillColor(...C.gold);pdf.rect(10,tY,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
    pdf.text('TABEL SUPRAFEȚE — PARTER',10+(halfW-2)/2,tY+4.2,{align:'center'});
    tY+=7;

    const sfW=[30,22,22,22,22,halfW-2-30-22-22-22-22];
    tY=tblHdr(['Spațiu / Cameră','Tip','L (m)','l (m)','Sup. (m²)','Normă min.'],sfW,tY);
    // Per-room data
    const aptGroups={};
    fl0data.rects.filter(r=>r.apt>=0&&!r.bal).forEach(r=>{
      const aId=r.apt;
      if(!aptGroups[aId]) aptGroups[aId]=[];
      aptGroups[aId].push(r);
    });
    const typeLabels={living:'Living/Salon',bedroom:'Dormitor 1',bedroom2:'Dormitor 2',bedroom3:'Dormitor 3',kitchen:'Bucătărie',bath:'Baie',wc:'WC',hall:'Hol/Coridor',storage:'Depozitare',core:'Casa scărilor',balcon:'Balcon',office:'Birou',meeting:'Sală ședințe',commercial:'Spațiu comercial',reception:'Recepție'};
    const normMin={living:'14m²',bedroom:'12m²',bedroom2:'10m²',kitchen:'5m²',bath:'3.6m²',wc:'1.2m²',hall:'2m²',core:'—',balcon:'—',storage:'—'};
    let rowI=0,totalSF=0;
    // Show rooms from apartments (up to 20 rows)
    const allRooms=fl0data.rects.filter(r=>!r.bal&&r.w>0.3&&r.h>0.3).slice(0,25);
    allRooms.forEach((r)=>{
      if(tY>H-40)return;
      const area=r.w*r.h,areaOk=area>=(parseFloat(normMin[r.t])||0);
      const nm=normMin[r.t]||'—';
      tY=tblRow([S2(typeLabels[r.t]||r.t),S2(r.t),RN(r.w,2),RN(r.h,2),RN(area,2)+(areaOk?'':' ⚠'),nm],sfW,tY,rowI%2===0);
      totalSF+=area; rowI++;
    });
    // Balcoane
    fl0data.rects.filter(r=>r.bal&&r.w>0.3&&r.h>0.3).slice(0,5).forEach(r=>{
      if(tY>H-40)return;
      tY=tblRow(['Balcon','balcon',RN(r.w,2),RN(r.h,2),RN(r.w*r.h,2),'—'],sfW,tY,rowI%2===0); rowI++;
    });
    // Totaluri
    pdf.setFillColor(...C.dark2);pdf.rect(10,tY,halfW-2,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('TOTAL SUPRAFȚĂ UTILĂ (nivel 0):',12,tY+4);
    pdf.text(RN(totalSF,1)+' m²',10+halfW-4,tY+4,{align:'right'});
    tY+=8;

    // Bilanț suprafete
    const bilRws=[
      ['SC edificiu (la sol):',RN(b.scArea)+' m²'],
      ['SDA totală (toate nivelurile):',RN(b.sdaTotal)+' m²'],
      ['SDA / nivel (medie):',RN(b.sdaPerFloor)+' m²'],
      ['Spații verzi necesare ('+RN((1-P.pot)*100*0.1,0)+'% min):',RN(P.area*(1-P.pot)*0.1)+' m²'],
      ['H liberă / nivel estimată:','≈ '+(P.hn-0.3).toFixed(2)+' m (structură ~30cm)'],
      ['Volum construit estimat:',RN(b.sdaTotal*(P.hn-0.3))+' m³'],
    ];
    bilRws.forEach(([lab,val],i)=>{
      if(tY>H-25)return;
      pdf.setFillColor(i%2?248:255,i%2?250:252,252);pdf.rect(10,tY,halfW-2,5.5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(10,tY+5.5,10+halfW-2,tY+5.5);
      pdf.setTextColor(60,80,105);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);pdf.text(S2(lab),12,tY+4);
      pdf.setTextColor(15,35,75);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(val),10+halfW-4,tY+4,{align:'right'});
      tY+=5.5;
    });

    // ── BOMA / IPMS / GIF / ANCPI Standards Table ────────────────────
    tY+=3;
    pdf.setFillColor(...C.dark2);pdf.rect(10,tY,halfW-2,6,'F');
    pdf.setFillColor(...C.gold);pdf.rect(10,tY,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
    pdf.text('SUPRAFEȚE CONFORM STANDARDE INTERNAȚIONALE',10+(halfW-2)/2,tY+4.2,{align:'center'});
    tY+=8;

    // Calcule suprafete
    const floorRects=fl0data.rects.filter(r=>!r.bal&&r.w>0.3&&r.h>0.3);
    const coreArea=floorRects.filter(r=>r.t==='core'||r.apt===-1).reduce((s,r)=>s+r.w*r.h,0);
    const corrArea=floorRects.filter(r=>r.apt<0&&r.t==='hall').reduce((s,r)=>s+r.w*r.h,0);
    const usableRooms=floorRects.filter(r=>r.apt>=0&&!['core','hall'].includes(r.t));
    const NIA=usableRooms.reduce((s,r)=>s+r.w*r.h,0);
    const commonArea=coreArea+corrArea;
    const GIA=b.scArea; // Gross Internal Area = SC (nivel)
    const GFA=P.W*P.D; // Gross Floor Area (parcel footprint)
    const numUnits=Math.max(1,Math.round(b.niv*b.cores.length*4));
    const RentableIPMS=NIA+(commonArea/Math.max(1,numUnits)); // IPMS 2 per unit
    const RentableBOMA=NIA*(1+commonArea/Math.max(1,GIA-commonArea)); // BOMA method
    const LossFactor=(commonArea/GIA*100);
    const RICS_NIA=NIA*0.97; // RICS: exclude pillars/thresholds
    const DIN277_NGF=NIA+commonArea*0.7; // Netto-Grundfläche
    const ANCPI_SU=NIA*0.95; // Suprafata utila cadastrala (fara gros pereti interiori)
    const ANCPI_SC=GIA;

    const stdRows=[
      ['Standard','Denumire suprafață','Valoare','Descriere / Utilizare'],
    ];
    const boma_rows=[
      ['BOMA 2017','Usable Area (UA)',RN(NIA,1)+' m²','Aria utilizabilă per chiriaș — fără zone comune'],
      ['BOMA 2017','Rentable Area (RA)',RN(RentableBOMA,1)+' m²','UA + cotă proporțională zone comune (corridors, lifturi)'],
      ['BOMA 2017','Loss Factor',RN(LossFactor,1)+'%','Procent pierdut prin zone comune — uzual 12-20%'],
      ['IPMS 2 (GIA)','Gross Internal Area',RN(GIA,1)+' m²','Suprafata bruta interna — de la fata interioara a peretilor exteriori'],
      ['IPMS 3 (NIA)','Net Internal Area',RN(NIA,1)+' m²','Suprafata neta utilizabila — fara pereti, circulatii comune, core'],
      ['RICS CoMP','Net Internal Area',RN(RICS_NIA,1)+' m²','IPMS 3 minus praguri, stâlpi, nise sub 0.25m²'],
      ['DIN 277 (DE)','Netto-Grundfläche',RN(DIN277_NGF,1)+' m²','NGF: suprafata neta totala (NF1+NF2+VF1+VF2)'],
      ['ANCPI (RO)','Suprafață utilă (SU)',RN(ANCPI_SU,1)+' m²','Suprafata incaperilor principale — fara pereti, hol comun, bai/wc sub 1.2m'],
      ['ANCPI (RO)','Suprafață construită (SC)',RN(ANCPI_SC,1)+' m²','Amprenta la sol (contur exterior) — cf. L7/1996 si ANCPI norme 2023'],
      ['ANCPI (RO)','Suprafață desfașurată (SDA)',RN(b.sdaTotal,1)+' m²','Suma SC per toate nivelurile — folosita la autorizare L50/1991'],
    ];

    const bW_=[25,35,22,halfW-2-25-35-22];
    tY=tblHdr(['Standard','Tip suprafață','Valoare','Utilizare / Obs.'],bW_,tY);
    boma_rows.forEach(([std,tip,val,desc],ri)=>{
      if(tY>H-18)return;
      tY=tblRow([std,tip,val,desc],bW_,tY,ri%2===0);
    });

    // ── Inventar goluri ────────────────────────────────────────────────
    const gx=10+halfW+2, gY=12;
    let gCol=gY;
    pdf.setFillColor(...C.dark2);pdf.rect(gx,gCol,halfW,6,'F');
    pdf.setFillColor(...C.gold);pdf.rect(gx,gCol,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
    pdf.text('INVENTAR GOLURI — UȘI & FERESTRE',gx+halfW/2,gCol+4.2,{align:'center'});
    gCol+=7;

    // Ferestre
    pdf.setFillColor(235,248,255);pdf.rect(gx,gCol,halfW,5.5,'F');
    pdf.setFillColor(30,150,200);pdf.rect(gx,gCol,1.5,5.5,'F');
    pdf.setTextColor(30,100,170);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('FERESTRE (estimat din geometrie)',gx+4,gCol+4);gCol+=7;
    const ferW=[15,22,18,18,22,halfW-15-22-18-18-22];
    gCol=tblHdr(['Fațadă','Tip cameră','L est.(m)','H est.(m)','Sup.(m²)','Specificație jPDF'],ferW,gCol);
    const winTypes={'living':'Fereastra mare',bedroom:'Fereastra dormitor',bedroom2:'Fereastra dormitor',kitchen:'Fereastra bucatarie',hall:'Fereastra hol',bath:'Oblon/Geam mat'};
    const winSpec={'living':'PVC 5cam., 2×0.7m, Uw≤1.0W/m²K',bedroom:'PVC 5cam., 1×0.7m',bedroom2:'PVC 5cam., 1×0.7m',kitchen:'PVC 5cam., 0.6×0.6m',bath:'Geam opac FR'};
    fl0data.wins.slice(0,15).forEach((w,wi)=>{
      if(gCol>H-40)return;
      const wW=w.w||1.2,wH_=1.2,wArea=wW*wH_;
      gCol=tblRow([w.wall,S2(winTypes[w.type]||w.type||'—'),RN(wW,2),RN(wH_,2),RN(wArea,2),S2(winSpec[w.type]||'PVC/AL triplu low-E')],ferW,gCol,wi%2===0);
    });
    gCol+=4;

    // Usi
    pdf.setFillColor(255,245,230);pdf.rect(gx,gCol,halfW,5.5,'F');
    pdf.setFillColor(200,100,20);pdf.rect(gx,gCol,1.5,5.5,'F');
    pdf.setTextColor(150,70,10);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('UȘI — ACCES & COMPARTIMENTARE',gx+4,gCol+4);gCol+=7;
    const usiW=[22,18,22,22,halfW-22-18-22-22];
    gCol=tblHdr(['Tip ușă','Lăț. liberă (m)','H est. (m)','Direcție','Specificație'],usiW,gCol);
    fl0data.doors.slice(0,8).forEach((d,di)=>{
      if(gCol>H-25)return;
      const tip=d.type==='main'?'Ușă intrare principală':'Ușă apartament';
      const spec=d.type==='main'?'AL antiefractie RC2, 1.8m, PMR':'Lemn stratif. EI30, 0.9m, yală';
      gCol=tblRow([tip,RN(d.w,2),'2.10',S2(d.swing||'—'),spec],usiW,gCol,di%2===0);
    });
    gCol+=4;

    // Notă grosimi pereți
    if(gCol<H-35){
      pdf.setFillColor(245,248,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(gx,gCol,halfW,H-gCol-18,'FD');
      pdf.setFillColor(...C.dark2);pdf.rect(gx,gCol,halfW,5.5,'F');
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text('GROSIMI PEREȚI ESTIMATIVE',gx+4,gCol+4);gCol+=7;
      const pereti=[
        ['Perete exterior (BA+BCA+EPS)','~40-45 cm','U=0.27 W/m²K, antiseismic P100'],
        ['Perete structural interior (BA)','~20-25 cm','C25/30, armătură S500'],
        ['Perete despărțitor (cărămidă/GKF)','~10-15 cm','Rw≥52dB (SR EN ISO 717-1)'],
        ['Planșeu inter-etaj (BA+izolație)','~20-22 cm','U≤0.30 W/m²K, Lw≤58dB'],
        ['Planșeu terasă (XPS20+hidroiz.)','~30-35 cm','U=0.18 W/m²K'],
        ['Pardoseală parter (XPS10+sapa)','~15-20 cm','U=0.28 W/m²K'],
      ];
      pereti.forEach(([n,gros,spec],pi)=>{
        if(gCol>H-22)return;
        pdf.setFillColor(pi%2?248:255,252,255);pdf.rect(gx,gCol-2,halfW,8.5,'F');
        pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(gx,gCol+6.5,gx+halfW,gCol+6.5);
        pdf.setTextColor(20,40,90);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(n),gx+2,gCol+2);
        pdf.setTextColor(0,80,180);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(gros),gx+halfW-30,gCol+2);
        pdf.setTextColor(80,100,130);pdf.setFont('helvetica','italic');pdf.setFontSize(4.5);pdf.text(S2(spec),gx+2,gCol+6);
        gCol+=9;
      });
    }
    ftr();
    }
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('FAȚADĂ PRINCIPALĂ · MATERIALE PROPUSE · PERFORMANȚĂ ENERGETICĂ — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');
    const fSc=Math.min((W*0.42-20)/(b.bW+4),(H-45)/((b.niv*P.hn)+12));
    const fW=b.bW*fSc,fH=b.niv*P.hn*fSc;
    const fOx=14+(W*0.42-20-fW)/2,fOy=12+(H-40-fH)/2;
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(10,10,W*0.42-8,H-28,'FD');
    drawFacade(b,P,fOx,fOy,fW,fH,fSc);
    drawNorth(W*0.42-8,22,P.frontDir,6);
    drawScale(14,H-15,fSc);

    // Eticheta fatada
    pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('FATADA PRINCIPALA ('+P.frontDir+')',14,H-17);
    pdf.setTextColor(100,115,135);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
    pdf.text('H total = '+(b.niv*P.hn).toFixed(1)+'m · L = '+RN(b.bW)+'m · '+b.niv+' niveluri',14,H-13.5);

    // Right panel: 3D image (top half) + material specs (bottom half)
    const vrx=W*0.42,vry=10,vrw=W-vrx-8;
    const vh=(H-30)*0.42;
    pdf.setFillColor(230,234,244);pdf.rect(vrx,vry,vrw,vh,'F');
    if(caps.v3dDay) addCap(caps.v3dDay,vrx,vry,vrw,vh,'FIG. 4 — Viewer 3D · ZI · Aspect exterior finalizat cu materialele propuse');
    else if(caps.img3D) addCap(caps.img3D,vrx,vry,vrw,vh,'FIG. 4 — Vedere 3D · Context urban și aspect exterior');

    // Material specs panel
    const matY=vry+vh+3;
    const matH=H-matY-18;
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(vrx,matY,vrw,matH,'FD');

    pdf.setFillColor(...C.dark2);pdf.rect(vrx,matY,vrw,6,'F');
    pdf.setFillColor(...C.gold);pdf.rect(vrx,matY,2,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('MATERIALE PROPUSE & PERFORMANȚĂ TERMICĂ',vrx+vrw/2,matY+4.2,{align:'center'});
    let mY=matY+8;

    // Material layers table
    const matLayers=[
      ['PERETE EXTERIOR (de la exterior la interior):',null,null,null],
      ['Tencuială decorativă siliconică','3mm','rezist. UV, lavabilă','—'],
      ['Polistiren expandat EPS 150','15cm','termoizolație','U=0.27 W/m²K'],
      ['Adeziv+plasă fibra de sticla (ETICS)','8mm','armare','—'],
      ['Zidărie BCA clasa D400 ','20cm','structura','—'],
      ['Tencuiala interior+glet','2cm','finisaj','—'],
      ['TOTAL perete exterior','~40cm','conf. C107/4-2022','U≤0.35 ✓'],
      ['GEAMURI (tâmplărie termoizolantă):',null,null,null],
      ['Profil PVC sau AL cu rupere pt. termică','~70mm','structura','—'],
      ['Geam triplu low-E cu argon 4-16-4-16-4','44mm','termoizolare','Ug=0.6 W/m²K'],
      ['Sistem total fereastra','—','SR EN 14351','Uw≤1.0 W/m²K ✓'],
      ['TERASA INVERSA (planseul ultimului nivel):',null,null,null],
      ['Strat pietris/nisip protectie','5cm','protectie','—'],
      ['Polistiren extrudat XPS 300','20cm','termoizolare','—'],
      ['Bariera vapori + hidroizolatie polimer','2×4mm','etanseitate','—'],
      ['Planseu BA','20cm','structura','U=0.18 W/m²K ✓'],
    ];

    const cw1=vrw*0.38,cw2=vrw*0.12,cw3=vrw*0.25,cw4=vrw*0.25;
    matLayers.forEach(([elem,dim,rol,perf],i)=>{
      if(mY>matY+matH-4)return;
      if(dim===null){ // header row
        pdf.setFillColor(15,28,55);pdf.rect(vrx,mY-2,vrw,5.5,'F');
        pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(4.8);
        pdf.text(S2(elem),vrx+2,mY+2);
        mY+=6;
        return;
      }
      pdf.setFillColor(i%2===0?248:255,i%2===0?250:252,i%2===0?255:255);
      pdf.rect(vrx,mY-2,vrw,5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(vrx,mY+3,vrx+vrw,mY+3);
      pdf.setTextColor(30,50,80);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);
      pdf.text(S2(elem),vrx+1.5,mY+1.5);
      pdf.setFont('helvetica','bold');pdf.text(S2(dim),vrx+cw1+1.5,mY+1.5);
      pdf.setFont('helvetica','normal');pdf.setTextColor(60,80,100);pdf.text(S2(rol),vrx+cw1+cw2+1.5,mY+1.5);
      const perfOk=String(perf).includes('✓');
      if(perfOk){pdf.setTextColor(0,120,60);pdf.setFont('helvetica','bold');}else{pdf.setTextColor(60,80,100);}
      pdf.text(S2(perf),vrx+cw1+cw2+cw3+1.5,mY+1.5);
      mY+=5;
    });
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG SECȚIUNE A-A + NOAPTE + GOLDEN
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('SECȚIUNE TRANSVERSALĂ A-A + VEDERI 3D — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');
    const sSc=Math.min((W*0.55-25)/(b.bD+4),(H-45)/((b.niv*P.hn)+12));
    const sW=b.bD*sSc,sH=b.niv*P.hn*sSc;
    const sOx=14+(W*0.55-25-sW)/2,sOy=12+(H-40-sH)/2;
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(10,10,W*0.55-12,H-28,'FD');
    drawSection(b,P,sOx,sOy,sW,sH,sSc);
    drawNorth(W*0.55-12,22,P.frontDir,6);
    drawScale(14,H-15,sSc);
    // legend sectiune
    pdf.setFillColor(248,249,252);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.25);
    pdf.rect(14,H-28,W*0.55-20,12,'FD');
    const sleg=[[C.living,C.orange,'Living/Salon'],[C.bedroom,C.green,'Dormitor'],[C.kitchen,C.cyan,'Bucătărie'],[C.core,C.blue,'Scări+Lift']];
    sleg.forEach(([fc,stk,lbl],i)=>{
      const sx=18+i*32;
      pdf.setFillColor(...fc);pdf.setDrawColor(...stk);pdf.setLineWidth(0.3);pdf.rect(sx,H-24,5,4,'FD');
      pdf.setTextColor(50,65,85);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(lbl,sx+6,H-21);
    });
    // right: noapte + overcast + explicatii
    const srx=W*0.55,srw=W-srx-8;
    const sh2=(H-30)/2;
    pdf.setFillColor(230,234,244);pdf.rect(srx,10,srw,sh2,'F');
    if(caps.v3dNight) addCap(caps.v3dNight,srx,10,srw,sh2,'FIG. 6 — Viewer 3D · NOAPTE · Impact iluminat artificial și vizibilitate nocturnă');
    else if(caps.v3dOvercast) addCap(caps.v3dOvercast,srx,10,srw,sh2,'FIG. 6 — Viewer 3D · Vedere aeriană · Context densitate construită');
    pdf.setFillColor(230,234,244);pdf.rect(srx,12+sh2,srw,sh2,'F');
    if(caps.v3dOvercast) addCap(caps.v3dOvercast,srx,12+sh2,srw,sh2,'FIG. 7 — Viewer 3D · CER ACOPERIT · Volum și umbre difuze');
    else if(caps.imgAerial) addCap(caps.imgAerial,srx,12+sh2,srw,sh2,'FIG. 7 — Vedere aeriană · Amprentă clădire și vecinătăți');
    // nota structura
    pdf.setFillColor(255,255,255);pdf.rect(10,H-13,W-20,6,'F');
    noteBox('STRUCTURA PROPUSĂ: Cadre din beton armat (stâlpi + grinzi) clasa C25/30, armătură S500, proiectată antiseismic conf. P100-1/2013 zona E (ag=0,2g, Tc=1,6s). Planșee dale beton h=18-22cm. Fundații izolate/continue la min. -1,5m față de CTN. Zidărie de umplutură: BCA 20cm + termoizolație 15cm EPS/MW.',14,H-13,W-20,6);
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG VEDERE AXONOMETRICĂ ADNOTATĂ + MIX APARTAMENTE
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('VEDERE AXONOMETRICĂ 3D · MIX APARTAMENTE · SUPRAFEȚE PROPUSE — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');

    // Axonometric (left 45%)
    pdf.setFillColor(240,243,250);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(10,10,W*0.44,H-28,'FD');
    const axSc=Math.min((W*0.42)/(b.bW+b.bD+6),(H-60)/((b.niv*P.hn)+b.bD/2+8))*0.82;
    drawAxono(b,P,W*0.225,H*0.50,axSc);
    drawNorth(W*0.44,22,P.frontDir,6);
    drawScale(14,H-15,axSc);

    // Etichete niveluri pe axonometrie
    const c30ax=Math.cos(Math.PI/6)*axSc*0.82;
    const s30ax=Math.sin(Math.PI/6)*axSc*0.82;
    const axCX=W*0.225,axCY=H*0.50;
    for(let fl_=0;fl_<=Math.min(b.niv,5);fl_++){
      const z=fl_*P.hn;
      const pRight={px:axCX+(b.bW)*c30ax, py:axCY+(b.bW)*s30ax-z*axSc*0.82*0.55};
      const label=fl_===0?'PARTER':'E'+fl_;
      const cota=fl_===0?'±0.00':'+'+((fl_*P.hn).toFixed(2));
      pdf.setFillColor(20,40,80);pdf.roundedRect(pRight.px+2,pRight.py-2.5,18,5,1,1,'F');
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);pdf.text(label+' '+cota+'m',pRight.px+3,pRight.py+1.5);
    }

    // H total label
    const {px:hPx,py:hPy}={px:axCX+(b.bW)*c30ax+22,py:axCY+(b.bW)*s30ax-b.niv*P.hn*axSc*0.82*0.55/2};
    pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(9);
    pdf.text('H='+(b.niv*P.hn).toFixed(1)+'m',Math.min(hPx,W*0.42),H*0.22);
    pdf.setFont('helvetica','normal');pdf.setFontSize(6);pdf.setTextColor(80,100,130);
    pdf.text(b.niv+' niveluri · '+b.cores.length+' nuclee',Math.min(hPx,W*0.42),H*0.22+7);

    // Explicatie axonometrie - ce e aceasta vedere
    pdf.setFillColor(255,255,255);pdf.rect(10,H-17,W*0.44-2,9,'F');
    pdf.setTextColor(30,50,85);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
    pdf.text('CE ESTE VEDEREA AXONOMETRICĂ?',12,H-14);
    pdf.setFont('helvetica','normal');pdf.setFontSize(4.8);pdf.setTextColor(50,65,85);
    const axExp='Aceasta este o vedere tridimensionala a cladirii - puteti vedea simultan toate cele '+b.niv+' niveluri, volumul total, si proportiile fata de teren. Nu este o fotografie - este un desen tehnic la scara care arata forma exacta a cladirii propuse.';
    const axLines=pdf.splitTextToSize(S2(axExp),W*0.42-4);
    axLines.slice(0,2).forEach((l,li)=>pdf.text(l,12,H-10+li*3));

    // Right panel - apartment mix table
    const arx=W*0.45+6,arw=W-arx-8;
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(arx,10,arw,H-28,'FD');

    let arY=12;
    pdf.setFillColor(...C.dark2);pdf.rect(arx,arY,arw,7,'F');
    pdf.setFillColor(...C.gold);pdf.rect(arx,arY,2,7,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
    pdf.text('MIX APARTAMENTE — PROPUNERE',arx+arw/2,arY+5,{align:'center'});arY+=10;

    // Rezumat rapid
    const nApt=b.niv*b.cores.length*4;
    const fnStr=String(P.fn||'rezidential_colectiv').toLowerCase();
    const isRez=!fnStr.includes('birouri')&&!fnStr.includes('hotel');
    const summary=[
      ['SUPRAFATA PARCELA:',P.area+'m²'],
      ['SUPRAFATA CONSTRUITA (SC):',RN(b.scArea)+'m² (POT='+RN(b.scArea/P.area*100)+'%)'],
      ['SUPRAFATA DESFASURATA (SDA):',RN(b.sdaTotal)+'m²'],
      ['NUMAR NIVELURI:',b.niv+' niveluri (P+'+(b.niv-1)+'E)'],
      ['INALTIME TOTALA:',( b.niv*P.hn).toFixed(1)+'m'],
      [isRez?'UNITATI LOCATIVE ESTIMATE:':'UNITATI PROPUSE:',nApt+' unitati'],
      ['SUPRAFATA UTILA / UNITATE:',RN(b.sdaPerFloor/(b.cores.length*2)*0.75)+'m² medie estimata'],
      ['NUCLEE SCARI+LIFT:',b.cores.length+' nuclee'],
    ];
    summary.forEach(([lab,val],i)=>{
      pdf.setFillColor(i%2?248:255,i%2?250:252,252);pdf.rect(arx,arY-2,arw,5.5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(arx,arY+3.5,arx+arw,arY+3.5);
      pdf.setTextColor(60,80,105);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(S2(lab),arx+2,arY+1.5);
      pdf.setTextColor(20,45,80);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(val),arx+arw-2,arY+1.8,{align:'right'});
      arY+=5.5;
    });
    arY+=4;

    // Tipuri apartamente
    pdf.setFillColor(245,248,252);pdf.rect(arx,arY,arw,5.5,'F');
    pdf.setFillColor(...C.gold);pdf.rect(arx,arY,2,5.5,'F');
    pdf.setTextColor(30,50,85);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text('TIPURI UNITATI PROPUSE PER ETAJ',arx+3,arY+3.8);arY+=8;

    const aptTypes=isRez?[
      ['Garsoniera (studio)','38m²','1+1 cam','1 balcon','1-2 pers','ideal tineri/chirie'],
      ['Apartament 2 camere','65m²','Living+1 dorm','1 balcon','2-3 pers','cel mai cerut Iasi'],
      ['Apartament 3 camere','88m²','Living+2 dorm','1 balcon','3-4 pers','familii cu copii'],
      ['Apartament 4 camere','115m²','Living+3 dorm','2 balcoane','4-5 pers','familii mari/premium'],
    ]:[
      ['Camera standard','25-35m²','1 pat dublu','baie','1-2 pers','conf. min. hotel 3*'],
      ['Camera dubla superioara','35-45m²','1 pat dublu','baie+dressing','2 pers','conf. hotel 4*'],
      ['Camera twin','30-40m²','2 paturi single','baie','2 pers','calatorii afaceri'],
      ['Apartament','55-75m²','Living+dormitor','2 bai','2-4 pers','sejur lung/VIP'],
    ];
    const acw=[arw*0.18,arw*0.12,arw*0.18,arw*0.12,arw*0.1,arw*0.30];
    pdf.setFillColor(...C.dark2);pdf.rect(arx,arY,arw,5,'F');
    ['Tip','Supraf.','Camere','Balcon','Pers.','Piata tinta'].forEach((h,i)=>{
      const x=arx+acw.slice(0,i).reduce((a,b_)=>a+b_,0);
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
      pdf.text(h,x+1,arY+3.5);
    });arY+=5;

    aptTypes.forEach((row,ri)=>{
      if(arY>H-40)return;
      pdf.setFillColor(ri%2?248:255,ri%2?250:252,252);pdf.rect(arx,arY-1,arw,6,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(arx,arY+5,arx+arw,arY+5);
      row.forEach((cell,ci)=>{
        const x=arx+acw.slice(0,ci).reduce((a,b_)=>a+b_,0);
        pdf.setTextColor(ci===0?25:50,ci===0?45:65,ci===0?85:90);
        pdf.setFont('helvetica',ci===0?'bold':'normal');pdf.setFontSize(5);
        pdf.text(S2(cell),x+1,arY+3.5);
      });
      arY+=6;
    });
    arY+=5;

    // ISU requirements summary
    if(arY<H-50){
      pdf.setFillColor(255,238,235);pdf.roundedRect(arx+1,arY,arw-2,35,1.5,1.5,'F');
      pdf.setFillColor(200,30,30);pdf.rect(arx+1,arY,2,35,'F');
      pdf.setTextColor(180,20,20);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('CERINTE OBLIGATORII ISU — CONF. P118-2/2013',arx+5,arY+5);
      pdf.setTextColor(80,15,15);pdf.setFont('helvetica','normal');pdf.setFontSize(4.8);
      const isuReqs=[
        '• Scari protejate cu usi EI 30 pe fiecare nivel — evacuare in caz de incendiu (max. '+RN(b.cores.length)+' scara)',
        '• Hidranti interiori obligatorii: niv.'+b.niv+'>3 — debit 2.5 l/s, presiune min. 2.5 bar la ajutaj',
        '• Hidranti exteriori: la max. 150m de intrare — verificare retea RAJA/CET',
        '• Sistem detectie+alarmare (DAI) obligatoriu: detectori fum fiecare camera, centrala, sirene',
        '• Iluminat de securitate pe cai evacuare: min. 1 lux, autonomie 1h (baterie/UPS)',
        '• Aviz ISU OBLIGATORIU inainte de Autorizatia de Construire — Legea 307/2006',
      ];
      isuReqs.forEach((r,ri)=>{
        if(arY+10+ri*4.5>H-20)return;
        pdf.text(S2(r),arx+5,arY+11+ri*4.5);
      });
      arY+=38;
    }

    // 3 KPI cards bottom
    const kpiData=[['SDA TOTALA',RN(b.sdaTotal)+'m²'],['NR. APARTAMENTE',RN(nApt)+' apt.'],['H REGIM',b.niv+' niv.']];
    const kcw=(arw)/kpiData.length;
    const kcy=H-28;
    kpiData.forEach(([t,v],ki)=>{
      const kx=arx+ki*kcw;
      pdf.setFillColor(12,25,50);pdf.roundedRect(kx+0.5,kcy,kcw-2,12,1.5,1.5,'F');
      pdf.setFillColor(...C.gold);pdf.roundedRect(kx+0.5,kcy,kcw-2,4,1.5,1.5,'F');pdf.rect(kx+0.5,kcy+2,kcw-2,2,'F');
      pdf.setTextColor(10,20,40);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);pdf.text(t,kx+kcw/2-0.75,kcy+3,{align:'center'});
      pdf.setTextColor(220,235,255);pdf.setFont('helvetica','bold');pdf.setFontSize(8);pdf.text(S2(v),kx+kcw/2-0.75,kcy+9.5,{align:'center'});
    });
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG MEMORIU JUSTIFICATIV
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('MEMORIU JUSTIFICATIV — DE CE ACEASTĂ SOLUȚIE? — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(255,255,255);pdf.rect(0,9,W,H-9,'F');
    let my=13;
    my=secTitle('1. JUSTIFICAREA SOLUȚIEI FUNCȚIONALE PROPUSE',my,[15,30,65]);
    const mem1='Soluția funcțională propusă de UrbanX Relevee Instant pentru parcela '+P.nrCad+' (UTR '+P.utr+', suprafață '+P.area+'m²) valorifică integral indicatorii urbanistici permisi de PUG în vigoare: POT='+RN(b.scArea/P.area*100)+'% (max. '+RN(P.pot*100)+'%), CUT='+(b.sdaTotal/P.area).toFixed(2)+' (max. '+P.cut+'), H='+(b.niv*P.hn).toFixed(1)+'m ('+b.niv+' niveluri). Aceasta este soluția OPTIMĂ din punct de vedere economico-urbanistic deoarece maximizează suprafața desfășurată admisă (SDA='+RN(b.sdaTotal)+'m²) în condițiile respectării tuturor reglementărilor PUG.';
    my=bodyTxt(mem1,12,my,W-24,6.5);my+=3;
    my=secTitle('2. JUSTIFICAREA ORIENTĂRII ȘI DISTRIBUȚIEI SPAȚIILOR',my,[20,50,95]);
    const mem2='Orientarea frontului stradal spre '+P.frontDir+' determină distribuția optimă a spațiilor conform OMS 119/2014: camerele de locuit (living, dormitoare) sunt orientate spre fațadele cu însorire favorabilă ('+(solarDir?'fațada principală spre '+P.frontDir+' este favorabilă — camere de zi bine însorite)':'fațadele laterale Est/Vest — se recomandă verificarea la PAC prin studiu OMS 119 detaliat)')+'). Spațiile tehnice (bucătărie, baie, hol) sunt amplasate spre fațadele secundare sau în zona centrală, reducând pierderile termice. Nucleul de scări+lift este plasat central pentru a minimiza lungimea coridoarelor de evacuare (max. 30m conf. P118-2/2013 art. 6).';
    my=bodyTxt(mem2,12,my,W-24,6.5);my+=3;
    my=secTitle('3. MATERIALE ȘI SOLUȚII TEHNICE RECOMANDATE',my,[20,80,55]);
    const matRows=[
      ['Element','Soluție recomandată','Standard/Normativ','Justificare'],
      ['Structură','Cadre BA C25/30 + armătură S500','P100-1/2013 · SR EN 1992','Seismicitate zonă E (ag=0,2g) — structura trebuie să preia forțele seismice'],
      ['Planșee','Dale BA 18-22cm cu izolație termică 10cm','C107-05 · STAS 6472','Izolare termică (coef. U≤0,3W/m²K) și acustică (Rw≥52dB între apt.)'],
      ['Ferestre','PVC/AL cu rupere punte termică, geam triplu low-E','C107-05 · SR EN 14351','Uw≤1,1W/m²K — reducere consum energetic 30-40% față de geam dublu standard'],
      ['Fațadă','Tencuială decorativă sau placaj ventilat + 15cm EPS/MW','C107-05 · ETAG004','U zid≤0,25W/m²K — clădire aproape zero energie (NZEB conf. Legea 372/2005)'],
      ['Acoperiș','Terasă circulabilă/verde cu hidroizolație bitum+PVC','NP 040/2002 · SR EN 13984','Protecție precipitații, utilizare spațiu, biodiversitate urbană'],
      ['Instalații','Centrală termică individuală per apt. sau centrală comună','I13/2015 · NP 037','Eficiență energetică, control individual consum, clasă A++'],
      ['Lifturi','Min. 1 lift/scară P+4 sau mai mult · cabină min. 1,1×1,4m','SR EN 81-1 · NP 051/2012','Obligatoriu pentru PMR · Legea 448/2006 privind persoanele cu handicap'],
    ];
    my=tblHdr(matRows[0],[45,65,40,W-22-45-65-40],my);
    matRows.slice(1).forEach((r,i)=>{my=tblRow(r,[45,65,40,W-22-45-65-40],my,i%2===0);});
    my+=4;
    my=secTitle('4. AVANTAJELE SOLUȚIEI FAȚĂ DE ALTERNATIVE',my,[80,30,20]);
    const adv=[
      '✓ MAXIM JURIDIC: Soluția valorifică 100% din CUT admis ('+P.cut+') — orice reducere ar însemna pierderi economice directe de '+RN((P.cut-b.sdaTotal/P.area)*P.area*700)+' EUR estimat (la 700 EUR/mp construcție).',
      '✓ DISTRIBUȚIE OPTIMĂ FUNCȚIONAL: Nucleul central de scări minimizează circulațiile (economie suprafață ~8%) și asigură conformitatea cu P118-2/2013 (distanțe evacuare ≤30m).',
      '✓ FLEXIBILITATE: Planul tip permite compartimentări diferite (apt. de 2, 3 sau 4 camere) la aceeași SC, adaptabil cererii de piață. Mix propus: '+(P.fn.includes('hotel')?'camere hotel standard':'apartamente 2-4 camere conf. cerere Iași 2024-2025')+'.',
      '✓ CONFORMITATE COMPLETĂ: Toți indicatorii (POT, CUT, H, retrageri) sunt respectați, eliminând riscul de blocare a Autorizației de Construire.',
    ];
    adv.forEach(a=>{my=bodyTxt(a,12,my,W-24,6.5);my+=1;});
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG BILANȚ + NORMATIVE + CONCLUZII
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('BILANȚ SUPRAFEȚE · VERIFICARE NORMATIVE · CONCLUZII FINALE',pgN);
    pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');
    const bCol1=W*0.32,bCol2=W*0.35,bCol3X=10+bCol1+bCol2+4;
    // Col 1: Bilant
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(10,10,bCol1-2,H-28,'FD');
    let by1=secTitle('BILANȚ SUPRAFEȚE',10.5,C.dark2);
    const bilR=[['Suprafață parcelă',P.area+'m²'],['SC edificiu',RN(b.scArea)+'m²'],['SDA totală',RN(b.sdaTotal)+'m²'],['SDA/nivel',RN(b.sdaPerFloor)+'m²'],['POT real/max',RN(b.scArea/P.area*100)+'%/'+RN(P.pot*100)+'%'],['CUT real/max',(b.sdaTotal/P.area).toFixed(2)+'/'+P.cut],['Niveluri',b.niv+' niv. P+'+(b.niv-1)+'E'],['H total',(b.niv*P.hn).toFixed(1)+'m'],['H liber nivel',(P.hn-0.25).toFixed(2)+'m'],['Nuclee scări',b.cores.length],['Apartamente est.',RN(b.niv*b.cores.length*4)+' apt.'],['Locuri parcaj est.',RN(b.niv*b.cores.length*4)+' min.']];
    bilR.forEach(([l,v],i)=>{
      pdf.setFillColor(i%2?248:255,252,252);pdf.rect(10,by1-4,bCol1-2,5.5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(10,by1+1.5,10+bCol1-2,by1+1.5);
      pdf.setTextColor(100,115,135);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);pdf.text(S2(l),12,by1);
      pdf.setTextColor(30,50,80);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(String(v)),10+bCol1-4,by1,{align:'right'});
      by1+=5.5;
    });
    // Col 2: Normative
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(12+bCol1,10,bCol2-2,H-28,'FD');
    let by2=secTitle('VERIFICARE NORMATIVE',10.5,C.dark2,12+bCol1,bCol2-2);
    by2=10+8; // reset
    pdf.setFillColor(...C.dark2);pdf.rect(12+bCol1,10,bCol2-2,6,'F');pdf.setFillColor(...C.gold);pdf.rect(12+bCol1,10,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text('VERIFICARE NORMATIVE',14+bCol1+(bCol2-2)/2,14.5,{align:'center'});
    by2=20;
    const normR2=[
      ['POT max admis',potOk?'CONFORM':'DEPĂȘIRE',potOk,'PUG · NP 068','Suprafața construită nu depășește '+RN(P.pot*100)+'% din teren'],
      ['CUT max admis',cutOk?'CONFORM':'DEPĂȘIRE',cutOk,'PUG · NP 068','SDA totală nu depășește coeficientul admis '+P.cut],
      ['Supraf. min. camere',fl0?.rects.every(r=>{const m={living:14,bedroom:12,kitchen:5,bath:3.6}[r.t];return !m||r.w*r.h>=m;})!==false?'CONFORM':'Verif. PT',null,'NP 057/2002','Living min.14m², dormitor min.12m², bucătărie min.5m²'],
      ['Însorire camere',solarDir?'CONFORM':'Verif. PT',solarDir,'OMS 119/2014','Min. 1,5h/zi la solstițiu iarnă · orientare fațadă '+P.frontDir],
      ['Evacuare scări ISU',isuOk?'CONFORM':'Verif. PT',isuOk,'P118-2/2013','Distanța max. 30m de la orice punct la casa scărilor'],
      ['PMR — persoane mobilitate red.',b.scArea>300?'Obligatoriu':'Verificare',null,'NP 051/2012 · L.448/2006','Lift obligatoriu, rampă acces, locuri parcare PMR 4%'],
      ['Seismic — proiectare structurală','Obligatoriu conf. P100',true,'P100-1/2013','Zonă seismică E, ag=0,2g, Tc=1,6s · structură BA proiectată'],
      ['Performanță energetică','NZEB obligatoriu',true,'Legea 372/2005','Clădiri noi = Nearly Zero Energy Building · audit energetic oblig.'],
      ['Calitatea construcțiilor','Cerința A+B+C+D+E+F',true,'Legea 10/1995','Rezistență, securitate, igienă, confort, durabilitate, acces'],
    ];
    normR2.forEach(([l,v,ok,ref,note],i)=>{
      if(by2>H-30)return;
      pdf.setFillColor(i%2?248:255,i%2?250:252,i%2?252:254);pdf.rect(12+bCol1,by2-3.5,bCol2-2,10,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(12+bCol1,by2+6.5,12+bCol1+bCol2-2,by2+6.5);
      pdf.setTextColor(50,65,85);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(l),14+bCol1,by2);
      const vc=ok===true?C.green:ok===false?C.red:[140,100,20];
      pdf.setTextColor(...vc);pdf.setFont('helvetica','bold');pdf.setFontSize(5);pdf.text(S2(v),14+bCol1,by2+4);
      pdf.setTextColor(100,115,135);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);pdf.text(S2(ref)+' — '+S2(note).slice(0,55),14+bCol1,by2+7.5);
      by2+=10;
    });
    // Col 3: Concluzii
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(bCol3X,10,W-bCol3X-8,H-28,'FD');
    pdf.setFillColor(...C.dark2);pdf.rect(bCol3X,10,W-bCol3X-8,6,'F');pdf.setFillColor(...C.gold);pdf.rect(bCol3X,10,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text('CONCLUZII ȘI PAȘI URMĂTORI',bCol3X+(W-bCol3X-8)/2,14.5,{align:'center'});
    let cly=22;
    const concls=[
      ['✅','FEZABILITATE URBANISTICĂ','Parcela '+P.nrCad+' (UTR '+P.utr+') permite construirea unui imobil de '+b.niv+' niveluri cu SDA='+RN(b.sdaTotal)+'m², respectând integral PUG. POT='+RN(b.scArea/P.area*100)+'%, CUT='+(b.sdaTotal/P.area).toFixed(2)+' — CONFORM.',[22,163,74]],
      ['📐','PROIECT TEHNIC NECESAR','Prezentul document este ORIENTATIV. Este obligatorie elaborarea Proiectului Tehnic (PT) de arhitect autorizat OAR, care va stabili cotele exacte, materialele, instalațiile și detaliile de execuție.',[37,99,235]],
      ['📋','CERTIFICAT DE URBANISM','Primul pas legal: solicitarea Certificatului de Urbanism la Primăria Municipiului Iași — stabilește lista exactă de avize (ISU, AACR, utilități, DJCPN dacă patrimoniu, APM).',[212,175,55]],
      ['🏗️','STUDII OBLIGATORII ÎNAINTE DE PT','Studiu geotehnic (NP 074/2014, min. 3 foraje), studiu de însorire detaliat (OMS 119/2014), ridicare topografică (coordonate Stereo 70), releveu împrejurimi.',[124,58,237]],
      ['📅','CALENDAR ESTIMAT','CU (1-2 luni) → Studii (2-4 luni) → PAC/DTAC (3-6 luni) → Avize (2-4 luni) → AC (1-2 luni) → PT (3-6 luni) → Execuție (10-15 luni). TOTAL: 22-39 luni.',[6,182,212]],
    ];
    concls.forEach(([ico,title,txt,tc])=>{
      if(cly>H-30)return;
      pdf.setFillColor(tc[0],tc[1],tc[2],0.08);
      pdf.setFillColor(Math.min(255,tc[0]*0.15+240),Math.min(255,tc[1]*0.15+245),Math.min(255,tc[2]*0.1+248));
      pdf.roundedRect(bCol3X+2,cly-3,W-bCol3X-12,18,1,1,'F');
      pdf.setFillColor(...tc);pdf.rect(bCol3X+2,cly-3,1.5,18,'F');
      pdf.setTextColor(...tc);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
      pdf.text(S2(title),bCol3X+6,cly+1.5);
      pdf.setTextColor(40,55,75);pdf.setFont('helvetica','normal');pdf.setFontSize(5.2);
      const lines=pdf.splitTextToSize(S2(txt),W-bCol3X-16);
      lines.slice(0,3).forEach((l,li)=>pdf.text(l,bCol3X+6,cly+7+li*3.2));
      cly+=22;
    });
    // Final stamp
    pdf.setFillColor(8,14,30);pdf.rect(10,H-15,W-20,8,'F');
    pdf.setFillColor(...C.gold);pdf.rect(10,H-15,W-20,1,'F');
    pdf.setTextColor(150,165,185);pdf.setFont('helvetica','italic');pdf.setFontSize(5.5);
    pdf.text('Document orientativ generat automat de platforma UrbanX Relevee Instant · '+new Date().toLocaleDateString('ro-RO')+' · '+totalPages+' pagini · UrbanX TSS·FG',W/2,H-10.5,{align:'center'});
    pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text('Nu înlocuiește documentațiile tehnice avizate conf. Legii 50/1991 și Legii 350/2001 · Proiectul tehnic se elaborează de arhitect autorizat OAR',W/2,H-7,{align:'center'});
    ftr();

    const dateForFile=new Date().toISOString().slice(0,10).replace(/-/g,'');
    const pdfFileName=`Releveu_Arhitectural_Nr.${S2(P.nrCad)}_UTR-${S2(P.utr)}_${S2(fnLabel.replace(/\s+/g,'_').slice(0,20))}_${dateForFile}.pdf`;
    pdf.save(pdfFileName);
    if(btn){btn.textContent='⬇ Export PDF Raport';btn.style.opacity='1';}
    if(typeof ss==='function') ss('✅ Prezentare Relevee exportată — '+totalPages+' pagini cu imagini 3D și memoriu justificativ!');

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
  <button onclick="_rvExportPDF()" title="Exportă raportul complet PDF — toate planșele, memoriu, normative"
    style="margin-left:8px;height:32px;padding:0 14px;border-radius:7px;border:1.5px solid rgba(212,175,55,.6);background:linear-gradient(135deg,rgba(212,175,55,.22),rgba(212,175,55,.12));color:#F5C518;cursor:pointer;font-size:11px;font-weight:800;font-family:'Space Grotesk',sans-serif;display:flex;align-items:center;gap:6px;letter-spacing:.03em;flex-shrink:0;transition:all .15s;"
    onmouseover="this.style.background='linear-gradient(135deg,rgba(212,175,55,.38),rgba(212,175,55,.25))'"
    onmouseout="this.style.background='linear-gradient(135deg,rgba(212,175,55,.22),rgba(212,175,55,.12))'">
    📄 Export PDF
  </button>
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
      <div class="rv-expbtn" onclick="_rvExportPDF()" title="Exportă PDF complet — plan, fațade, secțiuni, memoriu, bilanț normative" style="background:linear-gradient(135deg,rgba(212,175,55,.25),rgba(212,175,55,.15));border:1px solid rgba(212,175,55,.5);font-size:11px;padding:6px 14px;font-weight:800;letter-spacing:.03em">📄 Export PDF Raport</div>
      <div class="rv-expbtn" onclick="_rvExport()" title="Export PNG rapid — captură tab curent" style="font-size:10px;padding:5px 10px;margin-left:4px">🖼 PNG</div>
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
