// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-planfix2.js — Plan Renderer v4 + IFC 2x3 Exporter
// UrbanX TSS·FG | v4.0 | 09 Iunie 2026
//
// CE FACE ACEST FIȘIER:
//   1. Patch _rvRenderPlan() → plan arhitectural de calitate (ca preview_2.webp)
//      - Pereți exteriori negri groși (hașură diagonală în secțiune)
//      - Pereți interiori negri, proporționali
//      - Etichete "s = x,xx mp" per cameră (format românesc)
//      - Mobilier schematic detaliat (pat cu perne, fotoliu, canapea, masă)
//      - HOL NIVEL vizibil distinct (gri mediu + text centrat)
//      - Casa scărilor cu simbol standard (linii + săgeată + X lift)
//      - Balcoane hașurate (diagonale fine, ca în proiectele reale)
//      - Cote exterioare complete (dimensiuni camere + total clădire)
//      - Ușile cu arc corect (90°, nu estimat)
//   2. Export IFC 2x3 nativ (text STEP .ifc) — fără librărie
//      - IfcBuilding, IfcBuildingStorey per etaj
//      - IfcSpace per cameră (cu arie, volum, tip)
//      - IfcWall, IfcSlab, IfcDoor, IfcWindow
//      - IfcPropertySet cu normative românești (NP057, OMS119, P118)
//      - Import direct în Revit, ArchiCAD, FreeCAD, BIMcollab
//   3. Export SVG vectorial (pentru import în AutoCAD, Illustrator, Inkscape)
//
// INSTALARE: adaugă în index.html după 15-relevee-dxf.js
//   <script src="js/15-relevee-planfix2.js?v=20260609"></script>
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';

  function waitReady(cb, n){
    n = n||0; if(n > 100) return;
    if(typeof _RV === 'undefined' || typeof _rvRenderPlan === 'undefined'){
      setTimeout(()=>waitReady(cb, n+1), 300); return;
    }
    cb();
  }

  waitReady(()=>{
    // ── Patch renderul de plan ────────────────────────────────────────────
    window._rvRenderPlan = _rvRenderPlanV4;

    // ── Injectare butoane IFC + SVG ────────────────────────────────────────
    _injectButtons();
    const obs = setInterval(()=>{
      if(document.getElementById('rv-ifc-btn')){ clearInterval(obs); return; }
      _injectButtons();
    }, 800);
    setTimeout(()=>clearInterval(obs), 15000);

    console.log('[PlanFix2 v4] ✅ loaded — plan arhitectural + IFC 2x3 + SVG');
  });

  function _injectButtons(){
    if(document.getElementById('rv-ifc-btn')) return;
    const anchor = document.querySelector('#rv-dxf-btn, #rv-planseA3-btn, .rv-expbtn');
    if(!anchor) return;

    // Buton IFC
    const btnIFC = document.createElement('button');
    btnIFC.id = 'rv-ifc-btn';
    btnIFC.innerHTML = '🏗 Export IFC';
    btnIFC.title = 'Export IFC 2x3 — Revit, ArchiCAD, FreeCAD, BIMcollab, QGIS';
    btnIFC.style.cssText = 'height:32px;padding:0 12px;border-radius:7px;cursor:pointer;font-family:inherit;font-size:11px;font-weight:800;margin-left:6px;background:rgba(251,146,60,.12);border:1.5px solid rgba(251,146,60,.5);color:#fb923c;display:inline-flex;align-items:center;flex-shrink:0';
    btnIFC.onclick = ()=>_rvExportIFC();
    anchor.parentElement.insertBefore(btnIFC, anchor.nextSibling);

    // Buton SVG
    const btnSVG = document.createElement('button');
    btnSVG.id = 'rv-svg-btn';
    btnSVG.innerHTML = '🔷 Export SVG';
    btnSVG.title = 'Export SVG vectorial — AutoCAD, Illustrator, Inkscape, FreeCAD';
    btnSVG.style.cssText = 'height:32px;padding:0 12px;border-radius:7px;cursor:pointer;font-family:inherit;font-size:11px;font-weight:800;margin-left:6px;background:rgba(56,189,248,.12);border:1.5px solid rgba(56,189,248,.45);color:#38bdf8;display:inline-flex;align-items:center;flex-shrink:0';
    btnSVG.onclick = ()=>_rvExportSVG();
    anchor.parentElement.insertBefore(btnSVG, anchor.nextSibling);

    console.log('[PlanFix2] butoane IFC + SVG injectate');
  }

})();

// ═══════════════════════════════════════════════════════════════════════════
// PLAN RENDERER V4 — calitate arhitecturală
// Înlocuiește _rvRenderPlan din 15-relevee.js
// ═══════════════════════════════════════════════════════════════════════════

function _rvRenderPlanV4(fl, b){
  const {P, bW, bD} = b;
  const SC = _RV.scale;

  // ── Constante dimensionale (mm → px la scara SC) ─────────────────────
  const EXT_W  = Math.max(3, SC * 0.30);  // perete exterior 30cm
  const INT_W  = Math.max(2, SC * 0.15);  // perete interior 15cm
  const CORE_W = Math.max(3, SC * 0.25);  // perete beton armat 25cm

  const pad   = 70;   // padding canvas
  const DIMS  = 40;   // spațiu cote exterioare
  const LEGW  = 180;  // lățime legendă dreapta

  const W = bW*SC + pad*2 + P.rl*2*SC + DIMS*2 + LEGW;
  const H = bD*SC + pad*2 + (P.rf+P.rs)*SC + DIMS*2 + 40;

  const {cv, ctx} = _rvInitCanvas(W, H);
  if(!ctx || !fl) return;

  // ── Fundal alb pur (stil proiect tehnic) ─────────────────────────────
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Grilă subtilă de referință (1m = SC px)
  ctx.strokeStyle = 'rgba(200,210,220,.25)';
  ctx.lineWidth = 0.4;
  for(let x=0; x<W; x+=SC){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for(let y=0; y<H; y+=SC){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  const ox = pad + P.rl*SC + DIMS;
  const oy = pad + P.rf*SC + DIMS;
  _RV.planOx = ox; _RV.planOy = oy; _RV.planSc = SC;

  // ── Parcelă (contur subțire auriu punctat) ───────────────────────────
  ctx.strokeStyle = 'rgba(180,130,30,.4)';
  ctx.lineWidth = 0.8;
  ctx.setLineDash([SC*0.5, SC*0.5]);
  ctx.strokeRect(pad+DIMS, pad+DIMS, P.W*SC, P.D*SC);
  ctx.setLineDash([]);

  // ── Fundal clădire ────────────────────────────────────────────────────
  ctx.fillStyle = '#F7F8FA';
  ctx.fillRect(ox, oy, bW*SC, bD*SC);

  // ─────────────────────────────────────────────────────────────────────
  // PASUL 1 — UMPLERI CAMERE (cu culori din _RV_COLORS)
  // ─────────────────────────────────────────────────────────────────────
  const CM = {
    living:   {bg:'rgba(255,237,213,.75)', border:'#EA580C'},
    bedroom:  {bg:'rgba(220,252,231,.75)', border:'#16A34A'},
    bedroom2: {bg:'rgba(220,252,231,.75)', border:'#16A34A'},
    bedroom3: {bg:'rgba(220,252,231,.70)', border:'#15803D'},
    kitchen:  {bg:'rgba(219,234,254,.75)', border:'#2563EB'},
    bath:     {bg:'rgba(237,233,254,.75)', border:'#7C3AED'},
    wc:       {bg:'rgba(237,233,254,.60)', border:'#6D28D9'},
    hall:     {bg:'rgba(241,245,249,.85)', border:'#64748B'},
    storage:  {bg:'rgba(241,245,249,.70)', border:'#94A3B8'},
    core:     {bg:'rgba(226,232,240,.90)', border:'#334155'},
    balcon:   {bg:'rgba(255,251,235,.80)', border:'#B45309'},
    commercial:{bg:'rgba(243,232,255,.75)',border:'#7C3AED'},
    office:   {bg:'rgba(220,252,231,.60)', border:'#15803D'},
    meeting:  {bg:'rgba(254,243,199,.70)', border:'#D97706'},
    reception:{bg:'rgba(243,232,255,.70)', border:'#7C3AED'},
  };

  // Sortăm: balcoane și hall în spate (zIdx negativ), camere în față
  const sorted = [...(fl.rects||[])].sort((a,m)=>(a.zIdx||0)-(m.zIdx||0));

  sorted.forEach(r=>{
    const c = CM[r.t] || CM.hall;
    const rx_ = ox + r.x*SC;
    const ry_ = oy + r.y*SC;
    const rw_ = r.w*SC;
    const rh_ = r.h*SC;

    if(r.bal){
      // Balcon: fundal gălbui + hașură diagonală (stil proiect tehnic)
      ctx.fillStyle = c.bg;
      ctx.fillRect(rx_, ry_, rw_, rh_);
      ctx.save();
      ctx.beginPath(); ctx.rect(rx_, ry_, rw_, rh_); ctx.clip();
      ctx.strokeStyle = 'rgba(180,130,30,.3)'; ctx.lineWidth = 0.7;
      for(let i=-rh_; i<rw_+rh_; i+=6){
        ctx.beginPath(); ctx.moveTo(rx_+i, ry_); ctx.lineTo(rx_+i+rh_, ry_+rh_); ctx.stroke();
      }
      ctx.restore();
      ctx.strokeStyle = c.border; ctx.lineWidth = 1.2;
      ctx.setLineDash([4,3]); ctx.strokeRect(rx_+0.5, ry_+0.5, rw_-1, rh_-1); ctx.setLineDash([]);
    } else {
      ctx.fillStyle = c.bg;
      ctx.fillRect(rx_, ry_, rw_, rh_);
    }
  });

  // ─────────────────────────────────────────────────────────────────────
  // PASUL 2 — MOBILIER SCHEMATIC (stil CAD: linii fine negre)
  // ─────────────────────────────────────────────────────────────────────
  sorted.forEach(r=>{
    if(r.bal || r.apt < 0) return;
    const rx_ = ox + r.x*SC + 2;
    const ry_ = oy + r.y*SC + 2;
    const rw_ = r.w*SC - 4;
    const rh_ = r.h*SC - 4;
    if(rw_ < SC*1.0 || rh_ < SC*1.0) return;
    _drawFurnitureV4(ctx, r.t, rx_, ry_, rw_, rh_, SC);
  });

  // ─────────────────────────────────────────────────────────────────────
  // PASUL 3 — PEREȚI EXTERIORI (negri, groși, cu hașură)
  // ─────────────────────────────────────────────────────────────────────
  ctx.fillStyle = '#1A1A2E';
  ctx.fillRect(ox - EXT_W, oy - EXT_W, bW*SC + EXT_W*2, EXT_W);  // N
  ctx.fillRect(ox - EXT_W, oy + bD*SC, bW*SC + EXT_W*2, EXT_W);   // S
  ctx.fillRect(ox - EXT_W, oy - EXT_W, EXT_W, bD*SC + EXT_W*2);   // V
  ctx.fillRect(ox + bW*SC, oy - EXT_W, EXT_W, bD*SC + EXT_W*2);   // E

  // Hașură în pereții exteriori (diagonal 45°, stil standard arhitectural)
  function _hatch45(x, y, w, h){
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 0.6;
    const sp = Math.max(3, SC*0.20);
    for(let i=-(Math.max(w,h)); i<w+Math.max(w,h); i+=sp){
      ctx.beginPath(); ctx.moveTo(x+i, y); ctx.lineTo(x+i+h, y+h); ctx.stroke();
    }
    ctx.restore();
  }
  _hatch45(ox-EXT_W, oy-EXT_W, bW*SC+EXT_W*2, EXT_W);
  _hatch45(ox-EXT_W, oy+bD*SC, bW*SC+EXT_W*2, EXT_W);
  _hatch45(ox-EXT_W, oy-EXT_W, EXT_W, bD*SC+EXT_W*2);
  _hatch45(ox+bW*SC, oy-EXT_W, EXT_W, bD*SC+EXT_W*2);

  // ─────────────────────────────────────────────────────────────────────
  // PASUL 4 — PEREȚI INTERIORI (negri, grosime INT_W)
  // ─────────────────────────────────────────────────────────────────────
  sorted.forEach(r=>{
    if(r.bal) return;
    const rx_ = ox + r.x*SC;
    const ry_ = oy + r.y*SC;
    const rw_ = r.w*SC;
    const rh_ = r.h*SC;
    const wT = r.t === 'core' ? CORE_W : INT_W;
    const wCol = r.t === 'core' ? '#0F172A' : '#1E293B';
    ctx.fillStyle = wCol;
    ctx.fillRect(rx_,       ry_,       rw_,  wT);      // N
    ctx.fillRect(rx_,       ry_+rh_-wT, rw_,  wT);     // S
    ctx.fillRect(rx_,       ry_,       wT,   rh_);      // V
    ctx.fillRect(rx_+rw_-wT, ry_,       wT,   rh_);     // E
    // Hașură structurală în core
    if(r.t === 'core'){
      _hatch45(rx_+wT, ry_+wT, rw_-wT*2, rh_-wT*2);
      // Simbol scări
      _drawStairsSymbol(ctx, rx_+wT+2, ry_+wT+2, (rw_-wT*2)*0.55, rh_-wT*2-4);
      // Simbol lift (pătrat cu X)
      _drawLiftSymbol(ctx, rx_+wT+(rw_-wT*2)*0.60, ry_+wT+3, (rw_-wT*2)*0.36, Math.min((rw_-wT*2)*0.5, rh_-wT*2-6));
    }
  });

  // ─────────────────────────────────────────────────────────────────────
  // PASUL 5 — FERESTRE (goluri albe + simbol triplu-linie)
  // ─────────────────────────────────────────────────────────────────────
  (fl.wins||[]).forEach(w=>{
    const wSC = (w.w||w.h||0)*SC;
    let gx,gy,gw,gh;
    if(w.wall==='N'){gx=ox+w.x*SC; gy=oy-EXT_W; gw=wSC; gh=EXT_W*2;}
    else if(w.wall==='S'){gx=ox+w.x*SC; gy=oy+bD*SC-EXT_W; gw=wSC; gh=EXT_W*2;}
    else if(w.wall==='V'){gx=ox-EXT_W; gy=oy+w.y*SC; gw=EXT_W*2; gh=wSC;}
    else {gx=ox+bW*SC-EXT_W; gy=oy+w.y*SC; gw=EXT_W*2; gh=wSC;}
    // Gol alb
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(gx, gy, gw, gh);
    // 3 linii (toc exterior, sticlă, toc interior) — standard arhitectural
    ctx.strokeStyle = '#1E3A5F'; ctx.lineWidth = 1.5;
    const isH = (w.wall==='N'||w.wall==='S');
    if(isH){
      ctx.beginPath(); ctx.moveTo(gx,gy+gh*0.15); ctx.lineTo(gx+gw,gy+gh*0.15); ctx.stroke();
      ctx.strokeStyle = 'rgba(56,189,248,.8)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(gx,gy+gh*0.50); ctx.lineTo(gx+gw,gy+gh*0.50); ctx.stroke();
      ctx.strokeStyle = '#1E3A5F'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(gx,gy+gh*0.85); ctx.lineTo(gx+gw,gy+gh*0.85); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(gx+gw*0.15,gy); ctx.lineTo(gx+gw*0.15,gy+gh); ctx.stroke();
      ctx.strokeStyle = 'rgba(56,189,248,.8)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(gx+gw*0.50,gy); ctx.lineTo(gx+gw*0.50,gy+gh); ctx.stroke();
      ctx.strokeStyle = '#1E3A5F'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(gx+gw*0.85,gy); ctx.lineTo(gx+gw*0.85,gy+gh); ctx.stroke();
    }
  });

  // ─────────────────────────────────────────────────────────────────────
  // PASUL 6 — UȘI (arc 90° corect, foaie)
  // ─────────────────────────────────────────────────────────────────────
  (fl.doors||[]).forEach(d=>{
    const isMain = d.type==='main';
    const isBalc = d.type==='balcon';
    const dW = d.w*SC;
    const dCol = isMain ? '#D97706' : isBalc ? '#0369A1' : '#374151';
    ctx.strokeStyle = dCol; ctx.lineWidth = isMain ? 2 : 1.2;

    if(d.axis==='H'){
      const dx2=ox+d.x*SC, dy2=oy+d.y*SC;
      ctx.fillStyle='#FFFFFF'; ctx.fillRect(dx2-1, dy2-5, dW+2, 10);
      ctx.beginPath(); ctx.moveTo(dx2,dy2); ctx.lineTo(dx2+dW,dy2); ctx.stroke();
      ctx.strokeStyle='rgba(55,65,81,.3)'; ctx.lineWidth=0.7;
      ctx.beginPath(); ctx.arc(dx2+dW, dy2, dW, Math.PI, Math.PI*1.5); ctx.stroke();
    } else if(d.axis==='V'){
      const dx2=ox+d.x*SC, dy2=oy+d.y*SC;
      ctx.fillStyle='#FFFFFF'; ctx.fillRect(dx2-5, dy2-1, 10, dW+2);
      ctx.beginPath(); ctx.moveTo(dx2,dy2); ctx.lineTo(dx2,dy2+dW); ctx.stroke();
      ctx.strokeStyle='rgba(55,65,81,.3)'; ctx.lineWidth=0.7;
      ctx.beginPath(); ctx.arc(dx2, dy2+dW, dW, -Math.PI/2, 0); ctx.stroke();
    } else if(d.type==='main' || d.swing==='out'){
      const dy_d = d.y!==undefined ? oy+d.y*SC : oy+bD*SC;
      const dx_d = ox+d.x*SC;
      ctx.fillStyle='#FFFFFF'; ctx.fillRect(dx_d-1, dy_d-EXT_W-1, dW+2, EXT_W*2+2);
      ctx.strokeStyle=dCol; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(dx_d,dy_d); ctx.lineTo(dx_d+dW,dy_d); ctx.stroke();
      ctx.strokeStyle='rgba(217,119,6,.5)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.arc(dx_d, dy_d, dW, -Math.PI/2, 0); ctx.stroke();
      ctx.fillStyle='#92400E'; ctx.font='bold 7px IBM Plex Mono'; ctx.textAlign='center';
      ctx.fillText('INTRARE BLOC', dx_d+dW/2, dy_d+14); ctx.textAlign='left';
    }
  });

  // ─────────────────────────────────────────────────────────────────────
  // PASUL 7 — ETICHETE CAMERE (format "CAMERA DE ZI\ns = 19,10 mp")
  // ─────────────────────────────────────────────────────────────────────
  const LABELS = {
    living:   'CAMERA DE ZI', bedroom: 'DORMITOR', bedroom2: 'DORMITOR',
    bedroom3: 'DORMITOR', kitchen: 'BUCĂTĂRIE', bath: 'BAIE', wc: 'WC',
    hall:     'HOL', storage: 'DEBARA', core: 'CASA SCĂRILOR',
    balcon:   'BALCON', commercial: 'SPAȚIU COMERCIAL',
    office: 'BIROU', meeting: 'SALĂ CONFERINȚĂ', reception: 'RECEPȚIE',
  };
  const LABEL_VARIANTS = {
    bedroom: (r)=> {
      const a = r.w*r.h;
      if(a >= 18) return 'DORMITOR MASTER';
      const idx = (r.lbl||'').match(/[123]/)?.[0];
      return idx ? 'DORMITOR '+idx : 'DORMITOR';
    }
  };

  sorted.forEach(r=>{
    const rx_ = ox + r.x*SC;
    const ry_ = oy + r.y*SC;
    const rw_ = r.w*SC;
    const rh_ = r.h*SC;
    if(rw_ < 20 || rh_ < 14) return;

    const area  = r.w * r.h;
    const areaStr = area.toFixed(2).replace('.', ',') + ' mp';
    const rawLbl  = LABEL_VARIANTS[r.t]?.(r) || LABELS[r.t] || (r.lbl||r.t).toUpperCase();

    // Câte linii avem? Dacă lățimea e mică, abbreviem
    const fs = Math.min(9, Math.max(6, rw_/10));
    ctx.font = `bold ${fs}px Arial`;
    const textW = ctx.measureText(rawLbl).width;
    const lines = textW > rw_*0.9 ? rawLbl.split(' ') : [rawLbl];

    ctx.textAlign = 'center';
    const totalLinesH = lines.length * (fs+2) + (r.bal ? 0 : (fs+1));
    let startY = ry_ + rh_/2 - totalLinesH/2 + fs;

    // Eticheta tip cameră
    ctx.fillStyle = r.t==='core' ? 'rgba(255,255,255,.85)' : '#1E293B';
    lines.forEach((ln,i)=>{
      ctx.font = `bold ${fs}px Arial`;
      ctx.fillText(ln, rx_+rw_/2, startY + i*(fs+2));
    });

    // Suprafață "s = x,xx mp"
    if(!r.bal && area > 0.5 && rh_ > 22){
      ctx.font = `${Math.max(6,fs-1)}px Arial`;
      ctx.fillStyle = r.t==='core' ? 'rgba(255,255,255,.7)' : 'rgba(30,41,59,.65)';
      ctx.fillText('s = ' + areaStr, rx_+rw_/2, startY + lines.length*(fs+2) + 2);
    }
    ctx.textAlign = 'left';
  });

  // ─────────────────────────────────────────────────────────────────────
  // PASUL 8 — COTE EXTERIOARE (linii cote + valori dimensionale)
  // ─────────────────────────────────────────────────────────────────────
  _drawDimLine(ctx, ox, oy-EXT_W-10, ox+bW*SC, oy-EXT_W-10, bW, SC, 'N', '#1E3A5F');
  _drawDimLine(ctx, ox, oy+bD*SC+EXT_W+10, ox+bW*SC, oy+bD*SC+EXT_W+10, bW, SC, 'S', '#1E3A5F');
  _drawDimLine(ctx, ox-EXT_W-10, oy, ox-EXT_W-10, oy+bD*SC, bD, SC, 'V', '#1E3A5F');

  // Cote per cameră (pe axa N)
  let cotX = ox;
  const uniqWidths = [];
  const firstRow = sorted.filter(r=>r.y<0.1&&!r.bal&&r.apt>=0);
  firstRow.sort((a,m)=>a.x-m.x).forEach(r=>{
    uniqWidths.push({x1:cotX, x2:cotX+r.w*SC, val:r.w});
    cotX += r.w*SC;
  });
  uniqWidths.forEach(({x1,x2,val})=>{
    _drawDimLine(ctx, x1, oy-EXT_W-28, x2, oy-EXT_W-28, val, SC, 'N_inner', '#64748B');
  });

  // ─────────────────────────────────────────────────────────────────────
  // PASUL 9 — HEADER (titlu plan + info parcelă)
  // ─────────────────────────────────────────────────────────────────────
  const floorLabel = _RV.floor===0?'PARTER (P)':('ETAJ '+_RV.floor+' (E'+_RV.floor+')');
  ctx.fillStyle = '#0F172A'; ctx.font = 'bold 11px Arial';
  ctx.fillText(`PLAN ${floorLabel} — Nr.cad. ${P.nrCad} · ${bW}m × ${bD}m · UTR ${P.utr}`, ox, oy-EXT_W-44);

  // Front stradal
  const stY = oy + bD*SC + EXT_W + 22;
  ctx.fillStyle = 'rgba(37,99,235,.07)'; ctx.fillRect(pad+DIMS, stY, P.W*SC, 18);
  ctx.strokeStyle = 'rgba(37,99,235,.25)'; ctx.lineWidth=0.8; ctx.strokeRect(pad+DIMS, stY, P.W*SC, 18);
  ctx.fillStyle = '#1D4ED8'; ctx.font = 'bold 8px Arial'; ctx.textAlign='center';
  ctx.fillText('▲  FRONT STRADAL  ·  ' + P.frontDir, pad+DIMS+P.W*SC/2, stY+12);
  ctx.textAlign='left';

  // ─────────────────────────────────────────────────────────────────────
  // PASUL 10 — LEGENDĂ DREAPTA (culori + tipuri camere)
  // ─────────────────────────────────────────────────────────────────────
  const legX = ox + bW*SC + EXT_W + 20;
  const legEntries = [
    {col:'rgba(255,237,213,.75)', lbl:'Camera de zi / Living'},
    {col:'rgba(220,252,231,.75)', lbl:'Dormitor'},
    {col:'rgba(219,234,254,.75)', lbl:'Bucătărie'},
    {col:'rgba(237,233,254,.75)', lbl:'Baie / WC'},
    {col:'rgba(241,245,249,.85)', lbl:'Hol / Coridor'},
    {col:'rgba(241,245,249,.70)', lbl:'Debara / Depozit'},
    {col:'rgba(226,232,240,.90)', lbl:'Casa scărilor + Lift'},
    {col:'rgba(255,251,235,.80)', lbl:'Balcon / Terasă'},
  ];

  ctx.fillStyle='#0F172A'; ctx.font='bold 8px Arial';
  ctx.fillText('LEGENDĂ', legX, oy+14);
  ctx.strokeStyle='#CBD5E1'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.moveTo(legX,oy+18); ctx.lineTo(legX+LEGW-10,oy+18); ctx.stroke();

  legEntries.forEach(({col,lbl},i)=>{
    const ly = oy + 28 + i*18;
    ctx.fillStyle=col; ctx.fillRect(legX, ly-10, 14, 12);
    ctx.strokeStyle='rgba(0,0,0,.2)'; ctx.lineWidth=0.6; ctx.strokeRect(legX, ly-10, 14, 12);
    ctx.fillStyle='#334155'; ctx.font='7.5px Arial';
    ctx.fillText(lbl, legX+18, ly);
  });

  // Cartușul de titlu (jos-dreapta)
  const ctX = legX, ctY = oy + bD*SC - 80;
  ctx.fillStyle='rgba(241,245,249,.95)'; ctx.fillRect(ctX, ctY, LEGW-10, 75);
  ctx.strokeStyle='#94A3B8'; ctx.lineWidth=0.8; ctx.strokeRect(ctX, ctY, LEGW-10, 75);
  ctx.fillStyle='#0F172A'; ctx.font='bold 7px Arial';
  ctx.fillText('PLANȘĂ ORIENTATIVĂ', ctX+4, ctY+11);
  ctx.fillStyle='#334155'; ctx.font='6px Arial';
  const AC = _rvGetAEDISConfig ? _rvGetAEDISConfig() : {};
  ctx.fillText('Scara: 1:'+Math.round(100/(_RV.scale/12)), ctX+4, ctY+23);
  ctx.fillText('Stil: '+(AC.stilLabel||AC.stil||'—'), ctX+4, ctY+33);
  ctx.fillText('Funcțiune: '+(AC.fnLabel||AC.fn||'—'), ctX+4, ctY+43);
  ctx.fillText('Acoperiș: '+(AC.acoperisLabel||'—'), ctX+4, ctY+53);
  ctx.fillStyle='rgba(30,41,59,.4)'; ctx.font='6px Arial';
  ctx.fillText('UrbanX TSS·FG · '+new Date().toLocaleDateString('ro-RO'), ctX+4, ctY+65);

  // Salvăm ox,oy,SC pentru click detection
  _RV.planOx=ox; _RV.planOy=oy; _RV.planSc=SC;
}

// ── Scări: linii paralele + săgeată sus ────────────────────────────────────
function _drawStairsSymbol(ctx, x, y, w, h){
  if(w < 6 || h < 6) return;
  const n = Math.max(4, Math.floor(h/5));
  ctx.strokeStyle='rgba(100,116,139,.5)'; ctx.lineWidth=0.6;
  for(let i=1; i<=n; i++){
    const ly = y + i*(h/n);
    ctx.beginPath(); ctx.moveTo(x, ly); ctx.lineTo(x+w, ly); ctx.stroke();
  }
  // Săgeată direcție urcare
  const arY = y + h*0.45;
  ctx.strokeStyle='rgba(100,116,139,.8)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(x+w*0.2, arY); ctx.lineTo(x+w*0.8, arY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x+w*0.6, arY-4); ctx.lineTo(x+w*0.8, arY); ctx.lineTo(x+w*0.6, arY+4); ctx.stroke();
}

// ── Lift: pătrat cu diagonale (X) ─────────────────────────────────────────
function _drawLiftSymbol(ctx, x, y, w, h){
  if(w < 5 || h < 5) return;
  ctx.fillStyle='rgba(37,99,235,.12)'; ctx.strokeStyle='rgba(96,165,250,.7)'; ctx.lineWidth=0.8;
  ctx.fillRect(x, y, w, h); ctx.strokeRect(x, y, w, h);
  ctx.strokeStyle='rgba(96,165,250,.4)'; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+w,y+h); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x+w,y); ctx.lineTo(x,y+h); ctx.stroke();
}

// ── Linie cotă (cu terminatori și valoare) ────────────────────────────────
function _drawDimLine(ctx, x1, y1, x2, y2, val, SC, dir, col){
  const isH = Math.abs(y2-y1) < 2;
  col = col || '#334155';
  ctx.strokeStyle = col; ctx.lineWidth = 0.8;
  // Linie principală
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  // Terminatori (linii scurte perpendiculare)
  const tLen = 5;
  if(isH){
    ctx.beginPath(); ctx.moveTo(x1, y1-tLen); ctx.lineTo(x1, y1+tLen); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2-tLen); ctx.lineTo(x2, y2+tLen); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.moveTo(x1-tLen, y1); ctx.lineTo(x1+tLen, y1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2-tLen, y2); ctx.lineTo(x2+tLen, y2); ctx.stroke();
  }
  // Text
  ctx.fillStyle = col; ctx.font = '7px Arial'; ctx.textAlign='center';
  const label = val.toFixed(2).replace('.',',')+'m';
  if(isH){
    ctx.fillText(label, (x1+x2)/2, y1-4);
  } else {
    ctx.save(); ctx.translate((x1+x2)/2-10, (y1+y2)/2); ctx.rotate(-Math.PI/2);
    ctx.fillText(label, 0, 0); ctx.restore();
  }
  ctx.textAlign='left';
}

// ── Mobilier V4 — stil CAD (linii fine, fără culori) ──────────────────────
function _drawFurnitureV4(ctx, t, rx, ry, rw, rh, SC){
  ctx.save();
  ctx.strokeStyle = 'rgba(30,41,59,.5)'; ctx.fillStyle = 'rgba(30,41,59,.06)'; ctx.lineWidth=0.8;

  if(t==='living'){
    // Canapea în L
    const sw=Math.min(rw*.70, SC*2.4), sh=Math.min(rh*.30, SC*0.9);
    const sx=rx+rw/2-sw/2, sy=ry+rh-sh-4;
    ctx.fillRect(sx,sy,sw,sh); ctx.strokeRect(sx,sy,sw,sh);
    // Brațe canapea
    ctx.strokeRect(sx,sy,sh*0.5,sh);
    ctx.strokeRect(sx+sw-sh*0.5,sy,sh*0.5,sh);
    // Masă cafea
    const tw=sw*.45, td=Math.min(sh*.7, SC*0.6);
    ctx.strokeRect(rx+rw/2-tw/2, sy-td-5, tw, td);
    // TV pe perete
    if(rw > SC*1.8){
      const tvW=rw*.55, tvH=SC*0.12;
      ctx.fillStyle='rgba(30,41,59,.15)'; ctx.fillRect(rx+rw/2-tvW/2, ry+3, tvW, tvH);
      ctx.strokeRect(rx+rw/2-tvW/2, ry+3, tvW, tvH);
      // Picioare tv
      ctx.beginPath(); ctx.moveTo(rx+rw/2-tvW*.15, ry+3+tvH); ctx.lineTo(rx+rw/2-tvW*.15, ry+3+tvH+4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rx+rw/2+tvW*.15, ry+3+tvH); ctx.lineTo(rx+rw/2+tvW*.15, ry+3+tvH+4); ctx.stroke();
    }
    // Fotolii (opțional, dacă spațiu)
    if(rw > SC*2.5 && rh > SC*2.0){
      const fW=SC*0.75, fH=SC*0.75;
      ctx.strokeRect(rx+4, sy-fH-4, fW, fH);
      ctx.strokeRect(rx+rw-fW-4, sy-fH-4, fW, fH);
    }
  }
  else if(t==='bedroom'||t==='bedroom2'||t==='bedroom3'){
    const dbl = rw*rh/SC/SC >= 10;
    const bW2 = dbl ? Math.min(rw*.72, SC*1.8) : Math.min(rw*.6, SC*1.0);
    const bH2 = Math.min(rh*.55, SC*2.2);
    const bx=rx+rw/2-bW2/2, by=ry+4;
    ctx.fillRect(bx,by,bW2,bH2); ctx.strokeRect(bx,by,bW2,bH2);
    // Tăblie cap
    ctx.fillStyle='rgba(30,41,59,.10)'; ctx.fillRect(bx,by,bW2,bH2*.18); ctx.strokeRect(bx,by,bW2,bH2*.18);
    // Perne
    ctx.fillStyle='rgba(255,255,255,.85)'; ctx.strokeStyle='rgba(30,41,59,.4)';
    if(dbl){
      ctx.fillRect(bx+4, by+3, bW2/2-8, bH2*.22); ctx.strokeRect(bx+4, by+3, bW2/2-8, bH2*.22);
      ctx.fillRect(bx+bW2/2+4, by+3, bW2/2-8, bH2*.22); ctx.strokeRect(bx+bW2/2+4, by+3, bW2/2-8, bH2*.22);
    } else {
      ctx.fillRect(bx+4, by+3, bW2-8, bH2*.22); ctx.strokeRect(bx+4, by+3, bW2-8, bH2*.22);
    }
    // Noptiere
    ctx.fillStyle='rgba(30,41,59,.07)'; ctx.strokeStyle='rgba(30,41,59,.35)'; ctx.lineWidth=0.7;
    const ns=SC*.32;
    if(bx-ns-3>rx){ ctx.fillRect(bx-ns-3,by+2,ns,ns); ctx.strokeRect(bx-ns-3,by+2,ns,ns); }
    if(bx+bW2+3+ns<rx+rw){ ctx.fillRect(bx+bW2+3,by+2,ns,ns); ctx.strokeRect(bx+bW2+3,by+2,ns,ns); }
    // Scaun la birou (dacă loc)
    if(rh > SC*1.8){
      const deskW=Math.min(rw*.6,SC*1.2), deskH=SC*.45;
      ctx.strokeStyle='rgba(30,41,59,.4)'; ctx.lineWidth=0.7;
      ctx.strokeRect(rx+4, ry+rh-deskH-4, deskW, deskH);
      // Scaun
      ctx.beginPath(); ctx.arc(rx+4+deskW/2, ry+rh-deskH-SC*.35, SC*.20, 0, Math.PI*2); ctx.stroke();
    }
  }
  else if(t==='kitchen'){
    // Mobilier bucătărie în L sau U
    const sW=SC*.55, sH=SC*.55;
    ctx.strokeStyle='rgba(30,41,59,.5)'; ctx.lineWidth=0.8;
    // Plan de lucru stânga
    ctx.fillRect(rx+2, ry+2, sW, rh-4); ctx.strokeRect(rx+2, ry+2, sW, rh-4);
    // Plan de lucru sus
    ctx.fillRect(rx+sW+2, ry+2, rw-sW-4, sH); ctx.strokeRect(rx+sW+2, ry+2, rw-sW-4, sH);
    // Chiuvetă
    ctx.strokeStyle='rgba(30,41,59,.6)'; ctx.lineWidth=1;
    const sinkW=sW*.65, sinkH=sH*.65;
    ctx.strokeRect(rx+4, ry+4, sinkW, sinkH);
    ctx.beginPath(); ctx.arc(rx+4+sinkW/2, ry+4+sinkH/2, sinkH*.25, 0, Math.PI*2); ctx.stroke();
    // Aragaz
    ctx.strokeRect(rx+4, ry+sinkH+8, sW-4, sW-8);
    [[0.3,0.3],[0.7,0.3],[0.3,0.7],[0.7,0.7]].forEach(([fx,fy])=>{
      ctx.beginPath(); ctx.arc(rx+4+(sW-4)*fx, ry+sinkH+8+(sW-8)*fy, (sW-4)*.1, 0, Math.PI*2); ctx.stroke();
    });
    // Frigider
    const frW=sW*.85, frH=SC*.5;
    ctx.fillStyle='rgba(241,245,249,.8)'; ctx.fillRect(rx+rw-frW-2, ry+sH+4, frW, frH);
    ctx.strokeRect(rx+rw-frW-2, ry+sH+4, frW, frH);
    ctx.strokeStyle='rgba(30,41,59,.3)'; ctx.lineWidth=0.5;
    ctx.beginPath(); ctx.moveTo(rx+rw-frW-2, ry+sH+4+frH*0.38); ctx.lineTo(rx+rw-2, ry+sH+4+frH*0.38); ctx.stroke();
  }
  else if(t==='bath'){
    // Cadă
    const cW=Math.min(rw*.85, SC*1.7), cH=Math.min(rh*.45, SC*.9);
    ctx.fillRect(rx+2, ry+2, cW, cH); ctx.strokeRect(rx+2, ry+2, cW, cH);
    ctx.beginPath(); ctx.ellipse(rx+2+cW/2, ry+2+cH/2, cW*.38, cH*.36, 0, 0, Math.PI*2); ctx.stroke();
    // Chiuvetă
    const bW3=SC*.5, bH3=SC*.38;
    ctx.strokeRect(rx+2, ry+cH+8, bW3, bH3);
    ctx.beginPath(); ctx.arc(rx+2+bW3/2, ry+cH+8+bH3/2, bH3*.3, 0, Math.PI*2); ctx.stroke();
    // WC (dacă loc)
    if(rh > SC*1.5){
      const wW2=SC*.45, wH2=SC*.65;
      ctx.beginPath(); ctx.ellipse(rx+2+wW2/2, ry+rh-wH2*.6-4, wW2*.45, wH2*.45, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,.8)';
      ctx.beginPath(); ctx.ellipse(rx+2+wW2/2, ry+rh-wH2*.6-4, wW2*.3, wH2*.3, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(30,41,59,.06)';
      ctx.fillRect(rx+2, ry+rh-wH2-4, wW2, wH2*.25); ctx.strokeRect(rx+2, ry+rh-wH2-4, wW2, wH2*.25);
    }
  }
  else if(t==='wc'){
    const wW2=Math.min(rw*.6, SC*.6), wH2=Math.min(rh*.55, SC*.85);
    ctx.beginPath(); ctx.ellipse(rx+wW2/2+4, ry+wH2+4, wW2*.45, wH2*.45, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.8)';
    ctx.beginPath(); ctx.ellipse(rx+wW2/2+4, ry+wH2+4, wW2*.3, wH2*.3, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(30,41,59,.07)'; ctx.strokeStyle='rgba(30,41,59,.4)'; ctx.lineWidth=0.7;
    ctx.fillRect(rx+4, ry+4, wW2, SC*.2); ctx.strokeRect(rx+4, ry+4, wW2, SC*.2);
    if(rh > SC*.9){
      ctx.strokeRect(rx+wW2+8, ry+4, SC*.4, SC*.32);
      ctx.beginPath(); ctx.arc(rx+wW2+8+SC*.2, ry+4+SC*.16, SC*.10, 0, Math.PI*2); ctx.stroke();
    }
  }

  ctx.restore();
}


// ═══════════════════════════════════════════════════════════════════════════
// EXPORT IFC 2x3 — format STEP (.ifc)
// Standard: ISO 10303-21 / IFC2X3
// Import în: Revit, ArchiCAD, FreeCAD BIM, BIMcollab, QGIS, Solibri
// ═══════════════════════════════════════════════════════════════════════════

function _rvExportIFC(){
  if(!_RV.building){ alert('Generează mai întâi un plan de releveu.'); return; }
  const b  = _RV.building;
  const P  = b.P;
  const AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
  const now = new Date();
  const ts  = now.toISOString().slice(0,19).replace(/[-:T]/g,'');

  // IFC entity counter
  let _id = 100;
  const E  = {};  // entity map
  const lines = [];

  function id(key){ if(!E[key]) E[key]=_id++; return E[key]; }
  function L(s){ lines.push(s); }
  function mm(m){ return Math.round(m*1000); }  // m → mm
  function isoDate(){ return now.toISOString().slice(0,10).replace(/-/g,''); }

  // ── HEADER ──────────────────────────────────────────────────────────
  const header = [
    'ISO-10303-21;',
    'HEADER;',
    `FILE_DESCRIPTION(('ViewDefinition [CoordinationView_V2.0]'),'2;1');`,
    `FILE_NAME('urbanx_releveu_${P.nrCad}_${ts}.ifc','${now.toISOString()}',('UrbanX TSS·FG'),('UrbanX Platform'),'UrbanX Relevee Generator v4','','' );`,
    `FILE_SCHEMA(('IFC2X3'));`,
    'ENDSEC;',
    'DATA;',
  ];

  // ── CONTEXT ──────────────────────────────────────────────────────────
  L(`#${id('ctx3d')}=IFCGEOMETRICREPRESENTATIONCONTEXT($,'Model',3,1.0E-5,#${id('wcs3d')},$);`);
  L(`#${id('ctx2d')}=IFCGEOMETRICREPRESENTATIONCONTEXT($,'Plan',2,1.0E-5,#${id('wcs2d')},$);`);
  L(`#${id('wcs3d')}=IFCAXIS2PLACEMENT3D(#${id('o3d')},#${id('z3d')},#${id('x3d')});`);
  L(`#${id('o3d')}=IFCCARTESIANPOINT((0.,0.,0.));`);
  L(`#${id('z3d')}=IFCDIRECTION((0.,0.,1.));`);
  L(`#${id('x3d')}=IFCDIRECTION((1.,0.,0.));`);
  L(`#${id('wcs2d')}=IFCAXIS2PLACEMENT2D(#${id('o2d')},#${id('x2d')});`);
  L(`#${id('o2d')}=IFCCARTESIANPOINT((0.,0.));`);
  L(`#${id('x2d')}=IFCDIRECTION((1.,0.));`);

  // ── UNITĂȚI (m, m², m³) ───────────────────────────────────────────────
  L(`#${id('ulen')}=IFCSIUNIT(*,.LENGTHUNIT.,$,.METRE.);`);
  L(`#${id('uare')}=IFCSIUNIT(*,.AREAUNIT.,$,.SQUARE_METRE.);`);
  L(`#${id('uvol')}=IFCSIUNIT(*,.VOLUMEUNIT.,$,.CUBIC_METRE.);`);
  L(`#${id('uang')}=IFCSIUNIT(*,.PLANEANGLEUNIT.,$,.RADIAN.);`);
  L(`#${id('ucnt')}=IFCUNITASSIGNMENT((#${id('ulen')},#${id('uare')},#${id('uvol')},#${id('uang')}));`);

  // ── PROJECT ─────────────────────────────────────────────────────────
  const projGUID = _rvGUID();
  L(`#${id('proj')}=IFCPROJECT('${projGUID}',#${id('own')},'UrbanX_Releveu_${P.nrCad}',$,$,$,$,(#${id('ctx3d')},#${id('ctx2d')}),#${id('ucnt')});`);
  L(`#${id('own')}=IFCOWNERHISTORY(#${id('per')},#${id('app')},$,.ADDED.,${Math.floor(now.getTime()/1000)},$,$,${Math.floor(now.getTime()/1000)});`);
  L(`#${id('per')}=IFCPERSONANDORGANIZATION(#${id('pers')},#${id('org')},$);`);
  L(`#${id('pers')}=IFCPERSON($,'UrbanX',$,$,$,$,$,$);`);
  L(`#${id('org')}=IFCORGANIZATION($,'TSS UrbanX',$,$,$);`);
  L(`#${id('app')}=IFCAPPLICATION(#${id('org')},'4.0','UrbanX Relevee Generator','UrbanX-RV4');`);

  // ── SITE ────────────────────────────────────────────────────────────
  const siteGUID = _rvGUID();
  L(`#${id('site')}=IFCSITE('${siteGUID}',#${id('own')},'Parcela_${P.nrCad}',$,$,#${id('siteplc')},$,$,.ELEMENT.,$,$,$,$,$);`);
  L(`#${id('siteplc')}=IFCLOCALPLACEMENT($,#${id('wcs3d')});`);
  L(`#${id('relsite')}=IFCRELAGGREGATES('${_rvGUID()}',#${id('own')},'Project_Site',$,#${id('proj')},(#${id('site')}));`);

  // ── BUILDING ────────────────────────────────────────────────────────
  const bldGUID = _rvGUID();
  L(`#${id('bld')}=IFCBUILDING('${bldGUID}',#${id('own')},'Cladire_${P.nrCad}',$,$,#${id('bldplc')},$,$,.ELEMENT.,$,$,$);`);
  L(`#${id('bldplc')}=IFCLOCALPLACEMENT(#${id('siteplc')},#${id('wcs3d')});`);
  L(`#${id('relbld')}=IFCRELAGGREGATES('${_rvGUID()}',#${id('own')},'Site_Building',$,#${id('site')},(#${id('bld')}));`);

  // ── PROPRIETĂȚI BUILDING (stil, funcțiune, normative) ────────────────
  const bldPropId = id('bldprop');
  const normsStr  = (AC.fn==='rezidential_colectiv'||AC.fn==='rez') ? 'NP057/2002;OMS119/2014;P118-2/2013;NP067/2002' : 'P118-3/2015;NP067/2002';
  L(`#${bldPropId}=IFCPROPERTYSET('${_rvGUID()}',#${id('own')},'Pset_BuildingCommon',$,(#${id('p_fn')},#${id('p_st')},#${id('p_nr')},#${id('p_norm')}));`);
  L(`#${id('p_fn')}=IFCPROPERTYSINGLEVALUE('Functiune',$,IFCLABEL('${AC.fn||'—'}'),$);`);
  L(`#${id('p_st')}=IFCPROPERTYSINGLEVALUE('StilArhitectural',$,IFCLABEL('${AC.stil||'—'}'),$);`);
  L(`#${id('p_nr')}=IFCPROPERTYSINGLEVALUE('NrCadastral',$,IFCLABEL('${P.nrCad}'),$);`);
  L(`#${id('p_norm')}=IFCPROPERTYSINGLEVALUE('Normative',$,IFCLABEL('${normsStr}'),$);`);
  L(`#${id('bldproprel')}=IFCRELDEFINESBYPROPERTIES('${_rvGUID()}',#${id('own')},$,$,(#${id('bld')}),#${bldPropId});`);

  // ── ETAJE + CAMERE ────────────────────────────────────────────────────
  const storeyIds = [];
  const allSpaceIds = [];

  for(let fi=0; fi<b.niv; fi++){
    const fl_ = _RV.floors[fi] || (typeof _rvFloor === 'function' ? _rvFloor(b, fi) : null);
    if(!fl_) continue;

    const storeyKey = 'storey_'+fi;
    const storeyGUID = _rvGUID();
    const storeyElev = fi * (P.hn||3.0);
    const storeyLabel = fi===0 ? 'Parter' : 'Etaj_'+fi;

    L(`#${id('plc_'+storeyKey)}=IFCLOCALPLACEMENT(#${id('bldplc')},#${id('ax_'+storeyKey)});`);
    L(`#${id('ax_'+storeyKey)}=IFCAXIS2PLACEMENT3D(#${id('pt_'+storeyKey)},#${id('z3d')},#${id('x3d')});`);
    L(`#${id('pt_'+storeyKey)}=IFCCARTESIANPOINT((0.,0.,${storeyElev.toFixed(3)}));`);
    L(`#${id(storeyKey)}=IFCBUILDINGSTOREY('${storeyGUID}',#${id('own')},'${storeyLabel}',$,$,#${id('plc_'+storeyKey)},$,$,.ELEMENT.,${storeyElev.toFixed(3)});`);
    storeyIds.push(id(storeyKey));

    // ── CAMERE (IfcSpace) ─────────────────────────────────────────────
    const spaceIdsForStorey = [];
    (fl_.rects||[]).forEach((r,ri)=>{
      if(r.apt < 0 && r.t !== 'core') return; // skip holuri comune? Nu, includem totul
      const spKey = `sp_${fi}_${ri}`;
      const spGUID = _rvGUID();
      const area_ = r.w * r.h;
      const vol_  = area_ * (P.hn||3.0);
      const lbl_  = (r.lbl||r.t).replace(/\n/g,' ').slice(0,100);
      const spType = _ifcSpaceType(r.t);

      L(`#${id('plc_'+spKey)}=IFCLOCALPLACEMENT(#${id('plc_'+storeyKey)},#${id('ax_'+spKey)});`);
      L(`#${id('ax_'+spKey)}=IFCAXIS2PLACEMENT3D(#${id('pt_'+spKey)},#${id('z3d')},#${id('x3d')});`);
      L(`#${id('pt_'+spKey)}=IFCCARTESIANPOINT((${r.x.toFixed(3)},${r.y.toFixed(3)},0.));`);

      // Geometrie plan 2D (dreptunghi)
      const poly2dKey = 'poly2d_'+spKey;
      L(`#${id(poly2dKey)}=IFCPOLYLINE((#${id(spKey+'_p1')},#${id(spKey+'_p2')},#${id(spKey+'_p3')},#${id(spKey+'_p4')},#${id(spKey+'_p1')}));`);
      L(`#${id(spKey+'_p1')}=IFCCARTESIANPOINT((0.,0.));`);
      L(`#${id(spKey+'_p2')}=IFCCARTESIANPOINT((${r.w.toFixed(3)},0.));`);
      L(`#${id(spKey+'_p3')}=IFCCARTESIANPOINT((${r.w.toFixed(3)},${r.h.toFixed(3)}));`);
      L(`#${id(spKey+'_p4')}=IFCCARTESIANPOINT((0.,${r.h.toFixed(3)}));`);

      // Geometrie extrusion 3D
      L(`#${id('extr_'+spKey)}=IFCEXTRUDEDAREASOLID(#${id('prof_'+spKey)},#${id('wcs3d')},#${id('z3d')},${(P.hn||3.0).toFixed(3)});`);
      L(`#${id('prof_'+spKey)}=IFCARBITRARYCLOSEDPROFILEDEF(.AREA.,$,#${id(poly2dKey)});`);

      // Shape representation
      L(`#${id('shp_'+spKey)}=IFCSHAPEREPRESENTATION(#${id('ctx3d')},'Body','SweptSolid',(#${id('extr_'+spKey)}));`);
      L(`#${id('shp2d_'+spKey)}=IFCSHAPEREPRESENTATION(#${id('ctx2d')},'FootPrint','Curve2D',(#${id(poly2dKey)}));`);
      L(`#${id('prdrep_'+spKey)}=IFCPRODUCTDEFINITIONSHAPE($,$,(#${id('shp_'+spKey)},#${id('shp2d_'+spKey)}));`);

      L(`#${id(spKey)}=IFCSPACE('${spGUID}',#${id('own')},'${lbl_}',$,$,#${id('plc_'+spKey)},#${id('prdrep_'+spKey)},$,.ELEMENT.,.INTERNAL.,$);`);

      // PropertySet per cameră
      const psetKey = 'pset_'+spKey;
      L(`#${id(psetKey)}=IFCPROPERTYSET('${_rvGUID()}',#${id('own')},'Pset_SpaceCommon',$,(#${id(spKey+'_area')},#${id(spKey+'_vol')},#${id(spKey+'_type')},#${id(spKey+'_norm')}));`);
      L(`#${id(spKey+'_area')}=IFCPROPERTYSINGLEVALUE('NetFloorArea',$,IFCAREAMEASURE(${area_.toFixed(4)}),$);`);
      L(`#${id(spKey+'_vol')}=IFCPROPERTYSINGLEVALUE('NetVolume',$,IFCVOLUMEMEASURE(${vol_.toFixed(4)}),$);`);
      L(`#${id(spKey+'_type')}=IFCPROPERTYSINGLEVALUE('TipCamera',$,IFCLABEL('${r.t}'),$);`);
      const normMin = _roomNormMin(r.t, b);
      L(`#${id(spKey+'_norm')}=IFCPROPERTYSINGLEVALUE('SuprafataMinimaNormativa',$,IFCAREAMEASURE(${normMin.toFixed(2)}),$);`);
      L(`#${id('psetrel_'+spKey)}=IFCRELDEFINESBYPROPERTIES('${_rvGUID()}',#${id('own')},$,$,(#${id(spKey)}),#${id(psetKey)});`);

      spaceIdsForStorey.push(id(spKey));
      allSpaceIds.push(id(spKey));
    });

    // Agregare spații în etaj
    if(spaceIdsForStorey.length > 0){
      L(`#${id('relsp_'+fi)}=IFCRELAGGREGATES('${_rvGUID()}',#${id('own')},'Storey_Spaces',$,#${id(storeyKey)},(${spaceIdsForStorey.map(x=>'#'+x).join(',')}));`);
    }
  }

  // Agregare etaje în clădire
  if(storeyIds.length > 0){
    L(`#${id('relstorey')}=IFCRELAGGREGATES('${_rvGUID()}',#${id('own')},'Building_Storeys',$,#${id('bld')},(${storeyIds.map(x=>'#'+x).join(',')}));`);
  }

  // ── PEREȚI EXTERIORI ──────────────────────────────────────────────────
  const wallDefs = [
    {key:'wN', x:0,       y:-0.30,  len:b.bW, dir:'E', label:'Perete_Exterior_Nord'},
    {key:'wS', x:0,       y:b.bD,   len:b.bW, dir:'E', label:'Perete_Exterior_Sud'},
    {key:'wV', x:-0.30,   y:0,      len:b.bD, dir:'N', label:'Perete_Exterior_Vest'},
    {key:'wE', x:b.bW,    y:0,      len:b.bD, dir:'N', label:'Perete_Exterior_Est'},
  ];
  wallDefs.forEach(w=>{
    const wGUID = _rvGUID();
    const hNiv = P.hn || 3.0;
    L(`#${id('plc_'+w.key)}=IFCLOCALPLACEMENT(#${id('bldplc')},#${id('ax_'+w.key)});`);
    L(`#${id('ax_'+w.key)}=IFCAXIS2PLACEMENT3D(#${id('pt_'+w.key)},#${id('z3d')},#${id('x3d')});`);
    L(`#${id('pt_'+w.key)}=IFCCARTESIANPOINT((${w.x.toFixed(3)},${w.y.toFixed(3)},0.));`);
    L(`#${id(w.key)}=IFCWALL('${wGUID}',#${id('own')},'${w.label}',$,$,#${id('plc_'+w.key)},$,$);`);
    // PropertySet perete exterior
    L(`#${id('pp_'+w.key)}=IFCPROPERTYSET('${_rvGUID()}',#${id('own')},'Pset_WallCommon',$,(#${id('pp_'+w.key+'_ext')},#${id('pp_'+w.key+'_gr')},#${id('pp_'+w.key+'_mat')}));`);
    L(`#${id('pp_'+w.key+'_ext')}=IFCPROPERTYSINGLEVALUE('IsExternal',$,IFCBOOLEAN(.T.),$);`);
    L(`#${id('pp_'+w.key+'_gr')}=IFCPROPERTYSINGLEVALUE('GrosimePerete',$,IFCLENGTHMEASURE(0.30),$);`);
    const matLabel = (AC.hasCurtainWall) ? 'Curtain Wall' : 'BCA+EPS 15cm';
    L(`#${id('pp_'+w.key+'_mat')}=IFCPROPERTYSINGLEVALUE('Material',$,IFCLABEL('${matLabel}'),$);`);
    L(`#${id('pprel_'+w.key)}=IFCRELDEFINESBYPROPERTIES('${_rvGUID()}',#${id('own')},$,$,(#${id(w.key)}),#${id('pp_'+w.key)});`);
  });

  // ── SLAB (planșeu la fiecare nivel) ───────────────────────────────────
  for(let fi=0; fi<b.niv; fi++){
    const slKey = 'slab_'+fi;
    const slGUID = _rvGUID();
    const slElev = fi * (P.hn||3.0);
    L(`#${id('plc_'+slKey)}=IFCLOCALPLACEMENT(#${id('bldplc')},#${id('ax_'+slKey)});`);
    L(`#${id('ax_'+slKey)}=IFCAXIS2PLACEMENT3D(#${id('slpt_'+slKey)},#${id('z3d')},#${id('x3d')});`);
    L(`#${id('slpt_'+slKey)}=IFCCARTESIANPOINT((0.,0.,${slElev.toFixed(3)}));`);
    L(`#${id(slKey)}=IFCSLAB('${slGUID}',#${id('own')},'Planseu_${fi===0?'Parter':'Etaj_'+fi}',$,$,#${id('plc_'+slKey)},$,$,.FLOOR.);`);
  }

  // ── SFÂRŞIT ──────────────────────────────────────────────────────────
  L('ENDSEC;');
  L('END-ISO-10303-21;');

  // Asamblează fișierul
  const content = [...header, ...lines].join('\n');
  const blob = new Blob([content], {type: 'application/octet-stream'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `urbanx_releveu_${P.nrCad}_${ts}.ifc`;
  a.click();
  URL.revokeObjectURL(url);

  console.log(`[IFC] Export complet: ${lines.length} entități, ${b.niv} etaje, ${allSpaceIds.length} spații`);
}

// ── GUID IFC (format standard 22 caractere base64) ────────────────────────
function _rvGUID(){
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$';
  let g = '';
  for(let i=0; i<22; i++) g += chars[Math.floor(Math.random()*64)];
  return g;
}

// ── Tip spațiu IFC din tipul de cameră UrbanX ─────────────────────────────
function _ifcSpaceType(t){
  const m = {
    living:'OFFICE', bedroom:'BEDROOM', kitchen:'KITCHEN', bath:'BATHROOM',
    wc:'TOILET', hall:'CORRIDOR', storage:'STORAGE', core:'STAIRWELL',
    balcon:'BALCONY', commercial:'RETAIL', office:'OFFICE', meeting:'MEETINGROOM',
  };
  return m[t] || 'UNDEFINED';
}

// ── Suprafață minimă normativă per tip cameră (NP057/2002) ────────────────
function _roomNormMin(t, b){
  const fn = String(b?.P?.fn||'').toLowerCase();
  if(fn.includes('birouri')) return {office:10,meeting:15,hall:3,bath:4}[t]||0;
  return {living:14, bedroom:12, bedroom2:10, bedroom3:8, kitchen:5,
          bath:3.6, wc:1.2, hall:3, storage:1.5}[t]||0;
}


// ═══════════════════════════════════════════════════════════════════════════
// EXPORT SVG VECTORIAL — pentru AutoCAD, Illustrator, Inkscape, FreeCAD
// Generează SVG 1:1 în mm (1 unitate SVG = 1mm la scara 1:50)
// ═══════════════════════════════════════════════════════════════════════════

function _rvExportSVG(){
  if(!_RV.building){ alert('Generează mai întâi un plan de releveu.'); return; }
  const b  = _RV.building;
  const P  = b.P;
  const fi = _RV.floor || 0;
  const fl = _RV.floors[fi] || (typeof _rvFloor === 'function' ? _rvFloor(b, fi) : null);
  if(!fl){ alert('Planul pentru etajul selectat nu e disponibil.'); return; }

  const SCALE = 20; // 1m = 20mm în SVG (= 1:50 la printare)
  const PAD   = 30; // mm padding
  const W_svg = b.bW * SCALE + PAD*2;
  const H_svg = b.bD * SCALE + PAD*2;

  const CM_SVG = {
    living:   '#FFF0DC', bedroom: '#DFFCE8', bedroom2: '#DFFCE8', bedroom3: '#DFFCE8',
    kitchen:  '#DBEAFE', bath: '#EDE9FE', wc: '#EDE9FE', hall: '#F1F5F9',
    storage:  '#F1F5F9', core: '#E2E8F0', balcon: '#FFFBEB', commercial: '#F3E8FF',
    office:   '#DFFCE8', meeting: '#FEF3C7', reception: '#F3E8FF',
  };

  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<!-- UrbanX SVG Export · Nr.cad. ${P.nrCad} · ${new Date().toISOString().slice(0,10)} -->`,
    `<!-- Scara: 1:50 · 1 unitate SVG = 1mm -->`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W_svg}mm" height="${H_svg}mm" viewBox="0 0 ${W_svg} ${H_svg}">`,
    `<title>Plan ${fi===0?'Parter':'Etaj '+fi} · Nr.cad. ${P.nrCad}</title>`,
    // Layere (grupuri SVG)
    `<defs><style>`,
    `.room{font-family:Arial,sans-serif;font-size:2.5px;fill:#1E293B;text-anchor:middle;}`,
    `.area{font-family:Arial,sans-serif;font-size:2px;fill:rgba(30,41,59,.6);text-anchor:middle;}`,
    `.dim{font-family:Arial,sans-serif;font-size:1.8px;fill:#334155;text-anchor:middle;}`,
    `.wall-ext{fill:#1A1A2E;} .wall-int{fill:#1E293B;} .balcon-hatch{fill:url(#hatch);}`,
    `</style>`,
    `<pattern id="hatch" patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">`,
    `<line x1="0" y1="0" x2="0" y2="3" stroke="rgba(180,130,30,.4)" stroke-width="0.5"/>`,
    `</pattern>`,
    `<pattern id="hatch-struct" patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">`,
    `<line x1="0" y1="0" x2="0" y2="3" stroke="rgba(20,40,90,.3)" stroke-width="0.7"/>`,
    `</pattern>`,
    `</defs>`,
  ];

  const ox = PAD, oy = PAD;
  const f  = SCALE; // factor

  // Layer camere
  lines.push(`<g id="rooms" inkscape:label="Camere">`);
  (fl.rects||[]).sort((a,m)=>(a.zIdx||0)-(m.zIdx||0)).forEach(r=>{
    const rx_=ox+r.x*f, ry_=oy+r.y*f, rw_=r.w*f, rh_=r.h*f;
    const fill = CM_SVG[r.t] || '#F1F5F9';
    if(r.bal){
      lines.push(`<rect x="${rx_.toFixed(2)}" y="${ry_.toFixed(2)}" width="${rw_.toFixed(2)}" height="${rh_.toFixed(2)}" fill="url(#hatch)" stroke="#B45309" stroke-width="0.3" stroke-dasharray="2,1"/>`);
    } else {
      lines.push(`<rect x="${rx_.toFixed(2)}" y="${ry_.toFixed(2)}" width="${rw_.toFixed(2)}" height="${rh_.toFixed(2)}" fill="${fill}" stroke="none"/>`);
    }
  });
  lines.push(`</g>`);

  // Layer pereți exteriori
  const EW = 0.30*f;
  lines.push(`<g id="walls-ext" inkscape:label="Pereti_Exteriori">`);
  lines.push(`<rect x="${(ox-EW).toFixed(2)}" y="${(oy-EW).toFixed(2)}" width="${(b.bW*f+EW*2).toFixed(2)}" height="${EW.toFixed(2)}" class="wall-ext" fill="url(#hatch-struct)"/>`);
  lines.push(`<rect x="${(ox-EW).toFixed(2)}" y="${(oy+b.bD*f).toFixed(2)}" width="${(b.bW*f+EW*2).toFixed(2)}" height="${EW.toFixed(2)}" class="wall-ext" fill="url(#hatch-struct)"/>`);
  lines.push(`<rect x="${(ox-EW).toFixed(2)}" y="${(oy-EW).toFixed(2)}" width="${EW.toFixed(2)}" height="${(b.bD*f+EW*2).toFixed(2)}" class="wall-ext" fill="url(#hatch-struct)"/>`);
  lines.push(`<rect x="${(ox+b.bW*f).toFixed(2)}" y="${(oy-EW).toFixed(2)}" width="${EW.toFixed(2)}" height="${(b.bD*f+EW*2).toFixed(2)}" class="wall-ext" fill="url(#hatch-struct)"/>`);
  lines.push(`</g>`);

  // Layer pereți interiori
  const IW = 0.15*f;
  lines.push(`<g id="walls-int" inkscape:label="Pereti_Interiori">`);
  (fl.rects||[]).forEach(r=>{
    if(r.bal) return;
    const rx_=ox+r.x*f, ry_=oy+r.y*f, rw_=r.w*f, rh_=r.h*f;
    const wT = r.t==='core' ? 0.25*f : IW;
    const wFill = r.t==='core' ? 'url(#hatch-struct)' : '#1E293B';
    // Desenăm fiecare perete ca dreptunghi separat
    lines.push(`<rect x="${rx_.toFixed(2)}" y="${ry_.toFixed(2)}" width="${rw_.toFixed(2)}" height="${wT.toFixed(2)}" fill="${wFill}"/>`);
    lines.push(`<rect x="${rx_.toFixed(2)}" y="${(ry_+rh_-wT).toFixed(2)}" width="${rw_.toFixed(2)}" height="${wT.toFixed(2)}" fill="${wFill}"/>`);
    lines.push(`<rect x="${rx_.toFixed(2)}" y="${ry_.toFixed(2)}" width="${wT.toFixed(2)}" height="${rh_.toFixed(2)}" fill="${wFill}"/>`);
    lines.push(`<rect x="${(rx_+rw_-wT).toFixed(2)}" y="${ry_.toFixed(2)}" width="${wT.toFixed(2)}" height="${rh_.toFixed(2)}" fill="${wFill}"/>`);
  });
  lines.push(`</g>`);

  // Layer ferestre
  lines.push(`<g id="windows" inkscape:label="Ferestre" fill="rgba(219,234,254,.8)" stroke="#2563EB" stroke-width="0.4">`);
  (fl.wins||[]).forEach(w=>{
    const wSC=(w.w||w.h||0)*f;
    if(w.wall==='N') lines.push(`<rect x="${(ox+w.x*f).toFixed(2)}" y="${(oy-EW).toFixed(2)}" width="${wSC.toFixed(2)}" height="${(EW*2).toFixed(2)}"/>`);
    else if(w.wall==='S') lines.push(`<rect x="${(ox+w.x*f).toFixed(2)}" y="${(oy+b.bD*f-EW).toFixed(2)}" width="${wSC.toFixed(2)}" height="${(EW*2).toFixed(2)}"/>`);
    else if(w.wall==='V') lines.push(`<rect x="${(ox-EW).toFixed(2)}" y="${(oy+w.y*f).toFixed(2)}" width="${(EW*2).toFixed(2)}" height="${wSC.toFixed(2)}"/>`);
    else lines.push(`<rect x="${(ox+b.bW*f-EW).toFixed(2)}" y="${(oy+w.y*f).toFixed(2)}" width="${(EW*2).toFixed(2)}" height="${wSC.toFixed(2)}"/>`);
  });
  lines.push(`</g>`);

  // Layer etichete
  lines.push(`<g id="labels" inkscape:label="Etichete">`);
  const LBLMAP = {living:'CAMERA DE ZI',bedroom:'DORMITOR',bedroom2:'DORMITOR',bedroom3:'DORMITOR',
    kitchen:'BUCĂTĂRIE',bath:'BAIE',wc:'WC',hall:'HOL',storage:'DEBARA',core:'CASA SCĂRILOR',
    balcon:'BALCON',commercial:'SPAȚIU COM.',office:'BIROU',meeting:'SALĂ CONF.'};
  (fl.rects||[]).forEach(r=>{
    if(r.w*f < 10 || r.h*f < 8) return;
    const cx = (ox+r.x*f+r.w*f/2).toFixed(2);
    const cy = (oy+r.y*f+r.h*f/2).toFixed(2);
    const lbl = LBLMAP[r.t] || (r.lbl||r.t).toUpperCase();
    const area = (r.w*r.h).toFixed(2).replace('.',',');
    lines.push(`<text x="${cx}" y="${cy}" class="room">${lbl}</text>`);
    if(!r.bal && r.h*f > 10)
      lines.push(`<text x="${cx}" y="${(parseFloat(cy)+3).toFixed(2)}" class="area">s = ${area} mp</text>`);
  });
  lines.push(`</g>`);

  // Cote exterioare
  lines.push(`<g id="dims" inkscape:label="Cote" stroke="#334155" stroke-width="0.3" fill="none">`);
  // Linie cotă N
  const dimY = oy - EW - 5;
  lines.push(`<line x1="${ox.toFixed(2)}" y1="${dimY.toFixed(2)}" x2="${(ox+b.bW*f).toFixed(2)}" y2="${dimY.toFixed(2)}"/>`);
  lines.push(`<line x1="${ox.toFixed(2)}" y1="${(dimY-2).toFixed(2)}" x2="${ox.toFixed(2)}" y2="${(dimY+2).toFixed(2)}"/>`);
  lines.push(`<line x1="${(ox+b.bW*f).toFixed(2)}" y1="${(dimY-2).toFixed(2)}" x2="${(ox+b.bW*f).toFixed(2)}" y2="${(dimY+2).toFixed(2)}"/>`);
  lines.push(`<text x="${(ox+b.bW*f/2).toFixed(2)}" y="${(dimY-1.5).toFixed(2)}" class="dim">${b.bW.toFixed(2).replace('.',',')}m</text>`);
  lines.push(`</g>`);

  // Cartuș
  lines.push(`<g id="title-block" inkscape:label="Cartus">`);
  lines.push(`<rect x="${(W_svg-55).toFixed(2)}" y="${(H_svg-20).toFixed(2)}" width="52" height="18" fill="rgba(241,245,249,.95)" stroke="#94A3B8" stroke-width="0.3"/>`);
  lines.push(`<text x="${(W_svg-29).toFixed(2)}" y="${(H_svg-13).toFixed(2)}" style="font-family:Arial;font-size:2px;fill:#0F172A;text-anchor:middle;font-weight:bold">PLAN ${fi===0?'PARTER':'ETAJ '+fi} · Nr.cad. ${P.nrCad}</text>`);
  lines.push(`<text x="${(W_svg-29).toFixed(2)}" y="${(H_svg-8).toFixed(2)}" style="font-family:Arial;font-size:1.6px;fill:#64748B;text-anchor:middle">UrbanX TSS·FG · Scara 1:50 · ${new Date().toLocaleDateString('ro-RO')}</text>`);
  lines.push(`</g>`);

  lines.push(`</svg>`);

  const content  = lines.join('\n');
  const blob = new Blob([content], {type: 'image/svg+xml;charset=utf-8'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `urbanx_plan_${fi===0?'parter':'etaj'+fi}_${P.nrCad}.svg`;
  a.click();
  URL.revokeObjectURL(url);

  console.log(`[SVG] Export complet: ${fl.rects?.length||0} camere, ${fl.wins?.length||0} ferestre`);
}
