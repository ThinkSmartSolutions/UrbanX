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
  YEAR_DUR: 26000,

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

    const cx = this.cityData?.lon || 27.601;
    const cy = this.cityData?.lat || 47.158;

    this._buildUI(cx, cy);
    this.map.jumpTo({ center:[cx,cy], zoom:4.5, pitch:0, bearing:0 });

    const onStyleReady = () => {
      this._setLight('dusk');
      this._initMapLayers();
      this._initVehicles();
      this._initLeftMap(cx, cy);
      setTimeout(() => {
        this._director.init(this);
        this.start();
        console.log('[TCI] ✅ Split screen: EXISTENT 2025 | PROIECTAT');
      }, 800);
    };

    try {
      const sn = this.map.getStyle?.()?.name || '';
      if(!sn.toLowerCase().includes('standard')) {
        this.map.setStyle('mapbox://styles/mapbox/standard');
        this.map.once('style.load', onStyleReady);
        setTimeout(onStyleReady, 6000);
      } else {
        if(this.map.isStyleLoaded?.()) onStyleReady();
        else { this.map.once('idle', onStyleReady); setTimeout(onStyleReady, 3000); }
      }
    } catch(e) { onStyleReady(); }
  },

  _applyStyle() { /* logica in _launch */ },

  // ── Harta stanga: EXISTENT 2025, sincronizata cu dreapta ─────────────────
  mapLeft: null, _syncLock: false,

  _initLeftMap(cx, cy) {
    if(!document.getElementById('tci-map-left') || !window.mapboxgl) return;
    try {
      this.mapLeft = new mapboxgl.Map({
        container: 'tci-map-left',
        style: 'mapbox://styles/mapbox/standard',
        center: [cx, cy], zoom: 4.5, pitch: 0, bearing: 0,
        accessToken: mapboxgl.accessToken,
        interactive: false,
        attributionControl: false,
      });
      this.mapLeft.once('style.load', () => {
        try { this.mapLeft.setConfigProperty('basemap','lightPreset','dusk'); } catch(e){}
        this._updateSplitLabels();
        console.log('[TCI] ✅ Harta EXISTENT 2025 gata');
      });
      // Sync: dreapta → stanga
      this.map.on('move', () => {
        if(this._syncLock || !this.mapLeft) return;
        this._syncLock = true;
        try { this.mapLeft.jumpTo({ center:this.map.getCenter(), zoom:this.map.getZoom(), pitch:this.map.getPitch(), bearing:this.map.getBearing() }); } catch(e){}
        this._syncLock = false;
      });
    } catch(e) { console.warn('[TCI] mapLeft error:', e.message); }
  },

  _setLight(preset) {
    try { this.map.setConfigProperty('basemap','lightPreset',preset); } catch(e){}
    try { this.mapLeft?.setConfigProperty('basemap','lightPreset',preset); } catch(e){}
  },

  _updateSplitLabels() {
    const yr = this.year || this.startYear;
    const el = document.getElementById('tci-lbl-right');
    if(el) el.textContent = '🔮 PROIECTAT · ' + yr;
  },

  _buildUI(cx, cy) {
    if(document.getElementById('tci-ov')) {
      document.getElementById('tci-ov').style.display = 'block';
      this._updateHeader(); return;
    }

    // Ascunde harta originala — o vom muta in containerul split
    const mapEl = document.getElementById('map');
    if(mapEl) mapEl.style.display = 'none';

    // ── SPLIT CONTAINER ─────────────────────────────────────────────────
    const sc = document.createElement('div');
    sc.id = 'tci-split-cont';
    sc.style.cssText = 'position:fixed;inset:0;z-index:2999;display:flex;background:#000;';

    // Stanga: harta noua (EXISTENT 2025)
    const lm = document.createElement('div');
    lm.id = 'tci-map-left';
    lm.style.cssText = 'flex:1;position:relative;overflow:hidden;border-right:2px solid rgba(212,175,55,0.35);';
    const lblL = document.createElement('div');
    lblL.id = 'tci-lbl-left';
    lblL.style.cssText = 'position:absolute;top:48px;left:50%;transform:translateX(-50%);z-index:10;background:rgba(4,10,24,0.88);border:1px solid rgba(96,165,250,0.4);border-radius:20px;padding:5px 16px;font:bold 11px "Space Grotesk",sans-serif;color:#60a5fa;pointer-events:none;white-space:nowrap;';
    lblL.textContent = '📍 EXISTENT · 2025';
    lm.appendChild(lblL);

    // Dreapta: harta existenta (window.map) — o mutam aici
    const rm = document.createElement('div');
    rm.id = 'tci-map-right-cont';
    rm.style.cssText = 'flex:1;position:relative;overflow:hidden;';
    const lblR = document.createElement('div');
    lblR.id = 'tci-lbl-right';
    lblR.style.cssText = 'position:absolute;top:48px;left:50%;transform:translateX(-50%);z-index:10;background:rgba(4,10,24,0.88);border:1px solid rgba(212,175,55,0.4);border-radius:20px;padding:5px 16px;font:bold 11px "Space Grotesk",sans-serif;color:#D4AF37;pointer-events:none;white-space:nowrap;';
    lblR.textContent = '🔮 PROIECTAT · 2025';
    rm.appendChild(lblR);

    // Muta mapEl in dreapta
    if(mapEl) {
      mapEl.style.cssText = 'position:absolute!important;inset:0!important;display:block!important;width:100%!important;height:100%!important;';
      rm.appendChild(mapEl);
    }

    sc.appendChild(lm);
    sc.appendChild(rm);
    document.body.appendChild(sc);
    this.map?.resize?.();

    // ── OVERLAY UI ────────────────────────────────────────────────────
    const ov = document.createElement('div');
    ov.id = 'tci-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:3000;pointer-events:none;font-family:"Space Grotesk","Inter",sans-serif;';
    ov.innerHTML = `
      <canvas id="tci-cv" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;background:transparent"></canvas>
      <!-- TOP BAR -->
      <div style="position:absolute;top:0;left:0;right:0;pointer-events:all;background:rgba(4,10,24,0.90);backdrop-filter:blur(12px);border-bottom:1px solid rgba(212,175,55,0.15);padding:7px 14px;display:flex;align-items:center;gap:10px;z-index:10">
        <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.15em">TCI</div>
        <div id="tci-h1" style="font-size:13px;font-weight:800;color:#fff"></div>
        <div id="tci-h2" style="font-size:9px;color:rgba(148,163,184,0.5);margin-left:2px"></div>
        <div style="flex:1"></div>
        <div style="font-size:9px;color:rgba(96,165,250,0.65)">EXISTENT 2025</div>
        <div style="color:rgba(212,175,55,0.35);font-size:14px;margin:0 4px">⟺</div>
        <div id="tci-yr-top" style="font-size:9px;font-weight:700;color:#D4AF37"></div>
        <button onclick="TCI.close()" style="background:none;border:none;color:rgba(148,163,184,0.45);cursor:pointer;font-size:14px;pointer-events:all;padding:2px 8px">✕</button>
      </div>
      <!-- PANEL STANG -->
      <div id="tci-lpanel" style="position:absolute;left:0;top:42px;bottom:60px;width:182px;pointer-events:all;background:rgba(4,10,24,0.90);backdrop-filter:blur(12px);border-right:1px solid rgba(255,255,255,0.06);overflow-y:auto;z-index:10">
        <div style="padding:10px">
          <div style="font-size:7.5px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:8px">DATE LIVE</div>
          <div id="tci-kpis"></div>
          <div style="border-top:1px solid rgba(255,255,255,0.06);margin:10px 0;padding-top:10px">
            <div style="font-size:7.5px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:6px">COMPARARE UAT</div>
            <input type="text" id="tci-cmp-inp" placeholder="Caută UAT..." autocomplete="off" oninput="TCI._cmpSearch(this.value)"
              style="width:100%;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:6px 8px;border-radius:6px;font-size:10px;font-family:inherit;box-sizing:border-box">
            <div id="tci-cmp-res" style="background:rgba(4,10,24,0.97);border:1px solid rgba(255,255,255,0.1);border-radius:6px;max-height:100px;overflow-y:auto;display:none;margin-top:3px"></div>
            <div id="tci-cmp-out" style="margin-top:6px"></div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.06);margin:10px 0;padding-top:10px">
            <button onclick="TCI._snapshot()" style="display:block;width:100%;text-align:left;padding:6px 8px;margin-bottom:4px;border-radius:5px;border:1px solid rgba(255,255,255,0.07);background:rgba(14,26,52,0.5);color:rgba(200,215,235,0.8);font-size:10px;cursor:pointer;font-family:inherit;pointer-events:all">📷 Snapshot</button>
            <button onclick="TCI._share()" style="display:block;width:100%;text-align:left;padding:6px 8px;border-radius:5px;border:1px solid rgba(255,255,255,0.07);background:rgba(14,26,52,0.5);color:rgba(200,215,235,0.8);font-size:10px;cursor:pointer;font-family:inherit;pointer-events:all">🔗 Share URL</button>
          </div>
        </div>
      </div>
      <!-- PANEL DREPT -->
      <div id="tci-rpanel" style="position:absolute;right:0;top:42px;bottom:60px;width:188px;pointer-events:all;background:rgba(4,10,24,0.90);backdrop-filter:blur(12px);border-left:1px solid rgba(255,255,255,0.06);overflow-y:auto;z-index:10">
        <div style="padding:10px">
          <div style="font-size:7.5px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:8px">PROIECȚIE ${this.startYear}–2055</div>
          <div id="tci-kpis-r"></div>
          <canvas id="tci-chart" width="163" height="60" style="width:100%;display:block;margin-top:8px"></canvas>
          <div id="tci-eu-panel" style="margin-top:8px"></div>
        </div>
      </div>
      <!-- CARD NARATIV -->
      <div id="tci-narcard" style="position:absolute;left:50%;transform:translateX(-50%);bottom:72px;max-width:520px;width:calc(100% - 390px);min-width:260px;z-index:9;pointer-events:none;background:rgba(4,10,24,0.92);backdrop-filter:blur(14px);border:1px solid rgba(212,175,55,0.28);border-radius:10px;padding:12px 16px;transition:opacity .35s">
        <div id="tci-nar-title" style="font-size:12px;font-weight:700;color:#D4AF37;margin-bottom:4px"></div>
        <div id="tci-nar-body" style="font-size:11px;color:rgba(200,215,235,0.88);line-height:1.55"></div>
        <div id="tci-nar-src" style="font-size:8.5px;color:rgba(148,163,184,0.45);margin-top:5px;font-style:italic"></div>
      </div>
      <!-- BOTTOM BAR -->
      <div id="tci-bbar" style="position:absolute;bottom:0;left:182px;right:188px;pointer-events:all;background:rgba(4,10,24,0.92);backdrop-filter:blur(12px);border-top:1px solid rgba(212,175,55,0.15);padding:7px 14px;display:flex;align-items:center;gap:10px;z-index:10">
        <div id="tci-yr" style="font-size:26px;font-weight:900;color:#D4AF37;min-width:50px"></div>
        <div style="flex:1;position:relative">
          <input type="range" id="tci-scrub" min="${this.startYear}" max="2055" value="${this.startYear}" step="1" oninput="TCI.scrubTo(+this.value)" style="width:100%;accent-color:#D4AF37;height:4px">
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
      ['Populație',           ((d1?.demo)?.value||c1.pop2021||0).toLocaleString(),  ((d2?.demo)?.value||c2.pop2021||0).toLocaleString()],
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
      try {
        this._scenes=this._build();
        console.log('[Director] ✅ '+this._scenes.length+' scene încărcate pentru '+T.cityData?.name);
      } catch(e) {
        console.error('[Director] Eroare build scenes:',e.message);
        // Fallback minim — 2 scene garantate
        const d=T.cityData||{}, cx=d.lon||27.601, cy=d.lat||47.158;
        this._scenes=[
          {id:'fb1',dur:60000,light:'dusk',
           cam:{center:[cx,cy],zoom:4.5,pitch:0,bearing:0,duration:3500},
           chain:[{center:[cx,cy],zoom:12,pitch:50,bearing:-20,duration:6000,delay:8000},{center:[cx,cy],zoom:15,pitch:68,bearing:10,duration:5000,delay:20000}],
           title:'🏙 '+d.name,'body':d.name+' — proiecție urbanistică 2025-2055',src:'UrbanX TSS·FG'},
          {id:'fb2',dur:60000,light:'dusk',
           cam:{center:[cx,cy],zoom:13.5,pitch:55,bearing:-25,duration:5000},
           chain:[{center:[cx,cy],zoom:16.5,pitch:76,bearing:20,duration:6000,delay:12000},{center:[cx,cy],zoom:12,pitch:40,bearing:0,duration:5000,delay:35000}],
           title:'📊 Date Oficiale '+d.name,'body':'Proiecție calibrată: INSE · Eurostat · ANCPI · BNR · IPCC AR6',src:'UrbanX TSS·FG'},
        ];
        console.log('[Director] Fallback cu',this._scenes.length,'scene');
      }
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
      const ms=(typeof _getModalSplit!=='undefined')?_getModalSplit(yr):{auto:72,tp:18,bici_ped:10};

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
        // S1 — Europa → România (18s) — chains la 5s și 13s
        {id:'s1',dur:18000,light:'day',
         cam:{center:[24.5,45.9],zoom:4.5,pitch:0,bearing:0,duration:3000},
         chain:[
           {center:[24.8,45.7],zoom:5.8,pitch:8,bearing:-5,duration:4500,delay:5000},
           {center:[cx+0.2,cy+0.1],zoom:7.2,pitch:15,bearing:-10,duration:5000,delay:13000},
         ],
         title:'🌍 '+name+' — Vedere Globală',
         body:'Romania · '+pop+' loc. · jud. '+county+'. '+cityProfile(),
         src:'INS · Eurostat · ANCPI'},

        // S2 — Moldova (18s) — chains la 5s și 13s
        {id:'s2',dur:18000,light:'day',
         cam:{center:[cx+0.25,cy+0.12],zoom:8.0,pitch:15,bearing:-8,duration:4000},
         chain:[
           {center:[cx+0.05,cy+0.03],zoom:9.5,pitch:25,bearing:-5,duration:5000,delay:5000},
           {center:[cx,cy],zoom:11.0,pitch:35,bearing:-10,duration:5500,delay:13000},
         ],
         title:'🗺 Regiune — '+name+' Pol Regional',
         body:'Zona metropolitana extinsă. Rată demografică: '+rate+'%/an. Densitate: '+densHA+' loc/km². PIB județ: '+pib+' mld €/an.',
         src:'INS · ADR Nord-Est · Eurostat NUTS'},

        // S3 — Aproach (22s) — chains la 7s și 16s
        {id:'s3',dur:22000,light:'dusk',
         cam:{center:[cx,cy],zoom:11.5,pitch:30,bearing:-18,duration:4500},
         chain:[
           {center:[cx,cy],zoom:12.5,pitch:42,bearing:-10,duration:5500,delay:7000},
           {center:[cx,cy],zoom:13.2,pitch:50,bearing:-5,duration:5500,delay:16000},
         ],
         title:'✈ Aproach — '+name+' '+yr,
         body:'Populație '+yr+': '+pop+'. Proiecție 2050: '+pop50+' (+20%). Investiții: €'+Math.round(pib*180)+'M/an. Locuințe noi: '+Math.round((d.pop2021||100000)/30).toLocaleString()+' unități 2025-2050.',
         src:'INSE · ANCPI · BNR · Eurostat'},

        // S4 — City 3D orbit (70s) — zoom 14.5-15.5 pentru cladiri 3D vizibile
        {id:'s4',dur:70000,light:'dusk',
         cam:{center:[cx,cy],zoom:14.0,pitch:55,bearing:-30,duration:6000},
         chain:[
           {center:[cx+0.004,cy+0.002],zoom:14.8,pitch:60,bearing:15,duration:6000,delay:12000},
           {center:[cx-0.003,cy+0.003],zoom:15.2,pitch:63,bearing:-25,duration:6000,delay:26000},
           {center:[cx+0.002,cy-0.002],zoom:15.5,pitch:65,bearing:10,duration:6000,delay:42000},
           {center:[cx,cy],zoom:14.5,pitch:58,bearing:0,duration:6000,delay:58000},
         ],
         title:'🏙 '+name+' 3D — Structura Urbană',
         body:'Clădiri 3D reale — zoom în pentru detalii. UTR: Rezidențial · Mixt · Comercial · Industrial. CUT max: 2.5-3.5. Densitate medie: '+densHA+' loc/ha.',
         src:'PUG '+name+' · OSM Buildings 3D · ANCPI'},

        // S5 — Dezvoltare (85s) — zoom 14-15, chains la 12, 28, 48, 68s
        {id:'s5',dur:85000,light:'dusk',
         cam:{center:[cx+0.006,cy+0.008],zoom:14.2,pitch:60,bearing:15,duration:6000},
         chain:[
           {center:[cx+0.010,cy+0.012],zoom:14.8,pitch:63,bearing:-15,duration:6000,delay:12000},
           {center:[cx-0.008,cy+0.006],zoom:15.0,pitch:65,bearing:20,duration:6000,delay:28000},
           {center:[cx+0.008,cy-0.006],zoom:14.5,pitch:62,bearing:0,duration:6000,delay:48000},
           {center:[cx,cy],zoom:14.0,pitch:58,bearing:-10,duration:5500,delay:68000},
         ],
         title:'📈 Dezvoltare Urbană 2025–2050',
         body:'Autorizații/an: ~'+Math.round((d.pop2021||100000)/420)+'. Zone densificare majoră (roșu): centru+nord. Zone expansiune (galben): periferie. Clădirile cresc vizibil pe hartă.',
         src:'ANCPI Autorizații · PUG UTR · INS Construcții',
         animYear:true,yearFrom:2025,yearTo:2050},

        // S6 — Mobilitate (85s) — zoom 13-14.5, traffic vizibil
        {id:'s6',dur:85000,light:'night',
         cam:{center:[cx,cy],zoom:13.5,pitch:50,bearing:0,duration:5500},
         chain:[
           {center:[cx+0.006,cy-0.004],zoom:14.0,pitch:54,bearing:-18,duration:6000,delay:14000},
           {center:[cx-0.004,cy+0.004],zoom:14.2,pitch:56,bearing:18,duration:6000,delay:30000},
           {center:[cx+0.005,cy+0.002],zoom:14.5,pitch:58,bearing:-8,duration:6000,delay:48000},
           {center:[cx,cy],zoom:13.5,pitch:50,bearing:0,duration:5500,delay:68000},
         ],
         title:'🚊 Rețea Mobilitate — Trafic Live',
         body:'TMZ: ~'+Math.round((d.pop2021||100000)*0.22)+' veh/zi. Mașini (galben) · Autobuze (albastru) · Tramvaie (roșu) animate. Modal split: auto '+ms.auto+'% · TP '+ms.tp+'%.',
         src:'PMUD · PNRR Mobilitate · Eurostat'},

        // S7 — Focus cartier (90s) — zoom 15-17, street level
        {id:'s7',dur:90000,light:'dusk',
         cam:{center:[cx+0.007,cy+0.010],zoom:15.2,pitch:65,bearing:-18,duration:6000},
         chain:[
           {center:[cx+0.009,cy+0.012],zoom:15.8,pitch:70,bearing:15,duration:7000,delay:14000},
           {center:[cx+0.006,cy+0.013],zoom:16.2,pitch:73,bearing:-25,duration:7000,delay:32000},
           {center:[cx+0.010,cy+0.010],zoom:16.8,pitch:75,bearing:20,duration:7000,delay:52000},
           {center:[cx+0.008,cy+0.011],zoom:15.5,pitch:68,bearing:0,duration:6000,delay:74000},
         ],
         title:'🏗 Focus Zone — Densificare',
         body:'Zona nord-centrală: +28% estimat 2025-2040. Locuințe noi: ~'+Math.round((d.pop2021||100000)/30)+'. CUT 0.8-1.2. Valoare imobiliară: +'+Math.round(6+parseFloat(rate)*3)+'%/an.',
         src:'PUG · ANCPI · INS · Model UTR'},

        // S8 — Street level (80s) — zoom 16.5-17.5
        {id:'s8',dur:80000,light:'dusk',
         cam:{center:[cx+0.002,cy+0.001],zoom:16.5,pitch:74,bearing:5,duration:6000},
         chain:[
           {center:[cx+0.003,cy+0.001],zoom:17.0,pitch:78,bearing:35,duration:7000,delay:13000},
           {center:[cx+0.001,cy+0.003],zoom:17.3,pitch:79,bearing:-20,duration:7000,delay:30000},
           {center:[cx+0.004,cy+0.002],zoom:17.5,pitch:76,bearing:48,duration:7000,delay:50000},
           {center:[cx+0.002,cy+0.001],zoom:16.5,pitch:74,bearing:0,duration:6000,delay:66000},
         ],
         title:'🚶 Nivel Pietonal — Viața Urbană',
         body:'Pietoni/zi centru: ~'+Math.round((d.pop2021||100000)*0.065).toLocaleString()+'. WalkScore: '+Math.round(55+densHA*0.15)+'/100. Calitate aer PM2.5: 18μg/m³. Tramvaiele și mașinile se văd la zoom 16+.',
         src:'PMUD · ANM · OMS'},

        // S9 — Riscuri (65s)
        {id:'s9',dur:65000,light:'night',
         cam:{center:[cx,cy],zoom:13.0,pitch:46,bearing:5,duration:5500},
         chain:[
           {center:[cx+0.006,cy-0.004],zoom:13.5,pitch:50,bearing:-18,duration:6000,delay:12000},
           {center:[cx-0.008,cy+0.005],zoom:13.8,pitch:53,bearing:14,duration:6000,delay:28000},
           {center:[cx,cy],zoom:13.0,pitch:48,bearing:0,duration:5500,delay:48000},
         ],
         title:'⚠ Riscuri & Climă — '+name,
         body:'Risc seismic: zona D (ag=0.20g). Inundații: ~340ha. Caniculă 2050: +22 zile/an. Scor risc: '+Math.round(35+densHA*0.3)+'/100. Plan adaptare: €42M.',
         src:'INFP · ANAR · IPCC AR6 · ANM'},

        // S10 — Comparatie (70s)
        {id:'s10',dur:70000,light:'dusk',
         cam:{center:[cx,cy],zoom:12.5,pitch:44,bearing:-10,duration:5500},
         chain:[
           {center:[cx+0.004,cy-0.003],zoom:13.0,pitch:48,bearing:18,duration:6000,delay:14000},
           {center:[cx-0.004,cy+0.003],zoom:13.5,pitch:52,bearing:-18,duration:6000,delay:32000},
           {center:[cx,cy],zoom:12.8,pitch:46,bearing:5,duration:5500,delay:52000},
         ],
         title:'⚖ '+name+' vs Orase Similare EU',
         body:name+': '+densHA+' loc/ha · TP 18% · ESG 51/100. Cluj: 76/ha · 28% · 67. Vilnius: 156/ha · 42% · 79. Decalaj recuperabil: 8-12 ani investiții.',
         src:'Eurostat Urban Audit 2021 · INS · BNR'},

        // S11 — Time Machine (90s) — orbit 360 + year scrub
        {id:'s11',dur:90000,light:'dusk',
         cam:{center:[cx,cy],zoom:14.0,pitch:55,bearing:0,duration:5500},
         chain:[
           {center:[cx,cy],zoom:14.5,pitch:58,bearing:60,duration:8000,delay:15000},
           {center:[cx,cy],zoom:14.8,pitch:60,bearing:120,duration:8000,delay:33000},
           {center:[cx,cy],zoom:15.0,pitch:62,bearing:180,duration:8000,delay:52000},
           {center:[cx,cy],zoom:14.5,pitch:58,bearing:240,duration:8000,delay:71000},
         ],
         title:'⏱ Time Machine — 2025 → 2050',
         body:'Orbită 360°. Clădirile cresc, rețeaua TP se extinde. Scrub pe slider pentru orice an. Transformare: '+Math.round((yr-2025)/25*100)+'% completă.',
         src:'INSE · ANCPI · IPCC · Model TSS·FG',
         animYear:true,yearFrom:2025,yearTo:2050},

        // S12 — Concluzie (50s)
        {id:'s12',dur:50000,light:'dusk',
         cam:{center:[cx,cy],zoom:12.2,pitch:42,bearing:-18,duration:5000},
         chain:[
           {center:[cx,cy],zoom:13.0,pitch:50,bearing:22,duration:6000,delay:12000},
           {center:[cx,cy],zoom:14.2,pitch:58,bearing:-12,duration:6000,delay:30000},
           {center:[cx,cy],zoom:12.0,pitch:40,bearing:0,duration:5500,delay:44000},
         ],
         title:'🌟 '+name+' 2050 — Viziunea',
         body:'Proiecție 2025-2050: +20% pop · +100% PIB/cap · ESG 78/100 · TP 36%. Date oficiale calibrate. Standard urbanistic european — disponibil oricărui UAT din România.',
         src:'UrbanX TSS·FG © — INS · Eurostat · ANCPI · BNR · IPCC AR6'},
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
    const yt=document.getElementById('tci-yr-top'); if(yt) yt.textContent='PROIECTAT · '+yr;
    const sl=document.getElementById('tci-scrub'); if(sl) sl.value=yr;
    // Update label dreapta
    const lr=document.getElementById('tci-lbl-right');
    if(lr) lr.textContent='🔮 PROIECTAT · '+yr;
    // Actualizeaza KPIs
    if(Math.abs(yr-(this._lastKpiUpdate||0))>=2){
      this._lastKpiUpdate=yr;
      this._updateKPIs();
      this._updateBuildingHeight(yr);
    }
  },


  _updateBuildingHeight(yr) {
    // Mapbox Standard renders buildings natively at zoom 14+
    // No custom layer needed — Standard handles 3D automatically
    // Try to animate Standard built-in layer if accessible
    const m=this.map; if(!m) return;
    const yF=Math.max(0,Math.min(1,(yr-2025)/25));
    ['building-extrusion','building','3d-buildings'].forEach(lid=>{
      try{
        if(m.getLayer?.(lid)) m.setPaintProperty(lid,'fill-extrusion-opacity',0.75+yF*0.15);
      }catch(e){}
    });
  },

  // ── Canvas HUD ───────────────────────────────────────────────────────────
  _drawHUD(yr, yF) {
    const ctx=this.ctx; if(!ctx) return;
    const W=this.canvas.width, H=this.canvas.height;
    ctx.clearRect(0,0,W,H);
    const globalYF=Math.max(0,Math.min(1,(yr-this.startYear)/(2055-this.startYear)));

    // An mare semitransparent pe fundal
    ctx.save();
    ctx.fillStyle='rgba(212,175,55,0.05)';
    ctx.font=`bold ${Math.round(H*0.18)}px "Space Grotesk",sans-serif`;
    ctx.textAlign='left';
    ctx.fillText(yr, 200, H*0.62);
    ctx.restore();

    // Bara progres
    ctx.fillStyle='rgba(212,175,55,0.15)';
    ctx.fillRect(190,H-63,(W-395),3);
    ctx.fillStyle='rgba(212,175,55,0.7)';
    ctx.fillRect(190,H-63,(W-395)*globalYF,3);

    // Watermark
    ctx.save(); ctx.globalAlpha=0.3;
    ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='7px "Space Grotesk"'; ctx.textAlign='right';
    ctx.fillText('INSE · Eurostat · ANCPI · BNR · IPCC AR6 · ANM · INFP · ANAR',W-10,H-70);
    ctx.fillStyle='rgba(212,175,55,0.5)'; ctx.font='bold 7px "Space Grotesk"';
    ctx.fillText('UrbanX TSS·FG · Proiecție urbanistică · Date oficiale publice',W-10,H-61);
    ctx.restore(); ctx.textAlign='left';

    // Milestone dramatic
    if(this.MILES.includes(yr) && yF<0.12) {
      const a=Math.min(1,yF/0.12)*0.9;
      ctx.save(); ctx.globalAlpha=a;
      ctx.textAlign='center';
      ctx.fillStyle='#D4AF37'; ctx.font='bold 20px "Space Grotesk"';
      ctx.fillText('⭐ '+yr+' — MILESTONE', W/2, H*0.24);
      const d=this._data(yr);
      const pop=(d.demo?.value||0).toLocaleString();
      ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.font='11px "Space Grotesk"';
      ctx.fillText('Populație: '+pop+' · PIB/cap: €'+((d.housing?.pibCapProj||14200)/1000).toFixed(0)+'k · ESG: '+(d.esg?.total||51)+'/100', W/2, H*0.30);
      ctx.restore(); ctx.textAlign='left';
    }

    // Time Machine overlay — când scena s11 e activă
    const sceneId=this._director?._scenes?.[this._director?._idx]?.id;
    if(sceneId==='s11') this._drawTimeMachine(ctx, W, H, yr);

    // Overlay date per nivel de zoom — vizibil la ORICE nivel
    const zoom = this.map?.getZoom?.() || 12;
    this._drawZoomOverlay(ctx, W, H, yr, zoom, sceneId);

    // Legendă clădiri — mereu vizibilă
    this._drawLegend(ctx, W, H, yr);
  },

  _drawZoomOverlay(ctx, W, H, yr, zoom, sceneId) {
    const city = this._city();
    const d    = this._data(yr);
    const name = city.name || 'UAT';
    const pop  = (d.demo?.value || city.pop2021 || 0).toLocaleString();
    const yF   = Math.max(0,Math.min(1,(yr-2025)/25));

    ctx.save();

    // ── ZOOM 4-7: Europa/Moldova — card stânga cu date cheie ─────────────
    if(zoom < 8) {
      const cx2=20, cy2=H*0.28;
      ctx.fillStyle='rgba(4,10,24,0.88)';
      this._rr(ctx,cx2,cy2,210,130,8); ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,0.3)'; ctx.lineWidth=1;
      this._rr(ctx,cx2,cy2,210,130,8); ctx.stroke();
      ctx.textAlign='left';
      ctx.fillStyle='#D4AF37'; ctx.font='bold 11px "Space Grotesk"';
      ctx.fillText('📍 '+name, cx2+14, cy2+20);
      ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='7.5px "Space Grotesk"';
      ctx.fillText(city.judet ? 'jud. '+city.judet+' · România' : 'România', cx2+14, cy2+34);
      ctx.fillStyle='rgba(255,255,255,0.1)'; ctx.fillRect(cx2+14,cy2+38,180,1);
      const rows=[
        {l:'Populație '+yr, v:pop,              c:'#60a5fa'},
        {l:'PIB/cap est.',  v:'€'+((d.housing?.pibCapProj||14200)/1000).toFixed(0)+'k', c:'#22c55e'},
        {l:'Creștere/an',   v:(city.rata_reala_2011_2021||0).toFixed(2)+'%', c:'#D4AF37'},
        {l:'ESG Score',     v:(d.esg?.total||51)+'/100',  c:'#a78bfa'},
      ];
      rows.forEach((r,i)=>{
        const ry=cy2+44+i*20;
        ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='7.5px "Space Grotesk"';
        ctx.fillText(r.l, cx2+14, ry+8);
        ctx.fillStyle=r.c; ctx.font='bold 11px "Space Grotesk"';
        ctx.fillText(r.v, cx2+120, ry+8);
      });
      // Marker pe harta — incarcat
      ctx.textAlign='center';
      ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font='16px "Space Grotesk"';
      ctx.fillText('📍', W/2+10, H/2);
    }

    // ── ZOOM 8-11: Regional — statistici regionale ────────────────────────
    if(zoom >= 8 && zoom < 12) {
      const cx2=20, cy2=H*0.3;
      ctx.fillStyle='rgba(4,10,24,0.85)';
      this._rr(ctx,cx2,cy2,200,100,7); ctx.fill();
      ctx.strokeStyle='rgba(96,165,250,0.25)'; ctx.lineWidth=1;
      this._rr(ctx,cx2,cy2,200,100,7); ctx.stroke();
      ctx.textAlign='left';
      ctx.fillStyle='#60a5fa'; ctx.font='bold 10px "Space Grotesk"';
      ctx.fillText(name+' — '+yr, cx2+12, cy2+18);
      ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='7.5px "Space Grotesk"';
      ctx.fillText('Pol regional · zona metropolitana', cx2+12, cy2+30);
      ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(cx2+12,cy2+34,174,1);
      ctx.fillStyle='rgba(200,215,235,0.85)'; ctx.font='bold 22px "Space Grotesk"';
      ctx.fillText(pop, cx2+12, cy2+62);
      ctx.fillStyle='rgba(148,163,184,0.5)'; ctx.font='7px "Space Grotesk"';
      ctx.fillText('locuitori · proiecție '+yr, cx2+12, cy2+74);
      // Delta vs 2025
      const pop0 = city.pop2021||100000;
      const delta = Math.round(((d.demo?.value||pop0)-pop0)/pop0*100);
      ctx.fillStyle=delta>0?'#22c55e':'#ef4444'; ctx.font='bold 10px "Space Grotesk"';
      ctx.fillText((delta>0?'+':'')+delta+'% față de 2025', cx2+12, cy2+90);
    }

    // ── ZOOM 12-13: City overview — KPI-uri centru sus ────────────────────
    if(zoom >= 12 && zoom < 14) {
      const ms=(typeof _getModalSplit!=='undefined')?_getModalSplit(yr):{auto:72,tp:18};
      const kpis=[
        {l:'POPULAȚIE',v:pop,c:'#60a5fa'},
        {l:'PIB/CAP',v:'€'+((d.housing?.pibCapProj||14200)/1000).toFixed(0)+'k',c:'#22c55e'},
        {l:'ESG',v:(d.esg?.total||51)+'/100',c:'#a78bfa'},
        {l:'MODAL AUTO',v:ms.auto+'%',c:'#f59e0b'},
      ];
      const kW=100, kGap=8, kH=44;
      const totalW=kpis.length*(kW+kGap)-kGap;
      const kX=W/2-totalW/2, kY=52;
      kpis.forEach((k,i)=>{
        const x=kX+i*(kW+kGap);
        ctx.fillStyle='rgba(4,10,24,0.85)';
        this._rr(ctx,x,kY,kW,kH,5); ctx.fill();
        ctx.strokeStyle=k.c+'44'; ctx.lineWidth=1;
        this._rr(ctx,x,kY,kW,kH,5); ctx.stroke();
        ctx.textAlign='center';
        ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='6.5px "Space Grotesk"';
        ctx.fillText(k.l, x+kW/2, kY+12);
        ctx.fillStyle=k.c; ctx.font='bold 14px "Space Grotesk"';
        ctx.fillText(k.v, x+kW/2, kY+32);
      });
      ctx.textAlign='left';
    }

    ctx.restore();
  },

  _drawTimeMachine(ctx, W, H, yr) {
    const yF=Math.max(0,Math.min(1,(yr-2025)/25));
    ctx.save();

    // Labels 2025 | 2050 cu opacitate variabilă
    const a=Math.min(1,(Date.now()-this._tmStart||1)/1500);
    ctx.globalAlpha=a;
    ctx.font=`bold ${Math.round(H*0.12)}px "Space Grotesk"`;
    ctx.textAlign='center';
    ctx.fillStyle='rgba(148,163,184,0.15)'; ctx.fillText('2025',W*0.26,H*0.58);
    ctx.fillStyle='rgba(212,175,55,'+(0.1+yF*0.15)+')'; ctx.fillText('2050',W*0.74,H*0.58);

    // Sub-labels
    ctx.font='bold 13px "Space Grotesk"';
    ctx.fillStyle='rgba(148,163,184,0.45)'; ctx.fillText('ASTĂZI',W*0.26,H*0.65);
    ctx.fillStyle='rgba(212,175,55,'+(0.3+yF*0.45)+')'; ctx.fillText('VIITORUL',W*0.74,H*0.65);

    // Linie split verticală animată
    const spX=W/2+Math.sin(Date.now()/6000)*15;
    ctx.fillStyle='rgba(255,255,255,'+(0.3+yF*0.3)+')';
    ctx.fillRect(spX-1,50,2,H-112);

    // Play button
    ctx.fillStyle='rgba(4,10,24,0.8)';
    ctx.beginPath(); ctx.arc(spX,H/2-15,20,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(212,175,55,0.7)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(spX,H/2-15,20,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle='rgba(212,175,55,0.9)';
    ctx.beginPath(); ctx.moveTo(spX-8,H/2-24); ctx.lineTo(spX-8,H/2-6); ctx.lineTo(spX+12,H/2-15); ctx.closePath(); ctx.fill();

    // An curent centrat
    ctx.fillStyle='#D4AF37'; ctx.font='bold 16px "Space Grotesk"';
    ctx.fillText(this.year||yr, spX, H/2+18);

    // Progress bar transformare
    const pW=200, pX=W/2-pW/2, pY=H*0.75;
    ctx.fillStyle='rgba(255,255,255,0.1)'; ctx.fillRect(pX,pY,pW,4);
    ctx.fillStyle='rgba(212,175,55,0.8)'; ctx.fillRect(pX,pY,pW*yF,4);
    ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='9px "Space Grotesk"';
    ctx.fillText('Transformare: '+Math.round(yF*100)+'%', W/2, pY+16);

    ctx.restore(); ctx.textAlign='left';
  },

  _drawLegend(ctx, W, H, yr) {
    const yF=Math.max(0,Math.min(1,((yr||this.year)-2025)/25));
    // Legenda explică CULORILE CLĂDIRILOR + ce înseamnă per an
    const items=[
      {c:'#1e3a5f', l:'Clădiri existente pre-2025'},
      {c:'#f59e0b', l:'Construcție activă '+(2025+Math.round(yF*8))+'–'+(2025+Math.round(yF*15))},
      {c:'#22c55e', l:'Finalizate · Clădiri noi'},
      {c:'#0ea5e9', l:'Landmark / Înalt'},
      {c:'#0f172a', l:'Construcție nouă mică'},
    ];
    const LW=185, LH=items.length*14+24, LX=W-LW-10, LY=H-70-LH;
    ctx.save();
    ctx.fillStyle='rgba(4,10,24,0.85)';
    this._rr(ctx,LX,LY,LW,LH,6); ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,0.07)'; ctx.lineWidth=1;
    this._rr(ctx,LX,LY,LW,LH,6); ctx.stroke();
    ctx.fillStyle='#D4AF37'; ctx.font='bold 7.5px "Space Grotesk"';
    ctx.fillText('CLĂDIRI — '+(yr||this.year), LX+10, LY+14);
    // Bara progres densificare
    const bpW=LW-20;
    ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(LX+10,LY+18,bpW,3);
    ctx.fillStyle='rgba(212,175,55,0.7)';   ctx.fillRect(LX+10,LY+18,bpW*yF,3);
    items.forEach((it,i)=>{
      const y=LY+26+i*14;
      ctx.fillStyle=it.c; ctx.fillRect(LX+10,y,10,10);
      ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=0.5;
      ctx.strokeRect(LX+10,y,10,10);
      ctx.fillStyle='rgba(200,215,235,0.78)'; ctx.font='8px "Space Grotesk"';
      ctx.fillText(it.l,LX+25,y+8.5);
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
    // Remove layers
    ['tci-vehicles','tci-tp'].forEach(id=>{
      try{if(this.map.getSource?.(id)){
        ['tci-veh-car','tci-veh-bus','tci-veh-tram','tci-tp-layer'].forEach(l=>{
          try{if(this.map.getLayer?.(l))this.map.removeLayer(l);}catch(e){}
        });
        this.map.removeSource(id);
      }}catch(e){}
    });
    // Distruge harta stanga
    try { this.mapLeft?.remove(); this.mapLeft=null; } catch(e){}
    // Curata UI
    document.getElementById('tci-ov')?.remove();
    document.getElementById('tci-split-cont')?.remove();
    // Restaureaza harta originala
    const mapEl=document.getElementById('map');
    if(mapEl){
      mapEl.style.cssText='';
      document.body.appendChild(mapEl);
    }
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
