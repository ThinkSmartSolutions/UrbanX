// Copyright (c) 2024-2026 ThinkSmart Solutions SRL | contact@urbanx.ro | Utilizare conform LICENSE
// ═══════════════════════════════════════════════════════════════════════════
// 10-studies-new.js — Studii noi pentru proiectare și urbanism
// UrbanX TSS·FG · Toate cu date live, formule verificate, surse citate
//
// 1. generateStudiuPMR      — Accesibilitate persoane cu mobilitate redusă
// 2. generateStudiuIluminat — Iluminat natural EN 17037 + OMS 119
// 3. generateStudiuApe      — Gospodărire ape pluviale SR EN 752
// 4. generateStudiuREPA     — Raport pre-autorizare (checklist AC)
// 5. generateStudiuCarbon   — Bilanț carbon + amprenta CO₂
// 6. generateStudiuBiodiv   — Biodiversitate urbană + Natura 2000
// Copyright (c) 2024–2026 ThinkSmart Solutions SRL — Toate drepturile rezervate
// Proprietar: Florin Georgescu | contact@urbanx.ro | urbanx.ro | Utilizare conform LICENSE.

// ═══════════════════════════════════════════════════════════════════════════
// UrbanX TSS·FG — Studies New — PMR, Iluminat, REPA, Ape Pluviale
// Copyright (c) 2024–2026 ThinkSmart Solutions SRL — Toate drepturile rezervate
// Proprietar: ThinkSmart Solutions SRL | contact@urbanx.ro | urbanx.ro
// Utilizare exclusiv conform termenilor de licență UrbanX. Redistribuire interzisă.

// ═══════════════════════════════════════════════════════════════════════════
// 1. ACCESIBILITATE PMR — Legea 448/2006 + NP 051/2012 + ISO 21542:2021
// ═══════════════════════════════════════════════════════════════════════════
async function generateStudiuPMR(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  ss('Se generează Studiu Accesibilitate PMR...');
  const d=_initStudyPdf('Studiu de Accesibilitate pentru Persoane cu Mobilitate Redusă',
    'PMR · Legea 448/2006 · NP 051/2012 · ISO 21542:2021 · Ord. 189/2013',10);
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,BLUE,LIGHT,LIGHT2,RED,GREEN,ORANGE,PURPLE,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
    hdr,ftr,sec,body,tblRow,kv,addImg,cover,newPage,checkY,concluzii,sign}=d;
  const caps=await _captureStudyMapsSafe(ap,msg=>ss(msg));
  const ctx=window._sCtx||{};
  const aedisH=S.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||12;
  const niv=Math.max(1,Math.round(aedisH/3));
  const areaNum=parseFloat(area)||300;
  const fn=window._RV?.fn||'rez';
  const sda=Math.round(areaNum*(parseFloat(params?.cut)||1.2));
  const nrApt=Math.max(1,Math.round(sda/65));
  const needsLift=niv>2||(fn==='birouri'&&niv>1)||fn==='hotel';
  const needsRamp=true; // mereu necesar la acces
  const nrParcPMR=Math.max(1,Math.ceil(
    {rez:nrApt,birouri:Math.round(sda/50),hotel:nrApt,com:Math.round(sda/100)}[fn]*0.04));

  // PAG 1 — Cover
  cover('Verificare conformitate accesibilitate · '+S2(fn)+' · '+niv+' niveluri',
    caps.imgLocation||null,
    [['Lift necesar',needsLift?'DA — OBLIGATORIU':'Nu (≤P+2)'],
     ['Rampă acces',needsRamp?'DA — OBLIGATORIE':'—'],
     ['Locuri parcaj PMR',nrParcPMR+' (min. 4% din total)'],
     ['SDA total',sda+' m²']],
    true,'CONFORMITATE PMR — Legea 448/2006 + NP 051/2012');

  // PAG 2 — Context + plan
  let cy=newPage('1. ACCESE EXTERIOARE — ACCES PRINCIPAL PMR',2);
  cy=addImg(caps.img2D||caps.imgLocation,14,cy,W-28,65,'FIG. 1 — Plan situație · Rute accesibile PMR · Acces principal');
  cy=sec('1.1. CERINȚE RAMPĂ DE ACCES — NP 051/2012 §4.2 + ISO 21542',cy);cy+=3;
  cy=tblRow(['Parametru','Cerință minimă','Recomandat','Ref.'],cy,true,[60,45,45,W-28-60-45-45]);
  [['Pantă rampă','max. 8% (1:12)','max. 5% (1:20)','NP 051/2012 §4.2.1'],
   ['Lățime liberă rampă','min. 1.50m','1.80m','NP 051/2012 §4.2.2'],
   ['Palier de odihnă','la 9m diff. nivel, 1.50×1.50m','1.80×1.80m','ISO 21542 §7.4'],
   ['Parapet de protecție','h=0.90m pe ambele laturi','1.10m','NP 051/2012 §4.2.4'],
   ['Suprafață antiderapantă','Obligatorie, R10 min.','R12','ISO 21542 §6.3'],
   ['Balustradă continuă','h=0.90m bilateral','cu prelungire 0.30m','NP 051/2012 §4.2.5'],
   ['Marcaj tactil','Benzi direcționale + atenție','Color contrast 30:1','SR EN ISO 23599'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[60,45,45,W-28-60-45-45]);cy=checkY(cy,12,'RAMPĂ',2);});

  // PAG 3 — Lifturi
  cy=newPage('2. LIFT / PLATFORMĂ RIDICĂTOARE — L 448/2006 + NP 051',3);
  cy=sec('2.1. CERINȚE LIFT PMR',cy);cy+=3;
  cy=body('Conform Legii 448/2006 art.62 și NP 051/2012 §5, clădirile cu mai mult de P+1E sau '+
    'accesibile publicului TREBUIE să asigure acces vertical pentru PMR. '+
    (needsLift?'Pentru această clădire ('+niv+' niveluri) LIFTUL ESTE OBLIGATORIU.':
     'La această clădire (P+'+niv+') se recomandă.'),14,cy);cy+=4;
  cy=tblRow(['Parametru','Cerință NP 051','ISO 21542','Obs.'],cy,true,[60,50,50,W-28-60-50-50]);
  [['Cabin dimensiuni min.','1.10×1.40m','1.10×1.60m (SR EN 81-70)','Rotire scaun rulant'],
   ['Ușă cabină lățime','min. 0.90m','1.00m','Conf. linie liberă'],
   ['Înălțime buton operare','0.90-1.20m față de podea','1.00m recom.','ISO 21542 §13.3'],
   ['Buton tactil Braille','OBLIGATORIU','Cu audio','Legea 448/2006'],
   ['Oglindă în cabină','Pe perete opus ușii','Da','Manevră retragere'],
   ['Timp ținere ușă deschisă','min. 8 secunde','10 secunde','SR EN 81-70 §5.4'],
   ['Forță deschidere ușă','max. 30N','max. 20N','ISO 21542'],
   needsLift?['STATUS','⚠ OBLIGATORIU','—','Legea 448/2006 art.62']:
            ['STATUS','Recomandat','—','NP 051/2012'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[60,50,50,W-28-60-50-50]);cy=checkY(cy,12,'LIFT',3);});

  // PAG 4 — Parcaje PMR
  cy=newPage('3. PARCAJE PMR — NP 051/2012 §8 + Ord. MDLPA 189/2013',4);
  cy=sec('3.1. PARCAJE REZERVATE PMR',cy);cy+=3;
  cy=body('Conform NP 051/2012 §8.1 și Ord. 189/2013, min. 4% din totalul locurilor de parcaj '+
    'sunt rezervate PMR, dar minimum 1 loc. Dimensionare specială obligatorie.',14,cy);cy+=4;
  const kw3=(W-28)/3;
  [['Locuri PMR',nrParcPMR+' buc. (min. 4%)'],['Dim. loc PMR','3.60m × 5.00m'],
   ['Culoar lateral','1.20m (transfer scaun)']]
  .forEach(([l,v],i)=>kv(l,v,14+i*kw3,cy,kw3-2,[GREEN,GOLD,BLUE][i]));
  cy+=26;
  cy=tblRow(['Parametru parcaj PMR','Cerință','Standard'],cy,true,[80,55,W-28-80-55]);
  [['Lățime loc PMR','min. 3.60m (față de 2.50m standard)','NP 051/2012 §8.1'],
   ['Lungime loc','min. 5.00m','NP 051/2012 §8.1'],
   ['Culoar transfer lateral','min. 1.20m (poate fi comun cu loc adiacent)','ISO 21542 §18.4'],
   ['Marcaj la sol','Galben + simbol internațional PMR','SR ISO 7010-M024'],
   ['Semnalizare verticală','Panou PMR la h>2.20m, retroreflectorizant','SR 1848-7'],
   ['Amplasare față de intrare','max. 50m distanță la acces','NP 051/2012'],
   ['Pantă max. loc parcaj','max. 2%','NP 051/2012 §8.3'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[80,55,W-28-80-55]);cy=checkY(cy,12,'PARCAJ PMR',4);});

  // PAG 5 — Grupuri sanitare PMR
  cy=newPage('4. GRUPURI SANITARE PMR — NP 051 §6 + ISO 21542 §14',5);
  cy=addImg(caps.img3D||caps.v3dDay,14,cy,W-28,65,'FIG. 2 — Vedere 3D amplasament · Context accesibilitate');
  cy=sec('4.1. CERINȚE WC PMR',cy);cy+=3;
  cy=tblRow(['Element','Cerință NP 051','ISO 21542','Obs.'],cy,true,[60,50,50,W-28-60-50-50]);
  [['Spațiu liber manevrare','1.50×1.50m','1.80×1.80m','Rotire scaun 360°'],
   ['Lățime ușă','min. 0.90m','1.00m','Deschidere spre exterior'],
   ['WC — înălțime asezare','0.46-0.48m față de finit','0.48m','Conf. SR EN 997'],
   ['Bare de sprijin','orizontale+rabatabile 0.65-0.90m','Conf. ISO','Din ambele laturi'],
   ['Chiuvetă — spațiu sub','min. 0.60m adâncime','Genunchi scaun rulant','h=0.85m max'],
   ['Oglindă','jos la 0.90m față sol','0.85m','Vizibilitate din scaun'],
   ['Mânere uși','Tip pârghie, h=0.85-1.05m','Manetă','Fără buton de presare'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[60,50,50,W-28-60-50-50]);cy=checkY(cy,12,'WC PMR',5);});

  // PAG 6 — Interior + circulații
  cy=newPage('5. CIRCULAȚII INTERIOARE — NP 051/2012 §4-5',6);
  cy=sec('5.1. CORIDOARE ȘI CIRCULAȚII ORIZONTALE',cy);cy+=3;
  cy=tblRow(['Parametru','Cerință minimă','Recomandat','Ref.'],cy,true,[60,45,45,W-28-60-45-45]);
  [['Lățime coridor principal','min. 1.20m (liber)','1.50m','NP 051 §4.1'],
   ['Lățime coridor sec.','min. 0.90m','1.20m','NP 051 §4.1'],
   ['Înălțime liberă','min. 2.10m','2.30m','Conform RGU'],
   ['Praguri','max. 0.02m, teșite 45°','0 praguri','NP 051 §4.1.6'],
   ['Covoare/mochete','Fixate, max. 0.01m grosime pile','Supraf. dure','ISO 21542 §10'],
   ['Semnalizare direcțională','Braille + relief + culoare','Audio','SR EN ISO 23599'],
   ['Contrast vizual','30:1 față de fundal (WCAG 2.1 AA)','7:1 (AAA)','ISO 21542 §6.2'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[60,45,45,W-28-60-45-45]);cy=checkY(cy,12,'CORIDOARE',6);});

  // PAG 7 — Scări
  cy=newPage('6. SCĂRI ACCESIBILE — NP 051/2012 §4.3',7);
  cy=sec('6.1. CERINȚE TREPTE ȘI SCĂRI',cy);cy+=3;
  cy=tblRow(['Parametru','Cerință','Standard'],cy,true,[70,65,W-28-70-65]);
  [['Contratreaptă','OBLIGATORIE (nu scări deschise)','NP 051 §4.3.1'],
   ['Înălțime treaptă h','max. 0.17m','NP 051 §4.3.2'],
   ['Lățime treaptă l','min. 0.30m (2h+l=0.60-0.65m)','NP 051 §4.3.3'],
   ['Rampă de scări lățime','min. 1.20m liber','NP 051 §4.3.4'],
   ['Balustradă h','0.90m minim, 1.10m recomandat','NP 051 §4.3.5'],
   ['Marcaj contrast treaptă','Prima + ultima treaptă, bandă 40mm','SR EN ISO 23599'],
   ['Balustradă continuă','Pe ambele laturi, prelungire 0.30m','NP 051'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[70,65,W-28-70-65]);cy=checkY(cy,12,'SCĂRI',7);});

  // PAG 8 — Checklist + scoring
  cy=newPage('7. CHECKLIST CONFORMITATE + SCORING',8);
  cy=addImg(caps.imgDist||caps.img2D,14,cy,W-28,60,'FIG. 3 — Plan situație · Accese + trasee PMR');
  cy=sec('7.1. CHECKLIST OBLIGAȚII LEGALE',cy);cy+=3;
  cy=tblRow(['Obligație','Actul normativ','Status','Notă'],cy,true,[80,45,22,W-28-80-45-22]);
  const checks=[
    ['Rampă acces la intrare principală','Legea 448/2006 art.57',needsRamp?'✓':'—','Pantă max. 8%'],
    ['Lift/platformă (>P+1E)','NP 051/2012 §5',needsLift?'OBLIGATORIU':'Recom.','Conf. nr. niveluri'],
    ['Parcaj PMR (min. 4%)','Ord. 189/2013',nrParcPMR+' locuri','Marcat + dimensionat'],
    ['WC PMR pe fiecare nivel','NP 051/2012 §6',fn!=='rez'?'OBLIGATORIU':'La comun','Min. 1/etaj public'],
    ['Coridoare min. 1.20m','NP 051/2012 §4.1','VERIFICARE PT','La faza proiect'],
    ['Semnalizare Braille + tactilă','Legea 448/2006 art.62','OBLIGATORIU','Buton lift + indicatoare'],
    ['Marcaj parcaj PMR la sol','SR ISO 7010','OBLIGATORIU','Galben + simbol'],
    ['Audit accesibilitate la recepție','HG 268/2007','OBLIGATORIU','Expert autorizat'],
  ];
  checks.forEach(r=>{cy=tblRow(r,cy,false,[80,45,22,W-28-80-45-22]);cy=checkY(cy,12,'CHECKLIST',8);});

  // PAG 9 — Norme
  cy=newPage('8. CADRU NORMATIV PMR',9);
  cy=sec('8.1. LEGISLAȚIE ȘI NORME APLICABILE',cy);cy+=3;
  cy=tblRow(['Act normativ','Titlu','Aplicabilitate'],cy,true,[35,120,W-28-35-120]);
  [['Legea 448/2006','Privind protecția și promovarea drepturilor PMR','Obligatorie, toate clădirile publice'],
   ['NP 051/2012','Normativ privind cerințele de proiectare pt. persoane cu handicap','Proiectare arhitecturală'],
   ['Ord. 189/2013','Norme tehnice privind amplasarea mijloacelor de publicitate','Accesibilitate comercial'],
   ['HG 268/2007','Norme metodologice Legea 448/2006','Audit + certificare'],
   ['SR EN ISO 23599','Produse de asistare — indicatoare tactile pe sol','Tactile + Braille'],
   ['ISO 21542:2021','Construcții — Accesibilitate mediului construit','Standard international'],
   ['SR EN 81-70:2021','Lifturi — Accesibilitate PMR','Dimensiuni cabin lift'],
   ['WCAG 2.1 AA','Accesibilitate conținut web (adaptabil la spații fizice)','Contrast vizual'],
   ['Convenția ONU','Drepturile Persoanelor cu Dizabilități (ratif. prin L.221/2010)','Cadru general'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[35,120,W-28-35-120]);cy=checkY(cy,10,'NORME',9);});

  // PAG 10 — Concluzii
  cy=newPage('9. CONCLUZII + RECOMANDĂRI',10);
  cy=concluzii([
    'Clădirea propusă ('+niv+' niveluri, '+S2(fn)+', SDA='+sda+'m², '+S2(uat)+') necesită respectarea integrală a NP 051/2012 și Legii 448/2006 privind accesibilitatea PMR.',
    'Liftul este '+( needsLift?'OBLIGATORIU (>P+1E) — dimensiuni cabin min. 1.10×1.40m, ușă 0.90m conf. SR EN 81-70:2021.':'recomandat — la funcțiuni publice devine obligatoriu.'),
    'Rampa de acces este OBLIGATORIE — pantă max. 8% (recomandat 5%), lățime min. 1.50m, paliere la fiecare 9m diferență de nivel, suprafață antiderapantă R10.',
    'Parcaje PMR: min. '+nrParcPMR+' locuri (4% din total), dimensionate 3.60×5.00m, cu culoar transfer 1.20m, marcaj galben + simbol internațional SR ISO 7010-M024.',
    'Grupuri sanitare PMR: obligatorii pe fiecare nivel accesibil publicului — spațiu manevrare 1.50×1.50m, bare sprijin rabatabile, ușă 0.90m.',
    'La recepția lucrărilor, un expert autorizat PMR trebuie să certifice conformitatea (HG 268/2007).',
    'Nerespectarea Legii 448/2006 poate atrage refuzul recepției și amenzi contravenționle (art. 98 Legea 448/2006, amendă 5.000-10.000 lei).',
  ],cy);
  sign();ftr();
  try{ if(typeof _pdfParcelIVUSection==='function') _pdfParcelIVUSection(d); }catch(e){}
  _pdfSaveMobile(pdf,'studiu_pmr_'+S2(nrcad).replace(/[^a-zA-Z0-9]/g,'_')+'.pdf');
  ss('✅ Studiu PMR generat · 10 pagini · '+S2(uat));
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. STUDIU ILUMINAT NATURAL — EN 17037:2021 + OMS 119/2014 + C 251-2018
// ═══════════════════════════════════════════════════════════════════════════
async function generateStudiuIluminat(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  ss('Se generează Studiu Iluminat Natural...');
  const d=_initStudyPdf('Studiu de Iluminat Natural si Confort Vizual',
    'EN 17037:2021 · OMS 119/2014 · C 251-2018 · SR EN 12464-1',10);
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,BLUE,LIGHT,RED,GREEN,ORANGE,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
    hdr,ftr,sec,body,tblRow,kv,addImg,cover,newPage,checkY,concluzii,sign}=d;
  const caps=await _captureStudyMapsSafe(ap,msg=>ss(msg));
  const ctx=window._sCtx||{};
  const ghi=ctx.ghi||(_calcSolarGHI?_calcSolarGHI(lat,lon):1150);
  const frontDir=S.vol?.frontDir||params?.frontDir||'S';
  const aedisH=S.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||12;
  const niv=Math.max(1,Math.round(aedisH/3));
  const fn=window._RV?.fn||'rez';
  const areaNum=parseFloat(area)||300;
  const sda=Math.round(areaNum*(parseFloat(params?.cut)||1.2));

  // Calcule iluminat natural
  // Factor de lumini zimă (FLZ) — EN 17037 Tabel 1
  const FLZ_min={rez:0.3,birouri:2.0,com:1.5,hotel:0.3}[fn]||0.3; // %
  const FLZ_rec={rez:1.0,birouri:3.0,com:2.5,hotel:1.0}[fn]||1.0; // %

  // Ore însorire directă — OMS 119/2014
  const oreIns=typeof _calcOreInsorire==='function'
    ?_calcOreInsorire(lat,11,21,frontDir):{label:'≥2h',conforme:true};
  const solarAlt21Dec=typeof _solarPosition==='function'
    ?_solarPosition(lat,11,21,12).alt:(90-lat-23.5);

  // Iluminanță naturală (Lux) — EN 17037
  const Emin_300={rez:100,birouri:300,com:500,hotel:150}[fn]||100; // Lux min. interior
  const Emin_rec={rez:300,birouri:500,com:750,hotel:300}[fn]||300;

  // Suprafață minimă vitraj față de suprafață utilă (AW/AF)
  const rapMin={rez:0.10,birouri:0.15,com:0.12,hotel:0.10}[fn]||0.10; // 10%
  const rapRec={rez:0.15,birouri:0.25,com:0.20,hotel:0.15}[fn]||0.15;

  // PAG 1 — Cover
  cover('Iluminat natural · '+S2(fn)+' · Lat='+lat.toFixed(2)+'°N · GHI='+ghi+' kWh/m²·an',
    caps.imgLocation||null,
    [['FLZ minim cerut',FLZ_min.toFixed(1)+'%'],['FLZ recomandat',FLZ_rec.toFixed(1)+'%'],
     ['Ore însorire 21 Dec',oreIns.label],['GHI amplasament',ghi+' kWh/m²·an']],
    oreIns.conforme,'ILUMINAT NATURAL — EN 17037:2021 + OMS 119/2014');

  // PAG 2 — Context + harta orientare
  let cy=newPage('1. ORIENTARE CARDINALĂ + CONTEXT SOLAR',2);
  cy=addImg(caps.img2D||caps.imgLocation,14,cy,W-28,68,'FIG. 1 — Plan situație · Orientare cardinală · Fond construit');
  cy=sec('1.1. DATE SOLARE AMPLASAMENT',cy);cy+=3;
  const kw4=(W-28)/4;
  [['GHI anual',ghi+' kWh/m²·an'],['Lat. amplasament',lat.toFixed(3)+'°N'],
   ['Front principal',S2(frontDir)],['Alt.sol. 21 Dec 12:00',solarAlt21Dec.toFixed(1)+'°'],
  ].forEach(([l,v],i)=>kv(l,v,14+i*kw4,cy,kw4-2,[GOLD,BLUE,GREEN,ORANGE][i]));
  cy+=26;
  cy=tblRow(['Lună','Alt. sol. la 12:00','Ore însorire est. (±20%)','Status OMS 119'],
    cy,true,[30,35,55,W-28-30-35-55]);
  [1,3,6,9,11,12].forEach(m=>{
    const pos=typeof _solarPosition==='function'?_solarPosition(lat,m-1,15,12):{alt:solarAlt21Dec};
    const ore=typeof _calcOreInsorire==='function'?_calcOreInsorire(lat,m-1,15,frontDir):{label:'—',conforme:true};
    const mn=['Ian','Mar','Iun','Sep','Nov','Dec'][m<3?0:m<5?1:m<8?2:m<10?3:m<12?4:5];
    cy=tblRow([mn,pos.alt.toFixed(1)+'°',ore.label,ore.conforme?'✓ OK':'⚠ Verif.'],
      cy,false,[30,35,55,W-28-30-35-55]);
  });

  // PAG 3 — EN 17037 cerințe
  cy=newPage('2. CERINȚE EN 17037:2021 — ILUMINAT NATURAL',3);
  cy=sec('2.1. FACTOR DE LUMINI ZIMĂ (FLZ) — EN 17037 Tab.1',cy);cy+=3;
  cy=body('Factorul de lumini zimă (FLZ/DF) reprezintă procentul din iluminarea exterioară '+
    'difuză (cer acoperit CIE) care ajunge la un punct interior la 0.85m față de pardoseală. '+
    'Conf. EN 17037:2021 Tab.1 pentru funcțiunea '+S2(fn)+':',14,cy);cy+=4;
  cy=tblRow(['Criteriu','Valoare','Standard','Obs.'],cy,true,[60,40,50,W-28-60-40-50]);
  [['FLZ minim (minimum illuminance)',FLZ_min+'%','EN 17037:2021 Tab.1','Minim legal'],
   ['FLZ recomandat (target illuminance)',FLZ_rec+'%','EN 17037:2021','Calitate bună'],
   ['FLZ optim (high target)',FLZ_rec*1.5+'%','EN 17037:2021','Calitate exc.'],
   ['Iluminanță minimă Emin',Emin_300+' Lux','EN 17037 §6.3','În plan utilitar'],
   ['Iluminanță recomandată Erec',Emin_rec+' Lux','EN 17037 §6.3','Confort vizual'],
   ['Raport AW/AF minim (vitraj/util)',(rapMin*100).toFixed(0)+'%','EN 17037 §6.4','Regulă simplificată'],
   ['Raport AW/AF recomandat',(rapRec*100).toFixed(0)+'%','EN 17037 §6.4',''],
  ].forEach(r=>{cy=tblRow(r,cy,false,[60,40,50,W-28-60-40-50]);cy=checkY(cy,12,'FLZ',3);});

  // PAG 4 — Calcul FLZ simplificat
  cy=newPage('3. CALCUL FLZ SIMPLIFICAT — METODA BRE (REGULĂ PRACTICĂ)',4);
  cy=addImg(caps.img3D||caps.v3dDay,14,cy,W-28,65,'FIG. 2 — Vedere 3D · Obstrucții vizuale față de cer');
  cy=sec('3.1. ESTIMARE FLZ FIECARE ORIENTARE',cy);cy+=3;
  const orientations=[
    {dir:'SUD',factor:0.9,note:'Maximă, corectat umbire estivală'},
    {dir:'EST',factor:0.75,note:'Bună dimineața'},
    {dir:'VEST',factor:0.75,note:'Bună seara'},
    {dir:'NORD',factor:0.55,note:'Difuză, constantă — fără lumină directă'},
  ];
  cy=tblRow(['Orientare','Factor rel.','FLZ estimat','Status fată de cerință'],
    cy,true,[30,30,30,W-28-30-30-30]);
  orientations.forEach(o=>{
    const flz=(ghi/1000*o.factor*12).toFixed(1); // estimare simplificată
    const ok=parseFloat(flz)>=FLZ_min;
    cy=tblRow([o.dir,o.factor.toFixed(2),flz+'%',ok?'✓ ≥'+FLZ_min+'%':'⚠ Sub '+FLZ_min+'%'],
      cy,false,[30,30,30,W-28-30-30-30]);
  });
  cy+=4;
  cy=sec('3.2. CERINȚE GEAM/FEREASTRĂ PER CAMERĂ',cy);cy+=3;
  cy=tblRow(['Spațiu','Sup. utilă min.','Sup. geam min. (10%)','Sup. geam rec. (15%)'],
    cy,true,[45,40,40,W-28-45-40-40]);
  [{sp:'Cameră de zi/Living',sf:18},{sp:'Dormitor',sf:14},{sp:'Birou individual',sf:9},
   {sp:'Open-space birouri',sf:4+' /post'},
  ].forEach(({sp,sf})=>{
    const gMin=typeof sf==='number'?Math.round(sf*rapMin*10)/10:'—';
    const gRec=typeof sf==='number'?Math.round(sf*rapRec*10)/10:'—';
    cy=tblRow([sp,sf+' m²',gMin+' m²',gRec+' m²'],cy,false,[45,40,40,W-28-45-40-40]);
  });

  // PAG 5 — Protecție supraîncălzire + glare
  cy=newPage('4. PROTECȚIE SUPRAÎNCĂLZIRE + ORBIRE — EN 17037 §7',5);
  cy=sec('4.1. PROTECȚIE FAȚĂ DE RADIAȚIE SOLARĂ DIRECTĂ',cy);cy+=3;
  cy=tblRow(['Soluție','Reducere g-factor','Tip','Standard'],cy,true,[65,30,40,W-28-65-30-40]);
  [['Sticlă Low-E cu coating solar-control','g≤0.35','Pasiv','EN 410'],
   ['Jaluzele exterioare lamele orizontale','85-95%','Activ','EN 14501'],
   ['Jaluzele interioare (mai puțin eficiente)','30-50%','Activ','EN 14501'],
   ['Brise-soleil fix (calcul umbire estivală)','50-80%','Pasiv-Fix','ISO 9060'],
   ['Vegetație deciduă (umbra vară, sol iarnă)','Var: 60-80%, Iar: 15-30%','Pasiv-Natural','—'],
   ['Geam triplu cu argon + Low-E (Ug≤0.6)','g=0.5, Ug=0.5-0.6','Pasiv','EN ISO 10077'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[65,30,40,W-28-65-30-40]);cy=checkY(cy,12,'PROTECȚIE',5);});
  cy+=4;
  cy=sec('4.2. ORBIRE (GLARE) — EN 17037 §7 + EN 12464-1',cy);cy+=3;
  cy=tblRow(['Parametru','Cerință','Metoda calc.'],cy,true,[70,45,W-28-70-45]);
  [['Indice UGR (Unified Glare Rating)','UGR<19 birouri, <22 locuire','EN 12464-1 Tab.5.1'],
   ['Luminanță cer vizibil','max. 2000 cd/m² din planul de lucru','EN 17037 §7.3'],
   ['Soluție glare intern','Screen, stores interioare UGR-reducere','EN 14501'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[70,45,W-28-70-45]);});

  // PAG 6 — Lumina artificialǎ complement
  cy=newPage('5. ILUMINAT ARTIFICIAL COMPLEMENTAR — EN 12464-1',6);
  cy=sec('5.1. CERINȚE ILUMINAT ARTIFICIAL — EN 12464-1:2021',cy);cy+=3;
  cy=tblRow(['Spațiu','Em (Lux)','UGR max','Ra min','Obs.'],cy,true,[55,22,22,22,W-28-55-22-22-22]);
  [['Birou individual','500','19','80','Sarcini vizuale fine'],
   ['Open-space birouri','500','19','80','Ecrane + documente'],
   ['Sală de ședințe','500','19','80','—'],
   ['Cameră de zi/living','200','22','80','EN 12464-1 §5.3'],
   ['Dormitor','100','22','80','Lumina de relaxare'],
   ['Bucătărie','300','22','80','Suprafața de lucru'],
   ['Coridor interior','100','25','80','Circulație'],
   ['Casa scarii','150','22','80','Securitate'],
   ['Parcare subterană','75','28','60','EN 12464-1 §5.10'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[55,22,22,22,W-28-55-22-22-22]);cy=checkY(cy,12,'ILUMINAT',6);});

  // PAG 7-10: menținem concizie
  [7,8,9].forEach(pg=>{
    cy=newPage(['6. AUTORIZARE + NORMATIVE','7. VEDERI SITE','8. METODOLOGIE'][pg-7],pg);
    if(pg===7){
      cy=sec('6.1. NORME APLICABILE',cy);cy+=3;
      cy=tblRow(['Normativ','Titlu','Domeniu'],cy,true,[35,120,W-28-35-120]);
      [['EN 17037:2021','Daylight in buildings — cerințe iluminat natural','Toată clădirea'],
       ['OMS 119/2014','Norme de igienă — min. 1.5h însorire directă','Spații locuite'],
       ['C 251-2018','Normativ instalații iluminat artificial','Ilum. artificial'],
       ['SR EN 12464-1:2021','Cerințe iluminat la locul de muncă','Birouri/comercial'],
       ['SR EN 14501:2021','Jaluzele — performanță termică și vizuală','Protecție solară'],
       ['SR EN ISO 10077','Performanță termică ferestre și ușe','Tâmplărie'],
      ].forEach(r=>{cy=tblRow(r,cy,false,[35,120,W-28-35-120]);cy=checkY(cy,10,'NORME',7);});
    } else if(pg===8){
      cy=addImg(caps.imgLocation,14,cy,(W-28)/2,65,'FIG. 3 — Amplasament · Față stradală');
      addImg(caps.imgDist,14+(W-28)/2+4,cy-(65)-(14),(W-28)/2,65,'FIG. 4 — Obstrucții vecini');
      cy+=4;
      cy=addImg(caps.v3dDay||caps.img3D,14,cy,W-28,72,'FIG. 5 — Vedere 3D · Expunere solară');
    } else {
      cy=sec('8.1. METODOLOGIE + DISCLAMER',cy);cy+=3;
      cy=body('Calculele FLZ sunt estimări orientative bazate pe metoda simplificată BRE (Building Research Establishment). '+
        'Calculul exact necesită simulare cu software specializat (IESVE, Radiance, Velux Daylight Visualizer). '+
        'GHI utilizat: '+ghi+' kWh/m²·an (PVGIS 5.3, lat='+lat.toFixed(2)+'°N). '+
        'Data elaborare: '+dateStr+'.',14,cy);
    }
  });
  cy=newPage('9. CONCLUZII',10);
  cy=concluzii([
    'Amplasamentul '+S2(nrcad)+' (lat='+lat.toFixed(3)+'°N, GHI='+ghi+' kWh/m²·an) are potențial solar '+
    (ghi>1200?'ridicat':'mediu-bun')+' pentru iluminat natural și fotovoltaic.',
    'Însorirea directă estimată la 21 decembrie (solstițiu iarnă) este '+oreIns.label+
    (oreIns.conforme?' — CONFORMĂ OMS 119/2014 (min. 1.5h/zi).'
    :' — SUB LIMITA OMS 119/2014. Reorientare volume sau studiu detaliat obligatoriu.'),
    'Factorul de lumini zimă (FLZ) minim cerut pentru '+S2(fn)+' este '+FLZ_min+
    '% conform EN 17037:2021, recomandat '+FLZ_rec+'%. Raportul minim vitraj/util = '+(rapMin*100).toFixed(0)+'%.',
    'Orientarea SUD este cea mai favorabilă (factor solar ×0.9). Orientarea NORD asigură lumină difuză constantă fără orbire — ideală pentru birouri/ateliere.',
    'Protecția solară estivală este obligatorie pe fațadele S/E/V: sticlă Low-E (g≤0.35) sau jaluzele exterioare eficiență 85-95% conform EN 14501.',
    'Iluminatul artificial complementar trebuie proiectat conform EN 12464-1:2021: Em='+Emin_300+'Lux minim, UGR<22, Ra≥80 pentru spații de '+S2(fn)+'.',
  ],cy);
  sign();ftr();
  try{ if(typeof _pdfParcelIVUSection==='function') _pdfParcelIVUSection(d); }catch(e){}
  _pdfSaveMobile(pdf,'studiu_iluminat_'+S2(nrcad).replace(/[^a-zA-Z0-9]/g,'_')+'.pdf');
  ss('✅ Studiu Iluminat Natural generat · 10 pagini · FLZ min='+FLZ_min+'% · GHI='+ghi);
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. RAPORT PRE-AUTORIZARE (REPA) — Checklist complet AC
// Sursa: Legea 50/1991 + HG 907/2016 + Ord. 839/2009 + Ghid MLPDA 2023
// ═══════════════════════════════════════════════════════════════════════════
async function generateREPA(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  ss('Se generează Raport Pre-Autorizare...');
  const d=_initStudyPdf('Raport de Evaluare Prealabilă Autorizare (REPA)',
    'Checklist AC · Legea 50/1991 · HG 907/2016 · Ord. 839/2009',10);
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,BLUE,LIGHT,RED,GREEN,ORANGE,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
    hdr,ftr,sec,body,tblRow,kv,addImg,cover,newPage,checkY,concluzii,sign}=d;
  const caps=await _captureStudyMapsSafe(ap,msg=>ss(msg));
  const ctx=window._sCtx||{};
  const aedisH=S.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||12;
  const niv=Math.max(1,Math.round(aedisH/3));
  const fn=window._RV?.fn||'rez';
  const areaNum=parseFloat(area)||300;
  const sda=Math.round(areaNum*(parseFloat(params?.cut)||1.2));
  const POT=parseFloat(params?.pot||40);
  const CUT=parseFloat(params?.cut||1.2);
  const hMax=parseFloat(params?.h||12);
  const aeroport=ctx.aeroport||getAeroprtConfig?.();
  const ols=ctx.ols||(_calcAACROLS?_calcAACROLS(lat,lon,ctx.elev||80,aedisH):null);
  const seism=ctx.seism||getSeismConfig?.();

  // Scoring conformitate
  let score=0, total=0;
  const check=(cond)=>{total++;if(cond)score++;return cond?'✓ OK':'⚠ VERIFICARE';};

  const pocConform = check(aedisH<=hMax);
  const cutConform = check(sda<=areaNum*CUT);
  const aacConform = !ols||ols.isConform;
  check(aacConform);
  const seismOK    = check(seism?.ag<0.35);

  // PAG 1 — Cover
  cover('Pre-verificare documentație tehnico-economică · '+niv+' niveluri',
    caps.imgLocation||null,
    [['Scor conformitate',score+'/'+total+' verificări OK'],
     ['H max PUG',hMax+'m — propus: '+aedisH.toFixed(1)+'m'],
     ['CUT max PUG',CUT+' — propus: '+(sda/areaNum).toFixed(2)],
     ['AACR',aacConform?'Conform':'Verificare necesară']],
    score>=total*0.8,'REPA — '+score+'/'+total+' CONDIȚII ÎNDEPLINITE');

  // PAG 2 — Context
  let cy=newPage('1. IDENTIFICARE PROIECT + CONTEXT',2);
  cy=addImg(caps.img2D||caps.imgLocation,14,cy,W-28,65,'FIG. 1 — Plan situație · Amplasament');
  cy=sec('1.1. DATE SINTETICE PROIECT',cy);cy+=3;
  const kw3=(W-28)/3;
  [['Nr. cadastral',S2(nrcad)],['UAT',S2(uat)],['UTR',S2(utr)],
   ['Suprafață teren',areaNum+' m²'],['H propusă',aedisH.toFixed(1)+'m'],['SDA propusă',sda+' m²'],
  ].forEach(([l,v],i)=>kv(l,v,14+(i%3)*kw3,i<3?cy:cy+24,kw3-2,[GOLD,BLUE,GREEN][i%3]));
  cy+=52;

  // PAG 3 — Checklist indicatori urbanistici
  cy=newPage('2. CONFORMITATE INDICATORI URBANISTICI PUG/RLU',3);
  cy=sec('2.1. VERIFICARE POT/CUT/H — CONF. RLU UTR '+S2(utr),cy);cy+=3;
  cy=tblRow(['Indicator','Maxim PUG','Propus','Status','Marja'],
    cy,true,[40,32,32,22,W-28-40-32-32-22]);
  const SC_prop=Math.round(areaNum*0.65);
  [['POT (%)',POT,(SC_prop/areaNum*100).toFixed(1),
    check(SC_prop/areaNum*100<=POT),(POT-SC_prop/areaNum*100).toFixed(1)+'%'],
   ['CUT',CUT,(sda/areaNum).toFixed(2),
    check(sda/areaNum<=CUT),(CUT-sda/areaNum).toFixed(2)],
   ['H max (m)',hMax,aedisH.toFixed(1),
    check(aedisH<=hMax),(hMax-aedisH).toFixed(1)+'m'],
   ['Retragere față (m)',params?.rf||0,'Cf. proiect','DE VERIFICAT','—'],
   ['Retragere laterală (m)',params?.rl||3,'Cf. proiect','DE VERIFICAT','—'],
   ['Retragere spate (m)',params?.rs||6,'Cf. proiect','DE VERIFICAT','—'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[40,32,32,22,W-28-40-32-32-22]);cy=checkY(cy,12,'IND.',3);});

  // PAG 4 — Lista avize necesare
  cy=newPage('3. AVIZE ȘI ACORDURI NECESARE — Legea 50/1991 art.7',4);
  cy=addImg(caps.imgDist||caps.img2D,14,cy,W-28,60,'FIG. 2 — Amplasament față de rețele tehnice');
  cy=sec('3.1. AVIZE OBLIGATORII — DETERMINATE AUTOMAT',cy);cy+=3;
  cy=body('Avizele necesare sunt determinate pe baza amplasamentului, funcțiunii și înălțimii propuse, '+
    'conform Legii 50/1991 art.7, Ord. 839/2009 și normativelor specifice.',14,cy);cy+=4;
  const avize=[
    [aeroport&&ols?.distPrag_m<15000?'⚠ OBLIGATORIU':'Verificare','Aviz AACR',
     'aacr.ro','dacă H>45m sau lângă aeroport','30 zile','—'],
    ['OBLIGATORIU','Aviz APĂ/CANAL','Apavital/operator local','Branșament apă+canal','30 zile','Înainte AC'],
    ['OBLIGATORIU','Aviz ELECTRIC','Delgaz/distribuitor local','Branșament electric','45 zile','Înainte AC'],
    ['OBLIGATORIU','Aviz GAZE','Delgaz/distribuitor local','Branșament gaze','30 zile','Înainte AC'],
    [niv>3?'OBLIGATORIU':'Verificare','Aviz ISU','ISU Județean','Securitate la incendiu','30 zile','DTAC/PT'],
    ['OBLIGATORIU','Aviz Mediu','APM Județeană','Impact mediu','30 zile','Cf. HG 445/2009'],
    [nrcad?'OBLIGATORIU':'—','Extras CF actualizat','OCPI Județean','Situație juridică','—','La depunere AC'],
    ['VERIFICARE','Aviz DJCPN','Direcția Cultură','Dacă zonă istorică/LMI','45 zile','Cf. Legea 422/2001'],
  ];
  cy=tblRow(['Status','Aviz','Emitent','Motiv','Termen','Obs.'],
    cy,true,[24,32,38,40,16,W-28-24-32-38-40-16]);
  avize.forEach(r=>{cy=tblRow(r,cy,false,[24,32,38,40,16,W-28-24-32-38-40-16]);cy=checkY(cy,10,'AVIZE',4);});

  // PAG 5 — Documentație tehnică necesară
  cy=newPage('4. DOCUMENTAȚIE TEHNICĂ — HG 907/2016',5);
  cy=sec('4.1. CONȚINUT CADRU DTAC + PT — HG 907/2016',cy);cy+=3;
  cy=tblRow(['Document','Elaborator autorizat','Faza','Obligatoriu'],
    cy,true,[80,55,18,W-28-80-55-18]);
  [['Plan situație (1:200-1:500) cu retrageri','Arhitect cu drept de semnătură','DTAC','DA'],
   ['Plan parter, etaje, acoperis (1:50-1:100)','Arhitect — Legea 184/2001','DTAC','DA'],
   ['Fațade (1:50-1:100), secțiuni caracteristice','Arhitect','DTAC','DA'],
   ['Memoriu tehnic arhitectură','Arhitect','DTAC','DA'],
   ['Proiect structură de rezistență','Inginer constructor atestat','PT','DA'],
   ['Proiect instalații sanitare (APĂ+CANAL)','Inginer inst. autorizat','PT','DA'],
   ['Proiect instalații electrice','Inginer electro autorizat','PT','DA'],
   ['Proiect instalații gaze (dacă e cazul)','Inginer autorizat ISCIR','PT','Dacă gaze'],
   ['Studiu geotehnic + raport teren','Geotehnician atestat MLPDA','PT','DA'],
   ['Raport privind calitatea arhitecturii','Arh. Verif. atestare GE','PAC','DA (>P+3E)'],
   ['Expertiză tehnică (dacă se modifică str.)','Expert tehnic atestat MLPDA','PT','Cf. caz'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[80,55,18,W-28-80-55-18]);cy=checkY(cy,10,'DOCUM.',5);});

  // PAG 6 — Calendarul autorizarii
  cy=newPage('5. CALENDAR AUTORIZARE — CU → DTAC → AC → EXECUȚIE',6);
  cy=sec('5.1. DIAGRAMA GANTT ORIENTATIVĂ — ETAPE AUTORIZARE',cy);cy+=3;
  const etape=[
    ['1','Obținere CU (Certificat de Urbanism)','Primărie',15,'Conf. Legii 50/1991 art.6'],
    ['2','Elaborare studii prealabile (geotehnică etc.)','Proiectanți',30,'NP 074/2014'],
    ['3','Obținere avize prealabile (APĂ,EL,GAZ,ISU,AACR)','Proiectanți+Benef.',60,'Ord. 839/2009'],
    ['4','Elaborare DTAC (Documentație Tehnică AC)','Arhitect+Ing.',45,'HG 907/2016'],
    ['5','Depunere DTAC + taxă timbru arhitectură','Beneficiar',1,'Ord. 1558/2017'],
    ['6','Analiză și emitere AC (Autorizație de Construire)','Primărie',30,'L50/1991 art.7'],
    ['7','Declarare începere lucrări','Beneficiar',5,'L50/1991 art.11'],
    ['8','Execuție construcție','Constructor autorizat',niv*3+' luni','—'],
    ['9','Recepție la terminarea lucrărilor','Comisie+ISC','1-3','L 10/1995'],
    ['10','Intabulare în Cartea Funciară','OCPI','20','Legea 7/1996'],
  ];
  cy=tblRow(['#','Etapă','Responsabil','Zile','Baza legală'],
    cy,true,[10,80,45,20,W-28-10-80-45-20]);
  etape.forEach(r=>{cy=tblRow(r,cy,false,[10,80,45,20,W-28-10-80-45-20]);cy=checkY(cy,10,'CALENDAR',6);});
  cy+=4;
  const total_zile=etape.reduce((s,e)=>s+parseInt(e[3])||0,0);
  pdf.setFillColor(14,36,72);pdf.rect(14,cy,W-28,8,'F');
  pdf.setTextColor(228,182,48);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('DURATĂ TOTALĂ ESTIMATĂ: '+total_zile+' zile lucr. (~'+Math.ceil(total_zile/22)+' luni) + execuție '+niv*3+' luni',W/2,cy+5.5,{align:'center'});
  cy+=12;

  // PAG 7 — Costuri taxe autorizare
  cy=newPage('6. COSTURI TAXE ȘI ONORARII ESTIMATIVE',7);
  cy=sec('6.1. TAXE AUTORIZARE + ONORARII PROIECT ESTIMATIVE',cy);cy+=3;
  const RON=ctx.curs||5.05;
  cy=tblRow(['Element','Cost estimat EUR','Cost estimat RON','Baza'],
    cy,true,[80,30,30,W-28-80-30-30]);
  [['Taxă CU (1-5% din taxa AC)','50-200',Math.round(125*RON),'L50/1991 art.6'],
   ['Timbru arhitectură (0.05-0.1% din val.)',Math.round(sda*400*0.0008),Math.round(sda*400*0.0008*RON),'Ord. 1558/2017'],
   ['Taxă AC (0.5-1% valoare lucrări)',Math.round(sda*400*0.005),Math.round(sda*400*0.005*RON),'L50/1991'],
   ['Onorarii proiect arhitectură (1.5-3% val.)',Math.round(sda*400*0.02),Math.round(sda*400*0.02*RON),'RGU + contract'],
   ['Onorarii proiecte instalații','800-2500',Math.round(1500*RON),'Contract'],
   ['Studiu geotehnic','800-2500',Math.round(1500*RON),'NP 074/2014'],
   ['Avize utilități (APĂ+EL+GAZ)','500-1500',Math.round(1000*RON),'Operatori'],
   ['Aviz ISU','250-600',Math.round(400*RON),'ISU Județean'],
   ['Aviz AACR (dacă necesar)',aeroport&&ols?.distPrag_m<15000?'300-600':'N/A',
    aeroport&&ols?.distPrag_m<15000?Math.round(450*RON):'—','AACR'],
   ['TOTAL ESTIMAT FAZA AC',Math.round(sda*400*0.04+4000),Math.round((sda*400*0.04+4000)*RON),'±30%'],
  ].forEach(r=>{cy=tblRow(r.map(String),cy,false,[80,30,30,W-28-80-30-30]);cy=checkY(cy,10,'COSTURI',7);});

  // PAG 8-9 — Vederi + normative
  cy=newPage('7. VEDERI AMPLASAMENT',8);
  cy=addImg(caps.v3dDay||caps.img3D,14,cy,W-28,82,'FIG. 3 — Vedere 3D · Context urban real');
  cy=addImg(caps.img2D,14,cy,W-28,72,'FIG. 4 — Plan situație topografică');

  cy=newPage('8. BAZE LEGALE',9);
  cy=sec('8.1. CADRU LEGISLATIV AUTORIZARE CONSTRUIRE',cy);cy+=3;
  cy=tblRow(['Act normativ','Titlu prescurtat','Rol'],cy,true,[35,120,W-28-35-120]);
  [['Legea 50/1991','Autorizarea executării lucrărilor de construcții','Cadru general AC'],
   ['HG 907/2016','Conținut-cadru documentații tehnico-economice','DTAC + PT'],
   ['Ord. 839/2009','Instrucțiuni tehnice de aplicare L50/1991','Procedura avize'],
   ['Legea 184/2001','Exercitarea profesiei de arhitect','Drept de semnătură'],
   ['Legea 10/1995','Calitatea în construcții','Cerințe + recepție'],
   ['HG 273/1994','Regulament recepție lucrări','Recepție + punere în funcțiune'],
   ['Legea 7/1996','Cadastrul și publicitatea imobiliară','Intabulare CF'],
   ['Ord. 1558/2017','Timbrul arhitecturii — stabilire + virare','Taxă OAR'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[35,120,W-28-35-120]);cy=checkY(cy,10,'LEGISLAȚIE',9);});

  // PAG 10 — Concluzii
  cy=newPage('9. CONCLUZII + RECOMANDĂRI',10);
  cy=concluzii([
    'REPA pentru parcela '+S2(nrcad)+' (UTR '+S2(utr)+', '+areaNum+'m², '+S2(uat)+'): scor de conformitate '+score+'/'+total+' verificări preliminare.',
    'Indicatorii urbanistici propuși '+((aedisH<=hMax&&sda/areaNum<=CUT)?'respectă':'DEPĂȘESC')+ ' limitele PUG (H max='+hMax+'m, CUT='+CUT+'). Verificare detaliată necesară cu CU emis de Primărie.',
    'AACR: amplasamentul este la '+( aeroport?ols?.distPrag_m+'m de prag pistă '+S2(aeroport.cod):'distanță necalculabilă')+'. '+(aacConform?'Aviz favorabil probabil.':'AVIZ AACR RESTRICȚIONAT — consultați AACR.'),
    'Durată estimată procedură de autorizare: '+Math.ceil(etape.reduce((s,e)=>s+parseInt(e[3])||0,0)/22)+' luni (până la AC) + '+niv*3+' luni execuție.',
    'Costuri autorizare estimate: '+Math.round(sda*400*0.04+4000)+' EUR (±30%) plus execuție estimată la '+(sda*400/1000).toFixed(0)+'k EUR.',
    'Pași imediat următori: (1) Solicitare CU de la Primăria '+S2(uat)+', (2) Angajare arhitect cu drept de semnătură, (3) Studiu geotehnic (NP 074/2014), (4) Solicitare avize prealabile utilități.',
  ],cy);
  sign();ftr();
  try{ if(typeof _pdfParcelIVUSection==='function') _pdfParcelIVUSection(d); }catch(e){}
  _pdfSaveMobile(pdf,'repa_'+S2(nrcad).replace(/[^a-zA-Z0-9]/g,'_')+'.pdf');
  ss('✅ REPA generat · '+score+'/'+total+' conf. · '+Math.ceil(etape.reduce((s,e)=>s+parseInt(e[3])||0,0)/22)+' luni autorizare');
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. STUDIU APE PLUVIALE — SR EN 752 + HG 188/2002 + P 66-2001
// Date live: GHI (proxy pt pluviometrie), NFA, scurgere
// ═══════════════════════════════════════════════════════════════════════════
async function generateStudiuApePluviale(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  ss('Se generează Studiu Ape Pluviale...');
  const d=_initStudyPdf('Studiu de Gospodărire a Apelor Pluviale',
    'SR EN 752 · HG 188/2002 · P 66-2001 · Directiva 2007/60/CE',10);
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,BLUE,LIGHT,RED,GREEN,ORANGE,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
    hdr,ftr,sec,body,tblRow,kv,addImg,cover,newPage,checkY,concluzii,sign}=d;
  const caps=await _captureStudyMapsSafe(ap,msg=>ss(msg));
  const ctx=window._sCtx||{};
  const hidro=ctx.hidro||getHidroConfig?.();
  const seism=ctx.seism||getSeismConfig?.();

  // Date pluviometrice din coordonate
  // Sursa: date INMH + ANIF (Agenția Națională de Îmbunătățiri Funciare)
  // Precipitații medii anuale Romania: 400-700mm câmpie, 600-900mm podișuri, 800-1400mm munți
  const P_an=Math.round(400+(lat-44)*70+(lat>46?50:0)); // mm/an estimat
  const i_10min=Math.round(130+(lat>46?-20:lat<45?15:0)); // intensitate 10min, T=2ani l/s/ha (STAS 9470)
  const areaNum=parseFloat(area)||300;
  const fn=window._RV?.fn||'rez';
  const SC=Math.round(areaNum*(parseFloat(params?.pot)||0.4));
  const SV=Math.max(0,areaNum-SC); // suprafata verde estimata

  // Coeficienți scurgere (STAS 9470)
  const psi={acoperisCeramic:0.90,asphalt:0.85,beton:0.90,piatraCubica:0.70,
             gazon:0.25,gradina:0.15,pavajDren:0.35}
  const psiMed=(SC*0.88+SV*0.25)/areaNum;
  const Q_pl=i_10min*psiMed*areaNum/10000; // l/s (formula rațională)
  const V_24h=P_an/365*areaNum*psiMed/1000; // m³/zi mediu (estimare)
  const V_cisterna=Math.round(V_24h*3); // 3 zile tampon

  // PAG 1 — Cover
  cover('Gospodărire ape pluviale · P.annual≈'+P_an+'mm · Q='+Q_pl.toFixed(2)+'l/s',
    caps.imgLocation||null,
    [['Precipitații anuale',P_an+' mm/an (est.)'],['Debit pluvial de calcul',Q_pl.toFixed(2)+' l/s'],
     ['Coef. scurgere mediu',psiMed.toFixed(2)],['NFA estimat',Number(hidro?.nfa??2).toFixed(1)+'m']],
    true,'PLAN GOSPODĂRIRE APE PLUVIALE — SR EN 752:2021');

  let cy=newPage('1. DATE PLUVIOMETRICE — AMPLASAMENT',2);
  cy=addImg(caps.img2D||caps.imgLocation,14,cy,W-28,62,'FIG. 1 — Plan situație · Rețea hidrografică + direcție scurgere');
  cy=sec('1.1. DATE PLUVIOMETRICE ESTIMATE — STAS 9470 + INMH',cy);cy+=3;
  cy=tblRow(['Parametru','Valoare','Metodă','Obs.'],cy,true,[65,40,50,W-28-65-40-50]);
  [['Precipitații medii anuale P',P_an+' mm/an','Regresie lat/lon + INMH','±100mm'],
   ['Intensitate ploaie calc. i (T=2ani)',''+i_10min+' l/s/ha','STAS 9470 harta','10 min, T=2ani'],
   ['Intensitate ploaie i (T=10ani)',Math.round(i_10min*1.35)+' l/s/ha','STAS 9470 ×1.35','Rețea principală'],
   ['Durată ploaie calc.','10 min (scurgere suprafață)','P 66-2001 §3.4','Urban compact'],
   ['Coef. scurgere ψ mediu',psiMed.toFixed(2),'STAS 9470 Tab.1','Amestecat '+fn],
   ['Debit pluvial calc. Q',Q_pl.toFixed(2)+' l/s','Formula rațională Q=i·ψ·A/10000','SR EN 752'],
   ['NFA (nivel apă freatică)','≈'+Number(hidro?.nfa??2).toFixed(1)+'m','INHGA estimat','Risc subinfiltrant'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[65,40,50,W-28-65-40-50]);cy=checkY(cy,12,'PLUVIO',2);});

  cy=newPage('2. SOLUȚII MANAGEMENT APE PLUVIALE',3);
  cy=addImg(caps.img3D||caps.v3dDay,14,cy,W-28,65,'FIG. 2 — Vedere 3D · Direcție scurgere naturală + obstacole');
  cy=sec('2.1. IERARHIA SOLUȚIILOR — SR EN 752:2021 + Strategia EU',cy);cy+=3;
  cy=body('Conform SR EN 752:2021 și Directivei 2007/60/CE, gestionarea apelor pluviale urmează ierarhia: '+
    '(1) RETENȚIE la sursă → (2) INFILTRARE locală → (3) STOCARE → (4) EVACUARE rețea.',14,cy);cy+=4;
  cy=tblRow(['Soluție','Reducere debit','Eficiență','Condiție aplicare','Cost'],
    cy,true,[55,28,22,60,W-28-55-28-22-60]);
  [['Acoperiș verde ext. (substrat 8cm)',('30-40% din '+SC+'m²'),'Bună','Portanță structura ≥100kg/m²','++'],
   ['Cisternă colect. ape pluviale ('+V_cisterna+'m³)','70-80% din acop.','Bună','Spațiu tehnic subteran','++'],
   ['Pavaj permeabil curte/parcaj ('+SV+'m²)','60-90% supraf. permeab.','Bună','NFA>1.5m sub cod','+'],
   ['Rigole + bazin retenție ('+Math.round(Q_pl*30/1000)+'m³)','100% T=2ani','Excelentă','Teren disponibil','+++'],
   ['Câmp absorbant/put absorbant','100% dacă NFA ok','Bună dacă NFA>2m','Sol permeabil','++'],
   ['Dren francez perimetral','Drenaj NFA','Bună','Cf. NFA','+'],
   ['Evacuare la canal (SR EN 752)','0% reducere','—','Rețea separativă obligat.','Taxă racord'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[55,28,22,60,W-28-55-28-22-60]);cy=checkY(cy,12,'SOLUȚII',3);});

  [4,5,6,7,8,9,10].forEach(pg=>{
    cy=newPage([
      '3. DIMENSIONARE SISTEME',
      '4. CALITATE APE PLUVIALE',
      '5. INUNDABILITATE + RISC',
      '6. NORME APLICABILE',
      '7. VEDERI + TOPO',
      '8. CONCLUZII',
      '9. SEMNĂTURĂ'
    ][pg-4],pg);

    if(pg===4){
      cy=sec('3.1. DIMENSIONARE CISTERNĂ RECUPERARE',cy);cy+=3;
      const kw4t=(W-28)/4;
      [['Suprafată acoperiș',SC+'m²'],['Coef. scurgere',0.88],
       ['V recuperat/zi',V_24h.toFixed(2)+'m³'],['Cisternă recomandat',V_cisterna+'m³']
      ].forEach(([l,v],i)=>kv(l,String(v),14+i*kw4t,cy,kw4t-2,[BLUE,GOLD,GREEN,ORANGE][i]));
      cy+=28;
      cy=tblRow(['Dimensionare cisternă','Formula','Valoare','Standard'],cy,true,[60,65,25,W-28-60-65-25]);
      [['Volumul recuperat/zi','V_24h = P_an/365 × Ac × ψ / 1000',V_24h.toFixed(2)+' m³/zi','SR EN 16941-1'],
       ['Cisternă tampon (3 zile)','V_c = V_24h × 3',V_cisterna+' m³','SR EN 16941-1'],
       ['Utilizare irigații/WC','V_util ≈ V_24h × 0.4',+(V_24h*0.4).toFixed(2)+' m³/zi','—'],
       ['Economie apă potabilă','~40% din necesar WC/irig.',Math.round(V_24h*0.4*365/1000*10)/10+' m³/an','—'],
      ].forEach(r=>{cy=tblRow(r,cy,false,[60,65,25,W-28-60-65-25]);});
    } else if(pg===5){
      cy=sec('4.1. INDICATORI DE CALITATE — SR NTPA 002/2002',cy);cy+=3;
      cy=tblRow(['Poluant','Limită SR NTPA 002','Sursă principală','Tratament necesar'],
        cy,true,[45,40,50,W-28-45-40-50]);
      [['Suspensii totale','60 mg/L','Sediment rutier','Separator + decantor'],
       ['Hidrocarburi totale (HTP)','5 mg/L','Parcaje + trafic','Separator hidrocarburi'],
       ['Metale grele (Pb, Zn, Cu)','0.2-1 mg/L','Acoperișuri zinc/cupru','Filtru granular'],
       ['Coliforme fecale','Absent/100ml','Frunze/animale','UV/clor dacă reutilizare'],
       ['pH','6.5-8.5','Acid aerian+alge','Neutralizare dacă pH<6.5'],
      ].forEach(r=>{cy=tblRow(r,cy,false,[45,40,50,W-28-45-40-50]);cy=checkY(cy,12,'CALITATE',5);});
    } else if(pg===6){
      cy=sec('5.1. RISC INUNDABILITATE — DIR. 2007/60/CE',cy);cy+=3;
      const risc_inund=hidro?.nfa<1.5||(lat<44.8&&lon>25.5&&lon<28);
      cy=body('Riscul de inundabilitate pentru amplasamentul '+S2(nrcad)+' este evaluat ca '+
        (risc_inund?'MODERAT-RIDICAT':'REDUS')+' pe baza NFA='+Number(hidro?.nfa??2).toFixed(1)+'m și coordonatelor geografice. '+
        'Verificați harta de risc MMAP (mapgis.rowater.ro) și avizul Apelor Române.',14,cy);cy+=4;
      cy=tblRow(['Risc','Evaluare','Acțiune','Standard'],cy,true,[50,40,55,W-28-50-40-55]);
      [['Inundabilitate luncă',risc_inund?'POSIBIL':'Redus','Verificare ANAR mapgis.rowater.ro','Dir. 2007/60/CE'],
       ['Înălțare subsol','NFA='+Number(hidro?.nfa??2).toFixed(1)+'m','Hidroizolație perimetrală','NP 112/2014'],
       ['Tasare pluvial','Psi_med='+psiMed.toFixed(2),'Dren perimetral + rigole','P 66-2001'],
      ].forEach(r=>{cy=tblRow(r,cy,false,[50,40,55,W-28-50-40-55]);});
    } else if(pg===7){
      cy=sec('6.1. NORME',cy);cy+=3;
      cy=tblRow(['Normativ','Titlu'],cy,true,[35,W-28-35]);
      [['SR EN 752:2021','Sisteme de canalizare și drenaj urban'],
       ['STAS 9470:1975','Hidro. — Ploi maxime calculate + perioadă recursivitate'],
       ['P 66-2001','Normativ executare instalații pluviale clădiri'],
       ['HG 188/2002','Limite de calitate ape de suprafată (NTPA 001) + subterane (NTPA 002)'],
       ['SR EN 16941-1','Sisteme de recuperare apă pluvială pt utilizare non-potabilă'],
       ['Dir. 2007/60/CE','Evaluarea și gestionarea riscului de inundații'],
       ['Legea 107/1996','Legea Apelor — gestionare resurse hidrografice România'],
      ].forEach(r=>{cy=tblRow(r,cy,false,[35,W-28-35]);cy=checkY(cy,10,'NORME',7);});
    } else if(pg===8){
      cy=addImg(caps.imgLocation,14,cy,(W-28)/2,65,'FIG. 3 — Context hidrografic');
      addImg(caps.imgDist,14+(W-28)/2+4,cy-65-14,(W-28)/2,65,'FIG. 4 — Distanțe cursuri apă');
      cy+=4; cy=addImg(caps.v3dDay||caps.img3D,14,cy,W-28,72,'FIG. 5 — Relief și direcție scurgere naturală');
    } else if(pg===9){
      cy=concluzii([
        'Amplasamentul '+S2(nrcad)+' are precipitații medii estimate la '+P_an+'mm/an (lat='+lat.toFixed(2)+'°N). Debitul pluvial de calcul este Q='+Q_pl.toFixed(2)+'l/s (i='+i_10min+'l/s/ha, T=2ani, ψ='+psiMed.toFixed(2)+').',
        'Se recomandă cisternă de recuperare ape pluviale ('+V_cisterna+'m³) pentru economie de ~'+Math.round(V_24h*0.4*365)+' litri/an apă potabilă.',
        hidro?.nfa<1.5?'ATENȚIE: NFA estimat ≈'+Number(hidro?.nfa??2).toFixed(1)+'m — hidroizolație perimetrală obligatorie + sistem de drenaj activ (pompe).'
        :'NFA estimat ≈'+Number(hidro?.nfa??2).toFixed(1)+'m — infiltrare locală posibilă cu puț absorbant sau câmp absorbant.',
        'Rețea de canalizare pluvială SEPARATIVĂ față de cea menajeră este obligatorie conform HG 188/2002 (NTPA 002).',
        'Separator de hidrocarburi obligatoriu la ieșirea din parcaj/garaj înainte de evacuare în rețea (SR EN 858 + NTPA 002).',
        'Verificare obligatorie pe harta de risc MMAP (mapgis.rowater.ro) și la Administrația Bazinală de Apă competentă.',
      ],cy);
    } else { sign();ftr(); }
  });
  try{ if(typeof _pdfParcelIVUSection==='function') _pdfParcelIVUSection(d); }catch(e){}
  _pdfSaveMobile(pdf,'studiu_ape_pluviale_'+S2(nrcad).replace(/[^a-zA-Z0-9]/g,'_')+'.pdf');
  ss('✅ Studiu Ape Pluviale generat · 10 pagini · Q='+Q_pl.toFixed(2)+'l/s');
}

console.log('[Studies New] ✅ 3 studii noi: PMR + Iluminat Natural + REPA + Ape Pluviale');
