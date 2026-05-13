// ═══════════════════════════════════════════════════════════════════════════
// 10-studies-terrain.js — Motor curbe de nivel + AACR universal
// UrbanX TSS·FG
//
// Funcții:
//   _getElevGrid(lat, lon, radiusM, gridN) → grid elevații din Mapbox terrain-RGB
//   _drawContourPdf(pdf, grid, bbox, pdfX, pdfY, pdfW, pdfH, opts)
//   _calcAACROLS(parcelLat, parcelLon, elevTeren, aedisH) → OLS per aeroport real
//   AIRPORTS_RO — baza de date praguri piste, toate aeroporturile comerciale RO
//
// Copyright (c) 2024–2026 ThinkSmart Solutions SRL — Toate drepturile rezervate
// Proprietar: Florin Georgescu | contact@urbanx.ro | urbanx.ro | Utilizare conform LICENSE.

// Surse:
//   - Mapbox Terrain-RGB tiles (mapbox.terrain-rgb) — gratuit cu token Mapbox
//   - OpenTopoData EU-DEM 25m (Copernicus) — fallback gratuit, global
//   - ICAO Annex 14 ed.9 (2022) + AIP Romania (romatsa.ro)
//   - HG 930/2016 + Legea 233/2016 (Codul Aerian Civil al României)
// ═══════════════════════════════════════════════════════════════════════════
// UrbanX TSS·FG — Studies Terrain — Curbe nivel + AACR Universal
// Copyright (c) 2024–2026 ThinkSmart Solutions SRL — Toate drepturile rezervate
// Proprietar: ThinkSmart Solutions SRL | contact@urbanx.ro | urbanx.ro
// Utilizare exclusiv conform termenilor de licență UrbanX. Redistribuire interzisă.

// ─────────────────────────────────────────────────────────────────────────────
// BAZA DATE AEROPORTURI ROMÂNE — piste, praguri, elevații
// Sursa: AIP Romania (romatsa.ro) + EUROCONTROL + AACR (aacr.ro)
// Actualizată: 2025. Se actualizează la schimbarea AIP-ului ROMATSA.
// ─────────────────────────────────────────────────────────────────────────────
window.AIRPORTS_RO = [
  {
    cod:'LROP', ICAO:'LROP', nume:'Henri Coandă București',
    lat:44.5711, lon:26.0850, elev_m:95, elev_ft:312,
    piste:[
      {id:'08R/26L', lungime:3500, lat_08:44.5711,lon_08:26.0850, lat_26:44.5711,lon_26:26.1320, curs_08:83, curs_26:263},
      {id:'08L/26R', lungime:3100, lat_08:44.5625,lon_08:26.0820, lat_26:44.5625,lon_26:26.1250, curs_08:83, curs_26:263},
    ],
    cod_icao_aeroport:4, // cod 4E — piste ≥ 1800m, avion cod E
    sursa:'AIP Romania AD 2 LROP + EUROCONTROL EAD 2024',
  },
  {
    cod:'LRTR', ICAO:'LRTR', nume:'Traian Vuia Timișoara',
    lat:45.8096, lon:21.3379, elev_m:88, elev_ft:289,
    piste:[
      {id:'11/29', lungime:2500, lat_08:45.8096,lon_08:21.3379, lat_26:45.7921,lon_26:21.3749, curs_08:113, curs_26:293},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LRTR 2024',
  },
  {
    cod:'LRCJ', ICAO:'LRCJ', nume:'Avram Iancu Cluj-Napoca',
    lat:46.7852, lon:23.6862, elev_m:408, elev_ft:1340,
    piste:[
      {id:'08/26', lungime:2000, lat_08:46.7852,lon_08:23.6862, lat_26:46.7852,lon_26:23.7230, curs_08:83, curs_26:263},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LRCJ 2024',
  },
  {
    cod:'LRIA', ICAO:'LRIA', nume:'Iași',
    lat:47.1783, lon:27.6194, elev_m:121, elev_ft:397,
    piste:[
      {id:'08/26', lungime:2400, lat_08:47.1783,lon_08:27.6199, lat_26:47.1730,lon_26:27.6470, curs_08:83, curs_26:263},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LRIA 2024',
  },
  {
    cod:'LRBS', ICAO:'LRBS', nume:'Sibiu',
    lat:45.7856, lon:24.0913, elev_m:444, elev_ft:1457,
    piste:[
      {id:'09/27', lungime:2100, lat_08:45.7856,lon_08:24.0913, lat_26:45.7856,lon_26:24.1280, curs_08:93, curs_26:273},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LRBS 2024',
  },
  {
    cod:'LRCK', ICAO:'LRCK', nume:'Mihail Kogălniceanu Constanța',
    lat:44.3622, lon:28.4883, elev_m:131, elev_ft:430,
    piste:[
      {id:'09/27', lungime:3500, lat_08:44.3622,lon_08:28.4883, lat_26:44.3622,lon_26:28.5410, curs_08:93, curs_26:273},
      {id:'04/22', lungime:2200, lat_08:44.3700,lon_08:28.4960, lat_26:44.3390,lon_26:28.5200, curs_08:43, curs_26:223},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LRCK 2024',
  },
  {
    cod:'LRBC', ICAO:'LRBC', nume:'George Enescu Bacău',
    lat:46.5219, lon:26.9102, elev_m:186, elev_ft:610,
    piste:[
      {id:'08/26', lungime:2400, lat_08:46.5219,lon_08:26.9102, lat_26:46.5219,lon_26:26.9370, curs_08:83, curs_26:263},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LRBC 2024',
  },
  {
    cod:'LRSB', ICAO:'LRSB', nume:'Suceava Salcea',
    lat:47.6875, lon:26.3541, elev_m:374, elev_ft:1228,
    piste:[
      {id:'08/26', lungime:2200, lat_08:47.6875,lon_08:26.3541, lat_26:47.6875,lon_26:26.3810, curs_08:83, curs_26:263},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LRSB 2024',
  },
  {
    cod:'LROD', ICAO:'LROD', nume:'Oradea',
    lat:47.0253, lon:21.9025, elev_m:131, elev_ft:430,
    piste:[
      {id:'08/26', lungime:2000, lat_08:47.0253,lon_08:21.9025, lat_26:47.0253,lon_26:21.9291, curs_08:83, curs_26:263},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LROD 2024',
  },
  {
    cod:'LRTM', ICAO:'LRTM', nume:'Transilvania Târgu Mureș',
    lat:46.4673, lon:24.4128, elev_m:479, elev_ft:1572,
    piste:[
      {id:'08/26', lungime:2400, lat_08:46.4673,lon_08:24.4128, lat_26:46.4673,lon_26:24.4468, curs_08:83, curs_26:263},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LRTM 2024',
  },
  {
    cod:'LROS', ICAO:'LROS', nume:'Satu Mare',
    lat:47.7033, lon:22.8857, elev_m:122, elev_ft:400,
    piste:[
      {id:'08/26', lungime:2000, lat_08:47.7033,lon_08:22.8857, lat_26:47.7033,lon_26:22.9127, curs_08:83, curs_26:263},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LROS 2024',
  },
  {
    cod:'LRAR', ICAO:'LRAR', nume:'Arad',
    lat:46.1762, lon:21.2620, elev_m:97, elev_ft:317,
    piste:[
      {id:'09/27', lungime:2000, lat_08:46.1762,lon_08:21.2620, lat_26:46.1762,lon_26:21.2920, curs_08:93, curs_26:273},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LRAR 2024',
  },
  {
    cod:'LRCV', ICAO:'LRCV', nume:'Craiova',
    lat:44.3181, lon:23.8886, elev_m:192, elev_ft:630,
    piste:[
      {id:'09/27', lungime:2500, lat_08:44.3181,lon_08:23.8886, lat_26:44.3181,lon_26:23.9250, curs_08:93, curs_26:273},
    ],
    cod_icao_aeroport:4,
    sursa:'AIP Romania AD 2 LRCV 2024',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GĂSIRE AEROPORT CEL MAI APROPIAT + CALCUL OLS ICAO
// ─────────────────────────────────────────────────────────────────────────────
window._calcAACROLS = function(parcelLat, parcelLon, elevTeren_m, aedisH_m){
  const cosLat = Math.cos(parcelLat * Math.PI / 180);

  // Calculăm distanța față de FIECARE prag al fiecărei piste
  let bestAirport = null, bestPista = null, distMinPrag = Infinity;
  let bestPragLat = 0, bestPragLon = 0, bestPragLabel = '';

  AIRPORTS_RO.forEach(apt => {
    apt.piste.forEach(pista => {
      // Threshold 08 (sau echivalent)
      [[pista.lat_08, pista.lon_08, pista.id.split('/')[0]],
       [pista.lat_26, pista.lon_26, pista.id.split('/')[1]]].forEach(([pLat, pLon, pLabel]) => {
        const dx = (pLon - parcelLon) * 111319.9 * cosLat;
        const dy = (pLat - parcelLat) * 111319.9;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < distMinPrag){
          distMinPrag = dist; bestAirport = apt; bestPista = pista;
          bestPragLat = pLat; bestPragLon = pLon; bestPragLabel = pLabel;
        }
      });
    });
  });

  if(!bestAirport) return { error:'Niciun aeroport găsit', hMaxSol:999, conform:true };

  // Distanța față de ARP (Airport Reference Point)
  const dxARP = (bestAirport.lon - parcelLon) * 111319.9 * cosLat;
  const dyARP = (bestAirport.lat - parcelLat) * 111319.9;
  const distARP = Math.sqrt(dxARP*dxARP + dyARP*dyARP);

  const elevARP = bestAirport.elev_m;
  const distPrag = distMinPrag; // față de pragul cel mai apropiat

  // ── ICAO Annex 14 ed.9 (2022) Tab. 4-1 — Cod 4 (lungime pistă ≥ 1800m) ──
  let hMaxAMSL = 9999, suprafata = '', formula = '';

  if(distPrag < 60){
    hMaxAMSL = elevARP;
    suprafata = 'Zonă de siguranță prag pistă (<60m) — INTERZIS';
    formula = 'H_max = elev. prag = ' + elevARP + 'm AMSL';

  } else if(distARP <= 4000){
    // Suprafața orizontală internă: 45m/ARP, raza 4000m
    const hOrizInt = elevARP + 45;
    // Suprafața de abordare: pantă 2% de la prag
    const hAbordare = elevARP + distPrag * 0.02;
    hMaxAMSL = Math.min(hOrizInt, hAbordare);
    suprafata = hAbordare < hOrizInt
      ? 'Suprafața de abordare (pantă 2%, ICAO Tab.4-1)'
      : 'Suprafața orizontală internă (45m/4000m ARP)';
    formula = `min(${elevARP}+45, ${elevARP}+${distPrag.toFixed(0)}×0.02) = ${hMaxAMSL.toFixed(1)}m AMSL`;

  } else if(distARP <= 7000){
    // Suprafața conică: 5%, de la 4000m la 7000m față de OHS
    const hConica = elevARP + 45 + (distARP - 4000) * 0.05;
    const hAbordare = elevARP + distPrag * 0.02;
    hMaxAMSL = Math.min(hConica, hAbordare);
    suprafata = 'Suprafața conică ICAO (5%, 4000-7000m de la OHS)';
    formula = `${elevARP}+45+(${distARP.toFixed(0)}-4000)×0.05 = ${hMaxAMSL.toFixed(1)}m AMSL`;

  } else if(distPrag <= 15000){
    // Dincolo de suprafața conică, dar în suprafața de abordare
    hMaxAMSL = elevARP + distPrag * 0.02;
    suprafata = 'Suprafața de abordare (dincolo de conică, <15km)';
    formula = `${elevARP}+${distPrag.toFixed(0)}×0.02 = ${hMaxAMSL.toFixed(1)}m AMSL`;

  } else {
    hMaxAMSL = 9999;
    suprafata = 'Fără restricție AACR (dist. >15km de prag)';
    formula = 'Depășit limita suprafețelor OLS — fără restricție';
  }

  const hMaxSol = hMaxAMSL < 9999 ? Math.max(0, hMaxAMSL - elevTeren_m) : 9999;
  const isConform = aedisH_m <= hMaxSol || hMaxAMSL >= 9999;
  const marja = isConform ? +(hMaxSol - aedisH_m).toFixed(1) : +(aedisH_m - hMaxSol).toFixed(1);

  return {
    aeroport: bestAirport, pista: bestPista,
    distPrag_m: +distPrag.toFixed(0), distARP_m: +distARP.toFixed(0),
    pragLabel: bestPragLabel, elevARP,
    hMaxAMSL: +hMaxAMSL.toFixed(1), hMaxSol: +hMaxSol.toFixed(1),
    suprafata, formula, isConform, marja,
    sursa: 'ICAO Annex 14 ed.9 (2022) + AIP Romania + HG 930/2016',
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// GRILĂ ELEVAȚII DIN MAPBOX TERRAIN-RGB
// Un singur tile 256×256 = ~2.5km×2.5km la zoom 14 — fără apeluri suplimentare
// ─────────────────────────────────────────────────────────────────────────────
window._getElevGrid = async function(centerLat, centerLon, radiusM, gridN){
  gridN = gridN || 16; // implicit 16×16 = 256 puncte
  radiusM = radiusM || 300;

  // Alegem zoom-ul: mai mare zoom = rezoluție mai bună
  const zoom = radiusM < 200 ? 16 : radiusM < 500 ? 15 : radiusM < 1200 ? 14 : 13;

  const token = (typeof mapboxgl !== 'undefined' && mapboxgl.accessToken) || '';
  if(!token) return _getElevGridFallback(centerLat, centerLon, radiusM, gridN);

  const tile = _latLonToTile(centerLat, centerLon, zoom);
  const url  = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${zoom}/${tile.x}/${tile.y}.pngraw?access_token=${token}`;

  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try{
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx    = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, 256, 256);

        // Convertim bbox tile → coordonate geografice
        const tileBbox = _tileToBBoxGeo(tile.x, tile.y, zoom);
        const tileW_deg = tileBbox.maxLon - tileBbox.minLon;
        const tileH_deg = tileBbox.maxLat - tileBbox.minLat;

        // Calculăm centrul parcelei în pixel tile
        const cPx = Math.round((centerLon - tileBbox.minLon) / tileW_deg * 256);
        const cPy = Math.round((tileBbox.maxLat - centerLat) / tileH_deg * 256);

        // Raza în pixeli
        const cosLat = Math.cos(centerLat * Math.PI / 180);
        const mPerDeg_lon = 111319.9 * cosLat;
        const mPerDeg_lat = 111319.9;
        const pxPerM_x = 256 / (tileW_deg * mPerDeg_lon);
        const pxPerM_y = 256 / (tileH_deg * mPerDeg_lat);
        const rPx_x = Math.ceil(radiusM * pxPerM_x);
        const rPx_y = Math.ceil(radiusM * pxPerM_y);

        // Grilă centrată pe parcelă, gridN×gridN puncte
        const grid    = [];
        const latGrid = [];
        const lonGrid = [];

        for(let gy = 0; gy < gridN; gy++){
          const row=[], latRow=[], lonRow=[];
          for(let gx = 0; gx < gridN; gx++){
            const px = Math.max(0, Math.min(255, Math.round(cPx - rPx_x + (gx / (gridN-1)) * 2*rPx_x)));
            const py = Math.max(0, Math.min(255, Math.round(cPy - rPx_y + (gy / (gridN-1)) * 2*rPx_y)));
            const idx = (py * 256 + px) * 4;
            const R = imageData.data[idx], G = imageData.data[idx+1], B = imageData.data[idx+2];
            const elev = -10000 + (R*65536 + G*256 + B) * 0.1;
            row.push( +(Math.round(elev*10)/10) );
            latRow.push( tileBbox.maxLat - py/256 * tileH_deg );
            lonRow.push( tileBbox.minLon + px/256 * tileW_deg );
          }
          grid.push(row); latGrid.push(latRow); lonGrid.push(lonRow);
        }

        // Bounding box real al grilei
        const bbox = {
          minLat: tileBbox.maxLat - (cPy+rPx_y)/256*tileH_deg,
          maxLat: tileBbox.maxLat - (cPy-rPx_y)/256*tileH_deg,
          minLon: tileBbox.minLon + (cPx-rPx_x)/256*tileW_deg,
          maxLon: tileBbox.minLon + (cPx+rPx_x)/256*tileW_deg,
        };

        // Statistici
        const allVals = grid.flat();
        const elevMin = Math.min(...allVals), elevMax = Math.max(...allVals);
        const elevMed = +(allVals.reduce((a,b)=>a+b,0)/allVals.length).toFixed(1);

        resolve({ grid, latGrid, lonGrid, bbox, zoom,
                  elevMin, elevMax, elevMed, gridN, radiusM,
                  source:'Mapbox Terrain-RGB (mapbox.terrain-rgb, zoom '+zoom+')',
                  resolution_m: +(radiusM*2/gridN).toFixed(1) });
      } catch(e){ resolve(_getElevGridFallback(centerLat, centerLon, radiusM, gridN)); }
    };
    img.onerror = () => resolve(_getElevGridFallback(centerLat, centerLon, radiusM, gridN));
    img.src = url;
    setTimeout(() => resolve(_getElevGridFallback(centerLat, centerLon, radiusM, gridN)), 10000);
  });
};

// Fallback: OpenTopoData batch (max 100 puncte = 10×10 grilă)
async function _getElevGridFallback(lat, lon, radiusM, gridN){
  gridN = Math.min(gridN||10, 10); // max 10×10 = 100 puncte (limita API)
  const cosLat = Math.cos(lat * Math.PI / 180);
  const dLat = radiusM / 111319.9;
  const dLon = radiusM / (111319.9 * cosLat);

  const pts = [];
  for(let gy=0; gy<gridN; gy++)
    for(let gx=0; gx<gridN; gx++){
      const pLat = lat - dLat + gy * 2*dLat/(gridN-1);
      const pLon = lon - dLon + gx * 2*dLon/(gridN-1);
      pts.push({lat:+pLat.toFixed(6), lon:+pLon.toFixed(6)});
    }

  try{
    const locStr = pts.map(p=>`${p.lat},${p.lon}`).join('|');
    const url = `https://api.opentopodata.org/v1/eudem25m?locations=${locStr}`;
    const resp = await fetch(url, {signal: AbortSignal.timeout(12000)});
    const data = await resp.json();
    if(data.status==='OK' && data.results?.length === pts.length){
      const grid = [], latGrid = [], lonGrid = [];
      let allVals = [];
      for(let gy=0; gy<gridN; gy++){
        const row=[], latRow=[], lonRow=[];
        for(let gx=0; gx<gridN; gx++){
          const e = data.results[gy*gridN+gx]?.elevation||0;
          row.push(+(Math.round(e*10)/10));
          latRow.push(pts[gy*gridN+gx].lat);
          lonRow.push(pts[gy*gridN+gx].lon);
          allVals.push(e);
        }
        grid.push(row); latGrid.push(latRow); lonGrid.push(lonRow);
      }
      return { grid, latGrid, lonGrid, gridN, radiusM,
               bbox:{minLat:lat-dLat,maxLat:lat+dLat,minLon:lon-dLon,maxLon:lon+dLon},
               elevMin:Math.min(...allVals), elevMax:Math.max(...allVals),
               elevMed:+(allVals.reduce((a,b)=>a+b,0)/allVals.length).toFixed(1),
               source:'OpenTopoData EU-DEM 25m (Copernicus)', resolution_m:+(radiusM*2/gridN).toFixed(1) };
    }
  }catch(e){}
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSIE TILE → BBOX GEOGRAFICĂ
// ─────────────────────────────────────────────────────────────────────────────
window._tileToBBoxGeo = function(x, y, z){
  const n = Math.PI - 2*Math.PI*y / Math.pow(2,z);
  const maxLat = 180/Math.PI * Math.atan(0.5*(Math.exp(n)-Math.exp(-n)));
  const n2 = Math.PI - 2*Math.PI*(y+1)/Math.pow(2,z);
  const minLat = 180/Math.PI * Math.atan(0.5*(Math.exp(n2)-Math.exp(-n2)));
  const minLon = x/Math.pow(2,z)*360 - 180;
  const maxLon = (x+1)/Math.pow(2,z)*360 - 180;
  return {minLat, maxLat, minLon, maxLon};
};

// ─────────────────────────────────────────────────────────────────────────────
// DESENARE CURBE DE NIVEL ÎN PDF — Marching Squares
// ─────────────────────────────────────────────────────────────────────────────
window._drawContourPdf = function(pdf, elevGrid, pdfX, pdfY, pdfW, pdfH, opts){
  opts = opts || {};
  const grid   = elevGrid.grid;
  const gridN  = elevGrid.gridN;
  const eMin   = elevGrid.elevMin, eMax = elevGrid.elevMax;
  const eRange = eMax - eMin;
  if(gridN < 2 || eRange < 0.5) return; // teren plat — nimic de desenat

  // Interval curbe (adaptat la range)
  const interval = eRange > 50 ? 10 : eRange > 20 ? 5 : eRange > 10 ? 2 : 1;
  // Curbe majore la 5× interval
  const majorInterval = interval * 5;

  // Paleta culori (verde→galben→portocaliu→maro)
  const elevToColor = (e) => {
    const t = (e - eMin) / Math.max(1, eRange);
    if(t < 0.33) return [0, Math.round(120 + t*3*80), 60];
    if(t < 0.66) return [Math.round((t-0.33)*3*180), 160, 20];
    return [160+Math.round((t-0.66)*3*60), Math.round(160-(t-0.66)*3*100), 10];
  };

  // Scalare grid → PDF
  const scaleX = (gx) => pdfX + (gx / (gridN-1)) * pdfW;
  const scaleY = (gy) => pdfY + (gy / (gridN-1)) * pdfH;

  // Marching Squares — pentru fiecare nivel de cotă
  const firstLevel = Math.ceil(eMin / interval) * interval;
  const lastLevel  = Math.floor(eMax / interval) * interval;

  for(let level = firstLevel; level <= lastLevel; level += interval){
    const isMajor = (level % majorInterval < 0.01);
    const col = elevToColor(level);
    pdf.setDrawColor(...col);
    pdf.setLineWidth(isMajor ? 0.35 : 0.15);

    // Parcurgem celulele grilei
    for(let gy = 0; gy < gridN-1; gy++){
      for(let gx = 0; gx < gridN-1; gx++){
        const v00 = grid[gy][gx],   v10 = grid[gy][gx+1];
        const v01 = grid[gy+1][gx], v11 = grid[gy+1][gx+1];

        // Bitmask: 1 dacă valoarea > level
        const idx = ((v00>level)?8:0)|((v10>level)?4:0)|((v11>level)?2:0)|((v01>level)?1:0);
        if(idx===0||idx===15) continue; // celulă complet în/out

        // Interpolare liniară pe muchii
        const lerp=(a,b,t)=>a+(b-a)*t;
        const li=(a,b)=>level===a&&level===b?0.5:(b-a===0?0.5:(level-a)/(b-a));

        const x0=scaleX(gx), x1=scaleX(gx+1);
        const y0=scaleY(gy), y1=scaleY(gy+1);

        // Punctele de intersecție pe muchii (N,E,S,W)
        const tN=li(v00,v10), tE=li(v10,v11), tS=li(v01,v11), tW=li(v00,v01);
        const N={x:lerp(x0,x1,tN),y:y0}, E={x:x1,y:lerp(y0,y1,tE)};
        const S={x:lerp(x0,x1,tS),y:y1}, W={x:x0,y:lerp(y0,y1,tW)};

        // Lookup tabel Marching Squares → segmente
        const segs = {
          1:[W,S],2:[S,E],3:[W,E],4:[E,N],5:[W,N,E,S], // 5 = ambiguu, simplificat
          6:[S,N],7:[W,N],8:[N,W],9:[N,S],10:[S,W,N,E],
          11:[N,E],12:[E,W],13:[S,E],14:[W,S] // simetrii
        };
        const pts = segs[idx];
        if(pts){
          for(let i=0;i<pts.length;i+=2){
            if(pts[i]&&pts[i+1])
              pdf.line(pts[i].x, pts[i].y, pts[i+1].x, pts[i+1].y);
          }
        }
      }
    }

    // Etichetă pe curbe majore (la mijlocul unui segment aleator)
    if(isMajor && opts.labels !== false){
      // Plasăm eticheta la colțul dreapta-sus al zonei
      const lblX = pdfX + pdfW * 0.85;
      const lblY = pdfY + (level-eMin)/Math.max(1,eRange) * pdfH;
      if(lblY > pdfY+3 && lblY < pdfY+pdfH-3){
        pdf.setTextColor(...col);
        pdf.setFontSize(5.5);
        pdf.setFont('helvetica','bold');
        pdf.text(level.toFixed(0)+'m', lblX, lblY);
      }
    }
  }

  // Bordura cadrului curbe
  pdf.setDrawColor(100,120,140); pdf.setLineWidth(0.3);
  pdf.rect(pdfX, pdfY, pdfW, pdfH, 'S');

  // Legendă compactă
  pdf.setTextColor(60,80,100); pdf.setFontSize(5.5); pdf.setFont('helvetica','normal');
  pdf.text('Curbe nivel: interval '+interval+'m · '+
           elevGrid.source.split(' (')[0]+' · Min='+eMin.toFixed(0)+'m Max='+eMax.toFixed(0)+'m AMSL',
    pdfX+2, pdfY+pdfH+4);
};

// ─────────────────────────────────────────────────────────────────────────────
// GENERARE PLAN TOPOGRAFIC COMPLET PENTRU PDF
// Combină: curbe de nivel + parcelă + direcție N + scară
// ─────────────────────────────────────────────────────────────────────────────
window._drawTopoMap = async function(pdf, ap, pdfX, pdfY, pdfW, pdfH, opts){
  opts = opts||{};
  let lat=45.9, lon=24.9;
  try{
    if(ap?.geo?.geometry){
      const c=typeof turf!=='undefined'
        ?turf.centerOfMass(ap.geo).geometry.coordinates
        :ap.geo.geometry.coordinates[0][0];
      if(!isNaN(c[0])){ lon=c[0]; lat=c[1]; }
    }
  }catch(e){}

  const radiusM = opts.radiusM || 300;

  // Fundal hartă
  pdf.setFillColor(235,242,228); pdf.rect(pdfX,pdfY,pdfW,pdfH,'F');
  pdf.setFillColor(220,232,215); pdf.rect(pdfX,pdfY,pdfW,pdfH/2,'F');

  // Obținem grila de elevații
  const elevGrid = await _getElevGrid(lat, lon, radiusM, 20);
  if(elevGrid){
    _drawContourPdf(pdf, elevGrid, pdfX, pdfY, pdfW, pdfH-6, {labels:true});
  } else {
    pdf.setTextColor(150,150,150); pdf.setFontSize(7);
    pdf.text('Date topografice indisponibile (token Mapbox lipsă sau API offline)',
      pdfX+pdfW/2, pdfY+pdfH/2, {align:'center'});
  }

  // Parcelă (contur) centrată
  if(ap?.geo?.geometry && typeof turf!=='undefined'){
    try{
      const ring = ap.geo.geometry.type==='Polygon'
        ? ap.geo.geometry.coordinates[0]
        : ap.geo.geometry.coordinates[0][0];
      const cosLat = Math.cos(lat*Math.PI/180);
      const bbox = elevGrid?.bbox||{minLat:lat-0.003,maxLat:lat+0.003,minLon:lon-0.003,maxLon:lon+0.003};
      const latRange=bbox.maxLat-bbox.minLat, lonRange=bbox.maxLon-bbox.minLon;
      const toX=(lo)=>pdfX+(lo-bbox.minLon)/lonRange*pdfW;
      const toY=(la)=>pdfY+(bbox.maxLat-la)/latRange*(pdfH-6);
      const pts=ring.map(c=>({x:toX(c[0]),y:toY(c[1])}));
      pdf.setDrawColor(212,100,0); pdf.setLineWidth(0.7);
      pdf.setFillColor(255,140,0);
      try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:0.3}));}catch(e2){}
      if(pts.length>2){
        pdf.lines(pts.slice(1).map((p,i)=>[p.x-pts[i].x,p.y-pts[i].y]),pts[0].x,pts[0].y,null,'FD');
      }
      try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:1}));}catch(e2){}
    }catch(e){}
  }

  // Nord
  const nX=pdfX+pdfW-8, nY=pdfY+10;
  pdf.setFillColor(4,12,28); pdf.setDrawColor(100,120,140); pdf.setLineWidth(0.3);
  try{pdf.circle(nX,nY,5,'FD');}catch(e){}
  pdf.setFillColor(210,40,40); try{pdf.triangle(nX,nY-4,nX-2,nY,nX+2,nY,'F');}catch(e){}
  pdf.setFillColor(220,225,235); try{pdf.triangle(nX,nY+4,nX-2,nY,nX+2,nY,'F');}catch(e){}
  pdf.setTextColor(210,40,40); pdf.setFontSize(5.5); pdf.setFont('helvetica','bold');
  pdf.text('N',nX,nY-5.5,{align:'center'});

  // Scară (dacă avem info Mapbox)
  if(elevGrid?.source?.includes('Mapbox')){
    const zoom=elevGrid.zoom||14;
    const sc=typeof _mapboxScale==='function'?_mapboxScale(lat,zoom):{barM:100,barLabel:'100m',scaleLabel:'1:—'};
    const barPx = Math.min(pdfW*0.3, 25);
    const bx=pdfX+3, by=pdfY+pdfH-9;
    pdf.setFillColor(255,255,255); pdf.rect(bx,by,barPx,3,'F');
    pdf.setFillColor(0,0,0); pdf.rect(bx,by,barPx/2,3,'F');
    pdf.setDrawColor(0); pdf.setLineWidth(0.2); pdf.rect(bx,by,barPx,3,'S');
    pdf.setTextColor(20,30,50); pdf.setFontSize(5); pdf.setFont('helvetica','normal');
    pdf.text('0',bx,by+5.5); pdf.text(sc.barLabel,bx+barPx,by+5.5,{align:'right'});
    pdf.text(sc.scaleLabel,bx+barPx/2,by-1.5,{align:'center'});
  }

  if(elevGrid) return elevGrid;
  return null;
};

console.log('[Terrain] ✅ Motor curbe nivel + AACR universal încărcat · ' +
  AIRPORTS_RO.length + ' aeroporturi RO · ' + new Date().toLocaleDateString('ro-RO'));
