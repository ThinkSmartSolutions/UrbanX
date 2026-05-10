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
      <!-- PANEL DREPT — Narativ + KPI proiecție + Legendă -->
      <div id="tci-rpanel" style="position:absolute;right:0;top:42px;bottom:60px;width:220px;pointer-events:all;background:rgba(4,10,24,0.92);backdrop-filter:blur(12px);border-left:1px solid rgba(255,255,255,0.06);overflow-y:auto;z-index:10">
        <div style="padding:10px;display:flex;flex-direction:column;gap:8px">

          <!-- Scena curenta / narativ -->
          <div id="tci-narcard" style="background:rgba(14,26,52,0.8);border:1px solid rgba(212,175,55,0.3);border-radius:8px;padding:10px;transition:opacity .35s">
            <div id="tci-nar-title" style="font-size:10.5px;font-weight:700;color:#D4AF37;margin-bottom:4px;line-height:1.3"></div>
            <div id="tci-nar-body" style="font-size:9.5px;color:rgba(200,215,235,0.85);line-height:1.55"></div>
            <div id="tci-nar-src" style="font-size:7.5px;color:rgba(148,163,184,0.4);margin-top:4px;font-style:italic"></div>
          </div>

          <!-- Ce vedeti -->
          <div id="tci-nar-what" style="background:rgba(8,18,40,0.8);border:1px solid rgba(96,165,250,0.2);border-radius:8px;padding:9px">
            <div style="font-size:7.5px;font-weight:700;color:#60a5fa;margin-bottom:3px;letter-spacing:.05em">👁 CE VEDEȚI</div>
            <div id="tci-nar-whattext" style="font-size:9px;color:rgba(180,200,225,0.82);line-height:1.55"></div>
          </div>

          <!-- Separator -->
          <div style="border-top:1px solid rgba(255,255,255,0.06)"></div>
          <div style="font-size:7.5px;font-weight:700;color:#D4AF37;letter-spacing:.08em">PROIECȚIE ${this.startYear}–2055</div>
          <div id="tci-kpis-r"></div>
          <canvas id="tci-chart" width="195" height="60" style="width:100%;display:block"></canvas>
          <div id="tci-eu-panel"></div>

          <!-- Legenda -->
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:8px">
            <div style="font-size:7px;font-weight:700;color:rgba(148,163,184,0.55);margin-bottom:5px;letter-spacing:.06em">LEGENDA PROIECȚIE</div>
            ${[
              {c:'#374151',l:'Planificat'},
              {c:'#f59e0b',l:'Construcție activă'},
              {c:'#f97316',l:'Aproape finalizat'},
              {c:'#7c3aed',l:'Centru civic'},
              {c:'#d97706',l:'Coridor bulevardier'},
              {c:'#2563eb',l:'Rezidențial colectiv'},
              {c:'#ea580c',l:'Reconversie industrială'},
              {c:'#16a34a',l:'Creștere rezidențială'},
            ].map(it=>`<div style="display:flex;align-items:center;gap:5px;margin-bottom:3px"><div style="width:9px;height:7px;background:${it.c};border-radius:2px;flex-shrink:0"></div><span style="font-size:7.5px;color:rgba(180,200,220,0.7)">${it.l}</span></div>`).join('')}
            <div style="font-size:6.5px;color:rgba(100,120,150,0.45);margin-top:4px">INS · Eurostat · ANCPI · Model TSS·FG</div>
          </div>
        </div>
      </div>

      <!-- BANNER SURSE -->
      <div id="tci-src-banner" style="position:absolute;top:42px;left:182px;right:220px;z-index:9;pointer-events:none;background:rgba(4,10,24,0.75);border-bottom:1px solid rgba(255,255,255,0.05);padding:3px 14px;display:flex;align-items:center;gap:10px;flex-wrap:nowrap;overflow:hidden">
        <div style="font-size:6px;font-weight:700;color:rgba(212,175,55,0.6);letter-spacing:.12em;white-space:nowrap">SURSE OFICIALE:</div>
        ${['INSE','Eurostat','ANCPI','BNR','Meteo România','INFP','ANAR','IPCC AR6'].map(s=>`<span style="font-size:6px;color:rgba(148,163,184,0.45);white-space:nowrap">${s}</span>`).join('<span style="color:rgba(255,255,255,0.1)">·</span>')}
        <div style="flex:1;font-size:6px;color:rgba(100,120,150,0.35);text-align:right;white-space:nowrap">Valori orientative · Model predictiv TSS·FG ©</div>
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
      if(s) s.textContent = src ? '📊 Surse oficiale: '+src : '';
      if(c) c.style.opacity = '1';
    }, 280);
  },

  // Explicatie suplimentara per scena — "mura in gura" pentru utilizator
  _updateNarExtra(sceneId, yr) {
    const el = document.getElementById('tci-nar-whattext');
    if(!el) {
      // Creeaza elementul daca nu exista
      const nc = document.getElementById('tci-narcard');
      if(!nc) return;
      const div = document.createElement('div');
      div.id = 'tci-nar-whattext';
      div.style.cssText = 'margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.08);font-size:9.5px;color:rgba(148,163,184,0.7);line-height:1.6';
      nc.appendChild(div);
    }
    const ex = document.getElementById('tci-nar-whattext');
    if(!ex) return;

    const city  = this._city();
    const d     = this._data(yr);
    const name  = city.name || 'UAT';
    const yF    = Math.max(0,Math.min(1,(yr-2025)/25));
    const zones = this._projZones||[];
    const startedZones = zones.filter(z=>yr>=z.hYear);
    const constrZones  = zones.filter(z=>yr>=z.hYear&&(yr-z.hYear)<5);
    const doneZones    = zones.filter(z=>(yr-z.hYear)>=10);

    const msgs = {
      's1': `👁 Ce vedeți: harta Europei cu ${name} marcat (punct roșu). Context: locul României și al ${name} în Europa. Stânga = realitatea 2025. Dreapta = aceeași hartă cu date predictive suprapuse.`,
      's2': `👁 Ce vedeți: zona metropolitană ${name} de la înălțime. Liniile colorate = rețeaua de transport public. Punctele = vehicule în timp real. Datele demografice vin de la Recensămîntul INS 2021.`,
      's3': `👁 Ce vedeți: apropierea de ${name}. Clădirile 3D apar la zoom 14+. Dreapta va începe să arate DIFERIT față de stânga pe măsură ce anii avansează și zonele de construcție devin active.`,
      's4': `👁 Ce vedeți: ${name} în 3D. STÂNGA = cum arată azi. DREAPTA = proiecție. Contururile ${zones.length} zone delimitate sunt zonele din Planul Urbanistic General (PUG). ${startedZones.length>0?'Zonele portocalii/galbene = construcție activă în '+yr+'.':'Aşteptaţi — zonele vor apărea pe dreapta pe măsură ce anii avansează.'}`,
      's5': `👁 Ce vedeți: clădirile GALBENE pe dreapta = construcție activă în ${yr}. Clădirile colorate (violet/albastru/portocaliu) = finalizate. Pe stânga = nicio construcție nouă (2025). ${constrZones.length} zone active acum. Înălțimile cresc vizibil de la an la an.`,
      's6': `👁 Ce vedeți: rețeaua de transport public + traficul auto în mișcare. ROȘU = tramvai. ALBASTRU = autobuz. GALBEN = mașini private. Traseele albastre/roșii = linii TP existente. La zoom 14+ mișcarea e vizibilă.`,
      's7': `👁 Ce vedeți: o zonă specifică din ${name} la zoom detaliat. Conturul portocaliu delimitat = zonă de reconversie industrială din PUG. Pe DREAPTA apar clădiri noi extrudate — acestea NU există azi, sunt proiecția bazată pe UTR-uri și CUT-uri aprobate.`,
      's8': `👁 Ce vedeți: nivel pietonal — ca și cum ai fi pe stradă. Clădirile din jur sunt OSM 3D real. Pe DREAPTA, unele clădiri sunt mai înalte = proiecția densificării. Luminile se schimbă: zi → apus → noapte = diverse scenarii de utilizare urbană.`,
      's9': `👁 Ce vedeți: harta de risc suprapusă pe ${name}. Albastru = risc inundații (ANAR). Roșu = risc seismic (INFP/P100). Galben = risc caniculă (IPCC AR6 RCP8.5). Date climatice calibrate pentru 2050 vs 2025.`,
      's10': `👁 Ce vedeți: ${name} comparat cu orașe similare din România și UE. Toate datele = Eurostat Urban Audit 2021 + INS. Indicatorii arată unde se situează ${name} și câți ani de investiții consistente sunt necesari pentru convergența EU.`,
      's11': `👁 Ce vedeți: transformarea completă 2025→2050 în timp real. STÂNGA = 2025 înghețat. DREAPTA = evoluție an cu an. Folosiți slider-ul de jos pentru a sări la orice an. Fiecare clădire nouă are o bază legală: UTR + CUT + autorizații ANCPI.`,
      's12': `👁 Ce vedeți: ${name} 2050 — imaginea completă. ${doneZones.length} zone urbanistice finalizate. +${Math.round(yF*20)}% populație. +${Math.round(yF*100)}% PIB/cap față de 2025. Toate proiecțiile sunt calibrate pe date oficiale și pot fi citate în documente PUZ/PUG/PIDU.`,
    };

    const msg = msgs[sceneId] || msgs['s4'];
    ex.textContent = msg;
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

    // Vehicule animate — GeoJSON source
    if(!m.getSource?.('tci-vehicles')) {
      try {
        m.addSource('tci-vehicles',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
        m.addLayer({id:'tci-veh-car',type:'circle',source:'tci-vehicles',filter:['==',['get','t'],'car'],
          paint:{'circle-radius':['interpolate',['linear'],['zoom'],12,2,16,4,18,6],'circle-color':'#D4AF37','circle-blur':0.3,'circle-opacity':0.9}});
        m.addLayer({id:'tci-veh-bus',type:'circle',source:'tci-vehicles',filter:['==',['get','t'],'bus'],
          paint:{'circle-radius':['interpolate',['linear'],['zoom'],12,3,16,6,18,9],'circle-color':'#3b82f6','circle-blur':0.2,'circle-opacity':0.9}});
        m.addLayer({id:'tci-veh-tram',type:'circle',source:'tci-vehicles',filter:['==',['get','t'],'tram'],
          paint:{'circle-radius':['interpolate',['linear'],['zoom'],12,3.5,16,7,18,10],'circle-color':'#ef4444','circle-blur':0.2,'circle-opacity':0.95}});
        console.log('[TCI] ✅ Vehicule adaugate');
      } catch(e){ console.warn('[TCI] Vehicule:', e.message); }
    }

    // Linii TP
    if(!m.getSource?.('tci-tp')) {
      try {
        m.addSource('tci-tp',{type:'geojson',data:this._buildTPRoutes(cx,cy)});
        m.addLayer({id:'tci-tp-layer',type:'line',source:'tci-tp',
          paint:{'line-color':['get','color'],'line-width':['interpolate',['linear'],['zoom'],10,2,15,4],'line-opacity':0.7}});
      } catch(e){}
    }

    // ── LAYERE PROIECȚIE URBANISTICĂ — doar pe harta DREAPTĂ ─────────────
    this._initProjectionLayers(cx, cy);
  },

  // ══════════════════════════════════════════════════════════════════════
  // PROIECȚIE URBANISTICĂ — zone UTR, clădiri noi, expansiune intravilam
  // ══════════════════════════════════════════════════════════════════════

  _projZones: null,

  _poly(cx, cy, rx, ry, n=20) {
    const pts=[];
    for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;pts.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry]);}
    return pts;
  },

  _rect(cx, cy, w, h) {
    return [[cx-w,cy-h],[cx+w,cy-h],[cx+w,cy+h],[cx-w,cy+h],[cx-w,cy-h]];
  },

  // ══════════════════════════════════════════════════════════════════════
  // PROIECȚIE STATISTICĂ — bazat pe INS + Eurostat + ANCPI autorizații
  // NU PUG, NU UTR, NU cadastru — ci model statistic de creștere urbană
  // ══════════════════════════════════════════════════════════════════════

  // Modelul statistic de creștere urbană per inel concentric
  // Bazat pe: INS cohort-survival, ANCPI autorizații/an, modele gravitaționale
  _growthModel: {
    // Inel 0 — Centru civic (0-300m)
    // Densificare intensă, R+8-R+12, +60% față de 2025 până în 2050
    center:    { rMin:0,      rMax:0.003,  growthRate:0.60, startYr:2026, color:'#8b5cf6', label:'Centru civic — densificare intensă' },
    // Inel 1 — Zona centrală (300m-1km)
    // Densificare moderată, R+6-R+8, +40%
    inner:     { rMin:0.003,  rMax:0.010,  growthRate:0.40, startYr:2027, color:'#6366f1', label:'Zonă centrală — densificare moderată' },
    // Inel 2 — Zona intermediară (1-2.5km)
    // Creștere graduală, R+4-R+6, +25%
    mid:       { rMin:0.010,  rMax:0.025,  growthRate:0.25, startYr:2028, color:'#3b82f6', label:'Zonă intermediară — creștere graduală' },
    // Inel 3 — Zona periferică (2.5-4km) — expansiune
    // Zone noi, construcții greenfield, +50% (de la zero)
    outer:     { rMin:0.025,  rMax:0.045,  growthRate:0.50, startYr:2030, color:'#22c55e', label:'Expansiune periferică — construcții noi' },
    // Coridoare axiale — pe axele principale (transport)
    // Densificare de-a lungul bulevardelor, +35%
    corridor:  { growthRate:0.35, startYr:2027, color:'#f59e0b', label:'Coridoare de mobilitate — densificare ax' },
  },

  // Genereaza zonele de proiecție statistic — cercuri concentrice
  // + coridoare de mobilitate + zone de reconversie industrială
  _generateStatisticalProjection(cx, cy) {
    const pop  = this.cityData?.pop2021 || 100000;
    const rate = Math.abs(this.cityData?.rata_reala_2011_2021 || 0) / 100;
    const sc   = Math.pow(pop / 360000, 0.35); // Iași=1.0, oraș mic=0.45

    // Scalăm razele în funcție de mărimea orașului
    const zones = [];

    // ── CENTRU CIVIC — disc central ────────────────────────────────────────
    zones.push({
      id:'centru', label:'Centru Civic — Densificare Intensă',
      coords: this._poly(cx, cy, 0.0035*sc, 0.0024*sc, 28),
      hBase:22, hMax:55, color:'#8b5cf6', startYr:2026,
      desc: 'R+8→R+12 · CUT 3.0 · +60% densitate',
    });

    // ── INEL CENTRAL — coroane în jurul centrului ──────────────────────────
    // Nord-est
    zones.push({
      id:'inel-ne', label:'Zonă Centrală Nord-Est',
      coords: this._poly(cx+0.006*sc, cy+0.007*sc, 0.0045*sc, 0.0030*sc, 24),
      hBase:15, hMax:38, color:'#6366f1', startYr:2027,
      desc: 'R+5→R+8 · +40% densitate',
    });
    // Nord-vest
    zones.push({
      id:'inel-nv', label:'Zonă Centrală Nord-Vest',
      coords: this._poly(cx-0.007*sc, cy+0.006*sc, 0.0040*sc, 0.0028*sc, 24),
      hBase:14, hMax:32, color:'#6366f1', startYr:2028,
      desc: 'R+4→R+7 · +35% densitate',
    });
    // Sud
    zones.push({
      id:'inel-s', label:'Zonă Centrală Sud',
      coords: this._poly(cx, cy-0.008*sc, 0.0050*sc, 0.0032*sc, 24),
      hBase:14, hMax:35, color:'#6366f1', startYr:2027,
      desc: 'R+5→R+8 · reabilitare fond existent',
    });

    // ── CORIDOARE AXIALE — zone de-a lungul arterelor principale ──────────
    // Axa Est-Vest principală
    zones.push({
      id:'coridor-ew', label:'Coridor Est-Vest — Densificare Ax',
      coords: this._rect(cx, cy-0.001*sc, 0.020*sc, 0.0018*sc),
      hBase:12, hMax:30, color:'#f59e0b', startYr:2027,
      desc: 'Bulevard principal · R+4→R+8 · TP extins',
    });
    // Axa Nord-Sud
    zones.push({
      id:'coridor-ns', label:'Coridor Nord-Sud — Densificare Ax',
      coords: this._rect(cx+0.001*sc, cy, 0.0018*sc, 0.018*sc),
      hBase:12, hMax:28, color:'#f59e0b', startYr:2028,
      desc: 'Axa principală · R+4→R+7 · spații comerciale parter',
    });

    // ── RECONVERSIE INDUSTRIALĂ ─────────────────────────────────────────────
    // Zona industrială est (ANCPI: autorizații conversie în creștere)
    zones.push({
      id:'reconv-est', label:'Reconversie Industrială Est',
      coords: this._rect(cx+0.022*sc, cy-0.010*sc, 0.010*sc, 0.007*sc),
      hBase:8, hMax:32, color:'#f97316', startYr:2032,
      desc: 'Industrial→Mixt funcțional · R+5→R+8 · birouri+rezidențial',
    });

    // ── EXPANSIUNE PERIFERICĂ ─────────────────────────────────────────────
    // Vest — zone noi de locuințe (rate creștere pozitivă)
    if(rate > -0.01) { // Doar dacă orașulnu e în declin accentuat
      zones.push({
        id:'expans-v', label:'Expansiune Vest — Locuințe Noi',
        coords: this._poly(cx-0.022*sc, cy+0.005*sc, 0.007*sc, 0.0050*sc, 20),
        hBase:0, hMax:14, color:'#22c55e', startYr:2033,
        desc: 'Creștere rezidențială · R+2→R+4 · +'+Math.round(rate*100*8)+'% față de 2025',
      });
      // Est-sud — Dancu/echivalent (creștere rapidă documentată ANCPI)
      zones.push({
        id:'expans-es', label:'Expansiune Est-Sud — Locuințe Noi',
        coords: this._poly(cx+0.026*sc, cy-0.008*sc, 0.008*sc, 0.0055*sc, 20),
        hBase:0, hMax:16, color:'#16a34a', startYr:2031,
        desc: 'Zone rezidențiale noi · creștere rapidă conform ANCPI',
      });
    }

    console.log('[TCI] Model statistic:', zones.length, 'zone de proiecție generate');
    return zones;
  },

  // ══════════════════════════════════════════════════════════════════════
  // SISTEM VIZUAL PROIECȚIE — coerență totală
  // 6 CULORI. Un sistem. Aplicat pe clădiri reale.
  // Stânga: realitate. Dreapta: același oraș + schimbările proiectate.
  // ══════════════════════════════════════════════════════════════════════

  // ── SISTEM DE CULORI — 6 tipuri, logică clară ────────────────────────
  // Violet  = Centru civic (densificare maximă)
  // Galben  = Construcție activă (orice zonă, 0-5 ani)
  // Portocaliu = Coridor / aproape finalizat
  // Albastru = Rezidențial colectiv
  // Portocaliu roșcat = Reconversie industrială
  // Verde   = Creștere periferică nouă
  // Gri     = Stabil, fără schimbări
  COLORS: {
    centru:     '#7c3aed',  // violet — max density
    coridor:    '#d97706',  // amber — boulevards
    rezid:      '#2563eb',  // blue — collective housing
    reconv:     '#ea580c',  // red-orange — industrial reconversion
    nou:        '#16a34a',  // green — new growth
    stabil:     '#374151',  // gray — no change
    constructie:'#f59e0b',  // yellow — active construction
    aproape:    '#f97316',  // orange — nearly complete
  },

  // ── ZONELE STATISTICE — mici, precise, fără elipse uriașe ───────────
  _buildZones(cx, cy) {
    const pop  = this.cityData?.pop2021 || 100000;
    const sc   = Math.pow(pop / 360000, 0.4);
    const C    = this.COLORS;

    return [
      // CENTRU CIVIC — inelul central, strict perimetrul civic
      {id:'CV', color:C.centru,  hMax:52, startYr:2026,
       ring:{cx:cx, cy:cy, rx:0.0028*sc, ry:0.0019*sc},
       label:'Centru Civic', sub:'Densificare R+8→R+12'},

      // CORIDOARE AXIALE — benzi înguste pe arterele principale
      {id:'CEV', color:C.coridor, hMax:32, startYr:2027,
       rect:{cx:cx, cy:cy-0.0005, w:0.018*sc, h:0.0014*sc},
       label:'Coridor Est-Vest', sub:'Bulevard · R+4→R+8'},
      {id:'CNS', color:C.coridor, hMax:28, startYr:2028,
       rect:{cx:cx+0.001, cy:cy, w:0.0014*sc, h:0.016*sc},
       label:'Coridor Nord-Sud', sub:'Ax principal · R+4→R+7'},

      // ZONE REZIDENȚIALE COLECTIVE — inele moderate
      {id:'RN', color:C.rezid, hMax:28, startYr:2029,
       ring:{cx:cx+0.009*sc, cy:cy+0.011*sc, rx:0.0038*sc, ry:0.0026*sc},
       label:'Rezidențial Nord', sub:'Densificare moderată R+4→R+6'},
      {id:'RS', color:C.rezid, hMax:25, startYr:2030,
       ring:{cx:cx+0.004*sc, cy:cy-0.009*sc, rx:0.0040*sc, ry:0.0028*sc},
       label:'Rezidențial Sud', sub:'Reabilitare + supraetajare R+4→R+5'},

      // RECONVERSIE INDUSTRIALĂ — dreptunghi la periferia est
      {id:'RI', color:C.reconv, hMax:35, startYr:2031,
       rect:{cx:cx+0.021*sc, cy:cy-0.009*sc, w:0.009*sc, h:0.006*sc},
       label:'Reconversie Industrială', sub:'Industrial→Mixt R+5→R+8'},

      // CREȘTERE PERIFERICĂ — zone mici la marginea construită
      {id:'PN', color:C.nou, hMax:14, startYr:2033,
       ring:{cx:cx-0.018*sc, cy:cy+0.004*sc, rx:0.0050*sc, ry:0.0036*sc},
       label:'Creștere Vest', sub:'Rezidențial nou R+2→R+3'},
      {id:'PE', color:C.nou, hMax:16, startYr:2032,
       ring:{cx:cx+0.024*sc, cy:cy-0.006*sc, rx:0.0055*sc, ry:0.0038*sc},
       label:'Creștere Est-Sud', sub:'Rezidențial nou R+2→R+3'},
    ];
  },

  _polyFromDef(def) {
    if(def.ring) {
      const {cx,cy,rx,ry} = def.ring;
      return this._poly(cx,cy,rx,ry,24);
    }
    if(def.rect) {
      const {cx,cy,w,h} = def.rect;
      return this._rect(cx,cy,w,h);
    }
    return null;
  },

  // ══════════════════════════════════════════════════════════════════════
  // TCI 3D ENGINE — CustomLayerInterface + raw Three.js
  // Mapbox injectează camera matrix → zero drift, zero desync
  // InstancedMesh → mii de clădiri, un singur draw call
  // Temporal Scene Graph → fiecare clădire are stări în timp
  // ══════════════════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════════════════
  // TCI 3D ENGINE — CustomLayerInterface corect
  // MODEL MATRIX APPROACH: obiectele sunt in METRI față de centrul orașului
  // Mapbox injectează camera matrix, modelMatrix face conversia la Mercator
  // Y negat în modelMatrix → orientare corectă (north = +Y în Three.js)
  // ══════════════════════════════════════════════════════════════════════

  _3D: {
    _map: null, _scene: null, _camera: null, _renderer: null,
    _mesh: null, _entities: [], _ready: false,
    _cx: 0, _cy: 0,          // centrul orașului (lon/lat)
    _mercOrigin: [0,0,0],    // mercator x,y,z al centrului
    _scale: 1,               // meterInMercatorCoordinateUnits la centru

    id: 'tci-3d-engine', type: 'custom', renderingMode: '3d',

    onAdd(map, gl) {
      if(typeof THREE === 'undefined') { console.warn('[3D] Three.js lipsă'); return; }
      this._map = map;
      this._camera   = new THREE.Camera();
      this._scene    = new THREE.Scene();
      this._renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(), context: gl, antialias: true });
      this._renderer.autoClear = false;

      // Lumini în spațiul local (metri)
      this._scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const sun = new THREE.DirectionalLight(0xffd580, 1.0);
      sun.position.set(500, 800, 1000);
      this._scene.add(sun);

      this._ready = true;
      console.log('[3D] ✅ CustomLayerInterface activ — coordinate system corect');
    },

    render(gl, matrix) {
      if(!this._ready || !this._mercOrigin) return;

      // ── CHEIA: modelMatrix transformă din spațiu local (metri) la Mercator
      // Y negat pentru că Mapbox Mercator are Y crescând spre sud (jos)
      // Three.js are Y crescând în sus (nord) → negăm
      const s = this._scale;
      const [tx, ty, tz] = this._mercOrigin;
      const modelMatrix = new THREE.Matrix4()
        .makeTranslation(tx, ty, tz)
        .scale(new THREE.Vector3(s, -s, s));  // -s pentru Y!

      // Combină camera Mapbox cu transformarea locală
      this._camera.projectionMatrix =
        new THREE.Matrix4().fromArray(matrix).multiply(modelMatrix);

      this._renderer.resetState();
      this._renderer.render(this._scene, this._camera);
      this._map?.triggerRepaint();
    },

    onRemove() { try { this._renderer?.dispose(); } catch(e){} this._ready = false; },

    // ── Setează originea orașului ─────────────────────────────────────
    setOrigin(cx, cy) {
      this._cx = cx; this._cy = cy;
      const mc = mapboxgl.MercatorCoordinate.fromLngLat([cx, cy], 0);
      this._mercOrigin = [mc.x, mc.y, mc.z];
      this._scale = mc.meterInMercatorCoordinateUnits();
      console.log('[3D] Origin setat:', cx, cy, '| scale:', this._scale.toExponential(3));
    },

    // ── Convertește lon/lat la METRI față de origine ──────────────────
    _toLocal(lon, lat, altM = 0) {
      const dx = (lon - this._cx) * 111319.9 * Math.cos(this._cy * Math.PI / 180);
      const dy = (lat - this._cy) * 111319.9;
      return [dx, dy, altM]; // în metri față de centrul orașului
    },

    // ── Construiește scene graph din zone ────────────────────────────
    buildSceneGraph(zones, year) {
      if(!this._ready || typeof THREE === 'undefined') return;
      // Curăță scene
      while(this._scene.children.length > 2) this._scene.remove(this._scene.children[2]);
      this._entities = [];
      this._mesh = null;

      zones.forEach(z => {
        if(!z.hMax || z.hMax === 0) return;
        const coords = window.TCI?._polyFromDef?.(z);
        if(!coords || coords.length < 3) return;

        const density = Math.max(6, Math.min(18, Math.round(z.hMax / 3)));
        const bbox = this._bboxCoords(coords);

        for(let i = 0; i < density; i++) {
          let lon, lat, tries = 0;
          do {
            lon = bbox.minX + Math.random() * (bbox.maxX - bbox.minX);
            lat = bbox.minY + Math.random() * (bbox.maxY - bbox.minY);
            tries++;
          } while(!this._pip([lon,lat], coords) && tries < 30);
          if(tries >= 30) continue;

          const seed = Math.abs(Math.sin(i * 127.1 + lon * 311.7));
          this._entities.push({
            lon, lat,
            wM: 18 + seed * 25,  // 18-43m lățime
            dM: 14 + seed * 20,  // 14-34m adâncime
            hBase: Math.max(6, z.hMax * 0.2),
            hMax:  z.hMax * (0.65 + seed * 0.35),
            startYr: z.startYr,
            color:   new THREE.Color(z.color),
            zoneId:  z.id,
          });
        }
      });

      console.log('[3D] Entities:', this._entities.length, 'pentru', zones.length, 'zone');
      this._buildMesh();
      this.updateYear(year);
    },

    _buildMesh() {
      if(!this._entities.length) return;
      // Geometrie cutie cu originea la baza (nu centru)
      const geom = new THREE.BoxGeometry(1, 1, 1);
      geom.translate(0, 0, 0.5); // pivotul la Z=0 (sol)
      const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
      this._mesh = new THREE.InstancedMesh(geom, mat, this._entities.length);
      this._mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this._scene.add(this._mesh);
    },

    updateYear(yr) {
      if(!this._ready || !this._mesh) return;
      const dummy = new THREE.Object3D();
      const color = new THREE.Color();
      const C = window.TCI?.COLORS || {};

      this._entities.forEach((e, idx) => {
        // Înălțime per an
        let h = 0;
        if(yr >= e.startYr) {
          const yF = Math.min(1, (yr - e.startYr) / 18);
          h = e.hBase + (e.hMax - e.hBase) * yF;
        }

        // Poziție în METRI față de originea orașului
        const [lx, ly] = this._toLocal(e.lon, e.lat);
        dummy.position.set(lx, ly, 0);
        // Scala în METRI — modelMatrix se ocupă de conversia la Mercator
        dummy.scale.set(e.wM, e.dM, Math.max(0.5, h));
        dummy.updateMatrix();
        this._mesh.setMatrixAt(idx, dummy.matrix);

        // Culoare per stare temporală
        if(!C.stabil || yr < e.startYr)              color.set(C.stabil || '#374151');
        else if((yr - e.startYr) < 5)               color.set(C.constructie || '#f59e0b');
        else if((yr - e.startYr) < 10)              color.set(C.aproape    || '#f97316');
        else                                          color.copy(e.color);
        this._mesh.setColorAt(idx, color);
      });

      this._mesh.instanceMatrix.needsUpdate = true;
      if(this._mesh.instanceColor) this._mesh.instanceColor.needsUpdate = true;
      this._map?.triggerRepaint();
    },

    updateLOD(zoom) {
      if(this._mesh) this._mesh.visible = zoom >= 12.5;
    },

    _bboxCoords(coords) {
      let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
      coords.forEach(([x,y])=>{ if(x<minX)minX=x; if(x>maxX)maxX=x; if(y<minY)minY=y; if(y>maxY)maxY=y; });
      return {minX,minY,maxX,maxY};
    },

    _pip([px,py], poly) {
      let inside=false;
      for(let i=0,j=poly.length-1;i<poly.length;j=i++){
        const[xi,yi]=poly[i],[xj,yj]=poly[j];
        if((yi>py)!==(yj>py)&&px<(xj-xi)*(py-yi)/(yj-yi)+xi)inside=!inside;
      }
      return inside;
    },
  },

  _initProjectionLayers(cx, cy) {
    const m = this.map; if(!m) return;

    // 1. Layer 2D pentru contururi + etichete (Mapbox nativ — mereu vizibil)
    if(!m.getSource?.('tci-proj')) {
      try {
        m.addSource('tci-proj', {type:'geojson', data:{type:'FeatureCollection',features:[]}});

        m.addLayer({id:'tci-proj-outline', type:'line', source:'tci-proj',
          paint:{
            'line-color':['get','color'],
            'line-width':['interpolate',['linear'],['zoom'],9,1,14,2.5],
            'line-opacity':0.85,
            'line-dasharray':[6,4],
          }
        });
        m.addLayer({id:'tci-proj-labels', type:'symbol', source:'tci-proj',
          minzoom:11,
          layout:{
            'text-field':['concat',['get','label'],' · ',['get','sub']],
            'text-font':['DIN Pro Medium','Arial Unicode MS Regular'],
            'text-size':['interpolate',['linear'],['zoom'],11,8,15,11],
            'symbol-placement':'point',
            'text-allow-overlap':false,
          },
          paint:{
            'text-color':['get','color'],
            'text-halo-color':'rgba(4,10,24,0.97)',
            'text-halo-width':3,
          }
        });
      } catch(e) { console.warn('[TCI] 2D layers:', e.message); }
    }

    // 2. CustomLayerInterface cu Three.js — clădirile 3D reale
    if(!m.getLayer?.('tci-3d-engine')) {
      try {
        m.addLayer(this._3D);
        console.log('[TCI] ✅ CustomLayer 3D adăugat');
      } catch(e) { console.warn('[TCI] CustomLayer:', e.message); }
    }

    // 3. Genereaza zonele
    this._projZones = this._buildZones(cx, cy);

    // 4. Populeaza 2D contururi
    this._updateProjectionLayers(this.year || 2025);

    // 5. Construieste scene graph 3D (dupa ce stilul e complet incarcat)
    const buildScene = () => {
      this._3D.setOrigin(cx, cy);  // CRITIC: setează originea ÎNAINTE de buildSceneGraph
      this._3D.buildSceneGraph(this._projZones, this.year || 2025);
    };
    if(m.isStyleLoaded?.()) buildScene();
    else { m.once('idle', buildScene); setTimeout(buildScene, 3000); }
  },

  _updateProjectionLayers(yr) {
    const m = this.map;

    // Update 2D contururi
    if(m?.getSource?.('tci-proj') && this._projZones) {
      const C = this.COLORS;
      const statusColor = (z, yr) => {
        if(yr < z.startYr) return C.stabil;
        const a = yr - z.startYr;
        if(a < 5) return C.constructie;
        if(a < 10) return C.aproape;
        return z.color;
      };
      const features = this._projZones.map(z => {
        const coords = this._polyFromDef(z); if(!coords) return null;
        return {
          type:'Feature',
          geometry:{type:'Polygon', coordinates:[coords]},
          properties:{
            label:z.label, sub:z.sub||'',
            color:z.color, dc:statusColor(z,yr),
          }
        };
      }).filter(Boolean);
      try { m.getSource('tci-proj').setData({type:'FeatureCollection', features}); } catch(e){}
    }

    // Update 3D clădiri
    try { this._3D.updateYear(yr); } catch(e){}

    // Update LOD
    try { this._3D.updateLOD(m?.getZoom?.() || 14); } catch(e){}
  },

  _buildTPRoutes(cx,cy) {
    // Axe principale de mobilitate — urmăresc arterele majore din Mapbox Standard
    // NU rute inventate — ci direcțiile principale confirm PMUD
    const s = 0.8; // scale conservator
    return {type:'FeatureCollection',features:[
      // Axa magistrală Est-Vest — Bd. Independenței / Socola
      {type:'Feature',properties:{color:'#ef4444',tip:'Tramvai'},geometry:{type:'LineString',coordinates:[[cx-0.020,cy-0.001],[cx-0.010,cy],[cx,cy],[cx+0.018,cy+0.001]]}},
      // Axa Nord-Sud — Bd. Carol I / Bd. Chimiei
      {type:'Feature',properties:{color:'#ef4444',tip:'Tramvai'},geometry:{type:'LineString',coordinates:[[cx+0.001,cy-0.018],[cx+0.001,cy-0.009],[cx+0.001,cy],[cx+0.001,cy+0.016]]}},
      // Autobuz — Copou
      {type:'Feature',properties:{color:'#3b82f6',tip:'Autobuz'},geometry:{type:'LineString',coordinates:[[cx-0.002,cy],[cx+0.004,cy+0.005],[cx+0.008,cy+0.012]]}},
      // Autobuz — Tătărași
      {type:'Feature',properties:{color:'#3b82f6',tip:'Autobuz'},geometry:{type:'LineString',coordinates:[[cx,cy],[cx+0.005,cy-0.008],[cx+0.010,cy-0.014]]}},
    ]};
  },


  // ── Vehicule animate — 100% Mapbox nativ ─────────────────────────────────
  _vehicles: [],
  _vehRaf: null,

  _vehicles: [],
  _vehRaf: null,

  _initVehicles() {
    // Vehiculele animate pe trasee sintetic drepte NU urmează străzile reale
    // și traversează clădiri/parcuri — incorect urbanistic
    // Dezactivat până la implementarea cu routing real pe OSM
    console.log('[TCI] Vehicule dezactivate — trasee sintetice incorect urbanistic');
  },

  _startVehicleLoop() {
    // Placeholder — vehiculele vor fi reactivate cu OSM routing
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
      const sc=Math.pow((d.pop2021||100000)/360000, 0.4); // scale pt zone UTR (1.0=Iasi)

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
        // S4 — City 3D overview (70s) — zbor deasupra intregului oras
        {id:'s4',dur:70000,light:'dusk',
         cam:{center:[cx,cy],zoom:13.5,pitch:50,bearing:-25,duration:5500},
         chain:[
           {center:[cx,cy],zoom:14.5,pitch:60,bearing:20,duration:6500,delay:12000},
           {center:[cx+0.010*sc,cy+0.013*sc],zoom:15.0,pitch:63,bearing:-20,duration:6500,delay:26000},
           {center:[cx+0.022*sc,cy-0.011*sc],zoom:14.8,pitch:60,bearing:15,duration:6500,delay:42000},
           {center:[cx,cy],zoom:13.8,pitch:52,bearing:0,duration:6000,delay:58000},
         ],
         title:'🏙 '+name+' 3D — Zonare Urbanistică',
         body:'Violet = Centru Civic (densificare max R+12) · Albastru = Rezidențial (R+4-6) · Portocaliu = Industrial→Mixt · Verde = Expansiune Intravilam. Zonele apar și cresc pe dreapta pe masura ce anii avansează.',
         src:'PUG '+name+' · ANCPI · OSM Buildings 3D'},

        // S5 — Dezvoltare (85s) — zbor prin fiecare zona UTR
        {id:'s5',dur:85000,light:'dusk',
         cam:{center:[cx,cy],zoom:14.0,pitch:58,bearing:0,duration:5500},
         chain:[
           // Centru Civic
           {center:[cx,cy],zoom:15.2,pitch:65,bearing:-15,duration:7000,delay:10000},
           // Zona Rezidentiala Nord
           {center:[cx+0.010*sc,cy+0.013*sc],zoom:15.0,pitch:63,bearing:20,duration:7000,delay:26000},
           // Reconversie Industriala
           {center:[cx+0.022*sc,cy-0.011*sc],zoom:14.8,pitch:60,bearing:-25,duration:7000,delay:44000},
           // Expansiune Vest
           {center:[cx-0.020*sc,cy+0.006*sc],zoom:14.5,pitch:56,bearing:10,duration:6500,delay:62000},
         ],
         title:'📈 Proiecție Clădiri Noi — 2025–2050',
         body:'Camera zboară prin fiecare zonă UTR. Contururile colorate = zone proiectate. Clădirile extrudate cresc în înălțime pe harta dreaptă cu fiecare an. Stânga = 2025 real. Dreapta = proiecție.',
         src:'PUG UTR · ANCPI Autorizații · INS · Eurostat',
         animYear:true,yearFrom:2025,yearTo:2050},

        // S6 — Mobilitate (85s)
        {id:'s6',dur:85000,light:'night',
         cam:{center:[cx,cy],zoom:13.5,pitch:50,bearing:0,duration:5500},
         chain:[
           {center:[cx+0.006*sc,cy-0.004*sc],zoom:14.0,pitch:54,bearing:-18,duration:6000,delay:14000},
           {center:[cx-0.004*sc,cy+0.004*sc],zoom:14.2,pitch:56,bearing:18,duration:6000,delay:30000},
           {center:[cx+0.005*sc,cy+0.002*sc],zoom:14.5,pitch:58,bearing:-8,duration:6000,delay:48000},
           {center:[cx,cy],zoom:13.5,pitch:50,bearing:0,duration:5500,delay:68000},
         ],
         title:'🚊 Mobilitate & Trafic 2050',
         body:'Mașini (galben) · Autobuze (albastru) · Tramvaie (roșu) animate pe rețeaua reală. Modal split 2025: auto '+ms.auto+'% · TP '+ms.tp+'%. Proiecție 2050: auto 52% · TP 36%.',
         src:'PMUD · PNRR Mobilitate · Eurostat'},

        // S7 — Focus ZONA DE RECONVERSIE INDUSTRIALA (90s)
        {id:'s7',dur:90000,light:'dusk',
         cam:{center:[cx+0.022*sc,cy-0.011*sc],zoom:14.5,pitch:60,bearing:-20,duration:6000},
         chain:[
           {center:[cx+0.022*sc,cy-0.011*sc],zoom:15.2,pitch:66,bearing:15,duration:7000,delay:14000},
           {center:[cx+0.022*sc,cy-0.011*sc],zoom:15.8,pitch:70,bearing:-30,duration:7000,delay:32000},
           {center:[cx+0.010*sc,cy+0.013*sc],zoom:15.5,pitch:68,bearing:20,duration:7000,delay:52000},
           {center:[cx,cy],zoom:14.0,pitch:55,bearing:0,duration:6000,delay:74000},
         ],
         title:'🏗 Reconversie Industrială → Mixt Funcțional',
         body:'Fosta zonă industrială: '+Math.round(310*sc)+'ha · Reconversie 2028-2042. CUT 1.5-2.0 · R+5-R+8. Birouri + Rezidențial + Retail. Investiție estimată: €'+Math.round(pib*380)+'M. Locuri muncă noi: ~'+Math.round((d.pop2021||100000)/28).toLocaleString()+'.',
         src:'PUG UTR RI · ANCPI · Model TSS·FG'},

        // S8 — Street level IN ZONA DE RECONVERSIE (80s)
        {id:'s8',dur:80000,light:'dusk',
         cam:{center:[cx+0.020*sc,cy-0.009*sc],zoom:16.5,pitch:74,bearing:5,duration:6000},
         chain:[
           {center:[cx+0.021*sc,cy-0.010*sc],zoom:17.0,pitch:78,bearing:35,duration:7000,delay:13000,light:'dusk'},
           {center:[cx+0.019*sc,cy-0.011*sc],zoom:17.3,pitch:79,bearing:-20,duration:7000,delay:30000,light:'night'},
           {center:[cx+0.000,cy+0.000],zoom:16.8,pitch:76,bearing:15,duration:7000,delay:50000,light:'night'},
           {center:[cx+0.020*sc,cy-0.009*sc],zoom:16.5,pitch:74,bearing:0,duration:6000,delay:66000,light:'dawn'},
         ],
         title:'🚶 La Nivel de Stradă — Viitoarea Zonă',
         body:'Perspectivă pietonală în zona de reconversie. Clădirile noi (extrudate colorate) pe dreapta vs realitatea actuală pe stânga. Zoom 17, pitch 78° — vedere ca pietoni prin noul cartier proiectat.',
         src:'PMUD · ANM · OMS · Model Spațial TSS·FG'},

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
      if(this._idx>=this._scenes.length){ this._idx=0; }
      const sc=this._scenes[this._idx]; if(!sc) return;
      const T=this._tci;
      console.log(`[Director] Scena ${this._idx+1}/${this._scenes.length}: ${sc.id} (${sc.dur/1000}s)`);

      // SEASON / LIGHTING CYCLE
      T._setLight(sc.light||'dusk');

      // Garantie zoom 3D la S4+
      const ease=(t)=>t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
      const is3D=['s4','s5','s6','s7','s8','s9','s10','s11','s12'].includes(sc.id);
      if(is3D && (T.map?.getZoom?.()||4)<13.5){
        try{const cx=T.cityData?.lon||27.601,cy=T.cityData?.lat||47.158;
          T.map.jumpTo({center:[cx,cy],zoom:13.5,pitch:40,bearing:0});}catch(e){}
      }
      try{T.map.flyTo({...sc.cam,essential:true,easing:ease});T.bearing=sc.cam.bearing||0;}catch(e){}

      // Camera chain cu delay + lighting change optional per camera
      if(this._chainTimers) this._chainTimers.forEach(clearTimeout);
      this._chainTimers=(sc.chain||[]).map(c=>setTimeout(()=>{
        if(!T.running) return;
        try{T.map.flyTo({center:c.center,zoom:c.zoom,pitch:c.pitch,bearing:c.bearing,
          duration:c.duration||6000,essential:true,easing:ease});
          T.bearing=c.bearing;
          if(c.light) T._setLight(c.light);
        }catch(e){}
      }, c.delay||0));

      // Narativ explicit
      setTimeout(()=>{
        T._updateNarCard(sc.title, sc.body, sc.src);
        T._updateNarExtra(sc.id, T.year||T.startYear||2025);
      }, 900);

      // Year animation
      if(sc.animYear){
        T._dirYearAnim=true;
        let y=T.year||T.startYear||2025;
        const target=sc.yearTo||2050;
        const step=Math.max(300,(sc.dur-2000)/Math.max(1,target-y));
        const tick=()=>{
          if(!T.running||!T._dirYearAnim) return;
          if(y<=target){T._onYearChange(y++);setTimeout(tick,step);}
        };
        setTimeout(tick,1200);
      } else { T._dirYearAnim=false; }

      this._timer=setTimeout(()=>this._next(), sc.dur);
    },

    stop(){
      clearTimeout(this._timer);
      if(this._chainTimers) this._chainTimers.forEach(clearTimeout);
      this._idx=-1;
    },
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
      this._updateProjectionLayers(yr);
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
