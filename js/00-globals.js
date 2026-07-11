// UrbanX — State global, variabile si constante
// Modul extras din index_v4.html

// ── _nf: formator numeric cu separator de mii (ro-RO: "88182" -> "88.182") ──
// Folosit in TOATE studiile/rapoartele/SIDU/MP/PMUD/UI. Pastreaza pana la `dec`
// zecimale (implicit 1). NU folosi pe: numere cadastrale, lat/lon, ani.
window._nf = function(n, dec){
  var x = (typeof n === 'number') ? n : parseFloat(n);
  if (n == null || !isFinite(x)) return (n == null ? '' : String(n));
  try { return x.toLocaleString('ro-RO', { maximumFractionDigits: (dec == null ? 1 : dec) }); }
  catch(e){ return String(n); }
};

// ── JUSTIFY global pt PDF — randeaza O LINIE aliniata la ambele margini
// (distribuie spatiul intre cuvinte). Folosit de toate studiile/rapoartele.
// isLast=true -> linie normala (ultima dintr-un paragraf nu se justifiaza).
window._jPdfLine = function(pdf, line, x, y, maxW, isLast){
  try{
    if(isLast || !line || String(line).indexOf(' ')<=0){ pdf.text(line, x, y); return; }
    var words=String(line).split(' ').filter(function(w){return w.length;});
    if(words.length<2){ pdf.text(line, x, y); return; }
    var wW=0; words.forEach(function(w){ wW+=pdf.getTextWidth(w); });
    var gap=(maxW-wW)/(words.length-1), sp=pdf.getTextWidth(' ');
    if(gap<=0 || gap>sp*4.5){ pdf.text(line, x, y); return; }
    var cx=x; words.forEach(function(w){ pdf.text(w, cx, y); cx+=pdf.getTextWidth(w)+gap; });
  }catch(e){ try{pdf.text(line,x,y);}catch(e2){} }
};

// ── State objects (moved to top for hoisting) ──────────────────────
var FLOOR_COLORS=[
  '#22d3ee','#34d399','#86efac','#fde68a','#fcd34d','#fb923c',
  '#f97316', // Et6 - portocaliu intens
  '#ef4444', // Et7 - roșu
  '#dc2626', // Et8 - roșu intens
  '#a855f7', // Et9 - violet
  '#7c3aed', // Et10 - violet intens
  '#ec4899'  // Et11+ - roz
];
var S={
  pug:null,pugIdx:[],cadData:null,cadIdx:new Map(),
  parcels:[],          // array de parcele selectate (multiselect)
  activeParcel:null,   // parcela curentă (index în S.parcels)
  geometrie_teren:{ sursa:null, limita_proprietate:null, volum_existent:null, volum_propus:null, vecinatati_geometrie:[], fisier_dwg_original:null }, // SSI: import DWG/DXF (js/25-ssi-dwg-import.js)
  utr:'',rule:{},ll:null,
  ctx:null,popup:null,
  tab:'search',multiMode:false,
  bearing:0,
  scenarios:JSON.parse(localStorage.getItem('ux16')||'[]'),
  shortcuts:JSON.parse(localStorage.getItem('ux_shortcuts')||'["raport_pdf","studiu_insorire"]'),
  params:{},  // parametri urbanistici editabili per parcelă
  vol:{fn:'locuinta_individuala',niv:4,hNiv:3.0,hOvr:'',fpF:0.9,retras:false,terasa:false,ctxR:200,onlyVol:true,genDone:false,
    perSideMode:false,   // false = mod clasic rf/rl/rs, true = aliniament per latura
    sideSetbacks:{},     // {sideIndex: valoare_m} — override per latura
    // #9 Scenarii constructie: 'liber'=demolare existenta, 'extindere_h'=extindere orizontal, 'extindere_v'=extindere vertical+orizontal
    scenariuConstructie:'liber',
    frontCount: 1,      // nr laturi stradale: 1=normal, 2=colt, 3=triplu front
    multiVol: false,    // multiple cladiri pe edificabil
    multiVolCount: 2,   // nr cladiri (2-6)
    multiVolDist: 6,    // distanta minima intre cladiri (m) - indicator urbanistic
    multiVolShape: 'rect' // 'rect'=dreptunghiuri | 'square'=patrate
  },
  svZone:null,  // Fix #11: zone spatii verzi (GeoJSON Feature sau null)
  showFront:true  // vizualizare aliniamente pe hartă
};
var BLD_COL={
  // Rezidential - gri-albăstrui neutru (nu concurează cu AEDIS)
  residential:'#4a5568', apartments:'#4a5568', house:'#5a6a7a',
  // Comercial - portocaliu/galben
  commercial:'#e8a838', retail:'#f0823c', shop:'#f0823c',
  // Birouri/Servicii - albastru
  office:'#5b8dd9', services:'#6b9de8',
  // Industrial - rosu inchis
  industrial:'#c0453a', warehouse:'#b03c35',
  // Institutii publice - violet
  school:'#9b59b6', hospital:'#e74c8b', civic:'#8e44ad',
  // Cultura/Religie - galben auriu
  church:'#d4af37', cathedral:'#c8a020', religious:'#d4af37',
  hotel:'#e67e22',
  // Altele
  garage:'#7f8c8d', parking:'#95a5a6', sports:'#27ae60',
  yes:'#8a9ab0'  // necunoscut - gri albastru
};
var BLD_LABELS={
  residential:'Rezidențial',apartments:'Rezidențial colectiv',house:'Locuință',
  commercial:'Comercial',retail:'Comerț',shop:'Comerț',
  office:'Birouri',services:'Servicii',
  industrial:'Industrial',warehouse:'Depozit',
  school:'Educație',hospital:'Sănătate',civic:'Instituție publică',
  church:'Cult/Religie',hotel:'Hotelier',
  garage:'Garaj',parking:'Parcare',sports:'Sport',
  yes:'Necunoscut'
};
var _CTX_CACHE = {};
var PDF_C = {
  navy:    [8, 21, 42],
  gold:    [212, 175, 55],
  goldL:   [240, 210, 120],
  white:   [255, 255, 255],
  offwhite:[248, 249, 252],
  gray1:   [240, 242, 245],
  gray2:   [180, 190, 200],
  gray3:   [100, 116, 139],
  dark:    [20, 30, 50],
  blue:    [59, 130, 246],
  green:   [16, 185, 129],
  orange:  [245, 158, 11],
  red:     [239, 68, 68],
  teal:    [0, 150, 136],
};
var AEDIS = {
  open: false,
  tab: 'functiune', // functiune | volum | acoperis | context | analiza

  // Funcțiune și program
  fn: 'rezidential_colectiv',
  fnParter: 'comercial',        // funcțiune parter (dacă diferit)
  parterDiferit: false,

  // Stil arhitectural
  stil: 'modern',
  adaptContext: false,          // adaptare la contextul existent

  // Compoziție volumetrică
  corpuri: [                    // array de corpuri
    {id:0, label:'Corp principal', h:12, niv:4, hNiv:3, retragere:1.0, fn:'rezidential_colectiv', color:'#cbd5e1'}
  ],
  corpActiv: 0,

  // Acoperis
  tipAcoperis: 'terasa_plata',  // terasa_plata | terasa_circulabila | sarpanta | mansarda | combinat | penthouse
  hSarpanta: 3.5,               // H coama sarpanta (m)
  unghiSarpanta: 35,            // unghi (grade)
  hMansarda: 2.8,               // H util mansarda
  hAttic: 1.2,                  // H atic/parapet terasa
  // Penthouse
  penthouseActiv: false,        // adaugă penthouse deasupra ultimului etaj
  penthouseRetragere: 2.5,      // retragere penthouse față de atic (m) — pe toate laturile
  penthouseH: 3.2,              // înălțime penthouse (m)
  penthouseSuprafataFactor: 0.5, // factor suprafață terasă penthouse (0.3–0.8)
  // Retragere atic (pe 4 laturi independent)
  aticRetragere: {front:0, spate:0, stanga:0, dreapta:0}, // retragere atic față de corp (m)

  // Retrageri per etaj (array, index=etaj)
  retrageriFineEtaje: {},       // {etaj: factor} ex: {3: 0.85, 4: 0.75}
  activeRetragere: false,

  // Context și scenarii
  scenariu: 'demolare',         // demolare | extindere_h | extindere_v | inglobare
  existentPOT: 0,               // POT existent calculat din ctx
  existentCUT: 0,
  existentH: 0,

  // Analiză
  showDim: true,                // etichete dimensionale
  showShadow: false,            // simulare umbra (simplificata)
  showSetbacks: true,           // aliniamente vizuale

  // Forma planimetrica clădire
  forma: 'auto',               // auto | patrat | dreptunghi | L | U | T | curte | bara
  formaRatio: 0.35,            // grosimea brațelor pentru L/U/T (0.2–0.5 din bbox)

  // Fatada: balcoane + perete cortina
  balcoane: false,             // activare balcoane
  balconAdancime: 1.5,         // adâncime balcon (m)
  balconLaturi: ['S','E'],     // laturile cu balcoane
  peretelCortina: false,       // activare perete cortina
  cortinaProcent: 60,          // % fatada acoperita de cortina
};
var AEDIS_FN = {
  rezidential_colectiv: {
    label:'🏠 Rezidențial colectiv', color:'#4ade80', parterColor:'#86efac',
    hParter:3.0, hEtaj:2.8, hAttic:1.0,
    desc:'Blocuri de locuințe. H standard 2.8m/etaj. Posibil parter comercial.',
    stiluri:['modern','clasic','minimalist','adaptat_context']
  },
  locuinta_individuala: {
    label:'🏡 Locuință individuală', color:'#86efac', parterColor:'#bbf7d0',
    hParter:3.2, hEtaj:3.0, hAttic:0,
    desc:'Case individuale. H generos 3m/etaj. Posibil mansardă.',
    stiluri:['modern','clasic','traditional','rustic']
  },
  birouri: {
    label:'🏢 Birouri / Office', color:'#38bdf8', parterColor:'#7dd3fc',
    hParter:4.5, hEtaj:3.5, hAttic:1.5,
    desc:'Clădiri de birouri. H parter 4.5m, etaje 3.5m. Posibil atriumuri.',
    stiluri:['modern','inovator','corporatist','minimalist']
  },
  comercial: {
    label:'🏬 Comercial / Retail', color:'#fb923c', parterColor:'#fdba74',
    hParter:5.0, hEtaj:4.0, hAttic:1.5,
    desc:'Spații comerciale. H parter generos 5m. Posibil mezanin.',
    stiluri:['modern','inovator','industrial']
  },
  hotel: {
    label:'🏨 Hotelier', color:'#e879f9', parterColor:'#f0abfc',
    hParter:5.0, hEtaj:3.2, hAttic:2.0,
    desc:'Hoteluri. Parter 5m (lobby/restaurant), etaje 3.2m.',
    stiluri:['modern','clasic','boutique','inovator']
  },
  mixt: {
    label:'🏙 Mixt (comercial+rezidential)', color:'#fbbf24', parterColor:'#fb923c',
    hParter:4.5, hEtaj:3.0, hAttic:1.2,
    desc:'Funcțiuni mixte. Parter comercial 4.5m + etaje rezidențiale.',
    stiluri:['modern','inovator','adaptat_context']
  },
  industrie: {
    label:'🏭 Industrial / Depozitare', color:'#94a3b8', parterColor:'#cbd5e1',
    hParter:6.0, hEtaj:5.0, hAttic:0,
    desc:'Hale industriale. H mare, deschideri libere.',
    stiluri:['industrial','modern']
  },
  institutie: {
    label:'🏛 Instituție publică', color:'#a78bfa', parterColor:'#c4b5fd',
    hParter:4.5, hEtaj:3.5, hAttic:2.5,
    desc:'Clădiri publice, instituții. H reprezentativ.',
    stiluri:['clasic','modern','inovator','adaptat_context']
  },
};
var AEDIS_STIL = {
  modern: {
    label:'🏢 Modern', desc:'Sticlă-oțel, etaje progresive, atic pronunțat, bandouri orizontale',
    floorColors: ['#0f172a','#1e3a5f','#1d4ed8','#2563eb','#3b82f6','#60a5fa','#93c5fd','#bfdbfe'],
    parterColor: '#0f172a',   // soclu negru mat
    aticColor:   '#0c1a2e',
    windowColor: '#7dd3fc',   // geam albastru deschis
    bandColor:   '#1e40af',   // bandouri orizontale albastru intens
    retragereFactor: 0.88, hasAttic: true, aticH: 1.4,
    cortinaProcent: 70,
    etajColor: (base,i,tot)=>{
      const cols=['#0f172a','#1e3a5f','#1d4ed8','#2563eb','#3b82f6','#60a5fa','#93c5fd','#bfdbfe'];
      return cols[Math.min(i,cols.length-1)];
    }
  },
  inovator: {
    label:'⚡ Inovator', desc:'Volum dinamic, retrageri expresive, contrast violet-auriu, fațade unghiulare',
    floorColors: ['#3b0764','#581c87','#6b21a8','#7c3aed','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],
    parterColor: '#1e1b4b',
    aticColor:   '#d4af37',   // atic auriu — contrast puternic
    windowColor: '#fde68a',   // geam auriu-cald
    bandColor:   '#d4af37',   // bandouri aurii
    retragereFactor: 0.68, hasAttic: false, aticH: 0,
    cortinaProcent: 40,
    etajColor: (base,i,tot)=>{
      // Alternare expresivă violet/auriu
      return i%3===0?'#d4af37':['#3b0764','#6b21a8','#8b5cf6','#7c3aed','#a78bfa'][Math.min(i,4)];
    }
  },
  clasic: {
    label:'🏛 Clasic', desc:'Piatră naturală, soclu masiv, cornișe, proporții clasice, coloane',
    floorColors: ['#1a0a02','#3b1a08','#6b3a10','#8b4513','#a0522d','#c8914a','#d4a96a','#e8cfa0'],
    parterColor: '#1a0a02',   // soclu piatră neagră
    aticColor:   '#3b1a08',
    windowColor: '#fef3c7',   // geam cald-fildeș
    bandColor:   '#92400e',   // cornișe cărămizii
    retragereFactor: 0.97, hasAttic: true, aticH: 2.5,
    cortinaProcent: 20,
    etajColor: (base,i,tot)=>{
      const cols=['#1a0a02','#3b1a08','#6b3a10','#8b4513','#a0522d','#c8914a','#d4a96a','#e8cfa0'];
      return cols[Math.min(i,cols.length-1)];
    }
  },
  minimalist: {
    label:'◼ Minimalist', desc:'Beton alb-alb, volume pure fără ornamente, suprafețe plate, goluri precise',
    floorColors: ['#27272a','#3f3f46','#52525b','#71717a','#a1a1aa','#d4d4d8','#f4f4f5','#ffffff'],
    parterColor: '#18181b',   // soclu antracit închis
    aticColor:   '#09090b',
    windowColor: '#f0f9ff',   // geam alb-rece
    bandColor:   '#27272a',   // fără bandouri — volum pur
    retragereFactor: 1.0, hasAttic: false, aticH: 0.5,
    cortinaProcent: 50,
    etajColor: (base,i,tot)=>{
      // Gradient lin de la antracit la alb pur
      const t = tot>1 ? i/(tot-1) : 0;
      const v = Math.round(24 + t*231);
      return `rgb(${v},${v},${v})`;
    }
  },
  industrial: {
    label:'🏭 Industrial', desc:'Corten ruginiu, metal expus, beton brut, structură vizibilă, H mare',
    floorColors: ['#0c0a09','#1c1917','#292524','#44403c','#57534e','#78716c','#a8a29e','#d6d3d1'],
    parterColor: '#0c0a09',
    aticColor:   '#7c2d12',   // atic corten ruginiu — accent distinct
    windowColor: '#fbbf24',   // geam metalic-auriu
    bandColor:   '#9a3412',   // structură corten
    retragereFactor: 1.0, hasAttic: false, aticH: 0,
    cortinaProcent: 30,
    etajColor: (base,i,tot)=>{
      // Corten alternant — rugini + gri metalic
      const cortenCols=['#0c0a09','#431407','#7c2d12','#9a3412','#57534e','#44403c','#78716c','#57534e'];
      return cortenCols[i%cortenCols.length];
    }
  },
  adaptat_context: {
    label:'🌆 Adaptat context', desc:'Culori, H și proporții extrase din contextul urban analizat',
    floorColors: ['#334155','#475569','#64748b','#94a3b8','#cbd5e1','#e2e8f0','#f1f5f9','#f8fafc'],
    parterColor: '#1e293b',
    aticColor:   '#334155',
    windowColor: '#bae6fd',
    bandColor:   '#475569',
    retragereFactor: 0.92, hasAttic: true, aticH: 1.0,
    cortinaProcent: 45,
    etajColor: (base,i,tot)=>{
      if(S.ctx?.features?.length){
        const fns={};
        S.ctx.features.forEach(f=>{const fn=f.properties?.fn||'yes';fns[fn]=(fns[fn]||0)+1;});
        const domFn=Object.entries(fns).sort((a,b)=>b[1]-a[1])[0]?.[0]||'yes';
        const base2=BLD_COL[domFn]||'#64748b';
        return mixColor(base2,['#334155','#475569','#64748b','#94a3b8','#cbd5e1'][Math.min(i,4)],0.5);
      }
      return ['#1e293b','#334155','#475569','#64748b','#94a3b8'][Math.min(i,4)];
    }
  },
  contemporary: {
    label:'🌿 Contemporan', desc:'Fațade verzi/lemn, retrageri verzi la terase, materiale calde + sticlă',
    floorColors: ['#14532d','#15803d','#16a34a','#22c55e','#4ade80','#86efac','#bbf7d0','#dcfce7'],
    parterColor: '#052e16',
    aticColor:   '#166534',
    windowColor: '#d9f99d',   // geam verde-cald
    bandColor:   '#65a30d',   // brâie verzi
    retragereFactor: 0.82, hasAttic: true, aticH: 1.8,
    cortinaProcent: 35,
    etajColor: (base,i,tot)=>{
      // Verde închis → verde deschis (terase) cu bandouri lemn
      return i%2===0?['#052e16','#14532d','#15803d','#16a34a'][Math.min(i/2,3)]:['#78350f','#92400e','#b45309'][Math.min(Math.floor(i/2),2)];
    }
  },
  deconstructivist: {
    label:'🔷 Deconstructivist', desc:'Volume fragmentate, unghiuri ne-ortogonale, contrast puternic, expresivitate maximă',
    floorColors: ['#1e0a3c','#312e81','#3730a3','#4338ca','#4f46e5','#6366f1','#818cf8','#a5b4fc'],
    parterColor: '#09090b',
    aticColor:   '#dc2626',   // atic roșu — accent agresiv
    windowColor: '#fca5a5',   // geam roz-roșu
    bandColor:   '#dc2626',   // elemente roșii
    retragereFactor: 0.60, hasAttic: false, aticH: 0,
    cortinaProcent: 55,
    etajColor: (base,i,tot)=>{
      // Fragmentare: alternare indigo/violet/roșu accent
      const cols=['#09090b','#1e0a3c','#312e81','#dc2626','#4338ca','#dc2626','#4f46e5','#312e81'];
      return cols[i%cols.length];
    }
  },
};
var AEDIS3D = {
  layer: null,       // Mapbox custom layer
  renderer: null,
  scene: null,
  camera: null,
  mesh: null,
  active: false,
  params: null,      // parametrii ultimei generari
};
var AEDIS_SHADERS = {

  // Shader BETON APARENT
  concrete: {
    vert:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      void main(){
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position,1.0)).xyz;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    frag:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      uniform vec3 baseColor;
      uniform float time;

      float rand(vec2 co){ return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453); }
      float noise(vec2 p){
        vec2 i=floor(p); vec2 f=fract(p);
        float a=rand(i), b=rand(i+vec2(1,0)), c=rand(i+vec2(0,1)), d=rand(i+vec2(1,1));
        vec2 u=f*f*(3.0-2.0*f);
        return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
      }

      void main(){
        // Textura beton cu variatie multipla
        vec2 uv = vUv * 6.0;
        float n1 = noise(uv) * 0.25;
        float n2 = noise(uv * 4.0) * 0.08;
        float n3 = noise(uv * 12.0) * 0.04;
        vec3 concreteCol = baseColor + vec3(n1+n2+n3 - 0.18) * 0.4;
        // Saturatie usor crescuta pentru vizibilitate
        float lum = dot(concreteCol, vec3(0.299,0.587,0.114));
        concreteCol = mix(vec3(lum), concreteCol, 1.3);

        // Linii cofrare cu grosime variabila
        float panel = step(0.94, fract(vUv.y * 10.0));
        float panelV = step(0.97, fract(vUv.x * 4.0));
        concreteCol = mix(concreteCol, concreteCol*0.65, (panel + panelV) * 0.5);

        // Iluminare cu 2 lumini + ambient colorat
        vec3 L1 = normalize(vec3(1.5, 2.5, 1.0)); // soare
        vec3 L2 = normalize(vec3(-0.5, 0.8, -1.0)); // cer fill
        vec3 V = normalize(-vPosition);
        float diff1 = max(dot(vNormal, L1), 0.0);
        float diff2 = max(dot(vNormal, L2), 0.0) * 0.3;
        // Specular pe suprafata umeda/lustruita
        float spec = pow(max(dot(reflect(-L1, vNormal), V), 0.0), 16.0) * 0.15;
        vec3 ambCol = vec3(0.12, 0.16, 0.22); // ambient albastru-rece
        vec3 col = concreteCol * (ambCol + vec3(diff1 * 0.75 + diff2)) + vec3(spec);
        // Exposure boost
        col = col * 1.3;
        col = pow(clamp(col, 0.0, 1.0), vec3(0.9)); // gamma

        gl_FragColor = vec4(col, 1.0);
      }`
  },

  // Shader STICLA REFLECTIVA
  glass: {
    vert:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      void main(){
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position,1.0)).xyz;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    frag:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      uniform vec3 baseColor;

      float rand(vec2 co){ return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453); }

      void main(){
        // Grila fereastra cu variatie
        vec2 cell = fract(vUv * vec2(5.0, 8.0));
        float frameX = step(0.88, cell.x);
        float frameY = step(0.88, cell.y);
        float frame = min(frameX + frameY, 1.0);
        float glassArea = 1.0 - frame;

        // Reflexie cer dinamic — gradient albastru-auriu
        vec3 V = normalize(-vPosition);
        vec3 R = reflect(-V, vNormal);
        float skyMix = max(0.0, R.y);
        // Cer albastru profund cu nuante de apus
        vec3 skyZenith = vec3(0.05, 0.35, 0.85);
        vec3 skyHorizon = vec3(0.65, 0.78, 0.95);
        vec3 sunGlow = vec3(1.0, 0.75, 0.3);
        vec3 skyCol = mix(skyHorizon, skyZenith, pow(skyMix, 0.5));
        // Efect soare pe reflexie
        float sunMask = max(0.0, dot(R, normalize(vec3(1.5, 2.0, 0.5))));
        skyCol += sunGlow * pow(sunMask, 8.0) * 0.6;

        // Interiorul — galben cald (lumina de birou/apartament)
        vec3 interiorCol = vec3(0.95, 0.85, 0.6) * baseColor * 0.8;
        // Mix interior/exterior: sticla reflecta mai mult din unghi
        float fresnel = 1.0 - abs(dot(V, vNormal));
        vec3 glassCol = mix(interiorCol, skyCol, 0.4 + fresnel * 0.5);

        // Cadru metalic — aluminiu lucios
        vec3 frameCol = vec3(0.55, 0.60, 0.65);
        float frameSpec = pow(max(dot(reflect(-normalize(vec3(1.5,2.0,1.0)), vNormal), V), 0.0), 32.0);
        frameCol += vec3(0.3) * frameSpec;

        vec3 col = mix(frameCol, glassCol, glassArea);

        // Specular puternic pe sticla
        vec3 L = normalize(vec3(1.5, 2.5, 1.0));
        float spec = pow(max(dot(reflect(-L, vNormal), V), 0.0), 128.0);
        col += vec3(1.0, 0.98, 0.9) * spec * 0.7 * glassArea;

        // Variatie usoara per modul geam (fara a fi uniform)
        float variation = rand(floor(vUv * vec2(5.0, 8.0))) * 0.08 - 0.04;
        col = clamp(col + vec3(variation), 0.0, 1.0);

        gl_FragColor = vec4(col, 0.92);
      }`
  },

  // Shader CORTEN STEEL — rugina portocalie procedurala
  corten: {
    vert:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      void main(){
        vNormal=normalize(normalMatrix*normal);
        vPosition=(modelViewMatrix*vec4(position,1.0)).xyz;
        vUv=uv;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
      }`,
    frag:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      uniform vec3 baseColor;
      float rand(vec2 co){return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453);}
      float noise(vec2 p){
        vec2 i=floor(p);vec2 f=fract(p);
        float a=rand(i),b=rand(i+vec2(1,0)),c=rand(i+vec2(0,1)),d=rand(i+vec2(1,1));
        vec2 u=f*f*(3.0-2.0*f);return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
      }
      void main(){
        // Rugina procedurala multistrat
        float r1=noise(vUv*8.0)*0.4;
        float r2=noise(vUv*20.0)*0.2;
        float r3=noise(vUv*50.0)*0.1;
        float rust=r1+r2+r3;
        // Culorile cuprului oxidat: portocaliu → ruginiu → brun
        vec3 orange=vec3(0.85,0.38,0.08);
        vec3 brown=vec3(0.48,0.20,0.04);
        vec3 dark=vec3(0.22,0.10,0.02);
        vec3 col=mix(orange,brown,rust);
        col=mix(col,dark,max(0.0,rust-0.5)*2.0);
        col=mix(col,baseColor*1.2,0.25);
        // Iluminare difuza
        vec3 L=normalize(vec3(1.5,2.5,1.0));
        float diff=max(dot(vNormal,L),0.0)*0.65+0.35;
        col*=diff;
        // Reflexie slaba metalica
        vec3 V=normalize(-vPosition);
        float spec=pow(max(dot(reflect(-L,vNormal),V),0.0),12.0)*0.1;
        col+=vec3(spec);
        col=pow(clamp(col*1.1,0.0,1.0),vec3(0.92));
        gl_FragColor=vec4(col,1.0);
      }`
  },

  // Shader PIATRA NATURALA — calcinar/travertin cu vene
  stone: {
    vert:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      void main(){
        vNormal=normalize(normalMatrix*normal);
        vPosition=(modelViewMatrix*vec4(position,1.0)).xyz;
        vUv=uv;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
      }`,
    frag:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      uniform vec3 baseColor;
      float rand(vec2 co){return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453);}
      float noise(vec2 p){
        vec2 i=floor(p);vec2 f=fract(p);
        float a=rand(i),b=rand(i+vec2(1,0)),c=rand(i+vec2(0,1)),d=rand(i+vec2(1,1));
        vec2 u=f*f*(3.0-2.0*f);return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
      }
      void main(){
        // Textura piatra cu vene
        float n1=noise(vUv*3.0)*0.3;
        float n2=noise(vUv*8.0)*0.12;
        float vein=abs(sin((vUv.x*4.0+noise(vUv*2.0)*1.5)*3.14159))*0.08;
        vec3 stoneBase=baseColor+vec3(n1+n2-0.2)*0.5;
        vec3 veinCol=vec3(0.95,0.88,0.72);
        stoneBase=mix(stoneBase,veinCol,vein);
        // Rosturi tivite (blocuri de piatra)
        float bx=step(0.96,fract(vUv.x*5.0));
        float by=step(0.94,fract(vUv.y*8.0));
        float joint=min(bx+by,1.0);
        stoneBase=mix(stoneBase,stoneBase*0.65,joint*0.6);
        // Iluminare cu speculare slaba (piatra lustruita)
        vec3 L=normalize(vec3(1.5,2.5,1.0));
        vec3 V=normalize(-vPosition);
        float diff=max(dot(vNormal,L),0.0)*0.7+0.3;
        float spec=pow(max(dot(reflect(-L,vNormal),V),0.0),24.0)*0.12;
        vec3 col=stoneBase*diff+vec3(spec);
        col=pow(clamp(col*1.15,0.0,1.0),vec3(0.9));
        gl_FragColor=vec4(col,1.0);
      }`
  },

  // Shader LEMN / RIGLE VERTICALE
  wood: {
    vert:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      void main(){
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position,1.0)).xyz;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    frag:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      uniform vec3 baseColor;

      float rand(vec2 co){ return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453); }
      float noise(vec2 p){
        vec2 i=floor(p); vec2 f=fract(p);
        float a=rand(i),b=rand(i+vec2(1,0)),c=rand(i+vec2(0,1)),d=rand(i+vec2(1,1));
        vec2 u=f*f*(3.0-2.0*f);
        return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
      }

      void main(){
        // Rigle verticale lemn
        float riglaWidth = 0.05;
        float riglaSpacing = 0.12;
        float xNorm = fract(vUv.x / riglaSpacing);
        float isRigla = step(1.0 - riglaWidth/riglaSpacing, xNorm);

        // Grain lemn orizontal
        vec2 grainUv = vec2(vUv.x * 3.0, vUv.y * 20.0);
        float grain = noise(grainUv)*0.15 + noise(grainUv*2.0)*0.08;

        // Culoare lemn variata per rigla (random per coloana)
        float col_var = rand(vec2(floor(vUv.x / riglaSpacing), 0.0)) * 0.15;

        vec3 woodBase = baseColor + vec3(col_var - 0.07) + vec3(grain - 0.1);
        vec3 woodDark = woodBase * 0.7;
        vec3 col = mix(woodDark, woodBase, isRigla);

        // Iluminare
        vec3 L = normalize(vec3(1.0, 1.5, 1.0));
        float diff = max(dot(vNormal, L), 0.0)*0.6 + 0.4;
        col *= diff;

        gl_FragColor = vec4(col, 1.0);
      }`
  },

  // Shader TENCUIALA / VOPSEA
  plaster: {
    vert:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      void main(){
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position,1.0)).xyz;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    frag:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      uniform vec3 baseColor;

      float rand(vec2 co){ return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453); }
      float noise(vec2 p){
        vec2 i=floor(p); vec2 f=fract(p);
        float a=rand(i),b=rand(i+vec2(1,0)),c=rand(i+vec2(0,1)),d=rand(i+vec2(1,1));
        vec2 u=f*f*(3.0-2.0*f);
        return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
      }

      void main(){
        // Tencuiala texturata — granulatie fina multistrat
        float n1 = noise(vUv*40.0)*0.06;
        float n2 = noise(vUv*10.0)*0.04;
        vec3 col = baseColor + vec3(n1+n2-0.05);
        // Saturatie crescuta pentru prezentare
        float lum = dot(col, vec3(0.299,0.587,0.114));
        col = mix(vec3(lum), col, 1.4);

        // Iluminare cu 2 surse (soare + fill albastru)
        vec3 L1 = normalize(vec3(1.5, 2.5, 1.0));
        vec3 L2 = normalize(vec3(-0.5, 1.0, -1.0));
        vec3 V = normalize(-vPosition);
        float diff1 = max(dot(vNormal, L1), 0.0);
        float diff2 = max(dot(vNormal, L2), 0.0)*0.25;
        float spec = pow(max(dot(reflect(-L1,vNormal),V),0.0),8.0)*0.05;
        vec3 amb = vec3(0.08,0.12,0.18);
        col = col*(amb + vec3(diff1*0.8+diff2)) + vec3(spec);
        col = pow(clamp(col*1.25,0.0,1.0), vec3(0.9));

        gl_FragColor = vec4(col, 1.0);
      }`
  },

  // Shader METAL / PANOURI
  metal: {
    vert:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      void main(){
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position,1.0)).xyz;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    frag:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      uniform vec3 baseColor;

      void main(){
        // Metal anodizat / aluminiu lustruit cu rosturi
        vec2 cell = fract(vUv * vec2(2.0, 4.0));
        float rost = step(0.96, cell.x) + step(0.96, cell.y);

        vec3 V = normalize(-vPosition);
        vec3 L1 = normalize(vec3(1.5, 2.5, 1.0));
        vec3 L2 = normalize(vec3(-0.5, 1.0, -1.5));
        vec3 H1 = normalize(L1+V);

        // Reflexie cer pe suprafata metalica
        vec3 R = reflect(-V, vNormal);
        float skyR = max(0.0, R.y);
        vec3 envCol = mix(vec3(0.3,0.5,0.9), vec3(0.9,0.95,1.0), skyR);
        envCol += vec3(1.0,0.8,0.3)*pow(max(0.0,dot(R,L1)),6.0)*0.5;

        float diff = max(dot(vNormal,L1),0.0)*0.35+0.1;
        vec3 col = mix(baseColor*diff, envCol, 0.55);

        // Specular metalic puternic
        float spec1 = pow(max(dot(vNormal,H1),0.0),200.0);
        float spec2 = pow(max(dot(reflect(-L2,vNormal),V),0.0),60.0);
        col += vec3(1.0,0.98,0.92)*spec1*1.2 + vec3(0.5,0.7,1.0)*spec2*0.4;

        // Striuri anodizare
        float stripes = 0.04*(sin(vUv.y*80.0)*0.5+0.5);
        col += vec3(stripes)*0.06;
        // Rosturi inchise
        col = mix(col, vec3(0.05), rost*0.7);

        col = pow(clamp(col*1.2,0.0,1.0), vec3(0.88));
        gl_FragColor = vec4(col, 1.0);
      }`
  }
};
var FAL_AI = {
  // Key incercat din localStorage la pornire (salvat anterior)
  apiKey: (() => { try{ return localStorage.getItem('fal_api_key')||''; }catch(e){ return ''; } })(),
  model: 'fal-ai/flux/schnell',  // FLUX.1 Schnell - rapid si economic
  lastRender: null,
  rendering: false,
};
var _AIIMG = { scale:1, dx:0, dy:0, panMode:false, dragging:false, lastX:0, lastY:0 };
var CADASTRU = {
  hasPMTiles: false,
  pmtilesUrl: null,   // setat de utilizator sau detectat automat
  loaded: false,
};
var SOLAR = {
  date: new Date(),
  hour: 14,    // ora implicita: 14:00 (lumina buna)
  active: false
};
var LOISIR_STATE = {
  active:false, selectionMode:'axis', corridorMeters:45, bikeWidth:3, runWidth:2.5, walkWidth:3,
  benchSpacing:25, lightingSpacing:30, vegetationDensity:75, userArea:null, userAxis:null,
  importedArea:null, importedAxis:null, features:null, draw:null, lastValidation:null
};
var LOISIR_AI_STATE = {
  rendering:false, lastScreenshot:null, lastPrompt:null, lastRender:null,
  endpoint:''
};
var V3D = { r:null, scene:null, cam:null, af:null, ctx:[], aedis:[], texCache:{},
  th:Math.PI/4, ph:Math.PI/2.4, rad:45, tx:null };
var SV = {
  open: false,
  showVolume: true,
  currentPos: null,   // {lat, lng, heading, pitch}
  positions: [],      // puncte sugerate in jurul parcelei
};
// ─────────────────────────────────────────────────────────────────

// Error handler global
window.onerror = function(msg,src,line,col,err){
  document.getElementById('status').textContent = '❌ Eroare JS: '+msg+' (L'+line+')';
  console.error(msg,src,line,col,err);
  return false;
};
window.addEventListener('unhandledrejection',function(e){
  document.getElementById('status').textContent = '❌ Eroare async: '+(e.reason?.message||e.reason);
  console.error('Unhandled promise rejection:',e.reason);
});

// ═══ URBANX v16 ═══════════════════════════════════════════════════════════
const _g=id=>document.getElementById(id);
const ss=t=>{_g('status').textContent=t};
const esc=v=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const pN=v=>{const n=Number(String(v??'').replace(',','.'));return Number.isFinite(n)&&n>=0?n:null};
const normU=v=>String(v??'').trim().replace(/[?\s]/g,'').toUpperCase();

// Mapare UTR-uri cu variante (minuscule, compuse, necanonice) -> UTR canonic
var UTR_ALIASES={
  'AI2A':['AI2a'],'AI2B':['AI2b'],'AI2C':['AI2c','AI2d'],
  'AI4A':['AI4a'],'P1A':['P1a'],'P1B':['P1b'],'T1B':['T1b'],
  'LB':['LBC2','LB,C2','LBC2'],
  // P6, P8, P9 = zone tehnice/parcaje/servicii speciale -> P5 ca fallback
  'P5':['P6','P8','P9','GP9','G/P9','P9?'],
  'P2':['P2a','P2A','P2b','P2B','P2c','P2C'],
  'P1':['P1a,P1b','P1a/P1b','P1A,P1B','P1A/P1B'],
  'PP':['PP?'],'CC':['CC?'],'LV':['LV?','LV??'],
  // Coduri generice din pug.geojson → coduri specifice reguli.json
  'LL':['LL?','L1','l1','LR','lr'],  // Rezidențial individual
  'LC':['L2','l2'],              // Rezidențial colectiv
  'CC':['CC','cc'],              // Comercial/comerț
  'D1':['IS','is'],              // Instituții și servicii
  'AI2A':['I','i','I1','i1'],    // Industrial
  'P1':['V','v','V1','v1'],      // Spații verzi/parcuri
  'P5':['TR','tr'],              // Transport
  'G1':['GC','gc'],              // Gospodărire comunală
  'AA':['A','a'],                // Agricol
};
// Inversa: UTR_brut_normalizat -> UTR_canonic
var UTR_MAP={};
Object.entries(UTR_ALIASES).forEach(([canon,variants])=>{
  variants.forEach(v=>{ UTR_MAP[normU(v)]=canon; });
});
// Rezolva UTR: normalizare + alias lookup
const resolveUTR=raw=>{ const n=normU(raw); return UTR_MAP[n]||n; };
const fmt=(v,s='')=>v!=null&&!isNaN(v)?`${v}${s}`:'—';

// Normalizare reguli.json (orice format) → format intern standard
function normalizeReguliEntry(v) {
  if (!v || typeof v !== 'object') return v;
  const e = Object.assign({}, v);
  if (!e.h)   e.h   = e.inaltime_m || e.inaltime_max_m || e.hmax_m || null;
  if (!e.d)   e.d   = e.functiune || e.denumire || null;
  if (!e.niv) e.niv = e.niv_max || null;
  if (!e.sv)  e.sv  = e.spatii_verzi_pct || null;
  if (!e.ao)  e.ao  = e.rh || e.regim || null;
  if (!e.fm)  e.fm  = e.suprafata_min_mp || null;
  // ua/uc/ui — normalizare array → string
  if (!e.ua) {
    const raw = e.functiuni_admise || e.fn_complementare || [];
    e.ua = Array.isArray(raw) ? raw.join('; ') : (raw || null);
  }
  if (!e.uc) {
    const raw = e.functiuni_conditionari || [];
    e.uc = Array.isArray(raw) ? raw.join('; ') : (raw || null);
  }
  if (!e.ui) {
    const raw = e.functiuni_interzise || e.fn_interzise || e.utilizari_interzise || [];
    e.ui = Array.isArray(raw) ? raw.join('; ') : (raw || null);
  }
  // ── Retrageri → rf/rl/rr/rs (numeric, extras din string "5.00m de la aliniament") ──
  function parseM(s) {
    if (s == null) return null;
    if (typeof s === 'number') return s;
    var m1 = String(s).match(/min\.?\s+([\d]+(?:[.,][\d]+)?)\s*m/);
    if (m1) return parseFloat(m1[1].replace(',', '.'));
    var m2 = String(s).match(/([\d]+(?:[.,][\d]+)?)\s*m/);
    return m2 ? parseFloat(m2[1].replace(',', '.')) : null;
  }
  if (e.rf == null) e.rf = parseM(e.retragere_fata   || e.retragere_strada   || null);
  if (e.rl == null) e.rl = parseM(e.retragere_laterala || e.retragere_lat    || null);
  if (e.rr == null) e.rr = parseM(e.retragere_laterala || e.retragere_lat    || null);
  if (e.rs == null) e.rs = parseM(e.retragere_spate  || e.retragere_posterior || null);
  // front_min_m și parcela_min_mp
  if (e.lung_min_aliniament_m == null && e.front_min_m != null) e.lung_min_aliniament_m = e.front_min_m;
  if (e.fm == null && e.parcela_min_mp != null) e.fm = e.parcela_min_mp;
  // ua fallback extins
  if (!e.ua) {
    const raw2 = e.utilizari_admise || [];
    e.ua = Array.isArray(raw2) ? raw2.join('; ') : (raw2 || null);
  }
  return e;
}

// Patch Object.assign(REGULI, ...) — normalizăm orice reguli.json la merge
// ── Conversie format nou (subzone+utrs) → format vechi (cod→params) ────────
function _convertReguliNew2Old(d) {
  if (!d || !d.subzone || !d.utrs) return {};
  const subzone = d.subzone;
  const result = {};
  
  const ZONA_TO_OLD = {
    'C':'CC','LM':'L1','LI':'L2','IS':'IS','I':'I',
    'A':'A','P':'V','GC_TE':'GC','CC':'TR','S':'IS',
    'TAG':'A','TA':'V','PS':'V','PA':'V',
  };
  
  // Entry per subzonă
  Object.entries(subzone).forEach(function([szId, sz]) {
    const zona = sz.zona_parinte || '';
    const oldCode = ZONA_TO_OLD[zona] || zona;
    const entry = {
      d: sz.denumire || szId,
      pot: sz.pot_baza,
      cut: sz.cut_baza,
      h: sz.hmax_m,
      niv: sz.niv_max,
      sv: sz.spatii_verzi_pct,
      fm: sz.suprafata_min_mp,
      ao: sz.regim,
      rf: sz.rf_m || null,
      rl: sz.rl_m || null,
      rs: sz.rr_m || null,
      pk: sz.pk_locuri || sz.parcaje_min || null,
      ua: Array.isArray(sz.fn_complementare) ? sz.fn_complementare.join('; ') : null,
      ui: Array.isArray(sz.fn_interzise) ? sz.fn_interzise.join('; ') : null,
      _subzona: szId,
      _zona: zona,
    };
    result[szId] = entry;
    if (oldCode && !result[oldCode]) result[oldCode] = entry;
  });
  
  return result;
}

function mergeIntoREGULI(newReguli, cityKey) {
  if (!newReguli || typeof newReguli !== 'object') return;
  const ck = cityKey || window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
  // Format nou cu subzone+utrs (ex: Botoșani)
  if (newReguli.subzone && newReguli.utrs) {
    const converted = _convertReguliNew2Old(newReguli);
    Object.entries(converted).forEach(([k,v]) => { REGULI[k] = normalizeReguliEntry(v); });
    window._PUG_REGULI = window._PUG_REGULI || {};
    window._PUG_REGULI[ck] = newReguli;
    console.log('[mergeIntoREGULI] format nou BT →', Object.keys(converted).length, 'coduri, cityKey=', ck);
    return;
  }
  // Format cu subzone fără utrs (ex: Iași, comune) — populăm REGULI[] direct din subzone
  if (newReguli.subzone) {
    Object.entries(newReguli.subzone).forEach(([szId, sz]) => {
      const entry = {
        d:   sz.denumire || szId,
        pot: sz.pot_baza,
        cut: sz.cut_baza,
        h:   sz.hmax_m,
        niv: sz.niv_max,
        sv:  sz.spatii_verzi_pct,
        fm:  sz.suprafata_min_mp || sz.parcele_min_mp,
        ao:  sz.regim,
        rf:  sz.rf != null ? sz.rf : (sz.rf_m || null),
        rl:  sz.rl != null ? sz.rl : (sz.rl_m || null),
        rr:  sz.rl != null ? sz.rl : (sz.rl_m || null),
        rs:  sz.rs != null ? sz.rs : (sz.rr_m || null),
        pk:  sz.parcaje_min || null,
        ua:  Array.isArray(sz.utilizari_admise) ? sz.utilizari_admise.join('; ') : (sz.utilizari_admise || null),
        uc:  Array.isArray(sz.utilizari_conditionate) ? sz.utilizari_conditionate.join('; ') : (sz.utilizari_conditionate || null),
        ui:  Array.isArray(sz.utilizari_interzise) ? sz.utilizari_interzise.join('; ') : (sz.utilizari_interzise || null),
      };
      REGULI[szId] = normalizeReguliEntry(entry);
    });
    window._PUG_REGULI = window._PUG_REGULI || {};
    window._PUG_REGULI[ck] = newReguli;
    console.log('[mergeIntoREGULI] format subzone →', Object.keys(newReguli.subzone).length, 'coduri, cityKey=', ck);
    return;
  }
  // Format standard vechi (chei directe)
  Object.entries(newReguli).forEach(([k,v]) => {
    if (k.startsWith('_') || typeof v !== 'object') return;
    REGULI[k] = normalizeReguliEntry(v);
  });
  console.log('[mergeIntoREGULI] format standard →', Object.keys(newReguli).length, 'coduri, cityKey=', ck);
}

// ═══ MAPBOX ═══════════════════════════════════════════════════════════════
mapboxgl.accessToken='pk.eyJ1IjoiZWk4aHRlciIsImEiOiJjajhhNGtiN3YwOW50MnFwOHBnOGJtcjVtIn0.dT4Ld3v1GoeQRCaIzxNn2g';

// ════════════════════════════════════════════════════════════════════════
// SUPABASE AUTH — UrbanX
// IMPORTANT: înlocuiți SUPABASE_URL și SUPABASE_ANON_KEY cu valorile
// din Settings → API în dashboard-ul vostru Supabase
// ════════════════════════════════════════════════════════════════════════
const SUPABASE_URL  = 'https://xzctxxchdykowysqjzkq.supabase.co';
// Noul format Supabase: folosiți "Publishable key" (sb_publishable_...)
// din Settings → API Keys → Publishable key → Copy
// NU folosiți Secret key (sb_secret_...) — aceea rămâne pe server
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Y3R4eGNoZHlrb3d5c3FqemtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2Mzg4NzAsImV4cCI6MjA5MzIxNDg3MH0.6ffZgWVs8PmDB8tNg1UmGmvHZQrNv6zhr6BE9fTmyS0';

let _supabase = null;
// ── ADMIN CONFIG ─────────────────────────────────────────────────────────────
const ADMIN_EMAILS = ['3dtravelsoftart@gmail.com', 'office@m2msolutions.ro']; // adaugă emailuri admin aici
let _isAdmin = false;

let _authUser = null;
let _authMode = 'login'; // 'login' | 'register'

// Inițializare Supabase
function _initSupabase() {
  try {
    if(typeof supabase === 'undefined') return false;
    if(SUPABASE_KEY.startsWith('sb_publishable_')) {
      console.error('UrbanX Auth: Folosiți Legacy anon key (eyJ...) nu sb_publishable_!');
      return false;
    }
    _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    window._supabase = _supabase;   // expus pt UXRoles (manager roluri/utilizatori)
    return true;
  } catch(e) {
    console.warn('Supabase init failed:', e.message);
    return false;
  }
}

// Toggle tab login/register
function _authTab(mode) {
  // ── INVITE-ONLY: tab-ul Register afișează mesaj, nu formular ────────────
  if(mode === 'register'){
    _authMsg('🔒 Acces pe bază de invitație — contactați administratorul UrbanX pentru un cont.', true);
    // Nu schimbăm modul — rămânem pe login
    return;
  }
  _authMode = 'login';
  document.getElementById('tab-login').style.background    = '#1e2d42';
  document.getElementById('tab-login').style.color         = '#fff';
  document.getElementById('tab-register').style.background = 'transparent';
  document.getElementById('tab-register').style.color      = '#475569';
  document.getElementById('tab-register').style.cursor     = 'default';
  document.getElementById('tab-register').title            = 'Acces pe invitație — contactați admin';
  document.getElementById('auth-btn').textContent          = '🔐 Autentificare';
  document.getElementById('auth-forgot-wrap').style.display = 'block';
  _authMsg('');
}

// Afișare mesaj
function _authMsg(txt, isErr) {
  const el = document.getElementById('auth-msg');
  if(!txt){ el.style.display='none'; return; }
  el.style.display = 'block';
  el.style.background = isErr ? 'rgba(239,68,68,.15)' : 'rgba(34,197,94,.12)';
  el.style.border = `1px solid ${isErr ? 'rgba(239,68,68,.3)' : 'rgba(34,197,94,.3)'}`;
  el.style.color = isErr ? '#fca5a5' : '#86efac';
  el.textContent = txt;
}

// Login / Register
async function _authSubmit() {
  if(SUPABASE_URL.includes('INLOCUIESTE') || SUPABASE_KEY.includes('INLOCUIESTE')) {
    // Demo mode — Supabase neconfigurat, bypass cu warning
    _authMsg('⚠ Mod demo — conectați Supabase pentru autentificare reală', false);
    setTimeout(() => _authSuccess({ email: 'demo@urbanx.ro', id: 'demo' }), 900);
    return;
  }
  if(!_supabase) { _authMsg('Eroare: Supabase indisponibil.', true); return; }

  const email = document.getElementById('auth-email').value.trim();
  const pass  = document.getElementById('auth-pass').value;
  const btn   = document.getElementById('auth-btn');

  if(!email || !pass) { _authMsg('Completați email și parola.', true); return; }
  if(pass.length < 8) { _authMsg('Parola trebuie să aibă minim 8 caractere.', true); return; }

  btn.textContent = '⏳ Se procesează…';
  btn.disabled = true;
  _authMsg('');

  try {
    let res;
    if(_authMode === 'login') {
      res = await _supabase.auth.signInWithPassword({ email, password: pass });
    } else {
      // ── INVITE-ONLY: înregistrările publice sunt DEZACTIVATE ────────────
      // Conturile noi se creează EXCLUSIV prin invitație de la admin.
      // Admin-ul trimite invitații din panoul Admin → Utilizatori → Invită.
      _authMsg('🔒 Accesul este pe bază de invitație. Contactați administratorul pentru un cont.', true);
      btn.disabled = false;
      btn.textContent = '✅ Creare cont';
      return;
    }

    if(res.error) {
      const msgs = {
        'Invalid login credentials': 'Email sau parolă incorectă.',
        'Email not confirmed': 'Confirmați email-ul înainte de login.',
        'User already registered': 'Contul există deja — autentificați-vă.',
        'Password should be at least 6 characters': 'Parola prea scurtă (minim 8 caractere).',
      };
      _authMsg(msgs[res.error.message] || res.error.message, true);
    } else if(_authMode === 'register' && !res.data?.session) {
      _authMsg('✅ Cont creat! Verificați email-ul pentru confirmare.', false);
    } else {
      _authSuccess(res.data.user);
    }
  } catch(e) {
    _authMsg('Eroare conexiune: ' + e.message, true);
  }

  btn.disabled = false;
  btn.textContent = _authMode === 'login' ? '🔐 Autentificare' : '✅ Creare cont';
}

// Google OAuth
async function _authGoogle() {
  if(!_supabase || SUPABASE_URL.includes('INLOCUIESTE') || SUPABASE_KEY.includes('INLOCUIESTE')) {
    _authMsg('OAuth Google necesită Supabase configurat.', true); return;
  }
  const { error } = await _supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.href }
  });
  if(error) _authMsg(error.message, true);
}

// Forgot password
async function _authForgot() {
  const email = document.getElementById('auth-email').value.trim();
  if(!email) { _authMsg('Introduceți email-ul pentru resetare parolă.', true); return; }
  if(!_supabase || SUPABASE_URL.includes('INLOCUIESTE') || SUPABASE_KEY.includes('INLOCUIESTE')) {
    _authMsg('Reset parolă necesită Supabase configurat.', true); return;
  }
  const { error } = await _supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.href
  });
  _authMsg(error ? error.message : '✅ Email de resetare trimis! Verificați inbox-ul.', !!error);
}

// Autentificare reușită — ascundem overlay-ul
function _authSuccess(user) {
  _authUser = user;
  _isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  // 001: propagă ROLUL real (din Supabase user/app_metadata) către _USER → filtrarea pe rol.
  // Fără rol asignat → rămâne null → UXRoles implicit FULL (vede tot; zero regresie).
  try {
    const _meta = (user && (user.app_metadata || user.user_metadata)) || {};
    if (window._USER) {
      window._USER.email = user?.email || window._USER.email;
      window._USER.isAdmin = !!_isAdmin;
      window._USER.role = _meta.role || _meta.rol || (_isAdmin ? 'SUPER_ADMIN' : window._USER.role);
    }
    // dacă sertarul e deschis, re-aplică filtrarea imediat
    if (window.UXSidebar && window.UXSidebar.render && document.getElementById('ux-sidebar-body')) window.UXSidebar.render();
  } catch (e) { console.warn('[001 role]', e); }

  // 001: rolul ASIGNAT din tabelul Supabase `user_roles` (admin poate seta altor useri).
  // NO-OP dacă tabelul nu există încă (eroarea e prinsă) → fallback la metadata/FULL.
  try {
    if (_supabase && user?.email) {
      _supabase.from('user_roles').select('role,uat_siruta').eq('email', user.email).maybeSingle()
        .then(function (res) {
          if (res && res.data && res.data.role && window._USER) {
            window._USER.role = res.data.role;
            if (res.data.uat_siruta) window._USER.uatSiruta = res.data.uat_siruta;
            // UNIFICARE: rolul granular SUPER_ADMIN/ADMIN_UAT acordă și privilegiul de admin (panou)
            if (res.data.role === 'SUPER_ADMIN' || res.data.role === 'ADMIN_UAT') {
              _isAdmin = true; window._USER.isAdmin = true;
              try { var ab = document.getElementById('btn-admin'); if (ab) ab.style.display = 'flex'; } catch (e) {}
            }
            if (window.UXSidebar && window.UXSidebar.render && document.getElementById('ux-sidebar-body')) window.UXSidebar.render();
            console.log('[001 role] rol din user_roles:', res.data.role);
          }
        }).catch(function () { });
    }
  } catch (e) { }

  const ov = document.getElementById('auth-overlay');
  if(ov) {
    ov.style.transition = 'opacity .4s ease';
    ov.style.opacity = '0';
    setTimeout(() => { ov.style.display = 'none'; }, 420);
  }
  // Afișăm email-ul în topbar
  const userLbl = document.getElementById('auth-user-label');
  if(userLbl && user?.email) {
    const shortEmail = user.email.split('@')[0];
    userLbl.textContent = shortEmail.length > 10 ? shortEmail.slice(0,10)+'…' : shortEmail;
  }
  // Buton Admin în topbar (doar pentru admini)
  const adminBtn = document.getElementById('btn-admin');
  if(adminBtn) adminBtn.style.display = _isAdmin ? 'flex' : 'none';

  console.log('✅ UrbanX Auth OK:', user?.email || user?.id, _isAdmin ? '[ADMIN]' : '');
}

// Logout
function _authLogout(userTriggered=false) {
  // signOut() apelat DOAR când utilizatorul dă click pe butonul de deconectare
  // NU când e logout automat (token expirat) — evită loop de logout
  if(userTriggered && _supabase) _supabase.auth.signOut();
  _authUser = null;
  const ov = document.getElementById('auth-overlay');
  if(ov) { ov.style.display='flex'; ov.style.opacity='1'; }
  const em = document.getElementById('auth-email');
  const pw = document.getElementById('auth-pass');
  if(em) em.value = '';
  if(pw) pw.value  = '';
  _authTab('login');
}

// ── Startup: verificăm sesiunea existentă ──────────────────────────────
(async function _authInit() {
  const ok = _initSupabase();

  if(!ok || SUPABASE_URL.includes('INLOCUIESTE')) {
    // Supabase neconfigurat — afișăm overlay în mod demo
    // Utilizatorul poate intra apăsând butonul (bypass automat)
    return;
  }

  try {
    // ── Listener auth state — atașat MEREU (nu doar la prima încărcare) ────
    // Fix: SIGNED_OUT se poate declanșa la expirarea token-ului sau erori rețea
    // → încearcă refresh sesiune înainte de a afișa login overlay
    _supabase.auth.onAuthStateChange(async (event, session) => {
      if(event === 'SIGNED_IN' && session?.user) {
        _authSuccess(session.user);
      } else if(event === 'TOKEN_REFRESHED' && session?.user) {
        // Token reînnoit silențios — rămânem logați
        _authUser = session.user;
        console.log('✅ Token reînnoit automat:', session.user.email||session.user.id);
      } else if(event === 'SIGNED_OUT') {
        // NU delogăm imediat — verificăm dacă sesiunea e cu adevărat invalidă
        // (evităm false-logout la freeze rețea sau erori temporare Supabase)
        try {
          await new Promise(r => setTimeout(r, 600)); // mică așteptare
          const { data: { session: currentSess } } = await _supabase.auth.getSession();
          if(currentSess?.user) {
            // Sesiunea e validă — a fost o eroare tranzitorie, nu delogăm
            _authUser = currentSess.user;
            console.log('ℹ️ SIGNED_OUT tranzitor, sesiune validă — rămân logat');
            return;
          }
        } catch(e2) {
          console.warn('Auth refresh check failed:', e2.message);
        }
        // Sesiunea chiar a expirat sau utilizatorul s-a delogat explicit
        _authLogout();
      }
    });

    // Verificăm dacă există o sesiune activă (după refresh pagină)
    const { data: { session } } = await _supabase.auth.getSession();
    if(session?.user) {
      _authSuccess(session.user);
      return;
    }
  } catch(e) {
    console.warn('Auth check failed:', e.message);
  }
})();

var STYLES={
  custom:'mapbox://styles/ei8hter/clftn1bs7001l01qkclbhwzzq',
  standard:'mapbox://styles/mapbox/standard',
  streets:'mapbox://styles/mapbox/streets-v12',
  sat:'mapbox://styles/mapbox/satellite-streets-v12'
};

// ═══ REGULI PUG ═══════════════════════════════════════════════════════════
var REGULI={
"LL":{d:"Locuințe individuale",pot:35,cut:1.0,niv:2,h:10,rf:5,rl:3,rs:5,sv:30,pk:2,ao:"NU",fm:null,ua:"Locuințe și funcțiuni compatibile",uc:"Comerț mic",ui:"Industrie și depozitare"},
"LL2":{d:"Locuințe individuale tip 2",pot:35,cut:1.0,niv:2,h:10,rf:5,rl:3,rs:5,sv:30,pk:2,ao:"NU",fm:null,ua:"Locuințe compatibile",uc:"Comerț mic",ui:"Industrie"},
"LA":{d:"Locuințe + funcțiuni complementare",pot:35,cut:1.2,niv:2,h:12,rf:5,rl:3,rs:5,sv:30,pk:2,ao:"NU",fm:null,ua:"Locuire individuală și colectivă; servicii",uc:"Comerț și servicii",ui:"Activități industriale"},
"LA1":{d:"Locuințe + funcțiuni tip 1",pot:35,cut:1.2,niv:2,h:12,rf:5,rl:3,rs:5,sv:30,pk:2,ao:"NU",fm:null,ua:"Locuire; servicii mici",uc:"Comerț compatibil",ui:"Industrie"},
"LB":{d:"Locuințe colective mici",pot:40,cut:1.5,niv:3,h:14,rf:5,rl:3,rs:5,sv:25,pk:1,ao:"NU",fm:null,ua:"Locuințe colective, servicii",uc:"Comerț la parter",ui:"Industrie"},
"LB,C2":{d:"Locuințe colective + comerț",pot:45,cut:1.8,niv:3,h:14,rf:3,rl:3,rs:5,sv:20,pk:1,ao:"DA",fm:null,ua:"Locuire colectivă, comerț, servicii",uc:"Funcțiuni compatibile",ui:"Industrie poluantă"},
"LC":{d:"Locuințe colective",pot:40,cut:1.6,niv:4,h:16,rf:5,rl:3,rs:5,sv:25,pk:1,ao:"NU",fm:null,ua:"Locuințe colective, servicii aferente",uc:"Comerț la parter",ui:"Industrie"},
"LV":{d:"Locuințe cu vegetație",pot:25,cut:0.7,niv:1,h:8,rf:8,rl:4,rs:8,sv:40,pk:2,ao:"NU",fm:null,ua:"Locuire cu grădini",uc:"Servicii mici",ui:"Industrie"},
"CM":{d:"Zonă mixtă",pot:60,cut:3.0,niv:6,h:24,rf:0,rl:3,rs:5,sv:20,pk:3,ao:"DA",fm:18,ua:"Comerț, birouri, servicii, locuire",uc:"Funcțiuni sensibile",ui:"Industrie poluantă"},
"CA":{d:"Zonă centrală",pot:80,cut:4.0,niv:7,h:28,rf:0,rl:0,rs:3,sv:10,pk:2,ao:"DA",fm:12,ua:"Funcțiuni mixte interes public și privat",uc:"Activități culturale",ui:"Industrie"},
"CC":{d:"Comerț și servicii",pot:70,cut:3.5,niv:5,h:20,rf:0,rl:0,rs:3,sv:10,pk:3,ao:"DA",fm:null,ua:"Comerț, servicii, alimentație publică",uc:"Locuire la etaje",ui:"Industrie poluantă"},
"CP":{d:"Comerț predominant",pot:65,cut:2.8,niv:4,h:18,rf:0,rl:3,rs:5,sv:15,pk:3,ao:"DA",fm:null,ua:"Comerț, servicii",uc:"Locuire condiționată",ui:"Industrie"},
"CB1":{d:"Construită protejată 1",pot:55,cut:1.8,niv:1,h:8,rf:0,rl:0,rs:3,sv:20,pk:1,ao:"DA",fm:null,ua:"Funcțiuni compatibile cu patrimoniul",uc:"Consolidare",ui:"Incompatibile"},
"CB2":{d:"Construită protejată 2",pot:60,cut:2.0,niv:2,h:10,rf:0,rl:0,rs:3,sv:18,pk:1,ao:"DA",fm:null,ua:"Funcțiuni compatibile",uc:"Consolidare",ui:"Incompatibile"},
"CB3":{d:"Construită protejată 3",pot:60,cut:2.0,niv:3,h:14,rf:0,rl:0,rs:3,sv:15,pk:1,ao:"DA",fm:null,ua:"Funcțiuni mixte compatibile",uc:"Consolidare",ui:"Incompatibile"},
"CB4":{d:"Construită protejată 4",pot:62,cut:2.2,niv:4,h:16,rf:0,rl:0,rs:3,sv:15,pk:1,ao:"DA",fm:null,ua:"Funcțiuni mixte",uc:"Consolidare",ui:"Incompatibile"},
"CB5":{d:"Construită protejată 5",pot:65,cut:2.5,niv:5,h:20,rf:0,rl:0,rs:3,sv:12,pk:1,ao:"DA",fm:null,ua:"Funcțiuni mixte",uc:"Consolidare",ui:"Incompatibile"},
"CB6":{d:"Construită protejată 6",pot:68,cut:2.8,niv:6,h:24,rf:0,rl:0,rs:3,sv:10,pk:1,ao:"DA",fm:null,ua:"Funcțiuni mixte",uc:"Consolidare",ui:"Incompatibile"},
"CB7":{d:"Construită protejată 7",pot:70,cut:3.0,niv:7,h:28,rf:0,rl:0,rs:3,sv:10,pk:1,ao:"DA",fm:null,ua:"Funcțiuni mixte",uc:"Consolidare",ui:"Incompatibile"},
"D1":{d:"Dotări publice",pot:45,cut:1.5,niv:3,h:16,rf:5,rl:5,rs:5,sv:25,pk:2,ao:"DA",fm:null,ua:"Școli, spitale, primărie",uc:"Servicii conexe",ui:"Industrie"},
"AI1":{d:"Industrial 1",pot:55,cut:1.8,niv:2,h:12,rf:5,rl:5,rs:5,sv:15,pk:1,ao:"NU",fm:null,ua:"Producție ușoară",uc:"Servicii productive",ui:"Locuire"},
"AI2A":{d:"Industrial 2A",pot:60,cut:2.0,niv:3,h:14,rf:10,rl:10,rs:10,sv:10,pk:1,ao:"NU",fm:null,ua:"Activități industriale",uc:"Servicii aferente",ui:"Locuire"},
"AI2B":{d:"Industrial 2B",pot:60,cut:2.0,niv:3,h:14,rf:10,rl:10,rs:10,sv:10,pk:1,ao:"NU",fm:null,ua:"Industrial tip B",uc:"Servicii",ui:"Locuire"},
"AI2C":{d:"Industrial 2C",pot:60,cut:2.0,niv:3,h:14,rf:10,rl:10,rs:10,sv:10,pk:1,ao:"NU",fm:null,ua:"Industrial tip C",uc:"Servicii",ui:"Locuire"},
"AI3":{d:"Industrial 3",pot:70,cut:3.0,niv:5,h:20,rf:15,rl:15,rs:15,sv:10,pk:1,ao:"NU",fm:null,ua:"Industrie mare",uc:"Administrative",ui:"Locuire"},
"AI4":{d:"Industrial 4",pot:70,cut:3.5,niv:6,h:24,rf:20,rl:20,rs:20,sv:10,pk:1,ao:"NU",fm:null,ua:"Platforme industriale",uc:"Suport",ui:"Locuire"},
"AI4A":{d:"Industrial 4A",pot:75,cut:4.0,niv:7,h:28,rf:20,rl:20,rs:20,sv:10,pk:1,ao:"NU",fm:null,ua:"Platforme extinse",uc:"Suport extins",ui:"Locuire"},
"AI5":{d:"Industrial 5",pot:75,cut:4.0,niv:8,h:32,rf:20,rl:20,rs:20,sv:8,pk:1,ao:"NU",fm:null,ua:"Industrie grea",uc:"Administrative",ui:"Locuire"},
"AI6":{d:"Industrial 6",pot:80,cut:4.5,niv:9,h:36,rf:25,rl:25,rs:25,sv:8,pk:1,ao:"NU",fm:null,ua:"Industrie specială",uc:"Speciale",ui:"Locuire"},
"P1":{d:"Parc",pot:5,cut:0.1,niv:1,h:5,rf:10,rl:10,rs:10,sv:90,pk:0,ao:"NU",fm:null,ua:"Parcuri, alei",uc:"Agrement",ui:"Construcții"},
"P1A":{d:"Parc cartier",pot:5,cut:0.1,niv:1,h:5,rf:5,rl:5,rs:5,sv:90,pk:0,ao:"NU",fm:null,ua:"Spații verzi",uc:"Dotări mici",ui:"Construcții"},
"P1B":{d:"Spații verzi",pot:2,cut:0.05,niv:0,h:3,rf:5,rl:5,rs:5,sv:95,pk:0,ao:"NU",fm:null,ua:"Scuaruri",uc:"-",ui:"Construcții"},
"P2":{d:"Spații verzi 2",pot:5,cut:0.1,niv:1,h:5,rf:10,rl:10,rs:10,sv:88,pk:0,ao:"NU",fm:null,ua:"Agrement",uc:"Dotări",ui:"Construcții"},
"P3":{d:"Zone agrement",pot:8,cut:0.2,niv:1,h:6,rf:10,rl:10,rs:10,sv:85,pk:0,ao:"NU",fm:null,ua:"Sport în aer liber",uc:"Temporare",ui:"Construcții"},
"P4":{d:"Sport și agrement",pot:20,cut:0.5,niv:1,h:12,rf:10,rl:10,rs:10,sv:50,pk:2,ao:"NU",fm:null,ua:"Baze sportive",uc:"Servicii conexe",ui:"Locuire"},
"P5":{d:"Agrement și turism",pot:25,cut:0.8,niv:2,h:12,rf:10,rl:10,rs:10,sv:40,pk:1,ao:"NU",fm:null,ua:"Cazare, agrement",uc:"Comerț turistic",ui:"Industrie"},
"P":{d:"Parc",pot:5,cut:0.1,niv:1,h:5,rf:10,rl:10,rs:10,sv:90,pk:0,ao:"NU",fm:null,ua:"Parc",uc:"Agrement",ui:"Construcții"},
"AA":{d:"Agricolă",pot:10,cut:0.2,niv:1,h:6,rf:10,rl:5,rs:5,sv:60,pk:0,ao:"NU",fm:null,ua:"Grădini, livezi",uc:"Auxiliare",ui:"Industrie"},
"S":{d:"Subzistență",pot:10,cut:0.2,niv:1,h:5,rf:10,rl:5,rs:5,sv:60,pk:0,ao:"NU",fm:null,ua:"Grădini, culturi",uc:"Auxiliare",ui:"Construcții"},
"EP6":{d:"Echipamente publice",pot:40,cut:1.5,niv:3,h:16,rf:5,rl:5,rs:5,sv:25,pk:2,ao:"DA",fm:null,ua:"Dotări publice mari",uc:"Conexe",ui:"Industrie"},
"ET3":{d:"Echipamente tehnice",pot:35,cut:1.0,niv:2,h:10,rf:5,rl:5,rs:5,sv:20,pk:1,ao:"NU",fm:null,ua:"Utilități",uc:"Aferente",ui:"Locuire"},
"TA":{d:"Transport auto",pot:50,cut:1.0,niv:1,h:8,rf:5,rl:5,rs:5,sv:15,pk:0,ao:"NU",fm:null,ua:"Transport, parcări",uc:"Servicii",ui:"Locuire"},
"TF":{d:"Feroviar",pot:null,cut:null,niv:null,h:null,rf:null,rl:null,rs:null,sv:null,pk:0,ao:"DA",fm:null,ua:"Feroviar",uc:"Suport",ui:"Locuire"},
"TP":{d:"Transport public",pot:30,cut:0.8,niv:1,h:8,rf:5,rl:5,rs:5,sv:20,pk:0,ao:"NU",fm:null,ua:"Stații transport",uc:"Conexe",ui:"Locuire"},
"G1":{d:"Gospodărie comunală",pot:40,cut:1.0,niv:1,h:8,rf:5,rl:5,rs:5,sv:20,pk:1,ao:"NU",fm:null,ua:"Tehnico-edilitare",uc:"Administrative",ui:"Locuire"},
"G2":{d:"Gospodărie comunală 2",pot:50,cut:1.5,niv:2,h:10,rf:5,rl:5,rs:5,sv:15,pk:1,ao:"NU",fm:null,ua:"Depozite tehnice",uc:"Productive",ui:"Locuire"},
"PP":{d:"Pădure parc",pot:1,cut:0,niv:0,h:0,rf:20,rl:20,rs:20,sv:99,pk:0,ao:"NU",fm:null,ua:"Pădure",uc:"Alei",ui:"Construcții"},
"P1A,P1B":{d:"Parc+spații verzi",pot:5,cut:0.1,niv:1,h:5,rf:5,rl:5,rs:5,sv:90,pk:0,ao:"NU",fm:null,ua:"Spații verzi mixte",uc:"Agrement",ui:"Construcții"},
"G/P9":{d:"Gospodărie/Parc",pot:15,cut:0.3,niv:1,h:6,rf:8,rl:8,rs:8,sv:60,pk:0,ao:"NU",fm:null,ua:"Mixt",uc:"Mici",ui:"Industrie"},
"T1B":{d:"Transport 1B",pot:35,cut:1.0,niv:1,h:8,rf:5,rl:5,rs:5,sv:15,pk:0,ao:"NU",fm:null,ua:"Infrastructură",uc:"Conexe",ui:"Locuire"},
// ── ZONE SPECIALE ──────────────────────────────────────────────────────────
"EXT":{
  d:"Extravilan UAT — necesită PUZ",
  pot:40,cut:4,niv:null,h:null,
  rf:5,rl:3,rs:5,sv:30,pk:2,
  ao:"NU",fm:null,
  ua:"Locuire individuală, servicii, agrement, agricol",
  uc:"Orice funcțiune cu PUZ aprobat. POT max 40%, CUT max 4",
  ui:"Industrie grea, activități poluante fără PUZ",
  obs:"Parametri orientativi conform Legea 350/2001 art.32. CUT se poate modifica doar în jos față de max. Verificați PUG al UAT-ului."
},
"EXT_COM":{
  d:"Extravilan localitate rurală",
  pot:30,cut:1.5,niv:2,h:8,
  rf:5,rl:3,rs:5,sv:40,pk:1,
  ao:"NU",fm:null,
  ua:"Locuire individuală, activități agricole, agrement",
  uc:"Funcțiuni rurale compatibile cu PUG-ul localității",
  ui:"Industrie, depozitare, activități incompatibile cu zona rurală",
  obs:"Parametri orientativi conform Legea 350/2001. Verificați cu primăria localității."
},
// Zonă fără regulament cartografiat în platformă — NU se inventează indicatori.
// Folosit pentru parcele din intravilan urban care cad în afara zonelor UTR încărcate.
"NECART":{
  d:"Zonă fără regulament cartografiat — verificați PUG/PUZ oficial",
  pot:null,cut:null,niv:null,h:null,
  rf:null,rl:null,rs:null,sv:null,pk:null,
  ao:"NU",fm:null,
  ua:"Indeterminat — necesită consultarea PUG/PUZ de sector și a RLU oficial",
  uc:"—",
  ui:"—",
  obs:"Parcelă în intravilan, dar în afara zonelor UTR cartografiate în platformă. Indicatorii NU sunt estimați — consultați documentația de urbanism oficială (PUG/PUZ sector + RLU) și certificatul de urbanism."
}
};

// Funcțiuni și validare UTR
var FN_UTR = {
  locuinta_individuala:{label:'Locuință individuală',admis:['LL','LL2','LA','LA1','LV','LB','AA'],cond:['LB,C2','LC'],pk_formula:'2/unitate',sv_extra:0},
  locuinta_colectiva:{label:'Locuință colectivă',admis:['LC','LB','LB,C2','CB1','CB2','CB3','CB4','CB5','CB6','CB7'],cond:['CM','CA','CC'],pk_formula:'1/apartament',sv_extra:0},
  birouri:{label:'Birouri',admis:['CM','CA','CB1','CB2','CB3','CB4','CB5','CB6','CB7','CC','CP'],cond:['LA','LB'],pk_formula:'2/100mp',sv_extra:0},
  comert:{label:'Comerț',admis:['CM','CA','CC','CP','CB1','CB2','CB3','CB4','CB5','CB6','CB7'],cond:['LC','LB,C2'],pk_formula:'3/100mp',sv_extra:0},
  hotel:{label:'Hotel',admis:['CA','CM','CC'],cond:['CB3','CB4','CB5'],pk_formula:'1/cameră + 0.5/autocar/10cam',sv_extra:5},
  servicii:{label:'Servicii',admis:['CM','CA','CC','CP','LA','LA1','LB'],cond:['LL','LL2'],pk_formula:'2/100mp',sv_extra:0},
  institutional:{label:'Instituțional/Public',admis:['D1','EP6','CA','CM'],cond:['CC','CB1','CB2','CB3'],pk_formula:'2/100mp',sv_extra:0},
  industrial:{label:'Industrial',admis:['AI1','AI2A','AI2B','AI2C','AI3','AI4','AI4A','AI5','AI6'],cond:['G1','G2'],pk_formula:'1/100mp',sv_extra:0},
  logistic:{label:'Logistică/Depozitare',admis:['AI1','AI2A','AI2B','AI2C','AI3','AI4'],cond:['G1','G2'],pk_formula:'1/100mp',sv_extra:0},
  sport:{label:'Sport și agrement',admis:['P4','P3','P5'],cond:['P','P1','P2'],pk_formula:'2/100mp',sv_extra:10}
};

var UTR_COLORS={
  LL:'#4ade80',LL2:'#22c55e',LA:'#86efac',LA1:'#bbf7d0',LB:'#34d399','LB,C2':'#059669',LC:'#6ee7b7',LV:'#a7f3d0',
  CM:'#60a5fa',CA:'#1d4ed8',CC:'#3b82f6',CP:'#93c5fd',
  CB1:'#ddd6fe',CB2:'#c4b5fd',CB3:'#a78bfa',CB4:'#8b5cf6',CB5:'#7c3aed',CB6:'#6d28d9',CB7:'#4c1d95',
  D1:'#f9a8d4',EP6:'#ec4899',ET3:'#fbcfe8',
  TA:'#6b7280',TF:'#9ca3af',TP:'#4b5563',G1:'#d1d5db',G2:'#9ca3af',
  P:'#4ade80',P1:'#bbf7d0',P1A:'#86efac',P1B:'#4ade80','P1A,P1B':'#34d399',P2:'#34d399',P3:'#6ee7b7',P4:'#fde68a',P5:'#fcd34d',PP:'#064e3b',
  AA:'#fef08a',S:'#fef9c3',
  AI1:'#fca5a5',AI2A:'#f87171',AI2B:'#ef4444',AI2C:'#dc2626',AI2D:'#b91c1c',AI3:'#991b1b',AI4:'#7f1d1d',AI4A:'#7f1d1d',AI5:'#450a0a',AI6:'#3b0a0a',
  'G/P9':'#d1fae5',T1B:'#374151',
  // ── BUCUREȘTI — nomenclator PUZ Coordonator de Sector (normU) ──
  M2:'#fb923c',M3:'#fdba74','M*':'#f97316',M_S1:'#fdba74',
  L1:'#bef264',L1A:'#a3e635',L2A:'#84cc16',L2B:'#65a30d',L2_S1:'#a3e635','L2A*':'#84cc16',L3A:'#4ade80',L4A:'#22c55e',
  V1:'#16a34a',V1A:'#15803d',V1M:'#166534',V2A:'#22c55e',V3A:'#4ade80','V3A*':'#4ade80',V3B:'#34d399',V4:'#15803d',V5:'#059669',V7:'#064e3b',V8:'#10b981',
  'CB3.1':'#a78bfa','C*':'#f472b6',
  A1:'#fca5a5',A2A:'#f87171',A2B:'#ef4444',CA2:'#fde68a',
  S1:'#9ca3af',T:'#6b7280',T2:'#4b5563',R:'#c084fc',G2A:'#9ca3af',
  APA:'#38bdf8',BAZINE:'#0ea5e9'
};
const ucol=u=>UTR_COLORS[u]||'#94a3b8';
// Paleta culori per stil arhitectural
var ARCH_PALETTES = {
  modern: {
    parter:    '#94a3b8', // gri-albastru - spatiu neutru
    etaje:     ['#cbd5e1','#e2e8f0','#f1f5f9','#f8fafc','#e2e8f0','#cbd5e1'],
    retras:    '#64748b',
    terasa:    '#475569',
    comercial: '#f59e0b',
    label: '🏢 Modern / Contemporan'
  },
  clasic: {
    parter:    '#d4a76a', // ocru cald - soclu clasic
    etaje:     ['#e8d5b7','#f5ebe0','#fdf6ec','#f5ebe0','#e8d5b7','#d4a76a'],
    retras:    '#c4956a',
    terasa:    '#a0785a',
    comercial: '#e07b39',
    label: '🏛 Clasic / Tradițional'
  },
  mixt: {
    parter:    '#f59e0b', // portocaliu - comercial la parter
    etaje:     ['#93c5fd','#bfdbfe','#dbeafe','#eff6ff','#dbeafe','#bfdbfe'],
    retras:    '#60a5fa',
    terasa:    '#3b82f6',
    comercial: '#f59e0b',
    label: '🏬 Mixt — Comercial + Rezidențial'
  },
  birouri: {
    parter:    '#7dd3fc', // albastru deschis
    etaje:     ['#38bdf8','#7dd3fc','#bae6fd','#e0f2fe','#bae6fd','#7dd3fc'],
    retras:    '#0ea5e9',
    terasa:    '#0284c7',
    comercial: '#f59e0b',
    label: '🏢 Birouri / Office'
  },
  industrial: {
    parter:    '#9ca3af',
    etaje:     ['#6b7280','#9ca3af','#d1d5db','#9ca3af','#6b7280','#4b5563'],
    retras:    '#4b5563',
    terasa:    '#374151',
    comercial: '#d97706',
    label: '🏭 Industrial / Depozitare'
  },
  rezidential: {
    parter:    '#86efac',
    etaje:     ['#4ade80','#86efac','#bbf7d0','#dcfce7','#bbf7d0','#86efac'],
    retras:    '#22c55e',
    terasa:    '#16a34a',
    comercial: '#f59e0b',
    label: '🏠 Rezidențial Colectiv'
  }
};

function getArchPalette(){
  // Sync with AEDIS.stil if AEDIS is active, otherwise use S.vol.archStyle
  const stilKey = (AEDIS?.open && AEDIS.stil) ? AEDIS.stil : (S.vol.archStyle||'modern');
  return ARCH_PALETTES[stilKey] || ARCH_PALETTES.modern;
}

// FLOOR_COLORS moved to top

// ═══ STATE ════════════════════════════════════════════════════════════════
// S moved to top

// ═══ HARTĂ ════════════════════════════════════════════════════════════════
// Guard: mapboxgl trebuie să fie disponibil la acest punct
if(typeof mapboxgl === 'undefined' || typeof mapboxgl.Map !== 'function'){
  // Afișăm eroare și reîncărcăm după 2s
  document.addEventListener('DOMContentLoaded', ()=>{
    const el = document.querySelector('.ss-bar') || document.body;
    el.innerHTML = '<div style="color:#f87171;padding:20px;font-family:sans-serif">⚠️ Mapbox GL JS nu s-a încărcat. Se reîncarcă... <button onclick="location.reload()">Reîncarcă</button></div>' + el.innerHTML;
    setTimeout(()=>location.reload(), 2500);
  });
  throw new Error('mapboxgl not loaded');
}

