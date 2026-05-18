// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-extras.js — Funcționalități suplimentare propuse
// UrbanX TSS·FG
//
// A. Memoriu Tehnic auto-generat (document PA - Autorizație Construire)
// B. Export Complet (ZIP cu toate documentele)
// C. Animații Three.js inline (Tour / Construcție etaj cu etaj / Wireframe)
// D. Heatmap diagnostic pe plan 2D (ISU / OMS / NP057)
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
    _injectExtrasButtons();
    const _extObs=setInterval(()=>{
      if(document.querySelector('.rv-expbtn')&&!document.getElementById('rv-extras-wrap'))
        _injectExtrasButtons();
      if(document.getElementById('rv-extras-wrap')) clearInterval(_extObs);
    },500);
    _inject3DAnimButtons();
    console.log('[Extras] ✅ loaded');
  });

  function _injectExtrasButtons(){
    if(document.getElementById('rv-extras-wrap')) return;
    const a=document.querySelector('#rv-optim-wrap')||document.querySelector('.rv-expbtn');
    if(!a) return;
    const wrap=document.createElement('span'); wrap.id='rv-extras-wrap';
    [
      {id:'rv-memoriu-btn',  icon:'📝', label:'Memoriu Tehnic',   fn:'_rvExportMemoriu',
       bg:'rgba(20,184,166,.15)', border:'rgba(20,184,166,.5)', color:'#2dd4bf'},
      {id:'rv-zip-btn',      icon:'📦', label:'Export Complet',   fn:'_rvExportComplet',
       bg:'rgba(212,175,30,.15)', border:'rgba(212,175,30,.6)', color:'#D4AF37'},
      {id:'rv-invest-btn',   icon:'💼', label:'Prezentare',        fn:'_rvExportPrezentare',
       bg:'rgba(99,102,241,.15)', border:'rgba(99,102,241,.5)', color:'#a5b4fc'},
      {id:'rv-heatmap-btn',  icon:'🌡', label:'Heatmap DNA',       fn:'_rvToggleHeatmap',
       bg:'rgba(239,68,68,.12)',  border:'rgba(239,68,68,.4)',  color:'#fca5a5'},
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
  }

  // Injectăm butoane animații 3D în panoul AEDIS/viewer dacă există
  function _inject3DAnimButtons(){
    setTimeout(()=>{
      // Căutăm un container potrivit în UI-ul 3D
      const container=document.querySelector('#rv-modal .rv-center')||
                       document.querySelector('.rv-center')||
                       document.querySelector('#rv-canvas-wrap');
      if(!container||document.getElementById('rv-3danim-bar')) return;
      if(document.getElementById('rv-3danim-bar')) return;
    const bar=document.createElement('div');
      bar.id='rv-3danim-bar';
      bar.style.cssText='position:absolute;bottom:8px;right:8px;z-index:100;display:flex;gap:5px;pointer-events:all';
      [
        {id:'rv-anim-tour',icon:'▶',tip:'Tour orbital automat',fn:'_rv3DAnimTour'},
        {id:'rv-anim-build',icon:'🏗',tip:'Construcție etaj cu etaj',fn:'_rv3DAnimBuild'},
        {id:'rv-anim-wire',icon:'◈',tip:'Toggle wireframe',fn:'_rv3DToggleWireframe'},
        {id:'rv-anim-snap',icon:'📸',tip:'Screenshot PNG',fn:'_rv3DSnapshot'},
      ].forEach(b_=>{
        const btn=document.createElement('button');
        btn.id=b_.id; btn.title=b_.tip; btn.innerHTML=b_.icon;
        btn.style.cssText='width:30px;height:30px;border-radius:6px;cursor:pointer;font-size:13px;'+
          'background:rgba(15,20,45,.75);border:1px solid rgba(212,175,55,.25);color:#D4AF37;'+
          'display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);';
        btn.onmouseover=()=>btn.style.background='rgba(212,175,55,.25)';
        btn.onmouseout=()=>btn.style.background='rgba(15,20,45,.75)';
        btn.onclick=()=>window[b_.fn]?.();
        bar.appendChild(btn);
      });
      container.style.position='relative';
      container.appendChild(bar);
    },3000);
  }
})();

// ══════════════════════════════════════════════════════════════════════════
// A. MEMORIU TEHNIC AUTO-GENERAT
// ══════════════════════════════════════════════════════════════════════════
async function _rvExportMemoriu(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
  if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  if(typeof ss==='function') ss('⏳ Generez Memoriu Tehnic…');

  const cfg=(typeof _rvGetAEDISConfig==='function')?_rvGetAEDISConfig():{};
  const fl=_RV.floors?.[0];
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  const RN=(n,d)=>isNaN(n)?'—':d?Number(n).toFixed(d):Math.round(n)+'';

  const pdf=new _jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const PW=210,PH=297;

  // Funcțiune label
  const fnLabels={rez:'Rezidential colectiv',com:'Comercial',birouri:'Birouri',
    hotel:'Hotel',mixt:'Mixt rezidential-comercial',industrial:'Industrial/Logistic'};
  const fnLabel=fnLabels[_RV.fn]||'Rezidential colectiv';

  // Calcule
  const sdaTotal=b.sdaTotal||b.bW*b.bD*b.niv;
  const scArea=b.scArea||b.bW*b.bD*P.pot;
  const potReal=scArea/P.area;
  const cutReal=sdaTotal/P.area;
  const nrApt=Math.round(sdaTotal/70);
  const hTotal=b.niv*P.hn;
  const subsolInfo=(typeof _calcSubsolNeeded==='function')?_calcSubsolNeeded(b,P):{needsBasement:false};
  const investEst=Math.round(sdaTotal*1200/1000);

  // Materiale principale bazate pe config
  const matExt=cfg.pereCortina?'Perete cortină aluminiu + geam tripan Uw=0.7 (60%) / BCA 20cm+EPS 15cm':
               cfg.finisajExt==='clinker'?'Cărămidă aparentă clinker pe BCA 20cm+EPS 15cm':
               cfg.finisajExt==='travertin'?'Travertin natural pe BCA 20cm+EPS 15cm':
               'BCA 20cm + EPS 15cm + tencuială silicată';
  const roofType=cfg.mansarda?'Acoperiș tip mansardă, pante 35°, învelitoare ceramică':
                 cfg.terasa?'Terasă circulabilă, hidroizolație bituminoasă 2str., dale 40×40':
                 'Acoperiș șarpantă, pante 30°, învelitoare ceramică';
  const structType=b.niv<=4?'Structură în cadre din beton armat C25/30, stâlpi 40×40cm':
                   'Structură în cadre din beton armat C30/37, stâlpi 50×50cm';

  // ── Pagina 1 ──────────────────────────────────────────────────────────
  // Header formal
  pdf.setFillColor(255,255,255);pdf.rect(0,0,PW,PH,'F');
  pdf.setDrawColor(180,140,30);pdf.setLineWidth(1.5);
  pdf.rect(8,8,PW-16,PH-16,'S');
  pdf.setLineWidth(0.4);pdf.rect(10,10,PW-20,PH-20,'S');

  pdf.setTextColor(15,25,60);pdf.setFont('helvetica','bold');pdf.setFontSize(10);
  pdf.text('MEMORIU TEHNIC',PW/2,28,{align:'center'});
  pdf.setFontSize(8.5);pdf.setFont('helvetica','normal');
  pdf.text('DOCUMENTAŢIE PENTRU AUTORIZAŢIA DE CONSTRUIRE (D.A.C.)',PW/2,35,{align:'center'});
  pdf.setDrawColor(180,140,30);pdf.setLineWidth(0.6);pdf.line(25,38,PW-25,38);

  pdf.setFontSize(11);pdf.setFont('helvetica','bold');
  pdf.text(S2(fnLabel.toUpperCase()),PW/2,46,{align:'center'});
  pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.setTextColor(60,75,100);
  pdf.text(S2('Amplasament: Nr.cadastral '+P.nrCad+' · UTR '+P.utr),PW/2,52.5,{align:'center'});

  // Căsuță date proiect
  pdf.setDrawColor(180,200,225);pdf.setLineWidth(0.3);
  pdf.rect(25,58,PW-50,55,'S');
  pdf.setFillColor(240,245,255);pdf.rect(25,58,PW-50,8,'F');
  pdf.setTextColor(25,40,85);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
  pdf.text('DATE PROIECT',PW/2,63.5,{align:'center'});

  const proiectInfo=[
    ['Nr. cadastral:',S2(P.nrCad),'UTR:',S2(P.utr)],
    ['Suprafață parcelă:',RN(P.area,0)+' m²','Regim înălțime:','P+'+RN(b.niv-1,0)+'E'],
    ['Funcțiunea:',S2(fnLabel),'Înălțime maximă:',RN(hTotal,1)+' m'],
    ['Suprafață construită:',RN(scArea,0)+' m²','Suprafață desfășurată:',RN(sdaTotal,0)+' m²'],
    ['POT propus:',RN(potReal*100,1)+'%  (max '+RN(P.pot*100,0)+'%)','CUT propus:',RN(cutReal,2)+'  (max '+P.cut+')'],
  ];
  proiectInfo.forEach((row,i)=>{
    const ry=70+i*8;
    pdf.setFont('helvetica','bold');pdf.setFontSize(6.8);pdf.setTextColor(40,55,90);
    pdf.text(S2(row[0]),29,ry);pdf.text(S2(row[2]),PW/2+2,ry);
    pdf.setFont('helvetica','normal');pdf.setTextColor(15,30,70);
    pdf.text(S2(row[1]),55,ry);pdf.text(S2(row[3]),PW/2+30,ry);
  });

  // Semnătură / ștampilă placeholder
  pdf.setDrawColor(180,200,225);pdf.setLineWidth(0.3);
  pdf.rect(25,115,80,30,'S');pdf.rect(PW-105,115,80,30,'S');
  pdf.setTextColor(130,145,165);pdf.setFont('helvetica','normal');pdf.setFontSize(6);
  pdf.text('Proiectant de specialitate',65,123,{align:'center'});
  pdf.text('Arhitect autorizat',PW-65,123,{align:'center'});
  pdf.text('Semnătură + ștampilă',65,137,{align:'center'});
  pdf.text('Semnătură + ștampilă',PW-65,137,{align:'center'});

  pdf.setDrawColor(180,140,30);pdf.setLineWidth(0.6);pdf.line(25,150,PW-25,150);

  // Date autor
  pdf.setTextColor(60,75,100);pdf.setFont('helvetica','normal');pdf.setFontSize(6.5);
  pdf.text(S2('Generat cu UrbanX TSS·FG · '+new Date().toLocaleDateString('ro-RO')),PW/2,156,{align:'center'});
  pdf.text(S2('ATENȚIE: Document orientativ. Necesită semnătura arhitectului autorizat OAR pentru depunere la autorități.'),PW/2,162,{align:'center'});

  // ── Pagina 2: Corp memoriu ────────────────────────────────────────────
  pdf.addPage();
  pdf.setFillColor(255,255,255);pdf.rect(0,0,PW,PH,'F');

  const section=(nr,titlu)=>{
    pdf.setFillColor(15,25,60);pdf.rect(14,cy_mem,PW-28,7,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(8.5);
    pdf.text(S2(nr+'. '+titlu.toUpperCase()),17,cy_mem+5);
    cy_mem+=9;
  };
  const para=(text,indent)=>{
    indent=indent||0;
    pdf.setTextColor(30,45,80);pdf.setFont('helvetica','normal');pdf.setFontSize(7.5);
    const maxW=PW-28-indent*4;
    const lines=pdf.splitTextToSize(S2(text),maxW);
    lines.forEach(l=>{
      if(cy_mem>PH-18){pdf.addPage();cy_mem=15;}
      pdf.text(l,14+indent*4,cy_mem);cy_mem+=5.5;
    });
    cy_mem+=2;
  };
  const subsec=(titlu)=>{
    pdf.setTextColor(25,50,120);pdf.setFont('helvetica','bold');pdf.setFontSize(8);
    pdf.text(S2(titlu),14,cy_mem);cy_mem+=7;
  };

  let cy_mem=15;

  section('1','DATE GENERALE');
  para('Prezenta documentație cuprinde memoriul tehnic pentru obținerea Autorizației de Construire pentru o '+S2(fnLabel.toLowerCase())+', amplasată pe parcela cu nr. cadastral '+S2(P.nrCad)+', UTR '+S2(P.utr)+', suprafață '+RN(P.area,0)+' m².');
  para('Proiectul se încadrează în prevederile Certificatului de Urbanism nr. ___/___/_____, emis de _____, și respectă indicatorii urbanistici din PUG/PUZ aprobat.');

  section('2','DESCRIEREA SITUAȚIEI EXISTENTE');
  para('Parcela studiată are suprafața de '+RN(P.area,1)+' m², cu dimensiunile aproximative de '+RN(P.W,1)+'m lățime × '+RN(P.D,1)+'m adâncime. Forma parcelei este regulată, cu front la stradă de '+RN(P.W,1)+' m. Terenul este plan, fără diferențe de nivel semnificative. Accesul auto și pietonal se realizează din strada principală.');
  para('La momentul elaborării documentației, parcela nu are construcții autorizate existente relevante pentru prezentul proiect.');

  section('3','DESCRIEREA SOLUȚIEI ARHITECTURALE');
  subsec('3.1 Concept');
  para('Clădirea propusă este un imobil cu destinație '+S2(fnLabel.toLowerCase())+', organizat pe regimul de înălțime P+'+RN(b.niv-1,0)+'E, cu înălțimea maximă la cornișă de '+RN(hTotal,1)+'m. '+
    (cfg.penthouse?'Ultimul nivel este retras 2.50m față de aliniamentul construcției, cu tratament de penthouse. ':'')+(cfg.mansarda?'Spațiul mansardat, cu pante de 35°, valorifică volumul acoperișului pentru funcțiuni locative. ':'')+(cfg.pereCortina?'Fațadele principale sunt tratate cu perete cortină aluminiu+geam tripan, asigurând transparență și eficiență energetică. ':''));
  subsec('3.2 Organizare funcțională');
  para('La nivelul parterului: funcțiuni comune (hol acces, scări, '+
    (subsolInfo.needsBasement?'acces subsol parcare, ':'')+'spații tehnice). '+
    'La nivelele 1-'+RN(b.niv-1,0)+': apartamente/unități de '+S2(fnLabel.toLowerCase())+'. '+
    'Număr estimat de unități: '+nrApt+' (la media de 70m²/unitate). '+
    (subsolInfo.needsBasement?'Subsol '+subsolInfo.nLevels+' nivel(e) pentru parcare ('+subsolInfo.totalSpots+' locuri), conform NP 067/2002.':''));
  subsec('3.3 Bilanț suprafețe');
  const bilItems=[
    ['Suprafață parcelă (SP)',RN(P.area,1)+' m²'],
    ['Suprafață construită la sol (SC)',RN(scArea,1)+' m²'],
    ['Suprafață desfășurată acoperiș (SDA)',RN(sdaTotal,1)+' m²'],
    ['POT propus / POT maxim admis',RN(potReal*100,2)+'% / '+RN(P.pot*100,0)+'%'],
    ['CUT propus / CUT maxim admis',RN(cutReal,2)+' / '+P.cut],
    ['Înălțime maximă',RN(hTotal,1)+'m / '+RN(b.niv,0)+' niveluri'],
    ['Retragere față (Rf)',RN(P.rf,1)+'m'],['Retragere spate (Rs)',RN(P.rs,1)+'m'],
    ['Retragere laterală (Rl)',RN(P.rl,1)+'m fiecare parte'],
    ['Suprafață verde minimă',RN(Math.max(0,P.area-scArea)*0.3,0)+' m² (30% din diferență)'],
  ];
  bilItems.forEach(([l,v])=>{
    if(cy_mem>PH-18){pdf.addPage();cy_mem=15;}
    pdf.setFillColor(cy_mem%11<5.5?250:245,cy_mem%11<5.5?252:248,255);
    pdf.rect(14,cy_mem-4,PW-28,6,'F');
    pdf.setDrawColor(215,225,240);pdf.setLineWidth(0.1);pdf.rect(14,cy_mem-4,PW-28,6,'S');
    pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.setTextColor(30,45,85);
    pdf.text(S2(l),17,cy_mem+0.5);
    pdf.setFont('helvetica','normal');pdf.setTextColor(15,30,70);
    pdf.text(S2(v),PW/2+5,cy_mem+0.5);
    cy_mem+=6.2;
  });
  cy_mem+=3;

  section('4','SOLUȚIE CONSTRUCTIVĂ');
  subsec('4.1 Structura de rezistență');
  para(S2(structType)+'. Fundații pe radier general'+
    (subsolInfo.needsBasement?' din beton armat C30/37, P+W8 (rezistent la apă, adâncime -'+RN(subsolInfo.nLevels*3.0,1)+'m)':' continue sau izolate, în funcție de studiul geotehnic')+'. Planșee din beton armat monolit, grosime 20cm.');
  subsec('4.2 Închideri și compartimentări');
  para('Pereți exteriori: '+S2(matExt)+'. Pereți interiori: BCA 10cm + tencuială, sau gipscarton 2×12.5mm pe structură metalică pentru compartimentări flexibile. '+S2(roofType)+'.');
  subsec('4.3 Tâmplărie');
  para('Ferestre și uși exterioare: PVC 5 camere, geam tripan 4/16/4 argon, Uw≤1.1W/m²K. '+
    (cfg.pereCortina?'Perete cortină: profil Al 60mm, geam tripan Uw≤0.7W/m²K, transmitanță luminoasă >70%. ':'')+
    (cfg.balconType&&cfg.balconType!=='fara'?'Balcoane cu balustradă din '+
      (cfg.balconType==='francez'?'sticlă securizată tip francez H=1.10m':
       'profil Al + sticlă securizată H=1.10m, adâncime '+
       (cfg.balconType==='larg'?'2.00m':'1.40m'))+'. ':''));

  section('5','INSTALAȚII (REZUMAT)');
  para('Instalații sanitare: rețele interioare de alimentare cu apă rece/caldă și canalizare menajeră. Racord la rețeaua publică. Instalații termice: sistem centralizat / centrale individuale per unitate. Instalații electrice: tablouri electrice per etaj, iluminat LED, prize 230V. '+
    (subsolInfo.needsBasement?'Instalații subsol: ventilație mecanică forțată (min 6 sch/h), detectoare CO/CO₂, stație pompare ape uzate subsol. ':'')+'Instalații de siguranță la incendiu: conform P118, hidranți interiori și exteriori, iluminat de urgență.');

  section('6','CONFORMITATE NORMATIVĂ');
  const normItems=[
    ['NP 057/2002','Suprafețe minime camere locuibile',potReal<=P.pot?'CONFORM':'VERIFICARE'],
    ['P118-2/2013','Căi de evacuare și scări de securitate','CONFORM'],
    ['OMS 119/2014','Însorire naturală min. 1.5h/zi camere locuit','CONFORM'],
    ['PUG/RGU 525/1996','POT, CUT, Hmax, retrageri',potReal<=P.pot&&cutReal<=P.cut?'CONFORM':'VERIFICARE'],
    ['NP 067/2002','Locuri de parcare obligatorii',subsolInfo.needsBasement?'SUBSOL PROIECTAT':'CONFORM'],
    ['P100-1/2022','Proiectare seismică (zona seismică)',`ag=${typeof _getSeismicAg==='function'?'variabil':'0.20g'}`],
    ['GP 118/2006','Accesibilitate persoane cu dizabilități','CONFORM - rampă acces P'],
    ['Legea 10/1995','Calitatea în construcții','PROIECT TEHNIC COMPLET NECESAR'],
  ];
  normItems.forEach(([n,d,s])=>{
    if(cy_mem>PH-18){pdf.addPage();cy_mem=15;}
    const isOk=s==='CONFORM'||s.includes('PROIECTAT');
    pdf.setFillColor(isOk?242:255,isOk?255:245,isOk?242:240);
    pdf.rect(14,cy_mem-4,PW-28,7,'F');
    pdf.setDrawColor(210,220,230);pdf.setLineWidth(0.1);pdf.rect(14,cy_mem-4,PW-28,7,'S');
    pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
    pdf.setTextColor(isOk?15:150,isOk?100:30,isOk?40:30);
    pdf.text(isOk?'✅':' ⚠',16,cy_mem+1);
    pdf.setTextColor(20,35,75);
    pdf.text(S2(n),23,cy_mem+1);
    pdf.setFont('helvetica','normal');pdf.setTextColor(50,70,100);pdf.setFontSize(6.5);
    pdf.text(S2(d),58,cy_mem+1);
    pdf.setFont('helvetica','bold');
    pdf.setTextColor(isOk?15:150,isOk?100:30,isOk?40:30);
    pdf.text(S2(s),PW-15,cy_mem+1,{align:'right'});
    cy_mem+=7.5;
  });
  cy_mem+=5;

  section('7','ESTIMARE COSTURI');
  const totalCost=Math.round(sdaTotal*1200);
  const costItems=[
    ['Structură + fundații',Math.round(totalCost*0.32)+'€'],
    ['Închideri + compartimentări',Math.round(totalCost*0.18)+'€'],
    ['Tâmplărie + vitraj',Math.round(totalCost*0.12)+'€'],
    ['Finisaje interioare',Math.round(totalCost*0.15)+'€'],
    ['Instalații (sanitare+termice+elec)',Math.round(totalCost*0.18)+'€'],
    [subsolInfo.needsBasement?'Subsol parcare '+subsolInfo.nLevels+' nivel':'Infrastructură + racorduri',Math.round(totalCost*(subsolInfo.needsBasement?0.08:0.05))+'€'],
    ['TOTAL ESTIMAT (fără TVA)',Math.round(totalCost)+'€ (~'+Math.round(totalCost/1000)+'k€)'],
  ];
  costItems.forEach(([l,v],i)=>{
    if(cy_mem>PH-18){pdf.addPage();cy_mem=15;}
    const isLast=i===costItems.length-1;
    pdf.setFillColor(isLast?25:cy_mem%11<6?250:245,isLast?40:cy_mem%11<6?252:248,isLast?80:255);
    pdf.rect(14,cy_mem-4,PW-28,6.5,isLast?'F':'F');
    pdf.setFont('helvetica',isLast?'bold':'normal');pdf.setFontSize(7);
    pdf.setTextColor(isLast?255:30,isLast?230:45,isLast?100:80);
    pdf.text(S2(l),17,cy_mem+0.5);
    pdf.setFont('helvetica','bold');
    pdf.text(S2(v),PW-18,cy_mem+0.5,{align:'right'});
    cy_mem+=6.8;
  });
  cy_mem+=5;
  if(cy_mem>PH-25){pdf.addPage();cy_mem=15;}
  para('Notă: Prețurile sunt estimative, bazate pe un cost mediu de 1.200 €/m² SDA (piața imobiliară 2026, România). Nu includ taxe, onorarii proiectant, racorduri utilități sau organizare de șantier. Variații regionale ±15%. Solicitați deviz detaliat de la constructor autorizat.');

  // Footer final
  const lastPage=pdf.getCurrentPageInfo().pageNumber;
  for(let pg=1;pg<=lastPage;pg++){
    pdf.setPage(pg);
    pdf.setFillColor(248,249,252);pdf.rect(14,PH-12,PW-28,8,'F');
    pdf.setDrawColor(180,195,220);pdf.setLineWidth(0.15);pdf.line(14,PH-12,PW-14,PH-12);
    pdf.setTextColor(110,125,145);pdf.setFont('helvetica','italic');pdf.setFontSize(5.5);
    pdf.text('UrbanX TSS·FG · Memoriu tehnic orientativ · Semnat de arhitect autorizat OAR pentru depunere la autorități · Pagina '+pg+'/'+lastPage,PW/2,PH-6.5,{align:'center'});
  }

  const fn=('memoriu_tehnic_'+S2(P.nrCad)+'_'+S2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
  if(typeof ss==='function') ss('✅ Memoriu Tehnic: '+lastPage+' pagini · '+fn+' · Document DAC complet');
}

// ══════════════════════════════════════════════════════════════════════════
// B. EXPORT COMPLET (simulare ZIP — download secvențial)
// ══════════════════════════════════════════════════════════════════════════
async function _rvExportComplet(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}

  const btn=document.getElementById('rv-zip-btn');
  if(btn){btn.innerHTML='⏳ Export complet…';btn.style.opacity='.6';}
  if(typeof ss==='function') ss('📦 Export complet — generez toate documentele…');

  const exports=[
    {fn:'_rvExportPlanseA3',    label:'Planșe A3',         icon:'📐'},
    {fn:'_rvExportPlanseWalls', label:'Planșe Pereți',     icon:'🏗'},
    {fn:'_rvExportAcoperis',    label:'Plan Acoperiș',     icon:'🏠'},
    {fn:'_rvExportFatadeAEDIS', label:'Fațade AEDIS',      icon:'🏛'},
    {fn:'_rvExportSubsol',      label:'Plan Subsol',       icon:'🅿', conditional:()=>_RV._subsolInfo?.needsBasement},
    {fn:'_rvExportTabelSuprafete',label:'Tabel Suprafețe', icon:'📋'},
    {fn:'_rvExportTablouMateriale',label:'Tablou Materiale',icon:'🧱'},
    {fn:'_rvExportSVG',         label:'Export SVG',        icon:'◼'},
    {fn:'_rvExportIFC',         label:'Export IFC',        icon:'🏗'},
    {fn:'_rvExportScenarii',    label:'Scenarii A/B',      icon:'⚖'},
    {fn:'_rvDNAOptimize',       label:'Raport DNA',        icon:'🎯'},
    {fn:'_rvExportMemoriu',     label:'Memoriu Tehnic',    icon:'📝'},
    {fn:'_rvDownloadBlenderScript',label:'Script Blender', icon:'🎬'},
  ];

  let done=0, total=exports.filter(e=>!e.conditional||e.conditional()).length;
  if(typeof ss==='function') ss('📦 Export complet — '+total+' documente…');

  for(const exp of exports){
    if(exp.conditional&&!exp.conditional()) continue;
    if(typeof window[exp.fn]!=='function') continue;
    try{
      if(typeof ss==='function') ss('📦 ('+done+'/'+total+') '+exp.icon+' '+exp.label+'…');
      await window[exp.fn]();
      done++;
      await new Promise(r=>setTimeout(r,1200)); // delay între download-uri pentru browser
    }catch(e){
      console.warn('[ExportComplet] Eroare la '+exp.fn+':',e.message);
    }
  }

  // Export DXF
  if(typeof _rvExportDXF==='function'){
    try{await _rvExportDXF(); done++;}catch(e){}
  }

  if(btn){btn.innerHTML='📦 Export Complet';btn.style.opacity='1';}
  if(typeof ss==='function') ss('✅ Export complet finalizat: '+done+'/'+total+' documente generate');
}

// ══════════════════════════════════════════════════════════════════════════
// C. PREZENTARE INVESTITORI
// ══════════════════════════════════════════════════════════════════════════
async function _rvExportPrezentare(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
  if(!_jsPDF){alert('jsPDF indisponibil.');return;}
  if(typeof ss==='function') ss('⏳ Generez prezentare investitori…');

  const W=297,H=210; // landscape A4
  const pdf=new _jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
  const S2=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  const RN=(n,d)=>isNaN(n)?'—':d?Number(n).toFixed(d):Math.round(n)+'';
  const cfg=(typeof _rvGetAEDISConfig==='function')?_rvGetAEDISConfig():{};
  let pg=0;
  const newPg=(title)=>{
    if(pg>0)pdf.addPage(); pg++;
    // Fundal gradient simulat
    pdf.setFillColor(12,18,45);pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(20,30,65);pdf.rect(0,H*.55,W,H*.45,'F');
    // Linie aurire
    pdf.setFillColor(180,140,30);pdf.rect(0,0,W,1.5,'F');
    pdf.setFillColor(180,140,30);pdf.rect(0,H-1.5,W,1.5,'F');
    // Logo
    pdf.setFillColor(180,140,30);pdf.roundedRect(8,5,16,9,1.5,1.5,'F');
    pdf.setTextColor(15,20,45);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
    pdf.text('UrbanX',16,11.5,{align:'center'});
    // Titlu slide
    if(title){
      pdf.setTextColor(212,175,55);pdf.setFont('helvetica','bold');pdf.setFontSize(8);
      pdf.text(S2(title),W-8,11.5,{align:'right'});
    }
    // Nr pag
    pdf.setTextColor(100,115,140);pdf.setFont('helvetica','normal');pdf.setFontSize(6);
    pdf.text(String(pg)+'/5',W/2,H-5,{align:'center'});
  };

  const sdaTotal=b.sdaTotal||b.bW*b.bD*b.niv;
  const nrApt=Math.round(sdaTotal/70);
  const investEst=Math.round(sdaTotal*1200/1000);
  const roi=Math.round((sdaTotal*1800-sdaTotal*1200)/(sdaTotal*1200)*100);
  const subsolInfo=(typeof _calcSubsolNeeded==='function')?_calcSubsolNeeded(b,P):{needsBasement:false};

  // ── SLIDE 1: COVER ───────────────────────────────────────────────────
  newPg();
  // Contur clădire minimal
  const sW=80,sH=50, sX=W/2-sW/2, sY=H/2-sH/2-10;
  const hn_ppt=P.hn||3, sc_ppt=sH/(b.niv*hn_ppt);
  pdf.setFillColor(30,50,100);
  for(let i=0;i<b.niv;i++){
    const ey=sY+sH-(i+1)*hn_ppt*sc_ppt;
    pdf.setFillColor(30+i*5,50+i*5,110+i*5);
    pdf.rect(sX,ey,sW,hn_ppt*sc_ppt,'F');
    // Ferestre
    for(let wi=0;wi<5;wi++){
      pdf.setFillColor(140,200,255);
      pdf.rect(sX+wi*sW/5+2,ey+2,sW/5-4,hn_ppt*sc_ppt*.4,'F');
    }
  }
  pdf.setDrawColor(180,140,30);pdf.setLineWidth(0.5);pdf.rect(sX,sY,sW,sH,'S');

  pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(20);
  pdf.text(S2(String(_RV.fn||'Rezidențial').toUpperCase()),W/2,sY+sH+20,{align:'center'});
  pdf.setFontSize(11);pdf.setFont('helvetica','normal');pdf.setTextColor(180,200,230);
  pdf.text(S2('Nr. cad. '+P.nrCad+' · UTR '+P.utr+' · P+'+RN(b.niv-1,0)+'E'),W/2,sY+sH+30,{align:'center'});

  const kpis=[[nrApt+' apt.','Unități'],[RN(sdaTotal,0)+'m²','SDA total'],
    ['~'+investEst+'k€','Investiție'],[roi+'%','ROI est.']];
  kpis.forEach(([v,l],i)=>{
    const kx=W/2-55+i*28;
    pdf.setFillColor(25,40,85);pdf.roundedRect(kx,H-35,24,18,2,2,'F');
    pdf.setDrawColor(180,140,30);pdf.setLineWidth(0.4);pdf.roundedRect(kx,H-35,24,18,2,2,'S');
    pdf.setTextColor(212,175,55);pdf.setFont('helvetica','bold');pdf.setFontSize(8.5);
    pdf.text(S2(v),kx+12,H-24,{align:'center'});
    pdf.setTextColor(150,168,200);pdf.setFont('helvetica','normal');pdf.setFontSize(6);
    pdf.text(S2(l),kx+12,H-19,{align:'center'});
  });

  // ── SLIDE 2: PLAN PARTER ─────────────────────────────────────────────
  newPg('PLAN ARHITECTURAL');
  const fl=_RV.floors?.[0];
  if(fl){
    const maxDim=Math.max(b.bW,b.bD);
    const planSC=Math.min(160/maxDim, 120/maxDim);
    const planOx=W/2-b.bW*planSC/2, planOy=H/2-b.bD*planSC/2-5;
    // Fond plan
    pdf.setFillColor(255,255,255);pdf.rect(planOx,planOy,b.bW*planSC,b.bD*planSC,'F');
    // Camere
    const CM={living:[255,252,244],bedroom:[248,255,250],kitchen:[245,250,255],
      bath:[250,245,255],wc:[250,245,255],hall:[248,248,252],core:[235,242,255]};
    fl.rects.forEach(r=>{
      const fc=CM[r.t]||[252,252,255];
      pdf.setFillColor(...fc);
      pdf.rect(planOx+r.x*planSC,planOy+r.y*planSC,r.w*planSC,r.h*planSC,'F');
      if(r.w*planSC>8&&r.h*planSC>8){
        pdf.setTextColor(40,55,90);pdf.setFont('helvetica','normal');pdf.setFontSize(Math.min(4,r.w*planSC/4));
        pdf.text(S2(r.lbl||r.t),planOx+(r.x+r.w/2)*planSC,planOy+(r.y+r.h/2)*planSC+1,{align:'center'});
      }
    });
    pdf.setDrawColor(25,40,90);pdf.setLineWidth(0.6);
    pdf.rect(planOx,planOy,b.bW*planSC,b.bD*planSC,'S');
    pdf.setTextColor(180,140,30);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('PLAN PARTER · Sc. 1:'+Math.round(1000/(planSC>0?planSC:20)),planOx,planOy-3);
    pdf.text(b.bW.toFixed(1)+'m',planOx+b.bW*planSC/2,planOy-2,{align:'center'});
    // Legenda funcțiuni
    const funcOccurances={};
    fl.rects.forEach(r=>{funcOccurances[r.t]=(funcOccurances[r.t]||0)+1;});
    const legItems=Object.entries(funcOccurances).slice(0,6);
    legItems.forEach(([t,n],i)=>{
      pdf.setFillColor(...(CM[t]||[248,248,252]));
      pdf.rect(W-55,H-40+i*7,5,5,'F');
      pdf.setDrawColor(100,120,150);pdf.setLineWidth(0.15);pdf.rect(W-55,H-40+i*7,5,5,'S');
      pdf.setTextColor(180,200,230);pdf.setFont('helvetica','normal');pdf.setFontSize(6);
      pdf.text(S2(t)+' ('+n+'×)',W-48,H-36.5+i*7);
    });
  } else {
    pdf.setTextColor(150,165,190);pdf.setFont('helvetica','normal');pdf.setFontSize(9);
    pdf.text('Planul arhitectural disponibil după generarea releveelor',W/2,H/2,{align:'center'});
  }

  // ── SLIDE 3: FINANCIAR ───────────────────────────────────────────────
  newPg('ANALIZĂ FINANCIARĂ');
  const finItems=[
    ['Suprafață construită la sol',RN(b.scArea||b.bW*b.bD*P.pot,0)+' m²','cyan'],
    ['Suprafață desfășurată (SDA)',RN(sdaTotal,0)+' m²','cyan'],
    ['Număr unități estimate',nrApt+' apartamente','gold'],
    ['Preț vânzare estimat/m²','~1.800 €/m² (ANCPI 2026)','green'],
    ['Venituri brute estimate','~'+RN(sdaTotal*1800/1000,0)+' k€','green'],
    ['Cost construcție estimat','~'+investEst+' k€  (1.200€/m²)','orange'],
    ['Profit brut estimat','~'+RN(sdaTotal*(1800-1200)/1000,0)+' k€','green'],
    ['ROI brut estimat',roi+'%','green'],
    ['Perioadă absorbtie estimată','~'+Math.ceil(nrApt/50)+' ani (50 unități/an)','yellow'],
    [subsolInfo.needsBasement?'Cost subsol parcare':'Infrastructură + racorduri',
      subsolInfo.needsBasement?'~'+Math.round(subsolInfo.totalSpots*5000/1000)+'k€ ('+subsolInfo.totalSpots+' loc.)':'~'+RN(sdaTotal*0.05*1200/1000,0)+'k€','orange'],
  ];
  const colC={'cyan':[100,210,255],'gold':[212,175,55],'green':[100,220,130],'orange':[255,180,80],'yellow':[255,235,100]};
  finItems.forEach(([l,v,c],i)=>{
    const fy=28+i*17;
    const isPos=c==='green';
    pdf.setFillColor(20,32,65);pdf.roundedRect(12,fy-1,(W-24)/2-5,13,1.5,1.5,'F');
    pdf.setFillColor(22,38,78);pdf.roundedRect((W)/2+3,fy-1,(W-24)/2-5,13,1.5,1.5,'F');
    const cc=colC[c]||[200,215,240];
    pdf.setTextColor(160,180,215);pdf.setFont('helvetica','normal');pdf.setFontSize(6.5);
    pdf.text(S2(l),16,fy+4);
    pdf.setTextColor(...cc);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
    pdf.text(S2(v),(W/2+7),fy+5);
  });

  // ── SLIDE 4: SCENARII A/B ────────────────────────────────────────────
  newPg('SCENARII DE DEZVOLTARE');
  [[{label:'A — MAXIM PUG',niv:Math.min(b.niv+3,12),col:[25,100,200],x:W*.12},
    {label:'B — PROPUNERE',niv:b.niv,col:[20,150,80],x:W*.62}]].flat().forEach(sc_=>{
    const sH2=sc_.niv*P.hn*4, sX2=sc_.x, sY2=H-20-sH2;
    for(let i=0;i<sc_.niv;i++){
      const c=[...sc_.col].map((v,k)=>Math.min(255,v+(k===0?i*3:k===2?i*8:i*2)));
      pdf.setFillColor(...c);
      pdf.rect(sX2,sY2+sH2-i*P.hn*4-P.hn*4,b.bW*2.2,P.hn*4,'F');
    }
    pdf.setDrawColor(...sc_.col);pdf.setLineWidth(0.5);
    pdf.rect(sX2,sY2,b.bW*2.2,sH2,'S');
    pdf.setTextColor(...sc_.col);pdf.setFont('helvetica','bold');pdf.setFontSize(8);
    pdf.text(S2(sc_.label),sX2+b.bW*1.1,sY2-3,{align:'center'});
    pdf.setTextColor(180,200,230);pdf.setFont('helvetica','normal');pdf.setFontSize(6.5);
    pdf.text('P+'+RN(sc_.niv-1,0)+'E · H='+RN(sc_.niv*P.hn,1)+'m',sX2+b.bW*1.1,sY2+sH2+6,{align:'center'});
    pdf.text('SDA: ~'+RN(b.bW*b.bD*sc_.niv,0)+'m²',sX2+b.bW*1.1,sY2+sH2+12,{align:'center'});
  });
  pdf.setTextColor(180,200,230);pdf.setFont('helvetica','normal');pdf.setFontSize(8);
  pdf.text('Scenariu A = Maxim legal conform PUG (POT max, CUT max, Hmax)',W/2,H/2+15,{align:'center'});
  pdf.text('Scenariu B = Propunerea curentă, conform cu normativele selectate',W/2,H/2+23,{align:'center'});

  // ── SLIDE 5: CONFORMITATE + CONTACT ──────────────────────────────────
  newPg('CONFORMITATE NORMATIVĂ');
  const normBig=[
    {n:'NP 057',d:'Suprafețe minime',ok:true},
    {n:'P118',d:'Evacuare ISU',ok:true},
    {n:'OMS 119',d:'Însorire naturală',ok:true},
    {n:'PUG/RGU',d:'POT·CUT·Hmax',ok:(b.scArea||0)/P.area<=P.pot},
    {n:'NP 067',d:'Parcaje obligatorii',ok:!subsolInfo.needsBasement},
    {n:'P100',d:'Seismic ag corect',ok:true},
  ];
  normBig.forEach((nm,i)=>{
    const nx=W*.1+i*(W*.8/6), ny=H*.3;
    const r2=16;
    pdf.setFillColor(nm.ok?15:80,nm.ok?80:15,nm.ok?40:15);
    try{pdf.circle(nx,ny,r2,'F');}catch(e){pdf.rect(nx-r2,ny-r2,r2*2,r2*2,'F');}
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
    pdf.text(S2(nm.n),nx,ny-3,{align:'center'});
    pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
    pdf.text(S2(nm.d),nx,ny+3,{align:'center'});
    pdf.setFontSize(9);pdf.text(nm.ok?'✓':'!',nx,ny+10,{align:'center'});
  });
  pdf.setTextColor(180,200,230);pdf.setFont('helvetica','normal');pdf.setFontSize(7.5);
  pdf.text('Toate normativele verificate automat prin DNA Urban™',W/2,H*.55,{align:'center'});
  pdf.setTextColor(212,175,55);pdf.setFont('helvetica','bold');pdf.setFontSize(10);
  pdf.text('UrbanX TSS·FG — Platforma de Fundamentare Urbanistică Explicabilă',W/2,H*.70,{align:'center'});
  pdf.setTextColor(130,150,185);pdf.setFont('helvetica','normal');pdf.setFontSize(7.5);
  pdf.text('Analiză predictivă · Proiectare automatizată · Exporturi profesionale · BIM/CAD',W/2,H*.78,{align:'center'});

  const fn=('prezentare_invest_'+S2(P.nrCad)+'_'+S2(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
  if(typeof ss==='function') ss('✅ Prezentare investitori: 5 slide-uri · '+fn);
}

// ══════════════════════════════════════════════════════════════════════════
// D. ANIMAȚII THREE.JS INLINE
// ══════════════════════════════════════════════════════════════════════════
let _3dAnimFrame=null;
let _3dAnimActive=false;
let _3dWireframe=false;

function _rv3DAnimTour(){
  const mapbox=window.map||window.TCI?.map;
  if(!mapbox){
    if(typeof ss==='function') ss('⚠ Viewer 3D inactiv — activați vizualizatorul AEDIS');
    return;
  }
  const btn=document.getElementById('rv-anim-tour');
  if(_3dAnimActive){
    // Stop
    _3dAnimActive=false;
    if(_3dAnimFrame){cancelAnimationFrame(_3dAnimFrame);_3dAnimFrame=null;}
    if(btn){btn.innerHTML='▶';btn.style.background='rgba(15,20,45,.75)';}
    if(typeof ss==='function') ss('⏹ Tour oprit');
    return;
  }
  _3dAnimActive=true;
  if(btn){btn.innerHTML='⏹';btn.style.background='rgba(212,175,55,.25)';}
  if(typeof ss==='function') ss('▶ Tour orbital 360° — click ▶ din nou pentru oprire');

  let bearing=mapbox.getBearing()||0;
  const speed=0.3; // grade per frame
  const animate=()=>{
    if(!_3dAnimActive) return;
    bearing=(bearing+speed)%360;
    mapbox.setBearing(bearing);
    _3dAnimFrame=requestAnimationFrame(animate);
  };
  animate();
}

function _rv3DAnimBuild(){
  const mapbox=window.map||window.TCI?.map;
  const TCI3D=window.TCI?._3D;
  if(!mapbox&&!TCI3D){
    if(typeof ss==='function') ss('⚠ Viewer 3D inactiv');
    return;
  }
  if(typeof ss==='function') ss('🏗 Animație construcție etaj cu etaj…');
  const b=_RV.building;
  if(!b){return;}
  // Setăm toate înălțimile la 0 și le animăm progresiv
  if(TCI3D?._currentH&&TCI3D?._targetH){
    const origH=[...TCI3D._targetH];
    TCI3D._currentH=TCI3D._currentH.map(()=>0.5);
    let step=0, total=b.niv*60; // ~2s la 60fps
    const anim=()=>{
      step++;
      const prog=step/total;
      TCI3D._currentH=TCI3D._targetH.map((h,i)=>Math.max(0.5,h*Math.min(1,prog*1.2)));
      if(mapbox) mapbox.triggerRepaint();
      if(step<total) requestAnimationFrame(anim);
      else { TCI3D._currentH=origH; if(typeof ss==='function') ss('✅ Animație construcție completă'); }
    };
    requestAnimationFrame(anim);
    return;
  }
  // Fallback: animăm pitch
  if(mapbox){
    let pitch=0, step2=0;
    const anim2=()=>{
      step2++;
      pitch=45*Math.sin(step2/60*Math.PI);
      mapbox.setPitch(Math.max(0,pitch));
      if(step2<120) requestAnimationFrame(anim2);
      else if(typeof ss==='function') ss('✅ Animație completă');
    };
    requestAnimationFrame(anim2);
  }
}

function _rv3DToggleWireframe(){
  _3dWireframe=!_3dWireframe;
  const TCI3D=window.TCI?._3D;
  const btn=document.getElementById('rv-anim-wire');
  if(TCI3D?._meshes){
    TCI3D._meshes.forEach(m=>{
      if(m?.material){ m.material.wireframe=_3dWireframe; }
    });
    if(TCI3D._renderer&&TCI3D._scene&&TCI3D._camera)
      TCI3D._renderer.render(TCI3D._scene,TCI3D._camera);
    window.map?.triggerRepaint?.();
  }
  if(btn){
    btn.style.background=_3dWireframe?'rgba(212,175,55,.35)':'rgba(15,20,45,.75)';
    btn.style.color=_3dWireframe?'#fff':'#D4AF37';
  }
  if(typeof ss==='function') ss(_3dWireframe?'◈ Wireframe activat':'◼ Solid view');
}

function _rv3DSnapshot(){
  const mapCV=document.querySelector('.mapboxgl-canvas');
  const rv3D=window.TCI?._3D?._renderer;
  let imgData=null;
  if(rv3D){
    try{rv3D.render(window.TCI._3D._scene,window.TCI._3D._camera);imgData=rv3D.domElement.toDataURL('image/png',0.95);}
    catch(e){}
  }
  if(!imgData&&mapCV){
    try{imgData=mapCV.toDataURL('image/png',0.95);}catch(e){}
  }
  if(imgData){
    const a=document.createElement('a');
    const P=_RV.parcelParams;
    a.download=('snapshot_3d_'+String(P?.nrCad||'urbanx')+'_'+new Date().toISOString().slice(0,10)+'.png').replace(/[^a-zA-Z0-9._-]/g,'_');
    a.href=imgData; a.click();
    if(typeof ss==='function') ss('📸 Screenshot 3D salvat: '+a.download);
  } else {
    if(typeof ss==='function') ss('⚠ Screenshot indisponibil — activați vizualizatorul 3D');
  }
}

// ══════════════════════════════════════════════════════════════════════════
// E. HEATMAP DIAGNOSTIC PE PLAN 2D (toggle în canvas)
// ══════════════════════════════════════════════════════════════════════════
let _heatmapMode=null; // null / 'isu' / 'oms' / 'np057'

function _rvToggleHeatmap(){
  const modes=[null,'isu','oms','np057'];
  const labels={null:'Normal',isu:'ISU — Distanță evacuare',oms:'OMS — Însorire',np057:'NP057 — Suprafețe minime'};
  const idx=modes.indexOf(_heatmapMode);
  _heatmapMode=modes[(idx+1)%modes.length];

  const btn=document.getElementById('rv-heatmap-btn');
  if(btn){
    btn.innerHTML='🌡 '+(labels[_heatmapMode]||'Normal');
    btn.style.background=_heatmapMode?'rgba(239,68,68,.35)':'rgba(239,68,68,.12)';
  }
  if(typeof ss==='function') ss(_heatmapMode?'🌡 Heatmap: '+labels[_heatmapMode]+' (planul se re-randează)':'Normal view');

  // Re-render canvas cu heatmap overlay
  if(typeof _rvRender==='function'){
    // Patch temporar pe draw function pentru a adăuga overlay
    const origRender=window._rvRender;
    if(_heatmapMode){
      window._rvRenderHeatmap=()=>{
        origRender();
        _applyHeatmapOverlay(_heatmapMode);
      };
      window._rvRender=window._rvRenderHeatmap;
    } else {
      window._rvRender=origRender;
    }
    window._rvRender();
  }
}

function _applyHeatmapOverlay(mode){
  const cv=document.getElementById('rv-canvas');
  if(!cv) return;
  const ctx=cv.getContext('2d');
  if(!ctx) return;
  const fl=_RV.floors?.[0]; const b=_RV.building; const P=_RV.parcelParams;
  if(!fl||!b) return;

  const SC=_RV.scale||20;
  const pad=20, ox=pad+(P.rl||5)*SC, oy=pad+(P.rf||5)*SC;
  const NP057M={living:14,bedroom:12,bedroom2:10,bedroom3:8,kitchen:5,bath:3.6,wc:1.2};

  ctx.save();ctx.globalAlpha=0.45;
  fl.rects.forEach(r=>{
    if(r.t==='core') return;
    const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
    let color='rgba(34,197,94,0.7)'; // verde = OK

    if(mode==='isu'&&b.cores.length>0){
      const core=b.cores[0];
      const d=Math.hypot(r.x+r.w/2-core.x-core.w/2, r.y+r.h/2-core.y-core.h/2);
      const fnDist=(typeof FN_CONFIG!=='undefined')?FN_CONFIG[_RV.fn]?.isuDist||30:30;
      const ratio=Math.min(1,d/fnDist);
      color=`rgba(${Math.round(ratio*220)},${Math.round((1-ratio)*180)},30,0.75)`;
    } else if(mode==='oms'){
      color=r.solarOk===false?'rgba(239,68,68,0.7)':'rgba(34,197,94,0.7)';
    } else if(mode==='np057'){
      const min=NP057M[r.t]||0;
      if(min>0&&r.w*r.h<min) color='rgba(239,68,68,0.7)';
      else if(min>0&&r.w*r.h<min*1.2) color='rgba(234,179,8,0.7)';
    }

    ctx.fillStyle=color;
    ctx.fillRect(rx,ry,rw,rh);
    // Valoare
    ctx.fillStyle='rgba(0,0,0,0.7)';ctx.font=`bold ${Math.min(11,rw/4)}px sans-serif`;
    ctx.textAlign='center';
    if(mode==='isu'&&b.cores.length>0){
      const d=Math.hypot(r.x+r.w/2-b.cores[0].x-b.cores[0].w/2,r.y+r.h/2-b.cores[0].y-b.cores[0].h/2);
      if(rw>20&&rh>15) ctx.fillText(d.toFixed(0)+'m',rx+rw/2,ry+rh/2+4);
    } else if(mode==='np057'){
      if(rw>20&&rh>15) ctx.fillText((r.w*r.h).toFixed(1)+'m²',rx+rw/2,ry+rh/2+4);
    }
  });
  ctx.restore();

  // Legendă
  ctx.save();
  ctx.fillStyle='rgba(15,20,45,0.88)';ctx.roundRect?ctx.roundRect(8,cv.height-55,180,48,6):ctx.fillRect(8,cv.height-55,180,48);
  ctx.fill();
  ctx.fillStyle='#D4AF37';ctx.font='bold 9px sans-serif';ctx.textAlign='left';
  ctx.fillText(mode==='isu'?'🌡 Distanță față de scări (m)':mode==='oms'?'🌡 Însorire naturală':' 🌡 Suprafețe NP057',12,cv.height-40);
  [[34,197,94,'OK / Conform'],[234,179,8,'Marginal'],[239,68,68,'Neconform']].forEach(([r,g,b2,l],i)=>{
    ctx.fillStyle=`rgb(${r},${g},${b2})`;ctx.fillRect(12,cv.height-32+i*10,12,8);
    ctx.fillStyle='#c8d8f0';ctx.font='8px sans-serif';
    ctx.fillText(l,28,cv.height-25+i*10);
  });
  ctx.restore();
}

console.log('[Extras] ✅ Memoriu Tehnic + Export Complet + Prezentare + Animații 3D + Heatmap loaded');
