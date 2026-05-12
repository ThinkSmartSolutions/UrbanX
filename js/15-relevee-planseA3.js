// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-planseA3.js — Export Planșe Arhitecturale Profesionale v1.0
// UrbanX TSS·FG
//
// Adaugă funcția _rvExportPlanseA3() la motorul existent 15-relevee.js
// Produce: 7 planșe A3 landscape, fond alb, stil arhitectural profesional
//   01 Plan Parter · 02 Plan Etaj Tip · 03 Plan Acoperiș
//   04 Secțiune A-A · 05 Secțiune B-B
//   06 Fațade N·S·E·V · 07 Plan Teren + Legendă + Date Generale
//
// Compatibil cu TOATE tipurile FN_CONFIG: rez, hotel, birouri, com, mixt
// ═══════════════════════════════════════════════════════════════════════════

// ── Așteaptă sistemul relevant ────────────────────────────────────────────
(function(){
  function waitReady(cb,n){
    n=n||0; if(n>80) return;
    if(typeof _rvExportPDF==='undefined'||typeof _RV==='undefined'){
      setTimeout(()=>waitReady(cb,n+1),300); return;
    }
    cb();
  }

  waitReady(()=>{
    // Injectăm buton în UI
    setTimeout(_injectButton, 2500);
    console.log('[Planșe A3] ✅ v1.0 loaded');
  });

  function _injectButton(){
    const existing = document.getElementById('rv-planseA3-btn');
    if(existing) return;
    const anchor = document.querySelector('button[onclick*="_rvExportPDF"]')
                || document.querySelector('.rv-expbtn');
    if(!anchor) return;
    const btn = document.createElement('button');
    btn.id = 'rv-planseA3-btn';
    btn.innerHTML = '📐 Planșe A3';
    btn.title = 'Export 7 planșe arhitecturale profesionale (A3 landscape, fond alb)';
    btn.style.cssText = anchor.style.cssText || [
      'padding:6px 12px','border-radius:6px','cursor:pointer','font-family:inherit',
      'font-size:9px','font-weight:700','margin-left:6px',
      'background:rgba(212,175,55,.2)','border:1px solid rgba(212,175,55,.5)',
      'color:#D4AF37',
    ].join(';');
    btn.onclick = () => _rvExportPlanseA3();
    anchor.parentElement.insertBefore(btn, anchor.nextSibling);
  }
})();

// ═══════════════════════════════════════════════════════════════════════════
// FUNCȚIA PRINCIPALĂ
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportPlanseA3(){
  const P = _RV.parcelParams, b = _RV.building;
  if(!P||!b){ alert('Generați releveele mai întâi.'); return; }

  const _jsPDF = (typeof jsPDF!=='undefined') ? jsPDF : window.jspdf?.jsPDF;
  if(!_jsPDF){ alert('jsPDF indisponibil — actualizați pagina.'); return; }

  if(typeof ss==='function') ss('⏳ Generez planșe A3 profesionale…');

  // Dimensiuni pagină A3 landscape
  const W=420, H=297;
  const pdf = new _jsPDF({ orientation:'landscape', unit:'mm', format:'a3' });
  let pgN=0;
  const newPg = () => { if(pgN>0) pdf.addPage(); pgN++; };

  // ── Sanitizare text ──────────────────────────────────────────────────────
  const T = s => String(s||'')
    .replace(/\u0219/g,'\u015F').replace(/\u0218/g,'\u015E')
    .replace(/\u021B/g,'\u0163').replace(/\u021A/g,'\u0162')
    .replace(/\u0103/g,'a').replace(/\u0102/g,'A')
    .replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ')
    .replace(/\s+/g,' ').trim().slice(0,400);
  const N = (n,d) => isNaN(n)?'—':d?Number(n).toFixed(d):Math.round(n)+'';

  // ── Culori ────────────────────────────────────────────────────────────────
  const C = {
    black:[10,15,25], white:[255,255,255], bg:[252,252,253],
    wall:[30,40,60], wallFill:[210,215,225],
    gold:[180,140,30],
    grid:[210,215,225], light:[245,248,252],
    living:[255,240,215], bedroom:[225,248,230], kitchen:[215,240,250],
    bath:[240,230,255], hall:[235,238,245], core:[210,225,250], balcon:[252,248,220],
    office:[225,240,255], meeting:[255,240,230], commercial:[255,225,240],
    red:[180,30,30], blue:[30,70,180], green:[30,130,60],
    dimLine:[50,70,120],
  };

  // ── HELPER: cartuș planșă ─────────────────────────────────────────────────
  const cartus = (nr, titlu, scara) => {
    // Linie albastru-închis sus
    pdf.setFillColor(30,40,70); pdf.rect(0,0,W,8,'F');
    // Linie aurie subțire
    pdf.setFillColor(...C.gold); pdf.rect(0,7.5,W,0.8,'F');
    // Număr planșă stânga
    pdf.setTextColor(255,255,255); pdf.setFont('helvetica','bold'); pdf.setFontSize(7);
    pdf.text(T(String(nr).padStart(2,'0')+' — '+titlu), 5, 5.2);
    // Scara + proiect dreapta
    pdf.setFont('helvetica','normal'); pdf.setFontSize(6);
    pdf.text(T(scara), W-4, 5.2, {align:'right'});
    // Footer
    pdf.setFillColor(240,243,250); pdf.rect(0,H-6,W,6,'F');
    pdf.setDrawColor(...C.grid); pdf.setLineWidth(0.15); pdf.line(0,H-6,W,H-6);
    pdf.setTextColor(100,115,135); pdf.setFont('helvetica','italic'); pdf.setFontSize(4.5);
    pdf.text(T('Nr.cad. '+P.nrCad+' · UTR: '+P.utr+' · '+P.W+'m×'+P.D+'m · '+P.area+'m² · UrbanX TSS·FG · Document orientativ — nu înlocuieste proiectul tehnic Legea 50/1991'), W/2, H-2, {align:'center'});
  };

  // ── HELPER: nord ──────────────────────────────────────────────────────────
  const nord = (x,y,dir,sz) => {
    sz=sz||8;
    const rot={N:0,S:Math.PI,E:Math.PI/2,V:-Math.PI/2}[dir||'N']||0;
    const px=(a,d)=>[x+Math.sin(a+rot)*d, y-Math.cos(a+rot)*d];
    pdf.setFillColor(255,255,255); pdf.setDrawColor(80,90,110); pdf.setLineWidth(0.35);
    pdf.circle(x,y,sz+0.5,'FD');
    const n=px(0,sz), s2=px(Math.PI,sz);
    pdf.setFillColor(...C.red);
    pdf.triangle(x,y-0.5,n[0]-sz*0.3,n[1],n[0]+sz*0.3,n[1],'F');
    pdf.setFillColor(180,185,195);
    pdf.triangle(x,y+0.5,s2[0]-sz*0.3,s2[1],s2[0]+sz*0.3,s2[1],'F');
    pdf.setTextColor(...C.red); pdf.setFont('helvetica','bold'); pdf.setFontSize(6);
    pdf.text('N',n[0],n[1]-1.5,{align:'center'});
  };

  // ── HELPER: scara grafică ─────────────────────────────────────────────────
  const scalaGraf = (x,y,sc,scText) => {
    const m=5*sc;
    pdf.setFillColor(...C.black); pdf.rect(x,y,m/2,1.5,'F');
    pdf.setFillColor(255,255,255); pdf.rect(x+m/2,y,m/2,1.5,'F');
    pdf.setDrawColor(...C.black); pdf.setLineWidth(0.3); pdf.rect(x,y,m,1.5,'S');
    pdf.setTextColor(60,75,95); pdf.setFont('helvetica','normal'); pdf.setFontSize(4.5);
    pdf.text('0',x,y+4); pdf.text('5m',x+m,y+4,{align:'right'});
    pdf.setFontSize(4); pdf.text(T(scText||'Sc. 1:100'),x+m/2,y+6,{align:'center'});
  };

  // ── HELPER: linie cotă cu săgeți ─────────────────────────────────────────
  const cota = (x1,y1,x2,y2,val,side) => {
    // side: 'above' sau 'below' sau 'left' sau 'right'
    const offset = 4.5;
    pdf.setDrawColor(...C.dimLine); pdf.setLineWidth(0.25);
    pdf.setTextColor(...C.dimLine); pdf.setFont('helvetica','normal'); pdf.setFontSize(4);
    if(y1===y2){ // orizontal
      const ly = side==='above' ? y1-offset : y1+offset;
      pdf.line(x1,y1-2,x1,ly+2); pdf.line(x2,y1-2,x2,ly+2);
      pdf.line(x1,ly,x2,ly);
      pdf.line(x1,ly,x1+1.5,ly-1); pdf.line(x1,ly,x1+1.5,ly+1);
      pdf.line(x2,ly,x2-1.5,ly-1); pdf.line(x2,ly,x2-1.5,ly+1);
      pdf.text(T(val),( x1+x2)/2,ly+(side==='above'?-1:3.5),{align:'center'});
    } else { // vertical
      const lx = side==='left' ? x1-offset : x1+offset;
      pdf.line(x1-2,y1,lx+2,y1); pdf.line(x1-2,y2,lx+2,y2);
      pdf.line(lx,y1,lx,y2);
      pdf.line(lx,y1,lx-1,y1+1.5); pdf.line(lx,y1,lx+1,y1+1.5);
      pdf.line(lx,y2,lx-1,y2-1.5); pdf.line(lx,y2,lx+1,y2-1.5);
      pdf.text(T(val),lx+(side==='left'?-2.5:2.5),(y1+y2)/2,{align:'center',angle:90});
    }
  };

  // ── HELPER: hașuri diagonale într-un dreptunghi ───────────────────────────
  const hasuri = (rx,ry,rw,rh,sp,col) => {
    if(rw<0.5||rh<0.5) return;
    sp = sp||2.5;
    pdf.setDrawColor(...(col||C.wall)); pdf.setLineWidth(0.2);
    // Iterăm diagonale 45° prin dreptunghi
    for(let d=-(rh); d<rw+rh; d+=sp){
      const x1=Math.max(rx, rx+d);
      const y1 = rx+d < rx ? ry+(rx-rx-d) : ry;
      const x2=Math.min(rx+rw, rx+d+rh);
      const y2 = x2===rx+rw ? ry+(rx+rw-(rx+d)) : ry+rh;
      if(x1<rx+rw && x2>rx) pdf.line(x1,y1,x2,y2);
    }
  };

  // ── HELPER: simbol ușă (arc 90°) ────────────────────────────────────────
  const usaSimbol = (x,y,w,wall,open) => {
    // wall: N=sus, S=jos, E=dreapta, V=stanga
    // open: 'L' sau 'R'
    pdf.setDrawColor(...C.black); pdf.setLineWidth(0.35);
    const hw = w/2;
    if(wall==='S'||wall==='N'){
      const dir = open==='R' ? 1 : -1;
      pdf.line(x,y,x+w,y);
      // Arc aproximat cu 3 puncte
      const cx2 = open==='R' ? x : x+w;
      const r=w;
      pdf.ellipse(cx2,y,r,r,'S'); // approximare
    }
    // Simplificat: doar linia ușii + linia perpendiculară indicativă
    pdf.setLineWidth(0.5); pdf.line(x,y,x+w,y);
    pdf.setLineWidth(0.2); pdf.setDrawColor(120,135,155);
    pdf.line(x,y,x,y+(wall==='S'?w:-w));
  };

  // ── HELPER: simbol fereastră (trei linii în gol) ──────────────────────────
  const fereastraSimbol = (x,y,w,wall) => {
    pdf.setDrawColor(70,130,195); pdf.setLineWidth(0.35);
    if(wall==='N'||wall==='S'){
      pdf.line(x,y,x+w,y);
      pdf.line(x,y+0.8,x+w,y+0.8);
      pdf.line(x,y-0.8,x+w,y-0.8);
    } else {
      pdf.line(x,y,x,y+w);
      pdf.line(x+0.8,y,x+0.8,y+w);
      pdf.line(x-0.8,y,x-0.8,y+w);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PLAN NIVEL — funcție centrală cu fond alb + hașuri + simboluri
  // ═══════════════════════════════════════════════════════════════════════════
  const drawPlanAlb = (fl, P_, b_, ox, oy, sc, opts) => {
    opts = opts||{};
    const bW=b_.bW, bD=b_.bD;
    const eW = 0.28*sc; // grosime perete exterior (28cm)
    const iW = 0.14*sc; // perete interior (14cm)

    // Fundal parcelă
    pdf.setFillColor(238,242,250);
    pdf.setDrawColor(...C.gold); pdf.setLineWidth(0.3); pdf.setLineDashPattern([3,2],0);
    pdf.rect(ox-P_.rl*sc, oy-P_.rf*sc, P_.W*sc, P_.D*sc,'FD');
    pdf.setLineDashPattern([],0);

    // Stradă
    const stY=oy+bD*sc+P_.rs*sc;
    pdf.setFillColor(200,205,215); pdf.rect(ox-P_.rl*sc, stY, P_.W*sc, 5,'F');
    pdf.setTextColor(80,90,110); pdf.setFont('helvetica','bold'); pdf.setFontSize(5);
    pdf.text('^ FRONT STRADAL · '+T(P_.frontDir||'N'), ox+bW*sc/2, stY+3.5, {align:'center'});

    // Fundal clădire alb
    pdf.setFillColor(255,255,255);
    pdf.setDrawColor(...C.wall); pdf.setLineWidth(0.2);
    pdf.rect(ox,oy,bW*sc,bD*sc,'F');

    // ── Camere ────────────────────────────────────────────────────────────
    const cfill = {
      living:C.living,bedroom:C.bedroom,bedroom2:C.bedroom,bedroom3:C.bedroom,
      kitchen:C.kitchen,bath:C.bath,wc:C.bath,hall:C.hall,storage:C.hall,
      core:C.core,office:C.office,meeting:C.meeting,commercial:C.commercial,
      reception:C.commercial,balcon:C.balcon,
    };
    fl.rects.sort((a,m_)=>(a.zIdx||0)-(m_.zIdx||0)).forEach(r=>{
      const rx=ox+r.x*sc, ry=oy+r.y*sc, rw=r.w*sc, rh=r.h*sc;
      if(rw<0.5||rh<0.5) return;
      const fc = cfill[r.t]||C.light;
      pdf.setFillColor(...fc);
      pdf.setDrawColor(...C.wall); pdf.setLineWidth(r.t==='core'?0.8:0.4);
      if(r.bal){
        pdf.setLineDashPattern([2,1.5],0);
        pdf.rect(rx,ry,rw,rh,'FD');
        pdf.setLineDashPattern([],0);
      } else {
        pdf.rect(rx,ry,rw,rh,'FD');
      }
      // Hașuri nucleu scări/lift
      if(r.t==='core'){
        hasuri(rx+0.5,ry+0.5,rw-1,rh-1,2.5,[100,130,180]);
      }
      // Label
      if(rw>10&&rh>7){
        pdf.setTextColor(40,55,75); pdf.setFont('helvetica','bold');
        pdf.setFontSize(Math.min(6,rw/4,rh/3));
        pdf.text(T(r.lbl||r.t), rx+rw/2, ry+rh/2-1.5, {align:'center'});
        if(rh>12&&r.w*r.h>2&&!r.bal){
          pdf.setFont('helvetica','normal'); pdf.setFontSize(Math.min(5,rw/5));
          pdf.setTextColor(100,115,135);
          pdf.text(N(r.w*r.h,0)+'m²', rx+rw/2, ry+rh/2+2.5, {align:'center'});
        }
      }
    });

    // ── Perete exterior gros (overdraw cu hașuri) ─────────────────────────
    // Top
    pdf.setFillColor(...C.wallFill);
    pdf.rect(ox-eW, oy-eW, bW*sc+eW*2, eW,'F'); hasuri(ox-eW,oy-eW,bW*sc+eW*2,eW,2.5);
    // Bottom
    pdf.rect(ox-eW, oy+bD*sc, bW*sc+eW*2, eW,'F'); hasuri(ox-eW,oy+bD*sc,bW*sc+eW*2,eW,2.5);
    // Left
    pdf.rect(ox-eW, oy, eW, bD*sc,'F'); hasuri(ox-eW,oy,eW,bD*sc,2.5);
    // Right
    pdf.rect(ox+bW*sc, oy, eW, bD*sc,'F'); hasuri(ox+bW*sc,oy,eW,bD*sc,2.5);

    // Bordura exterioară
    pdf.setDrawColor(...C.black); pdf.setLineWidth(0.9);
    pdf.rect(ox-eW,oy-eW,bW*sc+eW*2,bD*sc+eW*2,'S');

    // ── Ferestre ──────────────────────────────────────────────────────────
    fl.wins.forEach(w=>{
      const wL=(w.w||w.h||1.2)*sc;
      let fx=ox+w.x*sc, fy=oy+w.y*sc;
      if(w.wall==='N')     fereastraSimbol(fx,oy-eW,wL,'N');
      else if(w.wall==='S') fereastraSimbol(fx,oy+bD*sc,wL,'S');
      else if(w.wall==='V') fereastraSimbol(ox-eW,fy,wL,'V');
      else                  fereastraSimbol(ox+bW*sc,fy,wL,'E');
    });

    // ── Cote exterioare ────────────────────────────────────────────────────
    if(!opts.noCote){
      // Sus
      cota(ox-eW, oy-eW, ox+bW*sc+eW, oy-eW, N(b_.bW,2)+'m', 'above');
      // Stânga
      cota(ox-eW, oy-eW, ox-eW, oy+bD*sc+eW, N(b_.bD,2)+'m', 'left');
    }

    // ── Nr. cadastral + info parcelă ────────────────────────────────────
    pdf.setFillColor(240,243,250); pdf.setDrawColor(...C.grid); pdf.setLineWidth(0.2);
    pdf.rect(ox-P_.rl*sc, oy-P_.rf*sc-6, P_.W*sc, 5.5,'FD');
    pdf.setTextColor(50,65,95); pdf.setFont('helvetica','bold'); pdf.setFontSize(5);
    pdf.text(T('Nr. cad. '+P_.nrCad+' · '+P_.W+'m×'+P_.D+'m · '+P_.area+'m² · UTR '+P_.utr), ox+bW*sc/2-P_.rl*sc, oy-P_.rf*sc-2.2, {align:'center'});
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SECȚIUNE — fond alb, hașuri pereți, planșee, usi, scări
  // ═══════════════════════════════════════════════════════════════════════════
  const drawSectAlb = (b_, P_, ox, oy, sc, type) => {
    const niv=b_.niv, hn=P_.hn;
    const sW = (type==='AA' ? b_.bD : b_.bW) * sc;
    const sH = niv * hn * sc;
    const eW = 0.28*sc;

    // Fundal alb
    pdf.setFillColor(255,255,255);
    pdf.setDrawColor(...C.wall); pdf.setLineWidth(0.2);
    pdf.rect(ox,oy,sW,sH,'F');

    // Sol
    pdf.setFillColor(190,195,205);
    pdf.rect(ox-eW*2,oy+sH,sW+eW*4,3.5,'F');
    pdf.setTextColor(80,95,115); pdf.setFont('helvetica','normal'); pdf.setFontSize(5);
    pdf.text('COTA ±0.00 (CTN)', ox, oy+sH+6);

    // Fundație (simplificată)
    pdf.setFillColor(...C.wallFill);
    pdf.rect(ox-eW, oy+sH, eW*1.5, 3,'F');
    pdf.rect(ox+sW-eW*0.5, oy+sH, eW*1.5, 3,'F');

    // Fiecare nivel
    const flrColors=[[255,248,238],[245,255,248],[238,248,255],[252,245,255]];
    for(let i=0;i<niv;i++){
      const fy=oy+sH-(i+1)*hn*sc;
      pdf.setFillColor(...flrColors[i%4]);
      pdf.rect(ox+eW,fy,sW-eW*2,hn*sc,'F');
      // Planșeu (slab)
      pdf.setFillColor(...C.wallFill);
      pdf.rect(ox,fy-1.8,sW,1.8,'F');
      hasuri(ox,fy-1.8,sW,1.8,2,[170,180,195]);
      // Etichetă nivel
      pdf.setTextColor(60,75,95); pdf.setFont('helvetica','bold'); pdf.setFontSize(5);
      pdf.text(i===0?'P':'E'+i, ox-7, fy+hn*sc/2+1.5);
      // Cota înălțime dreapta
      pdf.setTextColor(100,115,135); pdf.setFont('helvetica','normal'); pdf.setFontSize(4.5);
      pdf.text(hn.toFixed(1)+'m', ox+sW+2.5, fy+hn*sc/2+1.5);
      // Linie cota înălțime
      pdf.setDrawColor(...C.dimLine); pdf.setLineWidth(0.2);
      pdf.line(ox+sW+1,fy,ox+sW+8,fy);
      if(i===0) pdf.line(ox+sW+1,fy+hn*sc,ox+sW+8,fy+hn*sc);
    }

    // Pereți exteriori (hașuri)
    pdf.setFillColor(...C.wallFill);
    // Perete stânga
    pdf.rect(ox,oy,eW,sH,'F'); hasuri(ox,oy,eW,sH,2.5);
    // Perete dreapta
    pdf.rect(ox+sW-eW,oy,eW,sH,'F'); hasuri(ox+sW-eW,oy,eW,sH,2.5);

    // Nucleu scări central (dacă există)
    if(b_.cores&&b_.cores.length){
      const core=b_.cores[Math.floor(b_.cores.length/2)];
      const cw=Math.min((core.h||core.w||2.4)*sc, sW*0.25);
      const cx=ox+sW/2-cw/2;
      pdf.setFillColor(215,228,248);
      pdf.rect(cx,oy,cw,sH,'F');
      hasuri(cx,oy,cw,sH,2,[100,130,180]);
      pdf.setDrawColor(...C.blue); pdf.setLineWidth(0.4); pdf.rect(cx,oy,cw,sH,'S');
      // Simboluri trepte
      for(let i=0;i<niv;i++){
        const fy=oy+sH-(i+1)*hn*sc;
        const steps=6, sh2=hn*sc/steps, sw2=cw/steps;
        for(let s=0;s<steps;s++){
          pdf.setDrawColor(100,130,180); pdf.setLineWidth(0.2);
          pdf.line(cx+s*sw2,fy+(s+1)*sh2,cx+(s+1)*sw2,fy+(s+1)*sh2);
        }
        pdf.setTextColor(60,90,150); pdf.setFont('helvetica','normal'); pdf.setFontSize(3.5);
        pdf.text('SCĂRI',cx+cw/2,fy+hn*sc*0.55,{align:'center'});
        if(b_.niv>3){
          pdf.text('LIFT',cx+cw/2,fy+hn*sc*0.72,{align:'center'});
        }
      }
    }

    // Cota totală H
    const totH = (niv*hn).toFixed(1)+'m';
    pdf.setDrawColor(...C.dimLine); pdf.setLineWidth(0.4);
    pdf.line(ox-15,oy,ox-8,oy); pdf.line(ox-15,oy+sH,ox-8,oy+sH); pdf.line(ox-13,oy,ox-13,oy+sH);
    pdf.setTextColor(...C.dimLine); pdf.setFont('helvetica','bold'); pdf.setFontSize(6);
    pdf.text('H='+totH, ox-13, oy+sH/2+2, {align:'center',angle:90});

    // Bordura
    pdf.setDrawColor(...C.black); pdf.setLineWidth(0.9);
    pdf.rect(ox,oy,sW,sH,'S');

    // Titlu secțiune
    pdf.setTextColor(30,45,80); pdf.setFont('helvetica','bold'); pdf.setFontSize(6.5);
    pdf.text(T(type==='AA'?'SECȚIUNE A-A (LONGITUDINALĂ)':'SECȚIUNE B-B (TRANSVERSALĂ)'),
      ox+sW/2, oy-3, {align:'center'});
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PLAN ACOPERIȘ
  // ═══════════════════════════════════════════════════════════════════════════
  const drawAcoperisAlb = (b_, P_, ox, oy, sc) => {
    const bW=b_.bW*sc, bD=b_.bD*sc;
    const overhang=0.6*sc; // streaşină 60cm

    // Contur exterior (inclusiv streaşină)
    pdf.setFillColor(210,215,225);
    pdf.rect(ox-overhang,oy-overhang,bW+overhang*2,bD+overhang*2,'F');
    // Proiecție clădire
    pdf.setFillColor(235,238,245);
    pdf.rect(ox,oy,bW,bD,'F');
    // Coamă (linie centrală)
    pdf.setDrawColor(80,95,115); pdf.setLineWidth(0.7);
    pdf.line(ox+bW/2, oy, ox+bW/2, oy+bD);
    // Linii pantă (diagonale la colțuri)
    pdf.setLineWidth(0.3);
    pdf.line(ox-overhang,oy-overhang,ox+bW/2,oy+bD/2);
    pdf.line(ox+bW+overhang,oy-overhang,ox+bW/2,oy+bD/2);
    pdf.line(ox-overhang,oy+bD+overhang,ox+bW/2,oy+bD/2);
    pdf.line(ox+bW+overhang,oy+bD+overhang,ox+bW/2,oy+bD/2);
    // Streaşină - linie dublă
    pdf.setLineDashPattern([3,2],0);
    pdf.rect(ox,oy,bW,bD,'S');
    pdf.setLineDashPattern([],0);
    pdf.setDrawColor(...C.black); pdf.setLineWidth(0.5);
    pdf.rect(ox-overhang,oy-overhang,bW+overhang*2,bD+overhang*2,'S');
    // Cote
    cota(ox-overhang,oy-overhang,ox+bW+overhang,oy-overhang,N(b_.bW,2)+'m','above');
    cota(ox-overhang,oy-overhang,ox-overhang,oy+bD+overhang,N(b_.bD,2)+'m','left');
    // Label
    pdf.setTextColor(90,105,125); pdf.setFont('helvetica','bold'); pdf.setFontSize(5.5);
    pdf.text('PLAN ACOPERIS · STRES. '+overhang/sc*100+'cm',ox+bW/2,oy+bD/2,{align:'center'});
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PLAN TEREN (site plan)
  // ═══════════════════════════════════════════════════════════════════════════
  const drawTerenAlb = (b_, P_, ox, oy, sc) => {
    // Parcelă
    pdf.setFillColor(235,245,230);
    pdf.setDrawColor(...C.gold); pdf.setLineWidth(0.6);
    pdf.rect(ox,oy,P_.W*sc,P_.D*sc,'FD');
    // Clădire footprint
    pdf.setFillColor(210,215,230);
    pdf.setDrawColor(...C.wall); pdf.setLineWidth(0.5);
    pdf.rect(ox+P_.rl*sc, oy+P_.rf*sc, b_.bW*sc, b_.bD*sc,'FD');
    // Zona verde
    for(let i=0;i<12;i++){
      const tx=ox+4+(i*P_.W*sc/12)%(P_.W*sc-8);
      const ty=oy+oy*0.1+(i*3)%((P_.D-P_.rf-b_.bD-P_.rs)*sc*0.6);
      pdf.setFillColor(100,170,80,0.3);
      pdf.circle(tx,oy+P_.rf*sc+b_.bD*sc+P_.rs*sc*0.3+i%4,1.5,'F');
    }
    // Stradă
    pdf.setFillColor(195,200,210);
    pdf.rect(ox,oy+P_.D*sc,P_.W*sc,8,'F');
    pdf.setTextColor(60,75,95); pdf.setFont('helvetica','bold'); pdf.setFontSize(5);
    pdf.text('STRADA PRINCIPALA',ox+P_.W*sc/2,oy+P_.D*sc+5.5,{align:'center'});
    // Acces principal
    const accX=ox+P_.W*sc/2;
    pdf.setFillColor(212,175,55); pdf.setLineWidth(0.3);
    pdf.triangle(accX-2,oy+P_.D*sc,accX,oy+P_.D*sc-3,accX+2,oy+P_.D*sc,'F');
    // Retrageri - cote
    cota(ox,oy+P_.rf*sc,ox+P_.rl*sc,oy+P_.rf*sc,N(P_.rl,1)+'m','above');
    cota(ox+P_.rl*sc,oy,ox+P_.rl*sc,oy+P_.rf*sc,N(P_.rf,1)+'m','right');
    cota(ox+P_.rl*sc+b_.bW*sc,oy,ox+P_.W*sc,oy+P_.rf*sc,N(P_.rl,1)+'m','above');
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LEGENDĂ + DATE GENERALE
  // ═══════════════════════════════════════════════════════════════════════════
  const drawLegendaDateGenerale = (b_, P_, ox, oy, W_, H_) => {
    const mid = ox + (W_-ox)/2;

    // LEGENDĂ (stânga)
    pdf.setFillColor(...C.light); pdf.setDrawColor(...C.grid); pdf.setLineWidth(0.2);
    pdf.rect(ox,oy,mid-ox-4,H_,'FD');
    pdf.setTextColor(30,45,75); pdf.setFont('helvetica','bold'); pdf.setFontSize(7);
    pdf.text('LEGENDĂ',ox+4,oy+6);

    const items=[
      {fill:C.wallFill,hash:true,label:'Pereți portanți (structurali)'},
      {fill:[245,248,255],hash:false,label:'Pereți neportanți'},
      {fill:[240,245,255],label:'Goluri (uși, ferestre)'},
      {fill:C.core,hash:true,label:'Scară'},
      {fill:C.core,label:'Lift'},
      {fill:null,label:'Acces principal',arrow:true},
    ];
    items.forEach((it,i)=>{
      const iy=oy+12+i*8;
      if(it.fill){
        pdf.setFillColor(...it.fill); pdf.setDrawColor(...C.wall); pdf.setLineWidth(0.3);
        pdf.rect(ox+4,iy-3,6,5,'FD');
        if(it.hash) hasuri(ox+4,iy-3,6,5,2.5);
      } else if(it.arrow){
        pdf.setFillColor(...C.gold); pdf.triangle(ox+7,iy,ox+4.5,iy-3,ox+9.5,iy-3,'F');
      }
      pdf.setTextColor(50,65,90); pdf.setFont('helvetica','normal'); pdf.setFontSize(5.5);
      pdf.text(T(it.label),ox+13,iy+0.5);
    });

    // DATE GENERALE (dreapta)
    pdf.setFillColor(...C.light); pdf.rect(mid,oy,W_-mid,H_,'FD');
    pdf.setTextColor(30,45,75); pdf.setFont('helvetica','bold'); pdf.setFontSize(7);
    pdf.text('DATE GENERALE',mid+4,oy+6);

    const sdaTotal=Math.round(b_.bW*b_.bD*P_.pot*b_.niv);
    const sc2=Math.round(b_.bW*b_.bD*P_.pot);
    const rows=[
      ['Suprafață construită:', sc2+'m²'],
      ['Suprafață desfășurată:', sdaTotal+'m²'],
      ['Regim de înălțime:', 'P+'+( b_.niv-1)+'E'],
      ['Înălțime maximă:', (b_.niv*P_.hn).toFixed(1)+'m'],
      ['POT realizat:', N(P_.pot*100,0)+'%'],
      ['CUT realizat:', N(P_.cut,2)],
      ['Parcelă (nr.cad.):', T(P_.nrCad)],
      ['UTR:', T(P_.utr)],
    ];
    rows.forEach((r,i)=>{
      const ry=oy+12+i*6.8;
      pdf.setFont('helvetica','bold'); pdf.setFontSize(5); pdf.setTextColor(60,75,95);
      pdf.text(T(r[0]),mid+4,ry);
      pdf.setFont('helvetica','normal'); pdf.setTextColor(30,45,75);
      pdf.text(T(r[1]),mid+4+45,ry);
    });
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERARE PAGINI
  // ═══════════════════════════════════════════════════════════════════════════
  const fl0 = _RV.floors[0] || _RV.floors[_RV.floor];   // Parter
  const fl1 = _RV.floors[1] || fl0;                       // Etaj tip

  // Calculăm scala să umple ~2/3 din pagina A3
  const scW = (W*0.55) / b.bW;
  const scH = (H*0.75) / b.bD;
  const sc  = Math.min(scW, scH, 8); // max 8mm/m → 1:125

  const scLabel = 'Sc. 1:'+ Math.round(1000/sc)+'00';
  const ox0=35, oy0=15;

  // ── P1: PLAN PARTER ──────────────────────────────────────────────────────
  newPg(); pdf.setFillColor(...C.bg); pdf.rect(0,0,W,H,'F');
  cartus('01','PLAN PARTER · '+T(b.P?.fn||'rezidential'),scLabel);
  drawPlanAlb(fl0, P, b, ox0, oy0+4, sc);
  nord(W-22, oy0+12, P.frontDir, 7);
  scalaGraf(ox0, oy0+b.bD*sc+P.rs*sc+22, sc, scLabel);

  // ── P2: PLAN ETAJ TIP ────────────────────────────────────────────────────
  newPg(); pdf.setFillColor(...C.bg); pdf.rect(0,0,W,H,'F');
  cartus('02','PLAN ETAJ TIP (E1-E'+(b.niv-1)+')',scLabel);
  drawPlanAlb(fl1, P, b, ox0, oy0+4, sc, {noCote:false});
  nord(W-22, oy0+12, P.frontDir, 7);
  scalaGraf(ox0, oy0+b.bD*sc+P.rs*sc+22, sc, scLabel);

  // ── P3: PLAN ACOPERIȘ ────────────────────────────────────────────────────
  newPg(); pdf.setFillColor(...C.bg); pdf.rect(0,0,W,H,'F');
  cartus('03','PLAN ACOPERIS · PANTA 30°',scLabel);
  drawAcoperisAlb(b, P, ox0+15, oy0+15, sc);
  nord(W-22, oy0+12, P.frontDir, 7);
  scalaGraf(ox0, oy0+b.bD*sc+P.rs*sc+22, sc, scLabel);

  // ── P4: SECȚIUNE A-A ─────────────────────────────────────────────────────
  const scSect = Math.min((W*0.70)/(b.bD), (H*0.75)/(b.niv*P.hn), 8);
  newPg(); pdf.setFillColor(...C.bg); pdf.rect(0,0,W,H,'F');
  cartus('04','SECTIUNE A-A LONGITUDINALA','Sc. 1:'+Math.round(1000/scSect)+'00');
  drawSectAlb(b, P, ox0+10, oy0+10, scSect, 'AA');
  nord(W-22, oy0+12, P.frontDir, 7);

  // ── P5: SECȚIUNE B-B ─────────────────────────────────────────────────────
  const scSect2=Math.min((W*0.55)/(b.bW),(H*0.75)/(b.niv*P.hn),8);
  newPg(); pdf.setFillColor(...C.bg); pdf.rect(0,0,W,H,'F');
  cartus('05','SECTIUNE B-B TRANSVERSALA','Sc. 1:'+Math.round(1000/scSect2)+'00');
  drawSectAlb(b, P, ox0+10, oy0+10, scSect2, 'BB');
  nord(W-22, oy0+12, P.frontDir, 7);

  // ── P6: FAȚADE ────────────────────────────────────────────────────────────
  newPg(); pdf.setFillColor(...C.bg); pdf.rect(0,0,W,H,'F');
  cartus('06','FATADE N·S·E·V · SCHEME ORIENTATIVE','Sc. 1:200');
  const scF=Math.min((W*0.45)/(b.bW),(H*0.40)/(b.niv*P.hn),4);
  const facades=[
    {lbl:'FATADA N (PRINCIPALA)', ox:20, oy:20, w:b.bW},
    {lbl:'FATADA S', ox:W/2+5, oy:20, w:b.bW},
    {lbl:'FATADA E (LATERALA DR.)', ox:20, oy:H/2+5, w:b.bD},
    {lbl:'FATADA V (LATERALA ST.)', ox:W/2+5, oy:H/2+5, w:b.bD},
  ];
  facades.forEach(f=>{
    const fW=f.w*scF, fH=b.niv*P.hn*scF;
    pdf.setFillColor(240,243,250); pdf.rect(f.ox,f.oy,fW,fH,'F');
    for(let i=0;i<b.niv;i++){
      const fy=f.oy+fH-(i+1)*P.hn*scF;
      if(i%2===0){pdf.setFillColor(248,250,255); pdf.rect(f.ox,fy,fW,P.hn*scF,'F');}
      pdf.setFillColor(195,205,218); pdf.rect(f.ox,fy-1.2,fW,1.2,'F');
      pdf.setTextColor(100,115,135); pdf.setFont('helvetica','bold'); pdf.setFontSize(4.5);
      pdf.text(i===0?'P':'E'+i, f.ox-5, fy+P.hn*scF/2+1.5);
      pdf.setTextColor(140,155,175); pdf.setFont('helvetica','normal'); pdf.setFontSize(4);
      pdf.text(P.hn.toFixed(1)+'m', f.ox+fW+1.5, fy+P.hn*scF/2+1.5);
      const wN=Math.max(3,Math.floor(f.w/3.2)),wW2=f.w/wN*0.55*scF,wH2=P.hn*0.42*scF;
      for(let c=0;c<wN;c++){
        const wx=f.ox+c*(fW/wN)+(fW/wN-wW2)/2, wy=fy+(P.hn*scF-wH2)*0.28;
        pdf.setFillColor(195,220,250); pdf.setDrawColor(70,130,195); pdf.setLineWidth(0.3);
        pdf.rect(wx,wy,wW2,wH2,'FD');
        pdf.setFillColor(175,210,245); pdf.rect(wx,wy,wW2,wH2*0.45,'F');
        pdf.setDrawColor(130,175,215); pdf.setLineWidth(0.12);
        pdf.line(wx+wW2/2,wy,wx+wW2/2,wy+wH2);
        pdf.line(wx,wy+wH2/2,wx+wW2,wy+wH2/2);
      }
      const bcy=fy+P.hn*scF*0.82;
      pdf.setFillColor(185,198,215); pdf.rect(f.ox+fW*0.02,bcy,fW*0.96,1.2,'F');
    }
    pdf.setDrawColor(...C.black); pdf.setLineWidth(0.7); pdf.rect(f.ox,f.oy,fW,fH,'S');
    pdf.setDrawColor(90,105,125); pdf.setLineWidth(0.7); pdf.line(f.ox-3,f.oy+fH,f.ox+fW+5,f.oy+fH);
    pdf.setTextColor(60,75,95); pdf.setFont('helvetica','bold'); pdf.setFontSize(5.5);
    pdf.text(T(f.lbl), f.ox, f.oy-2);
    pdf.setDrawColor(...C.dimLine); pdf.setLineWidth(0.3);
    pdf.line(f.ox+fW+2,f.oy,f.ox+fW+2,f.oy+fH);
    pdf.setTextColor(...C.dimLine); pdf.setFont('helvetica','bold'); pdf.setFontSize(5.5);
    pdf.text('H='+(b.niv*P.hn).toFixed(1)+'m', f.ox+fW+4, f.oy+fH/2+2);
    cota(f.ox,f.oy+fH+1,f.ox+fW,f.oy+fH+1,N(f.w,2)+'m','below');
  });
  nord(W-20, 12, P.frontDir, 6);

  // ── P7: PLAN TEREN + LEGENDĂ + DATE GENERALE ─────────────────────────────
  newPg(); pdf.setFillColor(...C.bg); pdf.rect(0,0,W,H,'F');
  cartus('07','PLAN DE INCADRARE IN TEREN · LEGENDA · DATE GENERALE','Sc. 1:500');
  const scT=Math.min((W*0.28)/(P.W),(H*0.72)/(P.D),3);
  drawTerenAlb(b, P, 20, 14, scT);
  nord(20+P.W*scT/2, 14+P.D*scT+12, P.frontDir, 7);
  const lgX=20+P.W*scT+15;
  drawLegendaDateGenerale(b, P, lgX, 14, W-5, H-22);

  // ─────────────────────────────────────────────────────────────────────────
  const filename='planseA3_'+T(P.nrCad||'urbanx')+'_'+T(P.utr||'UTR')+'.pdf';
  pdf.save(filename.replace(/[^a-zA-Z0-9._-]/g,'_'));
  if(typeof ss==='function') ss('✅ Planșe A3 generate: '+pgN+' pagini — '+filename);

  const btn=document.getElementById('rv-planseA3-btn');
  if(btn) btn.innerHTML='📐 Planșe A3';
}
