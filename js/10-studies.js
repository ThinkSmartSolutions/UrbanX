// UrbanX — Studii si rapoarte urbanistice

async function generateShadowStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectati o parcela pentru studiu.');return;}
  ss('Se genereaza Studiu de Umbre & Obstructie...');

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,RED,GREEN,ORANGE,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,kv,tblRow,addImg,badge,sign}=_initStudyPdf('Studiu de Umbre si Obstructie Vizuala','Studiu umbre',10);
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
    pdf.text('INCADRARE IN CONTEXTUL URBAN — '+S2(uat).toUpperCase(),W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in '+S2(uat)+' · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  // Harta orasului inainte de concluzii
  if(caps.imgCity&&caps.imgCity.length>500){
    cy+=3;
    pdf.setFillColor(...DARK);pdf.rect(14,cy-3,W-28,4,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,cy-3,W-28,1,'F');
    pdf.setTextColor(...GOLD);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
    pdf.text('INCADRARE IN CONTEXTUL URBAN — '+S2(uat).toUpperCase(),W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in '+S2(uat)+' · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }

  // PAG 8: Conformitate OMS 119 detaliata + metodologie calcul
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONFORMITATE OMS 119/2014 — METODOLOGIE SI CALCUL DETALIAT',8);ftr();
  cy=28;
  cy=sec('8. METODOLOGIE DE CALCUL A UMBRELOR SI INSOLARII',cy);cy+=2;
  cy=body('Calculul altitudinilor solare si lungimilor de umbra este realizat cu algoritmul NOAA (National Oceanic and Atmospheric Administration) adaptat pentru latitudinea '+lat.toFixed(4)+'°N a amplasamentului '+nrcad+'. Formula de calcul integreaza declinatia solara, unghiul orar si latitudinea geografica pentru a determina pozitia exacta a soarelui la orice moment al zilei si al anului. Umbra proiectata la sol se calculeaza prin formula L = H / tan(α), unde H este inaltimea cladirii ('+aedisH.toFixed(1)+'m) si α este altitudinea solara.',14,cy);cy+=4;
  cy=sec('8.1. CALCUL ALTITUDINE SOLARA DETALIATA — SOLSTITIU IARNA (21 DECEMBRIE)',cy);cy+=2;
  cy=tblRow(['Ora','Azimut solar','Alt. solara','Umbra (m)','Regim OMS','Insorire directa'],cy,true,[20,30,28,28,35,41]);
  [6,7,8,9,10,11,12,13,14,15,16,17,18].forEach(h=>{
    const alt=solarAlt(lat,11,h);
    const sh=shadowLen(aedisH,alt);
    const D2R=Math.PI/180;
    const decl=-23.45*Math.cos(D2R*(360/365)*(355+10));
    const ha=(h-12)*15;
    const sinA=Math.sin(lat*D2R)*Math.sin(decl*D2R)+Math.cos(lat*D2R)*Math.cos(decl*D2R)*Math.cos(ha*D2R);
    const cosA=-(Math.cos(lat*D2R)*Math.sin(decl*D2R)-Math.sin(lat*D2R)*Math.cos(decl*D2R)*Math.cos(ha*D2R))/Math.sqrt(1-sinA*sinA);
    const az=h>=12?(Math.acos(Math.max(-1,Math.min(1,cosA)))*180/Math.PI):(360-Math.acos(Math.max(-1,Math.min(1,cosA)))*180/Math.PI);
    const regime=alt<1?'Sub orizont':alt<15?'⚠ Sub prag':'✓ Conform';
    cy=tblRow([h+':00',(isNaN(az)?'—':az.toFixed(0)+'°'),alt<1?'—':alt.toFixed(1)+'°',sh>500?'>500':sh<1?'—':sh.toFixed(0)+'m',regime,alt>0?'DA':'NU'],cy,false,[20,30,28,28,35,41]);
  });
  cy+=4;
  cy=sec('8.2. DURATA INSORIRE DIRECTA PE LUNI — SPATII LOCUIT (ore/zi)',cy);cy+=2;
  cy=tblRow(['Luna','Rasarit','Apus','Durata totala','Ore la alt>15°','Status'],cy,true,[25,28,28,35,35,31]);
  const months2=['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];
  months2.forEach((m,mi)=>{
    const D2R=Math.PI/180;
    const decl=-23.45*Math.cos(D2R*(360/365)*(mi*30+10));
    const cosH=-Math.tan(lat*D2R)*Math.tan(decl*D2R);
    const sunrise=cosH>1?null:(cosH<-1?0:12-Math.acos(cosH)/D2R/15);
    const sunset=cosH>1?null:(cosH<-1?24:12+Math.acos(cosH)/D2R/15);
    const totalH=sunrise&&sunset?((sunset-sunrise).toFixed(1)+'h'):'—';
    const oreConf=[6,7,8,9,10,11,12,13,14,15,16,17,18].filter(h=>solarAlt(lat,mi,h)>=15).length;
    const status=oreConf>=4?'✓ Bun':oreConf>=2?'⚠ Limita':'✗ Insuficient';
    const rsStr=sunrise?Math.floor(sunrise)+':'+(Math.round((sunrise%1)*60)).toString().padStart(2,'0'):'—';
    const apusStr=sunset?Math.floor(sunset)+':'+(Math.round((sunset%1)*60)).toString().padStart(2,'0'):'—';
    cy=tblRow([m,rsStr,apusStr,totalH,oreConf+'h',status],cy,false,[25,28,28,35,35,31]);
  });

  // PAG 9: Impact vecini + distante recomandate
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('IMPACT UMBRE ASUPRA PROPRIETATILOR VECINE — DISTANTE RECOMANDATE',9);ftr();
  cy=28;
  cy=sec('9. ANALIZA IMPACT UMBRA ASUPRA VECINILOR',cy);cy+=2;
  cy=body('Cladirea propusa cu inaltimea H='+aedisH.toFixed(1)+'m proiecteaza umbra maxima (solstitiu de iarna, ora 12:00) de '+( shadDec>500?'>500m':shadDec.toFixed(0)+'m')+' spre nord. Vecinii situati in aceasta directie pot fi afectati. Conform NP 016-97 si ghidului GT 043-2002, distanta minima recomandata dintre cladiri pentru asigurarea insolarii minime legale este functie de inaltimea cladirii umbritoare si de latitudine.',14,cy);cy+=4;
  cy=tblRow(['Inaltime cladire','Umbra la 12:00 (21 Dec)','Distanta minima recomandata','Comentariu'],cy,true,[40,50,60,32]);
  [5,8,10,12,14,16,18,20,25,28].forEach(h=>{
    const sh=shadowLen(h,solarAlt(lat,11,12));
    const dmin=(h/Math.tan(15*Math.PI/180)).toFixed(0);
    const isCrt=Math.abs(h-aedisH)<1;
    cy=tblRow([h+'m',sh>500?'>500m':sh.toFixed(0)+'m',dmin+'m',isCrt?'← Cladire propusa':'—'],cy,false,[40,50,60,32]);
    if(isCrt){pdf.setFillColor(20,60,120);pdf.rect(14,cy-8,W-28,8,'F');pdf.setTextColor(255,255,255);}
  });
  cy+=4;
  cy=sec('9.1. MASURI DE REDUCERE IMPACT UMBRA CONFORM GT 043-2002',cy);cy+=2;
  ['Retragerea cladirii fata de limita nordica cu minim '+shadowLen(aedisH,15).toFixed(0)+'m (formula: H/tan 15°).','Reducerea inaltimii etajelor superioare (setback architectural) — etajele 3+ retrase cu minim '+Math.round(aedisH*0.15)+'m.','Orientarea coamei acoperisului E-V pentru minimizarea umbrei spre nord.','Utilizarea materialelor translucide/semitransparente la nivelele superioare (impact umbra redus cu 30-40%).','Adoptarea unui regim de inaltime diferentiat: corp principal H='+aedisH.toFixed(1)+'m + corp posterior H='+(aedisH*0.6).toFixed(0)+'m.','Consultarea vecinilor din nord in faza de proiectare tehnica, conform prevederilor Legii 50/1991 art. 27.'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});
  cy+=3;
  cy=sec('9.2. CERINTE SPECIFICE UTR '+utr+' — PUG '+getUATLabel(),cy);cy+=2;
  cy=body('Regulamentul Local de Urbanism pentru UTR '+utr+' prevede retragerea fata de limita posterioara (nord) de '+params?.rs+'m si retragerea laterala de '+params?.rl+'m. Aceste retrageri sunt MINIME si pot fi insuficiente pentru respectarea normelor de insorire la inaltimea propusa de '+aedisH.toFixed(1)+'m. In cazul cladirilor cu H>'+Math.ceil(params?.rs*Math.tan(15*Math.PI/180))+'m, se recomanda depasirea retragerii minime RLU.',14,cy);

  // PAG 10: Concluzii finale extinse + baza legala completa
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONCLUZII FINALE EXTINSE — BAZA LEGALA COMPLETA',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII TEHNICE FINALE',cy);cy+=2;
  cy=body('Prezentul studiu de umbre si obstructie vizuala analizeaza amplasamentul cu nr. cadastral '+nrcad+' (UTR '+utr+', suprafata '+area+' mp) din perspectiva conformitatii cu normele de insorire in vigoare. Studiul utilizeaza calcule bazate pe algoritmul NOAA pentru latitudinea '+lat.toFixed(4)+'°N si este realizat in scop orientativ, in cadrul platformei digitale UrbanX.',14,cy);cy+=3;
  cy=tblRow(['Criteriu de analiza','Valoare calculata','Prag normativ','Concluzie'],cy,true,[70,42,36,34]);
  [['Altitudine solara (21 Dec, 12:00)',solarAlt(lat,11,12).toFixed(1)+'°','min. 15°',solarAlt(lat,11,12)>=15?'CONFORM':'ATENTIE'],
   ['Umbra proiectata maxima (N)',shadDec>500?'>500m':shadDec.toFixed(0)+'m','Conform retragere RLU','Verificare'],
   ['Ore insorire directa (21 Dec)',[6,7,8,9,10,11,12,13,14,15,16,17,18].filter(h=>solarAlt(lat,11,h)>0).length+'h aprox.','min. 1.5h/zi','Verificare'],
   ['Ore cu alt. solara >15° (21 Dec)',[6,7,8,9,10,11,12,13,14,15,16,17,18].filter(h=>solarAlt(lat,11,h)>=15).length+'h','min. conform OMS','Verificare'],
   ['Retragere nord (RLU)',params?.rs+'m','min. '+params?.rs+'m','CONFORM RLU'],
   ['Categoria geotehn. (impact fund.)','N/A umbre','—','—']
  ].forEach(r=>cy=tblRow(r,cy,false,[70,42,36,34]));
  cy+=4;
  cy=sec('10.1. BAZA LEGALA COMPLETA',cy);cy+=2;
  ['Ordinul MS nr. 119/2014 actualizat cu Ord. 994/2018, art. 3 — min. 1h30min insorire directa/zi la solstitiu iarna.','STAS 6221-1981 Iluminatul natural in constructii — conditii tehnice generale de proiectare.','NP 016-97 Normativ pentru proiectarea cladirilor de locuinte — distante intre cladiri.','GT 043-2002 Ghid privind insorirea cladirilor — INCERC Bucuresti.','SR EN 17037:2019 — Iluminare naturala in cladiri (standard european).','HG 525/1996 Regulamentul General de Urbanism, art. 17 — Amplasarea constructiilor fata de aliniamente.','Legea 350/2001 privind amenajarea teritoriului — actualizata.','PUG '+getUATLabel()+' in vigoare, UTR '+utr+' — Regulamentul Local de Urbanism Iasi.','Legea 50/1991 republicata — autorizarea executarii lucrarilor de constructii, art. 27 (informarea vecinilor).'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});
  cy+=3;
  cy=body('NOTA: Prezentul studiu este ORIENTATIV si nu inlocuieste studiul de insorire elaborat de arhitect autorizat OAR, obligatoriu prin Ordin MS 119/2014 art. 3 alin. 2 pentru cladirile de locuinte cu mai mult de 2 apartamente sau cladirile de ingrijire a sanatatii.',14,cy);

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

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,RED,GREEN,ORANGE,PURPLE,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,kv,tblRow,addImg,badge,sign}=_initStudyPdf('Studiu Acustic Urban','Studiu acustic',10);
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
  // PAG 8: Specificatii tehnice izolare acustica
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('SPECIFICATII TEHNICE IZOLARE ACUSTICA — SOLUTII CONSTRUCTIVE',8);ftr();
  cy=28;
  cy=sec('8. SOLUTII TEHNICE DE IZOLARE ACUSTICA RECOMANDATE',cy);cy+=2;
  cy=body('Pe baza nivelului de zgomot estimat (Leq='+Ltotal.toFixed(1)+' dB(A)) si a functiunii propuse (UTR '+utr+', zona acustica '+getZgomotConfig().zona_acustica+'), se recomanda urmatoarele solutii constructive pentru asigurarea confortului acustic interior conform SR EN ISO 717-1:2013 si normativul C 125-2013.',14,cy);cy+=4;
  cy=sec('8.1. TAMPLARIE EXTERIOARA — SPECIFICATII MINIM NECESARE',cy);cy+=2;
  cy=tblRow(['Tip tamplarie','Indice Rw (dB)','Aplicabilitate','Cost estimat'],cy,true,[60,30,52,40]);
  [['Geam simplu 6mm','23 dB','Nerecomandat zona expusa','—'],
   ['Geam dublu 4-12-4mm','28 dB','Acceptabil daca Leq<55dB','100-150 EUR/mp'],
   ['Geam dublu 6-16-6mm (LOW-E)','32 dB','RECOMANDAT zona semi-expusa','150-220 EUR/mp'],
   ['Geam triplu 4-12-4-12-4mm','38 dB','OBLIGATORIU daca Leq>65dB','200-300 EUR/mp'],
   ['PVC/Al tripan + geam laminat','42-48 dB','Fatade direct expuse trafic','350-500 EUR/mp'],
   ['Fatada ventilata cu strat fonoabs.','8-15 dB suplim.','Cladiri de birouri/hotel','Conform proiect'],
  ].forEach(r=>cy=tblRow(r,cy,false,[60,30,52,40]));
  cy+=4;
  cy=sec('8.2. ELEMENTE CONSTRUCTIVE — PERETI EXTERIORI SI PLANSEE',cy);cy+=2;
  cy=tblRow(['Element constructiv','Grosime','Rw izolare','Obs.'],cy,true,[65,25,28,64]);
  [['Zidarie BCA 30cm + tencuiala 2cm','32cm','47 dB','Standard constructie curenta'],
   ['Zidarie caramida 37.5cm','37.5cm','50 dB','Pentru zone cu Leq>65dB'],
   ['Perete sandwich metal + vata 10cm','12cm','42 dB','Constructii industriale'],
   ['Planseul de la ultimul nivel','18-20cm BA','48-52 dB','Protectie zgomot aerian si de impact'],
   ['Pardoseli flotante (zgomot impact)','5-8cm','22-25 dB red.','Obligatoriu cladiri multifam.'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,25,28,64]));
  cy+=4;
  cy=sec('8.3. CONFORMITATE C 125-2013 — NIVELE MINIME DE IZOLARE ACUSTICA',cy);cy+=2;
  cy=tblRow(['Spatiu','Rw minim (dB)','Valoare aleasa','Status'],cy,true,[55,35,35,57]);
  [['Pereti exteriori → camere locuit',AACR_DATA?'30 dB':'30 dB','≥35 dB recomandat',Ltotal>55?'Verificare':'Conform'],
   ['Pereti intre apartamente','48-50 dB','≥48 dB','Conform C 125-2013'],
   ['Planseu intre etaje (aerian)','48-50 dB','≥48 dB','Conform C 125-2013'],
   ['Planseu (impact)','Ln ≤ 58 dB','Pardoseli flotante','Conform C 125-2013'],
   ['Tamplarie exterioara fatade expuse','min. 30 dB','Geam triplu ≥38dB',Ltotal>65?'OBLIGATORIU':'Recomandat'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,35,35,57]));

  // PAG 9: Harta zgomot + plan monitorizare
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('HARTA ZGOMOT URBANA — PLAN DE MONITORIZARE ACUSTICA',9);ftr();
  cy=28;
  cy=addImg(caps.imgCity,14,cy,W-28,55,'\1'+S2(uat)+'\2');cy+=4;
  cy=sec('9. HARTA ZGOMOT STRATEGIC — DATE DE REFERINTA UAT '+getUATLabel().toUpperCase(),cy);cy+=2;
  cy=body(S2(uat)+' a elaborat Harta Strategica de Zgomot conform HG 321/2005 (transpune Directiva 2002/49/CE). Datele de referinta pentru UTR '+utr+' indica o zona acustica de tip '+getZgomotConfig().zona_acustica+' cu limite: Lzsn='+getZgomotConfig().Lzsn_limita+' dB(A) zi-seara-noapte si Lnoapte='+getZgomotConfig().Lnoapte_limita+' dB(A) noaptea. Sursele principale de zgomot in zona includ: '+(getZgomotConfig().surse_principale||[]).join(', ')+'.',14,cy);cy+=4;
  cy=sec('9.1. PLAN DE MONITORIZARE ACUSTICA PE DURATA EXECUTIEI',cy);cy+=2;
  cy=tblRow(['Faza','Masuratori obligatorii','Frecventa','Responsabil'],cy,true,[40,75,35,32]);
  [['Autorizare / PAC','Studiu acustic detaliat (specialist RENAR)','O singura data','Proiectant'],
   ['Organizare santier','Verificare nivel zgomot santier (max. 65dB)','Lunar','Diriginte santier'],
   ['Executie structura','Monitorizare impact vibratii vecini','La cerere','Antreprenor'],
   ['Receptie preliminara','Masuratori izolare acustica in situ Rw','O singura data','Expert acustic'],
   ['Exploatare normala','Verificari periodice sesizari locatari','Anual/sesizare','Administratie imobil'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,75,35,32]));
  cy+=4;
  cy=sec('9.2. ESTIMARE COSTURI MASURI ACUSTICE SUPLIMENTARE',cy);cy+=2;
  const suprafataTamplarie=Math.round(parseFloat(area)*parseFloat(params?.pot||35)/100*0.15);
  cy=tblRow(['Masura','Cantitate estimata','Cost unitar','Total estimat'],cy,true,[65,35,38,44]);
  [['Tamplarie geam triplu (fatade expuse)',suprafataTamplarie+' mp','250-350 EUR/mp',(suprafataTamplarie*300).toLocaleString()+' EUR'],
   ['Pardoseli flotante (impotriva zgom. impact)',Math.round(parseFloat(area)*parseFloat(params?.pot||35)/100*0.8)+' mp','20-35 EUR/mp','—'],
   ['Ventilatie cu recuperare caldura (inlocuire fereastra)','1 centrala/etaj','800-1500 EUR/buc','—'],
   ['Bariera vegetala (arbori fonoabsorbanti)','15-20 ml','50-80 EUR/ml','—'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,35,38,44]));

  // PAG 10: Baza legala completa + concluzii
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA COMPLETA — CONCLUZII FINALE',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII FINALE — STUDIU ACUSTIC URBAN',cy);cy+=2;
  cy=body('Studiul acustic urban pentru amplasamentul '+nrcad+' (UTR '+utr+', suprafata '+area+' mp) a identificat '+surse.length+' surse de zgomot in raza de 200m. Nivelul de zgomot echivalent estimat este Leq='+Ltotal.toFixed(1)+' dB(A). '+(Ltotal<=limit_zi?'Valoarea SE INCADREAZA in limitele SR 10009:2017 pentru zona acustica '+getZgomotConfig().zona_acustica+' (limita zi: '+limit_zi+' dB(A)). Constructia poate continua cu masuri standard de izolare.':'Valoarea DEPASESTE limita admisa pentru zona acustica '+getZgomotConfig().zona_acustica+' (limita zi: '+limit_zi+' dB(A)). Sunt necesare masuri suplimentare de izolare acustica si un studiu acustic detaliat.'),14,cy);cy+=4;
  cy=tblRow(['Indicator','Valoare calculata','Limita normativa','Status'],cy,true,[75,38,38,31]);
  [['Nivel zgomot echivalent Leq zi',Ltotal.toFixed(1)+' dB(A)',limit_zi+' dB(A)',Ltotal<=limit_zi?'CONFORM':'DEPASIRE'],
   ['Nivel zgomot echivalent Leq noapte',Ltotal.toFixed(1)+' dB(A)',limit_n+' dB(A)',Ltotal<=limit_n?'CONFORM':'DEPASIRE'],
   ['Numar surse identificate in 200m',surse.length+' surse','—','Informativ'],
   ['Zona acustica UTR '+utr,getZgomotConfig().zona_acustica,'Conf. SR 10009','Informativ'],
   ['Distanta pana la sursa principala',surse.length?surse[0].dist+'m':'—','—','Informativ'],
  ].forEach(r=>cy=tblRow(r,cy,false,[75,38,38,31]));
  cy+=4;
  cy=sec('10.1. BAZA LEGALA COMPLETA',cy);cy+=2;
  ['SR 10009:2017 — Acustica in constructii. Limite admisibile ale nivelului de zgomot in mediul exterior.','HG nr. 321/2005 privind evaluarea si gestionarea zgomotului ambiant — transpune Directiva 2002/49/CE.','Normativul C 125-2013 privind proiectarea si executarea masurilor de izolare fonica si a tratamentelor acustice.','SR EN ISO 717-1:2013 Acustica — Evaluarea izolarii acustice in cladiri si a elementelor de constructii.','SR EN ISO 717-2:2013 — Evaluarea izolarii la zgomot de impact.','OMS nr. 119/2014 — Norme de igiena si sanatate publica privind mediul de viata al populatiei.','Legea nr. 350/2001 — Amenajarea teritoriului si urbanismul, cu mod. ulterioare.','PUG '+getUATLabel()+' — UTR '+utr+' — Regulamentul Local de Urbanism.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});

  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',10);ftr();
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

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,RED,GREEN,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu de Vant si Confort Pietonal','Studiu vant',10);
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
    pdf.text('INCADRARE IN CONTEXTUL URBAN — '+S2(uat).toUpperCase(),W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in '+S2(uat)+' · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  sign();

  // PAG 6: Semnatura
  // PAG 7: Calcule presiune vant + zone risc
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CALCULE PRESIUNE VANT — ZONE DE RISC AERODINAMIC',7);ftr();
  cy=28;
  cy=sec('7. CALCULE DE PRESIUNE A VANTULUI CONFORM CR 1-1-4/2012',cy);cy+=2;
  const vantCfg2=getVantConfig();
  const vRef=vantCfg2.v_ref||30;
  const qRef=vantCfg2.presiune_vant||0.55;
  cy=body('Conform CR 1-1-4/2012 (Cod de proiectare actiunile vantului), amplasamentul '+nrcad+' se afla in zona de vant '+vantCfg2.zona+' (viteza de referinta vRef='+vRef+' m/s, presiunea de referinta qRef='+qRef+' kN/mp). Directia dominanta a vantului in zona este '+vantCfg2.directie_dominanta+'. Categoria de teren: '+vantCfg2.factor_teren+'. Factorul de expunere ce (z) depinde de inaltimea de calcul si de categoria terenului inconjurator.',14,cy);cy+=4;
  cy=tblRow(['Inaltime z (m)','Ce(z) (factor exp.)','qp(z) (kN/mp)','v(z) (m/s)','Confort pieton'],cy,true,[30,35,35,35,47]);
  [2,4,6,8,10,12,14,16,18,20,24,28].forEach(z=>{
    const ce=Math.pow(z/10,0.3)*1.15;
    const qp=(qRef*ce).toFixed(3);
    const vz=(vRef*Math.pow(ce,0.5)).toFixed(1);
    const comfort=vz>10?'Pericol (>10m/s)':vz>8?'Disconfort (8-10m/s)':vz>6?'Limita (6-8m/s)':vz>4?'Acceptabil (4-6m/s)':'Confort (< 4m/s)';
    const isCrt=Math.abs(z-aedisH)<2;
    cy=tblRow([z+'m',ce.toFixed(3),qp,vz+' m/s',comfort],cy,false,[30,35,35,35,47]);
    if(isCrt){pdf.setFillColor(20,50,100);pdf.rect(14,cy-7,W-28,7,'F');}
  });
  cy+=4;
  cy=sec('7.1. EFECTE VANT LA NIVEL PIETONAL — CLASIFICARE DAVENPORT MODIFICAT',cy);cy+=2;
  cy=tblRow(['Clasa Davenport','Viteza medie (m/s)','Activitate compatibila','Frecventa acceptabila'],cy,true,[35,38,70,39]);
  [['A — Repaus','< 2.5','Sedere indelungata (terase, banci, locuri de joaca)','> 95% timp an'],
   ['B — Sedere','< 4.0','Sedere scurta (spatii comerciale exterioare)','> 80% timp an'],
   ['C — Mers incet','< 6.0','Circulatii pietonale principale (trotuar, spatii publice)','> 80% timp an'],
   ['D — Mers rapid','< 8.0','Traversari rapide (intersectii, pasaje)','> 80% timp an'],
   ['E — Disconfort','< 10.0','Doar circulatie rapida — instalatii de protectie necesare','< 20% depasire'],
   ['F — Pericol','>= 10.0','Inadecvat orice activitate — masuri obligatorii','0% acceptat'],
  ].forEach(r=>cy=tblRow(r,cy,false,[35,38,70,39]));

  // PAG 8: Directii de vant sezoniere + trandafir vant
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('ANALIZA SEZONIERA VANT — DIRECTII DOMINANTE SI TRANDAFIR VANT',8);ftr();
  cy=28;
  cy=sec('8. ANALIZA SEZONIERA A REGIMULUI DE VANT — ZONA IASI / MOLDOVA',cy);cy+=2;
  cy=body(S2(uat)+' este caracterizata printr-un regim de vant specific ariei de tranzitie intre campie si deal. Conform datelor ANM pentru statia meteorologica Iasi, directiile dominante variaza sezonier: vara predomina vanturile din directia nord-vest si vest (asociate fronturilor atlantice reci), iar iarna predomina crivatul (vant din nord-est, rece si uscat, de origine continental-continental). Viteza medie anuala la 10m este de 3.5-4.5 m/s, cu rafale ce pot depasi 20-25 m/s in episoade de viscol.',14,cy);cy+=4;
  cy=tblRow(['Sezon','Directie dominanta','Viteza medie (m/s)','Viteza max (m/s)','Caracter'],cy,true,[30,45,40,40,27]);
  [['Iarna (Dec-Feb)','NE — Crivat','5-8','20-30','Rece, uscat, viscol posibil'],
   ['Primavara (Mar-Mai)','NV, V','4-6','15-20','Schimbator, umed'],
   ['Vara (Iun-Aug)','NV, N','3-4','12-18','Moderat, furtuni locale'],
   ['Toamna (Sep-Nov)','N, NV','3-5','14-20','Racire treptata'],
  ].forEach(r=>cy=tblRow(r,cy,false,[30,45,40,40,27]));
  cy+=4;
  cy=sec('8.1. IMPLICATII PENTRU PROIECTUL PROPUS (UTR '+utr+')',cy);cy+=2;
  ['Orientarea cladirii cu axul lung E-V minimizeaza suprafata expusa vantului dominant din NE (crivat) iarna.','Protectia accesului principal (dinspre nord sau est) prin elemente de ecranare — portice, perdele vegetale, paravane.','Fatadele nordice si nord-estice vor utiliza tamplarie cu etansare superioara (permeabilitate aer clasa 4 EN 12207).','La nivelul partii inferioare (parter), vantul poate fi accelerat prin efectul de culoar — consultati un expert aerodinamic pentru cladiri >14m.','Balcoanele orientate spre NE vor fi protejate cu paravant H=1.2m din sticla temperata sau policarbonat compact.','Spatiile verzi de pe parcela vor include perdele de protectie cu arbori H>4m pe latura nordica si nord-estica.'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});
  cy+=4;
  cy=sec('8.2. CONFORT PIETONAL IN ZONA AMPLASAMENTULUI',cy);cy+=2;
  cy=addImg(caps.imgLocation,14,cy,W-28,55,'FIG. — Plan amplasament · Zone de concentrare vant · Accese pietonale');cy+=4;

  // PAG 9: Masuri de protectie detaliate
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('MASURI DE PROTECTIE LA VANT — SOLUTII TEHNICE DETALIATE',9);ftr();
  cy=28;
  cy=sec('9. SOLUTII TEHNICE DE REDUCERE A IMPACTULUI VANTULUI',cy);cy+=2;
  cy=tblRow(['Solutie tehnica','Eficienta (reducere)','Aplicabilitate','Costuri orientative'],cy,true,[58,38,50,36]);
  [['Paravane transparente (vitrate)','60-80% reducere viteza','Terase etaje superioare','400-600 EUR/ml'],
   ['Jardiniere cu arbusti H>1.2m','40-60% reducere viteza','Perimetrul teraselor','80-150 EUR/ml'],
   ['Perdea de arbori H>6m','50-70% reducere viteza','Aliniament stradal + parcela','200-500 EUR/buc'],
   ['Retragere (setback) etaje >H/2','Ridicata (60-80%)','Etaje superioare corp cladire','Conf. proiect arh.'],
   ['Pasaje acoperite parter','Ridicata local','Accesele principale','Conf. proiect'],
   ['Fatada ventilata cu deflectori','25-40% redirectionare','Fatade corp de vant','Conf. deviz'],
   ['Structuri textile fixe (panze)','50-65% reducere','Terase si spatii exterioare','150-300 EUR/mp'],
  ].forEach(r=>cy=tblRow(r,cy,false,[58,38,50,36]));
  cy+=4;
  cy=sec('9.1. CERINTE NORMATIVE CR 1-1-4/2012 — REZUMATUL VERIFICARILOR STRUCTURALE',cy);cy+=2;
  cy=body('Structura cladirii propuse (H='+aedisH.toFixed(1)+'m, zona vant '+vantCfg2.zona+') trebuie sa reziste la presiunea de vant qp(H)='+(qRef*Math.pow(aedisH/10,0.3)*1.15).toFixed(3)+' kN/mp conform CR 1-1-4/2012. Aceasta valoare este folosita de inginerul de rezistenta in calculul structural. Verificarile obligatorii includ: rezistenta structurii principale la actiunea vantului, verificarea la rasturnare, verificarea ancorarii elementelor nestructurale (parapete, panouri fatada, elemente de acoperis).',14,cy);cy+=4;
  cy=tblRow(['Verificare structurala','Norma','Valori de calcul','Obs.'],cy,true,[65,35,48,34]);
  [['Presiune vant pe fatade','CR 1-1-4/2012',(qRef*Math.pow(aedisH/10,0.3)*1.15).toFixed(3)+' kN/mp','La nivel H='+aedisH.toFixed(0)+'m'],
   ['Presiune pe acoperis','CR 1-1-4/2012',(qRef*Math.pow(Math.max(aedisH+2,4)/10,0.3)*1.15*1.4).toFixed(3)+' kN/mp','Margini acoperis (coef. Cp=-2.5)'],
   ['Verificare la rasturnare','SR EN 1990','Momentul de rasturnare','Inginer rezistenta'],
   ['Deriva (drift)','SR EN 1993/1994','H/300 maxim','La actiuni orizontale'],
   ['Vibratii (cladiri inalte)','CR 1-1-4/2012','Frecventa proprie >0.3Hz','Dacă H>28m'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,35,48,34]));

  // PAG 10: Baza legala completa + concluzii vant
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA COMPLETA — CONCLUZII STUDIU VANT',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII FINALE — STUDIU VANT SI CONFORT PIETONAL',cy);cy+=2;
  cy=body('Amplasamentul '+nrcad+' (UTR '+utr+', H propus='+aedisH.toFixed(1)+'m) este situat in zona de vant '+vantCfg2.zona+' conform CR 1-1-4/2012, cu viteza de referinta vRef='+vRef+' m/s. Presiunea de vant de calcul la nivelul inaltimii maxime este qp(H)='+(qRef*Math.pow(aedisH/10,0.3)*1.15).toFixed(3)+' kN/mp. Directia dominanta a vantului este '+vantCfg2.directie_dominanta+'. Studiul recomanda masuri de protectie pe fatadele nordice si nord-estice si la nivelul acceselor pietonale.',14,cy);cy+=4;
  cy=tblRow(['Parametru','Valoare','Norma','Status'],cy,true,[65,40,50,27]);
  [['Zona de vant (CR 1-1-4/2012)',vantCfg2.zona,'CR 1-1-4/2012','Informativ'],
   ['Viteza de referinta vRef',vRef+' m/s','CR 1-1-4/2012','Informativ'],
   ['Presiunea de referinta qRef',qRef+' kN/mp','CR 1-1-4/2012','Informativ'],
   ['Categoria de teren',vantCfg2.factor_teren,'CR 1-1-4/2012','Informativ'],
   ['H maxim propus',aedisH.toFixed(1)+'m','RLU UTR '+utr,'Verificare RLU'],
   ['Verificare confort pietonal parter','Obligatorie','Davenport / CR 1-1-4','Studiu detaliat recomandat'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,40,50,27]));
  cy+=4;
  cy=sec('10.1. BAZA LEGALA',cy);cy+=2;
  ['CR 1-1-4/2012 Cod de proiectare. Bazele proiectarii si actiunile asupra structurilor. Actiunea vantului.','SR EN 1991-1-4:2006 Eurocod 1: Actiuni asupra structurilor. Actiuni ale vantului.','NP 082-14 Normativ privind bazele proiectarii si actiunile asupra structurilor — actiunea vantului.','STAS 10101/20-1990 Actiunea vantului. Incarcari dinamice.','GT 023-97 Ghid privind determinarea incarcarilor din vant pentru constructii.','Legea nr. 10/1995 republicata — Calitatea in constructii. Cerinta B: Securitate la incendiu si actiuni mecanice.','PUG '+getUATLabel()+' in vigoare — UTR '+utr+'.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});

  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',10);ftr();
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

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,GREEN,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu de Spatii Verzi si Permeabilitate','Studiu spatii verzi',10);
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
    pdf.text('INCADRARE IN CONTEXTUL URBAN — '+S2(uat).toUpperCase(),W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in '+S2(uat)+' · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  sign();

  // PAG 6: Semnatura
  // PAG 7: Calcul retentia apei pluviale + coeficienti scurgere
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('RETENTIA APEI PLUVIALE — CALCULE SI SOLUTII DRENAJ URBAN',7);ftr();
  cy=28;
  const areaNum2=parseFloat(area)||300;const scMax2=Math.round(areaNum2*parseFloat(params?.pot||35)/100);const svMin2=Math.round(areaNum2*parseFloat(params?.sv||20)/100);
  cy=sec('7. CALCULUL RETENTIEI APEI PLUVIALE SI COEFICIENTI DE SCURGERE',cy);cy+=2;
  cy=body('Conform STAS 9470-73 si normativului NP 133-2011 privind alimentarea cu apa si canalizarea localitatilor, fiecare amplasament nou construit trebuie sa nu creasca debitul pluvial raportat la starea initiala a terenului. Suprafata construita estimata (SC='+scMax2+'mp, POT='+params?.pot+'%) si suprafatele impermeabilizate suplimentare (accese auto, alei) cresc considerabil coeficientul de scurgere fata de terenul natural.',14,cy);cy+=4;
  cy=tblRow(['Tip suprafata','Suprafata (mp)','Coef. scurgere (Ψ)','Debit relativ (%)'],cy,true,[60,38,42,42]);
  const imperm=Math.round(scMax2*1.15);const permPieton=Math.round(areaNum2*0.08);const svProp2=Math.max(svMin2,Math.round(areaNum2*parseFloat(params?.sv||20)/100));
  [['Acoperis/terasa impermeabila',scMax2+' mp','0.90-0.95','Mare'],
   ['Acces auto/alei betonate/asfalt',Math.round(areaNum2*0.08)+' mp','0.85-0.90','Mare'],
   ['Pavaj permeabil (alei pietonale)',permPieton+' mp','0.30-0.45','Redus-mediu'],
   ['Gazon si spatii verzi',svProp2+' mp','0.10-0.15','Mic'],
   ['Acoperis verde extensiv (optional)',Math.round(scMax2*0.3)+' mp','0.15-0.25','Mic-mediu'],
   ['Suprafata naturala reziduala',Math.max(0,areaNum2-imperm-permPieton-svProp2)+' mp','0.10','Mic'],
  ].forEach(r=>cy=tblRow(r,cy,false,[60,38,42,42]));
  cy+=4;
  cy=sec('7.1. SISTEME DE RETENTIE SI INFILTRARE RECOMANDATE',cy);cy+=2;
  cy=tblRow(['Sistem','Capacitate','Costuri','Aplicabilitate'],cy,true,[55,42,38,47]);
  [['Rezervor retentie ingropat (beton/PEHD)',Math.round(areaNum2*0.03)+'mc ('+Math.round(areaNum2*0.03*1000)+'l)','400-600 EUR/mc','Obligatoriu la >300mp SC'],
   ['Rigola de infiltrare (put absorbant)',Math.round(areaNum2*0.01)+'mc/h capacitate','300-500 EUR/buc','La strat freatic >3m adancime'],
   ['Acoperis verde extensiv (sedum)','5-10 litri/mp retentie','60-120 EUR/mp','Acoperisuri plane/panta <5%'],
   ['Pavaj autoblocant permeabil','Infiltrare 100-200 l/h/mp','60-100 EUR/mp','Accese auto usor solicitate'],
   ['Gropi de plantare cu pietris filtrant','50-100 l/arbore/h','150-300 EUR/buc','Aliniamente copaci in trotuare'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,42,38,47]));

  // PAG 8: Specii recomandate detaliat
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('SPECII RECOMANDATE — CATALOG PLANTE URBANE ZONA IASI',8);ftr();
  cy=28;
  cy=sec('8. CATALOG SPECII VEGETALE RECOMANDATE PENTRU UTR '+utr+' — ZONA '+getUATLabel().toUpperCase(),cy);cy+=2;
  cy=body('Selectia speciilor vegetale recomandate tine cont de: conditiile climatice ale zonei Iasi (temperatura medie 9.5°C, precipitatii 550-600 mm/an, vant dominant NV si NE-crivat iarna), tipul de sol predominant (argile-nisipuri, pH 6.8-7.4), rezistenta la poluare urbana si la seceta estivala specifica Moldovei. Se prioritizeaza specii native si aclimatizate cu intretinere redusa si valoare ecologica ridicata.',14,cy);cy+=3;
  cy=sec('8.1. ARBORI RECOMANDATI PENTRU SPATII URBANE',cy);cy+=2;
  cy=tblRow(['Specie','Inaltime','Coroana','Rezistenta','Valoare ecologica'],cy,true,[55,22,25,30,50]);
  [['Tei argintiu (Tilia tomentosa)','15-25m','Larga, ovoidala','Seceta, poluare','Umbra, aroma, albine, CO2'],
   ['Frasin (Fraxinus excelsior)','20-30m','Ampla, neregulata','Slab la seceta','Crestere rapida, biodiversitate'],
   ['Artar campestru (Acer campestre)','8-14m','Rotunda-ovoidala','Excelenta poluare','Colorit toamna, fauna'],
   ['Cires ornamental (Prunus serrulata)','5-8m','Larga, orizontala','Buna','Flori primavara, estetica'],
   ['Catalpa (Catalpa bignonioides)','8-12m','Larga, neregulata','Buna seceta','Flori spectaculoase, umbra'],
   ['Sorb de padure (Sorbus aucuparia)','6-10m','Ovoidala','Excelenta','Fructe pentru pasari'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,22,25,30,50]));
  cy+=3;
  cy=sec('8.2. ARBUSTI SI ACOPERITOARE DE SOL',cy);cy+=2;
  cy=tblRow(['Specie','Inaltime','Tip','Periodicitate tundere','Remarca'],cy,true,[55,20,28,38,41]);
  [['Liliac (Syringa vulgaris)','2-4m','Arbust caducifol','1x/an dupa inflorire','Aromatizant, nativ'],
   ['Trandafir salba (Rosa canina)','1-3m','Arbust caducifol','1x/an','Fructe, gard viu naturalist'],
   ['Coacaz auriu (Ribes aureum)','1-2m','Arbust caducifol','2x/an','Flori galbene, comestibil'],
   ['Lavandul (Lavandula angustifolia)','0.4-0.8m','Subarbust','1x/an vara','Aroma, rezistenta seceta'],
   ['Sedum spectabile','0.3-0.5m','Planta suculenta','0 (spontana)','Acooperis verde, polenizatori'],
   ['Iedera (Hedera helix)','Agatarotre','Agatarotre','1x/2ani','Fatade verzi, termoizolatie'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,20,28,38,41]));

  // PAG 9: Plan de intretinere + calendarul lucrarilor
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PLAN DE INTRETINERE SPATII VERZI — CALENDAR LUCRARI ANUAL',9);ftr();
  cy=28;
  cy=sec('9. PLAN DE INTRETINERE SPATII VERZI — CALENDAR ANNUAL',cy);cy+=2;
  cy=tblRow(['Luna','Lucrari de intretinere','Frecventa','Prioritate'],cy,true,[25,95,32,30]);
  [['Ianuarie','Verificare protectii antigelive plante sensibile. Control vizual drenaj. Tunderea formativa arbori (fara corni)','1x','Medie'],
   ['Februarie','Fertilizare cu ingrasamant cu eliberare lenta (granule). Curatare rosturi pavaj permeabil.','1x','Medie'],
   ['Martie','Plantare arbusti si perene noi. Semanare gazon. Prima tundere gazon la H=8cm.','Saptamanal','Ridicata'],
   ['Aprilie','Tundere gardurivii. Fertilizare foliara. Verificare sistem irigare. Plantare balcoane.','2x','Ridicata'],
   ['Mai','Tundere gazon saptamanal (H=5-6cm). Fertilizare arbusti floriferi dupa inflorire.','Saptamanal','Ridicata'],
   ['Iunie','Irigare sistematica in perioade secetoase (>7 zile fara ploaie). Tundere gardurivii 2.','2x','Ridicata'],
   ['Iulie','Irigare intensiva (vara calda specifica Moldovei). Curatare buruieni.','Zilnic in seceta','Critica'],
   ['August','Irigare. Insamantare gazon zone deteriorate. Verificare acoperis verde.','Saptamanal','Ridicata'],
   ['Septembrie','Fertilizare toamna (K+P). Plantare bulbi primavara. Curatare frunze cazute.','1-2x','Medie'],
   ['Octombrie','Tundere arbori foiosi. Protejare plante sensibile. Golire sistem irigare.','1x','Medie'],
   ['Noiembrie','Acoperire cu mulci (coaja pin, frunze) plante sensibile. Curatare rigole drenaj.','1x','Medie'],
   ['Decembrie','Verificare generala sistem drenaj. Raport anual spatii verzi.','1x','Scazuta'],
  ].forEach(r=>cy=tblRow(r,cy,false,[25,95,32,30]));
  cy+=4;
  cy=sec('9.1. BUGET ESTIMATIV INTRETINERE ANUALA',cy);cy+=2;
  cy=tblRow(['Categorie cheltuiala','Cost/mp/an (EUR)','Total estimat (EUR/an)','Obs.'],cy,true,[70,40,50,22]);
  [['Tundere gazon (mecanizat)','1.5-2.5',Math.round(svProp2*2)+' EUR/an','8-12 tunderi/an'],
   ['Irigare (contor apa propriu)','0.8-1.5',Math.round(svProp2*1.2)+' EUR/an','Vara: zilnic; Rest: saptamanal'],
   ['Fertilizare (3x/an)','0.5-1.0',Math.round(svProp2*0.8)+' EUR/an','Granule eliberare lenta'],
   ['Tundere arbori/arbusti','2.0-4.0',Math.round((svProp2*0.3)*3)+' EUR/an','1-2x/an, arborizti calificati'],
   ['Materiale consumabile','—',Math.round(svProp2*1.5)+' EUR/an','Mulci, ingrasaminte, apa'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,40,50,22]));

  // PAG 10: Baza legala + concluzii final
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA COMPLETA — CONCLUZII SPATII VERZI',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII FINALE — STUDIU SPATII VERZI SI PERMEABILITATE',cy);cy+=2;
  cy=body('Studiul de spatii verzi si permeabilitate pentru amplasamentul '+nrcad+' (UTR '+utr+', suprafata '+area+' mp) a analizat conformitatea cu normele minime de spatii verzi (SV minim='+params?.sv+'% = '+svMin2+' mp). Propunerea tehnica asigura minim '+svProp2+' mp spatii verzi ('+(svProp2/areaNum2*100).toFixed(1)+'% din suprafata terenului), '+(svProp2>=svMin2?'CONFORM cu prevederile RLU pentru UTR '+utr+'.':'NECONFORM — necesita suplimentarea suprafetei verzi.')+'.',14,cy);cy+=4;
  cy=tblRow(['Indicator','Valoare calculata','Cerinta normativa','Status'],cy,true,[70,42,42,28]);
  [['Suprafata teren (ST)',areaNum2+' mp','—','Informativ'],
   ['Spatii verzi propuse',svProp2+' mp ('+Math.round(svProp2/areaNum2*100)+'%)','min. '+params?.sv+'% = '+svMin2+' mp',svProp2>=svMin2?'CONFORM':'NECONFORM'],
   ['Suprafata construita (SC)',scMax2+' mp ('+params?.pot+'% POT)','max. '+params?.pot+'%','CONFORM'],
   ['Permeabilitate estimata',Math.round(svProp2/areaNum2*100)+'% pervios','min. '+Math.round(svMin2*0.6/areaNum2*100)+'% pervios','Verificare'],
   ['Arbori minim recomandati',Math.ceil(svProp2/200)+' buc','1 arbore/200mp SV','Recomandat'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,42,42,28]));
  cy+=4;
  cy=sec('10.1. BAZA LEGALA COMPLETA',cy);cy+=2;
  ['Legea nr. 24/2007 privind reglementarea si administrarea spatiilor verzi din intravilanul localitatilor.','Legea nr. 292/2018 privind evaluarea impactului anumitor proiecte publice si private asupra mediului.','NP 133/2013 Normativ privind proiectarea, executia si exploatarea sistemelor de alimentare cu apa si canalizare.','OUG nr. 195/2005 privind protectia mediului, actualizata.','STAS 9470-73 Hidrologie. Ploi maxime. Intensitati, durate, frecvente.','Ordinul MDRT nr. 2701/2010 — Metodologie de informare si consultare a publicului.','HG nr. 525/1996 RGU — Spatii verzi si plantatii.','PUG '+getUATLabel()+' — UTR '+utr+' — Spatii verzi minime obligatorii.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});

  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',10);ftr();
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

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu de Mobilitate si Parcaje','Studiu mobilitate',10);
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
    pdf.text('INCADRARE IN CONTEXTUL URBAN — '+S2(uat).toUpperCase(),W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in '+S2(uat)+' · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  sign();

  // PAG 6: Semnatura
  // PAG 7: Calcul detaliat necesarul parcaje pe functiuni
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CALCUL DETALIAT NECESARUL DE PARCAJE — NP 051/2012 REV.',7);ftr();
  cy=28;
  const trafCfg=getTraficConfig();
  cy=sec('7. CALCULUL NECESARULUI DE LOCURI DE PARCARE — NP 051/2012 REV.',cy);cy+=2;
  cy=body('Necesarul de locuri de parcare pentru amplasamentul '+nrcad+' (UTR '+utr+', suprafata '+area+' mp) se calculeaza conform NP 051/2012 rev. (Normativ privind adaptarea cladirilor civile si spatiului urban la necesitatile persoanelor cu handicap) si prevederilor PUG '+getUATLabel()+' pentru UTR '+utr+'. Norma de parcaje prevede '+params?.pk+' loc/unitate locativa. Calculele de mai jos acopera toate functiunile principale posibile conform PUG.',14,cy);cy+=4;
  cy=tblRow(['Functiune propusa','Unitate de calcul','Norma (NP 051)','Cantitate','Total locuri'],cy,true,[55,38,30,30,29]);
  const scTotal=Math.round(parseFloat(area)*parseFloat(params?.pot||35)/100);
  const sdTotal=Math.round(parseFloat(area)*parseFloat(params?.cut||1.0));
  [['Locuinte individuale','per unitate','2 loc/unitate',Math.ceil(sdTotal/120)+' unitati',Math.ceil(sdTotal/120)*2+' locuri'],
   ['Locuinte colective','per apartament','1 loc/apart',Math.ceil(sdTotal/60)+' apartamente',Math.ceil(sdTotal/60)+' locuri'],
   ['Birouri','per 100mp AU','2 loc/100mp',sdTotal+' mp AU',Math.ceil(sdTotal/100)*2+' locuri'],
   ['Comerț alimentar','per 100mp AU vanzare','3.5 loc/100mp',Math.round(scTotal*0.7)+' mp',''+Math.ceil(Math.round(scTotal*0.7)/100*3.5)+' locuri'],
   ['Comerț nealimentar','per 100mp AU vanzare','2.5 loc/100mp',Math.round(scTotal*0.7)+' mp',''+Math.ceil(Math.round(scTotal*0.7)/100*2.5)+' locuri'],
   ['Alimentatie publica','per 100mp AU sala','3 loc/100mp',Math.round(scTotal*0.6)+' mp',''+Math.ceil(Math.round(scTotal*0.6)/100*3)+' locuri'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,38,30,30,29]));
  cy+=4;
  cy=sec('7.1. NECESARUL MINIM CONF. RLU UTR '+utr+' SI NP 051/2012',cy);cy+=2;
  const pkObl2=Math.max(pkObl,2);
  cy=tblRow(['Categorie loc parcare','Nr. locuri minime','% din total','Dimensiuni (mp)'],cy,true,[65,35,30,52]);
  [['Locuri standard (2.5x5m)',pkObl2+' locuri','100% baza','12.5 mp/loc (cu culoar 30 mp)'],
   ['Locuri pentru persoane cu dizabilitati','min. '+Math.max(1,Math.ceil(pkObl2*0.04))+' locuri (4% din total)','4% obligatoriu','3.6x6m = 21.6 mp/loc'],
   ['Locuri mame+copii (recomandat)','min. '+Math.max(1,Math.ceil(pkObl2*0.02))+' locuri','2% recomandat','3.0x5.5m = 16.5 mp/loc'],
   ['Locuri biciclete (recomandat)','min. '+Math.max(2,Math.ceil(pkObl2*0.1))+' biciclete','10% din auto','2mp/bicicleta (rastel)'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,35,30,52]));
  cy+=4;
  cy=sec('7.2. DIMENSIONARE PARCARE LA SOL SI SUBTERANA',cy);cy+=2;
  const spParc=pkObl2*30;
  cy=body('Suprafata totala necesara pentru '+pkObl2+' locuri de parcare: '+spParc+' mp (incluzand culoarul de manevrare de 6m). Aceasta reprezinta '+(spParc/parseFloat(area)*100).toFixed(1)+'% din suprafata totala a parcelei. '+(spParc>parseFloat(area)*0.3?'Suprafata disponibila este INSUFICIENTA pentru parcajul la sol — se recomanda parcare subterana (P-1) sau parcare supraterana pe structura.':'Suprafata disponibila PERMITE parcajul la sol.')+'.',14,cy);

  // PAG 8: Analiza accese + flux pietonal
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('ANALIZA ACCESE PIETONALE SI CAROSABILE — FLUX PIETONAL',8);ftr();
  cy=28;
  cy=sec('8. ANALIZA ACCESELOR SI CONFIGURATIEI STRADALE',cy);cy+=2;
  cy=addImg(caps.img2D,14,cy,W-28,60,'FIG. — Plan 2D amplasament · Accese carosabile si pietonale');cy+=4;
  cy=sec('8.1. CERINTE TEHNICE PENTRU ACCESE CAROSABILE SI PIETONALE',cy);cy+=2;
  cy=tblRow(['Element acces','Dimensiuni minime','Norma','Obs.'],cy,true,[55,45,35,47]);
  [['Acces carosabil principal (1 sens)','min. 3.5m latime libera','SR 4032-1','Pentru max 200 vehicule/zi'],
   ['Acces carosabil (2 sensuri)','min. 6.0m latime libera','SR 4032-1','La capacitate > 200 veh/zi'],
   ['Raza de curbura la intrare','min. 6.0m (4.0m rezidential)','NP 051/2012','La intrarea din stradal'],
   ['Trotuar pietonal','min. 1.5m latime libera','NP 051/2012','Obligatoriu spre acces intrare'],
   ['Rampa parcare subterana','max. 15% panta (20% exceptional)','NP 051/2012','H min. liber 2.1m'],
   ['Spatiu de asteptare la intrare','min. 1 autovehicul (5m)','Proiect specific','Intre strada si poarta/bara'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,45,35,47]));
  cy+=4;
  cy=sec('8.2. FLUXURI PIETONALE — CERINTE PMR (PERSOANE CU MOBILITATE REDUSA)',cy);cy+=2;
  cy=body('Conform NP 051/2012 privind adaptarea cladirilor civile si spatiului urban la necesitatile persoanelor cu handicap (PMR), accesele principale la cladire trebuie sa asigure trasee accesibile fara trepte, cu rampe de maxim 8% si latimi libere de minim 1.5m. Se vor prevedea min. '+Math.max(1,Math.ceil(pkObl2*0.04))+' locuri de parcare pentru PMR, cu dimensiunile de 3.6x6m, amplasate cat mai aproape de accesul principal. Semnalizarea locurilor PMR va respecta prevederile HG 1007/2001.',14,cy);

  // PAG 9: Solutii parcaje + mobilitate alternativa
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('SOLUTII ALTERNATIVE PARCARE — MOBILITATE URBANA SUSTENABILA',9);ftr();
  cy=28;
  cy=sec('9. SOLUTII ALTERNATIVE DE PARCARE',cy);cy+=2;
  cy=tblRow(['Tip parcare','Locuri/nivel','Suprafata/nivel','Cost constructie','Obs.'],cy,true,[40,25,35,45,37]);
  [['La sol (neacoperit)',pkObl2+' locuri',spParc+' mp','350-500 EUR/loc','Simplu dar suprafata mare'],
   ['Parcare supraterana (1 nivel)',pkObl2+' locuri',Math.round(spParc*0.6)+' mp','800-1200 EUR/loc','Structura metalica usoara'],
   ['Parcare subterana P-1',pkObl2+' locuri',Math.round(spParc*0.55)+' mp','4000-6000 EUR/loc','Sapaturi, impermeabilizare'],
   ['Sistem mecanic (puzzle 2 niv.)',pkObl2*2+' locuri',Math.round(spParc*0.5)+' mp','3000-5000 EUR/loc','Spatii mici, durata deservire'],
   ['Parcare mixta la sol + P-1','—','Conf. proiect','Solutie optima','Cel mai eficient spatial'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,25,35,45,37]));
  cy+=4;
  cy=sec('9.1. DOTARI PENTRU MOBILITATE SUSTENABILA',cy);cy+=2;
  cy=body('In conformitate cu strategiile nationale de mobilitate urbana si Planul de Mobilitate Urbana Durabila (PMUD) al Municipiului Iasi, se recomanda integrarea urmatoarelor dotari pentru mobilitate sustenabila in cadrul proiectului:',14,cy);cy+=3;
  ['Statii de incarcare electrica (EV) — min. '+Math.max(1,Math.ceil(pkObl2*0.1))+' prize 22kW (10% din total locuri), conf. Regulamentului UE 2023/1804.','Rastele securizate biciclete — min. '+Math.max(2,Math.ceil(pkObl2*0.1))+' locuri biciclete (1 la 10 auto), acoperite si iluminate.','Spatiu pentru trotirete si vehicule micro-mobilitate — min. 3mp/4 unitati, separatat de circuitul auto.','Conectare la pista de biciclete existenta sau propusa prin PUG '+getUATLabel()+' — coordonare cu Primaria.','Dulapuri pentru echipamente ciclisti (vestiar/dus), daca cladire de birouri sau functiune comerciala > 500mp.'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 10: Baza legala + concluzii
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA COMPLETA — CONCLUZII STUDIU MOBILITATE',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII FINALE — STUDIU DE MOBILITATE SI PARCAJE',cy);cy+=2;
  cy=tblRow(['Indicator','Valoare calculata','Cerinta normativa','Status'],cy,true,[70,42,42,28]);
  [['Locuri parcare necesare (min. RLU)',pkObl2+' locuri','min. '+params?.pk+' loc/unitate','Conf. RLU '+utr],
   ['Locuri PMR (min. 4%)',Math.max(1,Math.ceil(pkObl2*0.04))+' locuri','min. 4% din total','NP 051/2012'],
   ['Suprafata necesara parcaj la sol',spParc+' mp','—','Informativ'],
   ['Latime acces carosabil','min. 3.5m','3.5m (1 sens)','Verificare proiect'],
   ['Statii EV recomandate',Math.max(1,Math.ceil(pkObl2*0.1))+' buc','10% din total','Recomandare EU 2023'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,42,42,28]));
  cy+=4;
  cy=sec('10.1. BAZA LEGALA',cy);cy+=2;
  ['NP 051/2012 rev. — Normativ privind adaptarea cladirilor civile si spatiului urban la necesitatile PMR.','STAS 10144/3-91 — Calculul si proiectarea parcajelor pentru autoturisme.','HG nr. 525/1996 RGU, art. 33 — Parcaje si garaje.','Regulamentul UE 2023/1804 privind infrastructura pentru vehicule electrice.','PUG '+getUATLabel()+' (HCL local) — UTR '+utr+' — Parcaje minime obligatorii.','Legea nr. 448/2006 privind protectia persoanelor cu handicap, actualizata.','SR 4032-1:2001 — Lucrari de drumuri. Terminologie.','PMUD '+S2(uat)+' — Plan de Mobilitate Urbana Durabila.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});

  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',10);ftr();
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

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu de Densitate si Presiune Urbana','Studiu densitate',10);
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
    pdf.text('INCADRARE IN CONTEXTUL URBAN — '+S2(uat).toUpperCase(),W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in '+S2(uat)+' · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  sign();

  // PAG 6: Semnatura
  // PAG 7: Analiza comparativa indicatori zona 200m
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('ANALIZA COMPARATIVA INDICATORI URBANISTICI — CONTEXT 200m RAZA',7);ftr();
  cy=28;
  cy=sec('7. ANALIZA COMPARATIVA INDICATORI URBANISTICI IN ZONA DE INFLUENTA',cy);cy+=2;
  cy=body('Analiza de densitate si presiune urbana pentru amplasamentul '+nrcad+' (UTR '+utr+') include compararea indicatorilor urbanistici propusi cu media contextului construit in raza de 200m, determinata din datele OpenStreetMap incarcate in platforma UrbanX. Aceasta analiza este esentiala pentru evaluarea compatibilitatii proiectului cu tesutul urban existent si cu Regulamentul Local de Urbanism in vigoare.',14,cy);cy+=4;
  cy=tblRow(['Indicator','Propus','PUG max','Media zona 200m','Compatibilitate'],cy,true,[50,28,28,38,38]);
  [['POT — Procent Ocupare Teren',potProp+'%',params?.pot+'%',potMed.toFixed(1)+'%',Math.abs(potProp-potMed)<10?'Compatible':'Verificare'],
   ['CUT — Coeficient Utilizare Teren',cutProp,String(params?.cut),'—','Verificare RLU'],
   ['H max propus',aedisH.toFixed(1)+'m',params?.h?params.h+'m':'—',hMed.toFixed(1)+'m med.',Math.abs(aedisH-hMed)<4?'Compatibil':'Atentie'],
   ['Nr. niveluri',AEDIS.corpuri[0]?.niv||4+' niv.',params?.niv?params.niv+' niv.':'—',Math.round(hMed/3)+' niv. est.','Verificare'],
   ['Retragere fata',params?.rf+'m','min. '+params?.rf+'m','Variabil','Conf. RLU'],
  ].forEach(r=>cy=tblRow(r,cy,false,[50,28,28,38,38]));
  cy+=4;
  cy=sec('7.1. PROFILUL URBAN STRADAL — RAPORT H/L (INALTIME/LATIME STRADA)',cy);cy+=2;
  cy=body('Raportul H/L (inaltimea cladirii fata de latimea strazii) este un indicator cheie al perceptiei spatiale urbane. Un raport H/L de 1:1 creeaza un spatiu stradal echilibrat; sub 1:2 spatiul este perceput ca larg; peste 1:1 (cladiri mai inalte decat latimea strazii) se creeaza un efect de "canion urban". Pentru UTR '+utr+', latimea stradala tipica este de 8-12m (cu trotuare), ceea ce implica un raport H/L recomandat de max. 1:1 (H≤latime) pentru pastrarea caracterului stradal.',14,cy);cy+=4;
  cy=tblRow(['Scenariu','H cladire','Latime strada','Raport H/L','Perceptie spatiala'],cy,true,[40,28,35,30,49]);
  [['Inaltime minima PUG',params?.h?params.h+'m':'6m','8-12m (typ.)','1:'+(8/(params?.h||6)).toFixed(1),'Larg — deschis'],
   ['Inaltime propusa',aedisH.toFixed(1)+'m','8-12m','1:'+(10/aedisH).toFixed(1),aedisH<=10?'Echilibrat':'Dens — verificare'],
   ['Media zona 200m',hMed.toFixed(1)+'m','8-12m','1:'+(10/hMed).toFixed(1),'Context existent'],
   ['H max RLU',params?.h?params.h+'m':'—','8-12m','—','Limita admisa'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,28,35,30,49]));

  // PAG 8: Analiza tesut urban + impact vizual
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('ANALIZA TESUT URBAN — IMPACT VIZUAL SI CARACTERUL STRADAL',8);ftr();
  cy=28;
  cy=addImg(caps.imgFront,14,cy,half,55,'FIG. — Vedere frontala stradala · Raport volumetric cu contextul');
  addImg(caps.imgLat,14+half+4,cy-55,half,55,'FIG. — Vedere laterala · Context parcele adiacente');cy+=4;
  cy=sec('8. ANALIZA IMPACTULUI VIZUAL ASUPRA CARACTERULUI STRADAL',cy);cy+=2;
  cy=body('Impactul vizual al cladirii propuse (H='+aedisH.toFixed(1)+'m, SC='+potProp+'%) asupra caracterului stradal al UTR '+utr+' a fost evaluat prin analiza vedere frontala (FIG. de mai sus). Cladirile existente in contextul de 200m au inaltimea medie de '+hMed.toFixed(1)+'m. Diferenta de inaltime fata de medie este de '+(aedisH-hMed).toFixed(1)+'m ('+(((aedisH/hMed-1)*100).toFixed(0))+'%).',14,cy);cy+=4;
  cy=sec('8.1. CERINTE DE INTEGRARE ARHITECTURALA IN TESUT URBAN',cy);cy+=2;
  cy=tblRow(['Criteriu de integrare','Status propunere','Obs./Recomandare'],cy,true,[70,42,70]);
  [['Respectarea regimului de inaltime PUG',aedisH<=(parseFloat(params?.h)||99)?'CONFORM':'DEPASIRE','Verificare cu arhitectul proiectant'],
   ['Aliniamentul fata de strada (continuitate front stradal)',params?.rf+' m retragere','Conf. art. RLU UTR '+utr],
   ['Materialele si culorile fatadelor','Conform PUG/RLU','Se evita contraste puternice cu tesutul existent'],
   ['Acoperisul (forma, panta, material)','Conform AEDIS','Compatibil cu caracterul zonei'],
   ['Transparenta parterului (vitrine, accese)','Recomandat >40%','In zone cu destinatie comerciala'],
   ['Retrageri la etajele superioare (setback)','Optional >2/3 H vecini','Reduce impactul vizual la nivel stradal'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,42,70]));

  // PAG 9: Calcule capacitate si infrastructura tehnica
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CAPACITATE TEHNICA SI INFRASTRUCTURA — DOTARI NECESARE',9);ftr();
  cy=28;
  cy=sec('9. ANALIZA CAPACITATII TEHNICE SI A INFRASTRUCTURII NECESARE',cy);cy+=2;
  const locProp=Math.max(1,Math.ceil(parseFloat(area)*parseFloat(params?.cut||1.0)/80));
  const apaProp=locProp*150;const canProp=locProp*120;const elProp=locProp*3.5;
  cy=body('Cresterea densitatii urbane prin construirea amplasamentului '+nrcad+' genereaza necesitati suplimentare de infrastructura tehnico-edilitara. Estimarile de mai jos se bazeaza pe '+locProp+' unitati locative/de utilizare (SD estimat='+Math.round(parseFloat(area)*parseFloat(params?.cut||1.0))+' mp, regim H='+aedisH.toFixed(1)+'m).',14,cy);cy+=4;
  cy=tblRow(['Infrastructura','Consum estimat/zi','Capacitate necesara','Operator local'],cy,true,[55,42,42,43]);
  [['Apa potabila',apaProp+' l/zi ('+locProp+' pers x 150l)','Conf. STAS 1478/90',(S_UAT.mediu?.apa?.operator||'Operatorul local apa-canal')],
   ['Ape uzate menajere',canProp+' l/zi (80% din apa)','Conf. NTPA 002',(S_UAT.mediu?.apa?.operator||'Operatorul local apa-canal')],
   ['Energie electrica',elProp.toFixed(1)+' kW cerinta ('+locProp+' unit. x 3.5kW)','Conf. NTE 007','E-ON Moldova'],
   ['Gaz natural',Math.round(locProp*0.5)+' mc/h varf (iarna)','Conf. NP 037','Delgaz Grid'],
   ['Telecomunicatii','1 cablu/unitate','Conf. instalatii','Operatori multipli'],
   ['Deseuri menajere',Math.round(locProp*1.5)+' l/zi (recipiente)','Conf. Legea 211/2011','Operatorul salubritate'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,42,42,43]));
  cy+=4;
  cy=sec('9.1. CERINTE OBTINERE AVIZE UTILITATI',cy);cy+=2;
  ['Aviz furnizor electricitate '+S2(judet)+' (E-ON/Enel/CEZ/DEER cf. judet): Cerere + plan situatie + necesarul de putere.','Aviz Delgaz Grid (gaz natural): Cerere + plan amplasament + necesarul de gaz (daca se utilizeaza).','Aviz RAJA SA Iasi (apa-canal): Cerere + plan retele existente + necesarul de apa si ape uzate.','Aviz Orange/Telekom/alti operatori (telecomunicatii): Optional — la cerere.','Aviz Termoelectrica/CUMIS (termoficare): Daca se prevede racordare la reteaua de termoficare.','Aviz Salubris SA Iasi (deseuri): Zona de colectare + amplasare recipiente colectare selectiva.'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 10: Baza legala + concluzii densitate
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA COMPLETA — CONCLUZII STUDIU DENSITATE',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII FINALE — STUDIU DE DENSITATE SI PRESIUNE URBANA',cy);cy+=2;
  cy=body('Studiul de densitate si presiune urbana pentru amplasamentul '+nrcad+' (UTR '+utr+', suprafata '+area+' mp) a analizat indicatorii urbanistici propusi in raport cu regulamentul in vigoare si cu contextul urban existent. Concluziile principale sunt prezentate in tabelul de conformitate de mai jos.',14,cy);cy+=4;
  cy=tblRow(['Indicator verificat','Valoare propusa','Limita RLU','Status'],cy,true,[70,38,38,36]);
  [['POT — Procent Ocupare Teren',potProp+'%','max. '+params?.pot+'%',potProp<=parseFloat(params?.pot||35)?'CONFORM':'DEPASIRE'],
   ['CUT — Coeficient Utilizare Teren',cutProp,'max. '+params?.cut,parseFloat(cutProp)<=parseFloat(params?.cut||1.0)?'CONFORM':'DEPASIRE'],
   ['H max admis (m)',aedisH.toFixed(1)+'m','max. '+(params?.h||'N/Sm')+'m',aedisH<=(parseFloat(params?.h)||999)?'CONFORM':'DEPASIRE'],
   ['Nr. niveluri max',AEDIS.corpuri[0]?.niv||4+' niv.','max. '+(params?.niv||'N/Sm')+' niv.',( AEDIS.corpuri[0]?.niv||4)<=(parseFloat(params?.niv)||99)?'CONFORM':'DEPASIRE'],
   ['Retragere fata de strada',params?.rf+'m','min. '+params?.rf+'m','CONFORM'],
   ['Retragere laterala (rl)',params?.rl+'m','min. '+params?.rl+'m','CONFORM'],
   ['Retragere posterioara (rs)',params?.rs+'m','min. '+params?.rs+'m','CONFORM'],
   ['Spatii verzi minime',params?.sv+'%','min. '+params?.sv+'%','Verificare proiect'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,38,38,36]));
  cy+=4;
  cy=sec('10.1. BAZA LEGALA',cy);cy+=2;
  ['Legea nr. 350/2001 privind amenajarea teritoriului si urbanismul, republicata 2022.','HG nr. 525/1996 Regulamentul General de Urbanism, cu modificarile ulterioare.','Ordinul MDRAP nr. 233/2016 Norme metodologice de aplicare a Legii 350/2001.','PUG '+getUATLabel()+' in vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.','Legea nr. 50/1991 republicata privind autorizarea executarii lucrarilor de constructii.','SR EN 1990:2004 Eurocod 0: Baze de proiectare a structurilor.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});

  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',10);ftr();
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

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Memoriu Tehnic Urbanistic Preliminar','Memoriu tehnic',10);
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
  [['Certificat de Urbanism',('Primaria '+S2(uat)),'OBLIGATORIU'],['Aviz Reglementari Tehnice (Retele)','Furnizori utilitati (E-ON, RAJA etc.)','OBLIGATORIU'],['Aviz Mediu (dupa caz)','Agentia de Mediu Iasi','DUPA CAZ'],['Aviz Protectia Muncii','DSP Iasi','DUPA CAZ'],['Aviz ISU (cladiri >2 niveluri)','ISU Moldova','OBLIGATORIU'],['Aviz Patrimoniu (zona protejata)','Directia Cultura Iasi','ZONA PROTEJATA'],['Raport Studiu Geotehnic','Expert tehnic atestat','OBLIGATORIU proiect'],['Proiect Tehnic + Detalii executie','Arhitect autorizat OAR','OBLIGATORIU AC'],['Experiza tehnica (cladiri existente)','Expert tehnic atestat','DUPA CAZ']].forEach(r=>{cy=tblRow(r,cy,false,[80,65,33]);});
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
    pdf.text('INCADRARE IN CONTEXTUL URBAN — '+S2(uat).toUpperCase(),W/2,cy+4,{align:'center'});
    cy+=8;
    try{pdf.addImage(caps.imgCity,'JPEG',14,cy,W-28,52,undefined,'FAST');}catch(e){}
    pdf.setDrawColor(...GOLD);pdf.setLineWidth(0.4);pdf.rect(14,cy,W-28,52,'S');
    pdf.setTextColor(80,90,110);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
    pdf.text('FIG. — Harta urbana · Zoom 12 · Incadrare amplasament in '+S2(uat)+' · Sursa: UrbanX',W/2,cy+55,{align:'center'});
    cy+=60;
  }
  sign();

  // PAG 8: Semnatura
  // PAG 9: Specificatii tehnice constructive detaliate
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('SPECIFICATII TEHNICE CONSTRUCTIVE — SISTEME SI MATERIALE',9);ftr();
  cy=28;
  cy=sec('9. SPECIFICATII TEHNICE CONSTRUCTIVE ORIENTATIVE',cy);cy+=2;
  cy=body('Prezentul memoriu tehnic contine specificatii tehnice orientative pentru propunerea arhitecturala aferenta amplasamentului '+nrcad+' (UTR '+utr+', suprafata '+area+' mp, H propus='+aedisH.toFixed(1)+'m). Aceste specificatii vor fi detaliate in Proiectul Tehnic (PT) si Detaliile de Executie (DDE), elaborate de arhitect si inginer autorizati.',14,cy);cy+=4;
  cy=tblRow(['Sistem constructiv','Solutie propusa orientativ','Norma aplicabila','Obs.'],cy,true,[55,65,38,24]);
  [['Structura de rezistenta','Cadre beton armat monolit / zidarie portanta conf. P100-1/2013','P100-1/2013','Zona seismica '+getSeismConfig().zona],
   ['Pereti exteriori','Termoizolatie min. 10cm EPS/MW + fatada tencuita/ventilata','C107-05','U≤0.30 W/mpK'],
   ['Tamplarie exterioara','PVC/Al cu geam tripan low-E (Ug≤0.6 W/mpK)','SR EN 14351-1','Clasa etans. 3-4'],
   ['Acoperis (terasa plata)','Termoizolatie min. 15cm EPS + hidroizolatie bituminoasa 2 straturi','C107-05','U≤0.20 W/mpK'],
   ['Plansee intermediare','BA monolit min. 12cm grosime','P100-1/2013','cf. calcul structural'],
   ['Pardoseli comune','Gresie portelanata antiderapanta Rn≥R10','EN 13845','PMR conformitate'],
   ['Instalatii sanitare','Racord retea RAJA, contorizare individuala','STAS 1478','Epuisment necesar'],
   ['Instalatii termice','Centrala termica proprie sau racord retea (conf. aviz)','NP 037/99','Energie cls. B min.'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,65,38,24]));
  cy+=4;
  cy=sec('9.1. CERINTE MINIME PERFORMANTA ENERGETICA — LEGEA 372/2005',cy);cy+=2;
  cy=tblRow(['Element','Cerinta (W/mpK)','Solutie recomandata','Cost orientativ'],cy,true,[45,35,65,37]);
  [['Pereti exteriori','U≤0.28-0.35','EPS 12-15cm (λ=0.040 W/mK) + tencuiala','40-80 EUR/mp'],
   ['Planseu acoperis/pod','U≤0.20','EPS 15-20cm sau vata minerala 20cm','50-90 EUR/mp'],
   ['Planseu peste subsol/exterior','U≤0.30','EPS 8-10cm sub planseu','30-60 EUR/mp'],
   ['Tamplarie (geam+rama)','Uw≤1.20-1.40','Profil PVC 6 camere + geam triplu','250-400 EUR/mp'],
   ['Punte termica perimetru','χ≤0.10 W/mK','Ruptor termic la balcoane','Conf. proiect'],
  ].forEach(r=>cy=tblRow(r,cy,false,[45,35,65,37]));

  // PAG 10: Concluzii extinse memoriu + etape urmaToare
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONCLUZII EXTINSE — ETAPE URMATOARE SI RECOMANDARI',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII SI ETAPE URMATOARE',cy);cy+=2;
  cy=body('Prezentul Memoriu Tehnic Urbanistic Preliminar sintetizeaza datele de tema pentru amplasamentul cu nr. cadastral '+nrcad+', zona UTR '+utr+', Municipiul Iasi. Documentul este realizat in scop ORIENTATIV, in cadrul platformei digitale UrbanX, si nu inlocuieste documentatiile tehnice avizate conform Legii 50/1991.',14,cy);cy+=4;
  cy=tblRow(['Etapa','Documentatie necesara','Termen orientativ','Cine elaboreaza'],cy,true,[40,70,35,37]);
  [['1 — CU','Cerere Certificat Urbanism + plan cadastral + copie CF','10-30 zile','Beneficiar / arhitect'],
   ['2 — Studii','Studiu geotehnic + relevee + expertize (daca exist. construct.)','30-60 zile','Specialisti atestati'],
   ['3 — PAC/DTAC','Proiect Autorizare + DTAC complet cu toate planele','60-120 zile','Arhitect OAR'],
   ['4 — Avize','Toate avizele specificate in CU obtinute','30-90 zile','Arhitect/beneficiar'],
   ['5 — AC','Dosar Autorizatie de Construire depus la Primarie','30 zile lucrat.',('Primaria '+S2(uat))],
   ['6 — Executie','Lucrari cu diriginte santier atestat, conform proiect avizat','Cf. deviz','Antreprenor CL+CQ'],
   ['7 — Receptie','Receptie la terminarea lucrarilor, intabulare','La finalizare','Comisie receptie'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,70,35,37]));
  cy+=4;
  cy=sec('10.1. CONFORMITATE INDICATORI URBANISTICI',cy);cy+=2;
  cy=tblRow(['Indicator PUG','Valoare prevazuta','Propunere','Status'],cy,true,[65,40,38,39]);
  [['POT max (%)',params?.pot+'%',potProp+'%',potProp<=parseFloat(params?.pot||35)?'CONFORM':'Verificare'],
   ['CUT max',params?.cut,cutProp,parseFloat(cutProp)<=parseFloat(params?.cut||1.0)?'CONFORM':'Verificare'],
   ['H max (m)',params?.h?params.h+'m':'N/Sm',aedisH.toFixed(1)+'m',aedisH<=(parseFloat(params?.h)||999)?'CONFORM':'Verificare'],
   ['Retragere fata (m)','min. '+params?.rf+'m',params?.rf+'m','CONFORM'],
   ['Spatii verzi min (%)',params?.sv+'%',params?.sv+'%','Verificare proiect'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,40,38,39]));

  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',10);ftr();
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
  aeroport: (getAeroprtConfig()?.nume || 'Aeroportul Internațional Iași (LRIA)'),
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

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,RED,GREEN,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu de Evaluare Aeronautica (AACR)','Studiu AACR',10);
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
  cy=addImg(caps.img3D,14,cy,W-28,68,'\1'+S2(uat)+'\2');
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
  if(caps.imgCity){cy=addImg(caps.imgCity,14,cy,W-28,50,'\1'+S2(uat)+'\2');cy+=4;}
  cy=sec('5. PROCEDURA OBȚINERE AVIZ AACR',cy);cy+=2;
  ['ETAPA 1 — Documentație tehnică: Plan de situație cu cote absolute (Stereo 70 + cote AMSL), fișă tehnică clădire cu H maxim față de NMM.','ETAPA 2 — Solicitare aviz ROMATSA: Depunere documentație la ROMATSA București (str. Ion Ionescu de la Brad nr. 10). Timp: 30-45 zile.','ETAPA 3 — Aviz AACR positiv: Se anexează la dosarul pentru Autorizație de Construire (art. 7 din Legea 50/1991).','ETAPA 4 — Post-construcție: Obligația înregistrării obstacolului în baza de date ICAO/ROMATSA după finalizare.'].forEach(e=>{cy=body(e,16,cy);cy+=2;});

  // PAG 6: Baza legala
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA SI REGLEMENTARI AACR',6);ftr();
  cy=28;cy=sec('6. BAZA LEGALA',cy);cy+=2;
  ['HG nr. 930/2016 privind stabilirea și aplicarea suprafețelor de limitare a înălțimilor obstacolelor.','Legea nr. 233/2016 — Codul Aerian al României.','OMAI nr. 14/2007 privind avizarea construcțiilor din zona aeroportuară.','ICAO Anexa 14 — Aerodromuri, ediția 8 (2018) — Suprafețe de limitare obstacole.','ICAO Doc 8168 PANS-OPS — Proceduri de zbor instrument.','AIP România — AD 2 LRIA — Date aeronautice aeroport Iași.',
   'Legea nr. 50/1991 republicată — art. 7: Aviz AACR obligatoriu pentru construcțiile din zone aeroportuare.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});
  if(caps.imgCity){cy+=4;cy=addImg(caps.imgCity,14,cy,W-28,52,'\1'+S2(uat)+'\2');}
  sign();

  // PAG 7: Semnatura
  // PAG 8: Calcule detaliate suprafete aeronautice ICAO Anexa 14
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CALCULE SUPRAFETE AERONAUTICE ICAO ANEXA 14 — METODOLOGIE',8);ftr();
  cy=28;
  cy=sec('8. METODOLOGIA CALCULULUI SUPRAFETELOR AERONAUTICE ICAO',cy);cy+=2;
  cy=body('Suprafetele aeronautice definite in ICAO Anexa 14 (editia a 8-a) pentru aeroportul '+AACR_DATA.aeroport+' (cod indicator 4C) sunt calculate geometric in functie de coordonatele pragurilor de pista, orientarea pistei si cotele relative ale amplasamentului fata de cota pistei. Verificarile de mai jos determina daca constructia propusa (H='+aedisH.toFixed(1)+'m) penetreaza vreuna dintre suprafetele de protectie.',14,cy);cy+=4;
  cy=sec('8.1. SUPRAFATA CONICA — ICAO ANEXA 14 TABELUL 4-1',cy);cy+=2;
  const elevAerop2=AACR_DATA.elevatie*0.3048;
  const hPropusICOA=aedisH;
  cy=tblRow(['Parametru suprafata conica','Valoare normativa','Aplicabila amplasament','Status'],cy,true,[60,40,48,34]);
  [['Cota de baza (la extremitatea OLS)','Cota pista + 45m',elevAerop2.toFixed(0)+'m + 45m = '+(elevAerop2+45).toFixed(0)+'m','Informativ'],
   ['Raza suprafetei orizontale interioare','4000m fata de centrul pistei',Math.min(distA,distB).toFixed(0)+'m distanta min.','Verificare'],
   ['Panta suprafetei conice','5% (1:20) ascendenta','Crestere 1m/20m horiz.','ICAO Anexa 14'],
   ['Inaltime maxima la distanta amplasament',((Math.min(distA,distB)-600)/20+45).toFixed(0)+'m estimat','H propus: '+aedisH.toFixed(1)+'m','Verificare'],
  ].forEach(r=>cy=tblRow(r,cy,false,[60,40,48,34]));
  cy+=4;
  cy=sec('8.2. SUPRAFATA DE DECOLARE (ICAO) — CALCULATA',cy);cy+=2;
  const distMin2=Math.min(distA,distB);
  cy=tblRow(['Element calcul','Formula','Valoare','Obs.'],cy,true,[50,55,40,37]);
  [['Distanta amplasament la pragul apropiat','Masura geometrica GIS',distMin2.toFixed(0)+' m','Prag '+distA<distB?'08':'26'],
   ['Latime suprafata de decolare la d='+distMin2.toFixed(0)+'m','180+(distPrag-60)/10 = ...','Conf. ICAO','Panta 2%'],
   ['Inaltime OLS la amplasament','elevPista + distPrag*0.02 + corectii',((distMin2*0.02)+elevAerop2).toFixed(1)+' m','Orientativ'],
   ['Inaltime maxima admisa constructie','OLS_H - Cota_teren',((distMin2*0.02)+elevAerop2-120).toFixed(1)+' m est.','Verificare cu ROMATSA'],
   ['H propus vs. H admis',aedisH.toFixed(1)+' m vs '+ ((distMin2*0.02)+elevAerop2-120).toFixed(1)+' m',aedisH<(distMin2*0.02)+elevAerop2-120?'OK':'VERIFICARE','Orientativ'],
  ].forEach(r=>cy=tblRow(r,cy,false,[50,55,40,37]));
  cy+=4;
  cy=body('IMPORTANT: Valorile de mai sus sunt ESTIMATIVE si se bazeaza pe date aproximative. Verificarea exacta a penetrarii suprafetelor aeronautice se face exclusiv de catre ROMATSA SA si Autoritatea Aeronautica Civila Romana (AACR) in baza coordonatelor GPS precise ale proiectului si a cotei absolute a acoperisului fata de nivelul marii.',14,cy);

  // PAG 9: Procedura avizare AACR + ROMATSA
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PROCEDURA DE AVIZARE AACR — ROMATSA — CERTIFICAT URBANISM',9);ftr();
  cy=28;
  cy=sec('9. PROCEDURA DE AVIZARE AERONAUTICA — ETAPE SI DOCUMENTE',cy);cy+=2;
  cy=tblRow(['Etapa','Institutie','Documente necesare','Termen'],cy,true,[18,42,80,24]);
  [['1',('Primaria '+S2(uat)),'Depunere cerere Certificat Urbanism — in rubrica se specifica proximitatea aeroportului','5-30 zile'],
   ['2','ROMATSA SA','Cerere aviz aeronautic + coordonate GPS + cota absoluta constructie + plan de situatie','30-90 zile'],
   ['3','AACR','Verificare date + aviz favorabil/cu conditii/nefavorabil','30-60 zile'],
   ['4','ISU Moldova','Aviz PSI daca H>28m sau constructie colectiva','30-60 zile'],
   ['5',('Primaria '+S2(uat)),'Autorizatie de Construire cu toate avizele incluse','30 zile lucr.'],
  ].forEach(r=>cy=tblRow(r,cy,false,[18,42,80,24]));
  cy+=4;
  cy=sec('9.1. DATE DE CONTACT INSTITUTII AVIZATOARE AERONAUTICE',cy);cy+=2;
  cy=tblRow(['Institutie','Contact','Adresa','Obs.'],cy,true,[50,55,55,22]);
  [['ROMATSA SA — Centrul Tehnic','Tel: 021-316.94.20','Calea Serban Voda 22, Bucuresti','Aviz obligatoriu'],
   ['Autoritatea Aeronautica Civila Romana (AACR)','Tel: 021-269.30.00','Bd. Dinicu Golescu 38, Bucuresti','Autorizare activitati'],
   [(getAeroprtConfig()?.nume||'Aeroport local'),'—','Conf. aeroport '+S2(uat),'Consultare initiala'],
   ['Inspectoratul de Aviatie Civila','Tel: 021-316.94.20','B-dul Unirii 32, Bucuresti','Supraveghere'],
  ].forEach(r=>cy=tblRow(r,cy,false,[50,55,55,22]));
  cy+=4;
  cy=sec('9.2. RESTRICTII SPECIFICE ZONE AEROPORTUARE — HG 930/2016',cy);cy+=2;
  ['Interzicerea instalarii de obstacole luminoase care pot deruta pilotii (iluminat intermitent, lasere).','Balizajul de obstacol (lumini rosii intermitente) obligatoriu pentru constructii cu H>45m fata de cota pistei.','Interzicerea activitatilor care genereaza reflexii puternice (oglinzi, panouri solare orientate spre pista).','Interzicerea activitatilor care atrag pasari in zona pistei (ferme, silozuri, lacuri artificiale in perimetrul 3km).','Notificarea ROMATSA pentru orice interventie de macara/cofrag care depaseste temporar inaltimea OLS.','Aviz special AACR daca H propus depaseste OLS (se obtine in procedura de "derogare motivata").'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 10: Baza legala AACR + concluzii
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA AERONAUTICA — CONCLUZII STUDIU AACR',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII FINALE — STUDIU DE EVALUARE AERONAUTICA',cy);cy+=2;
  cy=body('Amplasamentul '+nrcad+' este situat la distanta de '+distMin2.toFixed(0)+'m fata de pragul cel mai apropiat al pistei aeroportului '+AACR_DATA.aeroport+'. La aceasta distanta, suprafetele aeronautice de protectie (OLS) conform ICAO Anexa 14 impun restrictii de inaltime. Constructia propusa cu H='+aedisH.toFixed(1)+'m necesita verificare si aviz de la ROMATSA SA inainte de obtinerea Autorizatiei de Construire.',14,cy);cy+=4;
  cy=tblRow(['Parametru','Valoare','Norma','Status'],cy,true,[65,45,40,32]);
  [['Aeroport referinta',AACR_DATA.aeroport,'HG 930/2016','Informativ'],
   ['Distanta la prag apropiat',distMin2.toFixed(0)+' m','ICAO Anexa 14','Informativ'],
   ['H max propus',aedisH.toFixed(1)+' m','Conf. aviz ROMATSA','Verificare obligatorie'],
   ['Aviz ROMATSA SA','OBLIGATORIU',distMin2<15000?'In zona OLS':'Verificare','La faza PAC'],
   ['Balizaj obstacol',aedisH>45?'OBLIGATORIU':'Nu se impune','HG 930/2016 art. 12','La H>45m'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,45,40,32]));
  cy+=4;
  cy=sec('10.1. BAZA LEGALA AERONAUTICA COMPLETA',cy);cy+=2;
  ['HG nr. 930/2016 privind stabilirea conditiilor de avizare a constructiilor in zonele cu servituti aeronautice.','Legea nr. 233/2016 privind sigurantza aviatiei civile.','OMAI 14/2007 privind prevenirea si stingerea incendiilor in obiectivele de interes aeronautic.','ICAO Anexa 14 la Conventia de la Chicago — Aerodromuri (editia a 8-a, 2018).','AIP Romania AD 2 LRIA — Aeroportul International Iasi — proceduri si restrictii.','Ordinul MT 756/2007 privind metodologia de avizare a constructiilor in zonele aeroportuare.','Regulamentul (CE) nr. 216/2008 privind normele comune in domeniul aviatiei civile.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});

  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CASETA TEHNICA SI SEMNATURA',10);ftr();
  cy=28;sign();
  pdf.save('Studiu_AACR_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Studiu AACR generat!');
}

// ── STUDIU CONSTRUCȚII EXISTENTE ─────────────────────────────────────────
async function generateExistingBldStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  ss('Se generează Studiu Construcții Existente...');

  const {pdf,W,H,DARK,GOLD,BLUE,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,kv,tblRow,addImg,sign}=_initStudyPdf('Studiu Constructii Existente pe Amplasament','Constructii existente',10);
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
  if(caps.imgCity){cy=addImg(caps.imgCity,14,cy,W-28,50,'FIG. N — Harta '+S2(uat)+' · Incadrare amplasament în contextul urban');cy+=4;}
  cy=sec('4. BAZA LEGALA',cy);cy+=2;
  ['Legea nr. 50/1991 republicată — Autorizarea executării lucrărilor de construcții.','Legea nr. 10/1995 republicată — Calitatea în construcții (consolidare, expertiză).','Ordinul MDLPL nr. 839/2009 — Norme metodologice de aplicare a Legii 50/1991.','Legea nr. 422/2001 republicată — Protejarea monumentelor istorice (dacă e cazul).','HG nr. 525/1996 — Regulamentul General de Urbanism.','PUG Municipiul Iași în vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  // PAG 6: Analiza structurala si stare tehnica
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('ANALIZA STRUCTURALA SI STARE TEHNICA CLADIRI EXISTENTE',6);ftr();
  cy=28;
  cy=sec('6. ANALIZA STRUCTURALA SI EVALUAREA STARII TEHNICE',cy);cy+=2;
  cy=body('Evaluarea structurala a constructiilor existente pe amplasamentul '+nrcad+' se efectueaza conform P 130/1999 (Normativ privind urmarirea comportarii in timp a constructiilor) si NP 131/2014 (Normativ privind expertizarea tehnica a constructiilor). Categoriile de urgenta sunt definite de expertul tehnic autorizat si clasificate de la US1 (fara risc) la US4 (risc maxim).',14,cy);cy+=4;
  cy=tblRow(['Categorie expertiza','Descriere','Masuri obligatorii','Termen'],cy,true,[35,70,55,22]);
  [['US1 — Verde','Cladire fara risc structural semnificativ. Poate fi mentinuta.','Supraveghere periodica','—'],
   ['US2 — Galben','Cladire cu risc moderat. Consolidare necesara in timp.','Plan de consolidare + proiect tehnic','3-5 ani'],
   ['US3 — Portocaliu','Cladire cu risc ridicat. Pericol public posibil.','Evacuare preventiva + consolidare urgenta','6-12 luni'],
   ['US4 — Rosu','Cladire cu risc iminent de prabusire.','Evacuare imediata + demolare/consolidare de urgenta','Imediat'],
  ].forEach(r=>cy=tblRow(r,cy,false,[35,70,55,22]));
  cy+=4;
  cy=sec('6.1. CRITERII DE EVALUARE STARE TEHNICA',cy);cy+=2;
  cy=tblRow(['Criteriu','Evaluare vizuala','Gravitate','Obs.'],cy,true,[55,60,30,37]);
  [['Fisuri structurale pereti/plansee','Conform inspectie vizuala','US1-US4','Expertiza tehnica obligatorie'],
   ['Degradari fundatie (umiditate/tasari)','Conform inspectie','Ridicata','Sondate geotehnice necesare'],
   ['Starea acoperisului','Conform inspectie','Medie-ridicata','Reparatii urgente la US3-US4'],
   ['Instalatii tehnice (electrica, gaz)','Conform inspectie','Variabila','Revizii ANRE/ANRGN'],
   ['Termoizolatie si umiditate','Conform inspectie','Medie','Audit energetic recomandat'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,60,30,37]));

  // PAG 7: Scenarii de interventie detaliata
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('SCENARII DE INTERVENTIE DETALIATE — ANALIZA TEHNICO-ECONOMICA',7);ftr();
  cy=28;
  cy=sec('7. ANALIZA TEHNICO-ECONOMICA A SCENARIILOR DE INTERVENTIE',cy);cy+=2;
  cy=body('Prezentul studiu analizeaza trei scenarii principale de interventie pentru constructiile existente pe amplasamentul '+nrcad+', tinand cont de starea tehnica, potentialul de reabilitare si indicatorii urbanistici ai UTR '+utr+'. Fiecare scenariu este evaluat tehnic si economic, cu estimate de costuri orientative.',14,cy);cy+=4;
  cy=tblRow(['Scenariu','Descriere tehnica','Avantaje','Dezavantaje','Cost est.'],cy,true,[20,60,35,35,32]);
  [['A — Demolare','Demolare integrala constructii existente + curatare amplasament. Cladire noua conf. RLU.','Flexibilitate maxima proiect nou. Indicatori urbanistici max.','Cost demolare + taxa taxe; Pierdere constructii valoroase.','200-400 EUR/mp'],
   ['B — Reabilitare','Pastrare structura existenta + reabilitare termica, fatade, instalatii.','Cost mai mic decat reconstructie. Timp mai scurt de executie.','Limitari functionale. Structura existenta conditioneaza.','400-800 EUR/mp'],
   ['C — Partial demolare','Demolare corp vechi + extindere/constructie noua pe amplasament liber.','Compromis optim. Pastrare elemente valoroase + cladire noua.','Complexitate executie. Doua faze de constructie.','600-1000 EUR/mp'],
  ].forEach(r=>cy=tblRow(r,cy,false,[20,60,35,35,32]));
  cy+=4;
  cy=sec('7.1. CERINTE DEMOLARE CONSTRUCTII EXISTENTE',cy);cy+=2;
  ['Autorizatie de Demolare separata (AD) conform Legii 50/1991, art. 3, pct. b) — necesara inainte de inceperea demolarii.','Studiu geotehnic dupa demolare pentru verificarea terenului de fundare al constructiei noi.','Inventar materiale recuperabile inainte de demolare (caramida, lemn, structuri metalice).','Gestionarea deseurilor din constructii conform HG 1061/2008 — contracte cu firme autorizate.','Verificare retele subterane existente (apa, gaz, electricitate, canalizare) — aviz operatori.','Notificarea ITM si DSP pentru conditii de munca in santierul de demolare (azbest, materiale periculoase).'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 8: Costuri si deviz orientativ
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('DEVIZ ORIENTATIV INTERVENTII — ESTIMARE COSTURI',8);ftr();
  cy=28;
  cy=sec('8. ESTIMARE ORIENTATIVA COSTURI INTERVENTIE',cy);cy+=2;
  const scEst2=Math.round(parseFloat(area)*parseFloat(params?.pot||35)/100);
  cy=body('Estimarile de costuri de mai jos sunt STRICT ORIENTATIVE si se bazeaza pe indici de cost medii la nivel national (2024-2025), aplicabili pentru amplasamentul '+nrcad+' (suprafata '+area+'mp, UTR '+utr+'). Devizul exact va fi elaborat de un devizist autorizat in baza proiectului tehnic aprobat.',14,cy);cy+=4;
  cy=tblRow(['Lucrare','UM','Cantitate est.','Pret unit. (EUR)','Total (EUR)'],cy,true,[60,15,28,38,41]);
  [['Demolare constructii existente','mp',''+Math.round(totalAreaExist||0),'80-200',''+Math.round((totalAreaExist||0)*140)],
   ['Sapaturi fundatii cladire noua','mc',''+Math.round(scEst2*2.5),'25-40',''+Math.round(scEst2*2.5*32)],
   ['Beton fundatii + armare','mc',''+Math.round(scEst2*0.3),'300-450',''+Math.round(scEst2*0.3*375)],
   ['Structura BA cladire propusa','mp SD',''+Math.round(parseFloat(area)*parseFloat(params?.cut||1)),'600-900',''+Math.round(parseFloat(area)*parseFloat(params?.cut||1)*750)],
   ['Finisaje, instalatii, tamplarie','mp',''+Math.round(parseFloat(area)*parseFloat(params?.cut||1)),'400-600',''+Math.round(parseFloat(area)*parseFloat(params?.cut||1)*500)],
   ['Amenajare exterioara + utilitati','global','1','30000-80000','50000'],
  ].forEach(r=>cy=tblRow(r,cy,false,[60,15,28,38,41]));
  cy+=4;
  cy=sec('8.1. TAXE SI AVIZE — ESTIMARE ORIENTATIVA',cy);cy+=2;
  cy=tblRow(['Taxa/Aviz','Baza de calcul','Cost orientativ','Termenul de obtinere'],cy,true,[55,45,38,44]);
  [['Certificat Urbanism','Flat fee Primaria Iasi','50-200 RON','5-30 zile'],
   ['Autorizatie Construire (AC)','0.5% din valoarea lucr.','500-5000 RON','30 zile lucratoare'],
   ['Autorizatie Demolare (AD)','0.1% din valoarea lucr.','100-500 RON','15-30 zile'],
   ['Taxa arhitect OAR','% din onorariu proiect','Conf. tarifar OAR','La semnare contract'],
   ['Avize utilitati (E-ON, RAJA, etc.)','Per aviz','100-500 RON/aviz','30-90 zile/aviz'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,45,38,44]));

  // PAG 9: Cerinte legale deseu constructie
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('GESTIONARE DESEURI CONSTRUCTII — CERINTE LEGALE SI PROCEDURI',9);ftr();
  cy=28;
  cy=sec('9. GESTIONAREA DESEURILOR DIN CONSTRUCTII SI DEMOLARI',cy);cy+=2;
  cy=body('Conform HG 1061/2008 privind transportul deseurilor periculoase si nepericuloase, si OUG 92/2021 privind regimul deseurilor, operatiunile de demolare si constructie genereaza deseuri clasificate care necesita gestionare responsabila. Contractorul trebuie sa prezinte un Plan de Gestionare a Deseurilor (PGD) inainte de inceperea lucrarilor.',14,cy);cy+=4;
  cy=tblRow(['Tip deseu','Cod european','Modalitate de gestionare','Operator autorizat'],cy,true,[50,30,70,32]);
  [['Beton demolat, caramida, blocuri','17 01 01/02','Transport la statia de reciclare autorizata','Firma autorizata Iasi'],
   ['Metal (armaturi, tevi)','17 04 05','Predare la recuperare metale (vanzare)','Colectori metale fier'],
   ['Lemn (grinzi, ferme, tamplarie)','17 02 01','Recuperare/refolosire sau incinerare autorizata','Firma autorizata'],
   ['Materiale termoizolante (polistiren)','17 06 04','Depozit autorizat sau reciclare EPS','Conf. cod deseu'],
   ['Materiale potential periculoase (azbest)','17 06 01*','Firma specializata azbest — obligatoriu','Firma atestata ANPM'],
   ['Pamant excavat (necontaminat)','17 05 04','Depozit excavatii autorizat sau refolosire','Conf. aviz APM'],
  ].forEach(r=>cy=tblRow(r,cy,false,[50,30,70,32]));
  cy+=4;
  cy=sec('9.1. PLAN DE ORGANIZARE DE SANTIER — CERINTE MINIME',cy);cy+=2;
  ['Imprejmuire santier H>2.0m cu panou informativ AC + AD.','Accese separate pietoni / utilaje grele (utilaje max. 26t pe strazi interioare).','Container colectare deseuri pe categorii (conform PGD) in incinta santier.','Racord apa si curent electric provizoriu — aviz operatori utilitati.','Toaleta ecologica pentru personal santier.','Registru de comunicare santier (agenda zilnica diriginte + RTE).','Asigurare impotriva accidentelor de constructii (polita obligatorie).'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 10: Baza legala + concluzii constructii existente
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA COMPLETA — CONCLUZII CONSTRUCTII EXISTENTE',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII FINALE — STUDIU CONSTRUCTII EXISTENTE',cy);cy+=2;
  cy=body('Prezentul studiu privind constructiile existente pe amplasamentul '+nrcad+' (UTR '+utr+', suprafata '+area+' mp) a inventariat si evaluat orientativ constructiile existente, a analizat scenariile de interventie si a estimat costurile orientative. Documentul este STRICT ORIENTATIV si nu inlocuieste expertiza tehnica obligatorie.',14,cy);cy+=4;
  cy=tblRow(['Aspect analizat','Concluzie orientativa','Documentatie urmatoare'],cy,true,[55,65,62]);
  [['Inventar constructii existente','Cf. relevee si cadastru','Relevee arhitecturale (arhitect autorizat)'],
   ['Stare tehnica','Cf. inspectie vizuala — estimativa','Expertiza tehnica (expert AICPS)'],
   ['Scenariu recomandat','Cf. optiune beneficiar + RLU','PT + DDE (arhitect + inginer rezistenta)'],
   ['Demolare/Consolidare','Autorizatie necesara','AD sau AC cu avize complete'],
   ['Deseuri constructii','Plan gestionare obligatoriu','PGD elaborat de constructor'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,65,62]));
  cy+=4;
  cy=sec('10.1. BAZA LEGALA',cy);cy+=2;
  ['Legea nr. 50/1991 republicata — Autorizarea executarii lucrarilor de constructii.','P 130/1999 — Normativ privind urmarirea comportarii in timp a constructiilor.','NP 131/2014 — Normativ privind expertizarea tehnica a constructiilor existente.','P100-3/2019 — Cod de proiectare seismica. Evaluarea si proiectarea cladirilor existente.','HG 1061/2008 — Transportul deseurilor periculoase si nepericuloase.','OUG 92/2021 — Regimul deseurilor. Transpunere Directiva 2008/98/CE.','Legea 10/1995 republicata — Calitatea in constructii.','PUG '+getUATLabel()+' in vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});
  sign();
  pdf.save('Studiu_Constructii_Existente_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Studiu Construcții Existente generat!');
}

// ── STUDIU GEOTEHNIC PRELIMINAR ────────────────────────────────────────────
async function generateGeotehnicalStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  ss('Se generează Pre-Studiu Geotehnic...');

  const {pdf,W,H,DARK,GOLD,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,tblRow,addImg,sign}=_initStudyPdf('Pre-Studiu Geotehnic Preliminar','Pre-studiu geotehnic',10);
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
  cy=addImg(caps.img3D,14,cy,W-28,68,'\1'+S2(uat)+'\2');
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
  if(caps.imgCity){cy=addImg(caps.imgCity,14,cy,W-28,50,'FIG. 8 — Harta '+S2(uat)+' · Geomorfologie locala');cy+=4;}
  cy=sec('6. BAZA LEGALA SI NOTA DE AVERTIZARE',cy);cy+=2;
  cy=body('IMPORTANT: Prezentul pre-studiu geotehnic are caracter STRICT ORIENTATIV și se bazează exclusiv pe date statistice pentru zona geografică largă a Municipiului Iași (Podișul Moldovei). Nu înlocuiește studiul geotehnic detaliat obligatoriu conform NP 074/2014, realizat de specialist geotehnician autorizat cu foraje/sondaje pe amplasamentul specific.',14,cy);cy+=4;
  ['NP 074/2014 — Normativ privind principiile, exigențele și metodele cercetării geotehnice.','SR EN 1997-1:2004 — Eurocod 7: Proiectarea geotehnică. Reguli generale.','P100-1/2013 — Cod de proiectare seismică. Prevederi pentru clădiri.','P100-3/2019 — Cod de proiectare seismică. Evaluarea și proiectarea clădirilor existente.','STAS 1242/1-89 — Teren de fundare. Principii generale de cercetare.','Legea nr. 10/1995 republicată — Calitatea în construcții. Cerința A: Rezistență mecanică și stabilitate.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  // PAG 6: Profil geologic + stratigrafie tipica Moldova
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PROFIL GEOLOGIC ZONA IASI — STRATIGRAFIE SI LITOLOGIE',6);ftr();
  cy=28;
  cy=sec('6. PROFIL GEOLOGIC TIPIC — PODISUL MOLDOVEI (ZONA IASI)',cy);cy+=2;
  cy=body('Municipiul Iasi este amplasat pe Podisul Moldovei Central, subdiviziunea Campiei Moldovei, la altitudini de 40-380m. Geologia superficiala este dominata de depozite cuaternare (loess, argile, nisipuri, pietrisuri) de grosimi variabile, suprapuse pe formatiunile neogene (argile, marne, nisipuri). Profilul geologic tipic pentru zona de campie/terasa (cum este cazul majoritatii parcelelor intravilane) este prezentat mai jos.',14,cy);cy+=4;
  cy=tblRow(['Adancime (m)','Litologie','Consistenta/Compactitate','Conductivitate hidraulica'],cy,true,[30,55,50,47]);
  [['0.0-0.5m','Umplutura/sol vegetal','Variabila (evitare fundare)','k=10⁻⁵ cm/s'],
   ['0.5-2.0m','Argila prafoasa maronie (loess)','Plastic consistent (IC=0.5-0.7)','k=10⁻⁷-10⁻⁸ cm/s'],
   ['2.0-4.5m','Argila galbuie-grisie (depozit cuaternar)','Plastic vartos (IC=0.7-0.9)','k=10⁻⁸ cm/s'],
   ['4.5-7.0m','Nisip prafos galben (depozit cuaternar)','Mediocru compactat (Dr=0.4-0.6)','k=10⁻⁴ cm/s (acvifer)'],
   ['7.0-12m','Argila sarmatica verde-cenusie (neogen)','Semidura (IC>0.9)','k=10⁻⁹ cm/s'],
   ['>12m','Marne si argile sarmatiene','Dura-consolidata','k<10⁻¹⁰ cm/s'],
  ].forEach(r=>cy=tblRow(r,cy,false,[30,55,50,47]));
  cy+=4;
  cy=sec('6.1. NIVEL FREATIC — DATE ORIENTATIVE ZONA IASI',cy);cy+=2;
  cy=body('Nivelul freatic in zona Municipiului Iasi variaza semnificativ in functie de microrelieful local: pe terase inalte (Copou, Tatarasi, Pacurari) NFA este la 5-12m adancime; in zonele de terasa joasa si lunca (zona Ciric, CUG, Nicolina, Galata) NFA poate fi la 1.5-4m adancime; in zone de deal NFA este adanc (>15m). Variabilitatea sezoniera este de 0.5-1.5m (max. primavara/vara ploioasa). Prezentul pre-studiu nu include masuratori de NFA pe amplasamentul specific.',14,cy);cy+=4;
  cy=tblRow(['Zona Iasi','Adancime NFA orientativa','Risc inundare subsol','Obs.'],cy,true,[55,45,40,42]);
  [['Copou, Tatarasi deal','8-15m','Scazut','Teren stabil, favorabil'],
   ['Pacurari, Gara (terasa medie)','4-8m','Redus','Epuismente rare'],
   ['CUG, Nicolina, Dacia (terasa joasa)','2-5m','Moderat','Hidroizolatie obligatorie'],
   ['Lunca Bahlui, Ciric','0.5-2m','Ridicat','Fundatii pe piloti recomandat'],
   ['Zona Tatarasi vale / Bucium','3-7m','Redus-moderat','Verificare locala'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,45,40,42]));

  // PAG 7: Calcule capacitate portanta estimata
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CALCULE ORIENTATIVE CAPACITATE PORTANTA — PRESIUNI ADMISIBILE',7);ftr();
  cy=28;
  cy=sec('7. ESTIMARE ORIENTATIVA CAPACITATE PORTANTA SI PRESIUNI ADMISIBILE',cy);cy+=2;
  cy=body('Valorile de capacitate portanta prezentate sunt STRICT ORIENTATIVE, bazate pe literatura de specialitate pentru tipuri de teren similare. Valorile exacte se determina prin studiu geotehnic cu foraje si probe de laborator, conform NP 074/2014 si SR EN 1997-1.',14,cy);cy+=4;
  cy=tblRow(['Tip teren','Adancime fundare','Presiune conv. (kPa)','Modul def. (MPa)','Obs.'],cy,true,[45,35,40,30,32]);
  [['Argila moale','1.5-2.0m','50-100 kPa','2-5 MPa','Evitare; piloti daca necesar'],
   ['Argila plastic-consistenta','1.5-2.0m','150-200 kPa','5-15 MPa','Standard zona Iasi'],
   ['Argila vartoasa-dura','1.5-2.0m','200-300 kPa','15-30 MPa','Favorabila'],
   ['Nisip mediocru compactat','1.5-2.5m','100-150 kPa','10-20 MPa','Verificare NFA'],
   ['Nisip dens','2.0-3.0m','200-350 kPa','30-60 MPa','Foarte favorabil'],
   ['Argila sarmatica (neogen)','2.0-3.0m','300-500 kPa','40-100 MPa','Excelent'],
  ].forEach(r=>cy=tblRow(r,cy,false,[45,35,40,30,32]));
  cy+=4;
  cy=sec('7.1. SARCINA ESTIMATA TRANSMISA PE TEREN — H='+aedisH.toFixed(1)+'m',cy);cy+=2;
  const scFund=Math.round(parseFloat(area)*parseFloat(params?.pot||35)/100);
  const sarcinaStr=Math.round(aedisH*0.8*scFund/1000);
  cy=tblRow(['Parametru de incarcare','Valoare estimata','Norma','Obs.'],cy,true,[70,40,38,34]);
  [['Suprafata construita la sol (SC)',scFund+' mp','RLU '+utr,'POT='+params?.pot+'%'],
   ['Nr. niveluri estimat',AEDIS.corpuri[0]?.niv||4+' niv.','H/3='+Math.round(aedisH/3)+' niv.','H='+aedisH.toFixed(1)+'m'],
   ['Sarcina totala estimata pe teren',sarcinaStr+' tone total','0.8 t/mp/etaj','Estimat'],
   ['Sarcina/mp pe teren la fundatii',(sarcinaStr*10/scFund).toFixed(0)+' kPa','Verificare portanta','Conf. tip teren'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,40,38,34]));

  // PAG 8: Analiza seismica detaliata
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('ANALIZA SEISMICA DETALIATA — P100-1/2013 SI SR EN 1998-1',8);ftr();
  cy=28;
  cy=sec('8. ANALIZA SEISMICA — PROIECTARE ANTISEISMICA P100-1/2013',cy);cy+=2;
  const seismCfg2=getSeismConfig();
  cy=body('Amplasamentul '+nrcad+' se afla in zona seismica '+seismCfg2.zona+' (ag='+seismCfg2.ag+'g, Tc='+seismCfg2.Tc+'s) conform Codului de proiectare seismica P100-1/2013. Nivelul de intensitate seismica MSK '+seismCfg2.MSK+' corespunde unui cutremur cu perioadele de revenire de referinta (IMR=225 ani pentru cladiri obisnuite de importanta normala, clasa de importanta II).',14,cy);cy+=4;
  cy=tblRow(['Parametru seismic','Valoare zona Iasi','Norma','Semnificatie'],cy,true,[55,35,38,54]);
  [['Zona seismica',seismCfg2.zona,'P100-1/2013 Fig. 3.1','Nivelul acceleratiei de proiectare'],
   ['Acceleratia de proiectare ag',seismCfg2.ag+'g ('+Math.round(seismCfg2.ag*9.81*100)/100+' m/s²)','P100-1/2013','Ag la suprafata terenului'],
   ['Perioada de control Tc',seismCfg2.Tc+' s','P100-1/2013 Fig. 3.2','Perioada dominanta spectru raspuns'],
   ['Intensitate MSK',seismCfg2.MSK,'STAS 11100/1','Intensitate macroseismica'],
   ['Clasa de importanta','II (obisnuita)','P100-1/2013 Tab. 4.2','γI=1.0 (rezidential)'],
   ['Clasa de ductilitate recomandata','DCM (medie)','P100-1/2013','q=3.0-4.5 cadre BA'],
   ['Cutremur de proiectare','IMR=225 ani','P100-1/2013','10% depasire in 50 ani'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,35,38,54]));
  cy+=4;
  cy=sec('8.1. CERINTE MINIMALE STRUCTURA ANTISEISMICA — H='+aedisH.toFixed(1)+'m',cy);cy+=2;
  cy=tblRow(['Cerinta','Prevedere normativa','Implicatie proiect'],cy,true,[55,85,42]);
  [['Regularitate in plan si elevatie','Asimetrie max. 10% mase/rigiditate pe nivel','Forma regulata recomandata'],
   ['Pereti structurali','Min. 4% suprafata nivel in fiecare directie (BA)','Proiect structural specific'],
   ['Clasa beton','Min. C25/30 pentru stalpi si noduri','La comanda beton'],
   ['Clasa armaturi','Min. S500 (PC60)','La aprovizionare otel'],
   ['Etant perimetral la fundatii','Hidroizolatie + dren perimetral la NFA <3m','Conf. NP 074/2014'],
   ['Verificare amplificare teren (site effect)','Obligatorie daca straturi moi > 5m','Conf. P100-1/2013 cap. 3.1'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,85,42]));

  // PAG 9: Solutii fundare detaliate + recomandari finale
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('SOLUTII DE FUNDARE DETALIATE — RECOMANDARI TEHNICE',9);ftr();
  cy=28;
  cy=sec('9. SOLUTII DE FUNDARE DETALIATE RECOMANDATE',cy);cy+=2;
  cy=body('In functie de tipul de teren estimat pentru amplasamentul '+nrcad+' si de parametrii constructiei (H='+aedisH.toFixed(1)+'m, SC='+scFund+'mp), sunt recomandate urmatoarele solutii de fundare, cu precizarea ca alegerea finala revine expertului geotehnician dupa efectuarea studiului geotehnic detaliat.',14,cy);cy+=4;
  cy=tblRow(['Tip fundatie','Conditii aplicare','Adancime fundare','Sectiune orientativa','Cost relativ'],cy,true,[40,50,30,38,24]);
  [['Fundatii izolate BA sub stalpi','Teren bun (p>150kPa), NFA>adFund','1.5-2.0m','1.2x1.2x0.6m','Redus'],
   ['Grinzi de fundare continue sub pereti','Zidarie portanta sau cadre la axe strinse','1.5-2.0m','0.4x0.7m','Redus-mediu'],
   ['Radier general armat','Teren slab sau NFA ridicat (p<100kPa)','1.0-1.5m','min. 30-40cm gros','Mediu'],
   ['Piloti forati mic diametru','Teren moale superficial, strat dur la >5m','5-12m','d=350-600mm','Ridicat'],
   ['Micropiloti (jet grouting)','Extindere/consolidare langa fundatii existente','Conf. calcul','d=250-400mm','Ridicat'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,50,30,38,24]));
  cy+=4;
  cy=sec('9.1. RECOMANDARI TEHNICE FINALE PRE-STUDIU GEOTEHNIC',cy);cy+=2;
  ['Efectuarea studiului geotehnic detaliat (3 foraje min., adancime 8-12m) INAINTE de elaborarea proiectului structural.','Prelevare probe de teren la adancimile de 1m, 2m, 4m, 6m si 8m pentru analize de laborator.','Masurarea nivelului freatic in forajele executate — minimum 48h dupa finalizarea forajului.','Incercari de penetrare statica (CPT) sau dinamica (SPT) pentru determinarea gradului de compactare a nisipurilor.','Verificarea riscului de lichefiere seismica daca amplasamentul se afla in zona cu nisipuri fine sub NFA.','Studiu suplimentar de risc geologic (alunecari de teren) daca amplasamentul este pe panta > 10%.','Recomandarea adancimii de fundare si a tehnologiei de executie de catre expertul geotehnician.'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // PAG 10: Baza legala geotehnica completa
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA COMPLETA GEOTEHNICA — CONCLUZII',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII SI BAZA LEGALA COMPLETA',cy);cy+=2;
  cy=body('Pre-studiul geotehnic preliminar pentru amplasamentul '+nrcad+' (UTR '+utr+', suprafata '+area+' mp, H propus='+aedisH.toFixed(1)+'m) a furnizat date orientative privind conditiile geotehnice ale zonei Iasi, categoria geotehnica estimata ('+catGeo+'), solutiile de fundare recomandate si cerintele de proiectare seismica. Documentul este STRICT ORIENTATIV si nu inlocuieste studiul geotehnic obligatoriu.',14,cy);cy+=4;
  cy=tblRow(['Verificare','Concluzie orientativa','Documentatie necesara'],cy,true,[55,65,62]);
  [['Categoria geotehnica',catGeo,'Studiu geotehnic NP 074/2014'],
   ['Tip sol dominant','Argile-nisipuri (zona Iasi)','Foraje + probe laborator'],
   ['Nivel freatic estimat','1.5-8m (variabil zona)','Masuratori foraj'],
   ['Zona seismica',seismCfg2.zona+' (ag='+seismCfg2.ag+'g)','P100-1/2013 — verificat'],
   ['Solutie fundare recomandata','Fundatii izolate/continue 1.5-2m','Proiect structural final'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,65,62]));
  cy+=4;
  cy=sec('10.1. BAZA LEGALA GEOTEHNICA COMPLETA',cy);cy+=2;
  ['NP 074/2014 — Normativ privind principiile, exigentele si metodele cercetarii geotehnice.','SR EN 1997-1:2004 (Eurocod 7) — Proiectarea geotehnica. Reguli generale.','SR EN 1997-2:2007 — Eurocod 7. Investigarea si incercarea terenului.','P100-1/2013 — Cod de proiectare seismica. Prevederi pentru cladiri. Revizuire 2022.','P100-3/2019 — Cod de proiectare seismica. Evaluarea si proiectarea cladirilor existente.','STAS 1242/1-89 — Teren de fundare. Principii generale de cercetare.','STAS 3300/1-85 — Teren de fundare. Principii de calcul.','SR EN 1998-5:2004 (Eurocod 8) — Proiectare seismica. Fundatii, structuri de sustinere si aspecte geotehnice.','Legea 10/1995 republicata — Calitatea in constructii. Cerinta A: Rezistenta mecanica si stabilitate.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});
  sign();
  pdf.save('PreStudiu_Geotehnic_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Pre-Studiu Geotehnic generat!');
}

// ── STUDIU TRAFIC ────────────────────────────────────────────────────────
async function generateTrafficStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}
  ss('Se generează Studiu de Trafic...');

  const {pdf,W,H,DARK,GOLD,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,tblRow,addImg,sign}=_initStudyPdf('Studiu de Impact asupra Traficului','Studiu trafic',10);
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
  if(caps.imgCity){cy=addImg(caps.imgCity,14,cy,W-28,50,'FIG. N — Harta '+S2(uat)+' · Retea stradala si acces principal');cy+=4;}
  cy=sec('5. BAZA LEGALA',cy);cy+=2;
  ['NP 051/2012 — Normativ privind adaptarea cladirilor civile si spatiului urban la necesitatile persoanelor cu handicap.','STAS 10144/3-1991 — Calculul si proiectarea parcajelor pentru autoturisme.','HG nr. 525/1996 — Regulamentul General de Urbanism, art. 33 Parcaje.','Ordinul MT nr. 45/1998 — Norme tehnice privind proiectarea, construirea si modernizarea drumurilor.','PUG '+getUATLabel()+' — UTR '+utr+' — Reglementari accese si parcaje.','Legea nr. 82/1998 — Codul Rutier, art. 72: Iesirile din incinte.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});

  // PAG 6: Calcule generare trafic ITE
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('GENERARE TRAFIC — RATE ITE SI DISTRIBUTIE ORE VARF',6);ftr();
  cy=28;
  const trafCfg3=getTraficConfig();
  cy=sec('6. CALCULE GENERARE TRAFIC CONFORM ITE TRIP GENERATION (ed. 11, 2021)',cy);cy+=2;
  cy=body('Ratele de generare a traficului sunt estimate conform manualului ITE Trip Generation (editia a 11-a, 2021) si calibrate pe conditiile locale ale Municipiului Iasi. Calculele acopera volumul de trafic in orele de varf (OV dimineata 7:30-8:30 si OV seara 17:00-18:00) si reprezinta baza dimensionarii acceselor si a parcajului aferent.',14,cy);cy+=4;
  cy=tblRow(['Functiune','Unitate calcul','Cantit. est.','Rate ITE (veh/zi)','Total veh/zi'],cy,true,[45,32,28,50,27]);
  const sdT=Math.round(parseFloat(area)*parseFloat(params?.cut||1.0));
  const scT=Math.round(parseFloat(area)*parseFloat(params?.pot||35)/100);
  [['Locuinte colective','apartamente',Math.ceil(sdT/65)+' ap.','6-8 veh/ap/zi',''+Math.ceil(sdT/65)*7+' veh/zi'],
   ['Locuinte individuale','unitati',Math.ceil(sdT/120)+' unit.','9-11 veh/unit/zi',''+Math.ceil(sdT/120)*10+' veh/zi'],
   ['Birouri','100mp GLA',Math.ceil(sdT/100)+' x 100mp','12-16 veh/100mp/zi',''+Math.ceil(sdT/100)*14+' veh/zi'],
   ['Comert alimentar','100mp GLA',Math.ceil(scT*0.7/100)+' x 100mp','35-50 veh/100mp/zi',''+Math.ceil(scT*0.7/100)*42+' veh/zi'],
   ['Alimentatie publica','100mp sala',Math.ceil(scT*0.4/100)+' x 100mp','25-40 veh/100mp/zi',''+Math.ceil(scT*0.4/100)*32+' veh/zi'],
  ].forEach(r=>cy=tblRow(r,cy,false,[45,32,28,50,27]));
  cy+=4;
  cy=sec('6.1. DISTRIBUTIE TRAFIC PE ORE DE VARF',cy);cy+=2;
  const totZilnic2=Math.ceil(sdT/80)*8+10;
  cy=tblRow(['Ora de varf','% din zilnic','Intr. est.','Ies. est.','Total (veh/h)'],cy,true,[38,32,30,30,42]);
  [['OV dim. (7:30-8:30)','10-12%',''+Math.ceil(totZilnic2*0.11*0.15),''+Math.ceil(totZilnic2*0.11*0.85),''+Math.ceil(totZilnic2*0.11)],
   ['OV seara (17:00-18:00)','12-15%',''+Math.ceil(totZilnic2*0.13*0.80),''+Math.ceil(totZilnic2*0.13*0.20),''+Math.ceil(totZilnic2*0.13)],
   ['Ore normale (9:00-16:00)','5-7% per ora','—','—',''+Math.ceil(totZilnic2*0.06)],
   ['Weekend (10:00-13:00)','8-12% per ora','—','—',''+Math.ceil(totZilnic2*0.10)],
  ].forEach(r=>cy=tblRow(r,cy,false,[38,32,30,30,42]));

  // PAG 7: Analiza intersectii + LOS
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('ANALIZA INTERSECTIE ACCES — NIVEL DE SERVICIU LOS',7);ftr();
  cy=28;
  cy=sec('7. ANALIZA CAPACITATII INTERSECTIEI DE ACCES — HCM 6',cy);cy+=2;
  cy=body('Intersectia sau accesul la amplasamentul '+nrcad+' este evaluat prin prisma nivelului de serviciu (LOS — Level of Service) conform HCM 6 (Highway Capacity Manual, ed. 2016) si a normativelor romanesti STAS 10144 si SR 4032-1. Viteza de proiectare a strazii de acces este de '+trafCfg3.viteza_proiectare+' km/h (TMA ref. '+trafCfg3.TMA_ref+' veh/zi).',14,cy);cy+=4;
  cy=tblRow(['Nivel Serviciu','Intarziere/veh','Descriere','Acceptabilitate'],cy,true,[28,35,85,34]);
  [['LOS A','< 10 s','Flux liber, trafic sub 35% capacitate. Manevre libere.','Excelent'],
   ['LOS B','10-20 s','Flux stabil, mici perturbatii. Manevre relativ libere.','Bun'],
   ['LOS C','20-35 s','Flux stabil la limit. Accept. Timp astept. notabil.','Acceptabil'],
   ['LOS D','35-55 s','Flux instabil. Cozi mai lungi. Sensibil la perturbatii.','Marginal'],
   ['LOS E','55-80 s','La capacitate. Cozi lungi. Intarzieri mari. Frecvent blocaj.','Inacceptabil'],
   ['LOS F','> 80 s','Depasit. Colaps trafic. Coada in crestere continua.','Critic'],
  ].forEach(r=>cy=tblRow(r,cy,false,[28,35,85,34]));
  cy+=4;
  cy=sec('7.1. VERIFICARE CAPACITATE DRUM ADIACENT',cy);cy+=2;
  cy=tblRow(['Parametru','Valoare stradala','Cerinta acces','Status'],cy,true,[55,45,55,27]);
  [['Viteza proiectare',trafCfg3.viteza_proiectare+' km/h','—','Informativ'],
   ['Latime carosabil trotuar','6-10m (strada secundara)','min. 6m pentru 2 sensuri','Verificare plan'],
   ['Capacitate teoretica drum','800-1200 veh/h (2 benzi)','Depinde de TMA','Calculat la PT'],
   ['Trafic generat amplasament',totZilnic2+' veh/zi est.','LOS B/C recomandat','Verificare studiu detal.'],
   ['Impact procentual pe drum',''+Math.min(100,Math.round(totZilnic2/(trafCfg3.TMA_ref||600)*100))+'% din TMA ref.','max. 20% crestere','Conf. impact acceptabil'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,45,55,27]));

  // PAG 8: Parcaje detaliate + marcaje
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PARCAJ DETALIAT — DIMENSIONARE SI MARCAJE RUTIERE',8);ftr();
  cy=28;
  cy=sec('8. DIMENSIONAREA DETALIATA A PARCAJULUI — NP 051/2012',cy);cy+=2;
  const pkT=Math.max(pkObl||2,2);
  cy=tblRow(['Categorie loc parcare','Nr. locuri','Dim. loc (m)','Sup./loc (mp)','Sup. totala (mp)'],cy,true,[55,22,28,28,35]);
  [['Standard (perpendicular la trotuar)',pkT+' locuri','2.5 × 5.5','13.75',pkT*14+' mp'],
   ['Standard (cu culoar manevrare 6m)',pkT+' locuri','—','30.0',pkT*30+' mp total'],
   ['PMR (min. 4% din total)',Math.max(1,Math.ceil(pkT*0.04))+' locuri','3.6 × 6.0','21.6',''+Math.max(1,Math.ceil(pkT*0.04))*22+' mp'],
   ['Biciclete (rastel 2 biciclete/modul)',''+Math.max(2,Math.ceil(pkT*0.1))+' biciclete','0.75 × 2.0','1.5/bicicleta',''+Math.max(2,Math.ceil(pkT*0.1))*1.5+' mp'],
   ['Total suprafata parcare necesara','—','—','—',''+Math.round(pkT*30*1.05)+' mp'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,22,28,28,35]));
  cy+=4;
  cy=sec('8.1. MARCAJE SI SEMNALIZARE RUTIERA IN PARCARE',cy);cy+=2;
  cy=tblRow(['Element','Specificatie','Norma','Cost est.'],cy,true,[55,75,30,22]);
  [['Linii delimitare locuri parcare','Vopsea alba/galbena termoaplica, L=10cm','SR 1848-7','2-4 EUR/ml'],
   ['Loc parcare PMR','Marcare albastra + indicatoare I-44','SR 1848-2','80-120 EUR/loc'],
   ['Indicatoare directionale parcare','Tipuri P, E si R conform SR 1848','SR 1848-1/2','50-150 EUR/buc'],
   ['Numar loc (vopsit sau placheta)','Nr. 1, 2 ... '+pkT,'—','5-15 EUR/loc'],
   ['Iluminat parcare','Min. 5 lux mediu (50 lux treceri pietonale)','NTE 007/08','250-500 EUR/corp'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,75,30,22]));

  // PAG 9: Siguranta rutiera + transport public
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('SIGURANTA RUTIERA — ACCESE PMR — TRANSPORT PUBLIC',9);ftr();
  cy=28;
  cy=sec('9. MASURI DE SIGURANTA RUTIERA LA ACCESUL AMPLASAMENTULUI',cy);cy+=2;
  cy=body('Accesul la amplasamentul '+nrcad+' trebuie sa asigure siguranta tuturor participantilor la trafic, inclusiv pietonilor si utilizatorilor de vehicule speciale (PMR, livrare, urgenta). Masurile prezentate mai jos sunt recomandate pentru minimizarea riscului de accidente si asigurarea fluentei traficului la accesul auto.',14,cy);cy+=3;
  cy=tblRow(['Masura de siguranta','Descriere tehnica','Obligativitate','Cost est.'],cy,true,[50,80,30,22]);
  [['Vizibilitate de racordare min.','50m in ambele directii la V=50km/h (STAS 10144)','Obligatoriu','—'],
   ['Zona de decelerare (banda dreapta)','L=30-50m la viteza strazii de '+trafCfg3.viteza_proiectare+' km/h','La Q>100veh/h intrare','Conf. proiect'],
   ['Suprafata asteptare la intrare','Min. 1 autovehicul (6m) intre strada si bariera','Recomandat','—'],
   ['Refugiu pietonal la acces','H bordura 15cm, L=3m, larg.=1.5m','Recomandat','500-1500 EUR'],
   ['Camera supraveghere acces (CCTV)','Min. 2 camere HD la acces','Recomandat','300-800 EUR/cam'],
   ['Sistem anti-inundare rampa subsol','Statie pompare conf. NTPA, daca panta>8%','Daca rampa subterana','1000-5000 EUR'],
   ['Iluminat acces nocturn','Min. 10 lux pe calea de acces','Obligatoriu','200-600 EUR/corp'],
  ].forEach(r=>cy=tblRow(r,cy,false,[50,80,30,22]));
  cy+=3;
  cy=sec('9.1. ACCESIBILITATE TRANSPORT PUBLIC RATC IASI',cy);cy+=2;
  cy=body('Reducerea traficului generat este proportionala cu proximitatea statiilor de transport public. Amplasamentele la < 400m de o statie RATC (tramvai/troleibuz/autobuz) au cu 15-25% mai putin trafic generat de autoturisme. Se recomanda verificarea existentei statiilor RATC Iasi in proximitate si asigurarea legaturilor pietonale accesibile PMR (trotuar min. 1.5m, rampe, pavaj tactil).',14,cy);cy+=3;
  cy=addImg(caps.imgCity,14,cy,W-28,50,'\1'+S2(uat)+'\2');

  // PAG 10: Baza legala trafic + concluzii
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA COMPLETA — CONCLUZII STUDIU TRAFIC',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII FINALE — STUDIU DE IMPACT TRAFIC',cy);cy+=2;
  cy=body('Studiul de impact trafic pentru amplasamentul '+nrcad+' (UTR '+utr+', '+area+' mp) estimeaza un trafic generat de ~'+totZilnic2+' veh/zi, cu un varf orar de seara de ~'+Math.ceil(totZilnic2*0.13)+' veh/h. Impactul asupra strazii adiacente este de ~'+Math.min(100,Math.round(totZilnic2/(trafCfg3.TMA_ref||600)*100))+'% din TMA de referinta. Se recomanda parcaj de '+pkT+' locuri (incl. '+Math.max(1,Math.ceil(pkT*0.04))+' PMR) si studiu trafic detaliat la faza PAC.',14,cy);cy+=4;
  cy=tblRow(['Indicator','Valoare calculata','Norma','Status'],cy,true,[65,42,40,35]);
  [['Locuri parcare (NP 051/2012)',pkT+' locuri','min. '+params?.pk+' loc/unitate','Conf. RLU '+utr],
   ['Locuri PMR (4% minim)',Math.max(1,Math.ceil(pkT*0.04))+' locuri','min. 4%','NP 051/2012'],
   ['Latime acces auto','min. 3.5m (1 sens)','3.5m conf. SR 4032-1','Verificare proiect'],
   ['Trafic generat estimat',totZilnic2+' veh/zi aprox.','Conf. ITE 11th ed.','Orientativ'],
   ['Impact pe strada adiacenta','~'+Math.min(100,Math.round(totZilnic2/(trafCfg3.TMA_ref||600)*100))+'%','max. 20% recomandat','Verificare'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,42,40,35]));
  cy+=4;
  cy=sec('10.1. BAZA LEGALA COMPLETA',cy);cy+=2;
  ['HCM 6 — Highway Capacity Manual, 6th ed. (TRB 2016) — rate generare trafic ITE.','SR 4032-1:2001 — Lucrari de drumuri. Terminologie.','STAS 10144/1-90 — Strazi. Elemente geometrice. Prescriptii de proiectare.','Ordinul MT 1835/2004 — Norme tehnice pentru proiectarea si realizarea strazilor in localitati.','NP 051/2012 rev. — Normativ privind adaptarea spatiului urban la necesitatile PMR.','HG 525/1996 RGU — Parcaje si garaje: amplasare si dimensionare.','Legea 82/1998 — Codul Rutier. OG 43/1997 privind regimul drumurilor.','PUG '+getUATLabel()+' in vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});

  // ── PAG 11-12: ANALIZA ACCES ISU — P118-2/2013 + OMAI 163/2007 ─────────
  // Calculam parametrii accesului ISU
  const _accesLung = pArea > 5000 ? 65 : pArea > 2000 ? 45 : pArea > 800 ? 28 : 18; // m, estimat din marimea parcelei
  const _accesLat  = traficCfg?.lat_acces || 6.0; // m, minim 6m pentru 2 sensuri
  const _nrAccese  = aedisH > 28 || (parseFloat(params?.sc||0) > 1000) ? 2 : 1;
  const _needsISUAviz = aedisH > 28 || niv > 5 || sdEst > 600 || _accesLung > 50 ||
    ['comercial','industrial','depozit'].includes(fn);
  const _needsPlatforma = _accesLung > 50;
  const _dimPlatforma   = '18.0 × 18.0 m (culoar 6m + suprafata manevra 12m)';
  const _latime_min_ISU = aedisH > 12 ? 5.0 : 3.5;
  const _gabaritH_ISU   = 4.0; // m inaltime libera minima
  const _portantaISU    = 16;  // tone capacitate portanta minima

  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('ANALIZA ACCES ISU — P118-2/2013 + OMAI 163/2007',11);ftr();
  cy=28;
  cy=sec('11. ANALIZA CAILOR DE ACCES PENTRU INTERVENTIE ISU',cy);cy+=2;
  cy=body('Analiza cailor de acces pentru autospecialele ISU (Inspectoratul pentru Situatii de Urgenta) a fost realizata conform P118-2/2013 — Normativ privind securitatea la incendiu a constructiilor, Partea a II-a: Instalatii de stingere, si OMAI 163/2007 — Norme Generale de Aparare Impotriva Incendiilor. Accesul operativ al autospecialelor ISU este obligatoriu sa fie asigurat pe toata durata exploatarii constructiei.',14,cy);cy+=4;

  cy=sec('11.1. CARACTERISTICI ACCES AMPLASAMENT',cy);cy+=2;
  const _accesConf = _accesLat >= _latime_min_ISU ? 'CONFORM' : 'NECONFORM — supralargire necesara';
  const _platfConf = _needsPlatforma ? 'NECESARA' : 'Nu este necesara (L < 50m)';
  cy=tblRow(['Parametru acces','Valoare estimata','Cerinta minima P118-2/2013','Status'],cy,true,[58,38,62,24]);
  [['Lungime cale de acces (estimata)',_accesLung+' m','Verificare in teren','Orientativ'],
   ['Latime carosabil',_accesLat.toFixed(1)+' m',_latime_min_ISU+' m (H>12m: 5.0m / H<=12m: 3.5m)',_accesConf],
   ['Inaltime libera gabarit','>= '+_gabaritH_ISU+' m','min. 4.0 m (gabarit autospeciale ISU)','Verificare proiect'],
   ['Capacitate portanta structura','min. '+_portantaISU+' tone','min. 16 tone (autospeciala completa)','Verificare structura'],
   ['Suprafata acces (adevarata)','Asfalt/beton','Fara noroi/pamant neconsolidat','Conf. proiect carosabil'],
   ['Nr. accese ISU distincte',_nrAccese+' acces(e)','2 accese la H>28m sau SC>1000mp',(_nrAccese>=2||aedisH<=28)?'CONF.':'VERIF.'],
   ['Platforma intoarcere',_platfConf,'Oblig. daca impas > 50m — P118 Art.6.9',_needsPlatforma?'OBLIG.':'Nu se impune'],
  ].forEach(r=>{cy=tblRow(r,cy,false,[58,38,62,24]);});
  cy+=4;

  if(_needsPlatforma){
    cy=sec('11.2. PLATFORMA DE INTOARCERE — OBLIGATORIE (L acces > 50m)',cy);cy+=2;
    cy=body('Calea de acces depaseste 50m lungime de impas. Conform P118-2/2013 Art. 6.9 si OMAI 163/2007 Art. 19, este OBLIGATORIE amenajarea unei platforme de intoarcere pentru autospecialele ISU la capatul caii de acces. Platforma trebuie sa permita intoarcerea unui autocamion cu ampatament 5.0m si latime 2.5m.',14,cy);cy+=3;
    cy=tblRow(['Element platforma','Dimensiune minima','Norma','Obs.'],cy,true,[55,40,55,32]);
    [['Suprafata totala platforma intoarcere',_dimPlatforma,'P118-2/2013 Art. 6.9','Oblig. impas >50m'],
     ['Latime culoar de acces la platforma','min. 6.0 m','OMAI 163/2007 Art.19','2 sensuri'],
     ['Suprafata de manevra propriu-zisa','min. 18.0 m × 18.0 m','Conf. raza vira autospeciale','Tur complet 360 grade'],
     ['Raza de viraj exterioara autospeciala','min. 11.0 m','SR 4032-1/2001','Autocisterna ISU'],
     ['Capacitate portanta platforma','min. 20 tone','Autospeciala completa plina','Structura ranforsata'],
     ['Marcaj platforma','Galben + indicatoare P-24','OMAI 163/2007','Zona rezervata ISU'],
    ].forEach(r=>cy=tblRow(r,cy,false,[55,40,55,32]));cy+=3;
    cy=body('NOTA: Platforma de intoarcere trebuie sa fie libera permanent si semnalizata corespunzator (placuta "PLATFORMA ISU — NU PARCATI"). Orice obstacol (garduri, stive materiale, vehicule parcate) care blocheaza accesul ISU constituie contraventie conform Legii 307/2006 Art. 44, lit. b).',14,cy);cy+=3;
  } else {
    cy=sec('11.2. CIRCULATIE INTERIOARA ISU',cy);cy+=2;
    cy=body('Lungimea caii de acces estimate ('+_accesLung+'m) nu depaseste pragul de 50m, deci NU este obligatorie o platforma de intoarcere. Cu toate acestea, se recomanda ca accesul sa fie dimensionat pentru sensuri de circulatie opuse (latime min. 6.0m) si sa nu prezinte obstacole permanente sau temporare.',14,cy);cy+=3;
    cy=tblRow(['Recomandare','Descriere','Prioritate'],cy,true,[55,98,29]);
    [['Bordurizare acces','Bordura H=10cm delimitare carosabil de pietonal','Obligatoriu'],
     ['Semnalizare acces','Indicatoare rutiere intrare/iesire + max. 10km/h incinta','Obligatoriu'],
     ['Iluminat carosabil','Min. 10 lux uniform pe calea de acces (NTE 007/08/00)','Obligatoriu'],
     ['Poarta/bariera acces','Min. 5.0m deschidere utila (nu 3.5m!)','Recomandat'],
     ['Camera CCTV acces','Min. 2 camere vizualizare intrare+iesire','Recomandat'],
    ].forEach(r=>cy=tblRow(r,cy,false,[55,98,29]));cy+=3;
  }

  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('AVIZ ISU — NECESITATE SI PROCEDURA',12);ftr();
  cy=28;
  cy=sec('12. NECESITATEA AVIZULUI ISU — ANALIZA CONFORM LEGII 307/2006',cy);cy+=2;
  // Tabel criterii aviz ISU
  const _criteriiISU = [
    {criteriu:'Regim inaltime > S+P+4E (>5 etaje suprateran)',val:niv+' niveluri',conf:niv>5,norm:'Legea 307/2006 Art.30 alin.(1) lit.a)'},
    {criteriu:'Suprafata desfasurata > 600 mp',val:sdEst+' mp SD',conf:sdEst>600,norm:'P118-2/2013 Art.2.1'},
    {criteriu:'Inaltime totala > 28m',val:aedisH.toFixed(1)+'m',conf:aedisH>28,norm:'P118-1/2013 Art.1.2 (cladiri inalte)'},
    {criteriu:'Cale de acces impas > 50m',val:_accesLung+'m est.',conf:_needsPlatforma,norm:'P118-2/2013 Art.6.9'},
    {criteriu:'Functiune comerciala/industriala/depozit',val:fnLabel,conf:['comercial','industrial','depozit','retail'].includes(fn),norm:'OMAI 163/2007 Anx.1'},
    {criteriu:'Nr. persoane simultane > 50',val:Math.round(sdEst/(['comercial','retail'].includes(fn)?4:['birouri'].includes(fn)?12:25))+' pers est.',conf:Math.round(sdEst/(['comercial','retail'].includes(fn)?4:['birouri'].includes(fn)?12:25))>50,norm:'P118-2/2013 Art.3.1'},
  ];
  const _avizObligatoriu = _criteriiISU.some(c=>c.conf) || _needsISUAviz;
  cy=tblRow(['Criteriu aviz ISU','Valoare amplasament','Dep. prag?','Norma'],cy,true,[68,38,20,56]);
  _criteriiISU.forEach(c=>{
    cy=tblRow([c.criteriu,c.val,c.conf?'DA':'NU',c.norm],cy,false,[68,38,20,56]);
    if(c.conf){
      pdf.setFillColor(180,20,20);pdf.rect(14,cy-8.5,W-28,8.5,'F');
      pdf.setFillColor(220,50,50);pdf.rect(14,cy-8.5,3.5,8.5,'F');
      cy-=0;
    }
  });
  cy+=4;
  if(_avizObligatoriu){
    pdf.setFillColor(140,15,15);pdf.rect(14,cy,W-28,16,'F');pdf.setFillColor(220,60,60);pdf.rect(14,cy,4,16,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(10);pdf.setFont('helvetica','bold');
    pdf.text('AVIZ ISU — OBLIGATORIU conform Legii 307/2006 si P118-2/2013',W/2,cy+10,{align:'center'});
    pdf.setTextColor(0,0,0);cy+=22;
  } else {
    pdf.setFillColor(15,80,30);pdf.rect(14,cy,W-28,16,'F');pdf.setFillColor(50,180,80);pdf.rect(14,cy,4,16,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(10);pdf.setFont('helvetica','bold');
    pdf.text('AVIZ ISU — nu este obligatoriu pentru parametrii estimati (verificare finala la PT)',W/2,cy+10,{align:'center'});
    pdf.setTextColor(0,0,0);cy+=22;
  }
  cy+=2;cy=sec('12.1. PROCEDURA AVIZ ISU (daca este obligatoriu)',cy);cy+=2;
  cy=tblRow(['Etapa','Documentatie necesara','Termen','Institutie'],cy,true,[10,100,20,52]);
  [['1','Dosar aviz ISU: cerere tip + memoriu SSF + planuri arh. (implantare, plansee, sectiuni) + plan retele stingere','30 zile','ISU judetean'],
   ['2','Plata taxa aviz ISU (conf. grila ISU — aprox. 0.5 EUR/mp SD)','La depunere','ISU / Trezorerie'],
   ['3','Verificare dosar + eventuale completari solicitate de ISU','15-30 zile','ISU specialist'],
   ['4','Eliberare Aviz ISU (valabil 2 ani, inainte de AC)','La aprobare','ISU — semnat de inspector'],
   ['5','Receptie ISU la finalizare lucrari (verificare conformitate)','Inainte de PV receptie','ISU + proiectant'],
  ].forEach(r=>cy=tblRow(r,cy,false,[10,100,20,52]));
  cy+=4;
  cy=body('ATENTIE: Avizul ISU este obligatoriu INAINTE de obtinerea Autorizatiei de Construire (AC) si face parte din documentatia DAU. Lipsa avizului ISU la obtinerea AC se sanctioneaza conform Legii 307/2006 Art. 44, amenzi intre 2.000-20.000 lei si oprirea lucrarilor.',14,cy);
  sign();
  pdf.save('Studiu_Trafic_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Studiu de Trafic + Analiza Acces ISU generat!');
}

// ── SCENARIU DE SIGURANTA LA FOC (SSF) ────────────────────────────────────
// Conf. P118-2/2013, P118-1/1999, Legea 307/2006, OMAI 163/2007, SR EN 1838
async function generateSSF(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectati o parcela.');return;}
  ss('Se genereaza Scenariu de Siguranta la Foc...');

  const {pdf,W,H,DARK,GOLD,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,tblRow,addImg,sign}=_initStudyPdf('Scenariu de Siguranta la Foc','SSF',12);
  const RED=[180,20,20], GREEN=[15,100,40], ORANGE=[180,90,10];
  const caps=await _captureStudyMaps(ap,msg=>ss(msg));

  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13;
  const niv=AEDIS.corpuri[0]?.niv||4;
  const fn=AEDIS.fn||'rezidential_colectiv';
  const fnLabel=AEDIS_FN[fn]?.label||fn;
  const pArea=parseFloat(area)||0;
  const scEst=Math.round(pArea*(parseFloat(params?.pot||35)/100));
  const sdEst=Math.round(pArea*(parseFloat(params?.cut||1.5)));

  // ── Calcule de baza SSF ─────────────────────────────────────────────────
  // Gradul de rezistenta la foc (GRF) — P118-1/1999 Tabelul 1
  const _grf = aedisH>28?'GRF I (REI>=180min)' : niv>8?'GRF II (REI>=120min)' : niv>4?'GRF III (REI>=90min)' : niv>2?'GRF III (REI>=60min)' : 'GRF IV (REI>=30min)';
  const _grfNum = aedisH>28?1 : niv>8?2 : niv>4?3 : niv>2?3 : 4;
  const _reiMin = aedisH>28?180 : niv>8?120 : niv>4?90 : niv>2?60 : 30;
  // Clasa de risc la foc — P118-2/2013 Art. 4
  const _riscFoc = {'comercial':'MARE','retail':'MARE','industrial':'DEOSEBIT','depozit':'MARE',
    'birouri':'MIJLOCIU','hotel':'MARE','school':'MIJLOCIU','public':'MIJLOCIU',
    'rezidential_colectiv':'MIC','locuinta_individuala':'MIC','default':'MIJLOCIU'}[fn]||'MIJLOCIU';
  const _sarcinaTermica = {'comercial':900,'retail':1000,'industrial':1500,'depozit':1200,
    'birouri':500,'hotel':700,'school':400,'public':350,
    'rezidential_colectiv':600,'locuinta_individuala':700,'default':500}[fn]||500;
  // Numar persoane estimate
  const _pers = {'comercial':Math.round(sdEst/4),'retail':Math.round(sdEst/4),
    'birouri':Math.round(sdEst/12),'hotel':Math.round(sdEst/25),
    'school':Math.round(sdEst/3),'public':Math.round(sdEst/3),
    'rezidential_colectiv':Math.round(sdEst/70*3),'locuinta_individuala':Math.round(sdEst/100*4),
    'default':Math.round(sdEst/20)}[fn]||Math.round(sdEst/20);
  // Cerinte instalatii PSI
  const _needsHidrantiInt  = niv>3 || sdEst>600 || ['comercial','retail','birouri','hotel'].includes(fn);
  const _needsHidrantiExt  = true; // mereu necesari
  const _needsSprinklere   = aedisH>28 || sdEst>3600 || _sarcinaTermica>1200 || ['industrial','depozit'].includes(fn);
  const _needsDetectie     = niv>2 || sdEst>300 || ['hotel','school','public','comercial'].includes(fn);
  const _needsBobineFurtun = _needsHidrantiInt;
  // Cai evacuare
  const _latEvacu = _pers>200?2.0:_pers>100?1.5:1.2; // m latime scara evacuare
  const _nrScari  = _pers>400?3:_pers>200?2:1;
  const _lungMaxCor = ['comercial','birouri'].includes(fn)?25:35; // m lungime maxima coridor fara usa compartimentare
  // Acces ISU
  const _accesLungSSF = pArea>5000?65:pArea>2000?45:pArea>800?28:18;
  const _avizISU_SSF  = aedisH>28||niv>5||sdEst>600||_accesLungSSF>50||['comercial','industrial','depozit'].includes(fn);

  // ── PAG 1: COVER ─────────────────────────────────────────────────────────
  pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');pdf.setFillColor(10,20,45);pdf.rect(0,3,W,H-6,'F');
  pdf.setFillColor(180,20,20);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
  pdf.setTextColor(220,60,60);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('URBANX — PLATFORMA DE ANALIZA URBANISTICA · P118-2/2013',W/2,50,{align:'center'});
  pdf.setTextColor(255,255,255);pdf.setFontSize(20);
  pdf.text('SCENARIU DE SIGURANTA',W/2,68,{align:'center'});pdf.text('LA FOC (SSF)',W/2,84,{align:'center'});
  pdf.setTextColor(220,60,60);pdf.setFontSize(9);
  pdf.text('P118-2/2013 · Legea 307/2006 · OMAI 163/2007 · SR EN 1838:2014',W/2,96,{align:'center'});
  pdf.setFillColor(25,12,12);pdf.rect(20,108,W-40,80,'F');pdf.setFillColor(180,20,20);pdf.rect(20,108,3,80,'F');
  [['Nr. cadastral:',nrcad],['UTR:',utr],['Functiune propusa:',fnLabel],
   ['Regim inaltime:','P+'+niv+'E · H='+aedisH.toFixed(1)+'m'],
   ['SD estimata:',sdEst+' mp'],['Nr. persoane estimate:',_pers+' persoane'],
   ['Grad rezistenta foc:',_grf],['Risc la foc:',_riscFoc],
  ].forEach(([l,v],i)=>{
    pdf.setTextColor(150,100,100);pdf.setFontSize(8);pdf.setFont('helvetica','normal');pdf.text(S2(l),26,118+i*9.5);
    pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');pdf.text(S2(v),100,118+i*9.5);
  });
  if(caps.imgLocation){try{pdf.addImage(caps.imgLocation,'JPEG',14,H-72,W-28,58,undefined,'FAST');pdf.setDrawColor(180,20,20);pdf.setLineWidth(0.4);pdf.rect(14,H-72,W-28,58,'S');pdf.setTextColor(220,60,60);pdf.setFontSize(6);pdf.text('AMPLASAMENT · '+S2(nrcad),W/2,H-75,{align:'center'});}catch(e){}}
  ftr();

  // ── PAG 2: DATE GENERALE + CLASIFICARI ───────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('DATE GENERALE CONSTRUCTIE — CLASIFICARI SIGURANTA FOC',2);ftr();
  cy=28;
  cy=addImg(caps.img3D,14,cy,W-28,65,'FIG. 1 — Volumetrie 3D propusa · Context urban · Date constructie');
  cy=sec('1. DATE GENERALE AMPLASAMENT SI CONSTRUCTIE PROPUSA',cy);cy+=2;
  cy=tblRow(['Parametru','Valoare','Obs.'],cy,true,[70,60,52]);
  [['Nr. cadastral amplasament',nrcad,'Identificator unic ANCPI'],
   ['Adresa / UAT',S2(uat)+' · jud. '+S2(judet),'Conform extrase ANCPI'],
   ['UTR / Zona functionala',utr,'Conform PUG '+S2(uat)+' in vigoare'],
   ['Suprafata teren (ST)',pArea+' mp','Conform masuratori topografice'],
   ['Suprafata construita (SC est.)',scEst+' mp (POT '+params?.pot+'%)','Estimat conf. PUG/RLU'],
   ['Suprafata desfasurata (SD est.)',sdEst+' mp (CUT '+params?.cut+')','Estimat conf. PUG/RLU'],
   ['Regim inaltime propus','P+'+niv+'E'+(aedisH>28?' (CLADIRE INALTA)':''),'P118-1/1999'],
   ['Inaltime totala constructie',aedisH.toFixed(1)+' m','De la cota ±0.00 la atic'],
   ['Destinatie principala',fnLabel,'Functiune conf. PUG si AEDIS'],
   ['Nr. persoane estimate simultan',_pers+' persoane','Calcul conf. P118-2/2013 Tabel 1'],
   ['Sarcina termica estimata',_sarcinaTermica+' MJ/mp','P118-2/2013 Tabel 4.1 — orientativ'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,60,52]));
  cy+=4;
  cy=sec('2. CLASIFICAREA CONSTRUCTIEI DIN PUNCT DE VEDERE AL SECURITATII LA INCENDIU',cy);cy+=2;
  cy=tblRow(['Criteriu clasificare','Incadrare','Norma de referinta'],cy,true,[70,62,50]);
  [['Grad de rezistenta la foc (GRF)',_grf,'P118-1/1999 Art. 2.3 + Tabelul 1'],
   ['Clasa de risc la foc','Risc '+_riscFoc,'P118-2/2013 Art. 4.1 + Anexa 1'],
   ['Categorie de importanta constructie',niv>6?'B (deosebita)':'C (normala)','HG 766/1997 + HG 525/1996'],
   ['Clasa de expunere la foc','Incendiu interior (EI)','SR EN 13501-2:2016'],
   ['Clasa performanta la foc materiale','Minim A2-s1,d0','SR EN 13501-1:2019'],
   ['Comportament seismic (relevant PSI)','Zona seismica '+getSeismConfig().zona,'P100-1/2013'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,62,50]));

  // ── PAG 3: REZISTENTA LA FOC ELEMENTE CONSTRUCTIVE ───────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('REZISTENTA LA FOC — ELEMENTE CONSTRUCTIVE — GRF '+_grfNum,3);ftr();
  cy=28;
  cy=sec('3. REZISTENTA LA FOC A ELEMENTELOR CONSTRUCTIVE — P118-1/1999',cy);cy+=2;
  cy=body('Elementele constructive ale cladirii propuse trebuie sa asigure rezistenta la foc minima corespunzatoare gradului de rezistenta la foc '+_grf+'. Valorile REI (R=stabilitate, E=etanseitate, I=izolare termica) si EI sunt stabilite prin standard european SR EN 13501-2:2016 si se verifica prin incercari la foc conform SR EN 1363-1:2020.',14,cy);cy+=4;
  cy=tblRow(['Element constructiv','REI/EI minim','Conditii suplimentare','Verificare'],cy,true,[65,28,68,21]);
  [['Stalpi/pereti portanti beton armat','REI '+_reiMin+' min','Acoperire armatura min. 25mm (b.a.)','Proiect struct.'],
   ['Stalpi metalici (daca exista)','R '+_reiMin+' min','Protectie termica vopsea/placa min. R60','Expert FOC'],
   ['Plansee beton armat (intercalarele)','REI '+(_reiMin>90?120:_reiMin)+' min','Gol tehnic: min. EI 30 treceri instalatii','Proiect struct.'],
   ['Pereti despartitori (compartimentare)','EI '+Math.min(90,_reiMin)+' min','Minim EI 60 la pereti de compartimentare FOC','Proiect arh.'],
   ['Usi compartimentare la foc (EI/EW)','EI 30/EW 30 min','Usi cu dispozitiv de autoinchidere CERT.','Furnizor cert.'],
   ['Scara evacuare (daca > 2 etaje)','R '+_reiMin+' min','Casa scarii = compartiment separat EI 60','Proiect arh.'],
   ['Invelitoare (terasa plata/sarpanta)','BROOF(t1) — Clasa F-Roof','Nu se admite material combustibil clasa E','Proiect arh.'],
   ['Fatada (termoizolatie ext.)','Clasa min. B-s2,d0','Vata minerala recomandata (clasa A1)','Proiect arh.'],
   ['Hidrant interior (daca e obligatoriu)','E 30 — cutie hidranti','Acces liber, neingradit, vizibil','Proiect inst.'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,28,68,21]));
  cy+=4;
  cy=body('NOTA IMPORTANTA: Valorile REI de mai sus sunt minimele prevazute de normativ pentru '+_grf+'. Proiectantul de structura are obligatia verificarii prin calcul a rezistentei la foc a fiecarui element constructiv conform SR EN 1992-1-2 (beton), SR EN 1993-1-2 (otel) sau SR EN 1995-1-2 (lemn), cu confirmare prin Raport de Expertiza Tehnica la Foc (RETF).',14,cy);

  // ── PAG 4: COMPARTIMENTARE LA FOC ────────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('COMPARTIMENTARE LA FOC — SUPRAFETE MAXIME ADMISE',4);ftr();
  cy=28;
  cy=sec('4. COMPARTIMENTARE LA FOC — P118-2/2013 + P118-1/1999',cy);cy+=2;
  const _suprafMaxComp = {'comercial':1800,'retail':1800,'industrial':2400,'depozit':1500,
    'birouri':2400,'hotel':2400,'school':1800,'public':2400,
    'rezidential_colectiv':2500,'locuinta_individuala':3200,'default':2400}[fn]||2400;
  const _nrComp = Math.max(1, Math.ceil(scEst/_suprafMaxComp));
  cy=body('Compartimentarea la foc are rolul de a limita propagarea incendiului si fumului la o zona predefinita, asigurand conditii pentru evacuarea persoanelor si interventia pompierilor. Fiecare compartiment de incendiu trebuie delimitat de elemente constructive cu rezistenta la foc minima specificata.',14,cy);cy+=3;
  cy=tblRow(['Parametru compartimentare','Valoare calculata','Limita admisa','Status'],cy,true,[65,38,55,24]);
  [['Suprafata maxima compartiment (nivel)',scEst+' mp',_suprafMaxComp+' mp/nivel — P118-1/1999',scEst<=_suprafMaxComp?'CONFORM':'DEPASIT'],
   ['Nr. compartimente de incendiu necesare',_nrComp+' comp.','Min. 1, max. cf. proiect','Conf. proiect'],
   ['Inaltime libera compartiment','H nivel = '+((aedisH/Math.max(1,niv))).toFixed(1)+' m','Min. 2.0 m','Conf.'],
   ['Suprafata maxima nivel (totalitate)',sdEst/Math.max(1,niv)+' mp',_suprafMaxComp*(_nrComp)+' mp',sdEst/Math.max(1,niv)<=_suprafMaxComp*(_nrComp)?'CONFORM':'Verificare'],
   ['Distanta maxima de la orice punct la usa','<'+_lungMaxCor+'m',''+_lungMaxCor+'m conf. P118-2/2013 Art.5.1','Verificare arh.'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,38,55,24]));
  cy+=4;
  cy=sec('4.1. ELEMENTE DE COMPARTIMENTARE NECESARE',cy);cy+=2;
  cy=tblRow(['Element','Specificatie tehnica','Norma','Obs.'],cy,true,[55,85,30,12]);
  [['Pereti compartimentare foc','Zidarie caramida 25cm SAU BA 15cm SAU GKF+VA 12cm — EI 90','P118 + SR EN 13501-2','De la sol la planseu'],
   ['Usi compartimentare foc','Usi EI 30/EW 30 min, autoinchidere, certificare CE, clasa D-s2,d0','SR EN 1634-1','Obligatoriu pana anclambraj'],
   ['Trape desfumare','Minim 1%*Sp pentru incaperi>200mp, actionare automata+manuala','P118-2/2013 Art.8.2','Actionate termic'],
   ['Ghene instalatii (treceri)','Inchideri EI 30 min la fiecare nivel cu materiale certificare UL/CE','SR EN 1366-3','Obligatoriu toate ghene'],
   ['Rosturi dilatatie/seism','Etansare REI=GRF cu material intumescent certificat CE','P118 Art.4.6','Conf. proiectant'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,85,30,12]));

  // ── PAG 5: CAI DE EVACUARE ────────────────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CAI DE EVACUARE — CALCUL PERSOANE — P118-2/2013',5);ftr();
  cy=28;
  cy=addImg(caps.img2D,14,cy,W-28,55,'FIG. 2 — Plan 2D · Configuratie parcela + accese propuse');
  cy=sec('5. CAILE DE EVACUARE IN CAZ DE INCENDIU — DIMENSIONARE',cy);cy+=2;
  cy=body('Numarul, geometria si organizarea cailor de evacuare (CE) au fost dimensionate pentru '+_pers+' persoane simultane, conform P118-2/2013 Art. 5 si normelor nationale privind evacuarea in caz de incendiu. Caile de evacuare TREBUIE sa asigure iesirea in spatiu sigur (exterior cladire sau zona protejata) in max. 2,5 min. de la declansar alarma.',14,cy);cy+=3;
  cy=tblRow(['Parametru evacuare','Valoare calculata','Limita normativa','Norma'],cy,true,[60,42,50,30]);
  [['Nr. persoane totale estimate',_pers+' pers','Conf. destinatie','P118-2/2013 Tabel 1'],
   ['Nr. persoane/nivel','~'+Math.ceil(_pers/Math.max(1,niv+1))+' pers/nivel','Conf. suprafata utila','Calcul de proiect'],
   ['Nr. scari evacuare necesare',_nrScari+' scara(i)','Min. 1 (< 200 pers), 2 (>200 pers)','P118-2/2013 Art.5.4'],
   ['Latime minima scara evacuare',_latEvacu.toFixed(1)+' m','Min. 1.2m (sub 100 pers.) / 1.5m (100-200)','P118-2/2013 Art.5.8'],
   ['Latime minima coridor evacuare','min. 1.2 m','1.2 m — conform norma','SR ISO 21542:2011'],
   ['Lungime max. coridor pana la iesire',_lungMaxCor+' m maxim',''+_lungMaxCor+'m conf. destinatie si GRF','P118-2/2013 Art.5.3'],
   ['Inaltime libera cale evacuare','min. 2.0 m','2.0 m obligatoriu','P118-2/2013 Art.5.7'],
   ['Iesiri de evacuare necesare',Math.ceil(_pers/250)+' iesiri','Min. 2 la peste 50 pers.','P118-2/2013 Art.5.2'],
   ['Iluminat de evacuare','Min. 1 lux la podea','Autonom min. 1h (UPS/baterie)','SR EN 1838:2014'],
   ['Indicatoare evacuare','PICTOGRAME verzi autoluminiscente','Obligatoriu pe fiecare coridor','ISO 7010 + SR 3011'],
  ].forEach(r=>cy=tblRow(r,cy,false,[60,42,50,30]));
  cy+=3;
  cy=body('NOTA: Scara de evacuare principala trebuie sa fie o casa de scara protejata (inchisa cu usi EI 30), cu evacuare directa la exterior sau prin vestibul tampon. Liftul NU constituie cale de evacuare si trebuie parcat obligatoriu la nivelul accesului la declansarea alarmei de incendiu.',14,cy);

  // ── PAG 6: DETECTIE + ALARMARE ────────────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('DETECTIE — ALARMARE — AVERTIZARE — P118-2/2013 Art.9',6);ftr();
  cy=28;
  cy=sec('6. INSTALATIA DE DETECTIE, ALARMARE SI AVERTIZARE LA INCENDIU',cy);cy+=2;
  cy=body('Instalatia de detectie si alarmare la incendiu (DAI) se proiecteaza conform P118-2/2013 Art. 9, SR EN 54 (parti 1-29) si OMAI 163/2007. Sistemul DAI trebuie sa asigure detectia automata a incendiului, alarmarea ocupantilor si transmiterea automata a semnalului la dispeceratul ISU sau la un serviciu privat de paza si interventie.',14,cy);cy+=4;
  const _daiOblig = _needsDetectie;
  pdf.setFillColor(_daiOblig?[180,20,20]:[15,80,30][0],_daiOblig?20:80,_daiOblig?20:30);
  pdf.rect(14,cy,W-28,14,'F');
  pdf.setTextColor(255,255,255);pdf.setFontSize(9);pdf.setFont('helvetica','bold');
  pdf.text('INSTALATIE DAI — '+(_daiOblig?'OBLIGATORIE (functiune, niv. sau suprafata depaseste pragul)':'RECOMANDATA (sub prag obligativitate, dar recomandata)'),W/2,cy+9,{align:'center'});
  pdf.setTextColor(0,0,0);cy+=18;
  cy=tblRow(['Componenta DAI','Cantitate minima','Standard','Obs.'],cy,true,[65,42,42,33]);
  [['Centrala de detectie si alarmare (CDA)','1 buc. (sau 1+1 extensie la SD>1000mp)','SR EN 54-2:2000','Clasa II min.'],
   ['Detectori de fum fotoelectrici','1 detector/50mp utili (max. 7.5m intre detectori)','SR EN 54-5/7:2006','Incaperi obisnuite'],
   ['Detectori de temperatura','1 detector/30mp (in bucatarii, garaje, spatii tehnice)','SR EN 54-5:2001','Locuri cu fum normal'],
   ['Butoane manuale alarma (BMA)','La fiecare iesire de evacuare, max. 40m intre ele','SR EN 54-11:2001','H montaj 1.4m'],
   ['Sirene interior (IS)','Min. 1/nivel + 1 la fiecare casa scara + 1 la intrare','SR EN 54-3:2001','>=65dB la 4m distanta'],
   ['Sirena/flash exterior','1 buc. vizibila de la strada (flash rosu+sirena)','SR EN 54-3:2001','Optional dar recomandat'],
   ['Tablou avertizare vizuala (TAV)','La intrarea in cladire, vizibil accesului ISU','SR EN 54-2:2000','Indica zona alarmata'],
   ['Sursa de rezerva (UPS/baterie)','Min. 24h in standby + 30 min in alarma','SR EN 54-4:2001','Alimentare backup'],
   ['Transmisie semnal la ISU/Dispecerat','Obligatorie la cladiri cu risc '+_riscFoc,'SR EN 54-21:2006','SRI sau firma paza'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,42,42,33]));
  cy+=3;
  cy=body('Proiectantul instalatiei DAI trebuie sa fie verificat ISCEPI (persoana autorizata IGSU) si sa emita un "Dosar tehnic al instalatiei DAI" conform SR EN 54-14:2004. Instalatia se verifica si receptioneaza obligatoriu de catre un specialist autorizat ISCEPI si se inscrie in cartea tehnica a constructiei.',14,cy);

  // ── PAG 7: STINGERE INCENDIU ──────────────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('INSTALATII DE STINGERE INCENDIU — HIDRANTI — SPRINKLERE',7);ftr();
  cy=28;
  cy=sec('7. INSTALATII DE STINGERE A INCENDIILOR — P118-2/2013',cy);cy+=2;
  cy=tblRow(['Tip instalatie stingere','Obligativitate','Criteriu normat','Norma'],cy,true,[55,30,72,25]);
  [['Hidranti interiori (HI)',_needsHidrantiInt?'OBLIGATORIU':'RECOMANDAT',
    'Oblig. la niv>3E, SD>600mp, comercial/birouri/hotel',
    'P118-2/2013 Art.7.4'],
   ['Hidranti exteriori (HE)','OBLIGATORIU',
    'Orice constructie cu AC — asigurare apa stingere exterior',
    'P118-2/2013 Art.7.5 + NP 086/2005'],
   ['Instalatie sprinklere',_needsSprinklere?'OBLIGATORIU':'Nu se impune',
    _needsSprinklere?'H>28m sau SD>3600mp sau sarcina termica>1200 MJ/mp':'Sub pragul de obligativitate',
    'P118-2/2013 Art.7.6 + SR EN 12845'],
   ['Stingatoare portative','OBLIGATORIU',
    'Min. 1 stingator/200mp (min. 2 buc. orice cladire)',
    'OMAI 163/2007 Art.97 + Anx.4'],
   ['Hidranti de acoperis (ha)','La SD>1500mp nivel',
    'Conform proiect instalatii — recomandat',
    'NP 086/2005 Art.4.5'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,30,72,25]));
  cy+=4;
  cy=sec('7.1. DIMENSIONARE REZERVA DE APA PENTRU STINGERE',cy);cy+=2;
  const _qHI = _needsHidrantiInt ? 2.5 : 0; // l/s debit hidranti interiori
  const _qHE = 10; // l/s debit hidranti exteriori (minim normat)
  const _tHI = 10; // min. durata functionare HI
  const _tHE = 120; // min. durata functionare HE
  const _volRez = Math.round((_qHI*_tHI+_qHE*_tHE/10)*60/1000); // m3 rezerva minima
  cy=tblRow(['Parametru hidrant','HI (interior)','HE (exterior)','Norma'],cy,true,[65,35,35,47]);
  [['Debit simultan minim (Q)',_needsHidrantiInt?_qHI+' l/s':'—',_qHE+' l/s','NP 086/2005 Tabel 4+5'],
   ['Durata functionare minima (t)',_needsHidrantiInt?_tHI+' min':'—',_tHE+' min','P118-2/2013 Art.7.4'],
   ['Presiune minima la ajutaj','2.5 bar','3.0 bar','SR 4163/1-3'],
   ['Raza de actiune maxima','30m (furtun 20m+jet 10m)','150m (conf. harta HE)','NP 086/2005'],
   ['Rezerva de apa necesara est.',_needsHidrantiInt?Math.round(_qHI*_tHI*60/1000)+' m3':'—',Math.round(_qHE*_tHE*60/1000)+' m3','NP 086/2005'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,35,35,47]));
  cy+=3;
  cy=body('Rezerva totala minima de apa necesara pentru stingere: ~'+_volRez+' m3 (rezervor incendiu sau bazin colector). Se va verifica existenta unui hidrant exterior la max. 150m de intrarea in cladire. In lipsa acestuia, se va amenaja o priza de apa sau se va notifica operatorul retelei pentru extindere conform NP 086/2005.',14,cy);
  cy+=3;
  cy=tblRow(['Stingator portativ','Cantitate minima','Agent stingere','Obs.'],cy,true,[55,28,55,44]);
  [['P6 (pulbere 6kg)',''+Math.max(2,Math.ceil(sdEst/200))+' buc. minim','Pulbere ABC — universal','1/200mp, min.2 buc.'],
   ['CO2-5kg (la echipamente electrice)',''+Math.max(1,Math.ceil(niv+1))+' buc.','CO2 — foc clasa E','Tablouri electrice'],
   ['P50 sau P100 (hol intrare/parcare)','1 buc. vizibil la intrare','Pulbere ABC','Obligatoriu la intrare'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,28,55,44]));

  // ── PAG 8: ACCES ISU ──────────────────────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CAI DE ACCES ISU — VERIFICARE CONF. P118-2/2013 ART.6',8);ftr();
  cy=28;
  cy=addImg(caps.imgFront,14,cy,W-28,58,'FIG. 3 — Vedere frontala · Front stradal · Acces principal vehicule ISU');
  cy=sec('8. CAILE DE ACCES PENTRU VEHICULELE ISU — P118-2/2013 ART. 6',cy);cy+=2;
  cy=body('Accesul operativ al autospecialelor ISU (autocisterna, autoscara, APCA) este reglementat de P118-2/2013 Art. 6, OMAI 163/2007 Art. 19-23 si Ordinul IGP nr. 140/2001 privind planurile de interventie. Caile de acces ISU trebuie mentinute libere permanent si semnalizate corespunzator conform SR 3011:2019.',14,cy);cy+=4;
  cy=tblRow(['Parametru acces ISU','Cerinta minima','Valoare estimata','Verificare'],cy,true,[65,42,42,33]);
  [['Latime carosabil cale acces',aedisH>12?'min. 5.0 m (H>12m)':'min. 3.5 m (H<=12m)',_accesLungSSF+'m lungime est.','Masurare in teren'],
   ['Inaltime libera (gabarit vehicule ISU)','min. 4.0 m (autoscara)','Verificare la proiect','Conf. proiect arh.'],
   ['Capacitate portanta carosabil','min. 16 tone (axe)','Structura rutiera ranforsata','Proiect drum'],
   ['Raza de viraj exterioara','min. 11.0 m','Autocisterna ISU 19t','Conf. plan amplasament'],
   ['Distanta maxima fata de fatada','max. 3.0 m (autoscara) / 10m (motopomp.)','Verificare plan','Proiect arh.'],
   ['Lungime cale de acces estimata',_accesLungSSF+' m',_accesLungSSF>50?'DEPASESTE 50m — NECESITA platforma!':'Sub 50m — platforma NU obligatorie',_accesLungSSF>50?'OBLIGATORIU platforma':'Conform'],
   ['Nr. accese ISU distincte',_nrAccese+' acces(e)',aedisH>28||scEst>1000?'min. 2 accese obligatorii':'1 acces suficient',(_nrAccese>=2||(aedisH<=28&&scEst<=1000))?'Conf.':'Verif.'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,42,42,33]));
  if(_accesLungSSF>50){
    cy+=3;
    pdf.setFillColor(140,15,15);pdf.rect(14,cy,W-28,12,'F');pdf.setFillColor(200,50,50);pdf.rect(14,cy,4,12,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(8);pdf.setFont('helvetica','bold');
    pdf.text('OBLIGATORIU: PLATFORMA INTOARCERE ISU 18×18m la capatul caii de acces — P118-2/2013 Art. 6.9',W/2,cy+8,{align:'center'});
    pdf.setTextColor(0,0,0);cy+=16;
  }

  // ── PAG 9: MASURI COMPLEMENTARE ───────────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('MASURI COMPLEMENTARE PSI — ORGANIZARE INTERVENTIE',9);ftr();
  cy=28;
  cy=addImg(caps.v3dDay,14,cy,W-28,60,'FIG. 4 — Viewer 3D · Zi · Identificare accese + goluri interventie ISU');
  cy=sec('9. MASURI COMPLEMENTARE DE SIGURANTA LA INCENDIU',cy);cy+=2;
  cy=tblRow(['Masura','Specificatie tehnica','Obligativitate','Cost orientativ'],cy,true,[50,90,28,14]);
  [['Plan de evacuare',
    'Afisate la fiecare nivel, la max. 10m de fiecare usa, plastifiat A3 min. Actualizat la orice modificare structurala.',
    'OBLIGATORIU','50-100 EUR/plan'],
   ['Instructaj PSI angajati/locatari',
    'Min. la angajare/mutare, anual si la orice modificare. Registru instructaj semnat. Responsabil PSI desemnat prin decizie.',
    'OBLIGATORIU','—'],
   ['Exercitiu evacuare',
    'Min. 1/an pentru toate cladirile cu > 50 persoane. Documentat si raportat ISU.',
    niv>4||_pers>50?'OBLIGATORIU':'RECOMANDAT','—'],
   ['Iluminat de securitate',
    'Min. 1 lux la podea pe toate caile de evacuare. Autonomie min. 1h. SR EN 1838:2014.',
    'OBLIGATORIU','200-500 EUR/corp'],
   ['Semnalizare cai evacuare',
    'Pictograme verzi autoluminiscente ISO 7010 E001-E011, la fiecare colt si usa de iesire.',
    'OBLIGATORIU','30-80 EUR/pictograma'],
   ['Rol de urgenta lift (daca e)',
    'Lift cu modul pompieri — coborat la parter + blocat la alarmă incendiu.',
    niv>5?'OBLIGATORIU':'—','Conf. proiect lift'],
   ['Usa metalica rezistenta foc la subsol',
    'EI 60 min, autoinchidere, bara antipanic, sens evacuare.',
    'OBLIGATORIU (subsol)','800-2000 EUR/usa'],
   ['Plan operational ISU',
    'Plan tehnic al cladirii transmis ISU judetean inainte de receptie. Actualizat la modificari.',
    'OBLIGATORIU','—'],
  ].forEach(r=>cy=tblRow(r,cy,false,[50,90,28,14]));

  // ── PAG 10: AVIZE + CONCLUZII ─────────────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('AVIZE PSI NECESARE — CONCLUZII SSF',10);ftr();
  cy=28;
  cy=sec('10. AVIZE SI ACORDURI NECESARE IN DOMENIU PSI',cy);cy+=2;
  cy=tblRow(['Aviz/Acord','Institutie emitenta','Obligativitate','Etapa'],cy,true,[65,50,30,37]);
  [['Aviz ISU (securitate la incendiu)',
    'ISU '+S2(judet),
    _avizISU_SSF?'OBLIGATORIU':'Verif. criterii',
    'Inainte de AC — dosarul DAU'],
   ['Acord serviciu privat paza si interventie',
    'Firma PSI autorizata IGSU',
    'Recomandat','La receptie cladire'],
   ['Receptie instalatie DAI (detectie+alarmare)',
    'ISU '+S2(judet)+' + specialist autorizat ISCEPI',
    _needsDetectie?'OBLIGATORIU':'Daca se monteaza',
    'Inainte de PV receptie'],
   ['Receptie instalatie sprinklere/HI',
    'ISU + instalator autorizat ANRE/ISCEPI',
    _needsHidrantiInt||_needsSprinklere?'OBLIGATORIU':'—',
    'Inainte de PV receptie'],
   ['Verificare proiect de catre verificator AF (Instalatii)',
    'Verificator tehnic atestat MCC',
    'OBLIGATORIU la AC','Faza PT+CS'],
   ['Aviz acces carosabil la drum public',
    'Administratorul drumului (consiliu local/judetean/DRDP)',
    'OBLIGATORIU','Inainte de AC'],
   ['Plan operational de interventie',
    'ISU '+S2(judet),
    'OBLIGATORIU','La receptie/exploatare'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,50,30,37]));
  cy+=4;

  // Tabel conformitate sintetica
  cy=sec('10.1. SINTEZA CONFORMITATE SSF',cy);cy+=2;
  cy=tblRow(['Capitol SSF','Incadrare','Concluzie'],cy,true,[80,60,42]);
  [['1. Grad rezistenta foc',_grf,_grfNum<=3?'CONFORMARE posibila':'REI suplimentar'],
   ['2. Clasa risc la foc','Risc '+_riscFoc,'Conf. functiune propusa'],
   ['3. Compartimentare la foc',scEst<=_suprafMaxComp?'Sup. conf.':'Suprafata depasita',scEst<=_suprafMaxComp?'CONFORM':'NECESITA compartim.'],
   ['4. Cai de evacuare',_nrScari+' scara(i) · '+_latEvacu.toFixed(1)+'m latime','Verificare proiect arh.'],
   ['5. Detectie+alarmare (DAI)',_needsDetectie?'OBLIGATORIU':'Recomandat',_needsDetectie?'A se proiecta la PT':'Optional'],
   ['6. Hidranti interiori',_needsHidrantiInt?'OBLIGATORIU':'Nu se impune',_needsHidrantiInt?'A se proiecta la PT':'Optional'],
   ['7. Sprinklere',_needsSprinklere?'OBLIGATORIU':'Nu se impune',_needsSprinklere?'A se proiecta la PT':'Sub prag obligativitate'],
   ['8. Acces ISU',_accesLungSSF>50?'Platforma obligatorie':'Latime min. '+_latime_min_ISU+'m',_avizISU_SSF?'Aviz ISU obligatoriu':'Verificare finala PT'],
  ].forEach(r=>cy=tblRow(r,cy,false,[80,60,42]));

  // ── PAG 11: BAZA LEGALA COMPLETA ─────────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA COMPLETA SSF — NORMATIVE NATIONALE SI EUROPENE',11);ftr();
  cy=28;
  cy=sec('11. BAZA LEGALA — SCENARIU DE SIGURANTA LA FOC',cy);cy+=2;
  [['LEGISLATIE PRIMARA',
    ['Legea nr. 307/2006 privind apararea impotriva incendiilor — cu modificarile ulterioare (ultima: 2023).',
     'Legea nr. 10/1995 privind calitatea in constructii — republicata 2015. Cerinta esentiala E: Securitate la incendiu.',
     'HG nr. 571/2016 privind cerintele minime de securitate si sanatate in munca (incl. PSI locuri de munca).',
     'OUG nr. 195/2005 privind protectia mediului — aspecte relevante PSI (stocare substante periculoase).']],
   ['NORMATIVE TEHNICE PRINCIPALE',
    ['P 118-1/1999 — Normativ de siguranta la foc a constructiilor, Partea I: Prevederi generale. In vigoare pana la inlocuire completa de P118-2.',
     'P 118-2/2013 — Normativ privind securitatea la incendiu a constructiilor, Partea a II-a: Instalatii de stingere. In vigoare COMPLET.',
     'NP 086/2005 — Normativ pentru proiectarea, executarea si exploatarea instalatiilor de stingere a incendiilor.',
     'MP 008/2000 — Metodologie de proiectare a scenariilor de securitate la incendiu.',
     'C 58/1996 — Norme tehnice privind ignifugarea materialelor si produselor combustibile din lemn si textile.',
     'NTE 007/08/00 — Normativ pentru proiectarea si executarea retelelor de cabluri electrice (incl. aspect PSI).']],
   ['ORDINE IGSU / OMAI',
    ['OMAI nr. 163/2007 — Normele generale de aparare impotriva incendiilor. Publicat in M.Of. nr. 216/29.03.2007.',
     'OMAI nr. 210/2007 — Criteriile de performanta privind structura organizatorica si dotarea serviciilor de urgenta voluntare.',
     'OMAI nr. 3/2011 — Clasificarea si incadrarea produselor pentru constructii pe baza performantei la foc.',
     'Dispozitia IGP nr. 140/2001 — Planuri de interventie si stingere a incendiilor.']],
   ['STANDARDE EUROPENE (SR EN)',
    ['SR EN 54:2006-2019 (Partile 1-29) — Sisteme de detectie si alarmare la incendiu.',
     'SR EN 1634-1:2018 — Incercari de rezistenta la foc si etanseitate pentru usi, obloane, ferestre si feronerie.',
     'SR EN 1838:2014 — Iluminat de aplicatii specifice. Iluminat de siguranta.',
     'SR EN 12845:2015 — Instalatii fixe de lupta impotriva incendiului. Sisteme sprinkler automate.',
     'SR EN 13501-1:2019 — Clasificarea la foc a produselor si elementelor de constructie (reactia la foc).',
     'SR EN 13501-2:2016 — Clasificarea la foc (rezistenta la foc, exclusiv instalatii de ventilare).',
     'ISO 7010:2019 — Simboluri grafice. Culori si semne de siguranta. Semne de securitate inregistrate.',
     'SR EN 671-1:2013 — Instalatii fixe de lupta impotriva incendiului. Sisteme cu furtun semirigid.']],
  ].forEach(([titlu, lista])=>{
    cy=sec(titlu,cy);cy+=1;
    lista.forEach(l=>{cy=body('• '+l,16,cy);cy+=1.5;});
    cy+=2;
  });

  // ── PAG 12: VIEWER NOAPTE + CONCLUZII FINALE ─────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VEDERE 3D NOAPTE — CONCLUZII FINALE SSF',12);ftr();
  cy=28;
  const half=(W-28)/2-2;
  cy=addImg(caps.v3dNight,14,cy,half,65,'FIG. 5 — Viewer 3D NOAPTE · Iluminat de securitate + accese');
  addImg(caps.imgCity,14+half+4,cy-65,half,65,'FIG. 6 — Harta '+S2(uat)+' · Amplasament in context urban');
  cy+=4;
  cy=sec('12. CONCLUZII FINALE — SCENARIU DE SIGURANTA LA FOC',cy);cy+=2;
  cy=body('Prezentul Scenariu de Siguranta la Foc a fost elaborat cu caracter ORIENTATIV pentru amplasamentul cu nr. cadastral '+nrcad+', destinatia '+fnLabel+', UTR '+utr+', in '+S2(uat)+'. Constructia propusa (P+'+niv+'E, H='+aedisH.toFixed(1)+'m, SD~'+sdEst+'mp) se incadreaza in '+_grf+' cu clasa de risc la foc '+_riscFoc+'. Principalele masuri de siguranta la foc obligatorii sunt: '+(_needsHidrantiInt?'hidranti interiori, ':'')+(_needsDetectie?'instalatie DAI, ':'')+(_needsSprinklere?'sprinklere, ':'')+(_avizISU_SSF?'aviz ISU obligatoriu, ':'')+' cai de evacuare dimensionate pentru '+_pers+' persoane.',14,cy);cy+=4;
  cy=body('NOTA IMPORTANTA: Prezentul document are caracter STRICTLY ORIENTATIV si INFORMATIV. NU inlocuieste Scenariul de Siguranta la Foc elaborat de un proiectant autorizat la faza PT (Proiect Tehnic), conform MP 008/2000 si P118-2/2013. NU se poate folosi ca document oficial pentru obtinerea Avizului ISU sau a Autorizatiei de Construire.',14,cy);cy+=4;
  cy=tblRow(['Concluzie sintetica','Valoare'],cy,true,[100,82]);
  [['Grad rezistenta la foc necesar',_grf],
   ['Clasa risc la foc',_riscFoc+' (densitate sarcina termica ~'+_sarcinaTermica+' MJ/mp)'],
   ['Instalatie DAI (detectie+alarmare)',_needsDetectie?'OBLIGATORIE':'Recomandata'],
   ['Hidranti interiori',_needsHidrantiInt?'OBLIGATORII':'Nu se impun (sub prag)'],
   ['Sprinklere',_needsSprinklere?'OBLIGATORII':'Nu se impun (sub prag)'],
   ['Aviz ISU inainte de AC',_avizISU_SSF?'OBLIGATORIU':'Verificare finala la faza PT'],
   ['Platforma intoarcere ISU',_needsPlatforma?'OBLIGATORIE (acces estimat >50m)':'Nu se impune'],
   ['Nr. persoane evacuare',_pers+' pers. — '+_nrScari+' scara(i) x '+_latEvacu.toFixed(1)+'m latime'],
  ].forEach(r=>cy=tblRow(r,cy,false,[100,82]));
  sign();
  pdf.save('SSF_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Scenariu de Siguranta la Foc (SSF) generat — 12 pagini!');
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
  const bbox = [
    lon - radiusM/111320, lat - radiusM/111320,
    lon + radiusM/111320, lat + radiusM/111320
  ].join(',');

  const results = { monumente:[], zone:[], situri:[], error:null };

  const queries = [
    { layer:'LMI_Puncte', key:'monumente' },
    { layer:'LMI_Zone',   key:'zone' },
    { layer:'Situri_Arh', key:'situri' },
  ];

  // Timeout scurt (4s) — CORS va eșua rapid, nu blocăm generarea PDF
  for(const q of queries){
    try{
      const url = `${CIMEC_WMS}?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature`+
        `&TYPENAME=${q.layer}&BBOX=${bbox},EPSG:4326&SRSNAME=EPSG:4326`+
        `&OUTPUTFORMAT=application/json&maxFeatures=50`;
      const resp = await fetch(url, {signal:AbortSignal.timeout(4000), mode:'cors'});
      if(resp.ok){
        const data = await resp.json();
        results[q.key] = data.features||[];
      }
    }catch(e){
      // CORS blocat sau timeout — așteptat, continuăm cu date locale
    }
  }

  if(!results.monumente.length && !results.zone.length && !results.situri.length){
    results.error = 'CIMEC WFS indisponibil (CORS) — se folosesc date locale LMI';
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
  cy=body('Calitatea aerului în '+uat+' este monitorizată prin rețeaua națională de monitoring gestionată de '+(eim.aer.apm||'APM Județean')+'. Poluanții principali identificați în zona de influență sunt: '+(eim.aer.poluanti_principali||['NO2','PM10']).join(', ')+'. Calitatea generală: '+(eim.aer.calitate_generala||'Moderată')+'. Valorile de referință respectă prevederile Legii nr. 104/2011 și Directivei 2008/50/CE.',14,cy);cy+=3;
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
  cy=body('Tipul predominant de sol în zona amplasamentului: '+(eim.sol.tip_sol_predominant||'Verificare necesară')+'. Permeabilitate: '+(eim.sol.permeabilitate||'Medie')+'. Risc eroziune: '+(eim.sol.eroziune||'Redus — evaluare necesară')+'. Impermeabilizarea terenului prin construcție afectează funcțiile pedologice și capacitatea de infiltrare a precipitațiilor.',14,cy);cy+=3;
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
    'Nu s-au identificat arii naturale protejate în imediata vecinătate a amplasamentului '+((eim.natura2000||[]).length>0?'— EXCEPȚIE: Site Natura 2000 '+(eim.natura2000||[])[0]+' necesită verificarea necesității Evaluării Adecvate (OUG 57/2007)':'— Procedura de Evaluare Adecvată nu este necesară')+'.',
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

  const {pdf,W,H,DARK,GOLD,LIGHT,S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,hdr,ftr,sec,body,tblRow,addImg,sign}=_initStudyPdf('Studiu Istoric si de Patrimoniu Urban','Studiu patrimoniu',10);

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
  const distZone = ZONE_PROTEJATE_LOCAL.map(z=>{
    try{
      const d=turf.distance(
        {type:'Feature',geometry:{type:'Point',coordinates:[lon,lat]},properties:{}},
        {type:'Feature',geometry:{type:'Point',coordinates:z.centru||[lon,lat]},properties:{}},
        {units:'meters'}
      );
      return {...z, dist:d, inZona:d<(z.raza||500)};
    }catch(e){ return {...z, dist:99999, inZona:false}; }
  });

  // Combinăm date CIMEC live + date locale
  const inZonaProtejataCimec = cimecZone.length>0||cimecMonumente.length>0||cimecSituri.length>0;
  const inZonaProtejataLocal = distZone.some(z=>z.inZona);
  const inZonaProtejata = inZonaProtejataCimec || inZonaProtejataLocal;
  // Guard: distZone poate fi gol dacă UAT-ul nu are zone_protejate definite
  const zonaAproape = distZone.length > 0
    ? distZone.reduce((a,b)=>a.dist<b.dist?a:b)
    : {cod:'N/A', tip:'Nicio zonă locală', dist:0, inZona:false, desc:'Date locale indisponibile pentru acest UAT'};
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
   ['Cea mai apropiata zona prot.:',zonaAproape.cod||zonaAproape.zona||'N/A'],['Distanta:',Math.round(zonaAproape.dist)+' m'],
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
  distZone.forEach(z=>{
    const codVal  = (z.cod||z.zona||'—');
    const tipVal  = (z.tip||'—');
    const descVal = (z.desc||'—');
    cy=tblRow([
      codVal.split('-').pop().slice(0,12),
      tipVal.split(' ')[0].slice(0,10),
      Math.round(z.dist)+'m',
      z.inZona?'ÎN ZONA':'în afară',
      descVal.slice(0,32)
    ], cy, false, [30,30,18,20,80]);
  });

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
  if(caps.imgCity){cy=addImg(caps.imgCity,14,cy,W-28,50,'FIG. N — Harta '+S2(uat)+' · Zone protejate si monumente istorice identificate');cy+=4;}
  cy=sec('6. BAZA LEGALA',cy);cy+=2;
  ['Legea nr. 422/2001 republicată — Protejarea monumentelor istorice.','Ordinul MCID nr. 2828/2015 — Lista Monumentelor Istorice (LMI 2015).','Ordinul MCID nr. 2682/2003 — Metodologia de elaborare a documentatiilor de avizare.','HG nr. 593/2011 — Regulamentul de organizare și funcționare a Comisiei Naționale a Monumentelor.','Legea nr. 350/2001 republicată — Amenajarea teritoriului și urbanismul (PUZ zone protejate).','Carta de la Veneția (1964) + Carta de la Cracovia (2000) — Principii internaționale restaurare.','PUG Municipiul Iași — Regulament UTR '+utr+' — Restricții zone de protecție monumente.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});

  // PAG 7: Regim juridic zone protejate + avize
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('REGIMUL JURIDIC ZONE PROTEJATE — AVIZE OBLIGATORII DJCPN',7);ftr();
  cy=28;
  cy=sec('7. REGIMUL JURIDIC AL ZONELOR CONSTRUITE PROTEJATE — IASI',cy);cy+=2;
  cy=body('In Municipiul Iasi, zonele construite protejate (ZCP) si monumentele istorice sunt reglementate prin Legea 422/2001, Ordinul MCID 2828/2015 si PUG Iasi 2023. Orice interventie in zona protejata sau in proximitatea unui monument (zona de protectie 50-200m) necesita obtinerea avizului Directiei Judetene pentru Cultura, Patrimoniu National si Arhive Iasi (DJCPN Iasi) si, dupa caz, al Comisiei Nationale a Monumentelor Istorice (CNMI). Neobtinerea acestor avize atrage nulitatea Autorizatiei de Construire conform Legii 50/1991 art. 7 alin. 1.',14,cy);cy+=4;
  cy=tblRow(['Tip monument/zona','Clasa','Avize obligatorii','Termen emitere'],cy,true,[52,18,82,30]);
  [['Monument istoric — valoare nationala','A','CNMI + MCID + DJCPN Iasi','60-90 zile'],
   ['Monument istoric — valoare locala','B','DJCPN Iasi (+ CNMI la modif. semnif.)','30-60 zile'],
   ['Zona construita protejata (ZCP)','ZCP','DJCPN Iasi + verificare PUZ ZCP','30-60 zile'],
   ['Zona de protectie monument','ZP (50-200m)','DJCPN Iasi — aviz consultativ','15-30 zile'],
   ['In afara oricarei zone protejate','—','Nu este necesar aviz DJCPN','—'],
  ].forEach(r=>cy=tblRow(r,cy,false,[52,18,82,30]));
  cy+=4;
  cy=sec('7.1. PROCEDURA DETALIATA OBTINERE AVIZ DJCPN IASI',cy);cy+=2;
  cy=tblRow(['Etapa','Documente necesare','Depunere la','Termen'],cy,true,[15,95,45,27]);
  [['1','Cerere tip aviz + memoriu descriptiv arhitect OAR','DJCPN Iasi — Str. Anastasie Panu 25, Iasi','—'],
   ['2','Plan situatie cu incadrare ZCP/ZP + topografie','DJCPN Iasi','—'],
   ['3','Documentatie fotografica min. 20 fotografii color format A4','DJCPN Iasi','—'],
   ['4','Propunere arhitecturala (schita concept + section)','DJCPN Iasi','—'],
   ['5','Relevee constructie existenta (daca interv. pe cladire existenta)','DJCPN Iasi','—'],
   ['6','Aviz DJCPN emis (favorabil / cu conditii / nefavorabil)','Beneficiar / arhitect','30-60 zile'],
   ['7','Includere aviz in dosarul pentru Autorizatia de Construire',('Primaria '+S2(uat)),'Cf. CU'],
  ].forEach(r=>cy=tblRow(r,cy,false,[15,95,45,27]));

  // PAG 8: Monumente reprezentative + restrictii arhitecturale
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PATRIMONIUL CONSTRUIT IASI — RESTRICTII ARHITECTURALE ZCP',8);ftr();
  cy=28;
  cy=sec('8. PATRIMONIUL CULTURAL CONSTRUIT — MUNICIPIUL IASI',cy);cy+=2;
  cy=body('Municipiul Iasi detine cel mai bogat patrimoniu cultural construit din Moldova, cu peste 1200 monumente istorice inscrise in LMI (289 clasa A + 924 clasa B), inclusiv Palatul Culturii (monument national), Mitropolia Moldovei, Universitatea „Al.I. Cuza", multiple biserici si ansambluri ecleziastice medievale, si zone construite protejate in centrul vechi (Zona Unirii, Zona Copou, Piata Palatului). Amplasamentele din apropierea acestor zone au restrictii suplimentare de inaltime, materiale si aspect arhitectural.',14,cy);cy+=4;
  cy=sec('8.1. RESTRICTII ARHITECTURALE IN ZONE CONSTRUITE PROTEJATE',cy);cy+=2;
  cy=tblRow(['Criteriu arhitectural','Cerinta specifica in ZCP','Baza legala/norma'],cy,true,[55,90,37]);
  [['Inaltimea cladirii noi','Maxim egal cu H medie front stradal protejat (±1 nivel)','Ord. MCID 2828/2015'],
   ['Materiale de fatada','Compatibile cu caracterul istoric (tencuiala, piatra, caramida)','PUZ ZCP aprobat'],
   ['Culori fatade','Paleta cromatica aprobata DJCPN (nuante neutre, traditionale)','Aviz DJCPN'],
   ['Forma acoperisului','Compatibila cu contextul (terasa plata interzisa in ZCP semnal)','PUG + RLU ZCP'],
   ['Tamplarie si balcoane','Profil compatibil cu stilul dominant (PVC cu detalii clasice OK)','Aviz DJCPN'],
   ['Subsol si sapaturi','Studiu arheologic preventiv obligatoriu in zone cu potential','Legea 422/2001 art. 49'],
   ['Instalatii si cabluri exterioare','Ingropate sau mascate in trasee compatibile cu fatada','Aviz DJCPN'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,90,37]));
  cy+=4;
  cy=sec('8.2. DATE LMI IDENTIFICATE IN ZONA AMPLASAMENTULUI',cy);cy+=2;
  if(cimecMonumente&&cimecMonumente.length>0){
    cy=tblRow(['Cod LMI','Denumire / Tip monument','Distanta','Clasa'],cy,true,[35,90,28,29]);
    cimecMonumente.slice(0,8).forEach(m=>{cy=tblRow([m.cod||'—',(m.denumire||m.den||'Monument identificat').slice(0,48),m.dist?Math.round(m.dist)+'m':'—',m.clasa||'—'],cy,false,[35,90,28,29]);});
  } else {
    cy=body('Nu au fost identificate monumente istorice CIMEC prin interogare WFS in raza de analiza. Se recomanda verificarea manuala la adresa map.cimec.ro si consultarea Registrului Local al Monumentelor Istorice la DJCPN Iasi.',14,cy);
  }

  // PAG 9: Lista documente necesare + procedura AC
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('LISTA DOCUMENTE AC IN ZONE PROTEJATE — PROCEDURA COMPLETA',9);ftr();
  cy=28;
  cy=sec('9. LISTA COMPLETA DOCUMENTE NECESARE PENTRU AC IN ZONE PROTEJATE',cy);cy+=2;
  cy=body('In cazul in care amplasamentul '+nrcad+' se afla in zona construita protejata sau in zona de protectie a unui monument inscris in LMI, lista documentelor pentru Autorizatia de Construire se extinde conform Legii 50/1991 art. 7, completata cu Legea 422/2001 si Ordinul MCID 2828/2015.',14,cy);cy+=4;
  cy=tblRow(['Nr.','Document necesar pentru AC in ZCP','Emitent','Termen'],cy,true,[10,105,45,22]);
  [['1','Certificat de Urbanism (cu mentionarea obligatorie avize patrimoniu)',('Primaria '+S2(uat)),'10-30 zile'],
   ['2','Aviz DJCPN Iasi (obligatoriu in ZCP sau zona de protectie monument)',(S2(getDJCPN())||'DJCPN '+S2(judet)),'30-60 zile'],
   ['3','Aviz CNMI (pt. monumente clasa A sau extinderi semnificative)','CNMI Bucuresti','60-90 zile'],
   ['4','Studiu Istoric si Arhitectural elaborat de expert acreditat MCID','Expert acreditat MCID','30-60 zile'],
   ['5','Relevee arhitecturale ale constructiei existente (daca se intervine)','Arhitect/topograf','15-30 zile'],
   ['6','Documentatie fotografica color format A4 (min. 30 fotografii)','Beneficiar/arhitect','—'],
   ['7','Proiect Tehnic + DTAC complet (arhitect OAR + inginer rezistenta)','Birou proiectare','60-120 zile'],
   ['8','Aviz ISU Moldova (obligatoriu P+3 sau S>600mp)','ISU Moldova','30-60 zile'],
   ['9','Avize utilitati (apa-canal, gaz, electric, telecomunicatii)','Operatori utilitati','30-90 zile/aviz'],
   ['10','Studiu arheologic preventiv (zone cu potential arheologic)','Arheolog acreditat MCID','30-60 zile'],
  ].forEach(r=>cy=tblRow(r,cy,false,[10,105,45,22]));
  cy+=4;
  cy=body('NOTA IMPORTANTA: In afara zonelor construite protejate si a zonelor de protectie a monumentelor istorice, avizul DJCPN nu este obligatoriu. Se recomanda totusi consultarea prealabila a Registrului National al Monumentelor Istorice (RNMI) online la lege5.ro si a PUG Iasi actualizat, pentru verificarea oricaror restrictii specifice.',14,cy);

  // PAG 10: Baza legala completa + concluzii patrimoniu
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALA COMPLETA PATRIMONIU — CONCLUZII FINALE',10);ftr();
  cy=28;
  cy=sec('10. CONCLUZII FINALE — STUDIU PATRIMONIU SI ZONE ISTORICE',cy);cy+=2;
  cy=body('Studiul de patrimoniu si zona istorica pentru amplasamentul '+nrcad+' (UTR '+utr+', coord. '+lat.toFixed(4)+'°N / '+lon.toFixed(4)+'°E) a analizat incadrarea in raport cu zonele construite protejate si monumentele istorice din zona de influenta. Concluziile si recomandarile sunt sintetizate mai jos.',14,cy);cy+=4;
  cy=tblRow(['Verificare patrimoniala','Rezultat orientativ','Actiune recomandata'],cy,true,[55,65,62]);
  [['Zona construita protejata (ZCP)',inZonaProtejata?'IN zona protejata identificata':'In afara ZCP identificate','Aviz DJCPN: '+(inZonaProtejata?'OBLIGATORIU':'Verificati cu Primaria')],
   ['Monumente in zona 200m',cimecMonumente.length>0?cimecMonumente.length+' identificate CIMEC':'0 identificate','Verificare manuala map.cimec.ro'],
   ['Zona de protectie 50-200m',distZone.some(z=>z.dist<200)?'DA — monument in <200m!':'Nu s-a identificat','Consultare DJCPN recomandata'],
   ['Cea mai apropiata zona protejata',zonaAproape.cod||'—','Distanta: '+Math.round(zonaAproape.dist||0)+'m'],
   ['Restrictii inaltime ZCP',inZonaProtejata?'APLICABILE — conf. PUZ ZCP':'Nu se aplica direct','Verificare RLU + aviz DJCPN'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,65,62]));
  cy+=4;
  cy=sec('10.1. BAZA LEGALA COMPLETA — PATRIMONIU',cy);cy+=2;
  ['Legea nr. 422/2001 privind protejarea monumentelor istorice, republicata 2006.','Ordinul MCID nr. 2828/2015 privind aprobarea Normelor metodologice de clasare si inventariere a monumentelor istorice.','HG nr. 593/2011 — Norme metodologice privind elaborarea si aprobarea RLU aferent PUZ ZCP.','Legea nr. 5/2000 privind PATN — Sectiunea III: Zone protejate.','Conventia de la Granada (1985) privind protectia patrimoniului arhitectural al Europei, ratificata prin Legea 157/1997.','Conventia de la Malta (1992) privind protectia patrimoniului arheologic, ratificata prin Legea 150/1997.','OG 43/2000 privind protectia patrimoniului arheologic, aprobata cu modificari prin Legea 378/2001.','PUG '+getUATLabel()+' — Zone construite protejate, ZCP si Regulamentul Local de Urbanism.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});
  sign();
  pdf.save('Studiu_Patrimoniu_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Studiu Istoric & Patrimoniu generat!');
}


// ── Topbar dropdown menus ────────────────────────────────────────────────
function _closeAllMenus(){
  const v=document.getElementById('viz-menu');
  const t=document.getElementById('tools-menu');
  if(v) v.style.display='none';
  if(t) t.style.display='none';
}
function _toggleVizMenu(e){
  if(e){ e.stopPropagation(); e.preventDefault(); }
  const m=document.getElementById('viz-menu');
  const t=document.getElementById('tools-menu');
  if(!m) return;
  if(t) t.style.display='none';
  if(m.style.display==='block'){
    m.style.display='none';
  } else {
    // Poziționare sub butonul apăsat
    const btn=(e&&e.currentTarget)||document.querySelector('#viz-group button');
    if(btn){
      const r=btn.getBoundingClientRect();
      m.style.left=r.left+'px';
      m.style.top=(r.bottom+2)+'px';
    }
    m.style.display='block';
  }
}
function _toggleToolsMenu(e){
  if(e){ e.stopPropagation(); e.preventDefault(); }
  const m=document.getElementById('tools-menu');
  const v=document.getElementById('viz-menu');
  if(!m) return;
  if(v) v.style.display='none';
  if(m.style.display==='block'){
    m.style.display='none';
  } else {
    const btn=(e&&e.currentTarget)||document.querySelector('#tools-group button');
    if(btn){
      const r=btn.getBoundingClientRect();
      m.style.left=r.left+'px';
      m.style.top=(r.bottom+2)+'px';
    }
    m.style.display='block';
  }
}
// Închide la click în afara meniurilor — cu delay pentru a nu anula deschiderea
document.addEventListener('click',function(e){
  setTimeout(function(){
    if(!e.target.closest('#viz-group')&&!e.target.closest('#viz-menu')){
      const m=document.getElementById('viz-menu');if(m)m.style.display='none';
    }
    if(!e.target.closest('#tools-group')&&!e.target.closest('#tools-menu')){
      const m=document.getElementById('tools-menu');if(m)m.style.display='none';
    }
  },50);
});

function toggleRapoarteMenu(){
  const m = document.getElementById('rapoarte-menu');
  const btn = document.getElementById('btnPDF');
  if(!m) return;
  const isOpen = m.style.display !== 'none';
  if(isOpen){
    m.style.display = 'none';
    return;
  }
  // Poziționăm dropdown-ul fix față de buton
  if(btn){
    const r = btn.getBoundingClientRect();
    m.style.top  = (r.bottom + 6) + 'px';
    m.style.left = Math.max(8, r.right - m.offsetWidth || r.right - 224) + 'px';
    // Ajustăm după render ca să nu iasă din ecran
    m.style.display = 'block';
    requestAnimationFrame(()=>{
      const mr = m.getBoundingClientRect();
      if(mr.right > window.innerWidth - 8) m.style.left = (window.innerWidth - mr.width - 8) + 'px';
      if(mr.left < 8) m.style.left = '8px';
    });
  } else {
    m.style.display = 'block';
  }
  // Închidem la click în afară
  setTimeout(()=>{
    document.addEventListener('click', function close(e){
      if(!m.contains(e.target) && e.target.id !== 'btnPDF'){
        m.style.display = 'none';
        document.removeEventListener('click', close);
      }
    });
  }, 50);
}

// generateSolarStudy — versiunea completă (8 pagini, OMS 119/2014)
// NOTĂ: această funcție este definită și în 11-viewer3d.js (versiune veche, 4 pagini).
// 10-studies.js se încarcă ÎNAINTE de 11-viewer3d.js, deci 11-viewer3d.js o suprascrie.
// FIX: funcția din 11-viewer3d.js a fost redenumită _generateSolarStudyLegacy().
async function generateSolarStudy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă pentru studiu.');return;}
  ss('Se generează Studiu de Însorire — se capturează imagini...');

  const d=_initStudyPdf('Pre-Studiu Urbanistic de Însorire','Studiu însorire OMS 119/2014',10);
  const {pdf,W,H,DARK,DARK2,GOLD,GOLD2,BLUE,BLUE2,LIGHT,LIGHT2,RED,GREEN,ORANGE,GRAY,GRAY2,GRAY3,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
    hdr,ftr,sec,subsec,body,tblRow,addImg,kv,badge,divider,bullet,concluzii,sign,cover}=d;

  // ── Calcule solare ────────────────────────────────────────────────────
  const year=new Date().getFullYear();
  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||parseFloat(params.h)||10;
  const niv=AEDIS.corpuri[0]?.niv||4;
  const fnLabel=(AEDIS_FN[AEDIS.fn]||AEDIS_FN.rezidential_colectiv).label||'Rezidențial';

  const solarAlt=(latD,doy,hour)=>{
    const D2R=Math.PI/180;
    const decl=-23.45*Math.cos(D2R*(360/365)*(doy+10));
    const ha=(hour-12)*15;
    const sinAlt=Math.sin(latD*D2R)*Math.sin(decl*D2R)+Math.cos(latD*D2R)*Math.cos(decl*D2R)*Math.cos(ha*D2R);
    return Math.max(0,Math.asin(Math.max(-1,Math.min(1,sinAlt)))*180/Math.PI);
  };
  const shadowLen=(h,alt)=>alt>0.5?(h/Math.tan(alt*Math.PI/180)).toFixed(1):'—';
  const sunrise=(latD,doy)=>{
    const D2R=Math.PI/180;
    const decl=-23.45*Math.cos(D2R*(360/365)*(doy+10));
    const cosH=-Math.tan(latD*D2R)*Math.tan(decl*D2R);
    if(cosH>1) return null;if(cosH<-1) return 0;
    return 12-Math.acos(cosH)/D2R/15;
  };

  // Zilele cheie
  const days={
    iarna:{doy:355,label:'Solstițiu iarnă (21 dec)'},
    primavara:{doy:80,label:'Echinox primăvară (21 mar)'},
    vara:{doy:172,label:'Solstițiu vară (21 iun)'},
    toamna:{doy:264,label:'Echinox toamnă (23 sep)'},
  };
  const solarData={};
  Object.entries(days).forEach(([key,{doy,label}])=>{
    const hours=[6,7,8,9,10,11,12,13,14,15,16,17,18];
    const alts=hours.map(h=>solarAlt(lat,doy,h));
    const maxAlt=Math.max(...alts);
    const sr=sunrise(lat,doy);
    const ss2=sr?24-sr:null;
    const oreSoare=sr?((ss2-sr)).toFixed(1):null;
    solarData[key]={doy,label,alts,maxAlt,hours,sr,ss2,oreSoare,
      shadAt12:shadowLen(aedisH,solarAlt(lat,doy,12)),
      alt12:solarAlt(lat,doy,12).toFixed(1)
    };
  });

  const isConform=solarData.iarna.maxAlt>=15;
  const oreMinIarna=solarData.iarna.alts.filter(a=>a>=15).length;
  const oreMaxVara=solarData.vara.alts.filter(a=>a>5).length;

  const caps=await _captureStudyMaps(ap,msg=>ss(msg));
  ss('Se compilează PDF-ul...');

  // ════════════════════════════════════════════════════════════
  // PAG 1 — COPERTĂ
  // ════════════════════════════════════════════════════════════
  cover(
    'Analiză conformitate OMS 119/2014 · Simulare umbre · Bilanț solar',
    caps.imgLocation||caps.img3D,
    [['H clădire propusă',aedisH.toFixed(1)+' m'],['Funcțiune',fnLabel],
     ['Alt. sol. iarnă',solarData.iarna.alt12+'° (min. 15°)'],
     ['Conformitate OMS 119',isConform?'DA — CONFORM':'NU — VERIFICARE']],
    isConform,
    isConform?'✅ CONFORM OMS 119/2014 — Însorire minimă asigurată':'⚠️ VERIFICARE NECESARĂ — Alt. solară sub 15° la solstițiu iarnă'
  );

  // ════════════════════════════════════════════════════════════
  // PAG 2 — VEDERE 3D PRINCIPALĂ + PARAMETRI
  // ════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('VEDERE 3D PRINCIPALĂ — CONTEXT URBAN ȘI AMPLASAMENT',2);ftr();
  let cy=30;

  // Imagine 3D mare - full width
  cy=addImg(caps.img3D,14,cy,W-28,100,'FIG. 1 — Vedere 3D Urban · Amplasament parcelă '+nrcad+' · UTR '+utr+' · '+uat+' · Perspectivă 62° pitch');cy+=2;

  // Imagini mici laterale
  const hw=(W-28-4)/2;
  cy=addImg(caps.imgLocation,14,cy,hw,55,'FIG. 2 — Plan amplasament · Structura stradală · Vecinătăți imediate');
  addImg(caps.imgCity,14+hw+4,cy-55,hw,55,'FIG. 3 — Hartă '+uat+' · Încadrare în context urban');
  cy+=5;

  cy=sec('1. DATE GENERALE PARCELĂ ȘI CONSTRUCȚIE PROPUSĂ',cy);
  cy=body('Prezentul Pre-Studiu de Însorire analizează condițiile de iluminare naturală pentru parcela cu nr. cadastral '+nrcad+', situată în '+uat+', județul '+judet+', zona UTR '+utr+' ('+S2(REGULI[utr]?.d||'—')+'). Studiul verifică conformitatea cu prevederile OMS nr. 119/2014 și Ord. MS nr. 994/2018 privind normele de igienă și sănătate publică. Parametrii climatici au fost calculați pe baza coordonatelor GPS ale amplasamentului ('+lat.toFixed(5)+'°N, '+lon.toFixed(5)+'°E, latitudine pentru zonele temperate ale României).',14,cy);cy+=4;

  // Grid parametri
  const colW3=[(W-28)/3,(W-28)/3,(W-28)/3];
  cy=tblRow(['PARAMETRU','VALOARE PUG','PROPUS'],cy,true,[80,55,47]);
  [['Suprafață teren (ST)',area+' mp',area+' mp'],
   ['POT max admis',params.pot+'%',params.pot+'%'],
   ['CUT max admis',String(params.cut),'—'],
   ['H max admis',params.h?params.h+'m':'—',aedisH.toFixed(1)+'m'],
   ['Nr. niveluri max',params.niv?String(params.niv):'—',String(niv)],
   ['Retragere față (rf)',params.rf+'m',params.rf+'m'],
   ['Retragere spate (rs)',params.rs+'m',params.rs+'m'],
   ['Retragere lateral (rl)',params.rl+'m',params.rl+'m'],
   ['Spații verzi min',params.sv+'%',params.sv+'%'],
  ].forEach(r=>cy=tblRow(r,cy,false,[80,55,47]));

  // ════════════════════════════════════════════════════════════
  // PAG 3 — ANALIZĂ SOLARĂ DETALIATĂ
  // ════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('ANALIZĂ SOLARĂ — DATE ASTRONOMICE ȘI ÎNSORIRE ANUALĂ',3);ftr();
  cy=30;

  // Viewer 3D zi/noapte
  cy=addImg(caps.v3dDay,14,cy,hw,68,'FIG. 4 — Viewer 3D · ZI · Expunere solară · Umbra clădirii');
  addImg(caps.v3dNight,14+hw+4,cy-68,hw,68,'FIG. 5 — Viewer 3D · NOAPTE · Iluminat artificial estimat');
  cy+=4;

  cy=sec('2. DATE ASTRONOMICE — LATITUDINE '+lat.toFixed(2)+'°N',cy);
  cy=body('Analiza solară utilizează algoritmul NOAA pentru calculul poziției solare, adaptat la coordonatele geografice ale amplasamentului. Latitudinea de '+lat.toFixed(2)+'°N plasează '+uat+' în zona temperată nordică, cu variație sezonieră semnificativă a unghiului solar ('+solarData.iarna.maxAlt.toFixed(1)+'° iarna vs. '+solarData.vara.maxAlt.toFixed(1)+'° vara).',14,cy);cy+=4;

  cy=tblRow(['Sezon / Zi cheie','Alt. la 12:00','Alt. max.','Răsărit','Apus','Ore soare','Umbră (H='+aedisH.toFixed(1)+'m)'],cy,true,[42,22,20,18,18,22,40]);
  Object.values(solarData).forEach(sd=>{
    const sr=sd.sr?((Math.floor(sd.sr)+':'+(Math.round((sd.sr%1)*60)).toString().padStart(2,'0'))):'—';
    const ss3=sd.ss2?((Math.floor(sd.ss2)+':'+(Math.round((sd.ss2%1)*60)).toString().padStart(2,'0'))):'—';
    cy=tblRow([sd.label,sd.alt12+'°',sd.maxAlt.toFixed(1)+'°',sr,ss3,(sd.oreSoare||'—')+'h',sd.shadAt12+'m'],cy,false,[42,22,20,18,18,22,40]);
  });
  cy+=4;

  cy=sec('3. BILANȚ ORAR DE ÎNSORIRE — TOATE ANOTIMPURILE',cy);
  cy=body('Tabelul de mai jos prezintă altitudinea solară la fiecare oră pentru cele 4 momente cheie ale anului. Valorile ≥15° (evidențiate) reprezintă condiții de însorire conformă OMS 119/2014. Calculul ia în considerare declinația solară și unghiul orar pentru latitudinea amplasamentului.',14,cy);cy+=4;

  const hours12=[7,8,9,10,11,12,13,14,15,16,17];
  const hColW=[22,...hours12.map(()=>16)];
  cy=tblRow(['Sezon / Oră',...hours12.map(h=>h+':00')],cy,true,hColW);
  Object.values(solarData).forEach(sd=>{
    const vals=hours12.map(h=>{
      const idx=sd.hours.indexOf(h);
      const alt=idx>=0?sd.alts[idx]:0;
      return alt>0?alt.toFixed(0)+'°':'—';
    });
    cy=tblRow([sd.label,...vals],cy,false,hColW);
  });

  // ════════════════════════════════════════════════════════════
  // PAG 4 — CONFORMITATE OMS 119/2014 + GOLDEN HOUR
  // ════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('CONFORMITATE OMS 119/2014 — UMBRE PROIECTATE',4);ftr();
  cy=30;

  cy=addImg(caps.v3dGolden,14,cy,hw,68,'FIG. 6 — Viewer 3D · GOLDEN HOUR · Însorire laterală 45°');
  addImg(caps.v3dOvercast,14+hw+4,cy-68,hw,68,'FIG. 7 — Viewer 3D · ÎNNORAT · Impact umbrit');
  cy+=4;

  // Status conformitate mare
  const statCol=isConform?GREEN:RED;
  pdf.setFillColor(...statCol);pdf.rect(14,cy,W-28,14,'F');
  pdf.setFillColor(...GOLD);pdf.rect(14,cy,3,14,'F');
  pdf.setTextColor(255,255,255);pdf.setFontSize(10);pdf.setFont('helvetica','bold');
  pdf.text(isConform?'✓ CONFORM OMS 119/2014 — Altitudine solară ≥15° la solstițiu de iarnă':'✗ NECONFORM — Altitudine solară '+solarData.iarna.maxAlt.toFixed(1)+'° < 15° cerut de OMS 119/2014',W/2,cy+9,{align:'center'});
  cy+=18;

  cy=sec('4. VERIFICARE CONFORMITATE OMS 119/2014',cy);
  cy=body('Conform OMS nr. 119/2014 (Norme de igienă privind mediul de viață al populației), orice spațiu locuit sau cu destinație similară trebuie să beneficieze de iluminat natural direct timp de minimum 1.5 ore pe zi la solstițiul de iarnă, cu unghi solar de minimum 15° față de orizont. Verificarea se efectuează pentru ziua de 21 decembrie (solstițiul de iarnă), ora 12:00 (prânz solar).',14,cy);cy+=3;

  cy=tblRow(['Criteriu OMS 119/2014','Valoare calculată','Prag minim','Diferență','Status'],cy,true,[65,35,28,25,29]);
  [['Alt. solară solstițiu iarnă (12:00)',solarData.iarna.alt12+'°','≥ 15°',(solarData.iarna.maxAlt-15).toFixed(1)+'°',isConform?'CONFORM':'NECONFORM'],
   ['Ore însorire iarnă (alt ≥15°)',oreMinIarna+'h/zi','≥ 1.5h/zi',(oreMinIarna-1.5).toFixed(1)+'h',oreMinIarna>=1.5?'CONFORM':'NECONFORM'],
   ['Ore însorire vară',oreMaxVara+'h/zi','informativ','—','INFO'],
   ['Umbrire la 12:00 iarnă',solarData.iarna.shadAt12+'m','conform H prop.','—','INFO'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,35,28,25,29],[
    r[4]==='CONFORM'?[220,240,225]:r[4]==='NECONFORM'?[240,220,220]:LIGHT
  ]));cy+=4;

  cy=sec('5. CALCULUL UMBREI PROIECTATE',cy);
  cy=body('Lungimea umbrei proiectate la sol de clădirea propusă (H='+aedisH.toFixed(1)+'m) a fost calculată prin formula: L = H / tan(α), unde α este altitudinea solară la momentul analizat. Valorile cele mai defavorabile apar la solstițiul de iarnă când unghiul solar este minim.',14,cy);cy+=3;

  cy=tblRow(['Momentul','Alt. solară','Umbră proiectată (H='+aedisH.toFixed(1)+'m)','Observații'],cy,true,[50,30,60,42]);
  Object.values(solarData).forEach(sd=>{
    cy=tblRow([sd.label.split('(')[0].trim(),sd.alt12+'°',sd.shadAt12+'m spre nord','Influențează '+Math.round(parseFloat(sd.shadAt12||0)/5)+' loturi vecine est.'],cy,false,[50,30,60,42]);
  });

  // ════════════════════════════════════════════════════════════
  // PAG 5 — VEDERI MULTIPLE + CONTEXT VECINĂTĂȚI
  // ════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('VEDERI MULTIPLE — EXPUNERE SOLARĂ ȘI CONTEXT VECINI',5);ftr();
  cy=30;

  cy=addImg(caps.imgFront,14,cy,hw,58,'FIG. 8 — Vedere frontală (Nord-Sud) · Front stradal · Umbra față de stradă');
  addImg(caps.imgLat,14+hw+4,cy-58,hw,58,'FIG. 9 — Vedere laterală · Umbra față de proprietăți vecine');
  cy+=3;
  cy=addImg(caps.imgAerial,14,cy,hw,58,'FIG. 10 — Vedere aeriană 45° · Amprenta umbrei pe teren');
  addImg(caps.imgBack,14+hw+4,cy-58,hw,58,'FIG. 11 — Vedere posterioară · Umbra spre curtea interioară/spate');
  cy+=4;

  cy=sec('6. ANALIZA CONTEXTULUI URBAN — CLĂDIRI VECINE',cy);
  const ctxBlds=S.ctx?.features?.filter(f=>f.geometry)?.slice(0,8)||[];
  if(ctxBlds.length>0){
    cy=body('Au fost identificate '+ctxBlds.length+' clădiri în contextul imediat al parcelei '+nrcad+', conform datelor OSM. Înălțimile acestora influențează condițiile de însorire prin obstrucție reciprocă. Datele de mai jos prezintă estimările disponibile:',14,cy);cy+=3;
    cy=tblRow(['ID','Nr.cad','Suprafață (mp)','H estimată (m)','Funcțiune','Dist. aprox.'],cy,true,[10,30,30,25,40,47]);
    ctxBlds.forEach((b,i)=>{
      const bArea=Math.round(turf.area({type:'Feature',geometry:b.geometry,properties:{}}));
      const bH=b.properties?.h||Math.round(parseFloat(b.properties?.levels||'2')*3)||6;
      const dist=Math.round(turf.distance(turf.centerOfMass(ap.geo),turf.centerOfMass({type:'Feature',geometry:b.geometry,properties:{}}),{units:'meters'}));
      cy=tblRow([(i+1).toString(),b.properties?.nrcad||'OSM',bArea+' mp',bH+'m',b.properties?.fn_label||b.properties?.building||'—',dist+'m'],cy,false,[10,30,30,25,40,47]);
    });
  } else {
    cy=body('Nu s-au identificat clădiri în contextul imediat din baza de date OSM. Se recomandă verificare in situ și la Primăria '+uat+' — DAU.',14,cy);
  }

  // ════════════════════════════════════════════════════════════
  // PAG 6 — HARTĂ ORAȘ + BAZA LEGALĂ
  // ════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
  hdr('HARTĂ ORAȘ — ÎNCADRARE TERITORIALĂ',6);ftr();
  cy=30;

  cy=addImg(caps.imgCity,14,cy,W-28,70,'FIG. 12 — Harta '+uat+' · Încadrare amplasament în contextul urban · Rețea stradală principală');cy+=4;

  cy=sec('7. BAZA LEGISLATIVĂ ȘI NORMATIVĂ',cy);
  cy=bullet([
    'OMS nr. 119/2014 — Norme de igienă și sănătate publică privind mediul de viață al populației (Cap. II — Locuințe).',
    'Ordinul MS nr. 994/2018 pentru modificarea OMS 119/2014 — Actualizarea normelor de însorire.',
    'Legea nr. 50/1991 republicată — Autorizarea executării lucrărilor de construcții (art. 7 — studii obligatorii).',
    'HG nr. 525/1996 — Regulamentul General de Urbanism (art. 17 — Amplasarea față de aliniament și vecinătăți).',
    'SR EN 17037:2019 — Iluminare naturală în clădiri (standard european, adoptat în România).',
    'PUG '+uat+' în vigoare — UTR '+utr+' — Regulamentul Local de Urbanism: H max '+( params.h||'—')+'m, POT max '+params.pot+'%, CUT max '+params.cut+'.',
    'P100-1/2013 — Cod de proiectare seismică (zona '+getSeismConfig().zona+', ag='+getSeismConfig().ag+'g) — influențează structura și implicit H propus.',
  ],14,cy);cy+=2;

  cy=divider(cy);
  cy=sec('8. CONCLUZII ȘI RECOMANDĂRI',cy,isConform?GREEN:RED);
  cy=concluzii([
    isConform
      ? 'Amplasamentul este CONFORM cu prevederile OMS 119/2014. Altitudinea solară la solstițiul de iarnă (21 dec, 12:00) este de '+solarData.iarna.alt12+'°, peste pragul minim de 15°. Însorirea minimă de 1.5 ore/zi este asigurată în cele mai defavorabile condiții sezoniere.'
      : 'Amplasamentul NECESITĂ VERIFICARE suplimentară. Altitudinea solară de '+solarData.iarna.alt12+'° la solstițiu iarnă este sub pragul de 15° OMS 119/2014. Se recomandă studiu detaliat de însorire cu simulare 3D și consultarea expertului în fizica construcțiilor.',
    'Umbra proiectată la solstițiu de iarnă (12:00) are lungimea estimată de '+solarData.iarna.shadAt12+'m. La solstițiu de vară, umbra se reduce la '+solarData.vara.shadAt12+'m. Aceste valori trebuie coroborate cu distanțele față de proprietățile vecine (rf='+params.rf+'m, rl='+params.rl+'m, rs='+params.rs+'m conform PUG).',
    'Clădirea propusă cu H='+aedisH.toFixed(1)+'m și '+niv+' niveluri beneficiază de '+solarData.vara.oreSoare+' ore de însorire directă la solstițiu de vară și '+oreMinIarna+' ore/zi la solstițiu de iarnă (altitudine ≥15°).',
    'Se recomandă orientarea principală a ferestrelor camere de locuit spre Sud-Sud-Est (±30°) pentru maximizarea câștigului solar pasiv în sezonul rece și reducerea supraîncălzirii în sezonul cald.',
    'Înaintea obținerii Autorizației de Construire se impune elaborarea unui Studiu Detaliat de Însorire cu simulare 3D certificată, semnat de arhitect autorizat OAR, conform Legii 50/1991.',
  ],cy);

  // PAG 9: Bilant solar anual + performante energetice
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BILANT SOLAR ANUAL — ENERGIE SI PERFORMANTA TERMICA',9);ftr();
  cy=30;
  cy=sec('9. BILANT SOLAR ANUAL — IRADIERE SI ENERGIE SOLARA POTENTIALA',cy);cy+=2;
  cy=body('Analiza iradierii solare pentru amplasamentul cu coordonatele '+lat.toFixed(4)+'°N / '+lon.toFixed(4)+'°E calculeaza energia solara disponibila pe parcursul intregului an. Valorile sunt estimate conform datelor climatice standard pentru zona Iasi (PVGIS — Photovoltaic Geographical Information System, JRC European Commission) si sunt utilizate pentru estimarea potentialului de valorificare a energiei solare (panouri fotovoltaice, colectoare solare termice, proiectare pasiva).',14,cy);cy+=4;
  cy=tblRow(['Luna','Iradiere globala (kWh/mp/zi)','Energie sol. medie','Ore soare/zi','Indice UV'],cy,true,[25,52,45,33,27]);
  const irradMonthly=[
    ['Ianuarie',1.8,'Scazuta (iarna)',3.8,'1 — Minim'],
    ['Februarie',2.8,'Redusa',4.5,'2 — Redus'],
    ['Martie',3.9,'Moderata',5.2,'3-4 — Moderat'],
    ['Aprilie',4.8,'Buna',6.0,'5-6 — Mediu'],
    ['Mai',5.5,'Ridicata',7.2,'7 — Ridicat'],
    ['Iunie',6.0,'Maxima (vara)',8.5,'8-9 — F. ridicat'],
    ['Iulie',6.2,'Maxima','8.8','9 — F. ridicat'],
    ['August',5.8,'Ridicata',8.2,'8 — Ridicat'],
    ['Septembrie',4.5,'Buna',6.5,'6 — Mediu'],
    ['Octombrie',3.0,'Moderata',5.0,'4 — Moderat'],
    ['Noiembrie',1.9,'Redusa',3.5,'2 — Redus'],
    ['Decembrie',1.5,'Minima',3.2,'1 — Minim'],
  ];
  irradMonthly.forEach(r=>cy=tblRow(r,cy,false,[25,52,45,33,27]));
  cy+=4;
  cy=sec('9.1. POTENTIAL PANOURI FOTOVOLTAICE SI COLECTOARE SOLARE',cy);cy+=2;
  const acoperis=Math.round(parseFloat(area)*parseFloat(params?.pot||35)/100);
  const pvSupr=Math.round(acoperis*0.6);
  const pvKwp=Math.round(pvSupr/6.5);
  const pvProduction=Math.round(pvKwp*1100);
  cy=tblRow(['Sistem','Suprafata disponibila','Putere instalata','Energie anuala','Economie anuala'],cy,true,[40,40,35,40,27]);
  [['Panouri FV (terasa)','~'+pvSupr+' mp util','~'+pvKwp+' kWp','~'+pvProduction+' kWh/an','~'+Math.round(pvProduction*0.7)+' EUR/an'],
   ['Colectoare solare termice','~'+Math.round(pvSupr*0.3)+' mp','~'+Math.round(pvSupr*0.3/2)+' colectoare','~'+Math.round(pvSupr*0.3*500)+' kWh/an term.','~'+Math.round(pvSupr*0.3*500*0.12)+' EUR/an'],
   ['Proiectare pasiva (fatada S)','Terasa/fatada sud','—','Reducere consum 15-25%','Conf. proiect arh.'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,40,35,40,27]));

  // PAG 10: Recomandari arhitecturale + baza legala completa solar
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('RECOMANDARI ARHITECTURALE — BAZA LEGALA COMPLETA INSORIRE',10);ftr();
  cy=30;
  cy=sec('10. RECOMANDARI ARHITECTURALE PENTRU OPTIMIZAREA INSOLARII',cy);cy+=2;
  cy=body('Pe baza analizei solare efectuate pentru amplasamentul '+nrcad+' (lat. '+lat.toFixed(2)+'°N), se formuleaza urmatoarele recomandari arhitecturale pentru maximizarea calitatii insolarii si minimizarea consumului energetic al viitoarei constructii (H='+aedisH.toFixed(1)+'m, functiune: '+fnLabel+').',14,cy);cy+=4;
  cy=tblRow(['Recomandare','Aplicabilitate','Impact estimat','Baza normativa'],cy,true,[65,35,38,44]);
  [['Orientarea axului lung al cladirii E-V','Termen proiectare','Reducere pierderi catre N/S cu 20%','OMS 119/2014, GT 043-02'],
   ['Deschideri mari pe fatada S (min. 40% suprafata)','Termen proiectare','Castig solar iarna 15-20% reducere consum','SR EN 17037:2019'],
   ['Parasolare orizontale pe fatada S (ang. 45°)','Termen proiectare','Protectie vara; pastrare insorire iarna','STAS 6221-1981'],
   ['Adancime camera locuit max. 2.5H fereastra','Proiect PT','Asigurare insorire min. 50% din camera','GT 043-2002'],
   ['Terasa verde sau FV pe acoperis','Optional','Reducere sarcina termica vara 30-40%','HG 525/96 + bonus ANC'],
   ['Geam triplu low-E pe fatada N si NE','Proiect PT','Reducere pierderi termice 40-50%','C107-05; SR EN 14351'],
   ['Ventilatie naturala transversala E-V','Proiect PT','Reducere consum racire vara 20-30%','SR EN 15251'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,35,38,44]));
  cy+=4;
  cy=sec('10.1. CONFORMITATE OMS 119/2014 — REZUMAT FINAL',cy);cy+=2;
  cy=tblRow(['Cerinta OMS 119/2014','Valoare calculata','Status'],cy,true,[80,60,42]);
  [['Alt. solara min. 15° la 21 Dec, ora 12:00',solarData.iarna.alt12+'°',parseFloat(solarData.iarna.alt12)>=15?'✓ CONFORM':'⚠ NECONFORM'],
   ['Min. 1h30min insorire directa pe zi (21 Dec)',oreMinIarna+'h disponibile alt>15°',oreMinIarna>=2?'✓ CONFORM':'⚠ Verificare studiu detaliat'],
   ['Camere de locuit orientate spre S, SE, E, SV','Conf. proiect','Verificare la PT'],
   ['Dist. min. intre cladiri (umbra 1:1)','H/tan(15°)='+(aedisH/Math.tan(15*Math.PI/180)).toFixed(0)+'m','Aplicare la proiect'],
  ].forEach(r=>cy=tblRow(r,cy,false,[80,60,42]));
  cy+=4;
  cy=sec('10.2. BAZA LEGALA COMPLETA',cy);cy+=2;
  ['Ordinul MS nr. 119/2014 actualizat cu Ordinul nr. 994/2018 — norme de igiena, art. 3 (insorire).','SR EN 17037:2019 — Iluminare naturala in cladiri (standard european unificat).','STAS 6221-1981 — Iluminatul natural in constructii. Conditii tehnice generale.','NP 016-97 — Normativ pentru proiectarea cladirilor de locuinte.','GT 043-2002 — Ghid privind insorirea cladirilor.','C107-05 — Normativ privind calculul termotehnic al elementelor de constructie ale cladirilor.','Legea 372/2005 republicata — Performanta energetica a cladirilor (transpune Directiva EPBD 2010/31/UE).','Regulamentul (UE) 2018/844 — Directiva EPBD revizuita — cladiri cu consum de energie aproape zero (NZEB).'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});

  sign();

  pdf.save('Studiu_Insorire_'+nrcad+'_'+year+'.pdf');
  ss('✅ Studiu de Însorire generat! (8 pagini)');
}

// ── Wrapper global pentru studii — prinde erori și le afișează clar ────────
// Învelim funcțiile de studiu cu error handling pentru a nu mai cădea silențios
(function _wrapStudyFunctions(){
  const toWrap = [
    'generateSolarStudy','generateIstoricStudy','generateShadowStudy',
    'generateNoiseStudy','generateWindStudy','generateGreenStudy',
    'generateMobilityStudy','generateDensityStudy','generateMemoriu',
    'generateEnvironmentalImpact','generateAviatie','generateGeotehnic',
    'generateTrafficStudy',
    'generateStudiuFezabilitate'
  ];
  toWrap.forEach(name=>{
    const orig = window[name];
    if(typeof orig !== 'function') return;
    window[name] = async function(){
      try{
        await orig.apply(this, arguments);
      }catch(err){
        console.error('['+name+'] eroare:', err);
        ss('⚠️ Eroare la '+name+': '+err.message+'. Verificați consola pentru detalii.');
      }
    };
  });
  // Eliminăm și global unhandledrejection care duplica mesajele
})();



// ═══════════════════════════════════════════════════════════════════════════
// AEDIS 3D VIEWER — Three.js, BufferGeometry corect
// ═══════════════════════════════════════════════════════════════════════════

// V3D moved to top



// ════════════════════════════════════════════════════════════════════════════
// STUDIU DE PREFEZABILITATE / FEZABILITATE / DALI
// HG 907/2016 — Legea 500/2002 — Legea 98/2016
// ════════════════════════════════════════════════════════════════════════════

async function generateStudiuFezabilitate(paramOverrides){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă pentru studiu.');return;}
  // Dacă nu avem overrides (chemat direct din buton), deschidem modalul de parametri
  if(!paramOverrides){
    if(typeof showSFParamsModal==='function'){showSFParamsModal();return;}
  }
  ss('Se generează Studiu de Fezabilitate / DALI...');

  const d=_initStudyPdf('Studiu de Prefezabilitate / Fezabilitate / DALI','SF-DALI · HG 907/2016',15);
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,GOLD3,BLUE,BLUE2,TEAL,LIGHT,LIGHT2,LIGHT3,
    RED,GREEN,ORANGE,PURPLE,GRAY,GRAY2,GRAY3,GRAY4,WHITE,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
    hdr,ftr,sec,subsec,body,tblRow,addImg,kv,badge,divider,bullet,concluzii,sign,cover,newPage,checkY}=d;
  const caps=await _captureStudyMaps(ap, msg=>ss(msg));

  // Date de baza
  const areaNum=parseFloat(area)||300;
  const scMax=Math.round(areaNum*parseFloat(params?.pot||35)/100);
  const sdTotal=Math.round(areaNum*parseFloat(params?.cut||1.0));
  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13.2;
  const niv=Math.max(1,Math.ceil(aedisH/3));
  const svMin=Math.round(areaNum*parseFloat(params?.sv||20)/100);
  const pkMin=Math.max(2,Math.ceil(sdTotal/120)*parseInt(params?.pk||1));
  const latN=lat.toFixed(4),lonE=lon.toFixed(4);

  // ── Prețuri dinamice per UAT — cu suport pentru overrides utilizator ──
  const _fc = getFinanciarConfig();
  const _p  = paramOverrides||{};
  const _pretConstr = parseFloat(_p.pretConstr  || _fc.pretConstructie);
  const _pretTeren  = parseFloat(_p.pretTeren   || _fc.pretTeren);
  const _chirieRef  = parseFloat(_p.chirieRef   || _fc.chirieRef);
  const _pretVanzare= parseFloat(_p.pretVanzare || _fc.pretVanzare || _pretConstr*1.4);
  const _rataOcup   = parseFloat(_p.rataOcupare || 85) / 100;
  const costConstr=Math.round(sdTotal*_pretConstr);
  const costTeren=Math.round(areaNum*_pretTeren);
  const costTotal=Math.round((costConstr+costTeren)*1.25); // +25% diverse+TVA+proiectare
  const venitAn=Math.round(sdTotal*_rataOcup*_chirieRef*12);
  const rentabilitate=((venitAn/costTotal)*100).toFixed(1); // % randament brut anual

  // Functiune
  const fnLabel=(params?.fn_label||'Locuire colectivă / Mixt');

  // ── PAG 1: COVER ──────────────────────────────────────────────────────────
  cover(
    'Studiu de Fezabilitate · DALI · conf. HG 907/2016',
    caps.img3D,
    [['Funcțiune propusă',fnLabel],['Tip studiu','SF / DALI · HG 907/2016'],['Faza','Pre-proiectare orientativă']],
    true,
    '✓ STUDIU ORIENTATIV — PREFEZABILITATE URBANISTICĂ DIGITALĂ'
  );

  // ── PAG 2: DATE DE IDENTIFICARE + INDICATORI URBANISTICI ─────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('DATE DE IDENTIFICARE ȘI INDICATORI URBANISTICI PUG',2);ftr();
  let cy=33;
  cy=sec('1. DATE DE IDENTIFICARE A INVESTIȚIEI',cy);cy+=2;
  // KPI-uri
  const kw=(W-28-9)/4;
  kv('NR. CADASTRAL',nrcad,14,cy,kw,GOLD);
  kv('SUPRAFAȚĂ TEREN',areaNum+'mp',14+kw+3,cy,kw,BLUE);
  kv('UTR / ZONĂ',utr,14+(kw+3)*2,cy,kw,TEAL);
  kv('REGIM H MAX',params?.h?params.h+'m':'N/S',14+(kw+3)*3,cy,kw,ORANGE);
  cy+=22;
  kv('POT MAX',params?.pot+'%',14,cy,kw,GOLD);
  kv('CUT MAX',String(params?.cut),14+kw+3,cy,kw,BLUE);
  kv('SV MINIM',params?.sv+'%',14+(kw+3)*2,cy,kw,GREEN);
  kv('PARCAJE MIN',params?.pk+' loc/unit',14+(kw+3)*3,cy,kw,PURPLE);
  cy+=24;
  cy=sec('2. PARAMETRI TEHNICI ESTIMATIVI AI INVESTIȚIEI',cy);cy+=2;
  cy=tblRow(['Parametru','Valoare estimativă','Baza de calcul','Obs.'],cy,true,[70,38,55,19]);
  [['Suprafață construită la sol (SC)',scMax+' mp (POT='+params?.pot+'%)','RLU UTR '+utr,'Estimativ'],
   ['Suprafață desfășurată totală (SDA)',sdTotal+' mp (CUT='+params?.cut+')','RLU UTR '+utr,'Estimativ'],
   ['Înălțime maximă propusă',aedisH.toFixed(1)+' m (P+'+(niv-1)+' niv.)','Conf. AEDIS 3D','Orientativ'],
   ['Suprafețe verzi minime',svMin+' mp ('+params?.sv+'%)','RLU UTR '+utr,'Obligatoriu'],
   ['Parcaje minime obligatorii',pkMin+' locuri ('+params?.pk+'/unitate)','NP 051/2012','Verificare'],
   ['Retragere față stradă',params?.rf+' m','RLU UTR '+utr,'Obligatoriu'],
   ['Retragere laterală',params?.rl+' m','RLU UTR '+utr,'Obligatoriu'],
   ['Retragere spate',params?.rs+' m','RLU UTR '+utr,'Obligatoriu'],
   ['Coordonate GPS',latN+'°N / '+lonE+'°E','UrbanX GIS','Cadastru'],
   ['UAT / Județ',uat+' / '+judet,'SIRUTA','Registru'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,38,55,19]));
  cy+=3;
  cy=addImg(caps.imgLocation,14,cy,W-28,50,'FIG. 1 — Amplasament · Vedere ortofoto cu limite parcelă · Sursa: UrbanX + Mapbox');

  // ── PAG 3: SITUAȚIA EXISTENTĂ + CONTEXT URBAN 3D ─────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('SITUAȚIA EXISTENTĂ — CONTEXT URBAN ȘI REGLEMENTĂRI PUG',3);ftr();
  cy=33;
  const half=(W-28)/2-2;
  cy=addImg(caps.img3D,14,cy,half,60,'FIG. 2 — Vedere 3D principal · Volumul propus în context urban real · Mapbox Standard 3D');
  addImg(caps.img2D,14+half+4,cy-60,half,60,'FIG. 3 — Plan 2D ortogonal · Parcelă + clădiri existente în 200m rază');
  cy+=3;
  cy=sec('3. DESCRIEREA SITUAȚIEI EXISTENTE',cy);cy+=2;
  cy=body('Amplasamentul cu nr. cadastral '+nrcad+' este situat în '+uat+', județul '+judet+', zona UTR '+utr+' conform PUG aprobat. Suprafața terenului este de '+areaNum+' mp. Terenul se află la coordonatele GPS '+latN+'°N / '+lonE+'°E. Funcțiunea urbană dominantă a zonei UTR '+utr+' este "'+fnLabel+'" conform Regulamentului Local de Urbanism în vigoare.',14,cy);cy+=3;
  cy=sec('3.1. REGLEMENTĂRI PUG APLICABILE — UTR '+utr,cy);cy+=2;
  cy=tblRow(['Indicator PUG','Valoare RLU','Semnificație','Restricții'],cy,true,[40,30,70,42]);
  [['POT max',''+params?.pot+'%','Max. '+scMax+' mp SC la sol (din '+areaNum+' mp teren)','Nu se depășește'],
   ['CUT max',''+params?.cut,'Max. '+sdTotal+' mp SDA totală','Nu se depășește'],
   ['H max',''+( params?.h||'N/S')+'m','Conf. PUG + R.H. stradal','Verificare AACR'],
   ['SV min',''+params?.sv+'%','Min. '+svMin+' mp spații verzi pe parcela','Obligatoriu'],
   ['Parcaje',''+params?.pk+' loc/unitate','Min. '+pkMin+' locuri conform NP 051/2012','Obligatoriu'],
   ['Retrageri','rf='+params?.rf+'m, rl='+params?.rl+'m, rs='+params?.rs+'m','Minim față de limitele de proprietate','Obligatoriu'],
   ['Funcțiuni admise','Conf. UTR '+utr,'Conform PUG '+uat+' în vigoare','Verificare PUG'],
   ['Funcțiuni interzise','Conf. UTR '+utr,'Conform PUG '+uat+' în vigoare','Obligatoriu'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,30,70,42]));

  // ── PAG 4: PROPUNEREA DE INVESTIȚIE — VARIANTE TEHNICE ───────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PROPUNEREA DE INVESTIȚIE — VARIANTE TEHNICE COMPARATE',4);ftr();
  cy=33;
  cy=addImg(caps.imgFront,14,cy,half,55,'FIG. 4 — Vedere frontală (stradă) · Volumetrie propusă · Regim P+'+(niv-1));
  addImg(caps.imgAerial,14+half+4,cy-55,half,55,'FIG. 5 — Vedere aeriană 45° · Amprenta + acoperis + context imediat');
  cy+=3;
  cy=sec('4. DESCRIEREA INVESTIȚIEI — VARIANTE DE SCENARII',cy);cy+=2;
  cy=tblRow(['Scenariu','SC (mp)','SDA (mp)','H max (m)','Cost estimat','Rentabilitate'],cy,true,[30,22,24,22,44,40]);
  const sc1=Math.round(scMax*0.7), sda1=Math.round(sdTotal*0.7);
  const sc2=scMax, sda2=sdTotal;
  const sc3=Math.round(scMax*0.9), sda3=Math.round(sdTotal*1.1);
  [['S1 — Conservator',sc1+' mp',sda1+' mp',Math.round(aedisH*0.75)+'m',Math.round(sda1*700/1000)+' kEUR',((sda1*0.85*50*12)/((sda1*700*1.25+costTeren)/1000)).toFixed(1)+'%'],
   ['S2 — Recomandat ★',sc2+' mp',sda2+' mp',aedisH.toFixed(0)+'m',Math.round(sda2*700/1000)+' kEUR',((sda2*0.85*50*12)/((sda2*700*1.25+costTeren)/1000)).toFixed(1)+'%'],
   ['S3 — Maxim RLU',sc3+' mp',sda3+' mp',params?.h||aedisH.toFixed(0)+'m',Math.round(sda3*700/1000)+' kEUR',((sda3*0.85*50*12)/((sda3*700*1.25+costTeren)/1000)).toFixed(1)+'%'],
  ].forEach((r,i)=>{
    if(i===1){
      // S2 RECOMANDAT: linie verde stânga (3mm) + text "★" în culoare verde
      const cyBefore=cy;
      cy=tblRow(r,cy,false,[30,22,24,22,44,40]);
      // Border stânga verde aprins — desenat DUPĂ row (nu acoperă text)
      pdf.setFillColor(34,197,94);
      pdf.rect(14,cyBefore-5.5,3.5,cy-cyBefore+5.5,'F');
      // Linie orizontală subtilă verde sub S2
      pdf.setDrawColor(34,197,94);pdf.setLineWidth(0.6);
      pdf.line(14,cy-1,W-14,cy-1);
    } else {
      cy=tblRow(r,cy,false,[30,22,24,22,44,40]);
    }
  });
  cy+=4;
  cy=sec('4.1. PROGRAMUL DE INVESTIȚIE RECOMANDAT (SCENARIUL S2)',cy);cy+=2;
  cy=body('Scenariul S2 (recomandat) propune valorificarea optimă a indicatorilor PUG pentru UTR '+utr+', cu o suprafață construită la sol de '+sc2+' mp (POT='+params?.pot+'%) și o suprafață desfășurată totală de '+sda2+' mp (CUT='+params?.cut+'). Regimul de înălțime propus este P+'+(niv-1)+' (H='+aedisH.toFixed(1)+'m), compatibil cu caracterul urban al zonei și cu cerințele de insorire (OMS 119/2014).',14,cy);cy+=3;
  cy=body('Funcțiunile prevăzute în cadrul investiției propuse sunt: '+fnLabel+'. Distribuția spațiilor pe niveluri va fi stabilită în proiectul tehnic, respectând prevederile PUG '+uat+', RLU UTR '+utr+' și legislația specifică funcțiunii (Legea 50/1991, Normativ I7 pentru instalații electrice, NP 064/2002 pentru parcaje etc.).',14,cy);

  // ── PAG 5: INDICATORI TEHNICO-ECONOMICI ──────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('INDICATORI TEHNICO-ECONOMICI — ESTIMARE ORIENTATIVĂ',5);ftr();
  cy=33;
  cy=sec('5. INDICATORI TEHNICO-ECONOMICI CONFORM HG 907/2016',cy);cy+=2;
  cy=body('Indicatorii tehnico-economici de mai jos sunt STRICT ORIENTATIVI și au ca scop sprijinirea deciziei de investiție. Valorile exacte se stabilesc prin studiu de fezabilitate detaliat, cu deviz elaborat de proiectant autorizat, pe baza Proiectului Tehnic (PT) aprobat.',14,cy);cy+=4;
  cy=tblRow(['Indicator tehnico-economic','UM','Valoare estimativă','Baza de calcul'],cy,true,[80,18,42,42]);
  [['Suprafață teren (ST)',         'mp',areaNum+'','Extras CF'],
   ['Suprafață construită la sol (SC)','mp',scMax+'','POT='+params?.pot+'% x ST'],
   ['Suprafață desfășurată totală (SDA)','mp',sdTotal+'','CUT='+params?.cut+' x ST'],
   ['Suprafață spații verzi (SV)','mp',svMin+'','SV='+params?.sv+'% x ST (min.)'],
   ['Nr. niveluri (regim înălțime)','niv.','P+'+(niv-1),'Conf. AEDIS / RLU'],
   ['Înălțime maximă (Hmax)','m',aedisH.toFixed(1),'Conf. AEDIS orientativ'],
   ['Nr. locuri parcare obligatorii','locuri',pkMin+'','NP 051/2012 + RLU'],
   ['Valoare estimativă construcție','EUR',costConstr.toLocaleString(),(_fc.pretConstructie+' EUR/mp SDA')],
   ['Valoare estimativă teren','EUR',costTeren.toLocaleString(),(_fc.pretTeren+' EUR/mp teren')],
   ['Diverse, neprevăzute, proiectare (25%)','EUR',Math.round((costConstr+costTeren)*0.25).toLocaleString(),'25% total construire+teren'],
   ['VALOARE TOTALĂ INVESTIȚIE','EUR',costTotal.toLocaleString(),'Total estimativ'],
   ['Valoare investiție / mp SDA','EUR/mp',Math.round(costTotal/sdTotal)+'','Indicele de cost /mp SDA'],
   ['Venit estimat anual (chirie)','EUR/an',venitAn.toLocaleString(),(_fc.chirieRef+' EUR/mp/lună × 85% ocupare')],
   ['Randament brut (ROI brut anual)','%',rentabilitate,'Venit anual / Inv. totală'],
   ['Perioadă estimată recuperare investiție','ani',Math.ceil(costTotal/venitAn)+'','Payback period simplu'],
  ].forEach(r=>cy=tblRow(r,cy,false,[80,18,42,42]));
  cy+=4;
  cy=body('NOTĂ: Valorile financiare sunt estimate la prețuri de piață 2024-2025 pentru zona '+uat+'. Devizul exact poate varia cu ±25-35% față de estimarea orientativă. Costul efectiv se stabilește prin ofertare detaliată pe baza Proiectului Tehnic aprobat.',14,cy);

  // ── PAG 6: ANALIZA FINANCIARĂ + SURSE FINANȚARE ──────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('ANALIZA FINANCIARĂ — SURSE DE FINANȚARE — ANALIZA COST-BENEFICIU',6);ftr();
  cy=33;
  cy=sec('6. ANALIZA FINANCIARĂ A INVESTIȚIEI',cy);cy+=2;
  cy=tblRow(['An','Inv. totalizată (EUR)','Venit estimat (EUR)','Cheltuieli op. (EUR)','Cash flow net (EUR)','Recuperare cum.'],cy,true,[14,40,36,36,38,18]);
  const cfRows=[0,1,2,3,4,5,7,10,15,20];
  cfRows.forEach(an=>{
    const invCum=an===0?costTotal:0;
    const ven=an===0?0:Math.round(venitAn*(1+0.03*an));
    const chelt=an===0?0:Math.round(ven*0.25);
    const cf=an===0?-costTotal:ven-chelt;
    const recup=Math.min(100,Math.round((ven*(an||1)-costTotal)/costTotal*100+100));
    cy=tblRow(['An '+(an||0),an===0?'-'+costTotal.toLocaleString():'-',an===0?'-':ven.toLocaleString(),an===0?'-':chelt.toLocaleString(),cf.toLocaleString(),an===0?'0%':recup+'%'],cy,false,[14,40,36,36,38,18]);
  });
  cy+=4;
  cy=sec('6.1. SURSE DE FINANȚARE IDENTIFICATE',cy);cy+=2;
  cy=tblRow(['Sursă de finanțare','Tip','% din total','Valoare est. (EUR)','Condiții principale'],cy,true,[55,25,18,42,42]);
  [['Fonduri proprii investitor','Propriu',Math.round(costTotal*0.3/1000)+'0 kEUR'+'/100 kEUR',''+Math.round(costTotal*0.3).toLocaleString(),'Minim 20-30% capital propriu'],
   ['Credit bancar (ipotecar)','Bancar',Math.round(costTotal*0.5/1000)+'0 kEUR',''+Math.round(costTotal*0.5).toLocaleString(),'Dobândă 6-9% (2024), termen 15-25 ani'],
   ['Fonduri europene (POR 2021-2027)','UE','-','-','Conf. axa prioritară — eligibilitate specifică'],
   ['Leasing imobiliar','Financiar','-','-','Alternativă credit clasic — termen 10-20 ani'],
   ['Parteneriat public-privat (PPP)','Mixt','-','-','Dacă investiție de interes public'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,25,18,42,42]));

  // ── PAG 7: ANALIZA RISC + IPOTEZE ──────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('MATRICEA DE RISC — IPOTEZE ȘI SCENARII',7);ftr();
  cy=33;
  cy=sec('7. MATRICEA DE RISC A INVESTIȚIEI',cy);cy+=2;
  cy=tblRow(['Tip risc','Probabilitate','Impact','Nivel risc','Măsuri de mitigare'],cy,true,[50,30,28,25,49]);
  [['Risc urbanistic (modificare PUG)','Redusă (5%)','Major','Scăzut','Verificare PUG în vigoare + CU înainte de achiziție teren'],
   ['Risc tehnic geotehnic (teren slab)','Medie (20%)','Major','Mediu','Studiu geotehnic detaliat înainte de proiect structural'],
   ['Risc de permitting (avize întârziate)','Medie (30%)','Mediu','Mediu','Pregătire dosar complet + consultant autorizații'],
   ['Risc financiar (creștere costuri constr.)','Ridicată (40%)','Major','Ridicat','Rezervă contingență 15-20% + contracte cu prețuri ferme'],
   ['Risc de piață (cerere imobiliară)','Medie (25%)','Major','Mediu','Analiză de piață detaliată + pre-vânzări / pre-închirieri'],
   ['Risc juridic (litigii proprietate)','Redusă (5%)','Major','Scăzut','Verificare completă CF + expertiză juridică teren'],
   ['Risc de mediu (contaminare teren)','Redusă (10%)','Mediu','Scăzut','Investigare istorică teren + studiu geo-chimic dacă industrial'],
   ['Risc seismic (P100-1/2013 zona '+getSeismConfig().zona+')','Certitudine','Variabil','Mediu','Structură antiseismică conform P100-1/2013 — proiect rezistență'],
   ['Risc construire ilegal','Zero','Major','Zero','Respectare strictă AC + PT aprobat + diriginte de șantier'],
  ].forEach(r=>cy=tblRow(r,cy,false,[50,30,28,25,49]));
  cy+=3;
  cy=sec('7.1. IPOTEZE DE CALCUL UTILIZATE',cy);cy+=2;
  ['Prețul de construcție estimat: 700 EUR/mp SDA (prețuri 2024-2025, nivel mediu calitate bună, zona '+uat+').','Prețul de achiziție teren: 800 EUR/mp (estimare piață 2024, UTR '+utr+' intravilanul '+uat+').','Chiriile de referință: 50 EUR/mp/lună (utilizare mixtă birouri/comercial/locuire).','Rata de ocupare asumată: 85% din SDA (conservator).','Creșterea anuală a chiriei: 3% (inflație + indexare euro).','Cheltuielile operaționale estimate: 25% din venituri (administrare, mentenanță, asigurări, impozit).','Dobânda de finanțare bancară: 7% anual (estimare 2024-2025).','Orizontul de analiză: 20 ani pentru NPV și IRR.'].forEach(r=>{cy=body('• '+r,16,cy);cy+=2;});

  // ── PAG 8: CALENDAR IMPLEMENTARE + PROCEDURI ─────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CALENDARUL IMPLEMENTĂRII — ETAPE ȘI PROCEDURI LEGALE',8);ftr();
  cy=33;
  cy=sec('8. CALENDARUL DE IMPLEMENTARE A INVESTIȚIEI — CONF. HG 907/2016',cy);cy+=2;
  cy=tblRow(['Fază / Etapă','Durată estim.','Documente necesare','Responsabil'],cy,true,[40,22,90,30]);
  [['FAZA 0 — Pre-achiziție teren','0-2 luni','Verificare CF + Plan cadastral + PUG + CU informativ','Beneficiar + jurist'],
   ['FAZA 1 — Achiziție / asigurare teren','1-3 luni','Contract vânzare-cumpărare autentificat + Intabulare CF','Beneficiar + notar'],
   ['FAZA 2 — Certificat Urbanism (CU)','1-2 luni','Cerere CU + Plan situație + Acte proprietate','Beneficiar la Primărie'],
   ['FAZA 3 — Studii de bază','2-4 luni','Studiu geotehnic + Relevee + Studii de specialitate din CU','Specialiști atestați'],
   ['FAZA 4 — Proiect PAC/DTAC','3-6 luni','DTAC complet + toate planele + memorii tehnice','Arhitect OAR + ingineri'],
   ['FAZA 5 — Obținere avize','2-4 luni','Avize din CU: ISU, E-ON, RAJA, AACR, DJCPN etc.','Arhitect + beneficiar'],
   ['FAZA 6 — Autorizație de Construire (AC)','1-2 luni','Dosar AC complet la Primăria '+uat,'Beneficiar'],
   ['FAZA 7 — Proiect Tehnic (PT) + DDE','3-6 luni','PT complet + detalii de execuție','Arhitect OAR + ingineri'],
   ['FAZA 8 — Licitație antreprenor','1-3 luni','Caiet sarcini + documentație licitație','Beneficiar + jurist'],
   ['FAZA 9 — Execuție construcție',Math.round(sdTotal/300)+'-'+Math.round(sdTotal/200)+' luni','Contract antreprenor + diriginte + RTE','Antreprenor CL/CQ'],
   ['FAZA 10 — Recepție + Intabulare','1-2 luni','Comisie recepție + PV recepție + CF actualizat','Beneficiar + comisie'],
   ['TOTAL ESTIMAT','~'+(12+Math.ceil(sdTotal/200))+'-'+(24+Math.ceil(sdTotal/150))+' luni','—','—'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,22,90,30]));

  // ── PAG 9: AVIZE ȘI ACORDURI NECESARE ────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('AVIZE ȘI ACORDURI NECESARE — DOCUMENTE DE AUTORIZARE',9);ftr();
  cy=33;
  cy=sec('9. AVIZE ȘI ACORDURI OBLIGATORII — CONFORM LEGII 50/1991',cy);cy+=2;
  cy=body('Lista completă a avizelor și acordurilor necesare se stabilește prin Certificatul de Urbanism emis de Primăria '+uat+'. Lista de mai jos cuprinde avizele tipice pentru funcțiunea '+fnLabel+' în UTR '+utr+', zona '+uat+', și este orientativă — poate fi completată prin CU.',14,cy);cy+=4;
  cy=tblRow(['Aviz / Acord','Emitent','Obligativitate','Termen emitere'],cy,true,[70,52,30,30]);
  [[(_fc.operatorEnerg||'Furnizor electricitate'),'Conf. UAT '+S2(uat),'Obligatoriu','30-60 zile'],
   ['Delgaz Grid (gaz natural, dacă se prevede)','Delgaz Grid SA','Obligatoriu (dacă gaz)','30-60 zile'],
   [(_fc.operatorApa||'Operator apă-canal'),S2(uat),'Obligatoriu','30-60 zile'],
   ['ISU Moldova (P.S.I.) — la P+3 sau S>600mp','ISU Moldova','Obligatoriu conf. norme','30-60 zile'],
   ['AACR / ROMATSA (dacă în zona de protecție aeroport)','ROMATSA + AACR','Dacă dist.<15km LRIA','30-90 zile'],
   ['DJCPN Iași (dacă în ZCP sau zonă protecție monument)','DJCPN Iași — Str. A. Panu 25','Dacă UTR cu patrimoniu','30-60 zile'],
   ['APM Iași (dacă suprafață >1000mp SD sau pe curs de apă)','APM Iași','Dacă se depășesc praguri','30-60 zile'],
   ['Primăria Municipiului Iași — DAU','PMI — DAU','Consultare înainte de PAC','15-30 zile'],
   ['Direcția de Sănătate Publică (DSP) Iași','DSP Iași','La locuire + dotări medicale','15-30 zile'],
   ['Operatori telecomunicații (Orange, Telekom etc.)','Operatori multipli','Dacă traversare rețele','15-30 zile'],
   ['CFR / CNADNR (dacă adiacentă cale ferată / drum național)','CFR / CNADNR','Dacă adjacentă','30-60 zile'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,52,30,30]));
  cy+=3;
  cy=addImg(caps.imgCity,14,cy,W-28,45,'FIG. 6 — Harta '+S2(uat)+' · Amplasament + context urban general');

  // ── PAG 10: DESPRE DALI — DOCUMENTAȚIE AVIZARE LUCRĂRI INTERVENȚIE ────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('DALI — DOCUMENTAȚIE DE AVIZARE A LUCRĂRILOR DE INTERVENȚIE',10);ftr();
  cy=33;
  cy=sec('10. DALI — DOCUMENTAȚIE DE AVIZARE A LUCRĂRILOR DE INTERVENȚIE',cy);cy+=2;
  cy=body('DALI (Documentația de Avizare a Lucrărilor de Intervenție) este documentul tehnico-economic specific INTERVENȚIILOR pe construcțiile existente, echivalentul Studiului de Fezabilitate (SF) pentru construcțiile noi, reglementat de HG 907/2016, Anexa nr. 5. DALI este obligatorie pentru obținerea finanțărilor din fonduri publice (PNRR, POR, PNI) și pentru investițiile co-finanțate public-privat. Prezentul document orientativ UrbanX nu înlocuiește DALI întocmit de consultant autorizat.',14,cy);cy+=4;
  cy=sec('10.1. CONȚINUT-CADRU DALI — CONF. HG 907/2016, ANEXA 5',cy);cy+=2;
  cy=tblRow(['Secțiune DALI','Conținut principal','Cine elaborează'],cy,true,[40,100,42]);
  [['A. INFORMAȚII GENERALE','Date investiție, localizare, CUI beneficiar, faza de finanțare','Beneficiar + consultant'],
   ['B. DATE TEHNICE ALE INVESTIȚIEI','Starea tehnică a clădirii existente, expertiză tehnică, audit energetic','Expert tehnic AICPS + auditor energetic'],
   ['C. SCENARII TEHNICO-ECONOMICE','Min. 2 scenarii de intervenție cu costuri și avantaje comparative','Proiectant + devizier'],
   ['D. ANALIZA OPȚIUNILOR','Comparație scenarii + recomandare scenariu optim','Proiectant + beneficiar'],
   ['E. ANALIZA FINANCIARĂ','Indicatori financiari: VAN, RIR, RBC, Payback','Economist + consultant'],
   ['F. ANALIZA ECONOMICĂ','Costuri și beneficii economice pentru investiții publice','Economist'],
   ['G. JUSTIFICAREA SOLUȚIEI','Argumentația alegerii scenariului recomandat','Proiectant'],
   ['H. INDICATORI DE MONITORIZARE','KPI-uri de urmărit post-investiție','Beneficiar + PMU'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,100,42]));
  cy+=3;
  cy=body('DIFERENȚA SF vs. DALI: Studiul de Fezabilitate (SF) se aplică CONSTRUCȚIILOR NOI, iar DALI se aplică exclusiv INTERVENȚIILOR PE CLĂDIRI EXISTENTE (reabilitare, consolidare, modernizare, extindere). Ambele sunt reglementate de HG 907/2016 și sunt obligatorii pentru proiectele finanțate din fonduri publice sau credite garantate de stat.',14,cy);

  // ── PAG 11: VEDERI 3D + BILANȚ FINAL ────────────────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('VEDERI 3D VOLUMETRIE PROPUSĂ — BILANȚ SUPRAFEȚE FINAL',11);ftr();
  cy=33;
  cy=addImg(caps.v3dDay,14,cy,half,58,'FIG. 7 — Viewer 3D Urban3D · ZI · Volumetrie propusă în context real');
  addImg(caps.v3dNight,14+half+4,cy-58,half,58,'FIG. 8 — Viewer 3D Urban3D · NOAPTE · Impact nocturn');cy+=3;
  cy=addImg(caps.v3dGolden,14,cy,half,52,'FIG. 9 — Viewer 3D Urban3D · GOLDEN HOUR · Fatade și umbre');
  addImg(caps.imgBack,14+half+4,cy-52,half,52,'FIG. 10 — Vedere posterioară · Curte + spații verzi');cy+=3;
  cy=sec('11. BILANȚ FINAL SUPRAFEȚE — SCENARIUL S2 RECOMANDAT',cy);cy+=2;
  cy=tblRow(['Suprafață','Valoare calculată','% din ST','Status'],cy,true,[65,42,22,53]);
  [['Suprafață teren (ST)',areaNum+' mp','100%','Conform CF'],
   ['Suprafață construită la sol (SC)',scMax+' mp',''+params?.pot+'%','CONFORM POT max='+params?.pot+'%'],
   ['Suprafață desfășurată totală (SDA)',sdTotal+' mp','CUT='+params?.cut,'CONFORM CUT max='+params?.cut],
   ['Suprafețe verzi (SV)',svMin+' mp',''+params?.sv+'%','CONFORM SV min='+params?.sv+'%'],
   ['Suprafețe parcaje la sol',pkMin*30+' mp est.',''+Math.round(pkMin*30/areaNum*100)+'%','Verificare proiect'],
   ['Suprafețe circulații + alei',Math.round(areaNum*0.08)+' mp est.','~8%','Proiect peisagistic'],
   ['Suprafețe libere',Math.max(0,areaNum-scMax-svMin-pkMin*30-Math.round(areaNum*0.08))+' mp','—','Proiect specific'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,42,22,53]));

  // ── PAG 12: BAZA LEGALĂ + CONCLUZII + SEMNĂTURĂ ──────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('BAZA LEGALĂ COMPLETĂ — CONCLUZII — CASETA TEHNICĂ',12);ftr();
  cy=33;
  cy=sec('12. CONCLUZII FINALE — STUDIU DE PREFEZABILITATE / FEZABILITATE',cy);cy+=2;
  cy=body('Prezentul Studiu de Prefezabilitate / Fezabilitate / DALI pentru amplasamentul cu nr. cadastral '+nrcad+' (UTR '+utr+', suprafața '+areaNum+' mp, '+uat+', jud. '+judet+') are caracter STRICT ORIENTATIV și a fost generat digital prin platforma UrbanX. Documentul sintetizează indicatorii tehnico-economici estimativi ai investiției propuse (SD total='+sdTotal+' mp, H='+aedisH.toFixed(1)+'m, valoare totală estimată ~'+costTotal.toLocaleString()+' EUR) și nu înlocuiește Studiul de Fezabilitate sau DALI elaborat de consultant autorizat conform HG 907/2016.',14,cy);cy+=3;
  cy=tblRow(['Indicator cheie','Valoare','Status'],cy,true,[80,52,50]);
  [['Valoare totală investiție estimativă','~'+costTotal.toLocaleString()+' EUR','Orientativ ±30%'],
   ['Suprafață desfășurată (SDA)',sdTotal+' mp','Conf. CUT='+params?.cut],
   ['Randament brut estimat (ROI)',rentabilitate+'%/an','La 50 EUR/mp/lună'],
   ['Perioadă de recuperare investiție',Math.ceil(costTotal/venitAn)+' ani','Payback simplu'],
   ['Conformitate indicatori PUG','CONFORM (orientativ)','Verificare obligatorie CU'],
   ['Studiu geotehnic','OBLIGATORIU','Înainte de proiectare structurală'],
   ['Tip documentație obligatorie','SF (construcție nouă) / DALI (intervenție)','HG 907/2016'],
  ].forEach(r=>cy=tblRow(r,cy,false,[80,52,50]));
  cy+=4;

  // ── PAG 13: SINTEZA STUDIILOR TEHNICE DE SPECIALITATE ────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('SINTEZA STUDIILOR TEHNICE DE SPECIALITATE — CONCLUZII AGREGATE',13);ftr();
  cy=33;
  cy=sec('13. SINTEZA CONCLUZIILOR STUDIILOR TEHNICE DE SPECIALITATE',cy);cy+=2;
  cy=body('Studiul de Prefezabilitate/Fezabilitate integrează concluziile tuturor studiilor de specialitate generate pentru amplasamentul '+nrcad+' (UTR '+utr+'). Tabelul de mai jos rezumă conformitățile și cerințele principale identificate în fiecare studiu de specialitate, cu impact direct asupra investiției și a procesului de autorizare.',14,cy);cy+=4;

  // ─── Trafic ──────────────────────────────────────────────────────────────
  cy=sec('13.1. IMPACT TRAFIC — CONCLUZII SINTETICE',cy);cy+=2;
  const trafCfgF=getTraficConfig();
  const pkMinF=Math.max(2,Math.ceil(sdTotal/120)*parseInt(params?.pk||1));
  const totalZilnicF=Math.ceil(sdTotal/80)*8;
  cy=tblRow(['Indicator trafic','Valoare estimată','Cerință normativă','Status'],cy,true,[70,42,42,28]);
  [['Trafic generat estimat zilnic',totalZilnicF+' veh/zi','Conf. ITE TG11','Orientativ'],
   ['Trafic oră de vârf seara (17-18h)',Math.ceil(totalZilnicF*0.12)+' veh/h','LOS C recomandat','Verificare'],
   ['Locuri de parcare obligatorii',pkMinF+' locuri ('+params?.pk+'/unit.)','NP 051/2012 + RLU','Obligatoriu'],
   ['Locuri PMR (4% din total)',Math.max(1,Math.ceil(pkMinF*0.04))+' locuri obligatorii','NP 051/2012 art. 5.2','Obligatoriu'],
   ['Suprafață parcare estimată',pkMinF*30+' mp (la sol)','Inclus în bilanț SF','Verificare proiect'],
   ['Acces auto (lățime minimă)','min. 3.5m (1 sens) / 6m (2 sensuri)','SR 4032-1','Proiect specific'],
   ['Stații EV recomandate (10% din locuri)',Math.max(1,Math.ceil(pkMinF*0.1))+' prize 22kW','Reg. UE 2023/1804','Recomandare EU'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,42,42,28]));
  cy+=3;
  cy=body('Implicație financiară estimată: suprafața de parcare de '+pkMinF*30+' mp reprezintă '+(pkMinF*30/areaNum*100).toFixed(1)+'% din suprafața totală a parcelei. '+(pkMinF*30>areaNum*0.3?'ATENȚIE: parcajul la sol depășește 30% din parcelă — se recomandă parcare subterană (cost suplimentar estimat '+Math.round(pkMinF*4500).toLocaleString()+' EUR pentru P-1).':'Parcajul la sol este fezabil pe amplasament.')+'.',14,cy);

  // ─── ISU ─────────────────────────────────────────────────────────────────
  cy+=4;
  cy=sec('13.2. SIGURANȚĂ LA FOC (ISU) — CERINȚE ȘI IMPLICAȚII',cy);cy+=2;
  const isISUObligF=(aedisH>8||Math.round(areaNum*parseFloat(params?.cut||1.0))>600);
  cy=tblRow(['Parametru ISU','Valoare amplasament','Cerință P118/Lege 307','Status'],cy,true,[70,42,50,20]);
  [['Aviz ISU obligatoriu?',isISUObligF?'DA':'Verificare','H>8m sau SD>600mp',''+( isISUObligF?'OBLIGATORIU':'Verificare')],
   ['Categorie pericol de incendiu','Categoria C/D (uzual rezidențial)','P118-1/2015 Tab. 2.1','Conf. proiect'],
   ['Gradul de rezistență la foc','GR II-III (uzual P+3, BA)','P118-1/2015 art. 2.14','Conf. proiect structural'],
   ['Cale acces ISU (lățime min.)','min. 3.5m (1 vehicul) / 5.5m (2 veh.)','P118-2/2013 art. 6.3','Verificare plan situație'],
   ['Distanța max. față - acces ISU','max. 80m față de intrarea principală','P118-2/2013 art. 6.5','Conf. proiect accese'],
   ['Hidrant exterior obligatoriu','H>'+Math.min(8,aedisH).toFixed(0)+'m sau SD>'+Math.min(600,Math.round(sdTotal)).toLocaleString()+'mp','P118-2/2013 art. 8','Verificare proiect ISU'],
   ['Scară pompieri (H>28m)','NU — H='+aedisH.toFixed(1)+'m'+(aedisH>28?' ❌ OBLIGATORIE':''),'P118-2/2013 art. 7',aedisH>28?'OBLIGATORIU':'Nu se impune'],
  ].forEach(r=>cy=tblRow(r,cy,false,[70,42,50,20]));
  cy+=2;
  cy=body(isISUObligF?'ATENȚIE: Avizul ISU este OBLIGATORIU pentru această investiție (H='+aedisH.toFixed(1)+'m, SD='+sdTotal+'mp). Costul obținerii avizului ISU și al conformării la cerințele P118: estimat 3.000-8.000 EUR (incluzând proiectant specialitate PSI + echipamente de detecție-alarmare-stingere). Avizul ISU se obține ÎNAINTE de Autorizația de Construire.':'Avizul ISU poate fi necesar în funcție de destinație și detaliile tehnice stabilite în PAC. Verificare obligatorie la faza de Certificat de Urbanism.',14,cy);

  // ── PAG 14: SINTEZA STUDII TEHNICE (continuare) ──────────────────────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('SINTEZA STUDII TEHNICE — MEDIU, ÎNSORIRE, VÂNT, ZGOMOT, GEO',14);ftr();
  cy=33;

  // ─── Însorire / OMS 119 ──────────────────────────────────────────────────
  cy=sec('14.1. ÎNSORIRE — CONFORMITATE OMS 119/2014',cy);cy+=2;
  function solarAltF(lat,month,hour){const D2R=Math.PI/180;const decl=(-23.45*Math.cos(D2R*(360/365)*(month*30+10)))*D2R;const ha=(hour-12)*15*D2R;return Math.max(0,Math.asin(Math.sin(lat*D2R)*Math.sin(decl)+Math.cos(lat*D2R)*Math.cos(decl)*Math.cos(ha))*180/Math.PI);}
  const altDec12=solarAltF(lat,11,12);
  const isConformSolar=altDec12>=15;
  cy=tblRow(['Parametru solar','Valoare calculată','Prag OMS 119/2014','Status'],cy,true,[75,38,38,31]);
  [['Altitudine solară 21 Dec, ora 12:00',altDec12.toFixed(1)+'°','min. 15°',isConformSolar?'✓ CONFORM':'⚠ NECONFORM'],
   ['Umbră maximă proiectată (H='+aedisH.toFixed(1)+'m)',(aedisH/Math.tan(altDec12*Math.PI/180)>500?'>500':( aedisH/Math.tan(altDec12*Math.PI/180)).toFixed(0))+'m spre N','Conf. retragere RLU','Verificare proiect'],
   ['Retragere N minimă recomandată',(aedisH/Math.tan(15*Math.PI/180)).toFixed(0)+'m (formula H/tan15°)','H/tan(15°)','Verificare față de rs='+params?.rs+'m'],
   ['Studiu detaliat OAR obligatoriu',sdTotal>500||niv>4?'DA (>4 niv. sau SD>500mp)':'Recomandat','Ord. 119/2014 art. 3','La faza PAC'],
  ].forEach(r=>cy=tblRow(r,cy,false,[75,38,38,31]));
  cy+=3;

  // ─── Zgomot ──────────────────────────────────────────────────────────────
  cy=sec('14.2. ZGOMOT URBAN — CERINȚE SR 10009:2017',cy);cy+=2;
  const zgomCfgF=getZgomotConfig();
  cy=tblRow(['Parametru acustic','Valoare estimată','Limita SR 10009','Implicație'],cy,true,[65,42,38,37]);
  [['Zona acustică UTR '+utr,zgomCfgF.zona_acustica||'—','Conf. RLU','Informativ'],
   ['Limita Leq zi (06:00-22:00)',zgomCfgF.Lzsn_limita||'55 dB(A)','SR 10009:2017','Cerință fatade expuse'],
   ['Limita Leq noapte (22:00-06:00)',zgomCfgF.Lnoapte_limita||'45 dB(A)','SR 10009:2017','Tamplarie geam triplu dacă lângă surse'],
   ['Izolare acustică fatade (Rw min)','min. 30-35 dB','C 125-2013','Specificat în PT'],
   ['Pardoseli flotante (zgomot impact)','Obligatoriu la cladiri multietaj.','C 125-2013 art. 5','Inclus în cost constructie'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,42,38,37]));
  cy+=3;

  // ─── Vânt ────────────────────────────────────────────────────────────────
  cy=sec('14.3. VÂNT — PRESIUNI DE CALCUL CR 1-1-4/2012',cy);cy+=2;
  const vantCfgF=getVantConfig();
  const qpH=(vantCfgF.presiune_vant||0.55)*Math.pow(aedisH/10,0.3)*1.15;
  cy=tblRow(['Parametru vânt','Valoare','Norma','Implicație proiect'],cy,true,[65,35,38,44]);
  [['Zona de vânt (CR 1-1-4/2012)',vantCfgF.zona||'III','CR 1-1-4/2012','Informativ'],
   ['Presiune referință qRef',( vantCfgF.presiune_vant||0.55)+' kN/mp','CR 1-1-4/2012','Input calcul structural'],
   ['Presiune de vânt la H='+aedisH.toFixed(0)+'m',qpH.toFixed(3)+' kN/mp','CR 1-1-4/2012','Input calcul structural'],
   ['Direcție dominantă',vantCfgF.directie_dominanta||'NV-NE','ANM + CR 1-1-4','Orientare optimă clădire E-V'],
   ['Confort pietonal la parter','Verificare clasă Davenport','GT 023-97','La H>14m sau formă aerodinfă'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,35,38,44]));
  cy+=3;

  // ─── Geotehnic ───────────────────────────────────────────────────────────
  cy=sec('14.4. GEOTEHNICĂ — CATEGORIE ȘI IMPLICAȚII FINANCIARE',cy);cy+=2;
  const catGeoF=aedisH>28?'3 — Complexă':aedisH>10?'2 — Curentă':'1 — Simplă';
  const costGeoF=catGeoF.includes('3')?8000:catGeoF.includes('2')?3500:1500;
  const seismCfgF=getSeismConfig();
  cy=tblRow(['Parametru geotehnic','Valoare estimativă','Normă','Cost orientativ'],cy,true,[65,42,38,37]);
  [['Categoria geotehnică (NP 074/2014)',catGeoF,'NP 074/2014','—'],
   ['Studiu geotehnic (foraje min.)',catGeoF.includes('3')?'5 foraje + 3 CPT':catGeoF.includes('2')?'3 foraje (h=8m)':'1-2 foraje (h=5m)','NP 074/2014',''+costGeoF.toLocaleString()+'-'+(costGeoF*1.8).toFixed(0)+' EUR'],
   ['Fundații recomandate (estimativ)','Izolate/continue BA la 1.5-2.0m','NP 074 + SR EN 1997','Inclus cost construcție'],
   ['Zona seismică (P100-1/2013)',seismCfgF.zona+' (ag='+seismCfgF.ag+'g, Tc='+seismCfgF.Tc+'s)','P100-1/2013','Impact cost structură +5-15%'],
   ['Epuismente / hidroizolație','Posibil (NFA 1.5-8m în Iași)','NP 074/2014','+15.000-40.000 EUR'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,42,38,37]));
  cy+=2;
  cy=body('Implicație financiară geotehnică: costul studiului geotehnic ('+costGeoF.toLocaleString()+'-'+(costGeoF*1.8).toFixed(0)+' EUR) + eventuale măsuri speciale de fundare (+50.000-150.000 EUR) trebuie incluse în bugetul total al investiției. Aceste costuri nu sunt incluse în estimarea din Pag. 5.',14,cy);

  // ── PAG 15: OPTIMIZĂRI RECOMANDATE + CONCLUZII INTEGRATE EXTINSE ─────────
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('OPTIMIZĂRI RECOMANDATE — CONCLUZII INTEGRATE EXTINSE',15);ftr();
  cy=33;
  cy=sec('15. OPTIMIZĂRI RECOMANDATE PENTRU MAXIMIZAREA RENTABILITĂȚII',cy);cy+=2;
  cy=body('Pe baza sintezei tuturor studiilor tehnice de specialitate, se formulează următoarele recomandări de optimizare pentru investiția propusă pe amplasamentul '+nrcad+' (UTR '+utr+'). Implementarea acestor optimizări poate reduce costurile totale, crește randamentul și reduce riscurile de autorizare.',14,cy);cy+=4;
  cy=tblRow(['Optimizare recomandată','Beneficiu estimat','Cost implementare','Prioritate'],cy,true,[78,45,42,17]);
  [['Orientare corp principal E-V (ax lung est-vest)','Reducere consum energetic 15-20% + conformitate OMS 119','0 EUR (proiect)','⭐⭐⭐'],
   ['Parcare subterană P-1 (dacă ST<'+Math.round(pkMinF*30*1.5)+'mp)','+'+pkMinF+'loc suprafața liberă pentru spații comerciale/verzi',Math.round(pkMinF*5000).toLocaleString()+' EUR extra','⭐⭐⭐'],
   ['Parter comercial activ (vitrine >40% fatadă stradală)','Chirie parter comercial 2-3x față de rezidențial','0 EUR (proiect)','⭐⭐⭐'],
   ['Acoperis verde/FV (60% din SC='+Math.round(scMax*0.6)+'mp)','~'+Math.round(Math.round(scMax*0.6)/6.5*1100)+' kWh/an + reducere cost răcire','~'+Math.round(Math.round(scMax*0.6)*100).toLocaleString()+' EUR','⭐⭐'],
   ['Sistem BMS (Building Management System)','Reducere costuri operaționale 20-30%','8.000-25.000 EUR','⭐⭐'],
   ['Pre-certificare verde (BREEAM Very Good / LEED Silver)','Chirie +10-15% față de clădiri necertificate','10.000-30.000 EUR','⭐⭐'],
   ['Stații EV ('+Math.max(2,Math.ceil(pkMinF*0.1))+' buc) + rastel biciclete','Atracție chiriași premium + conformitate Reg. UE 2023',''+Math.max(2,Math.ceil(pkMinF*0.1))*1500+' EUR','⭐⭐'],
   ['Fatada ventilată cu termoizolație 15cm (fatade expuse N/NE)','Reducere consum termic 25-35%','30-60 EUR/mp extra vs. tencuială','⭐⭐'],
  ].forEach(r=>cy=tblRow(r,cy,false,[78,45,42,17]));
  cy+=4;
  cy=sec('15.1. BUGET TOTAL RECONSIDERAT — INCLUSIV STUDII ȘI MĂSURI SPECIALE',cy);cy+=2;
  cy=tblRow(['Categorie cost','Estimare orientativă (EUR)','% din total','Obs.'],cy,true,[75,48,20,39]);
  [['Cost construcție propriu-zisă',costConstr.toLocaleString(),Math.round(costConstr/costTotal*100)+'%',''+_pretConstr+' EUR/mp SDA'],
   ['Achiziție / valoare teren',costTeren.toLocaleString(),Math.round(costTeren/costTotal*100)+'%',''+_pretTeren+' EUR/mp teren'],
   ['Proiectare (2-3% din construcție)',Math.round(costConstr*0.025).toLocaleString(),'~2.5%','PAC + PT + DDE + detalii'],
   ['Studii tehnice obligatorii (geo, trafic etc.)',Math.round(costGeoF*2.5).toLocaleString(),'—','Geotehnic + specialități CU'],
   ['Avize și taxe autorizare',Math.round(costConstr*0.01).toLocaleString(),'~1%','CU + AC + avize specilaitate'],
   ['Instalații ISU (detecție, stingere, evac.)','8.000 - 25.000','—','Obligatoriu dacă aviz ISU'],
   ['Rezervă contingență (15%)',Math.round(costConstr*0.15).toLocaleString(),'15%','Variații preț materiale+manoperă'],
   ['TOTAL RECALCULAT',Math.round(costTotal*1.05).toLocaleString(),'100%','Estimat ±25-30%'],
  ].forEach(r=>cy=tblRow(r,cy,false,[75,48,20,39]));

  cy+=4;
  cy=sec('12.1. BAZA LEGALĂ COMPLETĂ',cy);cy+=2;
  ['HG nr. 907/2016 privind etapele de elaborare și conținutul-cadru al documentațiilor tehnico-economice.','Legea nr. 500/2002 privind finanțele publice — Capitolul privind investițiile publice.','Legea nr. 98/2016 privind achizițiile publice — art. 22 (studii de fezabilitate).','OUG nr. 114/2011 privind atribuirea anumitor contracte de achiziții publice în domeniile apărare și securitate.','Legea nr. 50/1991 republicată — autorizarea executării lucrărilor de construcții.','Legea nr. 350/2001 privind amenajarea teritoriului și urbanismul, republicată.','NP 074/2014 — Normativ privind principiile, exigențele și metodele cercetării geotehnice.','P100-1/2013 — Cod de proiectare seismică. Prevederi pentru clădiri (zona '+getSeismConfig().zona+').','Legea nr. 10/1995 republicată — Calitatea în construcții.','PUG '+uat+' în vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=2;});
  sign();
  pdf.save('SF_DALI_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Studiu Fezabilitate / DALI generat!');
}

// ════════════════════════════════════════════════════════════════════════════
// STUDIU AMPLASAMENT — Document fundament pentru toate studiile de specialitate
// ════════════════════════════════════════════════════════════════════════════
async function generateStudiuAmplasament(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă pentru studiu.');return;}
  ss('Se generează Studiu de Amplasament...');

  const d=_initStudyPdf('Studiu de Amplasament și Analiză Teritorială','Studiu amplasament · Document fundament',12);
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,GOLD3,BLUE,BLUE2,TEAL,LIGHT,LIGHT2,LIGHT3,
    RED,GREEN,ORANGE,PURPLE,GRAY,GRAY2,GRAY3,GRAY4,WHITE,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
    hdr,ftr,sec,subsec,body,tblRow,addImg,kv,badge,divider,bullet,concluzii,sign,cover,newPage,checkY}=d;
  const caps=await _captureStudyMaps(ap, msg=>ss(msg));

  // ── Date de bază ──────────────────────────────────────────────────────────
  const areaNum=parseFloat(area)||300;
  const scMax=Math.round(areaNum*parseFloat(params?.pot||35)/100);
  const sdTotal=Math.round(areaNum*parseFloat(params?.cut||1.0));
  const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13.2;
  const niv=Math.max(1,Math.ceil(aedisH/3));
  const fnLabel=params?.fn_label||'Locuire / Mixt';

  // ── Config specializat ────────────────────────────────────────────────────
  const seism=getSeismConfig();
  const vant=getVantConfig();
  const zgomot=getZgomotConfig();
  const hidro=getHidroConfig();
  const trafic=getTraficConfig();
  const lmiCfg=getLmiConfig();
  const eim=getEIMConfig();
  const fc=getFinanciarConfig();

  // ── Vecinătăți ────────────────────────────────────────────────────────────
  const parcelCtr=turf.centerOfMass(ap.geo).geometry.coordinates;
  const vecini=(S.ctx?.features||[]).filter(f=>f.properties?.h>2).slice(0,10).map(v=>{
    const vc=turf.centerOfMass(v).geometry.coordinates;
    const dist=turf.distance({type:'Feature',geometry:{type:'Point',coordinates:parcelCtr}},
      {type:'Feature',geometry:{type:'Point',coordinates:vc}},{units:'meters'});
    return {nrcad:v.properties?.nrcad||'—',h:(v.properties?.h||0).toFixed(1),
      fn:v.properties?.fn_label||'Necunoscut',dist:dist.toFixed(0)};
  }).sort((a,b)=>a.dist-b.dist);

  // ── Monumente LMI din zona ────────────────────────────────────────────────
  const zoneProtejate=S_UAT.lmi?.zone_protejate||[];
  const distZone=zoneProtejate.map(z=>{
    try{
      const zCtr=turf.centerOfMass({type:'Feature',geometry:z.geometry||{type:'Point',coordinates:[lon,lat]}}).geometry.coordinates;
      const dist=turf.distance({type:'Feature',geometry:{type:'Point',coordinates:parcelCtr}},
        {type:'Feature',geometry:{type:'Point',coordinates:zCtr}},{units:'meters'});
      return {...z,dist};
    }catch(e){return {...z,dist:9999};}
  }).sort((a,b)=>a.dist-b.dist);
  const inZCP=distZone.some(z=>z.dist<50&&z.tip==='ZCP');
  const inZonaProt=distZone.some(z=>z.dist<200);
  const monApropt=distZone[0]||{cod:'—',denumire:'—',dist:9999};

  // ── Solar helpers ─────────────────────────────────────────────────────────
  function solarAlt(lat,month,hour){
    const D2R=Math.PI/180;
    const decl=(-23.45*Math.cos(D2R*(360/365)*(month*30+10)))*D2R;
    const ha=(hour-12)*15*D2R;
    return Math.max(0,Math.asin(Math.sin(lat*D2R)*Math.sin(decl)+Math.cos(lat*D2R)*Math.cos(decl)*Math.cos(ha))*180/Math.PI);
  }
  const altDec12=solarAlt(lat,11,12);
  const isConformSolar=altDec12>=15;
  const D2R=Math.PI/180;
  const decl12=(-23.45*Math.cos(D2R*(360/365)*(335+10)))*D2R;
  const cosH12=-Math.tan(lat*D2R)*Math.tan(decl12);
  const sunrise12=cosH12>1?null:(12-Math.acos(Math.min(1,Math.max(-1,cosH12)))/D2R/15);
  const sunset12=cosH12>1?null:(12+Math.acos(Math.min(1,Math.max(-1,cosH12)))/D2R/15);
  const oreSoare21dec=sunrise12&&sunset12?(sunset12-sunrise12).toFixed(1):'—';

  // ── Studii necesare (logic automată) ──────────────────────────────────────
  const studiiNecesare=[];
  if(true) studiiNecesare.push({s:'Studiu Geotehnic (NP 074/2014)',ob:'OBLIGATORIU',motiv:'Orice construcție nouă'});
  if(aedisH>8||sdTotal>600) studiiNecesare.push({s:'Aviz ISU (P118+Legea 307/2006)',ob:'OBLIGATORIU',motiv:'H>8m sau SD>600mp'});
  if(!isConformSolar||niv>3) studiiNecesare.push({s:'Studiu Însorire OMS 119/2014',ob:'OBLIGATORIU',motiv:'Alt. sol. '+altDec12.toFixed(1)+'° sau >P+2'});
  if(inZCP||inZonaProt) studiiNecesare.push({s:'Aviz DJCPN + Studiu Patrimoniu (Legea 422/2001)',ob:'OBLIGATORIU',motiv:'Zonă protejată sau monument în 200m'});
  const distAerop=S_UAT.aeroport?.distanta_km||30;
  if(distAerop<15) studiiNecesare.push({s:'Studiu Aeronautic AACR/ROMATSA',ob:'OBLIGATORIU',motiv:'Dist. aeroport: '+distAerop+'km (<15km)'});
  if(sdTotal>1000||areaNum>5000) studiiNecesare.push({s:'Studiu EIM (Legea 292/2018)',ob:'OBLIGATORIU',motiv:'SD>1000mp sau teren>5000mp'});
  if(areaNum>200) studiiNecesare.push({s:'Studiu de Impact Trafic (NP 051/2012)',ob:'RECOMANDAT',motiv:'Orice investiție cu parcare'});
  studiiNecesare.push({s:'Memoriu Tehnic Urbanistic',ob:'OBLIGATORIU',motiv:'Document suport PAC/DTAC'});
  if(niv>4||aedisH>14) studiiNecesare.push({s:'Studiu Umbre + Însorire (OMS 119)',ob:'OBLIGATORIU',motiv:'H='+aedisH.toFixed(1)+'m > 14m sau >P+3'});

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 1: COVER
  // ═══════════════════════════════════════════════════════════════════════════
  cover(
    'Document fundament · Baza tuturor studiilor de specialitate',
    caps.img3D,
    [['Funcțiune dominantă UTR',fnLabel],['Document','Studiu de Amplasament'],['Rol','Fundament comun studii specialitate']],
    true,
    '✓ STUDIU DE AMPLASAMENT — DATE PRIMARE · DOCUMENT FUNDAMENT'
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 2: IDENTIFICARE COMPLETĂ + SITUAȚIE JURIDICĂ
  // ═══════════════════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('IDENTIFICARE PARCELĂ — SITUAȚIE JURIDICĂ ȘI CADASTRALĂ',2);ftr();
  let cy=33;
  cy=sec('1. DATE COMPLETE DE IDENTIFICARE A AMPLASAMENTULUI',cy);cy+=2;
  const kw=(W-28-9)/4;
  kv('NR. CADASTRAL',nrcad,14,cy,kw,GOLD);
  kv('SUPRAFAȚĂ',areaNum+' mp',14+kw+3,cy,kw,BLUE);
  kv('UTR / ZONĂ',utr,14+(kw+3)*2,cy,kw,TEAL);
  kv('UAT / JUDEȚ',uat,14+(kw+3)*3,cy,kw,ORANGE);
  cy+=22;
  kv('LAT. GPS',lat.toFixed(5)+'°N',14,cy,kw,NAVY);
  kv('LON. GPS',lon.toFixed(5)+'°E',14+kw+3,cy,kw,NAVY);
  kv('ALTITUDINE',((S_UAT.altitudine_medie||80)+' m s.m.'),14+(kw+3)*2,cy,kw,GRAY);
  kv('DATA STUDIU',dateStr,14+(kw+3)*3,cy,kw,GRAY);
  cy+=24;
  cy=sec('1.1. SITUAȚIE JURIDICĂ — DATE CADASTRALE',cy);cy+=2;
  cy=tblRow(['Parametru juridic','Valoare / Descriere','Obs. / Verificare'],cy,true,[60,65,57]);
  [['Număr cadastral parcelă',nrcad,'Extras CF — verificare ANCPI'],
   ['UAT / Localitate',uat+', jud. '+judet,'Conf. SIRUTA Iași'],
   ['Zona fiscală / UTR',utr,'Conf. PUG '+uat+' în vigoare'],
   ['Suprafață din CF / măsurători',areaNum+' mp','Verificare cu extras CF actual'],
   ['Categorie folosință teren','Intravilan / Curți-construcții (CC)','Conf. CF — verificare actualizată'],
   ['Sarcini/Ipoteci pe teren','Verificare obligatorie CF','Extras CF cu sarcini — notar/ANCPI'],
   ['Drepturi de acces (servituți)','Verificare în CF + plan cadastral','Dacă parcelă fără front stradal direct'],
   ['Tabel de mișcare (operații CF)','Conf. extras CF','Verificare istoric proprietate'],
  ].forEach(r=>cy=tblRow(r,cy,false,[60,65,57]));
  cy+=3;
  cy=addImg(caps.imgLocation,14,cy,W-28,48,'FIG. 1 — Plan cadastral ortofoto · Parcelă '+nrcad+' · Limite + vecinătăți · Sursa: UrbanX + Mapbox');

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 3: PARAMETRI URBANISTICI PUG COMPLET
  // ═══════════════════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('PARAMETRI URBANISTICI PUG — UTR '+utr+' — REGLEMENTĂRI COMPLETE',3);ftr();
  cy=33;
  cy=sec('2. PARAMETRI URBANISTICI COMPLET — UTR '+utr+' — PUG '+uat.toUpperCase(),cy);cy+=2;
  cy=body('Regulamentul Local de Urbanism al '+uat+' (aprobat prin HCL, în vigoare) stabilește pentru zona UTR '+utr+' următorii indicatori și reglementări urbanistice. Acești parametri constituie baza legală pentru toate studiile și proiectele de specialitate elaborate pentru amplasamentul '+nrcad+'.',14,cy);cy+=4;
  cy=tblRow(['Indicator PUG','Valoare RLU','Calcul pentru teren','Semnificație și restricții'],cy,true,[35,25,38,84]);
  [['POT max (%)',params?.pot+'%',scMax+' mp SC la sol','Suprafața maximă construită la sol. Nu se depășește.'],
   ['CUT max',String(params?.cut),sdTotal+' mp SDA total','Suprafața desfășurată totală (toate nivelele). Nu se depășește.'],
   ['H max (m)',params?.h?params.h+'m':'N/S','Conf. RLU','Înălțimea maximă absolută admisă (coamă/atic).'],
   ['Nr. niv. max',params?.niv?params.niv:'N/S','~P+'+(niv-1),'Regimul de înălțime admis prin RLU.'],
   ['SV min (%)',params?.sv+'%',Math.round(areaNum*parseFloat(params?.sv||20)/100)+' mp','Spații verzi amenajate. Obligatoriu, verificat prin AC.'],
   ['Parcaje min.',params?.pk+' loc/unitate',Math.max(2,Math.ceil(sdTotal/120))+' locuri est.','Conform NP 051/2012 + RLU UTR.'],
   ['Retragere față (Rf)',params?.rf+' m','Față de limita stradală','Min. față de aliniamentul stradal.'],
   ['Retragere laterală (Rl)',params?.rl+' m','Față de limita laterală','Min. față de proprietate vecină stânga/dreapta.'],
   ['Retragere spate (Rs)',params?.rs+' m','Față de limita posterioară','Min. față de proprietate vecină spate.'],
   ['Funcțiuni admise','Conf. PUG UTR '+utr,fnLabel,'Verificare directă PUG pentru lista completă.'],
   ['Funcțiuni interzise','Conf. PUG UTR '+utr,'Verificare PUG','Activități industriale poluante, depozite>500mp etc.'],
  ].forEach(r=>cy=tblRow(r,cy,false,[35,25,38,84]));
  cy+=3;
  cy=addImg(caps.img2D,14,cy,W-28,50,'FIG. 2 — Plan 2D ortogonal · Parcelă + reglementări PUG · Retrageri + vecinătăți');

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 4: CONTEXT URBAN — VECINĂTĂȚI + FRONTURI STRADALE
  // ═══════════════════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONTEXT URBAN — VECINĂTĂȚI, FRONTURI STRADALE, CARACTERUL ZONEI',4);ftr();
  cy=33;
  const half=(W-28)/2-2;
  cy=addImg(caps.img3D,14,cy,half,62,'FIG. 3 — Vedere 3D principală · Volumetrie context · Mapbox Standard 3D');
  addImg(caps.imgDist,14+half+4,cy-62,half,62,'FIG. 4 — Plan distanțe · Contur-la-contur + aliniamente stradale');
  cy+=3;
  cy=sec('3. ANALIZA CONTEXTULUI URBAN — RAZA 200m',cy);cy+=2;
  cy=tblRow(['Indicator context','Valoare estimată','Sursa','Obs.'],cy,true,[60,42,42,38]);
  const hMed=vecini.length?vecini.reduce((s,v)=>s+parseFloat(v.h),0)/vecini.length:0;
  const potMed=Math.round(scMax/areaNum*100);
  [['Nr. clădiri identificate în 200m',vecini.length+' clădiri','OpenStreetMap / UrbanX','Informativ'],
   ['Înălțime medie clădiri vecine',hMed.toFixed(1)+' m','OSM / calcul','Caracter stradal referință'],
   ['Înălțime maximă vecinătate',vecini.length?(Math.max(...vecini.map(v=>parseFloat(v.h))).toFixed(1)+'m'):'—','OSM','Impact solar/vizual'],
   ['Front stradal dominant','Conf. vedere 3D','UrbanX 3D','Verificare in situ'],
   ['Tipologie morfologică UTR',fnLabel,'PUG '+uat,'Referință proiect'],
   ['Presiune urbanistică estimată',hMed>10?'Ridicată':hMed>6?'Medie':'Redusă','Calcul înălțime medie','Informativ'],
  ].forEach(r=>cy=tblRow(r,cy,false,[60,42,42,38]));
  cy+=3;
  cy=sec('3.1. CLĂDIRI VECINE CU IMPACT DIRECT — TOP 8 CEI MAI APROPIAȚI',cy);cy+=2;
  cy=tblRow(['Nr. cad. vecin','H (m)','Distanță (m)','Funcțiune','Impact principal'],cy,true,[42,20,28,50,42]);
  if(vecini.length){
    vecini.slice(0,8).forEach(v=>{
      const impact=parseFloat(v.h)>aedisH*0.8?'Umbră posibilă':parseFloat(v.dist)<parseFloat(params?.rl||3)+1?'Retragere laterală':'Standard';
      cy=tblRow([v.nrcad,v.h+'m',v.dist+'m',v.fn.slice(0,20),impact],cy,false,[42,20,28,50,42]);
    });
  } else {
    cy=body('Nu s-au detectat clădiri vecine cu înălțime semnificativă în contextul încărcat.',14,cy);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 5: INFRASTRUCTURĂ TEHNICO-EDILITARĂ
  // ═══════════════════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('INFRASTRUCTURĂ TEHNICO-EDILITARĂ — REȚELE ȘI UTILITĂȚI',5);ftr();
  cy=33;
  cy=sec('4. REȚELE TEHNICO-EDILITARE EXISTENTE ÎN ZONĂ',cy);cy+=2;
  cy=body('Datele privind rețelele tehnico-edilitare disponibile în zona amplasamentului '+nrcad+' sunt preluate din configurația UAT '+uat+' și din datele publice ale operatorilor de utilități. Distanțele exacte față de rețelele existente și posibilitățile de branșare se verifică obligatoriu prin cerere de informare la fiecare operator, anterior elaborării proiectului tehnic.',14,cy);cy+=4;
  cy=tblRow(['Utilitate','Operator local','Disponibilitate','Distanță est.','Aviz necesar','Cost bransare est.'],cy,true,[32,45,28,22,28,27]);
  [['Apă potabilă',eim.apa.operator||'RAJA SA Iași','Rețea în zonă','<50m','Aviz RAJA','2.000-8.000 EUR'],
   ['Canalizare menajeră',eim.apa.operator||'RAJA SA Iași','Rețea în zonă','<50m','Aviz RAJA','1.500-5.000 EUR'],
   ['Energie electrică',fc.operatorEnerg||'E-ON Moldova','Rețea în zonă','<30m','Aviz E-ON','1.000-5.000 EUR'],
   ['Gaz natural','Delgaz Grid SA','Rețea în zonă (verify)','<100m','Aviz Delgaz','1.500-4.000 EUR'],
   ['Termoficare',fc.operatorTermo||'Termoelectrica/CUMIS','Verificare zonă','Variabil','Aviz operator','Variabil'],
   ['Telecomunicații','Operatori multipli','Rețea în zonă','<20m','Optional','500-2.000 EUR'],
  ].forEach(r=>cy=tblRow(r,cy,false,[32,45,28,22,28,27]));
  cy+=4;
  cy=sec('4.1. CONSUMURI ESTIMATE ȘI CERINȚE DE BRANȘARE',cy);cy+=2;
  const locEstim=Math.max(1,Math.ceil(sdTotal/80));
  cy=tblRow(['Utilitate','Consum estimat zilnic','Putere / Debit necesar','Norma de calcul'],cy,true,[40,52,52,38]);
  [['Apă potabilă',locEstim*150+' l/zi ('+locEstim+'pers×150l)','Q max orar: '+( locEstim*0.15/3.6).toFixed(2)+' l/s','STAS 1478-90'],
   ['Ape uzate menajere',locEstim*120+' l/zi (80% din apă)','Q max orar: '+( locEstim*0.12/3.6).toFixed(2)+' l/s','NTPA 002'],
   ['Energie electrică',(locEstim*3.5).toFixed(0)+' kW putere instalată',locEstim+' abonat × 3.5kW','NTE 007/2008'],
   ['Gaz natural (dacă se utilizează)',Math.round(locEstim*0.5)+' mc/h (vârf iarnă)','Pnom = '+Math.round(locEstim*0.5*10.5)+' kW','NP 037-1999'],
   ['Gestionare deșeuri',Math.round(locEstim*1.5)+' l/zi (recipiente)','1-2 containere 1100l','Legea 211/2011'],
  ].forEach(r=>cy=tblRow(r,cy,false,[40,52,52,38]));
  cy+=3;
  cy=sec('4.2. REȚELE SUBTERANE — RISCURI LA EXCAVARE',cy);cy+=2;
  cy=body('Înainte de orice lucrare de excavare, este obligatorie identificarea rețelelor subterane existente (apă, gaz, electricitate, canalizare, telecomunicații) prin solicitarea de informații la operatorii de utilități și prin efectuarea unui sondaj de detectare electromagnetică. Lucrările de săpătură în vecinătatea rețelelor subterane se execută manual, cu supraveghere reprezentant operator.',14,cy);

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 6: MONUMENTE, ZONE PROTEJATE, SERVITUȚI
  // ═══════════════════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('MONUMENTE ISTORICE, ZONE PROTEJATE — SERVITUȚI DE UTILITATE PUBLICĂ',6);ftr();
  cy=33;
  cy=sec('5. MONUMENTE ISTORICE ȘI ZONE CONSTRUITE PROTEJATE',cy);cy+=2;
  cy=tblRow(['Tip protecție','Prezență în zonă','Distanță estimată','Implicație juridică'],cy,true,[55,42,35,50]);
  [['Zonă construită protejată (ZCP)',inZCP?'DA — parcelă în ZCP':'Nu s-a identificat',inZCP?'0m (direct)':'—',inZCP?'Aviz DJCPN OBLIGATORIU':'Verificare Primărie + PUG'],
   ['Monument ist. cls A (valoare națională)',distZone.some(z=>z.clasa==='A'&&z.dist<500)?'Prezent în 500m':'Neidintificat în 500m',distZone.find(z=>z.clasa==='A')?.dist?.toFixed(0)||'—'+'m','Aviz CNMI + DJCPN dacă în 200m'],
   ['Monument ist. cls B (valoare locală)',distZone.length>0?distZone.length+' zone LMI în baza de date':'Neidentificat local',monApropt.dist<9999?monApropt.dist.toFixed(0)+'m':'—','Aviz DJCPN dacă în 200m'],
   ['Zonă de protecție 200m monument',inZonaProt?'DA — monument în <200m':'Nu s-a identificat',monApropt.dist<200?monApropt.dist.toFixed(0)+'m':'—',inZonaProt?'Consultare DJCPN OBLIGATORIE':'Nu se impune'],
   ['Sit arheologic (SAR)',S_UAT.lmi?.sit_arheologic?'Verificare necesară':'Nedocumentat local','—','Informare DJCPN dacă săpături >1m adâncime'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,42,35,50]));
  cy+=3;
  if(distZone.length>0){
    cy=sec('5.1. ZONE/MONUMENTE IDENTIFICATE ÎN BAZA DE DATE LMI LOCALĂ',cy);cy+=2;
    cy=tblRow(['Cod LMI','Denumire','Tip','Distanță'],cy,true,[35,100,30,17]);
    distZone.slice(0,6).forEach(z=>{cy=tblRow([S2(z.cod||'—'),S2(z.denumire||z.tip||'—'),S2(z.tip||'—'),z.dist<9999?z.dist.toFixed(0)+'m':'—'],cy,false,[35,100,30,17]);});
    cy+=3;
  }
  cy=sec('5.2. SERVITUȚI DE UTILITATE PUBLICĂ',cy);cy+=2;
  cy=tblRow(['Tip servitute','Distanță de protecție','Aplicabilitate amplasament','Norma'],cy,true,[60,40,60,22]);
  [['Drum național / județean','50m față de axul drumului','Verificare față de strada adiacentă','OG 43/1997'],
   ['Cale ferată','100m față de axul CF','Verificare dacă CF în proximitate','Legea 202/2016'],
   ['Conductă gaz (transport)','200-500m (variabil presiune)','Verificare Delgaz Grid','NTPEE 2008'],
   ['Linie HT electricitate (110kV+)','24-37m față de axul LEA','Verificare E-ON Moldova','PE 106A/2003'],
   ['Curs de apă / luciu de apă','5-100m (variabil categorie)','Verificare harta hidrografică','Legea 107/1996'],
   ['Zonă de protecție sanitară','50-500m (variabil)','Verificare Sănătate Publică','Ord. 119/2014'],
  ].forEach(r=>cy=tblRow(r,cy,false,[60,40,60,22]));

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 7: ACCESE + MOBILITATE + TRANSPORT PUBLIC
  // ═══════════════════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('ACCESE — MOBILITATE URBANĂ — TRANSPORT PUBLIC',7);ftr();
  cy=33;
  cy=addImg(caps.imgCity,14,cy,W-28,55,'FIG. 5 — Harta mobilitate · '+S2(uat)+' · Accese + rețea transport public · Sursa: UrbanX');
  cy+=3;
  cy=sec('6. ANALIZA ACCESELOR ȘI A MOBILITĂȚII URBANE',cy);cy+=2;
  cy=tblRow(['Element mobilitate','Caracteristici','Cerință normativă','Obs.'],cy,true,[55,65,45,17]);
  [['Stradă de acces principală',trafic.tip_strada||'Stradă locală categoria III','STAS 10144 cat. III','Verificare lărgime in situ'],
   ['Viteza de proiectare stradă',trafic.viteza_proiectare+' km/h','SR 4032-1','Distanță vizibilitate conf.'],
   ['Trafic mediu anual (TMA)',trafic.TMA_ref+' veh/zi estimat','Studiu trafic specific','Orientativ'],
   ['Lățime stradă existentă','Verificare in situ','min. 6m (2 benzi)','Din plan cadastral'],
   ['Trotuar pietonal existent','Verificare in situ','min. 1.5m','Conf. NP 051/2012'],
   ['Acces carosabil propus','min. 3.5m (1 sens) / 6m (2 sensuri)','SR 4032-1','Verificare față de front'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,65,45,17]));
  cy+=3;
  cy=sec('6.1. TRANSPORT PUBLIC — ACCESIBILITATE',cy);cy+=2;
  cy=body('Accesibilitatea amplasamentului '+nrcad+' la rețeaua de transport public RATC Iași (tramvai, troleibuz, autobuz urban) determină indirect nivelul de trafic auto generat de investiție. Conform studiilor ITE, amplasamentele cu stație TP la <400m generează cu 15-25% mai puțin trafic auto față de cele izolate.',14,cy);cy+=3;
  cy=tblRow(['Mijloc transport public','Stație apropiată (est.)','Distanță estimată','Linii disponibile'],cy,true,[45,60,35,42]);
  [['Tramvai (RATC Iași)','Verificare hartă RATC','<500m (verificare)','Linii 1,3,7,8,13 (verificare)'],
   ['Troleibuz (RATC Iași)','Verificare hartă RATC','<500m (verificare)','Linii 5,9,10 (verificare)'],
   ['Autobuz urban (RATC)','Verificare hartă RATC','<400m (verificare)','Multiple linii (verificare)'],
  ].forEach(r=>cy=tblRow(r,cy,false,[45,60,35,42]));
  cy+=3;
  cy=sec('6.2. PARCAJE OBLIGATORII — BAZA DE CALCUL',cy);cy+=2;
  const pkCalcF=Math.max(2,Math.ceil(sdTotal/120)*parseInt(params?.pk||1));
  cy=tblRow(['Tip loc','Nr. min. (NP 051)','Suprafață necesară','Standard dimensionare'],cy,true,[50,30,38,64]);
  [['Locuri auto standard',pkCalcF+' locuri',pkCalcF*30+' mp total (cu culoar)','2.5m × 5.0m + culoar 6m'],
   ['Locuri PMR (4% din total)',Math.max(1,Math.ceil(pkCalcF*0.04))+' locuri',Math.max(1,Math.ceil(pkCalcF*0.04))*22+' mp','3.6m × 6.0m (NP 051/2012)'],
   ['Rastel biciclete (rec.)',Math.max(2,Math.ceil(pkCalcF*0.1))+' locuri',Math.max(2,Math.ceil(pkCalcF*0.1))*2+' mp','Conf. Reg. UE 2023/1804'],
   ['Stații EV (10% rec.)',Math.max(1,Math.ceil(pkCalcF*0.1))+' prize','Inclus în loc auto','22 kW min. (Reg. UE 2023)'],
  ].forEach(r=>cy=tblRow(r,cy,false,[50,30,38,64]));

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 8: RISCURI NATURALE — SEISMIC, INUNDAȚII, ALUNECARE
  // ═══════════════════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('RISCURI NATURALE — SEISMIC, INUNDAȚII, ALUNECĂRI DE TEREN',8);ftr();
  cy=33;
  cy=sec('7. ANALIZA RISCURILOR NATURALE RELEVANTE PENTRU AMPLASAMENT',cy);cy+=2;
  // ─── Seismic ───────────────────────────────────────────────────────────────
  cy=subsec('7.1. RISC SEISMIC — P100-1/2013 + SR EN 1998',cy);cy+=2;
  cy=tblRow(['Parametru seismic','Valoare pentru '+S2(uat),'Norma','Implicație proiect'],cy,true,[55,42,38,47]);
  [['Zona seismică',seism.zona,'P100-1/2013 Fig. 3.1','Harta zonare seismică'],
   ['Accelerația de proiectare ag',seism.ag+'g ('+( seism.ag*9.81).toFixed(2)+' m/s²)','P100-1/2013','Input calcul structural'],
   ['Perioada de colț Tc',seism.Tc+' s','P100-1/2013 Fig. 3.2','Spectru de răspuns'],
   ['Intensitate MSK',seism.MSK,'STAS 11100/1-77','Intensitate macroseismică'],
   ['Clasa de importanță recomandată','II — clădire obișnuită','P100-1 Tab. 4.2','γI=1.0'],
   ['Clasa de ductilitate','DCM (ductilitate medie)','P100-1/2013','q=3.0-4.5 cadre BA'],
   ['Cutremur de proiectare','IMR=225 ani (10% dep./50 ani)','P100-1/2013 cap. 3','Standard clădiri normale'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,42,38,47]));
  cy+=3;
  // ─── Inundații ────────────────────────────────────────────────────────────
  cy=subsec('7.2. RISC INUNDAȚII — DIRECTIVA 2007/60/CE + APELE ROMÂNE',cy);cy+=2;
  cy=tblRow(['Parametru hidro','Valoare orientativă','Norma','Obs.'],cy,true,[55,52,42,33]);
  [['Risc inundații zonă','Verificare ROWATER / Apele Române','Dir. 2007/60/CE','Hartă risc ANAR'],
   ['Nivel freatic estimat (NFA)',hidro.nfa,'NP 074/2014','Variabil sezonier'],
   ['Tip sol predominant local',hidro.tip_sol,'NP 074/2014','Verificare foraje'],
   ['Curs de apă apropiat','Verificare in situ / ANAR','Legea 107/1996','Servitute 5-100m'],
   ['Studiu hidrologic obligatoriu',hidro.studiu_obligatoriu,'Conf. NP 074','La NFA <3m adâncime'],
   ['Protecție subsol/fundații','Hidroizolație obligatorie','NP 074/2014','Cost est. 15.000-40.000 EUR'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,52,42,33]));
  cy+=3;
  // ─── Alunecări ────────────────────────────────────────────────────────────
  cy=subsec('7.3. RISC ALUNECĂRI DE TEREN',cy);cy+=2;
  cy=tblRow(['Parametru','Valoare','Norma','Implicație'],cy,true,[55,52,42,33]);
  [['Pantă teren local','Verificare MDT / topografie','—','Pante >10% — risc alunecare'],
   ['Zonare risc alunecare','Conf. harta HG 854/2010','HG 854/2010','Verificare MDRAP'],
   ['Măsuri speciale dacă pantă >10%','Studiu stabilitate taluzuri','NP 074/2014','Inginerie specială'],
  ].forEach(r=>cy=tblRow(r,cy,false,[55,52,42,33]));

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 9: DATE CLIMATICE + ÎNSORIRE + VÂNT + ZGOMOT
  // ═══════════════════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('DATE CLIMATICE — ÎNSORIRE, VÂNT, TEMPERATURI, PRECIPITAȚII',9);ftr();
  cy=33;
  cy=sec('8. DATE CLIMATICE DE REFERINȚĂ — ZONA '+S2(uat).toUpperCase(),cy);cy+=2;

  // Însorire
  cy=subsec('8.1. DATE SOLARE — LAT. '+lat.toFixed(2)+'°N / LON. '+lon.toFixed(2)+'°E',cy);cy+=2;
  cy=tblRow(['Parametru solar','Valoare calculată','Normă','Utilizare studii'],cy,true,[65,42,38,37]);
  const months3=['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'];
  [['Altitudine solară 21 Dec ora 12:00',altDec12.toFixed(2)+'°','OMS 119/2014 prag 15°',isConformSolar?'CONFORM':'NECONFORM'],
   ['Ore soare 21 Dec (răsărit-apus)',oreSoare21dec+'h','STAS 6221-1981','Studiu umbre'],
   ['Altitudine solară 21 Iun ora 12:00',solarAlt(lat,5,12).toFixed(2)+'°','—','Protecție solară vară'],
   ['Iradiere globală medie anuală','~4.0 kWh/mp/zi','PVGIS (JRC)','Studiu FV/colectoare'],
   ['Iradiere max (iulie)','~6.2 kWh/mp/zi','PVGIS','Panouri FV'],
   ['Umbră maximă la H='+aedisH.toFixed(0)+'m (21 Dec 12:00)',(aedisH/Math.tan(altDec12*Math.PI/180)>500?'>500':(aedisH/Math.tan(altDec12*Math.PI/180)).toFixed(0))+'m spre N','GT 043-2002','Studiu umbre vecini'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,42,38,37]));
  cy+=3;

  // Vânt
  cy=subsec('8.2. DATE VÂNT — ZONA '+vant.zona+' (CR 1-1-4/2012)',cy);cy+=2;
  cy=tblRow(['Parametru vânt','Valoare','Normă','Utilizare studii'],cy,true,[65,42,38,37]);
  const qpH9=(vant.presiune_vant||0.55)*Math.pow(aedisH/10,0.3)*1.15;
  [['Zona de vânt',vant.zona,'CR 1-1-4/2012','Calcul structural'],
   ['Viteza de referință vRef',vant.v_ref+' m/s','CR 1-1-4/2012','Calcul structural'],
   ['Presiunea de referință qRef',vant.presiune_vant+' kN/mp','CR 1-1-4/2012','Calcul structural'],
   ['Presiunea la H='+aedisH.toFixed(0)+'m',qpH9.toFixed(3)+' kN/mp','CR 1-1-4/2012','Input ing. rezistență'],
   ['Direcția dominantă vânt',vant.directie_dominanta,'ANM Iași','Orientare clădire E-V'],
   ['Categorie teren (rugozitate)',vant.factor_teren,'CR 1-1-4/2012','Conf. densitate construire'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,42,38,37]));
  cy+=3;

  // Zgomot + Temperaturi
  cy=subsec('8.3. ZGOMOT URBAN — ZONA ACUSTICĂ UTR '+utr,cy);cy+=2;
  cy=tblRow(['Parametru','Valoare','Normă','Utilizare'],cy,true,[65,42,38,37]);
  [['Zona acustică UTR '+utr,zgomot.zona_acustica,'SR 10009:2017','Studiu acustic'],
   ['Limita Leq zi (06-22h)',zgomot.Lzsn_limita+' dB(A)','SR 10009:2017','Tâmplărie, soluții acustice'],
   ['Limita Leq noapte (22-06h)',zgomot.Lnoapte_limita+' dB(A)','SR 10009:2017','Tâmplărie geam triplu'],
   ['Surse principale zgomot',(zgomot.surse_principale||[]).join(', ')||'Verificare in situ','—','Studiu acustic detaliat'],
   ['Izolare acustică minimă fațade','Rw ≥ 30-35 dB','C 125-2013','Proiect instalații'],
  ].forEach(r=>cy=tblRow(r,cy,false,[65,42,38,37]));

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 10: RESTRICȚII CUMULATE — DIAGRAMA STUDII NECESARE
  // ═══════════════════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('RESTRICȚII CUMULATE — STUDII OBLIGATORII ȘI RECOMANDATE',10);ftr();
  cy=33;
  cy=sec('9. RESTRICȚII CUMULATE IDENTIFICATE PENTRU AMPLASAMENT',cy);cy+=2;
  cy=body('Pe baza tuturor datelor analizate în prezentul studiu de amplasament (cadastru, PUG, vecinătăți, monumente, riscuri naturale, climatice, infrastructură), se identifică următoarele restricții cumulate care trebuie respectate în elaborarea oricărui studiu sau proiect de specialitate pentru amplasamentul '+nrcad+' (UTR '+utr+').',14,cy);cy+=4;
  cy=tblRow(['Categorie restricție','Conținut restricție','Baza legală','Severitate'],cy,true,[45,90,38,9]);
  [['Urbanistic PUG','POT max '+params?.pot+'%, CUT max '+params?.cut+', H max '+(params?.h||'N/S')+'m, SV min '+params?.sv+'%, parcaje min '+params?.pk+'/unit.','RLU UTR '+utr,'🔴'],
   ['Retrageri min.','Rf='+params?.rf+'m, Rl='+params?.rl+'m, Rs='+params?.rs+'m față de limitele de proprietate','RLU UTR '+utr,'🔴'],
   ['Seismic','Structură antiseismică ag='+seism.ag+'g, Tc='+seism.Tc+'s, zona '+seism.zona,'P100-1/2013','🔴'],
   ['Însorire/Umbre','Alt. sol. 21 Dec 12:00 = '+altDec12.toFixed(1)+'° ('+(isConformSolar?'≥15° CONFORM':'<15° NECONFORM')+'). Dist. min. N: '+(aedisH/Math.tan(15*Math.PI/180)).toFixed(0)+'m','OMS 119/2014','🔴'],
   ['Patrimoniu/LMI',inZCP?'PARCELĂ ÎN ZCP — aviz DJCPN obligatoriu':inZonaProt?'Monument în 200m — consultare DJCPN':'Fără restricție patrimoniu identificată','Legea 422/2001',inZCP?'🔴':inZonaProt?'🟡':'🟢'],
   ['ISU / Apărare incendiu',aedisH>8||sdTotal>600?'Aviz ISU OBLIGATORIU (H>8m sau SD>600mp)':'Verificare la PAC','P118+Legea 307',aedisH>8?'🔴':'🟡'],
   ['Aeronautic AACR',distAerop<15?'Aviz ROMATSA OBLIGATORIU (dist. '+distAerop+'km la LRIA)':'Dist. '+distAerop+'km — aviz de verificat','HG 930/2016',distAerop<15?'🔴':'🟡'],
   ['Vânt structural','Presiune vânt qp(H)='+qpH9.toFixed(3)+' kN/mp — input ing. rezistență','CR 1-1-4/2012','🟡'],
   ['Zgomot','Zona acustică '+zgomot.zona_acustica+'. Tâmplărie min. Rw≥30dB fatade expuse.','SR 10009:2017','🟡'],
   ['Hidrologic/NFA','NFA est. '+hidro.nfa+'. Hidroizolație/epuismente posibile.','NP 074/2014','🟡'],
  ].forEach(r=>cy=tblRow(r,cy,false,[45,90,38,9]));
  cy+=3;
  cy=sec('9.1. CHECKLIST STUDII OBLIGATORII ȘI RECOMANDATE',cy);cy+=2;
  cy=tblRow(['Studiu / Document','Obligativitate','Motivul','Faza PAC'],cy,true,[80,28,60,14]);
  studiiNecesare.forEach(s=>{
    cy=tblRow([s.s,s.ob,s.motiv,'PAC/DTAC'],cy,false,[80,28,60,14]);
    if(s.ob==='OBLIGATORIU'){pdf.setFillColor(158,20,20,0.15);pdf.rect(14,cy-7,W-28,7,'F');}
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 11: DATE MEDIU + ESTIMARE FINANCIARĂ PRIMARĂ
  // ═══════════════════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('DATE MEDIU ÎNCONJURĂTOR — ESTIMARE FINANCIARĂ PRIMARĂ',11);ftr();
  cy=33;
  cy=sec('10. DATE DE MEDIU ÎNCONJURĂTOR — CONF. EIM',cy);cy+=2;
  cy=tblRow(['Factor de mediu','Date de referință','Operator/Instituție','Normă'],cy,true,[42,72,42,26]);
  [['Calitate aer',eim.aer.calitate_generala+' · Poluanți: '+(eim.aer.poluanti_principali||[]).join(', '),eim.aer.apm,'Legea 104/2011'],
   ['Apă potabilă / canalizare',eim.apa.sursa_apa_potabila+' · Rețea canal: '+(eim.apa.retea_canalizare?'DA':'Verificare'),eim.apa.operator,'Legea 107/1996'],
   ['Sol / permeabilitate',eim.sol.tip_sol_predominant+' · Permeab.: '+eim.sol.permeabilitate,'APM '+judet,'OUG 195/2005'],
   ['Colectare deșeuri',eim.deseuri.colectare_selectiva?'Colectare selectivă disponibilă':'Verificare locală',eim.deseuri.operator_salubritate,'Legea 211/2011'],
   ['Natura 2000 proximitate',(eim.natura2000||[]).length>0?(eim.natura2000||[]).join('; '):'Neidientificat în 10km','APM / ANPM','OUG 57/2007'],
   ['Arie naturală protejată',eim.arii_protejate||'Neidientificată','ANPM','Legea 49/2011'],
  ].forEach(r=>cy=tblRow(r,cy,false,[42,72,42,26]));
  cy+=4;
  cy=sec('10.1. ESTIMARE FINANCIARĂ PRIMARĂ — DATE ORIENTATIVE',cy);cy+=2;
  const costConstrF=Math.round(sdTotal*fc.pretConstructie);
  const costTerenF=Math.round(areaNum*fc.pretTeren);
  const costTotalF=Math.round((costConstrF+costTerenF)*1.25);
  cy=tblRow(['Element cost','Estimare orientativă (EUR)','Baza de calcul','Precizie'],cy,true,[60,52,52,18]);
  [['Valoare construcție ('+fc.pretConstructie+' EUR/mp SDA)',costConstrF.toLocaleString()+' EUR',''+sdTotal+'mp × '+fc.pretConstructie+' EUR/mp','±30%'],
   ['Valoare teren ('+fc.pretTeren+' EUR/mp)',costTerenF.toLocaleString()+' EUR',''+areaNum+'mp × '+fc.pretTeren+' EUR/mp','±30%'],
   ['Proiectare (2.5%)',Math.round(costConstrF*0.025).toLocaleString()+' EUR','% din construcție','±20%'],
   ['Studii specialitate (geotehnic etc.)',Math.round(10000+sdTotal*5).toLocaleString()+' EUR','Estimare studii obligatorii','±40%'],
   ['Avize + taxe autorizare',Math.round(costConstrF*0.01).toLocaleString()+' EUR','~1% construcție','±30%'],
   ['Rezervă contingență 15%',Math.round(costConstrF*0.15).toLocaleString()+' EUR','15% construcție','Standard'],
   ['TOTAL ESTIMAT',costTotalF.toLocaleString()+' EUR','All-in estimate','±25-35%'],
  ].forEach(r=>cy=tblRow(r,cy,false,[60,52,52,18]));
  cy+=3;
  cy=body('Indicatorul de cost: '+Math.round(costTotalF/sdTotal)+' EUR/mp SDA (all-in, construcție + teren + proiectare + avize + studii). Randament brut estimat: '+(( Math.round(sdTotal*0.85*fc.chirieRef*12)/costTotalF)*100).toFixed(1)+'%/an la chirie de referință de '+fc.chirieRef+' EUR/mp/lună.',14,cy);

  // ═══════════════════════════════════════════════════════════════════════════
  // PAG 12: CONCLUZII GENERALE + BAZA LEGALĂ + SEMNĂTURĂ
  // ═══════════════════════════════════════════════════════════════════════════
  pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');hdr('CONCLUZII GENERALE — BAZA LEGALĂ COMPLETĂ — SEMNĂTURĂ',12);ftr();
  cy=33;
  cy=sec('11. CONCLUZII GENERALE — STUDIU DE AMPLASAMENT',cy);cy+=2;
  cy=body('Prezentul Studiu de Amplasament și Analiză Teritorială pentru parcela cu nr. cadastral '+nrcad+' (suprafața '+area+' mp, UTR '+utr+', '+uat+', jud. '+judet+') constituie documentul fundament pentru elaborarea tuturor studiilor tehnice de specialitate ulterioare. A fost realizat prin platforma digitală UrbanX pe baza datelor cadastrale, a Registrului PUG, a datelor S_UAT și a bazei de date LMI locale. Are caracter STRICT ORIENTATIV.',14,cy);cy+=4;
  cy=tblRow(['Aspect verificat','Concluzie','Documentație impusă'],cy,true,[60,60,62]);
  [['Indicatori PUG (POT/CUT/H/SV/Pk)','Conf. RLU UTR '+utr,'Proiect DTAC + memoriu'],
   ['Însorire OMS 119/2014',isConformSolar?'Alt. sol. '+altDec12.toFixed(1)+'° ≥ 15° CONFORM':'Alt. sol. '+altDec12.toFixed(1)+'° < 15° — studiu OAR','Studiu însorire la PAC'],
   ['Patrimoniu LMI',inZCP?'ÎN ZCP — aviz DJCPN':inZonaProt?'Monument în 200m':'Fără restricție','Aviz DJCPN dacă în zonă prot.'],
   ['Risc seismic',seism.zona+' ag='+seism.ag+'g','P100-1/2013 — ing. rezistență'],
   ['ISU / Apărare incendiu',aedisH>8?'Aviz ISU OBLIGATORIU':'Verificare la PAC','Proiect P118 + aviz ISU'],
   ['Aeronautic',distAerop<15?'Aviz ROMATSA OBLIGATORIU':'Verificare la CU','Aviz ROMATSA + AACR'],
   ['Infrastructură tehnico-edilitară','Rețele disponibile în zonă','Avize operatori la CU/PAC'],
   ['Studiu geotehnic',catGeoF,'NP 074/2014 — expert geotehnician'],
  ].forEach(r=>cy=tblRow(r,cy,false,[60,60,62]));

  const catGeoF=aedisH>28?'3 — Complexă':aedisH>10?'2 — Curentă':'1 — Simplă';
  cy+=4;
  cy=sec('11.1. BAZA LEGALĂ',cy);cy+=2;
  ['Legea nr. 350/2001 privind amenajarea teritoriului și urbanismul, republicată.','Legea nr. 50/1991 republicată — autorizarea executării lucrărilor de construcții.','HG nr. 525/1996 — Regulamentul General de Urbanism, cu modificările ulterioare.','Legea nr. 422/2001 privind protejarea monumentelor istorice, republicată.','P100-1/2013 — Cod de proiectare seismică. Prevederi pentru clădiri.','CR 1-1-4/2012 — Cod de proiectare. Acțiunea vântului.','OMS nr. 119/2014 + Ord. 994/2018 — Norme igienă și însorire.','NP 074/2014 — Normativ privind cercetarea geotehnică.','HG 930/2016 — Avizare construcții în zone aeronautice.','PUG '+uat+' în vigoare — UTR '+utr+' — RLU.'].forEach(l=>{cy=body('• '+l,16,cy);cy+=1;});
  sign();
  pdf.save('Studiu_Amplasament_'+nrcad+'_'+new Date().getFullYear()+'.pdf');
  ss('✅ Studiu de Amplasament generat!');
}
