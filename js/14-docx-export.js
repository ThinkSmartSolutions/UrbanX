// ── FALLBACK getFinanciarConfig (daca nu e definita in 00-globals) ──────────
if(typeof getFinanciarConfig === 'undefined'){
  window.getFinanciarConfig = function(){
    // Încearcă să preia din S_UAT dacă există, altfel defaulturi naționale
    const f = (typeof S_UAT !== 'undefined' && S_UAT.financiar) ? S_UAT.financiar : {};
    return {
      pretConstructie: f.pretConstructie || 700,   // EUR/mp SDA
      pretTeren:       f.pretTeren       || 800,   // EUR/mp teren
      chirieRef:       f.chirieRef       || 50,    // EUR/mp/luna
      pretVanzare:     f.pretVanzare     || 1800,  // EUR/mp vanzare
    };
  };
}

// UrbanX — Motor export Word (.docx) + Modal parametri editabili
// Foloseste biblioteca docx.js (Office Open XML, browser-compatible)
// ════════════════════════════════════════════════════════════════════════════

// ── 1. LOADER CDN ─────────────────────────────────────────────────────────
async function _ensureDocxLib(){
  if(window._docxLoaded) return true;
  return new Promise((res,rej)=>{
    const s=document.createElement('script');
    // jsdelivr — CDN public, nu necesita API key
    s.src='https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.js';
    s.onload=()=>{window._docxLoaded=true;res(true);};
    s.onerror=()=>{
      // fallback unpkg
      const s2=document.createElement('script');
      s2.src='https://unpkg.com/docx@8.5.0/build/index.js';
      s2.onload=()=>{window._docxLoaded=true;res(true);};
      s2.onerror=()=>rej(new Error('Nu s-a putut încărca docx.js — verificați conexiunea la internet.'));
      document.head.appendChild(s2);
    };
    document.head.appendChild(s);
  });
}

// ── 2. CONSTANTE LAYOUT A4 ────────────────────────────────────────────────
// A4: 11906 DXA lațime; margini 1440 DXA (2.54cm) fiecare parte
// Lațime conținut: 11906 - 2*1440 = 9026 DXA
const _DX = {
  PAGE_W: 11906,
  PAGE_H: 16838,
  MARGIN: 1440,
  CONTENT: 9026,
  // Culori (hex fără #)
  NAVY:   '0E2448',
  BLUE:   '14326A',
  GOLD:   'C49206',
  DARK:   '050E1E',
  GRAY:   '5A6878',
  LGRAY:  'E2E6EE',
  WHITE:  'FFFFFF',
  GREEN:  '0E6432',
  RED:    '9E1414',
  ORANGE: 'A84C04',
};

// ── 3. HELPER: stiluri document ───────────────────────────────────────────
function _dxGetStyles(){
  const {LevelFormat,AlignmentType}=window.docx;
  return {
    styles:{
      default:{
        document:{run:{font:'Calibri',size:22}},  // 11pt
      },
      paragraphStyles:[
        {id:'Heading1',name:'Heading 1',basedOn:'Normal',next:'Normal',quickFormat:true,
         run:{size:28,bold:true,font:'Calibri',color:_DX.NAVY},
         paragraph:{spacing:{before:300,after:120},outlineLevel:0,
           border:{bottom:{style:'single',size:6,color:_DX.GOLD,space:4}}}},
        {id:'Heading2',name:'Heading 2',basedOn:'Normal',next:'Normal',quickFormat:true,
         run:{size:24,bold:true,font:'Calibri',color:_DX.BLUE},
         paragraph:{spacing:{before:200,after:80},outlineLevel:1}},
        {id:'Heading3',name:'Heading 3',basedOn:'Normal',next:'Normal',quickFormat:true,
         run:{size:22,bold:true,font:'Calibri',color:_DX.GRAY},
         paragraph:{spacing:{before:160,after:60},outlineLevel:2}},
        {id:'TableHeader',name:'Table Header',basedOn:'Normal',next:'Normal',
         run:{size:20,bold:true,font:'Calibri',color:_DX.WHITE}},
        {id:'Caption',name:'Caption',basedOn:'Normal',next:'Normal',
         run:{size:18,italics:true,font:'Calibri',color:_DX.GRAY}},
      ]
    },
    numbering:{
      config:[
        {reference:'bullets',levels:[{level:0,format:LevelFormat.BULLET,text:'•',
          alignment:AlignmentType.LEFT,
          style:{paragraph:{indent:{left:720,hanging:360}},run:{font:'Calibri',size:22}}}]},
        {reference:'numbered',levels:[{level:0,format:LevelFormat.DECIMAL,text:'%1.',
          alignment:AlignmentType.LEFT,
          style:{paragraph:{indent:{left:720,hanging:360}},run:{font:'Calibri',size:22}}}]},
      ]
    }
  };
}

// ── 4. HELPERS ELEMENTE ────────────────────────────────────────────────────
function _dxH1(text){
  const {Paragraph,TextRun,HeadingLevel}=window.docx;
  return new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun(String(text||''))]});
}
function _dxH2(text){
  const {Paragraph,TextRun,HeadingLevel}=window.docx;
  return new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun(String(text||''))]});
}
function _dxH3(text){
  const {Paragraph,TextRun,HeadingLevel}=window.docx;
  return new Paragraph({heading:HeadingLevel.HEADING_3,children:[new TextRun(String(text||''))]});
}
function _dxP(text,{bold=false,italic=false,color='',size=22,before=60,after=60,align=''}={}){
  const {Paragraph,TextRun,AlignmentType}=window.docx;
  return new Paragraph({
    spacing:{before,after},
    ...(align?{alignment:align==='center'?AlignmentType.CENTER:align==='right'?AlignmentType.RIGHT:AlignmentType.LEFT}:{}),
    children:[new TextRun({text:String(text||''),bold,italics:italic,color:color||undefined,size,font:'Calibri'})]
  });
}
function _dxBr(){
  const {Paragraph,PageBreak}=window.docx;
  return new Paragraph({children:[new PageBreak()]});
}
function _dxEmpty(n=1){
  const {Paragraph}=window.docx;
  return Array.from({length:n},()=>new Paragraph({spacing:{before:60,after:60},children:[]}));
}

// Tabel cu header colorat + rânduri alternante
function _dxTable(headers,rows,colW){
  const {Table,TableRow,TableCell,Paragraph,TextRun,WidthType,ShadingType,BorderStyle,VerticalAlign}=window.docx;
  const totalW=colW.reduce((a,b)=>a+b,0);
  const border={style:BorderStyle.SINGLE,size:1,color:'CCCCCC'};
  const borders={top:border,bottom:border,left:border,right:border};
  const cellMargins={top:80,bottom:80,left:120,right:120};

  const makeCell=(txt,w,isHdr,isAlt)=>new TableCell({
    width:{size:w,type:WidthType.DXA},
    borders,
    margins:cellMargins,
    verticalAlign:VerticalAlign.CENTER,
    shading:isHdr?{fill:_DX.NAVY,type:ShadingType.CLEAR}:
            isAlt?{fill:'F0F4FA',type:ShadingType.CLEAR}:
                  {fill:_DX.WHITE,type:ShadingType.CLEAR},
    children:[new Paragraph({spacing:{before:40,after:40},children:[
      new TextRun({text:String(txt??'—'),font:'Calibri',size:isHdr?20:20,
        bold:isHdr,color:isHdr?_DX.WHITE:'222222'})
    ]})]
  });

  const headerRow=new TableRow({
    tableHeader:true,
    children:headers.map((h,i)=>makeCell(h,colW[i],true,false))
  });
  const dataRows=rows.map((row,ri)=>new TableRow({
    children:row.map((cell,ci)=>makeCell(cell,colW[ci],false,ri%2===1))
  }));

  return new Table({
    width:{size:totalW,type:WidthType.DXA},
    columnWidths:colW,
    rows:[headerRow,...dataRows]
  });
}

// Lista cu bullets
function _dxBullets(items){
  const {Paragraph,TextRun}=window.docx;
  return items.map(item=>new Paragraph({
    numbering:{reference:'bullets',level:0},
    spacing:{before:40,after:40},
    children:[new TextRun({text:String(item||''),font:'Calibri',size:22})]
  }));
}

// Separator linie
function _dxLine(color=_DX.GOLD){
  const {Paragraph}=window.docx;
  return new Paragraph({
    spacing:{before:80,after:80},
    border:{bottom:{style:'single',size:6,color,space:1}},
    children:[]
  });
}

// Metadata header (titlu studiu)
function _dxCover(studyName,subtitle,meta){
  const {Paragraph,TextRun,AlignmentType}=window.docx;
  const items=[
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:600,after:100},
      children:[new TextRun({text:'URBANX',font:'Calibri',size:28,bold:true,color:_DX.GOLD})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:60},
      children:[new TextRun({text:'PLATFORMĂ NAȚIONALĂ DE ANALIZĂ URBANISTICĂ',font:'Calibri',size:20,color:_DX.GRAY})]}),
    _dxLine(),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:200,after:80},
      children:[new TextRun({text:studyName.toUpperCase(),font:'Calibri',size:36,bold:true,color:_DX.NAVY})]}),
    ...(subtitle?[new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:200},
      children:[new TextRun({text:subtitle,font:'Calibri',size:24,italics:true,color:_DX.BLUE})]})]:[]),
    _dxLine(),
  ];
  // Metadata tabel
  if(meta&&meta.length){
    const {Table,TableRow,TableCell,WidthType,ShadingType,BorderStyle}=window.docx;
    const bdr={style:BorderStyle.SINGLE,size:1,color:'CCCCCC'};
    const borders={top:bdr,bottom:bdr,left:bdr,right:bdr};
    const metaRows=meta.map(([l,v])=>new TableRow({children:[
      new TableCell({width:{size:3200,type:WidthType.DXA},borders,margins:{top:80,bottom:80,left:120,right:120},
        shading:{fill:'EFF3FA',type:ShadingType.CLEAR},
        children:[new Paragraph({children:[new TextRun({text:String(l||''),font:'Calibri',size:20,bold:true,color:_DX.BLUE})]})]
      }),
      new TableCell({width:{size:5826,type:WidthType.DXA},borders,margins:{top:80,bottom:80,left:120,right:120},
        children:[new Paragraph({children:[new TextRun({text:String(v||'—'),font:'Calibri',size:20})]})]
      }),
    ]}));
    items.push(new Table({width:{size:9026,type:WidthType.DXA},columnWidths:[3200,5826],rows:metaRows}));
  }
  items.push(_dxBr());
  return items;
}

// Notă de disclaimer
function _dxDisclaimer(){
  return _dxP('NOTĂ: Prezentul document este ORIENTATIV și a fost generat automat de platforma UrbanX TSS·FG. Nu înlocuiește documentațiile tehnice avizate conform Legii 50/1991 și Legii 350/2001. Valorile sunt estimative — devizul și studiile detaliate obligatorii se elaborează de specialiști atestați.',
    {italic:true,color:_DX.GRAY,size:18,before:200,after:100});
}

// ── 5. GENERARE DOCX FEZABILITATE (COMPLET, CU PARAMETRI EDITABILI) ────────
async function generateFezabilitateDocx(userParams={}){
  try{
    ss('Se încarcă biblioteca Word (docx.js)...');
    await _ensureDocxLib();
    ss('Se generează documentul Word...');

    const {Document,Packer}=window.docx;
    const ap=S.parcels[S.activeParcel??0];
    if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}

    // Date de baza
    const nrcad=ap?.nrcad||'—';
    const utr=ap?.utr||'—';
    const area=ap?.area?ap.area.toFixed(0):'—';
    const areaNum=parseFloat(area)||300;
    const lat=ap?turf.centerOfMass(ap.geo).geometry.coordinates[1]:47.16;
    const lon=ap?turf.centerOfMass(ap.geo).geometry.coordinates[0]:27.59;
    const params=ap?.params||getDefaultParams(utr);
    const uat=getUATLabel();
    const judet=getUATJudet();
    const dateStr=new Date().toLocaleDateString('ro-RO',{day:'2-digit',month:'long',year:'numeric'});
    const scMax=Math.round(areaNum*parseFloat(params?.pot||35)/100);
    const sdTotal=Math.round(areaNum*parseFloat(params?.cut||1.0));
    const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13.2;
    const niv=Math.max(1,Math.ceil(aedisH/3));
    const svMin=Math.round(areaNum*parseFloat(params?.sv||20)/100);
    const pkMin=Math.max(2,Math.ceil(sdTotal/120)*parseInt(params?.pk||1));
    const fnLabel=params?.fn_label||'Locuire colectivă / Mixt';
    const seismCfg=getSeismConfig();

    // Parametri financiari — DEFAULT din config UAT, SUPRASCRIȘI de utilizator
    const _fc=getFinanciarConfig();
    const pretConstr   = parseFloat(userParams.pretConstr   || _fc.pretConstructie);
    const pretTeren    = parseFloat(userParams.pretTeren    || _fc.pretTeren);
    const chirieRef    = parseFloat(userParams.chirieRef    || _fc.chirieRef);
    const pretVanzare  = parseFloat(userParams.pretVanzare  || _fc.pretVanzare  || pretConstr*1.4);
    const rataOcupare  = parseFloat(userParams.rataOcupare  || 85) / 100;
    const costConstr   = Math.round(sdTotal * pretConstr);
    const costTeren    = Math.round(areaNum * pretTeren);
    const costTotal    = Math.round((costConstr + costTeren) * 1.25);
    const venitAn      = Math.round(sdTotal * rataOcupare * chirieRef * 12);
    const venitVanzare = Math.round(sdTotal * rataOcupare * pretVanzare);
    const rentabilitate= ((venitAn/costTotal)*100).toFixed(1);
    const payback      = Math.ceil(costTotal/venitAn);

    // Trafic + ISU estimari
    const pkMinF=pkMin;
    const totalZilnicF=Math.ceil(sdTotal/80)*8;
    const isISUOblig=(aedisH>8||sdTotal>600);
    const catGeoF=aedisH>28?'3 — Complexă':aedisH>10?'2 — Curentă':'1 — Simplă';
    const costGeoF=catGeoF.includes('3')?8000:catGeoF.includes('2')?3500:1500;
    function solarAltFz(lt,month,hour){const D2R=Math.PI/180;const decl=(-23.45*Math.cos(D2R*(360/365)*(month*30+10)))*D2R;const ha=(hour-12)*15*D2R;return Math.max(0,Math.asin(Math.sin(lt*D2R)*Math.sin(decl)+Math.cos(lt*D2R)*Math.cos(decl)*Math.cos(ha))*180/Math.PI);}
    const altDec12=solarAltFz(lat,11,12);
    const vantCfg=getVantConfig();
    const zgomCfg=getZgomotConfig();
    const qpH=(vantCfg.presiune_vant||0.55)*Math.pow(aedisH/10,0.3)*1.15;

    const styles=_dxGetStyles();
    const children=[];

    // ── COVER ──────────────────────────────────────────────────────────────
    children.push(..._dxCover(
      'Studiu de Prefezabilitate / Fezabilitate / DALI',
      'conf. HG 907/2016 · Document Orientativ',
      [
        ['Nr. cadastral',nrcad],
        ['UAT / Localitate',uat],
        ['Județ',judet],
        ['Zonă UTR',utr],
        ['Suprafață teren',areaNum+' mp'],
        ['Funcțiune propusă',fnLabel],
        ['Regim înălțime propus','P+'+(niv-1)+' (H='+aedisH.toFixed(1)+'m)'],
        ['POT/CUT max RLU',params?.pot+'% / '+params?.cut],
        ['Data elaborare',dateStr],
        ['Tip document','SF (construcție nouă) / DALI (intervenție existentă)'],
        ['Parametri financiari','Preț constr.: '+pretConstr+' EUR/mp · Teren: '+pretTeren+' EUR/mp · Chirie: '+chirieRef+' EUR/mp/lună'],
        [userParams.pretVanzare?'Preț vânzare (PERSONALIZAT)':'Preț vânzare estimat',pretVanzare+' EUR/mp'],
      ]
    ));

    // ── PAG 2: DATE IDENTIFICARE + INDICATORI PUG ──────────────────────────
    children.push(_dxH1('1. DATE DE IDENTIFICARE ȘI INDICATORI URBANISTICI PUG'));
    children.push(_dxTable(
      ['Parametru','Valoare','Baza de calcul','Observații'],
      [
        ['Suprafață construită la sol (SC)',scMax+' mp (POT='+params?.pot+'%)','RLU UTR '+utr,'Estimativ'],
        ['Suprafață desfășurată totală (SDA)',sdTotal+' mp (CUT='+params?.cut+')','RLU UTR '+utr,'Estimativ'],
        ['Înălțime maximă propusă',aedisH.toFixed(1)+' m (P+'+(niv-1)+' niv.)','Conf. AEDIS 3D','Orientativ'],
        ['Spații verzi minime',svMin+' mp ('+params?.sv+'%)','RLU UTR '+utr,'Obligatoriu'],
        ['Parcaje minime obligatorii',pkMin+' locuri ('+params?.pk+'/unit.)','NP 051/2012','Verificare'],
        ['Retragere față stradă',params?.rf+' m','RLU UTR '+utr,'Obligatoriu'],
        ['Retragere laterală',params?.rl+' m','RLU UTR '+utr,'Obligatoriu'],
        ['Retragere spate (posterior)',params?.rs+' m','RLU UTR '+utr,'Obligatoriu'],
        ['Coordonate GPS',lat.toFixed(5)+'°N / '+lon.toFixed(5)+'°E','UrbanX GIS','Cadastru'],
        ['Funcțiuni admise','Conf. UTR '+utr,'PUG '+uat,'Verificare PUG'],
      ],
      [2900,1800,2100,2226]
    ));
    children.push(..._dxEmpty());

    // ── PAG 3: VARIANTE TEHNICE ─────────────────────────────────────────────
    children.push(_dxBr());
    children.push(_dxH1('2. PROPUNEREA DE INVESTIȚIE — VARIANTE TEHNICE COMPARATE'));
    children.push(_dxP('Trei scenarii tehnice au fost analizate pentru amplasamentul '+nrcad+'. Scenariul S2 este recomandat ca echilibru optim între densitate, rentabilitate și conformitate cu PUG.',{before:80,after:100}));
    const sc1=Math.round(scMax*0.7),sda1=Math.round(sdTotal*0.7);
    const sc2=scMax,sda2=sdTotal;
    const sc3=Math.round(scMax*0.9),sda3=Math.round(sdTotal*1.1);
    children.push(_dxTable(
      ['Scenariu','SC (mp)','SDA (mp)','H max','Cost estimat','Rentabilitate'],
      [
        ['S1 — Conservator',sc1+'',sda1+'',Math.round(aedisH*0.75)+'m',Math.round(sda1*pretConstr/1000)+' kEUR',((sda1*rataOcupare*chirieRef*12)/(sda1*pretConstr*1.25+costTeren)/1000).toFixed(1)+'%'],
        ['S2 — Recomandat ★',sc2+'',sda2+'',aedisH.toFixed(0)+'m',Math.round(sda2*pretConstr/1000)+' kEUR',rentabilitate+'%'],
        ['S3 — Maxim RLU',sc3+'',sda3+'',params?.h||aedisH.toFixed(0)+'m',Math.round(sda3*pretConstr/1000)+' kEUR',((sda3*rataOcupare*chirieRef*12)/(sda3*pretConstr*1.25+costTeren)/1000).toFixed(1)+'%'],
      ],
      [2400,1200,1200,1000,1612,1614]
    ));
    children.push(..._dxEmpty());

    // ── PAG 4: INDICATORI TEHNICO-ECONOMICI (editabili!) ────────────────────
    children.push(_dxBr());
    children.push(_dxH1('3. INDICATORI TEHNICO-ECONOMICI — ESTIMARE ORIENTATIVĂ'));
    if(Object.keys(userParams).length>0){
      children.push(_dxP('⚠ Parametrii financiari au fost PERSONALIZAȚI de utilizator față de valorile statistice UAT '+uat+'.',
        {bold:true,color:_DX.ORANGE,before:80,after:80}));
    }
    children.push(_dxTable(
      ['Indicator tehnico-economic','UM','Valoare estimativă','Baza de calcul'],
      [
        ['Suprafață teren (ST)','mp',areaNum+'','Extras CF'],
        ['Suprafață construită la sol (SC)','mp',scMax+'','POT='+params?.pot+'% × ST'],
        ['Suprafață desfășurată totală (SDA)','mp',sdTotal+'','CUT='+params?.cut+' × ST'],
        ['Nr. niveluri (regim înălțime)','niv.','P+'+(niv-1),'Conf. AEDIS / RLU'],
        ['Înălțime maximă (Hmax)','m',aedisH.toFixed(1),'Conf. AEDIS orientativ'],
        ['Nr. locuri parcare obligatorii','locuri',pkMin+'','NP 051/2012 + RLU'],
        ['──────── PARAMETRI FINANCIARI ────────','','',''],
        ['Preț construcție'+(userParams.pretConstr?' (PERSONALIZAT)':' (medie UAT)'),'EUR/mp SDA',pretConstr+'',userParams.pretConstr?'Valoare introdusă manual':'Media statistică '+uat],
        ['Preț teren'+(userParams.pretTeren?' (PERSONALIZAT)':' (medie UAT)'),'EUR/mp teren',pretTeren+'',userParams.pretTeren?'Valoare introdusă manual':'Media statistică '+uat],
        ['Chirie referință'+(userParams.chirieRef?' (PERSONALIZATĂ)':' (medie UAT)'),'EUR/mp/lună',chirieRef+'',userParams.chirieRef?'Valoare introdusă manual':'Media statistică '+uat],
        ['Preț vânzare'+(userParams.pretVanzare?' (PERSONALIZAT)':' (estimat)'),'EUR/mp',pretVanzare+'',userParams.pretVanzare?'Valoare introdusă manual':'Estimat ~1.4x preț constr.'],
        ['Rată ocupare asumată','%',(rataOcupare*100).toFixed(0)+'',userParams.rataOcupare?'Valoare introdusă manual':'Standard SF (85%)'],
        ['──────── COSTURI TOTALE ────────','','',''],
        ['Valoare estimativă construcție','EUR',costConstr.toLocaleString(),pretConstr+' EUR/mp × '+sdTotal+' mp SDA'],
        ['Valoare estimativă teren','EUR',costTeren.toLocaleString(),pretTeren+' EUR/mp × '+areaNum+' mp teren'],
        ['Diverse, neprevăzute, proiectare (25%)','EUR',Math.round((costConstr+costTeren)*0.25).toLocaleString(),'25% total'],
        ['VALOARE TOTALĂ INVESTIȚIE','EUR',costTotal.toLocaleString(),'Total estimativ (±25-30%)'],
        ['Valoare investiție / mp SDA','EUR/mp',Math.round(costTotal/sdTotal)+'','Indice de cost /mp SDA'],
        ['──────── VENITURI ESTIMATE ────────','','',''],
        ['Venit anual din CHIRIE','EUR/an',venitAn.toLocaleString(),chirieRef+' EUR/mp/lună × '+Math.round(sdTotal*rataOcupare)+' mp × 12 luni'],
        ['Venit din VÂNZARE (scenariul de vânzare)','EUR',venitVanzare.toLocaleString(),pretVanzare+' EUR/mp × '+Math.round(sdTotal*rataOcupare)+' mp'],
        ['Randament brut (ROI chirie anuală)','%',rentabilitate,'Venit anual / Investiție totală'],
        ['Perioadă recuperare investiție (chirie)','ani',payback+'','Payback period simplu'],
        ['Profit estimat la vânzare','EUR',(venitVanzare-costTotal).toLocaleString(),'Vânzare − Investiție totală'],
      ],
      [3600,900,1800,2726]
    ));
    children.push(..._dxEmpty());

    // ── PAG 5: ANALIZA FINANCIARA + SURSE ──────────────────────────────────
    children.push(_dxBr());
    children.push(_dxH1('4. ANALIZA FINANCIARĂ — FLUX DE NUMERAR ESTIMATIV'));
    children.push(_dxTable(
      ['An','Investiție (EUR)','Venit estimat (EUR)','Cheltuieli op. (EUR)','Cash flow net (EUR)','Recuperare (%)'],
      [0,1,2,3,5,7,10,15,20].map(an=>{
        const ven=an===0?0:Math.round(venitAn*(1+0.03*an));
        const chelt=an===0?0:Math.round(ven*0.25);
        const cf=an===0?-costTotal:ven-chelt;
        const recup=Math.min(100,Math.round(((ven*(an||1))/costTotal)*100));
        return ['An '+(an||0),an===0?'-'+costTotal.toLocaleString():'-',
          an===0?'-':ven.toLocaleString(),an===0?'-':chelt.toLocaleString(),
          cf.toLocaleString(),an===0?'0%':recup+'%'];
      }),
      [900,1800,1800,1800,1800,1926]
    ));
    children.push(..._dxEmpty());
    children.push(_dxH2('4.1. Surse de finanțare identificate'));
    children.push(_dxTable(
      ['Sursă de finanțare','Tip','Valoare est. (EUR)','Condiții principale'],
      [
        ['Fonduri proprii investitor','Propriu',Math.round(costTotal*0.3).toLocaleString(),'Minim 20-30% capital propriu'],
        ['Credit bancar (ipotecar)','Bancar',Math.round(costTotal*0.5).toLocaleString(),'Dobândă 6-9% (2024), termen 15-25 ani'],
        ['Fonduri europene (POR 2021-2027)','UE','—','Conf. axă prioritară — eligibilitate specifică'],
        ['Leasing imobiliar','Financiar','—','Alternativă credit clasic — termen 10-20 ani'],
      ],
      [2800,1200,1800,3226]
    ));
    children.push(..._dxEmpty());

    // ── PAG 6: MATRICEA DE RISC ─────────────────────────────────────────────
    children.push(_dxBr());
    children.push(_dxH1('5. MATRICEA DE RISC A INVESTIȚIEI'));
    children.push(_dxTable(
      ['Tip risc','Probabilitate','Impact','Nivel risc','Măsuri de mitigare'],
      [
        ['Risc urbanistic (modificare PUG)','Redusă (5%)','Major','Scăzut','Verificare PUG în vigoare + CU înainte de achiziție teren'],
        ['Risc tehnic geotehnic (teren slab)','Medie (20%)','Major','Mediu','Studiu geotehnic detaliat înainte de proiect structural'],
        ['Risc permitting (avize întârziate)','Medie (30%)','Mediu','Mediu','Pregătire dosar complet + consultant autorizații'],
        ['Risc financiar (creștere costuri)','Ridicată (40%)','Major','Ridicat','Rezervă contingență 15-20% + contracte prețuri ferme'],
        ['Risc de piață (cerere imobiliară)','Medie (25%)','Major','Mediu','Analiză piață detaliată + pre-vânzări / pre-închirieri'],
        ['Risc juridic (litigii proprietate)','Redusă (5%)','Major','Scăzut','Verificare completă CF + expertiză juridică teren'],
        ['Risc seismic (zona '+seismCfg.zona+', ag='+seismCfg.ag+'g)','Certitudine','Variabil','Mediu','Structură antiseismică conf. P100-1/2013'],
        ['Risc prețuri constr. (+20% față de estimat)','Medie (35%)','Major','Mediu','Contingență 15% inclusă în buget'],
      ],
      [2000,1200,1100,1100,3626]
    ));
    children.push(..._dxEmpty());

    // ── PAG 7: CALENDAR IMPLEMENTARE ──────────────────────────────────────
    children.push(_dxBr());
    children.push(_dxH1('6. CALENDARUL DE IMPLEMENTARE A INVESTIȚIEI'));
    children.push(_dxTable(
      ['Fază / Etapă','Durată','Documente necesare','Responsabil'],
      [
        ['FAZA 0 — Pre-achiziție teren','0-2 luni','Verificare CF + Plan cadastral + PUG + CU informativ','Beneficiar + jurist'],
        ['FAZA 1 — Achiziție / asigurare teren','1-3 luni','Contract vânzare-cumpărare + Intabulare CF','Beneficiar + notar'],
        ['FAZA 2 — Certificat Urbanism (CU)','1-2 luni','Cerere CU + Plan situație + Acte proprietate','Beneficiar la Primărie'],
        ['FAZA 3 — Studii de bază','2-4 luni','Studiu geotehnic + Relevee + Studii specialitate CU','Specialiști atestați'],
        ['FAZA 4 — Proiect PAC/DTAC','3-6 luni','DTAC complet + toate planele + memorii tehnice','Arhitect OAR + ingineri'],
        ['FAZA 5 — Obținere avize','2-4 luni','Avize din CU: ISU, E-ON, RAJA, AACR, DJCPN etc.','Arhitect + beneficiar'],
        ['FAZA 6 — Autorizație de Construire (AC)','1-2 luni','Dosar AC complet la Primăria '+uat,'Beneficiar'],
        ['FAZA 7 — Proiect Tehnic (PT) + DDE','3-6 luni','PT complet + detalii de execuție','Arhitect OAR + ingineri'],
        ['FAZA 8 — Licitație antreprenor','1-3 luni','Caiet sarcini + documentație licitație','Beneficiar + jurist'],
        ['FAZA 9 — Execuție construcție',Math.round(sdTotal/300)+'-'+Math.round(sdTotal/200)+' luni','Contract antreprenor + diriginte + RTE','Antreprenor CL/CQ'],
        ['FAZA 10 — Recepție + Intabulare','1-2 luni','PV recepție + CF actualizat','Beneficiar + comisie'],
        ['TOTAL ESTIMAT','~'+(12+Math.ceil(sdTotal/200))+'-'+(24+Math.ceil(sdTotal/150))+' luni','—','—'],
      ],
      [2200,1000,4000,1826]
    ));
    children.push(..._dxEmpty());

    // ── PAG 8: AVIZE NECESARE ──────────────────────────────────────────────
    children.push(_dxBr());
    children.push(_dxH1('7. AVIZE ȘI ACORDURI NECESARE — CONF. LEGII 50/1991'));
    children.push(_dxP('Lista completă a avizelor se stabilește prin Certificatul de Urbanism. Lista de mai jos este orientativă pentru funcțiunea '+fnLabel+' în UTR '+utr+'.',{before:80,after:100}));
    children.push(_dxTable(
      ['Aviz / Acord','Emitent','Obligativitate','Termen'],
      [
        ['E-ON Moldova / furnizor electricitate','Operatorul de rețea','Obligatoriu','30-60 zile'],
        ['Delgaz Grid (gaz natural, dacă se prevede)','Delgaz Grid SA','Oblig. (dacă gaz)','30-60 zile'],
        ['RAJA SA Iași (apă-canal)','RAJA Iași','Obligatoriu','30-60 zile'],
        ['ISU Moldova (PSI — P.S.I.)',isISUOblig?'ISU Moldova — OBLIGATORIU':'ISU Moldova',isISUOblig?'OBLIGATORIU (H>8m / SD>600mp)':'Verificare CU','30-60 zile'],
        ['AACR / ROMATSA (dist.<15km LRIA)','ROMATSA + AACR','Dacă în zona de protecție aeroport','30-90 zile'],
        ['DJCPN Iași (dacă în ZCP sau zonă monument)','DJCPN Iași','Dacă UTR cu patrimoniu','30-60 zile'],
        ['APM Iași (dacă SD>1000mp sau curs de apă)','APM Iași','Dacă se depășesc praguri','30-60 zile'],
        ['DSP Iași (sănătate publică)','DSP Iași','La locuire + dotări medicale','15-30 zile'],
        ['CFR / CNADNR (dacă adiac. cale ferată/drum)','CFR / CNADNR','Dacă adiacentă','30-60 zile'],
      ],
      [2900,2100,2000,1126 +(2*900-900)]
    ));
    children.push(..._dxEmpty());

    // ── PAG 9: SINTEZA STUDII — TRAFIC + ISU ──────────────────────────────
    children.push(_dxBr());
    children.push(_dxH1('8. SINTEZA STUDIILOR TEHNICE DE SPECIALITATE'));
    children.push(_dxH2('8.1. Impact trafic — concluzii sintetice'));
    children.push(_dxTable(
      ['Indicator trafic','Valoare estimată','Cerință normativă','Status'],
      [
        ['Trafic generat estimat zilnic',totalZilnicF+' veh/zi','Conf. ITE TG11','Orientativ'],
        ['Trafic oră de vârf seara (17-18h)',Math.ceil(totalZilnicF*0.12)+' veh/h','LOS C recomandat','Verificare'],
        ['Locuri de parcare obligatorii',pkMinF+' locuri ('+params?.pk+'/unit.)','NP 051/2012 + RLU','Obligatoriu'],
        ['Locuri PMR (4% din total)',Math.max(1,Math.ceil(pkMinF*0.04))+' locuri','NP 051/2012 art. 5','Obligatoriu'],
        ['Suprafață parcare estimată',pkMinF*30+' mp (la sol)','Inclus bilanț SF','Verificare proiect'],
        ['Acces auto (lățime minimă)','min. 3.5m (1 sens) / 6m (2 sensuri)','SR 4032-1','Proiect specific'],
        ['Stații EV recomandate (10%)',Math.max(1,Math.ceil(pkMinF*0.1))+' prize 22kW','Reg. UE 2023/1804','Recomandare EU'],
        ...(pkMinF*30>areaNum*0.3?[['⚠ Parcare la sol depășește 30% din parcelă','Parcare subterană recomandată','—','Cost +'+Math.round(pkMinF*4500).toLocaleString()+' EUR']]:[]),
      ],
      [2600,2000,2000,2426]
    ));
    children.push(..._dxEmpty());
    children.push(_dxH2('8.2. Siguranță la foc (ISU) — cerințe și implicații'));
    children.push(_dxTable(
      ['Parametru ISU','Valoare amplasament','Cerință P118/Lege 307','Status'],
      [
        ['Aviz ISU obligatoriu?',isISUOblig?'DA — H='+aedisH.toFixed(1)+'m / SD='+sdTotal+'mp':'Verificare la faza CU','H>8m sau SD>600mp',isISUOblig?'OBLIGATORIU':'Verificare CU'],
        ['Grad rezistență la foc','GR II-III (uzual BA, P+3)','P118-1/2015 art. 2.14','Conf. proiect structural'],
        ['Cale acces ISU (lățime min.)','min. 3.5m (1 vehicul) / 5.5m (2 veh.)','P118-2/2013 art. 6.3','Verificare plan situație'],
        ['Distanța max. față-acces ISU','max. 80m de la intrarea principală','P118-2/2013 art. 6.5','Conf. proiect accese'],
        ['Hidrant exterior obligatoriu','H>8m sau SD>'+Math.min(600,sdTotal)+'mp','P118-2/2013 art. 8','Verificare proiect ISU'],
        ['Scară pompieri (H>28m)',aedisH>28?'OBLIGATORIE — H='+aedisH.toFixed(1)+'m':'Nu se impune — H='+aedisH.toFixed(1)+'m','P118-2/2013 art. 7',aedisH>28?'OBLIGATORIU':'Nu se impune'],
        ['Cost estimat conformare ISU','3.000-8.000 EUR (echipamente detecție+stingere)','—','Inclus buget total'],
      ],
      [2400,2400,2000,1226+(2*900-900)]
    ));
    children.push(..._dxEmpty());

    // ── PAG 10: SINTEZA — ÎNSORIRE + ZGOMOT + VÂNT + GEOTEHNIC ──────────
    children.push(_dxBr());
    children.push(_dxH2('8.3. Însorire — conformitate OMS 119/2014'));
    children.push(_dxTable(
      ['Parametru solar','Valoare calculată','Prag OMS 119','Status'],
      [
        ['Altitudine solară 21 Dec, ora 12:00',altDec12.toFixed(1)+'°','min. 15°',altDec12>=15?'✓ CONFORM':'⚠ NECONFORM — studiu detaliat OAR obligatoriu'],
        ['Umbră maximă proiectată (spre N, H='+aedisH.toFixed(1)+'m)',(aedisH/Math.tan(altDec12*Math.PI/180)>500?'>500':(aedisH/Math.tan(altDec12*Math.PI/180)).toFixed(0))+'m','Conf. retragere RLU','Verificare proiect'],
        ['Retragere N minimă recomandată',(aedisH/Math.tan(15*Math.PI/180)).toFixed(0)+'m (formula H/tan15°)','H/tan(15°)','Cf. rs='+params?.rs+'m RLU'],
        ['Studiu insorire OAR (obligatoriu?)',sdTotal>500||niv>4?'DA (>4 niv. sau SD>500mp)':'Recomandat','Ord. 119/2014 art. 3','La faza PAC'],
      ],
      [2800,2200,1600,2426]
    ));
    children.push(..._dxEmpty());
    children.push(_dxH2('8.4. Zgomot urban — cerințe SR 10009:2017'));
    children.push(_dxTable(
      ['Parametru acustic','Valoare','Limita SR 10009','Implicație'],
      [
        ['Zona acustică UTR '+utr,zgomCfg.zona_acustica||'Verificare CU','Conf. RLU','Informativ'],
        ['Limita Leq zi (06:00-22:00)',zgomCfg.Lzsn_limita||'55 dB(A)','SR 10009:2017','Cerință fatade expuse'],
        ['Limita Leq noapte (22:00-06:00)',zgomCfg.Lnoapte_limita||'45 dB(A)','SR 10009:2017','Tâmplărie geam triplu dacă lângă surse'],
        ['Izolare acustică fatade (Rw min)','min. 30-35 dB','C 125-2013','Specificat în PT'],
      ],
      [2400,1800,1800,3026]
    ));
    children.push(..._dxEmpty());
    children.push(_dxH2('8.5. Vânt — presiuni de calcul CR 1-1-4/2012'));
    children.push(_dxTable(
      ['Parametru vânt','Valoare','Normă','Implicație'],
      [
        ['Zona de vânt',vantCfg.zona||'III','CR 1-1-4/2012','Input calcul structural'],
        ['Presiune referință qRef',(vantCfg.presiune_vant||0.55)+' kN/mp','CR 1-1-4/2012','Input calcul structural'],
        ['Presiune vânt la H='+aedisH.toFixed(0)+'m',qpH.toFixed(3)+' kN/mp','CR 1-1-4/2012','Transmis inginerului structurist'],
        ['Direcție dominantă',vantCfg.directie_dominanta||'NV-NE','ANM','Orientare optimă clădire E-V'],
      ],
      [2400,1800,1800,3026]
    ));
    children.push(..._dxEmpty());
    children.push(_dxH2('8.6. Geotehnică — categorie și implicații financiare'));
    children.push(_dxTable(
      ['Parametru geotehnic','Valoare estimativă','Normă','Cost orientativ'],
      [
        ['Categoria geotehnică (NP 074/2014)',catGeoF,'NP 074/2014','—'],
        ['Studiu geotehnic obligatoriu',catGeoF.includes('3')?'5 foraje + 3 CPT':catGeoF.includes('2')?'3 foraje (h=8m)':'1-2 foraje (h=5m)','NP 074/2014',costGeoF.toLocaleString()+'-'+(costGeoF*1.8).toFixed(0)+' EUR'],
        ['Zona seismică (P100-1/2013)',seismCfg.zona+' (ag='+seismCfg.ag+'g, Tc='+seismCfg.Tc+'s)','P100-1/2013','Impact cost structură +5-15%'],
        ['Epuismente / hidroizolație subteran','Posibil (NFA 1.5-8m în Iași)','NP 074/2014','15.000-40.000 EUR dacă necesar'],
      ],
      [2600,2400,1800,2226]
    ));
    children.push(..._dxEmpty());

    // ── PAG 11: OPTIMIZARI + BUGET RECALCULAT ─────────────────────────────
    children.push(_dxBr());
    children.push(_dxH1('9. OPTIMIZĂRI RECOMANDATE ȘI BUGET TOTAL RECALCULAT'));
    children.push(_dxTable(
      ['Optimizare recomandată','Beneficiu estimat','Cost implementare','Prioritate'],
      [
        ['Orientare corp principal E-V','Reducere consum energetic 15-20%','0 EUR (proiect)','★★★'],
        ['Parcare subterană P-1 (dacă ST<'+Math.round(pkMinF*30*1.5)+'mp)','+'+pkMinF+' loc → suprafață liberă la sol',Math.round(pkMinF*5000).toLocaleString()+' EUR extra','★★★'],
        ['Parter comercial activ (vitrine >40%)','Chirie parter 2-3x față de rezidențial','0 EUR (proiect)','★★★'],
        ['Acoperiș verde / FV (60% din SC)','~'+Math.round(Math.round(scMax*0.6)/6.5*1100)+' kWh/an','~'+Math.round(Math.round(scMax*0.6)*100).toLocaleString()+' EUR','★★'],
        ['Sistem BMS (Building Management System)','Reducere costuri operaționale 20-30%','8.000-25.000 EUR','★★'],
        ['Pre-certificare verde (BREEAM/LEED)','Chirie +10-15% față de necertificate','10.000-30.000 EUR','★★'],
        ['Stații EV ('+Math.max(2,Math.ceil(pkMinF*0.1))+' buc) + rastele biciclete','Atracție chiriași premium + conf. Reg. UE','~'+Math.max(2,Math.ceil(pkMinF*0.1))*1500+' EUR','★★'],
      ],
      [3000,2000,1600,1426+(2*900-900)]
    ));
    children.push(..._dxEmpty());
    children.push(_dxH2('9.1. Buget total recalculat — inclusiv studii și măsuri speciale'));
    children.push(_dxTable(
      ['Categorie cost','Estimare (EUR)','% din total','Observații'],
      [
        ['Cost construcție propriu-zisă',costConstr.toLocaleString(),Math.round(costConstr/costTotal*100)+'%',pretConstr+' EUR/mp × '+sdTotal+' mp SDA'],
        ['Achiziție / valoare teren',costTeren.toLocaleString(),Math.round(costTeren/costTotal*100)+'%',pretTeren+' EUR/mp × '+areaNum+' mp teren'],
        ['Proiectare (PAC + PT + DDE)',Math.round(costConstr*0.025).toLocaleString(),'~2.5%','Arhitect OAR + specialiști'],
        ['Studii tehnice obligatorii (geo, trafic etc.)',Math.round(costGeoF*2.5).toLocaleString(),'—','Geotehnic + specialități CU'],
        ['Avize și taxe autorizare',Math.round(costConstr*0.01).toLocaleString(),'~1%','CU + AC + avize specialitate'],
        ['Instalații ISU (detecție, stingere)',isISUOblig?'8.000 - 25.000 EUR':'Nu se impune sau minim','—','Obligatoriu dacă aviz ISU'],
        ['Rezervă contingență (15%)',Math.round(costConstr*0.15).toLocaleString(),'15%','Variații preț materiale+manoperă'],
        ['TOTAL RECALCULAT',Math.round(costTotal*1.05).toLocaleString(),'100%','Estimat ±25-30%'],
      ],
      [2600,1800,1200,3426]
    ));
    children.push(..._dxEmpty());

    // ── PAG 12: BAZA LEGALA + CONCLUZII ──────────────────────────────────
    children.push(_dxBr());
    children.push(_dxH1('10. CONCLUZII FINALE ȘI BAZA LEGALĂ'));
    children.push(_dxP('Prezentul Studiu de Prefezabilitate / Fezabilitate / DALI pentru amplasamentul cu nr. cadastral '+nrcad+' (UTR '+utr+', suprafața '+areaNum+' mp, '+uat+', jud. '+judet+') sintetizează indicatorii tehnico-economici estimativi ai investiției propuse (SD total='+sdTotal+' mp, H='+aedisH.toFixed(1)+'m, valoare totală estimată ~'+costTotal.toLocaleString()+' EUR).',{before:80,after:80}));
    children.push(_dxTable(
      ['Indicator cheie','Valoare','Status'],
      [
        ['Valoare totală investiție estimativă','~'+costTotal.toLocaleString()+' EUR','Orientativ ±30%'],
        ['Suprafață desfășurată (SDA)',sdTotal+' mp','Conf. CUT='+params?.cut],
        ['Randament brut estimat (ROI chirie)',rentabilitate+'%/an','La '+chirieRef+' EUR/mp/lună'],
        ['Venit estimat la vânzare','~'+venitVanzare.toLocaleString()+' EUR','La '+pretVanzare+' EUR/mp'],
        ['Profit estimat la vânzare','~'+(venitVanzare-costTotal).toLocaleString()+' EUR',venitVanzare>costTotal?'PROFIT POZITIV':'VERIFICARE'],
        ['Perioadă de recuperare investiție (chirie)',payback+' ani','Payback simplu'],
        ['Conformitate indicatori PUG','CONFORM (orientativ)','Verificare obligatorie CU'],
        ['Studiu geotehnic','OBLIGATORIU','Înainte de proiectare structurală'],
        ['Aviz ISU',isISUOblig?'OBLIGATORIU':'Verificare CU','HG 307/2006 + P118'],
      ],
      [3200,2200,3626]
    ));
    children.push(..._dxEmpty());
    children.push(_dxH2('10.1. Baza legală completă'));
    children.push(..._dxBullets([
      'HG nr. 907/2016 privind etapele de elaborare și conținutul-cadru al documentațiilor tehnico-economice.',
      'Legea nr. 50/1991 republicată — autorizarea executării lucrărilor de construcții.',
      'Legea nr. 350/2001 privind amenajarea teritoriului și urbanismul, republicată.',
      'NP 074/2014 — Normativ privind principiile, exigențele și metodele cercetării geotehnice.',
      'P100-1/2013 — Cod de proiectare seismică. Zona '+seismCfg.zona+' (ag='+seismCfg.ag+'g).',
      'NP 051/2012 rev. — Normativ privind parcajele și adaptarea la necesitățile PMR.',
      'P118-1/2015 + P118-2/2013 — Norme de securitate la incendiu.',
      'CR 1-1-4/2012 — Cod de proiectare. Acțiunea vântului.',
      'OMS nr. 119/2014 actualizat cu Ord. 994/2018 — norme de igienă (însorire).',
      'SR 10009:2017 — Limite admisibile niveluri de zgomot în mediul exterior.',
      'Regulamentul UE 2023/1804 — Infrastructura pentru vehicule electrice.',
      'PUG '+uat+' în vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.',
      'Legea nr. 10/1995 republicată — Calitatea în construcții.',
    ]));
    children.push(..._dxEmpty(2));
    children.push(_dxLine());
    children.push(_dxDisclaimer());
    children.push(_dxP('Generat: '+dateStr+' · UrbanX TSS·FG · Document orientativ',{color:_DX.GRAY,size:18,italic:true,align:'center',before:100}));

    // ── Construire document ────────────────────────────────────────────────
    const doc=new Document({
      ...styles,
      sections:[{
        properties:{page:{size:{width:_DX.PAGE_W,height:_DX.PAGE_H},
          margin:{top:_DX.MARGIN,right:_DX.MARGIN,bottom:_DX.MARGIN,left:_DX.MARGIN}}},
        headers:{default:{children:[
          new window.docx.Paragraph({border:{bottom:{style:'single',size:6,color:_DX.GOLD,space:4}},
            children:[
              new window.docx.TextRun({text:'URBANX · SF/DALI · Nr.cad '+nrcad+' · UTR '+utr+' · '+uat,font:'Calibri',size:16,color:_DX.GRAY}),
              new window.docx.TextRun({text:'\t',font:'Calibri',size:16}),
              new window.docx.TextRun({text:dateStr,font:'Calibri',size:16,color:_DX.GRAY}),
            ],
            tabStops:[{type:window.docx.TabStopType.RIGHT,position:_DX.CONTENT}]
          })
        ]}},
        footers:{default:{children:[
          new window.docx.Paragraph({border:{top:{style:'single',size:4,color:_DX.LGRAY,space:4}},
            children:[
              new window.docx.TextRun({text:'Document orientativ · UrbanX TSS·FG · Nu înlocuiește documentațiile tehnice avizate\t',font:'Calibri',size:16,color:_DX.GRAY,italics:true}),
              new window.docx.TextRun({children:[new window.docx.PageNumber(window.docx.NumberFormat.DECIMAL)],font:'Calibri',size:16,color:_DX.GRAY}),
            ],
            tabStops:[{type:window.docx.TabStopType.RIGHT,position:_DX.CONTENT}]
          })
        ]}},
        children
      }]
    });

    const blob=await window.docx.Packer.toBlob(doc);
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download='SF_DALI_'+nrcad+'_'+new Date().getFullYear()+'.docx';
    document.body.appendChild(a);a.click();
    setTimeout(()=>{URL.revokeObjectURL(url);document.body.removeChild(a);},2000);
    ss('✅ Document Word SF/DALI generat! Deschideți cu Microsoft Word sau LibreOffice.');

  }catch(err){
    console.error('DOCX error:',err);
    ss('❌ Eroare generare Word: '+err.message);
  }
}

// ── 6. MODAL EDITARE PARAMETRI (SF + orice studiu cu date financiare) ─────
function showSFParamsModal(){
  const existing=document.getElementById('sf-params-modal');
  if(existing) existing.remove();

  const _fc=getFinanciarConfig();
  const ap=S.parcels[S.activeParcel??0];
  const utr=ap?.utr||'—';
  const uat=getUATLabel();

  const modal=document.createElement('div');
  modal.id='sf-params-modal';
  modal.style.cssText=`
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;
    background:#0d1a2e;border:1px solid #C49206;border-radius:8px;
    padding:24px 28px;width:520px;max-width:95vw;max-height:90vh;
    overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.7);font-family:Calibri,sans-serif;
  `;
  modal.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <div>
        <div style="color:#C49206;font-size:10px;font-weight:bold;letter-spacing:1px;">URBANX · STUDIU FEZABILITATE</div>
        <div style="color:#fff;font-size:15px;font-weight:bold;margin-top:2px;">Parametri de generare</div>
        <div style="color:#7890b0;font-size:11px;margin-top:2px;">UTR ${utr} · ${uat} · Valorile implicite sunt medii statistice UAT</div>
      </div>
      <button onclick="document.getElementById('sf-params-modal').remove()"
        style="background:none;border:none;color:#7890b0;font-size:18px;cursor:pointer;padding:4px 8px;">✕</button>
    </div>
    <div style="border-top:1px solid #1e3a5f;padding-top:16px;">
      <div style="color:#C49206;font-size:10px;font-weight:bold;letter-spacing:1px;margin-bottom:12px;">PARAMETRI FINANCIARI EDITABILI</div>
      ${_sfParamRow('pretConstr','Preț construcție (EUR/mp SDA)',_fc.pretConstructie,'700 EUR/mp = standard Iași 2024-2025')}
      ${_sfParamRow('pretTeren','Preț teren (EUR/mp)',_fc.pretTeren,'Introduceți prețul real negociat')}
      ${_sfParamRow('chirieRef','Chirie referință (EUR/mp/lună)',_fc.chirieRef,'Chirie estimată sau negociată')}
      ${_sfParamRow('pretVanzare','Preț vânzare (EUR/mp)',Math.round(_fc.pretConstructie*1.4),'Dacă se vinde, nu se închiriază')}
      ${_sfParamRow('rataOcupare','Rată ocupare estimată (%)',85,'85% = standard conservator')}
    </div>
    <div style="border-top:1px solid #1e3a5f;padding-top:16px;margin-top:8px;">
      <div style="color:#C49206;font-size:10px;font-weight:bold;letter-spacing:1px;margin-bottom:12px;">GENERARE DOCUMENT</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button onclick="_sfGeneratePDF()" style="flex:1;min-width:180px;background:#14326A;color:#fff;
          border:1px solid #C49206;border-radius:5px;padding:10px 14px;cursor:pointer;font-size:13px;font-weight:bold;">
          📄 Generează PDF
        </button>
        <button onclick="_sfGenerateDocx()" style="flex:1;min-width:180px;background:#0E6432;color:#fff;
          border:1px solid #C49206;border-radius:5px;padding:10px 14px;cursor:pointer;font-size:13px;font-weight:bold;">
          📝 Generează Word (.docx)
        </button>
      </div>
      <div style="color:#5A6878;font-size:10px;margin-top:10px;line-height:1.4;">
        PDF = document final cu grafică UrbanX · Word = document editabil, fără grafică dark, dar cu toate tabelele și calculele
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Click outside to close
  setTimeout(()=>{
    document.addEventListener('click',function handler(e){
      if(!modal.contains(e.target)){modal.remove();document.removeEventListener('click',handler);}
    });
  },300);
}

function _sfParamRow(id,label,defaultVal,hint){
  return `
    <div style="margin-bottom:12px;">
      <label style="display:block;color:#a0b4cc;font-size:11px;margin-bottom:4px;">${label}</label>
      <input id="sfp-${id}" type="number" value="${defaultVal}"
        style="width:100%;background:#0a1628;border:1px solid #1e3a5f;color:#fff;
        padding:7px 10px;border-radius:4px;font-size:13px;box-sizing:border-box;"
        onfocus="this.style.borderColor='#C49206'" onblur="this.style.borderColor='#1e3a5f'">
      <div style="color:#5A6878;font-size:10px;margin-top:2px;">${hint}</div>
    </div>
  `;
}

function _sfGetParams(){
  const get=id=>parseFloat(document.getElementById('sfp-'+id)?.value)||null;
  return {
    pretConstr:  get('pretConstr'),
    pretTeren:   get('pretTeren'),
    chirieRef:   get('chirieRef'),
    pretVanzare: get('pretVanzare'),
    rataOcupare: get('rataOcupare'),
  };
}

async function _sfGeneratePDF(){
  const params=_sfGetParams();
  document.getElementById('sf-params-modal')?.remove();
  // Suprascrie temporar getFinanciarConfig cu valorile utilizatorului
  const orig=getFinanciarConfig();
  window._sfParamOverride=params;
  await generateStudiuFezabilitate(params);
  window._sfParamOverride=null;
}

async function _sfGenerateDocx(){
  const params=_sfGetParams();
  document.getElementById('sf-params-modal')?.remove();
  await generateFezabilitateDocx(params);
}

// ── 7. EXPORT GENERIC DOCX PENTRU ORICE STUDIU ─────────────────────────
// Fiecare studiu poate construi un obiect studyData si apela aceasta functie
async function _exportStudyAsDocx(studyData){
  // studyData = { title, subtitle, nrcad, utr, area, dateStr, uat, judet,
  //               sections: [ { heading, subheading, text, table:{headers,rows,colW}, bullets, note } ] }
  try{
    await _ensureDocxLib();
    const {Document,Packer}=window.docx;
    const styles=_dxGetStyles();
    const children=[];

    // Cover
    children.push(..._dxCover(
      studyData.title,
      studyData.subtitle||'',
      [
        ['Nr. cadastral',studyData.nrcad||'—'],
        ['UAT / Localitate',studyData.uat||'—'],
        ['Zonă UTR',studyData.utr||'—'],
        ['Suprafață teren',(studyData.area||'—')+' mp'],
        ['Data elaborare',studyData.dateStr||new Date().toLocaleDateString('ro-RO')],
      ]
    ));

    for(const sec of (studyData.sections||[])){
      if(sec.pageBreak) children.push(_dxBr());
      if(sec.heading)   children.push(_dxH1(sec.heading));
      if(sec.subheading) children.push(_dxH2(sec.subheading));
      if(sec.text)      children.push(_dxP(sec.text,{before:80,after:80}));
      if(sec.table)     children.push(_dxTable(sec.table.headers,sec.table.rows,sec.table.colW));
      if(sec.bullets)   children.push(..._dxBullets(sec.bullets));
      if(sec.note)      children.push(_dxP(sec.note,{italic:true,color:_DX.GRAY,size:18}));
      children.push(..._dxEmpty());
    }

    children.push(_dxLine());
    children.push(_dxDisclaimer());

    const doc=new Document({
      ...styles,
      sections:[{
        properties:{page:{size:{width:_DX.PAGE_W,height:_DX.PAGE_H},
          margin:{top:_DX.MARGIN,right:_DX.MARGIN,bottom:_DX.MARGIN,left:_DX.MARGIN}}},
        headers:{default:{children:[new window.docx.Paragraph({
          border:{bottom:{style:'single',size:4,color:_DX.GOLD,space:4}},
          children:[new window.docx.TextRun({text:'URBANX · '+studyData.title+' · Nr.cad '+(studyData.nrcad||'—'),font:'Calibri',size:16,color:_DX.GRAY})]
        })]}},
        footers:{default:{children:[new window.docx.Paragraph({
          border:{top:{style:'single',size:4,color:_DX.LGRAY,space:4}},
          children:[
            new window.docx.TextRun({text:'Document orientativ · UrbanX TSS·FG\t',font:'Calibri',size:16,color:_DX.GRAY,italics:true}),
            new window.docx.TextRun({children:[new window.docx.PageNumber(window.docx.NumberFormat.DECIMAL)],font:'Calibri',size:16,color:_DX.GRAY}),
          ],
          tabStops:[{type:window.docx.TabStopType.RIGHT,position:_DX.CONTENT}]
        })]},
        },
        children
      }]
    });

    const blob=await Packer.toBlob(doc);
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=(studyData.filename||'Studiu_UrbanX')+'_'+(studyData.nrcad||'X')+'_'+new Date().getFullYear()+'.docx';
    document.body.appendChild(a);a.click();
    setTimeout(()=>{URL.revokeObjectURL(url);document.body.removeChild(a);},2000);
    ss('✅ Document Word generat! Deschideți cu Microsoft Word sau LibreOffice.');
  }catch(err){
    console.error('_exportStudyAsDocx error:',err);
    ss('❌ Eroare generare Word: '+err.message);
  }
}
