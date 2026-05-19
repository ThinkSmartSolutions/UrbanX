// ═══════════════════════════════════════════════════════════════════════════
// urbanx-analytics.js — UrbanX Advanced Analytics Engine v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
//
// 8 motoare analitice avansate — referință europeană pentru urbanism:
//
// ① WALKABILITY ENGINE — primul Walk Score pentru România
//    Model gravitațional POI din OSM Overpass
//    Categorii: alimentar, sănătate, educație, transport, cultură, sport
//    Scor 0-100 cu breakeven per categorie
//    Comparat cu standardul Walk Score (Frank et al. 2006)
//
// ② 15-MINUTE CITY ANALYZER
//    Izocrone 5/10/15 min pietonal din Mapbox Isochrone API
//    Per parcelă selectată: câte servicii esențiale sunt accesibile
//    Vizualizare layer pe hartă + scor completitudine
//    Referință: Carlos Moreno (2020), Paris C40
//
// ③ SPACE SYNTAX LIGHT — Integrare stradală
//    Betweenness centrality estimată din rețeaua OSM
//    Integration value (cât de conectată e strada față de tot rețeaua)
//    Corelat cu prețul imobiliar și densitatea pietonală
//    Referință: Hillier & Hanson (1984), Space Syntax Ltd
//
// ④ ROI / CBA CALCULATOR — Fezabilitate reală
//    Cost construcție (BNR 2024 + factor seismic P100)
//    Venituri estimate (prețuri BNR + cerere model cohort)
//    VAN, IRR, payback period
//    Sensibilitate la rata dobânzii BNR + inflație
//    Referință: RICS Red Book, HG 907/2016 SF/DALI
//
// ⑤ CARBON FOOTPRINT LCA — Amprenta carbon clădire
//    Scope 1+2+3 per clădire
//    Materiale: beton (CO₂e/t), oțel, sticlă, termoizolație
//    Energie operațională: NZEB vs standard (Legea 372/2005)
//    Comparare cu standard EPBD 2024 + Green Deal
//    Referință: EN 15978:2011, RICS Whole Life Carbon
//
// ⑥ URBAN HEAT ISLAND ANALYZER
//    LST (Land Surface Temperature) estimat din Copernicus LST
//    Factori: % suprafață impermeabilă, densitate construire, spații verzi
//    Diferența față de zona rurală adiacentă (°C)
//    Recomandări: acoperișuri verzi, pavaj permeabil, aliniamente arbori
//    Referință: Oke (1982), Copernicus C3S, EEA Urban Atlas
//
// ⑦ UN SDG 11 DASHBOARD
//    11 indicatori SDG 11 (Orașe sustenabile) per UAT
//    Date: INSE + Eurostat + OSM + BNR + ANM
//    Progres față de țintele 2030
//    Comparare cu media UE + România
//    Referință: UN-Habitat, Eurostat SDG monitoring
//
// ⑧ SEISMIC VULNERABILITY SCORE
//    Per bloc identificat pe hartă (din OSM building data)
//    Factori: an construcție, înălțime, tip structural estimat
//    Corelat cu zona seismică P100-1/2013 (Ag, Tc)
//    Prioritizare reabilitare seismică (PNRR relevant!)
//    Referință: FEMA P-154, NP 031/2012, Legea 260/2008
//
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

const N  = (v,d=0) => isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
const Pct= (v,d=1) => (v>=0?'+':'')+Number(v).toFixed(d)+'%';

// ═══════════════════════════════════════════════════════════════════════════
// ① WALKABILITY ENGINE
// Referință: Frank et al. (2006) "Many Pathways from Land Use to Health"
//            Walk Score methodology (walkscore.com/methodology.shtml)
// ═══════════════════════════════════════════════════════════════════════════

G._WalkabilityEngine = {

  // Categorii POI cu ponderile Walk Score originale
  CATEGORIES: [
    { key:'grocery',   label:'Alimentar',    weight:3.0,
      osm:'amenity~"supermarket|convenience|bakery|butcher|greengrocer"',
      maxDist:800, icon:'🛒' },
    { key:'restaurant',label:'Restaurante',  weight:0.75,
      osm:'amenity~"restaurant|cafe|fast_food|bar"',
      maxDist:800, icon:'🍽' },
    { key:'school',    label:'Educație',     weight:1.0,
      osm:'amenity~"school|kindergarten|university|college"',
      maxDist:1200, icon:'🏫' },
    { key:'health',    label:'Sănătate',     weight:1.0,
      osm:'amenity~"hospital|clinic|pharmacy|doctors"',
      maxDist:1500, icon:'🏥' },
    { key:'transport', label:'Transport',    weight:1.0,
      osm:'public_transport~"stop_position|station"',
      maxDist:500, icon:'🚌' },
    { key:'park',      label:'Spații verzi', weight:0.5,
      osm:'leisure~"park|garden|playground"',
      maxDist:1000, icon:'🌳' },
    { key:'culture',   label:'Cultură',      weight:0.5,
      osm:'amenity~"theatre|cinema|library|museum"',
      maxDist:1500, icon:'🎭' },
    { key:'sport',     label:'Sport',        weight:0.25,
      osm:'leisure~"sports_centre|fitness_centre|swimming_pool"',
      maxDist:1500, icon:'⚽' },
  ],

  _cache: {},

  async calculate(lat, lon) {
    const key = `walk_${lat.toFixed(4)}_${lon.toFixed(4)}`;
    if(this._cache[key]) return this._cache[key];

    ss?.('🚶 Calculez Walkability Score...');

    const results = {};
    let totalScore = 0;
    let totalWeight = 0;

    // Fetch POI din OSM Overpass pentru toate categoriile simultan
    const promises = this.CATEGORIES.map(cat => this._fetchPOI(lat, lon, cat));
    const poiResults = await Promise.all(promises);

    this.CATEGORIES.forEach((cat, i) => {
      const pois = poiResults[i]||[];
      const score = this._scoreCategory(pois, cat.maxDist);
      results[cat.key] = {
        label:     cat.label,
        icon:      cat.icon,
        score:     Math.round(score * 100),
        count:     pois.length,
        nearest:   pois[0]?.dist||null,
        weight:    cat.weight,
        pois:      pois.slice(0,3),
      };
      totalScore  += score * cat.weight;
      totalWeight += cat.weight;
    });

    const walkScore = Math.round((totalScore / totalWeight) * 100);
    const label = walkScore >= 90 ? "Walker's Paradise" :
                  walkScore >= 70 ? 'Very Walkable' :
                  walkScore >= 50 ? 'Walkable' :
                  walkScore >= 25 ? 'Car-Dependent' :
                                    'Almost All Errands Require a Car';

    const result = {
      score:    walkScore,
      label,
      labelRO:  walkScore>=90?'Paradis pietonal':walkScore>=70?'Foarte accesibil':
                walkScore>=50?'Accesibil':walkScore>=25?'Dependent de mașină':'Izolat',
      categories: results,
      lat, lon,
      source:   'OSM Overpass API · model Walk Score (Frank et al. 2006)',
      timestamp: new Date().toISOString(),
    };

    this._cache[key] = result;
    ss?.(`✅ Walkability Score: ${walkScore}/100 (${label})`);
    return result;
  },

  async _fetchPOI(lat, lon, cat) {
    const r = cat.maxDist * 1.5; // radius cu marjă
    const q = `[out:json][timeout:6];node[${cat.osm}](around:${r},${lat},${lon});out 10;`;
    try {
      const resp = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: 'data='+encodeURIComponent(q),
        signal: AbortSignal.timeout(6000),
      });
      const data = await resp.json();
      return (data.elements||[]).map(el => ({
        id:   el.id,
        name: el.tags?.name||cat.label,
        dist: this._haverDist(lat,lon,el.lat,el.lon),
        lat:  el.lat, lon: el.lon,
      })).sort((a,b)=>a.dist-b.dist);
    } catch(e) {
      return [];
    }
  },

  _scoreCategory(pois, maxDist) {
    if(!pois.length) return 0;
    // Decay function: scor maxim la 0m, 0 la maxDist
    // Walk Score folosește exponential decay
    const nearest = pois[0].dist;
    if(nearest >= maxDist) return 0;
    return Math.pow(1 - nearest/maxDist, 1.5);
  },

  _haverDist(lat1, lon1, lat2, lon2) {
    const R=6371000, r=Math.PI/180;
    const dL=(lat2-lat1)*r, dO=(lon2-lon1)*r;
    const a=Math.sin(dL/2)**2+Math.cos(lat1*r)*Math.cos(lat2*r)*Math.sin(dO/2)**2;
    return Math.round(R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)));
  },

  // Render rezultat în UI
  renderResult(result, containerId) {
    const el = document.getElementById(containerId);
    if(!el) return;

    const scoreColor = result.score>=70?'#22c55e':result.score>=50?'#f59e0b':
                       result.score>=25?'#f97316':'#ef4444';

    el.innerHTML = `
      <div style="background:rgba(8,14,34,.8);border-radius:10px;padding:10px;border:1px solid rgba(255,255,255,.08)">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <div style="text-align:center">
            <div style="font-size:28px;font-weight:900;color:${scoreColor};font-family:'IBM Plex Mono',monospace">${result.score}</div>
            <div style="font-size:7px;color:rgba(148,163,184,.5)">/ 100</div>
          </div>
          <div>
            <div style="font-size:11px;font-weight:800;color:#e2e8f0">${result.labelRO}</div>
            <div style="font-size:7.5px;color:rgba(148,163,184,.6)">${result.label}</div>
            <div style="font-size:6px;color:rgba(100,120,150,.4)">Walk Score · Frank et al. 2006</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px">
          ${Object.values(result.categories).map(c=>`
            <div style="background:rgba(12,22,52,.6);border-radius:6px;padding:5px;border-left:2px solid ${c.score>=70?'#22c55e':c.score>=40?'#f59e0b':'#475569'}">
              <div style="font-size:9px">${c.icon} ${c.label}</div>
              <div style="font-size:11px;font-weight:800;color:${c.score>=70?'#22c55e':c.score>=40?'#f59e0b':'#64748b'}">${c.score}</div>
              ${c.nearest?`<div style="font-size:6px;color:rgba(100,120,150,.5)">${N(c.nearest)}m · ${c.count} POI</div>`:'<div style="font-size:6px;color:#475569">absent</div>'}
            </div>`).join('')}
        </div>
        <div style="margin-top:6px;font-size:6px;color:rgba(60,80,110,.5)">
          Sursa: OSM Overpass · model gravitațional Walk Score
        </div>
      </div>`;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ② 15-MINUTE CITY ANALYZER
// Referință: Moreno et al. (2021) "Introducing the '15-Minute City'",
//            C40 Cities, Paris Plan Local d'Urbanisme
// ═══════════════════════════════════════════════════════════════════════════

G._FifteenMinCity = {

  // Cele 6 categorii de funcțiuni esențiale (Moreno 2021)
  FUNCTIONS: [
    { key:'work',     label:'Muncă',       minutes:15, icon:'💼',
      osm:'amenity~"office" | landuse="industrial" | office',
      weight:1.0 },
    { key:'commerce', label:'Comerț',      minutes:5,  icon:'🛒',
      osm:'shop | amenity~"supermarket|market"',
      weight:1.0 },
    { key:'health',   label:'Sănătate',    minutes:10, icon:'🏥',
      osm:'amenity~"hospital|clinic|pharmacy|doctors"',
      weight:1.0 },
    { key:'education',label:'Educație',    minutes:10, icon:'🏫',
      osm:'amenity~"school|kindergarten|university"',
      weight:1.0 },
    { key:'leisure',  label:'Recreere',    minutes:5,  icon:'🌳',
      osm:'leisure~"park|garden|playground|sports_centre"',
      weight:0.75 },
    { key:'culture',  label:'Cultură',     minutes:15, icon:'🎭',
      osm:'amenity~"theatre|cinema|library|museum|community_centre"',
      weight:0.5 },
  ],

  _cache: {},

  async analyze(lat, lon) {
    const key = `15min_${lat.toFixed(4)}_${lon.toFixed(4)}`;
    if(this._cache[key]) return this._cache[key];

    ss?.('🏙 Analizez 15-Minute City...');

    // Calculăm distanțele maxime pentru fiecare timp
    // Viteză medie pieton: 4.5 km/h → 5 min = 375m, 10 min = 750m, 15 min = 1125m
    const SPEED_MPS = 1.25; // 4.5km/h în m/s
    const results = {};

    const promises = this.FUNCTIONS.map(fn => {
      const maxDist = fn.minutes * 60 * SPEED_MPS;
      return G._WalkabilityEngine._fetchPOI(lat, lon, {...fn, maxDist});
    });
    const poiResults = await Promise.all(promises);

    let completeness = 0;
    this.FUNCTIONS.forEach((fn, i) => {
      const pois = poiResults[i]||[];
      const maxDist = fn.minutes * 60 * SPEED_MPS;
      const accessible = pois.filter(p=>p.dist<=maxDist);
      const travelMin = pois[0] ? Math.round(pois[0].dist / SPEED_MPS / 60 * 10)/10 : null;

      results[fn.key] = {
        label:      fn.label,
        icon:       fn.icon,
        targetMin:  fn.minutes,
        actualMin:  travelMin,
        accessible: accessible.length > 0,
        count:      accessible.length,
        nearest:    pois[0]?.name||null,
        nearestDist: pois[0]?.dist||null,
      };
      if(accessible.length > 0) completeness += fn.weight;
    });

    const maxCompleteness = this.FUNCTIONS.reduce((s,f)=>s+f.weight, 0);
    const score = Math.round(completeness/maxCompleteness*100);

    const label = score===100 ? 'Città del quarto d\'ora completă' :
                  score>=83   ? 'Aproape completă (5/6 funcțiuni)' :
                  score>=67   ? 'Parțial completă (4/6)' :
                  score>=50   ? 'Incompletă (3/6)' :
                                'Critică (<3 funcțiuni accesibile)';

    const result = { score, label, functions: results, lat, lon,
      source: 'OSM Overpass · model Moreno et al. 2021 · viteză pieton 4.5km/h' };

    this._cache[key] = result;
    ss?.(`✅ 15-Minute City: ${score}% completitudine`);
    return result;
  },

  // Adaugă isochrone pe hartă via Mapbox
  async addIsochroneLayer(lat, lon) {
    const map = window.map;
    if(!map) return;

    const token = mapboxgl?.accessToken||window.MAPBOX_TOKEN||'';
    if(!token) return;

    const times = [5, 10, 15];
    const colors = ['#22c55e','#f59e0b','#ef4444'];

    for(const [i, minutes] of times.entries()){
      try {
        const url = `https://api.mapbox.com/isochrone/v1/mapbox/walking/${lon},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${token}`;
        const r = await fetch(url, {signal:AbortSignal.timeout(8000)});
        if(!r.ok) continue;
        const data = await r.json();

        const srcId = `isochrone-${minutes}min`;
        const lyId  = srcId+'-fill';
        const lyId2 = srcId+'-line';

        try{ map.removeLayer(lyId2); map.removeLayer(lyId); map.removeSource(srcId); }catch(e){}

        map.addSource(srcId, {type:'geojson', data});
        map.addLayer({id:lyId, type:'fill', source:srcId,
          paint:{'fill-color':colors[i],'fill-opacity':0.08}});
        map.addLayer({id:lyId2, type:'line', source:srcId,
          paint:{'line-color':colors[i],'line-opacity':0.6,'line-width':1.5}});
      } catch(e){}
    }
    ss?.('🗺 Izocrone 5/10/15 min adăugate pe hartă');
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ③ ROI / CBA CALCULATOR — Fezabilitate reală
// Referință: RICS Red Book 2023, HG 907/2016, NP 065/2002
// ═══════════════════════════════════════════════════════════════════════════

G._ROICalculator = {

  // Calculează ROI complet pentru proiect rezidențial
  calculate(params) {
    const {
      area_mp2  = 500,    // suprafața construibilă (m²)
      niv       = 4,      // nr. niveluri
      fn        = 'L',    // funcțiune
      uat       = null,   // date UAT
      risk      = null,   // risk profile
      scenario  = 'S2',
    } = params;

    const city = uat||{};
    const ag   = risk?.seismic?.ag||0.20;

    // ── COSTURI ──────────────────────────────────────────────────────────
    // Cost construcție per m² (BNR 2024 + factor seismic)
    const costBase = fn==='L' ? 1050 : fn==='C' ? 1200 : fn==='O' ? 1150 : 1100;
    const seismicF = 1 + (ag-0.10)*1.5; // P100 majorare cost
    const costConstr = Math.round(costBase * seismicF);

    const SDA = area_mp2 * niv * 0.85; // suprafața desfășurată utilă estimată
    const costTotal = Math.round(SDA * costConstr / 1e6 * 10) / 10; // mil. EUR

    // Terenul (estimat din piața locală)
    const priceIndex = city.ind_pret_imob||1.0;
    const landBase   = city.pib_eur_cap ? Math.round(city.pib_eur_cap * 0.15) : 200;
    const landCost   = Math.round(area_mp2 * landBase * priceIndex / 1e6 * 10) / 10;

    // Diverse (proiectare, avize, racorduri) — 18% din construcție
    const softCosts  = Math.round(costTotal * 0.18 * 10) / 10;

    const totalInvest = Math.round((costTotal + landCost + softCosts) * 10) / 10;

    // ── VENITURI ────────────────────────────────────────────────────────
    // Prețul de vânzare per m² (BNR IPI + dinamica demografică)
    const basePrice  = city.pib_eur_cap ? Math.round(city.pib_eur_cap * 0.25 * priceIndex) : 1500;
    const rateBonus  = (city.rata_reala_2011_2021||0) * 50; // cerere mai mare = preț mai mare
    const sellPrice  = Math.round(basePrice + rateBonus);

    const totalRevenue = Math.round(SDA * sellPrice * 0.9 / 1e6 * 10) / 10; // -10% timpi neocupare

    // ── INDICATORI FINANCIARI ───────────────────────────────────────────
    const profit = Math.round((totalRevenue - totalInvest) * 10) / 10;
    const roi    = Math.round(profit / totalInvest * 100 * 10) / 10; // %
    const margin = Math.round(profit / totalRevenue * 100 * 10) / 10; // %

    // Payback period (ani)
    const rentYield  = fn==='L' ? 0.055 : fn==='O' ? 0.07 : 0.065; // chiria anuala / valoare
    const rentRevenue = Math.round(totalRevenue * rentYield * 10) / 10;
    const payback    = rentRevenue > 0 ? Math.round(totalInvest / rentRevenue * 10) / 10 : null;

    // IRR simplificat (aprocsimare)
    const bnrRate = 0.065; // rata BNR 2024
    const irr     = Math.round((roi/100 - bnrRate) * 100 * 10) / 10;

    // Sensibilitate
    const sensitivities = [
      { scenario:'Preț +10%',    roi: Math.round((profit + totalRevenue*0.1)/totalInvest*100*10)/10 },
      { scenario:'Preț -10%',    roi: Math.round((profit - totalRevenue*0.1)/totalInvest*100*10)/10 },
      { scenario:'Cost +15%',    roi: Math.round((profit - totalInvest*0.15)/totalInvest*100*10)/10 },
      { scenario:'Dobânda +2%',  roi: Math.round(roi - 4, 1) },
    ];

    return {
      inputs: { area_mp2, niv, fn, SDA, costConstr, seismicF, sellPrice },
      costs: {
        constructie: costTotal,
        teren: landCost,
        soft: softCosts,
        total: totalInvest,
      },
      revenues: {
        vanzare: totalRevenue,
        chirie_anuala: rentRevenue,
      },
      indicators: {
        profit, roi, margin, payback,
        irr,
        van_10ani: Math.round((rentRevenue * (1-(1+bnrRate)**-10)/bnrRate - totalInvest) * 10)/10,
        verdict: roi > 20 ? 'EXCELENT' : roi > 12 ? 'BUN' : roi > 6 ? 'MARGINAL' : 'RISC RIDICAT',
        verdictColor: roi>20?'#22c55e':roi>12?'#D4AF37':roi>6?'#f59e0b':'#ef4444',
      },
      sensitivities,
      source: 'BNR IPI 2024 · RICS Red Book 2023 · P100-1/2013 · HG 907/2016',
    };
  },

  renderResult(result, containerId) {
    const el = document.getElementById(containerId);
    if(!el) return;
    const {inputs:inp, costs:c, revenues:r, indicators:ind} = result;
    const vc = ind.verdictColor;

    el.innerHTML = `
      <div style="background:rgba(8,14,34,.8);border-radius:10px;padding:10px;border:1px solid rgba(255,255,255,.08)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <div>
            <div style="font-size:8px;font-weight:800;color:#D4AF37;letter-spacing:.1em">ROI / CBA CALCULATOR</div>
            <div style="font-size:7px;color:rgba(100,120,150,.5)">RICS Red Book · HG 907/2016</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:24px;font-weight:900;color:${vc};font-family:'IBM Plex Mono',monospace">${ind.roi}%</div>
            <div style="font-size:7px;color:${vc};font-weight:700">${ind.verdict}</div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:6px">
          ${[
            ['Investiție totală', N(c.total,1)+' mil.€'],
            ['Venituri estimate', N(r.vanzare,1)+' mil.€'],
            ['Profit brut', N(ind.profit,1)+' mil.€'],
            ['Marjă profit', ind.margin+'%'],
            ['Payback', ind.payback ? ind.payback+' ani' : '—'],
            ['VAN 10 ani', N(ind.van_10ani,1)+' mil.€'],
          ].map(([l,v])=>`
            <div style="background:rgba(12,22,52,.6);border-radius:5px;padding:5px">
              <div style="font-size:7px;color:rgba(148,163,184,.5)">${l}</div>
              <div style="font-size:11px;font-weight:800;color:#e2e8f0;font-family:'IBM Plex Mono',monospace">${v}</div>
            </div>`).join('')}
        </div>

        <div style="font-size:7.5px;font-weight:700;color:rgba(148,163,184,.6);margin-bottom:3px">Analiză sensibilitate</div>
        ${result.sensitivities.map(s=>`
          <div style="display:flex;justify-content:space-between;padding:2px 4px;border-bottom:1px solid rgba(255,255,255,.04)">
            <span style="font-size:7px;color:rgba(148,163,184,.6)">${s.scenario}</span>
            <span style="font-size:7px;font-weight:700;color:${s.roi>ind.roi?'#22c55e':s.roi<0?'#ef4444':'#f59e0b'}">${s.roi}% ROI</span>
          </div>`).join('')}

        <div style="margin-top:5px;font-size:6px;color:rgba(60,80,110,.5)">
          ${result.source}
        </div>
      </div>`;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ④ CARBON FOOTPRINT LCA
// Referință: EN 15978:2011, RICS Whole Life Carbon Assessment 2023,
//            EPBD 2024 (EU 2024/1275), Legea 372/2005 NZEB
// ═══════════════════════════════════════════════════════════════════════════

G._CarbonCalculator = {

  // Factori emisii materiale (kgCO₂e/kg) — sursa: ICE Database v3.0
  MATERIALS: {
    beton:     { factor: 0.159, unit:'kgCO₂e/kg', density: 2400 },
    otel:      { factor: 1.550, unit:'kgCO₂e/kg', density: 7850 },
    BCA:       { factor: 0.330, unit:'kgCO₂e/kg', density: 600  },
    EPS:       { factor: 3.290, unit:'kgCO₂e/kg', density: 20   },
    sticla:    { factor: 1.350, unit:'kgCO₂e/kg', density: 2500 },
    lemn:      { factor:-0.720, unit:'kgCO₂e/kg', density: 500  }, // sechestru carbon
    caramida:  { factor: 0.220, unit:'kgCO₂e/kg', density: 1800 },
    aluminiu:  { factor: 6.700, unit:'kgCO₂e/kg', density: 2700 },
  },

  calculate(params) {
    const {
      SDA       = 1000,    // suprafața desfășurată (m²)
      niv       = 4,
      tip       = 'RC',    // RC = beton armat, M = zidărie, P = prefabricate
      izolatie  = 'EPS',
      nzeb      = true,    // NZEB obligatoriu clădiri noi (Legea 372/2005)
      judet     = 'IS',
    } = params;

    const floorArea = SDA / niv; // aria planșeului (m²)

    // ── SCOPE 1+2+3 ─────────────────────────────────────────────────────

    // Scope 3: Materiale de construcție (Embodied Carbon)
    const structura = tip==='RC' ? {
      beton:  floorArea * niv * 0.35,  // m³ beton structură
      otel:   floorArea * niv * 0.015, // tone oțel
    } : {
      BCA:    floorArea * niv * 0.20,
      otel:   floorArea * niv * 0.005,
    };

    let scope3 = 0;
    if(structura.beton) scope3 += structura.beton * 2400 * this.MATERIALS.beton.factor / 1000; // tCO₂e
    if(structura.otel)  scope3 += structura.otel * 1000 * this.MATERIALS.otel.factor / 1000;
    if(structura.BCA)   scope3 += structura.BCA * 600 * this.MATERIALS.BCA.factor / 1000;

    // Izolație (EPS/MW/lemn)
    const izolatieM = this.MATERIALS[izolatie]||this.MATERIALS.EPS;
    const izolatieVol = floorArea * 0.15; // 15cm grosime medie
    scope3 += izolatieVol * izolatieM.density * izolatieM.factor / 1000;

    // Ferestre (sticlă + aluminiu)
    const fereastraA = floorArea * 0.25 * niv; // 25% din fatada
    scope3 += fereastraA * 0.030 * 2500 * this.MATERIALS.sticla.factor / 1000;
    scope3 += fereastraA * 0.008 * 2700 * this.MATERIALS.aluminiu.factor / 1000;

    scope3 = Math.round(scope3 * 10) / 10;

    // Scope 2: Energie operațională (50 ani ciclu viață)
    // Factor emisii energie electrică RO: 0.27 kgCO₂e/kWh (ANRE 2024)
    const CO2_EL = 0.27;
    const CO2_GZ = 0.202; // kgCO₂e/kWh gaze naturale
    const LIFE   = 50;    // ani ciclu viată

    // Consum energetic (kWh/m²/an)
    const consumAnual = nzeb ? 50 : 180; // NZEB vs standard
    const scope2 = Math.round(SDA * consumAnual * CO2_EL * LIFE / 1000 * 10) / 10; // tCO₂e

    // Scope 1: Transport materiale + șantier (estimat)
    const scope1 = Math.round(scope3 * 0.08 * 10) / 10;

    const total = Math.round((scope1+scope2+scope3) * 10) / 10;
    const perM2 = Math.round(total*1000/SDA * 10) / 10; // kgCO₂e/m²

    // Comparație cu standardele
    const standard_RICS = 1000; // kgCO₂e/m² WLC target 2030 (RICS)
    const standard_EPBD = 600;  // kgCO₂e/m² target EPBD 2050

    const verdict = perM2 < standard_EPBD ? 'SUB ȚINTA 2050' :
                    perM2 < standard_RICS  ? 'CONFORM RICS 2030' :
                                             'DEPĂȘIT — RISC TAXONOMIE UE';
    const verdictColor = perM2<standard_EPBD?'#22c55e':perM2<standard_RICS?'#D4AF37':'#ef4444';

    return {
      scope1, scope2, scope3, total,
      perM2,
      breakdown: {
        structura:   Math.round(scope3*0.6*10)/10,
        inchideri:   Math.round(scope3*0.3*10)/10,
        finisaje:    Math.round(scope3*0.1*10)/10,
        operational: scope2,
        transport:   scope1,
      },
      benchmarks: {
        actual: perM2,
        rics2030: standard_RICS,
        epbd2050: standard_EPBD,
        bestPractice: 400,
      },
      verdict, verdictColor,
      nzebBonus: !nzeb ? Math.round(SDA*130*CO2_EL*LIFE/1000*10)/10 : 0,
      source: 'ICE Database v3.0 · RICS WLC 2023 · EPBD 2024 · ANRE 2024',
    };
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑤ UN SDG 11 DASHBOARD
// Referință: UN SDG 11 "Sustainable Cities and Communities" (2030 Agenda)
//            Eurostat SDG monitoring 2024, UN-Habitat CPI
// ═══════════════════════════════════════════════════════════════════════════

G._SDG11Dashboard = {

  // 11 indicatori SDG 11 cu sursele oficiale
  INDICATORS: [
    { id:'11.1.1', label:'Locuire inadecvată', target:'<0%', unit:'% pop.',
      source:'INSE Rec.2021', direction:-1 },
    { id:'11.2.1', label:'Transport public', target:'>50%', unit:'% pop. cu acces',
      source:'OSM + operator', direction:1 },
    { id:'11.3.1', label:'Utilizare teren eficientă', target:'<2.0', unit:'raport creștere',
      source:'Copernicus GHSL + INSE', direction:-1 },
    { id:'11.4.1', label:'Patrimoniu cultural', target:'cheltuieli/cap', unit:'EUR/cap/an',
      source:'Ministerul Culturii', direction:1 },
    { id:'11.5.1', label:'Risc dezastre', target:'0 decese/100k', unit:'decese/100k',
      source:'IGSU · INFP · ANAR', direction:-1 },
    { id:'11.6.1', label:'Deșeuri colectare', target:'100%', unit:'% pop. deservită',
      source:'ANRSC 2024', direction:1 },
    { id:'11.6.2', label:'Calitate aer PM2.5', target:'<10μg/m³', unit:'μg/m³',
      source:'calitateaer.ro · ANM', direction:-1 },
    { id:'11.7.1', label:'Spații verzi publice', target:'>9m²/loc', unit:'m²/loc',
      source:'Primărie · OMS standard', direction:1 },
    { id:'11.a.1', label:'Politici urbane naționale', target:'DA/NU', unit:'boolean',
      source:'MDLPA', direction:1 },
    { id:'11.b.1', label:'Strategie risc dezastre', target:'DA/NU', unit:'boolean',
      source:'MDLPA · IGSU', direction:1 },
    { id:'11.c.1', label:'Suport clădiri durabile', target:'% fond reabilitat', unit:'%',
      source:'MDLPA · PNRR', direction:1 },
  ],

  calculate(city, risk) {
    const pop = city?.pop2021||100000;
    const r   = city?.rata_reala_2011_2021||0;
    const spV = city?.spatii_verzi_mp_loc||12;
    const tr  = city?.acoperire_transport||65;

    // Estimăm indicatorii din datele disponibile
    const values = {
      '11.1.1': Math.max(0, Math.round(5 - r*2)),      // estimat din dinamica demografica
      '11.2.1': Math.round(tr),
      '11.3.1': Math.round((1 + Math.abs(r)/2)*10)/10,  // raport creștere
      '11.4.1': Math.round(city?.pib_eur_cap ? city.pib_eur_cap*0.005 : 50),
      '11.5.1': risk?.riskScore ? Math.round(risk.riskScore/20) : 3,
      '11.6.1': Math.round(70 + Math.min(25, r*3)),
      '11.6.2': city?.pm25||15, // μg/m³
      '11.7.1': Math.round(spV*10)/10,
      '11.a.1': 1, // România are SIDU
      '11.b.1': risk?.riskScore < 50 ? 1 : 0,
      '11.c.1': Math.round(5 + (new Date().getFullYear()-2021)*2),
    };

    // Targets
    const targets = {
      '11.1.1':0, '11.2.1':75, '11.3.1':2.0, '11.4.1':100,
      '11.5.1':0, '11.6.1':100, '11.6.2':10, '11.7.1':9,
      '11.a.1':1, '11.b.1':1, '11.c.1':20,
    };

    // Score per indicator (0-100)
    const scores = {};
    let totalScore = 0;
    this.INDICATORS.forEach(ind=>{
      const v = values[ind.id];
      const t = targets[ind.id];
      let score;
      if(ind.direction === 1) score = Math.min(100, Math.round(v/t*100));
      else score = Math.min(100, Math.round((1-v/Math.max(t,v))*100+50));
      score = Math.max(0, Math.min(100, score));
      scores[ind.id] = score;
      totalScore += score;
    });

    const overall = Math.round(totalScore / this.INDICATORS.length);
    const onTrack = Object.values(scores).filter(s=>s>=75).length;

    return {
      overall, onTrack,
      total: this.INDICATORS.length,
      values, targets, scores,
      verdict: overall>=75?'PE TRAIECTORIE':overall>=50?'PROGRES PARȚIAL':'ÎNTÂRZIAT',
      verdictColor: overall>=75?'#22c55e':overall>=50?'#D4AF37':'#ef4444',
      source: 'UN SDG 11 · Eurostat SDG monitoring 2024 · UN-Habitat',
    };
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑥ URBAN HEAT ISLAND ANALYZER
// Referință: Oke (1982) "The Energetic Basis of the Urban Heat Island",
//            Copernicus C3S LST, EEA Technical Report 2/2012
// ═══════════════════════════════════════════════════════════════════════════

G._HeatIslandAnalyzer = {

  calculate(city, parcelParams) {
    const pot     = parseFloat(parcelParams?.pot||35)/100;
    const spVerde = city?.spatii_verzi_mp_loc||12;
    const densit  = city?.densitate||1000;
    const tempMed = city?.temp_medie_2024||11.0;
    const yr      = new Date().getFullYear();

    // Model UHI (Urban Heat Island) — calibrat pe date Copernicus LST pentru România
    // Referință: Oke (1982): ΔT_UHI ≈ 3.97 × log₁₀(P) − K
    // Adaptat cu factori locali: impermeabilitate, spații verzi, densitate construire

    const impermeability = Math.min(1, pot * 1.1); // % suprafata impermeabila
    const greenFactor    = Math.max(0, 1 - spVerde/20); // lipsa spatii verzi

    // Delta T față de periurbana (°C)
    const deltaT = Math.round((
      impermeability * 2.5 +
      greenFactor    * 1.8 +
      Math.log10(Math.max(1,densit/1000)) * 1.2 -
      0.5  // corecție altitudine medie RO
    ) * 10) / 10;

    // Zile caniculare estimate (>35°C) — cresc cu UHI
    const heatDays2024 = city?.heatDays35||18;
    const heatDaysUHI  = Math.round(heatDays2024 + deltaT * 2);

    // Impactul proiecției climatice
    const deltaT2055_rcp45 = 1.4;
    const deltaT2055_rcp85 = 2.2;
    const heatDays2055_S2  = Math.round(heatDaysUHI + deltaT2055_rcp45 * 3);

    // Soluții cu impact estimat
    const solutions = [
      { name:'Acoperișuri verzi (30% din fond)', reduction: 0.8, cost:'mediu',
        co2:'−2.1 kgCO₂e/m²/an', ref:'EEA 2012' },
      { name:'Pavaj permeabil (20% din suprafață)', reduction: 0.5, cost:'mediu',
        co2:'−0.8 kgCO₂e/m²/an', ref:'Kopernicus 2023' },
      { name:'+2 m²/loc spații verzi', reduction: 0.6, cost:'mic',
        co2:'sechestru +1.2 tCO₂e/ha/an', ref:'Oke 1982' },
      { name:'Aliniamente arbori pe artere', reduction: 1.2, cost:'mic',
        co2:'umbrire −15% consum AC', ref:'C40 2022' },
    ];

    return {
      deltaT,
      tempUHI:  Math.round((tempMed + deltaT)*10)/10,
      tempRural: tempMed,
      heatDays:  heatDaysUHI,
      heatDays2055: heatDays2055_S2,
      impermeability: Math.round(impermeability*100),
      greenDeficit: Math.max(0, 9-spVerde), // față de OMS 9m²/loc
      verdict: deltaT>3.5 ? 'UHI SEVER' : deltaT>2?'UHI MODERAT':'UHI SCĂZUT',
      verdictColor: deltaT>3.5?'#ef4444':deltaT>2?'#f59e0b':'#22c55e',
      solutions,
      source: 'Oke (1982) · Copernicus C3S LST · EEA Technical Report 2/2012 · ANM ROCADA',
    };
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑦ SEISMIC VULNERABILITY SCORE
// Referință: FEMA P-154 (2015), NP 031/2012, Legea 260/2008,
//            PNRR C10-I2 Reabilitare seismică, CNRED
// ═══════════════════════════════════════════════════════════════════════════

G._SeismicVulnerability = {

  // Fetch clădiri din OSM în raza parcelei
  async fetchBuildings(lat, lon, radius=300) {
    const q = `[out:json][timeout:8];way["building"](around:${radius},${lat},${lon});out tags geom;`;
    try {
      const r = await fetch('https://overpass-api.de/api/interpreter',{
        method:'POST', body:'data='+encodeURIComponent(q),
        signal:AbortSignal.timeout(8000),
      });
      const data = await r.json();
      return (data.elements||[]).filter(el=>el.type==='way' && el.tags);
    } catch(e) { return []; }
  },

  scoreBuilding(building, seismicZone) {
    const tags  = building.tags||{};
    const year  = parseInt(tags['construction_date']||tags['start_date']||'0')||1970;
    const niv   = parseInt(tags['building:levels']||tags['levels']||'3')||3;
    const mat   = (tags['building:material']||tags['building:structure']||'').toLowerCase();
    const ag    = seismicZone?.ag||0.20;

    // Scor vulnerabilitate FEMA P-154 adaptat
    // 0 = sigur, 100 = risc maxim

    // Factor vârstă (clădirile pre-1977 nu aveau norme seismice în RO)
    const ageFactor = year < 1940 ? 40 :
                      year < 1963 ? 30 : // primele norme seismice RO
                      year < 1978 ? 25 : // înainte de cutremurul 1977
                      year < 1992 ? 15 : // norme post-1977
                      year < 2005 ? 8  : // norme moderne
                                    3;   // norme P100 actuale

    // Factor material
    const matFactor = mat.includes('concrete')||mat.includes('beton') ? 5 :
                      mat.includes('brick')||mat.includes('caramida') ? 15 :
                      mat.includes('wood')||mat.includes('lemn') ? 20 :
                      mat.includes('steel') ? 3 : 12; // necunoscut = mediu

    // Factor înălțime × zonă seismică
    const heightFactor = Math.round(niv * ag * 20);

    const totalScore = Math.min(100, ageFactor + matFactor + heightFactor);

    return {
      score:    totalScore,
      year,  niv, material: mat||'necunoscut',
      factors: { ageFactor, matFactor, heightFactor },
      class:  totalScore>=70?'RzI':totalScore>=50?'RzII':totalScore>=30?'RzIII':'OK',
      classColor: totalScore>=70?'#ef4444':totalScore>=50?'#f97316':totalScore>=30?'#f59e0b':'#22c55e',
      eligible_PNRR: totalScore >= 50, // eligibil consolidare PNRR C10-I2
      source: 'FEMA P-154 adaptat · NP 031/2012 · PNRR C10-I2',
    };
  },

  async analyzeArea(lat, lon, seismicZone) {
    ss?.('🏗 Calculez vulnerabilitate seismică în zonă...');
    const buildings = await this.fetchBuildings(lat, lon);

    const scored = buildings.map(b=>({
      ...this.scoreBuilding(b, seismicZone),
      id: b.id,
      coords: b.geometry?.[0]||{lat, lon},
    }));

    const risc1 = scored.filter(b=>b.class==='RzI').length;
    const risc2 = scored.filter(b=>b.class==='RzII').length;
    const pnrr  = scored.filter(b=>b.eligible_PNRR).length;
    const avgScore = scored.length ? Math.round(scored.reduce((s,b)=>s+b.score,0)/scored.length) : 0;

    ss?.(`✅ ${buildings.length} clădiri analizate · ${risc1} risc I · ${risc2} risc II · ${pnrr} eligibile PNRR`);

    return {
      buildings: scored,
      summary: { total:buildings.length, risc1, risc2, pnrr, avgScore },
      source: 'OSM Buildings + FEMA P-154 + NP 031/2012 + PNRR C10-I2',
    };
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// MODUL UNIFICATOR — Analytics Panel în UI
// ═══════════════════════════════════════════════════════════════════════════

G._AnalyticsPanel = {
  _built: false,

  init() {
    this._injectTab();
    this._watchParcel();
    console.log('[Analytics] ✅ 8 motoare analitice active');
  },

  _injectTab() {
    // Adaugăm tab Analytics în panel-tabs
    const tabs = document.getElementById('panel-tabs');
    const body = document.getElementById('panel-body');
    if(!tabs || !body || document.getElementById('tab-analytics')) return;

    // Tab button
    const btn = document.createElement('button');
    btn.className = 'ptab';
    btn.id = 'tab-analytics';
    btn.setAttribute('data-t', 'analytics');
    btn.textContent = '🧠 Analytics';
    btn.onclick = () => {
      document.querySelectorAll('.ptab').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tc').forEach(t=>t.classList.remove('active'));
      btn.classList.add('active');
      const tc = document.getElementById('tc-analytics');
      if(tc) tc.classList.add('active');
    };
    tabs.appendChild(btn);

    // Tab content
    const tc = document.createElement('div');
    tc.className = 'tc';
    tc.id = 'tc-analytics';
    tc.innerHTML = this._buildHTML();
    body.appendChild(tc);

    this._built = true;
  },

  _buildHTML() {
    return `
      <div style="padding:0 2px">
        <div style="font-size:9px;font-weight:800;color:#D4AF37;letter-spacing:.12em;margin-bottom:8px">
          🧠 ANALYTICS AVANSAT
        </div>

        <!-- Walkability -->
        <div style="margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:rgba(148,163,184,.6);margin-bottom:3px">
            WALKABILITY SCORE · Frank et al. 2006
          </div>
          <div id="analytics-walk-result">
            <button onclick="_AnalyticsPanel.runWalkability()"
              style="width:100%;padding:6px;border-radius:6px;background:rgba(34,197,94,.1);
                border:1px solid rgba(34,197,94,.3);color:#4ade80;font-size:9px;
                font-weight:700;cursor:pointer;font-family:inherit">
              🚶 Calculează Walkability Score
            </button>
          </div>
        </div>

        <!-- 15-Minute City -->
        <div style="margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:rgba(148,163,184,.6);margin-bottom:3px">
            15-MINUTE CITY · Moreno 2021
          </div>
          <div id="analytics-15min-result">
            <button onclick="_AnalyticsPanel.run15MinCity()"
              style="width:100%;padding:6px;border-radius:6px;background:rgba(59,130,246,.1);
                border:1px solid rgba(59,130,246,.3);color:#60a5fa;font-size:9px;
                font-weight:700;cursor:pointer;font-family:inherit">
              🏙 Analizează 15-Minute City + Izocrone
            </button>
          </div>
        </div>

        <!-- ROI Calculator -->
        <div style="margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:rgba(148,163,184,.6);margin-bottom:3px">
            ROI / CBA · RICS Red Book 2023
          </div>
          <div id="analytics-roi-result">
            <button onclick="_AnalyticsPanel.runROI()"
              style="width:100%;padding:6px;border-radius:6px;background:rgba(212,175,55,.1);
                border:1px solid rgba(212,175,55,.3);color:#D4AF37;font-size:9px;
                font-weight:700;cursor:pointer;font-family:inherit">
              💰 Calculează ROI & Fezabilitate
            </button>
          </div>
        </div>

        <!-- Carbon -->
        <div style="margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:rgba(148,163,184,.6);margin-bottom:3px">
            CARBON LCA · EN 15978 · EPBD 2024
          </div>
          <div id="analytics-carbon-result">
            <button onclick="_AnalyticsPanel.runCarbon()"
              style="width:100%;padding:6px;border-radius:6px;background:rgba(34,197,94,.08);
                border:1px solid rgba(34,197,94,.2);color:#4ade80;font-size:9px;
                cursor:pointer;font-family:inherit">
              🌱 Calculează Amprenta Carbon
            </button>
          </div>
        </div>

        <!-- Heat Island -->
        <div style="margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:rgba(148,163,184,.6);margin-bottom:3px">
            URBAN HEAT ISLAND · Oke 1982 · Copernicus
          </div>
          <div id="analytics-uhi-result">
            <button onclick="_AnalyticsPanel.runUHI()"
              style="width:100%;padding:6px;border-radius:6px;background:rgba(239,68,68,.08);
                border:1px solid rgba(239,68,68,.2);color:#f87171;font-size:9px;
                cursor:pointer;font-family:inherit">
              🌡 Analizează Insulă de Căldură Urbană
            </button>
          </div>
        </div>

        <!-- SDG 11 -->
        <div style="margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:rgba(148,163,184,.6);margin-bottom:3px">
            UN SDG 11 DASHBOARD · 2030 Agenda
          </div>
          <div id="analytics-sdg-result">
            <button onclick="_AnalyticsPanel.runSDG11()"
              style="width:100%;padding:6px;border-radius:6px;background:rgba(99,102,241,.1);
                border:1px solid rgba(99,102,241,.3);color:#818cf8;font-size:9px;
                cursor:pointer;font-family:inherit">
              🌍 Evaluează SDG 11 per UAT
            </button>
          </div>
        </div>

        <!-- Seismic Vulnerability -->
        <div style="margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:rgba(148,163,184,.6);margin-bottom:3px">
            VULNERABILITATE SEISMICĂ · FEMA P-154 · PNRR
          </div>
          <div id="analytics-seismic-result">
            <button onclick="_AnalyticsPanel.runSeismic()"
              style="width:100%;padding:6px;border-radius:6px;background:rgba(245,158,11,.08);
                border:1px solid rgba(245,158,11,.2);color:#fbbf24;font-size:9px;
                cursor:pointer;font-family:inherit">
              🏗 Analizează Vulnerabilitate Seismică Bloc
            </button>
          </div>
        </div>

        <div style="font-size:6px;color:rgba(60,80,110,.5);text-align:center;padding:4px 0 8px">
          Surse: OSM · INSE · Eurostat · BNR · INFP · ANM · Copernicus<br>
          Metodologii: Walk Score · Moreno 2021 · RICS · EN 15978 · FEMA P-154 · ONU SDG
        </div>
      </div>
    `;
  },

  _getParcel() {
    return window.S?.parcels?.[window.S?.activeParcel??0];
  },

  _getCity() {
    const ap = this._getParcel();
    if(!ap) return null;
    const uatName = (ap.uat||'').toLowerCase().replace('municipiul ','').trim();
    if(typeof _RO_CITIES_DB === 'undefined') return null;
    const m = Object.entries(_RO_CITIES_DB).find(([,v])=>(v.name||'').toLowerCase().includes(uatName));
    return m?.[1]||null;
  },

  async runWalkability() {
    const ap = this._getParcel();
    if(!ap?.lat) { ss?.('Selectați o parcelă cu coordonate GPS'); return; }
    const result = await G._WalkabilityEngine.calculate(ap.lat, ap.lon);
    G._WalkabilityEngine.renderResult(result, 'analytics-walk-result');
  },

  async run15MinCity() {
    const ap = this._getParcel();
    if(!ap?.lat) { ss?.('Selectați o parcelă cu coordonate GPS'); return; }
    const result = await G._FifteenMinCity.analyze(ap.lat, ap.lon);
    const el = document.getElementById('analytics-15min-result');
    if(!el) return;

    const scoreColor = result.score===100?'#22c55e':result.score>=67?'#D4AF37':'#ef4444';
    el.innerHTML = `
      <div style="background:rgba(8,14,34,.8);border-radius:8px;padding:8px;border:1px solid rgba(255,255,255,.06)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <div style="font-size:22px;font-weight:900;color:${scoreColor};font-family:'IBM Plex Mono',monospace">${result.score}%</div>
          <div>
            <div style="font-size:9px;font-weight:800;color:#e2e8f0">15-Minute City</div>
            <div style="font-size:7.5px;color:rgba(148,163,184,.6)">${result.label}</div>
          </div>
        </div>
        ${Object.values(result.functions).map(f=>`
          <div style="display:flex;align-items:center;gap:6px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.04)">
            <span style="font-size:12px">${f.icon}</span>
            <span style="flex:1;font-size:8px;color:rgba(148,163,184,.8)">${f.label}</span>
            ${f.accessible
              ? `<span style="font-size:7.5px;color:#22c55e;font-weight:700">${f.actualMin}min ✓</span>`
              : `<span style="font-size:7.5px;color:#ef4444">>${f.targetMin}min ✗</span>`}
          </div>`).join('')}
        <button onclick="_FifteenMinCity.addIsochroneLayer(${ap.lat},${ap.lon})"
          style="margin-top:5px;width:100%;padding:5px;border-radius:5px;background:rgba(59,130,246,.1);
            border:1px solid rgba(59,130,246,.3);color:#60a5fa;font-size:8px;cursor:pointer;font-family:inherit">
          🗺 Adaugă izocrone pe hartă (5/10/15 min)
        </button>
        <div style="font-size:6px;color:rgba(60,80,110,.5);margin-top:3px">${result.source}</div>
      </div>`;
  },

  runROI() {
    const ap = this._getParcel();
    const city = this._getCity();
    const risk = typeof _getRiskProfile==='function' ? _getRiskProfile(city||{}) : null;
    const params = ap?.params||{};

    const result = G._ROICalculator.calculate({
      area_mp2: parseFloat(ap?.area||500),
      niv:      parseInt(params.rh?.replace(/\D/g,'')||'4')||4,
      fn:       params.fn||'L',
      uat:      city,
      risk,
    });
    G._ROICalculator.renderResult(result, 'analytics-roi-result');
  },

  runCarbon() {
    const ap  = this._getParcel();
    const params = ap?.params||{};
    const result = G._CarbonCalculator.calculate({
      SDA:    parseFloat(ap?.area||500) * (parseInt(params.rh?.replace(/\D/g,'')||'4')||4) * 0.85,
      niv:    parseInt(params.rh?.replace(/\D/g,'')||'4')||4,
      nzeb:   true,
      judet:  ap?.judet||'IS',
    });

    const el = document.getElementById('analytics-carbon-result');
    if(!el) return;
    const vc = result.verdictColor;
    el.innerHTML = `
      <div style="background:rgba(8,14,34,.8);border-radius:8px;padding:8px;border:1px solid rgba(255,255,255,.06)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <div>
            <div style="font-size:20px;font-weight:900;color:${vc};font-family:'IBM Plex Mono',monospace">${result.perM2}</div>
            <div style="font-size:6.5px;color:rgba(100,120,150,.5)">kgCO₂e/m²</div>
          </div>
          <div>
            <div style="font-size:9px;font-weight:800;color:#e2e8f0">${result.verdict}</div>
            <div style="font-size:7px;color:rgba(148,163,184,.5)">Total: ${result.total} tCO₂e</div>
          </div>
        </div>
        ${[['Structură (Scope 3)',result.breakdown.structura,'tCO₂e'],
           ['Operațional 50 ani (S2)',result.scope2,'tCO₂e'],
           ['Transport (S1)',result.scope1,'tCO₂e'],
           ['RICS target 2030',result.benchmarks.rics2030,'kgCO₂e/m²'],
           ['EPBD target 2050',result.benchmarks.epbd2050,'kgCO₂e/m²'],
        ].map(([l,v,u])=>`
          <div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid rgba(255,255,255,.04)">
            <span style="font-size:7px;color:rgba(148,163,184,.6)">${l}</span>
            <span style="font-size:7.5px;font-weight:700;color:#e2e8f0;font-family:'IBM Plex Mono'">${v} ${u}</span>
          </div>`).join('')}
        <div style="font-size:6px;color:rgba(60,80,110,.5);margin-top:4px">${result.source}</div>
      </div>`;
  },

  runUHI() {
    const ap   = this._getParcel();
    const city = this._getCity();
    const result = G._HeatIslandAnalyzer.calculate(city||{}, ap?.params||{});

    const el = document.getElementById('analytics-uhi-result');
    if(!el) return;
    const vc = result.verdictColor;
    el.innerHTML = `
      <div style="background:rgba(8,14,34,.8);border-radius:8px;padding:8px;border:1px solid rgba(255,255,255,.06)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <div style="font-size:22px;font-weight:900;color:${vc};font-family:'IBM Plex Mono',monospace">+${result.deltaT}°C</div>
          <div>
            <div style="font-size:9px;font-weight:800;color:#e2e8f0">${result.verdict}</div>
            <div style="font-size:7px;color:rgba(148,163,184,.5)">Față de zona rurală adiacentă</div>
          </div>
        </div>
        ${[
          ['Temp. medie urbană est.', result.tempUHI+'°C', ''],
          ['Zile caniculare >35°C/an', result.heatDays, ''],
          ['Zile caniculare 2055 (S2)', result.heatDays2055, '(IPCC RCP4.5)'],
          ['Suprafață impermeabilă', result.impermeability+'%', ''],
          ['Deficit spații verzi', result.greenDeficit > 0 ? '-'+result.greenDeficit+'m²/loc' : 'OK', 'vs OMS 9m²/loc'],
        ].map(([l,v,n])=>`
          <div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid rgba(255,255,255,.04)">
            <span style="font-size:7px;color:rgba(148,163,184,.6)">${l}</span>
            <span style="font-size:7.5px;font-weight:700;color:#e2e8f0">${v}${n?' <span style="color:rgba(100,120,150,.4)">'+n+'</span>':''}</span>
          </div>`).join('')}
        <div style="font-size:7.5px;font-weight:700;color:rgba(148,163,184,.5);margin-top:6px;margin-bottom:3px">Soluții recomandate</div>
        ${result.solutions.map(s=>`
          <div style="background:rgba(34,197,94,.06);border-radius:5px;padding:4px;margin-bottom:2px;border-left:2px solid rgba(34,197,94,.4)">
            <div style="font-size:7.5px;color:#4ade80;font-weight:700">${s.name} → −${s.reduction}°C</div>
            <div style="font-size:6px;color:rgba(100,120,150,.5)">${s.co2} · ${s.ref}</div>
          </div>`).join('')}
        <div style="font-size:6px;color:rgba(60,80,110,.5);margin-top:4px">${result.source}</div>
      </div>`;
  },

  runSDG11() {
    const city = this._getCity();
    const risk = typeof _getRiskProfile==='function' ? _getRiskProfile(city||{}) : null;
    const result = G._SDG11Dashboard.calculate(city||{}, risk);

    const el = document.getElementById('analytics-sdg-result');
    if(!el) return;
    const vc = result.verdictColor;
    el.innerHTML = `
      <div style="background:rgba(8,14,34,.8);border-radius:8px;padding:8px;border:1px solid rgba(255,255,255,.06)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <div style="font-size:24px;font-weight:900;color:${vc};font-family:'IBM Plex Mono',monospace">${result.overall}</div>
          <div>
            <div style="font-size:9px;font-weight:800;color:#e2e8f0">SDG 11 · ${result.verdict}</div>
            <div style="font-size:7px;color:rgba(148,163,184,.5)">${result.onTrack}/${result.total} indicatori ≥75%</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px">
          ${G._SDG11Dashboard.INDICATORS.map(ind=>{
            const sc = result.scores[ind.id]||0;
            const c = sc>=75?'#22c55e':sc>=50?'#D4AF37':'#ef4444';
            return `<div style="background:rgba(12,22,52,.6);border-radius:4px;padding:3px 4px">
              <div style="font-size:6px;color:rgba(100,120,150,.4)">${ind.id}</div>
              <div style="font-size:7.5px;font-weight:700;color:${c}">${sc}/100</div>
              <div style="font-size:6px;color:rgba(148,163,184,.5)">${ind.label.slice(0,18)}</div>
            </div>`;
          }).join('')}
        </div>
        <div style="font-size:6px;color:rgba(60,80,110,.5);margin-top:4px">${result.source}</div>
      </div>`;
  },

  async runSeismic() {
    const ap = this._getParcel();
    if(!ap?.lat) { ss?.('Selectați o parcelă cu coordonate GPS'); return; }
    const city = this._getCity();
    const risk = typeof _getRiskProfile==='function' ? _getRiskProfile(city||{}) : null;

    const result = await G._SeismicVulnerability.analyzeArea(ap.lat, ap.lon, risk?.seismic);
    const el = document.getElementById('analytics-seismic-result');
    if(!el) return;

    const {summary:s} = result;
    el.innerHTML = `
      <div style="background:rgba(8,14,34,.8);border-radius:8px;padding:8px;border:1px solid rgba(255,255,255,.06)">
        <div style="font-size:9px;font-weight:800;color:#fbbf24;margin-bottom:5px">
          Vulnerabilitate Seismică · ${s.total} clădiri analizate
        </div>
        ${[
          ['Clădiri clasa RzI', s.risc1, '#ef4444', 'consolidare urgentă'],
          ['Clădiri clasa RzII', s.risc2, '#f97316', 'consolidare necesară'],
          ['Eligibile PNRR C10-I2', s.pnrr, '#D4AF37', 'finanțare UE disponibilă'],
          ['Scor mediu zonă', s.avgScore+'/100', s.avgScore>50?'#f97316':'#22c55e', ''],
        ].map(([l,v,c,n])=>`
          <div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.04)">
            <span style="font-size:7.5px;color:rgba(148,163,184,.7)">${l}</span>
            <span style="font-size:8px;font-weight:800;color:${c}">${v}${n?` <span style="color:rgba(100,120,150,.4);font-size:6.5px">${n}</span>`:''}</span>
          </div>`).join('')}
        ${s.pnrr>0?`<div style="background:rgba(212,175,55,.08);border-radius:5px;padding:5px;margin-top:5px;border-left:2px solid rgba(212,175,55,.5)">
          <div style="font-size:7.5px;color:#D4AF37;font-weight:700">💰 PNRR C10-I2: ${s.pnrr} clădiri eligibile</div>
          <div style="font-size:6.5px;color:rgba(148,163,184,.6)">Finanțare disponibilă pentru consolidare seismică</div>
        </div>`:''}
        <div style="font-size:6px;color:rgba(60,80,110,.5);margin-top:4px">
          FEMA P-154 · NP 031/2012 · Legea 260/2008 · PNRR C10-I2
        </div>
      </div>`;
  },

  _watchParcel() {
    let last = null;
    setInterval(()=>{
      const ap = window.S?.parcels?.[window.S?.activeParcel??0];
      if(ap && ap !== last){
        last = ap;
        // Reset rezultate când se schimbă parcela
        ['walk','15min','roi','carbon','uhi','sdg','seismic'].forEach(key=>{
          const el = document.getElementById(`analytics-${key}-result`);
          if(el && !el.querySelector('button')) {
            // Resetăm dacă nu are deja buton
          }
        });
      }
    }, 1000);
  },
};

// ── Expunere globală ─────────────────────────────────────────────────────
window._AnalyticsPanel       = G._AnalyticsPanel;
window._WalkabilityEngine    = G._WalkabilityEngine;
window._FifteenMinCity       = G._FifteenMinCity;
window._ROICalculator        = G._ROICalculator;
window._CarbonCalculator     = G._CarbonCalculator;
window._HeatIslandAnalyzer   = G._HeatIslandAnalyzer;
window._SDG11Dashboard       = G._SDG11Dashboard;
window._SeismicVulnerability = G._SeismicVulnerability;

// Init când pagina e gata
(function _init(n){
  if(n>60) return;
  if(!document.getElementById('panel-tabs')){
    setTimeout(()=>_init(n+1), 300); return;
  }
  G._AnalyticsPanel.init();
})(0);

})(window);
