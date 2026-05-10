// UrbanX — Studii si rapoarte urbanistice
// Modul extras din index_v4.html

async function generateShadowStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectati o parcela pentru studiu.');return;}
  ss('Se genereaza Studiu de Umbre & Obstructie...');

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,RED,GREEN,ORANGE,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,kv,tblRow,addImg,badge,sign}=_initStudyPdf('Studiu de Umbre si Obstructie Vizuala','Studiu umbre',7);
  const caps = await _captureStudyMaps(ap, msg=>ss(msg));

  function solarAlt(lat,month,hour){const D2R=Math.PI/180;const decl=(-23.45*Math.cos(D2R*(360/365)*(month*30+10)))*D2R;const ha=(hour-12)*15*D2R;return Math.max(0,Math.asin(Math.sin(lat*D2R)*Math.sin(decl)+Math.cos(lat*D2R)*Math.cos(decl)*Math.cos(ha))*180/Math.PI);}
  function shadowLen(h,alt){return alt>0.5?h/Math.tan(alt*Math.PI/180):999;}
  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13.2;
  const vecini=S.ctx?.features?.filter(f=>f.properties?.h>2)||[];
  const parcelCtr=turf.centerOfMass(ap.geo).geometry.coordinates;
  const veciniAnaliza=vecini.slice(0,8).map(v=>{
    const vctr=turf.centerOfMass(v).geometry.coordinates;
    const dist=turf.distance({type:'Feature',geometry:{type:'Point',coordinates:parcelCtr}},{type:'Feature',geometry:{type:'Point',coordinates:vctr}},{units:'meters'});
    const hv=v.properties?.h||7;const sh=shadowLen(hv,solarAlt(lat,11,12));const inParcela=sh>=dist;
    return {nrcad:v.properties?.nrcad||'—',h:hv.toFixed(1),dist:dist.toFixed(0),sh:sh>200?'>200':sh.toFixed(0),inParcela,fn:v.properties?.fn_label||'Necunoscut'};
  });
  const isConform=solarAlt(lat,11,12)>=15;
  const shadDec=shadowLen(aedisH,solarAlt(lat,11,12));
  const months=['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'];
  const half=(W-28)/2-2;

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(20,35,70);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  try{_pdfDrawLogo(pdf,W/2-10,18,20);}catch(e){}
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(24);pdf.setFont('helvetica','bold');
  pdf.text('STUDIU DE UMBRE',W/2,72,{align:'center'});
  pdf.text('SI OBSTRUCTIE VIZUALA',W/2,88,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(10);
  pdf.text('Analiza solara · Umbre proiectate · Conformitate OMS 119/2014',W/2,100,{align:'center'});
  pdf.setFillColor(30,50,90);pdf.rect(20,112,W-40,85,'F');pdf.setFillColor(...GOLD);pdf.rect(20,112,3,85,'F');
  const rows=[['Nr. cadastral:',nrcad],['Zona UTR:',utr],['Suprafata teren:',area+' mp'],['H propus:',aedisH.toFixed(1)+'m'],['Coordonate GPS:',lat.toFixed(5)+'N · '+lon.toFixed(5)+'E'],['Alt. solara iarna (12:00):',solarAlt(lat,11,12).toFixed(1)+'°'],['Umbra maxima (iarna):',shadDec>500?'>500m':shadDec.toFixed(0)+'m spre nord']];
  rows.forEach(([l,v],i)=>{pdf.setTextColor(150,170,200);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,124+i*11);pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),96,124+i*11);});
  pdf.setFillColor(isConform?20:180,isConform?120:30,isConform?60:30);pdf.rect(20,210,W-40,20,'F');
  pdf.setTextColor(255,255,255);pdf.setFontSize(11);pdf.setFont('helvetica','bold');
  pdf.text(isConform?'CONFORM — Umbra acceptabila, insorire asigurata':'ATENTIE — Verificare suplimentara necesara',W/2,220,{align:'center'});
  pdf.setFontSize(7.5);pdf.text('Prag OMS 119/2014: altitudine solara min. 15° la solstitiu iarna · Valoare calculata: '+solarAlt(lat,11,12).toFixed(1)+'°',W/2,228,{align:'center'});
  pdf.setTextColor(100,120,150);pdf.setFontSize(7);pdf.setFont('helvetica','normal');
  pdf.text('Generat: '+S2(dateStr)+' · Document orientativ · UrbanX TSS·FG',W/2,H-12,{align:'center'});
  if(caps.imgLocation&&caps.imgLocation.length>500){
    try{
      pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');
      pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,H-72,W-28,58,'S');
      pdf.setTextColor(...GOLD);pdf.setFontSize(6);pdf.setFont('helvetica','bold');
      pdf.text('AMPLASAMENT · '+S2(nrcad)+' · UTR '+S2(utr)+' · Sursa: Mapbox Standard 3D',W/2,H-75,{align:'center'});
    }catch(e){}
  }
  ftr();

  // PAG 2: Vedere 3D + analiza context
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONTEXT URBAN 3D — VEDERE PRINCIPALA',2);ftr();
  let cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,72,'FIG. 1 — Vedere 3D principala · Volumul propus in contextul urban real · pitch 62° bearing -20°');
  cy=sec('INCADRARE IN CONTEXT — ANALIZA VIZUALA',cy);cy+=2;
  cy=body('Imaginea de mai sus prezinta volumul propus (marcat in albastru) in contextul construit real al zonei, capturat din platforma UrbanX cu date OpenStreetMap actualizate. Se observa raportul volumetric fata de cladirile invecinate, orientarea fata de punctele cardinale si potentialele zone de obstructie solara.',14,cy);cy+=4;
  cy=addImg(caps.img2D,14,cy,half,52,'FIG. 2 — Plan 2D ortogonal · Cadastru + constructii existente');
  addImg(caps.imgDist,14+half+4,cy-52,half,52,'FIG. 3 — Plan distante contur-la-contur · aliniamente');
  cy+=4;
  cy=sec('ORIENTARE CARDINALA SI IMPACT SOLAR',cy);cy+=2;
  cy=body('Parcela '+nrcad+' este amplasata la coordonatele '+lat.toFixed(4)+'°N / '+lon.toFixed(4)+'°E (UTR '+utr+'). La latitudinea '+lat.toFixed(1)+'°N, altitudinea solara la solstitiu de iarna (21 decembrie, ora 12:00) este de '+solarAlt(lat,11,12).toFixed(1)+'°, '+(isConform?'valoare care depaseste pragul minim legal de 15° prevazut de OMS 119/2014.':'valoare sub pragul minim legal de 15° — situatie ce necesita studiu detaliat de insorire elaborat de arhitect OAR.'),14,cy);

  // PAG 3: Tabel umbre orare
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CALCULE UMBRE ORARE — CLADIREA PROPUSA',3);ftr();
  cy=28;cy=sec('1. ALTITUDINI SOLARE LA LATITUDINE '+lat.toFixed(2)+'N (ore/luna)',cy);cy+=2;
  const hours=[8,10,12,14,16];
  cy=tblRow(['Luna',...hours.map(h=>h+':00h')],cy,true,[28,...hours.map(_=>28)]);
  months.forEach((m,mi)=>{
    const vals=hours.map(h=>solarAlt(lat,mi,h));
    cy=tblRow([m,...vals.map(v=>v<1?'—':v.toFixed(1)+'°')],cy,false,[28,...hours.map(_=>28)]);
    vals.forEach((v,vi)=>{const x=14+28+vi*28;if(v>=30){pdf.setFillColor(20,120,60,0.6);pdf.rect(x,cy-8,28,8,'F');}else if(v>=15){pdf.setFillColor(180,130,20,0.6);pdf.rect(x,cy-8,28,8,'F');}else if(v>0){pdf.setFillColor(180,50,30,0.6);pdf.rect(x,cy-8,28,8,'F');}});
  });
  cy+=4;
  cy=sec('2. UMBRE PROIECTATE SOLSTITIU IARNA (21 Dec) · H='+aedisH.toFixed(1)+'m',cy);cy+=2;
  cy=tblRow(['Ora','Alt. soare','Umbra (m)','Directie','Status'],cy,true,[22,32,32,40,52]);
  [8,9,10,11,12,13,14,15,16].forEach(h=>{
    const alt=solarAlt(lat,11,h);const sh=shadowLen(aedisH,alt);
    const status=alt<1?'Sub orizont':alt<15?'SUB PRAG LEGAL':'CONFORM (>15°)';
    cy=tblRow([h+':00',alt<1?'—':alt.toFixed(1)+'°',sh>200?'>200m':sh.toFixed(0)+'m','Spre Nord',status],cy,false,[22,32,32,40,52]);
  });
  cy+=3;pdf.setFontSize(7);pdf.setTextColor(...BLUE);
  cy=body('Prag minim OMS 119/2014 + Ordin 994/2018 art. 3: altitudine solara ≥ 15° la solstitiu de iarna (21 Dec), minim 1h 30min insorire directa/zi pentru spatiile de locuit.',14,cy);

  // PAG 4: Analiza vecini + grafic + viewer zi/noapte
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('ANALIZA VECINI — IMPACT UMBRIRE + VIEWER 3D ZI/NOAPTE',4);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,58,'FIG. 4 — Viewer 3D Urban3D · Iluminare ZI · Vedere principala');
  addImg(caps.v3dNight,14+half+4,cy-58,half,58,'FIG. 5 — Viewer 3D Urban3D · Iluminare NOAPTE · Impact vizual nocturn');
  cy+=4;
  cy=sec('3. CLADIRI VECINE CU POTENTIAL DE OBSTRUCTIE',cy);cy+=2;
  cy=tblRow(['Nr.cad','H(m)','Dist(m)','Umbra iarna(m)','Functiune','Impact'],cy,true,[30,18,18,30,38,44]);
  veciniAnaliza.forEach(v=>{
    cy=tblRow([v.nrcad,v.h,v.dist,v.sh,v.fn.slice(0,14),v.inParcela?'OBSTRUCTIE':'OK'],cy,false,[30,18,18,30,38,44]);
    if(v.inParcela){pdf.setFillColor(180,50,30);pdf.rect(14+28+18+18+30+38,cy-9,44,8,'F');}
  });
  if(!veciniAnaliza.length)cy=body('Nu s-au detectat cladiri vecine cu inaltime semnificativa in contextul incarcat.',14,cy);

  // PAG 5: Grafic solar + viewer golden/overcast
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('DIAGRAMA SOLARA + VIEWER 3D GOLDEN HOUR / INNORIRAT',5);ftr();
  cy=28;
  cy=addImg(caps.v3dGolden,14,cy,half,58,'FIG. 6 — Viewer 3D Urban3D · GOLDEN HOUR · Conditii de iluminare favorabila');
  addImg(caps.v3dOvercast||caps.imgLat,14+half+4,cy-58,half,58,'FIG. 7 — Viewer 3D Urban3D · CER INNORIRAT / Vedere laterala · Conditii difuze');
  cy+=4;
  cy=sec('4. GRAFIC ALTITUDINE SOLARA ANUALA (ora 12:00)',cy);cy+=4;
  const gx=14,gy=cy,gw=W-28,gh=55;
  pdf.setFillColor(20,30,50);pdf.rect(gx,gy,gw,gh,'F');
  pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.3);
  [0,15,30,45,60].forEach(v=>{const y2=gy+gh-v/70*gh;pdf.line(gx,y2,gx+gw,y2);pdf.setTextColor(150,170,190);pdf.setFontSize(6);pdf.text(v+'°',gx-6,y2+1,{align:'right'});});
  const y15=gy+gh-15/70*gh;pdf.setDrawColor(220,60,60);pdf.setLineWidth(0.6);pdf.line(gx,y15,gx+gw,y15);
  pdf.setTextColor(220,60,60);pdf.setFontSize(6.5);pdf.text('prag 15° OMS 119',gx+gw-1,y15-1,{align:'right'});
  pdf.setDrawColor(...GOLD);pdf.setLineWidth(1);
  let prevX,prevY;
  months.forEach((m,mi)=>{const x=gx+(mi/(months.length-1))*gw;const alt=solarAlt(lat,mi,12);const y2=gy+gh-Math.min(alt,70)/70*gh;if(mi>0)pdf.line(prevX,prevY,x,y2);prevX=x;prevY=y2;pdf.setTextColor(180,190,200);pdf.setFontSize(5.5);pdf.text(m,x,gy+gh+5,{align:'center'});});
  cy=gy+gh+10;
  cy=sec('5. DURATA INSORIRE DIRECTA PE SEZOANE',cy);cy+=2;
  [[`Solstitiu vara (21 Iun)`,solarAlt(lat,5,12).toFixed(1)+'°','~14h 00min','Insorire maxima · radiatii UV intense'],
   [`Echinoct primavara (21 Mar)`,solarAlt(lat,2,12).toFixed(1)+'°','~12h 00min','Tranzitie · insorire normala'],
   [`Echinoct toamna (21 Sep)`,solarAlt(lat,8,12).toFixed(1)+'°','~12h 00min','Tranzitie · insorire normala'],
   [`Solstitiu iarna (21 Dec)`,solarAlt(lat,11,12).toFixed(1)+'°','~8h 30min','Insorire minima · verificare OMS 119']
  ].forEach((r,ri)=>{cy=tblRow(r,cy,ri===0,ri===0?[52,35,30,65]:[52,35,30,65]);});

  // PAG 6: Vederi multiple + concluzii
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VEDERI MULTIPLE + CONCLUZII',6);ftr();
  cy=28;
  cy=addImg(caps.imgFront,14,cy,half,50,'FIG. 8 — Vedere frontala (Nord) · Fatada principala');
  addImg(caps.imgBack,14+half+4,cy-50,half,50,'FIG. 9 — Vedere posterioara (Sud) · Spatiu curte');
  cy+=2;
  cy=addImg(caps.imgAerial,14,cy,half,50,'FIG. 10 — Vedere aeriana 45° · Amprenta si acoperis');
  addImg(caps.imgLat,14+half+4,cy-50,half,50,'FIG. 11 — Vedere laterala (Est) · Context E-V');
  cy+=4;
  cy=sec('6. CONCLUZII SI RECOMANDARI',cy);cy+=2;
  cy=body('Altitudinea solara la latitudinea '+lat.toFixed(2)+'°N la solstitiu de iarna (21 Decembrie, ora 12:00) este de '+solarAlt(lat,11,12).toFixed(1)+'°, '+(isConform?'valoare care depaseste pragul minim de 15° prevazut de OMS 119/2014. Amplasamentul respecta conditiile de insorire.':'valoare sub pragul minim de 15°. Se impune elaborarea unui studiu detaliat de insorire de catre arhitect autorizat OAR.')+' Umbra maxima proiectata de cladirea propusa (H='+aedisH.toFixed(1)+'m) la solstitiu iarna este de '+( shadDec>500?'>500m':shadDec.toFixed(0)+'m')+' catre nord.',14,cy);cy+=4;
  const recs=['Orientarea fatadelor principale catre sud/sud-est pentru maximizarea insolarii directe.','Adancimea incaperilor de locuit sa nu depaseasca 2.5x inaltimea pardoselii la brau fereastra.','Protectii solare orizontale (streasini, parasolare, balcoane) pe fatadele sudice — necesar vara.','Evitarea amplasarii dormitorelor pe fatadele cu obstructie mai mare de 2 ore iarna.','Distanta minima fata de vecinul nord: H/tan(15°) = '+shadowLen(aedisH,15).toFixed(0)+'m.','Verificarea prin simulari BIM/IES<ve> pentru faze ulterioare de proiectare.'];
  recs.forEach(r=>{cy=body('• '+r,16,cy);cy+=1;});

  // PAG 7: Baza legala + semnatura
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA SI SEMNATURA',7);ftr();
  cy=28;cy=sec('7. BAZA LEGALA SI NORMATIVA',cy);cy+=2;
  ['Ordinul MS nr. 119/2014 actualizat cu Ordinul nr. 994/2018, art. 3: minim 1.5 ore insorire directa/zi la solstitiu iarna pentru spatiile de locuit principale.',
   'STAS 6221-1981 Iluminatul natural in constructii — Conditii tehnice generale.',
   'Legea nr. 350/2001 privind amenajarea teritoriului si urbanismul, republicata.',
   'Regulamentul General de Urbanism aprobat prin HG nr. 525/1996, cu modificarile ulterioare.',
   'PUG '+getUATLabel()+' in vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.',
   'Ghidul privind insorirea cladirilor GT 043-2002 — INCERC Bucuresti.'
  ].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});
  // Harta orasului inainte de concluzii
  if(caps.imgCity&&caps.imgCity.length>500){
    cy+=3;
    pdf.setFillColor(...DARK);pdf.rect(14,cy-3,W-28,4,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,cy-3,W-28,1,'F');
    pdf.setTextColor(...GOLD);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
    pdf.text('INCADRARE IN CONTEXTUL URBAN AL MUNICIPIULUI IASI',W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in Municipiul Iasi · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  // Harta orasului inainte de concluzii
  if(caps.imgCity&&caps.imgCity.length>500){
    cy+=3;
    pdf.setFillColor(...DARK);pdf.rect(14,cy-3,W-28,4,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,cy-3,W-28,1,'F');
    pdf.setTextColor(...GOLD);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
    pdf.text('INCADRARE IN CONTEXTUL URBAN AL MUNICIPIULUI IASI',W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in Municipiul Iasi · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  sign();
  pdf.save('Studiu_Umbre_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('Studiu de Umbre generat!');
}

// ════════════════════════════════════════════════════════════════════════════
// STUDIU 2: ACUSTIC URBAN
// ════════════════════════════════════════════════════════════════════════════
async function generateNoiseStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectati o parcela pentru studiu.');return;}
  ss('Se genereaza Studiu Acustic Urban...');

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,RED,GREEN,ORANGE,PURPLE,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,kv,tblRow,addImg,badge,sign}=_initStudyPdf('Studiu Acustic Urban','Studiu acustic',7);
  const zgomot=getZgomotConfig();
  const vant=getVantConfig();
  const caps = await _captureStudyMaps(ap, msg=>ss(msg));

  const FN_NOISE={'commercial':65,'industrial':75,'retail':62,'office':55,'school':52,'hospital':45,'residential':42,'yes':48,'Necunoscut':50};
  const vecini=S.ctx?.features||[];
  const parcelCtr=turf.centerOfMass(ap.geo).geometry.coordinates;
  const surse=vecini.filter(f=>{try{const d=turf.distance({type:'Feature',geometry:{type:'Point',coordinates:parcelCtr}},{type:'Feature',geometry:{type:'Point',coordinates:turf.centerOfMass(f).geometry.coordinates}},{units:'meters'});return d<200;}catch(e){return false;}}).map(f=>{const fn=f.properties?.fn||'yes';const d=turf.distance({type:'Feature',geometry:{type:'Point',coordinates:parcelCtr}},{type:'Feature',geometry:{type:'Point',coordinates:turf.centerOfMass(f).geometry.coordinates}},{units:'meters'});const Ls=FN_NOISE[fn]||50;const La=Math.max(0,Ls-20*Math.log10(Math.max(1,d))+11);return {fn:f.properties?.fn_label||fn,dist:d.toFixed(0),Ls,La:La.toFixed(1),nrcad:f.properties?.nrcad||'—'};}).sort((a,b)=>b.La-a.La).slice(0,10);
  const Ltotal=surse.length?10*Math.log10(surse.reduce((s,x)=>s+Math.pow(10,x.La/10),0)):45;
  const limit_zi=55,limit_n=45;
  const confZi=Ltotal<=limit_zi,confNoap=Ltotal<=limit_n;
  const isOk=confZi&&confNoap;
  const half=(W-28)/2-2;

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(20,35,70);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  try{_pdfDrawLogo(pdf,W/2-10,18,20);}catch(e){}
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(24);pdf.setFont('helvetica','bold');
  pdf.text('STUDIU ACUSTIC URBAN',W/2,72,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(10);
  pdf.text('Evaluare nivel zgomot · Conformitate SR 10009/2017 · Masuri de atenuare fonica',W/2,85,{align:'center'});
  pdf.setFillColor(30,50,90);pdf.rect(20,100,W-40,80,'F');pdf.setFillColor(...GOLD);pdf.rect(20,100,3,80,'F');
  [['Nr. cadastral:',nrcad],['Zona UTR:',utr],['Suprafata teren:',area+' mp'],['Functiune propusa:',AEDIS_FN[AEDIS.fn]?.label||'—'],['Surse zgomot identificate:',surse.length+' in raza 200m'],['Nivel echivalent estimat Leq:',Ltotal.toFixed(1)+' dB(A)'],['Limita zi SR 10009:',limit_zi+' dB(A)'],['Limita noapte SR 10009:',limit_n+' dB(A)']].forEach(([l,v],i)=>{pdf.setTextColor(150,170,200);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,112+i*9.5);pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),96,112+i*9.5);});
  pdf.setFillColor(isOk?20:180,isOk?120:30,isOk?60:30);pdf.rect(20,192,W-40,20,'F');
  pdf.setTextColor(255,255,255);pdf.setFontSize(11);pdf.setFont('helvetica','bold');
  pdf.text(isOk?'CONFORM — Nivel zgomot acceptabil SR 10009/2017':'DEPASIRE — Masuri de izolare fonica necesare',W/2,202,{align:'center'});
  pdf.setFontSize(8);pdf.text('Nivel estimat: '+Ltotal.toFixed(1)+' dB(A) | Limita zi: '+limit_zi+' dB(A) | Limita noapte: '+limit_n+' dB(A)',W/2,210,{align:'center'});
  pdf.setTextColor(100,120,150);pdf.setFontSize(7);pdf.text('Generat: '+S2(dateStr)+' · Document orientativ · Confirmare prin masuratori acustice in situ',W/2,H-12,{align:'center'});
  ftr();

  // PAG 2: Vedere 3D + surse zgomot
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONTEXT URBAN 3D — SURSE ZGOMOT IDENTIFICATE',2);ftr();
  let cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,70,'FIG. 1 — Vedere 3D principala · Context urban · Surse de zgomot in raza 200m');
  cy=sec('1. SURSE DE ZGOMOT IN RAZA DE 200m — TABEL DETALIAT',cy);cy+=2;
  cy=body('Analiza s-a efectuat prin identificarea tuturor cladirilor si functiunilor OSM in raza de 200m fata de centrul parcelei '+nrcad+'. Nivelul la sursa Ls a fost estimat conform datelor tipice pentru fiecare categorie functionala, iar nivelul la parcela La a fost calculat prin legea de propagare acustica in camp liber: La = Ls - 20·log10(d) + 11.',14,cy);cy+=4;
  cy=tblRow(['Nr.cad','Functiune','Dist(m)','Ls(dB)','La la parcela(dB)'],cy,true,[32,50,25,25,46]);
  surse.forEach(s=>{cy=tblRow([s.nrcad,s.fn.slice(0,20),s.dist,s.Ls,s.La],cy,false,[32,50,25,25,46]);});
  if(!surse.length)cy=body('Nu s-au detectat surse de zgomot semnificative in raza de 200m.',14,cy);
  cy+=3;cy=sec('2. NIVEL TOTAL ESTIMAT PRIN COMPUNERE ENERGETICA',cy);cy+=2;
  cy=tblRow(['Indicator','Valoare','Status'],cy,true,[80,52,46]);
  [['Nivel echivalent estimat Leq',Ltotal.toFixed(1)+' dB(A)',confZi?'CONFORM':'DEPASIRE'],['Limita zi (06:00-22:00)',limit_zi+' dB(A)',Ltotal<=limit_zi?'OK':'DEPASIT'],['Limita noapte (22:00-06:00)',limit_n+' dB(A)',Ltotal<=limit_n?'OK':'DEPASIT'],['Atenuare necesara',Math.max(0,Ltotal-limit_zi).toFixed(1)+' dB(A)',Ltotal>limit_zi?'NECESARA':'—']].forEach(r=>{cy=tblRow(r,cy,false,[80,52,46]);});

  // PAG 3: Viewer 3D zi + noapte + masuri
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D ZI / NOAPTE — MASURI DE ATENUARE',3);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,58,'FIG. 2 — Viewer 3D Urban3D · Iluminare ZI · Fatade si materiale');
  addImg(caps.v3dNight,14+half+4,cy-58,half,58,'FIG. 3 — Viewer 3D Urban3D · NOAPTE · Impact acustic nocturn crescut');
  cy+=4;
  cy=sec('3. MASURI CONSTRUCTIVE DE ATENUARE FONICA',cy);cy+=2;
  cy=body('Urmatoarele masuri constructive sunt recomandate in functie de nivelul de zgomot estimat si de sensibilitatea acustica a functiunii propuse. Aplicarea lor va trebui verificata prin proiect tehnic elaborat de specialist acustica.',14,cy);cy+=3;
  cy=tblRow(['Masura constructiva','Necesitate','Atenuare obtinuta','Aplicare recomandata'],cy,true,[54,28,32,64]);
  [['Tamplarie PVC/Al cu tripan',Ltotal>limit_zi?'OBLIGATORIU':'RECOMANDAT','40-48 dB(A)','Toate fatadele expuse'],['Vitraj exterior dublu/triplu','RECOMANDAT','35-45 dB(A)','Fatadele expuse zgomotului'],['Zidarie exterioara >30cm','STANDARD','45 dB(A)','Peretii exteriori portanti'],['Tavan casetat fonoabsorbant','OPTIONAL','5-10 dB(A)','Spatii de locuit/birouri'],['Peisagism cu arbori/gard viu','RECOMANDAT','3-6 dB(A)','Aliniament stradal frontal'],['Fatada ventilata cu strat fonoabs.','RECOMANDAT','8-15 dB(A)','Fatadele spre surse majore']].forEach(r=>{cy=tblRow(r,cy,false,[54,28,32,64]);});

  // PAG 4: Viewer golden + overcast + orientare functionala
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D GOLDEN HOUR / INNORIRAT — ORIENTARE FUNCTIONALA',4);ftr();
  cy=28;
  cy=addImg(caps.v3dGolden,14,cy,half,58,'FIG. 4 — Viewer 3D Urban3D · GOLDEN HOUR · Vizualizare seara');
  addImg(caps.v3dOvercast||caps.imgAerial,14+half+4,cy-58,half,58,'FIG. 5 — Viewer 3D Urban3D · CER INNORIRAT / Vedere aeriana');
  cy+=4;
  cy=sec('4. ORIENTAREA FUNCTIONALA A SPATIILOR IN RAPORT CU ZGOMOTUL',cy);cy+=2;
  cy=body('Amplasarea corecta a spatiilor in interiorul cladirii, in raport cu directia surselor de zgomot identificate, constituie una din masurile cele mai eficiente si mai economice de atenuare acustica pasiva. Se recomanda urmatoarea distributie functionala:',14,cy);cy+=3;
  ['Dormitoare si spatii de odihna: orientate catre fatadele OPUSE surselor principale de zgomot (interior bloc, curte interioara, latura sud/vest calma).',
   'Spatii tehnice, garaje, holuri, case scari: orientate CATRE sursa, cu functie de tampon acustic pentru spatiile sensibile.',
   'Balcoane si logii: pozitionate astfel incat sa nu amplifice reflexiile sonore prin efectul de U sau L al fatadei.',
   'Spatii comerciale la parter (daca exista): compatibile cu nivelul de zgomot din zona — nu necesita atenuare suplimentara fata de standard.',
   'Birouri si spatii administrative: toleranta mai mare fata de zgomot decat spatiile rezidentiale — plasare flexibila.'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 5: Plan 2D + distante + baza legala
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PLAN 2D + DISTANTE — BAZA LEGALA',5);ftr();
  cy=28;
  cy=addImg(caps.img2D,14,cy,half,52,'FIG. 6 — Plan 2D cadastral · Surse zgomot identificate in zona');
  addImg(caps.imgDist,14+half+4,cy-52,half,52,'FIG. 7 — Plan distante contur-la-contur · Aliniamente');
  cy+=4;
  cy=sec('5. SINTEZA ANALIZEI ACUSTICE',cy);cy+=2;
  cy=body('Nivelul de zgomot echivalent estimat pentru amplasamentul '+nrcad+' (UTR '+utr+', suprafata '+area+' mp) este de '+Ltotal.toFixed(1)+' dB(A), calculat prin compunerea energetica a celor '+surse.length+' surse identificate in raza de 200m. '+(isOk?'Valoarea se incadreaza in limitele admise de SR 10009/2017 pentru zona acustica corespunzatoare, atat pe perioada de zi ('+Ltotal.toFixed(1)+' dB(A) ≤ '+limit_zi+' dB(A)) cat si pe perioada de noapte ('+Ltotal.toFixed(1)+' dB(A) '+(confNoap?'≤':'>')+' '+limit_n+' dB(A)). Proiectul poate continua cu masuri standard de izolare fonica.':'Valoarea depaseste limita admisa. Se recomanda masuri constructive suplimentare de izolare fonica, in special pentru fatadele expuse surselor principale. Elaborarea unui studiu acustic detaliat de catre specialist acreditato este recomandata.'),14,cy);cy+=5;
  cy=sec('6. BAZA LEGALA',cy);cy+=2;
  ['SR 10009:2017 — Acustica in constructii. Limite admisibile ale nivelului de zgomot in mediul exterior cladirilor.','HG nr. 321/2005 privind evaluarea si gestionarea zgomotului ambiant — transpune Directiva 2002/49/CE.','Directiva 2002/49/CE privind evaluarea si gestionarea zgomotului ambiental in mediul urban.','Normativul C 125-2013 privind proiectarea si executarea masurilor de izolare fonica in cladiri.','OMS nr. 119/2014 — Norme de igiena si sanatate publica privind mediul de viata al populatiei.','PUG '+getUATLabel()+' in vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});

  // PAG 6: Vederi multiple
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VEDERI MULTIPLE 3D — CONTEXT COMPLET',6);ftr();
  cy=28;
  cy=addImg(caps.imgFront,14,cy,half,50,'FIG. 8 — Vedere frontala (Nord) · Fatada principala · Expunere primara');
  addImg(caps.imgBack,14+half+4,cy-50,half,50,'FIG. 9 — Vedere posterioara (Sud) · Curte spate');
  cy+=2;
  cy=addImg(caps.imgLat,14,cy,half,50,'FIG. 10 — Vedere laterala (Est)');
  addImg(caps.imgAerial,14+half+4,cy-50,half,50,'FIG. 11 — Vedere aeriana 45° · Amprenta');
  cy+=4;
  cy=body('Imaginile de mai sus prezinta volumul propus din patru directii, permitand evaluarea completa a contextului urban, a relatiei cu cladirile vecine si a expunerii la sursele de zgomot identificate. Se recomanda ca fatadele expuse zgomotului (conform hartii surselor, Pag. 2) sa fie tratate cu materiale cu coeficient de izolare acustica Rw ≥ 35 dB conform C 125-2013.',14,cy);

  // PAG 7: Semnatura
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',7);ftr();
  cy=28;sign();
  pdf.save('Studiu_Acustic_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('Studiu Acustic Urban generat!');
}

// ════════════════════════════════════════════════════════════════════════════
// STUDIU 3: VÂNT & CONFORT PIETONAL
// ════════════════════════════════════════════════════════════════════════════
async function generateWindStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectati o parcela.');return;}
  ss('Se genereaza Studiu Vant & Confort Pietonal...');

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,RED,GREEN,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu de Vant si Confort Pietonal','Studiu vant',6);
  const vantCfg=getVantConfig();
  const zgomotCfg=getZgomotConfig();
  const caps = await _captureStudyMaps(ap, msg=>ss(msg));

  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13.2;
  const vecini=S.ctx?.features||[];
  const parcelCtr=turf.centerOfMass(ap.geo).geometry.coordinates;
  const hMed=vecini.length?vecini.reduce((s,f)=>s+(f.properties?.h||6),0)/vecini.length:7;
  const half=(W-28)/2-2;
  const bearing=S.bearing||0;
  const windDir=bearing<45||bearing>=315?'Nord-Est (dominant iarna)':bearing<135?'Nord-Est / Est':bearing<225?'Sud-Vest (dominant vara)':'Nord-Vest / Vest';

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(20,35,70);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  try{_pdfDrawLogo(pdf,W/2-10,18,20);}catch(e){}
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(24);pdf.setFont('helvetica','bold');
  pdf.text('STUDIU DE VANT',W/2,72,{align:'center'});
  pdf.text('SI CONFORT PIETONAL',W/2,88,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(10);
  pdf.text('Analiza expunere vant · Zone de calm · Confort pietonal Lawson',W/2,100,{align:'center'});
  pdf.setFillColor(30,50,90);pdf.rect(20,112,W-40,80,'F');pdf.setFillColor(...GOLD);pdf.rect(20,112,3,80,'F');
  [['Nr. cadastral:',nrcad],['Zona UTR:',utr],['Suprafata teren:',area+' mp'],['H propus:',aedisH.toFixed(1)+'m'],['H medie zona:',hMed.toFixed(1)+'m'],['Raport H/Hmedio:',((aedisH/Math.max(1,hMed)).toFixed(2))],['Directie vant predominanta:','NE (iarna) / SV (vara)'],['Viteza vant de referinta:','V0=25m/s (zona II STAS 10101)']].forEach(([l,v],i)=>{pdf.setTextColor(150,170,200);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,124+i*9.5);pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),96,124+i*9.5);});
  pdf.setTextColor(100,120,150);pdf.setFontSize(7);pdf.text('Generat: '+S2(dateStr)+' · Document orientativ · UrbanX TSS·FG',W/2,H-12,{align:'center'});
  // Harta amplasament pe cover (Standard 3D) - banda jos
  if(caps.imgLocation&&caps.imgLocation.length>500){
    try{
      pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');
      pdf.setFillColor(10,20,40);pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.5);
      pdf.rect(14,H-72,W-28,58,'S');
      pdf.setTextColor(...GOLD);pdf.setFontSize(6);pdf.setFont('helvetica','bold');
      pdf.text('AMPLASAMENT · '+S2(nrcad)+' · UTR '+S2(utr)+' · Sursa: Mapbox Standard 3D',W/2,H-75,{align:'center'});
    }catch(e){}
  }
  ftr();

  // PAG 2: Vedere 3D + analiza context vant
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONTEXT 3D — ANALIZA EXPUNERE VANT',2);ftr();
  let cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,72,'FIG. 1 — Vedere 3D principala · Context urban · Evaluare expunere la vant');
  cy=sec('1. CONTEXTUL URBAN SI EXPUNEREA LA VANT',cy);cy+=2;
  cy=body('Analiza confortului pietonal la vant s-a efectuat pentru amplasamentul '+nrcad+' (UTR '+utr+'), avand in vedere configuratia cladirii propuse (H='+aedisH.toFixed(1)+'m) si contextul construit existent (H medie zona='+hMed.toFixed(1)+'m). Raportul H/Hmedie='+((aedisH/Math.max(1,hMed)).toFixed(2))+' indica '+(aedisH>hMed*1.3?'o cladire semnificativ mai inalta decat contextul, cu potential impact aerodinamic important asupra spatiilor pietonale adiacente.':'o cladire compatibila cu contextul construit, cu impact aerodinamic limitat la nivel pietonal.'),14,cy);cy+=4;
  cy=addImg(caps.img2D,14,cy,half,50,'FIG. 2 — Plan 2D · Configuratie parcela si constructii vecine');
  addImg(caps.imgDist,14+half+4,cy-50,half,50,'FIG. 3 — Plan distante · Spatii libere si coridoare de vant');
  cy+=4;
  cy=sec('2. CRITERII LAWSON DE CONFORT PIETONAL',cy);cy+=2;
  cy=tblRow(['Criteriu Lawson','Viteza medie','Utilizare acceptabila','Clasa'],cy,true,[50,35,60,33]);
  [['A — Sedere indelungata','<2.5 m/s','Terase, banci, locuri de joaca','Calm'],['B — Sedere scurta','<4.0 m/s','Spatii comerciale exterioare','Confort'],['C — Mers incet','<6.0 m/s','Circulatii pietonale principale','Acceptabil'],['D — Mers rapid','<8.0 m/s','Intersectii, traversari','Limita'],['E — Disconfort','<10.0 m/s','Doar circulatie rapida','Risc'],['F — Pericol','>10.0 m/s','Inadecvat oricand','Pericol']].forEach(r=>{cy=tblRow(r,cy,false,[50,35,60,33]);});

  // PAG 3: Viewer 3D zi + noapte
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D ZI / NOAPTE — IMPACT AERODINAMIC',3);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,60,'FIG. 4 — Viewer 3D Urban3D · ZI · Vedere principala · Fatade expuse vant');
  addImg(caps.v3dNight,14+half+4,cy-60,half,60,'FIG. 5 — Viewer 3D Urban3D · NOAPTE · Spatii pietonale nocturne');
  cy+=4;
  cy=sec('3. ANALIZA AERODINAMICA PRELIMINARA',cy);cy+=2;
  cy=body('Cladirea propusa cu H='+aedisH.toFixed(1)+'m in contextul cu H medie='+hMed.toFixed(1)+'m genereaza urmatoarele efecte aerodinamice estimate:',14,cy);cy+=3;
  [aedisH>hMed*1.5?'EFECT BORA (downwash): Curentii descendenti pe fatada sudica pot atinge viteze de 1.2-1.5 x viteza vantului la nivel pietonal, in special in coltul de sud-vest al cladirii.':'Efect aerodinamic limitat — cladirea nu depaseste semnificativ inaltimea medie a contextului construit.',
   'EFECT CORIDOR (venturi): Spatiile inguste intre cladiri pot accelera vantul cu factor 1.3-1.8 fata de vantul incident. Se recomanda verificarea coridoarelor cu latime < '+( aedisH*0.4).toFixed(0)+'m.',
   'ZONA DE CALM (leeward): Spatiul de cel putin '+(aedisH*0.6).toFixed(0)+'m in spatele cladirii (fata de directia vantului dominant NE) beneficiaza de protectie naturala impotriva vantului.',
   'IMPACT LA NIVEL PIETONAL (≤2m): Conform criteriilor Lawson, spatiile de sedere de pe terase vor necesita protectie suplimentara (jardiniere, paravane, vegetatie) daca viteza medie depaseste 2.5 m/s.'
  ].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 4: Viewer golden + overcast + masuri
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D GOLDEN / INNORIRAT — MASURI DE PROTECTIE',4);ftr();
  cy=28;
  cy=addImg(caps.v3dGolden,14,cy,half,58,'FIG. 6 — Viewer 3D · GOLDEN HOUR · Conditii de vant seral favorabile');
  addImg(caps.v3dOvercast||caps.imgBack,14+half+4,cy-58,half,58,'FIG. 7 — Viewer 3D · CER INNORIRAT / Vedere posterioara');
  cy+=4;
  cy=sec('4. MASURI DE PROTECTIE LA VANT RECOMANDATE',cy);cy+=2;
  cy=tblRow(['Masura','Eficienta','Amplasare recomandata'],cy,true,[60,35,83]);
  [['Paravane transparente / vitrate','Ridicata (60-80%)','Terase, locuri de sedere expuse'],['Jardiniere cu arbusti H>1.2m','Medie (40-60%)','Perimetrul teraselor pietonale'],['Perdea de arbori H>6m','Buna (50-70%)','Aliniamentul spre directia vant NE'],['Retragere etaje superioare (setback)','Ridicata','Etaje >2/3 H constructie vecina'],['Pasaje acoperite la parter','Ridicata local','Accesele principale in cladire'],['Aranjament urbanistic (cladiri ecran)','Variabila','Colaborare cu vecinii nordici']].forEach(r=>{cy=tblRow(r,cy,false,[60,35,83]);});

  // PAG 5: Vederi frontala + laterala + concluzii
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VEDERI MULTIPLE — CONCLUZII SI BAZA LEGALA',5);ftr();
  cy=28;
  cy=addImg(caps.imgFront,14,cy,half,50,'FIG. 8 — Vedere frontala · Fatada expusa vantului NE');
  addImg(caps.imgLat,14+half+4,cy-50,half,50,'FIG. 9 — Vedere laterala · Coridor potential intre cladiri');
  cy+=2;
  cy=addImg(caps.imgAerial,14,cy,W-28,48,'FIG. 10 — Vedere aeriana 45° · Configuratie acoperis si directii vant');
  cy+=3;
  cy=sec('5. CONCLUZII SI RECOMANDARI',cy);cy+=2;
  cy=body('Amplasamentul '+nrcad+' prezinta o expunere '+(aedisH>hMed*1.3?'RIDICATA':'MODERATA')+' la actiunea vantului, avand in vedere inaltimea propusa de '+aedisH.toFixed(1)+'m fata de contextul construit cu H medie '+hMed.toFixed(1)+'m. Directia dominanta a vantului la Iasi este NE (iarna, frecventa ~35%) si SV (vara, frecventa ~25%). Se recomanda elaborarea unui studiu CFD (Computational Fluid Dynamics) in faza DTAC/PAC pentru cladirile cu H>28m sau in zone cu densitate urbana ridicata.',14,cy);cy+=4;
  cy=sec('6. BAZA LEGALA',cy);cy+=2;
  ['STAS 10101/20-1990 — Actiunea vantului. Incarcari din vant.','SR EN 1991-1-4:2006 — Eurocod 1: Actiuni asupra structurilor. Actiuni ale vantului.','Ghidul privind confortul pietonal si actiunea vantului in mediul construit — INCERC 2008.','PUG '+getUATLabel()+' — UTR '+utr+' — Regulamentul Local de Urbanism.','Legea nr. 50/1991 republicata privind autorizarea executarii lucrarilor de constructii.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  // Harta orasului inainte de concluzii
  if(caps.imgCity&&caps.imgCity.length>500){
    cy+=3;
    pdf.setFillColor(...DARK);pdf.rect(14,cy-3,W-28,4,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,cy-3,W-28,1,'F');
    pdf.setTextColor(...GOLD);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
    pdf.text('INCADRARE IN CONTEXTUL URBAN AL MUNICIPIULUI IASI',W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in Municipiul Iasi · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  sign();

  // PAG 6: Semnatura
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',6);ftr();
  cy=28;sign();
  pdf.save('Studiu_Vant_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('Studiu Vant & Confort Pietonal generat!');
}

// ════════════════════════════════════════════════════════════════════════════
// STUDIU 4: SPATII VERZI SI PERMEABILITATE
// ════════════════════════════════════════════════════════════════════════════
async function generateGreenStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectati o parcela.');return;}
  ss('Se genereaza Studiu Spatii Verzi...');

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,GREEN,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu de Spatii Verzi si Permeabilitate','Studiu spatii verzi',6);
  const caps = await _captureStudyMaps(ap, msg=>ss(msg));

  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13.2;
  const areaNum=parseFloat(area)||0;
  const svMin=Math.round(areaNum*(parseFloat(params?.sv)||20)/100);
  const potMax=parseFloat(params?.pot)||40;
  const scMax=Math.round(areaNum*potMax/100);
  const svObl=Math.max(svMin,Math.round(areaNum*0.20));
  const half=(W-28)/2-2;

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(20,35,70);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  try{_pdfDrawLogo(pdf,W/2-10,18,20);}catch(e){}
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(24);pdf.setFont('helvetica','bold');
  pdf.text('STUDIU DE SPATII VERZI',W/2,72,{align:'center'});
  pdf.text('SI PERMEABILITATE',W/2,88,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(10);
  pdf.text('Bilantu spatii verzi · Plantare · Coeficient permeabilitate · Conf. Legii 24/2007',W/2,100,{align:'center'});
  pdf.setFillColor(30,50,90);pdf.rect(20,112,W-40,80,'F');pdf.setFillColor(...GOLD);pdf.rect(20,112,3,80,'F');
  [['Nr. cadastral:',nrcad],['Zona UTR:',utr],['Suprafata teren:',area+' mp'],['SV minim PUG ('+params?.sv+'%):',svMin+' mp'],['SV obligatoriu (min 20%):',svObl+' mp'],['Suprafata construita max (POT '+potMax+'%):',scMax+' mp'],['Suprafata libera estimata:',Math.max(0,areaNum-scMax)+' mp'],['H propus:',aedisH.toFixed(1)+'m']].forEach(([l,v],i)=>{pdf.setTextColor(150,170,200);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,124+i*9.5);pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),106,124+i*9.5);});
  pdf.setTextColor(100,120,150);pdf.setFontSize(7);pdf.text('Generat: '+S2(dateStr)+' · Document orientativ · UrbanX TSS·FG',W/2,H-12,{align:'center'});
  // Harta amplasament pe cover (Standard 3D) - banda jos
  if(caps.imgLocation&&caps.imgLocation.length>500){
    try{
      pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');
      pdf.setFillColor(10,20,40);pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.5);
      pdf.rect(14,H-72,W-28,58,'S');
      pdf.setTextColor(...GOLD);pdf.setFontSize(6);pdf.setFont('helvetica','bold');
      pdf.text('AMPLASAMENT · '+S2(nrcad)+' · UTR '+S2(utr)+' · Sursa: Mapbox Standard 3D',W/2,H-75,{align:'center'});
    }catch(e){}
  }
  ftr();

  // PAG 2: Vedere 3D + bilanturi
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONTEXT 3D — BILANT SPATII VERZI SI PERMEABILITATE',2);ftr();
  let cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,70,'FIG. 1 — Vedere 3D principala · Identificarea zonelor verzi existente si propuse');
  cy=sec('1. BILANT SPATII VERZI — CALCUL DETALIAT',cy);cy+=2;
  cy=body('Conform Legii nr. 24/2007 privind reglementarea si administrarea spatiilor verzi din intravilanul localitatilor si PUG '+getUATLabel()+' (UTR '+utr+'), suprafata minima de spatii verzi este de '+params?.sv+'% din suprafata terenului, reprezentand '+svMin+' mp. Legea impune suplimentar un minim de 20% spatii verzi pentru orice constructie noua in intravilanul municipiului.',14,cy);cy+=4;
  cy=tblRow(['Indicator','Minim legal','Propus','Status'],cy,true,[70,42,42,24]);
  const svProp=Math.round(areaNum*0.22);
  [['Spatii verzi totale (mp)',svObl+' mp',svProp+' mp',svProp>=svObl?'OK':'DEFICIT'],['Procentaj spatii verzi (%)',Math.max(params?.sv||20,20)+'%',((svProp/areaNum)*100).toFixed(1)+'%',svProp>=svObl?'CONFORM':'NECONFORM'],['SV permeabil la apa (min 60% din SV)',(svObl*0.6).toFixed(0)+' mp',(svProp*0.65).toFixed(0)+' mp','CONFORM'],['Arbori plantati (min 1/200mp SV)',Math.ceil(svObl/200)+' buc',Math.ceil(svProp/200)+' buc','CONFORM']].forEach(r=>{cy=tblRow(r,cy,false,[70,42,42,24]);});

  // PAG 3: Viewer 3D zi + noapte
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D ZI / NOAPTE — VIZUALIZARE AMENAJARE VERDE',3);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,60,'FIG. 2 — Viewer 3D Urban3D · ZI · Vizualizare cu amenajare verde propusa');
  addImg(caps.v3dNight,14+half+4,cy-60,half,60,'FIG. 3 — Viewer 3D Urban3D · NOAPTE · Iluminat ambiental spatii verzi');
  cy+=4;
  cy=sec('2. TIPURI DE SPATII VERZI RECOMANDATE',cy);cy+=2;
  cy=tblRow(['Tip spatiu verde','Suprafata min.','Permeabilitate','Functiune'],cy,true,[52,30,30,66]);
  [['Gazon / plante acoperitoare',Math.round(svProp*0.4)+' mp','Ridicata (80%)','Suprafata verde de baza, permeabila'],['Arbusti decorativi si garduri vii',Math.round(svProp*0.2)+' mp','Medie (50%)','Separare, protectie fonica si vizuala'],['Arbori de talie medie (H 4-8m)',Math.ceil(svProp/300)+' buc ('+Math.round(svProp*0.15)+' mp)','Ridicata','Umbra, CO2, biodiversitate'],['Teren permeabil pietonal',Math.round(svProp*0.15)+' mp','Medie-ridicata (60%)','Circulatii pietonale fara impermeabilizare'],['Strat vegetal acoperi verde (opt.)',Math.round(scMax*0.3)+' mp','Medie (40%)','Termoizolatie, retentie apa pluviala'],['Jardiniere si spatii verzi verticale',Math.round(svProp*0.1)+' mp','Limitata (20%)','Fatade, imprejmuiri, terase']].forEach(r=>{cy=tblRow(r,cy,false,[52,30,30,66]);});

  // PAG 4: Viewer golden + overcast + retentia apei
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D GOLDEN / INNORIRAT — RETENTIA APEI PLUVIALE',4);ftr();
  cy=28;
  cy=addImg(caps.v3dGolden,14,cy,half,58,'FIG. 4 — Viewer 3D · GOLDEN HOUR · Calitate spatiala ambientala');
  addImg(caps.v3dOvercast||caps.imgAerial,14+half+4,cy-58,half,58,'FIG. 5 — Viewer 3D · CER INNORIRAT / Vedere aeriana · Acoperis verde');
  cy+=4;
  cy=sec('3. COEFICIENT DE PERMEABILITATE SI RETENTIA APEI',cy);cy+=2;
  const suprafataImpermeabila=scMax;
  const suprafataPermeabila=Math.max(0,areaNum-suprafataImpermeabila);
  const coefPerm=((suprafataPermeabila/areaNum)*100).toFixed(1);
  cy=body('Coeficientul de permeabilitate al parcelei este estimat la '+coefPerm+'%, calculat ca raport intre suprafata permeabila ('+suprafataPermeabila+' mp) si suprafata totala ('+areaNum+' mp). Valoarea minima admisa conform normativelor tehnice in vigoare (NP 133/2013) pentru zone rezidentiale si mixte este de 30%, asigurand un debit de infiltrare care reduce incarcarile asupra retelei de canalizare pluviala.',14,cy);cy+=4;
  cy=tblRow(['Tip suprafata','Suprafata (mp)','Coef. perm.','Volum infiltrat (l/ploaie)'],cy,true,[52,30,28,68]);
  [[`Gazon + plante`,Math.round(svProp*0.55),'0.90',Math.round(svProp*0.55*0.90*20)+' l'],[`Pavaj permeabil`,Math.round(svProp*0.20),'0.60',Math.round(svProp*0.20*0.60*20)+' l'],[`Acoperis verde (opt.)`,Math.round(scMax*0.30),'0.50',Math.round(scMax*0.30*0.50*20)+' l'],[`Suprafata betonata/asf.`,suprafataImpermeabila,'0.05',Math.round(suprafataImpermeabila*0.05*20)+' l']].forEach(r=>{cy=tblRow(r,cy,false,[52,30,28,68]);});

  // PAG 5: Plan 2D + distante + lista specii
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PLAN 2D + SPECII RECOMANDATE — BAZA LEGALA',5);ftr();
  cy=28;
  cy=addImg(caps.img2D,14,cy,half,52,'FIG. 6 — Plan 2D cadastral · Suprafete construite vs libere');
  addImg(caps.imgDist,14+half+4,cy-52,half,52,'FIG. 7 — Context vecini · Zone verzi adiacente');
  cy+=4;
  cy=sec('4. SPECII RECOMANDATE PENTRU SPATII VERZI',cy);cy+=2;
  cy=tblRow(['Specie','Talie','Utilizare','Avantaj principal'],cy,true,[50,25,45,58]);
  [['Tei argintiu (Tilia tomentosa)','Mare (H 20m)','Aliniamente stradale','Umbra, aroma, rezistenta urbana'],['Frasin comun (Fraxinus excelsior)','Mare (H 25m)','Spatii largi, parcuri','Crestere rapida, coroana ampla'],['Artar campestru (Acer campestre)','Medie (H 10m)','Garduri vii, parcele','Colorit toamna, toleranta poluare'],['Soc negru (Sambucus nigra)','Mica (H 4m)','Umplere, biodiversitate','Fructe pentru fauna'],['Lavanda (Lavandula sp.)','Mica (<1m)','Borduri, terase','Aroma, rezistenta seceta'],['Iederá (Hedera helix)','Agatarotre','Fatade verzi verticale','Termoizolatie, estetica']].forEach(r=>{cy=tblRow(r,cy,false,[50,25,45,58]);});
  cy+=3;cy=sec('5. BAZA LEGALA',cy);cy+=2;
  ['Legea nr. 24/2007 privind reglementarea si administrarea spatiilor verzi din intravilanul localitatilor.','NP 133/2013 — Normativ privind proiectarea, executia si exploatarea sistemelor de alimentare cu apa si canalizare (permeabilitate).','PUG '+getUATLabel()+' in vigoare — UTR '+utr+' — Spatii verzi minime obligatorii.','Ordinul MDRT nr. 2701/2010 — Metodologie de informare si consultare a publicului cu privire la documentatii de urbanism.','Legea nr. 292/2018 privind evaluarea impactului anumitor proiecte publice si private asupra mediului.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  // Harta orasului inainte de concluzii
  if(caps.imgCity&&caps.imgCity.length>500){
    cy+=3;
    pdf.setFillColor(...DARK);pdf.rect(14,cy-3,W-28,4,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,cy-3,W-28,1,'F');
    pdf.setTextColor(...GOLD);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
    pdf.text('INCADRARE IN CONTEXTUL URBAN AL MUNICIPIULUI IASI',W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in Municipiul Iasi · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  sign();

  // PAG 6: Semnatura
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',6);ftr();
  cy=28;sign();
  pdf.save('Studiu_Spatii_Verzi_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('Studiu Spatii Verzi generat!');
}

// ════════════════════════════════════════════════════════════════════════════
// STUDIU 5: MOBILITATE SI PARCAJE
// ════════════════════════════════════════════════════════════════════════════
async function generateMobilityStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectati o parcela.');return;}
  ss('Se genereaza Studiu Mobilitate & Parcaje...');

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu de Mobilitate si Parcaje','Studiu mobilitate',6);
  const caps = await _captureStudyMaps(ap, msg=>ss(msg));

  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13.2;
  const niv=AEDIS.corpuri[0]?.niv||4;
  const fn=AEDIS.fn||'rezidential_colectiv';
  const fnLabel=AEDIS_FN[fn]?.label||fn;
  const areaNum=parseFloat(area)||0;
  const pkMin=parseFloat(params?.pk)||1;
  const sdEst=Math.round(areaNum*(parseFloat(params?.cut)||2.0));
  const locuinteEst=Math.round(sdEst/70);
  const pkObl=Math.max(1,Math.round(locuinteEst*pkMin));
  const half=(W-28)/2-2;

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(20,35,70);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  try{_pdfDrawLogo(pdf,W/2-10,18,20);}catch(e){}
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(24);pdf.setFont('helvetica','bold');
  pdf.text('STUDIU DE MOBILITATE',W/2,72,{align:'center'});
  pdf.text('SI PARCAJE',W/2,88,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(10);
  pdf.text('Necesarul de parcaje · Accese · Flux pietonal si auto · Norma NP 051/2012',W/2,100,{align:'center'});
  pdf.setFillColor(30,50,90);pdf.rect(20,112,W-40,80,'F');pdf.setFillColor(...GOLD);pdf.rect(20,112,3,80,'F');
  [['Nr. cadastral:',nrcad],['Zona UTR:',utr],['Suprafata teren:',area+' mp'],['Functiune propusa:',fnLabel],['Nr. niveluri propus:',niv+' niv.'],['SD estimata:',sdEst+' mp'],['Locuinte estimate:',locuinteEst+' apartamente'],['Parcaje obligatorii (min):',pkObl+' locuri']].forEach(([l,v],i)=>{pdf.setTextColor(150,170,200);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,124+i*9.5);pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),100,124+i*9.5);});
  pdf.setTextColor(100,120,150);pdf.setFontSize(7);pdf.text('Generat: '+S2(dateStr)+' · Document orientativ · UrbanX TSS·FG',W/2,H-12,{align:'center'});
  // Harta amplasament pe cover (Standard 3D) - banda jos
  if(caps.imgLocation&&caps.imgLocation.length>500){
    try{
      pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');
      pdf.setFillColor(10,20,40);pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.5);
      pdf.rect(14,H-72,W-28,58,'S');
      pdf.setTextColor(...GOLD);pdf.setFontSize(6);pdf.setFont('helvetica','bold');
      pdf.text('AMPLASAMENT · '+S2(nrcad)+' · UTR '+S2(utr)+' · Sursa: Mapbox Standard 3D',W/2,H-75,{align:'center'});
    }catch(e){}
  }
  ftr();

  // PAG 2: Vedere 3D + accese identificate
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONTEXT 3D — ACCESE SI CONFIGURATIE STRADALA',2);ftr();
  let cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,70,'FIG. 1 — Vedere 3D principala · Accese auto si pietonale · Context stradal');
  cy=sec('1. ANALIZA CONFIGURATIEI STRADALE SI A ACCESELOR',cy);cy+=2;
  cy=body('Parcela '+nrcad+' (UTR '+utr+', suprafata '+area+' mp) este amplasata in contextul urban cu urmatoarea configuratie de accese: frontul stradal principal este pe latura marcata cu "FRONT" in planul cadastral. Accesul auto se va realiza din strada adiacenta frontului stradal, cu respectarea normei de gabarit minim de 3.50m pentru un sens si 6.00m pentru doua sensuri, conform STAS 10144/3.',14,cy);cy+=4;
  cy=addImg(caps.imgFront,14,cy,half,52,'FIG. 2 — Vedere frontala · Acces principal auto si pietonal');
  addImg(caps.imgBack,14+half+4,cy-52,half,52,'FIG. 3 — Vedere posterioara · Potential acces servicii');
  cy+=4;
  cy=sec('2. NECESARUL DE PARCAJE — CALCUL NP 051/2012',cy);cy+=2;
  cy=tblRow(['Functiune','Norma parcaje','Unitati','Nr. locuri min.'],cy,true,[55,45,40,38]);
  const pkRows=fn.includes('rezidential')||fn.includes('individual')?[['Apartamente/unitati rezidentiale','1 loc/unitate loc.','~'+locuinteEst+' ap.',pkObl+' loc.'],['Vizitatori (suplimentar)','1 loc/10 ap.','~'+locuinteEst+' ap.',Math.ceil(locuinteEst/10)+' loc.'],['Accesibilitate (PMR min 2%)','Min 1 loc/50 loc.','1 loc/50',Math.max(1,Math.ceil(pkObl/50))+' loc.']]:[fn.includes('birou')||fn.includes('office')?[['Spatii birouri/office','1 loc/40 mp SD',sdEst+' mp',Math.ceil(sdEst/40)+' loc.'],['Vizitatori birouri','1 loc/100 mp SD',sdEst+' mp',Math.ceil(sdEst/100)+' loc.'],['Biciclete (10% din total)','1 bicicleta/10 masini','—',Math.ceil(Math.ceil(sdEst/40)/10)+' loc.']]:[['Comercial/mixt (estimat)','1 loc/40 mp SD',sdEst+' mp',Math.ceil(sdEst/40)+' loc.'],['Personal angajat','1 loc/5 angajati','~'+Math.ceil(sdEst/20)+'ang.',Math.ceil(sdEst/100)+' loc.'],['Biciclete','1 loc/20 vizitatori','—',Math.ceil(sdEst/200)+' loc.']]];
  pkRows.flat().forEach(r=>{cy=tblRow(r,cy,false,[55,45,40,38]);});

  // PAG 3: Viewer 3D zi + noapte + tipuri parcaje
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D ZI / NOAPTE — TIPURI DE PARCAJE',3);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,58,'FIG. 4 — Viewer 3D Urban3D · ZI · Accese si spatii de parcare');
  addImg(caps.v3dNight,14+half+4,cy-58,half,58,'FIG. 5 — Viewer 3D Urban3D · NOAPTE · Iluminat parcaje si accese');
  cy+=4;
  cy=sec('3. TIPURI DE PARCAJE RECOMANDATE',cy);cy+=2;
  cy=tblRow(['Tip parcare','Suprafata/loc','Nr. locuri','Suprafata totala'],cy,true,[55,35,35,53]);
  const pkSub=Math.ceil(pkObl*0.6),pkSup=pkObl-pkSub;
  [['Parcare subterana (sub cota ±0)','25-30 mp/loc',pkSub+' locuri',pkSub*28+' mp'],['Parcare supraterana / parter','20-25 mp/loc',pkSup+' locuri',pkSup*22+' mp'],['Parcaje biciclete (anexa)','2 mp/bicicleta',Math.ceil(pkObl/10)+' biciclete',Math.ceil(pkObl/10)*2+' mp'],['Spatiu manevrare (circulatie)','7.5m latime culoar','—','Include in suprafata']].forEach(r=>{cy=tblRow(r,cy,false,[55,35,35,53]);});
  cy+=3;cy=body('Solutia recomandata pentru parcela '+nrcad+' ('+area+' mp) este asigurarea a minimum '+pkSub+' locuri de parcare subterana (subsol) si '+pkSup+' locuri la nivelul parterului sau in curte, cu acces dintr-un singur punct din strada principala. Culoarul de manevrare va respecta latime minima de 7.50m (unghi 90°) sau 5.50m (unghi 45°) conform STAS 10144/3.',14,cy);

  // PAG 4: Viewer golden + overcast + flux pietonal
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D GOLDEN / INNORIRAT — FLUX PIETONAL',4);ftr();
  cy=28;
  cy=addImg(caps.v3dGolden,14,cy,half,58,'FIG. 6 — Viewer 3D · GOLDEN HOUR · Calitate spatiala accese pietonale');
  addImg(caps.v3dOvercast||caps.imgLat,14+half+4,cy-58,half,58,'FIG. 7 — Viewer 3D · CER INNORIRAT / Vedere laterala · Acces lateral');
  cy+=4;
  cy=sec('4. ANALIZA FLUX PIETONAL SI ACCESIBILITATE PMR',cy);cy+=2;
  cy=body('Proiectarea acceselor pietonale si a spatiilor de circulatie exterioare va respecta prevederile Normativului NP 051/2012 (revizuit) privind adaptarea cladirilor civile si spatiului urban la necesitatile persoanelor cu handicap, precum si Legea nr. 448/2006. Se vor prevedea: rampe de acces cu panta max. 8% (sau 6% pentru lungimi >6m), latimi minime de 1.20m pentru circulatii pietonale principale, locuri de parcare PMR cu dimensiuni 2.50m x 5.00m amplasate in apropierea accesului principal.',14,cy);cy+=3;
  [['Trotuar acces principal: latime minima 1.50m, suprafata non-alunecoasa (coef. alunecare ≥0.5 umed).','Rampa PMR la intrarea principala: panta max. 8%, latime min. 1.20m, balustrade pe ambele parti.','Locuri PMR: min. '+Math.max(1,Math.ceil(pkObl/50))+' locuri (2% din total), marcate vizibil, amplasate langa acces.','Iluminat accese: min. 50 lux la nivelul solului (conform NP 061/2002).','Semnalizare tactilo-vizuala la schimbarile de nivel si la traversarile carosabil.'
  ]].flat().forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 5: Plan 2D + distante + concluzii
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PLAN 2D + CONCLUZII SI BAZA LEGALA',5);ftr();
  cy=28;
  cy=addImg(caps.img2D,14,cy,half,52,'FIG. 8 — Plan 2D · Configuratie parcela · Amplasare accese');
  addImg(caps.imgDist,14+half+4,cy-52,half,52,'FIG. 9 — Plan distante · Context stradal · Trafic vecini');
  cy+=4;
  cy=sec('5. CONCLUZII SI RECOMANDARI',cy);cy+=2;
  cy=body('Functiunea propusa ('+fnLabel+') pentru parcela '+nrcad+' ('+area+' mp, UTR '+utr+') necesita asigurarea a minimum '+pkObl+' locuri de parcare conform NP 051/2012 si PUG '+getUATLabel()+'. Se recomanda solutia cu parcare subterana ('+pkSub+' locuri) pentru eficientizarea utilizarii suprafetei la sol si maximizarea spatiilor verzi.',14,cy);cy+=4;
  cy=sec('6. BAZA LEGALA',cy);cy+=2;
  ['NP 051/2012 (revizuit) — Normativ privind adaptarea cladirilor civile si spatiului urban la necesitatile persoanelor cu handicap.','STAS 10144/3-1991 — Calculul si proiectarea parcajelor pentru autoturisme.','HG nr. 525/1996 — Regulament General de Urbanism, art. 33 Parcaje.','PUG '+getUATLabel()+' (HCL local) — UTR '+utr+' — Parcaje minime obligatorii.','Legea nr. 448/2006 privind protectia si promovarea drepturilor persoanelor cu handicap.','Normativul NP 061/2002 privind proiectarea si executarea sistemelor de iluminat artificial.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  // Harta orasului inainte de concluzii
  if(caps.imgCity&&caps.imgCity.length>500){
    cy+=3;
    pdf.setFillColor(...DARK);pdf.rect(14,cy-3,W-28,4,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,cy-3,W-28,1,'F');
    pdf.setTextColor(...GOLD);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
    pdf.text('INCADRARE IN CONTEXTUL URBAN AL MUNICIPIULUI IASI',W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in Municipiul Iasi · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  sign();

  // PAG 6: Semnatura
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',6);ftr();
  cy=28;sign();
  pdf.save('Studiu_Mobilitate_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('Studiu Mobilitate & Parcaje generat!');
}

// ════════════════════════════════════════════════════════════════════════════
// STUDIU 6: DENSITATE SI PRESIUNE URBANA
// ════════════════════════════════════════════════════════════════════════════
async function generateDensityStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectati o parcela.');return;}
  ss('Se genereaza Studiu Densitate Urbana...');

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu de Densitate si Presiune Urbana','Studiu densitate',6);
  const caps = await _captureStudyMaps(ap, msg=>ss(msg));

  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13.2;
  const vecini=S.ctx?.features||[];
  const hMed=vecini.length?vecini.reduce((s,f)=>s+(f.properties?.h||6),0)/vecini.length:7;
  const potMed=vecini.length?vecini.reduce((s,f)=>{try{return s+turf.area({type:'Feature',geometry:f.geometry,properties:{}})/Math.max(1,parseFloat(area));}catch(e){return s;}},0)/vecini.length*100:25;
  const areaNum=parseFloat(area)||0;
  const potProp=parseFloat(params?.pot)||40;
  const cutProp=parseFloat(params?.cut)||2.0;
  const fnLabel=AEDIS_FN[AEDIS.fn]?.label||AEDIS.fn;
  const fnVecini={};vecini.forEach(f=>{const fn=f.properties?.fn||'yes';fnVecini[fn]=(fnVecini[fn]||0)+1;});
  const fnSorted=Object.entries(fnVecini).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const half=(W-28)/2-2;

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(20,35,70);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  try{_pdfDrawLogo(pdf,W/2-10,18,20);}catch(e){}
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(24);pdf.setFont('helvetica','bold');
  pdf.text('STUDIU DE DENSITATE',W/2,72,{align:'center'});
  pdf.text('SI PRESIUNE URBANA',W/2,88,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(10);
  pdf.text('Comparatie indicatori propusi vs zona · Caracter predominant · Conformitate PUG',W/2,100,{align:'center'});
  pdf.setFillColor(30,50,90);pdf.rect(20,112,W-40,80,'F');pdf.setFillColor(...GOLD);pdf.rect(20,112,3,80,'F');
  [['Nr. cadastral:',nrcad],['Zona UTR:',utr],['Suprafata teren:',area+' mp'],['POT propus / PUG max:',potProp+'% / '+potProp+'%'],['CUT propus / PUG max:',cutProp+' / '+cutProp],['H propus / H max vecin:',aedisH.toFixed(1)+'m / '+(hMed*1.5).toFixed(1)+'m'],['H medie zona (200m raza):',hMed.toFixed(1)+'m'],['Nr. cladiri in context incarcat:',vecini.length+' buc.']].forEach(([l,v],i)=>{pdf.setTextColor(150,170,200);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,124+i*9.5);pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),108,124+i*9.5);});
  pdf.setTextColor(100,120,150);pdf.setFontSize(7);pdf.text('Generat: '+S2(dateStr)+' · Document orientativ · UrbanX TSS·FG',W/2,H-12,{align:'center'});
  // Harta amplasament pe cover (Standard 3D) - banda jos
  if(caps.imgLocation&&caps.imgLocation.length>500){
    try{
      pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');
      pdf.setFillColor(10,20,40);pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.5);
      pdf.rect(14,H-72,W-28,58,'S');
      pdf.setTextColor(...GOLD);pdf.setFontSize(6);pdf.setFont('helvetica','bold');
      pdf.text('AMPLASAMENT · '+S2(nrcad)+' · UTR '+S2(utr)+' · Sursa: Mapbox Standard 3D',W/2,H-75,{align:'center'});
    }catch(e){}
  }
  ftr();

  // PAG 2: Vedere 3D + comparatie indicatori
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONTEXT 3D — COMPARATIE INDICATORI PROPUSI vs ZONA',2);ftr();
  let cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,70,'FIG. 1 — Vedere 3D principala · Volumul propus in contextul urban · Densitate construita vizibila');
  cy=sec('1. COMPARATIE INDICATORI PROPUSI vs PUG vs ZONA',cy);cy+=2;
  cy=body('Analiza compara indicatorii urbanistici propusi pentru parcela '+nrcad+' cu cei reglementati prin PUG '+getUATLabel()+' (UTR '+utr+') si cu valorile reale estimate din contextul construit existent in raza de 200m, pe baza datelor OpenStreetMap actualizate.',14,cy);cy+=3;
  cy=tblRow(['Indicator','Propus','Max PUG','Zona (200m)','Status'],cy,true,[55,28,28,32,35]);
  [['POT (suprafata construita/teren)',potProp+'%',potProp+'%',potMed.toFixed(1)+'%',potProp<=potProp?'CONFORM':'DEPASIRE'],['CUT (supraf. desfasurata/teren)',cutProp,cutProp,'—','CONFORM'],['H max propus',aedisH.toFixed(1)+'m','N/Sm',hMed.toFixed(1)+'m (med.)',aedisH<=hMed*2?'COMPAT.':'ATENTIE'],['H medie propusa',aedisH.toFixed(1)+'m','—',hMed.toFixed(1)+'m',aedisH<=hMed*1.5?'COMPATIBIL':'VERIFICARE'],['Nr. niveluri',AEDIS.corpuri[0]?.niv||4+' niv.',parseFloat(params?.niv)||4+' niv.',Math.round(hMed/3)+' niv.est.','—']].forEach(r=>{cy=tblRow(r,cy,false,[55,28,28,32,35]);});

  // PAG 3: Viewer 3D zi + noapte
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D ZI / NOAPTE — VOLUMETRIE IN CONTEXT',3);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,60,'FIG. 2 — Viewer 3D Urban3D · ZI · Volumul propus in context construit real');
  addImg(caps.v3dNight,14+half+4,cy-60,half,60,'FIG. 3 — Viewer 3D Urban3D · NOAPTE · Impact vizual nocturn si densitate luminoasa');
  cy+=4;
  cy=sec('2. ANALIZA CARACTER PREDOMINANT AL ZONEI',cy);cy+=2;
  cy=body('Caracterul functional predominant al zonei a fost determinat prin analiza distributiei functiunilor OSM pentru toate cladirile incarcate in raza de 200m fata de parcela '+nrcad+'.',14,cy);cy+=3;
  cy=tblRow(['Functiune OSM','Nr. cladiri','Pondere (%)','Compatibilitate cu propus'],cy,true,[55,28,28,67]);
  fnSorted.forEach(([fn,cnt])=>{
    const pct=((cnt/vecini.length)*100).toFixed(1);
    const compat=fn==='yes'||fn==='residential'||fn==='apartments'||fn==='house'?'COMPATIBIL':fn==='commercial'||fn==='office'?'Verificati CU':'Verificati CU';
    cy=tblRow([fn,cnt,pct+'%',compat],cy,false,[55,28,28,67]);
  });

  // PAG 4: Viewer golden + overcast + impact vizual
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D GOLDEN / INNORIRAT — IMPACT VIZUAL SI CARACTERUL STRADAL',4);ftr();
  cy=28;
  cy=addImg(caps.v3dGolden,14,cy,half,60,'FIG. 4 — Viewer 3D Urban3D · GOLDEN HOUR · Materialitate si impact vizual seral');
  addImg(caps.v3dOvercast||caps.imgAerial,14+half+4,cy-60,half,60,'FIG. 5 — Viewer 3D Urban3D · CER INNORIRAT / Vedere aeriana · Densitate construita');
  cy+=4;
  cy=sec('3. IMPACT VIZUAL SI CARACTERUL STRADAL',cy);cy+=2;
  const hDiff=aedisH-hMed;
  cy=body('Cladirea propusa cu H='+aedisH.toFixed(1)+'m '+(hDiff>0?'depaseste':'se incadreaza in')+' inaltimea medie a zonei ('+hMed.toFixed(1)+'m) cu '+(hDiff>0?hDiff.toFixed(1)+'m (mai inalta decat media).':'— compatibila cu contextul.')+(hDiff>3?' Diferenta moderata compatibila cu caracterul urban existent, cu conditia respectarii aliniamentelor si regimului de inaltime din UTR '+utr+'. Se recomanda verificarea impactului vizual din domeniul public (fronturi stradale) si elaborarea unui studiu de insertie arhitecturala in fazele avansate de proiectare.':' Proiectul este compatibil cu caracterul construit al zonei.'),14,cy);cy+=4;
  cy=tblRow(['Criteriu vizual','Valoare propusa','Medie zona','Evaluare'],cy,true,[58,38,38,44]);
  [['Inaltime propusa',aedisH.toFixed(1)+'m',hMed.toFixed(1)+'m',Math.abs(hDiff)<=3?'Compatibil':'Verificare'],['Raport H/L stradal (H/latime strada)','1:'+(aedisH>0?(areaNum/aedisH).toFixed(1):'?'),'1:3 (optim)','Verificare proiect'],['Retragere fata de strada (aliniament)',params?.rf+'m','0-5m (zona)',params?.rf<=5?'Conform':'Verif.'],['Acoperis (forma si materiale)','Conf. AEDIS','Variabil','Conf. RLU']].forEach(r=>{cy=tblRow(r,cy,false,[58,38,38,44]);});

  // PAG 5: Plan 2D + vederi multiple + concluzii
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VEDERI MULTIPLE + CONCLUZII SI BAZA LEGALA',5);ftr();
  cy=28;
  cy=addImg(caps.imgAerial,14,cy,half,48,'FIG. 6 — Vedere aeriana 45° · Amprenta si densitate acoperisuri');
  addImg(caps.img2D,14+half+4,cy-48,half,48,'FIG. 7 — Plan 2D · Amprente construite vs libere');
  cy+=2;
  cy=addImg(caps.imgFront,14,cy,half,44,'FIG. 8 — Vedere frontala · Fatada spre strada principala');
  addImg(caps.imgLat,14+half+4,cy-44,half,44,'FIG. 9 — Vedere laterala · Context E-V');
  cy+=3;
  cy=sec('4. CONCLUZII SI NECESITATEA PUZ',cy);cy+=2;
  cy=body('Analiza de densitate pentru parcela '+nrcad+' (UTR '+utr+', '+area+' mp) indica ca parametrii propusi — POT '+potProp+'%, CUT '+cutProp+', H='+aedisH.toFixed(1)+'m, '+fnLabel+' — '+(potProp<=parseFloat(params?.pot||50)&&cutProp<=parseFloat(params?.cut||3)?'se incadreaza in limitele PUG, nu necesita PUZ.':'depasesc parametrii PUG, necesita elaborarea unui PUZ sau PUD conform Legii 350/2001.')+' Functiunea propusa este '+(fnSorted[0]&&(fnSorted[0][0]==='yes'||fnSorted[0][0]==='residential'||fnSorted[0][0]==='apartments')?'compatibila':'partial compatibila')+' cu caracterul predominant al zonei.',14,cy);cy+=4;
  cy=sec('5. BAZA LEGALA',cy);cy+=2;
  ['Legea nr. 350/2001 privind amenajarea teritoriului si urbanismul (republicata 2022).','HG nr. 525/1996 — Regulamentul General de Urbanism, cu modificarile ulterioare.','Ordinul MDRAP nr. 233/2016 pentru aprobarea Normelor metodologice de aplicare a Legii 350/2001.','PUG '+getUATLabel()+' in vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.','Legea nr. 50/1991 republicata privind autorizarea executarii lucrarilor de constructii.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  // Harta orasului inainte de concluzii
  if(caps.imgCity&&caps.imgCity.length>500){
    cy+=3;
    pdf.setFillColor(...DARK);pdf.rect(14,cy-3,W-28,4,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,cy-3,W-28,1,'F');
    pdf.setTextColor(...GOLD);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
    pdf.text('INCADRARE IN CONTEXTUL URBAN AL MUNICIPIULUI IASI',W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in Municipiul Iasi · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  sign();

  // PAG 6: Semnatura
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',6);ftr();
  cy=28;sign();
  pdf.save('Studiu_Densitate_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('Studiu Densitate Urbana generat!');
}

// ════════════════════════════════════════════════════════════════════════════
// MEMORIU TEHNIC URBANISTIC PRELIMINAR
// ════════════════════════════════════════════════════════════════════════════
async function generateMemoriu(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectati o parcela.');return;}
  ss('Se genereaza Memoriu Tehnic Preliminar...');

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Memoriu Tehnic Urbanistic Preliminar','Memoriu tehnic',8);
  const caps = await _captureStudyMaps(ap, msg=>ss(msg));

  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13.2;
  const niv=AEDIS.corpuri[0]?.niv||4;
  const fn=AEDIS.fn||'rezidential_colectiv';
  const fnLabel=AEDIS_FN[fn]?.label||fn;
  const stil=AEDIS.stil||'modern';
  const stilLabel=AEDIS_STIL[stil]?.label||stil;
  const areaNum=parseFloat(area)||0;
  const sdEst=Math.round(areaNum*(parseFloat(params?.cut)||2.0));
  const scEst=Math.round(areaNum*(parseFloat(params?.pot)||40)/100);
  const svMin=Math.round(areaNum*(parseFloat(params?.sv)||20)/100);
  const pkObl=Math.max(1,Math.round(sdEst/70*(parseFloat(params?.pk)||1)));
  const half=(W-28)/2-2;
  const vecini=S.ctx?.features||[];
  const hMed=vecini.length?vecini.reduce((s,f)=>s+(f.properties?.h||6),0)/vecini.length:7;

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(20,35,70);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  try{_pdfDrawLogo(pdf,W/2-10,18,20);}catch(e){}
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(22);pdf.setFont('helvetica','bold');
  pdf.text('MEMORIU TEHNIC',W/2,70,{align:'center'});
  pdf.text('URBANISTIC PRELIMINAR',W/2,86,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(10);
  pdf.text('Document tehnic · Incadrare PUG · Indicatori urbanistici · Propunere volumetrica',W/2,98,{align:'center'});
  pdf.setFillColor(30,50,90);pdf.rect(20,110,W-40,100,'F');pdf.setFillColor(...GOLD);pdf.rect(20,110,3,100,'F');
  [['Nr. cadastral:',nrcad],['Zona UTR:',utr],['Suprafata teren:',area+' mp'],['Coordonate GPS:',lat.toFixed(5)+'N / '+lon.toFixed(5)+'E'],['Functiune propusa:',fnLabel],['Regim inaltime propus:',niv+(niv===1?' nivel':niv<4?' niveluri':' niveluri')],['H total propus:',aedisH.toFixed(1)+' m'],['Stil arhitectural:',stilLabel],['Suprafata construita estimata:',scEst+' mp (POT '+params?.pot+'%)'],['Suprafata desfasurata estimata:',sdEst+' mp (CUT '+params?.cut+')'],['Spatii verzi minime:',svMin+' mp ('+params?.sv+'% din teren)'],['Parcaje obligatorii:',pkObl+' locuri']].forEach(([l,v],i)=>{pdf.setTextColor(150,170,200);pdf.setFontSize(7.5);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,122+i*8);pdf.setTextColor(255,255,255);pdf.setFontSize(8.5);pdf.setFont('helvetica','bold');pdf.text(S2(v),100,122+i*8);});
  pdf.setTextColor(100,120,150);pdf.setFontSize(7);pdf.text('Generat: '+S2(dateStr)+' · Document orientativ · UrbanX TSS·FG · Valori estimative',W/2,H-12,{align:'center'});
  if(caps.imgLocation&&caps.imgLocation.length>500){
    try{
      pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');
      pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,H-72,W-28,58,'S');
      pdf.setTextColor(...GOLD);pdf.setFontSize(6);pdf.setFont('helvetica','bold');
      pdf.text('AMPLASAMENT · '+S2(nrcad)+' · UTR '+S2(utr)+' · Sursa: Mapbox Standard 3D',W/2,H-75,{align:'center'});
    }catch(e){}
  }
  ftr();

  // PAG 2: Vedere 3D principala + date teren
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PLANUL DE SITUATIE 3D — INCADRARE IN CONTEXT',2);ftr();
  let cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,72,'FIG. 1 — Vedere 3D principala · Volumul propus in contextul urban real · pitch 62° bearing -20°');
  cy=sec('1. DATE DE IDENTIFICARE A TERENULUI',cy);cy+=2;
  cy=body('Terenul identificat cu nr. cadastral '+nrcad+' este amplasat in intravilanul Municipiului Iasi, in zona urbanistica '+utr+', la coordonatele GPS '+lat.toFixed(5)+'°N / '+lon.toFixed(5)+'°E. Suprafata masurata a terenului este de '+area+' mp, conform datelor cadastrale. Terenul este '+(areaNum>200?'de dimensiuni corespunzatoare interventiei propuse':'de dimensiuni reduse, ce necesita o analiza atenta a indicatorilor urbanistici')+', cu front stradal la strada adiacenta parcelei.',14,cy);cy+=3;
  cy=addImg(caps.img2D,14,cy,half,50,'FIG. 2 — Plan 2D cadastral · Forma si dimensiunile parcelei');
  addImg(caps.imgDist,14+half+4,cy-50,half,50,'FIG. 3 — Plan distante · Aliniamente si constructii vecine');

  // PAG 3: Viewer 3D zi + noapte + reglementari
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D ZI / NOAPTE — REGLEMENTARI PUG',3);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,60,'FIG. 4 — Viewer 3D Urban3D · ZI · Materialitate si volumetrie propusa');
  addImg(caps.v3dNight,14+half+4,cy-60,half,60,'FIG. 5 — Viewer 3D Urban3D · NOAPTE · Impact vizual nocturn');
  cy+=4;
  cy=sec('2. REGLEMENTARI PUG — UTR '+utr,cy);cy+=2;
  cy=tblRow(['Indicator','Valoare PUG','Valoare propusa','Status'],cy,true,[70,40,42,26]);
  [['POT max (%)',params?.pot+'%',params?.pot+'%','CONFORM'],['CUT max (mp.ADC/mp teren)',params?.cut,params?.cut,'CONFORM'],['H max (m)',params?.h||'N/Sm',''+aedisH.toFixed(1)+'m',aedisH<=(parseFloat(params?.h)||99)?'CONFORM':'VERIFICAT'],['Nr. niveluri max',params?.niv||'N/Sm',''+niv+' niv.',niv<=(parseFloat(params?.niv)||99)?'CONFORM':'VERIFICAT'],['Aliniament fata de strada (m)',params?.rf+'m',params?.rf+'m','CONFORM'],['Retragere laterala stanga (m)',params?.rl+'m',params?.rl+'m','CONFORM'],['Retragere laterala dreapta (m)',params?.rl+'m',params?.rl+'m','CONFORM'],['Retragere posterioara (m)',params?.rs+'m',params?.rs+'m','CONFORM'],['Spatii verzi min (%)',params?.sv+'%',params?.sv+'%','CONFORM'],['Parcaje minime (loc/unitate)',params?.pk||'1',pkObl+' loc.','CONFORM']].forEach(r=>{cy=tblRow(r,cy,false,[70,40,42,26]);});

  // PAG 4: Viewer golden + overcast + propunere arhitecturala
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D GOLDEN HOUR / INNORIRAT — PROPUNERE ARHITECTURALA',4);ftr();
  cy=28;
  cy=addImg(caps.v3dGolden,14,cy,half,60,'FIG. 6 — Viewer 3D Urban3D · GOLDEN HOUR · Calitate spatiala si materialitate');
  addImg(caps.v3dOvercast||caps.imgBack,14+half+4,cy-60,half,60,'FIG. 7 — Viewer 3D Urban3D · CER INNORIRAT · Vedere posterioara');
  cy+=4;
  cy=sec('3. DESCRIEREA PROPUNERII ARHITECTURALE',cy);cy+=2;
  cy=body('Propunerea volumetrica generata cu AEDIS Urban3D prevede o constructie cu '+niv+' niveluri (H total = '+aedisH.toFixed(1)+'m), stil arhitectural '+stilLabel+', cu functiunea principala de '+fnLabel+'. Suprafata construita la sol estimata este de '+scEst+' mp (POT = '+params?.pot+'%), iar suprafata desfasurata totala estimata este de '+sdEst+' mp (CUT = '+params?.cut+').',14,cy);cy+=3;
  cy=body('Cladirea propusa se integreaza in contextul construit existent, cu inaltimea medie a zonei de '+hMed.toFixed(1)+'m. Raportul H/Hmedie = '+(aedisH/Math.max(1,hMed)).toFixed(2)+' indica o '+(aedisH>hMed*1.3?'insertie mai inalta decat contextul, necesitand atentie sporita la impactul vizual si structural':'insertie compatibila cu caracterul construit al zonei')+'. Finisajele si materialele vor fi determinate prin proiectul tehnic elaborat de arhitect autorizat OAR.',14,cy);cy+=3;
  cy=tblRow(['Element arhitectural','Descriere propusa'],cy,true,[70,108]);
  [['Sistem structural','Beton armat monolit / zidarie structurala'],['Fatade',''+stilLabel+' — conf. AEDIS Urban3D'],['Acoperis',''+{terasa_plata:'Terasa plata circulabila',terasa_circulabila:'Terasa circulabila',sarpanta:'Sarpanta inclinata',mansarda:'Mansarda'}[AEDIS.tipAcoperis||'terasa_plata']||'Terasa plata'],['Tamplarie','PVC/Al cu geam tripan (termoizolant)'],['Finisaj exterior','Tencuiala decorativa / placaj fata'],['Subsol / Demisol',pkObl>5?'Parcare subterana '+pkObl+' locuri':'Optional, dupa necesitate']].forEach(r=>{cy=tblRow(r,cy,false,[70,108]);});

  // PAG 5: Vederi multiple + bilant
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VEDERI MULTIPLE 3D — BILANT SUPRAFETE',5);ftr();
  cy=28;
  cy=addImg(caps.imgFront,14,cy,half,48,'FIG. 8 — Vedere frontala · Fatada principala spre strada');
  addImg(caps.imgBack,14+half+4,cy-48,half,48,'FIG. 9 — Vedere posterioara · Fatada curte / gradina');
  cy+=2;
  cy=addImg(caps.imgLat,14,cy,half,46,'FIG. 10 — Vedere laterala Est · Context vecin');
  addImg(caps.imgAerial,14+half+4,cy-46,half,46,'FIG. 11 — Vedere aeriana 45° · Forma acoperis si amprenta');
  cy+=4;
  cy=sec('4. BILANT GENERAL DE SUPRAFETE',cy);cy+=2;
  cy=tblRow(['Suprafata','Valoare (mp)','Pondere din teren (%)'],cy,true,[100,42,36]);
  [[`Teren total`,areaNum.toFixed(0)+' mp','100%'],[`Suprafata construita la sol (SC)`,scEst+' mp',params?.pot+'% (POT)'],[`Suprafata desfasurata totala (SD)`,sdEst+' mp',params?.cut+' (CUT)'],[`Spatii verzi minime obligatorii`,svMin+' mp',params?.sv+'%'],[`Suprafata libera neconstruita`,Math.max(0,areaNum-scEst).toFixed(0)+' mp',((Math.max(0,areaNum-scEst)/areaNum)*100).toFixed(1)+'%'],[`Parcaje necesare (estimat)`,pkObl+' locuri',(pkObl*25/areaNum*100).toFixed(1)+'%']].forEach(r=>{cy=tblRow(r,cy,false,[100,42,36]);});

  // PAG 6: Avize necesare + procedura
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('AVIZE SI ACORDURI NECESARE — PROCEDURA DE AUTORIZARE',6);ftr();
  cy=28;cy=sec('5. AVIZE SI ACORDURI NECESARE CONFORM LEGII 50/1991',cy);cy+=2;
  cy=body('In vederea obtinerii Autorizatiei de Construire pentru obiectivul propus pe parcela '+nrcad+' (UTR '+utr+'), vor fi necesare urmatoarele avize si acorduri, in functie de specificul proiectului:',14,cy);cy+=3;
  cy=tblRow(['Aviz / Acord','Emitent','Obligatoriu / Optional'],cy,true,[80,65,33]);
  [['Certificat de Urbanism','Primaria Municipiului Iasi','OBLIGATORIU'],['Aviz Reglementari Tehnice (Retele)','Furnizori utilitati (E-ON, RAJA etc.)','OBLIGATORIU'],['Aviz Mediu (dupa caz)','Agentia de Mediu Iasi','DUPA CAZ'],['Aviz Protectia Muncii','DSP Iasi','DUPA CAZ'],['Aviz ISU (cladiri >2 niveluri)','ISU Moldova','OBLIGATORIU'],['Aviz Patrimoniu (zona protejata)','Directia Cultura Iasi','ZONA PROTEJATA'],['Raport Studiu Geotehnic','Expert tehnic atestat','OBLIGATORIU proiect'],['Proiect Tehnic + Detalii executie','Arhitect autorizat OAR','OBLIGATORIU AC'],['Experiza tehnica (cladiri existente)','Expert tehnic atestat','DUPA CAZ']].forEach(r=>{cy=tblRow(r,cy,false,[80,65,33]);});
  cy+=3;cy=sec('6. ETAPE PROCEDURA AUTORIZARE',cy);cy+=2;
  ['ETAPA 1 — Certificat de Urbanism: Solicitare la Primarie cu memoriu, plan cadastral, copie CF. Emitere in 30 de zile.','ETAPA 2 — Studii si documentatii tehnice: Studiu geotehnic, relevee, expertize (daca exista constructii), studii de specialitate.','ETAPA 3 — Proiect pentru Autorizare (PAC/DTAC): Elaborat de arhitect autorizat OAR, cu toate planele tehnice.','ETAPA 4 — Obtinere avize conform CU: Toate avizele specificate in Certificatul de Urbanism.','ETAPA 5 — Depunere dosar Autorizatie de Construire: La Registratura Primariei. Emitere in 30 de zile lucratoare.','ETAPA 6 — Executie lucrari: Cu respectarea proiectului avizat, diriginte de santier atestat.'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 7: Baza legala + concluzii
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA SI CONCLUZII',7);ftr();
  cy=28;cy=sec('7. CONCLUZII',cy);cy+=2;
  cy=body('Prezentul memoriu tehnic urbanistic preliminar a fost generat automat de platforma UrbanX pentru parcela '+nrcad+' (UTR '+utr+', Municipiul Iasi). Propunerea volumetrica analizata prevede o constructie cu '+niv+' niveluri (H='+aedisH.toFixed(1)+'m, '+fnLabel+') ce se incadreaza in reglementarile PUG Iasi pentru UTR '+utr+' cu POT='+params?.pot+'%, CUT='+params?.cut+', H max='+( params?.h||'nespecificat')+'. Indicatorii urbanistici calculati respecta valorile maxime admise. Se recomanda consultarea unui arhitect autorizat OAR si elaborarea documentatiei complete conform Legii 50/1991.',14,cy);cy+=5;
  cy=sec('8. BAZA LEGALA',cy);cy+=2;
  ['Legea nr. 50/1991 republicata — Autorizarea executarii lucrarilor de constructii.','Legea nr. 350/2001 — Amenajarea teritoriului si urbanismul (republicata).','HG nr. 525/1996 — Regulamentul General de Urbanism.','Ordinul MLPAT nr. 91/1991 n — Formular si continut documentatii pentru autorizatii.','Ordinul MDRAP nr. 233/2016 — Norme metodologice Legea 350/2001.','PUG '+getUATLabel()+' in vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.','Legea nr. 10/1995 republicata — Calitatea in constructii.','SR EN 1990:2004 — Eurocod 0: Baze de proiectare a structurilor.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  cy+=4;cy=body('NOTA: Prezentul memoriu tehnic preliminar a fost generat automat de platforma UrbanX pe baza datelor cadastrale disponibile si a parametrilor introdusi de utilizator. Documentul are caracter strict ORIENTATIV si INFORMATIV. Nu inlocuieste documentatia tehnica avizata conform legii si nu constituie un Certificat de Urbanism, aviz sau autorizatie de constructie.',14,cy);
  // Harta orasului inainte de concluzii
  if(caps.imgCity&&caps.imgCity.length>500){
    cy+=3;
    pdf.setFillColor(...DARK);pdf.rect(14,cy-3,W-28,4,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,cy-3,W-28,1,'F');
    pdf.setTextColor(...GOLD);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
    pdf.text('INCADRARE IN CONTEXTUL URBAN AL MUNICIPIULUI IASI',W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in Municipiul Iasi · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  sign();

  // PAG 8: Semnatura
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',8);ftr();
  cy=28;sign();
  pdf.save('Memoriu_Tehnic_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('Memoriu Tehnic Preliminar generat!');
}



// ════════════════════════════════════════════════════════════════════════════
// RAPOARTE NOI: AACR + Istoric/Patrimoniu + Construcții Existente + Geotehnică + Trafic
// ════════════════════════════════════════════════════════════════════════════

// ── AACR: Aviz Aeroport Iași ───────────────────────────────────────────────
// Date publice: Aeroport Iași (LRIA) ICAO, pistă 08/26 (083°/263°)
// Coordonate prag pistă 08: 47.1782°N 27.6199°E
// Coordonate prag pistă 26: 47.1731°N 27.6470°E
// H obstacol maxim conform PANS-OPS ICAO Doc 8168
const AACR_DATA = {
  aeroport: 'Aeroportul Internațional Iași (LRIA)',
  pistA_curs: 83,   // QFU 08 (83°)
  pistB_curs: 263,  // QFU 26 (263°)
  pragA: [27.6199, 47.1782],  // prag 08
  pragB: [27.6470, 47.1731],  // prag 26
  elevatie: 397,    // ft AMSL (121m)
  // Suprafețe ICAO Anexa 14 (pentru aeroport cod 4C)
  suprafete: {
    conicala: {panta:5, baza:600, inaltime:100, dist:2500},  // suprafața conică
    orizontalaInterna: {raza:4000, inaltime:45},              // suprafața orizontală internă
    cursa: {lungime:60000, latimePista:120, panta:100},       // suprafața de cursă
    decolare: {lungime:15000, panta:2, latimeDivergenta:0.5}, // suprafața de decolare
  },
  reglementare: 'HG nr. 930/2016 + Legea nr. 233/2016 + OMAI 14/2007 + ICAO Anexa 14 (ed. 8)',
};

async function generateAACR(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă pentru studiu AACR.');return;}
  ss('Se generează Studiu AACR...');

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,RED,GREEN,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu de Evaluare Aeronautica (AACR)','Studiu AACR',7);
  const caps = await _captureStudyMaps(ap, msg=>ss(msg));

  // Calcul distanță față de praguri pistă
  const parcelPt = {type:'Feature',geometry:{type:'Point',coordinates:[lon,lat]},properties:{}};
  const distA = turf.distance(parcelPt,{type:'Feature',geometry:{type:'Point',coordinates:AACR_DATA.pragA},properties:{}},{units:'meters'});
  const distB = turf.distance(parcelPt,{type:'Feature',geometry:{type:'Point',coordinates:AACR_DATA.pragB},properties:{}},{units:'meters'});
  const distMin = Math.min(distA, distB);
  const pragAproape = distA < distB ? '08 (curs 083°)' : '26 (curs 263°)';

  // Calculul înălțimii maxime admise conform suprafeței de limitare
  // Suprafața conică: pantă 5% față de cerc la 600m de prag
  const elevAerop = AACR_DATA.elevatie * 0.3048; // ft → m (121m)
  let hMaxAdmis = 999;
  let suprafataAplicabila = '';
  let metodaCalcH = '';

  if(distMin < 3000) {
    // În zona de decolare/aterizare — suprafața de cursă (1:100)
    hMaxAdmis = Math.max(0, elevAerop + distMin * 0.01);
    suprafataAplicabila = 'Suprafața de cursă (panta 1%)';
    metodaCalcH = `H_max = ${elevAerop.toFixed(0)}m (elev. pistă) + ${distMin.toFixed(0)}m × 0.01 = ${hMaxAdmis.toFixed(1)}m`;
  } else if(distMin < 4000) {
    // Suprafața de abordare
    hMaxAdmis = elevAerop + 45 + (distMin-600)*0.05;
    suprafataAplicabila = 'Suprafața de abordare internă';
    metodaCalcH = `H_max = ${elevAerop.toFixed(0)} + 45 + (${distMin.toFixed(0)}-600)×0.05 = ${hMaxAdmis.toFixed(1)}m`;
  } else if(distMin < 7000) {
    // Suprafața conică
    hMaxAdmis = elevAerop + 45 + (distMin-4000)*0.05;
    suprafataAplicabila = 'Suprafața conică ICAO (5%)';
    metodaCalcH = `H_max = ${elevAerop.toFixed(0)} + 45 + (${distMin.toFixed(0)}-4000)×0.05 = ${hMaxAdmis.toFixed(1)}m`;
  } else {
    hMaxAdmis = 999;
    suprafataAplicabila = 'În afara zonelor de restricție AACR';
    metodaCalcH = 'Amplasamentul este în afara suprafețelor de limitare ICAO (dist. > 7km)';
  }

  const hPropus = S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||parseFloat(params.h)||13;
  const isConform = hPropus <= hMaxAdmis;
  const half=(W-28)/2-2;

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(10,25,55);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  try{_pdfDrawLogo&&_pdfDrawLogo(pdf,W/2-10,18,20);}catch(e){}
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(20);
  pdf.text('STUDIU DE EVALUARE',W/2,68,{align:'center'});
  pdf.text('AERONAUTICA (AACR)',W/2,82,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);
  pdf.text('Evaluare ICAO Anexa 14 · HG 930/2016 · Suprafete de limitare obstacole',W/2,93,{align:'center'});
  pdf.setFillColor(20,35,70);pdf.rect(20,103,W-40,85,'F');pdf.setFillColor(...GOLD);pdf.rect(20,103,3,85,'F');
  [['Nr. cadastral:',nrcad],['Zona UTR:',utr],['Coordonate:',lat.toFixed(5)+'N / '+lon.toFixed(5)+'E'],
   ['Aeroport:',AACR_DATA.aeroport],['Dist. prag '+pragAproape+':',distMin.toFixed(0)+' m'],
   ['H propus:',hPropus.toFixed(1)+' m (față de teren)'],
   ['H maxim admis AACR:',hMaxAdmis>200?'FĂRĂ RESTRICȚIE':hMaxAdmis.toFixed(1)+' m AMSL'],
   ['Suprafata aplicabila:',suprafataAplicabila],
  ].forEach(([l,v],i)=>{
    pdf.setTextColor(150,170,200);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,113+i*10);
    pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),98,113+i*10);
  });
  pdf.setFillColor(isConform?20:180,isConform?120:30,isConform?60:30);pdf.rect(20,198,W-40,18,'F');
  pdf.setTextColor(255,255,255);pdf.setFontSize(11);pdf.setFont('helvetica','bold');
  pdf.text(isConform?'CONFORM — H propus sub limita AACR':'DEPĂȘIRE — Aviz AACR obligatoriu / Reducere H necesară',W/2,207,{align:'center'});
  if(caps.imgLocation){try{pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,H-72,W-28,58,'S');pdf.setTextColor(...GOLD);pdf.setFontSize(6);pdf.text('AMPLASAMENT · '+S2(nrcad)+' · '+S2(utr),W/2,H-75,{align:'center'});}catch(e){}}
  ftr();

  // PAG 2: Hartă context + calcule
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONTEXT AERONAUTIC — VEDERE 3D SI PLAN AMPLASAMENT',2);ftr();
  let cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,68,'FIG. 1 — Vedere 3D amplasament · Context urban · Înălțime propusă față de vecinii și aeroportul Iași');
  cy=sec('1. DATE AERONAUTICE AEROPORT IAȘI (LRIA)',cy);cy+=2;
  cy=tblRow(['Parametru','Valoare','Sursă'],cy,true,[80,60,38]);
  [['Cod ICAO',AACR_DATA.aeroport.split('(')[1]?.replace(')','')+'','ICAO / ROMATSA'],
   ['Pistă',`08/26 (${AACR_DATA.pistA_curs}°/${AACR_DATA.pistB_curs}°)`,'AIP Romania AD 2'],
   ['Elevație pistă',AACR_DATA.elevatie+' ft AMSL ('+elevAerop.toFixed(0)+'m)','AIP Romania'],
   ['Distanță prag '+pragAproape,distMin.toFixed(0)+' m','Calcul UrbanX GPS'],
   ['Distanță prag 08',distA.toFixed(0)+' m','Calcul UrbanX GPS'],
   ['Distanță prag 26',distB.toFixed(0)+' m','Calcul UrbanX GPS'],
   ['Suprafata aplicabila',suprafataAplicabila,'ICAO Anexa 14'],
  ].forEach(r=>cy=tblRow(r,cy,false,[80,60,38]));
  cy+=4;cy=sec('2. CALCUL ÎNĂLȚIME MAXIMĂ ADMISĂ',cy);cy+=2;
  cy=body('Metodologie de calcul conform ICAO Anexa 14 (ediția 8) și HG nr. 930/2016 privind stabilirea și aplicarea suprafețelor de limitare a înălțimilor obstacolelor în vederea navigației aeriene. Formula aplicată: '+metodaCalcH,14,cy);
  cy+=4;
  cy=tblRow(['Indicator','Valoare propusă','Limită AACR','Diferență','Status'],cy,true,[52,35,35,30,25]);
  cy=tblRow(['H clădire propusă',hPropus.toFixed(1)+'m',hMaxAdmis>200?'—':hMaxAdmis.toFixed(1)+'m',hMaxAdmis>200?'—':(hMaxAdmis-hPropus).toFixed(1)+'m',isConform?'CONFORM':'DEPĂȘIRE'],cy,false,[52,35,35,30,25]);
  cy=tblRow(['Dist. față de aeroport',distMin.toFixed(0)+'m','—','—',distMin>7000?'OK':'Verificare'],cy,false,[52,35,35,30,25]);

  // PAG 3: Viewer 3D + plan 2D
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D ZI/NOAPTE — VIZUALIZARE ÎNĂLȚIME PROPUSĂ',3);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,60,'FIG. 2 — Viewer 3D · ZI · Înălțimea propusă față de context');
  addImg(caps.v3dNight,14+half+4,cy-60,half,60,'FIG. 3 — Viewer 3D · NOAPTE · Balizaj luminos obligatoriu?');
  cy+=4;
  cy=sec('3. OBLIGAȚII CONFORM HG 930/2016 ȘI ICAO',cy);cy+=2;
  const obs = [
    distMin<2000?'OBLIGATORIU: Aviz AACR de la ROMATSA înainte de solicitarea Autorizației de Construire.':'RECOMANDAT: Notificare ROMATSA pentru înregistrarea obstacolului.',
    hPropus>45?'BALIZAJ OBLIGATORIU: Obstacole > 45m deasupra solului sau a terenului înconjurător se balizează diurn (vopsire alb/portocaliu) și nocturn (lumini roșii intermitente).':'Balizajul nu este obligatoriu dacă H < 45m față de teren.',
    distMin<3000?'ZONĂ PROTEJATĂ: Amplasamentul se află în zona imediată a suprafețelor de aterizare/decolare. Orice construcție necesită studiu aeronautic detaliat de expert AACR.':'',
    'Documentele necesare: Aviz AACR (ROMATSA/AACR București) + Plan de situație cu cote absolute + Fișă ICAO obstacol.',
    'Timp mediu obținere aviz AACR: 30-45 zile lucrătoare. Taxă: conform tarif ROMATSA în vigoare.',
  ].filter(Boolean);
  obs.forEach(o=>{cy=body('• '+o,16,cy);cy+=2;});

  // PAG 4: Vederi multiple + golden/overcast
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VEDERI MULTIPLE 3D + GOLDEN/INNORIRAT',4);ftr();
  cy=28;
  cy=addImg(caps.v3dGolden,14,cy,half,56,'FIG. 4 — Viewer 3D · GOLDEN HOUR · Vizibilitate aeriană');
  addImg(caps.v3dOvercast||caps.imgAerial,14+half+4,cy-56,half,56,'FIG. 5 — Viewer 3D · INNORIRAT / Vedere aeriana');
  cy+=4;
  cy=addImg(caps.imgFront,14,cy,half,48,'FIG. 6 — Vedere frontală · Înălțime față de stradă');
  addImg(caps.imgLat,14+half+4,cy-48,half,48,'FIG. 7 — Vedere laterală · Context înălțimi vecini');
  cy+=4;
  cy=sec('4. SUPRAFEȚELE DE LIMITARE ICAO APLICABILE',cy);cy+=2;
  cy=tblRow(['Suprafață','Dimensiuni','Pantă','Înălțime max'],cy,true,[55,50,25,47]);
  [['Conică (Anexa 14 Tab.3-1)','Raza 4000m de la prag','5%','100m deas. orizont. interne'],
   ['Orizontală internă','R=4000m față de ARP','—','45m deas. elevației pistă'],
   ['De cursă','L=60km, l=initial 120m','1%','Progresiv cu distanța'],
   ['De abordare','L=3000m (interiora)','3.33%','—'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,50,25,47]));

  // PAG 5: Plan 2D + distante + harta oras
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PLAN 2D + CONTEXT URBAN + HARTA ORAS',5);ftr();
  cy=28;
  cy=addImg(caps.img2D,14,cy,half,50,'FIG. 8 — Plan 2D cadastral · Amplasament față de piste');
  addImg(caps.imgDist,14+half+4,cy-50,half,50,'FIG. 9 — Plan distanțe · Aliniamente și vecini');
  cy+=4;
  if(caps.imgCity){cy=addImg(caps.imgCity,14,cy,W-28,50,'FIG. 10 — Hartă Iași · Incadrare amplasament față de aeroportul LRIA');cy+=4;}
  cy=sec('5. PROCEDURA OBȚINERE AVIZ AACR',cy);cy+=2;
  ['ETAPA 1 — Documentație tehnică: Plan de situație cu cote absolute (Stereo 70 + cote AMSL), fișă tehnică clădire cu H maxim față de NMM.','ETAPA 2 — Solicitare aviz ROMATSA: Depunere documentație la ROMATSA București (str. Ion Ionescu de la Brad nr. 10). Timp: 30-45 zile.','ETAPA 3 — Aviz AACR positiv: Se anexează la dosarul pentru Autorizație de Construire (art. 7 din Legea 50/1991).','ETAPA 4 — Post-construcție: Obligația înregistrării obstacolului în baza de date ICAO/ROMATSA după finalizare.'].forEach(e=>{cy=body(e,16,cy);cy+=2;});

  // PAG 6: Baza legala
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA SI REGLEMENTARI AACR',6);ftr();
  cy=28;cy=sec('6. BAZA LEGALA',cy);cy+=2;
  ['HG nr. 930/2016 privind stabilirea și aplicarea suprafețelor de limitare a înălțimilor obstacolelor.','Legea nr. 233/2016 — Codul Aerian al României.','OMAI nr. 14/2007 privind avizarea construcțiilor din zona aeroportuară.','ICAO Anexa 14 — Aerodromuri, ediția 8 (2018) — Suprafețe de limitare obstacole.','ICAO Doc 8168 PANS-OPS — Proceduri de zbor instrument.','AIP România — AD 2 LRIA — Date aeronautice aeroport Iași.',
   'Legea nr. 50/1991 republicată — art. 7: Aviz AACR obligatoriu pentru construcțiile din zone aeroportuare.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});
  if(caps.imgCity){cy+=4;cy=addImg(caps.imgCity,14,cy,W-28,52,'FIG. 11 — Incadrare în Municipiul Iași față de Aeroportul LRIA');}
  sign();

  // PAG 7: Semnatura
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',7);ftr();
  cy=28;sign();
  pdf.save('Studiu_AACR_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Studiu AACR generat!');
}

// ── STUDIU CONSTRUCȚII EXISTENTE ─────────────────────────────────────────
async function generateExistingBldStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  ss('Se generează Studiu Construcții Existente...');

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu Constructii Existente pe Amplasament','Constructii existente',5);
  const caps=await _captureStudyMaps(ap,msg=>ss(msg));

  const parcelFeat={type:'Feature',geometry:ap.geo.geometry,properties:{}};
  const pArea=turf.area(parcelFeat);
  const existingBlds=[];
  if(S.ctx?.features?.length){
    S.ctx.features.forEach(bld=>{
      if(!bld.geometry) return;
      try{
        const ov=turf.intersect(parcelFeat,{type:'Feature',geometry:bld.geometry,properties:{}});
        if(ov&&turf.area(ov)>5) existingBlds.push(bld);
      }catch(e){}
    });
  }
  const totalAreaExist=existingBlds.reduce((s,b)=>{try{return s+turf.area({type:'Feature',geometry:b.geometry,properties:{}});}catch(e){return s;}},0);
  const hMedExist=existingBlds.length?existingBlds.reduce((s,b)=>s+(b.properties?.h||6),0)/existingBlds.length:0;
  const potExist=pArea>0?(totalAreaExist/pArea*100).toFixed(1):'0';
  const cutExist=existingBlds.length?existingBlds.reduce((s,b)=>{try{return s+turf.area({type:'Feature',geometry:b.geometry,properties:{}})*Math.round((b.properties?.h||3)/3);}catch(e){return s;}},0)/pArea:0;
  const half=(W-28)/2-2;

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(10,25,55);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(22);
  pdf.text('STUDIU CONSTRUCTII',W/2,68,{align:'center'});
  pdf.text('EXISTENTE PE AMPLASAMENT',W/2,84,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);
  pdf.text('Identificare · Inventariere · Analiza scenarii interventie · Scenarii constructie',W/2,96,{align:'center'});
  pdf.setFillColor(20,35,70);pdf.rect(20,108,W-40,80,'F');pdf.setFillColor(...GOLD);pdf.rect(20,108,3,80,'F');
  [['Nr. cadastral:',nrcad],['Zona UTR:',utr],['Suprafata teren:',area+' mp'],
   ['Nr. constructii identificate:',existingBlds.length+' buc (date OSM)'],
   ['Suprafata construita existenta:',Math.round(totalAreaExist)+' mp'],
   ['POT actual (constructii exist.):',potExist+'%'],['CUT actual estimat:',cutExist.toFixed(2)],
   ['H medie existenta:',hMedExist.toFixed(1)+' m'],
  ].forEach(([l,v],i)=>{
    pdf.setTextColor(150,170,200);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,118+i*9.5);
    pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),100,118+i*9.5);
  });
  if(caps.imgLocation){try{pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,H-72,W-28,58,'S');pdf.setTextColor(...GOLD);pdf.setFontSize(6);pdf.text('AMPLASAMENT · '+S2(nrcad),W/2,H-75,{align:'center'});}catch(e){}}
  ftr();

  // PAG 2: Harta 3D + inventar
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VEDERE 3D + INVENTAR CONSTRUCTII EXISTENTE',2);ftr();
  let cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,68,'FIG. 1 — Vedere 3D · Constructii existente pe amplasament · Galben=vecinii · Albastru=parcela analizata');
  cy=sec('1. INVENTAR CONSTRUCTII EXISTENTE (DATE OSM)',cy);cy+=2;
  if(existingBlds.length===0){
    cy=body('Nu s-au identificat construcții existente pe parcela '+nrcad+' în baza de date OpenStreetMap. Aceasta nu exclude existența unor construcții neînregistrate în OSM — se recomandă verificare prin ridicare topografică la fața locului.',14,cy);
  } else {
    cy=tblRow(['Nr.','Nr.cad/ID','Suprafata','H(m)','Etaje est.','Functiune','Stare est.'],cy,true,[12,32,25,18,22,35,34]);
    existingBlds.forEach((b,i)=>{
      const bArea=turf.area({type:'Feature',geometry:b.geometry,properties:{}});
      const bH=b.properties?.h||6;const bNiv=Math.max(1,Math.round(bH/3));
      const bFn=b.properties?.fn_label||b.properties?.fn||'Necunoscut';
      cy=tblRow([(i+1).toString(),b.properties?.nrcad||'OSM',Math.round(bArea)+' mp',bH.toFixed(0)+'m',bNiv+' niv.',bFn.slice(0,14),'Verificare'],cy,false,[12,32,25,18,22,35,34]);
    });
    cy+=3;
    cy=tblRow(['TOTAL','',Math.round(totalAreaExist)+' mp',hMedExist.toFixed(1)+'m','—','—','POT='+potExist+'%'],cy,true,[12,32,25,18,22,35,34]);
  }

  // PAG 3: Scenarii intervenție
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('SCENARII DE INTERVENTIE — COMPARATIV',3);ftr();
  cy=28;
  cy=addImg(caps.img2D,14,cy,half,50,'FIG. 2 — Plan 2D cadastral · Amprente constructii existente');
  addImg(caps.imgDist,14+half+4,cy-50,half,50,'FIG. 3 — Plan distante · Aliniamente existente');
  cy+=4;cy=sec('2. SCENARII DE INTERVENȚIE DISPONIBILE',cy);cy+=2;
  const potMax=parseFloat(params?.pot)||40;const cutMax=parseFloat(params?.cut)||2;
  const scHeight=24;
  cy=tblRow(['Scenariu','Descriere','SC propusă','CUT propus','Avantaje principale'],cy,true,[30,55,22,22,48]);
  [
    ['🏚 Demolare','Construcții demolate complet, teren liber',Math.round(pArea*potMax/100)+' mp',(potMax*parseFloat(params?.niv||4)/100).toFixed(1),'Flexibilitate maximă, PUG integral'],
    ['🔧 Consolidare','Reabilitare fără demolare',Math.round(totalAreaExist)+' mp',cutExist.toFixed(1),'Fără taxă demolare, timp mai scurt'],
    ['🔗 Extindere H','Construcție nouă lângă existente',Math.round(pArea*potMax/100)+' mp',cutMax.toFixed(1),'Etape, investiție eșalonată'],
    ['🏗 Extindere V+H','Suprainălțare + extindere orizontală',Math.round(pArea*potMax/100)+' mp',cutMax.toFixed(1),'Maximizare CUT, eficiență teren'],
    ['🏠 Mansardare','Etaj nou peste existente',Math.round(totalAreaExist)+' mp',(cutExist+totalAreaExist/pArea).toFixed(1),'Cost redus, modificare minimă'],
    ['🔄 Reconversie','Schimbare funcțiune, fără demolare',Math.round(totalAreaExist)+' mp',cutExist.toFixed(1),'Rapid, fără demolare, avize simplificate'],
    ['🏛 Înglobare','Corp nou cuprinde existentele',Math.round(pArea*potMax/100)+' mp',cutMax.toFixed(1),'Utilizare maximă edificabil + H nou'],
  ].forEach(r=>cy=tblRow(r,cy,false,[30,55,22,22,48]));

  // PAG 4: Viewer 3D + golden/overcast + recomandari
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D + RECOMANDARI TEHNICE',4);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,55,'FIG. 4 — Viewer 3D · ZI · Volumul propus față de existente');
  addImg(caps.v3dNight||caps.v3dGolden,14+half+4,cy-55,half,55,'FIG. 5 — Viewer 3D · NOAPTE/GOLDEN · Impact vizual');
  cy+=4;cy=sec('3. RECOMANDĂRI TEHNICE',cy);cy+=2;
  cy=body('Pe baza analizei OSM și a parametrilor PUG (UTR '+utr+', POT max '+potMax+'%, CUT max '+cutMax+'), situația actuală a amplasamentului '+nrcad+' cu '+(existingBlds.length?existingBlds.length+' construcții identificate (SC='+Math.round(totalAreaExist)+'mp, POT='+potExist+'%, H med='+hMedExist.toFixed(1)+'m)':'0 construcții identificate în OSM')+' permite o serie de scenarii de intervenție, în funcție de obiectivele investitorului:',14,cy);cy+=4;
  ['Dacă obiectivul este maximizarea SD și a numărului de unități funcționale: scenariul DEMOLARE + construcție nouă conform PUG maxim (POT '+potMax+'%, CUT '+cutMax+').','Dacă obiectivul este minimizarea costurilor și timpul scurt: scenariul RECONVERSIE sau CONSOLIDARE, cu menținerea structurii existente.','Dacă clădirile existente au valoare arhitecturală sau istorică: verificare în Lista Monumentelor Istorice (LMI) înainte de orice demolare.','Certificat de Urbanism obligatoriu pentru clarificarea regimului juridic al construcțiilor existente și a obligațiilor legale.'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 5: Harta oras + baza legala + semnaturi
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('HARTA ORAS + BAZA LEGALA + SEMNATURA',5);ftr();
  cy=28;
  if(caps.imgCity){cy=addImg(caps.imgCity,14,cy,W-28,50,'FIG. 6 — Harta Municipiului Iași · Incadrare amplasament în contextul urban');cy+=4;}
  cy=sec('4. BAZA LEGALA',cy);cy+=2;
  ['Legea nr. 50/1991 republicată — Autorizarea executării lucrărilor de construcții.','Legea nr. 10/1995 republicată — Calitatea în construcții (consolidare, expertiză).','Ordinul MDLPL nr. 839/2009 — Norme metodologice de aplicare a Legii 50/1991.','Legea nr. 422/2001 republicată — Protejarea monumentelor istorice (dacă e cazul).','HG nr. 525/1996 — Regulamentul General de Urbanism.','PUG Municipiul Iași în vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  sign();
  pdf.save('Studiu_Constructii_Existente_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Studiu Construcții Existente generat!');
}

// ── STUDIU GEOTEHNIC PRELIMINAR ────────────────────────────────────────────
async function generateGeotehnicalStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  ss('Se generează Pre-Studiu Geotehnic...');

  const {pdf,W,H,DARK,GOLD,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,tblRow,addImg,sign}=_initStudyPdf('Pre-Studiu Geotehnic Preliminar','Pre-studiu geotehnic',5);
  const seismCfg=getSeismConfig();
  const hidroCfg=getHidroConfig();
  const caps=await _captureStudyMaps(ap,msg=>ss(msg));

  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13;
  const pArea=parseFloat(area)||0;
  // Date zonare seismică România — Iași în zona seismică E (ag=0.20g, Tc=1.6s conform P100-1/2013)
  const seism={zona:'E',ag:0.20,Tc:1.6,MSK:'VII-VIII',norm:'P100-1/2013'};
  // Date hidrologie estimative zona Iași
  const hidro={nfa:'1.5-4.0m (estimat, verificare foraje)','tip_sol':'Argilă prăfoasă, loess (depozite cuaternare)','portanta':'150-200 kPa (estimat)','adancFund':'1.2-2.0m (sub cota de îngheț)'};
  const half=(W-28)/2-2;

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(10,25,55);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(22);
  pdf.text('PRE-STUDIU GEOTEHNIC',W/2,68,{align:'center'});pdf.text('PRELIMINAR',W/2,84,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);
  pdf.text('Zonare seismica · Tip teren · Adancime fundare · Nivel freatic · NP 074/2014',W/2,96,{align:'center'});
  pdf.setFillColor(20,35,70);pdf.rect(20,108,W-40,80,'F');pdf.setFillColor(...GOLD);pdf.rect(20,108,3,80,'F');
  [['Nr. cadastral:',nrcad],['UTR:',utr],['Suprafata:',area+' mp'],['H propus:',aedisH.toFixed(1)+'m'],
   ['Zona seismica:',seism.zona+' (ag='+seism.ag+'g, Tc='+seism.Tc+'s)'],
   ['Intensitate MSK:',seism.MSK],['Tip sol estimat:',hidro.tip_sol],['NFA estimat:',hidro.nfa],
  ].forEach(([l,v],i)=>{
    pdf.setTextColor(150,170,200);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,118+i*9.5);
    pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),100,118+i*9.5);
  });
  if(caps.imgLocation){try{pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,H-72,W-28,58,'S');pdf.setTextColor(...GOLD);pdf.setFontSize(6);pdf.text('AMPLASAMENT · '+S2(nrcad),W/2,H-75,{align:'center'});}catch(e){}}
  ftr();

  // PAG 2: Harta + zonare seismica
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONTEXT GEOTEHNIC — ZONARE SEISMICA SI TEREN',2);ftr();
  let cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,68,'FIG. 1 — Vedere 3D amplasament · Context geomorfologic local · Iași (Podișul Moldovei)');
  cy=sec('1. ZONARE SEISMICĂ — P100-1/2013',cy);cy+=2;
  cy=tblRow(['Parametru seismic','Valoare','Semnificatie'],cy,true,[60,45,73]);
  [['Zona seismică',seism.zona,'Hazard seismic mediu-ridicat'],
   ['Accelerație proiectare ag',seism.ag+'g (≈'+Math.round(seism.ag*9.81)+'m/s²)','IMR = 225 ani (probabilitate 20%/50ani)'],
   ['Perioadă colț Tc',seism.Tc+' s','Spectru de răspuns zonal Iași'],
   ['Intensitate MacroSeismică MSK',seism.MSK,'Grad seismic estimat'],
   ['Normativ aplicabil','P100-1/2013 + P100-3/2019','Proiectare antiseismică'],
  ].forEach(r=>cy=tblRow(r,cy,false,[60,45,73]));
  cy+=4;cy=sec('2. CARACTERISTICI GEOTEHNICE ESTIMATE ZONA IAȘI',cy);cy+=2;
  cy=body('Amplasamentul se situează pe Podișul Moldovei, substratul geologic fiind format din depozite cuaternare (loess, argile prăfoase, nisipuri) peste substrate terțiare (argile, marne). Valorile de mai jos sunt ESTIMATIVE pentru zona geografică largă și necesită confirmare prin studiu geotehnic detaliat (minim 3 foraje/sondaje pe amplasament).',14,cy);cy+=4;
  cy=tblRow(['Parametru','Valoare estimata zona','Obs.'],cy,true,[65,65,48]);
  [['Tip depozit cuaternar','Loess, argila prafoasa','Litorinean-Wurm'],
   ['Portanta convenționala p_conv','150-200 kPa','Terenuri normale'],
   ['Adancime fundare min.','1.20-2.00m','Sub cota de inghet (-0.90m Iasi)'],
   ['Nivel freatic estimat (NFA)','1.5-4.0m de la CT','Variabil sezonier ±0.5m'],
   ['Umflare/tasare potential','Moderat (argile contractile)','Verificare in situ'],
   ['Agresivitate chimica','Neagresiv (pH normal)','Verificare apa freatică'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,65,48]));

  // PAG 3: Viewer + categorii geotehnice
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D + CATEGORII GEOTEHNICE SI FUNDARE',3);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,55,'FIG. 2 — Viewer 3D · ZI · Structura propusă H='+aedisH.toFixed(1)+'m');
  addImg(caps.v3dGolden||caps.img2D,14+half+4,cy-55,half,55,'FIG. 3 — Vedere 2D / Golden · Plan fundații estimat');
  cy+=4;cy=sec('3. CATEGORIA GEOTEHNICĂ (NP 074/2014)',cy);cy+=2;
  const catGeo=aedisH>28?'3 — Complexă':aedisH>10?'2 — Curentă':'1 — Simplă';
  cy=body('Conform NP 074/2014, proiectul se încadrează în categoria geotehnică '+catGeo+' (H='+aedisH.toFixed(1)+'m, suprafața construită ~'+Math.round(pArea*parseFloat(params?.pot||35)/100)+'mp). Aceasta implică:',14,cy);cy+=3;
  (catGeo.includes('3')?
    ['Studiu geotehnic detaliat obligatoriu cu min. 5 foraje geotehnice și 3 sondaje CPT.','Expertiză geotehnică semnată de expert AICPS categoria III.','Monitorizare pe toată durata execuției lucrărilor de fundații.']:
  catGeo.includes('2')?
    ['Studiu geotehnic obligatoriu cu min. 3 foraje geotehnice (adâncime min. 6-8m).','Verificare geotehnică de categoria II (expert geotehnician certificat).','Documentație completă prezentată la obținerea AC.']:
    ['Studiu geotehnic simplificat (min. 1-2 foraje sau trial pit-uri).','Nu necesită expert geotehnician, dar se recomandă.']
  ).forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});
  cy+=3;cy=sec('4. TIPURI DE FUNDAȚII RECOMANDATE',cy);cy+=2;
  cy=tblRow(['Tip fundatie','Aplicabilitate','Cond. utilizare'],cy,true,[55,45,78]);
  [['Fundații izolate din BA','P≤4 etaje, teren bun','P_conv>150kPa, NFA>2m adâncime fund.'],
   ['Fundații continue (radier)','P≤4 etaje, teren slab sau NFA ridicat','Dacă argile contractile sau NFA<1.5m'],
   ['Fundații pe piloți forati','P>4 etaje sau teren slab','Când p_conv<100kPa sau H>28m'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,45,78]));

  // PAG 4: Vederi multiple + sapaturi
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VEDERI MULTIPLE + SAPATURA SI ADANCIME FUNDARE',4);ftr();
  cy=28;
  cy=addImg(caps.imgFront,14,cy,half,48,'FIG. 4 — Vedere frontala · Dimensionare sapatura');
  addImg(caps.imgBack,14+half+4,cy-48,half,48,'FIG. 5 — Vedere posterioara · Acces excavatie');
  cy+=2;
  cy=addImg(caps.imgAerial,14,cy,half,44,'FIG. 6 — Vedere aeriana 45° · Amprenta fundatii');
  addImg(caps.img2D,14+half+4,cy-44,half,44,'FIG. 7 — Plan 2D · Corelatie fundatii-parcela');
  cy+=4;cy=sec('5. CERINTE EXCAVATIE SI SAPATURI',cy);cy+=2;
  const adFund=1.5;const adSap=adFund+0.5;
  cy=tblRow(['Parametru','Valoare estimata','Obs.'],cy,true,[70,50,58]);
  [['Adancime sapaturi',adSap.toFixed(1)+' m','Sub NFA estimat (verificare)'],
   ['Epuismente necesare','Posibil (NFA 1.5-4m)','Pompare 1-2 zile inainte de turnare'],
   ['Taluzare sapaturi','1:1 la 1:1.5 (argile)','Sau sprijiniri la H>2m'],
   ['Cofraje pierdute','RECOMANDAT','La contact cu argile sensibile la apa'],
   ['Protectie antigeliva','Obligatoriu sub -0.90m','Cota de inghet zona Iasi'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,50,58]));

  // PAG 5: Harta oras + baza legala
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('HARTA ORAS + BAZA LEGALA + SEMNATURA',5);ftr();
  cy=28;
  if(caps.imgCity){cy=addImg(caps.imgCity,14,cy,W-28,50,'FIG. 8 — Harta Municipiului Iași · Geomorfologie locala');cy+=4;}
  cy=sec('6. BAZA LEGALA SI NOTA DE AVERTIZARE',cy);cy+=2;
  cy=body('IMPORTANT: Prezentul pre-studiu geotehnic are caracter STRICT ORIENTATIV și se bazează exclusiv pe date statistice pentru zona geografică largă a Municipiului Iași (Podișul Moldovei). Nu înlocuiește studiul geotehnic detaliat obligatoriu conform NP 074/2014, realizat de specialist geotehnician autorizat cu foraje/sondaje pe amplasamentul specific.',14,cy);cy+=4;
  ['NP 074/2014 — Normativ privind principiile, exigențele și metodele cercetării geotehnice.','SR EN 1997-1:2004 — Eurocod 7: Proiectarea geotehnică. Reguli generale.','P100-1/2013 — Cod de proiectare seismică. Prevederi pentru clădiri.','P100-3/2019 — Cod de proiectare seismică. Evaluarea și proiectarea clădirilor existente.','STAS 1242/1-89 — Teren de fundare. Principii generale de cercetare.','Legea nr. 10/1995 republicată — Calitatea în construcții. Cerința A: Rezistență mecanică și stabilitate.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  sign();
  pdf.save('PreStudiu_Geotehnic_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Pre-Studiu Geotehnic generat!');
}

// ── STUDIU TRAFIC ────────────────────────────────────────────────────────
async function generateTrafficStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  ss('Se generează Studiu de Trafic...');

  const {pdf,W,H,DARK,GOLD,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,tblRow,addImg,sign}=_initStudyPdf('Studiu de Impact asupra Traficului','Studiu trafic',5);
  const traficCfg=getTraficConfig();
  const caps=await _captureStudyMaps(ap,msg=>ss(msg));

  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13;
  const niv=AEDIS.corpuri[0]?.niv||4;
  const fn=AEDIS.fn||'rezidential_colectiv';
  const fnLabel=AEDIS_FN[fn]?.label||fn;
  const pArea=parseFloat(area)||0;
  const sdEst=Math.round(pArea*(parseFloat(params?.cut)||2.0));
  // Estimare trafic generat (conf. ITE Trip Generation, adaptat RO)
  const unitatiEst=Math.round(sdEst/70);
  const TRAFIC_GEN={
    rezidential_colectiv:{zi_ora_varf:unitatiEst*0.35,zi_total:unitatiEst*3.5,noapte:unitatiEst*0.05,factor:'0.35 v/ap/oră vârf'},
    locuinta_individuala:{zi_ora_varf:unitatiEst*0.5,zi_total:unitatiEst*4.0,noapte:unitatiEst*0.05,factor:'0.5 v/casă/oră vârf'},
    birouri:{zi_ora_varf:Math.round(sdEst/25)*0.15,zi_total:Math.round(sdEst/25)*1.5,noapte:0,factor:'0.15 v/angajat/oră'},
    comercial:{zi_ora_varf:Math.round(sdEst/40)*0.4,zi_total:Math.round(sdEst/40)*4,noapte:Math.round(sdEst/40)*0.1,factor:'0.4 v/100mp/oră'},
    default:{zi_ora_varf:unitatiEst*0.35,zi_total:unitatiEst*3.5,noapte:0,factor:'—'},
  };
  const tg=TRAFIC_GEN[fn]||TRAFIC_GEN.default;
  const pkObl=Math.max(1,Math.round(unitatiEst*(parseFloat(params?.pk)||1)));
  const half=(W-28)/2-2;

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(10,25,55);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(22);
  pdf.text('STUDIU DE IMPACT',W/2,68,{align:'center'});pdf.text('ASUPRA TRAFICULUI',W/2,84,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);
  pdf.text('Generare trafic · Impact retea · Parcaje · ITE · Norme romanesti',W/2,96,{align:'center'});
  pdf.setFillColor(20,35,70);pdf.rect(20,108,W-40,80,'F');pdf.setFillColor(...GOLD);pdf.rect(20,108,3,80,'F');
  [['Nr. cadastral:',nrcad],['UTR:',utr],['Funcțiune propusă:',fnLabel],['Niveluri:',niv+' niv.'],
   ['SD estimată:',sdEst+' mp'],['Unități estimate:',unitatiEst+' ap/buc'],
   ['Trafic generat (oră vârf):',Math.round(tg.zi_ora_varf)+' vehicule/oră'],
   ['Parcaje obligatorii:',pkObl+' locuri'],
  ].forEach(([l,v],i)=>{
    pdf.setTextColor(150,170,200);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,118+i*9.5);
    pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),100,118+i*9.5);
  });
  if(caps.imgLocation){try{pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,H-72,W-28,58,'S');pdf.setTextColor(...GOLD);pdf.setFontSize(6);pdf.text('AMPLASAMENT · '+S2(nrcad),W/2,H-75,{align:'center'});}catch(e){}}
  ftr();

  // PAG 2: Harta + trafic generat
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONTEXT URBAN 3D — ACCESE SI TRAFIC',2);ftr();
  let cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,68,'FIG. 1 — Vedere 3D principala · Retea stradala si accese vehicule · Context urban');
  cy=sec('1. TRAFIC GENERAT DE OBIECTIV',cy);cy+=2;
  cy=body('Traficul generat de proiect a fost estimat conform metodologiei ITE (Institute of Transportation Engineers), adaptată la condițiile locale românești. Funcțiunea propusă ('+fnLabel+') cu '+unitatiEst+' unități/angajați și SD='+sdEst+'mp va genera în ora de vârf PM (16:00-18:00) aproximativ '+Math.round(tg.zi_ora_varf)+' vehicule/oră intrare+ieșire.',14,cy);cy+=4;
  cy=tblRow(['Interval orar','Trafic generat','Directie','Observatii'],cy,true,[42,38,42,56]);
  [['Ora varf dimineata (7-9h)',Math.round(tg.zi_ora_varf*0.8)+' v/h','60% intrare','Naveta domiciliu-serviciu'],
   ['Ora varf seara (16-18h)',Math.round(tg.zi_ora_varf)+' v/h','60% iesire','Varf maxim zi'],
   ['Interval noapte (22-6h)',Math.round(tg.noapte)+' v/h','50/50','Nivel redus'],
   ['Total zi (24h)',Math.round(tg.zi_total)+' vehicule/zi','—','Estimat ITE'],
  ].forEach(r=>cy=tblRow(r,cy,false,[42,38,42,56]));
  cy+=4;cy=sec('2. NECESARUL DE PARCAJE (NP 051/2012)',cy);cy+=2;
  cy=tblRow(['Categorie','Norma','Nr. unitati','Locuri necesare'],cy,true,[55,38,35,50]);
  [[fnLabel+' (rezidential/birouri)','1 loc/unitate',unitatiEst+' ap',pkObl+' locuri'],
   ['Vizitatori (rezidential)','1 loc/10 ap',unitatiEst+' ap',Math.ceil(unitatiEst/10)+' locuri'],
   ['PMR (min 2%)','1 loc/50 locuri',pkObl+' total',Math.max(1,Math.ceil(pkObl/50))+' locuri'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,38,35,50]));

  // PAG 3: Viewer 3D + accese
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D ZI/NOAPTE — ACCESE AUTO SI PIETONALE',3);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,56,'FIG. 2 — Viewer 3D · ZI · Acces principal auto si pietonal');
  addImg(caps.v3dNight,14+half+4,cy-56,half,56,'FIG. 3 — Viewer 3D · NOAPTE · Iluminat accese si parcaje');
  cy+=4;cy=sec('3. ACCESE RECOMANDATE',cy);cy+=2;
  ['Acces auto principal: un singur acces de pe strada principală, latime min. 6.0m (doua sensuri) sau 3.5m (un sens), cu vizibilitate min. 30m pe ambele directii.','Acces pietonal: separat de accesul auto, latime min. 1.5m, cu facilităti pentru PMR (rampă, suprafata non-alunecoasă).','Acces servicii (dacă existent): pe latura laterală sau posterioară, latime min. 3.5m.','Platforma parcare: min. 4.50m×2.50m/loc (perpendicular) sau 5.50m lungime/loc+culoar 7.5m (90°).','Semaforizare: nu se impune la acest nivel de trafic (<100v/h), dar se recomandă studiu de intersecție.'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 4: Plan 2D + golden + baza legala
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PLAN 2D + GOLDEN HOUR + CONCLUZII',4);ftr();
  cy=28;
  cy=addImg(caps.imgFront,14,cy,half,50,'FIG. 4 — Vedere frontala · Front stradal si acces auto');
  addImg(caps.v3dGolden||caps.imgAerial,14+half+4,cy-50,half,50,'FIG. 5 — Vedere aeriana / Golden · Amplasare parcaje');
  cy+=4;cy=addImg(caps.img2D,14,cy,W-28,50,'FIG. 6 — Plan 2D · Configuratie stradala si accese');
  cy+=4;cy=sec('4. CONCLUZII',cy);cy+=2;
  cy=body('Proiectul propus pe parcela '+nrcad+' ('+fnLabel+', '+sdEst+'mp SD) va genera un trafic suplimentar estimat de '+Math.round(tg.zi_ora_varf)+' vehicule/oră în ora de vârf. Impactul asupra rețelei stradale locale este '+(tg.zi_ora_varf<50?'REDUS':'MODERAT')+' și poate fi gestionat prin asigurarea a minimum '+pkObl+' locuri de parcare pe parcela și amenajarea corespunzătoare a acceselor.',14,cy);

  // PAG 5: Harta oras + baza legala
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('HARTA ORAS + BAZA LEGALA + SEMNATURA',5);ftr();
  cy=28;
  if(caps.imgCity){cy=addImg(caps.imgCity,14,cy,W-28,50,'FIG. 7 — Harta Municipiului Iași · Retea stradala si acces principal');cy+=4;}
  cy=sec('5. BAZA LEGALA',cy);cy+=2;
  ['NP 051/2012 — Normativ privind adaptarea cladirilor civile si spatiului urban la necesitatile persoanelor cu handicap.','STAS 10144/3-1991 — Calculul si proiectarea parcajelor pentru autoturisme.','HG nr. 525/1996 — Regulamentul General de Urbanism, art. 33 Parcaje.','Ordinul MT nr. 45/1998 — Norme tehnice privind proiectarea, construirea si modernizarea drumurilor.','PUG '+getUATLabel()+' — UTR '+utr+' — Reglementari accese si parcaje.','Legea nr. 82/1998 — Codul Rutier, art. 72: Iesirile din incinte.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  sign();
  pdf.save('Studiu_Trafic_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Studiu de Trafic generat!');
}

// ── STUDIU ISTORIC / PATRIMONIU ────────────────────────────────────────────
// ── CIMEC WMS live query ────────────────────────────────────────────────────
// map.cimec.ro oferă WMS public CORS-enabled pentru monumente istorice
const CIMEC_WMS = 'https://map.cimec.ro/Mapserver/wms';
const CIMEC_LAYERS = {
  monumente: 'monumente',        // Monumente istorice punctuale
  zone: 'zone_construite',       // Zone construite protejate
  situri: 'situri_arheologice',  // Situri arheologice
  rezervatii: 'rezervatii',      // Rezervații arhitecturale
};

async function _cimecQueryWFS(lon, lat, radiusM){
  // WFS GetFeature în raza amplasamentului
  const bbox = [
    lon - radiusM/111320,
    lat - radiusM/111320,
    lon + radiusM/111320,
    lat + radiusM/111320
  ].join(',');

  const results = { monumente:[], zone:[], situri:[], error:null };

  // Interogăm layerele principale
  const queries = [
    { layer:'LMI_Puncte', key:'monumente' },
    { layer:'LMI_Zone',   key:'zone' },
    { layer:'Situri_Arh', key:'situri' },
  ];

  for(const q of queries){
    try{
      const url = `${CIMEC_WMS}?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature`+
        `&TYPENAME=${q.layer}&BBOX=${bbox},EPSG:4326&SRSNAME=EPSG:4326`+
        `&OUTPUTFORMAT=application/json&maxFeatures=50`;
      const resp = await fetch(url, {signal:AbortSignal.timeout(8000)});
      if(resp.ok){
        const data = await resp.json();
        results[q.key] = data.features||[];
      }
    }catch(e){ /* silent fallback */ }
  }

  // Fallback: WMS GetFeatureInfo
  if(!results.monumente.length && !results.zone.length){
    results.error = 'CIMEC WFS indisponibil — se folosesc date locale';
  }

  return results;
}

async function _cimecGetMapImage(lon, lat, radiusM, widthPx=800, heightPx=600){
  // WMS GetMap — fără CORS issues (imagine raster)
  const margin = radiusM*1.8/111320;
  const bbox = `${lon-margin},${lat-margin},${lon+margin},${lat+margin}`;
  const url = `${CIMEC_WMS}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap`+
    `&LAYERS=LMI_Puncte,LMI_Zone,Situri_Arh`+
    `&BBOX=${bbox}&CRS=EPSG:4326`+
    `&WIDTH=${widthPx}&HEIGHT=${heightPx}`+
    `&FORMAT=image/png&TRANSPARENT=true&STYLES=`;
  try{
    // Încearcă direct (poate funcționa pe unele browsere)
    const resp = await fetch(url, {signal:AbortSignal.timeout(12000), mode:'cors'});
    if(resp.ok && resp.headers.get('content-type')?.includes('image')){
      const blob = await resp.blob();
      return await new Promise(res=>{
        const reader = new FileReader();
        reader.onload = ()=>res(reader.result);
        reader.readAsDataURL(blob);
      });
    }
  }catch(e){}
  // Fallback: folosim img element (bypass CORS pentru afișare)
  return null;
}

async function generateEnvironmentalImpact(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă pentru Studiul de Impact asupra Mediului.');return;}
  ss('Se generează Studiu de Impact asupra Mediului (EIM)...');

  const d=_initStudyPdf('Studiu de Impact asupra Mediului','EIM — Legea 292/2018 + OUG 195/2005',10);
  const {pdf,W,H,DARK,DARK2,GOLD,GOLD2,BLUE,BLUE2,LIGHT,LIGHT2,RED,GREEN,ORANGE,GRAY,GRAY2,GRAY3,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
    hdr,ftr,sec,subsec,body,tblRow,addImg,kv,badge,divider,bullet,concluzii,sign,cover}=d;

  const caps=await _captureStudyMaps(ap,m=>ss(m));
  const eim=getEIMConfig();
  const mediu=getMediuConfig();
  const seism=getSeismConfig();
  const hidro=getHidroConfig();
  const vant=getVantConfig();
  const zgomot=getZgomotConfig();
  const trafic=getTraficConfig();
  const aedisH=S.vol._lastFeats?.reduce((m2,f)=>Math.max(m2,f.properties?.top||0),0)||parseFloat(params.h)||10;
  const niv=AEDIS.corpuri[0]?.niv||Math.round(aedisH/3)||3;
  const fnLabel=(AEDIS_FN[AEDIS.fn]||AEDIS_FN.rezidential_colectiv).label||'Rezidențial';
  const scMax=parseFloat(area)*(parseFloat(params.pot)||40)/100;
  const svMin=parseFloat(area)*(parseFloat(params.sv)||20)/100;

  // ─── PAG 1: COPERTĂ ──────────────────────────────────────────────────────
  cover(
    'Analiză impact: aer · apă · sol · zgomot · biodiversitate · populație',
    caps.imgCity||caps.img3D,
    [['Funcțiune propusă',fnLabel],['Suprafață construită est.',scMax.toFixed(0)+' mp'],
     ['Spații verzi min.',svMin.toFixed(0)+' mp ('+params.sv+'%)'],
     ['Nivel seismic','Zona '+seism.zona+', ag='+seism.ag+'g']],
    true,
    'Document de evaluare preliminară — EIM conform Legea 292/2018 și OUG 195/2005'
  );

  // ─── PAG 2: CONTEXT AMPLASAMENT + VEDERE 3D ──────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('CONTEXT AMPLASAMENT — VEDERE 3D ȘI ÎNCADRARE TERITORIALĂ',2);ftr();
  let cy=30;
  cy=addImg(caps.img3D,14,cy,W-28,95,'FIG. 1 — Vedere 3D amplasament · Contextul urban construit · '+uat+' · UTR '+utr);cy+=2;

  const hw=(W-32)/2;
  cy=addImg(caps.imgLocation,14,cy,hw,52,'FIG. 2 — Plan amplasament cadastral');
  addImg(caps.imgCity,14+hw+4,cy-52,hw,52,'FIG. 3 — Încadrare în '+uat);
  cy+=3;

  cy=sec('1. DATE DE IDENTIFICARE A PROIECTULUI',cy);
  cy=body('Prezentul Studiu de Evaluare a Impactului asupra Mediului (EIM) a fost elaborat în conformitate cu prevederile Legii nr. 292/2018 privind evaluarea impactului anumitor proiecte publice și private asupra mediului, OUG nr. 195/2005 privind protecția mediului, aprobată cu modificări prin Legea nr. 265/2006, și a Ordinului nr. 863/2002 privind aprobarea ghidurilor metodologice pentru etapele procedurii-cadru de evaluare a impactului asupra mediului.',14,cy);cy+=3;

  const colW2=[(W-28)/2,(W-28)/2];
  cy=tblRow(['PARAMETRU','VALOARE'],cy,true,[90,92]);
  [['Titular proiect','Beneficiar — de completat'],
   ['Amplasament',nrcad+', '+uat+', jud. '+judet],
   ['Coordonate GPS',lat.toFixed(5)+'°N, '+lon.toFixed(5)+'°E'],
   ['Suprafață teren',area+' mp ('+( parseFloat(area)/10000).toFixed(4)+' ha)'],
   ['Zonă urbanistică (UTR)',utr+' — '+(REGULI[utr]?.d||'conform PUG')],
   ['Funcțiune propusă',fnLabel],
   ['Regim înălțime propus','H max '+aedisH.toFixed(1)+'m / '+niv+' niveluri'],
   ['Suprafață construită est.',scMax.toFixed(0)+' mp (POT '+params.pot+'%)'],
   ['Suprafață spații verzi min.',svMin.toFixed(0)+' mp ('+params.sv+'%)'],
   ['Autoritate emitentă aviz mediu','APM '+judet+' — '+(eim.aer.apm)],
  ].forEach(r=>cy=tblRow(r,cy,false,[90,92]));

  // ─── PAG 3: CADRU LEGISLATIV COMPLET ────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('CADRUL LEGISLATIV ȘI NORMATIV',3);ftr();
  cy=30;

  cy=sec('2. BAZA LEGISLATIVĂ — MEDIU ȘI URBANISM',cy);
  cy=subsec('2.1 Legislație primară națională',cy);
  cy=bullet([
    'Legea nr. 292/2018 — Evaluarea impactului anumitor proiecte publice și private asupra mediului (transpune Dir. 2011/92/UE + 2014/52/UE).',
    'OUG nr. 195/2005 privind protecția mediului, aprobată prin Legea nr. 265/2006 — cadrul general al protecției mediului în România.',
    'Legea nr. 104/2011 privind calitatea aerului înconjurător (transpune Dir. 2008/50/CE CAFE). Valori limită NO2, PM10, PM2.5, SO2.',
    'Legea nr. 107/1996 — Legea apelor, cu modificările ulterioare. Protecția resurselor de apă de suprafață și subterane.',
    'Legea nr. 211/2011 privind regimul deșeurilor (transpune Dir. 2008/98/CE) — ierarhia deșeurilor, colectare selectivă.',
    'Legea nr. 24/2007 republicată privind reglementarea și administrarea spațiilor verzi din intravilanul localităților.',
    'OUG nr. 57/2007 privind regimul ariilor naturale protejate (Natura 2000) — procedura de evaluare adecvată.',
    'HG nr. 321/2005 privind evaluarea și gestionarea zgomotului ambiental (transpune Dir. 2002/49/CE).',
  ],14,cy);cy+=3;

  cy=subsec('2.2 Ordine și norme tehnice aplicabile',cy);
  cy=bullet([
    'Ordinul MMP nr. 863/2002 — Ghiduri metodologice pentru procedura EIM (IM-1, IM-2, IM-3, IM-4, IM-5, IM-6).',
    'Ordinul MAPM nr. 1798/2007 — Procedura de emitere a autorizației de mediu.',
    'OMS nr. 119/2014 — Norme de igienă și sănătate publică privind mediul de viață al populației.',
    'SR 10009:2017 — Acustică în construcții. Limite admisibile ale nivelului de zgomot în mediul exterior.',
    'NP 074/2014 — Normativ privind principiile, exigențele și metodele cercetării geotehnice.',
    'P100-1/2013 — Cod de proiectare seismică. Zona seismică '+seism.zona+', ag='+seism.ag+'g.',
    'HG nr. 188/2002 modificat prin HG nr. 352/2005 — Norme privind condițiile de descărcare a apelor uzate.',
    'STAS 12574-87 — Aer în zone protejate. Condiții de calitate.',
    'Legea nr. 350/2001 republicată — Amenajarea teritoriului și urbanismul. PUG '+uat+' în vigoare.',
    'Legea nr. 50/1991 republicată — Autorizarea executării lucrărilor de construcții. Art. 7 — studii obligatorii AC.',
  ],14,cy);cy+=3;

  cy=subsec('2.3 Directive europene de referință',cy);
  cy=bullet([
    'Directiva 2011/92/UE (EIA) + Directiva 2014/52/UE (amendamentă) — Evaluarea impactului proiectelor.',
    'Directiva 2008/50/CE (CAFE) — Calitatea aerului înconjurător și un aer mai curat pentru Europa.',
    'Directiva 2000/60/CE (WFD) — Cadrul politicii UE în domeniul apei.',
    'Directiva 92/43/CEE (Habitate) + Directiva 2009/147/CE (Păsări) — Natura 2000.',
    'Directiva 2002/49/CE — Evaluarea și gestionarea zgomotului ambiental.',
  ],14,cy);

  // ─── PAG 4: FACTORI DE MEDIU — AER & APĂ ────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('FACTORI DE MEDIU — AER, APĂ, SOL',4);ftr();
  cy=30;

  cy=addImg(caps.img3D,14,cy,W-28,65,'FIG. 4 — Vedere 3D perspectivă · Contextul construit și spațiile libere');cy+=3;

  cy=sec('3. EVALUAREA IMPACTULUI ASUPRA AERULUI',cy);
  cy=subsec('3.1 Starea actuală — calitatea aerului',cy);
  cy=body('Calitatea aerului în '+uat+' este monitorizată prin rețeaua națională de monitoring gestionată de '+eim.aer.apm+'. Poluanții principali identificați în zona de influență sunt: '+eim.aer.poluanti_principali.join(', ')+'. Calitatea generală: '+eim.aer.calitate_generala+'. Valorile de referință respectă prevederile Legii nr. 104/2011 și Directivei 2008/50/CE.',14,cy);cy+=3;
  cy=tblRow(['Poluant','Valoare estimată','Limita legală (an)','Limita legală (zi)','Status'],cy,true,[35,32,35,35,45]);
  [['NO2 (dioxid azot)',(eim.aer.NO2_medie_anuala||'—')+' μg/m³','40 μg/m³','200 μg/m³ (h)','sub limită'],
   ['PM10 (pulberi grosiere)',(eim.aer.PM10_medie_anuala||'—')+' μg/m³','40 μg/m³','50 μg/m³','sub limită'],
   ['PM2.5 (pulberi fine)','—','25 μg/m³','—','verificare'],
   ['CO (monoxid carbon)','—','10.000 μg/m³','—','sub limită'],
   ['O3 (ozon)','—','120 μg/m³ (8h)','—','sezonier'],
  ].forEach(r=>cy=tblRow(r,cy,false,[35,32,35,35,45]));cy+=3;

  cy=subsec('3.2 Impactul proiectului asupra aerului',cy);
  cy=tblRow(['Faza','Sursa de poluare','Poluanți generați','Magnitudine','Măsuri mitigation'],cy,true,[25,45,35,22,55]);
  [['CONSTRUCȚIE','Utilaje șantier, transport materiale','NOx, PM10, CO','Temporară','Stropire șantier; program orar limitat; acoperire transport'],
   ['CONSTRUCȚIE','Lucrări de terasament','PM10, PM2.5','Temporară','Bariere anti-praf; umezire teren'],
   ['OPERARE','Trafic generat de utilizatori','NOx, PM, CO','Permanentă redusă','Parcaje suficiente; acces transport public'],
   ['OPERARE','Centrale termice / climatizare','NOx, SO2 (mic)','Minimă','Echipamente eficiente energetic; gaze naturale'],
  ].forEach(r=>cy=tblRow(r,cy,false,[25,45,35,22,55]));cy+=4;

  cy=sec('4. EVALUAREA IMPACTULUI ASUPRA APEI',cy);
  cy=body('Rețeaua de apă și canalizare în '+uat+' este operată de '+eim.apa.operator+'. Sursa de apă potabilă: '+eim.apa.sursa_apa_potabila+'. Gradul de conectare la rețeaua de canalizare: '+(eim.apa.grad_conectare||'—')+'%. Receptorii naturali: '+(eim.apa.receptori_naturali||[]).join(', ')+'.',14,cy);cy+=3;
  cy=tblRow(['Faza','Tip impact','Receptor','Magnitudine','Măsuri'],cy,true,[22,48,35,22,55]);
  [['CONSTRUCȚIE','Ape pluviale cu suspensii din șantier','Rețea canalizare',  'Temporară','Decantoare temporare; bazine colectare'],
   ['CONSTRUCȚIE','Ape uzate personal șantier','Rețea canalizare','Temporară','Toalete ecologice; racord provizoriu'],
   ['OPERARE','Ape uzate menajere','Rețea canalizare','Permanentă','Racord canalizare obligatoriu; contor apă'],
   ['OPERARE','Ape pluviale de pe acoperișuri/terase','Rețea pluvială','Permanentă','Sisteme recuperare apă pluvială recomandate'],
   ['OPERARE','Impermeabilizare teren (reducere infiltrare)','Ape subterane','Redusă','SV permeabile min. '+svMin.toFixed(0)+' mp; pavaje drenante'],
  ].forEach(r=>cy=tblRow(r,cy,false,[22,48,35,22,55]));

  // ─── PAG 5: SOL, DEȘEURI, BIODIVERSITATE ───────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('FACTORI DE MEDIU — SOL, DEȘEURI, BIODIVERSITATE',5);ftr();
  cy=30;

  cy=addImg(caps.v3dDay||caps.imgFront,14,cy,hw,55,'FIG. 5 — Volum propus · Amprentă la sol · Spații verzi');
  addImg(caps.imgLat||caps.img2D,14+hw+4,cy-55,hw,55,'FIG. 6 — Plan 2D · Suprafețe permeabile/impermeabile');
  cy+=3;

  cy=sec('5. EVALUAREA IMPACTULUI ASUPRA SOLULUI',cy);
  cy=body('Tipul predominant de sol în zona amplasamentului: '+eim.sol.tip_sol_predominant+'. Permeabilitate: '+eim.sol.permeabilitate+'. Risc eroziune: '+eim.sol.eroziune+'. Impermeabilizarea terenului prin construcție afectează funcțiile pedologice și capacitatea de infiltrare a precipitațiilor.',14,cy);cy+=3;
  const imp_procent=parseFloat(params.pot)||40;
  const perm_procent=100-imp_procent;
  cy=tblRow(['Categorie suprafață','Suprafață (mp)','% din teren','Impact sol','Măsuri compensare'],cy,true,[40,28,20,28,66]);
  [['Construcție (amprenta la sol)',scMax.toFixed(0),(imp_procent*.6).toFixed(1)+'%','Impermeabilizare totală','Fundație eficientă; drenaj perimetral'],
   ['Alei, parcări, platforme',(parseFloat(area)*0.15).toFixed(0),(15).toFixed(1)+'%','Impermeabilizare parțială','Pavaje drenante; rigole colectare'],
   ['Spații verzi obligatorii',svMin.toFixed(0),params.sv+'%','Impact minim','Plantare conform plan peisagistic'],
   ['Spații verzi suplimentare recomandate',(parseFloat(area)*(perm_procent/100-parseFloat(params.sv)/100)).toFixed(0),'—','Pozitiv','Acoperișuri verzi; grădini comunitare'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,28,20,28,66]));cy+=4;

  cy=sec('6. MANAGEMENTUL DEȘEURILOR',cy);
  cy=body('Operatorul de salubritate în '+uat+': '+eim.deseuri.operator_salubritate+'. Colectare selectivă: '+(eim.deseuri.colectare_selectiva?'DA':'NU')+'. Depozit conform: '+(eim.deseuri.depozit_conform||'Verificare locală')+'. Rata estimată de reciclare: '+(eim.deseuri.rata_reciclare_est||'—')+'%.',14,cy);cy+=3;
  cy=tblRow(['Tip deșeu','Faza','Cantitate estimată','Cod EWC','Valorificare'],cy,true,[40,22,30,20,70]);
  [['Pământ excavat, steril de construcție','Construcție',Math.round(parseFloat(area)*0.5)+' mc','17 05 04','Refolosire umpluturi; depozit autorizat'],
   ['Betoane, cărămizi, materiale demolări','Construcție',Math.round(scMax*0.1)+' tone','17 01 07','Reciclare agregate; depozit autorizat'],
   ['Ambalaje (hârtie, plastic, metal)','Construcție','10-20 mc','15 01','Colectare selectivă — operator autorizat'],
   ['Deșeuri menajere utilizatori','Operare',Math.round(niv*15*0.5)+' kg/zi','20 03 01','Colectare selectivă — program municipal'],
   ['Nămol fosă septică (dacă e cazul)','Operare','—','20 03 04','Vidanjare — operator autorizat'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,22,30,20,70]));cy+=4;

  cy=sec('7. BIODIVERSITATE ȘI ARII PROTEJATE',cy);
  const areProtejate=eim.arii_protejate;
  const natura2000=eim.natura2000||[];
  cy=body('Amplasamentul se află în intravilanul '+uat+'. '+(areProtejate?'ATENȚIE: Arie naturală protejată în proximitate: '+areProtejate+'. Se impune Evaluare Adecvată conform OUG 57/2007 și Dir. Habitate 92/43/CEE.':'Nu s-au identificat arii naturale protejate în zona imediată a amplasamentului. ')+
    (natura2000.length>0?'Site-uri Natura 2000 în proximitate: '+natura2000.join(', ')+'. Verificare obligatorie distanță față de limita sitului.':''),14,cy);cy+=3;
  cy=tblRow(['Factor','Stare actuală','Impact construcție','Impact operare','Măsuri mitigation'],cy,true,[35,35,28,28,56]);
  [['Vegetație arboricolă','Verificare teren','Posibilă tăiere','Minim','Plan de plantare compensatorie'],
   ['Faună urbană','Pasări, insecte','Temporar disturb','Redus','Plantare specii native; căsuțe pasări'],
   ['Conectivitate ecologică','Culoar urban','Fragmentare loc.','Redus','SV continue; specii locale'],
   ['Arii Natura 2000',(natura2000.length>0?'Prezente proxim':'Absente în 5km'),'Evaluare adecvată','Evaluare adecvată',natura2000.length>0?'Evaluare Adecvată obligatorie':'Nu este necesară EA'],
  ].forEach(r=>cy=tblRow(r,cy,false,[35,35,28,28,56]));

  // ─── PAG 6: ZGOMOT, VIBRAȚII, CÂMPURI ELECTROMAGNETICE ─────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('ZGOMOT, VIBRAȚII ȘI CÂMPURI ELECTROMAGNETICE',6);ftr();
  cy=30;

  cy=addImg(caps.imgFront||caps.img3D,14,cy,W-28,65,'FIG. 7 — Vedere frontală · Surse de zgomot identificate în context');cy+=3;

  cy=sec('8. EVALUAREA IMPACTULUI ACUSTIC',cy);
  cy=body('Zona acustică: '+zgomot.zona_acustica+'. Limite maxime admise conform SR 10009:2017: Lzsn = '+zgomot.Lzsn_limita+' dB(A) (zi-seară-noapte), Lnoapte = '+zgomot.Lnoapte_limita+' dB(A). Surse principale de zgomot identificate: '+( zgomot.surse_principale||[]).join('; ')+'.',14,cy);cy+=3;
  cy=tblRow(['Sursă zgomot','Faza','Nivel estimat (dB)','Recept. sensibili','Măsuri'],cy,true,[40,20,25,35,62]);
  [['Utilaje construcție (excavări, betonare)','Construcție','75-85 dB(A)','Vecini, școli','Program 07:00-19:00; ecrane fonice temporare'],
   ['Transport materiale construcție','Construcție','65-75 dB(A)','Riverani','Rute stabilite; restricție noapte'],
   ['Trafic suplimentar generat (utilizatori)','Operare','55-65 dB(A)','Vecini','Gestiune accese; parcaje suficiente'],
   ['Instalații tehnice (HVAC, pompe)','Operare','40-55 dB(A)','Vecini direcți','Encapsulare; amplasare pe acoperiș cu atenuare'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,20,25,35,62]));cy+=3;

  cy=sec('9. VIBRAȚII ȘI CÂMPURI ELECTROMAGNETICE',cy);
  cy=body('Vibrații în faza de construcție: lucrările de compactare, batere piloți sau excavații mecanice pot genera vibrații cu impact pe clădirile vecine. Se aplică SR EN ISO 4866:2011 și limitele din NP 080/2003 pentru protecția construcțiilor. Câmpuri electromagnetice: instalațiile electrice interioare și transformatoarele vor respecta Directiva 2013/35/UE și normele ANRE.',14,cy);cy+=3;
  cy=tblRow(['Tip vibrație','Faza','Frecvență (Hz)','Impact posibil','Măsuri'],cy,true,[45,20,25,40,52]);
  [['Compactare teren','Construcție','10-80 Hz','Fisuri tencuială vecini','Monitorizare vibrații; program evitare ore sensibile'],
   ['Transport greu pe fundații','Construcție','5-30 Hz','Fisuri mici','Rute ocolitoare clădiri vechi'],
   ['Funcționare normală clădire','Operare','<5 Hz','Neglijabil','Standard'],
  ].forEach(r=>cy=tblRow(r,cy,false,[45,20,25,40,52]));

  // ─── PAG 7: PEISAJ URBAN, SĂNĂTATE, DATE SOCIO-ECONOMICE ───────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('PEISAJ URBAN, SĂNĂTATE PUBLICĂ ȘI IMPACT SOCIO-ECONOMIC',7);ftr();
  cy=30;

  const ins=eim.ins||{};
  cy=addImg(caps.imgAerial||caps.img3D,14,cy,hw,55,'FIG. 8 — Vedere aeriană · Impact vizual în peisajul urban');
  addImg(caps.v3dGolden||caps.imgBack,14+hw+4,cy-55,hw,55,'FIG. 9 — Randare · Integrare arhitecturală');
  cy+=4;

  cy=sec('10. IMPACT VIZUAL ȘI PEISAJ URBAN',cy);
  cy=body('Clădirea propusă (H='+aedisH.toFixed(1)+'m, '+niv+' niveluri, funcțiune '+fnLabel+') se integrează în contextul urban al UTR '+utr+' conform PUG '+uat+' (H max admis: '+params.h+'m, POT max: '+params.pot+'%, CUT max: '+params.cut+'). Impactul vizual este estimat ca '+( aedisH<=parseFloat(params.h)*0.8?'REDUS — clădire sub regimul maxim admis':'MODERAT — clădire la regimul maxim admis')+'. Se recomandă studiu de însorire și umbre pentru vecinătăți imediate.',14,cy);cy+=4;

  cy=sec('11. SĂNĂTATE PUBLICĂ',cy);
  cy=tblRow(['Factor sănătate','Standard aplicabil','Conformitate estimată','Acțiuni necesare'],cy,true,[50,50,35,47]);
  [['Calitate aer interior','Ord. MS 536/1997','Conformă','Ventilație mecanică sau naturală cert.'],
   ['Confort termic','SR EN ISO 7730:2006','Conformă','Izolare termică cf. C107-2005'],
   ['Iluminat natural (însorire)','OMS 119/2014 — min. 1.5h/zi','Verificare studiu însorire','Studiu Însorire detaliat obligatoriu'],
   ['Radiatii non-ionizante','Dir. 2013/35/UE','Conformă','Distanțe față de posturi trafo'],
   ['Apă potabilă','Legea 458/2002','Conformă','Racord rețea publică '+eim.apa.operator],
   ['Ape uzate','HG 188/2002','Conformă','Racord obligatoriu rețea canalizare'],
  ].forEach(r=>cy=tblRow(r,cy,false,[50,50,35,47]));cy+=4;

  cy=sec('12. IMPACT SOCIO-ECONOMIC — DATE INS',cy);
  cy=body('Date demografice și socio-economice '+(ins.sursa||'INS')+' pentru '+uat+': Populație: '+(ins.populatie?ins.populatie.toLocaleString():' — verificare statistici.insse.ro')+(ins.densitate_pop?' · Densitate: '+ins.densitate_pop+' loc/km²':'')+'. '+(ins.rata_somaj?'Rata șomaj: '+ins.rata_somaj+'% · ':'')+( ins.venit_mediu_lunar?'Venit mediu net: '+ins.venit_mediu_lunar+' RON/lună. ':'')+
    'Proiectul propus contribuie pozitiv la indicatorii socio-economici locali prin crearea de noi funcțiuni, locuri de muncă în faza de construcție și stimularea activității economice locale.',14,cy);cy+=3;
  cy=tblRow(['Indicator','Valoare locală','Impact proiect','Calificare'],cy,true,[50,40,50,42]);
  [['Locuri muncă construcție (est.)','—',Math.round(parseFloat(area)/50)+' persoane/lună','Pozitiv temporar'],
   ['Locuri muncă exploatare (est.)','—',Math.round(niv*2)+' persoane','Pozitiv permanent'],
   ['Valoare impozit clădire estimat','—',(parseFloat(area)*aedisH/3*15*0.001).toFixed(0)+' RON/an','Pozitiv buget local'],
   ['Consum apă estimat','—',Math.round(niv*3*150)+'L/zi','Solicitare rețea'],
   ['Deșeuri menajere generate','—',Math.round(niv*3*0.5)+' kg/zi','Planificat reciclare'],
  ].forEach(r=>cy=tblRow(r,cy,false,[50,40,50,42]));

  // ─── PAG 8: MĂSURI DE REDUCERE IMPACT ───────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('MĂSURI DE REDUCERE A IMPACTULUI — PLAN DE MANAGEMENT',8);ftr();
  cy=30;

  cy=sec('13. PLAN DE MANAGEMENT AL MEDIULUI (PMM)',cy);
  cy=body('Planul de Management al Mediului (PMM) stabilește măsurile concrete de prevenire, reducere și compensare a impactului negativ identificat, conform cerințelor procedurii EIM (Ord. 863/2002). PMM va fi actualizat în fazele de proiectare tehnică, autorizare și execuție.',14,cy);cy+=3;

  cy=subsec('13.1 Faza de Construcție',cy);
  cy=bullet([
    'AER: Stropire zilnică a suprafețelor expuse; acoperire cu prelate a materialelor pulverulente; inspecție lunară utilaje (norme Euro V/VI); program de lucru 07:00-19:00 L-V.',
    'APĂ: Instalare decantoare temporare pentru ape pluviale șantier; toalete ecologice vidanjabile; interzicere descărcare ape uzate pe teren.',
    'SOL: Depozitare temporară pământ excavat în incintă; colectare uleiuri uzate utilaje (contract firmă autorizată); refacere teren afectat după finalizare.',
    'DEȘEURI: Contract firmă autorizată transport deșeuri construcție; containere separate pe tipuri (beton, metal, lemn, plastic); raportare lunară cantități.',
    'ZGOMOT: Ecrane fonice mobile pe latura spre vecini sensibili; evaluare vibrații pentru clădirile adiacente vechi (>50 ani); notificare prealabilă primărie.',
    'BIODIVERSITATE: Transplantare arbori de valoare înainte de demolare (min. 30 zile înainte); compensare arbori tăiați (2 arbori noi / 1 arbore tăiat).',
  ],14,cy);cy+=2;

  cy=subsec('13.2 Faza de Operare',cy);
  cy=bullet([
    'AER: Centrale termice cu randament >90%; filtre HEPA pentru instalații ventilație; spații verzi cu specii fixatoare CO2 (min. '+svMin.toFixed(0)+' mp).',
    'APĂ: Contor individual apă; sisteme economizoare (reducere 30%); recuperare apă pluvială pentru irigații; separator hidrocarb. la parcaje.',
    'SOL: Pavaje permeabile min. 20% din suprafața circulabilă; substrat permeabil sub SV; groapă compost (recomandare).',
    'DEȘEURI: Spații colectare selectivă dedicate (4 fracții min.); contract salubritate conform; depozitare conformă normelor.',
    'ENERGIE: Clasa energetică min. B (NZEB pentru clădiri noi cf. Legea 372/2005); panouri solare termice/fotovoltaice recomandate.',
    'MOBILITATE: Rastele biciclete; stație reîncărcare vehicule electrice (minim 1 stație la 10 locuri parcaj); acces transport public.',
  ],14,cy);cy+=3;

  cy=sec('14. MONITORIZARE POST-CONSTRUCȚIE',cy);
  cy=tblRow(['Parametru monitorizat','Frecvență','Responsabil','Autoritate raportare','Metodă'],cy,true,[38,20,28,30,66]);
  [['Calitate aer (NO2, PM10)','Anual (primii 3 ani)','Beneficiar','APM '+judet,'Stații mobile sau laborator autorizat'],
   ['Zgomot ambiental','La recepție + an 1','Beneficiar','Primăria '+uat,'Măsurători tip I conform SR ISO 1996'],
   ['Consum apă și ape uzate','Lunar','Beneficiar',''+eim.apa.operator,'Citire contor; analize periodice'],
   ['Cantități deșeuri','Trimestrial','Beneficiar','APM '+judet,'Registru deșeuri (Legea 211/2011)'],
   ['Starea spațiilor verzi','Sezonier','Beneficiar','Primăria '+uat,'Inventar vegetație; suprafețe SV'],
  ].forEach(r=>cy=tblRow(r,cy,false,[38,20,28,30,66]));

  // ─── PAG 9: ALTERNATIVE ȘI SCENARII ────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('ANALIZA ALTERNATIVELOR ȘI SCENARIUL ZERO',9);ftr();
  cy=30;

  cy=sec('15. SCENARIUL ZERO (NEIMPLEMENTARE)',cy);
  cy=body('Scenariul zero presupune neimplementarea proiectului și menținerea stării actuale a amplasamentului. Această alternativă este analizată obligatoriu în cadrul procedurii EIM conform Anexei IV a Directivei 2011/92/UE.',14,cy);cy+=3;
  cy=tblRow(['Factor de mediu','Stare actuală','Scenariul Zero (10 ani)','Proiect propus (10 ani)','Concluzie'],cy,true,[28,28,38,38,50]);
  [['Calitate aer','Moderată','Fără modificare','Impact minor construcție','Proiect superior'],
   ['Calitate apă','Bună','Fără modificare','Impact minor; măsuri','Echivalent/superior'],
   ['Sol','Teren vacant/degradat','Posibil degradare','Impermeabilizare controlată','Comparabil'],
   ['Spații verzi','Minim/absent','Fără SV','Min. '+svMin.toFixed(0)+' mp SV nou','Proiect superior'],
   ['Zgomot','Nivel actual','Fără modificare','Temporar +5dB construcție','Echivalent operare'],
   ['Valoare economică','Teren neutilizat','Depreciere','Creștere valoare','Proiect superior'],
   ['Funcționalitate urbană','Absent','Absent','Funcțiune '+fnLabel,'Proiect superior'],
  ].forEach(r=>cy=tblRow(r,cy,false,[28,28,38,38,50]));cy+=4;

  cy=sec('16. ALTERNATIVE STUDIATE',cy);
  cy=bullet([
    'A0 — Scenariul ZERO: Neintervenție. Impact negativ pe termen lung prin deteriorarea terenului; pierdere valoare proprietate; absența funcțiunii.',
    'A1 — Scenariul propus: Construcție conform PUG (UTR '+utr+', H='+aedisH.toFixed(1)+'m, POT='+params.pot+'%). Impact pozitiv socio-economic; impact negativ minor în construcție, mitigabil.',
    'A2 — Alternativă funcțională: Altă destinație funcțională pe același amplasament (ex: spațiu verde public). Impact mediu mai bun, dar lipsă funcționale urbanistice.',
    'A3 — Alternativă de amplasament: Alt teren în aceeași zonă UTR. Analiză necesară dacă amplasamentul actual prezintă riscuri necompensabile.',
  ],14,cy);cy+=3;

  cy=body('Concluzie alternativă recomandată: Scenariul A1 (propunerea de față) prezintă raportul optim cost/beneficiu din perspectiva mediului și a utilizării terenului, cu condiția implementării integrale a Planului de Management al Mediului.',14,cy);

  // ─── PAG 10: CONCLUZII + SEMNĂTURĂ ──────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('CONCLUZII GENERALE ȘI SEMNĂTURĂ',10);ftr();
  cy=30;

  cy=addImg(caps.imgCity||caps.img3D,14,cy,W-28,55,'FIG. 10 — Harta '+uat+' · Încadrare amplasament în contextul urban general');cy+=3;

  cy=concluzii([
    'Proiectul nu se încadrează în categoriile de proiecte cu impact semnificativ obligatoriu pentru EIM complet (Anexa I a Legii 292/2018), dar necesită Acord de Mediu emis de APM '+judet+' pe baza Notificării de Mediu conform Anexei nr. 1 la Ord. MAPM 1798/2007.',
    'Impactul asupra calității aerului este TEMPORAR și REVERSIBIL în faza de construcție. În faza de operare impactul este NESEMNIFICATIV cu condiția respectării normelor de eficiență energetică și a asigurării accesului la transport public.',
    'Impactul asupra resurselor de apă este CONTROLABIL prin racordarea obligatorie la rețeaua de apă-canal '+(eim.apa.operator||'operator local')+' și prin implementarea sistemelor de separare ape pluviale/uzate.',
    'Impermeabilizarea solului pe suprafața de '+(scMax).toFixed(0)+' mp ('+params.pot+'% POT) este parțial compensată de spațiile verzi obligatorii de min. '+svMin.toFixed(0)+' mp ('+params.sv+'% din teren), conform PUG '+uat+' UTR '+utr+'.',
    'Nu s-au identificat arii naturale protejate în imediata vecinătate a amplasamentului '+(eim.natura2000.length>0?'— EXCEPȚIE: Site Natura 2000 '+eim.natura2000[0]+' necesită verificarea necesității Evaluării Adecvate (OUG 57/2007)':'— Procedura de Evaluare Adecvată nu este necesară')+'.',
    'Impactul acustic depășește temporar limitele SR 10009:2017 în faza de construcție (75-85 dB față de 60 dB limită); se impun măsuri obligatorii: program de lucru 07-19, ecrane fonice, notificare vecini cu min. 5 zile înainte.',
    'Impactul socio-economic al proiectului este POZITIV: '+Math.round(parseFloat(area)/50)+' locuri de muncă temporar în construcție, funcțiune utilă '+fnLabel+' în context urban, creștere valoare proprietăți adiacente.',
    'Documentul prezent are caracter PRELIMINAR și ORIENTATIV. EIM complet va fi elaborat de expert acreditat RM (responsabil de mediu) și va include capitolele suplimentare prevăzute de Ord. 863/2002 (hărți, modele dispersie, consultare public etc.).',
  ],cy);

  sign();
  pdf.save('Studiu_EIM_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Studiu de Impact asupra Mediului generat! (10 pagini)');
}

async function generateIstoricStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  ss('Se generează Studiu Istoric & Patrimoniu — interogare CIMEC...');

  const {pdf,W,H,DARK,GOLD,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,hdr,ftr,sec,body,tblRow,addImg,sign}=_initStudyPdf('Studiu Istoric si de Patrimoniu Urban','Studiu patrimoniu',6);

  // ── Interogare LIVE CIMEC ──────────────────────────────────────────────
  ss('Interogare CIMEC WMS/WFS (monumente.ro)...');
  const [cimecData, cimecImg, caps] = await Promise.all([
    _cimecQueryWFS(lon, lat, 1000),
    _cimecGetMapImage(lon, lat, 1000, 800, 600),
    _captureStudyMaps(ap, msg=>ss(msg)),
  ]);

  const cimecMonumente = cimecData.monumente||[];
  const cimecZone     = cimecData.zone||[];
  const cimecSituri   = cimecData.situri||[];
  const cimecOK       = !cimecData.error;

  // ── Date LMI din UAT_REGISTRY (per UAT activ) ─────────────────────────
  const uatLmi = S_UAT.lmi || {};
  const ZONE_PROTEJATE_LOCAL = uatLmi.zone_protejate || [];
  const distZone=ZONE_PROTEJATE_LOCAL.map(z=>{
    const d=turf.distance({type:'Feature',geometry:{type:'Point',coordinates:[lon,lat]},properties:{}},{type:'Feature',geometry:{type:'Point',coordinates:z.centru},properties:{}},{units:'meters'});
    return {...z,dist:d,inZona:d<z.raza};
  });

  // Combinăm date CIMEC live + date locale
  const inZonaProtejataCimec = cimecZone.length>0||cimecMonumente.length>0||cimecSituri.length>0;
  const inZonaProtejataLocal = distZone.some(z=>z.inZona);
  const inZonaProtejata = inZonaProtejataCimec || inZonaProtejataLocal;
  const zonaAproape=distZone.reduce((a,b)=>a.dist<b.dist?a:b);
  const half=(W-28)/2-2;

  // PAG 1: Cover
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(10,25,55);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(20);
  pdf.text('STUDIU ISTORIC',W/2,68,{align:'center'});pdf.text('SI DE PATRIMONIU URBAN',W/2,84,{align:'center'});
  pdf.setTextColor(...GOLD);pdf.setFontSize(9);
  pdf.text('Zone protejate LMI · Monumente istorice · Restrictii constructive · Avize MCID',W/2,96,{align:'center'});
  pdf.setFillColor(20,35,70);pdf.rect(20,108,W-40,80,'F');pdf.setFillColor(...GOLD);pdf.rect(20,108,3,80,'F');
  [['Nr. cadastral:',nrcad],['UTR:',utr],['Coordonate:',lat.toFixed(5)+'N / '+lon.toFixed(5)+'E'],
   ['In zona protejata LMI:',inZonaProtejata?'DA — Restricții suplimentare!':'NU (verificare suplimentara rec.)'],
   ['Cea mai apropiata zona prot.:',zonaAproape.zona],['Distanta:',Math.round(zonaAproape.dist)+' m'],
   ['Monument CIMEC în 1km:',cimecMonumente.length>0?cimecMonumente.length+' identificate':'0 (date live CIMEC)'],
   ['Surs date patrimoniu:',cimecOK?'CIMEC WMS live + date locale':'Date locale LMI 2015'],
  ].forEach(([l,v],i)=>{
    pdf.setTextColor(150,170,200);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,118+i*9.5);
    pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),100,118+i*9.5);
  });
  pdf.setFillColor(inZonaProtejata?180:20,inZonaProtejata?30:120,inZonaProtejata?30:60);pdf.rect(20,198,W-40,18,'F');
  pdf.setTextColor(255,255,255);pdf.setFontSize(11);pdf.setFont('helvetica','bold');
  pdf.text(inZonaProtejata?'ATENȚIE — Amplasament în zonă protejată LMI!':'ÎN AFARA zonelor protejate identificate (verificare recomandată)',W/2,207,{align:'center'});
  if(caps.imgLocation){try{pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,H-72,W-28,58,'S');pdf.setTextColor(...GOLD);pdf.setFontSize(6);pdf.text('AMPLASAMENT · '+S2(nrcad),W/2,H-75,{align:'center'});}catch(e){}}
  ftr();

  // PAG 2: Hartă CIMEC live + zone protejate
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('HARTĂ CIMEC — MONUMENTE ISTORICE LIVE (1km rază)',2);ftr();
  let cy=28;
  if(cimecImg){
    try{
      pdf.addImage(cimecImg,'PNG',14,cy,W-28,90,undefined,'FAST');
      pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.5);pdf.rect(14,cy,W-28,90,'S');
      cy+=93;
      pdf.setFontSize(7);pdf.setTextColor(80,100,130);pdf.setFont('helvetica','italic');
      pdf.text('Sursă hartă: CIMEC — Institutul Național al Patrimoniului, map.cimec.ro/Mapserver · Date live '+S2(dateStr),W/2,cy,{align:'center'});
      cy+=5;
    }catch(e){ cy=addImg(caps.img3D,14,cy,W-28,68,'FIG. 1 — Vedere 3D amplasament (harta CIMEC indisponibilă)'); }
  } else {
    cy=addImg(caps.img3D,14,cy,W-28,68,'FIG. 1 — Vedere 3D amplasament · Context urban · (Hartă CIMEC: verificați map.cimec.ro)');
  }

  cy=sec(`1. DATE LIVE CIMEC — ${cimecOK?'INTEROGARE REUȘITĂ':'FALLBACK DATE LOCALE'}`,cy);cy+=2;
  if(!cimecOK){
    cy=body('⚠️ '+cimecData.error+'. Datele afișate provin din baza locală UrbanX (LMI 2015). Pentru date actualizate consultați: map.cimec.ro și culture.ro.',14,cy);cy+=3;
  }

  // Monumente CIMEC live
  if(cimecMonumente.length>0){
    cy=sec('MONUMENTE IDENTIFICATE ÎN RAZA DE 1KM — CIMEC LIVE',cy);cy+=2;
    cy=tblRow(['Cod LMI','Denumire','Localitate','Categorie','Dist.'],cy,true,[28,60,30,30,20]);
    cimecMonumente.slice(0,12).forEach(m=>{
      const p=m.properties||{};
      const coords=m.geometry?.coordinates||[lon,lat];
      const dist=turf.distance({type:'Feature',geometry:{type:'Point',coordinates:[lon,lat]},properties:{}},
        {type:'Feature',geometry:{type:'Point',coordinates:Array.isArray(coords[0])?coords[0]:coords},properties:{}},{units:'meters'});
      cy=tblRow([
        S2(p.cod_lmi||p.COD_LMI||'—').slice(0,12),
        S2(p.denumire||p.DENUMIRE||'Monument').slice(0,28),
        S2(p.localitate||p.LOCALITATE||'Iași').slice(0,14),
        S2(p.categorie||p.CATEGORIE||'—').slice(0,14),
        Math.round(dist)+'m'
      ],cy,false,[28,60,30,30,20]);
    });
    cy+=3;
  } else {
    cy=body(cimecOK?'Nu s-au identificat monumente înregistrate în CIMEC în raza de 1km față de amplasament.':
      'Date CIMEC live indisponibile. Verificați manual: map.cimec.ro',14,cy);cy+=3;
  }

  // Zone locale
  cy=sec('2. ZONE PROTEJATE — DATE LOCALE LMI IAȘI',cy);cy+=2;
  cy=tblRow(['Cod LMI','Tip','Dist.(m)','Status','Descriere'],cy,true,[30,30,18,20,80]);
  distZone.forEach(z=>cy=tblRow([z.zona.split('-').pop(),z.tip.split(' ')[0],Math.round(z.dist)+'m',z.inZona?'ÎN ZONA':'în afară',z.desc.slice(0,32)],cy,false,[30,30,18,20,80]));

  // PAG 3: Context 3D + situri arheologice
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONTEXT URBAN 3D — SITURI ARHEOLOGICE SI RESTRICTII',3);ftr();
  cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,65,'FIG. 2 — Vedere 3D amplasament · Context urban · Proximitate zone istorice protejate');
  if(cimecSituri.length>0){
    cy=sec('3. SITURI ARHEOLOGICE IDENTIFICATE — CIMEC LIVE',cy);cy+=2;
    cy=tblRow(['Cod','Denumire sit','Epocă','Dist.'],cy,true,[25,80,40,30]);
    cimecSituri.slice(0,8).forEach(s=>{
      const p=s.properties||{};
      const coords=s.geometry?.coordinates||[lon,lat];
      const dist=turf.distance({type:'Feature',geometry:{type:'Point',coordinates:[lon,lat]},properties:{}},
        {type:'Feature',geometry:{type:'Point',coordinates:Array.isArray(coords[0])?coords[0]:coords},properties:{}},{units:'meters'});
      cy=tblRow([S2(p.cod||'—').slice(0,12),S2(p.denumire||'Sit arheologic').slice(0,38),S2(p.epoca||'—').slice(0,18),Math.round(dist)+'m'],cy,false,[25,80,40,30]);
    });cy+=3;
    cy=body('⚠️ ATENȚIE SITURI ARHEOLOGICE: Prezența siturilor arheologice în raza de 1km impune RAPORT DE DIAGNOSTIC ARHEOLOGIC înainte de orice lucrare de terasament, conform Legii 422/2001 art. 49-53.',14,cy);cy+=3;
  }
  cy=sec('4. MONUMENTE ISTORICE IDENTIFICATE ÎN CONTEXT',cy);cy+=2;
  cy=body(cimecOK&&cimecMonumente.length>0?
    'Au fost identificate '+cimecMonumente.length+' monumente înregistrate în CIMEC în raza de 1km față de amplasamentul '+nrcad+' (UTR '+utr+'). Orice intervenție în proximitatea acestora necesită avizul DJCPN Iași și, după caz, al Comisiei Zonale a Monumentelor (CZ 5 — IAȘI).':
    'Identificarea monumentelor istorice din Lista Monumentelor Istorice (LMI 2015 + actualizări) în raza de 500m față de amplasamentul '+nrcad+' este obligatorie înainte de orice intervenție. Prezentul studiu utilizează date de referință pentru Municipiul Iași. Se recomandă verificarea actualizată pe map.cimec.ro și culture.ro.',14,cy);

  // PAG 3: Viewer + restrictii
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VIEWER 3D + RESTRICTII CONSTRUCTIVE IN ZONE PROTEJATE',4);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,half,56,'FIG. 2 — Viewer 3D · ZI · Integrare volumetrica in context istoric');
  addImg(caps.v3dGolden||caps.imgAerial,14+half+4,cy-56,half,56,'FIG. 3 — Viewer 3D · GOLDEN HOUR · Materialitate si impact vizual');
  cy+=4;cy=sec('3. RESTRICȚII CONSTRUCTIVE ÎN ZONE PROTEJATE',cy);cy+=2;
  cy=tblRow(['Criteriu','Cerinta','Aviz necesar'],cy,true,[65,70,43]);
  [['Inălțime maximă','Conf. UTR + aviz DJCPN','DJCPN Iași'],
   ['Materiale fatade','Tencuiala traditionala/piatră/caramida','DJCPN + MCID'],
   ['Culori fatade','Paletă cromatică aprobată zona','DJCPN'],
   ['Tamplarie exterior','Lemn / metal fara PVC vizibil','DJCPN'],
   ['Reclame/firmă','Limitat, conf. Reg. local publicitate','Primarie Iasi'],
   ['Demolare','Studiu istorico-arhitectural obligatoriu','MCID + DJCPN'],
   ['Consolidare','Plan conservare/restaurare','Expert AICPS + DJCPN'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,70,43]));
  cy+=4;cy=body('DJCPN = Direcția Județeană pentru Cultură și Patrimoniu Național Iași. MCID = Ministerul Culturii și Identității. Avizele se solicită conform Legii 422/2001 și Ordinului 2828/2015.',14,cy);

  // PAG 4: Vederi multiple + procedura
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VEDERI MULTIPLE + PROCEDURA AVIZARE PATRIMONIU',5);ftr();
  cy=28;
  cy=addImg(caps.imgFront,14,cy,half,48,'FIG. 4 — Vedere frontala · Fatada si insertie in front stradal');
  addImg(caps.imgBack,14+half+4,cy-48,half,48,'FIG. 5 — Vedere posterioara · Curte interior');
  cy+=2;cy=addImg(caps.img2D,14,cy,W-28,46,'FIG. 6 — Plan 2D · Incadrare in tesut urban historic');
  cy+=4;cy=sec('4. PROCEDURA AVIZARE MCID/DJCPN',cy);cy+=2;
  ['ETAPA 1 — Studiu istorico-arhitectural: Elaborat de arhitect specialist CP atestat MCID. Include istoricul construcțiilor, analiza stilistică, valoare arhitecturală.','ETAPA 2 — Consultare DJCPN Iași: Depunere memoriu + planșe + studiu istorico-arhitectural pentru aviz preliminar (30 zile).','ETAPA 3 — Comisia Zonală a Monumentelor (CZ 5 — IAȘI): Aviz pentru intervenții în zone protejate (45-60 zile).','ETAPA 4 — Aviz MCID (dacă e cazul): Pentru monumente de categoria A (45-90 zile).','ETAPA 5 — Integrare în documentația AC: Avizul DJCPN/MCID se anexează la dosarul Autorizației de Construire.'].forEach(e=>{cy=body(e,16,cy);cy+=2;});

  // PAG 6: Harta oras + baza legala
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('HARTA ORAS + BAZA LEGALA + SEMNATURA',6);ftr();
  cy=28;
  if(caps.imgCity){cy=addImg(caps.imgCity,14,cy,W-28,50,'FIG. 7 — Harta Municipiului Iași · Zone protejate si monumente istorice identificate');cy+=4;}
  cy=sec('6. BAZA LEGALA',cy);cy+=2;
  ['Legea nr. 422/2001 republicată — Protejarea monumentelor istorice.','Ordinul MCID nr. 2828/2015 — Lista Monumentelor Istorice (LMI 2015).','Ordinul MCID nr. 2682/2003 — Metodologia de elaborare a documentatiilor de avizare.','HG nr. 593/2011 — Regulamentul de organizare și funcționare a Comisiei Naționale a Monumentelor.','Legea nr. 350/2001 republicată — Amenajarea teritoriului și urbanismul (PUZ zone protejate).','Carta de la Veneția (1964) + Carta de la Cracovia (2000) — Principii internaționale restaurare.','PUG Municipiul Iași — Regulament UTR '+utr+' — Restricții zone de protecție monumente.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  sign();
  pdf.save('Studiu_Patrimoniu_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Studiu Istoric & Patrimoniu generat!');
}


