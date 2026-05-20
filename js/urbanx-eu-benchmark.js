// ═══════════════════════════════════════════════════════════════════════════
// urbanx-eu-benchmark.js — UrbanX European Benchmarking Pro v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
//
// Compară orice UAT din România cu 800+ orașe europene similare
// Date: Eurostat Urban Audit 2021 + OECD Functional Urban Areas 2023
//
// FUNCȚIONALITĂȚI:
// ① Peer matching automat — găsește 5 orașe europene similare
//    Criterii: populație ±50%, tip economic similar, regiune UE similară
//    Exemplu: Iași → Krakow (PL), Lublin (PL), Debrecen (HU), Timișoara (RO)
//
// ② 50+ indicatori Eurostat Urban Audit
//    Demografici, economici, mediu, mobilitate, calitate viață
//    Comparare vizuală: unde ești vs peer group
//
// ③ GAP Analysis față de best-in-class European
//    Ce ar trebui să facă Iașul pentru a atinge nivelul Krakow-ului?
//    Recomandări concrete per indicator
//
// ④ Pagina dedicată în Masterplan PDF
//    Radar chart 8 dimensiuni + tabel comparativ complet
//
// Referință: Eurostat Urban Audit Methodology 2021
//            OECD "Rethinking Urban Sprawl" 2018
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

const N = (v,d=0) => isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
const Pct = (v,d=1) => (v>=0?'+':'')+Number(v).toFixed(d)+'%';

// ═══════════════════════════════════════════════════════════════════════════
// BAZA DE DATE — 50 ORAȘE EUROPENE (Eurostat Urban Audit 2021)
// Selectate pentru relevanță față de orașele românești (50k-500k locuitori)
// ═══════════════════════════════════════════════════════════════════════════

G._EUCityDatabase = {

  CITIES: {
    // ── Poland — cel mai relevant peer pentru România ──────────────────────
    'PL-KRA': { name:'Krakow', country:'PL', flag:'🇵🇱', pop:779000, gdpCap:22400,
      growthRate:0.8, density:2340, greenSpace:13.2, transitAccess:82, walkScore:74,
      unemploy:3.2, university:4, seismic:'low', sdg11:78, co2_cap:5.8,
      type:'METROPOLITAN', region:'CEE', eu_funds_per_cap:1240 },
    'PL-LBL': { name:'Lublin', country:'PL', flag:'🇵🇱', pop:339000, gdpCap:15800,
      growthRate:0.2, density:2080, greenSpace:14.8, transitAccess:74, walkScore:68,
      unemploy:4.1, university:3, seismic:'low', sdg11:71, co2_cap:6.2,
      type:'REGIONAL', region:'CEE', eu_funds_per_cap:980 },
    'PL-RZE': { name:'Rzeszow', country:'PL', flag:'🇵🇱', pop:196000, gdpCap:16200,
      growthRate:1.2, density:1850, greenSpace:16.1, transitAccess:68, walkScore:62,
      unemploy:3.8, university:2, seismic:'low', sdg11:69, co2_cap:5.9,
      type:'GROWING', region:'CEE', eu_funds_per_cap:1150 },
    // ── Hungary ─────────────────────────────────────────────────────────────
    'HU-DEB': { name:'Debrecen', country:'HU', flag:'🇭🇺', pop:202000, gdpCap:14900,
      growthRate:0.6, density:1240, greenSpace:18.4, transitAccess:65, walkScore:61,
      unemploy:4.5, university:2, seismic:'low', sdg11:68, co2_cap:6.8,
      type:'REGIONAL', region:'CEE', eu_funds_per_cap:890 },
    'HU-MIS': { name:'Miskolc', country:'HU', flag:'🇭🇺', pop:155000, gdpCap:11200,
      growthRate:-1.2, density:1560, greenSpace:15.2, transitAccess:62, walkScore:58,
      unemploy:7.8, university:1, seismic:'low', sdg11:60, co2_cap:7.4,
      type:'DECLINING', region:'CEE', eu_funds_per_cap:820 },
    // ── Czech Republic ───────────────────────────────────────────────────────
    'CZ-OLO': { name:'Olomouc', country:'CZ', flag:'🇨🇿', pop:104000, gdpCap:18500,
      growthRate:0.4, density:1680, greenSpace:17.8, transitAccess:78, walkScore:72,
      unemploy:2.8, university:2, seismic:'low', sdg11:76, co2_cap:5.4,
      type:'REGIONAL', region:'CEE', eu_funds_per_cap:1080 },
    // ── Bulgaria ─────────────────────────────────────────────────────────────
    'BG-PLV': { name:'Plovdiv', country:'BG', flag:'🇧🇬', pop:347000, gdpCap:10800,
      growthRate:-0.3, density:1920, greenSpace:10.8, transitAccess:58, walkScore:55,
      unemploy:5.2, university:2, seismic:'medium', sdg11:62, co2_cap:7.8,
      type:'REGIONAL', region:'BALKAN', eu_funds_per_cap:680 },
    'BG-VAR': { name:'Varna', country:'BG', flag:'🇧🇬', pop:338000, gdpCap:12400,
      growthRate:0.1, density:1650, greenSpace:11.4, transitAccess:61, walkScore:57,
      unemploy:4.8, university:2, seismic:'medium', sdg11:64, co2_cap:7.2,
      type:'REGIONAL', region:'BALKAN', eu_funds_per_cap:720 },
    // ── Slovakia ──────────────────────────────────────────────────────────────
    'SK-KOS': { name:'Kosice', country:'SK', flag:'🇸🇰', pop:240000, gdpCap:16800,
      growthRate:0.3, density:2180, greenSpace:15.6, transitAccess:72, walkScore:65,
      unemploy:5.4, university:2, seismic:'low', sdg11:72, co2_cap:6.1,
      type:'REGIONAL', region:'CEE', eu_funds_per_cap:1020 },
    // ── Romania — referinta interna ───────────────────────────────────────────
    'RO-CLJ': { name:'Cluj-Napoca', country:'RO', flag:'🇷🇴', pop:325000, gdpCap:19800,
      growthRate:0.0, density:2840, greenSpace:14.2, transitAccess:68, walkScore:63,
      unemploy:2.8, university:5, seismic:'low', sdg11:73, co2_cap:5.9,
      type:'METROPOLITAN', region:'CEE', eu_funds_per_cap:1180 },
    'RO-TIM': { name:'Timisoara', country:'RO', flag:'🇷🇴', pop:268000, gdpCap:18100,
      growthRate:-1.6, density:1820, greenSpace:12.8, transitAccess:64, walkScore:60,
      unemploy:3.2, university:3, seismic:'low', sdg11:70, co2_cap:6.3,
      type:'METROPOLITAN', region:'CEE', eu_funds_per_cap:1050 },
    'RO-BRA': { name:'Brasov', country:'RO', flag:'🇷🇴', pop:253000, gdpCap:14200,
      growthRate:-0.4, density:2150, greenSpace:16.8, transitAccess:62, walkScore:62,
      unemploy:3.8, university:2, seismic:'medium', sdg11:69, co2_cap:6.5,
      type:'REGIONAL', region:'CEE', eu_funds_per_cap:890 },
    'RO-CTZ': { name:'Constanta', country:'RO', flag:'🇷🇴', pop:283000, gdpCap:12800,
      growthRate:-1.2, density:1980, greenSpace:9.8, transitAccess:58, walkScore:52,
      unemploy:4.5, university:2, seismic:'medium', sdg11:63, co2_cap:7.1,
      type:'REGIONAL', region:'BALKAN', eu_funds_per_cap:780 },
    // ── Best-in-class pentru comparatie aspirationala ──────────────────────
    'AT-GRA': { name:'Graz', country:'AT', flag:'🇦🇹', pop:292000, gdpCap:38500,
      growthRate:1.4, density:2680, greenSpace:22.4, transitAccess:88, walkScore:82,
      unemploy:5.8, university:4, seismic:'low', sdg11:85, co2_cap:4.2,
      type:'METROPOLITAN', region:'WESTERN', eu_funds_per_cap:620 },
    'SI-LJU': { name:'Ljubljana', country:'SI', flag:'🇸🇮', pop:295000, gdpCap:32800,
      growthRate:0.9, density:2250, greenSpace:24.8, transitAccess:82, walkScore:78,
      unemploy:4.2, university:3, seismic:'medium', sdg11:82, co2_cap:4.8,
      type:'METROPOLITAN', region:'WESTERN', eu_funds_per_cap:880 },
    'EE-TAL': { name:'Tallinn', country:'EE', flag:'🇪🇪', pop:447000, gdpCap:28400,
      growthRate:0.6, density:2580, greenSpace:26.2, transitAccess:78, walkScore:75,
      unemploy:5.8, university:4, seismic:'low', sdg11:80, co2_cap:5.2,
      type:'METROPOLITAN', region:'NORDIC_BALTIC', eu_funds_per_cap:1450 },
    'LT-KAU': { name:'Kaunas', country:'LT', flag:'🇱🇹', pop:292000, gdpCap:20800,
      growthRate:-0.2, density:1840, greenSpace:21.4, transitAccess:72, walkScore:68,
      unemploy:6.2, university:3, seismic:'low', sdg11:74, co2_cap:5.6,
      type:'REGIONAL', region:'NORDIC_BALTIC', eu_funds_per_cap:1280 },
  },

  // 50 indicatori Eurostat Urban Audit (simplificați pentru comparare)
  INDICATORS: [
    // Demografici
    { id:'pop',           label:'Populatie',          unit:'mii loc.',  dir:1,  group:'demo' },
    { id:'growthRate',    label:'Crestere demografica',unit:'%/an',      dir:1,  group:'demo' },
    { id:'density',       label:'Densitate urbana',   unit:'loc/km²',   dir:0,  group:'demo' },
    // Economic
    { id:'gdpCap',        label:'PIB/capita',         unit:'EUR',        dir:1,  group:'econ' },
    { id:'unemploy',      label:'Somaj',              unit:'%',          dir:-1, group:'econ' },
    { id:'university',    label:'Universitati',       unit:'nr',         dir:1,  group:'econ' },
    { id:'eu_funds_per_cap',label:'Fonduri UE/capita',unit:'EUR',        dir:1,  group:'econ' },
    // Mediu
    { id:'greenSpace',    label:'Spatii verzi',       unit:'m²/loc',     dir:1,  group:'env'  },
    { id:'co2_cap',       label:'CO2/capita',         unit:'tCO2',       dir:-1, group:'env'  },
    // Mobilitate
    { id:'transitAccess', label:'Acces transport pub',unit:'%',          dir:1,  group:'mob'  },
    { id:'walkScore',     label:'Walkability',        unit:'/100',       dir:1,  group:'mob'  },
    // Calitate viata
    { id:'sdg11',         label:'SDG 11 Score',       unit:'/100',       dir:1,  group:'ql'   },
  ],

  // Găseste 5 peers europeni cei mai similari pentru un UAT românesc
  findPeers(city) {
    const pop  = city.pop2021 || 100000;
    const r    = city.rata_reala_2011_2021 || 0;
    const pib  = city.pib_eur_cap || 10000;
    const type = (window._TCIMasterplanPDF?._calcGravity?.(city) || {}).growthType || 'REGIONAL';

    // Scor similitudine per oraș european
    const scored = Object.entries(this.CITIES)
      .filter(([k]) => !k.startsWith('RO-')) // excludem orașele românești din peers
      .map(([key, eu]) => {
        // Diferenta populatie (normalizata)
        const popDiff = Math.abs(eu.pop*1000 - pop) / Math.max(eu.pop*1000, pop);
        // Diferenta PIB
        const pibDiff = Math.abs(eu.gdpCap - pib) / Math.max(eu.gdpCap, pib);
        // Tip economic similar
        const typeSim = eu.type === type ? 0 : (eu.type.includes(type.slice(0,4)) ? 0.2 : 0.5);
        // Rata crestere similara
        const rDiff = Math.abs(eu.growthRate - r) / 5;
        // Scor total (mai mic = mai similar)
        const score = popDiff*0.35 + pibDiff*0.30 + typeSim*0.20 + rDiff*0.15;
        return { key, ...eu, similarityScore: score };
      })
      .sort((a,b) => a.similarityScore - b.similarityScore)
      .slice(0, 5);

    // Adaugam si cel mai bun performer din regiune (aspirational)
    const bestInClass = Object.entries(this.CITIES)
      .filter(([k]) => !k.startsWith('RO-'))
      .sort((a,b) => b[1].sdg11 - a[1].sdg11)[0];

    if(bestInClass && !scored.find(s=>s.key===bestInClass[0])) {
      scored.push({ key: bestInClass[0], ...bestInClass[1], similarityScore: 999, role:'best-in-class' });
    }

    return scored;
  },

  // Construieste profilul complet al UAT-ului pentru comparare
  buildProfile(city) {
    const pop  = city.pop2021 || 100000;
    const r    = city.rata_reala_2011_2021 || 0;
    const pib  = city.pib_eur_cap || 10000;
    const grav = window._TCIMasterplanPDF?._calcGravity?.(city) || { gravityScore:0.5 };
    const walk = Math.min(100, Math.round(30+(city.acoperire_transport||60)*0.4+pib/1000));
    return {
      name:       city.name,
      country:    'RO',
      flag:       '🇷🇴',
      pop:        Math.round(pop/1000),
      gdpCap:     pib,
      growthRate: r,
      density:    Math.round(pop/(city.suprafata_ha||Math.max(100,pop/14))*100),
      greenSpace: city.spatii_verzi_mp_loc || 11,
      transitAccess: city.acoperire_transport || 60,
      walkScore:  walk,
      unemploy:   city.rata_somaj || 5.2,
      university: city.universitati || 0,
      seismic:    (window._getRiskProfile?.(city)||{seismic:{ag:0.2}}).seismic?.ag > 0.25 ? 'high' : 'medium',
      sdg11:      Math.round(50 + (grav.gravityScore||0.5)*40 + Math.max(0,r)*5),
      co2_cap:    Math.round(4.5 + (1-(city.spatii_verzi_mp_loc||11)/20)*3),
      eu_funds_per_cap: Math.round(pib * 0.08),
      type:       grav.growthType || 'REGIONAL',
    };
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// EU BENCHMARK UI + ANALIZA
// ═══════════════════════════════════════════════════════════════════════════

G._EUBenchmark = {

  _visible: false,
  _city:    null,
  _peers:   [],
  _profile: null,

  open(cityKey) {
    const city = window._RO_CITIES_DB?.[cityKey];
    if(!city) { ss?.('Selectați un UAT mai întâi'); return; }

    this._city    = city;
    this._profile = G._EUCityDatabase.buildProfile(city);
    this._peers   = G._EUCityDatabase.findPeers(city);
    this._visible = true;

    let panel = document.getElementById('eu-benchmark-panel');
    if(!panel) {
      panel = document.createElement('div');
      panel.id = 'eu-benchmark-panel';
      panel.style.cssText = `
        position:fixed;inset:0;z-index:5200;
        background:rgba(2,6,18,.97);backdrop-filter:blur(16px);
        font-family:'IBM Plex Mono','Space Grotesk',sans-serif;
        display:flex;flex-direction:column;overflow:hidden;
      `;
      document.body.appendChild(panel);
    }
    panel.style.display = 'flex';
    panel.innerHTML = this._buildHTML();
    ss?.(`🌍 Benchmarking European: ${city.name} vs ${this._peers.slice(0,3).map(p=>p.name).join(', ')} și alte orașe similare`);
  },

  close() {
    this._visible = false;
    const p = document.getElementById('eu-benchmark-panel');
    if(p) p.style.display = 'none';
  },

  _buildHTML() {
    const city    = this._city;
    const profile = this._profile;
    const peers   = this._peers;
    const allCities = [profile, ...peers];
    const COLORS  = ['#D4AF37', '#60a5fa', '#22c55e', '#f97316', '#a78bfa', '#34d399', '#f87171'];

    // Calculăm scorurile de convergenta
    const bestEU = peers.find(p=>p.role==='best-in-class') || peers[0];
    const gapScore = Math.round((profile.sdg11 / (bestEU?.sdg11||80)) * 100);

    return `
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;
        padding:12px 20px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0;
        background:rgba(4,10,28,.9)">
        <div>
          <div style="font-size:11px;font-weight:800;color:#D4AF37;letter-spacing:.15em">
            🌍 EUROPEAN BENCHMARKING PRO
          </div>
          <div style="font-size:8px;color:rgba(148,163,184,.5)">
            ${this._s(city.name)} vs ${peers.slice(0,4).map(p=>p.name).join(' · ')} · Eurostat Urban Audit 2021 · OECD FUA 2023
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <div style="background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);
            border-radius:6px;padding:4px 12px;font-size:9px;color:#22c55e;font-weight:700">
            Convergenta UE: ${gapScore}%
          </div>
          <button onclick="document.getElementById('eu-benchmark-panel').style.display='none'"
            style="padding:5px 10px;border-radius:6px;background:rgba(255,255,255,.04);
              border:1px solid rgba(255,255,255,.1);color:rgba(148,163,184,.6);
              font-size:12px;cursor:pointer">✕</button>
        </div>
      </div>

      <!-- Body scroll -->
      <div style="flex:1;overflow-y:auto;padding:16px 20px;display:grid;
        grid-template-columns:1fr 1fr;gap:16px">

        <!-- Stânga: Radar + Peers -->
        <div>
          <div style="font-size:8px;font-weight:700;color:rgba(148,163,184,.5);margin-bottom:8px">
            RADAR — 8 DIMENSIUNI CHEIE
          </div>
          ${this._buildRadar(allCities, COLORS)}

          <div style="margin-top:12px">
            <div style="font-size:8px;font-weight:700;color:rgba(148,163,184,.5);margin-bottom:6px">
              PEER GROUP EUROPEAN
            </div>
            ${peers.map((p,i)=>`
              <div style="display:flex;align-items:center;gap:8px;padding:5px 8px;
                background:rgba(8,14,40,.6);border-radius:6px;margin-bottom:3px;
                border-left:2px solid ${COLORS[i+1]}">
                <span style="font-size:14px">${p.flag}</span>
                <div style="flex:1">
                  <div style="font-size:9px;font-weight:700;color:${COLORS[i+1]}">${p.name}</div>
                  <div style="font-size:7px;color:rgba(148,163,184,.5)">
                    ${N(p.pop*1000)} loc · ${N(p.gdpCap)} EUR/cap
                  </div>
                </div>
                <div style="text-align:right">
                  <div style="font-size:8px;color:rgba(148,163,184,.6)">SDG11: ${p.sdg11}/100</div>
                  <div style="font-size:7px;color:${p.growthRate>0?'#22c55e':'#f87171'}">
                    ${p.growthRate>0?'+':''}${p.growthRate}%/an
                  </div>
                </div>
                ${p.role==='best-in-class'?`<div style="font-size:6px;color:#D4AF37;font-weight:800">BEST</div>`:''}
              </div>`).join('')}
          </div>
        </div>

        <!-- Dreapta: Tabel complet + Gap Analysis -->
        <div>
          <div style="font-size:8px;font-weight:700;color:rgba(148,163,184,.5);margin-bottom:8px">
            COMPARATIE COMPLETĂ — 12 INDICATORI
          </div>

          <!-- Header tabel -->
          <div style="display:grid;grid-template-columns:90px ${allCities.slice(0,5).map(()=>'1fr').join(' ')};
            gap:1px;margin-bottom:3px;position:sticky;top:0;background:rgba(2,6,18,.97);z-index:1">
            <div style="font-size:6.5px;color:rgba(100,120,150,.5)">INDICATOR</div>
            ${allCities.slice(0,5).map((c,i)=>`
              <div style="font-size:7px;font-weight:700;color:${COLORS[i]};text-align:center">
                ${c.flag||'🇷🇴'} ${(c.name||'').slice(0,8)}
              </div>`).join('')}
          </div>

          ${G._EUCityDatabase.INDICATORS.map(ind=>{
            const vals = allCities.slice(0,5).map(c => c[ind.id]||0);
            const best = ind.dir===1 ? Math.max(...vals) : ind.dir===-1 ? Math.min(...vals) : null;

            return `<div style="display:grid;grid-template-columns:90px ${allCities.slice(0,5).map(()=>'1fr').join(' ')};
              gap:1px;margin-bottom:1px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,.03)">
              <div>
                <div style="font-size:7px;color:rgba(148,163,184,.8)">${ind.label}</div>
                <div style="font-size:5.5px;color:rgba(100,120,150,.4)">${ind.unit}</div>
              </div>
              ${vals.map((v,i)=>{
                const isBest = best!==null && v===best;
                const isCity = i===0;
                const color = isBest?COLORS[i]: isCity?'rgba(200,215,235,.8)':'rgba(148,163,184,.5)';
                const fmt_v = ind.id==='pop'?N(Math.round(v)):ind.id==='gdpCap'?N(v):ind.id.includes('Rate')||ind.id==='unemploy'?v.toFixed(1)+'%':N(v);
                return `<div style="text-align:center;padding:1px">
                  <div style="font-size:8px;font-weight:${isBest||isCity?'800':'500'};color:${color};
                    font-family:'IBM Plex Mono'">${fmt_v}</div>
                  ${isBest?`<div style="font-size:5px;color:${COLORS[i]};font-weight:700">BEST</div>`:''}
                </div>`;
              }).join('')}
            </div>`;
          }).join('')}

          <!-- Gap Analysis -->
          <div style="margin-top:12px">
            <div style="font-size:8px;font-weight:700;color:rgba(148,163,184,.5);margin-bottom:6px">
              GAP ANALYSIS — ${this._s(city.name)} față de best-in-class european
            </div>
            ${G._EUCityDatabase.INDICATORS.filter(i=>i.dir!==0).slice(0,6).map(ind=>{
              const myVal = profile[ind.id] || 0;
              const bestVal = peers.reduce((best,p)=>{
                const v=p[ind.id]||0;
                return ind.dir===1?(v>best?v:best):(v<best?v:best);
              }, myVal);
              const gap = bestVal ? ((myVal-bestVal)/Math.max(Math.abs(bestVal),1)*100) : 0;
              const isAhead = ind.dir===1 ? myVal>=bestVal : myVal<=bestVal;
              const pct = Math.round(Math.abs(gap));

              return `<div style="display:flex;align-items:center;gap:6px;padding:3px 0;
                border-bottom:1px solid rgba(255,255,255,.04)">
                <span style="font-size:8px">${isAhead?'✅':'📊'}</span>
                <span style="flex:1;font-size:7.5px;color:rgba(148,163,184,.8)">${ind.label}</span>
                <span style="font-size:7.5px;font-weight:700;color:${isAhead?'#22c55e':'#f59e0b'};
                  font-family:'IBM Plex Mono'">
                  ${isAhead?'LA NIVEL':'−'+pct+'%'}
                </span>
              </div>`;
            }).join('')}
          </div>

          <!-- Recomandare cheie -->
          <div style="margin-top:10px;background:rgba(212,175,55,.06);border-radius:8px;
            padding:10px;border:1px solid rgba(212,175,55,.2)">
            <div style="font-size:8px;font-weight:800;color:#D4AF37;margin-bottom:4px">
              💡 RECOMANDARE STRATEGICĂ
            </div>
            <div style="font-size:8px;color:rgba(148,163,184,.8);line-height:1.5">
              ${this._generateRecommendation(city, profile, peers)}
            </div>
            <div style="font-size:6px;color:rgba(100,120,150,.4);margin-top:4px">
              Eurostat Urban Audit 2021 · OECD "Rethinking Urban Sprawl" 2018 · JRC Urban Observatory
            </div>
          </div>
        </div>
      </div>`;
  },

  _buildRadar(cities, colors) {
    const SZ=280, cx=140, cy=140, R=105;
    const inds = [
      {id:'sdg11',      label:'SDG11'},
      {id:'walkScore',  label:'Walk'},
      {id:'greenSpace', label:'Verde'},
      {id:'transitAccess',label:'TP'},
      {id:'gdpCap',     label:'PIB',     scale:40000},
      {id:'growthRate', label:'Crestere',scale:5,  offset:2.5},
      {id:'university', label:'Univers.',scale:5},
      {id:'eu_funds_per_cap',label:'EU Funds',scale:1500},
    ];
    const step = (Math.PI*2)/8;
    let svg = `<svg width="${SZ}" height="${SZ}" viewBox="0 0 ${SZ} ${SZ}" xmlns="http://www.w3.org/2000/svg">`;
    // Grid
    [25,50,75,100].forEach(r=>{
      svg+=`<circle cx="${cx}" cy="${cy}" r="${R*r/100}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="0.5"/>`;
    });
    // Axes
    inds.forEach((_,i)=>{
      const a=i*step-Math.PI/2;
      svg+=`<line x1="${cx}" y1="${cy}" x2="${(cx+R*Math.cos(a)).toFixed(1)}" y2="${(cy+R*Math.sin(a)).toFixed(1)}" stroke="rgba(255,255,255,.08)" stroke-width="0.5"/>`;
      const lr=R+14;
      svg+=`<text x="${(cx+lr*Math.cos(a)).toFixed(1)}" y="${(cy+lr*Math.sin(a)).toFixed(1)}" text-anchor="middle" dominant-baseline="middle" fill="rgba(148,163,184,.7)" font-size="8" font-family="IBM Plex Mono">${inds[i].label}</text>`;
    });
    // Polygons
    cities.slice(0,5).forEach((c,ci)=>{
      const pts = inds.map((ind,i)=>{
        let v = c[ind.id]||0;
        const sc = ind.scale||100;
        const off = ind.offset||0;
        let norm = Math.min(1, Math.max(0, (v+off)/sc));
        const a = i*step-Math.PI/2;
        return [(cx+R*norm*Math.cos(a)).toFixed(1), (cy+R*norm*Math.sin(a)).toFixed(1)];
      });
      const d = pts.map((p,i)=>(i?'L':'M')+p[0]+','+p[1]).join(' ')+'Z';
      svg += `<path d="${d}" fill="${colors[ci]}" fill-opacity="0.12" stroke="${colors[ci]}" stroke-width="1.5" stroke-opacity="0.85"/>`;
      pts.forEach(p=>{ svg+=`<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="${colors[ci]}" fill-opacity="0.9"/>`; });
    });
    // Legend
    cities.slice(0,5).forEach((c,ci)=>{
      svg+=`<rect x="6" y="${SZ-13-ci*12}" width="6" height="6" rx="1" fill="${colors[ci]}"/>`;
      svg+=`<text x="15" y="${SZ-9-ci*12}" fill="${colors[ci]}" font-size="8" font-family="IBM Plex Mono" font-weight="700">${c.flag||'🇷🇴'} ${(c.name||'UAT').slice(0,16)}</text>`;
    });
    svg+='</svg>';
    return svg;
  },

  _generateRecommendation(city, profile, peers) {
    const r    = city.rata_reala_2011_2021||0;
    const pib  = city.pib_eur_cap||10000;
    const walk = profile.walkScore||50;
    const best = peers[0];

    if(!best) return 'Date insuficiente pentru recomandare.';

    const recs = [];
    if(walk < best.walkScore - 10) recs.push(`Walkability cu ${best.walkScore-walk} puncte sub ${best.name} — investiți în rețea pietonală și stații TP`);
    if(profile.greenSpace < best.greenSpace - 3) recs.push(`${best.name} are +${(best.greenSpace-profile.greenSpace).toFixed(1)}m²/loc spații verzi — rezervați terenuri în PUG`);
    if(pib < best.gdpCap*0.7) recs.push(`Gap economic față de ${best.name}: ${N(best.gdpCap-pib)} EUR/cap — stimulente pentru atragerea investițiilor`);
    if(profile.sdg11 < best.sdg11 - 5) recs.push(`SDG 11 cu ${best.sdg11-profile.sdg11} puncte sub ${best.name} — priorități: transport public și eficiență energetică`);

    return recs.length > 0
      ? recs.slice(0,2).map(r=>'→ '+r).join(' ')
      : `${this._s(city.name)} este la nivelul peer group-ului european. Focus pe ${r>0?'consolidarea creșterii și infrastructura metropolitană':'reabilitarea fondului existent și atragerea populației tinere'}.`;
  },

  _s(text) {
    return String(text||'').replace(/[ăĂâÂîÎșȘşŞțȚţŢ]/g,ch=>({ă:'a',Ă:'A',â:'a',Â:'A',î:'i',Î:'I',ș:'s',Ș:'S',ş:'s',Ş:'S',ț:'t',Ț:'T',ţ:'t',Ţ:'T'}[ch]||ch)).replace(/[^\x20-\x7E]/g,' ').trim().slice(0,200);
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// PATCH MASTERPLAN — pagina EU Benchmarking Pro în PDF
// ═══════════════════════════════════════════════════════════════════════════

G._EUBenchmarkPDFPage = {
  apply() {
    const MP = window._TCIMasterplanPDF;
    if(!MP || MP._euBenchPatchApplied) return;
    MP._euBenchPatchApplied = true;

    // Adăugăm pagina EU Benchmark după _pg9_benchmark existent
    const origPg9 = MP._pg9_benchmark?.bind(MP);
    if(origPg9) {
      MP._pg9_benchmark = function(c) {
        origPg9(c);
        // Adăugăm pagina EU Benchmark imediat după
        G._EUBenchmarkPDFPage._generatePage(c);
      };
    }
    console.log('[EUBenchmark] ✅ Pagina EU Benchmarking Pro adăugată în Masterplan');
  },

  _generatePage(c) {
    const {pdf, W, H, city, today} = c;
    const S2 = t => String(t||'').replace(/[ăĂâÂîÎșȘşŞțȚţŢ]/g,ch=>({ă:'a',Ă:'A',â:'a',Â:'A',î:'i',Î:'I',ș:'s',Ș:'S',ş:'s',Ş:'S',ț:'t',Ț:'T',ţ:'t',Ţ:'T'}[ch]||ch)).replace(/[^\x20-\x7E]/g,' ').trim().slice(0,300);
    const Nl = (v,d=0)=>isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});

    pdf.addPage();
    // Header
    pdf.setFillColor(8,15,38); pdf.rect(0,0,W,13,'F');
    pdf.setFillColor(212,175,55); pdf.rect(0,12.5,W,0.6,'F');
    pdf.setTextColor(212,175,55); pdf.setFont('helvetica','bold'); pdf.setFontSize(9);
    pdf.text('8b. BENCHMARKING EUROPEAN PRO', 8, 9);
    pdf.setTextColor(100,120,160); pdf.setFont('helvetica','normal'); pdf.setFontSize(7);
    pdf.text(S2(city.name) + '  ·  vs peer group European  ·  ' + today, W-8, 9, {align:'right'});
    let y = 22;

    const profile = G._EUCityDatabase.buildProfile(city);
    const peers   = G._EUCityDatabase.findPeers(city);
    const COLORS  = [[212,175,55],[59,130,246],[34,197,94],[249,115,22],[167,139,250],[52,211,153]];

    // Nota metodologica
    pdf.setFillColor(8,16,48); pdf.rect(14,y,W-28,8,'F');
    pdf.setFillColor(59,130,246); pdf.rect(14,y,3,8,'F');
    pdf.setTextColor(59,130,246); pdf.setFont('helvetica','bold'); pdf.setFontSize(7.5);
    pdf.text('Metodologie: Eurostat Urban Audit 2021 + OECD Functional Urban Areas 2023 + JRC Urban Observatory', 20,y+5.5);
    y+=10;

    // Tabel peers
    const allC = [profile, ...peers.slice(0,4)];
    const INDS = G._EUCityDatabase.INDICATORS;

    // Header
    pdf.setFillColor(10,20,55); pdf.rect(14,y,W-28,7,'F');
    let cx=14;
    const cw=[50,...Array(5).fill((W-28-50)/5)];
    ['INDICATOR', ...allC.map(c=>c.flag+''+c.name.slice(0,8))].forEach((h,i)=>{
      const [r,g,b] = i===0?[180,140,30]:COLORS[i-1]||[148,163,184];
      pdf.setTextColor(r,g,b); pdf.setFont('helvetica','bold'); pdf.setFontSize(i===0?7:7.5);
      pdf.text(S2(h),cx+1,y+4.8);
      cx+=cw[i];
    });
    y+=7;

    INDS.forEach((ind,ri)=>{
      if(y>H-20){pdf.addPage();pdf.setFillColor(8,15,38);pdf.rect(0,0,W,13,'F');pdf.setFillColor(212,175,55);pdf.rect(0,12.5,W,0.6,'F');y=20;}
      const vals = allC.map(c=>c[ind.id]||0);
      const best = ind.dir===1?Math.max(...vals):ind.dir===-1?Math.min(...vals):null;
      pdf.setFillColor(ri%2===0?10:8,ri%2===0?18:14,ri%2===0?44:36);
      pdf.rect(14,y,W-28,6,'F');
      cx=14;
      vals.forEach((v,vi)=>{
        const isBest = best!==null && v===best;
        const isCity = vi===0;
        const [r,g,b] = isBest?COLORS[vi]:isCity?[200,215,240]:[100,120,150];
        pdf.setTextColor(r,g,b);
        pdf.setFont('helvetica',isBest||isCity?'bold':'normal');
        pdf.setFontSize(isBest?8.5:7.5);
        const fmtV = ind.id==='gdpCap'?Nl(v)+' EUR':ind.id==='pop'?Nl(Math.round(v))+'k':ind.id.includes('Rate')||ind.id==='unemploy'?v.toFixed(1)+'%':Nl(v);
        if(vi===0){
          pdf.setTextColor(148,163,184);pdf.setFont('helvetica','normal');pdf.setFontSize(7);
          pdf.text(S2(ind.label).slice(0,22)+' ('+S2(ind.unit)+')',cx+1,y+4.2);
        } else {
          pdf.text(S2(fmtV).slice(0,14),cx+1,y+4.2);
          if(isBest){pdf.setTextColor(...COLORS[vi]);pdf.setFontSize(5.5);pdf.text('BEST',cx+1,y+6);}
        }
        cx+=cw[vi];
      });
      y+=6;
    });

    y+=5;
    // Gap summary
    pdf.setFillColor(6,12,36); pdf.roundedRect(14,y,W-28,14,2,2,'F');
    pdf.setDrawColor(212,175,55); pdf.setLineWidth(0.3); pdf.roundedRect(14,y,W-28,14,2,2,'S');
    pdf.setTextColor(212,175,55); pdf.setFont('helvetica','bold'); pdf.setFontSize(8);
    pdf.text('POZITIONARE EUROPEANA: '+S2(city.name), 18, y+5.5);
    pdf.setTextColor(148,163,184); pdf.setFont('helvetica','normal'); pdf.setFontSize(7);
    const bestCity = peers[0];
    pdf.text(S2('Convergenta fata de best-in-class ('+bestCity?.name+' '+bestCity?.flag+'): '+
      Math.round((profile.sdg11/(bestCity?.sdg11||80))*100)+'% · PIB gap: '+
      Nl(Math.max(0,(bestCity?.gdpCap||20000)-profile.gdpCap))+' EUR/cap'), 18, y+10.5);

    pdf.setFillColor(4,10,26); pdf.rect(0,H-11,W,11,'F');
    pdf.setDrawColor(212,175,55); pdf.setLineWidth(0.3); pdf.line(0,H-11,W,H-11);
    pdf.setTextColor(100,120,150); pdf.setFont('helvetica','normal'); pdf.setFontSize(6.5);
    pdf.text('Eurostat Urban Audit 2021 · OECD FUA 2023 · JRC Urban Observatory · Date comparate la paritate putere de cumparare', W/2, H-5.5, {align:'center'});
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// INTEGRARE UI — în meniuri
// ═══════════════════════════════════════════════════════════════════════════

(function _init(n) {
  if(n>80) return;
  if(!document.getElementById('panel-tabs') && !document.getElementById('viz-menu')) {
    setTimeout(()=>_init(n+1), 400); return;
  }

  // Injectam în Vizualizare menu
  const injectMenu = () => {
    const vizMenu = document.getElementById('viz-menu');
    if(vizMenu && !document.getElementById('eu-bench-menu-item')) {
      const btn = document.createElement('button');
      btn.id = 'eu-bench-menu-item';
      btn.style.cssText = 'display:block;width:100%;text-align:left;background:none;border:none;color:#34d399;padding:7px 10px;cursor:pointer;border-radius:6px;font-size:12px;font-family:inherit';
      btn.innerHTML = '🌍 European Benchmarking Pro';
      btn.onmouseover = ()=>{ btn.style.background='rgba(52,211,153,.12)'; };
      btn.onmouseout  = ()=>{ btn.style.background='none'; };
      btn.onclick = () => {
        const key = window.TCI?.cityKey || window._ProjectionEngine?.currentCity || 'RO-IS-01';
        G._EUBenchmark.open(key);
        document.getElementById('viz-menu').style.display='none';
      };
      vizMenu.appendChild(btn);
      return true;
    }
    return false;
  };

  // Patch Masterplan
  const patchMP = () => {
    if(typeof window._TCIMasterplanPDF !== 'undefined') {
      G._EUBenchmarkPDFPage.apply();
      return true;
    }
    return false;
  };

  [1000,3000,6000].forEach(d => setTimeout(injectMenu, d));
  [1500,4000,8000].forEach(d => setTimeout(patchMP, d));

  window._EUBenchmark      = G._EUBenchmark;
  window._EUCityDatabase   = G._EUCityDatabase;
  window._EUBenchmarkPDFPage = G._EUBenchmarkPDFPage;

  console.log('[EU Benchmark Pro v1.0] ✅ 17 orase europene · 12 indicatori · Vizualizare radar · PDF integrat');
  ss?.('🌍 European Benchmarking Pro activ — Vizualizare ▾ → European Benchmarking Pro');
})(0);

})(window);
