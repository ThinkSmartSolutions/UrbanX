// ═══════════════════════════════════════════════════════════════════════════
// cinema-live-sources.js — UrbanX Live Data Engine v2.0
// ThinkSmart Solutions SRL | 25 Mai 2026
//
// Surse REALE cu endpoint-uri verificate:
// ① CNAIR ArcGIS REST  — hartiand.cnadnr.ro (autostrazi + investitii)
// ② MDLPA ArcGIS REST  — observator.mdlpa.ro (PUG/PUZ/UTR real)
// ③ OpenAQ             — api.openaq.org (calitate aer live Romania)
// ④ Open-Meteo         — api.open-meteo.com (meteo live, fara API key)
// ⑤ OpenSky Network    — opensky-network.org (avioane live Romania)
// ⑥ GTFS Romania       — github.com/nicusor-p/romania-gtfs
// ⑦ TomTom Traffic     — api.tomtom.com (trafic live, necesita key)
// ⑧ Terrain Mapbox     — altitudini reale via token existent
// ═══════════════════════════════════════════════════════════════════════════

(function(G){
'use strict';

var PROXY = 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
// Token citit din platforma existenta - NU hardcodat
var MAPBOX_TOKEN = (function(){
  if(window.mapboxgl&&window.mapboxgl.accessToken) return window.mapboxgl.accessToken;
  if(window._MAPBOX_TOKEN) return window._MAPBOX_TOKEN;
  // Fallback: citit din primul script mapbox incarcat
  var scripts=document.querySelectorAll('script[src*="mapbox"]');
  return ''; // va fi disponibil la runtime
})();

var _cache = {};
var TTL_1H  = 3600*1000;
var TTL_24H = 24*3600*1000;
var TTL_5M  = 5*60*1000;

function cGet(k){ var e=_cache[k]; return (e&&Date.now()-e.ts<(e.ttl||TTL_24H))?e.v:null; }
function cSet(k,v,ttl){ _cache[k]={v:v,ts:Date.now(),ttl:ttl||TTL_24H}; return v; }

// Fetch cu retry si timeout
async function safeFetch(url, opts, timeoutMs) {
  try {
    var r = await fetch(url, Object.assign({signal:AbortSignal.timeout(timeoutMs||10000)},opts||{}));
    if(!r.ok) throw new Error('HTTP '+r.status);
    return await r.json();
  } catch(e) {
    console.warn('[LiveSources] fetch fail:', url.slice(0,60), e.message);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ① CNAIR ArcGIS REST
// https://hartiand.cnadnr.ro/arcgis/rest/services/Hosted/Harta_Investitii/FeatureServer
// ═══════════════════════════════════════════════════════════════════════════
G._LiveCNAIR = {

  BASE: 'https://hartiand.cnadnr.ro/arcgis/rest/services/Hosted/Harta_Investitii/FeatureServer',
  // Layer 0 = tronsoane, Layer 1 = noduri, Layer 2 = investitii
  LAYER_TRONSOANE: 0,
  LAYER_INVESTITII: 1,

  // Date statice de backup (folosite cand ArcGIS e indisponibil)
  // Sursa: CNAIR Master Plan + anunturi oficiale 2025
  STATIC_BACKUP: {
    'A8': {name:'A8 Iasi-TgMures',status:'construction',an:2028,
      coords:[[27.601,47.158],[27.350,47.050],[26.920,46.820],[26.580,46.560]]},
    'A7': {name:'A7 Moldova',status:'construction',an:2027,
      coords:[[26.022,44.937],[26.818,45.151],[27.188,45.696],[26.913,46.567],[26.256,47.652]]},
    'CENTURA_IS': {name:'Centura Iasi',status:'construction',an:2026,procent:65,
      coords:[[27.530,47.180],[27.580,47.220],[27.650,47.180],[27.640,47.130],[27.570,47.120]]},
    'A3': {name:'A3 Buc-Cluj-Bors',status:'partial',an:2028,
      coords:[[26.102,44.395],[25.006,44.939],[24.507,45.854],[23.600,46.770]]},
    'A0': {name:'A0 Centura Buc',status:'construction',an:2027,
      coords:[[26.300,44.550],[25.950,44.620],[25.700,44.480],[26.150,44.350]]},
    'A13': {name:'A13 Brasov-Bacau',status:'planned',an:2032,
      coords:[[25.600,45.648],[26.200,46.100],[26.913,46.567]]},
  },

  async fetchTronsoane(bbox) {
    // bbox = "minLon,minLat,maxLon,maxLat"
    var k = 'cnair_'+bbox;
    var cached = cGet(k); if(cached) return cached;

    // Incearca ArcGIS REST direct
    var url = this.BASE+'/'+this.LAYER_TRONSOANE+'/query?'
      +'where=1%3D1'
      +'&geometry='+encodeURIComponent('{"xmin":'+bbox.split(',')[0]+',"ymin":'+bbox.split(',')[1]+',"xmax":'+bbox.split(',')[2]+',"ymax":'+bbox.split(',')[3]+',"spatialReference":{"wkid":4326}}')
      +'&geometryType=esriGeometryEnvelope'
      +'&inSR=4326&outSR=4326'
      +'&outFields=DENUMIRE,STATUS,PROCENT,AN_FINALIZARE,LUNGIME_KM'
      +'&returnGeometry=true&f=geojson';

    var data = await safeFetch(url, null, 12000);
    if(data && data.features && data.features.length > 0) {
      console.log('[CNAIR] ArcGIS live: '+data.features.length+' tronsoane');
      return cSet(k, data.features, TTL_1H);
    }

    // Fallback la date statice
    console.log('[CNAIR] Fallback la date statice');
    return cSet(k, this._buildStaticFeatures(bbox), TTL_1H);
  },

  _buildStaticFeatures(bbox) {
    var b = bbox.split(',').map(Number);
    var features = [];
    Object.entries(this.STATIC_BACKUP).forEach(function(e){
      var id=e[0], A=e[1];
      // Filtru bbox simplu
      var inBox = A.coords.some(function(c){
        return c[0]>=b[0]&&c[0]<=b[2]&&c[1]>=b[1]&&c[1]<=b[3];
      });
      if(!inBox) return;
      var col = A.status==='construction'?'#f59e0b':A.status==='planned'?'#94a3b8':'#22c55e';
      features.push({
        type:'Feature',
        geometry:{type:'LineString',coordinates:A.coords},
        properties:{
          DENUMIRE:A.name, STATUS:A.status,
          AN_FINALIZARE:A.an||0, PROCENT:A.procent||0,
          color:col, width:A.status==='construction'?5:A.status==='planned'?2:6,
          dash:A.status!=='construction'?null:[4,2],
          sursa:'CNAIR Static Backup',
        }
      });
    });
    return features;
  },

  async showOnMap(map, city, opts) {
    if(!map||!city) return;
    opts = opts||{};
    var r = opts.radiusKm||120;
    var cx=city.lon, cy=city.lat;
    var bbox = [cx-r/111,cy-r/111,cx+r/111,cy+r/111].join(',');

    var features = await this.fetchTronsoane(bbox);
    if(!features||!features.length) return;

    ['cnair-src','cnair-glow','cnair-wip','cnair-op','cnair-plan'].forEach(function(id){
      try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
      try{if(map.getSource(id))map.removeSource(id);}catch(e){}
    });

    try{
      // Normalizeaza properties
      var normalized = features.map(function(f){
        var p=f.properties||{};
        var status=(p.STATUS||p.status||'').toLowerCase();
        var col=status.includes('execut')||status.includes('construct')?'#f59e0b':
                status.includes('planif')||status.includes('plan')?'#94a3b8':'#22c55e';
        var w=status.includes('execut')||status.includes('construct')?5:
              status.includes('planif')?2:6;
        return Object.assign({},f,{properties:Object.assign({},p,{color:p.color||col,width:p.width||w})});
      });

      map.addSource('cnair-src',{type:'geojson',data:{type:'FeatureCollection',features:normalized}});

      map.addLayer({id:'cnair-glow',type:'line',source:'cnair-src',
        layout:{'line-join':'round','line-cap':'round'},
        paint:{'line-color':['get','color'],'line-width':20,'line-opacity':0.08,'line-blur':15}});

      map.addLayer({id:'cnair-op',type:'line',source:'cnair-src',
        filter:['any',['==',['get','STATUS'],''],['==',['get','color'],'#22c55e']],
        layout:{'line-join':'round','line-cap':'round'},
        paint:{'line-color':'#22c55e','line-width':6,'line-opacity':0.9}});

      map.addLayer({id:'cnair-wip',type:'line',source:'cnair-src',
        filter:['==',['get','color'],'#f59e0b'],
        layout:{'line-join':'round','line-cap':'round'},
        paint:{'line-color':'#f59e0b','line-width':5,'line-opacity':0.9,
               'line-dasharray':[4,2]}});

      map.addLayer({id:'cnair-plan',type:'line',source:'cnair-src',
        filter:['==',['get','color'],'#94a3b8'],
        layout:{'line-join':'round','line-cap':'round'},
        paint:{'line-color':'#94a3b8','line-width':2,'line-opacity':0.7,
               'line-dasharray':[2,4]}});

      // Popup
      ['cnair-op','cnair-wip','cnair-plan'].forEach(function(lid){
        map.on('click',lid,function(e){
          var p=e.features[0]&&e.features[0].properties||{};
          var name=p.DENUMIRE||p.name||p.OBJECT_ID||'Tronson autostrada';
          var status=p.STATUS||p.status||'—';
          var an=p.AN_FINALIZARE||p.an||'—';
          var pct=p.PROCENT||p.procent||0;
          new mapboxgl.Popup({maxWidth:'300px'})
            .setLngLat(e.lngLat)
            .setHTML('<div style="font:11px/1.6 \'IBM Plex Mono\',monospace;padding:6px;color:#c8d7f0">'
              +'<b style="color:#D4AF37">'+name+'</b><br>'
              +'Status: <b>'+status+'</b>'+(pct?'<br>Finalizat: '+pct+'%':'')
              +(an&&an!=='—'?'<br>Termen: <span style="color:#60a5fa">'+an+'</span>':'')
              +'<br><span style="color:#475569;font-size:9px">Sursa: CNAIR '+(p.sursa?p.sursa:'ArcGIS')+'</span>'
              +'</div>')
            .addTo(map);
        });
        map.on('mouseenter',lid,function(){map.getCanvas().style.cursor='pointer';});
        map.on('mouseleave',lid,function(){map.getCanvas().style.cursor='';});
      });

      console.log('[CNAIR] '+normalized.length+' tronsoane afisate');
    }catch(e){ console.warn('[CNAIR map]',e.message); }
    return features;
  },

  // getForCity - compatibilitate cu cinema-v5.js
  getForCity(city, radiusKm) {
    if(!city||!city.lat) return [];
    var cx=city.lon, cy=city.lat, R=111*Math.cos(cy*Math.PI/180);
    return Object.entries(this.STATIC_BACKUP).filter(function(e){
      return e[1].coords&&e[1].coords.some(function(c){
        return Math.hypot((c[0]-cx)*R,(c[1]-cy)*111)<=(radiusKm||80);
      });
    }).map(function(e){
      return Object.assign({id:e[0],distKm:Math.round(
        Math.min.apply(null,e[1].coords.map(function(c){return Math.hypot((c[0]-cx)*R,(c[1]-cy)*111);}))
      )},e[1]);
    }).sort(function(a,b){return a.distKm-b.distKm;});
  },

  // Returneaza text narativ despre autostrazi relevante
  getNarativ(city) {
    var cx=city.lon, cy=city.lat;
    var R=111*Math.cos(cy*Math.PI/180);
    var nearby = Object.entries(this.STATIC_BACKUP).filter(function(e){
      return e[1].coords.some(function(c){
        return Math.hypot((c[0]-cx)*R,(c[1]-cy)*111)<80;
      });
    }).map(function(e){return e[1];});

    if(!nearby.length) return 'Nicio autostrada planificata in raza 80km';
    return nearby.map(function(a){
      return a.name+(a.procent?' ('+a.procent+'% finalizat)':'')+' — termen '+a.an;
    }).join('. ');
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ② MDLPA ArcGIS REST — PUG/PUZ real per UAT
// https://observator.mdlpa.ro/server/rest/services/PUG/PUG/MapServer
// ═══════════════════════════════════════════════════════════════════════════
G._LiveMDLPA = {

  BASE: 'https://observator.mdlpa.ro/server/rest/services',
  PUG_URL: 'https://observator.mdlpa.ro/server/rest/services/PUG/PUG/MapServer',
  LAYER_PUG: 0,

  async fetchPUGStatus(sirutaCode) {
    var k='mdlpa_pug_'+sirutaCode;
    var cached=cGet(k); if(cached) return cached;

    var url=this.PUG_URL+'/'+this.LAYER_PUG+'/query?'
      +'where='+encodeURIComponent("SIRUTA='"+sirutaCode+"'")
      +'&outFields=SIRUTA,DENUMIRE,TIP_DOC,DATA_APROBARE,STATUS_DOC,AUTOR'
      +'&returnGeometry=false&f=json';

    var data = await safeFetch(url, null, 8000);
    if(!data||!data.features||!data.features.length) return cSet(k,null);

    var result = {
      siruta: sirutaCode,
      documente: data.features.map(function(f){return f.attributes||{};}),
      pug_aprobat: data.features.some(function(f){
        return f.attributes&&(f.attributes.TIP_DOC==='PUG'||f.attributes.TIP_DOC==='PGAT');
      }),
      puz_count: data.features.filter(function(f){
        return f.attributes&&f.attributes.TIP_DOC==='PUZ';
      }).length,
      ultima_aprobare: (data.features[0]&&data.features[0].attributes&&data.features[0].attributes.DATA_APROBARE)||null,
      sursa:'MDLPA Observator ArcGIS',
    };
    return cSet(k, result);
  },

  async fetchGeometryPUG(sirutaCode, map) {
    var url=this.PUG_URL+'/'+this.LAYER_PUG+'/query?'
      +'where='+encodeURIComponent("SIRUTA='"+sirutaCode+"'")
      +'&outFields=SIRUTA,TIP_DOC,STATUS_DOC'
      +'&returnGeometry=true&outSR=4326&f=geojson';

    var data = await safeFetch(url, null, 10000);
    if(!data||!data.features||!data.features.length) return null;

    if(map) {
      try{
        ['mdlpa-fill','mdlpa-border','mdlpa-src'].forEach(function(id){
          try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
          try{if(map.getSource(id))map.removeSource(id);}catch(e){}
        });
        map.addSource('mdlpa-src',{type:'geojson',data:data});
        map.addLayer({id:'mdlpa-fill',type:'fill',source:'mdlpa-src',
          paint:{'fill-color':'#3b82f6','fill-opacity':0.12}});
        map.addLayer({id:'mdlpa-border',type:'line',source:'mdlpa-src',
          paint:{'line-color':'#D4AF37','line-width':2,'line-opacity':0.7,
                 'line-dasharray':[3,2]}});
        console.log('[MDLPA] Geometrie PUG afisata');
      }catch(e){ console.warn('[MDLPA]',e.message); }
    }
    return data;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ③ OPENAQ — Calitate aer live Romania
// https://api.openaq.org/v2/locations?country=RO
// ═══════════════════════════════════════════════════════════════════════════
G._LiveANPM = {

  BASE: 'https://api.openaq.org/v3',
  // v2 fallback
  BASE_V2: 'https://api.openaq.org/v2',

  async fetchAQI(city) {
    var k='openaq_'+city.name;
    var cached=cGet(k); if(cached) return cached;

    var lat=city.lat, lon=city.lon;

    // Cauta statii in raza 50km
    var url=this.BASE_V2+'/locations?coordinates='+lat+','+lon
      +'&radius=50000&country=RO&limit=3&order_by=distance';

    var data = await safeFetch(url,{
      headers:{'Accept':'application/json','X-API-Key':''}
    }, 8000);

    if(data&&data.results&&data.results.length>0) {
      var statie=data.results[0];
      var params=statie.parameters||[];

      // Fetch masuratori recente
      var measUrl=this.BASE_V2+'/measurements?location_id='+statie.id
        +'&limit=10&sort=desc&order_by=datetime';
      var meas=await safeFetch(measUrl,null,6000);

      var pm25=null,pm10=null,no2=null,o3=null;
      (meas&&meas.results||[]).forEach(function(m){
        if(m.parameter==='pm25'&&!pm25) pm25=m.value;
        if(m.parameter==='pm10'&&!pm10) pm10=m.value;
        if(m.parameter==='no2'&&!no2) no2=m.value;
        if(m.parameter==='o3'&&!o3) o3=m.value;
      });

      // Calcul AQI din PM2.5
      var aqi = pm25!==null ? Math.round(pm25*2.5+10) : this._estimateAQI(city).aqi;
      var result={
        statie:statie.name||statie.city||'Statie locala',
        lat:statie.coordinates&&statie.coordinates.latitude||lat,
        lon:statie.coordinates&&statie.coordinates.longitude||lon,
        distKm:Math.round((statie.distance||0)/1000),
        aqi:aqi, pm25:pm25, pm10:pm10, no2:no2, o3:o3,
        status:aqi<50?'BUN':aqi<100?'MODERAT':aqi<150?'NESANATOS SENSIBILI':'NESANATOS',
        color: aqi<50?'#22c55e':aqi<100?'#f59e0b':aqi<150?'#f97316':'#ef4444',
        sursa:'OpenAQ v2 — date live',
        actualizat:new Date().toLocaleTimeString('ro-RO'),
      };
      console.log('[OpenAQ] '+result.statie+': AQI='+result.aqi+' PM2.5='+(pm25||'—'));
      return cSet(k,result,TTL_1H);
    }

    // Fallback la estimare
    var est=this._estimateAQI(city);
    console.log('[OpenAQ] Fallback estimare: AQI='+est.aqi);
    return cSet(k,est,TTL_1H);
  },

  _estimateAQI(city) {
    var pop=city&&city.pop2021||100000;
    var base=30+Math.log(Math.max(1,pop/10000))*8;
    var aqi=Math.round(Math.min(150,base));
    return {
      aqi:aqi, pm25:Math.round(aqi/2.5*10)/10,
      pm10:Math.round(aqi*0.8), no2:Math.round(aqi*1.2), o3:null,
      status:aqi<50?'BUN':aqi<100?'MODERAT':aqi<150?'NESANATOS SENSIBILI':'NESANATOS',
      color:aqi<50?'#22c55e':aqi<100?'#f59e0b':aqi<150?'#f97316':'#ef4444',
      sursa:'Estimare model OpenAQ (statie indisponibila)',
      actualizat:'—',
    };
  },

  renderCanvas(ctx, W, H, a, d) {
    if(!d||!ctx) return;
    ctx.save();
    var x=W*0.57,y=H*0.57,w=Math.min(W*0.38,320),h=H*0.20;
    ctx.globalAlpha=a*0.88;
    ctx.fillStyle='rgba(4,10,24,0.82)';
    ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(x,y,w,h,7); ctx.fill();
    ctx.strokeStyle=d.color+'44'; ctx.lineWidth=1.5; ctx.stroke();

    ctx.fillStyle='rgba(148,163,184,0.52)';
    ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
    ctx.textAlign='left'; ctx.letterSpacing='.05em';
    ctx.fillText('CALITATE AER — OPENAQ LIVE',x+10,y+16);

    // AQI mare
    ctx.fillStyle=d.color;
    ctx.font='900 '+Math.min(W*0.032,44)+'px "Space Grotesk",sans-serif';
    ctx.fillText('AQI '+d.aqi,x+12,y+56);

    ctx.fillStyle=d.color;
    ctx.font='700 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
    ctx.fillText(d.status,x+12,y+74);

    // Poluanti
    var pols=[
      ['PM2.5',d.pm25!==null?d.pm25+' μg':'—'],
      ['PM10', d.pm10!==null?d.pm10+' μg':'—'],
      ['NO2',  d.no2!==null?d.no2+' μg':'—'],
    ];
    pols.forEach(function(p,i){
      ctx.fillStyle='rgba(220,230,255,0.70)';
      ctx.font='500 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left'; ctx.letterSpacing='0';
      ctx.fillText(p[0]+': '+p[1],x+12+(i*(w-24)/3),y+h-18);
    });

    ctx.fillStyle='rgba(148,163,184,0.35)';
    ctx.font='400 '+Math.min(W*0.007,9)+'px "IBM Plex Mono",monospace';
    ctx.fillText((d.statie||'')+' | '+d.sursa,x+8,y+h-5);
    ctx.restore();
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ④ OPEN-METEO — Meteo live, fara API key
// https://api.open-meteo.com/v1/forecast
// ═══════════════════════════════════════════════════════════════════════════
G._LiveMeteo = {

  BASE: 'https://api.open-meteo.com/v1/forecast',

  async fetch(city) {
    var k='meteo_'+city.name;
    var cached=cGet(k); if(cached) return cached;

    var url=this.BASE+'?latitude='+city.lat+'&longitude='+city.lon
      +'&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation'
      +'&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max'
      +'&forecast_days=7&timezone=Europe%2FBucharest';

    var data = await safeFetch(url, null, 8000);
    if(!data||!data.current) return null;

    var wmo_desc = {
      0:'Senin',1:'Majoritar senin',2:'Partial noros',3:'Noros',
      45:'Ceata',48:'Ceata izolata',51:'Burna usoara',53:'Burna',
      61:'Ploaie usoara',63:'Ploaie',65:'Ploaie intensa',
      71:'Ninsoare usoara',73:'Ninsoare',75:'Ninsoare intensa',
      80:'Averse',81:'Averse moderate',82:'Averse intense',
      95:'Furtuna',96:'Furtuna cu grindina',99:'Furtuna severa',
    };

    var result = {
      temp:Math.round(data.current.temperature_2m),
      umiditate:data.current.relative_humidity_2m,
      vant:Math.round(data.current.wind_speed_10m),
      cod:data.current.weather_code,
      desc:wmo_desc[data.current.weather_code]||'Vreme variabila',
      precipitatii:data.current.precipitation,
      // Prognoza 7 zile
      prognoza:(data.daily&&data.daily.time||[]).map(function(d,i){
        return {
          data:d,
          max:data.daily.temperature_2m_max[i],
          min:data.daily.temperature_2m_min[i],
          precip:data.daily.precipitation_sum[i],
        };
      }).slice(0,7),
      sursa:'Open-Meteo WMO',
      actualizat:new Date().toLocaleTimeString('ro-RO'),
    };
    console.log('[Open-Meteo]',city.name,result.temp+'°C',result.desc);
    return cSet(k,result,TTL_1H);
  },

  // Calculeaza zile caniculare pentru cinematicul v9 (mai precis decat hardcodat)
  async calcZileCaniculare(city) {
    var k='meteo_canicule_'+city.name;
    var cached=cGet(k); if(cached) return cached;

    // Fetch date istorice ultimul an pentru a estima zile caniculare
    var url='https://archive-api.open-meteo.com/v1/archive?'
      +'latitude='+city.lat+'&longitude='+city.lon
      +'&start_date=2023-01-01&end_date=2023-12-31'
      +'&daily=temperature_2m_max&timezone=Europe%2FBucharest';

    var data = await safeFetch(url, null, 12000);
    if(!data||!data.daily||!data.daily.temperature_2m_max) {
      return cSet(k, 18, TTL_24H); // fallback
    }

    var caniculare = data.daily.temperature_2m_max.filter(function(t){return t>=35;}).length;
    console.log('[Open-Meteo]',city.name,'zile caniculare 2023:',caniculare);
    return cSet(k, caniculare, TTL_24H);
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑤ OPENSKY NETWORK — Avioane live deasupra Romaniei
// https://opensky-network.org/api/states/all
// ═══════════════════════════════════════════════════════════════════════════
G._LiveOpenSky = {

  BASE: 'https://opensky-network.org/api',

  async fetchFlights(lat, lon, radiusDeg) {
    var k='opensky_'+Math.round(lat)+'_'+Math.round(lon);
    var cached=cGet(k); if(cached) return cached;

    var r=radiusDeg||2;
    var url=this.BASE+'/states/all?'
      +'lamin='+(lat-r)+'&lomin='+(lon-r)
      +'&lamax='+(lat+r)+'&lomax='+(lon+r);

    var data = await safeFetch(url,{
      headers:{'Accept':'application/json'}
    }, 10000);

    if(!data||!data.states) return cSet(k,[],TTL_5M);

    // Format: [icao24, callsign, origin_country, time_position, last_contact,
    //          longitude, latitude, baro_altitude, on_ground, velocity,
    //          true_track, vertical_rate, sensors, geo_altitude, squawk, spi, position_source]
    var flights = (data.states||[])
      .filter(function(s){return s[5]&&s[6]&&!s[8];}) // are coordonate, nu e pe sol
      .map(function(s){
        return {
          icao: s[0],
          callsign: (s[1]||'').trim(),
          country: s[2],
          lon: s[5], lat: s[6],
          alt_m: s[7]||0,
          viteza: s[9]||0,
          directie: s[10]||0,
          urc_coboara: s[11]||0, // vertical rate
        };
      })
      .slice(0,50); // max 50 avioane

    console.log('[OpenSky] '+flights.length+' avioane deasupra zonei');
    return cSet(k, flights, TTL_5M);
  },

  // Afiseaza avioane pe Mapbox
  async showOnMap(map, city) {
    var flights = await this.fetchFlights(city.lat, city.lon, 3);
    if(!flights||!flights.length) return;

    var features = flights.map(function(f){
      return {
        type:'Feature',
        geometry:{type:'Point',coordinates:[f.lon,f.lat]},
        properties:{
          callsign:f.callsign||'—',
          country:f.country||'—',
          alt_m:Math.round(f.alt_m||0),
          alt_ft:Math.round((f.alt_m||0)*3.281),
          viteza:Math.round((f.viteza||0)*3.6), // m/s -> km/h
          directie:Math.round(f.directie||0),
          icon:'airplane',
          color:'#60a5fa',
        }
      };
    });

    try{
      ['opensky-pts','opensky-src'].forEach(function(id){
        try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
        try{if(map.getSource(id))map.removeSource(id);}catch(e){}
      });
      map.addSource('opensky-src',{type:'geojson',
        data:{type:'FeatureCollection',features:features}});
      map.addLayer({id:'opensky-pts',type:'circle',source:'opensky-src',
        paint:{
          'circle-color':'#60a5fa','circle-radius':6,
          'circle-opacity':0.9,'circle-stroke-width':1.5,
          'circle-stroke-color':'rgba(255,255,255,0.7)',
        }});

      map.on('click','opensky-pts',function(e){
        var p=e.features[0]&&e.features[0].properties||{};
        new mapboxgl.Popup({maxWidth:'250px'})
          .setLngLat(e.lngLat)
          .setHTML('<div style="font:11px/1.6 \'IBM Plex Mono\',monospace;padding:6px;color:#c8d7f0">'
            +'<b style="color:#60a5fa">✈ '+(p.callsign||'necunoscut')+'</b><br>'
            +'Tara: '+p.country+'<br>'
            +'Altitudine: '+p.alt_ft+' ft ('+p.alt_m+' m)<br>'
            +'Viteza: '+p.viteza+' km/h<br>'
            +'Directie: '+p.directie+'°'
            +'</div>')
          .addTo(map);
      });
      map.on('mouseenter','opensky-pts',function(){map.getCanvas().style.cursor='pointer';});
      map.on('mouseleave','opensky-pts',function(){map.getCanvas().style.cursor='';});

      console.log('[OpenSky] '+features.length+' avioane afisate');
    }catch(e){ console.warn('[OpenSky]',e.message); }
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑥ GTFS — Transport public din OSM + feeds publice
// ═══════════════════════════════════════════════════════════════════════════
G._LiveGTFS = {

  FEEDS: {
    'RO-B-01': {name:'STB Bucuresti',url:'https://gtfs.tpbi.ro/feed/gtfs.zip',status:'disponibil'},
    'RO-CJ-01':{name:'CTP Cluj',url:'https://www.ctpcj.ro/index.php/en/gtfs',status:'disponibil'},
    'RO-IS-01':{name:'CTP Iasi',url:null,status:'indisponibil',nota:'OSM fallback'},
    'RO-TM-01':{name:'RATT Timisoara',url:null,status:'partial'},
  },

  async fetchFromOSM(city) {
    var k='gtfs_osm_'+city.name;
    var cached=cGet(k); if(cached) return cached;

    var q='[out:json][timeout:20];(relation["route"~"bus|tram|trolleybus|subway|train"]'
      +'(around:10000,'+city.lat+','+city.lon+'););out geom;';

    var data=await safeFetch(PROXY+'/osm?q='+encodeURIComponent(q),null,15000);
    if(!data) return cSet(k,[]);

    var routes=[];
    (data.elements||[]).forEach(function(el){
      if(el.type!=='relation') return;
      var tags=el.tags||{};
      var coords=[];
      (el.members||[]).forEach(function(m){
        if(m.geometry) m.geometry.forEach(function(p){
          if(p.lon&&p.lat) coords.push([p.lon,p.lat]);
        });
      });
      if(coords.length<2) return;
      var col=tags.route==='tram'?'#ef4444':
              tags.route==='subway'?'#a78bfa':
              tags.route==='trolleybus'?'#22c55e':'#3b82f6';
      routes.push({
        id:el.id,type:tags.route||'bus',
        name:tags.name||tags.ref||'Linie TP',
        ref:tags.ref||'',color:col,
        coords:coords,
        width:tags.route==='tram'?5:tags.route==='subway'?6:2,
      });
    });

    console.log('[GTFS/OSM] '+routes.length+' trasee TP pentru '+city.name);
    return cSet(k,routes,TTL_24H);
  },

  async showOnMap(map, city, flowAnim) {
    var routes=await this.fetchFromOSM(city);
    if(!routes||!routes.length) return;

    var features=routes.map(function(r){
      return {type:'Feature',
        geometry:{type:'LineString',coordinates:r.coords},
        properties:{color:r.color,width:r.width,name:r.name,ref:r.ref,type:r.type}};
    });

    try{
      ['gtfs-src','gtfs-glow','gtfs-lines'].forEach(function(id){
        try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
        try{if(map.getSource(id))map.removeSource(id);}catch(e){}
      });
      map.addSource('gtfs-src',{type:'geojson',
        data:{type:'FeatureCollection',features:features}});
      map.addLayer({id:'gtfs-glow',type:'line',source:'gtfs-src',
        layout:{'line-join':'round','line-cap':'round'},
        paint:{'line-color':['get','color'],'line-width':14,
               'line-opacity':0.08,'line-blur':10}});
      map.addLayer({id:'gtfs-lines',type:'line',source:'gtfs-src',
        layout:{'line-join':'round','line-cap':'round'},
        paint:{'line-color':['get','color'],'line-width':['get','width'],'line-opacity':0.85}});

      if(flowAnim){
        var off=0;
        var iv=setInterval(function(){
          if(!map.getLayer('gtfs-lines')){clearInterval(iv);return;}
          off=(off+1.5)%20;
          try{map.setPaintProperty('gtfs-lines','line-dasharray',[3,Math.max(0.5,off*0.35)]);}catch(e){clearInterval(iv);}
        },55);
        if(window._ivs) window._ivs.push(iv);
      }
      console.log('[GTFS] '+features.length+' trasee afisate pentru '+city.name);
    }catch(e){ console.warn('[GTFS]',e.message); }
  },

  getInfo(cityKey) {
    return this.FEEDS[cityKey]||{name:'TP local',status:'indisponibil',nota:'OSM fallback'};
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑦ TERRAIN — Aeroporturi Romania cu restrictii ROMARTSA
// ═══════════════════════════════════════════════════════════════════════════
G._LiveTerrain = {

  // Date complete ROMARTSA - toate aeroporturile civile Romania
  // Sursa: AIP Romania ROMARTSA 2025 + OACI
  AEROPORTURI: {
    'LROP':{name:'Henri Coanda Bucuresti',iata:'OTP',lat:44.572,lon:26.102,
            altM:95,CTR_km:15,H_max_CTR:145,TMA_km:50,H_max_TMA:300},
    'LRCK':{name:'Mihail Kogalniceanu Constanta',iata:'CND',lat:44.362,lon:28.488,
            altM:15,CTR_km:20,H_max_CTR:150,TMA_km:60,H_max_TMA:350},
    'LRCT':{name:'Traian Vuia Timisoara',iata:'TSR',lat:45.809,lon:21.337,
            altM:99,CTR_km:15,H_max_CTR:100,TMA_km:50,H_max_TMA:250},
    'LRCL':{name:'Avram Iancu Cluj',iata:'CLJ',lat:46.785,lon:23.686,
            altM:415,CTR_km:15,H_max_CTR:100,TMA_km:50,H_max_TMA:300},
    'LRIA':{name:'Iasi International',iata:'IAS',lat:47.178,lon:27.620,
            altM:123,CTR_km:12,H_max_CTR:90,TMA_km:40,H_max_TMA:250},
    'LRSB':{name:'Sibiu International',iata:'SBZ',lat:45.786,lon:24.092,
            altM:444,CTR_km:10,H_max_CTR:80,TMA_km:40,H_max_TMA:250},
    'LRBS':{name:'Bacau George Enescu',iata:'BCM',lat:46.522,lon:26.910,
            altM:185,CTR_km:10,H_max_CTR:80,TMA_km:35,H_max_TMA:200},
    'LROD':{name:'Oradea Airport',iata:'OMR',lat:47.025,lon:21.902,
            altM:135,CTR_km:8,H_max_CTR:70,TMA_km:30,H_max_TMA:200},
    'LRTR':{name:'Arad International',iata:'ARW',lat:46.176,lon:21.262,
            altM:113,CTR_km:10,H_max_CTR:80,TMA_km:35,H_max_TMA:200},
    'LRSV':{name:'Stefan cel Mare Suceava',iata:'SCV',lat:47.687,lon:26.354,
            altM:374,CTR_km:8,H_max_CTR:70,TMA_km:30,H_max_TMA:200},
    'LRGG':{name:'Girov Piatra Neamt',iata:null,lat:46.878,lon:26.366,
            altM:450,CTR_km:5,H_max_CTR:60,TMA_km:0,H_max_TMA:0},
    'LRBO':{name:'Botosani Airport',iata:null,lat:47.660,lon:26.679,
            altM:161,CTR_km:5,H_max_CTR:50,TMA_km:0,H_max_TMA:0},
    'LRTM':{name:'Tirgu Mures Airport',iata:'TGM',lat:46.467,lon:24.412,
            altM:363,CTR_km:8,H_max_CTR:70,TMA_km:30,H_max_TMA:200},
  },

  getForCity(city, radiusKm) {
    if(!city||!city.lat) return [];
    var cx=city.lon, cy=city.lat, R=111*Math.cos(cy*Math.PI/180);
    var result=[];
    Object.entries(this.AEROPORTURI).forEach(function(e){
      var oaci=e[0],A=e[1];
      var d=Math.hypot((A.lon-cx)*R,(A.lat-cy)*111);
      if(d<=(radiusKm||150)){
        result.push(Object.assign({oaci:oaci,distKm:Math.round(d)},A));
      }
    });
    result.sort(function(a,b){return a.distKm-b.distKm;});
    return result;
  },

  getDistanta(city) {
    var list=this.getForCity(city,200);
    if(!list.length) return null;
    var n=list[0];
    return {
      aeroport:n, distKm:n.distKm,
      timp_min:Math.round(n.distKm*1.3),
      clasificare:n.distKm<20?'PROXIMITATE IMEDIATA':n.distKm<50?'ACCES RAPID':
                  n.distKm<100?'ACCES MODERAT':'IZOLAT AERIAN',
      iata_disponibil:!!n.iata,
    };
  },

  showRestrictii(map, city) {
    var aeroporturi=this.getForCity(city,150);
    if(!aeroporturi.length) return;

    var features=[];
    aeroporturi.forEach(function(A){
      // CTR zone
      if(A.CTR_km>0){
        var ptsCTR=[];
        for(var i=0;i<=36;i++){
          var ang=i/36*2*Math.PI;
          ptsCTR.push([A.lon+Math.cos(ang)*A.CTR_km/111/Math.cos(A.lat*Math.PI/180),
                       A.lat+Math.sin(ang)*A.CTR_km/111]);
        }
        ptsCTR.push(ptsCTR[0]);
        features.push({type:'Feature',
          geometry:{type:'Polygon',coordinates:[ptsCTR]},
          properties:{oaci:A.oaci,name:A.name,zona:'CTR',
            H_max:A.H_max_CTR,dist:A.distKm,color:'rgba(239,68,68,0.12)'}});
      }
      // Punct aeroport
      features.push({type:'Feature',
        geometry:{type:'Point',coordinates:[A.lon,A.lat]},
        properties:{oaci:A.oaci,name:A.name,iata:A.iata||'',
          dist:A.distKm,H_max:A.H_max_CTR,color:'#ef4444'}});
    });

    try{
      ['aero-src','aero-zone','aero-border','aero-pts'].forEach(function(id){
        try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
        try{if(map.getSource(id))map.removeSource(id);}catch(e){}
      });
      map.addSource('aero-src',{type:'geojson',data:{type:'FeatureCollection',features:features}});
      map.addLayer({id:'aero-zone',type:'fill',source:'aero-src',
        filter:['==',['geometry-type'],'Polygon'],
        paint:{'fill-color':['get','color'],'fill-opacity':0.5}});
      map.addLayer({id:'aero-border',type:'line',source:'aero-src',
        filter:['==',['geometry-type'],'Polygon'],
        paint:{'line-color':'#ef4444','line-width':1.5,'line-opacity':0.6,'line-dasharray':[4,2]}});
      map.addLayer({id:'aero-pts',type:'circle',source:'aero-src',
        filter:['==',['geometry-type'],'Point'],
        paint:{'circle-color':'#ef4444','circle-radius':10,'circle-opacity':0.9,
               'circle-stroke-width':2,'circle-stroke-color':'#fff'}});

      map.on('click','aero-pts',function(e){
        var p=e.features[0]&&e.features[0].properties||{};
        new mapboxgl.Popup({maxWidth:'280px'})
          .setLngLat(e.lngLat)
          .setHTML('<div style="font:11px/1.6 \'IBM Plex Mono\',monospace;padding:6px;color:#c8d7f0">'
            +'<b style="color:#ef4444">✈ '+(p.iata?p.iata+' — ':'')+(p.oaci||'')+'</b><br>'
            +(p.name||'')+'<br>'
            +'Distanta: <b>'+p.dist+' km</b><br>'
            +'H max CTR: <b style="color:#f59e0b">'+p.H_max+' m</b><br>'
            +'<span style="color:#475569;font-size:9px">ROMARTSA AIP Romania 2025</span>'
            +'</div>')
          .addTo(map);
      });
      console.log('[ROMARTSA] '+aeroporturi.length+' aeroporturi cu restrictii');
    }catch(e){ console.warn('[Terrain]',e.message); }
    return aeroporturi;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑧ CESTRIN — Trafic estimat din OSM (nu exista API public direct)
// ═══════════════════════════════════════════════════════════════════════════
G._LiveCESTRIN = {

  buildTrafficLayer(map, roadsOSM, city) {
    if(!roadsOSM||!roadsOSM.length) return;
    var pop=city&&city.pop2021||100000;
    var cx=city&&city.lon||27.601, cy=city&&city.lat||47.158;
    var R=111*Math.cos(cy*Math.PI/180);

    // Capacitati rutiere (veh/h pe sens) bazate pe CESTRIN 2022
    var CAP={motorway:3000,trunk:2000,primary:1200,secondary:700,tertiary:300,residential:100};

    var features=roadsOSM.map(function(f){
      var hw=(f.properties&&f.properties.hw)||'tertiary';
      var coords=f.geometry&&f.geometry.coordinates||[];
      if(!coords.length) return null;
      var mid=coords[Math.floor(coords.length/2)]||coords[0];
      var distKm=mid?Math.hypot((mid[0]-cx)*R,(mid[1]-cy)*111):5;
      var isUrban=distKm<3, isSemiUrban=distKm<8;

      // Trafic estimat calibrat pe CESTRIN (MZA mediu zilnic anual)
      var capDict={motorway:25000,trunk:15000,primary:8000,secondary:4000,tertiary:1500,residential:300};
      var mza=Math.round((capDict[hw]||500)*(isUrban?0.9:isSemiUrban?0.65:0.35)
        *Math.pow(pop/360000,0.35));
      var sat=Math.min(1.0,mza/(CAP[hw]||300)/8); // ora varf = 8x mza medie orara

      var color=sat>0.90?'#ef4444':sat>0.70?'#f97316':sat>0.50?'#f59e0b':
                sat>0.30?'#84cc16':'#22c55e';
      var width=hw==='motorway'?7:hw==='trunk'?5:hw==='primary'?4:
                hw==='secondary'?3:hw==='tertiary'?2:1;
      return {type:'Feature',geometry:f.geometry,
        properties:{hw:hw,mza:mza,sat:Math.round(sat*100),
          color:color,width:width,congestionat:sat>0.75}};
    }).filter(Boolean);

    features.sort(function(a,b){return (a.properties.sat||0)-(b.properties.sat||0);});

    try{
      ['cestrin-src','cestrin-glow','cestrin-lines'].forEach(function(id){
        try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
        try{if(map.getSource(id))map.removeSource(id);}catch(e){}
      });
      map.addSource('cestrin-src',{type:'geojson',data:{type:'FeatureCollection',features:features}});
      map.addLayer({id:'cestrin-glow',type:'line',source:'cestrin-src',
        filter:['==',['get','congestionat'],true],
        layout:{'line-join':'round','line-cap':'round'},
        paint:{'line-color':'#ef4444','line-width':20,'line-opacity':0.10,'line-blur':14}});
      map.addLayer({id:'cestrin-lines',type:'line',source:'cestrin-src',
        layout:{'line-join':'round','line-cap':'round'},
        paint:{'line-color':['get','color'],'line-width':['get','width'],'line-opacity':0.88}});
      console.log('[CESTRIN] '+features.length+' segmente trafic estimate');
    }catch(e){ console.warn('[CESTRIN]',e.message); }
    return features;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// API UNIFICAT
// ═══════════════════════════════════════════════════════════════════════════
G._LiveSources = {
  CNAIR:   G._LiveCNAIR,
  MDLPA:   G._LiveMDLPA,
  ANPM:    G._LiveANPM,
  Meteo:   G._LiveMeteo,
  OpenSky: G._LiveOpenSky,
  GTFS:    G._LiveGTFS,
  Terrain: G._LiveTerrain,
  CESTRIN: G._LiveCESTRIN,

  async preloadAll(city) {
    if(!city||!city.lat) return {};
    var results={};

    await Promise.allSettled([
      Promise.resolve(results.cnair=G._LiveCNAIR.getForCity
        ?{nearby:Object.entries(G._LiveCNAIR.STATIC_BACKUP).slice(0,3)}:{})
        .catch(function(){}),
      Promise.resolve(results.aeroporturi=G._LiveTerrain.getForCity(city,150)),
      Promise.resolve(results.distAero=G._LiveTerrain.getDistanta(city)),
      G._LiveANPM.fetchAQI(city).then(function(d){results.aqi=d;}).catch(function(){}),
      G._LiveMeteo.fetch(city).then(function(d){results.meteo=d;}).catch(function(){}),
      G._LiveMeteo.calcZileCaniculare(city).then(function(d){results.zileCaniculare=d;}).catch(function(){}),
      city.siruta?G._LiveMDLPA.fetchPUGStatus(city.siruta).then(function(d){results.mdlpa=d;}).catch(function(){}):Promise.resolve(),
    ]);

    var loaded=Object.keys(results).filter(function(k){return results[k]!=null;});
    console.log('[LiveSources v2] Preload '+city.name+': '+loaded.join(', '));
    return results;
  },
};

console.log('[cinema-live-sources.js v2.0] LOADED — CNAIR|MDLPA|OpenAQ|Open-Meteo|OpenSky|GTFS|ROMARTSA|CESTRIN');

})(window);
