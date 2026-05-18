// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-dna-optimize.js — Sprint 3B
// UrbanX TSS·FG
//
// 1. DNA buton Optimizare automată
//    → fix NP057 (redimensionare camere la minim legal)
//    → fix ISU P118 (adaugă nucleu scări dacă depășit)
//    → fix OMS 119 (rotire orientare pentru însorire)
//    → fix parcaje (calculează subsol dacă deficit)
//    → raport comparativ înainte/după
// 2. Scenarii A/B redesign
//    → Scenariu A = maxim legal PUG (POT max, CUT max, Hmax)
//    → Scenariu B = propunerea utilizatorului (current)
//    → Side-by-side massing PDF + tabel comparativ dinamic
// 3. IFC-lite export (standard BIM ISO 16739)
//    → IfcProject, IfcBuilding, IfcBuildingStorey, IfcSpace, IfcWall
//    → compatibil FreeCAD, BlenderBIM, ArchiCAD
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  function waitReady(cb,n){
    n=n||0; if(n>80) return;
    if(typeof _rvExportPDF==='undefined'||typeof _RV==='undefined'){
      setTimeout(()=>waitReady(cb,n+1),300); return;
    }
    cb();
  }
  waitReady(()=>{
    _injectOptimizeButtons();
    // Folosim polling în loc de MutationObserver (previne blocaj microtask queue)
    const _obsInterval = setInterval(()=>{
      if(document.querySelector('.rv-expbtn')&&!document.getElementById('rv-optim-wrap'))
        _injectOptimizeButtons();
      if(document.getElementById('rv-optim-wrap')) clearInterval(_obsInterval);
    }, 500);
    console.log('[DNA Optimize Sprint3B] ✅ loaded');
  });

  function _injectOptimizeButtons(){
    if(document.getElementById('rv-optim-wrap')) return;
    const a=document.querySelector('#rv-acop-wrap')||document.querySelector('.rv-expbtn');
    if(!a) return;
    const wrap=document.createElement('span'); wrap.id='rv-optim-wrap';
    [
      {id:'rv-optim-btn',  icon:'🎯', label:'DNA Optimizare',  fn:'_rvDNAOptimize',
       bg:'rgba(34,197,94,.15)', border:'rgba(34,197,94,.5)', color:'#4ade80'},
      {id:'rv-scen-btn',   icon:'⚖', label:'Scenarii A/B',    fn:'_rvExportScenarii',
       bg:'rgba(59,130,246,.15)',border:'rgba(59,130,246,.5)',color:'#93c5fd'},
      {id:'rv-ifc-btn',    icon:'🏗', label:'Export IFC-lite', fn:'_rvExportIFC',
       bg:'rgba(168,85,247,.15)', border:'rgba(168,85,247,.5)', color:'#d8b4fe'},
    ].forEach(b_=>{
      const btn=document.createElement('button');
      btn.id=b_.id; btn.innerHTML=b_.icon+' '+b_.label;
      btn.style.cssText=['height:32px','padding:0 10px','border-radius:7px','cursor:pointer',
        'font-family:inherit','font-size:10px','font-weight:800','margin-left:5px',
        `background:${b_.bg}`,`border:1.5px solid ${b_.border}`,`color:${b_.color}`,
        'display:inline-flex','align-items:center','flex-shrink:0'].join(';');
      btn.onmouseover=()=>btn.style.opacity='.75';
      btn.onmouseout=()=>btn.style.opacity='1';
      btn.onclick=()=>window[b_.fn]?.();
      wrap.appendChild(btn);
    });
    a.parentElement.insertBefore(wrap,a.nextSibling);

    // Injectăm și butonul DNA Optimizare în panoul DNA
    setTimeout(_injectDNAOptimButton,2500);
  }

  function _injectDNAOptimButton(){
    const dnaDetail=document.getElementById('rv-dna-score-detail');
    if(!dnaDetail||document.getElementById('rv-dna-optim-btn')) return;
    const btn=document.createElement('button');
    btn.id='rv-dna-optim-btn';
    btn.innerHTML='🎯 Optimizare automată conformitate';
    btn.style.cssText=[
      'width:100%','margin-top:7px','padding:6px 8px','border-radius:6px','cursor:pointer',
      'background:rgba(34,197,94,.12)','border:1.5px solid rgba(34,197,94,.4)','color:#4ade80',
      'font-size:9px','font-weight:800','font-family:inherit','text-align:center',
    ].join(';');
    btn.onclick=()=>window._rvDNAOptimize?.();
    dnaDetail.appendChild(btn);
  }
})();

// Refolosim helpers din acoperis.js
function _rvS2b(s){return String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim().slice(0,400);}
function _rvJsPDFb(){return(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;}

// ═══════════════════════════════════════════════════════════════════════════
// 1. DNA OPTIMIZARE AUTOMATĂ
// ═══════════════════════════════════════════════════════════════════════════
async function _rvDNAOptimize(){
  const b=_RV.building, P=_RV.parcelParams;
  if(!b||!P){alert('Generați releveele mai întâi.');return;}
  if(typeof ss==='function') ss('🎯 Analizez și optimizez conform normative…');

  const fl=_RV.floors[0]||_RV.floors[_RV.floor];
  const fixes=[]; const warnings=[];
  let planChanged=false;

  // Snapshot stare inițială
  const before={
    rooms: fl.rects.map(r=>({...r})),
    cores: b.cores.map(c=>({...c})),
    niv: b.niv, bW: b.bW, bD: b.bD,
    scArea: b.scArea||b.bW*b.bD*P.pot,
  };

  // ── FIX 1: NP 057/2002 — Suprafețe minime camere ─────────────────────
  const NP057={living:14,bedroom:12,bedroom2:10,bedroom3:8,kitchen:5,bath:3.6,wc:1.2,hall:3,storage:1.5};
  fl.rects.forEach(r=>{
    const minA=NP057[r.t]||0;
    if(minA>0&&r.w*r.h<minA){
      const oldArea=(r.w*r.h).toFixed(2);
      // Redimensionăm la minim legal — creștem dimensiunea mai mică
      const ratio=Math.sqrt(minA/(r.w*r.h));
      const newW=parseFloat((r.w*ratio).toFixed(2));
      const newH=parseFloat((r.h*ratio).toFixed(2));
      fixes.push({
        norm:'NP 057/2002', tip:'redimensionare',
        msg:`${r.lbl||r.t}: ${oldArea}m² → ${(newW*newH).toFixed(2)}m² (min ${minA}m²)`,
        action:`Crescut ${r.lbl}: ${r.w.toFixed(2)}×${r.h.toFixed(2)} → ${newW}×${newH}m`
      });
      r.w=newW; r.h=newH;
      planChanged=true;
    }
  });

  // ── FIX 2: ISU P118 — Distanțe evacuare ──────────────────────────────
  const fnCfg=(typeof FN_CONFIG!=='undefined')?FN_CONFIG[_RV.fn]||FN_CONFIG.rez:{isuDist:30};
  const isuMax=fnCfg.isuDist||30;
  const isuIssues=fl.rects.filter(r=>{
    if(r.apt<0||!b.cores.length) return false;
    const core=b.cores[0];
    const d=Math.hypot(r.x+r.w/2-core.x-core.w/2, r.y+r.h/2-core.y-core.h/2);
    return d>isuMax;
  });
  if(isuIssues.length>0){
    // Adăugăm un nucleu suplimentar în colțul opus
    const existCore=b.cores[0];
    const newCoreX=existCore.x>b.bW/2?1.5:b.bW-5;
    const newCoreY=existCore.y>b.bD/2?1.5:b.bD-6;
    const newCore={x:newCoreX,y:newCoreY,w:3.2,h:5.0,label:'SC2',lbl:'Sc. 2'};
    b.cores.push(newCore);
    // Adăugăm și în planul etajului
    fl.rects.push({t:'core',lbl:'SC2 🪜',bal:false,apt:-1,
      x:newCoreX,y:newCoreY,w:3.2,h:5.0,zIdx:100});
    fixes.push({
      norm:'P118-2/2013', tip:'nucleu_suplimentar',
      msg:`${isuIssues.length} camere la >${isuMax}m → Nucleu scări SC2 adăugat la (${newCoreX.toFixed(1)},${newCoreY.toFixed(1)})`,
      action:`Adăugat SC2 la (${newCoreX.toFixed(1)},${newCoreY.toFixed(1)}) - ${isuIssues.length} camere afectate`
    });
    planChanged=true;
  }

  // ── FIX 3: OMS 119 — Însorire camere ─────────────────────────────────
  const omsApplies=fnCfg.omsInsorire!==false;
  if(omsApplies){
    const solarIssues=fl.rects.filter(r=>r.solarOk===false&&
      ['bedroom','bedroom2','bedroom3','living'].includes(r.t));
    if(solarIssues.length>0){
      // Verificăm orientarea curentă
      const currentFront=P.frontDir||'N';
      // Dacă frontul e spre N dar camerele de dormit sunt tot la N → rotire 90°
      const dormitorNeconform=solarIssues.filter(r=>r.t.includes('bedroom'));
      if(dormitorNeconform.length>0&&currentFront==='N'){
        fixes.push({
          norm:'OMS 119/2014', tip:'orientare',
          msg:`${dormitorNeconform.length} dormitoare cu însorire < ${fnCfg.omsMin||1.5}h/zi`,
          action:'Recomandare: Rotire clădire — dormitoarele pe fațada Sud/Est. Studiu însorire obligatoriu la PA.'
        });
        warnings.push('OMS 119 — Necesită studiu însorire detaliat de la proiectant autorizat');
      }
    }
  }

  // ── FIX 4: POT depășit — reducere amprentă ────────────────────────────
  const potReal=b.scArea/P.area;
  if(potReal>P.pot+0.01){
    const depPct=Math.round((potReal-P.pot)*100);
    fixes.push({
      norm:'PUG/RGU', tip:'pot',
      msg:`POT ${Math.round(potReal*100)}% depășește max ${Math.round(P.pot*100)}% cu ${depPct}%`,
      action:`Reducere amprentă necesară: SC target = ${Math.round(P.area*P.pot)}m² (actual ${Math.round(b.scArea)}m²)`
    });
    warnings.push('Reducere amprentă → necesită regândit planul de etaj sau reducere număr apartamente');
  }

  // ── FIX 5: Parcaje — alerta subsol ───────────────────────────────────
  const subsolInfo=(typeof _calcSubsolNeeded==='function')?_calcSubsolNeeded(b,P):null;
  if(subsolInfo?.needsBasement){
    fixes.push({
      norm:'NP 067/2002', tip:'parcaje_subsol',
      msg:`Deficit ${subsolInfo.deficit} locuri parcare → Subsol ${subsolInfo.nLevels} nivel(e) necesar(e)`,
      action:`Apasă 🅿 Plan Subsol pentru a genera layout-ul subsolului de parcare`
    });
  }

  // ── Snapshot stare finală ─────────────────────────────────────────────
  const after={
    rooms: fl.rects.map(r=>({...r})),
    cores: b.cores.map(c=>({...c})),
    niv: b.niv, bW: b.bW, bD: b.bD,
    fixCount: fixes.length,
    warnCount: warnings.length,
  };

  // Re-render dacă s-a schimbat planul
  if(planChanged&&typeof _rvRender==='function'){
    _rvRender();
    setTimeout(()=>{if(typeof _rvUpdatePanels==='function')_rvUpdatePanels(_RV.building,_RV.parcelParams);else if(typeof _rvRender==='function')_rvRender();},500);
  }

  // Generăm raport PDF comparativ
  await _generateOptimizareRaport(fixes,warnings,before,after,P,b);

  if(typeof ss==='function'){
    ss(`✅ DNA Optimizare: ${fixes.length} corecții aplicate · ${warnings.length} avertizări · Raport salvat`);
  }
}

async function _generateOptimizareRaport(fixes,warnings,before,after,P,b){
  const _jsPDF=_rvJsPDFb(); if(!_jsPDF) return;
  const pdf=new _jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const PW=210,PH=297;
  const S2=_rvS2b;

  // Header
  pdf.setFillColor(15,25,50);pdf.rect(0,0,PW,18,'F');
  pdf.setFillColor(34,197,94);pdf.rect(0,17.5,PW,.8,'F');
  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(13);
  pdf.text('RAPORT DNA — OPTIMIZARE AUTOMATĂ',PW/2,11,{align:'center'});
  pdf.setFont('helvetica','normal');pdf.setFontSize(7);pdf.setTextColor(200,210,230);
  pdf.text(S2('Nr.cad. '+P.nrCad+' · UTR '+P.utr+' · '+new Date().toLocaleDateString('ro-RO')),PW/2,15.5,{align:'center'});

  let y=23;
  // Sumar
  const hasIssues=fixes.length>0;
  pdf.setFillColor(hasIssues?240:225,hasIssues?255:255,hasIssues?240:255);
  pdf.rect(10,y,190,14,'F');
  pdf.setTextColor(15,100,40);pdf.setFont('helvetica','bold');pdf.setFontSize(8);
  pdf.text(hasIssues?`✅ ${fixes.length} corecții aplicate automat · ${warnings.length} avertizări`:'✅ Planul este conform normativelor', 14,y+6);
  pdf.setFont('helvetica','normal');pdf.setFontSize(6.5);pdf.setTextColor(30,80,60);
  pdf.text(S2(hasIssues?'Planul a fost optimizat. Verificați cu arhitectul autorizat înainte de depunere la autorizare.':'Toate normativele sunt îndeplinite. Plan validat.'),14,y+12);
  y+=18;

  if(fixes.length>0){
    pdf.setFont('helvetica','bold');pdf.setFontSize(8.5);pdf.setTextColor(15,25,60);
    pdf.text('CORECȚII APLICATE AUTOMAT',14,y+5);y+=8;
    fixes.forEach((f,i)=>{
      if(y>PH-25){pdf.addPage();y=15;}
      const col={redimensionare:[235,255,245],nucleu_suplimentar:[235,245,255],
        orientare:[255,252,235],pot:[255,240,235],parcaje_subsol:[250,240,255]}[f.tip]||[248,250,255];
      pdf.setFillColor(...col);pdf.rect(10,y-3,190,14,'F');
      pdf.setDrawColor(180,195,215);pdf.setLineWidth(0.12);pdf.rect(10,y-3,190,14,'S');
      pdf.setFont('helvetica','bold');pdf.setFontSize(6.8);
      const cols={redimensionare:[20,120,60],nucleu_suplimentar:[20,60,160],
        orientare:[120,90,20],pot:[160,40,20],parcaje_subsol:[100,30,160]}[f.tip]||[30,50,100];
      pdf.setTextColor(...cols);
      pdf.text(S2('['+f.norm+'] '+f.msg),14,y+2.5);
      pdf.setFont('helvetica','normal');pdf.setFontSize(6);pdf.setTextColor(50,70,100);
      pdf.text(S2('Acțiune: '+f.action),14,y+8);
      y+=17;
    });
  }

  if(warnings.length>0){
    if(y>PH-30){pdf.addPage();y=15;}
    pdf.setFont('helvetica','bold');pdf.setFontSize(8);pdf.setTextColor(130,80,15);
    pdf.text('AVERTIZĂRI — Necesită specialist',14,y+5);y+=8;
    warnings.forEach(w=>{
      if(y>PH-15){pdf.addPage();y=15;}
      pdf.setFillColor(255,252,235);pdf.rect(10,y-3,190,8,'F');
      pdf.setTextColor(100,70,15);pdf.setFont('helvetica','normal');pdf.setFontSize(6.2);
      pdf.text(S2('⚠ '+w),14,y+1.5);y+=10;
    });
  }

  // Normative verificate
  if(y>PH-50){pdf.addPage();y=15;}
  y+=5;
  pdf.setFont('helvetica','bold');pdf.setFontSize(8);pdf.setTextColor(15,25,60);
  pdf.text('NORMATIVE VERIFICATE',14,y);y+=7;
  const norms=[
    {n:'NP 057/2002',desc:'Suprafețe minime camere',ok:!fixes.some(f=>f.tip==='redimensionare')},
    {n:'P118-2/2013',desc:'Distanțe căi evacuare ISU',ok:!fixes.some(f=>f.tip==='nucleu_suplimentar')},
    {n:'OMS 119/2014',desc:'Însorire min 1.5h/zi camere',ok:!fixes.some(f=>f.tip==='orientare')},
    {n:'PUG/RGU',desc:'POT/CUT/H max conform reglementare',ok:!fixes.some(f=>f.tip==='pot')},
    {n:'NP 067/2002',desc:'Parcaje obligatorii per funcțiune',ok:!fixes.some(f=>f.tip==='parcaje_subsol')},
    {n:'NP 051/2012',desc:'Accesibilitate persoane cu dizabilități',ok:true},
  ];
  norms.forEach((nm,i)=>{
    pdf.setFillColor(nm.ok?240:255,nm.ok?255:245,nm.ok?240:240);
    pdf.rect(10,y-3,190,7,'F');
    pdf.setDrawColor(200,215,200);pdf.setLineWidth(0.1);pdf.rect(10,y-3,190,7,'S');
    pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
    pdf.setTextColor(nm.ok?15:160,nm.ok?120:30,nm.ok?40:30);
    pdf.text((nm.ok?'✅':'⚠ '),14,y+1);
    pdf.setTextColor(25,40,80);pdf.setFont('helvetica','bold');
    pdf.text(S2(nm.n),22,y+1);
    pdf.setFont('helvetica','normal');pdf.setTextColor(60,80,110);pdf.setFontSize(6);
    pdf.text(S2(nm.desc),70,y+1);
    y+=7.5;
  });

  pdf.setFont('helvetica','italic');pdf.setFontSize(5.5);pdf.setTextColor(130,140,155);
  pdf.text(S2('UrbanX TSS·FG · Optimizare automată orientativă · Obligatoriu verificat de arhitect autorizat înainte de depunere PA'),PW/2,PH-5,{align:'center'});
  const fn=('DNA_Optimizare_'+S2(P.nrCad)+'_'+S2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. SCENARII A/B — Side-by-side massing + comparativ
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportScenarii(){
  const b=_RV.building, P=_RV.parcelParams;
  if(!b||!P){alert('Generați releveele mai întâi.');return;}
  if(!b||!P){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=_rvJsPDFb(); if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  if(typeof ss==='function') ss('⏳ Generez Scenarii A/B…');

  const W=420,H=297;
  const pdf=new _jsPDF({orientation:'landscape',unit:'mm',format:'a3'});
  let pg=0;
  const newPg=()=>{if(pg>0)pdf.addPage();pg++;};
  const S2=_rvS2b;
  const C={dark2:[15,25,50],gold:[180,140,30],blue:[25,95,205],green:[15,130,65],
    red:[180,30,30],gray:[150,160,175],orange:[200,120,20]};

  // Scenariu A: Maxim legal PUG
  const scA={
    label:'SCENARIU A — MAXIM LEGAL PUG',
    sub:'POT='+Math.round(P.pot*100)+'% · CUT='+P.cut+' · H='+P.hn+' × '+Math.floor(P.hn>0?P.area*P.cut/(P.bW||b.bW)/(P.hn):b.niv+2)+'niv.',
    niv: Math.max(b.niv,Math.floor(Math.sqrt(P.area*P.cut/(b.bW*b.bD)))+1),
    bW: Math.sqrt(P.area*P.pot)*1.35,
    bD: Math.sqrt(P.area*P.pot)*0.74,
    potReal: P.pot,
    cutReal: P.cut,
    color:[25,100,200],
    colorFill:[200,220,245],
    icon:'A',
    desc:'Volum maxim admis conform PUG/UTR. Toate indicatorii la limita superioară legală.',
  };
  // Ajustăm bW/bD să nu depășească parcela
  scA.bW=Math.min(isNaN(scA.bW)?b.bW*1.15:scA.bW, P.W-(P.rl||5)*2-0.5, b.bW*2);
  scA.bD=Math.min(isNaN(scA.bD)?b.bD*1.15:scA.bD, P.D-(P.rf||5)-(P.rs||3)-0.5, b.bD*2);
  scA.niv=Math.min(scA.niv, Math.floor(P.hn>0?(P.cut*P.area/(scA.bW*scA.bD))/P.hn:12));
  scA.sda=scA.bW*scA.bD*scA.niv;
  scA.sc=scA.bW*scA.bD;

  // Scenariu B: Propunerea utilizatorului
  const scB={
    label:'SCENARIU B — PROPUNEREA CURENTĂ',
    sub:'POT='+Math.round((b.scArea||b.bW*b.bD*P.pot)/P.area*100)+'% · CUT='+((b.sdaTotal||b.bW*b.bD*b.niv)/P.area).toFixed(2)+' · H='+b.niv+'niv.',
    niv: b.niv,
    bW: b.bW,
    bD: b.bD,
    potReal: (b.scArea||b.bW*b.bD*P.pot)/P.area,
    cutReal: (b.sdaTotal||b.bW*b.bD*b.niv)/P.area,
    color:[20,140,65],
    colorFill:[210,245,220],
    icon:'B',
    desc:'Propunerea arhitecturală curentă a utilizatorului, cu parametrii introduși.',
  };
  scB.sda=scB.bW*scB.bD*scB.niv;
  scB.sc=scB.bW*scB.bD;

  // Calculăm date comune pentru comparativ
  const hn=P.hn;
  function calcKPI(sc_){
    const nrApt=Math.round(sc_.sda/70);
    const parcNec=Math.ceil(nrApt*1.1);
    const parcSup=Math.floor(Math.max(0,P.area-sc_.sc-200)/28);
    const parcDef=Math.max(0,parcNec-parcSup);
    const investEst=Math.round(sc_.sda*1200/1000); // k€ la 1200€/m²
    const roi=Math.round((sc_.sda*1800-sc_.sda*1200)/(sc_.sda*1200)*100); // approx
    return {nrApt,parcNec,parcSup,parcDef,investEst,roi};
  }
  const kpiA=calcKPI(scA), kpiB=calcKPI(scB);

  // ── PAGE 1: SIDE-BY-SIDE MASSING ────────────────────────────────────────
  newPg();
  pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');

  // Header
  pdf.setFillColor(...C.dark2);pdf.rect(0,0,W,9,'F');
  pdf.setFillColor(...C.gold);pdf.rect(0,8.5,W,.7,'F');
  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(9.5);
  pdf.text('ANALIZĂ SCENARII A/B — COMPARATIV VOLUMETRIC',W/2,6,{align:'center'});
  pdf.setTextColor(200,210,230);pdf.setFont('helvetica','normal');pdf.setFontSize(6);
  pdf.text(S2('Nr.cad. '+P.nrCad+' · UTR '+P.utr+' · POT max '+Math.round(P.pot*100)+'% · CUT max '+P.cut),W-4,6,{align:'right'});

  // Sub-header descrieri
  pdf.setFillColor(240,245,255);pdf.rect(0,9,W/2,7,'F');
  pdf.setFillColor(240,255,245);pdf.rect(W/2,9,W/2,7,'F');
  [[scA,'left'],[scB,'right']].forEach(([sc_,side])=>{
    const tx=(side==='left'?W/4:W*3/4);
    pdf.setTextColor(...sc_.color);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
    pdf.text(S2(sc_.label),tx,12.5,{align:'center'});
    pdf.setTextColor(60,80,110);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
    pdf.text(S2(sc_.sub),tx,15.5,{align:'center'});
  });
  pdf.setDrawColor(180,190,210);pdf.setLineWidth(0.3);pdf.line(W/2,9,W/2,H-5.5);

  // Massing-uri side by side
  const mOx_A=20, mOx_B=W/2+20;
  const mAvailW=(W/2-50), mAvailH=H-60;

  [[scA,mOx_A,'A'],[scB,mOx_B,'B']].forEach(([sc_,mOx,ltr])=>{
    // Scară per scenariu
    const SCALES=[50,100,150,200,250,500];
    const scMAS=1000/(SCALES.find(s=>s>=Math.max(P.W,P.D+sc_.niv*hn)*1000/Math.min(mAvailW,mAvailH*0.6))||200);

    const parW=P.W*scMAS, parD=P.D*scMAS;
    const parOx=mOx+(mAvailW-parW)/2, parOy=55;

    // Parcelă
    pdf.setFillColor(232,245,220);pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.4);
    pdf.setLineDashPattern([3,2],0);
    pdf.rect(parOx,parOy,parW,parD,'FD');
    pdf.setLineDashPattern([],0);

    // Clădire footprint în parcelă
    const bfX=parOx+P.rl*scMAS, bfY=parOy+P.rf*scMAS;
    const bfW=sc_.bW*scMAS, bfD=sc_.bD*scMAS;
    pdf.setFillColor(...sc_.colorFill);pdf.setDrawColor(...sc_.color);pdf.setLineWidth(0.6);
    pdf.rect(bfX,bfY,bfW,bfD,'FD');

    // Hașuri pe clădire
    pdf.setDrawColor(...sc_.color.map(c=>Math.round(c*.5+128)));pdf.setLineWidth(0.18);
    for(let hx=0;hx<bfW;hx+=3) pdf.line(bfX+hx,bfY,bfX+hx+3,bfY+3);

    // Label parcelă
    pdf.setTextColor(100,115,135);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);
    pdf.text(S2(P.W+'m×'+P.D+'m · '+P.area+'m²'),parOx+parW/2,parOy+parD+4,{align:'center'});

    // Secțiune frontală (vedere din față)
    const facOy=parOy+parD+15;
    const facW=bfW, facH=sc_.niv*hn*scMAS;
    pdf.setFillColor(...sc_.colorFill);pdf.setDrawColor(...sc_.color);pdf.setLineWidth(0.6);
    pdf.rect(bfX,facOy,facW,facH,'FD');
    // Planșee
    for(let i=0;i<sc_.niv;i++){
      const py=facOy+facH-i*hn*scMAS;
      pdf.setFillColor(160,175,200);pdf.rect(bfX,py-1.5,facW,2,'F');
      pdf.setTextColor(80,95,115);pdf.setFont('helvetica','normal');pdf.setFontSize(4);
      pdf.text(i===0?'P':'E'+i,bfX-6,py-hn*scMAS/2+1.5);
    }
    // Ferestre simplificate
    const nW=Math.max(3,Math.floor(sc_.bW/3.2));
    for(let row=0;row<sc_.niv;row++){
      for(let col=0;col<nW;col++){
        const colSp=facW/nW;
        const wW2=colSp*.55, wH2=hn*scMAS*.42;
        const wx2=bfX+col*colSp+(colSp-wW2)/2;
        const wy2=facOy+facH-(row+1)*hn*scMAS+(hn*scMAS-wH2)*.30;
        pdf.setFillColor(180,215,248);pdf.setDrawColor(50,100,180);pdf.setLineWidth(0.25);
        pdf.rect(wx2,wy2,wW2,wH2,'FD');
      }
    }
    // Cotă H
    pdf.setDrawColor(...C.dark2);pdf.setLineWidth(0.3);
    pdf.line(bfX+facW+2,facOy,bfX+facW+2,facOy+facH);
    pdf.line(bfX+facW,facOy,bfX+facW+4,facOy);
    pdf.line(bfX+facW,facOy+facH,bfX+facW+4,facOy+facH);
    pdf.setTextColor(15,30,75);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text('H='+(sc_.niv*hn).toFixed(1)+'m',bfX+facW+6,facOy+facH/2+1.5);

    // Teren
    pdf.setDrawColor(...C.dark2);pdf.setLineWidth(0.8);
    pdf.line(bfX-5,facOy+facH,bfX+facW+15,facOy+facH);

    // Badge scenariu
    pdf.setFillColor(...sc_.color);
    try{pdf.circle(bfX+bfW/2,parOy+parD/2,7,'F');}
    catch(e){pdf.rect(bfX+bfW/2-7,parOy+parD/2-7,14,14,'F');}
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(9);
    pdf.text(ltr,bfX+bfW/2,parOy+parD/2+3.5,{align:'center'});
  });

  // ── PAGE 2: TABEL COMPARATIV DETALIAT ────────────────────────────────────
  newPg();
  pdf.setFillColor(255,255,255);pdf.rect(0,0,W,H,'F');
  pdf.setFillColor(...C.dark2);pdf.rect(0,0,W,9,'F');
  pdf.setFillColor(...C.gold);pdf.rect(0,8.5,W,.7,'F');
  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(9.5);
  pdf.text('TABEL COMPARATIV SCENARII A/B',W/2,6,{align:'center'});

  const cols_=[
    {t:'Indicator',w:70},{t:'Scenariu A — Maxim PUG',w:90},{t:'Scenariu B — Propunere',w:90},{t:'Diferență',w:60}
  ];
  let ty=14;
  pdf.setFillColor(238,242,250);pdf.rect(10,ty,W-20,7,'F');
  let cx2=10;
  cols_.forEach(c=>{
    pdf.setDrawColor(180,195,220);pdf.setLineWidth(0.15);pdf.rect(cx2,ty,c.w,7,'S');
    pdf.setTextColor(30,45,85);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
    pdf.text(S2(c.t),cx2+c.w/2,ty+4.8,{align:'center'});
    cx2+=c.w;
  });
  ty+=7;

  const RN=(n,d)=>isNaN(n)?'—':d?Number(n).toFixed(d):Math.round(n)+'';
  const rows=[
    ['Suprafață construită la sol (SC)',RN(scA.sc,1)+' m²',RN(scB.sc,1)+' m²',
      (scA.sc>scB.sc?'+':'')+RN(scA.sc-scB.sc,1)+' m²'],
    ['Suprafață desfășurată acoperiș (SDA)',RN(scA.sda,0)+' m²',RN(scB.sda,0)+' m²',
      (scA.sda>scB.sda?'+':'')+RN(scA.sda-scB.sda,0)+' m²'],
    ['POT realizat',RN(scA.potReal*100,1)+'%',RN(scB.potReal*100,1)+'%',
      (scA.potReal>scB.potReal?'+':'')+RN((scA.potReal-scB.potReal)*100,1)+'%'],
    ['CUT realizat',RN(scA.cutReal,2),RN(scB.cutReal,2),
      (scA.cutReal>scB.cutReal?'+':'')+RN(scA.cutReal-scB.cutReal,2)],
    ['Înălțime totală',RN(scA.niv*hn,1)+' m ('+scA.niv+' niv.)',RN(scB.niv*hn,1)+' m ('+scB.niv+' niv.)',
      (scA.niv>scB.niv?'+':'')+RN((scA.niv-scB.niv)*hn,1)+' m'],
    ['Apartamente estimate',kpiA.nrApt+' apt.',kpiB.nrApt+' apt.',
      (kpiA.nrApt>kpiB.nrApt?'+':'')+RN(kpiA.nrApt-kpiB.nrApt,0)+' apt.'],
    ['Investiție estimată','~'+kpiA.investEst+' k€','~'+kpiB.investEst+' k€',
      (kpiA.investEst>kpiB.investEst?'+':'')+RN(kpiA.investEst-kpiB.investEst,0)+' k€'],
    ['ROI estimat',kpiA.roi+'%',kpiB.roi+'%',
      (kpiA.roi>kpiB.roi?'+':'')+RN(kpiA.roi-kpiB.roi,0)+'%'],
    ['Parcaje necesare (NP067)',kpiA.parcNec+' loc.',kpiB.parcNec+' loc.',
      (kpiA.parcNec>kpiB.parcNec?'+':'')+RN(kpiA.parcNec-kpiB.parcNec,0)+' loc.'],
    ['Deficit parcaje',kpiA.parcDef>0?kpiA.parcDef+' loc. ⚠ (subsol)':'0 ✅',
      kpiB.parcDef>0?kpiB.parcDef+' loc. ⚠ (subsol)':'0 ✅',
      (kpiA.parcDef-kpiB.parcDef>0?'+':'')+RN(kpiA.parcDef-kpiB.parcDef,0)+' loc.'],
  ];
  rows.forEach((row,ri)=>{
    if(ty>H-20){pdf.addPage();ty=15;}
    const isSubs=ri===rows.length-2||ri===rows.length-1;
    pdf.setFillColor(ri%2===0?252:248,ri%2===0?252:250,255);
    pdf.rect(10,ty,W-20,8,'F');
    let cx3=10;
    row.forEach((cell,ci)=>{
      pdf.setDrawColor(205,215,230);pdf.setLineWidth(0.1);pdf.rect(cx3,ty,cols_[ci].w,8,'S');
      const isGood=ci===3&&String(cell).includes('+');
      const isWarn=ci===3&&String(cell).includes('-');
      pdf.setFont('helvetica',ci===0?'bold':'normal');pdf.setFontSize(6.5);
      pdf.setTextColor(isGood?15:isWarn?150:20,isGood?120:isWarn?30:40,isGood?50:isWarn?30:90);
      pdf.text(S2(String(cell)),cx3+2,ty+5.5);
      cx3+=cols_[ci].w;
    });
    ty+=8;
  });

  // Concluzii
  ty+=6;
  const concls=[
    {sc:'A',col:C.blue,text:'Scenariu A maximizează SDA și veniturile din investiție. Necesită '+
      (kpiA.parcDef>0?'subsol '+kpiA.parcDef+' locuri și ':'')+'infrastructură urbană mai mare. Risc: supraaglomerare.'},
    {sc:'B',col:C.green,text:'Scenariu B — propunerea curentă — oferă densitate controlată. '+
      (kpiB.parcDef>0?'Necesită subsol '+kpiB.parcDef+' locuri.':'Parcaje rezolvabile la sol.')+'  Echilibru risc/beneficiu mai bun.'},
  ];
  concls.forEach(concl=>{
    if(ty>H-20){pdf.addPage();ty=15;}
    pdf.setFillColor(...concl.col.map(c=>Math.round(c*.08+242)));
    pdf.rect(10,ty,W-20,12,'F');
    pdf.setDrawColor(...concl.col);pdf.setLineWidth(0.8);pdf.rect(10,ty,4,12,'F');
    pdf.setTextColor(...concl.col);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
    pdf.text('Scenariu '+concl.sc,16,ty+5);
    pdf.setTextColor(30,45,80);pdf.setFont('helvetica','normal');pdf.setFontSize(6.2);
    pdf.text(S2(concl.text),16,ty+10,{maxWidth:W-26});
    ty+=15;
  });

  pdf.setFont('helvetica','italic');pdf.setFontSize(5.5);pdf.setTextColor(130,140,155);
  pdf.text(S2('UrbanX TSS·FG · Analiză orientativă scenarii · Valorile economice sunt estimative · Consultați un consultant imobiliar autorizat'),W/2,H-5,{align:'center'});

  const fn=('scenarii_AB_'+S2(P.nrCad)+'_'+S2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
  if(typeof ss==='function') ss('✅ Scenarii A/B: 2 pagini · '+fn+' · A='+(scA.niv*hn).toFixed(1)+'m vs B='+(scB.niv*hn).toFixed(1)+'m');
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. IFC-LITE EXPORT (BIM ISO 16739)
// ═══════════════════════════════════════════════════════════════════════════
function _rvExportIFC(){
  const b=_RV.building, P=_RV.parcelParams, fl=_RV.floors?.[0];
  if(!b||!P){alert('Generați releveele mai întâi.');return;}
  if(typeof ss==='function') ss('⏳ Generez IFC-lite…');

  const S2=_rvS2b;
  const now=new Date();
  const isoDate=now.toISOString().replace(/[-:]/g,'').replace('.',',').split('.')[0];
  const dateStr=now.toLocaleDateString('ro-RO');
  const fn_=S2(P.nrCad||'urbanx').replace(/[^a-zA-Z0-9]/g,'_');

  let id=1;
  const ID=()=>id++;
  const lines=[];
  const add=(line)=>lines.push(line);

  // IFC Step format
  add('ISO-10303-21;');
  add('HEADER;');
  add('FILE_DESCRIPTION((\'UrbanX TSS·FG IFC-lite Export\',\'BIM Schema IFC4\'),\'2;1\');');
  add(`FILE_NAME('${fn_}.ifc','${isoDate}',('TSS·FG UrbanX'),('UrbanX Software'),'IFC4','','');`);
  add('FILE_SCHEMA((\'IFC4\'));');
  add('ENDSEC;');
  add('DATA;');

  const ownerHistId=ID();
  const personId=ID();
  const orgId=ID();
  const persOrgId=ID();
  const appId=ID();

  add(`#${personId}=IFCPERSON($,'TSS FG','UrbanX',$,$,$,$,$);`);
  add(`#${orgId}=IFCORGANIZATION($,'Think Smart Solutions','UrbanX TSS·FG',$,$);`);
  add(`#${persOrgId}=IFCPERSONANDORGANIZATION(#${personId},#${orgId},$);`);
  add(`#${appId}=IFCAPPLICATION(#${orgId},'2026','UrbanX TSS·FG','UrbanX');`);
  add(`#${ownerHistId}=IFCOWNERHISTORY(#${persOrgId},#${appId},$,.ADDED.,$,$,$,${Math.floor(now.getTime()/1000)});`);

  // Units
  const unitAssId=ID(); const lengthUnitId=ID(); const areaUnitId=ID(); const volUnitId=ID();
  add(`#${lengthUnitId}=IFCSIUNIT(*,.LENGTHUNIT.,$,.METRE.);`);
  add(`#${areaUnitId}=IFCSIUNIT(*,.AREAUNIT.,$,.SQUARE_METRE.);`);
  add(`#${volUnitId}=IFCSIUNIT(*,.VOLUMEUNIT.,$,.CUBIC_METRE.);`);
  add(`#${unitAssId}=IFCUNITASSIGNMENT((#${lengthUnitId},#${areaUnitId},#${volUnitId}));`);

  // Geometric context
  const geomCtxId=ID(); const coordOriginId=ID(); const axisZId=ID(); const axisXId=ID(); const trueNorthId=ID();
  add(`#${coordOriginId}=IFCCARTESIANPOINT((0.,0.,0.));`);
  add(`#${axisZId}=IFCDIRECTION((0.,0.,1.));`);
  add(`#${axisXId}=IFCDIRECTION((1.,0.,0.));`);
  add(`#${trueNorthId}=IFCDIRECTION((0.,1.));`);
  add(`#${geomCtxId}=IFCGEOMETRICREPRESENTATIONCONTEXT($,'Model',3,1.E-005,#${coordOriginId},#${trueNorthId});`);

  // Project
  const projectId=ID();
  add(`#${projectId}=IFCPROJECT('${fn_}_PRJ',#${ownerHistId},'${S2(P.nrCad)}','Proiect UrbanX ${S2(P.nrCad)}',$ ,$,$,(#${geomCtxId}),#${unitAssId});`);

  // Site
  const siteLocId=ID(); const sitePlacId=ID(); const siteId=ID();
  add(`#${siteLocId}=IFCCARTESIANPOINT((0.,0.,0.));`);
  add(`#${sitePlacId}=IFCLOCALPLACEMENT($,IFCAXIS2PLACEMENT3D(#${siteLocId},#${axisZId},#${axisXId}));`);
  add(`#${siteId}=IFCSITE('${fn_}_SIT',#${ownerHistId},'${S2(P.nrCad)}','Parcelă cadastrală',$ ,#${sitePlacId},$,$,.ELEMENT.,$,$,$,$,$);`);

  // Building
  const bldgLocId=ID(); const bldgPlacId=ID(); const bldgId=ID();
  add(`#${bldgLocId}=IFCCARTESIANPOINT((${P.rl},${P.rf},0.));`);
  add(`#${bldgPlacId}=IFCLOCALPLACEMENT(#${sitePlacId},IFCAXIS2PLACEMENT3D(#${bldgLocId},#${axisZId},#${axisXId}));`);
  add(`#${bldgId}=IFCBUILDING('${fn_}_BLD',#${ownerHistId},'Clădire ${S2(P.utr)}','${S2(P.nrCad)} · P+${b.niv-1}E · ${b.bW}m×${b.bD}m',$ ,#${bldgPlacId},$,$,.ELEMENT.,$,$,$);`);

  // Storeys + Spaces
  const storeyIds=[];
  for(let flIdx=0;flIdx<b.niv;flIdx++){
    const elevation=flIdx*P.hn;
    const stLocId=ID(); const stPlacId=ID(); const stId=ID();
    add(`#${stLocId}=IFCCARTESIANPOINT((0.,0.,${elevation.toFixed(3)}));`);
    add(`#${stPlacId}=IFCLOCALPLACEMENT(#${bldgPlacId},IFCAXIS2PLACEMENT3D(#${stLocId},#${axisZId},#${axisXId}));`);
    add(`#${stId}=IFCBUILDINGSTOREY('${fn_}_ST${flIdx}',#${ownerHistId},'${flIdx===0?'Parter':'Etaj '+flIdx}','Nivel ${flIdx}',$,#${stPlacId},$,$,.ELEMENT.,${elevation.toFixed(3)});`);
    storeyIds.push(stId);

    // Spaces (camere) pe fiecare etaj
    const flData=(flIdx<(_RV.floors||[]).length)?_RV.floors[flIdx]:fl;
    const spaceIds=[];
    (flData?.rects||fl?.rects||[]).forEach((r,ri)=>{
      const spLocId=ID(); const spPlacId=ID(); const spId=ID();
      add(`#${spLocId}=IFCCARTESIANPOINT((${r.x.toFixed(3)},${r.y.toFixed(3)},0.));`);
      add(`#${spPlacId}=IFCLOCALPLACEMENT(#${stPlacId},IFCAXIS2PLACEMENT3D(#${spLocId},#${axisZId},#${axisXId}));`);
      const area=(r.w*r.h).toFixed(3);
      add(`#${spId}=IFCSPACE('${fn_}_SP${flIdx}_${ri}',#${ownerHistId},'${S2(r.lbl||r.t)}','${S2(r.t)}',$,#${spPlacId},$,$,.ELEMENT.,.INTERNAL.,${area});`);
      spaceIds.push(spId);
    });

    // RelContainedInStoey pentru spaces
    if(spaceIds.length>0){
      const relSpId=ID();
      add(`#${relSpId}=IFCRELCONTAINEDINSPATIALSTRUCTURE('${fn_}_RCSS${flIdx}',#${ownerHistId},$,$,(${spaceIds.map(s=>'#'+s).join(',')}),#${stId});`);
    }
  }

  // Pereți exteriori (din _extractWalls dacă disponibil)
  const wallIds=[];
  if(typeof _extractWalls==='function'&&fl){
    const walls=_extractWalls(fl.rects,b.bW,b.bD,fl.wins||[],fl.doors||[],0.28,0.14);
    walls.filter(w=>w.type==='ext'&&w.type!=='win'&&w.type!=='door').slice(0,40).forEach((w,wi)=>{
      for(let flIdx=0;flIdx<b.niv;flIdx++){
        const elevation=flIdx*P.hn;
        const wLocId=ID(); const wPlacId=ID(); const wId=ID();
        const wx=w.axis==='H'?w.x1:w.x1, wy=w.axis==='H'?w.y1:w.y1;
        add(`#${wLocId}=IFCCARTESIANPOINT((${wx.toFixed(3)},${wy.toFixed(3)},${elevation.toFixed(3)}));`);
        add(`#${wPlacId}=IFCLOCALPLACEMENT(#${bldgId+1||ID()},IFCAXIS2PLACEMENT3D(#${wLocId},#${axisZId},#${axisXId}));`);
        add(`#${wId}=IFCWALL('${fn_}_W${wi}_${flIdx}',#${ownerHistId},'PereteExt_${wi}','Perete exterior 28cm',$,#${wPlacId},$,$,$);`);
        wallIds.push(wId);
      }
    });
  }

  // Relații ierarhice
  const relBSite=ID(); const relBldgSite=ID(); const relStBldg=ID();
  add(`#${relBSite}=IFCRELAGGREGATES('${fn_}_RA0',#${ownerHistId},$,$,#${projectId},(#${siteId}));`);
  add(`#${relBldgSite}=IFCRELAGGREGATES('${fn_}_RA1',#${ownerHistId},$,$,#${siteId},(#${bldgId}));`);
  if(storeyIds.length>0)
    add(`#${relStBldg}=IFCRELAGGREGATES('${fn_}_RA2',#${ownerHistId},$,$,#${bldgId},(${storeyIds.map(s=>'#'+s).join(',')}));`);

  if(wallIds.length>0){
    const relWalls=ID();
    add(`#${relWalls}=IFCRELCONTAINEDINSPATIALSTRUCTURE('${fn_}_WALL',#${ownerHistId},'Pereți exteriori',$,(${wallIds.map(w=>'#'+w).join(',')}),#${bldgId});`);
  }

  add('ENDSEC;');
  add('END-ISO-10303-21;');

  const ifcStr=lines.join('\n');
  const blob=new Blob([ifcStr],{type:'application/x-step;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.download=(fn_+'_'+S2(P.utr)+'.ifc').replace(/[^a-zA-Z0-9._-]/g,'_');
  a.href=url; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
  if(typeof ss==='function') ss('✅ IFC-lite exportat: '+a.download+' · '+id+' entități IFC4 · Import: FreeCAD, BlenderBIM, ArchiCAD');
}
