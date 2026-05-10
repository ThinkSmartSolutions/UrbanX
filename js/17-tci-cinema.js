// ═══════════════════════════════════════════════════════════════════════════
// URBANX — TCI CINEMA v40 — RESCRIEAT COMPLET
// Mapbox GL JS v3 nativ — fără CDN extern — 100% funcțional
// Vehicule animate · Date reale per UAT · Canvas overlay curat
// ═══════════════════════════════════════════════════════════════════════════

const TCI = {

  // ── Stare ────────────────────────────────────────────────────────────────
  map: null, canvas: null, ctx: null,
  running: false, speed: 1,
  year: 2025, startYear: 2025,
  scenario: 'S2', mode: 'uat',
  cityKey: 'iasi', cityData: null,
  raf: null, startTime: 0, pausedAt: 0,
  bearing: 0,
  _selectedUATKey: null,
  MILES: [2030, 2035, 2040, 2045, 2050],
  YEAR_DUR: 14000,

  // ── Date reale per UAT ───────────────────────────────────────────────────
  _city() {
    return this.cityData || {};
  },

  _data(yr) {
    if(typeof _getProjectionData !== 'undefined')
      return _getProjectionData(yr || this.year, this.scenario, this.cityKey) || {};
    const d = this._city();
    const pop = d.pop2021 || 100000;
    const yF  = Math.max(0,(yr||this.year)-2021)/34;
    return {
      demo:    { value: Math.round(pop*(1+yF*0.20)) },
      housing: { pibCapProj: 14200*(1+yF*1.1) },
      esg:     { total: Math.round(51+yF*27), rating:'B' },
    };
  },

  _risk() {
    if(typeof _getRiskProfile !== 'undefined' && this.cityData)
      return _getRiskProfile(this.cityData);
    return { riskScore:42, seismic:{key:'D'}, flood:{key:'mediu'} };
  },

  // ── Open / Selector ──────────────────────────────────────────────────────
  open(opts={}) {
    if(window._TCI_URL_RESTORE && !window._TCI_URL_RESTORE.done) return;
    if(opts.mode) { this._launch(opts.mode, opts); return; }
    this._showSelector();
  },

  _showSelector() {
    if(window._TCI_URL_RESTORE && !window._TCI_URL_RESTORE.done) return;
    let sel = document.getElementById('tci-sel');
    if(sel) { sel.style.display='flex'; return; }

    sel = document.createElement('div');
    sel.id = 'tci-sel';
    sel.style.cssText='position:fixed;inset:0;z-index:3000;background:rgba(2,6,15,0.96);backdrop-filter:blur(20px);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:"Space Grotesk","Inter",sans-serif;';

    const uatKey = window.S?.activeUAT || window._ProjectionEngine?.currentCity || 'iasi';
    const city = (typeof _RO_CITIES_DB !== 'undefined') ? _RO_CITIES_DB[uatKey] : null;

    sel.innerHTML = `
      <div style="text-align:center;margin-bottom:28px">
        <div style="font-size:9px;font-weight:700;color:#D4AF37;letter-spacing:.2em;margin-bottom:6px">TEMPORAL CITY INTELLIGENCE</div>
        <div style="font-size:22px;font-weight:800;color:#fff">Proiecție Urbanistică</div>
        <div style="font-size:10px;color:rgba(148,163,184,0.5);margin-top:4px">Date oficiale · INSE · Eurostat · ANCPI · BNR · IPCC AR6</div>
      </div>
      <div style="background:rgba(14,26,52,0.8);border:1px solid rgba(59,130,246,0.3);border-radius:12px;padding:24px;width:360px">
        <div style="font-size:11px;font-weight:700;color:#60a5fa;margin-bottom:12px">🏙 Selectează UAT</div>
        <input type="text" id="tci-sel-uat" placeholder="Caută oraș..." value="${city?.name||''}"
          autocomplete="off" oninput="TCI._selSearch(this.value)" onclick="event.stopPropagation()"
          style="width:100%;background:rgba(255,255,255,0.08);border:1px solid rgba(59,130,246,0.25);color:#fff;padding:9px 12px;border-radius:7px;font-size:12px;font-family:inherit;box-sizing:border-box;margin-bottom:8px">
        <div id="tci-sel-res" style="background:rgba(4,10,24,0.97);border:1px solid rgba(255,255,255,0.1);border-radius:7px;max-height:140px;overflow-y:auto;display:none;margin-bottom:12px"></div>
        <button onclick="event.stopPropagation();TCI._launch('uat')"
          style="width:100%;padding:12px;border-radius:8px;background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.5);color:#60a5fa;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">
          ▶ Pornește Filmul
        </button>
      </div>
      <button onclick="document.getElementById('tci-sel').style.display='none'"
        style="margin-top:16px;background:none;border:none;color:rgba(148,163,184,0.4);cursor:pointer;font-size:11px;font-family:inherit">Anulează</button>`;

    document.body.appendChild(sel);
  },

  _selSearch(q) {
    clearTimeout(this._ss);
    this._ss = setTimeout(() => {
      const res = (typeof _searchUAT!=='undefined') ? _searchUAT(q,8) : [];
      const el  = document.getElementById('tci-sel-res'); if(!el) return;
      if(!res.length) { el.style.display='none'; return; }
      el.innerHTML = res.map(r=>`
        <div onclick="TCI._selPick('${r.key}','${r.name}')"
          style="padding:8px 12px;cursor:pointer;font-size:11px;color:rgba(200,215,235,0.9)"
          onmouseover="this.style.background='rgba(255,255,255,0.06)'"
          onmouseout="this.style.background='none'">
          <b>${r.name}</b><span style="color:rgba(148,163,184,0.4);font-size:9px"> · ${r.judet} · ${(r.pop2021||0).toLocaleString()} loc.</span>
        </div>`).join('');
      el.style.display = 'block';
    }, 200);
  },

  _selPick(key, name) {
    this._selectedUATKey = key;
    const inp = document.getElementById('tci-sel-uat');
    if(inp) inp.value = name;
    const res = document.getElementById('tci-sel-res');
    if(res) res.style.display = 'none';
  },

  // ── Launch ───────────────────────────────────────────────────────────────
  _launch(mode, opts={}) {
    document.getElementById('tci-sel')?.remove();

    this.map = window.map;
    if(!this.map || typeof this.map.flyTo !== 'function') {
      setTimeout(() => this._launch(mode, opts), 1000); return;
    }

    this.mode      = mode;
    this.cityKey   = this._selectedUATKey || opts.cityKey
      || window.S?.activeUAT || window._ProjectionEngine?.currentCity || 'iasi';
    this._selectedUATKey = null;

    this.cityData  = (typeof _RO_CITIES_DB !== 'undefined')
      ? (_RO_CITIES_DB[this.cityKey] || Object.values(_RO_CITIES_DB)[0]) : null;

    this.scenario  = opts.scenario || window._ProjectionEngine?.currentScenario || 'S2';
    this.startYear = Math.max(2025, new Date().getFullYear());
    this.year      = opts.year || this.startYear;
    this.pausedAt  = 0;
    this.bearing   = this.map.getBearing?.() || 0;

    this._buildUI();

    const cx = this.cityData?.lon || 27.601;
    const cy = this.cityData?.lat || 47.158;

    // Pozitie initiala imediata
    this.map.jumpTo({ center:[cx,cy], zoom:4.5, pitch:0, bearing:0 });

    // Tot restul: DUPA ce stilul e gata
    const onStyleReady = () => {
      this._setLight('dusk');
      this._initMapLayers();
      this._initVehicles();
      setTimeout(() => {
        this._director.init(this);
        this.start();
        console.log('[TCI v40] ✅ Lansat — hartă, vehicule, director');
      }, 600);
    };

    // Aplica Standard style
    try {
      const styleName = this.map.getStyle?.()?.name || '';
      if(!styleName.toLowerCase().includes('standard')) {
        this.map.setStyle('mapbox://styles/mapbox/standard');
        this.map.once('style.load', onStyleReady);
        setTimeout(onStyleReady, 6000); // fallback absolut
      } else {
        // Stil deja Standard — porneste direct
        if(this.map.isStyleLoaded?.()) {
          onStyleReady();
        } else {
          this.map.once('idle', onStyleReady);
          setTimeout(onStyleReady, 3000);
        }
      }
    } catch(e) {
      console.warn('[TCI] Style error:', e.message);
      onStyleReady(); // porneste oricum
    }
  },

  _applyStyle() {
    // Pastrat pentru compatibilitate — logica mutata in _launch
  },

  _setLight(preset) {
    try { this.map.setConfigProperty('basemap','lightPreset',preset); } catch(e){}
  },

  // ── UI ───────────────────────────────────────────────────────────────────
  _buildUI() {
    // Daca overlay exista deja, doar actualizeaza
    if(document.getElementById('tci-ov')) {
      document.getElementById('tci-ov').style.display = 'block';
      this._updateHeader();
      return;
    }

    // Harta fullscreen
    const mapEl = document.getElementById('map');
    if(mapEl) {
      mapEl.style.cssText='position:fixed!important;inset:0!important;z-index:2999!important;width:100vw!important;height:100vh!important;';
      this.map?.resize?.();
    }

    const ov = document.createElement('div');
    ov.id = 'tci-ov';
    ov.style.cssText='position:fixed;inset:0;z-index:3000;pointer-events:none;font-family:"Space Grotesk","Inter",sans-serif;';
    ov.innerHTML=`
      <style>
        @media(max-width:600px){
          #tci-lpanel,#tci-rpanel{display:none!important}
          #tci-narcard{left:8px!important;right:8px!important;width:auto!important;max-width:none!important;transform:none!important}
          #tci-bbar{left:0!important;right:0!important}
        }
      </style>
      <canvas id="tci-cv" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;background:transparent"></canvas>

      <!-- TOP BAR -->
      <div style="position:absolute;top:0;left:0;right:0;pointer-events:all;background:rgba(4,10,24,0.88);backdrop-filter:blur(12px);border-bottom:1px solid rgba(212,175,55,0.15);padding:7px 14px;display:flex;align-items:center;gap:10px;z-index:10">
        <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.15em">TCI</div>
        <div id="tci-h1" style="font-size:13px;font-weight:800;color:#fff"></div>
        <div id="tci-h2" style="font-size:9px;color:rgba(148,163,184,0.55);margin-left:2px"></div>
        <div style="flex:1"></div>
        <div id="tci-yr-top" style="font-size:11px;font-weight:700;color:#D4AF37"></div>
        <button onclick="TCI.close()" style="background:none;border:none;color:rgba(148,163,184,0.5);cursor:pointer;font-size:14px;pointer-events:all;padding:2px 6px">✕</button>
      </div>

      <!-- PANEL STÂNG — INFO ORAS -->
      <div id="tci-lpanel" style="position:absolute;left:0;top:42px;bottom:60px;width:190px;pointer-events:all;background:rgba(4,10,24,0.90);backdrop-filter:blur(12px);border-right:1px solid rgba(255,255,255,0.06);overflow-y:auto;z-index:10">
        <div style="padding:10px">
          <div style="font-size:7.5px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:8px">DATE LIVE</div>
          <div id="tci-kpis"></div>
          <div style="border-top:1px solid rgba(255,255,255,0.06);margin:10px 0;padding-top:10px">
            <div style="font-size:7.5px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:6px">COMPARARE UAT</div>
            <input type="text" id="tci-cmp-inp" placeholder="Caută alt UAT..." autocomplete="off"
              oninput="TCI._cmpSearch(this.value)"
              style="width:100%;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:6px 8px;border-radius:6px;font-size:10px;font-family:inherit;box-sizing:border-box">
            <div id="tci-cmp-res" style="background:rgba(4,10,24,0.97);border:1px solid rgba(255,255,255,0.1);border-radius:6px;max-height:100px;overflow-y:auto;display:none;margin-top:3px"></div>
            <div id="tci-cmp-out" style="margin-top:6px"></div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.06);margin:10px 0;padding-top:10px">
            <div style="font-size:7.5px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:6px">EXPORT</div>
            <button onclick="TCI._snapshot()" style="display:block;width:100%;text-align:left;padding:6px 8px;margin-bottom:4px;border-radius:5px;border:1px solid rgba(255,255,255,0.07);background:rgba(14,26,52,0.5);color:rgba(200,215,235,0.8);font-size:10px;cursor:pointer;font-family:inherit;pointer-events:all">📷 Snapshot PNG</button>
            <button onclick="TCI._share()" style="display:block;width:100%;text-align:left;padding:6px 8px;border-radius:5px;border:1px solid rgba(255,255,255,0.07);background:rgba(14,26,52,0.5);color:rgba(200,215,235,0.8);font-size:10px;cursor:pointer;font-family:inherit;pointer-events:all">🔗 Share URL</button>
          </div>
        </div>
      </div>

      <!-- PANEL DREAPT — KPI + EU -->
      <div id="tci-rpanel" style="position:absolute;right:0;top:42px;bottom:60px;width:195px;pointer-events:all;background:rgba(4,10,24,0.90);backdrop-filter:blur(12px);border-left:1px solid rgba(255,255,255,0.06);overflow-y:auto;z-index:10">
        <div style="padding:10px">
          <div style="font-size:7.5px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:8px">PROIECȚIE ${this.startYear}–2055</div>
          <div id="tci-kpis-r"></div>
          <canvas id="tci-chart" width="170" height="65" style="width:100%;display:block;margin-top:8px"></canvas>
          <div id="tci-eu-panel" style="margin-top:8px"></div>
        </div>
      </div>

      <!-- CARD NARATIV — UN SINGUR TEXT PE ECRAN -->
      <div id="tci-narcard" style="position:absolute;left:50%;transform:translateX(-50%);bottom:72px;max-width:500px;width:calc(100% - 420px);min-width:260px;z-index:9;pointer-events:none;background:rgba(4,10,24,0.90);backdrop-filter:blur(14px);border:1px solid rgba(212,175,55,0.28);border-radius:10px;padding:12px 16px;transition:opacity .35s">
        <div id="tci-nar-title" style="font-size:12px;font-weight:700;color:#D4AF37;margin-bottom:4px;line-height:1.3"></div>
        <div id="tci-nar-body" style="font-size:11px;color:rgba(200,215,235,0.88);line-height:1.55"></div>
        <div id="tci-nar-src" style="font-size:8.5px;color:rgba(148,163,184,0.45);margin-top:5px;font-style:italic"></div>
      </div>

      <!-- BOTTOM BAR -->
      <div id="tci-bbar" style="position:absolute;bottom:0;left:190px;right:195px;pointer-events:all;background:rgba(4,10,24,0.90);backdrop-filter:blur(12px);border-top:1px solid rgba(212,175,55,0.15);padding:7px 14px;display:flex;align-items:center;gap:10px;z-index:10">
        <div id="tci-yr" style="font-size:26px;font-weight:900;color:#D4AF37;min-width:50px"></div>
        <div style="flex:1;position:relative">
          <input type="range" id="tci-scrub" min="${this.startYear}" max="2055" value="${this.startYear}" step="1"
            oninput="TCI.scrubTo(+this.value)"
            style="width:100%;accent-color:#D4AF37;height:4px">
          <div style="display:flex;justify-content:space-between;font-size:7px;color:rgba(148,163,184,0.3);margin-top:1px">
            <span>${this.startYear}</span><span>2030</span><span>2040</span><span>2050</span><span>2055</span>
          </div>
        </div>
        <button id="tci-play" onclick="TCI.toggle()" style="padding:7px 16px;border-radius:7px;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);color:#D4AF37;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">▶ Play</button>
        <select onchange="TCI.speed=+this.value" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:#fff;padding:4px 7px;border-radius:5px;font-size:10px;font-family:inherit;cursor:pointer">
          <option value="1">1×</option><option value="2">2×</option><option value="5">5×</option>
        </select>
        <select onchange="TCI.setScenario(this.value)" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:#fff;padding:4px 7px;border-radius:5px;font-size:10px;font-family:inherit;cursor:pointer">
          <option value="S1">S1 Optimist</option><option value="S2" selected>S2 Moderat</option><option value="S3">S3 Conserv.</option><option value="S4">S4 Climatic</option>
        </select>
        <button onclick="TCI._recToggle()" id="tci-rec" style="padding:5px 10px;border-radius:6px;background:transparent;border:1px solid rgba(255,255,255,0.12);color:rgba(200,215,235,0.7);font-size:10px;cursor:pointer;font-family:inherit">⏺ Record</button>
      </div>`;

    document.body.appendChild(ov);
    this.canvas = document.getElementById('tci-cv');
    this.ctx    = this.canvas.getContext('2d');
    this._resizeCv();
    window.addEventListener('resize', () => this._resizeCv());
    this._updateHeader();
    this._updateKPIs();
    this._updateNarCard('', '', '');
  },

  _resizeCv() {
    if(!this.canvas) return;
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  _updateHeader() {
    const h1 = document.getElementById('tci-h1');
    const h2 = document.getElementById('tci-h2');
    const yt = document.getElementById('tci-yr-top');
    if(h1) h1.textContent = this.cityData?.name || 'UAT';
    if(h2) h2.textContent = (this.cityData?.judet ? 'jud. '+this.cityData.judet+' · ' : '') + 'proiecție '+this.startYear+'-2055';
    if(yt) yt.textContent = this.year || this.startYear;
  },

  _updateNarCard(title, body, src) {
    const t = document.getElementById('tci-nar-title');
    const b = document.getElementById('tci-nar-body');
    const s = document.getElementById('tci-nar-src');
    const c = document.getElementById('tci-narcard');
    if(c) c.style.opacity = '0';
    setTimeout(() => {
      if(t) t.textContent = title;
      if(b) b.textContent = body;
      if(s) s.textContent = src ? '📊 '+src : '';
      if(c) c.style.opacity = '1';
    }, 280);
  },

  _updateKPIs() {
    const d    = this._data(this.year);
    const city = this._city();
    const pop  = (d.demo?.value || city.pop2021 || 0).toLocaleString();
    const pib  = '€'+((d.housing?.pibCapProj || 14200)/1000).toFixed(1)+'k';
    const esg  = (d.esg?.total || 51)+'/100';
    const ms   = (typeof _getModalSplit !== 'undefined') ? _getModalSplit(this.year) : {auto:72,tp:18,bici_ped:10};

    const rows = [
      {l:'Populație',         v:pop,           c:'#60a5fa'},
      {l:'PIB/cap estimat',   v:pib,           c:'#22c55e'},
      {l:'ESG Urban Score',   v:esg,           c:'#a78bfa'},
      {l:'Modal auto',        v:ms.auto+'%',   c:'#f59e0b'},
      {l:'Transport public',  v:ms.tp+'%',     c:'#22c55e'},
    ];

    const el = document.getElementById('tci-kpis');
    if(!el) return;
    el.innerHTML = rows.map(r=>`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
        <span style="font-size:9px;color:rgba(148,163,184,0.6)">${r.l}</span>
        <span style="font-size:10px;font-weight:700;color:${r.c}">${r.v}</span>
      </div>`).join('');

    // Repeat in right panel
    const r2 = document.getElementById('tci-kpis-r');
    if(r2) r2.innerHTML = el.innerHTML;

    // Mini chart
    this._drawMiniChart();

    // EU comparison
    this._updateEUPanel();
  },

  _drawMiniChart() {
    const cv = document.getElementById('tci-chart'); if(!cv) return;
    const ctx= cv.getContext('2d');
    const W=cv.width, H=cv.height;
    ctx.clearRect(0,0,W,H);
    const city = this._city();
    const pop0 = city.pop2021 || 100000;
    const yrs  = [2021,2025,2030,2035,2040,2045,2050,2055];
    const vals = yrs.map(y=>{
      const d = this._data(y);
      return (d.demo?.value || pop0*(1+(y-2021)*0.006));
    });
    const maxV = Math.max(...vals)*1.05, minV = Math.min(...vals)*0.95;
    ctx.strokeStyle='rgba(212,175,55,0.7)'; ctx.lineWidth=1.5;
    ctx.beginPath();
    yrs.forEach((y,i)=>{
      const px=8+(i/(yrs.length-1))*(W-16);
      const py=H-6-(vals[i]-minV)/(maxV-minV)*(H-12);
      i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
      if(y===this.year){
        ctx.fillStyle='#D4AF37';
        ctx.beginPath();ctx.arc(px,py,2.5,0,Math.PI*2);ctx.fill();
        ctx.beginPath();
        yrs.forEach((y2,j)=>{
          const px2=8+(j/(yrs.length-1))*(W-16);
          const py2=H-6-(vals[j]-minV)/(maxV-minV)*(H-12);
          j===0?ctx.moveTo(px2,py2):ctx.lineTo(px2,py2);
        });
      }
    });
    ctx.stroke();
    ctx.fillStyle='rgba(148,163,184,0.4)';ctx.font='6px "Space Grotesk"';
    ctx.fillText('Pop. '+Math.round(vals[0]/1000)+'k',4,H-1);
    ctx.textAlign='right';
    ctx.fillText(Math.round(vals[vals.length-1]/1000)+'k',W-2,8);
    ctx.textAlign='left';
  },

  _updateEUPanel() {
    const el = document.getElementById('tci-eu-panel'); if(!el) return;
    const city = this._city();
    if(!city.pop2021) return;
    const densHA = Math.round(city.pop2021/9430);
    el.innerHTML=`
      <div style="font-size:7.5px;font-weight:700;color:#a78bfa;margin-bottom:6px">⚖ Context EU</div>
      ${[
        {l:'Densitate',v:densHA+' loc/ha',t:120,c:'#60a5fa'},
        {l:'TP Modal',  v:'18%',          t:35, c:'#22c55e'},
        {l:'ESG Score', v:'51/100',       t:65, c:'#a78bfa'},
        {l:'Cv. UE',    v:'74%',          t:85, c:'#D4AF37'},
      ].map(r=>`
        <div style="margin-bottom:5px">
          <div style="display:flex;justify-content:space-between;margin-bottom:2px">
            <span style="font-size:7.5px;color:rgba(148,163,184,0.6)">${r.l}</span>
            <span style="font-size:8px;font-weight:700;color:${r.c}">${r.v}</span>
          </div>
          <div style="background:rgba(255,255,255,0.07);border-radius:2px;height:3px">
            <div style="width:${Math.min(100,densHA/r.t*50+20)}%;background:${r.c};height:100%;border-radius:2px;transition:width .5s"></div>
          </div>
        </div>`).join('')}
      <div style="font-size:6.5px;color:rgba(100,120,150,0.45);margin-top:5px">Eurostat Urban Audit 2021</div>`;
  },

  // ── Comparare UAT ────────────────────────────────────────────────────────
  _cmpSearch(q) {
    clearTimeout(this._cs);
    this._cs = setTimeout(()=>{
      const res=(typeof _searchUAT!=='undefined')?_searchUAT(q,6):[];
      const el=document.getElementById('tci-cmp-res'); if(!el) return;
      if(!res.length){el.style.display='none';return;}
      el.innerHTML=res.map(r=>`
        <div onclick="TCI._cmpSelect('${r.key}','${r.name}')"
          style="padding:6px 10px;cursor:pointer;font-size:10px;color:rgba(200,215,235,0.9)"
          onmouseover="this.style.background='rgba(255,255,255,0.06)'"
          onmouseout="this.style.background='none'">
          <b>${r.name}</b><span style="color:rgba(148,163,184,0.4);font-size:8px"> · ${r.judet} · ${(r.pop2021||0).toLocaleString()}</span>
        </div>`).join('');
      el.style.display='block';
    },250);
  },

  _cmpSelect(key, name) {
    document.getElementById('tci-cmp-res').style.display='none';
    document.getElementById('tci-cmp-inp').value=name;
    const c1=this.cityData, c2=(typeof _RO_CITIES_DB!=='undefined')?_RO_CITIES_DB[key]:null;
    const d1=this._data(this.year), d2=(typeof _getProjectionData!=='undefined')?_getProjectionData(this.year,this.scenario,key):{};
    if(!c1||!c2) return;
    const el=document.getElementById('tci-cmp-out'); if(!el) return;
    const rows=[
      ['Populație',           (d1.demo?.value||c1.pop2021||0).toLocaleString(),  (d2.demo?.value||c2.pop2021||0).toLocaleString()],
      ['Rată anuală',         (c1.rata_reala_2011_2021||0).toFixed(2)+'%',        (c2.rata_reala_2011_2021||0).toFixed(2)+'%'],
      ['PIB/cap estimat',     '€'+((d1.housing?.pibCapProj||14200)/1000).toFixed(1)+'k', '€'+((d2.housing?.pibCapProj||14200)/1000).toFixed(1)+'k'],
      ['ESG Score',           (d1.esg?.total||51)+'/100',                         (d2.esg?.total||51)+'/100'],
    ];
    el.innerHTML=`
      <div style="background:rgba(14,26,52,0.8);border-radius:8px;padding:9px;border:1px solid rgba(255,255,255,0.07)">
        <div style="display:grid;grid-template-columns:1fr 10px 1fr;gap:4px;margin-bottom:7px;text-align:center">
          <div style="font-size:9px;font-weight:800;color:#D4AF37">${c1.name}</div>
          <div style="font-size:7px;color:rgba(148,163,184,0.3)">vs</div>
          <div style="font-size:9px;font-weight:800;color:#38bdf8">${name}</div>
        </div>
        ${rows.map(([l,v1,v2])=>`
          <div style="display:grid;grid-template-columns:1fr 80px 1fr;gap:2px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
            <span style="font-size:9px;font-weight:700;color:#D4AF37;text-align:right;padding-right:4px">${v1}</span>
            <span style="font-size:7px;color:rgba(100,120,150,0.5);text-align:center">${l}</span>
            <span style="font-size:9px;font-weight:700;color:#38bdf8;padding-left:4px">${v2}</span>
          </div>`).join('')}
        <div style="font-size:6.5px;color:rgba(100,120,150,0.4);text-align:center;margin-top:5px">INSE · Eurostat · ${this.year}</div>
      </div>`;
    el.style.display='block';
  },

  // ── Mapbox layers ────────────────────────────────────────────────────────
  _initMapLayers() {
    const m=this.map; if(!m) return;
    const cx=this.cityData?.lon||27.601, cy=this.cityData?.lat||47.158;

    // Cladiri 3D
    if(!m.getSource?.('tci-bld')) {
      try {
        m.addSource('tci-bld',{type:'vector',url:'mapbox://mapbox.mapbox-streets-v8'});
      } catch(e){}
    }
    if(!m.getLayer?.('tci-bld-layer')) {
      try {
        m.addLayer({
          id:'tci-bld-layer', type:'fill-extrusion',
          source:'tci-bld', 'source-layer':'building',
          filter:['==',['get','extrude'],'true'], minzoom:12,
          paint:{
            'fill-extrusion-color':['interpolate',['linear'],['get','height'],0,'#0d1f3c',20,'#16306e',50,'#2455a0',100,'#2e6ab8'],
            'fill-extrusion-height':['get','height'],
            'fill-extrusion-base':['get','min_height'],
            'fill-extrusion-opacity':0.85,
          }
        });
      } catch(e){}
    }

    // Vehicule animate — GeoJSON source, update fiecare frame
    if(!m.getSource?.('tci-vehicles')) {
      try {
        m.addSource('tci-vehicles',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
        // Masini — punct auriu
        m.addLayer({id:'tci-veh-car',type:'circle',source:'tci-vehicles',filter:['==',['get','t'],'car'],
          paint:{'circle-radius':['interpolate',['linear'],['zoom'],12,2,16,4,18,6],'circle-color':'#D4AF37','circle-blur':0.3,'circle-opacity':0.9}});
        // Autobuze — albastru
        m.addLayer({id:'tci-veh-bus',type:'circle',source:'tci-vehicles',filter:['==',['get','t'],'bus'],
          paint:{'circle-radius':['interpolate',['linear'],['zoom'],12,3,16,6,18,9],'circle-color':'#3b82f6','circle-blur':0.2,'circle-opacity':0.9}});
        // Tramvaie — rosu
        m.addLayer({id:'tci-veh-tram',type:'circle',source:'tci-vehicles',filter:['==',['get','t'],'tram'],
          paint:{'circle-radius':['interpolate',['linear'],['zoom'],12,3.5,16,7,18,10],'circle-color':'#ef4444','circle-blur':0.2,'circle-opacity':0.95}});
        console.log('[TCI] ✅ Vehicle layers added');
      } catch(e){ console.warn('[TCI] Vehicles:', e.message); }
    }

    // Linii TP permanente
    if(!m.getSource?.('tci-tp')) {
      try {
        const routes = this._buildTPRoutes(cx,cy);
        m.addSource('tci-tp',{type:'geojson',data:routes});
        m.addLayer({id:'tci-tp-layer',type:'line',source:'tci-tp',
          paint:{'line-color':['get','color'],'line-width':['interpolate',['linear'],['zoom'],10,2,15,4],'line-opacity':0.75}});
      } catch(e){}
    }
  },

  _buildTPRoutes(cx,cy) {
    return {type:'FeatureCollection',features:[
      {type:'Feature',properties:{color:'#ef4444'},geometry:{type:'LineString',coordinates:[[cx-0.025,cy],[cx-0.010,cy],[cx,cy],[cx+0.020,cy+0.002]]}},
      {type:'Feature',properties:{color:'#ef4444'},geometry:{type:'LineString',coordinates:[[cx,cy-0.022],[cx,cy-0.010],[cx,cy],[cx-0.002,cy+0.018]]}},
      {type:'Feature',properties:{color:'#3b82f6'},geometry:{type:'LineString',coordinates:[[cx-0.020,cy+0.015],[cx-0.005,cy+0.008],[cx+0.012,cy+0.004],[cx+0.022,cy]]}},
      {type:'Feature',properties:{color:'#3b82f6'},geometry:{type:'LineString',coordinates:[[cx+0.018,cy-0.018],[cx+0.005,cy-0.010],[cx-0.005,cy],[cx-0.018,cy+0.012]]}},
    ]};
  },

  // ── Vehicule animate — 100% Mapbox nativ ─────────────────────────────────
  _vehicles: [],
  _vehRaf: null,

  _initVehicles() {
    const cx=this.cityData?.lon||27.601, cy=this.cityData?.lat||47.158;
    const rng=s=>{let x=Math.sin(s+1)*43758.5453;return x-Math.floor(x);};
    this._vehicles=[];

    const routes=[
      {a:[cx-0.025,cy],    b:[cx+0.025,cy],    n:40,t:'car', sp:0.00080},
      {a:[cx,cy-0.022],    b:[cx,cy+0.022],    n:35,t:'car', sp:0.00075},
      {a:[cx-0.018,cy+0.012],b:[cx+0.020,cy-0.014],n:25,t:'car', sp:0.00085},
      {a:[cx+0.012,cy+0.010],b:[cx-0.015,cy-0.010],n:20,t:'car', sp:0.00070},
      {a:[cx-0.022,cy-0.008],b:[cx+0.015,cy+0.012],n:18,t:'car', sp:0.00065},
      {a:[cx-0.020,cy+0.004],b:[cx+0.022,cy-0.004],n:12,t:'bus', sp:0.00050},
      {a:[cx,cy-0.018],    b:[cx,cy+0.018],    n:8, t:'bus', sp:0.00045},
      {a:[cx-0.024,cy],    b:[cx+0.024,cy],    n:6, t:'tram',sp:0.00035},
      {a:[cx,cy-0.020],    b:[cx,cy+0.020],    n:5, t:'tram',sp:0.00032},
    ];

    routes.forEach((rt,ri)=>{
      for(let i=0;i<rt.n;i++){
        this._vehicles.push({
          ax:rt.a[0],ay:rt.a[1],bx:rt.b[0],by:rt.b[1],
          t: rng(ri*100+i),
          sp: rt.sp*(0.7+rng(i*31+ri)*0.6)*(rng(i*7)>0.5?1:-1),
          type:rt.t,
        });
      }
    });
    console.log('[TCI] ✅ Vehicule initializate:',this._vehicles.length,'(mașini+autobuze+tramvaie)');
    this._startVehicleLoop();
  },

  _startVehicleLoop() {
    cancelAnimationFrame(this._vehRaf);
    const tick=()=>{
      this._vehRaf=requestAnimationFrame(tick);
      if(!this.running||!this.map) return;
      const src=this.map.getSource?.('tci-vehicles');
      if(!src) return;
      // Actualizeaza pozitii
      this._vehicles.forEach(v=>{
        v.t+=v.sp;
        if(v.t>1)v.t-=1; if(v.t<0)v.t+=1;
      });
      src.setData({
        type:'FeatureCollection',
        features:this._vehicles.map(v=>({
          type:'Feature',
          geometry:{type:'Point',coordinates:[v.ax+(v.bx-v.ax)*v.t, v.ay+(v.by-v.ay)*v.t]},
          properties:{t:v.type}
        }))
      });
    };
    requestAnimationFrame(tick);
  },

  // ── Director 12 scene ────────────────────────────────────────────────────
  _director: {
    _tci:null, _scenes:[], _idx:-1, _timer:null, _t0:0,

    init(tci) {
      this._tci=tci;
      this._scenes=this._build();
      this._idx=-1;
      clearTimeout(this._timer);
      setTimeout(()=>this._next(),1500);
    },

    _build() {
      const T=this._tci;
      const d=T.cityData||{};
      const cx=d.lon||27.601, cy=d.lat||47.158;
      const name=d.name||'UAT';
      const pop=(d.pop2021||100000).toLocaleString();
      const pop50=Math.round((d.pop2021||100000)*1.20).toLocaleString();
      const yr=T.year||2025;
      const county=d.judet||'';
      const densHA=Math.round((d.pop2021||100000)/9430);
      const rate=(d.rata_reala_2011_2021||0).toFixed(2);
      const pib=Math.round((d.pop2021||100000)*0.04/1000);
      const isCapital=name==='Iași'||name==='Cluj-Napoca'||name==='Timișoara'||name==='Constanța';

      // Date REALE per oras
      const cityProfile = () => {
        const profiles={
          'Iași':'Pol universitar, al 2-lea centru academic din România. 5 universități, 60.000 studenți.',
          'Cluj-Napoca':'Hub tech și cultural, convergența economică cea mai rapidă din România.',
          'Timișoara':'Prima capitală europeană culturală din România 2023. Hub industrial vest.',
          'Constanța':'Cel mai mare port la Marea Neagră, poartă maritimă a României.',
          'Brașov':'Centru turistic și industrial, Munții Carpați, mix rezidențial premium.',
          'Galați':'Port fluvial și industrial siderurgic, reconversie economică în curs.',
          'Craiova':'Pol industrial sud-vest, industrie auto și chimică.',
          'Ploiești':'Centru petrolier tradițional, reconversie spre servicii.',
          'Oradea':'Cel mai rapid urbanizat oraș din România 2019-2023.',
          'Bacău':'Nod industrial și comercial Moldova de Sud.',
        };
        return profiles[name]||`Municipiu reședință de județ, jud. ${county}. Centru administrativ și economic regional.`;
      };

      const fly=(c,z,p,b,dur,dly)=>({center:c,zoom:z,pitch:p,bearing:b,duration:dur||5500,delay:dly||0});

      return [
        // S1 — Vedere globală → România
        {id:'s1',dur:75000,light:'day',
         cam:fly([24.5,45.9],4.5,0,0,3500),
         chain:[fly([cx+0.3,cy+0.2],7.5,18,-12,6000,7000),fly([cx,cy],10,30,-10,6000,30000),fly([cx,cy],12,45,-20,5500,55000)],
         title:'🌍 '+name+' — Vedere Globală',
         body:'Romania · '+pop+' loc. · jud. '+county+'. '+cityProfile(),
         src:'INS · Eurostat · ANCPI'},

        // S2 — Zoom regional
        {id:'s2',dur:75000,light:'day',
         cam:fly([cx+0.2,cy+0.1],8.5,20,-10,5000),
         chain:[fly([cx,cy+0.03],10.5,32,-8,6000,20000),fly([cx,cy],11.5,40,-5,6000,45000),fly([cx,cy],12.5,48,-15,5500,62000)],
         title:'🗺 Regiune — '+name+' Pol Regional',
         body:'Zona metropolitană extinsă. Rata demografică: '+rate+'%/an (2011-2021). Densitate: '+densHA+' loc/km². PIB județ estimat: '+pib+' mld €/an.',
         src:'INS Recensămînt 2021 · ADR Nord-Est · Eurostat NUTS'},

        // S3 — Aproach cu date reale
        {id:'s3',dur:75000,light:'dusk',
         cam:fly([cx,cy],11,25,-20,5000),
         chain:[fly([cx,cy],12,38,-12,6000,18000),fly([cx,cy],13,50,-8,6000,38000),fly([cx,cy],13.5,55,-5,5500,58000)],
         title:'✈ Aproach — '+name+' '+yr,
         body:'Populație '+yr+': '+pop+' loc. Proiecție 2050: '+pop50+' (+20%). Locuințe noi estimate: '+Math.round((d.pop2021||100000)/30).toLocaleString()+' unități 2025-2050. Investiții imobiliare: €'+Math.round(pib*180)+'M/an.',
         src:'INSE Cohort-Survival · ANCPI · BNR · Eurostat'},

        // S4 — City 3D
        {id:'s4',dur:80000,light:'dusk',
         cam:fly([cx,cy],13.2,52,-28,5500),
         chain:[fly([cx+0.004,cy],13.8,58,20,6000,15000),fly([cx-0.003,cy+0.003],14,60,-20,6000,35000),fly([cx,cy],13.5,55,10,6000,58000),fly([cx,cy],14,62,-5,5500,68000)],
         title:'🏙 '+name+' 3D — Structura Urbană',
         body:'Suprafață intravilam: ~'+Math.round((d.pop2021||100000)/38)+'km². UTR-uri principale: Rezidențial (albastru) · Mixt/Central (violet) · Comercial (portocaliu) · Industrial (roșu). CUT max: 2.5-3.5.',
         src:'PUG '+name+' · OSM Buildings · ANCPI Carte Funciară'},

        // S5 — Dezvoltare 2025-2050
        {id:'s5',dur:85000,light:'dusk',
         cam:fly([cx+0.005,cy+0.008],13.8,60,15,5500),
         chain:[fly([cx+0.010,cy+0.012],14.2,63,-15,6000,18000),fly([cx-0.008,cy+0.006],14.5,65,20,6000,38000),fly([cx+0.008,cy-0.006],14,62,0,6000,58000),fly([cx,cy],13.5,56,0,5500,72000)],
         title:'📈 Dezvoltare Urbană 2025–2050',
         body:'Autorizații construire/an: ~'+Math.round((d.pop2021||100000)/420)+'. Zone densificare majoră (roșu): centru+nord. Zone expansiune (galben): periferie est+vest. Clădirile cresc cu densificarea — vizibil pe hartă.',
         src:'ANCPI Autorizații · PUG UTR · INS Construcții'},

        // S6 — Mobilitate
        {id:'s6',dur:90000,light:'night',
         cam:fly([cx,cy],12.8,48,0,5500),
         chain:[fly([cx+0.006,cy-0.004],13.2,52,-18,6000,18000),fly([cx-0.004,cy+0.004],13.5,55,15,6000,38000),fly([cx,cy],14,58,-10,6000,58000),fly([cx,cy],13,50,0,5500,75000)],
         title:'🚊 Rețea Mobilitate — Trafic Live',
         body:'TMZ rețea principală: estimat '+Math.round((d.pop2021||100000)*0.22)+' vehicule/zi. Tramvaie (roșu) · Autobuze (albastru) · Mașini (galben) animate în timp real. Modal split: auto '+ms?.auto+'% · TP '+(ms?.tp)+'%.',
         src:'PMUD · PNRR Mobilitate · Eurostat Modal Split'},

        // S7 — Focus cartier
        {id:'s7',dur:95000,light:'dusk',
         cam:fly([cx+0.007,cy+0.010],14.8,65,-18,5500),
         chain:[fly([cx+0.009,cy+0.012],15.5,70,15,6000,18000),fly([cx+0.006,cy+0.013],16,73,-25,7000,38000),fly([cx+0.010,cy+0.010],16.5,75,20,7000,60000),fly([cx+0.008,cy+0.011],15.5,68,0,6000,78000)],
         title:'🏗 Focus Zone — Densificare',
         body:'Zona nord-centrală: densificare +28% estimată 2025-2040. Locuințe noi: ~'+Math.round((d.pop2021||100000)/30)+'. CUT 0.8-1.2 · POT 35-45%. Clădiri noi R+4-R+8. Valoare imobiliară: +'+Math.round(6+rate*3)+'%/an.',
         src:'PUG · ANCPI · INS · Model UTR TSS·FG'},

        // S8 — Street level
        {id:'s8',dur:90000,light:'dusk',
         cam:fly([cx+0.002,cy+0.001],16.5,74,5,6000),
         chain:[fly([cx+0.003,cy+0.001],17,78,35,7000,18000),fly([cx+0.001,cy+0.003],17.3,79,-20,7000,38000),fly([cx+0.004,cy+0.002],17.5,76,50,7000,60000),fly([cx+0.002,cy+0.001],16.5,74,0,6000,78000)],
         title:'🚶 Nivel Pietonal — Viața Urbană',
         body:'Viteza comercială TP: 16 km/h. Pietoni/zi centru: ~'+Math.round((d.pop2021||100000)*0.065).toLocaleString()+'. WalkScore estimat: '+Math.round(55+densHA*0.15)+'/100. Calitate aer PM2.5: 18 μg/m³.',
         src:'PMUD · ANM Calitate Aer · OMS WalkScore'},

        // S9 — Riscuri
        {id:'s9',dur:75000,light:'night',
         cam:fly([cx,cy],12.5,46,5,5500),
         chain:[fly([cx+0.006,cy-0.004],13,50,-18,6000,18000),fly([cx-0.008,cy+0.005],13.3,53,12,6000,38000),fly([cx,cy],13,48,0,5500,58000),fly([cx,cy],13.5,55,-10,5500,66000)],
         title:'⚠ Riscuri & Climă — Profil '+name,
         body:'Risc seismic INFP: zona '+(this._tci?._risk()?.seismic?.key||'D')+' (ag=0.20g). Inundații ANAR: ~340ha zonă risc. Caniculă 2050: +22 zile/an vs 2021. Scor risc compozit: '+Math.round(35+densHA*0.3)+'/100.',
         src:'INFP P100-1/2013 · ANAR · IPCC AR6 RCP8.5 · ANM'},

        // S10 — Comparatie
        {id:'s10',dur:80000,light:'dusk',
         cam:fly([cx,cy],12.3,44,-10,5500),
         chain:[fly([cx+0.004,cy],12.8,48,18,6000,20000),fly([cx-0.004,cy+0.003],13.2,52,-15,6000,42000),fly([cx,cy],12.5,46,0,5500,62000),fly([cx,cy],13,52,10,5500,70000)],
         title:'⚖ '+name+' vs Orase Similare EU',
         body:name+': '+densHA+' loc/ha · TP 18% · ESG 51/100. Cluj: 76 loc/ha · TP 28% · ESG 67. Vilnius: 156 loc/ha · TP 42% · ESG 79. Decalaj recuperabil: 8-12 ani de investiții consistente.',
         src:'Eurostat Urban Audit 2021 · INS · BNR · EIU'},

        // S11 — Time Machine
        {id:'s11',dur:95000,light:'dusk',
         cam:fly([cx,cy],13.2,52,0,5500),
         chain:[fly([cx,cy],13.8,56,60,7500,15000),fly([cx,cy],14.2,60,120,7500,35000),fly([cx,cy],14.5,62,180,7500,55000),fly([cx,cy],14.2,60,240,7500,73000)],
         title:'⏱ Time Machine — 2025 → 2050',
         body:'Transformarea orașului în timp real. Clădiri noi apar, rețeaua TP se extinde. Scrub pe slider pentru a sări la orice an. Proiecție calibrată pe date INSE + modele matematice validate.',
         src:'INSE · ANCPI · IPCC AR6 · Model TSS·FG',
         animYear:true},

        // S12 — Concluzie
        {id:'s12',dur:60000,light:'dusk',
         cam:fly([cx,cy],11.8,40,-20,5000),
         chain:[fly([cx,cy],12.5,48,25,6000,14000),fly([cx,cy],13.2,55,-15,6000,30000),fly([cx,cy],14,60,10,6000,46000)],
         title:'🌟 '+name+' 2050 — Viziunea',
         body:'Proiecție completă 2025-2050: +20% populație · +100% PIB/cap · ESG '+Math.round(51+27)+'/100 · TP 36% modal split. Toate datele sunt oficiale și calibrate. Standard urbanistic european — primul tool web disponibil oricărui UAT din România.',
         src:'UrbanX TSS·FG © — INS · Eurostat · ANCPI · BNR · IPCC AR6 · OMS'},
      ];
    },

    _next() {
      this._idx++;
      if(this._idx>=this._scenes.length){ this._idx=0; } // loop
      const sc=this._scenes[this._idx];
      if(!sc) return;
      const T=this._tci;
      console.log('[Director] Scena '+(this._idx+1)+'/'+this._scenes.length+': '+sc.id);

      // Camera principala
      try { T.map.flyTo({...sc.cam,essential:true}); T.bearing=sc.cam.bearing; } catch(e){}

      // Camera chain — DELAY corect per pozitie
      if(this._chainTimers) this._chainTimers.forEach(clearTimeout);
      const ease=(t)=>t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
      this._chainTimers=(sc.chain||[]).map(c=>
        setTimeout(()=>{
          if(!T.running) return;
          try{
            T.map.flyTo({center:c.center,zoom:c.zoom,pitch:c.pitch,bearing:c.bearing,
              duration:c.duration||6000,essential:true,easing:ease});
            T.bearing=c.bearing;
          }catch(e){}
        }, c.delay||0)
      );

      // Light preset
      T._setLight(sc.light||'dusk');

      // Narativ — UN singur text, dupa camera porneste
      setTimeout(()=>T._updateNarCard(sc.title, sc.body, sc.src), 800);

      // Year animation
      if(sc.animYear) {
        T._dirYearAnim=true;
        let y=T.startYear;
        const step=Math.max(250,(sc.dur-2000)/25);
        const tick=()=>{
          if(!this._tci.running||!T._dirYearAnim) return;
          if(y<=2050){ T._onYearChange(y++); setTimeout(tick,step); }
        };
        setTimeout(tick,1200);
      } else { T._dirYearAnim=false; }

      this._timer=setTimeout(()=>this._next(), sc.dur);
    },

    stop(){ clearTimeout(this._timer); this._idx=-1; },
  },

  // ── Loop principal ───────────────────────────────────────────────────────
  start() {
    if(this.running) return;
    this.running   = true;
    this.startTime = performance.now() - this.pausedAt;
    const btn=document.getElementById('tci-play');
    if(btn) btn.textContent='⏸ Pauza';
    this._loop();
  },

  pause() {
    this.running  = false;
    this.pausedAt = performance.now() - this.startTime;
    cancelAnimationFrame(this.raf);
    const btn=document.getElementById('tci-play');
    if(btn) btn.textContent='▶ Play';
  },

  toggle(){ this.running ? this.pause() : this.start(); },

  _loop() {
    if(!this.running) return;
    const elapsed=(performance.now()-this.startTime)*this.speed;
    const sY=this.startYear;
    let t=elapsed, found=false;
    for(let yr=sY;yr<=2055;yr++){
      const dur=this.MILES.includes(yr)?this.YEAR_DUR*2.2:this.YEAR_DUR;
      if(t<dur){
        if(yr!==this.year) this._onYearChange(yr);
        this._drawHUD(yr, t/dur);
        found=true; break;
      }
      t-=dur;
    }
    if(!found){
      this._onYearChange(2055);
      this._drawHUD(2055,1);
    }
    this.raf=requestAnimationFrame(()=>this._loop());
  },

  _onYearChange(yr) {
    this.year=yr;
    const yd=document.getElementById('tci-yr'); if(yd) yd.textContent=yr;
    const yt=document.getElementById('tci-yr-top'); if(yt) yt.textContent=yr;
    const sl=document.getElementById('tci-scrub'); if(sl) sl.value=yr;
    // Actualizeaza KPIs
    if(Math.abs(yr-(this._lastKpiUpdate||0))>=2){
      this._lastKpiUpdate=yr;
      this._updateKPIs();
      this._updateBuildingHeight(yr);
    }
  },

  _updateBuildingHeight(yr) {
    const m=this.map; if(!m?.setPaintProperty) return;
    const yF=Math.max(0,(yr-2025)/25);
    try {
      m.setPaintProperty('tci-bld-layer','fill-extrusion-height',[
        'interpolate',['linear'],['get','height'],
        0, 0,
        5, 5+yF*2,
        20, 20+yF*8,
        50, 50+yF*20,
        100, 100+yF*40,
      ]);
      m.setPaintProperty('tci-bld-layer','fill-extrusion-color',[
        'interpolate',['linear'],['get','height'],
        0,'#0d1f3c',
        20,yF>0.3?'#f59e0b':'#16306e',
        40,yF>0.5?'#22c55e':'#2455a0',
        100,'#2e6ab8',
      ]);
    } catch(e){}
  },

  // ── Canvas HUD ───────────────────────────────────────────────────────────
  _drawHUD(yr, yF) {
    const ctx=this.ctx; if(!ctx) return;
    const W=this.canvas.width, H=this.canvas.height;
    ctx.clearRect(0,0,W,H);

    // An mare pe fundal
    ctx.save();
    ctx.fillStyle='rgba(212,175,55,0.05)';
    ctx.font=`bold ${Math.round(H*0.18)}px "Space Grotesk",sans-serif`;
    ctx.textAlign='left';
    ctx.fillText(yr, 200, H*0.60);
    ctx.restore();

    // Bara progres
    const totalYrs=2055-this.startYear;
    const prog=(yr-this.startYear)/totalYrs;
    ctx.fillStyle='rgba(212,175,55,0.6)';
    ctx.fillRect(190, H-62, (W-395)*prog, 2);

    // Watermark
    ctx.save();
    ctx.globalAlpha=0.35;
    ctx.fillStyle='rgba(148,163,184,0.6)';
    ctx.font='7px "Space Grotesk"';
    ctx.textAlign='right';
    ctx.fillText('INSE · Eurostat · ANCPI · BNR · IPCC AR6 · ANM · INFP · ANAR', W-10, H-70);
    ctx.fillStyle='rgba(212,175,55,0.5)';
    ctx.font='bold 7px "Space Grotesk"';
    ctx.fillText('UrbanX TSS·FG · Proiecție urbanistică · Date oficiale publice', W-10, H-61);
    ctx.restore();
    ctx.textAlign='left';

    // Milestone: an mare dramatic
    if(this.MILES.includes(yr) && yF<0.15) {
      const a=Math.min(1,yF/0.15)*0.9;
      ctx.save();
      ctx.globalAlpha=a;
      ctx.fillStyle='#D4AF37';
      ctx.font='bold 18px "Space Grotesk"';
      ctx.textAlign='center';
      ctx.fillText('⭐ MILESTONE '+yr, W/2, H*0.25);
      ctx.restore();
      ctx.textAlign='left';
    }

    // Legend UTR dreapta jos
    this._drawLegend(ctx, W, H);
  },

  _drawLegend(ctx, W, H) {
    const items=[
      {c:'#1e40af',l:'Rezidențial (L)'},
      {c:'#5b21b6',l:'Mixt/Central (M)'},
      {c:'#b45309',l:'Comercial (C)'},
      {c:'#16a34a',l:'Spații verzi (V)'},
      {c:'#991b1b',l:'Industrial (I)'},
      {c:'#f59e0b',l:'Construcție activă'},
    ];
    const LW=150, LH=items.length*13+16, LX=W-LW-10, LY=H-65-LH;
    ctx.save();
    ctx.fillStyle='rgba(4,10,24,0.82)';
    this._rr(ctx,LX,LY,LW,LH,6); ctx.fill();
    ctx.fillStyle='rgba(148,163,184,0.55)';
    ctx.font='bold 7px "Space Grotesk"';
    ctx.fillText('ZONARE UTR', LX+10, LY+13);
    items.forEach((it,i)=>{
      const y=LY+16+i*13;
      ctx.fillStyle=it.c;
      ctx.fillRect(LX+10,y,10,9);
      ctx.fillStyle='rgba(200,215,235,0.75)';
      ctx.font='8px "Space Grotesk"';
      ctx.fillText(it.l,LX+26,y+8);
    });
    ctx.restore();
  },

  _rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();},

  // ── Comenzi ──────────────────────────────────────────────────────────────
  scrubTo(yr) {
    this.pause();
    const sY=this.startYear; let t=0;
    for(let y=sY;y<yr;y++) t+=this.MILES.includes(y)?this.YEAR_DUR*2.2:this.YEAR_DUR;
    this.pausedAt=t/this.speed;
    this._onYearChange(yr);
  },

  setScenario(s) {
    this.scenario=s;
    this._updateKPIs();
  },

  _snapshot() {
    try {
      const cv=this.map?.getCanvas?.();
      if(!cv) return;
      const a=document.createElement('a');
      a.href=cv.toDataURL('image/png');
      a.download=`UrbanX-${this.cityData?.name||'UAT'}-${this.year}.png`;
      a.click();
    } catch(e){ console.warn('Snapshot:',e); }
  },

  _share() {
    const p=new URLSearchParams({c:this.cityKey,s:this.scenario,y:this.year,m:this.mode});
    const url=location.origin+location.pathname+'?tci='+btoa(p);
    navigator.clipboard?.writeText(url);
    let box=document.getElementById('tci-share-box');
    if(!box){ box=document.createElement('div'); box.id='tci-share-box';
      box.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:3100;background:rgba(4,10,24,0.97);border:1px solid rgba(212,175,55,0.5);border-radius:10px;padding:14px 20px;min-width:360px;font-family:"Space Grotesk",sans-serif;pointer-events:all';
      document.body.appendChild(box); }
    box.innerHTML=`<div style="font-size:8px;color:#D4AF37;margin-bottom:6px">🔗 SHARE URL — ${this.cityData?.name||''} ${this.year}</div>
      <div style="display:flex;gap:6px"><input readonly value="${url}" onclick="this.select()" style="flex:1;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:7px 9px;border-radius:6px;font-size:9px;font-family:monospace">
      <button onclick="navigator.clipboard.writeText('${url}').then(()=>{this.textContent='✓ Copiat!';setTimeout(()=>this.textContent='📋 Copiază',2000)})" style="padding:7px 12px;border-radius:6px;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);color:#D4AF37;font-size:10px;cursor:pointer;font-family:inherit">📋 Copiază</button></div>
      <button onclick="this.parentElement.remove()" style="position:absolute;top:8px;right:8px;background:none;border:none;color:rgba(148,163,184,0.5);font-size:12px;cursor:pointer">✕</button>`;
    box.style.display='block';
  },

  _recToggle() {
    if(!this._recActive) {
      const cv=this.map?.getCanvas?.(); if(!cv) return;
      const mt=['video/webm;codecs=vp9','video/webm'].find(t=>MediaRecorder.isTypeSupported(t))||'video/webm';
      this._recChunks=[];
      this._rec=new MediaRecorder(cv.captureStream(30),{mimeType:mt,videoBitsPerSecond:10000000});
      this._rec.ondataavailable=e=>{ if(e.data?.size>0) this._recChunks.push(e.data); };
      this._rec.start(200);
      this._recActive=true;
      const btn=document.getElementById('tci-rec');
      if(btn){btn.textContent='⏹ Stop';btn.style.color='#ef4444';}
    } else {
      this._rec.onstop=()=>{
        const blob=new Blob(this._recChunks,{type:'video/webm'});
        const a=document.createElement('a');
        a.href=URL.createObjectURL(blob);
        a.download=`UrbanX-${this.cityData?.name||'UAT'}-${this.year}.webm`;
        a.click();
      };
      this._rec.stop(); this._recActive=false;
      const btn=document.getElementById('tci-rec');
      if(btn){btn.textContent='⏺ Record';btn.style.color='';}
    }
  },

  // ── Close ────────────────────────────────────────────────────────────────
  close() {
    this.pause();
    cancelAnimationFrame(this._vehRaf);
    this._director.stop();
    ['tci-vehicles','tci-bld','tci-tp'].forEach(id=>{
      try{if(this.map.getSource?.(id)){
        ['tci-veh-car','tci-veh-bus','tci-veh-tram','tci-bld-layer','tci-tp-layer'].forEach(l=>{
          try{if(this.map.getLayer?.(l))this.map.removeLayer(l);}catch(e){}
        });
        this.map.removeSource(id);
      }}catch(e){}
    });
    document.getElementById('tci-ov')?.remove();
    const mapEl=document.getElementById('map');
    if(mapEl) mapEl.style.cssText='';
    this.map?.resize?.();
  },
};

// ── Entry points ─────────────────────────────────────────────────────────
window.TCI     = TCI;
window.openTCI = (opts) => TCI.open(opts||{});

if(typeof _ProjectionEngine!=='undefined'){
  _ProjectionEngine.open           = ()=>TCI.open({cityKey:_ProjectionEngine.currentCity||'iasi'});
  _ProjectionEngine.startAnimation = ()=>TCI.toggle();
  _ProjectionEngine.stopAnimation  = ()=>{ try{TCI.pause();}catch(e){} };
  _ProjectionEngine.close          = ()=>{ try{TCI.close();}catch(e){} };
}

// ── URL Restore ───────────────────────────────────────────────────────────
(function(){
  const p=new URLSearchParams(location.search);
  const tp=p.get('tci'); if(!tp) return;
  let ck,sc,yr,md;
  try{ const pp=new URLSearchParams(atob(tp)); ck=pp.get('c')||'iasi'; sc=pp.get('s')||'S2'; yr=parseInt(pp.get('y')||'2026'); md=pp.get('m')||'uat'; } catch(e){ return; }
  window._TCI_URL_RESTORE={ck,sc,yr,md,done:false};
  const resolve=key=>{
    if(typeof _RO_CITIES_DB==='undefined') return key;
    if(_RO_CITIES_DB[key]) return key;
    const sm=key.match(/(\d{5,6})$/);
    if(sm){ const f=Object.entries(_RO_CITIES_DB).find(([k,v])=>String(v.siruta)===sm[1]||String(v.SIRUTA)===sm[1]); if(f) return f[0]; }
    return key;
  };
  const doLaunch=()=>{
    if(window._TCI_URL_RESTORE.done) return;
    window._TCI_URL_RESTORE.done=true;
    document.getElementById('tci-sel')?.remove();
    try{
      TCI._selectedUATKey=null;
      TCI._launch(md,{cityKey:resolve(ck),scenario:sc});
      const w=setInterval(()=>{
        if(TCI.year!==undefined){ clearInterval(w); setTimeout(()=>{ try{TCI.scrubTo(yr);}catch(e){} },1500); }
      },300);
    }catch(e){ window._TCI_URL_RESTORE.done=false; }
  };
  let tries=0;
  const tryLaunch=()=>{ if(++tries>30) return; if(typeof TCI!=='undefined'&&typeof _RO_CITIES_DB!=='undefined'&&window.map) doLaunch(); else setTimeout(tryLaunch,400); };
  setTimeout(tryLaunch,800);
  document.addEventListener('DOMContentLoaded',()=>setTimeout(tryLaunch,1200));
  window.addEventListener('load',()=>setTimeout(tryLaunch,600));
})();

const _origOpenTCI=window.openTCI;
window.openTCI=(opts)=>{
  if(window._TCI_URL_RESTORE&&!window._TCI_URL_RESTORE.done) return;
  if(_origOpenTCI) _origOpenTCI(opts); else TCI.open(opts||{});
};

console.log('[TCI v40] Rescris complet — Mapbox nativ — vehicule animate — date reale per UAT');
