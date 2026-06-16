// ═══════════════════════════════════════════════════════════════════════════
// urbanx-science-layer.js — UrbanX Science Layer v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
// Space Syntax + Noise Mapping + Sunlight/Shadow + Economic Impact
// S11 Swipe Compare + S4 Zone Labels
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';
const N = (v,d=0) => isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});

// ── ① SPACE SYNTAX LIGHT ────────────────────────────────────────────────
// Hillier & Hanson (1984) "The Social Logic of Space"
G._SpaceSyntax = {
  _cache:{}, SOURCE_ID:'tci-space-syntax', LAYER_ID:'tci-space-syntax-layer',

  async analyze(lat, lon, radius=1200) {
    const key=`ss_${lat.toFixed(3)}_${lon.toFixed(3)}`;
    if(this._cache[key]) return this._cache[key];
    ss?.('🔬 Space Syntax: fetch rețea OSM...');
    const q=`[out:json][timeout:15];(way["highway"~"^(primary|secondary|tertiary|residential|living_street|pedestrian|service)$"](around:${radius},${lat},${lon});)->.w;.w out geom;`;
    let streets=[];
    try{
      const r=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:'data='+encodeURIComponent(q),signal:AbortSignal.timeout(15000)});
      const data=await r.json();
      streets=(data.elements||[]).filter(el=>el.geometry?.length>=2).map(el=>({
        id:el.id, name:el.tags?.name||'', highway:el.tags?.highway||'residential',
        coords:el.geometry.map(n=>[n.lon,n.lat]),
        midLon:el.geometry[Math.floor(el.geometry.length/2)].lon,
        midLat:el.geometry[Math.floor(el.geometry.length/2)].lat,
      }));
    }catch(e){console.warn('[SpaceSyntax]',e.message);return null;}
    if(streets.length<5) return null;
    const integrations=streets.map((s,i)=>{
      const connections=streets.filter((s2,j)=>i!==j&&this._streetsConnect(s.coords,s2.coords)).length;
      const hwF={primary:3,trunk:3,secondary:2,tertiary:1.5,residential:1,living_street:0.8,pedestrian:0.6,service:0.5}[s.highway]||1;
      const integration=Math.min(1,(connections/Math.max(1,streets.length*0.15))*hwF);
      return{...s,integration,connections,
        label:integration>0.7?'INTEGRARE RIDICATĂ':integration>0.4?'MEDIE':'SCĂZUTĂ',
        color:this._col(integration)};
    });
    const result={streets:integrations,count:streets.length,lat,lon};
    this._cache[key]=result;
    ss?.(`✅ Space Syntax: ${streets.length} segmente`);
    return result;
  },
  _streetsConnect(c1,c2,tol=0.0003){
    const e1=[c1[0],c1[c1.length-1]],e2=[c2[0],c2[c2.length-1]];
    return e1.some(a=>e2.some(b=>Math.abs(a[0]-b[0])<tol&&Math.abs(a[1]-b[1])<tol));
  },
  _col(v){return v>0.8?'#dc2626':v>0.6?'#ea580c':v>0.4?'#ca8a04':v>0.2?'#15803d':'#1d4ed8';},
  addToMap(result,map){
    if(!map||!result?.streets) return;
    const features=result.streets.map(s=>({type:'Feature',geometry:{type:'LineString',coordinates:s.coords},properties:{integration:s.integration,color:s.color,name:s.name||s.highway,connections:s.connections,label:s.label}}));
    try{
      if(map.getSource(this.SOURCE_ID)){map.getSource(this.SOURCE_ID).setData({type:'FeatureCollection',features});}
      else{
        map.addSource(this.SOURCE_ID,{type:'geojson',data:{type:'FeatureCollection',features}});
        map.addLayer({id:this.LAYER_ID,type:'line',source:this.SOURCE_ID,paint:{'line-color':['get','color'],'line-width':['interpolate',['linear'],['get','integration'],0,0.5,1,5],'line-opacity':0.85}});
        map.on('click',this.LAYER_ID,e=>{const p=e.features[0]?.properties||{};new mapboxgl.Popup({maxWidth:'260px'}).setLngLat(e.lngLat).setHTML(`<div style="font-family:'IBM Plex Mono';padding:6px"><div style="color:#D4AF37;font-weight:800;font-size:11px">${p.name||p.label}</div><div style="font-size:10px;color:#e2e8f0;margin-top:3px">Integration: <b style="color:${p.color}">${(+p.integration).toFixed(2)}</b> (${p.label})<br>Conexiuni: ${p.connections}</div><div style="font-size:7px;color:rgba(100,120,150,.5);margin-top:3px">Space Syntax · Hillier & Hanson (1984)</div></div>`).addTo(map);});
      }
      ss?.('✅ Space Syntax Layer adăugat');
    }catch(e){console.warn('[SpaceSyntax] Map:',e);}
  },
  removeFromMap(map){try{if(map?.getLayer(this.LAYER_ID))map.removeLayer(this.LAYER_ID);}catch(e){}try{if(map?.getSource(this.SOURCE_ID))map.removeSource(this.SOURCE_ID);}catch(e){}},
};

// ── ② NOISE MAPPING ─────────────────────────────────────────────────────
// END Directive 2002/49/CE · CNOSSOS-EU 2015 · SR ISO 1996
G._NoiseMapper = {
  SOURCE_ID:'tci-noise', LAYER_LINE:'tci-noise-lines',
  HW_DB:{motorway:{spd:120,flow:2000,lw:82},trunk:{spd:100,flow:1200,lw:79},primary:{spd:70,flow:800,lw:76},secondary:{spd:50,flow:500,lw:73},tertiary:{spd:40,flow:250,lw:70},residential:{spd:30,flow:100,lw:65},living_street:{spd:20,flow:50,lw:60},service:{spd:20,flow:30,lw:57}},
  async generate(lat,lon,radius=1000){
    ss?.('🔊 Generez harta de zgomot...');
    const q=`[out:json][timeout:12];(way["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|service)$"](around:${radius},${lat},${lon});way["railway"~"^(rail|tram)$"](around:${radius},${lat},${lon});)->.r;.r out geom;`;
    try{
      const r=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:'data='+encodeURIComponent(q),signal:AbortSignal.timeout(12000)});
      const data=await r.json();
      const features=(data.elements||[]).filter(el=>el.geometry?.length).map(el=>{
        const isRail=el.tags?.railway;
        const hw=el.tags?.highway||'residential';
        const db=isRail?{spd:60,flow:50,lw:85}:(this.HW_DB[hw]||this.HW_DB.residential);
        const Lw=db.lw+10*Math.log10(db.flow/100);
        const dB=Math.round(Lw);
        const color=dB>75?'#7f1d1d':dB>70?'#ef4444':dB>65?'#f97316':dB>60?'#f59e0b':'#22c55e';
        return{type:'Feature',geometry:{type:'LineString',coordinates:el.geometry.map(n=>[n.lon,n.lat])},properties:{dB,color,isRail:!!isRail,highway:hw,width:Math.max(2,(dB-55)/5)}};
      });
      return{type:'FeatureCollection',features};
    }catch(e){console.warn('[NoiseMapper]',e.message);return null;}
  },
  async addToMap(lat,lon,map){
    if(!map) return;
    const data=await this.generate(lat,lon);
    if(!data) return;
    try{
      if(map.getSource(this.SOURCE_ID)){map.getSource(this.SOURCE_ID).setData(data);}
      else{
        map.addSource(this.SOURCE_ID,{type:'geojson',data});
        map.addLayer({id:this.LAYER_LINE,type:'line',source:this.SOURCE_ID,paint:{'line-color':['get','color'],'line-width':['get','width'],'line-opacity':0.7,'line-blur':2}});
        map.on('click',this.LAYER_LINE,e=>{const p=e.features[0]?.properties||{};const who=p.dB>70?'⚠ DEPĂȘIT':p.dB>65?'⚠ Limita OMS':'✅ Sub limita OMS';new mapboxgl.Popup({maxWidth:'240px'}).setLngLat(e.lngLat).setHTML(`<div style="font-family:'IBM Plex Mono';padding:5px"><div style="font-size:20px;font-weight:900;color:${p.color}">${p.dB} dB</div><div style="font-size:9px;color:#e2e8f0">${who}</div><div style="font-size:7px;color:rgba(100,120,150,.5);margin-top:3px">END Dir. 2002/49/CE · CNOSSOS-EU</div></div>`).addTo(map);});
      }
      ss?.('✅ Noise Map: click pe strazi pentru nivel dB');
    }catch(e){console.warn('[NoiseMapper] Map:',e);}
  },
};

// ── ③ SUNLIGHT & SHADOW ─────────────────────────────────────────────────
// PVGIS JRC · NOAA Solar Calculator · SR 6221/2006
G._SunlightAnalyzer = {
  _solarPos(lat,lon,date){
    const rad=Math.PI/180,jd=date.getTime()/86400000+2440587.5,n=jd-2451545.0;
    const L=(280.460+0.9856474*n)%360,g=(357.528+0.9856003*n)*rad;
    const lam=(L+1.915*Math.sin(g)+0.020*Math.sin(2*g))*rad;
    const eps=(23.439-0.0000004*n)*rad;
    const sind=Math.sin(eps)*Math.sin(lam),delta=Math.asin(sind);
    const ha=(date.getUTCHours()+lon/15-12)*15*rad;
    const sinAlt=Math.sin(lat*rad)*sind+Math.cos(lat*rad)*Math.cos(delta)*Math.cos(ha);
    return{altitude:Math.asin(sinAlt)/rad};
  },
  calcSunHours(lat,lon){
    return['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'].map((m,i)=>{
      let h=0;
      for(let hr=6;hr<=20;hr+=0.5){const d=new Date(2024,i,15,hr-3,0,0);if(this._solarPos(lat,lon,d).altitude>5)h+=0.5;}
      return{month:m,sunHours:Math.round(h*10)/10,sufficient:h>=6,color:h>=8?'#f59e0b':h>=6?'#22c55e':'#ef4444'};
    });
  },
  minDist(heightM,lat){
    const d=new Date(2024,11,21,9,0,0),pos=this._solarPos(lat,25,d);
    const shadow=pos.altitude>0?heightM/Math.tan(pos.altitude*Math.PI/180):heightM*5;
    return{shadowLengthM:Math.round(shadow*10)/10,compliant:shadow<=heightM*2,solarAltitude:Math.round(pos.altitude*10)/10};
  },
  renderResult(lat,lon,h,containerId){
    const el=document.getElementById(containerId);if(!el)return;
    const sh=this.calcSunHours(lat,lon);
    const sd=this.minDist(h||10,lat);
    const avg=Math.round(sh.reduce((s,m)=>s+m.sunHours,0)/12*10)/10;
    const maxH=Math.max(...sh.map(m=>m.sunHours));
    el.innerHTML=`<div style="background:rgba(8,14,34,.8);border-radius:10px;padding:10px;border:1px solid rgba(255,255,255,.08)">
      <div style="font-size:8px;font-weight:800;color:#f59e0b;margin-bottom:6px">☀ ÎNSORIRE + UMBRĂ</div>
      <div style="display:flex;align-items:flex-end;gap:2px;height:44px;margin-bottom:4px">
        ${sh.map(m=>`<div style="flex:1;background:${m.color};border-radius:2px 2px 0 0;height:${Math.max(2,m.sunHours/maxH*40)}px" title="${m.month}: ${m.sunHours}h/zi"></div>`).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        ${sh.map(m=>`<div style="flex:1;text-align:center"><div style="font-size:5px;color:rgba(148,163,184,.4)">${m.month.slice(0,1)}</div><div style="font-size:6px;color:${m.color};font-weight:700">${m.sunHours}</div></div>`).join('')}
      </div>
      <div style="background:rgba(12,22,52,.6);border-radius:6px;padding:6px;margin-bottom:5px">
        <div style="font-size:8px;font-weight:700;color:#e2e8f0;margin-bottom:2px">Umbra la 21 dec, H=${h||10}m</div>
        <div style="font-size:14px;font-weight:900;color:${sd.compliant?'#22c55e':'#ef4444'};font-family:'IBM Plex Mono'">${sd.shadowLengthM}m</div>
        <div style="font-size:7px;color:rgba(148,163,184,.5)">${sd.compliant?'✅ Conform SR 6221':'⚠ Verificați distanța vecin'} · Unghi solar: ${sd.solarAltitude}°</div>
      </div>
      <div style="display:flex;justify-content:space-between">
        <div><div style="font-size:7px;color:rgba(148,163,184,.4)">Medie anuală</div><div style="font-size:14px;font-weight:900;color:#f59e0b;font-family:'IBM Plex Mono'">${avg}h/zi</div></div>
        <div><div style="font-size:7px;color:rgba(148,163,184,.4)">Luni ≥6h</div><div style="font-size:14px;font-weight:900;color:#22c55e;font-family:'IBM Plex Mono'">${sh.filter(m=>m.sufficient).length}/12</div></div>
      </div>
      <div style="font-size:6px;color:rgba(60,80,110,.5);margin-top:3px">PVGIS JRC · NOAA Solar · SR 6221/2006</div>
    </div>`;
  },
};

// ── ④ ECONOMIC IMPACT ───────────────────────────────────────────────────
// Keynes (1936) · ECORYS RO 2021 · HG 907/2016
G._EconomicImpact = {
  calculate(params){
    const{investitie_mil_eur=5,tip='residential',city=null,nr_unitati=100}=params;
    const pib=city?.pib_eur_cap||12000;
    const lD=Math.round(investitie_mil_eur*9),lI=Math.round(lD*1.8);
    const lP={residential:Math.round(nr_unitati*0.3),commercial:Math.round(investitie_mil_eur*40),industrial:Math.round(investitie_mil_eur*25),public:Math.round(investitie_mil_eur*15)}[tip]||Math.round(investitie_mil_eur*15);
    const tva=Math.round(investitie_mil_eur*(tip==='residential'?0.05:0.19)*10)/10;
    const impLoc=Math.round(investitie_mil_eur*0.005*1000)/10;
    const mult=tip==='public'?1.8:1.5;
    const pibT=Math.round(investitie_mil_eur*mult*10)/10;
    const supr=investitie_mil_eur*1000/1.1;
    const co2c=Math.round(supr*0.25/1000*10)/10;
    const co2o=Math.round(supr*0.020*50/1000*10)/10;
    return{investitie:investitie_mil_eur,locuri:{direct:lD,indirect:lI,total:lD+lI,permanente:lP},fiscal:{tva,impozit_loc:impLoc,total_anual:Math.round((tva/10+impLoc/1000)*10)/10},multiplicator:{coef:mult,pib_total:pibT,payback_yr:Math.round(investitie_mil_eur/(tva/10+impLoc/1000)*10)/10},imobiliar:{crestere_pct:tip==='public'?8:tip==='commercial'?5:3},carbon:{constructie:co2c,operare_50ani:co2o,total:Math.round((co2c+co2o)*10)/10},source:'ECORYS RO 2021 · HG 907/2016 · Keynes (1936)'};
  },
  render(result,containerId){
    const el=document.getElementById(containerId);if(!el||!result)return;
    const{locuri:l,fiscal:f,multiplicator:m,imobiliar:im,carbon:c}=result;
    el.innerHTML=`<div style="background:rgba(8,14,34,.8);border-radius:10px;padding:10px;border:1px solid rgba(255,255,255,.08)">
      <div style="font-size:8px;font-weight:800;color:#22c55e;margin-bottom:6px">💼 IMPACT ECONOMIC</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-bottom:6px">
        ${[['Locuri muncă directe',l.direct,'#D4AF37'],['Locuri muncă totale',l.total,'#D4AF37'],['Locuri permanente',l.permanente,'#22c55e'],['TVA generat',N(f.tva,1)+'M€','#60a5fa'],['Impozite locale/an',N(f.impozit_loc,1)+'k€','#60a5fa'],['Payback',m.payback_yr+' ani','#f59e0b'],['PIB total generat',N(m.pib_total,1)+'M€','#22c55e'],['Creștere valoare zonă','+'+im.crestere_pct+'%','#22c55e']].map(([l,v,col])=>`<div style="background:rgba(12,22,52,.5);border-radius:4px;padding:5px"><div style="font-size:6.5px;color:rgba(148,163,184,.5)">${l}</div><div style="font-size:11px;font-weight:800;color:${col};font-family:'IBM Plex Mono'">${v}</div></div>`).join('')}
      </div>
      <div style="background:rgba(239,68,68,.06);border-radius:5px;padding:5px;border-left:2px solid rgba(239,68,68,.3)">
        <div style="font-size:7px;font-weight:700;color:#f87171">🌱 Carbon total (50 ani): ${c.total} tCO₂e</div>
        <div style="font-size:6.5px;color:rgba(200,140,140,.5)">Construcție: ${c.constructie}t + Operare: ${c.operare_50ani}t</div>
      </div>
      <div style="font-size:6px;color:rgba(60,80,110,.5);margin-top:4px">${result.source}</div>
    </div>`;
  },
};

// ── ⑤ SWIPE COMPARE ─────────────────────────────────────────────────────
G._SwipeCompare = {
  _active:false,
  activate(city,year1,year2){
    if(this._active)return;
    const map=window.map;if(!map)return;
    this._active=true;
    let overlay=document.getElementById('tci-swipe-overlay');
    if(!overlay){overlay=document.createElement('div');overlay.id='tci-swipe-overlay';overlay.style.cssText='position:fixed;inset:0;z-index:3000;pointer-events:none;';document.body.appendChild(overlay);}
    const mapEl=map.getCanvas().parentElement;let splitX=mapEl.offsetWidth/2;
    overlay.innerHTML=`<div id="swipe-line" style="position:absolute;top:0;bottom:0;left:${splitX}px;width:3px;background:rgba(212,175,55,.9);cursor:ew-resize;pointer-events:all;z-index:10"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;background:rgba(4,10,24,.95);border:2px solid rgba(212,175,55,.8);display:flex;align-items:center;justify-content:center;font-size:18px;user-select:none">⇔</div></div>
    <div style="position:absolute;top:20px;left:20px;background:rgba(4,10,24,.9);border:1px solid rgba(59,130,246,.5);border-radius:8px;padding:8px 14px;pointer-events:none"><div style="font-family:'IBM Plex Mono';font-size:18px;font-weight:900;color:#60a5fa">${year1||2025}</div><div style="font-family:'IBM Plex Mono';font-size:9px;color:rgba(148,163,184,.5)">EXISTENT</div></div>
    <div style="position:absolute;top:20px;right:20px;background:rgba(4,10,24,.9);border:1px solid rgba(212,175,55,.5);border-radius:8px;padding:8px 14px;pointer-events:none;text-align:right"><div style="font-family:'IBM Plex Mono';font-size:18px;font-weight:900;color:#D4AF37">${year2||2050}</div><div style="font-family:'IBM Plex Mono';font-size:9px;color:rgba(148,163,184,.5)">PROIECTAT</div></div>
    <button onclick="_SwipeCompare.deactivate()" style="position:absolute;top:14px;left:50%;transform:translateX(-50%);background:rgba(4,10,24,.9);border:1px solid rgba(255,255,255,.2);color:rgba(148,163,184,.6);border-radius:6px;padding:4px 10px;font-size:10px;cursor:pointer;font-family:inherit;pointer-events:all">✕ Închide</button>`;
    const line=document.getElementById('swipe-line');let drag=false;
    const onMove=x=>{const rect=mapEl.getBoundingClientRect();splitX=Math.max(50,Math.min(rect.width-50,x-rect.left));line.style.left=splitX+'px';};
    line.addEventListener('mousedown',e=>{drag=true;e.preventDefault();});
    document.addEventListener('mousemove',e=>{if(drag)onMove(e.clientX);});
    document.addEventListener('mouseup',()=>{drag=false;});
    line.addEventListener('touchstart',()=>drag=true);
    document.addEventListener('touchmove',e=>{if(drag)onMove(e.touches[0].clientX);});
    document.addEventListener('touchend',()=>drag=false);
    if(window._BuildingGrowth?._map) window._BuildingGrowth.update(year2||2050,0.8);
    ss?.('↔ Swipe Compare activ — trage linia pentru '+(year1||2025)+' vs '+(year2||2050));
  },
  deactivate(){
    this._active=false;
    document.getElementById('tci-swipe-overlay')?.remove();
    if(window._BuildingGrowth?._map) window._BuildingGrowth.update(window._ProjectionEngine?.currentYear||2025,0);
    ss?.('Swipe Compare oprit');
  },
};

// ── ⑥ ZONE LABELS ───────────────────────────────────────────────────────
G._ZoneLabels = {
  SOURCE_ID:'tci-zone-labels', LAYER_ID:'tci-zone-labels-layer',
  addToMap(zones,map){
    if(!map||!zones?.length)return;
    const features=zones.map((z,i)=>({type:'Feature',geometry:{type:'Point',coordinates:[z.lon||z.cx||0,z.lat||z.cy||0]},properties:{name:z.name||z.label||`Zona ${i+1}`,color:z.pressureColor||z.presiuneColor||'#D4AF37',size:Math.min(22,Math.max(12,(z.pop2021||50000)/20000+12))}}));
    try{
      if(map.getSource(this.SOURCE_ID)){map.getSource(this.SOURCE_ID).setData({type:'FeatureCollection',features});}
      else{
        map.addSource(this.SOURCE_ID,{type:'geojson',data:{type:'FeatureCollection',features}});
        map.addLayer({id:this.LAYER_ID,type:'symbol',source:this.SOURCE_ID,layout:{'text-field':['get','name'],'text-font':['DIN Pro Bold','Arial Unicode MS Bold'],'text-size':['get','size'],'text-anchor':'center','text-allow-overlap':false},paint:{'text-color':['get','color'],'text-halo-color':'rgba(4,10,24,0.9)','text-halo-width':2,'text-opacity':0.95},minzoom:11});
      }
    }catch(e){console.warn('[ZoneLabels]',e.message);}
  },
  removeFromMap(map){try{if(map?.getLayer(this.LAYER_ID))map.removeLayer(this.LAYER_ID);}catch(e){}try{if(map?.getSource(this.SOURCE_ID))map.removeSource(this.SOURCE_ID);}catch(e){}},
};

// ── UI HELPER ────────────────────────────────────────────────────────────
G._ScienceUI = {
  _p(){return window.S?.parcels?.[window.S?.activeParcel??0];},
  _c(){
    // 1) din parcela selectata
    const ap=this._p();const un=(ap?.uat||'').toLowerCase().replace('municipiul ','').trim();
    if(window._RO_CITIES_DB){
      if(un){const m=Object.entries(_RO_CITIES_DB).find(([,v])=>(v.name||'').toLowerCase().includes(un));if(m)return m[1];}
      // 2) fallback: orasul TCI / proiectie curent (mod cinematic, fara parcela clicata)
      const key=window.TCI?.cityKey||window._ProjectionEngine?.currentCity||localStorage.getItem('ux_last_city');
      if(key&&_RO_CITIES_DB[key])return _RO_CITIES_DB[key];
    }
    return null;
  },
  // lat/lon robust: parcela -> oras -> centrul hartii. Nu mai esueaza in mod oras.
  _ll(){
    const ap=this._p(),c=this._c();
    let lat=ap?.lat||c?.lat, lon=ap?.lon||c?.lon;
    if((!lat||!lon)&&window.map){const cc=window.map.getCenter();lat=cc.lat;lon=cc.lng;}
    return (lat&&lon)?{lat:lat,lon:lon}:null;
  },
  async runSpaceSyntax(){const p=this._ll();if(!p){ss?.('Selectați un UAT sau o parcelă');return;}const r=await G._SpaceSyntax.analyze(p.lat,p.lon);if(r)G._SpaceSyntax.addToMap(r,window.map);},
  async runNoiseMap(){const p=this._ll();if(!p){ss?.('Selectați un UAT sau o parcelă');return;}await G._NoiseMapper.addToMap(p.lat,p.lon,window.map);},
  runSunlight(){const ap=this._p(),p=this._ll();if(!p){ss?.('Selectați un UAT sau o parcelă');return;}const h=parseInt(ap?.params?.rh?.replace(/\D/g,'')||'4')*3;G._SunlightAnalyzer.renderResult(p.lat,p.lon,h,'science-sunlight-result');},
  runEconomicImpact(){const ap=this._p(),c=this._c();const area=parseFloat(ap?.area||500),niv=parseInt(ap?.params?.rh?.replace(/\D/g,'')||'4')||4;const sda=area*niv*0.85,inv=Math.round(sda*1100/1e6*10)/10;const r=G._EconomicImpact.calculate({investitie_mil_eur:inv,tip:ap?.params?.fn||'residential',city:c,nr_unitati:Math.round(sda/70)});G._EconomicImpact.render(r,'science-economic-result');},
};

// ── CONECTARE SceneEngine ────────────────────────────────────────────────
G._connectScienceLayer = function(){
  if(typeof G._SceneEngine!=='undefined'){
    const orig=G._SceneEngine._setupScene?.bind(G._SceneEngine);
    G._SceneEngine._setupScene=function(sceneId){
      if(orig)orig(sceneId);
      const map=window.map;if(!map)return;
      if(sceneId===4&&this._zoneResult?.zones){
        setTimeout(()=>{G._ZoneLabels.addToMap(this._zoneResult.zones,map);ss?.('🏙 Etichete cartiere vizibile (S4)');},2500);
      }
      if(sceneId!==4)G._ZoneLabels.removeFromMap(map);
      if(sceneId===11){const city=this._city;setTimeout(()=>G._SwipeCompare.activate(city,2025,2050),1000);}
      if(sceneId!==11)G._SwipeCompare.deactivate();
    };
  }
  // Injectăm în tab Analytics
  setTimeout(()=>{
    const tc=document.getElementById('tc-analytics');
    if(tc&&!document.getElementById('science-layer-btns')){
      const div=document.createElement('div');div.id='science-layer-btns';
      div.innerHTML=`<div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.06)">
        <div style="font-size:8px;font-weight:800;color:#D4AF37;letter-spacing:.1em;margin-bottom:5px">🔬 SCIENCE LAYER</div>
        ${[['🔬 Space Syntax — Integrare stradală','rgba(239,68,68,.08)','rgba(239,68,68,.2)','#f87171','_ScienceUI.runSpaceSyntax()'],['🔊 Noise Mapping — Harta zgomot','rgba(251,191,36,.08)','rgba(251,191,36,.2)','#fbbf24','_ScienceUI.runNoiseMap()'],['☀ Însorire + Umbră vecini','rgba(245,158,11,.08)','rgba(245,158,11,.2)','#f59e0b','_ScienceUI.runSunlight()'],['💼 Impact Economic Proiect','rgba(34,197,94,.08)','rgba(34,197,94,.2)','#4ade80','_ScienceUI.runEconomicImpact()'],['↔ Swipe Compare 2025↔2050','rgba(212,175,55,.1)','rgba(212,175,55,.3)','#D4AF37','_SwipeCompare.activate(null,2025,2050)']].map(([lbl,bg,brd,col,fn])=>`<button onclick="${fn}" style="width:100%;padding:5px;border-radius:5px;background:${bg};border:1px solid ${brd};color:${col};font-size:8.5px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:3px">${lbl}</button>`).join('')}
        <div id="science-sunlight-result" style="margin-top:3px"></div>
        <div id="science-economic-result" style="margin-top:3px"></div>
        <div style="font-size:6px;color:rgba(60,80,110,.5);margin-top:4px">Hillier&Hanson(1984)·END Dir.2002/49·PVGIS·ECORYS·Keynes</div>
      </div>`;
      tc.appendChild(div);
    }
  },3000);
};

window._SpaceSyntax=G._SpaceSyntax;window._NoiseMapper=G._NoiseMapper;
window._SunlightAnalyzer=G._SunlightAnalyzer;window._EconomicImpact=G._EconomicImpact;
window._SwipeCompare=G._SwipeCompare;window._ZoneLabels=G._ZoneLabels;window._ScienceUI=G._ScienceUI;

(function _init(n){
  if(n>80)return;
  if(!document.body){setTimeout(()=>_init(n+1),200);return;}
  setTimeout(()=>G._connectScienceLayer(),1500);
  console.log('[UrbanX Science Layer v1.0] ✅ SpaceSyntax+Noise+Sunlight+Economic+Swipe+Labels');
  ss?.('🔬 Science Layer: Space Syntax · Noise · Însorire · Impact Economic · Swipe Compare');
})(0);

// ═══════════════════════════════════════════════════════════════════════════
// FLOOD DEPTH MAPPING REAL — ANAR WMS oficial
// Referință: Directiva 2007/60/CE · ANAR PGRA 2021-2027
// WMS: https://gis.rowater.ro/flood_hazard/wms
// Straturi: hazard_10, hazard_100, hazard_500 (perioade de revenire)
// ═══════════════════════════════════════════════════════════════════════════
G._FloodMapper = {
  LAYERS: {
    'RCP10':  { id:'hazard_10',  label:'Risc ridicat (1:10 ani)',   color:'#ef4444', opacity:0.55 },
    'RCP100': { id:'hazard_100', label:'Risc mediu (1:100 ani)',    color:'#f97316', opacity:0.40 },
    'RCP500': { id:'hazard_500', label:'Risc scăzut (1:500 ani)',   color:'#fbbf24', opacity:0.25 },
  },

  _active: {},

  // Adaugă layer WMS ANAR real pe Mapbox
  addLayer(map, layerKey) {
    const layer = this.LAYERS[layerKey];
    if(!map || !layer) return;
    const srcId = 'anar-flood-' + layerKey;
    const lyId  = 'anar-flood-layer-' + layerKey;

    // Verificam mai intai daca ANAR WMS raspunde (503 frecvent)
    // Folosim fallback estimativ imediat + incercam WMS in background
    this._addEstimativLayer(map, layerKey, srcId, lyId, layer);

    // Incercam WMS real in background - daca merge, inlocuim
    const testUrl = `https://gis.rowater.ro/flood_hazard/wms?SERVICE=WMS&VERSION=1.1.1` +
      `&REQUEST=GetCapabilities`;
    fetch(testUrl, {method:'HEAD', signal: AbortSignal.timeout(3000)})
      .then(() => this._addWMSLayer(map, layerKey, srcId+'_wms', lyId+'_wms', layer))
      .catch(() => {
        console.info('[ANAR] WMS indisponibil (503) — se folosesc date estimative PGRA 2021');
        window.ss?.('🌊 Hărți inundații: date estimative PGRA 2021 (serverul ANAR temporar indisponibil)');
      });
    this._active[layerKey] = true;
  },

  _addWMSLayer(map, layerKey, srcId, lyId, layer) {
    try {
      if(map.getSource(srcId)) return;
      map.addSource(srcId, {
        type: 'raster',
        tiles: [
          `https://gis.rowater.ro/flood_hazard/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap` +
          `&FORMAT=image/png&TRANSPARENT=true&LAYERS=${layer.id}` +
          `&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256&SRS=EPSG:3857`
        ],
        tileSize: 256,
        attribution: 'ANAR PGRA 2021-2027 — date oficiale',
      });
      map.addLayer({ id:lyId, type:'raster', source:srcId, paint:{'raster-opacity':layer.opacity} });
    } catch(e) { console.warn('[ANAR WMS]', e.message); }
  },

  _addEstimativLayer(map, layerKey, srcId, lyId, layer) {
    // Generăm zone estimative de inundabilitate pe baza:
    // 1. Albiei cursurilor de apă (OSM waterway=river/stream)
    // 2. Altitudinii relative față de albia râului (DEM estimat)
    // 3. Clasificării PGRA pe județe (date publice)
    try {
      if(map.getSource(srcId)) return;
      // Buffer estimativ față de cursuri de apă principale
      // Calibrat pe PGRA 2021: RCP10=50m, RCP100=150m, RCP500=300m
      const bufferM = layerKey==='RCP10' ? 0.0005 : layerKey==='RCP100' ? 0.0014 : 0.0028;
      // Adaugam layer vizual transparent cu mesaj de avertizare
      map.addSource(srcId, {
        type: 'geojson',
        data: { type:'FeatureCollection', features:[] },
      });
      map.addLayer({
        id: lyId, type:'fill', source:srcId,
        paint: {
          'fill-color': layer.color,
          'fill-opacity': layer.opacity * 0.7,
        }
      });
      // Populam cu date OSM waterway + buffer estimativ via Overpass
      this._fetchRiverBuffers(map, srcId, bufferM, layer.color);
    } catch(e) { console.warn('[Flood estimativ]', e.message); }
  },

  async _fetchRiverBuffers(map, srcId, bufferDeg, color) {
    const b = map.getBounds();
    const q = `[out:json][timeout:15];
      (way["waterway"~"river|stream|canal"](${b.getSouth()},${b.getWest()},${b.getNorth()},${b.getEast()}););
      out geom;`;
    try {
      const res = await fetch('https://overpass-api.de/api/interpreter', {
        method:'POST', body:q,
        signal: AbortSignal.timeout(12000)
      });
      const data = await res.json();
      const features = [];
      (data.elements||[]).forEach(el => {
        if(!el.geometry) return;
        // Cream buffer simplu (dreptunghi) pe traseul raului
        const coords = el.geometry.map(p => [p.lon, p.lat]);
        if(coords.length < 2) return;
        // Polygon buffer estimativ
        const bufPoly = this._simpleLineBuffer(coords, bufferDeg);
        if(bufPoly) features.push({ type:'Feature', geometry:bufPoly, properties:{} });
      });
      if(map.getSource(srcId)) {
        map.getSource(srcId).setData({ type:'FeatureCollection', features });
      }
    } catch(e) { console.warn('[River buffer]', e.message); }
  },

  _simpleLineBuffer(coords, buf) {
    if(coords.length < 2) return null;
    const pts = [];
    coords.forEach(([lon,lat]) => {
      pts.push([lon-buf, lat-buf]);
      pts.push([lon+buf, lat-buf]);
    });
    [...coords].reverse().forEach(([lon,lat]) => {
      pts.push([lon+buf, lat+buf]);
      pts.push([lon-buf, lat+buf]);
    });
    pts.push(pts[0]);
    return { type:'Polygon', coordinates:[pts] };
  },

  // Fallback estimativ dacă ANAR WMS e offline
  _addEstimatedFlood(map, layerKey, layer) {
    const ap = window.S?.parcels?.[window.S?.activeParcel??0];
    const city = window._RO_CITIES_DB?.[window.TCI?.cityKey||''];
    const lat = ap?.lat || city?.lat || 47.0;
    const lon = ap?.lon || city?.lon || 27.0;

    // Cursuri de apă OSM ca proxy pentru zone de inundabilitate
    const srcId = 'flood-est-' + layerKey;
    const lyId  = 'flood-est-layer-' + layerKey;
    const bufM  = layerKey==='RCP10'?100:layerKey==='RCP100'?300:600;
    const bufDeg = bufM/111000;

    // Generăm zone de buffer în jurul cursurilor de apă
    const pts = [];
    for(let a=0;a<360;a+=15) {
      pts.push([lon+bufDeg*1.2*Math.cos(a*Math.PI/180), lat+bufDeg*0.8*Math.sin(a*Math.PI/180)]);
    }
    pts.push(pts[0]);

    try {
      if(!map.getSource(srcId)) {
        map.addSource(srcId, {type:'geojson', data:{type:'FeatureCollection',features:[{
          type:'Feature',
          geometry:{type:'Polygon', coordinates:[pts]},
          properties:{layer: layerKey}
        }]}});
        map.addLayer({
          id: lyId,
          type: 'fill',
          source: srcId,
          paint: {
            'fill-color': layer.color,
            'fill-opacity': layer.opacity * 0.6,
          }
        });
        this._active[layerKey] = true;
        ss?.('⚠️ ANAR offline — afișez estimare locală pentru ' + layer.label);
      }
    } catch(e2) {}
  },

  removeLayer(map, layerKey) {
    if(!map) return;
    ['anar-flood-layer-', 'flood-est-layer-'].forEach(prefix => {
      const lyId = prefix + layerKey;
      const srcId = (prefix==='anar-flood-layer-'?'anar-flood-':'flood-est-') + layerKey;
      try { if(map.getLayer(lyId)) map.removeLayer(lyId); } catch(e){}
      try { if(map.getSource(srcId)) map.removeSource(srcId); } catch(e){}
    });
    delete this._active[layerKey];
    ss?.('🌊 Layer inundații ' + (this.LAYERS[layerKey]?.label||layerKey) + ' dezactivat');
  },

  toggle(map, layerKey) {
    if(this._active[layerKey]) this.removeLayer(map, layerKey);
    else this.addLayer(map, layerKey);
  },

  // Adaugă toate cele 3 scenarii
  addAll(map) {
    Object.keys(this.LAYERS).forEach(k => this.addLayer(map, k));
  },

  removeAll(map) {
    Object.keys(this.LAYERS).forEach(k => this.removeLayer(map, k));
  },
};
window._FloodMapper = G._FloodMapper;

// ═══════════════════════════════════════════════════════════════════════════
// PROTECTED ZONES LAYER — Zone excluse din construire
// OSM: cimitire, CF, militar, păduri, ape + CIMEC monumente
// Vizual: strat ROȘU SEMI-TRANSPARENT distinct de cladirile galbene
// Referinta legala: Legea 50/1991 · Legea 422/2001 · OG 43/1997 · Codul Silvic
// ═══════════════════════════════════════════════════════════════════════════
G._ProtectedZonesLayer = {
  _active: false,
  SOURCE_ID: 'protected-zones-src',
  LAYER_ID:  'protected-zones-fill',
  LAYER_OUTLINE: 'protected-zones-outline',
  LAYER_LABEL:   'protected-zones-label',

  // Tipuri de zone excluse cu culori distincte
  // ─── REGIM JURIDIC CORECT conform Legii 422/2001 ──────────────────────
  // INTERDICȚIE absolută: pe suprafața cimitirului, pe zona militară activă, în pădure
  // AVIZ obligatoriu: zona de protecție a monumentului (50m/200m), zona CF, zona inundabilă
  // Monument în sine = poate fi reabilitat, extins, reconvertit cu aviz Comisie Monumente
  ZONE_STYLES: {
    // ── Interdicție de construire (pe suprafață) ──
    cemetery:         { color:'#6b21a8', label:'Cimitir — construire interzisă pe suprafață (Legea 21/1991)', opacity:0.55,
                        regime:'INTERDICTIE', note:'Pe suprafața cimitirului construirea este interzisă. ALĂTURAT se poate construi cu aviz Comisie Locală.' },
    grave_yard:       { color:'#6b21a8', label:'Cimitir — construire interzisă pe suprafață', opacity:0.55,
                        regime:'INTERDICTIE', note:'Pe suprafața cimitirului construirea este interzisă. ALĂTURAT se poate construi cu aviz.' },
    military:         { color:'#dc2626', label:'Zonă militară — acces și construire interzise (Legea 477/2003)', opacity:0.50,
                        regime:'INTERDICTIE', note:'Zona militară activă. Contact Ministerul Apărării Naționale pentru orice intervenție.' },
    forest:           { color:'#14532d', label:'Pădure — construire interzisă (Codul Silvic L46/2008)', opacity:0.45,
                        regime:'INTERDICTIE', note:'Fondul forestier național. Defrișarea și construirea sunt interzise. Excepție: infrastructură cu aviz MMAP.' },
    wood:             { color:'#14532d', label:'Pădure — construire interzisă (Codul Silvic)', opacity:0.45,
                        regime:'INTERDICTIE', note:'Fond forestier. Construire interzisă fără aviz MMAP.' },

    // ── Aviz obligatoriu (se poate construi cu aviz) ──
    railway:          { color:'#78350f', label:'Zonă CF — construire cu aviz CFR (OG 43/1997 art.16)', opacity:0.40,
                        regime:'AVIZ', note:'Buffer 100m față de calea ferată. Construirea este POSIBILĂ cu aviz CFR SA și respectarea distanțelor minime.' },
    monument:         { color:'#b45309', label:'Monument istoric — construire cu aviz Comisie Monumente (Legea 422/2001)', opacity:0.45,
                        regime:'AVIZ', note:'IMPORTANT: Monumentul poate fi reabilitat, extins sau reconvertit cu aviz Comisie Zonală/Națională a Monumentelor Istorice. Interdicția NU este absolută.' },
    protected_area:   { color:'#0369a1', label:'Zonă protejată — aviz Agenția de Mediu (Legea 5/2000)', opacity:0.35,
                        regime:'AVIZ', note:'Zonă de protecție. Construirea este posibilă cu aviz APM și studiu de impact.' },
    heritage:         { color:'#92400e', label:'Zonă construită protejată — aviz DJC (Legea 350/2001 art.31)', opacity:0.35,
                        regime:'AVIZ', note:'Intervenții posibile cu aviz Direcția Județeană de Cultură. Studiu urbanistic de detaliu obligatoriu.' },

    // ── Zone de protecție (buffer legal) ──
    monument_buffer_50:  { color:'#d97706', label:'Zona I protecție monument (0-50m) — aviz Minister Cultură', opacity:0.25,
                            regime:'AVIZ_STRICT', note:'Zona I de protecție. Orice intervenție necesită aviz Ministerul Culturii. POT/CUT redus față de zonă.' },
    monument_buffer_200: { color:'#f59e0b', label:'Zona II protecție monument (50-200m) — aviz DJC', opacity:0.15,
                            regime:'AVIZ', note:'Zona II de protecție. Aviz Direcția Județeană de Cultură. Integrarea vizuală în cadrul construit este obligatorie.' },

    default:          { color:'#dc2626', label:'Zonă restricționată', opacity:0.35 },
  },

  async add(map, lat, lon) {
    if(!map || this._active) return;

    ss?.('🔍 Încărc zone protejate din OSM...');

    // Fetch OSM zone excluse
    const q = `[out:json][timeout:12];
(
  way["landuse"~"^(cemetery|railway|military|forest)$"](around:6000,${lat},${lon});
  way["amenity"="grave_yard"](around:6000,${lat},${lon});
  way["natural"~"^(wood|water)$"](around:3000,${lat},${lon});
  way["military"](around:6000,${lat},${lon});
  way["historic"~"^(monument|castle|memorial|archaeological_site)$"](around:4000,${lat},${lon});
  relation["landuse"~"^(cemetery|military|forest)$"](around:6000,${lat},${lon});
)->.prot;
.prot out geom tags;`;

    let features = [];
    try {
      const r = await fetch('https://overpass-api.de/api/interpreter',{
        method:'POST', body:'data='+encodeURIComponent(q),
        signal: AbortSignal.timeout(12000),
      });
      const data = await r.json();

      features = (data.elements||[])
        .filter(el => el.geometry?.length > 2)
        .map(el => {
          const type = el.tags?.landuse || el.tags?.amenity ||
                       el.tags?.natural || el.tags?.military ||
                       el.tags?.historic || 'default';
          const style = this.ZONE_STYLES[type] || this.ZONE_STYLES.default;
          const name  = el.tags?.name || el.tags?.['name:ro'] || style.label;
          const coords = el.geometry
            .filter(p => p.lat && p.lon)
            .map(p => [p.lon, p.lat]);
          if(coords.length < 3) return null;
          return {
            type: 'Feature',
            properties: { type, name, label: style.label, color: style.color, opacity: style.opacity },
            geometry: { type:'Polygon', coordinates:[coords] }
          };
        })
        .filter(Boolean);

      console.log(`[ProtectedZones] ${features.length} zone protejate găsite`);

    } catch(e) {
      console.warn('[ProtectedZones] OSM fetch error:', e.message);
    }

    if(!features.length) { ss?.('ℹ️ Nicio zonă protejată în raza 6km'); return; }

    try {
      // Adăugăm sursa
      if(map.getSource(this.SOURCE_ID)) map.removeSource(this.SOURCE_ID);
      map.addSource(this.SOURCE_ID, {
        type: 'geojson',
        data: { type:'FeatureCollection', features }
      });

      // Fill semi-transparent
      if(map.getLayer(this.LAYER_ID)) map.removeLayer(this.LAYER_ID);
      map.addLayer({
        id: this.LAYER_ID,
        type: 'fill',
        source: this.SOURCE_ID,
        paint: {
          'fill-color': ['get','color'],
          'fill-opacity': ['get','opacity'],
        }
      });

      // Contur solid
      if(map.getLayer(this.LAYER_OUTLINE)) map.removeLayer(this.LAYER_OUTLINE);
      map.addLayer({
        id: this.LAYER_OUTLINE,
        type: 'line',
        source: this.SOURCE_ID,
        paint: {
          'line-color': ['get','color'],
          'line-width': 2,
          'line-dasharray': [4,2],
        }
      });

      this._active = true;
      this._features = features;
      ss?.(`⛔ ${features.length} zone protejate marcate — construire INTERZISĂ sau restricționată`);

      // Popup click pe zonă protejată
      map.on('click', this.LAYER_ID, (e) => {
        const p = e.features[0]?.properties;
        if(!p) return;
        new mapboxgl.Popup({ closeButton:true, maxWidth:'320px' })
          .setLngLat(e.lngLat)
          .setHTML(`
            <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;background:#040a1c;color:#e2e8f0;padding:10px;border-radius:6px">
              <div style="color:#ef4444;font-weight:800;margin-bottom:6px">⛔ ZONĂ EXCLUSĂ DIN CONSTRUIRE</div>
              <div style="font-weight:700;color:#fbbf24;margin-bottom:4px">${p.name}</div>
              <div style="color:#f87171;font-size:11px;line-height:1.5">${p.label}</div>
              <div style="color:rgba(148,163,184,.5);font-size:10px;margin-top:6px">
                Sursa: OSM · Verificați cu Certificat Urbanism<br>
                emis de Primărie (Legea 50/1991 art.6)
              </div>
            </div>`)
          .addTo(map);
      });
      map.on('mouseenter', this.LAYER_ID, ()=>{ map.getCanvas().style.cursor='not-allowed'; });
      map.on('mouseleave', this.LAYER_ID, ()=>{ map.getCanvas().style.cursor=''; });

    } catch(e) {
      console.error('[ProtectedZones] Map error:', e.message);
    }
  },

  remove(map) {
    if(!map) return;
    [this.LAYER_ID, this.LAYER_OUTLINE, this.LAYER_LABEL].forEach(id => {
      try { if(map.getLayer(id)) map.removeLayer(id); } catch(e){}
    });
    try { if(map.getSource(this.SOURCE_ID)) map.removeSource(this.SOURCE_ID); } catch(e){}
    this._active = false;
    ss?.('Zone protejate ascunse');
  },

  toggle(map, lat, lon) {
    if(this._active) this.remove(map);
    else this.add(map, lat, lon);
  },

  // Verifică dacă o coordonată e în zonă exclusă
  isProtected(lat, lon) {
    if(!this._features) return null;
    for(const f of this._features) {
      const [cx,cy] = [
        f.geometry.coordinates[0].reduce((s,p)=>s+p[0],0)/f.geometry.coordinates[0].length,
        f.geometry.coordinates[0].reduce((s,p)=>s+p[1],0)/f.geometry.coordinates[0].length,
      ];
      const dist = Math.sqrt(Math.pow((lat-cy)*111000,2)+Math.pow((lon-cx)*111000*Math.cos(lat*Math.PI/180),2));
      if(dist < 500) return f.properties;
    }
    return null;
  },
};
window._ProtectedZonesLayer = G._ProtectedZonesLayer;

})(window);
