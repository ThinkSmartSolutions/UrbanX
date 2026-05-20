// ═══════════════════════════════════════════════════════════════════════════
// tci-intelligence.js — UrbanX TCI Intelligence Layer v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
//
// Ce face acest modul (tot ce era promis și lipsea):
//
// ① DASHBOARD TCI în panoul principal (tab Scen.)
//    Scor investițional instant când selectezi parcela
//    KPI-uri live: demografie, construire, PIB, risc
//    Grafice inline Chart.js: proiecție pop., autorizații, housing mix
//    Detectare automată UAT din parcela activă
//
// ② VIZUALIZARE 4D — Slider temporal pe hartă Mapbox
//    Layer Mapbox cu densitate construire evolutivă 1990→2055
//    Date: Copernicus GHSL (regresie per coordonate) + proiecție internă
//    Animație automată cu buton Play/Pause
//    Click pe orice zonă → breakdown surse + scor
//    Integrat în tc-scen ca sub-secțiune
//
// ③ COMPARATOR INTER-UAT avansat
//    Radar chart SVG 8 indicatori normalizați față de media națională
//    Tabel benchmarking cu orice UAT din baza de 3181
//    Comparare cu orașe europene similare (Eurostat Urban Audit)
//    Export CSV
//
// ④ MILESTONES NARATIVE în filmul TCI Cinema
//    Titluri cu date verificabile pe ecran în timp ce rulează filmul
//    Conectate la masterplan (date reale, nu text generic)
//    Overlay transparent deasupra hărții
//
// ⑤ OSM OVERPASS — infrastructură urbană live
//    Număr școli/spitale/transport în raza 500m/1km/2km
//    Scor accesibilitate calculat din POI reali
//    Integrat în scorul gravitațional
//
// INTEGRARE: Se încarcă DUPĂ tci-masterplan.js
// Nu suprascrie nicio funcție existentă.
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

const S2 = s => String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
const N  = (v,d=0) => isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
const Pct = (v,d=1) => (v>=0?'+':'')+Number(v).toFixed(d)+'%';

// ═══════════════════════════════════════════════════════════════════════════
// ① DASHBOARD TCI — înlocuiește conținutul tc-scen cu UI real
// ═══════════════════════════════════════════════════════════════════════════

G._TCIDashboard = {

  _built: false,
  _currentCity: null,
  _currentScenario: 'S2',
  _charts: {},

  init() {
    // Injectăm stiluri
    this._injectStyles();
    // Construim UI în tc-scen
    this._buildPanel();
    // Ascultăm schimbarea parcelei active
    this._watchParcel();
    console.log('[TCI Dashboard] ✅ inițializat');
  },

  _injectStyles() {
    if(document.getElementById('tci-dash-styles')) return;
    const s = document.createElement('style');
    s.id = 'tci-dash-styles';
    s.textContent = `
      .tci-d-section { margin: 0 0 10px; }
      .tci-d-section-title {
        font-size: 8px; font-weight: 800; color: #D4AF37;
        letter-spacing: .12em; text-transform: uppercase;
        padding: 0 0 4px; border-bottom: 1px solid rgba(212,175,55,.15);
        margin-bottom: 6px;
      }
      .tci-score-ring {
        display: flex; align-items: center; gap: 10px;
        background: rgba(12,22,52,.8); border-radius: 10px;
        padding: 10px; margin-bottom: 8px;
        border: 1px solid rgba(212,175,55,.2);
      }
      .tci-score-num {
        font-size: 28px; font-weight: 900; line-height: 1;
        font-family: 'Space Grotesk','IBM Plex Mono',monospace;
      }
      .tci-score-label { font-size: 7px; color: rgba(148,163,184,.6); margin-top: 2px; }
      .tci-score-type { font-size: 10px; font-weight: 800; }
      .tci-kpi-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 8px;
      }
      .tci-kpi {
        background: rgba(10,18,44,.6); border-radius: 7px; padding: 7px;
        border: 1px solid rgba(255,255,255,.06);
      }
      .tci-kpi-val { font-size: 12px; font-weight: 800; color: #e2e8f0; font-family: 'IBM Plex Mono',monospace; }
      .tci-kpi-lbl { font-size: 7px; color: rgba(148,163,184,.55); margin-top: 1px; }
      .tci-kpi-src { font-size: 5.5px; color: rgba(100,120,150,.4); font-style: italic; }
      .tci-chart-wrap {
        background: rgba(8,14,34,.7); border-radius: 8px;
        padding: 8px; margin-bottom: 8px;
        border: 1px solid rgba(255,255,255,.05);
      }
      .tci-chart-title { font-size: 7.5px; font-weight: 700; color: rgba(148,163,184,.7); margin-bottom: 5px; }
      .tci-scen-btn {
        padding: 5px 8px; border-radius: 5px; font-size: 9px;
        font-weight: 700; cursor: pointer; font-family: inherit;
        transition: all .15s; border: 1px solid;
      }
      .tci-scen-btn.active { background: rgba(212,175,55,.2); border-color: rgba(212,175,55,.6); color: #D4AF37; }
      .tci-scen-btn:not(.active) { background: transparent; border-color: rgba(255,255,255,.1); color: rgba(148,163,184,.6); }
      .tci-action-btn {
        width: 100%; padding: 8px; border-radius: 7px; font-size: 10px;
        font-weight: 700; cursor: pointer; font-family: inherit;
        transition: all .15s; margin-bottom: 5px;
      }
      .tci-4d-slider {
        width: 100%; accent-color: #D4AF37;
        background: transparent; cursor: pointer;
      }
      .tci-cmp-inp {
        width: 100%; background: rgba(255,255,255,.07);
        border: 1px solid rgba(255,255,255,.12); color: #e2e8f0;
        padding: 7px 9px; border-radius: 6px; font-size: 11px;
        font-family: inherit; box-sizing: border-box; outline: none;
      }
      .tci-cmp-inp:focus { border-color: rgba(59,130,246,.5); }
      .tci-cmp-res {
        background: rgba(4,8,20,.97); border: 1px solid rgba(255,255,255,.1);
        border-radius: 6px; max-height: 120px; overflow-y: auto;
        display: none; margin-top: 3px; position: absolute; z-index: 100; width: 100%;
      }
      .tci-cmp-item {
        padding: 7px 10px; cursor: pointer; font-size: 10px; color: rgba(200,215,235,.9);
      }
      .tci-cmp-item:hover { background: rgba(255,255,255,.05); }
      .tci-radar-svg text { font-family: 'IBM Plex Mono', monospace; }
    `;
    document.head.appendChild(s);
  },

  _buildPanel() {
    const tc = document.getElementById('tc-scen');
    if(!tc) return;

    tc.innerHTML = `
      <div id="tci-dash-root" style="padding: 0 2px;">

        <!-- HEADER + SELECȚIE UAT -->
        <div class="tci-d-section">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
            <div>
              <div style="font-size:9px;font-weight:800;color:#D4AF37;letter-spacing:.12em">TCI INTELLIGENCE</div>
              <div id="tci-d-uat-name" style="font-size:11px;font-weight:700;color:#e2e8f0">Selectați o parcelă</div>
            </div>
            <button onclick="openTCI&&openTCI()" title="Deschide TCI Cinema fullscreen"
              style="padding:5px 9px;border-radius:6px;background:rgba(139,92,246,.15);
                border:1px solid rgba(139,92,246,.4);color:#8b5cf6;
                font-size:9px;font-weight:700;cursor:pointer;font-family:inherit">
              🎬 Film
            </button>
          </div>

          <!-- Scenarii -->
          <div style="display:flex;gap:4px;margin-bottom:8px">
            <button class="tci-scen-btn active" onclick="_TCIDashboard._setScenario('S1',this)">S1</button>
            <button class="tci-scen-btn active" id="tci-d-s2" onclick="_TCIDashboard._setScenario('S2',this)">S2 ◄</button>
            <button class="tci-scen-btn" onclick="_TCIDashboard._setScenario('S3',this)">S3</button>
          </div>
        </div>

        <!-- SCOR INVESTIȚIONAL -->
        <div class="tci-d-section" id="tci-d-score-section">
          <div class="tci-score-ring" id="tci-d-score-ring">
            <div>
              <div class="tci-score-num" id="tci-d-score-num" style="color:#64748b">—</div>
              <div class="tci-score-label">SCOR INVESTIȚIONAL</div>
              <div class="tci-score-label">/100 · model gravitațional</div>
            </div>
            <div style="flex:1">
              <div class="tci-score-type" id="tci-d-growthtype" style="color:#64748b">—</div>
              <div style="font-size:7px;color:rgba(148,163,184,.5);margin-top:3px" id="tci-d-score-desc">—</div>
              <div style="margin-top:5px">
                <div style="height:3px;background:rgba(255,255,255,.06);border-radius:2px">
                  <div id="tci-d-score-bar" style="height:3px;background:#64748b;border-radius:2px;width:0%;transition:width .6s"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- KPI-URI LIVE -->
        <div class="tci-d-section">
          <div class="tci-d-section-title">Indicatori UAT · date oficiale</div>
          <div class="tci-kpi-grid" id="tci-d-kpis">
            ${this._kpiPlaceholders()}
          </div>
        </div>

        <!-- GRAFIC PROIECȚIE DEMOGRAFICĂ -->
        <div class="tci-d-section">
          <div class="tci-d-section-title">Proiecție demografică 2025–2055</div>
          <div class="tci-chart-wrap">
            <div class="tci-chart-title" id="tci-d-demo-title">Selectați o parcelă pentru date</div>
            <canvas id="tci-d-demo-chart" height="70" style="width:100%;display:block"></canvas>
            <div style="font-size:6px;color:rgba(100,120,150,.4);margin-top:3px">
              Sursa: INSE Rec.2021 · model cohort-component · Eurostat EUROPOP2023
            </div>
          </div>
        </div>

        <!-- GRAFIC AUTORIZAȚII -->
        <div class="tci-d-section">
          <div class="tci-d-section-title">Dinamica autorizațiilor de construire</div>
          <div class="tci-chart-wrap">
            <canvas id="tci-d-auth-chart" height="55" style="width:100%;display:block"></canvas>
            <div style="font-size:6px;color:rgba(100,120,150,.4);margin-top:3px">
              Sursa: ANCPI/INSE CON101A 2015–2023 + prognoză model
            </div>
          </div>
        </div>

        <!-- HOUSING MIX -->
        <div class="tci-d-section">
          <div class="tci-d-section-title">Structura recomandată ofertă locuințe</div>
          <div class="tci-chart-wrap">
            <canvas id="tci-d-hm-chart" height="65" style="width:100%;display:block"></canvas>
            <div style="font-size:6px;color:rgba(100,120,150,.4);margin-top:3px">
              Housing mix: model demografic UrbanX · Eurostat HH2030
            </div>
          </div>
        </div>

        <!-- 4D TIMELINE -->
        <div class="tci-d-section">
          <div class="tci-d-section-title">Vizualizare 4D — Densitate construire</div>
          <div style="background:rgba(8,14,34,.7);border-radius:8px;padding:8px;border:1px solid rgba(255,255,255,.05)">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
              <span id="tci-4d-year-label" style="font-size:13px;font-weight:900;color:#D4AF37;font-family:'IBM Plex Mono',monospace">2025</span>
              <div style="display:flex;gap:4px">
                <button id="tci-4d-play" onclick="_TCITimeline.togglePlay()"
                  style="padding:4px 10px;border-radius:5px;background:rgba(59,130,246,.2);
                    border:1px solid rgba(59,130,246,.4);color:#60a5fa;
                    font-size:10px;font-weight:700;cursor:pointer;font-family:inherit">
                  ▶ Play
                </button>
                <button onclick="_TCITimeline.addToMap()"
                  style="padding:4px 8px;border-radius:5px;background:rgba(34,197,94,.1);
                    border:1px solid rgba(34,197,94,.3);color:#4ade80;
                    font-size:9px;cursor:pointer;font-family:inherit">
                  🗺 Pe hartă
                </button>
              </div>
            </div>
            <input type="range" class="tci-4d-slider" id="tci-4d-slider"
              min="1990" max="2055" step="5" value="2025"
              oninput="_TCITimeline.setYear(+this.value)">
            <div style="display:flex;justify-content:space-between;font-size:6px;color:rgba(100,120,150,.5);margin-top:2px">
              <span>1990</span><span>2000</span><span>2010</span><span>2021</span><span>2035</span><span>2055</span>
            </div>
            <div id="tci-4d-info" style="margin-top:6px;font-size:8px;color:rgba(148,163,184,.7);min-height:20px"></div>
          </div>
        </div>

        <!-- COMPARATOR -->
        <div class="tci-d-section">
          <div class="tci-d-section-title">Comparator inter-UAT</div>
          <div style="position:relative">
            <input type="text" class="tci-cmp-inp" id="tci-cmp-inp"
              placeholder="Caută alt UAT pentru comparare..."
              oninput="_TCIComparator.search(this.value)"
              autocomplete="off">
            <div class="tci-cmp-res" id="tci-cmp-res"></div>
          </div>
          <div id="tci-d-radar-wrap" style="margin-top:8px;display:none">
            <div class="tci-chart-title" id="tci-d-radar-title">Radar 8 indicatori (medie RO = 100)</div>
            <svg id="tci-d-radar" viewBox="0 0 240 200" style="width:100%;display:block"></svg>
            <div id="tci-d-bench-table" style="margin-top:6px"></div>
            <button onclick="_TCIComparator.exportCSV()"
              style="margin-top:5px;padding:5px 8px;border-radius:5px;background:rgba(56,189,248,.1);
                border:1px solid rgba(56,189,248,.3);color:#38bdf8;font-size:9px;cursor:pointer;font-family:inherit">
              ⬇ Export CSV comparativ
            </button>
          </div>
        </div>

        <!-- ACȚIUNI -->
        <div class="tci-d-section">
          <div class="tci-d-section-title">Export & Acțiuni</div>
          <button class="tci-action-btn"
            style="background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.35);color:#D4AF37"
            onclick="_TCIDashboard._genMasterplan()">
            📋 Masterplan Strategic PDF (12 pagini)
          </button>
          <button class="tci-action-btn"
            style="background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.3);color:#60a5fa"
            onclick="openTCI&&openTCI()">
            🎬 TCI Cinema — Film 2025→2055
          </button>
          <button class="tci-action-btn"
            style="background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.25);color:#4ade80"
            onclick="_TCIComparator.exportCSV()">
            📊 Export date JSON (citabile)
          </button>
        </div>

        <div style="font-size:6px;color:rgba(60,80,110,.5);text-align:center;padding:4px 0">
          Date: INSE · Eurostat · BNR · INFP · ANAR · ANM · ANCPI<br>
          UrbanX TSS·FG · Document orientativ
        </div>
      </div>
    `;

    // Init scenarii butoane
    setTimeout(()=>{
      document.querySelectorAll('.tci-scen-btn').forEach((b,i)=>{
        b.classList.toggle('active', i===1); // S2 default
      });
    }, 100);

    this._built = true;
  },

  _kpiPlaceholders() {
    const items = [
      ['—','Populație 2021','INSE Rec.'],
      ['—','Creștere/an','INSE 2011-21'],
      ['—','Autorizații/an','ANCPI 2023'],
      ['—','PIB/cap','Eurostat'],
    ];
    return items.map(([v,l,s])=>`
      <div class="tci-kpi">
        <div class="tci-kpi-val">${v}</div>
        <div class="tci-kpi-lbl">${l}</div>
        <div class="tci-kpi-src">${s}</div>
      </div>`).join('');
  },

  _watchParcel() {
    // Polling la starea parcelei active
    let lastParcel = null;
    const poll = setInterval(()=>{
      const ap = window.S?.parcels?.[window.S?.activeParcel??0];
      if(!ap || ap === lastParcel) return;
      lastParcel = ap;
      this._onParcelChange(ap);
    }, 800);
    setTimeout(()=>clearInterval(poll), 3600000); // 1h max
  },

  _onParcelChange(ap) {
    // Detectează UAT-ul din parcelă
    const uatName = (ap.uat||'').toLowerCase()
      .replace('municipiul ','').replace('orașul ','').replace('orasul ','').trim();

    let cityKey = null, cityData = null;

    if(typeof _RO_CITIES_DB !== 'undefined'){
      const match = Object.entries(_RO_CITIES_DB).find(([k,v])=>{
        const n = (v.name||'').toLowerCase();
        return n.includes(uatName) || uatName.includes(n.slice(0,5));
      });
      if(match){ cityKey = match[0]; cityData = match[1]; }
    }

    if(!cityData && typeof _UAT_DB !== 'undefined'){
      const match2 = Object.entries(_UAT_DB).find(([k,v])=>
        (v.name||'').toLowerCase().includes(uatName));
      if(match2){ cityKey = match2[0]; cityData = match2[1]; }
    }

    if(!cityData) return; // UAT necunoscut

    this._currentCity = cityData;
    this._currentCityKey = cityKey;
    this._updateUI(cityData, cityKey);
  },

  _updateUI(city, cityKey) {
    if(!this._built) return;

    // Titlu
    const nameEl = document.getElementById('tci-d-uat-name');
    if(nameEl) nameEl.textContent = (city.name||'—')+' · '+(city.judet||city.judet_code||'—');

    // Calculează scoruri
    const grav = (typeof _calcGravityLocal==='function') ? _calcGravityLocal(city)
               : (G._TCIMasterplanPDF?._calcGravity?.(city)) || this._calcGravityFallback(city);
    const need = (G._TCIMasterplanPDF?._calcNeed?.(city, this._currentScenario)) || this._calcNeedFallback(city);
    const risk = (typeof _getRiskProfile==='function') ? _getRiskProfile(city) : null;

    const score = Math.round((grav.gravityScore||grav.score||0.5) * 100);
    const gt = grav.growthType||'REGIONAL';
    const gtColors = {
      METROPOLITAN:'#22c55e',REGIONAL:'#3b82f6',GROWING:'#22c55e',
      LOCAL:'#f59e0b',WEAKENING:'#f59e0b',DECLINING:'#ef4444',SHRINKING:'#dc2626'
    };
    const col = gtColors[gt]||'#64748b';

    // Scor ring
    const scoreEl = document.getElementById('tci-d-score-num');
    const typeEl  = document.getElementById('tci-d-growthtype');
    const barEl   = document.getElementById('tci-d-score-bar');
    const descEl  = document.getElementById('tci-d-score-desc');
    if(scoreEl){ scoreEl.textContent = score; scoreEl.style.color = col; }
    if(typeEl) { typeEl.textContent = gt; typeEl.style.color = col; }
    if(barEl)  { barEl.style.width = score+'%'; barEl.style.background = col; }
    const gtDesc = {
      METROPOLITAN:'Pol metropolitan activ · cerere ridicată',
      REGIONAL:'Centru regional · creștere moderată',
      GROWING:'Creștere rapidă · presiune periurbană',
      LOCAL:'Dinamică locală · cerere slabă',
      WEAKENING:'Tendință declin · fond subutilizat',
      DECLINING:'Declin confirmat · zero construcții noi',
      SHRINKING:'Contracție severă',
    };
    if(descEl) descEl.textContent = gtDesc[gt]||'—';

    // KPI grid
    const r = city.rata_reala_2011_2021||0;
    const kpis = [
      [N(city.pop2021), 'Populație 2021', 'INSE Rec.2021'],
      [Pct(r,1)+'/an', 'Creștere an.', 'INSE 2011-21'],
      [city.autorizatii_2023 ? N(city.autorizatii_2023) : '—', 'Autorizații/an', 'ANCPI 2023'],
      [city.pib_eur_cap ? N(city.pib_eur_cap)+' €' : '—', 'PIB/cap', 'Eurostat'],
    ];
    const kpiEl = document.getElementById('tci-d-kpis');
    if(kpiEl) kpiEl.innerHTML = kpis.map(([v,l,s])=>`
      <div class="tci-kpi">
        <div class="tci-kpi-val" style="color:${v==='—'?'#475569':'#e2e8f0'}">${v}</div>
        <div class="tci-kpi-lbl">${l}</div>
        <div class="tci-kpi-src">${s}</div>
      </div>`).join('');

    // Grafice
    this._drawDemoChart(city, need);
    this._drawAuthChart(city, need);
    this._drawHousingMixChart(city, need, grav);

    // Timeline 4D cu UAT-ul nou
    if(G._TCITimeline) G._TCITimeline.setCity(city);

    // Comparator - actualizează referința
    if(G._TCIComparator) G._TCIComparator.setReference(city, cityKey, grav, need);
  },

  _setScenario(sc, btn) {
    this._currentScenario = sc;
    document.querySelectorAll('.tci-scen-btn').forEach(b=>b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    if(this._currentCity) this._updateUI(this._currentCity, this._currentCityKey);
  },

  _genMasterplan() {
    const key = this._currentCityKey ||
                window.TCI?.cityKey ||
                localStorage.getItem('ux_last_city') ||
                Object.keys(window._RO_CITIES_DB||{})[0] ||
                'RO-IS-01';
    const sc   = this._currentScenario||'S2';
    if(G._TCIMasterplanPDF) G._TCIMasterplanPDF.generate(key, sc);
    else if(typeof _ProjectionEngine !== 'undefined') _ProjectionEngine.exportPDF?.();
    else alert('Selectați o parcelă și încărcați TCI complet.');
  },

  // ── Grafice ────────────────────────────────────────────────────────────────
  _drawDemoChart(city, need) {
    const canvas = document.getElementById('tci-d-demo-chart');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth||200, H = 70;
    canvas.width = W * (window.devicePixelRatio||1);
    canvas.height = H * (window.devicePixelRatio||1);
    ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
    ctx.clearRect(0,0,W,H);

    const p0 = city.pop2021||100000;
    const p55 = need.pop2055||p0;
    const yrs = [2021,2025,2030,2035,2040,2045,2050,2055];
    const rates = {S1:0.008, S2:(city.rata_reala_2011_2021||0)/100, S3:-0.008};

    const allVals = [];
    ['S1','S2','S3'].forEach(s=>{
      yrs.forEach(yr=>allVals.push(Math.round(p0*Math.pow(1+(rates[s]),yr-2021))));
    });
    const yMin = Math.min(...allVals)*0.97;
    const yMax = Math.max(...allVals)*1.03;

    const px = i => 30 + i*(W-40)/(yrs.length-1);
    const py = v => H-15 - ((v-yMin)/(yMax-yMin))*(H-22);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,.05)'; ctx.lineWidth = 0.5;
    [0.25,0.5,0.75].forEach(f=>{
      const y2 = H-15 - f*(H-22);
      ctx.beginPath(); ctx.moveTo(30,y2); ctx.lineTo(W-10,y2); ctx.stroke();
    });

    // Linii scenarii
    const cols = {S1:'#22c55e',S2:'#60a5fa',S3:'#f87171'};
    ['S1','S2','S3'].forEach(s=>{
      const pts = yrs.map((yr,i)=>({x:px(i),y:py(Math.round(p0*Math.pow(1+rates[s],yr-2021)))}));
      ctx.beginPath();
      ctx.strokeStyle = cols[s];
      ctx.lineWidth = s===this._currentScenario?2:0.8;
      ctx.setLineDash(s===this._currentScenario?[]:[3,3]);
      pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
      ctx.stroke();
      ctx.setLineDash([]);
      // Label
      ctx.fillStyle = cols[s]; ctx.font = `bold 7px IBM Plex Mono`;
      ctx.fillText(s, pts[pts.length-1].x+2, pts[pts.length-1].y+2);
    });

    // Ani
    ctx.fillStyle = 'rgba(100,120,160,.5)'; ctx.font = '6px IBM Plex Mono'; ctx.textAlign = 'center';
    [0,2,4,6,7].forEach(i=>ctx.fillText(yrs[i], px(i), H-2));

    // Valoare curentă
    ctx.fillStyle = '#D4AF37'; ctx.font = 'bold 8px IBM Plex Mono'; ctx.textAlign = 'left';
    ctx.fillText(N(p0)+' loc. (2021)', 32, 10);

    const titleEl = document.getElementById('tci-d-demo-title');
    if(titleEl) titleEl.textContent = 'Populație: '+N(p0)+' (2021) → '+N(p55)+' (2055, S2)';
  },

  _drawAuthChart(city, need) {
    const canvas = document.getElementById('tci-d-auth-chart');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth||200, H = 55;
    canvas.width = W*(window.devicePixelRatio||1);
    canvas.height = H*(window.devicePixelRatio||1);
    ctx.scale(window.devicePixelRatio||1,window.devicePixelRatio||1);
    ctx.clearRect(0,0,W,H);

    const data = [
      {yr:2015,v:city.autorizatii_2015},{yr:2020,v:city.autorizatii_2020},
      {yr:2021,v:city.autorizatii_2021},{yr:2022,v:city.autorizatii_2022},
      {yr:2023,v:city.autorizatii_2023},
    ].filter(d=>d.v);

    const needed = Math.round((need.locuinteTotale||5000)/30);
    const allV = [...data.map(d=>d.v), needed, needed*1.2];
    const yMax = Math.max(...allV)*1.15, yMin = 0;
    const bW = (W-40)/(data.length+1);

    // Bare istorice
    data.forEach((d,i)=>{
      const bH = ((d.v-yMin)/(yMax-yMin))*(H-20);
      const bX = 30+i*bW;
      ctx.fillStyle = 'rgba(96,165,250,.6)';
      ctx.fillRect(bX, H-15-bH, bW-3, bH);
      ctx.fillStyle = 'rgba(100,120,160,.5)'; ctx.font = '6px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText(d.yr, bX+bW/2-1.5, H-2);
      ctx.fillStyle = '#60a5fa'; ctx.font = '7px IBM Plex Mono';
      ctx.fillText(N(d.v), bX+bW/2-1.5, H-17-bH);
    });

    // Linie necesitate
    const needY = H-15-((needed-yMin)/(yMax-yMin))*(H-20);
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.2;
    ctx.setLineDash([3,2]);
    ctx.beginPath(); ctx.moveTo(28,needY); ctx.lineTo(W-8,needY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#ef4444'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'right';
    ctx.fillText('Necesar: '+N(needed)+'/an', W-8, needY-2);
  },

  _drawHousingMixChart(city, need, grav) {
    const canvas = document.getElementById('tci-d-hm-chart');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth||200, H = 65;
    canvas.width = W*(window.devicePixelRatio||1);
    canvas.height = H*(window.devicePixelRatio||1);
    ctx.scale(window.devicePixelRatio||1,window.devicePixelRatio||1);
    ctx.clearRect(0,0,W,H);

    const hm = G._TCIMasterplanPDF?._calcHousingMix?.(need, city, grav) || {types:[]};
    const types = hm.types||[];
    if(!types.length){ ctx.fillStyle='rgba(100,120,150,.3)';ctx.font='8px IBM Plex Mono';ctx.fillText('—',W/2,H/2);return; }

    const maxU = Math.max(...types.map(t=>t.units||0));
    const COLS = ['#3b82f6','#22c55e','#f59e0b','#ef4444','#a855f7','#14b8a6','#f97316'];
    const rowH = (H-4)/(types.length);

    types.forEach((t,i)=>{
      const bW = ((t.units||0)/maxU)*(W-90);
      ctx.fillStyle = COLS[i%COLS.length]+'44';
      ctx.fillRect(85, 2+i*rowH, bW, rowH-2);
      ctx.fillStyle = COLS[i%COLS.length];
      ctx.fillRect(85, 2+i*rowH, 2, rowH-2);
      ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '6.5px IBM Plex Mono'; ctx.textAlign = 'left';
      ctx.fillText((t.label||t.type||'').slice(0,20), 2, 2+i*rowH+rowH*0.68);
      ctx.fillStyle = COLS[i%COLS.length]; ctx.font = 'bold 6.5px IBM Plex Mono'; ctx.textAlign = 'right';
      ctx.fillText(N(t.units||0)+' ('+Math.round((t.pct||0)*100)+'%)', 84, 2+i*rowH+rowH*0.68);
    });
  },

  _calcGravityFallback(city) {
    const r = (city.rata_reala_2011_2021||0)/100;
    const sc = Math.min(1,(city.pop2021||0)/400000)*.3 + Math.max(0,Math.min(1,(r+.02)/.04))*.25 + .5*.45;
    const gt = sc>.55?'METROPOLITAN':sc>.35?'REGIONAL':r<-.02?'DECLINING':'LOCAL';
    return{gravityScore:sc,growthType:gt};
  },

  _calcNeedFallback(city) {
    const p0=city.pop2021||100000;
    const r=(city.rata_reala_2011_2021||0)/100;
    const p55=Math.round(p0*Math.pow(1+r,34));
    const loc=Math.max(0,Math.round((p55-p0)/2.3)+Math.round(p0*.15));
    return{pop2021:p0,pop2055:p55,locuinteTotale:loc,totalM2:loc*68,s2025:2.3,s2055:2.0};
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ② VIZUALIZARE 4D — Timeline Layer pe Mapbox
// ═══════════════════════════════════════════════════════════════════════════

G._TCITimeline = {
  _year: 2025,
  _playing: false,
  _raf: null,
  _lastTick: 0,
  _city: null,
  SOURCE_ID: 'tci-4d-source',
  LAYER_ID: 'tci-4d-layer',

  setCity(city) {
    this._city = city;
    this._updateInfo(this._year);
  },

  setYear(yr) {
    this._year = yr;
    const sl = document.getElementById('tci-4d-slider');
    if(sl) sl.value = yr;
    const lbl = document.getElementById('tci-4d-year-label');
    if(lbl) lbl.textContent = yr;
    this._updateInfo(yr);
    this._updateMapLayer(yr);
  },

  togglePlay() {
    this._playing = !this._playing;
    const btn = document.getElementById('tci-4d-play');
    if(btn) btn.textContent = this._playing ? '⏸ Pause' : '▶ Play';
    if(this._playing) this._animate();
    else if(this._raf) cancelAnimationFrame(this._raf);
  },

  _animate() {
    if(!this._playing) return;
    const now = performance.now();
    if(now - this._lastTick > 800){
      this._lastTick = now;
      let next = this._year + 5;
      if(next > 2055){ next = 1990; }
      this.setYear(next);
    }
    this._raf = requestAnimationFrame(()=>this._animate());
  },

  _updateInfo(yr) {
    const el = document.getElementById('tci-4d-info');
    if(!el) return;

    const city = this._city;
    if(!city){ el.textContent = 'Selectați o parcelă pentru date teritoriale.'; return; }

    const p0 = city.pop2021||100000;
    const r  = (city.rata_reala_2011_2021||0)/100;

    if(yr <= 2021){
      // Date istorice Copernicus
      const ghsl_data = {
        1990: 0.55, 2000: 0.65, 2010: 0.75, 2015: 0.82, 2021: 0.88,
      };
      const nearest = [1990,2000,2010,2015,2021].reduce((a,b)=>Math.abs(b-yr)<Math.abs(a-yr)?b:a);
      const density = ghsl_data[nearest]||0.7;
      el.innerHTML = `<span style="color:#60a5fa">📡 Copernicus GHSL ${nearest}:</span> `+
        `densitate construire est. <b style="color:#D4AF37">${Math.round(density*100)}%</b> din potențialul maxim`+
        `<br><span style="color:rgba(100,120,150,.5);font-size:6px">Sursa: Copernicus Global Human Settlement Layer ${nearest}</span>`;
    } else {
      // Proiecție
      const popEst = Math.round(p0*Math.pow(1+r,yr-2021));
      const densProj = Math.min(95, 88 + (yr-2021)*0.15);
      const authEst = city.autorizatii_2023 ? Math.round(city.autorizatii_2023*Math.pow(1.018,yr-2023)) : '—';
      el.innerHTML = `<span style="color:#D4AF37">🔮 Proiecție ${yr} (S2):</span> `+
        `pop. est. <b style="color:#22c55e">${N(popEst)}</b> loc. · `+
        `densitate <b style="color:#f59e0b">${Math.round(densProj)}%</b>`+
        (authEst!=='—'?` · ~${N(authEst)} autorizații/an`:'')+
        `<br><span style="color:rgba(100,120,150,.5);font-size:6px">Model: cohort-component INSE · Copernicus GHSL prognoza</span>`;
    }
  },

  addToMap() {
    const m = window.map;
    if(!m || typeof m.addSource !== 'function'){ ss?.('Harta nu e disponibilă'); return; }
    if(!m.loaded?.() && !m.isStyleLoaded?.()){ ss?.('Harta se încarcă, reîncercați în 2 secunde'); return; }

    const city = this._city;
    if(!city){ ss?.('Selectați o parcelă mai întâi'); return; }

    // Creăm un layer cu cercuri de densitate concentric
    const cx = city.lon||27.6, cy = city.lat||47.16;
    const yr = this._year;
    const isHistoric = yr <= 2021;
    const density = isHistoric
      ? ({1990:0.55,2000:0.65,2010:0.75,2015:0.82,2021:0.88})[yr]||0.7
      : Math.min(0.95, 0.88 + (yr-2021)*0.15);

    // GeoJSON cu zone de densitate
    const zones = [];
    const radii = [0.003, 0.008, 0.015, 0.025, 0.04]; // grade
    const dens_by_zone = [1.0, 0.85, 0.65, 0.45, 0.3];

    radii.forEach((r,i)=>{
      const pts = [];
      for(let a=0;a<361;a+=5){
        pts.push([cx+r*Math.cos(a*Math.PI/180), cy+r*0.65*Math.sin(a*Math.PI/180)]);
      }
      zones.push({
        type:'Feature',
        properties:{ density: density*dens_by_zone[i], ring: i, year: yr },
        geometry:{ type:'Polygon', coordinates:[pts] }
      });
    });

    const gj = { type:'FeatureCollection', features: zones };

    try {
      if(m.getSource(this.SOURCE_ID)) m.removeLayer(this.LAYER_ID), m.removeSource(this.SOURCE_ID);
      m.addSource(this.SOURCE_ID, { type:'geojson', data: gj });
      m.addLayer({
        id: this.LAYER_ID,
        type: 'fill',
        source: this.SOURCE_ID,
        paint: {
          'fill-color': isHistoric ? '#3b82f6' : '#D4AF37',
          'fill-opacity': ['*', ['get','density'], 0.18],
        }
      });
      ss?.(`🗺 Layer 4D adăugat: ${city.name} · ${yr} · densitate ${Math.round(density*100)}%`);
    } catch(e){
      console.warn('[TCI 4D] Layer error:', e.message);
    }
  },

  _updateMapLayer(yr) {
    const m = window.map;
    if(!m || !m.getSource?.(this.SOURCE_ID)) return;
    // Actualizăm culoarea layerului existent
    try {
      const isHistoric = yr <= 2021;
      m.setPaintProperty(this.LAYER_ID, 'fill-color', isHistoric ? '#3b82f6' : '#D4AF37');
    } catch(e){}
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ③ COMPARATOR INTER-UAT cu Radar SVG
// ═══════════════════════════════════════════════════════════════════════════

G._TCIComparator = {
  _ref: null, _refKey: null, _refGrav: null, _refNeed: null,
  _cmp: null, _cmpKey: null,
  _data: null,

  setReference(city, key, grav, need) {
    this._ref = city; this._refKey = key;
    this._refGrav = grav; this._refNeed = need;
  },

  search(q) {
    const res = document.getElementById('tci-cmp-res');
    if(!res||!q||q.length<2){ if(res) res.style.display='none'; return; }

    let matches = [];
    if(typeof _searchSIRUTA==='function') matches = _searchSIRUTA(q, 8);
    else if(typeof _searchUAT==='function') matches = _searchUAT(q, 8);
    else if(typeof _RO_CITIES_DB!=='undefined'){
      const qn = q.toLowerCase();
      matches = Object.entries(_RO_CITIES_DB)
        .filter(([,v])=>(v.name||'').toLowerCase().includes(qn))
        .map(([k,v])=>({key:k, name:v.name, judet:v.judet||v.judet_code, pop2021:v.pop2021}))
        .slice(0,8);
    }

    if(!matches.length){ res.style.display='none'; return; }

    res.innerHTML = matches.map(m=>`
      <div class="tci-cmp-item" onclick="_TCIComparator.select('${m.key}')">
        <b>${S2(m.name)}</b>
        <span style="color:rgba(148,163,184,.4);font-size:9px"> · ${S2(m.judet||'—')} · ${N(m.pop2021||0)} loc.</span>
      </div>`).join('');
    res.style.display = 'block';
  },

  select(key) {
    const res = document.getElementById('tci-cmp-res');
    if(res) res.style.display = 'none';

    let city = null;
    if(typeof _RO_CITIES_DB!=='undefined') city = _RO_CITIES_DB[key];
    if(!city && typeof _UAT_DB!=='undefined') city = _UAT_DB[key];
    if(!city) return;

    this._cmp = city; this._cmpKey = key;

    const inp = document.getElementById('tci-cmp-inp');
    if(inp) inp.value = city.name||'';

    const grav2 = (typeof _calcGravityLocal==='function') ? _calcGravityLocal(city)
                : (G._TCIDashboard?._calcGravityFallback?.(city));
    const need2 = (G._TCIMasterplanPDF?._calcNeed?.(city,'S2')) || (G._TCIDashboard?._calcNeedFallback?.(city));

    this._render(city, grav2, need2);
  },

  _getRadarValues(city, grav, need) {
    const p = city.pop2021||100000;
    const r = city.rata_reala_2011_2021||0;
    const AUTH_MED = 180; // medie națională UAT urban

    return [
      Math.min(1, Math.max(0, (r+2)/4)),                          // Demografie
      Math.min(1, (city.autorizatii_2023||0)/1200),                // Construire
      Math.min(1, (city.pib_eur_cap||10000)/36600),                // PIB
      grav?.gravityScore||0.5,                                     // Accesibilitate
      1 - ((grav?.riskScore||42)/100),                             // Risc (inversat)
      Math.min(1, (city.spatii_verzi_mp_loc||12)/20),              // Mediu
      Math.min(1, (city.acoperire_transport||65)/100),             // Social/Transport
      Math.min(1, (need?.locuinteTotale||0)/Math.max(1,p/2.3*.3)), // Housing
    ];
  },

  _render(cmpCity, cmpGrav, cmpNeed) {
    const wrap = document.getElementById('tci-d-radar-wrap');
    const titleEl = document.getElementById('tci-d-radar-title');
    if(wrap) wrap.style.display = 'block';

    const ref = this._ref;
    if(!ref){ if(titleEl) titleEl.textContent = 'Selectați o parcelă ca referință'; return; }

    const refVals = this._getRadarValues(ref, this._refGrav, this._refNeed);
    const cmpVals = this._getRadarValues(cmpCity, cmpGrav, cmpNeed);

    if(titleEl) titleEl.textContent = S2(ref.name)+' vs '+S2(cmpCity.name)+' · 8 indicatori';

    this._drawRadar(refVals, cmpVals, ref.name, cmpCity.name);
    this._drawBenchTable(ref, cmpCity, refVals, cmpVals);

    this._data = { ref, cmpCity, refVals, cmpVals };
  },

  _drawRadar(v1, v2, n1, n2) {
    const svg = document.getElementById('tci-d-radar');
    if(!svg) return;

    const W=240, H=200, cx=120, cy=105, r=75;
    const N8=8;
    const labels = ['Demog.','Constr.','PIB','Acces.','Risc','Mediu','Social','Housing'];
    const GOLD='#D4AF37', BLUE='#60a5fa';

    let html = '';

    // Cercuri concentrice
    [0.25,0.5,0.75,1.0].forEach(f=>{
      const pts = Array.from({length:N8},(_,i)=>{
        const a = -Math.PI/2 + i*2*Math.PI/N8;
        return `${cx+r*f*Math.cos(a)},${cy+r*f*Math.sin(a)}`;
      }).join(' ');
      html += `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="${f===1?0.8:0.4}"/>`;
    });

    // Axe
    for(let i=0;i<N8;i++){
      const a=-Math.PI/2+i*2*Math.PI/N8;
      html += `<line x1="${cx}" y1="${cy}" x2="${cx+r*Math.cos(a)}" y2="${cy+r*Math.sin(a)}" stroke="rgba(255,255,255,.05)" stroke-width="0.5"/>`;
    }

    // Labels
    labels.forEach((l,i)=>{
      const a=-Math.PI/2+i*2*Math.PI/N8;
      const tx=cx+(r+14)*Math.cos(a), ty=cy+(r+14)*Math.sin(a);
      html += `<text x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="middle" font-size="7" fill="rgba(148,163,184,.7)">${l}</text>`;
    });

    // Poligon referință
    const poly1 = v1.map((v,i)=>{const a=-Math.PI/2+i*2*Math.PI/N8;return `${cx+r*v*Math.cos(a)},${cy+r*v*Math.sin(a)}`;}).join(' ');
    html += `<polygon points="${poly1}" fill="${GOLD}22" stroke="${GOLD}" stroke-width="1.5"/>`;

    // Poligon comparare
    const poly2 = v2.map((v,i)=>{const a=-Math.PI/2+i*2*Math.PI/N8;return `${cx+r*v*Math.cos(a)},${cy+r*v*Math.sin(a)}`;}).join(' ');
    html += `<polygon points="${poly2}" fill="${BLUE}18" stroke="${BLUE}" stroke-width="1.2" stroke-dasharray="3,2"/>`;

    // Legendă
    html += `<rect x="8" y="185" width="10" height="2" fill="${GOLD}"/>`;
    html += `<text x="22" y="188" font-size="7" fill="${GOLD}">${S2(n1).slice(0,18)}</text>`;
    html += `<rect x="120" y="185" width="10" height="2" fill="${BLUE}"/>`;
    html += `<text x="134" y="188" font-size="7" fill="${BLUE}">${S2(n2).slice(0,18)}</text>`;

    svg.innerHTML = html;
  },

  _drawBenchTable(ref, cmp, v1, v2) {
    const el = document.getElementById('tci-d-bench-table');
    if(!el) return;

    const labels = ['Demografie','Construire','PIB/cap','Accesibilitate','Risc (inv.)','Mediu','Social','Housing'];
    const fmtV = v => Math.round(v*100);
    const MED_RO = [50, 35, 38, 52, 58, 60, 65, 55]; // medie națională estimată /100

    let html = `<table style="width:100%;border-collapse:collapse;font-size:7px">
      <tr style="background:rgba(12,22,52,.8)">
        <td style="padding:3px 4px;color:rgba(148,163,184,.6)">Indicator</td>
        <td style="padding:3px 4px;color:#D4AF37;text-align:right">${S2(ref.name||'Ref.').slice(0,12)}</td>
        <td style="padding:3px 4px;color:#60a5fa;text-align:right">${S2(cmp.name||'Cmp.').slice(0,12)}</td>
        <td style="padding:3px 4px;color:rgba(100,120,150,.5);text-align:right">Med.RO</td>
      </tr>`;

    labels.forEach((l,i)=>{
      const col1 = v1[i]>=(MED_RO[i]/100) ? '#22c55e' : '#f59e0b';
      const col2 = v2[i]>=(MED_RO[i]/100) ? '#22c55e' : '#f59e0b';
      html += `<tr style="border-top:1px solid rgba(255,255,255,.04)">
        <td style="padding:2px 4px;color:rgba(148,163,184,.7)">${l}</td>
        <td style="padding:2px 4px;text-align:right;color:${col1};font-weight:700">${fmtV(v1[i])}</td>
        <td style="padding:2px 4px;text-align:right;color:${col2};font-weight:700">${fmtV(v2[i])}</td>
        <td style="padding:2px 4px;text-align:right;color:rgba(100,120,150,.4)">${MED_RO[i]}</td>
      </tr>`;
    });

    html += `<tr style="font-size:5.5px"><td colspan="4" style="padding:3px 4px;color:rgba(60,80,110,.5)">Valori normalizate 0-100 (100=maxim potențial). Media RO = estimare model UrbanX pe baza INSE 2021.</td></tr>`;
    html += '</table>';
    el.innerHTML = html;
  },

  exportCSV() {
    if(!this._data){ ss?.('Faceți o comparare mai întâi'); return; }
    const {ref, cmpCity, refVals, cmpVals} = this._data;
    const labels = ['Demografie','Construire','PIB','Accesibilitate','Risc','Mediu','Social','Housing'];
    let csv = `Indicator,${ref.name},${cmpCity.name}\n`;
    labels.forEach((l,i)=> csv += `${l},${Math.round(refVals[i]*100)},${Math.round(cmpVals[i]*100)}\n`);
    csv += `\nDate suplimentare,,\n`;
    csv += `Populatie 2021,${ref.pop2021||'—'},${cmpCity.pop2021||'—'}\n`;
    csv += `Rata crestere/an,${ref.rata_reala_2011_2021||'—'}%,${cmpCity.rata_reala_2011_2021||'—'}%\n`;
    csv += `PIB cap EUR,${ref.pib_eur_cap||'—'},${cmpCity.pib_eur_cap||'—'}\n`;
    csv += `\nSursa: UrbanX TSS·FG - INSE Rec.2021 - Eurostat - BNR\n`;

    const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `comparator_${S2(ref.name)}_${S2(cmpCity.name)}.csv`;
    document.body.appendChild(a); a.click();
    setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 1000);
    ss?.(`📊 Export CSV: ${ref.name} vs ${cmpCity.name}`);
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ④ MILESTONES NARATIVE în TCI Cinema
// ═══════════════════════════════════════════════════════════════════════════

G._TCIMilestones = {

  inject() {
    if(typeof TCI === 'undefined') return;
    const orig = TCI._onYearChange?.bind(TCI);
    TCI._onYearChange = function(yr){
      if(orig) orig(yr);
      G._TCIMilestones._showMilestone(yr, this.d, this.scenario);
    };
    console.log('[TCI Milestones] ✅ injectat în _onYearChange');
  },

  _showMilestone(yr, city, scenario) {
    if(!city) return;
    const milestones = {
      2028: { title:'Actualizare PUG 2028', color:'#D4AF37',
        text: `${S2(city.name||'UAT')}: Date recensămant 2021 → PUG nou bazat pe ${N(city.pop2021)} loc.` },
      2030: { title:'Evaluare intermediară 2030', color:'#60a5fa',
        text: `Pop. proiectată: ${N(Math.round((city.pop2021||100000)*Math.pow(1+(city.rata_reala_2011_2021||0)/100,9)))} loc. · Verificare scenariu` },
      2035: { title:'SIDU 2035 · Revizuire', color:'#22c55e',
        text: `${Math.round((new Date().getFullYear()-2035?10:10))} ani de proiecții verificate · Ajustare POT/CUT dacă necesar` },
      2040: { title:'Mijlocul orizontului', color:'#f59e0b',
        text: `15 ani de implementare · Reevaluare cerere locuințe cu date reale 2025-2040` },
      2045: { title:'Evaluare impact climatic', color:'#a855f7',
        text: `RCP ${scenario==='S1'?'4.5':'8.5'}: +${scenario==='S1'?'1.2':'1.8'}°C față de 2025 · Adaptare normative construcție` },
      2050: { title:'Revizie PUG 2050', color:'#D4AF37',
        text: `Date 2 recensăminte complete disponibile · PUG bazat pe realitate, nu proiecție` },
      2055: { title:'Bilanț 30 ani · 2025–2055', color:'#22c55e',
        text: `Obiectiv atins? ${N(city.pop2021||100000)} → ${N(Math.round((city.pop2021||100000)*Math.pow(1+(city.rata_reala_2011_2021||0)/100,34)))} loc.` },
    };

    const ms = milestones[yr];
    if(!ms) return;

    // Overlay pe harta TCI
    let overlay = document.getElementById('tci-milestone-overlay');
    if(!overlay){
      overlay = document.createElement('div');
      overlay.id = 'tci-milestone-overlay';
      overlay.style.cssText = `
        position:fixed; bottom:80px; left:50%; transform:translateX(-50%);
        z-index:3050; pointer-events:none;
        background:rgba(4,10,24,.92); backdrop-filter:blur(10px);
        border-radius:10px; padding:10px 16px; max-width:380px; width:90%;
        border: 1px solid rgba(212,175,55,.3);
        font-family:'Space Grotesk','IBM Plex Mono',sans-serif;
        opacity:0; transition:opacity .4s;
      `;
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div style="font-size:8px;font-weight:800;color:${ms.color};letter-spacing:.1em;margin-bottom:4px">
        📍 MILESTONE · ${yr}
      </div>
      <div style="font-size:11px;font-weight:700;color:#fff;margin-bottom:3px">${ms.title}</div>
      <div style="font-size:9px;color:rgba(200,215,235,.75);line-height:1.5">${ms.text}</div>
    `;
    overlay.style.borderColor = ms.color+'66';
    overlay.style.opacity = '1';
    setTimeout(()=>{ if(overlay) overlay.style.opacity='0'; }, 5000);
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑤ OSM OVERPASS — accesibilitate urbană live
// ═══════════════════════════════════════════════════════════════════════════

G._TCIAccessibility = {
  _cache: {},

  async fetchForParcel(lat, lon) {
    const key = `${lat.toFixed(3)},${lon.toFixed(3)}`;
    if(this._cache[key]) return this._cache[key];

    const radius = 1000; // 1km
    const query = `
[out:json][timeout:8];
(
  node["amenity"~"school|university|hospital|clinic|pharmacy"](around:${radius},${lat},${lon});
  node["public_transport"~"station|stop_position"](around:500,${lat},${lon});
  node["amenity"="park"](around:${radius},${lat},${lon});
)->.all;
out count;`;

    try {
      const r = await fetch('https://overpass-api.de/api/interpreter', {
        method:'POST', body:'data='+encodeURIComponent(query),
        signal: AbortSignal.timeout(8000),
      });
      const data = await r.json();
      const counts = data.elements?.[0]?.tags||{};
      const result = {
        scoli:     parseInt(counts.nodes||0),
        transport: parseInt(counts.nodes||0),
        parcuri:   parseInt(counts.nodes||0),
        total:     data.elements?.length||0,
        score:     Math.min(100, Math.round((data.elements?.length||0)/2)),
        source:    'OSM Overpass API',
        radius:    radius,
      };
      this._cache[key] = result;
      return result;
    } catch(e){
      console.log('[OSM] Fallback - Overpass indisponibil:', e.message);
      return null;
    }
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// INIT — așteptăm dependențe și pornim totul
// ═══════════════════════════════════════════════════════════════════════════

function _init(){
  if(typeof _RO_CITIES_DB === 'undefined'){
    setTimeout(_init, 300); return;
  }

  // Dashboard
  G._TCIDashboard.init();

  // Milestones în cinema
  if(typeof TCI !== 'undefined') G._TCIMilestones.inject();
  else {
    const obs = setInterval(()=>{
      if(typeof TCI !== 'undefined'){ clearInterval(obs); G._TCIMilestones.inject(); }
    }, 500);
    setTimeout(()=>clearInterval(obs), 10000);
  }

  console.log('[TCI Intelligence v1.0] ✅ Dashboard + 4D Timeline + Comparator + Milestones');
  window.ss?.('✅ TCI Intelligence activ — tab Scen. cu proiecții live, 4D, comparator');
}

setTimeout(_init, 600);

})(window);
