// UrbanX — Menus + viewer Urban3D + materiale

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

// Versiunea veche a generateSolarStudy — păstrată pentru referință
// Funcția activă este definită în 10-studies.js (versiune completă 8 pagini)
// Această versiune NU mai suprascrie cea din 10-studies.js
async function _generateSolarStudyLegacy(){
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ss('Selectați o parcelă pentru studiu.');return;}
  ss('Se generează Studiu de Însorire — se capturează imagini...');

  const d=_initStudyPdf('Pre-Studiu Urbanistic de Însorire','Studiu însorire OMS 119/2014',8);
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

  sign();

  pdf.save('Studiu_Insorire_'+nrcad+'_'+year+'.pdf');
  ss('✅ Studiu de Însorire generat! (8 pagini)');
}



// ═══════════════════════════════════════════════════════════════════════════
// AEDIS 3D VIEWER — Three.js, BufferGeometry corect
// ═══════════════════════════════════════════════════════════════════════════

// V3D moved to top

function aedisOpen3DViewer(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('⚠️ Selectați o parcelă mai întâi.'); return; }
  if(!S.vol._lastFeats?.length){
    ss('⚠️ Generați mai întâi volumul 3D (butonul ⚡).'); return;
  }

  // Ascundem topbar-ul principal și harta când viewer-ul e deschis
  const _tb = document.getElementById('topbar');
  if(_tb) _tb.classList.add('viewer-bg');
  const _mapDiv = document.getElementById('map');
  if(_mapDiv) _mapDiv.style.visibility = 'hidden';

  let ov = document.getElementById('aedis-3d-viewer-overlay');
  if(ov) ov.remove();
  ov = document.createElement('div');
  ov.id = 'aedis-3d-viewer-overlay';
  ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;background:#0a0e1a;display:flex;flex-direction:column;overflow:hidden;isolation:isolate';
  document.body.appendChild(ov);

  const niv = AEDIS.corpuri[0]?.niv||4;
  const hNiv = AEDIS.corpuri[0]?.hNiv||3.0;
  const fnDef = AEDIS_FN[AEDIS.fn]||AEDIS_FN.rezidential_colectiv;
  const stilDef = AEDIS_STIL[AEDIS.stil]||AEDIS_STIL.modern;
  const hTot = ((AEDIS.parterDiferit?(fnDef.hParter||4.5):hNiv)+(niv-1)*hNiv).toFixed(1);

  // ── Calculăm detaliile pentru legendă ────────────────────────────────────
  const etajRetras = Object.keys(AEDIS.retrageriFineEtaje||{}).length > 0
    || (AEDIS.activeRetragere && (AEDIS_STIL[AEDIS.stil]?.retragereFactor||1)<0.98);
  const etajRetrasNiv = AEDIS.activeRetragere ? niv : null;
  const parterLabel = AEDIS.parterDiferit
    ? (AEDIS_FN[AEDIS.fnParter]?.label||'Parter diferit')
    : null;
  const acoperisLabel = {
    terasa_plata:'Terasă plată', terasa_circulabila:'Terasă circulabilă',
    sarpanta:'Șarpantă', mansarda:'Mansardă', combinat:'Combinat'
  }[AEDIS.tipAcoperis]||'Terasă plată';
  const hP = AEDIS.parterDiferit ? (fnDef.hParter||4.5) : hNiv;
  const multiParc = S.parcels.length > 1 ? ` · ${S.parcels.length} parcele` : '';
  const formaLabel = {
    auto:'', patrat:'Formă pătrat', dreptunghi:'Formă dreptunghi',
    L:'Formă L', U:'Formă U', T:'Formă T', curte:'Curte interioară', bara:'Bară'
  }[AEDIS.forma||'auto'];
  const hasCortina = AEDIS.peretelCortina;

  // Construim textul de legendă: "Parter + 3 etaje + etaj retras"
  const etajStr = (() => {
    let parts = [];
    if(AEDIS.parterDiferit) parts.push('Parter ' + (AEDIS_FN[AEDIS.fnParter]?.label||''));
    else parts.push('Parter');
    const etajeNorm = niv - 1 - (etajRetras ? 1 : 0);
    if(etajeNorm > 0) parts.push(etajeNorm + (etajeNorm===1?' etaj':' etaje'));
    if(etajRetras) parts.push('+ etaj retras');
    return parts.join(' · ');
  })();

  ov.innerHTML = `
    <!-- TOPBAR VIEWER -->
    <div style="background:#07101e;border-bottom:1px solid rgba(139,92,246,.25);padding:7px 10px;display:flex;align-items:center;gap:6px;flex-shrink:0;flex-wrap:wrap;position:relative;z-index:2">
      <div style="font-size:12px;font-weight:800;color:#a78bfa;flex-shrink:0;display:flex;align-items:center;gap:5px">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="width:16px;height:16px"><defs><linearGradient id="vlbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e2c42"/><stop offset="1" stop-color="#070d16"/></linearGradient><linearGradient id="vlg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="0.5" stop-color="#d69e36"/><stop offset="1" stop-color="#9b641d"/></linearGradient></defs><rect width="1024" height="1024" rx="210" fill="url(#vlbg)"/><path d="M180 280h260l135 232-135 232H180l150-232z" fill="#f6f8fc"/><path d="M610 282h235L710 485H540z" fill="url(#vlg)"/><path d="M540 539h170l135 203H610z" fill="url(#vlg)"/></svg>
        Urban3D
      </div>
      <select id="v3d-light" onchange="_v3dLight(this.value)" style="background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,.12);border-radius:7px;padding:3px 7px;font-size:10px;flex-shrink:0">
        <option value="day">☀ Zi</option>
        <option value="golden">🌅 Golden</option>
        <option value="overcast">☁ Înnor.</option>
        <option value="night">🌙 Noapte</option>
      </select>
      <select id="v3d-ctx" onchange="_v3dCtxViz(this.value)" style="background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,.12);border-radius:7px;padding:3px 7px;font-size:10px;flex-shrink:0">
        <option value="show">Context</option>
        <option value="wire">Wireframe</option>
        <option value="hide">Ascunde</option>
      </select>
      <button onclick="_v3dResetCam()" title="Reset cameră" style="background:rgba(255,255,255,.05);color:#94a3b8;border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:3px 9px;font-size:11px;cursor:pointer;flex-shrink:0">⌂</button>
      <button onclick="V3D.rad=Math.max(V3D.rad*0.65,8);_v3dUpdateCam()" title="Zoom in" style="background:rgba(59,130,246,.1);color:#60a5fa;border:1px solid rgba(59,130,246,.2);border-radius:7px;padding:3px 9px;font-size:13px;cursor:pointer;flex-shrink:0">＋</button>
      <button onclick="V3D.rad=Math.min(V3D.rad*1.4,300);_v3dUpdateCam()" title="Zoom out" style="background:rgba(59,130,246,.1);color:#60a5fa;border:1px solid rgba(59,130,246,.2);border-radius:7px;padding:3px 9px;font-size:13px;cursor:pointer;flex-shrink:0">－</button>
      <button id="v3d-dist-btn" onclick="_v3dToggleDistances()" title="Toggle distanțe vecini" style="background:rgba(52,211,153,.1);color:#34d399;border:1px solid rgba(52,211,153,.3);border-radius:7px;padding:3px 9px;font-size:11px;cursor:pointer;flex-shrink:0">📏</button>
      <div style="flex:1"></div>
      <button onclick="document.getElementById('aedis-3d-viewer-overlay').remove();_v3dCleanup()" style="background:rgba(20,30,60,.9);color:#a78bfa;border:1px solid rgba(139,92,246,.4);border-radius:8px;padding:5px 14px;font-size:12px;font-weight:700;cursor:pointer;flex-shrink:0">✕ Închide</button>
    </div>

    <!-- CANVAS -->
    <canvas id="v3d-canvas" style="flex:1;display:block;cursor:grab;touch-action:none;min-height:0"></canvas>

    <!-- LEGENDĂ CONTEXTUALĂ — colț stânga jos -->
    <div id="v3d-legend" style="position:absolute;bottom:32px;left:12px;
      background:rgba(7,12,26,0.88);border:1px solid rgba(212,175,55,0.25);
      border-radius:10px;padding:10px 14px;pointer-events:none;
      backdrop-filter:blur(6px);max-width:260px;min-width:180px">

      <!-- Titlu funcțiune + stil -->
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
        <span style="font-size:15px">${fnDef.icon||'🏢'}</span>
        <div>
          <div style="font-size:12px;font-weight:800;color:#d4af37;letter-spacing:0.03em">${fnDef.label||'Clădire'}</div>
          <div style="font-size:9.5px;color:#64748b;letter-spacing:0.04em;text-transform:uppercase">${AEDIS_STIL[AEDIS.stil]?.label||'Modern'}</div>
        </div>
      </div>

      <!-- Separator -->
      <div style="height:1px;background:rgba(212,175,55,0.15);margin:6px 0"></div>

      <!-- Detalii volumetrice -->
      <div style="display:flex;flex-direction:column;gap:3px">
        <!-- Înălțime + regim -->
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:10px;color:#38bdf8;font-weight:700;min-width:40px">${hTot}m</span>
          <span style="font-size:10px;color:#94a3b8">${etajStr}</span>
        </div>

        <!-- Forma + cortina dacă e cazul -->
        ${formaLabel ? `<div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:9px;color:#64748b;min-width:40px">Formă</span>
          <span style="font-size:10px;color:#94a3b8">${formaLabel}</span>
        </div>` : ''}

        ${hasCortina ? `<div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:9px;color:#64748b;min-width:40px">Fațadă</span>
          <span style="font-size:10px;color:#60a5fa">Perete cortină ${AEDIS.cortinaProcent||60}%</span>
        </div>` : ''}

        <!-- Acoperiș -->
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:9px;color:#64748b;min-width:40px">Acoperiș</span>
          <span style="font-size:10px;color:#94a3b8">${acoperisLabel}</span>
        </div>

        <!-- Parcele multiple -->
        ${S.parcels.length>1 ? `<div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:9px;color:#64748b;min-width:40px">Parcele</span>
          <span style="font-size:10px;color:#4ade80">${S.parcels.length} parcele selectate</span>
        </div>` : ''}
      </div>

      <!-- Separator -->
      <div style="height:1px;background:rgba(212,175,55,0.15);margin:6px 0"></div>

      <!-- Indicatori cheie -->
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <div style="text-align:center">
          <div style="font-size:11px;font-weight:700;color:#d4af37">${niv}</div>
          <div style="font-size:8px;color:#475569;text-transform:uppercase">niveluri</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:11px;font-weight:700;color:#38bdf8">${hNiv}m</div>
          <div style="font-size:8px;color:#475569;text-transform:uppercase">H etaj</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:11px;font-weight:700;color:#4ade80">${S.parcels[S.activeParcel??0]?.area?.toFixed(0)||'—'}mp</div>
          <div style="font-size:8px;color:#475569;text-transform:uppercase">teren</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:11px;font-weight:700;color:#f472b6">${S.parcels[S.activeParcel??0]?.utr||'—'}</div>
          <div style="font-size:8px;color:#475569;text-transform:uppercase">UTR</div>
        </div>
      </div>
    </div>

    <!-- STATUS jos dreapta -->
    <div id="v3d-status" style="position:absolute;bottom:10px;right:12px;font-size:9px;color:#334155;pointer-events:none;text-align:right">Se inițializează…</div>
    <!-- Watermark UrbanX -->
    <div style="position:absolute;bottom:10px;left:12px;display:flex;align-items:center;gap:4px;pointer-events:none;opacity:0.4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="width:13px;height:13px"><defs><linearGradient id="vwm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e2c42"/><stop offset="1" stop-color="#070d16"/></linearGradient><linearGradient id="vwmg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="0.5" stop-color="#d69e36"/><stop offset="1" stop-color="#9b641d"/></linearGradient></defs><rect width="1024" height="1024" rx="210" fill="url(#vwm)"/><path d="M180 280h260l135 232-135 232H180l150-232z" fill="#f6f8fc"/><path d="M610 282h235L710 485H540z" fill="url(#vwmg)"/><path d="M540 539h170l135 203H610z" fill="url(#vwmg)"/></svg>
      <span style="font-size:9px;font-weight:700;color:#d4af37">UrbanX</span>
      <span style="font-size:7px;color:#334155">TSS·FG</span>
    </div>
  `;

  // Asigurăm că distanțele sunt calculate ÎNAINTE de a deschide viewer-ul
  // Dacă dist-src e gol, calculăm acum și așteptăm
  const distFeatsNow = map.getSource('dist-src')?._data?.features||[];
  if(!distFeatsNow.length && S.vol.genDone){
    // Calculăm sincron și așteptăm 300ms pentru populare
    updateDistanceLines();
    aedisLoadThree(()=>{ setTimeout(()=>_v3dBuild(ap), 400); });
  } else {
    aedisLoadThree(()=>{ setTimeout(()=>_v3dBuild(ap), 40); });
  }
}

// ── State ──────────────────────────────────────────────────────────────────

function _v3dCleanup(){
  if(V3D.af) cancelAnimationFrame(V3D.af);
  if(V3D.r){ V3D.r.dispose(); V3D.r=null; }
  Object.values(V3D.texCache).forEach(t=>{ try{t.dispose();}catch(e){} });
  V3D.texCache={}; V3D.scene=null; V3D.cam=null; V3D.ctx=[]; V3D.aedis=[]; V3D.distShown=false;
  // Restaurăm topbar-ul
  const _tb = document.getElementById('topbar');
  if(_tb) _tb.classList.remove('viewer-open');
  if(_tb) _tb.classList.remove('viewer-bg');
  // Restaurăm harta
  const _mapDiv = document.getElementById('map');
  if(_mapDiv) _mapDiv.style.visibility = 'visible';
  // Asigurăm că mob-nav e vizibil
  const _mn = document.getElementById('mob-nav');
  if(_mn) _mn.style.removeProperty('display');
  if(_mn) _mn.style.removeProperty('visibility');
}

function _v3dStatus(msg){ const el=document.getElementById('v3d-status'); if(el) el.textContent=msg; }

// ── Build scene ────────────────────────────────────────────────────────────
function _v3dBuild(ap){
  const THREE = window.THREE;
  const canvas = document.getElementById('v3d-canvas');
  if(!canvas||!THREE){ _v3dStatus('❌ Three.js indisponibil'); return; }
  if(typeof V3D === 'undefined'){ console.error('V3D not initialized'); return; }
  window._v3dNight = document.getElementById('v3d-light')?.value === 'night' || false;

  // ── Asigurăm context 3D înainte de build ─────────────────────────────────
  // Dacă S.ctx e gol (Overpass a eșuat) → extragem din Mapbox rendered tiles
  const _ctxCount = S.ctx?.features?.length || 0;
  if(_ctxCount < 3 && typeof _ctxFromMapbox === 'function'){
    try{
      const center = ap.geo.geometry.type === 'Polygon'
        ? ap.geo.geometry.coordinates[0].reduce(
            (acc,c,_,arr)=>([acc[0]+c[0]/arr.length, acc[1]+c[1]/arr.length]),
            [0,0])
        : ap.geo.geometry.coordinates[0][0].reduce(
            (acc,c,_,arr)=>([acc[0]+c[0]/arr.length, acc[1]+c[1]/arr.length]),
            [0,0]);
      const radius = Math.max(300, Number(S.vol.ctxR||350));
      const extracted = _ctxFromMapbox(center, radius);
      if(extracted?.length > _ctxCount){
        S.ctx = {type:'FeatureCollection', features: extracted};
        console.log(`[V3D] Context din Mapbox: ${extracted.length} clădiri (Overpass indisponibil)`);
      }
    }catch(e){ console.warn('[V3D] Fallback context error:', e.message); }
  }

  const W=canvas.offsetWidth, H=canvas.offsetHeight;

  // Renderer
  const r = new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  r.setSize(W,H); r.setPixelRatio(Math.min(devicePixelRatio,1.5)); // 1.5 max — Retina ok, fără suprasarcină GPU
  r.shadowMap.enabled=true; r.shadowMap.type=THREE.PCFShadowMap; // PCFSoft→PCF: ~30% mai rapid, vizual aproape identic
  r.toneMapping=THREE.ACESFilmicToneMapping; r.toneMappingExposure=1.65;
  V3D.r=r;

  // Scene
  const scene=new THREE.Scene();
  scene.background=new THREE.Color('#c8dff5');
  scene.fog=new THREE.FogExp2('#c8dff5',0.0008);
  V3D.scene=scene;

  // Camera
  const cam=new THREE.PerspectiveCamera(45,W/H,0.5,800);
  V3D.cam=cam;

  // Watermark UrbanX în viewer (overlay HTML deasupra canvas)
  (()=>{
    const wm=document.createElement('div');
    wm.style.cssText='position:absolute;bottom:8px;left:8px;display:flex;align-items:center;gap:4px;pointer-events:none;opacity:0.55;z-index:2';
    wm.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="width:16px;height:16px"><defs><linearGradient id="uwm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e2c42"/><stop offset="1" stop-color="#070d16"/></linearGradient><linearGradient id="uwmg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="0.5" stop-color="#d69e36"/><stop offset="1" stop-color="#9b641d"/></linearGradient></defs><rect width="1024" height="1024" rx="210" fill="url(#uwm)"/><path d="M180 280h260l135 232-135 232H180l150-232z" fill="#f6f8fc"/><path d="M610 282h235L710 485H540z" fill="url(#uwmg)"/><path d="M540 539h170l135 203H610z" fill="url(#uwmg)"/></svg><span style="font-size:10px;font-weight:700;color:#d4af37;letter-spacing:0.05em">UrbanX</span><span style="font-size:8px;color:#475569;letter-spacing:0.03em">TSS·FG</span>`;
    const container=document.getElementById('v3d-canvas')?.parentElement;
    if(container){ container.style.position='relative'; container.appendChild(wm); }
  })();

  // Watermark UrbanX în viewer (overlay HTML deasupra canvas)
  try{
    const _wmExist = document.getElementById('v3d-watermark');
    if(_wmExist) _wmExist.remove();
    const wm=document.createElement('div');
    wm.id='v3d-watermark';
    wm.style.cssText='position:absolute;bottom:10px;left:10px;display:flex;align-items:center;gap:5px;pointer-events:none;opacity:0.6;z-index:10';
    wm.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="width:18px;height:18px"><defs><linearGradient id="uwm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e2c42"/><stop offset="1" stop-color="#070d16"/></linearGradient><linearGradient id="uwmg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="0.5" stop-color="#d69e36"/><stop offset="1" stop-color="#9b641d"/></linearGradient></defs><rect width="1024" height="1024" rx="210" fill="url(#uwm)"/><path d="M180 280h260l135 232-135 232H180l150-232z" fill="#f6f8fc"/><path d="M610 282h235L710 485H540z" fill="url(#uwmg)"/><path d="M540 539h170l135 203H610z" fill="url(#uwmg)"/></svg><span style="font-size:11px;font-weight:800;color:#d4af37;letter-spacing:0.04em;text-shadow:0 1px 3px rgba(0,0,0,.5)">UrbanX</span><span style="font-size:8px;color:#94a3b8;letter-spacing:0.04em">TSS·FG</span>';
    const container=document.getElementById('v3d-canvas')?.parentElement;
    if(container){ container.style.position='relative'; container.appendChild(wm); }
  }catch(e){}

  // Lighting — zi
  _v3dApplyLight('day',THREE,scene,r);

  // Ground procesuală pavaj
  (()=>{
    const cv2=document.createElement('canvas'); cv2.width=256; cv2.height=256;
    const gctx=cv2.getContext('2d');
    gctx.fillStyle='#6a8a9a'; gctx.fillRect(0,0,256,256);
    gctx.strokeStyle='#556e7e'; gctx.lineWidth=1;
    [32,64,96,128,160,192,224].forEach(v=>{
      gctx.beginPath();gctx.moveTo(v,0);gctx.lineTo(v,256);gctx.stroke();
      gctx.beginPath();gctx.moveTo(0,v);gctx.lineTo(256,v);gctx.stroke();
    });
    for(let n=0;n<400;n++){
      gctx.fillStyle=`rgba(255,255,255,${Math.random()*0.03})`;
      gctx.fillRect(Math.random()*256,Math.random()*256,1.5,1.5);
    }
    const gTex=new THREE.CanvasTexture(cv2);
    gTex.wrapS=gTex.wrapT=THREE.RepeatWrapping; gTex.repeat.set(20,20);
    const gMat=new THREE.MeshStandardMaterial({map:gTex,roughness:0.90,metalness:0.02,envMapIntensity:0.2});
    const g=new THREE.Mesh(new THREE.PlaneGeometry(600,600),gMat);
    g.rotation.x=-Math.PI/2; g.position.y=-0.05; g.receiveShadow=true; scene.add(g);
  })();
  // Grid subtil
  const grid=new THREE.GridHelper(400,100,'#4a6a80','#3a5060');
  grid.material.opacity=0.35; grid.material.transparent=true;
  grid.position.y=0.01; scene.add(grid);

  // Coordonate locale
  const ring0 = ap.geo.geometry.type==='Polygon'
    ? ap.geo.geometry.coordinates[0]
    : ap.geo.geometry.coordinates[0][0];
  const cx=ring0.reduce((s,c)=>s+c[0],0)/ring0.length;
  const cy2=ring0.reduce((s,c)=>s+c[1],0)/ring0.length;
  const mLng=111320*Math.cos(cy2*Math.PI/180), mLat=111320;
  const toLoc=([lng,lat])=>[(lng-cx)*mLng,(lat-cy2)*mLat];

  // ── Zone colorate: parcelă, edificabil, retrageri, SV, parcaje ──────────
  // IMPORTANT: _v3dAddZones trebuie apelat DUPĂ definirea lui toLoc
  _v3dAddZones(THREE, scene, toLoc, ap);
  // Legendă
  setTimeout(_v3dAddLegend, 300);

  // ── Context buildings ────────────────────────────────────────────────────
  const _isDemo = S.vol.scenariuConstructie === 'liber';
  const _parcelFeat = _isDemo ? {type:'Feature', geometry: ap.geo.geometry, properties:{}} : null;
  (S.ctx?.features||[]).forEach(f=>{
    if(!f.geometry) return;
    // Dacă suntem în scenariul Demolare, excludem clădirile de pe parcelă
    if(_isDemo && _parcelFeat){
      try{
        const overlap = turf.intersect(_parcelFeat, {type:'Feature',geometry:f.geometry,properties:{}});
        if(overlap && turf.area(overlap) > 5) return; // clădire pe parcelă — skip
      }catch(e){}
    }
    const h=Math.max(2,f.properties?.h||6);
    const fn=f.properties?.fn||'yes';
    const colMap={residential:'#b0c8e0',apartments:'#a0bcd4',house:'#c0d0e4',commercial:'#e8a84a',retail:'#f0b040',office:'#5090d0',public:'#7080c8',industrial:'#8890a0',warehouse:'#808898',hotel:'#c090d0',school:'#88c898','yes':'#90a8c0'};
    const col=colMap[fn]||'#8898b0';
    const isNight2=window._v3dNight||false;
    try{
      const fring=f.geometry.type==='Polygon'?f.geometry.coordinates[0]:f.geometry.coordinates[0][0];
      const pts=fring.slice(0,-1).map(toLoc);
      if(pts.length<3) return;
      const mat=new THREE.MeshStandardMaterial({color:col,roughness:0.75,metalness:0.05,
        emissive:isNight2?new THREE.Color(0.02,0.04,0.10):new THREE.Color(0,0,0),
        emissiveIntensity:isNight2?0.5:0});
      const mesh=_v3dPrism(THREE,pts,0,h,mat);
      if(mesh){ mesh.castShadow=true; mesh.receiveShadow=true; scene.add(mesh); V3D.ctx.push(mesh); }
    }catch(e){}
  });

  // ── AEDIS volume ─────────────────────────────────────────────────────────
  const stilKey=AEDIS.stil||'modern';
  const _fnKey=AEDIS.fn||'rezidential_colectiv';
  // Invalidăm cache-ul de materiale la fiecare rebuild (stil/funcțiune pot fi schimbate)
  V3D.texCache={};
  (S.vol._lastFeats||[]).forEach(f=>{
    if(!f.geometry||f.properties?.isExistent) return;
    const base=f.properties?.base||0;
    const top=f.properties?.top||3;
    const floor=f.properties?.floor??0;
    // Culoarea din COLS[stilKey] curent, NU din f.properties.color (care poate fi veche)
    const COLS_V={
      modern:         {etaj:'#c8dff8',parter:'#0d2040'},
      inovator:       {etaj:'#a0a8f0',parter:'#0c1035'},
      clasic:         {etaj:'#f0d8a0',parter:'#5c3010'},
      minimalist:     {etaj:'#f4f8fc',parter:'#d0dcea'},
      industrial:     {etaj:'#c09870',parter:'#1e1008'},
      adaptat_context:{etaj:'#c8e0b8',parter:'#1c3014'},
    };
    // Lotizare: fiecare tip poate avea stil propriu (f.properties.stil)
    const fStilKey = f.properties?.stil || stilKey;
    const cv=COLS_V[fStilKey]||COLS_V[stilKey]||COLS_V.modern;
    const col = floor===0 ? cv.parter : (f.properties?.color||cv.etaj);
    const h=top-base; if(h<=0.01) return;
    try{
      // Detectăm geometria — inclusiv polygoane cu gaură (curte interioară)
      const coords = f.geometry.type==='Polygon'
        ? f.geometry.coordinates
        : f.geometry.coordinates[0];
      const fring = coords[0];
      const holeCoords = coords.length > 1 ? coords[1] : null; // inner ring = curtea
      const pts=fring.slice(0,-1).map(toLoc);
      const holePts = holeCoords ? holeCoords.slice(0,-1).map(toLoc) : null;
      if(pts.length<3) return;
      const roofType = f.properties?.roofType || '';
      const isRoofSlab = floor < 0 && (
        roofType==='terasa_plata' || roofType==='terasa' || roofType==='combinat'
      );
      const isMansarda = floor <= -10 && (roofType==='mansarda' || roofType==='sarpanta_mica');
      const isSarpanta = floor < 0 && (roofType==='sarpanta' || roofType==='sarpanta_mica');
      const isPenthouse2 = floor < 0 && (roofType==='penthouse' || roofType==='penthouse_terasa');
      const isRoofSpire = floor < 0 && !isRoofSlab && !isMansarda && !isSarpanta && !isPenthouse2;
      if(isRoofSpire) return;
      if(h < 0.05 && !isRoofSlab && !isMansarda && !isSarpanta && !isPenthouse2) return;
      if(pts.length < 3) return;
      const isTop = !!f.properties?.isLast;
      let mat;
      if(isRoofSlab){
        mat = new THREE.MeshLambertMaterial({color:'#c8d0d8'});
      } else if(isPenthouse2){
        mat = _v3dMatPenthouse(THREE,fStilKey,V3D.texCache);
      } else if(isMansarda || isSarpanta){
        const roofCols={modern:'#2a3a50',clasic:'#7c3512',minimalist:'#c8d0d8',inovator:'#2a1a60',industrial:'#3a2818',adaptat_context:'#4a6030',contemporary:'#1a4020',deconstructivist:'#2a0a40'};
        mat = new THREE.MeshStandardMaterial({color:new THREE.Color(roofCols[fStilKey]||'#5a4030'),roughness:0.80,metalness:0.05});
      } else if(floor===0){ mat=_v3dMatParter(THREE,fStilKey,V3D.texCache); }
      else if(isTop){ mat=_v3dMatPenthouse(THREE,fStilKey,V3D.texCache); }
      else{ mat=_v3dMatFloor(THREE,col,floor,fStilKey,V3D.texCache); }
      if(!mat){ return; }
      // Pasăm hole-ul (curtea) la _v3dPrism pentru geometrie inelară
      const mesh=_v3dPrism(THREE,pts,base,top,mat,holePts);
      if(mesh){
        mesh.castShadow=true; mesh.receiveShadow=true; scene.add(mesh); V3D.aedis.push(mesh);
        // Contur muchii
        if(mesh.isGroup){
          mesh.children.forEach(c=>{ if(c.isMesh) _v3dAddEdges(THREE,c,scene,'#ffffff',0.18); });
        } else {
          _v3dAddEdges(THREE, mesh, scene, '#ffffff', 0.18);
        }
        // Ferestre pe fațada exterioară
        if(floor >= 0 && h > 1.5){
          // Lotizare: perete cortina si stil din proprietatile featurului
          const _wOpts = {
            forceCurtain: !!f.properties?.pereteleCortina,
            parterComercial: !!f.properties?.parterComercial,
          };
          _v3dAddWindows(THREE, pts, base, top, scene, fStilKey, _wOpts);
          if(holePts && holePts.length >= 3){
            _v3dAddWindows(THREE, holePts, base, top, scene, fStilKey, _wOpts);
          }
        }
        if(isRoofSlab && h >= 0.3){
          _v3dAddRoofDetails(THREE, pts, base, top, scene, fStilKey);
        }
      }
    }catch(e){ console.warn('AEDIS mesh:',e.message); }
  });

  // ── Render special lotizare (gazebo, bbq, biserici etc.) ────────────────
  // Apelat INDIFERENT daca viewer era deschis la generare sau nu
  try{
    const _specialTips=['gazebo','garaj','bbq','bucvara','bortodoxa','bcatolica'];
    const _hasSpecial=(S.vol._lastFeats||[]).some(f=>f.properties?.isLotizare&&_specialTips.includes(f.properties?.lotTip));
    if(_hasSpecial && typeof _lotRenderSpecial==='function'){
      const _rendered=new Set();
      (S.vol._lastFeats||[]).forEach(f=>{
        if(!f.properties?.isLotizare) return;
        const tip=f.properties?.lotTip;
        if(!_specialTips.includes(tip)) return;
        if(f.properties?.floor!==0) return; // doar parterul ca referinta de pozitie
        const uid=tip+'_'+f.properties?.parcelIdx;
        if(_rendered.has(uid)) return;
        _rendered.add(uid);
        _lotRenderSpecial(THREE,scene,f.geometry,tip,toLoc);
      });
    }
  }catch(e){ console.warn('lotRenderSpecial hook:',e.message); }

  // Parcelă contur
  try{
    const pts=ring0.map(toLoc);
    const verts=new Float32Array(pts.flatMap(([x,z])=>[x,0.2,z]));
    const lg=new THREE.BufferGeometry(); lg.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
    scene.add(new THREE.LineLoop(lg,new THREE.LineBasicMaterial({color:'#00e5b4',opacity:0.7,transparent:true})));
  }catch(e){}

  // Marcaj parcelă pe sol (suprafață luminoasă sub clădire)
  try{
    const pts=ring0.map(toLoc);
    const shape=new THREE.Shape(); shape.moveTo(pts[0][0],pts[0][1]);
    pts.slice(1,-1).forEach(([x,z])=>shape.lineTo(x,z)); shape.closePath();
    const geo=new THREE.ShapeGeometry(shape);
    const mat=new THREE.MeshStandardMaterial({color:'#1a2535',roughness:0.97,metalness:0,transparent:true,opacity:0.85,side:THREE.DoubleSide});
    const m2=new THREE.Mesh(geo,mat); m2.rotation.x=-Math.PI/2; m2.position.y=0.03; scene.add(m2);

    // Curtea interioară: marcaj verde deschis pe sol dacă există
    if(AEDIS.forma==='curte'){
      const pFeat=(S.vol._lastFeats||[]).find(f=>f.geometry?.coordinates?.length>1&&!f.properties?.isExistent);
      if(pFeat?.geometry?.coordinates?.[1]){
        const innerRing=pFeat.geometry.coordinates[1];
        const innerPts=innerRing.slice(0,-1).map(toLoc);
        const innerShape=new THREE.Shape();
        innerShape.moveTo(innerPts[0][0],innerPts[0][1]);
        innerPts.slice(1).forEach(([x,z])=>innerShape.lineTo(x,z));
        innerShape.closePath();
        const innerGeo=new THREE.ShapeGeometry(innerShape);
        const innerMat=new THREE.MeshStandardMaterial({color:'#1a3a2a',roughness:0.90,metalness:0,transparent:true,opacity:0.7,side:THREE.DoubleSide});
        const courtMesh=new THREE.Mesh(innerGeo,innerMat);
        courtMesh.rotation.x=-Math.PI/2; courtMesh.position.y=0.05; scene.add(courtMesh);
      }
    }
  }catch(e){}

  // Lotizare geometry (loturi, drum, circulații, verde, parcare)
  _v3dAddLotizareGeometry(THREE, scene, toLoc);

  // Străzi din S.ctx linii (dacă există) sau grid simplu în jurul parcelei
  _v3dAddStreets(THREE, scene, ring0, toLoc);
  // Adăugăm viață urbană (oameni, mașini, câini, biciclete etc.)
  const _isNightMode = window._v3dNight || document.getElementById('v3d-light')?.value === 'night';
  _v3dAddUrbanLife(THREE, scene, ring0, toLoc, _isNightMode);
  // Distanțele sunt afișate în harta Mapbox, NU în viewer 3D (simplitate vizuală)

  // Camera poziție inițială
  const maxH=Math.max(...(S.vol._lastFeats||[]).map(f=>f.properties?.top||0),8);
  const parcelSz=Math.max(...ring0.map(([lng,lat])=>{const[x,z]=toLoc([lng,lat]);return Math.sqrt(x*x+z*z);}),10);
  V3D.rad=Math.max(parcelSz*2.5,maxH*2.2,35);
  if(!V3D.tx) V3D.tx = new THREE.Vector3(0, maxH*0.4, 0);
  else V3D.tx.set(0, maxH*0.4, 0);
  if(!V3D.tx) V3D.tx=new THREE.Vector3(0,maxH*0.4,0);
  else V3D.tx.set(0,maxH*0.4,0);
  _v3dUpdateCam();

  // Controls
  _v3dControls(canvas,cam);

  // Resize
  const obs=new ResizeObserver(()=>{
    if(!V3D.r) return;
    const w=canvas.offsetWidth,h=canvas.offsetHeight;
    V3D.r.setSize(w,h); V3D.cam.aspect=w/h; V3D.cam.updateProjectionMatrix();
  });
  obs.observe(canvas); V3D._obs=obs;

  // Render loop — always-render (dirty flag cauza black screen la build async)
  // Performanța e asigurată de reducerea PointLights (-66%) și pixelRatio 1.5
  const render=()=>{ V3D.af=requestAnimationFrame(render); if(V3D.r&&V3D.scene&&V3D.cam) V3D.r.render(V3D.scene,V3D.cam); };
  render(); // pornește loop-ul RAF
  // Marchează dirty la orice interacțiune cu canvas (orbit, zoom, drag)
  const _markDirty=()=>{ V3D._dirty=4; };
  canvas.addEventListener('pointerdown',_markDirty,{passive:true});
  canvas.addEventListener('wheel',_markDirty,{passive:true});
  canvas.addEventListener('touchstart',_markDirty,{passive:true});

  _v3dStatus(`✅ ${V3D.aedis.length} volume AEDIS · ${V3D.ctx.length} clădiri context · Drag=rotire Scroll=zoom`);
}


// ═══════════════════════════════════════════════════════════════════════════
// _v3dCaptureSilent — construieste scena Three.js pe canvas OFFSCREEN invizibil
// Captureaza 7 preseturi diferite, returneaza {day,night,golden,overcast,front,topdown,nightAlt}
// NU afecteaza UI-ul, NU deschide overlay-ul viewer
// ═══════════════════════════════════════════════════════════════════════════
function _v3dCaptureSilent(ap){
  return new Promise((resolve)=>{
    if(!ap?.geo?.geometry||!S.vol._lastFeats?.length){ resolve({}); return; }
    if(!window.THREE){ resolve({}); return; }
    const THREE=window.THREE;
    const W2=1200,H2=750;
    const canvas=document.createElement('canvas');
    canvas.width=W2; canvas.height=H2;
    canvas.style.cssText='position:fixed;top:-9999px;left:-9999px;opacity:0;pointer-events:none';
    document.body.appendChild(canvas);

    try{
      const r=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,preserveDrawingBuffer:true});
      r.setSize(W2,H2); r.setPixelRatio(1);
      r.shadowMap.enabled=true; r.shadowMap.type=THREE.PCFSoftShadowMap;
      r.toneMapping=THREE.ReinhardToneMapping; r.toneMappingExposure=1.0; // Reinhard: fara dithering pe culori flat (lotizare galben)

      const scene=new THREE.Scene();
      scene.background=new THREE.Color('#c8d8e8');
      scene.fog=new THREE.FogExp2('#c8d8e8',0.003);
      const cam=new THREE.PerspectiveCamera(45,W2/H2,0.5,800);

      // Ground
      const gGeo=new THREE.PlaneGeometry(600,600);
      const gMat=new THREE.MeshStandardMaterial({color:'#111827',roughness:0.97,metalness:0});
      const g=new THREE.Mesh(gGeo,gMat); g.rotation.x=-Math.PI/2; g.position.y=-0.05;
      g.receiveShadow=true; scene.add(g);
      const grid=new THREE.GridHelper(400,80,'#90a8b8','#a0b8c8');
      grid.material.opacity=0.35; grid.material.transparent=true; scene.add(grid);

      // Coordonate locale
      const ring0=ap.geo.geometry.type==='Polygon'
        ?ap.geo.geometry.coordinates[0]:ap.geo.geometry.coordinates[0][0];
      const cx=ring0.reduce((s,c)=>s+c[0],0)/ring0.length;
      const cy2=ring0.reduce((s,c)=>s+c[1],0)/ring0.length;
      const mLng=111320*Math.cos(cy2*Math.PI/180), mLat=111320;
      const toLoc=([lng,lat])=>[(lng-cx)*mLng,(lat-cy2)*mLat];

      // Fallback context din Mapbox dacă Overpass a eșuat
      if(!(S.ctx?.features?.length >= 3) && typeof _ctxFromMapbox === 'function'){
        try{
          const extracted = _ctxFromMapbox([cx, cy2], 350);
          if(extracted?.length) S.ctx = {type:'FeatureCollection', features:extracted};
        }catch(e){}
      }

      // Clădiri context
      const tmpCache={};
      (S.ctx?.features||[]).forEach(f=>{
        if(!f.geometry) return;
        const h=Math.max(2,f.properties?.h||6);
        try{
          const ring=f.geometry.type==='Polygon'?f.geometry.coordinates[0]:f.geometry.coordinates[0][0];
          const pts=ring.slice(0,-1).map(toLoc);
          if(pts.length<3) return;
          const mat=new THREE.MeshStandardMaterial({color:'#8898b0',roughness:0.85,metalness:0.02});
          const mesh=_v3dPrism(THREE,pts,0,h,mat);
          if(mesh){ mesh.castShadow=true; mesh.receiveShadow=true; scene.add(mesh); }
        }catch(e){}
      });

      // Volume AEDIS
      const stilKey=AEDIS.stil||'modern';
      S.vol._lastFeats.forEach(f=>{
        if(f.properties?.isExistent||!f.geometry) return;
        const base=f.properties?.base||0, top=f.properties?.top||3;
        const floor=f.properties?.floor??0; const h=top-base; if(h<=0.05) return;
        const col=f.properties?.color||'#3b82f6';
        const isRoofSlab=floor<0&&['terasa_plata','terasa','combinat'].includes(f.properties?.roofType);
        if(floor<0&&!isRoofSlab) return;
        try{
          const ring=f.geometry.type==='Polygon'?f.geometry.coordinates[0]:f.geometry.coordinates[0][0];
          const pts=ring.slice(0,-1).map(toLoc); if(pts.length<3) return;
          let mat;
          if(isRoofSlab) mat=new THREE.MeshLambertMaterial({color:'#c8d0d8'});
          else if(floor===0) mat=_v3dMatParter(THREE,stilKey,tmpCache);
          else mat=_v3dMatFloor(THREE,col,floor,stilKey,tmpCache);
          if(!mat) return;
          const mesh=_v3dPrism(THREE,pts,base,top,mat);
          if(mesh){ mesh.castShadow=true; mesh.receiveShadow=true; scene.add(mesh);
            _v3dAddEdges(THREE,mesh,scene,'#ffffff',0.18);
            if(floor>=0&&h>1.5) _v3dAddWindows(THREE,pts,base,top,scene,stilKey);
          }
        }catch(e){}
      });

      // Contur parcelă
      try{
        const pts=ring0.map(toLoc);
        const verts=new Float32Array(pts.flatMap(([x,z])=>[x,0.2,z]));
        const lg=new THREE.BufferGeometry(); lg.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
        scene.add(new THREE.LineLoop(lg,new THREE.LineBasicMaterial({color:'#00e5b4',opacity:0.7,transparent:true})));
      }catch(e){}

      // Camera setup
      const maxH=Math.max(...(S.vol._lastFeats||[]).map(f=>f.properties?.top||0),8);
      const parcelSz=Math.max(...ring0.map(c=>{const[x,z]=toLoc(c);return Math.sqrt(x*x+z*z);}),10);
      // Rază apropiată: clădirea umple cadrul indiferent de zoom-ul hărții
      // day/golden/overcast: 1.6x parcela (era 2.5x) — impact vizual maxim
      // night: și mai aproape (1.3x) — fațadele luminate ocupă tot cadrul
      // Rază adaptivă per dimensiunea parcelei
      const sizeFactor = parcelSz > 80 ? 2.0 : parcelSz > 40 ? 1.8 : 1.5;
      const radDay  =Math.max(parcelSz*sizeFactor, maxH*2.2, 25);
      // Noapte: raza mai mică decât zi pentru a vedea fațadele luminate
      // dar nu mai mică de maxH*1.8 ca să nu intrăm în clădire
      const radNight=Math.max(parcelSz*(sizeFactor*0.65), maxH*1.8, 20);
      const tx=new THREE.Vector3(0,maxH*0.35,0);

      const setCam=(theta,phi,customRad)=>{
        const r2=customRad||radDay;
        const x=r2*Math.sin(phi)*Math.sin(theta);
        const y=r2*Math.cos(phi);
        const z=r2*Math.sin(phi)*Math.cos(theta);
        cam.position.set(tx.x+x,tx.y+y,tx.z+z);
        cam.lookAt(tx); cam.aspect=W2/H2; cam.updateProjectionMatrix();
      };

      const doCapture=(preset,theta,phi,customRad)=>{
        _v3dApplyLight(preset,THREE,scene,r);
        setCam(theta,phi,customRad);
        r.render(scene,cam); r.render(scene,cam);
        try{ return canvas.toDataURL('image/jpeg',0.92); }catch(e){ return ''; }
      };

      // 7 preseturi — unghiuri optimizate pentru impact vizual consistent
      // phi mic = unghi jos (perspectivă dramatică, ca în viewer manual)
      const day      =doCapture('day',     Math.PI/4,   Math.PI/3.5,  radDay);
      // Noapte: unghi mai jos (PI/4.5) și orientare frontală (PI/5) — fațadele domină cadrul
      const night    =doCapture('night',   Math.PI/5,   Math.PI/4.5,  radNight);
      const golden   =doCapture('golden',  Math.PI*1.1, Math.PI/3.8,  radDay);
      const overcast =doCapture('overcast',Math.PI/4,   Math.PI/3.2,  radDay);
      const front    =doCapture('day',     Math.PI,     Math.PI/3.2,  radDay);
      const topdown  =doCapture('day',     Math.PI/4,   0.18,         radDay);
      const nightAlt =doCapture('night',   -Math.PI/3,  Math.PI/3.5,  radNight);

      r.dispose();
      canvas.remove();
      resolve({day,night,golden,overcast,front,topdown,nightAlt});
    }catch(e){
      console.warn('_v3dCaptureSilent:',e.message);
      try{canvas.remove();}catch(_){}
      resolve({});
    }
  });
}


// ── Linii de distanță față de vecini în viewer 3D ────────────────────────────
function _v3dAddDistanceLines(THREE, scene, toLoc){
  try{
    const distFeats = map.getSource('dist-src')?._data?.features;
    if(!distFeats?.length){
      console.log('_v3dAddDistanceLines: dist-src gol, se recalculeaza...');
      updateDistanceLines();
      setTimeout(()=>{
        const feats2 = map.getSource('dist-src')?._data?.features;
        if(feats2?.length && V3D.scene && V3D.r && V3D.cam){
          _v3dAddDistanceLines(THREE, V3D.scene, toLoc);
          V3D.r.render(V3D.scene, V3D.cam);
        }
      }, 500);
      return;
    }

    const minDist = S.vol.multiVolDist || 6;
    let count = 0;

    distFeats.forEach(f=>{
      if(f.geometry?.type !== 'LineString') return;
      const coords = f.geometry.coordinates;
      if(coords.length < 2) return;

      const dist  = f.properties?.dist ?? 0;
      const label = f.properties?.label || dist.toFixed(1)+'m';
      const type  = f.properties?.type || 'to_neighbor';
      const ok    = dist >= minDist;

      // ── Culori clare, distincte per tip ──────────────────────────────
      // between_own  = galben-auriu  (distanță între volumele proprii)
      // to_neighbor  = verde aprins (ok) / roșu aprins (prea aproape)
      const col     = type==='between_own' ? '#f59e0b' : ok ? '#22c55e' : '#ef4444';
      const colBg   = type==='between_own' ? 'rgba(40,24,0,0.95)'
                    : ok                   ? 'rgba(0,40,18,0.95)'
                    :                        'rgba(50,0,0,0.95)';
      const colBrd  = type==='between_own' ? '#fbbf24' : ok ? '#4ade80' : '#f87171';
      const icon    = type==='between_own' ? '↔' : ok ? '✓' : '⚠';

      try{
        const pts3D = coords.map(c=>toLoc(c));
        if(pts3D.some(p=>!p||isNaN(p[0])||isNaN(p[1]))) return;

        const yLine = 0.5;

        // ── Linie principală — mai groasă, dashed-look via segmente ──────
        const positions = new Float32Array(pts3D.flatMap(([x,z])=>[x, yLine, z]));
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const mat = new THREE.LineBasicMaterial({
          color: new THREE.Color(col),
          linewidth: 4,
          transparent: true,
          opacity: 0.95,
          depthTest: false,
          depthWrite: false
        });
        const line = new THREE.Line(geo, mat);
        line.renderOrder = 999;
        line.onBeforeRender = (renderer)=>{ renderer.clearDepth(); };
        scene.add(line);

        // ── Sfere mari la capete ──────────────────────────────────────────
        [pts3D[0], pts3D[pts3D.length-1]].forEach(([x,z])=>{
          const sg = new THREE.SphereGeometry(0.30, 8, 8);
          const sm = new THREE.MeshBasicMaterial({
            color: new THREE.Color(col),
            depthTest: false, depthWrite: false
          });
          const sp = new THREE.Mesh(sg, sm);
          sp.position.set(x, yLine, z);
          sp.renderOrder = 1000;
          sp.onBeforeRender = (r2)=>{ r2.clearDepth(); };
          scene.add(sp);
        });

        // ── Etichetă MARE, clară ─────────────────────────────────────────
        const midIdx = Math.floor(pts3D.length / 2);
        const [mx, mz] = pts3D[midIdx];

        const cv = document.createElement('canvas');
        cv.width = 220; cv.height = 64;
        const ctx2 = cv.getContext('2d');

        // Fundal rotunjit cu border colorat
        ctx2.shadowColor = 'rgba(0,0,0,0.7)';
        ctx2.shadowBlur = 8;
        ctx2.fillStyle = colBg;
        if(ctx2.roundRect){
          ctx2.beginPath(); ctx2.roundRect(3, 3, 214, 58, 14); ctx2.fill();
        } else {
          ctx2.fillRect(3, 3, 214, 58);
        }
        // Border colorat
        ctx2.shadowBlur = 0;
        ctx2.strokeStyle = colBrd;
        ctx2.lineWidth = 3;
        if(ctx2.roundRect){
          ctx2.beginPath(); ctx2.roundRect(3, 3, 214, 58, 14); ctx2.stroke();
        } else {
          ctx2.strokeRect(3, 3, 214, 58);
        }

        // Icon stânga
        ctx2.font = 'bold 26px Arial,sans-serif';
        ctx2.fillStyle = colBrd;
        ctx2.textAlign = 'center';
        ctx2.textBaseline = 'middle';
        ctx2.fillText(icon, 26, 32);

        // Separator vertical
        ctx2.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx2.lineWidth = 1;
        ctx2.beginPath(); ctx2.moveTo(48, 10); ctx2.lineTo(48, 54); ctx2.stroke();

        // Valoare distanță — mare și clară
        ctx2.fillStyle = '#ffffff';
        ctx2.font = 'bold 28px Arial,sans-serif';
        ctx2.textAlign = 'center';
        ctx2.shadowColor = 'rgba(0,0,0,0.9)';
        ctx2.shadowBlur = 4;
        ctx2.fillText(label, 135, 24);

        // Sub-label tip
        ctx2.fillStyle = colBrd;
        ctx2.font = 'bold 14px Arial,sans-serif';
        ctx2.shadowBlur = 2;
        const subLabel = type === 'between_own' ? 'între volume' : ok ? 'conformă' : 'sub minim!';
        ctx2.fillText(subLabel, 135, 48);

        const tex = new THREE.CanvasTexture(cv);
        const spMat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          depthTest: false,
          sizeAttenuation: true
        });
        const sp2 = new THREE.Sprite(spMat);
        // Scale MARE — labelele se văd clar
        sp2.scale.set(9.0, 2.6, 1);
        sp2.position.set(mx, yLine + 2.0, mz);
        sp2.renderOrder = 1001;
        scene.add(sp2);
        count++;
      }catch(e2){ console.warn('dist line error:', e2.message); }
    });

    console.log(`_v3dAddDistanceLines: ${count}/${distFeats.length} linii randate in viewer 3D`);
  }catch(e){ console.warn('_v3dAddDistanceLines:', e.message); }
}

// ── Zone colorate în viewer 3D (retrageri, edificabil, SV, parcaje) ─────────
function _v3dAddZones(THREE, scene, toLoc, ap){
  try{
    // Helper: mesh plan colorat dintr-un polygon
    function makeZoneMesh(ringCoords, color, opacity, yPos){
      try{
        const pts = ringCoords.map(c=>toLoc(c));
        if(pts.length < 3) return null;
        const shape = new THREE.Shape();
        shape.moveTo(pts[0][0], pts[0][1]);
        for(let i=1;i<pts.length;i++) shape.lineTo(pts[i][0], pts[i][1]);
        shape.closePath();
        const geo = new THREE.ShapeGeometry(shape);
        const pos = geo.attributes.position;
        for(let i=0;i<pos.count;i++){
          const x=pos.getX(i), y=pos.getY(i);
          pos.setXYZ(i, x, yPos||0.02, -y);
        }
        pos.needsUpdate=true; geo.computeVertexNormals();
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          transparent: true, opacity: opacity||0.25,
          depthWrite: false, side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.renderOrder = 10;
        return mesh;
      }catch(e){ return null; }
    }

    // ── Helper: contur GROS ca ribbon de mesh-uri ─────────────────────────
    // linewidth în WebGL e mereu 1px — simulăm linie groasă cu quads
    function makeThickOutline(ringCoords, color, yBase, halfW, heightH){
      try{
        const pts = ringCoords.map(c=>toLoc(c));
        const n = pts.length;
        const group = new THREE.Group();
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          transparent: true, opacity: 0.95,
          depthTest: false, depthWrite: false,
          side: THREE.DoubleSide
        });

        for(let i=0;i<n-1;i++){
          const [x1,z1] = pts[i];
          const [x2,z2] = pts[i+1];
          const dx=x2-x1, dz=z2-z1;
          const len = Math.sqrt(dx*dx+dz*dz);
          if(len < 0.01) continue;
          const nx=-dz/len, nz=dx/len; // normal perpendicular

          // Quad plan orizontal (ribbon la sol)
          const verts = new Float32Array([
            x1-nx*halfW, yBase,     z1-nz*halfW,
            x1+nx*halfW, yBase,     z1+nz*halfW,
            x2+nx*halfW, yBase,     z2+nz*halfW,
            x2-nx*halfW, yBase,     z2-nz*halfW,
          ]);
          const idx = new Uint16Array([0,1,2, 0,2,3]);
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.Float32BufferAttribute(verts,3));
          geo.setIndex(new THREE.BufferAttribute(idx,1));
          geo.computeVertexNormals();
          const m = new THREE.Mesh(geo, mat);
          m.renderOrder = 50;
          group.add(m);

          // Perete vertical pe contur (H = heightH m)
          if(heightH > 0){
            const vv = new Float32Array([
              x1-nx*halfW*0.3, yBase,       z1-nz*halfW*0.3,
              x1-nx*halfW*0.3, yBase+heightH, z1-nz*halfW*0.3,
              x2-nx*halfW*0.3, yBase+heightH, z2-nz*halfW*0.3,
              x2-nx*halfW*0.3, yBase,       z2-nz*halfW*0.3,
            ]);
            const gi = new THREE.BufferGeometry();
            gi.setAttribute('position', new THREE.Float32BufferAttribute(vv,3));
            gi.setIndex(new THREE.BufferAttribute(new Uint16Array([0,1,2,0,2,3]),1));
            gi.computeVertexNormals();
            const mi = new THREE.Mesh(gi, mat);
            mi.renderOrder = 50;
            group.add(mi);
          }
        }
        return group;
      }catch(e){ return null; }
    }

    // ── Helper: pilon la colț ─────────────────────────────────────────────
    function makeCornerPole(x, z, color, h, r){
      try{
        const geo = new THREE.CylinderGeometry(r||0.25, r||0.25, h||3.5, 6);
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          depthTest: false, depthWrite: false
        });
        const m = new THREE.Mesh(geo, mat);
        m.position.set(x, (h||3.5)/2, z);
        m.renderOrder = 60;
        return m;
      }catch(e){ return null; }
    }

    // ── Helper: linie simplă (pentru retrageri/zone secundare) ────────────
    function makeSimpleLine(ringCoords, color, yPos){
      try{
        const pts = ringCoords.map(c=>toLoc(c));
        const positions = new Float32Array(pts.flatMap(([x,z])=>[x, yPos||0.08, z]));
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const mat = new THREE.LineBasicMaterial({
          color: new THREE.Color(color),
          transparent: true, opacity: 0.85,
          depthTest: false, depthWrite: false
        });
        const line = new THREE.LineLoop(geo, mat);
        line.renderOrder = 20;
        return line;
      }catch(e){ return null; }
    }

    // ── 1. PARCELĂ — contur auriu GROS + piloni la colțuri ───────────────
    // Parcela: nu mai desenăm conturul în viewer — încurcă vizualizarea
    // Forma parcelei e vizibilă din retrageri + edificabil

    // ── 2. EDIFICABIL — contur violet fără fill ───────────────────────────
    try{
      const edFeats = map.getSource('edificabil-src')?._data?.features||[];
      edFeats.forEach(f=>{
        if(!f.geometry) return;
        const rings = f.geometry.type==='Polygon'
          ? [f.geometry.coordinates[0]]
          : f.geometry.coordinates.map(p=>p[0]);
        rings.forEach(ring=>{
          // Fără fill — doar contur ribbon subțire
          const outline = makeThickOutline(ring, '#a78bfa', 0.03, 0.15, 0.10);
          if(outline) scene.add(outline);
        });
      });
    }catch(e){}

    // ── 3. RETRAGERI — linii simple colorate ─────────────────────────────
    try{
      const setbackFeats = map.getSource('setback-src')?._data?.features||[];
      setbackFeats.forEach(f=>{
        if(!f.geometry) return;
        const col = f.properties?.color||'#ef4444';
        const rings = f.geometry.type==='Polygon'
          ? [f.geometry.coordinates[0]]
          : f.geometry.coordinates.map(p=>p[0]);
        rings.forEach(ring=>{
          // Fără fill — doar linie
          const outline = makeSimpleLine(ring, col, 0.10);
          if(outline) scene.add(outline);
        });
      });
    }catch(e){}

    // ── 4. SPAȚII VERZI — fără fill ────────────────────────────────────────
    // (fill-urile acoperă clădirile din cauza depthTest)

    // ── 5. PARCAJE — fără fill ────────────────────────────────────────────

  }catch(e){ console.warn('_v3dAddZones:', e.message); }
}

// ── Legendă viewer 3D ─────────────────────────────────────────────────────
function _v3dAddLegend(){
  try{
    const existing = document.getElementById('v3d-legend');
    if(existing) existing.remove();

    // ── Date bilanț — surse directe ─────────────────────────────────────
    const ap     = S?.parcels?.[S?.activeParcel??0];
    const utr    = ap?.utr || AEDIS?.utr || '—';
    // Suprafata teren — din parcelă activă sau multiselect
    const totalArea = S?.parcels?.reduce((s,p)=>s+(p.area||0), 0) || ap?.area || 0;
    const area   = totalArea > 0 ? Math.round(totalArea).toLocaleString() : '—';

    // Parametri RLU — cauta in mai multe surse
    const params = ap?.params || getDefaultParams?.(utr) || {};
    const potVal = parseFloat(params.POT||params.pot||params.Pot||AEDIS?.pot||35);
    const cutVal = parseFloat(params.CUT||params.cut||params.Cut||AEDIS?.cut||1.0);
    const svVal  = parseFloat(params.SV||params.sv||params.Sv||20);
    const hMax   = params.H||params.h||params.Hmax||AEDIS?.hMax||'—';

    // Suprafețe calculate — din volumele generate sau estimat
    const volFeats = S?.vol?._lastFeats||[];
    const aedisH   = volFeats.reduce((m,f)=>Math.max(m,f.properties?.top||0),0) || 0;
    // SC reală din amprenta (etaj 0 = parter)
    let scReal = 0;
    try{
      volFeats.filter(f=>f.properties?.floor===0 && !f.properties?.isExistent).forEach(f=>{
        try{ scReal += turf.area({type:'Feature',geometry:f.geometry,properties:{}}); }catch(e){}
      });
    }catch(e){}
    // SD reală (suma tuturor etajelor pozitive)
    let sdReal = 0;
    try{
      volFeats.filter(f=>(f.properties?.floor>=0) && !f.properties?.isExistent && !(f.properties?.floor<0)).forEach(f=>{
        try{ sdReal += turf.area({type:'Feature',geometry:f.geometry,properties:{}}); }catch(e){}
      });
    }catch(e){}

    const scShow = scReal > 0 ? Math.round(scReal).toLocaleString()
                 : totalArea > 0 ? Math.round(totalArea*potVal/100).toLocaleString() : '—';
    const sdShow = sdReal > 0 ? Math.round(sdReal).toLocaleString()
                 : totalArea > 0 ? Math.round(totalArea*cutVal).toLocaleString() : '—';
    const svShow = totalArea > 0 ? Math.round(totalArea*svVal/100).toLocaleString() : '—';
    const pkMin  = sdReal > 0 ? Math.max(2, Math.ceil(sdReal/80))
                 : totalArea > 0 ? Math.max(2, Math.ceil(totalArea*cutVal/80)) : '—';
    const hShow  = aedisH > 0 ? aedisH.toFixed(1)+'m' : (hMax !== '—' ? hMax+'m' : '—');
    const minDist = S?.vol?.multiVolDist || 6;

    const legend = document.createElement('div');
    legend.id = 'v3d-legend';
    const _legMinimized = window._v3dLegendMin || false;
    legend.style.cssText = `
      position:absolute; bottom:36px; left:10px; z-index:50;
      background:rgba(5,12,25,0.95); border:1px solid rgba(212,175,55,.35);
      border-radius:10px; padding:8px 13px; font-size:10px;
      color:#e2e8f0; pointer-events:all; backdrop-filter:blur(14px);
      min-width:${_legMinimized?'120':'180'}px; box-shadow:0 4px 24px rgba(0,0,0,.65);
      cursor:pointer; user-select:none;
    `;
    legend.title = 'Click pentru minimizare/expandare';
    legend.onclick = () => {
      window._v3dLegendMin = !window._v3dLegendMin;
      _v3dAddLegend();
    };
    legend.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:${_legMinimized?'0':'6px'};${_legMinimized?'':'border-bottom:1px solid rgba(212,175,55,.25);padding-bottom:5px'}">
        <span style="font-size:9px;color:#d4af37;text-transform:uppercase;letter-spacing:.08em;font-weight:700">
          📐 Bilanț · UTR <span style="color:#fbbf24">${utr}</span>
        </span>
        <span style="color:#64748b;font-size:14px;margin-left:8px;line-height:1">${_legMinimized?'＋':'－'}</span>
      </div>
      ${_legMinimized ? '' : `
      <div style="display:grid;grid-template-columns:auto auto;gap:2px 10px;margin-bottom:9px">
        <span style="color:#64748b">Teren (ST)</span>
        <span style="color:#fbbf24;font-weight:700;text-align:right">${area} mp</span>
        <span style="color:#64748b">SC · POT ${potVal}%</span>
        <span style="color:#e2e8f0;text-align:right">${scShow} mp</span>
        <span style="color:#64748b">SD · CUT ${cutVal}</span>
        <span style="color:#e2e8f0;text-align:right">${sdShow} mp</span>
        <span style="color:#64748b">H propus</span>
        <span style="color:#38bdf8;font-weight:700;text-align:right">${hShow}</span>
        <span style="color:#64748b">SV min ${svVal}%</span>
        <span style="color:#4ade80;text-align:right">${svShow} mp</span>
        <span style="color:#64748b">Parcaje min</span>
        <span style="color:#a78bfa;text-align:right">${pkMin} loc.</span>
      </div>
      <div style="font-size:9px;color:#334155;text-transform:uppercase;letter-spacing:.06em;font-weight:600;margin-bottom:4px;border-top:1px solid rgba(255,255,255,.06);padding-top:5px">Distanțe</div>
      <div style="display:flex;flex-direction:column;gap:2px">
        <div style="display:flex;align-items:center;gap:5px"><span style="color:#22c55e;font-size:12px;width:12px">✓</span><span style="color:#22c55e;font-size:9px">Conformă (≥${minDist}m)</span></div>
        <div style="display:flex;align-items:center;gap:5px"><span style="color:#ef4444;font-size:12px;width:12px">⚠</span><span style="color:#ef4444;font-size:9px">Sub minim (${minDist}m)</span></div>
        <div style="display:flex;align-items:center;gap:5px"><span style="color:#f59e0b;font-size:12px;width:12px">↔</span><span style="color:#f59e0b;font-size:9px">Între volume proprii</span></div>
      </div>
      `}
    `;
    const container = document.getElementById('v3d-canvas')?.parentElement;
    if(container) container.appendChild(legend);
  }catch(e){ console.warn('_v3dAddLegend:', e.message); }
}


// ── Refresh distanțe în viewer 3D ──────────────────────────────────────────
// Șterge liniile de distanță din scenă (renderOrder >= 999)
function _v3dClearDistLines(){
  if(!V3D.scene) return;
  const toRemove=[];
  V3D.scene.children.forEach(obj=>{ if(obj.renderOrder>=999) toRemove.push(obj); });
  toRemove.forEach(obj=>V3D.scene.remove(obj));
}

// Toggle distanțe: afișează dacă ascunse, ascunde dacă afișate
function _v3dToggleDistances(){
  if(!V3D.scene||!V3D.r||!V3D.cam){ ss('⚠️ Viewer 3D nu e activ.'); return; }

  const btn = document.getElementById('v3d-dist-btn');

  if(V3D.distShown){
    // ASCUNDE: eliminăm liniile din scenă
    _v3dClearDistLines();
    V3D.distShown = false;
    if(btn){
      btn.style.background = 'rgba(52,211,153,.1)';
      btn.style.borderColor = 'rgba(52,211,153,.3)';
      btn.style.color = '#34d399';
      btn.textContent = '📏 Distanțe';
    }
    V3D.r.render(V3D.scene, V3D.cam);
    ss('📏 Distanțe ascunse');
    return;
  }

  // AFIȘEAZĂ: calculăm și adăugăm liniile
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry) return;

  updateDistanceLines();

  setTimeout(()=>{
    _v3dClearDistLines();

    const ring0=ap.geo.geometry.type==='Polygon'
      ?ap.geo.geometry.coordinates[0]:ap.geo.geometry.coordinates[0][0];
    const cx=ring0.reduce((s,c)=>s+c[0],0)/ring0.length;
    const cy2=ring0.reduce((s,c)=>s+c[1],0)/ring0.length;
    const mLng=111320*Math.cos(cy2*Math.PI/180),mLat=111320;
    const toLoc=([lng,lat])=>[(lng-cx)*mLng,(lat-cy2)*mLat];

    _v3dAddDistanceLines(window.THREE, V3D.scene, toLoc);
    V3D.r.render(V3D.scene, V3D.cam);
    V3D.distShown = true;

    if(btn){
      btn.style.background = 'rgba(52,211,153,.25)';
      btn.style.borderColor = 'rgba(52,211,153,.8)';
      btn.style.color = '#fff';
      btn.innerHTML = '📏 Distanțe ✓';
    }

    const n=map.getSource('dist-src')?._data?.features?.length||0;
    ss('📏 Distanțe afișate în viewer 3D: '+n+' linii');
  }, 400);
}

// Alias pentru compatibilitate
function _v3dRefreshDistances(){ _v3dToggleDistances(); }


// ── Generare vizuală străzi în jurul parcelei ─────────────────────────────────
// ═══ LOTIZARE 3D ══════════════════════════════════════════════════════════
// Randează în viewer: loturi, drum, circulații, spații verzi estimate
// Citește din sursele Mapbox populate de 08-lotizare.js

function _v3dAddLotizareGeometry(THREE, scene, toLoc){

  // ── Verde% estimat per tip lot ─────────────────────────────────────────
  const SV_PCT = {individuala:.30, insiruita:.12, duplex:.22, bloc:.20};
  // Parcare: lățime strip (m) per tip
  const PK_W   = {individuala:2.5, insiruita:0,   duplex:2.5, bloc:5.0};

  // ── Materiale ──────────────────────────────────────────────────────────
  function _matAsfalt(){
    const cv=document.createElement('canvas'); cv.width=128; cv.height=256;
    const ctx=cv.getContext('2d');
    ctx.fillStyle='#3a4a5a'; ctx.fillRect(0,0,128,256);
    for(let i=0;i<600;i++){ctx.fillStyle=`rgba(0,0,0,${Math.random()*.10})`;ctx.fillRect(Math.random()*128,Math.random()*256,1.5,1.5);}
    // Linie mediană galbenă punctată
    ctx.strokeStyle='#c8a020'; ctx.lineWidth=2; ctx.setLineDash([18,12]);
    ctx.beginPath(); ctx.moveTo(64,0); ctx.lineTo(64,256); ctx.stroke();
    // Borduri albe
    ctx.strokeStyle='rgba(255,255,255,.2)'; ctx.lineWidth=2; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(5,0); ctx.lineTo(5,256); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(123,0); ctx.lineTo(123,256); ctx.stroke();
    const t=new THREE.CanvasTexture(cv);
    t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(1,3);
    return new THREE.MeshStandardMaterial({map:t,roughness:.88,metalness:.04});
  }
  function _matVerde(){
    const cv=document.createElement('canvas'); cv.width=64; cv.height=64;
    const ctx=cv.getContext('2d');
    ctx.fillStyle='#1c4d2e'; ctx.fillRect(0,0,64,64);
    for(let i=0;i<280;i++){const g=50+Math.random()*55;ctx.fillStyle=`rgba(10,${g|0},20,.32)`;ctx.fillRect(Math.random()*64,Math.random()*64,2,3);}
    ctx.strokeStyle='rgba(60,180,70,.25)'; ctx.lineWidth=1;
    for(let i=0;i<10;i++){const x=Math.random()*64,y=Math.random()*64;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.random()*4-2,y-6);ctx.stroke();}
    const t=new THREE.CanvasTexture(cv);
    t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(3,3);
    return new THREE.MeshStandardMaterial({map:t,roughness:.96,metalness:0});
  }
  function _matParcare(){
    const cv=document.createElement('canvas'); cv.width=128; cv.height=128;
    const ctx=cv.getContext('2d');
    ctx.fillStyle='#252d3a'; ctx.fillRect(0,0,128,128);
    for(let i=0;i<180;i++){ctx.fillStyle=`rgba(255,255,255,${Math.random()*.04})`;ctx.fillRect(Math.random()*128,Math.random()*128,1.5,1.5);}
    ctx.strokeStyle='rgba(226,232,240,.65)'; ctx.lineWidth=1.5; ctx.setLineDash([]);
    [0,32,64,96,128].forEach(x=>{ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,128);ctx.stroke();});
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(128,0);ctx.stroke();
    ctx.beginPath();ctx.moveTo(0,128);ctx.lineTo(128,128);ctx.stroke();
    ctx.fillStyle='rgba(148,163,184,.5)';ctx.font='bold 20px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('P',64,64);
    const t=new THREE.CanvasTexture(cv);
    t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(2,2);
    return new THREE.MeshStandardMaterial({map:t,roughness:.83,metalness:.05});
  }
  // Suprafață poligon plat
  function _flatPoly(ring, y, mat){
    try{
      const pts=ring.slice(0,-1).map(toLoc);
      if(pts.length<3) return null;
      const sh=new THREE.Shape(); sh.moveTo(pts[0][0],pts[0][1]);
      pts.slice(1).forEach(([x,z])=>sh.lineTo(x,z)); sh.closePath();
      const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),mat);
      m.rotation.x=-Math.PI/2; m.position.y=y; m.receiveShadow=true;
      scene.add(m); return m;
    }catch(e){ return null; }
  }
  // Contur lot
  function _outline(ring, y, color, opacity){
    try{
      const pts=ring.slice(0,-1).map(toLoc);
      const verts=new Float32Array(pts.flatMap(([x,z])=>[x,y,z]));
      const lg=new THREE.BufferGeometry(); lg.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
      scene.add(new THREE.LineLoop(lg,new THREE.LineBasicMaterial({color:color||'#7c3aed',opacity:opacity||.55,transparent:true})));
    }catch(e){}
  }
  // Generează ring interior (verde/parcare) prin scalare spre centru
  function _innerRing(ring, scaleFactor){
    try{
      const pts=ring.slice(0,-1).map(p=>({type:'Feature',geometry:{type:'Point',coordinates:p},properties:{}}));
      const cx=ring.reduce((s,p)=>s+p[0],0)/ring.length;
      const cy=ring.reduce((s,p)=>s+p[1],0)/ring.length;
      const innerRing=ring.map(([lng,lat])=>[cx+(lng-cx)*scaleFactor, cy+(lat-cy)*scaleFactor]);
      innerRing.push(innerRing[0]);
      return innerRing;
    }catch(e){ return null; }
  }

  // ── 1. Loturi din lotizare-src ─────────────────────────────────────────
  const matVerde=_matVerde(), matParcare=_matParcare();
  try{
    const feats=(map.getSource('lotizare-src')?._data?.features)||[];
    feats.forEach(f=>{
      if(!f.geometry) return;
      const tip=(f.properties?.tip||'individuala');
      const color=f.properties?.color||'#a78bfa';
      const borderColor=f.properties?.borderColor||color;
      const ring=f.geometry.type==='Polygon'
        ?f.geometry.coordinates[0]
        :f.geometry.coordinates[0]?.[0];
      if(!ring||ring.length<4) return;

      // a) Suprafața lotului — semitransparentă, culoarea tipului
      const matLot=new THREE.MeshStandardMaterial({
        color,roughness:.9,metalness:0,transparent:true,opacity:.2,side:THREE.DoubleSide
      });
      _flatPoly(ring, 0.04, matLot);
      _outline(ring, 0.06, borderColor, .5);

      // b) Spațiu verde estimat — strip interior (sv% din suprafața lotului)
      const svPct=SV_PCT[tip]||.20;
      if(svPct>0.05){
        // Scalăm ring-ul spre centru: suprafața pătrată crește cu scaleFactor²
        // verde_pct = 1 - scaleFactor² => scaleFactor = sqrt(1-sv%)
        const scaleV=Math.sqrt(1-svPct);
        const verdeRing=_innerRing(ring, 1.0);
        const lotIntRing=_innerRing(ring, scaleV);
        if(verdeRing&&lotIntRing){
          // Verde = ring extern - ring intern (fascia de jur-împrejur)
          // Simplu: desenăm un poligon verde de grosimea diferenței
          // Abordare: flat poly interior verde + flat poly lot peste el
          _flatPoly(ring, 0.05, matVerde);
          const matLotOver=new THREE.MeshStandardMaterial({
            color,roughness:.9,metalness:0,transparent:true,opacity:.35,side:THREE.DoubleSide
          });
          const innerPts=lotIntRing.slice(0,-1).map(toLoc);
          if(innerPts.length>=3){
            const sh2=new THREE.Shape(); sh2.moveTo(innerPts[0][0],innerPts[0][1]);
            innerPts.slice(1).forEach(([x,z])=>sh2.lineTo(x,z)); sh2.closePath();
            const m2=new THREE.Mesh(new THREE.ShapeGeometry(sh2),matLotOver);
            m2.rotation.x=-Math.PI/2; m2.position.y=0.055; m2.receiveShadow=true;
            scene.add(m2);
          }
          _outline(ring, 0.07, '#16a34a', .3); // bordura verde
        }
      }

      // c) Zonă parcare (doar individuala/duplex/bloc — fâșie față lot)
      const pkW=PK_W[tip]||0;
      if(pkW>0.5){
        const scaleP=Math.max(.3, 1-(pkW/Math.sqrt(Math.max(1,turf?.area?.(f)||400)/Math.PI)*2));
        // Parcare = fâșie în interior, culoare asfalt gri
        const parkRing=_innerRing(ring, scaleP);
        if(parkRing){
          const outerPts=ring.slice(0,-1).map(toLoc);
          const innerP=parkRing.slice(0,-1).map(toLoc);
          if(outerPts.length>=3&&innerP.length>=3){
            // Desenăm un ring subțire în față ca simbol parcare
            const shP=new THREE.Shape(); shP.moveTo(outerPts[0][0],outerPts[0][1]);
            outerPts.slice(1,3).forEach(([x,z])=>shP.lineTo(x,z));
            innerP.slice(0,3).reverse().forEach(([x,z])=>shP.lineTo(x,z));
            shP.closePath();
            const mP=new THREE.Mesh(new THREE.ShapeGeometry(shP),matParcare);
            mP.rotation.x=-Math.PI/2; mP.position.y=0.06; mP.receiveShadow=true;
            scene.add(mP);
          }
        }
      }
    });
  }catch(e){ console.warn('v3d lot feats:',e.message); }

  // ── 2. Drum principal din lotizare-drum-src ────────────────────────────
  try{
    const drumFeats=(map.getSource('lotizare-drum-src')?._data?.features)||[];
    if(drumFeats.length){
      const matD=_matAsfalt();
      drumFeats.forEach(f=>{
        if(!f.geometry) return;
        const rings=f.geometry.type==='Polygon'
          ?f.geometry.coordinates
          :(f.geometry.coordinates[0]||[]);
        const ring=Array.isArray(rings[0][0])?rings[0]:rings;
        if(!ring||ring.length<3) return;
        _flatPoly(ring, 0.09, matD);
        _outline(ring, 0.11, '#94a3b8', .5);
        // Trotuar — bordura interioară subtilă
        const innerT=_innerRing(ring, 0.92);
        if(innerT){
          const ipts=innerT.slice(0,-1).map(toLoc);
          const verts2=new Float32Array(ipts.flatMap(([x,z])=>[x,0.10,z]));
          const lg2=new THREE.BufferGeometry();
          lg2.setAttribute('position',new THREE.Float32BufferAttribute(verts2,3));
          scene.add(new THREE.LineLoop(lg2,new THREE.LineBasicMaterial({color:'#e2e8f0',opacity:.25,transparent:true})));
        }
      });
    }
  }catch(e){ console.warn('v3d drum:',e.message); }

  // ── 3. Circulații custom (lot-drum-edit-src) — linii → benzi 3D ────────
  try{
    const editFeats=(map.getSource('lot-drum-edit-src')?._data?.features)||[];
    editFeats.forEach(f=>{
      if(!f.geometry) return;
      const tipD=f.properties?.tip||'secundar';
      const color=f.properties?.color||'#64748b';
      // lătime reală = lineW - 2 (am adăugat +2 la stocare)
      const lineWM=Math.max(2,(f.properties?.lineW||6)-2);
      const mat=new THREE.MeshLambertMaterial({color,transparent:true,opacity:.75});
      const coordsList=f.geometry.type==='LineString'
        ?[f.geometry.coordinates]
        :f.geometry.coordinates;
      coordsList.forEach(coords=>{
        const pts2d=coords.map(([lng,lat])=>toLoc([lng,lat]));
        if(pts2d.length<2) return;
        const hw=lineWM/2;
        for(let i=0;i<pts2d.length-1;i++){
          const[x0,z0]=pts2d[i],[x1,z1]=pts2d[i+1];
          const dx=x1-x0,dz=z1-z0,len=Math.sqrt(dx*dx+dz*dz);
          if(len<0.1) continue;
          const nx=dz/len,nz=-dx/len;
          const corners=[[x0+nx*hw,z0+nz*hw],[x1+nx*hw,z1+nz*hw],[x1-nx*hw,z1-nz*hw],[x0-nx*hw,z0-nz*hw]];
          const mesh=_v3dPrism(THREE,corners,0.07,0.14,mat);
          if(mesh){mesh.receiveShadow=true;scene.add(mesh);}
        }
      });
    });
  }catch(e){ console.warn('v3d circ:',e.message); }
}

function _v3dAddStreets(THREE, scene, ring0, toLoc){

  // ── Helpers materiale ─────────────────────────────────────────────────
  function _matDrum(){
    const cv=document.createElement('canvas'); cv.width=128; cv.height=256;
    const ctx=cv.getContext('2d');
    // Asfalt
    ctx.fillStyle='#3a4a5a'; ctx.fillRect(0,0,128,256);
    // Granulație
    for(let i=0;i<600;i++){
      ctx.fillStyle=`rgba(0,0,0,${Math.random()*.1})`;
      ctx.fillRect(Math.random()*128,Math.random()*256,1.5,1.5);
    }
    // Linie mediană galbenă (punctată)
    ctx.strokeStyle='#d4af37'; ctx.lineWidth=2; ctx.setLineDash([16,10]);
    ctx.beginPath(); ctx.moveTo(64,0); ctx.lineTo(64,256); ctx.stroke();
    // Borduri albe
    ctx.strokeStyle='rgba(255,255,255,.25)'; ctx.lineWidth=2; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(6,0); ctx.lineTo(6,256); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(122,0); ctx.lineTo(122,256); ctx.stroke();
    const t=new THREE.CanvasTexture(cv);
    t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(1,2);
    return new THREE.MeshStandardMaterial({map:t,roughness:.9,metalness:.04,envMapIntensity:.1});
  }

  function _matVerde(){
    const cv=document.createElement('canvas'); cv.width=64; cv.height=64;
    const ctx=cv.getContext('2d');
    ctx.fillStyle='#1c4d2e'; ctx.fillRect(0,0,64,64);
    for(let i=0;i<300;i++){
      const g=Math.floor(Math.random()*50+55);
      ctx.fillStyle=`rgba(10,${g},20,.35)`;
      ctx.fillRect(Math.random()*64,Math.random()*64,2,3);
    }
    // Câteva linii cu iarbă
    ctx.strokeStyle='rgba(50,160,60,.3)'; ctx.lineWidth=1;
    for(let i=0;i<12;i++){
      const x=Math.random()*64, y=Math.random()*64;
      ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.random()*4-2,y-6); ctx.stroke();
    }
    const t=new THREE.CanvasTexture(cv);
    t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(4,4);
    return new THREE.MeshStandardMaterial({map:t,roughness:.95,metalness:0});
  }

  function _matParcare(){
    const cv=document.createElement('canvas'); cv.width=128; cv.height=128;
    const ctx=cv.getContext('2d');
    ctx.fillStyle='#252d3a'; ctx.fillRect(0,0,128,128);
    // Zgomot asfalt
    for(let i=0;i<200;i++){
      ctx.fillStyle=`rgba(255,255,255,${Math.random()*.05})`;
      ctx.fillRect(Math.random()*128,Math.random()*128,1.5,1.5);
    }
    // Linii locuri de parcare (portret)
    ctx.strokeStyle='rgba(226,232,240,.7)'; ctx.lineWidth=1.5; ctx.setLineDash([]);
    for(let x=0;x<=128;x+=32){
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,128); ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(128,0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,128); ctx.lineTo(128,128); ctx.stroke();
    // Simbol "P"
    ctx.fillStyle='rgba(148,163,184,.55)';
    ctx.font='bold 18px Arial'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('P',64,64);
    const t=new THREE.CanvasTexture(cv);
    t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(2,2);
    return new THREE.MeshStandardMaterial({map:t,roughness:.85,metalness:.05});
  }

  function _matLot(color){
    return new THREE.MeshStandardMaterial({
      color: color||'#a78bfa',
      roughness:.9, metalness:0,
      transparent:true, opacity:.22,
      side:THREE.DoubleSide
    });
  }

  // Construiește o suprafață plată din poligon GeoJSON
  function _flatPoly(ring, yPos, mat){
    try{
      const pts=ring.slice(0,-1).map(toLoc);
      if(pts.length<3) return;
      const shape=new THREE.Shape();
      shape.moveTo(pts[0][0],pts[0][1]);
      pts.slice(1).forEach(([x,z])=>shape.lineTo(x,z));
      shape.closePath();
      const geo=new THREE.ShapeGeometry(shape);
      const m=new THREE.Mesh(geo,mat);
      m.rotation.x=-Math.PI/2; m.position.y=yPos;
      m.receiveShadow=true; scene.add(m);
    }catch(e){}
  }

  // Contur luminat (bordura lot)
  function _lotOutline(ring, y, color){
    try{
      const pts=ring.slice(0,-1).map(toLoc);
      const verts=new Float32Array(pts.flatMap(([x,z])=>[x,y,z]));
      const lg=new THREE.BufferGeometry();
      lg.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
      scene.add(new THREE.LineLoop(lg,new THREE.LineBasicMaterial({
        color:color||'#7c3aed',opacity:.55,transparent:true
      })));
    }catch(e){}
  }

  // Helper: detectează dacă o culoare hex e în zona verde
  function _isGreen(hex){
    if(!hex||hex[0]!=='#') return false;
    const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
    return g > r+30 && g > b+20 && g > 80;
  }
  // Helper: detectează dacă e gri (parcare / drum)
  function _isGray(hex){
    if(!hex||hex[0]!=='#') return false;
    const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
    return Math.max(r,g,b)-Math.min(r,g,b)<25 && r<160;
  }

  // ── 1. Loturi din lotizare-src ─────────────────────────────────────────
  try{
    const src=map.getSource('lotizare-src');
    const feats=(src?._data?.features)||[];
    const matDrum0=_matDrum(), matVerde0=_matVerde(), matParcare0=_matParcare();
    feats.forEach(f=>{
      if(!f.geometry) return;
      const tip=(f.properties?.tip||f.properties?.type||f.properties?.categorie||'').toLowerCase();
      const color=f.properties?.color||f.properties?.fillColor||'#a78bfa';
      const borderColor=f.properties?.borderColor||color;
      const isVerde=tip.includes('verde')||tip==='sv'||tip.includes('green')||_isGreen(color);
      const isParcare=tip.includes('parcare')||tip==='pk'||tip.includes('parking');
      const isDrum=tip.includes('drum')||tip.includes('road')||tip.includes('str');
      const ring=f.geometry.type==='Polygon'
        ?f.geometry.coordinates[0]
        :f.geometry.coordinates[0][0];
      if(!ring||ring.length<3) return;
      if(isVerde){
        _flatPoly(ring,0.06,matVerde0);
        _lotOutline(ring,0.08,'#16a34a');
      } else if(isParcare){
        _flatPoly(ring,0.06,matParcare0);
        _lotOutline(ring,0.08,'#94a3b8');
      } else if(isDrum){
        _flatPoly(ring,0.08,matDrum0);
        _lotOutline(ring,0.10,'#cbd5e1');
      } else {
        // Lot clădire — suprafață colorată semitransparentă
        _flatPoly(ring,0.04,_matLot(color));
        _lotOutline(ring,0.05,borderColor);
      }
    });
  }catch(e){ console.warn('v3d lotizare-src:',e.message); }

  // ── 2. Drum principal din lotizare-drum-src ────────────────────────────
  try{
    const drumSrc=map.getSource('lotizare-drum-src');
    const drumFeats=(drumSrc?._data?.features)||[];
    if(drumFeats.length){
      const matD=_matDrum();
      drumFeats.forEach(f=>{
        if(!f.geometry) return;
        const rings=f.geometry.type==='Polygon'
          ?f.geometry.coordinates
          :f.geometry.coordinates[0];
        const ring=rings[0];
        if(!ring||ring.length<3) return;
        _flatPoly(ring,0.09,matD);
        // Bordură drum
        _lotOutline(ring,0.11,'#94a3b8');
        // Trotuar (offset interior mic cu culoare deschisă)
        try{
          const pts=ring.slice(0,-1).map(toLoc);
          const cx2=pts.reduce((s,[x])=>s+x,0)/pts.length;
          const cz2=pts.reduce((s,[,z])=>s+z,0)/pts.length;
          const trotPts=pts.map(([x,z])=>[x+(cx2-x)*.07, z+(cz2-z)*.07]);
          const verts=new Float32Array(trotPts.flatMap(([x,z])=>[x,0.095,z]));
          const lg=new THREE.BufferGeometry();
          lg.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
          scene.add(new THREE.LineLoop(lg,new THREE.LineBasicMaterial({
            color:'#e2e8f0',opacity:.35,transparent:true
          })));
        }catch(e2){}
      });
    }
  }catch(e){ console.warn('v3d lotizare-drum-src:',e.message); }

  // ── 3. Circulații custom din lot-drum-edit-src (linii → benzi 3D) ──────
  try{
    const editSrc=map.getSource('lot-drum-edit-src');
    const editFeats=(editSrc?._data?.features)||[];
    editFeats.forEach(f=>{
      if(!f.geometry) return;
      const color=f.properties?.color||'#38bdf8';
      const lineWM=Math.max(2,f.properties?.lineW||4); // lățime în metri (approx px→m)
      const mat=new THREE.MeshLambertMaterial({color,transparent:true,opacity:.75});
      let lines=[];
      if(f.geometry.type==='LineString') lines=[f.geometry.coordinates];
      else if(f.geometry.type==='MultiLineString') lines=f.geometry.coordinates;
      lines.forEach(coords=>{
        const pts2d=coords.map(([lng,lat])=>toLoc([lng,lat]));
        if(pts2d.length<2) return;
        const hw=lineWM/2;
        for(let i=0;i<pts2d.length-1;i++){
          const[x0,z0]=pts2d[i],[x1,z1]=pts2d[i+1];
          const dx=x1-x0,dz=z1-z0,len=Math.sqrt(dx*dx+dz*dz);
          if(len<0.1) continue;
          const nx=dz/len,nz=-dx/len;
          const corners=[[x0+nx*hw,z0+nz*hw],[x1+nx*hw,z1+nz*hw],[x1-nx*hw,z1-nz*hw],[x0-nx*hw,z0-nz*hw]];
          const mesh=_v3dPrism(THREE,corners,0.07,0.13,mat);
          if(mesh){ mesh.receiveShadow=true; scene.add(mesh); }
        }
      });
    });
  }catch(e){ console.warn('v3d lot-drum-edit-src:',e.message); }
}

function _v3dAddStreets(THREE, scene, ring0, toLoc){
  // Strada vine EXCLUSIV din date OSM reale (Overpass)
  // Dacă Overpass e indisponibil, NU desenăm nimic inventat

  // Calculăm centrul parcelei în coordonate geografice
  const cx = ring0.reduce((s,p)=>s+p[0],0)/ring0.length;
  const cy = ring0.reduce((s,p)=>s+p[1],0)/ring0.length;

  const stMat = new THREE.MeshLambertMaterial({color:'#7a8a9a'});
  const trMat = new THREE.MeshLambertMaterial({color:'#9aaabb'});

  const addRoad=(pts2d, widthM, mat)=>{
    for(let i=0;i<pts2d.length-1;i++){
      const [x0,z0]=pts2d[i],[x1,z1]=pts2d[i+1];
      const dx=x1-x0,dz=z1-z0,len=Math.sqrt(dx*dx+dz*dz);
      if(len<0.5) continue;
      const nx=dz/len,nz=-dx/len;
      const hw=widthM/2;
      const corners=[
        [x0+nx*hw,z0+nz*hw],[x1+nx*hw,z1+nz*hw],
        [x1-nx*hw,z1-nz*hw],[x0-nx*hw,z0-nz*hw]
      ];
      const mesh=_v3dPrism(THREE,corners,0.02,0.10,mat);
      if(mesh) scene.add(mesh);
    }
  };

  // Query Overpass pentru drumuri în raza de 200m
  const q=`[out:json][timeout:8];(
    way["highway"~"^(primary|secondary|tertiary|residential|unclassified|service|footway|pedestrian|living_street|trunk)$"](around:200,${cy},${cx});
  );out geom;`;

  const widths={trunk:9,primary:8,secondary:7,tertiary:6,residential:5,
    unclassified:5,service:3.5,footway:2,pedestrian:2.5,living_street:4};

  fetch('https://overpass-api.de/api/interpreter',{
    method:'POST',body:q,signal:AbortSignal.timeout(8000)
  })
  .then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
  .then(data=>{
    if(!data.elements?.length) return;
    data.elements.forEach(way=>{
      if(!way.geometry?.length) return;
      const hw=way.tags?.highway||'unclassified';
      const w=(widths[hw]||4)/2;
      const pts2d=way.geometry.map(p=>toLoc([p.lon,p.lat]));
      if(pts2d.length<2) return;
      addRoad(pts2d, widths[hw]||4, hw==='footway'||hw==='pedestrian'?trMat:stMat);
    });
    _v3dStatus(`✅ ${V3D.aedis.length} vol. AEDIS · ${V3D.ctx.length} clădiri · Drag=rotire`);
  })
  .catch(e=>{
    // Overpass indisponibil — NU desenăm nimic inventat
    console.warn('Streets OSM unavailable:', e.message);
    _v3dStatus(`✅ ${V3D.aedis.length} vol. AEDIS · ${V3D.ctx.length} clădiri · (Overpass indisponibil)`);
  });
}



// ── Viata urbana: oameni, masini, caini, biciclete, bancute, felinare ────────
function _v3dAddUrbanLife(THREE, scene, ring0, toLoc, isNight){
  try{
    const pts=ring0.map(toLoc);
    const xs=pts.map(([x])=>x), zs=pts.map(([,z])=>z);
    const minX=Math.min(...xs), maxX=Math.max(...xs);
    const minZ=Math.min(...zs), maxZ=Math.max(...zs);
    const lcx=(minX+maxX)/2, lcz=(minZ+maxZ)/2;
    const lw=maxX-minX, ld=maxZ-minZ;
    // Marginea de excludere: 1m în plus față de AABB-ul parcelei
    const margin = 1.5;
    const exMinX=minX-margin, exMaxX=maxX+margin;
    const exMinZ=minZ-margin, exMaxZ=maxZ+margin;
    // Raza maximă de plasare (stradă în jur)
    const maxR = Math.max(lw,ld)*0.5 + 18;

    // Point-in-AABB test — respinge orice poziție în zona extinsă a parcelei
    const isOnParcel=(x,z)=> x>exMinX && x<exMaxX && z>exMinZ && z<exMaxZ;

    // Generare poziție sigură în afara parcelei
    const safePt=(minDist=6, maxDist=18)=>{
      for(let t=0;t<40;t++){
        const a=Math.random()*Math.PI*2;
        const r=minDist+Math.random()*(maxDist-minDist);
        const x=lcx+r*Math.sin(a), z=lcz+r*Math.cos(a);
        if(!isOnParcel(x,z)) return [x,z];
      }
      // Fallback garantat: colț stradă
      return [lcx+(exMaxX-lcx+minDist), lcz+(exMaxZ-lcz+minDist)];
    };

    const mkTex=(draw,cw,ch)=>{
      const cv=document.createElement('canvas');cv.width=cw;cv.height=ch;
      draw(cv.getContext('2d'),cw,ch);
      return new THREE.CanvasTexture(cv);
    };
    const addSprite=(tex,x,y,z,sw,sh)=>{
      const m=new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false,
        sizeAttenuation:true,depthTest:true});
      const sp=new THREE.Sprite(m);
      sp.scale.set(sw*2,sh*2,1);
      sp.position.set(x,y+sh,z);
      scene.add(sp);
    };

    // Om
    const personDraw=(ctx,w,h,sk,cl,ha)=>{
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle=cl;ctx.fillRect(w*.3,h*.35,w*.4,h*.4);
      ctx.fillStyle=sk;ctx.beginPath();ctx.arc(w/2,h*.22,w*.17,0,6.28);ctx.fill();
      ctx.fillStyle=ha;ctx.beginPath();ctx.arc(w/2,h*.17,w*.17,Math.PI,0);ctx.fill();
      ctx.fillStyle=cl;ctx.fillRect(w*.3,h*.72,w*.15,h*.25);ctx.fillRect(w*.55,h*.72,w*.15,h*.25);
      ctx.fillStyle=sk;ctx.fillRect(w*.12,h*.36,w*.18,h*.28);ctx.fillRect(w*.7,h*.36,w*.18,h*.28);
    };
    const pData=[['#f5d5b8','#224499','#3a2010'],['#c8a080','#992233','#111'],
      ['#f0c8a0','#228844','#8b4513'],['#d4a882','#553399','#2c1810'],
      ['#e8c8a0','#333','#111'],['#c0a070','#dd7700','#4a2a10']];

    // 6 pietoni — toți în afara parcelei
    for(let i=0;i<6;i++){
      const [x,z]=safePt(lw*0.5+3, lw*0.5+14);
      const [sk,cl,ha]=pData[i%pData.length];
      addSprite(mkTex((ctx,w,h)=>personDraw(ctx,w,h,sk,cl,ha),32,64),x,0,z,0.5,1.75);
    }

    // Mama cu căruciorul
    const carucior=mkTex((ctx,w,h)=>{
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle='#f0c0a0';ctx.beginPath();ctx.arc(w*.35,h*.2,w*.13,0,6.28);ctx.fill();
      ctx.fillStyle='#cc6688';ctx.fillRect(w*.22,h*.32,w*.26,h*.35);
      ctx.fillRect(w*.22,h*.65,w*.1,h*.25);ctx.fillRect(w*.38,h*.65,w*.1,h*.25);
      ctx.fillStyle='#4466aa';ctx.fillRect(w*.52,h*.45,w*.36,h*.27);
      ctx.fillStyle='#222';ctx.beginPath();ctx.arc(w*.6,h*.76,w*.08,0,6.28);ctx.fill();
      ctx.arc(w*.8,h*.76,w*.08,0,6.28);ctx.fill();
      ctx.fillStyle='#ffd0a0';ctx.beginPath();ctx.arc(w*.7,h*.48,w*.1,0,6.28);ctx.fill();
    },64,64);
    const [clx2,clz2]=safePt(lw*0.5+4, lw*0.5+10);
    addSprite(carucior,clx2,0,clz2,1.5,1.5);

    // Beagle
    const beagle=mkTex((ctx,w,h)=>{
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle='#c8a060';ctx.fillRect(w*.2,h*.48,w*.5,h*.26);
      ctx.beginPath();ctx.arc(w*.72,h*.44,w*.16,0,6.28);ctx.fill();
      ctx.fillStyle='#3a2010';ctx.fillRect(w*.75,h*.38,w*.08,h*.22);ctx.fillRect(w*.58,h*.38,w*.08,h*.22);
      ctx.fillStyle='#a08040';ctx.fillRect(w*.22,h*.72,w*.08,h*.2);ctx.fillRect(w*.36,h*.72,w*.08,h*.2);
      ctx.fillRect(w*.52,h*.72,w*.08,h*.2);ctx.fillRect(w*.62,h*.72,w*.08,h*.2);
      ctx.strokeStyle='#c8a060';ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(w*.2,h*.55);ctx.quadraticCurveTo(w*.06,h*.33,w*.13,h*.47);ctx.stroke();
      ctx.fillStyle='#f0e8d0';ctx.fillRect(w*.68,h*.5,w*.12,w*.08);
      ctx.fillStyle='#111';ctx.beginPath();ctx.arc(w*.78,h*.42,w*.03,0,6.28);ctx.fill();
    },64,40);
    const [blx2,blz2]=safePt(lw*0.5+5, lw*0.5+12);
    addSprite(beagle,blx2,0,blz2,1.2,0.75);

    // Bicicletă
    const bici=mkTex((ctx,w,h)=>{
      ctx.clearRect(0,0,w,h);ctx.strokeStyle='#444';ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(w*.25,h*.7,w*.2,0,6.28);ctx.stroke();
      ctx.beginPath();ctx.arc(w*.75,h*.7,w*.2,0,6.28);ctx.stroke();
      ctx.beginPath();ctx.moveTo(w*.25,h*.7);ctx.lineTo(w*.55,h*.4);ctx.lineTo(w*.75,h*.7);ctx.stroke();
      ctx.beginPath();ctx.moveTo(w*.55,h*.4);ctx.lineTo(w*.55,h*.65);ctx.lineTo(w*.75,h*.7);ctx.stroke();
      ctx.beginPath();ctx.moveTo(w*.55,h*.4);ctx.lineTo(w*.72,h*.35);ctx.stroke();
      ctx.fillStyle='#2266aa';ctx.beginPath();ctx.arc(w*.5,h*.15,w*.12,0,6.28);ctx.fill();
      ctx.fillRect(w*.38,h*.26,w*.24,h*.3);
    },48,56);
    for(let i=0;i<2;i++){
      const [bix,biz]=safePt(lw*0.5+6, lw*0.5+15);
      addSprite(bici,bix,0,biz,1.2,1.4);
    }

    // ── Mașini 3D reale (BoxGeometry) cu faruri ─────────────────────────────
    const carPalette=[
      {body:'#cc2222',glass:'#60a0c0',wheel:'#222',trim:'#aaa'},
      {body:'#1a3aaa',glass:'#80b0d0',wheel:'#333',trim:'#c0c8d8'},
      {body:'#1a7a3a',glass:'#70b090',wheel:'#222',trim:'#b0c0b0'},
      {body:'#888898',glass:'#90b0c8',wheel:'#222',trim:'#c8c8d0'},
      {body:'#111118',glass:'#4878a0',wheel:'#181818',trim:'#606070'},
      {body:'#b07010',glass:'#a0c0a0',wheel:'#222',trim:'#d0a840'},
    ];
    for(let i=0;i<4;i++){
      const [cax,caz]=safePt(lw*0.5+6,lw*0.5+22);
      const cp=carPalette[i%carPalette.length];
      const carAngle=Math.random()*Math.PI*2;
      const carGrp=new THREE.Group();

      // Caroserie principală (sedan shape: 2 box-uri)
      const bodyMat=new THREE.MeshStandardMaterial({color:new THREE.Color(cp.body),roughness:0.25,metalness:0.75});
      const cabinMat=new THREE.MeshStandardMaterial({color:new THREE.Color(cp.body),roughness:0.28,metalness:0.70});
      const glassMat2=new THREE.MeshStandardMaterial({color:new THREE.Color(cp.glass),roughness:0.05,metalness:0.8,transparent:true,opacity:0.7,
        emissive:isNight?new THREE.Color(0.1,0.15,0.25):new THREE.Color(0,0,0.02),emissiveIntensity:isNight?0.8:0.1});
      const wheelMat=new THREE.MeshStandardMaterial({color:new THREE.Color(cp.wheel),roughness:0.85,metalness:0.1});
      const hubMat=new THREE.MeshStandardMaterial({color:new THREE.Color(cp.trim),roughness:0.2,metalness:0.9});
      const headlightMat=new THREE.MeshStandardMaterial({color:new THREE.Color('#fffde0'),roughness:0.05,metalness:0.3,
        emissive:isNight?new THREE.Color(0.9,0.85,0.5):new THREE.Color(0.05,0.05,0.02),emissiveIntensity:isNight?4.0:0.2});
      const taillightMat=new THREE.MeshStandardMaterial({color:new THREE.Color('#ff2020'),roughness:0.1,metalness:0.2,
        emissive:isNight?new THREE.Color(0.8,0.02,0.02):new THREE.Color(0.1,0,0),emissiveIntensity:isNight?3.5:0.1});

      // Corp jos (caroserie)
      const body=new THREE.Mesh(new THREE.BoxGeometry(3.8,0.7,1.8),bodyMat);
      body.position.set(0,0.55,0); carGrp.add(body);
      // Habitaclu (mai îngust și mai înalt)
      const cabin=new THREE.Mesh(new THREE.BoxGeometry(2.2,0.65,1.65),cabinMat);
      cabin.position.set(-0.2,1.12,0); carGrp.add(cabin);
      // Geamuri habitaclu
      const winF=new THREE.Mesh(new THREE.BoxGeometry(1.0,0.50,0.03),glassMat2);
      winF.position.set(0.58,1.10,0.84); carGrp.add(winF);
      const winR=new THREE.Mesh(new THREE.BoxGeometry(0.85,0.45,0.03),glassMat2);
      winR.position.set(-0.55,1.10,0.84); carGrp.add(winR);
      const winB=new THREE.Mesh(new THREE.BoxGeometry(0.03,0.48,1.58),glassMat2);
      winB.position.set(-1.30,1.10,0); carGrp.add(winB);
      // Faruri față
      const hlL=new THREE.Mesh(new THREE.BoxGeometry(0.03,0.20,0.30),headlightMat);
      hlL.position.set(1.92,0.65,0.55); carGrp.add(hlL);
      const hlR=new THREE.Mesh(new THREE.BoxGeometry(0.03,0.20,0.30),headlightMat);
      hlR.position.set(1.92,0.65,-0.55); carGrp.add(hlR);
      // Stopuri spate
      const tlL=new THREE.Mesh(new THREE.BoxGeometry(0.03,0.18,0.28),taillightMat);
      tlL.position.set(-1.92,0.68,0.55); carGrp.add(tlL);
      const tlR=new THREE.Mesh(new THREE.BoxGeometry(0.03,0.18,0.28),taillightMat);
      tlR.position.set(-1.92,0.68,-0.55); carGrp.add(tlR);
      // Roți (4)
      [[1.1,0.30,1.0],[-1.1,0.30,1.0],[1.1,0.30,-1.0],[-1.1,0.30,-1.0]].forEach(([wx2,wy,wz2])=>{
        const tyre=new THREE.Mesh(new THREE.CylinderGeometry(0.30,0.30,0.22,14),wheelMat);
        tyre.rotation.z=Math.PI/2; tyre.position.set(wx2,wy,wz2); carGrp.add(tyre);
        const hub=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,0.24,8),hubMat);
        hub.rotation.z=Math.PI/2; hub.position.set(wx2,wy,wz2); carGrp.add(hub);
      });
      // Umbra sub mașina
      const shadow=new THREE.Mesh(new THREE.PlaneGeometry(4.2,2.2),
        new THREE.MeshStandardMaterial({color:'#000000',transparent:true,opacity:0.25,roughness:1}));
      shadow.rotation.x=-Math.PI/2; shadow.position.set(0,0.01,0); carGrp.add(shadow);

      carGrp.position.set(cax,0,caz);
      carGrp.rotation.y=carAngle;
      carGrp.castShadow=true; carGrp.receiveShadow=true;
      scene.add(carGrp);

      // Faruri + stopuri ca PointLight noaptea
      if(isNight){
        const fDir=new THREE.Vector3(Math.cos(carAngle),0,Math.sin(carAngle));
        const fl2=new THREE.PointLight('#fffce0',1.8,14,2);
        fl2.position.set(cax+fDir.x*2.0,0.65,caz+fDir.z*2.0); scene.add(fl2);
        const rl2=new THREE.PointLight('#ff1010',0.8,7,2);
        rl2.position.set(cax-fDir.x*2.0,0.65,caz-fDir.z*2.0); scene.add(rl2);
      }
    }

    // Bănci — pe trotuar, în afara parcelei
    const banca=mkTex((ctx,w,h)=>{
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle='#8b5e3c';ctx.fillRect(w*.1,h*.4,w*.8,h*.12);ctx.fillRect(w*.1,h*.55,w*.8,h*.08);
      ctx.fillStyle='#555';ctx.fillRect(w*.12,h*.63,w*.1,h*.3);ctx.fillRect(w*.78,h*.63,w*.1,h*.3);
      ctx.fillRect(w*.12,h*.35,w*.08,h*.2);ctx.fillRect(w*.8,h*.35,w*.08,h*.2);
    },48,32);
    for(let i=0;i<2;i++){
      const [bnx,bnz]=safePt(lw*0.5+4, lw*0.5+10);
      addSprite(banca,bnx,0,bnz,1.0,0.5);
    }

    // ── Felinare 3D ────────────────────────────────────────────────────────
    const poleMatL=new THREE.MeshStandardMaterial({color:'#556070',roughness:0.6,metalness:0.5});
    const armMatL=new THREE.MeshStandardMaterial({color:'#445060',roughness:0.6,metalness:0.5});
    const bulbMat=new THREE.MeshStandardMaterial({color:new THREE.Color(isNight?'#ffee80':'#e0d8c0'),
      roughness:0.1,metalness:0.2,emissive:new THREE.Color(isNight?0.9:0.1,isNight?0.8:0.08,isNight?0.1:0),
      emissiveIntensity:isNight?3.0:0.2});
    for(let i=0;i<3;i++){ // 3 felinare (era 5) — mai puține PointLight-uri noaptea
      const [fx,fz]=safePt(lw*0.5+2.5,lw*0.5+9);
      const fGrp=new THREE.Group();
      // Stâlp
      const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.07,4.5,8),poleMatL);
      pole.position.set(0,2.25,0); fGrp.add(pole);
      // Braț curbat
      const arm=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.9,6),armMatL);
      arm.rotation.z=Math.PI/2*0.3; arm.position.set(0.35,4.4,0); fGrp.add(arm);
      // Corp felinar
      const lamp=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.14,0.28,8),
        new THREE.MeshStandardMaterial({color:'#383830',roughness:0.5,metalness:0.6}));
      lamp.position.set(0.62,4.28,0); fGrp.add(lamp);
      // Bec
      const bulb=new THREE.Mesh(new THREE.SphereGeometry(0.09,8,8),bulbMat);
      bulb.position.set(0.62,4.14,0); fGrp.add(bulb);

      fGrp.position.set(fx,0,fz);
      fGrp.rotation.y=Math.random()*Math.PI*2;
      scene.add(fGrp);
      if(isNight){
        const pl=new THREE.PointLight('#ffdd66',1.4,18,1.5);
        pl.position.set(fx+0.62*Math.cos(fGrp.rotation.y),4.3,fz+0.62*Math.sin(fGrp.rotation.y));
        scene.add(pl);
      }
    }

    // ── Arbori simple ─────────────────────────────────────────────────────
    const trunkMat=new THREE.MeshStandardMaterial({color:'#5a3a1a',roughness:0.9,metalness:0});
    const foliagePalette=['#2d6b2a','#3a7a30','#255020','#4a8540','#1e5018'];
    for(let i=0;i<5;i++){
      const [tx,tz]=safePt(lw*0.5+3,lw*0.5+12);
      const treeH=3.5+Math.random()*2.5;
      const treeGrp=new THREE.Group();
      // Trunchi
      const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.18,treeH*0.4,7),trunkMat);
      trunk.position.set(0,treeH*0.2,0); treeGrp.add(trunk);
      // Coroana (3 sfere suprapuse)
      const fCol=foliagePalette[i%foliagePalette.length];
      const fMat=new THREE.MeshStandardMaterial({color:new THREE.Color(fCol),roughness:0.95,metalness:0});
      [[0,treeH*0.75,0,1.0],[0.15,treeH*0.6,-0.1,0.8],[-0.1,treeH*0.55,0.15,0.75]].forEach(([ox,oy,oz,r])=>{
        const sp=new THREE.Mesh(new THREE.SphereGeometry(r,7,7),fMat);
        sp.position.set(ox,oy,oz); treeGrp.add(sp);
      });
      treeGrp.position.set(tx,0,tz);
      treeGrp.castShadow=true;
      scene.add(treeGrp);
    }

    // ── Lumini interioare clădire noaptea — max 4 (era max 8) ─────────────
    if(isNight){
      const bxC=(minX+maxX)/2, bzC=(minZ+maxZ)/2;
      const nFlN=Math.min(4,Math.round((maxX-minX)/3));
      for(let fl=0;fl<nFlN;fl++){
        const hy=(fl+0.5)*3.0;
        const wl=new THREE.PointLight('#ffe4a0',0.55,14,1.4); // intensitate mai mare compensează numărul mai mic
        wl.position.set(bxC+(Math.random()-0.5)*4,hy,bzC+(Math.random()-0.5)*4);
        scene.add(wl);
      }
      // Lumina stradală ambientă (portocaliu sodiu)
      const street=new THREE.PointLight('#ff8820',0.5,35,1.2);
      street.position.set(lcx,5,lcz+lw*0.5+10); scene.add(street);
    }

  }catch(e){console.warn('UrbanLife:',e.message);}
}

function _v3dPrism(THREE,pts2d,base,top,mat,holeRing){
  // holeRing: optional array of [x,z] for inner ring (hollow prism / courtyard)
  const n=pts2d.length; const h=top-base;
  if(n<3||h<=0) return null;
  const pos=[],nrm=[],uvArr=[],idx=[];
  let uAcc=0;

  // Helper: pereți laterali pentru un ring
  function addWalls(ring,flipNormal){
    const rn=ring.length;
    for(let i=0;i<rn;i++){
      const [x0,z0]=ring[i],[x1,z1]=ring[(i+1)%rn];
      const dx=x1-x0,dz=z1-z0,len=Math.sqrt(dx*dx+dz*dz);
      if(len<0.01){continue;}
      const nx=(flipNormal?-1:1)*dz/len;
      const nz=(flipNormal?1:-1)*dx/len;
      const b4=pos.length/3;
      pos.push(x0,base,z0, x1,base,z1, x1,top,z1, x0,top,z0);
      nrm.push(nx,0,nz, nx,0,nz, nx,0,nz, nx,0,nz);
      uvArr.push(uAcc/100,0, (uAcc+len)/100,0, (uAcc+len)/100,h/10, uAcc/100,h/10);
      idx.push(b4,b4+1,b4+2, b4,b4+2,b4+3);
      uAcc+=len;
    }
  }

  // Pereți exteriori
  addWalls(pts2d, false);

  // Pereți interiori (curte) — normala întoarsă spre interior
  if(holeRing && holeRing.length >= 3){
    addWalls(holeRing, true);
  }

  // Cap sus și jos — folosim THREE.Shape cu gaură pentru planee inelare
  if(holeRing && holeRing.length >= 3){
    // Folosim ExtrudeGeometry cu hole pentru planeele orizontale (top + bottom)
    const outerShape = new THREE.Shape();
    outerShape.moveTo(pts2d[0][0], pts2d[0][1]);
    for(let i=1;i<pts2d.length;i++) outerShape.lineTo(pts2d[i][0], pts2d[i][1]);
    outerShape.closePath();
    const hole = new THREE.Path();
    hole.moveTo(holeRing[0][0], holeRing[0][1]);
    for(let i=1;i<holeRing.length;i++) hole.lineTo(holeRing[i][0], holeRing[i][1]);
    hole.closePath();
    outerShape.holes.push(hole);
    // Top slab (inelară)
    const geoTop = new THREE.ShapeGeometry(outerShape);
    const mTop = new THREE.Mesh(geoTop, mat);
    mTop.rotation.x = -Math.PI/2; mTop.position.y = top;
    // Bottom slab (inelară)
    const geoBot = new THREE.ShapeGeometry(outerShape);
    const mBot = new THREE.Mesh(geoBot, mat);
    mBot.rotation.x = Math.PI/2; mBot.position.y = base;
    const grp = new THREE.Group();
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    geo.setAttribute('normal',new THREE.Float32BufferAttribute(nrm,3));
    geo.setAttribute('uv',new THREE.Float32BufferAttribute(uvArr,2));
    geo.setIndex(idx);
    grp.add(new THREE.Mesh(geo,mat), mTop, mBot);
    return grp;
  }

  // Bez gaură: cap sus
  const tb=pos.length/3;
  for(let i=0;i<n;i++){ const[x,z]=pts2d[i]; pos.push(x,top,z); nrm.push(0,1,0); uvArr.push(x*0.05,z*0.05); }
  for(let i=1;i<n-1;i++) idx.push(tb,tb+i,tb+i+1);
  // Cap jos
  const bb2=pos.length/3;
  for(let i=0;i<n;i++){ const[x,z]=pts2d[i]; pos.push(x,base,z); nrm.push(0,-1,0); uvArr.push(x*0.05,z*0.05); }
  for(let i=1;i<n-1;i++) idx.push(bb2,bb2+i+1,bb2+i);
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
  geo.setAttribute('normal',new THREE.Float32BufferAttribute(nrm,3));
  geo.setAttribute('uv',new THREE.Float32BufferAttribute(uvArr,2));
  geo.setIndex(idx);
  return new THREE.Mesh(geo,mat);
}

// ── Detalii acoperis: parapet, elemente tehnice, scafe ─────────────────────
function _v3dAddRoofDetails(THREE, pts2d, base, top, scene, stilKey){
  if(pts2d.length < 3) return;
  const pMat = new THREE.MeshStandardMaterial({
    color:stilKey==='modern'?'#2a3a4a':stilKey==='minimalist'?'#d0d8e0':'#504030',
    roughness:0.70, metalness:stilKey==='modern'?0.20:0.02
  });
  const techMat = new THREE.MeshStandardMaterial({color:'#606870',roughness:0.55,metalness:0.35});

  const cx=pts2d.reduce((s,[x])=>s+x,0)/pts2d.length;
  const cz=pts2d.reduce((s,[,z])=>s+z,0)/pts2d.length;

  for(let i=0;i<pts2d.length;i++){
    const [x0,z0]=pts2d[i],[x1,z1]=pts2d[(i+1)%pts2d.length];
    const dx=x1-x0,dz=z1-z0,len=Math.sqrt(dx*dx+dz*dz);
    if(len<1) continue;
    const nx=dz/len,nz=-dx/len;
    const ang=-Math.atan2(dz,dx);
    const bx=(x0+x1)/2+nx*0.08, bz=(z0+z1)/2+nz*0.08;
    // Parapet
    const para=new THREE.Mesh(new THREE.BoxGeometry(len+0.12,0.55,0.22),pMat);
    para.castShadow=true; para.position.set(bx,top+0.275,bz); para.rotation.y=ang; scene.add(para);
    // Scafă la baza parapetului
    const sc=new THREE.Mesh(new THREE.BoxGeometry(len+0.10,0.10,0.35),pMat);
    sc.position.set(bx,top+0.05,bz+nz*0.06); sc.rotation.y=ang; scene.add(sc);
  }

  // Elemente tehnice pe acoperiș (ventilatii, casa lift)
  try{
    const techH = 1.8, techW = Math.min(2.5, 1.5);
    const liftM=new THREE.Mesh(new THREE.BoxGeometry(techW,techH,techW*0.8),techMat);
    liftM.castShadow=true; liftM.position.set(cx+1.0,top+0.55+techH/2,cz-0.5); scene.add(liftM);
    // Ventilații mici
    for(let v=0;v<3;v++){
      const vm=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.22,0.6,8),techMat);
      vm.position.set(cx-2+v*1.5,top+0.55+0.3,cz+1.0); scene.add(vm);
    }
  }catch(e){}
}

// ── Materiale corp îmbunătățite (MeshStandardMaterial cu PBR) ──────────────

function _v3dMat(THREE, color, opts={}){
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.72,
    metalness: opts.metalness ?? 0.04,
    ...opts
  });
}

function _v3dMatParter(THREE, stil, cache){
  const fn = AEDIS.fn || 'rezidential_colectiv';
  const k=`parter_${stil}_${fn}`; if(cache[k]) return cache[k];
  const isNight=window._v3dNight||false;
  const stilDef = AEDIS_STIL[stil] || AEDIS_STIL.modern;
  const parterCol = stilDef.parterColor || '#0a1828';
  // PBR per stil — fiecare stil are rugozitate și metalicitate distinctă
  const pbr = {
    modern:          {roughness:0.20, metalness:0.65},
    inovator:        {roughness:0.12, metalness:0.78},
    clasic:          {roughness:0.85, metalness:0.02},
    minimalist:      {roughness:0.92, metalness:0.00},
    industrial:      {roughness:0.88, metalness:0.15},
    adaptat_context: {roughness:0.72, metalness:0.05},
    contemporary:    {roughness:0.78, metalness:0.03},
    deconstructivist:{roughness:0.10, metalness:0.82},
  }[stil] || {roughness:0.50, metalness:0.30};
  const mat=_v3dMat(THREE, parterCol, pbr);
  if(isNight && ['comercial','birouri','mixt','hotel','retail'].includes(fn)){
    mat.emissive=new THREE.Color(0.08,0.18,0.45); mat.emissiveIntensity=3.5;
  } else if(isNight){
    mat.emissive=new THREE.Color(0.02,0.05,0.15); mat.emissiveIntensity=1.2;
  }
  return cache[k]=mat;
}

function _v3dMatFloor(THREE, colHex, floorIdx, stil, cache){
  const fn = AEDIS.fn || 'rezidential_colectiv';
  const k=`floor_${stil}_${fn}_${floorIdx}`; if(cache[k]) return cache[k];
  const isNight=window._v3dNight||false;
  const isCW = AEDIS.peretelCortina || ['birouri','comercial','hotel','mixt'].includes(fn);
  const stilDef = AEDIS_STIL[stil] || AEDIS_STIL.modern;
  const niv = AEDIS.corpuri[0]?.niv || 4;
  const t = floorIdx / Math.max(1, niv);

  // Folosim etajColor din stilDef dacă există
  let baseColor = colHex || '#4080c0';
  if(stilDef.etajColor) {
    try{ baseColor = stilDef.etajColor(null, floorIdx, niv); }catch(e){}
  }

  // PBR distinct per stil — asta face diferența vizuală mare
  const pbr = {
    modern:          {roughness: isCW?0.06:0.22, metalness: isCW?0.72:0.18},
    inovator:        {roughness: 0.15, metalness: 0.55},
    clasic:          {roughness: 0.84, metalness: 0.01},
    minimalist:      {roughness: 0.90, metalness: 0.00},
    industrial:      {roughness: 0.78, metalness: 0.18},
    adaptat_context: {roughness: 0.68, metalness: 0.08},
    contemporary:    {roughness: 0.72, metalness: 0.04},
    deconstructivist:{roughness: 0.12, metalness: 0.70},
  }[stil] || {roughness:0.50, metalness:0.12};

  const mat=_v3dMat(THREE, baseColor, pbr);
  if(isNight){
    const nc = stilDef.windowColor || '#7dd3fc';
    const c = new THREE.Color(nc);
    mat.emissive = c;
    mat.emissiveIntensity = 2.8; // mai puternic pentru ferestre vizibile
  }
  return cache[k]=mat;
}

function _v3dMatPenthouse(THREE, stil, cache){
  const k='penthouse_'+stil; if(cache[k]) return cache[k];
  const stilDef = AEDIS_STIL[stil] || AEDIS_STIL.modern;
  const col = stilDef.aticColor || stilDef.parterColor || '#1a2232';
  const pbr = {
    modern:          {roughness:0.22, metalness:0.60},
    inovator:        {roughness:0.10, metalness:0.82},
    clasic:          {roughness:0.78, metalness:0.02},
    minimalist:      {roughness:0.90, metalness:0.00},
    industrial:      {roughness:0.82, metalness:0.15},
    adaptat_context: {roughness:0.65, metalness:0.08},
    contemporary:    {roughness:0.70, metalness:0.03},
    deconstructivist:{roughness:0.08, metalness:0.88},
  }[stil] || {roughness:0.40, metalness:0.35};
  return cache[k]=_v3dMat(THREE, col, pbr);
}

function _v3dMatRoof(THREE, stil, cache){
  const k='roof_'+stil; if(cache[k]) return cache[k];
  const M={
    modern:    {color:'#1a2232',roughness:0.55,metalness:0.30},
    clasic:    {color:'#4a3820',roughness:0.80,metalness:0.00},
    minimalist:{color:'#c8d4dc',roughness:0.82,metalness:0.00},
    inovator:  {color:'#0e1628',roughness:0.30,metalness:0.50},
    industrial:{color:'#2a2418',roughness:0.88,metalness:0.08},
    default:   {color:'#1a1a2e',roughness:0.65,metalness:0.20},
  };
  const m=M[stil]||M.default;
  return cache[k]=_v3dMat(THREE,m.color,{roughness:m.roughness,metalness:m.metalness});
}

// Adaugă contur alb la o prismă (edges highlight)
function _v3dAddEdges(THREE, mesh, scene, color='#ffffff', opacity=0.3){
  try{
    const edges = new THREE.EdgesGeometry(mesh.geometry, 15);
    const line = new THREE.LineSegments(edges,
      new THREE.LineBasicMaterial({color, transparent:true, opacity}));
    line.position.copy(mesh.position);
    line.rotation.copy(mesh.rotation);
    scene.add(line);
  }catch(e){}
}

// Ferestre stilizate direct pe prismă — corelate cu STIL + FUNCȚIUNE + PERETE CORTINĂ
function _v3dAddWindows(THREE, pts2d, base, top, scene, stilKey, opts){
  opts = opts||{};
  const h = top - base;
  if(h < 1 || pts2d.length < 3) return;
  const isNight2 = window._v3dNight||false;
  const fn = AEDIS.fn || 'rezidential_colectiv';
  // Curtain wall DOAR dacă: toggle explicit SAU stil tehnic + funcțiune specifică
  // Stilul CLASIC/MINIMALIST/INDUSTRIAL nu au niciodată curtain wall automat
  const stilAllowsCurtain = ['modern','inovator'].includes(stilKey);
  const fnWantsCurtain = ['birouri','comercial'].includes(fn); // doar birouri și comercial
  const hasCurtainWall = opts.forceCurtain || AEDIS.peretelCortina ||
    (stilAllowsCurtain && fnWantsCurtain) ||
    (fn === 'rezidential_colectiv' && stilKey === 'inovator' && AEDIS.cortinaProcent >= 80);

  // ── Config per STIL (baza) ────────────────────────────────────────────────
  const cfgByStil = {
    // MODERN: ferestre late cu cadru metalic subțire, balcoane din sticlă, spandrel albastru
    modern:    { wW:1.20, wH:1.55, wGap:1.60, reveal:0.08, glassCol:'#3a80c8', glassRef:0.70,
                 frame:'#90b0cc', frameD:0.06, hasBalc:true,  balcD:0.55, balcH:0.88, railH:0.85,
                 pilW:0.0,  bandH:0.14, bandD:0.06, bandCol:'#1e3a6a', panelCol:'#c0d8f0', floorH:()=>3.0 },
    // INOVATOR: ferestre aproape full-height, cadru violet, balcoane mari, panouri negre
    inovator:  { wW:1.40, wH:1.90, wGap:1.50, reveal:0.12, glassCol:'#2040d0', glassRef:0.80,
                 frame:'#5060b0', frameD:0.08, hasBalc:true,  balcD:0.75, balcH:1.00, railH:0.95,
                 pilW:0.0,  bandH:0.18, bandD:0.08, bandCol:'#3a2880', panelCol:'#08102a', floorH:()=>3.3 },
    // CLASIC: ferestre mici cu arc, cadru auriu gros, pilastri proeminenți, cornișe
    clasic:    { wW:0.80, wH:1.20, wGap:2.00, reveal:0.22, glassCol:'#6878a0', glassRef:0.20,
                 frame:'#d4b860', frameD:0.14, hasBalc:false, balcD:0.45, balcH:0.75, railH:0.70,
                 pilW:0.28, bandH:0.35, bandD:0.18, bandCol:'#c8a040', panelCol:'#e8d090', floorH:()=>3.5 },
    // MINIMALIST: ferestre extrem de late, cadru invizibil, zero ornamente, benzi fine
    minimalist:{ wW:1.65, wH:1.85, wGap:1.70, reveal:0.04, glassCol:'#a0c8e0', glassRef:0.55,
                 frame:'#e0eaf0', frameD:0.02, hasBalc:true,  balcD:0.50, balcH:1.05, railH:1.00,
                 pilW:0.0,  bandH:0.05, bandD:0.02, bandCol:'#d0dce8', panelCol:'#f0f4f8', floorH:()=>3.2 },
    // INDUSTRIAL: ferestre mici cu zăbrele, cadru portocaliu, pilastri masivi de oțel
    industrial:{ wW:0.80, wH:1.00, wGap:2.20, reveal:0.28, glassCol:'#384858', glassRef:0.15,
                 frame:'#905020', frameD:0.18, hasBalc:false, balcD:0.45, balcH:0.75, railH:0.70,
                 pilW:0.30, bandH:0.30, bandD:0.20, bandCol:'#d05010', panelCol:'#281808', floorH:()=>3.8 },
    // ADAPTAT: ferestre moderate, culori din context, balcoane simple
    adaptat_context:{ wW:1.00, wH:1.40, wGap:1.75, reveal:0.14, glassCol:'#5090a0', glassRef:0.40,
                 frame:'#80a870', frameD:0.09, hasBalc:true,  balcD:0.55, balcH:0.85, railH:0.80,
                 pilW:0.08, bandH:0.20, bandD:0.10, bandCol:'#4a8040', panelCol:'#d0e8c0', floorH:()=>3.1 },
  };

  // ── Override per FUNCȚIUNE ────────────────────────────────────────────────
  const cfgByFn = {
    birouri:              { wW:1.40, wH:2.40, wGap:1.55, hasBalc:false, glassCol:'#2060a0', glassRef:0.80, reveal:0.06, frame:'#8090a8', panelCol:'#1a2840', bandCol:'#1e3060', bandH:0.14, curtainForce:true },
    hotel:                { wW:1.00, wH:1.65, wGap:1.55, hasBalc:true,  glassCol:'#4878a8', glassRef:0.55, balcD:0.75, bandCol:'#c8a040', panelCol:'#2a1c10', bandH:0.22 }, // fara curtainForce — stilul decide
    comercial:            { wW:2.20, wH:2.60, wGap:2.40, hasBalc:false, glassCol:'#60a8d0', glassRef:0.70, reveal:0.04, frame:'#c0c8d0', panelCol:'#d8e4ee', bandH:0.12, curtainForce:true },
    rezidential_colectiv: { wW:1.10, wH:1.40, wGap:1.60, hasBalc:true,  glassCol:'#4888b8', glassRef:0.45, balcD:0.60, balcH:0.90 },
    locuinta_individuala: { wW:0.90, wH:1.20, wGap:1.80, hasBalc:false, glassCol:'#6090a0', glassRef:0.35 },
    industrial_depozitare:{ wW:1.20, wH:0.80, wGap:2.50, hasBalc:false, glassCol:'#506070', glassRef:0.18, pilW:0.25, bandCol:'#cc6020' },
    institutie_publica:   { wW:1.00, wH:1.50, wGap:1.70, hasBalc:false, glassCol:'#5580a0', glassRef:0.40, pilW:0.15, bandCol:'#8090b0', bandH:0.24 },
    mixt:                 { wW:1.30, wH:2.00, wGap:1.60, hasBalc:true,  glassCol:'#3070b8', glassRef:0.65 },
  };

  const baseC = cfgByStil[stilKey] || cfgByStil.modern;
  const fnC   = cfgByFn[fn] || {};
  // Merge: fn override pe baseC
  const C = { ...baseC, ...fnC };

  // Perete cortină forțat: dacă fn o cere sau toggle activ
  const isCurtainWall = hasCurtainWall || C.curtainForce;
  const fH = C.floorH();
  const nFloors = Math.max(1, Math.round(h / fH));
  const realFH = h / nFloors;

  // ── Materiale dinamice (zi/noapte/curtain wall) ──────────────────────────
  // Variatie aleatoare per geam (unele aprinse, altele nu - noaptea)
  const _rng = (seed) => { let x=Math.sin(seed+1)*43758.5453; return x-Math.floor(x); };

  const glassMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isNight2 ? '#ffe890' : C.glassCol),
    roughness: isNight2 ? 0.55 : (isCurtainWall ? 0.03 : 0.06),
    metalness: isNight2 ? 0.05 : (isCurtainWall ? 0.55 : C.glassRef),
    emissive: new THREE.Color(isNight2 ? 0.85 : 0.06, isNight2 ? 0.68 : 0.12, isNight2 ? 0.06 : 0.28),
    emissiveIntensity: isNight2 ? 5.5 : (isCurtainWall ? 0.75 : 0.25),
    transparent: true,
    opacity: isNight2 ? 0.98 : (isCurtainWall ? 0.78 : 0.88),
    side: THREE.FrontSide
  });
  // Geam stins noaptea (unele apartamente)
  const glassDarkMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isNight2 ? '#0a1428' : C.glassCol),
    roughness: 0.08, metalness: C.glassRef,
    emissive: new THREE.Color(0,0,0), emissiveIntensity: 0,
    transparent: true, opacity: 0.85
  });
  // Geam galben cald (bucătărie/living aprins)
  const glassWarmMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isNight2 ? '#ffcc44' : C.glassCol),
    roughness: 0.6, metalness: 0.05,
    emissive: new THREE.Color(0.5, 0.32, 0.02), emissiveIntensity: isNight2 ? 3.2 : 0.1,
    transparent: true, opacity: 0.95
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(C.frame||'#a8b8c8'),
    roughness: isCurtainWall ? 0.25 : 0.55,
    metalness: isCurtainWall ? 0.75 : (stilKey==='modern'?0.45:0.08)
  });
  const bandMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(C.bandCol||'#1e3060'),
    roughness: isCurtainWall ? 0.20 : 0.72,
    metalness: isCurtainWall ? 0.80 : 0.08,
    emissive: isNight2 ? new THREE.Color(0.04,0.06,0.15) : new THREE.Color(0,0,0),
    emissiveIntensity: isNight2 ? 0.8 : 0
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(C.panelCol||'#c0ccd8'),
    roughness: isCurtainWall ? 0.18 : 0.78,
    metalness: isCurtainWall ? 0.65 : 0.04
  });
  const balcMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(C.bandCol||'#1e3060'),
    roughness: 0.55, metalness: stilKey==='modern'?0.45:0.08
  });
  const railMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isCurtainWall?'#a8c0d8':stilKey==='modern'?'#b8ccd8':'#988870'),
    roughness: 0.20, metalness: isCurtainWall?0.85:stilKey==='modern'?0.80:0.15,
    transparent: true, opacity: isCurtainWall ? 0.60 : 0.75
  });
  const spandrelMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isNight2 ? '#0e1c38' : (isCurtainWall?'#0a1830':C.panelCol||'#1e2838')),
    roughness: isCurtainWall ? 0.15 : 0.28,
    metalness: isCurtainWall ? 0.90 : 0.50,
    emissive: isNight2 ? new THREE.Color(0.08,0.12,0.28) : new THREE.Color(0,0,0),
    emissiveIntensity: isNight2 ? 1.6 : 0
  });

  const mkMesh=(geo,mat,x,y,z,ry=0)=>{
    const m=new THREE.Mesh(geo,mat); m.castShadow=true; m.receiveShadow=true;
    m.position.set(x,y,z); if(ry) m.rotation.y=ry; scene.add(m); return m;
  };

  for(let si=0; si<pts2d.length; si++){
    const [x0,z0]=pts2d[si], [x1,z1]=pts2d[(si+1)%pts2d.length];
    const dx=x1-x0, dz=z1-z0;
    const len=Math.sqrt(dx*dx+dz*dz);
    if(len<1.5) continue;
    const ux=dx/len, uz=dz/len;
    const nx=dz/len, nz=-dx/len;
    const ang=-Math.atan2(dz,dx);
    const midX=(x0+x1)/2, midZ=(z0+z1)/2;

    // ════════════════════════════════════════════════════════════════════════
    // MOD PERETE CORTINĂ — geam full-height cu mullioni verticali și orizontali
    // ════════════════════════════════════════════════════════════════════════
    if(isCurtainWall){
      const mullW=0.08, mullD=0.12;
      const transomH=0.10, transomD=0.08;
      const nPanels=Math.max(2, Math.floor(len/1.5));
      const panW=len/nPanels;
      const mullMat=new THREE.MeshStandardMaterial({color:'#6080a0',roughness:0.18,metalness:0.88});
      const transMat=new THREE.MeshStandardMaterial({color:'#5070a0',roughness:0.20,metalness:0.85,
        emissive:isNight2?new THREE.Color(0.02,0.04,0.12):new THREE.Color(0,0,0),emissiveIntensity:isNight2?0.6:0});

      // Geam de fundal full-height (un singur panel pe toată fațada)
      const bgGeo=new THREE.BoxGeometry(len-0.06, h-0.06, 0.03);
      const bgMat=new THREE.MeshStandardMaterial({
        color:new THREE.Color(isNight2?'#1a2840':'#2a5890'),
        roughness:0.04,metalness:0.75,
        emissive:new THREE.Color(isNight2?0.06:0.04,isNight2?0.12:0.08,isNight2?0.30:0.20),
        emissiveIntensity:isNight2?1.4:0.8,transparent:true,opacity:0.88});
      mkMesh(bgGeo,bgMat,midX+nx*C.reveal,base+h/2,midZ+nz*C.reveal,ang);

      // Mullioni verticali
      for(let p=0;p<=nPanels;p++){
        const u=p*panW;
        const mx2=x0+ux*u+nx*(C.reveal+mullD/2);
        const mz2=z0+uz*u+nz*(C.reveal+mullD/2);
        mkMesh(new THREE.BoxGeometry(mullW,h+0.1,mullD),mullMat,mx2,base+h/2,mz2,ang);
      }
      // Traverse orizontale (transom) la fiecare etaj
      for(let fl=0;fl<=nFloors;fl++){
        const ty=base+fl*realFH;
        const tx2=midX+nx*(C.reveal+transomD/2);
        const tz2=midZ+nz*(C.reveal+transomD/2);
        mkMesh(new THREE.BoxGeometry(len+0.06,transomH,transomD+0.04),transMat,tx2,ty,tz2,ang);
      }
      // Panouri de geam individuale cu variatie noapte
      for(let p=0;p<nPanels;p++){
        for(let fl=0;fl<nFloors;fl++){
          const u=(p+0.5)*panW;
          const gx=x0+ux*u+nx*C.reveal;
          const gz=z0+uz*u+nz*C.reveal;
          const gy=base+fl*realFH+realFH*0.5;
          const gW=panW-mullW-0.04, gH=realFH-transomH-0.04;
          // Variatie noaptea: unele geamuri aprinse (galben), altele stinse
          const seed=(si*100+p*13+fl*7);
          const rnd=_rng(seed);
          let gMat=glassMat;
          if(isNight2){
            gMat = rnd<0.55 ? glassWarmMat : (rnd<0.80 ? glassMat : glassDarkMat);
          }
          mkMesh(new THREE.BoxGeometry(gW,gH,0.025),gMat,gx,gy,gz,ang);
          // Punct de lumina interior noaptea (1 din 7 geamuri — era 1 din 3)
          if(isNight2 && rnd<0.15){
            const pl=new THREE.PointLight(rnd<0.2?'#ffe8a0':'#fff0d0',0.25,5);
            pl.position.set(gx-nx*0.5,gy,gz-nz*0.5); scene.add(pl);
          }
        }
      }
      continue; // skip window module pentru curtain wall
    }

    // ════════════════════════════════════════════════════════════════════════
    // MOD FERESTRE CLASICE — pilastri, benzi, module individuale
    // ════════════════════════════════════════════════════════════════════════

    // 1. Pilastri verticali (clasic/industrial)
    if(C.pilW > 0){
      const nPil=Math.floor(len/C.wGap)+1;
      const pilGap=len/(nPil-1||1);
      const pilMat=new THREE.MeshStandardMaterial({color:new THREE.Color(C.bandCol),roughness:0.72,metalness:0.06});
      for(let p=0;p<nPil;p++){
        const u=p*pilGap;
        mkMesh(new THREE.BoxGeometry(C.pilW,h,C.reveal*2+0.04),pilMat,
          x0+ux*u+nx*C.reveal,base+h/2,z0+uz*u+nz*C.reveal,ang);
      }
    }

    // 2. Benzi orizontale de planșeu
    for(let fl=1;fl<nFloors;fl++){
      const bY=base+fl*realFH;
      mkMesh(new THREE.BoxGeometry(len,C.bandH,C.bandD),bandMat,
        midX+nx*(C.reveal+C.bandD/2),bY,midZ+nz*(C.reveal+C.bandD/2),ang);
    }
    // Cornișă vârf
    mkMesh(new THREE.BoxGeometry(len,C.bandH*1.6,C.bandD*1.8),bandMat,
      midX+nx*(C.reveal+C.bandD*1.2),base+h,midZ+nz*(C.reveal+C.bandD*1.2),ang);

    // 3. Module fereastră per etaj
    const nWin=Math.max(1,Math.floor((len-C.wGap*0.5)/C.wGap));
    const xStep=len/nWin;
    const wOff=xStep/2;

    for(let fl=0;fl<nFloors;fl++){
      const flBase=base+fl*realFH;
      const wBot=flBase+(realFH-C.wH)*0.42;
      const wCy=wBot+C.wH/2;
      const spCy=flBase+realFH*0.12;

      for(let wi=0;wi<nWin;wi++){
        const u=wOff+wi*xStep;
        const wx=x0+ux*u+nx*C.reveal;
        const wz=z0+uz*u+nz*C.reveal;

        // Spandrel
        mkMesh(new THREE.BoxGeometry(xStep*0.88,realFH*0.22,0.04),spandrelMat,wx,spCy,wz,ang);
        // Ramă
        mkMesh(new THREE.BoxGeometry(C.wW+0.14,C.wH+0.14,C.frameD*2),frameMat,wx,wCy,wz,ang);
        // Geam cu variatie noapte
        const seed2=(si*100+wi*13+fl*7);
        const rnd2=_rng(seed2);
        let wMat=glassMat;
        if(isNight2) wMat=rnd2<0.5?glassWarmMat:rnd2<0.8?glassMat:glassDarkMat;
        mkMesh(new THREE.BoxGeometry(C.wW,C.wH,0.04),wMat,wx+nx*0.02,wCy,wz+nz*0.02,ang);
        // Montant + traversă
        if(C.wW>1.0) mkMesh(new THREE.BoxGeometry(0.06,C.wH-0.06,0.06),frameMat,wx,wCy,wz,ang);
        mkMesh(new THREE.BoxGeometry(C.wW+0.08,0.06,0.06),frameMat,wx,wCy,wz,ang);
        // Pervaz
        mkMesh(new THREE.BoxGeometry(C.wW+0.25,0.08,C.frameD*2.5),bandMat,wx,wBot-0.05,wz+nx*0.03,ang);
        // Panou lateral
        const panW2=xStep-C.wW-0.18;
        if(panW2>0.1){
          mkMesh(new THREE.BoxGeometry(panW2,C.wH*0.85,0.04),panelMat,
            x0+ux*(u+C.wW/2+panW2/2+0.09)+nx*C.reveal*0.5,wCy,
            z0+uz*(u+C.wW/2+panW2/2+0.09)+nz*C.reveal*0.5,ang);
        }
        // Lumina interioara noaptea (1 din 7 ferestre — era 1 din 3)
        if(isNight2 && rnd2<0.15){
          const pl=new THREE.PointLight('#ffe8b0',0.20,4);
          pl.position.set(wx-nx*0.4,wCy,wz-nz*0.4); scene.add(pl);
        }

        // 4. Balcon
        if(C.hasBalc && fl>0 && fl<nFloors-1){
          const bD=C.balcD||0.6;
          const balcX=x0+ux*u+nx*(bD/2+C.reveal+0.05);
          const balcZ=z0+uz*u+nz*(bD/2+C.reveal+0.05);
          const balcY=wBot-0.08;
          mkMesh(new THREE.BoxGeometry(C.wW+0.30,0.12,bD),balcMat,balcX,balcY,balcZ,ang);
          mkMesh(new THREE.BoxGeometry(C.wW*0.4,0.30,bD*0.7),balcMat,balcX,balcY-0.21,balcZ,ang);
          const nRail=Math.floor((C.wW+0.30)/0.25);
          const rStep2=(C.wW+0.28)/(nRail-1||1);
          for(let ri=0;ri<=nRail;ri++){
            const ru=-C.wW/2-0.12+ri*rStep2;
            mkMesh(new THREE.BoxGeometry(0.04,C.railH||0.85,0.04),railMat,
              x0+ux*(u+ru)+nx*(bD+C.reveal+0.05),balcY+(C.railH||0.85)/2,
              z0+uz*(u+ru)+nz*(bD+C.reveal+0.05),ang);
          }
          mkMesh(new THREE.BoxGeometry(C.wW+0.30,0.06,0.06),railMat,balcX,balcY+(C.railH||0.85),balcZ,ang);
          mkMesh(new THREE.BoxGeometry(C.wW+0.18,(C.railH||0.85)*0.75,0.02),glassMat,
            balcX,balcY+(C.railH||0.85)*0.45,balcZ,ang);
        }
      }
    }
  }
}

// ── Iluminare ──────────────────────────────────────────────────────────────
function _v3dApplyLight(preset,THREE,scene,r){
  scene.children.filter(c=>c.isLight).forEach(l=>scene.remove(l));
  const P={
    day:{
      sky:'#c8dff5',fog:'#c8dff5',
      amb:{c:'#d0e8ff',i:1.4},
      gnd:{c:'#a09060',i:0.6},
      sun:{c:'#fff8e0',i:5.5,p:[100,140,80]},
      fill:{c:'#80b8f0',i:1.4,p:[-80,60,-60]},
      rim:{c:'#ffe8a0',i:1.0,p:[-20,30,-100]},
      exp:1.8,night:false,fog:false
    },
    golden:{
      sky:'#f0b060',fog:'#e09040',
      amb:{c:'#ffa040',i:0.9},
      gnd:{c:'#603010',i:0.4},
      sun:{c:'#ff6010',i:4.5,p:[140,18,60]},
      fill:{c:'#a05020',i:0.8,p:[-60,40,-80]},
      rim:{c:'#ffcc80',i:1.2,p:[0,20,-120]},
      exp:1.6,night:false,fog:false
    },
    overcast:{
      sky:'#a8b8c8',fog:'#b0c0cc',
      amb:{c:'#c0ccd8',i:1.8},
      gnd:{c:'#707880',i:0.4},
      sun:{c:'#c0d0e0',i:1.2,p:[40,120,40]},
      fill:{c:'#90a8b8',i:1.0,p:[-40,60,-40]},
      rim:{c:'#c8d4dc',i:0.5,p:[0,40,-80]},
      exp:1.3,night:false,fog:true
    },
    night:{
      sky:'#02040c',fog:'#03060f',
      amb:{c:'#08102a',i:0.12},   // aproape negru — NUMAI emissive-ul luminează
      gnd:{c:'#020408',i:0.05},
      sun:{c:'#1a3080',i:0.3,p:[-40,120,30]}, // lună slabă, albăstruie, din sus
      fill:{c:'#0a1840',i:0.2,p:[-60,80,-40]}, // fill lunar — NU la sol
      rim:{c:'#2050c0',i:0.15,p:[60,50,-80]},
      exp:0.55,night:true,fog:true   // exposure scăzut → contrast dramatic
    },
  };
  const p=P[preset]||P.day;
  window._v3dNight=p.night;
  if(scene.background) scene.background.set(p.sky);
  // Fog: dezactivat la zi/golden, activ la overcast/noapte cu densitate mică
  if(p.fog){
    if(!scene.fog) scene.fog=new THREE.FogExp2(p.sky,0.0006);
    else { scene.fog.color.set(p.fog); scene.fog.density=0.0006; }
  } else {
    scene.fog=null; // fără fog la zi — clădirile sunt vizibile clar
  }
  const amb=new THREE.AmbientLight(p.amb.c,p.amb.i); scene.add(amb);
  const sun=new THREE.DirectionalLight(p.sun.c,p.sun.i);
  sun.position.set(...p.sun.p);
  // Noapte: soarele nu e vizibil — dezactivăm shadow map complet (luna nu aruncă umbre)
  // Zi/golden: umbra la 1024 în loc de 2048 — vizual identic de la distanță
  sun.castShadow = !p.night;
  sun.shadow.mapSize.width=sun.shadow.mapSize.height = p.night ? 512 : 1024;
  sun.shadow.camera.near=0.5; sun.shadow.camera.far=500;
  [-120,120,-120,120].forEach((v,i)=>{ if(i<2) sun.shadow.camera['left right'.split(' ')[i]]=v; else sun.shadow.camera['top bottom'.split(' ')[i-2]]=v; });
  sun.shadow.bias=-0.001; scene.add(sun);
  const fill=new THREE.DirectionalLight(p.fill.c,p.fill.i); fill.position.set(...p.fill.p); scene.add(fill);
  if(r) r.toneMappingExposure=p.exp;
  window._v3dNight = !!p.night;  // Setăm flag pentru materiale

  // Noapte: adăugăm lumini punctuale spectaculoase
  // IMPORTANT: folosim 'scene' (param), nu V3D.scene — funcționează și în capture silent
  const _nightScene = scene; // scene poate fi scena capture sau V3D.scene
  if(p.night && _nightScene){
    // ── Lumini de stradă — 6 în loc de 12: aceeași atmosferă, jumătate din cost GPU ──
    const streetPos=[
      [-40,9,-2],[40,9,-2],[0,9,-42],[0,9,42],
      [-28,8,28],[28,8,-28]
    ];
    streetPos.forEach(([x,y,z])=>{
      const pl=new THREE.PointLight('#ff9020',2.2,65,1.6); // intensitate ușor mai mare compensează numărul mai mic
      pl.position.set(x,y,z);
      _nightScene.add(pl);
    });

    // ── Lumini ferestre AEDIS — 2 per etaj (din 5), pas 6.4m (din 3.2m) ─
    // Vizual: același efect de „ferestre aprinse", GPU cost ~75% mai mic
    const maxH=Math.max(...(S.vol._lastFeats||[]).map(f=>f.properties?.top||0),8);
    for(let yy=3; yy<maxH; yy+=6.4){
      [[-2.5,yy,2.5],[2.5,yy,-2.5]].forEach(([x,y,z])=>{
        const il=new THREE.PointLight('#ffcc60', 1.1+Math.random()*0.6, 28, 1.4);
        il.position.set(x,y,z);
        _nightScene.add(il);
      });
    }

    // ── Lumini vitrine parter — 3 în loc de 6 (alternate) ───────────────
    [[-5,1.5,5],[5,1.5,-5],[0,1.5,7]].forEach(([x,y,z])=>{
      const vl=new THREE.PointLight('#fff0c0',3.0,24,1.6);
      vl.position.set(x,y,z);
      _nightScene.add(vl);
    });

    // ── Lumină lunară albăstruie din înalt ────────────────────────────
    const moon=new THREE.DirectionalLight('#4070d8',0.6);
    moon.position.set(-80,200,60);
    moon.castShadow=false;
    _nightScene.add(moon);

    // ── Fog densitate mică — ceață ușoară nocturnă ────────────────────
    if(scene.fog){ scene.fog.density=0.0012; }

    // ── Actualizare emissive materiale existente (schimbare din dropdown) ─
    scene.traverse(obj=>{
      if(!obj.isMesh || !obj.material) return;
      const m=obj.material;
      if(!m.emissive) return;
      // Detectăm dacă e fereastră (emissive intens) sau corp clădire
      const isWindow = m.emissiveIntensity > 0.5;
      if(isWindow){
        m.emissiveIntensity = Math.max(m.emissiveIntensity, 3.5);
      } else if(m.emissiveIntensity === 0){
        // Corp clădire — adaugăm strat minim pentru a nu fi complet negru
        if(m.color){
          const c = m.color.clone().multiplyScalar(0.04);
          m.emissive.copy(c);
          m.emissiveIntensity = 1.0;
        }
      }
      m.needsUpdate = true;
    });
  } else if(!p.night && V3D.scene){
    // ── Resetare emissive la zi ────────────────────────────────────────
    scene.traverse(obj=>{
      if(!obj.isMesh || !obj.material) return;
      const m=obj.material;
      if(!m.emissive) return;
      // Resetăm doar materialele care nu sunt ferestre native (au emissive mare)
      if(m.emissiveIntensity > 0 && m.emissiveIntensity < 1.5){
        m.emissive.set(0,0,0);
        m.emissiveIntensity = 0;
        m.needsUpdate = true;
      }
    });
  }
}

function _v3dLight(preset){
  if(!V3D.scene||!window.THREE) return;
  _v3dApplyLight(preset,window.THREE,V3D.scene,V3D.r);
  // Rebuildem materialele cu texturi de noapte/zi
  if(V3D.texCache){ Object.values(V3D.texCache).forEach(t=>t.dispose()); V3D.texCache={}; }
  // Actualizăm emissive pe meshurile AEDIS
  V3D.aedis.forEach(m=>{
    if(m.material?.map){ m.material.emissive=new THREE.Color(window._v3dNight?0.04:0,window._v3dNight?0.06:0,window._v3dNight?0.1:0); m.material.emissiveIntensity=window._v3dNight?0.5:0; m.material.needsUpdate=true; }
  });
}

function _v3dCtxViz(mode){
  V3D.ctx.forEach(m=>{
    m.visible=mode!=='hide';
    if(m.material) m.material.wireframe=mode==='wire';
  });
}

// ── Orbit controls ─────────────────────────────────────────────────────────
function _v3dUpdateCam(){
  if(!V3D.cam||!V3D.tx) return;
  const x=V3D.rad*Math.sin(V3D.ph)*Math.sin(V3D.th);
  const y=V3D.rad*Math.cos(V3D.ph);
  const z=V3D.rad*Math.sin(V3D.ph)*Math.cos(V3D.th);
  V3D.cam.position.set(V3D.tx.x+x,V3D.tx.y+y,V3D.tx.z+z);
  V3D.cam.lookAt(V3D.tx);
}

function _v3dResetCam(){
  V3D.th=Math.PI/4; V3D.ph=Math.PI/2.4;
  const maxH=Math.max(...(S.vol._lastFeats||[]).map(f=>f.properties?.top||0),8);
  const ap=S.parcels[S.activeParcel??0];
  const ring=ap?.geo?.geometry?.type==='Polygon'?ap.geo.geometry.coordinates[0]:ap?.geo?.geometry?.coordinates?.[0]?.[0]||[];
  const cy2=ring.reduce?.((s,c)=>s+c[1],0)/(ring.length||1)||0;
  const mLat=111320; const cx2=ring.reduce?.((s,c)=>s+c[0],0)/(ring.length||1)||0;
  const mLng=111320*Math.cos(cy2*Math.PI/180);
  const toLoc=([lng,lat])=>[(lng-cx2)*mLng,(lat-cy2)*mLat];
  const pts=ring.map?.(toLoc)||[];
  const parcelSz=Math.max(...pts.map(([x,z])=>Math.sqrt(x*x+z*z)),10);
  // Raza mai mică: 1.8x parcela (era 2.5x) — clădirile ocupă mai mult din ecran
  V3D.rad=Math.max(parcelSz*1.8,maxH*2.0,25);
  if(!V3D.tx) V3D.tx = new THREE.Vector3(0, maxH*0.35, 0);
  else V3D.tx.set(0, maxH*0.35, 0);
  if(V3D.tx) V3D.tx.set(0,maxH*0.35,0);
  _v3dUpdateCam();
}

function _v3dControls(canvas,cam){
  let drag=false,shft=false,lx=0,ly=0;
  const mu=()=>{drag=false;canvas.style.cursor='grab';};
  canvas.addEventListener('mousedown',e=>{drag=true;shft=e.shiftKey;lx=e.clientX;ly=e.clientY;canvas.style.cursor='grabbing';e.preventDefault();});
  const mm=e=>{if(!drag)return;const dx=(e.clientX-lx)*0.004,dy=(e.clientY-ly)*0.004;lx=e.clientX;ly=e.clientY;
    if(shft||e.buttons===4){const r2=new THREE.Vector3();r2.crossVectors(cam.getWorldDirection(new THREE.Vector3()),cam.up).normalize();V3D.tx.addScaledVector(r2,-dx*V3D.rad*0.4);V3D.tx.y+=dy*V3D.rad*0.4;}
    else{V3D.th-=dx;V3D.ph=Math.max(0.08,Math.min(Math.PI/2.05,V3D.ph+dy));}
    _v3dUpdateCam();};
  window.addEventListener('mousemove',mm); window.addEventListener('mouseup',mu);
  window.addEventListener('keydown',e=>{if(e.key==='Escape')drag=false;});
  canvas.addEventListener('contextmenu',e=>{e.preventDefault();drag=false;});
  canvas.addEventListener('wheel',e=>{e.preventDefault();V3D.rad=Math.max(5,Math.min(300,V3D.rad*(e.deltaY>0?1.08:0.93)));_v3dUpdateCam();},{passive:false});
  let ltd=0,ltx=0,lty=0;
  canvas.addEventListener('touchstart',e=>{if(e.touches.length===1){drag=true;lx=e.touches[0].clientX;ly=e.touches[0].clientY;}if(e.touches.length===2){const dx=e.touches[0].clientX-e.touches[1].clientX,dy=e.touches[0].clientY-e.touches[1].clientY;ltd=Math.sqrt(dx*dx+dy*dy);}},{passive:true});
  canvas.addEventListener('touchmove',e=>{e.preventDefault();if(e.touches.length===1&&drag){const dx=(e.touches[0].clientX-lx)*0.006,dy=(e.touches[0].clientY-ly)*0.006;V3D.th-=dx;V3D.ph=Math.max(0.08,Math.min(Math.PI/2.05,V3D.ph+dy));lx=e.touches[0].clientX;ly=e.touches[0].clientY;_v3dUpdateCam();}if(e.touches.length===2){const dx=e.touches[0].clientX-e.touches[1].clientX,dy=e.touches[0].clientY-e.touches[1].clientY;const d=Math.sqrt(dx*dx+dy*dy);V3D.rad=Math.max(5,Math.min(300,V3D.rad*(ltd/Math.max(1,d))));ltd=d;_v3dUpdateCam();}},{passive:false});
  canvas.addEventListener('touchend',()=>{drag=false;});
  V3D._cleanup=()=>{ window.removeEventListener('mousemove',mm); window.removeEventListener('mouseup',mu); };
}


// ── Refresh slider cu captură din viewer 3D ──────────────────────────────────
