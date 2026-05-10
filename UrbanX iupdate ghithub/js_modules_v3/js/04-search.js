// UrbanX — Cautare cadastru, adresa, GPS

function draw2D(){
  const cv=_g('c2d');if(!cv)return;
  const ap=S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){cv.getContext('2d').clearRect(0,0,cv.width,cv.height);return;}
  const fp=buildFP(ap.geo.geometry,ap.params||ap.utr);
  const feats=[ap.geo];if(fp)feats.push(fp);
  const pr=cv.parentElement;cv.width=Math.max(280,pr.clientWidth-2);cv.height=Math.max(155,pr.clientHeight-2);
  const ctx=cv.getContext('2d');ctx.clearRect(0,0,cv.width,cv.height);
  const bb=turf.bbox({type:'FeatureCollection',features:feats});
  const pad=22,sx=(cv.width-2*pad)/Math.max(1e-9,bb[2]-bb[0]),sy=(cv.height-2*pad)/Math.max(1e-9,bb[3]-bb[1]),sc=Math.min(sx,sy);
  const dr=(f,stroke,fill,lw=2,dash=[])=>{
    const g=f.geometry;
    const polys=g.type==='Polygon'?[g.coordinates[0]]:g.type==='MultiPolygon'?g.coordinates.map(r=>r[0]):[];
    ctx.strokeStyle=stroke;ctx.fillStyle=fill;ctx.lineWidth=lw;ctx.setLineDash(dash);
    polys.forEach(ring=>{ctx.beginPath();ring.forEach(([x,y],i)=>{const px=pad+(x-bb[0])*sc,py=cv.height-(pad+(y-bb[1])*sc);i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);});ctx.closePath();ctx.fill();ctx.stroke();});
  };
  dr(ap.geo,'#00e5b4','rgba(0,229,180,.2)',2);
  if(fp)dr(fp,'#ff6b35','rgba(255,107,53,.18)',2,[5,3]);
  ctx.setLineDash([]);ctx.fillStyle='#64748b';ctx.font='10px Segoe UI,Arial';
  ctx.fillText('🟦 Parcelă  🟥 Footprint buildable (după aliniamente)',10,14);
  // Suprafețe
  if(fp?.geometry){const fpA=turf.area(fp).toFixed(0);ctx.fillText(`Amprentă: ${fpA} m²`,10,cv.height-6);}
}

// ═══ ACȚIUNI ══════════════════════════════════════════════════════════════
function doCoord(){
  const el=document.getElementById('inp-coord');
  const raw=(window._lastCoordVal||el?.value||'').trim();
  const parts=raw.split(/[\s,;]+/).map(s=>parseFloat(s.trim())).filter(n=>isFinite(n));
  if(parts.length<2)return alert('Format: 47.1585, 27.6014 (lat, lng)');
  let lat=parts[0],lng=parts[1];
  // Auto-detectare inversare: Romania lat~44-48, lng~22-30
  const looksLike_lng=n=>(n>=20&&n<=32);
  const looksLike_lat=n=>(n>=43&&n<=49);
  if(looksLike_lng(lat)&&looksLike_lat(lng)){[lat,lng]=[lng,lat];}
  if(!looksLike_lat(lat)||!looksLike_lng(lng)){
    return alert('Coordonate in afara Romaniei. Format: 47.1585, 27.6014');
  }
  if(window.innerWidth<=840)_g('mob-sheet')?.classList.remove('open');
  goToLocation(lat, lng, lat.toFixed(5)+', '+lng.toFixed(5));
}

function doGPS(){
  if(!navigator.geolocation)return alert('GPS necesită HTTPS.');
  ss('📍 Se detectează locația…');
  navigator.geolocation.getCurrentPosition(
    p=>{_g('mob-sheet')?.classList.remove('open');goToLocation(p.coords.latitude,p.coords.longitude,'Locația mea GPS');},
    e=>{ss('❌ GPS: '+e.message);}
  ,{enableHighAccuracy:true,timeout:15000,maximumAge:0});
}

let _addrT=null;
// Logică input adresă — caută DOAR când utilizatorul s-a oprit
function _addrOnInput(val){
  clearTimeout(window._addrT);
  window._lastAddrVal = val;

  if(!val || val.length < 2){
    mobSearchOverlayClose();
    _addrSetBox('');
    return;
  }

  // Detectăm dacă textul pare incomplet:
  // - se termină cu o cifră singulară (ex: "Str X 5" → poate urma "5A" sau "55")
  // - se termină cu o literă după spațiu (ex: "Str Lascar C" → poate urma "Catargi")
  // - are mai puțin de 5 caractere
  const seemsIncomplete = val.length < 5
    || /\s[A-Za-zÀ-ÿ]{1,3}$/.test(val)   // ultimul cuvânt e scurt (inițiale, prescurtare)
    || /\s\d{1,2}$/.test(val);             // număr de 1-2 cifre la final (poate urma "A", "bis")

  // Dacă pare incomplet → așteptăm mai mult (1500ms)
  // Dacă pare complet → așteptăm mai puțin (900ms)
  const delay = seemsIncomplete ? 1500 : 900;

  // Arătăm hint că se va căuta
  if(val.length >= 3){
    _addrSetBox(`<div class="re" style="color:#64748b;font-size:12px">
      ⌨️ Continuați să scrieți sau apăsați <b>Enter</b> pentru a căuta…
    </div>`);
  }

  window._addrT = setTimeout(()=>{
    if(window._lastAddrVal === val) doAddr(val, false);
  }, delay);
}

function doAddr(q, immediate){
  clearTimeout(_addrT);
  if(!q||q.trim().length<2){
    _addrSetBox('');return;
  }
  // Coordonate GPS → redirect la doCoord
  if(/^-?\d+\.\d+[\s,;]+-?\d+\.\d+/.test(q.trim())){
    const el=document.getElementById('inp-coord');
    if(el) el.value=q.trim();
    window._lastCoordVal=q.trim();
    _addrSetBox('');doCoord();return;
  }
  window._lastAddrSearch = q; // marcăm că am căutat această valoare
  _addrSetBox(`<div class="re"><span class="spin"></span>Se caută <b>${esc(q)}</b>…</div>`);
  if(window.innerWidth<=840 && document.getElementById('mob-search-overlay')){
    mobSearchOverlayShow('📍 Adrese & POI', `<div class="re"><span class="spin"></span>Se caută <b>${esc(q)}</b>…</div>`);
  }

  _addrT=setTimeout(async()=>{
    try{
      const ctr=map.getCenter();
      const TOKEN='pk.eyJ1IjoiZWk4aHRlciIsImEiOiJjajhhNGtiN3YwOW50MnFwOHBnOGJtcjVtIn0.dT4Ld3v1GoeQRCaIzxNn2g';
      const isNearIasi=Math.abs(ctr.lat-47.16)<0.15&&Math.abs(ctr.lng-27.58)<0.2;
      const qEnh=isNearIasi&&!/ia[sș]i/i.test(q)?q+' Iași':q;
      const viewbox=isNearIasi?'27.45,47.22,27.72,47.10':`${ctr.lng-0.3},${ctr.lat+0.3},${ctr.lng+0.3},${ctr.lat-0.3}`;

      // NOTĂ: fără User-Agent customizat — blocat de CORS preflight pe iOS/Android
      const nomUrl=`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=8&q=${encodeURIComponent(qEnh)}&viewbox=${viewbox}&bounded=${isNearIasi?1:0}&countrycodes=ro&addressdetails=1&accept-language=ro`;
      const mbUrl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json?access_token=${TOKEN}&language=ro&limit=5&proximity=${ctr.lng.toFixed(4)},${ctr.lat.toFixed(4)}&bbox=27.40,47.05,27.75,47.28&types=address,poi,place,locality`;

      const [nomRes,mbRes]=await Promise.allSettled([
        fetch(nomUrl).then(r=>{if(!r.ok)throw new Error('Nominatim '+r.status);return r.json();}),
        fetch(mbUrl).then(r=>{if(!r.ok)throw new Error('Mapbox '+r.status);return r.json();})
      ]);

      const combined=[];
      if(nomRes.status==='fulfilled'&&Array.isArray(nomRes.value)){
        nomRes.value.forEach(it=>combined.push({
          text:it.name||it.display_name.split(',')[0],
          place_name:it.display_name,
          center:[parseFloat(it.lon),parseFloat(it.lat)],
          source:'OSM',type:it.type||it.class||''
        }));
      }
      if(mbRes.status==='fulfilled'&&mbRes.value?.features){
        mbRes.value.features.forEach(it=>{
          const isDup=combined.some(c=>Math.abs(c.center[0]-it.center[0])<0.001&&Math.abs(c.center[1]-it.center[1])<0.001);
          if(!isDup) combined.push({
            text:it.text||it.place_name.split(',')[0],
            place_name:it.place_name,
            center:it.center,source:'MB',type:it.place_type?.[0]||''
          });
        });
      }
      combined.sort((a,b)=>{
        const da=Math.pow(a.center[0]-ctr.lng,2)+Math.pow(a.center[1]-ctr.lat,2);
        const db=Math.pow(b.center[0]-ctr.lng,2)+Math.pow(b.center[1]-ctr.lat,2);
        return da-db;
      });

      window._addrI=combined;
      window._pendingAddrResults=combined;

      if(!combined.length){
        _addrSetBox(`<div class="re">Niciun rezultat pentru "<b>${esc(q)}</b>".<br><small>Încercați: "Teatrul Național Iași", "Hotel Traian Iași"</small></div>`);
        return;
      }

      const html2=combined.map((it,i)=>`
        <div class="ri" onclick="pickAddr(${i})" style="-webkit-tap-highlight-color:transparent;padding:12px 11px">
          <div style="font-size:14px;font-weight:600;color:#e2e8f0">${esc(it.text)}</div>
          <div style="font-size:12px;color:#64748b;margin-top:2px">${esc((it.place_name||'').length>80?(it.place_name||'').slice(0,80)+'…':(it.place_name||''))}</div>
        </div>`).join('');

      _addrSetBox(html2);
      // Nu auto-selectăm — utilizatorul alege explicit

    }catch(e){
      console.error('Geocoding:',e);
      _addrSetBox(`<div class="re">Eroare: ${esc(e.message)}</div>`);
    }
  },0); // debounce gestionat de _addrOnInput
}

// Scrie în addr-box — desktop: în DOM inline; mobil: overlay fix
function _addrSetBox(html2){
  const isMob = window.innerWidth <= 840;

  if(isMob){
    // Pe mobil folosim overlay-ul fix (nu e afectat de re-render mob-body)
    if(html2){
      mobSearchOverlayShow('📍 Adrese & POI', html2);
    } else {
      mobSearchOverlayClose();
    }
  } else {
    // Desktop: scriem direct în addr-box din DOM
    const box = document.getElementById('addr-box');
    if(box){
      box.innerHTML = html2 || '';
      box.style.display = html2 ? 'block' : 'none';
    }
  }
  // Stocăm pentru restaurare după re-render DOM
  window._pendingAddrHtml = html2 || null;
  if(!html2) window._pendingAddrResults = null;
}

function pickAddr(i){
  const it=(window._addrI||window._pendingAddrResults)?.[i];if(!it)return;
  const[lng,lat]=it.center;
  const label=it.text||(it.place_name||'').split(',')[0];
  // Curățăm
  _addrSetBox('');
  mobSearchOverlayClose();
  window._pendingAddrResults=null;
  window._pendingAddrHtml=null;
  window._addrI=null;
  // Setăm valoarea în input
  const inp=document.getElementById('inp-addr');
  if(inp){ inp.value=label; window._lastAddrVal=label; }
  // Închidem panoul mobil + ascundem keyboard iOS
  if(window.innerWidth<=840){
    document.getElementById('mob-sheet')?.classList.remove('open');
    inp?.blur();
    document.activeElement?.blur();
  }
  goToLocation(lat, lng, label);
}

// ═══ CAUTARE DEFINITIVA - fara ANCPI ca sursa primara ════════════════════
// Navigheaza la coordonate si gaseste parcela din datele locale
async function goToLocation(lat, lng, label){
  S._lastCoord = lat.toFixed(6)+', '+lng.toFixed(6);
  document.querySelectorAll('#inp-coord').forEach(el=>el.value=S._lastCoord);
  
  // Pas 1: Zoom la locatie
  map.flyTo({center:[lng,lat], zoom:18, duration:900});
  ss('⏳ Se caută parcela la: '+(label||lat.toFixed(5)+', '+lng.toFixed(5))+'…');
  
  // Pas 2: Asteptam ca harta sa se stabilizeze
  await new Promise(r=>setTimeout(r,1000));
  
  // Pas 3: Incarcam zona cadastrala pentru aceste coordonate
  const GRID=0.05;
  const zx=Math.floor(lng/GRID), zy=Math.floor(lat/GRID);
  const zonaName='zona_'+zx+'_'+zy;
  if(!S._zoneCache) S._zoneCache={};
  
  let zoneData=S._zoneCache[zonaName];
  if(!zoneData){
    try{
      ss('⏳ Se încarcă datele cadastrale pentru zonă…');
      const r=await fetch('./zone/'+zonaName+'.geojson');
      if(r.ok){ zoneData=await r.json(); S._zoneCache[zonaName]=zoneData; }
    }catch(e){ console.warn('Zone load error:', e.message); }
  }
  
  // Pas 4: Gasim parcela care contine punctul
  let foundParcel=null;
  const pt=turf.point([lng,lat]);
  
  if(zoneData?.features?.length){
    // Cautam parcela care contine exact punctul
    for(const f of zoneData.features){
      if(!f.geometry) continue;
      try{
        if(f.geometry.type==='Polygon'||f.geometry.type==='MultiPolygon'){
          if(turf.booleanPointInPolygon(pt,f)){foundParcel=f; break;}
        }
      }catch(e){}
    }
    // Daca nu e exact in nicio parcela (click pe strada), gasim cea mai apropiata
    if(!foundParcel){
      let bestDist=Infinity;
      for(const f of zoneData.features){
        if(!f.geometry) continue;
        try{
          const c=turf.centerOfMass(f);
          const d=turf.distance(pt,c,{units:'meters'});
          if(d<bestDist && d<100){bestDist=d; foundParcel=f;}
        }catch(e){}
      }
    }
  }
  
  // Pas 5: Daca am gasit parcela locala -> o selectam direct
  if(foundParcel?.geometry){
    const area=Math.round(turf.area(foundParcel));
    const nrcad=foundParcel.properties?.nrcad||foundParcel.properties?.NR_CAD||'—';
    const utr=resolveUTR(foundParcel.properties?.utr||'')||lookupUTR(lng,lat)||'';
    // Detectam intravilan/extravilan si completam UTR daca lipseste
    const zoneInfo = detectZoneType(lat, lng, utr);
    const effectiveUtr = utr || zoneInfo.utr;
    const parcelObj={
      geo:foundParcel, nrcad,
      utr: effectiveUtr,
      zoneType: zoneInfo.type,
      zoneLabel: zoneInfo.label,
      area, source:'cadastru_local',
      params:getDefaultParams(effectiveUtr)
    };
    if(!S.multiMode){
      S.parcels=[parcelObj]; S.activeParcel=0;
      S.utr=utr; S.rule=REGULI[utr]||{};
      S.ctx=null; S.vol.genDone=false; S._ctxBackup=null; S._styleBeforeDemo=null;
      try{clearSource('vol-src');clearSource('fp-src');clearSource('ctx-src');map.setLayoutProperty("ctx-3d","visibility","visible");_demolishRestoreNative();}catch(e){}
    } else {
      const isDup=nrcad&&nrcad!=='—'&&S.parcels.some(p=>p.nrcad===nrcad);
      if(!isDup){S.parcels.push(parcelObj);S.activeParcel=S.parcels.length-1;}
    }
    S.ll={lat,lng};
    // Arata parcelele din zona pe harta
    const inView=zoneData.features.filter(f=>{
      try{
        const ring=f.geometry?.coordinates?.[0];
        if(!ring?.length) return false;
        const bb=turf.bbox(f);
        const mapBb=map.getBounds();
        return bb[0]<=mapBb.getEast()&&bb[2]>=mapBb.getWest()&&bb[1]<=mapBb.getNorth()&&bb[3]>=mapBb.getSouth();
      }catch(e){return false;}
    });
    if(inView.length>0){
      S.cadData={features:inView}; S.cadHasPolygons=true;
      const fc={type:'FeatureCollection',features:inView.map((f,i)=>({...f,id:i,properties:{...f.properties,pidx:i,fc:'rgba(96,165,250,0.3)',lc:'#3b82f6'}}))};
      setSource('parcel-src',fc);
      const elS=document.getElementById('cadastru-status');
      if(elS)elS.textContent='✅ '+inView.length+' parcele în zonă';
    }
    // Zoom pe parcela gasita
    try{const bb=turf.bbox(foundParcel);map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:120,maxZoom:19,duration:500});}
    catch(e){}
    // Popup pe centroid
    let popupPos={lng,lat};
    try{const ctr=turf.centerOfMass(foundParcel);popupPos={lng:ctr.geometry.coordinates[0],lat:ctr.geometry.coordinates[1]};}catch(e){}
    const popupTitle = nrcad && nrcad!=='—' ? `✅ Parcelă ${esc(nrcad)}` : `✅ ${esc(label||'Parcelă selectată')}`;
    // Verificare forma alungita (posibil drum public)
    let shapeWarning = '';
    try{
      const bb = turf.bbox(foundParcel);
      const w = turf.distance(turf.point([bb[0],bb[1]]),turf.point([bb[2],bb[1]]),{units:'meters'});
      const h = turf.distance(turf.point([bb[0],bb[1]]),turf.point([bb[0],bb[3]]),{units:'meters'});
      const ratio = Math.max(w,h)/Math.max(1,Math.min(w,h));
      if(ratio > 5) shapeWarning = '<br><small style="color:#f59e0b">⚠️ Parcelă alungită ('+Math.round(ratio)+':1) — posibil drum/culoar public</small>';
    }catch(e){}
    const zoneInfo2 = detectZoneType(lat, lng, effectiveUtr||utr);
    const ancpiLink = nrcad&&nrcad!=='—' ? `<br><a href="https://geoportal.ancpi.ro/imobile.html" target="_blank" style="color:#60a5fa;font-size:11px">🔗 Verifică forma exactă pe geo.ancpi.ro</a>` : '';
    const zoneTag = `<br><span style="font-size:11px;color:${zoneInfo2.color}">${zoneInfo2.label}</span>`;
    popup(`<b>${popupTitle}</b><br>${nrcad&&nrcad!=='—'?'':'Cad: <b>'+esc(nrcad)+'</b><br>'}UTR: <b>${esc(effectiveUtr||utr||'—')}</b><br>Suprafață: <b>${area} m²</b>${zoneTag}<br><small style="color:#34d399">📐 Cadastru local</small>${shapeWarning}${ancpiLink}`,popupPos);
    ss(`✅ ${esc(label||nrcad)} | Parcelă: ${nrcad} | UTR: ${utr||'—'} | ${area} m²`);
    updateMap(); renderAll();
    // Detectam UAT-ul real async (Nominatim)
    detectZoneTypeAsync(lat, lng, effectiveUtr||utr).then(zInfo=>{
      // Actualizam parcela cu informatii UAT corecte
      if(S.parcels.length > 0){
        const idx = S.parcels.findIndex(p=>p.nrcad===nrcad);
        if(idx>=0){
          S.parcels[idx].zoneType = zInfo.type;
          S.parcels[idx].zoneLabel = zInfo.label;
          S.parcels[idx].uat = zInfo.uat;
          // Daca UAT-ul e alta localitate, aplicam reguli EXT_COM
          if(zInfo.type==='extravilan_com' && S.parcels[idx].utr==='EXT'){
            S.parcels[idx].utr = 'EXT_COM';
            S.parcels[idx].params = getDefaultParams('EXT_COM');
          } else if(zInfo.type==='extravilan_iasi'){
            S.parcels[idx].utr = 'EXT';
            S.parcels[idx].params = getDefaultParams('EXT');
          }
        }
      }
      // Actualizam badge-ul in UI
      const badge = document.querySelector('#zone-badge');
      if(badge){
        badge.textContent = zInfo.label;
        badge.style.color = zInfo.color;
        badge.style.borderColor = zInfo.color+'55';
        badge.style.background = zInfo.color+'15';
      }
      // Actualizam statusbar
      const sc = document.getElementById('status');
      if(sc && zInfo.uat) sc.textContent = sc.textContent.replace('se verifică UAT-ul…', zInfo.label);
      // Rerenderizam tab-ul proiect cu noile reguli
      renderTab('proiect');
      ss(`✅ ${esc(label||nrcad)} | UTR: ${effectiveUtr||utr||'—'} | ${area} m² · ${zInfo.label}`);
    }).catch(()=>{});
    
    // Auto-detectare front stradal (async, nu blocheaza UI)
    detectRoadFront(foundParcel).then(brg=>{
      if(brg !== null){
        S.bearing = Math.round(brg);
        // Actualizeaza slider in UI daca e deschis
        document.querySelectorAll('input[type=range]').forEach(el=>{
          if(el.oninput?.toString().includes('S.bearing')){
            el.value = S.bearing;
          }
        });
        updateMap();
        ss('🧭 Front stradal auto-detectat: '+S.bearing+'°');
      }
    }).catch(()=>{});
    // Pe mobile: deschidem automat tab-ul Proiect dupa selectie
    if(window.innerWidth<=840){
      S.tab='proiect';
      const sh=_g('mob-sheet');
      const mb=_g('mob-body');
      if(sh && mb){
        mb.innerHTML=getContent('proiect');
        sh.classList.add('open');
        document.querySelectorAll('.mnav-btn').forEach(b=>{
          b.classList.toggle('active', b.dataset.mt==='proiect');
        });
      }
    }
    await loadContext();
  } else {
    // Nu am gasit parcela locala - afisam locatia si informam utilizatorul
    ss(`📍 ${label||''} localizat la ${lat.toFixed(5)}, ${lng.toFixed(5)} — dați click pe parcelă pentru a o selecta`);
    popup(`<b>📍 ${esc(label||'Locație')}</b><br>Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}<br><small style="color:#fbbf24">Dați click pe o parcelă vizibilă pentru a o selecta</small>`,{lng,lat});
  }
}

// Autocomplete cadastral live (la tastare)
let _cadTimer = null;
function onCadInput(val){
  clearTimeout(_cadTimer);
  const isMob = window.innerWidth <= 840;
  const v = (val||'').trim();

  // Golit — închidem
  if(v.length < 2){
    if(isMob) mobSearchOverlayClose();
    else { const b=document.querySelector('#cad-box'); if(b) b.innerHTML=''; }
    return;
  }

  const setCadBox = (htmlStr) => {
    if(isMob){
      if(htmlStr) mobSearchOverlayShow('🔢 Cadastru Iași', htmlStr);
      else mobSearchOverlayClose();
    } else {
      const box = document.querySelector('#cad-box');
      if(box) box.innerHTML = htmlStr || '';
    }
  };

  _cadTimer = setTimeout(()=>{
    if(!S.cadIdx?.size){
      setCadBox('<div class="re">⏳ Cadastrul se încarcă…</div>');
      return;
    }
    const key = v.toLowerCase().replace(/\s+/g,'');
    const res=[];
    const starts=[],contains=[];
    for(const[k,f]of S.cadIdx){
      if(k===key){res.push(f);break;}
      else if(k.startsWith(key))starts.push(f);
      else if(k.includes(key))contains.push(f);
    }
    if(!res.length) res.push(...starts.slice(0,10),...contains.slice(0,5));
    if(!res.length){
      setCadBox(`<div class="re">Niciun nr. cadastral cu "<b>${esc(v)}</b>"</div>`);
      return;
    }
    window._cadR = res;
    const cadHtml = res.map((f,i)=>`
      <div class="ri" onclick="pickCad(${i});mobSearchOverlayClose()"
        style="padding:13px 16px;display:flex;align-items:center;gap:8px">
        <span style="font-weight:800;font-size:15px;color:#e2e8f0">${esc(f.properties?.nrcad||'-')}</span>
        <span class="badge b-b" style="padding:2px 8px;font-size:11px">${esc(f.properties?.utr||'?')}</span>
        <span style="font-size:11px;color:#64748b;margin-left:auto">~${Math.round(f.properties?.SHAPE_Area||0)} m²</span>
      </div>`).join('');
    setCadBox(cadHtml);
  }, 200);
}

function doCad(){
  const el = document.getElementById('inp-cad');
  const v=(window._lastCadVal||el?.value||'').trim();
  if(!v)return;
  const key=v.toLowerCase().replace(/[\s+]/g,'').replace(/[^0-9]/g,'');
  
  // Dacă cadIdx nu e populat, avertizăm și re-încărcăm
  if(!S.cadIdx || S.cadIdx.size === 0){
    ss('⏳ Se incarca indexul cadastral...');
    loadData().then(()=>{
      setTimeout(()=>{
        window._mobCadVal = v;
        doCad();
      }, 1000);
    });
    return;
  }
  
  const found=S.cadIdx.get(key);
  const box=document.querySelector('#cad-box');
  
  if(!found){
    // Căutare parțială — nr poate fi scurt (fara zeros leading)
    let partialFound = null;
    S.cadIdx.forEach((val, k)=>{
      if(!partialFound && (k.endsWith(key) || k.startsWith(key) || k===key)){
        partialFound = val;
      }
    });
    if(partialFound){
      if(box)box.innerHTML='';
      const[lng,lat]=partialFound.geometry.coordinates;
      onMapClick(lat,lng);
      ss('Parcela gasita: '+key);
      if(window.innerWidth<=840) document.getElementById('mob-sheet')?.classList.remove('open');
      return;
    }
    if(box) box.innerHTML='<div class="re" style="color:#f87171">Numarul cadastral '+v+' nu a fost gasit. Verificati numarul (60000-183379).</div>';
    ss('Numarul cadastral ' + v + ' nu a fost gasit.');
    return;
  }
  
  if(found){
    if(box)box.innerHTML='';
    const[lng,lat]=found.geometry.coordinates;
    onMapClick(lat,lng);
    if(window.innerWidth<=840)_g('mob-sheet')?.classList.remove('open');
  } else {
    // Fallback: caută prefixe
    const res=[];for(const[k,f]of S.cadIdx){if(k.startsWith(key)||k.includes(key))res.push(f);if(res.length>=15)break;}
    if(!res.length){if(box)box.innerHTML=`<div class="re">Niciun nr. cadastral "${esc(v)}" găsit.</div>`;return;}
    if(box){
      window._cadR=res;
      box.innerHTML=res.map((f,i)=>`
        <div class="ri" onclick="pickCad(${i})">
          <span style="font-weight:700;color:#e2e8f0">${esc(f.properties?.nrcad||'-')}</span>
          <span class="badge b-b" style="padding:1px 6px;font-size:10px;margin-left:5px">${esc(f.properties?.utr||'?')}</span>
          <span style="font-size:10px;color:#64748b;margin-left:4px">~${Math.round(f.properties?.SHAPE_Area||0)} m²</span>
        </div>`).join('');
    }
  }
}

function pickCad(i){
  const f=window._cadR?.[i];if(!f)return;
  const b=document.querySelector('#cad-box');if(b)b.innerHTML='';
  if(window.innerWidth<=840)_g('mob-sheet')?.classList.remove('open');
  
  // Dacă avem poligon real din zona încărcată, îl selectăm direct
  if(f.geometry?.type==='Polygon'||f.geometry?.type==='MultiPolygon'){
    const area=Math.round(turf.area(f));
    const nrcad=f.properties?.nrcad||f.properties?.EntityHandle||'—';
    const utr=resolveUTR(f.properties?.utr||'')||lookupUTR(
      f.geometry.coordinates[0][0][0], f.geometry.coordinates[0][0][1]
    )||'';
    const parcelObj={geo:f,nrcad,utr,area,source:'cadastru',params:getDefaultParams(utr)};
    S.parcels=[parcelObj];S.activeParcel=0;
    S.utr=utr;S.rule=REGULI[utr]||{};
    S.ctx=null;S.vol.genDone=false;
    try{_aedisRestoreCad3D();}catch(e){}
    clearSource('vol-src');clearSource('ctx-src');
    try{const bb=turf.bbox(f);map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:80,maxZoom:19,duration:700});}catch(e){}
    const isApproxP = f.properties?.approx;
    popup('<b>'+(isApproxP?'⚠️ Parcelă aproximativă':'✅ Parcelă '+nrcad)+'</b>'+(isApproxP?'<br>Cad: <b>'+nrcad+'</b>':'')+'<br>UTR: <b>'+(utr||'—')+'</b><br>Suprafață: <b>'+area+' m²</b>'+(isApproxP?'<br><small style="color:#f59e0b">Geometrie estimată din DXF</small>':''),
      {lng:f.geometry.coordinates[0][0][0],lat:f.geometry.coordinates[0][0][1]});
    updateMap();renderAll();loadContext();
    ss('✅ Parcelă '+nrcad+' | UTR: '+(utr||'—')+' | '+area+' m²');
  } else if(f.geometry?.type==='Point'){
    // Avem doar centroidul din index → goToLocation incarca zona si gaseste poligonul
    const[lng,lat]=f.geometry.coordinates;
    const nrcad = f.properties?.nrcad||'';
    ss('📍 Parcelă '+nrcad+' localizată — se caută forma cadastrală…');
    goToLocation(lat, lng, 'Parcela '+nrcad);
  }
}

function doANCPIZona(){ doLoadLocalParcels(); }

function doClearParcels(){
  clearSource('parcel-src');
  S.cadData={features:[]};
  S.cadHasPolygons=false;
  const elC=document.getElementById('cadastru-status');
  if(elC) elC.textContent='Parcele șterse. Apasă "Parcele din zonă" pentru reîncărcare.';
  ss('Parcele șterse. Folosiți "Parcele din zonă" pentru a reîncărca.');
}
