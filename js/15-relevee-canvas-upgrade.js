// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-canvas-upgrade.js — Motor randare profesional
// UrbanX TSS·FG
//
// Înlocuiește complet _rvRenderPlan, _rvRenderFacade, _rvRenderSection,
// _rvDrawDims, _rvDrawNorth, _rvDrawScale, _rvDrawCartus
//
// Standard vizual conform referinței:
//   - Fond alb, pereți negri groși cu hașuri diagonale
//   - Culori pastel solide per cameră
// Copyright (c) 2024–2026 ThinkSmart Solutions SRL — Toate drepturile rezervate
// Proprietar: Florin Georgescu | contact@urbanx.ro | urbanx.ro | Utilizare conform LICENSE.

//   - Text minim 11px, lizibil
//   - Cote cu săgeți în afara planului
//   - Mobilier simplificat per tip cameră
//   - Simboluri ferestre (3 linii) și uși (arc sfert cerc)
//   - Legendă, nord, scară grafică, cartuș profesional
// ═══════════════════════════════════════════════════════════════════════════
// UrbanX TSS·FG — Relevee Canvas Upgrade — Motor randare profesional
// Copyright (c) 2024–2026 ThinkSmart Solutions SRL — Toate drepturile rezervate
// Proprietar: ThinkSmart Solutions SRL | contact@urbanx.ro | urbanx.ro
// Utilizare exclusiv conform termenilor de licență UrbanX. Redistribuire interzisă.

(function(){
'use strict';

// ── Polyfill ctx.roundRect (Safari <15.4, Chrome <99, Firefox <112) ────────
if(typeof CanvasRenderingContext2D !== 'undefined' &&
   !CanvasRenderingContext2D.prototype.roundRect){
  CanvasRenderingContext2D.prototype.roundRect = function(x,y,w,h,r){
    if(w < 2*r) r = w/2;
    if(h < 2*r) r = h/2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
  };
}

// ── Paleta nouă — culori pastel pe fond alb ───────────────────────────────
const _C = {
  BG:      '#FAFAFA',   // fond planșă
  PARCEL:  '#E8F4E8',   // teren
  STREET:  '#D0D5DD',   // stradă
  WALL_EXT:'#1A1A2E',   // perete exterior (aproape negru)
  WALL_INT:'#2C3E60',   // perete interior
  WALL_BG: '#F0F0F0',   // fundal zona perete
  DIM:     '#1A3A6B',   // culoare cote
  GRID:    '#E8ECF2',   // grid discret
  TEXT:    '#1A1A2E',
  GOLD:    '#B8860B',
  LABEL_BG:'rgba(255,255,255,0.88)',
};

// Culori camere — pastel solid, lizibil pe alb
const _ROOM_COLORS = {
  living:   {fill:'#FEF3C7', stroke:'#D97706', lbl:'#92400E', name:'Living'},
  bedroom:  {fill:'#DCFCE7', stroke:'#16A34A', lbl:'#14532D', name:'Dormitor'},
  bedroom2: {fill:'#D1FAE5', stroke:'#059669', lbl:'#064E3B', name:'Dormitor 2'},
  bedroom3: {fill:'#A7F3D0', stroke:'#047857', lbl:'#065F46', name:'Dormitor 3'},
  kitchen:  {fill:'#DBEAFE', stroke:'#2563EB', lbl:'#1E3A8A', name:'Bucătărie'},
  bath:     {fill:'#EDE9FE', stroke:'#7C3AED', lbl:'#4C1D95', name:'Baie'},
  wc:       {fill:'#F3E8FF', stroke:'#9333EA', lbl:'#581C87', name:'WC'},
  hall:     {fill:'#F1F5F9', stroke:'#64748B', lbl:'#334155', name:'Hol'},
  storage:  {fill:'#FEF9C3', stroke:'#CA8A04', lbl:'#713F12', name:'Depozit'},
  core:     {fill:'#BFDBFE', stroke:'#1D4ED8', lbl:'#1E3A8A', name:'Casă Scări'},
  balcon:   {fill:'#F0FDF4', stroke:'#86EFAC', lbl:'#166534', name:'Balcon', dash:true},
  office:   {fill:'#E0E7FF', stroke:'#4338CA', lbl:'#312E81', name:'Birou'},
  meeting:  {fill:'#FCE7F3', stroke:'#BE185D', lbl:'#831843', name:'Sală'},
  commercial:{fill:'#FFF7ED',stroke:'#EA580C', lbl:'#7C2D12', name:'Comercial'},
  reception: {fill:'#FDF4FF',stroke:'#A21CAF', lbl:'#701A75', name:'Recepție'},
  restaurant:{fill:'#FFFBEB',stroke:'#D97706', lbl:'#92400E', name:'Restaurant'},
};

function _rc(t){ return _ROOM_COLORS[t]||{fill:'#F5F5F5',stroke:'#64748B',lbl:'#334155',name:t}; }

// ── Helper text cu background pentru lizibilitate ─────────────────────────
function _txtBg(ctx, text, x, y, opts){
  const fs = opts?.fs || 11;
  const bold = opts?.bold ? 'bold ' : '';
  ctx.font = bold + fs + 'px "Helvetica Neue", Arial, sans-serif';
  const tw = ctx.measureText(text).width;
  const pad = 2;
  if(opts?.bg !== false){
    ctx.fillStyle = opts?.bg || 'rgba(255,255,255,0.85)';
    ctx.fillRect(x - tw/2 - pad, y - fs + 1, tw + pad*2, fs + 2);
  }
  ctx.fillStyle = opts?.col || _C.TEXT;
  ctx.textAlign = opts?.align || 'center';
  ctx.fillText(text, x, y);
  ctx.textAlign = 'left';
}

// ── Hașură diagonală în zone de perete ────────────────────────────────────
function _hatch(ctx, x, y, w, h, col, sp, angle){
  // Simplified: solid fill instead of hatching loops (prevents UI freeze)
  if(!w||!h||w<=0||h<=0) return;
  ctx.save();
  ctx.fillStyle = col;
  ctx.globalAlpha = 0.18;
  ctx.fillRect(x, y, w, h);
  ctx.globalAlpha = 1;
  ctx.restore();
  return; // skip original hatching loop
  // Original hatching below (disabled for performance):
  if(w <= 0 || h <= 0) return;
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  ctx.strokeStyle = col || 'rgba(0,0,0,0.55)';
  ctx.lineWidth = 0.7;
  const a = angle || Math.PI/4;
  const D = Math.max(w, h) * 2;
  const step = sp || 4;
  for(let i = -D; i < D; i += step){
    ctx.beginPath();
    ctx.moveTo(x + i * Math.cos(a), y + i * Math.sin(a) - D);
    ctx.lineTo(x + i * Math.cos(a) + D, y + i * Math.sin(a));
    ctx.stroke();
  }
  ctx.restore();
}

// ── Mobilier simplificat per tip cameră ──────────────────────────────────
function _drawFurniture(ctx, t, rx, ry, rw, rh, SC){
  if(rw < 20 || rh < 20) return;
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = '#555';
  ctx.fillStyle = 'rgba(200,200,200,0.3)';
  ctx.lineWidth = 0.8;

  const mx = rx + rw/2, my = ry + rh/2;
  const s = Math.min(rw, rh);

  if(t === 'bedroom' || t === 'bedroom2' || t === 'bedroom3'){
    // Pat: dreptunghi cu cap
    const bw = Math.min(rw*0.7, 2.2*SC), bh = Math.min(rh*0.75, 2.1*SC);
    const bx = mx - bw/2, by = my - bh/2;
    ctx.fillRect(bx, by, bw, bh); ctx.strokeRect(bx, by, bw, bh);
    // Perniță
    ctx.fillStyle='rgba(230,230,230,0.6)';
    ctx.fillRect(bx+4, by+4, bw*0.4-2, bh*0.28); ctx.strokeRect(bx+4, by+4, bw*0.4-2, bh*0.28);
    ctx.fillRect(bx+bw*0.5+2, by+4, bw*0.4-2, bh*0.28); ctx.strokeRect(bx+bw*0.5+2, by+4, bw*0.4-2, bh*0.28);
    // Tăblie
    ctx.lineWidth=1.5; ctx.strokeStyle='#888';
    ctx.beginPath(); ctx.moveTo(bx,by+bh*0.22); ctx.lineTo(bx+bw,by+bh*0.22); ctx.stroke();

  } else if(t === 'living'){
    // Canapea L
    const sw_ = Math.min(rw*0.72, 2.8*SC), sh_ = Math.min(rh*0.38, 1.2*SC);
    const sx = rx + rw*0.12, sy = my - sh_/2;
    ctx.fillStyle='rgba(200,200,200,0.4)';
    ctx.fillRect(sx, sy, sw_, sh_); ctx.strokeRect(sx, sy, sw_, sh_);
    // Spătar canapea
    ctx.fillRect(sx, sy, sw_, sh_*0.28); ctx.strokeRect(sx, sy, sw_, sh_*0.28);
    // Măsuță
    const tw = Math.min(sw_*0.35, 1.0*SC), th = Math.min(rh*0.2, 0.6*SC);
    ctx.strokeStyle='#888'; ctx.fillStyle='rgba(220,220,220,0.3)';
    ctx.fillRect(mx-tw/2, sy+sh_+sh_*0.3, tw, th);
    ctx.strokeRect(mx-tw/2, sy+sh_+sh_*0.3, tw, th);

  } else if(t === 'kitchen'){
    // Plan de lucru L
    const cw = rw*0.85, ch = Math.min(0.7*SC, rh*0.3);
    const cx = rx + rw*0.08, cy = ry + rh*0.08;
    ctx.fillStyle='rgba(180,210,230,0.4)';
    ctx.fillRect(cx, cy, cw, ch); ctx.strokeRect(cx, cy, cw, ch);
    // Chiuvetă
    const sw2 = Math.min(0.9*SC, cw*0.2); const sh2 = ch*0.7;
    ctx.fillStyle='rgba(150,200,220,0.5)';
    ctx.fillRect(cx+cw-sw2-4, cy+ch*0.15, sw2, sh2);
    ctx.strokeRect(cx+cw-sw2-4, cy+ch*0.15, sw2, sh2);
    // Aragaz
    const gx = cx+4, gy = cy+ch*0.1, gs = Math.min(0.8*SC, ch*0.7);
    ctx.strokeStyle='#888';
    for(let i=0;i<2;i++) for(let j=0;j<2;j++){
      const cx2=gx+i*(gs/2+2)+gs/4, cy2=gy+j*(gs/2+2)+gs/4;
      ctx.beginPath(); ctx.arc(cx2, cy2, gs/5, 0, Math.PI*2); ctx.stroke();
    }

  } else if(t === 'bath'){
    // Cadă
    const bw2 = Math.min(rw*0.65, 2.0*SC), bh2 = Math.min(rh*0.45, 1.0*SC);
    ctx.fillStyle='rgba(200,180,220,0.3)';
    ctx.beginPath(); ctx.roundRect(rx+rw*0.1, ry+rh*0.08, bw2, bh2, 4);
    ctx.fill(); ctx.stroke();
    // WC
    const wx = rx+rw*0.6, wy = ry+rh*0.55, ww=Math.min(0.6*SC,rw*0.3), wh=Math.min(0.8*SC,rh*0.35);
    ctx.beginPath(); ctx.ellipse(wx+ww/2, wy+wh/2, ww/2, wh/2, 0, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();
    // Lavoar
    const lx=rx+rw*0.1, ly=ry+rh*0.62, lw=Math.min(0.5*SC,rw*0.25), lh=Math.min(0.5*SC,rh*0.25);
    ctx.beginPath(); ctx.ellipse(lx+lw/2, ly+lh/2, lw/2, lh/2, 0, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();

  } else if(t === 'wc'){
    const wx2=rx+rw*0.15, wy2=ry+rh*0.15, ww2=rw*0.7, wh2=rh*0.55;
    ctx.beginPath(); ctx.ellipse(wx2+ww2/2, wy2+wh2/2, ww2/2, wh2/2, 0, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();

  } else if(t === 'office'){
    // Birou
    const dw=Math.min(rw*0.65, 2.0*SC), dh=Math.min(rh*0.5, 1.2*SC);
    const dx2=rx+rw*0.2, dy2=ry+rh*0.2;
    ctx.fillStyle='rgba(180,180,220,0.3)';
    ctx.fillRect(dx2, dy2, dw, dh); ctx.strokeRect(dx2, dy2, dw, dh);
    // Scaun
    const scsz=Math.min(0.5*SC, 14);
    ctx.beginPath(); ctx.arc(dx2+dw/2, dy2+dh+scsz*0.7, scsz, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();

  } else if(t === 'core'){
    // Scări: linii orizontale paralele cu săgeată
    const sx2=rx+4, sy2=ry+4, sw3=rw-8, sh3=rh-8;
    const nSteps=Math.max(3,Math.min(12,Math.floor(sh3/Math.max(3,SC*0.18))));
    ctx.strokeStyle='rgba(30,60,120,0.5)'; ctx.lineWidth=0.7;
    ctx.beginPath();
    for(let i=1;i<nSteps;i++){
      const ly_=sy2+i*(sh3/nSteps);
      ctx.moveTo(sx2,ly_); ctx.lineTo(sx2+sw3*0.6,ly_);
    }
    ctx.stroke();
    // Săgeată urcare
    const ay=sy2+sh3*0.4;
    ctx.strokeStyle='rgba(30,60,120,0.8)'; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.moveTo(sx2+sw3*0.1, ay); ctx.lineTo(sx2+sw3*0.55, ay); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx2+sw3*0.4, ay-4); ctx.lineTo(sx2+sw3*0.55, ay);
    ctx.lineTo(sx2+sw3*0.4, ay+4); ctx.stroke();
    // Lift (dreptunghi cu X)
    const lx2=rx+rw*0.62, ly2=ry+4, ls=Math.min(rw*0.3, rh*0.4);
    ctx.fillStyle='rgba(37,99,235,0.1)'; ctx.strokeStyle='rgba(30,80,180,0.6)';
    ctx.fillRect(lx2, ly2, ls, ls*1.3); ctx.strokeRect(lx2, ly2, ls, ls*1.3);
    ctx.lineWidth=0.5;
    ctx.beginPath(); ctx.moveTo(lx2,ly2); ctx.lineTo(lx2+ls,ly2+ls*1.3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(lx2+ls,ly2); ctx.lineTo(lx2,ly2+ls*1.3); ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

// ── Fereastră profesională (3 linii în golul peretelui) ───────────────────
function _drawWindow(ctx, wall, gx, gy, gw, gh, SC){
  // Fond golului — alb
  ctx.fillStyle = '#F8FAFF';
  ctx.fillRect(gx, gy, gw, gh);
  // Toc exterior
  ctx.strokeStyle = '#1A1A2E'; ctx.lineWidth = 1.2;
  ctx.strokeRect(gx, gy, gw, gh);
  // Cele 3 linii de sticlă (geam tripan)
  ctx.strokeStyle = '#5B8FCC'; ctx.lineWidth = 0.9;
  const isHoriz = wall==='N'||wall==='S';
  if(isHoriz){
    const y1=gy+gh*0.2, y2=gy+gh*0.5, y3=gy+gh*0.8;
    [y1,y2,y3].forEach(y_=>{
      ctx.beginPath(); ctx.moveTo(gx+1,y_); ctx.lineTo(gx+gw-1,y_); ctx.stroke();
    });
  } else {
    const x1=gx+gw*0.2, x2=gx+gw*0.5, x3=gx+gw*0.8;
    [x1,x2,x3].forEach(x_=>{
      ctx.beginPath(); ctx.moveTo(x_,gy+1); ctx.lineTo(x_,gy+gh-1); ctx.stroke();
    });
  }
}

// ── Ușă profesională (foaie + arc sfert cerc clar) ────────────────────────
function _drawDoor(ctx, dx, dy_d, dw, isMain, swing, extW, SC){
  const col = isMain ? '#C2410C' : '#475569';
  const lw  = isMain ? 2.0 : 1.4;
  // Șterge golul din perete
  ctx.fillStyle = '#F8FAFF';
  ctx.fillRect(dx-1, dy_d-extW, dw+2, extW*2);
  // Foaia ușii
  ctx.strokeStyle = col; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.moveTo(dx, dy_d); ctx.lineTo(dx+dw, dy_d); ctx.stroke();
  // Toc
  ctx.strokeStyle = col; ctx.lineWidth = lw*0.6;
  ctx.strokeRect(dx-0.5, dy_d-extW*0.9, dw+1, extW*0.8);
  // Arc deschidere — sfert cerc clar
  ctx.strokeStyle = isMain ? 'rgba(194,65,12,0.6)' : 'rgba(71,85,105,0.5)';
  ctx.lineWidth = isMain ? 1.2 : 0.9;
  ctx.setLineDash([3,2]);
  if(swing==='out'||isMain){
    ctx.beginPath(); ctx.arc(dx, dy_d, dw, -Math.PI/2, 0, false); ctx.stroke();
  } else if(swing==='right'){
    ctx.beginPath(); ctx.arc(dx, dy_d, dw, 0, Math.PI/2, false); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.arc(dx+dw, dy_d, dw, Math.PI/2, Math.PI, false); ctx.stroke();
  }
  ctx.setLineDash([]);
}

// ═══════════════════════════════════════════════════════════════════════════
// PLAN NIVEL — rescriere completă
// ═══════════════════════════════════════════════════════════════════════════
window._rvRenderPlan = function(fl, b){
  if(!fl || !b || !b.P) { console.warn('[Relevee] _rvRenderPlan: fl sau b null'); return; }
  if(!fl.rects) { console.warn('[Relevee] fl.rects missing'); return; }
  const {P, bW, bD} = b;
  const SC  = _RV.scale;
  const EW  = Math.max(4, SC * 0.28);  // perete exterior ~28cm
  const IW  = Math.max(2.5, SC * 0.14); // perete interior ~14cm
  const pad = Math.max(70, SC * 5);     // padding pentru cote
  const lm  = 60;

  const W = bW*SC + pad*2 + P.rl*2*SC + lm;
  const H = bD*SC + pad*2 + (P.rf+P.rs)*SC + 120;
  const {cv, ctx} = _rvInitCanvas(W, H);

  const ox = pad + P.rl*SC;
  const oy = pad + P.rf*SC;
  _RV.planOx = ox; _RV.planOy = oy; _RV.planSc = SC;

  // ── Fond ──────────────────────────────────────────────────────────────────
  ctx.fillStyle = _C.BG;
  ctx.fillRect(0, 0, W, H);

  // Grid discret — batch într-un singur stroke (previne freeze pe Safari)
  ctx.strokeStyle = _C.GRID; ctx.lineWidth = 0.4;
  const gsp = Math.max(SC, 8); // minim 8px spacing
  ctx.beginPath();
  for(let x=0; x<W; x+=gsp){ ctx.moveTo(x,0); ctx.lineTo(x,H); }
  for(let y=0; y<H; y+=gsp){ ctx.moveTo(0,y); ctx.lineTo(W,y); }
  ctx.stroke();

  // ── Teren ─────────────────────────────────────────────────────────────────
  ctx.fillStyle = _C.PARCEL;
  ctx.fillRect(pad, pad, P.W*SC, P.D*SC);
  ctx.strokeStyle = '#6B7280'; ctx.lineWidth = 1.2; ctx.setLineDash([SC*0.4, SC*0.3]);
  ctx.strokeRect(pad, pad, P.W*SC, P.D*SC);
  ctx.setLineDash([]);

  // Label parcelă
  ctx.fillStyle = '#6B7280';
  ctx.font = '9px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(`Nr.cad. ${P.nrCad}  ·  ${P.W}m × ${P.D}m  ·  ${P.area||'?'}m²  ·  UTR ${P.utr}`, pad+4, pad-8);

  // Retrageri (linii punctate fine)
  ctx.strokeStyle = 'rgba(59,130,246,0.35)'; ctx.lineWidth = 0.8; ctx.setLineDash([SC*0.25, SC*0.25]);
  ctx.strokeRect(ox-1, oy-1, bW*SC+2, bD*SC+2);
  ctx.setLineDash([]);

  // ── Stradă ───────────────────────────────────────────────────────────────
  const stY = pad + P.D*SC + 6;
  ctx.fillStyle = _C.STREET;
  ctx.fillRect(pad, stY, P.W*SC, 22);
  ctx.strokeStyle = '#9CA3AF'; ctx.lineWidth = 0.8; ctx.strokeRect(pad, stY, P.W*SC, 22);
  ctx.fillStyle = '#6B7280'; ctx.font = 'bold 10px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('▲  FRONT STRADAL  ·  ' + P.frontDir, pad + P.W*SC/2, stY+15);
  ctx.textAlign = 'left';

  // ── Clădire — fond ────────────────────────────────────────────────────────
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(ox, oy, bW*SC, bD*SC);
  // Umbra ușoară
  // Shadow dezactivat — ctx.shadowBlur blochează UI pe Safari/WebKit (software render)
  ctx.strokeStyle = _C.WALL_EXT; ctx.lineWidth = EW;
  ctx.strokeRect(ox + EW/2, oy + EW/2, bW*SC - EW, bD*SC - EW);

  // ── Camere ────────────────────────────────────────────────────────────────
  const sorted = [...fl.rects].sort((a,m_)=>(a.zIdx||0)-(m_.zIdx||0));
  sorted.forEach(r=>{
    const C = _rc(r.t);
    const rx = ox + r.x*SC, ry = oy + r.y*SC;
    const rw = r.w*SC, rh = r.h*SC;

    // Fill cameră
    ctx.fillStyle = r.bal ? '#F0FDF4' : C.fill;
    ctx.fillRect(rx, ry, rw, rh);

    // Bordura cameră = perete interior
    ctx.strokeStyle = C.stroke;
    ctx.lineWidth = r.bal ? 1.0 : IW;
    if(C.dash || r.bal) ctx.setLineDash([SC*0.3, SC*0.2]);
    ctx.strokeRect(rx + (r.bal?0.5:IW/2), ry + (r.bal?0.5:IW/2),
                   rw - (r.bal?1:IW), rh - (r.bal?1:IW));
    ctx.setLineDash([]);

    // Mobilier
    if(!r.bal) _drawFurniture(ctx, r.t, rx, ry, rw, rh, SC);

    // ── Label cameră ────────────────────────────────────────────────────────
    if(rw > 28 && rh > 20){
      const cx_ = rx + rw/2, cy_ = ry + rh/2;
      const lblLines = (r.lbl || C.name || r.t).split('\n');
      const fs = Math.max(10, Math.min(13, rw/6, rh/4));
      ctx.font = `bold ${fs}px "Helvetica Neue", Arial, sans-serif`;

      // Background label
      const maxW = lblLines.reduce((m,l)=>Math.max(m, ctx.measureText(l).width),0);
      const lbH = lblLines.length * (fs+2) + (rh>50?14:0) + 4;
      ctx.fillStyle = 'rgba(255,255,255,0.82)';
      ctx.fillRect(cx_ - maxW/2 - 3, cy_ - (fs+1) - (lblLines.length>1?(fs+2):0)/2 - 2, maxW+6, lbH);

      // Text cameră
      ctx.fillStyle = C.lbl; ctx.textAlign = 'center';
      lblLines.forEach((ln, li)=>{
        ctx.fillText(ln, cx_, cy_ + (li - (lblLines.length-1)/2) * (fs+2));
      });

      // Suprafață
      if(rh > 50 && r.w*r.h > 1){
        const areaStr = (r.w*r.h).toFixed(1) + ' m²';
        ctx.font = `${Math.max(9, fs-2)}px "Helvetica Neue", Arial, sans-serif`;
        ctx.fillStyle = '#555';
        ctx.fillText(areaStr, cx_, cy_ + lblLines.length * (fs+1)/2 + 10);
      }
      ctx.textAlign = 'left';
    }
  });

  // ── Pereți exteriori groși cu hașuri ─────────────────────────────────────
  const hatchCol = 'rgba(0,0,50,0.45)';
  const hsp = Math.max(3, SC * 0.22);
  // 4 benzi perete exterior
  _hatch(ctx, ox, oy, EW*1.6, bD*SC, hatchCol, hsp);                          // V
  _hatch(ctx, ox+bW*SC-EW*1.6, oy, EW*1.6, bD*SC, hatchCol, hsp);            // E
  _hatch(ctx, ox, oy, bW*SC, EW*1.6, hatchCol, hsp);                          // N
  _hatch(ctx, ox, oy+bD*SC-EW*1.6, bW*SC, EW*1.6, hatchCol, hsp);            // S
  // Bordura groasă peste hașuri
  ctx.strokeStyle = _C.WALL_EXT; ctx.lineWidth = EW;
  ctx.strokeRect(ox+EW/2, oy+EW/2, bW*SC-EW, bD*SC-EW);

  // Pereți interiori (structurale — cores)
  sorted.forEach(r=>{
    if(r.t !== 'core') return;
    const rx=ox+r.x*SC, ry_=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
    const cw = IW*1.4;
    _hatch(ctx, rx, ry_, rw, rh, hatchCol, hsp*0.8);
    ctx.strokeStyle = _C.WALL_INT; ctx.lineWidth = cw;
    ctx.strokeRect(rx+cw/2, ry_+cw/2, rw-cw, rh-cw);
  });

  // ── Ferestre ─────────────────────────────────────────────────────────────
  fl.wins.forEach(w=>{
    const wSC = (w.w||w.h||1)*SC;
    let gx,gy,gw,gh;
    if(w.wall==='N'){gx=ox+w.x*SC; gy=oy-EW; gw=wSC; gh=EW*2;}
    else if(w.wall==='S'){gx=ox+w.x*SC; gy=oy+bD*SC-EW; gw=wSC; gh=EW*2;}
    else if(w.wall==='V'){gx=ox-EW; gy=oy+w.y*SC; gw=EW*2; gh=wSC;}
    else{gx=ox+bW*SC-EW; gy=oy+w.y*SC; gw=EW*2; gh=wSC;}
    _drawWindow(ctx, w.wall, gx, gy, gw, gh, SC);
  });

  // ── Uși ──────────────────────────────────────────────────────────────────
  fl.doors.forEach(d=>{
    const dx=ox+d.x*SC, dw=d.w*SC;
    const dy_d = d.y!==undefined ? oy+d.y*SC : oy+bD*SC;
    _drawDoor(ctx, dx, dy_d, dw, d.type==='main', d.swing, EW, SC);
  });

  // ── Cote exterioare ───────────────────────────────────────────────────────
  if(_RV.showDim) _rvDrawDimsPro(ctx, ox, oy, bW*SC, bD*SC, bW, bD, P, SC);

  // ── Overlay solar ─────────────────────────────────────────────────────────
  if(_RV.showSolar && _RV.solarAnim && typeof _rvDrawSolarAnim==='function')
    _rvDrawSolarAnim(ctx, fl, b, ox, oy, SC);
  if(_RV.showISU && typeof _rvDrawISUCircles==='function')
    _rvDrawISUCircles(ctx, b, ox, oy, SC);

  // ── Cameră selectată ──────────────────────────────────────────────────────
  if(_RV.selectedRoom){
    const r=_RV.selectedRoom;
    const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
    ctx.strokeStyle='#EF4444'; ctx.lineWidth=2.5; ctx.setLineDash([4,2]);
    ctx.strokeRect(rx,ry,rw,rh); ctx.setLineDash([]);
  }

  // ── Elemente grafice ──────────────────────────────────────────────────────
  _rvDrawNorthPro(ctx, W-44, 44, P.frontDir, SC);
  _rvDrawScalePro(ctx, pad, H-22, SC);
  _rvDrawLegend(ctx, W-160, oy, fl);
  _rvDrawCartusPro(ctx, W, H, P, fl.floorIdx);

  // Watermark etaj (foarte transparent, mare)
  ctx.fillStyle = 'rgba(0,0,0,0.025)';
  ctx.font = `bold ${SC*5}px "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(fl.floorIdx===0?'PARTER':`ETAJ ${fl.floorIdx}`, ox+bW*SC/2, oy+bD*SC/2+SC*2);
  ctx.textAlign = 'left';

  if(typeof _rvSetupHover==='function') _rvSetupHover(cv, fl, ox, oy);
};

// ═══════════════════════════════════════════════════════════════════════════
// COTE PROFESIONALE cu săgeți și linii de extensie
// ═══════════════════════════════════════════════════════════════════════════
window._rvDrawDimsPro = function(ctx, ox, oy, pw, ph, bW, bD, P, SC){
  const D = _C.DIM;
  ctx.strokeStyle = D; ctx.fillStyle = D;
  ctx.lineWidth = 1.0;
  const fs = Math.max(9, Math.min(11, SC*0.9));
  ctx.font = `bold ${fs}px "Helvetica Neue", Arial, sans-serif`;

  function arrow(x1,y1,x2,y2){
    const ang = Math.atan2(y2-y1, x2-x1);
    const al = 6;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    // Săgeată start
    ctx.beginPath(); ctx.moveTo(x1,y1);
    ctx.lineTo(x1+al*Math.cos(ang+2.5), y1+al*Math.sin(ang+2.5));
    ctx.lineTo(x1+al*Math.cos(ang-2.5), y1+al*Math.sin(ang-2.5));
    ctx.closePath(); ctx.fill();
    // Săgeată end
    ctx.beginPath(); ctx.moveTo(x2,y2);
    ctx.lineTo(x2-al*Math.cos(ang+2.5), y2-al*Math.sin(ang+2.5));
    ctx.lineTo(x2-al*Math.cos(ang-2.5), y2-al*Math.sin(ang-2.5));
    ctx.closePath(); ctx.fill();
  }

  function dimH(x1,x2,y,val,offset){
    const yy = y + (offset||18);
    // Linii de extensie
    ctx.strokeStyle = D; ctx.lineWidth = 0.7;
    ctx.setLineDash([2,2]);
    ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x1,yy+3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2,y); ctx.lineTo(x2,yy+3); ctx.stroke();
    ctx.setLineDash([]);
    // Linie cotă cu săgeți
    ctx.lineWidth = 0.9; arrow(x1, yy, x2, yy);
    // Valoare
    const mx_ = (x1+x2)/2;
    ctx.fillStyle = '#FFF'; ctx.fillRect(mx_-20, yy-fs-1, 40, fs+2);
    ctx.fillStyle = D; ctx.textAlign = 'center';
    ctx.fillText(val, mx_, yy-1);
    ctx.textAlign = 'left';
  }

  function dimV(y1,y2,x,val,offset){
    const xx = x - (offset||20);
    ctx.strokeStyle = D; ctx.lineWidth = 0.7;
    ctx.setLineDash([2,2]);
    ctx.beginPath(); ctx.moveTo(x,y1); ctx.lineTo(xx-3,y1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x,y2); ctx.lineTo(xx-3,y2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.lineWidth = 0.9; arrow(xx, y1, xx, y2);
    const my_ = (y1+y2)/2;
    ctx.save(); ctx.translate(xx-2, my_); ctx.rotate(-Math.PI/2);
    ctx.fillStyle = '#FFF'; ctx.fillRect(-20, -fs-1, 40, fs+2);
    ctx.fillStyle = D; ctx.textAlign = 'center';
    ctx.fillText(val, 0, -1); ctx.textAlign = 'left';
    ctx.restore();
  }

  // Cote clădire (în afara planului)
  dimH(ox, ox+pw, oy+ph, bW.toFixed(2)+'m', 20);
  dimV(oy, oy+ph, ox, bD.toFixed(2)+'m', 22);

  // Cote parcelă (mai jos)
  ctx.strokeStyle = 'rgba(107,114,128,0.5)'; ctx.fillStyle = 'rgba(107,114,128,0.7)';
  const px0 = ox-P.rl*SC, py0 = oy-P.rf*SC;
  dimH(px0, px0+P.W*SC, oy+ph, P.W.toFixed(1)+'m teren', 42);
  dimV(py0, py0+P.D*SC, ox, P.D.toFixed(1)+'m teren', 40);
};

// ═══════════════════════════════════════════════════════════════════════════
// NORD profesional
// ═══════════════════════════════════════════════════════════════════════════
window._rvDrawNorthPro = function(ctx, x, y, dir, SC){
  const rot = {N:0,S:Math.PI,E:Math.PI/2,V:-Math.PI/2,
    NE:Math.PI/4,NV:-Math.PI/4,SE:Math.PI*3/4,SV:-Math.PI*3/4}[dir]||0;
  ctx.save(); ctx.translate(x,y); ctx.rotate(rot);
  const r = 16;
  // Cerc exterior
  ctx.fillStyle='#FFFFFF'; ctx.strokeStyle='#334155'; ctx.lineWidth=1.2;
  ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fill(); ctx.stroke();
  // Semicerc N (rosu)
  ctx.fillStyle='#DC2626';
  ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,r-2,-Math.PI/2,Math.PI/2,false); ctx.closePath(); ctx.fill();
  // Semicerc S (gri)
  ctx.fillStyle='#9CA3AF';
  ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,r-2,Math.PI/2,-Math.PI/2,false); ctx.closePath(); ctx.fill();
  // Linie centrală
  ctx.strokeStyle='#FFFFFF'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(0,-r+1); ctx.lineTo(0,r-1); ctx.stroke();
  ctx.restore();
  // "N"
  ctx.fillStyle='#DC2626'; ctx.font='bold 11px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign='center'; ctx.fillText('N', x, y-r-4); ctx.textAlign='left';
};

// ═══════════════════════════════════════════════════════════════════════════
// SCARĂ GRAFICĂ profesională
// ═══════════════════════════════════════════════════════════════════════════
window._rvDrawScalePro = function(ctx, x, y, SC){
  const m1 = SC, m5 = SC*5;
  const h = 5;
  // Bara scară alternată alb/negru
  ctx.fillStyle='#1A1A2E'; ctx.fillRect(x, y-h, m5/2, h);
  ctx.fillStyle='#FFFFFF'; ctx.strokeStyle='#1A1A2E'; ctx.lineWidth=0.8;
  ctx.fillRect(x+m5/2, y-h, m5/2, h); ctx.strokeRect(x, y-h, m5, h);
  // Ticks
  [0, m5/2, m5].forEach((tx, i)=>{
    ctx.strokeStyle='#1A1A2E'; ctx.lineWidth=0.8;
    ctx.beginPath(); ctx.moveTo(x+tx, y-h-3); ctx.lineTo(x+tx, y-h); ctx.stroke();
    ctx.fillStyle='#1A1A2E'; ctx.font='8px "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign='center'; ctx.fillText(i===0?'0':i===1?'2.5m':'5m', x+tx, y+10);
  });
  const scaleLabel = 'Sc. 1:' + Math.round(100/SC*100);
  ctx.font='bold 9px "Helvetica Neue", Arial, sans-serif';
  ctx.fillStyle='#334155'; ctx.fillText(scaleLabel, x+m5+8, y);
  ctx.textAlign='left';
};

// ═══════════════════════════════════════════════════════════════════════════
// LEGENDĂ
// ═══════════════════════════════════════════════════════════════════════════
window._rvDrawLegend = function(ctx, lx, ly, fl){
  const items = [
    {col:'#1A1A2E', label:'Pereți portanți', fill:true, hatch:true},
    {col:'#2C3E60', label:'Goluri (uși, ferestre)', fill:false},
    {col:'#16A34A', label:'Scări', fill:false},
    {col:'#1D4ED8', label:'Lift', fill:false},
  ];
  // Tipurile de camere unice din plan curent
  const usedTypes = [...new Set((fl?.rects||[]).map(r=>r.t))].slice(0,6);

  const allItems = [...items, ...usedTypes.map(t=>({
    type:t, label:_rc(t).name, fill:true, col:_rc(t).stroke, fillCol:_rc(t).fill
  }))];

  const lw2=130, itemH=14, lh2=allItems.length*itemH+24;
  lx = Math.max(10, lx);

  ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.strokeStyle='#CBD5E1'; ctx.lineWidth=0.8;
  ctx.fillRect(lx, ly, lw2, lh2); ctx.strokeRect(lx, ly, lw2, lh2);
  ctx.fillStyle='#1E293B'; ctx.font='bold 9px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('LEGENDĂ', lx+6, ly+12);
  ctx.strokeStyle='#CBD5E1'; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(lx,ly+16); ctx.lineTo(lx+lw2,ly+16); ctx.stroke();

  allItems.forEach((item, i)=>{
    const iy = ly+18+i*itemH+itemH/2;
    const bx = lx+6, bw2=12, bh2=9;
    if(item.fillCol){
      ctx.fillStyle=item.fillCol; ctx.fillRect(bx, iy-bh2/2, bw2, bh2);
      ctx.strokeStyle=item.col; ctx.lineWidth=0.8; ctx.strokeRect(bx, iy-bh2/2, bw2, bh2);
    } else if(item.hatch){
      ctx.fillStyle='#E5E7EB'; ctx.fillRect(bx, iy-bh2/2, bw2, bh2);
      _hatch(ctx, bx, iy-bh2/2, bw2, bh2, 'rgba(0,0,50,0.6)', 3);
      ctx.strokeStyle=item.col; ctx.lineWidth=0.8; ctx.strokeRect(bx, iy-bh2/2, bw2, bh2);
    } else {
      ctx.fillStyle='#F8FAFF'; ctx.fillRect(bx, iy-bh2/2, bw2, bh2);
      ctx.strokeStyle=item.col; ctx.lineWidth=1.2; ctx.strokeRect(bx, iy-bh2/2, bw2, bh2);
    }
    ctx.fillStyle='#334155'; ctx.font='8.5px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(item.label, bx+bw2+5, iy+3);
  });
};

// ═══════════════════════════════════════════════════════════════════════════
// CARTUȘ profesional
// ═══════════════════════════════════════════════════════════════════════════
window._rvDrawCartusPro = function(ctx, W, H, P, floorIdx, subtitle){
  const cW=260, cH=55, cx=W-cW-8, cy=H-cH-6;
  // Fundal
  ctx.fillStyle='#FFFFFF'; ctx.strokeStyle='#334155'; ctx.lineWidth=1;
  ctx.fillRect(cx, cy, cW, cH); ctx.strokeRect(cx, cy, cW, cH);
  // Header cartuș
  ctx.fillStyle='#1E293B'; ctx.fillRect(cx, cy, cW, 12);
  ctx.fillStyle='#F59E0B'; ctx.font='bold 8px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(' UrbanX TSS·FG  ·  Document orientativ  ·  ' + new Date().toLocaleDateString('ro-RO'), cx+4, cy+8.5);
  // Separator
  ctx.strokeStyle='#CBD5E1'; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(cx+80,cy+12); ctx.lineTo(cx+80,cy+cH); ctx.stroke();
  // Logo
  ctx.fillStyle='#F59E0B'; ctx.fillRect(cx+2, cy+14, 74, 38);
  ctx.fillStyle='#1E293B'; ctx.font='bold 18px "Helvetica Neue", Arial, sans-serif'; ctx.textAlign='center';
  ctx.fillText('UX', cx+39, cy+37); ctx.textAlign='left';
  // Date
  ctx.fillStyle='#1E293B'; ctx.font='8px "Helvetica Neue", Arial, sans-serif';
  const ln1=`Nr.cad: ${P.nrCad||'—'}  ·  UTR: ${P.utr||'—'}`;
  const ln2=`${P.W||'—'}m × ${P.D||'—'}m  ·  ${P.niv||'—'}niv.  ·  H=${((P.niv||1)*(P.hn||3)).toFixed(1)}m`;
  const ln3=`POT=${Math.round((P.pot||0.4)*100)}%  CUT=${(P.cut||1.2)}  ${subtitle||floorIdx===0?'PARTER':`ETAJ ${floorIdx||''}`}`;
  const ln4=`POT=${Math.round((P.pot||0.4)*100)}%  Sc. 1:${Math.round(100/_RV.scale*100)}`;
  [ln1,ln2,ln3].forEach((ln,i)=>ctx.fillText(ln, cx+84, cy+20+i*10));
  ctx.strokeStyle='#E5E7EB'; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(cx,cy+cH-13); ctx.lineTo(cx+cW,cy+cH-13); ctx.stroke();
  ctx.fillStyle='#EF4444'; ctx.font='6.5px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('⚠ Document orientativ · necesită semnătură arhitect autorizat OAR', cx+4, cy+cH-4);
};

// ═══════════════════════════════════════════════════════════════════════════
// FAȚADE — rescriere pe fond alb
// ═══════════════════════════════════════════════════════════════════════════
window._rvRenderFacade = function(b){
  const {P, bW, bD, niv} = b;
  const Ht = niv * P.hn;
  const SC = _RV.scale * 0.85;
  const pad = 50;
  const cfg = typeof _rvGetAEDISConfig==='function' ? _rvGetAEDISConfig() : {};
  const facadeW_NS = bW*SC, facadeW_EV = bD*SC, facadeH = Ht*SC;
  const sectionH = facadeH + 90;
  const W = Math.max(facadeW_NS, facadeW_EV) + pad*2 + 140;
  const H = sectionH*4 + pad;
  const {cv, ctx} = _rvInitCanvas(W, H);

  ctx.fillStyle = _C.BG; ctx.fillRect(0, 0, W, H);

  const facades = [
    {label:'NORD (posterior)',   fW:facadeW_NS, isMain:false},
    {label:'SUD — PRINCIPAL',    fW:facadeW_NS, isMain:true},
    {label:'EST (lateral)',      fW:facadeW_EV, isMain:false},
    {label:'VEST (lateral)',     fW:facadeW_EV, isMain:false},
  ];

  facades.forEach((fac, fi)=>{
    const oy_ = pad + fi * sectionH + 30;
    const ox_ = pad;
    const fW = fac.fW, fH = facadeH;

    // Label fațadă
    ctx.fillStyle = fac.isMain?'#FEF3C7':'#F1F5F9';
    ctx.fillRect(ox_-5, oy_-25, fW+10, 22);
    ctx.strokeStyle = fac.isMain?'#D97706':'#CBD5E1'; ctx.lineWidth=1;
    ctx.strokeRect(ox_-5, oy_-25, fW+10, 22);
    ctx.fillStyle = fac.isMain?'#92400E':'#334155';
    ctx.font = `bold ${fac.isMain?11:10}px "Helvetica Neue", Arial, sans-serif`;
    ctx.fillText('FAȚADĂ ' + fac.label, ox_, oy_-9);

    // Fundal clădire
    ctx.fillStyle = '#F8F9FA';
    ctx.fillRect(ox_, oy_, fW, fH);
    ctx.strokeStyle = '#1A1A2E'; ctx.lineWidth = 3;
    ctx.strokeRect(ox_, oy_, fW, fH);

    // Planșee inter-etaj (linii orizontale)
    for(let i=1; i<niv; i++){
      const ly_ = oy_ + fH - i*P.hn*SC;
      ctx.fillStyle = '#E2E8F0'; ctx.fillRect(ox_, ly_-2, fW, 4);
      ctx.strokeStyle = '#94A3B8'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(ox_, ly_); ctx.lineTo(ox_+fW, ly_); ctx.stroke();
      // Etichete etaj
      ctx.fillStyle = '#64748B'; ctx.font = '8px "Helvetica Neue", Arial, sans-serif';
      ctx.textAlign='right';
      ctx.fillText(`E${i}`, ox_-5, ly_+4);
      ctx.fillStyle = '#334155'; ctx.font = '7px "Helvetica Neue", Arial, sans-serif';
      ctx.fillText(`+${(i*P.hn).toFixed(2)}m`, ox_-5, ly_+12);
      ctx.textAlign='left';
    }

    // Ferestre pe fațadă
    const wCols = Math.max(3, Math.floor(fW/(SC*3.2)));
    const wW = Math.min(fW/wCols*0.58, 1.9*SC);
    const wH = P.hn*0.44*SC;
    const colSp_ = fW/wCols;
    const coreCol_ = Math.floor(wCols/2);
    for(let row=0; row<niv; row++){
      const wy_ = oy_ + fH - (row+1)*P.hn*SC + (P.hn*SC-wH)*0.25;
      for(let col=0; col<wCols; col++){
        if(col===coreCol_){
          // Core scări
          ctx.fillStyle='rgba(37,99,235,0.12)';
          ctx.fillRect(ox_+col*colSp_+(colSp_-wW*0.45)/2, wy_, wW*0.45, wH);
          ctx.strokeStyle='rgba(59,130,246,0.5)'; ctx.lineWidth=0.8;
          ctx.strokeRect(ox_+col*colSp_+(colSp_-wW*0.45)/2, wy_, wW*0.45, wH);
          continue;
        }
        const wx2 = ox_ + col*colSp_ + (colSp_-wW)/2;
        // Geam
        ctx.fillStyle = fac.isMain?'rgba(56,189,248,0.35)':'rgba(56,189,248,0.18)';
        ctx.fillRect(wx2, wy_, wW, wH);
        ctx.strokeStyle = '#38BDF8'; ctx.lineWidth = 1.5;
        ctx.strokeRect(wx2, wy_, wW, wH);
        // Cercevele
        ctx.strokeStyle='rgba(30,120,200,0.5)'; ctx.lineWidth=0.6;
        ctx.beginPath(); ctx.moveTo(wx2+wW/2, wy_); ctx.lineTo(wx2+wW/2, wy_+wH); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(wx2, wy_+wH/2); ctx.lineTo(wx2+wW, wy_+wH/2); ctx.stroke();
        // Pervaz
        ctx.fillStyle='#E2E8F0'; ctx.fillRect(wx2-2, wy_+wH, wW+4, 3);
        ctx.strokeStyle='#94A3B8'; ctx.strokeRect(wx2-2, wy_+wH, wW+4, 3);
      }
    }

    // Balcoane
    if(cfg.balconAdancime>0||bW>8){
      for(let row=1; row<niv; row++){
        const bz_ = oy_ + fH - row*P.hn*SC - 4;
        ctx.fillStyle='rgba(248,250,252,0.8)'; ctx.fillRect(ox_+8, bz_, fW-16, 6);
        ctx.strokeStyle='#64748B'; ctx.lineWidth=1; ctx.strokeRect(ox_+8, bz_, fW-16, 6);
        // Balustradă
        ctx.strokeStyle='rgba(148,163,184,0.6)'; ctx.lineWidth=0.5;
        for(let bx_=ox_+12; bx_<ox_+fW-12; bx_+=8){
          ctx.beginPath(); ctx.moveTo(bx_, bz_); ctx.lineTo(bx_, bz_-8); ctx.stroke();
        }
        ctx.strokeStyle='#94A3B8'; ctx.lineWidth=0.8;
        ctx.beginPath(); ctx.moveTo(ox_+8, bz_-8); ctx.lineTo(ox_+fW-8, bz_-8); ctx.stroke();
      }
    }

    // Intrare principală (numai fațada principală)
    if(fac.isMain){
      const dw_ = Math.min(fW*0.12, 1.5*SC);
      const dx_ = ox_ + fW/2 - dw_/2;
      const dy_ = oy_ + fH - 4;
      ctx.fillStyle='#FEF3C7'; ctx.fillRect(dx_-2, dy_-P.hn*SC*0.55, dw_+4, P.hn*SC*0.55);
      ctx.strokeStyle='#D97706'; ctx.lineWidth=1.5;
      ctx.strokeRect(dx_-2, dy_-P.hn*SC*0.55, dw_+4, P.hn*SC*0.55);
      ctx.fillStyle='#92400E'; ctx.font='7px "Helvetica Neue", Arial, sans-serif'; ctx.textAlign='center';
      ctx.fillText('INTRARE', ox_+fW/2, dy_-P.hn*SC*0.58-2); ctx.textAlign='left';
    }

    // Soclu + sol
    ctx.fillStyle='#CBD5E1'; ctx.fillRect(ox_-5, oy_+fH, fW+10, 5);
    ctx.strokeStyle='#94A3B8'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(ox_-15, oy_+fH); ctx.lineTo(ox_+fW+30, oy_+fH); ctx.stroke();
    ctx.fillStyle='#94A3B8'; ctx.font='8px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('±0.00 (CTN)', ox_, oy_+fH+16);

    // Cotă H total
    ctx.strokeStyle=_C.DIM; ctx.fillStyle=_C.DIM; ctx.lineWidth=0.9;
    const hx_ = ox_+fW+20;
    ctx.setLineDash([2,2]);
    ctx.beginPath(); ctx.moveTo(ox_+fW, oy_); ctx.lineTo(hx_+3, oy_); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox_+fW, oy_+fH); ctx.lineTo(hx_+3, oy_+fH); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(hx_, oy_); ctx.lineTo(hx_, oy_+fH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(hx_-4, oy_); ctx.lineTo(hx_+4, oy_); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(hx_-4, oy_+fH); ctx.lineTo(hx_+4, oy_+fH); ctx.stroke();
    ctx.save(); ctx.translate(hx_+12, (oy_+oy_+fH)/2); ctx.rotate(-Math.PI/2);
    ctx.font='bold 10px "Helvetica Neue", Arial, sans-serif'; ctx.textAlign='center';
    ctx.fillText(`H=${Ht.toFixed(2)}m`, 0, 0); ctx.textAlign='left'; ctx.restore();
  });

  _rvDrawNorthPro(ctx, W-44, 44, P.frontDir, SC);
  _rvDrawCartusPro(ctx, W, H, P, null, 'TOATE FAȚADELE · N · S · E · V');
};

// ── Override _rvDrawDims (fallback pentru compatibilitate) ─────────────────
window._rvDrawDims = function(ctx,ox,oy,pw,ph,bW,bD,P,SC){
  _rvDrawDimsPro(ctx,ox,oy,pw,ph,bW,bD,P,SC);
};
window._rvDrawNorth   = function(ctx,x,y,dir){ _rvDrawNorthPro(ctx,x,y,dir,_RV.scale); };
window._rvDrawScale   = function(ctx,x,y,SC){ _rvDrawScalePro(ctx,x,y,SC); };
window._rvDrawCartus  = function(ctx,W,H,P,fi,sub){ _rvDrawCartusPro(ctx,W,H,P,fi,sub); };

// ── Override _rvRenderSection — temă albă profesională ────────────────────
// Original uses dark #060C1A background — înlocuim cu fond alb
window._rvRenderSection = function(b){
  if(!b || !b.P){
    const cv=document.getElementById('rv-canvas');
    if(cv){ const ctx=cv.getContext('2d');if(ctx){ctx.fillStyle=_C.BG;ctx.fillRect(0,0,cv.width,cv.height);} }
    return;
  }
  const {P,bW,bD,niv}=b;
  const sectionType=_RV.sectionType||'AA';
  const cutDim = sectionType==='AA' ? bD : bW;
  const SC=_RV.scale*0.85;
  const pad=50;
  const W=cutDim*SC+pad*2+160;
  const H=niv*P.hn*SC+pad*2+80;
  const {cv,ctx}=_rvInitCanvas(W+120, H+50);
  if(!ctx) return;

  // Fond alb
  ctx.fillStyle=_C.BG; ctx.fillRect(0,0,W+120,H+50);

  // Grid
  ctx.strokeStyle=_C.GRID; ctx.lineWidth=0.4;
  const gs=Math.max(SC,8);
  ctx.beginPath();
  for(let x_=0;x_<W+120;x_+=gs){ctx.moveTo(x_,0);ctx.lineTo(x_,H+50);}
  for(let y_=0;y_<H+50;y_+=gs){ctx.moveTo(0,y_);ctx.lineTo(W+120,y_);}
  ctx.stroke();

  const ox=pad; const oy=pad;
  const EW=Math.max(4,SC*0.28);
  const Ht=niv*P.hn;

  // Teren
  ctx.fillStyle='#E8F4E8';
  ctx.fillRect(ox-20, oy+Ht*SC, cutDim*SC+40, 18);
  ctx.fillStyle='#6B7280'; ctx.font='9px "Helvetica Neue",Arial,sans-serif';
  ctx.fillText('TEREN',ox,oy+Ht*SC+13);

  // Secțiunea clădirii
  ctx.fillStyle='#F8F9FA';
  ctx.fillRect(ox,oy,cutDim*SC,Ht*SC);
  ctx.strokeStyle=_C.WALL_EXT; ctx.lineWidth=EW;
  ctx.strokeRect(ox+EW/2,oy+EW/2,cutDim*SC-EW,Ht*SC-EW);

  // Planșee per etaj
  for(let i=1;i<niv;i++){
    const ly_=oy+Ht*SC-i*P.hn*SC;
    ctx.fillStyle='#CBD5E1'; ctx.fillRect(ox,ly_-2,cutDim*SC,4);
    ctx.strokeStyle='#94A3B8'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(ox,ly_); ctx.lineTo(ox+cutDim*SC,ly_); ctx.stroke();
    // Cota etaj
    ctx.fillStyle='#334155'; ctx.font='bold 9px "Helvetica Neue",Arial,sans-serif';
    ctx.textAlign='right';
    ctx.fillText(`E${i} +${(i*P.hn).toFixed(2)}m`, ox-5, ly_+4);
    ctx.textAlign='left';
  }

  // Cota totală
  const hatchCol='rgba(0,0,50,0.4)';
  _hatch(ctx,ox,oy,EW*1.5,Ht*SC,hatchCol,Math.max(3,SC*0.22));
  _hatch(ctx,ox+cutDim*SC-EW*1.5,oy,EW*1.5,Ht*SC,hatchCol,Math.max(3,SC*0.22));
  ctx.strokeStyle=_C.WALL_EXT; ctx.lineWidth=EW;
  ctx.strokeRect(ox+EW/2,oy+EW/2,cutDim*SC-EW,Ht*SC-EW);

  // Linie cota H total
  const hx=ox+cutDim*SC+20;
  ctx.strokeStyle=_C.DIM; ctx.lineWidth=0.8; ctx.setLineDash([3,2]);
  ctx.beginPath(); ctx.moveTo(ox+cutDim*SC,oy); ctx.lineTo(hx+4,oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox+cutDim*SC,oy+Ht*SC); ctx.lineTo(hx+4,oy+Ht*SC); ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(hx,oy); ctx.lineTo(hx,oy+Ht*SC); ctx.stroke();
  // Săgeți
  ctx.beginPath(); ctx.moveTo(hx-4,oy); ctx.lineTo(hx+4,oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hx-4,oy+Ht*SC); ctx.lineTo(hx+4,oy+Ht*SC); ctx.stroke();
  ctx.save(); ctx.translate(hx+13,(oy+oy+Ht*SC)/2); ctx.rotate(-Math.PI/2);
  ctx.font='bold 10px "Helvetica Neue",Arial,sans-serif'; ctx.textAlign='center';
  ctx.fillStyle=_C.DIM;
  ctx.fillText(`H total = ${Ht.toFixed(2)} m`, 0, 0);
  ctx.textAlign='left'; ctx.restore();

  // Label secțiune
  ctx.fillStyle=_C.TEXT; ctx.font='bold 11px "Helvetica Neue",Arial,sans-serif';
  ctx.fillText(`SECȚIUNE ${sectionType} — ${sectionType==='AA'?'TRANSVERSALĂ':'LONGITUDINALĂ'}  ·  ${niv} niveluri  ·  H=${Ht.toFixed(2)}m`, ox, oy-10);

  _rvDrawNorthPro(ctx, W+80, 40, P.frontDir, SC);
  _rvDrawCartusPro(ctx, W+120, H+50, P, null, `SECȚIUNE ${sectionType}`);
};

// ── DPR — suport retina / high-DPI ────────────────────────────────────────
window._rvDPR = function(){ return Math.min(window.devicePixelRatio || 1, 3); };

// FIX: patch-ul original verifica origInit._dprPatched (pe funcție) dar seta
// result._dprPatched (pe obiectul returnat) — nu funcționa niciodată.
// Simplu: nu mai e nevoie de patch suplimentar — _rvInitCanvas din 15-relevee.js
// gestionează DPR-ul corect după fix-ul OOM.
window._rvInitCanvas_upgraded = true; // marker că upgrade-ul e activ

// ── Pinch-to-zoom Canvas (touch) ───────────────────────────────────────────
(function(){
  let _lastPinchDist = 0;
  function _onTouchStart(e){
    if(e.touches.length === 2)
      _lastPinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY);
  }
  function _onTouchMove(e){
    if(e.touches.length !== 2) return;
    e.preventDefault();
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY);
    const delta = dist - _lastPinchDist;
    if(Math.abs(delta) > 2){
      _lastPinchDist = dist;
      const newSC = Math.max(4, Math.min(48, (_RV?.scale||12) + (delta>0?1.5:-1.5)));
      if(_RV) _RV.scale = newSC;
      const zval = document.getElementById('rv-zval');
      if(zval) zval.textContent = Math.round(newSC/12*100)+'%';
      if(typeof _rvRender==='function' && _RV?.building) _rvRender();
    }
  }
  // Atașăm listener la canvas când devine disponibil
  function _attachPinch(){
    const cv = document.getElementById('rv-canvas');
    if(!cv || cv._pinchBound) return;
    cv._pinchBound = true;
    cv.addEventListener('touchstart', _onTouchStart, {passive:true});
    cv.addEventListener('touchmove', _onTouchMove, {passive:false});
  }
  // Observăm DOM pentru când canvas-ul devine disponibil
  const obs = new MutationObserver(()=>_attachPinch());
  obs.observe(document.body, {childList:true, subtree:true});
  setTimeout(_attachPinch, 2000);
  window._rvAttachPinchZoom = _attachPinch;
})();

// ── Re-randare după încărcare ─────────────────────────────────────────────
setTimeout(()=>{
  if(typeof _rvRender==='function' && _RV?.building) _rvRender();
  console.log('[Canvas Upgrade] ✅ Motor randat profesional — fond alb, hașuri, cote, mobilier, DPR, pinch-zoom');
}, 500);

})(); // IIFE end
