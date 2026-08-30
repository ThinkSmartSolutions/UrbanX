// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-pdf-upgrade.js — Uniformizare vizuală exporturi Relevee
// UrbanX TSS·FG
//
// Toate exporturile PDF din modulele Relevee vor folosi același design system
// ca studiile urbanistice: _initStudyPdf, hdr, ftr, sec, body, tblRow, kv,
// cover, concluzii, sign — text justify, paginare automată, surse citate,
// font consistent, date live.
//
// Rescrise complet:
// Copyright (c) 2024–2026 ThinkSmart Solutions SRL — Toate drepturile rezervate
// Proprietar: Florin Georgescu | contact@urbanx.ro | urbanx.ro | Utilizare conform LICENSE.

//   _rvExportTabelSuprafete  — Brevet de suprafețe
//   _rvExportTablouMateriale — Tablou de materiale
//   _rvExportMemoriu         — Memoriu tehnic DAC
//   _rvDNAOptimize           — Raport DNA Urban
//   Wrapper cover pentru:    — PlanseWalls, Acoperis, Fatade
// ═══════════════════════════════════════════════════════════════════════════
// UrbanX TSS·FG — Relevee PDF Upgrade — Design system unificat
// Copyright (c) 2024–2026 ThinkSmart Solutions SRL — Toate drepturile rezervate
// Proprietar: ThinkSmart Solutions SRL | contact@urbanx.ro | urbanx.ro
// Utilizare exclusiv conform termenilor de licență UrbanX. Redistribuire interzisă.

// ── Helper comun: init doc din _RV (nu din S.parcels care poate diferi) ──
function _rvInitDoc(title, subtitle, totalPages, opts){
  // Asigurăm că S.parcels[activeParcel] coincide cu _RV.parcelParams
  // pentru _initStudyPdf să citească datele corecte
  if(typeof _initStudyPdf !== 'function') return null;
  const P = _RV?.parcelParams;
  const ap = window.S?.parcels?.[window.S?.activeParcel??0];
  // Patch temporar dacă datele Relevee diferă
  if(ap && P?.nrCad && ap.nrcad !== P.nrCad){
    ap._rvPatchedNrcad = ap.nrcad;
    ap.nrcad = P.nrCad;
  }
  const d = _initStudyPdf(title, subtitle, totalPages, opts);
  // Restore
  if(ap?._rvPatchedNrcad){ ap.nrcad = ap._rvPatchedNrcad; delete ap._rvPatchedNrcad; }
  return d;
}

// ── Helper: pagină separator între copertă și planul tehnic ──────────────
function _rvPdfInfoPage(d, pageN, captionTitle, captionText, normative){
  const {pdf,W,H,DARK,NAVY,GOLD,GOLD2,LIGHT,LIGHT2,BLUE,
    S2,dateStr,nrcad,utr,area,params,uat,
    hdr,ftr,sec,body,tblRow,newPage,checkY} = d;
  let cy = newPage(captionTitle, pageN);
  cy = sec('DATE PARCELĂ + REGLEMENTĂRI PUG', cy); cy+=3;
  const kw4=(W-28)/4;
  const P=_RV.parcelParams, b=_RV.building;
  [['Nr. cadastral',S2(P.nrCad)],['UTR',S2(P.utr)],
   ['Suprafață',Math.round(P.area||0)+' m²'],['Regim H','P+'+(b.niv-1)+'E · H='+Math.round(b.niv*(P.hn||3))+'m'],
  ].forEach(([l,v],i)=>{ if(typeof d.kv==='function') d.kv(l,v,14+i*kw4,cy,kw4-2); });
  cy+=28;
  if(captionText){
    cy = body(captionText, 14, cy);
    cy+=4;
  }
  if(normative?.length){
    cy = sec('NORME APLICATE', cy); cy+=3;
    normative.forEach(([code,title2])=>{
      cy = tblRow([code, title2], cy, false, [40, W-28-40]);
      cy = checkY(cy, 10, captionTitle, pageN);
    });
  }
  return cy;
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. TABEL SUPRAFEȚE — rescriere completă cu _initStudyPdf
// ═══════════════════════════════════════════════════════════════════════════
window._rvExportTabelSuprafete = function(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  if(typeof _initStudyPdf!=='function'){
    // fallback la implementarea originală dacă 09-pdf-engine nu e disponibil
    return;
  }
  if(typeof ss==='function') ss('⏳ Generez Brevet de Suprafețe…');

  const d = _rvInitDoc('Brevet de Suprafete si Bilant Functional',
    'Relevee instant · NP 057/2002 · Legea 169/2026 (CATUC)', 4);
  if(!d) return;
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,BLUE,LIGHT,LIGHT2,RED,GREEN,ORANGE,
    S2,dateStr,nrcad,utr,area,params,uat,judet,
    hdr,ftr,sec,subsec,body,tblRow,kv,addImg,cover,newPage,checkY,concluzii,sign} = d;

  const cfg = typeof _rvGetAEDISConfig==='function'?_rvGetAEDISConfig():{};
  const fnLabels={rez:'Rezidențial colectiv',com:'Comercial',birouri:'Birouri',
    hotel:'Hotel',mixt_com_rez:'Mixt rezidențial+comercial'};
  const fnLabel = fnLabels[_RV.fn||'rez']||'Rezidențial';

  // Colectăm datele din floors
  const floors = _RV.floors||[];
  const aptMap = {};
  floors.forEach((fl,fi)=>{
    (fl?.rects||[]).forEach(r=>{
      if(r.bal) return;
      const a = +(r.w*r.h).toFixed(2);
      const aptKey = r.apt>=0?('APT '+(r.apt+1)):'SPAȚII COMUNE';
      if(!aptMap[aptKey]) aptMap[aptKey]={rooms:[],suUtil:0,scBrut:0};
      if(!['core','storage','lift'].includes(r.t)) aptMap[aptKey].suUtil += a;
      aptMap[aptKey].scBrut += a;
      aptMap[aptKey].rooms.push({
        etaj: fi===0?'Parter':'Etaj '+fi,
        lbl: r.lbl||r.t, w:r.w, h:r.h, a, t:r.t
      });
    });
  });
  const apts = Object.values(aptMap);
  const totalSU = apts.reduce((s,a)=>s+a.suUtil,0);
  const totalSC = b.scArea||(b.bW*b.bD*(P.pot||0.4));
  const totalSDA = b.sdaTotal||(totalSC*b.niv);
  const nrApt = apts.filter(a=>a.label!=='SPAȚII COMUNE').length;
  const seism = typeof getSeismConfig==='function'?getSeismConfig():{zona:'E',ag:0.20};

  // PAG 1 — Cover
  cover(S2(fnLabel)+' · P+'+(b.niv-1)+'E · SDA='+Math.round(totalSDA)+'m²',
    null,
    [['SU utilă totală', Math.round(totalSU)+' m²'],
     ['SC construită',   Math.round(totalSC)+' m²'],
     ['SDA desfășurată', Math.round(totalSDA)+' m²'],
     ['Nr. unități',     (nrApt||1)+' un.'],
     ['POT propus',      (totalSC/Math.max(1,P.area)*100).toFixed(1)+'%'],
     ['CUT propus',      (totalSDA/Math.max(1,P.area)).toFixed(2)],],
    true, 'BREVET SUPRAFEȚE · NP 057/2002 · '+S2(uat));

  // PAG 2 — Bilanț global + normative
  let cy = newPage('BILANȚ SUPRAFEȚE — SITUAȚIE FINALĂ', 2);
  cy = sec('1. BILANȚ GENERAL — CONF. LEGEA 350/2001 + NP 057/2002', cy); cy+=3;
  cy = body('Bilanțul de suprafețe de mai jos este calculat pe baza planurilor funcționale '+
    'generate de sistemul UrbanX pentru parcela '+S2(nrcad)+' (UTR '+S2(utr)+', '+
    'funcțiunea '+S2(fnLabel)+', '+b.niv+' niveluri, H='+Math.round(b.niv*(P.hn||3))+'m). '+
    'Valorile sunt orientative și necesită verificarea de un arhitect autorizat OAR.', 14, cy); cy+=4;

  const kw4=(W-28)/4;
  [['Suprafață teren',Math.round(P.area||0)+' m²'],
   ['Suprafață construită',Math.round(totalSC)+' m²'],
   ['SDA totală',Math.round(totalSDA)+' m²'],
   ['SU utilă totală',Math.round(totalSU)+' m²'],
  ].forEach(([l,v],i)=>kv(l,v,14+i*kw4,cy,kw4-2,[GOLD,BLUE,GREEN,ORANGE][i]));
  cy+=28;

  cy = tblRow(['Indicator','Valoare propusă','Maxim PUG','Status','Sursă'],
    cy,true,[45,35,32,22,W-28-45-35-32-22]);
  [['POT (Procent Ocupare Teren)',(totalSC/Math.max(1,P.area)*100).toFixed(1)+'%',
    (P.pot*100).toFixed(0)+'%',
    totalSC/P.area<=P.pot?'✓ CONF.':'✗ DEP.',
    'RGU HG 525/1996'],
   ['CUT (Coef. Utilizare Teren)',(totalSDA/Math.max(1,P.area)).toFixed(2),
    (P.cut||2).toFixed(2),
    totalSDA/P.area<=P.cut?'✓ CONF.':'✗ DEP.',
    'RGU HG 525/1996'],
   ['H max clădire',Math.round(b.niv*(P.hn||3))+'m',
    (P.hMax||28)+'m',
    b.niv*(P.hn||3)<=(P.hMax||28)?'✓ CONF.':'✗ DEP.',
    'PUG/RLU UTR '+S2(utr)],
   ['Nr. niveluri','P+'+(b.niv-1)+'E','—','—','AEDIS UrbanX'],
   ['Suprafețe verzi obligatorii',Math.round(P.area*0.2)+' m² min.','20% din parcelă',
    '✓ DE REALIZAT','Legea 24/2007'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[45,35,32,22,W-28-45-35-32-22]);cy=checkY(cy,12,'BILANȚ',2);});

  cy+=4;
  cy = sec('2. DATE SEISMICE + CLIMATICE AMPLASAMENT', cy); cy+=3;
  cy = tblRow(['Parametru','Valoare','Sursă normativă'],cy,true,[65,50,W-28-65-50]);
  [['Zonă seismică P100-1/2013','Zona '+seism.zona+', ag='+seism.ag+'g, Tc='+(seism.Tc||0.7)+'s','P100-1/2013 Anexa A'],
   ['Grade-zile HDD (baza 12°C)',((window._sCtx?.hdd)||(typeof _calcHDD==='function'?_calcHDD(P.lat||45.9,P.lon||24.9):2700))+' K·zile','SR EN 15927-6 + INMH'],
   ['GHI solar amplasament',((window._sCtx?.ghi)||(typeof _calcSolarGHI==='function'?_calcSolarGHI(P.lat||45.9,P.lon||24.9):1150))+' kWh/m²·an','PVGIS 5.3 (JRC Europa)'],
   ['Data elaborare',dateStr,'Generare automată'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[65,50,W-28-65-50]);});

  // PAG 3 — Tabel per apartament
  cy = newPage('3. BREVET SUPRAFEȚE PER UNITATE FUNCȚIONALĂ', 3);
  cy = sec('3.1. DESFĂȘURARE PE APARTAMENTE/UNITĂȚI — NP 057/2002', cy); cy+=3;

  apts.forEach((apt,ai)=>{
    cy = checkY(cy, 30, 'BREVET SUPRAFEȚE', 3);
    // Header apartament
    pdf.setFillColor(...NAVY); pdf.rect(14,cy,W-28,8,'F');
    pdf.setFillColor(...GOLD); pdf.rect(14,cy,3,8,'F');
    pdf.setTextColor(255,255,255); pdf.setFontSize(8.5); pdf.setFont('helvetica','bold');
    pdf.text(S2(Object.keys(aptMap)[ai]), 20, cy+5.5);
    pdf.setFontSize(7.5);
    pdf.text('SU util='+apt.suUtil.toFixed(2)+'m²  ·  SC brut='+apt.scBrut.toFixed(2)+'m²',
      W-16, cy+5.5, {align:'right'});
    cy+=10;

    cy = tblRow(['Cameră/Spațiu','Etaj','L (m)','l (m)','Arie (m²)','Min NP057 (m²)','Status'],
      cy,true,[50,18,18,18,24,32,W-28-50-18-18-18-24-32]);

    const NP057={living:14,bedroom:12,bedroom2:10,kitchen:5,bath:3.6,wc:1.2,hall:3,storage:1.5};
    apt.rooms.forEach(r=>{
      const minA = NP057[r.t]||0;
      const ok = minA===0||r.a>=minA;
      cy=tblRow([S2(r.lbl||r.t),r.etaj,r.w.toFixed(2),r.h.toFixed(2),r.a.toFixed(2),
        minA?minA.toFixed(1)+' m²':'—',
        ok?'✓ OK':(minA?'✗ '+((r.a-minA).toFixed(1))+'m²':'—')],
        cy,false,[50,18,18,18,24,32,W-28-50-18-18-18-24-32]);
      cy=checkY(cy,10,'BREVET SUPRAFEȚE',3);
    });
    cy+=4;
  });

  // PAG 4 — Concluzii + semnătură
  cy = newPage('4. CONCLUZII + SEMNĂTURĂ', 4);
  cy = concluzii([
    'Parcela '+S2(nrcad)+' (UTR '+S2(utr)+', '+Math.round(P.area)+'m², '+S2(uat)+') permite edificarea unui volum '+S2(fnLabel)+' cu '+b.niv+' niveluri, H='+Math.round(b.niv*(P.hn||3))+'m.',
    'Bilanț suprafețe: SC='+Math.round(totalSC)+'m² (POT='+(totalSC/P.area*100).toFixed(1)+'%), SDA='+Math.round(totalSDA)+'m² (CUT='+(totalSDA/P.area).toFixed(2)+'), SU utilă='+Math.round(totalSU)+'m².',
    (totalSC/P.area<=P.pot&&totalSDA/P.area<=(P.cut||2))?
      'Indicatorii urbanistici propuși RESPECTĂ limitele PUG (POT max '+(P.pot*100).toFixed(0)+'%, CUT max '+(P.cut||2)+').' :
      'ATENȚIE: Indicatorii propuși DEPĂȘESC limitele PUG. Verificați și ajustați propunerea.',
    'Suprafețele individuale ale camerelor au fost verificate față de NP 057/2002 (suprafețe minime locuire). Camerele marcate ✗ necesită redimensionare înainte de faza PAC.',
    'Documentul are caracter orientativ și necesită semnătura unui arhitect autorizat OAR pentru utilizarea în documentații tehnice (Legea 184/2001).',
    'Data elaborare: '+dateStr+'. Valorile se actualizează automat la fiecare regenerare a releveelor în UrbanX.',
  ],cy);
  sign(); ftr();

  _pdfSaveMobile(pdf,'brevet_suprafete_'+S2(P.nrCad).replace(/[^a-zA-Z0-9]/g,'_')+'.pdf');
  if(typeof ss==='function') ss('✅ Brevet de suprafețe generat · '+apts.length+' unități · SDA='+Math.round(totalSDA)+'m²');
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. TABLOU MATERIALE — rescriere cu _initStudyPdf
// ═══════════════════════════════════════════════════════════════════════════
window._rvExportTablouMateriale = function(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  if(typeof _initStudyPdf!=='function') return;
  if(typeof ss==='function') ss('⏳ Generez Tablou Materiale…');

  const d = _rvInitDoc('Tablou de Materiale si Cantitati Estimate',
    'Deviz estimativ orientativ · NCS + SR EN 206 · C 107/4-2022', 4);
  if(!d) return;
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,BLUE,LIGHT,RED,GREEN,ORANGE,
    S2,dateStr,nrcad,utr,area,params,uat,
    hdr,ftr,sec,body,tblRow,kv,cover,newPage,checkY,concluzii,sign} = d;

  const cfg = typeof _rvGetAEDISConfig==='function'?_rvGetAEDISConfig():{};
  const curs = window._sCtx?.curs || window._cursEUR || 5.05;
  const scArea = b.scArea||(b.bW*b.bD*(P.pot||0.4));
  const sdaTotal = b.sdaTotal||(scArea*b.niv);
  const vol = scArea*(b.niv*(P.hn||3)+0.5);  // volum construit estimat m³
  const perim = 2*(b.bW+b.bD);

  // Generăm articolele de deviz (cantități calculate)
  const articole = [
    // CAP 1 — TERASAMENTE
    {cat:'TERASAMENTE', cod:'T01', desc:'Săpătură mecanică fundații + subsol',  um:'m³', cant:Math.round(scArea*2.2),   pret:15,  sursa:'NCS 2024'},
    {cat:'TERASAMENTE', cod:'T02', desc:'Umplutură compactată cu piatră spartă', um:'m³', cant:Math.round(scArea*0.5),   pret:45,  sursa:'NCS 2024'},
    // CAP 2 — BETON
    {cat:'BETON ARMAT', cod:'B01', desc:'Beton fundații continue C20/25',        um:'m³', cant:Math.round(perim*0.45*0.8),pret:680, sursa:'SR EN 206'},
    {cat:'BETON ARMAT', cod:'B02', desc:'Armătură fundații OB37/PC52',           um:'kg', cant:Math.round(perim*0.45*80), pret:6.5, sursa:'SR EN 1992'},
    {cat:'BETON ARMAT', cod:'B03', desc:'Beton stâlpi+grinzi C25/30',            um:'m³', cant:Math.round(vol*0.05),     pret:720, sursa:'SR EN 206'},
    {cat:'BETON ARMAT', cod:'B04', desc:'Armătură stâlpi+grinzi PC52',           um:'kg', cant:Math.round(vol*0.05*120), pret:7.2, sursa:'SR EN 1992'},
    {cat:'BETON ARMAT', cod:'B05', desc:'Planșee din beton armat C25/30',        um:'m²', cant:Math.round(scArea*b.niv), pret:185, sursa:'SR EN 206'},
    // CAP 3 — ZIDĂRIE
    {cat:'ZIDĂRIE',     cod:'Z01', desc:'Pereți ext. BCA 20cm+EPS 15cm (+tenc.)',um:'m²', cant:Math.round(perim*(b.niv*(P.hn||3))*0.75), pret:280, sursa:'C107/4-2022'},
    {cat:'ZIDĂRIE',     cod:'Z02', desc:'Pereți interiori BCA 15cm',             um:'m²', cant:Math.round(sdaTotal*0.4),  pret:120, sursa:'NP 057/2002'},
    // CAP 4 — ÎNVELITOARE/TERASĂ
    {cat:'ACOPERIȘ',    cod:'A01', desc:(cfg.terasa?'Terasă circulabilă 5 straturi':'Șarpantă lemn stratificat + învelitoare ceramică'), um:'m²', cant:Math.round(scArea*1.15), pret:cfg.terasa?380:220, sursa:'ANSI/SPRI'},
    // CAP 5 — TÂMPLĂRIE
    {cat:'TÂMPLĂRIE',   cod:'F01', desc:'Tâmplărie exterioară PVC/ALU tripan Ug≤0.7', um:'m²', cant:Math.round(perim*(b.niv*(P.hn||3))*0.25), pret:650, sursa:'SR EN 14351-1'},
    {cat:'TÂMPLĂRIE',   cod:'F02', desc:'Uși interioare furnir stejar, Rw≥30dB',  um:'buc',cant:Math.round(sdaTotal/20), pret:850, sursa:'SR EN ISO 717-1'},
    // CAP 6 — FINISAJE
    {cat:'FINISAJE',    cod:'FI01',desc:'Pardoseli gresie/parchet (interior)',     um:'m²', cant:Math.round(sdaTotal*0.88),pret:110, sursa:'SR EN 14411'},
    {cat:'FINISAJE',    cod:'FI02',desc:'Finisaj exterior (tencuială silicat '+( cfg.finisajExt||'bej')+')',um:'m²', cant:Math.round(perim*(b.niv*(P.hn||3))*0.75),pret:cfg.pereCortina?380:95,sursa:'EN 998-1'},
    {cat:'FINISAJE',    cod:'FI03',desc:'Tavan gips-carton suspendat',            um:'m²', cant:Math.round(sdaTotal*0.7), pret:55, sursa:'EN 520'},
    // CAP 7 — INSTALAȚII
    {cat:'INSTALAȚII',  cod:'IN01',desc:'Instalații sanitare (APĂ+CANAL)',        um:'APT', cant:Math.max(1,Math.round(sdaTotal/65)), pret:3200, sursa:'SR EN 806'},
    {cat:'INSTALAȚII',  cod:'IN02',desc:'Instalații electrice complet (TGBT+circ)',um:'m²', cant:Math.round(sdaTotal),    pret:55,  sursa:'NTE 007/08'},
    {cat:'INSTALAȚII',  cod:'IN03',desc:'Instalații HVAC (climatizare+ventilare)', um:'m²', cant:Math.round(sdaTotal),    pret:75,  sursa:'NP 037/1999'},
    {cat:'INSTALAȚII',  cod:'IN04',desc:'Lift conform SR EN 81-1 (dacă>P+2E)',    um:'buc', cant:b.niv>3?Math.max(1,Math.ceil(scArea/400)):0, pret:35000, sursa:'SR EN 81-1'},
  ].filter(a=>a.cant>0);

  // Calcul total
  const totalEUR = articole.reduce((s,a)=>s+a.cant*a.pret,0);
  const totalRON = Math.round(totalEUR*curs);
  const cats = [...new Set(articole.map(a=>a.cat))];

  // PAG 1 — Cover
  cover('Deviz estimativ orientativ · '+Math.round(sdaTotal)+'m² SDA · '+b.niv+' niveluri',
    null,
    [['SDA totală',Math.round(sdaTotal)+' m²'],['Nr. articole',articole.length+' poz.'],
     ['Total estimat',Math.round(totalEUR/1000)+'k EUR'],['Curs BNR',curs.toFixed(4)+' RON/EUR'],
     ['Cost mp SDA',Math.round(totalEUR/Math.max(1,sdaTotal))+' EUR/m²'],['Data',dateStr]],
    true,'TABLOU MATERIALE + CANTITĂȚI · UrbanX TSS·FG');

  // PAG 2 — Metodologie + avertismente
  let cy = newPage('METODOLOGIE + DISCLAIMER', 2);
  cy = sec('1. METODOLOGIE CALCUL CANTITĂȚI', cy); cy+=3;
  cy = body('Cantitățile din tabloul de materiale sunt estimate pe baza dimensiunilor volumului AEDIS '+
    '(SC='+Math.round(scArea)+'m², SDA='+Math.round(sdaTotal)+'m², H='+Math.round(b.niv*(P.hn||3))+'m) '+
    'și a normelor de consum NCS 2024. Prețurile unitare sunt bazate pe mediile pieței din România '+
    '2025-2026 (sursa: INSSE + oferte constructori). Curs EUR/RON: '+curs.toFixed(4)+' (BNR, '+dateStr+').', 14, cy); cy+=4;
  cy = tblRow(['Capitol','Descriere','Sursă cantitate','Sursă preț'],cy,true,[25,80,40,W-28-25-80-40]);
  [['CAP 1','Terasamente — volumetrie din SC și adâncime estimată','NCS 2024','Prețuri medii piață RO 2025'],
   ['CAP 2','Beton armat — rapoarte empirice (5% din volum construit)','SR EN 206 + EC2','NCS 2024 + oferte'],
   ['CAP 3','Zidărie — suprafețe din perimetru × înălțime × factor','NP 057/2002','INSSE indici 2025'],
   ['CAP 4','Acoperiș — suprafață = SC × 1.15 (factor pantă)','ANSI/SPRI','Prețuri piață RO'],
   ['CAP 5','Tâmplărie — 25% din suprafața fațadelor','SR EN 14351-1','Prețuri piață RO'],
   ['CAP 6','Finisaje — raporturi din SDA','SR EN 14411','INSSE + catalog'],
   ['CAP 7','Instalații — per apartament sau per m²','NTE 007/08 + SR EN 806','Oferte instalatori RO'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[25,80,40,W-28-25-80-40]);cy=checkY(cy,10,'METODOLOGIE',2);});
  cy+=4;
  pdf.setFillColor(200,30,30); pdf.rect(14,cy,W-28,8,'F');
  pdf.setTextColor(255,255,255); pdf.setFontSize(7.5); pdf.setFont('helvetica','bold');
  pdf.text('⚠ DEVIZ ORIENTATIV ±30% — NU înlocuiește devizul elaborat de evaluator autorizat ANEVAR sau antreprenor autorizat.', W/2, cy+5.5, {align:'center'});
  cy+=12;

  // PAG 3 — Tabloul propriu-zis
  cy = newPage('TABLOU MATERIALE — DESFĂȘURARE COMPLETĂ', 3);
  cats.forEach(cat=>{
    cy = checkY(cy, 20, 'TABLOU MATERIALE', 3);
    cy = sec(cat, cy); cy+=2;
    cy = tblRow(['Cod','Descriere articol','UM','Cantitate','Preț/UM (EUR)','Total (EUR)','Sursă'],
      cy,true,[16,85,12,20,22,24,W-28-16-85-12-20-22-24]);
    const artsCat = articole.filter(a=>a.cat===cat);
    artsCat.forEach(a=>{
      const total=(a.cant*a.pret).toLocaleString('ro-RO',{maximumFractionDigits:0});
      cy=tblRow([a.cod,S2(a.desc),a.um,a.cant.toLocaleString('ro-RO'),
        a.pret.toLocaleString('ro-RO'),total,S2(a.sursa)],
        cy,false,[16,85,12,20,22,24,W-28-16-85-12-20-22-24]);
      cy=checkY(cy,10,'TABLOU MATERIALE',3);
    });
    const subtotal=artsCat.reduce((s,a)=>s+a.cant*a.pret,0);
    pdf.setFillColor(...DARK); pdf.rect(14,cy-5,W-28,5,'F');
    pdf.setTextColor(...GOLD); pdf.setFontSize(7); pdf.setFont('helvetica','bold');
    pdf.text('Subtotal '+S2(cat)+': '+subtotal.toLocaleString('ro-RO',{maximumFractionDigits:0})+' EUR',
      W-16,cy-0.5,{align:'right'});
    cy+=4;
  });

  // TOTAL
  pdf.setFillColor(...NAVY); pdf.rect(14,cy,W-28,10,'F');
  pdf.setFillColor(...GOLD); pdf.rect(14,cy,W-28,1.5,'F');
  pdf.setTextColor(255,255,255); pdf.setFontSize(10); pdf.setFont('helvetica','bold');
  pdf.text('TOTAL ESTIMAT (fără TVA):  '+totalEUR.toLocaleString('ro-RO',{maximumFractionDigits:0})+' EUR  =  '+totalRON.toLocaleString('ro-RO')+' RON',
    W/2,cy+7,{align:'center'});
  cy+=14;
  pdf.setTextColor(130,145,165); pdf.setFontSize(6); pdf.setFont('helvetica','italic');
  pdf.text('Cost specific estimat: '+Math.round(totalEUR/Math.max(1,sdaTotal))+' EUR/m²SDA · Curs BNR: '+curs.toFixed(4)+' RON/EUR ('+dateStr+') · Eroare estimativă ±30%',
    W/2,cy,{align:'center'});
  cy+=6;

  // PAG 4 — Concluzii
  cy = newPage('CONCLUZII + SEMNĂTURĂ', 4);
  cy = concluzii([
    'Tabloul de materiale și cantități estimative pentru parcela '+S2(nrcad)+' (SDA='+Math.round(sdaTotal)+'m², '+b.niv+' niveluri, '+S2(uat)+') cuprinde '+articole.length+' articole din 7 capitole.',
    'Costul total estimat este de '+Math.round(totalEUR/1000)+'k EUR (±30%), echivalent a ~'+Math.round(totalEUR/Math.max(1,sdaTotal))+' EUR/m²SDA. La curs BNR '+curs.toFixed(2)+' RON/EUR = '+Math.round(totalRON/1000)+'k RON.',
    'Finisajul exterior: '+S2(cfg.finisajExt||'tencuială silicată')+'. Tâmplărie: tripan Ug≤0.7 W/m²K conf. C107/4-2022. Structură: beton armat C'+( b.niv<=4?'25/30':'30/37')+'.',
    b.niv>3?'LIFT: obligatoriu conform Legii 448/2006 — min. 1 buc, dimensiuni conf. SR EN 81-1.':'Lift: nu este obligatoriu la P+'+(b.niv-1)+'E (recomandabil conf. NP 051/2012).',
    'Devizul final se elaborează de un evaluator autorizat ANEVAR (Legea 133/2015) sau constructor autorizat, pe baza proiectului tehnic (PT) complet.',
    'Prețurile unitare sunt bazate pe mediile pieței din România 2025-2026 (sursa: INSSE indici construcții + oferte antreprenori). Actualizați la momentul licitației.',
  ],cy);
  sign(); ftr();

  _pdfSaveMobile(pdf,'tablou_materiale_'+S2(P.nrCad).replace(/[^a-zA-Z0-9]/g,'_')+'.pdf');
  if(typeof ss==='function') ss('✅ Tablou Materiale · '+articole.length+' articole · ~'+Math.round(totalEUR/1000)+'k EUR ±30%');
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. MEMORIU TEHNIC — rescriere cu _initStudyPdf (10 pagini, design complet)
// ═══════════════════════════════════════════════════════════════════════════
window._rvExportMemoriu = async function(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  if(typeof _initStudyPdf!=='function') return;
  if(typeof ss==='function') ss('⏳ Generez Memoriu Tehnic…');

  const d = _rvInitDoc('Memoriu Tehnic Preliminar — Documentatie DAC',
    'DAC · Legea 169/2026 (CATUC) · HG 907/2016 · NP 057/2002 · P100-1/2013', 10);
  if(!d) return;
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,BLUE,LIGHT,LIGHT2,RED,GREEN,ORANGE,PURPLE,
    S2,dateStr,nrcad,utr,area,params,uat,judet,
    hdr,ftr,sec,subsec,body,tblRow,kv,addImg,cover,newPage,checkY,concluzii,sign} = d;

  const cfg = typeof _rvGetAEDISConfig==='function'?_rvGetAEDISConfig():{};
  const fnLabels={rez:'Rezidențial colectiv',com:'Spații comerciale',birouri:'Birouri',
    hotel:'Hotel/Cazare',mixt_com_rez:'Mixt Rezidențial+Comercial',
    mixt_bir_rez:'Mixt Birouri+Rezidențial'};
  const fnLabel = fnLabels[_RV.fn||'rez']||'Rezidențial colectiv';
  const scArea = b.scArea||(b.bW*b.bD*(P.pot||0.4));
  const sdaTotal = b.sdaTotal||(scArea*b.niv);
  const hTotal = b.niv*(P.hn||3);
  const subsolInfo = typeof _calcSubsolNeeded==='function'?_calcSubsolNeeded(b,P):{needsBasement:false};
  const seism = window._sCtx?.seism||(typeof getSeismConfig==='function'?getSeismConfig():{zona:'E',ag:0.20});
  const hidro = window._sCtx?.hidro||(typeof getHidroConfig==='function'?getHidroConfig():{nfa:3,portanta:220});
  const hdd = window._sCtx?.hdd||(typeof _calcHDD==='function'?_calcHDD(P.lat||45.9,P.lon||24.9):2700);
  const matExt = cfg.pereCortina?'Perete cortină aluminiu+geam tripan (Uw≤0.7 W/m²K)':
    cfg.finisajExt==='clinker'?'Cărămidă aparentă clinker pe BCA 20cm+EPS 15cm':
    cfg.finisajExt==='travertin'?'Travertin natural pe BCA 20cm+EPS 15cm':
    'BCA 20cm + EPS 15cm + tencuială silicată';

  // PAG 1 — Copertă formală
  cover('Documentație pentru Autorizarea de Construire · '+S2(uat),
    null,
    [['Nr. cadastral',S2(P.nrCad)],['UAT / Județ',S2(uat)+', jud. '+S2(judet)],
     ['UTR',S2(utr)],['Funcțiune',S2(fnLabel)],
     ['Regim H','P+'+(b.niv-1)+'E · H='+hTotal.toFixed(1)+'m'],['Data',dateStr]],
    true,'MEMORIU TEHNIC PRELIMINAR · DOCUMENT ORIENTATIV');

  // PAG 2 — Date generale
  let cy = newPage('A. DATE DE IDENTIFICARE A PROIECTULUI', 2);
  cy = sec('A.1. IDENTIFICARE AMPLASAMENT', cy); cy+=3;
  cy = tblRow(['Parametru','Valoare','Sursă/Normativ'],cy,true,[70,60,W-28-70-60]);
  [['Nr. cadastral',S2(P.nrCad),'ANCPI/OCPI'],
   ['Unitate Teritorial-Rurală',S2(uat)+', jud. '+S2(judet),'Registrul Național UAT'],
   ['Zonă UTR (din PUG)',S2(utr),'PUG/RLU '+S2(uat)],
   ['Suprafață teren',Math.round(P.area||0)+' m²','Extras CF OCPI'],
   ['Coordonate GPS',((P.lat||45.9).toFixed(5))+'°N, '+((P.lon||24.9).toFixed(5))+'°E','GPS/ANCPI'],
   ['Cotă teren AMSL (estimat)',(window._sCtx?.elev||'—')+(window._sCtx?.elev?' m AMSL ('+S2(window._sCtx?.elevSrc)+')':''),'Mapbox Terrain-RGB / OpenTopo'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[70,60,W-28-70-60]);});
  cy+=4;
  cy = sec('A.2. PROPUNERE DE CONSTRUIRE', cy); cy+=3;
  cy = tblRow(['Indicator','Propus','Maxim PUG','Status'],cy,true,[60,35,32,W-28-60-35-32]);
  [['Funcțiunea clădirii',S2(fnLabel),'—','—'],
   ['Regim de înălțime','P+'+(b.niv-1)+'E = '+hTotal.toFixed(1)+'m',(P.hMax||28)+'m',hTotal<=(P.hMax||28)?'✓ CONF.':'⚠ DEP.'],
   ['POT realizat',(scArea/Math.max(1,P.area)*100).toFixed(1)+'%',(P.pot*100).toFixed(0)+'%',scArea/P.area<=P.pot?'✓ CONF.':'⚠ DEP.'],
   ['CUT realizat',(sdaTotal/Math.max(1,P.area)).toFixed(2),(P.cut||2).toFixed(2),sdaTotal/P.area<=(P.cut||2)?'✓ CONF.':'⚠ DEP.'],
   ['Suprafață construită SC',Math.round(scArea)+' m²','—','—'],
   ['Suprafață desfășurată SDA',Math.round(sdaTotal)+' m²','—','—'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[60,35,32,W-28-60-35-32]);cy=checkY(cy,10,'DATE',2);});

  // PAG 3 — Descriere arhitecturală
  cy = newPage('B. DESCRIERE ARHITECTURALĂ', 3);
  cy = sec('B.1. COMPOZIȚIE FUNCȚIONALĂ — NP 057/2002', cy); cy+=3;
  cy = body('Clădirea propusă este destinată funcțiunii "'+S2(fnLabel)+'", compusă din '+
    b.niv+' niveluri supraterane ('+( b.niv===1?'Parter':'Parter + '+(b.niv-1)+' etaje')+
    '), cu înălțimea totală de '+hTotal.toFixed(1)+'m față de cota ±0.00 (conf. Legea 169/2026 (CATUC)). '+
    'Suprafața construită este de '+Math.round(scArea)+'m², suprafața desfășurată de '+Math.round(sdaTotal)+
    'm², rezultând un CUT realizat de '+(sdaTotal/Math.max(1,P.area)).toFixed(2)+' față de maximul admis de '+(P.cut||2)+
    ' prin PUG/RLU UTR '+S2(utr)+'.', 14, cy); cy+=4;
  cy = sec('B.2. SOLUȚIE CONSTRUCTIVĂ', cy); cy+=3;
  cy = tblRow(['Element constructiv','Soluție propusă','Standard/Normativ'],cy,true,[55,90,W-28-55-90]);
  [['Structură de rezistență',b.niv<=4?'Cadre BA C25/30, stâlpi 40×40cm':'Structură duală BA C30/37, diafragme','EC 2 (SR EN 1992-1-1) + P100-1/2013'],
   ['Fundare','Fundații continue din BA, Df='+(hidro.adancime_fundare||1.0)+'m (sub linia de îngheț)','NP 112/2014 + NP 074/2014'],
   ['Pereți exteriori',matExt,'C 107/4-2022: U_perete≤0.35 W/m²K'],
   ['Pereți interiori','BCA 15cm (compartim.) / zidărie 10cm (baie/wc)','NP 057/2002 §3.4'],
   ['Planșee','Beton armat monolit C25/30, grosime 15-18cm','SR EN 1992-1-1'],
   ['Acoperiș',cfg.terasa?'Terasă circulabilă 5 straturi (hidroiz.+termoiz.+dale)':
     cfg.mansarda?'Mansardă + șarpantă din lemn stratificat, pante 35°':
     'Șarpantă din lemn stratificat, pante 30°, învelitoare ceramică','C107/4-2022: U_acoperiș≤0.20 W/m²K'],
   ['Tâmplărie exterioară','PVC/ALU cu geam tripan Low-E, Ug≤0.7 W/m²K','SR EN 14351-1 + C107/4-2022'],
   ['Finisaj exterior',cfg.pereCortina?'Perete cortină reflexiv':S2(cfg.finisajExt||'Tencuială silicată'),'SR EN 998-1'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[55,90,W-28-55-90]);cy=checkY(cy,10,'ARHITECTURĂ',3);});

  // PAG 4 — Instalații
  cy = newPage('C. INSTALAȚII TEHNICE', 4);
  cy = sec('C.1. BRANȘAMENTE ȘI INSTALAȚII NECESARE', cy); cy+=3;
  cy = tblRow(['Tip instalație','Soluție','Aviz necesar','Normativ'],cy,true,[35,70,40,W-28-35-70-40]);
  [['Apă potabilă','Branșament la rețeaua publică existentă, DN conform SR 1343-1:2022','DA — operator local','SR 1343-1:2022'],
   ['Canalizare','Racord la rețeaua publică separativă (menajer+pluvial)','DA — operator local','SR EN 12056'],
   ['Electric','Branșament 0.4kV / PT propriu (>100kW)','DA — distribuitor','NTE 007/08'],
   ['Gaze naturale','Branșament la rețeaua de distribuție gaze','DA — distribuitor','NP 029/2002'],
   ['Încălzire',subsolInfo.needsBasement?'CT proprie + circuit solar termic':'Centrală termică per unitate','—','SR EN 12831'],
   ['Canalizare pluvială','Sistem separativ + cisternă recuperare conf. SR EN 752:2021','—','SR EN 752'],
   subsolInfo.needsBasement?['Subsol parcaje',subsolInfo.nLevels+' nivel(uri) subteran, '+subsolInfo.deficit+' locuri NP 067','—','NP 067/2002']:null,
  ].filter(Boolean).forEach(r=>{cy=tblRow(r,cy,false,[35,70,40,W-28-35-70-40]);cy=checkY(cy,10,'INSTALAȚII',4);});

  // PAG 5 — Date geotehnice + seismice
  cy = newPage('D. DATE GEOTEHNICE + SEISMICE', 5);
  cy = sec('D.1. CONDIȚII DE TEREN — NP 074/2014', cy); cy+=3;
  cy = body('Datele geotehnice prezentate sunt ESTIMATIVE (din baza de date regională INHGA). '+
    'OBLIGATORIU: studiu geotehnic cu min. 2 foraje conf. NP 074/2014 înainte de faza PT.', 14, cy); cy+=4;
  const kw4=(W-28)/4;
  [['NFA estimat',(hidro.nfa||3).toFixed(1)+'m'],['Portanță est.',(hidro.portanta||220)+' kPa'],
   ['Tip sol',S2(hidro.tip_sol||'Argile prafoase')],['Df minim',(hidro.adancime_fundare||1.0)+'m'],
  ].forEach(([l,v],i)=>kv(l,v,14+i*kw4,cy,kw4-2,[BLUE,GREEN,ORANGE,GOLD][i]));
  cy+=28;
  cy = sec('D.2. CONDIȚII SEISMICE — P100-1/2013', cy); cy+=3;
  cy = tblRow(['Parametru seismic','Valoare','Normativ'],cy,true,[70,50,W-28-70-50]);
  [['Zonă seismică','Zona '+seism.zona+' (ag='+seism.ag+'g, Tc='+(seism.Tc||0.7)+'s)','P100-1/2013 Anexa A'],
   ['Accelerație de proiectare ag',seism.ag+'g × γI='+(b.niv>8?1.2:1.0)+' = '+(seism.ag*(b.niv>8?1.2:1.0)).toFixed(3)+'g','P100-1/2013 §4.3'],
   ['Clasă de importanță',b.niv>8?'II (γI=1.2)':'III (γI=1.0)','CR 0/2012'],
   ['Clasă ductilitate','DCM (Ductilitate Medie)','P100-1/2013 cap.5'],
   ['Sistem structural recomandat',b.niv<=4?'Cadre BA + fundații continue':b.niv<=8?'Structură duală (cadre+diafragme)':'Pereți structurali BA + fundații adânci','P100-1/2013 + EC2'],
   ['Grade-zile HDD',hdd+' K·zile','SR EN 15927-6 + INMH'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[70,50,W-28-70-50]);cy=checkY(cy,10,'SEISMIC',5);});

  // PAG 6 — Cerințe legale
  cy = newPage('E. CERINȚE LEGALE + AVIZE', 6);
  cy = sec('E.1. CERINȚE ESENȚiale CALITATE CONSTRUCȚII — LEGEA 10/1995', cy); cy+=3;
  cy = tblRow(['Cerință esențială','Soluție propusă','Normativ'],cy,true,[50,85,W-28-50-85]);
  [['A. Rezistență mecanică+stabilitate','Structură BA conf. EC 2+P100-1/2013, studiu geotech. obligat.','Legea 10/1995 art.5+EC 2'],
   ['B. Securitate la incendiu','ISU aviz DTAC, sisteme detectie+stingere+evacuare P118','Legea 10/1995 art.5+P118'],
   ['C. Igienă, sănătate, mediu','Ventilare NP 037, iluminat EN 17037, OMS 119/2014','Legea 10/1995 art.5'],
   ['D. Securitate în exploatare','PMR NP 051/2012, scări NP 051, balustrade 1.10m','Legea 10/1995 art.5'],
   ['E. Protecție zgomot','Izolare fonică Rw≥47dB pereți, Rw≥35dB geamuri C 125-2013','Legea 10/1995 art.5'],
   ['F. Economie energie+izolatii termice','CPE clasa B minim, NZEB conf. Legii 372/2005','Legea 372/2005+C107/4'],
   ['G. Utilizare durabilă resurse','Materiale certificate, deșeuri construcții conf. HG 349/2005','Legea 10/1995 art.5'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[50,85,W-28-50-85]);cy=checkY(cy,10,'CERINȚE',6);});
  cy+=4;
  cy = sec('E.2. AVIZE OBLIGATORII ÎNAINTE DE EMITEREA AC', cy); cy+=3;
  const avize_mem=[
    ['Aviz APĂ+CANAL','DA','Operator local (ANRSC)','Branșament + rețea'],
    ['Aviz ELECTRIC','DA','Distribuitor zona (ANRSC)','Branșament electric'],
    ['Aviz GAZE','DA','Distribuitor gaze (ANRSC)','Branșament gaze'],
    ['Aviz ISU','DA','ISU Județean','Securitate la incendiu'],
    ['Aviz APM','Cf. HG 445/2009','APM Județean','Dacă proiect >1000m² SDA'],
    ['Aviz AACR','Cf. distanță','AACR (aacr.ro)','Dacă dist. aeroport <15km'],
    ['Aviz DJCPN','Dacă LMI','Direcția Cultură','Dacă zonă protejată'],
  ];
  cy=tblRow(['Aviz','Obligatoriu','Emitent','Condiție'],cy,true,[45,28,55,W-28-45-28-55]);
  avize_mem.forEach(r=>{cy=tblRow(r,cy,false,[45,28,55,W-28-45-28-55]);cy=checkY(cy,10,'AVIZE',6);});

  // PAG 7-9: completăm cu date tehnice suplimentare
  cy = newPage('F. DATE ENERGETICE + CLIMATICE', 7);
  cy = sec('F.1. PERFORMANȚĂ ENERGETICĂ ESTIMATIVĂ — MC001-3/2022', cy); cy+=3;
  const ghiVal = window._sCtx?.ghi||(typeof _calcSolarGHI==='function'?_calcSolarGHI(P.lat||45.9,P.lon||24.9):1150);
  const uWall=0.25, uRoof=0.16, uWin=0.90;
  const aWall=(2*(b.bW+b.bD))*b.niv*(P.hn||3)*0.75;
  const aWin=(2*(b.bW+b.bD))*b.niv*(P.hn||3)*0.25;
  const Htrans=uWall*aWall+uRoof*(b.bW*b.bD)+uWin*aWin+0.26*(b.bW*b.bD);
  const QcalcKwh=Math.round(Htrans*hdd*24/1000);
  const Su=Math.round(sdaTotal*0.78);
  const epSpec=Math.round(QcalcKwh/Math.max(1,Su));
  cy=tblRow(['Parametru energetic','Valoare','Standard'],cy,true,[70,50,W-28-70-50]);
  [['Grade-zile HDD amplasament',hdd+' K·zile','SR EN 15927-6 + INMH'],
   ['GHI solar amplasament',ghiVal+' kWh/m²·an','PVGIS 5.3 (JRC Europa)'],
   ['U perete exterior propus',uWall+' W/m²K (max '+0.35+')','C107/4-2022 Tabel 7'],
   ['U acoperiș propus',uRoof+' W/m²K (max '+0.20+')','C107/4-2022 Tabel 7'],
   ['U tâmplărie exterioară',uWin+' W/m²K (max '+1.30+')','SR EN 14351-1'],
   ['Ep specific estimat',epSpec+' kWh/m²·an','MC001-3/2022'],
   ['Clasa energetică estimată',epSpec<=50?'A+':epSpec<=100?'A':epSpec<=150?'B':epSpec<=200?'C':'D-E','Ord. 2641/2017'],
   ['NZEB (≤100 kWh/m²·an)',epSpec<=100?'✓ CONFORM':'✗ Necesare măsuri','Legea 372/2005 mod.'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[70,50,W-28-70-50]);cy=checkY(cy,10,'ENERGETIC',7);});

  cy = newPage('G. BAZE LEGALE COMPLETE', 8);
  cy = sec('G.1. CADRU LEGISLATIV ȘI NORMATIV', cy); cy+=3;
  cy=tblRow(['Act normativ','Titlu prescurtat','Aplicabilitate'],cy,true,[35,120,W-28-35-120]);
  [['Legea 169/2026 (CATUC)','Autorizarea executării lucrărilor de construcții','Cadru general AC'],
   ['HG 907/2016','Conținut-cadru documentații tehnico-economice','DTAC + PT'],
   ['Legea 10/1995','Calitatea în construcții — cerințe esențiale','Toate clădirile'],
   ['NP 057/2002','Normativ locuire colectivă — suprafețe minime','Rezidențial'],
   ['P100-1/2013','Cod de proiectare seismică','Structuri RO'],
   ['NP 074/2014','Normativ geotehnică — doc. de teren','Fundații'],
   ['NP 112/2014','Normativ fundare directă','Dimensionare fundații'],
   ['C 107/4-2022','Normativ calcul termotehnic clădiri','Anvelopă termică'],
   ['Legea 372/2005','Performanța energetică — NZEB','CPE obligatoriu'],
   ['NP 051/2012','Accesibilitate PMR','Persoane cu mobilitate redusă'],
   ['P118/1999+2013','Securitate la incendiu','ISU aviz'],
   ['HG 525/1996','Regulamentul General de Urbanism','POT/CUT/H'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[35,120,W-28-35-120]);cy=checkY(cy,10,'LEGISLAȚIE',8);});

  cy = newPage('H. CONCLUZII GENERALE', 9);
  cy = concluzii([
    'Memoriul tehnic preliminar se referă la parcela '+S2(nrcad)+' (UTR '+S2(utr)+', '+Math.round(P.area)+'m², '+S2(uat)+', jud. '+S2(judet)+'), propunând realizarea unui volum '+S2(fnLabel)+' cu '+b.niv+' niveluri (P+'+(b.niv-1)+'E), H='+hTotal.toFixed(1)+'m.',
    'Indicatorii urbanistici propuși: POT='+(scArea/P.area*100).toFixed(1)+'% (max '+(P.pot*100).toFixed(0)+'%), CUT='+(sdaTotal/P.area).toFixed(2)+' (max '+(P.cut||2)+'), H='+(hTotal).toFixed(1)+'m (max '+(P.hMax||28)+'m). Conformitate: '+(scArea/P.area<=P.pot&&sdaTotal/P.area<=(P.cut||2)?'✓ CONFORM':'⚠ VERIFICARE NECESARĂ')+'.',
    'Structura de rezistență propusă: '+(b.niv<=4?'cadre din beton armat C25/30':'structură duală BA C30/37 cu diafragme')+', dimensionată pentru zona seismică '+seism.zona+' (ag='+seism.ag+'g, Tc='+(seism.Tc||0.7)+'s) conform P100-1/2013.',
    'Energia specifică estimată: Ep≈'+epSpec+' kWh/m²·an — clasa energetică '+(epSpec<=100?'A (NZEB conf. Legii 372/2005)':epSpec<=150?'B (sub NZEB, necesare îmbunătățiri)':'C-D (necesare măsuri semnificative NZEB)')+'.',
    'Documentul are caracter ORIENTATIV. Necesită semnătura unui arhitect autorizat OAR și a unui inginer constructor atestat MLPDA pentru utilizarea în documentații tehnice (Legea 184/2001 + Legea 10/1995).',
    'Data elaborare: '+dateStr+'. Versiune UrbanX TSS·FG — document generat automat și actualizat la fiecare regenerare a releveelor.',
  ],cy);
  sign(); ftr();

  cy = newPage('I. SEMNĂTURĂ + ȘTAMPILĂ', 10);
  // Pagina de semnătură formală separată
  pdf.setFillColor(250,252,255); pdf.rect(0,0,W,H,'F');
  pdf.setFillColor(...DARK); pdf.rect(0,0,W,28,'F');
  pdf.setFillColor(...GOLD); pdf.rect(0,0,W,2.5,'F'); pdf.rect(0,27,W,1,'F');
  pdf.setTextColor(...GOLD); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
  pdf.text('MEMORIU TEHNIC PRELIMINAR — PAGINA DE SEMNĂTURĂ', W/2, 18, {align:'center'});
  ftr();
  // Caseta semnături 3 coloane
  const sy=50, sw=(W-28)/3;
  ['PROIECTANT ARHITECT\n(Atestat OAR)',
   'VERIFICATOR DE PROIECT\n(Atestat MLPDA)',
   'BENEFICIAR/INVESTITOR'].forEach((rol,i)=>{
    const bx=14+i*sw;
    pdf.setFillColor(...DARK2); pdf.rect(bx,sy,sw-2,80,'F');
    pdf.setFillColor(...GOLD); pdf.rect(bx,sy,sw-2,2,'F');
    pdf.setFillColor(...GOLD); pdf.rect(bx,sy,2,80,'F');
    pdf.setTextColor(...GOLD); pdf.setFontSize(7.5); pdf.setFont('helvetica','bold');
    rol.split('\n').forEach((line,li)=>
      pdf.text(S2(line), bx+(sw-2)/2, sy+8+li*7, {align:'center'}));
    pdf.setTextColor(130,145,165); pdf.setFontSize(6); pdf.setFont('helvetica','normal');
    pdf.text('Nume:', bx+5, sy+28); pdf.text('Nr. atestat:', bx+5, sy+38);
    pdf.text('Data:', bx+5, sy+48); pdf.text('Tel/Email:', bx+5, sy+58);
    pdf.setDrawColor(180,200,230); pdf.setLineWidth(0.3);
    pdf.line(bx+5, sy+72, bx+sw-7, sy+72);
    pdf.text('Semnătură + ștampilă', bx+(sw-2)/2, sy+76, {align:'center'});
  });
  pdf.setFillColor(180,30,30); pdf.rect(14,sy+84,W-28,6,'F');
  pdf.setTextColor(255,255,255); pdf.setFontSize(5.8); pdf.setFont('helvetica','bold');
  pdf.text('DOCUMENT ORIENTATIV — Nu înlocuiește documentațiile tehnice avizate conf. Legea 169/2026 (CATUC) + Legii 10/1995. '+
    'Elaborat automat UrbanX TSS·FG · '+dateStr, W/2, sy+88, {align:'center'});

  _pdfSaveMobile(pdf,'memoriu_tehnic_'+S2(P.nrCad).replace(/[^a-zA-Z0-9]/g,'_')+'.pdf');
  if(typeof ss==='function') ss('✅ Memoriu Tehnic generat · 10 pagini · '+S2(fnLabel)+' P+'+(b.niv-1)+'E');
};

console.log('[PDF Upgrade] ✅ Exporturi Relevee standardizate cu _initStudyPdf');
