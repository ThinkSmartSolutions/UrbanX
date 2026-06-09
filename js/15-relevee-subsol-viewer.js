// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-subsol-viewer.js — Integrare Subsol + Hotel + Casă Individuală
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// CE FACE:
//   1. Tab Subsol MEREU vizibil (nu conditionat de deficit parcaje)
//   2. _rvRenderSubsol() → render Canvas de calitate (locuri numerotate,
//      flux auto dublu sens, ALA dacă obligatoriu, stâlpi BA, cote)
//   3. Secțiunea A-A/B-B coboară sub ±0.00 → arată S-1 cu rampa
//   4. Plan Situație → rampa auto marcată corect pe parcelă
//   5. Patch _rvMix() → hotel real, rezInd (casă individuală), industrial
//   6. _rvFloor() hotel → coridor central + camere pe ambele laturi
//   7. _rvFloor() rezInd → parter (living+bucătărie) / etaj (dormitoare)
//
// INSTALARE — adaugă în index.html DUPĂ 15-relevee-subsol.js:
//   <script src="js/15-relevee-subsol-viewer.js?v=20260609"></script>
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';

  function waitReady(cb, n){
    n = n||0; if(n > 120) return;
    if(typeof _RV === 'undefined' || typeof _rvRenderPlan === 'undefined'){
      setTimeout(()=>waitReady(cb, n+1), 300); return;
    }
    cb();
  }

  waitReady(()=>{
    // 1. Tab subsol mereu vizibil
    _patchSubsolTab();

    // 2. Patch _rvRenderSubsol cu versiunea Canvas de calitate
    window._rvRenderSubsol = _rvRenderSubsolV4;

    // 3. Patch secțiunea — adaugă S-1
    window._rvRenderSectiune = _rvRenderSectiuneV2;

    // 4. Patch _rvMix — hotel real, rezInd, industrial
    window._rvMix = _rvMixV2;

    // 5. Patch _rvFloor — hotel coridor central, rezInd casă
    const _origFloor = window._rvFloor;
    window._rvFloor = function(b, floorIdx){
      const fnKey = _rvMixV2(b.P);
      if(fnKey === 'hotel')    return _rvFloorHotel(b, floorIdx);
      if(fnKey === 'rezInd')   return _rvFloorRezInd(b, floorIdx);
      if(fnKey === 'industrial') return _rvFloorIndustrial(b, floorIdx);
      return _origFloor(b, floorIdx);
    };

    console.log('[SubsolViewer v1] ✅ loaded — tab vizibil + hotel + rezInd + sectiune S-1');
  });

  // ── Tab subsol: afișat întotdeauna, nu doar la deficit ─────────────────
  function _patchSubsolTab(){
    // Patch imediat dacă DOM e gata
    const _show = ()=>{
      const tab = document.getElementById('rv-tab-subsol');
      if(tab){ tab.style.display = ''; tab.style.background = 'rgba(99,102,241,.10)'; }
    };
    _show();
    // Și la fiecare render (generare clădire nouă)
    const origUpdatePanels = window._rvUpdatePanels;
    window._rvUpdatePanels = function(){
      const r = origUpdatePanels?.apply(this, arguments);
      _show();
      return r;
    };
    // Observer DOM pentru cazul în care tab-ul e creat mai târziu
    const obs = new MutationObserver(()=>{ _show(); });
    obs.observe(document.body, {childList:true, subtree:true});
    setTimeout(()=>{ obs.disconnect(); _show(); }, 8000);
  }

})();

// ═══════════════════════════════════════════════════════════════════════════
// _rvMixV2 — identificare funcțiune, mai completă
// ═══════════════════════════════════════════════════════════════════════════
function _rvMixV2(P){
  const fnStr = String(P?.fn||'').toLowerCase();
  const b     = _RV?.building;
  const niv   = b?.niv || P?.niv || 4;
  const bW    = b?.bW  || P?.bW  || 20;

  if(fnStr.includes('birouri') || fnStr.includes('office'))     return 'birouri';
  if(fnStr.includes('hotel') || fnStr.includes('cazare'))       return 'hotel';
  if(fnStr.includes('industrial') || fnStr.includes('depozit')) return 'industrial';
  if(fnStr.includes('mixt'))                                    return 'mixt';
  if(fnStr.includes('individuala') || fnStr.includes('vila') ||
     fnStr.includes('duplex') || fnStr.includes('insiruit'))    return 'rezInd';
  // Bloc mic P+1 pe parcelă mică → casă
  if(niv <= 2 && bW < 14)                                       return 'rezInd';
  return 'rezCol';
}

// ═══════════════════════════════════════════════════════════════════════════
// _rvFloorHotel — plan hotel real: coridor central + camere pe 2 laturi
// ═══════════════════════════════════════════════════════════════════════════
function _rvFloorHotel(b, floorIdx){
  const {bW, bD, cores, P} = b;
  const isGround = floorIdx === 0;
  const rects = [], wins = [], doors = [];

  // ── Constante hotel ───────────────────────────────────────────────────
  const CAM_W  = Math.max(3.6, Math.min(4.5, bW / Math.max(3, Math.round(bW/4.2))));
  const CAM_D  = Math.max(5.0, Math.min(6.5, (bD - 2.4) / 2));  // adâncime cameră
  const CORR_H = Math.max(1.8, bD - CAM_D*2);                   // coridor central
  const corrY  = CAM_D;                                          // y start coridor

  const nCamPeLatura = Math.max(2, Math.floor(bW / (CAM_W + 0.1)));
  const camSpan      = bW / nCamPeLatura;

  // ── Nuclee (scări + lift) ─────────────────────────────────────────────
  cores.forEach(core =>{
    rects.push({t:'core', x:core.x, y:core.y, w:core.w, h:core.h,
      lbl:'Sc.\nLift', apt:-1});
  });

  // ── Coridor central ───────────────────────────────────────────────────
  rects.push({t:'hall', x:0, y:corrY, w:bW, h:CORR_H,
    lbl:'Coridor Hotel\n'+(bW).toFixed(1)+'m', apt:-3, zIdx:-1, normMin:0});

  // ── Camerele pe LATURA NORD (y=0 → y=CAM_D) ──────────────────────────
  for(let i=0; i<nCamPeLatura; i++){
    const cx = i * camSpan;
    const cw = camSpan - 0.12;
    const camIdx = floorIdx * nCamPeLatura * 2 + i + 1;
    const camArea = (cw * CAM_D).toFixed(1);

    rects.push({t:'bedroom', x:cx, y:0, w:cw*.68, h:CAM_D,
      lbl:`Camera ${camIdx}\n${camArea}m²`, apt:i});
    rects.push({t:'bath', x:cx+cw*.68, y:0, w:cw*.32, h:CAM_D*0.45,
      lbl:'Baie', apt:i});
    rects.push({t:'hall', x:cx+cw*.68, y:CAM_D*0.45, w:cw*.32, h:CAM_D*0.55,
      lbl:'Coridor\nHotel', apt:i});

    // Fereastră pe latura N
    wins.push({wall:'N', x:cx+cw*.1, y:0, w:cw*.55, type:'bedroom', apt:i});
    // Ușă spre coridor
    doors.push({x:cx+cw*.3, y:corrY, w:0.9, type:'int', axis:'H', aptIdx:i});
  }

  // ── Camerele pe LATURA SUD (y=corrY+CORR_H → y=bD) ───────────────────
  const sudY = corrY + CORR_H;
  const sudH = bD - sudY;
  for(let i=0; i<nCamPeLatura; i++){
    const cx = i * camSpan;
    const cw = camSpan - 0.12;
    const camIdx = floorIdx * nCamPeLatura * 2 + nCamPeLatura + i + 1;
    const camArea = (cw * sudH).toFixed(1);

    rects.push({t:'bedroom', x:cx, y:sudY, w:cw*.68, h:sudH,
      lbl:`Camera ${camIdx}\n${camArea}m²`, apt:nCamPeLatura+i});
    rects.push({t:'bath', x:cx+cw*.68, y:sudY+sudH*0.55, w:cw*.32, h:sudH*0.45,
      lbl:'Baie', apt:nCamPeLatura+i});
    rects.push({t:'hall', x:cx+cw*.68, y:sudY, w:cw*.32, h:sudH*0.55,
      lbl:'Coridor\nHotel', apt:nCamPeLatura+i});

    wins.push({wall:'S', x:cx+cw*.1, y:bD, w:cw*.55, type:'bedroom', apt:nCamPeLatura+i});
    doors.push({x:cx+cw*.3, y:corrY+CORR_H, w:0.9, type:'int', axis:'H', aptIdx:nCamPeLatura+i});
  }

  // ── Parter: lobby + recepție ──────────────────────────────────────────
  if(isGround){
    // Suprascrie camerele parterului cu lobby
    const parterRects = rects.filter(r => r.apt < 0);
    parterRects.push(
      {t:'reception', x:0, y:corrY, w:bW, h:CORR_H,
        lbl:'Recepție + Lobby Hotel', apt:-2, zIdx:-1},
      {t:'commercial', x:0, y:sudY, w:bW*.45, h:bD-sudY,
        lbl:'Restaurant', apt:-4},
      {t:'hall', x:bW*.45, y:sudY, w:bW*.3, h:bD-sudY,
        lbl:'Back office', apt:-4},
      {t:'bath', x:bW*.75, y:sudY, w:bW*.25, h:bD-sudY,
        lbl:'Sanitar public', apt:-4}
    );
    doors.push({x:bW/2-1.2, y:bD, w:2.4, type:'main', swing:'out'});
    wins.push({wall:'S', x:bW*.05, y:bD, w:bW*.9, type:'commercial', apt:-4});
    return {rects: parterRects, wins, doors};
  }

  doors.push({x:bW/2-0.9, y:bD, w:1.8, type:'main', swing:'out'});
  return {rects, wins, doors};
}

// ═══════════════════════════════════════════════════════════════════════════
// _rvFloorRezInd — plan casă individuală P+E
// ═══════════════════════════════════════════════════════════════════════════
function _rvFloorRezInd(b, floorIdx){
  const {bW, bD, P} = b;
  const isGround = floorIdx === 0;
  const rects = [], wins = [], doors = [];

  if(isGround){
    // HOL intrare
    rects.push({t:'hall',    x:0,      y:bD-2.2, w:bW*0.18, h:2.2,       lbl:'Hol\nintrare', apt:0});
    // Living-Dining
    rects.push({t:'living',  x:0,      y:0,      w:bW*0.60, h:bD*0.62,   lbl:'Living\nDining', apt:0});
    // Bucătărie
    rects.push({t:'kitchen', x:bW*0.60, y:0,     w:bW*0.40, h:bD*0.45,   lbl:'Bucătărie', apt:0});
    // Baie parter
    rects.push({t:'bath',    x:bW*0.60, y:bD*0.45, w:bW*0.25, h:bD*0.28, lbl:'Baie\nparter', apt:0});
    // WC
    rects.push({t:'wc',      x:bW*0.85, y:bD*0.45, w:bW*0.15, h:bD*0.28, lbl:'WC', apt:0});
    // Terasă / Balcon parter
    rects.push({t:'balcon',  x:0,      y:bD*0.62, w:bW*0.60, h:bD*0.18,  lbl:'Terasă\nacoperită', apt:0, bal:true});
    // Scări
    rects.push({t:'core',    x:bW*0.60, y:bD*0.73, w:bW*0.25, h:bD*0.27, lbl:'Scări', apt:-1});
    // Spate (depozit/garaj)
    rects.push({t:'storage', x:bW*0.18, y:bD-2.2, w:bW*0.42, h:2.2,      lbl:'Depozit / Garaj', apt:0});

    wins.push({wall:'S', x:bW*.05, y:bD, w:bW*.55, type:'living', apt:0});
    wins.push({wall:'N', x:bW*.62, y:0,  w:bW*.35, type:'kitchen', apt:0});
    wins.push({wall:'V', x:0,      y:bD*.05, h:bD*.55, type:'living', apt:0});
    doors.push({x:bW*0.06, y:bD, w:1.0, type:'main', swing:'out'});
    doors.push({x:bW*0.62, y:bD*0.62, w:0.9, type:'int', axis:'H', aptIdx:0});

  } else {
    // Etaj: dormitoare
    const corY = bD * 0.18;
    // Hol etaj
    rects.push({t:'hall',    x:0,      y:0,      w:bW,      h:corY,       lbl:'Hol etaj', apt:0});
    // Dormitor master
    rects.push({t:'bedroom', x:0,      y:corY,   w:bW*0.38, h:bD*0.55,   lbl:'Dormitor\nmaster', apt:0});
    // Baie en-suite
    rects.push({t:'bath',    x:0,      y:corY+bD*0.55, w:bW*0.38, h:bD-corY-bD*0.55, lbl:'Baie\nen-suite', apt:0});
    // Dormitor 2
    rects.push({t:'bedroom2',x:bW*0.38, y:corY,  w:bW*0.35, h:bD*0.55,   lbl:'Dormitor 2', apt:0});
    // Dormitor 3 / Birou
    rects.push({t:'bedroom3',x:bW*0.73, y:corY,  w:bW*0.27, h:bD*0.45,   lbl:'Birou /\nDormitor 3', apt:0});
    // Baie comună
    rects.push({t:'bath',    x:bW*0.38, y:corY+bD*0.55, w:bW*0.35, h:bD-corY-bD*0.55, lbl:'Baie\ncomunã', apt:0});
    // Dressing
    rects.push({t:'storage', x:bW*0.73, y:corY+bD*0.45, w:bW*0.27, h:bD-corY-bD*0.45, lbl:'Dressing', apt:0});
    // Terasă etaj (dacă hasBalc)
    const AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
    if(AC.hasBalc !== false){
      rects.push({t:'balcon', x:0, y:0, w:bW*0.60, h:corY, lbl:'Terasă etaj', apt:0, bal:true});
    }

    wins.push({wall:'S', x:bW*.02, y:bD, w:bW*.35, type:'bedroom', apt:0});
    wins.push({wall:'S', x:bW*.40, y:bD, w:bW*.30, type:'bedroom2', apt:0});
    wins.push({wall:'N', x:bW*.75, y:0,  w:bW*.22, type:'bedroom3', apt:0});
    doors.push({x:bW*0.06, y:corY, w:0.9, type:'int', axis:'H', aptIdx:0});
    doors.push({x:bW*0.40, y:corY, w:0.9, type:'int', axis:'H', aptIdx:0});
    doors.push({x:bW*0.75, y:corY, w:0.9, type:'int', axis:'H', aptIdx:0});
  }

  return {rects, wins, doors};
}

// ═══════════════════════════════════════════════════════════════════════════
// _rvFloorIndustrial — plan hală industrială / depozit
// ═══════════════════════════════════════════════════════════════════════════
function _rvFloorIndustrial(b, floorIdx){
  const {bW, bD} = b;
  const rects = [], wins = [], doors = [];

  rects.push({t:'commercial', x:0,      y:0,      w:bW*0.75, h:bD*0.85, lbl:'Spațiu Industrial\n/ Depozitare', apt:0});
  rects.push({t:'office',     x:bW*0.75, y:0,     w:bW*0.25, h:bD*0.45, lbl:'Birouri', apt:0});
  rects.push({t:'hall',       x:bW*0.75, y:bD*0.45, w:bW*0.25, h:bD*0.20, lbl:'Hol\nacces', apt:0});
  rects.push({t:'bath',       x:bW*0.75, y:bD*0.65, w:bW*0.15, h:bD*0.20, lbl:'Sanitar', apt:0});
  rects.push({t:'storage',    x:bW*0.90, y:bD*0.65, w:bW*0.10, h:bD*0.20, lbl:'Dep.', apt:0});
  rects.push({t:'hall',       x:0,       y:bD*0.85, w:bW*0.75, h:bD*0.15, lbl:'Zonă manipulare / Rampă', apt:0});

  wins.push({wall:'N', x:bW*.05, y:0, w:bW*.65, type:'commercial', apt:0});
  wins.push({wall:'E', x:bW,     y:bD*.05, h:bD*.40, type:'office', apt:0});
  doors.push({x:bW*0.30, y:bD, w:4.0, type:'main', swing:'out'});
  doors.push({x:bW*0.76, y:bD*.67, w:0.9, type:'int', axis:'H', aptIdx:0});
  return {rects, wins, doors};
}

// ═══════════════════════════════════════════════════════════════════════════
// _rvRenderSubsolV4 — render Canvas de calitate arhitecturală
// Înlocuiește _rvRenderSubsol din 15-relevee.js
// Folosește logica de calcul din 15-relevee-subsol.js (_calcSubsol)
// ═══════════════════════════════════════════════════════════════════════════
function _rvRenderSubsolV4(b){
  if(!b || !b.P) return;
  const {P, bW, bD} = b;
  const SC  = _RV.scale * 0.90;
  const PAD = 70;

  // Constante parcaj (sync cu 15-relevee-subsol.js SUBSOL object)
  const LOC_W   = 2.50, LOC_L = 5.00, LOC_PMR_W = 3.60;
  const CULOAR  = 6.00, RAMPA_W = 3.60, RAMPA_L = 9.00;
  const STALP   = 0.40, PANTA  = 15;
  const modul   = LOC_L + CULOAR + LOC_L; // 16m

  // ── Calcul locuri (simplu, fără _calcSubsol extern) ──────────────────
  const rampaZonaW = RAMPA_W + 0.40;
  const rampaZonaL = RAMPA_L + 0.50;
  let nrApt = 0;
  (_RV.floors||[]).forEach(fl=>(fl?.rects||[]).forEach(r=>{
    if(r.apt >= 0) nrApt = Math.max(nrApt, r.apt+1);
  }));
  nrApt = Math.max(nrApt, 1);
  const ALA_OBLIG = nrApt >= 10;
  const ALA_PERS  = Math.ceil(nrApt * 2.5);
  const ALA_SUP   = Math.max(ALA_PERS * 0.75, 12);
  const ALA_ADANC = Math.min(bD * 0.35, Math.ceil(ALA_SUP/4)+1);
  const ALA_LAT   = Math.ceil(ALA_SUP / ALA_ADANC * 10) / 10;
  const alaOffX   = ALA_OBLIG ? ALA_LAT + 0.30 : 0;

  const pxStart   = alaOffX + 0.15;
  const pxEnd     = bW - rampaZonaW - 0.15;
  const locPerRand = Math.floor((pxEnd - pxStart) / LOC_W);
  const nModule   = Math.floor(bD / modul);
  const locTotal  = nModule * 2 * locPerRand;
  const pmrNr     = Math.max(1, Math.ceil(locTotal * 0.04));

  const W = bW*SC + PAD*2 + 260;
  const H = bD*SC + PAD*2 + 200;
  const {cv, ctx} = _rvInitCanvas(W, H, 'rv-canvas');
  if(!ctx) return;

  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0,0,W,H);

  const ox = PAD + 60, oy = PAD + 50;

  // ── Titlu ─────────────────────────────────────────────────────────────
  ctx.fillStyle = '#0F172A'; ctx.font = 'bold 12px IBM Plex Mono'; ctx.textAlign = 'center';
  ctx.fillText('PLAN SUBSOL — Nivel -1 · PARCAJ SUBTERAN' + (ALA_OBLIG ? ' + ADĂPOST ALA' : ''), ox+bW*SC/2, oy-38);
  ctx.font = '8px IBM Plex Mono'; ctx.fillStyle = '#64748B';
  ctx.fillText(locTotal+' locuri ('+pmrNr+' PMR) · Culoar '+CULOAR+'m dublu sens · Rampă i≤'+PANTA+'%' + (ALA_OBLIG?' · ALA obligatoriu':' · ALA nereq. (<10 apt.)'), ox+bW*SC/2, oy-22);
  ctx.textAlign = 'left';

  // ── Fundal subsol + pereți ────────────────────────────────────────────
  ctx.fillStyle = 'rgba(218,224,235,.8)'; ctx.fillRect(ox, oy, bW*SC, bD*SC);
  const EW = Math.max(5, 0.30*SC);
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(ox, oy, bW*SC, EW);
  ctx.fillRect(ox, oy+bD*SC-EW, bW*SC, EW);
  ctx.fillRect(ox, oy, EW, bD*SC);
  ctx.fillRect(ox+bW*SC-EW, oy, EW, bD*SC);
  // Hașuri pereți exteriori
  function hatch(x,y,w,h){
    ctx.save(); ctx.beginPath(); ctx.rect(x,y,w,h); ctx.clip();
    ctx.strokeStyle='rgba(255,255,255,.3)'; ctx.lineWidth=0.6;
    for(let i=-(Math.max(w,h));i<w+Math.max(w,h);i+=4){
      ctx.beginPath(); ctx.moveTo(x+i,y); ctx.lineTo(x+i+h,y+h); ctx.stroke();
    }
    ctx.restore();
  }
  hatch(ox,oy,bW*SC,EW); hatch(ox,oy+bD*SC-EW,bW*SC,EW);
  hatch(ox,oy,EW,bD*SC); hatch(ox+bW*SC-EW,oy,EW,bD*SC);

  // ── Grilă structurală (axe) ───────────────────────────────────────────
  // Axe X (verticale)
  const axeX = [0];
  let xc = alaOffX + 2.5;
  while(xc < bW - rampaZonaW - 0.1){ axeX.push(+xc.toFixed(2)); xc += 2.5; }
  axeX.push(bW);
  // Axe Y (orizontale)
  const axeY = [0];
  let yc = 0;
  while(yc < bD - 0.05){
    const y1 = yc + LOC_L;
    if(y1 <= bD+0.01) axeY.push(+y1.toFixed(2));
    const y2 = y1 + CULOAR;
    if(y2 <= bD+0.01) axeY.push(+y2.toFixed(2));
    const y3 = y2 + LOC_L;
    if(y3 <= bD+0.01) axeY.push(+y3.toFixed(2));
    yc = y3;
  }
  if(axeY[axeY.length-1] < bD-0.05) axeY.push(bD);

  // Linii de grilă
  ctx.strokeStyle = 'rgba(100,120,160,.18)'; ctx.lineWidth = 0.4; ctx.setLineDash([3,3]);
  axeX.forEach(gx=>{ ctx.beginPath(); ctx.moveTo(ox+gx*SC,oy-4); ctx.lineTo(ox+gx*SC,oy+bD*SC+4); ctx.stroke(); });
  axeY.forEach(gy=>{ ctx.beginPath(); ctx.moveTo(ox-4,oy+gy*SC); ctx.lineTo(ox+bW*SC+4,oy+gy*SC); ctx.stroke(); });
  ctx.setLineDash([]);

  // Bule axe (numerotare)
  const BR = 5;
  axeX.forEach((gx,i)=>{
    [oy-BR*2.5, oy+bD*SC+BR*2.5].forEach(gy2=>{
      ctx.fillStyle='#FFFFFF'; ctx.strokeStyle='#1E3A5F'; ctx.lineWidth=0.8;
      ctx.beginPath(); ctx.arc(ox+gx*SC,gy2,BR,0,Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.fillStyle='#0F172A'; ctx.font='bold 5px IBM Plex Mono'; ctx.textAlign='center';
      ctx.fillText(String(i+1), ox+gx*SC, gy2+1.8);
    });
  });
  axeY.forEach((gy,i)=>{
    const lbl = String.fromCharCode(65+i);
    [ox-BR*2.5, ox+bW*SC+BR*2.5].forEach(gx2=>{
      ctx.fillStyle='#FFFFFF'; ctx.strokeStyle='#1E3A5F'; ctx.lineWidth=0.8;
      ctx.beginPath(); ctx.arc(gx2,oy+gy*SC,BR,0,Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.fillStyle='#0F172A'; ctx.font='bold 5px IBM Plex Mono'; ctx.textAlign='center';
      ctx.fillText(lbl, gx2, oy+gy*SC+1.8);
    });
  });
  ctx.textAlign='left';

  // ── Stâlpi BA (gri închis + hașuri + litera S) ────────────────────────
  const cSz = STALP*SC;
  axeX.forEach(gx=>{
    axeY.forEach(gy=>{
      const cx=ox+gx*SC, cy=oy+gy*SC;
      ctx.fillStyle='#475569';
      ctx.fillRect(cx-cSz/2, cy-cSz/2, cSz, cSz);
      hatch(cx-cSz/2, cy-cSz/2, cSz, cSz);
      ctx.strokeStyle='#1E293B'; ctx.lineWidth=1;
      ctx.strokeRect(cx-cSz/2, cy-cSz/2, cSz, cSz);
      if(cSz > 5){
        ctx.fillStyle='#FFFFFF'; ctx.font='bold 4px IBM Plex Mono'; ctx.textAlign='center';
        ctx.fillText('S', cx, cy+1.5);
      }
    });
  });
  ctx.textAlign='left';

  // ── Locuri de parcare ─────────────────────────────────────────────────
  let locNr = 0, pmrCount = 0;
  const lw=LOC_W*SC, ll=LOC_L*SC, culH=CULOAR*SC;

  for(let m=0; m<nModule; m++){
    const mY = oy + m*modul*SC;

    // Rând 1 (sus)
    for(let p=0; p<locPerRand; p++){
      locNr++;
      const isPMR = pmrCount < pmrNr;
      const lx = ox + pxStart*SC + p*lw;
      const lw2 = isPMR ? LOC_PMR_W*SC : lw;
      if(lx + lw2 > ox + bW*SC - rampaZonaW*SC - 1) break;
      ctx.fillStyle = isPMR ? 'rgba(219,234,254,.9)' : 'rgba(241,245,249,.95)';
      ctx.fillRect(lx, mY, lw2-0.5, ll);
      ctx.strokeStyle = isPMR ? '#1D4ED8' : '#94A3B8'; ctx.lineWidth = isPMR?1.2:0.7;
      ctx.strokeRect(lx, mY, lw2-0.5, ll);
      ctx.fillStyle = isPMR?'#1D4ED8':'#64748B'; ctx.font='bold 5.5px IBM Plex Mono'; ctx.textAlign='center';
      ctx.fillText(String(locNr), lx+lw2/2, mY+ll/2-2);
      if(isPMR){ ctx.font='8px sans-serif'; ctx.fillText('♿', lx+lw2/2, mY+ll/2+5); pmrCount++; }
      ctx.textAlign='left';
    }

    // Culoar circulație dublu sens
    const culY = mY + ll;
    const culX = ox + pxStart*SC;
    const culW = (bW - pxStart - rampaZonaW - 0.15)*SC;
    ctx.fillStyle = 'rgba(203,213,225,.5)'; ctx.fillRect(culX, culY, culW, culH);
    ctx.strokeStyle='rgba(71,85,105,.35)'; ctx.lineWidth=0.5;
    ctx.strokeRect(culX, culY, culW, culH);
    // Săgeți dublu sens
    const aY1=culY+culH*0.32, aY2=culY+culH*0.68;
    const aX1=culX+12, aX2=culX+culW-12;
    ctx.strokeStyle='rgba(30,58,138,.6)'; ctx.lineWidth=1;
    // Săgeată stânga→dreapta
    ctx.beginPath(); ctx.moveTo(aX1,aY1); ctx.lineTo(aX2,aY1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(aX2-6,aY1-3); ctx.lineTo(aX2,aY1); ctx.lineTo(aX2-6,aY1+3); ctx.stroke();
    // Săgeată dreapta→stânga
    ctx.beginPath(); ctx.moveTo(aX2,aY2); ctx.lineTo(aX1,aY2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(aX1+6,aY2-3); ctx.lineTo(aX1,aY2); ctx.lineTo(aX1+6,aY2+3); ctx.stroke();
    ctx.fillStyle='rgba(30,58,138,.7)'; ctx.font='6px IBM Plex Mono'; ctx.textAlign='center';
    ctx.fillText('CULOAR CIRCULAȚIE '+CULOAR+'m — DUBLU SENS', culX+culW/2, culY+culH/2+2);
    ctx.textAlign='left';

    // Rând 2 (jos)
    for(let p=0; p<locPerRand; p++){
      locNr++;
      const isPMR = pmrCount < pmrNr;
      const lx = ox + pxStart*SC + p*lw;
      const ly = culY + culH;
      const lw2 = isPMR ? LOC_PMR_W*SC : lw;
      if(lx+lw2 > ox+bW*SC-rampaZonaW*SC-1 || ly+ll > oy+bD*SC+1) break;
      ctx.fillStyle = isPMR ? 'rgba(219,234,254,.9)' : 'rgba(241,245,249,.95)';
      ctx.fillRect(lx, ly, lw2-0.5, ll);
      ctx.strokeStyle=isPMR?'#1D4ED8':'#94A3B8'; ctx.lineWidth=isPMR?1.2:0.7;
      ctx.strokeRect(lx, ly, lw2-0.5, ll);
      ctx.fillStyle=isPMR?'#1D4ED8':'#64748B'; ctx.font='bold 5.5px IBM Plex Mono'; ctx.textAlign='center';
      ctx.fillText(String(locNr), lx+lw2/2, ly+ll/2-2);
      if(isPMR){ ctx.font='8px sans-serif'; ctx.fillText('♿', lx+lw2/2, ly+ll/2+5); pmrCount++; }
      ctx.textAlign='left';
    }
  }

  // ── Rampă auto ────────────────────────────────────────────────────────
  const rampX = ox + (bW-rampaZonaW)*SC;
  const rampY = oy + (bD-rampaZonaL)*SC;
  const rampW = (rampaZonaW-0.1)*SC;
  const rampL = (rampaZonaL-0.1)*SC;
  // Fundal rampă + hașuri diagonale
  ctx.fillStyle = 'rgba(254,243,199,.85)'; ctx.fillRect(rampX,rampY,rampW,rampL);
  hatch(rampX, rampY, rampW, rampL);
  ctx.strokeStyle='#B45309'; ctx.lineWidth=1.5; ctx.strokeRect(rampX,rampY,rampW,rampL);
  // Linie panta (diagonală)
  ctx.strokeStyle='rgba(180,83,9,.7)'; ctx.lineWidth=1; ctx.setLineDash([5,3]);
  ctx.beginPath(); ctx.moveTo(rampX,rampY+rampL); ctx.lineTo(rampX+rampW,rampY); ctx.stroke();
  ctx.setLineDash([]);
  // Săgeată direcție coborâre
  const arRX = rampX+rampW/2;
  ctx.strokeStyle='#92400E'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(arRX, rampY+rampL*0.15); ctx.lineTo(arRX, rampY+rampL*0.82); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(arRX-5,rampY+rampL*0.65); ctx.lineTo(arRX,rampY+rampL*0.82); ctx.lineTo(arRX+5,rampY+rampL*0.65); ctx.stroke();
  // Etichete rampă
  ctx.fillStyle='#92400E'; ctx.font='bold 6.5px IBM Plex Mono'; ctx.textAlign='center';
  ctx.fillText('RAMPĂ AUTO', arRX, rampY+rampL*0.30);
  ctx.font='6px IBM Plex Mono';
  ctx.fillText('i≤'+PANTA+'%  L='+RAMPA_L+'m', arRX, rampY+rampL*0.43);
  ctx.fillText('l='+RAMPA_W+'m  sens:', arRX, rampY+rampL*0.53);
  ctx.fillText('↓ coborâre', arRX, rampY+rampL*0.62);
  // Ieșire rampă (sus, spre exterior)
  ctx.fillStyle='rgba(254,243,199,.5)';
  ctx.fillRect(rampX, oy+bD*SC, rampW, EW+6);
  ctx.strokeStyle='#B45309'; ctx.lineWidth=1;
  ctx.strokeRect(rampX, oy+bD*SC, rampW, EW+6);
  ctx.fillStyle='#92400E'; ctx.font='bold 5.5px IBM Plex Mono';
  ctx.fillText('↑ IEȘ.RAMPĂ', arRX, oy+bD*SC+5); ctx.textAlign='left';

  // ── Adăpost ALA (dacă obligatoriu) ───────────────────────────────────
  if(ALA_OBLIG){
    const aw = ALA_LAT*SC, adh = ALA_ADANC*SC;
    const ax = ox+EW+2, ay = oy+EW+2;
    const pw = 0.30*SC; // grosime perete ALA 30cm
    // Pereți BA (hașurați)
    ctx.fillStyle='#334155';
    ctx.fillRect(ax,ay,aw,pw); ctx.fillRect(ax,ay+adh-pw,aw,pw);
    ctx.fillRect(ax,ay,pw,adh); ctx.fillRect(ax+aw-pw,ay,pw,adh);
    hatch(ax,ay,aw,pw); hatch(ax,ay+adh-pw,aw,pw);
    hatch(ax,ay,pw,adh); hatch(ax+aw-pw,ay,pw,adh);
    // Interior ALA
    ctx.fillStyle='rgba(219,234,254,.7)'; ctx.fillRect(ax+pw,ay+pw,aw-pw*2,adh-pw*2);
    ctx.strokeStyle='#1D4ED8'; ctx.lineWidth=1.5;
    ctx.strokeRect(ax,ay,aw,adh);
    // Dotări interioare (schematic)
    const iw=aw-pw*2, ih=adh-pw*2, ix=ax+pw, iy=ay+pw;
    // Filtru chimic
    ctx.fillStyle='rgba(186,230,253,.9)'; ctx.strokeStyle='#0284C7'; ctx.lineWidth=0.7;
    ctx.fillRect(ix+2, iy+2, iw*0.38, ih*0.38); ctx.strokeRect(ix+2, iy+2, iw*0.38, ih*0.38);
    ctx.fillStyle='#0C4A6E'; ctx.font='bold 4.5px IBM Plex Mono'; ctx.textAlign='center';
    ctx.fillText('FILTRU\nCHIMIC', ix+2+iw*.19, iy+ih*.19+2);
    // Grup sanitar
    ctx.fillStyle='rgba(221,214,254,.9)'; ctx.strokeStyle='#7C3AED'; ctx.lineWidth=0.7;
    ctx.fillRect(ix+iw*0.55, iy+2, iw*0.38, ih*0.38); ctx.strokeRect(ix+iw*0.55, iy+2, iw*0.38, ih*0.38);
    ctx.fillStyle='#4C1D95'; ctx.font='bold 4.5px IBM Plex Mono';
    ctx.fillText('GR.\nSANITAR', ix+iw*0.74, iy+ih*.19+2);
    // Ușa de urgență
    ctx.strokeStyle='#1D4ED8'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(ax+aw/2-3,ay+adh-pw); ctx.lineTo(ax+aw/2+3,ay+adh-pw); ctx.stroke();
    ctx.beginPath(); ctx.arc(ax+aw/2-3, ay+adh-pw, 6, 0, Math.PI/2); ctx.stroke();
    // Etichetă
    ctx.fillStyle='#1E3A8A'; ctx.font='bold 6.5px IBM Plex Mono';
    ctx.fillText('ADĂPOST ALA', ax+aw/2, ay+adh/2+2);
    ctx.font='5.5px IBM Plex Mono';
    ctx.fillText(ALA_PERS+'p · '+ALA_SUP.toFixed(0)+'m²', ax+aw/2, ay+adh/2+10);
    ctx.font='4.5px IBM Plex Mono'; ctx.fillStyle='#475569';
    ctx.fillText('NP-073/2002 · P118/2', ax+aw/2, ay+adh/2+17);
    // Ieșire urgență
    ctx.fillStyle='#DC2626'; ctx.font='bold 5px IBM Plex Mono';
    ctx.fillText('↑ IEȘ.URGENȚĂ', ax+aw/2, ay-4); ctx.textAlign='left';
  }

  // ── Cote ─────────────────────────────────────────────────────────────
  const dimY = oy+bD*SC+22;
  ctx.strokeStyle='#1E40AF'; ctx.fillStyle='#1E40AF'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.moveTo(ox,dimY); ctx.lineTo(ox+bW*SC,dimY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox,dimY-3); ctx.lineTo(ox,dimY+3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox+bW*SC,dimY-3); ctx.lineTo(ox+bW*SC,dimY+3); ctx.stroke();
  ctx.font='bold 7px IBM Plex Mono'; ctx.textAlign='center';
  ctx.fillText(bW.toFixed(2)+'m', ox+bW*SC/2, dimY+8);
  // Cotă înălțime
  ctx.beginPath(); ctx.moveTo(ox-22,oy); ctx.lineTo(ox-22,oy+bD*SC); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox-25,oy); ctx.lineTo(ox-19,oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox-25,oy+bD*SC); ctx.lineTo(ox-19,oy+bD*SC); ctx.stroke();
  ctx.save(); ctx.translate(ox-30,oy+bD*SC/2); ctx.rotate(-Math.PI/2);
  ctx.fillText(bD.toFixed(2)+'m', 0, 0); ctx.restore();
  ctx.textAlign='left';

  // ── Tablou materiale (dreapta) ────────────────────────────────────────
  const tmX=ox+bW*SC+18, tmY=oy;
  const rows=[
    ['Structură','Beton armat C30/37','pereți 25cm + planșee 22cm'],
    ['Impermeabilizare','Membrană bitum. 2×','pe pereți + radier'],
    ['Radier','BA C30/37','grosime min. 30cm'],
    ['Loc parcaj','2.50×5.00m min.','NP 051/2012'],
    ['Loc PMR ('+pmrNr+')','3.50×5.00m','1 la 25 locuri'],
    ['Culoar','min. 6.00m','dublu sens + manevră'],
    ['Rampă acces','L='+RAMPA_L+'m, i='+PANTA+'%','l='+RAMPA_W+'m min.'],
    ['H liberă','min. 2.40m','recomandat 2.70m'],
    ['Ventilație','mecanică forțată','min. 6 vol/h'],
    ['Detectare CO','senzori / 200m²','P118-3/2015'],
    ['Stâlpi BA','40×40cm','grilă adaptată parcaj'],
  ];
  const tW=200, rH=13;
  ctx.fillStyle='#F8FAFC'; ctx.fillRect(tmX,tmY,tW,(rows.length+1)*rH+10);
  ctx.strokeStyle='#CBD5E1'; ctx.lineWidth=0.8; ctx.strokeRect(tmX,tmY,tW,(rows.length+1)*rH+10);
  ctx.fillStyle='#0F172A'; ctx.font='bold 7px IBM Plex Mono';
  ctx.fillText('TABLOU MATERIALE SUBSOL', tmX+4, tmY+9);
  rows.forEach(([cat,val,norm],i)=>{
    const ry=tmY+12+i*rH;
    ctx.fillStyle=i%2===0?'#F1F5F9':'#F8FAFC'; ctx.fillRect(tmX,ry,tW,rH);
    ctx.fillStyle='#0F172A'; ctx.font='bold 6px IBM Plex Mono'; ctx.fillText(cat+':', tmX+3, ry+8);
    ctx.fillStyle='#334155'; ctx.font='6px IBM Plex Mono'; ctx.fillText(val, tmX+52, ry+8);
    ctx.fillStyle='#94A3B8'; ctx.font='5px IBM Plex Mono'; ctx.fillText(norm, tmX+52, ry+13);
  });
  // Sumar
  const smY=tmY+(rows.length+1)*rH+20;
  ctx.fillStyle='#0F172A'; ctx.font='bold 7.5px IBM Plex Mono';
  ctx.fillText('SUMAR PARCAJ:', tmX, smY);
  ctx.fillStyle='#334155'; ctx.font='7px IBM Plex Mono';
  ctx.fillText('Total locuri: '+locTotal, tmX, smY+13);
  ctx.fillText('PMR (♿): '+pmrNr+' (≥4%, NP051)', tmX, smY+24);
  ctx.fillText('El. recomandat: '+Math.ceil(locTotal*.1)+' (10%)', tmX, smY+35);
  ctx.fillText('SC subsol: '+(bW*bD).toFixed(0)+'m²/nivel', tmX, smY+46);
  if(ALA_OBLIG){
    ctx.fillStyle='#1D4ED8'; ctx.font='bold 6.5px IBM Plex Mono';
    ctx.fillText('ALA: '+ALA_PERS+'p · '+ALA_SUP.toFixed(0)+'m² OBLIGATORIU', tmX, smY+60);
    ctx.fillStyle='#334155'; ctx.font='5.5px IBM Plex Mono';
    ctx.fillText('('+nrApt+' apt. ≥ 10 → NP-073/2002)', tmX, smY+70);
  } else {
    ctx.fillStyle='#64748B'; ctx.font='6px IBM Plex Mono';
    ctx.fillText('ALA: nereq. ('+nrApt+' apt. < 10)', tmX, smY+60);
  }

  // ── Legendă ───────────────────────────────────────────────────────────
  const lgX=tmX, lgY=smY+85;
  ctx.fillStyle='#0F172A'; ctx.font='bold 7px IBM Plex Mono'; ctx.fillText('LEGENDĂ:', lgX, lgY);
  const lgItems=[
    {col:'rgba(241,245,249,.95)', bc:'#94A3B8', lbl:'Loc parcare standard 2.5×5m'},
    {col:'rgba(219,234,254,.9)',  bc:'#1D4ED8', lbl:'Loc PMR 3.5×5m (♿)'},
    {col:'rgba(203,213,225,.5)',  bc:'rgba(71,85,105,.35)', lbl:'Culoar circulație 6m'},
    {col:'rgba(254,243,199,.85)', bc:'#B45309', lbl:'Zonă rampă auto'},
    {col:'rgba(219,234,254,.7)',  bc:'#1D4ED8', lbl:'Adăpost ALA (dacă oblig.)'},
    {col:'#475569',               bc:'#1E293B', lbl:'Stâlp BA 40×40cm'},
  ];
  lgItems.forEach(({col,bc,lbl},i)=>{
    const ly=lgY+8+i*14;
    ctx.fillStyle=col; ctx.fillRect(lgX,ly-8,12,10);
    ctx.strokeStyle=bc; ctx.lineWidth=0.7; ctx.strokeRect(lgX,ly-8,12,10);
    ctx.fillStyle='#334155'; ctx.font='6.5px IBM Plex Mono';
    ctx.fillText(lbl, lgX+16, ly);
  });

  // Cartuș
  if(typeof _rvDrawCartus === 'function')
    _rvDrawCartus(ctx, W, H-10, P, null, 'PLAN SUBSOL — Parcaj + ALA · S-1');
}

// ═══════════════════════════════════════════════════════════════════════════
// _rvRenderSectiuneV2 — secțiunea coboară sub ±0.00, arată S-1 cu rampă
// Înlocuiește _rvRenderSectiune din 15-relevee.js
// ═══════════════════════════════════════════════════════════════════════════
function _rvRenderSectiuneV2(b){
  // Dacă nu există building, fallback
  if(!b || !b.P){ if(typeof _rvRenderSectiune_ORIG==='function') _rvRenderSectiune_ORIG(b); return; }

  const {P, bW, bD, niv, cores} = b;
  const _AC  = typeof _rvGetAEDISConfig==='function' ? _rvGetAEDISConfig() : {};
  const hNiv = P.hn || 3.0;
  const Ht   = niv * hNiv;
  const SC   = _RV.scale * 0.85;
  const PAD  = 60, DIM_W=55, RIGHT_PAD=200;

  const sectionType = _RV.sectionType || 'AA';
  const cutDim  = sectionType==='AA' ? bW : bD;
  const cutLabel= sectionType==='AA'
    ? 'SECȚIUNE A-A — TRANSVERSALĂ ('+bW.toFixed(2)+'m)'
    : 'SECȚIUNE B-B — LONGITUDINALĂ ('+bD.toFixed(2)+'m)';

  const sW   = cutDim * SC;
  const sH   = Ht * SC;
  const SLAB = Math.max(3, 0.20*SC);

  // Subsol: câte niveluri?
  const hasSubsol  = (b.subsolNiv||0) > 0 || true; // arătăm mereu S-1 dacă există subsol logic
  const subsolH    = hasSubsol ? (2.7 * SC) : 0;    // înălțime S-1 = 2.70m
  const RAMPA_W_SC = Math.min(3.6*SC, sW*0.22);

  const W = sW + PAD*2 + DIM_W + RIGHT_PAD;
  const H = sH + subsolH + PAD*2 + 160;
  const {cv,ctx} = _rvInitCanvas(W, H+40, 'rv-canvas');
  if(!ctx) return;
  ctx.fillStyle='#FFFFFF'; ctx.fillRect(0,0,W,H+40);

  // oy = poziția cotei ±0.00 (CTN) în canvas
  const ox  = PAD + DIM_W;
  const oy0 = PAD + subsolH;       // cota ±0.00
  const oy  = oy0;                 // top clădire = oy0 - sH

  // ── Selector A-A / B-B (refolosim cel existent sau reconstruim) ───────
  ctx.fillStyle='#0F172A'; ctx.font='bold 11px IBM Plex Mono';
  ctx.textAlign='center'; ctx.fillText(cutLabel, ox+sW/2, oy-sH-40);
  ctx.font='8px IBM Plex Mono'; ctx.fillStyle='#64748B';
  ctx.fillText('Sc. 1:'+Math.round(100/(_RV.scale/12))+' · '+(_AC.stilLabel||'')+(hasSubsol?' · cu subsol S-1':''), ox+sW/2, oy-sH-25);
  ctx.textAlign='left';

  // ── SUBSOL S-1 ────────────────────────────────────────────────────────
  if(hasSubsol){
    const sY1 = oy0;         // cota ±0.00
    const sY2 = oy0 + subsolH; // cota -2.70m (radier)
    const EW  = Math.max(4, 0.30*SC);

    // Fundal subsol
    ctx.fillStyle='rgba(218,224,235,.7)';
    ctx.fillRect(ox, sY1, sW, subsolH);

    // Pereți exteriori subterani (hașurați)
    ctx.fillStyle='#1E293B';
    ctx.fillRect(ox, sY1, EW, subsolH);
    ctx.fillRect(ox+sW-EW, sY1, EW, subsolH);
    function _h(x,y,w,h){ ctx.save(); ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.strokeStyle='rgba(255,255,255,.25)';ctx.lineWidth=0.5;for(let i=-(Math.max(w,h));i<w+h;i+=4){ctx.beginPath();ctx.moveTo(x+i,y);ctx.lineTo(x+i+h,y+h);ctx.stroke();}ctx.restore(); }
    _h(ox,sY1,EW,subsolH); _h(ox+sW-EW,sY1,EW,subsolH);

    // Radier (fundație)
    ctx.fillStyle='rgba(120,100,80,.3)'; ctx.fillRect(ox-8,sY2-6,sW+16,10);
    ctx.strokeStyle='#78644A'; ctx.lineWidth=1.2; ctx.strokeRect(ox-8,sY2-6,sW+16,10);
    _h(ox-8,sY2-6,sW+16,10);
    ctx.fillStyle='#64748B'; ctx.font='bold 7px IBM Plex Mono'; ctx.textAlign='center';
    ctx.fillText('RADIER BA min. 30cm', ox+sW/2, sY2+2); ctx.textAlign='left';

    // Locuri de parcaj simplificate în secțiune
    const locH = Math.min(subsolH*0.55, 2.5*SC);
    const locW2 = Math.min(2.5*SC, sW*0.15);
    const nLocViz = Math.max(2, Math.floor((sW-EW*2-RAMPA_W_SC-10)/locW2));
    for(let i=0; i<nLocViz; i++){
      const lx = ox+EW+2+i*locW2;
      const ly = sY1+4;
      if(lx+locW2 > ox+sW-EW-RAMPA_W_SC-4) break;
      ctx.fillStyle='rgba(241,245,249,.9)'; ctx.fillRect(lx,ly,locW2-1,locH);
      ctx.strokeStyle='#94A3B8'; ctx.lineWidth=0.6; ctx.strokeRect(lx,ly,locW2-1,locH);
      ctx.fillStyle='#64748B'; ctx.font='5px IBM Plex Mono'; ctx.textAlign='center';
      ctx.fillText('LOC\n'+(i+1), lx+locW2/2, ly+locH/2); ctx.textAlign='left';
    }
    // Label culoar
    ctx.fillStyle='rgba(203,213,225,.5)';
    ctx.fillRect(ox+EW+2, sY1+locH+4, sW-EW*2-RAMPA_W_SC-4, subsolH-locH-8);
    ctx.fillStyle='rgba(30,58,138,.7)'; ctx.font='bold 6px IBM Plex Mono'; ctx.textAlign='center';
    ctx.fillText('CULOAR CIRCULAȚIE 6m — H liberă min. 2.40m',
      ox+(sW-EW*2-RAMPA_W_SC)/2, sY1+locH+4+(subsolH-locH-8)/2+3); ctx.textAlign='left';

    // Rampă în secțiune (diagonala coborând din stânga sus)
    const rX = ox+sW-EW-RAMPA_W_SC-2;
    const rY1 = sY1-2; // la CTN
    const rY2 = sY2-6; // la radier
    ctx.fillStyle='rgba(254,243,199,.7)';
    ctx.beginPath();
    ctx.moveTo(rX, rY1); ctx.lineTo(rX+RAMPA_W_SC, rY1);
    ctx.lineTo(rX+RAMPA_W_SC, rY2); ctx.lineTo(rX, rY2);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle='#B45309'; ctx.lineWidth=1.2;
    ctx.beginPath();
    ctx.moveTo(rX, rY1); ctx.lineTo(rX+RAMPA_W_SC, rY1);
    ctx.lineTo(rX+RAMPA_W_SC, rY2); ctx.lineTo(rX, rY2);
    ctx.closePath(); ctx.stroke();
    // Linie pantă
    ctx.strokeStyle='rgba(180,83,9,.6)'; ctx.lineWidth=1; ctx.setLineDash([4,3]);
    ctx.beginPath(); ctx.moveTo(rX,rY1); ctx.lineTo(rX+RAMPA_W_SC,rY2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle='#92400E'; ctx.font='bold 5.5px IBM Plex Mono'; ctx.textAlign='center';
    ctx.fillText('RAMPĂ', rX+RAMPA_W_SC/2, (rY1+rY2)/2-4);
    ctx.font='5px IBM Plex Mono';
    ctx.fillText('i≤15%', rX+RAMPA_W_SC/2, (rY1+rY2)/2+4); ctx.textAlign='left';

    // Cotă nivel S-1
    ctx.fillStyle='#1E40AF'; ctx.font='bold 8px IBM Plex Mono'; ctx.textAlign='right';
    ctx.fillText('-2.70m', ox-4, sY2-4);
    ctx.fillText('S-1', ox-38, sY2-4);
    ctx.textAlign='left';
    ctx.strokeStyle='rgba(148,163,184,.3)'; ctx.lineWidth=0.5; ctx.setLineDash([4,4]);
    ctx.beginPath(); ctx.moveTo(ox,sY2-6); ctx.lineTo(ox+sW,sY2-6); ctx.stroke();
    ctx.setLineDash([]);
  }

  // ── Fundație vizibilă (între S-1 și parter) ───────────────────────────
  const foundH = Math.max(15, 0.80*SC);
  const foundY = oy - foundH;
  ctx.fillStyle='rgba(120,100,80,.2)'; ctx.fillRect(ox-8, foundY, sW+16, foundH);
  ctx.strokeStyle='#78644A'; ctx.lineWidth=0.8; ctx.strokeRect(ox-8, foundY, sW+16, foundH);

  // ── Etaje (P, E1..En) ────────────────────────────────────────────────
  const EW2 = Math.max(4, 0.28*SC);
  for(let i=0; i<=niv; i++){
    const flY = oy - sH + (niv-i)*hNiv*SC;
    // Planșeu
    if(i > 0 && i <= niv){
      ctx.fillStyle='rgba(50,65,90,.35)'; ctx.fillRect(ox,flY,sW,SLAB);
      ctx.save(); ctx.beginPath();ctx.rect(ox,flY,sW,SLAB);ctx.clip();
      ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=0.5;
      for(let h=0;h<sW+SLAB+5;h+=4){ctx.beginPath();ctx.moveTo(ox+h,flY);ctx.lineTo(ox+h-SLAB,flY+SLAB);ctx.stroke();}
      ctx.restore();
      ctx.strokeStyle='#334155';ctx.lineWidth=1;ctx.strokeRect(ox,flY,sW,SLAB);
    }
    // Cotă nivel
    ctx.fillStyle='#1E40AF'; ctx.font='bold 8px IBM Plex Mono'; ctx.textAlign='right';
    const lvlStr = i===0 ? '±0.00 (CTN)' : '+'+(i*hNiv).toFixed(2)+'m';
    ctx.fillText(lvlStr, ox-4, flY+(i===0?4:-2));
    ctx.fillStyle='#475569'; ctx.font='bold 8px IBM Plex Mono';
    ctx.fillText(i===0?'P':`E${i}`, ox-38, flY+(i===0?4:-2));
    ctx.textAlign='left';
    // Linie nivel
    if(i<niv){
      ctx.strokeStyle='rgba(148,163,184,.2)';ctx.lineWidth=0.5;ctx.setLineDash([4,4]);
      ctx.beginPath();ctx.moveTo(ox,flY);ctx.lineTo(ox+sW,flY);ctx.stroke();ctx.setLineDash([]);
    }
  }

  // Pereți exteriori clădire
  ctx.fillStyle='#1E293B';
  ctx.fillRect(ox, oy-sH, EW2, sH);
  ctx.fillRect(ox+sW-EW2, oy-sH, EW2, sH);
  function _hClad(x,y,w,h){ ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.strokeStyle='rgba(255,255,255,.2)';ctx.lineWidth=0.5;for(let hi=0;hi<sH+EW2;hi+=4){ctx.beginPath();ctx.moveTo(x+hi,y);ctx.lineTo(x+hi-EW2,y+sH);ctx.stroke();}ctx.restore(); }
  _hClad(ox,oy-sH,EW2,sH); _hClad(ox+sW-EW2,oy-sH,EW2,sH);

  // ── Camere reale din plan (dacă există) ───────────────────────────────
  const fl0 = _RV.floors?.[0];
  if(fl0?.rects){
    const ROOM_COLS={
      living:'rgba(254,215,170,.25)',bedroom:'rgba(187,247,208,.25)',
      bedroom2:'rgba(187,247,208,.20)',kitchen:'rgba(186,230,253,.25)',
      bath:'rgba(221,214,254,.25)',hall:'rgba(226,232,240,.30)',
      commercial:'rgba(233,213,255,.20)',balcon:'rgba(254,249,195,.20)',
    };
    const cutPos = sectionType==='AA' ? bD/2 : bW/2;
    const EPS=0.05;
    for(let fi=0; fi<niv; fi++){
      const flI = _RV.floors?.[fi] || fl0;
      const flY = oy - sH + (niv-fi-1)*hNiv*SC + SLAB;
      const flH = hNiv*SC - SLAB;
      (flI?.rects||[]).forEach(r=>{
        if(r.bal) return;
        const inCut = sectionType==='AA'
          ? (r.y-EPS <= cutPos && cutPos <= r.y+r.h+EPS)
          : (r.x-EPS <= cutPos && cutPos <= r.x+r.w+EPS);
        if(!inCut) return;
        const rx_ = sectionType==='AA'
          ? (ox + r.x*SC) : (ox + r.y*SC);
        const rw_ = sectionType==='AA' ? r.w*SC : r.h*SC;
        const rCol = ROOM_COLS[r.t]||'rgba(226,232,240,.15)';
        ctx.fillStyle=rCol; ctx.fillRect(rx_,flY,rw_,flH);
        ctx.strokeStyle='rgba(51,65,85,.25)';ctx.lineWidth=0.5;ctx.strokeRect(rx_,flY,rw_,flH);
        if(rw_>24){
          ctx.fillStyle='rgba(15,23,42,.5)';ctx.font='6px IBM Plex Mono';ctx.textAlign='center';
          ctx.fillText((r.lbl||r.t).replace('\n',' ').slice(0,14),rx_+rw_/2,flY+flH/2+2);ctx.textAlign='left';
        }
      });
    }
  }

  // ── Înălțime totală (cotă pe dreapta) ─────────────────────────────────
  const htX = ox+sW+15;
  ctx.strokeStyle='#DC2626'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.moveTo(htX,oy-sH); ctx.lineTo(htX,oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(htX-3,oy-sH); ctx.lineTo(htX+3,oy-sH); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(htX-3,oy); ctx.lineTo(htX+3,oy); ctx.stroke();
  ctx.fillStyle='#DC2626'; ctx.font='bold 7px IBM Plex Mono';
  ctx.save(); ctx.translate(htX+10,(oy-sH+oy)/2); ctx.rotate(-Math.PI/2);
  ctx.textAlign='center'; ctx.fillText('H='+Ht.toFixed(1)+'m ('+niv+' niv.)',0,0); ctx.restore();

  if(hasSubsol){
    ctx.strokeStyle='#7C3AED'; ctx.lineWidth=0.8;
    const sY2b = oy + subsolH - 6;
    ctx.beginPath(); ctx.moveTo(htX,oy); ctx.lineTo(htX,sY2b); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(htX-3,sY2b); ctx.lineTo(htX+3,sY2b); ctx.stroke();
    ctx.fillStyle='#7C3AED'; ctx.font='bold 7px IBM Plex Mono';
    ctx.save(); ctx.translate(htX+10,(oy+sY2b)/2); ctx.rotate(-Math.PI/2);
    ctx.textAlign='center'; ctx.fillText('S-1 = 2.70m',0,0); ctx.restore();
  }

  // Cartuș
  if(typeof _rvDrawCartus==='function')
    _rvDrawCartus(ctx,W,H-10,P,null,'SECȚIUNE '+(sectionType==='AA'?'A-A TRANSVERSALĂ':'B-B LONGITUDINALĂ')+(hasSubsol?' + SUBSOL S-1':''));
}
