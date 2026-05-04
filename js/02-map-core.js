// UrbanX — Mapbox, layere, volume, context

const map=new mapboxgl.Map({
  container:'map',style:STYLES.custom,
  center:[27.6014,47.1585],zoom:13,pitch:0,bearing:0,antialias:true,
  preserveDrawingBuffer:true
});
map.addControl(new mapboxgl.NavigationControl(),'top-left');
// Safety: curăță stări rămase din sesiuni anterioare
document.getElementById('topbar')?.classList.remove('viewer-open');
const _mapEl = document.getElementById('map');
if(_mapEl) _mapEl.style.visibility = 'visible';

// ANCPI live eliminat - geometria vine din zone/ locale


// ── DETECTARE INTRAVILAN/EXTRAVILAN ─────────────────────────────────────
// SURSE DE DATE:
// 1. lookupUTR(lng,lat) -> UTR valid = INTRAVILAN Municipiul Iasi (din PUG)
// 2. Nominatim reverse geocoding -> UAT real (async)
// 3. Daca nu e in PUG si Nominatim nu raspunde -> "In afara PUG Iasi"

// Helper comun: verifică dacă UTR-ul provine din PUG
function _checkPUGZone(utr){
  const utrClean = resolveUTR(utr||'');
  const isFromPUG = utrClean && utrClean !== '—' && utrClean !== ''
                    && utrClean !== 'EXT' && utrClean !== 'EXT_COM'
                    && utrClean !== '?' && utrClean !== '??';
  return {utrClean, isFromPUG};
}

// Versiunea sincrona (folosita pentru UI instant) - doar pe baza UTR
function detectZoneType(lat, lng, utr){
  const {utrClean, isFromPUG} = _checkPUGZone(utr);
  if(isFromPUG){
    return {type:'intravilan', utr:utrClean, label:'🏙 Intravilan Municipiul Iași — UTR '+utrClean, color:'#34d399'};
  }
  return {type:'necunoscut', utr:utrClean||'EXT_COM', label:'📍 În afara PUG Municipiul Iași — se verifică UAT-ul…', color:'#94a3b8'};
}

// Versiunea async - interogheaza Nominatim pentru UAT real
async function detectZoneTypeAsync(lat, lng, utr){
  const {utrClean: utrCl, isFromPUG: fromPUG} = _checkPUGZone(utr);
  if(fromPUG){
    return {type:'intravilan', utr:utrCl, label:'🏙 Intravilan Municipiul Iași — UTR '+utrCl, color:'#34d399', uat:'Municipiul Iași'};
  }
  
  // Nu e in PUG Iasi - interogam Nominatim pentru UAT real
  try{
    const r = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=10&accept-language=ro`,
      {signal: AbortSignal.timeout(5000)}
    );
    if(r.ok){
      const data = await r.json();
      const addr = data.address || {};
      const uat = addr.municipality || addr.city || addr.town || addr.village || addr.suburb || '';
      const county = addr.county || addr.state || '';
      const isIasi = uat.toLowerCase().includes('iași') || uat.toLowerCase().includes('iasi');
      
      if(isIasi){
        // E in UAT Iasi dar in afara PUG = extravilan Iasi
        return {
          type:'extravilan_iasi',
          utr:'EXT',
          label:'🌿 Extravilan Municipiul Iași (în afara PUG)',
          color:'#f59e0b',
          uat:'Municipiul Iași'
        };
      } else if(uat){
        // Alta UAT din judet
        const isComune = addr.village || addr.town;
        return {
          type:'extravilan_com',
          utr:'EXT_COM',
          label:`🌾 ${isComune?'Comuna/Sat':'Localitate'} ${uat}${county?' — '+county:''}`,
          color:'#94a3b8',
          uat: uat
        };
      }
    }
  }catch(e){ console.warn('Nominatim reverse error:', e.message); }
  
  // Fallback daca Nominatim nu raspunde
  return {
    type:'necunoscut',
    utr:'EXT_COM',
    label:'📍 În afara PUG Municipiul Iași',
    color:'#94a3b8',
    uat:'necunoscut'
  };
}

// Fix #10: Detectare latura principala (front stradal) a parcelei
// Returneaza bearing-ul fata de Nord al laturii celei mai apropiate de o strada publica
// Guard: nu apelam Overpass detectRoadFront daca avem deja un request in zbor
let _roadFrontInFlight = false;
async function detectRoadFront(parcelGeo) {
  if(!parcelGeo?.geometry) return null;
  if(_roadFrontInFlight) return null; // evitam 429
  _roadFrontInFlight = true;
  try {
    const center = turf.centerOfMass(parcelGeo).geometry.coordinates;
    const cx = center[0], cy = center[1];
    
    // Interogam Overpass pentru strazile din raza de 150m
    const q = `[out:json][timeout:10];(way["highway"~"residential|secondary|tertiary|primary|unclassified|service|footway|path"](around:150,${cy},${cx}););out geom;`;
    let roadFeats = [];
    try {
      const r = await fetch('https://overpass-api.de/api/interpreter', {
        method:'POST', body:q,
        signal: AbortSignal.timeout(10000)
      });
      if(r.ok) {
        const j = await r.json();
        roadFeats = (j.elements||[])
          .filter(el=>el.geometry?.length>=2)
          .map(el=>({
            type:'Feature',
            geometry:{type:'LineString', coordinates:el.geometry.map(p=>[p.lon,p.lat])},
            properties:{highway: el.tags?.highway||''}
          }));
      }
    } catch(e) { return null; }
    
    if(!roadFeats.length) return null;

    // Prioritizam strazile principale fata de cele secundare
    const roadPriority = {'primary':5,'secondary':4,'tertiary':3,'residential':2,'unclassified':2,'service':1};
    roadFeats.sort((a,b)=>(roadPriority[b.properties.highway]||0)-(roadPriority[a.properties.highway]||0));
    
    const ring = parcelGeo.geometry.type==='Polygon'
      ? parcelGeo.geometry.coordinates[0]
      : parcelGeo.geometry.coordinates[0][0];
    
    if(!ring?.length) return null;
    
    // Pentru fiecare latura a parcelei, calculam distanta minima la orice strada
    const mLng = 111320 * Math.cos(cy * Math.PI/180);
    const mLat = 111320;
    
    let bestSideIdx = 0, minSideDist = Infinity;
    const sideDists = [];
    
    for(let i=0; i<ring.length-1; i++){
      const p1=ring[i], p2=ring[i+1];
      const midX=(p1[0]+p2[0])/2, midY=(p1[1]+p2[1])/2;
      
      let minD = Infinity;
      for(const road of roadFeats){
        try{
          const np = turf.nearestPointOnLine(road, turf.point([midX,midY]));
          const dM = turf.distance(turf.point([midX,midY]), np, {units:'meters'});
          if(dM < minD) minD = dM;
        }catch(e){}
      }
      sideDists.push(minD);
      if(minD < minSideDist){ minSideDist=minD; bestSideIdx=i; }
    }
    
    // Verificam daca exista laturi la distanta similara de strada (parcela de colt)
    // Prag: laturi la max 1.5x distanta celei mai apropiate = toate fronturi
    const frontThresh = minSideDist * 1.5;
    const frontSides = sideDists.map((d,i)=>({d,i})).filter(({d})=>d<=frontThresh);
    
    if(frontSides.length === 0) return null;
    
    // Bearing = directia de la centrul parcelei SPRE strada (perpendicular pe latura frontala)
    // Pentru latura frontala: bearing spre mijlocul ei = directia spre strada
    const fsi = frontSides[0].i; // folosim prima latura frontala
    const p1=ring[fsi], p2=ring[fsi+1];
    const midX=(p1[0]+p2[0])/2, midY=(p1[1]+p2[1])/2;
    
    // Bearing de la centrul parcelei spre mijlocul laturii frontale
    const dLng=(midX-cx)*mLng, dLat=(midY-cy)*mLat;
    const bearingToFront = (Math.atan2(dLng,dLat)*180/Math.PI+360)%360;
    
    return Math.round(bearingToFront);
    
  } catch(e) { 
    console.warn('detectRoadFront error:', e.message);
    _roadFrontInFlight = false;
    return null; 
  } finally {
    _roadFrontInFlight = false;
  }
}




// ═══ MAP INIT ════════════════════════════════════════════════════════════
function addLayers(){
  const E={type:'FeatureCollection',features:[]};
  ['parcel-src','utr-src','ctx-src','vol-src','fp-src','sv-src','front-src','ctx-labels-src','dist-src','aedis-dim-src',
   'bilant-src','edificabil-src','setback-src',
   'lotizare-src','lotizare-drum-src','lotizare-label-src',
   'lot-demo-src',        // clădiri existente marcate pentru demolare
   'lot-drum-edit-src','lot-drum-vert-src'].forEach(id=>{
    if(!map.getSource(id)) map.addSource(id,{type:'geojson',data:E});
  });
  const L=(spec)=>{if(!map.getLayer(spec.id))map.addLayer(spec);};

  L({id:'utr-fill',type:'fill',source:'utr-src',paint:{'fill-color':['coalesce',['get','c'],'#6d28d9'],'fill-opacity':0.2}});
  L({id:'utr-line',type:'line',source:'utr-src',paint:{'line-color':['coalesce',['get','c'],'#6d28d9'],'line-width':1.5,'line-opacity':0.7}});
  L({id:'utr-lbl',type:'symbol',source:'utr-src',minzoom:13,layout:{'text-field':['get','utr'],'text-size':11,'text-font':['DIN Offc Pro Bold','Arial Unicode MS Bold']},paint:{'text-color':['coalesce',['get','c'],'#c4b5fd'],'text-halo-color':'rgba(0,0,0,.8)','text-halo-width':1.5}});

  // ── Bilanț edificabil — zone colorate ────────────────────────────────────
  // Zona neconstruibilă (retrageri) — roșu semi-transparent
  L({id:'setback-fill',type:'fill',source:'setback-src',paint:{'fill-color':['coalesce',['get','color'],'#ef4444'],'fill-opacity':0.25}});
  L({id:'setback-line',type:'line',source:'setback-src',paint:{'line-color':['coalesce',['get','color'],'#ef4444'],'line-width':1,'line-dasharray':[2,2]}});
  // Edificabil disponibil — verde
  L({id:'edificabil-fill',type:'fill',source:'edificabil-src',paint:{'fill-color':'#22c55e','fill-opacity':0.18}});
  L({id:'edificabil-line',type:'line',source:'edificabil-src',paint:{'line-color':'#22c55e','line-width':2,'line-dasharray':[4,2]}});
  // Bilanț labels — procente pe hartă
  L({id:'bilant-label',type:'symbol',source:'bilant-src',minzoom:14,layout:{
    'text-field':['get','label'],'text-size':12,
    'text-font':['DIN Offc Pro Bold','Arial Unicode MS Bold'],
    'text-anchor':'center','text-allow-overlap':true
  },paint:{'text-color':['get','color'],'text-halo-color':'rgba(0,0,0,.85)','text-halo-width':2}});

  // ── Lotizare layers ─────────────────────────────────────────────────────
  L({id:'lotizare-fill',type:'fill',source:'lotizare-src',paint:{
    'fill-color':['coalesce',['get','color'],'#a78bfa'],'fill-opacity':0.25
  }});
  L({id:'lotizare-line',type:'line',source:'lotizare-src',paint:{
    'line-color':['coalesce',['get','borderColor'],'#7c3aed'],'line-width':1.5
  }});
  L({id:'lotizare-drum-fill',type:'fill',source:'lotizare-drum-src',paint:{
    'fill-color':'#94a3b8','fill-opacity':0.4
  }});
  L({id:'lotizare-drum-line',type:'line',source:'lotizare-drum-src',paint:{
    'line-color':'#cbd5e1','line-width':1
  }});
  // Layer editor circulații custom
  L({id:'lot-drum-edit-line',type:'line',source:'lot-drum-edit-src',paint:{
    'line-color':['coalesce',['get','color'],'#38bdf8'],
    'line-width':['coalesce',['get','lineW'],4],
    'line-opacity':0.85,
    'line-dasharray':[2,1]
  }});
  L({id:'lot-drum-edit-case',type:'line',source:'lot-drum-edit-src',paint:{
    'line-color':['coalesce',['get','caseColor'],'#0f172a'],
    'line-width':['coalesce',['get','caseW'],8],
    'line-opacity':0.4
  },'before':'lot-drum-edit-line'});
  L({id:'lot-drum-edit-vert',type:'circle',source:'lot-drum-vert-src',paint:{
    'circle-radius':6,'circle-color':'#38bdf8',
    'circle-stroke-width':2,'circle-stroke-color':'#0f172a'
  }});
  L({id:'lot-drum-edit-vert-sel',type:'circle',source:'lot-drum-vert-src',filter:['==',['get','sel'],true],paint:{
    'circle-radius':9,'circle-color':'#fbbf24',
    'circle-stroke-width':2,'circle-stroke-color':'#0f172a'
  }});
  // ── Layer clădiri marcate pentru demolare ─────────────────────────────
  L({id:'lot-demo-fill',type:'fill',source:'lot-demo-src',paint:{
    'fill-color':'#ef4444','fill-opacity':0.35
  }});
  L({id:'lot-demo-line',type:'line',source:'lot-demo-src',paint:{
    'line-color':'#ef4444','line-width':2,'line-dasharray':[3,2]
  }});
  // Hașuri diagonale roșii (simulare prin pattern de linii)
  L({id:'lot-demo-hatch',type:'fill',source:'lot-demo-src',paint:{
    'fill-color':'#ef4444',
    'fill-opacity':['case',['get','marked'],0.15,0],
    'fill-opacity':0
  }});
  L({id:'lotizare-label',type:'symbol',source:'lotizare-label-src',minzoom:14,layout:{
    'text-field':['get','label'],'text-size':11,
    'text-font':['DIN Offc Pro Bold','Arial Unicode MS Bold'],
    'text-anchor':'center',
    'text-allow-overlap':false,   // NU suprapune labeluri
    'text-ignore-placement':false,
    'text-max-width':6,
    'text-line-height':1.2,
  },paint:{'text-color':['get','color'],'text-halo-color':'rgba(0,0,0,.95)','text-halo-width':2.5}});

  // Parcele cadastrale (multiselect)
  L({id:'parcel-fill',type:'fill',source:'parcel-src',paint:{'fill-color':['coalesce',['get','fc'],'#00e5b4'],'fill-opacity':0.22}});
  L({id:'parcel-line',type:'line',source:'parcel-src',paint:{'line-color':['coalesce',['get','lc'],'#00e5b4'],'line-width':3}});
  // Layer numere cadastrale pe parcele
  L({id:'parcel-label',type:'symbol',source:'parcel-src',
    minzoom:15.5,
    layout:{
      'text-field':['coalesce',['get','nrcad'],['get','NR_CAD'],''],
      'text-size':['interpolate',['linear'],['zoom'],
        15.5, 10,
        17, 13,
        18, 15,
        20, 18
      ],
      'text-font':['DIN Offc Pro Bold','Arial Unicode MS Bold'],
      'text-anchor':'center',
      'text-allow-overlap':false,
      'text-ignore-placement':false,
      'symbol-placement':'point',
      'text-max-width':8
    },
    paint:{
      'text-color':'#00ffd5',
      'text-halo-color':'rgba(0,0,0,.95)',
      'text-halo-width':2,
      'text-opacity':['interpolate',['linear'],['zoom'],15.5,0.7,17,1]
    }
  });

  L({id:'fp-fill',type:'fill',source:'fp-src',paint:{'fill-color':'#ff6b35','fill-opacity':0.15}});
  // Fix #11: spatii verzi layer
  L({id:'sv-fill',type:'fill',source:'sv-src',paint:{'fill-color':'#22c55e','fill-opacity':0.35}});
  L({id:'sv-line',type:'line',source:'sv-src',paint:{'line-color':'#16a34a','line-width':2}});
  L({id:'fp-line',type:'line',source:'fp-src',paint:{'line-color':'#ff6b35','line-width':2,'line-dasharray':[4,3]}});

  // ── Aliniamente vizuale pe hartă ──────────────────────────────────────
  // front-src conține: latura frontală, laterale, posterior, cu distanțe
  // Layer gros pentru click/touch pe laturi — 36px pentru touch precis pe mobile
  L({id:'front-parcel-click',type:'line',source:'front-src',
    filter:['==',['get','type'],'parcel_side'],
    paint:{'line-color':'rgba(255,255,255,0.01)','line-width':36,'line-opacity':0.01}
  });
  L({id:'front-parcel-line',type:'line',source:'front-src',
    filter:['==',['get','type'],'parcel_side'],
    paint:{
      'line-color':['coalesce',['get','color'],'#ffffff'],
      'line-width':['case',['==',['get','role'],'front'],6,4],
      'line-opacity':0.95,
      'line-gap-width':0
    }
  });
  // Halo alb in spatele liniei pentru vizibilitate
  L({id:'front-parcel-halo',type:'line',source:'front-src',
    filter:['==',['get','type'],'parcel_side'],
    paint:{
      'line-color':'rgba(0,0,0,0.6)',
      'line-width':['case',['==',['get','role'],'front'],10,7],
      'line-opacity':0.5
    }
  });
  L({id:'front-setback-line',type:'line',source:'front-src',
    filter:['==',['get','type'],'setback'],
    paint:{
      'line-color':['coalesce',['get','color'],'#ffffff'],
      'line-width':1.5,
      'line-dasharray':[4,3],
      'line-opacity':0.7
    }
  });
  L({id:'front-label',type:'symbol',source:'front-src',
    filter:['==',['get','type'],'label'],
    layout:{
      'text-field':['get','label'],
      'text-size':12,
      'text-font':['DIN Offc Pro Bold','Arial Unicode MS Bold'],
      'text-anchor':'center',
      'text-rotation-alignment':'map',
      'text-allow-overlap':true,
      'text-ignore-placement':true
    },
    paint:{
      'text-color':['coalesce',['get','color'],'#ffffff'],
      'text-halo-color':'rgba(0,0,0,.85)',
      'text-halo-width':2
    }
  });
  // Săgeată direcție front (simbol triunghi pe frontul parcelei)
  L({id:'front-arrow',type:'symbol',source:'front-src',
    filter:['==',['get','type'],'arrow'],
    layout:{
      'text-field':'▶',
      'text-size':18,
      'text-font':['DIN Offc Pro Bold','Arial Unicode MS Bold'],
      'text-rotation-alignment':'map',
      'text-rotate':['get','bearing'],
      'text-allow-overlap':true,
      'text-ignore-placement':true,
      'text-anchor':'center'
    },
    paint:{
      'text-color':'#d4af37',
      'text-halo-color':'rgba(0,0,0,.9)',
      'text-halo-width':2
    }
  });
  L({id:'ctx-3d',type:'fill-extrusion',source:'ctx-src',paint:{
    'fill-extrusion-color':['coalesce',['get','col'],'#6b7280'],
    'fill-extrusion-height':['coalesce',['case',['has','h'],['to-number',['get','h']],7],7],
    'fill-extrusion-base':0,
    'fill-extrusion-opacity':0.52,
    'fill-extrusion-vertical-gradient': true,
    'fill-extrusion-ambient-occlusion-intensity': 0.3,
    'fill-extrusion-ambient-occlusion-radius': 2.0
  }});
  // ── Linii distante intre cladiri ─────────────────────────────────────────
  L({id:'dist-line',type:'line',source:'dist-src',
    paint:{
      'line-color':['case',
        ['==',['get','type'],'between_own'],'#f59e0b',
        ['==',['get','ok'],true],'#34d399',
        '#ef4444'
      ],
      'line-width':2,
      'line-dasharray':[5,3],
      'line-opacity':0.9
    }
  });
  L({id:'dist-label',type:'symbol',source:'dist-src',
    layout:{
      'text-field':['get','label'],
      'text-size':['interpolate',['linear'],['zoom'],13,12,15,14,17,16,19,18],
      'text-font':['Open Sans Bold','Arial Unicode MS Bold'],
      'text-anchor':'center',
      'symbol-placement':'line-center',
      'text-allow-overlap':true,
      'text-ignore-placement':true
    },
    paint:{
      'text-color':['case',
        ['==',['get','type'],'between_own'],'#fbbf24',
        ['==',['get','ok'],true],'#34d399',
        '#f87171'
      ],
      'text-halo-color':'rgba(0,0,0,.98)',
      'text-halo-width':3.5
    }
  });
  // ── Etichete cladiri context (inaltime + functiune) ─────────────────────
  L({id:'ctx-height-label',type:'symbol',source:'ctx-labels-src',
    minzoom:17,
    filter:['any',['all',['has','h'],['>', ['to-number',['get','h'],0], 10]], ['!=', ['coalesce',['get','fn_label'],'Necunoscut'], 'Necunoscut']],
    layout:{
      'text-field':['concat',['get','h_label'],' | ',['get','fn_label']],
      'text-size':11,
      'text-font':['DIN Offc Pro Bold','Arial Unicode MS Bold'],
      'text-anchor':'center',
      'text-allow-overlap':false,
      'text-ignore-placement':false,
      'symbol-placement':'point'
    },
    paint:{
      'text-color':['coalesce',['get','col'],'#e2e8f0'],
      'text-halo-color':'rgba(0,0,0,.9)',
      'text-halo-width':1.5,
      'text-opacity':0.95
    }
  });
  L({id:'vol-3d',type:'fill-extrusion',source:'vol-src',paint:{
    'fill-extrusion-color':['coalesce',['get','color'],'#f59e0b'],
    'fill-extrusion-height':['coalesce',['get','top'],9],
    'fill-extrusion-base':['coalesce',['get','base'],0],
    'fill-extrusion-opacity': 0.93,
    'fill-extrusion-vertical-gradient': true,
    'fill-extrusion-ambient-occlusion-intensity': 0.4,
    'fill-extrusion-ambient-occlusion-radius': 3.0
  }});

  // AEDIS outline — fante clare pe marginile volumului propus
  L({id:'vol-3d-outline',type:'line',source:'vol-src',
    filter:['all',['boolean',['get','isAedis'],false],['==',['coalesce',['get','floor'],0],0]],
    paint:{
      'line-color':['coalesce',['get','color'],'#3b82f6'],
      'line-width':['interpolate',['linear'],['zoom'],14,0.5,18,2,20,3],
      'line-opacity':0.6
    }
  });

  if(map._ux) return; map._ux=true;
  map.on('click','ctx-3d',e=>{
    const f=e.features?.[0];if(!f)return;
    // FIX: block generic handler for this click
    S._skipMapClick=true;
    requestAnimationFrame(()=>{S._skipMapClick=false;});
    const h=f.properties.h,lv=f.properties.lv,fn=f.properties.fn||'yes';
    const col=BLD_COL?.[fn]||'#8a9ab0';
    const lbl=(typeof BLD_LABELS!=='undefined'&&BLD_LABELS?.[fn])||fn;
    const dot=`<span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${col};margin-right:5px;vertical-align:middle"></span>`;
    popup(`<b>🏢 Clădire existentă</b><br>${dot}<b>${esc(lbl)}</b><br>Înălțime: <b>${h?Math.round(h)+'m':'nedefinit'}</b>${lv?'<br>Niveluri: <b>'+(lv)+' et.</b>':''}<br><small style="color:#64748b">Sursă: OpenStreetMap</small>`,e.lngLat);
  });
  map.on('click','vol-3d',e=>{
    const f=e.features?.[0];if(!f)return;
    // FIX: block generic handler for this click
    S._skipMapClick=true;
    requestAnimationFrame(()=>{S._skipMapClick=false;});
    const fl=f.properties.floor,pi=f.properties.parcelIdx;
    const p=S.parcels[pi]||S.parcels[0];
    const label=fl===-1?'Terasă':(fl===0?'Parter':'Etaj '+fl);
    const base=Number(f.properties.base||0),top=Number(f.properties.top||0);
    popup(`<b>🏗 ${label}</b><br>${p?`Parcelă: <b>${esc(p.nrcad||'-')}</b><br>`:''}Cotă: <b>${base.toFixed(1)}m → ${top.toFixed(1)}m</b><br><small style="color:#64748b">Click X sau ESC pentru a închide</small>`,e.lngLat);
  });
  map.on('mouseenter','ctx-3d',()=>map.getCanvas().style.cursor='crosshair');
  map.on('mouseleave','ctx-3d',()=>map.getCanvas().style.cursor='');
  map.on('mouseenter','vol-3d',()=>map.getCanvas().style.cursor='pointer');
  map.on('mouseleave','vol-3d',()=>map.getCanvas().style.cursor='');
  map.on('mouseenter','parcel-fill',()=>map.getCanvas().style.cursor='pointer');
  map.on('mouseleave','parcel-fill',()=>map.getCanvas().style.cursor='');

  // ── Click pe latura parcelei → setează frontul stradal ──────────────────
  map.on('mouseenter','front-parcel-click',(e)=>{
    map.getCanvas().style.cursor='crosshair';
    if(!e.features?.length) return;
    const role = e.features[0].properties?.role;
    const roleLabel = role==='front'?'FRONT (stradă)':role==='posterior'?'SPATE':role==='lateral_stg'?'LATERAL stânga':'LATERAL dreapta';
    ss('🖱 Click pe această latură (' + roleLabel + ') pentru a seta ca FRONT STRADAL');
  });
  map.on('mouseleave','front-parcel-click',()=>{
    map.getCanvas().style.cursor='';
  });
  // Handler pe ambele layere pentru siguranta
  function _handleSideClick(e){
    const feats = map.queryRenderedFeatures(e.point, {layers:['front-parcel-click','front-parcel-line']});
    if(!feats?.length) return;
    const feat = feats.find(f=>f.properties?.type==='parcel_side');
    if(!feat) return;
    e.preventDefault && e.preventDefault();
    if(e.stopPropagation) e.stopPropagation();

    const props = feat.properties;
    const ap = S.parcels[S.activeParcel??0];
    if(!ap?.geo?.geometry) return;

    const ring = ap.geo.geometry.type==='Polygon'
      ? ap.geo.geometry.coordinates[0]
      : ap.geo.geometry.coordinates[0][0];
    const cx = ring.reduce((s,c)=>s+c[0],0)/ring.length;
    const cy2 = ring.reduce((s,c)=>s+c[1],0)/ring.length;
    const midX = props.midX ?? e.lngLat.lng;
    const midY = props.midY ?? e.lngLat.lat;
    const dLng = (midX - cx) * Math.cos(cy2 * Math.PI/180);
    const dLat = midY - cy2;
    const newBrg = Math.round((Math.atan2(dLng, dLat) * 180/Math.PI + 360) % 360);

    S.bearing = newBrg;
    const bearingEl = document.getElementById('bearing-slider');
    if(bearingEl){ bearingEl.value=newBrg; bearingEl.dispatchEvent(new Event('input')); }
    const bearingVal = document.getElementById('bearing-value');
    if(bearingVal) bearingVal.textContent = newBrg + '°';

    updateMap();
    if(S.vol.genDone){
      const f2 = buildVolume();
      setSource('vol-src',{type:'FeatureCollection',features:f2});
    }

    let toast = document.getElementById('front-toast');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'front-toast';
      toast.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);'+
        'background:rgba(212,175,55,0.97);color:#0e1828;font-weight:800;font-size:15px;'+
        'padding:12px 24px;border-radius:28px;z-index:9999;pointer-events:none;'+
        'box-shadow:0 4px 24px rgba(0,0,0,.6);transition:opacity .4s';
      document.body.appendChild(toast);
    }
    toast.textContent = '✅ Front stradal: ' + newBrg + '°';
    toast.style.opacity='1';
    clearTimeout(toast._t);
    toast._t = setTimeout(()=>{ toast.style.opacity='0'; }, 2500);
    ss('✅ Front stradal setat → ' + newBrg + '°');
  }

  map.on('click','front-parcel-click', _handleSideClick);
  map.on('click','front-parcel-line', _handleSideClick);
  // Touch fallback pentru mobile (touchend = tap fără scroll)
  map.on('touchend','front-parcel-click', _handleSideClick);
  map.on('touchend','front-parcel-line', _handleSideClick);
  // Afișăm mesaj persistent pe mobile (nu există hover)
  if('ontouchstart' in window){
    setTimeout(()=>{
      const ap0 = S.parcels[S.activeParcel??0];
      if(ap0?.geo?.geometry) ss('👆 Tap pe o latură colorată a parcelei pentru a seta FRONT STRADAL');
    }, 800);
  }
  map.on('click','parcel-fill',e=>{
    const f=e.features?.[0];if(!f)return;
    // FIX: block generic handler for this click
    S._skipMapClick=true;
    requestAnimationFrame(()=>{S._skipMapClick=false;});
    // Dacă e click pe o parcelă din zona vizibilă (doLoadLocalParcels)
    // o selectăm ca teren activ
    if(f.geometry){
      const area = Math.round(turf.area({type:'Feature',geometry:f.geometry,properties:{}}));
      const nrcad = f.properties?.nrcad||f.properties?.EntityHandle||f.properties?.NR_CAD||'—';
      const utr = resolveUTR(f.properties?.utr||'')||lookupUTR(e.lngLat.lng,e.lngLat.lat)||'';
      const parcelObj = {
        geo:{type:'Feature',geometry:f.geometry,properties:f.properties},
        nrcad, utr, area, source:'cadastru',
        params: getDefaultParams(utr)
      };
      
      if(S.multiMode){
        // MULTISELECT: adaugam la lista (fara duplicate)
        const isDup = nrcad && nrcad!=='—' && S.parcels.some(p=>p.nrcad===nrcad);
        if(isDup){
          ss('ℹ️ Parcela '+nrcad+' este deja selectată.');
          return;
        }
        S.parcels.push(parcelObj);
        S.activeParcel=S.parcels.length-1;
        ss('✅ Adăugată parcela '+nrcad+' | Total: '+S.parcels.length+' parcele');
        updateMap();
        renderAll();
        // Tab Multi pe desktop
        if(window.innerWidth>840){
          const tabM=document.getElementById('tab-multi');
          if(tabM){ document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
            tabM.classList.add('active'); S.tab='multi';
            const tc=document.getElementById('tc-multi');
            if(tc) tc.innerHTML=getContent('multi');
          }
        }
        try{const bb=turf.bbox(parcelObj.geo);map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:80,maxZoom:19,duration:400});}catch(er){}
      } else {
        // SINGLE SELECT: inlocuim
        S.parcels=[parcelObj]; S.activeParcel=0;
        S.utr=utr; S.rule=REGULI[utr]||{};
        S.ctx=null; S.vol.genDone=false;
        clearSource('vol-src'); clearSource('ctx-src');
        try{const bb=turf.bbox(parcelObj.geo);map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:100,maxZoom:19,duration:600});}catch(er){}
        ss('✅ Parcelă '+nrcad+' | UTR: '+(utr||'—')+' | '+area+' m²');
      // Mobile: deschidem automat tab Proiect
      if(window.innerWidth<=840){
        S.tab='proiect';
        const sh=_g('mob-sheet'), mb=_g('mob-body');
        if(sh&&mb){mb.innerHTML=getContent('proiect');sh.classList.add('open');
          document.querySelectorAll('.mnav-btn').forEach(b=>b.classList.toggle('active',b.dataset.mt==='proiect'));}
      }
      }
      
      const isApprox = f.properties?.approx;
      let popupLngLat = e.lngLat;
      try {
        const ctr = turf.centerOfMass(parcelObj.geo);
        if(ctr?.geometry?.coordinates) popupLngLat = {lng: ctr.geometry.coordinates[0], lat: ctr.geometry.coordinates[1]};
      } catch(er) {}
      popup('<b>'+(S.multiMode?'➕ Adăugată':isApprox?'⚠️ Aproximativ':'✅ Selectată')+'</b><br>Cad: <b>'+nrcad+'</b><br>UTR: <b>'+(utr||'—')+'</b><br>Suprafață: <b>'+area+' m²</b>',popupLngLat);
      updateMap(); renderAll();
      if(!S.multiMode) loadContext();
      
      // ── Auto-detect front stradal dupa selectare parcela ─────────────────
      if(!S.multiMode && parcelObj?.geo?.geometry){
        setTimeout(async ()=>{
          try{
            const brg = await detectRoadFront(parcelObj.geo);
            if(brg !== null){
              S.bearing = brg;
              // Detectam daca e parcela de colt (2 fronturi)
              const ring2 = parcelObj.geo.geometry.type==='Polygon'
                ? parcelObj.geo.geometry.coordinates[0]
                : parcelObj.geo.geometry.coordinates[0][0];
              const cx2 = ring2.reduce((s,c)=>s+c[0],0)/ring2.length;
              const cy3 = ring2.reduce((s,c)=>s+c[1],0)/ring2.length;
              const mLng2 = 111320*Math.cos(cy3*Math.PI/180);
              // Calculam distante laturi la strada
              const center2 = turf.centerOfMass(parcelObj.geo).geometry.coordinates;
              // Detectam numarul de fronturi din frontSides
              // (reutilizam logica din detectRoadFront - deja rulat mai sus)
              // Simplu: daca parcela are unghi la strada, setam 2 fete
              const q2 = `[out:json][timeout:6];(way["highway"~"residential|secondary|tertiary|primary|unclassified"](around:80,${cy3},${cx2}););out geom;`;
              try{
                const r2 = await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:q2,signal:AbortSignal.timeout(6000)});
                if(r2.ok){
                  const j2 = await r2.json();
                  const roads2 = (j2.elements||[]).filter(el=>el.geometry?.length>=2);
                  if(roads2.length >= 2){
                    // Doua strazi distincte langa parcela = colț
                    const sideDists2 = [];
                    for(let i=0;i<ring2.length-1;i++){
                      const pm1=ring2[i],pm2=ring2[i+1];
                      const mx2=(pm1[0]+pm2[0])/2, my2=(pm1[1]+pm2[1])/2;
                      let minD2=Infinity;
                      for(const road of roads2){
                        try{
                          const np2=turf.nearestPointOnLine({type:'Feature',geometry:{type:'LineString',coordinates:road.geometry.map(p=>[p.lon,p.lat])},properties:{}},turf.point([mx2,my2]));
                          const dM2=turf.distance(turf.point([mx2,my2]),np2,{units:'meters'});
                          if(dM2<minD2)minD2=dM2;
                        }catch(e){}
                      }
                      sideDists2.push(minD2);
                    }
                    const minD2=Math.min(...sideDists2);
                    const frontCount2=sideDists2.filter(d=>d<=minD2*1.8).length;
                    if(frontCount2>=2){
                      S.vol.frontCount=2;
                    } else {
                      S.vol.frontCount=1;
                    }
                  }
                }
              }catch(e2){}
              
              // Actualizam slider bearing in UI
              document.querySelectorAll('input[type=range]').forEach(el=>{
                if(el.id==='bearing-slider'||el.oninput?.toString().includes('S.bearing')){
                  el.value=brg; el.dispatchEvent(new Event('input'));
                }
              });
              const bv=document.getElementById('bearing-value');
              if(bv) bv.textContent=brg+'°';
              updateMap();
              renderAll();
              ss('🧭 Front detectat automat: '+brg+'°'+(S.vol.frontCount===2?' · Parcelă de colț':''));
            }
          }catch(e){}
        }, 800); // delay mic sa se incarce contextul mai intai
      }
    } else {
      const idx=parseInt(f.properties.pidx||'0');
      if(idx<S.parcels.length){S.activeParcel=idx;renderAll();}
    }
  });
}

map.on('load',()=>{
  addLayers();
  loadData();
  // Curățăm demolish-mask la reload (nu persistă între sesiuni dar stilul poate)
  setTimeout(()=>{
    try{
      if(map.getLayer('demolish-mask')) map.removeLayer('demolish-mask');
      if(map.getSource('demolish-mask-src')) map.removeSource('demolish-mask-src');
    }catch(e){}
  }, 500);
});
map.on('error',(e)=>{
  const msg = e.error?.message||'';
  if(msg.includes('does not exist in the map') || msg.includes('No such layer')) return;
  console.error('Mapbox error:',e);
  ss('⚠️ Eroare hartă: '+msg);
});
// Fallback: dacă load nu s-a apelat în 10s, încercăm oricum
setTimeout(()=>{
  if(!S.pug && !S._dataLoading){
    console.warn('Map load timeout - trying anyway');
    try{addLayers();}catch(e){}
    loadData();
  }
},10000);
;
map.on('style.load',()=>setTimeout(()=>{
  addLayers();
  updateMap();
  // Restaurăm sursele după orice schimbare de stil (inclusiv shortcut-urile din nav)
  if(S.ctx?.features?.length) try{setSource('ctx-src',S.ctx);}catch(e){}
  if(S.vol._lastFeats?.length) try{setSource('vol-src',{type:'FeatureCollection',features:S.vol._lastFeats});}catch(e){}
  if(S.vol._lastDistFeats?.length) try{setSource('dist-src',{type:'FeatureCollection',features:S.vol._lastDistFeats});}catch(e){}
  const _ctxVis = !S.vol.onlyVol && S.vol.scenariuConstructie !== 'liber' && AEDIS.scenariu!=='demolare' && !AEDIS._demolishActive;
  try{map.setLayoutProperty('ctx-3d','visibility',_ctxVis?'visible':'none');}catch(e){}
},250));

// CLICK pe hartă → DOAR selectează (NU generează volum automat)
// FIX MULTISELECT: Mapbox GL fires layer handlers THEN generic handler in same tick
// Use a synchronous flag reset via requestAnimationFrame
map.on('click',e=>{
  if(S._skipMapClick){return;}
  const lyrs=map.queryRenderedFeatures(e.point,{layers:['ctx-3d','vol-3d','parcel-fill','utr-fill']});
  if(!lyrs.length && S.popup){S.popup.remove();S.popup=null;}
  if(lyrs.length) return;
  onMapClick(e.lngLat.lat,e.lngLat.lng);
});

map.on('dblclick',e=>{
  const coordStr=`${e.lngLat.lat.toFixed(6)}, ${e.lngLat.lng.toFixed(6)}`;
  S._lastCoord=coordStr;
  document.querySelectorAll('#inp-coord').forEach(el=>el.value=coordStr);
  e.preventDefault();
});
map.on('pitch',()=>{const p=Math.round(map.getPitch());_g('pitchV').textContent=p+'°';_g('slPitch').value=p;});
map.on('rotate',()=>{const b=((Math.round(map.getBearing())%360)+360)%360;_g('bearV').textContent=b+'°';_g('slBearing').value=b;});

// ═══ CLICK HARTĂ ══════════════════════════════════════════════════════════
// onMapClick: click direct pe harta (nu din geocoding)
// Foloseste goToLocation care cauta parcela din date locale
async function onMapClick(lat,lng){
  // Daca avem parcele locale incarcate -> comportament normal (selectie rapida)
  if(S.cadHasPolygons && S.cadData?.features?.length){
    // Parcela va fi selectata din handler-ul parcel-fill click
    // Dar daca s-a ajuns aici = click pe zona fara parcela vizibila
    goToLocation(lat, lng, lat.toFixed(5)+', '+lng.toFixed(5));
    return;
  }
  // Fara parcele locale: folosim goToLocation (incarca zona + gaseste parcela)
  goToLocation(lat, lng, lat.toFixed(5)+', '+lng.toFixed(5));
}


function getDefaultParams(utr){
  const r=REGULI[utr]||{};
  // rl = aliniament lateral stânga, rr = lateral dreapta (implicit = rl)
  return {pot:r.pot,cut:r.cut,niv:r.niv,h:r.h,rf:r.rf,rl:r.rl,rr:r.rl,rs:r.rs,sv:r.sv,pk:r.pk};
}

// ═══ UTR LOOKUP ═══════════════════════════════════════════════════════════
function lookupUTR(lng,lat){
  if(!S.pugIdx.length)return'';
  const pt=turf.point([lng,lat]);
  for(const{utr,geom,bb}of S.pugIdx){
    if(lng<bb[0]||lng>bb[2]||lat<bb[1]||lat>bb[3])continue;
    try{if(turf.booleanPointInPolygon(pt,{type:'Feature',geometry:geom,properties:{}}))return utr;}catch(e){}
  }
  return'';
}

function findNearest(lat,lng,maxM){
  const pt=turf.point([lng,lat]);
  
  // PASUL 0: Dacă avem poligoane (din zona încărcată), verificăm contain exact
  if(S.cadHasPolygons && S.cadData?.features?.length){
    for(const f of S.cadData.features){
      if(f.geometry?.type==='Polygon'){
        try{ if(turf.booleanPointInPolygon(pt,f)) return f; }catch(e){}
      }
    }
    // Nu e în nicio parcelă din zona curentă → returnăm null
    return null;
  }
  
  // PASUL 0b: Dacă avem indexul (nrcad → punct centroid)
  // Găsim cel mai apropiat centroid din index în raza maxM
  if(S.cadIdx?.size > 0){
    let best=null, bestD=Infinity;
    S.cadIdx.forEach((f)=>{
      if(f.geometry?.type==='Point'){
        try{
          const d=turf.distance(pt,turf.point(f.geometry.coordinates),{units:'meters'});
          if(d<bestD && d<maxM){ bestD=d; best=f; }
        }catch(e){}
      }
    });
    return best; // Returnează feature cu proprietatea nrcad
  }
  
  if(!S.cadData?.features?.length) return null;
  
  // PASUL 1 (fallback pentru date vechi cu puncte): Verificăm parcelele vizibile
  const visibleFeats = (() => {
    try{
      const src = map.getSource('parcel-src');
      if(src && src._data?.features?.length) return src._data.features;
    }catch(e){}
    return null;
  })();
  
  const featsToSearch = visibleFeats || S.cadData.features;
  
  // PASUL 2: Căutăm parcela care conține punctul
  for(const f of featsToSearch){
    if(!f.geometry) continue;
    try{
      if(f.geometry.type==='Polygon'||f.geometry.type==='MultiPolygon'){
        if(turf.booleanPointInPolygon(pt,f)) return f;
      } else if(f.geometry.type==='Point'){
        const d=turf.distance(pt,turf.point(f.geometry.coordinates),{units:'meters'});
        if(d<maxM) return f;
      }
    }catch(e){}
  }
  
  // PASUL 3: Dacă nu am găsit, returnăm cea mai apropiată din features vizibile
  if(visibleFeats?.length){
    let best=null, bestD=Infinity;
    for(const f of visibleFeats){
      try{
        const coords = f.geometry?.coordinates?.[0]?.[0] || f.geometry?.coordinates;
        if(!coords) continue;
        const d = Math.sqrt(Math.pow(lng-coords[0],2)+Math.pow(lat-coords[1],2));
        if(d<bestD){best=f;bestD=d;}
      }catch(e){}
    }
    return best;
  }
  return null;
}


// ═══ buildFrontLayer — Vizualizare Aliniamente pe Hartă ══════════════════
// Generează features pentru: laturi colorate + linii retragere + etichete
function buildFrontLayer(parcelGeo, fp, params, bearing){
  if(!parcelGeo?.geometry) return {type:'FeatureCollection',features:[]};
  
  const features = [];
  const brg = bearing || 0;
  const p = params || {};
  const rf = Math.max(0, pN(p.rf)||0);
  const rl = Math.max(0, pN(p.rl)||0);
  const rr = Math.max(0, pN(p.rr)??pN(p.rl)??0);
  const rs = Math.max(0, pN(p.rs)||0);
  
  try {
    const ring = parcelGeo.geometry.type === 'Polygon' 
      ? parcelGeo.geometry.coordinates[0]
      : parcelGeo.geometry.coordinates[0][0]; // MultiPolygon fallback
    
    if(!ring || ring.length < 3) return {type:'FeatureCollection',features:[]};
    
    // Calculăm centrul parcelei
    const cx = ring.reduce((s,c)=>s+c[0],0)/ring.length;
    const cy = ring.reduce((s,c)=>s+c[1],0)/ring.length;
    const center = [cx, cy];
    
    // Identificăm laturile parcelei
    const sides = [];
    for(let i = 0; i < ring.length-1; i++){
      const p1 = ring[i], p2 = ring[i+1];
      const midX = (p1[0]+p2[0])/2;
      const midY = (p1[1]+p2[1])/2;
      
      // Bearing-ul laturii (direcția laturii)
      const dLng = p2[0]-p1[0], dLat = p2[1]-p1[1];
      const sideBrg = (Math.atan2(dLng, dLat)*180/Math.PI + 360) % 360;
      
      // Lungimea laturii în metri
      const latMid = (p1[1]+p2[1])/2;
      const mLng = 111320*Math.cos(latMid*Math.PI/180);
      const mLat = 111320;
      const lenM = Math.sqrt((dLng*mLng)**2 + (dLat*mLat)**2);
      
      // Bearing de la centrul parcelei spre mijlocul laturii (compass: N=0, E=90, S=180, V=270)
      const dLngC = (midX - cx) * Math.cos(cy * Math.PI/180); // scalat cu cos(lat)
      const dLatC = midY - cy;
      const dFromCenter = (Math.atan2(dLngC, dLatC) * 180/Math.PI + 360) % 360;
      
      // Diferenta fata de bearing-ul frontului
      let diff = ((dFromCenter - brg) + 360) % 360;
      if(diff > 180) diff = 360 - diff; // normalizam la 0-180
      
      let role, color, setback, setbackLabel;
      if(diff < 55){
        // Latura orientată spre strada principală = FRONT
        role = 'front'; color = '#FFD700'; setback = rf;  // galben auriu intens
        setbackLabel = rf > 0 ? `rf=${rf}m` : 'calcan';
      } else if(diff > 125){
        // Latura opusă frontului = POSTERIOR (spate)
        role = 'posterior'; color = '#FF4444'; setback = rs;  // rosu aprins
        setbackLabel = rs > 0 ? `rs=${rs}m` : 'calcan';
      } else {
        // Laturi laterale - stânga vs dreapta față de front
        // Vectorul de la centru la mijlocul laturii
        const vx = midX - cx, vy = midY - cy;
        // Vectorul frontului (direcția bearing din centru)
        const fx = Math.sin(brg*Math.PI/180), fy = Math.cos(brg*Math.PI/180);
        // Cross product: dacă pozitiv → stânga, negativ → dreapta
        const cross = fx*vy - fy*vx;
        if(cross > 0){
          role = 'lateral_stg'; color = '#60a5fa'; setback = rl;
          setbackLabel = rl > 0 ? `rl=${rl}m` : 'calcan';
        } else {
          role = 'lateral_dr'; color = '#a78bfa'; setback = rr;
          setbackLabel = rr > 0 ? `rr=${rr}m` : 'calcan';
        }
      }
      
      sides.push({p1, p2, midX, midY, sideBrg, lenM, diff});
    }
    
    // Parcela normala sau de colt: front = toate laturile cu diff < 70°
    const fc2 = S.vol?.frontCount||1;
    const FTHRESH = fc2>=3 ? 150 : fc2===2 ? 100 : 40;
    const PTHRESH = fc2>=2 ? 170 : 120;
    // La 1 fata: STRICT o singura latura (cea cu diff minim)
    const flFrontSet = new Set();
    if(fc2===1){
      const bestIdx = sides.reduce((bi,s,i)=>s.diff<sides[bi].diff?i:bi, 0);
      flFrontSet.add(bestIdx);
    } else {
      sides.forEach((s,i)=>{ if(s.diff<FTHRESH) flFrontSet.add(i); });
      if(flFrontSet.size===0) flFrontSet.add(sides.reduce((bi,s,i)=>s.diff<sides[bi].diff?i:bi, 0));
    }
    const flPostCands = sides.map((s,i)=>({...s,i})).filter(({diff,i})=>diff>=PTHRESH&&!flFrontSet.has(i));
    const flPostIdx = flPostCands.length>0
      ? flPostCands.reduce((a,b)=>a.diff>b.diff?a:b).i
      : sides.map((s,i)=>({...s,i})).filter(({i})=>!flFrontSet.has(i))
             .reduce((a,b)=>a&&a.diff>b.diff?a:b, null)?.i ?? 0;

    sides.forEach((side,si)=>{
      let role, color, setback, setbackLabel;
      if(flFrontSet.has(si)){
        role='front'; color='#FFD700'; setback=rf;
        setbackLabel=rf>0?`rf=${rf}m`:'calcan';
      } else if(si===flPostIdx){
        role='posterior'; color='#FF4444'; setback=rs;
        setbackLabel=rs>0?`rs=${rs}m`:'calcan';
      } else {
        const vx=(side.midX-cx)*111320*Math.cos(cy*Math.PI/180);
        const vy=(side.midY-cy)*111320;
        const fx=Math.sin(brg*Math.PI/180), fy=Math.cos(brg*Math.PI/180);
        const cross=fx*vy-fy*vx;
        if(cross>0){role='lateral_stg';color='#22D3EE';setback=rl;setbackLabel=rl>0?`rl=${rl}m`:'calcan';}  // cyan
        else{role='lateral_dr';color='#C084FC';setback=rr;setbackLabel=rr>0?`rr=${rr}m`:'calcan';}  // violet deschis
      }
      const dFromCenterSide = (Math.atan2((side.midX-cx)*Math.cos(cy*Math.PI/180),(side.midY-cy))*180/Math.PI+360)%360;
      Object.assign(side,{role,color,setback,setbackLabel,dFromCenter:dFromCenterSide});
    });
    
    // ── Desenăm laturile colorate ────────────────────────────────────────
    sides.forEach(side=>{
      features.push({
        type:'Feature',
        geometry:{type:'LineString', coordinates:[side.p1, side.p2]},
        properties:{type:'parcel_side', role:side.role, color:side.color,
          sideIdx:side.i, midX:side.midX, midY:side.midY, bearing:side.dFromCenter||0}
      });
      
      // ── Etichetă cu distanța aliniamentului ─────────────────────────
      const labelTxt = side.setback > 0 
        ? `${side.setback}m`
        : '|—|'; // calcan
      features.push({
        type:'Feature',
        geometry:{type:'Point', coordinates:[side.midX, side.midY]},
        properties:{
          type:'label',
          label:`${side.role==='front'?'FRONT':''}${side.role==='posterior'?'SPATE':''}${side.role==='lateral_stg'?'STG':''}${side.role==='lateral_dr'?'DR':''} ${labelTxt}`,
          color: side.color
        }
      });
    });
    
    // ── Săgeată direcție front (din centrul parcelei spre stradă) ───────
    const frontSide = sides.find(s=>s.role==='front');
    if(frontSide){
      // Plasăm săgeata pe mijlocul laturii frontale
      features.push({
        type:'Feature',
        geometry:{type:'Point', coordinates:[frontSide.midX, frontSide.midY]},
        properties:{type:'arrow', bearing: brg - 90, color:'#d4af37'}
        // -90 pentru că simbolul ▶ pointează spre dreapta în mod default
      });
    }
    
    // ── Linii de retragere (de la latură la footprint) ───────────────────
    if(fp?.geometry){
      const fpRing = fp.geometry.type === 'Polygon' 
        ? fp.geometry.coordinates[0]
        : fp.geometry.coordinates[0][0];
      
      if(fpRing){
        const fpCx = fpRing.reduce((s,c)=>s+c[0],0)/fpRing.length;
        const fpCy = fpRing.reduce((s,c)=>s+c[1],0)/fpRing.length;
        
        sides.forEach(side=>{
          if(side.setback <= 0) return; // calcan - nu desenăm linie
          
          // Linie perpendicualară de la mijlocul laturii spre footprint
          // Direcția = de la mijlocul laturii spre centrul fp
          const dx = fpCx - side.midX;
          const dy = fpCy - side.midY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if(dist < 0.0001) return;
          
          // Punct pe footprint în direcția normală
          const ratio = 0.7; // ajungem la ~70% din distanță
          const endX = side.midX + dx*ratio;
          const endY = side.midY + dy*ratio;
          
          features.push({
            type:'Feature',
            geometry:{type:'LineString', coordinates:[[side.midX, side.midY],[endX, endY]]},
            properties:{type:'setback', color:side.color}
          });
        });
      }
    }
    
  } catch(e) {
    console.warn('buildFrontLayer error:', e.message);
  }
  
  return {type:'FeatureCollection', features};
}
// ═══ UPDATE MAP SOURCES ════════════════════════════════════════════════════
function clearSource(id){const s=map.getSource(id);if(s)s.setData({type:'FeatureCollection',features:[]});}
function setSource(id,fc){const s=map.getSource(id);if(s)s.setData(fc||{type:'FeatureCollection',features:[]});}

function updateMap(){
  // Parcele selectate
  const pFeats=S.parcels.filter(p=>p.geo?.geometry).map((p,i)=>({
    ...p.geo,
    id:i,
    properties:{...p.geo.properties,pidx:i,
      fc:i===S.activeParcel?'#00e5b4':'#60a5fa',
      lc:i===S.activeParcel?'#00e5b4':'#3b82f6'}
  }));
  setSource('parcel-src',{type:'FeatureCollection',features:pFeats});

  // Fix #11: spatii verzi
  if(S.svZone?.geometry){
    setSource('sv-src',{type:'FeatureCollection',features:[S.svZone]});
  } else {
    try{clearSource('sv-src');}catch(e){}
  }
  
  // Footprint și aliniamente vizuale pentru parcela activă
  // Ascundem când lotizarea e activă (evită suprapunere cu labelurile loturilor)
  const ap=S.parcels[S.activeParcel??0];
  if(ap?.geo?.geometry && !_lotizareActive){
    const fp = buildFP(ap.geo.geometry, ap.params||ap.utr);
    if(fp?.geometry){
      setSource('fp-src',{type:'FeatureCollection',features:[fp]});
      const frontFC = buildFrontLayer(ap.geo, fp, ap.params||getDefaultParams(ap.utr), S.bearing);
      setSource('front-src', frontFC);
    } else {
      clearSource('fp-src');
      clearSource('front-src');
    }
  } else {
    clearSource('fp-src');
    clearSource('front-src');
  }
  // Vizibilitate layers front/setback — ascunse când lotizare e activă
  const _frontVis = !_lotizareActive;
  ['front-parcel-line','front-setback-line','front-label','front-arrow'].forEach(lid=>{
    try{map.setLayoutProperty(lid,'visibility',_frontVis?'visible':'none');}catch(e){}
  });

  // Context
  setSource('ctx-src',S.ctx);

  // Volum (dacă a fost generat)
  // Nu regenerăm automat - doar la apăsarea butonului
}

// ═══ FOOTPRINT & VOLUM ════════════════════════════════════════════════════
// ═══ buildFP — Suprafata Construibila cu Aliniamente Directionale ═════════
// Logica:
// 1. Bearing (S.bearing) defineste directia FRONTULUI (fata strazii)
//    bearing=0 → strada la Nord, bearing=90 → strada la Est etc.
// 2. rf = retragere fata (spre strada)
// 3. rl = retragere laterala stanga (relativ la front)
// 4. rr = retragere laterala dreapta
// 5. rs = retragere posterioara (spate)
// 6. Spatii verzi: procentul sv% din suprafata terenului este exclus
// 7. POT: limita maxima de acoperire
//
// ALINIAMENT = 0 → calcan (constructie pe limita proprietatii)
// ALINIAMENT > 0 → retragere minima obligatorie
// ═══ buildFP — Edificabil (Zonă Construibilă) ═══════════════════════════
// LOGICA CORECTA:
// Edificabilul urmărește CONTURUL PARCELEI, retras cu aliniamentele pe fiecare latură.
// Este ÎNTOTDEAUNA un singur poligon continuu, indiferent de forma terenului.
//
// METODA:
// 1. Identificăm rolul fiecărei laturi (front/posterior/lateral)
// 2. Translăm fiecare latură spre INTERIOR cu setback-ul corespunzător
// 3. Reconstruim poligonul din laturile translatate → edificabil continuu
// 4. Aplicăm POT dacă e depășit



function buildFP(geom, paramsOrUtr){
  if(!geom) return null;
  const p = typeof paramsOrUtr==='object' ? paramsOrUtr : getDefaultParams(paramsOrUtr);
  try{
    const pf = {type:'Feature', geometry:geom, properties:{}};
    const pA = turf.area(pf);
    if(pA < 1) return pf;

    const rf = Math.max(0, pN(p.rf)||0);
    const rl = Math.max(0, pN(p.rl)||0);
    const rr = Math.max(0, pN(p.rr)??pN(p.rl)??0);
    const rs = Math.max(0, pN(p.rs)||0);
    const sv = Math.max(0, Math.min(100, pN(p.sv)||0));
    const brg = S.bearing || 0;

    // POT efectiv (redus de SV)
    const pot = pN(p.pot);
    const pot_ef = pot > 0 ? Math.min(pot, 100-sv) : 100-sv;
    const SC_max = pA * pot_ef / 100;

    // Inelul parcelei
    const ring = geom.type==='Polygon'
      ? geom.coordinates[0]
      : geom.coordinates[0][0];
    if(!ring||ring.length<3) return pf;

    const cx = ring.reduce((s,c)=>s+c[0],0)/ring.length;
    const cy = ring.reduce((s,c)=>s+c[1],0)/ring.length;
    const mLng = 111320*Math.cos(cy*Math.PI/180);
    const mLat = 111320;

    // ── Determinam rolul fiecarei laturi ─────────────────────────────────
    const fc = S.vol?.frontCount||1;
    const FTHRESH = fc>=3 ? 150 : fc===2 ? 100 : 40;

    const sides = [];
    for(let i=0;i<ring.length-1;i++){
      const p1=ring[i], p2=ring[i+1];
      const mx=(p1[0]+p2[0])/2, my=(p1[1]+p2[1])/2;
      const dLn=(mx-cx)*mLng, dLt=(my-cy)*mLat;
      const dir=(Math.atan2(dLn,dLt)*180/Math.PI+360)%360;
      let diff=((dir-brg)+360)%360;
      if(diff>180)diff=360-diff;
      sides.push({i,diff,p1,p2,mx,my});
    }

    // Front = laturi cu diff < FTHRESH; posterior = latura cu max diff (non-front)
    // La 1 fata: STRICT o singura latura - cea cu diff minim
    const frontSet = new Set();
    if(fc===1){
      frontSet.add(sides.reduce((a,b)=>a.diff<b.diff?a:b).i);
    } else {
      sides.filter(s=>s.diff<FTHRESH).forEach(s=>frontSet.add(s.i));
      if(frontSet.size===0) frontSet.add(sides.reduce((a,b)=>a.diff<b.diff?a:b).i);
    }
    const nonFront = sides.filter(s=>!frontSet.has(s.i));
    const postIdx = nonFront.length>0
      ? nonFront.reduce((a,b)=>a.diff>b.diff?a:b).i : -1;

    // ── Edificabil = parcela minus retrageri ─────────────────────────────
    // METODA ROBUSTA: buffer negativ uniform cu valoarea minima,
    // plus difference pentru laturile cu setback mai mare.
    // Buffer negativ functioneaza corect pe orice forma de parcela.

    // Calculam setback-ul per latura
    const sideSetbacks = sides.map(side => {
      if(S.vol.perSideMode && S.vol.sideSetbacks && side.i in S.vol.sideSetbacks){
        return Math.max(0, Number(S.vol.sideSetbacks[side.i])||0);
      }
      if(frontSet.has(side.i)) return rf;
      if(side.i===postIdx) return rs;
      const vx=(side.mx-cx)*mLng, vy=(side.my-cy)*mLat;
      const fx=Math.sin(brg*Math.PI/180), fy=Math.cos(brg*Math.PI/180);
      return (fx*vy-fy*vx)>0 ? rl : rr;
    });

    const allCalcanCheck = sideSetbacks.every(s=>s===0);
    let zone = {type:'Feature', geometry:geom, properties:{}};

    if(!allCalcanCheck){
      // PASUL 1: buffer negativ cu valoarea minima (cel mai mic setback > 0)
      const minSb = Math.min(...sideSetbacks.filter(s=>s>0));
      if(minSb > 0){
        try{
          const buf = turf.buffer(zone, -minSb, {units:'meters'});
          if(buf?.geometry && turf.area(buf) > pA*0.01) zone = buf;
        }catch(e){ console.warn('buffer negativ esuat:', e.message); }
      }

      // PASUL 2: pentru laturile cu setback > minSb, aplicam difference suplimentar
      for(let si=0; si<sides.length; si++){
        const side = sides[si];
        const sb = sideSetbacks[si];
        const extraSb = sb - minSb;
        if(extraSb <= 0.1) continue; // deja acoperit de buffer

        try{
          const {p1,p2} = side;
          const dx=(p2[0]-p1[0])*mLng, dy=(p2[1]-p1[1])*mLat;
          const len=Math.sqrt(dx*dx+dy*dy);
          if(len<0.01) continue;
          let nx=-dy/len, ny=dx/len;
          if(nx*(cx-p1[0])*mLng + ny*(cy-p1[1])*mLat < 0){nx=-nx;ny=-ny;}
          // Banda suplimentara (diferenta de setback)
          const sbx=nx*sb/mLng, sby=ny*sb/mLat;
          const ext=0.001;
          const ux=(p2[0]-p1[0])/(len/mLng)*ext;
          const uy=(p2[1]-p1[1])/(len/mLat)*ext;
          const band={type:'Feature',geometry:{type:'Polygon',coordinates:[[
            [p1[0]-ux, p1[1]-uy],
            [p2[0]+ux, p2[1]+uy],
            [p2[0]+ux+sbx, p2[1]+uy+sby],
            [p1[0]-ux+sbx, p1[1]-uy+sby],
            [p1[0]-ux, p1[1]-uy]
          ]]},properties:{}};
          const diff = turf.difference(zone, band);
          if(diff?.geometry){
            const tp = diff.geometry.type;
            if(tp==='Polygon'){
              if(turf.area(diff)>pA*0.01) zone=diff;
            } else if(tp==='MultiPolygon'){
              const biggest = diff.geometry.coordinates.reduce((a,b)=>{
                const fa={type:'Feature',geometry:{type:'Polygon',coordinates:a},properties:{}};
                const fb={type:'Feature',geometry:{type:'Polygon',coordinates:b},properties:{}};
                return turf.area(fa)>=turf.area(fb)?a:b;
              });
              const bigFeat={type:'Feature',geometry:{type:'Polygon',coordinates:biggest},properties:{}};
              if(turf.area(bigFeat)>pA*0.01) zone=bigFeat;
            }
          }
        }catch(e){}
      }
    }

    // ── POT: daca edificabilul depaseste SC_max, scalare centrica ─────────
    // DAR: daca toate aliniamentele sunt 0 (calcan complet), edificabilul = intreaga parcela
    const allCalcan = allCalcanCheck;
    const zA = turf.area(zone);

    if(!allCalcan && SC_max>0 && SC_max<zA-1){
      const sf=Math.sqrt(SC_max/zA);
      try{
        const sc=turf.transformScale(zone,Math.max(0.05,sf),{origin:turf.centerOfMass(zone)});
        if(sc?.geometry&&turf.area(sc)>0.5) zone=sc;
      }catch(e){}
    }

    // ── Factor amprentă design (fpF) — nu aplicam daca aliniamente=0 ──────
    const fpF = allCalcan ? 1.0 : Math.max(0.5,Math.min(1,Number(S.vol.fpF||0.95)));
    if(fpF<0.98){
      try{
        const sc2=turf.transformScale(zone,fpF,{origin:turf.centerOfMass(zone)});
        if(sc2?.geometry&&turf.area(sc2)>0.5) zone=sc2;
      }catch(e){}
    }

    // ── Forma clădire: pătrat/dreptunghi/L/U/T/curte/bara ─────────────────
    if(AEDIS.forma && AEDIS.forma !== 'auto'){
      try{
        const bbox = turf.bbox(zone);
        const zCx = (bbox[0]+bbox[2])/2;
        const zCy = (bbox[1]+bbox[3])/2;
        const zA2 = turf.area(zone);
        const mLng2 = 111320*Math.cos(zCy*Math.PI/180);
        const mLat2 = 111320;
        const bboxW = (bbox[2]-bbox[0])*mLng2;
        const bboxH = (bbox[3]-bbox[1])*mLat2;
        const brg2 = (S.bearing||0)*Math.PI/180;
        const cosB=Math.cos(brg2), sinB=Math.sin(brg2);
        const ratio = Math.max(0.2, Math.min(0.5, AEDIS.formaRatio||0.35));
        const rot=([dx,dy])=>[zCx+(dx*cosB-dy*sinB)/mLng2, zCy+(dx*sinB+dy*cosB)/mLat2];
        const poly=(pts)=>({type:'Feature',geometry:{type:'Polygon',coordinates:[[...pts.map(rot),rot(pts[0])]]},properties:{}});
        let shapeFeat=null;
        const W=bboxW*0.9, H=bboxH*0.9;
        const hw=W/2, hh=H/2;
        const t=ratio;
        if(AEDIS.forma==='patrat'){
          const s=Math.min(Math.sqrt(zA2),W,H); const hs=s/2;
          shapeFeat=poly([[-hs,-hh],[hs,-hh],[hs,hh],[-hs,hh]]);
        }else if(AEDIS.forma==='dreptunghi'){
          shapeFeat=poly([[-hw,-hh],[hw,-hh],[hw,hh],[-hw,hh]]);
        }else if(AEDIS.forma==='bara'){
          const bw=Math.min(hw,hh*1.5), bh=Math.min(hh,hw/1.5)*0.4;
          shapeFeat=poly([[-bw,-bh],[bw,-bh],[bw,bh],[-bw,bh]]);
        }else if(AEDIS.forma==='L'){
          const tw=W*t, th=H*t;
          shapeFeat=poly([[-hw,-hh],[hw,-hh],[hw,-hh+th],[-hw+tw,-hh+th],[-hw+tw,hh],[-hw,hh]]);
        }else if(AEDIS.forma==='U'){
          const tw=W*t, th=H*t;
          shapeFeat={type:'Feature',geometry:{type:'Polygon',coordinates:[[
            rot([-hw,-hh]),rot([hw,-hh]),rot([hw,hh]),rot([hw-tw,hh]),rot([hw-tw,-hh+th]),
            rot([-hw+tw,-hh+th]),rot([-hw+tw,hh]),rot([-hw,hh]),rot([-hw,-hh])
          ]]},properties:{}};
        }else if(AEDIS.forma==='T'){
          const tw=W*t, th=H*t;
          shapeFeat=poly([[-hw,-hh],[hw,-hh],[hw,-hh+th],[tw/2,-hh+th],[tw/2,hh],[-tw/2,hh],[-tw/2,-hh+th],[-hw,-hh+th]]);
        }else if(AEDIS.forma==='curte'){
          const tw=W*t, th=H*t;
          const outer=[[-hw,-hh],[hw,-hh],[hw,hh],[-hw,hh],[-hw,-hh]];
          const inner=[[-(hw-tw),-(hh-th)],[hw-tw,-(hh-th)],[hw-tw,hh-th],[-(hw-tw),hh-th],[-(hw-tw),-(hh-th)]];
          shapeFeat={type:'Feature',geometry:{type:'Polygon',coordinates:[outer.map(rot),inner.map(rot).reverse()]},properties:{}};
        }
        if(shapeFeat?.geometry){
          const shapeArea=turf.area(shapeFeat);
          if(shapeArea<=zA2*3){
            try{
              const isct=turf.intersect(shapeFeat,zone);
              if(isct?.geometry&&turf.area(isct)>zA2*0.05) return isct;
            }catch(e3){}
            return shapeFeat;
          } // else: aria prea mare → fallback la zone
        }
      }catch(e2){ console.warn('buildFP forma error:', e2.message); }
    }


    // ── CLIP FINAL: edificabilul nu poate ieși niciodată din parcelă ─────────
    // transformScale, fpF și forma pot produce geometrii ușor în afara parcelei
    // Intersecția finală garantează respectarea limitei cadastrale
    try{
      const parcelFeat = {type:'Feature', geometry:geom, properties:{}};
      const clipped = turf.intersect(zone, parcelFeat);
      if(clipped?.geometry && turf.area(clipped) > pA * 0.02) zone = clipped;
    }catch(e){ console.warn('buildFP clip final:', e.message); }

    return zone;
  }catch(e){
    console.warn('buildFP error:',e.message);
    return {type:'Feature',geometry:geom,properties:{}};
  }
}


function checkCollisions(fp){
  if(!fp?.geometry) return {fp, collisions:0};
  // În scenariul Demolare, terenul e liber — nu verificăm coliziuni
  if(S.vol.scenariuConstructie === 'liber') return {fp, collisions:0};
  
  // Sursa 1: clădiri din contextul OSM (S.ctx)
  // Sursa 2: clădiri din stilul Mapbox (queryRenderedFeatures)
  const bldFeatures = [];
  
  // Din S.ctx dacă există
  if(S.ctx?.features?.length){
    bldFeatures.push(...S.ctx.features.filter(f=>f.geometry));
  }
  
  // Din hartă: clădirile vizibile pe layerul ctx-3d (au geometrie GeoJSON validă)
  try{
    const bb = turf.bbox(fp);
    const sw = map.project([bb[0],bb[1]]);
    const ne = map.project([bb[2],bb[3]]);
    const rendered = map.queryRenderedFeatures(
      [[Math.min(sw.x,ne.x)-5, Math.min(sw.y,ne.y)-5],
       [Math.max(sw.x,ne.x)+5, Math.max(sw.y,ne.y)+5]],
      {layers:['ctx-3d']}
    );
    // ctx-3d are geometrie GeoJSON validă
    rendered.forEach(f=>{
      if(f.geometry && f.geometry.type==='Polygon'){
        // Evităm duplicatele față de S.ctx
        if(!S.ctx?.features?.some(sf=>
          sf.geometry?.coordinates?.[0]?.[0]?.[0]===f.geometry?.coordinates?.[0]?.[0]?.[0]
        )) bldFeatures.push(f);
      }
    });
  }catch(e){}
  
  if(!bldFeatures.length) return {fp, collisions:0};
  
  let result = fp;
  let collisions = 0;
  const fpArea = turf.area(fp);
  
  for(const bld of bldFeatures){
    if(!bld.geometry) continue;
    try{
      // Verificăm suprapunerea
      const bldFeature = {type:'Feature', geometry:bld.geometry, properties:{}};
      let overlap;
      try{ overlap = turf.intersect(result, bldFeature); }catch(e){ continue; }
      
      if(overlap && turf.area(overlap) > 1){
        // Scădem clădirea din footprint
        let diff;
        try{ diff = turf.difference(result, bldFeature); }catch(e){ continue; }
        
        if(diff?.geometry){
          const diffArea = turf.area(diff);
          // Acceptăm diferența doar dacă rămâne suficientă suprafață (min 10mp)
          if(diffArea > 10){
            result = diff;
            collisions++;
          }
        }
      }
    }catch(e){}
  }
  
  return {fp: result, collisions};
}

// ═══ buildMultiVolume — Multiple Clădiri pe Edificabil ══════════════════
// Distribuie N cladiri pe zona edificabila, respectand:
// - distanta minima intre cladiri (S.vol.multiVolDist)
// - POT total (suma suprafetelor = max SC_max)
// - CUT (suma suprafetelor desfasurate)
// - Distanta fata de cladirile vecine (afisata pe harta)

function buildMultiVolume(p, fp, params, pi){
  const feats = [];
  if(!fp?.geometry) return feats;
  
  const pA = p.area||turf.area(p.geo);
  const hNiv = Number(S.vol.hNiv||3.0);
  const niv = pN(params.niv)||1;
  const totH = niv*hNiv;
  const n = S.vol.multiVolCount||2;
  const dist = S.vol.multiVolDist||6;
  // Forma: dacă e auto, preia din AEDIS.forma; altfel din setarea multiVolShape
  const shape = (S.vol.multiVolShape==='auto') ? (AEDIS.forma||'rect') : (S.vol.multiVolShape||'rect');
  const isDemo = S.vol.scenariuConstructie === 'liber';
  
  // Suprafata totala disponibila
  const fpArea = turf.area(fp);
  const distInDeg = dist/111320;
  
  // Bbox al edificabilului
  const bb = turf.bbox(fp);
  const W=bb[0], S2=bb[1], E=bb[2], N=bb[3];
  const wDeg = E-W, hDeg = N-S2;
  const wM = wDeg*111320*Math.cos(((S2+N)/2)*Math.PI/180);
  const hM = hDeg*111320;
  
  let cols = Math.ceil(Math.sqrt(n * wM/Math.max(1,hM)));
  let rows = Math.ceil(n/Math.max(1,cols));
  while(cols*rows < n) rows++;
  
  // Auto-reducere distanță dacă nu încap clădirile pe parcelă
  let distDegLng = dist/( 111320*Math.cos(((S2+N)/2)*Math.PI/180));
  let distDegLat = dist/111320;
  let cellW = (wDeg - distDegLng*(cols+1)) / cols;
  let cellH = (hDeg - distDegLat*(rows+1)) / rows;
  
  // Dacă nu încap, reducem distanța progresiv până funcționează
  if(cellW<=0||cellH<=0){
    for(let tryDist = dist*0.7; tryDist >= 1; tryDist -= 0.5){
      distDegLng = tryDist/(111320*Math.cos(((S2+N)/2)*Math.PI/180));
      distDegLat = tryDist/111320;
      cellW = (wDeg - distDegLng*(cols+1)) / cols;
      cellH = (hDeg - distDegLat*(rows+1)) / rows;
      if(cellW>0 && cellH>0) break;
    }
  }
  // Dacă tot nu încap, reducem nr de clădiri
  if(cellW<=0||cellH<=0){
    // Încearcă cu mai puțin coloane
    cols = 1; rows = n;
    distDegLng = dist/(111320*Math.cos(((S2+N)/2)*Math.PI/180));
    distDegLat = dist/111320;
    cellW = (wDeg - distDegLng*(cols+1)) / cols;
    cellH = (hDeg - distDegLat*(rows+1)) / rows;
  }
  if(cellW<=0||cellH<=0) return feats; // chiar nu încap
  
  const side = (shape==='square'||shape==='patrat') ? Math.min(cellW,cellH) : null;
  const ratio = Math.max(0.25, Math.min(0.5, AEDIS.formaRatio||0.35));
  
  let bldCount = 0;
  for(let r=0;r<rows&&bldCount<n;r++){
    for(let c=0;c<cols&&bldCount<n;c++){
      const bx = W + distDegLng*(c+1) + cellW*c;
      const by = S2 + distDegLat*(r+1) + cellH*r;
      const bw = side||cellW;
      const bh = side||cellH;
      const offsetX = side ? (cellW-side)/2 : 0;
      const offsetY = side ? (cellH-side)/2 : 0;
      const x0=bx+offsetX, y0=by+offsetY, x1=x0+bw, y1=y0+bh;
      const ax=bw*ratio, ay=bh*ratio; // dimensiuni aripi pentru L/U/T

      // Generăm geometria în funcție de formă
      let coords;
      if(shape==='L'){
        coords=[[x0,y0],[x1,y0],[x1,y0+ay],[x0+ax,y0+ay],[x0+ax,y1],[x0,y1],[x0,y0]];
      } else if(shape==='U'){
        coords=[[x0,y0],[x1,y0],[x1,y1],[x1-ax,y1],[x1-ax,y0+ay],[x0+ax,y0+ay],[x0+ax,y1],[x0,y1],[x0,y0]];
      } else if(shape==='T'){
        const tw=bw*0.35;
        coords=[[x0,y0],[x1,y0],[x1,y0+ay],[x0+(bw+tw)/2,y0+ay],[x0+(bw+tw)/2,y1],[x0+(bw-tw)/2,y1],[x0+(bw-tw)/2,y0+ay],[x0,y0+ay],[x0,y0]];
      } else if(shape==='bara'){
        const barW=bw*0.3;
        coords=[[x0+(bw-barW)/2,y0],[x0+(bw+barW)/2,y0],[x0+(bw+barW)/2,y1],[x0+(bw-barW)/2,y1],[x0+(bw-barW)/2,y0]];
      } else {
        // rect / dreptunghi / auto / default
        coords=[[x0,y0],[x1,y0],[x1,y1],[x0,y1],[x0,y0]];
      }
      
      const bldPoly = {type:'Feature',geometry:{type:'Polygon',coordinates:[coords]},properties:{}};
      
      try{
        let inter = turf.intersect(fp, bldPoly);
        if(!inter?.geometry||turf.area(inter)<5) continue;
        
        // În scenariul Demolare nu verificăm coliziuni cu existentele
        if(!isDemo && S.ctx?.features?.length){
          S.ctx.features.forEach(existing=>{
            if(!existing.geometry) return;
            try{
              const ov = turf.intersect(inter, {type:'Feature',geometry:existing.geometry,properties:{}});
              if(ov && turf.area(ov) > 1){
                const diff = turf.difference(inter, {type:'Feature',geometry:existing.geometry,properties:{}});
                if(diff?.geometry && turf.area(diff) > 5) inter = diff;
              }
            }catch(e){}
          });
        }
        
        for(let i=0;i<niv;i++){
          const base=i*hNiv, top=Math.min((i+1)*hNiv, totH);
          const color=FLOOR_COLORS[Math.min(i,FLOOR_COLORS.length-1)];
          feats.push({type:'Feature',properties:{base,top,color,floor:i,parcelIdx:pi,bldIdx:bldCount},geometry:inter.geometry});
        }
        bldCount++;
      }catch(e){}
    }
  }
  return feats;
}

// ═══ Vizualizare distante fata de cladirile direct adiacente ════════════
// Arata distanta de la fata exterioara a volumului generat
// pana la fata exterioara a cladirilor DIRECT ADIACENTE parcelei
// (nu centroid-centroid, ci cel mai scurt segment intre cele doua poligoane)

function updateDistanceLines(){
  if(!S.vol.genDone){
    try{clearSource('dist-src');}catch(e){}
    return;
  }
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry) return;

  const feats = [];
  const volFeats = S.vol._lastFeats || (map.getSource('vol-src')?._data?.features) || [];
  const parcelFeat = {type:'Feature',geometry:ap.geo.geometry,properties:{}};

  // Dacă S.ctx e gol (Overpass a eșuat), extragem din Mapbox cu raza extinsă
  if(!S.ctx?.features?.length){
    const c = turf.centerOfMass(parcelFeat).geometry.coordinates;
    // Raza 250m — suficientă pentru toate vecinătățile relevante
    const extracted = _ctxFromMapbox(c, Math.max(200, Number(S.vol.ctxR||250)));
    if(extracted.length){
      S.ctx = {type:'FeatureCollection', features:extracted};
      setSource('ctx-src', S.ctx);
      _ctxApplyLabels(extracted);
    }
  }
  const ctxFeats = S.ctx?.features||[];

  // Volumele generate - luam baza (floor=0) din TOATE parcelele
  // Excludem cladirile existente (floor=-1) si acoperisurile (floor<-1)
  const myBlds = {};
  volFeats.forEach(f=>{
    const fl = f.properties?.floor??0;
    if(fl !== 0) return; // doar parter (amprenta la sol)
    if(f.properties?.isExistent) return; // excludem existentele
    const pi = f.properties?.parcelIdx??0;
    const bi = f.properties?.bldIdx??0;
    const k = pi*100+bi;
    if(!myBlds[k]) myBlds[k]=f;
  });
  // Fallback: grupam dupa geometrie unica (fiecare geometrie diferita = cladire diferita)
  if(Object.keys(myBlds).length===0 && volFeats.length>0){
    // Luam DOAR etajele pozitive (nu acoperis floor<0, nu existente floor=-1)
    const pozitive = volFeats.filter(f=>((f.properties?.floor??0))>=0);
    if(pozitive.length===0){
      // Daca totul e acoperis, luam primul
      myBlds[0]=volFeats[0];
    } else {
      // Grupam dupa hash-ul primelor coordonate ale geometriei = identificam cladirile unice
      const geomGroups={};
      pozitive.forEach(f=>{
        const ring=f.geometry?.coordinates?.[0];
        if(!ring?.length) return;
        // Hash: primele 2 puncte rotunjite la 6 zecimale
        const hash=ring[0]?.map(v=>v.toFixed(5)).join(',')+':'+ring[1]?.map(v=>v.toFixed(5)).join(',');
        if(!geomGroups[hash]) geomGroups[hash]=f; // pastram primul etaj al fiecarei geometrii
      });
      Object.values(geomGroups).forEach((f,i)=>{ myBlds[i]=f; });
    }
  }
  const myBldArr = Object.values(myBlds);
  if(!myBldArr.length) return;

  // ── Distante intre volumele NOASTRE (orice nr de cladiri) ─────────────
  if(myBldArr.length>1){
    for(let i=0;i<myBldArr.length;i++){
      for(let j=i+1;j<myBldArr.length;j++){
        try{
          const {pt1,pt2,dist} = minDistBetweenPolygons(myBldArr[i],myBldArr[j]);
          if(!pt1||!pt2) continue;
          const minDist = S.vol.multiVolDist||6;
          feats.push({
            type:'Feature',
            geometry:{type:'LineString',coordinates:[pt1,pt2]},
            properties:{
              type:'between_own',
              dist:dist,
              label:dist.toFixed(1)+'m',
              ok: dist>=minDist
            }
          });
        }catch(e){}
      }
    }
  }

  // ── Cladiri direct adiacente parcelei/parcelelor ────────────────────
  // Construim un poligon unificat din toate parcelele selectate
  let combinedParcel = parcelFeat;
  if(S.parcels.length > 1){
    try{
      let union = parcelFeat;
      S.parcels.forEach(p=>{
        if(!p.geo?.geometry) return;
        const pf2 = {type:'Feature',geometry:p.geo.geometry,properties:{}};
        try{ const u=turf.union(union,pf2); if(u?.geometry) union=u; }catch(e){}
      });
      combinedParcel = union;
    }catch(e){}
  }

  if(ctxFeats.length){
    const parcelCenter = turf.centerOfMass(combinedParcel);

    // Pre-filtrăm: excludem clădirile de pe parcelele noastre
    const ctxNotOwn = ctxFeats.filter(ctx=>{
      try{
        const ctxCtr = turf.centerOfMass(ctx);
        for(const p of S.parcels){
          if(!p.geo?.geometry) continue;
          const pf2={type:'Feature',geometry:p.geo.geometry,properties:{}};
          if(turf.booleanPointInPolygon(ctxCtr,pf2)) return false;
        }
        // Pre-filtrare rapida: centroid max 150m (eliminam clădiri îndepărtate)
        return turf.distance(parcelCenter, ctxCtr, {units:'meters'}) < 200;
      }catch(e){ return false; }
    });

    // Calculăm distanța REALĂ față de CEL MAI APROPIAT volum AEDIS
    // (nu doar primul — important pentru multiselect cu mai multe clădiri)
    const fallbackVol = {
      type:'Feature',
      geometry: combinedParcel.geometry,
      properties:{}
    };
    const withDist = ctxNotOwn.map(ctx=>{
      try{
        // Găsim distanța minimă față de oricare din volumele generate
        let minDist = 999;
        const volsToCheck = myBldArr.length > 0 ? myBldArr : [fallbackVol];
        for(const vol of volsToCheck){
          try{
            const {dist} = minDistBetweenPolygons(vol, ctx);
            if(dist < minDist) minDist = dist;
            if(minDist < 5) break; // e suficient de aproape, nu mai căutăm
          }catch(e){}
        }
        return {ctx, dist:minDist, closestVol: volsToCheck.find(v=>{
          try{ return Math.abs(minDistBetweenPolygons(v,ctx).dist - minDist) < 0.5; }catch(e){return false;}
        }) || volsToCheck[0]};
      }catch(e){ return {ctx, dist:999, closestVol: fallbackVol}; }
    }).filter(x=>x.dist<150); // max 150m contur la contur

    // Sortam dupa distanta reala, luam max 15 cei mai apropiati
    const adjacentCtx = withDist
      .sort((a,b)=>a.dist-b.dist)
      .slice(0,20)
      .map(x=>x.ctx);

    // Pentru fiecare cladire adiacenta, calculam distanta minima fata de oricare volum generat
    // O singura linie per vecin (cea mai scurta distanta dintre toti volumii nostri)
    adjacentCtx.forEach(ctx=>{
      let bestDist = Infinity, bestPt1 = null, bestPt2 = null, bestBi = 0;
      myBldArr.forEach((myBld, bi)=>{
        try{
          const {pt1,pt2,dist} = minDistBetweenPolygons(myBld, ctx);
          if(pt1 && pt2 && dist < bestDist){
            bestDist = dist; bestPt1 = pt1; bestPt2 = pt2; bestBi = bi;
          }
        }catch(e){}
      });
      if(!bestPt1 || bestDist > 120) return; // ignoram vecinii prea departe (120m)
      const minDist = S.vol.multiVolDist||6;
      feats.push({
        type:'Feature',
        geometry:{type:'LineString', coordinates:[bestPt1, bestPt2]},
        properties:{
          type:'to_neighbor',
          dist: bestDist,
          label: bestDist.toFixed(1)+'m',
          ok: bestDist >= minDist,
          bldIdx: bestBi
        }
      });
    });
  }

  try{
    const distGeoJSON = {type:'FeatureCollection',features:feats};
    setSource('dist-src', distGeoJSON);
    // Salvăm pentru restaurare după schimbare stil
    S.vol._lastDistFeats = feats;
  }catch(e){}
}

// Calculeaza distanta minima si punctele corespunzatoare intre doua poligoane
// Returneaza {pt1, pt2, dist} - punctele de pe conturul fiecarui poligon
function minDistBetweenPolygons(featA, featB){
  try{
    const ringA = featA.geometry?.coordinates?.[0]||[];
    const ringB = featB.geometry?.coordinates?.[0]||[];
    if(!ringA.length||!ringB.length) return {pt1:null,pt2:null,dist:999};

    let minDist=Infinity, bestPtA=null, bestPtB=null;

    // Verificam toate perechile de segmente
    for(let i=0;i<ringA.length-1;i++){
      for(let j=0;j<ringB.length-1;j++){
        // Punctul de pe segmentul A cel mai aproape de punctul mijloc al segmentului B
        const midB = [(ringB[j][0]+ringB[j+1][0])/2, (ringB[j][1]+ringB[j+1][1])/2];
        const midA = [(ringA[i][0]+ringA[i+1][0])/2, (ringA[i][1]+ringA[i+1][1])/2];

        const nearA = turf.nearestPointOnLine(
          {type:'Feature',geometry:{type:'LineString',coordinates:[ringA[i],ringA[i+1]]}},
          turf.point(midB)
        );
        const nearB = turf.nearestPointOnLine(
          {type:'Feature',geometry:{type:'LineString',coordinates:[ringB[j],ringB[j+1]]}},
          turf.point(midA)
        );
        const d = turf.distance(nearA, nearB, {units:'meters'});
        if(d<minDist){
          minDist=d;
          bestPtA=nearA.geometry.coordinates;
          bestPtB=nearB.geometry.coordinates;
        }
      }
    }
    return {pt1:bestPtA, pt2:bestPtB, dist:Math.round(minDist*10)/10};
  }catch(e){ return {pt1:null,pt2:null,dist:999}; }
}

// ═══ buildVolume — Generare 3D cu Scenarii Reale ════════════════════════
//
// SCENARIU 'liber' (Demolare):
//   - Cladirile existente sunt demolate mental
//   - Terenul e tratat ca liber de constructii
//   - Footprint = intreaga zona construibila (dupa aliniamente + POT + SV)
//   - CUT, H, Niv se aplica normal
//
// SCENARIU 'extindere_h' (Extindere Orizontala):
//   - Cladirile existente RAMAN pe teren (le vedem in contextul 3D)
//   - Calculam cat din POT si CUT este DEJA OCUPAT de cladirile existente
//   - Volumul nou = diferenta: zona libera din footprint, minus constructia existenta
//   - Inaltime noua poate fi MAI MARE decat cea existenta (extindere si pe verticala)
//
// SCENARIU 'extindere_v' (Corp Nou Integrat):
//   - Volumul nou INGLOBEAZA cladirile existente intr-un corp unitar
//   - Footprint = intreaga zona construibila (se genereaza peste existente)
//   - Inaltimea poate fi orice (PUG sau PUZ)
//   - Contextul 3D existent ramane vizibil pentru referinta

function buildVolume(){
  const feats=[];
  const scenariu = S.vol.scenariuConstructie || 'liber';
  
  S.parcels.forEach((p,pi)=>{
    if(!p.geo?.geometry) return;
    const params = p.params || getDefaultParams(p.utr);
    const pA = Math.max(1, p.area || turf.area(p.geo));
    const hNiv = Math.max(2.4, Number(S.vol.hNiv||3.0));
    const nP = Math.max(1, pN(params.niv)||1);
    const totH = nP * hNiv;
    let rNiv = nP;
    const cut = pN(params.cut);
    
    // ── Obtinem cladirile existente pe acest teren ──────────────────────
    const existingBlds = [];
    if(S.ctx?.features?.length){
      const parcelFeat = {type:'Feature', geometry:p.geo.geometry, properties:{}};
      S.ctx.features.forEach(bld=>{
        if(!bld.geometry) return;
        try{
          const bldFeat = {type:'Feature', geometry:bld.geometry, properties:{}};
          // Cladire e "pe teren" daca se suprapune cu parcela
          const overlap = turf.intersect(parcelFeat, bldFeat);
          if(overlap && turf.area(overlap) > 5) existingBlds.push(bld);
        }catch(e){}
      });
    }
    
    // ── Calculam suprafata existenta ocupata (pentru extindere) ─────────
    let existingArea = 0; // mp amprenta cladiri existente
    let existingH = 0;    // inaltimea medie a cladirilor existente
    if(existingBlds.length){
      existingBlds.forEach(bld=>{
        try{ existingArea += turf.area({type:'Feature',geometry:bld.geometry,properties:{}}); }catch(e){}
        existingH = Math.max(existingH, pN(bld.properties?.h)||0);
      });
    }
    const existingPOT = pA > 0 ? (existingArea/pA*100) : 0;
    const potLimit = pN(params.pot)||100;
    const potRamas = Math.max(0, potLimit - existingPOT); // % din teren inca disponibil
    
    // ── Footprint de baza (dupa aliniamente, POT, SV) ───────────────────
    let fp = buildFP(p.geo.geometry, params);
    if(!fp?.geometry) return;
    
    // ── Aplicam logica scenariului ──────────────────────────────────────
    let volumeGeom = fp.geometry;     // geometria volumului nou
    let baseH = 0;                    // cota de la care incepe constructia noua
    let efectivNiv = rNiv;            // niveluri efective de construit
    
    if(scenariu === 'liber'){
      // DEMOLARE: teren complet liber — footprint maxim, fara cladiri existente
      volumeGeom = fp.geometry;
      baseH = 0;
      efectivNiv = rNiv;
      if(cut && cut > 0){
        const SDmax = pA * cut;
        const fpA2 = turf.area(fp);
        if(fpA2 * efectivNiv > SDmax * 1.05){
          efectivNiv = Math.max(1, Math.floor(SDmax / Math.max(1, fpA2)));
        }
      }
      
    } else if(scenariu === 'extindere_h'){
      // EXTINDERE ORIZONTALA: construim pe zona libera, langa existente
      // Cladirile existente raman vizibile
      // ctx-3d visibility managed by _setCtxVisibility()
      // Zona libera = footprint minus cladirile existente
      let zonaLibera = fp;
      existingBlds.forEach(bld=>{
        try{
          const bldFeat = {type:'Feature', geometry:bld.geometry, properties:{}};
          const diff = turf.difference(zonaLibera, bldFeat);
          if(diff?.geometry && turf.area(diff) > 10) zonaLibera = diff;
        }catch(e){}
      });
      volumeGeom = zonaLibera?.geometry || fp.geometry;
      baseH = 0; // constructie noua porneste de la sol
      // Inaltimea noua poate depasi cladirile existente
      // CUT ramas = CUT_total - CUT_existent
      const cutExistent = existingBlds.reduce((s,b)=>{
        try{ return s + turf.area({type:'Feature',geometry:b.geometry,properties:{}})*( pN(b.properties?.lv)||Math.round((pN(b.properties?.h)||3)/3)); }catch(e){ return s; }
      }, 0);
      if(cut && cut > 0){
        const SDtotal = pA * cut;
        const SDramas = Math.max(0, SDtotal - cutExistent);
        const fpA3 = turf.area({type:'Feature',geometry:volumeGeom,properties:{}});
        efectivNiv = fpA3 > 0 ? Math.max(1, Math.min(rNiv, Math.floor(SDramas / Math.max(1, fpA3)))) : rNiv;
      }
      
    } else if(scenariu === 'extindere_v'){
      // EXTINDERE VERTICALA + ORIZONTALA: corp nou integrat
      // ctx-3d visibility managed by _setCtxVisibility()
      // Footprint = intreaga zona construibila (poate include si zona cladirilor existente)
      // Volumul porneste de la sol si inglobeaza tot
      // Cladirile existente sunt "absorbite" in noul corp
      volumeGeom = fp.geometry;
      baseH = 0;
      // CUT: calculam total inclusiv ce era existent
      if(cut && cut > 0){
        const SDmax = pA * cut;
        const fpA4 = turf.area(fp);
        efectivNiv = fpA4 > 0 ? Math.max(1, Math.min(rNiv, Math.floor(SDmax / Math.max(1, fpA4)))) : rNiv;
      }
    } else if(scenariu === 'mansardare'){
      // MANSARDARE: adăugăm etaj/mansardă PESTE clădirile existente
      if(existingBlds.length){
        let union={type:'Feature',geometry:existingBlds[0].geometry,properties:{}};
        existingBlds.slice(1).forEach(bld=>{try{const u=turf.union(union,{type:'Feature',geometry:bld.geometry,properties:{}});if(u?.geometry)union=u;}catch(e){}});
        try{const inter=turf.intersect(fp,union);if(inter?.geometry&&turf.area(inter)>5)volumeGeom=inter.geometry;else volumeGeom=fp.geometry;}catch(e){volumeGeom=fp.geometry;}
      } else volumeGeom=fp.geometry;
      baseH = existingH > 0 ? existingH : 0;
      efectivNiv = Math.max(1, rNiv - Math.max(0, Math.round(existingH/hNiv)));

    } else if(scenariu === 'consolidare'){
      // CONSOLIDARE/REABILITARE: redăm volumul existent (fără volum nou)
      if(existingBlds.length){
        let union={type:'Feature',geometry:existingBlds[0].geometry,properties:{}};
        existingBlds.slice(1).forEach(bld=>{try{const u=turf.union(union,{type:'Feature',geometry:bld.geometry,properties:{}});if(u?.geometry)union=u;}catch(e){}});
        volumeGeom=union.geometry;
      } else volumeGeom=fp.geometry;
      baseH=0;
      efectivNiv = existingH>0 ? Math.max(1,Math.round(existingH/hNiv)) : rNiv;

    } else if(scenariu === 'reconversie'){
      // RECONVERSIE: același volum, funcțiune nouă
      if(existingBlds.length){
        let union={type:'Feature',geometry:existingBlds[0].geometry,properties:{}};
        existingBlds.slice(1).forEach(bld=>{try{const u=turf.union(union,{type:'Feature',geometry:bld.geometry,properties:{}});if(u?.geometry)union=u;}catch(e){}});
        volumeGeom=union.geometry;
      } else volumeGeom=fp.geometry;
      baseH=0;
      efectivNiv=existingH>0?Math.max(1,Math.round(existingH/hNiv)):rNiv;

    } else if(scenariu === 'inglobare'){
      // ÎNGLOBARE: corp nou care cuprinde și existentele
      volumeGeom=fp.geometry; baseH=0;
      if(cut&&cut>0){const SDmax=pA*cut;const fpA5=turf.area(fp);efectivNiv=fpA5>0?Math.max(1,Math.min(rNiv,Math.floor(SDmax/Math.max(1,fpA5)))):rNiv;}
    }
    
    // ── Multiple volume pe edificabil ────────────────────────────────────
    // Funcționează în ORICE scenariu (liber/extindere_h/extindere_v)
    if(S.vol.multiVol && fp?.geometry){
      // Trecem volumeGeom ca fp pentru multiVolume — respectă scenariul curent
      const fpForMulti = volumeGeom ? {type:'Feature',geometry:volumeGeom,properties:{}} : fp;
      const multiFeats = buildMultiVolume(p, fpForMulti, params, pi);
      feats.push(...multiFeats);
      return;
    }

    // ── Generare 3D cu stil arhitectural ────────────────────────────────
    const fpFinal = {type:'Feature', geometry:volumeGeom, properties:{}};
    const pal = getArchPalette();
    const hasComercial = S.vol.parterComercial || S.vol.archStyle==='mixt' || S.vol.archStyle==='comercial';
    const hParter = hasComercial ? (S.vol.hParter||4.5) : hNiv;
    const retragereEtaj = S.vol.retragereEtaj||0.85;
    
    for(let i=0; i<efectivNiv; i++){
      let base, top, color, g=volumeGeom;
      
      if(i===0){
        // PARTER — comercial sau normal
        base = baseH;
        top = baseH + hParter;
        color = hasComercial ? pal.comercial : pal.etaje[0];
      } else {
        // ETAJE CURENTE
        base = baseH + hParter + (i-1)*hNiv;
        top = base + hNiv;
        color = pal.etaje[Math.min(i, pal.etaje.length-1)];
      }
      
      // ETAJ RETRAS (ultimul etaj sau penthouse)
      const isLastFloor = i===efectivNiv-1 && efectivNiv>1;
      if(S.vol.retras && isLastFloor){
        try{
          const sc = turf.transformScale(fpFinal, retragereEtaj,
            {origin:turf.centerOfMass(fpFinal)});
          if(sc?.geometry){ g=sc.geometry; color=pal.retras; }
        }catch(e){}
      }
      
      feats.push({type:'Feature',
        properties:{base,top,color,floor:i,parcelIdx:pi,scenariu,
          archStyle:S.vol.archStyle,
          isComercial:i===0&&hasComercial,
          isRetras:isLastFloor&&S.vol.retras},
        geometry:g});
    }
    
    // TERASA / ACOPERIS PLAT
    if(S.vol.terasa){
      const lastH = baseH + hParter + Math.max(0,efectivNiv-1)*hNiv;
      try{
        // Terasa = suprafata plata usor mai mica
        const tGeom = S.vol.retras
          ? turf.transformScale(fpFinal, retragereEtaj, {origin:turf.centerOfMass(fpFinal)})
          : fpFinal;
        if(tGeom?.geometry){
          feats.push({type:'Feature',
            properties:{base:lastH,top:lastH+0.3,color:pal.terasa,floor:-1,parcelIdx:pi,isTerasa:true},
            geometry:tGeom.geometry});
          // Parapet terasa (rama)
          try{
            const parapet = turf.buffer(tGeom, -0.4, {units:'meters'});
            if(parapet?.geometry){
              feats.push({type:'Feature',
                properties:{base:lastH,top:lastH+1.0,color:pal.terasa,floor:-2,parcelIdx:pi},
                geometry:{type:'Polygon',coordinates:[[
                  ...tGeom.geometry.coordinates[0],
                  ...(parapet.geometry.coordinates[0]||[]).reverse()
                ]]}});
            }
          }catch(e){}
        }
      }catch(e){}
    }
    
    // Stocam info pentru UI
    p._buildInfo = {
      scenariu, existingArea:Math.round(existingArea), existingPOT:Math.round(existingPOT),
      potRamas:Math.round(potRamas), existingH:Math.round(existingH), efectivNiv
    };
  });
  
  // Stocam pentru updateDistanceLines
  S.vol._lastFeats = feats;
  return feats;
}

// ═══ CONTEXT 3D ═══════════════════════════════════════════════════════════
// Cod culori functiuni cladiri - conform practica urbanistica internationala
// BLD_COL moved to top
// Descrieri pentru legenda
// BLD_LABELS moved to top
// ── Cache context: evitam cereri repetate pentru aceeasi zona ─────────────
// _CTX_CACHE moved to top

// Throttle: minimum 20s between Overpass calls for same parcel
let _ctxLastCall = 0;
